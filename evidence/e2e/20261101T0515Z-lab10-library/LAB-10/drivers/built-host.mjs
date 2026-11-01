import assert from 'node:assert/strict';
import { execFile, spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { appendFileSync } from 'node:fs';
import { mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';
const exec = promisify(execFile);
const repo = '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373';
const soroi = '/Users/mouriya/Ext/code/pepgent/pepgent-soroi';
const source = '/Users/mouriya/Ext/code/pepgent/pepgent-lab-library';
const history = '/tmp/lab10-historical-read-KFexby';
const root = await mkdtemp('/tmp/lab10-built-browser-');
const children = [];
const transcript = join(root,'lifecycle.log');
const note = (message) => { appendFileSync(transcript,message+'\n'); console.log(message); };
async function launch(command,args,cwd,env,label,ready) {
  const child = spawn(command,args,{cwd,env,stdio:['ignore','pipe','pipe']});
  children.push({child,label});
  let stdout = '';
  const completed = new Promise(resolve => child.once('close',(code,signal) => resolve({code,signal})));
  child.completed = completed;
  child.stdout.on('data', bytes => { stdout += bytes; appendFileSync(join(root,label+'.stdout.log'),bytes); });
  child.stderr.on('data', bytes => appendFileSync(join(root,label+'.stderr.log'),bytes));
  const match = await new Promise((resolve,reject) => {
    const timer = setTimeout(()=>reject(new Error(label+' readiness deadline')),40000);
    child.stdout.on('data',()=>{ const found=stdout.match(ready);if(found){clearTimeout(timer);resolve(found);} });
    child.once('error',error=>{clearTimeout(timer);reject(error);});
    child.once('exit',code=>{clearTimeout(timer);reject(new Error(label+' exited before readiness: '+code));});
  });
  note(label+' ready');
  return {child,match};
}
async function stopAll() {
  for (const {child,label} of [...children].reverse()) {
    if (child.exitCode === null && child.signalCode === null) child.kill('SIGTERM');
    const result = await child.completed;
    note(label+' stopped '+JSON.stringify(result));
    assert.equal(result.code,0);
  }
}
try {
  const store = await launch('bun',['packages/store/src/main.ts'],soroi,{...process.env,STORE_HOME:join(history,'store'),STORE_HOST:'127.0.0.1',STORE_PORT:'0'},'store',/(http:\/\/127\.0\.0\.1:\d+)/);
  const storeUrl = store.match[1];
  const reservation = createServer();
  await new Promise(resolve => reservation.listen(0,'127.0.0.1',resolve));
  const port = reservation.address().port;
  await new Promise((resolve,reject)=>reservation.close(error=>error?reject(error):resolve()));
  const baseURL = `http://127.0.0.1:${port}`;
  const identity = {name:'LAB-10 Browser Owner',email:'lab10-browser@example.test',password:randomBytes(30).toString('base64url'),organization:{name:'LAB-10 Browser Lab',slug:'lab10-browser'}};
  const other = {name:'LAB-10 Other Owner',email:'lab10-other@example.test',password:randomBytes(30).toString('base64url'),organization:{name:'LAB-10 Other Lab',slug:'lab10-other'}};
  const env = {...process.env,PORT:String(port),HOST:'127.0.0.1',PEPGENT_WEB_ROOT:root,PEPGENT_LAB_HOME:join(root,'lab'),PEPGENT_LAB_LIBRARY_HOME:join(root,'library-cache'),BETTER_AUTH_URL:baseURL,BETTER_AUTH_SECRET:randomBytes(48).toString('base64url'),SOROI_STORE_URL:storeUrl};
  await writeFile(join(root,'identity.json'),JSON.stringify(identity),{mode:0o600});
  await writeFile(join(root,'other-identity.json'),JSON.stringify(other),{mode:0o600});
  for (const config of ['identity.json','other-identity.json']) {
    const result = await exec(process.execPath,['apps/web/bin/pepgent-lab-seed.mjs','--config',join(root,config)],{cwd:repo,env});
    assert.match(result.stdout,/Lab administrator initialized/);
    appendFileSync(join(root,'seed.log'),result.stdout+result.stderr);
  }
  note('Both identities initialized through the built official initializer before serving.');
  const remote = join(root,'remote.git');
  const panel = join(root,'panel');
  await exec('git',['clone','--bare','--single-branch','--branch','main','--',source,remote]);
  await exec('git',['clone','--branch','main','--',remote,panel]);
  await exec('git',['-C',panel,'switch','-c','conv/browser-panel']);
  const {openLabDatabase}=await import(pathToFileURL(join(repo,'apps/web/src/server/lab/database.ts')));
  const schema=await import(pathToFileURL(join(repo,'apps/web/src/server/lab/schema.ts')));
  const authSchema=await import(pathToFileURL(join(repo,'apps/web/src/server/lab/auth-schema.ts')));
  const database=openLabDatabase({home:join(root,'lab'),migrationsFolder:join(repo,'apps/web/resources/lab/migrations')});
  let lab,otherLab;
  try {
    lab=database.db.select().from(authSchema.organization).all().find(row=>row.slug===identity.organization.slug);
    otherLab=database.db.select().from(authSchema.organization).all().find(row=>row.slug===other.organization.slug);
    const owner=database.db.select().from(authSchema.user).all().find(row=>row.email===identity.email);
    const membership=database.db.select().from(authSchema.member).all().find(row=>row.organizationId===lab.id&&row.userId===owner.id);
    assert.ok(lab&&otherLab&&membership);
    database.db.insert(schema.libraryRepo).values({id:'browser-library',labId:lab.id,remoteUrl:remote,branch:'main'}).run();
    database.db.insert(schema.conversation).values({id:'browser-panel',labId:lab.id,ownerId:membership.id,originKind:'Panel',panelPage:'nodes',panelScope:'library',worktree:panel}).run();
  } finally { database.close(); }
  note('Authored repository and nodes Panel fixtures; fixture DB connection closed before host launch.');
  const assets=join(repo,'apps/web/dist/server/assets');
  const rpcName=(await readdir(assets)).find(name=>/^lab-.*\.js$/.test(name));
  const rpcText=await readFile(join(assets,rpcName),'utf8');
  const endpoint=name=>{const id=rpcText.match(new RegExp('id: "([^"]+)",\\s*name: "'+name+'"'))?.[1];assert.ok(id);return '/_serverFn/'+id;};
  const records=JSON.parse(await readFile(join(history,'fixtures/records.json'),'utf8'));
  const metadata={root,baseURL,storeUrl,lab:lab.id,otherLab:otherLab.id,remote,panel,cache:join(root,'library-cache/repo-browser-library'),read:endpoint('labLibraryRead'),command:endpoint('labLibraryCommand'),versions:records.map(row=>row.version),fn:'historical-runtime-node'};
  await writeFile(join(root,'metadata.json'),JSON.stringify(metadata,null,2));
  await writeFile('/tmp/lab10-built-browser-current.json',JSON.stringify(metadata,null,2));
  await launch(process.execPath,['apps/web/bin/pepgent-web.mjs'],repo,env,'host',/\[pepgent-web\] listening at http:\/\/127\.0\.0\.1:\d+/);
  note('LAB10_READY '+JSON.stringify(metadata));
  const input=createInterface({input:process.stdin});
  for await (const line of input) { if(line.trim()==='stop'){input.close();break;}note('Control command ignored.'); }
} finally { await stopAll(); }
