# D34：Pepgent#19 LAB-09：维持两路 lifecycle 订阅，不实施合流（P0）——定稿

决策 issue：[Pepgent/PM#53](https://github.com/Pepgent/PM/issues/53)。发起：Coordination（DeskPepgent19P0）。本文件由议会 daemon 生成。

## 事实

- **来由：** [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)（LAB-09，W-09），[BLOCKED 评论 6562606897](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6562606897)：把 Lab 对同一 store 的两条 `GET /stream/lifecycle` 订阅改成“单一输入、多消费者”的改造提议。已合入的 LAB-09（[PR#62](https://github.com/Pepgent/Pepgent/pull/62) `7c7bbf6`、[PR#64](https://github.com/Pepgent/Pepgent/pull/64) `d952948`）不受影响。闸门材料（PM `f6309ed`）：[`evidence/gates/pepgent19-lifecycle-merge.md`](https://github.com/Pepgent/PM/blob/f6309ed16e82e4fdefff855f249c6647a118efe3/evidence/gates/pepgent19-lifecycle-merge.md)、[`-gate-a.md`](https://github.com/Pepgent/PM/blob/f6309ed16e82e4fdefff855f249c6647a118efe3/evidence/gates/pepgent19-lifecycle-merge-gate-a.md)、[`-gate-b.md`](https://github.com/Pepgent/PM/blob/f6309ed16e82e4fdefff855f249c6647a118efe3/evidence/gates/pepgent19-lifecycle-merge-gate-b.md)。
- **为什么要投票：** 两道闸门都判定越界。闸门 A（`Argon-2`）：做法 ① 与 ② 都越过已通过的 D30-02 / D7-10 契约，不可免票放行（`GATE/pepgent19-lifecycle-merge-gate-a.md:13,19-22`）。闸门 B（`ArgonGovernance-2`）：两种做法都越界，若要实施必须按 P0 修订 D30-02（`GATE/pepgent19-lifecycle-merge-gate-b.md:12,23-28`）。C2-2.2 原文：“仅当 A、B 双闸门均确认无越界时方可免投票放行，否则按 `P0` 立即进入投票”（`SOR/AGENTS.md:60`）。
- **程序偏差（本议程补上的步骤）：** 上一承接实例 `DeskPepgent19Blocked` 在初审材料中把程序依据写成“任一闸门认定越界，由起草人决定按 P0 立案表决，还是撤回该提议、维持已合入的现状”（`GATE/pepgent19-lifecycle-merge.md:6`），这一句不是 C2-2.2 原文；随后采用“撤回该合并提议，不立案”（`:69`），并在 [#19 评论 6562704050](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6562704050) 宣布“撤回提议，不实施，不立案”、这条 BLOCKED 结案 (R)。两道闸门“支持处置 a、不开 P0 / 不立案符合程序”的意见（`gate-a.md:13,24`；`gate-b.md:13,38`）同样与 C2-2.2 不符。双闸门任一越界即须 P0 表决，承接者没有撤回免投票的选项。本议程补上这一步：6562704050 的处置改为等待本议程表决。
- **表决期间：** W-09 保持两路订阅、不实施合流，其余工作照常；闸门 B 判定这符合“只暂停依赖部分”（`gate-b.md:30-32`；D10-08，`DEC/D10-repo-delivery.md:20`）。
- **参投席位与门槛：** 改动路径都在 W-09 `Pepgent` 白名单内，不涉及其他席位的派工或路径（`gate-b.md:19-21`），不属组织治理领域；由 4 席逐行投票：总协调指挥席、独立正反审查席 `claude-high`、产品原始意图席 `Argon`、独立导师仲裁席 `LeadMentor`，至少 3 席赞成、无未清零反例、无成立的专责否决即通过（`SOR/AGENTS.md:22,27`）。优先级 P0（关键路径工程 BLOCKED 解阻，`SOR/AGENTS.md:26`）。
- **用户原话：** `LEDGER.md` 的 `(U)` 索引中没有涉及生命周期订阅、连接条数或长连接的原话 (R)（在 `SOR/LEDGER.md` 检索“长连接/连接数/订阅/lifecycle”，只命中 D29 索引行与 U102–U105，与本项无关）。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 命令输出；`(A)` agent 的说法（工人评论属 `(A)`）。路径简称：`SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`；`DEC/` = `pepgent-pm/evidence/decisions/`；`GATE/` = `pepgent-pm/evidence/gates/`（PM `f6309ed`）；`LAB/` = `Pepgent/Pepgent` main `1bf7683` 的 `apps/web/src/server/lab/`（经 `gh api repos/Pepgent/Pepgent/contents/<path>?ref=1bf7683` 读取，未触碰根 checkout）。

| # | 决定性事实 | 来源 |
|---|---|---|
| F1 | D30-02 v1（4/4 通过）how 栏：“自动化对该 Lab 的 store 以 `GET /stream/lifecycle?after=<落库游标>` 订阅；游标记录不存在时从 `"0"` 开始并建立记录”；末句“store 的接口与 cursor 语义不变；LAB-06 的 `followLifecycle` 不变”。 | (D) `DEC/D30-pepgent-19-lab-automation.md:37` |
| F2 | 回写后的 D7-10：“以 `GET /stream/lifecycle?after=<落库游标>` 订阅……store cursor 接口与 LAB-06 followLifecycle 不变”。 | (D) `DEC/D7-lab-backend.md:70` |
| F3 | LAB-06 `followLifecycle`：`let cursor = '0'`，以 `stream/lifecycle?after=${cursor}` 订阅；注释“A fresh runtime starts from "0" and replays idempotently; ended runs are not watched.”；为 `run_started` 的 Open 运行起 `watchRun`，向 D12-17 `run` 频道推送。重启后正是靠从 `"0"` 重放，才为停机前已开始、仍 Open 的运行重建 watcher。 | (R) `LAB/experiments.ts:126-129,161-187` |
| F4 | LAB-09 `followAutomationEvents`：游标取 `lifecycle_cursor`（不存在为 `"0"`），以 `stream/lifecycle?after=${persisted()}` 订阅；在同一事务里写入命中的运行并推进游标。 | (R) `LAB/automation.ts:272-286` |
| F5 | 两路订阅都在 `createLabRuntime` 中随 runtime 启停，各自独立：`automationEvents`（有 Mux 与 store 时）、`lifecycle`（有 store 时）。 | (R) `LAB/runtime.ts:150-155` |
| F6 | 工人给出的两种合流做法：① 单流从 `"0"` 起读、自动化消费者按落库游标跳过已处理事件；② 单流从落库游标起读。现状代价是同一 store 多一条长连接，对正确性无影响。 | (A) 评论 6562606897 |
| F7 | 闸门 A 对 ②：改变 LAB-06 `followLifecycle` 重启后从 `"0"` 重放、重建 `watchRun` 的公开行为，重启后在落库游标之前 `run_started`、仍 Open 的运行丢失 `run` 频道通知，违反“`followLifecycle` 不变”。对 ①：取读法二，从 `"0"` 订阅、在客户端跳过，是改写 D30-02 / D7-10 正文的 how，不是契约内私有结构；按“leader 不当契约来源”，任何一方不得单方把 `after=<落库游标>` 解释为可省略的内部细节。 | (D) `GATE/pepgent19-lifecycle-merge-gate-a.md:19-22`；`SOR/AGENTS.md:123` |
| F8 | 对闸门 A 引文的核对：gate-a 所引 `LEDGER.md:111,116` 实为 U81–U82、U87 所在行，U83、U88 在 `LEDGER.md:112,117`；gate-a 称 D30-02 落选方案“已明文淘汰重启后从 `"0"` 全量重放并在客户端过滤”，D30-02 取舍栏实际淘汰的是“从 `"0"` 重放、按时间戳与 `automation_run.trigger` 去重”和“维持内存游标从 `"0"` 开始”，没有按 cursor 在客户端过滤的落选项。本行对做法 ① 的落选只依据 F1、F2 的 how 原文，不依据该落选项说法。 | (D) `GATE/pepgent19-lifecycle-merge.md:70`；`DEC/D30-pepgent-19-lab-automation.md:37`；(R) `SOR/LEDGER.md:112,117` |

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D34-01 v1 | LAB-09 两路 lifecycle 订阅合流提议：**维持 D30-02 v1 的两路订阅不变，不实施合流** | D30-02 v1 how 栏（`DEC/D30-pepgent-19-lab-automation.md:37`）；D7-10 的事件游标条款（`DEC/D7-lab-backend.md:70`）；`Pepgent/Pepgent` main `1bf7683` 的 `apps/web/src/server/lab/experiments.ts:161-187`、`automation.ts:272-286`、`runtime.ts:150-155` | • D30-02 v1 与回写后的 D7-10 正文不改。<br>• Lab 对本 Lab 的 store 保持两条 `GET /stream/lifecycle` 订阅，都随 labRuntime 启停（F5），即 PR#62 `7c7bbf6`、PR#64 `d952948` 已合入的实现，代码不改：<br>　– LAB-06 `followLifecycle`：内存游标，每次启动从 `"0"` 起读，命名与通知幂等重放，并为仍 Open 的运行重建 `watchRun`（F3）；<br>　– LAB-09 `followAutomationEvents`：以 `after=<落库游标>` 订阅，游标取 `lifecycle_cursor`、记录不存在时从 `"0"` 开始，匹配规则、写 `automation_run`、推进游标在同一 SQLite 事务里完成（F4）。<br>• 不实施“单一输入、多消费者”的合流（F6 的做法 ① 与 ②）。<br>• #19 BLOCKED 6562606897 以“不实施合流”解除。 | **得到：**<br>• 已通过的 D30-02 / D7-10 正文与已合入代码都不变，W-09 不返工。<br>• LAB-06 重启后为仍 Open 的运行重建 watcher、推送 D12-17 `run` 频道的行为保留（F3）。<br>• 自动化按落库游标订阅、事件与游标同一权威（D6-06）的口径保留（F4）。<br>**代价：** 同一 store 上多一条 `/stream/lifecycle` 长连接，对正确性无影响（F6）；`(U)` 中没有连接数要求。<br>**落选：**<br>• 做法 ①（单流从 `"0"` 起读，自动化消费者在客户端跳过 cursor 不大于落库游标的事件）：自动化不再以 `after=<落库游标>` 订阅，改写的是 D30-02 how 与 D7-10 的逐字条款（F1、F2）。闸门 A 认定这是改写已通过决策正文，不是契约内私有结构，不能单方解释为实现细节（F7）。采用它须另行修订 D30-02 / D7-10，换来的只是少一条连接。<br>• 做法 ②（单流从落库游标起读，两个消费者共用）：`followLifecycle` 不再从 `"0"` 重放，重启后在落库游标之前 `run_started`、仍 Open 的运行不再建立 `watchRun`，丢失 `run` 频道实时通知，违反 D30-02 与 D7-10 的“LAB-06 的 `followLifecycle` 不变”（F3、F7）。 | 串联 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD34）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D34-Coordination.md`、`votes/D34-ClaudeHigh.md`、`votes/D34-Argon.md`、`votes/D34-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。