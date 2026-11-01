import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { randomBytes, randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { promisify } from 'node:util';
import { createMuxFixture } from './mux-fixture.mjs';

// Execute from the checkout: node --import tsx /tmp/pepgent-eng-lab3/lab04/auth-lazy-driver.mjs <repo>
// This exercises internal server operations, not HTTP/public RPC or live services.
const here = dirname(fileURLToPath(import.meta.url));
const fixtureSnapshot = 'lab04-omp-step-control';
const ompFixture = join(here, 'omp-step-fixture.mjs');
const repo = resolve(process.argv[2] ?? process.cwd());
const require = createRequire(join(repo, 'package.json'));
const Database = require('better-sqlite3');
const { eq } = require('drizzle-orm');
const source = join(repo, 'apps/web/src/server/lab');
const { launchLabRuntime } = await import(pathToFileURL(join(source, 'runtime.ts')).href);
const { createDiscussion, promptDiscussion } = await import(pathToFileURL(join(source, 'discussion-operations.ts')).href);
const schema = await import(pathToFileURL(join(source, 'schema.ts')).href);
const authSchema = await import(pathToFileURL(join(source, 'auth-schema.ts')).href);
const runHome = mkdtempSync(join(here, 'auth-run-'));
const journalFile = join(runHome, 'boundary.jsonl');
const control = join(runHome, 'control');
const worktreeHome = join(runHome, 'worktrees');
const sessionHome = join(runHome, 'sessions');
const cacheHome = join(runHome, 'library-cache');
mkdirSync(control);
writeFileSync(journalFile, '', { mode: 0o600 });
const record = (event, fields = {}) => appendFileSync(journalFile, `${JSON.stringify({ ...fields, event, at: Date.now() })}\n`);
const jsonl = (file) => existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line)) : [];
const journal = () => jsonl(journalFile);
const execute = promisify(execFile);
const git = async (cwd, ...args) => (await execute('git', ['-C', cwd, ...args], {
  encoding: 'utf8', env: { PATH: process.env.PATH, HOME: runHome, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null', GIT_TERMINAL_PROMPT: '0', GIT_ALLOW_PROTOCOL: 'file' },
})).stdout.trim();
const sourceRepo = join(runHome, 'library-source');
const bareRepo = join(runHome, 'library.git');
const timeoutMs = Number(process.env.LAB04_TIMEOUT_MS ?? 20000);
const identities = [];
const discussions = [];
const prompts = [];
const denials = [];
const roleChanges = [];
const sourceSnapshots = [];
let stepBoundary = null;
let runtime;
let context;
let stopped = false;
let releaseOwned = () => undefined;
const bearer = randomBytes(32).toString('hex');
const mux = await createMuxFixture({ repo, bearer, journalFile, observe: (entry) => {
  if (!context) return;
  const promptWire = entry.event === 'mux:writer_frame' && entry.frame.type === 'prompt';
  if (!promptWire && entry.event !== 'mux:writer_close') return;
  try {
    const rows = context.db.select().from(schema.conversation).all();
    const snapshot = { observedEvent: entry.event, agent: entry.agent, requestId: promptWire ? entry.frame.id : null,
      row: rows.find((row) => row.agentId === entry.agent) ?? null,
      pending: context.db.select().from(schema.humanIrcQueue).all(), databaseOpen: true };
    sourceSnapshots.push(snapshot);
    record('auth-driver:source_snapshot', snapshot);
  } catch (error) {
    sourceSnapshots.push({ observedEvent: entry.event, agent: entry.agent, databaseOpen: false, message: error.message });
  }
} });
async function until(label, observe) {
  const start = Date.now();
  for (;;) {
    if (mux.failures.length) throw new AggregateError(mux.failures, 'External fixture protocol failure');
    const result = await observe();
    if (result) return result;
    if (Date.now() - start > timeoutMs) throw new Error(`Timed out awaiting ${label}; artifacts: ${runHome}`);
    await delay(15);
  }
}
function output(result) { assert.equal(result.ok, true, JSON.stringify(result)); return result.output; }
const queue = (id) => context.db.select().from(schema.humanIrcQueue).where(eq(schema.humanIrcQueue.conversationId, id)).all();
const sourceRow = (id) => context.db.select().from(schema.conversation).where(eq(schema.conversation.id, id)).get();
const currentRow = (row) => {
  const current = sourceRow(row.id);
  assert(current, `Discussion ${row.id} must remain persisted`);
  return Object.assign(row, current);
};
const sessionFile = (row) => currentRow(row).sessionFile;
const transcript = (row) => {
  const file = sessionFile(row);
  return file === null ? [] : jsonl(file);
};
const events = (event, agent) => mux.events.filter((entry) => entry.event === event && entry.agent === agent);
const directoryEntries = (directory) => existsSync(directory) ? readdirSync(directory).sort() : [];
const bytes = (file) => existsSync(file) ? readFileSync(file).toString('base64') : null;
const publicIdentity = (identity) => ({ role: identity.role, userId: identity.userId, memberId: identity.memberId, sessionId: identity.sessionId });
let lab;
const projectId = randomUUID();
async function api(operation) { return runtime.run((ctx) => operation(ctx.auth.api)); }
async function sessionIdentity(identity) {
  const current = await api((auth) => auth.getSession({ headers: identity.headers }));
  assert(current, 'The original official sign-in session must remain valid');
  assert.equal(current.user.id, identity.userId);
  assert.equal(current.session.id, identity.sessionId);
  assert.equal(current.session.activeOrganizationId ?? null, null, 'Explicit target Lab must not require active organization');
  assert.equal(identity.headers.get('cookie'), identity.originalCookie, 'Role transitions must not require a replacement cookie');
  const persisted = context.db.select({ id: authSchema.session.id, activeOrganizationId: authSchema.session.activeOrganizationId })
    .from(authSchema.session).where(eq(authSchema.session.id, identity.sessionId)).get();
  assert(persisted);
  assert.equal(persisted.activeOrganizationId, null);
  return { userId: current.user.id, sessionId: current.session.id, activeOrganizationId: current.session.activeOrganizationId ?? null };
}
async function createAs(identity, name) {
  await sessionIdentity(identity);
  const created = output(await runtime.run((ctx) => createDiscussion({ lab: lab.id, project: projectId, name }, ctx, identity.headers)));
  assert.equal(created.kind, 'created');
  assert.equal(typeof created.conversation, 'string');
  const row = sourceRow(created.conversation);
  assert(row, 'Successful creation must return the persisted conversation identity');
  assert.notEqual(identity.userId, identity.memberId, 'Fixture must expose distinct user and membership identities');
  assert.equal(row.ownerId, identity.memberId);
  assert.equal(row.labId, lab.id);
  assert.equal(row.discussionProjectId, projectId);
  assert.equal(row.originKind, 'Discussion');
  assert.equal(row.sessionId, null);
  assert.equal(row.sessionFile, null);
  assert.equal(await git(row.worktree, 'branch', '--show-current'), `conv/${row.id}`);
  assert.equal(await git(row.worktree, 'remote', 'get-url', 'origin'), bareRepo);
  assert.equal(readFileSync(join(row.worktree, 'nodes/fixture.ts'), 'utf8'), readFileSync(join(sourceRepo, 'nodes/fixture.ts'), 'utf8'));
  assert.equal(events('mux:writer_open', row.agentId).length, 0, 'Lazy creation must not declare a writer');
  assert.equal(events('mux:generation', row.agentId).length, 0, 'Lazy creation must not open a generation');
  assert.equal(events('mux:process_open', row.agentId).length, 0, 'Lazy creation must not attach a dial');
  assert(!journal().some((entry) => entry.agent === row.agentId && entry.event.startsWith('dial:')));
  assert.equal(queue(row.id).length, 0);
  assert.deepEqual(transcript(row), []);
  discussions.push({ row, identity });
  record('auth-driver:created', { conversation: row.id, ...publicIdentity(identity), ompSessionId: row.sessionId, sessionFile: row.sessionFile });
  return row;
}
async function promptAs(identity, row, label, { park = true } = {}) {
  await sessionIdentity(identity);
  const msg = randomUUID();
  const body = `auth-fixture:${label}\nactual principal ${identity.userId}`;
  const result = output(await runtime.run((ctx) => promptDiscussion({ conversation: row.id, msg, text: body }, ctx, identity.headers)));
  assert.deepEqual(result, { kind: 'done' });
  const received = await until(`OMP transcript received ${label}`, () => transcript(row).find((entry) => entry.type === 'prompt_received' && entry.body === body));
  currentRow(row);
  assert.equal(typeof row.sessionId, 'string');
  assert.equal(typeof row.sessionFile, 'string');
  const header = transcript(row)[0];
  assert.equal(header.type, 'session');
  assert.equal(header.sessionId, row.sessionId);
  assert.equal(realpathSync(header.cwd), realpathSync(row.worktree));
  await until(`admission clears source queue ${label}`, () => queue(row.id).every((entry) => entry.msg !== msg));
  assert(sourceSnapshots.some((entry) => entry.observedEvent === 'mux:writer_frame' && entry.agent === row.agentId && entry.requestId === received.requestId && entry.databaseOpen &&
    entry.row?.ownerId === identity.memberId && entry.row.sessionId === row.sessionId && entry.row.sessionFile === row.sessionFile &&
    entry.pending.some((pending) => pending.conversationId === row.id && pending.msg === msg && pending.principal === identity.userId && pending.body === body)),
  'Real actor must emit its wire prompt from durable user-principal intent owned by the membership after persisting both session fields');
  assert.equal(received.principal, identity.userId);
  assert.notEqual(received.principal, identity.memberId);
  assert.equal(received.sessionId, row.sessionId);
  assert.equal(received.message, `human:${identity.userId}\n${body}`);
  assert.equal(realpathSync(received.cwd), realpathSync(row.worktree));
  assert(transcript(row).some((entry) => entry.type === 'prompt_admitted' && entry.requestId === received.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled' && entry.requestId === received.requestId));
  const evidence = { label, conversation: row.id, msg, principal: received.principal, owner: sourceRow(row.id).ownerId,
    requestId: received.requestId, generation: received.generation, sessionId: received.sessionId, sessionFile: row.sessionFile, cwd: received.cwd };
  prompts.push(evidence);
  if (park) await settleAndPark(row, received);
  return { received, evidence };
}
async function settleAndPark(row, received) {
  writeFileSync(join(control, `settle-${received.requestId}`), 'release actual external settlement\n', { flag: 'wx' });
  await until('source transcript settlement', () => transcript(row).some((entry) => entry.type === 'prompt_settled' && entry.requestId === received.requestId));
  await until('real dial exit after stdout drain', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === received.generation && entry.code === 0));
  await until('Mux source exit notification', () => events('mux:process_frame', row.agentId).some((entry) => entry.generation === received.generation && entry.frame.type === 'mux_exit' && entry.frame.code === 0));
  await until('process WS close', () => events('mux:process_close', row.agentId).some((entry) => entry.generation === received.generation));
  assert.equal(events('mux:writer_close', row.agentId).length, 0, 'Park must preserve the authenticated conversation writer declaration');
  const entries = journal();
  const settledAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.generation === received.generation && entry.frame.type === 'prompt_result' && entry.frame.id === received.requestId);
  const eofAt = entries.findIndex((entry) => entry.event === 'mux:writer_frame' && entry.agent === row.agentId && entry.frame.type === 'mux_close_stdin' && entry.frame.generation === received.generation);
  const drainedAt = entries.findIndex((entry) => entry.event === 'dial:child_close' && entry.generation === received.generation);
  assert(settledAt >= 0 && eofAt > settledAt && drainedAt > eofAt);
  assert.equal(queue(row.id).length, 0);
}
async function busyStepPrompt(identity, row) {
  const first = await promptAs(identity, row, 'owner own prompt held across step', { park: false });
  const msg = randomUUID();
  const body = `auth-fixture:queued owner step message ${msg}\nactual principal ${identity.userId}`;
  const queued = output(await runtime.run((ctx) => promptDiscussion({ conversation: row.id, msg, text: body }, ctx, identity.headers)));
  assert.deepEqual(queued, { kind: 'done' });
  // Exercise another authenticated request before observing the busy queue.
  // Neither step nor settlement control exists: this is not a timed absence test.
  await sessionIdentity(identity);
  const pending = queue(row.id).find((entry) => entry.msg === msg);
  assert(pending, 'The second human intent must remain durable while the first turn is busy');
  assert.equal(pending.principal, identity.userId);
  assert.equal(pending.body, body);
  assert(!transcript(row).some((entry) => entry.type === 'prompt_received' && entry.body === body));
  assert(!events('mux:writer_frame', row.agentId).some((entry) => entry.frame.type === 'prompt' && entry.frame.message === `human:${identity.userId}\n${body}`));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled' && entry.requestId === first.received.requestId));
  record('auth-driver:busy_queue_observed', { conversation: row.id, msg, principal: identity.userId, body, firstRequest: first.received.requestId,
    pending, firstGeneration: first.received.generation });
  const stepControl = join(control, `step-${first.received.requestId}`);
  record('auth-driver:step_control', { conversation: row.id, firstRequest: first.received.requestId, stepControl });
  writeFileSync(stepControl, 'emit one actual OMP turn_end while the first request remains active\n', { flag: 'wx' });
  const second = await until('second prompt reaches actual OMP at turn_end', () => transcript(row).find((entry) => entry.type === 'prompt_received' && entry.body === body));
  await until('steer admission clears its actual queue row', () => queue(row.id).every((entry) => entry.msg !== msg));
  assert.equal(second.streamingBehavior, 'steer');
  assert.equal(second.sessionId, first.received.sessionId);
  assert.equal(second.generation, first.received.generation);
  assert.equal(second.cwd, first.received.cwd);
  assert.equal(second.principal, identity.userId);
  assert.equal(second.message, `human:${identity.userId}\n${body}`);
  assert(second.activeRequestIds.includes(first.received.requestId), 'OMP must still own the first request when it receives the steer');
  const secondWire = events('mux:writer_frame', row.agentId).find((entry) => entry.frame.type === 'prompt' && entry.frame.id === second.requestId);
  assert(secondWire);
  assert.equal(secondWire.frame.streamingBehavior, 'steer');
  assert(sourceSnapshots.some((entry) => entry.requestId === second.requestId && entry.row?.ownerId === identity.memberId &&
    entry.pending.some((intent) => intent.conversationId === row.id && intent.msg === msg && intent.principal === identity.userId && intent.body === body)));
  assert(transcript(row).some((entry) => entry.type === 'prompt_admitted' && entry.requestId === second.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled' &&
    (entry.requestId === first.received.requestId || entry.requestId === second.requestId)), 'Both admissions must precede first settlement');
  const boundary = transcript(row).find((entry) => entry.type === 'step_boundary' && entry.requestId === first.received.requestId);
  assert(boundary);
  assert(boundary.fixtureSequence > first.received.fixtureSequence && second.fixtureSequence > boundary.fixtureSequence);
  const turnEnd = journal().find((entry) => entry.event === 'omp:stdout' && entry.generation === second.generation && entry.frame.type === 'turn_end');
  assert(turnEnd);
  assert(turnEnd.fixtureSequence > boundary.fixtureSequence && second.fixtureSequence > turnEnd.fixtureSequence);
  prompts.push({ label: 'owner busy queue delivered as steer at external turn_end', conversation: row.id, msg,
    principal: second.principal, owner: sourceRow(row.id).ownerId, requestId: second.requestId,
    generation: second.generation, sessionId: second.sessionId, cwd: second.cwd, streamingBehavior: second.streamingBehavior });
  writeFileSync(join(control, `settle-${first.received.requestId}`), 'settle only the first of two active requests\n', { flag: 'wx' });
  const firstResult = await until('first result remains not session-settled', () => events('mux:process_frame', row.agentId)
    .find((entry) => entry.generation === second.generation && entry.frame.type === 'prompt_result' && entry.frame.id === first.received.requestId));
  assert.equal(firstResult.frame.status, 'completed');
  assert.equal(firstResult.frame.sessionSettled, false);
  const firstSettled = transcript(row).find((entry) => entry.type === 'prompt_settled' && entry.requestId === first.received.requestId);
  assert(firstSettled);
  assert.equal(firstSettled.sessionSettled, false);
  assert(firstSettled.activeRequestIds.includes(second.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'prompt_settled' && entry.requestId === second.requestId));
  assert(!transcript(row).some((entry) => entry.type === 'stdin_closed' && entry.generation === second.generation));
  assert(!events('mux:writer_frame', row.agentId).some((entry) => entry.frame.type === 'mux_close_stdin' && entry.frame.generation === second.generation));
  assert.equal(events('mux:writer_close', row.agentId).length, 0);
  record('auth-driver:second_request_still_active', { conversation: row.id, generation: second.generation,
    firstRequest: first.received.requestId, secondRequest: second.requestId, firstSessionSettled: false });
  await settleAndPark(row, second);
  const settled = transcript(row).find((entry) => entry.type === 'prompt_settled' && entry.requestId === second.requestId);
  assert(settled);
  assert.equal(settled.sessionSettled, true);
  assert.equal(settled.activeRequestIds.length, 0);
  assert(firstSettled.fixtureSequence > second.fixtureSequence && settled.fixtureSequence > firstSettled.fixtureSequence);
  assert.equal(transcript(row).filter((entry) => entry.type === 'step_boundary' && entry.requestId === first.received.requestId).length, 1);
  const entries = journal();
  const busyAt = entries.findIndex((entry) => entry.event === 'auth-driver:busy_queue_observed' && entry.msg === msg);
  const controlAt = entries.findIndex((entry) => entry.event === 'auth-driver:step_control' && entry.firstRequest === first.received.requestId);
  const stepAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.generation === second.generation && entry.frame.type === 'turn_end');
  const steerAt = entries.findIndex((entry) => entry.event === 'mux:writer_frame' && entry.frame.type === 'prompt' && entry.frame.id === second.requestId);
  const firstAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.frame.type === 'prompt_result' && entry.frame.id === first.received.requestId);
  const openAt = entries.findIndex((entry) => entry.event === 'auth-driver:second_request_still_active' && entry.secondRequest === second.requestId);
  const secondAt = entries.findIndex((entry) => entry.event === 'omp:stdout' && entry.frame.type === 'prompt_result' && entry.frame.id === second.requestId);
  const closeAt = entries.findIndex((entry) => entry.event === 'mux:writer_frame' && entry.frame.type === 'mux_close_stdin' && entry.frame.generation === second.generation);
  assert(busyAt >= 0 && controlAt > busyAt && stepAt > controlAt && steerAt > stepAt &&
    firstAt > steerAt && openAt > firstAt && secondAt > openAt && closeAt > secondAt,
  'Queue observation → real step → real steer → first non-settled result → still active → final settled result → park');
  assert.equal(entries[firstAt].frame.sessionSettled, false);
  assert.equal(entries[secondAt].frame.sessionSettled, true);
  assert.equal(entries[secondAt].frame.status, 'completed');
  assert(entries[firstAt].fixtureSequence > second.fixtureSequence &&
    entries[secondAt].fixtureSequence > entries[firstAt].fixtureSequence);
  stepBoundary = { fixtureSnapshot, conversation: row.id, generation: second.generation, queuedMessage: msg,
    firstRequest: first.received.requestId, secondRequest: second.requestId, streamingBehavior: second.streamingBehavior,
    firstSessionSettled: entries[firstAt].frame.sessionSettled, finalSessionSettled: entries[secondAt].frame.sessionSettled,
    fixtureSequence: { firstReceived: first.received.fixtureSequence, stepBoundary: boundary.fixtureSequence, turnEnd: turnEnd.fixtureSequence,
      steerReceived: second.fixtureSequence, firstSettled: firstSettled.fixtureSequence, finalSettled: settled.fixtureSequence },
    journalOrder: { busyAt, controlAt, stepAt, steerAt, firstAt, openAt, secondAt, closeAt } };
  record('auth-driver:step_boundary_proved', stepBoundary);
}
function downstreamState() {
  // Only owned Lab effects, clone names and relevant node/session bytes. Do not compare
  // auth session tables, SQLite files/WAL, Git metadata or filesystem timestamps.
  const rows = context.db.select().from(schema.conversation).all().sort((left, right) => left.id.localeCompare(right.id));
  const pending = context.db.select().from(schema.humanIrcQueue).all().sort((left, right) => `${left.conversationId}/${left.msg}`.localeCompare(`${right.conversationId}/${right.msg}`));
  const wires = mux.events.filter((entry) => ['mux:writer_open', 'mux:writer_close', 'mux:generation'].includes(entry.event) ||
    (entry.event === 'mux:writer_frame' && ['prompt', 'mux_open_generation', 'mux_close_stdin'].includes(entry.frame.type)))
    .map((entry) => ({ event: entry.event, agent: entry.agent, declaration: entry.declaration, generation: entry.generation ?? null, frame: entry.frame ?? null }));
  return { rows, pending, worktreeDirectories: directoryEntries(worktreeHome), sessionDirectories: directoryEntries(sessionHome), cacheDirectories: directoryEntries(cacheHome),
    sourceBytes: rows.map((row) => ({ id: row.id, node: bytes(join(row.worktree, 'nodes/fixture.ts')), transcript: row.sessionFile === null ? null : bytes(row.sessionFile) })), wires };
}
async function deniedWithoutEffects(label, operation, expectedMessage) {
  const before = downstreamState();
  const result = await operation();
  assert.equal(result.ok, false, `${label} must be rejected`);
  assert.equal(result.error.layer, 'domain');
  assert.equal(result.error.code, 'invalid_input');
  assert.match(result.error.message, expectedMessage);
  assert.deepEqual(downstreamState(), before, `${label} must not create/mutate conversation, queue, clone, transcript, writer, generation or prompt wire`);
  const evidence = { label, error: result.error, conversationCount: before.rows.length, queueCount: before.pending.length,
    worktreeDirectories: before.worktreeDirectories, sessionDirectories: before.sessionDirectories, controlledWireCount: before.wires.length };
  denials.push(evidence);
  record('auth-driver:denied_without_effects', evidence);
}
async function changeRole(owner, target, role) {
  const before = await sessionIdentity(target);
  const updated = await api((auth) => auth.updateMemberRole({ headers: owner.headers, body: { organizationId: lab.id, memberId: target.memberId, role } }));
  assert.equal(updated.id, target.memberId);
  assert.equal(updated.userId, target.userId);
  assert.equal(updated.organizationId, lab.id);
  assert.equal(updated.role, role);
  const after = await sessionIdentity(target);
  assert.deepEqual(after, before);
  const official = await api((auth) => auth.getActiveMemberRole({ headers: target.headers, query: { organizationId: lab.id } }));
  assert.equal(official.role, role);
  roleChanges.push({ memberId: target.memberId, userId: target.userId, sameSessionId: target.sessionId, from: target.role, to: role, activeOrganizationId: null });
  target.role = role;
}

try {
  mkdirSync(join(sourceRepo, 'nodes'), { recursive: true });
  writeFileSync(join(sourceRepo, 'nodes/fixture.ts'), 'export function fixture(value: string): string { return value; }\n');
  await git(sourceRepo, 'init', '-b', 'main');
  await git(sourceRepo, 'add', 'nodes/fixture.ts');
  await git(sourceRepo, '-c', 'user.name=Auth Lab04 Fixture', '-c', 'user.email=auth-lab04@example.invalid', 'commit', '-m', 'Create auth fixture library');
  await git(runHome, 'clone', '--bare', sourceRepo, bareRepo);
  runtime = await launchLabRuntime({ home: join(runHome, 'lab'), migrationsFolder: join(repo, 'apps/web/resources/lab/migrations'),
    auth: { secret: randomBytes(48).toString('hex'), baseURL: 'http://127.0.0.1:43199' }, library: { cacheHome, storeUrl: null },
    sessions: { muxUrl: mux.url, bearer, muxBinary: join(here, 'dial-fixture.mjs'), command: [process.execPath, ompFixture], worktreeHome, sessionHome,
      environment: { PATH: process.env.PATH, HOME: runHome, TMPDIR: '/tmp', LAB04_REPO: repo, LAB04_JOURNAL: journalFile, LAB04_CONTROL: control } } });
  await runtime.run((ctx) => { context = ctx; });
  // Identity, password hashing, sessions, organization and memberships are all
  // created by official Better Auth server APIs; only Lab project/repo config is seeded.
  for (const role of ['owner', 'researcher', 'student', 'guest']) {
    const email = `${role}-${randomUUID()}@example.invalid`;
    const password = randomBytes(24).toString('hex');
    await api((auth) => auth.signUpEmail({ body: { name: `Auth fixture ${role}`, email, password } }));
    const signedIn = await api((auth) => auth.signInEmail({ body: { email, password }, returnHeaders: true }));
    const cookie = signedIn.headers.getSetCookie().map((value) => value.split(';', 1)[0]).join('; ');
    assert(cookie, 'Official sign-in must issue its own authentication cookie');
    const headers = new Headers({ cookie });
    const current = await api((auth) => auth.getSession({ headers }));
    assert(current);
    assert.equal(current.user.id, signedIn.response.user.id);
    assert.equal(current.session.activeOrganizationId ?? null, null);
    identities.push({ role, userId: current.user.id, memberId: null, sessionId: current.session.id, headers, originalCookie: cookie });
  }
  const [owner, researcher, student, guest] = identities;
  lab = await api((auth) => auth.createOrganization({ body: { name: 'Auth Lab04', slug: `auth-lab04-${randomUUID()}`, userId: owner.userId } }));
  assert.equal(lab.members.length, 1);
  owner.memberId = lab.members[0].id;
  assert.equal(lab.members[0].userId, owner.userId);
  assert.equal(lab.members[0].role, 'owner');
  for (const identity of [researcher, student, guest]) {
    const member = await api((auth) => auth.addMember({ body: { organizationId: lab.id, userId: identity.userId, role: identity.role } }));
    assert.equal(member.userId, identity.userId);
    assert.equal(member.organizationId, lab.id);
    assert.equal(member.role, identity.role);
    identity.memberId = member.id;
  }
  for (const identity of identities) {
    await sessionIdentity(identity);
    assert.notEqual(identity.userId, identity.memberId);
    const officialMember = await api((auth) => auth.listMembers({ headers: identity.headers, query: { organizationId: lab.id, filterField: 'userId', filterValue: identity.userId, filterOperator: 'eq', limit: 1 } }));
    assert.equal(officialMember.members.length, 1);
    assert.equal(officialMember.members[0].id, identity.memberId);
  }
  await runtime.run((ctx) => {
    ctx.db.insert(schema.project).values({ id: projectId, labId: lab.id, name: 'Auth fixture project' }).run();
    ctx.db.insert(schema.libraryRepo).values({ id: randomUUID(), labId: lab.id, remoteUrl: bareRepo, branch: 'main' }).run();
  });
  const ownerRow = await createAs(owner, 'Owner authorized discussion');
  await busyStepPrompt(owner, ownerRow);
  const researcherRow = await createAs(researcher, 'Researcher authorized discussion');
  await promptAs(researcher, researcherRow, 'researcher own prompt');
  const studentRow = await createAs(student, 'Student authorized discussion');
  await promptAs(student, studentRow, 'student own prompt');

  await deniedWithoutEffects('guest create', () => runtime.run((ctx) => createDiscussion({ lab: lab.id, project: projectId, name: 'Denied guest discussion' }, ctx, guest.headers)), /not permitted/i);
  await deniedWithoutEffects('guest prompt', () => runtime.run((ctx) => promptDiscussion({ conversation: ownerRow.id, msg: randomUUID(), text: 'Denied guest prompt' }, ctx, guest.headers)), /not permitted/i);
  await deniedWithoutEffects('permitted researcher cannot prompt another owner', () => runtime.run((ctx) => promptDiscussion({ conversation: ownerRow.id, msg: randomUUID(), text: 'Denied cross-owner prompt' }, ctx, researcher.headers)), /only this discussion owner/i);
  await deniedWithoutEffects('permitted student cannot prompt researcher discussion', () => runtime.run((ctx) => promptDiscussion({ conversation: researcherRow.id, msg: randomUUID(), text: 'Denied student cross-owner prompt' }, ctx, student.headers)), /only this discussion owner/i);

  const researcherBytes = readFileSync(sessionFile(researcherRow), 'utf8');
  await changeRole(owner, researcher, 'guest');
  await deniedWithoutEffects('same-session demoted member create', () => runtime.run((ctx) => createDiscussion({ lab: lab.id, project: projectId, name: 'Denied demoted discussion' }, ctx, researcher.headers)), /not permitted/i);
  await deniedWithoutEffects('same-session demoted owner prompt', () => runtime.run((ctx) => promptDiscussion({ conversation: researcherRow.id, msg: randomUUID(), text: 'Denied demoted own prompt' }, ctx, researcher.headers)), /not permitted/i);
  assert.equal(readFileSync(sessionFile(researcherRow), 'utf8'), researcherBytes);
  await changeRole(owner, researcher, 'researcher');
  const resumed = await promptAs(researcher, researcherRow, 're-promoted same-session own prompt');
  assert(readFileSync(sessionFile(researcherRow), 'utf8').startsWith(researcherBytes));
  assert.equal(sourceRow(researcherRow.id).ownerId, researcher.memberId);
  assert.equal(events('mux:writer_open', researcherRow.agentId).length, 1);
  const resumedStarts = transcript(researcherRow).filter((entry) => entry.type === 'generation_start');
  assert.equal(resumedStarts.length, 2);
  assert.equal(resumedStarts[1].resumed, researcherRow.sessionId);
  assert.notEqual(resumedStarts[0].generation, resumed.received.generation);
  const promotedRow = await createAs(researcher, 'Re-promoted existing-session creation');
  await promptAs(researcher, promotedRow, 're-promoted fresh discussion own prompt');

  // An active independent child makes cleanup observable, not just parked-socket cleanup.
  const shutdown = await promptAs(owner, ownerRow, 'accepted active prompt at shutdown', { park: false });
  let startedOwned;
  const ownedReady = new Promise((resolveReady) => { startedOwned = resolveReady; });
  const ownedRelease = new Promise((resolveRelease) => { releaseOwned = resolveRelease; });
  const owned = runtime.run(async (ctx) => {
    startedOwned();
    await ownedRelease;
    assert.equal(ctx.signal.aborted, true);
    assert.equal(ctx.db.select().from(schema.conversation).all().length, discussions.length);
    record('auth-driver:owned_operation_drained');
  });
  await ownedReady;
  let stopResolved = false;
  const stopping = runtime.stop().then(() => { stopped = true; stopResolved = true; record('auth-driver:stop_resolved'); });
  assert.equal(runtime.signal.aborted, true);
  await until('active auth scenario dial exited', () => journal().some((entry) => entry.event === 'dial:exit' && entry.generation === shutdown.received.generation));
  await until('all authenticated writer declarations closed', () => discussions.every(({ row }) => events('mux:writer_close', row.agentId).length === 1));
  assert.equal(stopResolved, false, 'Runtime must wait for its owned operation');
  assert.equal(context.db.select().from(schema.conversation).all().length, discussions.length);
  releaseOwned();
  await owned;
  await stopping;
  assert.throws(() => context.db.select().from(schema.conversation).all(), /closed|not open/i);
  await assert.rejects(runtime.run(() => 'not allowed'), /stopped/i);
  await until('all fixture WS endpoints closed', () => mux.liveSockets() === 0);
  assert(sourceSnapshots.filter((entry) => entry.observedEvent === 'mux:writer_close').every((entry) => entry.databaseOpen && entry.row));
  const entries = journal();
  const stopAt = entries.findIndex((entry) => entry.event === 'auth-driver:stop_resolved');
  for (const spawned of entries.filter((entry) => entry.event === 'dial:spawn')) {
    const childAt = entries.findIndex((entry) => entry.event === 'dial:child_close' && entry.pid === spawned.pid && entry.childPid === spawned.childPid);
    const exitAt = entries.findIndex((entry) => entry.event === 'dial:exit' && entry.pid === spawned.pid);
    assert(childAt >= 0 && exitAt > childAt && stopAt > exitAt);
    for (const pid of [spawned.pid, spawned.childPid]) assert.throws(() => process.kill(pid, 0), (error) => error.code === 'ESRCH');
  }
  const persisted = new Database(join(runHome, 'lab/lab.sqlite'), { readonly: true, fileMustExist: true });
  let persistedConversations;
  let persistedMembers;
  try {
    persistedConversations = persisted.prepare('SELECT id, owner_id, session_id, session_file, worktree FROM conversation ORDER BY id').all();
    persistedMembers = persisted.prepare('SELECT id, user_id, organization_id, role FROM member ORDER BY id').all();
    assert.equal(persistedConversations.length, discussions.length);
    assert.equal(persisted.prepare('SELECT count(*) AS count FROM human_irc_queue').get().count, 0);
    assert.equal(persistedMembers.length, 4);
    for (const { row, identity } of discussions) {
      const saved = persistedConversations.find((entry) => entry.id === row.id);
      assert.equal(saved.owner_id, identity.memberId);
      assert.equal(saved.session_id, row.sessionId);
      assert.equal(saved.session_file, row.sessionFile);
      assert.equal(saved.worktree, row.worktree);
    }
    assert.equal(persistedMembers.find((entry) => entry.id === researcher.memberId).role, 'researcher');
    assert.equal(persistedMembers.find((entry) => entry.id === guest.memberId).role, 'guest');
  } finally { persisted.close(); }
  const evidence = { scope: 'Supplemental internal Discussion authorization integration; no public RPC, global F-line, live Mux/Soroi/store or browser claim',
    runHome, journalFile, sqlite: join(runHome, 'lab/lab.sqlite'), lab: lab.id, project: projectId,
    fixture: { snapshot: fixtureSnapshot, omp: ompFixture, originalExecutedOmpPreserved: join(here, 'omp-fixture.mjs') }, stepBoundary,
    identities: identities.map(publicIdentity), discussions: discussions.map(({ row, identity }) => ({ id: row.id, role: identity.role, ownerMemberId: row.ownerId, userPrincipal: identity.userId, ompSessionId: row.sessionId, worktree: row.worktree, sessionFile: row.sessionFile })),
    prompts, denials, roleChanges, sourceSnapshots, persistedConversations, persistedMembers,
    authSetup: 'Official signUpEmail/signInEmail/createOrganization/addMember/updateMemberRole APIs; project and library config seeded through context.db',
    activeOrganization: 'All exercised authenticated sessions have activeOrganizationId null, including the unchanged session across researcher→guest→researcher',
    shutdown: 'Active OMP child plus every parked writer/dial drained; owned runtime operation observed SQLite before runtime close; actual persisted rows reread after stop' };
  writeFileSync(join(runHome, 'evidence.json'), `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(JSON.stringify({ status: 'passed', ...evidence }, null, 2));
} catch (error) {
  record('auth-driver:failure', { name: error.name, message: error.message, stack: error.stack });
  console.error(`Auth Lab04 driver failed; artifacts retained at ${runHome}`);
  throw error;
} finally {
  releaseOwned();
  if (runtime && !stopped) {
    try { await runtime.stop(); }
    catch (error) { console.error('Auth driver runtime cleanup failed:', error); }
  }
  await mux.close();
}
