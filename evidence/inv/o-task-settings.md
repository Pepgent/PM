# OMP task settings and model roles

## Scope and requested result

> **(U)** “Report current values (or defaults per omp://settings.md) of task.maxRecursionDepth, task.perCallModel, task.agentModelOverrides, task.maxEffort, and modelRoles entries.” — `session://01a193fd-e992-76d2-8c29-060fe52cc094/agents/OmpTaskSettings/entry/6fe6b167`

> **(U)** “local://inv/o-task-settings.md.” — `session://01a193fd-e992-76d2-8c29-060fe52cc094/agents/OmpTaskSettings/entry/6fe6b167`

The inspected target is the active global settings file, `/Users/mouriya/.omp/agent/config.yml` (`~/.omp/agent/config.yml`). The OMP settings documentation identifies that path as the canonical global persistent settings file. **(D)** `omp://settings.md:15-18`

This inventory reports the values written in that global file. It does not claim to be the final effective runtime value after project settings, CLI overlays, runtime overrides, or setting environment variables; OMP documents those higher-precedence layers. **(D)** `omp://settings.md:113-130`

## Requested task settings

| Setting | Current global-config value | Basis |
|---|---|---|
| `task.maxRecursionDepth` | **`2` (documented default; not explicitly configured)** | The exact key has no match in the active config. **(R)** Exact-key search of `/Users/mouriya/.omp/agent/config.yml` for `maxRecursionDepth` and `perCallModel`: no matches. The task-agent documentation states that `task.maxRecursionDepth` defaults to `2`; a negative value disables the cap. **(D)** `omp://task-agent-discovery.md:372-376` |
| `task.perCallModel` | **`off` (documented default; not explicitly configured)** | The exact key has no match in the active config. **(R)** Exact-key search of `/Users/mouriya/.omp/agent/config.yml` for `maxRecursionDepth` and `perCallModel`: no matches. The documented modes are `off`, `eval`, and `on`, with `off` as the default. **(D)** `omp://task-agent-discovery.md:232-242` |
| `task.agentModelOverrides` | **Explicit mapping with 11 entries; listed in full below** | **(R)** `/Users/mouriya/.omp/agent/config.yml:63-74` |
| `task.maxEffort` | **`high`** | Explicitly configured in the active global file. **(R)** `/Users/mouriya/.omp/agent/config.yml:80-82`. The documented default is `max`, so this is an explicit narrowing from the default. **(D)** `omp://task-agent-discovery.md:43-44` |

The settings catalog says that `task.*` paths not individually tabulated in that catalog are deferred to `omp config list`; the behavior-specific defaults above are therefore cited from the task-agent documentation rather than attributed to an absent table row in `omp://settings.md`. **(D)** `omp://settings.md:1042-1046`; **(D)** `omp://task-agent-discovery.md:43-44,232-242,372-376`

### `task.agentModelOverrides`

These are the exact configured values, preserving the YAML strings and selector order. **(R)** `/Users/mouriya/.omp/agent/config.yml:63-74`

```yaml
task:
  agentModelOverrides:
    discuss:divergent: "anthropic/claude-opus-5-5:medium, openai-codex/gpt-5.6-luna:max"
    discuss:steady: openai-codex/gpt-5.6-sol:medium
    mentor:default: "openai-codex/gpt-5.6-sol:high, openai-codex/gpt-5.6-luna:max"
    task:high: anthropic/claude-opus-5-5:high
    task:mid: openai-codex/gpt-6-1-sol:high
    task:free: "bansos/muse-spark-1.3-contributor:xhigh, opencode-go/muse-spark-1.3-contributor:xhigh, openai-codex/gpt-6-luna:max"
    task:low: openai-codex/gpt-5.6-luna:max
    roundtable-owner: anthropic/claude-opus-5-5:high
    roundtable-reviewer: openai-codex/gpt-6-1-sol:high
    sonic: openai-codex/gpt-6-luna:max
    task: openai-codex/gpt-6-luna:max
```

The routing precedence documented for task dispatch is `task.agentModelOverrides[agentName]`, then agent frontmatter model, then the parent's active/configured model. **(D)** `omp://task-agent-discovery.md:222-230`

## `modelRoles`

`modelRoles` has a documented default of an empty mapping, `{}`. **(D)** `omp://settings.md:455-458`. The active global file explicitly configures the following 17 entries; no additional built-in role values are added to this inventory. **(R)** `/Users/mouriya/.omp/agent/config.yml:10-27`

| Role | Configured selector |
|---|---|
| `slow` | `anthropic/claude-opus-5-5:high` |
| `plan` | `google-antigravity/gemini-4-argon:high` |
| `commit` | `anthropic/claude-haiku-5-5:medium` |
| `tiny` | `openai-codex/gpt-5.6-luna:max` |
| `task` | `anthropic/claude-opus-5-5:medium` |
| `advisor` | `openai-codex/gpt-6.1-sol:medium` |
| `vision` | `openai-codex/gpt-6-luna:medium` |
| `web` | `openai-codex/gpt-6-luna` |
| `smol` | `anthropic/claude-haiku-5-5:high` |
| `judge` | `futureppo-jev/decision-model-preview` |
| `input-polish` | `opencode-go/muse-spark-1.3-contributor:high` |
| `lang-nag` | `futureppo-pool/minimax-m3.1-flash` |
| `task-completion-judge` | `openai-codex/gpt-6-1-sol` |
| `task-split-check` | `openai-codex/gpt-6.1-sol` |
| `doc-polish.split` | `opencode-go/muse-spark-1.3-contributor:xhigh` |
| `doc-polish.polish` | `commandcode/google/gemini-3.7-flash:high` |
| `default` | `anthropic/claude-opus-5-5:high` |

## Evidence classification

- **(U)** User intent and acceptance criteria, cited to the task assignment entry above.
- **(D)** OMP documentation text from the cited `omp://` resource and line range.
- **(R)** Direct observation of the active config file or the exact-key search result, with the cited path/operation.
- **(A)** No assistant-only interpretation is needed for the values above; the configured-versus-default distinction is stated explicitly where relevant.

No repository files, OMP configuration files, Git state, GitHub objects, tests, or runtime/model-routing experiments were changed or run for this read-only inventory.
