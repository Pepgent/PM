# 闸门 B 裁决：`soroi#250`（E2E-13）W-08 登记的两项产品缺陷承载归属（`w08-f22-defects-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/w08-f22-defects.md`
- **关联议题：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（评论 [`#issuecomment-6562476097`](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562476097)）、[Pepgent/soroi#204](https://github.com/Pepgent/soroi/issues/204)（SOR-08）、[Pepgent/soroi#211](https://github.com/Pepgent/soroi/issues/211)（SOR-12）、[Pepgent/soroi#329](https://github.com/Pepgent/soroi/issues/329)
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T19:16Z`

---

## 一、总局判定结论

**闸门 B 判定：不越界（属已通过契约 `D5`、`D8`、`D10-08`、`D16-09/10/11` 内的实现偏差修复承载，若闸门 A 亦确认不触及产品原始意图与公开契约变更，免投票直接在 `Pepgent/soroi` 新开两个承载 issue 交 `W-07` 承接）。**

---

## 二、逐项判定（对应初审第五节 `B-1` ～ `B-3`）

### 1. `B-1`（席位互斥路径白名单与免投票边界）：**不越界，归 `W-07`（`pepgent-plugin`）承接**

- **依据：**
  - `D16-09`（`evidence/decisions/D16-phaseB-review-restore.md:33`）规定：`W-07`（`pepgent-plugin`）在 `Pepgent/soroi` 内独占 `packages/omp-soroi/**`、`scripts/**` 等实现路径；`W-08`（`pepgent-e2e`）独占 `e2e/**`、`compose.yaml`、`compose.full.yaml`。
  - 两项缺陷涉及的代码文件——`packages/omp-soroi/src/subagent/main/supervisor.ts`（sidecar `<id>.soroi.json` 缺 `role` 字段）与 `packages/omp-soroi/src/eval/reminder.ts`（批次提醒缺 `purpose` 组头与缩进）——均严格落在 `W-07` 的 `packages/omp-soroi/**` 路径白名单内。
  - `W-08` 未越界触碰 `packages/omp-soroi/**`，而是在 `#250` 评论中登记产品缺陷并保持 `e2e/s1/f22.spec.ts` 契约判据不降级，符合 `C1-3` 与 `D16-09`。
  - 依 `D10-08` 与 `AGENTS.md:60`（`C2-2.2`），对照已通过契约（`D5 §3.1`、`D5-13`、`D5 §3.5`、`design/subagent.md:40`、`design/eval.md:221`、`D8` SOR-08/SOR-12/F22）修补实现漏项不改变公开契约或路径划分，无需事前投票；在 `Pepgent/soroi` 分别新开两个承载 issue 交 `W-07` 承接，且 `W-07` 可按 `D16-11③` 在同一 PR 中用多个 `Closes #X` 一并提交。

### 2. `B-2`（阶段门禁与 `D16-10` 4 席上限排期）：**不越界，新开 follow-up issue 并按 `D16-10` 排期入场**

- **依据：**
  - 原 `SOR-08`（[soroi#204](https://github.com/Pepgent/soroi/issues/204)）与 `SOR-12`（[soroi#211](https://github.com/Pepgent/soroi/issues/211)）已随既有 PR 合入关闭；依 `github-issue-pr-routing` 规范（“不回写已合并 PR；缺陷或 follow-up 新建 issue 和对应 PR”），针对后续暴露的实现偏差新开两个独立承载 issue（并在正文中注明关联 `SOR-12`/`SOR-08` 与阻塞阶段 C 的 `F22 / #250`），不重开已关闭切片，程序完全合规。
  - `W-07` 当前因 `D16-10` 同时活跃上限 4 席而暂退（名下尚有 [soroi#329](https://github.com/Pepgent/soroi/issues/329) 待做）；何时在现有 4 席（`W-09`、`W-08`、`W-04`、`W-10`）释放名额后补入 `W-07` 一并完成 `#329` 与这两个新承载 issue，属 `Main` 按 `D16-10` 执行的常规全局排期，无需另立表决。
  - 阶段 B 期间修复这两个 issue 只做本仓检查（`D16-11③`），不阻塞 `W-08` 当前在 `e2e/**` 内的自动驱动编写；阶段 C 的 `F22`（`#250`）真实验收在这些承载完成并组装后统一执行（`C1-3`）。

### 3. `B-3`（建承载与送达路由边界）：**合规**

- **依据：**
  - 由 `DeskW08DefectCarrier` 在闸门 A 与闸门 B 均确认不越界后，在 `Pepgent/soroi` 开出两个承载 issue，并在 [soroi#250](https://github.com/Pepgent/soroi/issues/250) 评论中附链接回应 `W-08` 的登记；`DeskW08DefectCarrier` 不直接向 `tern` 工人发 peer 消息。
  - 待 `W-07` 按 `D16-10` 重新入场时，由 `Main` 首次派活或由 `AreaMgrSoroi-3` 按 `C4-1`/`C4-2`（`U107`）单向送达，符合“主控不当工人常规通信总线”（`U104`）。
