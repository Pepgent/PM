import { spawn, execFileSync } from 'node:child_process';
import { createServer, createConnection } from 'node:net';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const TARGET_ROOT = '/Users/mouriya/Ext/worktrees/pepgent-lab-32';
const WEB_ROOT = join(TARGET_ROOT, 'apps/web');
const LAUNCHER = join(WEB_ROOT, 'bin/pepgent-web.mjs');
const ARTIFACT_ROOT = mkdtempSync('/tmp/pepgent-lab03-auth-failures-');
const HOST = '127.0.0.1';
const ownedPids = new Set();

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ESRCH') return false;
    return false;
  }
}

function processTable() {
  try {
    return execFileSync('ps', ['-axo', 'pid=,ppid=,command='], { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
  } catch {
    return '';
  }
}

function descendantPids(pid) {
  const rows = processTable().split('\n').map((line) => line.trim().split(/\s+/, 3)).filter((row) => row.length === 3);
  const children = rows.map(([child, parent, command]) => ({ pid: Number(child), ppid: Number(parent), command }));
  const descendants = [];
  const parents = [pid];
  for (const parent of parents) {
    for (const row of children) {
      if (row.ppid === parent && row.pid !== undefined && !descendants.some((item) => item.pid === row.pid)) {
        descendants.push(row);
        parents.push(row.pid);
      }
    }
  }
  return descendants;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function freePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, HOST, resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('free-port probe returned no TCP address');
  const port = address.port;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

function portListening(port) {
  return new Promise((resolve) => {
    const socket = createConnection({ host: HOST, port });
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    };
    socket.setTimeout(100, () => finish(false));
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
  });
}

function sanitizedOutput(text, caseRoot, port) {
  return text
    .replaceAll(caseRoot, '<case-root>')
    .replaceAll(`http://${HOST}:${port}`, `http://${HOST}:<ephemeral-port>`)
    .replaceAll(String(port), '<ephemeral-port>')
    .replace(/BETTER_AUTH_SECRET(?:=|: )[^\s\n]+/g, 'BETTER_AUTH_SECRET=<redacted>')
    .replace(/BETTER_AUTH_URL(?:=|: )[^\s\n]+/g, 'BETTER_AUTH_URL=<redacted>');
}

function filesystemFacts(caseRoot) {
  const paths = {
    caseRoot,
    legacyHome: join(caseRoot, 'legacy-home'),
    legacyFallback: join(caseRoot, 'legacy-home', '.pepgent'),
    webRoot: join(caseRoot, 'web-root'),
    paseoHomeUnderWebRoot: join(caseRoot, 'web-root', 'paseo-home'),
    labHome: join(caseRoot, 'lab-home'),
    paseoOverride: join(caseRoot, 'paseo-home-override'),
  };
  const fact = (path) => ({
    path: relative(ARTIFACT_ROOT, path) || '.',
    exists: existsSync(path),
    entries: existsSync(path) ? readdirSync(path).map((name) => name).sort() : [],
  });
  return Object.fromEntries(Object.entries(paths).map(([name, path]) => [name, fact(path)]));
}

async function stopOwned(pidList) {
  const pending = [...new Set(pidList)].filter((pid) => Number.isInteger(pid) && pid > 0 && isAlive(pid));
  for (const pid of pending) {
    ownedPids.add(pid);
    try { process.kill(pid, 'SIGTERM'); } catch {}
  }
  if (pending.length > 0) {
    const deadline = Date.now() + 2_000;
    while (pending.some(isAlive) && Date.now() < deadline) await delay(25);
  }
  for (const pid of pending.filter(isAlive)) {
    try { process.kill(pid, 'SIGKILL'); } catch {}
  }
  await delay(50);
  return pending.map((pid) => ({ pid, aliveAfterCleanup: isAlive(pid) }));
}

async function runCase(spec) {
  const caseRoot = mkdtempSync(join(ARTIFACT_ROOT, `${spec.name}-`));
  const port = await freePort();
  const env = { ...process.env };
  delete env.BETTER_AUTH_SECRET;
  delete env.BETTER_AUTH_URL;
  env.HOST = HOST;
  env.PORT = String(port);
  env.HOME = join(caseRoot, 'legacy-home');
  env.PEPGENT_WEB_ROOT = join(caseRoot, 'web-root');
  env.PEPGENT_LAB_HOME = join(caseRoot, 'lab-home');
  env.PASEO_HOME = join(caseRoot, 'paseo-home-override');
  env.PEPGENT_API_TOKEN = `lab03-${randomBytes(32).toString('base64url')}`;
  if (spec.name === 'missing-secret') env.BETTER_AUTH_URL = `http://${HOST}:${port}`;
  if (spec.name === 'missing-url') env.BETTER_AUTH_SECRET = randomBytes(48).toString('base64url');

  const child = spawn(process.execPath, [LAUNCHER], {
    cwd: WEB_ROOT,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (child.pid === undefined) throw new Error(`${spec.name}: child has no PID`);
  ownedPids.add(child.pid);
  const seenPids = new Set([child.pid]);
  let stdout = '';
  let stderr = '';
  child.stdout?.on('data', (chunk) => { stdout += chunk.toString('utf8'); });
  child.stderr?.on('data', (chunk) => { stderr += chunk.toString('utf8'); });
  const processSamples = [];
  let sampling = false;
  const sample = async () => {
    if (sampling) return;
    sampling = true;
    const descendants = descendantPids(child.pid);
    descendants.forEach((row) => { seenPids.add(row.pid); });
    processSamples.push({
      atMs: Date.now() - startedAt,
      parentAlive: isAlive(child.pid),
      descendantPids: descendants.map((row) => row.pid),
      listening: await portListening(port),
    });
    sampling = false;
  };
  const startedAt = Date.now();
  await sample();
  const interval = setInterval(() => { void sample(); }, 20);
  interval.unref();
  const exit = await new Promise((resolve, reject) => {
    let timeout;
    const finish = (value) => {
      if (timeout) clearTimeout(timeout);
      resolve(value);
    };
    child.once('error', reject);
    child.once('close', (code, signal) => finish({ code, signal }));
    timeout = setTimeout(() => {
      void stopOwned([...seenPids]).then((cleanup) => finish({ code: null, signal: 'HARNESS_TIMEOUT', cleanup }));
    }, 10_000);
    timeout.unref();
  });
  clearInterval(interval);
  await sample();
  await delay(100);
  const postExitAlive = [...seenPids].filter(isAlive);
  const cleanup = await stopOwned(postExitAlive);

  const stdoutPath = join(caseRoot, 'stdout.log');
  const stderrPath = join(caseRoot, 'stderr.log');
  writeFileSync(stdoutPath, stdout, { mode: 0o600 });
  writeFileSync(stderrPath, stderr, { mode: 0o600 });
  const combined = stdout + stderr;
  const listenerMarker = /\[pepgent-web\] listening at /i;
  const paseoMarkers = [/paseo-home/i, /paseo-daemon/i, /supervisor-entrypoint/i, /\[paseo/i, /daemon/i];
  const liveSamples = processSamples.filter((sampleRow) => sampleRow.parentAlive);
  const record = {
    case: spec.name,
    omitted: spec.omitted,
    counterpart: spec.counterpart,
    launcher: 'apps/web/bin/pepgent-web.mjs',
    cwd: 'apps/web',
    configuredOrigin: `http://${HOST}:<ephemeral-port>`,
    exit,
    output: {
      stdout: sanitizedOutput(stdout, caseRoot, port),
      stderr: sanitizedOutput(stderr, caseRoot, port),
      combinedHasListenerMarker: listenerMarker.test(combined),
      paseoMarkers: Object.fromEntries(paseoMarkers.map((marker) => [String(marker), marker.test(combined)])),
    },
    processes: {
      rootPidObserved: child.pid,
      seenPids: [...seenPids].sort((a, b) => a - b),
      samples: processSamples,
      liveSamples,
      postExitAlive: postExitAlive.sort((a, b) => a - b),
      cleanup,
      allSeenGoneAfterCleanup: cleanup.every((item) => !item.aliveAfterCleanup),
    },
    listener: {
      anyLiveSampleListening: liveSamples.some((sampleRow) => sampleRow.listening),
      anySampleListening: processSamples.some((sampleRow) => sampleRow.listening),
      sampleCount: processSamples.length,
    },
    filesystem: filesystemFacts(caseRoot),
    artifacts: {
      stdout: relative(ARTIFACT_ROOT, stdoutPath),
      stderr: relative(ARTIFACT_ROOT, stderrPath),
    },
  };
  writeFileSync(join(caseRoot, 'record.json'), JSON.stringify(record, null, 2) + '\n', { mode: 0o600 });
  return record;
}

const results = [];
try {
  results.push(await runCase({ name: 'missing-secret', omitted: 'BETTER_AUTH_SECRET', counterpart: 'BETTER_AUTH_URL' }));
  results.push(await runCase({ name: 'missing-url', omitted: 'BETTER_AUTH_URL', counterpart: 'BETTER_AUTH_SECRET' }));
} finally {
  const remaining = await stopOwned([...ownedPids]);
  writeFileSync(join(ARTIFACT_ROOT, 'owned-process-cleanup.json'), JSON.stringify(remaining, null, 2) + '\n', { mode: 0o600 });
}

const summary = {
  artifactRoot: ARTIFACT_ROOT,
  cases: results.map((result) => ({
    case: result.case,
    omitted: result.omitted,
    exit: result.exit,
    stdout: result.output.stdout,
    stderr: result.output.stderr,
    combinedHasListenerMarker: result.output.combinedHasListenerMarker,
    paseoMarkers: result.output.paseoMarkers,
    listener: result.listener,
    processes: {
      rootPidObserved: result.processes.rootPidObserved,
      seenPids: result.processes.seenPids,
      liveSamples: result.processes.liveSamples,
      postExitAlive: result.processes.postExitAlive,
      cleanup: result.processes.cleanup,
      allSeenGoneAfterCleanup: result.processes.allSeenGoneAfterCleanup,
    },
    filesystem: result.filesystem,
    artifacts: result.artifacts,
  })),
};
writeFileSync(join(ARTIFACT_ROOT, 'summary.json'), JSON.stringify(summary, null, 2) + '\n', { mode: 0o600 });
console.log(JSON.stringify(summary, null, 2));
