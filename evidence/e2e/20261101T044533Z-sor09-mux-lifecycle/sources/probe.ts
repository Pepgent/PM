import { appendFileSync } from "node:fs";
import * as path from "node:path";
import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { AgentRegistry } from "@oh-my-pi/pi-coding-agent/registry/agent-registry";

const home = "/tmp/soroi-196-runtime";
const id = process.env.SOROI_SUBAGENT_ID;
const eventId = id ?? "root";

async function muxAgents(): Promise<unknown> {
	const bearer = process.env.MUX_AUTH_TOKEN;
	const configured = process.env.SOROI_MUX_URL;
	if (!bearer || !configured) return null;
	try {
		const url = new URL(configured);
		url.protocol = url.protocol === "wss:" ? "https:" : "http:";
		url.pathname = "/agents";
		url.search = "";
		url.hash = "";
		const response = await fetch(url, { headers: { Authorization: `Bearer ${bearer}` } });
		const body = await response.text();
		let agents: unknown = null;
		try {
			agents = JSON.parse(body);
		} catch {
			agents = { unparsed: true };
		}
		return { status: response.status, ok: response.ok, agents };
	} catch (error) {
		return { error: error instanceof Error ? error.message : String(error) };
	}
}

export default function probe(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		appendFileSync(
			`${home}/events.jsonl`,
			JSON.stringify({
				type: "session_start",
				id: eventId,
				sessionId: ctx.sessionManager.getSessionId(),
				pid: process.pid,
				file: ctx.sessionManager.getSessionFile(),
				staticBearerPresent: Boolean(process.env.MUX_AUTH_TOKEN),
				generationPresent: Boolean(process.env.MUX_GENERATION),
				generationTokenPresent: Boolean(process.env.MUX_TOKEN),
			}) + "\n",
		);
	});
	pi.on("agent_end", () => {
		appendFileSync(`${home}/events.jsonl`, JSON.stringify({ type: "agent_end", id: eventId, pid: process.pid, at: Date.now() }) + "\n");
	});
	if (id) return;
	pi.registerTool({
		name: "runtime_snapshot",
		label: "Runtime snapshot",
		loadMode: "essential",
		description: "Read actual registry, process, job, artifact, and Mux state for the bounded SOR09 runtime run.",
		parameters: pi.zod.object({ label: pi.zod.string() }),
		async execute(_call, params, _signal, _update, ctx) {
			const registry = AgentRegistry.global();
			const root = registry.get(ctx.agent.id)?.session;
			const manager = root?.asyncJobManager;
			const rows = [];
			for (const ref of registry.list().filter(ref => ref.kind === "sub")) {
				const session = ref.session;
				let sourceProcess: unknown = null;
				if (session && typeof session === "object" && "process" in session) {
					sourceProcess = session.process ?? null;
				}
				const job = manager?.getJob(ref.id);
				const artifactPath = ref.sessionFile ? path.join(path.dirname(ref.sessionFile), `${ref.id}.md`) : undefined;
				const artifactExists = artifactPath ? await Bun.file(artifactPath).exists() : false;
				rows.push({
					id: ref.id,
					status: ref.status,
					lifecycle: ref.lifecycle,
					sessionFile: ref.sessionFile,
					process: sourceProcess,
					job: job ? { status: job.status, resultText: job.resultText, errorText: job.errorText } : null,
					artifact: {
						exists: artifactExists,
						text: artifactExists && artifactPath ? await Bun.file(artifactPath).text() : null,
					},
				});
			}
			const snapshot = {
				label: params.label,
				session: ctx.sessionManager.getSessionId(),
				rows,
				mux: await muxAgents(),
			};
			await Bun.write(`${home}/${params.label}.json`, JSON.stringify(snapshot, null, 2));
			return { content: [{ type: "text", text: JSON.stringify(snapshot) }], details: snapshot };
		},
	});
}
