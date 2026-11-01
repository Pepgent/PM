# F01 LabStandIn fixture evidence — not live F01 acceptance

## Scope and provenance

This archive records the delivered LabStandIn harness smoke campaign for [E2E-01](https://github.com/Pepgent/soroi/issues/181). It uses the published **omp-rpc-mux v0.1.0** binary with a **fake HTTP store and deterministic fake child**. It does not exercise the real product store, installed soroi release, model gateway or live F01 deployment. Smoke exit 0 means the harness observed the expected positive and negative fixture outcomes; it does **not** mean the F01 product Verdict passed.

- Tested soroi source commit for the final smoke and strict check, supplied with the completed runtime evidence: [`c6612872eec27d172be98940ab494785c27b5d74`](https://github.com/Pepgent/soroi/commit/c6612872eec27d172be98940ab494785c27b5d74).
- Runtime binary: published omp-rpc-mux v0.1.0, used locally at `/tmp/soroi-e2e-181-bin/omp-rpc-mux`.
- Fixture source directory: `/tmp/soroi-standin-smoke-gEGsXB/`; recorded fixture timestamps are 2026-11-01 00:43:41–00:43:42 UTC. The campaign directory name is the archive identifier, not a replacement for those timestamps.
- Startup proof source directory: `/tmp/soroi-startup-proof-UbOcLL/`; recorded RPC timestamps are 2026-11-01 00:42:34–00:42:36 UTC. This proof ran against the preceding source revision [`6c3169b7a6573f6d1dfb7dda5323447bce40d4c3`](https://github.com/Pepgent/soroi/commit/6c3169b7a6573f6d1dfb7dda5323447bce40d4c3). The runtime operator confirmed that the final revision only strengthened the smoke assertion to decode nested JSON and check `mux_generation.token === "[REDACTED]"`; harness runtime code did not change, so this startup proof remains applicable.

The source commit and binary release identify the harness/runtime used to produce this archive. They are not substitute product provenance. All original fixture `verdict.json` build fields remain unchanged: soroi commit, release and omp are `fixture`, model is `fixture/deterministic`, and images are empty. The copied `a0-verdict.json` files are fixture evidence, not proof that an actual distribution passed A0.

## Original evidence locations

All original file bytes are preserved except this root README, which replaces the generated fixture README with archival context. Negative-case READMEs are preserved unchanged.

| Source | Archive location | Contents |
|---|---|---|
| `fixture-valid/` | [F01 root](./) | [verdict.json](verdict.json), [rpc.jsonl](rpc.jsonl), [store/](store/), [a0-verdict.json](a0-verdict.json), [dial.stderr](dial.stderr) |
| `fixture-wrong-root/` | [negatives/wrong-root/](negatives/wrong-root/) | Original verdict, RPC, HTTP/SSE request/response evidence, A0 fixture, stderr and README |
| `fixture-deviation/` | [negatives/deviation/](negatives/deviation/) | Original verdict, RPC, HTTP/SSE request/response evidence, A0 fixture, stderr and README |
| `/tmp/soroi-startup-proof-UbOcLL/` | [negatives/startup/](negatives/startup/) | [observation.json](negatives/startup/observation.json), [failed/rpc.jsonl](negatives/startup/failed/rpc.jsonl), [reused/rpc.jsonl](negatives/startup/reused/rpc.jsonl), and original stderr files |
| `/tmp/soroi-e2e-181-startup.ts` | [negatives/startup/soroi-e2e-181-startup.ts](negatives/startup/soroi-e2e-181-startup.ts) | Unmodified standalone reproduction driver |

Store filenames retain the original HTTP method and encoded request path; `.request`, `.json` and `.body` retain the recorded requests, response envelopes and raw response/SSE bodies. Empty source `store/` directories in the startup proof contain no evidence files.

## Exact fixture results

All three fixture Verdicts have `result.kind = "fail"`. No failed assertion was removed or converted to a pass for archiving.

| Case | Exact `result.failed` | Deviations | Interpretation |
|---|---|---|---|
| Valid fixture | `["live-build"]` | 0 | All other 14 assertions pass; fixture provenance correctly fails live-build acceptance. |
| Wrong-root negative | `["live-build", "root"]` | 0 | `root` correctly rejects the intentionally wrong scalar value 2199 instead of 2200; every other behavioral assertion passes. |
| Deviation negative | `["live-build"]` | 1 | The first scripted step deviates, then a fresh session/run supplies the exact required step; all other 14 assertions pass. |

For every case, `live-build` claims “This campaign identifies a real release, commits, images and omp”, expects `"true"`, observes `"false"`, and has `pass: false`.

The wrong-root assertion expects:

```json
[{"kind":"Root","name":"temp_2200c","value":{"kind":"scalar","scalar":{"kind":"number","v":2200}}}]
```

It observes the same structure with `v: 2199`, and has `pass: false`.

The deviation record identifies prompt 1, model `fixture/deterministic`, and an initial formal call with `code: "const seed = 1"`. The original [RPC transcript](negatives/deviation/rpc.jsonl) records holder `fixture-root-session` with run `fixture-deviation-1`, then `new_session` and holder `fixture-retry-session` with run `fixture-deviation-2`. The successful second step is exactly `const temp_2200c = 2200\nstop(temp_2200c)`. The verdict retains both run IDs and the single deviation; it is not presented as an uninterrupted first-attempt live run.

## Startup failure and writer reuse proof

The separate startup proof uses the real published mux with synthetic child processes, not a live soroi product run. Its first child exits 23 before `ready`; [failed/rpc.jsonl](negatives/startup/failed/rpc.jsonl) records `mux_exited` with code 23. The driver captures `Error: RPC frame deadline exceeded`, then reopens the writer for the same agent `startup-proof`. A distinct generation emits `ready`, receives `mux_close_stdin`, and exits 0, as preserved in [reused/rpc.jsonl](negatives/startup/reused/rpc.jsonl). [observation.json](negatives/startup/observation.json) retains the original summary and local evidence path.

An earlier throwaway probe attempt incorrectly searched nested raw JSON without unescaping it. The final archived driver parses the outer JSONL record and nested `.raw` JSON before checking exit 23; the complete scenario then passed. This was a probe assertion correction, not a product code change.

The driver is copied byte-for-byte. Its absolute imports point to the tested source checkout at `/Users/mouriya/Ext/worktrees/test-181-lab-standin-ff0716f/e2e/standin/`; these are original local source locations, not paths in the PM repository. Reproduction requires that checkout path and the binary path, or an independently adapted copy of the driver. The archive deliberately does not rewrite the original imports or its recorded `/tmp` paths.

## Commands and previously observed outcomes

Run the first two commands from the tested soroi source checkout, not from PM:

```sh
MUX_BINARY=/tmp/soroi-e2e-181-bin/omp-rpc-mux bun run --cwd e2e smoke
bun run --cwd e2e check
bun run /tmp/soroi-e2e-181-startup.ts
```

The runtime operator reported exit 0 for all three final commands. The first produced the three fixture cases above; the second was the TypeScript check; the third produced the archived startup RPCs and observation. The startup summary was:

```json
{"failure":"Error: RPC frame deadline exceeded","reusedAgent":"startup-proof","result":"new writer and ready generation succeeded after failed startup; orderly EOF exit0"}
```

These are previously completed runtime/check results supplied with the evidence, not checks rerun by the archivist. No new build, test or formatter was run to create this archive. Copy verification compares file bytes directly, including all three raw verdicts, without changing their content. Credential inspection found only pre-existing `[REDACTED]` mux tokens in RPCs; the driver generates its token at runtime rather than embedding a credential.

## Outstanding live acceptance and dependencies

[E2E-10: real S1 F01 acceptance](https://github.com/Pepgent/soroi/issues/182) remains open and is not satisfied by this archive. Its recorded dependencies are:

- STO-01..03: central HTTP store, tracked by [soroi store delivery](https://github.com/Pepgent/soroi/issues/180).
- SOR-02/03: product plugin HTTP store client and root supervisor explicit `end`.
- STO-05: real store SSE, outside the scope of the store delivery linked above.
- DIST-01/A0: distribution tar installation and passing installation-probe evidence for the same real release.
- A complete S1 central/mux/store environment, root omp installed only from that distribution tar, and model-gateway credentials injected from their owning source.

The live campaign entry point is:

```sh
bun run --cwd e2e f01 --config /absolute/path/to/campaign.json
```

It must obtain an actual passing Verdict and preserve real product build provenance, A0, raw RPC and HTTP/SSE evidence in its own PM `evidence/e2e/<campaign>/F01/` archive. This fixture archive neither claims that result nor closes the live acceptance task.
