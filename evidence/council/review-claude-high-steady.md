# 议会 daemon 方案审阅（claude-high，steady 立场）

- **审阅对象：** [`design.md`](design.md)、[`feasibility.md`](feasibility.md)
- **对照规则：** pepgent-soroi `AGENTS.md` 中的 D1-12（C2-3）、D1-16、D1-17、C2-1、C3-2、C3-3、C4-1、C4-2、C4-3 和工作方法；`LEDGER.md` 中 U104、U105 的原话（第 116 行）。
- **方式：** 只读审阅。没有查 git、session 或 issue/PR 历史。只做了一次只读探针：本实例的 `exec_command`，见 §3.2。
- **证据标记：** `(D)` 文档原文，`(R)` 运行输出，`[INFERENCE]` 推断。

## 结论

**方案的方向和机制能够落实 U104、U105，但现在还不能进入实现。**

已经成立的部分：

- 单写方 daemon 加 SQLite 事务，满足“可并发修改、由程序控制后写入”。
- outbox 由程序写 issue，满足“issue 写入同样也交由程序实现”。
- launchd 托管，满足“程序需要是 daemon”。
- `council watch` 加 `monitor`，满足“配合 exec command monitor 订阅”。
- `digest` 按批次读，满足 U104 的“主控按批次读”。

可行性证据也支撑这几项。

还不能进入实现的原因：

- 主路径上有 **3 处断点（§2 的 CE-1～CE-3）**，其中 CE-1 在最常见的“反例→修订→重投”流程上必然卡死。
- 编码现行规则时有 **1 处遗漏**：产品全景席的参投条件，见 §1 的 R-3。
- T9 列出的待改文本**不完整**，见 §4 的 T9。

这些都改正后，可以按 design §11 进入第二阶段。

## 1. 现行投票规则的编码是否完整、无偏差

| # | 现行规则（出处） | 方案编码（出处） | 判定 |
|---|---|---|---|
| R-1 | 协调席是 Main 加治理承接者，合计 1 票（AGENTS:13,15） | `Coordination` 席，地址为 Main，occupant 用前缀列表（design:68,79,192） | 一致 |
| R-2 | 基础四席：协调、claude-high、Argon、LeadMentor（AGENTS:22） | 资格席位的基础四席（design:158） | 一致 |
| R-3 | 若议案由 SoroiKeeper 依 U93 发起，**或涉及全局产品架构调整**，对应的产品全景席一并参投（AGENTS:22）。三个独立部门席在“主动发起投票或议案涉及全局产品架构演进时”参投（AGENTS:20） | 只有“发起席是 SoroiKeeper*/OmompOptimizer 时，发起席参投”（design:158） | **遗漏**。例如 Argon 或 Main 发起一项涉及全局产品架构的 P1 议程，按 AGENTS 应加入产品全景席，而 daemon 按四席计票，3 票即判 `passed`。需要在议程上加一个字段（例如 `architectureSeats: SeatId[]`，由起草者声明），纳入资格席位的计算。哪些席位随它加入，按 AGENTS:22 的字面只含产品全景席；如有疑义由管理层确认，设计阶段先写成占位 |
| R-4 | 组织/派工/提效/PM 错误路径议案加 ArgonGovernance（AGENTS:23） | 分类为“治理”的行加 ArgonGovernance（design:158，T7） | 与先例一致，见 T7 |
| R-5 | 门槛为参投席位的 ≥3/4（AGENTS:27） | `ceil(3/4 × 资格席位数)`（design:159） | 一致，并能推广到 6 席及以上 |
| R-6 | 反对票必须附可复现反例，没有反例的作废；有效反例未消除前不得通过（AGENTS:27） | 空反例由 CLI 拒收；有反对票即 `contested`，清零途径有三条：修订、改投、撤回（design:123,167） | 一致。decision-vote skill 写的“用源头实证反驳”，最终也要落到反对席改投，现有的三条途径已经覆盖。skill 不是规则来源（AGENTS:124），不需要另建状态 |
| R-7 | 专责否决必须引用 `(U)`、会话 entry 或已实证的阻断事实；没有引用的只能标“暂定”，不能否决（AGENTS:31） | `Citation` 有三种 variant；没有引用时只能投 `provisionalVeto`（design:124-130,163） | 一致，见 T6 |
| R-8 | 意图与技术之争默认归技术；Argon 坚持时交 LeadMentor 终局仲裁（AGENTS:35） | Argon 否决非意图行时进入 `disputed`，由 LeadMentor 仲裁（design:166） | 一致。把 Argon 投否决视为“坚持”，是合理的编码 |
| R-9 | 统一提案入口：只有 Argon、ArgonGovernance、两席 SoroiKeeper、OmompOptimizer、Main/治理承接者有发起权（AGENTS:25） | `propose --seat S` 没有校验发起权；`proposer.seat: SeatId` 包含 ClaudeHigh 和 LeadMentor（design:67-71,87） | **小偏差**：daemon 应拒收这两席的提案 |
| R-10 | P0→P3 排序，同级按 issue 号 FIFO，全体席位按此顺序表决（AGENTS:26） | 队列规则写“同级按 D 编号”（design:202,251） | 等价：D 编号与 issue 按 outbox 同序产生。“按此顺序表决”是规则本身的要求，见 T2 |
| R-11 | 正文改动后旧票失效（AGENTS:122） | `revise` 使版本加 1，旧票作废（design:101,197） | 一致 |
| R-12 | 每条写明 what/where/how/取舍/分类/各票及理由/结果（AGENTS:9） | 行字段、选票的 `reasons`，以及正文的列（design:102-104,270） | 一致 |
| R-13 | 定稿、选票归档到 PM `evidence/`（C4-3 第 1 项，AGENTS:83） | `decided` 后归档到 `evidence/decisions/` 和 `evidence/votes/`（design:274） | 一致。另注：现有选票文件按在席 agent 命名（如 `D24-ArgonSol.md`、`D23-ArgonGovernanceSol.md`），方案按席位命名（如 `D25-Argon.md`），与 design:276 所说的“沿用现有约定”不符。二选一后在 README 写清即可 |
| R-14 | 状态路由：BLOCKED、ALL_DONE 及各类告警当轮报 Main，普通进度只记录（C4-1，AGENTS:80） | `blocked`/`all_done`/`alert` 发给 `@Main`，`progress`/`note` 进 digest（design:249,253,258-263） | 一致 |
| R-15 | 送达和恢复以片区经理的实际观察为准（C4-2，AGENTS:81） | 片区经理收到 `agenda.decided` 后执行 `tern send`（design:264） | 一致，但依赖 CE-3 的修正 |

## 2. 主路径断点（可复现反例）

### CE-1：claude-high 席没有派发触发，修订后重投必然卡死

- **涉及位置：**
  - design:243：`vote.request` 发给资格席位，地址与席位 id 相同，所以 claude-high 席的地址是 `@ClaudeHigh`。
  - design:302：ClaudeHigh 每个议程派一个全新实例，“不靠订阅”，投完即结束。
  - design:197：`revise` 时，“已投过该行的席位收到 `vote.request reason=revised`”。
  - design:164：资格席位投齐后才定结果。
  - design:80 用 `ClaudeHighD25` 作为 occupant 的例子，但没有规定谁、在何时为这个按议程新建的实例执行 `seat enter`。
- **复现：**
  1. 提出 D25，只有一行 D25-01，分类为“串联”，资格席位为 4 席。
  2. Main 派出 claude-high 实例投 `oppose`（附反例），实例随即结束。其余三席投 `approve`，行转为 `contested`（design:167）。
  3. 发起人执行 `revise D25-01`，版本变为 v2，旧票全部作废。daemon 向 `@ClaudeHigh` 发 `vote.request reason=revised`。
  4. 没有任何进程在 watch `ClaudeHigh`。Main 也收不到“需要再派一个 claude-high 实例”的事件：Main 只在 Coordination 席的队首变化时收到 `@Main vote.request`，而它不携带 ClaudeHigh 的待投信息。
  5. 若 T3 选 (a)，daemon 不发 `seat.unreachable`，`council tally D25` 的 `missing` 永久为 `[ClaudeHigh]`，D25-01 停在 `voting`，议程不会进入 `decided`。若 T3 选 (b)，Main 收到 `seat.unreachable ClaudeHigh`，但方案只规定它对此执行 `write agent://<席位>`，而 ClaudeHigh 不是常驻席位，没有可以唤醒的 agent。
- **现实性：** 这正是 D24 走过的流程：claude-high 首轮反例，v2 消除，第二轮改投赞成。见 PM `evidence/decisions/D24-derive-principal.md:25`。governance-desk 的定义也写明“独立审查席每次派全新的 claude-high 实例投票”（`.omp/agents/governance-desk.md:22`）。
- **修正：**
  - ClaudeHigh 席与 Coordination 一样，地址设为 `Main`，事件带 `seat=ClaudeHigh v=<版本>`。
  - Main 的唤醒集合加入这一项，处理方式是新派一个空白 claude-high 实例，brief 中写明 D 编号和版本。
  - 身份核对改为 ClaudeHigh 席接受前缀列表，例如 `ClaudeHigh*`，与 Coordination 相同。不再要求 `seat enter`。

### CE-2：T3 选 (b) 时，只有 `vote.request` 有不可达检测，其余事件会丢失

- **涉及位置：** design:248 只对 `vote.request` 发 `seat.unreachable`。`arbitration.request`（发给 LeadMentor）、`agenda.decided`（发给 Secretary 和 AreaMgr*）、`row.contested`（发给发起人）都没有对应检测。
- **复现：**
  1. Argon 对一个“技术”行投 `veto`（附引用），四席投齐，行转为 `disputed`。daemon 向 `@LeadMentor` 发 `arbitration.request`。
  2. 此时 LeadMentor 已经被 park。feasibility:195 实测，当时 LeadMentor、Secretary 和各片区经理全部处于 parked。
  3. 由于没有活着的 watch，事件只进入 inbox，又没有 `seat.unreachable`，没有人唤醒 LeadMentor。行永久停在 `disputed`，议程不会进入 `decided`。
  4. 同理，片区经理被 park 时收不到 `agenda.decided`，裁决送达不到工人，C4-2 的送达职责落空。
- **修正：** 若选 (b)，任何事件的收件人没有活着的 watch 时都要发不可达事件（Main 除外）。若选 (a)，此问题只在 harness 重启后出现，由 Main 让席位重新进场时一并解决（design:326）。本审阅推荐 (a)，见 T3。

### CE-3：`revise` 的收件人规则与队列规则矛盾，修订改变分类后新增的资格席收不到请求

- **涉及位置：**
  - design:197：只通知“已投过该行的席位”。
  - design:243,251：只要某行成为某席队首的未投项，就发 `vote.request`。
- **复现：**
  1. D25-01 原分类为“技术”，四席投票。
  2. 发起人修订为“治理”，版本变为 v2。按 T7，ArgonGovernance 成为资格席位。
  3. 若按 design:197 实现，ArgonGovernance 没有投过该行，收不到请求，行停在 `voting`。
- **修正：** 统一规定：收件人等于“当前版本的资格席位”减去“已投当前版本的席位”，由 `tally.ts` 计算。删去 design:197 中的“已投过该行的席位”。

## 3. 可行性证据能否支撑方案的结论

### 3.1 逐项判断

| 方案的结论 | 证据 | 判定 |
|---|---|---|
| 并发投票不丢、不互相覆盖（design:58-59） | feasibility §1 (R)：2 进程同时投票，加 100 张交错选票，事件 102 条，WAL | **支撑** |
| gh 能以 RiriAgent 身份完成建 issue、评论、改正文、Project 状态、关闭（design:270-273） | feasibility §2 (R)，PM#35 | **支撑**。附带一个发现：Status 设为 `Done` 时 issue 会被自动关闭。design:273 仍要求“随后照常执行 `gh issue close`”，实测只得到 “already closed” 提示，exit code 没有记录。outbox 按序执行，若把这一步当作失败，后面的归档会被堵住。建议删去这一步，或把 already closed 当作成功 |
| 归档走 Contents API（design:274-276） | 没有实测（feasibility:222） | **不支撑，方案已自认**。放到第二阶段端到端验证可以接受 |
| watch 加 monitor 能精确命中目标行，idle 的 subagent 能被唤醒且不连带唤醒 Main（design:309） | feasibility §3.2 (R)，ProbeSeat，task:low 默认工具集 | **支撑** |
| 断流时订阅者会收到异常返回通知（design:237） | feasibility §3.3 (R)：触发原因是客户端 fetch 超时，不是 daemon 重启 | **部分支撑**。“daemon 重启会让 watch 以非零码退出”是推断 `[INFERENCE]`。design §11 已把它列入第二阶段验收，可以接受 |
| 受限 `tools:` 的 claude-high、lead-mentor 也有 `exec_command` 和 `monitor`（design:308） | feasibility §4 只有 (D) 文档 | **claude-high 现已有 (R)，见 §3.2；lead-mentor 仍只有 (D)** |
| park 会让订阅失效（design:310） | feasibility §5 (R)：ps 前后对比，同版本 watch 作对照 | **支撑**，证据扎实 |
| launchd 托管与 omp 无关，环境可用（design:281-292） | feasibility §6 (R)：ppid=1，bun/sqlite/gh 可用 | **支撑**。`KeepAlive` 没有实测，属于异常重启路径，不影响主路径 |
| T3(a)“能否按 agent 单独配置尚未查明”（design:323） | 无 | **现已查明**，见 §3.3 |
| T3(b)“parked agent 收到消息会复活”（design:324） | 方案没有给出证据 | (D)：omp `agent-hub.md:118` 写明 “Messaging a parked or killed subagent revives it”；`tools/task.md:144` 写明 `write agent://<id>` 会唤醒 parked agent。**支撑** |

### 3.2 本审阅补充的 (R)：claude-high 定义可以调用 `exec_command`

本实例按 `.omp/agents/claude-high.md` 运行，该定义为 `tools: read, grep, glob, find, write`。本实例的工具列表中有 `xd://exec_command` 和 `xd://monitor` 两个设备。实际调用一次：

```
cmd: echo claude-high-exec-probe; date -u +%Y-%m-%dT%H:%M:%SZ; command -v bun gh
exit_code: 0
claude-high-exec-probe
2026-11-01T16:16:17Z
/Users/mouriya/.local/share/mise/shims/bun
/opt/homebrew/bin/gh
```

由此可知，claude-high 席可以经 `exec_command` 运行 `council vote`，PATH 中有 bun 和 gh。lead-mentor 的工具清单与它相同，按同一机制推断也可以 `[INFERENCE]`，留待第二阶段实测。

### 3.3 本审阅补充的 (D)：idle TTL 只能全局设置

- omp `tools/task.md:192`：“Idle TTL: `task.agentIdleTtlMs`, default `420_000` ms (7 min); `<= 0` disables parking and keeps idle sessions live until exit.”
- omp 文档中没有按 agent 设置 TTL 的入口（在 `omp://` 中检索 `agentIdleTtl|idleTtl|park` 的结果）。
- `tools/task.md:175`：任务结束后的 subagent 保持 `idle`/`parked`，直到进程退出或被显式释放。

因此，选 T3(a) 等于让**所有**已结束的 subagent 常驻内存。本会话的 roster 显示 parked peer 有 301 个。

## 4. T1–T9 的选择与理由

- **T1 选“数据库为源头，issue 正文由程序生成”。**
  - U105 原话是“所有的投票和议题管理均交给程序自动处理，issue写入同样也交由程序实现”，issue 正文只能是程序的发布面。若以 issue 正文为源头，就会有两个写方，违背唯一源头原则。
  - C4-3 第 1 项的“决策表以 PM issue 正文为准”（AGENTS:83）是 U105 的直接后果，按 C2-4 直接改，不另行表决。
  - 改动中，正文禁止手改；`evidence/` 归档仍是定稿的长期副本。
- **T2 选“程序强制顺序”。**
  - AGENTS:26 已规定“全体参投席位按此顺序表决”，这不是可以自由取舍的事项，“全部同时开放、queue 只作建议”不符合规则。
  - 需要补一句语义：“投完”指该席已投当前版本的全部资格行。议程被修订后，按优先级重新进入该席队列。
  - 这个顺序不构成工人的开工锁，与 U83、U84 不冲突。
- **T3 选 (a)：把 `task.agentIdleTtlMs` 设为 `<= 0`。**
  - **理由：** 席位空闲 7 分钟就会被 park，而议程间隔通常更长。若选 (b)，几乎每一个发给常驻席位的事件都会先变成 `@Main seat.unreachable`，Main 再执行一次 `write agent://`。Main 由此重新成为唤醒总线，违背 U104 的“主控不再当消息总线……不每条消息都唤醒”，也违背 U105 的“不需要额外的主动通知机制”。(c) 只是把问题转移给 relay，方案自己也已否定。
  - **两个条件：**
    1. 按 `soroi.yml` 自己的注释（“Later --config overlays can tune idle parking without changing the release”），在领导小组 omp 的 overlay 配置里设置，不改 `soroi.yml` 这个发行文件 `[INFERENCE: 该文件随 soroi 发行]`。
    2. 关闭 park 后，已结束的一次性 subagent 不再被自动回收，内存只能靠执行现有规则“任务完成的 agent 及时回收”（AGENTS:115）来控制，对象包括 governance-desk、claude-high、巡检员。切换前后，在同一负载下各测一次 omp 进程的内存。OS 看门狗曾报过内存 warn（PM `evidence/decisions/D16-dispatch-draft.md:45`）。这项实测由第二阶段承担。
  - harness 重启后的恢复仍按 design:326，由 Main 让席位依次进场，这本来就是 Main 的职责。
- **T4 选“digest 不唤醒 Main”。**
  - U104 要求“按批次读”。另设 `digest.ready` 定时唤醒，等于重新引入轮询式唤醒。
  - 积压只是延迟阅读，不会误事：需要 Main 处理的事项已经按 C4-1 当轮唤醒 Main。
- **T5 选“不改 `tools:`，不设投递目录”。**
  - claude-high 已由本审阅实测（§3.2），lead-mentor 在第二阶段实测。
  - 投递目录会形成第二条写入路径，违背“daemon 是唯一写方，CLI 是唯一入口”。
  - 需要配合的文本修改：`claude-high.md:29` 只允许写 `local://` 和 `evidence/votes/`，要改为允许在 `/tmp` 写选票正文，并用 `council vote` 投票；`lead-mentor.md:29` 同理。
- **T6 选方案主选项：`provisionalVeto` 不阻断，按“未赞成”计。**
  - D1-16 只规定暂定裁决“不能行使一票否决”，没有规定它等于反对票。
  - Argon 如果手上有可复现的反例，应直接投 `oppose`，由 R-6 处理。把两者合并会混淆“意图裁决”和“反例”两种依据。
- **T7 选“按行确定资格席位”。**
  - 先例：D23-01 由四席表决，D23-02 由五席表决（PM `evidence/decisions/D23-generation-type.md:7`）。治理席自己的选票也写明 D23-01“不参投……不增加第五张技术票”（`evidence/votes/D23-ArgonGovernanceSol.md:9`）。
  - 依据：`argon-governance.md:26` 写明“不参与纯单仓技术细节的日常琐碎计票”。
  - 按议程整体加 ArgonGovernance，会把治理席拉进技术行，违背反设卡原则。
  - 前提：CE-3 的收件人修正必须一并完成。
- **T8 选“经 GitHub API 直接提交，不用专用 clone”。**
  - 专用 clone 是 PM 仓的第二个本地副本，需要 pull/rebase 才能保持一致，属于“需要对账才能一致”的信号。
  - 可选的改进：用 Git Data API（trees/commits）把一次归档的多个文件合成一个 commit，同样不需要本地 checkout。
  - 两种 API 都没有实测，放到第二阶段端到端验证。
- **T9 选“立案、排队、计票、开关 issue、Project 状态和归档交给 daemon”。**
  - 这是 U105 的直接要求，按 C2-4 直接执行，不另行表决。
  - **方案列出的待改文本不完整。** 按“文档里不留遗留层”，以下各处都要一并替换，否则角色定义仍会指示各席“指令 Secretary 立案”，或继续写 `area-<仓>.md`。

| 文本 | 现行内容 | 方案是否已列 |
|---|---|---|
| `AGENTS.md:25-26`（D1-12 统一提案入口） | 指令秘书立案；由秘书在 `decision-queue.md` 排队 | 已列 |
| `AGENTS.md:80`（C4-1） | 普通进度写 `local://state/area-<仓>.md` | 已列 |
| `AGENTS.md:83`（C4-3 第 1 项） | 决策表以 PM issue 正文为准 | 在 T1 中列出 |
| `AGENTS.md:114`（工作方法） | PM issue、计票、证据归档交给秘书 | **未列** |
| `AGENTS.md:69`（C3-2） | 治理承接者负责“组织投票、反例回应、结论送达” | **未列** |
| `.omp/skills/decision-vote/SKILL.md` §1、§2、§4 | 整套由秘书立案、排队、计票、归档的流程 | **未列** |
| `.omp/agents/secretary.md:18-21,24` | 立案、排队、计票、归档；汇总 `area-*.md` | 已列（只写了文件名） |
| `.omp/agents/governance-desk.md:22-23` | 组织投票；结论写回原 issue | **未列** |
| `.omp/agents/argon-governance.md:39` 及 `-sol.md:39`（第 20 条） | 直接指令 Secretary 立案和排队 | **未列** |
| `.omp/agents/omomp-optimizer.md:50` | 发给 Secretary 按 P3 开 issue | **未列** |
| `.omp/agents/soroi-keeper-opus.md:63`、`soroi-keeper-gpt.md:63` | 指令 Secretary 按 P1 开 issue | **未列** |
| `.omp/agents/area-manager.md:21,28,36` | 普通进度写 `area-<仓>.md` | **未列** |
| `.omp/agents/claude-high.md:29`、`lead-mentor.md:29` | 选票写文件并回复，见 T5 | **未列** |
| `LEDGER.md` R6 状态行 | “PM issue、提案队列与计票归档交 `secretary` 代办” | **未列** |

## 5. 进入实现前必须完成的修改

1. **CE-1：** ClaudeHigh 席的事件改发 `@Main`，并带上席位和版本；Main 据此新派 claude-high 实例；身份核对改为前缀列表。
2. **CE-2 / T3：** 选定 (a)，以 overlay 方式设置，并在第二阶段实测内存。若最终选 (b)，必须把不可达检测扩展到所有事件种类。
3. **CE-3：** 统一 `vote.request` 的收件人公式：当前版本的资格席位减去已投当前版本的席位。
4. **R-3：** 议程加入产品全景席的参投字段，纳入资格席位的计算。
5. **R-9：** `propose` 只接受六个有发起权的席位。
6. **design:273：** 删去冗余的 `gh issue close`，或把 already closed 视为成功。
7. **T9：** 按 §4 的表格替换全部文本。
