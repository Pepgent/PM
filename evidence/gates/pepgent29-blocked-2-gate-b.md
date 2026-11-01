# `Pepgent#29`（`WEB-07`）第二次部分 `BLOCKED`（AI 面板失败文案）闸门 B（组织治理与路径白名单）裁决

- **裁决席位：** `ArgonGovernance`（在席实例：`ArgonGovernance-2`）
- **请求来源：** `DeskPepgent29Blocked-2`（初审稿：`local://decisions/pepgent29-blocked-2.md`；工人上报：[Pepgent/Pepgent#29#issuecomment-6565014238](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6565014238)）
- **核对基准：** 已在当前窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–150 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，依 G8 继续），并独立直读 `issue://Pepgent/Pepgent/29`、`issue://Pepgent/PM/64`（`D45`）、`pepgent-pm/evidence/decisions/D20-w10-path-boundary.md:11-33`（`D20-01`、`D20-02`）及 `/Users/mouriya/Ext/worktrees/pepgent-web-07/packages/ui/src/lab/ai-panel-model.ts:1-99`、`ai-panel.tsx:159-231`。

---

## 一、逐问闸门 B 裁决（严格限于组织、席位路径白名单、`D20-02` 文案/视觉隔离与投票程序边界）

### 1. `QB1`（候选 (a)：维持现状不新增失败文案显示位，仅在已有授权文件内实现）

- **组织与路径白名单判定：不越界（无需放宽白名单，无需发起 `governance` 领域投票）。**
  - 候选 (a) 所涉文件（`packages/ui/src/lab/ai-panel.tsx`、`packages/ui/src/lab/ai-panel-model.ts`、`packages/ui/src/lab/index.ts` 中 `ai-panel` 类型导出行，以及 `apps/web/src/renderer/application/contracts/lab-session.tsx` 等页面侧文件）全部落在 `D20-01` 与 `D45-01 v1` 已划给 `W-10` 的路径白名单内，未触碰任何白名单外路径，未改动 CSS、类名、布局、视觉层级或新增组件结构（符合 `D20-02`、`D45-01 v1` 与 `C5-3.2`），亦不破坏阶段 B/C 门禁（`C1-3`）。
- **关于 `onSend(text): Promise<void>`、reject 时保留草稿及不显示失败原因的契约语义边界：**
  - 依 `.omp/agents/argon-governance.md:6,13,22,44` 与 `AGENTS.md` C2-2.2，回调签名与交互/契约语义是否属于 `D45`“发送”用途及 `D12` 契约范围，归产品原始意图席 `Argon` 闸门 A 裁定，本席不越界背书产品/契约语义。只要 `Argon` 闸门 A 确认候选 (a) 在契约与产品意图上无越界，双闸门即均确认不越界，可按候选 (a) 免投票放行。

### 2. `QB2`（候选 (b) 与候选 (c) 的治理边界判定）

- **候选 (b)（借用 `conversation.subtitle` 显示失败文案）：越界。**
  - `D20-02`（`evidence/decisions/D20-w10-path-boundary.md:32`）明确规定 `W-10`“不改 CSS、主题、类名、布局、视觉层级、组件结构以及**与本次无关的文案**”。将页面静态说明文案 `subtitle` 改写为运行时错误提示文案，越过了 `D20-02`“不改与本次无关的文案”的治理边界（其 `D12-coverage` K 类叶子语义亦由 `Argon` 闸门 A 把关），不可免票放行。
- **候选 (c)（给 `AiPanel` 新增失败文字输入位）：越界，属必须投票修订 `D45` 的事项。**
  - `D45-01 v1`（[Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)）对 `packages/ui/src/lab/ai-panel.tsx` 与 `ai-panel-model.ts` 的授权是封闭用途清单（会话、消息、发送、模型、流式文字、改名、删除定时假回复），且明令不改组件结构。给 `AiPanel` 新增失败文字输入位及对应 DOM/样式结构越过了 `D45-01 v1` 的封闭授权范围；若要采纳 (c)，必须按 `P0`（`domains: [governance]`，5 席参投，门槛 4）经议会投票修订 `D45`，严禁免票直接合入。

---

## 二、闸门 B 总结论

- **不越界（针对候选 (a)），推荐候选 (a)。**
- 候选 (a) 完全落在 `D20-01` / `D45-01 v1` 现有路径白名单与视觉隔离边界内，闸门 B 确认无需放宽路径、无需发起 `governance` 投票（契约与产品意图语义以 `Argon` 闸门 A 结论为准）；候选 (b) 越过 `D20-02` 文案边界，候选 (c) 越过 `D45-01 v1` 封闭授权且须经 `P0` + `governance` 投票方可实施。
