import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export type Segment = "A0" | "S1" | "S2";
export type Env = "L" | "K" | "S" | "P" | "PK" | "PS";
export type Source =
	| { kind: "store"; method: string; path: string }
	| { kind: "mux"; path: string }
	| { kind: "rpc"; agent: string; frame: string }
	| { kind: "remote"; op: "status" | "tail" | "templates"; run?: string }
	| { kind: "komodo"; request: string }
	| { kind: "slurm"; path: string }
	| { kind: "transcript"; file: string; lines: [number, number] }
	| { kind: "labdb"; query: string }
	| { kind: "browser"; screenshot: string; network?: string };
export type Assertion = { id: string; claim: string; source: Source; expected: string; observed: string; pass: boolean };
export type Deviation = { prompt: number; model: string; note: string };
export type Build = { commits: Record<string, string>; release: string; images: Record<string, string>; omp: string; model: string };
export type Verdict = {
	flow: `F${string}`; segment: Segment; env: Env; startedAt: string; endedAt: string;
	build: Build; runs: string[]; agents: string[]; remoteRuns: string[];
	assertions: Assertion[]; deviations: Deviation[];
	result: { kind: "pass" } | { kind: "fail"; failed: string[] };
};

export function object(value: unknown): Record<string, unknown> {
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected an object");
	return value as Record<string, unknown>;
}
export function text(value: unknown): string {
	if (typeof value !== "string") throw new Error("Expected a string");
	return value;
}
export function list(value: unknown): unknown[] {
	if (!Array.isArray(value)) throw new Error("Expected an array");
	return value;
}
export function number(value: unknown): number {
	if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("Expected a finite number");
	return value;
}

/** The evidence directory is new per run: raw responses must never overwrite an earlier campaign. */
export class Evidence {
	#rpcLine = 0;
	#rpcWrites: Promise<void> = Promise.resolve();
	#httpCount = new Map<string, number>();
	#secrets: string[];
	private constructor(readonly dir: string, secrets: string[]) { this.#secrets = secrets.filter(Boolean); }
	static async create(dir: string, secrets: string[] = []): Promise<Evidence> {
		await mkdir(dir, { recursive: false });
		await mkdir(join(dir, "store"));
		return new Evidence(dir, secrets);
	}
	addSecret(secret: string): void { if (secret) this.#secrets.push(secret); }
	redact(raw: string): string {
		for (const secret of this.#secrets) {
			raw = raw.replaceAll(JSON.stringify(secret).slice(1, -1), "[REDACTED]");
			raw = raw.replaceAll(secret, "[REDACTED]");
		}
		return raw;
	}
	async rpc(direction: "send" | "receive", channel: string, raw: string): Promise<number> {
		const line = ++this.#rpcLine;
		const record = JSON.stringify({ at: new Date().toISOString(), direction, channel, raw: this.redact(raw) }) + "\n";
		this.#rpcWrites = this.#rpcWrites.then(() => appendFile(join(this.dir, "rpc.jsonl"), record));
		await this.#rpcWrites;
		return line;
	}
	async http(method: string, path: string, status: number, headers: Headers, raw: string): Promise<void> {
		const name = `${method}-${encodeURIComponent(path)}`;
		const n = (this.#httpCount.get(name) ?? 0) + 1;
		this.#httpCount.set(name, n);
		await Bun.write(join(this.dir, "store", `${name}-${n}.body`), this.redact(raw));
		await Bun.write(join(this.dir, "store", `${name}-${n}.json`), this.redact(JSON.stringify({ method, path, status, headers: [...headers].filter(([key]) => !["set-cookie", "authorization", "proxy-authorization"].includes(key)) }, null, 2)));
	}
	async verdict(verdict: Verdict, command: string): Promise<void> {
		await Bun.write(join(this.dir, "verdict.json"), this.redact(JSON.stringify(verdict, null, 2)) + "\n");
		await Bun.write(join(this.dir, "README.md"), `# ${verdict.flow} ${verdict.segment}\n\nReproduce from the soroi checkout:\n\n\`\`\`sh\n${this.redact(command)}\n\`\`\`\n\nThe build fields identify the tested runtime. Fixture builds are not live F01 evidence.\n`);
	}
}
