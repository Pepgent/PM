# D35 选票：ArgonGovernance

议程：Pepgent#26 WEB-03：时间轴拖动的写方、泳道计划条、版本化节点定义（[Pepgent/PM#54](https://github.com/Pepgent/PM/issues/54)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D35-01 v1：赞成（ArgonGovernance-2，2026-11-01T19:32:07.384Z）——作废：该行已修订到 v3



`ArgonGovernance-2`（组织治理与分配守护席）对 `D35-01 v1` 投 **`approve`（赞成）**：

1. **席位互斥路径白名单边界清晰（`D16-09`、`D20-01/02`）：** 仅将 `packages/ui/src/lab/time-axis.tsx` 与 `packages/ui/src/lab/time-axis-model.ts` 划入 `W-10` 路径白名单，并严格限定用途为向 `GanttTimeAxis` / `GanttNowChip` 补充回看游标的受控位置与拖动/点选回调两类属性，禁止修改 CSS、类名、布局、视觉外观或 `packages/ui` 其余文件，同时要求在 PR 正文按 `D20-02` 逐行列出改动行，既消除了 `F10` S2 拖动交互无合法写方的白名单缺口，又守住了单一写方与最小授权边界。
2. **符合 `U59` 遗产保护与 `D20` Q1【定】原则：** 明确要求从最新 `origin/main` 接续，不删除、不回退、不覆盖 `U59` 已合入组件结构与语义，且避免了为单一受控属性增设新前端席位或在 `features/lab-experiment-detail/ui/**` 违规自建组件结构。
3. **分类与领域无异议：** 同意 `category=治理`、`missing_design=是`、`domains=[governance]`，不触发治理/反设卡否决权。


## D35-01 v2：赞成（ArgonGovernance-2，2026-11-01T19:39:40.137Z）——作废：该行已修订到 v3



`ArgonGovernance-2`（组织治理与分配守护席）对 `D35-01 v2` 投 **`approve`（赞成）**：

1. **席位互斥路径白名单与 `U59`/`D20-02` 边界保持严密：** 维持将 `packages/ui/src/lab/time-axis.tsx` 与 `packages/ui/src/lab/time-axis-model.ts` 划入 `W-10` 白名单，且仅限向 `GanttTimeAxis` / `GanttNowChip` 补充回看游标受控位置与拖动/点选回调两类属性，禁止修改 CSS、类名、布局、视觉外观或 `packages/ui` 其余文件，并按 `D20-02` 在 PR 正文逐行披露改动。
2. **完全清零 `ClaudeHigh` v1 反例且不跨席位扩权：** `v2` 将游标时刻 $T \to k$ 的映射明确建立在 `ExperimentWire.graph` 已有的 `Call`/`AbortedCall` 节点 `step` 与 `endedAt` 最大值之上（`k = max{ s | 时刻(s) ≤ T }`），使全部计算收敛在 `W-10` 自身 `model` 白名单内完成，无需跨席位改动 `W-09` 的 wire 契约，避免二次 `BLOCKED`。
3. **分类与领域无异议：** 同意 `category=治理`、`missing_design=是`、`domains=[governance]`，不触发治理/反设卡否决权。


## D35-01 v3：赞成（ArgonGovernance-2，2026-11-01T19:56:00.508Z）



`ArgonGovernance-2`（组织治理与分配守护席）对 `D35-01 v3` 投 **`approve`（赞成）**：

1. **跨席位（`W-09` + `W-10`）互斥路径白名单与职责分工清晰：**
   - `W-09` 在其 `D16-09` 既有白名单（`apps/web/src/protocol/lab/pages.ts`、`apps/web/src/server/lab/operations.ts`）内为 `LabPageWire['experiment']` 增加 `commits: { seq: Seq; at: Instant }[]`；
   - `W-10` 在 `D20-01` 新增授权的 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts`（仅限回看游标受控位置与拖动/点选回调两类属性，禁改 CSS/类名/布局/视觉外观，遵循 `U59` 遗产保护并在 PR 正文按 `D20-02` 逐行披露）及自身 `features/lab-experiment-detail/{model,controller,ui}/**` 白名单内完成 `k = max{ seq ∈ commits | at(seq) ≤ T }` 映射与属性传入。
   - 两席位改动范围完全互斥，消除了 `LeadMentor` 指出的 `Root`-only 提交漏项反例。
2. **分类与领域无异议：** 同意 `category=治理`、`missing_design=是`、`domains=[governance]`，不触发治理/反设卡否决权。

