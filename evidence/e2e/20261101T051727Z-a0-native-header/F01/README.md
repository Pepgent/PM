# F01 — A0 R3 fresh-HOME failure archive

**Disposition: FAIL.** This is an administrative preservation of the real run and its publication payload, not a new execution, a repaired proof, or a supplemental acceptance result. Both retained verdicts fail `extension`, `agent`, `skill`, `rule`, and `settings`. Native observations below do not override those verdicts or establish a five-category pass.

This README is **derived explanatory material written during archiving**. It is not an original run artifact. Every copied source file remains byte-for-byte unchanged.

## Run identity and retained result

The assignment records the actual entry as:

```sh
e2e/pty/a0-install.sh /tmp/soroi-full-a0-r3-ct7etnon/campaign.json
```

The recorded CLI exit was `1`. This command is recorded for provenance only; it was not rerun during archiving.

- Input CI identifier: `CI41276109573`.
- Owner contract: <https://github.com/Pepgent/soroi/pull/260#issuecomment-6553818587>.
- Source revision: `c05de99fc98fbb9155da01cb585064323b8bfb4c`.
- Driver revision: `cf4a47face2a0f5d94e55bf9b6ae02830bdb9c15`.
- Release identifier: `b2ad3470e334eed4b89b6b51d25426e333fcaaf0de1e739fb42be647767fd4c8`.

These identifiers identify inputs; they are not correctness evidence or a substitute for execution results.

The archiver inspected `evidence/verdict.json`, `evidence/proof/verdict.json`, `evidence/proof/install-check-error.txt`, and `evidence/cleanup.json`. The real verifier executed and reported:

```text
Error: Missing native session header
    at readTranscript (/tmp/soroi-a0/release/install-check/verify.js:318:20)
    at async main (/tmp/soroi-a0/release/install-check/verify.js:388:42)
```

Both verdicts preserve all five failed categories. The root verdict separately retains `a0-driver-cleanup` with `pass: true` and `observed: "[]"`; `evidence/cleanup.json` has `errors: []`. Cleanup success is not installation acceptance.

The assignment records the actual fresh-HOME gate at `2026-11-01T05:17:28.209Z` and final absent-confirmed at `2026-11-01T05:18:05.405Z`. The root verdict records `startedAt: 2026-11-01T05:17:33.439Z` and `endedAt: 2026-11-01T05:18:05.406Z`.

## Native observations and their limits

The following line observations were supplied with the archive assignment; this section does not represent an independently executed local verifier:

- Root native JSONL begins with `type: title`, then `type: session`; the child JSONL begins with `type: session`.
- Root `soroi_eval` retains the original `dry_run` call, without pins or env additions. Its actual CallReport reports `ran: central` and `install_output: 42`; the cited native lines are 11 and 13.
- Root `soroi_task` names `InstallCheckWorker` at line 14, with its result at line 17 and PID 214.
- The actual child uses the same model, `opencode-go/deepseek-v4.1-flash`. Child observation line 4 records `personality: none`, `approval: yolo`, and `idleTtlMs: 2000`; the archiver also inspected that retained observation through `native-summary.json`.
- The child has an actual successful `soroi_return` at the cited lines 39 and 41.

Root lines refer to `evidence/proof/sessions/2026-11-01T05-17-34-748Z_01a1958a-a89c-76cb-8944-e4fe4c5e2a1f.jsonl`; child lines refer to the sibling session directory's `InstallCheckWorker.jsonl`.

These observations remain subordinate to the retained failing result. No root-one-exact-prompt acceptance assertion is made by this archive. No raw proof was rewritten, no supplemental verifier pass was produced, and no source or runtime command was rerun.

## Copied material and layout

| Frozen source | Destination relative to this directory | Regular files | Bytes |
| --- | --- | ---: | ---: |
| `/tmp/soroi-full-a0-r3-ct7etnon/` | Contents copied directly here | 21 | 1,119,381 |
| `/tmp/soroi-a0-corrected-publication/` | `publication/` | 22 | 476,894 |
| `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-91915-11-45623514.log` | `raw-terminal/pi-unified-exec-91915-11-45623514.log` | 1 | 74 |
| **Total copied regular files** | | **44** | **1,596,349** |

The source tree has eight directories including its root; the publication tree adds one, and `raw-terminal/` adds one. Thus the copied tree has **10 directories including this F01 directory**, with two empty directories listed below.

The specified raw-terminal log is exactly 74 bytes: the terminal's JSON failure result, not the full interactive PTY transcript. It is copied without expansion or substitution. The full original PTY remains `evidence/pty/a0.txt`.

`terminal-plain.txt` was added by the main agent before the source-root freeze and is included in the 21 source-tree files. It is an ANSI-stripped **derived analysis** of the original PTY, not a replacement for raw evidence. `native-summary.json` is retained as the supplied summary, not substituted for native session JSONL.

The three deleted `*-identity-private.json` snapshots are not present, were not reconstructed, and were not sought in Trash. No credential path referenced by campaign/configuration data was followed.

### Empty-directory preservation

Git does not store empty directories. They were copied into the checkout, and the separately labelled **derived preservation container** `empty-directories.tar` retains exactly two directory entries and no file entries:

```text
evidence/proof/sessions/2026-11-01T05-17-34-748Z_01a1958a-a89c-76cb-8944-e4fe4c5e2a1f/InstallCheckWorker/
evidence/store/
```

The container is 10,240 bytes. From this F01 directory, `tar -xf empty-directories.tar` restores those two empty directories after a fresh checkout. The container does not introduce placeholders into the copied raw tree.

## Direct preservation checks

The archiver compared the source and copied trees' complete relative member names, member kinds, and file sizes. All **44 regular files / 1,596,349 bytes** were directly compared using byte equality, including `terminal-plain.txt`, all publication payload files, and the specified terminal log. The complete expected directory/member set matched, including both empty directories. The preservation container's member names were compared directly with those two empty directory paths; every member is a directory with zero payload and there are no file entries.

These checks establish copying fidelity only. They do not validate product behavior. No digest comparison was used as evidence.

## Independent bounded credential-literal scan

Before copying, the archiver scanned all **44 specified regular files / 1,596,349 bytes** without printing matched values. Bounds were **16 MiB per file** and **128 MiB total**; no file exceeded either bound and none was skipped.

Patterns covered private-key PEM headers, GitHub token prefixes (`gh[pousr]_` and `github_pat_`), common `sk-`/Slack/AWS access-key literals, long Bearer literals, and quoted long alphanumeric credential assignments for API keys, access/refresh/auth tokens, passwords, and client secrets. **Result: zero pattern matches.**

This is a bounded obvious-literal scan, not a guarantee of absence of secrets. It does not detect every provider format, short or obfuscated secrets, arbitrary unlabelled credentials, or encoded/compressed content. It did not unpack payloads, follow links or referenced paths, query credentials, validate credential activity, read gateway credential/model/settings files, or decrypt SOPS. The already-redacted source was not modified by the scan.

## Archive scope

Only this F01 archive directory was authored. No other evidence, design, product code, host, or shared service was changed. No build, lint, formatter, test, product runtime, or source-evidence rerun was performed. Publication response files are preserved snapshots; the archiver posted no issue or pull-request comments and made no Project changes.
