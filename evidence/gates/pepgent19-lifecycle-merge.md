# Pepgent#19（LAB-09）BLOCKED 闸门材料：两路 lifecycle 订阅合并为单一输入

- **issue：** [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)，工人 W-09（tern 会话 `pepgent-lab`）。
- **BLOCKED：** [评论 6562606897](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6562606897)（2026-11-01T19:14:12Z）。被阻塞的只有一项改造提议：把 Lab 对同一 store 的两条 `GET /stream/lifecycle` 订阅改成“单一输入、多消费者”。已交付的 LAB-09（[PR#62](https://github.com/Pepgent/Pepgent/pull/62) `7c7bbf6`、[PR#64](https://github.com/Pepgent/Pepgent/pull/64) `d952948`）不受影响，工人保持两路现状、不实施合并。
- **编制：** governance-desk 实例 `DeskPepgent19Blocked`（总协调席，与 Main 合计 1 票）。本文整理事实，并给出承接者的**初审分类**。初审分类只是送审意见，不是裁决；能否免票放行由两道闸门判定。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界，才可免票放行；任一闸门认定越界，由起草人决定按 P0 立案表决，还是撤回该提议、维持已合入的现状。
- **判定结论写入：** `GATE/pepgent19-lifecycle-merge-gate-a.md`（Argon）、`GATE/pepgent19-lifecycle-merge-gate-b.md`（ArgonGovernance）。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件与源码（源码经 `gh api repos/Pepgent/Pepgent/contents/<path>?ref=1bf7683` 取得 main `1bf7683` 的文件，未触碰 `Pepgent/Pepgent` 根 checkout），没有运行构建、类型检查、测试或跨组件程序，没有读 git 历史或 session。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `pepgent-pm/evidence/decisions/`；`GATE/` = `pepgent-pm/evidence/gates/`
- `LAB/` = `Pepgent/Pepgent` main `1bf7683` 的 `apps/web/src/server/lab/`

---

## 一、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | D30-02 v1（4/4 通过）how 栏：“自动化对该 Lab 的 store 以 `GET /stream/lifecycle?after=<落库游标>` 订阅；游标记录不存在时从 `"0"` 开始并建立记录”；“每条事件：按当前已启用的规则匹配，写命中的 `automation_run`，并把游标推进到该事件的 `cursor`，三者在同一个 SQLite 事务里完成”；“重启后从落库游标续读”；末句“store 的接口与 cursor 语义不变；LAB-06 的 `followLifecycle` 不变”。 | (D) `DEC/D30-pepgent-19-lab-automation.md:37` |
| F2 | D30-02 已回写 D7-10：“以 `GET /stream/lifecycle?after=<落库游标>` 订阅……store cursor 接口与 LAB-06 followLifecycle 不变”。D7-02 表清单已补“生命周期游标记录（D30-02）”。 | (D) `DEC/D7-lab-backend.md:70,62` |
| F3 | D30-02 的取舍栏：得到“落实 D7-10 的‘记游标’，与 D6-06‘事件与游标同一权威’一致；每次启动不再对历史事件重复开会话”“不改 store（不跨 W-06）”；落选三案为时间戳去重、维持内存游标从 `"0"` 开始、新增 store 流尾读取。取舍栏没有把“与 LAB-06 共用或分开订阅”列为得失项。 | (D) `DEC/D30-pepgent-19-lab-automation.md:37` |
| F4 | D6-06：cursor 是按提交顺序递增的十进制字符串；`after` 缺省 `"0"`，只读严格大于它的事件；事件与游标同一权威，时间戳不能替代提交游标。接口为 `GET /stream/lifecycle?after={cursor}` → SSE。 | (D) `DEC/D6-store-service.md:34,236-237` |
| F5 | LAB-06 的切片定义：“store 客户端；订阅生命周期流，写 `experiment_ext`；实验状态的投影（D7:66）”，验收“收到 `run_started` 后分配 `R-0xx` 编号”。issue 正文“业务契约保持不变”，不另写订阅起点或连接条数。 | (D) `DEC/D8-mvp-scope.md:326`；[Pepgent#14](https://github.com/Pepgent/Pepgent/issues/14) 正文 (R) |
| F6 | D7-06：生命周期流见非派生 `run_started` 时绑定 sent 意图、写 ext、分配编号；读取时投影实验状态，不落运行状态副本。 | (D) `DEC/D7-lab-backend.md:66` |
| F7 | LAB-06 现行实现 `followLifecycle`：内存游标 `let cursor = '0'`，以 `stream/lifecycle?after=${cursor}` 订阅；每条事件 `nameStartedRun`、发 `catalog`/`run` 通知，并为 `run_started` 的 Open 运行起 `watchRun`（读 `runs/{run}/stream`，发 `run` 频道）。注释：“A fresh runtime starts from "0" and replays idempotently; ended runs are not watched.” 重启后正是靠从 `"0"` 重放，才重新为仍 Open 的运行建立 watcher。 | (D) `LAB/experiments.ts:125-188` |
| F8 | LAB-09 现行实现 `followAutomationEvents`：游标取 `lifecycle_cursor` 表（不存在为 `"0"`），以 `stream/lifecycle?after=${persisted()}` 订阅；每条事件先 `nameStartedRun`，再在一个事务里匹配规则、写 `automation_run`、推进游标，之后为免审批的运行逐个 `await openConversation`。 | (D) `LAB/automation.ts:271-293` |
| F9 | 两路订阅都在 `createLabRuntime` 中随 runtime 启停：`automationEvents`（有 Mux 与 store 时）与 `lifecycle`（有 store 时）各自独立；`stop()` 依次 await。 | (D) `LAB/runtime.ts:148-155,186-190` |
| F10 | 工人给出的两种合流做法：① 单流从 `"0"` 起读，自动化消费者按落库游标跳过已处理事件；② 单流从落库游标起读。工人判断 ① 改变 D30-02 的订阅条款，② 使 `followLifecycle` 不再从 `"0"` 重放、重启后无法重建停机前已开始且仍 Open 的运行的 watcher，违反“`followLifecycle` 不变”。现状代价是同一 store 多一条长连接，对正确性无影响。 | (A) 评论 6562606897 |
| F11 | `LEDGER.md` 的 `(U)` 索引中没有涉及生命周期订阅、连接条数或长连接的用户原话。 | (R) 在 `SOR/LEDGER.md` 检索“长连接/连接数/订阅/lifecycle”，只命中 D29 决策索引行中的“events 订阅者”，与本项无关 |
| F12 | 提议的来源：工人评论只写“这一改造提议”，没有写提议人；#19 评论中在它之前没有提出该合并的评论。现状两路已合入 main 并可工作（F7–F9）。 | (A) 评论 6562606897；(R) `gh api repos/Pepgent/Pepgent/issues/19/comments` |

## 二、初审分类（送审意见）

- **做法 ②（单流从落库游标起读）：触及已通过契约。** 它改变 LAB-06 `followLifecycle` 的起点与重启行为（F7），直接违反 D30-02 与 D7-10 的“`followLifecycle` 不变”（F1、F2），并使重启后仍 Open 的运行不再推送 `run` 频道（D12-17 的通知），属于状态与生命周期的公开行为变更。
- **做法 ①（单流从 `"0"` 起读，自动化按落库游标跳过）：两种读法，请闸门判定。**
  - 读法一（契约内私有结构）：store 接口与 cursor 语义不变（F4），`lab.sqlite` 的游标记录、“同一事务匹配写 run 推进游标”、“重启续读”“规则只处理建立之后的事件”这些可观察语义都不变；把“以 `after=<落库游标>` 订阅”读成实现手段，而 Lab 内部用几条 HTTP 连接属于“已通过契约内的私有代码结构由工程师决定”（`SOR/AGENTS.md:123`）。
  - 读法二（改动已通过的决策正文）：D30-02 how 栏与回写后的 D7-10 逐字规定了自动化“以 `GET /stream/lifecycle?after=<落库游标>` 订阅”（F1、F2）；改为从 `"0"` 订阅、在客户端按十进制大小比较游标跳过，就是改写已通过决策行的 how。按“leader 不当契约来源”，承接者与 Main 都不能把这一句单方解释为实现细节（`SOR/AGENTS.md:123`）。
- **两种做法共有的事实：** 现状两路已合入、可工作，对正确性无影响（F9、F10）；合并的收益只是少一条到同一 store 的长连接。`(U)` 中没有相关原话（F11）。若闸门认定越界，承接者倾向撤回该提议、维持现状，而不为一条连接开 P0（理由见第五节）。

## 三、闸门 A 的问题（交 `Argon`）

- **A-1：** 做法 ② 是否改变 LAB-06 `followLifecycle` 的公开行为与 D30-02“`followLifecycle` 不变”？
- **A-2：** 做法 ① 中“自动化以 `after=<落库游标>` 订阅”是 D30-02/D7-10 的公开契约（读法二），还是已通过契约内由工程师决定的私有结构（读法一）？
- **A-3：** 本项是否涉及产品原始意图？`(U)` 中没有相关原话（F11）。

## 四、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 两种做法都只改 `Pepgent/Pepgent` 的 `apps/web/src/server/lab/**`，是否在 W-09 路径白名单内？
- **B-2：** 若闸门 A 认定做法 ① 属契约内私有结构，由 W-09 自定、在 PR 写明，是否不需要投票？若认定改了 D30-02 正文，是否属于必须投票的事项（定稿决策行只能由新议程修订）？
- **B-3：** 提议未定期间 W-09 保持两路订阅、不实施合并，其余工作照常，是否符合“只暂停依赖部分”（D10-08，`DEC/D10-repo-delivery.md:20`）？
- **B-4：** 若越界，撤回该提议、维持已合入的现状（不立案），是否符合程序？

## 五、可选处置

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 撤回该提议，维持两路订阅现状（PR#62/#64 已合入的实现），#19 的这条 BLOCKED 以“不实施”结案。 | 不改 | 同一 store 多一条长连接（F10） |
| b | 闸门判做法 ① 属契约内私有结构时：W-09 可自定是否合并，PR 写明做法；LAB-06 消费者的行为与 D30-02 的可观察语义不变。 | 不改 | 只在两门都判不越界时可用 |
| c | 按 P0 立案修订 D30-02：把自动化的订阅改为“与 LAB-06 共用一条从 `"0"` 起读的生命周期流，自动化只处理 cursor 大于落库游标的事件”。 | 改 D30-02、D7-10 正文 | 为一条连接的收益占用 4 席一轮 P0 表决 |
| d | 做法 ②。 | 改 LAB-06 行为与 D30-02 | 重启后仍 Open 的运行失去 watcher（F7）；承接者不建议 |

## 六、闸门结论与处置

- **闸门 A（`Argon-2`，`GATE/pepgent19-lifecycle-merge-gate-a.md`）：越界。** 做法 ② 改变 LAB-06 `followLifecycle` 重启后重建 `watchRun` 的行为，违反“`followLifecycle` 不变”；做法 ① 取读法二，从 `"0"` 订阅、在客户端跳过是改写 D30-02/D7-10 的 how，不是契约内私有结构。支持处置 a，不开 P0。
- **闸门 B（`ArgonGovernance-2`，`GATE/pepgent19-lifecycle-merge-gate-b.md`）：越界。** 路径在 W-09 白名单内（B-1）；两种做法若要实施都须按 P0 修订 D30-02（B-2）；未定期间保持两路现状符合“只暂停依赖部分”（B-3）；撤回提议、维持现状、不立案符合程序（B-4）。
- **处置（起草人 `DeskPepgent19Blocked`）：采用处置 a，撤回该合并提议，不立案。** 理由：现状两路订阅就是按 D30-02 v1 实现、已合入 main 且可工作的已通过契约（F7–F9）；合并的唯一收益是同一 store 少一条长连接，对正确性无影响（F10）；`(U)` 中没有相关要求（F11）。为此占用 4 席一轮 P0 表决，属于 `U88` 反对的无实质收益的流程（`SOR/LEDGER.md:117`）。不实施合并不改变任何契约，无需表决。日后若有连接数的实据需要，由提出方另行按 P0 立案修订 D30-02（处置 c）。
- **承接者核对（不影响两门结论，两门结论都只依赖 D30-02 how 栏原文）：** gate-a 所引 `LEDGER.md:111,116` 实为 U81–U82、U87 所在行，`U83`、`U88` 在 `LEDGER.md:112,117`；gate-a 称 D30-02 落选方案“已明文淘汰重启后从 `"0"` 全量重放并在客户端过滤”，D30-02 取舍栏实际淘汰的是“从 `"0"` 重放、按时间戳与 `automation_run.trigger` 去重”和“维持内存游标从 `"0"` 开始”（F3），没有按 cursor 在客户端过滤的落选项；gate-b 对 `SOR/AGENTS.md:123` 的引语不是逐字原文。
