# 闸门 B 裁决：`Pepgent/Pepgent#29`（`WEB-07`）AI 面板 `packages/ui` 受控端口部分 `BLOCKED`（`pepgent29-aipanel-gate-b.md`）

- **初审材料：** [`evidence/gates/pepgent29-aipanel.md`](pepgent29-aipanel.md)（`DeskPepgent29Blocked`）
- **关联议题：** [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（`W-10` 部分 `BLOCKED` 评论 [`#issuecomment-6564495563`](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564495563)）
- **把关席位：** `ArgonGovernance`（`ArgonGovernance-2`，组织治理与分配守护席，正交闸门 B）
- **核对基准：** 已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行，含 `R1–R21`、`D1–D44` 决策索引及 `U1–U111` 用户原话基准）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核实不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`）、`evidence/decisions/D20-w10-path-boundary.md:11-33`（`D20-01`、`D20-02`）、`evidence/decisions/D35-pepgent-26-web03-timeline-plan-defs.md:11,20`（`D35-01 v3`）及 `Pepgent/Pepgent` `packages/ui/src/lab/ai-panel.tsx:140-225`、`packages/ui/src/lab/ai-panel-model.ts:44-82`。

---

## 一、闸门 B 逐项判定（对应初审材料 §三 Q1 及程序边界）

| 审查项 | 闸门 B 结论 | 组织、路径白名单、阶段门禁与投票路由依据 |
|---|---|---|
| **1. Q1（是否越过白名单、是否须按 `P0` 表决、`domains` 是否为 `governance`）** | **越过既有白名单（`K4`），必须立为 `priority: P0` 且标 `domains: [governance]`（5 席，门槛 4）表决** | 1. **越过既有白名单依据：** 经独立直读 `D16-09`、`D20-01` 与 `D35-01 v3`，`packages/ui/**` 默认不在任何席位白名单内，`D35-01 v3` 仅将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 两文件限定用途划给 `W-10`，并明写“`packages/ui` 的其余文件不在范围内”。将 `packages/ui/src/lab/ai-panel.tsx`、`packages/ui/src/lab/ai-panel-model.ts`（及新增导出类型时必要的 `packages/ui/src/lab/index.ts` 导出行）划给 `W-10`，属于扩大 `D16-09` / `D20-01` 席位路径白名单（`K4` 缺写入授权），严禁由总协调席或治理承接者单方放行。<br>2. **`P0` 与 `domains: [governance]` 依据：** `W-10` 已在 `#29#issuecomment-6564495563` 正式上报 `BLOCKED`，依 `C2-2.2` 与 `D1-12` 属于关键路径工程 `BLOCKED` 解阻，必须定级 `priority: P0`；因涉及修订 `W-10` 席位路径白名单，依 `D1-12`（第 18、23、27 行）及 `D35-01 v3` 先例必须标注 `domains: [governance]`（5 席参投，含 `ArgonGovernance`，门槛 4 票）。 |
| **2. 候选 (a)/(b)/(c) 的组织与隔离边界审定** | **候选 (b) 违反 `U59`/`C1-2` 严禁采用；候选 (a) 的路径收窄与 `U59` 保护边界在治理上合规** | 1. **排除候选 (b)：** `C1-2` 与 `U59` 严禁触碰 `Pepgent/Pepgent` 根 checkout 或联系该无关纯前端会话，且 `D35-01 v3` 已排除为受控端口另设前端席位。<br>2. **候选 (a) 治理边界：** 比照 `D35-01 v3` 将 `packages/ui/src/lab/ai-panel.tsx`、`ai-panel-model.ts`（及必要的 `packages/ui/src/lab/index.ts` 导出行）限定用途加入 `D20-01` 的 `W-10` 白名单，要求从最新 `origin/main` 接续、不改 CSS/类名/布局/视觉外观、不破坏或回退 `U59` 已合入结构（`C5-3.2`、`D20` Q1/Q2），并在 `WEB-07` 非 draft PR 正文按 `D20-02` 逐行列出改动供事后检查，完全符合阶段 B 隔离与门禁规则（`C1-3`、`D16-13`）。 |
| **3. 职责边界声明（针对 Q2、Q3）** | **Q2、Q3 属闸门 A 与契约范畴，本席不越界裁定** | 依 `.omp/agents/argon-governance.md:6,13,44`，关于 `Q2`（受控端口用途清单是否仅兑现既有 `D12` 契约、候选 c 是否违背 `U2` 意图不收缩）与 `Q3`（Panel 会话无 `name` 字段下现有“改名”控件处理方式及“新建会话”接线语义），属于产品原始意图与公开契约语义范畴，由 `Argon` 在闸门 A 中裁定并在议程行中由契约席位审定，本席在闸门 B 中不做契约语义背书。 |
| **4. 表决期间只暂停 AI 面板受阻分支与送达边界** | **只暂停 AI 面板接线分支、`WEB-07` 其余部分照常推进完全合规** | `W-10` 在 `#29#issuecomment-6564495563` 已明确划分受阻与不受阻范围；表决期间仅暂停 `packages/ui/src/lab/ai-panel*` 相关的 AI 面板接线分支，`WEB-07` 其余页面 loader/投影、切换 Lab、详情页五入口、讨论页上传等照常推进，符合 `C1-3`、`C5-4` 与 `U83`/`U88` 反设卡原则。议程定案并登记 `#29` 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-10`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。 |
