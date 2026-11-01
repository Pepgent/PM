import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { createRequire } from 'node:module';
import { createInterface } from 'node:readline';
const root = new URL('.', import.meta.url).pathname.replace(/\/$/, '');
const worktree = '/Users/mouriya/Ext/worktrees/pepgent-lab-32';
const web = worktree + '/apps/web';
const server = createServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
await new Promise(resolve => server.close(resolve));
const base = `http://127.0.0.1:${port}`;
const credentials = { name: 'Runtime owner', email: 'runtime-owner@example.test', password: randomBytes(24).toString('base64url'), organization: {name: 'Runtime Lab', slug: 'runtime-lab'} };
const env = {...process.env, HOST:'127.0.0.1', PORT:String(port), PEPGENT_WEB_ROOT:root + '/data', PEPGENT_LAB_HOME:root + '/data/lab', BETTER_AUTH_URL:base, BETTER_AUTH_SECRET:randomBytes(48).toString('base64url')};
writeFileSync(root + '/admin.json', JSON.stringify(credentials), {mode:0o600});
writeFileSync(root + '/private.json', JSON.stringify({base, credentials, env}), {mode:0o600});
function seed(file = root + '/admin.json', expected = 0) {
  const result = spawnSync(process.execPath, [web + '/bin/pepgent-lab-seed.mjs','--config',file], {cwd:web, env, encoding:'utf8'});
  assert.equal(result.status, expected, `seed unexpected exit; stdout=${result.stdout}; stderr=${result.stderr}`);
  assert.ok(!(result.stdout + result.stderr).includes(credentials.password));
  console.log('seed', {exit:result.status, expected});
}
seed(); seed();
writeFileSync(root + '/wrong.json', JSON.stringify({...credentials, password: randomBytes(24).toString('base64url')}), {mode:0o600});
seed(root + '/wrong.json', 1);
const require = createRequire(web + '/package.json');
const Database = require('better-sqlite3');
function counts() {
  const db = new Database(root + '/data/lab/lab.sqlite', {readonly:true});
  try {
    const result = Object.fromEntries(['user','account','organization','member','session'].map(name => [name, db.prepare(`select count(*) as count from "${name}"`).get().count]));
    const roles = db.prepare('select role from member').all();
    assert.deepEqual(result, {user:1, account:1, organization:1, member:1, session:0});
    assert.deepEqual(roles, [{role:'owner'}]);
    console.log('seed persistence', result, roles);
  } finally {db.close();}
}
counts();
let child;
let exited;
let log='';
async function start() {
  const {promise:ready,resolve,reject} = Promise.withResolvers();
  child = spawn(process.execPath,[web + '/bin/pepgent-web.mjs'], {cwd:web,env,stdio:['ignore','pipe','pipe']});
  exited = new Promise(r => child.once('exit',(code,signal)=>r({code,signal})));
  const record = chunk => {log += chunk; if(log.includes('[pepgent-web] listening at ' + base)) resolve();};
  child.stdout.on('data',record);child.stderr.on('data',record);
  child.once('exit',()=>reject(new Error('Host exited before readiness')));
  await ready;
  writeFileSync(root + '/state.json', JSON.stringify({base,pid:child.pid}), {mode:0o600});
  console.log('READY', JSON.stringify({root,base,pid:child.pid}));
}
async function stop() {
  child.kill('SIGTERM');
  const exit = await exited;
  writeFileSync(root + '/host.log', log, {mode:0o600});
  assert.deepEqual(exit,{code:0,signal:null});
  console.log('STOPPED',exit);
}
await start();
const lines = createInterface({input:process.stdin});
for await(const line of lines) {
  if(line === 'restart'){await stop();log='';await start();}
  if(line === 'stop'){await stop();lines.close();break;}
}
