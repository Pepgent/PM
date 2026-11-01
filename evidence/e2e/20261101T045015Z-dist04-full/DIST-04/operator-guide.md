# Standalone Soroi on OrbStack

The root `compose.yaml` runs one persistent S1 store, the existing omp RPC mux, and the real Soroi TUI in the central execution image. Central installs a selected CI release before starting omp. The explicit `compose.full.yaml` layer adds the owning remote home and Slurm shared-run mounts to that same central service; it is not loaded by the base command. Neither mode runs a holder daemon or a replacement Lab backend.

## Inputs

Supply an env file containing paths to the existing inputs below, not token values. Base mode does not require the full-mode directories.

| Mode | Variable | Input |
| --- | --- | --- |
| Base / full | `SOROI_RELEASE_TAR` | Absolute path to the selected downloaded `soroi-<sha256>.tar` CI artifact |
| Base / full | `OMP_MODELS_FILE` | Public upstream omp `models.yml`, with gateway providers using `PEPGENT_GATEWAY_TOKEN` |
| Base / full | `OMP_CONFIG_FILE` | Deployment-owned upstream omp `config.yml` |
| Base / full | `GATEWAY_TOKEN_FILE` | Central consumer's gateway client token file, not a provider or broker credential |
| Base / full | `MUX_AUTH_TOKEN_FILE` | Existing mux deployment bearer file, not a process-generation token |
| Full | `SOROI_REMOTE_HOME` | Published standalone remote directory: ENV/deployment owns `config.toml` and `credentials.toml`; the real `remote` CLI owns its writable `runs/` records |
| Full | `SOROI_SLURM_RUNS` | Existing Slurm-owned Mac `~/Ext/work/orbstack/pepgent-slurm/runs` directory, shared with the Slurm VM |

The gateway and mux files must be readable by the images' configured runtime users. Central copies the public models/config inputs into the writable `/home/agent/.omp/agent/` directory on each start, reads the two secret files without printing them, and exports only the gateway client token and `MUX_AUTH_TOKEN`.

The full-mode directories must already exist and be accessible to central's configured UID1000. Compose does not create a remote catalog, credentials, templates, run records or Slurm outputs. A merely allocated empty remote directory is not a published remote configuration.

The root TUI has no static `MUX_GENERATION` or `MUX_TOKEN`; the entrypoint removes inherited values. A writer requests a generation from mux and gives only that generation's token to dial. The supervisor consumes `SOROI_MUX_URL` and `MUX_AUTH_TOKEN`; no alternate credential variable is introduced.

The existing image defaults are:

- `pepgent-registry.orb.local:5000/pepgent/central:latest`;
- `pepgent-registry.orb.local:5000/pepgent/omp-rpc-mux:latest`;
- the local store build tagged `pepgent-registry.orb.local:5000/pepgent/soroi-store:latest`.

`CENTRAL_IMAGE`, `MUX_IMAGE`, and `STORE_IMAGE` can select deployment images. `SOROI_MODEL` selects the TUI model; its default is the first D8 test model, `opencode-go/deepseek-v4.1-flash`.

## Start and interact

Run base mode from the repository root:

```sh
docker compose --env-file /path/to/deployment.env -f compose.yaml up --build -d
docker attach --sig-proxy=false pepgent-soroi-e2e-central
```

For a new full deployment, require the real remote-home publication first, then use both files in this order:

```sh
docker compose --env-file /path/to/deployment.env \
  -f compose.yaml -f compose.full.yaml up --build -d
docker attach --sig-proxy=false pepgent-soroi-e2e-central
```

Changing an existing central between modes requires ending its current TUI with `/exit` first; detaching does not end it. After the owning inputs are ready, recreate only central and retain the existing store, mux, network and named volumes:

```sh
docker compose --env-file /path/to/deployment.env \
  -f compose.yaml -f compose.full.yaml up -d --no-deps central
```

Keep the same two-file invocation for full-mode operations. To return to base mode, end the full-mode TUI and use `-f compose.yaml up -d --no-deps central`; there is no configuration migration or copying between the modes.

The central foreground program is the installed `/home/agent/.local/bin/soroi`, under Docker's standard init. The entrypoint finishes extraction and installation before `exec`. `compose/startup.yml` disables the interactive first-run setup wizard and update check; it does not choose approval, personality, or idle TTL settings.

Enter prompts in the real omp TUI. Docker's Ctrl-P, Ctrl-Q sequence detaches the client without ending the TUI. Docker may report `read escape sequence` when detaching; that client exit is not the central process's exit. `/exit` ends the TUI and therefore the central service normally.

## Addresses and state

The network is named exactly `pepgent-soroi-e2e`, so independent A0 containers can join it. The fixed container names also have matching FQDN network aliases:

| Service | URL / state |
| --- | --- |
| Store | `http://pepgent-soroi-e2e-store.orb.local:3001`; `STORE_HOST=0.0.0.0`, `STORE_HOME=/var/lib/soroi-store` |
| Mux | `ws://pepgent-soroi-e2e-mux.orb.local:8080`; no persistent data |
| Central | Attachable TUI; no invented HTTP listener |

No new host ports are published. OrbStack provides the container discovery names to the Mac; central uses the same names through the Compose network aliases. `SOROI_STORE_URL` and `SOROI_MUX_URL` can configure the consumer endpoints for another deployment network.

| Named volume | Consumer |
| --- | --- |
| `pepgent-soroi-e2e-store-data` | Store catalog, Parquet data, objects, and staging beneath `STORE_HOME` |
| `pepgent-soroi-e2e-central-home` | Installed packages, plugin registration, launcher, omp configuration, sessions and other HOME state; full-mode remote state uses the separate bind below |
| `pepgent-soroi-e2e-central-work` | Central `/work` working directory |

Do not remove these volumes between suites. Store is built from its own package manifest and `src/` using the repository root as the Docker build context. Its runtime user can write both `STORE_HOME` and its DuckDB extension cache; business data is not baked into the image.

Full mode adds these existing host directories without replacing the HOME, work or release mounts:

| Host source | Central target | Access / lifecycle |
| --- | --- | --- |
| `SOROI_REMOTE_HOME` | `/home/agent/.config/remote`, selected explicitly by `REMOTE_HOME` | RW; published configuration/credentials and remote-owned run records persist in the host directory |
| `SOROI_SLURM_RUNS` | `/srv/pepgent-runs` | RO; the standalone `soroi-slurm` template's `shared_root` refers to this client path, while Slurm remains the producer |

The remote bind hides only `.config/remote` inside the central-home volume while full mode is active. The rest of HOME remains mounted. Returning to base reveals the named volume's directory again; it does not merge or copy the full-mode host data. Both binds use `create_host_path: false`; a wrong source path must not create an empty replacement directory.

## Verification boundary

There are two independent channels: central clients call store HTTP directly, while writers/dial communicate with mux using omp RPC frames. Mux never relays store operations. Store and mux are sibling dependencies, not a transport chain.

Deployment proof requires real operations, not merely healthy containers:

- Commit a typed value through store HTTP from central, read it back, recreate only store with the same volume, and read the same run again.
- Use the existing `LabStandIn` class in `e2e/standin/lab-standin.ts` to open a generation, launch the real central omp through dial, observe `ready` and `get_state`, close stdin, and observe `mux_exited` before closing the writer.
- Attach central and execute an installed Soroi tool through its real TUI.

Direct HTTP and RPC probes prove deployment connectivity; they do not by themselves prove that a particular plugin release uses those channels for `soroi_eval` or `soroi_task`. The selected release's end-to-end tests must exercise those integrations.

The store readiness check uses its existing `GET /runs` API. Mux has no invented `/health` check. Startup ordering is not a substitute for protocol evidence.

Boot and store release import remain owned by their implementations. This compose does not fabricate a release record or install an empty boot component when the release does not provide one.

Full-mode proof additionally requires operations inside the actual central container:

```sh
docker compose --env-file /path/to/deployment.env \
  -f compose.yaml -f compose.full.yaml exec central remote templates
docker compose --env-file /path/to/deployment.env \
  -f compose.yaml -f compose.full.yaml exec central \
  cat /srv/pepgent-runs/<completed-job-directory>/result.txt
```

The first command must return the real `TemplateInfo[]` entry named `soroi-komodo` with its actual `identity`; `soroi-komodo` is a template name, not an executable. The second must read a file produced by a real completed Slurm job, correlated with the owner's job-state response, job ID and unique content. A retained completion response remains valid after controller retention removes the job; do not infer completion from file existence or replace the producer with a host `touch`.

Observe the configured UID, remote-home read/write access and `.config` ownership after activation, without printing credentials or widening permissions. A disposable filesystem write probe proves only mount writability, not a remote business run. Compose rendering, an image-only bind-read smoke and a catalog filename are not full-profile runtime acceptance.

## Stop

End central before the services it uses. For base mode:

```sh
docker compose --env-file /path/to/deployment.env -f compose.yaml stop central
docker compose --env-file /path/to/deployment.env -f compose.yaml stop mux store
```

For full mode, retain both files:

```sh
docker compose --env-file /path/to/deployment.env \
  -f compose.yaml -f compose.full.yaml stop central
docker compose --env-file /path/to/deployment.env \
  -f compose.yaml -f compose.full.yaml stop mux store
```

Stopping does not delete named volumes, either host bind directory, remote run records, Slurm data or the deployment's selected release artifact.
