import { randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

// Separate additive snapshot: the already-executed omp-fixture.mjs stays unchanged.
const fixtureSnapshot = 'lab04-omp-step-control';
let fixtureSequence = 0;
const argv = process.argv.slice(2);
const option = (name) => argv[argv.indexOf(name) + 1];
if (option('--mode') !== 'rpc' || !argv.includes('--session-dir')) throw new Error('Expected RPC session arguments');
const directory = option('--session-dir');
const resumed = argv.includes('--resume') ? option('--resume') : null;
mkdirSync(directory, { recursive: true });
const sessionFile = join(directory, 'fixture-session.jsonl');
let sessionId;
if (resumed) {
  if (!existsSync(sessionFile)) throw new Error('Resume requires source-owned session file');
  const header = JSON.parse(readFileSync(sessionFile, 'utf8').split('\n')[0]);
  if (header.type !== 'session' || header.sessionId !== resumed || header.cwd !== process.cwd()) throw new Error('Resume identity/cwd mismatch');
  sessionId = header.sessionId;
} else {
  if (existsSync(sessionFile)) throw new Error('New session must not overwrite persistent session bytes');
  sessionId = randomUUID();
  writeFileSync(sessionFile, `${JSON.stringify({ type: 'session', sessionId, cwd: process.cwd(), createdByPid: process.pid, fixtureSnapshot })}\n`, { flag: 'wx', mode: 0o600 });
}
const generation = process.env.MUX_GENERATION;
const journal = (event, fields = {}) => appendFileSync(process.env.LAB04_JOURNAL, `${JSON.stringify({ ...fields, event, pid: process.pid, generation, fixtureSnapshot, fixtureSequence: ++fixtureSequence, at: Date.now() })}\n`);
const append = (entry) => appendFileSync(sessionFile, `${JSON.stringify({ ...entry, sessionId, generation, cwd: process.cwd(), fixtureSnapshot, fixtureSequence: ++fixtureSequence })}\n`);
const emit = (frame) => { journal('omp:stdout', { frame }); process.stdout.write(`${JSON.stringify(frame)}\n`); };
const response = (request, data) => emit({ type: 'response', id: request.id, command: request.type, success: true, data });
const active = new Map();
let ending = false;
append({ type: 'generation_start', pid: process.pid, resumed });
journal('omp:start', { sessionId, sessionFile, cwd: process.cwd(), resumed });
emit({ type: 'ready', protocolVersion: 1 });
const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
input.on('line', (line) => {
  const request = JSON.parse(line);
  journal('omp:stdin', { frame: request });
  switch (request.type) {
    case 'get_state':
      response(request, { sessionId, sessionFile, isStreaming: active.size > 0, isSettled: active.size === 0 });
      return;
    case 'set_host_tools':
      if (!Array.isArray(request.tools) || request.tools.length !== 0) throw new Error('Fixture expects the actual empty tool catalog');
      response(request, { toolNames: [] });
      return;
    case 'prompt': {
      if (typeof request.message !== 'string' || !request.message.startsWith('human:') || !request.message.includes('\n')) throw new Error('Expected exact human principal/body wire encoding');
      const separator = request.message.indexOf('\n');
      const principal = request.message.slice('human:'.length, separator);
      const body = request.message.slice(separator + 1);
      append({ type: 'prompt_received', requestId: request.id, principal, body, message: request.message,
        streamingBehavior: request.streamingBehavior ?? null, activeRequestIds: [...active.keys()] });
      if (body === 'fixture:reject-admission') {
        append({ type: 'prompt_rejected', requestId: request.id });
        emit({ type: 'response', id: request.id, command: 'prompt', success: false, error: 'Fixture intentionally rejects prompt admission' });
        return;
      }
      append({ type: 'prompt_admitted', requestId: request.id });
      response(request, {});
      let stepEmitted = false;
      const timer = setInterval(() => {
        if (ending) return;
        // An external control requests an actual OMP step boundary, not settlement.
        // The retained file is a one-shot level trigger for this active request.
        if (!stepEmitted && existsSync(join(process.env.LAB04_CONTROL, `step-${request.id}`))) {
          stepEmitted = true;
          append({ type: 'step_boundary', requestId: request.id, activeRequestIds: [...active.keys()] });
          emit({ type: 'turn_end' });
        }
        if (!existsSync(join(process.env.LAB04_CONTROL, `settle-${request.id}`))) return;
        clearInterval(timer);
        active.delete(request.id);
        const sessionSettled = active.size === 0;
        append({ type: 'prompt_settled', requestId: request.id, sessionSettled, activeRequestIds: [...active.keys()] });
        emit({ type: 'prompt_result', id: request.id, status: 'completed', sessionSettled });
        if (sessionSettled) emit({ type: 'session_settled' });
      }, 15);
      active.set(request.id, timer);
      return;
    }
    default: throw new Error(`Unexpected OMP request ${request.type}`);
  }
});
input.on('close', () => {
  ending = true;
  for (const timer of active.values()) clearInterval(timer);
  append({ type: 'stdin_closed', unfinishedRequests: [...active.keys()] });
  journal('omp:stdin_closed', { unfinishedRequests: [...active.keys()] });
  // The dial must wait for this real child exit, not just EOF or its last event.
  setTimeout(() => { journal('omp:exit', { code: 0 }); process.exit(0); }, 60);
});
