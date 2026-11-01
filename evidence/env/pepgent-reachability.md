# ENV-03 — Komodo / Slurm network reachability evidence copy

Retrieved 2026-11-01 from the ENV-03 row in `~/Ext/work/orbstack/README.md` and the ENV-03 progress entry in `pepgent-soroi/LEDGER.md`. This documentation-only snapshot preserves the owner's already completed runtime observations. It is not a rerun or a new resource declaration. No credential value, token-path content, private API file, token file or environment file was read or copied for this publication. Hash verification is not used as evidence.

## Registered bounded workload

- Disposable echo container: `env03-echo`, cached `oven/bun:latest`, `linux/arm64`.
- Host binding: `0.0.0.0:58083→8080`; clients use `host.docker.internal:58083`.
- Existing test targets: Komodo Server `pepgent-test`; Slurm machine `pepgent-slurm-test`.
- Temporary registry image: `pepgent-registry.orb.local:5000/pepgent/env03-bun:latest`, consumed by Slurm Apptainer.
- No new volume, database or network. Owner's disposable drivers were `/tmp/env03-echo/{echo,client,slurm_driver}.ts` / `.py`.
- Resource creation was registered before execution.

## Owner-recorded runtime observations

| Real caller | WebSocket result | Large HTTP upload result | Downstream terminal fact |
| --- | --- | --- | --- |
| Komodo Core `CreateStack` / `DeployStack` on Server `pepgent-test`, container `env03-komodo-client` | WS round trip echoed `env03-komodo-ws` | HTTP PUT returned `200`; server received `104857600` bytes (100 MiB) | Core-managed deployment actually executed the container client |
| Slurm REST job `4`, with Apptainer pulling the local registry image | WS round trip echoed `env03-slurm-ws` | HTTP PUT returned `200`; server received `104857600` bytes (100 MiB) | Job `COMPLETED`, return `0` |

Final service counters: `uploads=2`, `lastBytes=104857600`. These are actual network/server outcomes, not merely an open port or running-container claim. No hash value or hash equality is offered as proof.

## Cleanup and retained tag

Komodo `DestroyStack` / `DeleteStack` completed; its Stack and container were absent. The Slurm run directory and `env03-bun.sif` were removed. `env03-echo` and the local image tag were deleted; `/tmp/env03-echo` was moved to trash. The temporary tag in the shared registry remains because deletion returned `405`; the owner did not restart or reconfigure a shared service just to remove it. This is the sole retained test image noted by the owner, not an undisclosed running resource.

The temporary echo target and drivers have been cleaned, so the table records the completed run rather than claiming those temporary entry points are live now. Repeating the workload requires re-registering bounded echo resources through the environment owner; this publication does not create any.
