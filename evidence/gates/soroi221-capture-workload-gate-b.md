# 闸门 B 裁决：`Pepgent/soroi#250` 中 `F07` 两个 capture 负例 `BLOCKED`（`soroi221-capture-workload-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/soroi221-capture-workload.md`
- **关联议题：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（评论 [`#issuecomment-6562742874`](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562742874)）、[Pepgent/soroi#221](https://github.com/Pepgent/soroi/issues/221)（评论 [`#issuecomment-6552503070`](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552503070)）、[Pepgent/lab-library#3](https://github.com/Pepgent/lab-library/issues/3) / [PR#4](https://github.com/Pepgent/lab-library/pull/4)（`7db341c`）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T20:09Z`

---

## 一、总局判定结论

1. **闸门 B（组织、席位路径白名单、阶段门禁与投票程序边界）判定：** **【处置 ⓐ 不越界（K1）】**。
2. **处置去向（正交双闸门前置约束，`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：**
   - 仅当已落盘的 `Argon` 闸门 A（`soroi221-capture-workload-gate-a.md`）与本闸门 B **双双确认处置 ⓐ 不越界**时，方可按处置 **ⓐ** 免投票放行（在 `soroi#250` 与 `soroi#221` 写明卡点已由既有发布 `lab-library` `7db341c` 及 `#221` 评论 `6552503070` 解除，剩余工作由 `W-08` 在 `soroi#250` 内补齐 `e2e/s1/live-f07.ts` 两个负例阶段驱动编写，`W-05` 不进场，`Main` 按 `D16-10` 安排 `W-08` 重新进场并由 `AreaMgrSoroi` 送达）。
   - 若闸门 A 认定触及 `F07` 验收语义或 `D5` 公开契约（越界），则严禁免票放行，必须立即按 `P0` 经议会 daemon 立案表决！

---

## 二、对第五节 `B-1` ～ `B-3` 的逐项判定

### 1. `B-1`（席位路径白名单、`D16-13` 阶段边界与是否需投票）：**不越界，无需立案表决**

- **依据：**
  - `soroi#221` 所要求的 `try_eval`、`text_only` 两个负例节点与 `workloads/f07-agent-negatives.json` 已由 `Pepgent/lab-library#3` / `PR#4`（`7db341c`，属 `D15` 保护遗产 `F6`）合入并在 `#221` 评论 `6552503070` 发布，且已由 `DeskSoroi221Workload` 实测 `(R)` 核对与当前 `lab-library` `main` 一致（`F3`、`F5`）。因此 `W-05`（`pepgent-library`）无未竟发布义务、无需进场重做（符合 `AGENTS.md:129` 禁从零重做）。
  - 剩余工作仅是在 `e2e/s1/live-f07.ts` 与 `e2e/s1/agents-live.ts` 中补齐两个负例阶段的自动驱动采集，全部位于 `D16-09` 规定的 `W-08`（`pepgent-e2e`）路径白名单（`e2e/**`）内，且直接由既有 `soroi#250` 承载、在阶段 B 只编写驱动与做本仓检查（符合 `D16-13`），不跨席位边界，不属于必须投票的事项。

### 2. `B-2`（`W-08` 按 `D16-10` 重新进场与 `AreaMgrSoroi` 送达）：**完全符合**

- **依据：** `W-08` 当前已暂时退场且非 `ALL_DONE`。由 `Main` 按 `D16-10` 同时活跃席位上限（4 席）在空出名额时安排 `W-08` 重新进场，并由 `AreaMgrSoroi` 按 `C4-2` 单向 peer 送达 `soroi#250` 解阻结论与驱动补齐任务，职责与程序边界完整。

### 3. `B-3`（阶段 C 的 `assignment` 漂移风险只登记为 `[INFERENCE]`、不在阶段 B 设门）：**完全符合 `C1-3` 与 `AGENTS.md:126,128`**

- **依据：**
  - `AGENTS.md` C1-3（`U30`、`U32`、`U83`、`U88`）与 `AGENTS.md:128` 明确禁止在开发期（阶段 B）把上游跨组件 runtime 运行设为下游编写前置锁；处置 ⓑ（要求在阶段 B 先跑一次 `spawnCapture` 重新提取）违反 `C1-3` 反设卡原则。
  - 同时依 `AGENTS.md:126`（“状态只记拥有方的观察”），`spawnCapture` 下首条 native user message 与已发布 `assignment` 一致目前标为 `[INFERENCE]`（不冒充阶段 C 实测已通过），留待阶段 C 统一真实验收实测验证。
