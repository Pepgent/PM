# E2E13 — native reader, owned IO, and complete F07/F19/F22 code-side consumers

**Code-side evidence, not live F07/F19/F22 acceptance. NON-LIVE ORACLE INPUT labels apply to every synthetic/native-shaped/publication-shaped fixture in this campaign.** The native reader section is genuine installed-omp read-only execution; the owned-IO section is real transport against owned fixture servers; the consumer and typed-WS sections are fixed oracles. These are separate evidence classes and must not be substituted for each other.

Code ownership: [soroi #221](https://github.com/Pepgent/soroi/issues/221). The leader approved this code-side consumer stage. Only that source-code issue is eligible for code-side closure. [soroi #250](https://github.com/Pepgent/soroi/issues/250), the complete real automatic-driver/runtime campaign, remains **OPEN** and live-unverified. This archive does not close it, provide a successful A0, or establish any real F07/F19/F22 product pass.

## Provenance and environment

- Campaign: `20261101T031506Z-agent-consumers`, named using the actual UTC archival time.
- Frozen soroi source: `Pepgent/soroi`, branch `test/221-agent-specs`, commit `71495e8ff5bcd100b1b95f8a7b3db6921226af1a`. This full SHA is **source identity only**, not verification evidence, an installed omp identity, a mux build identity, or live acceptance.
- Original source/execution checkout: `/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f`.
- Environment: Darwin/macOS arm64, Bun `1.4.4`, supplied for the execution and independently observed by the archive operator with `uname -sm` and `bun --version`.
- Actual merged mux build, reported by the execution owner: `cargo build --release --target-dir /tmp/soroi-e2e-221-mux-build`, working directory `/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`. The executable used was `/tmp/soroi-e2e-221-mux-build/release/omp-rpc-mux`. Neither that large binary nor its build/cache tree is archived. No unobserved mux source revision or installed omp version/build ID is asserted.
- Every retained terminal log and standalone stdout file is copied unchanged. Exit statuses identified below are supplied by the execution owner, except the ownership probe's process-exit record and CLI observations, which also record their status in the retained output. The terminal log files themselves do not embed terminal exit-status metadata.
- The archive operation did not execute probes, tests, builds, type checks, formatters, product/model/provider calls, or credential-store inspection. Recorded prior execution is evidence; archival byte comparisons only establish preservation.

## Layout and evidence classes

| Path | Evidence retained | Classification |
| --- | --- | --- |
| [`native-reader/`](native-reader/) | Immutable probe, final raw terminal log, native `rpc.jsonl`, dial/mux stderr | Genuine installed native omp reader; no product flow or provider/model call |
| [`own-io/`](own-io/) | Probe, original command record/stdout, both producers, frozen inputs, replay outputs, intentionally invalid inputs, wire/lifecycle records | Actual HTTP+WS IO through real recorder/consumer APIs against owned transport fixtures; **NON-LIVE ORACLE INPUT** |
| [`consumer-oracle/`](consumer-oracle/) | Immutable script, final raw terminal log, browsable 16-case observations, complete input/output tree archive | **NON-LIVE ORACLE INPUT**, including all native/publication-shaped fixtures |
| [`typed-ws-oracle/`](typed-ws-oracle/) | Fake-WS RPC records | **NON-LIVE ORACLE INPUT**, not installed native execution |
| [`agent-oracle/`](agent-oracle/) | Predicate observations and three deliberately failing missing-prerequisite Verdicts | **NON-LIVE ORACLE INPUT** |
| [`F07/`](F07/), [`F19/`](F19/), [`F22/`](F22/) | Actual CLI configs, stdout/stderr, execution errors and failing execution Verdicts | Actual missing-A0 precondition failures; no flow runs or agents |
| [`shared-recorder/`](shared-recorder/) | Unchanged integration terminal log, corrected three-case fixture data, original ready-budget failure | Genuine mux transport with deterministic child/store fixtures; **NON-LIVE ORACLE INPUT**, not product regression/success |
| [`owner-contract/`](owner-contract/) | Single actual owner comment snapshot | Published schema basis only, not implemented runtime proof |
| [`source-directories.tar.gz`](source-directories.tar.gz) | Original structure of the nine smaller retained input trees, including empty directories | Preservation container; inherits each component's classification |
| [`preservation-checks.json`](preservation-checks.json) | Direct byte/tree/tar checks and bounded credential scan facts | Archival checks only; no runtime acceptance claim |

### 1. Final genuine native reader

Exact recorded command, from the original source checkout:

```sh
bun /tmp/soroi-reader-native-probe.ts
```

Execution owner reported exit **0**. [`native-reader/exec-command.log`](native-reader/exec-command.log) is the unchanged final log originally at `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-91915-9-e87e1377.log`. [`native-reader/probe.ts`](native-reader/probe.ts) is the immutable original script. [`native-reader/data/`](native-reader/data/) is copied from `/tmp/soroi-reader-native-IiEiqK`.

The script starts the actual mux, attaches a writer running installed `omp`, then attaches `MuxReader` to that same writer session. The exact native child arguments are:

```text
omp --mode rpc --no-extensions --no-skills --no-rules --no-context-files --no-session --no-tools --no-title --max-time 30
```

The probe generates an ephemeral bearer in memory and passes it through the existing mux launch path; no value is supplied in this archive's instructions. No provider/model request was made.

Observed results:

- Four reader queries: `get_state`, `get_messages`, `get_messages_page`, `get_session_stats`; the first is checked against writer state, and the other three are explicitly printed in the final stdout. The retained native RPC transcript contains the actual request/response traffic.
- Session `01a19518-98fc-7508-8d27-032d2684ec79` is unchanged before/after; `isStreaming: false`, `messageCount: 0`.
- Empty messages and page; stats report zero user/assistant messages, tool calls/results, usage tokens, cost and premium requests. The separately reported `contextUsage.tokens: 4627` describes available context, not a model request or consumed usage.
- The intentionally impossible observation reaches the reader deadline, rather than inventing an observation.
- Final record reports `readerClosed: true`, `writerAndDialClosed: true`, `modelInvoked: false`, `liveF07F19F22: "not-run"`. The script's finalizer terminates/waits for the mux and records stderr.

This proves bounded read-only native-reader interoperability. It does not establish live F07/F19/F22, native model-generated tool behavior, or an installed build identity not present in the records.

### 2. Independent owned HTTP+WS and Evidence namespace integration

Exact command record is copied unchanged to [`own-io/command.txt`](own-io/command.txt):

```sh
cd /tmp
bun /tmp/soroi-watermark-ownership-probe.ts > /tmp/soroi-watermark-ownership-probe.stdout 2>&1
```

The immutable script and stdout are [`own-io/probe.ts`](own-io/probe.ts) and [`own-io/probe.stdout`](own-io/probe.stdout). The complete final group is [`own-io/data/`](own-io/data/), originally `/tmp/soroi-watermark-ownership-WjB0Xj`. It is **not** the earlier `f2EBk7` group.

**NON-LIVE ORACLE INPUT:** both actual producer sessions use `StoreClient.get`, `MuxReader` and separate `Evidence` instances against owned HTTP/WS servers. No product or model process starts. Original producer records and completed frozen copies are retained separately from deliberate corruptions.

Observed results in raw stdout:

- Each producer records before watermarks `[1,1]`, command send line `2`, result line `3`, after watermarks `[3,3]`: `1 < 2` and `3 >= 3`.
- Producer namespaces differ despite identical numerical bounds: `2b165513-8563-4d44-a945-8502619c0e0e` and `f24944b1-d3db-450a-92ff-3aa34b537aa5`. These UUID evidence IDs are fixture record ownership identities, not provider/product credentials.
- Both untouched frozen inputs replay through `RecordedContext` with distinct new output namespaces and the expected value `2200`.
- Named negative inputs reject: old snapshot as after, caller body override, cross-paired ref, missing request/response watermark, missing HTTP evidence ID, foreign HTTP before/after, mixed-owner RPC row, missing RPC evidence ID and foreign begin observation.
- Foreign begin completion is rejected before metadata/body persistence. Final lifecycle reports `activeSockets: 0`, `httpRequests: 4`, `wsConnections: 2`, `wsCommands: 2`; both readers close, both servers stop, and both endpoints refuse connections afterward. Final process-exit record is code `0`.

Transport fixture assertions, even those marked `pass: true`, are not successful live Verdicts.

### 3. Complete consumers, typed WebSocket oracle and agent predicates

Exact final combined command, from the original checkout:

```sh
bun /tmp/soroi-agent-full-consumer-probe.mjs && bun run --cwd e2e reader-smoke && bun run --cwd e2e agent-smoke && bun run --cwd e2e check
```

Execution owner reported exit **0**. [`consumer-oracle/exec-command.log`](consumer-oracle/exec-command.log) is the unchanged final log from `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-91915-8-ea1b0914.log`. The immutable final script is [`consumer-oracle/probe.mjs`](consumer-oracle/probe.mjs).

**NON-LIVE ORACLE INPUT:** the complete fixed root `/tmp/soroi-full-consumer-oracle-otLBS0` is retained, including all 16 case inputs, their corresponding outputs, original `FIXTURE-ONLY.txt` labels, observations, native-shaped transcripts, synthetic owner publication and HTTP metadata/body fixtures. It is compressed in [`consumer-oracle/fixture-trees.tar.gz`](consumer-oracle/fixture-trees.tar.gz) under its original root name. [`consumer-oracle/oracle-observations.json`](consumer-oracle/oracle-observations.json) remains browsable without unpacking. The script creates no passing live Verdict.

| Flow / fixed variant | Observed consumer result |
| --- | --- |
| F07 `none` | 34 assertions; no failed assertions/error |
| F07 `forbidden-start` | Failed `forbidden-not-executed` |
| F07 `wrong-run` | Failed `no-return-request-run` |
| F07 `stale-after` | Error: `The snapshot was not requested after the required RPC result` |
| F07 `missing-phase` | Error: `Expected an object` |
| F19 `none` | 28 assertions; no failed assertions/error |
| F19 `missing-alpha-outgoing` | Failed `irc-alpha-send-persisted` |
| F19 `stale-wait` | Failed `roundtrip-current-reply` |
| F19 `missing-beta-broadcast` | Failed `broadcast-Beta` |
| F19 `wrong-broadcast-transcript` | Failed `broadcast-Beta-session` |
| F22 `none` | 66 assertions; no failed assertions/error |
| F22 `end-before-release` | Failed `batch-release-before-end-request` |
| F22 `wrong-purpose-group` | Failed `batch-released-as-group` |
| F22 `historical-adoption` | Failed `five-concurrent` |
| F22 `same-run` | Error: `The two-worker end gate must use a separate run` |
| F22 `hidden-early-return` | Error: `Each batch member needs one real formal eval and one accepted return` |

The accompanying typed-WS fixture root `/tmp/soroi-reader-proof-hUhwWu` is retained under `typed-ws-oracle/data/`: alpha/beta prefix correlation for all four read commands, missing-observation deadline, early EOF and server-observed closure of alpha/beta/early sockets. These are fake-WS observations, separate from the installed native proof above.

The final agent-oracle root `/tmp/soroi-agent-oracle-mEdyZa` is retained under `agent-oracle/data/`: request vs accepted-return distinctions, transport/tool-call identity separation, rejected returns, quoted purpose grouping, batch/formal release ordering and lifecycle parsing, plus missing-prerequisite fail results for all three flows. The final log also contains `$ tsc --noEmit`; that auxiliary check is not runtime/product acceptance.

### 4. Actual CLI precondition failures — D8 fail artifacts

These are real CLI invocations, not merely in-memory predicate results. Each original flow config's `reproduce` field records its exact invocation. They ran from the original checkout:

```sh
bun run --cwd e2e f07 --config /tmp/soroi-recorded-cli-2aq953dn/F07.json
bun run --cwd e2e f19 --config /tmp/soroi-recorded-cli-2aq953dn/F19.json
bun run --cwd e2e f22 --config /tmp/soroi-recorded-cli-2aq953dn/F22.json
```

All three exit **1**, with `result.kind: "fail"`, `failed: ["execution"]`, empty `runs`, `agents` and `remoteRuns`. The error is the missing `/tmp/soroi-recorded-cli-2aq953dn/missing-full-a0.json`. No successful A0 exists in this set; no live flow starts. Build fields remain `soroi/omp/model: "not-run"`, release `"not-installed"`, images empty; source identity was not substituted into runtime build fields.

For each of `F07/`, `F19/`, `F22/`, `flow.json` is the unchanged original `<flow>.json`; `stdout`, `stderr` and `result/` are unchanged originals. The failing D8 artifacts are [`F07/result/verdict.json`](F07/result/verdict.json), [`F19/result/verdict.json`](F19/result/verdict.json), [`F22/result/verdict.json`](F22/result/verdict.json). [`cli-observations.json`](cli-observations.json) preserves the original exits/results/stdout summary.

### 5. Shared recorder integration, with original ready failure

Known exact first command portion, from the original checkout:

```sh
MUX_BINARY=/tmp/soroi-e2e-221-mux-build/release/omp-rpc-mux bun run --cwd e2e smoke
```

Execution owner reported the retained integration terminal command exit **0**. [`shared-recorder/exec-command.log`](shared-recorder/exec-command.log) is the unchanged log originally at `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-91915-6-f364bd31.log`. It contains the shared recorder's three results first, followed by supplementary earlier reader/oracle/local checks; the complete enclosing compound command was not supplied and is not reconstructed here. Those appended native/oracle roots are not substituted for the designated final groups above, and their unused directories are not archived.

**NON-LIVE ORACLE INPUT:** final `/tmp/soroi-standin-smoke-OytnTp` is retained under `shared-recorder/final/`. The actual mux communicates with a deterministic `e2e/fixtures/rpc-child.ts` and owned fixture store, not the product/provider/model. Valid/deviation fixture Verdicts fail only `live-build`; wrong-root additionally fails `root`. All three report the genuine fixture lifecycle assertion true. The deviation fixture records one deviation/two runs. The fixture's pass-shaped `*-a0.json` and copied `a0-verdict.json` files are synthetic gate inputs, not real successful A0.

The original `/tmp/soroi-standin-smoke-RzOo63` is separately retained under `shared-recorder/intermediate-ready-failure/`. Its dial stderr says `ready must advertise a positive maxFrameBytes: missing field maxFrameBytes`; its execution error reports writer close `1008`. The execution owner reported that first attempt exit **1**. The final frozen source's `e2e/fixtures/rpc-child.ts` ready frame advertises its owned `maxFrameBytes: 65_536`; after that correction the full three-case smoke was rerun. Retaining both artifacts documents the actual fixture integration failure and corrected execution, not a product regression or product success.

### 6. Owner publication basis

[`owner-contract/obligation-publication.json`](owner-contract/obligation-publication.json) is the unchanged snapshot of [the actual owner comment on soroi #201](https://github.com/Pepgent/soroi/issues/201#issuecomment-6552373589), comment `6552373589`. It publishes `soroi.eval-lifecycle` with `obligation_registered`, `obligation_released`, `run_end_requested`, root-session ownership, and FormalEval/Batch obligation variants. The comment explicitly says the contract is published before implementation.

This is schema authority only. It is **not** evidence that the native runtime emits these records. Synthetic `owner-publication.json` files inside the consumer fixture archive are **NON-LIVE ORACLE INPUT**, not this actual publication or implemented owner runtime. No other issue cache was copied.

## Reproduction and original-path limitations

The three immutable probe scripts retain their original absolute source imports. Native probe also retains the absolute mux executable path; its installed `omp` is resolved through PATH. For the exact recorded commands, restore the stated soroi revision at `/Users/mouriya/Ext/worktrees/test-218-pty-a0-ff0716f`, use its normal e2e dependencies, restore each immutable script to its named `/tmp/soroi-*.ts` / `.mjs` path, and provide the mux executable at its recorded location by building the appropriate merged mux source with the command above. Installed omp and mux build identities must be independently established for a new execution, not inferred from the soroi source SHA.

At another checkout/build path, adapt absolute imports/executable locations only in a **separate working copy** of each script; do not alter these retained originals. The owner-IO command runs from `/tmp`; source-owned smoke/check/CLI commands run from the soroi checkout. Newly generated temporary roots, ephemeral ports, UUID namespaces, timestamps and native session IDs will differ. None of these reproduction steps was rerun by the archive operator.

To inspect the complete large fixed tree without altering the archive, create a temporary directory under `/tmp`, then extract:

```sh
mkdir -p /tmp/soroi-agent-consumers-inspect
# Run from this campaign directory:
tar -xzf consumer-oracle/fixture-trees.tar.gz -C /tmp/soroi-agent-consumers-inspect
```

The archive expands under `soroi-full-consumer-oracle-otLBS0/`. Replay requires a separate working configuration targeting the extracted input and a separate output directory; never write into a frozen input. Original scenario paths and CLI configs are retained literally. For reproducing missing-A0 rejection at another location, adapt a **working copy** of the config's input/output/A0 paths and reproduce string, keeping A0 intentionally absent. Do not turn a fixture gate input into real A0 evidence.

`source-directories.tar.gz` preserves the original basename/structure of each smaller tree, including empty `store/` and `inputs/` directories that Git does not otherwise retain. No large Rust build/cache, unused earlier probe group or entire issue cache is included.

## Preservation, bounded credential scan, and remaining limits

[`preservation-checks.json`](preservation-checks.json) records archival comparisons: every copied source file against its frozen original; copied tree inventories; every regular tar member against its original bytes; preservation of directory entries including empty directories; and a bounded no-value-output secret-pattern scan of raw originals and the final archive's text/member bytes. No hash comparison is used as evidence.

The scan checks common GitHub/provider token forms, private-key headers, literal sensitive-field values and Authorization Bearer values. Suspected secret values are never printed. Explicit synthetic fixture literals and UUID evidence ownership IDs are not treated as product/provider credentials. The bounded scan is not a guarantee against arbitrary encodings. No credential store is opened by the archive operation.

**Outstanding:** all real F07/F19/F22 owner runtime and automatic driver requirements remain with [soroi #250](https://github.com/Pepgent/soroi/issues/250), including a genuine full same-release A0, actual product/native owner publications and observations, real store/supervisor behavior, real model/provider execution where required, installed runtime provenance, and passing live D8 Verdicts. No issue or project state is changed by this archive commit.
