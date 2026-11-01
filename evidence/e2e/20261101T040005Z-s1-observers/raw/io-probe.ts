import { mkdtemp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { Evidence, object } from '/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f/e2e/standin/evidence.ts';
import { observeSse } from '/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f/e2e/standin/sse.ts';
import { observeLibraryChange, libraryChange } from '/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f/e2e/standin/library-change.ts';
import { RecordedContext } from '/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f/e2e/s1/recorded.ts';
import { LabStandIn } from '/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f/e2e/standin/lab-standin.ts';
const root=await mkdtemp('/tmp/soroi-observer-io-');
const observations:unknown[]=[];
const record=async(value:unknown)=>{observations.push(value);console.log(JSON.stringify(value));await Bun.write(join(root,'observations.json'),JSON.stringify(observations,null,2));};
const build={commits:{},release:'not-installed',images:{},omp:'not-run',model:'not-run'};
// Real HTTP I/O against owned servers, not a product store/model.
let active=0;
const controllers=new Map<string,ReadableStreamDefaultController<Uint8Array>>();
const server=Bun.serve({hostname:'127.0.0.1',port:0,fetch(request){const path=new URL(request.url).pathname;return new Response(new ReadableStream({start(c){active++;controllers.set(path,c);c.enqueue(new TextEncoder().encode(path==='/invalid'?'{':': opened\r\n\r\n'));if(path==='/eof'){c.close();active--;controllers.delete(path);}},cancel(){active--;controllers.delete(path);}}),{headers:{'content-type':path==='/invalid'?'application/json':'text/event-stream'}});}});
const evidence=await Evidence.create(join(root,'sse'));
let stream:Awaited<ReturnType<typeof observeSse>>|undefined;
try{
 stream=await observeSse(server.url.href,'/events',evidence,1000);
 const firstSend=await evidence.rpc('send','owner',JSON.stringify({type:'prompt',id:'one',message:'first'}));
 controllers.get('/events')!.enqueue(new TextEncoder().encode('data: {"seq":1,\r\ndata: "value":"中'));
 controllers.get('/events')!.enqueue(new TextEncoder().encode('文"}\r\n\r\n'));
 await stream.until(blocks=>blocks.some(block=>block.raw.includes('"seq":1')));
 await evidence.rpc('receive','owner',JSON.stringify({type:'prompt_result',id:'one',status:'completed'}));
 const secondSend=await evidence.rpc('send','owner',JSON.stringify({type:'prompt',id:'two',message:'second'}));
 controllers.get('/events')!.enqueue(new TextEncoder().encode('data: {"seq":2,"value":"second"}\n\n'));
 await stream.until(blocks=>blocks.some(block=>block.raw.includes('"seq":2')));
 const result=await evidence.rpc('receive','owner',JSON.stringify({type:'prompt_result',id:'two',status:'completed'}));
 await stream.finish();stream=undefined;
 const out=await Evidence.create(join(root,'sse-replay')),context=new RecordedContext({evidenceDir:out.dir,inputDir:evidence.dir,a0Verdict:'absent',build,reproduce:'NON-LIVE owned IO'},out);
 await context.loadRpc();const blocks=await context.stream({metadata:`store/GET-${encodeURIComponent('/events')}-1.json`},'/events',{send:firstSend,receive:result});
 if(!isDeepStrictEqual(blocks.map(b=>b.rpcLine),[0,firstSend,secondSend]))throw Error('SSE event arrival coordinates are not actual per-block observations');
 await record({scenario:'owned-sse-complete',headersRpcLine:0,blockWatermarks:blocks.map(b=>b.rpcLine),rawBlocks:blocks.map(b=>b.raw),firstSend,secondSend,result,activeAfterFinish:active,liveProductFlow:false});
 let rejected=false;const start=Date.now();try{await observeSse(server.url.href,'/invalid',evidence,40);}catch{rejected=true;}
 const elapsed=Date.now()-start;if(!rejected||elapsed>500)throw Error('Invalid HTTP body escaped deadline');
 await record({scenario:'invalid-response-deadline-after',rejected,elapsedMs:elapsed,timeoutMs:40,liveProductFlow:false});
 for(const [path,timeout] of [['/eof',300],['/quiet',40]] as const){const observed=await observeSse(server.url.href,path,evidence,timeout);let failed=false;try{await observed.until(()=>false);}catch{failed=true;}let finishFailed=false;try{await observed.finish();}catch{finishFailed=true;}if(!failed||!finishFailed)throw Error('EOF/quiet stream incorrectly succeeded');await record({scenario:`owned-sse-${path.slice(1)}`,untilRejected:failed,finishRejected:finishFailed,liveProductFlow:false});}
}finally{if(stream)await stream.finish().catch(()=>{});await server.stop(true);}
// Real immutable Git observation. Only new repositories under this /tmp root are changed.
async function command(argv:string[],cwd:string){const child=Bun.spawn(argv,{cwd,stdin:'ignore',stdout:'pipe',stderr:'pipe'});const[code,stdout,stderr]=await Promise.all([child.exited,new Response(child.stdout).text(),new Response(child.stderr).text()]);if(code)throw Error(`${argv[0]}: ${stderr}`);return stdout;}
const source='export default program(async (input: number): Promise<number> => new Decimal(input).times(2).toNumber());\n';
for(const kind of ['committed','unstaged','failed','bad-baseline'] as const){
 const cwd=join(root,`library-${kind}`),marker=join(cwd,'command-started');
 await mkdir(join(cwd,'nodes'),{recursive:true});await Bun.write(join(cwd,'nodes/calc.ts'),source);
 await command(['git','init',cwd],root);await command(['git','add','nodes/calc.ts'],cwd);
 await command(['git','-c','user.name=E2E Probe','-c','user.email=e2e@example.invalid','commit','-m','initial controlled calc'],cwd);
 const script=join(root,`edit-${kind}.mjs`);
 await Bun.write(script,`await Bun.write('command-started','started');`+(kind==='failed'?'process.exit(7);':`const p='nodes/calc.ts';await Bun.write(p,(await Bun.file(p).text()).replace('.times(2)','.times(3)'));${kind==='committed'?"const add=Bun.spawn(['git','add','nodes/calc.ts'],{stdout:'inherit',stderr:'inherit'});if(await add.exited)process.exit(8);":""}const commit=Bun.spawn(['git','-c','user.name=E2E Probe','-c','user.email=e2e@example.invalid','commit','--allow-empty','-m','controlled change'],{stdout:'inherit',stderr:'inherit'});process.exit(await commit.exited);`));
 const trace:string[]=[],premature:boolean[]=[];
 const baselineServer=Bun.serve({hostname:'127.0.0.1',port:0,fetch(request){
  const path=new URL(request.url).pathname,name=path.includes('usage')?'usage':'version',payload=JSON.stringify(path.includes('usage')?[]:{version:'observed-old',commit:'baseline-fixture-only'});
  return new Response(new ReadableStream({async start(c){trace.push(`${name}-headers`);c.enqueue(new TextEncoder().encode(payload.slice(0,1)));await Bun.sleep(25);premature.push(await Bun.file(marker).exists());c.enqueue(new TextEncoder().encode(payload.slice(1)));c.close();trace.push(`${name}-body-finished`);}}),{status:kind==='bad-baseline'?409:200,headers:{'content-type':'application/json'}});
 }});
 const e=await Evidence.create(join(root,`git-${kind}`));await e.rpc('receive','root',JSON.stringify({type:'response',command:'baseline',success:true}));
 let actual:Awaited<ReturnType<typeof observeLibraryChange>>|undefined,error=false;
 try{actual=await observeLibraryChange(e,{storeUrl:baselineServer.url.href,version:'observed-old',cwd,command:['bun',script],timeoutMs:2000});}catch{error=true;}finally{await baselineServer.stop(true);}
 if(premature.some(Boolean))throw Error('Mutation command started before a baseline body completed');
 if(kind==='bad-baseline'){if(!error||await Bun.file(marker).exists())throw Error('Failed owner baseline still started mutation');await record({scenario:'library-baseline-rejected-before-mutation',producerRejected:error,commandStarted:false,trace,liveProductFlow:false});continue;}
 if(kind==='failed'){let parsed=false;try{libraryChange(await Bun.file(join(e.dir,'library-change.json')).json());parsed=true;}catch{}if(!error||parsed)throw Error('Failed edit incorrectly supplies committed observation');await record({scenario:'library-failed-command',exit:7,producerRejected:error,committedParserRejected:!parsed,baselineBodiesBeforeCommand:premature.every(v=>!v),trace,liveProductFlow:false});continue;}
 if(!actual||error)throw Error('Git observation failed');const disk=await Bun.file(join(cwd,'nodes/calc.ts')).text();
 if(actual.beforeHead===actual.afterHead||actual.startedRpcLine!==1||actual.finishedRpcLine!==1)throw Error('Git observation boundaries/HEAD identity incorrect');
 if(kind==='committed'&&actual.afterSource!==source.replace('.times(2)','.times(3)'))throw Error('Committed source not observed');
 if(kind==='unstaged'&&(actual.beforeSource!==actual.afterSource||disk===actual.afterSource))throw Error('Working-tree bytes incorrectly replace committed source');
 for(const ref of Object.values(actual.baseline))if(!await Bun.file(join(e.dir,ref.metadata)).exists())throw Error('Actual baseline metadata ref does not exist');
 await record({scenario:`library-${kind}-source`,beforeHead:actual.beforeHead,afterHead:actual.afterHead,watermarks:[actual.startedRpcLine,actual.finishedRpcLine],committedSourceChanged:actual.beforeSource!==actual.afterSource,workingTreeEqualsCommitted:disk===actual.afterSource,exit:actual.result.code,baselineBodiesBeforeCommand:premature.every(v=>!v),trace,liveProductFlow:false});
}
// Genuine merged mux + installed native omp. Read-only queries and one policy-denied raw reader prompt, no model turn is initiated by the driver.
const binary='/tmp/soroi-e2e-221-mux-build/release/omp-rpc-mux',bearer=crypto.randomUUID(),native=await Evidence.create(join(root,'native'),[bearer]);
const reservation=Bun.serve({hostname:'127.0.0.1',port:0,fetch:()=>new Response('reserved')});const port=reservation.port!;await reservation.stop(true);
const mux=Bun.spawn([binary,'serve','--listen',`127.0.0.1:${port}`],{env:{...process.env,MUX_AUTH_TOKEN:bearer},stdin:'ignore',stdout:'ignore',stderr:'pipe'}),stderr=new Response(mux.stderr).text();
type NativeFrame={fields:Record<string,unknown>;raw:string;line:number};
let writer:LabStandIn|undefined;const readers:{socket:WebSocket;close:()=>Promise<void>;wait:(p:(f:NativeFrame)=>boolean,from?:number)=>Promise<NativeFrame>;frames:NativeFrame[];send:(f:Record<string,unknown>)=>Promise<number>;closed:Promise<{code:number;rpcLine:number}>}[]=[];
async function rawReader(channel:string){const socket=new WebSocket(`ws://127.0.0.1:${port}/agents/native-observer/reader`,{headers:{Authorization:`Bearer ${bearer}`}}),frames:NativeFrame[]=[],listeners=new Set<()=>void>();let chain=Promise.resolve();const ended=Promise.withResolvers<{code:number;rpcLine:number}>();socket.addEventListener('message',ev=>{chain=chain.then(async()=>{const raw=String(ev.data),line=await native.rpc('receive',channel,raw);frames.push({fields:object(JSON.parse(raw)),raw,line});for(const listener of listeners)listener();listeners.clear();});});socket.addEventListener('close',async ev=>{await chain;ended.resolve({code:ev.code,rpcLine:native.rpcWatermark});for(const listener of listeners)listener();listeners.clear();});
 const wait=async(p:(f:NativeFrame)=>boolean,from=0)=>{const deadline=Date.now()+3000;while(true){const f=frames.slice(from).find(p);if(f)return f;if(Date.now()>=deadline)throw Error('raw reader deadline');await new Promise<void>(resolve=>{const wake=()=>{clearTimeout(timer);listeners.delete(wake);resolve();};const timer=setTimeout(wake,deadline-Date.now());listeners.add(wake);});}};
 const client={socket,frames,wait,closed:ended.promise,send:async(f:Record<string,unknown>)=>{const raw=JSON.stringify(f),line=await native.rpc('send',channel,raw);socket.send(raw);return line;},close:async()=>{if(socket.readyState!==WebSocket.CLOSED)socket.close();await ended.promise;}};readers.push(client);await wait(f=>f.fields.type==='mux_welcome');return client;}
try{const deadline=Date.now()+5000;while(true){try{const s=await Bun.connect({hostname:'127.0.0.1',port,socket:{data(){},open(s){s.end();}}});s.end();break;}catch{if(Date.now()>deadline)throw Error('mux startup deadline');await Bun.sleep(25);}}
 writer=await LabStandIn.start({muxUrl:`ws://127.0.0.1:${port}`,bearer,agent:'native-observer',muxBinary:binary,command:['omp','--mode','rpc','--no-extensions','--no-skills','--no-rules','--no-context-files','--no-session','--no-tools','--no-title','--max-time','30'],cwd:root,timeoutMs:10000},native);
 const a=await rawReader('reader-a'),b=await rawReader('reader-b');const begin=writer.frames.length;
 for(const type of ['get_state','get_messages','get_session_stats']){const response=await writer.command(type);await a.wait(f=>f.fields.type==='response'&&f.fields.id===response.fields.id);await b.wait(f=>f.fields.type==='response'&&f.fields.id===response.fields.id);}
 const original=writer.frames.slice(begin).filter(f=>!f.type.startsWith('mux_')).map(f=>f.fields),af=a.frames.filter(f=>!f.fields.type.startsWith('mux_')).map(f=>f.fields),bf=b.frames.filter(f=>!f.fields.type.startsWith('mux_')).map(f=>f.fields);
 if(!isDeepStrictEqual(original,af)||!isDeepStrictEqual(original,bf))throw Error('Actual native stdout broadcast lost or rewrote a frame');
 const beforeState=object((await writer.command('get_state')).fields.data),beforeMessages=(await writer.command('get_messages')).fields.data;
 const p=await rawReader('forbidden-reader'),sendRpcLine=await p.send({type:'prompt',id:'forbidden-probe',message:'THIS RAW READER PROMPT MUST NOT REACH OMP'}),closed=await p.closed;
 await Bun.write(join(native.dir,'reader-close.json'),JSON.stringify({evidenceId:native.evidenceId,channel:'forbidden-reader',sendRpcLine,...closed},null,2));
 const afterState=object((await writer.command('get_state')).fields.data),afterMessages=(await writer.command('get_messages')).fields.data;
 if(closed.code!==1008||!isDeepStrictEqual([beforeState.sessionId,beforeState.messageCount,beforeMessages],[afterState.sessionId,afterState.messageCount,afterMessages])||afterState.isStreaming!==false)throw Error('Forbidden reader prompt was not denied without native mutation');
 if(writer.frames.some(f=>f.type==='agent_start'||(f.type==='message_end'&&object(f.fields.message).role==='user')))throw Error('Reader prompt started native input');
 await record({scenario:'native-mux-reader-broadcast-refusal',nativeStdoutFrames:original.length,readerAEqualsWriter:true,readerBEqualsWriter:true,closeCode:closed.code,session:afterState.sessionId,messageCount:afterState.messageCount,messagesUnchanged:true,isStreaming:afterState.isStreaming,driverPromptForwarded:false,liveF26:'not-run'});
 for(const r of readers)await r.close();await writer.close();writer=undefined;
}finally{for(const r of readers)await r.close().catch(()=>{});if(writer)await writer.forceClose();mux.kill();await mux.exited;await Bun.write(join(root,'mux.stderr'),await stderr);}
await record({scenario:'complete',root,ownedHttpServerStopped:true,ownedHttpActiveBodies:active,nativeReadersClosed:true,nativeWriterDialClosed:true,muxTerminatedAndWaited:true,liveF26F30:'not-run'});
