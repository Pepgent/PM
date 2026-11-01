#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const require = createRequire(join(process.env.LAB04_REPO, 'package.json'));
const WebSocket = require('ws');
const args = process.argv.slice(2);
const delimiter = args.indexOf('--');
if (args[0] !== 'dial' || delimiter < 0) throw new Error('Expected mux dial invocation');
const argument = (name) => args[args.indexOf(name) + 1];
const agent = argument('--agent');
const generation = process.env.MUX_GENERATION;
const journal = (event, fields = {}) => appendFileSync(process.env.LAB04_JOURNAL, `${JSON.stringify({ event, ...fields, agent, generation, pid: process.pid, at: Date.now() })}\n`);
const url = new URL(`/agents/${encodeURIComponent(agent)}/process`, argument('--mux'));
url.protocol = url.protocol === 'https:' || url.protocol === 'wss:' ? 'wss:' : 'ws:';
url.searchParams.set('generation', generation);
url.searchParams.set('token', process.env.MUX_TOKEN);
const socket = new WebSocket(url);
let child = null;
let finishing = false;
let closingInput = false;
const closeInput = () => {
  if (closingInput) return;
  closingInput = true;
  journal('dial:close_stdin');
  child?.stdin.end();
};
process.on('SIGTERM', closeInput);
process.on('SIGINT', closeInput);
socket.on('open', () => {
  const [command, ...commandArgs] = args.slice(delimiter + 1);
  child = spawn(command, commandArgs, { cwd: process.cwd(), env: process.env, stdio: ['pipe', 'pipe', 'pipe'] });
  journal('dial:spawn', { childPid: child.pid, cwd: process.cwd(), command, commandArgs });
  if (closingInput) child.stdin.end();
  const output = createInterface({ input: child.stdout, crlfDelay: Infinity });
  output.on('line', (line) => socket.send(line));
  child.stderr.on('data', (bytes) => journal('dial:child_stderr', { text: bytes.toString() }));
  child.on('error', (error) => { journal('dial:child_error', { message: error.message }); socket.close(); process.exitCode = 1; });
  child.stdin.on('error', (error) => journal('dial:stdin_error', { message: error.message }));
  // close, unlike exit, also proves stdout/stderr have drained.
  child.on('close', (code, signal) => {
    finishing = true;
    journal('dial:child_close', { childPid: child.pid, code, signal });
    socket.send(JSON.stringify({ type: 'mux_exit', code: code ?? 1 }), () => socket.close());
    process.exitCode = code ?? 1;
  });
});
socket.on('message', (bytes) => {
  const frame = JSON.parse(bytes.toString());
  if (frame.type === 'mux_close_stdin') closeInput();
  else {
    if (!child || closingInput) throw new Error('RPC reached absent/ending independent child');
    child.stdin.write(`${JSON.stringify(frame)}\n`);
  }
});
socket.on('error', (error) => { journal('dial:socket_error', { message: error.message }); closeInput(); process.exitCode = 1; });
socket.on('close', () => { journal('dial:socket_close'); if (!finishing) closeInput(); });
process.on('exit', (code) => journal('dial:exit', { code }));
