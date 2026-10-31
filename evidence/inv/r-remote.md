# `pepgent-remote` repository survey

**Scope.** This is a read-only survey of the current working tree at `/Users/mouriya/Ext/code/pepgent/pepgent-remote`. Repository files were not edited. No build, test, smoke run, deployment, Git history inspection, or GitHub issue/PR history inspection was performed. Historical-session material is used only for user intent; it is not evidence that the current tree works at runtime.

## Executive summary

`remote` is a standalone Rust command-line program and library for starting one job from a prebuilt template on a remote execution backend, then copying the run's working volume back to a caller-selected target. The repository README describes this purpose directly: “remote runs one job from a prebuilt template on a remote backend and copies the job's working volume back to a target the caller names.” **(D; `README.md:1-4`)**

The current source implements the common middle layer, the local catalog/configuration and run-record store, the step-image copy-in/copy-out commands, and a concrete Komodo backend. Slurm and Kubernetes are represented in the domain model and catalog format, but their backend modules are absent: all dispatch arms for those variants return `BackendNotImplemented`. **(D; `src/backend/mod.rs:1-4`, `src/model.rs:64-145`, `src/ops.rs:33-124`; A: implementation classification derived from those source paths)**

The repository is therefore a **first-version Komodo implementation with a three-backend abstraction**, matching the design document's stated scope rather than a complete implementation of all three backends. **(D; `design/remote.md:7-19`, `README.md:6-10`)**

## User intent found in historical sessions

These are verbatim excerpts from user messages in the historical sessions requested for this survey. They establish intended ownership and boundaries; they do not replace current-tree evidence.

- “remote的部分我认为是可以单独实现的” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/5d27138c`, timestamp `2026-10-30T20:00:31.295Z`)**
- “然后还有一点，remote实际上是单独的程序” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6`, timestamp `2026-10-30T20:01:28.429Z`)**
- “k8s和slum的部分暂时不实现，只实现komodo，但是中间层的抽象要有” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/2366ef30`, timestamp `2026-10-30T23:05:09.341Z`)**
- “这个组件要跨平台的，可能运行在windows，而不是纯arm macos或者linux x86” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/93b7f0b4`, timestamp `2026-10-30T20:05:53.306Z`)**
- “我比较反对slurm用ssh，用ssh太不优雅” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/d5414f59`, timestamp `2026-10-30T20:10:07.132Z`)**
- The user stated the intended three-backend shape as follows: “接下来是关于远程运行的东西，远程运行时实际上我想兼顾三种后端，komodo对应docker，slum对应实验室常见的集群，然后是标准k8s控制面，这会有多复杂，现在需要评估，然后在eval里要做成非常简单的调用，而不是当场决定非常麻烦的参数传递，对于容器或者pod模板是提前构建的。这是一个评估+设计问题，需要把三种不太的后端完全分离实现，共享抽象和中间层。对于标准k8s控制面，可以引入类似komodo的东西，komodo自己不支持k8s，但是他的sdk非常好用，所以docker直接经过他，免去亲自对接N个集群的问题” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`, timestamp `2026-10-30T19:15:49.632Z`)**
- The volume/network contract was stated as: “首先，文件是需要走自动生成的volume，至于运行的时候怎么映射路径，那是运行时说了算，也就是构建容器模板的时候可以提前写好，运行时被覆盖，到时候创建临时的volume，然后全自动的把文件拷回来，只要能做到这个标准oci行为就不存在你说的文件怎么进出的问题，容器随便删，临时volume也能删。然后怎么连回来soroi，应该是在独立的网络层中，有中心化的omp rpc多路复用器，怎么实现怎么干的你别管，反正在一个网络里，这也应该是oci标准行为，而不需要其他能力” **(U; `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92`, timestamp `2026-10-30T19:53:33.392Z`)**
- On 2026-11-01 the user explicitly described the component boundary as: “对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在” **(U; `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`, timestamp `2026-10-31T22:14:14.883Z`)**

The current repository structure and README are consistent with those statements: `remote` is its own crate, the backend model has all three variants, and only Komodo has a registered source module. **(D; `Cargo.toml:1-7`, `src/backend/mod.rs:1-4`, `README.md:6-10`; A: consistency assessment)**

## Current repository inventory

The current non-artifact tree contains:

```text
README.md
Cargo.toml
Cargo.lock
Dockerfile
.gitignore
.dockerignore
design/remote.md
.github/workflows/build.yml
src/lib.rs
src/main.rs
src/model.rs
src/ops.rs
src/home.rs
src/error.rs
src/step.rs
src/backend/mod.rs
src/backend/komodo/mod.rs
src/backend/komodo/api.rs
templates/komodo/example/compose.yaml
```

The `target/` directory is present in the working tree listing as a build-artifact directory and is ignored by both `.gitignore` and `.dockerignore`. **(D; `.gitignore:1`, `.dockerignore:1`; R: current-tree glob listing)

`src/lib.rs` exposes six library modules: `backend`, `error`, `home`, `model`, `ops`, and `step`. **(D; `src/lib.rs:1-9`)**

## Documentation and design content

### `README.md`

The README is the operator-facing overview and interface reference:

1. **Purpose and backend status.** It describes one template-driven remote job and says Komodo is implemented while Slurm and Kubernetes are not implemented. **(D; `README.md:1-10`)**
2. **CLI contract.** It says normal operations emit JSON on stdout, `tail` emits text, and `remote schema` emits the JSON Schema for the interface types. It lists `templates`, `run`, `status`, `tail`, `abort`, and `remove`. **(D; `README.md:12-24`)**
3. **Run request example and semantics.** The example contains a template, optional mount, environment variables, HTTP input files, and an HTTP tar output. The README explains mount override, copy-in via HTTP GET, copy-out via HTTP PUT of a tar containing the whole volume, and the meaning of `ended`. **(D; `README.md:26-43`)**
4. **Home directory and authority.** `$REMOTE_HOME` defaults to `~/.config/remote`; `config.toml` holds the network address and catalog, `credentials.toml` holds backend credentials, and `runs/<run>.json` holds one record per run. The README calls `remote` the authority for the catalog and lifecycle facts. **(D; `README.md:45-96`)**
5. **Komodo template contract.** A template Stack has `copy-in`, `body`, and `copy-out` services sharing one named volume. The README describes Stack copy/update/deploy, injected variables, status inspection, body-log tailing, abort, and removal. **(D; `README.md:98-119`)**
6. **Step image and build.** The same `remote` binary is used as `remote step copy-in` and `remote step copy-out`; the README gives `docker build -t remote-step .` and `cargo build --release`. It also describes the CI cross-platform build/smoke matrix. **(D; `README.md:121-134`)**

### `design/remote.md`

`design/remote.md` is the single design document under `design/`. Its content can be summarized section-by-section as follows:

1. **Purpose and boundary.** `remote` is an independent program that runs one job from a prebuilt template on Komodo, Slurm, or standard Kubernetes and returns the working directory. Soroi is only one client; GUI, automation, and CLI clients may call it directly. `remote` does not know that Soroi exists. **(D; `design/remote.md:1-5`)**
2. **First-version scope.** The common abstraction is defined for all three backends, but version one implements only Komodo. The common interface, lifecycle, catalog variants, backend dispatch, and step image are defined up front; Slurm and Kubernetes are future module implementations. **(D; `design/remote.md:7-19`)**
3. **Two OCI assumptions.** Every run gets a temporary volume whose mount path has a template default and a runtime override; all volume contents are copied to the caller's target after the run. Every run joins an independent network layer containing a centralized omp RPC multiplexer. **(D; `design/remote.md:21-28`)**
4. **Authority and ownership.** `remote` owns the template catalog and run lifecycle; the caller owns the run ID, queries status/tail through `remote`, and owns the copied working-directory replica after copy-out; the network/multiplexer is independent. Soroi's store may make the copied directory into store state. **(D; `design/remote.md:30-37`)**
5. **External operations.** The public operations are `templates`, `run`, `status`, `tail`, `abort`, and `remove`; input files are sourced by the caller and output is delivered to a caller target. Version one uses HTTP GET for sources and HTTP PUT tar for output, with extensible tagged variants. **(D; `design/remote.md:39-50`)**
6. **Run sequence and lifecycle.** The sequence is request → backend start → temporary volume → copy-in → body → copy-out → caller target → explicit remove. The volume is the outer lifetime; copy-in, body, and copy-out are nested sequential steps. The body may be a program or an agent, but `remote` treats both as a command in the template image. **(D; `design/remote.md:52-75`)**
7. **Templates.** A template belongs to exactly one backend. Komodo stores Core and Stack; Slurm stores API, scheduler/resource/runtime/image settings; Kubernetes stores context, namespace, and a complete Job manifest. The mount default is catalog data and the multiplexer address is injected at launch. **(D; `design/remote.md:77-88`)**
8. **Backend responsibilities.** Each backend is an independent module implementing run/status/tail/abort/remove. Komodo uses a copied Stack, environment update, and deploy; Slurm uses a shared run directory and a submitted job script; Kubernetes uses a PVC plus Jobs/init containers. **(D; `design/remote.md:90-99`)**
9. **Backend connectivity.** The design requires HTTPS rather than SSH. Komodo goes through Core/Periphery, Slurm uses slurmrestd or optionally FirecREST, and Kubernetes uses kubeconfig context or a Rancher proxy. **(D; `design/remote.md:100-106`)**
10. **Cross-platform and language.** The target is Windows, macOS, and Linux on x64 and arm64. Rustls avoids OpenSSL, and Rust is chosen for one binary, native enums/matching, and shared step-image code. **(D; `design/remote.md:108-129`)**
11. **Complexity/status table.** The middle layer, Komodo module, and step image are marked implemented; Kubernetes and Slurm modules are marked not implemented. **(D; `design/remote.md:131-139`)**
12. **Trade-offs.** The document rejects Komodo `RunStackService`, backend-specific file APIs, runner code inside every business image, SSH-based Slurm control, Argo Workflows as the Kubernetes backend, Stack-level abort, and the first-party Komodo crate because of the stated lifecycle, portability, or abstraction constraints. **(D; `design/remote.md:141-151`)**
13. **External references.** It records the Komodo, Slurm, FirecREST, Pyxis, Apptainer, Kubernetes, Rancher, Rust, and Windows OpenSSH sources used for the design. **(D; `design/remote.md:153-158`)**
14. **Design-stage placeholders.** Network/multiplexer behavior, live artifact visibility, Slurm REST/JWT deployment, Slurm output forwarding/shared storage, and Kubernetes StorageClass availability are explicitly assumptions left outside the document's implementation scope. **(D; `design/remote.md:160-171`)**

## API surface

### CLI surface

The CLI is defined in `src/main.rs` with Clap and is dispatched in `execute`. **(D; `src/main.rs:4-18`, `src/main.rs:20-53`, `src/main.rs:83-100`)**

| Command | Input | Output/behavior | Current implementation |
|---|---|---|---|
| `remote templates` | None beyond home config | Pretty JSON `TemplateInfo[]` | Implemented through `Remote::templates` and catalog projection. **(D; `src/main.rs:22-23`, `src/main.rs:85`, `src/ops.rs:29-31`, `src/home.rs:58-68`)** |
| `remote run` | `RunRequest` JSON on stdin | Pretty JSON `RunStarted`, containing a generated run ID | Implemented for Komodo; Slurm/K8s return `BackendNotImplemented`. **(D; `src/main.rs:24-25`, `src/main.rs:64-70`, `src/ops.rs:33-59`)** |
| `remote status <run>` | Run ID string | Pretty JSON `RunStatus` | Implemented for Komodo and records the observed lifecycle; Slurm/K8s are stubs. **(D; `src/main.rs:26-27`, `src/ops.rs:61-76`)** |
| `remote tail <run> [--lines N]` | Run ID; `--lines` defaults to `100` | Body output as text, not JSON | Implemented for Komodo body logs; Slurm/K8s are stubs. **(D; `src/main.rs:28-33`, `src/main.rs:88-90`, `src/ops.rs:78-87`)** |
| `remote abort <run>` | Run ID | Pretty JSON `Recorded` with an `aborted` lifecycle fact | Implemented for Komodo; Slurm/K8s are stubs. **(D; `src/main.rs:34-35`, `src/ops.rs:90-106`)** |
| `remote remove <run>` | Run ID | Pretty JSON `Recorded` with a `removed` lifecycle fact | Implemented for Komodo; Slurm/K8s are stubs. **(D; `src/main.rs:36-37`, `src/ops.rs:108-124`)** |
| `remote schema` | None | Pretty JSON object containing schemas for `TemplateInfo`, `RunRequest`, `RunStarted`, `RunStatus`, `Recorded`, and `RunRecord` | Implemented locally with `schemars`. **(D; `src/main.rs:38-39`, `src/main.rs:72-80`)** |
| `remote step copy-in` | Environment injected by the backend: mount and JSON inputs | Fetches input files into the shared volume; progress is stderr | Implemented in the step image. **(D; `src/main.rs:40-53`, `src/main.rs:94-97`, `src/step.rs:1-46`)** |
| `remote step copy-out` | Environment injected by the backend: mount and JSON output | Archives the complete volume and sends it to the target; progress is stderr | Implemented in the step image. **(D; `src/main.rs:79-87`, `src/step.rs:79-135`)** |

The README's stdout rule matches the source: JSON operations call `print_json`, while `tail` calls `print!` with the returned string. **(D; `README.md:12-15`, `src/main.rs:55-57`, `src/main.rs:88-90`)**

### JSON/domain interface

All interface-facing model types derive `JsonSchema`, so clients are expected to generate types from `remote schema`. **(D; `src/model.rs:1-4`)**

- **Template identity and backend:** `TemplateName`; `BackendKind::{Komodo, Slurm, K8s}`; tagged `Template::{Komodo, Slurm, K8s}`. **(D; `src/model.rs:16-19`, `src/model.rs:64-100`)**
- **Template records:** `KomodoTemplate { core, stack }`; `SlurmTemplate { api, partition, qos, resources, runtime, image }`; `K8sTemplate { context, namespace, job }`; `TemplateEntry { description, mount, template }`; and response `TemplateInfo { name, description, backend, mount }`. **(D; `src/model.rs:102-164`)**
- **Input/output transfer:** `VolumePath` is a validated relative path without `..`; `Source` currently has `HttpGet { url }`; `Input` combines a volume path and source; `Target` currently has `HttpPutTar { url }`. **(D; `src/model.rs:166-221`)**
- **Run request:** `RunRequest { template, mount: Option<String>, env: BTreeMap<String,String>, inputs: Vec<Input>, output: Target }`. **(D; `src/model.rs:223-235`)**
- **Resolved backend spec:** `RunSpec { id, mount, mux, env, inputs, output }`, constructed from the request, catalog, and network config. **(D; `src/model.rs:237-247`, `src/ops.rs:33-43`)**
- **Backend handles:** `KomodoHandle { core, stack, server, volume }`; `SlurmHandle { api, job_id, run_dir }`; `K8sHandle { context, namespace, job, copy_out_job, pvc }`. **(D; `src/model.rs:249-284`)**
- **Status:** tagged `RunStatus::{Queued, Running { started_at }, Ended { started_at, ended_at }}`. **(D; `src/model.rs:286-298`)**
- **Recorded lifecycle:** tagged `Lifecycle::{Queued, Running, Ended, Aborted, Removed}`. `RunRecord` stores the run ID, original request, backend handle, and lifecycle vector; `RunStarted` returns the ID; `Recorded` returns the ID and recorded fact. **(D; `src/model.rs:300-368`)**

### Configuration, credentials, and local run store

`Home::locate` uses `$REMOTE_HOME` when set, otherwise `~/.config/remote`. It reads `config.toml`, optionally reads `credentials.toml`, and stores JSON records under `runs/<run>.json`. **(D; `src/home.rs:79-118`)**

The config model requires `[network].mux` and has a template map whose entries contain a description, default mount, and tagged backend-specific template. Credentials are keyed by the exact Komodo Core address and contain a key and secret. **(D; `src/home.rs:23-49`, `src/home.rs:51-76`)**

`save_run` creates the `runs` directory and writes a pretty JSON record. `record` appends a lifecycle fact unless it repeats the latest fact, then persists the record. **(D; `src/home.rs:120-143`)**

### Backend and Komodo Core API

The internal `Backend` trait requires `run`, `status`, `tail`, `abort`, and `remove`. The common module also defines service names `copy-in`, `body`, `copy-out` and injected variables `REMOTE_RUN`, `REMOTE_MOUNT`, `REMOTE_MUX`, `REMOTE_INPUTS`, and `REMOTE_OUTPUT`. **(D; `src/backend/mod.rs:9-46`)**

The Komodo implementation uses a small typed client for Core's `POST /read`, `/write`, and `/execute` endpoints, carrying `X-Api-Key` and `X-Api-Secret` headers. **(D; `src/backend/komodo/api.rs:1-3`, `src/backend/komodo/api.rs:19-75`)** The request types currently exposed by that client are:

- read: `GetStack`, `GetUpdate`, `InspectStackContainer`, `GetStackLog`;
- write: `CopyStack`, `UpdateStack`, `DeleteStack`;
- execute: `DeployStack`, `StopContainer`, `DestroyStack`, `DeleteVolume`.

**(D; `src/backend/komodo/api.rs:217-227`)**

The Komodo run path gets the template Stack, copies it under the generated run ID, updates its environment, deploys it, and returns a handle containing Core, Stack, Server, and volume identities. **(D; `src/backend/komodo/mod.rs:179-216`)** Status inspects the three service containers and derives queued/running/ended state; tail reads the body service log; abort stops running step containers; remove destroys/deletes the Stack and deletes the volume. **(D; `src/backend/komodo/mod.rs:218-289`)**

## Runtime/data flow represented by the current tree

The example Komodo compose file is the concrete template contract:

1. `copy-in` runs the `remote-step` image and receives `REMOTE_MOUNT` and `REMOTE_INPUTS`.
2. `body` waits for copy-in success, shares the `work` volume, loads the generated `.env`, and runs the business command.
3. `copy-out` waits for body success, receives `REMOTE_MOUNT` and `REMOTE_OUTPUT`, and shares the same volume.
4. The named volume is `${REMOTE_RUN}` and is mounted at `${REMOTE_MOUNT}`.

**(D; `templates/komodo/example/compose.yaml:1-52`)**

The source step implementation fetches each `HttpGet` input with streaming HTTP GET into the requested path, then archives the entire mount directory and uploads it with HTTP PUT and `application/x-tar`. **(D; `src/step.rs:34-77`, `src/step.rs:79-119`, `src/step.rs:122-135`)**

`injected_env` serializes inputs and output as JSON and adds the run ID, mount, and multiplexer address to the caller's environment. **(D; `src/backend/mod.rs:36-46`)** The Komodo backend filters/replaces conflicting environment keys and emits single-quoted values for the Stack environment file. **(D; `src/backend/komodo/mod.rs:37-57`)**

## Stack

### Language and package shape

- Rust crate named `remote`, version `0.1.0`, Rust edition 2024, unpublished, with a description covering Komodo, Slurm, and Kubernetes. **(D; `Cargo.toml:1-7`)**
- Async runtime and CLI: `tokio` with full features and `clap` derive. **(D; `Cargo.toml:9-23`)**
- Data/model/serialization: `serde`, `serde_json`, `schemars`, `toml`, `chrono`, `ulid`, `thiserror`. **(D; `Cargo.toml:9-23`)**
- HTTP and transfer: `reqwest` with JSON, rustls, and streaming features; `futures-util`, `tokio-util`, and `tar`. **(D; `Cargo.toml:9-23`)**
- The checked-in `Cargo.lock` records the resolved dependency graph; no additional application framework is present. **(D; `Cargo.lock:1-3`; A: stack characterization from manifest/source inventory)**

### Container/build shape

`Dockerfile` is a two-stage build: a Rust builder compiles the locked release binary, and a `debian:stable-slim` runtime image installs CA certificates and runs the binary as the `remote` entrypoint. **(D; `Dockerfile:1-16`)**

The provided Komodo template uses `remote-step` as the image for copy-in and copy-out, while the body image/command is supplied by the prebuilt template. **(D; `templates/komodo/example/compose.yaml:17-52`)**

### CI/platform target

The GitHub workflow matrix targets `ubuntu-latest`, `ubuntu-24.04-arm`, `macos-latest`, `windows-latest`, and `windows-11-arm`. It builds with `cargo build --release --locked`, then smoke-runs `target/release/remote --version`, generates `schema.json` with `remote schema`, and checks that the schema file is nonempty. **(D; `.github/workflows/build.yml:1-24`)**

## Implemented versus stub/design-only

| Area | Current status | Evidence |
|---|---|---|
| CLI parser and dispatch | Implemented | `Command`, `Step`, JSON printing, request parsing, schema generation, and async dispatch are present. **(D; `src/main.rs:4-111`)** |
| Domain model and generated schema | Implemented for the defined interface | All public interface types and backend variants are modeled and schema-enabled. **(D; `src/model.rs:1-4`, `src/model.rs:64-368`)** |
| Config/catalog | Implemented | TOML config, template lookup, template listing, network multiplexer address, and optional credentials are read by `Home`. **(D; `src/home.rs:23-102`)** |
| Run record/lifecycle store | Implemented | JSON records are loaded/saved under `runs`, and lifecycle observations are appended without repeating the latest fact. **(D; `src/home.rs:104-143`, `src/model.rs:300-355`)** |
| Common backend abstraction | Implemented | `Backend` defines all five backend operations and common injected environment variables. **(D; `src/backend/mod.rs:9-46`)** |
| Komodo backend | Implemented in source | Stack copy/update/deploy, service inspection/status, body tail, abort, Stack/volume removal, and typed Core requests are present. **(D; `src/backend/komodo/mod.rs:179-289`, `src/backend/komodo/api.rs:217-227`)** |
| HTTP step image | Implemented in source | `step copy-in` streams HTTP GET files into the volume; `step copy-out` tars the volume and HTTP PUTs it. **(D; `src/step.rs:34-135`)** |
| Komodo template example | Implemented as an example contract | Three services and a shared `${REMOTE_RUN}` volume are declared. **(D; `templates/komodo/example/compose.yaml:17-52`)** |
| Slurm | Stub/not implemented | The ADT and handle exist, but there is no Slurm backend module and every operation's Slurm dispatch returns `Error::BackendNotImplemented`. **(D; `src/backend/mod.rs:4`, `src/model.rs:111-136`, `src/model.rs:269-275`, `src/ops.rs:44-49`, `src/ops.rs:68-71`, `src/ops.rs:83-87`, `src/ops.rs:95-99`, `src/ops.rs:113-116`)** |
| Kubernetes | Stub/not implemented | The ADT and handle exist, but there is no Kubernetes backend module and every operation's K8s dispatch returns `Error::BackendNotImplemented`. **(D; `src/backend/mod.rs:4`, `src/model.rs:138-145`, `src/model.rs:277-284`, `src/ops.rs:44-49`, `src/ops.rs:68-71`, `src/ops.rs:83-87`, `src/ops.rs:95-99`, `src/ops.rs:113-116`)** |
| Network/multiplexer integration | Contract/injection only in this repository | `REMOTE_MUX` is read from config and injected into run environment, but the multiplexer itself is outside `remote`; the design lists its behavior as a placeholder. **(D; `src/home.rs:31-35`, `src/backend/mod.rs:14-19`, `design/remote.md:160-167`)** |
| Slurm REST/JWT, shared storage, and K8s StorageClass assumptions | Design placeholders | The design explicitly assumes these external capabilities rather than implementing them in the current tree. **(D; `design/remote.md:168-171`)** |
| Automated tests | No test suite was found in the current tree survey | The `tests/` path was not found, and the source inventory contains no test module; the checked-in CI workflow performs only release build plus binary/schema smoke checks. **(R; glob `/Users/mouriya/Ext/code/pepgent/pepgent-remote/tests/**` returned `Path not found`; R: glob `/Users/mouriya/Ext/code/pepgent/pepgent-remote/src/**` listed only the production modules; D: `.github/workflows/build.yml:18-24`)** |

“Implemented” above means implementation is present in the current source tree. It does **not** claim that this survey executed the path or confirmed an external Komodo Core, HTTP store, Docker host, Slurm cluster, or Kubernetes cluster. **(A; scope distinction based on the read-only survey constraints)**

## Build and test commands

### Commands documented by the repository

1. **Native release build:**

   ```sh
   cargo build --release
   ```

   **(D; `README.md:127-130`)**

2. **Build the step image:**

   ```sh
   docker build -t remote-step .
   ```

   **(D; `README.md:121-125`)**

3. **CI locked build:**

   ```sh
   cargo build --release --locked
   ```

   **(D; `.github/workflows/build.yml:16-18`)**

4. **CI smoke run:**

   ```sh
   target/release/remote --version
   target/release/remote schema > schema.json
   test -s schema.json
   ```

   **(D; `.github/workflows/build.yml:19-24`)**

5. **CLI operations:** the README documents `remote templates`, `remote run`, `remote status <run>`, `remote tail <run> [--lines N]`, `remote abort <run>`, `remote remove <run>`, and `remote schema`. **(D; `README.md:12-24`)**

### Test/verification status for this survey

No `cargo build`, `cargo test`, Docker build, CLI smoke run, or backend runtime call was run during this survey. The repository does not document a separate test command in `README.md` or `.github/workflows/build.yml`; the visible CI acceptance is release compilation plus `--version`/schema smoke checks. **(D; `README.md:127-134`, `.github/workflows/build.yml:18-24`; R: read-only survey procedure)**

## Git metadata requested by the assignment

The current working-tree metadata command was:

```sh
git remote -v && git branch --show-current
```

Observed output:

```text
origin  https://github.com/Pepgent/remote.git (fetch)
origin  https://github.com/Pepgent/remote.git (push)
main
```

Therefore:

- **Remote:** `origin` fetch and push both point to `https://github.com/Pepgent/remote.git`.
- **Current branch:** `main`.

**(R; command `git remote -v && git branch --show-current`, cwd `/Users/mouriya/Ext/code/pepgent/pepgent-remote`)**

## Bottom line

The working tree is a compact, standalone Rust remote-runner with a typed CLI/schema boundary, a TOML catalog and JSON lifecycle store, a Komodo Core client, and a reusable HTTP/tar step image. Its public design intentionally covers Komodo, Slurm, and Kubernetes through shared ADTs and a common backend interface, but only Komodo is wired to executable backend behavior in this version. The missing Slurm/Kubernetes behavior is an explicit, source-visible stub rather than an undocumented gap. **(D; `src/backend/mod.rs:21-34`, `src/ops.rs:44-49`, `README.md:6-10`, `design/remote.md:7-19`)**