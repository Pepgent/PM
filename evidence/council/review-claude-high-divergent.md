# 审阅：议会 daemon 方案（claude-high · divergent 立场）

审阅对象：[`design.md`](design.md)、[`feasibility.md`](feasibility.md)。规则依据：pepgent-soroi `AGENTS.md`（D1-12、D1-16、D1-17、C2-1、C3-2、C3-3、C4-1～C4-3）和 `LEDGER.md` 的 U104、U105 原话。
证据标记：(R) 本审阅者实际运行的输出；(D) 文档原文；[INFERENCE] 未经观察的推断。

## 1. 结论

- **能落实 U104/U105，需要做几处修正。** 方案的骨架是：单写方 daemon、SQLite 事务、`watch` 加 `monitor` 订阅、由 daemon 生成 GitHub 内容、Main 按批次 digest。这个骨架对得上 U105 的每个要素（daemon、可并发写入、程序控制写入、程序写 issue、配合 exec_command monitor、不需要额外主动通知）。U104 的“主控按批次读”也已落实。
- **整体形态没有更简单、又同样满足 U105 的替代。** 我检验过的替代见 §2，都更差或违反 U105 原文。
- **T3 应选 (a)，(b) 不可取。** (b) 本身就是 U105 明文排除的“额外的主动通知机制”；而且它只修好了投票请求，常驻角色的自驱节拍仍会随 park 失效（反例 CE3）。(a) 可以用 `--config` overlay 实现，不改发布文件。它的成本是让所有 idle subagent 都常驻内存，这个成本是稳态的，不是边缘情况，应在第二阶段实测，见 §3。
- **有 4 个主路径失效反例需要在实现前修正（§5）：** CE1 ArgonGovernance 的反设卡否决够不到非“治理”行；CE2 产品全景席在“涉及全局产品架构”的议案上不参投；CE3 (b) 漏掉常驻角色的自驱节拍；CE4 ClaudeHigh 的 `vote.request` 没有消费者，导致行永远停在 `voting`。
- **T5 已由本审阅者实证解决（§4 T5）。**

## 2. 整体形态：考虑过的更简替代

| 替代形态 | 结论 | 理由 |
|---|---|---|
| CLI 直接写 SQLite（WAL + busy_timeout），daemon 只执行 outbox；`watch` 轮询事件表 | 不采用 | 写方变成多个 CLI 进程，偏离 U105“由程序控制后写入”的单写方读法。省掉的只有 socket 层，而 socket 方案已实测通过（feasibility §1、§3）。 |
| 以 GitHub issue 为总线，各席轮询 | 不采用 | U105 明确要求 daemon，并配合 monitor 订阅。 |
| 每个议程为每个席位派全新实例投票（推广 ClaudeHigh 模式），不需要订阅 | 不采用 | 派实例的一方要么是 Main（Main 又成为逐票总线，违反 U104），要么是提案人（属于额外的主动通知，违反 U105）。另外，Argon、LeadMentor 在 D1-12 中定义为“常驻”席。 |
| 常驻席位改成各自独立的 omp 顶层进程（每个进程的 Main 不会被 park） | 不采用 | 跨进程无法用 `write agent://` 直达 subagent，只能用 `peer_send` 发给对方的 main session。这样会切断同进程内的现有直达路径，例如 BLOCKED 正交闸门 A/B 由 governance-desk 直接请求 Argon、ArgonGovernance（C2-2）。如果要补回这条路径，就得把闸门请求也搬进 daemon，范围超出 U105。 |
| 单独起一个“议会宿主” omp 进程，用 `task.agentIdleTtlMs: 0` 只托管常驻席位 | 不采用 | 能把不 park 的范围限定在常驻席位，但有上一行同样的跨进程直达问题。 |

由此可见，本方案的整体形态已经是满足 U105 的最小形态。可以继续简化的是内部的冗余机制，见下面三点。

- **两个游标合并为一个。** Main 同时有 `inbox --to Main` 和 `digest --reader Main` 两个游标，读的内容还相互重叠。建议只保留 `council digest --reader X`：对 X 输出全部未读，需要处置的事件排在前面。对投票席来说，“待投什么”本来就由 `council queue --seat S` 从计票状态推导，`vote.request` 只是门铃，不需要另设游标。这符合“机制即信号”：游标本质上是在和 queue 对账。
- **唤醒集合只在一处定义。** 现在唤醒集合定义了两遍：daemon 的路由表（§6.3 规定哪些 kind 发给 `@Main`）和 Main 的 monitor 正则（§6.2 再按 kind 收窄）。建议只由 daemon 的路由决定，订阅者的 monitor 统一用 `^EVT `。`watch --to X` 已经在服务端过滤了收件人。
- **`seat.enter` 不需要唤醒 Main。** 进场本来就是 Main 安排的，记入 digest 即可。`seat.retire` 保留唤醒，因为 U102 要求“留下交接后，通知你kill”。

## 3. T3 专题：席位 park 后订阅失效

### 3.1 park 失效的范围比方案写的更大

feasibility §5 实测：subagent park 之后，它的 watch 进程会被结束。受影响的不只是投票请求，所有靠 subagent 自身常驻来驱动的工作都会失效：

- `argon-governance.md` 第 12 条（`argon-governance-sol.md` 同条）：“你应该自主维护定时唤醒装置并检查团队职能和进度”。这个定时装置在 park 后也会消失。
- `area-manager.md` 第 37 行：“保持常驻等待下一次片区巡检”。片区经理被 park 后不再巡检，也就不会再 `council status post`，U104 批次读取的数据源因此断流。如果改由 Main 逐个唤醒片区经理，Main 又成了时钟兼总线。
- feasibility §5 的 (R)：当时 Argon、LeadMentor、Secretary 和各片区经理**全部**处于 parked。所以这不是边缘情况，而是现有主路径。

### 3.2 三个选项的判定

- **(b) 不可取。**
  - 它让 Main 用 `write agent://` 唤醒席位，正是 U105 原文排除的“额外的主动通知机制”。
  - 它只在出现 `vote.request` 时触发，修不了 §3.1 中两类自驱节拍。
  - 它还要求 daemon 跟踪“地址是否有活连接”，并新增事件种类 `seat.unreachable`，这是为弥补生命周期划分错误而加的机制。
- **(c) 不可取。** 原方案已经指出，relay 自己也会被 park。
- **(a) 采用，按以下方式实施：**
  1. (D) omp `tools/task.md`：`task.agentIdleTtlMs` 默认 420000；“`<= 0` disables parking and keeps idle sessions live until exit”。所以设为 `0` 即可，无需猜一个足够大的数。
  2. (D) `.omp/settings/soroi.yml` 第 1–2 行注释：“Later --config overlays can tune idle parking without changing the release.” 因此用一个 overlay 文件写入 `task: { agentIdleTtlMs: 0 }`，启动时 `omp --config soroi.yml --config <overlay>`，与 U106“再重启议会”同在一次重启里完成。
  3. (D) omp 文档中没有按 agent 设置 TTL 的入口：agent frontmatter 字段里没有 TTL，`AgentLifecycleManager.adopt(id, { idleTtlMs, revive })` 读取的是进程设置。所以 (a) 只能对整个进程生效，原方案“能否按 agent 单独配置尚未查明”一句可改为“不能”。
  4. **harness 重启后的进场：** 重启后所有 subagent 都处于 parked。Main 按既有的进场职责，给每个常驻席位和片区经理各发一次 `write agent://<id>`，内容是“重新挂 watch”。每次重启只做一次，不是逐条消息转发。daemon 已经掌握 watch 连接，可以让 `council daemon status` 列出哪些地址当前没有 watch，供 Main 进场时对照。不需要新增 `seat.unreachable` 事件。
  5. **自驱节拍的着落：** 不 park 之后，ArgonGovernance 的定时装置和片区经理的巡检节拍可以用同一原语实现：exec_command 跑一个节拍进程，例如 `while sleep 600; do echo TICK; done`，再用 monitor 匹配 `^TICK`。daemon 不需要为此改动。具体节拍由各角色定义决定，不在本方案范围。

### 3.3 (a) 的真实成本：稳态成本，需要实测

- 成本：TTL 设为 0 后，**所有** idle subagent 的会话都常驻到进程退出。U97 要求每次巡检都用全新 subagent，U103 要求每项治理都新开 governance-desk，ClaudeHigh 每个议程也新开一个，所以常驻会话数会随运行时间单调增长。当前花名册显示有 301 个 parked 的 peer。
- 增长到什么程度会成问题，目前没有测量。[INFERENCE] 内存占用主要来自各会话的 transcript。
- 处理：第二阶段在同一负载下记录 omp 主进程的 RSS（TTL=420000 对比 TTL=0，运行相同时长），再决定要不要处理，不预先加机制。如果确实需要，最贴合生命周期的做法是：对规则上“办完即结束”、不再复用的一次性 agent（C3-2 的 governance-desk、U97 的巡检、每议程的 claude-high），由派出方在读取结果后用 `proc://<id>/kill` 结束会话。这只是把它们本来的结束锚点（结果送达）显式化。[INFERENCE] 对 idle agent 执行 `proc://<id>/kill` 的效果未实测。

## 4. T1–T9 逐项选择

| 项 | 选择 | 理由 |
|---|---|---|
| **T1** | **采用**：DB 为源头，issue 正文由程序生成 | 符合“每项状态只有一个源头，即创建并维护它的一方”。以 issue 为源头会出现两个写方，还要解析 Markdown。需要补写生命周期：议程在 `archived` 之前，以 DB 为准；`archived` 之后，PM `evidence/decisions/` 的归档文件是持久记录（C4-3 第 1 项要求决策和选票进 `evidence/`），DB 不再写入该议程。C4-3 第 1 项“决策表以 PM issue 正文为准”需要按方案改写。 |
| **T2** | **程序强制顺序，但改为在投票时校验，门铃发队首变化** | D1-12 要求“全体参投席位按此顺序表决”，由程序强制符合 U105。把“每席同一时间只开放一个议程”改为两点：①某席还有更高优先级议程的未投行时，daemon 拒收该席对低优先级议程的投票；②只在该席的队首变化时发 `vote.request`。这样一个席位醒来一次就能按顺序连续投多个议程，减少无效唤醒（U83 的吞吐要求）；新来的 P0 会让低优先级票被拒收，自然实现抢占。另外，ClaudeHigh 按“每个队首派一个实例”执行（见 CE4），就不会乱序。 |
| **T3** | **(a)，`agentIdleTtlMs: 0`，用 overlay 实施** | 见 §3。不选 (b)、(c)。 |
| **T4** | **采用**：不发 `digest.ready` | U104 原文是“主控按批次读，不每条消息都唤醒”。定时唤醒会把节拍重新引回 Main。同时把 inbox 合并进 digest（§2），Main 每次被唤醒后读一次 digest，积压就随之清空，无需另设机制。 |
| **T5** | **两个备选都不需要** | (R) 本审阅者是按 `.omp/agents/claude-high.md`（`tools: read, grep, glob, find, write`）派出的实例，本会话可用 `xd://exec_command`，并实际执行了 `omp --help \| grep …`，结果 `exit_code: 0`，`wall_time_seconds: 0.048`。所以受限 `tools:` 的 claude-high 能跑 `council`。lead-mentor 的 `tools:` 与之相同，[INFERENCE] 也可用；第二阶段的端到端验证应让 LeadMentor 实际投一票。不加 bash，也不设投递目录。 |
| **T6** | **取消 `provisionalVeto` 这个 variant** | D1-16 中的“暂定”是对意图裁决的标注，不是一种投票选择。D1-12 规定反对票“无反例作废”。因此 Choice 只保留 `approve \| oppose(counterexample) \| veto(citation)`。不带引用的否决由 CLI 拒收，提示补引用或改投带反例的反对票；“暂定”字样写进理由。LeadMentor 判为“技术”后，Argon 那张否决票作废，daemon 向 Argon 重发该行的 `vote.request`。另外，`arbitration.request` 应在否决投出时立即发出，不必等全体投齐，这是并行化，减少串行等待。 |
| **T7** | **普通投票权按行计算，否决权的覆盖面另行建模** | 按行与 U12“投票对象是条目”一致。但是只按起草人给出的分类决定 ArgonGovernance 是否参投，会让它的反设卡否决权失效（CE1），同时漏掉产品全景席（CE2）。修正见 §5。 |
| **T8** | **采用 GitHub API，不用专用 clone** | 专用 clone 要多维护一个本地工作副本，还要处理 pull/rebase。如果在意 commit 数量，可以改用 Git Data API（tree → commit → 更新 ref），一个议程的归档一次提交完成，仍然不需要本地 checkout。两种 API 写法都可以，按实现方便选择。 |
| **T9** | **采用** | U105 原文是“所有的投票和议题管理均交给程序自动处理”。按 C2-4，这是用户直接指令，直接改 `secretary.md`、D1-12 统一提案入口和 C4-1 中“普通进度写 `local://state/area-<仓>.md`”的条文，无需另行表决。改写时要同时核对 `area-manager.md` 第 21 和 36 行，两处都写着普通进度写 `local://state/area-<仓>.md`，应与 C4-1 一并改为 `council status post`。 |

## 5. 主路径失效反例

### CE1：ArgonGovernance 的反设卡否决够不到非“治理”行

- **契约：** `AGENTS.md` 第 18 行（D1-12 ④）规定，ArgonGovernance “对阻挠进度、违背四级隔离、角色边界或反设卡原则的条款享有一票否决权”。否决的覆盖面按条款内容划定，而不是按起草人给的分类。
- **方案：** design §4.1 写“ArgonGovernance 的否决只对‘治理’行有效”，并且只有分类为“治理”的行才把 ArgonGovernance 列为资格席位。
- **复现：**
  1. governance-desk 提案 D25，其中 D25-01 的内容是“合入前新增 X 验收步骤”，分类标为“实现”；
  2. 资格席位只有四个基础席，ArgonGovernance 收不到 `vote.request`；
  3. 即使 ArgonGovernance 自己执行 `council vote D25 --as ArgonGovernance --seat ArgonGovernance --veto D25-01 --cite D25-01=U84`，按 §4.1 这张否决也无效；
  4. D25-01 以 3/4 通过。
- 这正是 U84“主agent现在很多决策全都是来阻挠实施的”所针对的情形。
- **修正：** 每个议程开放时都给 ArgonGovernance 发一个 `agenda.opened` 门铃，不要求它投票。ArgonGovernance 可以对任何行投带引用的否决。它只在“治理”行上计入门槛分母，在其他行上缺票不妨碍“投齐”。

### CE2：涉及全局产品架构的议案，产品全景席不参投

- **契约：** `AGENTS.md` 第 22 行规定：“若系 SoroiKeeperOpus 或 SoroiKeeperGpt 依 U93 发起**或涉及全局产品架构调整的议案**，对应产品全景席一并独立参投”。第 20 行也写了“议案涉及全局产品架构演进时，作为独立职能席参投”。
- **方案：** design §4.1 只在“发起席是 Keeper”时把 Keeper 列为资格席位。
- **复现：** Argon 提案一个跨组件架构调整的议程，资格席位只有 4 个，两个 Keeper 都收不到 `vote.request`，议程照常定案。
- **修正：** 提案 YAML 增加议程级字段，例如 `scope: globalProductArchitecture`。设了这个字段时，两个产品全景席都参投（门槛按 6 席计，为 5）。由谁判定该字段属于起草人的分类职责；有争议时按 D1-17 的流程处理。

### CE3：T3 选 (b) 时，常驻角色的自驱节拍仍会失效

- 见 §3.1：`argon-governance.md` 第 12 条的定时唤醒装置，和 `area-manager.md` 第 37 行的巡检，都会随 park 一起结束。(b) 只在出现 `vote.request` 时唤醒席位，所以片区经理不会再 `status post`，U104 的批次读取就没有输入。
- 只有 (a) 能统一修好这三类问题：投票订阅、治理定时器、片区巡检。

### CE4：ClaudeHigh 的 `vote.request` 没有消费者

- design §6.3 把 `vote.request` 发给“资格席位”，其中包括 ClaudeHigh，它的地址按 §4 就是 `ClaudeHigh`。但 §10.1 写 ClaudeHigh“每个议程派一个全新实例……不靠订阅”，没有说明由谁、在什么事件触发时派出。
- **复现：**
  - 若 T3 选 (a)，没有任何 watch 订阅 `@ClaudeHigh`，ClaudeHigh 席永远缺票，§4.1 的“资格席位投齐后才定结果”无法满足，每一行都停在 `voting`；
  - 若 T3 选 (b)，每个议程都会触发一次 `seat.unreachable`，Main 去唤醒一个本不该常驻的席位。
- **修正：** ClaudeHigh 席的地址设为 `Main`，与 Coordination 席相同。Main 收到 `vote.request seat=ClaudeHigh` 的队首门铃后，派一个全新的 claude-high 实例，brief 里写明 D 编号。这样每个议程只唤醒 Main 一次，不违反 U104。按 T2 的投票时校验，ClaudeHigh 的投票也会自然保持队列顺序。

## 6. 不阻塞、可在实现中顺带处理

- `--as` 是自报身份，daemon 只核对登记表，无法验证调用者是否真是该 agent。[INFERENCE] 这与以往 U20“防止刷票”的关切相关，但不影响主路径，本轮不展开。
- `missingDesign` 由起草人标注，D1-17 的仲裁只覆盖“意图 vs 技术”。如果 Argon 认为某行属于缺失设计、而起草人没有标，现有规则没有改判路径。这是规则缺口，不是方案缺陷，记下供后续议程处理。

## 7. 第二阶段验收需补充的项目

- 设置 `agentIdleTtlMs: 0` 后，让一个常驻席位挂上订阅并 idle 超过 7 分钟，再向它发目标事件，确认它被唤醒（对照 feasibility §5）。
- 同一负载下对比 TTL=420000 与 TTL=0 时 omp 主进程的 RSS（§3.3）。
- LeadMentor 用受限 `tools:` 实际执行一次 `council vote`（T5）。
- 覆盖 CE1、CE2、CE4 的计票单测：ArgonGovernance 对非治理行投否决；`scope: globalProductArchitecture` 时的 6 席门槛；ClaudeHigh 门铃路由到 Main。
