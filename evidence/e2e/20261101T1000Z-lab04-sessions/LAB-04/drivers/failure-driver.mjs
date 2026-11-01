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
const { launchLabRuntime } = await import(pathToFileURL(join(source, 'runtime.ts')).href);
const schema = await import(pathToFileURL(join(source, 'schema.ts')).href);
const authSchema = await import(pathToFileURL(join(source, 'auth-schema.ts')).href);
const fixtureSnapshot = 'lab04-generation-failures';
const runHome = mkdtempSync(join(here, 'failure-run-'));
const control = join(runHome, 'control');
const journalFile = join(runHome, 'boundary.jsonl');
mkdirSync(control);
writeFileSync(journalFile, '', { mode: 0o600 });
const record = (event, fields = {}) => appendFileSync(journalFile, `${JSON.stringify({ ...fields, event, fixtureSnapshot, at: Date.now() })}\n`);
const jsonl = (file) => file && existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line)) : [];
const journal = () => jsonl(journalFile);
const waitMs = Number(process.env.LAB04_TIMEOUT_MS ?? 15000);
const watchdogMs = Number(process.env.LAB04_WATCHDOG_MS ?? 60000);
assert(Number.isFinite(waitMs) && waitMs > 0 && Number.isFinite(watchdogMs) && watchdogMs > 0);
let runtime;
let context;
let stopped = false;
let watchdogFired = false;
let forcedExit;
let releaseOwned = () => undefined;
const rows = [];
const snapshots = [];
const scenarios = [];
function releaseHeldEof() {
  for (const entry of journal().filter((item) => item.event === 'omp:eof_drain_held')) writeFileSync(entry.release, 'failure cleanup only\n');
}
function signalOwned(signal, includeChildren) {
  for (const spawned of journal().filter((entry) => entry.event === 'dial:spawn')) {
    for (const pid of includeChildren ? [spawned.pid, spawned.childPid] : [spawned.pid]) {
      try { process.kill(pid, signal); }
      catch (error) { if (error.code !== 'ESRCH') record('driver:cleanup_signal_error', { pid, message: error.message }); }
    }
  }
}
const watchdog = setTimeout(() => {
  watchdogFired = true;
  record('driver:watchdog_failure', { watchdogMs });
  console.error(`Failure driver watchdog expired; this run cannot pass. Artifacts: ${runHome}`);
  releaseOwned();
  releaseHeldEof();
  signalOwned('SIGTERM', false);
  void runtime?.stop().catch((error) => record('driver:watchdog_stop_error', { message: error.message }));
  forcedExit = setTimeout(() => { signalOwned('SIGKILL', true); process.exit(124); }, 2000);
}, watchdogMs);
const bearer = randomBytes(32).toString('hex');
const mux = await createFailureMuxFixture({ repo, bearer, journalFile, observe: (entry) => {
  if (!context) return;
  const prompt = entry.event === 'mux:writer_frame' && entry.frame.type === 'prompt';
  if (!prompt && entry.event !== 'mux:writer_notification' && entry.event !== 'mux:writer_close') return;
  try {
    const row = context.db.select().from(schema.conversation).all().find((item) => item.agentId === entry.agent) ?? null;
    const snapshot = { observedEvent: entry.event, agent: entry.agent, declaration: entry.declaration,
      requestId: prompt ? entry.frame.id : null, row, queue: context.db.select().from(schema.humanIrcQueue).all(), databaseOpen: true };
    snapshots.push(snapshot);
    record('driver:source_snapshot', snapshot);
  } catch (error) { snapshots.push({ observedEvent: entry.event, agent: entry.agent, databaseOpen: false, message: error.message }); }
} });
const canonical = new URL(mux.url);
canonical.protocol = 'ws:';
const expectedMuxUrl = canonical.href;
async function until(label, observation) {
  const started = Date.now();
  for (;;) {
    assert.equal(watchdogFired, false, 'Watchdog cleanup can never count as scenario evidence');
    if (mux.failures.length) throw new AggregateError(mux.failures, 'Failure fixture protocol error');
    const value = await observation();
    if (value) return value;
    if (Date.now() - started > waitMs) throw new Error(`Timed out awaiting ${label}; artifacts ${runHome}`);
    await delay(15);
  }
}
function output(result) { assert.equal(result.ok, true, JSON.stringify(result)); return result.output; }
const ids = { lab: randomUUID(), user: randomUUID(), member: randomUUID(), project: randomUUID() };
const getRow = (row) => context.db.select().from(schema.conversation).where(eq(schema.conversation.id, row.id)).get();
const queue = (row) => context.db.select().from(schema.humanIrcQueue).where(eq(schema.humanIrcQueue.conversationId, row.id)).orderBy(asc(schema.humanIrcQueue.queuedAt), asc(schema.humanIrcQueue.msg)).all();
const event = (name, row) => mux.events.filter((entry) => entry.event === name && entry.agent === row.agentId);
const sourceStart = (row) => journal().find((entry) => entry.event === 'omp:start' && entry.cwd && realpathSync(entry.cwd) === realpathSync(row.worktree));
const sessionFile = (row) => getRow(row)?.sessionFile ?? sourceStart(row)?.sessionFile ?? null;
const transcript = (row) => jsonl(sessionFile(row));
const receipts = (row, body) => transcript(row).filter((entry) => entry.type === 'prompt_received' && entry.body === body);
const commands = (row) => event('mux:writer_frame', row).filter((entry) => entry.frame.type === 'prompt');
const git = async (cwd, ...args) => (await promisify(execFile)('git', ['-C', cwd, ...args], {
  encoding: 'utf8', env: { PATH: process.env.PATH, HOME: runHome, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null', GIT_TERMINAL_PROMPT: '0', GIT_ALLOW_PROTOCOL: 'file' },
})).stdout.trim();
const bareRepo = join(runHome, 'library.git');
async function open(name) {
  const row = output(await runtime.run((ctx) => ctx.sessions.open(ids.lab, ids.member, { kind: 'Discussion', name, project: ids.project })));
  assert.equal(row.sessionId, null, 'Root identity must remain absent at lazy Discussion creation');
  assert.equal(row.sessionFile ?? null, null);
  assert.equal(getRow(row).sessionId, null);
  assert.equal(event('mux:generation', row).length, 0, 'Creation must not start a root generation');
  assert.equal(sourceStart(row), undefined, 'Creation must not launch an OMP child');
  assert.equal(await git(row.worktree, 'branch', '--show-current'), `conv/${row.id}`);
  assert.equal(await git(row.worktree, 'remote', 'get-url', 'origin'), bareRepo);
  assert.equal(readFileSync(join(row.worktree, 'nodes/fixture.ts'), 'utf8'), 'export const fixture = "actual clone";\n');
  rows.push(row);
  return row;
}
function enqueue(row, msg, body) { return runtime.run((ctx) => ctx.sessions.prompt(row.id, msg, ids.user, body)); }
async function received(row, body, count = 1) {
  return until(`actual OMP receipt ${body} occurrence ${count}`, () => receipts(row, body)[count - 1]);
}
function assertIdentity(row, receipt) {
  const saved = getRow(row);
  assert.equal(typeof saved.sessionId, 'string');
  assert.equal(typeof saved.sessionFile, 'string', 'Every generation must persist mandatory get_state.sessionFile together with sessionId');
  assert.equal(saved.sessionId, receipt.sessionId);
  assert.equal(saved.sessionFile, sourceStart(row).sessionFile);
  assert.equal(realpathSync(saved.sessionFile), realpathSync(sessionFile(row)));
  assert.equal(saved.ownerId, ids.member);
  assert.equal(saved.worktree, row.worktree);
  assert.equal(receipt.principal, ids.user);
  assert.equal(receipt.message, `human:${ids.user}\n${receipt.body}`);
  assert.equal(realpathSync(receipt.cwd), realpathSync(row.worktree));
  assert(snapshots.some((entry) => entry.requestId === receipt.requestId && entry.row?.sessionId === saved.sessionId && entry.row?.sessionFile === saved.sessionFile &&
    entry.queue.some((pending) => pending.conversationId === row.id && pending.principal === ids.user && pending.body === receipt.body)),
  'Identity+file must already be persisted and actual queue intent present at prompt wire');
  return saved;
}
async function admitted(row, body, msg, count = 1) {
  const receipt = await received(row, body, count);
  assertIdentity(row, receipt);
  await until(`successful admission clears queue ${msg}`, () => queue(row).every((pending) => pending.msg !== msg));
  assert(transcript(row).some((entry) => entry.type === 'prompt_admitted' && entry.requestId === receipt.requestId));
  return receipt;
}
function releaseSettlement(receipt) { writeFileSync(join(control, `settle-${receipt.requestId}`), 'external OMP settlement\n', { flag: 'wx' }); }
async function settled(row, receipt) {
  return until('actual source settlement', () => transcript(row).find((entry) => entry.type === 'prompt_settled' && entry.requestId === receipt.requestId));
}
async function parked(row, receipt) {
  await until('dial OS exit', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === receipt.generation && entry.code === 0));
  await until('process TCP close', () => event('mux:process_close', row).some((entry) => entry.generation === receipt.generation));
  const entries = journal();
  const resultAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.frame.type === 'prompt_result' && entry.frame.id === receipt.requestId);
  const closeAt = entries.findIndex((entry) => entry.event === 'mux:writer_frame' && entry.frame.type === 'mux_close_stdin' && entry.frame.generation === receipt.generation);
  const childAt = entries.findIndex((entry) => entry.event === 'dial:child_close' && entry.generation === receipt.generation);
  assert(resultAt >= 0 && closeAt > resultAt && childAt > closeAt);
}
async function automaticFailureEnd(row, receipt, code) {
  const notification = await until('unsolicited Mux exit notification while writer open', () => event('mux:writer_notification', row).find((entry) => entry.generation === receipt.generation));
  assert.equal(notification.writerOpen, true);
  assert.equal(notification.frame.type, 'mux_exited');
  assert.equal(notification.frame.code, code);
  assert(!event('mux:writer_frame', row).some((entry) => entry.frame.type === 'mux_close_stdin' && entry.frame.generation === receipt.generation), 'Failure must be unsolicited, not normal parking');
  await until('automatic failure ends declaration without manual rescue', () => event('mux:writer_close', row).length === 1);
  await until('failed dial physically exited', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === receipt.generation));
  return notification;
}
async function drainHeadThenNew(row, head, headMsg, headCount, next, nextMsg) {
  const headReceipt = await admitted(row, head, headMsg, headCount);
  assert(queue(row).some((pending) => pending.msg === nextMsg));
  assert.equal(receipts(row, next).length, 0);
  releaseSettlement(headReceipt);
  await settled(row, headReceipt);
  const nextReceipt = await admitted(row, next, nextMsg);
  assert.equal(nextReceipt.generation, headReceipt.generation);
  assert.equal(nextReceipt.sessionId, headReceipt.sessionId);
  releaseSettlement(nextReceipt);
  await settled(row, nextReceipt);
  await parked(row, nextReceipt);
  assert.equal(queue(row).length, 0);
  return { headReceipt, nextReceipt };
}

try {
  const sourceRepo = join(runHome, 'library-source');
  mkdirSync(join(sourceRepo, 'nodes'), { recursive: true });
  writeFileSync(join(sourceRepo, 'nodes/fixture.ts'), 'export const fixture = "actual clone";\n');
  await git(sourceRepo, 'init', '-b', 'main');
  await git(sourceRepo, 'add', 'nodes/fixture.ts');
  await git(sourceRepo, '-c', 'user.name=Lab04 Failure Fixture', '-c', 'user.email=failure@example.invalid', 'commit', '-m', 'Create failure fixture library');
  await git(runHome, 'clone', '--bare', sourceRepo, bareRepo);
  runtime = await launchLabRuntime({ home: join(runHome, 'lab'), migrationsFolder: join(repo, 'apps/web/resources/lab/migrations'),
    auth: { secret: randomBytes(48).toString('hex'), baseURL: 'http://127.0.0.1:43199' }, library: { cacheHome: join(runHome, 'library-cache'), storeUrl: null },
    sessions: { muxUrl: mux.url, bearer, muxBinary: join(here, 'dial-failure-fixture.mjs'), command: [process.execPath, join(here, 'omp-failure-fixture.mjs')],
      worktreeHome: join(runHome, 'worktrees'), sessionHome: join(runHome, 'sessions'),
      environment: { PATH: process.env.PATH, HOME: runHome, TMPDIR: '/tmp', LAB04_REPO: repo, LAB04_JOURNAL: journalFile, LAB04_CONTROL: control } } });
  await runtime.run((ctx) => {
    context = ctx;
    const now = new Date();
    ctx.db.insert(authSchema.user).values({ id: ids.user, name: 'Failure user', email: `${ids.user}@example.invalid`, emailVerified: true, createdAt: now, updatedAt: now }).run();
    ctx.db.insert(authSchema.organization).values({ id: ids.lab, name: 'Failure Lab', slug: `failure-${ids.lab}`, createdAt: now }).run();
    ctx.db.insert(authSchema.member).values({ id: ids.member, organizationId: ids.lab, userId: ids.user, role: 'owner', createdAt: now }).run();
    ctx.db.insert(schema.project).values({ id: ids.project, labId: ids.lab, name: 'Failure project' }).run();
    ctx.db.insert(schema.libraryRepo).values({ id: randomUUID(), labId: ids.lab, remoteUrl: bareRepo, branch: 'main' }).run();
  });

  // A: post-ready source process exits while the prompt admission RPC is pending.
  const pendingRow = await open('Pending admission unsolicited exit');
  const pendingBody = 'fixture:exit-before-admission-once';
  const pendingMsg = `001-${randomUUID()}`;
  output(await enqueue(pendingRow, pendingMsg, pendingBody));
  const pendingReceipt = await received(pendingRow, pendingBody);
  const pendingIdentity = assertIdentity(pendingRow, pendingReceipt);
  const pendingExit = await automaticFailureEnd(pendingRow, pendingReceipt, 17);
  assert(!transcript(pendingRow).some((entry) => ['prompt_admitted', 'prompt_settled'].includes(entry.type) && entry.requestId === pendingReceipt.requestId));
  assert(!event('mux:process_frame', pendingRow).some((entry) => entry.frame.type === 'response' && entry.frame.id === pendingReceipt.requestId));
  // The automatic writer close above must happen first. This public completion
  // wait then observes actor finish/onEnd without rescuing a hung pending RPC.
  await runtime.run((ctx) => ctx.sessions.stop());
  record('driver:pending_failure_actor_completion_observed', { conversation: pendingRow.id });
  assert.equal(event('mux:writer_open', pendingRow).length, 1);
  assert.equal(event('mux:generation', pendingRow).length, 1);
  assert.deepEqual(queue(pendingRow).map((item) => ({ msg: item.msg, principal: item.principal, body: item.body })), [{ msg: pendingMsg, principal: ids.user, body: pendingBody }]);
  const pendingNext = `002-${randomUUID()}`;
  const pendingNextBody = 'fixture:pending-exit explicit future enqueue';
  output(await enqueue(pendingRow, pendingNext, pendingNextBody));
  const pendingRecovered = await drainHeadThenNew(pendingRow, pendingBody, pendingMsg, 2, pendingNextBody, pendingNext);
  assert.equal(pendingRecovered.headReceipt.sessionId, pendingIdentity.sessionId);
  assert.equal(event('mux:writer_open', pendingRow).length, 2);
  assert.equal(event('mux:generation', pendingRow).length, 2);
  assert.equal(transcript(pendingRow).filter((entry) => entry.type === 'fault_trigger' && entry.body === pendingBody).length, 1);
  scenarios.push({ kind: 'pending admission unsolicited exit', conversation: pendingRow.id, exit: pendingExit.frame,
    oldRequest: pendingReceipt.requestId, recoveredHead: pendingRecovered.headReceipt, recoveredNext: pendingRecovered.nextReceipt });

  // B: admission succeeded and queue cleared, then source exits before any result.
  const acceptedRow = await open('Accepted turn unsolicited exit');
  const acceptedBody = 'fixture:exit-after-admission-once';
  const acceptedMsg = `001-${randomUUID()}`;
  output(await enqueue(acceptedRow, acceptedMsg, acceptedBody));
  const acceptedReceipt = await admitted(acceptedRow, acceptedBody, acceptedMsg);
  const acceptedIdentity = getRow(acceptedRow);
  assert.equal(queue(acceptedRow).length, 0);
  assert(!transcript(acceptedRow).some((entry) => entry.type === 'prompt_settled' && entry.requestId === acceptedReceipt.requestId));
  writeFileSync(join(control, `exit-${acceptedReceipt.requestId}`), 'source exits after successful admission, without result\n', { flag: 'wx' });
  const acceptedExit = await automaticFailureEnd(acceptedRow, acceptedReceipt, 18);
  assert.equal(event('mux:writer_open', acceptedRow).length, 1);
  const acceptedNext = `002-${randomUUID()}`;
  const acceptedNextBody = 'fixture:future enqueue after accepted-turn exit';
  output(await enqueue(acceptedRow, acceptedNext, acceptedNextBody));
  const acceptedRecovered = await admitted(acceptedRow, acceptedNextBody, acceptedNext);
  assert.equal(acceptedRecovered.sessionId, acceptedIdentity.sessionId);
  assert.notEqual(acceptedRecovered.generation, acceptedReceipt.generation);
  assert.equal(receipts(acceptedRow, acceptedBody).length, 1, 'Already admitted intent must not be replayed');
  const resumedFirst = transcript(acceptedRow).find((entry) => entry.type === 'prompt_received' && entry.generation === acceptedRecovered.generation);
  assert.equal(resumedFirst.requestId, acceptedRecovered.requestId);
  assert(!event('mux:process_frame', acceptedRow).some((entry) => entry.frame.type === 'prompt_result' && entry.frame.id === acceptedReceipt.requestId));
  releaseSettlement(acceptedRecovered);
  await settled(acceptedRow, acceptedRecovered);
  await parked(acceptedRow, acceptedRecovered);
  assert.equal(event('mux:writer_open', acceptedRow).length, 2);
  scenarios.push({ kind: 'admitted turn unsolicited exit', conversation: acceptedRow.id, exit: acceptedExit.frame,
    oldRequest: acceptedReceipt.requestId, recovered: acceptedRecovered });

  // C: queue another notification while the rejected actor's actual EOF drain is held.
  const heldRow = await open('Held rejected delivery drain');
  const heldBody = 'fixture:reject-once-held-drain';
  const heldMsg = `001-${randomUUID()}`;
  output(await enqueue(heldRow, heldMsg, heldBody));
  const heldReceipt = await received(heldRow, heldBody);
  const heldIdentity = assertIdentity(heldRow, heldReceipt);
  const eofHold = await until('source controlled rejected EOF drain is held', () => journal().find((entry) => entry.event === 'omp:eof_drain_held' && entry.generation === heldReceipt.generation));
  const rejection = event('mux:process_frame', heldRow).find((entry) => entry.frame.type === 'response' && entry.frame.id === heldReceipt.requestId && !entry.frame.success);
  assert(rejection);
  assert.equal(event('mux:writer_close', heldRow).length, 0);
  assert.equal(queue(heldRow).length, 1);
  const heldNext = `002-${randomUUID()}`;
  const heldNextBody = 'fixture:new intent enqueued during ending actor';
  let enqueueError;
  const heldEnqueue = enqueue(heldRow, heldNext, heldNextBody);
  heldEnqueue.catch((error) => { enqueueError = error; });
  await until('new intent durable during source EOF hold', () => {
    if (enqueueError) throw enqueueError;
    return queue(heldRow).some((item) => item.msg === heldNext);
  });
  assert.deepEqual(queue(heldRow).map((item) => item.msg), [heldMsg, heldNext]);
  assert.equal(event('mux:writer_open', heldRow).length, 1, 'No successor declaration before exact old drain completion');
  assert.equal(event('mux:generation', heldRow).length, 1);
  assert.equal(event('mux:writer_close', heldRow).length, 0);
  assert.equal(receipts(heldRow, heldBody).length, 1);
  assert.equal(receipts(heldRow, heldNextBody).length, 0);
  record('driver:ending_actor_queue_observed', { conversation: heldRow.id, generation: heldReceipt.generation, pending: queue(heldRow), release: eofHold.release });
  writeFileSync(eofHold.release, 'release source EOF drain after second durable enqueue\n', { flag: 'wx' });
  output(await heldEnqueue);
  const heldRecovered = await drainHeadThenNew(heldRow, heldBody, heldMsg, 2, heldNextBody, heldNext);
  assert.equal(heldRecovered.headReceipt.sessionId, heldIdentity.sessionId);
  assert.equal(event('mux:writer_open', heldRow).length, 2, 'Exactly one successor, with no third enqueue/nudge');
  assert.equal(event('mux:generation', heldRow).length, 2);
  assert.equal(transcript(heldRow).filter((entry) => entry.type === 'fault_trigger' && entry.body === heldBody).length, 1);
  const heldJournal = journal();
  const queuedAt = heldJournal.findIndex((entry) => entry.event === 'driver:ending_actor_queue_observed');
  const releasedAt = heldJournal.findIndex((entry) => entry.event === 'omp:eof_drain_released' && entry.generation === heldReceipt.generation);
  const childAt = heldJournal.findIndex((entry) => entry.event === 'dial:child_close' && entry.generation === heldReceipt.generation);
  const dialAt = heldJournal.findIndex((entry) => entry.event === 'dial:exit' && entry.generation === heldReceipt.generation);
  const oldCloseAt = heldJournal.findIndex((entry) => entry.event === 'mux:writer_close' && entry.agent === heldRow.agentId);
  const successorDeclaration = event('mux:writer_open', heldRow)[1].declaration;
  const successorAt = heldJournal.findIndex((entry) => entry.event === 'mux:writer_open' && entry.declaration === successorDeclaration);
  assert(queuedAt >= 0 && releasedAt > queuedAt && childAt > releasedAt && dialAt > childAt && oldCloseAt > dialAt && successorAt > oldCloseAt,
    'Successor must follow source release, real child/dial exit, and old declaration closure');
  scenarios.push({ kind: 'enqueue during held ending-actor drain', conversation: heldRow.id, oldRequest: heldReceipt.requestId,
    recoveredHead: heldRecovered.headReceipt, recoveredNext: heldRecovered.nextReceipt,
    ordering: { queuedAt, releasedAt, childAt, dialAt, oldCloseAt, successorAt } });

  // Canonicalization must be performed by production, never by these fixtures.
  const canonicalDials = journal().filter((entry) => entry.event === 'dial:canonical_mux_url');
  assert.equal(canonicalDials.length, journal().filter((entry) => entry.event === 'dial:spawn').length);
  assert(canonicalDials.length >= 6);
  assert.equal(journal().filter((entry) => entry.event === 'dial:invalid_mux_url').length, 0);
  for (const entry of canonicalDials) {
    assert.equal(entry.argumentUrl, expectedMuxUrl);
    assert.equal(entry.environmentUrl, expectedMuxUrl);
    assert.equal(entry.protocol, 'ws:');
  }
  for (const row of rows) {
    const saved = getRow(row);
    const header = transcript(row)[0];
    assert.equal(saved.sessionId, header.sessionId);
    assert.equal(saved.sessionFile, sourceStart(row).sessionFile);
    for (const writer of event('mux:writer_open', row)) assert.equal(writer.websocketUrl, new URL(`/agents/${encodeURIComponent(row.agentId)}/writer`, expectedMuxUrl).href);
    const starts = transcript(row).filter((entry) => entry.type === 'generation_start');
    assert.equal(starts.length, 2);
    assert.equal(starts[0].resumed, null);
    assert.equal(starts[1].resumed, saved.sessionId);
    assert(starts.every((entry) => entry.muxUrl === expectedMuxUrl));
    assert.equal(queue(row).length, 0);
  }

  let ownedStarted;
  const ready = new Promise((resolveReady) => { ownedStarted = resolveReady; });
  const release = new Promise((resolveRelease) => { releaseOwned = resolveRelease; });
  const owned = runtime.run(async (ctx) => {
    ownedStarted();
    await release;
    assert.equal(ctx.signal.aborted, true);
    assert.equal(ctx.db.select().from(schema.conversation).all().length, rows.length);
    record('driver:owned_runtime_operation_drained');
  });
  await ready;
  let stopResolved = false;
  const stopping = runtime.stop().then(() => { stopped = true; stopResolved = true; record('driver:stop_resolved'); });
  await until('all failure and successor writer declarations closed', () => rows.every((row) => event('mux:writer_close', row).length === event('mux:writer_open', row).length));
  assert.equal(stopResolved, false);
  releaseOwned();
  await owned;
  await stopping;
  assert.throws(() => context.db.select().from(schema.conversation).all(), /closed|not open/i);
  await assert.rejects(runtime.run(() => 'not allowed'), /stopped/i);
  await until('all actual WS sockets closed', () => mux.liveSockets() === 0);
  for (const spawned of journal().filter((entry) => entry.event === 'dial:spawn')) {
    const entries = journal();
    const drained = entries.findIndex((entry) => entry.event === 'dial:child_close' && entry.pid === spawned.pid);
    const exited = entries.findIndex((entry) => entry.event === 'dial:exit' && entry.pid === spawned.pid);
    const completed = entries.findIndex((entry) => entry.event === 'driver:stop_resolved');
    assert(drained >= 0 && exited > drained && completed > exited);
    for (const pid of [spawned.pid, spawned.childPid]) assert.throws(() => process.kill(pid, 0), (error) => error.code === 'ESRCH');
  }
  const persisted = new Database(join(runHome, 'lab/lab.sqlite'), { readonly: true, fileMustExist: true });
  let persistedRows;
  try {
    persistedRows = persisted.prepare('SELECT id, owner_id, agent_id, session_id, session_file, worktree FROM conversation ORDER BY id').all();
    assert.equal(persistedRows.length, 3);
    assert.equal(persisted.prepare('SELECT count(*) AS count FROM human_irc_queue').get().count, 0);
    assert(persistedRows.every((row) => typeof row.session_id === 'string' && typeof row.session_file === 'string'));
  } finally { persisted.close(); }
  assert.equal(watchdogFired, false);
  const evidence = { scope: 'Supplemental internal lifecycle failure integration only; no public RPC, auth-flow, live-service or global completion claim', fixtureSnapshot,
    fixtures: { mux: join(here, 'mux-failure-fixture.mjs'), dial: join(here, 'dial-failure-fixture.mjs'), omp: join(here, 'omp-failure-fixture.mjs') },
    runHome, journalFile, sqlite: join(runHome, 'lab/lab.sqlite'), rawConfiguredMuxUrl: mux.url, expectedCanonicalMuxUrl: expectedMuxUrl,
    lazyRoot: 'Create publishes clone and row without generation; first prompt starts root; identity/file reread from authoritative SQLite',
    canonicalDials, scenarios, snapshots, persistedRows, watchdogFired,
    observations: ['pending admission unsolicited exit retains intent and automatically ends actor without hanging', 'no retry until explicit future enqueue',
      'admitted interrupted turn cannot strand future intent or replay already admitted body', 'ending actor waits source-owned EOF drain before successor',
      'once-rejected pending head and newly enqueued intent admitted in order on same resumed source session', 'writer/dial/environment share canonical ws URL',
      'every child dial declaration and SQLite connection drained before completion'] };
  writeFileSync(join(runHome, 'evidence.json'), `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(JSON.stringify({ status: 'passed', ...evidence }, null, 2));
} catch (error) {
  record('driver:failure', { name: error.name, message: error.message, stack: error.stack });
  console.error(`Failure Lab04 driver failed; artifacts: ${runHome}`);
  throw error;
} finally {
  releaseOwned();
  releaseHeldEof();
  if (runtime && !stopped) {
    try { await runtime.stop(); }
    catch (error) { console.error('Failure driver cleanup error:', error); }
  }
  await mux.close();
  clearTimeout(watchdog);
  clearTimeout(forcedExit);
}
