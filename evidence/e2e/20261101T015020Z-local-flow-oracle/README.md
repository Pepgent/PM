# F02–F04 — final code-side oracle and missing-A0 evidence (E2E-11a)

**NON-LIVE ORACLE ONLY. All three live flows remain `not-run` and live-unverified.** This archive records fixed oracle inputs and the real harness's missing-A0 rejection, not execution of the installed product, native host, store, supervisor, library, provider or model. Code-side ownership is [soroi #213](https://github.com/Pepgent/soroi/issues/213). Full live acceptance remains [soroi #245](https://github.com/Pepgent/soroi/issues/245); this archive discharges none of that campaign's live obligations.

## Provenance and command

- Archive campaign: `20261101T015020Z-local-flow-oracle`, actual UTC archival time, following the PM `evidence/e2e/<UTC-campaign>/` convention used by the prior PTY archive.
- Final frozen source: `Pepgent/soroi`, branch `test/213-local-flows`, commit `7bc65df1291c4d89b44679ac2831c72f84c352ec`. This identifies source only; it is not installed-runtime or acceptance evidence. Only this final evidence set is archived.
- Original checkout and execution working directory: `/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f`.
- Environment: Darwin/macOS, arm64, Bun `1.4.4`. The execution owner supplied this environment; the archive operator also observed `Darwin arm64` and Bun `1.4.4` locally.
- Original evidence root: `/tmp/soroi-local-flow-proof-Xlt1tt`.
- Original raw terminal log: `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-91915-5-3947ed04.log`.
- The execution owner reported final terminal exit **0** for the exact command below. [exec-command.log](exec-command.log) is that log copied unchanged; terminal exit-status metadata is not embedded in the raw log. No stdout was reconstructed.

```sh
bun /tmp/soroi-f02-review-final.mjs && bun run --cwd e2e local-smoke && bun run --cwd e2e check
```

[soroi-f02-review-final.mjs](soroi-f02-review-final.mjs) is the unchanged final once-only oracle input, frozen separately by the execution owner. It retains fixed absolute imports from the original checkout above. To reproduce the exact command, restore that source revision at the original checkout path, use its normal installed e2e dependencies, and copy the archived script unchanged to `/tmp/soroi-f02-review-final.mjs`; run from the checkout root. At another checkout path, adapt imports in a separate working copy, not in this retained raw file. `local-smoke` allocates a fresh `/tmp/soroi-local-flow-proof-*` directory; its temporary path and timestamps will differ. Reproduction was not rerun during archiving.

## Observed bounded results

| Raw observation | Recorded result | Meaning and boundary |
| --- | --- | --- |
| Valid formal tool execution failure | `Error`, failed `continuation-outcome-0` | The fixture execution failure is not retriable as `ScriptDeviation`. This is oracle classification, not an actual product failure. |
| Mixed formal/dry ordering | Both `reverse: false` and `reverse: true` report `Error`, with failed `continuation-outcome-0` or `continuation-outcome-1` respectively | A dry-run deviation cannot hide the formal execution failure in either tested order. |
| Continuation boundary: extra tool, malformed eval, provider failure | All three `continuation-boundary-retains-formal-failure` records report `Error` and failed `continuation-outcome-0` | The actual `FlowContext.continuation` method, driven by fixture frames, retains an earlier formal execution failure rather than replacing it with a retriable deviation or `ModelFailure`. The malformed eval has its own terminal result. No real provider request ran. |
| Rejected model-authored input | Both `check_error` and `schema_error` report `ScriptDeviation`, `failed: []` | Model-authored code rejected by the checker/schema remains a script deviation, not a product failure. This is distinct from execution failure after valid formal input. |
| One request, two eval calls | `assertions: 18`, `reminderComparisons: 1`, `failed: []` | The fixture reminder is compared once against the pre-request state shared by both eval calls, not against state created by a later eval in that response. |
| Schema-error classification | Host-shaped fixture yields `schema_error`; runtime, synthetic-unexecuted and unstructured fixtures yield `tool_error` | Distinct oracle classifications; no native host schema rejection is claimed. |
| D5 indented reminder list | `names: ["curve_svm", "score"]`, `formatted: true` | Documented indented bullets are accepted. Missing provenance is separately rejected as unformatted. These are fixed strings, not live SOR-08 entries. |
| Other local inputs | Semantic identifiers/stop-only code, committed-input edges, strict interval overlap, File preview locator extraction, original arguments, request-bound reminder ancestry/ordinals | Fixed positive/negative parser and predicate inputs only; no actual File, graph, event, activity or native transcript was observed. |
| F02 missing A0 | [F02/verdict.json](F02/verdict.json): `result.kind: "fail"`, `failed: ["execution"]` | Required A0 input is absent; execution is rejected. |
| F03 missing A0 | [F03/verdict.json](F03/verdict.json): `result.kind: "fail"`, `failed: ["execution"]` | Same prerequisite rejection, not a passing F03 run. |
| F04 missing A0 | [F04/verdict.json](F04/verdict.json): `result.kind: "fail"`, `failed: ["execution"]` | Same prerequisite rejection, not a passing F04 run. |
| Final summary and auxiliary check | `liveF02F03F04: "not-run"`, followed by `$ tsc --noEmit`; enclosing command reported exit `0` | Oracle checks and auxiliary type checking completed. Neither process success nor type checking turns the three failing Verdicts into live passes. |

[oracle-observations.json](oracle-observations.json) explicitly records `liveFlow: false`. Each failing Verdict points to its own unchanged `execution-error.txt`, naming the missing `/tmp/soroi-local-flow-proof-Xlt1tt/missing-real-a0.json`. All three retain `soroi`, `omp` and `model` as `not-run`, release as `not-installed`, no image identities, and empty `runs`, `agents` and `remoteRuns`. These fields were not replaced with source provenance.

The unchanged generated per-flow READMEs contain a generic build-fields sentence mentioning F01. They are raw artifacts, not claims of F01 execution or live acceptance. The command actually executed is the combined command above.

## Full live acceptance remains outstanding

Nothing here narrows [soroi #245](https://github.com/Pepgent/soroi/issues/245). All of its requirements remain, including:

- Full passing A0 for the same installed release, not merely an image gate; actual installed omp/mux, real library, deployment-owned credentials and build provenance in S1 `central`.
- Actual store/supervisor interactions, native transcripts, HTTP request/response records, event/SSE evidence, activity/marker observations and final D8 Verdicts with real identities.
- F02's exact unnamed continuation prompt, consumption of previously unconsumed atoms, historical owning-store input provenance, real SOR-08 pre-provider-request entries with ancestry/request binding and preview/source/environment rows, and observed Ended state.
- F03's nine scripted violations and independent `slow_step` markers, actual structured CheckError kinds, unchanged graph sequence and identities, absent side effects, later committed-step event-prefix bound, positive strict activity overlap with actual marker bytes, and separately named multioutputs.
- F04's unpinned calc/anneal with pinned review outputs, actual returned File bytes readable at the reported central path, owning-store object lookup returning 404, unchanged summaries/graph/sequence/agents, actual native structured schema errors for formal pins, and the later explicit stop-only no-write event-prefix bound.

No native transcript, store response, product output, model result, successful A0 or live-flow Verdict was invented or added. The `store/` directories are empty originals, not evidence of a store connection.

## Raw preservation and archival checks

The three source flow directories and observations file are copied unchanged and browsable. [source-directories.tar](source-directories.tar) preserves their original structure, including the three empty `store/` directories Git cannot retain independently. Raw stdout and the immutable oracle script are separate unchanged copies.

The archive operator performed only preservation checks and a bounded credential-pattern scan, not builds, tests, formatters, provider calls or live scenarios:

- `diff -rq` for each frozen source/copy flow-directory pair: exit `0`, no differences.
- `cmp` for final observations, terminal log and script against their respective source files: exit `0` each.
- `tar -xOf source-directories.tar <relative-file> | cmp - <archived-relative-file>` for all ten original text files: exit `0` each. `tar -tf` confirmed all three empty `store/` directories.
- A text scan of copied raw files for common GitHub/provider token prefixes, bearer values and private-key headers returned no matches. Tar text members match the same scanned browsable files. The retained script uses fixed fixture values; the smoke source supplies a fixed synthetic noncredential and rejects missing A0 before connecting. No credential store was opened. This bounded scan does not claim to detect every possible secret encoding.

Byte comparisons establish archival preservation only. The retained output and failed Verdicts establish the limited non-live oracle and missing-prerequisite observations described above.
