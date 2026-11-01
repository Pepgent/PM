# D39：PR#75 回看映射 replay-at.ts 与 D35-01 v3 的符合性及同刻/亚像素提交的处置（P1）——定稿

决策 issue：[Pepgent/PM#58](https://github.com/Pepgent/PM/issues/58)。发起：Coordination（DeskPr75D35Detail）。本文件由议会 daemon 生成。

## 事实

路径简称：`DEC/` = PM `evidence/decisions/`；`SOR/` = pepgent-soroi 仓库根。

**来源：** [Pepgent PR#75](https://github.com/Pepgent/Pepgent/pull/75)（WEB-03，已合入）正文把两处 D35-01 v3（[PM#54](https://github.com/Pepgent/PM/issues/54)）游标细节交 Coordination 复核：① T 早于第一项提交时钳到第一项；② 按公式取最大 seq，同刻提交中较小的 seq、间隔小于 1px 的提交拖不到。初审材料：PM `evidence/gates/pepgent75-d35-cursor.md`。闸门 A：`evidence/gates/pepgent75-d35-cursor-gate-a.md`（Argon-2）判两处都不越界、不需修订 D35-01 v3。ArgonGovernance-2 以“PR 已合入，不做事后闸门 B”退回请求，未出闸门 B 文件；它认定 ① 不需处理，② 是 `replay-at.ts` 偏离 v3 公式，要求按 P0 立案。Main 据此派本议程，只处理 ②；① 不在本表。

**分级（P1，不按 P0）：** D1-12 规定队列为“`P0`（关键路径工程 `BLOCKED` 解阻）→ `P1`（产品全景/跨组件接缝金丝雀纠偏）→ `P2`（PM 错误路径清理）→ `P3`（`omomp` 工作流提效方针）”（`SOR/AGENTS.md:26`）。P0 只用于关键路径上的 BLOCKED 解阻；PR#75 已合入，W-10 没有在 issue/PR 标 BLOCKED，WEB-07 等后续工作也不因本项暂停，所以本项不是 BLOCKED 解阻，不按 ArgonGovernance-2 所说的 P0 处理。本项是对已合入代码是否偏离已决契约（D35-01 v3）的纠偏，属 D1-12 中的纠偏一级，按 P1 立案。

**事实（(D) 文档或决策原文，(R) 直读源码；Pepgent 源码以 gh api 读 PR#75 合入后的 main，当前 main 上 `replay-at.ts` 与合入时相同）：**
- (D) D35-01 v3 投影条款：`k = max{ seq ∈ commits | at(seq) ≤ T }`，以 `at=k` 读 `rewind`；T 处在或晚于最后一项提交时 `at = null`；取舍列“得到”写“游标能落到每一次已提交的状态（含只有根值的提交）”（`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`）。v3 修订理由采纳 LeadMentor 反例：F10 要求“任意历史序号 k”都能经拖动指定（同文件 `:42`；`evidence/argon/flow-catalog.md:190,194`）。F10 S2 验收：“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”（`DEC/D8-mvp-scope.md:129`）。
- (R) `apps/web/src/renderer/features/lab-experiment-detail/model/replay-at.ts:14` T ≥ 最后一项 minute 返回 live；`:17` 把 T 钳到 `max(T, first.minute)`；`:18-21` 取 `minute ≤ 钳后时刻` 的最大 seq。除 T 早于第一项时的钳位外，与 v3 公式逐项相同，没有平移或改区间。提交 minute 以 `run.startedAt` 为原点保留小数（`apps/web/src/client/services/lab/project-experiment.ts:405`）。
- (R) store：非派生运行的第一次正式提交在同一事务只取一次 `at`（soroi `packages/store/src/store.ts:291`），`run_started`（seq 1）与第一次 `step_committed`（seq 2）同 `at`（`:302`、`:309`），该提交的根与调用都落在 seq 2（`:331,335`）。(D) “一次提交的记录在其提交级事件（`step_committed`，或派生运行 `seq = 1` 的 `run_started`）的序号处整体生效”（soroi `design/store.md:137`）。派生运行的 seq 1 是独立事务的物化锚点（`design/store.md:94`）。
- (R) 时间轴 scale 下限 3.2 px/min（`experiment-detail-view-model.ts:360`），1px 约 18.75 秒；指针换算 `axisMinute` 不钳位（`packages/ui/src/lab/time-axis-model.ts:89-92`）。
- (D) D35-01 v3 保留“回看到这一步”工具栏动作作辅助入口，但不能代替拖动；`packages/ui` 授权只限两类属性（`DEC/D35-...:20`）。`onCursor` 接到 `readPage('experiment', {at})` 归 WEB-07 [Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)，D35-01 v3 未交付部分随回看接线承接（`DEC/D8-mvp-scope.md:341`；D36-02 v2）。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D39-01 v3 | 修订 D35-01 v3 的投影公式：游标改为按“提交标记”取 k，每次提交（含只有根值的提交、同一 minute 的不同提交）各有至少 4px 宽的拖动区间；标记由 W-10 model 新增的纯函数生成后交给现有 `replayAt`，`replay-at.ts` 及其测试、`packages/ui`、wire 与 D20-01 白名单都不改，由 WEB-07 落地 | - D35-01 v3（[PM#54](https://github.com/Pepgent/PM/issues/54)，`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`）how 列“投影（W-10 model）”中的公式一句与取舍列“得到”<br>- 新增 `apps/web/src/renderer/features/lab-experiment-detail/model/commit-markers.ts`（提交标记）；`apps/web/src/renderer/features/lab-experiment-detail/model/experiment-detail-view-model.ts:341-352`（回看时游标的画线位置）；`features/lab-experiment-detail/controller/**`（把标记交给 `replayAt`）。三处分别在 D20-01 W-10 白名单的 `features/lab-experiment-detail/model/**`、`controller/**` 内（`DEC/D20-w10-path-boundary.md:31`）<br>- 测试写进 `apps/web/tests/vitest/lab-experiment-detail-view-model.test.ts`，匹配 D20-01 的 `apps/web/tests/vitest/lab-*-view-model.test.ts`<br>- 不改：`model/replay-at.ts`（`:14-21` 与 v3 公式一致）与 `apps/web/tests/vitest/lab-replay-at.test.ts`<br>- 承载切片：WEB-07 [Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（W-10），与 `onCursor` → `readPage('experiment', {at})` 接线同一 PR | 1. **提交标记 `commitMarkers(commits, derivedFrom, pixelsPerMinute)`（W-10 model 纯函数，新文件 `commit-markers.ts`）：** 输入页面数据已有的 `commits`（`FlowCommit { seq, minute }`，`lab-experiments.ts:132-135`）、`derivedFrom`（`FlowBase`，`lab-experiments.ts:122-123`）与当前 scale 的 `pixelsPerMinute`；输出与 `FlowCommit` 同形的标记 `{ seq, minute: μ }`。<br>   - **每次提交一个标记，按 seq 区分：** 提交的身份是 seq，不以 `minute` 相等判同一提交。store 每次提交各取一次毫秒时刻（soroi `packages/store/src/store.ts:291`），没有不同提交 `at` 唯一的约束（`contract.ts:252-256`），两次串行提交可以同一 `minute` 而运行图不同。<br>   - **唯一的例外：** `derivedFrom === null`（非派生运行）时，seq 1（`run_started`）不单列标记。它与第一次 `step_committed`（seq 2）在同一事务、同一 `at` 写入（`store.ts:291-309`），按 soroi `design/store.md:137`，该提交的记录在 seq 2 整体生效，seq 1 不是另一项已提交状态。派生运行的 seq 1 是物化锚点，与后续提交不在同一事务（`store.ts:513-516`，`design/store.md:94`），照常单列。<br>   - **位置：** 标记按 seq 升序排列。第一个标记的位置 `μ₁` 取其 `minute`；之后每个 `μᵢ = max(minuteᵢ, μᵢ₋₁ + d / pixelsPerMinute)`，`d = 4px`（与同页卡片间距 `timedCardBoxes` 的 `gap: 4` 同值，`experiment-detail-view-model.ts:363`）。相邻提交在轴上相距不少于 4px 时，`μ` 就是提交本身的 `minute`；更密或同刻时依次右移，每个标记各占至少 4px。`μ` 随 seq 严格递增。<br>2. **游标 → k（取代 v3 的 `k = max{ seq ∈ commits \| at(seq) ≤ T }`）：** controller 调用现有的 `replayAt(commitMarkers(commits, derivedFrom, pixelsPerMinute), T)`，`pixelsPerMinute` 取页面时间轴 `scale` 的同一值，T 为 `packages/ui` 已有的 `axisMinute` 换算的分钟（不改）。`replay-at.ts:14-21` 作用在标记上，因 `μ` 随 seq 严格递增，结果为：T 处在或晚于最后一个标记的 `μ` 时 `at = null`（实时）；否则 `k` 取 `μ ≤ max(T, μ₁)` 的最后一个标记的 seq，以 `at=k` 读取 `rewind`（D12-05）。PR#75 的左侧 padding 钳位随之保留。<br>3. **游标画线（W-10 model）：** 回看时，`experiment-detail-view-model.ts` 用同一 `pixelsPerMinute` 生成同一组标记，`cursor.minute` 取 seq 不超过 `rewoundTo` 的最后一个标记的 `μ`（没有时取第一个标记，同现有回退），经 `GanttTimeAxis` / `GanttNowChip` 已有的 `cursorMinute` 属性画出；游标标签仍用该提交本身的 `minute` 与 `rewoundTo`（`copy.replay`）。<br>4. **验证例（3.2 px/min，`d / pixelsPerMinute = 1.25` 分钟）：**<br>   - ClaudeHigh v1 反例：seq 40、45（只有根值）、46 的 minute 为 99.5、100.05、100.1333，`μ` 为 99.5、100.75、102.0，x 约 330.4、334.4、338.4，指针落在 [334.4, 338.4) 内得 seq 45。<br>   - LeadMentor v2 反例：seq 39、40（Root x）、41（Root y）、42 的 minute 为 99、100、100、101，`μ` 为 99、100.25、101.5、102.75，x 约 328.8、332.8、336.8、340.8，seq 40 与 seq 41 各占 4px，都能拖到。<br>   - 非派生运行的 seq 1 与 seq 2 同为 minute 0：标记只有 seq 2，`μ₁ = 0`，左钳位取 seq 2，与 v1 第 2 条及闸门 A 结论一致。<br>5. **不改：** `model/replay-at.ts` 与 `tests/vitest/lab-replay-at.test.ts` 不改；`packages/ui/src/lab/time-axis.tsx`、`time-axis-model.ts` 不改（D35-01 v3 已授权的 `cursorMinute` / `onCursor` 两类属性足够）；`commits` wire（W-09）、`FlowCommit`、`derivedFrom`、D20-01 白名单都不改；不新增组件结构（D20-02）。“回看到这一步”工具栏动作仍按 v3 只作辅助入口，不承担任何提交的可达性。<br>6. **承载与回写：** WEB-07（Pepgent#29）在接 `onCursor` 的同一 PR 内新增 `commit-markers.ts`、改 `experiment-detail-view-model.ts` 的游标位置与 controller 的调用，并在 `lab-experiment-detail-view-model.test.ts` 中补测试：同一 minute 的不同提交各有标记、非派生运行不单列 seq 1、派生运行单列 seq 1、右移、每个标记经 `replayAt` 可选中、live 与左钳位、回看游标画在 `μ`。通过后本行 how 第 1–3 条取代 D35-01 v3 投影条款中的公式一句；由新开的 AreaMgrPepgent 在 #29 登记并送达 W-10，WEB-07 PR 正文注明。 | **得到：**<br>- D35-01 v3“得到”原文成立且不改：游标能落到每一次已提交的状态（含只有根值的提交、同一 minute 的不同提交）；F10 S2“拖动时间轴，看到与 `at=k` 一致的节点集合”对每个已提交的 k 经拖动成立（`DEC/D8-mvp-scope.md:129`，`evidence/argon/flow-catalog.md:190,194`），不以辅助按钮代替拖动。<br>- 相邻提交在轴上相距 4px 以上时，映射与 v3 公式逐点相同；只有已由源码证实为同一事务的非派生 seq 1 并入 seq 2。<br>- 写入的文件都在 D20-01 W-10 白名单的 glob 内（`model/**`、`controller/**`、`lab-*-view-model.test.ts`），PR#75 已合入的 `replay-at.ts` 与 `lab-replay-at.test.ts` 不动，不动 `packages/ui`、wire 与席位边界。<br>**代价：**<br>- 密集或同刻提交段内，游标画线位置比提交本身的时刻右移，最多 `4px ×（段内提交数 − 1）`；标签仍显示提交本身的时刻与序号。<br>- 在被右移的标记与其真实时刻之间，指针所在时刻 T 已晚于该提交，但取到的仍是前一项提交。<br>- controller 与 view model 各按同一 `pixelsPerMinute` 生成一次标记。<br>**落选：**<br>- v2 的“同一 minute 合为一个标记、取最大 seq”：把时刻相等当成提交相同，同刻的较早提交永久拖不到（LeadMentor v2 反例）。<br>- 不排除非派生运行的 seq 1、让它单列：把同一事务内尚未生效记录的空图作为一项已提交状态放上时间轴，与 `design/store.md:137` 及闸门 A 结论不符。<br>- 改 `replay-at.ts` 并更新 `lab-replay-at.test.ts`（v2 how 6）：该测试不匹配 D20-01 的 `lab-*-view-model.test.ts`，要另以治理领域扩白名单（ClaudeHigh v2 反例方案 B）；新函数接到现有 `replayAt` 已得到同一映射，不需要。<br>- 维持 v1（不改公式，亚像素提交经“回看到这一步”到达）：该动作尚不存在，按卡片的步取 seq 到不了只有根值的提交；以辅助入口代替拖动违背 v3 落选列与 F10 S2。<br>- 只把“回看到这一步”的候选集定为 `commits`、用 `ActionDialog` 的 `choice` 列出：这些提交仍拖不到，F10 S2 的拖动验收改由按钮承担，要按验收语义变更另行裁定。<br>- 在 `commits` 序数上等距拖动（时间轴改成按序号）：每个 k 可达，但游标与按时刻定位的卡片完全脱钩。<br>- 放大时间轴（加缩放交互）：要在 `features/.../ui` 或 `packages/ui` 新增交互，越出 D20-02 与 D35-01 v3 的两类属性授权；毫秒级间隔的提交需要无上限的放大倍数。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD39v3）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

- D39-01 v2（DeskD39Revise，2026-11-01T21:29:15.989Z）：D39-01 v2：两个反例都成立，按其共同指向修订 D35-01 v3 的映射，使每次提交经拖动可达。

核对（Pepgent main 以 gh api tarball 读取，2026-11-01T21:01:16Z 提交；PM、soroi 读当前文件）：

1. **ClaudeHigh 反例成立。**
   - `fitPixelsPerMinute`（`packages/ui/src/lab/time-axis-model.ts:120-125`）在其参数下得 3.2 px/min（下限，`experiment-detail-view-model.ts:353-361`）；`axisMinute`（`:89-92`）与 `replay-at.ts:14-21` 按其数值确实取不到 seq 45。
   - Pepgent main 中“回看到这一步”不存在（`apps/web/src/renderer`、`apps/web/src/client` 无此动作）；`project-experiment.ts:168` 滤掉 Root，Root 节点无 `step`（soroi `contract.ts:152`）。所以 v1 第 3 条指定的辅助入口覆盖不了只有根值的提交，v1 代价列“只能经工具栏辅助入口到达”不成立。
2. **LeadMentor 反例成立。** D35-01 v3 落选列明写“用‘回看到这一步’按钮代替拖动：改变 F10 S2 的验收语义，违背 U2（闸门 A）”，how 列写“可以作为辅助入口保留，但不能代替拖动”（`DEC/D35-...:20`）；v1 让辅助入口成为一批正常提交的唯一入口，同时维持 v3“得到”不改，正文自相矛盾。
3. **两个反例的修正边界取交集。** ClaudeHigh 要求每个 k 都有入口；LeadMentor 要求正常提交仍能经拖动指定，否则须按验收语义变更裁定。只修辅助入口的候选集（ClaudeHigh 建议）满足前者、不满足后者；让拖动本身覆盖每个提交同时满足两者。指针只有像素级分辨率，按时刻等比的映射分不开相距不足一个像素的两次提交，所以必须在密集段让映射偏离时刻。v2 只在相邻提交相距不足 4px 时把标记右移，其余位置与 v3 逐点相同。
4. **不越出已有授权。** 标记与映射都是 `features/lab-experiment-detail/model/**` 内的纯函数（D20-01 W-10 白名单）；画线用 D35-01 v3 已授权的 `cursorMinute`，指针换算用已有的 `onCursor` 分钟值，`packages/ui` 与 `commits` wire 不改。承载按闸门 B 已有结论（`evidence/gates/pepgent75-d35-cursor-gate-b.md` B-2：`replay-at.ts` 的调整由 WEB-07 在白名单内承载，不另开切片）。
5. **同刻提交维持 v1 第 2 条。** 同一 `minute` 的提交合为一个标记、取最大 seq，与 `design/store.md:137` 及两个反例席都认同的 v1 第 2 条一致。
6. **不需 rebut。** 两份反例所引事实与行号经复读均成立。

v2 改动的是 D35-01 v3 决策正文中的映射公式；切片（WEB-07）、白名单（D20-01）与公开契约（wire、`FlowCommit`、`packages/ui` 属性）都不变。分类由“技术”改为“串联”：本行同时连接 v3 公式、F10 S2 验收与 WEB-07 承接（LeadMentor 分类意见）。缺失设计补充记为“是”：v3 没有给出亚像素间隔下的映射。

- D39-01 v3（DeskD39Revise3，2026-11-01T21:42:24.055Z）：D39-01 v3：ClaudeHigh、LeadMentor 对 v2 的两个反例都成立，按两者给出的最小修正同时修订；映射的 4px 标记设计不变，不需 rebut。

核对（Pepgent main 以 gh api tarball 读取，解在 `/tmp/d39v2-ch/pep`；soroi `store.ts`、`contract.ts`、`design/store.md` 以 gh api 读取 main；PM 读当前文件）：

1. **ClaudeHigh v2 反例成立（承载路径越出白名单）。**
   - D20-01（`DEC/D20-w10-path-boundary.md:31`）的 `tests/vitest` 授权只有 `apps/web/tests/vitest/lab-*-view-model.test.ts`；`lab-replay-at.test.ts` 不匹配。v2 how 6 要求更新它，同时 how 5 与取舍列自述“白名单不改”“只改白名单内”，承载不成立。
   - 采用其方案 A：`replay-at.ts:14-21` 的三步（`T ≥ last.minute` 为 live、`max(T, first.minute)` 钳位、取 `minute ≤ 钳后时刻` 的最大 seq）作用在随 seq 严格递增的 `μ` 上，结果正是 v2 how 2 的规则。所以新增 `model/commit-markers.ts` 生成标记、controller 交给现有 `replayAt`，`replay-at.ts` 与 `lab-replay-at.test.ts` 都不动；新测试写进匹配 glob 的 `lab-experiment-detail-view-model.test.ts`。controller（`features/lab-experiment-detail/controller/**`，现为 `use-experiment-detail-controller.ts`）同在 D20-01 白名单内。v2 代价列“WEB-07 要改 PR#75 已合入的 `replay-at.ts`”随之删去。
2. **LeadMentor v2 反例成立（同一 minute 不等于同一提交）。**
   - soroi `store.ts:291` 每次提交在事务内各取一次 `new Date().toISOString()`（毫秒）；`contract.ts:252-256` 以递增 seq 标识事件，没有不同提交 `at` 唯一的约束。两次串行的正式提交可以同一 `minute`、不同运行图，v2 的按 minute 合并会把较早的 seq 从标记中删掉，任何 T 都选不到。
   - v3 改为每次提交一个标记、按 seq 区分；同刻提交进入同一 4px 右移规则。
   - 只保留有代码实据的一处：非派生运行（`FlowBase.derivedFrom === null`，`lab-experiments.ts:122-123`，由 `project-experiment.ts:358` 从 `RunGraph.derivedFrom` 投影）的 seq 1 与 seq 2 同事务同 `at`（`store.ts:291-309`），按 `design/store.md:137` 记录在 seq 2 生效，seq 1 不单列。派生运行的 seq 1 是另一事务的物化锚点（`store.ts:513-516`，`design/store.md:94`），照常单列。这正是 LeadMentor 修正边界中“可以单独处理有代码实据的首事务 seq1，但不能推广成相等 minute 就同一提交”。判据用页面已有的 `derivedFrom`，不改 wire，不给 store 加时间唯一性约束。
3. **不越出已有授权，领域不变。** 写入的文件全部落在 D20-01 W-10 白名单的 glob 内（`model/**`、`controller/**`、`lab-*-view-model.test.ts`），不扩白名单，不需 governance 领域；`packages/ui`、`commits` wire、`FlowCommit`、`derivedFrom` 不改。切片仍为 WEB-07（同闸门 B B-2 结论）。
4. **验证例** 补上 LeadMentor v2 反例的输入（seq 39–42，40 与 41 同为 minute 100）：`μ` 为 99、100.25、101.5、102.75，各占 4px。

分类维持“串联”，缺失设计补充维持“是”。v2 票作废，四席重投。


## 原票

各席原票见 `votes/D39-Coordination.md`、`votes/D39-ClaudeHigh.md`、`votes/D39-Argon.md`、`votes/D39-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。