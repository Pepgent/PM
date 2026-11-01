import { appendFileSync } from "node:fs";
import * as path from "node:path";
import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { AgentRegistry } from "@oh-my-pi/pi-coding-agent/registry/agent-registry";

const home = "/tmp/soroi-197-runtime";
const id = process.env.SOROI_SUBAGENT_ID;
export default function probe(pi: ExtensionAPI) {
	pi.on("before_agent_start", event => {
		if (id?.startsWith("NoReturn197")) {
			return { systemPrompt: ["You are a negative acceptance fixture. You must call no tools. Reply with exactly NO_RETURN_TEXT_197 and end this turn. This deliberately exercises an agent that does not hand back."] };
		}
		if (id?.startsWith("Report197") && event.prompt.includes("PLAIN_RECEIPT_197")) {
			return { systemPrompt: ["You received an IRC wake for a receipt acceptance fixture. Do not call any tools, including soroi_return. Reply with exactly PLAIN_RECEIPT_197 and end this turn."] };
		}
		return undefined;
	});
	pi.on("tool_call", event => {
		if (id === "NoReturn197Final") {
			appendFileSync(`${home}/events.jsonl`, JSON.stringify({ type: "fixture_tool_block", id, tool: event.toolName, pid: process.pid }) + "\n");
			return { block: true, reason: "This receipt acceptance fixture disallows all tool execution. End this turn with plain text PLAIN_ONLY_RECEIPT_197; the supervisor must deliver the IRC wake receipt." };
		}
		return undefined;
	});
	pi.on("session_start", (_event, ctx) => {
		appendFileSync(`${home}/events.jsonl`, JSON.stringify({ type: "start", id: id ?? "root", pid: process.pid, session: ctx.sessionManager.getSessionId(), file: ctx.sessionManager.getSessionFile() }) + "\n");
	});
	pi.on("agent_end", () => {
		appendFileSync(`${home}/events.jsonl`, JSON.stringify({ type: "agent_end", id: id ?? "root", pid: process.pid, at: Date.now() }) + "\n");
	});
	if (id) return;
	pi.registerTool({
		name: "runtime_snapshot", label: "Runtime snapshot", loadMode: "essential",
		description: "Read actual job/registry/output state for the bounded handback acceptance run. Call once after children have settled, with the requested label.",
		parameters: pi.zod.object({ label: pi.zod.string() }),
		async execute(_call, params, _signal, _update, ctx) {
			const root = AgentRegistry.global().get(ctx.agent.id)?.session;
			const manager = root?.asyncJobManager;
			const rows = [];
			for (const ref of AgentRegistry.global().list().filter(ref => ref.kind === "sub")) {
				const job = manager?.getJob(ref.id);
				const output = ref.sessionFile ? path.join(path.dirname(ref.sessionFile), `${ref.id}.md`) : undefined;
				const artifactExists = output ? await Bun.file(output).exists() : false;
				rows.push({ id: ref.id, status: ref.status, lifecycle: ref.lifecycle, sessionFile: ref.sessionFile,
					job: job ? { status: job.status, resultText: job.resultText, errorText: job.errorText } : null,
					artifact: { exists: artifactExists, text: artifactExists && output ? await Bun.file(output).text() : null } });
			}
			const snapshot = { label: params.label, session: ctx.sessionManager.getSessionId(), rows };
			await Bun.write(`${home}/${params.label}.json`, JSON.stringify(snapshot, null, 2));
			return { content: [{ type: "text", text: JSON.stringify(snapshot) }], details: snapshot };
		},
	});
}
