# OMP project-agent discovery across sibling repositories

## Answer

**Yes: `findAllNearestProjectConfigDirs("agents", cwd)` can find `/Users/mouriya/Ext/code/pepgent/.omp/agents` from a cwd of `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`, even when `pepgent-soroi` is a Git repository.** The helper's inspected current implementation does not consult `.git`, a repository root, or a home-directory boundary. It walks toward the filesystem root and retains the nearest existing directory for each config source. Task-agent discovery keeps only the `.omp` source and uses its first project directory. **This conclusion is conditional on there not being a nearer `.omp/agents` directory.** (D: `omp://config-usage.md:120-124`; `omp://task-agent-discovery.md:148-160`; R: current-source observations at `/Users/mouriya/Ext/code/oh-my-pi/packages/coding-agent/src/config.ts:218-246` and `src/task/discovery.ts:91-111`, read as described below.)

The four requested documents establish the task-agent caller and distinguish the other discovery mechanisms, but do **not** explicitly specify this helper's Git-root termination behavior. Inspection of the current working-tree implementation supplies that missing boundary evidence. The running executable is a compiled Tern-managed binary; I did not establish that the inspected checkout is byte-for-byte its source or execute a live discovery probe. Thus the source-level answer is settled, while exact active-binary parity remains unverified. (D: `omp://config-usage.md:120-124`; R: `command -v omp` and the source reads below.)

## Evidence kinds and scope

- **(D)**: harness documentation text, cited by `omp://` path and line number.
- **(R)**: observed tool/command output. Current source was read directly, not executed; these citations are source observations, **not runtime verification**.
- **[INFERENCE]**: application of the documented/observed algorithm to the hypothetical directory placement.
- No session-history or Git/GitHub-history research was needed. No claims of user design intent are inferred from assistant statements.

This is a read-only investigation. No repository/configuration files were edited, no Git operations were performed, no GitHub objects were created, no agents were added or moved, and no tests or discovery runtime checks were run.

## Evidence from each requested document

### 1. Generic config helper: ancestors are candidates

> “Walks parent directories upward and returns the **nearest existing directory per source base** (`.omp`, `.claude`, `.codex`, `.gemini`), then sorts results by source priority.”
>
> “Use this when project config should be inherited from ancestor directories (monorepo/nested workspace behavior).”

(D: `omp://config-usage.md:120-124`.)

The relevant function is specifically `findAllNearestProjectConfigDirs(subpath, cwd)`, not `getConfigDirs(...)`. The latter's project bases are expressed as `<cwd>/.omp`, `<cwd>/.claude`, etc., and have their own caller/options behavior. (D: `omp://config-usage.md:67-72,98-114,120-124`.)

**Limit of this document:** those lines do not name a Git/home/filesystem boundary; ancestor inheritance alone would not prove traversal above a repository root. (D: `omp://config-usage.md:120-124`.)

### 2. Task-agent discovery: this is the helper actually used

Task agents are merged in this order:

1. Nearest project `.omp/agents` directory from `findAllNearestProjectConfigDirs("agents", cwd)` — “first `.omp` hit only.”
2. User `.omp/agents` directory from `getConfigDirs("agents", { project: false })` — first `.omp` hit only.
3. Enabled OMP extension-package agent directories.
4. Separately gated Claude marketplace plugin agent directories.
5. Bundled agents.

(D: `omp://task-agent-discovery.md:146-160`.)

Direct cross-harness `.claude/agents`, `.codex/agents`, and `.gemini/agents` directories are intentionally skipped by the native task-agent path because their frontmatter is not the OMP task-agent contract. (D: `omp://task-agent-discovery.md:148`.)

Deduplication is first-wins by exact agent name. Project `.omp` agents override same-name user `.omp` agents, but this does not mean that all ancestor project directories are merged: only the nearest project `.omp/agents` directory enters this path. (D: `omp://task-agent-discovery.md:152-153,166-180`.)

Execution preflight rediscovers agents using the session's cwd and effective extension roots; the earlier model-facing tool description can differ from the current runtime set when files have changed. (D: `omp://task-agent-discovery.md:207-220`.)

### 3. Settings: parent agent discovery does not imply parent settings inheritance

> “Native project settings are intentionally scoped to the process working directory's `.omp/` folder — settings discovery does **not** walk ancestor directories looking for the nearest `.omp/`.”

(D: `omp://settings.md:30`.)

The documented native project setting location is `<cwd>/.omp/config.yml` plus legacy `.omp/settings.json`; settings commands do not write arbitrary project keys there. (D: `omp://settings.md:15-22,95-97`.)

**Consequence:** locating shared agent definitions at `pepgent/.omp/agents` does not by itself make a `pepgent/.omp/config.yml` model-role mapping or task setting load for a session started in `pepgent-soroi`. Definitions and settings have different discovery rules. (D: `omp://settings.md:30`; `omp://task-agent-discovery.md:53-76,152-153`; [INFERENCE]: applying those separate documented paths to the requested hierarchy.)

### 4. Context files: `AGENTS.md` is not an agent definition directory

Native project `.omp/AGENTS.md` and `.omp/RULES.md` use the nearest **non-empty `.omp/` root** while walking toward the repository root; a missing file in that selected root does not cause fallback to a farther `.omp/`. (D: `omp://context-files.md:18-32`.)

Standalone `AGENTS.md`/`CLAUDE.md` have another rule: when the repository is under the user's home, their provider can continue through enclosing workspace directories up to, but not including, home. That is a context-file rule, not evidence about `findAllNearestProjectConfigDirs("agents", cwd)`. (D: `omp://context-files.md:77-80`.)

Task subagents drop context files named `AGENTS.md`, while still receiving sticky rules; this is again separate from whether a named task-agent definition is discovered from `.omp/agents/*.md`. (D: `omp://context-files.md:24-25,53`; `omp://task-agent-discovery.md:51-55`.)

## Decisive current-source observations

### Helper termination and matching rule

Read operation:

```text
read /Users/mouriya/Ext/code/oh-my-pi/packages/coding-agent/src/config.ts:170-260
```

Observed source at lines 218–246:

```ts
export function findAllNearestProjectConfigDirs(subpath: string, cwd: string = getProjectDir()): ConfigDirEntry[] {
	const results: ConfigDirEntry[] = [];
	const foundBases = new Set<string>();

	let currentDir = cwd;

	while (foundBases.size < PROJECT_CONFIG_BASES.length) {
		for (const { base, name } of PROJECT_CONFIG_BASES) {
			if (foundBases.has(name)) continue;

			const candidate = path.join(currentDir, base, subpath);
			try {
				if (fs.statSync(candidate).isDirectory()) {
					results.push({ path: candidate, source: name, level: "project" });
					foundBases.add(name);
				}
			} catch {}
		}

		const parentDir = path.dirname(currentDir);
		if (parentDir === currentDir) break;
		currentDir = parentDir;
	}

	// Sort by priority order
	const order = PROJECT_CONFIG_BASES.map(b => b.name);
	results.sort((a, b) => order.indexOf(a.source) - order.indexOf(b.source));

	return results;
}
```

(R: observed current-source text, `/Users/mouriya/Ext/code/oh-my-pi/packages/coding-agent/src/config.ts:218-246`.)

This directly establishes:

- The candidate is `<currentDir>/<config-base>/<subpath>`; for this task, `<currentDir>/.omp/agents`.
- Matching checks that the **`agents` path is a directory**, not that the `.omp` root is non-empty or that there are valid agent files in it.
- After the nearest hit for one source, that source is skipped at higher ancestors.
- The upward traversal ends when all source bases have been found or `path.dirname(currentDir) === currentDir`, i.e. the filesystem-root boundary. There is no Git or home boundary in this function.

(R: the same observed source, especially `config.ts:224-239`; the `.omp` base is also documented at `omp://config-usage.md:51-58,120-124`.)

### Task-agent caller

Read operation:

```text
read /Users/mouriya/Ext/code/oh-my-pi/packages/coding-agent/src/task/discovery.ts:65-155
```

Observed relevant lines:

```ts
const resolvedCwd = path.resolve(cwd);
// ...
const projectDirs = findAllNearestProjectConfigDirs("agents", resolvedCwd)
	.filter(entry => entry.source === TASK_AGENT_CONFIG_SOURCE)
	.map(entry => ({
		...entry,
		path: path.resolve(entry.path),
	}));

const orderedDirs: AgentDirectory[] = [];
const project = projectDirs[0];
if (project) orderedDirs.push({ dir: project.path, source: "project" });
const user = userDirs[0];
if (user) orderedDirs.push({ dir: user.path, source: "user" });
```

(R: observed current-source text, `/Users/mouriya/Ext/code/oh-my-pi/packages/coding-agent/src/task/discovery.ts:91-111`; D: `omp://task-agent-discovery.md:148-153` identifies `TASK_AGENT_CONFIG_SOURCE = ".omp"`.)

## Applying the algorithm to the requested sibling hierarchy

Given cwd:

```text
/Users/mouriya/Ext/code/pepgent/pepgent-soroi
```

The first two native candidates are:

```text
1. /Users/mouriya/Ext/code/pepgent/pepgent-soroi/.omp/agents
2. /Users/mouriya/Ext/code/pepgent/.omp/agents
```

**[INFERENCE from the observed algorithm]:** if candidate 1 is not a directory and candidate 2 is a directory, candidate 2 is selected as the project `.omp` agent directory. A `.git` directory/file at `pepgent-soroi` does not alter this traversal. A session in another sibling repository beneath `pepgent/` has the same result if it also has no nearer `.omp/agents` directory. (R: `config.ts:224-239`; `task/discovery.ts:100-111`.)

**[INFERENCE from the observed algorithm]:** an existing local `pepgent-soroi/.omp/agents` directory blocks the parent's project directory even if it is empty or lacks a particular desired agent definition. Conversely, merely having a local `.omp/` directory without an `agents/` directory does **not** block the parent's `.omp/agents`. This differs from the native context-file rule that selects a nearest non-empty `.omp` root. (R: `config.ts:228-233`; D: `omp://context-files.md:25-32`.)

I did not check whether either hypothetical agent directory presently exists; that is not necessary to answer the discovery-boundary question and no actual availability claim is made.

## Implementation provenance and verification limit

Observed command:

```text
command -v omp
```

Output:

```text
/Users/mouriya/Library/Application Support/Tern/omp/bin/omp
```

Reading that path returned a binary-file notice: it is a compiled executable, approximately 205.2 MB, rather than a readable launcher that points at the inspected checkout. An attempt to locate an unminified embedded helper using the command below returned no output and exit status 1:

```sh
strings '/Users/mouriya/Library/Application Support/Tern/omp/bin/omp' \
  | grep -F -A 35 -B 3 'function findAllNearestProjectConfigDirs'
```

(R: outputs of `command -v omp`, `read` of the resolved executable, and the `strings | grep` command.)

Therefore this report proves the current documented call path and the boundary in the current `/Users/mouriya/Ext/code/oh-my-pi` source checkout. It does **not** claim a successful runtime probe of the Tern binary or an established checkout-to-binary correspondence. No configuration changes, synthetic test directories, model calls, or hash checks were used.

## Bottom line for placement

**Shared ancestor `.omp/agents` is supported by the inspected helper, across sibling Git-repository boundaries, provided each session has no nearer `.omp/agents` directory.** Do not extend that answer to `.omp/config.yml`, `.omp/AGENTS.md`, `.omp/RULES.md`, or arbitrary sibling scanning: each has its own discovery rule, and this helper walks ancestors, not sideways into sibling repositories. (D: `omp://config-usage.md:120-124`; `omp://task-agent-discovery.md:148-153`; `omp://settings.md:30`; `omp://context-files.md:25-32`; R: `config.ts:218-246`.)
