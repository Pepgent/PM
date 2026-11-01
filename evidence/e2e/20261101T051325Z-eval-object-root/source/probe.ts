import { appendFileSync } from 'node:fs';
import type { ExtensionAPI } from '@oh-my-pi/pi-coding-agent';
import { toolWireSchema } from '@oh-my-pi/pi-ai/utils/schema/wire';
import { RunGraphSchema, RunSummariesSchema } from '/Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f/packages/store/src/contract.ts';
const home='/tmp/soroi-eval-wire-runtime';
const record=(value:unknown)=>appendFileSync(`${home}/observations.jsonl`,JSON.stringify(value)+'\n');
export default function probe(pi:ExtensionAPI){
  pi.on('session_start',(_event,ctx)=>record({kind:'session_start',session:ctx.sessionManager.getSessionId(),file:ctx.sessionManager.getSessionFile(),pid:process.pid}));
  pi.on('before_agent_start',()=>{
    record({kind:'registered_wire_schemas',tools:pi.getAllTools().filter(tool=>tool.name.startsWith('soroi')).map(tool=>({name:tool.name,parameters:toolWireSchema(tool)}))});
  });
  pi.on('tool_call',event=>{if(event.toolName==='soroi_eval')record({kind:'tool_call',event});});
  pi.on('tool_result',event=>{if(event.toolName==='soroi_eval')record({kind:'tool_result',event});});
  pi.registerTool({name:'wire_snapshot',label:'Wire snapshot',description:'Read the real store runs/graphs for this root session without changing them.',loadMode:'essential',parameters:pi.zod.object({label:pi.zod.string()}),
    async execute(_id,params,_signal,_update,ctx){
      const base=process.env.SOROI_STORE_URL;
      if(!base)throw new Error('Runtime observation requires SOROI_STORE_URL');
      const response=await fetch(new URL('runs',base));
      if(!response.ok)throw new Error(`runs HTTP ${response.status}`);
      const runs=RunSummariesSchema.parse(await response.json()).filter(run=>run.holder===ctx.sessionManager.getSessionId());
      const graphs=await Promise.all(runs.map(async run=>{
        const graph=await fetch(new URL(`runs/${run.run}/graph`,base));
        if(!graph.ok)throw new Error(`graph HTTP ${graph.status}`);
        return RunGraphSchema.parse(await graph.json());
      }));
      const snapshot={label:params.label,session:ctx.sessionManager.getSessionId(),runs,graphs};
      await Bun.write(`${home}/${params.label}.json`,JSON.stringify(snapshot,null,2));
      return{content:[{type:'text',text:JSON.stringify(snapshot)}],details:snapshot};
    }
  });
}
