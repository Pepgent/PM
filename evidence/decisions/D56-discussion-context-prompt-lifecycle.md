# D56：Lab 讨论已装载产物清单：附在哪些 prompt 上、何时停止附带（P1）——定稿

决策 issue：[Pepgent/PM#78](https://github.com/Pepgent/PM/issues/78)。发起：Coordination（DeskPR66Context）。本文件由议会 daemon 生成。

## 事实

来源标记：(U) 用户原话，(D) 已通过决策正文，(R) 仓库现状，(A) Argon 意图资料或闸门结论。PM 路径以 `Pepgent/PM` 仓根为准；Pepgent 代码取 `Pepgent/Pepgent@67dea015`（当前 main）。

**已通过正文确定的内容**
- (D) `evidence/decisions/D7-lab-backend.md:67`（D7-07）：“人选中的产物 id 记入 `discussion_context`；下一条 prompt 前附上这些产物的清单，agent 用 `lab_open_artifact` 读取。”正文没有“只附一次”“投递后消费或清空”的写法，也没有“此后每条都附”的写法。
- (D) 同文件 `:179-186`（F31 时序）：`discussion.load{artifacts}` 之后的 prompt 写作“目标 + 已装载产物清单”，没有描述第二条及以后的 prompt。
- (D) `evidence/decisions/D12-lab-wire.md:336`：`ConversationDetailWire.context: ArtifactRef[]` 是 `discussion_context` 的当前持久集合。`:458` 的命令联合里只有 `discussion.load{conversation, artifacts}`，`:510` 的结果为 `Done`，`:555` 的权限为 `write` 加讨论 owner。正文没有写明 load 是追加还是替换，联合里也没有移除或清空命令。`:628`：装载上下文变化时 `conversation` 频道失效。
- (D) `evidence/decisions/D8-mvp-scope.md:128`（F09 S2）：只验收 load 之后的下一次 `lab_open_artifact`。
- (D) `evidence/decisions/D7-lab-backend.md:65`（D7-05）：`lab_open_artifact{artifact: ArtifactRef}` 把 store 对象或讨论快照拷进本会话的 `inputs/`。正文没有规定只能读取 `discussion_context` 中的引用；(R) main 的 `apps/web/src/server/lab/tools.ts:202-213` 也没有这一限制。
- (D) `evidence/decisions/D10-repo-delivery.md:20`（D10-08）：跨仓公开契约中的“状态权威与生命周期”交领导层表决。

**意图与原型**
- (A) `evidence/argon/flow-catalog.md:177,181`、`evidence/argon/D12-intent.md:197`：旧产物“作为只读上下文装载进新讨论”，没有说明附带频率。
- (R) GUI 原型 `Pepgent/Pepgent:AI4S-prototype/AI4S-Discussions-Hi-Fi.dc.html:284,287,391`（不是已通过决策）：已装载列表提示“AI 只读取这里装载的内容”，每项带“移除 / 从上下文移除”按钮；每次发送后的示意回复是“基于已装载的 N 个产物”。
- (A) 闸门 A（ArgonSol-2，`/tmp/argon-sol-2-pr66-context-gate-a.md`）：此事触及跨组件公开契约，需要立案补齐。已通过正文只能确认“装载后的下一条 prompt 必须附清单”。没有 (U) 原文直接决定附带频率，所以 Argon 不行使意图否决。PR66 已合并，不构成当前关键路径上的 BLOCKED，不能定为 P0。
- 本议程涉及的 (U) 原文：没有。

**main 现状（R）**
- `apps/web/src/server/lab/sessions.ts:21-30` 的 `humanPrompt`：清单非空时，人类消息的格式为 `human:<principal>`、`Loaded context:` 列表、正文。清单为空时不附。
- `apps/web/src/server/lab/sessions.ts:473-476` 的 `deliver`：每投递一条人类消息（含 steer），都重新读取 `discussion_context` 全表并附上，没有消费标记。
- `apps/web/src/server/lab/conversations.ts:221` 的 `loadDiscussion`：对每个 ref 执行 `insert … onConflictDoNothing()`，只追加。`apps/web/src/server/lab/*.ts`（不含测试）中没有任何删除 `discussion_context` 行的代码。
- PR66 的线程记录：https://github.com/Pepgent/Pepgent/pull/66#issuecomment-6567143374 。该 PR 自述采用“每条都附”，并请求裁决，但无人回复。无人回复不等于获批。

**优先级：P1**
- 不是 P0：没有当前关键路径上的 BLOCKED（闸门 A 的结论；PR66 已合并）。
- 是 P1：附带频率决定 Lab→omp 实际投递的 prompt 内容，移除命令属于 Lab wire 命令联合。两者都是跨组件接缝上的契约缺口，由 SoroiKeeperOpus 的工人范围巡查发现（底稿 `.memory/soroi-keeper-opus/evidence/WorkerScopePatrol-20261102T01Z.md`）。需要在工人继续按某种个人解读写代码之前补齐。
- 不是 P2：D7-07、D12-10 的现有条文没有错误，只是不完整，不属于删除或修改误导性条款。
- 不是 P3：不涉及工作流提效。

**D12-10 缺移除命令，为何并入本议程**
- 问题本身就包含“何时停止附带”。一个产物从此后的 prompt 中消失，只能发生在它离开 `discussion_context` 之后。但这个集合只有开始锚点（`discussion.load`），没有结束锚点，所以不补结束锚点就答不完这个问题。
- 附带频率与移除命令是同一生命周期的开始和结束两端，放在同一议程处理。两者分成两行，可以分别表决。
- load 是追加还是替换，决定了是否需要单独的移除命令，因此一并写在第 2 行。

**不在本议程范围内**
- `lab_open_artifact` 的可读范围。
- omp transcript 与已拷入 `inputs/` 的副本。
- Panel 与 Automation 会话。`discussion.load` 只作用于讨论会话，权限为讨论 owner（`D12-lab-wire.md:458,555`），所以这两类会话没有装载上下文。
- PR66 的正文与历史。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D56-01 v1 | 讨论根会话收到的每一条人类消息 prompt（`discussion.prompt` 经 `human_irc_queue` 投递，含 steer），都附上投递那一刻 `discussion_context` 的完整当前清单。清单为空时不附。<br>D7-07 的“下一条 prompt 前附上”继续成立，本行只补充它之后的每一条。<br>附带只是把 Lab 持有的集合投影到 prompt 上。投递不会消费或改动这个集合；只有当产物离开集合，下一条 prompt 才会停止附带它。 | - PM `evidence/decisions/D7-lab-backend.md:67`（D7-07 装载上下文句）、`:179-186`（F31 时序中 load 之后的 prompt）<br>- Pepgent `apps/web/src/server/lab/sessions.ts` 的 `humanPrompt`、`deliver`（main 现状已经如此） | - 行通过后，由 Argon 回写 D7-07：把“下一条 prompt 前附上这些产物的清单”改为“此后每条人类消息 prompt 前附上当前已装载产物的完整清单”，F31 时序的注记同步修改。<br>- 现有实现无需改动；Main 在 PR66 线程另发一条记录，引用本行结果。 | - 得到：已装载集合只有 Lab 一个源头，prompt 每次照它投影。Lab 不必记录 omp 已经看过什么，也就不需要消费标记；omp 压缩上下文后，下一条 prompt 仍带着清单。最新一条 prompt 的清单就是当前集合，所以移除产物后不必另发通知。原型示意的“每次发送都基于已装载的 N 个产物”也得到满足。<br>- 代价：每条 prompt 都重复一份清单（只有引用串，不含字节）。<br>- 落选方案：① 只在装载后的下一条附一次：Lab 必须另记“omp 已消费”这一状态，相当于 omp transcript 的一份副本；omp 压缩上下文后清单会丢失；移除后还要另发撤销通知。② 只在集合变化后的下一条附全量或增量：同样需要投递标记，并且同样有压缩后丢失清单的问题。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD56）：赞成<br>Argon（ArgonSol-2）：反对<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernanceSol-1）：反对<br>SoroiKeeperOpus（SoroiKeeperOpus-2）：赞成<br>SoroiKeeperGpt：未投 | **撤回**（Main：不是放弃本行：用户直接拍板（pepgent-soroi LEDGER.md U134，Pepgent/soroi@9c94e9e），本行按 v1（how 中 PM 正文回写改由 Secretary 承担，design 回写由 Argon 承担） 原文生效，依 AGENTS.md C2-4 直接执行、不再表决。daemon 没有"用户拍板"结果类型，只能以撤回结束表决；执行承载见 PM 决策 issue 评论。） |
| D56-02 v1 | 补齐 `discussion_context` 的结束锚点。<br>`discussion.load{conversation, artifacts}` 的语义写明为“加入集合”：已在集合中的引用保持不变，load 不移除任何引用。<br>新增命令 `discussion.unload{conversation, artifacts: ArtifactRef[]}`，作用是把这些引用移出该讨论的 `discussion_context`。结果为 `Done`，权限与 `discussion.load` 相同（`write`，且是该讨论的 owner）。<br>移除后，`conversation` 频道失效（已被 `:628` 的“装载上下文变化”覆盖）。之后的 prompt 按第 1 行不再附带该引用。移除不改动 omp transcript、已拷入 `inputs/` 的副本和 `references` 附件，也不改变 `lab_open_artifact` 的可读范围。 | - PM `evidence/decisions/D12-lab-wire.md:458`（命令联合）、`:510`（逐 kind 结果）、`:555`（逐命令权限）；`:42`（D12-10 行）<br>- Pepgent `apps/web/src/protocol/lab/command.ts`；`apps/web/src/server/lab/conversations.ts`（`loadDiscussion` 旁）；讨论页已装载列表的“移除”入口（原型 `AI4S-Discussions-Hi-Fi.dc.html:284,287`） | - 行通过后，由 Argon 回写 D12-10：在命令联合中补 `discussion.unload`，在结果表中补 `'discussion.unload': Done`，在权限表中把它并入 `discussion.load` 那一行，并在 `discussion.load` 处注明“加入集合”。<br>- Main 在 Pepgent/Pepgent 新开 issue 承载实现：wire 变体、Lab 删除对应的 `discussion_context` 行并发布 `conversation` 失效、讨论页“移除”按钮发出该命令。不回写 PR66。 | - 得到：已装载集合有了开始和结束两个锚点，均由人通过 Lab 命令确认，与原型中按项“从上下文移除”的交互一一对应。load 的现有语义和现有实现（追加）不变。<br>- 代价：命令联合多一个变体，Pepgent 多一个实现 issue。<br>- 落选方案：① 把 load 改为“用给定列表替换整个集合”，用重发较小的列表实现移除：会改变已通过命令和现有实现的含义，而且每次装载都必须携带完整集合，与原型“从任意实验挑选、追加装载”的交互不符。② 不提供移除，集合只增不减：第 1 行“何时停止附带”就没有答案，原型的“移除”按钮也无法落地。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD56）：赞成<br>Argon（ArgonSol-2）：反对<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernanceSol-1）：反对<br>SoroiKeeperOpus（SoroiKeeperOpus-2）：赞成<br>SoroiKeeperGpt：未投 | **撤回**（Main：不是放弃本行：用户直接拍板（pepgent-soroi LEDGER.md U134，Pepgent/soroi@9c94e9e），本行按 v1（how 中 PM 正文回写改由 Secretary 承担，design 回写由 Argon 承担） 原文生效，依 AGENTS.md C2-4 直接执行、不再表决。daemon 没有"用户拍板"结果类型，只能以撤回结束表决；执行承载见 PM 决策 issue 评论。） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D56-Coordination.md`、`votes/D56-ClaudeHigh.md`、`votes/D56-Argon.md`、`votes/D56-LeadMentor.md`、`votes/D56-ArgonGovernance.md`、`votes/D56-SoroiKeeperOpus.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。