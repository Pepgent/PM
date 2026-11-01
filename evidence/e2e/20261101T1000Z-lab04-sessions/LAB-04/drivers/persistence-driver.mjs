import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { randomBytes, randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { promisify } from 'node:util';
import { createFailureMuxFixture } from './mux-failure-fixture.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(process.argv[2] ?? process.cwd());
const require = createRequire(join(repo, 'package.json'));
const Database = require('better-sqlite3');
const { eq, asc } = require('drizzle-orm');
const source = join(repo, 'apps/web/src/server/lab');
const { launchLabRuntime, retireLabRuntime } = await import(pathToFileURL(join(source, 'runtime.ts')).href);
const schema = await import(pathToFileURL(join(source, 'schema.ts')).href);
const authSchema = await import(pathToFileURL(join(source, 'auth-schema.ts')).href);
const fixtureSnapshot = 'lab04-root-identity-persistence';
const runHome = mkdtempSync(join(here, 'persistence-run-'));
const journalFile = join(runHome, 'boundary.jsonl');
const control = join(runHome, 'control');
mkdirSync(control);
writeFileSync(journalFile, '', { mode: 0o600 });
const record = (event, fields = {}) => appendFileSync(journalFile, `${JSON.stringify({ ...fields, event, fixtureSnapshot, at: Date.now() })}\n`);
const jsonl = (file) => file && existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line)) : [];
const journal = () => jsonl(journalFile);
const waitMs = Number(process.env.LAB04_TIMEOUT_MS ?? 15000);
const watchdogMs = Number(process.env.LAB04_WATCHDOG_MS ?? 60000);
assert(Number.isFinite(waitMs) && waitMs > 0 && Number.isFinite(watchdogMs) && watchdogMs > 0);
const ids = { lab: randomUUID(), user: randomUUID(), member: randomUUID(), project: randomUUID() };
let runtime;
let starting;
let context;
let stopped = false;
let watchdogFired = false;
let forcedExit;
const allRows = [];
const snapshots = [];
const cases = [];
function releaseFixtureHolds() {
  for (const entry of journal().filter((item) => item.event === 'omp:host_tools_failure_held')) writeFileSync(entry.release, 'failure cleanup only\n');
}
function signalOwned(signal, withChildren) {
  for (const entry of journal().filter((item) => item.event === 'dial:spawn')) {
    for (const pid of withChildren ? [entry.pid, entry.childPid] : [entry.pid]) {
      try { process.kill(pid, signal); }
      catch (error) { if (error.code !== 'ESRCH') record('driver:signal_failure', { pid, message: error.message }); }
    }
  }
}
const watchdog = setTimeout(() => {
  watchdogFired = true;
  record('driver:watchdog_failure', { watchdogMs });
  console.error(`Persistence driver watchdog expired; this run cannot pass. Artifacts: ${runHome}`);
  releaseFixtureHolds();
  signalOwned('SIGTERM', false);
  void runtime?.stop().catch((error) => record('driver:watchdog_stop_error', { message: error.message }));
  forcedExit = setTimeout(() => { signalOwned('SIGKILL', true); process.exit(124); }, 2000);
}, watchdogMs);
const bearer = randomBytes(32).toString('hex');
const mux = await createFailureMuxFixture({ repo, bearer, journalFile, observe: (entry) => {
  if (!context || entry.event !== 'mux:writer_frame' || !['get_state', 'set_host_tools', 'prompt'].includes(entry.frame.type)) return;
  const rows = context.db.select().from(schema.conversation).all();
  for (const row of rows) assert.equal(row.sessionId === null, row.sessionFile === null, 'Identity/file pair must never be partially published');
  const observed = { command: entry.frame.type, requestId: entry.frame.id, agent: entry.agent,
    row: rows.find((row) => row.agentId === entry.agent) ?? null, queue: context.db.select().from(schema.humanIrcQueue).all() };
  snapshots.push(observed);
  record('driver:source_snapshot', observed);
} });
async function until(label, observation) {
  const started = Date.now();
  for (;;) {
    assert.equal(watchdogFired, false);
    if (mux.failures.length) throw new AggregateError(mux.failures, 'Persistence fixture protocol failure');
    const value = await observation();
    if (value) return value;
    if (Date.now() - started > waitMs) throw new Error(`Timed out awaiting ${label}; artifacts ${runHome}`);
    await delay(15);
  }
}
const output = (result) => { assert.equal(result.ok, true, JSON.stringify(result)); return result.output; };
const getRow = (row) => context.db.select().from(schema.conversation).where(eq(schema.conversation.id, row.id)).get();
const queue = (row) => context.db.select().from(schema.humanIrcQueue).where(eq(schema.humanIrcQueue.conversationId, row.id)).orderBy(asc(schema.humanIrcQueue.queuedAt), asc(schema.humanIrcQueue.msg)).all();
const events = (name, row) => mux.events.filter((entry) => entry.event === name && entry.agent === row.agentId);
const starts = (row) => journal().filter((entry) => entry.event === 'omp:start' && entry.conversation === row.id);
const sessionFile = (row) => getRow(row)?.sessionFile ?? starts(row)[0]?.sessionFile ?? null;
const transcript = (row) => jsonl(sessionFile(row));
const pair = (row) => { const saved = getRow(row); return { sessionId: saved.sessionId, sessionFile: saved.sessionFile }; };
const bareRepo = join(runHome, 'library.git');
const git = async (cwd, ...args) => (await promisify(execFile)('git', ['-C', cwd, ...args], {
  encoding: 'utf8', env: { PATH: process.env.PATH, HOME: runHome, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null', GIT_TERMINAL_PROMPT: '0', GIT_ALLOW_PROTOCOL: 'file' },
})).stdout.trim();
const options = { home: join(runHome, 'lab'), migrationsFolder: join(repo, 'apps/web/resources/lab/migrations'),
  auth: { secret: randomBytes(48).toString('hex'), baseURL: 'http://127.0.0.1:43199' }, library: { cacheHome: join(runHome, 'cache'), storeUrl: null },
  sessions: { muxUrl: mux.url, bearer, muxBinary: join(here, 'dial-failure-fixture.mjs'), command: [process.execPath, join(here, 'omp-persistence-fixture.mjs')],
    worktreeHome: join(runHome, 'worktrees'), sessionHome: join(runHome, 'sessions'),
    environment: { PATH: process.env.PATH, HOME: runHome, TMPDIR: '/tmp', LAB04_REPO: repo, LAB04_JOURNAL: journalFile, LAB04_CONTROL: control } } };
async function launch() {
  stopped = false;
  starting = launchLabRuntime(options);
  runtime = await starting;
  await runtime.run((ctx) => { context = ctx; });
  record('driver:startup_scan_completed');
}
async function stopAndRetire(label) {
  const oldContext = context;
  await runtime.stop();
  stopped = true;
  assert.throws(() => oldContext.db.select().from(schema.conversation).all(), /closed|not open/i);
  await assert.rejects(runtime.run(() => 'not allowed'), /stopped/i);
  await until('all declarations closed before runtime retirement', () => mux.liveSockets() === 0);
  retireLabRuntime(starting);
  context = null;
  record('driver:runtime_retired', { label });
}
async function open(name) {
  const row = output(await runtime.run((ctx) => ctx.sessions.open(ids.lab, ids.member, { kind: 'Discussion', name, project: ids.project })));
  assert.deepEqual(pair(row), { sessionId: null, sessionFile: null });
  assert.equal(events('mux:generation', row).length, 0);
  assert.equal(starts(row).length, 0);
  assert.equal(await git(row.worktree, 'branch', '--show-current'), `conv/${row.id}`);
  assert.equal(await git(row.worktree, 'remote', 'get-url', 'origin'), bareRepo);
  assert.equal(readFileSync(join(row.worktree, 'nodes/fixture.ts'), 'utf8'), 'export const fixture = "persistent source";\n');
  allRows.push(row);
  return row;
}
function enqueue(row, msg, body) { return runtime.run((ctx) => ctx.sessions.prompt(row.id, msg, ids.user, body)); }
async function admitted(row, msg, body) {
  const receipt = await until(`source prompt received ${body}`, () => transcript(row).find((entry) => entry.type === 'prompt_received' && entry.body === body));
  await until(`successful admission clears queue ${msg}`, () => queue(row).every((item) => item.msg !== msg));
  assert.equal(receipt.principal, ids.user);
  assert.equal(receipt.message, `human:${ids.user}\n${body}`);
  assert.equal(realpathSync(receipt.cwd), realpathSync(row.worktree));
  assert.equal(receipt.sessionId, getRow(row).sessionId);
  assert.equal(getRow(row).sessionFile, starts(row)[0].sessionFile);
  assert(transcript(row).some((entry) => entry.type === 'prompt_admitted' && entry.requestId === receipt.requestId));
  return receipt;
}
function releaseSettlement(receipt) { writeFileSync(join(control, `settle-${receipt.requestId}`), 'external settlement\n', { flag: 'wx' }); }
async function settle(row, receipt, park = true) {
  releaseSettlement(receipt);
  await until('actual prompt result', () => transcript(row).some((entry) => entry.type === 'prompt_settled' && entry.requestId === receipt.requestId));
  if (!park) return;
  await until('actual dial exited after parking', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === receipt.generation && entry.code === 0));
  await until('process socket closed after parking', () => events('mux:process_close', row).some((entry) => entry.generation === receipt.generation));
  assert.equal(queue(row).length, 0);
}
async function rejectedTools(row, msg, body) {
  writeFileSync(join(control, `reject-host-tools-once-${row.id}`), 'source rejects tools only once across generations\n', { flag: 'wx' });
  output(await enqueue(row, msg, body));
  const hold = await until('source holds tools response after returning mandatory identity', () => journal().find((entry) => entry.event === 'omp:host_tools_failure_held' && entry.conversation === row.id));
  const saved = pair(row);
  assert.equal(saved.sessionId, hold.sessionId);
  assert.equal(saved.sessionFile, hold.sessionFile);
  assert.equal(typeof saved.sessionId, 'string');
  assert.equal(typeof saved.sessionFile, 'string');
  assert.equal(queue(row).length, 1);
  assert.equal(queue(row)[0].msg, msg);
  assert.equal(transcript(row).filter((entry) => entry.type === 'prompt_received').length, 0);
  assert.equal(transcript(row).filter((entry) => entry.type === 'host_tools_rejected').length, 0, 'Pair must publish before the tools failure ACK exists');
  assert(snapshots.some((entry) => entry.agent === row.agentId && entry.command === 'set_host_tools' && entry.row.sessionId === saved.sessionId && entry.row.sessionFile === saved.sessionFile));
  record('driver:identity_pair_before_host_tools_failure', { conversation: row.id, ...saved, heldRequest: hold.requestId });
  writeFileSync(hold.release, 'release actual source-owned negative ACK\n', { flag: 'wx' });
  await until('automatic writer closure after tools failure', () => events('mux:writer_close', row).length === 1);
  await until('rejected generation dial exit', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === hold.generation));
  assert.deepEqual(pair(row), saved);
  assert.equal(events('mux:generation', row).length, 1);
  assert.equal(events('mux:writer_open', row).length, 1);
  assert.equal(queue(row).length, 1);
  assert.equal(transcript(row).filter((entry) => entry.type === 'host_tools_rejected').length, 1);
  return { hold, saved };
}

try {
  const sourceRepo = join(runHome, 'library-source');
  mkdirSync(join(sourceRepo, 'nodes'), { recursive: true });
  writeFileSync(join(sourceRepo, 'nodes/fixture.ts'), 'export const fixture = "persistent source";\n');
  await git(sourceRepo, 'init', '-b', 'main');
  await git(sourceRepo, 'add', 'nodes/fixture.ts');
  await git(sourceRepo, '-c', 'user.name=Lab04 Persistence Fixture', '-c', 'user.email=persistence@example.invalid', 'commit', '-m', 'Create persistence fixture library');
  await git(runHome, 'clone', '--bare', sourceRepo, bareRepo);
  await launch();
  await runtime.run((ctx) => {
    const now = new Date();
    ctx.db.insert(authSchema.user).values({ id: ids.user, name: 'Persistence user', email: `${ids.user}@example.invalid`, emailVerified: true, createdAt: now, updatedAt: now }).run();
    ctx.db.insert(authSchema.organization).values({ id: ids.lab, name: 'Persistence Lab', slug: `persistence-${ids.lab}`, createdAt: now }).run();
    ctx.db.insert(authSchema.member).values({ id: ids.member, organizationId: ids.lab, userId: ids.user, role: 'owner', createdAt: now }).run();
    ctx.db.insert(schema.project).values({ id: ids.project, labId: ids.lab, name: 'Persistence project' }).run();
    ctx.db.insert(schema.libraryRepo).values({ id: randomUUID(), labId: ids.lab, remoteUrl: bareRepo, branch: 'main' }).run();
  });
  const toolsRow = await open('Persist identity before host tools rejection');
  const toolsHead = `001-${randomUUID()}`;
  const toolsHeadBody = 'persistence:retained head after tools rejection';
  const toolsFailure = await rejectedTools(toolsRow, toolsHead, toolsHeadBody);
  // Natural writer closure was observed before this public exact completion wait.
  await runtime.run((ctx) => ctx.sessions.stop());
  assert.equal(events('mux:generation', toolsRow).length, 1, 'No automatic delivery retry');
  const toolsNext = `002-${randomUUID()}`;
  const toolsNextBody = 'persistence:new enqueue wakes persisted root';
  output(await enqueue(toolsRow, toolsNext, toolsNextBody));
  const recoveredHead = await admitted(toolsRow, toolsHead, toolsHeadBody);
  assert.deepEqual(pair(toolsRow), toolsFailure.saved);
  assert.equal(transcript(toolsRow).filter((entry) => entry.type === 'generation_start')[1].resumed, toolsFailure.saved.sessionId);
  assert.equal(queue(toolsRow).some((entry) => entry.msg === toolsNext), true);
  await settle(toolsRow, recoveredHead, false);
  const recoveredNext = await admitted(toolsRow, toolsNext, toolsNextBody);
  assert.equal(recoveredNext.generation, recoveredHead.generation);
  await settle(toolsRow, recoveredNext);
  assert.equal(transcript(toolsRow).filter((entry) => entry.type === 'host_tools_rejected').length, 1);
  cases.push({ kind: 'identity persisted before failed host tools and resumed by new enqueue', conversation: toolsRow.id, pair: toolsFailure.saved, recoveredHead, recoveredNext });

  const parkedRow = await open('Parked root survives full runtime restart');
  const parkedMsg = `001-${randomUUID()}`;
  const parkedBody = 'persistence:before full runtime restart';
  output(await enqueue(parkedRow, parkedMsg, parkedBody));
  const parkedReceipt = await admitted(parkedRow, parkedMsg, parkedBody);
  await settle(parkedRow, parkedReceipt);
  const parkedPair = pair(parkedRow);
  const parkedBytes = readFileSync(parkedPair.sessionFile, 'utf8');
  const neverRow = await open('Never prompted across runtime restart');
  const startupRow = await open('Persisted valid pending head wakes only at startup');
  const startupMsg = `001-${randomUUID()}`;
  const startupBody = 'persistence:startup wakes retained pending head';
  const startupFailure = await rejectedTools(startupRow, startupMsg, startupBody);
  const startupBytes = readFileSync(startupFailure.saved.sessionFile, 'utf8');
  assert.equal(events('mux:generation', startupRow).length, 1);
  await stopAndRetire('before actual relaunch');
  const persistedBefore = new Database(join(runHome, 'lab/lab.sqlite'), { readonly: true, fileMustExist: true });
  try {
    assert.equal(persistedBefore.prepare('SELECT msg FROM human_irc_queue WHERE conversation_id = ?').get(startupRow.id).msg, startupMsg);
    const nullPair = persistedBefore.prepare('SELECT session_id, session_file FROM conversation WHERE id = ?').get(neverRow.id);
    assert.deepEqual(nullPair, { session_id: null, session_file: null });
  } finally { persistedBefore.close(); }
  await launch();
  // launch resolves only after the actual runtime's sessions.start scan completes.
  assert.deepEqual(pair(neverRow), { sessionId: null, sessionFile: null });
  assert.equal(starts(neverRow).length, 0);
  assert.equal(events('mux:generation', neverRow).length, 0);
  assert.deepEqual(pair(parkedRow), parkedPair);
  assert.equal(events('mux:generation', parkedRow).length, 1, 'Parked/no-queue startup must not launch a child');
  assert.equal(readFileSync(parkedPair.sessionFile, 'utf8'), parkedBytes);
  // No enqueue occurs for startupRow after relaunch: only the real startup scan wakes it.
  const startupRecovered = await admitted(startupRow, startupMsg, startupBody);
  assert.deepEqual(pair(startupRow), startupFailure.saved);
  assert.equal(transcript(startupRow).filter((entry) => entry.type === 'generation_start')[1].resumed, startupFailure.saved.sessionId);
  assert(readFileSync(startupFailure.saved.sessionFile, 'utf8').startsWith(startupBytes));
  await settle(startupRow, startupRecovered);
  assert.equal(events('mux:generation', startupRow).length, 2);
  assert.equal(transcript(startupRow).filter((entry) => entry.type === 'host_tools_rejected').length, 1);
  const restartedMsg = `002-${randomUUID()}`;
  const restartedBody = 'persistence:after full runtime restart';
  output(await enqueue(parkedRow, restartedMsg, restartedBody));
  const restartedReceipt = await admitted(parkedRow, restartedMsg, restartedBody);
  assert.deepEqual(pair(parkedRow), parkedPair);
  assert.equal(restartedReceipt.sessionId, parkedReceipt.sessionId);
  assert.notEqual(restartedReceipt.generation, parkedReceipt.generation);
  assert.equal(restartedReceipt.cwd, parkedReceipt.cwd);
  assert.equal(transcript(parkedRow).filter((entry) => entry.type === 'generation_start')[1].resumed, parkedPair.sessionId);
  assert(readFileSync(parkedPair.sessionFile, 'utf8').startsWith(parkedBytes));
  await settle(parkedRow, restartedReceipt);
  cases.push({ kind: 'full runtime restart resumes parked pair, startup wakes valid pending pair, never-prompted stays lazy',
    parkedConversation: parkedRow.id, parkedPair, parkedReceipt, restartedReceipt,
    startupConversation: startupRow.id, startupPair: startupFailure.saved, startupRecovered, neverPromptedConversation: neverRow.id });

  // Last: keep the invalid pending row out of the earlier restart scan.
  const missingRow = await open('Mandatory source sessionFile omission');
  writeFileSync(join(control, `missing-session-file-${missingRow.id}`), 'source omits mandatory sessionFile\n', { flag: 'wx' });
  const missingMsg = `001-${randomUUID()}`;
  output(await enqueue(missingRow, missingMsg, 'persistence:missing mandatory session file'));
  const omitted = await until('actual source get_state omits sessionFile', () => transcript(missingRow).find((entry) => entry.type === 'state_returned' && entry.omittedSessionFile));
  assert.equal(typeof omitted.returned.sessionId, 'string');
  assert.equal(Object.hasOwn(omitted.returned, 'sessionFile'), false);
  await until('invalid state automatically closes writer', () => events('mux:writer_close', missingRow).length === 1);
  assert.deepEqual(pair(missingRow), { sessionId: null, sessionFile: null });
  assert.equal(queue(missingRow).length, 1);
  assert.equal(queue(missingRow)[0].msg, missingMsg);
  assert.equal(transcript(missingRow).filter((entry) => entry.type === 'prompt_received').length, 0);
  assert(!events('mux:writer_frame', missingRow).some((entry) => ['set_host_tools', 'prompt'].includes(entry.frame.type)));
  assert.equal(transcript(missingRow)[0].sessionId, omitted.returned.sessionId);
  assert(existsSync(starts(missingRow)[0].sessionFile), 'Source header/file exists independently but must not be adopted by Lab');
  cases.push({ kind: 'missing mandatory sessionFile rejects generation without publishing partial identity', conversation: missingRow.id,
    labPair: pair(missingRow), independentlyOwnedSource: starts(missingRow)[0], queuedMessage: missingMsg });
  assert.deepEqual(pair(neverRow), { sessionId: null, sessionFile: null });
  assert.equal(starts(neverRow).length, 0);
  await stopAndRetire('final completion');
  for (const spawned of journal().filter((entry) => entry.event === 'dial:spawn')) {
    const entries = journal();
    const childAt = entries.findIndex((entry) => entry.event === 'dial:child_close' && entry.pid === spawned.pid);
    const exitAt = entries.findIndex((entry) => entry.event === 'dial:exit' && entry.pid === spawned.pid);
    assert(childAt >= 0 && exitAt > childAt);
    for (const pid of [spawned.pid, spawned.childPid]) assert.throws(() => process.kill(pid, 0), (error) => error.code === 'ESRCH');
  }
  const persisted = new Database(join(runHome, 'lab/lab.sqlite'), { readonly: true, fileMustExist: true });
  let persistedRows;
  let persistedQueue;
  try {
    persistedRows = persisted.prepare('SELECT id, session_id, session_file, worktree FROM conversation ORDER BY id').all();
    persistedQueue = persisted.prepare('SELECT conversation_id, msg, principal, body FROM human_irc_queue').all();
    assert.equal(persistedRows.length, 5);
    assert.equal(persistedQueue.length, 1);
    assert.equal(persistedQueue[0].msg, missingMsg);
    for (const row of persistedRows) assert.equal(row.session_id === null, row.session_file === null);
    assert.equal(persistedRows.find((row) => row.id === neverRow.id).session_id, null);
    assert.equal(persistedRows.find((row) => row.id === missingRow.id).session_id, null);
  } finally { persisted.close(); }
  assert.equal(watchdogFired, false);
  const evidence = { scope: 'Supplemental internal lazy-root identity and runtime restart integration only; not public RPC/auth-flow/live-service/global completion',
    fixtureSnapshot, fixtures: { mux: join(here, 'mux-failure-fixture.mjs'), dial: join(here, 'dial-failure-fixture.mjs'), omp: join(here, 'omp-persistence-fixture.mjs') },
    runHome, journalFile, sqlite: join(runHome, 'lab/lab.sqlite'), cases, snapshots, persistedRows, persistedQueue, watchdogFired };
  writeFileSync(join(runHome, 'evidence.json'), `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(JSON.stringify({ status: 'passed', ...evidence }, null, 2));
} catch (error) {
  record('driver:failure', { name: error.name, message: error.message, stack: error.stack });
  console.error(`Persistence driver failed; artifacts: ${runHome}`);
  throw error;
} finally {
  releaseFixtureHolds();
  if (runtime && !stopped) {
    try { await runtime.stop(); }
    catch (error) { console.error('Persistence driver cleanup failure:', error); }
  }
  await mux.close();
  clearTimeout(watchdog);
  clearTimeout(forcedExit);
}
