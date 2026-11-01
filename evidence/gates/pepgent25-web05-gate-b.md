# 闸门 B 裁决：`Pepgent/Pepgent#25`（`WEB-05`）`W-10 BLOCKED`（`pepgent25-web05-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent25-web05.md`
- **关联议题：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（评论 [`#issuecomment-6563204849`](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563204849)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **把关复核源头：** 已全量复核 `LEDGER.md:1-140`、`AGENTS.md:1-129`，并独立直读 `D31-automation-conversation-heads.md:11,30`、`D20-w10-path-boundary.md:31-32`、`D16-phaseB-review-restore.md:33,37` 与 `automation-slots-gate-b.md:20-37`
- **判定时间：** `2026-11-01T20:29Z`

---

## 一、总局判定结论（严格限定于闸门 B 组织、路径白名单、阶段与程序职责）

1. **不越界项（`Q1-B` 候选 `d`、`Q2-B`、`Q4-B`）：** 在闸门 B 的席位路径白名单（`D16-09`、`D20-01/02`）、切片承载归属（`D31:11`）与阶段 B 边界（`D16-13`）上均**不越界、无需改动白名单或新开 issue**。
   - **正交双闸门前置约束（`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：** 本席不越界替 `Argon` 裁决 `Q1-A`、`Q2-A`、`Q4-A` 的产品原始意图或契约语义；仅当已落盘的 `Argon` 闸门 A（`pepgent25-web05-gate-a.md`）与本闸门 B **双双确认 `Q1(d)`、`Q2`、`Q4` 不越界**时，方可在 `Pepgent#25` 免投票放行并由 `AreaMgrPepgent` 送达 `W-10`。若闸门 A 对其中任一项判越界，该项须一并入 `P0` 表决。
2. **越界必投项（`Q3-B` 文件型交回 `GuiReturned.file`）：** **越界，必须立 `P0` 议案表决**；表决前按 `D10-08`“只暂停依赖部分”，`W-10` 在 `WEB-05` 仅暂停 `GuiReturned.file` 文件型交回部分，`number`/`string`/`boolean` 交回及自动化/节点库其余投影照常推进。

---

## 二、对 `Q1-B` ～ `Q4-B` 的逐项判定

### 1. `Q1-B`（路径白名单与是否立案）：**候选 `(d)` 不越界、不立案（以闸门 A 确认 `Q1-A` 为前提）**

- **依据：**
  - 经独立直读 `D20-w10-path-boundary.md:31-32`（`D20-01`、`D20-02`）与 `D16-phaseB-review-restore.md:33`（`D16-09`），`apps/web/src/renderer/features/lab-automation/{controller,model}/**`、`apps/web/src/renderer/locales/lab-automation-copy.ts`、`apps/web/src/client/**` 均在 `W-10` 路径白名单内；`apps/web/src/renderer/features/lab-automation/ui/**` 在 `D20-02` 限定范围内（真实数据取数、留空字段空值展示、把 reducer 动作接到 `LabCommand`、以及完成上述各项所需的最少 props 和条件渲染，不改 CSS、主题、类名、布局、视觉层级、组件结构及无关文案，并在 PR 正文逐文件列出 UI 改动行及用途）归 `W-10` 写。
  - 因此候选 `(d)` 在路径白名单与组织边界上完全合规，无需修改 `D20-02` 白名单（候选 `a`/`e` 则跨越 `D20-02` 或 `U59` 边界，不予采用）。至于候选 `(d)` 是否满足 `D31` 渲染意图且不触及视觉层级/组件结构，由 `Argon` 闸门 A（`Q1-A`）专责裁定。

### 2. `Q2-B`（切片承载归属与阶段边界）：**不越界、不立案（以闸门 A 确认 `Q2-A` 为前提）**

- **依据：**
  - 经独立直读 `D31-automation-conversation-heads.md:11` 与 `automation-slots-gate-b.md:27`，`D31` 已明确规定“自动化页的 WEB 投影由 `W-10` 在 `WEB-05`（`Pepgent#25`）承接，渲染 Automation 会话头、其首步在途槽位与交回入口”。
  - `WEB-05` 与 `WEB-07` 同属 `W-10` 席位：在 `WEB-05` PR 中交付投影、纯函数投影单测及 `D20-02` 允许的 `automation-page.tsx` 数据绑定行，真实后端数据随同席位 `WEB-07` 去除运行时 `LAB_SNAPSHOT` 一并生效，既不跨越席位边界，也不改变 `D31:11` 切片承载或 `D16-13` 阶段 B 门禁，无需另立议案。

### 3. `Q3-B`（`GuiReturned.file` 跨席位 wire / 缺契约投票程序与“只暂停依赖部分”）：**越界，必须立 `P0` 表决；表决前只暂停文件型交回完全合规**

- **依据：**
  1. **必须立 `P0` 表决：** 无论是选用新增 `automation` 页 wire 字段（跨 `W-09` `protocol/lab/**` 与 `W-10` 两席路径域），还是确定 GUI 文件型交回（`GuiReturned.file`）在自动化页（`WEB-05`）与详情页（`WEB-07`）的候选产物范围（属 `D10-08` 与 `AGENTS.md:123` 规定的未决跨仓/公开契约与产品语义缺口 `K4`），均严禁工人或协调席单方自选合入，必须由 `DeskPepgent25Blocked` 按 `P0` 经议会 daemon 立案表决。（注：若提案行不修改 `D16-09`/`D20` 路径白名单，仅裁定产品语义及 `W-09`/`W-10` 各自既有白名单内的 wire/投影契约，则属 4 席参投的产品/契约行，不加 `domains: [governance]`。）
  2. **表决期“只暂停依赖部分”合规：** 按 `D10-08` 与 `C1-3`（`U83` 反设卡），在 `Q3` 的 `P0` 议案表决通过前，`W-10` 在 `WEB-05` 仅暂停 `GuiReturned.file` 文件型交回这一受阻部分，`number`/`string`/`boolean` 交回、自动化会话视图与首步槽位投影、审批/驳回及节点库全部投影照常在 `WEB-05` 交付；同时严禁在 `P0` 表决通过前将未经表决的文件型交回方案写入待合入 PR 或 `main`。

### 4. `Q4-B`（多个 `awaiting_human` 槽位依次交回是否立案）：**不越界、不立案（以闸门 A 确认 `Q4-A` 为前提）**

- **依据：** 该改动完全位于 `W-10` 白名单（`features/lab-automation/{model,controller,ui}/**`）内，不改 `D20-02` 禁止的组件结构、不跨席位边界；在 `Argon` 闸门 A（`Q4-A`）确认满足“首步槽位能交回”产品意图且不改公开契约的前提下，属 `AGENTS.md:123` 与 `D10-08` 规定的已通过契约内私有实现细节（`K3`），无需立案。
