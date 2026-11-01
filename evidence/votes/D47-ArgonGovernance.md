# D47 选票：ArgonGovernance

议程：deploy#26 BLOCKED 解阻：Pepgent/images 只读凭据改为零人工的只读 deploy key（Lab 双变量接口不变）（[Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D47-01 v1：赞成（ArgonGovernance-2，2026-11-01T23:19:18.500Z）——作废：该行已修订到 v2



# D47（`Pepgent/PM#66`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由

- **议程：** [Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)（`D47`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前上下文窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–150 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，依 G8 继续），直读 `issue://Pepgent/PM/66`、`issue://Pepgent/deploy/26`、`/Users/mouriya/Ext/worktrees/deploy-26/README.md`、`compose.yaml`、`scripts/central.py`，并通过实时 `tern ls` 源头核实当前在跑工程席位。

## 领域认领说明（`D47-02` $\to$ `governance`）

- `D47-02 v1` 向已退役的 `W-03`（`Pepgent/images`）新增跨仓派工与镜像发布任务，并构成 `W-04`（`Pepgent/deploy#26`）的前置依赖，涉及跨席位派工分配、退役席位重启与 `D16-10` 并发上限核查，依 `AGENTS.md` D1-12 由本席通过 `council claim` 认领 `governance` 领域并参投。

## 逐行表决与治理边界理由（严格限于组织、席位路径白名单、`D16-10` 并发上限与反设卡/送达程序）

### 1. `D47-01 v1`：`approve`（分类：串联；领域：`governance`）

- **解除人工阻塞与清理 `deploy#26` 错误路径（`U7`、`AGENTS.md:127`、`.omp/agents/argon-governance.md` §20）：** 替换 [Pepgent/deploy#26](https://github.com/Pepgent/deploy/issues/26) 正文中导致“等待人类操作员完成 GitHub sudo 认证”死锁的附加限制，消除违反 `(U)` `U7` 与 `AGENTS.md:127` 的人工阻塞前提；`P0` 定级符合 `D1-12`。
- **席位互斥路径白名单（`D16-09`、`C3-4`）：** 本行修改的 `stacks/pepgent-central/compose.yaml`、`komodo/syncs/central.toml`、`scripts/central.py`、`README.md` 及部署 owner 目录文件均严格落在 `W-04`（`Pepgent/deploy`）单一席位路径白名单内，不越界修改 `W-09`（`Pepgent/Pepgent`）路径。

### 2. `D47-02 v1`：`approve`（分类：串联；领域：`governance`）

- **席位互斥路径白名单与 `D16-10` 并发上限（`C3-4`、`C4-2`）：** 本行修改的 `Pepgent/images` `Dockerfile` 严格落在 `W-03`（`Pepgent/images`）席位路径白名单内。经实时 `tern ls` 源头核实，当前在跑独立工程席位仅 `pepgent-web`（`W-10`）与 `pepgent-deploy`（`W-04`）共 2 席（`W-09` 与 `W-03` 均已退役）；按 `C3-4` 重新启动 `W-03` 独立进程后同时活跃工程席位为 $2 + 1 = 3 \le 4$，严格符合 `D16-10` 同时活跃上限 4 与一仓一进程铁律。
- **派工与单向送达程序（`C4-1`、`C4-2`、`AGENTS.md:126`）：** 定案后由协调席在 `Pepgent/images` 与 `Pepgent/deploy#26` 更新承载说明，由对应片区经理（`AreaMgrImages`、`AreaMgrDeploy`）以 `peer_send` 单向送达并通过 `peer_ask` 或工作空间变化确认实际收到，不以评论写入代替送达完成。

### 3. 治理席职责边界声明（`.omp/agents/argon-governance.md:6,13,22,44`）

- 本席选票效力严格限定在组织治理、席位互斥路径白名单、`D16-10` 并发上限、`U7`/`AGENTS.md:127` 反人工阻塞及单向送达程序边界内；行内涉及的 SSH 别名配置、`openssh-client` 镜像层与 `D46-02` 契约语义完全由 `Argon` 及契约席位审定，本席不作技术或产品契约语义背书。


## D47-02 v1：赞成（ArgonGovernance-2，2026-11-01T23:19:18.500Z）



# D47（`Pepgent/PM#66`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由

- **议程：** [Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)（`D47`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前上下文窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–150 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，依 G8 继续），直读 `issue://Pepgent/PM/66`、`issue://Pepgent/deploy/26`、`/Users/mouriya/Ext/worktrees/deploy-26/README.md`、`compose.yaml`、`scripts/central.py`，并通过实时 `tern ls` 源头核实当前在跑工程席位。

## 领域认领说明（`D47-02` $\to$ `governance`）

- `D47-02 v1` 向已退役的 `W-03`（`Pepgent/images`）新增跨仓派工与镜像发布任务，并构成 `W-04`（`Pepgent/deploy#26`）的前置依赖，涉及跨席位派工分配、退役席位重启与 `D16-10` 并发上限核查，依 `AGENTS.md` D1-12 由本席通过 `council claim` 认领 `governance` 领域并参投。

## 逐行表决与治理边界理由（严格限于组织、席位路径白名单、`D16-10` 并发上限与反设卡/送达程序）

### 1. `D47-01 v1`：`approve`（分类：串联；领域：`governance`）

- **解除人工阻塞与清理 `deploy#26` 错误路径（`U7`、`AGENTS.md:127`、`.omp/agents/argon-governance.md` §20）：** 替换 [Pepgent/deploy#26](https://github.com/Pepgent/deploy/issues/26) 正文中导致“等待人类操作员完成 GitHub sudo 认证”死锁的附加限制，消除违反 `(U)` `U7` 与 `AGENTS.md:127` 的人工阻塞前提；`P0` 定级符合 `D1-12`。
- **席位互斥路径白名单（`D16-09`、`C3-4`）：** 本行修改的 `stacks/pepgent-central/compose.yaml`、`komodo/syncs/central.toml`、`scripts/central.py`、`README.md` 及部署 owner 目录文件均严格落在 `W-04`（`Pepgent/deploy`）单一席位路径白名单内，不越界修改 `W-09`（`Pepgent/Pepgent`）路径。

### 2. `D47-02 v1`：`approve`（分类：串联；领域：`governance`）

- **席位互斥路径白名单与 `D16-10` 并发上限（`C3-4`、`C4-2`）：** 本行修改的 `Pepgent/images` `Dockerfile` 严格落在 `W-03`（`Pepgent/images`）席位路径白名单内。经实时 `tern ls` 源头核实，当前在跑独立工程席位仅 `pepgent-web`（`W-10`）与 `pepgent-deploy`（`W-04`）共 2 席（`W-09` 与 `W-03` 均已退役）；按 `C3-4` 重新启动 `W-03` 独立进程后同时活跃工程席位为 $2 + 1 = 3 \le 4$，严格符合 `D16-10` 同时活跃上限 4 与一仓一进程铁律。
- **派工与单向送达程序（`C4-1`、`C4-2`、`AGENTS.md:126`）：** 定案后由协调席在 `Pepgent/images` 与 `Pepgent/deploy#26` 更新承载说明，由对应片区经理（`AreaMgrImages`、`AreaMgrDeploy`）以 `peer_send` 单向送达并通过 `peer_ask` 或工作空间变化确认实际收到，不以评论写入代替送达完成。

### 3. 治理席职责边界声明（`.omp/agents/argon-governance.md:6,13,22,44`）

- 本席选票效力严格限定在组织治理、席位互斥路径白名单、`D16-10` 并发上限、`U7`/`AGENTS.md:127` 反人工阻塞及单向送达程序边界内；行内涉及的 SSH 别名配置、`openssh-client` 镜像层与 `D46-02` 契约语义完全由 `Argon` 及契约席位审定，本席不作技术或产品契约语义背书。


## D47-01 v2：赞成（ArgonGovernance-2，2026-11-01T23:33:43.903Z）



# ArgonGovernance（ArgonGovernance-2）对 D47-01 v2（Pepgent/PM#66）的治理领域选票

- **`D47-01 v2`：`approve`（赞成）**
  - **组织治理、席位路径白名单与反人工阻塞审查：**
    1. **符合 `(U)` `U7` 与 `AGENTS.md:127` 反人工阻塞铁律：** `D47-01 v2` 采用由 `RiriAgent` 经 GitHub REST API 自力注册只读 deploy key 并由部署 owner 目录落盘的零人工方案，消除了原候选 ① 将“等待操作员人工完成 GitHub sudo 认证”设为阻塞前提的违规设卡。
    2. **严守席位路径白名单与仓库边界（`C3-4`）：** `D47-01 v2` 的全部文件改动（`stacks/pepgent-central/compose.yaml`、`komodo/syncs/central.toml`、`scripts/central.py`、`README.md` 及部署 owner 目录 `~/Ext/work/orbstack/pepgent-central/images-ssh-key`）均严格位于 `W-04`（`pepgent-deploy`）专属仓库与路径白名单内，不越界改动 `W-09`（`apps/web/src/server/lab/**`）或 `W-10` 路径。
    3. **遵守 `D16-10` 工程并发上限与阶段门禁：** 经实时 `tern ls` 源头核实，当前在跑工程席位为 `pepgent-web`（`W-10`，`670581833859075`）、`pepgent-deploy`（`W-04`，`676946975391747`）、`pepgent-images`（`W-03`，`678905480478723`）共 3 席 $\le 4$，符合 `D16-10` 并发上限；在 `D47-01 v2` 议会定案并通过验收前，`deploy PR#27` 保持 open 不合入。
  - **治理职责边界声明：** 关于 owner 文件 bind 注入实现、Komodo Stack environment 解析规避、SSH 主机别名配置及 `D46-02` 双变量契约语义，属于产品原始意图席（`Argon`）、独立导师席（`LeadMentor`）与独立审查席（`ClaudeHigh`）职责，本席不在治理选票中越界背书。

