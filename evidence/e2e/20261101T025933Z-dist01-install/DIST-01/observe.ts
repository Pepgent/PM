import { appendFileSync } from "node:fs";
import { AgentRegistry } from "@oh-my-pi/pi-coding-agent/registry/agent-registry";
import { discoverAgents } from "@oh-my-pi/pi-coding-agent/task/discovery";
import { cfgPersonality } from "@oh-my-pi/pi-coding-agent/session/settings";
import { cfgTaskAgentIdleTtlMs } from "@oh-my-pi/pi-coding-agent/task/settings";
import { cfgToolsApprovalMode } from "@oh-my-pi/pi-coding-agent/tools/settings";
function save(data: unknown) { appendFileSync("/probe/out/runtime.jsonl", JSON.stringify(data)+"\n"); }
export default function observe(pi) {
 const snapshot = () => {
  const settings = AgentRegistry.global().get("Main").session.settings;
  return {role:process.env.SOROI_ROLE??"Main",pid:process.pid,personality:cfgPersonality.get(settings),personalitySource:settings.getProvenance(cfgPersonality),approval:cfgToolsApprovalMode.get(settings),ttl:cfgTaskAgentIdleTtlMs.get(settings)};
 };
 pi.on("session_start",(_e,ctx)=>{save({kind:"settings",...snapshot()});});
 pi.on("before_agent_start",(_e,ctx)=>{save({kind:"prompt",role:process.env.SOROI_ROLE??"Main",prompt:ctx.getSystemPrompt()});});
 pi.registerCommand("release-inventory",{description:"Read native installed release discovery and effective settings",handler:async(_args,ctx)=>{
  const result = await discoverAgents(ctx.cwd);
  const inventory={kind:"inventory",...snapshot(),tools:pi.getActiveTools(),agents:result.agents.filter(a=>a.name.startsWith("soroi-")).map(a=>({name:a.name,filePath:a.filePath}))};
  save(inventory);ctx.ui.notify(JSON.stringify(inventory),"info");
 }});
}
