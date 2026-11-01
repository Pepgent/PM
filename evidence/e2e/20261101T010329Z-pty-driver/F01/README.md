# F01 — PTY driver evidence (E2E02)

**Scope: real PTY behavior, a real IMG-01 clean-HOME precondition, and a deliberately failing A0 staging attempt. Full A0 did not pass.** Live full-A0 delivery remains owned by [soroi #235](https://github.com/Pepgent/soroi/issues/235); the driver implementation is tracked in [soroi #218](https://github.com/Pepgent/soroi/issues/218). This archive does not close either issue or substitute fixture metadata for live-release evidence.

## Provenance and command

- Archive campaign: `20261101T010329Z-pty-driver` (actual UTC archival time).
- Tested source, supplied by the execution owner: `Pepgent/soroi`, branch `test/218-pty-a0`, revision `c17c64afc79f99bf49a2a277c6c6a57dfba1d9e5`. The revision identifies source only; it is not runtime proof.
- Executed command: `bun run --cwd e2e pty-smoke`; the execution owner's final `exec_command` exited **0**. Its unchanged output is [exec-command.log](exec-command.log), beginning with the invoked package script `$ bun run pty/smoke.ts`. The raw log does not itself contain the outer terminal's exit-status metadata.
- Source evidence: `/tmp/soroi-pty-proof-ERrexS/{local,image-gate,staging-rejection}`.
- Source terminal log: `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-91915-1-8e2ce044.log`.
- [resource-ledger.jsonl](resource-ledger.jsonl) contains exactly five unchanged JSONL rows from `/Users/mouriya/Ext/work/orbstack/pepgent-e2e-pty.jsonl`, filtered by the literal evidence-root path `/tmp/soroi-pty-proof-ERrexS/`. Rows retain their original order and bytes; they were not reserialized. The two original `docker run` argv arrays, including exact image, network, container names and shell scripts, are in the `declared` rows.

## Observed results

| Path | Observed outcome | What it establishes |
| --- | --- | --- |
| Real local PTY input/output | Process exit `0`, PTY terminal status `0`, `terminalClosed: true`, 65 bytes; transcript contains `tty-ready` and `reply=[REDACTED]` | A real PTY was bidirectional; the synthetic input was redacted in persisted output. |
| Missing observation | `Error: PTY observation deadline: will-not-arrive` | The expected missing-marker rejection was observed; it was not a successful A0 path. |
| Process exit versus PTY EOF | Process exit `7`, PTY terminal status `0`, `terminalClosed: true`, 0 bytes | A failing child exit remains distinct from successful PTY EOF/closure. |
| IMG-01 clean-HOME gate | [gate.json](image-gate/gate.json): process exit `0`, PTY status `0`, closed `true`, `fullA0: false`; [transcript](image-gate/pty/empty-home.txt) shows an empty HOME and no `.omp` before injection | A new real container of `pepgent-registry.orb.local:5000/pepgent/omp-agent:latest` satisfied the bounded precondition, not the full installer/category-verifier flow. |
| Negative staging attempt | `docker cp` exited `1` because `/private/tmp/soroi-a0-negative-fAVHdv/missing-models.yml` did not exist | Staging failed before token injection. [a0-error.txt](staging-rejection/a0-error.txt) preserves the failure and stack. |
| Final negative A0 result | [verdict.json](staging-rejection/verdict.json): `result.kind = "fail"`, `failed = ["a0-driver"]` | The root verdict remains failed despite the smoke harness exiting `0` for observing its intended negative. Its build fields are explicitly `fixture`, not a live release. |
| Cleanup | `a0-driver-cleanup.pass = true`, observed `[]`; [cleanup.json](staging-rejection/cleanup.json) has `errors: []`; filtered ledger records `absent-confirmed` for both created containers | The original execution confirmed Docker absence and successful driver cleanup. No Docker probe was rerun during archiving. |

The unchanged nested `staging-rejection/README.md` contains the driver's generic reproduction command `bun run --cwd e2e a0 /absolute/path/to/a0.json`; that is not the command executed for this campaign. No live installer, same-release category verifier, provider request, or complete A0 success is claimed here.

## Raw preservation and archival checks

The three source directories are copied unchanged and browsable. [source-directories.tar](source-directories.tar) additionally preserves the complete original directory structure, including empty `store/` directories that Git cannot represent on their own. All ten original files were compared byte-for-byte both against the browsable copies and against their corresponding tar member streams. No source file was rewritten or sanitized during archival.

Archival verification performed successfully, without rerunning tests, builds, formatters, or runtime scenarios:

- `diff -rq` for each of the three source/copy directory pairs: exit `0` (no differences).
- `cmp` for the raw terminal log: exit `0`.
- `LC_ALL=C awk 'index($0, "/tmp/soroi-pty-proof-ERrexS/") { print }' /Users/mouriya/Ext/work/orbstack/pepgent-e2e-pty.jsonl | cmp - resource-ledger.jsonl`: exit `0`, run with the campaign prefix on the destination filename.
- `tar -xOf source-directories.tar <original-relative-file> | cmp - /tmp/soroi-pty-proof-ERrexS/<original-relative-file>` for all ten files: exit `0` each. `tar -tf` also confirmed all three empty `store/` directories are present.
- `jq -e` checks parsed the final failed IDs, the true cleanup assertion, empty cleanup error list, `fullA0: false` gate with exit/status `0` and closed `true`, and exactly five lifecycle rows including two `absent-confirmed` records: all exited `0` and returned `true`.

Byte comparisons establish archival fidelity only; the command output, PTY transcripts, verdict, cleanup record and lifecycle rows establish the bounded runtime observations above.

## Credential boundary

The execution owner used only synthetic noncredential inputs. Inspection of the tested smoke harness confirms that its local PTY input is a generated synthetic value and its staging token file contains only a fixed synthetic noncredential; no real provider or gateway token was read or injected. In the driver, copying staging inputs precedes `session.send(token)`; the observed missing-models copy failure therefore occurred before injection. The archived PTY transcript ends at the empty-HOME gate, with no injection marker.

Before writing this README, all copied raw text records were scanned for the synthetic secret prefix (covering both known synthetic input forms), common provider/GitHub token patterns, bearer values and private-key headers: **no matches**. The local transcript retains `reply=[REDACTED]`. Tar members were byte-compared to those same raw files. This is a bounded known-value/pattern check, not a claim to detect every possible secret encoding; no real provider/gateway credential store was opened for comparison.
