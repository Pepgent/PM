# D46 选票：ArgonGovernance

议程：LAB-13 剩余入口的契约补全：成员族 activity 写点、images 检出与 ImageDefinition 来源、成员在线与最后活跃、agent 模板布局与 YAML 依赖（解 Pepgent#80 BLOCKED F1–F4）（[Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D46-02 v1：赞成（ArgonGovernance-2，2026-11-01T22:20:55.228Z）



# D46（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）及 [`evidence/gates/pepgent80-blocked-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent80-blocked-gate-b.md)。

## 逐行组织治理与路径边界审查结论（仅审组织、席位路径白名单、阶段门禁与投票/送达程序，不审产品或契约语义）

### 1. `D46-02 v1`：`approve`（领域：`governance`）

- **席位路径白名单与跨仓派工边界（`D16-09`、`C1-2`、`C4-1`、`C4-2`）：** `W-04` 的改动路径限定在 `Pepgent/deploy` 仓内，`W-09` 的改动路径限定在 `apps/web/src/server/lab/**` 内，各自严格处于 `D16-09` 与 `D42-01 v1` 互斥路径白名单内，无跨仓混派。通过后在 `Pepgent/deploy` 新建承载 issue 派给 `W-04` 并由 `AreaMgrDeploy` 单向送达、由 `AreaMgrPepgent` 在 `#80` 登记并单向送达 `W-09`，程序合规。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认 `W-04` 与 `W-09` 的跨席位派工归属、路径白名单、`P0` 定级与送达程序合规；行内涉及的产品意图与配置/契约语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 2. `D46-03 v1`：`approve`（领域：`governance`）

- **跨仓派工分配、已退役席位重启与并发上限边界（`D16-09`、`D16-10`、`C1-2`、`C3-4`、`C4-1`、`C4-2`）：** `W-03` 的交付路径限定在 `Pepgent/images` 仓内，`W-09` 的读取路径限定在 `apps/web/src/server/lab/**` 内，符合 `C1-2` 与 `D16-09` 互斥路径白名单。鉴于 `W-03` 已报 `ALL_DONE` 退役且当前活跃工程席位为 3 席（`W-09`、`W-10`、`W-08`），在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立进程后活跃席位为 4 席，符合 `D16-10` 同时活跃上限 4，并由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别单向送达并确认收到（`AGENTS.md:126`）。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认跨仓派工归属、`W-03` 重启程序、并发上限与路径白名单合规；行内涉及的产品意图与清单/契约字段语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 3. `D46-06 v1`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json` 与根 `package-lock.json` 原本已在 `D16-09` 的 `W-09` 席位路径白名单之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`#80`）的切片级收窄，不改 `D16-09`、不侵占 `W-10` 路径域、不另设跨席位等待锁（`U83`），组织与路径白名单边界合规。


## D46-03 v1：赞成（ArgonGovernance-2，2026-11-01T22:20:55.228Z）——作废：该行已修订到 v2



# D46（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）及 [`evidence/gates/pepgent80-blocked-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent80-blocked-gate-b.md)。

## 逐行组织治理与路径边界审查结论（仅审组织、席位路径白名单、阶段门禁与投票/送达程序，不审产品或契约语义）

### 1. `D46-02 v1`：`approve`（领域：`governance`）

- **席位路径白名单与跨仓派工边界（`D16-09`、`C1-2`、`C4-1`、`C4-2`）：** `W-04` 的改动路径限定在 `Pepgent/deploy` 仓内，`W-09` 的改动路径限定在 `apps/web/src/server/lab/**` 内，各自严格处于 `D16-09` 与 `D42-01 v1` 互斥路径白名单内，无跨仓混派。通过后在 `Pepgent/deploy` 新建承载 issue 派给 `W-04` 并由 `AreaMgrDeploy` 单向送达、由 `AreaMgrPepgent` 在 `#80` 登记并单向送达 `W-09`，程序合规。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认 `W-04` 与 `W-09` 的跨席位派工归属、路径白名单、`P0` 定级与送达程序合规；行内涉及的产品意图与配置/契约语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 2. `D46-03 v1`：`approve`（领域：`governance`）

- **跨仓派工分配、已退役席位重启与并发上限边界（`D16-09`、`D16-10`、`C1-2`、`C3-4`、`C4-1`、`C4-2`）：** `W-03` 的交付路径限定在 `Pepgent/images` 仓内，`W-09` 的读取路径限定在 `apps/web/src/server/lab/**` 内，符合 `C1-2` 与 `D16-09` 互斥路径白名单。鉴于 `W-03` 已报 `ALL_DONE` 退役且当前活跃工程席位为 3 席（`W-09`、`W-10`、`W-08`），在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立进程后活跃席位为 4 席，符合 `D16-10` 同时活跃上限 4，并由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别单向送达并确认收到（`AGENTS.md:126`）。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认跨仓派工归属、`W-03` 重启程序、并发上限与路径白名单合规；行内涉及的产品意图与清单/契约字段语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 3. `D46-06 v1`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json` 与根 `package-lock.json` 原本已在 `D16-09` 的 `W-09` 席位路径白名单之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`#80`）的切片级收窄，不改 `D16-09`、不侵占 `W-10` 路径域、不另设跨席位等待锁（`U83`），组织与路径白名单边界合规。


## D46-06 v1：赞成（ArgonGovernance-2，2026-11-01T22:20:55.229Z）——作废：该行已修订到 v2



# D46（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）及 [`evidence/gates/pepgent80-blocked-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent80-blocked-gate-b.md)。

## 逐行组织治理与路径边界审查结论（仅审组织、席位路径白名单、阶段门禁与投票/送达程序，不审产品或契约语义）

### 1. `D46-02 v1`：`approve`（领域：`governance`）

- **席位路径白名单与跨仓派工边界（`D16-09`、`C1-2`、`C4-1`、`C4-2`）：** `W-04` 的改动路径限定在 `Pepgent/deploy` 仓内，`W-09` 的改动路径限定在 `apps/web/src/server/lab/**` 内，各自严格处于 `D16-09` 与 `D42-01 v1` 互斥路径白名单内，无跨仓混派。通过后在 `Pepgent/deploy` 新建承载 issue 派给 `W-04` 并由 `AreaMgrDeploy` 单向送达、由 `AreaMgrPepgent` 在 `#80` 登记并单向送达 `W-09`，程序合规。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认 `W-04` 与 `W-09` 的跨席位派工归属、路径白名单、`P0` 定级与送达程序合规；行内涉及的产品意图与配置/契约语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 2. `D46-03 v1`：`approve`（领域：`governance`）

- **跨仓派工分配、已退役席位重启与并发上限边界（`D16-09`、`D16-10`、`C1-2`、`C3-4`、`C4-1`、`C4-2`）：** `W-03` 的交付路径限定在 `Pepgent/images` 仓内，`W-09` 的读取路径限定在 `apps/web/src/server/lab/**` 内，符合 `C1-2` 与 `D16-09` 互斥路径白名单。鉴于 `W-03` 已报 `ALL_DONE` 退役且当前活跃工程席位为 3 席（`W-09`、`W-10`、`W-08`），在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立进程后活跃席位为 4 席，符合 `D16-10` 同时活跃上限 4，并由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别单向送达并确认收到（`AGENTS.md:126`）。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认跨仓派工归属、`W-03` 重启程序、并发上限与路径白名单合规；行内涉及的产品意图与清单/契约字段语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 3. `D46-06 v1`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json` 与根 `package-lock.json` 原本已在 `D16-09` 的 `W-09` 席位路径白名单之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`#80`）的切片级收窄，不改 `D16-09`、不侵占 `W-10` 路径域、不另设跨席位等待锁（`U83`），组织与路径白名单边界合规。


## D46-02 v1：赞成（ArgonGovernance-2，2026-11-01T22:23:26.179Z）



# D46（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由（依据 `tern ls` 实时源头核正）

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–149 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）及 [`evidence/gates/pepgent80-blocked-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent80-blocked-gate-b.md)，并执行 `tern ls` 核实当前实时工程会话源头：`pepgent-lab`（`W-09`，`663117180698627`）、`pepgent-web`（`W-10`，`670581833859075`）、`pepgent-deploy`（`W-04`，`676946975391747`）共 3 席在跑，`W-03`（`pepgent-images`）与 `W-08`（`pepgent-e2e`）均已退役不在 `tern ls` 中。

## 逐行组织治理与路径边界审查结论（仅审组织、席位路径白名单、阶段门禁与投票/送达程序，不审产品或契约语义）

### 1. `D46-02 v1`：`approve`（领域：`governance`）

- **席位路径白名单与跨仓派工边界（`D16-09`、`C1-2`、`C4-1`、`C4-2`）：** `W-04`（当前在 `tern ls` 中已在跑：`pepgent-deploy` `676946975391747`）的改动路径限定在 `Pepgent/deploy` 仓内，`W-09`（`pepgent-lab` `663117180698627`）的改动路径限定在 `apps/web/src/server/lab/**` 内，各自严格处于 `D16-09` 与 `D42-01 v1` 互斥路径白名单内，无跨仓混派。通过后在 `Pepgent/deploy` 新建承载 issue 派给在岗 `W-04` 并由 `AreaMgrDeploy` 单向送达、由 `AreaMgrPepgent` 在 `#80` 登记并单向送达 `W-09`，程序合规。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认 `W-04` 与 `W-09` 的跨席位派工归属、路径白名单、`P0` 定级与送达程序合规；行内涉及的产品意图与配置/契约语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 2. `D46-03 v1`：`approve`（领域：`governance`）

- **跨仓派工分配、已退役席位 `W-03` 重启与并发上限边界（`D16-09`、`D16-10`、`C1-2`、`C3-4`、`C4-1`、`C4-2`）：** `W-03` 的交付路径限定在 `Pepgent/images` 仓内，`W-09` 的读取路径限定在 `apps/web/src/server/lab/**` 内，符合 `C1-2` 与 `D16-09` 互斥路径白名单。经 `tern ls` 实时源头核实，当前在跑工程席位仅 3 席（`pepgent-lab` `W-09`、`pepgent-web` `W-10`、`pepgent-deploy` `W-04`），`W-03`（`pepgent-images`）已退役不在 `tern ls` 中；因此通过后在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立进程，同时活跃席位为 4 席（`W-09`、`W-10`、`W-04`、`W-03`），严格符合 `D16-10` 同时活跃上限 4，并由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别单向送达并确认收到（`AGENTS.md:126`）。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认跨仓派工归属、`W-03` 重启程序、并发上限与路径白名单合规；行内涉及的产品意图与清单/契约字段语义（含 `LeadMentor` 针对基础镜像字段提出的契约反例）由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 3. `D46-06 v1`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json` 与根 `package-lock.json` 原本已在 `D16-09` 的 `W-09` 席位路径白名单之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`#80`）的切片级收窄，不改 `D16-09`、不侵占 `W-10` 路径域、不另设跨席位等待锁（`U83`），组织与路径白名单边界合规。


## D46-03 v1：赞成（ArgonGovernance-2，2026-11-01T22:23:26.179Z）——作废：该行已修订到 v2



# D46（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由（依据 `tern ls` 实时源头核正）

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–149 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）及 [`evidence/gates/pepgent80-blocked-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent80-blocked-gate-b.md)，并执行 `tern ls` 核实当前实时工程会话源头：`pepgent-lab`（`W-09`，`663117180698627`）、`pepgent-web`（`W-10`，`670581833859075`）、`pepgent-deploy`（`W-04`，`676946975391747`）共 3 席在跑，`W-03`（`pepgent-images`）与 `W-08`（`pepgent-e2e`）均已退役不在 `tern ls` 中。

## 逐行组织治理与路径边界审查结论（仅审组织、席位路径白名单、阶段门禁与投票/送达程序，不审产品或契约语义）

### 1. `D46-02 v1`：`approve`（领域：`governance`）

- **席位路径白名单与跨仓派工边界（`D16-09`、`C1-2`、`C4-1`、`C4-2`）：** `W-04`（当前在 `tern ls` 中已在跑：`pepgent-deploy` `676946975391747`）的改动路径限定在 `Pepgent/deploy` 仓内，`W-09`（`pepgent-lab` `663117180698627`）的改动路径限定在 `apps/web/src/server/lab/**` 内，各自严格处于 `D16-09` 与 `D42-01 v1` 互斥路径白名单内，无跨仓混派。通过后在 `Pepgent/deploy` 新建承载 issue 派给在岗 `W-04` 并由 `AreaMgrDeploy` 单向送达、由 `AreaMgrPepgent` 在 `#80` 登记并单向送达 `W-09`，程序合规。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认 `W-04` 与 `W-09` 的跨席位派工归属、路径白名单、`P0` 定级与送达程序合规；行内涉及的产品意图与配置/契约语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 2. `D46-03 v1`：`approve`（领域：`governance`）

- **跨仓派工分配、已退役席位 `W-03` 重启与并发上限边界（`D16-09`、`D16-10`、`C1-2`、`C3-4`、`C4-1`、`C4-2`）：** `W-03` 的交付路径限定在 `Pepgent/images` 仓内，`W-09` 的读取路径限定在 `apps/web/src/server/lab/**` 内，符合 `C1-2` 与 `D16-09` 互斥路径白名单。经 `tern ls` 实时源头核实，当前在跑工程席位仅 3 席（`pepgent-lab` `W-09`、`pepgent-web` `W-10`、`pepgent-deploy` `W-04`），`W-03`（`pepgent-images`）已退役不在 `tern ls` 中；因此通过后在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立进程，同时活跃席位为 4 席（`W-09`、`W-10`、`W-04`、`W-03`），严格符合 `D16-10` 同时活跃上限 4，并由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别单向送达并确认收到（`AGENTS.md:126`）。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认跨仓派工归属、`W-03` 重启程序、并发上限与路径白名单合规；行内涉及的产品意图与清单/契约字段语义（含 `LeadMentor` 针对基础镜像字段提出的契约反例）由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 3. `D46-06 v1`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json` 与根 `package-lock.json` 原本已在 `D16-09` 的 `W-09` 席位路径白名单之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`#80`）的切片级收窄，不改 `D16-09`、不侵占 `W-10` 路径域、不另设跨席位等待锁（`U83`），组织与路径白名单边界合规。


## D46-06 v1：赞成（ArgonGovernance-2，2026-11-01T22:23:26.185Z）——作废：该行已修订到 v2



# D46（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由（依据 `tern ls` 实时源头核正）

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–149 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）及 [`evidence/gates/pepgent80-blocked-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent80-blocked-gate-b.md)，并执行 `tern ls` 核实当前实时工程会话源头：`pepgent-lab`（`W-09`，`663117180698627`）、`pepgent-web`（`W-10`，`670581833859075`）、`pepgent-deploy`（`W-04`，`676946975391747`）共 3 席在跑，`W-03`（`pepgent-images`）与 `W-08`（`pepgent-e2e`）均已退役不在 `tern ls` 中。

## 逐行组织治理与路径边界审查结论（仅审组织、席位路径白名单、阶段门禁与投票/送达程序，不审产品或契约语义）

### 1. `D46-02 v1`：`approve`（领域：`governance`）

- **席位路径白名单与跨仓派工边界（`D16-09`、`C1-2`、`C4-1`、`C4-2`）：** `W-04`（当前在 `tern ls` 中已在跑：`pepgent-deploy` `676946975391747`）的改动路径限定在 `Pepgent/deploy` 仓内，`W-09`（`pepgent-lab` `663117180698627`）的改动路径限定在 `apps/web/src/server/lab/**` 内，各自严格处于 `D16-09` 与 `D42-01 v1` 互斥路径白名单内，无跨仓混派。通过后在 `Pepgent/deploy` 新建承载 issue 派给在岗 `W-04` 并由 `AreaMgrDeploy` 单向送达、由 `AreaMgrPepgent` 在 `#80` 登记并单向送达 `W-09`，程序合规。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认 `W-04` 与 `W-09` 的跨席位派工归属、路径白名单、`P0` 定级与送达程序合规；行内涉及的产品意图与配置/契约语义由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 2. `D46-03 v1`：`approve`（领域：`governance`）

- **跨仓派工分配、已退役席位 `W-03` 重启与并发上限边界（`D16-09`、`D16-10`、`C1-2`、`C3-4`、`C4-1`、`C4-2`）：** `W-03` 的交付路径限定在 `Pepgent/images` 仓内，`W-09` 的读取路径限定在 `apps/web/src/server/lab/**` 内，符合 `C1-2` 与 `D16-09` 互斥路径白名单。经 `tern ls` 实时源头核实，当前在跑工程席位仅 3 席（`pepgent-lab` `W-09`、`pepgent-web` `W-10`、`pepgent-deploy` `W-04`），`W-03`（`pepgent-images`）已退役不在 `tern ls` 中；因此通过后在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立进程，同时活跃席位为 4 席（`W-09`、`W-10`、`W-04`、`W-03`），严格符合 `D16-10` 同时活跃上限 4，并由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别单向送达并确认收到（`AGENTS.md:126`）。
- **边界声明（`.omp/agents/argon-governance.md:6,13,44`）：** 本票仅确认跨仓派工归属、`W-03` 重启程序、并发上限与路径白名单合规；行内涉及的产品意图与清单/契约字段语义（含 `LeadMentor` 针对基础镜像字段提出的契约反例）由 `Argon` 及契约席位裁决，不在本席审查范围内。

### 3. `D46-06 v1`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json` 与根 `package-lock.json` 原本已在 `D16-09` 的 `W-09` 席位路径白名单之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`#80`）的切片级收窄，不改 `D16-09`、不侵占 `W-10` 路径域、不另设跨席位等待锁（`U83`），组织与路径白名单边界合规。


## D46-03 v2：赞成（ArgonGovernance-2，2026-11-01T22:30:40.375Z）



# D46-03 v2、D46-06 v2（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）重投选票

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **表决范围声明（`.omp/agents/argon-governance.md:6,11,13,22,44`、`AGENTS.md` `C2-2.2`）：** 本席严格限于组织制度、席位互斥路径白名单、跨席位派工归属、`D16-10` 并发上限与片区经理单向送达程序行使治理席表决权；不对任何产品意图、组件实现或契约字段语义作审查或背书（产品与契约语义由 `Argon` 及契约席位裁定）。
- **核对基准：** 已在当前窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–149 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01 v1`），并经 `tern ls` 实时源头核实当前在跑工程会话为 `pepgent-lab`（`W-09`）、`pepgent-web`（`W-10`）、`pepgent-deploy`（`W-04`）共 3 席，`W-03`（`pepgent-images`）与 `W-08`（`pepgent-e2e`）均已退役。

## 逐行组织、路径白名单与程序结论

### 1. `D46-03 v2`：`approve`（仅限组织治理与派工边界）

- **跨仓派工归属与互斥路径白名单（`D16-09`、`C1-2`）：** `W-03` 的交付路径严格限定在 `Pepgent/images` 仓内，`W-09` 的读取路径严格限定在 `apps/web/src/server/lab/**` 内，符合组件独立归属与席位互斥路径白名单。
- **已退役席位 `W-03` 重启与并发上限（`C3-4`、`D16-10`、`tern ls` 源头事实）：** 当前 `tern ls` 实时源头在跑仅 3 个工程席位（`W-09`、`W-10`、`W-04`），`W-03` 已退役不在 `tern ls` 中；在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立工程进程后，同时活跃席位为 4 席，严格符合 `D16-10` 上限 4。
- **送达程序（`C4-1`、`C4-2`、`AGENTS.md:126`）：** 由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别通过 `peer_send` 单向送达，并以 `peer_ask` 或工作空间实际观察确认收到为准。

### 2. `D46-06 v2`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json`、根 `package-lock.json` 与 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt` 三项路径原本均在 `D16-09` 第 33 行 `W-09` 席位路径白名单范围之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`Pepgent#80`）的切片级路径收窄，不超出 `D16-09` 的 `W-09` 席位边界，不侵占 `W-10` 路径域，不另设跨席位等待锁（`U83`），并由 `AreaMgrPepgent` 单向送达 `W-09`（`C4-1`、`C4-2`）。


## D46-06 v2：赞成（ArgonGovernance-2，2026-11-01T22:30:40.375Z）



# D46-03 v2、D46-06 v2（`Pepgent/PM#65`）组织治理与分配守护席（`ArgonGovernance-2`）重投选票

- **议程：** [Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)（`D46`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **表决范围声明（`.omp/agents/argon-governance.md:6,11,13,22,44`、`AGENTS.md` `C2-2.2`）：** 本席严格限于组织制度、席位互斥路径白名单、跨席位派工归属、`D16-10` 并发上限与片区经理单向送达程序行使治理席表决权；不对任何产品意图、组件实现或契约字段语义作审查或背书（产品与契约语义由 `Argon` 及契约席位裁定）。
- **核对基准：** 已在当前窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–149 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01 v1`），并经 `tern ls` 实时源头核实当前在跑工程会话为 `pepgent-lab`（`W-09`）、`pepgent-web`（`W-10`）、`pepgent-deploy`（`W-04`）共 3 席，`W-03`（`pepgent-images`）与 `W-08`（`pepgent-e2e`）均已退役。

## 逐行组织、路径白名单与程序结论

### 1. `D46-03 v2`：`approve`（仅限组织治理与派工边界）

- **跨仓派工归属与互斥路径白名单（`D16-09`、`C1-2`）：** `W-03` 的交付路径严格限定在 `Pepgent/images` 仓内，`W-09` 的读取路径严格限定在 `apps/web/src/server/lab/**` 内，符合组件独立归属与席位互斥路径白名单。
- **已退役席位 `W-03` 重启与并发上限（`C3-4`、`D16-10`、`tern ls` 源头事实）：** 当前 `tern ls` 实时源头在跑仅 3 个工程席位（`W-09`、`W-10`、`W-04`），`W-03` 已退役不在 `tern ls` 中；在 `Pepgent/images` 新建承载 issue 并按 `C3-4` 重新启动 `W-03` 独立工程进程后，同时活跃席位为 4 席，严格符合 `D16-10` 上限 4。
- **送达程序（`C4-1`、`C4-2`、`AGENTS.md:126`）：** 由 `AreaMgrImages` 与 `AreaMgrPepgent` 分别通过 `peer_send` 单向送达，并以 `peer_ask` 或工作空间实际观察确认收到为准。

### 2. `D46-06 v2`：`approve`（分类：治理；领域：`governance`）

- **切片路径白名单治理修订（`D16-09`、`D42-01 v1`、`U83`）：** `apps/web/package.json`、根 `package-lock.json` 与 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt` 三项路径原本均在 `D16-09` 第 33 行 `W-09` 席位路径白名单范围之内；本行仅放宽 `D42-01 v1` 对 `LAB-13`（`Pepgent#80`）的切片级路径收窄，不超出 `D16-09` 的 `W-09` 席位边界，不侵占 `W-10` 路径域，不另设跨席位等待锁（`U83`），并由 `AreaMgrPepgent` 单向送达 `W-09`（`C4-1`、`C4-2`）。

