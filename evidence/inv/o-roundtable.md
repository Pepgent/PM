# OMP roundtable inventory

## Scope and evidence convention

This is a read-only inventory of the two requested targets:

- `~/.omp/agent/omp-roundtable/`
- `~/.omp/agent/omomp.yml`

The report also reads the current `omp-roundtable` and `omp-peers` source/docs only to establish invocation and coordination semantics. Every conclusion is tagged:

- **(U)** = the user's own words in a session (intent authority).
- **(D)** = current repository/document text.
- **(R)** = observed file/listing/tool output.
- **(A)** = an interpretation of the cited evidence, not an independent source of intent.

No repository file, OMP configuration file, Git state, or GitHub object was modified. No OMP process was launched and no test was run; the evidence below is static file/source/session evidence.

## Intent baseline

The coordination question is broader than “does a worker run?” The user explicitly described a leadership team whose main session directs independent full OMP sessions and their agents:

> “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩，并且要随时随地用agents.md主动维护好进度，对于需要排期实现，我推荐你使用一个agent作为秘书，pepgent专门存在pm仓库和对应的github project。对于独立的实现任务，你完全可以在指挥subagent，把某个subagent视作工具去操控tern，创建完全独立的全功能omp 进程和会话，并通过各种通讯工具指挥，而不依赖完全自己的subagent，把所有的活全部都揽给你，我推荐你在正式工作流程中，调查好核心思想后，你自己的session是领导人团队，而工程师，实现者，测试，则是tern中各自其他目录的完整agent，并且他们自己可以派生自己的subagent做实现。对于多面的任务，我推荐你fork自己作为分身专职处理，分身可以有效分担注意力。”

(U; `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`, 2026-10-31T22:18:38.724Z)

The user also made the reusable coordination structure explicit:

> “对于创建可复用的工作能力，管理好总体的project，规划subagent身份，设计好各自的边界，和subagent沟通，成立领导小组，这是至关重要的事情。有了这些，才能稳步推进，我给你准备的subagent都是能力极高的ai”

(U; `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/1e21ce45`, 2026-10-31T22:26:09.832Z)

The separate peer requirement was stated as:

> “我现在想多做一个这样的插件，当前用户，运行中的各个omp agent可以知道，一共有多少omp，有哪些主agent活着，他们之间可以有不打扰的/btw式询问，然后还可以直接通过专用irc的对话机制，可以做到吗”

(U; `session://01a1928d-26e0-705f-8747-7bb677610a14/entry/a63a0259`, 2026-10-31T15:23:54.596Z)

## 1. `~/.omp/agent/omp-roundtable/`

### Observed shape

- The directory listing contains exactly one visible child, `key`; the listing reports it as 65 B and about one month old. No `state/`, `repos/`, `worktrees/`, or `sessions/` subdirectories are visible in this read. (R; `functions.read /Users/mouriya/.omp/agent/omp-roundtable`.)
- Reading `key` returns one line consisting of an opaque 64-character hexadecimal-looking value. The value is intentionally not reproduced here. (R; `functions.read /Users/mouriya/.omp/agent/omp-roundtable/key`, line 1.)
- A scoped search of the current `omp-roundtable` source for literal key-file access found no such access; the only matches were XML `<key>` tags in the macOS launcher plist template. This is a bounded source search, not proof about older or external code. (R; scoped `functions.grep` for `(['"]key['"]|/key|join(...key|readFile(...key)` over `/Users/mouriya/Ext/code/omomp/omp-roundtable/index.ts` and `src/`.)

### What the current roundtable code says this path is

- The current plugin registers `roundtable.dataDir` with the default `join(getAgentDir(), 'omp-roundtable')`. Therefore, when the default is used, this target directory is the plugin's intended agent-directory data root. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/index.ts:24-28`.)
- On coordinator startup, the plugin resolves that directory and passes it to the host and controller. The host uses child paths named `repos`, `worktrees`, and `sessions`; the agenda state port uses a `state` child containing `<agenda-id>.json` files. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/index.ts:63-92`; `/Users/mouriya/Ext/code/omomp/omp-roundtable/src/ports/host.ts:32-40`; `/Users/mouriya/Ext/code/omomp/omp-roundtable/src/ports/state.ts:53-99`.)
- The current source does not establish what the existing `key` file means. Nothing in the inspected current roundtable source connects that filename to an agent definition, a peer endpoint, a roundtable agenda, or a credential lifecycle. (A; derived from the target read, the bounded key-access search, and the current state-layout citations above.)
- The safe conclusion is therefore: **the directory is the current roundtable data-root location, but the existing `key` file is an opaque pre-existing artifact whose producer and lifecycle are unestablished by the inspected evidence.** It is not evidence that peer discovery or leadership coordination is enabled. (A; same R/D evidence.)

### How roundtable is actually invoked

- The package declares `index.ts` as its OMP extension entry and declares `workflowFile` as a native plugin setting with environment variable `OMP_ROUNDTABLE_WORKFLOW`. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/package.json:12-19`.)
- The documented installation path is `omp plugin install omp-roundtable`. The optional link launcher is installed with `/roundtable-launcher install` or `omp-roundtable-launcher install`; a clicked issue link is translated into `omp --roundtable <owner>/<repo>#<number>` in the linked checkout. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/README.md:11-27`.)
- `--roundtable` is the coordinator identity. At `session_start`, the extension parses the flag; without it, it returns an absent identity and does not start the coordinator. With a valid flag, it starts the Main coordinator, resolves the data directory, creates the controller/host, enables the `roundtable` tool, loads saved state, and sends the coordinator briefing. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/index.ts:35-40,63-92,109-124`.)
- The README states the same boundary: without `--roundtable`, there is no active `roundtable` tool, no roundtable timer, and no roundtable state. The coordinator Main calls the tool with a strict `{"input": ...}` object, beginning with `convene` for a new agenda or explicit `resume` for saved state. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/README.md:29-35`.)
- **The presence of `~/.omp/agent/omp-roundtable/` or its `key` file does not invoke roundtable.** The invocation trigger is the installed extension plus the `--roundtable` flag (normally reached through the launcher link). (A; derived from the source control flow and README citations above.)

## 2. `~/.omp/agent/omomp.yml`

### What the file is

- `omomp.yml` is a unified, top-level-section configuration file consumed by installed extensions. The loader maps each section ID to an extension directory name, does not deep-merge sections, and searches a project `.omp/omomp.{yml,yaml,json,toml}` before the agent-directory copy for ordinary cwd-aware sections. (D; `/Users/mouriya/.omp/agent/extensions/_shared/omomp.ts:7-18,37-45,89-120`.)
- The local extension contract says TypeScript files in `~/.omp/agent/extensions/` are auto-loaded by OMP at startup and apply to the Main and subagent sessions in that process. `omomp.yml` is therefore passive input; the extension hook, tool call, prompt event, or session event is what reads and acts on a section. (D; `/Users/mouriya/.omp/agent/extensions/README.txt:4-7`.)
- The target file currently contains sections for language nagging, input polishing, tool-policy nagging, task completion judgment, system-prompt replacement, document polishing, model compaction, config autoupdate, task split checks, child-memory warnings, shared judge fallback, UI language, and tool-topic injection. (D; `/Users/mouriya/.omp/agent/omomp.yml:1-113`.)
- There is no `roundtable`, `peer`, `omp-peers`, `leadership`, `peer_list`, `peer_ask`, or `peer_send` section in the target file. (D; `/Users/mouriya/.omp/agent/omomp.yml:1-113`.)

### Current section inventory

| Section in `omomp.yml` | Observed configuration | What invokes it / what it changes | Coordination relevance |
|---|---|---|---|
| `lang-nag` | `language: 中文`, `instruction: 说中文` | The main-session language hook judges the assistant reply and may prepend the configured instruction to the next user message; it writes no files and does not run on subagents. (D; `/Users/mouriya/.omp/agent/omomp.yml:1-3`; `/Users/mouriya/.omp/agent/extensions/lang-nag/index.ts:1-33`.) | No leadership or peer transport. |
| `input-polish` | `key: ctrl+enter`, instruction, `fallbackRole: smol` | Main-TUI Ctrl+Enter invokes an in-memory rewrite preview; Enter accepts it. (D; `/Users/mouriya/.omp/agent/omomp.yml:4-7`; `/Users/mouriya/.omp/agent/extensions/input-polish/index.ts:1-29`.) | No. |
| `tool-policy-nag` | Heuristic detector, form thresholds, risk thresholds, `pty: {}` | Watched tool calls are routed through heuristic/risk/PTY policy lanes; the section is read for each watched call. (D; `/Users/mouriya/.omp/agent/omomp.yml:8-20`; `/Users/mouriya/.omp/agent/extensions/tool-policy-nag/detector-config.ts:1-33,139-155`.) | It can constrain how an agent uses tools, but it does not discover, address, or relay agents. |
| `task-completion-judge` | `fallbackRole: smol` | A completion judge runs inside named `task:low`, `task:mid`, and `task:free` subagent sessions and can bounce an incomplete terminal yield. (D; `/Users/mouriya/.omp/agent/omomp.yml:21-22`; `/Users/mouriya/.omp/agent/extensions/task-completion-judge/index.ts:1-44`.) | **Indirect worker coordination only:** quality/hand-off gating, not peer communication or leadership state. |
| `system-prompt-replace` | Three literal/regex replacements; one is scoped to `sub` | A `before_agent_start` hook rewrites final system-prompt text in the main or subagent session according to scope; it does not create an agent or route a message. (D; `/Users/mouriya/.omp/agent/omomp.yml:23-35`; `/Users/mouriya/.omp/agent/extensions-last/system-prompt-replace/index.ts:1-53,148-183`.) | No direct coordination. |
| `doc-polish` | `concurrency: 8` | The `polish_doc` tool or `/polish-doc` command uses three purpose-specific helper sessions (split, polish, check); the section controls fallback role/concurrency. (D; `/Users/mouriya/.omp/agent/omomp.yml:36-37`; `/Users/mouriya/.omp/agent/extensions/doc-polish/index.ts:1-35,99-127`.) | **Indirect, local helper orchestration:** it is not a leadership roundtable and does not connect independent OMP processes. |
| `model-compaction` | One regex rule for GPT models at 650,000 tokens | A main-session `before_agent_start` hook maps matching models to native compaction thresholds; subagents follow the main runtime layer. (D; `/Users/mouriya/.omp/agent/omomp.yml:38-41`; `/Users/mouriya/.omp/agent/extensions/model-compaction/index.ts:1-62`.) | No. |
| `omp-config-autoupdate` | `enabled: true` | At OMP start or on demand, the updater applies/synchronizes omp-config and reports changes/conflicts. (D; `/Users/mouriya/.omp/agent/omomp.yml:42-43`; `/Users/mouriya/.omp/agent/extensions/omp-config-autoupdate/index.ts:1-32,61-87`.) | Configuration maintenance only; no agent-to-agent coordination. |
| `task-split-check` | `fallbackRole: smol` | A `tool_call` hook checks `task`/`fork_task` items for multiple topics and report-length caps; flagged dispatches are blocked, while a clear item can pass. (D; `/Users/mouriya/.omp/agent/omomp.yml:44-45`; `/Users/mouriya/.omp/agent/extensions/task-split-check/index.ts:1-30`.) | **Indirect worker coordination:** improves assignment partitioning, but does not choose a leader, maintain a team roster, or carry messages. |
| `child-memory-warning` | `thresholdGiB: 4` | The Main monitors owned descendant process memory and emits warnings; it makes no model calls, signals, or automatic kills. (D; `/Users/mouriya/.omp/agent/omomp.yml:46-47`; `/Users/mouriya/.omp/agent/extensions/child-memory-warning/index.ts:1-15`.) | Operational observability only. |
| `judge` | `fallbackRole: tiny` | Shared judge users resolve the OMP judge chain and then this configured fallback role when needed. (D; `/Users/mouriya/.omp/agent/omomp.yml:48-49`; `/Users/mouriya/.omp/agent/extensions/_shared/judge.ts:16-43,103-115`.) | Judgment support, not coordination transport. |
| `omomp-lang` | `language: zh` | Shared human-facing language selection reads this agent-directory section once per process after `OMOMP_LANG`; plugins use it for labels/notifications. (D; `/Users/mouriya/.omp/agent/omomp.yml:50-51`; `/Users/mouriya/.omp/agent/extensions/_shared/i18n.ts:5-23,34-46`.) | **Indirect presentation support only:** it can make roundtable/peer labels Chinese, but it does not enable either plugin. |
| `tool-topic-injection` | Rules for SSH/archive/SQLite/JSON/document/forge/runtime/web/grep topics | Main/sub tool-result and turn-start hooks inject relevant topic guidance; no section means the hook is off. (D; `/Users/mouriya/.omp/agent/omomp.yml:52-113`; `/Users/mouriya/.omp/agent/extensions/tool-topic-injection/index.ts:1-23`.) | Documentation/prompt support only; no peer or leadership channel. |

## 3. Leadership roundtable versus peer coordination

### Leadership / roundtable: direct but narrowly scoped support

- The roundtable plugin itself is a leadership-style delivery coordinator for a GitHub issue graph: Main chooses which independent tickets can run concurrently and which dependency edges serialize delivery; the workflow seats an owner and independent reviewer roles. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/README.md:1-3,29-39`.)
- The coordinator's startup briefing says Main decides serial/parallel topology and exceptional rulings, while the state machine owns GitHub writes and seat relays. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/src/runtime/coordinator.ts:10-20`.)
- Roundtable seats are not general peers: the host source explicitly says a seat reports to Main through its ticket, “never as an IRC peer,” and creates the seat session with IRC disabled. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/src/ports/host.ts:206-208`.)
- **Verdict:** `omp-roundtable` helps the requested leadership workflow **when the work is expressed as a GitHub issue graph and run through a dedicated `--roundtable` Main session**. It supplies agenda/ticket/workflow ownership and seat handoffs. The target `omp-roundtable/key` file and target `omomp.yml` do not themselves create that leadership team. (A; derived from the invocation, workflow, seat-boundary, and target-file evidence above.)

### Peers: not provided by these targets

- The separate `omp-peers` plugin is the component that directly implements the peer requirement. Its package declares an OMP extension entry, has no settings, and documents `peer_list`, `peer_ask`, and `peer_send` for cross-process Main sessions. (D; `/Users/mouriya/Ext/code/omomp/omp-peers/package.json:1-18`; `/Users/mouriya/Ext/code/omomp/omp-peers/README.md:5-27`.)
- `peer_list` discovers live processes and their Main sessions; `peer_ask` uses a `/btw`-style side turn without adding to the target conversation; `peer_send` injects an IRC message into the target conversation. (D; `/Users/mouriya/Ext/code/omomp/omp-peers/README.md:15-25`.)
- The peer plugin is enabled by installing/loading its own extension package, not by adding a section to `omomp.yml`. Its README states that it has no settings. (D; `/Users/mouriya/Ext/code/omomp/omp-peers/README.md:7-13`.)
- The target `omomp.yml` can affect peer **presentation language** because its `omomp-lang: {language: zh}` section is one of the language sources used by `omp-peers` for labels. It does not make `peer_list`, `peer_ask`, or `peer_send` exist, discover sockets, or relay messages. (D; `/Users/mouriya/.omp/agent/omomp.yml:50-51`; `/Users/mouriya/Ext/code/omomp/omp-peers/README.md:25-27`.)
- **Verdict:** for cross-process peer discovery, side questions, and IRC, these two targets provide **no direct coordination mechanism**. The separate `omp-peers` plugin is the relevant component; `omomp.yml` contributes only the shared UI-language input. (A; derived from the two plugin manifests/READMEs and the target configuration.)

### How this maps to the requested leadership-team model

- The user's desired “leader session + independent full OMP sessions + communications” is a composition of mechanisms, not one feature in these two targets. (U; `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`, 2026-10-31T22:18:38.724Z.)
- `omp-roundtable` supplies the **single-process Main leadership/state-machine lane** for issue delivery and deliberately keeps seats on ticket handoffs rather than peer IRC. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/src/runtime/coordinator.ts:13-20`; `/Users/mouriya/Ext/code/omomp/omp-roundtable/src/ports/host.ts:206-208`.)
- `omp-peers` supplies the **cross-process Main-to-Main discovery/ask/IRC lane**. (D; `/Users/mouriya/Ext/code/omomp/omp-peers/README.md:5,15-36`.)
- `omomp.yml` supplies **cross-cutting policy, prompt, language, model-judgment, and resource settings** that may run in Main/subagent sessions; it is not the registry, scheduler, leader, or peer bus. (D; `/Users/mouriya/.omp/agent/extensions/_shared/omomp.ts:7-18,89-120`; `/Users/mouriya/.omp/agent/omomp.yml:1-113`.)

## 4. What is configured elsewhere

- The current roundtable package includes `agents/roundtable-owner.md` and `agents/roundtable-reviewer.md` in its published files, and its README says installation supplies both agents. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/package.json:7-8`; `/Users/mouriya/Ext/code/omomp/omp-roundtable/README.md:37-54`.)
- Model bindings for those roles are a separate native `task.agentModelOverrides` setting in `~/.omp/agent/config.yml`, not a section in `omomp.yml`; the current local config contains `roundtable-owner` and `roundtable-reviewer` entries. (D; `/Users/mouriya/.omp/agent/config.yml:54-75`.)
- The roundtable workflow selection is also separate from `omomp.yml`: the package's `omp.settings` declares `workflowFile`, `OMP_ROUNDTABLE_WORKFLOW` takes precedence, and otherwise `convene` reads a workflow file from the data directory or the built-in workflow. (D; `/Users/mouriya/Ext/code/omomp/omp-roundtable/package.json:12-19`; `/Users/mouriya/Ext/code/omomp/omp-roundtable/README.md:121-133`.)
- These separate locations explain why searching `omomp.yml` for a roundtable role or peer endpoint would be the wrong invocation test. (A; derived from the cited package/config contracts.)

## Final answer matrix

| Question | Answer | Evidence |
|---|---|---|
| What is `~/.omp/agent/omp-roundtable/`? | The default current roundtable data-root path; the present directory contains only an opaque `key` file, whose purpose is not established by current source. | (D) `index.ts:24-28`, `host.ts:39`, `state.ts:53-99`; (R) target directory/key reads; bounded key-access grep. |
| How is that directory invoked? | It is used only after the installed extension starts a coordinator from `--roundtable <owner>/<repo>#<number>`; directory presence alone does nothing. | (D) `index.ts:35-40,63-92,109-124`; `README.md:25-35`. |
| What is `~/.omp/agent/omomp.yml`? | Agent-directory extension configuration, with top-level sections mapped to extension IDs and project-overrides for most cwd-aware sections. | (D) `_shared/omomp.ts:7-18,89-120`; target `omomp.yml:1-113`. |
| Does `omomp.yml` directly invoke roundtable? | No. It has no `roundtable` section; roundtable uses its extension flag/tool and native plugin settings. | (D) target `omomp.yml:1-113`; `package.json:12-19`; `index.ts:35-40,109-124`. |
| Do the targets provide leadership roundtable coordination? | The plugin does, narrowly for GitHub issue-graph delivery; the target files only support it indirectly (data root and UI language). | (D/A) roundtable README/source citations above. |
| Do the targets provide cross-process peer coordination? | No. `omp-peers` is a separate extension with `peer_list`, `peer_ask`, and `peer_send`; `omomp.yml` only supplies its optional UI language input. | (D/A) `omp-peers` package/README and target `omomp.yml:50-51`. |
| Do they help generic multi-agent work? | Yes, indirectly: task splitting, completion judging, document-polish helper sessions, memory warnings, prompt/tool topics, and model/judge fallbacks. They do not form a leadership roster or peer network. | (D) the section inventory and extension-hook citations above; (A) final distinction. |

## Verification boundary

- (R) The requested targets were read directly. Current roundtable, peer-plugin, loader, and hook sources/docs were read for invocation tracing. Session records were read only for the user's coordination intent and exact quotations.
- (R) No code/config edit, test, OMP launch, peer call, Git history read, or GitHub issue/PR history read was performed in this investigation.
- (A) The unresolved meaning of `omp-roundtable/key` is intentional: current evidence identifies the directory's roundtable data-root role but does not identify that individual file's owner or lifecycle.
