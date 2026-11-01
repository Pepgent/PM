import type { Subprocess } from "bun";
import { Evidence, object, text, type Json } from "./evidence.ts";

export type Frame = { type: string; fields: Record<string, unknown>; line: number };
export type Launch = {
	muxUrl: string; bearer: string; agent: string; muxBinary: string;
	command: string[]; cwd: string; env?: Record<string, string>; timeoutMs: number;
};
type Generation = { kind: "closed" } | { kind: "pending"; id: string } | { kind: "running"; id: string; child: Subprocess };

export class ModelFailure extends Error {}

/** Protocol observations only. The harness never maintains or repairs product state. */
export class LabStandIn {
	readonly frames: Frame[] = [];
	#socket: WebSocket;
	#generation: Generation = { kind: "closed" };
	#error: Error | undefined;
	#notify = new Set<() => void>();
	#receive: Promise<void> = Promise.resolve();
	#stderr: Promise<void> = Promise.resolve();
	#id = 0;
	#closing = false;
	private constructor(readonly launch: Launch, readonly evidence: Evidence) {
		const url = new URL(`/agents/${encodeURIComponent(launch.agent)}/writer`, launch.muxUrl);
		url.protocol = url.protocol === "https:" || url.protocol === "wss:" ? "wss:" : "ws:";
		this.#socket = new WebSocket(url, { headers: { Authorization: `Bearer ${launch.bearer}` } });
		this.#socket.addEventListener("message", event => {
			this.#receive = this.#receive.then(async () => {
				const raw = text(event.data);
				const fields = object(JSON.parse(raw));
				if (fields.type === "mux_generation") this.evidence.addSecret(text(fields.token));
				const line = await this.evidence.rpc("receive", launch.agent, raw);
				this.frames.push({ type: text(fields.type), fields, line });
				this.#wake();
			}).catch(error => { this.#error = error instanceof Error ? error : new Error(String(error)); this.#wake(); });
		});
		this.#socket.addEventListener("close", event => {
			if (!this.#closing) this.#error = new Error(`Writer closed unexpectedly (${event.code})`);
			this.#wake();
		});
		this.#socket.addEventListener("error", () => { this.#error = new Error("Writer connection failed"); this.#wake(); });
	}
	static async start(launch: Launch, evidence: Evidence): Promise<LabStandIn> {
		const driver = new LabStandIn(launch, evidence);
		try {
			await driver.#opened();
			await driver.send({ type: "mux_open_generation" });
			const opened = await driver.waitFor(f => f.type === "mux_generation");
			const generation = text(opened.fields.generation);
			driver.#generation = { kind: "pending", id: generation };
			const child = Bun.spawn([launch.muxBinary, "dial", "--", ...launch.command], {
				cwd: launch.cwd,
				env: { ...process.env, ...launch.env, REMOTE_MUX: launch.muxUrl, SOROI_SUBAGENT_ID: launch.agent,
					MUX_GENERATION: generation, MUX_TOKEN: text(opened.fields.token) },
				stdin: "ignore", stdout: "ignore", stderr: "pipe",
			});
			driver.#generation = { kind: "running", id: generation, child };
			driver.#stderr = new Response(child.stderr).text().then(async stderr => {
				await Bun.write(`${evidence.dir}/dial.stderr`, evidence.redact(stderr));
			});
			const attached = await driver.waitFor(f => f.type === "mux_attached" && f.fields.generation === generation);
			await driver.waitFor(f => f.type === "ready", driver.frames.indexOf(attached) + 1);
			return driver;
		} catch (error) { await driver.forceClose(); throw error; }
	}
	async #opened(): Promise<void> {
		if (this.#socket.readyState === WebSocket.OPEN) return;
		const { promise, resolve, reject } = Promise.withResolvers<void>();
		this.#socket.addEventListener("open", () => resolve(), { once: true });
		this.#socket.addEventListener("error", () => reject(new Error("Cannot open writer")), { once: true });
		this.#socket.addEventListener("close", () => reject(new Error("Writer closed before open")), { once: true });
		await this.#bounded(promise);
	}
	async #bounded<T>(promise: Promise<T>): Promise<T> {
		const timeout = Promise.withResolvers<never>();
		const timer = setTimeout(() => timeout.reject(new Error("RPC lifecycle deadline exceeded")), this.launch.timeoutMs);
		try { return await Promise.race([promise, timeout.promise]); }
		finally { clearTimeout(timer); }
	}
	#wake(): void { for (const notify of this.#notify) notify(); this.#notify.clear(); }
	async waitFor(predicate: (frame: Frame) => boolean, from = 0): Promise<Frame> {
		const deadline = Date.now() + this.launch.timeoutMs;
		while (true) {
			const found = this.frames.slice(from).find(predicate);
			if (found) return found;
			if (this.#error) throw this.#error;
			if (Date.now() >= deadline) throw new Error("RPC frame deadline exceeded");
			const { promise, resolve } = Promise.withResolvers<void>();
			const wake = () => { clearTimeout(timer); this.#notify.delete(wake); resolve(); };
			const timer = setTimeout(wake, deadline - Date.now());
			this.#notify.add(wake);
			await promise;
		}
	}
	async send(frame: { type: string; [key: string]: Json }): Promise<void> {
		if (this.#socket.readyState !== WebSocket.OPEN) throw new Error("Writer is not open");
		const raw = JSON.stringify(frame);
		await this.evidence.rpc("send", this.launch.agent, raw);
		this.#socket.send(raw);
	}
	async command(type: string, payload: { [key: string]: Json } = {}): Promise<Frame> {
		const id = `standin-${++this.#id}`;
		const from = this.frames.length;
		await this.send({ ...payload, type, id });
		const response = await this.waitFor(f => f.type === "response" && f.fields.id === id, from);
		if (response.fields.success !== true) {
			if (type === "set_model") throw new ModelFailure(`Model unavailable: ${String(response.fields.error)}`);
			throw new Error(`RPC ${type} failed: ${String(response.fields.error)}`);
		}
		return response;
	}
	async prompt(message: string): Promise<Frame> {
		const response = await this.command("prompt", { message });
		if (response.fields.data !== undefined && object(response.fields.data).agentInvoked === false) throw new Error("Script prompt did not invoke an agent");
		const result = await this.waitFor(f => f.type === "prompt_result" && f.fields.id === response.fields.id);
		if (result.fields.status === "error") throw new ModelFailure(`Model turn failed: ${JSON.stringify(result.fields.error)}`);
		if (result.fields.status !== "completed") throw new Error(`Prompt ${String(result.fields.status)}`);
		if (result.fields.sessionSettled !== true) await this.waitFor(f => f.type === "session_settled", this.frames.indexOf(result) + 1);
		return result;
	}
	async close(): Promise<void> {
		const generation = this.#generation;
		if (generation.kind === "running") {
			await this.send({ type: "mux_close_stdin", generation: generation.id });
			const exited = await this.waitFor(f => f.type === "mux_exited" && f.fields.generation === generation.id);
			const dialCode = await this.#bounded(generation.child.exited);
			if (exited.fields.code !== 0 || dialCode !== 0) throw new Error(`Generation exited ${String(exited.fields.code)}, dial ${dialCode}`);
			this.#generation = { kind: "closed" };
		}
		await this.#closeWriter();
		await this.#stderr;
	}
	async forceClose(): Promise<void> {
		const generation = this.#generation;
		if (generation.kind === "running") {
			generation.child.kill();
			try { await this.#bounded(generation.child.exited); }
			catch { generation.child.kill("SIGKILL"); await this.#bounded(generation.child.exited); }
		}
		await this.#closeWriter();
		await this.#stderr;
	}
	async #closeWriter(): Promise<void> {
		this.#closing = true;
		if (this.#socket.readyState !== WebSocket.CLOSED) {
			const { promise, resolve } = Promise.withResolvers<void>();
			this.#socket.addEventListener("close", () => resolve(), { once: true });
			this.#socket.close();
			await this.#bounded(promise);
		}
		await this.#receive;
	}
}
