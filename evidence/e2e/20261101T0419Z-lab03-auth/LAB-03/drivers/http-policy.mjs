import { randomBytes } from 'node:crypto';
import { appendFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

process.umask(0o077);
const root = '/Users/mouriya/Ext/worktrees/pepgent-lab-32';
const workspace = dirname(fileURLToPath(import.meta.url));
const home = join(workspace, 'home');
const logPath = join(workspace, 'acceptance.log');
const require = createRequire(join(root, 'apps/web/package.json'));
const Database = require('better-sqlite3');
const { openLabDatabase } = await import(pathToFileURL(join(root, 'apps/web/dist-web-tests/src/server/lab/database.js')));
const { createLabAuth } = await import(pathToFileURL(join(root, 'apps/web/dist-web-tests/src/server/lab/auth.js')));
const migrationsFolder = join(root, 'apps/web/resources/lab/migrations');
const portProbe = createServer();
await new Promise((resolve, reject) => { portProbe.once('error', reject); portProbe.listen(0, '127.0.0.1', resolve); });
const port = portProbe.address().port;
await new Promise((resolve, reject) => portProbe.close(error => error ? reject(error) : resolve()));
const baseURL = `http://127.0.0.1:${port}`;
const secret = randomBytes(48).toString('base64url');
const suffix = randomBytes(8).toString('hex');
const identities = Object.fromEntries(['owner', 'researcher', 'student', 'guest'].map(role => [role, { name: `Acceptance ${role}`, email: `${role}-${suffix}@example.invalid`, password: randomBytes(32).toString('base64url') }]));
const privateEnvironment = { PEPGENT_LAB_HOME: home, PEPGENT_WEB_ROOT: join(workspace, 'web-root'), BETTER_AUTH_SECRET: secret, BETTER_AUTH_URL: baseURL, HOST: '127.0.0.1', PORT: String(port) };
const envPath = join(workspace, 'runtime-env.private.json');
writeFileSync(envPath, JSON.stringify(privateEnvironment), { mode: 0o600 });
writeFileSync(join(workspace, 'identities.private.json'), JSON.stringify(identities), { mode: 0o600 });
function log(event) { const line = JSON.stringify(event); appendFileSync(logPath, `${line}\n`, { mode: 0o600 }); console.log(line); }
function check(condition, label) { if (!condition) throw new Error(`Acceptance assertion failed: ${label}`); }
function safeError(error) { return error instanceof Error && error.message.startsWith('Acceptance assertion failed:') ? error.message : 'Operation failed; raw diagnostic withheld to protect credentials.'; }
const cookieFrom = headers => headers.getSetCookie().map(cookie => cookie.split(';', 1)[0]).join('; ');
let organizationId;
const memberIds = {};
const cookies = {};
let host;
let hostExit;
let hostResult;
let failure;
let ready = false;
const knownFamily = new Set();
const permissions = ['lab.startWithoutApproval', 'approval.ownExperiments', 'approval.any', 'lab.buildImages', 'lab.manageMembers', 'member.update', 'invitation.create'];
function familyPids() {
  const ps = spawnSync('ps', ['-axo', 'pid=,ppid='], { encoding: 'utf8' });
  check(ps.status === 0, 'process family observation command');
  const edges = ps.stdout.split('\n').map(line => line.trim().split(/\s+/).map(Number)).filter(values => values.length === 2 && values.every(Number.isInteger));
  const family = new Set([host.pid]);
  let changed = true;
  while (changed) { changed = false; for (const [pid, ppid] of edges) if (family.has(ppid) && !family.has(pid)) { family.add(pid); changed = true; } }
  for (const pid of family) knownFamily.add(pid);
  return [...family];
}
function alive(pid) { try { process.kill(pid, 0); return true; } catch (error) { if (error.code === 'ESRCH') return false; throw error; } }
async function http(path, { cookie, body, method = body === undefined ? 'GET' : 'POST' } = {}) {
  const headers = { origin: baseURL };
  if (cookie) headers.cookie = cookie;
  if (body !== undefined) headers['content-type'] = 'application/json';
  const response = await fetch(`${baseURL}/api/auth${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(10000) });
  const text = await response.text();
  let value;
  try { value = JSON.parse(text); } catch { value = undefined; }
  return { status: response.status, value, headers: response.headers };
}
async function permission(role, name, stage = 'matrix') {
  const [resource, action] = name.split('.');
  const result = await http('/organization/has-permission', { cookie: cookies[role], body: { organizationId, permissions: { [resource]: [action] } } });
  const success = typeof result.value?.success === 'boolean' ? result.value.success : null;
  log({ stage, user: role, method: 'POST', endpoint: '/api/auth/organization/has-permission', permission: name, status: result.status, success, explicitOrganizationId: true });
  check(result.status === 200 && success !== null, `${stage} ${role} ${name} HTTP response`);
  return success;
}
function readonlyFinal() {
  const db = new Database(join(home, 'lab.sqlite'), { readonly: true, fileMustExist: true });
  try {
    const roles = Object.fromEntries(Object.entries(identities).map(([label, identity]) => [label, db.prepare('SELECT m.role FROM member m JOIN user u ON u.id=m.user_id WHERE u.email=?').all(identity.email).map(row => row.role)]));
    const counts = Object.fromEntries(['user', 'account', 'organization', 'member', 'session'].map(table => [table, db.prepare(`SELECT count(*) AS count FROM "${table}"`).get().count]));
    log({ stage: 'readonly-final-persisted', roles, counts });
    check(JSON.stringify(roles) === JSON.stringify({ owner: ['owner'], researcher: ['student'], student: ['student'], guest: ['guest'] }), 'final persisted roles');
    check(counts.user === 4 && counts.account === 4 && counts.organization === 1 && counts.member === 4 && counts.session === 0, 'final persisted counts and session revocation');
  } finally { db.close(); }
}

try {
  log({ stage: 'official-fixture', command: 'openLabDatabase/createLabAuth; signUpEmail(owner,researcher,student,guest); signInEmail(owner); createOrganization; addMember(researcher,student,guest); signOut(owner); close fixture database' });
  const fixture = openLabDatabase({ home, migrationsFolder });
  try {
    const auth = createLabAuth(fixture.db, { secret, baseURL });
    const users = {};
    for (const [role, identity] of Object.entries(identities)) users[role] = (await auth.api.signUpEmail({ body: identity })).user;
    const signedIn = await auth.api.signInEmail({ body: { email: identities.owner.email, password: identities.owner.password }, returnHeaders: true });
    const headers = new Headers({ cookie: cookieFrom(signedIn.headers) });
    try {
      const organization = await auth.api.createOrganization({ headers, body: { name: 'HTTP policy acceptance', slug: `http-policy-${suffix}`, userId: users.owner.id } });
      organizationId = organization.id;
      for (const role of ['researcher', 'student', 'guest']) {
        const member = await auth.api.addMember({ headers, body: { userId: users[role].id, role, organizationId } });
        check(typeof member.id === 'string', 'official addMember ID response');
        memberIds[role] = member.id;
      }
    } finally { await auth.api.signOut({ headers }); }
  } finally { fixture.close(); }
  log({ stage: 'official-fixture', result: 'success', fixtureDatabaseClosed: true, roles: ['owner', 'researcher', 'student', 'guest'] });

  log({ stage: 'launch-built-host', command: 'node apps/web/bin/pepgent-web.mjs', cwd: root, environmentSource: envPath, baseURL });
  host = spawn(process.execPath, ['apps/web/bin/pepgent-web.mjs'], { cwd: root, env: { ...process.env, ...privateEnvironment }, stdio: ['ignore', 'pipe', 'pipe'], detached: true });
  host.stdout.on('data', () => {});
  host.stderr.on('data', () => {});
  hostExit = new Promise(resolve => {
    host.once('error', error => { hostResult = { exitCode: null, signal: null, errorCode: error.code ?? 'SPAWN_ERROR' }; resolve(hostResult); });
    host.once('exit', (code, signal) => { hostResult = { exitCode: code, signal }; resolve(hostResult); });
  });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (hostResult) break;
    try { const response = await http('/get-session'); if (response.status === 200 && response.value === null) { ready = true; break; } } catch {}
    await delay(200);
  }
  check(ready, 'built host ready via actual auth endpoint');
  log({ stage: 'host-ready', hostPid: host.pid, authGetSessionStatus: 200, authGetSession: null, knownFamilyPids: familyPids() });
  for (const [role, identity] of Object.entries(identities)) {
    const result = await http('/sign-in/email', { body: { email: identity.email, password: identity.password } });
    check(result.status === 200, `HTTP sign-in ${role}`);
    cookies[role] = cookieFrom(result.headers);
    check(cookies[role].length > 0, `HTTP sign-in ${role} issued private cookie`);
    log({ stage: 'http-sign-in', user: role, endpoint: '/api/auth/sign-in/email', status: result.status, privateCookieCaptured: true });
  }
  const matrix = {};
  for (const role of Object.keys(identities)) {
    matrix[role] = {};
    for (const name of permissions) matrix[role][name] = await permission(role, name);
  }
  log({ stage: 'actual-http-permission-matrix', permissions, matrix });
  for (const role of Object.keys(identities)) {
    const expected = role === 'owner' ? [true, true, true, true, true, true, true] : role === 'researcher' ? [true, true, false, false, false, false, false] : [false, false, false, false, false, false, false];
    check(JSON.stringify(Object.values(matrix[role])) === JSON.stringify(expected), `${role} requested permission matrix`);
  }
  const selfPromotion = await http('/organization/update-member-role', { cookie: cookies.researcher, body: { organizationId, memberId: memberIds.researcher, role: 'owner' } });
  log({ stage: 'researcher-self-promotion', endpoint: '/api/auth/organization/update-member-role', status: selfPromotion.status, errorCode: typeof selfPromotion.value?.code === 'string' ? selfPromotion.value.code : null });
  check(selfPromotion.status === 403, 'researcher self-promotion forbidden');
  check(await permission('researcher', 'approval.any', 'after-refused-self-promotion') === false, 'refused promotion did not grant owner approval');

  const demotion = await http('/organization/update-member-role', { cookie: cookies.owner, body: { organizationId, memberId: memberIds.researcher, role: 'student' } });
  log({ stage: 'owner-demotes-researcher', endpoint: '/api/auth/organization/update-member-role', status: demotion.status, returnedRole: typeof demotion.value?.role === 'string' ? demotion.value.role : null });
  check(demotion.status === 200, 'owner demotion succeeds');
  check(await permission('researcher', 'approval.ownExperiments', 'same-original-cookie-after-demotion') === false, 'same original researcher cookie observes fresh student membership');
  for (const invalidRole of ['admin', 'member', 'researcher,owner', ['researcher', 'owner']]) {
    const result = await http('/organization/update-member-role', { cookie: cookies.owner, body: { organizationId, memberId: memberIds.researcher, role: invalidRole } });
    log({ stage: 'owner-invalid-role', endpoint: '/api/auth/organization/update-member-role', invalidRole, status: result.status, errorCode: typeof result.value?.code === 'string' ? result.value.code : null });
    check(result.status === 400, 'owner invalid role rejected');
  }
  check(await permission('researcher', 'approval.ownExperiments', 'after-all-invalid-role-refusals') === false, 'invalid role attempts did not restore researcher grant');
} catch (error) { failure = error; log({ stage: 'acceptance-failed', errorClass: error instanceof Error ? error.constructor.name : typeof error, assertion: safeError(error) }); }
finally {
  if (ready && !hostResult) {
    for (const [role, originalCookie] of Object.entries(cookies)) {
      try {
        const signOut = await http('/sign-out', { cookie: originalCookie, body: {} });
        const getSession = await http('/get-session', { cookie: originalCookie });
        log({ stage: 'http-sign-out-revocation', user: role, signOutEndpoint: '/api/auth/sign-out', signOutStatus: signOut.status, getSessionEndpoint: '/api/auth/get-session', originalCookieReused: true, getSessionStatus: getSession.status, sessionIsNull: getSession.value === null });
        check(signOut.status === 200 && getSession.status === 200 && getSession.value === null, `${role} original session revoked`);
      } catch (error) { failure ??= error; log({ stage: 'sign-out-verification-failed', user: role, assertion: safeError(error) }); }
    }
  }
  if (host) {
    let graceful = true;
    try {
      familyPids();
      if (!hostResult) host.kill('SIGTERM');
      const result = await Promise.race([hostExit, delay(20000).then(() => null)]);
      if (result === null) { graceful = false; try { process.kill(-host.pid, 'SIGKILL'); } catch {} await hostExit; }
      for (let attempt = 0; attempt < 40 && [...knownFamily].some(alive); attempt++) await delay(100);
      const familyState = [...knownFamily].map(pid => ({ pid, gone: !alive(pid) }));
      log({ stage: 'built-host-shutdown', signalSent: 'SIGTERM', ...hostResult, graceful, knownFamily: familyState });
      for (const state of familyState) if (!state.gone) { graceful = false; try { process.kill(state.pid, 'SIGKILL'); } catch {} }
      check(graceful && hostResult.exitCode === 0 && hostResult.signal === null && familyState.every(state => state.gone), 'graceful host exit 0 and known family gone');
    } catch (error) { failure ??= error; log({ stage: 'shutdown-verification-failed', assertion: safeError(error) }); }
  }
}
try { readonlyFinal(); } catch (error) { failure ??= error; log({ stage: 'persisted-verification-failed', assertion: safeError(error) }); }
if (failure) { process.exitCode = 1; log({ stage: 'acceptance-complete', result: 'FAIL', driver: fileURLToPath(import.meta.url), log: logPath }); }
else log({ stage: 'acceptance-complete', result: 'PASS', driver: fileURLToPath(import.meta.url), log: logPath, allDatabaseOwnersClosed: true, allOwnedProcessesStopped: true });
