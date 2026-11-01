import { appendFileSync } from "node:fs";
import { AgentRegistry } from "@oh-my-pi/pi-coding-agent/registry/agent-registry";
import { cfgPersonality } from "@oh-my-pi/pi-coding-agent/session/settings";
import { cfgTaskAgentIdleTtlMs } from "@oh-my-pi/pi-coding-agent/task/settings";
import { cfgToolsApprovalMode } from "@oh-my-pi/pi-coding-agent/tools/settings";
const record = (data: unknown) => appendFileSync("/probe/out/runtime.jsonl", JSON.stringify({at:Date.now(),pid:process.pid,role:process.env.SOROI_ROLE??"Main",...data})+"\n");
export default function observe(pi) {
 pi.on("session_start", () => {
  const s=AgentRegistry.global().get("Main")!.session!.settings;
  record({kind:"settings",personality:cfgPersonality.get(s),approval:cfgToolsApprovalMode.get(s),ttl:cfgTaskAgentIdleTtlMs.get(s)});
  AgentRegistry.global().onChange(e => record({kind:"registry",event:e.type,agents:AgentRegistry.global().list().map(a=>({id:a.id,status:a.status,attached:!!a.session,sessionFile:a.sessionFile}))}));
 });
 pi.on("before_agent_start", (_e,ctx) => record({kind:"prompt",prompt:ctx.getSystemPrompt()}));
}
