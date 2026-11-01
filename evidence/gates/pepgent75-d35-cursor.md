# Pepgent PR#75（WEB-03）中两处 D35-01 v3 时间轴游标细节：初审材料

- **对象：** [Pepgent/Pepgent PR#75](https://github.com/Pepgent/Pepgent/pull/75)（WEB-03，`Closes #26`，已合入 main，2026-11-01T20:54:41Z），工人 W-10（`pepgent-web`）。PR 正文有两处标为请 Coordination 复核或裁定：
  1. “T 早于第一项时，游标钳在第一项……**请 Coordination 复核这一处钳位。**”（PR 正文“游标时刻 → k”一节）
  2. “**提交可达性（请 Coordination 裁定，W-10 不自加交互）：** D35-01 v3 的取舍写‘游标能落到每一次已提交的状态’。但按公式取最大 seq，同一时刻的多项提交中，较小的 seq 拖不到；间隔小于 1px 的提交也拖不到（scale 下限 3.2 px/min 时，约等于 19 秒）。”（PR 正文“未验证与风险”一节）
- **性质：** 不是正式 `BLOCKED`。PR 已合入，W-10 没有暂停任何工作。按 Main 的派单，本项仍送闸门 A 和闸门 B 判定。
- **所涉决策：** 两处都只涉及 D35-01 v3（[PM#54](https://github.com/Pepgent/PM/issues/54)），与 D35-02 v3（计划条）无关。
- **编制：** governance-desk 实例 `DeskPr75D35Detail`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初审分类，并列出请两道闸门判定的问题。它不是裁决。
- **来源标记：** `(U)` 用户原话；`(D)` 文档原文，包括决策正文和 `design/`；`(R)` 本实例直读源码得到的事实；`(A)` agent 的说法，只作解释。PR 正文属于 `(A)`。本实例只读了代码，没有运行测试，也没有打开浏览器。

路径简称：
- `DEC/` = PM `evidence/decisions/`
- `PG/` = Pepgent/Pepgent 中 PR#75 合入后的 main，用 gh api 按 PR#75 的合入提交读取，行号对应该提交。
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `STORE/` = Pepgent/soroi main 的 `packages/store/src/`；`SDES/` = Pepgent/soroi main 的 `design/`。两者都用 gh api 读取。

---

## 一、契约原文

| # | 事实 | 来源 |
|---|---|---|
| F1 | D35-01 v3 的投影条款：游标时刻 T 映射为 `k = max{ seq ∈ commits \| at(seq) ≤ T }`，以 `at=k` 读取 `rewind`；“游标处在或晚于最后一项提交的时刻时，`at = null`（实时）”。条款没有定义 T 早于第一项提交时的映射，此时集合为空。 | (D) `DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`（how 列“投影（W-10 model）”） |
| F2 | D35-01 v3 的“得到”写道：“F10 S2 在主路径上可达，游标能落到每一次已提交的状态（含只有根值的提交）”。 | (D) `DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`（取舍列） |
| F3 | v3 的修订理由采纳了 LeadMentor 对 v2 的反例：F10 要求“任意历史序号 k”都能经拖动指定，“只保证了拖到的那个 k 显示正确，保证不了 F10 要求的‘任意历史序号 k’都能经拖动指定”。 | (D) `DEC/D35-pepgent-26-web03-timeline-plan-defs.md:42` |
| F4 | F10 的标题是“任意历史序号 `k` 状态回看”，主路径第 2 步是“拖动时间轴游标指定序号 `k`”。 | (D) PM `evidence/argon/flow-catalog.md:190`、`:194` |
| F5 | F10 S2 的验收：“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”。 | (D) `DEC/D8-mvp-scope.md:129` |
| F6 | D35-01 v3 规定 `packages/ui` 的授权“只限于给 `GanttTimeAxis` / `GanttNowChip` 增加两类属性：回看游标的受控位置，以及拖动或点选的回调。不改 CSS、类名、布局与视觉外观”。“回看到这一步”工具栏动作“可以作为辅助入口保留，但不能代替拖动”。 | (D) `DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20` |
| F7 | D10-08：意图、范围、跨仓公开契约（含 wire、ADT）、验收语义回领导层投票，leader 不单裁；已通过契约内的单仓私有结构、算法和文件组织由工程师决定。D15-12：主会话不单方判断“是否属于单仓私有实现”。 | (D) `DEC/D10-repo-delivery.md:20`；`SOR/AGENTS.md:123` |
| F8 | D36-02 v2 与 D8：`onCursor` 接到 `readPage('experiment', {at})` 的页面接线归 WEB-07（[Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)）；D35-01 v3 在 WEB-03 关闭时未交付的部分随回看接线承接。 | (D) `SOR/LEDGER.md:79`；`DEC/D8-mvp-scope.md:341` |

## 二、实现现状（PR#75 合入后）

| # | 事实 | 来源 |
|---|---|---|
| F9 | `replayAt`：T ≥ 最后一项的 minute 时返回 `live`（`:14`）；否则把 T 钳到 `max(T, first.minute)`（`:17`），再取 `minute ≤ 钳后时刻` 的最大 seq（`:18-21`）。这与 F1 的公式一致，只多出 T 早于第一项时的钳位。 | (R) `PG/apps/web/src/renderer/features/lab-experiment-detail/model/replay-at.ts:7-23` |
| F10 | 提交的 minute 以 `run.startedAt` 为原点，保留小数：`(Date.parse(at) - Date.parse(run.startedAt)) / 60_000`。 | (R) `PG/apps/web/src/client/services/lab/project-experiment.ts:405` |
| F11 | 时间轴 scale 为 `{ kind: 'pixels', paddingStart: 12, pixelsPerMinute }`；`pixelsPerMinute` 由 `fitPixelsPerMinute` 按视口宽度拟合，下限 `minimumPixelsPerMinute: 3.2`。 | (R) `PG/apps/web/src/renderer/features/lab-experiment-detail/model/experiment-detail-view-model.ts:353-362` |
| F12 | 指针坐标换算为分钟：`axisMinute(scale, clientX - 父级左边界)`，即 `(x - paddingStart) / pixelsPerMinute`，不钳位。所以指针在左侧 12px padding 内时，T < 0。 | (R) `PG/packages/ui/src/lab/time-axis.tsx:135-136`；`PG/packages/ui/src/lab/time-axis-model.ts:89-92` |
| F13 | 单测覆盖了两种行为：同一 minute 的多项提交取最大 seq；T < 0 时钳到 run_started。 | (R) `PG/apps/web/tests/vitest/lab-replay-at.test.ts:19-32` |
| F14 | 回看时，cursor 画在 `seq ≤ rewoundTo` 的最后一项提交的 minute 上。 | (R) `PG/apps/web/src/renderer/features/lab-experiment-detail/model/experiment-detail-view-model.ts:341-352` |

## 三、store 侧提交时刻的事实

| # | 事实 | 来源 |
|---|---|---|
| F15 | 非派生运行的第一次正式提交：同一事务只取一次 `at = new Date().toISOString()`（`:291`）；`runs.started_at` 写这个 `at`（`:301`）；`run_started` 用同一个 `at` 写为 seq 1（`:302`）；同一提交的 `step_committed` 也用同一个 `at` 写为 seq 2（`:307-309`）。 | (R) `STORE/store.ts:285-309`；`runs` 表列见 `STORE/database.ts:13` |
| F16 | 该次提交的根与调用都以 `stepSeq`（即 seq 2）落库（`names` 表 `:331`、根 `:335`）。所以非派生运行在 `at=1` 时的运行图是空图：运行为 Open，没有节点。 | (R) `STORE/store.ts:328-335`；回看语义见 `SDES/store.md:137` |
| F17 | 派生运行的 `run_started`（seq 1）是物化锚点，携带继承调用与新根。它与后续步提交不在同一事务。 | (R) `STORE/store.ts:513-519`；(D) `SDES/store.md:94` |
| F18 | 步提交在一步内的全部调用结束后一次写入。只有根值的提交，其 `calls` 可以为空。 | (D) `SDES/store.md:95`；(R) `STORE/contract.ts:67-76` |

## 四、初审分类（`[INFERENCE]`，未运行）

### 4.1 第 1 处：第一次提交之前，游标钳到第一项 → 契约内的私有实现

- **C1：** 只有指针落在左侧 padding（F12）时，T 才会早于第一项提交。理由：第一项提交是 `run_started`，minute 原点就是它的 `at`，因为 `runs.started_at` 与 `run_started.at` 是同一个值（F10、F15）。派生运行同样如此（F17）。这段区域里不存在运行，也就没有已提交状态。
- **C2：** F1 的公式在空集上没有定义。钳位的结果仍是 `commits` 中的一项，并按 `at=k` 读取，所以页面显示的仍是与 `at=k` 一致的节点集合（F5）。这样做不改 wire、ADT 或 `packages/ui` 属性，不改 `live` 判据，也不新增交互，只为公式在轴外的输入选一个值，属于 D10-08 中的单仓私有算法（F7）。
- **C3：** 初审建议：两道闸门都判不越界时，在 PR#75 评论中写明“W-10 自定，不上报”，不立案。

### 4.2 第 2 处：同刻提交和间隔小于 1px 的提交拖不到 → 已通过契约内部有缺口，不是实现偏差

- **C4：** 实现严格按 F1 的公式计算（F9、F13），没有偏离已通过的契约。“同刻只取最大 seq”是公式本身的性质：T 相同时，`max` 只能落到最大的 seq。
- **C5：** 公式与同一行“得到”中的“游标能落到每一次已提交的状态”（F2）不一致。v3 的修订前提是 F10 的“任意历史序号 k 都能经拖动指定”（F3、F4）。这处不一致在主路径上出现：
  - **同刻：** 每个非派生运行的 seq 1（`run_started`）与 seq 2（第一次 `step_committed`）的 `at` 完全相同（F15），按公式永远选到 seq 2，`at=1` 拖不到。`at=1` 的状态是空的 Open 图（F16）。
  - **间隔小于 1px：** 在 scale 下限 3.2 px/min 时，1px 约为 18.75 秒（F11）。指针坐标是像素级的，两项提交间隔小于一个像素时，较早的那项拖不到。按 F18，这种情况可能出现在连续的只有根值的提交，或很快结束的步之间。`[INFERENCE]` 这种间隔在真实运行中出现得多频繁，本实例没有实测。
- **C6：** 任何一种补法都会改动 F1 的公式或 F2 的验收语义，例如：
  - 把游标吸附到提交序号，按序号而不是按时刻拖动；
  - 改变同刻提交的取值规则；
  - 增加逐项步进的交互（F6 只授权两类属性）；
  - 明确规定 `at=1` 空图、同刻提交或亚像素提交不要求能拖到，由“回看到这一步”承接；但 F6 规定该入口不能代替拖动。

  按 F7，这些都属于验收语义或已通过决策正文的修订，W-10 和协调席都不能单方补。W-10 不自加交互，符合 F7。
- **C7：** 初审建议：本项作为 D35-01 v3 的缺口，由协调席立 P0 议程。表决前先由 Argon 判定：“任意历史序号 k 都能经拖动指定”是否覆盖 `at=1` 空图和亚像素间隔，以及以上各补法中哪些不改变 F10 S2 的意图。立案范围只限 `replayAt` 映射与 F2 的表述；`commits` wire（W-09）与 `packages/ui` 授权范围不变。
- **C8：** 本项不阻塞 WEB-07 的其他接线。`onCursor` 接到 `readPage` 的接线（F8）不论公式是否修订都要做；如果修订，只改 `replay-at.ts` 的映射。

## 五、闸门 A 的问题（交 `Argon`）

- **A-1：** 第 1 处：T 早于第一项提交时钳到第一项，是否属于 D35-01 v3 公式在轴外输入上的私有补全，不触及产品意图或公开契约（C1–C3）？
- **A-2：** 第 2 处：按 F2–F5 和 `(U)` U2（全流程不收缩），同刻提交（含非派生运行 `at=1` 的空图）与间隔小于 1px 的提交拖不到，是否构成 F10 S2“任意历史序号 k 经拖动指定”的缺口，需要修订 D35-01 v3（C4–C7）？如果认定需要修订，请在 C6 所列补法中指出不改变 F10 S2 意图的范围。
- **A-3：** 第 2 处如果判为不构成缺口，F2 中“每一次已提交的状态”的表述是否需要随之修订，以免已通过的正文自相矛盾？

## 六、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 第 1 处只改 W-10 白名单内的 `features/lab-experiment-detail/model/**`，是否可以按 D10-08 作为工程师私有实现，不上报、不立案，只由协调席在 PR#75 评论中记录结论？
- **B-2：** 第 2 处要修订已通过的 D35-01 v3 正文。是否必须走 `council propose`（P0），而不能由协调席在 PR 评论中裁定？承接修订的文件 `replay-at.ts` 在 W-10 白名单内，WEB-07（#29）已承接 D35-01 v3 的剩余部分（F8）。修订通过后由 WEB-07 承载，不另开切片，这条路由是否合规？
- **B-3：** 送达：协调席只把结论写回 PR#75（或在议程定案后写回），实际送达 W-10 由新开的 `AreaMgrPepgent` 片区经理负责。本实例不联系工人。这是否符合 C4-1、C4-2？

## 七、处置

两道闸门的判定分别写入同目录的 `pepgent75-d35-cursor-gate-a.md` 与 `pepgent75-d35-cursor-gate-b.md`，处置结果追加在本文末的“处置结果”一节。下一个空白实例只读这三个文件和议会 daemon，就能接续。

## 处置结果

- **闸门 A（`Argon-2`）：** 两处都不越界，不需修订 D35-01 v3，也不需立案（`pepgent75-d35-cursor-gate-a.md`）。第 1 处属公式在轴外输入上的私有补全。第 2 处的同刻情形：非派生运行的 seq 1 与 seq 2 同属一个提交事务，按 soroi `design/store.md:137`，记录在 seq 2 生效，所以取 seq 2 正是契约本意。亚像素情形属主路径外的边缘情况，由已保留的工具栏辅助入口承接。
- **闸门 B（`ArgonGovernance-2`）：** 写入 `pepgent75-d35-cursor-gate-b.md`，定性为非阻塞的事后治理检查意见。它撤回了此前的两项提法：一是把本项纳入事前闸门，二是按 P0 立案并追究合入前的失职。检查结论如下：
  - B-1：左 padding 钳位在 W-10 白名单内，属 D10-08 私有实现，合规。
  - B-2：同刻提交与亚像素提交的可达性没有越出白名单，不得按 P0 处理。D39 按 P1 立案、四席表决，符合 D1-12。如果 `replay-at.ts` 需要调整，由 WEB-07（#29）在白名单内承载，不另开切片。
  - B-3：送达路径合规。
- **核对：** 本实例在立案前复读了源码。当前 main 上的 `replay-at.ts` 与 PR#75 合入时相同；`:14-21` 与 v3 公式逐项一致，没有平移或改区间。闸门 B 先前退回消息中所称的 `time-axis.tsx:167` 钳制，以及其文件中的合入提交 `7273b26`，在 Pepgent/Pepgent 中都找不到对应：该提交号经 gh api 查询不存在，钳位实际在 `replay-at.ts:17`。另外，闸门 A 引用的 D35-01 v3 how 列原文含“派生运行的物化锚点在此生效，见 `SDES/store.md:94,137`”，这一句在定稿 `DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20` 中没有。how 列实际写的是“按序收集每个提交级事件（携带 `records` 的 `run_started` 与 `step_committed`，soroi `packages/store/src/contract.ts:249-256`）”。两处事实都已写进议程的事实段。
- **Main 指令：** 不再请求闸门 B，不在 PR#75 写评论，第 2 处立案；第 1 处不在议程内。按 D1-12（`SOR/AGENTS.md:26`），P0 只用于关键路径上的 BLOCKED 解阻。PR#75 已合入，不是 BLOCKED，也不阻塞后续工作，所以按纠偏一级 P1 立案。
- **议程：** D39（[Pepgent/PM#58](https://github.com/Pepgent/PM/issues/58)），P1，资格席为 Coordination、ClaudeHigh、Argon、LeadMentor，门槛 3。
  - **v1 表决：** D39-01 v1 `[技术]` 认定 `replay-at.ts` 符合 D35-01 v3，维持 v3 公式与“得到”正文，亚像素间隔的提交经“回看到这一步”到达。Coordination、Argon 赞成；ClaudeHigh、LeadMentor 反对，各附反例：
    - ClaudeHigh：只有根值的提交没有卡片，按卡片的步取 seq 的“回看到这一步”到不了它；该动作在 Pepgent main 中也还不存在。与下一项提交间隔不足 1px 时，这类提交在 GUI 上没有任何入口。
    - LeadMentor：正常的快速提交必须仍能经拖动指定；v1 以辅助按钮代替拖动，又维持 v3“得到”不改，违背 v3 落选列。
  - **v2 修订（governance-desk 实例 `DeskD39Revise`，2026-11-02）：** 两个反例经复读源码与决策正文均成立，不需 rebut。v2 修订 D35-01 v3 的投影公式：
    - 同一 `minute` 的提交合为一个标记，取最大 seq（维持 v1 第 2 条）。标记按 seq 升序排列，每个标记的位置取 `μᵢ = max(minuteᵢ, μᵢ₋₁ + 4px / pixelsPerMinute)`。
    - 游标取 `μ ≤ max(T, μ₁)` 的最后一个标记的 seq；T 处在或晚于最后一个标记时为 live。回看时游标画在所选标记的 `μ` 上。
    - 每次提交（含只有根值的提交）都占至少 4px 的拖动区间；相邻提交相距 4px 以上时，映射与 v3 逐点相同。
    - 只改 W-10 白名单内的 `replay-at.ts`、`experiment-detail-view-model.ts` 游标位置与 `lab-replay-at.test.ts`，由 WEB-07（[Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)）在接 `onCursor` 的同一 PR 内承载。`packages/ui`、`commits` wire、`FlowCommit` 与 D20-01 白名单都不改。
    - 分类改为“串联”，缺失设计补充记为“是”。行文与理由见 PM#58 的 v2 行与修订记录。v1 票作废，四席重投。
  - **闸门：** v2 没有改变切片归属（WEB-07，同闸门 B B-2 已有结论）、白名单与公开契约，所以不重新送闸门 A、闸门 B。v2 改的是 D35-01 v3 正文中的映射公式，与闸门 A“不需修订 v3”的判定不同，由 Argon 席在 v2 表决中裁定。
- **送达：** 定案后，由新开的 AreaMgrPepgent 在 #29 登记，把结论送达 W-10，并在 WEB-07 的 PR 正文注明。本实例不联系工人。
