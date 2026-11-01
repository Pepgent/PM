# D34 选票：ClaudeHigh

议程：Pepgent#19 LAB-09：维持两路 lifecycle 订阅，不实施合流（[Pepgent/PM#53](https://github.com/Pepgent/PM/issues/53)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D34-01 v1：赞成（ClaudeHighD34，2026-11-01T19:27:52.857Z）



ClaudeHigh 席（实例 ClaudeHighD34，空白历史）对 D34-01 v1 投**赞成**。

## 核对的源头

- D30-02 v1 how 栏全文（`DEC/D30-pepgent-19-lab-automation.md:37`），以及回写后的 D7-10“事件游标（D30-02）”段（`DEC/D7-lab-backend.md:70`）。两处逐字写有“以 `GET /stream/lifecycle?after=<落库游标>` 订阅”和“LAB-06 `followLifecycle` 不变”。
- C2-2.2 原文（`SOR/AGENTS.md:60`）：“仅当 A、B 双闸门均确认无越界时方可免投票放行，否则按 `P0` 立即进入投票”。两道闸门都判了越界，所以本议程是必经的一步。初审材料里“起草人可撤回、不立案”那一句不是 C2-2.2 原文，D34 事实栏对这一程序偏差的认定成立。
- `Pepgent/Pepgent` 在 `1bf7683` 的源码，经 `gh api .../contents?ref=1bf7683` 读取，未碰根 checkout：
  - `experiments.ts:165-190`：`followLifecycle` 用 `let cursor = '0'`；遇到 `run_started` 起 `watchRun`。`watchRun` 在 `:137` 判断 `state !== 'Open'` 时直接返回，所以重启后从 `"0"` 重放只会为仍 Open 的运行重建 watcher。
  - `automation.ts:277-293`：`followAutomationEvents` 以 `persisted()` 读 `lifecycle_cursor`；匹配和推进游标在同一个 `db.transaction` 里完成，事务结束后再逐个 `await openConversation`。
  - `runtime.ts:150-155,187,190`：两路订阅各自启动，`stop()` 时分别 await。
  - D34-01 where/how 栏引用的行号和描述与源码一致。

## steady 立场（契约闭合、路径互斥、依赖顺序）

- 本行不改 D30-02 和 D7-10 的正文，也不改已合入的代码，没有引入新字段、新表或新的生命周期，主路径与 4/4 通过的 D30-02 v1 完全一致。
- 两路订阅各自持有游标，彼此没有排序依赖。自动化一路在匹配前先调用 LAB-06 的幂等 `nameStartedRun`（`automation.ts:282`），所以不依赖 LAB-06 那一路先把 `experiment_ext` 写好。两者之间不需要锁，也不存在先后约定。
- 落选的做法 ②：合流后的单流从落库游标起读，重启后，落库游标之前已经 `run_started`、仍为 Open 的运行不会再进 `followLifecycle`，`watchRun` 不再建立，D12-17 的 `run` 频道失去推送。这直接违反“`followLifecycle` 不变”，落选成立。
- 落选的做法 ①：合流后的单流从 `"0"` 起读，自动化不再以 `after=<落库游标>` 订阅，改写的是 D30-02 how 和 D7-10 的逐字条款。按 `SOR/AGENTS.md:123`“leader 不当契约来源”，这不能当作私有结构单方放行，落选成立。本行对 ① 的落选只依据 F1、F2 的原文，不依据闸门 A 引错的那条落选项（F8 已核正），论证没有断点。
- 改动路径都在 W-09 白名单内，不涉及其他席位。表决期间只暂停依赖部分，符合 D10-08。

## divergent 立场（有没有更简明、零串行等待的主路径）

- 由于 LAB-06 必须从 `"0"` 重放，任何合流都只能从 `"0"` 起读，也就是做法 ①。换句话说，“单一输入”实际只有做法 ① 这一条路，没有能同时保住两条契约的第三种合流方式。
- 做法 ① 还会在主路径上引入串行等待。`follow`（`experiments.ts:104-115`）对每一帧都要等 `onData` 完成才读下一帧，而自动化消费者在每条事件上会 `await openConversation`（`automation.ts:290`）。两路合成一条后，LAB-06 的 `catalog`/`run` 通知和 `watchRun` 的建立要排在自动化开会话之后，两个消费者从互不等待变成首尾串行。现行两路结构正好是 U83–U84 所要的“零串行等待”形态，合流反而退步。
- 合流的收益只是每个 Lab runtime 上少一条到本 Lab store 的长连接。D18-05 规定一个 Lab 一套 store，所以连接数是常数，不随规模增长。`(U)` 中也没有关于连接数的要求。现状就是更简明的方案，没有更优的替代。

## 结论

两个立场下都没有找到主路径失效的反例，投赞成，不附反例。

