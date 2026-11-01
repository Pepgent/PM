# 闸门 A 裁决：Pepgent#25（WEB-05）自动化页的会话头、首步槽位与交回入口（Q1–Q4）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（[评论 6563204849](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563204849)），`PM/evidence/gates/pepgent25-web05.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`（`LEDGER.md:69`：已有 agent 制作纯前端）、`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，功能不收缩）、`U59`（`LEDGER.md:104`：不联系无关前端会话、不破坏其成果）、`U83`、`U88`（`LEDGER.md:112,117`：按切片职责推进，只暂停有契约缺口的部分）。
  - `(D)` `SOR/AGENTS.md:60,123`（C2-2、D10-08）、`DEC/D7-lab-backend.md:77,100`（D7-17、automation 页行）、`DEC/D8-mvp-scope.md:149,339,341,348`（F30、WEB-05、WEB-07、D36-02）、`DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D12-lab-wire.md:34,43,45,358,415-418,536`（D12-02⑤、D12-07、D12-10、D12-11、D12-13）、`DEC/D20-w10-path-boundary.md:31-32`（D20-01/02）、`DEC/D31-automation-conversation-heads.md:11,30`（D31-01 及承载段）、`GATES/pepgent26-web03-gate-a.md:15`。

---

## 一、总体判定汇总

| 编号 | 事项 | 闸门 A 分类 | 是否越界 / 是否立案 | 核心结论 |
|---|---|---|---|---|
| **Q1** | 自动化页渲染会话头、首步槽位与交回入口是否需要 `D20-02` 例外 | **K1** | **不越界，不立案** | **同意候选 `(d)`：** 会话头与槽位事实写入运行行既有 `text`/`source`/`stateLabel` 文本位，交回入口复用运行行既有条件动作按钮位（`run.action`）与页面既有规格驱动 `ActionDialog`（传入已有 `onDone` prop），完全符合 `D31` 意图与 `D20-02` 边界 |
| **Q2** | 承载切片归属：`WEB-05` 还是 `WEB-07` | **K1** | **不越界，不立案** | 按 `D31:11` 明文规定，上述投影与 `D20-02` 允许的 UI 绑定行在 `WEB-05`（`#25`）交付，真实后端读取随 `WEB-07`（`#29`）脱离 `LAB_SNAPSHOT` 一并生效；`WEB-05` 关闭条件仍为纯函数投影单元测试 |
| **Q3** | 文件型 shape 的交回（`GuiReturned.file`）在 `ActionDialog` 中的输入/选择方式 | **K4** | **越界，须立 P0 表决** | 现有正文只规定 `GuiReturned.file` 带 `artifact: ArtifactRef`（`D12-11`），未规定无文件字段的 `DialogFieldFixture` 如何采集 `ArtifactRef`；须把自动化页（`WEB-05`）与实验详情页（`WEB-07`）合为一行立 P0 表决；表决前 `W-10` 按 `D10-08` 只暂停 `file` 分支，`number`/`string`/`boolean` 照常交付 |
| **Q4** | 同一会话同时有多个 `awaiting_human` 槽位时单按钮位依次交回 | **K3** | **不越界，不立案** | 每次 `intervene.answer` 针对单个 `slot` 并触发 `conversation{id}` 重读（`D12-11`、`D12-17`、`D31-01`），单按钮按确定性顺序依次交回、全部槽位在文本位展示，满足“首步槽位能交回”的意图 |

---

## 二、对 Q1–Q4 中“A”问题的逐项回答

### Q1-A：会话头与槽位的事实进入运行行已有文本位、交回经已有动作按钮位与规格驱动的 `ActionDialog`，是否满足 `D31` 承载段“渲染会话头、首步在途槽位与交回入口”的意图，且不触及 `D20-02` 的“视觉层级、组件结构”？
- **答复：** **完全满足 `D31` 意图，且不触及 `D20-02` 的“视觉层级、组件结构”（属 K1，不越界，无需立案）。**
  - `automation-page.tsx:120-122,285-362` 的 `RecentRun` 与 `RunHistory` 已有描述文本位（`run.text`、`run.source`、`run.stateLabel`）、条件渲染动作按钮位（`run.action !== null`）以及由 `controller.dialog`（`DialogSpecFixture`）驱动的 `ActionDialog`。
  - 按候选 `(d)`，把 `Automation` 会话头（`owner`、`agent`）与在途槽位状态投影进既有文本位属于 `D20-02` 的“真实数据取数”；在 `canHandBack` 为真且存在 `awaiting_human` 槽位时由 `run.action` 渲染交回按钮、由 model 按 `awaiting_human.shape` 生成 `DialogSpecFixture` 并在 `ActionDialog` 调用处传入已有 `onDone` prop 发出 `intervene.answer`，属于 `D20-02` 的“把 reducer 动作接到 `LabCommand`（`D7-17`）；以及完成上述各项所需的最少 props 和条件渲染”，与 `Pepgent#26` `Q1`（`pepgent26-web03-gate-a.md:15`、`D36-02 v2`）完全一致。排除需修改视觉结构或联系 `U59` 的候选 `(a)`、`(c)`、`(e)`。

### Q2-A：`WEB-05` 交付上述投影与绑定、真实数据随 `WEB-07` 生效，是否符合 `D31:11` 与 `F30` 的意图？
- **答复：** **完全符合（属 K1，不越界，无需立案）。**
  - `DEC/D31-automation-conversation-heads.md:11` 已明文规定：“自动化页的 WEB 投影由 W-10 在 WEB-05（Pepgent#25）承接，渲染 Automation 会话头、其首步在途槽位与交回入口”；同时 `DEC/D8-mvp-scope.md:339,341` 规定 `WEB-05` 本仓验收为纯函数投影单元测试，而“运行时不再引用 `LAB_SNAPSHOT`”及 13 个页面接真实后端数据归 `WEB-07`（`Pepgent#29`）。因此，在 `WEB-05` 交付会话头/槽位/交回 `DialogSpec` 的投影与 `automation-page.tsx` 的 `D20-02` 数据绑定行、随 `WEB-07` 切换运行时后对真实后端数据生效，与 `D31:11`、`D8:339,341` 及 `F30` 完全吻合。

### Q3-A：GUI 文件型交回的候选产物范围是否属于未定的产品语义，须表决？若表决，是否把详情页（`WEB-07`）与自动化页（`WEB-05`）合为一行？
- **答复：** **是，属于未定契约缺口（K4），必须立 P0 表决，且应将自动化页（`WEB-05`）与实验详情页（`WEB-07`）合为一行统一规定。**
  1. **为何属 K4 并须两页合一行：** `D12-11`（`DEC/D12-lab-wire.md:43,417`）规定 `intervene.takeover` 与 `intervene.answer` 的文件交回项为 `{ kind: 'file', artifact: ArtifactRef }`（`ArtifactRef = store:<sha256> | discussion:<DiscussionArtifactId>`，`D12-02⑤`），但 `DialogFieldFixture`（`C/contracts/lab-common.ts:157-171`）只有 `text/area/segmented/choice/multi/toggle/info/code` 八种字段，没有规定 `ActionDialog` 如何为 `awaiting_human` 的 `file` 字段采集或选择 `ArtifactRef`。这一缺口对自动化页（`WEB-05`）和实验详情页（`WEB-07`）完全相同。
  2. **本席对 P0 议案主案的意图与契约提示：**
     - 注意 `Automation` 会话（`origin = Automation`）不是讨论，`D12-10`（`:536`）的 `discussion.load` 仅针对讨论会话，故 `Automation` 会话没有“已装载的 `discussion_context` 列表”；同时，人交回给槽位的 `ArtifactRef` 既可以是历史运行的 `store:<sha256>`，也可以是经 `D12-13`（`POST /api/lab/conversations/{conversation}/artifacts`）上传到该会话的 `discussion:<id>`。
     - 因此，最简且不跨席位改 wire / 不改 `packages/ui` 的主案是：**在实验详情页（`WEB-07`）与自动化页（`WEB-05`）的交回 `DialogSpecFixture` 中，`awaiting_human` 的 `file` 字段统一映射为 `DialogFieldFixture` 既有的 `kind: 'text'`（`mono: true`），接收用户输入/粘贴的 `ArtifactRef` 字符串（`store:<sha256>` 或 `discussion:<id>`），提交时按 `ArtifactRefSchema` 校验构造 `{ kind: 'file', artifact }`**（可将“为 `experiment`/`automation` 页扩充 wire 候选产物列表并用 `choice` 下拉选择”列为取舍栏备选）。
     - 表决前，按 `D10-08`“只暂停依赖部分”，`W-10` 在 `WEB-05` 先交付 `number`、`string`、`boolean` 三类字段的交回映射，只暂停或待 P0 通过后补齐 `file` 分支，完全合规。

### Q4-A：依次交回是否满足“首步槽位能交回”的意图？
- **答复：** **完全满足（属 K3，不越界，无需立案）。**
  - 按 `D12-11` 每次 `intervene.answer` 本就只针对单个 `(writerSession, slot)`，且答复受理后 `Lab` 发出 `conversation{id}` 事件使页面重读（`D12-17`、`D31-01`）。当同一 `Automation` 会话同时存在多个 `awaiting_human` 槽位时，在文本位展示全部槽位事实、由运行行单个动作按钮按确定性顺序（如 `startedAt` 最早者）指向当前槽位，交回重读后自动指向下一个 `awaiting_human` 槽位，使每个槽位均可通过 GUI 逐一完成交回，无需新增按钮位或改动组件结构。
