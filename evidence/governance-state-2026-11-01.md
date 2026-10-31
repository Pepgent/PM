# Governance state reconstruction — 2026-11-01

## Scope and evidence boundary

This is a read-only reconstruction of the governance state that was observable on 2026-11-01. It does **not** close issues, edit decision tables, commit, push, or change any ballot. The only requested write is this report itself.

Sources inspected:

- `history://Governance_e826`.
- The child list from `history://`; the only registered child whose name starts with `Governance_e826.` is `Governance_e826.LedgerU22`.
- PM decision issue listing for `Pepgent/PM`, label `decision`, state `all`.
- PM issue records and comments for every open decision issue: [#4](https://github.com/Pepgent/PM/issues/4), [#5](https://github.com/Pepgent/PM/issues/5), [#6](https://github.com/Pepgent/PM/issues/6), and [#7](https://github.com/Pepgent/PM/issues/7). All four open issue records currently report an empty comments array.
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`.
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/votes/`.
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/argon/`.
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/` working-tree status.
- `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/LEDGER.md` and `AGENTS.md`.

The ballot files below are therefore evidence files present in the PM working tree, not proof that every file was already committed or copied into the corresponding GitHub issue. The final issue state is kept separate from the evidence-file state.

## Executive state

| Decision | PM issue | State | Decision table currently observed | Governance state |
| --- | --- | --- | --- | --- |
| D1 | [#1](https://github.com/Pepgent/PM/issues/1) | **Closed** | Issue #1 body; source draft was `local://decisions/D1-org.md`, not present under PM `evidence/decisions/` | Complete. All 14 voted rows are recorded as 3/3; seven U20 rows are direct user instructions and were not voted. |
| D2 | [#2](https://github.com/Pepgent/PM/issues/2) | **Closed** | `evidence/decisions/D2-components.md` | Complete. Three rounds of amendments are reflected; issue comment records all rows as passed. |
| D3 | [#3](https://github.com/Pepgent/PM/issues/3) | **Closed** | `evidence/decisions/D3-network-mux.md` | Complete. Four rounds are reflected; issue comment records all rows as passed. |
| D4 | [#4](https://github.com/Pepgent/PM/issues/4) | **Open** | `evidence/decisions/D4-remote-exec.md` | Claude and argon have completed three rounds. LeadMentor's first-round objections were answered in the table, but no mentor round-2/round-3 ballot is present. Governance was waiting for mentor round 3. |
| D5 | [#6](https://github.com/Pepgent/PM/issues/6) | **Open** | `evidence/decisions/D5-plugins-eval.md` | Claude and argon have two rounds. The remaining governance hold was the eval-writer authority conflict. `evidence/argon/eval-writers-ruling.md` now exists in the working tree, but no follow-up ballot, PM comment, or issue close was observed. |
| D6 | [#5](https://github.com/Pepgent/PM/issues/5) | **Open** | `evidence/decisions/D6-store-service.md` | Ballots reach a fourth round and all three families are recorded as approving the final rows. The issue was still open and had no comments when inspected. |
| D7 | [#7](https://github.com/Pepgent/PM/issues/7) | **Open** | `evidence/decisions/D7-lab-backend.md` | Argon voted yes on all rows, but Claude/mentor counterexamples remain in the current table without an amendment round. Governance was waiting for D7 amendments and re-votes. |
| D8 | **No PM issue exists** | **Not opened** | **No `evidence/decisions/D8-*.md` file exists** | `evidence/argon/flow-catalog.md` supplies F01–F32, and `DrafterD8Scope` was still drafting the D8 table/acceptance matrix/work breakdown. No D8 ballot exists. |

The PM issue list observed was exactly: #7 OPEN, #6 OPEN, #5 OPEN, #4 OPEN, #3 CLOSED, #2 CLOSED, and #1 CLOSED. No #8 decision issue appeared.

---

## D1 — organization, identity, boundaries, communication

- **Issue:** [Pepgent/PM#1](https://github.com/Pepgent/PM/issues/1), **closed** (`COMPLETED`).
- **Current decision-table location:** The authoritative final table is in the issue body. The source table was `local://decisions/D1-org.md`; there is no `evidence/decisions/D1-org.md` in the PM checkout.
- **Final result:** D1-01 through D1-11 and D1-13 through D1-15 are all recorded as `Claude 赞成 / argon 赞成 / 导师 赞成`, therefore 14/14 passed. D1-12 and D1-16 through D1-21 are U20 user instructions, not ballot rows.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | R1 | `evidence/votes/D1-leader.md` | D1-01 through D1-15 all approve. |
| Claude — task:high | R1 | `evidence/votes/D1-high.md` | Objections on D1-01, D1-07, D1-12; other rows approve. |
| Claude — task:high | R2 | `evidence/votes/D1-high-r2.md` | D1-01, D1-05, D1-07, D1-08, D1-09, D1-10 all approve after amendments. |
| argon | R1 | `evidence/votes/D1-argon.md` | All 14 voted rows approve; U20 rows excluded from voting. |
| argon | R2 | `evidence/votes/D1-argon-r2.md` | Six amended rows approve. |
| LeadMentor | R1–R3 consolidated | `evidence/votes/D1-mentor.md` | R1 objections on D1-05 and historical D1-12; R2 changed D1-05 to approve; R3 rechecked D1-01, D1-05, D1-07, D1-08, D1-09, D1-10 and approved after response. |
| Final issue record | Final | PM issue #1 body and its single final-count comment | All 14 voted rows 3/3 passed. |

### Objections and counterexamples

All D1 objections have a recorded answer and final vote:

- The task:high D1-01 objection about leader overriding democratic voting was answered by splitting major technical decisions from repository-local implementation details and giving leader only the Claude-family seat.
- The task:high D1-07 objection about default Claude consumption and session reuse was answered with explicit quota inspection, a pre-defined GPT model, and an exclusive persistent session directory.
- The task:high D1-12 objection about identity-family vote multiplication and who classifies “missing/design supplement” was superseded by U20: one vote per Claude, argon, and mentor family, with the D1-16/D1-17 evidence and classification rules.
- LeadMentor's D1-05 concern about the model being pre-defined was answered with the U17/model-settings evidence; the later concern about AGENTS.md not pointing to `LEDGER.md` was answered by retaining one pointer and one ledger authority.
- LeadMentor's D1-07 worktree-overlap objection was answered by “one issue, one engineer” and a dedicated worktree.

The final issue comment explicitly says there are no unprocessed counterexamples or valid vetoes.

---

## D2 — component map and ownership

- **Issue:** [Pepgent/PM#2](https://github.com/Pepgent/PM/issues/2), **closed** (`COMPLETED`).
- **Current decision-table file:** `evidence/decisions/D2-components.md`.
- **Final result:** D2-01 through D2-25 all passed with Claude, argon, and LeadMentor approving the final text.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | Final combined ballot | `evidence/votes/D2-D3-leader.md` | D2-01 through D2-25 approve; this file also contains the D3 leader seat. |
| Claude — task:high | R1 | `evidence/votes/D2-high.md` | Objections on D2-02, D2-06, D2-12, D2-23, D2-25; other rows approve. |
| Claude — task:high | R2 | `evidence/votes/D2-high-r2.md` | Fifteen amended rows were re-voted; D2-12, D2-15, D2-20, D2-25 remained opposed pending worktree/cwd amendments. |
| Claude — task:high | R3 | `evidence/votes/D2-high-r2.md` | D2-12, D2-15, D2-20, D2-25 approve after the final worktree and two-stage-acceptance edits. |
| argon | R1 | `evidence/votes/D2-argon.md` | All 25 approve; no veto. |
| argon | R2 | `evidence/votes/D2-argon-r2.md` | Fifteen amended rows approve; no veto. |
| argon | R3 | `evidence/votes/D2-argon-r2.md` | Four final worktree/cwd rows approve; all 25 are then recorded as approved. |
| LeadMentor | R1–R3 | `evidence/votes/D2-mentor.md` | R1 objections on D2-07, 08, 11, 14, 15, 16, 20, 23, 25; R2 objections on D2-12 and D2-25; R3 approvals after amendments. |

### Objections and counterexamples

All D2 counterexamples are answered in the PM issue's final-count comment and/or the decision file:

- D2-02 now assigns remote `Agent` progress to the `RemoteChild` role and transfers it to the center on copy-out/commit.
- D2-06 now ends an in-flight Human replacement in the same step, keeps downstream consumption in that step, routes IRC through the writer contract, and wakes a parked root before routing controls.
- D2-07 distinguishes IaC's desired declaration from NetBird's runtime authority and records the license boundary.
- D2-08's orphan-process objection is explicitly treated as a failure branch; the main-path nesting and shutdown order are defined by D3.
- D2-11 now places the remote transcript on the persistent job volume and copies it out before removal.
- D2-12, D2-15, D2-20, and D2-25 were amended through the final worktree/cwd rounds: each root session has an independent persistent worktree, the central checkout is only a rebuildable near-copy, and the first acceptance segment uses a test client acting as Pepgent rather than claiming that every GUI/Lab flow runs without Pepgent.
- D2-14, D2-16, D2-23, and D2-25 received their persistent-database, single-owner, registry-deployment, release-installer, and clean-HOME responses.

The closed issue's final comment records three-family approval for every row and says no counterexample remained open.

---

## D3 — independent network layer and centralized omp RPC mux

- **Issue:** [Pepgent/PM#3](https://github.com/Pepgent/PM/issues/3), **closed** (`COMPLETED`).
- **Current decision-table file:** `evidence/decisions/D3-network-mux.md`.
- **Final result:** D3-01 through D3-19 all passed with all three families approving; argon did not veto.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | Final combined ballot | `evidence/votes/D2-D3-leader.md` | D3-01 through D3-19 approve. |
| Claude — task:high | R1 | `evidence/votes/D3-high.md` | Nine approve and ten oppose: D3-04, 05, 06, 09, 12, 13, 14, 15, 17, 19. |
| Claude — task:high | R2 | `evidence/votes/D3-high-r2.md` | Twelve amended rows approve. |
| Claude — task:high | R3 | `evidence/votes/D3-high-r2.md` | D3-04 and D3-12 approve after `--expose` and writer-owner amendments. |
| Claude — task:high | R4 | `evidence/votes/D3-high-r2.md` | D3-10 approves after the host-tool clarification. |
| argon | R1 | `evidence/votes/D3-argon.md` | All 19 approve; no veto. |
| argon | R2 | `evidence/votes/D3-argon-r2.md` | Twelve amended rows approve. |
| argon | R3 | `evidence/votes/D3-argon-r2.md` | D3-04 and D3-12 approve. |
| argon | R4 | `evidence/votes/D3-argon-r2.md` | D3-10 approves. |
| LeadMentor | R1–R4 | `evidence/votes/D3-D6-mentor.md` | R1 objections on D3-01, 07, 12, 13, 19; R2 D3-12 objection; R3 D3-04/D3-12 approval; R4 D3-10 approval. |

### Objections and counterexamples

The closed issue's comment records all of these as answered:

- Template-body conflict and stale Attach/Accept text (D3-04) were removed in favor of D4's `boot.js` contract.
- Text-only framing versus file-byte transfer (D3-05) was resolved by separating text RPC/mux frames from binary file payloads.
- Independent soroi deployment without `Pepgent/deploy` credentials (D3-06) was answered by making the deploying mux instance the credential owner.
- The stale old-plugin location and five-versus-six launch-step mismatch (D3-09) were corrected to `packages/omp-soroi` and six steps.
- Human IRC now has one writer-owned pending table with `enqueue/edit/withdraw/deliver`, including the root writer and child supervisor distinction (D3-12).
- Remote progress now uses pull through exposed capability directories rather than the rejected `--batch-dir`/`mux_batch` path (D3-13).
- Presence uses writer-declaration and generation lifetimes, so parked agents remain discoverable (D3-15).
- Agent images no longer bake a second soroi customization copy (D3-17).
- Per-writing-session endpoint names and `writers(runId)` resolve worker endpoint collisions and parked-session routing (D3-19).
- Mentor security-hardening objections about canonicalization, size limits, and credential checks are explicitly left to implementation rather than treated as design-stage main-path changes.

No outstanding D3 objection or procedural ballot is visible in the closed issue record.

---

## D4 — remote Program / Agent execution contract

- **Issue:** [Pepgent/PM#4](https://github.com/Pepgent/PM/issues/4), **open**.
- **Current decision-table file:** `evidence/decisions/D4-remote-exec.md`.
- **Issue state:** The issue body still has blank vote/result columns and the inspected issue record has `comments: []`.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | — | No separate D4 leader file was present; the governance/leader technical positions are referenced in the D4 table and adjacent ballots. | No separate file to count. Do not infer a missing leader ballot as a vote. |
| Claude — task:high | R1 | `evidence/votes/D4-high.md` | D4-05, 09, 18, 22 opposed; remaining rows approve. |
| Claude — task:high | R2 | `evidence/votes/D4-high-r2.md` | Nineteen amended rows approve; all 22 then approve in this family. |
| Claude — task:high | R3 | `evidence/votes/D4-high-r3.md` | Nine amended rows approve; all 22 remain approved. |
| argon | R1 | `evidence/votes/D4-argon.md` | D4-05, 08, 15 opposed; all other rows approve; no intent veto. |
| argon | R2 | `evidence/votes/D4-argon-r2.md` | Nineteen amended rows approve; all 22 approve. |
| argon | R3 | `evidence/votes/D4-argon-r3.md` | Nine amended rows approve; all 22 approve and no veto. |
| LeadMentor | R1 only | `evidence/votes/D3-D6-mentor.md` | D4-03, 05, 08, 09, 10, 12, 18, 19 opposed with concrete scenarios. No D4 mentor R2/R3 ballot is present. |

### Objections and counterexamples

The D4 table contains revisions or explicit responses for the first-round scenarios:

- D4-03 now restores dependencies from the Lab lockfile before bundling.
- D4-05, D4-07, and D4-21 use transfer staging rather than a formal-run volume path, preserving the no-store dry-run boundary.
- D4-08 uses the single `omp-rpc-mux`/`boot.js`/`--expose` contract.
- D4-09 adds both the soroi release customization and the Lab project `.omp/` customization; the mentor's request for version-capability checking is explicitly rejected because the cited user instruction says not to make the two omp binary versions a design concern.
- D4-10's token replay concern is explicitly left as implementation security hardening; the main path gives the token generation scope.
- D4-12 fixes the nesting order to agent identity → writer declaration → remote job/volume → body → process generation.
- D4-18 makes the environment identity include the immutable image/config identity rather than only the template name.
- D4-19 rejects conflicting template mappings for two outputs from the same call.

The **semantic** D4 counterexamples are therefore either incorporated or explicitly answered in the current table. The **procedural** objection remains: the amended D4 rows have no LeadMentor re-vote. Main/Governance state explicitly said D4 was waiting for the mentor's third round. D4 cannot be called finally counted from the observed evidence, even though Claude and argon are unanimously affirmative.

---

## D5 — plugin merge, Agent nodes, eval and Human paths

- **Issue:** [Pepgent/PM#6](https://github.com/Pepgent/PM/issues/6), **open**.
- **Current decision-table file:** `evidence/decisions/D5-plugins-eval.md`.
- **Issue state:** The issue body has blank vote/result columns and the inspected issue record has `comments: []`.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | — | No separate D5 leader ballot was present. The table cites leader technical ruling A and the D5 task:high ballot is the saved independent Claude seat. | Do not infer an absent separate leader file as a vote. |
| Claude — task:high | R1 | `evidence/votes/D5-high.md` | D5-02, 03, 12, 14, 15, 16, 19 opposed; other rows approve. |
| Claude — task:high | R2 | `evidence/votes/D5-high-r2.md` | Ten amended rows approve; all 19 approve in this family. |
| argon | R1 | `evidence/votes/D5-argon.md` | All 19 approve, no veto. |
| argon | R2 | `evidence/votes/D5-argon-r2.md` | Ten amended rows approve, all 19 remain approved, no veto. |
| LeadMentor | R1 only | `evidence/votes/D3-D6-mentor.md` | D5-02, 10, 11, 12, 16, 18 opposed with scenarios. No separate later D5 mentor ballot is present. |

### Objections and counterexamples

The task:high first-round objections were answered in the second-round table:

- D5-02 now starts the root omp through a writer plus `dial`, and copies customization into the remote environment instead of baking it into the image.
- D5-03 stores the child omp session id rather than a stale transcript-file path and reads it through the Lab/Mux path.
- D5-12 releases a batch on `soroi_return` completion by all report workers, not merely after a worker has submitted one step.
- D5-14/D5-15 register and route each `writesEval` session's control endpoint, so a worker-owned slot is reachable.
- D5-16 uses the online eval plugin's store response to send the human-origin IRC wake-up, rather than subscribing to its own write.
- D5-19 defines the recursive `report`-worker qualification consistently with `writesEval` and removes the fork language.

The shared mentor ballot also raised D5-10's `env` conflict, D5-11 visibility/name checking, D5-18 path/symlink safety, and the D5-02/D5-12/D5-16 issues. The current table addresses the main-path portions of these points; D5's own §7 explicitly leaves concurrency and path-safety hardening outside the design-stage main path.

There is one governance-level hold that must not be confused with the row-level second-round votes:

- `evidence/argon/eval-writers-ruling.md` is now present as an untracked working-tree file. It records Argon's `(U)`-based ruling that the user forbade eval recursion and remote-agent nesting, but did **not** forbid soroi's own central `soroi_task` report workers from writing eval steps. This resolves the apparent conflict between “only the main agent” wording in some flow/baseline prose and D2/D5 rows that allow central `writesEval` workers.
- At Governance/Main's last published state, this ruling was still pending: “D5 … held over a conflict: whether only the main agent may write eval steps … It has gone to Argon for a ruling backed by your words, or to the mentor if contested.” No follow-up D5 ballot, PM issue comment, or issue closure integrating the new file was observed. Thus the substantive question has a new Argon artifact, but the governance record remains open.

---

## D6 — store service, lifecycle, intervention and node library

- **Issue:** [Pepgent/PM#5](https://github.com/Pepgent/PM/issues/5), **open**.
- **Current decision-table file:** `evidence/decisions/D6-store-service.md`.
- **Issue state:** The issue body has blank vote/result columns and the inspected issue record has `comments: []`.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | — | No separate D6 leader ballot was present. | Do not infer an absent separate leader file as a vote. |
| Claude — task:high | R1 | `evidence/votes/D6-high.md` | D6-03, 13, 16 opposed; other rows approve. |
| Claude — task:high | R2 | `evidence/votes/D6-high-r2.md` | D6-15, 16, 18, 22 opposed after the first amendment round; other re-voted rows approve. |
| Claude — task:high | R3 | `evidence/votes/D6-high-r3.md` | D6-05 opposed; other re-voted rows approve. |
| Claude — task:high | R4 | `evidence/votes/D6-high-r3.md` | D6-05 and D6-16 approve after the separate end-request amendment. All 22 approve for this family. |
| argon | R1 | `evidence/votes/D6-argon.md` | All 22 approve, no veto. |
| argon | R2 | `evidence/votes/D6-argon-r2.md` | Fifteen amended rows approve, all 22 approve. |
| argon | R3 | `evidence/votes/D6-argon-r3.md` | Nine amended rows approve. |
| argon | R4 | `evidence/votes/D6-argon-r3.md` | D6-05 and D6-16 approve; all 22 approve, no veto. |
| LeadMentor | R1–R4 | `evidence/votes/D3-D6-mentor.md` | R1 has ten D6 objections; R2 has D6-05, 10, 13 objections; R3 approves nine amended rows; R4 approves D6-05 and D6-16. |

### Objections and counterexamples

The current D6 table and the shared mentor ballot record the following as answered through later rounds:

- `agent_progress` was added so remote Parquet progress has a table of its own rather than being forced into the closed event union.
- Transfer staging now owns uncommitted bytes and separates eval transfers from non-eval agent-generation transfers.
- The run-end race was resolved by a separate `POST /runs/{run}/end`: the supervisor confirms no active writers/unreleased batches and the store separately confirms no unconsumed atoms.
- Graph projection and activity-time reconstruction are separate; cross-run comparison returns `Ambiguous` rather than pairing by incidental submission order.
- In-flight derivation has an `InFlight` address and preserves the parent run's state until the derive transaction writes the abort and new run.
- Aborted remote Agent batches are included in `agent_progress` and retain the transcript session id for history review.
- Human-capture identity is computed from fields known before store assigns the run/step facts.
- Release import is represented as a store submission, with the release record and its constituent runtime artifacts recorded together.

No row-level D6 counterexample remained opposed after the fourth round. The remaining state issue is administrative: issue #5 was still open with no PM comments, so the final ballot material had not been reflected in a closed issue.

---

## D7 — Pepgent Lab business backend

- **Issue:** [Pepgent/PM#7](https://github.com/Pepgent/PM/issues/7), **open**.
- **Current decision-table file:** `evidence/decisions/D7-lab-backend.md`.
- **Issue state:** The issue body still says every row is “待投票”; its inspected record has `comments: []`.

### Ballots by family and round

| Family | Round | Ballot path | Observed result |
| --- | --- | --- | --- |
| Claude — leader | — | No separate D7 leader ballot was present. The task:high file includes the leader's four technical-position responses, but it is not a separate leader ballot. | Do not count an absent separate leader file as a vote. |
| Claude — task:high | R1 | `evidence/votes/D7-high.md` | D7-04, 05, 07, 11, 19 opposed; 16 approve. |
| argon | R1 | `evidence/votes/D7-argon.md` | All 21 approve, no veto; four end-of-document intent points also receive Argon rulings. |
| LeadMentor | R1 | `evidence/votes/D7-mentor.md` | Approves 11 rows and objects to D7-04, 05, 06, 07, 09, 10, 12, 15, 18, 19. |
| Later rounds | — | No D7 r2 ballot file present | Amendments and re-votes were still pending. |

### Outstanding objections and counterexamples

Unlike D2/D3/D6, the current D7 decision table has not been amended to close the concrete objections. The following are still outstanding in the observed table:

1. **D7-02:** the conversation/worktree ownership and the distinction between Lab-owned activity versus projected store lifecycle events need to be made explicit.
2. **D7-03:** the table cites an `X-Principal` handoff that is not the D3 frame contract; it needs to use the trusted reader frame's `principal` field.
3. **D7-04:** the current text still says the root session cwd is the shared Lab checkout. D2-12/D2-15/D2-20 require a per-conversation persistent worktree. The row also lists generation/token as dial arguments but does not include the generation/token environment required by D3-19 for endpoint registration.
4. **D7-05:** `lab_save_artifact` still uses `PUT /objects/{sha}`, which is not a current D6 write endpoint. An artifact needs a transfer/commit path or a worktree-authority path before it can become a store object.
5. **D7-06:** a launched draft needs an unambiguous pending-launch binding to the next non-derived `run_started`; “the next run” alone is not enough for repeated launches.
6. **D7-07:** the table still says discussion-origin artifact bytes go directly into the store object directory by relying on a “human upload” reading of D6. The cited D6 endpoint is transfer-scoped; the high/mentor response instead requires conversation-worktree authority and transfer on later formal use.
7. **D7-09:** the D5 control endpoint sketch currently lists `slots`, `answer`, `takeover`, and `writers`, but the row also calls `derive` and `abort`; the D5 interface and D7 row need to be synchronized. The in-flight derive sum type also needs to be carried through.
8. **D7-10:** the mentor objected to reusing `startWithoutApproval` as the automation approval gate; a distinct approval permission or explicit rule is required.
9. **D7-11:** there is no complete command/path to merge a node written in a conversation worktree into the Lab default branch, and existing conversation worktrees need a defined refresh after a default-branch update.
10. **D7-12:** the prototype `restart` mapping to `abort` does not restart a job. The row needs either a stop-only name or an abort-then-new-run path. The ownership and first-version scope of P4–P7 also need to be stated consistently with the Argon ruling.
11. **D7-15:** querying model availability from an arbitrary online conversation is not deterministic; the source conversation/generation or a dedicated catalog session must be selected.
12. **D7-18:** the command union exposes `cluster.connect` even though its execution owner is still a P7 placeholder. The unsupported command should be omitted/disabled for the first version and recorded for D9.
13. **D7-19:** the deployment row omits the persistent conversation-worktree volume and the `Pepgent/images` checkout/write credentials required by D7-11/D7-13. It also groups Lab DB and omp session state too broadly for the distinct owners in D2-20.
14. **AgentTemplate harness wording:** the current table still carries the prototype `harness` shape in its settings discussion. The Argon ruling says the old multi-harness enum conflicts with U13; `id` should be the omp agent definition name, or `harness` should be removed/narrowed to omp rather than becoming a second definition source.

These are not merely implementation TODOs: they are the specific main-path objections for which the task:high and/or LeadMentor ballots supplied amendments. No D7 amendment or re-vote file was observed, so D7 remains open.

---

## D8 — MVP acceptance, implementation plan and D9 gap method

- **PM issue:** None. The decision issue listing had no #8.
- **Decision-table file:** None under `evidence/decisions/` at the time of inspection. The requested target path for the active drafter is `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md`, but that file was not present.
- **Existing evidence:** `evidence/argon/flow-catalog.md` contains the F01–F32 catalog and explicitly presents it as the D8 e2e acceptance basis. It covers complete customization, eval, dry/formal, Program/Agent/Human capture, store, remote Komodo/Slurm, subagent/IRC, concurrency, intervention, GUI, node library, automation, Pepgent core use, and the eventual D9 gap report.
- **Ballots:** None. No Claude leader ballot, task:high ballot, argon ballot, or LeadMentor ballot exists for D8.
- **Current drafter state:** `DrafterD8Scope` was still running a newer turn. Its mentor feedback required a complete F01–F32 traceability matrix, including the observable final effect, authoritative component, implementation slice/prerequisite, real entry point, and evidence for every flow. The mentor specifically warned that F15 must prove the full Slurm path rather than merely Slurm reachability or a successful job.
- **Outstanding D8 objections/questions:** There is no formal vote yet. The mentor-listed unverified assumptions remain named assumptions for the D8 author: auth-gateway/broker contracts, OrbStack hostname reachability for every caller, Distribution consumption from both Docker and Apptainer, central Stack compatibility with Mux/store/Lab lifecycle, clean-HOME coverage of every D2 prerequisite, and the boundary between a test-client stand-in and real Lab behavior.

D8 is therefore a drafting/acceptance-plan stage, not a voted decision.

---

## Governance_e826 — exact end actions and pending requests

### Last actions visible in `history://Governance_e826`

The transcript's final concrete sequence is:

1. The parent session queued a harness restart to apply the todo-more fix, wake agents with IRC “继续”, create the governance clone, and record U22.
2. The restart-completed message states the restart occurred at `2026-10-31T22:56:56.603Z`.
3. After restart, the transcript records writes to `agent://ArchDrafterD2` and `agent://TallyD1`; the preceding plan says those messages were the “继续” wake-ups.
4. The next `fork_task` call, intended to create the governance clone, failed with: **“The parent session may still be running this tool; its outcome is unknown.”** The transcript then switches to the fork system notice. There is no successful governance-clone result in this transcript.

The separate child transcript `history://Governance_e826.LedgerU22` shows that the U22 ledger editor did complete its own assignment: it initialized its Todo after an edit gate, updated U22/R45/R52/R53/E8, and stopped after reporting completion. It later acknowledged U23 but explicitly did not write it because the parent had assigned that to a later ledger editor. No other `Governance_e826.*` child appeared in the history list.

The latest published status text for `Governance_e826` says: **“Now sending the mentor-driven amendments and rebuttals to each drafter.”** That status is not accompanied by additional concrete actions in the readable history transcript, so it is recorded as a status claim rather than treated as evidence that the amendments landed.

### Requests/governance work still pending at that boundary

The pending requests named by the governance/main status were:

- **D4:** obtain LeadMentor's third-round vote on the amended remote-execution rows. Claude and argon had already voted yes in round 3; the mentor evidence had only the first-round D4 objections.
- **D5:** obtain and integrate Argon's `(U)`-backed ruling on the conflict over whether only the root/main agent may write eval steps or whether central `soroi_task` report workers may write eval steps. The newly present `evidence/argon/eval-writers-ruling.md` addresses the semantic question, but the observed governance record had not yet re-balloted or commented/closed D5.
- **D7:** apply the task:high/LeadMentor amendments, then request the affected family re-votes. The current decision file still has the worktree, artifact-import, control-endpoint, library-merge, deployment-volume, and command-owner gaps listed above.
- **D6:** finish secretary-style counting/issue synchronization. The evidence files reach a final all-yes count, but PM issue #5 remained open with no comments.
- **D8:** finish the F01–F32 decision table, acceptance matrix, vertical-integration DAG, and D9 gap-analysis method; then open the PM issue and collect all three family ballots.
- **Closeout:** copy the final ballot/result record into the open PM issues' comments/body, close only issues whose counterexamples and family votes are complete, and preserve the distinction between a voted design and an implemented/runtime-verified product.

---

## `pepgent-pm` working-tree state observed before writing this report

The requested command was run as a working-tree check only:

```text
 M evidence/decisions/D4-remote-exec.md
 M evidence/decisions/D6-store-service.md
 M evidence/votes/D3-D6-mentor.md
?? evidence/argon/eval-writers-ruling.md
?? evidence/behavior/
?? evidence/votes/D4-argon-r3.md
?? evidence/votes/D4-high-r3.md
?? evidence/votes/D6-argon-r3.md
?? evidence/votes/D6-high-r3.md
?? evidence/votes/D7-argon.md
?? evidence/votes/D7-high.md
```

Interpretation:

- D4 and D6 decision tables were modified in the PM checkout and not committed at this observation point.
- The combined D3–D6 mentor ballot was modified.
- The Argon eval-writer ruling, behavior evidence directory, D4 round-3 ballots, D6 round-3 ballots, and D7 ballots were untracked.
- The report you are reading is an additional intentional uncommitted file: `evidence/governance-state-2026-11-01.md`. It was not part of the status output above and was not committed.
- No status result is being inferred for any other repository.

---

## Ledger and watchdog follow-up

### R61

`/Users/mouriya/Ext/code/pepgent/pepgent-soroi/LEDGER.md` line 279 records **R61 = `🔄`**. Its evidence says the low/free watchdog file exists, is disabled by default, uses `openai-codex/gpt-5.6-luna:max`, and that `FixWatchdog` was repairing the cached-cwd/worktree discovery problem.

The later `FixWatchdog` status reports that the source repair was completed, installed, and exercised in a real PTY, including a real `task:low` review. It also explicitly says: **the leader's existing harness still needs one restart to load the updated extension, and FixWatchdog did not restart the leader**. Therefore the ledger's `🔄` is materially accurate for the overall requirement: the source/runtime repair is done, but the leader-harness restart and ledger refresh remain unfinished. The watchdog remains default-off; enabling it is done by changing the file's `enabled` setting when drift evidence exists.

### OS-watchdog protocol

`/Users/mouriya/Ext/code/pepgent/pepgent-soroi/AGENTS.md` line 43 contains the standing OS-watchdog protocol:

- machine-watchdog session **`01a1943c`**;
- cwd `/Users/mouriya/Ext/work/o1`;
- inspect CPU, memory, disk, and the `/opt/homebrew` filesystem every 30 minutes;
- on “掉盘，立刻暂停”, the leader must kill all subagents, bash, and `exec_command` processes and wait for recovery;
- on high resource use, reduce concurrency.

This line is a standing operating rule, not a separate R-number. No execution acknowledgement for this protocol was present in the requested governance evidence, so it should not be reported as verified merely because the line exists.

### Other directly related unfinished ledger/project items

The ledger also still marks the U23/D8 deliverables R54–R57 as not started: complete installable soroi customization, all user-flow e2e acceptance, Pepgent agent-core invocation, and the post-runtime D9 point/line/surface gap report. Those statuses are consistent with the absence of D8 and any product implementation. R58 (U24 documentation cleanup) is still marked in progress even though Argon reports that the fork/omomp cleanup was applied; the ledger has not been reconciled to that newer evidence.

---

## Bottom line

D1–D3 are procedurally complete and closed. D4's row semantics and Claude/argon votes are complete, but LeadMentor's later-round vote is missing. D5's row-level second-round votes are affirmative, but the eval-writer ruling had not yet been integrated into a formal governance record. D6's evidence reaches an all-family final count, but the PM issue was still open. D7 has substantial unresolved amendment/re-vote work. D8 has a strong F01–F32 flow catalog but no decision table, issue, or ballots. The remaining project is therefore governance closeout plus the full implementation/e2e path, not a completed soroi MVP.
