# homelab-tf repository survey

## Scope, intent, and evidence convention

This is a read-only survey of the `homelab-tf` checkout. The only requested artifact is this report; no repository file, OpenTofu state, Proxmox object, Git remote, branch, or GitHub object was changed. **(R; survey tool trace and the absence of any write/apply command; U; current user request, “Read-only”)**

The user’s key intent statements are quoted verbatim:

> “Describe: layout, how a VM/CT is declared and applied (module, variables, naming, IP/DNS conventions), existing Slurm or Komodo-related resources, how to add a small test VM, its AGENTS.md rules, `git remote -v`, branch.” **(U; current user request, Change)**
>
> “Do not run tofu apply/plan.” **(U; current user request, Change)**
>
> “Read-only: do not edit repo files, commit, change omp config, or create GitHub objects.” **(U; current user request, hard rules)**

Evidence tags used below:

- **(U)** — user intent, quoted above; ground truth for the requested scope.
- **(D)** — current repository document or declaration: HCL, YAML, Makefile, README, `CLAUDE.md`, `AGENTS.md`, rule, or skill text in the checkout.
- **(R)** — an observed read-only command/search/location result from this survey. No `tofu plan` or `tofu apply` was run.
- **(A)** — an interpretation or recommendation derived from cited `(D)`/`(R)` evidence. It is not presented as live Proxmox or service state.

Line citations refer to the current working-tree files, not Git history.

## Repository location and current Git metadata

- The repository was found at `/Users/mouriya/Ext/code/homelab-tf`; a scoped location search across `/Users/mouriya/Ext` and the relevant home patterns returned that directory and skipped the missing `/Users/mouriya/homelab-tf` path. **(R; `glob /Users/mouriya/Ext/*/homelab-tf;/Users/mouriya/homelab-tf;/Users/mouriya/*/homelab-tf`)**
- The current checkout’s remote and branch were observed with the read-only command `git remote -v && printf '\nCURRENT_BRANCH=' && git branch --show-current`. Its output was:

  ```text
  origin  https://github.com/mouriya-s-lab/homelab-tf.git (fetch)
  origin  https://github.com/mouriya-s-lab/homelab-tf.git (push)

  CURRENT_BRANCH=master
  ```

  **(R; command `git remote -v && printf '\nCURRENT_BRANCH=' && git branch --show-current`)**
- The repo’s own iac-projects skill describes the same local path, GitHub repository, one-Proxmox-host topology, and OpenTofu workspace model. **(D; `skill://iac-projects:14-18`)**
- No Git history, GitHub issue/PR history, `tofu plan`, or `tofu apply` was read or run. **(U; current user request, hard rules and Change)**

## Layout and ownership

### Top-level structure

- The root `AGENTS.md` describes a multi-layer IaC repository: OpenTofu declares Proxmox CTs/VMs and networking; Ansible provisions services; per-app Ansible roles are Git submodules under app directories; resources run on one Proxmox host; NetBird is the fallback side channel. **(D; `AGENTS.md:1-3`)**
- The root layout is explicitly divided into `.claude/rules/`, baseline skills, OpenTofu workspaces (`network/`, `workstation/`, `apps/`, `browser/`, `nas/`, `paas/`, `infra/`, `trading/`, `moat/`, `cf-ingress/`), `_shared/modules/`, `_shared/ansible/`, and app submodules (`dns`, `step-ca`, and `komodo`). **(D; `AGENTS.md:5-14`)**
- The Makefile’s `DOMAINS` list is the authoritative workspace list: `infra nas network apps workstation paas browser trading moat cf-ingress`. **(D; `Makefile:1-3`)**
- Shared Terraform modules currently present are `vm`, `community-ct`, `sriov`, and `lxc`; the managed VM path uses `vm`, while the managed CT path uses `community-ct`. **(R; `glob /Users/mouriya/Ext/code/homelab-tf/_shared/modules`)**
- Shared Ansible contains the inventory, PVE-host and CT-bootstrap playbooks, the Docker baseline playbook, cross-cutting roles, host variables, and the custom `proxmox_qm_remote` connection plugin. **(R; `glob /Users/mouriya/Ext/code/homelab-tf/_shared/ansible`)**
- The tracked submodule declarations are `step-ca`, `dns`, `komodo`, and `sriov`. **(D; `.gitmodules:1-12`)**

### Workspace file convention and state

- The normal PVE workspace shape is `providers.tf` (provider and R2 backend), `data.tf` (remote state), `main.tf` (module calls), `variables.tf` (workspace inputs), ignored `terraform.tfvars`, and per-resource `vms/<id>.yaml` or `cts/<id>.yaml`. **(D; `.claude/rules/dev-conventions.md:126-144`)**
- Each workspace’s backend key is `<workspace>/terraform.tfstate`; the documented backend is the Cloudflare R2 bucket `homelab-tf` with a native S3 lock file. **(D; `.claude/rules/r2-backend.md:1-5`)**
- `cf-ingress` is an exception: it is Cloudflare-only and has no normal per-resource YAML/data layout. `nas` is also an exception: it is retained for NAS-adjacent infrastructure but does not manage OMV VM 101. **(D; `.claude/rules/dev-conventions.md:146-149`; `nas/main.tf:1-38`)**
- `infra` owns the Debian 13 and Ubuntu 26.04 cloud image downloads and Debian/Arch LXC templates, then exports `cloud_image_ids`, `debian13_template_id`, and `archlinux_template_id` for other workspaces through remote state. **(D; `infra/main.tf:5-39`, `infra/main.tf:41-74`)**
- The provider block in a normal workspace only declares `insecure = true`; the PVE endpoint/API token are not workspace variables. R2 credentials, PVE API credentials, and VM snippet-upload SSH toggles are supplied through environment variables sourced from the encrypted shared secrets path. **(D; `.claude/rules/pve-provider-env.md:1-4`, `.claude/rules/pve-provider-env.md:22-65`; `.claude/rules/r2-backend.md:7-29`)**
- The PVE management address is `192.168.1.67`; the access rule explicitly says this is the only valid management address for `tofu`, SSH, and Ansible. **(D; `.claude/rules/pve-access.md:1-10`)**

## How a managed VM is declared and applied

### Current VM callers

The current checkout has four active VM module callers, as shown in the table below. **(D; `apps/main.tf:18-26`, `browser/main.tf:21-29`, `paas/main.tf:17-24`, `trading/main.tf:9-16`)**

| Workspace | Logical module name | VMID | YAML | Current role indicated by declaration |
|---|---:|---:|---|---|
| `apps` | `moat_app1` | 110 | `apps/vms/110.yaml` | Komodo controller/application host |
| `browser` | `browser` | 104 | `browser/vms/104.yaml` | Browser Komodo Periphery host |
| `paas` | `soroi` | 107 | `paas/vms/107.yaml` | Soroi Komodo execution host |
| `trading` | `trading_agent` | 130 | `trading/vms/130.yaml` | Independent trading Komodo Core host |

The module blocks all use `source = "../_shared/modules/vm"`, pass `vm_id`, read `cloud_image_ids` from `data.terraform_remote_state.infra.outputs.cloud_image_ids`, pass a workspace-relative `vms/<VMID>.yaml`, and pass `var.ssh_public_key`. **(D; `apps/main.tf:15-26`, `browser/main.tf:21-29`, `paas/main.tf:15-24`, `trading/main.tf:5-16`)**

`workstation` and `moat` currently contain only no-destroy `removed` blocks for retired guests rather than active VM module callers. **(D; `workstation/main.tf:12-21`, `moat/main.tf:1-23`)** The topology document also identifies several intentionally retained/stopped guests outside the active lifecycle; retained objects must not be inferred to be deployable declarations. **(D; `.claude/rules/topology.md:8-12`)**

### Workspace inputs and remote state

- A representative VM workspace’s provider/backend declaration uses the R2 key `apps/terraform.tfstate` and a provider block with only `insecure = true`. **(D; `apps/providers.tf:1-27`)**
- Its `data.tf` reads `infra/terraform.tfstate` from the same R2 bucket, and the module consumes the exported `cloud_image_ids` map. **(D; `apps/data.tf:1-17`, `apps/main.tf:18-25`)** The other VM workspaces use the same `data.terraform_remote_state.infra` shape. **(D; `browser/data.tf:1-17`, `paas/data.tf:1-17`, `trading/data.tf:1-17`)**
- The VM module’s typed inputs are: required `vm_id`, `cloud_image_ids`, `vm_yaml`, and `ssh_public_key`; optional placement/storage inputs with defaults (`node_name = "pve"`, ZFS root/EFI/TPM datastores defaulting to `zpool-single-1t-ssd`, cloud-init snippets defaulting to `snippets-storage`); and `instance_id_suffix = "initial"`. **(D; `_shared/modules/vm/variables.tf:1-63`)**
- Per-VM tuning does not go in HCL variables. The module decodes `vm_yaml`, reads `hostname`, `cpu_cores`, `memory`, `root_disk_size`, required `nic_mapping`, optional `gpu_mapping`, optional `data_disks`, and optional power-state fields from that YAML. **(D; `_shared/modules/vm/main.tf:13-55`)**

### Per-VM YAML schema and naming

The documented and currently consumed VM YAML schema is as follows. **(D; `.claude/skills/vm-baseline/SKILL.md:121-175`; `_shared/modules/vm/main.tf:13-55`)**

- Required: `hostname`, `os_profile`, `cpu_cores`, `memory`, `root_disk_size`, and `nic_mapping`.
- Optional: `gpu_mapping`, `data_disks`, `started`, `on_boot`, `netbird_extra_dns_labels`, and cloud-init extension hooks (`extra_packages`, `extra_apt_sources`, `extra_ssh_keys`, `extra_users`, `extra_write_files`, `extra_runcmd`).

**(D; `.claude/skills/vm-baseline/SKILL.md:121-175`)**

The module supports `debian13` and `ubuntu2604`; the profile must match an `infra` cloud-image output, and the module precondition rejects a missing/unknown profile. **(D; `_shared/modules/vm/main.tf:24-38`, `_shared/modules/vm/main.tf:155-171`)**

The VM resource name is derived directly from YAML `hostname` (`name = local.hostname`), while the VMID is the numeric HCL input. **(D; `_shared/modules/vm/main.tf:209-214`)** The cloud-init metadata uses `vm-<VMID>-<instance_id_suffix>` as the instance ID and the YAML hostname as `local-hostname`. **(D; `_shared/modules/vm/main.tf:97-105`; `_shared/modules/vm/cloud-init/meta-data.yaml.tftpl:1-2`)** The generated identity fragment sets both `hostname` and `fqdn: <hostname>.hb.lan`. **(D; `_shared/modules/vm/render-user-data.py:89-112`)**

The repository convention is that hostname is the stable identity and must not be renamed after creation; workspace module names are logical names and do not contain the VMID. **(D; `.claude/skills/arch-baseline/SKILL.md:15-20`; `.claude/rules/dev-conventions.md:33-44`)** Current inventory aliases match the VM hostnames (`moat-app1`, `browser`, `trading-agent`, `soroi`) and map each to `proxmox_vmid`. **(D; `_shared/ansible/inventory.yml:22-36`)**

### What the shared VM module creates

The module’s main path is:

1. Decode the per-VM YAML and validate the OS profile/cloud-image pairing. **(D; `_shared/modules/vm/main.tf:13-48`, `_shared/modules/vm/main.tf:155-171`)**
2. Validate the required NIC SR-IOV mapping and optional GPU mapping through `_shared/modules/sriov/`; raw PCI references are not the caller contract. **(D; `_shared/modules/vm/main.tf:131-148`; `_shared/modules/sriov/variables.tf:1-35`; `.claude/skills/vm-baseline/SKILL.md:25-29`)**
3. Render cloud-init user-data out of band, upload user-data/network-data/meta-data snippets, and attach stable snippet IDs to the VM. **(D; `_shared/modules/vm/main.tf:150-207`, `_shared/modules/vm/main.tf:298-314`)**
4. Create a Proxmox VM with the fixed baseline: `q35`, OVMF, host CPU, qemu guest agent, serial socket, EFI disk, TPM v2, ZFS root/data disks, required NIC VF, optional GPU VF, and a placeholder `NONET` virtio network device. **(D; `_shared/modules/vm/main.tf:209-304`)**
5. Reject any VM disk datastore whose live PVE type is not `zfspool`; this applies to root, EFI, TPM, and data disks. **(D; `_shared/modules/vm/main.tf:109-129`, `_shared/modules/vm/main.tf:316-321`)**

The first-boot payload is the VM bootstrap stage: it installs the baseline packages, configures identity/network, installs/enrolls NetBird, installs Docker/VAAPI according to profile, and optionally formats/mounts declared data disks. There is intentionally no separate `vm-bootstrap-*` Make target. **(D; `.claude/skills/arch-baseline/SKILL.md:49-58`; `.claude/skills/vm-baseline/SKILL.md:60-88`, `.claude/skills/vm-baseline/SKILL.md:241-248`; `Makefile:66-78`)**

### IP and DNS conventions for VMs

- The VM network-config matches the resolved SR-IOV NIC VF MAC, enables DHCPv4, and sets `dhcp-identifier: mac`; there is no per-VM static IP input in the VM YAML schema. **(D; `_shared/modules/vm/cloud-init/network-config.yaml.tftpl:1-7`; `.claude/skills/vm-baseline/SKILL.md:92-106`)**
- The global identity rule is DHCP for ordinary managed resources. Static LAN addresses are reserved for root-of-trust identities (`dns`, `ca`, retained `bao`) and the PVE host. **(D; `.claude/skills/arch-baseline/SKILL.md:15-20`; `network/identities.yaml:1-27`)**
- Kea’s authoritative subnet is `192.168.1.0/24`, with DNS `homelab_dns_ipv4`, domain `hb.lan`, and DHCP pool `.200-.251`; `.1-.199` is the manual/static range. **(D; `dns/roles/kea/defaults/main.yml:8-21`)** The topology rule states the same operator convention: “200 以前是手动范围，200 以后是 DHCP”。 **(D; `.claude/rules/topology.md:14-21`)**
- DHCP-to-DNS registration is present in the repo: Kea leases are converted to CoreDNS `dhcp.hosts`, but only clients that send DHCP Option 12 hostnames receive that lease-derived A record. **(D; `dns/docs/architecture.md:128-140`; `dns/README.md:22-36`)**
- CoreDNS is authoritative for `hb.lan`; the PVE plugin also discovers running Proxmox guests through SR-IOV and `net0` channels, filtered to the LAN CIDR. **(D; `dns/roles/coredns/defaults/main.yml:29-44`, `dns/roles/coredns/defaults/main.yml:59-88`; `dns/docs/architecture.md:142-190`)**
- Therefore, a normal running VM’s expected LAN identity is `<hostname>.hb.lan`, with DHCP providing the address and CoreDNS/its producers or live-PVE plugin supplying the answer. A stopped VM is not a valid runtime availability claim. **(A; derived from `_shared/modules/vm/render-user-data.py:89-96`, `_shared/modules/vm/cloud-init/network-config.yaml.tftpl:1-7`, `dns/docs/architecture.md:128-140`, `dns/docs/architecture.md:142-190`, and `.claude/skills/arch-baseline/SKILL.md:15-20`)**
- Optional `coredns_aliases` in a managed VM YAML creates CNAME/rewrite aliases through the DNS identity renderer; the current `apps/vms/110.yaml` publishes `homepage` and `fulcrum` for `moat-app1`. **(D; `apps/vms/110.yaml:18-29`; `_shared/scripts/render-dns-identity.py:121-170`)** Ordinary test VMs do not need a static `network/identities.yaml` entry merely to obtain their DHCP hostname; that manifest is for static infrastructure identities and aliases. **(A; derived from `network/identities.yaml:1-27` and `_shared/scripts/render-dns-identity.py:79-170`)**

### Apply and provisioning flow (not executed here)

The declared future flow for an ordinary VM is:

1. Ensure the R2 and PVE provider environment is present from the owning secret source, including the PVE SSH toggles needed for snippet upload. **(D; `.claude/rules/r2-backend.md:7-29`; `.claude/rules/pve-provider-env.md:46-65`)**
2. From the owning workspace, run OpenTofu initialization/preview/apply according to the operator’s change process. The Makefile has `init-<domain>`, `plan-<domain>`, and `apply-<domain>` pattern targets; `apply-<domain>` executes `cd <domain> && tofu apply`. **(D; `Makefile:5-21`)**
3. The apply imports the selected cloud image, uploads cloud-init snippets, creates the VM, and lets first boot perform the VM bootstrap. **(D; `.claude/skills/vm-baseline/SKILL.md:210-216`, `.claude/skills/vm-baseline/SKILL.md:250-258`)**
4. If the VM hosts an app that this repo is allowed to provision, run its `make vm-provision-<name>` playbook through `proxmox_qm_remote`; there is no VM-side SSH requirement. **(D; `Makefile:68-78`; `_shared/ansible/inventory.yml:22-36`; `.claude/skills/vm-baseline/SKILL.md:218-248`)**
5. If it is only a Komodo app host, install the standalone Periphery rather than putting the app’s Stack in this repo. **(D; `.claude/skills/vm-baseline/SKILL.md:218-248`; `komodo/README.md:9-16`)**

The survey did not execute any of these OpenTofu or provisioning commands. **(U; current user request, “Do not run tofu apply/plan” and “Read-only”)**

## How a managed CT is declared and applied

### Current CT callers

The active CT declarations are both in `network/main.tf`:

- `module "step_ca"` uses `_shared/modules/community-ct`, VMID 313, a hostname/IP/MAC from `network/identities.yaml`, Debian template from `infra`, static IP, and `network/cts/313.yaml`. **(D; `network/main.tf:20-44`, `network/identities.yaml:1-7`)**
- `module "dns"` uses `_shared/modules/community-ct`, VMID 312, a hostname/IP from `network/identities.yaml`, static IP `dns`, bootstrap DNS `192.168.1.1`, and `network/cts/312.yaml`. **(D; `network/main.tf:46-74`, `network/identities.yaml:8-12`)**

### CT module inputs and YAML

`community-ct` takes typed inputs for `vm_id`, `app_name`, `hostname`, template and OS type, CPU/memory/disk/storage, bridge/MAC, IP/gateway/DNS/domain, privilege/features/tags, credentials, SSH keys, mount points, and `ct_yaml`. Defaults include node `pve`, storage `zpool-single-1t-ssd`, bridge `vmbr0`, and `ip_address = "dhcp"`; `unprivileged`, `nesting`, and `keyctl` default true. **(D; `_shared/modules/community-ct/variables.tf:1-133`)**

The module decodes `cts/<VMID>.yaml`, converts YAML `mounts` into VMID-keyed bind paths under `/zpool-single-1t-ssd/bindmounts/<VMID>/`, and reads optional power state fields. **(D; `_shared/modules/community-ct/main.tf:9-21`)** The CT YAMLs currently declare bind mounts and empty raw-LXC config for DNS 312 and Step-CA 313. **(D; `network/cts/312.yaml:1-18`; `network/cts/313.yaml:1-12`)**

The CT resource’s hostname, IP configuration, DNS servers, and VMID are ordinary module inputs; the actual CT resource is `proxmox_virtual_environment_container.this`. **(D; `_shared/modules/community-ct/main.tf:36-105`)**

### CT apply/provisioning transport

- OpenTofu creates the CT in the `network` workspace. **(D; `dns/docs/architecture.md:50-60`)**
- `make pve-host` handles PVE-side CT bind/raw configuration; `make ct-bootstrap-<name>` bootstraps the CT; `make ct-provision-<name>` runs the service submodule playbook; `make ct-deploy-<name>` composes bootstrap plus provision. **(D; `Makefile:38-64`; `.claude/skills/ct-baseline/SKILL.md:65-95`)**
- CT Ansible transport is `community.proxmox.proxmox_pct_remote`: SSH to the PVE host, then `pct exec`; a CT-side SSH daemon is not part of the deployment path. **(D; `_shared/ansible/inventory.yml:9-21`; `.claude/skills/ct-baseline/SKILL.md:65-73`)**
- The `cts` inventory entries map host aliases to VMIDs and YAML paths; `dns` and `step-ca` use the PVE management IP as `ansible_host`. **(D; `_shared/ansible/inventory.yml:9-21`)**

## Existing Slurm and Komodo resources

### Slurm

A repository-wide case-insensitive search for `Slurm`, `slurm`, `SLURM`, `sbatch`, `slurmd`, and `slurmctld` returned no matches. **(R; `grep pattern=Slurm|slurm|SLURM|sbatch|slurmd|slurmctld path=/Users/mouriya/Ext/code/homelab-tf case=false gitignore=false`)** No Slurm Terraform resource/module, Ansible role/playbook, inventory group, Make target, or documented deployment was observed in this checkout. **(A; derived from the no-match search and the enumerated workspace/shared-Ansible layout; this does not assert that no Slurm exists elsewhere in the homelab.)**

### Komodo installation owned by homelab-tf

- The `komodo/` submodule owns installation/control-plane mechanics, not app content. Its roles cover the primary Core, standalone Periphery, and the shared private-registry account plus refresh Action. **(D; `komodo/README.md:1-16`, `komodo/CLAUDE.md:5-13`)**
- The primary Komodo Core runs on `moat-app1` / VM 110. `komodo-core.yml` targets `moat-app1`, loads the parent SOPS secrets, runs `komodo-core`, and runs `komodo-registry-account`. **(D; `komodo/komodo-core.yml:19-52`)**
- The standalone Periphery playbook targets the inventory group `komodo_periphery_hosts`; it installs the daemon only. Server registration is performed by the Core role from `komodo_servers`. **(D; `komodo/komodo-periphery.yml:1-28`; `komodo/roles/komodo-periphery/defaults/main.yml:1-14`)**
- Current inventory places `browser` and `soroi` in `komodo_periphery_hosts`, while `moat-app1` and `trading-agent` are in `komodo_core_hosts`; OMV is an explicitly SSH-managed Periphery host outside the managed VM baseline. **(D; `_shared/ansible/inventory.yml:22-46`)**
- The primary Core’s declared inbound Server records include `browser`, `soroi`, and `omv`, each on `https://<hostname>.mouriya.lan:8120`. **(D; `komodo/roles/komodo-core/defaults/main.yml:85-104`)**
- VM 130 (`trading-agent`) has an independent Komodo Core. Its dedicated playbook targets `trading-agent`, rewrites the per-Core secret names, and runs `komodo-core`; host vars declare `komodo_servers: []` because trading workloads use the in-Core `trading-local` Periphery. **(D; `komodo/komodo-core-trading.yml:1-52`; `_shared/ansible/host_vars/trading-agent.yml:1-42`)**
- The parent Makefile owns only installation targets: `make komodo`, `make komodo-core`, `make komodo-core-trading`, and `make komodo-periphery`. It explicitly says workload Stacks, ResourceSyncs, and Procedures belong to workload repositories. **(D; `Makefile:94-138`)**
- The authority split is explicit: homelab-tf owns Core/Periphery installation, inbound Server records, registry account/refresh Action, and the webhook ingress; workload repositories own `komodo/syncs/`, `stacks/`, Variables, ResourceSync objects, Procedures, workload secrets, and app bind directories. **(D; `.claude/rules/state-authority-map.md:18-32`; `komodo/README.md:9-16`, `komodo/README.md:129-138`)**
- **(A)** A test VM intended as a Komodo execution host would therefore need VM lifecycle plus Periphery/Server integration in homelab-tf, while the test app’s Stack/compose/Variables/Procedures must remain in its owning workload repository. Adding a Stack to `homelab-tf/komodo` would contradict the current authority boundary. **(A; derived from the cited authority table and Komodo playbooks.)**

## AGENTS.md and related rules

- The repository-root `AGENTS.md` is the applicable project entrypoint. It requires OpenTofu rather than Terraform, identifies the workspace/shared-module/Ansible/submodule layout, requires CT deployment through `proxmox_pct_remote`, and points to `.claude/rules/` plus the CT/VM/architecture baseline skills. **(D; `AGENTS.md:1-20`)**
- The root prerequisites section says SOPS-encrypted `_shared/ansible/secrets.yml` is decrypted by Ansible and by the VM user-data renderer; it describes the age-key prerequisite without placing secret values in workspace HCL. **(D; `AGENTS.md:22-30`)**
- A scoped `AGENTS.md` search found the root `AGENTS.md` and `sriov/AGENTS.md`. **(R; `glob /Users/mouriya/Ext/code/homelab-tf/**/AGENTS.md`)** No ancestor `AGENTS.md` or `CLAUDE.md` was found at the checked parent paths `/Users/mouriya/Ext/code/AGENTS.md`, `/Users/mouriya/Ext/AGENTS.md`, and `/Users/mouriya/AGENTS.md`. **(R; scoped ancestor `glob` lookup)**
- `sriov/AGENTS.md` contains Bun-first JavaScript/TypeScript tooling and says to use `bun test` for that submodule. It is relevant only if the separate `sriov/` submodule is edited; adding an ordinary VM through the parent VM module does not require editing it. **(D; `sriov/AGENTS.md:1-24`; A about scope derived from the path and VM module caller.)**
- The parent rules add the operational constraints relevant to a new VM: stable hostname, DHCP by default, ZFS-only storage, VMID uniqueness across all workspace YAML plus live PVE, SR-IOV mapping validation, and no SSH-based deployment to the guest. **(D; `.claude/skills/arch-baseline/SKILL.md:15-20`, `.claude/skills/arch-baseline/SKILL.md:49-58`; `.claude/skills/vm-baseline/SKILL.md:25-35`, `.claude/skills/vm-baseline/SKILL.md:250-258`)**
- The Komodo submodule’s `CLAUDE.md` additionally forbids adding app Stacks/compose/Variables/ResourceSyncs/Procedures there and requires use of the parent installation boundary. **(D; `komodo/CLAUDE.md:1-23`)**

## Adding a small test VM: evidence-based procedure

This is a procedure for a future change, not an action performed by this survey. **(A; current survey scope and the user’s read-only/no-apply instructions)**

### 1. Choose ownership and the apply boundary first

1. Decide whether the VM is a normal managed cloud-init VM, a Komodo Periphery host, or a VM requiring a separate app-provisioning role. The existing baseline is for normal managed cloud-init VMs; the repository has no existing Slurm role or test-VM workspace. **(D; `.claude/skills/vm-baseline/SKILL.md:7-17`; `(R)` no-match Slurm search above)**
2. Prefer an existing workspace when its lifecycle/blast radius matches the VM. The repository rule explicitly says to reuse an existing workspace for a new resource unless a separate plan/apply boundary is genuinely needed; a new workspace must also be added to `Makefile:DOMAINS`. **(D; `.claude/rules/dev-conventions.md:276-280`)**
3. If isolation is required for a disposable test VM, create a new normal workspace shape (`providers.tf`, `data.tf`, `main.tf`, `variables.tf`, ignored `terraform.tfvars`, and `vms/<VMID>.yaml`) and add its domain to the Makefile. This is an `(A)` recommendation based on the documented workspace boundary, not an observed existing test workspace. **(A; `.claude/rules/dev-conventions.md:126-149`, `.claude/rules/dev-conventions.md:276-280`)**

### 2. Select a VMID and host identity without guessing live state

1. Enumerate every current `vms/*.yaml` and `cts/*.yaml` plus all module callers; current active declarations use VMIDs 104, 107, 110, 130 for VMs and 312, 313 for CTs. **(D; `browser/main.tf:21-29`, `paas/main.tf:17-24`, `apps/main.tf:18-26`, `trading/main.tf:9-16`, `network/main.tf:20-74`)**
2. Before creation, also query the live PVE authority (`qm list` and `pct list`) as required by the VM baseline. The repo-only survey cannot certify a VMID as available because retained/manual guests exist outside active declarations. **(D; `.claude/skills/vm-baseline/SKILL.md:250-253`; `.claude/rules/topology.md:8-12`)**
3. Pick a stable, never-renamed hostname that matches the inventory alias and intended DNS identity. Do not assign a static `.1-.199` address to an ordinary test VM; the current convention is DHCP in `.200-.251`. **(D; `.claude/skills/arch-baseline/SKILL.md:15-20`; `dns/roles/kea/defaults/main.yml:10-21`; `_shared/ansible/inventory.yml:22-36`)**

### 3. Add the minimum VM declaration

1. Add a module block to the selected workspace’s `main.tf` following the current shape:

   ```hcl
   module "<logical_name>" {
     source = "../_shared/modules/vm"

     vm_id           = <unused_vmid>
     cloud_image_ids = data.terraform_remote_state.infra.outputs.cloud_image_ids
     vm_yaml         = "${path.module}/vms/<unused_vmid>.yaml"

     ssh_public_key = var.ssh_public_key
   }
   ```

   This is the current caller contract. **(D; `.claude/skills/vm-baseline/SKILL.md:177-216`; `apps/main.tf:18-26`)**
2. Add `vms/<VMID>.yaml` with the required fields. For a CPU-only test, `debian13` is the least-specialized currently supported profile; omit GPU, data disks, and extra hooks unless the test needs them. This is a recommendation, not a claim about a minimum resource size. **(D; `.claude/skills/vm-baseline/SKILL.md:121-175`; `_shared/modules/vm/main.tf:24-48`; (A) profile recommendation derived from the supported profile set.)**
3. The required YAML shape is:

   ```yaml
   # <workspace>/vms/<VMID>.yaml
   # Stable purpose and issue reference belong in the leading comments.
   hostname: <stable-hostname>
   os_profile: debian13
   cpu_cores: <operator-chosen-size>
   memory: <operator-chosen-size>
   root_disk_size: <operator-chosen-size>
   nic_mapping: <available-VFNN>
   ```

   `cpu_cores`, `memory`, and `root_disk_size` must be chosen by the test owner; this survey does not invent a resource minimum. Current active examples range from 2,048 MiB/40 GiB (`trading-agent`) to 8,192 MiB/64 GiB (`soroi`), but those are workload sizing decisions, not a generic baseline. **(D; `trading/vms/130.yaml:7-18`, `paas/vms/107.yaml:8-15`; A about not treating examples as a minimum.)**
4. Select an actually free PVE resource mapping for `nic_mapping`; the module validates it via `_shared/modules/sriov/` and rejects a missing/wrong/occupied mapping. Do not use a raw `host=0000:...` PCI reference. **(D; `_shared/modules/vm/main.tf:131-148`, `_shared/modules/sriov/variables.tf:1-35`, `.claude/skills/vm-baseline/SKILL.md:25-29`)**
5. Leave storage inputs at the module ZFS defaults unless the workspace has a documented reason to override them. Every root/EFI/TPM/data disk must remain on a PVE `zfspool`. **(D; `_shared/modules/vm/variables.tf:22-48`, `_shared/modules/vm/main.tf:109-129`, `_shared/modules/vm/main.tf:316-321`)**

### 4. Add the deployment identity

1. Add the new hostname and `proxmox_vmid` under `_shared/ansible/inventory.yml:pve_vms`, retaining the existing group vars (`proxmox_qm_remote`, `ansible_host: 192.168.1.67`, root user, Python 3). **(D; `_shared/ansible/inventory.yml:22-36`; `.claude/skills/vm-baseline/SKILL.md:225-239`)**
2. If the VM is a Komodo Periphery host, also add it to `komodo_periphery_hosts` and add the matching inbound Server record to the primary Core’s `komodo_servers` defaults, unless the deliberate design is a same-host/in-Core Periphery like trading. The role installs the daemon; Core owns the Server record. **(D; `_shared/ansible/inventory.yml:37-46`; `komodo/roles/komodo-core/defaults/main.yml:85-104`; `komodo/roles/komodo-periphery/defaults/main.yml:1-14`)**
3. Do not add a static `network/identities.yaml` record for a normal DHCP VM. Add `coredns_aliases` to the VM YAML only when stable LAN aliases are part of the test’s declared contract. **(D; `network/identities.yaml:1-27`; `_shared/scripts/render-dns-identity.py:121-170`; `apps/vms/110.yaml:26-29`)**

### 5. Future apply/provisioning sequence

The following is the documented future sequence and was **not executed** in this survey. **(D; `Makefile:5-21`, `Makefile:66-78`; U; current user request, “Do not run tofu apply/plan”)**

```text
# from the chosen workspace, after the required R2/PVE/SSH environment is loaded
make init-<workspace>
make plan-<workspace>       # required by normal change process; not run here
make apply-<workspace>      # or: cd <workspace> && tofu apply; not run here

# only if this VM has an owning Ansible application playbook
make vm-provision-<playbook-name>

# for a Komodo Periphery host
make komodo-periphery
make komodo-core
```

The Makefile’s pattern rules show the exact `init`, `plan`, and `apply` expansion, and `vm-provision-%` runs `_shared/ansible/<name>.yml` through the custom VM connection. **(D; `Makefile:5-21`, `Makefile:66-78`)** Cloud-init is the VM bootstrap; there is deliberately no `vm-bootstrap-*` target. **(D; `.claude/skills/vm-baseline/SKILL.md:241-248`)**

### 6. Keep Slurm and Komodo scope separate

- A test VM can be the infrastructure substrate for a future Slurm experiment, but this checkout has no Slurm declaration or role from which to derive a Slurm installation procedure. Designing scheduler/controller/compute-node configuration is outside this survey. **(R; no-match Slurm search above; A scope boundary.)**
- For a Komodo test workload, homelab-tf can create and provision the VM and install/register Periphery; the workload repository must own the Stack compose, ResourceSync, Variables, Procedures, hooks, and workload secrets. **(D; `.claude/rules/state-authority-map.md:18-32`, `komodo/README.md:129-138`; A application to the test VM.)**

## Bottom line

- The smallest supported **shape** is the shared cloud-init VM module plus one per-VM YAML, not a hand-written `proxmox_virtual_environment_vm` resource: the required YAML fields are hostname, OS profile, CPU, memory, root disk size, and NIC mapping; the module supplies the baseline hardware, ZFS checks, cloud-init, and DHCP network configuration. **(D; `_shared/modules/vm/main.tf:13-48`, `_shared/modules/vm/main.tf:209-304`, `.claude/skills/vm-baseline/SKILL.md:121-175`)**
- A normal test VM should use a new, live-confirmed VMID, a stable hostname, DHCP, and a validated SR-IOV NIC mapping; the repo alone cannot certify a concrete unused VMID. **(A; `.claude/skills/vm-baseline/SKILL.md:250-253`, `.claude/skills/arch-baseline/SKILL.md:15-20`, `_shared/modules/sriov/variables.tf:1-35`)**
- Komodo integration is available and already used by VMs 104, 107, 110, and 130, but app Stacks remain workload-repo resources. **(D; `_shared/ansible/inventory.yml:22-46`, `komodo/roles/komodo-core/defaults/main.yml:85-104`, `.claude/rules/state-authority-map.md:24-26`)**
- Slurm is not an existing homelab-tf resource based on the repository-wide no-match search; adding Slurm would be a separate design/implementation task rather than an extension of an existing declaration. **(R; no-match Slurm search above; A scope conclusion.)**
