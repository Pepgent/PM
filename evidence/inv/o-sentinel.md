# OMP sentinel: live observation recipe and exercised evidence

## Scope and evidence labels

This is a read-only investigation of observation/control surfaces, not a monitoring implementation. No repository files, configuration, Git state, or GitHub objects were changed. The only authored artifact is this requested report. No product tests or builds were run. (R: the calls documented below.)

- **(U)** direct user wording, ground truth of intent.
- **(A)** assistant interpretation or proposed operating recipe, not a user decision.
- **(D)** documentary contract; here this includes the mounted harness/tool documentation as well as any repository documents. No repository design claims are needed for this slice.
- **(R)** a concrete tool/command result observed during this investigation, including results retrieved through a session result-entry URL.

## 1. User intent

> 对于我交代的工作技巧，我推荐你理解，并实操后写到agents.md，并且对于工作上有错误的工作方法，要即时检查并修正。然后，因为taskmid一下的用量几乎无穷无尽，你可以使用各种外部哨兵观察session log，维护agent集群网络。

(U: session `01a193fd-e992-76d2-8c29-060fe52cc094`, entry `fd4be5a7`, 2026-11-01 07:20:21 +09:00; `session://01a193fd/entry/fd4be5a7`.)

> 这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩，并且要随时随地用agents.md主动维护好进度，对于需要排期实现，我推荐你使用一个agent作为秘书，pepgent专门存在pm仓库和对应的github project。对于独立的实现任务，你完全可以在指挥subagent，把某个subagent视作工具去操控tern，创建完全独立的全功能omp 进程和会话，并通过各种通讯工具指挥，而不依赖完全自己的subagent，把所有的活全部都揽给你，我推荐你在正式工作流程中，调查好核心思想后，你自己的session是领导人团队，而工程师，实现者，测试，则是tern中各自其他目录的完整agent，并且他们自己可以派生自己的subagent做实现。对于多面的任务，我推荐你fork自己作为分身专职处理，分身可以有效分担注意力。

(U: same session, entry `8544bdb8`, 2026-11-01 07:18:38 +09:00.)

The sentinel should observe worker sessions and report exceptions to leadership; it should not become an additional owner of worker state, task design, or recovery. This is the proposed narrow operational interpretation, not a new product requirement. (A: this report's synthesis of the two user statements above.)

## 2. Decisive findings

1. **Cross-session logs are readable from a subagent.** `session://` gives current rendered active-branch events, time/type filtering, exact entry detail, persisted subagent logs, artifacts and local files. The current leader session advanced while this investigator was reading it. (D: `session://README:12-26`, `:33-64`; R: §4.)
2. **`peer_*` is main-session-only here.** This investigator's `write xd://peer_list` with `{}` returned exactly `omp-peers tools are for main sessions only.` Therefore a subagent sentinel cannot itself obtain peer liveness or send peer messages. The leader must relay those operations, or the sentinel must itself be an independent main session. The latter is an operating option, not exercised here. (R: failed `write(path="xd://peer_list", content="{}")`; R: leader result `session://01a193fd/entry/f9123ea6`; A: operating-option inference.)
3. **The leader's peer ID equals the persisted session SID in the exercised case.** Peer result listed PID `95745`, SID `01a193fd-e992-76d2-8c29-060fe52cc094`, the expected cwd/title, and `busy`; `session://` metadata and the session header use that same SID. Do not assume one PID permanently means one SID: `/new` and resume change session IDs. (R: `session://01a193fd/entry/f9123ea6:18-22`; raw file header cited in §5; D: `xd://peer_list/liveness:5-7`.)
4. **Non-peer processes can still be observed through their persisted logs.** All four candidate PIDs returned by the leader were mapped to open session files using `lsof`; three also had terminal-to-session mapping records. `session://sessions.jsonl` enriches a known SID with cwd/title/status, but its documented metadata schema does not include PID, so it is not by itself a PID→SID map. (R: §6; D: `session://README:4-10`.)
5. **Activity, live process presence, running turn, and useful progress are different observations.** A newly recorded event proves activity; peer `busy` means the main turn was running at listing time; a process owning a file proves that association at observation time. None proves task correctness or productive progress. Silence does not prove a stall. (D: `xd://peer_list/liveness:3-8`; A: limits of §4/§6 observations.)
6. **`proc://`, `agent://`, and `history://` cover this OMP runtime's registered work, not a replacement for machine-wide peer discovery.** They exposed sibling tasks and nested mentors in the leader's run. No evidence supports treating absence there as absence of a separate OMP process. (D: `tool://read/runtime:3-5`; R: `read proc://`, `read history://`, specific mentor reads in §7.)

## 3. Surface selection and authority

| Surface | What to read | What it authoritatively supplies | What not to infer |
|---|---|---|---|
| `session://sessions.jsonl` | Narrow jq by SID/cwd | Persisted/indexed session metadata at read time | A `status` string is not peer liveness or proof of running progress |
| `session://<sid>/events.jsonl` | Narrow time window; selected event fields | Recorded active-branch event stream, including tool status and result-entry references | No new events does not identify why the session is quiet |
| `session://<sid>/timeline` | `type=` plus `since=`/`until=` | Human-readable active branch; user/assistant/IRC/dispatch/result chronology | Rendered `── idle` is not live idle detection |
| `session://<sid>/entry/<entry>` | Exact referenced event/result | Full recorded call arguments and/or result | A recorded success/result does not establish implementation correctness |
| `session://<sid>/agents/` | List then `.../<AgentId>/events.jsonl` | Persisted children of that external session | Root main-session silence does not imply children are inactive |
| `proc://` / `proc://<id>` | Current runtime job/agent inventory and detail | Owned/registered jobs, agent status/output, non-consuming reads | Not machine-wide process inventory |
| `agent://<id>` | Registered subagent ID | Latest published output, or status/progress before publication | Published prose is not independently verified evidence |
| `history://` / `history://<id>` | Registry then precise transcript | Registered/persisted subagent transcripts and parent relations | Not a discovery interface for every unrelated main session |
| `xd://peer_list` | Main-session device call | Reachable omp-peers endpoints, main-session busy/idle snapshot, and candidate non-peer PIDs | Stale socket existence is not liveness; non-peer candidate PID alone is not identity |
| OS `ps` + `lsof` | Known PIDs, narrow fields | Current PID/TTY and open file association | Open file/process existence says nothing about task completion |

(D: `session://README:4-31`, `:33-84`; `tool://read/runtime:3-6`; `xd://peer_list:1-12`; `xd://peer_list/liveness:3-8`. R: all rows were exercised as detailed below. A: negative inference limits in the last column.)

**Lifecycle boundary:** persisted transcripts outlive running tasks; a completed task may remain readable and a mentor may be idle/parked after returning. The main process owns its running sessions; a subagent registry identifies children of this run. Keep those states separate rather than copying them into a synthetic global status. (R: §7; D: runtime docs above; A: operating conclusion.)

## 4. Tested `session://` grammar and live observation

All examples below are `read` paths, not shell commands. The full exercised SID is `01a193fd-e992-76d2-8c29-060fe52cc094`; its unique prefix `01a193fd` resolved correctly. (R: actual reads listed below.)

### Discovery

```text
session://sessions.jsonl?q={sid,cwd,title,created,modified,status,parent}|select(.cwd|contains("pepgent"))&limit=6
```

Returned leader SID/cwd/title plus other Pepgent sessions. Paging returned a continuation URL with `offset=6`. The leader row initially reported `modified: 2026-10-31T22:30:54.363Z`, `status: pending`. (R: discovery read.)

### Human-readable bounded window

```text
session://01a193fd/timeline?type=user,say,dispatch,subresult,irc,tools&since=2026-11-01
```

Returned the leader's real user instructions, calls, dispatches and results. At the first snapshot it reported 90 active-branch entries and resolved the local-day filter to `[2026-11-01 00:00:00 +09:00, …)`. It included a historical `── idle 10m01s ──` between session start and the first prompt. That marker is a recorded timeline gap, not an assertion that the current process is idle. (R: timeline read; D: `session://README:28-31`, `:51-64`.)

### Structured events and reproducible cursor

```text
session://01a193fd/events.jsonl?type=tools,irc&since=2026-11-01T0727&q={sid,agent,t,kind,entry,tool,status,resultEntry,durMs,url}&limit=4
```

Returned tool events, e.g. call `7b738d1a`, tool `write`, `status: ok`, result `d2605cdf`, duration 60 ms; continuation froze the time bound to UTC. (R: event sample read.)

The **same absolute-window query** was then read twice:

```text
session://01a193fd/events.jsonl?since=2026-11-01T0727&q=reduce inputs as $e (.; $e)|{sid,agent,t,kind,entry,tool,status,resultEntry,url}
```

| Snapshot | Last recorded event time (UTC) | Entry | Kind | Status/result |
|---|---|---|---|---|
| First | `2026-10-31T22:31:46.370Z` | `1dc6302c` | `user` | null / null |
| Later | `2026-10-31T22:32:01.494Z` | `d540b87e` | `irc_out` | `ok` / `1ab61bc7` |

(R: the two reads above.)

The later event was opened through `session://01a193fd/entry/d540b87e`. It contains the leader's actual `write agent://OmpSentinel` relay of the peer snapshot; the full result of the peer operation was separately opened through `session://01a193fd/entry/f9123ea6`. Thus this is an observed live log advance plus resolved entry/result evidence, not merely a changed rendered heading. (R: those entry reads.)

### Error path

```text
session://01a193fd/events.jsonl?q=select(.status=="error")|{t,kind,entry,tool,status,resultEntry,url}&limit=5
```

Returned dispatch errors including `d071fea6` at `2026-10-31T22:27:26.886Z`, tool `task`, result `cd437d10`. Opening `session://01a193fd/entry/cd437d10` showed the actual task-policy refusal, beginning `你没有好好规划任务`, requiring oversized multi-topic assignments to be split. This demonstrates detection and full-result diagnosis of a real error without rerunning the failed operation. It is historical evidence inside this active session, not a newly discovered unresolved incident. (R: query and result-entry read.)

### Pending path and external session

```text
session://01a192a2/events.jsonl?since=2026-11-01T0727&q=reduce inputs as $e (.; $e)|{sid,agent,t,kind,entry,tool,status,resultEntry,url}
```

Read twice against a different process's Pepgent frontend session. Both returned `3a84e063`, `2026-10-31T22:32:52.776Z`, tool `wait`, `status: pending`, no result entry. The correct observation is “same pending wait record in both samples,” not “dead” or “hung.” Its metadata row simultaneously said `status: interrupted`, even though the record showed this recent pending wait and the process held the session file open. These are different source snapshots; do not collapse them into a guessed global status. (R: both external cursor reads; metadata query in §6; `lsof` below.)

### Persisted child path

```text
session://01a193fd/agents/
session://01a193fd/agents/OmpSentinel/events.jsonl?q=reduce inputs as $e (.; $e)|{sid,agent,t,kind,entry,tool,status,resultEntry,url}
```

Listing returned 26 child names including `OmpSentinel`, `SessEval`, `OmpTernPeers`. The child event query returned `sid` equal to the leader SID and `agent: OmpSentinel`; the last entry at that instant was its currently executing `read`, `bec10012`, with `status: pending`. Observer reads themselves create log activity, so the sentinel must not interpret its own events as worker progress. (R: agent listing and child query; A: interpretation.)

### Grammar cautions

- Time strings must avoid unescaped trailing colons: `T0727`, not `T07:27`; otherwise read may interpret the suffix as a line selector. Cross-day sessions require a date instead of ambiguous bare wall time. (D: `session://README:51-64`.)
- Type groups include `irc`, `subagent`, `tools`, `speech`, and `ai`; error queries must not exclude `dispatch` or `exec` by prematurely filtering only `kind == call`. (D: `session://README:33-49`; R: actual errors were `kind: dispatch`.)
- The active branch is the scope of timeline/events; raw JSONL may retain entries not represented there. Read `entry/@<physical-line>` for a raw hit rather than inventing an entry mapping. (D: `session://README:12-23`, `:80-84`.)
- Follow paging continuations. An empty narrow time window proves only no matching records in that window. A filter that excludes thinking/children can falsely look quiet. (D: README filter/paging contract; A: operational consequence.)

## 5. Actual session filesystem layout

The inspected root is `/Users/mouriya/.omp/agent/sessions`. It contains encoded project directories. In this case:

```text
~/.omp/agent/sessions/
  -Ext-code-pepgent-pepgent-soroi/
    2026-10-31T22-04-13-586Z_01a193fd-e992-76d2-8c29-060fe52cc094.jsonl
    2026-10-31T22-04-13-586Z_01a193fd-e992-76d2-8c29-060fe52cc094/
      OmpSentinel.jsonl
      OmpSentinel/
        OmpSentinel.SentinelMentor.jsonl
        OmpSentinel.SentinelMentor.md
```

(R: `read /Users/mouriya/.omp/agent/sessions`; `history://OmpSentinel.SentinelMentor` resolved its transcript path; `read .../OmpSentinel` listed the nested JSONL/Markdown files. `lsof` in §6 observed `OmpSentinel.jsonl`.)

The main JSONL header actually contains:

```json
{"type":"session","version":3,"id":"01a193fd-e992-76d2-8c29-060fe52cc094","timestamp":"2026-10-31T22:04:13.586Z","cwd":"/Users/mouriya/Ext/code/pepgent/pepgent-soroi"}
```

(R: `/Users/mouriya/.omp/agent/sessions/-Ext-code-pepgent-pepgent-soroi/2026-10-31T22-04-13-586Z_01a193fd-e992-76d2-8c29-060fe52cc094.jsonl:2`.)

Files named `.….jsonl.lock.os` were present alongside sessions, including old sessions. Their existence is not used here as process-liveness evidence. Use rendered `session://` first; raw files are a precise fallback for storage/layout/detail, not a reason to build a second parser/index. (R: directory listing; A: recommendation.)

## 6. Main processes, peer limitation, and PID→session mapping

### Direct peer evidence from leadership

This subagent's peer-list call was denied; the leader ran the same device successfully. The actual persisted tool result, not only the leader's paraphrase, says:

```text
1 omp process(es) reachable through omp-peers, 1 main session(s):
- pid 95745 (this process)
  - 01a193fd-e992-76d2-8c29-060fe52cc094 "󰡉 SOROI: 完成 Soroi 新版最小功能集合" — /Users/mouriya/Ext/code/pepgent/pepgent-soroi — busy (you)
Other omp processes without omp-peers (candidates; cannot be asked or messaged): pid 31343, 46189, 75692, 82293.
```

(R: `session://01a193fd/entry/f9123ea6:18-22`; call started `2026-10-31T22:31:54.490Z`, same result entry line 3.)

A peer process is considered alive when its Unix endpoint `/tmp/omp-<uid>/peers/<pid>.sock` accepts a connection. Stale socket files are excluded if connection fails. `alive, session list unavailable` means accepted connection but no session list within 2 seconds, not death. Busy/idle reflects whether the main turn was running at listing time. Non-peer records are candidates whose PID may be reused. (D: `xd://peer_list/liveness:3-8`.)

### Observed process/TTY identities

Executed once:

```sh
ps -p 31343,46189,75692,82293,95745 -o pid=,ppid=,tty=,comm=
```

Output:

```text
31343 87129 ttys004 18.14.1
46189 70195 ttys007 18.14.1
75692 24474 ttys000 18.14.1
82293   976 ?       18.13.3
95745 60749 stdin   18.14.2
```

(R: command output.)

### Direct open-file association

Executed once:

```sh
lsof -nP -p 31343,46189,75692,82293,95745 -Fn | grep -E '^p|^n.*(sessions|presence|project|peers|\.jsonl|cwd)'
```

The relevant main-session file associations were:

| PID | Session SID from observed open JSONL | Project / cwd confirmed by metadata |
|---|---|---|
| 31343 | `01a19298-17c1-77c3-aaa3-c175d2a4d5e3` | `/Users/mouriya/Ext/code/omomp/omp-remote-build` |
| 46189 | `01a192a2-8358-7559-bf46-e3ed6e387d73` | `/Users/mouriya/Ext/code/pepgent/pepgent` |
| 75692 | `01a19235-386c-71a4-a201-1e67a11a7e97` | `/Users/mouriya/Ext/code/colab` |
| 82293 | `01a1890a-ee2f-76f0-b56a-f22b41233574` | `/Users/mouriya/Ext/orca/project/o1` |
| 95745 | `01a193fd-e992-76d2-8c29-060fe52cc094` | `/Users/mouriya/Ext/code/pepgent/pepgent-soroi` |

(R: `lsof` command above, then `session://sessions.jsonl?q=select(.sid=="01a19298-17c1-77c3-aaa3-c175d2a4d5e3" or .sid=="01a192a2-8358-7559-bf46-e3ed6e387d73" or .sid=="01a19235-386c-71a4-a201-1e67a11a7e97" or .sid=="01a1890a-ee2f-76f0-b56a-f22b41233574")|{sid,cwd,title,modified,status}`; leader row/header above.)

PID `46189` also held `.../01a192a2.../SpacingCalibration.jsonl`; PID `95745` held many child transcripts and its peer socket. Distinguish the top-level timestamp+SID JSONL from children; do not choose the first arbitrary JSONL descriptor as the main session. The descriptor associations are point-in-time observations, not a permanent one-PID/one-session guarantee. (R: `lsof`; A: mapping rule.)

### Terminal mapping as corroboration/fallback

These files each contained cwd on line 1 and the exact main JSONL path on line 2:

- `~/.omp/agent/terminal-sessions/ttys004:1-2` → omp-remote-build / SID `01a19298…`.
- `~/.omp/agent/terminal-sessions/ttys007:1-2` → Pepgent / SID `01a192a2…`.
- `~/.omp/agent/terminal-sessions/ttys000:1-2` → colab / SID `01a19235…`.
- `~/.omp/agent/terminal-sessions/ttys009:1-2` → current Soroi leader / SID `01a193fd…`.

(R: direct reads of those four files.)

These records do not carry PID in the observed text. A grep for the five PIDs in the terminal-sessions directory found no matches. Use `ps` TTY as a correlation clue and `lsof` as the stronger direct association. No-TTY PID `82293` was successfully mapped with `lsof`; no fabricated terminal record was needed. (R: `grep` result, `ps`, `lsof`; A: fallback order.)

`session://sessions.jsonl` is therefore useful **after** obtaining the SID or project/file clue. It alone cannot identify which of multiple sessions in one cwd belongs to an arbitrary PID. File mtime/title/cwd similarity is not sufficient proof. (D: `session://README:9-10`; R: mapping evidence above; A: inference limit.)

## 7. Registered subagent/job surfaces exercised

- `read proc://` listed current sibling tasks and nested mentors, with statuses, elapsed runtime and current intents such as `Reading local artifact write rules`. It did not list the external non-peer main PIDs. Treat it as the owned/registered work view, not an OS process table. (R: runtime listing; D: `tool://read/runtime:5`.)
- `read history://` returned a registry with columns `id`, `status`, `kind`, `parent`, `last activity`; included `Main`, investigator siblings, and `OmpSentinel.SentinelMentor` under parent `OmpSentinel`. (R: registry read.)
- `read agent://OmpSentinel.SentinelMentor` returned its complete published advice. (R: exact resource read.)
- `read history://OmpSentinel.SentinelMentor` returned the request and response and resolved to a concrete nested transcript path. (R: exact resource read.)
- `read proc://OmpSentinel.SentinelMentor` returned task `completed`, duration `10.9s`, the result, and then text saying the agent is now `idle`. `history://` likewise showed `idle`; another completed mentor was `parked`. Completion of one assigned task and readiness/lifecycle of the registered agent are distinct. (R: exact resource read and registry; A: distinction.)

For external main sessions' children use `session://<sid>/agents/...`; `agent://SomeName` is a registered ID in this run, not a universal machine-wide lookup by a child's display name. Nested registered IDs use dots. (D: `tool://read/runtime:3-4`; `session://README:23-26`; R: persisted child read above.)

`proc://<id>` reads status/output without consuming eventual delivery. If a running command's output is hidden by a pipe, `proc://<id>/streams` and `/streams/<n>` expose already captured stream data; do not rerun the command merely to recover its output. No bash jobs/streams were created solely to test this optional branch. (D: `tool://read/runtime:5`; R: only task proc detail exercised.)

## 8. Concrete sentinel loop recipe

The following is an **(A) proposed bounded operating recipe**, derived from the exercised surfaces above. It is not an implemented daemon, a claim about current defaults, or permission to mutate worker state. Leadership supplies target ownership, monitoring duration/cadence and expected milestones. The sentinel is subordinate and exception-only.

### 8.1 Assignment contract

Give one sentinel:

```text
Role: read-only observer; no worker control, edits, restarts, tests, or new task design.
Leader: registered agent ID Main (or explicit peer session ID if independent main).
Targets: exact session SID(s), repository/cwd, owning engineer, expected current milestone.
Watch: both main events and named child agents relevant to the assignment.
Window: e.g. 3 observation rounds, spaced by leader/scheduler at 60 seconds.
Escalate: new relevant errors; explicit blocked/help messages; unexpected idle with work
          outstanding; no new activity beyond the leader's expected quiet interval;
          process/session disappearance or identity change.
Report: facts + entry/result URLs + uncertainty + one requested leader decision.
Do not: auto-retry, auto-restart, kill, edit, reassign, or infer completion from prose alone.
```

(A: proposed operational contract. The example 3×60s is not a documented harness behavior. Use a bounded re-dispatch/scheduler arrangement rather than an unbounded shell poller; ordinary `wait` is not a timer for foreign sessions.)

### 8.2 Initial snapshot

1. **Identify the targets at the source.** Leader runs `write xd://peer_list {}` and gives the sentinel SID/cwd/PID/status and the result-entry URL. For a non-peer process use the narrow `ps`/`lsof` mapping in §6 and confirm the SID via metadata/header. Re-list after `/new`, resume, or missing identity; do not keep an old peer ID indefinitely. (A recipe; D/R basis: §6.)
2. **Read the real task/milestone context.** Read the target's relevant latest user/IRC assignment and latest published result, rather than judging silence against an invented ETA. A pending wait, long computation, active child, or expected human pause changes how the observation is described, not the underlying records. (A recipe; R basis: external pending wait in §4.)
3. **Take separate snapshots, not one merged status.** Metadata; last recorded event; relevant main-turn/peer state from leader; current child/job status if available. Record each source and observation time. (A recipe; D/R basis: §§3–7.)

Suggested exact read paths, replacing SID and absolute time:

```text
session://sessions.jsonl?q=select(.sid=="SID")|{sid,cwd,title,modified,status,parent}
session://SID/timeline?type=user,say,irc,dispatch,subresult&since=2026-11-01T0730
session://SID/events.jsonl?since=2026-11-01T0730&q={t,kind,entry,block,tool,status,resultEntry,durMs,url}&limit=100
session://SID/agents/
```

(A templates; grammar exercised in §4. Follow returned pagination rather than assuming the first 100 events are the full window.)

### 8.3 Each observation round

1. Read events from the last observed absolute timestamp **inclusively**, covering the timestamp boundary. Compare `(SID, agent, entry, block, kind)` and observed `status/resultEntry` with the prior snapshot. A formerly pending call can acquire a result without needing a new call ID, so event-ID-only deduplication would miss a meaningful update. These are short-lived observer cursors/snapshots, not a new authority for worker state. (A recipe; D: inclusive written time units in README:59-64; R: pending/no-result and resolved-result shapes in §4.)
2. Include child streams when root silence is not decisive: `session://SID/agents/NAME/events.jsonl?...`. For this run, `proc://`, `agent://NAME`, and `history://NAME` add owned-job status/result detail; do not assume those names resolve outside this run. (A recipe; D/R basis: §§4,7.)
3. For every new error record, open **resultEntry**, not just the call's `url`, and read enough surrounding events to see whether it was already handled. For tool output that embeds a nonzero command result or a task's reported blocker, inspect the actual result even if the wrapper status is not `error`; do not rely on keyword grep as a universal error classifier. Do not rerun the failed operation. (A recipe; R basis: dispatch example §4; D: entry semantics README:19-20.)
4. If a source says quiet/idle/missing, correlate only with sources that can actually answer that question: leader peer snapshot for external main-turn liveness; OS mapping for non-peer process presence; owned proc task for an owned job; persisted events for what was recorded. If these disagree, report both. (A recipe; D/R basis: §§3,6,7.)
5. Send only a new exception or material change to the leader. Do not fill the leader's context with healthy heartbeat prose or resend historical failures as fresh incidents. End the assigned window with a compact observation summary and the next source cursor, then stop unless re-dispatched. (A recipe.)

### 8.4 How to classify, without claiming more than observed

| Observation | Sentinel wording | Leader action to request |
|---|---|---|
| New error result with unresolved task impact | “Recorded error: [exact operation/result]; no later resolution observed in window” | Decide whether owning engineer needs direction |
| Explicit worker `blocked`/help request | Quote exact entry and dependency | Resolve/reassign dependency; do not ask the sleeping user by default |
| Peer `idle`, work explicitly outstanding, no final deliverable observed | “Unexpected idle snapshot; assignment still appears outstanding” | Main-session `peer_ask`/`peer_send` to confirm intent |
| No event or pending-result change beyond expected quiet interval | “Possible stall / no recorded advance for X; last event Y; liveness Z/unknown” | Ask owner what it is waiting for; no automatic restart |
| Root quiet but relevant child/job advances | “Main quiet; child/job recorded activity advanced” | Usually no exception unless milestone is missed |
| Peer alive but session list unavailable | Exact peer result; do not label dead | Leader re-discovery/inspection as needed |
| Former peer absent / new SID | “Identity/liveness changed at listing; old SID now only persisted” | Leader re-list and remap current session |
| Completed task result exists | “Result published at entry Y; verification claim is [quote]” | Integration owner validates acceptance; sentinel does not certify correctness |
| Old `── idle` marker | “Historical gap inside viewed window” | None on that marker alone |

[Showing lines 1-300 of 331. Use :301 to continue]