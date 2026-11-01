import { spawn, execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, writeFile, appendFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import assert from 'node:assert/strict';
import { LabLibrary } from '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373/apps/web/src/server/lab/library.ts';
import { openLabDatabase } from '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373/apps/web/src/server/lab/database.ts';
import { organization } from '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373/apps/web/src/server/lab/auth-schema.ts';
import { libraryRepo } from '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373/apps/web/src/server/lab/schema.ts';

const execute = promisify(execFile);
const repo = '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373';
const soroi = '/Users/mouriya/Ext/code/pepgent/pepgent-soroi';
const root = await mkdtemp('/tmp/lab10-historical-read-');
const logPath = `${root}/transcript.jsonl`;
const home = `${root}/store`;
const fn = 'historical-runtime-node';
const labId = 'historical-runtime-lab';
await mkdir(`${root}/fixtures`, { recursive: true });
async function log(event: string, data: unknown) {
  const line = JSON.stringify({ event, data });
  console.log(line);
  await appendFile(logPath, `${line}\n`);
}
await log('environment', { root, repo, soroi, node: process.version, command: 'node --import tsx /tmp/lab10-historical-read-driver.mts', note: 'Object identities generated solely for Soroi addressing, not verification evidence.' });
const processResults: unknown[] = [];
let generation = 0;
let service: Awaited<ReturnType<typeof start>> | undefined;
async function start() {
  generation++;
  const label = `store-${generation}`;
  const child = spawn('bun', ['packages/store/src/main.ts'], {
    cwd: soroi, env: { ...process.env, STORE_HOME: home, STORE_HOST: '127.0.0.1', STORE_PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let stdout = '';
  let stderr = '';
  const closed = new Promise<{code: number | null; signal: NodeJS.Signals | null}>((resolve) => child.once('close', (code, signal) => resolve({ code, signal })));
  child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
  const url = await new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => { child.kill('SIGTERM'); reject(new Error(`${label} readiness timeout: ${stdout} ${stderr}`)); }, 20000);
    child.once('error', (error) => { clearTimeout(timer); reject(error); });
    child.once('close', (code, signal) => { clearTimeout(timer); reject(new Error(`${label} exited before readiness ${code}/${signal}: ${stdout} ${stderr}`)); });
    child.stdout.on('data', () => {
      const match = stdout.match(/pepgent-store listening (http:\/\/\S+) home=/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  await log('store-start', { label, pid: child.pid, url, home, command: 'STORE_HOME=<same-home> STORE_HOST=127.0.0.1 STORE_PORT=0 bun packages/store/src/main.ts' });
  return { child, closed, url, label, save: async () => { await writeFile(`${root}/${label}.stdout.log`, stdout); await writeFile(`${root}/${label}.stderr.log`, stderr); } };
}
async function stop() {
  if (!service) return;
  const current = service;
  current.child.kill('SIGTERM');
  const exit = await current.closed;
  await current.save();
  const status = { label: current.label, pid: current.child.pid, ...exit, exitCode: current.child.exitCode, killed: current.child.killed };
  processResults.push(status);
  await log('store-stopped', status);
  service = undefined;
  assert.equal(exit.code, 0, 'Soroi should close gracefully');
  assert.equal(exit.signal, null);
}
async function request(method: string, route: string, body?: unknown, bytes?: string) {
  assert(service);
  const response = await fetch(new URL(route, service.url), {
    method, headers: body === undefined ? undefined : { 'content-type': 'application/json' },
    body: bytes ?? (body === undefined ? undefined : JSON.stringify(body)),
  });
  const text = await response.text();
  const data = text === '' ? null : response.headers.get('content-type')?.includes('application/json') ? JSON.parse(text) : text;
  await log('http', { method, route, request: body ?? (bytes === undefined ? null : { literalBytes: bytes }), status: response.status, response: data });
  return { status: response.status, data };
}
function identity(bytes: string) { return createHash('sha256').update(bytes).digest('hex'); }
async function fixture(label: string, value: number, commit: string, display: {kind:'commit_sequence';sequence:number}|{kind:'unavailable'}) {
  const output = { label, value };
  const source = `export function historicalNode() { return ${JSON.stringify(output)}; }\n`;
  const objects = {
    bundle: `${source}console.log(JSON.stringify(historicalNode()));\n`,
    entry: `${source}// entry source for ${label}\n`,
    sources: JSON.stringify({ file: 'nodes/historicalNode.ts', source, label }) + '\n',
    buildManifest: JSON.stringify({ entrypoint: 'nodes/historicalNode.ts', platform: 'node', format: 'esm', label }) + '\n',
    lockfile: `fixture-lockfile\nnode=builtin-only\nlabel=${label}\n`,
  };
  const fields = Object.fromEntries(Object.entries(objects).map(([field, text]) => [field, identity(text)]));
  const record = { version: fields.bundle, ...fields, commit };
  const path = `${root}/fixtures/${label}.mjs`;
  await writeFile(path, objects.bundle);
  const actual = JSON.parse((await execute(process.execPath, [path])).stdout);
  assert.deepEqual(actual, output);
  await log('fixture-executed', { label, path, output: actual });
  return { label, output, objects, record, display };
}
function capture(record: Awaited<ReturnType<typeof fixture>>, captureLabel: string) {
  return { identity: identity(`capture-${captureLabel}`), fn, version: record.record.version, body: 'Program', env: { kind: 'central' }, inputs: [], outputs: [{ field: 'result', value: { kind: 'scalar', scalar: { kind: 'string', v: JSON.stringify(record.output) } } }], transcript: null };
}
function call(position: number, origin: unknown, outputName: string) {
  return { position, fn, inputNames: [], outputNames: [{ field: 'result', name: outputName }], startedAt: '2026-11-01T00:00:01Z', endedAt: '2026-11-01T00:00:02Z', outcome: { kind: 'Done', origin } };
}
function sortedUsage(rows: any[]) {
  return rows.map(row => ({ ...row, runs: [...row.runs].sort((a, b) => a.run.localeCompare(b.run)) })).sort((a, b) => a.version.localeCompare(b.version));
}
const database = openLabDatabase({ home: `${root}/lab`, migrationsFolder: `${repo}/apps/web/resources/lab/migrations` });
database.db.insert(organization).values({ id: labId, name: 'Historical Runtime Lab', slug: labId, createdAt: new Date() }).run();
const seed = `${root}/git-seed`;
const remote = `${root}/library-remote.git`;
await mkdir(`${seed}/nodes`, { recursive: true });
async function git(args: string[], cwd = seed) {
  const result = await execute('git', ['-C', cwd, ...args], { env: {
    ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'commit.gpgsign', GIT_CONFIG_VALUE_0: 'false',
    GIT_AUTHOR_NAME: 'Historical Fixture', GIT_AUTHOR_EMAIL: 'historical@example.invalid',
    GIT_COMMITTER_NAME: 'Historical Fixture', GIT_COMMITTER_EMAIL: 'historical@example.invalid',
  } });
  return result.stdout.trim();
}
async function sourceCommit(label: string, value: number) {
  const source = `export function historicalNode() { return ${JSON.stringify({ label, value })}; }\n// entry source for ${label}\n`;
  await writeFile(`${seed}/nodes/historicalNode.ts`, source);
  await git(['add', '--', 'nodes/historicalNode.ts']);
  await git(['commit', '-m', `Source ${label} returns ${value}`]);
  return await git(['rev-parse', 'HEAD']);
}
await git(['init', '-b', 'main']);
const alphaCommit = await sourceCommit('historical-alpha', 17);
const betaCommit = await sourceCommit('historical-beta', 29);
await git(['clone', '--bare', '--', seed, remote], root);
await git(['checkout', '--orphan', 'unpublished-private']);
const unpublishedCommit = await sourceCommit('historical-unpublished', 41);
await git(['checkout', 'main']);
database.db.insert(libraryRepo).values({ id: 'historical-runtime-repo', labId, remoteUrl: remote, branch: 'main', deployKeyId: null }).run();
await log('git-fixture', { seed, remote, labId, sourceHistory: [
  { source: 'historical-alpha', output: 17, expectedSequence: 1, commit: alphaCommit },
  { source: 'historical-beta', output: 29, expectedSequence: 2, commit: betaCommit },
], unpublished: { source: 'historical-unpublished', output: 41, commit: unpublishedCommit, published: false } });
const signal = new AbortController().signal;
function library() {
  assert(service);
  return new LabLibrary(database.db, { cacheHome: `${root}/cache-${generation}`, storeUrl: service.url, signal });
}
let firstLibrary: LabLibrary | undefined;
let passed = false;
try {
  const alpha = await fixture('historical-alpha', 17, alphaCommit, { kind: 'commit_sequence', sequence: 1 });
  const beta = await fixture('historical-beta', 29, betaCommit, { kind: 'commit_sequence', sequence: 2 });
  const unpublished = await fixture('historical-unpublished', 41, unpublishedCommit, { kind: 'unavailable' });
  await writeFile(`${root}/fixtures/records.json`, JSON.stringify([alpha.record, beta.record, unpublished.record], null, 2));
  service = await start();
  assert.equal((await request('GET', '/runs')).status, 200);
  firstLibrary = library();
  const captureAlpha = capture(alpha, 'alpha');
  const captureBeta = capture(beta, 'beta');
  async function commit(record: typeof alpha, calls: ReturnType<typeof call>[], session: string, existing?: string) {
    const transfer = await request('POST', '/transfers', { kind: 'EvalTransfer', evalCall: session });
    assert.equal(transfer.status, 201);
    for (const [field, bytes] of Object.entries(record.objects)) {
      const upload = await request('PUT', `/transfers/${transfer.data.transfer}/objects/${record.record[field as keyof typeof record.objects]}`, undefined, bytes);
      assert.equal(upload.status, 204);
    }
    const step = { run: existing ? { kind: 'existing', run: existing } : { kind: 'open', session }, session, code: `execute ${record.label}; adopt historical-alpha`, transfer: transfer.data.transfer, roots: [], calls, stops: calls.map((item) => item.outputNames[0].name), versions: [record.record] };
    await writeFile(`${root}/fixtures/${session}-${record.label}-step.json`, JSON.stringify(step, null, 2));
    const reply = await request('POST', '/runs/steps', step);
    assert.equal(reply.status, 201);
    return reply.data.run as string;
  }
  const runA = await commit(alpha, [call(0, { kind: 'Executed', capture: captureAlpha, site: { kind: 'central' } }, 'a0'), call(1, { kind: 'Adopted', capture: captureAlpha.identity }, 'a1')], 'runtime-run-A');
  const end = await request('POST', `/runs/${runA}/end`);
  assert.equal(end.status, 200);
  assert.equal(end.data.kind, 'Ended');
  const runB = await commit(beta, [call(0, { kind: 'Executed', capture: captureBeta, site: { kind: 'central' } }, 'b0'), call(1, { kind: 'Adopted', capture: captureAlpha.identity }, 'b1')], 'runtime-run-B');
  assert.equal(await commit(unpublished, [], 'runtime-run-B', runB), runB);
  function expected(state: 'Open' | 'Aborted') {
    return sortedUsage([{ version: alpha.record.version, runs: [{ run: runA, state: 'Ended', calls: 2 }, { run: runB, state, calls: 1 }] }, { version: beta.record.version, runs: [{ run: runB, state, calls: 1 }] }]);
  }
  async function compareUsage(client: LabLibrary, phase: string, state: 'Open' | 'Aborted') {
    const http = await request('GET', `/functions/${encodeURIComponent(fn)}/usage`);
    assert.equal(http.status, 200);
    const domain = await client.usage(fn);
    await log('library-usage', { phase, result: domain });
    assert.equal(domain.ok, true);
    if (!domain.ok) throw new Error('usage failed');
    assert.deepEqual(sortedUsage(http.data), expected(state));
    assert.deepEqual(sortedUsage(domain.output), sortedUsage(http.data));
    await log('usage-semantic-confirmation', { phase, alpha: [{ run: runA, state: 'Ended', calls: 2 }, { run: runB, state, calls: 1 }], beta: [{ run: runB, state, calls: 1 }], totalOccurrences: 4 });
    return http.data;
  }
  async function compareVersions(client: LabLibrary, phase: string) {
    for (const fixture of [alpha, beta, unpublished]) {
      let orphanPreCall: { head: string; branch: string; defaultRefs: string } | null = null;
      if (fixture === unpublished) {
        const central = `${root}/cache-${generation}/repo-historical-runtime-repo`;
        const before = {
          head: await git(['rev-parse', 'HEAD'], central),
          branch: await git(['branch', '--show-current'], central),
          defaultRefs: await git(['show-ref'], central),
        };
        await git(['fetch', '--no-tags', seed, 'unpublished-private'], central);
        await log('orphan-fetch', { phase, central, command: ['git', '-C', central, 'fetch', '--no-tags', seed, 'unpublished-private'], exitCode: 0 });
        const presentCommand = ['cat-file', '-e', `${unpublishedCommit}^{commit}`];
        await git(presentCommand, central);
        const countCommand = ['rev-list', '--count', unpublishedCommit];
        const orphanCount = await git(countCommand, central);
        assert.equal(orphanCount, '1');
        let ancestryExit: number | null = null;
        try { await git(['merge-base', '--is-ancestor', unpublishedCommit, 'HEAD'], central); ancestryExit = 0; }
        catch (error) {
          if (error instanceof Error && 'code' in error && typeof error.code === 'number') ancestryExit = error.code;
          else throw error;
        }
        assert.equal(ancestryExit, 1, 'The present private commit must not be in default HEAD history.');
        const after = {
          head: await git(['rev-parse', 'HEAD'], central),
          branch: await git(['branch', '--show-current'], central),
          defaultRefs: await git(['show-ref'], central),
        };
        assert.deepEqual(after, before, 'Fetching private object must not move HEAD or default refs.');
        assert.equal(after.branch, 'main');
        assert.equal(after.head, betaCommit);
        orphanPreCall = after;
        await log('orphan-present-not-default-ancestor', { phase, central,
          objectPresence: { command: ['git', '-C', central, ...presentCommand], exitCode: 0 },
          countableOutsideDefaultHistory: { command: ['git', '-C', central, ...countCommand], exitCode: 0, stdout: orphanCount },
          defaultAncestry: { command: ['git', '-C', central, 'merge-base', '--is-ancestor', unpublishedCommit, 'HEAD'], exitCode: ancestryExit },
          before, after, headAndDefaultRefsUnchanged: true });
      }
      const http = await request('GET', `/versions/${fixture.record.version}`);
      assert.equal(http.status, 200);
      const domain = await client.version(labId, fixture.record.version);
      await log('library-version', { phase, label: fixture.label, result: domain });
      assert.equal(domain.ok, true);
      if (!domain.ok) throw new Error('version failed');
      assert.deepEqual(domain.output.record, http.data);
      assert.deepEqual(domain.output.display, fixture.display);
      if (fixture === unpublished) {
        const central = `${root}/cache-${generation}/repo-historical-runtime-repo`;
        await git(['cat-file', '-e', `${unpublishedCommit}^{commit}`], central);
        const count = await git(['rev-list', '--count', unpublishedCommit], central);
        assert.equal(count, '1');
        let ancestryExit: number | null = null;
        try { await git(['merge-base', '--is-ancestor', unpublishedCommit, 'HEAD'], central); ancestryExit = 0; }
        catch (error) {
          if (error instanceof Error && 'code' in error && typeof error.code === 'number') ancestryExit = error.code;
          else throw error;
        }
        assert.equal(ancestryExit, 1);
        const afterCall = { head: await git(['rev-parse', 'HEAD'], central),
          branch: await git(['branch', '--show-current'], central), defaultRefs: await git(['show-ref'], central) };
        assert.deepEqual(afterCall, orphanPreCall);
        await log('orphan-remains-present-after-library-call', { phase, central,
          objectPresenceExitCode: 0, countExitCode: 0, count, defaultAncestryExitCode: ancestryExit,
          afterCall, headAndAllRefsUnchanged: true, actualDisplay: domain.output.display });
      }
      await log('version-display-confirmed', { phase, label: fixture.label, display: domain.output.display });
      assert.deepEqual(http.data, fixture.record);
      for (const [field, literal] of Object.entries(fixture.objects)) {
        const bytes = await request('GET', `/objects/${domain.output.record[field as keyof typeof fixture.objects]}`);
        assert.equal(bytes.status, 200);
        assert.equal(bytes.data, literal, `literal ${field} content differs`);
        if (field === 'bundle') {
          const path = `${root}/fixtures/${phase}-${fixture.label}-downloaded.mjs`;
          await writeFile(path, bytes.data);
          const execution = await execute(process.execPath, [path]);
          const output = JSON.parse(execution.stdout);
          assert.deepEqual(output, fixture.output);
          await log('downloaded-bundle-executed', { phase, label: fixture.label, path, stdout: execution.stdout, stderr: execution.stderr, output });
        }
      }
    }
  }
  await compareUsage(firstLibrary, 'before-abort', 'Open');
  const abort = await request('POST', `/runs/${runB}/abort`);
  assert.equal(abort.status, 200);
  assert.equal(typeof abort.data.seq, 'number');
  const finalUsage = await compareUsage(firstLibrary, 'after-abort', 'Aborted');
  await compareVersions(firstLibrary, 'before-stop');
  const missing = identity('unknown-version-not-uploaded');
  const missingHttp = await request('GET', `/versions/${missing}`);
  assert.equal(missingHttp.status, 404);
  const missingLibrary = await firstLibrary.version(labId, missing);
  await log('library-unknown-version', missingLibrary);
  assert.equal(missingLibrary.ok, false);
  if (!missingLibrary.ok) { assert.equal(missingLibrary.error.layer, 'domain'); assert.equal(missingLibrary.error.code, 'not_found'); }
  await stop();
  const unavailableUsage = await firstLibrary.usage(fn);
  const unavailableVersion = await firstLibrary.version(labId, alpha.record.version);
  await log('library-store-stopped', { usage: unavailableUsage, version: unavailableVersion, signalAborted: signal.aborted });
  for (const result of [unavailableUsage, unavailableVersion]) {
    assert.equal(result.ok, false);
    if (!result.ok) { assert.equal(result.error.layer, 'domain'); assert.equal(result.error.code, 'persistence_unavailable'); }
  }
  assert.equal(signal.aborted, false);
  service = await start();
  const restarted = library();
  const restartedUsage = await compareUsage(restarted, 'after-restart', 'Aborted');
  assert.deepEqual(sortedUsage(restartedUsage), sortedUsage(finalUsage));
  await compareVersions(restarted, 'after-restart');
  passed = true;
  await log('scenario-passed', { runA, runB, labels: [alpha.label, beta.label], outputs: [alpha.output, beta.output], storeHome: home });
} catch (error) {
  await log('scenario-failed', { name: error instanceof Error ? error.name : 'unknown', message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : null });
  process.exitCode = 1;
} finally {
  await stop();
  database.close();
  await log('final-status', { passed, root, transcript: logPath, processes: processResults, databaseClosed: true });
}
