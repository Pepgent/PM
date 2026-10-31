# Inventory: `pepgent-omp-soroi-subagent`

## Scope and evidence legend

**(U)** is a verbatim user-intent statement. **(D)** is a statement made by repository documentation. **(A)** is this agent's interpretation of the inspected working-tree artifacts; it is not runtime proof. **(R)** is an observed repository/tool result, including the permitted Git metadata commands and the filesystem/search observations.

This is a read-only static inventory of `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-subagent`. No repository file was edited, and no install, typecheck, build, plugin-load, subprocess, RPC, lifecycle, IRC, persistence, test, smoke, or end-to-end path was executed. Therefore, source findings establish that an implementation path and declared contract are present, not that the package works at runtime.

The assigned request was:

> **(U)** “Describe: purpose, how it loads into omp, implemented features, tests/e2e scripts, build/test commands, docs, what is stub, `git remote -v`, current branch.”  
> Citation: `session://01a193fd-e992-76d2-8c29-060fe52cc094/agents/RepoSubagentPlugin/entry/6244be3a` (2026-11-01 07:30:58 +09:00).

The broader user boundary relevant to this repository is:

> **(U)** “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远”  
> Citation: `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b` (2026-11-01 07:14:14 +09:00).

That boundary is consistent with treating this package as one omp extension repository, not as the complete Soroi or Pepgent product.

## 1. Purpose

**(D)** `README.md` describes the package as an omp plugin that runs Soroi subagents as separate `omp --mode rpc` processes. It says the plugin does not modify omp; instead, each child is represented by an RPC-backed session registered in omp's own `AgentRegistry`, so omp's built-in lifecycle manager, IRC bus, `wait`, `agent://`, `history://`, and Agent Hub are intended to drive it (`README.md:1-3`).

**(A)** The source has the corresponding two-process architecture:

- `src/main/` owns the main-process supervisor, registry-facing session adapter, and RPC transport.
- `src/child/` installs the bridge inside the child `omp --mode rpc` process.
- `src/protocol.ts` defines the environment, host-URI, host-tool, and IRC-envelope wire contracts.
- `src/index.ts` chooses the main or child installer before exporting the extension (`src/index.ts:1-35`).

The narrow purpose is therefore an out-of-process Soroi subagent implementation that attempts to preserve omp's native subagent lifecycle and communication surfaces while keeping each Soroi child in its own omp process. This inventory does **not** establish that the broader Soroi design or complete Pepgent product is implemented here.

## 2. How it loads into omp

### Package registration and manual loading

**(A)** `package.json` declares the package as an ESM package and exposes `./src` as its package files. Its omp metadata registers `./src/index.ts` as an extension (`package.json:1-16`). The only package script is `check` (`package.json:18-20`).

**(D)** The README documents both supported loading forms:

```sh
omp plugin link /path/to/omp-soroi-subagent
# or
omp -e /path/to/omp-soroi-subagent/src/index.ts
```

(`README.md:5-9`). No loading command was executed in this inventory.

### Main/child role selection

**(D)** The README says the same extension entry is loaded in both the main and child processes. The main process sets `SOROI_SUBAGENT_ID` and `SOROI_SUBAGENT_PARENT` for each child; their presence selects the child role (`README.md:10-11`).

**(A)** `src/index.ts` implements that selection at module initialization:

1. `childIdentityFromEnv(process.env)` checks the two environment variables.
2. When both are present, the extension resolves to the child role and later calls `installChild`.
3. Otherwise it constructs a `Supervisor`, installs the `ensureLive` revival wrapper before other lifecycle calls, and later calls `installMain` (`src/index.ts:16-35`).

The protocol constants and parser for these values are in `src/protocol.ts:13-29,68-73`.

### Child command construction

**(A)** `Supervisor.#argv` constructs the child command from the current executable and session file. The command includes `--mode rpc`, `--session <child-session-file>`, `--approval-mode yolo`, `--no-context-files`, `--no-ui`, copied main-process `--config` overlays, the package's `child.config.yml`, `-e <same-extension-entry>`, optional model/thinking/tools flags, and an appended system prompt (`src/main/supervisor.ts:263-285`).

**(A)** The child environment copies the inherited environment except `PI_SESSION_ID` and `PI_SESSION_FILE`, then injects `SOROI_SUBAGENT_ID` and `SOROI_SUBAGENT_PARENT` (`src/main/supervisor.ts:550-557`). `src/child.config.yml` supplies the documented child overlay `personality: none` (`src/child.config.yml:1-2`).

**(D)** The README additionally states that children inherit the user's plugins, settings, agent definitions, skills, and rules, while using `--no-context-files`, `personality: none`, and approval mode `yolo` (`README.md:17-20`). This is a documented/configured intent, not an exercised load result.

## 3. Implemented source areas

The items below mean that the inspected source contains the described implementation path. They do not mean that the path has been compiled or executed in this slice.

### Main tool and spawn ownership

**(A)** `installMain` registers an essential main-process tool named `soroi_task`. It rejects calls from a non-main agent, requires a persisted root session, passes the current cwd/model/context/tasks to `Supervisor.spawn`, and returns the allocated ids and pids (`src/main/index.ts:21-55`).

**(A)** `Supervisor.spawn` discovers agent definitions, allocates a non-conflicting id, builds an `AgentSpec`, writes a transcript header and Soroi sidecar, launches the RPC child, registers a `sub` `AgentRef` with status `running`, creates the parent-owned result job, and prompts the child with the assignment (`src/main/supervisor.ts:152-193`). Assignment context is prepended to each task by `assignment` (`src/main/supervisor.ts:481-483`).

**D** The documented tool contract says `soroi_task` accepts optional shared `context` and task records with `task`, optional `name`, and optional `agent`; it returns ids immediately and publishes each result as a task result when the child calls `soroi_return` or its turn settles (`README.md:13-21`).

### RPC process transport

**(A)** `RpcProcess` starts a Bun subprocess with piped stdin/stdout, reads newline-delimited JSON frames, waits for a `ready` frame, sends id-correlated commands, settles `response` frames, forwards ordinary frames as session events, and answers `host_tool_call` and `host_uri_request` frames through configured handlers (`src/main/rpc-process.ts:45-163`). Closing stdin and awaiting process exit is the defined disposal path (`src/main/rpc-process.ts:85-92`).

**(A)** The transport types distinguish RPC commands/events, host-tool results, host-tool calls, and launch handlers (`src/main/rpc-process.ts:10-43`).

### Registry-facing session adapter

**(A)** `RpcAgentSession` is the main-process stand-in stored on the omp registry ref. It exposes the structural session members that the built-in registry/lifecycle/IRC/URL consumers read, including identity, cwd, session manager metadata, mirrored messages, streaming state, settings and async-job-manager access through the main session, prompt/abort/dispose operations, IRC delivery, and session statistics (`src/main/agent-session.ts:39-126,157-193,195-249`).

**(A)** It loads transcript messages through the RPC `get_messages` command and folds `agent_start`, `message_end`, and `session_settled` events into its mirrored state (`src/main/agent-session.ts:128-150`).

**(A)** `asHostSession` and `asToolSession` are explicit structural type-boundary casts because the plugin cannot construct omp's full in-process session classes; the source comment identifies this as the single type boundary (`src/main/agent-session.ts:237-249`). This is an intentional adapter boundary, not evidence of an empty feature.

### Lifecycle, persistence, and revival

**(D)** The README assigns state ownership to omp's registry/lifecycle manager, the child's session manager, the built-in tombstone marker, the plugin's result file, the plugin's relaunch sidecar, and live plugin bookkeeping (`README.md:43-51`). It documents running/idle, idle-TTL parking, revival, kill/aborted state, killed-agent revival, and main-process restart behavior (`README.md:53-62`).

**(A)** `Supervisor.installRevival` wraps the global lifecycle manager's `ensureLive`. When a registry ref has a session file but no live session and a matching `.soroi.json` sidecar, it prepares a revival; aborted refs are reopened and their tombstone is removed, then the ref is adopted with the current idle TTL and an RPC reviver (`src/main/supervisor.ts:105-143`).

**(A)** The supervisor writes a fresh session header to `<id>.jsonl`, writes `<id>.soroi.json` with parent/cwd/launch data, reads the sidecar to reconstruct a launch spec, and uses the same transcript path when relaunching (`src/main/supervisor.ts:509-534`). The source comments distinguish durable transcript/sidecar state from live process/runtime state (`src/main/supervisor.ts:1-10`).

**(A)** After a child settles, the supervisor mirrors the event, marks the registry ref idle, settles the current job/relay, and adopts the ref under the built-in lifecycle manager if it is not already adopted (`src/main/supervisor.ts:288-307`). Main-session shutdown disposes all live `RpcAgentSession` instances (`src/main/index.ts:57-64`).

### Result publication, jobs, and relays

**(A)** The supervisor registers a parent-owned async job per assignment. Cancellation changes the turn bookkeeping, aborts a streaming child, and rejects the job; a successful result resolves the job and leaves the agent registered for later messages (`src/main/supervisor.ts:392-424`).

**(A)** The host tool definition is `soroi_return`. Host calls with that name publish the result to `<id>.md`, mark it accepted in the registry, and resolve the current job; wake turns initiated by another agent are instead relayed by IRC with `replyTo`/`wakeRelay` metadata (`src/main/supervisor.ts:331-349,426-445,459-479`).

**(D)** The README documents the result file as `<id>.md`, read through `agent://<id>`, and says that a child which ends a turn without calling `soroi_return` publishes its final assistant text (`README.md:21,43-50`).

### IRC and cross-process host bridge

**(A)** Main-side IRC delivery records whether a message wakes the child, sends an encoded IRC envelope through the RPC `prompt` command with `streamingBehavior: "steer"`, and returns `injected` or `woken` (`src/main/agent-session.ts:157-170`).

**(A)** In the child, the `input` hook decodes the envelope and hands it to the child's real session `deliverIrcMessage`; this preserves the real session's receive path rather than implementing a second message queue (`src/child/index.ts:37-48`). The child binds its Soroi id as an alias of the local session with the real parent id (`src/child/index.ts:78-93`).

**(A)** Child-side `agent://` and `history://` handlers leave subagents registered locally to native handlers, while forwarding foreign agent reads/writes through the `soroi-host://` URI scheme (`src/child/index.ts:95-124`). `send`, `read`, and `wait` are encoded as typed host calls and decoded through the protocol schemas (`src/child/index.ts:126-145`; `src/protocol.ts:17-21,31-55,75-87`).

**(A)** Main-side host-call handling routes sends and reads through `InternalUrlRouter` using the Soroi session as the sender/session context, and executes `WaitTool` under that same session for replies recorded in the main process (`src/main/supervisor.ts:351-390`).

**(D)** The README describes the main IRC bus as the only bus and documents parent/sibling delivery, child-to-agent forwarding, wait behavior, wake turns, and reply relays (`README.md:64-71`).

### Wire protocol

**(A)** `src/protocol.ts` defines the two child-identity environment variables, the `soroi-host` scheme, the `soroi_return` host tool name, zod schemas for `send`/`read`/`wait` host calls and replies, and an IRC envelope prefix plus typed encode/decode helpers (`src/protocol.ts:13-23,31-66,75-97`).

## 4. Explicitly unsupported or not covered

These are separate from code stubs: the repository documents them as boundaries or the source deliberately rejects them.

1. **Agent Hub focus/Enter.** **(D)** The README says a Soroi subagent cannot be focused in the main Agent Hub because it is not a fully renderable in-process `AgentSession`; listing, revive, kill, `history://`, and IRC are documented as available (`README.md:73-75`). **(A)** The session adapter's `getPendingToolResults` deliberately throws an explanatory error directing the user to `history://<id>` or `write agent://<id>` (`src/main/agent-session.ts:86-101`).
2. **RPC host subagent frames.** **(D)** The README says an RPC host driving the main process does not see Soroi subagents through `get_subagents`, `cancel_subagent`, `steer_subagent`, or `subagent_*` frames because those read the root subagent event bus that extensions do not receive (`README.md:76`).
3. **Nested Soroi spawning.** **(D)** The README says `soroi_task` is available only to the main agent; a child can spawn only in-process subagents through omp's built-in `task` tool (`README.md:77`). **(A)** The child installer registers `wait` but does not register `soroi_task` (`src/child/index.ts:37-70`), matching that documented boundary.
4. **No broader product ownership.** **(U)** The user's quoted boundary says Soroi is only an omp extension component and is still far from complete Pepgent (`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`). This repository inventory should not be read as a claim that this package implements the complete product.

## 5. What is a stub, and what is not

### Intentional no-ops and unsupported operations

**(A)** `RpcAgentSession.enableIdleMaintenance()` and `refreshIdleMaintenance()` are empty methods (`src/main/agent-session.ts:186-190`). The adjacent source comment says idle housekeeping belongs to the on-screen session and a Soroi child has none. These are intentional no-op interface hooks in this adapter, not demonstrated unfinished placeholders.

**(A)** `getPendingToolResults` throws because Agent Hub focus is explicitly unsupported (`src/main/agent-session.ts:86-101`). That is an intentional unsupported operation, not a result stub.

**(A)** The `asHostSession`/`asToolSession` casts are a deliberate structural boundary documented in the source (`src/main/agent-session.ts:237-249`), not an empty implementation.

### Placeholder-marker search

**(R)** A working-tree grep for `TODO|FIXME|stub|not implemented|throw new Error|=> {}` found runtime invariant/unsupported errors and no `TODO`, `FIXME`, or explicit `stub` marker in the first-party source. A marker search cannot prove semantic completeness, so the accurate conclusion is: **no obvious placeholder marker was observed; no claim is made that every behavior is complete**. The runtime errors found are the expected checks/unsupported boundary listed above (`src/protocol.ts:79-82`; `src/child/index.ts:72-75,104-105`; `src/main/agent-session.ts:96-100`; `src/main/supervisor.ts:147-160,242-243,402,453-455,530-533`).

## 6. Tests, end-to-end scripts, and commands

### Files and scripts present

**(R)** The hidden-aware recursive working-tree listing showed `README.md`, `package.json`, `bun.lock`, `tsconfig.json`, `.gitignore`, `src/index.ts`, `src/protocol.ts`, `src/child.config.yml`, `src/main/{index,agent-session,supervisor,rpc-process}.ts`, and `src/child/index.ts`; it showed no repository-owned test directory or test/e2e script file (`glob` on `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-subagent`, `hidden=true`, `gitignore=false`).

**(R)** A grep for `test|e2e|integration|smoke` found only dependency/command text and no first-party test or e2e implementation. This is a bounded current-tree observation, not a claim that nobody has tested the package outside this repository.

**(A)** `package.json` defines exactly one script:

```json
"scripts": {
  "check": "tsc --noEmit"
}
```

(`package.json:18-20`). It defines no `test`, `e2e`, `integration`, `smoke`, or separate `build` script.

### Declared commands

| Purpose | Declared command | Evidence and interpretation |
|---|---|---|
| Install dependencies | `bun install` | **(D)** Documented in `README.md:79-83`. |
| Static TypeScript check | `bun run check` | **(D)** Documented in `README.md:81-83`; **(A)** maps to `tsc --noEmit` via `package.json:18-20`. |
| Build | None declared | **(A)** `tsconfig.json` uses `noEmit: true` and `package.json` has no build script (`tsconfig.json:1-17`; `package.json:18-20`). |
| Unit/integration/e2e test | None declared | **(A)/(R)** no test script or first-party test/e2e files were found in the inspected tree; no `bun test`/other test command is documented. |
| Manual omp load | `omp plugin link /path/to/omp-soroi-subagent` or `omp -e /path/to/omp-soroi-subagent/src/index.ts` | **(D)** documented in `README.md:5-9`; not executed here. |

No command result is being reported for `bun install`, `bun run check`, a build, or any runtime path. In particular, this report does not claim that the typecheck passes, that a build exists, or that e2e behavior works.

## 7. Documentation inventory

**(R)** The repository listing contains one top-level prose document, `README.md`; no separate docs directory was present in the inspected tree. `.gitignore` only ignores `node_modules/` (`.gitignore:1`).

**(D)** `README.md` covers:

- install and extension loading (`README.md:5-11`);
- the `soroi_task` and `soroi_return` tool contract (`README.md:13-21`);
- main/child architecture and state ownership (`README.md:23-51`);
- lifecycle and persistence/revival (`README.md:53-62`);
- IRC forwarding and wait/reply behavior (`README.md:64-71`);
- unsupported/not-covered behavior (`README.md:73-77`);
- development commands (`README.md:79-83`).

**(A)** Source files also contain inline comments explaining the RPC protocol, structural session adapter, supervisor state ownership, child bridge, and the `personality: none` configuration overlay (`src/protocol.ts:1-9`; `src/main/agent-session.ts:1-9,237-242`; `src/main/supervisor.ts:1-10,485-496`; `src/child/index.ts:1-11`; `src/child.config.yml:1-2`).

## 8. Git remote and current branch

The permitted repository metadata command was run from the target checkout:

```text
git remote -v && printf '\nCURRENT_BRANCH=' && git branch --show-current
```

**(R)** Observed output:

```text
origin  https://github.com/Pepgent/omp-soroi-subagent.git (fetch)
origin  https://github.com/Pepgent/omp-soroi-subagent.git (push)

CURRENT_BRANCH=main
```

No Git history, commit content, hash comparison, GitHub issue/PR history, or hash verification was used.

## Bottom line

**(D)** The documented purpose is an omp extension that hosts Soroi subagents in separate RPC-mode omp processes while presenting registry/lifecycle/IRC/URL surfaces through omp-compatible adapters (`README.md:1-3`). **(A)** The current working tree contains source paths for that main/child/RPC/session/lifecycle implementation. **(R)** It declares only a no-emission TypeScript check and contains no repository-owned test/e2e script or test suite in the inspected tree. Explicit unsupported behavior and two intentional no-op maintenance hooks are documented separately from unfinished stubs. **(R)** The remote is `https://github.com/Pepgent/omp-soroi-subagent.git` for fetch and push, and the current branch is `main`.

Runtime correctness remains unverified because this assignment was a read-only static inventory and no runtime command was executed.
