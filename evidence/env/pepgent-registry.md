# ENV-01 — local shared OCI registry evidence copy

Retrieved 2026-11-01 from `~/Ext/work/orbstack/README.md` (§ ENV-01 runtime evidence) and `~/Ext/work/orbstack/pepgent-registry/compose.yaml`. This is a documentation-only copy of the owner's recorded runtime results, not a new deployment definition or a rerun. No credential file, token file, `api.json`, `core.env`, credential value or token-path content was copied. Existing [Komodo](pepgent-komodo.md) and [Slurm](pepgent-slurm.md) snapshots cover the underlying test installations.

## Registered resource and connection

- Shared container: `pepgent-registry`, official `registry:2`; Komodo Periphery's Docker engine and Slurm Apptainer consume the same registry.
- Endpoint: `http://pepgent-registry.orb.local:5000`; host port `5000/tcp`.
- Persistent volume: `pepgent-registry-data` mounted at `/var/lib/registry`.
- Owner definition: `~/Ext/work/orbstack/pepgent-registry/compose.yaml`. Start: `docker compose -f ~/Ext/work/orbstack/pepgent-registry/compose.yaml up -d`; stop: the same command with `stop`.
- Docker HTTP-registry trust: `~/.orbstack/config/docker.json`, `insecure-registries`; owner records `orb restart docker` as the reload operation. Slurm trust is configured by `pepgent-slurm/configure.sh` in `/etc/containers/registries.conf.d/pepgent-registry.conf`.

The recorded Compose text declares one `registry` service, image `registry:2`, container name `pepgent-registry`, `restart: unless-stopped`, port `5000:5000`, and the named volume above. No credentials appear in that definition; no executable deployment file is added to PM.

## Runtime proof recorded by the environment owner

Verified 2026-11-01:

1. Container remained `Up`, with `0.0.0.0:5000->5000/tcp` and the persistent volume above. After restarting the container, `GET /v2/_catalog` returned `{"repositories":["pepgent/env-01"]}`, `status=200`. Both Mac and `pepgent-slurm-test` received `{}`, `status=200` from `/v2/`.
2. Mac `docker pull alpine:latest` and `docker push pepgent-registry.orb.local:5000/pepgent/env-01:latest` succeeded, exit 0. The push output identified repository `pepgent-registry.orb.local:5000/pepgent/env-01`. No digest comparison is used as evidence.
3. Through the existing authenticated Komodo Core API (version `2.3.4`, Server `pepgent-test`), the owner created/deployed disposable Stack `pepgent-registry-env01`. Readback: `state=running`, service `nonce`, image `pepgent-registry.orb.local:5000/pepgent/env-01:latest`. `GetStackLog` returned `success=true` and stdout nonce `env01-aba4e3d39cc2b181470f0b0d73895021`.
4. Slurm registry configuration set `insecure=true`. As user `pepgent`, `apptainer pull /var/lib/pepgent-apptainer/env01.sif docker://pepgent-registry.orb.local:5000/pepgent/env-01:latest` succeeded: `pull=ok user=pepgent image=alpine`. Executing that SIF returned the same nonce `env01-aba4e3d39cc2b181470f0b0d73895021`.

The runtime outputs establish Mac push → Komodo deployment and non-root Slurm Apptainer consumption; persisted catalog readback establishes registry data survived container restart. Hash verification is not acceptance evidence.

## Cleanup and retained resource

Komodo `DestroyStack` and `DeleteStack` completed; `stack_present=false`. Proof container and network were absent. The shared registry and its persistent data remain available. No new runtime verification was performed when publishing this copy.
