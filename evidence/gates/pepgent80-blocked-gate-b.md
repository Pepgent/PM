# 闸门 B 裁决：`Pepgent/Pepgent#80`（`LAB-13`）`W-09` 部分 `BLOCKED`（`F1–F4`）（`pepgent80-blocked-gate-b.md`）

- **初审材料：** [`evidence/gates/pepgent80-blocked.md`](pepgent80-blocked.md)（`DeskPepgent80Blocked`）
- **关联议题：** [Pepgent/Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)（`W-09` 部分 `BLOCKED` 评论 [`#issuecomment-6564508875`](https://github.com/Pepgent/Pepgent/issues/80#issuecomment-6564508875) 及部分交付评论 [`#issuecomment-6564623289`](https://github.com/Pepgent/Pepgent/issues/80#issuecomment-6564623289)）、[Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)（[`#issuecomment-6564511081`](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564511081)）
- **把关席位：** `ArgonGovernance`（`ArgonGovernance-2`，组织治理与分配守护席，正交闸门 B）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行，含 `R1–R21`、`D1–D44` 及 `U1–U111`）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核实不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`）、`evidence/decisions/D42-lab-entry-ownership.md:38-43`（`D42-01..03 v1`）、`evidence/decisions/D43-pepgent78-merge-txn.md:30-33`（`D43-01 v1`）及 [`evidence/gates/pepgent80-blocked.md`](pepgent80-blocked.md)。

---

## 一、闸门 B 总体结论与职责边界声明

1. **是否属必须表决事项（`K4`）与 `priority: P0` 定级：**
   - `W-09` 在 `Pepgent/Pepgent#80#issuecomment-6564508875` 正式上报 `F1–F4` 四项 `BLOCKED`，且已将不受阻的 `home` 页读取、`panel.prompt`、`conclusion.confirm`、`member.quota` 经 [PR#84](https://github.com/Pepgent/Pepgent/pull/84)（`7b470f9`）先行合入 `main`，仅受阻四项保持 `not_supported`。
   - 四项均涉及修改已定案写入语义（`F1`）、新增跨组件部署配置接口与跨席位产物交付（`F2`）、补充公开字段权威源与判定规则（`F3`）、补充公开语义与放宽 `D42-01 v1` 的 `LAB-13` 切片路径白名单（`F4`），违反 `AGENTS.md:123` 若单方免票放行之禁令，**必须按 `C2-2.2` 与 `D1-12` 立为 `priority: P0` 议程通过 `council propose` 表决**（`F4` 中已由 `D7-11` 明文规定的 `id`/`harness` 取值可在 `#80` 引原文说明，其余通过 `R-05`、`R-06` 表决）。
2. **职责边界声明（`.omp/agents/argon-governance.md:6,13,44`）：**
   - 本席（`ArgonGovernance`）在闸门 B 及后续投票中**仅审查组织制度、席位互斥路径白名单、跨席位派工归属、阶段门禁与优先级/领域路由**，不对 `R-01`–`R-05` 的具体持久化事务语义、配置字段名、`ImageDefinition` schema、`online`/`lastActiveAt` 判定规则或 `.omp/agents/<id>.md` 字段映射做产品意图或契约语义背书（该部分由 `Argon` 在闸门 A 及契约席位在投票中审定）。

---

## 二、逐项（`F1–F4` / `R-01–R-06`）白名单、跨席位派工与 `domains` 判定

| 议程行 | 对应阻塞 | 是否越过既有白名单 / 跨席位派工 | 闸门 B 对 `domains` 与派工程序的要求 |
|---|---|---|---|
| **`R-01`** | **F1**（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 activity） | 代码改动仅在 `W-09` 的 `apps/web/src/server/lab/**` 内，不越过 `D16-09`/`D42-01 v1` 路径白名单；属修订 `D38-02 v2`/`D43-01 v1` 已定案写入句 | 不涉及治理/派工变更，**不标 `governance`（4 席，门槛 3）合规**。 |
| **`R-02`** | **F2-检出配置**（`deploy` 注入 `PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE`；`Lab` 后端消费） | **跨席位（`W-04` `pepgent-deploy` + `W-09` `pepgent-lab`）：** 除 `W-09` 在 `apps/web/src/server/lab/**` 读取配置外，若本行同时指派 `W-04` 修改 `Pepgent/deploy`（`stacks/pepgent-central/compose.yaml` 等），则跨越 `W-09` 路径白名单并产生对 `W-04` 的新增派工 | 若 `R-02` 的 `where`/`how` 包含向 `W-04`（`Pepgent/deploy`）指派新增修改/切片任务，依 `D1-12`（派工分配属 `governance`）**须标 `domains: [governance]`（5 席，门槛 4）**，并在 `how` 中写明在 `Pepgent/deploy` 新建或挂接承载 issue、由 `AreaMgrDeploy` 送达 `W-04`；若仅规定配置接口契约而不含跨仓派工，则为 4 席契约行。 |
| **`R-03`** | **F2-定义来源**（`Pepgent/images` 根部新增机器可读清单 `images.json` 由 `W-03` 交付，`Lab` 只读） | **跨席位且涉及已退役席位重派（`W-03` `pepgent-images` + `W-09` `pepgent-lab`）：** `images.json` 位于 `Pepgent/images` 仓，不在 `W-09` 白名单内；且 `W-03` 在完成 `images#13/#14` 后刚刚报 `ALL_DONE` 并退役，要求 `W-03` 交付 `images.json` 属于**新增跨仓工程切片并重开/重派 `W-03` 席位** | 因 `R-03` 明确包含由 `W-03` 在 `Pepgent/images` 交付 `images.json` 的跨仓派工分配（以及重开已退役 `W-03` 席位、在 `Pepgent/images` 新建承载 issue），依 `D1-12`（第 18、23、27 行）**必须包含 `domains: [governance]`（5 席，门槛 4；产品全景席可按需并列 `claim` `globalArchitecture`）**，并在 `how` 中写明：在 `Pepgent/images` 新建承载 issue 派给 `W-03`（按 `C3-4` 启动/唤醒 `W-03` 独立进程，由 `AreaMgrImages` 单向送达）。 |
| **`R-04`** | **F3**（`settings.members[].online` 与 `lastActiveAt` 的 Lab 进程内来源） | 代码改动仅在 `W-09` 的 `apps/web/src/server/lab/**` 内，不越过 `D42-01 v1` 白名单或阶段 B 门禁 | 属公开字段权威源补充，不涉及治理/派工变更，**不标 `governance`（4 席，门槛 3）合规**。 |
| **`R-05`** | **F4-布局与映射**（`.omp/agents/<id>.md` 单文件规范布局、取值规则与 `saveVersion` 合入路径） | 代码改动仅在 `W-09` 的 `apps/web/src/server/lab/**` 内（`pepgent-lab-library` 现有 `.omp/agents/*.md` 已是顶层单文件，不需 `W-05` 改库） | 属公开契约语义补充，不涉及治理/派工变更，**不标 `governance`（4 席，门槛 3）合规**。 |
| **`R-06`** | **F4-白名单**（`LAB-13` 白名单在 `apps/web/src/server/lab/**` 外增加 `apps/web/package.json` 与根 `package-lock.json`，仅用于新增 YAML 解析依赖） | **跨越 `D42-01 v1` 的 `LAB-13` 切片白名单：** `D16-09` 的 `W-09` 席位矩阵原本含“`apps/web` 依赖的 package manifest、lockfile”，但 `D42-01 v1` 将 `LAB-13`（`#80`）收窄为仅 `apps/web/src/server/lab/**`；放宽该切片白名单仍在 `D16-09` 的 `W-09` 席位边界内，不侵占 `W-10` 路径域 | 属切片路径白名单治理修订，**标注分类“治理”且 `domains: [governance]`（5 席，门槛 4）完全正确**。 |

---

## 三、阶段门禁与非阻塞推进边界

- **只暂停受阻入口、已就绪入口先行合入完全合规：** `W-09` 已将 `home` 页读取、`panel.prompt`、`conclusion.confirm`、`member.quota` 经 `PR#84` 先行合入 `main`，表决期间仅受阻的 `F1–F4` 保持 `not_supported`，符合 `C1-3`、`C5-4` 与 `U83`/`U88` 反设卡原则。
- **送达要求（`C4-1`、`C4-2`、`AGENTS.md:126`）：** 议程定案并在 `#80`/`#78`（及新建的 `images`/`deploy` 承载 issue）登记后，必须由对应仓库片区经理（`AreaMgrPepgent`、`AreaMgrImages`、`AreaMgrDeploy`）执行 `peer_send` 单向送达，并以 `peer_ask` 或工作空间实际观察确认收到为准。
