import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, mkdtemp, readFile, realpath, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
const execute = promisify(execFile);
const repo = process.cwd();
const actual = '/Users/mouriya/Ext/code/pepgent/pepgent-lab-library';
const root = await mkdtemp('/tmp/lab-library-lifecycle-');
console.log('FIXTURE_ROOT', root);
const { LabLibrary } = await import(pathToFileURL(join(repo, 'apps/web/src/server/lab/library.ts')).href);
const { openLabDatabase } = await import(pathToFileURL(join(repo, 'apps/web/src/server/lab/database.ts')).href);
const schema = await import(pathToFileURL(join(repo, 'apps/web/src/server/lab/schema.ts')).href);
const auth = await import(pathToFileURL(join(repo, 'apps/web/src/server/lab/auth-schema.ts')).href);
async function git(cwd: string, ...args: string[]): Promise<string> {
  const { stdout } = await execute('git', ['-C', cwd, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_CONFIG_NOSYSTEM: '1' } });
  return stdout;
}
async function tracked(cwd: string) { return (await git(cwd, 'ls-files', '-z')).split('\0').filter(Boolean); }
async function indexContents(cwd: string) {
  const entries: [string, string][] = [];
  for (const path of await tracked(cwd)) entries.push([path, await git(cwd, 'show', `:${path}`)]);
  return entries;
}
async function workingContents(cwd: string) {
  const entries: [string, string][] = [];
  const paths = (await git(cwd, 'ls-files', '--cached', '--others', '--exclude-standard', '-z')).split('\0').filter(Boolean);
  for (const path of [...new Set(paths)].sort()) entries.push([path, await readFile(join(cwd, path), 'utf8')]);
  return entries;
}
async function remoteContents(remote: string) {
  const paths = (await git(remote, 'ls-tree', '-r', '--name-only', 'main')).trim().split('\n').filter(Boolean);
  return Promise.all(paths.map(async (path): Promise<[string,string]> => [path, await git(remote, 'show', `main:${path}`)]));
}
function check(name: string, action: () => void) { action(); console.log('PASS', name); }
function redact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, key === 'commit' || key === 'base' ? '<opaque commit identifier; not used as evidence>' : redact(item)]));
  return value;
}
function outcome(label: string, value: unknown) { console.log(label, JSON.stringify(redact(value), null, 2)); }
const initialActualWorking = await workingContents(actual);
const initialActualIndex = await indexContents(actual);
const seed = join(root, 'seed'); const remote = join(root, 'remote.git');
await mkdir(seed);
await git(seed, 'init', '--initial-branch=main');
for (const path of (await git(actual, 'ls-tree', '-r', '--name-only', 'HEAD')).trim().split('\n')) {
  await mkdir(dirname(join(seed, path)), { recursive: true });
  await writeFile(join(seed, path), await git(actual, 'show', `HEAD:${path}`));
}
await git(seed, 'add', '-A');
await git(seed, '-c', 'user.name=Runtime Fixture', '-c', 'user.email=runtime@example.invalid', 'commit', '-m', 'Seed actual lab-library tracked sources');
await git(root, 'init', '--bare', '--initial-branch=main', remote);
await git(seed, 'remote', 'add', 'origin', remote);
await git(seed, 'push', 'origin', 'main');
console.log('SEED_TRACKED_PATHS', JSON.stringify(await tracked(seed)));
const panel = join(root, 'panel'); const discussion = join(root, 'discussion');
for (const [id, cwd] of [['panel-runtime', panel], ['discussion-runtime', discussion]]) {
  await git(root, 'clone', '--branch', 'main', '--single-branch', remote, cwd);
  await git(cwd, 'checkout', '-b', `conv/${id}`);
}
const runtime = openLabDatabase({ home: join(root, 'sqlite'), migrationsFolder: join(repo, 'apps/web/resources/lab/migrations') });
const { db } = runtime;
const lab = 'runtime-lab'; const repoId = 'runtime/library';
const service = new LabLibrary(db, { cacheHome: join(root, 'cache'), storeUrl: null, signal: new AbortController().signal });
const central = join(root, 'cache', `repo-${encodeURIComponent(repoId)}`);
try {
  db.insert(auth.user).values({ id: 'runtime-user', name: 'Runtime Fixture', email: 'runtime@example.invalid', emailVerified: true }).run();
  db.insert(auth.organization).values({ id: lab, name: 'Runtime Lab', slug: 'runtime-lab', createdAt: new Date() }).run();
  db.insert(auth.member).values({ id: 'runtime-owner', organizationId: lab, userId: 'runtime-user', role: 'owner', createdAt: new Date() }).run();
  db.insert(schema.labProfile).values({ labId: lab }).run();
  db.insert(schema.libraryRepo).values({ id: repoId, labId: lab, remoteUrl: remote, branch: 'main' }).run();
  db.insert(schema.conversation).values({ id: 'panel-runtime', labId: lab, ownerId: 'runtime-owner', originKind: 'Panel', panelPage: 'nodes', panelScope: 'all', worktree: panel }).run();
  db.insert(schema.conversation).values({ id: 'discussion-runtime', labId: lab, ownerId: 'runtime-owner', originKind: 'Discussion', discussionName: 'Other private discussion', discussionArchived: false, worktree: discussion }).run();
  console.log('SQLITE_AUTHORED_FIXTURE', { lab, repoId, member: 'runtime-owner', panel: 'panel-runtime', discussion: 'discussion-runtime', sqliteHome: join(root, 'sqlite') });
  const calcPath = 'nodes/calc.ts'; const slowPath = 'nodes/slow_step.ts';
  const calcOriginal = await readFile(join(seed, calcPath), 'utf8');
  const slowOriginal = await readFile(join(seed, slowPath), 'utf8');
  const calcSelected = calcOriginal.replace('.times(2)', '.times(3)');
  const slowStaged = slowOriginal.replace('return { label, duration_ms };', 'return { label: `staged:${label}`, duration_ms };');
  assert.notEqual(calcSelected, calcOriginal); assert.notEqual(slowStaged, slowOriginal);
  for (const [cwd, label] of [[panel, 'Panel'], [discussion, 'Discussion']]) {
    await writeFile(join(cwd, 'README.md'), `${await readFile(join(cwd, 'README.md'), 'utf8')}\n${label} staged private draft.\n`);
    await git(cwd, 'add', '--', 'README.md');
    await writeFile(join(cwd, 'private-note.txt'), `${label} untracked private draft.\n`);
  }
  const panelIndex = await indexContents(panel);
  const discussionIndex = await indexContents(discussion);
  const discussionWorking = await workingContents(discussion);
  for (const [cwd, label] of [[panel, 'Panel'], [discussion, 'Discussion']]) {
    console.log(`${label} initial dirty status`, await git(cwd, 'status', '--porcelain'));
    console.log(`${label} actual nonempty staged sentinel diff`, (await git(cwd, 'diff', '--cached', '--no-color', '--', 'README.md')).split('\n').filter((line) => !line.startsWith('index ')).join('\n'));
  }
  console.log('ACTUAL_SOURCE initial index change summary', await git(actual, 'diff', '--cached', '--numstat'));
  const stage = async (fn: string, source: string) => {
    const input = { kind: 'library.stage', lab, fn, changes: [{ kind: 'source', source }] };
    outcome(`INPUT stage ${fn}`, input);
    const result = await service.command(input); outcome(`RESULT stage ${fn}`, result);
    assert.equal(result.ok, true); return result;
  };
  const stages = () => db.select().from(schema.libraryStaging).all().map((row: { functionName: string; changes: string }) => ({ fn: row.functionName, source: JSON.parse(row.changes).source })).sort((a: { fn: string }, b: { fn: string }) => a.fn.localeCompare(b.fn));
  const apply = async (fns: string[]) => {
    const input = { kind: 'library.apply', lab, conversation: 'panel-runtime', fns };
    outcome('INPUT apply', input);
    const result = await service.command(input); outcome('RESULT apply', result);
    if (result.ok) {
      assert.equal(result.output.kind, 'applied');
      assert.equal(result.output.cache.kind, 'refreshed');
      assert.equal(result.output.staging, 'cleared');
    }
    return result;
  };
  console.log('\n=== TRACE 1: stage two, apply calc only ===');
  await stage('calc', calcSelected); await stage('slow_step', slowStaged);
  outcome('SQLITE intents before apply', stages());
  const first = await apply(['calc']);
  assert.equal(first.ok, true);
  const remoteCalc = await git(remote, 'show', `main:${calcPath}`);
  const centralCalc = await readFile(join(central, calcPath), 'utf8');
  check('remote and central calc contain selected .times(3)', () => { assert.equal(remoteCalc, calcSelected); assert.equal(centralCalc, calcSelected); });
  assert.equal(await git(remote, 'show', `main:${slowPath}`), slowOriginal);
  assert.equal(await readFile(join(central, slowPath), 'utf8'), slowOriginal);
  console.log('PASS unselected slow_step not pushed or copied to central');
  const expectedFirstTree = (await workingContents(seed)).map(([path, content]): [string, string] => [path, path === calcPath ? calcSelected : content]);
  assert.deepEqual(await remoteContents(remote), expectedFirstTree);
  assert.deepEqual(await workingContents(central), expectedFirstTree);
  console.log('PASS full remote and central trees differ from seed only by selected calc source; no private draft files published');
  outcome('REMOTE calc content', remoteCalc); outcome('CENTRAL calc content', centralCalc);
  console.log('REMOTE latest commit message', await git(remote, 'log', '-1', '--format=%s', 'main'));
  assert.equal((await git(remote, 'log', '-1', '--format=%s', 'main')).trim(), 'Confirm library nodes: calc');
  check('only selected intent removed; unselected intent preserved exactly by source', () => assert.deepEqual(stages(), [{ fn: 'slow_step', source: slowStaged }]));
  assert.deepEqual(await indexContents(panel), panelIndex); console.log('PASS Panel real index content unchanged after selectedDiff/apply');
  assert.deepEqual(await indexContents(discussion), discussionIndex); assert.deepEqual(await workingContents(discussion), discussionWorking); console.log('PASS other Discussion clone working files and real index unchanged');
  assert.equal((await git(remote, 'for-each-ref', '--format=%(refname)', 'refs/heads')).trim(), 'refs/heads/main');
  assert.equal(await git(remote, 'show', 'main:README.md'), await readFile(join(seed, 'README.md'), 'utf8'));
  console.log('PASS remote contains only main; unrelated indexed README and untracked private-note absent from publication');
  console.log('PANEL branch', (await git(panel, 'branch', '--show-current')).trim());
  console.log('DISCUSSION branch', (await git(discussion, 'branch', '--show-current')).trim());

  console.log('\n=== TRACE 2: same stale Panel, three nonoverlapping same-file edits ===');
  const slowPanel = slowOriginal.replace('/** Write a startup marker', '/** Panel-local note: Write a startup marker');
  const slowRemote = slowOriginal.replace('const markers = "/var/tmp/soroi-e2e/markers";', 'const markers = "/var/tmp/soroi-e2e/remote-markers";');
  assert.notEqual(slowPanel, slowOriginal); assert.notEqual(slowRemote, slowOriginal);
  await writeFile(join(panel, slowPath), slowPanel);
  const upstream = join(root, 'upstream'); await git(root, 'clone', '--branch', 'main', remote, upstream);
  await writeFile(join(upstream, slowPath), slowRemote); await git(upstream, 'add', '--', slowPath);
  await git(upstream, '-c', 'user.name=Remote Fixture', '-c', 'user.email=remote@example.invalid', 'commit', '-m', 'Remote nonoverlapping slow_step marker directory');
  await git(upstream, 'push', 'origin', 'main');
  console.log('OBSERVED stale Panel slow_step content before apply', await readFile(join(panel, slowPath), 'utf8'));
  console.log('OBSERVED new remote slow_step content before apply', await git(remote, 'show', `main:${slowPath}`));
  assert.equal((await readFile(join(panel, slowPath), 'utf8')).includes('remote-markers'), false);
  const second = await apply(['slow_step']);
  assert.equal(second.ok, true);
  const combined = slowRemote.replace('/** Write a startup marker', '/** Panel-local note: Write a startup marker').replace('return { label, duration_ms };', 'return { label: `staged:${label}`, duration_ms };');
  const combinedRemote = await git(remote, 'show', `main:${slowPath}`);
  assert.equal(combinedRemote, combined); assert.equal(await readFile(join(central, slowPath), 'utf8'), combined);
  console.log('REMOTE combined slow_step content', combinedRemote); console.log('CENTRAL combined slow_step content', await readFile(join(central, slowPath), 'utf8'));
  console.log('PASS remote edit, stale Panel edit and staged source edit all survive in same file');
  const expectedCombinedTree = expectedFirstTree.map(([path, content]): [string, string] => [path, path === slowPath ? combined : content]);
  assert.deepEqual(await remoteContents(remote), expectedCombinedTree);
  assert.deepEqual(await workingContents(central), expectedCombinedTree);
  assert.equal((await git(remote, 'log', '-1', '--format=%s', 'main')).trim(), 'Confirm library nodes: slow_step');
  console.log('PASS full remote and central trees contain exactly the selected combined changes; latest message Confirm library nodes: slow_step');
  assert.deepEqual(stages(), []); console.log('PASS slow_step intent removed only after successful push');
  assert.deepEqual(await indexContents(panel), panelIndex); assert.deepEqual(await indexContents(discussion), discussionIndex); assert.deepEqual(await workingContents(discussion), discussionWorking);
  console.log('PASS stale Panel real index and other clone content/index remain untouched');

  console.log('\n=== TRACE 3: overlapping Panel/staged change ===');
  const conflictStaged = calcSelected.replace('.times(3)', '.times(5)');
  const conflictPanel = calcSelected.replace('.times(3)', '.times(7)');
  await stage('calc', conflictStaged); await writeFile(join(panel, calcPath), conflictPanel);
  const remoteBeforeConflict = await remoteContents(remote); const messagesBeforeConflict = await git(remote, 'log', '--format=%s', 'main'); const stagedBeforeConflict = stages();
  outcome('CONFLICT Panel source', conflictPanel); outcome('CONFLICT staged source', conflictStaged);
  const conflict = await apply(['calc']);
  check('overlap returns typed domain revision_conflict', () => { assert.equal(conflict.ok, false); assert.equal(conflict.error.layer, 'domain'); assert.equal(conflict.error.code, 'revision_conflict'); });
  assert.deepEqual(await remoteContents(remote), remoteBeforeConflict); assert.equal(await git(remote, 'log', '--format=%s', 'main'), messagesBeforeConflict);
  assert.deepEqual(stages(), stagedBeforeConflict); assert.equal(await readFile(join(panel, calcPath), 'utf8'), conflictPanel);
  assert.equal(await readFile(join(central, calcPath), 'utf8'), calcSelected);
  console.log('PASS overlapping apply leaves full remote tracked contents/history messages, staged source and Panel source unchanged');
  outcome('SQLITE retained conflicting intent', stages());
  assert.deepEqual(await indexContents(panel), panelIndex); console.log('PASS overlapping apply leaves Panel index unchanged');

  console.log('\n=== TRACE 3B: integration overlap against remote authority ===');
  const discussionCalcBeforeProbe = await readFile(join(discussion, calcPath), 'utf8');
  const integrationConflictSource = discussionCalcBeforeProbe.replace('.times(2)', '.times(9)');
  assert.notEqual(integrationConflictSource, discussionCalcBeforeProbe);
  await writeFile(join(discussion, calcPath), integrationConflictSource);
  const discussionBeforeIntegrationConflict = await workingContents(discussion);
  const centralBeforeIntegrationConflict = await workingContents(central);
  outcome('INTEGRATION CONFLICT remote calc source', await git(remote, 'show', `main:${calcPath}`));
  outcome('INTEGRATION CONFLICT Discussion calc source', integrationConflictSource);
  const mergeInput = { kind: 'library.merge', lab, conversation: 'discussion-runtime', paths: [calcPath] };
  outcome('INPUT integration merge', mergeInput);
  const integrationConflict = await service.command(mergeInput);
  outcome('RESULT integration merge', integrationConflict);
  check('remote-authority overlap returns typed domain revision_conflict', () => {
    assert.equal(integrationConflict.ok, false);
    assert.equal(integrationConflict.error.layer, 'domain');
    assert.equal(integrationConflict.error.code, 'revision_conflict');
    assert.equal(integrationConflict.error.message, 'Git apply failed; inspect repository access or merge conflicts.');
  });
  assert.deepEqual(await remoteContents(remote), remoteBeforeConflict);
  assert.equal(await git(remote, 'log', '--format=%s', 'main'), messagesBeforeConflict);
  assert.deepEqual(await workingContents(central), centralBeforeIntegrationConflict);
  assert.deepEqual(await workingContents(discussion), discussionBeforeIntegrationConflict);
  assert.deepEqual(await indexContents(discussion), discussionIndex);
  assert.deepEqual(stages(), stagedBeforeConflict);
  console.log('PASS integration Git apply conflict leaves remote content/history, central content, SQLite staged source and Discussion draft/index unchanged');
  console.log('DRIVER_ONLY_SETUP restore only owned calc overlap probe before separate nonconflicting sync; README and private-note drafts retained');
  await writeFile(join(discussion, calcPath), discussionCalcBeforeProbe);
  assert.deepEqual(await workingContents(discussion), discussionWorking);

  console.log('\n=== TRACE 4: explicit sync keeps private drafts local ===');
  await git(upstream, 'pull', '--ff-only', 'origin', 'main');
  await writeFile(join(upstream, 'sync-remote-marker.txt'), 'Remote sync marker\n'); await git(upstream, 'add', '--', 'sync-remote-marker.txt');
  await git(upstream, '-c', 'user.name=Remote Fixture', '-c', 'user.email=remote@example.invalid', 'commit', '-m', 'Remote update before explicit sync'); await git(upstream, 'push', 'origin', 'main');
  const remoteBeforeSync = await remoteContents(remote); const messagesBeforeSync = await git(remote, 'log', '--format=%s', 'main');
  const syncInput = { kind: 'library.sync', lab, conversation: 'discussion-runtime' }; outcome('INPUT sync', syncInput);
  const sync = await service.command(syncInput); outcome('RESULT sync', sync); assert.equal(sync.ok, true);
  assert.equal(await readFile(join(discussion, 'sync-remote-marker.txt'), 'utf8'), 'Remote sync marker\n');
  assert.equal(await readFile(join(discussion, calcPath), 'utf8'), calcSelected); assert.equal(await readFile(join(discussion, slowPath), 'utf8'), combined);
  assert.equal(await readFile(join(discussion, 'private-note.txt'), 'utf8'), 'Discussion untracked private draft.\n');
  assert.equal((await readFile(join(discussion, 'README.md'), 'utf8')).endsWith('Discussion staged private draft.\n'), true);
  assert.equal(await git(discussion, 'show', 'HEAD:private-note.txt'), 'Discussion untracked private draft.\n');
  assert.equal((await git(discussion, 'branch', '--show-current')).trim(), 'conv/discussion-runtime');
  assert.equal((await git(discussion, 'status', '--porcelain')).trim(), '');
  assert.deepEqual(await remoteContents(remote), remoteBeforeSync); assert.equal(await git(remote, 'log', '--format=%s', 'main'), messagesBeforeSync);
  assert.equal((await git(remote, 'for-each-ref', '--format=%(refname)', 'refs/heads')).trim(), 'refs/heads/main');
  assert.equal((await remoteContents(remote)).some(([path]) => path === 'private-note.txt'), false);
  assert.equal(await readFile(join(central, 'sync-remote-marker.txt'), 'utf8'), 'Remote sync marker\n');
  assert.equal((await workingContents(central)).some(([path]) => path === 'private-note.txt'), false);
  assert.deepEqual(await workingContents(central), await remoteContents(remote));
  console.log('PASS synced central full tree equals authoritative remote; private drafts absent and remote marker present');
  assert.equal((await readFile(join(central, 'README.md'), 'utf8')).includes('Discussion staged private draft.'), false);
  outcome('DISCUSSION local private README', await readFile(join(discussion, 'README.md'), 'utf8'));
  outcome('DISCUSSION local private note', await readFile(join(discussion, 'private-note.txt'), 'utf8'));
  console.log('DISCUSSION private branch commit messages', await git(discussion, 'log', '-4', '--format=%s'));
  console.log('REMOTE final commit messages', messagesBeforeSync);
  console.log('PASS explicit sync brings remote edits into private branch, commits dirty drafts locally, and does not push drafts or private refs');
  assert.deepEqual(stages(), stagedBeforeConflict); console.log('PASS explicit sync retains unrelated conflicting staged intent');
  console.log('\n=== TRACE 5: proposed staged source validation under literal /tmp cache ===');
  console.log('CACHE_PATH_IDENTITY', { literal: central, canonical: await realpath(central) });
  assert.equal(central.startsWith('/tmp/'), true);
  const annotatedProbe = 'import { program } from "omp-soroi/node";\nexport default program((input: number): number => input + 17);\n';
  await assert.rejects(readFile(join(central, 'nodes/annotated_probe.ts')), { code: 'ENOENT' });
  await stage('annotated_probe', annotatedProbe);
  assert.equal(stages().find((row) => row.fn === 'annotated_probe')?.source, annotatedProbe);
  const stagesBeforeInvalid = stages();
  for (const [label, source] of [
    ['unannotated source replacing valid on-disk calc', 'import { program } from "omp-soroi/node";\nexport default program((input: number) => input + 1);\n'],
    ['duplicate-env source replacing valid on-disk calc', 'import { program } from "omp-soroi/node";\nexport default program((input: number): number => input + 1, { env: "first", env: "second" });\n'],
  ]) {
    const input = { kind: 'library.stage', lab, fn: 'calc', changes: [{ kind: 'source', source }] };
    outcome(`INPUT reject ${label}`, input);
    const rejected = await service.command(input); outcome(`RESULT reject ${label}`, rejected);
    assert.equal(rejected.ok, false); assert.equal(rejected.error.code, 'not_supported');
    assert.deepEqual(stages(), stagesBeforeInvalid);
    console.log(`PASS ${label} rejected from actual proposed source; valid prior intents retained`);
  }
  const newNodeApply = await apply(['annotated_probe']);
  assert.equal(newNodeApply.ok, true); assert.equal(newNodeApply.output.kind, 'applied');
  assert.equal(newNodeApply.output.staging, 'cleared');
  assert.equal(await git(remote, 'show', 'main:nodes/annotated_probe.ts'), annotatedProbe);
  assert.equal(await readFile(join(central, 'nodes/annotated_probe.ts'), 'utf8'), annotatedProbe);
  assert.deepEqual(stages(), stagedBeforeConflict);
  assert.deepEqual(await indexContents(panel), panelIndex);
  console.log('PASS annotated new-node staged overlay is inspected and published under /tmp cache; selected new intent cleared, unrelated calc retained, Panel index untouched');

  console.log('\n=== TRACE 6: positive Discussion merge output contract ===');
  const mergeProbe = 'import { program } from "omp-soroi/node";\nexport default program((input: number): number => input * 19);\n';
  await writeFile(join(discussion, 'nodes/merge_probe.ts'), mergeProbe);
  const positiveMergeInput = { kind: 'library.merge', lab, conversation: 'discussion-runtime', paths: ['nodes/merge_probe.ts'] };
  outcome('INPUT positive merge', positiveMergeInput);
  const positiveMerge = await service.command(positiveMergeInput); outcome('RESULT positive merge', positiveMerge);
  assert.equal(positiveMerge.ok, true); assert.equal(positiveMerge.output.kind, 'merged');
  assert.equal('staging' in positiveMerge.output, false);
  assert.equal(await git(remote, 'show', 'main:nodes/merge_probe.ts'), mergeProbe);
  assert.equal(await readFile(join(central, 'nodes/merge_probe.ts'), 'utf8'), mergeProbe);
  assert.deepEqual(stages(), stagedBeforeConflict);
  console.log('PASS library.merge returns merged and publishes only selected Discussion node with no apply-only staging field');

  console.log('\n=== TRACE 7: failed sync abort, retry, and preexisting unresolved merge ===');
  const localSyncConflict = calcSelected.replace('.times(3)', '.times(13)');
  const remoteSyncConflict = calcSelected.replace('.times(3)', '.times(11)');
  await writeFile(join(discussion, calcPath), localSyncConflict);
  await git(upstream, 'pull', '--ff-only', 'origin', 'main');
  await writeFile(join(upstream, calcPath), remoteSyncConflict); await git(upstream, 'add', '--', calcPath);
  await git(upstream, '-c', 'user.name=Remote Fixture', '-c', 'user.email=remote@example.invalid', 'commit', '-m', 'Remote calc overlap before sync regression');
  await git(upstream, 'push', 'origin', 'main');
  const remoteBeforeFailedSync = await remoteContents(remote);
  const remoteMessagesBeforeFailedSync = await git(remote, 'log', '--format=%s', 'main');
  const localMessagesBeforeFailedSync = await git(discussion, 'log', '--format=%s');
  const syncFailure = await service.command(syncInput); outcome('RESULT sync overlap first attempt', syncFailure);
  assert.equal(syncFailure.ok, false); assert.equal(syncFailure.error.code, 'revision_conflict');
  assert.equal(await readFile(join(discussion, calcPath), 'utf8'), localSyncConflict);
  assert.equal(await git(discussion, 'show', `HEAD:${calcPath}`), localSyncConflict);
  assert.equal((await git(discussion, 'diff', '--name-only', '--diff-filter=U')).trim(), '');
  assert.equal((await git(discussion, 'status', '--porcelain')).trim(), '');
  assert.deepEqual(await workingContents(central), remoteBeforeFailedSync);
  await assert.rejects(readFile(join(discussion, '.git/MERGE_HEAD')), { code: 'ENOENT' });
  const localMessagesAfterFailedSync = await git(discussion, 'log', '--format=%s');
  assert.equal(localMessagesAfterFailedSync.split('\n')[0], 'Save conversation drafts before library sync');
  assert.equal(localMessagesAfterFailedSync, `Save conversation drafts before library sync\n${localMessagesBeforeFailedSync}`);
  const syncRetry = await service.command(syncInput); outcome('RESULT sync overlap retry', syncRetry);
  assert.equal(syncRetry.ok, false); assert.equal(syncRetry.error.code, 'revision_conflict');
  assert.equal(await git(discussion, 'log', '--format=%s'), localMessagesAfterFailedSync);
  assert.equal(await readFile(join(discussion, calcPath), 'utf8'), localSyncConflict);
  assert.equal(await git(discussion, 'show', `HEAD:${calcPath}`), localSyncConflict);
  assert.equal((await git(discussion, 'status', '--porcelain')).trim(), '');
  await assert.rejects(readFile(join(discussion, '.git/MERGE_HEAD')), { code: 'ENOENT' });
  assert.deepEqual(await remoteContents(remote), remoteBeforeFailedSync);
  assert.equal(await git(remote, 'log', '--format=%s', 'main'), remoteMessagesBeforeFailedSync);
  assert.deepEqual(await workingContents(central), remoteBeforeFailedSync);
  console.log('PASS sync conflict aborts merge, preserves saved private calc without markers, and retry creates no commit or remote change');
  await assert.rejects(git(discussion, '-c', 'user.name=Runtime Fixture', '-c', 'user.email=runtime@example.invalid', 'merge', '--no-edit', 'origin/main'));
  const unresolvedBefore = await git(discussion, 'diff', '--name-only', '--diff-filter=U');
  assert.equal(unresolvedBefore.trim(), calcPath);
  const conflictMarkersBefore = await readFile(join(discussion, calcPath), 'utf8');
  assert.equal(conflictMarkersBefore.includes('<<<<<<<'), true);
  const existingConflict = await service.command(syncInput); outcome('RESULT sync preexisting unresolved merge', existingConflict);
  assert.equal(existingConflict.ok, false); assert.equal(existingConflict.error.code, 'revision_conflict');
  assert.equal(existingConflict.error.message, 'Resolve or abort the existing Git merge before syncing.');
  assert.equal(await git(discussion, 'log', '--format=%s'), localMessagesAfterFailedSync);
  assert.equal(await git(discussion, 'show', `HEAD:${calcPath}`), localSyncConflict);
  assert.equal(await readFile(join(discussion, calcPath), 'utf8'), conflictMarkersBefore);
  assert.equal(await git(discussion, 'diff', '--name-only', '--diff-filter=U'), unresolvedBefore);
  console.log('PASS preexisting unresolved merge refused before commit; marker file remains uncommitted and HEAD retains marker-free private source');
  await git(discussion, 'merge', '--abort');
  console.log('DRIVER_ONLY_SETUP abort manually authored unresolved merge after observing rejection');

  console.log('\n=== TRACE 8: per-node and per-draft read availability ADTs ===');
  await writeFile(join(upstream, 'nodes/unsupported_probe.ts'), 'export default () => "unsupported constructor shape";\n');
  await git(upstream, 'add', '--', 'nodes/unsupported_probe.ts');
  await git(upstream, '-c', 'user.name=Remote Fixture', '-c', 'user.email=remote@example.invalid', 'commit', '-m', 'Remote unsupported definition read regression');
  await git(upstream, 'push', 'origin', 'main');
  await rename(panel, `${panel}-temporarily-unreadable`);
  try {
    const degraded = await service.read(lab); outcome('RESULT degraded read', degraded);
    assert.equal(degraded.ok, true);
    const calcEntry = degraded.output.nodes.find((entry) => entry.kind === 'defined' && entry.definition.name === 'calc');
    assert.ok(calcEntry); assert.equal(calcEntry.kind, 'defined');
    const unsupported = degraded.output.nodes.find((entry) => entry.kind === 'unavailable' && entry.name === 'unsupported_probe');
    assert.ok(unsupported); assert.equal(unsupported.kind, 'unavailable'); assert.equal(unsupported.error.code, 'not_supported');
    const panelDraft = degraded.output.drafts.find((entry) => entry.conversation === 'panel-runtime');
    assert.ok(panelDraft); assert.equal(panelDraft.kind, 'unavailable'); assert.equal(panelDraft.error.layer, 'domain');
    const discussionDraft = degraded.output.drafts.find((entry) => entry.conversation === 'discussion-runtime');
    assert.ok(discussionDraft); assert.equal(discussionDraft.kind, 'listed'); assert.equal(discussionDraft.paths.includes(calcPath), true);
    console.log('PASS unsupported remote node produces per-node not_supported, missing other clone per-draft unavailable, while valid calc and Discussion draft remain visible');
  } finally { await rename(`${panel}-temporarily-unreadable`, panel); }

  console.log('\n=== TRACE 9: remote outage and restricted helper protocol ===');
  await rename(remote, `${remote}-offline`);
  try {
    const outage = await service.read(lab); outcome('RESULT remote outage read', outage);
    assert.equal(outage.ok, false); assert.equal(outage.error.code, 'persistence_unavailable');
    console.log('PASS real remote fetch outage is typed persistence_unavailable rather than revision_conflict');
  } finally { await rename(`${remote}-offline`, remote); }
  const helperLab = 'runtime-helper-lab';
  const helperMarker = join(root, 'forbidden-helper-executed.txt');
  db.insert(auth.organization).values({ id: helperLab, name: 'Runtime Helper Lab', slug: helperLab, createdAt: new Date() }).run();
  db.insert(schema.libraryRepo).values({ id: 'runtime-helper-repo', labId: helperLab, remoteUrl: `ext::touch ${helperMarker}`, branch: 'main' }).run();
  const inheritedProtocol = process.env.GIT_ALLOW_PROTOCOL;
  const inheritedCount = process.env.GIT_CONFIG_COUNT;
  const inheritedKey = process.env.GIT_CONFIG_KEY_0;
  const inheritedValue = process.env.GIT_CONFIG_VALUE_0;
  process.env.GIT_ALLOW_PROTOCOL = 'ext'; process.env.GIT_CONFIG_COUNT = '1';
  process.env.GIT_CONFIG_KEY_0 = 'protocol.ext.allow'; process.env.GIT_CONFIG_VALUE_0 = 'always';
  try {
    const helper = await service.read(helperLab); outcome('RESULT explicitly enabled inherited ext helper', helper);
    assert.equal(helper.ok, false); assert.equal(helper.error.code, 'persistence_unavailable');
    await assert.rejects(readFile(helperMarker), { code: 'ENOENT' });
    console.log('PASS service protocol allowlist overrides explicitly enabled inherited ext helper; helper command did not execute');
  } finally {
    for (const [key, value] of [['GIT_ALLOW_PROTOCOL', inheritedProtocol], ['GIT_CONFIG_COUNT', inheritedCount], ['GIT_CONFIG_KEY_0', inheritedKey], ['GIT_CONFIG_VALUE_0', inheritedValue]]) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
  const snapshot = await service.read(lab); outcome('FINAL library.read', snapshot);
  assert.equal(snapshot.ok, true);
  assert.equal(snapshot.output.nodes.some((entry) => entry.kind === 'defined' && entry.definition.name === 'annotated_probe'), true);
  assert.equal(snapshot.output.nodes.some((entry) => entry.kind === 'unavailable' && entry.name === 'unsupported_probe' && entry.error.code === 'not_supported'), true);
  assert.equal(snapshot.output.drafts.some((entry) => entry.kind === 'listed' && entry.conversation === 'discussion-runtime'), true);
  assert.deepEqual(stages(), stagedBeforeConflict);
  assert.deepEqual(await workingContents(actual), initialActualWorking); assert.deepEqual(await indexContents(actual), initialActualIndex);
  console.log('PASS actual source library tracked working files and real index content unchanged throughout original and regression traces');
  console.log('ALL_REQUESTED_LIFECYCLE_AND_REVIEW_REGRESSION_OBSERVATIONS_PASSED');
} finally { runtime.close(); console.log('SQLITE_CONNECTION_CLOSED'); }
