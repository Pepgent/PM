import { randomUUID } from 'node:crypto';
import { appendFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { join } from 'node:path';

export async function createFailureMuxFixture({ repo, bearer, journalFile, observe = () => undefined }) {
  const require = createRequire(join(repo, 'package.json'));
  const { WebSocketServer, WebSocket } = require('ws');
  const server = createServer((_request, response) => { response.writeHead(404); response.end(); });
  const wss = new WebSocketServer({ noServer: true });
  const agents = new Map();
  const events = [];
  const failures = [];
  const record = (event, fields = {}) => {
    const entry = { ...fields, event, fixtureSnapshot: 'lab04-generation-failures', at: Date.now() };
    events.push(entry);
    appendFileSync(journalFile, `${JSON.stringify(entry)}\n`);
    observe(entry);
    return entry;
  };
  const send = (socket, frame) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) throw new Error('Fixture delivery requires an open socket');
    socket.send(JSON.stringify(frame));
  };
  const guard = (operation) => {
    try { operation(); }
    catch (error) { failures.push(error); record('mux:failure', { message: error.message }); }
  };
  server.on('upgrade', (request, socket, head) => guard(() => {
    const url = new URL(request.url, 'http://127.0.0.1');
    const match = /^\/agents\/([^/]+)\/(writer|process)$/.exec(url.pathname);
    const reject = () => socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
    if (!match) return reject();
    const agent = decodeURIComponent(match[1]);
    const role = match[2];
    const current = agents.get(agent);
    if (role === 'writer' && (request.headers.authorization !== `Bearer ${bearer}` || current?.writer)) return reject();
    if (role === 'process' && (!current?.generation || current.process || url.searchParams.get('generation') !== current.generation.id || url.searchParams.get('token') !== current.generation.token)) return reject();
    wss.handleUpgrade(request, socket, head, (ws) => {
      if (role === 'writer') {
        const state = { writer: ws, declaration: randomUUID(), generation: null, process: null };
        agents.set(agent, state);
        record('mux:writer_open', { agent, declaration: state.declaration, websocketUrl: `ws://${request.headers.host}${request.url}` });
        ws.on('message', (data) => guard(() => {
          const frame = JSON.parse(data.toString());
          record('mux:writer_frame', { agent, declaration: state.declaration, frame });
          if (frame.type === 'mux_open_generation') {
            if (state.generation) throw new Error('Writer already owns an active generation');
            state.generation = { id: randomUUID(), token: randomUUID() };
            record('mux:generation', { agent, declaration: state.declaration, generation: state.generation.id });
            send(ws, { type: 'mux_generation', generation: state.generation.id, token: state.generation.token });
          } else {
            if (!state.generation || (frame.type === 'mux_close_stdin' && frame.generation !== state.generation.id)) throw new Error('Frame does not identify active generation');
            send(state.process, frame);
          }
        }));
        ws.on('close', () => {
          record('mux:writer_close', { agent, declaration: state.declaration, generation: state.generation?.id ?? null });
          state.writer = null;
          if (agents.get(agent) === state && !state.process) agents.delete(agent);
        });
        ws.on('error', (error) => failures.push(error));
      } else {
        const state = current;
        const generation = state.generation.id;
        state.process = ws;
        record('mux:process_open', { agent, generation, declaration: state.declaration });
        send(state.writer, { type: 'mux_attached', generation });
        ws.on('message', (data) => guard(() => {
          const frame = JSON.parse(data.toString());
          record('mux:process_frame', { agent, generation, declaration: state.declaration, frame });
          if (frame.type === 'mux_exit') {
            state.generation = null;
            const notification = { type: 'mux_exited', generation, code: frame.code };
            record('mux:writer_notification', { agent, generation, declaration: state.declaration, writerOpen: state.writer?.readyState === WebSocket.OPEN, frame: notification });
            send(state.writer, notification);
          } else send(state.writer, frame);
        }));
        ws.on('close', () => {
          record('mux:process_close', { agent, generation, declaration: state.declaration });
          if (state.process === ws) state.process = null;
          if (!state.writer && agents.get(agent) === state) agents.delete(agent);
        });
        ws.on('error', (error) => failures.push(error));
      }
    });
  }));
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { url: `http://127.0.0.1:${server.address().port}`, events, failures, record,
    liveSockets: () => [...wss.clients].filter((socket) => socket.readyState !== WebSocket.CLOSED).length,
    async close() {
      for (const socket of wss.clients) socket.terminate();
      await new Promise((resolve) => wss.close(resolve));
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    } };
}
