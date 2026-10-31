# OMP project-level skills

## Scope and evidence legend

This is a read-only investigation of the bundled OMP documentation requested for project-level skills. The primary sources are `omp://skills.md` and the three files matched by `omp://skills/authoring-*.md`; `omp://config-usage.md` is cited where it states the native project path and ancestor boundary more explicitly than the skills overview.

- `(U)` = user-authored intent in the historical session; this is ground truth for why the capability is wanted, not runtime behavior.
- `(D)` = bundled OMP documentation.
- `(A)` = interpretation/inference from documented rules; it is not an additional OMP guarantee.
- `(R)` = directly observed tool/runtime output. No runtime experiment was needed for the documentation conclusions.

## User intent

> “对于好的工作方式，推荐固化成project级的skill。并在后期观察效果并使用。”

`(U; session://01a193fd-e992-76d2-8c29-060fe52cc094/timeline #5f08315a, 2026-11-01 07:22:01)`

The same user turn set the operating context:

> “我当前给你准备的omp是一个绝对超乎你想象极为强大的harness，你可以交给subagent调查后，充分运用他的能力帮助你完成工作。”

`(U; session://01a193fd-e992-76d2-8c29-060fe52cc094/timeline #c4cdef6a, 2026-11-01 07:22:39)`

## Decisive answer

### Native project-level location

`(D; omp://config-usage.md:275-291)` The native OMP provider's authored project skill location is:

```text
<ancestor>/.omp/skills/<skill-name>/SKILL.md
```

The native provider scans that pattern for **each ancestor from the current working directory up to the repository-root/home boundary**, and also scans the active user skill directory:

```text
~/.omp/agent/skills/<skill-name>/SKILL.md
```

The `.omp` directory itself does **not** need to be non-empty for the native skills scan; the non-empty-root admission rule used by several other native capabilities is explicitly separated from skills. `(D; omp://config-usage.md:282-292)`

`(D; omp://skills.md:27-33)` The conventional root layout is one level under `skills/`:

```text
<skills-root>/
  skills/
    <skill-name>/
      SKILL.md
```

Thus the direct project form is normally:

```text
<repo>/.omp/skills/review/SKILL.md
```

`(D; omp://skills.md:23-48)` `SKILL.md` is a file-backed capability pack discovered at startup; the body is Markdown and is exposed through the skill capability and `skill://` reads. `(D; omp://skills.md:1-9, 180-183)`

### Parent directory versus sibling repositories

`(D; omp://config-usage.md:284-291)` The documented ancestor walk is bounded at the current repository root (or the home boundary when that is the applicable boundary). It is not an unbounded walk through every filesystem parent.

`(A; derived from omp://config-usage.md:284-291)` Therefore:

- A `.omp/skills` directory in an ancestor **inside the same repository** is discovered. A monorepo root `.omp/skills` can therefore supply skills to nested packages/repos-as-directories within that repository.
- A `.omp/skills` directory in a workspace parent **outside each sibling repository's own repository root** is **not automatically discovered** by those sibling repositories. Putting `/workspace/.omp/skills/...` above independent `/workspace/repo-a` and `/workspace/repo-b` does not create cross-repository inheritance under the documented native walk.
- This is specifically about native project skills. It must not be conflated with standalone `AGENTS.md` discovery: the skills overview documents a separate context-file walk, and the native skills rule is the `<ancestor>/.omp/skills` scan described above. `(D; omp://skills.md:227-234; D; omp://config-usage.md:284-306)`
- If no repository root is established and the home boundary is used, the boundary condition changes which ancestors are eligible; the report should not treat that exceptional layout as automatic sharing between normal independent repositories. `(D; omp://config-usage.md:285, 291)`

A practical shared-skill choice is the user scope, not an untracked workspace-parent project directory:

- `(D; omp://config-usage.md:285, 291-292)` `~/.omp/agent/skills/<name>/SKILL.md` is the documented user-level native location.
- `(D; omp://skills.md:101-102)` Auto-managed skills also have a user-level location under `~/.omp/agent/managed-skills`, but managed skills are a separate provider and authored skills take precedence over them.
- `(D; omp://skills/authoring-marketplaces.md:232-237)` A marketplace plugin installed at the default **user** scope is available in all projects; a project-scoped install under `<project>/.omp/plugins/installed_plugins.json` is available only in that project. This is plugin scope, not native parent-directory inheritance.

## `SKILL.md` format and frontmatter

### Minimal recommended file

`(D; omp://skills.md:50-73, 252-257)` The boring, portable form is a directory containing one `SKILL.md` with explicit `name` and `description` frontmatter followed by Markdown instructions:

```markdown
---
name: review
description: Review changes against the repository's project conventions.
---

# Review

Use the repository's review workflow...
```

`(D; omp://skills.md:52-63)` The permissive conventional-scanner frontmatter fields are:

| Field | Runtime/documented meaning |
|---|---|
| `name?: string` | Skill name; if omitted, it defaults to the skill directory name. |
| `description?: string` | Matching description. It is required by the native `.omp` provider, `omp-plugins`, GitHub skills, and custom-directory scanning. |
| `globs?: string[]` | Metadata; not an automatic invocation mechanism. |
| `alwaysApply?: boolean` | Metadata; not an automatic invocation mechanism. |
| `hide?: boolean` | Hides the skill from the exposed discovered list, but does not disable loading or direct access. |
| `disableModelInvocation?: boolean` | Agent Skills equivalent of `hide`; kebab-case `disable-model-invocation` is normalized. |
| additional keys | Preserved as unknown metadata by conventional scanners. |
| `enabled: false` | Skips the skill in conventional scanners and Skillshare discovery. |

`(D; omp://skills.md:65-73)` The important provider distinction is that `name` has a directory-name fallback, but native `.omp` discovery requires a description. Claude/Codex/Agents/OpenCode/Claude-plugin conventional providers may load without a description, while the portable Agent Plugins provider requires both `name` and `description` and validates a closed field set. OMP-specific `hide` and `enabled` are not accepted in that stricter Agent Plugins format.

`(D; omp://skills.md:252-257)` OMP's authoring guidance nevertheless says to include both fields explicitly, keep assets under the skill directory, and resolve those assets with `skill://<name>/...`.

The bundled authoring documents demonstrate the same YAML-frontmatter shape in practice:

- `(D; omp://skills/authoring-extensions.md:1-8)` `name: authoring-extensions` plus a one-line `description` between `---` delimiters.
- `(D; omp://skills/authoring-hooks.md:1-10)` `name: authoring-hooks` plus a one-line `description` between `---` delimiters.
- `(D; omp://skills/authoring-marketplaces.md:1-10)` `name: authoring-marketplaces` plus a one-line `description` between `---` delimiters.

Those three files are themselves authoring capability documents; their extension/hook/marketplace subject matter does not replace the native `SKILL.md` layout above. `(A; based on the three authoring-file bodies and omp://skills.md:23-73)`

### Naming and direct access

`(D; omp://skills.md:124-135)` Raw frontmatter names containing `/` or `\\` are rejected for every provider and custom directory. Separators are reserved for namespaced collision aliases and `skill://<name>/<path>` addressing.

`(D; omp://skills.md:180-217)` `skill://<name>` resolves to that skill's `SKILL.md`; `skill://<name>/<relative-path>` resolves within the skill directory. Absolute paths, `..` traversal, and paths escaping the skill base are rejected, and missing assets do not trigger fallback search.

## Discovery rules that affect project skills

### One level, not recursive

`(D; omp://skills.md:27-48)` Provider and custom-directory scans enumerate only `*/SKILL.md` immediately below the configured `skills/` root. This is discovered:

```text
.omp/skills/postgres/SKILL.md
```

This is not discovered by the same scan:

```text
.omp/skills/team/internal/SKILL.md
```

For a taxonomy such as `team/domain/skill`, `(D; omp://skills.md:47-48, 252-257)` the documented remedy is to point `skills.customDirectories` at the nested parent; that scan is still non-recursive. A nested tree does not become recursive merely because it is under `.omp/skills`.

### Pipeline and precedence

`(D; omp://skills.md:75-83)` `loadSkills()` has three relevant passes:

1. Capability providers.
2. Configured `skills.customDirectories`, scanned one level and merged after provider skills; a custom-directory skill overrides a same-named default provider skill.
3. Managed/auto-learn skills last; an enabled authored skill wins over a same-named managed skill.

`(D; omp://skills.md:83-104)` If `skills.enabled` is false, no skills are returned. Provider priority starts with native `.omp` user/project skills at 100, then Skillshare at 95, `omp-plugins` at 90, and other providers below that; GitHub project skills are at 30 and managed skills at 5. The first item per name wins the deduped view, while the collision resolver can retain differing lower-precedence copies under a namespace.

`(D; omp://skills.md:106-122)` Filtering is applied in this order:

1. Exclude `disabledExtensions` entries such as `skill:<name>`.
2. Require the source toggle to be enabled.
3. Exclude `ignoredSkills` glob matches.
4. Apply the `includeSkills` glob allowlist when present.

The native project toggle is represented by `enablePiProject` (a legacy-named setting that still gates the native provider); `enablePiUser` gates its user side. `(D; omp://config-usage.md:330-334; D; omp://skills.md:106-122)`

`(D; omp://skills.md:124-135)` When same-named skills differ, the higher-precedence skill keeps the bare name and other variants receive a namespaced form such as `<namespace>/<name>`; identical copies collapse. Custom-directory skills outrank default provider skills, and a namespaced alias cannot bypass `disabledExtensions` or `ignoredSkills`.

### Plugin/marketplace layout is separate from native `.omp/skills`

`(D; omp://skills/authoring-marketplaces.md:196-215)` A plugin carries skills at:

```text
my-plugin/
  skills/<name>/SKILL.md
```

`(D; omp://skills/authoring-extensions.md:100-102)` When an extension package is loaded through `extensions:` or `--extension`/`-e`, the `omp-plugins` provider discovers sibling capability directories including `skills/`.

`(D; omp://skills/authoring-marketplaces.md:232-244)` Marketplace installation has two scopes: user scope (default, available in all projects) and project scope (under `<project>/.omp/plugins/installed_plugins.json`, available only in that project). A plugin's `skills/<name>/SKILL.md` is therefore not evidence that a shared parent directory's native `.omp/skills` is inherited by sibling repositories; it is a separate plugin provider and scope model. `(A; distinction derived from the separate native and plugin rules in the cited docs)`

## Bottom line for implementation

`(D; omp://config-usage.md:284-292; D; omp://skills.md:27-48, 252-257)` For a skill owned by one repository, create:

```text
<repo>/.omp/skills/<stable-name>/SKILL.md
```

with explicit `name` and `description` YAML frontmatter and a Markdown body. Keep referenced files below that skill directory.

`(A; applying the documented boundary to the sibling-repository question)` Do not place a native project skill only in a common parent of independent sibling repositories and expect it to be discovered automatically. For cross-project reuse, use the documented user-level native location (`~/.omp/agent/skills`) or an appropriately scoped plugin/custom-directory mechanism; use a repository-root `.omp/skills` when the projects are actually nested within one repository boundary.

## Verification boundary

`(R; read-only inspection in this session)` The conclusions above came from reading the bundled OMP resources and the relevant historical-session user entries. No repository files, OMP configuration, git state, GitHub objects, or runtime state were changed, and no test was run.
