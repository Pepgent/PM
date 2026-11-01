# 闸门 B 裁决：`Pepgent/Pepgent#78` `W-09 BLOCKED` 第一类（Lab 入口无切片承载，`pepgent78-lab-entry-ownership-gate-b.md`）

- **初审材料与草案：** `evidence/gates/pepgent78-lab-entry-ownership.md`、`evidence/gates/pepgent78-lab-entry-ownership-proposal.yaml`（`DeskLabEntryOwnership`）
- **关联议题：** [Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)（`BLOCKED` 评论 [`#issuecomment-6564186088`](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) 第一节“一、入口未实现”）
- **把关席位：** `ArgonGovernance`（`ArgonGovernance-2`，组织治理与分配守护席，正交闸门 B）
- **核对基准：** 已逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–143 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核实不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-10`、`D16-11`、`D16-13`）、`Pepgent/Pepgent#78` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:248-266,509-571`。

---

## 一、总局判定汇总

| 审查项 | 闸门 B 结论 | 处置与投票路由 |
|---|---|---|
| **1. 是否越过席位路径白名单或阶段门禁** | **不越过白名单或阶段门禁** | 新切片 `LAB-13` 归 `W-09`（`pepgent-lab`），路径严格限 `apps/web/src/server/lab/**`（`D16-09`），阶段 B 只做本仓编译/类型/基础检查（`C1-3`、`D16-13`）。 |
| **2. 是否属于必须表决的派工归属** | **越界（`K4`），必须进入议会表决** | 涉及在 `D8` §4.2 切片表与 `D8-slice-issues.md` 新增切片 `LAB-13` 及划分与 `Pepgent#78` 的派工归属，无既有逐字切片承载，严禁协调席或 `Main` 单方补派（`AGENTS.md` C2-2.2、`AGENTS.md:123`）。 |
| **3. `domains: [governance]` 与 `P0` 定级是否正确** | **完全正确（`priority: P0`，`domains: [governance]`，5 席参投）** | 直接解阻 `Pepgent#78` 已报 `BLOCKED` 第一类（符合 `D1-12` `P0` 定义）；涉及新增 `D8` 切片与 Agent 工作分配/归属，必带 `domains: [governance]`（5 席，门槛 4）。 |
| **4. 初审第五节其余 `notSupported` 入口及第二类“同一事务”冲突不并入本 `P0` 议程是否合规** | **完全合规** | 符合 `D1-12`（非当前 `#78` 直接阻塞的其余缺口不挤占本 `P0`）与独立问题拆分原则（第二类“同一事务”契约冲突与第一类入口承载正交，另行处理）。 |

---

## 二、逐项详细依据

### 1. 席位路径白名单与阶段门禁边界（问题 1）
- **路径白名单合规（`D16-09`）：** 经独立直读 `apps/web/src/server/lab/operations.ts:259-265,543-569`，`home`/`containers`/`settings` 三页读取、`P15` 镜像定义导出、`member.invite/role/quota/remove`、`conclusion.confirm`、`agentTemplate.saveVersion` 与 `panel.prompt` 的 wire 形状已在 `apps/web/src/protocol/lab/{pages,command}.ts` 定义完毕，实现仅需修改 `apps/web/src/server/lab/**`，完全位于 `D16-09` 授予 `W-09`（`pepgent-lab`）的排他路径白名单内，不触碰 `W-10` 路径域。
- **阶段门禁合规（`C1-3`、`D16-13`）：** 草案明确 `LAB-13` 仅执行本仓编译、类型检查和基础检查（`typecheck`、`build`、`lint`、`test:node`），跨组件真实运行结果归 `Pepgent#30`（`E2E-20`）与阶段 C 统一验收，不设开发期跨组件 live 门禁。

### 2. 必须表决的派工归属（问题 2）
- 虽上述入口的行为与权限契约已在 `D7`、`D12-08`、`D12-10` 定案，但 `D8` §4.2 的 `LAB-01..LAB-12` 切片表及 `Pepgent/Pepgent` 现有全部 issue 均无逐字承载。
- 按 `AGENTS.md`（“尚未定案的范围或派工归属必须经表决，或有逐字依据；接口或权限表缺少某项不构成授权：禁止据此放开权限、扩大或缩小范围、改派席位、跳过依赖或把功能移入 D9”）与 `C2-2.2`，新建 `D8` 切片 `LAB-13` 并设定 `Pepgent#78` 对 `LAB-13` 的依赖关系属于必须经议会表决的派工归属事项（`K4`）。依 `C2-2.2`“任一闸门认定越界，按 `P0` 立即进入投票”，一经本闸门 B 判越界即可立即通过 `council propose` 立案。

### 3. `P0` 定级与 `domains: [governance]` 核对（问题 3）
- **`P0` 定级合规（`AGENTS.md` D1-12、C2-3）：** `W-09` 已在 [Pepgent/Pepgent#78#issuecomment-6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) 上报正式 `BLOCKED`；`#78` 的预期结果 1–5 因这批入口未实现而无法落地，且 `library.apply` / `agentTemplate.saveVersion` 在主路径上依赖 `panel.prompt` 新建 Panel 会话，属于关键路径工程 `BLOCKED` 解阻，定级 `P0` 完全正确。
- **`domains: [governance]` 合规（`.omp/agents/argon-governance.md` §11/§20/§22、`AGENTS.md` D1-12）：** 三行议案均涉及在 `D8` §4.2 与 `D8-slice-issues.md` 新增切片 `LAB-13`、划定 `LAB-13` 与 `Pepgent#78` 的工作分配及切片职责边界，属于组织治理与工作分配领域（`domains: [governance]`），须由含 `ArgonGovernance` 在内的 5 席投票（门槛 4）。

### 4. 议程拆分合规性（问题 4）
- **初审第五节第 1 项（其余 3 页读取与 16 个 `notSupported` 命令不并入本 `P0`）：** 这些入口不在 `Pepgent#78` `BLOCKED` 的直接阻塞集内。将其从本 `P0` 解阻议案中拆出、交 `Main` 另行立项处理，既遵守 `D1-12` 对 `P0` 范围的严格限定，又避免把大批量非当前阻塞项塞入同一 `P0` 议案拖慢 `#78` 解阻（符合 `C1-3`/`U83` 反设卡原则）。
- **初审第五节第 2 项（`#78` `BLOCKED` 第二类“`library.merge`/`library.apply` 与‘同一事务’原文冲突”另立初审）：** 第二类属于对已决 `D38-02 v2` 事务语义的契约冲突，与第一类“未实现入口补 `LAB-13` 切片承载”正交，拆开独立处理符合问题正交拆分原则。
