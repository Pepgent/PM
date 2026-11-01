import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp } from "node:fs/promises";
import { join } from "node:path";
import { Evidence, object, text, number } from "/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/evidence.ts";
import { StoreClient } from "/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/store.ts";
import { MuxReader } from "/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/standin/reader.ts";
import { RecordedContext, httpRef, type RecordedCampaign } from "/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f/e2e/s1/recorded.ts";

// Fixed-input OWNED TRANSPORT FIXTURE: not a product/model run or live flow verdict.
const root = await mkdtemp("/tmp/soroi-watermark-ownership-");
await cp(import.meta.path, join(root, "probe.ts"));
const bearer = "synthetic-owned-watermark-fixture-bearer-not-a-credential";
const agent = "watermark-fixture-reader";
const path = "/fixture/known-value";
const known = { kind: "owned-transport-fixture", value: 2200 };
const state = { sessionId: "fixture-session", fixtureValue: 2200 };
const generation = "fixture-generation";
const prefix = "r1:";
const timeoutMs = 2000;
const emit = (record: unknown) => console.log(JSON.stringify(record));
const source = await Evidence.create(join(root, "producer"), [bearer]);
const second = await Evidence.create(join(root, "second-producer"), [bearer]);
assert.notEqual(source.evidenceId, second.evidenceId);
const wire: { direction: string; transport: string; raw: string }[] = [];
const lifecycle: string[] = [];
let httpRequests = 0;
let wsConnections = 0;
let wsCommands = 0;
let activeSockets = 0;
const socketClosures: Promise<void>[] = [];
const http = Bun.serve({ hostname: "127.0.0.1", port: 0,
  fetch(request) {
    assert.equal(request.method, "GET");
    assert.equal(new URL(request.url).pathname, path);
    httpRequests++;
    const raw = JSON.stringify(known);
    wire.push({ direction: "receive", transport: "HTTP-server", raw: `GET ${path}` });
    wire.push({ direction: "send", transport: "HTTP-server", raw });
    return new Response(raw, { headers: { "content-type": "application/json", "x-fixture": "non-product" } });
  },
});
const ws = Bun.serve<{ prefix: string; closed: { promise: Promise<void>; resolve: () => void } }>({ hostname: "127.0.0.1", port: 0,
  fetch(request, server) {
    assert.equal(new URL(request.url).pathname, `/agents/${agent}/reader`);
    if (request.headers.get("authorization") !== `Bearer ${bearer}`) return new Response("Unauthorized", { status: 401 });
    const closed = Promise.withResolvers<void>();
    if (server.upgrade(request, { data: { prefix: `r${wsConnections + 1}:`, closed } })) {
      socketClosures.push(closed.promise);
      return undefined;
    }
    return new Response("Upgrade required", { status: 400 });
  },
  websocket: {
    open(socket) {
      wsConnections++;
      activeSockets++;
      const raw = JSON.stringify({ type: "mux_welcome", prefix: socket.data.prefix, generation });
      wire.push({ direction: "send", transport: "WS-server", raw });
      socket.send(raw);
    },
    message(socket, message) {
      const raw = String(message);
      wire.push({ direction: "receive", transport: "WS-server", raw });
      const command = object(JSON.parse(raw));
      assert.equal(command.type, "get_state");
      wsCommands++;
      const response = JSON.stringify({ type: "response", command: "get_state", id: `${socket.data.prefix}${text(command.id)}`, success: true, data: state });
      wire.push({ direction: "send", transport: "WS-server", raw: response });
      socket.send(response);
    },
    close(socket) {
      activeSockets--;
      lifecycle.push(`${socket.data.prefix}ws-server-observed-client-close`);
      socket.data.closed.resolve();
    },
  },
});
lifecycle.push("http-and-ws-servers-started");
const endpoints = { http: http.url.href, ws: ws.url.href };
let reader: MuxReader | undefined;
try {
  for (const [label, producer] of [["first", source], ["second", second]] as const) {
    reader = await MuxReader.connect({ muxUrl: ws.url.href, bearer, agent, timeoutMs }, producer);
    lifecycle.push(`${label}-reader-connected-and-welcome-recorded`);
    const store = new StoreClient(http.url.href, producer, timeoutMs);
    assert.deepEqual(await store.get(path), known);
    lifecycle.push(`${label}-before-http-completed`);
    const result = await reader.command("get_state");
    assert.deepEqual(result.fields.data, state);
    lifecycle.push(`${label}-read-command-result-recorded`);
    assert.deepEqual(await store.get(path), known);
    lifecycle.push(`${label}-after-http-completed`);
    await reader.close();
    await Promise.all(socketClosures);
    lifecycle.push(`${label}-reader-close-completed`);
    reader = undefined;
  }
  assert.equal(httpRequests, 4);
  assert.equal(wsConnections, 2);
  assert.equal(wsCommands, 2);
} finally {
  if (reader) {
    await reader.close();
    lifecycle.push("reader-close-completed");
    await Promise.all(socketClosures);
  }
  await http.stop(true);
  lifecycle.push("http-server-stop-completed");
  await ws.stop(true);
  lifecycle.push("ws-server-stop-completed");
  assert.equal(activeSockets, 0);
  await Bun.write(join(root, "server-wire.jsonl"), wire.map(item => JSON.stringify(item)).join("\n") + "\n");
}
for (const [name, url] of Object.entries(endpoints)) {
  let refused = false;
  try { await fetch(url, { signal: AbortSignal.timeout(timeoutMs) }); }
  catch { refused = true; }
  assert.equal(refused, true, `${name} endpoint must no longer accept connections`);
  lifecycle.push(`${name}-endpoint-connection-refused-after-stop`);
}

// Freeze by completed lifecycle and a separate untouched copy, never by a digest.
const frozen = join(root, "frozen-input");
await cp(source.dir, frozen, { recursive: true });
const secondFrozen = join(root, "second-frozen-input");
await cp(second.dir, secondFrozen, { recursive: true });
lifecycle.push("finished-producer-artifacts-copied-to-frozen-input");
const beforeMeta = `store/GET-${encodeURIComponent(path)}-1.json`;
const afterMeta = `store/GET-${encodeURIComponent(path)}-2.json`;
const beforeBody = beforeMeta.slice(0, -5) + ".body";
const afterBody = afterMeta.slice(0, -5) + ".body";
const before = object(await Bun.file(join(frozen, beforeMeta)).json());
const after = object(await Bun.file(join(frozen, afterMeta)).json());
const rawRpc = await Bun.file(join(frozen, "rpc.jsonl")).text();
const records = rawRpc.trimEnd().split("\n").map((raw, index) => {
  const record = object(JSON.parse(raw));
  return { line: index + 1, direction: text(record.direction), channel: text(record.channel), fields: object(JSON.parse(text(record.raw))) };
});
const sends = records.filter(row => row.direction === "send" && row.channel === agent && row.fields.type === "get_state");
assert.equal(sends.length, 1);
const send = sends[0]!;
const responses = records.filter(row => row.direction === "receive" && row.channel === agent && row.fields.type === "response" && row.fields.id === `${prefix}${text(send.fields.id)}`);
assert.equal(responses.length, 1);
const receive = responses[0]!;
assert.equal(receive.fields.success, true);
assert.deepEqual(receive.fields.data, state);
assert(number(before.responseRpcLine) < send.line);
assert(number(after.requestRpcLine) >= receive.line);
assert.equal(number(before.requestRpcLine), number(before.responseRpcLine));
assert.equal(number(after.requestRpcLine), number(after.responseRpcLine));
const secondBefore = object(await Bun.file(join(secondFrozen, beforeMeta)).json());
const secondAfter = object(await Bun.file(join(secondFrozen, afterMeta)).json());
const secondRawRpc = await Bun.file(join(secondFrozen, "rpc.jsonl")).text();
const secondRows = secondRawRpc.trimEnd().split("\n").map(raw => object(JSON.parse(raw)));
const primaryRows = rawRpc.trimEnd().split("\n").map(raw => object(JSON.parse(raw)));
assert.equal(secondRows.length, records.length);
assert.deepEqual(JSON.parse(text(secondRows[send.line - 1]!.raw)), send.fields);
for (const field of ["requestRpcLine", "responseRpcLine"] as const) {
  assert.equal(secondBefore[field], before[field]);
  assert.equal(secondAfter[field], after[field]);
}
assert(number(secondBefore.responseRpcLine) < send.line);
assert(number(secondAfter.requestRpcLine) >= receive.line);
for (const row of primaryRows) assert.equal(row.evidenceId, source.evidenceId);
for (const row of secondRows) assert.equal(row.evidenceId, second.evidenceId);
assert.equal(before.evidenceId, source.evidenceId);
assert.equal(after.evidenceId, source.evidenceId);
assert.equal(secondBefore.evidenceId, second.evidenceId);
assert.equal(secondAfter.evidenceId, second.evidenceId);
emit({ fixture: "owned-HTTP-WS-causal-watermark", productRun: false, modelRun: false, liveFlowPass: false, root });
emit({ producer: { before: beforeMeta, after: afterMeta, beforeBody, afterBody }, content: known, command: "get_state", commandResponse: receive.fields.data, rawRpcLines: records.length, commandSendLine: send.line, commandResultLine: receive.line });
emit({ assertion: "before.responseRpcLine < causal-command-send", observed: [before.responseRpcLine, send.line], pass: true });
emit({ assertion: "after.requestRpcLine >= causal-command-result", observed: [after.requestRpcLine, receive.line], pass: true });
emit({ assertion: "equal-numeric-watermarks-distinct-producer-namespaces", firstEvidenceId: source.evidenceId, secondEvidenceId: second.evidenceId, before: [before.requestRpcLine, before.responseRpcLine], after: [after.requestRpcLine, after.responseRpcLine], bothNumericallySatisfyFirstBounds: true, pass: true });

const config = (inputDir: string, evidenceDir: string): RecordedCampaign => ({
  inputDir, evidenceDir, a0Verdict: "UNUSED-fixture-no-A0", reproduce: "bun /tmp/soroi-watermark-ownership-probe.ts",
  build: { commits: {}, release: "fixture-not-a-release", images: {}, omp: "fixture-no-product-runtime", model: "fixture-no-model" },
});
const output = await Evidence.create(join(root, "recorded-output"));
assert.notEqual(output.evidenceId, source.evidenceId);
assert.notEqual(output.evidenceId, second.evidenceId);
const context = new RecordedContext(config(frozen, output.dir), output);
await context.loadRpc();
assert.deepEqual(JSON.parse(await context.http(httpRef({ metadata: beforeMeta }), path, { kind: "before", send: send.line })), known);
assert.deepEqual(JSON.parse(await context.http(httpRef({ metadata: afterMeta }), path, { kind: "after", receive: receive.line })), known);
lifecycle.push("recorded-context-consumed-untouched-frozen-input");
emit({ assertion: "RecordedContext-generated-before-and-after-refs", beforeValue: 2200, afterValue: 2200, pass: true });
const secondOutput = await Evidence.create(join(root, "second-recorded-output"));
const secondContext = new RecordedContext(config(secondFrozen, secondOutput.dir), secondOutput);
await secondContext.loadRpc();
assert.deepEqual(JSON.parse(await secondContext.http(httpRef({ metadata: beforeMeta }), path, { kind: "before", send: send.line })), known);
assert.deepEqual(JSON.parse(await secondContext.http(httpRef({ metadata: afterMeta }), path, { kind: "after", receive: receive.line })), known);
emit({ assertion: "both-producer-namespaces-replay-with-independent-output", firstInputId: source.evidenceId, firstOutputId: output.evidenceId, secondInputId: second.evidenceId, secondOutputId: secondOutput.evidenceId, pass: true });

// Every intentional invalid input is retained separately and clearly labelled.
const negative = join(root, "negative-input");
await cp(frozen, negative, { recursive: true });
await mkdir(join(negative, "negative"));
const negativeOutput = await Evidence.create(join(root, "negative-recorded-output"));
const negativeContext = new RecordedContext(config(negative, negativeOutput.dir), negativeOutput);
await negativeContext.loadRpc();
async function rejects(label: string, rawInput: unknown, expected: string, operation: () => unknown | Promise<unknown>) {
  await Bun.write(join(negative, "negative", `${label}.input.json`), JSON.stringify({ label: "DELIBERATE-INVALID-FIXTURE", case: label, input: rawInput }, null, 2) + "\n");
  let observed: string | undefined;
  try { await operation(); } catch (error) { observed = error instanceof Error ? error.message : String(error); }
  assert.equal(observed, expected, label);
  emit({ negative: label, label: "deliberate-invalid-fixture", error: observed, rawInput: `negative-input/negative/${label}.input.json`, pass: true });
}
const stale = { ref: { metadata: beforeMeta }, path, bounds: { kind: "after" as const, receive: receive.line } };
await rejects("old-snapshot-as-after", stale, "The snapshot was not requested after the required RPC result", () => context.http(httpRef(stale.ref), path, stale.bounds));
const override = { metadata: afterMeta, body: afterBody };
await rejects("caller-body-override", override, "HTTP refs name one metadata file; its sibling .body is derived", () => httpRef(override));
const crossPair = { metadata: beforeMeta, body: afterBody };
await rejects("caller-cross-paired-reference", crossPair, "HTTP refs name one metadata file; its sibling .body is derived", () => httpRef(crossPair));
for (const field of ["requestRpcLine", "responseRpcLine", "evidenceId"] as const) {
  const corrupted = { ...after };
  delete corrupted[field];
  const metadata = `negative/missing-${field}.json`;
  await Bun.write(join(negative, metadata), JSON.stringify(corrupted, null, 2) + "\n");
  await Bun.write(join(negative, metadata.slice(0, -5) + ".body"), await Bun.file(join(frozen, afterBody)).text());
  await rejects(`missing-${field}`, { label: "CORRUPTED-generated-after-metadata", removedField: field, ref: { metadata }, metadata: corrupted, path, bounds: { kind: "after", receive: receive.line } }, field === "evidenceId" ? "HTTP metadata belongs to another recorded Evidence namespace" : "Expected a finite number", () => negativeContext.http(httpRef({ metadata }), path, { kind: "after", receive: receive.line }));
}
// Untouched producer-B pairs, intentionally mixed into producer-A input namespace.
await cp(secondFrozen, join(negative, "second-owner-artifacts"), { recursive: true });
for (const [label, metadata, bounds] of [
  ["foreign-HTTP-before", beforeMeta, { kind: "before" as const, send: send.line }],
  ["foreign-HTTP-after", afterMeta, { kind: "after" as const, receive: receive.line }],
] as const) {
  const ref = { metadata: `second-owner-artifacts/${metadata}` };
  await rejects(label, { label: "INVALID-CROSS-NAMESPACE-REFERENCE", ref, path, bounds, expectedNamespace: source.evidenceId, actualNamespace: second.evidenceId }, "HTTP metadata belongs to another recorded Evidence namespace", () => negativeContext.http(httpRef(ref), path, bounds));
}
for (const kind of ["mixed-owner-RPC-row", "missing-RPC-evidenceId"] as const) {
  const input = join(root, `${kind}-negative-input`);
  await cp(frozen, input, { recursive: true });
  const rows = primaryRows.map(row => ({ ...row }));
  if (kind === "mixed-owner-RPC-row") rows[send.line - 1] = secondRows[send.line - 1]!;
  else delete rows[send.line - 1]!.evidenceId;
  const invalidRaw = rows.map(row => JSON.stringify(row)).join("\n") + "\n";
  await Bun.write(join(input, "rpc.jsonl"), invalidRaw);
  const replayOutput = await Evidence.create(join(root, `${kind}-negative-output`));
  const replay = new RecordedContext(config(input, replayOutput.dir), replayOutput);
  await rejects(kind, { label: "DELIBERATELY-CORRUPTED-RPC-LEDGER", inputDir: input, modifiedRawline: send.line, rpcRaw: invalidRaw }, kind === "mixed-owner-RPC-row" ? "RPC rows do not share one recorded Evidence namespace" : "Expected a string", () => replay.loadRpc());
}
// A valid begin generated by producer A may not be completed through producer B.
const foreignBegin = source.beginHttp("GET", "/fixture/foreign-begin");
const forbiddenBase = join(second.dir, "store", `GET-${encodeURIComponent(foreignBegin.path)}-1`);
assert.equal(await Bun.file(`${forbiddenBase}.json`).exists(), false);
assert.equal(await Bun.file(`${forbiddenBase}.body`).exists(), false);
await rejects("producer-foreign-begin-observation", { label: "INVALID-CROSS-OWNER-COMPLETION", beginObservation: foreignBegin, completionEvidenceId: second.evidenceId, status: 200, headers: [["content-type", "application/json"]], rawBody: JSON.stringify(known) }, "HTTP observation belongs to another Evidence instance", () => second.http(foreignBegin, 200, new Headers({ "content-type": "application/json" }), JSON.stringify(known)));
assert.equal(await Bun.file(`${forbiddenBase}.json`).exists(), false);
assert.equal(await Bun.file(`${forbiddenBase}.body`).exists(), false);
emit({ assertion: "foreign-begin-rejected-before-persistence", metadataCreated: false, bodyCreated: false, pass: true });
await Bun.write(join(root, "lifecycle.json"), JSON.stringify({ label: "fixture-only", endpoints, activeSockets, httpRequests, wsConnections, wsCommands, events: lifecycle }, null, 2) + "\n");
emit({ assertion: "lifecycle-cleanup", activeSockets, httpRequests, wsConnections, wsCommands, events: lifecycle, pass: true });
emit({ result: "PASS-owned-IO-fixture-only", productOrModelProcessStarted: false });
process.on("exit", code => emit({ assertion: "probe-process-exit", code, pass: code === 0 }));
