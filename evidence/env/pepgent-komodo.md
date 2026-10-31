# Pepgent isolated Komodo E2E target

Local OrbStack only. No homelab/production connections, credentials, or SOPS inputs. This ledger and `pepgent-komodo/compose.yaml` persist this local test installation.

## Registered resources

| Resource | Purpose / ownership / isolation |
|---|---|
| Compose project `pepgent-komodo` | Persistent local Core + Periphery for Pepgent E2E consumers |
| Container `pepgent-komodo-core` | Official `ghcr.io/moghtech/komodo-core:2` moving-major image; publishes `127.0.0.1:59120` to Core `9120`; OrbStack container domain exposes `pepgent-komodo-core.orb.local:9120` |
| Container `pepgent-komodo-periphery` | Official `ghcr.io/moghtech/komodo-periphery:2`; Docker socket grants authority over **ALL local OrbStack Docker resources**, not only Pepgent |
| Existing container `shared-mongo` | Reused shared dependency, defined by `shared-mongo/compose.yml`; start if stopped, do not remove or reinitialize |
| Existing network `shared-mongo` | External network, shared Mongo consumer connectivity; no second database container/network |
| Mongo database `pepgent_test_komodo` | Komodo-only namespace on `shared-mongo:27017`; shared root credentials injected privately into Core |
| Volume `pepgent-komodo-keys` | Persistent Core / Periphery communication identity |
| Volume `pepgent-komodo-backups` | Core metadata backups |
| Bind `pepgent-komodo/periphery/` | Same absolute path inside and outside Periphery; persistent Stack/repo/build working state |
| Disposable Stack `pepgent-test-komodo-proof` | Runtime proof only; container `pepgent-test-komodo-proof`, no volumes, network `pepgent-test-komodo-proof_default`; remove after successful proof |

Core and Periphery reuse external `shared-mongo`; Compose creates no default network for the installation. Proof resources are registered before creation and must not be left running.

Production isolation is real: this target uses no homelab/production connection or credential. It is **not** an engine-level security sandbox from unrelated local Docker objects. Only Pepgent-owned runtime names may be mutated through this target. Never use prune, StopAllContainers, server-wide operations, or mutation of unrelated engine resources.

## Local access and private files

- Mac endpoint: `http://127.0.0.1:59120`.
- OrbStack guest/container endpoint: `http://pepgent-komodo-core.orb.local:9120`; direct container routing avoids a wildcard Mac port bind.
- Core bootstrap Server: `pepgent-test`.
- Private files (mode `0600`): `pepgent-komodo/core.env`, `pepgent-komodo/periphery.env`, `pepgent-komodo/api.json`. The API file contains `host`, `key`, `secret`; `host` is the Mac loopback URL. Guest clients use the OrbStack endpoint instead. API key name is `pepgent-local-e2e`, with no expiry; Core created it through authenticated `/auth/manage` `CreateApiKey`, not a database write.
- Parent directory is local-only, not a git repository. Never print these files or copy their values into chat.
- Local authentication is isolated from the homelab. The bootstrap administrator password is generated once and retained in `core.env`; user registration is disabled.

## Lifecycle

```sh
cd ~/Ext/work/orbstack
docker compose -f shared-mongo/compose.yml up -d
docker compose -f pepgent-komodo/compose.yaml up -d
# Stop only this installation; preserve shared Mongo and all state:
docker compose -f pepgent-komodo/compose.yaml stop
# Restart the same installation:
docker compose -f pepgent-komodo/compose.yaml up -d
```

Do not use `down -v`, prune, or drop databases. Starting this target never implies stopping the shared Mongo dependency afterward; other consumers can share it.

## Sources

- Official Mongo/Core/Periphery Compose: https://github.com/moghtech/komodo/blob/main/compose/mongo.compose.yaml
- Official environment configuration: https://github.com/moghtech/komodo/blob/main/compose/compose.env
- Core configuration and database namespace: https://github.com/moghtech/komodo/blob/main/config/core.config.toml
- Live-version Stack write schema: https://github.com/moghtech/komodo/blob/v2.3.4/client/core/rs/src/api/write/stack.rs
- Live-version Stack execute schema: https://github.com/moghtech/komodo/blob/v2.3.4/client/core/rs/src/api/execute/stack.rs
- Auth login / key management schemas: https://docs.rs/mogh_auth_client/1.7.0/mogh_auth_client/api/login/ and https://docs.rs/mogh_auth_client/1.7.0/mogh_auth_client/api/manage/

## Runtime verification

Verified 2026-11-01 from the Mac and a real Komodo-deployed Alpine container. Both official moving-major images reported version `2.3.4`; the definitions do not pin that release.

1. Before creation, inspected the existing `shared-mongo` container/network and registered the new resources above. `docker compose -f shared-mongo/compose.yml up -d` started the existing stopped container, without creating a second Mongo. Core initialized its user and Server against the allocated `pepgent_test_komodo` database.
2. `docker compose -f pepgent-komodo/compose.yaml config --services` returned only `core` and `periphery`; `config --volumes` returned only `keys` and `backups`. `up -d` created the two registered containers and volumes.
3. First unauthenticated `/read` `GetVersion` returned HTTP 401 (`Invalid client credentials`), as expected. Used official `/auth/login` `LoginLocalUser` and `/auth/manage` `CreateApiKey` to persist private API credentials; no credentials were printed.
4. After narrowing the Mac publish address and recreating Core, the same persisted API key returned the following from **both** `http://127.0.0.1:59120` and `http://pepgent-komodo-core.orb.local:9120`:

   ```text
   GetVersion {"version":"2.3.4"}
   ListServers [{"id":"6ae673977f90ffe88487ae55","name":"pepgent-test","state":"Ok"}]
   ```

   The unchanged user/API credentials and Server ID after Core recreation demonstrate persistence beyond container lifetime. Periphery logged `Logged in to Komodo Core core:9120 websocket as Server pepgent-test`.

5. Created the authorized disposable Stack through Core `CreateStack`, resolving `server_id` from that Core's live `ListServers`. Its temporary `file_contents` used `alpine`, `auto_pull=false`, no mounts, and command:

   ```sh
   printf 'pepgent-komodo-e2e-ok\n'
   printf 'orb-core-version='
   wget -qO- http://pepgent-komodo-core.orb.local:9120/version
   printf '\n'
   sleep 300
   ```

   This temporary in-API Compose exists only to prove the local target; it is not a persistent workload declaration or a new app onboarding convention.

6. Core `DeployStack` returned Update `6ae6745dfeeb18748d1e8aee`. `GetUpdate` reached `status=Complete`, `success=true`; its `Compose Config` and `Compose Up` stages both succeeded. The recorded command was `docker compose -p pepgent-test-komodo-proof -f compose.yaml up -d`.

   Independent direct readback:

   ```text
   docker logs pepgent-test-komodo-proof
   pepgent-komodo-e2e-ok
   orb-core-version=2.3.4

   docker inspect pepgent-test-komodo-proof [selected nonsecret fields]
   name=/pepgent-test-komodo-proof state=running image=alpine
   project=pepgent-test-komodo-proof service=proof mounts=0
   ```

   This proves Core → authenticated Periphery → local Docker deployment, not a hand-run Docker substitute. The second output line proves the separate proof network can resolve and reach the direct OrbStack Core endpoint.

7. Core `DestroyStack` Update `6ae67473feeb18748d1e8af2` reached `status=Complete`, `success=true`; its recorded `docker compose -p pepgent-test-komodo-proof down --timeout 1` removed only the proof container/network. `DeleteStack` then removed the proof record and `ListStacks` returned `[]`. Removed its leftover Periphery working directory and temporary bootstrap/proof invocation scripts.

   Final readback: Core and Periphery remained running, shared Mongo remained running, both `pepgent-komodo-keys` and `pepgent-komodo-backups` remained present; the proof container and proof network were absent. Both authenticated endpoints still returned version `2.3.4` and the same `pepgent-test` Server ID with state `Ok`. No prune, server-wide operation, database reset, or unrelated resource mutation was used.

For reproducible authenticated readback without printing credentials:

```sh
python3 - <<'PY'
import json
from pathlib import Path
from urllib.request import Request, urlopen
c = json.loads(Path.home().joinpath("Ext/work/orbstack/pepgent-komodo/api.json").read_text())
for host in (c["host"], "http://pepgent-komodo-core.orb.local:9120"):
    for kind in ("GetVersion", "ListServers"):
        req = Request(host + "/read",
            json.dumps({"type": kind, "params": {}}).encode(),
            {"Content-Type": "application/json", "x-api-key": c["key"], "x-api-secret": c["secret"]})
        with urlopen(req, timeout=30) as response:
            value = json.load(response)
        if kind == "ListServers":
            value = [{"id": s["id"], "name": s["name"], "state": s["info"]["state"]} for s in value]
        print(host, kind, json.dumps(value))
PY
```

`stat -f '%Lp %N' pepgent-komodo/core.env pepgent-komodo/periphery.env pepgent-komodo/api.json` returned `600` for all three files. `docker inspect pepgent-komodo-core --format '{{json .HostConfig.PortBindings}}'` returned `{"9120/tcp":[{"HostIp":"127.0.0.1","HostPort":"59120"}]}`.
