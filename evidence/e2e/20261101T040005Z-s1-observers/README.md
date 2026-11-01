# E2E19 / S1 observers — frozen code-side evidence

**Not a live product pass.** This campaign preserves the final and initial code-side artifacts for [source work #208](https://github.com/Pepgent/soroi/issues/208). [Live acceptance #259](https://github.com/Pepgent/soroi/issues/259) remains **OPEN / all live behavior unverified**. At handoff, the source PR had not yet been created. No issue, PR, Project field, LEDGER, product source or runtime was changed by this archival task.

Source identity supplied by the independent tester: commit `f3271815e727176145ca10059352767b2eacf44a`, branch `test/208-s1-observers`, checkout `/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f`. This is an identity reference, not correctness evidence or proof that a runtime identified that commit. Recorded environment: **Darwin arm64, Bun 1.4.4**, inherited process environment; no secret environment values copied. The archive was packaged at `2026-11-01T04:00:05Z` without rerunning any runtime, test, build, lint or formatter.

## Classes and raw inventory

Each archive contains its complete named source directory, including empty directories. Loose scripts/logs are exact copies. `preservation.json` maps every source to its published destination and records measured counts; `inventory.json` lists every original directory entry, file size, mode and timestamp. Counts describe preservation only, not runtime coverage.

| Published file under `raw/` | Class and interpretation | Regular files | Directories | Raw file bytes |
| --- | --- | ---: | ---: | ---: |
| `io-final.tar.gz` | Genuine installed-native/mux protocol + owned HTTP/SSE + real temporary Git composite producer probe; not live Soroi | 161 | 94 | 336470 |
| `sse-initial-failure.tar.gz` | Initial observed SSE deadline failure; retain as failure | 1 | 3 | 198 |
| `streams-final.tar.gz` | Final F26/F30 consumer oracle family, **NON-LIVE ORACLE INPUT** | 684 | 85 | 1974143 |
| `streams-initial-failure.tar.gz` | Original F26 graph-group nesting failure and full initial family, NON-LIVE | 580 | 85 | 1858634 |
| `streams-replay.tar.gz` | Additional actually executed complete stream-family replay, NON-LIVE | 327 | 57 | 1276705 |
| `phases-f27-f28.tar.gz` | Final F27/F28 oracle family; **F29 here is INITIAL / SUPERSEDED**, not final F29 | 695 | 112 | 1322555 |
| `version-f29-final.tar.gz` | Final F29 composite-baseline oracle family, NON-LIVE | 526 | 64 | 990759 |
| `cli-missing-a0.tar.gz` | Five real public CLI invocations; each failed at missing A0, not acceptance | 31 | 11 | 13382 |
| `aux-reader.tar.gz` | Auxiliary reader smoke owned fixture, not product proof | 1 | 3 | 6559 |
| `aux-agent.tar.gz` | Auxiliary agent oracle, not product proof | 10 | 7 | 7846 |
| `aux-local.tar.gz` | Auxiliary local-flow oracle, not product proof | 10 | 7 | 8817 |
| `native-readback.tar.gz` | Later readback of the same frozen native ledger; analysis companion, not new runtime | 1 | 1 | 943 |
| `io-probe.ts` | Unchanged final composite-probe driver | 1 | — | 14951 |
| `sse-before.ts` | Unchanged initial deadline-bug driver | 1 | — | 1332 |
| `io-final-exec.log` | Actual final composite-probe stdout | 1 | — | 2350 |
| `sse-initial-exec.log` | Actual initial deadline-bug stdout | 1 | — | 257 |
| `auxiliary-exec.log` | Actual chained auxiliary-regression output | 1 | — | 6650 |

All **3032 regular files / 7822551 bytes** were compared directly with the corresponding copied bytes or decompressed tar members. All **529 directory entries**, including empty directories and nested fixture `.git` directories, were preserved in the 12 archives; there are no symlinks. The nested Git fixtures are tar members, not PM submodules. No hash verification was used. Byte equality and archive membership are preservation evidence only.

## Genuine protocol and owned producer I/O

Actual final command: `bun /tmp/soroi-observer-io-probe.ts`. Its actual root is `/tmp/soroi-observer-io-AOGr5h`. The tester observed exit **0** in terminal session 2; the raw execution log and final `observations.json` are retained.

- **Installed native protocol, not a Soroi child:** existing mux executable `/tmp/soroi-e2e-221-mux-build/release/omp-rpc-mux`; no unobserved binary build commit is asserted. The exact native command in the driver is `omp --mode rpc --no-extensions --no-skills --no-rules --no-context-files --no-session --no-tools --no-title --max-time 30`. Four native stdout frames were broadcast to both attached readers. A reader-sent prompt was policy-closed with code **1008**. Before/after native session was `01a19540-8ae3-7411-8fef-ba3ccbed558e`, `messageCount=0`, `isStreaming=false`, messages unchanged, with no observed `agent_start` or native user message. The driver did not forward the prompt or initiate a model turn. This is **not** a background provider-network audit and **not** live F26 child acceptance.
- **Owned SSE:** actual header watermark **0**, per-block watermarks **[0,1,3]**, CRLF/multiline and split Unicode handling, and a positive replay through the actual `RecordedContext`. After finish, active bodies were **0**. Wrong-content-type hanging body rejected in **41 ms** at a **40 ms** deadline. EOF and quiet-stream paths rejected rather than supplying success.
- **Real temporary Git, owned baseline HTTP:** only fresh repositories under the probe's `/tmp` root were changed. Immutable committed source really changed `.times(2)` to `.times(3)` in the committed case; the unstaged case's working file differed from committed source. Edit exit **7** was rejected by producer and parser. A baseline HTTP **409** was rejected before starting the mutation command. Delayed owned usage/version responses recorded both bodies finishing before mutation began. Composite start/finish watermarks both **1** are valid here because the RPC ledger was quiet; the actual body/command trace, not a strict watermark inequality, supplies the order evidence. Commit IDs in the raw files are identities only.
- Final recorded cleanup: owned HTTP server stopped, active HTTP bodies **0**, native reader/writer connections closed, mux terminated **and awaited**.
- **Post-refusal continued broadcast:** the separately retained `/tmp/soroi-observer-native-readback-7o4y30ir/observation.json` analyzes that same frozen `native/rpc.jsonl`, not a new runtime. After the denied reader's send/close watermark **32** with code **1008**, writer `get_state` response line **34** (`standin-6`) appears with identical raw bytes on reader A/B lines **36/35**; writer `get_messages` response line **40** (`standin-7`) appears identically on A/B lines **38/39**. The unaffected readers continued receiving the writer's responses after the refusal.

### Initial failure and complete repaired rerun

Actual initial command: `bun /tmp/soroi-observer-sse-before.ts`; raw root `/tmp/soroi-observer-sse-before-iqDbOe`. The probe exited **0 because it observed the bug**: at a 40 ms timeout, the request remained unsettled after 180 ms; forced server stop then ended it. This is not a successful deadline result. The tester reports the source fix kept the timer active through body handling until `finally`; the **whole related final I/O probe above** then ran with the current API and observed the bounded 41 ms rejection. Both original raw failure and final raw run are preserved, not rewritten.

## Constructed consumer oracles — never live observations

These families really executed public consumer functions over constructed records. Their retained assertion claim strings may say “real”, “actual” or “committed”; those strings do **not** make synthetic RPC, HTTP, source, command output, commit or version records into product observations. No fake A0 or successful D8 Verdict was created by these oracle runs.

- **F26/F30 final:** `/tmp/observer-stream-oracle-r2-zG9abH` contains the complete scripts, commands, source snapshots, fixed inputs, actual outputs, mutation differences and `results.json`. Both positives have no failed assertions/errors. F26 final transaction-group cursors are **5/8**, not step cursors **3/6**; constructed calc results are **42/84**. Raw unknown native stdout and refusal checks are included. All 12 negatives reach the decisive rejection: missing sequence/replay → continuation error; wrong commit cursor → graph/transaction cursor error; late first group → `stream-0-arrivals`; omitted unknown native frame → `reader-all-stdout`; wrong close → `reader-prompt-rejected`; delivered forbidden prompt → `reader-prompt-not-delivered`; wrong holder → `lifecycle-owning-root`; aborted/missing end → lifecycle assertions; late headers in F26 and F30 → causal-header error. F30 positive allows other global runs, reverse-lexical opaque lifecycle cursors, and step cursor **3** versus Ended graph cursor **4**. The independent actual replay is retained separately in `/tmp/observer-stream-replay-ynIqT2`.
- **F26 initial failure:** `/tmp/observer-stream-oracle-23c3rg` preserves the original family. Its positive failed **only `3-graph-group` and `6-graph-group`**, exposing the expected graph-group nesting bug. After repair the fresh r2 root reran the complete family; this initial failure must not be presented as final success.
- **F27/F28 final:** `/tmp/soroi-observer-phases-RV41kV`, `commands.txt`, `outputs/<case>/oracle-result.json`. F27 constructed seed is Open with pending **21**, same graph at sequence **2** after dry run; F28 constructed native root is fresh with count **0**, calc **21→42**. Actual negatives cover graph write, missing phase, old root, wrong output, cross-namespace metadata, stale HTTP, historical POST and contradictory original active-branch arguments despite repaired execution-start arguments. Preparation and execution exited **0**. Preserve this entire raw root, but its F29 results are **initial/superseded**; see its unchanged `F29-initial-status.txt`.
- **F29 final only:** `/tmp/soroi-observer-phases-ykYanP`, `execution-status.txt`, `commands.txt`, full case outputs. Preparation and execution exited **0**. Positive has **14 true assertions**, constructed calc **21→42/63**, version/commit association, old record immutability and **embedded composite baseline only**. Nine negatives reject wrong usage, mutated old record, unchanged commit, wrong new value, late baseline, uncommitted source, mismatched head, absent composite baseline, and obsolete independent top-level baselines even at the same watermark. **No Git was executed by this fixture worker**; synthetic baseline ordering does not establish producer order. The owned producer trace in the genuine I/O probe supplies that separate evidence.

F29's original D8 obligations are usage, new commit/new version and old-record immutability. Object readability is **not** an added acceptance requirement. The tester's correction of that dispatch scope did not change the frozen source or raw evidence.

## Actual CLI prerequisite failures and auxiliary regression

Actual CLI commands from the frozen checkout, for each `f26`, `f27`, `f28`, `f29`, `f30` respectively:

```sh
bun run --cwd e2e f26 --config /tmp/soroi-observer-cli-49y_mho7/F26.json
bun run --cwd e2e f27 --config /tmp/soroi-observer-cli-49y_mho7/F27.json
bun run --cwd e2e f28 --config /tmp/soroi-observer-cli-49y_mho7/F28.json
bun run --cwd e2e f29 --config /tmp/soroi-observer-cli-49y_mho7/F29.json
bun run --cwd e2e f30 --config /tmp/soroi-observer-cli-49y_mho7/F30.json
```

Every command actually exited **1**, producing D8 `fail` with `failed=["execution"]` for missing A0. Configs, stdout/stderr, errors, observations and failure verdicts are preserved. Every `runs`, `agents` and `remoteRuns` array is empty. This neither passes A0 nor binds a passing runtime to the source commit.

Actual auxiliary command:

```sh
bun run --cwd e2e reader-smoke && bun run --cwd e2e agent-smoke && bun run --cwd e2e local-smoke && bun run --cwd e2e check
```

The tester confirmed terminal registry session **3** observed the whole chain exiting **0**; the raw log ends with `tsc --noEmit`. The three helper roots are preserved. This is auxiliary fixture/regression evidence, not live product proof. The archivist did not rerun it.

## Reproduction without modifying historical evidence

All original absolute imports and commands remain unchanged historical facts. Read each retained `commands.txt` and source snapshot before reproducing. Use a compatible Bun runtime and record its actual version; the original observed version was 1.4.4. Use the matching source implementation/dependencies. Do not execute against, chmod, or overwrite retained raw roots. Extract only into a fresh `/tmp` workspace; use new output roots. Future reproduction commands below are instructions, **not additional executed evidence**.

For example, from this campaign directory:

```sh
WORK=$(mktemp -d /tmp/s1-observers-reproduce-XXXXXX)
tar -xzf raw/streams-final.tar.gz -C "$WORK"
tar -xzf raw/phases-f27-f28.tar.gz -C "$WORK"
tar -xzf raw/version-f29-final.tar.gz -C "$WORK"
```

If the original checkout or `/tmp` roots are unavailable, copy the harnesses again into writable files under `$WORK` and adapt **only those working copies**: replace the recorded checkout prefix with the available matching checkout; replace the stream replay's `inputRoot` with `$WORK/observer-stream-oracle-r2-zG9abH`. Keep raw JSON/RPC/HTTP records and archived commands unchanged. Then the stream replay takes a fresh output directory:

```sh
OUT=$(mktemp -d /tmp/observer-stream-replay-XXXXXX)
bun "$WORK/observer-stream-oracle-r2-zG9abH/replay.mjs" "$OUT" > "$OUT/stdout" 2>&1
```

For F27/F28/F29, each `oracle.ts` takes `prepare ROOT` then `execute ROOT`, where `ROOT=$(mktemp -d /tmp/soroi-observer-phases-XXXXXX)`. Use the RV41kV harness for retained F27/F28 and ykYanP for **final** F29; the RV41kV harness's F29 is obsolete and must not replace the final composite-baseline run. Final current source may deliberately reject those obsolete F29 inputs. Native/owned-I/O reproduction additionally needs installed `omp`, Git, the existing mux binary (or an explicitly identified replacement in a working-copy driver), loopback access and fresh `/tmp` repositories; `io-probe.ts` itself creates a new output root. The initial SSE failure requires its original pre-fix implementation and must not be expected from the repaired source. CLI reproduction needs corresponding adapted working-copy configs; without genuine A0 its expected outcome remains failure, not acceptance.

## Publication scan and remaining boundary

`scan.json` records a **bounded pattern scan** of every original regular file and every published decompressed tar member/loose raw copy, including binary bytes, plus README/metadata. The maximum permitted individual file is **32 MiB**; no input exceeded it. Patterns cover GitHub tokens, AWS access IDs, private-key headers, bearer tokens, JWTs, credential-bearing URLs and long credential literals. Findings contain categories/paths/counts only, never matched secret values. There were **zero pattern findings**. This is not a guarantee that no secret exists outside those patterns; no credential store, SOPS or keychain was inspected. Raw evidence was not redacted or normalized.

Packaging comparisons, inventories and scans prove only preservation and the stated bounded scan result. They do not prove product correctness. Real installed Soroi F26–F30, model behavior, genuine store/child lifecycle, passing A0, runtime source identity and full D8 acceptance remain unverified under [#259](https://github.com/Pepgent/soroi/issues/259). No live pass is claimed.
