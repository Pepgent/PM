# OMP independent main processes, Tern, and omp-peers

## Scope and evidence legend

This is a read-only operational investigation. No repository/configuration changes, process launches, messages to unrelated main sessions, Git history, or GitHub history were performed. Commands below are recipes, **not a claim that a second-process launch or message round trip was exercised**.

- **(U)** user intent, quoted from an identified session entry. No historical session evidence was needed for this bounded harness question.
- **(A)** assistant/agent interpretation or a report relayed by Main; not independent runtime observation.
- **(D)** current documentation or current installed source text, cited by URI/path and line.
- **(R)** output directly observed from the named command/tool call in this investigation.

Installed package paths in this report use `~ = /Users/mouriya`.

## Executive answer

1. **Tern is an installed multiplexing terminal, not an OMP agent kind or orchestration tier.** Its daemon owns terminal panes/programs; its CLI can create a pane or tab in a directory, run OMP in it, send input and capture output. OMP additionally supports Tern Surface Protocol native rendering. **(R: `command -v tern` → `/Users/mouriya/.local/bin/tern`; `tern --help` → `Tern — a multiplexing terminal`; D: `omp://tui-core-renderer.md:166-189`.)**
2. **A new `omp` invocation is the independent-process route.** Use a Tern pane or `xd://exec_command` PTY with an explicit target directory. `task`, Agent Hub and Collab are not equivalent: Hub manages subagents; Collab guests share the host’s existing session. **(D: `omp://cli-reference.md:33-49,69-88`; `omp://agent-hub.md:1-5`; `omp://collab.md:1-3`.)**
3. **Both independent main sessions must have the `omp-peers` extension loaded to exchange peer messages/questions.** There is no `omp-peers` enable setting. It is installed here; normal discovery loads enabled installed plugin extension entries. A deterministic per-launch route is `-e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts`, requiring no persistent configuration edit. **(R: `omp plugin list` includes `omp-peers@0.1.3`; D: `~/.omp/plugins/node_modules/omp-peers/README.md:13-23`; `package.json:14-18`; `index.ts:39-49`; `omp://extension-loading.md:55-76,120-124,144-165`.)**
4. **Use `peer_send` to give work/steering; use `peer_ask` only to ask what another main agent already knows.** `peer_send` adds an IRC card and wakes an idle recipient; a reply is a separate `peer_send` back to the source session ID. `peer_ask` returns a tool result from a tool-less side turn, without adding to the target conversation. **(D: `xd://peer_send/replies:1-8`; `xd://peer_ask/side-turns:1-11`; installed peers `src/local-main.ts:13-30,37-53,62-74`.)**
5. **These peer tools are main-session-only.** This investigator cannot call them successfully; direct `write xd://peer_list {}` returned `omp-peers tools are for main sessions only.` Main must execute peer discovery/send/ask. **(R: `write({path:"xd://peer_list",content:"{}"})`; D: installed peers `README.md:17`.)**
6. **RPC is a separate launch/control option over owned stdin/stdout, not a way to attach RPC to an arbitrary already-running TUI.** It does not require `omp-peers` for the controller to prompt/read its child. Peer networking and RPC can coexist if the extension loads in that RPC main session. **(D: `omp://rpc.md:1-8,19-35,128-159`; installed peers `index.ts:39-43` has only a `main` guard, not a TUI guard. A: no RPC attachment operation is part of the documented startup/control recipe.)**

## 1. What Tern provides here

### 1.1 Directly observed CLI surface

**(R: `tern --help`):**

```text
Tern — a multiplexing terminal
tern [DIR]                   open a window with a tab in DIR, beside the sessions the daemon keeps
tern -e COMMAND [ARGS...]    open a window with a tab running COMMAND in the current directory
tern ls|inspect|new|split|run|move|pip|dock|rename|focus|close|kill|wait|keep-open|send|capture|
    process|events|browser ...
tern daemon ...              the session daemon keeping panes' programs alive between windows
```

Tern’s “session” means a terminal grouping. An OMP main-session ID is a different object and is the address used by `peer_send`/`peer_ask`. Do not pass a Tern pane/session numeric ID to a peer tool. **(R: `tern ls --json` returns numeric session/tab/block IDs; D: `xd://peer_send:10-15`, `xd://peer_ask:10-15` require OMP session ID or unique prefix.)**

The current Tern daemon is available: `tern ls --json` returned a `Default` terminal session containing four live blocks, including:

```text
block 597292511920129: cwd /Users/mouriya/Ext/code/pepgent/pepgent
block 630892041076739: cwd /Users/mouriya/Ext/code/pepgent/pepgent-soroi
```

Both were reported as `program: /bin/zsh`, `live: true`; this inventory alone does not establish a new OMP process or prove peers are enabled in those panes. **(R: `tern ls --json`.)**

### 1.2 OMP’s Tern integration

OMP probes for Tern Surface Protocol with a `hello` query; a supported reply selects native semantic components, with terminal-owned layout and scrolling rather than ANSI row/history rendering. `PI_TUI_NATIVE=0` disables probing; `PI_TUI_NATIVE=1` forces it in environments that normally skip it. These are rendering controls, not process/peer enable switches. **(D: `omp://tui-core-renderer.md:166-189`; `omp://tui-runtime-internals.md:129-134`; `omp://environment-variables.md:653-654`.)**

### 1.3 The requested playbook tools are not independent-process launchers

Direct reads of `xd://playbook_open` and `xd://playbook_launch` returned `No such tool` in this worker. The package is nevertheless installed (`omp plugin list` includes `omp-playbooks@0.1.40`). **(R: those two `read` calls; `omp plugin list`.)**

The installed current implementation explains the distinction:

- The extension is active only in a daemon-managed Tern pane (`TERN_PANE` must be numeric); tools are registered only for main sessions. Thus these tools being absent from this subagent is expected, and does not prove they are absent from the leader. **(D: installed playbooks `README.md:64-66,94-101`; `src/extension/index.ts:34-49,534-537`.)**
- `playbook_open {doc}` connects the main session as coordinator to a Playbook YAML document service; it starts that document service in a pane to the right when none runs, or reuses an existing one. It does **not** mean “open a new independent OMP main agent.” **(D: installed playbooks `README.md:83-94`; `src/extension/index.ts:245-246,290-294`.)**
- `playbook_launch {op:"launch", blocks:[...]}` freezes compiled block text into a Launch record. The exact installed tool description says: `It starts no subagent; prefer playbook.agent/playbook.run in eval.` A Launch record is not an OMP process. **(D: installed playbooks `src/extension/index.ts:362-374`; `README.md:244-253,366-373`.)**
- The Playbook “Launch” button sends a request to its coordinator. The extension does not independently start/cancel a worker merely because that request arrived. **(D: installed playbooks `README.md:11-18`.)**

## 2. Getting omp-peers into a newly launched independent OMP

### 2.1 What is installed and what activates it

`omp plugin list` showed these relevant installed plugins:

```text
● omp-peers@0.1.3
● omp-playbooks@0.1.40
● omp-unified-exec@0.14.22
```

**(R: `omp plugin list`.)**

The peers package declares its extension entry as:

```json
"omp": { "extensions": ["./index.ts"] }
```

**(D: `~/.omp/plugins/node_modules/omp-peers/package.json:14-18`.)**

It has **no settings**. Each main session registers at `session_start`; subagents do not register. On shutdown it unregisters the main session and closes the process endpoint when the last main session leaves. **(D: installed peers `README.md:13,17,29-40`; `index.ts:39-49`.)**

Enabled installed plugins’ extension entries are discovered on normal OMP startup. `--no-extensions` disables that ambient discovery, but explicit `-e/--extension` files still load. An explicitly configured file also bypasses the `disabledExtensions` name filter. **(D: `omp://extension-loading.md:55-76,108-124,144-165`.)**

Therefore the precise, no-config-edit activation recipe for this machine is:

```sh
omp --cwd /ABS/TARGET/DIR \
  -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
```

That is a documented launch recipe, not an exercised second-process launch. Do not add `--no-extensions` as a general “make it independent” flag: it would suppress other normal project/plugin extensions. It is unnecessary for independence. **(D: `omp --help`; `omp://extension-loading.md:120-129`. A: recipe composes these documented options.)**

No separate `--peers`, `omp-peers.enabled`, Tern native-rendering flag, or Collab option is needed. Both the sender and recipient need loaded peers extension bindings and main sessions. **(D: installed peers `README.md:5,13,17,31-35`; `index.ts:32-43`. A: no peers setting exists per README; the enable mechanism is loading this extension.)**

### 2.2 Discovery scope and live identity

The endpoint is `/tmp/omp-<uid>/peers/<pid>.sock`, shared across profiles for one OS user. `/tmp/omp-<uid>` must be owned by that user and mode `0700`; the socket is `0600` and accepts the same user. It is not a network-wide directory or cross-user messaging system. **(D: installed peers `README.md:29-44`; `xd://peer_list/liveness:3-8`.)**

Peer tools discover fresh socket state on each call; there is no heartbeat/registry cache. A responding process is alive. A main session’s OMP ID changes on `/new` and resume, so discover again after those transitions. Entries listed under `Other omp processes without omp-peers` are only candidates and cannot be asked or messaged. **(D: `xd://peer_list/liveness:1-8`; installed peers `README.md:25,31-36`.)**

Main relayed the following observation while this investigation ran:

```text
reachable: pid 95745, session 01a193fd-e992-76d2-8c29-060fe52cc094,
           cwd pepgent-soroi
without omp-peers candidates: pids 31343, 46189, 75692, 82293
```

**(A: Main’s incoming task message beginning `Ack. peer_list from main session...`; this investigator did not independently execute a successful main-session peer list.)** This establishes the parent’s current discovery result, not why the other processes lack the extension. Their startup time, flags and plugin failures were not investigated; do not infer a specific cause.

## 3. Step-by-step Tern launch + command recipe

All commands in this section are **proposed commands** based on observed `--help`, not operations executed during the investigation.

### 3.1 Choose a terminal placement

1. List terminal sessions/tabs/blocks:

   ```sh
   tern ls --json
   ```

2. Use a block ID from that result rather than guessing which pane `@focused` denotes. To put a new independent OMP pane beside it:

   ```sh
   tern split BLOCK_ID right --cwd /ABS/TARGET/DIR -- \
     omp --cwd /ABS/TARGET/DIR \
       -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
   ```

   Use `down` instead of `right` for a vertical split.

3. Alternatively, create a tab in a specified terminal session:

   ```sh
   tern new tab TERN_SESSION_ID --cwd /ABS/TARGET/DIR -- \
     omp --cwd /ABS/TARGET/DIR \
       -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
   ```

4. Or create a named Tern terminal session with one tab:

   ```sh
   tern new session soroi-independent --cwd /ABS/TARGET/DIR -- \
     omp --cwd /ABS/TARGET/DIR \
       -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
   ```

**(R: `tern new --help` → `tern new session NAME [LAUNCH]`, `tern new tab [SESSION] [LAUNCH]`; `tern split --help` → `tern split BLOCK right|down [LAUNCH]`; both define `LAUNCH` as `[--cwd DIR] [--keep-open] [--end-on-success] [-- COMMAND...]`; `omp --help` documents `--cwd` and `-e/--extension`.)**

Tern target selectors can also be `SESSION/BLOCK`, titles/program names, or `@focused`; an explicit block ID is simplest to avoid directing text into an unrelated existing pane. Tern commands route to a window; `--window KEY` selects one explicitly. Without it they choose the pane’s window, else `$TERN_WINDOW_KEY`, else the first window. `tern inspect` reveals window keys; `--window ""` selects the first. **(R: `tern new --help`, `tern split --help`, `tern send --help`.)**

`--keep-open` retains a block after its program succeeds; it is not required to keep a currently running OMP alive. Do not use `--end-on-success` unless intentionally ending that entire Tern terminal session on successful program exit. Tern’s daemon is documented to keep pane programs alive between windows. **(R: `tern new --help`; `tern --help`.)**

### 3.2 Make “new process” and “fresh conversation” explicit

A fresh process does not alone guarantee a fresh conversation if `autoResume` is enabled. `autoResume` defaults to false, but resumes the newest conversation in the cwd when enabled. Do not use `--continue`, `--resume`, or `--restore` when the aim is a new conversation. **(D: `omp://settings.md:925`; `omp://session-operations-export-share-fork-resume.md:508-520`; R: `omp --help`.)**

Two documented approaches without changing saved configuration:

- **Keep standard persistent session storage:** launch as above; if it auto-resumes, issue `/new` in that *new OMP process* before giving work. `/new` starts a new conversation identity while retaining model/settings and refreshing project instructions. Check it completed and re-list peer IDs afterward. **(D: `omp://session-operations-export-share-fork-resume.md:206-219`; `xd://peer_list/liveness:6`.)**
- **Choose a dedicated empty session storage directory on launch:** add `--session-dir /tmp/omp-independent-UNIQUE/sessions` for an explicitly temporary run. The documented auto-resume condition excludes an explicit session directory; do not reuse this directory if freshness is the requirement. These sessions live under `/tmp` and are not durable across reboot. A durable intentional directory can instead be selected for real retained work. **(D: `omp://cli-reference.md:79`; `omp://session-operations-export-share-fork-resume.md:520`; R: `omp --help` describes session storage and lookup. A: choosing a new empty directory removes prior transcripts to select.)**

`--no-session` is available if persistence is intentionally unwanted, but it is not a default recommendation: it discards the session’s saved history. `--profile` isolates auth/settings/session storage/cache and is not required for a separate process or peer discovery. Avoid creating a profile just to launch a second agent. **(D: `omp://cli-reference.md:76-80`; installed peers `README.md:31`; R: `omp --help`.)**

### 3.3 Send input and inspect the new pane

After `tern ls --json` identifies the newly created block:

```sh
# Inspect native OMP text as well as ordinary terminal grid text:
tern capture NEW_BLOCK_ID --surfaces

# Type into the target OMP composer and submit:
tern send NEW_BLOCK_ID text 'Read the target directory instructions and report your current task.'
tern send NEW_BLOCK_ID keys Enter

# Or send a literal paste:
tern send NEW_BLOCK_ID paste 'A multi-line prompt can be passed as one quoted argument.'
tern send NEW_BLOCK_ID keys Enter

# Example of a control key (only when intentionally interrupting):
tern send NEW_BLOCK_ID keys Escape
```

**(R: `tern send --help` → `tern send BLOCK keys COMBO... | text TEXT | paste TEXT`; `tern help dev` documents key combos such as `Meta+k`, `Escape`; `tern capture --help` → `tern capture BLOCK [--html|--ansi] [--scrollback] [--surfaces]`, with `--surfaces` including native surface main-region text. A: `Enter` is the conventional submit combo in this composed recipe; no key was actually sent.)**

Use capture/peer discovery to verify startup is ready before submitting work; native OMP composer submission is gated during startup. **(D: `omp://tui-core-renderer.md:211-223`.)**

If starting with a shell-only pane instead of the direct `-- omp` launch:

```sh
tern new tab TERN_SESSION_ID --cwd /ABS/TARGET/DIR
# After identifying its block and observing a shell prompt:
tern run NEW_BLOCK_ID omp --cwd /ABS/TARGET/DIR \
  -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
```

`tern run` means “types COMMAND and Enter”; it is not a safe API for executing another shell command while that pane is already inside OMP. Prefer the direct launch form for a new main process, and peer tools for semantic commands after startup. **(R: `tern run --help` → `tern run BLOCK COMMAND... types COMMAND and Enter`; A: consequence of sending text to the currently running foreground program.)**

## 4. Step-by-step PTY alternative (`xd://exec_command`)

This is also a documented recipe, not an executed launch.

1. From the controlling main session invoke `write xd://exec_command` with:

   ```json
   {
     "cmd": "omp --cwd /ABS/TARGET/DIR -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts",
     "title": "Independent OMP in target directory",
     "workdir": "/ABS/TARGET/DIR",
     "cols": 120,
     "rows": 40,
     "yield_time_ms": 1000,
     "on_exit": "none"
   }
   ```

2. A running result returns a **PTY `session_id`** and a `terminal_url`. This is not the OMP main-session ID. Use `terminal_url` to inspect startup/output, or `xd://list_sessions` to list this run’s PTYs.

3. To send a prompt, read `xd://write_stdin/input` first, then:

   ```json
   { "session_id": 123, "chars": "Read your project instructions and state your task.\r", "yield_time_ms": 1000 }
   ```

   Substitute the actual PTY ID. `write_stdin` appends nothing, so include `\r`; empty writes are rejected. For reading, use the terminal URL rather than an empty write.

4. From the controlling main session, run `peer_list` to obtain the independent OMP session ID, then use `peer_send`/`peer_ask` as below.

**(D: `xd://exec_command:1-31`; `xd://exec_command/interactive:1-11`; `xd://exec_command/lifecycle:1-12`; `xd://write_stdin:8-19`; `xd://list_sessions:1-3`.)**

**Lifetime boundary:** this is an OMP-owned supervised PTY, not a detached independent supervisor. The docs define reclamation of returned terminals (30-minute timer, then a five-minute warning interval) and silent reclamation of returned terminals after the task’s final answer; reclamation kills the terminal’s background jobs. They do not justify promising indefinite survival after the controller finishes. Use Tern’s daemon-owned pane for a process whose terminal should be independently managed, or explicitly choose a persistent supervision mechanism in a separately authorized task. `on_exit:"wake"` is not process persistence and may only be set when the human asked for an exit wake. **(D: `xd://exec_command/lifecycle:3-12`; R: `tern --help` daemon description. A: PTY lifetime is controlled by its owner, unlike a separately managed Tern pane.)**

## 5. Step-by-step cross-process command and reply recipe

Run these **from an OMP main session**, not this subagent.

### 5.1 Discover the recipient

Read `xd://peer_list/liveness`, then invoke:

```text
write path=xd://peer_list content={}
```

Pick the OMP session ID matching the intended PID, cwd and title. Do not target `Other omp processes without omp-peers` candidates. Discovery is a snapshot, not pushed process tracking. **(D: `xd://peer_list:1-12`; `xd://peer_list/liveness:3-8`.)**

### 5.2 Assign work / steer / request a report

Read `xd://peer_send/replies`, then invoke:

```json
{
  "to": "TARGET_OMP_SESSION_ID",
  "message": "Work only in /ABS/TARGET/DIR. Read its project instructions. [Concrete bounded assignment and acceptance criteria.] When finished, use peer_send to report back to SOURCE_OMP_SESSION_ID; include changed paths, evidence and remaining work."
}
```

Send that JSON as `content` to `xd://peer_send`. The target receives an IRC card containing sender session ID, title, PID and cwd. It starts a turn if idle, or reads it at the next step without interrupting running tools. `Delivered` confirms injection only, not comprehension or completion. **(D: `xd://peer_send:1-17`; `xd://peer_send/replies:3-7`; installed peers `src/local-main.ts:8-30,62-74`.)**

### 5.3 How the answer returns

The recipient calls:

```text
write path=xd://peer_send
content={"to":"SOURCE_OMP_SESSION_ID","message":"[Results, evidence, blockers]"}
```

The source receives `Incoming peer message from another omp main agent (session …)` in its conversation, waking it when idle. **End the source’s turn rather than calling `wait` or polling `peer_list` for a reply.** A normal final assistant answer in the target’s own TUI is not itself a peer reply. No automatic reply tracking, read receipt or offline queue exists. Do not acknowledge replies that require no answer: each peer message may start another turn. **(D: `xd://peer_send/replies:4-8`; installed peers `README.md:23,35`; `src/local-main.ts:23-30`.)**

`agent://<id>`, `agent://all` and `wait` are the in-process Agent Hub/subagent communication surface. They cannot reach another OMP process. Cross-process “IRC” here is an `irc:incoming` custom-message card over the peers Unix socket, not an external IRC network/server to configure. **(D: `xd://peer_send/replies:6`; installed peers `README.md:5,23,31-35`; `src/local-main.ts:64-74`.)**

### 5.4 Ask about current knowledge without assigning work

Read `xd://peer_ask/side-turns`, then send to `xd://peer_ask`:

```json
{
  "to": "TARGET_OMP_SESSION_ID",
  "question": "From your current context, what exact interfaces and constraints have already been settled?"
}
```

The tool waits for a `/btw`-style side-turn answer and returns it directly as the caller’s tool result. The target uses its own model, system prompt and conversation, including current output; it cannot call tools and the question/answer is not added to its main conversation. It costs target model usage. This is unsuitable for “inspect the repo now”, editing, or work handoff; use `peer_send` for those. **(D: `xd://peer_ask:1-17`; `xd://peer_ask/side-turns:3-11`; installed peers `src/local-main.ts:13-20,37-53`.)**

Documented limits: message/question 64 KiB, answer 32 KiB with explicit truncation indication, one side question per target at a time, five-minute ask timeout. These are existing behavior, not newly proposed coordination machinery. **(D: `xd://peer_send/replies:7`; `xd://peer_ask/side-turns:5-10`; installed peers `README.md:34`.)**

## 6. Direct RPC control as an alternative

### 6.1 Launch and transport

Launch a separate child with owned pipes:

[Showing lines 1-300 of 383. Use :301 to continue]