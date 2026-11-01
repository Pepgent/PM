# D39 选票：ClaudeHigh

议程：PR#75 回看映射 replay-at.ts 与 D35-01 v3 的符合性及同刻/亚像素提交的处置（[Pepgent/PM#58](https://github.com/Pepgent/PM/issues/58)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D39-01 v1：反对（ClaudeHighD39，2026-11-01T21:24:16.010Z）——作废：该行已修订到 v3

**反例：** # D39-01 v1 反例（ClaudeHigh，ClaudeHighD39）

## 结论

D39-01 v1 how 第 3 条写“间隔小于 1px 的提交经已保留的‘回看到这一步’工具栏动作到达”，代价写“只能经工具栏辅助入口到达”。对**只有根值的提交**，这句不成立。这类提交如果与下一项提交的间隔不足 1px，拖动拖不到，“回看到这一步”也到不了。它在 GUI 上没有任何入口。

D35-01 v3 改版就是为了让“只有根值的提交”可达：“得到”写“游标能落到每一次已提交的状态（含只有根值的提交）”，修订理由采纳了 LeadMentor 对 v2 的反例（`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20,40-42`）。D39-01 v1 在亚像素间隔下重新留下了同一类失效，同时宣称维持 v3 的“得到”正文不修订。

## 复现（只读；Pepgent 与 soroi 源码均为 gh api 取得的 main tarball，解到 `/tmp/d39-claudehigh/`）

**1. 拖动拖不到（`replay-at.ts` 与 `time-axis.tsx` 按代码逐步计算）**

- 设非派生运行 R 的 `startedAt` 为 00:00:00，视口宽 1200，`axisSpan.endMinute` 为 390、`lastStartMinute` 为 380，约 6.5 小时的运行。
- `fitPixelsPerMinute`（`packages/ui/src/lab/time-axis-model.ts:120-125`）的计算：
  - usable = 1200 − 12 − 8 = 1180；
  - byLastCard = (1180 − 112) / 380 ≈ 2.81；
  - byRange = 1180 / 390 ≈ 3.03；
  - 结果为 max(3.2, 2.81) = **3.2 px/min**（`experiment-detail-view-model.ts:353-361`）。
- `commits` 中相邻的三项（`project-experiment.ts:405` 换算为分钟）：
  - seq 40：`step_committed`，带调用，01:39:30，minute 99.5；
  - seq 45：`step_committed`，**只有根值**，`roots: [{ name: "lr", value: 0.01 }]`、`calls: []`（`StepSchema` 允许，soroi `packages/store/src/contract.ts:67-76`）。时刻 01:40:03，minute 100.05；
  - seq 46：`step_committed`，带调用，01:40:08，minute 100.1333。它是下一步，其中央调用在 5 秒内结束。seq 41–44 是 seq 40 的调用转变标记，不在 `commits` 中。
- 指针换算 `axisMinute`：minute = (x − 12) / 3.2（`time-axis.tsx:135-136`、`time-axis-model.ts:89-92`）。seq 45 落在 x = 332.16，seq 46 落在 x = 332.4267，两者相距 0.267px。
  - x = 332：T = 100.0，`replayAt` 取 `minute ≤ T` 的最大 seq，得 **40**（`replay-at.ts:17-21`）；
  - x = 332.5（DPR 2 的半像素）：T = 100.15625，得 **46**；
  - x = 333：T = 100.3125，得 **46**。
- 所以在这些取样点上，任何指针位置都得不到 seq 45。

**2. “回看到这一步”也到不了**

- Pepgent main 全仓 grep “回看到”、“Rewind to” 都是 0 处命中。这个动作还不存在。D8:347 与 D36-02 v2 只把它排进 WEB-07，没有规定它从哪里取 seq。
- 它的名字指向“这一步”，也就是某个节点卡片的步。Coordination 的理由写的是“各卡片的‘回看到这一步’入口”。但详情页的卡片只来自 `Call` / `AbortedCall` 与槽位：
  - `runNodes` 第一行先滤掉 Root：`graph.nodes.filter((node) => node.kind !== 'Root')`（`apps/web/src/client/services/lab/project-experiment.ts:168`）；
  - 卡片 id 是 `${step}.${position}`（`:43-44,190-226`）；
  - Root 节点的 schema 只有 `{ kind, name, value }`，没有 `step`（soroi `contract.ts:152`）。D35-01 v3 的落选列也以此为据。
- 于是 seq 45 没有卡片，任何以卡片的步为键的“回看到这一步”只能产出 40、46 这类带调用的步，到不了 45。
- 能按 `commits` 逐项走到 45 的只有步进交互，而 D39-01 v1 how 第 3 条明确写了“不加吸附或步进交互”。

**3. 失效落在哪里**

- seq 45 是“lr = 0.01 已绑定、尚未被消费”的已提交状态（`design/store.md:137` 规定提交在其 `step_committed` 处生效），GUI 上没有任何入口能回看它：
  - F10“任意历史序号 `k` 状态回看”（`evidence/argon/flow-catalog.md:190`）对 k = 45 失效；
  - D35-01 v3“得到”中“游标能落到每一次已提交的状态（含只有根值的提交）”不成立；
  - D39-01 v1 的代价“只能经工具栏辅助入口到达”与事实不符：这类提交连辅助入口也没有。

## 为什么这是主路径，不属 `design-assumes-it-works` 豁免

- 只有根值的提交在主路径上：WEB-03 的真实录制就含这种提交（`DEC/D35-...:40`）。
- 3.2 px/min 下 1px 约等于 18.75 秒。只要视口宽度除以 3.2 后得到的分钟数小于运行时长，比例就落到下限。1200px 视口约为 6 小时，小时级的实验运行是常态。
- 先用一步绑定参数，再立刻提交一步快速的中央调用，是 agent 的常规节奏，不是异常输入、竞态或极端规模。
- 即使在拟合上限（endMinute 下限 30，1200px 时约 39 px/min，1px ≈ 1.5 秒），同样的失效也成立。

## 对 F10 原文的核对（回应 Coordination 的提问）

- F10 第 2 步原文是“查询该运行的完整时间轴（按 `run_id` 与 `seq` 排序），**或**拖动时间轴游标指定序号 `k`”（`flow-catalog.md:194`）。F10 并不只认拖动；“任意历史序号 k 经拖动指定”是 D35:42 的转述。
- 因此在 3.2 px/min 下，F10 的成立不要求每个 k 都能拖到，但要求每个 k 都有某个入口能到达。D8:129 的 S2 验收“拖动时间轴，看到与 `at=k` 一致的节点集合”对拖到的位置照样成立。
- D39-01 v1 的问题不在于“拖动不是唯一入口”，而在于它指定的辅助入口覆盖不了只有根值的提交。

## 最小修订（只改 D39-01 how 第 3 条与 v3“得到”的一句；不改 v3 公式、wire、`packages/ui` 授权）

- **how 第 3 条改为：** 间隔小于 1px 的提交经“回看到这一步”工具栏动作到达。该动作的候选集是页面已有的 `commits`，含只有根值的提交，不取自节点卡片的 `step`。具体做法是打开已有 `ActionDialog`，用数据驱动的 `DialogSpecFixture` 的 `choice` 字段（`apps/web/src/client/contracts/lab-common.ts:167`）列出 `commits` 各项的 `#seq` 与时刻；选定后调用 `readPage('experiment', { at: seq })`。拖动仍是 F10 S2 的主入口。这样不新增组件结构（D20-02），也不改 `packages/ui`。
- **D35-01 v3“得到”改为：** “F10 S2 在主路径上可达：游标能落到时间轴可分辨的每一次已提交状态；间隔不足 1px 的提交（含只有根值的提交）经‘回看到这一步’（候选集为 `commits`）到达。”
- **代价改为：** 时间轴上间隔不足 1px 的提交不能经拖动指定，经工具栏辅助入口到达。


ClaudeHigh 席（ClaudeHighD39，空白历史）对 D39-01 v1 投**反对**，反例见 `--counter`。

**steady（已有契约是否闭合）：**
- **认同第 1 条（实现符合 v3）。** `replay-at.ts:14-21` 与 D35-01 v3 的公式 `k = max{seq | at(seq) ≤ T}` 及 live 判据逐项一致，没有可以“改回”的差异。
- **认同第 2 条（同刻提交）。** 我核对了 soroi `design/store.md:94,137` 原文：一次提交的记录在提交级事件处整体生效，非派生运行的 seq 1 与 seq 2 同属一个事务，所以取 seq 2 就是该次提交的状态。派生运行的 seq 1 是独立的物化锚点，携带继承调用，有卡片，也能拖到。
- **反对第 3 条。** 这一条把间隔不足 1px 的提交交给“回看到这一步”，但这个入口覆盖不了只有根值的提交，原因有三：
  - 详情页的卡片在 `project-experiment.ts:168` 就滤掉了 Root；
  - Root 节点没有 `step`（`contract.ts:152`）；
  - 这个动作在 Pepgent main 中还不存在，D8:347 也没有规定它从哪里取 seq。

  所以，只有根值的提交如果与下一项提交间隔不足 1px，既拖不到，也点不到。
  - 3.2 px/min 下 1px 约 18.75 秒；视口 1200px 时，约 6 小时以上的运行就会落到这一下限，见反例的逐步计算。
  - 这正是 D35-01 v3 为修补 LeadMentor v2 反例所保证的“含只有根值的提交”。D39-01 v1 一边说维持 v3“得到”正文不修订，一边在代价中承认游标落不到这些提交，正文自相矛盾。

**F10 核对（回应 Coordination 的提问）：**
- F10 原文 `flow-catalog.md:194` 写的是“查询完整时间轴……**或**拖动时间轴游标指定序号 k”，并不只认拖动。“任意 k 经拖动指定”是 D35:42 的转述。
- 所以在 3.2 px/min 下，F10 仍可以借辅助入口成立，前提是辅助入口能覆盖每一个 k。
- 本行的失效点不在“拖动不是唯一入口”，而在辅助入口的覆盖缺口。

**divergent（有没有更简的主路径）：**
- 不需要吸附，也不需要改 v3 公式。只要规定“回看到这一步”的候选集取页面已有的 `commits`，不取卡片的 `step`，就够了。
- 做法是用已有 `ActionDialog` 的数据驱动 `choice` 字段（`lab-common.ts:167`）列出 `#seq` 与时刻，选定后调用 `readPage('experiment', {at})`。
- 这样不改 wire，不改 `packages/ui`，不新增组件结构（D20-02），也不让 WEB-03 返工。
- 同时把 v3“得到”的一句改成与代价一致。修订文本见反例末节。


## D39-01 v2：反对（ClaudeHighD39v2，2026-11-01T21:38:25.267Z）——作废：该行已修订到 v3

**反例：** # D39-01 v2 反例（ClaudeHigh，ClaudeHighD39v2）

## 结论

v2 how 第 6 条让 WEB-07 的 W-10“更新 `lab-replay-at.test.ts`”。该文件不在 D20-01 的 W-10 白名单内。同时，v2 how 第 5 条写“D20-01 白名单都不改”，取舍列写“只改 W-10 白名单内两个 model 文件与一个测试”。所以 WEB-07 按本行落地时，要么 W-10 写了白名单外的文件，要么这一条做不完，本行无法照原文承载。

映射本身（4px 标记）成立，两个 v1 反例都已清零。本反例只针对承载路径。

## 复现（只读：PM 读当前文件；Pepgent main 用 gh api tarball 解到 `/tmp/d39v2-ch/pep`）

1. **白名单原文。** `PM evidence/decisions/D20-w10-path-boundary.md:31`（D20-01）写明：W-10 白名单在 `apps/web/src/client/**`、`apps/web/tests/e2e-lab/**` 之外，再加入列出的路径。其中 `tests/vitest` 只有一项：`apps/web/tests/vitest/lab-*-view-model.test.ts`（“即 WEB-03..06 交付的投影单元测试”）。同一行还把 `tests/vitest/lab-return-path.test.ts` 单独列为不在范围内，说明这里按 glob 字面划界。
   - 在 PM `evidence/decisions/`、PM 根 `*.md` 与 soroi `LEDGER.md`、`AGENTS.md` 中 grep `tests/vitest`，只命中 D20 与 D16（D16-09 原行，同一个 glob）。没有其他决策扩大过这项授权。
2. **文件名对不上。** Pepgent main 的 `apps/web/tests/vitest/` 下，`lab-` 开头的文件除 `lab-replay-at.test.ts` 与被排除的 `lab-return-path.test.ts` 外，都以 `-view-model.test.ts` 结尾。`lab-replay-at.test.ts` 不匹配 `lab-*-view-model.test.ts`。
3. **v2 必须写这个文件。**
   - `/tmp/D39-01-v2.yaml:15`（how 6）明写 WEB-07“更新 `lab-replay-at.test.ts`（标记合并、右移、各标记可选中、live 与左钳位）”。
   - v2 how 1–2 让映射依赖 `pixelsPerMinute`。现有测试 `lab-replay-at.test.ts:8-31` 按 `replayAt(COMMITS, T)` 两参数断言 v3 结果。按 v2 改 `replay-at.ts` 后，这个文件只能修改或删除，删除同样是写入。
4. **与本行自述冲突。**
   - `/tmp/D39-01-v2.yaml:14`（how 5）写“D20-01 白名单都不改”。
   - `:20`（取舍·得到）写“只改 W-10 白名单内两个 model 文件与一个测试，不动……席位边界”。
   - 承载依据 `evidence/gates/pepgent75-d35-cursor-gate-b.md:25`（B-2）只核对了 `replay-at.ts:7-23`，没有覆盖这个测试文件。
5. **改白名单要走治理领域。** 先例是 D35-01 v3（`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`）：它给 D20-01 的 W-10 白名单加入 `packages/ui` 两个文件，分类为“治理”，由含 ArgonGovernance 的 5 席表决（5/5，门槛 4）。闸门 B 同一格也写明突破既有白名单要加 `domains: [governance]`。v2 的职能领域为“—”，资格席只有 4 席，所以本行通过后也不能授权 W-10 写这个文件。按 `AGENTS.md:60`（C2-2 第 2 条），白名单内的开发由 ArgonGovernance 做事后检查；WEB-07 的 PR 照 how 6 修改这个文件，事后检查时就是越界。

## 最小修订（任选其一；不改映射设计）

- **A（推荐，更简单，不碰 PR#75 已合入的文件）：** `replay-at.ts` 与 `lab-replay-at.test.ts` 都不改。
  - 在 `features/lab-experiment-detail/model/**` 新增纯函数 `commitMarkers(commits, pixelsPerMinute)`，按 how 1 合并同刻提交、右移，输出 `FlowCommit` 形状的 `{ seq, minute: μ }`。
  - controller 把这组标记交给现有的 `replayAt(markers, T)`。`replay-at.ts:14-21` 的三步（`T ≥ last.minute` 为 live、`max(T, first.minute)` 钳位、取 `minute ≤ 钳后时刻` 的最大 seq）作用在 μ 上，结果正好是 v2 how 2 的规则，因为 μ 随 seq 单调。
  - `experiment-detail-view-model.ts` 用同一组标记画线（how 3）。新函数的测试写进白名单内的 `apps/web/tests/vitest/lab-experiment-detail-view-model.test.ts`。
  - 这样 v2 代价列中“WEB-07 要改 PR#75 已合入的 `replay-at.ts`”一项也一并消除。
- **B：** 保留 how 6，但在本行写明把 `apps/web/tests/vitest/lab-replay-at.test.ts` 加入 D20-01 的 W-10 白名单，删去“D20-01 白名单都不改”，并让该行进入 governance 领域（修订时标明领域，或由 ArgonGovernance `council claim --domain governance`），由 5 席表决。


ClaudeHigh 席（ClaudeHighD39v2，空白历史）对 D39-01 v2 投**反对**。反例见 `--counter`，只针对白名单与承载；映射设计本身本席认可。

源头：Pepgent main 用 gh api tarball 读取，解到 `/tmp/d39v2-ch/pep`；PM、soroi 读当前文件；PM#58 只读两份 v1 反例评论。

## 1. 两个 v1 反例已清零（steady）

- **ClaudeHigh 反例：** 按 how 1 复算，3.2 px/min 时 `d/ppm = 1.25 min`。
  - μ40 = 99.5，μ45 = max(100.05, 100.75) = 100.75，μ46 = max(100.1333, 102.0) = 102.0；
  - 按 `x = 12 + μ·3.2` 得 330.4、334.4、338.4。
  - 指针在 [334.4, 338.4) 内得 seq 45，与 how 4 一致。只有根值的提交不再依赖“回看到这一步”。
- **LeadMentor 反例：** 相隔一秒的 Root x、Root y 两次提交各占 4px，可经拖动指定。how 5 让辅助入口不承担可达性，v3“得到”与落选列不再矛盾。
- **同刻提交：** 合并后取最大 seq，符合 soroi `design/store.md:137`。

## 2. 密集区右移：没有造成主路径上的新错选，实时视图仍可达（steady + divergent）

- **错选：** 被右移的区间里，T 晚于提交本身的时刻，却取到前一项。v2 代价列已如实写明。这时画线落在 μ，标签用提交本身的时刻与 seq，节点集合与标签中的 `at=k` 一致，所以 F10 S2“拖动时间轴，看到与 `at=k` 一致的节点集合”（`D8-mvp-scope.md:129`）仍成立。
- **右移的上界：** μ 严格随 seq 递增，新提交不会挪动已有标记。右移累积的前提是：一段时间内，平均每 4px 就有不止一次提交，3.2 px/min 下即每 1.25 min 多于一次。
  - 这与页面现有的卡片密度假设同属一类：卡片最小宽 112px（`experiment-detail-view-model.ts:357,363`）。
  - store 规定步内调用全部结束后才一次提交（`design/store.md:95`），带调用的提交不会比它的卡片更密。
- **实时可达：** 判据是 `T ≥ μ_last`。
  - 适配比例下，`fitPixelsPerMinute` 的 byLastCard 项在最后一个开始时刻右侧留出至少 112px（`time-axis-model.ts:120-125`），够放约 28 个 4px 标记。
  - `cursorHandlers` 用 `setPointerCapture`（`time-axis.tsx:143-156`），`axisMinute` 不钳位（`time-axis-model.ts:89-92`），拖出画布仍会取到 T。
  - 只有收尾处堆积几十次提交才可能拖不到实时，属于 `design-assumes-it-works` 排除的极端规模。
- **divergent：** v2 只右移，不居中。稀疏处与 v3 逐点相同，是最简单的选择。改成按序号等距或加缩放，都已在落选列中说明理由，本席同意。

## 3. 白名单与切片归属：不成立（反对理由）

- 承载切片 WEB-07（Pepgent#29，W-10）成立：`replay-at.ts` 与 `experiment-detail-view-model.ts` 都在 D20-01 的 `features/lab-*/model/**` 内，`replayAt` 当前在 `src` 中没有调用方，由 WEB-07 接入。
- 但 how 6 要求更新的 `apps/web/tests/vitest/lab-replay-at.test.ts` 不匹配 D20-01 唯一的 vitest 授权 `lab-*-view-model.test.ts`（`DEC/D20-w10-path-boundary.md:31`）。v2 自己又写了“D20-01 白名单都不改”（how 5）和“只改 W-10 白名单内……一个测试”（取舍），且职能领域为“—”。
- 改白名单的先例 D35-01 v3 走的是治理领域、5 席表决。照本行原文，WEB-07 无法在白名单内落地。

修订方案见反例的 A、B 两项。推荐 A：映射语义不变，标记以 `{ seq, minute: μ }` 交给现有 `replayAt`，PR#75 的 `replay-at.ts` 与它的测试都不用改，新测试写进白名单内的 `lab-experiment-detail-view-model.test.ts`。照 A 或 B 修订后，本席预计改投赞成。

未运行测试、构建或 UI；以上数值是按源码手算的结果，不是 runtime 实测。


## D39-01 v3：赞成（ClaudeHighD39v3，2026-11-01T21:46:50.679Z）



# D39-01 v3：ClaudeHigh 选票（ClaudeHighD39v3）

**票：赞成。** 分类“串联”、缺失设计“是”、职能领域“—”，三项都同意。

## 读取范围（只读）

- Pepgent main：经 `gh api repos/Pepgent/Pepgent/tarball/main` 取得，解到 `/tmp/d39v3-ch/pep`。
- soroi：读 `packages/store/src/store.ts`、`packages/store/src/contract.ts`、`design/store.md`。
- PM：读 `evidence/decisions/D20-w10-path-boundary.md`、`D35-pepgent-26-web03-timeline-plan-defs.md` 的当前文件。
- 反例：v2 的 ClaudeHigh 反例 `/tmp/D39v2-counter-claude-high.md`，以及 PM#58 评论中的 LeadMentor v2 反例。

## 一、ClaudeHigh v2 反例（承载路径越出白名单）：已清零

1. v3 的 what、where、how 5 与取舍列都写明不改 `model/replay-at.ts` 和 `tests/vitest/lab-replay-at.test.ts`，how 6 也不再要求写这两个文件。v2 中“承载要写白名单外文件”的矛盾已经消失。
2. v3 要写的文件逐一对照 D20-01（`DEC/D20-w10-path-boundary.md:31`），都在 W-10 白名单内：
   - `features/lab-experiment-detail/model/commit-markers.ts`（新文件）与 `model/experiment-detail-view-model.ts` 匹配 `features/lab-{…,experiment-detail,…}/model/**`；
   - `controller/use-experiment-detail-controller.ts` 匹配 `features/lab-{…,experiment-detail,…}/controller/**`；
   - `apps/web/tests/vitest/lab-experiment-detail-view-model.test.ts` 已存在于 main，匹配 `lab-*-view-model.test.ts`。
3. U59 保护约束同样不受影响。要改的游标代码 `experiment-detail-view-model.ts:340-352` 是 PR#75（W-10，WEB-03）按 D35-01 v3 写入的，不属于 U59 已合入的结构。controller 中 `onCursor` 的接线本来就由 D35-01 v3 和 D36-02 交给 WEB-07（D35-01 v3 的 where 已含 `features/lab-experiment-detail/{model,controller,ui}/**`）。v3 只是在这条接线里多调用一个纯函数。
4. 白名单、`packages/ui` 和 wire 都不改，所以不需要 governance 领域，四席资格成立。

## 二、LeadMentor v2 反例（同一 minute 不等于同一提交）：已清零

1. v3 how 1 规定每次提交各有一个标记，以 seq 区分，不再按 minute 合并。反例输入为 seq 39/40/41/42，minute 为 99/100/100/101。我逐式复算如下（3.2 px/min，d/ppm = 1.25 分钟）：
   - μ = 99、max(100, 100.25) = 100.25、max(100, 101.5) = 101.5、max(101, 102.75) = 102.75；
   - x = 12 + 3.2μ，得 328.8、332.8、336.8、340.8，与 how 4 一致；
   - seq 40 与 seq 41 各占 4px，都能经拖动选中。
2. 唯一的例外是非派生运行的 seq 1，有源码实据：
   - 非派生运行的 `run_started` 只在 `step.run.kind === "open"` 的步提交事务内写入，与 `step_committed` 共用同一个 `at`（soroi `store.ts:291,302,309`），所以必定有一个同事务的 seq 2 随之写入；
   - `design/store.md:137` 规定记录在提交级事件处整体生效；
   - 派生运行的 seq 1（`store.ts:513-516`，`anchor = 1`）是另一个事务，按 v3 照常单列。
3. 判据 `derivedFrom` 是页面已有字段（`lab-experiments.ts:122-123`）。它由 `project-experiment.ts:358` 从 `graph.derivedFrom` 投影，而该值取自运行记录 `derived_from`（`store.ts:585`），与回看位置无关。这一处理正是 LeadMentor 修正边界允许的“有代码实据的首事务 seq1”，没有推广成“相等 minute 即同一提交”。
4. wire 中的 `commits` 包含 `run_started` 与 `step_committed`（`pages.ts:134-135,152-153`；`store.ts:595`），所以非派生运行的 seq 1 确实会出现在输入里，需要这条例外。

## 三、steady：主路径闭合

- **映射等价。** `replay-at.ts:7-22` 按 seq 求首尾项，`T ≥ last.minute` 时返回 live，左侧钳到 `max(T, first.minute)`，再取 `minute ≤ 钳后值` 的最大 seq。由于 μᵢ ≥ μᵢ₋₁ + d/pixelsPerMinute > μᵢ₋₁，μ 严格随 seq 递增，把标记交给 replayAt 正好得到 how 2 的规则。replay-at.ts 不用改。
- **类型可接。** replayAt 的入参只要求结构上是非空的 `FlowCommit` 元组，`commitMarkers` 返回同形的非空元组即可，不需要改 replay-at.ts 的导出。
- **比例尺来源。** controller 已经持有 `view`（`use-experiment-detail-controller.ts:39`），时间轴的 `scale.pixelsPerMinute` 由 view model 在 `experiment-detail-view-model.ts:353-362` 算出。controller 与 view model 使用同一个值，how 2 和 how 3 用的是同一组标记。
- **游标回显。** 拖动选中 k 后 `rewoundTo = k`。how 3 取 seq ≤ k 的最后一个标记的 μ，正是被选中的那个标记，游标线画在 μ，与指针所在的拖动区间一致。标签仍用提交本身的时刻和序号，不造数。
- **v1 验证例复算。** 99.5、max(100.05, 100.75) = 100.75、max(100.1333, 102.0) = 102.0，x 为 330.4、334.4、338.4，指针落在 [334.4, 338.4) 内得到 seq 45。非派生运行的 seq 1/2 同为 minute 0 时，只有 seq 2 一个标记，左钳位取 seq 2，与闸门 A 和 v1 第 2 条一致。
- **引用核对。** v3 引用的行号均已复读，与源码一致：`experiment-detail-view-model.ts:341-352,353-361,363`（`gap: 4`），`lab-experiments.ts:122-123,132-135`，`store.ts:291,302,309,513-516`，`contract.ts:252-256`，`design/store.md:94,137`。
- **现有测试。** `lab-experiment-detail-view-model.test.ts:146-170` 中游标相关的既有断言，如需随 how 3 调整，也落在白名单内的同一测试文件中，不越界。

## 四、divergent：有没有更简的主路径

- 我想到的唯一简化是：在 view model 中算一次标记，作为 `view.axis` 的一个字段交给 controller，省去 how 2 和 how 3 各算一次。v3 已把这一点列为代价，按任一写法实现，行为和白名单都相同。这只是实现上的选择，WEB-07 可以自行决定，不构成反对理由。
- 落选列中的“按序号等距”“缩放”“只改辅助入口”“v2 合并”“改 replay-at.ts”都确实更差或越权，落选理由成立。
- 整个改动由 WEB-07 在同一个 PR 内完成，没有跨席位串行等待，也没有新增切片。

## 结论

两个 v2 反例都已清零，白名单成立，主路径闭合。我对 D39-01 v3 投赞成，无反例。

