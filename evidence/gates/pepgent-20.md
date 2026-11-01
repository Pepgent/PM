# Pepgent#20（LAB-07b）BLOCKED 的闸门材料：四项契约裁决请求

- **issue：** [Pepgent/Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20)，工人 W-09（tern 会话 `pepgent-lab`）。交付 PR：[Pepgent/Pepgent#55](https://github.com/Pepgent/Pepgent/pull/55)（`Closes #17`、`Closes #20`，分支 `issue-17-lab-catalog-events`）。
- **BLOCKED：** [评论 6561107115](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115) 的“请求裁决”四项。PR#55 正文写明：这四项与 routeTree P0（D25，PM#42，投票中）未满足前不合入；过渡行为是子 agent 404、部分 catalog `not_supported`、读取失败整体 `persistence_unavailable`、无运行槽位不推通知。
- **编制：** governance-desk 实例 `DeskPepgent20Rulings`（总协调席，与 Main 合计 1 票）。本文只整理事实，为两道闸门列出待判问题和可选处置，不下结论，也不构成裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界的项才可作为机械补全免投票放行；任一闸门认定越界的项，合为一张 P0 议案立案投票。
- **四项分别判定，结论互不替代。**

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论与 PR 正文属于 `(A)`。本实例只读文件与源码，没有运行构建、类型检查、测试或跨组件程序，没有读 git 历史或 session；`SOR/` checkout 的提交与工人引用的 soroi main `05ae761` 是否一致未核对。

行号说明：本文件送闸门后，`DEC/D12-lab-wire.md` 第 273 行之后插入了 14 行，本文已改为现行行号。两份闸门文件引用的是插入前的旧行号，指向同一段文字：旧 `D12:527/532-533/537/539/557-559` 即现 `D12:541/546-547/551/553/571-573`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`（`AGENTS.md`、`LEDGER.md`、`design/`、`packages/omp-soroi/` 均指该目录下的文件）
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`；`GATE/` = `PM/evidence/gates/`
- `WT07/` = W-09 的 LAB-07a/07b 切片 worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`（PR#55 的分支）

---

## 〇′、四项共用的事实

| # | 事实 | 来源 |
|---|---|---|
| G-1 | LAB-07b 切片行：“读取侧：在途叠加层（`writers` 与 `slots`）、`/api/lab/agents/{id}/stream`、files”，依赖 LAB-07a、MUX-03、MUX-06、MUX-07，F 流程 F08、F17、F26，验收“页面线数据中带有在途槽位，SSE 转发读方帧”。 | (D) `DEC/D8-mvp-scope.md:328` |
| G-2 | 在途叠加层的读法：Lab 只读取自己持有在线一代的根会话，从 `eval:<conversation.session>` 读 `writers`，再逐个读 `slots`，两者都不按运行过滤；停驻会话不唤醒。挂载：该会话有 Open 运行时挂到该运行的 `ExperimentWire.slots`；没有运行时，Discussion 来源挂到该会话的 `pendingLaunch` 实验项，Panel 与 Automation 来源挂到 `ConversationWire.slots`。 | (D) `DEC/D19-sor13-control-contract.md:33`（D19-05②）；`DEC/D12-lab-wire.md:36`（D12-04）；`DEC/D7-lab-backend.md:68`（D7-08） |
| G-3 | D19-05 的原则：“一个根会话同一时刻至多有一个未结束的运行，因此根会话下所有写方的在途步，都属于该会话当前已有或即将建立的那一个运行”；取舍栏写明目的之一是“首步 Human 的槽位既能被发现，人也能交回，实验不会卡在 `sent`”，且“不提前在 store 建运行”。 | (D) `DEC/D19-sor13-control-contract.md:33` |
| G-4 | 运行的开始锚点：根会话没有未结束的运行时，它的**第一次正式提交**由 eval 插件带上 `open`，store 在同一事务里建运行、写 `run_started`。因此第一步正式运行的调用在途期间，该会话还没有运行。 | (D) `DEC/D6-store-service.md:33`（D6-05）；推论部分 `[INFERENCE]` |
| G-5 | 槽位只在正式运行中存在：“正式运行中，写这一步的会话……为每次调用开一个在途槽位”；“dry run 不写 store，也不开放人类介入”。soroi 实现的注释同此：“every formally executed call opens a slot”。 | (D) `SOR/design/intervention.md:7,16`；`DEC/D5-plugins-eval.md:90`（D5-15）；`SOR/packages/omp-soroi/src/eval/slots.ts:1-3` |
| G-6 | 控制端点失败回复的形状不在设计中，按“能工作”处理；设计阶段只写主路径，不为失败分支、超时、竞态设计处理。 | (D) `DEC/D19-sor13-control-contract.md:30`（D19-02）；`DEC/D5-plugins-eval.md:316`；`SOR/.claude/rules/design-assumes-it-works.md` |
| G-7 | D10-08 划定的领导层表决类别：意图、范围、D9 分类、缺失设计、跨仓公开契约（HTTP/SSE/WS/RPC、wire、持久化、ADT、权限、状态权威与生命周期）、部署前提、验收语义、定制 agent/skill/rule 内容。已通过契约内的单仓私有结构、算法、文件组织由工程师决定。实现遇到空白或冲突，在 issue 标 BLOCKED，“只暂停依赖部分”。 | (D) `DEC/D10-repo-delivery.md:20` |
| G-8 | 接口表或权限表缺少某项，不构成授权。 | (D) `SOR/AGENTS.md:123` |
| G-9 | 用户原话：“BLOCKED 初审的分工和 ArgonGovernance 的职能冲突，而且纠错发生在事后……错误分类可能先写进代码，查出来再回退”。由此设立事前双闸门。 | (U) U96，`SOR/LEDGER.md:116`；(D) `SOR/AGENTS.md:60` |
| G-10 | 工人在同一评论中自述“已依契约确定、直接实现”的七点（在线判定、读取顺序、挂载规则、`ConversationWire.slots` 必填、agents stream、files、根 agent 归属），并说明四项“不会让整席停工”，routeTree 不进提交。 | (A) 评论 6561107115 |

---

## 一、子 agent 的所属 Lab

### 1.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F1-1 | 工人的问题：soroi 的 slots 回复不带 `agentId`；Mux presence 的 `where.remote.runId` 是 remote 作业 id，不是 store 运行。可用的连接法是 `where.runId` 对上槽位的 `state.remoteRun`，得到写方会话，再到根会话的 Open 运行，最后取 `experiment_ext.lab_id`，但两个 id 是否同一空间未经核实；本机放置（`where.kind='local'`）和无运行（dry run）的子 agent 连不上。请求裁定：由 soroi 在 slots 中提供 `agentId`、由 Mux 提供关联，还是确认上述连接法。过渡：子 agent 的 stream/files 一律 `not_found`。 | (A) 评论 6561107115 第 1 项；PR#55 正文“过渡行为”1 |
| F1-2 | D12 的归属规则：“agent 的所属 Lab：根 agent 是 `conversation.agent`，取该会话的 `lab`；子 agent 取它所在运行（槽位的 `agentId` 或 Mux 在线条目所关联的运行）的 `experiment_ext.lab_id`。”三条 agents 路由的授权都是“调用者是该 agent 所属 Lab 的成员”。 | (D) `DEC/D12-lab-wire.md:541,546-547,551` |
| F1-3 | 契约中的槽位状态**已有** `agentId`：D5 §3.6 `SlotState.running` 为 `{kind:'running'; body; env; agentId?: AgentId; remoteRun?: string; startedAt; version; inputs}`，D12 的外部类型逐字转录同一形状。D5 的 `CallReport` 同样有 `agentId?`（注释“Agent 体”）。 | (D) `DEC/D5-plugins-eval.md:239,297`；`DEC/D12-lab-wire.md:98-100` |
| F1-4 | soroi 实现的 `SlotState.running` 没有 `agentId` 字段，只有 `body/env/remoteRun?/startedAt/version/inputs`；`CallReport` 侧的参数 schema 有 `agentId`。 | (D) `SOR/packages/omp-soroi/src/eval/slots.ts:15-19`；`SOR/packages/omp-soroi/src/eval/params.ts:28`；(R) 在 `SOR/packages/omp-soroi/src/eval/` 检索 `agentId` 只命中 `params.ts:28` |
| F1-5 | 同一空间问题：D3-09 的 `ProcessRef.where` 为 `Local{host} \| Remote{runId}`，远程一代经 `remote run` 启动；D6 的 `Env.remote.remoteRun` 与 soroi 的 `remoteRun`（`remote.start` 的返回）都指 remote 作业。两者同为 remote 作业 id `[INFERENCE]`，但没有任何条文把 Mux 在线条目关联到 store 运行。 | (D) `DEC/D3-network-mux.md:63,81`；`DEC/D6-store-service.md:69`；`SOR/packages/omp-soroi/src/eval/execute.ts:561-562`；(R) 在 D3、D5、D7、D12、D19 中未找到“在线条目→运行”的关联定义 |
| F1-6 | 槽位所在“运行”在第一步正式运行期间尚不存在（G-3、G-4），此时不存在 `experiment_ext`，F1-2 的规则对这类子 agent 给不出 Lab。 | (D) G-3、G-4；推论 `[INFERENCE]` |
| F1-7 | 不在任何槽位里的子 agent：dry run 的 Agent 体（G-5，dry run 无槽位、无运行）；`soroi_task` 派出的中心 worker（它们是写方会话，不是槽位里的 Agent 体）；槽位已结束但仍在线的 agent。对它们，F1-2 只剩“Mux 在线条目所关联的运行”一条路，而该关联没有定义（F1-5）。 | (D) `SOR/design/intervention.md:11`；`DEC/D5-plugins-eval.md:158`；推论 `[INFERENCE]` |
| F1-8 | 相关 F 流程：F26 S2“点开 Agent 节点，能看到它的工具调用流”；F31 ④“实验详情页与算力页实时显示 DAG、subagent 流”。 | (D) `DEC/D8-mvp-scope.md:145,150` |
| F1-9 | 权限属于 D10-08 的公开契约类别（G-7）；路由授权缺项不构成授权（G-8）。 | (D) G-7、G-8 |

### 1.2 闸门 A 的问题（交 `Argon`）

- **A1-1：** 主路径（有 Open 运行、槽位里的 Agent 体）是否已由 F1-2 与 F1-3 直接回答：槽位按 D5 §3.6 带 `agentId`，Lab 由该槽位所在根会话的 Open 运行取 `experiment_ext.lab_id`？若是，本项主路径就不是契约问题，而是 soroi 实现与 D5 §3.6 不符（F1-4），属于 W-07 的实现缺口。
- **A1-2：** 第一步正式运行尚无运行时（F1-6），子 agent 的所属 Lab 取该根会话的 `conversation.lab`，是 F1-2 的直接含义（槽位就是从该会话的根端点读到的），还是对路由授权规则的新增，属于公开契约（F1-9）？
- **A1-3：** 不在槽位里的子 agent（F1-7）的所属 Lab，是否属于缺失设计？“Mux 在线条目所关联的运行”要求由谁提供关联（soroi、Mux，或 Lab 自己的 `writers` 读取），是否改变 D3 或 D19 的公开形状？
- **A1-4：** dry run 的 Agent 体没有运行（G-5），按 F1-2 字面没有所属 Lab。F31 ③“会话依次 dry run、正式运行”中，GUI 能否看到 dry run 子 agent 的流，是否触及用户意图？若需引用 `(U)`，请给出。

### 1.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B1-1：** 若 A1-1 认定主路径已有答案，soroi 缺 `agentId`（F1-4）是 W-07 路径域内的实现缺口，按 C1-3 的接缝纠偏或片区经理送达处理即可，是否不需要投票？它是否让 PR#55 的主路径实现等待 W-07（G-1 的依赖列没有 SOR 切片）？
- **B1-2：** 若 A1-2 或 A1-3 认定需表决，表决期间 W-09 只对未定类别返回 `not_found`、其余照常实现，是否符合 G-7“只暂停依赖部分”？
- **B1-3：** 处置 c 需要改 Mux 或 soroi 的公开形状，是否涉及 W-01/W-07 的路径白名单与派工？

### 1.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 确认 F1-2 主路径：soroi 按 D5 §3.6 在 `running` 槽位带 `agentId`，Lab 由槽位→写方→根会话→Open 运行→`experiment_ext.lab_id` 定归属；其余子 agent 维持 `not_found`。 | 不改；soroi 按既有契约补实现 | 第一步正式运行与非槽位子 agent 仍不可读（F1-6、F1-7）；F26 S2、F31 ④ 的覆盖面 |
| b | 统一按会话定归属：凡经某根会话的 `writers`/`slots` 读到的子 agent（槽位 `agentId`、写方会话的 agent），所属 Lab 取该根会话的 `conversation.lab`，不经运行。 | 改 D12:551 的归属规则（权限） | 覆盖第一步与 `soroi_task` worker 的 agent id 来源仍需说明；dry run 子 agent 仍无槽位 |
| c | 由 Mux 或 soroi 公开“在线条目→根会话或运行”的关联（例如写方声明带根会话）。 | 改 D3/D19 的公开形状 | 跨 W-01/W-07 |
| d | 维持 F1-2 字面：只有在 Open 运行中、出现在槽位里的子 agent 可读，其余一律 `not_found`。 | 不改 | 与 a 相同，但不依赖 soroi 修正前的过渡 |

---

## 二、Discussion 既无运行也无 pendingLaunch 时槽位的位置

### 2.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F2-1 | 工人的问题：agent 自行 eval 的首步或 dry run（D7-06 允许）时，D12-04 只为 Discussion 规定了 pendingLaunch 一个位置。是挂到 `ConversationWire.slots`（D12:151 写的是“全部在途槽位”），还是另有规定？过渡：该状态下目录读取返回 `not_supported`（capability `lab.catalog.slots`）。 | (A) 评论 6561107115 第 2 项；PR#55 正文“过渡行为”2 |
| F2-2 | 可达性：D7-06 写明“无 pending 时取讨论名称项目”，即讨论中不经 `experiment.start` 的正式运行是既定路径；这种运行的第一步在途时，会话既无运行（G-4）也无 pendingLaunch。dry run 不开槽位（G-5），不构成本状态。 | (D) `DEC/D7-lab-backend.md:66`；G-4、G-5 |
| F2-3 | 现有挂载规则（G-2）只覆盖 Discussion+pendingLaunch，没有 Discussion+无 pendingLaunch 这一格。 | (D) `DEC/D12-lab-wire.md:36`；`DEC/D19-sor13-control-contract.md:33`；`DEC/D7-lab-backend.md:68,93` |
| F2-4 | `ConversationWire.slots` 的注释：“该会话在线一代当前全部在途槽位；会话不在线时为空数组。”讨论在目录中以 `DiscussionHeaderWire{conversation: ConversationWire, runs, conclusions}` 出现，注释为“稳定事实，只随 catalog 频道失效”。D12-04 要求目录、页面、会话读取避免重复携带。 | (D) `DEC/D12-lab-wire.md:149-151,270-273,36` |
| F2-5 | 工人的实现：Discussion 头的 `slots` 固定为 `[]`；本状态下 `slotSite` 返回 `not_supported`，`readCatalog` 因此整个失败，不只是该讨论缺槽位。 | (A) 评论 6561107115；(D) `WT07/apps/web/src/server/lab/overlay.ts:30-57` |
| F2-6 | D19-05 取舍栏的目标之一是首步 Human 槽位可被发现、可交回（G-3）。 | (D) G-3 |

### 2.2 闸门 A 的问题（交 `Argon`）

- **A2-1：** 本状态（F2-2）是否在主路径上？若是，槽位挂在哪里是否属于 wire 的缺失设计（G-7）？
- **A2-2：** `ConversationWire.slots` 的注释（F2-4）是否已经回答：讨论头的 `ConversationWire.slots` 就承载这一状态的槽位？这与“讨论头只随 catalog 失效”和 D19-05② 只把 Panel、Automation 指向 `ConversationWire.slots` 是否冲突？
- **A2-3：** 若不展示这些槽位（处置 c），是否违背 D19-05“首步 Human 槽位能被发现”的目的（F2-6）？

### 2.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B2-1：** 过渡行为让整个目录读取失败（F2-5），而不是只缺该讨论的槽位。这是否超出 G-7“只暂停依赖部分”？
- **B2-2：** 若需表决，是否与第一、四项合为同一议案逐行表决？

### 2.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 挂到该讨论 `DiscussionHeaderWire.conversation.slots`；运行或 pendingLaunch 出现后移走。 | 补 D12-04/D19-05 的挂载表；讨论头不再只是“稳定事实” | 失效频道（第四项） |
| b | 造一个无草稿、无运行的实验项（`ExperimentWire{ext:null, run:null, draft:null, pendingLaunch:null}`）承载。 | 扩展 `ExperimentWire` 的语义 | 投影要识别该形态；工人表示“不造实验项”(A) |
| c | 不展示，直到第一次提交建出运行。 | 补“不展示”的规定 | 与 F2-6 的目的冲突 |
| d | 维持 `not_supported`。 | 不改 | F2-5 的整读失败 |

---

## 三、端点读取失败的语义

### 3.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F3-1 | 工人的问题：Lab 判定在线，但 writers 或 slots 返回 Mux 404（未注册）、503（无 ready 代）、502（source 结束）、网络错误或 `{ok:false}` 时，目前整个读取失败（`persistence_unavailable`），不写成空数组。请确认：worker 端点在 `writers()` 与 `slots()` 两次调用之间下线（404/503），能否按 D12:151 视为离线、记为 `[]`；根端点刚 ready、尚未注册时的 404 是否同样处理。 | (A) 评论 6561107115 第 3 项；PR#55 正文“过渡行为”3 |
| F3-2 | 控制端点失败回复不在设计中，设计只写主路径（G-6）。 | (D) G-6 |
| F3-3 | “不在线”在契约中是根会话的属性：Lab 只读取自己持有在线一代的根会话，会话不在线时 `slots` 为空数组。worker 端点的在线与否没有对应条文。 | (D) `DEC/D12-lab-wire.md:151`；`DEC/D19-sor13-control-contract.md:33`；`DEC/D7-lab-backend.md:68` |
| F3-4 | 错误面：Lab 读取统一返回 `OperationResult`，工人用的是现有的 `persistence_unavailable`、`not_found`、`not_supported` 变体，没有新增 variant。Mux 的 403/404 在 `mux.ts` 中映射为 `not_found`。 | (D) `WT07/apps/web/src/server/lab/mux.ts:29`；`WT07/apps/web/src/server/lab/operations.ts:30-35`；`DEC/D12-lab-wire.md:553` |
| F3-5 | 两种情形都是竞态：两次调用之间端点下线、根一代刚 ready 尚未注册。 | (A) 评论 6561107115；分类 `[INFERENCE]` |

### 3.2 闸门 A 的问题（交 `Argon`）

- **A3-1：** 失败分支的映射（F3-1）是否在 G-6 规定的设计范围之外，从而属于已通过契约内的实现（G-7 后半句），由工程师在现有错误变体中选择？
- **A3-2：** 若把 worker 端点下线记为 `[]`，是否把 D12:151 的“会话不在线”（根会话属性，F3-3）扩展到 worker 端点，从而改变公开语义？

### 3.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B3-1：** 若 A 认定属于实现，本项是否不需要投票，由 W-09 自定并在 PR 正文写明？
- **B3-2：** 工人在本项上采用整读失败作为过渡，是否属于“只暂停依赖部分”？

### 3.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 维持：任一失败让整个读取返回 `persistence_unavailable`。 | 不改 | 一个写方的竞态让整页不可读 |
| b | worker 端点 404/503 记为该写方 `[]`，其余失败整读失败。 | 由 A3-2 判定 | — |
| c | b 再加：根端点 404 记为 `[]`。 | 同 b | — |
| d | 由工程师自定（A3-1 认定为实现时）。 | 不改 | — |

---

## 四、槽位变化的通知源

### 4.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F4-1 | 工人的问题：有 Open 运行时，store 运行流的 `call_started/ended/aborted/human_handback` 已推 `run` 频道（07a 已实现），覆盖各写方提交到同一运行的变化；无运行的槽位（pendingLaunch 首步、Panel/Automation、dry run）没有 run 频道可发，D12-17 也没有为 conversation/catalog 频道规定这一触发；Lab 看不到 worker 子会话的 stdout。请裁定推送源与频道，或明确不要求推送。过渡：不加轮询，也不从根 omp 帧推断。 | (A) 评论 6561107115 第 4 项；PR#55 正文“过渡行为”4 |
| F4-2 | D12-17 失效表：`run` 频道在“该运行的 store 运行流事件；它任一写方端点的槽位变化”时发出。`catalog` 频道的触发含“`pending_launch` 的任一事实变化”；`conversation` 频道的触发含“Panel 会话头改变”。 | (D) `DEC/D12-lab-wire.md:571-573` |
| F4-3 | store 的调用事件在**步提交**时才写：“正式步全部调用结束……后，一次提交步、调用、新捕获……与事件”；“正式提交前在途权威仍是 eval，不把调用开始提前写进 store”。因此即使有 Open 运行，槽位的打开、进入 `awaiting_human` 等在途变化也不在 store 运行流里，只有提交后才出现。这与工人“store 运行流已覆盖”的说法 (A) 不同。 | (D) `DEC/D6-store-service.md:32`（D6-04）；`DEC/D11C-run-event-carrier.md:16`（D11-C1）；推论 `[INFERENCE]` |
| F4-4 | 控制端点的请求体是封闭的 method 联合（`slots`、`answer`、`takeover`；根端点另有 `writers`、`derive`、`abort`），没有订阅或推送方法。 | (D) `DEC/D19-sor13-control-contract.md:29`（D19-01）；`DEC/D5-plugins-eval.md:315` |
| F4-5 | D7-08 列出的通知来源：store 的运行流和生命周期流、Mux 的在线事件、Lab 自己的写入。没有列出端点槽位。 | (D) `DEC/D7-lab-backend.md:68` |
| F4-6 | 可用的观察面：Lab 是根会话的写方，持有根 omp 的 RPC 流（D7:38）；Lab 可以读方身份连任一 agent 的 `/agents/{id}/reader`（D3-11），`tool_execution_*`、`message_end` 等帧在 RPC 流中实时可见（D3-13①）。没有条文把这些帧规定为槽位变化的信号。 | (D) `DEC/D7-lab-backend.md:38`；`DEC/D3-network-mux.md:65,67` |
| F4-7 | 第二项所述 dry run 不开槽位（G-5），dry run 不在本项范围。 | (D) G-5 |
| F4-8 | 相关 F 流程：F08 S2 由实验详情页对 `awaiting_human` 槽位发 `intervene.answer`；F31 ④ 要求实验详情页“实时显示 DAG”。F26 S2 的“不刷新出现新节点”针对已提交的一步（由 store 运行流覆盖）。 | (D) `DEC/D8-mvp-scope.md:127,145,150` |

### 4.2 闸门 A 的问题（交 `Argon`）

- **A4-1：** D12-17 把“写方端点的槽位变化”列为 `run` 频道的触发（F4-2），但没有规定来源（F4-3、F4-4、F4-5）。这是否属于缺失设计？它对有运行和无运行的槽位是否同样成立？
- **A4-2：** 无运行的槽位应走哪个频道：挂在 pendingLaunch 项上的走 `catalog`，挂在 Panel/Automation `ConversationWire.slots` 上的走 `conversation{id}`（“Panel 会话头改变”），这是否已由失效表的现有文字覆盖，只缺来源？
- **A4-3：** 若明确“不要求推送槽位变化，只在其他通知触发重读时带出最新槽位”，是否与 F31 ④ 的“实时显示”或 F08 S2 的交回路径（F4-8）冲突，触及验收语义？
- **A4-4：** 若来源取 F4-6 的 RPC 帧，或给控制端点加订阅方法，是否属于跨仓公开契约（后者改 D19-01）？

### 4.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B4-1：** 处置 c 改 soroi 控制端点（W-07 路径域）并经 Mux 路由（W-01），是否涉及跨席位派工？
- **B4-2：** 若需表决，是否与第一、二项合为同一议案？表决期间 W-09 不推槽位通知、其余照常实现，是否符合“只暂停依赖部分”？

### 4.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 不要求推送：槽位只在其他频道触发的重读中带出最新值；删去 D12-17 `run` 行的“写方端点的槽位变化”。 | 改 D12-17 | A4-3 |
| b | Lab 从自己持有的根 RPC 流和对各写方 agent 的读方连接观察 `soroi_eval` 的 `tool_execution_*` 帧，作为槽位可能变化的信号，按挂载位置发 `run{run}`、`catalog` 或 `conversation{id}`。 | 补 D7-08 来源与 D12-17 频道 | 写方 agent id 的来源与第一项相关 |
| c | 控制端点增加槽位变化的订阅或推送。 | 改 D19-01、D3-19（跨 W-07、W-01） | 新增跨仓接口 |
| d | Lab 在有订阅者时对在线根会话定期读 `writers`/`slots`，有变化时按挂载位置发频道。 | 补 D7-08 来源 | 与 D7-08 取舍栏否掉“浏览器轮询整份 snapshot”的理由是否同类 |

---

## 五、同一评论与 PR 中不在本次任务范围内的事项（只登记）

- **routeTree P0：** `routeTree.gen.ts` 的归属在 D25（[PM#42](https://github.com/Pepgent/PM/issues/42)）表决中，是 PR#55 的另一合入前提，与本四项无关。
- **工人“已依契约确定”的七点（G-10）：** 与本实例读到的正文相符的有：在线判定以 Lab 自己持有的 live generation 为准（G-2）；读取顺序 writers→slots（G-2）；挂载规则（G-2）；`ConversationWire.slots` 字段（F2-4）；agents stream 帧形（`DEC/D12-lab-wire.md:49`，D12-17）；根 agent 归属（F1-2）。`ConversationWire.slots` 必填、files 不折叠 Mux 的 403/404/503，属于工人自述的实现做法 (A)，本实例未作分类。
- **soroi 缺 `agentId`（F1-4）的送达：** 若闸门认定是 W-07 实现缺口，送达归 soroi 片区经理，不由 W-09 等待或自补。

## 六、闸门判定后的程序

- 四项分别判定。对某一项，A 与 B 都确认不越界时，按机械补全放行，结论写回 #20，再由 Pepgent 片区经理送达 W-09。
- 任一闸门认定越界的项，合为一张 P0 议案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`），由本实例用 `council propose --seat Coordination` 立案；排队、收票、计票与归档由议会 daemon 完成（`SOR/AGENTS.md:24-27`）。
- 闸门结论写入 `GATE/pepgent-20-gate-a.md`（Argon）、`GATE/pepgent-20-gate-b.md`（ArgonGovernance），沿用 #17、#18 的做法，保证下一个空白实例只读这些文件就能接续。
