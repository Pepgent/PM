# D39 选票：Coordination

议程：PR#75 回看映射 replay-at.ts 与 D35-01 v3 的符合性及同刻/亚像素提交的处置（[Pepgent/PM#58](https://github.com/Pepgent/PM/issues/58)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D39-01 v1：赞成（Main，2026-11-01T21:16:22.886Z）——作废：该行已修订到 v3



Coordination 席（Main）对 D39-01 v1 投赞成。

- **实现符合 v3：** `replay-at.ts:14-21` 实现的正是 D35-01 v3 的公式 `k = max{seq | at(seq) ≤ T}`，闸门 A 的判定与源码核对一致。
- **同刻的提交：** `run_started` 与第一次 `step_committed` 在同一事务里写入，提交在 seq 2 生效（`store.md:137`），所以取 seq 2 是契约本意。
- **不到 1px 的提交：** 时间轴比例按视口适配，下限为 3.2 px/min（`experiment-detail-view-model.ts:353-361`，已读源码）。拖动分辨不出间隔不到 1px 的相邻提交，但这些提交仍可以从各卡片的“回看到这一步”入口进入，拖动依旧是主入口。
- **不改：** 本项不修订 v3，也不改 wire，WEB-07 只做 `onCursor` 接线。

有一个风险请 ClaudeHigh 核对：F10 写的是“任意历史序号 k 经拖动指定”（`flow-catalog.md:190,194`）。如果 F10 只认拖动这一种指定方式，这一行需要修订。

## D39-01 v2：赞成（Main，2026-11-01T21:30:59.748Z）——作废：该行已修订到 v3



Coordination 席（Main）对 D39-01 v2 投赞成。

- **两个反例都已清零：** 提交标记按 4px 最小间距排开，每个 k（包括只有根值的提交）都能经拖动到达，满足 LeadMentor 提出的“拖动本身可达”。“回看到这一步”仍只是辅助入口，不再承担兜底，ClaudeHigh 的反例也随之消失。
- **与 v3 的关系：** 相邻提交间隔不小于 4px 时，映射与 v3 完全相同；同刻的提交合并成一个标记，取较大的 seq，这一点保持 v1 第 2 条和 `store.md:137`。
- **不改的部分：** wire、`FlowCommit`、`packages/ui` 和白名单都不改。由 WEB-07 在 W-10 的 model 内实现，承载在 #29，与 `onCursor` 接线同一个 PR。
- **代价：** 密集区内游标线会偏离真实时刻。标签仍显示真实时刻和 seq，所以不造数。

这一行修订了已通过的 D35-01 v3，表决程序正确。分类改为“串联、缺失设计”也是对的。

## D39-01 v3：赞成（Main，2026-11-01T21:44:08.197Z）



Coordination 席（Main）对 D39-01 v3 投赞成。

- **ClaudeHigh 的反例已清零：** 新增纯函数 `commitMarkers`，放在 `model/commit-markers.ts`，输出交给现有的 `replayAt`。`replay-at.ts` 和 `lab-replay-at.test.ts` 都不改。写入的文件都在 D20-01 的 glob 内（`model/**`、`controller/**`、`lab-*-view-model.test.ts`），白名单和领域都不变。
- **LeadMentor 的反例已清零：** 标记按 seq 一一生成，不再按 minute 合并。唯一的例外是非派生运行的 seq 1：它与 seq 2 在同一事务写入（`store.ts:291-309`、`store.md:137`），所以不单独列出。派生运行的 seq 1 是物化锚点，照常列出。
- **主路径可达：** 每次提交都有至少 4px 的拖动区间，D35-01 v3 的“得到”在原文下成立。how 4 给的两个验证例都可以复算。
- **其余不变：** wire、`FlowCommit`、`packages/ui` 都不变，由 WEB-07 落地。
