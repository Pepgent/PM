# OMP Gemini 4 Argon — Antigravity model inventory

## Answer

**Canonical selector: `google-antigravity/gemini-4-argon`. Supported thinking levels: `low`, `medium`, `high`. Use `thinking-level: high`.** (R: `omp models find argon --json`; full captured output `artifact://16:raw:1-1`; R: read-only SQLite query below.)

The requested “agy” channel is represented by **`google-antigravity`** in the installed model catalog, not by a literal `agy` provider id. `omp models agy --json` returned `{"models":[]}`. This establishes the listing result only; it is **not** a claim about whether every other OMP selector surface recognizes a shorthand alias. Use the canonical selector rather than relying on that shorthand. (R: `omp models agy --json`; `omp models find argon --json`.)

## Exact agent definition

```markdown
---
name: argon-high
description: Run assigned work with Gemini 4 Argon on the Antigravity channel at high effort.
model: google-antigravity/gemini-4-argon
thinking-level: high
---

Complete the assigned work and report the result with concrete evidence.
```

`name`, `description`, and the prompt body above are proposed example text, not an existing installed agent. The **model and thinking-level values are observed catalog values**. No agent file was created. (R: catalog evidence below; D: `omp://task-agent-discovery.md:25-44`.)

OMP documents that `model` accepts a selector and `thinking-level` / `thinking` selects the agent's configured effort. It discovers user definitions from `~/.omp/agent/agents/*.md` and project definitions from `.omp/agents/*.md`. (D: `omp://task-agent-discovery.md:34-44,51-53`.)

## Evidence

### 1. Installed CLI and the read-only listing interface

`omp --help` identified installed **OMP v18.14.2**, documented exact provider-qualified selectors with `--model`, and listed:

```text
models         List, search, and refresh available models
```

`omp models --help` showed:

```text
USAGE
  $ omp models [ACTION] [PATTERN] [FLAGS]

ARGUMENTS
  ACTION    ls (default) | find | refresh | <provider>
  PATTERN   Filter/search substring, or provider name (required for find)

FLAGS
      --json               Output JSON
```

(R: `omp --help`; `omp models --help`.)

The command used was **`omp models find argon --json`**, not `refresh`. The matching Antigravity object contained these exact fields (projection of the captured object; unrelated cost fields omitted):

```json
{
  "provider": "google-antigravity",
  "kind": "chat",
  "id": "gemini-4-argon",
  "selector": "google-antigravity/gemini-4-argon",
  "name": "Gemini 4 Argon",
  "contextWindow": 1048576,
  "maxTokens": 65536,
  "reasoning": true,
  "thinking": ["low", "medium", "high"],
  "input": ["text", "image"]
}
```

(R: `omp models find argon --json`; `artifact://16:raw:1-1`.)

Other available matches had different canonical routes: `commandcode/google/gemini-4-argon` and `opencode-go/gemini-4-argon`. The commandcode row reported `reasoning: false` and `thinking: null`; neither route is the requested Antigravity channel. (R: the same command and full capture.)

### 2. Local catalog database independently corroborates the thinking surface

`read /Users/mouriya/.omp/agent/models.db` listed tables `model_cache` and `model_cache_refresh`. A schema query established that `model_cache` stores `provider_id` and JSON `models` among its columns. (R: read-only database inspection and `SELECT name, type FROM pragma_table_info('model_cache')`.)

Exact targeted query through the read tool's read-only SQLite support:

```sql
SELECT
  provider_id,
  json_extract(j.value, '$.id') AS id,
  json_extract(j.value, '$.thinking.mode') AS mode,
  json_extract(j.value, '$.thinking.efforts[0]') AS effort0,
  json_extract(j.value, '$.thinking.efforts[1]') AS effort1,
  json_extract(j.value, '$.thinking.efforts[2]') AS effort2,
  json_array_length(json_extract(j.value, '$.thinking.efforts')) AS effort_count
FROM model_cache, json_each(model_cache.models) AS j
WHERE provider_id = 'google-antigravity'
  AND json_extract(j.value, '$.id') = 'gemini-4-argon'
```

Result:

| provider_id | id | mode | effort0 | effort1 | effort2 | effort_count |
|---|---|---|---|---|---|---|
| google-antigravity | gemini-4-argon | google-level | low | medium | high | 3 |

(R: `/Users/mouriya/.omp/agent/models.db?q=` followed by the SQL above.)

This is cached catalog metadata, not a live inference response. CLI and database agree on the exact route and all three supported efforts. (R: the two observations above.)

### 3. Existing models.yml and config.yml

`~/.omp/agent/models.yml` currently contains custom provider sections for `futureppo`, `futureppo-jev`, `futureppo-pool`, and `openai-codex`; it contains no custom `agy` or `google-antigravity` section. This absence does not negate the built-in/discovered catalog entry. Credential fields are deliberately not reproduced. (D: `/Users/mouriya/.omp/agent/models.yml:1-41`; the catalog's presence is R evidence from the commands/database above.)

The existing plan role already uses the exact canonical route with high effort:

```yaml
modelRoles:
  plan: google-antigravity/gemini-4-argon:high
```

(D: `/Users/mouriya/.omp/agent/config.yml:10-12`.)

Relevant current task configuration:

```yaml
task:
  enableEffort: false
  maxEffort: high
```

(D: `/Users/mouriya/.omp/agent/config.yml:80-82`.)

The observed global `task.agentModelOverrides` mapping has **no `argon-high` entry**, and the observed disabled-agent list does not include that proposed name. (D: `/Users/mouriya/.omp/agent/config.yml:54-74`.)

OMP documents that `task.agentModelOverrides[agentName]` outranks an agent's frontmatter model. Its documented task effort override is exposed only with `task.enableEffort`; when exposed, a task item's coarse effort takes precedence over configured agent effort and is bounded by `task.maxEffort`. Thus the current observed global mapping does not override this example's model, and the current high ceiling permits its `high` setting. Other project or explicit overlays were not inventoried in this bounded slice. (D: `omp://task-agent-discovery.md:43-44,222-230`; `/Users/mouriya/.omp/agent/config.yml:63-82`.)

## Scope and confidence

- **Observed:** exact installed CLI selector, name, provider, three supported effort values, matching local database capability fields, existing plan role mapping, and relevant global task settings. (R/D evidence above.)
- **Not exercised:** a model inference request, agent launch, credentials, or endpoint availability. No successful runtime inference is claimed.
- **No user design-intent session was needed:** the explicit assignment was an OMP catalog lookup. No historical sessions, git history, or GitHub history were read.
- **State changes:** only this requested local report was authored. No repository files, agent definitions, or OMP configuration were edited; no refresh or GitHub operation was invoked. The inventory/listing commands were run without requesting catalog refresh.
