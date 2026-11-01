import { randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createInterface } from 'node:readline';

const fixtureSnapshot = 'lab04-root-identity-persistence';
const args = process.argv.slice(2);
const option = (name) => args[args.indexOf(name) + 1];
if (option('--mode') !== 'rpc' || !args.includes('--session-dir')) throw new Error('Expected RPC root arguments');
const directory = option('--session-dir');
const conversation = basename(directory);
const resumed = args.includes('--resume') ? option('--resume') : null;
mkdirSync(directory, { recursive: true });
const sessionFile = join(directory, 'fixture-session.jsonl');
let sessionId;
if (resumed) {
  const header = JSON.parse(readFileSync(sessionFile, 'utf8').split('\n')[0]);
  if (header.type !== 'session' || header.sessionId !== resumed || header.cwd !== process.cwd()) throw new Error('Resume requires exact source session and cwd');
  sessionId = header.sessionId;
} else {
  if (existsSync(sessionFile)) throw new Error('New root cannot overwrite source session file');
  sessionId = randomUUID();
  writeFileSync(sessionFile, `${JSON.stringify({ type: 'session', sessionId, cwd: process.cwd(), fixtureSnapshot })}\n`, { mode: 0o600, flag: 'wx' });
}
const generation = process.env.MUX_GENERATION;
let fixtureSequence = 0;
const journal = (event, fields = {}) => appendFileSync(process.env.LAB04_JOURNAL, `${JSON.stringify({ ...fields, event, pid: process.pid, generation, conversation, fixtureSnapshot, fixtureSequence: ++fixtureSequence, at: Date.now() })}\n`);
const append = (entry) => appendFileSync(sessionFile, `${JSON.stringify({ ...entry, sessionId, generation, cwd: process.cwd(), fixtureSnapshot, fixtureSequence: ++fixtureSequence })}\n`);
const transcript = () => readFileSync(sessionFile, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line));
const emit = (frame) => { journal('omp:stdout', { frame }); process.stdout.write(`${JSON.stringify(frame)}\n`); };
const response = (request, data) => emit({ type: 'response', id: request.id, command: request.type, success: true, data });
const active = new Map();
let ending = false;
append({ type: 'generation_start', resumed, pid: process.pid });
journal('omp:start', { sessionId, sessionFile, resumed, cwd: process.cwd() });
process.on('exit', (code) => journal('omp:exit', { code }));
emit({ type: 'ready', protocolVersion: 1 });
const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
input.on('line', (line) => {
  const request = JSON.parse(line);
  journal('omp:stdin', { frame: request });
  switch (request.type) {
    case 'get_state': {
      const omitFile = existsSync(join(process.env.LAB04_CONTROL, `missing-session-file-${conversation}`));
      const state = { sessionId, ...(omitFile ? {} : { sessionFile }), isStreaming: active.size > 0, isSettled: active.size === 0 };
      append({ type: 'state_returned', requestId: request.id, returned: state, omittedSessionFile: omitFile });
      response(request, state);
      return;
    }
    case 'set_host_tools': {
      if (!Array.isArray(request.tools) || request.tools.length !== 0) throw new Error('Expected actual empty host tools');
      const reject = existsSync(join(process.env.LAB04_CONTROL, `reject-host-tools-once-${conversation}`)) &&
        !transcript().some((entry) => entry.type === 'host_tools_rejected');
      if (reject) {
        const release = join(process.env.LAB04_CONTROL, `release-host-tools-failure-${conversation}`);
        append({ type: 'host_tools_failure_held', requestId: request.id, release });
        journal('omp:host_tools_failure_held', { sessionId, sessionFile, requestId: request.id, release });
        const timer = setInterval(() => {
          if (ending || !existsSync(release)) return;
          clearInterval(timer);
          append({ type: 'host_tools_rejected', requestId: request.id });
          emit({ type: 'response', id: request.id, command: request.type, success: false, error: 'Source-controlled one-time host tool admission failure' });
        }, 15);
      } else { append({ type: 'host_tools_accepted', requestId: request.id }); response(request, { toolNames: [] }); }
      return;
    }
    case 'prompt': {
      const newline = request.message.indexOf('\n');
      if (!request.message.startsWith('human:') || newline < 0) throw new Error('Expected actual human principal/body');
      const principal = request.message.slice(6, newline);
      const body = request.message.slice(newline + 1);
      append({ type: 'prompt_received', requestId: request.id, principal, body, message: request.message });
      append({ type: 'prompt_admitted', requestId: request.id, body });
      response(request, {});
      const timer = setInterval(() => {
        if (ending || !existsSync(join(process.env.LAB04_CONTROL, `settle-${request.id}`))) return;
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
  append({ type: 'stdin_closed', unfinishedRequests: [...active.keys()] });
  journal('omp:stdin_closed');
  process.exit(0);
});
