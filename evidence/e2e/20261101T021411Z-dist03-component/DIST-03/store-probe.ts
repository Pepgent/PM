import assert from "node:assert/strict";
import { realpath } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Value } from "/tmp/soroi-standalone-210/packages/store/src/contract.ts";
import type * as StoreContract from "/tmp/soroi-standalone-210/packages/store/src/contract.ts";

const packageRoot = await realpath("/home/agent/.omp/plugins/node_modules/omp-soroi");
// The installed content-addressed root is selected by omp's runtime plugin registry.
const contract: typeof StoreContract = await import(pathToFileURL(path.resolve(packageRoot, "../store/src/contract.ts")).href);
const base = process.env.SOROI_STORE_URL;
if (!base) throw new Error("SOROI_STORE_URL is required");
const indexFile = "/tmp/dist03-run.json";

function object(value: unknown): Record<string, unknown> {
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected response object");
	return value as Record<string, unknown>;
}
async function request(method: "GET" | "POST", route: string, body?: unknown): Promise<unknown> {
	const response = await fetch(new URL(route, base), {
		method,
		...(body === undefined ? {} : { headers: { "content-type": "application/json" }, body: JSON.stringify(body) }),
	});
	const value: unknown = await response.json();
	if (!response.ok) throw new Error(`${method} ${route}: ${response.status} ${JSON.stringify(value)}`);
	return value;
}
interface RunIndex { run: string; session: string }
function runIndex(value: unknown): RunIndex {
	const row = object(value);
	if (typeof row.session !== "string") throw new Error("Invalid probe session");
	return { run: contract.IdSchema.parse(row.run), session: row.session };
}
interface Atom { name: string; value: Value; origin: string }
async function state(run: string): Promise<{ unconsumed: Atom[] }> {
	const result = object(await request("GET", `/runs/${run}/state`));
	if (!Array.isArray(result.unconsumed)) throw new Error("Invalid state response");
	return { unconsumed: result.unconsumed.map((entry: unknown): Atom => {
		const row = object(entry);
		if (typeof row.name !== "string" || typeof row.origin !== "string") throw new Error("Invalid atom response");
		return { name: row.name, value: contract.ValueSchema.parse(row.value), origin: row.origin };
	}) };
}
async function transfer(evalCall: string): Promise<string> {
	return contract.IdSchema.parse(object(await request("POST", "/transfers", contract.TransferSchema.parse({ kind: "EvalTransfer", evalCall }))).transfer);
}
const expected = { unconsumed: [{ name: "dist03_value", value: { kind: "scalar", scalar: { kind: "number", v: 42 } }, origin: "literal" }] };
const mode = process.argv[2];
switch (mode) {
	case "write": {
		const session = `dist03-compose-${Date.now()}`;
		const body = contract.StepSchema.parse({ run: { kind: "open", session }, session,
			code: "const dist03_value = 42", transfer: await transfer(session),
			roots: [{ name: "dist03_value", value: { kind: "scalar", scalar: { kind: "number", v: 42 } } }], calls: [], stops: [], versions: [] });
		const committed = object(await request("POST", "/runs/steps", body));
		const index = { run: contract.IdSchema.parse(committed.run), session };
		await Bun.write(indexFile, JSON.stringify(index));
		const observed = await state(index.run);
		assert.deepEqual(observed, expected);
		console.log(JSON.stringify({ plane: "store", stage: "committed-and-read", url: base, run: index.run, seq: committed.seq, observed }));
		break;
	}
	case "read": {
		const index = runIndex(await Bun.file(indexFile).json());
		const observed = await state(index.run);
		assert.deepEqual(observed, expected);
		console.log(JSON.stringify({ plane: "store", stage: "read-after-store-recreation", url: base, run: index.run, observed }));
		break;
	}
	case "finish": {
		const index = runIndex(await Bun.file(indexFile).json());
		await request("POST", "/runs/steps", contract.StepSchema.parse({ run: { kind: "existing", run: index.run }, session: index.session,
			code: "stop(dist03_value)", transfer: await transfer(`${index.session}-stop`), roots: [], calls: [], stops: ["dist03_value"], versions: [] }));
		const ended = object(await request("POST", `/runs/${index.run}/end`));
		assert.equal(ended.kind, "Ended");
		console.log(JSON.stringify({ plane: "store", stage: "ended", run: index.run, result: ended }));
		break;
	}
	default:
		throw new Error("Usage: probe.ts write|read|finish");
}
