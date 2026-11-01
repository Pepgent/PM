# 治理审查（事后检查 / 闸门 B）：`Pepgent/Pepgent#83`（`LAB-14` / `PR#85`）四项导师意见与验收边界（`lab14-dispute-gate-b.md`）

- **初审材料：** `local://decisions/lab14-dispute.md`（`DeskLab14Dispute`）
- **关联议题与 PR：** [Pepgent/Pepgent#83](https://github.com/Pepgent/Pepgent/issues/83)、[Pepgent/Pepgent#85](https://github.com/Pepgent/Pepgent/pull/85)（`6da51ac`）
- **把关席位：** `ArgonGovernance`（`ArgonGovernance-2`，组织治理与分配守护席）
- **核对基准：** 已在当前窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–150 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），并独立直读 `issue://Pepgent/Pepgent/83`、`pr://Pepgent/Pepgent/85/diff`（15 个改动文件清单）、`evidence/decisions/D44-lab-entry-batch2.md` 及 `local://decisions/lab14-dispute.md`。

---

## 一、程序定性与管理层边界核查

1. **非 `BLOCKED` 事后治理检查（`C2-2.2`、`.omp/agents/argon-governance.md:6`）：**
   - `W-09` 在 `Pepgent#83` 未上报 `BLOCKED`，`PR#85` 已完成本仓 `typecheck`、`build`、`lint`、`test:node` 检查并合入 `main`（`6da51ac`）；因此本项不属于事前 `BLOCKED` 放行锁，严禁按 `P0` 立案。
2. **管理层初审程序纠偏记录（对应 `SentinelWindowR13` 报告）：**
   - `Main` 在 `entry/d392fc2b`（`22:33:53Z`）曾未经治理承接者初审与双核把关即单方将 `W-09` 与导师的四项争议定性为 `private implementation`，随后在 `entry/fd745342` 撤回并按 `U103` 新开空白 `DeskLab14Dispute` 补齐审查；该先越界后纠正事实记入 `22:31Z–22:38Z` 窗口台账。

---

## 二、逐项治理边界判定（路径白名单、阶段门禁与投票路由）

| 项目 | 治理审查结论（越界/不越界） | 组织、席位互斥路径白名单、阶段门禁与投票程序依据 |
|---|---|---|
| **1. `PR#85` 改动路径范围** | **不越界** | 经直读 `pr://Pepgent/Pepgent/85/diff` 全部 15 个改动文件（`apps/web/src/server/lab/{agent-templates,caller,conversations,datasets,discussions,experiment-update,labs,library,milestones,operations,projects,repos,runtime,sessions,store}.ts`），100% 位于 `D16-09` 与 `D44-01 v2` 规定的 `W-09` `apps/web/src/server/lab/**` 白名单内，未修改 `protocol/lab/**` 或 `rpc/lab.ts`。 |
| **2. 争议点 ①–④（重复执行、对象大小读取、`agentTemplate` 页面限制、`set_model` 失败码）在组织与治理域上是否越界** | **组织与路径白名单不越界（无需发起 `governance` 投票；契约语义归 `Argon` 审定）** | 在组织治理、席位路径白名单与阶段门禁维度，①–④ 均未跨越 `W-09` 路径白名单、未改派切片归属、未破坏阶段 B 门禁，无需发起 `domains: [governance]` 投票。依 `.omp/agents/argon-governance.md:6,11,13,22,44`，本席不对 ①–④ 的具体幂等、响应头读取、页面范围或错误码映射作产品/契约语义背书；是否触及 `D12`/`D7`/`D44` 公开契约由 `Argon`（闸门 A）裁定（若 `Argon` 认定需补契约表决，按 `P1` 走 4 席契约投票）。 |
| **3. ⑤⑥（真实 SSH 远端 git 与在线 omp 代切换模型未在单切片做跨组件验证）** | **不越界（符合阶段门禁）** | 依 `AGENTS.md` `C1-3`、`AGENTS.md:128`、`D16-13`、`D44-01 v2` 与 `Pepgent#83` 验收标准表，开发期切片只做本仓编译、类型与基础检查，不设跨组件同步 runtime 合并门禁；跨组件真实运行统一归 `Pepgent#30` 与阶段 C 验收，工人在 PR 正文如实披露未验证跨组件项完全合规。 |
