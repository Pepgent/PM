# `pepgent-iac` working-tree inventory

## Scope and evidence conventions

This is a static inventory of the current working tree at `/Users/mouriya/Ext/code/pepgent/pepgent-iac`. I read repository files, searched the tree for scheduler declarations, and ran only the requested Git metadata command. I did **not** run OpenTofu `plan` or `apply`, deploy a guest, run the runtime suite, edit repository files, or inspect Git history/GitHub history. The documented commands below are instructions found in the repository, not commands run for this report. **(R)** session `01a193fd-e992-76d2-8c29-060fe52cc094/agents/RepoIac`, user/tool timeline beginning at `07:30:57`; the recorded command is `git remote -v && git branch --show-current` (entry `#be705fee`).

Evidence tags:

- **(U)** — the user's words, used only for requested scope and intent.
- **(D)** — current repository document or source text.
- **(R)** — an observed command/tool result from this investigation.
- **(A)** — a synthesis or interpretation; it is not a substitute for source evidence.

## Requested intent

The assignment says, verbatim:

> “Working tree of /Users/mouriya/Ext/code/pepgent/pepgent-iac.”  
> “Describe: purpose, structure, what infra it declares (hosts, services, Komodo, Slurm, storage), how it is applied, AGENTS.md rules, `git remote -v`, current branch. Do not run plan/apply.”  
> “local://inv/r-iac.md.”

**(U)** session `01a193fd-e992-76d2-8c29-060fe52cc094/agents/RepoIac`, user entry `#6e8d6640`, `07:30:57`.

The broader user intent also included the following exact statement:

> “对于slurm和komodo的测试，如果可以，我推荐你在homelab tf里启动vm创建小型测试环境。”

**(U)** session `01a193fd-e992-76d2-8c29-060fe52cc094`, user entry `#5e62a529`, `07:21:29`.

That recommendation is intent for possible testing; it is not evidence that this repository currently declares Slurm or that any test VM was started. This report inventories `pepgent-iac` only. **(A)**

## Purpose and scope

- The repository provides OpenTofu management for an **existing** `soroic` Proxmox environment: host takeover, shared VM/CT images and templates, VM/CT guest baselines, ordinary IPv4 NAT, and a separately built native NetBird-Xray offline package. It is not presented as a generic deployment template for arbitrary PVE hosts. **(D)** `README.md:1-5`.
- The repository's own policy describes the same boundary and explicitly says it uses OpenTofu rather than Ansible, Makefile automation, IaC submodules, or a Dockerized NetBird deployment. Persistent application guests use `apps/<name>/` workspaces; the current tree names only `apps/komodo/`. **(D)** `CLAUDE.md:1-3`.
- The PVE host is an adopted control target, not a host created by this repository: the provider points at node `soroic` and `mouriya.mouriya.lan`. **(D)** `host/main.tf:21-29`; `infra/main.tf:21-29`; `apps/komodo/main.tf:20-28`.

## Repository structure and state ownership

| Path | Role in the current tree | State/ownership boundary |
|---|---|---|
| `host/` | Existing-host adoption, APT source management, template mirror, storage content, guest bridge/SNAT/DNS, and guest-port DNAT service. | Owns `soroic/host/terraform.tfstate`. **(D)** `CLAUDE.md:15-18`; `README.md:28-34`. |
| `infra/` | Shared Debian 13 and Ubuntu 26.04 cloud-image imports plus the signed Debian 13 CT template. | Owns `soroic/infra/terraform.tfstate`; exports current cloud-image IDs and the Debian template ID. **(D)** `CLAUDE.md:15-19`; `infra/main.tf:31-55`; `infra/main.tf:143-150`. |
| `tests/runtime/` | Explicit, temporary runtime fixtures for VM/CT/NAT acceptance, not a persistent application. | Owns `soroic/tests/runtime/terraform.tfstate`; the current cases are Debian VM, Ubuntu VM, Debian CT, missing-TUN CT, and a VM+CT `nat-pair`. **(D)** `CLAUDE.md:15-20`; `tests/runtime/main.tf:46-58`; `tests/runtime/main.tf:72-94`. |
| `apps/komodo/` | One persistent application workspace: the Komodo guest VM declaration, compose file, deployment/convergence script, and app-specific encrypted secret file. | Owns `soroic/apps/komodo/terraform.tfstate`; the app VM is `soroic-komodo`. **(D)** `CLAUDE.md:15-20`; `README.md:40-44`. |
| `_shared/modules/vm/` | Reusable Debian 13 / Ubuntu 26.04 VM baseline and allocator-facing `nat_ports` output. | Consumed by `apps/komodo` and `tests/runtime`; its VM resource creates cloud-init snippets, a q35/OVMF VM, QGA, EFI/TPM state, root disk, and `vmbr1` network. **(D)** `README.md:33-36`; `_shared/modules/vm/main.tf:40-120`. |
| `_shared/modules/ct/` | Reusable unprivileged Debian CT baseline and allocator-facing `nat_ports` output. | Consumed by runtime fixtures; the module declares nesting/keyctl, `/dev/net/tun` passthrough, `vmbr1`, static DNS/gateway, and a local CT initialization step. **(D)** `README.md:33-36`; `_shared/modules/ct/main.tf:14-78`. |
| `_shared/guest_control.py` | QGA/pct guest-control transport used by runtime/application tooling; it is not an NBX installer. **(D)** `README.md:35-37`. |
| `scripts/` | Secret/environment bootstrap, host checks, asset preparation, guest-owner orchestration, CT initialization, and port queries. **(D)** `README.md:38-40`; `CLAUDE.md:26-36`. |
| `netbird/` | Optional native offline-package builder/installer and diagnostics. Ordinary NAT guest creation does not depend on it. **(D)** `README.md:39-40`, `README.md:110-127`; `CLAUDE.md:82-100`. |

The four OpenTofu workspaces deliberately use independent state keys in one R2-backed S3-compatible backend; Terraform state is treated as a creation index rather than the authority for live PVE state, kernel rules, or port leases. **(D)** `CLAUDE.md:15-24`; the backend blocks in `host/main.tf:1-18`, `infra/main.tf:1-19`, `tests/runtime/main.tf:1-19`, and `apps/komodo/main.tf:1-18`.

## What infrastructure is declared

### Existing PVE host

- All three persistent HCL roots (`host`, `infra`, and `apps/komodo`) use the Proxmox provider against node `soroic` at `mouriya.mouriya.lan`; the host workspace also runs a preflight external query before feature mutation. **(D)** `host/main.tf:21-35`; `infra/main.tf:21-29`; `apps/komodo/main.tf:20-28`.
- `host/main.tf` declares an ordered set of host operations: adopted-state/host feature handling, APT source handling, storage-content handling, CT-template mirroring, guest networking, and guest ports. The dispatcher in `host/deploy.py` accepts exactly those feature names and rechecks the host before and after each narrow operation. **(D)** `host/main.tf:31-39`, `host/main.tf:41-66`, `host/main.tf:68-147`; `host/deploy.py:20-49`.
- The host networking contract is an existing DHCP uplink on `wlp1s0`, a dedicated `vmbr1` guest network using `172.16.8.1/24`, host SNAT for ordinary guest IPv4 egress, and host DNAT for LAN/Wi-Fi ingress. The host policy forbids rebooting or disrupting the existing NetBird/Wi-Fi management path. **(D)** `CLAUDE.md:7-11`, `CLAUDE.md:38-48`; `README.md:7-26`.

### Host services

The current tree installs or manages these host-side systemd/service surfaces:

- `soroic-guest-network.service`: a persistent oneshot for guest IPv4 SNAT, with `apply` on start/reload and `remove` on stop. **(D)** `host/files/soroic-guest-network.service:1-13`.
- `soroic-guest-ports.service`: a persistent oneshot for LAN-only guest IPv4 DNAT, ordered after PVE cluster/networking and the SNAT service. **(D)** `host/files/soroic-guest-ports.service:1-14`.
- `soroic-guest-dns.service`: a `dnsmasq` guest DNS forwarder whose configuration is rendered from the DHCP-reported `wlp1s0` upstreams; the service restarts on failure. **(D)** `host/files/soroic-guest-dns.service:1-14`.
- `soroic-guest-dns.path` watches the projected upstream file, and `soroic-guest-dns-refresh.service` performs the corresponding refresh. **(D)** `host/files/soroic-guest-dns.path:1-9`; `host/files/soroic-guest-dns-refresh.service:1-6`.
- The host feature dispatcher also owns the APT-source, CT-template-mirror, storage-content, guest-network, and guest-ports helper operations. **(D)** `host/deploy.py:20-49`.

The guest-port authority is intentionally outside Terraform state: it is a host SQLite lease database at `/var/lib/soroic-guest-ports/leases.sqlite3`, with a persistent 500-port block per VM/CT and TCP/UDP sharing the same numeric block. **(D)** `CLAUDE.md:24`, `CLAUDE.md:46-52`; `README.md:18-22`, `README.md:44`.

### VM and CT guest baselines

- The VM module declares PVE VMs with q35/OVMF, CPU type `host`, QGA, serial socket, EFI and TPM state, a `scsi0` root disk, cloud-init snippets, and a virtio NIC on `vmbr1`; the defaults require `local-lvm` for root/EFI/TPM/cloud-init drive storage and `local` for public snippets. **(D)** `_shared/modules/vm/main.tf:71-120`; `_shared/modules/vm/variables.tf:49-70`.
- The CT module declares unprivileged Debian containers with nesting/keyctl, `/dev/net/tun` passthrough, a static `eth0` on `vmbr1`, `172.16.8.1` DNS/gateway, a `local-lvm` root filesystem, and a post-create initializer. **(D)** `_shared/modules/ct/main.tf:14-70`; `_shared/modules/ct/variables.tf:41-72`.
- Both module families expose a port-allocation result, but the repository policy treats the final host-kernel read-back as the completion point rather than treating the Terraform output alone as proof of a live mapping. **(D)** `_shared/modules/vm/main.tf:123-131`; `_shared/modules/ct/main.tf:71-78`; `README.md:93-97`.

### Persistent Komodo guest and services

`apps/komodo/main.tf` declares only the VM module for the application guest:

- PVE VMID `200`, hostname `soroic-komodo`, Debian 13, static address `172.16.8.20/24`, `16 GiB` memory, `64 GiB` root disk, started, and `on_boot = true`. The literal current HCL value is `cpu_cores = 8`; the adjacent comment describes these as host-type vCPUs rather than pinned/isolated CPUs. **(D)** `apps/komodo/main.tf:46-63`.
- The HCL does not provision the application containers itself. Its comment explicitly leaves Komodo, the guest's NetBird peer, and the workstation `km` profile to `apps/komodo/deploy.py` after the VM owner has created and bound the guest. **(D)** `apps/komodo/main.tf:46-50`; `CLAUDE.md:74-80`.

The compose project installed inside that guest contains exactly three services:

| Compose service | Declared function |
|---|---|
| `mongo` | MongoDB with persistent `mongo-data` and `mongo-config` volumes. **(D)** `apps/komodo/compose.yaml:4-16`, `apps/komodo/compose.yaml:52-55`. |
| `core` | `ghcr.io/moghtech/komodo-core`, listening on guest port `9120`, depending on MongoDB, and sharing the `keys` volume plus the Komodo backup path. **(D)** `apps/komodo/compose.yaml:18-34`. |
| `periphery` | `ghcr.io/moghtech/komodo-periphery`, depending on Core, sharing `keys`, the Docker socket, `/proc`, and its configured root directory. **(D)** `apps/komodo/compose.yaml:36-50`. |

The deployment script is a separate imperative convergence step. `init-secrets` creates the app-specific encrypted secret file once; `deploy` waits for the declared guest, ensures the guest's own mesh installation when needed, converges the compose files, waits for Core, creates or checks the Komodo API key, writes the local `km` endpoint, and verifies the server entry. **(D)** `apps/komodo/deploy.py:116-139`, `apps/komodo/deploy.py:161-171`, `apps/komodo/deploy.py:373-390`.

### Slurm status

- A case-insensitive repository-wide search for `slurm` returned **“No matches found”** in the current tree. **(R)** `functions.grep` call `#bbea2e55` in session `01a193fd-e992-76d2-8c29-060fe52cc094/agents/RepoIac`, with `path=/Users/mouriya/Ext/code/pepgent/pepgent-iac`, `case=false`, `gitignore=false`.
- The infrastructure declaration roots inspected here are `host/main.tf`, `infra/main.tf`, `tests/runtime/main.tf`, `apps/komodo/main.tf`, and the shared VM/CT modules. Their declared resources are host features, cloud images/templates, VM/CT guests, and Komodo; no scheduler resource or Slurm service appears. **(D)** `host/main.tf:31-147`; `infra/main.tf:31-150`; `tests/runtime/main.tf:46-192`; `apps/komodo/main.tf:46-73`; `_shared/modules/vm/main.tf:40-131`; `_shared/modules/ct/main.tf:14-78`.
- Precise conclusion: **no Slurm declaration was found in this current working tree**. This does not prove that a Slurm server does not exist elsewhere on the LAN or in another repository. **(A)** based on the preceding `(R)` and `(D)` evidence.

## Storage declarations and boundaries

- PVE `local` is adopted as the `/var/lib/vz` directory store. The storage helper accepts only the existing content set (`iso`, `vztmpl`, `backup`, `import`) or that set plus `snippets`, and its apply operation adds `snippets` as a set union rather than replacing the existing content set. **(D)** `CLAUDE.md:11`; `host/storage.py:9-29`.
- PVE `local-lvm` is the adopted `pve/data` LVM-thin store. Repository policy requires guest roots to remain on `local-lvm` and forbids formatting it or migrating it to ZFS. **(D)** `CLAUDE.md:11`; `_shared/modules/vm/variables.tf:58-70`; `_shared/modules/ct/variables.tf:65-72`.
- VM cloud-init snippets are stored as `local:snippets/...`, while the VM's root disk, EFI state, TPM state, and initialization drive use the root-storage input whose enforced default is `local-lvm`. **(D)** `_shared/modules/vm/main.tf:8-21`, `_shared/modules/vm/main.tf:40-68`, `_shared/modules/vm/main.tf:90-115`.
- Terraform/OpenTofu state is stored in the shared R2-backed S3-compatible backend under separate keys for `host`, `infra`, `tests/runtime`, and `apps/komodo`; state is not the authority for live PVE state or port leases. **(D)** `CLAUDE.md:15-24`; `host/main.tf:1-18`; `infra/main.tf:1-19`; `tests/runtime/main.tf:1-19`; `apps/komodo/main.tf:1-18`.
- Komodo's guest-local persistent storage is represented by the Compose volumes `mongo-data`, `mongo-config`, and `keys`, plus the configured backup directory under `/etc/komodo`. **(D)** `apps/komodo/compose.yaml:11-14`, `apps/komodo/compose.yaml:31-35`, `apps/komodo/compose.yaml:47-55`; `apps/komodo/deploy.py:213-257`.

## How the repository is applied (documented flow; not run here)

The repository documents this dependency order:

1. Bootstrap/import secrets, source the environment, and perform a read-only host check. **(D)** `CLAUDE.md:102-110`; `README.md:46-61`.
2. Initialize, plan, and apply the `host/` workspace, then run the host check again. Host apply handles the existing host baseline, APT, storage content, template mirror, guest bridge/SNAT/DNS, and guest-port service. **(D)** `CLAUDE.md:104-113`; `README.md:63-72`; `host/deploy.py:20-49`.
3. Prepare shared assets after host takeover; when declaring a new image generation, the documented command uses `scripts/prepare-assets.py --declare`. Then initialize, plan, and apply `infra/`. **(D)** `CLAUDE.md:104-117`; `README.md:74-82`; `infra/main.tf:31-55`, `infra/main.tf:97-150`.
4. Create or change guests only through the owner wrapper, `scripts/guest_workspace.py`, or the runtime runner. The documented owner flow saves and reviews a complete plan, reserves ports, applies the saved plan in an interactive terminal, then verifies the PVE guest/root volume and final host mapping. Raw guest-workspace OpenTofu invocation is explicitly unsupported. **(D)** `CLAUDE.md:62-68`; `README.md:84-97`; `scripts/guest_workspace.py:243-263`.
5. For Komodo, initialize the app secret file once, create/update the VM through the app workspace owner, build the optional private NetBird package when needed, and run `python3 apps/komodo/deploy.py deploy` after the VM is bound. **(D)** `README.md:99-108`; `CLAUDE.md:74-80`; `apps/komodo/deploy.py:373-410`.
6. The documented runtime acceptance entrypoint is `python3 tests/runtime/run.py --all --defer-lan`; this report did not run it. **(D)** `README.md:129-148`; `CLAUDE.md:118-134`.

The host and infra HCL roots use external Python helpers and remote-exec/file provisioners for their narrow operations; the application layer is intentionally separate from the Komodo VM's Terraform lifecycle. **(D)** `host/main.tf:31-147`; `infra/main.tf:41-141`; `apps/komodo/main.tf:46-50`; `apps/komodo/deploy.py:380-390`.

## `AGENTS.md` and repository rules

### Direct `AGENTS.md` rule

The repository-level `AGENTS.md` contains one direct instruction: read `CLAUDE.md` before changing or deploying the repository. **(D)** `AGENTS.md:1-3`.

### Rules pulled in from `CLAUDE.md`

Because `AGENTS.md` delegates the operational rules to `CLAUDE.md`, the relevant rules for any future change/deployment are:

- Manage the existing `soroic` node only through the explicit approved PVE/SSH endpoint; do not reboot the host, cycle its uplink, restart networking/Wi-Fi/NetBird/Xray, or reconfigure Wi-Fi as part of validation. **(D)** `CLAUDE.md:7-11`.
- Keep host, infra, runtime, and app state separated under their declared backend keys. Do not use Terraform state as a substitute for live PVE/kernel/port authority; preserve the host port lease database as the source of port-allocation truth. **(D)** `CLAUDE.md:15-24`.
- Obtain credentials through the existing SOPS/bootstrap and environment paths; do not ask an operator to paste secrets, rotate shared credentials, or place management credentials in Terraform variables/state/packages. **(D)** `CLAUDE.md:26-36`.
- Keep ordinary guest networking independent of Xray/NetBird, use the declared guest bridge/addressing, and manage only the repository-owned SNAT/DNAT/DNS surfaces. **(D)** `CLAUDE.md:38-54`.
- Use the owner wrapper/runtime runner for guest workspaces, require review of complete saved plans, use the port authority lifecycle, and do not bypass it with raw `tofu`, `qm`, or `pct` operations. **(D)** `CLAUDE.md:62-68`.
- Keep Komodo application convergence separate from the VM/port lifecycle: `apps/komodo/main.tf` declares the VM and `apps/komodo/deploy.py` converges the guest application afterward. **(D)** `CLAUDE.md:74-80`.
- Keep private packages, state, identity material, real variable files, and encrypted bundles out of Git/GitHub publication; the documented remote is private and the normal branch policy is `main`. **(D)** `CLAUDE.md:136`.

## Git remote and current branch

Observed by running exactly `git remote -v && git branch --show-current` in the target working tree:

```text
origin  https://github.com/Pepgent/iac.git (fetch)
origin  https://github.com/Pepgent/iac.git (push)
main
```

**(R)** command output from session `01a193fd-e992-76d2-8c29-060fe52cc094/agents/RepoIac`, command entry `#be705fee`.

Therefore:

- `origin` fetch URL: `https://github.com/Pepgent/iac.git`. **(R)**
- `origin` push URL: `https://github.com/Pepgent/iac.git`. **(R)**
- Current branch: `main`. **(R)**

## Bottom line

`pepgent-iac` is an OpenTofu/Python control repository for one existing Proxmox node (`soroic`). Its declared infrastructure is the host baseline and guest networking services, shared Debian/Ubuntu VM assets and Debian CT template, reusable VM/CT guest modules, temporary runtime fixtures, and one persistent Komodo VM whose MongoDB/Core/Periphery application is converged separately. Storage is split among adopted PVE `local`, adopted PVE `local-lvm`, independent R2 state keys, guest-local Compose volumes, and the host's port-lease SQLite authority. No Slurm declaration was found in this working tree; any Slurm test environment would be external/future work rather than a current `pepgent-iac` declaration. **(A)** supported by the `(D)` and `(R)` findings above.
