import { randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const fixtureSnapshot = 'lab04-generation-failures';
const args = process.argv.slice(2);
const option = (name) => args[args.indexOf(name) + 1];
if (option('--mode') !== 'rpc' || !args.includes('--session-dir')) throw new Error('Expected actual RPC session arguments');
const directory = option('--session-dir');
const resumed = args.includes('--resume') ? option('--resume') : null;
mkdirSync(directory, { recursive: true });
const sessionFile = join(directory, 'fixture-session.jsonl');
let sessionId;
if (resumed) {
  const header = JSON.parse(readFileSync(sessionFile, 'utf8').split('\n')[0]);
  if (header.type !== 'session' || header.sessionId !== resumed || header.cwd !== process.cwd()) throw new Error('Source session resume/cwd mismatch');
  sessionId = header.sessionId;
} else {
  if (existsSync(sessionFile)) throw new Error('New root cannot overwrite source session');
  sessionId = randomUUID();
  writeFileSync(sessionFile, `${JSON.stringify({ type: 'session', sessionId, cwd: process.cwd(), fixtureSnapshot })}\n`, { flag: 'wx', mode: 0o600 });
}
const generation = process.env.MUX_GENERATION;
let fixtureSequence = 0;
const journal = (event, fields = {}) => appendFileSync(process.env.LAB04_JOURNAL, `${JSON.stringify({ ...fields, event, pid: process.pid, generation, fixtureSnapshot, fixtureSequence: ++fixtureSequence, at: Date.now() })}\n`);
const append = (entry) => appendFileSync(sessionFile, `${JSON.stringify({ ...entry, sessionId, generation, cwd: process.cwd(), fixtureSnapshot, fixtureSequence: ++fixtureSequence })}\n`);
const transcript = () => readFileSync(sessionFile, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line));
const emit = (frame) => { journal('omp:stdout', { frame }); process.stdout.write(`${JSON.stringify(frame)}\n`); };
const response = (request, data) => emit({ type: 'response', id: request.id, command: request.type, success: true, data });
const active = new Map();
let holdEof = false;
let ending = false;
append({ type: 'generation_start', pid: process.pid, resumed, muxUrl: process.env.SOROI_MUX_URL });
journal('omp:start', { sessionId, sessionFile, cwd: process.cwd(), resumed, muxUrl: process.env.SOROI_MUX_URL });
process.on('exit', (code) => journal('omp:exit', { code }));
emit({ type: 'ready', protocolVersion: 1 });
const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
input.on('line', (line) => {
  const request = JSON.parse(line);
  journal('omp:stdin', { frame: request });
  switch (request.type) {
    case 'get_state': {
      const state = { sessionId, sessionFile, isStreaming: active.size > 0, isSettled: active.size === 0 };
      append({ type: 'state_returned', requestId: request.id, ...state });
      response(request, state);
      return;
    }
    case 'set_host_tools':
      if (!Array.isArray(request.tools) || request.tools.length !== 0) throw new Error('Expected empty host tools');
      response(request, { toolNames: [] });
      return;
    case 'prompt': {
      const newline = request.message.indexOf('\n');
      if (!request.message.startsWith('human:') || newline < 0) throw new Error('Expected actual principal/body encoding');
      const principal = request.message.slice(6, newline);
      const body = request.message.slice(newline + 1);
      append({ type: 'prompt_received', requestId: request.id, principal, body, message: request.message,
        streamingBehavior: request.streamingBehavior ?? null, activeRequestIds: [...active.keys()] });
      const fault = ['fixture:exit-before-admission-once', 'fixture:exit-after-admission-once', 'fixture:reject-once-held-drain'].includes(body) &&
        !transcript().some((entry) => entry.type === 'fault_trigger' && entry.body === body);
      if (fault) append({ type: 'fault_trigger', requestId: request.id, body });
      if (fault && body === 'fixture:exit-before-admission-once') {
        append({ type: 'source_process_exit', requestId: request.id, code: 17, beforeAdmission: true });
        process.exit(17);
      }
      if (fault && body === 'fixture:reject-once-held-drain') {
        holdEof = true;
        append({ type: 'prompt_rejected', requestId: request.id, body });
        emit({ type: 'response', id: request.id, command: 'prompt', success: false, error: 'Source-owned transient rejection; EOF drain is explicitly held' });
        return;
      }
      append({ type: 'prompt_admitted', requestId: request.id, body });
      response(request, {});
      const timer = setInterval(() => {
        if (ending) return;
        if (fault && body === 'fixture:exit-after-admission-once' && existsSync(join(process.env.LAB04_CONTROL, `exit-${request.id}`))) {
          append({ type: 'source_process_exit', requestId: request.id, code: 18, beforeAdmission: false });
          process.exit(18);
        }
        if (!existsSync(join(process.env.LAB04_CONTROL, `settle-${request.id}`))) return;
        clearInterval(timer);
        active.delete(request.id);
        const sessionSettled = active.size === 0;
        append({ type: 'prompt_settled', requestId: request.id, body, sessionSettled });
        emit({ type: 'prompt_result', id: request.id, status: 'completed', sessionSettled });
        if (sessionSettled) emit({ type: 'session_settled' });
      }, 15);
      active.set(request.id, timer);
      return;
    }
    default: throw new Error(`Unexpected request ${request.type}`);
  }
});
input.on('close', () => {
  ending = true;
  for (const timer of active.values()) clearInterval(timer);
  append({ type: 'stdin_closed', unfinishedRequests: [...active.keys()], holdEof });
  journal('omp:stdin_closed', { sessionId, holdEof });
  if (holdEof) {
    const release = join(process.env.LAB04_CONTROL, `release-eof-${generation}`);
    append({ type: 'eof_drain_held', release });
    journal('omp:eof_drain_held', { sessionId, release });
    const timer = setInterval(() => {
      if (!existsSync(release)) return;
      clearInterval(timer);
      append({ type: 'eof_drain_released', release });
      journal('omp:eof_drain_released', { sessionId, release });
      process.exit(0);
    }, 15);
  } else process.exit(0);
});
