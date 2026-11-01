# Actual A0 R4 failure archive

This directory preserves a frozen **failed** A0 run. It is not a new run, a product pass, or evidence that the downstream task completed. No source or raw-evidence bytes were edited, no runtime was rerun, and no failure was converted into a pass.

## Layout and preservation

- The complete contents of `/tmp/soroi-full-a0-r4-xnm280bs/` were copied directly into this `F01/` root, preserving their original relative paths.
- `publication/` is the complete frozen `/tmp/soroi-a0-r4-publication/` directory. These are supplied publication snapshots, not a fresh query of GitHub state.
- `raw-terminal/pi-unified-exec-91915-12-3afc0af7.log` is the exact supplied original terminal log from `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/`. Its 74 bytes contain the final failure JSON; it is not a full PTY transcript. The separately supplied `evidence/pty/a0.txt` and native session records are retained unchanged.
- `native-summary.json` and `terminal-plain.txt` are **main-generated derived inspection artifacts**, not replacement raw proof.
- `preservation/frozen-source-root.tar` is a clearly labelled full-source preservation container. It retains all original source members and bytes, including the empty `evidence/store/` directory that Git cannot store as a loose directory. It contains only the original frozen source root, not the publication copy or archive administration files. The empty directory remains empty; no marker was injected into it.
- `archive-inventory.json` records the source/publication inventories, byte totals, comparison method and bounded credential-scan result. `ARCHIVE.md`, that inventory, and the preservation container are archive administration artifacts, not original run output.

Direct preservation checks compared exact relative member sets, member types, file sizes and every regular-file byte in 65,536-byte blocks. All 16 original-source files (1,627,926 bytes), 17 publication files (183,333 bytes), and the original terminal file (74 bytes) matched their copies. The tar member set and every tar-contained regular-file byte also matched the original source; it retains six source directories plus the explicit root. No hashes were used as correctness evidence.

## Inspected archive facts

The archivist directly inspected the supplied verdict, cleanup record, verifier error and original terminal log:

- `evidence/verdict.json` reports `kind: fail` with exactly five failed assertions: `extension`, `agent`, `skill`, `rule`, and `settings`.
- The extension observation is an actual `dry_run` error opening `/tmp/soroi-a0/work/package.json`: `ENOENT: no such file or directory`.
- The downstream verifier observation and `evidence/proof/install-check-error.txt` report `Actual named product-worker invocation is missing`.
- `evidence/cleanup.json` has `errors: []`; the `a0-driver-cleanup` assertion is true. Successful cleanup does not make A0 pass.
- The supplied original terminal log contains the same five-failure verdict, not the process exit code. The CLI exit code below is a separately supplied execution observation from main, not inferred from this verdict.

## Execution observations supplied by main

The following are supplied observations and ownership statements, preserved as such; the archivist did not rerun the driver, recreate the terminal session, or independently re-evaluate the native trace:

- The actual command was `e2e/pty/a0-install.sh /tmp/soroi-full-a0-r4-xnm280bs/campaign.json`. Actual owner: `CI41276505949`. Manifest source `a5ac6d81ff67d2b9a4cf8b18fd7defb6fe45339f`, driver `cf4a47face2a0f5d94e55bf9b6ae02830bdb9c15`, and release `bb36f1e863fb5824369e1f5b449ac9d7c8b32dde2a2272d423980934722d6df3` identify the supplied run inputs only; these identifiers are not correctness proof.
- This was the same fresh-HOME public interactive positional-prompt recipe. Main verified the unique root line 6 user message is the exact recipe and `/exit` is not a user message.
- The header parser passed the actual title/session native layout. Actual root lines 11/13 used the exact `dry_run`, no pins or env arguments, then returned `isError: true` with the missing `/tmp/soroi-a0/work/package.json` error.
- Actual native line 17 listed only `nodes` and `node_modules` in the work directory; actual lines 26/29 showed `restoreLibrary` reading `cwd/package.json`.
- R4 contained no actual `soroi_task` invocation or child. Therefore its failure is not evidence of a broken child feature: this run did not exercise that feature. Do not borrow R3's `21 → 42` or worker `214` to fill this gap.
- Root line 36 recorded normal/dispose, but the model had continued read-only debugging after the evaluation error. Normal/dispose is not task completion and must not be described as such.
- **CLI exit code was 1.** Main separately observed `xd list_sessions` at `2026-11-01T05:24:55.212Z` return terminal 12 as exited with `exit_code=1` and zero running terminals. This is an observed process outcome, not merely a deduction from the failure verdict.
- Main posted the R4 result at <https://github.com/Pepgent/soroi/pull/266#issuecomment-6553884545> and notified the owner. The owner is responsible for the prepare/library input contract. This archive does not authorize driver file injection or weakening predicates.
- Full A0 did not pass; this is not closure evidence for <https://github.com/Pepgent/soroi/issues/235>.

The earlier immutable R3 archive remains separate and unchanged: <https://github.com/Pepgent/PM/tree/464ef062a2da1ce691881fd8ff4e10abea0a375c/evidence/e2e/20261101T051727Z-a0-native-header/F01>.

## Bounded obvious-credential scan

Before copying, the archivist scanned every regular file physically inside the two supplied frozen roots and the supplied original terminal log: **34 files, 1,811,333 bytes**. Limits were 8,388,608 bytes per file and 33,554,432 bytes total; no file exceeded either limit, no file was skipped, and no symlink or special member was present. Match counts were zero for each checked category: private-key headers, GitHub tokens, AWS access-key identifiers, Google API keys, Slack tokens, literal bearer tokens and obvious quoted credential assignments. No matched values were printed.

This is an obvious-pattern scan, not a guarantee that secrets are absent. It does not recognize arbitrary, encoded, obfuscated, unknown-format or semantic credentials. Paths mentioned inside config, logs or native records were not followed; no credential-file contents, SOPS or keychain were read. The derived preservation tar duplicates already-scanned source bytes and was checked by direct member/byte comparison rather than treated as new runtime evidence.

## Administrative scope

Only this `F01/` archive path is in scope for staging and publication to PM main. No product code, driver, host, shared service, design document, ledger, prior archive, issue, PR, or Project item was changed by this archival assignment. No builds, tests, linters, formatters or source runtime checks were run. The only verification performed was the explicitly requested archival inventory, direct member/byte comparison and bounded credential scan.
