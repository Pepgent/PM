import { LabStandIn } from "./lab-standin.ts";
import { Evidence, object, text } from "./evidence.ts";

const bearer = (await Bun.file("/run/secrets/mux-auth-token").text()).trim();
const gateway = (await Bun.file("/run/secrets/gateway-client-token").text()).trim();
process.env.PEPGENT_GATEWAY_TOKEN = gateway;
const muxUrl = process.env.SOROI_MUX_URL;
if (!muxUrl) throw new Error("SOROI_MUX_URL is required");
const agent = `Dist03RPC-${Date.now()}`;
const evidence = await Evidence.create(`/tmp/${agent}`, [bearer, gateway]);
const driver = await LabStandIn.start({
	muxUrl, bearer, agent, muxBinary: "omp-rpc-mux", cwd: "/work", timeoutMs: 30000,
	command: ["/home/agent/.local/bin/soroi", "--mode", "rpc", "--no-ui", "--no-context-files", "--no-lsp",
		"--model", "opencode-go/deepseek-v4.1-flash", "--config", "/run/config/startup.yml", "--session-dir", "/tmp/dist03-rpc-sessions"],
}, evidence);
try {
	const state = await driver.command("get_state");
	const session = object(state.fields.data);
	const sessionId = text(session.sessionId);
	await driver.close();
	console.log(JSON.stringify({ plane: "mux", agent, muxUrl, sessionId,
		frames: driver.frames.filter(frame => ["mux_generation", "mux_attached", "ready", "response", "mux_exited"].includes(frame.type)).map(frame => ({ type: frame.type, ...(frame.type === "mux_exited" ? { code: frame.fields.code } : {}) })),
		evidence: evidence.dir }));
} catch (error) {
	await driver.forceClose();
	throw error;
}
