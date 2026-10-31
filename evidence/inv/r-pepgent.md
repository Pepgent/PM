# pepgent working-tree inventory

## Scope, intent, and evidence convention

**Requested target:** the working tree at `/Users/mouriya/Ext/code/pepgent/pepgent`.

> “Describe: purpose (AGENTS.md, README, docs/), stack, build/test commands, AI4S-prototype contents (screens/features, data model it shows), apps/ and packages/ contents, what the frontend currently implements and what backend/API it expects (mock data shapes, endpoints), `git remote -v`, current branch.”

(U) This is the user’s exact requested change scope from the task message (the current task contains no Chinese-language intent statement). The related product-session intent, quoted verbatim because it is the user’s own wording, was: “如果要按AI4S-prototype这个原型来实现，在现在的基础上，现在有了基本的ai ui，你要怎么实现” and later “去实现吧，这个实现可以用task high来做” ([session `01a192a2-8358-7559-bf46-e3ed6e387d73`, timeline 00:45:13 `#1951b981` and 02:43:44 `#9df25cb1`](session://01a192a2-8358-7559-bf46-e3ed6e387d73/timeline?type=user)). These statements explain why this inventory distinguishes the AI4S prototype/fixture surface from the existing desktop/session surface; they are intent evidence, not repository implementation evidence.

Evidence tags used below:

- **(U)** user intent from the task or a session, cited by session/timeline.
- **(D)** current working-tree document/source text, cited by repository path and line range.
- **(R)** directly observed command output from this inventory.
- **(A)** an assistant/agent interpretation. I avoid using (A) for implementation facts; where an interpretation is unavoidable it is explicitly marked and grounded in the preceding (D)/(R) evidence.

(R) This was a read-only inventory. I read current working-tree files and ran only the requested repository metadata command; I did **not** run `npm install`, a build, a test, a dev server, a production server, or a browser journey. No repository files were edited.

## Executive summary

(D) Pepgent is an independent TanStack Start web application closure: React browser UI, server functions, SSE routes, a Node runtime, the self-hosted `@pepgent/hub` relay, `@pepgent/core`, `@pepgent/ui`, and vendored Paseo workspaces. Native packaging and unrelated upstream workspaces are explicitly outside this closure ([`README.md:1-8`](../../Users/mouriya/Ext/code/pepgent/pepgent/README.md#L1-L8)).

(D) The AI4S prototype itself is a static Claude Design export: 12 high-fidelity `.dc.html` pages, three shared `.dc.html` components, and one early wireframe; the static pages are not part of the npm build ([`AI4S-prototype/README.md:1-3`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/README.md#L1-L3), [`README.md:20-21`](../../Users/mouriya/Ext/code/pepgent/pepgent/README.md#L20-L21)).

(D) The current web frontend has a React `_lab` route family that maps those AI4S surfaces to `features/lab-*` components, but its lab data source is intentionally UI-only: a typed, immutable `LabSnapshot` fixture read through `PepgentBridge.lab.readSnapshot()`. The lab bridge source explicitly says there is no server function, storage, or timer ([`apps/web/src/client/services/lab.ts:4-13`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab.ts#L4-L13)). Therefore, there is no current AI4S backend endpoint contract to call; the typed fixture shape is the current front-end seam, not evidence of a deployed lab API.

(D) The non-lab/session frontend does have a real same-process backend boundary. TanStack Start server functions validate typed operation inputs and return `OperationResult` values; the two explicit HTTP streaming routes are `GET /api/host/events` and `GET /api/transcript/stream?connectionId=...` ([`apps/web/src/protocol/routes.ts:6-39`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/protocol/routes.ts#L6-L39), [`apps/web/src/rpc/host.ts:14-45`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/host.ts#L14-L45), [`apps/web/src/rpc/transcript.ts:18-36`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/transcript.ts#L18-L36)).

## 1. Repository purpose and documentation

### `AGENTS.md`

(D) The root `AGENTS.md` is a short Chinese routing digest for contributors/agents. It identifies the owned web/hub/core/UI closure and vendored Paseo workspace, states that source/contracts/real runtime evidence are authoritative, and routes work to the numbered convention documents ([`AGENTS.md:1-5`](../../Users/mouriya/Ext/code/pepgent/pepgent/AGENTS.md#L1-L5)).

(D) Its most important topology statement is that `apps/web` contains the TanStack Start React UI, server functions, SSE routes, and Node runtime in one process; `apps/hub` is a self-hosted Paseo relay control plane; `packages/core` and `packages/ui` are shared packages; and `packages/paseo/**` is vendored Paseo ([`AGENTS.md:1-3`](../../Users/mouriya/Ext/code/pepgent/pepgent/AGENTS.md#L1-L3)).

(D) It also routes AI4S work to `AI4S-prototype/README.md`, `AI4S-prototype/CLAUDE.md`, and the CSS/design-system convention, and gives the Astryx CLI discovery sequence while explicitly saying not to run `astryx init` ([`AGENTS.md:13-24`](../../Users/mouriya/Ext/code/pepgent/pepgent/AGENTS.md#L13-L24)).

### Root `README.md`

(D) The root README describes the independent closure and its layout: `apps/web`, `apps/hub`, `packages/core`, `packages/ui`, `packages/paseo`, `scripts`, `patches`, `docs/conventions`, and `AI4S-prototype` ([`README.md:3-21`](../../Users/mouriya/Ext/code/pepgent/pepgent/README.md#L3-L21)).

(D) It gives the shortest independent run path as `npm install`, `npm run build`, and `npm run dev`; it says `npm run dev` starts the app with its backend in one process and that the built app can be started with `npm --workspace @pepgent/web run start` ([`README.md:23-35`](../../Users/mouriya/Ext/code/pepgent/pepgent/README.md#L23-L35)).

### `docs/`

(D) `docs/conventions/` is the cross-cutting engineering rule set. Its index lists seven documents in reading order: repository layout/layering, naming, TypeScript/React, CSS/design system, testing tiers, toolchain/gates, and documentation/review/contribution ([`docs/conventions/README.md:1-13`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/README.md#L1-L13)).

(D) The layout convention defines the 4 owned product workspaces plus 7 vendored Paseo workspaces and assigns runtime zones (`app`, `rpc`, `server`, `client`, `protocol`, `renderer`) ([`docs/conventions/01-repo-layout-and-layering.md:9-13`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/01-repo-layout-and-layering.md#L9-L13)). It also records the current renderer feature entries, including the full `lab-*` family ([`docs/conventions/01-repo-layout-and-layering.md:61-76`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/01-repo-layout-and-layering.md#L61-L76)).

(D) The TypeScript/React convention defines strict TypeScript/module settings, typed boundary parsing, discriminated/result-like state, and the `OperationResult`/`WireError` path ([`docs/conventions/03-typescript-react-style.md:9-15`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/03-typescript-react-style.md#L9-L15), [`docs/conventions/03-typescript-react-style.md:23-36`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/03-typescript-react-style.md#L23-L36)).

(D) The CSS/design convention says the AI4S design values come from `AI4S-prototype/CLAUDE.md`, with Astryx-slot values in `ai4sTheme.ts` and remaining lab tokens in `styles/lab/lab-tokens.css`; it also describes the generated theme and surface-inventory checks ([`docs/conventions/04-css-and-design-system.md:8-23`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/04-css-and-design-system.md#L8-L23)).

(D) The testing convention distinguishes Node/compiled tests, fake DOM/component tests, Storybook/browser smoke, and real Start-host browser integration; the last tier is required for server functions, SSE, persistence, navigation, and Paseo behavior ([`docs/conventions/05-testing-tiers.md:8-17`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/05-testing-tiers.md#L8-L17)).

(D) The toolchain convention is the command/gate reference. It says the root has no `.github/workflows`, so local aliases/Husky are not to be described as CI gates, and it documents the dependency-ordered build/test graph ([`docs/conventions/06-toolchain-and-gates.md:12-19`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/06-toolchain-and-gates.md#L12-L19), [`docs/conventions/06-toolchain-and-gates.md:36-67`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/06-toolchain-and-gates.md#L36-L67)).

(D) The documentation convention says stable seams belong in the nearest README, cross-cutting rules belong in one convention document, and current facts must not be confused with future topology ([`docs/conventions/07-docs-review-and-contribution.md:9-22`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/07-docs-review-and-contribution.md#L9-L22)).

(D) The generated Astryx inventory is a separate generated documentation artifact. It records that its universe is `apps/web/src/renderer/**` plus `packages/ui/src/**`, and that it is generated/checkable rather than a hand-maintained design rule ([`docs/astryx-surface-file-inventory.md:1-18`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/astryx-surface-file-inventory.md#L1-L18)).

## 2. Stack

| Layer | Current stack and role | Evidence |
|---|---|---|
| Runtime/package manager | Node `>=22.19.0`, npm `11.19.0`, ESM (`type: module`) | (D) [`package.json:2-10`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L2-L10) |
| Web framework | TanStack Start + TanStack Router; one Node process serves document/UI/server functions/SSE and hosts runtime | (D) [`apps/web/README.md:1-15`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/README.md#L1-L15) |
| Browser UI | React 19, Vite 8, Astryx core/theme, `@pepgent/ui`, `@xterm/xterm`, `simple-icons`, Zod | (D) [`apps/web/package.json:29-43`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/package.json#L29-L43), [`apps/web/package.json:45-62`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/package.json#L45-L62) |
| Shared product model/UI | `@pepgent/core` (pure domain types) and `@pepgent/ui` (Astryx-backed/shared compositions, including `@pepgent/ui/lab`) | (D) [`packages/core/package.json:1-8`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/core/package.json#L1-L8), [`packages/ui/README.md:1-6`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/ui/README.md#L1-L6), [`packages/ui/README.md:13-24`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/ui/README.md#L13-L24) |
| Dev quality/tooling | TypeScript, Biome, Vitest, Storybook, Knip, Husky, `patch-package` | (D) [`package.json:66-79`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L66-L79), [`apps/web/package.json:45-62`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/package.json#L45-L62) |
| Conversation runtime | Vendored Paseo daemon behind `apps/web/src/server/paseo`; the web runtime launches a supervisor, connects through the Paseo client, and projects events into transcript rows/frames | (D) [`apps/web/README.md:48-78`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/README.md#L48-L78) |
| Relay/control plane | `@pepgent/hub`: self-hosted HTTP+WebSocket Paseo relay with in-memory presence and read-only env registry | (D) [`apps/hub/package.json:1-3`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/hub/package.json#L1-L3), [`AGENTS.md:1-3`](../../Users/mouriya/Ext/code/pepgent/pepgent/AGENTS.md#L1-L3) |

## 3. Build, development, typecheck, and test commands

### Root commands

(D) The root manifest declares these directly:

```sh
npm install
npm run dev
npm run build
npm run typecheck
npm test
npm run test:dist
npm run lint
npm run format:check
npm run clean
npm run rebuild
```

- `prepare` runs model-metadata synchronization and installs Husky; `postinstall` applies dependency patches ([`package.json:24-29`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L24-L29)).
- `dev` forwards to `@pepgent/web`’s Vite dev server ([`package.json:30-35`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L30-L35)).
- `build` is dependency ordered: Paseo protocol → relay → client → plugin → highlight → server → CLI, then core → UI → hub → web ([`package.json:35-42`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L35-L42)).
- `build:test` is clean plus the complete build graph; `test` then runs the workspace test runner. `test:dist` runs only against existing compiled outputs and does not rebuild ([`package.json:42-45`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L42-L45), [`docs/conventions/06-toolchain-and-gates.md:54-67`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/06-toolchain-and-gates.md#L54-L67)).
- `lint`/`format:check` are Biome commands; `typecheck` dispatches to workspace typecheck scripts ([`package.json:27-32`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L27-L32)).

### Web workspace commands

(D) `apps/web/package.json` defines:

```sh
npm --workspace @pepgent/web run dev
npm --workspace @pepgent/web run build
npm --workspace @pepgent/web run start
npm --workspace @pepgent/web run typecheck
npm --workspace @pepgent/web test
npm --workspace @pepgent/web run test:dist
npm --workspace @pepgent/web run storybook
npm --workspace @pepgent/web run build-storybook
npm --workspace @pepgent/web run smoke:storybook
npm --workspace @pepgent/web run check:architecture
```

- `build` is `vite build`, then client-bundle scanning and third-party-notice checks ([`apps/web/package.json:10-27`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/package.json#L10-L27)).
- `typecheck` runs separate server/client/protocol/renderer/app/Storybook programs plus tests ([`apps/web/package.json:21-23`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/package.json#L21-L23)).
- `test` runs `test:node` and `test:vitest`; `test:node` compiles `apps/web/tests/node` to `dist-web-tests` and uses Node’s test runner, while `test:vitest` runs the Vitest config ([`apps/web/package.json:24-27`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/package.json#L24-L27)).
- The built host reads `PORT` (default 3000), `HOST` (default `127.0.0.1`), `PEPGENT_WEB_ROOT`, `PEPGENT_API_TOKEN`, and `PEPGENT_HUB_URL` ([`apps/web/README.md:34-46`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/README.md#L34-L46)).

### AI4S static prototype preview

(D) The static prototype is independent of the npm build and must be served over HTTP because `support.js` loads child components with `fetch`; the documented preview is:

```sh
cd AI4S-prototype
python3 -m http.server 8000
# open http://localhost:8000/
```

([`AI4S-prototype/README.md:5-15`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/README.md#L5-L15)).

(R) No build/test/preview command was run for this report; the commands above are inventory findings from current manifests/docs.

## 4. `apps/` contents

### `apps/web/`

(D) `@pepgent/web` is the product application. Its runtime zones are:

- `src/app/`: TanStack Start assembly, middleware, router, file routes, document/server entry, and explicit SSE routes.
- `src/rpc/`: one validated server-function declaration per implemented operation.
- `src/server/`: Node runtime host, persistence, trust/SSE transport, operation handlers, and Paseo adapter.
- `src/client/`: browser API/service bridge, EventSource relays, projections, and contracts.
- `src/protocol/`: leaf wire literals, operation types, errors, routes, frames, and data contracts.
- `src/renderer/`: React UI and feature/application composition.

([`apps/web/README.md:22-32`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/README.md#L22-L32)).

(D) The source tree additionally contains `stories/`, `tests/`, web-specific scripts, Storybook configuration, renderer architecture ledger, and generated build directories. Those generated directories (`dist`, `dist-web`, `storybook-static`, `.tanstack`, `node_modules`) are build/dependency artifacts rather than additional product source; the product source boundary is the `src/` and declared tooling described above (directory inventory: [`apps/web/`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/)).

### `apps/hub/`

(D) `@pepgent/hub` is an independently deployable self-hosted Paseo relay. Its source modules are `main.ts`, `http.ts`, `relay.ts`, `presence.ts`, `registry.ts`, `protocol.ts`, and `log.ts`; tests are in `apps/hub/tests` (directory and manifest: [`apps/hub/`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/hub/), [`apps/hub/package.json:13-28`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/hub/package.json#L13-L28)).

(D) The hub’s one listener exposes:

- `GET /healthz` → `200 ok`;
- `GET /envs` → env presence snapshot;
- `GET /presence` → the same snapshot as a debug alias;
- `GET /events` → SSE (`snapshot` on connect, `presence` on online flips, 15-second heartbeat);
- `GET /ws` → v2 WebSocket relay upgrade.

([`apps/hub/src/http.ts:1-10`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/hub/src/http.ts#L1-L10)).

(D) The registry reads a JSON env-key map written by an orchestrator/IaC and exposes public keys through `/envs`; the relay forwards opaque frames and does not inspect payloads ([`apps/hub/src/registry.ts:1-10`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/hub/src/registry.ts#L1-L10), [`apps/hub/src/relay.ts:1-12`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/hub/src/relay.ts#L1-L12)).

## 5. `packages/` contents

### Owned product packages

| Package | Contents/role | Evidence |
|---|---|---|
| `packages/core` / `@pepgent/core` | Browser-safe pure domain/type package for events, sessions, permissions, connections, settings, runtime policy, model metadata, plans, usage, and related contracts; built with `tsc`, compiled tests run with Node | (D) package description/scripts [`packages/core/package.json:1-8`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/core/package.json#L1-L8), [`packages/core/package.json:149-159`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/core/package.json#L149-L159); browser-safe boundary [`docs/conventions/01-repo-layout-and-layering.md:22-27`](../../Users/mouriya/Ext/code/pepgent/pepgent/docs/conventions/01-repo-layout-and-layering.md#L22-L27) |
| `packages/ui` / `@pepgent/ui` | Shared React/UI layer. Generic components come from Astryx; product-specific compositions, primitives, feature components, and pure helpers live here. `src/lab/` exports AI4S lab compositions such as `LabPageFrame`, `Panel`, `DenseTable`, `ActionDialog`, `AiPanel`, and lab glyphs | (D) [`packages/ui/README.md:1-6`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/ui/README.md#L1-L6), [`packages/ui/README.md:13-24`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/ui/README.md#L13-L24) |

### Vendored Paseo workspace

(D) The root workspace list includes seven vendored `packages/paseo` workspaces: `protocol`, `relay`, `highlight`, `plugin`, `client`, `server`, and `cli` ([`package.json:11-22`](../../Users/mouriya/Ext/code/pepgent/pepgent/package.json#L11-L22)). Their current roles are:

| Workspace | Role from manifest |
|---|---|
| `packages/paseo/protocol` / `@getpaseo/protocol` | Shared protocol schemas and wire types ([`protocol/package.json:1-4`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/protocol/package.json#L1-L4)) |
| `packages/paseo/relay` / `@getpaseo/relay` | Relay bridging daemon and client connections ([`relay/package.json:1-4`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/relay/package.json#L1-L4)) |
| `packages/paseo/highlight` / `@getpaseo/highlight` | CodeMirror/Lezer language highlighting package; the manifest’s dependencies enumerate language parsers/highlighters ([`highlight/package.json:1-4`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/highlight/package.json#L1-L4), [`highlight/package.json:31-50`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/highlight/package.json#L31-L50)) |
| `packages/paseo/plugin` / `@getpaseo/plugin` | Paseo plugin SDK, including server/provider/ACP and client host/UI entry points ([`plugin/package.json:1-4`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/plugin/package.json#L1-L4), [`plugin/package.json:10-49`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/plugin/package.json#L10-L49)) |
| `packages/paseo/client` / `@getpaseo/client` | Paseo client SDK and daemon-client transport internals ([`client/package.json:1-5`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/client/package.json#L1-L5), [`client/package.json:11-27`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/client/package.json#L11-L27)) |
| `packages/paseo/server` / `@getpaseo/server` | Paseo backend server, supervisor entrypoint, scripts, and daemon runtime ([`server/package.json:1-5`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/server/package.json#L1-L5), [`server/package.json:35-45`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/server/package.json#L35-L45)) |
| `packages/paseo/cli` / `@getpaseo/cli` | `paseo` command-line client for controlling AI coding agents ([`cli/package.json:1-7`](../../Users/mouriya/Ext/code/pepgent/pepgent/packages/paseo/cli/package.json#L1-L7)) |

(D) `NOTICE` identifies Paseo as bundled third-party software under Apache 2.0 and identifies the adapted/ported Pepgent source areas; it is the legal/attribution document, not a second product API ([`NOTICE:1-30`](../../Users/mouriya/Ext/code/pepgent/pepgent/NOTICE#L1-L30)).

## 6. `AI4S-prototype/`: pages, components, behavior, and design story

### Static files and runtime

(D) The directory contains the generated `support.js` Design Component runtime, `index.html`, `CLAUDE.md`, `README.md`, 12 high-fidelity pages, three shared components, and the early single-file wireframe (`AI4S-Lab-Prototype.dc.html`) ([`AI4S-prototype/`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/), [`AI4S-prototype/README.md:17-39`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/README.md#L17-L39)).

(D) Each `.dc.html` page/component is self-contained and rendered by the React-driven `support.js` runtime. The documented format uses `<x-dc>`, a `text/x-dc` `data-dc-script`, `DCLogic.state`, and `renderVals()`; template values are simple dot paths, while calculations belong in `renderVals()` ([`AI4S-prototype/CLAUDE.md:7-37`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/CLAUDE.md#L7-L37)).

### Screens and features

(D) The 12 high-fidelity screens, grouped as the prototype’s index presents them, are:

1. **Home / collaboration:** `AI4S-Lab-Home-Hi-Fi.dc.html` (lab home), `AI4S-Discussions-Hi-Fi.dc.html` (discussions), `AI4S-Datasets-Hi-Fi.dc.html` (datasets).
2. **Experiments:** `AI4S-Experiments-Hi-Fi.dc.html` (all experiments), `AI4S-Experiment-Flow-Hi-Fi.dc.html` (experiment detail with R-022 draft, R-021 running, and R-018 ended modes), `AI4S-Flow-Editor-Hi-Fi.dc.html` (flow editor), `AI4S-Node-Library-Hi-Fi.dc.html` (node library).
3. **Compute:** `AI4S-Sandbox-Clusters-Hi-Fi.dc.html` (sandbox clusters), `AI4S-Connect-Cluster-Hi-Fi.dc.html` (cluster connection wizard), `AI4S-Container-Settings-Hi-Fi.dc.html` (container/image settings).
4. **Operations/settings:** `AI4S-Automation-Hi-Fi.dc.html` (automation) and `AI4S-Settings-Hi-Fi.dc.html` (members/projects/repositories/agent templates).

([`AI4S-prototype/index.html:27-50`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/index.html#L27-L50), [`AI4S-prototype/README.md:19-32`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/README.md#L19-L32)).

(D) The three shared components are `Lab-Sidebar.dc.html` (left navigation), `AI-Panel.dc.html` (right AI panel), and `Action-Dialog.dc.html` (generic form dialog); the early black-and-white wireframe is separate ([`AI4S-prototype/README.md:33-37`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/README.md#L33-L37)).

(D) The intended interaction model is a dense lab shell: a collapsible 192px sidebar, a main card with top bar/main region/right column, a minimum 1200px root width, and a collapsible AI aside. Language, sidebar state, AI-aside state, focused projects, and selected lab are shared through localStorage/page state in the static prototype ([`AI4S-prototype/CLAUDE.md:39-44`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/CLAUDE.md#L39-L44)).

(D) The visual language is intentionally high information density: dense tables/lists/timelines/resource panels for scanning, comfortable layout for discussion/AI/report reading, a one-line toolbar, 28px table headers, 32px rows, 1px/8px panels, and explicit button/link/accessibility requirements ([`AI4S-prototype/CLAUDE.md:1-5`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/CLAUDE.md#L1-L5), [`AI4S-prototype/CLAUDE.md:66-73`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/CLAUDE.md#L66-L73)). The design tokens specify teal as the main action color, blue for running, orange for waiting/attention, red for failure/conflict, and Source Serif 4/Noto Serif SC + Source Sans 3/Noto Sans SC + JetBrains Mono typography ([`AI4S-prototype/CLAUDE.md:46-66`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/CLAUDE.md#L46-L66)).

### Data storyline shown by the prototype

(D) The prototype’s shared story is a geometry-AI lab led by PI J. Doe, with members Wei Li, M. Kato, and Si Chen. Its experiment story includes R-021 running, R-016 needing approval, R-019 queued/conflicting, R-022 draft, R-020 draft, R-018 ended, plus older completed/stopped runs; the story also names discussions, instruments, clusters, and container images ([`AI4S-prototype/CLAUDE.md:75-83`](../../Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/CLAUDE.md#L75-L83)).

(D) The current TypeScript fixture catalog makes that story concrete: it has the signed-in account and four members, seven project summaries, ten experiment records, and three AI model choices. The experiment rows carry IDs, bilingual names, owner, status, project, location, progress or node count, current signal, discussion link, update time, and recency ([`apps/web/src/client/services/lab-fixture/catalog.ts:48-71`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab-fixture/catalog.ts#L48-L71), [`apps/web/src/client/services/lab-fixture/catalog.ts:75-224`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab-fixture/catalog.ts#L75-L224)).

## 7. Current AI4S frontend implementation and model

### React route and feature implementation

(D) The renderer README says the `_lab` layout covers `/home`, `/experiments/...`, `/compute/...`, `/settings/$tab`, and `/discussions/...`; `/` redirects to `/home`. It says `getLabServices()` builds the lab port over the same per-page bridge, `lab-app.tsx` mounts the AI4S Astryx theme/runtime/shell, and maps each destination to a `features/lab-*` page ([`apps/web/src/renderer/README.md:31-48`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/README.md#L31-L48)).

(D) The current destination contract lists the concrete lab paths: `/home`, `/experiments`, `/experiments/$runId`, `/experiments/$runId/edit`, `/experiments/nodes`, `/automation`, `/datasets`, `/compute/clusters`, `/compute/clusters/connect`, `/compute/containers`, `/settings/$tab`, `/discussions`, and `/discussions/$discussionId` ([`apps/web/src/renderer/application/contracts/destination.ts:29-61`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/application/contracts/destination.ts#L29-L61)). The generated TanStack route tree contains those routes plus the two `/api/*` routes ([`apps/web/src/app/routeTree.gen.ts:81-164`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/app/routeTree.gen.ts#L81-L164)).

(D) `composition/lab-app.tsx` imports and maps all current lab pages: home, experiments, experiment detail, flow editor, node library, automation, datasets, clusters, connect-cluster, containers, settings, and discussion list/detail. The root mounts `Theme(theme={ai4sTheme}, mode="light")`, `LabRuntime`, and `LabShellFrame` ([`apps/web/src/renderer/composition/lab-app.tsx:6-20`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/composition/lab-app.tsx#L6-L20), [`apps/web/src/renderer/composition/lab-app.tsx:22-53`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/composition/lab-app.tsx#L22-L53)).

(D) The page implementations are not empty route stubs: their source comments and exports identify the prototype-aligned behavior. Examples include the home page, all-experiments occupancy view, discussions rail/thread/context view, read-only sandbox-cluster facts with local interactions, and the connect-cluster inline wizard ([`apps/web/src/renderer/features/lab-home/ui/home-page.tsx:38-43`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-home/ui/home-page.tsx#L38-L43), [`apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx:31-36`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx#L31-L36), [`apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx:45-50`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L45-L50), [`apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx:34-50`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx#L34-L50), [`apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx:40-55`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx#L40-L55)).

(D) The non-lab desktop routes remain in the same frontend. The generated route tree includes `/new`, `/sessions/$hostId/$sessionId`, `/skills`, `/daily-review`, `/mcp`, `/scheduled-tasks`, and `/workhub` ([`apps/web/src/app/routeTree.gen.ts:51-79`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/app/routeTree.gen.ts#L51-L79), [`apps/web/src/app/routeTree.gen.ts:137-164`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/app/routeTree.gen.ts#L137-L164)). The renderer boundary keeps browser features behind the injected `PepgentBridge`; feature/application code does not reach Node/Paseo directly ([`apps/web/src/renderer/README.md:1-12`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/README.md#L1-L12)).

### Lab fixture authority and lifetimes

(D) `LAB_SNAPSHOT` is assembled once from shared catalog, compute, experiment, home, and workspace fixtures. It exposes `labs`, `account`, `members`, `projects`, `experiments`, `aiModels`, and the page fixtures for home, experiments/flows/editor/nodes, automation, datasets, discussions, clusters/connect, containers, and settings ([`apps/web/src/client/services/lab-fixture/index.ts:1-29`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab-fixture/index.ts#L1-L29)).

(D) `LabSnapshot` is the whole typed fixture: one record per prototype page plus the lab-wide catalog, with shared IDs/numbers across pages. Its top-level fields are documented as `labs`, `account`, `members`, `projects`, `experiments`, `aiModels`, `home`, `experimentsPage`, `experimentFlows`, `flowEditor`, `nodeLibrary`, `automation`, `datasets`, `discussions`, `clusters`, `connectCluster`, `containers`, and `settings` ([`apps/web/src/client/contracts/lab-snapshot.ts:1-57`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-snapshot.ts#L1-L57)).

(D) `LabRuntime` reads the immutable snapshot once per page. Selected lab and focused projects are page-lifetime React state; language, sidebar collapse, and AI-aside open state are browser-storage preferences ([`apps/web/src/renderer/application/lab-runtime.tsx:12-23`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/application/lab-runtime.tsx#L12-L23), [`apps/web/src/renderer/application/lab-runtime.tsx:24-52`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/application/lab-runtime.tsx#L24-L52), [`apps/web/src/renderer/platform/web/create-lab-services.ts:9-38`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/platform/web/create-lab-services.ts#L9-L38)).

### Typed mock/data shapes

The current mock is deliberately a domain fixture rather than UI markup. Its principal shapes are:

| Shape family | Current fields/variants | Evidence |
|---|---|---|
| Shared identity/catalog | bilingual `LabText` (`en`, `zh-CN`), lab/member/project IDs, `LabSummary`, account, member summaries, project summaries, experiment status union (`draft`, `queued`, `running`, `needs_you`, `ended`, `stopped`) | (D) [`lab-common.ts:12-101`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-common.ts#L12-L101) |
| Experiment rows | `ExperimentSummary`: run ID/name/owner/status/project/where, optional progress or node total, current text/signal, optional discussion, updated time, recency | (D) [`lab-common.ts:76-101`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-common.ts#L76-L101) |
| AI panels | sessions, seed user/assistant messages, bilingual prompts/reply, optional scope; assistant blocks are `changes` or `actions` | (D) [`lab-common.ts:103-138`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-common.ts#L103-L138) |
| Action dialogs | typed field variants `text`, `area`, `segmented`, `choice`, `multi`, `toggle`, `info`, `code`; title/subtitle/fields/warning/tone/confirm/cancel/completion/size | (D) [`lab-common.ts:140-184`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-common.ts#L140-L184) |
| Home | reports with paragraphs/equations/tags/figure (`chart` or image placeholder), activity events, progress/milestones, cluster rows, discussion rows, AI, dialogs | (D) [`lab-home.ts:18-119`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-home.ts#L18-L119) |
| Experiments/flows | occupancy slots/lanes; flow nodes with dependency edges, origin, status, timing, verdict/detail; discriminated flow modes `draft` (R-022), `running` (R-021), `ended` (R-018); editor palette/nodes/validation metadata; node-library definitions, mounts, staged changes, references, impacts | (D) [`lab-experiments.ts:8-118`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-experiments.ts#L8-L118), [`lab-experiments.ts:119-203`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-experiments.ts#L119-L203) |
| Automation/datasets/discussions | automation rules/runs/steps; artifacts with role/extension/verdict/preview/lineage/references; discussion messages with artifact references, AI plan/conclusion attachments, conclusions, loaded context, progress, dialogs | (D) [`lab-workspace.ts:4-47`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-workspace.ts#L4-L47), [`lab-workspace.ts:50-105`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-workspace.ts#L50-L105), [`lab-workspace.ts:108-163`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-workspace.ts#L108-L163) |
| Compute/settings | clusters/containers, GPU/CPU capacities, logs/mounts; controller/node connection wizard paths and defaults; image dependencies/files/layers/resources/terminal; members/projects/repositories/agent templates/dialogs | (D) [`lab-compute.ts:7-129`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-compute.ts#L7-L129), [`lab-compute.ts:131-228`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-compute.ts#L131-L228) |

(D) The fixture’s bilingual text helper returns `{ en, 'zh-CN' }`; the renderer resolves it at the selected locale instead of storing localized strings in JSX ([`apps/web/src/client/services/lab-fixture/text.ts:1-5`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab-fixture/text.ts#L1-L5), [`apps/web/src/client/contracts/lab-common.ts:12-21`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-common.ts#L12-L21)).

## 8. Backend/API expected by the current frontend

### AI4S lab surface: no backend/API currently wired

(D) The lab bridge’s entire source is a typed `LabBridge` with `readSnapshot(): LabSnapshot`, implemented as `() => LAB_SNAPSHOT`; its comment says the lab surface is “UI-only for now” and has “no server function, storage or timer” ([`apps/web/src/client/services/lab.ts:1-13`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab.ts#L1-L13)).

(D) `createLabServices()` receives only `PepgentBridge.lab`, reads the snapshot, and adds browser-storage preferences/document-language synchronization; it does not import an RPC module or call `fetch`/`EventSource` ([`apps/web/src/renderer/platform/web/create-lab-services.ts:40-52`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/platform/web/create-lab-services.ts#L40-L52)).

(D) The lab feature controllers and reducers project the immutable fixture into page-lifetime local state. For example, the connect-cluster page explicitly says fixture changes never escape page lifetime, and the containers reducer says fixtures are never modified or persisted ([`apps/web/src/renderer/features/lab-connect-cluster/controller/use-connect-cluster-controller.ts:29-61`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-connect-cluster/controller/use-connect-cluster-controller.ts#L29-L61), [`apps/web/src/renderer/features/lab-containers/model/containers-state.ts:126-129`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/features/lab-containers/model/containers-state.ts#L126-L129)).

**Consequence:** the current AI4S frontend expects a future replacement of `LabBridge.readSnapshot()` (or an equivalent typed service) if live data is introduced, but no live endpoint, HTTP method, mutation protocol, authentication contract, persistence model, or server operation for AI4S is present in this working tree. That last sentence is an implementation-boundary conclusion from the explicit UI-only bridge (D), not an invented endpoint proposal.

### Existing web backend boundary for the desktop/session surface

(D) Every implemented server operation is represented in the protocol operation map. The current implemented operation names are:

- Host: `host.status`, `host.resources.query`.
- Session: `session.catalog.query`, `session.create`, `session.branch.create`, `session.revision.create`, `session.revision.abandon`, `session.metadata.update`, `session.configuration.update`, `session.lifecycle.set`, `session.remove`, `session.turns.query`, `session.turn_landmarks.query`, `session.transcript.page`.
- Turn: `turn.message.submit`, `turn.message.query`, `turn.message.execution.query`, `turn.query`, `turn.interrupt`, `turn.regenerate`.
- Queue/interaction/context: `queue.query`, `queue.entry.retract`, `queue.entries.reorder`, `queue.entry.promote`, `queue.entry.update`, `interaction.query`, `interaction.answer`, `context.diagnostics.query`, `context.compact`.
- Catalog/policy: `connection.catalog.query`, `connection.catalog.create`, `connection.catalog.update`, `connection.catalog.remove`, `connection.catalog.set-default-target`, `project.catalog.query`, `project.catalog.mutate`, `runtime.policy.query`, `runtime.policy.mutate`.

([`apps/web/src/protocol/operations.ts:33-73`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/protocol/operations.ts#L33-L73)).

(D) These operations are exposed through TanStack Start server functions, predominantly `POST` with shape validators; host health/onboarding are `GET`; transcript open/close are separate `POST` functions with Zod input validation ([`apps/web/src/rpc/host.ts:14-45`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/host.ts#L14-L45), [`apps/web/src/rpc/session.ts:21-67`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/session.ts#L21-L67), [`apps/web/src/rpc/turn.ts:15-37`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/turn.ts#L15-L37), [`apps/web/src/rpc/project.ts:8-14`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/project.ts#L8-L14), [`apps/web/src/rpc/connection.ts:14-32`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/connection.ts#L14-L32), [`apps/web/src/rpc/queue.ts:14-32`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/queue.ts#L14-L32), [`apps/web/src/rpc/runtime.ts:8-14`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/runtime.ts#L8-L14), [`apps/web/src/rpc/context.ts:8-14`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/context.ts#L8-L14), [`apps/web/src/rpc/interaction.ts:8-14`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/interaction.ts#L8-L14), [`apps/web/src/rpc/transcript.ts:28-36`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/rpc/transcript.ts#L28-L36)).

(D) The client calls a server function as `fn({ data: input })` and expects an `OperationResult<Output>`; on `ok: false`, it raises a typed `OperationFailure` carrying the structured error ([`apps/web/src/client/api/call.ts:19-42`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/api/call.ts#L19-L42)). The result envelope is exactly `{ ok: true, output } | { ok: false, error }`, where expected failures are typed domain/server values ([`apps/web/src/protocol/errors.ts:35-77`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/protocol/errors.ts#L35-L77)).

(D) Server-side `runOperation()` is the single result boundary: success becomes `{ ok: true, output }`, named domain failures become `{ ok: false, error }`, and unexpected exceptions become opaque server errors with a request ID ([`apps/web/src/server/operations/run.ts:1-35`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/server/operations/run.ts#L1-L35)).

### Explicit HTTP/SSE endpoints

(D) The protocol declares two same-origin API routes:

1. `GET /api/host/events`: a catalog-change SSE stream. The route registers/removes an SSE client with the runtime’s catalog broadcaster ([`apps/web/src/protocol/routes.ts:6-10`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/protocol/routes.ts#L6-L10), [`apps/web/src/app/routes/api/host/events.ts:5-17`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/app/routes/api/host/events.ts#L5-L17)). Its named channels are `session-catalog`, `connection-catalog`, `project-catalog`, `scheduled-task`, and `configuration` ([`apps/web/src/protocol/routes.ts:15-26`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/protocol/routes.ts#L15-L26)).
2. `GET /api/transcript/stream?connectionId=<bounded-id>`: a transcript subscription SSE stream. The browser opens/refreshes server-side subscriptions using `transcript.open`, sends `connectionId` as the query key and input field, and receives the `frame` event ([`apps/web/src/protocol/routes.ts:28-53`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/protocol/routes.ts#L28-L53), [`apps/web/src/client/api/web-client.ts:89-192`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/api/web-client.ts#L89-L192), [`apps/web/src/app/routes/api/transcript/stream.ts:8-24`](../../Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/app/routes/api/transcript/stream.ts#L8-L24)).

[Showing lines 1-300 of 337. Use :301 to continue]