# D35：Pepgent#26 WEB-03：时间轴拖动的写方、泳道计划条、版本化节点定义（P0）——定稿

决策 issue：[Pepgent/PM#54](https://github.com/Pepgent/PM/issues/54)。发起：Coordination（DeskPepgent26Questions）。本文件由议会 daemon 生成。

## 事实

**来源：** W-10 在 [Pepgent#26 评论 6562604645](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562604645) 自标“非 BLOCKED”，但请求 D20-02 意图与路径裁定（Q1–Q3），并自定了六项处理。初审材料：PM `evidence/gates/pepgent26-web03.md`。两道闸门：闸门 A `evidence/gates/pepgent26-web03-gate-a.md`（Argon，PM `003c75e`），闸门 B `evidence/gates/pepgent26-web03-gate-b.md`（ArgonGovernance，PM `46bb432`）。两道闸门都判越界的三项进入本表：Q3、自定 ②、自定 ③ 的线协议缺口。Q1、Q2、①、④、⑥、③ 的过渡做法，以及 ⑤（驳回工人方案，按 D12-03/04 由客户端持有所选 Lab），两道闸门都判为不越界，已在 #26 按正文作答，不进入本表。

**事实（来源标记：(U) 用户原话，(D) 文档或源码原文）：**
- (D) F10 S2：“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”（`D8-mvp-scope.md:129`）；流程目录：“或拖动时间轴游标指定序号 `k`”（`evidence/argon/flow-catalog.md:194`）。(U) U2 全流程不收缩。
- (D) `GanttTimeAxis` 位于 `packages/ui/src/lab/time-axis.tsx`，属性只有 `{ scale, ticks, nowMinute }`（:122-135）。`packages/ui/**` 不在 D16-09、D20-01、D25 的任何席位白名单内；它属于 U59 会话的自有改动（`evidence/exec/d15/pepgent.md:599-613`）。D20 Q1【定】：U59 只保护不破坏、不回滚其已合入成果，不表示它改过的文件永久不得再改（`D20-w10-path-boundary.md:12`）。D20-02 禁止 W-10 在 `features/lab-*/ui/**` 新增组件结构（:32）。
- (D) D12-06：“计划时段取草稿节点估时（缺省用节点定义的 `estimateMinutes`）……冲突由投影算出（D7:96）”（`D12-lab-wire.md:38`）；D7 页面表同义（`D7-lab-backend.md:96`）；覆盖审计把草稿计划的 `startMinute/endMinute` 列为 C：“以页面计划锚点累计 DraftNode.estimateMinutes；只标 planned，不冒充实际执行”（`D12-coverage.md:163`）。计划条不在“第一版无来源字段”表内（`D12-lab-wire.md:597-616`）。`DraftNode` 只有 `fn`、`from`、`estimateMinutes`，没有 `template`（:204-212）；默认估时与 `template` 都在 `NodeDefinition`（:221-229）。但 `LabPageWire['experiments']` 只有 `{ templates, panels }`，没有定义（:351）。工人做法：不画计划条，并列入 D9（AGENTS:123 与 D10-08 禁止工人自定）。
- (D) D12-14：“投影按 `version` 关联节点定义，不用当前库默认分支代替”（`D12-lab-wire.md:46`）。但 `LabPageWire['experiment'].definitions: NodeDefinition[]`（:353）没有版本键，服务端取库默认分支（`apps/web/src/server/lab/operations.ts:105,114`）。两条正文对同一页面的要求不能同时满足。store 有 `GET /versions/{version}`，可读出 `NodeVersionRecord`（commit、源码清单等）（`soroi design/store.md:158`）。
- 线协议 `apps/web/src/protocol/lab/**` 与服务端 `apps/web/src/server/lab/**` 归 W-09；投影、路由与 `features/lab-*/{model,controller}/**` 归 W-10（D16-09、D20-01）。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D35-01 v3 | F10 S2“拖动时间轴回看”的写方：把 `packages/ui/src/lab/time-axis.tsx` 划给 W-10，并由 W-09 在 `experiment` 页带出提交时间轴 | D20-01 中 W-10 一行；`packages/ui/src/lab/time-axis.tsx`、`packages/ui/src/lab/time-axis-model.ts`；`apps/web/src/renderer/features/lab-experiment-detail/{model,controller,ui}/**`（W-10）；D12-06 `LabPageWire['experiment']`；`apps/web/src/protocol/lab/pages.ts`、`apps/web/src/server/lab/operations.ts` 的 `experiment` 页读取（W-09） | D20-01 的 W-10 白名单加入 `packages/ui/src/lab/time-axis.tsx` 与 `packages/ui/src/lab/time-axis-model.ts`。用途只限于给 `GanttTimeAxis` / `GanttNowChip` 增加两类属性：回看游标的受控位置，以及拖动或点选的回调。不改 CSS、类名、布局与视觉外观；`packages/ui` 的其余文件不在范围内。U59 保护约束与 D20-01 相同：从最新 `origin/main` 接续，不删除、不回退、不覆盖已合入的结构与语义。<br>**提交时间轴（W-09）：** `LabPageWire['experiment']` 增加 `commits: { seq: Seq; at: Instant }[]`，`ref` 为草稿时为 `[]`。服务端读该页时先取 `GET /runs/{run}/graph` 得到其 `at`，再读 `GET /runs/{run}/stream?after=0` 直到序号 `at`，按序收集每个提交级事件（携带 `records` 的 `run_started` 与 `step_committed`，soroi `packages/store/src/contract.ts:249-256`）的 `seq` 与 `at`。只有根值、没有调用的提交同样在列。<br>**投影（按 D39-01 v3 how 1–3）：**<br>1. **提交标记 `commitMarkers(commits, derivedFrom, pixelsPerMinute)`（W-10 model 纯函数，新文件 `commit-markers.ts`）：** 输入页面数据已有的 `commits`（`FlowCommit { seq, minute }`，`lab-experiments.ts:132-135`）、`derivedFrom`（`FlowBase`，`lab-experiments.ts:122-123`）与当前 scale 的 `pixelsPerMinute`；输出与 `FlowCommit` 同形的标记 `{ seq, minute: μ }`。<br>   - **每次提交一个标记，按 seq 区分：** 提交的身份是 seq，不以 `minute` 相等判同一提交。store 每次提交各取一次毫秒时刻（soroi `packages/store/src/store.ts:291`），没有不同提交 `at` 唯一的约束（`contract.ts:252-256`），两次串行提交可以同一 `minute` 而运行图不同。<br>   - **唯一的例外：** `derivedFrom === null`（非派生运行）时，seq 1（`run_started`）不单列标记。它与第一次 `step_committed`（seq 2）在同一事务、同一 `at` 写入（`store.ts:291-309`），按 soroi `design/store.md:137`，该提交的记录在 seq 2 整体生效，seq 1 不是另一项已提交状态。派生运行的 seq 1 是物化锚点，与后续提交不在同一事务（`store.ts:513-516`，`design/store.md:94`），照常单列。<br>   - **位置：** 标记按 seq 升序排列。第一个标记的位置 `μ₁` 取其 `minute`；之后每个 `μᵢ = max(minuteᵢ, μᵢ₋₁ + d / pixelsPerMinute)`，`d = 4px`（与同页卡片间距 `timedCardBoxes` 的 `gap: 4` 同值，`experiment-detail-view-model.ts:363`）。相邻提交在轴上相距不少于 4px 时，`μ` 就是提交本身的 `minute`；更密或同刻时依次右移，每个标记各占至少 4px。`μ` 随 seq 严格递增。<br>2. **游标 → k：** controller 调用现有的 `replayAt(commitMarkers(commits, derivedFrom, pixelsPerMinute), T)`，`pixelsPerMinute` 取页面时间轴 `scale` 的同一值，T 为 `packages/ui` 已有的 `axisMinute` 换算的分钟（不改）。`replay-at.ts:14-21` 作用在标记上，因 `μ` 随 seq 严格递增，结果为：T 处在或晚于最后一个标记的 `μ` 时 `at = null`（实时）；否则 `k` 取 `μ ≤ max(T, μ₁)` 的最后一个标记的 seq，以 `at=k` 读取 `rewind`（D12-05）。PR#75 的左侧 padding 钳位随之保留。<br>3. **游标画线（W-10 model）：** 回看时，`experiment-detail-view-model.ts` 用同一 `pixelsPerMinute` 生成同一组标记，`cursor.minute` 取 seq 不超过 `rewoundTo` 的最后一个标记的 `μ`（没有时取第一个标记，同现有回退），经 `GanttTimeAxis` / `GanttNowChip` 已有的 `cursorMinute` 属性画出；游标标签仍用该提交本身的 `minute` 与 `rewoundTo`（`copy.replay`）。<br>不从 `Call` / `AbortedCall` 的 `step` 或 `endedAt` 反推提交。`experiment-detail-page.tsx` 按 D20-02 只传入位置与回调。“回看到这一步”工具栏动作可以作为辅助入口保留，但不能代替拖动。PR 正文按 D20-02 逐行列出 `packages/ui` 中改动的行。D39 的标记、controller 接线与画线由 WEB-07 承接，不改 `replay-at.ts` 及其测试、`packages/ui`、wire 或白名单。 | **得到：** 游标能落到每一次已提交的状态（含只有根值的提交、同一 minute 的不同提交）；F10 S2“拖动时间轴，看到与 `at=k` 一致的节点集合”对每个已提交的 k 经拖动成立，不以辅助按钮代替拖动。相邻提交在轴上相距 4px 以上时，映射与原按时刻公式逐点相同；只有已由源码证实为同一事务的非派生 seq 1 并入 seq 2。D39 写入的文件都在 D20-01 W-10 白名单的 glob 内，PR#75 已合入的 `replay-at.ts` 与 `lab-replay-at.test.ts` 不动，不动 `packages/ui`、wire 与席位边界。<br>**代价：** W-10 要在 U59 的共享组件里做一处最少的交互接线，与外部会话可能在同一文件上冲突，按 rebase 处理；W-09 给 `experiment` 页加一个字段，服务端每次读该页多读一遍该运行的事件流。<br>**落选：**<br>- 用“回看到这一步”按钮代替拖动：改变 F10 S2 的验收语义，违背 U2（闸门 A）。<br>- 在 `features/.../ui` 中自建拖动层：新增组件结构，违背 D20-02。<br>- 新设前端席位：只为两个属性增设席位，还要另行派工。<br>- 从最新 `graph` 的 `Call` / `AbortedCall` 节点 `step` 与 `endedAt` 反推提交（v2）：`Root` 节点不带 `step` 与时刻（`contract.ts:152`），只有根值的提交（`StepSchema` 的 `calls` 可为空，`contract.ts:67-76`；WEB-03 现有真实录制即为这种提交）拖不到；`endedAt` 早于提交时刻（store `design/store.md:95` 步内全部调用结束后才一次提交），会在提交之前显示提交后的事实（LeadMentor 反例）。<br>- 由 store 新增提交时间轴端点：跨仓改 store 契约；现有 `stream` 已带全部提交级事件的 `seq` 与 `at`。 | 治理 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD35v3）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D35-02 v3 | 泳道计划条：`experiments` 页补节点定义，并规定计划起点的投影规则（不列入 D9） | D12-06；`LabPageWire['experiments']`（D12:351）；`apps/web/src/protocol/lab/**`、`apps/web/src/server/lab/operations.ts#readExperiments`（W-09）；`features/lab-experiments/model/**` 与 `apps/web/src/client/**` 中的投影（W-10） | **线协议（W-09）：** `LabPageWire['experiments']` 增加 `definitions: NodeDefinition[]`，取库默认分支，与 `flowEditor.palette` 同源（服务端 `context.library.read(lab)`）。<br>**投影（W-10）：**<br>- 计划条只画尚未开始执行的未绑定草稿，即 `ExperimentWire.run` 为 null、`draft` 非空，且不满足“`pendingLaunch.state = 'sent'` 且 `slots` 非空”的实验项（D12-04“实验为各 ext 对应运行与未绑定草稿”；D6-12 草稿是“尚未开始的实验画布”，从不被执行）。`pendingLaunch.state = 'sent'` 且 `slots` 非空的实验项已由第一正式步开始执行：运行要到第一次正式提交才建立（D6-05），其间在途槽位按 D12-04 挂载表挂在该 pendingLaunch 实验项上。这类项按已开始处理，不画计划条，只画在途槽位的实际时段。<br>- 已绑定运行的实验项（含 `Open`）不画计划条，泳道区间只取已提交调用与在途槽位的实际时段（D12-06、D12-14）。其源草稿 `ExperimentWire.draft` 只是索引，不与调用或槽位逐节点对应，投影不按 `fn`、画布顺序或调用次序做这种对应。<br>- 草稿节点按 `fn` 关联 `definitions`。<br>- 时长取 `DraftNode.estimateMinutes ?? NodeDefinition.estimateMinutes`。<br>- 泳道由 `NodeDefinition.defaultEnvironment` 对应模板经 `templates` 的设备（P3）确定；没有关联到模板的节点仍参与依赖累计，但不画计划条（D41-02 v2）。<br>- 起点按 `DraftNode.from` 的拓扑顺序累加：节点起点 = 各上游结束时刻中的最大值。<br>- 根节点的锚点取 `now`。<br>- 区间只标 `planned`，不冒充实际执行（D12-coverage:163）。<br>**冲突：** 由投影在同一设备泳道内的计划区间与实际区间之间算出（D7:96）。<br>计划条不列入 D9。 | **得到：** D12-06 与 D7:96 已定的功能不收缩；计划只由草稿与定义算出，不进后端存储（与 D12-06“后端不存坐标”一致）；不需要草稿节点与调用之间不存在的对应关系。<br>**代价：** 未启动草稿的计划随 `now` 平移；`experiments` 页多带一份默认分支定义；`Open` 运行尚未执行的剩余步骤不显示计划条。<br>**落选：**<br>- 工人方案（留空并列入 D9）：收缩已定功能，违背 AGENTS:123 与 D10-08。<br>- 由后端存计划起点：违背 D12-06“后端不存坐标”。<br>- 对 `Open` 运行源草稿中“尚未完成”的节点画计划条（v1）：要知道每次调用执行的是哪个草稿节点，而 store `Call`/`SlotState` 没有草稿节点身份，`fn` 在一张草稿中可以重复（LeadMentor 反例）；按 `fn` 或顺序匹配会把计划索引当成进度事实。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD35v3）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |
| D35-03 v1 | `experiment` 页补版本化节点定义，消除 D12-06 与 D12-14 的冲突 | D12-06；`LabPageWire['experiment']`（D12:353）；`apps/web/src/protocol/lab/**`、`apps/web/src/server/lab/operations.ts#readExperiment`（W-09）；实验详情投影（W-10） | 修订 D12-06：`LabPageWire['experiment']` 增加 `versionedDefinitions: { version: Version; definition: NodeDefinition }[]`，覆盖该运行图中各 `Call.version` 与目录在途槽位 `SlotState.version`（D12-14）出现的每个版本。<br>服务端按版本静态导出定义：<br>- 已提交的版本取 store `GET /versions/{version}` 的 `NodeVersionRecord`（commit 与源码）。<br>- 尚未提交的在途版本从持槽会话的 worktree 导出（占位，假定能工作）。<br>`definitions` 保持库默认分支，只供草稿节点使用。投影按 `version` 关联定义（D12-14）。W-09 改线协议与服务端，W-10 消费。<br>过渡期内，W-10 对在途与已提交节点不关联定义、参数默认值留空（两道闸门已确认）。 | **得到：** D12-06 与 D12-14 一致；在途与已提交节点显示其实际版本的参数默认值，不用默认分支冒充。<br>**代价：** 服务端读页面时要多做一次按版本导出。<br>**落选：**<br>- 用默认分支代替：D12-14 已否决。<br>- 长期留空：D12-06 写明“`definitions` 给节点参数默认值”，在途与已提交节点会一直缺这项。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD35）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

- D35-01 v2（DeskD35Revise，2026-11-01T19:38:03.494Z）：D35-01 v2：采纳 ClaudeHigh 反例（`/tmp/D35-01-counter-claude-high.md`）给出的修订，只改 how 中“游标时刻 → k”一句，路径授权不变。

已用 gh api 核对反例引用（soroi main `96fcfae`、Pepgent main `05756a5`）：
- soroi `packages/store/src/contract.ts:252-256`：提交级事件的 `seq`/`at` 只在 `RunEvent`；:257 注释“`(step, position)` addresses the node carried by commit-level event `step`”。
- `contract.ts:153-162`：`Call`/`AbortedCall` 都带 `step`、`startedAt`、`endedAt`；`RunGraphSchema`（:184-188）只有当前 `at`，没有各步时刻。
- Pepgent `apps/web/src/protocol/lab/catalog.ts:23-38`：`ExperimentWire.graph` 为最新提交的运行图，无事件列表。
- Pepgent `apps/web/src/server/lab/experiments.ts:151-155`：读 `RunEvent` 流后只发布 `{ kind: 'run', run }`。

v2 用线上已有的节点 `step` 与 `endedAt` 在 W-10 model 内计算 `k`，游标处在或晚于最新提交时 `at = null`，不改 wire。

- D35-01 v3（DeskD35v3，2026-11-01T19:48:53.714Z）：D35-01 v3：LeadMentor 的 v2 反例（“从 Call 节点反推提交时间轴会漏掉合法 Root-only 提交”）成立，按其修正边界“给覆盖全部提交的真实 seq/at 来源，必要时由 W-09 补明确 wire”修订。路径授权段不变；新增 W-09 的 `commits` 字段，W-10 的映射改用它。

对照 store 契约核实三件事（soroi main `96fcfae`、Pepgent main `05756a5`、PM main `7a82a5f`，均以 gh api 读取）：

1. **Root-only 提交存在，且在主路径上。** `packages/store/src/contract.ts:67-76`：`StepSchema` 的 `roots` 与 `calls` 是两个独立数组，没有“每次提交至少一个调用”的约束。PM `evidence/gates/pepgent26-web03.md:101`：WEB-03 投影测试用的现有真实录制就包含 Root-only、`?at=1` 的 Open 快照。
2. **它的时刻（以及序号）在 Lab 线上取不到。** `contract.ts:152`：`Root` 节点只有 `kind/name/value`，没有 `step`，也没有时刻；`RunGraph`（:184-188）只有当前 `at`；`RunSummary`（:190-192）只有运行的起止时刻。提交级事件的 `seq/at` 只在 `RunEvent`（:249-256）。Pepgent `apps/web/src/server/lab/experiments.ts:151-155` 读运行事件流后只发布 `{ kind: 'run', run }`；`LabPageWire['experiment']`（`apps/web/src/protocol/lab/pages.ts:145-153`）没有事件或提交列表。
3. **F10 S2 在主路径上失效。** S2 是“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”（`D8-mvp-scope.md:129`），其中的 k 由拖动指定：流程目录 F10 第 2 步是“拖动时间轴游标指定序号 `k`”，标题是“任意历史序号 `k` 状态回看”（`evidence/argon/flow-catalog.md:190,194`）。v2 的候选集只含带调用的提交，所以 Root-only 提交的 k 永远拖不到。LeadMentor 例子里 s1、s2 的已提交状态无法回看；游标落在 Root-only 提交与下一次带调用提交之间时，显示的是更早的 k，而不是该时刻已提交的状态。另外，v2 取 `max(endedAt)` 作为步的时刻，可这个时刻早于提交：store `design/store.md:95` 写明步内全部调用结束后才一次提交，:148 写明活动时刻不与 `RunGraph` 的已提交状态混同。ClaudeHigh 的选票认为“拖到的任何 k 显示的仍是合法 `at=k`”，这只保证了拖到的那个 k 显示正确，保证不了 F10 要求的“任意历史序号 k”都能经拖动指定。

修订：W-09 在 `experiment` 页增加 `commits: { seq, at }[]`。服务端先取 `graph` 得到 `at`，再读已有的 `GET /runs/{run}/stream?after=0` 到该序号为止，按序收集 `run_started` / `step_committed` 的 `seq` 与 `at`（`design/store.md:149` 已规定“读方先取 graph 快照拿到当前 at 序号”这一顺序）。W-10 用 `k = max{ seq ∈ commits | at(seq) ≤ T }`。v1 只缺这条 wire 授权（ClaudeHigh 的 v1 反例），v3 由本行授权 W-09，所以不会再回到 v1 的失效点。不改 store，也不新增席位。

- D35-02 v2（DeskD35Revise，2026-11-01T19:38:22.483Z）：D35-02 v2：LeadMentor 反例成立，改为反例给出的第二条路“不依赖该对应的纯计划投影语义”，只改 how 中 Open 运行一支。

核对（PM main `632b4b2`、soroi main `96fcfae`、Pepgent main `05756a5`）：
- D12-lab-wire.md:204-212：`DraftNode{id, fn, from, arm, …}`，`id` 画布内唯一，`fn` 可重复。
- soroi `packages/store/src/contract.ts:153-162`：`Call`/`AbortedCall` 以 `step`/`position` 标识，无草稿节点身份；D12-lab-wire.md 的 `SlotState`（D12-14 补 `startedAt/version/inputs`）同样没有。
- `ExperimentExtWire.draft` 只是整次运行的来源草稿；Pepgent `apps/web/src/protocol/lab/catalog.ts` 注释：“The unbound draft, or the source draft of a bound run.”
- D6-store-service.md:40（D6-12）：草稿“从不被执行，也不进 store”。
- 因此 v1 的“Open 运行所绑定草稿中尚未完成的节点”在 a、b 同为 `measure` 时不可判定；按 `fn` 对应（ClaudeHigh 选票的说明）在该例下同样无法区分 a、b。

正文依据：D12-04 目录“实验为各 ext 对应运行与未绑定草稿”；D12-06 实际时段取调用起止与槽位 `startedAt`、计划时段取草稿估时；D12-coverage:161-164 分列“已提交调用 / 草稿计划 / 在途运行”三种来源。v2 让计划条只来自未绑定草稿，绑定运行只显示实际区间，D12-06、D7:96 已定的计划条与冲突功能保留，不进 D9。

- D35-02 v3（DeskD35v3，2026-11-01T19:48:53.650Z）：D35-02 v3：采纳 ClaudeHigh 的 v2 反例（`/tmp/D35-02-v2-counter-claude-high.md`）末尾给出的修订。how 只改“投影”的两处：第一条的计划条判据，以及根节点锚点；线协议、分工、冲突规则与取舍不变。

已用 gh api 核对反例引用（PM main `7a82a5f`、Pepgent main `05756a5`）：
- `evidence/decisions/D6-store-service.md:33`（D6-05）：“它的第一次正式提交……由 eval 插件带上 `open: { session }`，store 在同一事务里建运行、写 `run_started`”。第一正式步在途期间没有运行。
- `D12-lab-wire.md:56`（D12-04 挂载表）：“无运行、Discussion 来源、有 pendingLaunch → 该 pendingLaunch 实验项的 `ExperimentWire.slots`”。
- `D12-lab-wire.md:166`：`PendingLaunchWire.at` 是启动意图的时刻，`state: 'awaiting_approval' | 'sent'`。
- `D12-lab-wire.md:553`：`sent` 的 pending 由随后的非派生 `run_started` 绑定到运行。
- `D29-pepgent-20-slot-overlay.md:20`（F4）：第一步正式运行在途期间没有运行，也没有 `experiment_ext`；dry run 不开槽位。
- Pepgent `apps/web/src/protocol/lab/catalog.ts:23-40`：`ExperimentWire.slots` 注释写明“with no run, on a Discussion's pending-launch item”。

结论：v2 的判据“`run` 为 null、`draft` 非空”会把第一正式步在途的实验项当作未开始的草稿，同时画出它的计划条和它自己的在途实际区间。v3 把满足“`pendingLaunch.state = 'sent'` 且 `slots` 非空”的项按已开始处理，只画实际时段。`pendingLaunch.at` 不晚于 now，所以根锚点直接写 `now`。


## 原票

各席原票见 `votes/D35-Coordination.md`、`votes/D35-ClaudeHigh.md`、`votes/D35-Argon.md`、`votes/D35-LeadMentor.md`、`votes/D35-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。