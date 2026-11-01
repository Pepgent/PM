import { readFileSync } from 'node:fs';
import { MuxWriter, muxConfiguration } from '/Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f/packages/omp-soroi/src/subagent/main/mux-writer.ts';
const configuration=muxConfiguration({...process.env,SOROI_MUX_URL:'ws://127.0.0.1:18464',MUX_AUTH_TOKEN:readFileSync('/Users/mouriya/Ext/work/orbstack/pepgent-mux/token','utf8').trimEnd()});
const env=Object.fromEntries(Object.entries({...process.env,PATH:'/tmp/omp-mux-main-1f7f9ff:'+process.env.PATH,PI_CODING_AGENT_DIR:'/tmp/soroi-185-runtime/agent'}).filter((entry):entry is [string,string]=>entry[1]!==undefined));
const timeline:unknown[]=[];
const called=Promise.withResolvers<void>();
const writer=new MuxWriter('HostCancel196',configuration,()=>{throw new Error('Unexpected human frame');});
const {generation}=await writer.start({argv:['omp','--mode','rpc','--no-extensions','--no-context-files','--model','opencode-go/deepseek-v4.1-flash','--session-dir','/tmp/soroi-196-runtime/host-cancel-sessions'],cwd:'/tmp/soroi-196-runtime',env,handlers:{
  onEvent(frame){if(frame.type==='tool_execution_start')timeline.push({kind:frame.type,toolName:frame.toolName});},
  onEnd(end){timeline.push({kind:'source-end',end});},
  async onHostToolCall(){throw new Error('Unexpected host tool');},
  async onHostRead(url,signal){
    timeline.push({kind:'host-read-started',url});
    signal.addEventListener('abort',()=>timeline.push({kind:'host-signal-aborted'}),{once:true});
    called.resolve();
    // Deliberately unresponsive external operation: cancellation must end the response obligation without its result.
    return new Promise<never>(()=>{});
  }
}});
await generation.command({type:'set_host_uri_schemes',schemes:[{scheme:'soroi-cancel196',description:'Bounded cancellation acceptance resource'}]});
await generation.command({type:'prompt',message:'Cancellation acceptance only: use read exactly once on soroi-cancel196://resource. Do not use other tools or produce a response until the read resolves.'});
await called.promise;
timeline.push({kind:'owner-close-started'});
await writer.close();
timeline.push({kind:'owner-close-finished',closed:writer.isClosed});
if(!timeline.some(row=>typeof row==='object'&&row!==null&&'kind'in row&&row.kind==='host-signal-aborted'))throw new Error('Host request signal was not aborted');
console.log(JSON.stringify(timeline,null,2));
