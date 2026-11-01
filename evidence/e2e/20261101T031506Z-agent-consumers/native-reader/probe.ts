import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { Evidence, object, text } from '/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/evidence.ts';
import { LabStandIn } from '/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/lab-standin.ts';
import { MuxReader } from '/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/reader.ts';
const binary='/tmp/soroi-e2e-221-mux-build/release/omp-rpc-mux';
const root=await mkdtemp('/tmp/soroi-reader-native-'),bearer=crypto.randomUUID();
const evidence=await Evidence.create(join(root,'native'),[bearer]);
const port=Bun.serve({hostname:'127.0.0.1',port:0,fetch:()=>new Response('reservation')});const listen=port.port!;await port.stop(true);
const mux=Bun.spawn([binary,'serve','--listen',`127.0.0.1:${listen}`],{env:{...process.env,MUX_AUTH_TOKEN:bearer},stdin:'ignore',stdout:'ignore',stderr:'pipe'});
const stderr=new Response(mux.stderr).text();
let writer:LabStandIn|undefined,reader:MuxReader|undefined;
try{
 const until=Date.now()+5000;
 while(true){try{const socket=await Bun.connect({hostname:'127.0.0.1',port:listen,socket:{data(){},open(s){s.end();}}});socket.end();break;}catch{if(Date.now()>=until)throw Error('mux startup deadline');await Bun.sleep(25);}}
 writer=await LabStandIn.start({muxUrl:`ws://127.0.0.1:${listen}`,bearer,agent:'native-reader-probe',muxBinary:binary,command:['omp','--mode','rpc','--no-extensions','--no-skills','--no-rules','--no-context-files','--no-session','--no-tools','--no-title','--max-time','30'],cwd:root,timeoutMs:10000},evidence);
 const before=object((await writer.command('get_state')).fields.data);
 reader=await MuxReader.connect({...writer.launch,timeoutMs:500},evidence);
 const state=object((await reader.command('get_state')).fields.data);
 if(text(state.sessionId)!==text(before.sessionId))throw Error('Reader observed a different native session');
 for(const command of ['get_messages','get_messages_page','get_session_stats'] as const){const frame=await reader.command(command);console.log(JSON.stringify({scenario:'native-reader-response',command,id:frame.fields.id,success:frame.fields.success,data:frame.fields.data,modelInvoked:false}));}
 const after=object((await writer.command('get_state')).fields.data);
 if(!isDeepStrictEqual([before.sessionId,before.isStreaming,before.messageCount],[after.sessionId,after.isStreaming,after.messageCount]))throw Error('Read commands changed native session state');
 console.log(JSON.stringify({scenario:'native-readonly-state',before:{sessionId:before.sessionId,isStreaming:before.isStreaming,messageCount:before.messageCount},after:{sessionId:after.sessionId,isStreaming:after.isStreaming,messageCount:after.messageCount},modelInvoked:false}));
 let deadline=false;try{await reader.waitFor(f=>f.type==='soroi_impossible_probe_observation');}catch(e){deadline=e instanceof Error&&e.message==='Reader observation deadline exceeded';}if(!deadline)throw Error('Missing observation did not fail');
 console.log(JSON.stringify({scenario:'native-missing-observation',failure:'deadline',modelInvoked:false}));
 await reader.close();reader=undefined;
 await writer.close();writer=undefined;
 console.log(JSON.stringify({scenario:'native-reader-complete',readerClosed:true,writerAndDialClosed:true,evidence:root,liveF07F19F22:'not-run',modelInvoked:false}));
}finally{await reader?.close();if(writer)await writer.forceClose();mux.kill();await mux.exited;await Bun.write(join(root,'mux.stderr'),await stderr);}
