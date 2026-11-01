# D35 选票：ClaudeHigh

议程：Pepgent#26 WEB-03：时间轴拖动的写方、泳道计划条、版本化节点定义（[Pepgent/PM#54](https://github.com/Pepgent/PM/issues/54)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D35-01 v1：反对（ClaudeHighD35，2026-11-01T19:35:36.669Z）——作废：该行已修订到 v3

**反例：** ## D35-01 v1 反例（ClaudeHigh，ClaudeHighD35）：how 指定的“游标时刻 → k”映射所需的数据不在 Lab 线上，F10 S2 主路径按正文无法实现

**失效点（主路径，不是边缘情况）：** 用户在实验详情页拖动时间轴，每一次拖动都要把游标时刻 T 变成 `at=k`。D35-01 的 how 规定：“投影（model）把游标所在时刻映射为**不晚于该时刻的最后一个提交级事件序号 k**”。这要求客户端知道每个提交级事件（`step_committed`，派生运行另有 `seq=1` 的 `run_started`）的 `seq` 及其时刻 `at`。客户端拿不到这些时刻。

**可复现核对（只读文件即可）：**
1. 提交级事件的时刻只存在于 store 的 `RunEvent`：`pepgent-store/contract.ts:252-256`（`eventFields = { seq, at }`，`step_committed` 带 `seq`、`at`）。
2. Lab 线上能拿到的运行事实只有这些，均不含提交时刻：
   - `RunGraphSchema`（`contract.ts:184-187`）：`{ run, holder, derivedFrom, state, at, nodes, edges, unconsumed }`；其中 `at` 只是当前最大序号。
   - `CompletedNodeSchema` / `AbortedNodeSchema`（`contract.ts:153-162`）：有 `step`、`startedAt`、`endedAt`，没有提交时刻。
   - `RunSummarySchema`（`contract.ts:190-192`）：只有运行的 `startedAt/endedAt`。
   - `ExperimentWire`（D12:273-282；W-10 工作入口 `apps/web/src/protocol/lab/catalog.ts:23-38`）与 `LabPageWire['experiment']`（D12:352-353；`protocol/lab/pages.ts:145-149`）都没有事件列表。
3. 服务端读取 `RunEvent` 流后只向浏览器发布 `{ kind: 'run', run }`，不转发 `seq/at`：`apps/web/src/server/lab/experiments.ts:151-155`。前端只能经 Lab 后端读数据（D2-18），W-10 不能直连 store。

**后果：** 按正文实现，W-10 只有两条路：要求 W-09 在线上补提交时刻（跨席位的 wire 改动，D35-01 没有授权，D10-08 规定须投票）；或者自定一个替代口径（这又是工人自定验收语义）。两条路都会让 #26 再次回到“请求裁定”的状态，D35-01 承诺的“F10 S2 在主路径上可达”不成立。

**可以清零的修订（只改 how 中的一句，不改路径授权）：** 用已在线上的数据定义映射。依据是 `contract.ts:257` 的注释：“`(step, position)` addresses the node carried by commit-level event `step`”，也就是说节点的 `step` 本身就是提交级事件的序号。
- 候选 k 取最新 `ExperimentWire.graph` 中 `Call` / `AbortedCall` 节点 `step` 的去重集合。
- 步 s 的时刻取该步全部节点 `endedAt` 的最大值。
- 游标时刻 T 映射为 `k = max{ s | 时刻(s) ≤ T }`。游标处在或晚于最新提交时，`at = null`（实时）。

这样全部计算都在 W-10 的 model 内完成，不改 wire。由于 `rewind` 本来就是服务端按 `graph?at=k` 读出的，S2“看到与 `at=k` 一致的节点集合”在构造上成立。路径授权部分（`time-axis.tsx` / `time-axis-model.ts` 划给 W-10，只加受控位置与回调，不改 CSS）我赞成；见选票理由。


# D35 ClaudeHigh 选票（实例 ClaudeHighD35，空白历史）

我直接读了这些源头：PM#54 正文；闸门材料 `evidence/gates/pepgent26-web03{,-gate-a,-gate-b}.md`；D12（:33-47、:163-166、:195-235、:268-374）、D12-coverage（:151-203）、D7:96-97、D8:129、D20:10-34；soroi `design/store.md:133-198`；W-10 工作入口（只读）中的 `packages/ui/src/lab/{time-axis.tsx,time-axis-model.ts,time-axis.css,dag-canvas.tsx,dag-canvas.css}`、`experiment-detail-page.tsx:148-178`、`protocol/lab/{catalog,pages,rows}.ts`、`server/lab/{operations,experiments}.ts`，以及 `node_modules/pepgent-store/contract.ts`。行版本：D35-01@v1、D35-02@v1、D35-03@v1。

## D35-01 v1：反对（附反例 `/tmp/D35-01-counter-claude-high.md`）

- **路径授权部分我赞成（steady）。**
  - `GanttTimeAxis` 位于 DagCanvas 的 background 层（`dag-canvas.tsx:59-70`）。`.pepgent-lab-time-band` 是 24px 高的绝对定位 div，没有 `pointer-events: none`（`time-axis.css:203-210`）；会挡事件的只有 edges SVG，而它已经设成 `pointer-events: none`（`dag-canvas.css:28-34`）。`GanttNowChip` 在 overlay 层，同样能收到事件。所以只给这两个组件加“受控位置 + 拖动/点选回调”属性、不改 CSS，就能接住拖动，不需要碰 `renderer/styles/lab/**`。D20-02 的约束能守住。
  - **divergent：** 我审视过两种替代：在 `features/.../ui` 里自建拖动层，以及新设席位。前者违反 D20-02，后者要另行派工、互相等待，两者都比本行差。
- **反对理由：** how 规定“游标时刻 → 不晚于该时刻的最后一个提交级事件序号 k”。提交级事件的时刻只在 store 的 `RunEvent` 中，Lab 的 catalog 和 page wire 都不带。服务端也只向浏览器转发 `{kind:'run', run}`。因此 W-10 按正文无法计算 k，F10 S2 会再次卡在请求裁定上。
- **清零方式：** 发起人只改 how 中这一句。依据 `contract.ts:257`，节点的 `step` 就是提交级事件序号，于是：候选 k 取节点 `step` 的集合；步的时刻取该步节点 `endedAt` 的最大值；`k = max{s | 时刻(s) ≤ T}`；游标处在最新提交或之后时 `at = null`。改为这句后，我改投赞成。

## D35-02 v1：赞成

- **steady：** 这是 D12-06 与 D7:96 已定的功能。D12-coverage:163 把它列为 C 类，它也不在 D12:597-616 的无来源表里，所以不能移入 D9（AGENTS:123、D10-08）。`LabPageWire['experiments']`（D12:351）确实漏了节点定义：`DraftNode` 没有 `template`（D12:204-212），默认估时与 `template` 在 `NodeDefinition` 里（D12:221-229）。服务端已经在 `readExperiment`/`readNodes` 中调用 `context.library.read(lab)`（`operations.ts:105,130`），所以在 `readExperiments` 中同源补上 `definitions` 是现成的读法。`NodeDefinition.estimateMinutes` 按 D12-15 是必填项，`?? 定义估时` 一定能得到时长。`PendingLaunchWire.at` 存在（D12:166）。起点按 `from` 拓扑取上游结束时刻的最大值，主路径闭合，计划条也不进后端存储。
- **divergent：** 我审视了“后端存计划”和“工人留空”两种做法：前者违反 D12-06“后端不存坐标”，后者收缩已定功能。本行的方案最简单。
- **给实现方的说明（不构成反例，均属 D7-17 交给投影的布局算法）：**
  1. “Open 运行所绑定草稿中尚未完成的节点”：主路径上按 `DraftNode.fn` 对应 `Call.fn` / `SlotWire.fn`，判断该节点是否已完成。
  2. “冲突”我理解为同一设备泳道内任意两条区间（计划或实际，可以跨实验）相交，与 D12-coverage:165“同设备区间相交”一致。我不把它读成只比较“计划 × 实际”。

## D35-03 v1：赞成

- **steady：** D12-06（:353，`definitions` 取默认分支、没有版本键）与 D12-14（:46，按 `version` 关联）确实不能同时满足。所需数据都有来源：
  - `Call.version` 在运行图中（`contract.ts:154-155`），`SlotState.version` 由 D12-14 提供。
  - store 的 `GET /versions/{version}` → `NodeVersionRecord`，内含入口 TS、源码清单与 commit（store.md:158,195），足以静态导出定义。
  - 尚未提交的在途版本从持槽会话的 worktree 导出，按“先假定能工作”写成占位，合规。
  - `AbortedCall` 没有 `version`（store.md:147；`contract.ts:159-162`），所以不会关联定义。这与“不补造”的要求一致。
- **得到的不只是默认值：** 已提交调用的参数目前“无参数名时只可显示位置”（D12-coverage:196）。有了版本化定义，参数名也有了真实来源。
- **divergent：** 两个替代都更差。长期留空会让在途与已提交节点一直缺 D12-06 写明的参数默认值。用默认分支代替已被 D12-14 否决。本行由 W-09 改 wire、W-10 消费，分工清楚，没有跨席位互相等待。


## D35-02 v1：赞成（ClaudeHighD35，2026-11-01T19:35:36.669Z）——作废：该行已修订到 v3



# D35 ClaudeHigh 选票（实例 ClaudeHighD35，空白历史）

我直接读了这些源头：PM#54 正文；闸门材料 `evidence/gates/pepgent26-web03{,-gate-a,-gate-b}.md`；D12（:33-47、:163-166、:195-235、:268-374）、D12-coverage（:151-203）、D7:96-97、D8:129、D20:10-34；soroi `design/store.md:133-198`；W-10 工作入口（只读）中的 `packages/ui/src/lab/{time-axis.tsx,time-axis-model.ts,time-axis.css,dag-canvas.tsx,dag-canvas.css}`、`experiment-detail-page.tsx:148-178`、`protocol/lab/{catalog,pages,rows}.ts`、`server/lab/{operations,experiments}.ts`，以及 `node_modules/pepgent-store/contract.ts`。行版本：D35-01@v1、D35-02@v1、D35-03@v1。

## D35-01 v1：反对（附反例 `/tmp/D35-01-counter-claude-high.md`）

- **路径授权部分我赞成（steady）。**
  - `GanttTimeAxis` 位于 DagCanvas 的 background 层（`dag-canvas.tsx:59-70`）。`.pepgent-lab-time-band` 是 24px 高的绝对定位 div，没有 `pointer-events: none`（`time-axis.css:203-210`）；会挡事件的只有 edges SVG，而它已经设成 `pointer-events: none`（`dag-canvas.css:28-34`）。`GanttNowChip` 在 overlay 层，同样能收到事件。所以只给这两个组件加“受控位置 + 拖动/点选回调”属性、不改 CSS，就能接住拖动，不需要碰 `renderer/styles/lab/**`。D20-02 的约束能守住。
  - **divergent：** 我审视过两种替代：在 `features/.../ui` 里自建拖动层，以及新设席位。前者违反 D20-02，后者要另行派工、互相等待，两者都比本行差。
- **反对理由：** how 规定“游标时刻 → 不晚于该时刻的最后一个提交级事件序号 k”。提交级事件的时刻只在 store 的 `RunEvent` 中，Lab 的 catalog 和 page wire 都不带。服务端也只向浏览器转发 `{kind:'run', run}`。因此 W-10 按正文无法计算 k，F10 S2 会再次卡在请求裁定上。
- **清零方式：** 发起人只改 how 中这一句。依据 `contract.ts:257`，节点的 `step` 就是提交级事件序号，于是：候选 k 取节点 `step` 的集合；步的时刻取该步节点 `endedAt` 的最大值；`k = max{s | 时刻(s) ≤ T}`；游标处在最新提交或之后时 `at = null`。改为这句后，我改投赞成。

## D35-02 v1：赞成

- **steady：** 这是 D12-06 与 D7:96 已定的功能。D12-coverage:163 把它列为 C 类，它也不在 D12:597-616 的无来源表里，所以不能移入 D9（AGENTS:123、D10-08）。`LabPageWire['experiments']`（D12:351）确实漏了节点定义：`DraftNode` 没有 `template`（D12:204-212），默认估时与 `template` 在 `NodeDefinition` 里（D12:221-229）。服务端已经在 `readExperiment`/`readNodes` 中调用 `context.library.read(lab)`（`operations.ts:105,130`），所以在 `readExperiments` 中同源补上 `definitions` 是现成的读法。`NodeDefinition.estimateMinutes` 按 D12-15 是必填项，`?? 定义估时` 一定能得到时长。`PendingLaunchWire.at` 存在（D12:166）。起点按 `from` 拓扑取上游结束时刻的最大值，主路径闭合，计划条也不进后端存储。
- **divergent：** 我审视了“后端存计划”和“工人留空”两种做法：前者违反 D12-06“后端不存坐标”，后者收缩已定功能。本行的方案最简单。
- **给实现方的说明（不构成反例，均属 D7-17 交给投影的布局算法）：**
  1. “Open 运行所绑定草稿中尚未完成的节点”：主路径上按 `DraftNode.fn` 对应 `Call.fn` / `SlotWire.fn`，判断该节点是否已完成。
  2. “冲突”我理解为同一设备泳道内任意两条区间（计划或实际，可以跨实验）相交，与 D12-coverage:165“同设备区间相交”一致。我不把它读成只比较“计划 × 实际”。

## D35-03 v1：赞成

- **steady：** D12-06（:353，`definitions` 取默认分支、没有版本键）与 D12-14（:46，按 `version` 关联）确实不能同时满足。所需数据都有来源：
  - `Call.version` 在运行图中（`contract.ts:154-155`），`SlotState.version` 由 D12-14 提供。
  - store 的 `GET /versions/{version}` → `NodeVersionRecord`，内含入口 TS、源码清单与 commit（store.md:158,195），足以静态导出定义。
  - 尚未提交的在途版本从持槽会话的 worktree 导出，按“先假定能工作”写成占位，合规。
  - `AbortedCall` 没有 `version`（store.md:147；`contract.ts:159-162`），所以不会关联定义。这与“不补造”的要求一致。
- **得到的不只是默认值：** 已提交调用的参数目前“无参数名时只可显示位置”（D12-coverage:196）。有了版本化定义，参数名也有了真实来源。
- **divergent：** 两个替代都更差。长期留空会让在途与已提交节点一直缺 D12-06 写明的参数默认值。用默认分支代替已被 D12-14 否决。本行由 W-09 改 wire、W-10 消费，分工清楚，没有跨席位互相等待。


## D35-03 v1：赞成（ClaudeHighD35，2026-11-01T19:35:36.670Z）



# D35 ClaudeHigh 选票（实例 ClaudeHighD35，空白历史）

我直接读了这些源头：PM#54 正文；闸门材料 `evidence/gates/pepgent26-web03{,-gate-a,-gate-b}.md`；D12（:33-47、:163-166、:195-235、:268-374）、D12-coverage（:151-203）、D7:96-97、D8:129、D20:10-34；soroi `design/store.md:133-198`；W-10 工作入口（只读）中的 `packages/ui/src/lab/{time-axis.tsx,time-axis-model.ts,time-axis.css,dag-canvas.tsx,dag-canvas.css}`、`experiment-detail-page.tsx:148-178`、`protocol/lab/{catalog,pages,rows}.ts`、`server/lab/{operations,experiments}.ts`，以及 `node_modules/pepgent-store/contract.ts`。行版本：D35-01@v1、D35-02@v1、D35-03@v1。

## D35-01 v1：反对（附反例 `/tmp/D35-01-counter-claude-high.md`）

- **路径授权部分我赞成（steady）。**
  - `GanttTimeAxis` 位于 DagCanvas 的 background 层（`dag-canvas.tsx:59-70`）。`.pepgent-lab-time-band` 是 24px 高的绝对定位 div，没有 `pointer-events: none`（`time-axis.css:203-210`）；会挡事件的只有 edges SVG，而它已经设成 `pointer-events: none`（`dag-canvas.css:28-34`）。`GanttNowChip` 在 overlay 层，同样能收到事件。所以只给这两个组件加“受控位置 + 拖动/点选回调”属性、不改 CSS，就能接住拖动，不需要碰 `renderer/styles/lab/**`。D20-02 的约束能守住。
  - **divergent：** 我审视过两种替代：在 `features/.../ui` 里自建拖动层，以及新设席位。前者违反 D20-02，后者要另行派工、互相等待，两者都比本行差。
- **反对理由：** how 规定“游标时刻 → 不晚于该时刻的最后一个提交级事件序号 k”。提交级事件的时刻只在 store 的 `RunEvent` 中，Lab 的 catalog 和 page wire 都不带。服务端也只向浏览器转发 `{kind:'run', run}`。因此 W-10 按正文无法计算 k，F10 S2 会再次卡在请求裁定上。
- **清零方式：** 发起人只改 how 中这一句。依据 `contract.ts:257`，节点的 `step` 就是提交级事件序号，于是：候选 k 取节点 `step` 的集合；步的时刻取该步节点 `endedAt` 的最大值；`k = max{s | 时刻(s) ≤ T}`；游标处在最新提交或之后时 `at = null`。改为这句后，我改投赞成。

## D35-02 v1：赞成

- **steady：** 这是 D12-06 与 D7:96 已定的功能。D12-coverage:163 把它列为 C 类，它也不在 D12:597-616 的无来源表里，所以不能移入 D9（AGENTS:123、D10-08）。`LabPageWire['experiments']`（D12:351）确实漏了节点定义：`DraftNode` 没有 `template`（D12:204-212），默认估时与 `template` 在 `NodeDefinition` 里（D12:221-229）。服务端已经在 `readExperiment`/`readNodes` 中调用 `context.library.read(lab)`（`operations.ts:105,130`），所以在 `readExperiments` 中同源补上 `definitions` 是现成的读法。`NodeDefinition.estimateMinutes` 按 D12-15 是必填项，`?? 定义估时` 一定能得到时长。`PendingLaunchWire.at` 存在（D12:166）。起点按 `from` 拓扑取上游结束时刻的最大值，主路径闭合，计划条也不进后端存储。
- **divergent：** 我审视了“后端存计划”和“工人留空”两种做法：前者违反 D12-06“后端不存坐标”，后者收缩已定功能。本行的方案最简单。
- **给实现方的说明（不构成反例，均属 D7-17 交给投影的布局算法）：**
  1. “Open 运行所绑定草稿中尚未完成的节点”：主路径上按 `DraftNode.fn` 对应 `Call.fn` / `SlotWire.fn`，判断该节点是否已完成。
  2. “冲突”我理解为同一设备泳道内任意两条区间（计划或实际，可以跨实验）相交，与 D12-coverage:165“同设备区间相交”一致。我不把它读成只比较“计划 × 实际”。

## D35-03 v1：赞成

- **steady：** D12-06（:353，`definitions` 取默认分支、没有版本键）与 D12-14（:46，按 `version` 关联）确实不能同时满足。所需数据都有来源：
  - `Call.version` 在运行图中（`contract.ts:154-155`），`SlotState.version` 由 D12-14 提供。
  - store 的 `GET /versions/{version}` → `NodeVersionRecord`，内含入口 TS、源码清单与 commit（store.md:158,195），足以静态导出定义。
  - 尚未提交的在途版本从持槽会话的 worktree 导出，按“先假定能工作”写成占位，合规。
  - `AbortedCall` 没有 `version`（store.md:147；`contract.ts:159-162`），所以不会关联定义。这与“不补造”的要求一致。
- **得到的不只是默认值：** 已提交调用的参数目前“无参数名时只可显示位置”（D12-coverage:196）。有了版本化定义，参数名也有了真实来源。
- **divergent：** 两个替代都更差。长期留空会让在途与已提交节点一直缺 D12-06 写明的参数默认值。用默认分支代替已被 D12-14 否决。本行由 W-09 改 wire、W-10 消费，分工清楚，没有跨席位互相等待。


## D35-01 v2：赞成（ClaudeHighD35v2，2026-11-01T19:44:17.761Z）——作废：该行已修订到 v3



# D35 v2 ClaudeHigh 选票（实例 ClaudeHighD35v2，空白历史）

我执行了 `council queue --seat ClaudeHigh`，输出为“vote D35 now — rows D35-01@v2, D35-02@v2”，两行都是 v2。读过的源头：`/tmp/D35-0{1,2}-v2.yaml` 及两份修订理由；v1 反例 `/tmp/D35-01-counter-claude-high.md`、`/tmp/D35-02-LeadMentor-2-counter-v1.md`；闸门材料 `evidence/gates/pepgent26-web03.md`；D12-04/05/06（`DEC/D12-lab-wire.md:36-38`）、D12 挂载表（:51-60）、`PendingLaunchWire`（:166）、草稿生命周期（:541-553）、第一版无来源字段（:606）；D12-coverage:82-88、:161-166、:181、:211、:609；D7:93、96-97；D6-05（`DEC/D6-store-service.md:33`）、D6-10（:38）；D29 F4；D8:129、:337、:473；flow-catalog:190-201；soroi `design/store.md:94-95、:145-150`；W-10 工作入口（只读）下的 `node_modules/pepgent-store/contract.ts:47-60、:140-262` 和 `apps/web/src/protocol/lab/catalog.ts:23-40`。

## D35-01 v2：赞成

- **v1 反例已消除。** v2 的映射只用到线上已有的数据：
  - `ExperimentWire.graph` 是最新提交的运行图（`catalog.ts:27`）。
  - `Call` 和 `AbortedCall` 都带 `step`、`startedAt`、`endedAt`（`contract.ts:153-162`）。
  - `step` 就是承载该节点的提交级事件序号（`contract.ts:257`）。
  - 因此 W-10 能在 model 里自行算出 k，不需要 W-09 改 wire。`rewind` 本来就是服务端按 `graph?at=k` 读出来的，所以 F10 S2 要求的“看到与 `at=k` 一致的节点集合”在构造上成立。
- **steady：**
  - 两类继承或复用来的调用都不会让映射退化。派生运行 R' 的继承调用由 `seq=1` 的 `run_started` 携带，时刻沿用父运行原调用的时刻（store.md:94），所以 time(1) 早于 R' 的后续步。`Adopted` 调用的起止时刻来自本次提交的 `CallSchema.startedAt/endedAt`（`contract.ts:59`），即本运行的时刻。
  - `k = max{s | time(s) ≤ T}` 对游标位置 T 单调不减：向右拖动，k 不会回退。
  - 路径授权与 v1 相同，我在 v1 已核实 `time-axis.css`、`dag-canvas.css` 的事件层，不改 CSS 也能接住拖动，D20-02 的约束能守住。
- **divergent：** 没有更简单的方案。补齐 `RunEvent` 的提交时刻需要跨席位改 wire；“回看到这一步”按钮会改变 F10 S2 的验收语义；新设席位只会增加等待。
- **非阻断说明（不构成反例）：**
  1. 同一运行可以有多个 `soroi_task` 写方并发提交，这时 time(s) 对 s 不一定单调，游标会提前跳到较大的 k。显示的节点集合仍然等于 `graph?at=k`，S2 照样成立；并发顺序也不在设计阶段的考虑范围内（design-assumes-it-works）。
  2. 游标早于最早一步的时刻属于空集情形，同样不在设计范围内。

## D35-02 v2：反对（反例 `/tmp/D35-02-v2-counter-claude-high.md`）

- **LeadMentor 的 v1 反例已消除。** v2 不再在已绑定运行内部把草稿节点和调用对应起来，`fn` 可以重复的问题也就不再出现。
- **v2 没有收缩 D12-06 已定的功能**（用户要求本席判断这一点）：
  - D12-coverage:161-164 把泳道区间按来源分成三行：已提交调用、草稿计划、在途运行。计划区间只来自“草稿计划”一行（“以页面计划锚点累计 DraftNode.estimateMinutes”）。
  - Open 运行尚未提交的后续调用，已经列为第一版无来源字段：`experimentFlows[].remainingMinutes`“未提交的后续调用不可知”（`DEC/D12-lab-wire.md:606`、`D8-mvp-scope.md:473`、G47）。coverage:87 还写明“开放运行的未来总数不提供”。
  - 因此“不画 Open 运行的剩余计划条”与已通过的正文一致。v1 反而超出了正文。
- **反对理由：新的主路径失效。** v2 用 `run === null` 判断实验是否尚未开始，但这两者并不等价：
  - 经 `experiment.start` 启动、`pendingLaunch` 为 `sent` 的实验，在第一正式步执行期间还没有运行（D6-05：运行在第一次正式提交时才建立）。
  - 这段时间里，它的在途槽位按 D12-04 挂载表挂在同一个实验项上。
  - v2 因此会同时画出这个实验从 now 起的计划条和它自己的在途实际区间。这时冲突规则只有两种结果：
    - 在途占用包含 now：实验与自己冲突；
    - 在途占用不包含 now：所有计划区间（≥ now）与所有实际区间（≤ now）永不相交，D7:96 的冲突功能实际被收缩。
  - 两种结果都是错的。
- **清零方式：** 只改 how 的“投影”第一条：
  - 满足“`pendingLaunch.state = 'sent'` 且 `slots` 非空”的项，按已开始执行处理，不画计划条，只画在途实际区间；
  - 根锚点写 `now`（`pendingLaunch.at` ≤ now，原写法恒等于 now）。
  - 改成这样后，本席改投赞成。
- **divergent：** 修订后的规则比 v2 更贴近 v2 自己的原则，也就是“已开始执行的实验只画实际区间，不把计划当进度”。不需要新的 wire，也不需要新的对应关系。


## D35-02 v2：反对（ClaudeHighD35v2，2026-11-01T19:44:17.761Z）——作废：该行已修订到 v3

**反例：** ## D35-02 v2 反例（ClaudeHigh，ClaudeHighD35v2）：用 `run === null` 判断“未开始”，把“第一正式步在途、运行尚未建立”的实验项误判为未开始的草稿

**失效点（主路径）：** v2 只给 `ExperimentWire.run` 为 null、`draft` 非空的实验项画计划条，理由是这类项是“尚未开始的实验画布，从不被执行”（D6-12）。但 `run === null` 并不等于“尚未开始执行”。每一次从讨论启动的实验，都会经过一段已经在执行、运行却还没有建立的时间窗，v2 在这段时间窗里同时画出这个实验的计划条和它自己的在途实际区间。

**复现（只读正文即可）：**
1. 草稿 D 只有一个根节点 n（`fn = measure`，模板设备 X）。在讨论中执行 `experiment.start{draft: D}`，有免审批权限，`pending_launch.state = 'sent'`（D7-06）。
2. agent 做完 dry run 后发起第一正式步，`measure` 在设备 X 上执行（远程作业可能持续数小时）。dry run 不开槽位，正式步才开（D29 F4）。
3. 这时还没有运行。运行要到这一次正式**提交**时，store 才建立并写 `run_started`（D6-05：`DEC/D6-store-service.md:33`“它的第一次正式提交……store 在同一事务里建运行”）；`experiment_ext` 也要等 `run_started` 之后才写（D7-06）。所以这个实验项在目录里是 `run: null`、`draft: D`、`pendingLaunch.state: 'sent'`。
4. 在途槽位按 D12-04 挂载表“无运行、Discussion 来源、有 pendingLaunch → 该 pendingLaunch 实验项的 `ExperimentWire.slots`”（`DEC/D12-lab-wire.md:56`），挂在**同一个**实验项上；W-10 入口的 `protocol/lab/catalog.ts:28-32` 注释写法相同。
5. 按 v2 的规则：该项 `run` 为 null、`draft` 非空，于是画出 n 的计划条，区间是 `[max(pendingLaunch.at, now), +估时)`，标为 planned，落在设备 X 的泳道。同一项的在途槽位 `measure` 按 D12-06 取 `startedAt`，作为实际区间，也落在设备 X 的泳道。

**后果：** v2 的冲突规则（“同一设备泳道内的计划区间与实际区间之间”）在这里只有两种结果，两种都是主路径上的错误输出：
- 如果在途槽位按设备“此刻仍被占用”处理（区间包含 now）：每一个刚启动的实验，在第一步执行期间都会和**自己**冲突。
- 如果在途槽位不包含 now：v2 中所有计划区间都从 ≥ now 开始（根锚点是 `max(pendingLaunch.at, now)`，下游节点在其之后），而已提交调用的区间都在 ≤ now 结束。计划区间与实际区间因此永远不会相交，D7:96 的“冲突由投影算出”在 v2 下永远算不出任何冲突，这项功能等于被收缩掉了。

此外，不论冲突怎样计算，同一个正在执行的节点会同时显示为“在途”和“从 now 开始的计划”。这正是 v2 想通过“已开始的实验只画实际区间”来避免的情况。Argon 的 v2 选票对本行的读法就是“已开始运行的实验项只画已提交调用与在途槽位的真实时段”，但 v2 用 `run === null` 作判据，覆盖不到第一次提交之前的这一段执行。

这不是异常输入、失败、超时或竞态：经 `experiment.start` 启动的每一个实验，第一正式步都要经过这段时间窗（D8 F31 ②③ 的主路径）。

**可以清零的修订（只改 how 的“投影”第一条，不改 wire，也不改分工）：**
- 计划条只画**尚未开始执行**的未绑定草稿：`ExperimentWire.run` 为 null、`draft` 非空，并且不满足“`pendingLaunch.state = 'sent'` 且 `slots` 非空”。
- 满足“`pendingLaunch.state = 'sent'` 且 `slots` 非空”的项，已由第一正式步开始执行，按已绑定运行处理：不画计划条，只画在途槽位的实际时段。依据是 D6-05 与 D12-04 挂载表。
- 根节点锚点直接写 `now`。`pendingLaunch.at` 是 `experiment.start` 发生的时刻，总是 ≤ now，所以 `max(pendingLaunch.at, now)` 恒等于 `now`（非阻断，只是简化正文）。

按上面改完后，计划条只来自确实未执行的草稿；在途占用一律包含 now，所以“待启动计划 × 在途占用”的冲突能够真实算出，也不会出现实验与自己冲突的情况。这样 D12-06、D7:96 的功能都得以保留。改成这一句后，本席改投赞成。

**直接源头：** `DEC/D6-store-service.md:33`（D6-05 开始锚点）；`DEC/D12-lab-wire.md:56`（D12-04 挂载表）、`:166`（`PendingLaunchWire.at`）、`:553`（`sent` 由随后的 `run_started` 绑定）；`DEC/D29-pepgent-20-slot-overlay.md:20`（F4：第一步正式运行在途期间没有运行，dry run 不开槽位）；`WT/apps/web/src/protocol/lab/catalog.ts:23-40`；`/tmp/D35-02-v2.yaml` how 第 6、12、14 行。本反例只依据已核实的模型与正文推出，没有运行 UI 或投影，不称为 runtime 复现。


# D35 v2 ClaudeHigh 选票（实例 ClaudeHighD35v2，空白历史）

我执行了 `council queue --seat ClaudeHigh`，输出为“vote D35 now — rows D35-01@v2, D35-02@v2”，两行都是 v2。读过的源头：`/tmp/D35-0{1,2}-v2.yaml` 及两份修订理由；v1 反例 `/tmp/D35-01-counter-claude-high.md`、`/tmp/D35-02-LeadMentor-2-counter-v1.md`；闸门材料 `evidence/gates/pepgent26-web03.md`；D12-04/05/06（`DEC/D12-lab-wire.md:36-38`）、D12 挂载表（:51-60）、`PendingLaunchWire`（:166）、草稿生命周期（:541-553）、第一版无来源字段（:606）；D12-coverage:82-88、:161-166、:181、:211、:609；D7:93、96-97；D6-05（`DEC/D6-store-service.md:33`）、D6-10（:38）；D29 F4；D8:129、:337、:473；flow-catalog:190-201；soroi `design/store.md:94-95、:145-150`；W-10 工作入口（只读）下的 `node_modules/pepgent-store/contract.ts:47-60、:140-262` 和 `apps/web/src/protocol/lab/catalog.ts:23-40`。

## D35-01 v2：赞成

- **v1 反例已消除。** v2 的映射只用到线上已有的数据：
  - `ExperimentWire.graph` 是最新提交的运行图（`catalog.ts:27`）。
  - `Call` 和 `AbortedCall` 都带 `step`、`startedAt`、`endedAt`（`contract.ts:153-162`）。
  - `step` 就是承载该节点的提交级事件序号（`contract.ts:257`）。
  - 因此 W-10 能在 model 里自行算出 k，不需要 W-09 改 wire。`rewind` 本来就是服务端按 `graph?at=k` 读出来的，所以 F10 S2 要求的“看到与 `at=k` 一致的节点集合”在构造上成立。
- **steady：**
  - 两类继承或复用来的调用都不会让映射退化。派生运行 R' 的继承调用由 `seq=1` 的 `run_started` 携带，时刻沿用父运行原调用的时刻（store.md:94），所以 time(1) 早于 R' 的后续步。`Adopted` 调用的起止时刻来自本次提交的 `CallSchema.startedAt/endedAt`（`contract.ts:59`），即本运行的时刻。
  - `k = max{s | time(s) ≤ T}` 对游标位置 T 单调不减：向右拖动，k 不会回退。
  - 路径授权与 v1 相同，我在 v1 已核实 `time-axis.css`、`dag-canvas.css` 的事件层，不改 CSS 也能接住拖动，D20-02 的约束能守住。
- **divergent：** 没有更简单的方案。补齐 `RunEvent` 的提交时刻需要跨席位改 wire；“回看到这一步”按钮会改变 F10 S2 的验收语义；新设席位只会增加等待。
- **非阻断说明（不构成反例）：**
  1. 同一运行可以有多个 `soroi_task` 写方并发提交，这时 time(s) 对 s 不一定单调，游标会提前跳到较大的 k。显示的节点集合仍然等于 `graph?at=k`，S2 照样成立；并发顺序也不在设计阶段的考虑范围内（design-assumes-it-works）。
  2. 游标早于最早一步的时刻属于空集情形，同样不在设计范围内。

## D35-02 v2：反对（反例 `/tmp/D35-02-v2-counter-claude-high.md`）

- **LeadMentor 的 v1 反例已消除。** v2 不再在已绑定运行内部把草稿节点和调用对应起来，`fn` 可以重复的问题也就不再出现。
- **v2 没有收缩 D12-06 已定的功能**（用户要求本席判断这一点）：
  - D12-coverage:161-164 把泳道区间按来源分成三行：已提交调用、草稿计划、在途运行。计划区间只来自“草稿计划”一行（“以页面计划锚点累计 DraftNode.estimateMinutes”）。
  - Open 运行尚未提交的后续调用，已经列为第一版无来源字段：`experimentFlows[].remainingMinutes`“未提交的后续调用不可知”（`DEC/D12-lab-wire.md:606`、`D8-mvp-scope.md:473`、G47）。coverage:87 还写明“开放运行的未来总数不提供”。
  - 因此“不画 Open 运行的剩余计划条”与已通过的正文一致。v1 反而超出了正文。
- **反对理由：新的主路径失效。** v2 用 `run === null` 判断实验是否尚未开始，但这两者并不等价：
  - 经 `experiment.start` 启动、`pendingLaunch` 为 `sent` 的实验，在第一正式步执行期间还没有运行（D6-05：运行在第一次正式提交时才建立）。
  - 这段时间里，它的在途槽位按 D12-04 挂载表挂在同一个实验项上。
  - v2 因此会同时画出这个实验从 now 起的计划条和它自己的在途实际区间。这时冲突规则只有两种结果：
    - 在途占用包含 now：实验与自己冲突；
    - 在途占用不包含 now：所有计划区间（≥ now）与所有实际区间（≤ now）永不相交，D7:96 的冲突功能实际被收缩。
  - 两种结果都是错的。
- **清零方式：** 只改 how 的“投影”第一条：
  - 满足“`pendingLaunch.state = 'sent'` 且 `slots` 非空”的项，按已开始执行处理，不画计划条，只画在途实际区间；
  - 根锚点写 `now`（`pendingLaunch.at` ≤ now，原写法恒等于 now）。
  - 改成这样后，本席改投赞成。
- **divergent：** 修订后的规则比 v2 更贴近 v2 自己的原则，也就是“已开始执行的实验只画实际区间，不把计划当进度”。不需要新的 wire，也不需要新的对应关系。


## D35-01 v3：赞成（ClaudeHighD35v3，2026-11-01T19:52:23.919Z）



## ClaudeHigh 选票（ClaudeHighD35v3）：D35-01 v3 赞成，D35-02 v3 赞成

核对基准：`council queue --seat ClaudeHigh` 显示本席队首为 D35，两行均为 v3。源头用 gh api 按提交读取：soroi main `96fcfae`、Pepgent main `05756a5`、PM main `7a82a5f`，与两份修订理由引用的提交相同。

### D35-01 v3：赞成

**steady：`commits` 由服务端从 stream 收集，主路径走得通。** 逐段核对如下。
1. **端点与顺序已有。** soroi `design/store.md:149` 规定 `GET /runs/{run}/stream?after={seq}`，`after` 取严格大于；读方先取 `graph` 得到当前 `at`，再订阅。`after=0` 会从 seq 1 起推送全部历史事件。对 Open 运行，流保持打开，服务端读到 `seq = at` 后自行结束，不会被挂住。对 Ended/Aborted 运行，流发完历史事件就结束（同一行）。
2. **字段齐全。** `packages/store/src/contract.ts:252-256` 中，`run_started` 与 `step_committed` 都带 `seq`、`at` 和 `records`。Root-only 提交就是 `records.nodes` 只含 `Root` 的 `step_committed`，因此会被收进 `commits`。v2 的失效点（`contract.ts:152` 的 `Root` 没有 `step`，也没有时刻）不再适用。
3. **时刻取的是提交时刻。** `design/store.md:95` 写明，一步的全部调用结束后在同一事务里写入 `step_committed`。`at(seq)` 就是该状态生效的时刻。`design/store.md:137` 写明，回看 `at=k` 时，记录在提交级事件的序号处整体生效，后续的调用标记不改变运行图。所以 `commits` 中的序号覆盖了 `graph?at=k` 所有不同的已提交状态，F10“任意历史序号 k”（PM `evidence/argon/flow-catalog.md:190,194`）都能经拖动到达。拖到任一 k，显示的都是 `at=k` 的真实快照。
4. **Pepgent 侧有现成接缝。** `apps/web/src/server/lab/experiments.ts:104-123` 的 `follow(store, path, onData, signal, label)` 已导出，`onData` 返回 `'end'` 即可停止；`watchRun`（:129-157）用的就是“先取 graph.at，再读 stream”的同一模式。`operations.ts:69-117` 的 `readExperiment` 只要在 `ref.kind === 'run'` 分支多读一次最新 graph 和 stream，并把结果填入新字段，W-09 白名单内就能完成，不需要改 store。`ref.kind === 'draft'` 时返回 `[]`，与 `operations.ts:98` 中“草稿没有已提交历史”的语义一致。
5. **授权已闭合。** v1 的失效点是“wire 没有授权”（本席 v1 反例），v3 已明确授权 W-09 增加 `LabPageWire['experiment'].commits`。路径授权段（`time-axis.tsx` / `time-axis-model.ts` 只加受控位置与回调，不改 CSS 与外观）与 v1 相同，本席当时已赞成。

**各版反例的消除情况：**
- 本席 v1 反例（线上没有提交时刻）：已由 W-09 的 `commits` 消除。
- LeadMentor v2 反例（只含 Root 的提交拖不到；`endedAt` 早于提交时刻）：候选集改成提交级事件本身，时刻取提交事件的 `at`，两点都已消除。本席 v2 票只论证了“拖到的 k 显示正确”，没有覆盖“任意 k 可达”；这一点由 v3 补齐。

**divergent：** 本席考察了以下替代方案。
- `GET /runs/{run}/activity`：给的是调用的活动时刻，不是提交时刻，`design/store.md:148` 明确不与已提交状态混用。
- 新增 store 时间轴端点：要跨仓改 store 契约。
- 把 `commits` 放进目录 `ExperimentWire`：会让每个实验项都多读一次 stream。

相比之下，v3 只在详情页读取时为单个运行读一次 stream，范围最小，不新增席位，也没有跨席位锁。代价是每次读页面都要多读一遍该运行的事件流（含调用标记），修订正文的取舍里已写明，主路径可以接受。

**非阻断附注：**
- `contract.ts:254` 中 `run_started` 的 `records` 是必填字段，所以“携带 records 的 run_started”实际上包含非派生运行的 `run_started`。该点对应 `graph?at=` 该序号时的合法空状态（它在同一事务里先于第一次 `step_committed`），不构成错误。
- 实现时 W-09 可直接复用 `follow`。

### D35-02 v3：赞成

**本席 v2 反例已消除。** v3 第一条投影规则按反例给出的修订原样落地：同时满足 `run === null`、`draft` 非空、`pendingLaunch.state = 'sent'` 且 `slots` 非空的项，按已开始执行处理，只画在途槽位的实际时段；根锚点改为 `now`。引用已复核：
- D12-04 挂载表（PM `D12-lab-wire.md:56`）；
- `PendingLaunchWire.at/state`（:166）；
- `sent` 由随后的非派生 `run_started` 绑定（:553）；
- Pepgent `protocol/lab/catalog.ts:23-40`：`ExperimentWire` 同时带 `run`、`slots`、`draft`、`pendingLaunch`，注释为 “with no run, on a Discussion's pending-launch item”。

v3 的判据只用 `ExperimentWire` 上已有的字段，W-10 能在 model 内直接求值。

**LeadMentor v1 反例仍然排除。** 已绑定运行（含 Open）不画计划条，也不按 `fn` 或调用顺序把草稿节点与调用对应起来（v3 how 第 7 行）。

**主路径复核：**
- `awaiting_approval` 的项，以及 `sent` 但还没有槽位的项（dry run 不开槽位，D29 F4），都确实还没开始正式执行，画计划条是正确的。
- 第一正式步开槽后，计划条转为实际区间。第一次提交之后，`run` 非空，按已绑定规则处理。
- 计划区间从 `now` 起，在途占用包含 `now`，所以“待启动计划 × 在途占用”的冲突（D7:96）能真实算出，实验也不会与自己冲突。
- 线协议（`experiments.definitions` 取默认分支，与 `flowEditor.palette` 同源）与分工没有变化，PM `evidence/gates/pepgent26-web03.md:97` 中闸门 A-② 的诉求（不收缩、不列 D9）已满足。

**divergent：** 没有找到更简的主路径。计划只由草稿和定义推出，不进存储，与 D12-06“后端不存坐标”一致。


## D35-02 v3：赞成（ClaudeHighD35v3，2026-11-01T19:52:23.919Z）



## ClaudeHigh 选票（ClaudeHighD35v3）：D35-01 v3 赞成，D35-02 v3 赞成

核对基准：`council queue --seat ClaudeHigh` 显示本席队首为 D35，两行均为 v3。源头用 gh api 按提交读取：soroi main `96fcfae`、Pepgent main `05756a5`、PM main `7a82a5f`，与两份修订理由引用的提交相同。

### D35-01 v3：赞成

**steady：`commits` 由服务端从 stream 收集，主路径走得通。** 逐段核对如下。
1. **端点与顺序已有。** soroi `design/store.md:149` 规定 `GET /runs/{run}/stream?after={seq}`，`after` 取严格大于；读方先取 `graph` 得到当前 `at`，再订阅。`after=0` 会从 seq 1 起推送全部历史事件。对 Open 运行，流保持打开，服务端读到 `seq = at` 后自行结束，不会被挂住。对 Ended/Aborted 运行，流发完历史事件就结束（同一行）。
2. **字段齐全。** `packages/store/src/contract.ts:252-256` 中，`run_started` 与 `step_committed` 都带 `seq`、`at` 和 `records`。Root-only 提交就是 `records.nodes` 只含 `Root` 的 `step_committed`，因此会被收进 `commits`。v2 的失效点（`contract.ts:152` 的 `Root` 没有 `step`，也没有时刻）不再适用。
3. **时刻取的是提交时刻。** `design/store.md:95` 写明，一步的全部调用结束后在同一事务里写入 `step_committed`。`at(seq)` 就是该状态生效的时刻。`design/store.md:137` 写明，回看 `at=k` 时，记录在提交级事件的序号处整体生效，后续的调用标记不改变运行图。所以 `commits` 中的序号覆盖了 `graph?at=k` 所有不同的已提交状态，F10“任意历史序号 k”（PM `evidence/argon/flow-catalog.md:190,194`）都能经拖动到达。拖到任一 k，显示的都是 `at=k` 的真实快照。
4. **Pepgent 侧有现成接缝。** `apps/web/src/server/lab/experiments.ts:104-123` 的 `follow(store, path, onData, signal, label)` 已导出，`onData` 返回 `'end'` 即可停止；`watchRun`（:129-157）用的就是“先取 graph.at，再读 stream”的同一模式。`operations.ts:69-117` 的 `readExperiment` 只要在 `ref.kind === 'run'` 分支多读一次最新 graph 和 stream，并把结果填入新字段，W-09 白名单内就能完成，不需要改 store。`ref.kind === 'draft'` 时返回 `[]`，与 `operations.ts:98` 中“草稿没有已提交历史”的语义一致。
5. **授权已闭合。** v1 的失效点是“wire 没有授权”（本席 v1 反例），v3 已明确授权 W-09 增加 `LabPageWire['experiment'].commits`。路径授权段（`time-axis.tsx` / `time-axis-model.ts` 只加受控位置与回调，不改 CSS 与外观）与 v1 相同，本席当时已赞成。

**各版反例的消除情况：**
- 本席 v1 反例（线上没有提交时刻）：已由 W-09 的 `commits` 消除。
- LeadMentor v2 反例（只含 Root 的提交拖不到；`endedAt` 早于提交时刻）：候选集改成提交级事件本身，时刻取提交事件的 `at`，两点都已消除。本席 v2 票只论证了“拖到的 k 显示正确”，没有覆盖“任意 k 可达”；这一点由 v3 补齐。

**divergent：** 本席考察了以下替代方案。
- `GET /runs/{run}/activity`：给的是调用的活动时刻，不是提交时刻，`design/store.md:148` 明确不与已提交状态混用。
- 新增 store 时间轴端点：要跨仓改 store 契约。
- 把 `commits` 放进目录 `ExperimentWire`：会让每个实验项都多读一次 stream。

相比之下，v3 只在详情页读取时为单个运行读一次 stream，范围最小，不新增席位，也没有跨席位锁。代价是每次读页面都要多读一遍该运行的事件流（含调用标记），修订正文的取舍里已写明，主路径可以接受。

**非阻断附注：**
- `contract.ts:254` 中 `run_started` 的 `records` 是必填字段，所以“携带 records 的 run_started”实际上包含非派生运行的 `run_started`。该点对应 `graph?at=` 该序号时的合法空状态（它在同一事务里先于第一次 `step_committed`），不构成错误。
- 实现时 W-09 可直接复用 `follow`。

### D35-02 v3：赞成

**本席 v2 反例已消除。** v3 第一条投影规则按反例给出的修订原样落地：同时满足 `run === null`、`draft` 非空、`pendingLaunch.state = 'sent'` 且 `slots` 非空的项，按已开始执行处理，只画在途槽位的实际时段；根锚点改为 `now`。引用已复核：
- D12-04 挂载表（PM `D12-lab-wire.md:56`）；
- `PendingLaunchWire.at/state`（:166）；
- `sent` 由随后的非派生 `run_started` 绑定（:553）；
- Pepgent `protocol/lab/catalog.ts:23-40`：`ExperimentWire` 同时带 `run`、`slots`、`draft`、`pendingLaunch`，注释为 “with no run, on a Discussion's pending-launch item”。

v3 的判据只用 `ExperimentWire` 上已有的字段，W-10 能在 model 内直接求值。

**LeadMentor v1 反例仍然排除。** 已绑定运行（含 Open）不画计划条，也不按 `fn` 或调用顺序把草稿节点与调用对应起来（v3 how 第 7 行）。

**主路径复核：**
- `awaiting_approval` 的项，以及 `sent` 但还没有槽位的项（dry run 不开槽位，D29 F4），都确实还没开始正式执行，画计划条是正确的。
- 第一正式步开槽后，计划条转为实际区间。第一次提交之后，`run` 非空，按已绑定规则处理。
- 计划区间从 `now` 起，在途占用包含 `now`，所以“待启动计划 × 在途占用”的冲突（D7:96）能真实算出，实验也不会与自己冲突。
- 线协议（`experiments.definitions` 取默认分支，与 `flowEditor.palette` 同源）与分工没有变化，PM `evidence/gates/pepgent26-web03.md:97` 中闸门 A-② 的诉求（不收缩、不列 D9）已满足。

**divergent：** 没有找到更简的主路径。计划只由草稿和定义推出，不进存储，与 D12-06“后端不存坐标”一致。

