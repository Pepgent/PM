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

// Execute from the checkout: node --import tsx /tmp/pepgent-eng-lab3/lab04/concurrent-first-driver.mjs <repo>
// One internal sessions race only; this is not public RPC, official auth-flow or live-service evidence.
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(process.argv[2] ?? process.cwd());
const require = createRequire(join(repo, 'package.json'));
const Database = require('better-sqlite3');
const { eq, asc } = require('drizzle-orm');
const source = join(repo, 'apps/web/src/server/lab');
const { launchLabRuntime } = await import(pathToFileURL(join(source, 'runtime.ts')).href);
const schema = await import(pathToFileURL(join(source, 'schema.ts')).href);
const authSchema = await import(pathToFileURL(join(source, 'auth-schema.ts')).href);
const fixtureSnapshot = 'lab04-concurrent-first-prompts';
const runHome = mkdtempSync(join(here, 'concurrent-first-run-'));
const control = join(runHome, 'control');
const journalFile = join(runHome, 'boundary.jsonl');
const sqlite = join(runHome, 'lab/lab.sqlite');
const fixtures = { mux: join(here, 'mux-failure-fixture.mjs'), dial: join(here, 'dial-failure-fixture.mjs'), omp: join(here, 'omp-step-fixture.mjs') };
mkdirSync(control);
writeFileSync(journalFile, '', { mode: 0o600 });
const record = (event, fields = {}) => appendFileSync(journalFile, `${JSON.stringify({ ...fields, event, fixtureSnapshot, at: Date.now() })}\n`);
const jsonl = (file) => file !== null && existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line)) : [];
const journal = () => jsonl(journalFile);
const waitMs = Number(process.env.LAB04_TIMEOUT_MS ?? 15000);
const watchdogMs = Number(process.env.LAB04_WATCHDOG_MS ?? 60000);
assert(Number.isFinite(waitMs) && waitMs > 0 && Number.isFinite(watchdogMs) && watchdogMs > 0);
const ids = { lab: randomUUID(), user: randomUUID(), member: randomUUID(), project: randomUUID() };
const intents = [
  { msg: 'concurrent-first-a', body: 'fixture:concurrent first intent A' },
  { msg: 'concurrent-first-b', body: 'fixture:concurrent first intent B' },
];
const snapshots = [];
let runtime;
let context;
let mux;
let stopped = false;
let watchdogFired = false;
let forcedExit;
let releaseOwned = () => undefined;
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
  process.exitCode = 124;
  record('driver:watchdog_failure', { watchdogMs });
  console.error(`Concurrent-first watchdog expired; this run cannot pass. Artifacts: ${runHome}`);
  releaseOwned();
  signalOwned('SIGTERM', false);
  void runtime?.stop().catch((error) => record('driver:watchdog_stop_error', { message: error.message }));
  forcedExit = setTimeout(() => { signalOwned('SIGKILL', true); process.exit(124); }, 2000);
}, watchdogMs);
async function until(label, observation) {
  const started = Date.now();
  for (;;) {
    assert.equal(watchdogFired, false, 'Watchdog cleanup can never count as scenario evidence');
    if (mux?.failures.length) throw new AggregateError(mux.failures, 'Concurrent-first fixture protocol failure');
    const value = await observation();
    if (value) return value;
    if (Date.now() - started > waitMs) throw new Error(`Timed out awaiting ${label}; artifacts: ${runHome}`);
    await delay(15);
  }
}
function output(result) { assert.equal(result.ok, true, JSON.stringify(result)); return result.output; }
const getRow = (row) => context.db.select().from(schema.conversation).where(eq(schema.conversation.id, row.id)).get();
// This is the production queue order, not a fixture-reordered view of the race.
const queue = (row) => context.db.select().from(schema.humanIrcQueue).where(eq(schema.humanIrcQueue.conversationId, row.id))
  .orderBy(asc(schema.humanIrcQueue.queuedAt), asc(schema.humanIrcQueue.msg)).all();
const transcript = (row) => {
  const saved = getRow(row);
  assert(saved, 'Conversation must remain persisted while its runtime is open');
  return jsonl(saved.sessionFile);
};
const events = (name, row) => mux.events.filter((entry) => entry.event === name && entry.agent === row.agentId);
const promptWires = (row) => events('mux:writer_frame', row).filter((entry) => entry.frame.type === 'prompt');
const receiptFor = (row, body) => transcript(row).filter((entry) => entry.type === 'prompt_received' && entry.body === body);
const git = async (cwd, ...args) => (await promisify(execFile)('git', ['-C', cwd, ...args], {
  encoding: 'utf8', env: { PATH: process.env.PATH, HOME: runHome, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null', GIT_TERMINAL_PROMPT: '0', GIT_ALLOW_PROTOCOL: 'file' },
})).stdout.trim();
function assertWireIdentity(row, receipt, intent, identity) {
  assert.equal(receipt.principal, ids.user);
  assert.equal(receipt.message, `human:${ids.user}\n${intent.body}`);
  assert.equal(receipt.sessionId, identity.sessionId);
  assert.equal(realpathSync(receipt.cwd), realpathSync(identity.worktree));
  const wires = promptWires(row).filter((entry) => entry.frame.id === receipt.requestId);
  assert.equal(wires.length, 1);
  assert.equal(wires[0].frame.message, receipt.message);
  const snapshot = snapshots.find((entry) => entry.command === 'prompt' && entry.requestId === receipt.requestId);
  assert(snapshot?.databaseOpen);
  assert.equal(snapshot.row.sessionId, identity.sessionId);
  assert.equal(snapshot.row.sessionFile, identity.sessionFile);
  assert.equal(snapshot.row.ownerId, ids.member);
  assert(snapshot.queue.some((entry) => entry.msg === intent.msg && entry.principal === ids.user && entry.body === intent.body));
  return snapshot;
}
function assertSingleGeneration(row, identity, generation, expectedMuxUrl) {
  assert.equal(events('mux:writer_open', row).length, 1);
  assert.equal(events('mux:generation', row).length, 1);
  assert.equal(events('mux:generation', row)[0].generation, generation);
  assert.equal(events('mux:process_open', row).length, 1);
  assert.equal(events('mux:process_open', row)[0].generation, generation);
  assert.equal(events('mux:process_open', row)[0].declaration, events('mux:writer_open', row)[0].declaration);
  assert.equal(events('mux:writer_open', row)[0].websocketUrl, new URL(`/agents/${encodeURIComponent(row.agentId)}/writer`, expectedMuxUrl).href);
  const starts = journal().filter((entry) => entry.event === 'omp:start');
  assert.equal(starts.length, 1);
  assert.equal(starts[0].generation, generation);
  assert.equal(starts[0].sessionId, identity.sessionId);
  assert.equal(starts[0].sessionFile, identity.sessionFile);
  assert.equal(starts[0].resumed, null);
  const headers = transcript(row).filter((entry) => entry.type === 'session');
  assert.equal(headers.length, 1);
  assert.equal(headers[0].sessionId, identity.sessionId);
  assert.equal(realpathSync(headers[0].cwd), realpathSync(identity.worktree));
  assert.equal(transcript(row).filter((entry) => entry.type === 'generation_start').length, 1);
  const dials = journal().filter((entry) => entry.event === 'dial:spawn');
  assert.equal(dials.length, 1);
  assert.equal(dials[0].agent, row.agentId);
  assert.equal(dials[0].generation, generation);
  assert.equal(realpathSync(dials[0].cwd), realpathSync(identity.worktree));
  const canonical = journal().filter((entry) => entry.event === 'dial:canonical_mux_url');
  assert.equal(canonical.length, 1);
  assert.equal(canonical[0].argumentUrl, expectedMuxUrl);
  assert.equal(canonical[0].environmentUrl, expectedMuxUrl);
  assert.equal(canonical[0].protocol, 'ws:');
  assert.equal(journal().filter((entry) => entry.event === 'dial:invalid_mux_url').length, 0);
  assert.equal(getRow(row).sessionId, identity.sessionId);
  assert.equal(getRow(row).sessionFile, identity.sessionFile);
}

try {
  const bearer = randomBytes(32).toString('hex');
  mux = await createFailureMuxFixture({ repo, bearer, journalFile, observe: (entry) => {
    if (!context) return;
    const command = entry.event === 'mux:writer_frame' && ['set_host_tools', 'prompt'].includes(entry.frame.type);
    if (!command && entry.event !== 'mux:writer_close') return;
    try {
      const row = context.db.select().from(schema.conversation).all().find((item) => item.agentId === entry.agent) ?? null;
      const snapshot = { observedEvent: entry.event, agent: entry.agent, declaration: entry.declaration,
        command: command ? entry.frame.type : null, requestId: command ? entry.frame.id : null, row,
        queue: row ? queue(row) : [], databaseOpen: true };
      snapshots.push(snapshot);
      record('driver:source_snapshot', snapshot);
    } catch (error) { snapshots.push({ observedEvent: entry.event, agent: entry.agent, databaseOpen: false, message: error.message }); }
  } });
  const rawConfiguredMuxUrl = mux.url;
  const canonical = new URL(rawConfiguredMuxUrl);
  canonical.protocol = 'ws:';
  const expectedMuxUrl = canonical.href;
  const sourceRepo = join(runHome, 'library-source');
  const bareRepo = join(runHome, 'library.git');
  mkdirSync(join(sourceRepo, 'nodes'), { recursive: true });
  writeFileSync(join(sourceRepo, 'nodes/fixture.ts'), 'export const fixture = "actual clone";\n');
  await git(sourceRepo, 'init', '-b', 'main');
  await git(sourceRepo, 'add', 'nodes/fixture.ts');
  await git(sourceRepo, '-c', 'user.name=Lab04 Concurrent Fixture', '-c', 'user.email=concurrent@example.invalid', 'commit', '-m', 'Create concurrent fixture library');
  await git(runHome, 'clone', '--bare', sourceRepo, bareRepo);
  runtime = await launchLabRuntime({ home: join(runHome, 'lab'), migrationsFolder: join(repo, 'apps/web/resources/lab/migrations'),
    auth: { secret: randomBytes(48).toString('hex'), baseURL: 'http://127.0.0.1:43199' }, library: { cacheHome: join(runHome, 'library-cache'), storeUrl: null },
    sessions: { muxUrl: mux.url, bearer, muxBinary: fixtures.dial, command: [process.execPath, fixtures.omp],
      worktreeHome: join(runHome, 'worktrees'), sessionHome: join(runHome, 'sessions'),
      environment: { PATH: process.env.PATH, HOME: runHome, TMPDIR: '/tmp', LAB04_REPO: repo, LAB04_JOURNAL: journalFile, LAB04_CONTROL: control } } });
  await runtime.run((ctx) => {
    context = ctx;
    const now = new Date();
    ctx.db.insert(authSchema.user).values({ id: ids.user, name: 'Concurrent user', email: `${ids.user}@example.invalid`, emailVerified: true, createdAt: now, updatedAt: now }).run();
    ctx.db.insert(authSchema.organization).values({ id: ids.lab, name: 'Concurrent Lab', slug: `concurrent-${ids.lab}`, createdAt: now }).run();
    ctx.db.insert(authSchema.member).values({ id: ids.member, organizationId: ids.lab, userId: ids.user, role: 'owner', createdAt: now }).run();
    ctx.db.insert(schema.project).values({ id: ids.project, labId: ids.lab, name: 'Concurrent project' }).run();
    ctx.db.insert(schema.libraryRepo).values({ id: randomUUID(), labId: ids.lab, remoteUrl: bareRepo, branch: 'main' }).run();
  });
  const row = output(await runtime.run((ctx) => ctx.sessions.open(ids.lab, ids.member, { kind: 'Discussion', name: 'Concurrent first prompts', project: ids.project })));
  assert.equal(row.sessionId, null);
  assert.equal(row.sessionFile, null);
  assert.equal(getRow(row).sessionId, null);
  assert.equal(getRow(row).sessionFile, null);
  assert.equal(getRow(row).ownerId, ids.member);
  assert.equal(events('mux:writer_open', row).length, 0);
  assert.equal(events('mux:generation', row).length, 0);
  assert.equal(journal().filter((entry) => ['omp:start', 'dial:spawn'].includes(entry.event)).length, 0);
  assert.equal(queue(row).length, 0);
  assert.deepEqual(transcript(row), []);
  assert.equal(await git(row.worktree, 'branch', '--show-current'), `conv/${row.id}`);
  assert.equal(await git(row.worktree, 'remote', 'get-url', 'origin'), bareRepo);
  assert.equal(readFileSync(join(row.worktree, 'nodes/fixture.ts'), 'utf8'), 'export const fixture = "actual clone";\n');
  record('driver:lazy_creation_observed', { row: getRow(row) });

  // Neither enqueue waits for the other; no source step or settlement is released here.
  const accepted = await runtime.run((ctx) => Promise.all(intents.map((intent) => ctx.sessions.prompt(row.id, intent.msg, ids.user, intent.body))));
  accepted.forEach((result, index) => assert.deepEqual(output(result), { kind: 'queued', msg: intents[index].msg }));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled'));
  record('driver:both_enqueue_receipts_before_settlement', { conversation: row.id, accepted, intents });
  const first = await until('first actual source prompt', () => transcript(row).find((entry) => entry.type === 'prompt_received'));
  const firstIntent = intents.find((intent) => intent.body === first.body);
  assert(firstIntent);
  const secondIntent = intents.find((intent) => intent.msg !== firstIntent.msg);
  assert(secondIntent);
  const identity = getRow(row);
  assert.equal(typeof identity.sessionId, 'string');
  assert.equal(typeof identity.sessionFile, 'string');
  const firstSnapshot = assertWireIdentity(row, first, firstIntent, identity);
  assert.deepEqual(firstSnapshot.queue.map((entry) => ({ msg: entry.msg, principal: entry.principal, body: entry.body })), [firstIntent, secondIntent].map((intent) => ({ ...intent, principal: ids.user })),
    'Actual first wire must consume the authoritative queue head while both concurrent intents are durable');
  await until('first admission removes only queue head', () => queue(row).every((entry) => entry.msg !== firstIntent.msg));
  assert.deepEqual(queue(row).map((entry) => ({ msg: entry.msg, principal: entry.principal, body: entry.body })), [{ ...secondIntent, principal: ids.user }]);
  assert.equal(receiptFor(row, firstIntent.body).length, 1);
  assert.equal(receiptFor(row, secondIntent.body).length, 0);
  assert.equal(promptWires(row).length, 1);
  assert(transcript(row).some((entry) => entry.type === 'prompt_admitted' && entry.requestId === first.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled'));
  const toolsSnapshot = snapshots.find((entry) => entry.command === 'set_host_tools');
  assert(toolsSnapshot?.databaseOpen);
  assert.equal(toolsSnapshot.row.sessionId, identity.sessionId);
  assert.equal(toolsSnapshot.row.sessionFile, identity.sessionFile);
  assertSingleGeneration(row, identity, first.generation, expectedMuxUrl);
  record('driver:concurrent_queue_head_observed', { conversation: row.id, first, pending: queue(row), identity });

  record('driver:step_control', { conversation: row.id, requestId: first.requestId });
  writeFileSync(join(control, `step-${first.requestId}`), 'emit actual turn_end without settling either concurrent intent\n', { flag: 'wx' });
  const second = await until('second concurrent intent steered at real step', () => receiptFor(row, secondIntent.body)[0]);
  await until('steer admission clears remaining queue', () => queue(row).length === 0);
  assert.notEqual(second.requestId, first.requestId);
  assert.equal(second.streamingBehavior, 'steer');
  assert.equal(second.generation, first.generation);
  assert.equal(second.sessionId, first.sessionId);
  assert.equal(second.principal, first.principal);
  assert.deepEqual(second.activeRequestIds, [first.requestId]);
  assertWireIdentity(row, second, secondIntent, identity);
  assert.equal(promptWires(row).find((entry) => entry.frame.id === second.requestId).frame.streamingBehavior, 'steer');
  assert(transcript(row).some((entry) => entry.type === 'prompt_admitted' && entry.requestId === second.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled'));
  const boundaries = transcript(row).filter((entry) => entry.type === 'step_boundary' && entry.requestId === first.requestId);
  assert.equal(boundaries.length, 1);
  const turnEnds = journal().filter((entry) => entry.event === 'omp:stdout' && entry.generation === first.generation && entry.frame.type === 'turn_end');
  assert.equal(turnEnds.length, 1);
  assert(boundaries[0].fixtureSequence > first.fixtureSequence && turnEnds[0].fixtureSequence > boundaries[0].fixtureSequence && second.fixtureSequence > turnEnds[0].fixtureSequence);
  assertSingleGeneration(row, identity, first.generation, expectedMuxUrl);

  writeFileSync(join(control, `settle-${first.requestId}`), 'settle only the first concurrent request\n', { flag: 'wx' });
  const firstResult = await until('first result delivered while second remains active', () => events('mux:process_frame', row)
    .find((entry) => entry.frame.type === 'prompt_result' && entry.frame.id === first.requestId));
  assert.equal(firstResult.frame.status, 'completed');
  assert.equal(firstResult.frame.sessionSettled, false);
  const firstSettled = transcript(row).find((entry) => entry.type === 'prompt_settled' && entry.requestId === first.requestId);
  assert(firstSettled);
  assert.equal(firstSettled.sessionSettled, false);
  assert.deepEqual(firstSettled.activeRequestIds, [second.requestId]);
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled' && entry.requestId === second.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'stdin_closed'));
  assert(!events('mux:writer_frame', row).some((entry) => entry.frame.type === 'mux_close_stdin'));
  assert.equal(events('mux:writer_close', row).length, 0);
  record('driver:first_result_not_session_settled', { conversation: row.id, firstRequest: first.requestId, secondRequest: second.requestId });
  writeFileSync(join(control, `settle-${second.requestId}`), 'settle final concurrent request and allow natural parking\n', { flag: 'wx' });
  const secondResult = await until('final concurrent result is session settled', () => events('mux:process_frame', row)
    .find((entry) => entry.frame.type === 'prompt_result' && entry.frame.id === second.requestId));
  assert.equal(secondResult.frame.status, 'completed');
  assert.equal(secondResult.frame.sessionSettled, true);
  const secondSettled = transcript(row).find((entry) => entry.type === 'prompt_settled' && entry.requestId === second.requestId);
  assert(secondSettled);
  assert.equal(secondSettled.sessionSettled, true);
  assert.deepEqual(secondSettled.activeRequestIds, []);
  assert(firstSettled.fixtureSequence > second.fixtureSequence && secondSettled.fixtureSequence > firstSettled.fixtureSequence);
  await until('sole dial exited normally after source drain', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === first.generation && entry.code === 0));
  await until('sole process websocket physically closed', () => events('mux:process_close', row).length === 1);
  await until('Mux exit notification reached parked writer', () => events('mux:writer_notification', row).length === 1);
  const notification = events('mux:writer_notification', row)[0];
  assert.equal(notification.writerOpen, true);
  assert.equal(notification.frame.code, 0);
  assert.equal(events('mux:writer_close', row).length, 0);
  assertSingleGeneration(row, identity, first.generation, expectedMuxUrl);
  assert.equal(queue(row).length, 0);
  assert.equal(promptWires(row).length, 2);
  for (const intent of intents) assert.equal(receiptFor(row, intent.body).length, 1);
  for (const receipt of [first, second]) {
    assert.equal(transcript(row).filter((entry) => entry.type === 'prompt_admitted' && entry.requestId === receipt.requestId).length, 1);
    assert.equal(transcript(row).filter((entry) => entry.type === 'prompt_settled' && entry.requestId === receipt.requestId).length, 1);
  }
  const entries = journal();
  const acceptedAt = entries.findIndex((entry) => entry.event === 'driver:both_enqueue_receipts_before_settlement');
  const queueAt = entries.findIndex((entry) => entry.event === 'driver:concurrent_queue_head_observed');
  const stepControlAt = entries.findIndex((entry) => entry.event === 'driver:step_control');
  const turnEndAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.frame.type === 'turn_end');
  const steerAt = entries.findIndex((entry) => entry.event === 'mux:writer_frame' && entry.frame.type === 'prompt' && entry.frame.id === second.requestId);
  const firstResultAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.frame.type === 'prompt_result' && entry.frame.id === first.requestId);
  const stillActiveAt = entries.findIndex((entry) => entry.event === 'driver:first_result_not_session_settled');
  const finalResultAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.frame.type === 'prompt_result' && entry.frame.id === second.requestId);
  const eofAt = entries.findIndex((entry) => entry.event === 'mux:writer_frame' && entry.frame.type === 'mux_close_stdin');
  const childAt = entries.findIndex((entry) => entry.event === 'dial:child_close');
  const dialAt = entries.findIndex((entry) => entry.event === 'dial:exit');
  const ordering = { acceptedAt, queueAt, stepControlAt, turnEndAt, steerAt, firstResultAt, stillActiveAt, finalResultAt, eofAt, childAt, dialAt };
  assert(acceptedAt >= 0 && queueAt > acceptedAt && stepControlAt > queueAt && turnEndAt > stepControlAt && steerAt > turnEndAt &&
    firstResultAt > steerAt && stillActiveAt > firstResultAt && finalResultAt > stillActiveAt && eofAt > finalResultAt && childAt > eofAt && dialAt > childAt);

  let ownedStarted;
  const ownedReady = new Promise((resolveReady) => { ownedStarted = resolveReady; });
  const ownedRelease = new Promise((resolveRelease) => { releaseOwned = resolveRelease; });
  const owned = runtime.run(async (ctx) => {
    ownedStarted();
    await ownedRelease;
    assert.equal(ctx.signal.aborted, true);
    assert.equal(ctx.db.select().from(schema.conversation).all().length, 1);
    record('driver:owned_operation_drained_with_database_open');
  });
  await ownedReady;
  let stopResolved = false;
  const stopping = runtime.stop().then(() => { stopped = true; stopResolved = true; record('driver:stop_resolved'); });
  assert.equal(runtime.signal.aborted, true);
  await until('sole writer physically closed during runtime stop', () => events('mux:writer_close', row).length === 1);
  await until('all real websocket endpoints closed before database close', () => mux.liveSockets() === 0);
  assert.equal(stopResolved, false, 'Database lifetime remains held by the actual owned operation');
  assert.equal(getRow(row).sessionId, identity.sessionId);
  assert.equal(getRow(row).sessionFile, identity.sessionFile);
  const spawned = journal().find((entry) => entry.event === 'dial:spawn');
  for (const pid of [spawned.pid, spawned.childPid]) assert.throws(() => process.kill(pid, 0), (error) => error.code === 'ESRCH');
  assert(snapshots.filter((entry) => entry.observedEvent === 'mux:writer_close').every((entry) => entry.databaseOpen && entry.row?.sessionFile === identity.sessionFile));
  record('driver:children_and_websockets_drained_with_database_open', { conversation: row.id, pid: spawned.pid, childPid: spawned.childPid });
  releaseOwned();
  await owned;
  await stopping;
  assert.throws(() => context.db.select().from(schema.conversation).all(), /closed|not open/i);
  await assert.rejects(runtime.run(() => 'not allowed'), /stopped/i);
  const ended = journal();
  const stopAt = ended.findIndex((entry) => entry.event === 'driver:stop_resolved');
  const resourcesAt = ended.findIndex((entry) => entry.event === 'driver:children_and_websockets_drained_with_database_open');
  const writerCloseAt = ended.findIndex((entry) => entry.event === 'mux:writer_close');
  assert(writerCloseAt > dialAt && resourcesAt > writerCloseAt && stopAt > resourcesAt);
  assert.equal(mux.liveSockets(), 0);
  assert.equal(mux.failures.length, 0);
  const persisted = new Database(sqlite, { readonly: true, fileMustExist: true });
  let persistedRows;
  try {
    persistedRows = persisted.prepare('SELECT id, owner_id, agent_id, session_id, session_file, worktree FROM conversation ORDER BY id').all();
    assert.deepEqual(persistedRows, [{ id: row.id, owner_id: ids.member, agent_id: row.agentId, session_id: identity.sessionId, session_file: identity.sessionFile, worktree: identity.worktree }]);
    assert.equal(persisted.prepare('SELECT count(*) AS count FROM human_irc_queue').get().count, 0);
  } finally { persisted.close(); }
  await mux.close();
  mux = undefined;
  assert.equal(watchdogFired, false);
  const evidence = { scope: 'Supplemental internal sessions concurrent-first-enqueue integration only; no public RPC, auth-flow, live-service or global completion claim',
    fixtureSnapshot, fixtures, runHome, journalFile, sqlite, rawConfiguredMuxUrl, expectedCanonicalMuxUrl: expectedMuxUrl,
    conversation: row.id, owner: ids.member, principal: ids.user, intents, accepted, identity, first, second, firstSettled, secondSettled,
    ordering: { ...ordering, writerCloseAt, resourcesAt, stopAt }, snapshots, persistedRows, watchdogFired,
    observations: ['two concurrent first enqueue receipts before any source settlement', 'one writer, generation, source header and persisted session identity/file pair',
      'authoritative queue head admitted once while second intent remained durable', 'actual source turn_end admitted second intent as same-generation steer',
      'first result non-settled without EOF; final result session-settled followed by natural park', 'children and real websocket endpoints drained while database remained open; persisted pair and empty queue reread after stop'] };
  writeFileSync(join(runHome, 'evidence.json'), `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(JSON.stringify({ status: 'passed', ...evidence }, null, 2));
} catch (error) {
  record('driver:failure', { name: error.name, message: error.message, stack: error.stack });
  console.error(`Concurrent-first Lab04 driver failed; artifacts: ${runHome}`);
  throw error;
} finally {
  releaseOwned();
  if (runtime && !stopped) {
    try { await runtime.stop(); }
    catch (error) { record('driver:cleanup_failure', { message: error.message }); process.exitCode = process.exitCode || 1; }
  }
  if (mux) await mux.close();
  clearTimeout(watchdog);
  clearTimeout(forcedExit);
}
