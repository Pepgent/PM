import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const root = new URL('.', import.meta.url).pathname;
const {base, credentials} = JSON.parse(readFileSync(root + 'private.json','utf8'));
const web = '/Users/mouriya/Ext/worktrees/pepgent-lab-32/apps/web';
const require = createRequire(web + '/package.json');
const {toJSON} = await import(require.resolve('seroval'));
const server = readFileSync(web + '/dist/server/server.js','utf8');
const id = /"([a-f0-9]{64})":\s*\{\s*functionName:\s*"labCatalogRead_createServerFn_handler"/.exec(server)?.[1];
assert.ok(id);
const rpc = '/_serverFn/' + id;
const observations = [];
async function expectResponse(path, options, status, inspect) {
  const response = await fetch(base + path, {...options, redirect:'manual'});
  assert.equal(response.status, status, path);
  if (inspect) await inspect(response);
  observations.push({path, method:options?.method ?? 'GET', status:response.status});
  return response;
}
for (const path of ['/home','/experiments/R-021/edit?tab=canvas','/settings/billing','/compute/gpus']) {
  await expectResponse(path, undefined, 302, async response => {
    const location = new URL(response.headers.get('location'), base);
    assert.equal(location.pathname,'/sign-in');
    assert.ok(location.searchParams.get('returnTo')?.startsWith('/'));
    assert.equal(response.headers.get('cache-control'),'no-store');
    assert.equal(response.headers.getSetCookie().some(value=>value.startsWith('pepgent_web_token=')),false);
  });
}
for (const path of ['/api/lab/missing',rpc]) {
  await expectResponse(path, {method:'POST',headers:{origin:base,'content-type':'application/json'},body:'{}'}, 401, async response=>{
    assert.deepEqual(await response.json(),{ok:false,error:{layer:'auth',code:'unauthenticated',message:'A Lab session is required.'}});
  });
}
await expectResponse('/sign-in',undefined,307,async response=>{
  assert.equal(response.headers.get('location'),'/sign-in?returnTo=%2Fhome');
});
await expectResponse('/sign-in?returnTo=%2Fhome',undefined,200);
await expectResponse('/api/auth/get-session',undefined,200,async response=>assert.equal(await response.json(),null));
await expectResponse('/api/authentic',undefined,401);
await expectResponse('/new',undefined,200,async response=>assert.ok(response.headers.getSetCookie().some(value=>value.startsWith('pepgent_web_token='))));
await expectResponse('/api/auth/sign-up/email',{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({...credentials,email:'forbidden@example.test'})},404);
const login = await expectResponse('/api/auth/sign-in/email',{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email:credentials.email,password:credentials.password})},200);
const cookieValues = login.headers.getSetCookie();
assert.ok(cookieValues.some(value=>value.includes('HttpOnly')&&value.includes('SameSite=Lax')));
const cookie = cookieValues.map(value=>value.split(';',1)[0]).join('; ');
const authHeaders = {cookie,origin:base,'content-type':'application/json'};
await expectResponse('/home',{headers:{cookie}},200,async response=>assert.equal(response.headers.getSetCookie().some(value=>value.startsWith('pepgent_web_token=')),false));
await expectResponse('/api/lab/missing',{headers:{cookie}},404,async response=>assert.deepEqual(await response.json(),{ok:false,error:{layer:'protocol',code:'unknown_operation',message:'Unknown API route.'}}));
const catalog = await expectResponse(rpc,{method:'POST',headers:{...authHeaders,'x-tsr-serverFn':'true'},body:JSON.stringify(toJSON({data:{lab:credentials.organization.slug},context:{}}))},200);
const catalogBody = await catalog.text();
assert.ok(catalogBody.includes('not_supported')&&catalogBody.includes('lab.catalog.read'));
await expectResponse('/api/auth/organization/create',{method:'POST',headers:authHeaders,body:JSON.stringify({name:'Forbidden',slug:'forbidden'})},404);
await expectResponse('/api/auth/sign-out',{method:'POST',headers:authHeaders,body:'{}'},200);
await expectResponse('/api/auth/get-session',{headers:{cookie}},200,async response=>assert.equal(await response.json(),null));
await expectResponse('/home',{headers:{cookie}},302);
writeFileSync(root + 'http-observations.json',JSON.stringify(observations,null,2));
console.log(JSON.stringify({passed:observations.length,observations},null,2));
