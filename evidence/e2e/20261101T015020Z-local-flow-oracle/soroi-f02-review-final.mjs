import { isDeepStrictEqual } from 'node:util';
import { f02 } from '/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/s1/f02.spec.ts';
import { FlowContext, ScriptDeviation } from '/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/s1/scenario.ts';
import { ModelFailure } from '/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/lab-standin.ts';
const rpc = line => ({kind:'rpc',agent:'fixture',frame:String(line)});
const formal = (code,id,end=false) => ({input:{mode:'formal',code},outcome:{kind:'formal',runId:'run',runStarted:false,runEnded:end,calls:[]},toolCallId:id,invocationLine:1,resultLine:2});
function base() {
 const assertions=[];
 return {assertions, config:{reminder:{customType:'fixture'}},session:'root',rpc,
 check(id,claim,source,expected,observed){assertions.push({id,pass:isDeepStrictEqual(expected,observed),expected,observed});},
 async call(){return {...formal('const f02_seed = 21','seed'),outcome:{kind:'formal',runId:'run',runStarted:true,runEnded:false,calls:[]}};},
 async atoms(){return [{name:'f02_seed'}];},async reminders(){return {records:[],source:rpc(3)};}};
}
const failure=base();
failure.continuation=async()=>[{...formal('stop(f02_seed)','bad'),outcome:{kind:'tool_error',message:'fixture execution failure'}}];
let error;
try {await f02(failure);}catch(e){error=e;}
if (!error || error instanceof ScriptDeviation || !failure.assertions.some(a=>a.id==='continuation-outcome-0'&&!a.pass)) throw Error('Valid formal execution failure was retriable or lost');
console.log(JSON.stringify({scenario:'valid-formal-tool-failure-is-nonretriable',liveFlow:false,errorType:error.constructor.name,failed:failure.assertions.filter(a=>!a.pass).map(a=>a.id)}));
for (const reverse of [false,true]) {
 const mixed=base(),bad={...formal('stop(f02_seed)','bad'),outcome:{kind:'tool_error',message:'fixture failure'}},dry={...formal('const x = 1','dry'),input:{mode:'dry_run',code:'const x = 1'},outcome:{kind:'dry_run',calls:[]}};
 mixed.continuation=async()=>reverse?[dry,bad]:[bad,dry];
 let caught;try{await f02(mixed);}catch(e){caught=e;}
 if(!caught||caught instanceof ScriptDeviation||!mixed.assertions.some(a=>!a.pass))throw Error('Mixed-mode deviation hid product failure');
 console.log(JSON.stringify({scenario:'mixed-mode-cannot-hide-formal-failure',reverse,liveFlow:false,errorType:caught.constructor.name,failed:mixed.assertions.filter(a=>!a.pass).map(a=>a.id)}));
}
const grouped=base();
grouped.continuation=async()=>[formal('const next = calc(f02_seed)','a'),formal('stop(next)','b',true)];
const graph=(at,names,state='Open')=>({run:'run',holder:'root',derivedFrom:null,state,at,nodes:[],edges:[],unconsumed:names});
grouped.readGraph=async(_run,at)=>at===3?graph(3,['f02_seed']):at===5?graph(5,['next']):graph(7,[],'Ended');
grouped.events=async()=>[{kind:'step_committed',seq:2,step:{session:'root',code:'const f02_seed = 21'}},{kind:'step_committed',seq:4,step:{session:'root',code:'const next = calc(f02_seed)'}},{kind:'step_committed',seq:6,step:{session:'root',code:'stop(next)'}},{kind:'run_ended',seq:7}];
let snapshots=0;
grouped.reminders=async()=>({source:rpc(3),records:snapshots++===0?[]:[{entryId:'request',requestOrdinal:1,line:3,text:'  - f02_seed = 21 ← root() @central',toolCalls:['a','b']}]});
grouped.recording={exchanges:[{method:'POST',path:'/runs/run/end',status:200,response:JSON.stringify({kind:'Ended',seq:7})}]};
await f02(grouped);
const failures=grouped.assertions.filter(a=>!a.pass);
if(failures.length)throw Error(JSON.stringify(failures));
if(grouped.assertions.filter(a=>a.id.startsWith('reminder-set-')).length!==1)throw Error('Request reminder was compared more than once');
console.log(JSON.stringify({scenario:'two-tool-calls-share-pre-request-state',liveFlow:false,assertions:grouped.assertions.length,reminderComparisons:1,failed:failures}));
for (const disruption of ['other-tool','malformed-eval','provider-failure']) {
 const boundary=base(),frames=[];
 boundary.driver={frames,async prompt(){
  frames.push({type:'message_end',line:1,fields:{message:{role:'assistant',content:[{type:'toolCall',id:'bad',name:'soroi_eval',arguments:{mode:'formal',code:'stop(f02_seed)'}}]}}},{type:'tool_execution_end',line:2,fields:{toolCallId:'bad',isError:true,result:{details:{},content:[{type:'text',text:'fixture failure'}]}}});
  if(disruption==='provider-failure')throw new ModelFailure('fixture provider failure');
  frames.push({type:'message_end',line:3,fields:{message:{role:'assistant',content:[{type:'toolCall',id:'extra',name:disruption==='other-tool'?'bash':'soroi_eval',arguments:{mode:'wrong',code:'ignored'}}]}}});
  if(disruption==='malformed-eval')frames.push({type:'tool_execution_end',line:4,fields:{toolCallId:'extra',isError:true,result:{details:{isError:true,error:'fixture schema failure'},content:[{type:'text',text:'fixture schema failure'}]}}});
 }};
 let caught;try{await FlowContext.prototype.continuation.call(boundary,'fixture');}catch(e){caught=e;}
 if(!caught||caught instanceof ScriptDeviation||caught instanceof ModelFailure||!boundary.assertions.some(a=>!a.pass))throw Error(`Earlier formal failure lost to ${disruption}`);
 console.log(JSON.stringify({scenario:'continuation-boundary-retains-formal-failure',disruption,liveFlow:false,errorType:caught.constructor.name,failed:boundary.assertions.filter(a=>!a.pass).map(a=>a.id)}));
}
for (const rejection of ['check_error','schema_error']) {
 const boundary=base(),frames=[];
 boundary.driver={frames,async prompt(){
  frames.push({type:'message_end',line:1,fields:{message:{role:'assistant',content:[{type:'toolCall',id:'invalid',name:'soroi_eval',arguments:{mode:'formal',code:'const bad = calc(7)'}}]}}},{type:'tool_execution_end',line:2,fields:{toolCallId:'invalid',isError:true,result:{details:rejection==='check_error'?{ok:false,errors:[{kind:'statement_form',at:0}]}:{isError:true,error:'fixture schema failure'},content:[{type:'text',text:'fixture rejected input'}]}}});
 }};
 let caught;try{await FlowContext.prototype.continuation.call(boundary,'fixture');}catch(e){caught=e;}
 if(!(caught instanceof ScriptDeviation)||boundary.assertions.some(a=>!a.pass))throw Error('Rejected model-authored input became a product failure');
 console.log(JSON.stringify({scenario:'rejected-model-input-remains-deviation',rejection,liveFlow:false,errorType:caught.constructor.name,failed:[]}));
}
