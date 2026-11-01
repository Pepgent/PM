import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
const root = new URL('.', import.meta.url).pathname;
const worktree = '/Users/mouriya/Ext/worktrees/pepgent-lab-32';
const web = worktree + '/apps/web';
const reservation = createServer();
const listening = Promise.withResolvers();
reservation.listen(0,'127.0.0.1',listening.resolve); await listening.promise;
const port=reservation.address().port;
const closed=Promise.withResolvers(); reservation.close(closed.resolve); await closed.promise;
const base=`http://127.0.0.1:${port}`;
const identity={name:'Close probe',email:'close-probe@example.test',password:randomBytes(24).toString('base64url'),organization:{name:'Close Lab',slug:'close-lab'}};
const env={...process.env,CI:'true',HOST:'127.0.0.1',PORT:String(port),PEPGENT_WEB_ROOT:root+'data',PEPGENT_LAB_HOME:root+'data/lab',BETTER_AUTH_URL:base,BETTER_AUTH_SECRET:randomBytes(48).toString('base64url')};
writeFileSync(root+'admin.private.json',JSON.stringify(identity),{mode:0o600});
const seeded=spawnSync(process.execPath,[web+'/bin/pepgent-lab-seed.mjs','--config',root+'admin.private.json'],{cwd:web,env,encoding:'utf8'});
assert.equal(seeded.status,0); console.log('seed exit',seeded.status);
function alive(pid){try{process.kill(pid,0);return true;}catch(error){if(error.code==='ESRCH')return false;throw error;}}
function descendants(pid){
  const pairs=execFileSync('ps',['-axo','pid=,ppid='],{encoding:'utf8'}).trim().split('\n').map(line=>line.trim().split(/\s+/).map(Number));
  const pids=[pid];for(const owner of pids)for(const [child,parent] of pairs)if(parent===owner&&!pids.includes(child))pids.push(child);return pids;
}
const observations=[];
for(const signal of ['SIGTERM','SIGINT']){
  const child=spawn(process.execPath,[worktree+'/node_modules/vite/bin/vite.js','dev','--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:web,env,stdio:['pipe','pipe','pipe']});
  let log=''; const ready=Promise.withResolvers(); const exited=Promise.withResolvers();
  const collect=chunk=>{log+=chunk.toString();if(log.includes(base))ready.resolve();};
  child.stdout.on('data',collect);child.stderr.on('data',collect);
  child.once('exit',(code,exitSignal)=>{exited.resolve({code,signal:exitSignal});ready.reject(new Error('Vite exited before readiness'));});
  const watchdog=setTimeout(()=>{child.kill('SIGKILL');},45000);
  let owned=[];
  try{
    await ready.promise;
    const anonymous=await fetch(base+'/home',{redirect:'manual'});assert.equal(anonymous.status,302);
    const login=await fetch(base+'/api/auth/sign-in/email',{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email:identity.email,password:identity.password})});
    assert.equal(login.status,200);
    const cookie=login.headers.getSetCookie().map(value=>value.split(';',1)[0]).join('; ');
    const session=await fetch(base+'/api/auth/get-session',{headers:{cookie}});assert.equal((await session.json()).user.email,identity.email);
    const protectedPage=await fetch(base+'/home',{headers:{cookie},redirect:'manual'});assert.equal(protectedPage.status,200);await protectedPage.text();
    const logout=await fetch(base+'/api/auth/sign-out',{method:'POST',headers:{cookie,origin:base,'content-type':'application/json'},body:'{}'});assert.equal(logout.status,200);
    owned=descendants(child.pid);
    child.kill(signal);
    const exit=await exited.promise;
    console.log('observed Vite exit',signal,JSON.stringify(exit));
    writeFileSync(root+signal+'.log',log);
    assert.equal(exit.code,signal==='SIGTERM'?143:130);
    assert.equal(exit.signal,null);
    assert.match(log,/supervisor_received_SIGTERM/);
    assert.match(log,/Worker exited \(code 0\). Supervisor shutting down/);
    assert.deepEqual(owned.filter(alive),[]);
    observations.push({signal,exit,anonymous:anonymous.status,login:login.status,protectedPage:protectedPage.status,logout:logout.status,ownedPids:owned,remaining:owned.filter(alive),gracefulPaseoLog:true});
  } finally {
    clearTimeout(watchdog);
    if(child.exitCode===null&&child.signalCode===null){
      owned=descendants(child.pid);
      child.kill('SIGKILL');
      await exited.promise;
    }
    for(const pid of owned) if(alive(pid)) process.kill(pid,'SIGKILL');
  }
}
writeFileSync(root+'observations.json',JSON.stringify(observations,null,2));
console.log(JSON.stringify({passed:true,observations},null,2));
