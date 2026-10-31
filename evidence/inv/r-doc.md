# `pepgent-doc` repository inventory

## Scope and evidence convention

This report covers the **working tree** of `/Users/mouriya/Ext/code/pepgent/pepgent-doc`. The requested scope was to “Describe: purpose, structure, key documents (summarize what each says about Pepgent architecture, components, deployment), stack, `git remote -v`, current branch.” (U; task brief, `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/626f1bab`, child task `RepoDoc`). I did not read Git history, GitHub issue/PR history, or alter the repository.

Evidence tags used below:

- **(U)** — the user's stated intent, quoted verbatim where relevant.
- **(D)** — text or code in the current repository working tree.
- **(R)** — observed command/tool output against the current working tree.
- **(A)** — an interpretation, explicitly kept separate from repository facts.

Product-scope context from the user is important when reading this repository: **“soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远”** (U; `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`). Therefore this inventory does not treat this UI/prototype repository as Soroi itself or as the complete Pepgent product.

## Executive summary

`pepgent-doc` is a browser-side **Design Component / interactive UI prototype package** for an AI4S research-lab product concept. The repository has no substantive README: `README.md` contains only a blank line (D; `/Users/mouriya/Ext/code/pepgent/pepgent-doc/README.md:1-2`). The executable evidence is instead in 16 `.dc.html` files and the generated `support.js` runtime (R; `glob /Users/mouriya/Ext/code/pepgent/pepgent-doc`).

Each page is a self-contained HTML document that loads `./support.js`, places a template inside `<x-dc>`, and supplies a `data-dc-script` inline JavaScript class. For example, the home page has the HTML/support.js/x-dc structure at lines 1–10 and defines `class Component extends DCLogic` at lines 203–204 (D; `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S Lab Home Hi-Fi.dc.html:1-10,203-204`). The shared runtime parses `<x-dc>` and the inline script (D; `support.js:23-48`), loads React and ReactDOM (D; `support.js:9-19,1142-1148,1838-1846`), evaluates the `Component extends DCLogic` class (D; `support.js:816-850`), and fetches sibling `.dc.html` components for `<dc-import>` references (D; `support.js:1621-1675`).

The pages represent a coherent product model:

1. A lab/workspace and project-focus shell.
2. Discussions, experiments, flows, node definitions and artifact lineage.
3. Container images and cluster/node compute infrastructure.
4. Automation rules and AI/agent templates.
5. Human approval and intervention around irreversible actions.
These five themes are a synthesis of the current page/component models, not a claim that the corresponding production services are present (A; D; `AI4S Lab Home Hi-Fi.dc.html:232-246,278-344`; `AI4S Node Library Hi-Fi.dc.html:189-222`; `AI4S Sandbox Clusters Hi-Fi.dc.html:252-295`; `AI4S Automation Hi-Fi.dc.html:114-139`; `AI4S Settings Hi-Fi.dc.html:139-183`).

That model is **represented in UI data and interaction code**, not demonstrated here as a deployed Pepgent backend. The current pages keep substantial state in inline component state and, for shared lab/project settings, browser `localStorage` (D; `/Users/mouriya/Ext/code/pepgent/pepgent-doc/Lab Sidebar.dc.html:103-141`). No production API, server process, database schema, deployment manifest, or build configuration was observed in the root inventory (R; `glob /Users/mouriya/Ext/code/pepgent/pepgent-doc`). The narrow, evidence-backed conclusion is: this repository is an editable/static Design Component package whose UI describes the intended AI4S/Pepgent architecture; production operational status is unverified (A; based on D/R evidence and mentor boundary review, `history://RepoDoc.DocInventoryMentor`).

## Repository structure

### Root files and directories

The current root inventory contains:

- `support.js` — the generated Design Component runtime (R; root glob; D; `support.js:1`).
- 16 `.dc.html` documents/components: the high-fidelity AI4S pages, shared `AI Panel`, `Lab Sidebar`, `Action Dialog`, and the earlier `AI4S Lab Prototype` (R; root glob).
- `AI4S实验室平台原型.zip` — a packaged snapshot containing the same principal `.dc.html` files, `support.js`, `scraps/`, and `uploads/` (R; `glob /Users/mouriya/Ext/code/pepgent/pepgent-doc`; archive listing `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S实验室平台原型.zip`).
- `uploads/` and `scraps/` — image and scratch/design assets (R; root glob).
- `.thumbnail` — a thumbnail asset (R; root glob).
- `README.md` — currently blank, so it is not an authoritative architecture or deployment guide (D; `README.md:1-2`).

There are no observed package manifests, application/server directories, infrastructure declarations, or deployment scripts in this root inventory (R; root glob). This is an inventory observation, not a claim about other Pepgent repositories.

### Component composition

The pages share a common layout and import reusable components. The home page imports `Action Dialog` and `Lab Sidebar` via `<dc-import>` (D; `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S Lab Home Hi-Fi.dc.html:11-14`). Compute and experiment pages use the same pattern (D; `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S Sandbox Clusters Hi-Fi.dc.html:11-14`; `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S Experiments Hi-Fi.dc.html:11-14`). The runtime resolves a sibling component to `./<name>.dc.html` and parses its `<x-dc>` block (D; `support.js:1642-1675`).

The shared components are:

- `Lab Sidebar.dc.html` — lab selector, project-focus filters, navigation, settings sub-navigation, and collapse state. The navigation includes Home, Discussions, Experiments, Automation, Datasets, Compute, and Settings (D; `Lab Sidebar.dc.html:103-141`).
- `AI Panel.dc.html` — reusable AI chat/session panel with session selection/rename, prompt chips, model selection, and staged assistant replies (D; `AI Panel.dc.html:77-115`).
- `Action Dialog.dc.html` — generic modal for text, textarea, segmented choice, single/multi-choice, toggle, information, and code fields, with confirm/done and close callbacks (D; `Action Dialog.dc.html:46-69`).

## Stack and runtime mechanics

### Browser/runtime stack

- **HTML** is the page/container format; each document has standard metadata and loads `support.js` (D; e.g. `AI4S Lab Home Hi-Fi.dc.html:1-10`).
- **Design Component markup** is expressed through `<x-dc>`, `<sc-if>`, `<sc-for>`, `<dc-import>`, and interpolation such as `{{ value }}` (D; e.g. `AI4S Lab Home Hi-Fi.dc.html:9-14,72-74`).
- **JavaScript component logic** is an inline `class Component extends DCLogic` with a `state` object and `renderVals()` data projection (D; e.g. `AI4S Lab Home Hi-Fi.dc.html:203-204,307-345`; `AI Panel.dc.html:78-115`).
- **React and ReactDOM** are the rendering substrate. `support.js` reads `window.React`/`window.ReactDOM` and creates React elements (D; `support.js:8-21`). If they are absent, the runtime loads React 18.3.1 and ReactDOM 18.3.1 UMD bundles from unpkg; Babel Standalone is also declared for external JSX loading (D; `support.js:1142-1148,1838-1846`). These are the currently observed runtime URLs, not a recommendation to change dependency policy.
- **Generated runtime**: `support.js` begins with “GENERATED from dc-runtime/src/*.ts” and says to rebuild from `dc-runtime` (D; `support.js:1`). That source tree is not present in this repository root inventory, so the checked-in JS is the available runtime artifact (R/D; root glob and `support.js:1`).
- **Local browser persistence**: `Lab Sidebar` reads/writes `ai4s-side-open`, `ai4s-proj`, and `ai4s-lab` with `localStorage` (D; `Lab Sidebar.dc.html:103-111`). Several page components likewise initialize language and project state from `localStorage` (D; e.g. `AI4S Lab Home Hi-Fi.dc.html:203-204`; `AI4S Discussions Hi-Fi.dc.html:203-207`).
- **Styling** is mostly inline CSS in the component templates, with embedded Google-font links and a small amount of runtime-injected CSS (D; e.g. `AI4S Lab Home Hi-Fi.dc.html:10`; `support.js:90-132,1848-1853`).

### What is and is not implemented in this repository

The runtime itself is real browser-side code: it parses the component document, compiles templates, evaluates component logic, mounts the React tree, and loads sibling components (D; `support.js:23-48,816-850,1621-1675,1848-1905`). The product-domain data is primarily inline seeded state and UI callbacks. For example, the home page constructs labs, activity events, projects, clusters, active workflows, and AI prompts in `renderVals()` (D; `AI4S Lab Home Hi-Fi.dc.html:232-246,278-344`). The AI panel's `send()` method appends a user message and returns the configured reply after a local timer (D; `AI Panel.dc.html:82-87`).

Accordingly, this report distinguishes **implemented prototype behavior** (browser rendering, local UI interaction, mock/seeded presentation state) from **represented product architecture** (controllers, nodes, images, experiments, artifacts, agents and deployment flows). The latter is design intent shown by the pages, not verified backend functionality (A; based on D/R evidence; mentor boundary review at `history://RepoDoc.DocInventoryMentor`).

## Product architecture represented by the documents

### Domain and research objects

The documents model a lab as a workspace with members, projects, discussions, experiments, node definitions, artifacts and conclusions. Projects are used as cross-cutting filters rather than isolation boundaries: the Settings page says projects are labels and “never isolate work” (D; `AI4S Settings Hi-Fi.dc.html:164-170`). The Lab Home page presents activity, reports, milestones, compute clusters and active experiments together (D; `AI4S Lab Home Hi-Fi.dc.html:235-246,289-344`).

An experiment is a flow/DAG of predefined nodes. Each node binds a device or compute role, parameters, a container image, a cluster, an artifact contract and hard verdict criteria (D; `AI4S Node Library Hi-Fi.dc.html:189-222,249-270`). The Flow Editor adds/removes/wires only nodes from its library and validates missing verdict nodes, disconnected nodes and shared instrument scheduling (D; `AI4S Flow Editor Hi-Fi.dc.html:166-247`). The Experiment Flow page exposes plan, running and retrospective views over the same node topology, artifacts and verdicts (D; `AI4S Experiment Flow Hi-Fi.dc.html:142-198`).

Discussions bind experiments and load selected artifacts as AI context. The Discussions page models bound experiments, loaded artifacts, conclusions, plans and experiments launched from a discussion (D; `AI4S Discussions Hi-Fi.dc.html:228-234,269-318`). The Datasets page presents experiment artifacts and discussion outputs with preview, lineage, contract checks and “used in” references (D; `AI4S Datasets Hi-Fi.dc.html:117-172`).

### Compute and execution objects

The compute layer is represented as:

1. A **cluster controller**, one per cluster, which holds state, schedules containers and talks to nodes.
2. **Docker nodes**, each with a small agent, capacity/labels, optional GPU and device pass-through.
3. **Containers** serving research runners, verdict agents, discussion sandboxes or platform services.
4. **Images** built from manifests and bound to eligible clusters/nodes.
The four-object model is an interpretation of the controller/node/container/image descriptions, not an observation of live infrastructure (A; D; `AI4S Connect Cluster Hi-Fi.dc.html:201-236`; `AI4S Sandbox Clusters Hi-Fi.dc.html:252-295`; `AI4S Container Settings Hi-Fi.dc.html:407-425`).

The controller/node distinction and scheduling responsibility are stated directly in the Connect Cluster page (D; `AI4S Connect Cluster Hi-Fi.dc.html:201-202,226-233,235-236`). The Sandbox Clusters page lists Docker/H100, Docker/A100, Docker/L40S and instrument-edge clusters, endpoints, node/GPU capacity, container roles, mounts and logs (D; `AI4S Sandbox Clusters Hi-Fi.dc.html:252-281,278-295,337-358`).

### Image/build layer

Container Settings represents five image families: instrument runners (`xrd`, `anneal`, `afm`), a verdict agent, and a notebook/discussion sandbox (D; `AI4S Container Settings Hi-Fi.dc.html:407-425`). A manifest is partitioned into base image, vendor SDK/driver, Python packages, internal libraries, copied files, and runtime configuration; the XRD example includes vendor/private registries, internal PyPI, copied scripts and an entrypoint (D; `AI4S Container Settings Hi-Fi.dc.html:413-425,497-524`).

The intended change path is assistant draft → staged changes → pre-build check/pre-build → build and push → optional dry-run → new sandbox containers consume the built image. The page explicitly says changes are staged first and only take effect for new sandbox containers after a build (D; `AI4S Container Settings Hi-Fi.dc.html:385-392,430-458`). Its example also checks artifact contracts and device pass-through before a build/dry-run (D; `AI4S Container Settings Hi-Fi.dc.html:379-380`).

### Automation and agent layer

Automation rules react to experiment events, verdict failures, instrument idleness, schedules, image builds and sandbox idleness. Each rule names its trigger, conditions/actions, agent or node involved, and whether a human approval is required (D; `AI4S Automation Hi-Fi.dc.html:114-139,150-178`). Examples include drafting a retrospective into a discussion, pausing downstream nodes after a failed verdict, starting queued instrument scans only after approval, dry-running a new image on `instr-edge`, and reclaiming idle discussion sandboxes (D; same path/lines).

Settings models agent templates for Claude Code, Codex CLI, Pi and OpenCode. A template contains harness configuration files, agent instructions/scripts and model choices, and is copied into a container when a run or sandbox starts (D; `AI4S Settings Hi-Fi.dc.html:139-147,177-183`). Repository connections are read-only sources from which image builds can copy scripts; pushes can trigger rebuilds (D; `AI4S Settings Hi-Fi.dc.html:171-176`).

### Human control and safety boundary

The UI consistently places irreversible operations behind dialogs or approvals. `Action Dialog` provides the common confirmation/done surface (D; `Action Dialog.dc.html:34-41,46-69`). Automation includes “Needs approval” actions (D; `AI4S Automation Hi-Fi.dc.html:120-139`). Cluster actions such as restart/destroy, image pulls, and new sandboxes are dialog-driven (D; `AI4S Sandbox Clusters Hi-Fi.dc.html:242-248`). The experiment and discussion AI panels describe drafting/proposing rather than silently changing a running experiment (D; `AI4S Experiment Flow Hi-Fi.dc.html:190-198`; `AI4S Discussions Hi-Fi.dc.html:269-277`).

## Key document summaries

The table below covers every principal `.dc.html` document in the root. Each row states what the document contributes to the represented Pepgent/AI4S architecture and its deployment model.

| Document | What it says about architecture, components and deployment |
|---|---|
| `AI4S Lab Home Hi-Fi.dc.html` | Lab/workspace landing page: recent reports, activity, milestones, projects, compute clusters, active experiments and a lab-scoped AI assistant. It is the product-level aggregation view, not a deployment screen (D; `AI4S Lab Home Hi-Fi.dc.html:232-246,278-344`). |
| `AI4S Discussions Hi-Fi.dc.html` | Discussions are durable research conversations linked to projects and experiments. They load selected artifacts as bounded AI context, record conclusions, show plans and link to experiments launched from a discussion (D; `AI4S Discussions Hi-Fi.dc.html:228-234,241-252,269-318`). |
| `AI4S Experiments Hi-Fi.dc.html` | Experiment index with draft/queued/running/needs-you/ended/stopped states, progress, linked discussions and project filters. It is the entry point to flow editing and execution/retrospective views (D; `AI4S Experiments Hi-Fi.dc.html:98-121,110-144`). |
| `AI4S Experiment Flow Hi-Fi.dc.html` | Run/plan/retro visualization of an experiment graph. It connects nodes to devices, artifacts, verdicts and scheduling, and gives separate AI behavior for drafting, observing a live run, and explaining a finished run (D; `AI4S Experiment Flow Hi-Fi.dc.html:142-198`). |
| `AI4S Flow Editor Hi-Fi.dc.html` | Draft-flow editor. It lets a user or AI add, remove, parameterize and wire only Node Library entries; validation checks verdict-node presence, disconnected nodes and shared XRD scheduling (D; `AI4S Flow Editor Hi-Fi.dc.html:166-247`). |
| `AI4S Datasets Hi-Fi.dc.html` | Artifact catalog split between experiment artifacts and discussion outputs. It supports filtering, preview, lineage, contract checks, references and loading selected artifacts into a discussion; this is the evidence/data plane of the research model (D; `AI4S Datasets Hi-Fi.dc.html:117-172,178-197`). |
| `AI4S Automation Hi-Fi.dc.html` | Event/cron automation layer. Rules use existing agents/nodes, can post drafts, notify owners, pause downstream work, schedule devices, dry-run images and reclaim sandboxes; actions that start or change work may wait for approval (D; `AI4S Automation Hi-Fi.dc.html:114-139,150-178`). |
| `AI4S Node Library Hi-Fi.dc.html` | Predefined capability catalog. Each node carries device binding, inputs, typed parameters, artifact contract, hard verdict criteria, image, cluster, device pass-through and mounts. Changes are staged and apply to experiments started afterward rather than mutating running runs (D; `AI4S Node Library Hi-Fi.dc.html:189-222,249-270,279-294`). |
| `AI4S Sandbox Clusters Hi-Fi.dc.html` | Compute inventory and runtime operations. It models connected clusters, controllers/endpoints, capacity, running/queued/idle/failed containers, mounts/logs, image pulls, new sandboxes, shells, restarts and destructive actions (D; `AI4S Sandbox Clusters Hi-Fi.dc.html:252-281,290-295,337-365`). |
| `AI4S Connect Cluster Hi-Fi.dc.html` | Explicit deployment wizard. A new controller is installed over SSH on Linux, with Docker/database/TLS/admin/backups; an existing Docker machine is enrolled with an agent/token, labels, GPU/device capacity and heartbeat verification (D; `AI4S Connect Cluster Hi-Fi.dc.html:201-233,247-273,293-347`). |
| `AI4S Container Settings Hi-Fi.dc.html` | Image/component-manifest editor. It models image versions, Dockerfile layers, registry sources, artifact contracts, resource limits, cluster bindings, pre-build inspection, Dockerfile export, build/push and dry-run before publishing (D; `AI4S Container Settings Hi-Fi.dc.html:385-425,497-524,569-605,623-653`). |
| `AI4S Settings Hi-Fi.dc.html` | Lab administration and integration settings: members/roles/quotas, project labels, read-only repositories, and agent templates for Claude Code/Codex/Pi/OpenCode. Template files are copied into newly started containers; repository pushes can trigger image rebuilds (D; `AI4S Settings Hi-Fi.dc.html:139-147,149-183`). |
| `Lab Sidebar.dc.html` | Shared shell/navigation component. It owns lab switching, project focus, routes to all product areas and settings subsections, and browser-local sidebar/project/lab state (D; `Lab Sidebar.dc.html:37-49,103-141`). |
| `AI Panel.dc.html` | Shared AI interaction component. It supplies named sessions, rename/new-session behavior, model choices, prompt shortcuts, local chat state and staged assistant replies to all pages that import it (D; `AI Panel.dc.html:33-51,77-115`). |
| `Action Dialog.dc.html` | Shared action/confirmation component. It provides the common form vocabulary (text, area, segmented choice, single/multi-choice, toggle, info, code), warning/danger styling, completion state, `onClose` and `onDone` callbacks (D; `Action Dialog.dc.html:16-41,46-69`). |
| `AI4S Lab Prototype.dc.html` | Earlier, larger single-page prototype of the same concept. Its navigation includes timeline, artifacts, sandbox clusters, container settings, node definitions/editing, workflow/run/retro views and discussions; its seeded model directly links node definitions to images, clusters, mounts, artifact contracts and verdict criteria (D; `AI4S Lab Prototype.dc.html:1325-1331,1549-1580,1644-1650,1939-1987`). It is a predecessor/alternate prototype, not a separate production backend. |

`support.js` is also a key document even though it is not `.dc.html`: it is the runtime/loader that makes the pages executable in a browser, as described in the stack section (D; `support.js:1-48,816-850,1621-1675,1838-1905`).

## Deployment model represented by the UI

This repository does not contain an observed production deployment implementation. It contains a UI workflow that describes one (A; R; root glob; D; deployment-specific pages cited below):

1. **Install a cluster controller** on a fresh Ubuntu/Debian Linux host over SSH. The controller installs Docker and its database, configures TLS/admin/backups, exposes a controller API/UI, and may enroll itself as the first node (D; `AI4S Connect Cluster Hi-Fi.dc.html:226-229,247-259,293-315,326-345`).
2. **Enroll Docker nodes** into the controller using SSH or a one-command install. The node agent reports GPU/device information, labels and capacity, then registers and verifies a heartbeat (D; `AI4S Connect Cluster Hi-Fi.dc.html:230-233,261-273,317-338`).
3. **Build/publish images** from component manifests and repository/vendor/PyPI/internal-registry inputs. Pre-build and dry-run are available before a tag is published or bound to a node (D; `AI4S Container Settings Hi-Fi.dc.html:385-392,407-425,497-524,569-579`).
4. **Bind images to clusters/nodes** with resource limits, selectors, priority, optional device access and outbound-network settings; runtime artifacts use mounted paths such as `/ws/artifacts` (D; `AI4S Container Settings Hi-Fi.dc.html:532-565,580-605,645-653`).
5. **Schedule containers for experiment nodes, verdict agents and discussion sandboxes**, with cluster health, resource usage, mounts and logs visible in Sandbox Clusters (D; `AI4S Sandbox Clusters Hi-Fi.dc.html:252-281,290-295,337-358`).
6. **Run automation around events and schedules**, while preserving human approval for actions that start, pause, migrate, destroy or otherwise change work (D; `AI4S Automation Hi-Fi.dc.html:114-139,156-178`; `AI4S Sandbox Clusters Hi-Fi.dc.html:242-248`).

The actual package delivery mechanism visible here is much simpler: a page includes `support.js`, the runtime boots a root component, and sibling `.dc.html` files are fetched/resolved as needed (D; `AI4S Lab Home Hi-Fi.dc.html:1-10`; `support.js:1642-1665,1848-1905`). The controller/node/registry workflow above is therefore **represented product behavior**, not an observed deployment of this repository (A; based on the absence of deployment files in the root inventory and the browser-side runtime evidence, with the same boundary stated by `history://RepoDoc.DocInventoryMentor`).

## Git metadata

- **Current branch:** `main` (R; command `git branch --show-current` run in `/Users/mouriya/Ext/code/pepgent/pepgent-doc`).
- **Remote:**

  ```text
  origin  https://github.com/Pepgent/pepgent-doc.git (fetch)
  origin  https://github.com/Pepgent/pepgent-doc.git (push)
  ```

  (R; command `git remote -v` run in `/Users/mouriya/Ext/code/pepgent/pepgent-doc`).

- No Git history was inspected, per assignment scope (U; task brief, `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/626f1bab`).

## Limits and non-claims

- The blank README means the repository has no prose source-of-truth for purpose or deployment; the architecture summary above is extracted from current `.dc.html` UI text and `support.js` mechanics (D; `README.md:1-2`; D citations throughout).
- The repository’s literal UI strings predominantly say `AI4S Lab`/`Geometric AI Lab`; a search for the literal `Pepgent` returned no matches in the searchable working-tree files (R; `grep Pepgent /Users/mouriya/Ext/code/pepgent/pepgent-doc`). The Pepgent relationship is therefore product/context interpretation, not a name declared in these files (A; based on R and U context).
- The observed pages contain seeded state, local UI callbacks and localStorage; this report does not claim that the displayed labs, clusters, images, artifacts, users or runs exist operationally (D; representative state paths cited above; A boundary from mentor review).
- No production API contract, server process, database, auth integration or deployable cluster controller was observed in this repository root inventory. This is narrowly “not observed here,” not a claim that sibling Pepgent repositories lack those things (R; root glob; A).
- No build, test, browser smoke test or deployment command was run. This report is a read-only inventory, not runtime verification (R; tool activity and assignment scope).
