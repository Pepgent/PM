# Pepgent#26（WEB-03）19:14Z 评论的闸门材料：Q1–Q3 与六项工人自定处理

- **issue：** [Pepgent/Pepgent#26](https://github.com/Pepgent/Pepgent/issues/26)，工人 W-10（tern 会话 `01a1984a-0d8b-745e-bb6b-5560f2f602e5`）。工作入口 `/Users/mouriya/Ext/worktrees/pepgent-web-home`，分支 `feat/web-03-experiments`，HEAD `1bf7683`（只读核对）。尚无 PR。
- **评论：** [issuecomment-6562604645](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562604645)。工人自标“非 BLOCKED”，但 Q1–Q3 明确请求对 D20-02 作意图与路径裁定，六项“实施取舍”由工人自定。按 `SOR/AGENTS.md:60`（C2-2）与 `DEC/D10-repo-delivery.md:20`（D10-08、D15-12），工人自标不改变处理程序：凡请求裁定的项和可能改变功能范围或验收语义的项，都必须过两道闸门。
- **编制：** governance-desk 实例 `DeskPepgent26Questions`（总协调席，与 Main 合计 1 票）。下文类别是起草者的初分，不是裁决。
- **程序：** 闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界的项按既有正文作答，不立案；任一闸门认定越界的项，并入一张 P0 议案立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件与源码，没有运行构建或测试，没有读 git 历史或 session，没有触碰 `Pepgent/Pepgent` 根 checkout（U59）。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`
- `WT/` = W-10 工作入口 `/Users/mouriya/Ext/worktrees/pepgent-web-home/`；`R/` = `WT/apps/web/src/renderer/`；`C/` = `WT/apps/web/src/client/`；`UI/` = `WT/packages/ui/src/lab/`

类别：
- **K1 既有决策已覆盖**：引用正文作答即可。
- **K2 主路径外的失败或竞态**：`SOR/.claude/rules/design-assumes-it-works.md`，设计只写主路径。
- **K3 已通过契约内的私有实现**：D10-08“已通过契约内单仓私有结构/算法/文件组织……由工程师决定”；`SOR/AGENTS.md:123`。
- **K4 契约、范围或验收语义缺口**：D10-08 规定须投票的类别，包括意图、范围、D9 分类、跨仓公开契约（wire、状态权威与生命周期等）和验收语义。

---

## 一、共同依据

| # | 事实 | 来源 |
|---|---|---|
| G-1 | D20-01：W-10 白名单为 `apps/web/src/client/**`、`apps/web/tests/e2e-lab/**`，加上 `_lab.tsx` 与 13 个页面路由、A 组 5 个文件、`lab-app.tsx`/`lab-runtime.tsx`/`contracts/lab-session.tsx`、`features/lab-*/controller/**`、`features/lab-*/model/**`、`locales/lab-*-copy.ts`、`tests/vitest/lab-*-view-model.test.ts`。`application/contracts` 中只有 `lab-session.tsx` 在范围内。 | (D) `DEC/D20-w10-path-boundary.md:31` |
| G-2 | D20-02：`features/lab-*/ui/**` 中由 W-10 写的行包括“真实数据取数；D12:568 规定留空字段的空值展示；演示 id 与固定回复的替换；把 reducer 动作接到 LabCommand（D7-17）；以及完成上述各项所需的最少 props 和条件渲染”。此外“不改 CSS、主题、类名、布局、视觉层级、组件结构以及与本次无关的文案”；“`renderer/styles/lab/**`、`renderer/platform/web/astryx-theme/**` 一律不写”；“每个 PR 的正文逐文件列出 UI 中改动的行及其用途”。分类为意图。 | (D) `DEC/D20-w10-path-boundary.md:32` |
| G-3 | D20 全文以及 D16、D25 都没有把 `packages/ui/**` 划给任何席位。`packages/ui/src/lab/time-axis.tsx`、`action-dialog.tsx` 都在 U59 会话自有改动清单内。D20 v4 依据的 Argon Q1【定】：C5-3.2 与 U59 只保护“不破坏、不回滚 U59 会话已合入的合法成果”，不表示它改过的文件永久不得再改。 | (R) `grep -rn "packages/ui" PM/evidence --include=*.md`（除 s01 取证外只命中 `PM/evidence/exec/d15/pepgent.md:417-613`）；(D) `DEC/D20-w10-path-boundary.md:12` |
| G-4 | WEB-03 行：投影 catalog、实验列表、实验详情（`RunGraph` 到 `ExperimentFlowFixture`，含时间轴、对比、派生导航、runner workspace）；解锁 F08、F10、F13、F18、F23–F26；验收为“纯函数投影的单元测试，输入是真实录制的线数据；录制中含 `Aborted` 变体的调用……投影出被中止的节点”。 | (D) `DEC/D8-mvp-scope.md:337` |
| G-5 | D12-05 `experiment` 参数：`{ ref: run \| draft; at; compare; workspace }`，分别对应回看 `graph?at=`、对比 `GET /compare` 与 Runner Workspace `GET /volumes/{run}/{step}/{position}`。D7 页面表 `experimentFlows` 的命令为 `intervene.*、run.abort、human.irc`，派生导航按 `graph.derivedFrom`。 | (D) `DEC/D12-lab-wire.md:37`；`DEC/D7-lab-backend.md:97` |
| G-6 | D12 不造数原则：“投影留空，不造数”；“原型里的演示值不得作为数据”。 | (D) `DEC/D12-lab-wire.md:27,599` |

---

## 二、Q1–Q3

### Q1 详情页补回看、对比、派生导航、runner workspace 与交回的入口

**事实**

| # | 事实 | 来源 |
|---|---|---|
| Q1-1 | 详情页工具栏由数据驱动：`view.toolbar.map((action) => <Button … onClick={() => controller.openDialog(action.request)} />)`。对话框由 `controller.dialog` 的 spec 驱动：`<ActionDialog spec={controller.dialog} copy={…} onClose={controller.closeDialog} />`。 | (D) `R/features/lab-experiment-detail/ui/experiment-detail-page.tsx:122-129,209-215` |
| Q1-2 | `ActionDialog`（`UI/action-dialog.tsx`，W-10 不能写）已有可选 `onDone` 属性，确认时调用 `onDone?.(state.values)`。工人说的“给 ActionDialog 补一个 `onDone` prop”，实际是在 `experiment-detail-page.tsx` 的调用处传入这个已有属性，不改 `packages/ui`。 | (D) `UI/action-dialog.tsx:203-220` |
| Q1-3 | 工具栏动作类型 `DetailActionButton`、`NODE_TONE` 与 `DialogSpecFixture` 分别在 `model/**` 与 `client/contracts/**`，都在 W-10 白名单内（G-1）。节点侧栏 `artifactsAndSignals` 行由 model 填数据：`rows: detailRows(node.detail.artifactsAndSignals)`。 | (D) `R/features/lab-experiment-detail/model/experiment-detail-view-model.ts:114-128,426-427`；`C/contracts/lab-experiments.ts:46`；`C/contracts/lab-common.ts:174` |
| Q1-4 | 这些入口所接的数据与命令都已有契约（G-5）；WEB-03 的范围本身就写了“时间轴、对比、派生导航、runner workspace”（G-4）。 | (D) G-4、G-5 |

**初分类：K1。** D20-02 的“把 reducer 动作接到 LabCommand（D7-17）；以及完成上述各项所需的最少 props 和条件渲染”覆盖了这种做法：入口作为 model 生成的工具栏数据与对话框 spec 出现；UI 文件只在调用处传入已有的 `onDone` 属性；workspace 卷清单作为数据放进已有的 `artifactsAndSignals` 行。三者都不改 CSS、类名、布局或组件结构。新入口用到的文案属于“与本次有关的文案”，写在 `locales/lab-experiment-detail-copy.ts`（G-1）。PR 正文按 D20-02 逐行列出 UI 改动。

- **A：** 新增入口以数据形式进入已有的工具栏与对话框，workspace 卷清单放进已有的 `artifactsAndSignals` 行，这两种做法是否都不触及 D20-02 的“视觉层级、组件结构”意图？
- **B：** 本项改动全部落在 G-1 白名单与 D20-02 允许的 UI 行内，不触及 `packages/ui`，是否不需要立案？

### Q2 被中止节点的状态色

**事实**

| # | 事实 | 来源 |
|---|---|---|
| Q2-1 | 视图状态类型 `FlowNodeStatus = 'done' \| 'running' \| 'waiting' \| 'pending' \| 'failed_verdict' \| 'flagged' \| 'planned' \| 'ai_suggestion'`，位于 `client/**`（W-10）。卡片色调表 `NODE_TONE: Record<FlowNodeStatus, DagCardTone>` 在 `model/**`（W-10）。状态文案在 `locales/lab-experiment-detail-copy.ts`（W-10）。 | (D) `C/contracts/lab-experiments.ts:12`；`R/features/lab-experiment-detail/model/experiment-detail-view-model.ts:114-123` |
| Q2-2 | 图例色点与状态标签的颜色由 `lab-experiment-detail.css` 按 `data-status` 逐个定义，是封闭词表；`background: var(--pepgent-lab-experiment-detail-status-color)` 没有回退值。没有对应规则的 `data-status` 不着色。 | (D) `R/styles/lab/lab-experiment-detail.css:90-132` |
| Q2-3 | `failed_verdict`、`flagged` 列在“第一版无来源字段”（D9 判为 `U`），不是被中止的含义。 | (D) `DEC/D12-lab-wire.md:607` |
| Q2-4 | 设计正文规定 `AbortedCall` 是独立变体，运行图投影必须保留它。WEB-03 验收只要求“投影出被中止的节点”，没有规定颜色。`SOR/design/` 中没有规定 GUI 颜色的条文。 | (D) `SOR/design/store.md:147`；G-4；(R) `grep -rn "中止\|Aborted" SOR/design` |

**初分类：K1。** 正文已经排除了工人列出的两个替代方案：
- “指定一个现有状态色”：要让被中止的节点带上别的状态的 `data-status`，等于把它说成另一种状态。可借用的 `failed_verdict`、`flagged` 都是无来源字段（Q2-3），违反 D12 不造数（G-6）。
- “修订 D20-01 允许加一行 CSS”：D20-02 写明“`renderer/styles/lab/**` 一律不写”。

正文允许的做法是：在 `FlowNodeStatus` 中加独立的 `aborted`（`client/**`），在 `NODE_TONE` 中映射到已有的 `DagCardTone`（`model/**`），在 locales 中加状态文案。图例与状态标签按无颜色规则显示，靠文案区分。这是 D20-02 的“最少 props 和条件渲染”加上 WEB-03 投影要求的组合。

- **A：** 被中止节点只靠文案区分、不着色，同时在 model 中给它选一个已有卡片色调，这样是否满足 G-4 的“投影出被中止的节点”，且不触及 D20-02 的“视觉层级”意图？在 model 中选择色调是否属于 W-10 可写的“条件渲染”？
- **B：** 若 A 判为 K1，是否不立案？若 A 认为必须有专属颜色，就要修订 D20-01/02 的 CSS 禁写约束，属于必须投票的路径事项。

### Q3 F10 要求的“拖动时间轴回看”

**事实**

| # | 事实 | 来源 |
|---|---|---|
| Q3-1 | F10 S2：“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”。流程目录原文：“或拖动时间轴游标指定序号 `k`”。 | (D) `DEC/D8-mvp-scope.md:129`；`PM/evidence/argon/flow-catalog.md:194` |
| Q3-2 | `GanttTimeAxis` 位于 `packages/ui/src/lab/time-axis.tsx`，属性只有 `{ scale, ticks, nowMinute }`，没有交互属性。详情页在 `DagCanvas` 的 `background` 中渲染它，并在 `overlay` 中渲染 `GanttNowChip`。 | (D) `UI/time-axis.tsx:122-135`；`R/features/lab-experiment-detail/ui/experiment-detail-page.tsx:158-170` |
| Q3-3 | `packages/ui/**` 不在任何席位白名单内（G-3）。若在 `features/lab-experiment-detail/ui/**` 里自建拖动层，就是新增组件结构，D20-02 不允许。 | (D) G-2、G-3 |
| Q3-4 | 工人的过渡做法是用“回看到这一步”动作提供 `at=k`，这本身属于 Q1 的数据驱动入口。 | (A) 评论 Q3 |

**初分类：K4（路径白名单缺口，并牵涉验收语义）。** 现有正文都没有覆盖这一项：F10 S2 的拖动交互没有可写方。改为按钮会改变 F10 S2 的验收语义，违背“全流程不收缩”（U2）；让 W-10 写 `packages/ui` 需要修订 D20-01。

- **A：** F10 S2 的“拖动时间轴”是否是验收语义，不能用“回看到这一步”按钮代替？
- **B：** `packages/ui/src/lab/time-axis.tsx` 应划给哪一席？这是否属于必须投票的白名单修订？

---

## 三、六项自定处理

| 项 | 工人做法（A） | 依据与事实 | 初分类 |
|---|---|---|---|
| ① 时间窗默认值 | 客户端取以 now 为中心的 4 小时，并限制在 now 所在的本地当天内；时间轴不处理跨日 | D12-05：`experiments` 参数为 `{ from: Instant; until: Instant }`（泳道时间窗），由读方给出；服务端注释 “the window is the client's”，返回值只有 `{templates, panels}`；没有任何 F 流程规定默认窗口；跨日属于主路径外情形 | **K3**（附带的跨日问题属 K2） |
| ② 泳道计划条留空，列入 D9 | 因为草稿没有计划起点，第一版不画计划条；冲突只在已知的实际区间之间计算 | D12-06：“计划时段取草稿节点估时（缺省用节点定义的 `estimateMinutes`）；冲突由投影算出（D7:96）”。D7 页面表：“计划时段取自草稿估时；冲突由投影算出”（`DEC/D7-lab-backend.md:96`）。正文给出了计划时段的来源，只有起点没写；D7-17 把“坐标、泳道……布局数学”交给投影。AGENTS：禁止据“缺某项”把功能移入 D9（`SOR/AGENTS.md:123`）；D9 分类须投票（D10-08）。D12:27 的“列入 D9”只适用于“D2–D7 没有任何权威源”的字段，计划时段不属于这种情况 | **K4**（范围与 D9 分类） |
| ③ 在途与已提交节点不关联定义 | `definitions` 来自库默认分支、没有版本键；在途与已提交节点的参数默认值留空，草稿节点照常使用默认分支定义 | D12-14：“投影按 `version` 关联节点定义，不用当前库默认分支代替”（`DEC/D12-lab-wire.md:46`）。但 D12-06 的 `experiment.definitions: NodeDefinition[]`（`:353`）取自默认分支（服务端 `context.library.read(lab)` → `library.output.nodes`，`WT/apps/web/src/server/lab/operations.ts:105,114`），`NodeDefinition` 类型没有版本（`:221-227`）。两条正文对同一页面给出不能同时满足的要求，缺口在 W-09 的线协议（`protocol/lab/**`）与服务端。工人留空的过渡做法符合 D12-14 与不造数原则 | 过渡：**K1**；缺口：**K4**（wire，跨 W-09/W-10） |
| ④ 详情页 run/draft 身份 | 只有 `$runId` 路由；loader 按目录判定：等于某 `ExperimentWire.run.run` 取 `{kind:'run'}`，等于未绑定草稿的 `draft.id` 取 `{kind:'draft'}`，都不是时 not found | D12-05 规定 `ref: run \| draft`；目录是实验的权威读取（D12-06“实验本身取自目录”）；`_lab.*.tsx` 在 W-10 白名单内，`application/contracts/destination.ts` 不在（G-1）。路由编码没有规定；两类不透明 id 碰撞属于主路径外情形 | **K3**（碰撞问题属 K2） |
| ⑤ 切换 Lab 写入 Better Auth active organization | 不再保留 renderer 本地 `labId`；切换写入 Better Auth 会话的 active organization，`_lab` 用它调 `readCatalog` 并重订阅 events。工人自述的行为变化：选择随登录会话保留，多个标签页共享 | D12-02：`LabId` = Better Auth organization id；D12-04：`readCatalog(lab: LabId \| null)`、目录带“所选 Lab”（`DEC/D12-lab-wire.md:36,294,378`）。服务端对 `null` 取 `organizations[0]`，不读 active organization（`WT/apps/web/src/server/lab/catalog.ts:47`）。正文没有规定“所选 Lab”由谁持有、生命周期多长；工人方案把它从页面状态改为服务端持久的会话状态，改变了用户可见行为 | 交闸门判定：K3（契约只规定由读方传 `lab`，存放位置属实现）或 K4（D10-08 的“状态权威与生命周期”） |
| ⑥ 投影测试的真实录制 | 用现有录制（Root-only、`?at=1` Open 快照、S1 SameValue 对比、历史 Human Call 图）；AbortedCall 与 derivedFrom 的投影等 #30 F24 阶段保存的图补测 | #26 正文：“本仓代码完成后做必要编译/类型/基础检查即可合入；上述跨组件真实结果在统一 e2e 承接项验证”。#30 的 #26 来源节保留原义务原文，并写“原业务契约保留，不作为开发期开工或合并锁”。D16-06/D16-13：代码完成前不写测试，最终统一验收。投影代码本身仍须实现 `AbortedCall` → 被中止节点（G-4、`SOR/design/store.md:147`），只有录制输入的补测后移 | **K1** |

附带登记（不在本次范围）：工人报告中心 store 的 `/compare` 与 `/volumes` 返回 404 `Route does not exist`（(A) 评论 ⑥）。这属于跨组件接缝观察，按 C1-3 由接缝金丝雀或 W-08 承接，本材料不作分类。

### 闸门 A 的问题（交 `Argon`）

- **A-②：** 计划条是否属于 D12-06、D7:96 已定的页面功能，不能由工人自定留空、移入 D9？
- **A-③：** D12-06 的 `definitions` 与 D12-14 的“按 version 关联”冲突，是否需要表决补齐线协议？
- **A-⑤：** 把“所选 Lab”改为随登录会话保留、多标签页共享，是否触及产品意图或状态权威？
- **A-①④⑥：** 是否同意初分类（①④ 属 K3，⑥ 属 K1）？

### 闸门 B 的问题（交 `ArgonGovernance`）

- **B-③：** 补齐版本化定义要改 W-09 的 `protocol/lab/**` 与 `server/lab/**`，是否属于必须投票的跨席位事项？过渡期 W-10 留空是否符合 D10-08“只暂停依赖部分”？
- **B-②⑤：** 工人把功能移入 D9（②）、改变状态的持有位置（⑤），是否属于 D10-08 规定须由领导层表决、工人不能自定的类别？
- **B-①④⑥：** 是否同意这三项不立案？

---

## 四、闸门判定后的程序

- A、B 都确认不越界的项，在 #26 写结论评论并引用正文原文，由 Pepgent 片区经理（`AreaMgrPepgent`）送达 W-10。
- 任一闸门认定越界的项，合为一张 P0 议案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`），由本实例用 `council propose --seat Coordination --as DeskPepgent26Questions` 立案。
- 闸门结论写入 `PM/evidence/gates/pepgent26-web03-gate-a.md`（Argon）与 `PM/evidence/gates/pepgent26-web03-gate-b.md`（ArgonGovernance）。

## 五、处置结果

- **闸门结论：** 闸门 A 见 `pepgent26-web03-gate-a.md`（PM `003c75e`），闸门 B 见 `pepgent26-web03-gate-b.md`（PM `46bb432`）。
- **两道闸门都判不越界，按正文作答，不立案：** Q1（K1）、Q2（K1：独立 `aborted` 状态，`NODE_TONE` 映射已有色调，图例不着色）、①（K3）、④（K3）、⑥（K1）、③ 的过渡做法（K1）。⑤ 的工人方案被两道闸门驳回，改按 D12-03/04 由客户端持有 `selectedLabId`（K1）。结论评论：[Pepgent#26 issuecomment-6562796849](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562796849)。
- **立案：** D35（[Pepgent/PM#54](https://github.com/Pepgent/PM/issues/54)，P0），由 `DeskPepgent26Questions` 以 Coordination 席发起。
  - D35-01：Q3，`packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划给 W-10，治理领域。
  - D35-02：②，`experiments.definitions` 与计划条投影规则。
  - D35-03：③，`experiment.versionedDefinitions`。
- **送达：** 由 AreaMgrPepgent 把结论评论送达 W-10；D35 各行通过后，再送达 W-09（线协议与服务端）与 W-10。
