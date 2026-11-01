# F01 / A0 — frozen failures, diagnostic lifecycle and native-input investigation

**No full A0 pass is claimed.** R1 and R2 are actual failed full-path attempts; the deliberate prepare failure is a separate diagnostic-lifetime exercise, not another full attempt or a category pass. Version identity, parser rejection and PTY smoke are auxiliary observations. The native-input report is source/API investigation, not a runtime result.

This campaign preserves the frozen records now, without waiting for a revised recipe, new CI artifact or successful rerun. At the supplied handoff, [A0 execution #235](https://github.com/Pepgent/soroi/issues/235) and [verifier PR #260](https://github.com/Pepgent/soroi/pull/260) were OPEN; the independent tester owns the driver/execution, and eng-dist owns the verifier and next formal recipe/artifact. [S1 live acceptance #259](https://github.com/Pepgent/soroi/issues/259) also remained OPEN. These are handoff facts, not a fresh GitHub-state query. This archival task changed no issue, PR, Project field, LEDGER, product source, host configuration or runtime.

## Provenance, environment and commands

The frozen owner publication is [comment 6553021595](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553021595), copied alone into `raw/owner-recipe/published-recipe-comment.json`; `soroi-dist02-argv-contract.json` is the accompanying machine contract. These record recipe instructions and a historical publication, not authoritative current execution state. No other cache was copied.

Both failed attempts used the actual CI release from [run 41270217013](https://github.com/Pepgent/soroi/actions/runs/41270217013), manifest source `777c75678b8ec73822a3bdbe7c9cdfa87bd64f57`. The original tar filename/release identity is `soroi-621607dfe57f576be0e07bad19fbdaf0299d6f7beb024cea9f4de63947597b3a.tar`. The tar and native executable are **not** included here. Commit/release/image strings in retained configs are historical identities only; they are not correctness evidence and were not hash-verified.

Recorded driver checkout: `/Users/mouriya/Ext/worktrees/test-208-s1-observers-ff0716f`. Host stderr records macOS arm64 with Bun 1.4.4; IMG01 output records Linux arm64, Bun 1.4.4 and native OMP 18.14.2. These are observations, not version pins. The image reference, Docker network, non-secret store URL, installer/prepare/verifier argv and native arguments remain verbatim in each `campaign.json`. Credential/model/settings paths are historical references only: their target files were not followed, read or copied by the archivist. A configured `build.model` is an intended target, **not** evidence that a model turn happened.

Actual historical commands, all from the recorded checkout unless stated otherwise:

```sh
e2e/pty/a0-install.sh /tmp/soroi-full-a0-88i7tuvp/campaign.json
e2e/pty/a0-install.sh /tmp/soroi-full-a0-r2-36qhq4ut/campaign.json
e2e/pty/a0-install.sh /tmp/soroi-a0-diagnostic-rejection-c0p2vox6/campaign.json
e2e/pty/a0-install.sh /tmp/soroi-a0-prepare-rejections-orjrj5pp/missing.json
e2e/pty/a0-install.sh /tmp/soroi-a0-prepare-rejections-orjrj5pp/empty.json
bun run --cwd e2e pty-smoke
```

The first five invocations exited **1**. The final auxiliary smoke exited **0**, as supplied by the tester's observed terminal-registry result; its raw execution output is included. This archive did not rerun any command above, model call, network/container operation, test, build, formatter or linter. Archival inventory, compression, direct byte comparisons and bounded publication scanning are the only new processing. Campaign timestamp `20261101T044721Z` records the archival intake; metadata files record their actual later creation times.

## Outcome classes and preserved inventory

Every tar contains the entire named frozen root, including its root directory and all empty directories. Every loose raw file is unchanged. `inventory.json` records each original entry's path, type, size, mode and timestamp. `preservation.json` maps each source to its publication path and records direct comparisons.

| Under `raw/` | Class / actual outcome | Files | Directories | Original file bytes |
| --- | --- | ---: | ---: | ---: |
| `r1-failed-a0.tar.gz` | Actual R1 full-path attempt, failed before injection completed | 10 | 4 | 9258 |
| `r2-failed-a0.tar.gz` | Actual R2 full-path attempt, real install/prepare/TUI, turn-end timeout | 8 | 4 | 30108 |
| `deliberate-prepare-failure.tar.gz` | Intentional exit 7 after real prepare; partial diagnostic retention only | 11 | 6 | 9712 |
| `version-only-identity.tar.gz` | Clean IMG01 `omp --version`, exit 0; not A0 | 1 | 1 | 381 |
| `prepare-parse-rejections.tar.gz` | Missing/empty prepare argv, each CLI exit 1 before resource creation | 7 | 1 | 8074 |
| `auxiliary-pty-smoke.tar.gz` | Real ShellIO/empty-HOME/rejection auxiliary smoke; not A0 | 10 | 10 | 2759 |
| `runtime-identity.ts` | Unchanged identity-probe script | 1 | — | 1571 |
| `native-input-api/*` | One investigation report and five actual bundled-source extracts, not binaries | 6 | — | 988618 |
| `owner-recipe/*` | One frozen published comment plus machine argv contract | 2 | — | 8141 |
| `exec/*` | Five unchanged execution logs: R1, R2, diagnostic, identity, smoke | 5 | — | 1343 |

Total: **61 original regular files / 1,059,965 bytes**, **26 directory entries**, including **7 empty directories**, and **0 symlinks**. All original regular files were compared directly with the corresponding decompressed member or loose copy; all archive member lists and entry modes matched. The final staged-to-PM copy was also compared byte-for-byte. These checks prove preservation only, not execution correctness. No hashes were computed or used as evidence. Original raw bytes, historical absolute paths and existing per-run README files remain unchanged.

### R1 — staging ownership failure, not installer/model failure

Original root: `/tmp/soroi-full-a0-88i7tuvp`; driver identity `a13894496833a58406814e172302e7ee06546703`. Recorded interval: **2026-11-01 04:15:10.561Z–04:19:11.907Z**. The real new-container TTY and empty-HOME markers were observed. Bootstrap then failed copying staged `models.yml` into `/home/agent/.omp/agent/models.yml` with **EACCES**, before the `:injected` marker.

`during-run-permissions.json` records runtime **uid/gid 1000:1000**, staged `models.yml` and `config.yml` owned by **501:20**, mode **0600**, both unreadable; staged input JSON was readable. The additional stage and observation files are preserved. This is a concrete staging-ownership observation, not an inference from a later source patch.

The parent waited for its injection marker and returned `fail`, `failed=["a0-driver"]`; the raw terminal also records bootstrap `finished:1`. Installer, release prepare, TUI and category verifier did **not** run. The driver cleanup assertion passed and `cleanup.json` records `errors:[]`. No configured model identity establishes a model turn.

### R2 — installed public launcher and visible draft, no observed turn-end

Original root: `/tmp/soroi-full-a0-r2-36qhq4ut`; driver identity `58166abaaf8e3ed455dc4aded4eedddc46388428`, after the staging chown change. Recorded interval: **2026-11-01 04:23:12.670Z–04:27:22.435Z**. This was a fresh empty-HOME attempt, not a continuation of R1.

The raw PTY records injection, actual release installer (**118 packages installed**), plugin linkage/registration, real prepare output, public installed `/home/agent/.local/bin/soroi --version` output **18.14.2**, and native interactive UI. The complete requested prompt remains visibly in the editor. No assistant/tool turn is visible in the retained PTY. The expected `soroi-install-check:turn-end` was not received within the configured **240000 ms** observation deadline; the parent returned `fail`, `failed=["a0-driver"]`. Category verifier did not run. Cleanup assertion passed with `errors:[]`.

The retained output is not an stdin-event, termios or downstream model trace. It **cannot prove** the exact submission mechanism, CR-to-LF conversion, submit-gate timing or the stronger claim that no model call happened. The then-current success-only proof-copy path did not preserve R2's native proof on failure; those missing files are not reconstructed here. The later diagnostic-copy driver change does not retroactively supply R2 evidence. `terminal-plain.txt` is the already-created ANSI-stripped analysis companion; it does not replace `evidence/pty/a0.txt`.

### Deliberate prepare failure — diagnostic snapshot lifetime only

Original root: `/tmp/soroi-a0-diagnostic-rejection-c0p2vox6`; driver identity `99d8ed1a90e4f7561e47e296ae3b42c8595d2cd6`. Recorded interval: **2026-11-01 04:42:03.874Z–04:42:33.183Z**. Its configured prepare command was deliberately:

```sh
bun /tmp/soroi-a0/release/install-check/prepare.js --home /home/agent --proof /tmp/soroi-a0/proof --work /tmp/soroi-a0/work; exit 7
```

The real installer and prepare ran; raw PTY records prepare output then `finished:7`. The parent did not receive its own `:prepared` barrier and reached its configured **20000 ms** observation deadline, returning `fail`, `failed=["a0-driver"]`. This distinguishes actual prepare subprocess exit **7** from parent CLI exit **1** and the observed marker deadline. No TUI/model turn was requested (`steps:[]`, `build.model:"not-run"`), and no category verification ran.

`evidence/diagnostic-proof/` was copied/redacted by the driver before container cleanup. Its actual `prepared.json` retains home `/home/agent`, work path, observer path and installed public-launcher `plugin list --json` registry query/output/root. `recipe.json`, `check.yml`, the empty `sessions/` directory and the explicit **partial/non-pass** note are all preserved. Cleanup assertion passed with `errors:[]`. This demonstrates the retained diagnostic artifact lifecycle for this deliberate failure; it is not full A0 acceptance or a reconstruction of R2's missing proof.

### Auxiliary identity, parser and PTY observations

- **Identity only:** `raw/version-only-identity.tar.gz` plus `raw/runtime-identity.ts` and the execution log retain the exact Docker argv, including `--rm --init --network none`, for clean IMG01 `omp --version`. Observed stdout was `omp/18.14.2`, exit **0**, no credentials, and the recorded post-run absence query was empty with exit **0**. This is version/source identity only, not A0.
- **Parser rejection only:** missing `prepare` and empty `prepare:[]` each produced real CLI exit **1** before evidence-directory/resource creation. `observations.json` records `evidenceCreated:false`; stdout/stderr and both original configs are retained. The missing case reports `Expected an array`; the empty case reports `Release installer, prepare and DIST-02 verifier argv are required`. Rejection is not an A0 pass.
- **Auxiliary PTY smoke only:** the preserved smoke execution log records real ShellIO input/output, redaction behavior, missing-observation deadline, and process exit **7** despite PTY EOF/terminal status **0**. It also records a real fresh IMG01 empty-HOME gate, and missing-model staging rejection before token injection with cleanup confirmed. Its helper roots include empty stores and complete logs; none is full A0 or model/category proof.

## Native-input API report — actual bundle, bounded conclusions

Read `raw/native-input-api/soroi-a0-input-facts-report.md` for the complete investigation and citations. The five source-report files were extracted read-only from readable JavaScript embedded in the installed **macOS native OMP 18.14.2** executable. Original `packages/.../*.ts` labels are retained, but their reported line numbers are **bundled-section-relative**, not original TypeScript checkout lines. The IMG01 Linux executable was not inspected. Installed npm 18.6.1 and checkout 18.12.6 were not used as version authorities. No raw native package/executable was copied.

The preserved report establishes these source facts, not a new runtime:

1. Roughly 700 characters alone do not trigger the raw-paste heuristic; newline content matters.
2. A single LF enters the base editor's newline branch. A CR/Enter can reach submit, but submission is discarded while `disableSubmit` is true.
3. A writable/rendered composer, prepare/banner output or `ESC[?2004h` does not establish application submission readiness. Source order places the first bracketed-paste enable before the stdin data listener, and bootstrap lifts the submit gate later.
4. Explicit bracketed-paste framing supports submit outside the pasted payload, but does not itself solve readiness. The native composer protocol exposes a separate `sendable` field.
5. Public positional initial prompts without `-p` use the real interactive TUI; the host awaits init then calls session `prompt`. This is distinct from initial keyboard text-entry/Enter coverage.

The report rejects a size-only paste explanation, but **cannot distinguish** R2's possible pre-raw CR-to-LF conversion from early submit gating using retained output alone. Public docs/Context7 results are older-index corroboration only, not exact-version authority; the report records a public-quota lookup without keys. No failed attempt was rerun by the investigator or archivist.

At handoff, Main and the discussion participants had accepted exploring native CLI initial prompt with `--`, preserving one exact prompt after stripping only its single old trailing CR, host-owned after-init dispatch, real TTY and all five fact obligations. This is recorded discussion/intent, **not an authoritative product decision, owner-published revised recipe, new CI release or observed successful run**. eng-dist still had to publish revised prepare/steps and a new CI artifact before the actual next formal attempt. Native keyboard/Hub/resume F20/F21 obligations under [#226](https://github.com/Pepgent/soroi/issues/226) are not covered by these records.

## Preservation, bounded scan and safe reproduction

`scan.json` records an actual bounded byte-pattern scan of **all 61 original regular files and all 61 published decompressed members/loose raw copies**, plus the new README, inventory, preservation metadata and scan report. Each individual input was limited to **32 MiB**; no input exceeded that bound. Recorded categories cover GitHub/provider tokens, AWS access IDs, private-key headers, bearer tokens, JWTs, credential-bearing URLs and long credential literals. The scan produced **zero pattern findings**. This is not a guarantee against every possible secret format. Findings would contain category/path/count only, never matched values. No credential store, SOPS, keychain or configured token/model/settings target was inspected. Raw evidence was not normalized or newly redacted by the archivist; the diagnostic snapshot's existing driver-side redaction is itself retained as-is.

For archival readback, extract only into a new `/tmp` workspace; do not chmod, edit, rerun into or overwrite the original frozen roots. For example, from this campaign's `F01/` directory:

```sh
WORK=$(mktemp -d /tmp/a0-failures-readback-XXXXXX)
tar -xzf raw/r1-failed-a0.tar.gz -C "$WORK"
tar -xzf raw/r2-failed-a0.tar.gz -C "$WORK"
tar -xzf raw/deliberate-prepare-failure.tar.gz -C "$WORK"
# Preservation-only example; requires the original frozen root still to exist:
cmp /tmp/soroi-full-a0-r2-36qhq4ut/evidence/pty/a0.txt "$WORK/soroi-full-a0-r2-36qhq4ut/evidence/pty/a0.txt"
```

These readback commands are instructions, not additional executed runtime evidence. Exact original commands and configs are retained above and in each group. Reproducing a real attempt requires the matching driver/release, actual installed runtime, ledger-managed dependencies and owner-injected credentials; use fresh `/tmp` output roots and working-copy configs. Do not follow historical credential paths merely to inspect them, do not treat stored configured values as observed behavior, and do not present the old failed recipe as the pending owner's new formal recipe.

**Remaining boundary:** no full A0 pass, no category-verifier pass for these attempts, no reconstructed R2 native proof, no new formal recipe/CI publication, and no keyboard/Hub/resume acceptance. Publication completes this archive only; those execution/acceptance tasks remain with their existing owners.
