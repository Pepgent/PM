import { readFileSync } from 'node:fs';
import { validateToolArguments } from '@oh-my-pi/pi-ai';
import { toolWireSchema } from '@oh-my-pi/pi-ai/utils/schema/wire';
import { parametersSchema, toolParameters } from '/Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f/packages/omp-soroi/src/eval/params.ts';
import { returnToolDefinition } from '/Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f/packages/omp-soroi/src/contract.ts';
const observations=readFileSync('/tmp/soroi-eval-wire-runtime/observations.jsonl','utf8').trim().split('\n').map(line=>JSON.parse(line));
const registered=observations.findLast(row=>row.kind==='registered_wire_schemas');
if(!registered)throw new Error('No actual root registration observation');
const roots=registered.tools.map((tool:{name:string,parameters:Record<string,unknown>})=>({name:tool.name,type:tool.parameters.type}));
for(const contract of [{kind:'report'} as const,{kind:'capture',shape:{kind:'single',type:'number'}} as const,{kind:'capture',shape:{kind:'fields',fields:{score:'number',file:'file'}}} as const]){
  const definition=returnToolDefinition(contract);
  const wire=toolWireSchema(definition);
  roots.push({name:`${definition.name}:${contract.kind}${contract.kind==='capture'?':'+contract.shape.kind:''}`,type:wire.type});
}
if(roots.some((row:{type:unknown})=>row.type!=='object'))throw new Error('Non-object tool root '+JSON.stringify(roots));
const tool={name:'soroi_eval',description:'',parameters:toolParameters};
const refusals=[];
for(const pins of [{output:11},{},'{"output":11}']){
  const normalized=validateToolArguments(tool,{type:'toolCall',id:'refused267',name:tool.name,arguments:{mode:'formal',code:'const rejected_wire_value=9',pins}});
  const parsed=parametersSchema.safeParse(normalized);
  if(parsed.success)throw new Error('Formal pins reached valid domain');
  refusals.push({pins,normalized,domainAccepted:parsed.success});
}
const normalizedDry=validateToolArguments(tool,{type:'toolCall',id:'dry267',name:tool.name,arguments:{mode:'dry_run',code:'const seed=3',pins:'{"first":11,"second":22}',env:'{"first":"central"}'}});
const dry=parametersSchema.parse(normalizedDry);
console.log(JSON.stringify({roots,refusals,dry},null,2));
