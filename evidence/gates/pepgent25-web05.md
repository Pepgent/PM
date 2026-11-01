# Pepgent#25（WEB-05）20:06Z BLOCKED 的闸门材料：自动化页的会话头、首步槽位与交回入口

- **issue：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)，工人 W-10。工作入口 `/Users/mouriya/Ext/worktrees/pepgent-web-home`，分支 `feat/web-05-nodes-automation`，只存在于本地，未推送；HEAD `fe37f41`（WEB-04），WEB-05 的改动都未提交（13 个已修改文件、3 个新文件，`git status`/`git diff --stat` 只读核对）。尚无 PR。
- **评论：** [issuecomment-6563204849](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563204849)，标题“BLOCKED（部分）：D31:11 的渲染承载与 D20-02 的 UI 结构边界冲突”。同一 issue 的 [issuecomment-6563421482](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563421482)（worktree 纪律与 `wt` 工具规则冲突）是另一件事，不在本材料范围。
- **编制：** governance-desk 实例 `DeskPepgent25Blocked`（总协调席，与 Main 合计 1 票）。下文类别是起草者的初分，不是裁决。
- **程序：** 闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项（`SOR/AGENTS.md:60`，C2-2）。两道闸门都确认不越界的项，在 #25 按正文作答，不立案；任一闸门认定越界的项，并入一张 P0 议案立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件与源码，没有运行构建或测试，没有读 git 历史或 session，没有触碰 `Pepgent/Pepgent` 根 checkout（U59）。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`；`GATES/` = `PM/evidence/gates/`
- `WT/` = W-10 工作入口；`R/` = `WT/apps/web/src/renderer/`；`C/` = `WT/apps/web/src/client/`；`P/` = `WT/apps/web/src/protocol/lab/`

类别（与 `GATES/pepgent26-web03.md` 相同）：
- **K1 既有决策已覆盖**：引用正文作答即可，属澄清。
- **K2 主路径外的失败或竞态**：`SOR/.claude/rules/design-assumes-it-works.md`，设计只写主路径。
- **K3 已通过契约内的私有实现**：D10-08；`SOR/AGENTS.md:123`，由工程师决定。
- **K4 缺契约**：意图、范围、D9 分类、跨仓公开契约或验收语义缺口，须表决（D10-08）。

---

## 一、共同依据

| # | 事实 | 来源 |
|---|---|---|
| G-1 | D31 定稿“承载与表决期（闸门 B）”：“自动化页的 WEB 投影由 W-10 在 WEB-05（Pepgent#25）承接，渲染 Automation 会话头、其首步在途槽位与交回入口”。表决行 D31-01 v1 只改 wire 与失效表；其“得到”栏写“Automation 会话首步无运行时的槽位有读方能显示、能交回”。 | (D) `DEC/D31-automation-conversation-heads.md:11,30` |
| G-2 | D31 闸门 B 判定前端侧：W-10 投影“归入 WEB-05……完全位于 D16-09/D20-01 授予 W-10 的既有前端路径域内，无需新增 issue 或改动白名单”；只有议案行要求变更 D16-09/D20 白名单时才加 `governance` 域。 | (D) `GATES/automation-slots-gate-b.md:23-27` |
| G-3 | D20-02：`features/lab-*/ui/**` 中 W-10 可写“真实数据取数；D12:568 规定留空字段的空值展示；演示 id 与固定回复的替换；把 reducer 动作接到 LabCommand（D7-17）；以及完成上述各项所需的最少 props 和条件渲染”；“不改 CSS、主题、类名、布局、视觉层级、组件结构以及与本次无关的文案”。D20-01：`features/lab-automation/{controller,model}/**`、`locales/lab-automation-copy.ts`、`client/**` 在 W-10 白名单内。 | (D) `DEC/D20-w10-path-boundary.md:31-32` |
| G-4 | 详情页交回的先例：#26 Q1 两道闸门均判 K1——“数据驱动的工具栏动作、`DialogSpecFixture`……与传入 `ActionDialog` 既有 `onDone` prop 均属 D20-02 允许的数据绑定与最少 props，不触及视觉层级或组件结构”。D36-02 v2 回写 D8：“派生、对比、交回：工具栏动作与数据驱动的 `DialogSpecFixture`，调用处传入 `ActionDialog` 已有的 `onDone`。” | (D) `GATES/pepgent26-web03-gate-a.md:15`；`GATES/pepgent26-web03-gate-b.md`（Q1 行）；`DEC/D8-mvp-scope.md:348` |
| G-5 | D7 `automation` 页行（D31 回写）：“readPage('automation') 返回 rules、runs、conversations、panels……槽位按 D12-04 挂载”；命令栏：“会话写与首步槽位交回仍按既有会话 owner 权限”。 | (D) `DEC/D7-lab-backend.md:100` |
| G-6 | D12-11：`intervene.takeover/answer` 带 `conversation`、`writerSession`、`slot` 与 `GuiHandback = { fields: Record<string, GuiReturned> }`，`GuiReturned` 为数值、字符串、布尔或 `file{artifact: ArtifactRef}`；Lab 按 `conversation.owner` 授权。P16 只假定“Lab 把 `ArtifactRef` 的字节放进持有槽位会话可读的位置”。 | (D) `DEC/D12-lab-wire.md:43,643`；`P/command.ts:40-50,100-101` |
| G-7 | 切片：WEB-05“投影：节点库、自动化”，依赖 WEB-02、LAB-09、LAB-10，解锁 F28–F30，验收“同上”（即 WEB-03/04 的纯函数投影单元测试）。F30 S2：“规则 A-01 命中……开出 origin 为 Automation 的会话，结论写回关联讨论。设为‘需批准’的规则停在 waiting，在浏览器中点击批准后才开会话”，不含交回。WEB-07 承担“运行时不再引用 `LAB_SNAPSHOT`”。 | (D) `DEC/D8-mvp-scope.md:149,339,341` |
| G-8 | 自动化页现有结构：最近运行行 `RecentRun` 与运行历史 `RunHistory` 各有一个按 `run.action !== null` 条件渲染的动作按钮位（目前放“批准”；历史另有“驳回”）；页面挂着由 `controller.dialog`（`DialogSpecFixture`）驱动的 `ActionDialog`。`DialogFieldFixture` 的 kind 为 `text/area/segmented/choice/multi/toggle/info/code`，没有文件字段。 | (R) `R/features/lab-automation/ui/automation-page.tsx:120-122` 及 `git diff` 中 `RecentRun`、`RunHistory` 两段；`C/contracts/lab-common.ts:157-185` |
| G-9 | 工人已在 model 中投影出会话视图：`id`、`rule`、`automationRun`、`owner`/`ownerName`、`agent`、`session`、`createdAt`、`canHandBack`（owner 是否为当前成员）、`slots`、该会话已建立的运行；运行视图按 `run.conversation` 挂上它。审批/驳回对话框按运行 id 生成 spec。 | (R) `C/services/lab/project-automation.ts:57-78,127-134`；`R/features/lab-automation/model/automation-view-model.ts:41-42,329-343` |
| G-10 | datasets 页 wire 带 `contexts: { conversation: ConversationId; artifacts: ArtifactRef[] }[]`；automation 页 wire 没有产物列表。 | (D) `DEC/D12-lab-wire.md:376`；`P/pages.ts:164-174` |

---

## 二、逐项初审

### Q1 自动化页渲染会话头、首步槽位与交回入口，是否需要 D20-02 例外

**工人提出的候选（A）：** (a) 给 WEB-05 开 D20-02 例外，在 `automation-page.tsx` 新增会话头、槽位列表与交回入口结构；(b) 改在 WEB-07 做（仍须配 a 或 e）；(c) 复用 AI 面板 sessions 列表；(d) 不新增结构：交回走运行行已有的动作按钮位与规格驱动的 `ActionDialog`，model 按 `awaiting_human.shape` 生成 `DialogSpec`（number/string → text，boolean → toggle），提交时组成 `intervene.answer{conversation, writerSession, slot, handback}`；owner、agent 与 running 槽位的事实放进运行行已有的 text/source 文本位；(e) 由视觉层 owner 新增结构。

**初分类：K1（澄清）。** 正文已给出在 D20-02 内完成的做法，就是候选 (d)：
- 交回入口：G-4 已把“工具栏动作 + 数据驱动 `DialogSpecFixture` + `ActionDialog`”判为 D20-02 允许的数据绑定，D8:348 把它写成详情页交回的做法。自动化页的对应物是运行行已有的条件动作按钮位和已挂的 `ActionDialog`（G-8）：按钮在 model 中由 `run.action` 的数据决定（批准或交回），只对 `canHandBack` 为真的成员出现，属于“把 reducer 动作接到 LabCommand”与“最少 props 和条件渲染”。
- 会话头与槽位：owner、agent、槽位状态是真实数据，放进已有的文本位，属于“真实数据取数”。不新增元素层级。
- D31 立案时闸门 B 已判定 W-10 侧落在 D20-01/02 既有路径域内、不需改白名单（G-2），D31 的通过以此为前提。
- (a)、(e) 都要修订 D20-02 或联系 U59 会话，正文没有这个需要；(c) 工人已说明承载不了。

- **A：** 会话头与槽位的事实进入运行行已有文本位、交回经已有动作按钮位与规格驱动的 `ActionDialog`，是否满足 D31 承载段“渲染会话头、首步在途槽位与交回入口”的意图，且不触及 D20-02 的“视觉层级、组件结构”？
- **B：** 改动只在 `features/lab-automation/{controller,model,ui}/**`（ui 限 D20-02 允许的行）、`locales/lab-automation-copy.ts`、`client/**` 内，是否不越界、不立案？

### Q2 承载切片：WEB-05 还是 WEB-07

**事实：** D31:11 写明由 WEB-05 承接并渲染（G-1），D31 闸门 B 同判（G-2）。工人 STARTED（[issuecomment-6563033322](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563033322)）写“按 D8:339 只交付纯函数投影与单测，页面接线归 WEB-07”(A)；但其 WEB-05 未提交改动已在 `automation-page.tsx` 中改写数据绑定行（G-8 的 diff）。WEB-07 承担去除运行时 `LAB_SNAPSHOT`（G-7）。D36-02 把详情页入口接线放进 WEB-07，是因为当时没有正文写明归属；本项有 D31:11 写明。

**初分类：K1。** 按 D31:11，自动化页的会话头、首步槽位与交回入口在 WEB-05 交付：投影（会话视图、按 shape 生成的交回 `DialogSpec`、`intervene.answer` 的组装）和 D20-02 允许的 UI 绑定行都在 WEB-05 的 PR 中；页面改为从后端读取真实数据，随 WEB-07 去除 `LAB_SNAPSHOT` 一并生效。WEB-05 的关闭条件仍是 G-7 的纯函数投影单元测试。候选 (b) 不采用。

- **A：** WEB-05 交付上述投影与绑定、真实数据随 WEB-07 生效，是否符合 D31:11 与 F30 的意图？
- **B：** 是否不涉及阶段门禁或切片承载的变更，不立案？

### Q3 文件型 shape 的交回（`GuiReturned.file`）

**事实：** D12-11 允许 `file{artifact: ArtifactRef}`（G-6），但没有任何正文规定 GUI 从哪些 `ArtifactRef` 中供人选择；P16 只规定选定后字节如何落到会话可读路径。`DialogFieldFixture` 没有文件字段（G-8），已有的 `choice` 字段可以列出候选项。automation 页 wire 没有产物列表；datasets 页 wire 按会话带上下文产物 `contexts`（G-10）。同一缺口也落在详情页的交回（WEB-07，D36-02 v2、D8:348），不只属于自动化页。F 流程中 F08 S2 的交回在详情页，F30 不含交回（G-7）。(R) `grep -rn "文件选择\|选择产物\|GuiReturned.file\|交回中的文件" PM/evidence/decisions PM/evidence/gates` 只命中 D12-11 与 P16。

**初分类：K4（缺契约）。** 文件型交回的候选来源（例如“该会话的上下文产物”，即 datasets 页 `contexts` 中该会话一项，用 `choice` 字段列出；或给 automation 页 wire 增加产物列表）决定人能交回什么，正文没有覆盖。前一种不改 wire，后一种要改 W-09 的 `protocol/lab/**`。由哪一种都须表决；工人自选任何一种都属于自定契约。

- **A：** GUI 文件型交回的候选产物范围是否属于未定的产品语义，须表决？若表决，是否把详情页（WEB-07）与自动化页（WEB-05）合为一行？
- **B：** 若选用增加 wire 字段，跨 W-09/W-10，是否属必须投票事项？表决前 W-10 对文件型字段只暂停这一部分（D10-08“只暂停依赖部分”），number/string/boolean 照常交付，是否合规？

### Q4 一次运行同时有多个 `awaiting_human` 槽位，只有一个按钮位

**事实：** 会话头的 `slots` 在无 Open 运行时为在线一代全部在途槽位（G-5、D31-01），可能同时有多个 `awaiting_human`。每次 `intervene.answer` 只针对一个 `slot`（G-6）。答复后 `conversation{id}` 使自动化页失效重读（D31-01、D12-17）。

**初分类：K3。** 一个按钮位依次处理：按钮指向一个 `awaiting_human` 槽位（顺序由工程师定，例如 `startedAt` 最早者），交回后页面按 D12-17 重读，按钮转到下一个；全部槽位的事实照常进文本位。这只是已通过契约内的呈现顺序，不新增结构，不需表决。

- **A：** 依次交回是否满足“首步槽位能交回”的意图？
- **B：** 是否不立案？

---

## 三、不受阻塞、照常交付的部分

工人列出的自动化投影（会话视图、首步槽位全部字段、运行建立后对应的目录实验运行）、按运行 id 的审批与驳回、节点库全部投影（A），与本材料无冲突，照常在 WEB-05 交付。

---

## 四、闸门判定后的程序

- 闸门结论写入 `GATES/pepgent25-web05-gate-a.md`（Argon）与 `GATES/pepgent25-web05-gate-b.md`（ArgonGovernance）。
- A、B 都确认不越界的项，在 #25 写结论评论并引用正文原文，由 Pepgent 片区经理（`AreaMgrPepgent`）送达 W-10。
- 任一闸门认定越界的项，合为一张 P0 议案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`），由本实例用 `council propose --seat Coordination --as DeskPepgent25Blocked` 立案。

## 五、处置结果

（闸门判定后填写。）
