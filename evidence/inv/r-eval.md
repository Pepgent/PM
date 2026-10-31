# `pepgent-omp-soroi-eval` inventory

## Scope, evidence, and limits

This is a read-only inventory of the working tree at `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-eval`. I did not edit the repository, add tests, run tests/builds, change omp configuration, read git history, or access GitHub issue/PR history. The only output produced by this slice is this report.

Evidence tags used throughout:

- **(U)** — the user's own words; ground truth of intent. The citation is a session entry containing the user's message.
- **(A)** — an assistant/agent claim from an earlier session; interpretation or historical report, not proof of the current tree or a current runtime result.
- **(D)** — text in the current working tree (source, manifest, README, or configuration).
- **(R)** — an observation from a command/tool result made during this inventory.

The source and README are cited as current-tree evidence. Historical session material is deliberately separated and never used to replace current source evidence.

## Executive summary

- **(D, `README.md:1-10`)** The repository is an omp plugin for Soroi. Its documented surface is threefold: `soroi_eval`, `soroi_return` for Agent-body subagents, and an unconsumed-atom reminder before model requests.
- **(D, `package.json:11-18`)** The package exports `./index.ts` as its main export, `./src/node.ts` as the `./node` authoring export, and declares `./index.ts` under the package's `omp.extensions` field.
- **(D, `index.ts:39-121`)** The extension factory is the default export. It registers `soroi_eval`, starts batch tracking, listens for `task`/`fork_task` tool calls, disables `soroi_eval` inside Agent-body sessions, and injects the reminder through the `context` hook.
- **(D, `package.json:19-21`; `README.md:112-117`)** The declared development commands are `bun install`, `bun run check`, and `bun run test`; there is no `build` script. The repository has no discovered `test*` file/directory in the current tree, so there is no checked-in test suite to inventory.
- **(R, command `git branch --show-current && git remote -v`)** The current branch is `main`; the only current remote is `origin`, fetching and pushing `https://github.com/Pepgent/omp-soroi-eval.git`.
- **(D, `README.md:103-110`)** The explicit stand-ins are the built-in omp subagent instead of Soroi's own subagent, central-host execution instead of remote execution, JSON-string code input instead of raw grammar-constrained text, and no `human` body.

## User intent relevant to this repository

The repository-level inventory should not be mistaken for the whole Pepgent product. The user's pivot framing says:

> “另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在”

**(U, `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`, user message at `2026-10-31T22:14:14.883Z`)** This supports treating this repository as the eval extension component, not as the Pepgent business application or as the owner of remote infrastructure.

The requested work was explicitly end-to-end in scope:

> “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”

**(U, `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`, user message at `2026-10-31T22:18:38.724Z`)** This is why the report distinguishes source implementation, declared test commands, historical runtime claims, and what is actually verifiable from the current tree.

## Repository shape and package contract

- **(R, current-tree glob `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-eval`, hidden files included, gitignore disabled)** The visible repository consists of `index.ts`, `README.md`, `.gitignore`, `bun.lock`, `tsconfig.json`, `package.json`, and the ten source modules under `src/`: `session.ts`, `batch.ts`, `store.ts`, `check.ts`, `execute.ts`, `agent-body.ts`, `runner.ts`, `hash.ts`, `model.ts`, and `node.ts`.
- **(D, `package.json:1-18`)** The package is private, ESM (`"type": "module"`), named `omp-soroi-eval`, and has the package description “omp plugin for soroi: the eval tool, the return tool for agent bodies, and the unconsumed-atom reminder.” Its published file list is `index.ts` plus `src`, with `.` and `./node` exports as described above.
- **(D, `package.json:23-35`)** Runtime dependencies are `@duckdb/node-api` and `typescript`; omp coding-agent/core packages are peer dependencies and also development dependencies, with `@types/bun` for development typing.
- **(D, `tsconfig.json:1-17`)** TypeScript uses strict, no-emit, ESNext/Preserve/bundler settings, Bun types, and includes `index.ts`, all `src/**/*.ts`, and a possible `test/**/*.ts` tree.
- **(R, current-tree glob `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-eval/test*`)** No `test*` file or directory was found in the current working tree. This is an inventory observation, not a claim that the declared `bun test` command can never find externally supplied tests.

## How it loads into omp

### Manifest and entry

- **(D, `package.json:11-18`)** The package's main export resolves to `./index.ts`; the `./node` subpath resolves to `./src/node.ts`; and the omp package metadata declares `"extensions": ["./index.ts"]`.
- **(D, `index.ts:4-12,39-40`)** `index.ts` imports `ExtensionAPI`/`ExtensionContext` from `@oh-my-pi/pi-coding-agent` and default-exports `function soroiEval(pi: ExtensionAPI): void`. The factory starts batch watching and performs all registrations from that function.
- **(D, `README.md:12-24`)** The documented installation path is to run `bun install` in the repository and then `omp plugin link /path/to/omp-soroi-eval`; a node-authoring project consumes the package through the package's `./node` export.
- **(A, `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/7964b4fc`, assistant report at `2026-10-31T02:44:53.200Z`)** A previous implementation session reported that loading with `--extension <repository directory>` caused the manifest entry to resolve and the tool to register. That is historical assistant evidence only; this inventory did not launch omp and does not treat it as a current runtime check.

### Registration and session hooks

- **(D, `index.ts:40-95`)** The factory registers one root tool named `soroi_eval`, with label `Soroi Eval`, the `DESCRIPTION` text, the zod `parametersSchema`, and `loadMode: "essential"`.
- **(D, `index.ts:97-102`)** A `tool_call` hook recognizes exactly the names in `BATCH_TOOLS` (`task` and `fork_task`). It reads a string `context` from the tool input when present and calls `startBatch` with the omp tool-call id, parent agent id, and purpose.
- **(D, `index.ts:104-106`)** A `session_start` hook detects Agent-body sessions and removes `soroi_eval` from their active tools.
- **(D, `index.ts:108-121`)** A `context` hook skips Agent-body sessions, computes the current reminder for other sessions, logs it at debug level, and appends the reminder as another text block on the latest user message. It returns a replacement message list rather than appending a new trailing message.

## Implemented tools and behavior

### `soroi_eval` parameters and allowed step language

- **(D, `index.ts:23-27`)** The parameter schema is an object with required `code: string`, required `mode: "dry_run" | "formal"`, and optional `pins: record<string, unknown>`. The implementation describes `pins` as dry-run-only node-function-name-to-return-value mappings.
- **(D, `index.ts:29-37`; `README.md:55-75`)** The tool description limits a step to root atoms, node calls, and `stop`. Root atoms are number/string/boolean literals; calls take atom names only; object-returning calls must destructure all fields; node files are `<cwd>/nodes/<name>.ts`.
- **(D, `src/check.ts:138-200`)** The parser accepts only `const` declarations with one declaration and no explicit type annotation, either a scalar literal or a plain identifier call; it accepts an object binding pattern only when every binding is a simple property-to-identifier mapping. It accepts only `stop(identifier)` expression statements. Calls reject type arguments, literals, nested calls, and non-identifier arguments.
- **(D, `src/check.ts:51-129`)** Before execution, the checker creates a temporary TypeScript project in the OS temp directory, writes the step and ambient declarations, loads TypeScript's `unstable/ast` and async checker APIs, checks syntax, resolves names and node files, type-checks node declarations and the step, derives each call's output shape, and removes the temporary directory in `finally`.
- **(D, `src/check.ts:215-247,304-312`)** Name resolution requires referenced atoms to exist, forbids a name already present in the run or repeated in the step, checks that each node file exists, records consumed existing atoms in first-use order, and rejects non-exhaustive object destructuring or destructuring a scalar.
- **(D, `src/check.ts:277-301`)** Accepted output kinds are number, string, boolean, a file object identified by `kind`/`path`, or a one-level flat object whose fields are all those kinds. This matches the domain model in `src/model.ts:3-39`.

### Dry run and formal run

- **(D, `index.ts:47-59`)** `soroi_eval` rejects use in an Agent-body session, rejects non-empty `pins` in formal mode, loads the current run for the root omp session, checks against stored atoms, and converts parameters to either `{ kind: "dry_run", pins }` or `{ kind: "formal" }`.
- **(D, `index.ts:60-73`)** It executes the checked step, renders the outcome, and returns a successful dry-run result without calling `Store.commit`; failed calls make the dry-run result an error-shaped result. A formal step with any failed call returns an error and does not write the store.
- **(D, `src/execute.ts:71-115`)** Execution seeds an environment with existing atoms, creates literal roots, schedules calls as promises, propagates failed upstream calls to dependent calls, binds each returned field into the environment, and awaits all calls. Independent calls can run concurrently because they are accumulated and awaited after the statement scan.
- **(D, `src/execute.ts:117-164`)** Each call hashes the node file for its function version, combines that version with input identities and `central` environment to form a capture identity, handles a dry-run pin before store lookup, adopts an existing capture when found, otherwise runs the node and converts its outputs. Program nodes run in a fresh runner process; Agent nodes go through `runAgent`; failures are represented as a `failed` call outcome.
- **(D, `src/execute.ts:200-235`; `src/hash.ts:1-20`)** Runtime output conversion enforces the checker-accepted scalar/object shape. File outputs resolve against the working directory, read the file bytes, and store the resulting content identity plus an absolute path. The identity helpers define deterministic identities for literals, node-file versions, captures, outputs, and file content. This is source behavior, not a hash-verification result.
- **(D, `src/execute.ts:237-272`; `index.ts:75-93`)** A successful formal run becomes records for values, names, calls, captures, consumed atoms, and produced names. File objects are copied to the store's object directory before commit. The index then commits the complete step with session, run, agent, batch, stops, and timestamp metadata and reports whether the run started or ended.

### Node authoring API and program execution

- **(D, `src/node.ts:1-20`)** A node project puts one file at `<project>/nodes/<name>.ts`, default-exports a node constructor result, and can return number/string/boolean or a single file object. `file(path)` creates the file return marker.
- **(D, `src/node.ts:22-51`)** `program` creates a `ProgramFn` with a runtime async function and optional environment template; `agent` creates an `AgentFn` with a prompt function, required omp agent-definition template, and optional environment template. The phantom `"~signature"` property exists for type-level step checking and is not set at runtime.
- **(D, `src/runner.ts:1-41`)** Each call is launched through `runner.ts <request.json> <result.json>` in a fresh Bun process. The runner dynamically imports the requested node file, executes Program nodes and serializes their result, or renders the prompt/template for Agent nodes; malformed exports and exceptions become structured failure results.
- **(D, `src/execute.ts:179-198`)** The host creates temporary request/result files, spawns the runner with `BUN_BE_BUN=1`, reads the result, and removes the temporary directory after the process exits. Missing result files are reported with the node process exit code and stderr.

### Agent nodes and `soroi_return`

- **(D, `README.md:103-110`; `src/agent-body.ts:1-14`)** The Agent body is explicitly a stand-in for Soroi's future own subagent. The current implementation uses omp's built-in subagent machinery and prefixes its registry ids with `SoroiAgent-` so eval/reminder behavior can be suppressed in those children.
- **(D, `src/agent-body.ts:16-40`)** `agentRunner` discovers the named omp agent definition in the current cwd, derives a typebox schema from the accepted output shape, and prepares a per-call custom tool named `soroi_return`. Single outputs are returned under `value`; object outputs are returned as a flat object.
- **(D, `src/agent-body.ts:41-69`)** The return tool captures the output and the child transcript session id, tells the child to end after returning, and passes the custom tool to `runSubprocess`. If the child exits without invoking `soroi_return`, the call fails. The child result therefore has exactly one implemented return path through this per-invocation tool.
- **(D, `index.ts:47-49,104-106,110-112`; `src/session.ts:13-23`)** Agent-body sessions cannot call `soroi_eval`, do not receive the reminder, and still resolve their run through the root main session id. Non-Agent subagents/forks locate the root main session by walking the omp agent registry's parent chain.

### Runs, store, identity reuse, and transaction boundary

- **(D, `src/store.ts:12-27,93-125`)** The store home is `$SOROI_HOME` or `~/.soroi`. Opening a store creates `data/` and `objects/`, creates an in-memory DuckDB connection, installs/loads DuckLake and SQLite, attaches a DuckLake catalog backed by `catalog.sqlite` with Parquet data under `data/`, and creates identity tables (`vals`, `captures`) plus run tables (`runs`, `names`, `steps`, `calls`, `stops`, `batches`, `events`). Run tables are partitioned by `run_id`; identity tables are not.
- **(D, `src/store.ts:128-146`)** A single store connection serializes its operations through a promise queue. File objects are copied into `objects/<content identity>` only when the destination does not already exist.
- **(D, `src/store.ts:148-208`)** `currentRun` finds the latest non-ended run for a root session. `runState` reconstructs atoms, origins, consumed names, and the set of agents that have formally run in each batch from the stored tables.
- **(D, `src/store.ts:210-235`)** Capture lookup reconstructs output values from the identity tables; file values point to the content-addressed object path.
- **(D, `src/store.ts:238-345`)** `commit` writes one formal step in one transaction. It starts a run when needed, inserts identity facts idempotently by identity, records batch/step/call/name/stop rows, appends ordered events, and writes `run_end` when no stored atom remains unconsumed. Rollback is used on a transaction error.
- **(D, `README.md:76-101`)** The README describes the same lifecycle at a user level: a run belongs to the root omp session, a first formal step starts it, a run ends when no atom remains unconsumed, formal calls with an existing identity are adopted, and the store keeps value/capture identity facts separately from run-partitioned facts.

### Unconsumed reminder and batch visibility

- **(D, `index.ts:136-148`)** The reminder reads the root session's current run, asks the store for state, filters atoms through `visible`, and emits a `<system-reminder source="soroi">` block listing each visible unconsumed atom, its value preview, and its literal/call origin.
- **(D, `src/session.ts:25-47`)** Visibility excludes consumed atoms. Main agents can see unconsumed atoms that pass batch gating. A subagent can see atoms created before it spawned plus atoms from its own subtree. Batch outputs remain hidden outside the producing subtree until `batchFinished` says all registered members have formally run.
- **(D, `src/batch.ts:17-45`)** Batch membership is process-local: `startBatch` records the latest task/fork call per parent; an `AgentRegistry` change listener assigns newly registered non-Agent-body subagents to that latest batch; `batchFinished` checks the store-provided set of agents that have formally run.
- **(D, `README.md:80-84`)** The documented contract is that reminders list atoms visible to the current agent and that one task/fork batch's outputs do not enter other agents' reminders until every member has formally run a step in that batch.

## Tests, build, and runtime verification status

### Commands declared by the current tree

- **(D, `package.json:19-21`)** `bun run check` runs `tsc --noEmit -p tsconfig.json`; `bun run test` runs `bun test`.
- **(D, `README.md:112-117`)** The development instructions are `bun install` followed by `bun run check`.
- **(D, `package.json:19-21`)** There is no `build` script. The `check` script is a no-emit TypeScript check, not a bundle or publish build.
- **(R, current-tree glob `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-eval/test*`)** No checked-in test directory or test file was found. The manifest nevertheless includes `test/**/*.ts` in the TypeScript include list (**(D, `tsconfig.json:17`)**), so the project is prepared to type-check tests if they are added.

### What was and was not exercised in this slice

- **(R, this inventory's command record)** No `bun install`, `bun run check`, `bun test`, omp launch, or runtime smoke test was run in this slice. Therefore this report does not claim a current passing build, passing tests, or current end-to-end behavior beyond what the source and documentation describe.
- **(A, `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/7964b4fc`, assistant report at `2026-10-31T02:44:53.200Z`)** A prior assistant report claimed Bun-level checks for parser rejection, dry/formal execution, identity reuse, file flow, Agent-body return, task/fork batches, run end, and an omp load check. It also explicitly marked some matters unverified in that session. Those are historical claims from a different session/path and are not current runtime evidence for this inventory; no hash output is used or relied upon here.
- **(R, `session://sessions.jsonl` query restricted to `/pepgent/` paths and dates `2026-10-31`/`2026-11-01`)** The indexed date search returned sessions for `pepgent-soroi`, `pepgent`, and `pepgent-remote` (plus an older `pepgent-iac` session whose modification date fell in the window), but no indexed session whose cwd was the current `pepgent-omp-soroi-eval` path. A separate text search found the historical eval implementation session in `/Users/mouriya/Ext/worktrees/redesign-bf9de1c`. This is a limit of the indexed session search, not evidence that no active session exists elsewhere.

## Documentation inventory

- **(D, `README.md:1-10`)** Purpose and three public responsibilities are documented at the top.
- **(D, `README.md:12-24`)** Installation, plugin linking, and node-project dependency setup are documented.
- **(D, `README.md:26-53`)** Node file layout, `program`, `agent`, `file`, scalar/file/object result constraints, and examples are documented.
- **(D, `README.md:55-75`)** Step syntax, checking constraints, dry-run pins, formal execution, and identity reuse are documented.
- **(D, `README.md:76-84`)** Run ownership, reminder visibility, and batch release semantics are documented.
- **(D, `README.md:86-101`)** `$SOROI_HOME`, DuckLake/SQLite/Parquet/object storage, and the table inventory are documented.
- **(D, `README.md:103-110`)** Current stand-ins and omissions are explicitly documented: built-in subagent, central environment, JSON-string code input, and absent human body.
- **(D, `README.md:112-117`)** Development commands are documented.
- **(R, current-tree glob)** No second Markdown design document, API reference, test guide, or dedicated changelog was found in this repository; `README.md` is the only discovered documentation file.

## Stubs, stand-ins, and intentionally absent scope

These are not inferred from short functions; each item is either explicitly documented or directly represented by a source branch/API boundary.

- **(D, `README.md:103-107`; `src/agent-body.ts:1-69`)** Soroi's own subagent is not implemented here. Built-in omp `runSubprocess` is the stand-in, with a per-call `soroi_return` tool.
- **(D, `README.md:108`; `src/execute.ts:16-17,117-160`)** Remote environment execution is not implemented. Node declarations may carry an environment template, but capture identity and actual execution use `central`; the result only reports a non-central declared environment as not wired to remote.
- **(D, `README.md:109`; `index.ts:23-27`)** The tool accepts JSON-schema-derived `code: string`; there is no raw-text grammar-constrained sampling interface in this repository.
- **(D, `README.md:110`; `src/node.ts:28-51`)** No `human` node constructor or GUI intervention body is provided. The only constructors are `program` and `agent`.
- **(D, `src/batch.ts:17-45`)** Batch membership and latest-parent mapping are in-memory omp-process state; the store records batch rows and formal-run participation, but no separate persistent batch coordinator is present in this repository.
- **(D, `package.json:19-21`; R, current-tree glob)** Automated test files are absent even though a `bun test` script exists. This is a test-surface gap, not an implementation stub in the production path.
- **(D, `README.md:103-110`)** The README calls all four items “Current stand-ins,” so they are intentional scope boundaries rather than undocumented accidental omissions.

## Current git metadata

- **(R, command `git branch --show-current && git remote -v`)** Current branch: `main`.
- **(R, command `git branch --show-current && git remote -v`)** Current remote configuration:

  ```text
  origin  https://github.com/Pepgent/omp-soroi-eval.git (fetch)
  origin  https://github.com/Pepgent/omp-soroi-eval.git (push)
  ```

No git history, commit contents, reflog, blame, or GitHub issue/PR history was consulted.

## Bottom line

- **(D, `package.json:11-18`; `index.ts:39-121`)** The current tree is a directly loadable omp extension package whose default factory registers one essential `soroi_eval` tool and three integration behaviors: per-call Agent-body return, root-session store/run handling, and context-hook reminders with task/fork batch visibility.
- **(D, `src/check.ts:51-129`; `src/execute.ts:71-164`; `src/store.ts:238-345`)** The implemented vertical path is complete in source from constrained step checking through dry/formal execution, Program/Agent node dispatch, identity-based capture reuse, file-object persistence, and transactional run records/events.
- **(D, `README.md:103-110`; R, current-tree glob and unrun-command record)** The documented and observed scope stops short of Soroi-owned subagents, remote execution, raw grammar-constrained code input, human bodies, and checked-in tests. Build/test/runtime pass status remains unverified by this read-only inventory.
