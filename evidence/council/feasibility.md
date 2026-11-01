# 议会 daemon 可行性与验证证据

方案见 [`design.md`](design.md)，实现见 PM 仓 `tools/council/`。证据标记沿用 PM 仓的约定：`(R)` 运行输出，`(D)` 文档。

- §1–§6 是第一阶段的机制探针，探针代码在 `/tmp/council-probe/`（`daemon.ts`、`cli.ts`、`concurrency.sh`、`emit-pair.sh`），只验证机制，不是实现。
- §8–§10 是第二阶段对实际实现的端到端验证、同负载内存对比和生产托管验证。

## 1. 两个进程并发投票，两票都不丢 — 通过

脚本 `concurrency.sh` 依次做两件事：
1. 后台同时起两个 CLI 进程，对同一行 `PROBE-01` 投票；
2. 两个进程交错发出各 50 张票，压测写入。

最后通过 daemon 读出全部选票，并直接查询 SQLite。

(R) 输出（2026-11-01T15:52:08Z）：

```
{"ok":true}
{"ok":true}
--- stress: 2 procs x 50 rows each, interleaved
PROBE-01: [{"row":"PROBE-01","seat":"Argon","choice":"approve"},{"row":"PROBE-01","seat":"ClaudeHigh","choice":"oppose"}]
stress ballots: 100 LeadMentor: 50 Main: 50
journal_mode = wal
count(*) from event = 102
```

**结论：**
- 两票都在：同一行的两张并发选票分属两个席位，都已写入。
- 压测无丢失：100 张交错选票全部写入。
- 事件不缺：事件表有 102 条，等于 2 + 100，每张票各产生一个事件。

并发由 daemon 单进程内的 SQLite 事务依次执行来保证，数据库处于 WAL 模式。

## 2. gh 写 Pepgent/PM 的 issue、评论与 Project 状态 — 通过（附一项发现）

以 RiriAgent 身份依次执行：建 issue、发评论、改写正文、加入 Project #1、Status 设为 `In progress`、再设为 `Done`、关闭 issue、从 Project 移除测试条目。

(R) 输出（2026-11-01T15:53:21Z）：

```
created: https://github.com/Pepgent/PM/issues/35
https://github.com/Pepgent/PM/issues/35#issuecomment-6560261829
https://github.com/Pepgent/PM/issues/35
project item: PVTI_lADOE4p_hs4BjKDXzhFLiNM
status -> In progress
status -> Done
[council-probe] 议会 daemon 可行性探针（验证后关闭）	Done
! Issue Pepgent/PM#35 ([council-probe] 议会 daemon 可行性探针（验证后关闭）) is already closed
project item removed
35	[council-probe] 议会 daemon 可行性探针（验证后关闭）	CLOSED	RiriAgent	1
```

- 测试 issue：[Pepgent/PM#35](https://github.com/Pepgent/PM/issues/35)，已关闭；它在 Project #1 中的测试条目已移除。
- **发现：** 把 Project #1 的 Status 设为 `Done` 时，项目工作流自动关闭了 issue。因此 `gh issue close --comment` 只提示“already closed”，附带的评论没有发出，这个 issue 最终只有 1 条评论。对 daemon 的影响：先单独发最终计票评论，再改 Status，最后照常 close（design §8 已按此写）。
- 实测 Project #1 有一个 Status 单选字段，选项为 `Todo`、`In progress` 和 `Done`。字段和选项的 id 都已取到（见上面的命令输出），daemon 直接使用。
- `decision` 标签存在。

## 3. watch 加 monitor：正则命中一条、漏过非目标事件 — 通过

### 3.1 事件流

先用 `exec_command` 跑 `bun cli.ts watch`，再依次发三条事件：发给 `@Argon` 的投票请求、发给 `@Main` 的投票请求、发给 `@Main` 的其他种类事件。watch 终端的 (R) 内容如下：

```
WATCH ready to=*
EVT 103 2026-11-01T15:52:26.312Z @Argon vote.request agenda=D99 rows=D99-01 note=should-not-match
EVT 104 2026-11-01T15:52:28.354Z @Main vote.request agenda=D99 rows=D99-01 note=should-match
EVT 105 2026-11-01T15:52:30.384Z @Main status.batch agenda=D99 note=other-kind-should-not-match
```

### 3.2 monitor 唤醒：本会话与 subagent 会话各测一次

本次执行者 CouncilDaemon 是 Main 的 subagent。unified-exec 的通知只在本轮结束（run settle）后才送达，所以本会话的 monitor 结果到交回第一阶段结果之后才收到。

(R) 本会话对 §3.1 那个 watch 设的 monitor，条件为 `^EVT \d+ \S+ @Main vote\.request\b`、`max_returns: 1`。它在本轮结束后送达：

```
- session_id=3 title="council watch (all)"
  • monitor matched 1 line
    EVT 104 2026-11-01T15:52:28.354Z @Main vote.request agenda=D99 rows=D99-01 note=should-match
    returns: 1/1; limit reached, monitor ended
  • returned abnormally: exit_code=1
```

结论：在当前会话中，正则只命中了目标行 EVT 104；EVT 103（`@Argon`）和 EVT 105（`@Main` 但 kind 不同）都被漏过。同一条通知中的“异常返回”就是 §3.3 所述的客户端超时。

通知要等本轮结束才送达，这一点见 (D) omp-unified-exec README 的 “Terminal notices” 一节：

> While a run is in progress … notices only wait … When the run settles, everything pending goes out as one message with `triggerTurn: true`

因此等待期间，另用 subagent `CouncilDaemon.ProbeSeat`（task:low）验证完整的“idle 后被唤醒”链路，步骤如下：
1. 它挂 watch，并设 monitor，条件为 `^EVT \d+ \S+ @ProbeSeat vote\.request\b`；
2. 挂好后结束本轮，进入 idle；
3. 再依次发三条事件：同收件人但 kind 不符、别的席位、目标事件。

(R) 事件流：

```
EVT 106 2026-11-01T15:53:59.333Z @ProbeSeat status.batch note=non-target-kind-should-not-wake
EVT 107 2026-11-01T15:54:02.362Z @Argon vote.request note=other-seat-should-not-wake
EVT 108 2026-11-01T15:54:05.405Z @ProbeSeat vote.request agenda=D99 rows=D99-01 note=target-should-wake
```

(R) ProbeSeat 写下的 `/tmp/council-probe/state/probe-seat.log`：

```
SEEN exec_command=yes monitor=yes 2026-11-01T15:53:22Z
ARMED session=1 2026-11-01T15:53:35Z
EVT 108 2026-11-01T15:54:05.405Z @ProbeSeat vote.request agenda=D99 rows=D99-01 note=target-should-wake
WOKE 2026-11-01T15:54:09Z
```

(R) ProbeSeat 的会话记录（`history://CouncilDaemon.ProbeSeat`）显示：本轮以 `ARMED session=1` 结束后，只收到一条 `[unified-exec-notice] … 1 notice`，随后那一轮写下 `WOKE`。

**结论：**
- **漏过：** 两条非目标事件都没有唤醒 ProbeSeat。
- **命中：** 目标事件发出后约 4 秒，idle 的 subagent 被唤醒，读到了匹配行。
- **不打扰父会话：** 这一轮由通知触发，结果没有作为 agent 输出回传。`agent://CouncilDaemon.ProbeSeat` 仍是 `ARMED session=1`，父会话也没有收到投递。所以席位被唤醒，不会连带唤醒它的父会话 Main。

### 3.3 断流时订阅者会被唤醒

探针的第一版 CLI 用 Bun `fetch` 读事件流，约 5 分钟后报 `TimeoutError: The operation timed out.`，watch 进程以 exit 1 退出。实现时要给 `fetch` 加 `timeout: false`，探针已改。

这次意外退出正好验证了一条路径。(R) ProbeSeat 的会话记录中，紧接着出现 `[unified-exec-notice] … 1 terminal, 2 notices`，内容是 monitor 结束和异常返回，ProbeSeat 因此被唤醒。可见 watch 断流时，订阅者会自动收到通知，不需要另设心跳（design §6.2）。

## 4. 同进程 subagent 能否用 exec_command 和 monitor

- **(R) 可用：** 默认工具集的 subagent 可以用。ProbeSeat 写下 `SEEN exec_command=yes monitor=yes`，并实际调用成功；本执行者自己也是 subagent，同样有这两个设备。
- **(D) 受限工具清单下仍附加：** omp 文档 `task-agent-discovery.md` 原文：

  > `tools` accepts CSV or array … Omitted or YAML-null `tools` selects the default built-in toolset. … MCP, extension, and custom tools remain additive.

  `exec_command` 和 `monitor` 由扩展 omp-unified-exec 注册（`omp-unified-exec/src/index.ts` 中的 `pi.registerTool({ name: "monitor", … })`）。因此 `.omp/agents/claude-high.md`（`tools: read, grep, glob, find, write`）和 `lead-mentor.md` 这类受限定义，按文档也应附带这两个工具。
- **未实测：** 本执行者能派生的 agent 类型中没有 claude-high 和 lead-mentor，所以受限定义没有实测。这一点作为待确认项 T5，提供两个备选：
  - 在这两个定义的 `tools:` 中加 bash；
  - daemon 增设投递目录，用 `write` 投票。
- **(D) 各定义的 tools 字段：**

  | 定义 | tools |
  |---|---|
  | area-manager | read, grep, glob, bash, write |
  | claude-high、lead-mentor | read, grep, glob, find, write |
  | secretary、soroi-keeper-*、omomp-optimizer | 含 bash |
  | argon、argon-sol、argon-governance、argon-governance-sol | 未写 tools，即默认工具集 |

- **(D) park 会结束订阅：**
  - `.omp/settings/soroi.yml` 中 `task.agentIdleTtlMs: 420000`。
  - omp 文档 `tools/task.md` 原文：

    > `idle` agents are parked after `task.agentIdleTtlMs` (session disposed …) … `"Main"` is never parked.

  - unified-exec README 原文：

    > Session shutdown stops the lifecycle before ending terminals

  - 由此推断：subagent idle 7 分钟后会被 park，会话销毁时它的 watch 终端也被结束，订阅随之失效。第 5 节的实测证实了这一点。

## 5. park 后订阅是否存活 — 不存活

用 §3.3 修好的 CLI（`timeout: false`）重做一遍：
1. 让 ProbeSeat 重新挂 watch 和 monitor；
2. 同时在本执行者会话里挂一个同版本的 `watch Main` 作为对照；
3. 等待超过 7 分钟。

(R) `probe-seat.log` 中，ProbeSeat 的最后一轮记录为：

```
ARMED2 session=2 2026-11-01T16:02:19Z
```

(R) 两个时间点的 `ps`：

```
# ProbeSeat 写下 ARMED2 之后的第一次 ps（该次输出未打印时间，约在 16:02:19Z 之后 25 秒内）
 6669 93633 Mon Nov  2 01:02:09 2026 /opt/homebrew/bin/bun /tmp/council-probe/cli.ts watch Main   ← 对照（本执行者，running）
 6689 93633 Mon Nov  2 01:02:11 2026 /opt/homebrew/bin/bun /tmp/council-probe/cli.ts watch        ← ProbeSeat
# 2026-11-01T16:11:05Z
 6669 93633 Mon Nov  2 01:02:09 2026 /opt/homebrew/bin/bun /tmp/council-probe/cli.ts watch Main
```

(R) `read history://` 中 ProbeSeat 的状态：

```
| CouncilDaemon.ProbeSeat | parked | sub | CouncilDaemon | 2m ago |
```

(R) 16:11:09Z 向 `@ProbeSeat` 发一条目标 `vote.request`。15 秒后 `probe-seat.log` 没有新增行，ProbeSeat 没有被唤醒。

**结论：**
- subagent idle 超过 `task.agentIdleTtlMs`（本仓设为 7 分钟）后被 park，它的 watch 进程随会话销毁一起被结束，此后的事件无法唤醒它。
- 对照组的 watch 进程同版本，一直存活，可见 ProbeSeat 的 watch 消失不是客户端超时，而是 park 造成的。
- 同一份 `history://` 列表显示，当时 Argon、ArgonSol、ArgonGovernance(Sol)、LeadMentor、SoroiKeeper*、OmompOptimizer、Secretary 和各片区经理全部处于 `parked`。

因此常驻席位要靠自己的订阅接收投票请求，前提是先解决 park 问题，见 design §10.3 的 T3。

## 6. launchd 用户 agent 托管 — 通过

用临时 plist `/tmp/council-probe/xyz.pepgent.council-probe.plist` 做一次性试运行：`RunAtLoad`，`PATH` 设为 mise shims 加 `/opt/homebrew/bin`，依次执行 `launchctl bootstrap gui/$UID …` 和 `bootout`。

(R) `/tmp/council-probe/state/launchd-probe.log`：

```
launchd-probe 2026-11-01T15:53:49Z pid=3391 ppid=1
PATH=/Users/mouriya/.local/share/mise/shims:/opt/homebrew/bin:/usr/bin:/bin
bun: /Users/mouriya/.local/share/mise/shims/bun 1.4.4
gh: /opt/homebrew/bin/gh user=RiriAgent
bun:sqlite ok 3.54.0
```

(R) `launchctl print`：`runs = 1`、`last exit code = 0`；`bootout` 返回 0。

**结论：**
- 由 launchd 拉起的进程，父进程是 launchd（`ppid=1`），与 omp 进程无关，harness 重启不影响它。
- 在 launchd 环境下，mise shim 的 bun 和 `bun:sqlite` 可用，gh 以 RiriAgent 身份通过认证。
- 另外确认 `Bun.YAML.parse` 可用，可以用它解析提案 YAML。

## 7. 第一阶段未覆盖项的去向

- 归档写入：第二阶段改用 Git Data API 一次提交（T8），已在 §8 实测。
- 受限 `tools:` 的定义：claude-high 由两位审阅者实测可用 `exec_command`（review-claude-high-steady §3.2、review-claude-high-divergent T5）；lead-mentor 在 §8 实测投票。
- Main 自身的 watch 加 monitor：仍由 Main 在生产切换后亲测（主会话不会被 park，通知在本轮结束后送达）。

## 8. 第二阶段端到端验证（实际实现）— 通过

测试实例与生产实例代码相同，只用环境变量换成独立的库与 socket（`COUNCIL_STATE_DIR=/tmp/council-e2e/state`）、标题前缀 `[council-probe] `、不加 `decision` 标签、归档目录 `evidence/council/e2e`、编号从 D900 起。脚本在 `/tmp/council-e2e/step-*.sh`。

参与者：
- 本执行者：以 Coordination、ClaudeHigh、ArgonGovernance 身份投票，并作为发起人；
- subagent `CouncilDaemon.SeatArgonProbe`（task:low）：扮演 Argon 席，只靠 `council watch --to Argon` 加 monitor `^EVT ` 被唤醒后自行投票；
- Main 派出的 lead-mentor 定义实例 `LeadMentorCouncilE2E`：用 `exec_command` 进场并投票。

### 8.1 实现过程中发现并修复的问题

| 现象 (R) | 原因 | 修复 |
|---|---|---|
| watch 连接约 10 秒后断开，daemon 日志 `warn: Bun.serve() timed out a request after 10 seconds`，watch 输出 `ECONNRESET` | unix socket 服务默认 10 秒空闲超时；按请求设置 `server.timeout(req, 0)` 对 unix socket 无效 | `Bun.serve` 顶层设 `idleTimeout: 0`（与第一阶段探针一致；Bun 类型未声明该字段，代码以 `@ts-expect-error` 注明）。修复后三个 watch 持续连接（`/health` 的 `watching: ["AreaMgrProbe","Argon","Main"]`）。 |
| 立案时 `gh project item-add` 报 `Content already exists in this project`，重试又建出新 issue，产生 [PM#36](https://github.com/Pepgent/PM/issues/36)、[#37](https://github.com/Pepgent/PM/issues/37)、[#38](https://github.com/Pepgent/PM/issues/38)、[#39](https://github.com/Pepgent/PM/issues/39) | Project #1 现已自动收录 PM 新 issue（四个 issue 都已在 Project 中、Status 为 Todo）；立案一步失败后从头重来 | 立案分步记录：先把 issue 号写库，再查 issue 已有的 Project 条目（GraphQL `projectItems`），找不到才 `item-add`。四个重复 issue 已带说明关闭并移出 Project。 |
| watch 被异常断开时，Argon 席被“异常返回”通知唤醒并自行重新订阅 | 断流来自本表第一行的 10 秒超时和修复期间的 daemon 重启 | 不需修复，正是 design §7.1 的断流路径：`seat-argon.log` 中 6 次 `STREAM-ENDED`，每次之后都有新的 `ARMED session=<n>`（首次挂订阅另有 1 次 `ARMED`）。 |
| `council propose --file draft.yaml` 报 `proposal must be a mapping` | CLI 把路径字符串当成 YAML 解析 | `--file` 一律读取文件内容。 |

### 8.2 完整议程 D900（[PM#40](https://github.com/Pepgent/PM/issues/40)）

(R) 按时间顺序，事件取自测试库 `event` 表，时间为 UTC：

| 时间 | 动作 | 观察 |
|---|---|---|
| — | `council propose --as CouncilDaemon --seat Coordination --file draft.yaml`（两行：D900-01 标“技术”、notify AreaMgrProbe；D900-02 标“实现”，实为工作流事项） | `D900 filed` |
| 16:38:40–41 | 立案 | 事件 #1–#8 在 16:38:40.362 写入：`@ArgonGovernance agenda.opened`（wake），`vote.request` 发给 `@Main`（seat=Coordination、seat=ClaudeHigh 各一条）、`@Argon`、`@LeadMentor`；daemon 日志 `16:38:41.737Z outbox #1 fileIssue D900: PM#40` |
| 16:38:43 | Argon 席 subagent 被唤醒 | `seat-argon.log`：`WOKE 2026-11-01T16:38:43Z`，`Argon: vote D900 now — rows D900-01@v1, D900-02@v1`，`2 ballot(s) recorded for Argon on D900.`（票记于 16:38:48.448） |
| 16:39:15 | 两个进程同时投票：Coordination 两行赞成；ClaudeHigh 对 D900-01 赞成、对 D900-02 反对并附反例 | 两条都 `recorded`；`@Main row.contested D900 row=D900-02 v=1 by=ClaudeHigh` |
| 16:39:21 | ArgonGovernance 认领 D900-02 的治理领域；发起人 `rebut`；发起人把 D900-02 修订为 v2 | D900-02 的资格席变为 5 席、门槛 4；v1 的票全部不计；`@ArgonGovernance vote.request`，`@Main counter.rebutted`；v2 的 `vote.request` 发给全部 5 个资格席 |
| 16:39:23.355 | lead-mentor 定义实例按 Main 转来的 brief 进场 | `@Main seat.enter`（只进 digest）；Main 转述的原样输出：`LeadMentorCouncilE2E now holds LeadMentor.`／`LeadMentor: vote D900 now — rows D900-01@v1, D900-02@v2`／`2 ballot(s) recorded for LeadMentor on D900.`，三条退出码都是 0 |
| 16:39:24 | Argon 席再次被唤醒 | `seat-argon.log`：`! #14 … rows=D900-02@v2`，`1 ballot(s) recorded for Argon on D900.` |
| 16:39:27.3 | Coordination、ClaudeHigh（新实例 ClaudeHighE2E2）、ArgonGovernance 对 v2 投赞成 | — |
| 16:39:29.059 | LeadMentor 两票记入 | — |
| 16:39:29.059 | D900-01 通过 | `EVT 18 … @AreaMgrProbe row.passed D900 row=D900-01 v=1 result=passed`（AreaMgrProbe 的 watch 当即收到），早于议程定案 |
| 16:39:29.278 | D900-02 通过、议程定案 | `row.passed D900-02 v=2`、`agenda.decided`（只进 Main 的 digest） |
| 16:39:40 | outbox 定案 | `finalize D900: status Done; issue was OPEN`（Project 自动关闭尚未发生，daemon 自行关闭） |
| 16:39:43 | outbox 归档 | `archive D900: commit 9d823d4bd8a45a9ed4552ff234d00ff92fa9a6a6`；`@Secretary agenda.archived` |

(R) 测试库计票（`council tally D900`）：

```
D900 [P1] 议会 daemon 端到端验证议程（验证后关闭） — decided (PM#40)
  D900-01 v1 [技术] eligible=Coordination,ClaudeHigh,Argon,LeadMentor threshold=3
    Coordination approve by CouncilDaemon / ClaudeHigh approve by ClaudeHighE2E / Argon approve by Argon / LeadMentor approve by LeadMentorCouncilE2E
    → 通过 4/4（门槛 3）
  D900-02 v2 [实现] eligible=Coordination,ClaudeHigh,Argon,LeadMentor,ArgonGovernance threshold=4
    Coordination approve by CouncilDaemon / ClaudeHigh approve by ClaudeHighE2E2 / Argon approve by Argon / LeadMentor approve by LeadMentorCouncilE2E / ArgonGovernance approve by ArgonGovernance
    → 通过 5/5（门槛 4）
```

(R) GitHub 侧：

```
gh issue view 40: {"author":"RiriAgent","comments":14,"project":["PM:Done"],"state":"CLOSED", "title":"[council-probe] [P1] D900：议会 daemon 端到端验证议程（验证后关闭）"}
评论首行依次：选票 Argon / 选票 Coordination / 选票 ClaudeHigh / D900-02 职能领域认领 / D900-02 v1 反驳 / D900-02 修订为 v2 / 选票 Coordination / 选票 ClaudeHigh / 选票 ArgonGovernance / 选票 LeadMentor / D900-01 v1 结果：通过 4/4 / 选票 Argon / D900-02 v2 结果：通过 5/5 / D900 已定案
commit 9d823d4bd8a4 "council(D900): archive decision and ballots for PM#40"，一次提交包含：
  evidence/council/e2e/decisions/D900-council-e2e.md
  evidence/council/e2e/votes/D900-{Argon,ArgonGovernance,ClaudeHigh,Coordination,LeadMentor}.md
提交后 main 的 HEAD 即该提交。
```

正文由程序渲染：决策项表含 what/where/how/取舍/分类/缺失部分或设计补充/职能领域/逐席票（含在席 agent）/结果。

### 8.3 状态通道与唤醒集合

(R) `step-status.sh` 在 16:40:30 发布三条状态：progress、blocked、dependency（`--to AreaMgrProbe`）。
- Main 的 watch 只新增一行：`EVT 25 … @Main status.blocked … | 端到端验证：W-07 上报 BLOCKED，应唤醒 Main`。
- AreaMgrProbe 的 watch 新增：`EVT 27 … @AreaMgrProbe status.dependency …`。
- `council digest --reader Main` 一次列出 15 条：唤醒事件（`!`）在前，包括投票请求、反例、反驳和 BLOCKED；随后是只进 digest 的 `agenda.opened`、`seat.enter`（LeadMentor 进场）、两条 `row.passed`、`agenda.decided`、`agenda.archived`、progress 和 dependency，状态附全文。再读一次输出 `Main: nothing new since #26`。
- Main 的 watch 全程收到的事件都在唤醒集合内（design §7.2），`seat.enter`、progress 和 `agenda.decided` 都没有唤醒它。

### 8.4 规则测试

(R) `cd tools/council && bunx tsc -p . && bun test`：类型检查无错误，`18 pass 0 fail 52 expect() calls`。覆盖 design §15 所列情形。

## 9. idle park 关闭前后的同负载内存对比

subagent `CouncilDaemon.IdleTtlMemTest`（task:mid）在 `/tmp/council-memtest/` 做了两轮测试，完整报告见 `/tmp/council-memtest/result.md`：
- 两轮各起一个独立的交互式 omp，模型都是 `opencode-go/deepseek-v4.1-flash`；
- 一轮的 `--config` 覆盖层设 `task.agentIdleTtlMs: 60000`，另一轮设 `0`；
- prompt 逐字相同，各派 8 个 `task:free` 子代理读 `/etc/hosts`，8/8 完成；
- 看到 DONE 后每 30 秒取一次 omp 主进程 RSS，共 11 个样本，覆盖 300 秒。

(R) RSS（KiB），以各轮首样本为 0 秒：

| 秒 | TTL=60000 | TTL=0 |
|---:|---:|---:|
| 0 | 358128 | 751184 |
| 60 | 381344 | 752240 |
| 120 | 362848 | 486928 |
| 180 | 240864 | 480240 |
| 240 | 334064 | 452784 |
| 300 | 333360 | 440256 |

**结论与限制：**
- 末样本相差 104.4 MiB，TTL=0 一侧高。按 8 个空闲 subagent 计，每个不 park 的空闲 subagent 约多占 13 MiB。这只是这一次的观测，不是可靠的单位成本。
- 两轮都没有观察到明确的 park 事件。TTL=0 一轮在约 90 秒时也下降了约 230 MiB；两轮子代理实际的工具调用轨迹也不同。因此不能把差值全部归因于 park。
- 首样本分别晚于 DONE 约 35 秒和约 7 秒，没有采到 DONE 瞬间的 RSS。
- 作为对照，Main 进程（pid 93633，`omp --resume`）在 2026-11-01T16:46:01Z 的 RSS 为 742016 KiB（`ps -o pid,rss,command -p 93633`）。
- 设为 0 后，内存会随常驻的空闲 subagent 数量增长，所以 design §11.2 要求派出方在一次性实例完成后释放它们。是否需要在生产环境中再做长时间观测，由 Main 在切换后决定。

## 10. 生产实例托管 — 通过

(R) `council daemon install` 之后：

```
installed /Users/mouriya/Library/LaunchAgents/org.pepgent.council.plist
state = running
program = /Users/mouriya/.local/share/mise/shims/bun
properties = keepalive | runatload | inferred program
  PID PPID COMMAND
31030    1 /opt/homebrew/bin/bun /Users/mouriya/Ext/code/pepgent/pepgent-pm/tools/council/src/daemon.ts
daemon.log: council daemon pid=31030 socket=/Users/mouriya/.local/state/pepgent-council/council.sock db=/Users/mouriya/.local/state/pepgent-council/council.db repo=Pepgent/PM
```

(R) `step-launchd.sh`（16:43:34Z），同时挂着一个生产实例的 `council watch --to RestartProbe`：

```
before pid=31030   /health watching=["RestartProbe"] outboxPending=0
council daemon restart → after restart pid=31118
kill -9 → after kill -9 pid=31145   runs = 3   last terminating signal = Killed: 9
/health pid=31145 outboxPending=0 outboxError=null
council queue → no open agendas
```

- `council daemon restart` 后，RestartProbe 的 watch 以 exit_code=1 退出（`ECONNRESET`），unified-exec 把它标为 `returned abnormally`，订阅者会因此被唤醒。
- `kill -9` 后，launchd 按 KeepAlive 自动拉起了新进程。
- 生产库为空库，下一个编号为 D25；各常驻席位的默认在席者为与席位同名的 agent，顶岗时由 Main 执行 `council seat enter`。
