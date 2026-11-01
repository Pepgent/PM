import { randomBytes } from 'node:crypto';
import { appendFileSync, chmodSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

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
const baseURL = 'http://127.0.0.1:43219';
const secret = randomBytes(48).toString('base64url');
const suffix = randomBytes(8).toString('hex');
const organization = { name: 'Acceptance owner organization', slug: `seed-conflict-${suffix}` };
function identity(label) {
  return { name: `Acceptance ${label}`, email: `${label}-${suffix}@example.invalid`, password: randomBytes(32).toString('base64url'), organization };
}
const identities = { owner: identity('owner'), researcher: identity('researcher'), outsider: identity('outsider') };
const envPrivate = {
  PEPGENT_LAB_HOME: home,
  PEPGENT_WEB_ROOT: join(workspace, 'web-root'),
  BETTER_AUTH_SECRET: secret,
  BETTER_AUTH_URL: baseURL,
};
function log(event) {
  const line = JSON.stringify(event);
  appendFileSync(logPath, `${line}\n`, { mode: 0o600 });
  console.log(line);
}
function check(condition, label) {
  if (!condition) throw new Error(`Acceptance assertion failed: ${label}`);
}
function savePrivate(filename, value) {
  const path = join(workspace, filename);
  writeFileSync(path, JSON.stringify(value), { mode: 0o600 });
  chmodSync(path, 0o600);
  return path;
}
const envPath = savePrivate('runtime-env.private.json', envPrivate);
const configPaths = Object.fromEntries(Object.entries(identities).map(([label, value]) => [label, savePrivate(`${label}.private.json`, value)]));
function snapshot(stage) {
  const db = new Database(join(home, 'lab.sqlite'), { readonly: true, fileMustExist: true });
  try {
    const counts = Object.fromEntries(['user', 'account', 'organization', 'member', 'session'].map(table => [table, db.prepare(`SELECT count(*) AS count FROM "${table}"`).get().count]));
    const memberships = Object.fromEntries(Object.entries(identities).map(([label, config]) => [label, db.prepare('SELECT m.role FROM member m JOIN user u ON u.id=m.user_id WHERE u.email=? ORDER BY m.role').all(config.email).map(row => row.role)]));
    const requestedOrganization = db.prepare('SELECT id FROM organization WHERE slug=?').all(organization.slug);
    const state = { counts, memberships, requestedSlugCount: requestedOrganization.length };
    log({ stage, readonlyPersistedState: state });
    return state;
  } finally { db.close(); }
}
function seed(label, stage) {
  const configPath = configPaths[label];
  const args = ['apps/web/bin/pepgent-lab-seed.mjs', '--config', configPath];
  log({ stage, command: `node ${args.join(' ')}`, cwd: root, environmentSource: envPath });
  const result = spawnSync(process.execPath, args, { cwd: root, env: { ...process.env, ...envPrivate }, encoding: 'utf8', timeout: 60000, maxBuffer: 1024 * 1024 });
  const observed = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.split('\n').filter(Boolean);
  const permitted = new Set([
    '[pepgent-web] Lab administrator initialized.',
    '[pepgent-web] Lab administrator initialization failed at organization; no credentials were logged.',
  ]);
  const sanitizedOutput = observed.map(line => permitted.has(line) ? line : '[non-allowlisted diagnostic suppressed]');
  log({ stage, exitCode: result.status, signal: result.signal, childSpawnErrorCode: result.error?.code ?? null, sanitizedOutput });
  check(result.error === undefined && result.signal === null, `${stage} CLI exited normally`);
  return result.status;
}
function baseline(state, expectedUsers, expectedMembers) {
  check(state.counts.user === expectedUsers && state.counts.account === expectedUsers, 'user/account counts');
  check(state.counts.organization === 1 && state.requestedSlugCount === 1, 'exactly one requested organization');
  check(state.counts.member === expectedMembers, 'member count');
  check(state.counts.session === 0, 'all sessions revoked');
  check(JSON.stringify(state.memberships.owner) === '["owner"]', 'owner preserved');
}

try {
  check(seed('owner', 'owner-empty') === 0, 'empty database owner success');
  const initial = snapshot('owner-empty');
  baseline(initial, 1, 1);
  check(seed('owner', 'owner-repeat') === 0, 'repeat owner success');
  const repeated = snapshot('owner-repeat');
  baseline(repeated, 1, 1);
  check(JSON.stringify(initial) === JSON.stringify(repeated), 'repeat persisted counts/roles unchanged');

  log({ stage: 'official-fixture', command: 'createLabAuth/openLabDatabase; signUpEmail(researcher); signUpEmail(outsider); signInEmail(owner); listOrganizations; addMember(researcher); signOut(owner); close fixture database', credentials: 'private in-memory values; never logged' });
  const fixture = openLabDatabase({ home, migrationsFolder });
  try {
    const auth = createLabAuth(fixture.db, { secret, baseURL });
    const researcherIdentity = identities.researcher;
    const outsiderIdentity = identities.outsider;
    const researcher = await auth.api.signUpEmail({ body: { name: researcherIdentity.name, email: researcherIdentity.email, password: researcherIdentity.password } });
    await auth.api.signUpEmail({ body: { name: outsiderIdentity.name, email: outsiderIdentity.email, password: outsiderIdentity.password } });
    const signedIn = await auth.api.signInEmail({ body: { email: identities.owner.email, password: identities.owner.password }, returnHeaders: true });
    const headers = new Headers({ cookie: signedIn.headers.getSetCookie().map(cookie => cookie.split(';', 1)[0]).join('; ') });
    try {
      const organizations = await auth.api.listOrganizations({ headers });
      const target = organizations.find(value => value.slug === organization.slug);
      check(target !== undefined, 'official fixture owner organization exists');
      await auth.api.addMember({ headers, body: { userId: researcher.user.id, role: 'researcher', organizationId: target.id } });
    } finally { await auth.api.signOut({ headers }); }
  } finally { fixture.close(); }
  log({ stage: 'official-fixture', exitCode: 0, fixtureDatabaseClosed: true });
  const beforeConflicts = snapshot('fixture-closed');
  baseline(beforeConflicts, 3, 2);
  check(JSON.stringify(beforeConflicts.memberships.researcher) === '["researcher"]', 'genuine researcher membership');
  check(beforeConflicts.memberships.outsider.length === 0, 'genuine outsider without membership');

  check(seed('researcher', 'researcher-conflict') !== 0, 'researcher refused');
  const afterResearcher = snapshot('researcher-conflict');
  baseline(afterResearcher, 3, 2);
  check(JSON.stringify(afterResearcher) === JSON.stringify(beforeConflicts), 'researcher leaves persisted counts/roles unchanged');

  check(seed('outsider', 'occupied-slug-conflict') !== 0, 'nonmember occupied slug refused');
  const afterOutsider = snapshot('occupied-slug-conflict');
  baseline(afterOutsider, 3, 2);
  check(JSON.stringify(afterOutsider.memberships.researcher) === '["researcher"]', 'researcher not promoted');
  check(afterOutsider.memberships.outsider.length === 0, 'outsider not adopted');
  check(JSON.stringify(afterOutsider) === JSON.stringify(beforeConflicts), 'preexisting outsider conflict persisted counts/roles unchanged');
  log({ stage: 'acceptance-complete', result: 'PASS', allCliProcessesExited: true, allDatabaseOwnersClosed: true, driver: fileURLToPath(import.meta.url), log: logPath, rollbackRequirement: 'No rollback asserted; outsider was officially provisioned before conflict invocation.' });
} catch (error) {
  log({ stage: 'acceptance-failed', errorClass: error instanceof Error ? error.constructor.name : typeof error, assertion: error instanceof Error && error.message.startsWith('Acceptance assertion failed:') ? error.message : 'Fixture or driver operation failed; raw diagnostic withheld to protect credentials.' });
  process.exitCode = 1;
}
