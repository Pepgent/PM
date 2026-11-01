# Pepgent#18（LAB-11b）BLOCKED 的闸门材料：顺序依赖与四处契约空白

- **issue：** [Pepgent/Pepgent#18](https://github.com/Pepgent/Pepgent/issues/18)，工人 W-09（tern 会话 `pepgent-lab`）。
- **BLOCKED：** [评论 6560165218](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6560165218)。共五项：一项顺序依赖（第〇项），四处契约空白（第一至第四项）。
- **编制：** governance-desk 初审实例（总协调席，与 Main 合计 1 票）。本文只整理事实，为两道闸门列出待判问题和可选处置，不下结论，也不构成裁决。
- **程序依据：** 依 `AGENTS.md:60`（C2-2）与 `.omp/agents/governance-desk.md:20`，闸门 A 由 `Argon` 判定（是否触及产品原始意图或公开契约），闸门 B 由 `ArgonGovernance` 判定（是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项）。两道闸门都确认不越界，才可作为机械补全免投票放行；任一闸门认定越界，就按 P0 起草决策表立案投票。本轮常驻席位不在岗，两道闸门由 Main 各派一个一次性实例判定。
- **五项分别判定。** 每项的闸门结论互不替代；第〇项的结论不决定第一至第四项。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件与源码，没有运行构建、类型检查、测试或跨组件程序，没有读 git 历史或 session。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`（本文的 `AGENTS.md`、`LEDGER.md` 均指该目录下的文件）
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`
- `DEC/` = `PM/evidence/decisions/`
- `GATE/` = `PM/evidence/gates/`
- `WT11b/` = W-09 的 LAB-11b 切片 worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-11b/`（分支 `issue-18-lab-draft-launch`；片区快照记其 HEAD 为 `fix(lab): library.merge 的集成检出建在 cacheHome 下 (#54)`，本切片还没有新提交，见 `local://state/area-pepgent.md:34`）
- `WT07a/` = W-09 的 LAB-07a 切片 worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`（分支 `issue-17-lab-catalog-events`）

---

## 〇′、五项共用的事实

| # | 事实 | 来源 |
|---|---|---|
| G-1 | LAB-11b 的切片行：范围是 `draft.save`、`experiment.start`、`experiment.approve`；启动意图与审批状态记在 `pending_launch`，运行绑定记在 `experiment_ext.draft`，不往草稿写 `launched`。依赖只有 LAB-04、LAB-06。验收：草稿只在 `lab.sqlite`；免审批时 `pending_launch` 为 `sent`，会话收到含草稿的 prompt；`run_started` 后 `experiment_ext.draft` 指向该草稿，`pending_launch` 已删除。 | (D) `DEC/D8-mvp-scope.md:333` |
| G-2 | D8 对“依赖”列的定义：编译、类型、构建或调用契约上必需的代码或产物；代码合入其仓 `main` 即可开工。 | (D) `DEC/D8-mvp-scope.md:203` |
| G-3 | D7-06 原文（与本 BLOCKED 相关的部分）：“experiment.start 在原讨论建 pending_launch，每会话至多一条。有 startWithoutApproval 直接 sent 并 prompt 草稿全文，否则 awaiting_approval；approval:any 可批准，或 approval:ownExperiments 且审批 member.id 等于草稿所属讨论 conversation.owner（D11-29B），不另存创建者。agent 自行 eval。生命周期流见非派生 run_started 时，将 sent 意图绑运行、写 ext、删除 pending……同讨论先后多实验、同刻至多一未结束”；取舍栏：“pending 是意图而非运行状态”。 | (D) `DEC/D7-lab-backend.md:66` |
| G-4 | 秘书评论把 #18 对应到 D12-04、D12-06、D12-10、D12-16、D12-17，写明“契约以 D12 为准”。 | (D) #18 [评论 6558364303](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6558364303)；`DEC/D12-lab-wire.md:635` |
| G-5 | D12 的相关形状：`DraftWire{id, lab, project, origin{discussion, retroRun}, canvas, savedVersion, updatedAt}`；`PendingLaunchWire{conversation, draft, at, state: 'awaiting_approval' \| 'sent'}`；命令 `draft.save{draft, canvas}`、`draft.discard{draft}`、`experiment.start{draft}`、`experiment.approve{draft}`；结果依次为 `{kind:'saved', savedVersion}`、`Done`、`{kind:'launch', state}`、`Done`。 | (D) `DEC/D12-lab-wire.md:152-155`、`:418-421`、`:470-473` |
| G-6 | 逐命令权限：`draft.save`、`draft.discard`、`experiment.start` 要求 `write`，且操作者是草稿所属讨论的 owner；`experiment.approve` 要求 `approval: any`，或 `approval: ownExperiments` 且草稿所属讨论的 owner 是操作者。 | (D) `DEC/D12-lab-wire.md:511-512`；D11-29A/B `DEC/D11A-solo-ruling-review.md:30-31` |
| G-7 | `catalog` 频道在“草稿、`pending_launch` 的任一事实变化”时发出。 | (D) `DEC/D12-lab-wire.md:557`（D12-17） |
| G-8 | W-09 白名单含 `apps/web/src/protocol/lab/**`（唯一写方）、`apps/web/src/server/lab/**`、`apps/web/src/rpc/lab.ts`、`apps/web/src/app/routes/api/lab/**`、`apps/web/resources/lab/**`。工人自述本切片“只涉及命令与 `server/lab`，不新增 HTTP 路由”。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09）；(A) #18 [评论 6560126303](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6560126303) |
| G-9 | 同一仓或同一互斥路径域内的关联切片，由所属席位连续实现，可以在同一个 PR 中用多个 `Closes #X` 合并提交；只有编译、类型、构建或调用契约上的真实依赖才需要等待。 | (D) `DEC/D16-phaseB-review-restore.md:35`（D16-11③） |
| G-10 | D10-08 划定的领导层表决类别：意图、范围、D9 分类、缺失设计、跨仓公开契约（HTTP/SSE/WS/RPC、wire、持久化、ADT、权限、状态权威与生命周期）、部署前提、验收语义、定制 agent/skill/rule 内容。已通过契约内的单仓私有结构、算法、文件组织由工程师决定。实现遇到空白或冲突，在 issue 标 BLOCKED，“只暂停依赖部分”。 | (D) `DEC/D10-repo-delivery.md:20` |
| G-11 | 接口表或权限表缺少某项，不构成授权。 | (D) `AGENTS.md:122` |
| G-12 | 用户原话：“BLOCKED 初审的分工和 ArgonGovernance 的职能冲突，而且纠错发生在事后……错误分类可能先写进代码，查出来再回退”。由此设立事前双闸门。 | (U) U96，`LEDGER.md:110`；(D) `AGENTS.md:60` |
| G-13 | `main` 基线上的协议层已经有这四条命令的 schema（含 `draft.discard`）和 `DraftCanvasSchema`、`PendingLaunchWireSchema`；`runCommand` 对这四条命令统一返回 `notSupported`。 | (D) `WT11b/apps/web/src/protocol/lab/command.ts:94-97,163-166`、`rows.ts:139,159`；`WT11b/apps/web/src/server/lab/operations.ts:247-250,264` |
| G-14 | Lab 表：`pending_launch` 以 `conversation_id` 为主键（每会话至多一条），`state` 只有 `awaiting_approval`、`sent`，没有版本列；`draft` 有 `saved_version`（默认 0、非负）；`experiment_ext.draft_id` 以外键指向 `draft`；`human_irc_queue.principal` 非空，外键指向 `user.id`。 | (D) `WT11b/apps/web/src/server/lab/schema.ts:78-117,171-177` |

---

## 〇、顺序依赖：复用 #17 的 `StoreClient` 与 `LabEvents`

### 0.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F0-1 | 工人的请求：进入 `sent` 前要从 store 读取权威状态，判断“同一讨论同一时刻至多一个未结束”（免审批时在 start 读，需审批时在 approve 重读；store 不可达时返回 `persistence_unavailable`，不改本地状态）；草稿与 `pending_launch` 的变化要推送 `catalog`。这两项要复用 #17 的 `StoreClient` 与 `LabEvents`，本片不复制实现，也不省略通知。工人请求二选一：(1) 等 #17 合入 `main` 再实施；(2) 以 #17 的干净提交 `d75b7d9` 为显式依赖，做叠加 PR。 | (A) 评论 6560165218 第一节 |
| F0-2 | `StoreClient` 与 `LabEvents` 只在 `WT07a/`：`WT07a/apps/web/src/server/lab/store.ts:36`、`events.ts:8`，并在 `runtime.ts:8,12,61-63,119-121` 接进运行时上下文。`WT11b/apps/web/src/server/lab/` 下没有 `store.ts`、`events.ts`、`catalog.ts`。 | (R) `ls WT11b/…/server/lab/`、`ls WT07a/…/server/lab/`；(D) 所列行 |
| F0-3 | `main` 基线上也没有 `GET /runs` 的客户端调用，也没有任何事件发布（在 `WT11b/apps/web/src/server/lab/` 中检索 `/runs`、`publish(` 均无匹配）。已有的 store 访问只有 LAB-06 的生命周期流订阅和 LAB-10 节点库的版本/usage 读取。 | (R) 检索无匹配；(D) `WT11b/…/server/lab/experiments.ts:94-106`、`library.ts:188-196` |
| F0-4 | 切片表中 LAB-11b 不依赖 LAB-07a（G-1）。工人 STARTED 自述 LAB-04（PR #48）、LAB-06（PR #50）已合入。 | (D) G-1；(A) [评论 6560126303](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6560126303) |
| F0-5 | “同刻至多一未结束”的出处：D7-06 末句（G-3）。store 侧的同一规则：“一个根会话同一时刻至多一个未结束的运行”，由 eval 插件开运行、store 在提交事务里确认。D7-06 与 D12 都没有写 Lab 在置 `sent` 前要向 store 读取并核对这一条。 | (D) `DEC/D7-lab-backend.md:66`；`DEC/D6-store-service.md:33`（D6-05）；本实例在 D7、D12 中未找到前置读取的条文 |
| F0-6 | LAB-06 绑定运行时，按会话取 `state = 'sent'` 的 `pending_launch`，绑定后删除；绑定不需要 agent 回报草稿 id。 | (D) `WT11b/apps/web/src/server/lab/experiments.ts:22-48` |
| F0-7 | #17 当前状态：两项闸门结论已写回 [#17 评论 6560745517](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560745517)，并已送达 W-09。其中 BLOCKED-2 定为 LAB-07a 与 LAB-07b 同分支、同一 PR 连续实现；BLOCKED-1（`routeTree.gen.ts`）转 P0，表决前全量和差量都不提交。P0 草稿尚未立案。 | (D) `GATE/pepgent-17-gate-a.md:5-6`、`GATE/pepgent-17-gate-b.md:9-10`；`DEC/drafts/pepgent-17-routetree.md:3`；(A) `local://state/area-pepgent.md:10,20-23` |
| F0-8 | `d75b7d9` 是剔除 `routeTree.gen.ts` 后的 07a 提交。剔除后，该分支的本仓 typecheck 报错（4 个 `api/lab` 路由文件，共 9 个诊断）。本实例未重跑。 | (A) 评论 6560165218；(D) `GATE/pepgent-17.md:47` |
| F0-9 | LAB-07b 的上游 MUX-03/06/07、SOR-13 的 issue 均为 CLOSED，但 issue 关闭不等于代码已合入对应仓的 `main`，#17 的两份闸门报告都没有核实合入。 | (D) `GATE/pepgent-17.md:99`、`GATE/pepgent-17-gate-a.md:90`、`GATE/pepgent-17-gate-b.md:95` |
| F0-10 | 下游：WEB-04 依赖 LAB-11b；WEB-02 只依赖 LAB-07a 与 WEB-01；W-10 在等 LAB-07a 合入后重新进场。 | (D) `DEC/D8-mvp-scope.md:336,338`；(A) `local://state/phaseB-bus.md:20` |
| F0-11 | 已合入 PR 前不得先合入再补授权；剔除后若出现真实编译 blocker，回原 issue 上报双闸门。 | (D) `LEDGER.md:22`（R8 行） |

### 0.2 闸门 A 的问题（交 `Argon`）

- **A0-1：** D7-06 的“同刻至多一未结束”（F0-5），是否要求 Lab 在置 `sent` 前（以及在 approve 时）向 store 读取并核对？还是只重述 D6-05 由 eval 插件与 store 保证的规则？若不要求前置读取，本项对 `StoreClient` 的依赖就不存在，只剩对 `LabEvents` 的依赖（G-7）。若要求，store 不可达时返回 `persistence_unavailable` 属于失败分支；它是否在本次判定范围内？（设计规则只写主路径，见 `SOR/.claude/rules/design-assumes-it-works.md`。）
- **A0-2：** 下列各处置都不改 wire、持久化或命令语义。它们是否只是已通过契约内的实现排序与文件组织（G-10 后半句）？

### 0.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B0-1：** 切片表没有把 LAB-07a 列为 LAB-11b 的依赖（F0-4、G-2）。复用同一席位尚未合入的模块，属于 D16-11③ 所说的“编译、类型、构建或调用契约上的真实依赖”，还是工程师自选的文件组织（G-10）？如果属于前者，是否等于事实上修改了 D8:333 的依赖列，需要表决？
- **B0-2：** 处置 b（叠加 PR，以 `d75b7d9` 为基）：基底的 typecheck 本身不通过（F0-8）。若 PR 目标是 `main`，合入它就等于把 #17 的内容先行合入，而 #17 尚有 P0 未决、还需与 07b 同 PR 交付（F0-7）。这是否违反 F0-11 的“不得先合入再补授权”，以及 #17 已送达的结论？若 PR 目标是 07a 分支，它是否就等同处置 c？
- **B0-3：** 处置 c（并入 07a/07b 的同一分支与 PR，`Closes #17 #18 #20`）：G-9 允许同域关联切片合并提交。它会进一步推迟 WEB-02 的真实上游（F0-10），这是否与 D16-10 “W-10 在 `protocol/lab` 的真实上游合入后优先补入”（`DEC/D16-phaseB-review-restore.md:34`）相冲突？同时，该 PR 的合入还要等 #17 的 routeTree P0，这是否把 #18 与一个无关的白名单表决绑在了一起？
- **B0-4：** 处置 a（等 #17 合入后再实施）：#17 合入的前提是 07b 完成且 routeTree P0 通过（F0-7、F0-9）。期间 W-09 是否还有不依赖本项的工作可做？G-10 规定“只暂停依赖部分”；按 G-7，四条命令改动草稿或 `pending_launch` 时都要发 `catalog`，那么本片是否还剩不依赖 `LabEvents` 的部分？
- **B0-5：** 处置 d（在 `main` 基线上自建本片所需的最小 store 读取与事件发布）：所写文件都在 W-09 白名单内（G-8）。这是否完全属于工程师自主决定的范围？工人已表示不复制实现（F0-1，属 (A)）。

### 0.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约或切片表 | 需要注意的地方 |
|---|---|---|---|
| a | 等 #17（连同 07b）合入 `main` 后，再在 `main` 上实施 #18。 | 不改 | 等待时长取决于 07b 实现与 routeTree P0（F0-7、F0-9）；B0-4 |
| b | 叠加 PR，以 `d75b7d9` 为基。 | 不改 | 基底 typecheck 不通过（F0-8）；B0-2 |
| c | 并入 07a/07b 的同一分支与 PR，写 `Closes #17`、`Closes #18`、`Closes #20`。 | 不改 | 进一步推迟 WEB-02 上游，并与 routeTree P0 绑定（B0-3） |
| d | 在 `main` 基线上自建本片所需的最小 store 读取与 `catalog` 发布，不等 #17。 | 不改 | 与 07a 的 `store.ts`、`events.ts`、`runtime.ts` 重复，后合入的一方要整合；工人不愿意复制实现（F0-1） |
| e | 若闸门 A 认定 D7-06 不要求前置读取 store（A0-1），本片就只依赖 `LabEvents`，再从 a 至 d 中选一。 | 不改 | 依赖面缩小，但不消除对 `LabEvents` 的依赖 |

---

## 一、空白 1：启动 prompt 的正文格式

### 1.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F1-1 | 工人的问题：D7-06 只写了“prompt 草稿全文”。正文是整个 `DraftCanvas` 的无损 JSON，还是指定的 Markdown 模板？是否必须带 `draft.id`？ | (A) 评论 6560165218 第二节第 1 点 |
| F1-2 | 现有契约中关于这一 prompt 的全部表述：D7-06 “直接 sent 并 prompt 草稿全文”；D7 时序图“LAB->>O: prompt（草稿作为上下文）”；D6-12 “（草稿）供讨论和启动实验时作为 agent 的上下文，从不被执行”；D8 F31 ② “`experiment.approve` 之后向原讨论会话投递草稿”；LAB-11b 验收“会话收到含草稿的 prompt”。 | (D) `DEC/D7-lab-backend.md:66,189-191`；`DEC/D6-store-service.md:40`；`DEC/D8-mvp-scope.md:150,333` |
| F1-3 | `DraftCanvas` 只存语义：`title`、`description`、`stages[].name`、`nodes[]`（`id`、`fn`、`from`、`inputs[{parameter, expression}]`、`arm`、`estimateMinutes`、`origin`）。 | (D) `DEC/D12-lab-wire.md:184-203`；D12-06 `:38` |
| F1-4 | 本实例在 D7、D12、`SOR/design/` 中都没有找到这一 prompt 正文的格式定义，也没有找到要求带 `draft.id` 的条文。 | (R) 在 `DEC/D7-lab-backend.md`、`DEC/D12-lab-wire.md`、`SOR/design/` 中检索 `草稿全文`、`pending_launch`、`experiment.start` |
| F1-5 | 没有任何程序解析这段正文：运行绑定靠 `pending_launch`（按会话、`state='sent'`），不靠 agent 回报草稿 id（F0-6）；soroi 插件的 agent、rule 中没有关于草稿 prompt 的约定。 | (D) `WT11b/…/server/lab/experiments.ts:37-48`；(R) 在 `SOR/packages/omp-soroi` 中检索 `草稿`、`draft`、`pending_launch`、`lab_propose_experiment`，只命中 atom 命名示例 `draft_1`、`draft_2` |
| F1-6 | `main` 上根会话唯一的投递路径是 `human_irc_queue`：Lab 以 RPC `prompt` 投递，正文为 `human:<principal>` 加空行加 `body`。D7 接口草图另写有 `LabSessions.prompt(c, text)`，但 `main` 没有这一方法。 | (D) `WT11b/…/server/lab/sessions.ts:2-5,296-298`；`DEC/D7-lab-backend.md:147`；`DEC/D7-lab-backend.md:69`（D7-09 “接管 agent”段） |
| F1-7 | 领导层表决类别包括 wire 和“定制 agent/skill/rule 内容”（G-10）。 | (D) `DEC/D10-repo-delivery.md:20` |

### 1.2 闸门 A 的问题（交 `Argon`）

- **A1-1：** 交给根 omp agent 的启动 prompt 正文，是否构成跨组件公开契约（wire），或者属于 agent 行为内容？依据：消费者是 LLM，不是解析程序（F1-5）。还是说它属于 Lab 的单仓私有实现，由工程师决定？
- **A1-2：** “草稿全文”是否已经给出了要求：正文要完整覆盖 `DraftCanvas` 的全部语义字段（F1-3）？若是，有损的摘要式模板是否就违背了这一要求？
- **A1-3：** `draft.id` 是否属于“草稿全文”？运行绑定并不依赖它（F1-5）。
- **A1-4：** 这一项是否属于缺失设计，需要 Argon 补设计（Argon 享有缺失设计一票否决权）？若需引用 `(U)`，请给出。

### 1.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B1-1：** 若闸门 A 认定这是工程师的私有实现，由 W-09 自定格式是否就不需要投票？若认定为契约，是否按 P0 交 4 席表决（产品/契约议案，`AGENTS.md:22`）？
- **B1-2：** 若把它看作“定制 agent/skill/rule 内容”（F1-7），是否另有表决要求？
- **B1-3：** 工人在本项上暂停实现，是否属于 G-10 “只暂停依赖部分”的正确范围？

### 1.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 由工程师在 Lab 内自定正文，覆盖 `DraftCanvas` 全部语义字段（文本或 Markdown 渲染均可）。 | 闸门 A 认定为私有实现时不改 | A1-2 的“全文”是否满足 |
| b | 正文为 `DraftCanvas` 的无损 JSON。 | 同 a | 同 a |
| c | 在 a 或 b 之上加 `draft.id`。 | 同 a | 绑定并不需要它（F1-5） |
| d | 立案确定正文格式（含是否带 `draft.id`），回写 D7-06。 | 改 D7-06 | 按 P0 表决 |

---

## 二、空白 2：审批路径上的 principal

### 2.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F2-1 | 工人的问题：`experiment.approve` 让 prompt 入队时，`human_irc_queue.principal`（外键指向 `user.id`）取审批人的 UserId，还是草稿所属讨论 owner 对应的 UserId？`conversation.owner` 是 MemberId，不能直接使用。 | (A) 评论 6560165218 第二节第 2 点 |
| F2-2 | D7-03：“人类消息 principal 与 HumanHandback.by 取 session.user.id”。D7-09：“principal 是当前用户”。D11-49：“人类消息的 `principal` 取 `session.user.id`”。 | (D) `DEC/D7-lab-backend.md:63,69`；D11-49 原文见 #18 [评论 6555011240](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6555011240) 与 `DEC/D11A-solo-ruling-review.md:26` |
| F2-3 | D24-01 的同形先例（`derive` 的 `by`）：Lab 按 `conversation.owner` 授权后，填入发起派生的当前 UserId，不以 `conversation.owner` 的 MemberId 代替；理由之一是 owner 为 MemberId，不是 UserId。 | (D) `DEC/D24-derive-principal.md:13,19`；`DEC/D7-lab-backend.md:69` |
| F2-4 | `HumanIrcQueueWire.principal: UserId`；表列 `principal` 非空，外键指向 `user.id`（G-14）。 | (D) `DEC/D12-lab-wire.md:181`；`WT11b/…/server/lab/schema.ts:174` |
| F2-5 | MemberId 可以映射到 UserId：Better Auth 的 `member` 表有非空的 `user_id`，外键指向 `user.id`。 | (D) `WT11b/apps/web/src/server/lab/auth-schema.ts:100-109` |
| F2-6 | 两条路径的差别只出现在一种情形：`experiment.start` 要求操作者就是讨论 owner（G-6），免审批 `sent` 时“当前用户”与“讨论 owner 对应的用户”是同一人；`ownExperiments` 审批人也就是讨论 owner。只有持 `approval: any` 的 owner 角色审批他人实验时，两者才不同。 | (D) `DEC/D12-lab-wire.md:511-512`；`DEC/D7-lab-backend.md:63`（owner=any，含他人实验） |
| F2-7 | D7-06 只写“approval 可批准”，没有写审批后投递的 prompt 以谁为来源；D7、D12 也没有写启动 prompt 是否必须经 `human_irc_queue`。`main` 只有这一条投递路径（F1-6）。 | (D) `DEC/D7-lab-backend.md:66`；`WT11b/…/server/lab/sessions.ts:296-298` |
| F2-8 | 投递正文带 `human:<principal>`，agent 据此识别是哪位人类发来的消息（D3-12、D7-09）。 | (D) `DEC/D3-network-mux.md:66`（D3-12）；`DEC/D7-lab-backend.md:69` |

### 2.2 闸门 A 的问题（交 `Argon`）

- **A2-1：** 审批后投递的启动 prompt 算不算 D7-03、D7-09、D11-49 所说的“人类消息”？若算，“当前用户”（F2-2）在审批路径上是否就直接指审批人？这样是否已由现行条文回答，不需要新设计？
- **A2-2：** 若取讨论 owner 对应的 UserId（F2-5），agent 看到的来源（F2-8）就不是实际按下批准的人。这是否改变了 principal 的语义，从而触及公开契约或用户意图？D24 的先例（F2-3）是否适用？
- **A2-3：** 若认定启动 prompt 不是人类消息、不经 `human_irc_queue`（F2-7），是否要新增一条投递路径？这是否属于缺失设计？

### 2.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B2-1：** 若闸门 A 认定条文已直接回答（A2-1），放行是否就不越过任何白名单或阶段门禁？相关代码全在 W-09 白名单内（G-8）。
- **B2-2：** 处置 b 或 c 若被认定改变 principal 语义或新增投递路径，是否按 P0 交 4 席表决？
- **B2-3：** 差异只出现在 F2-6 的单一情形，其余路径不受影响。工人在本项上暂停整片，是否超出了 G-10 “只暂停依赖部分”？

### 2.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | principal 取审批人的 `session.user.id`（当前用户）。 | 闸门 A 认定 F2-2 已覆盖时不改 | A2-1 |
| b | principal 取讨论 owner 经 `member.user_id` 映射得到的 UserId。 | 可能改变 principal 语义 | A2-2；与 D24 先例的关系 |
| c | 启动 prompt 不作为人类消息投递，新增一条非 `human_irc_queue` 的投递路径。 | 新增投递路径与来源语义 | A2-3；需改 `LabSessions` |

---

## 三、空白 3：`draft.discard` 的归属与状态处理

### 3.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F3-1 | 工人的问题：D8 的本切片行没有列 `draft.discard`，D12-10 列了。另外，`awaiting_approval` 的 pending 目前只能被 approve 推进或被 `run_started` 绑定，没有其他出口；若没有 discard，它会永久占住该讨论的 `pending_launch` 主键。请确认 discard 是否归 #18，并给出以下状态下的处理：无 pending、`awaiting_approval`（取消 pending 还是拒绝）、`sent`（拒绝？）、已绑定运行（拒绝？）。 | (A) 评论 6560165218 第二节第 3 点 |
| F3-2 | D8:333 列出 `draft.save`、`experiment.start`、`experiment.approve`，没有 `draft.discard`。本实例在 D8 全文中检索 `draft.discard`、`discard`，没有任何切片行列出它。 | (D) `DEC/D8-mvp-scope.md:333`；(R) 检索结果 |
| F3-3 | D12 完整命令联合中有 `draft.discard{draft}`，结果为 `Done`，权限为 `write` 且是草稿所属讨论的 owner；D12-10 写明“完整联合、逐 kind 结果与权限按下文……无兜底”。秘书评论把 D12-10 对应给 #18（G-4）。 | (D) `DEC/D12-lab-wire.md:42,419,471,511` |
| F3-4 | D10-11(a)：“`draft` 表与 `DraftCanvas` 归 LAB-11b”。 | (D) `DEC/D10-repo-delivery.md:23` |
| F3-5 | 原型的草稿对话框集合有 `keep`、`discard`、`start`、`edit_parameters`、`remove`。 | (D) `DEC/D12-coverage.md:222` |
| F3-6 | 实验审批只有 `experiment.approve` 一条命令，没有拒绝或撤回命令；作对照，自动化审批有 `automation.approve` 与 `automation.dismiss` 两条。`PendingLaunchWire.state` 只有两个值（G-5、G-14）。 | (D) `DEC/D12-lab-wire.md:420-421,435-436,155` |
| F3-7 | D7-06 写 `pending_launch` 在非派生 `run_started` 绑定后删除；D7、D12 没有写其他删除时机。 | (D) `DEC/D7-lab-backend.md:66`；`WT11b/…/server/lab/experiments.ts:40-48` |
| F3-8 | 已绑定运行的草稿：`ExperimentWire.draft` 的注释为“未绑定运行的草稿，或绑定运行的来源草稿”；`experiment_ext.draft_id` 以外键指向 `draft`（G-14）。物理删除已绑定的草稿会违反该外键。 | (D) `DEC/D12-lab-wire.md:265`；`WT11b/…/server/lab/schema.ts:112,116` |
| F3-9 | 被丢弃的草稿还会出现在 LAB-10 的草稿引用中（`draftReferences` 从 `draft` 表读取）。 | (D) `WT11b/…/server/lab/operations.ts:98-105`；`DEC/D12-lab-wire.md:343` |

### 3.2 闸门 A 的问题（交 `Argon`）

- **A3-1：** `draft.discard` 在各状态下的行为（F3-1 列出的四种），是否属于 D10-08 的“状态权威与生命周期”（G-10），从而是公开契约？还是已通过契约（G-5、G-6）内的私有实现？
- **A3-2：** `awaiting_approval` 没有拒绝或撤回出口（F3-6、F3-7），这是否构成缺失设计？若用 discard 兼作出口，是否就改变了 `draft.discard` 的语义（它从“丢弃草稿”变成也能“撤回启动意图”）？若新增 `experiment.reject` 一类命令，则属于 wire 变更。
- **A3-3：** 已绑定运行的草稿（F3-8）在契约中是运行的“来源草稿”，被 discard 后来源是否还要保留？这是否触及用户意图？若需引用 `(U)`，请给出。

### 3.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B3-1：** D8:333 没有列 `draft.discard`（F3-2），但 D10-11(a) 把 `draft` 表归给 LAB-11b（F3-4），秘书评论也把 D12-10 对应给 #18（F3-3）。把 discard 划归 #18，是依据现有正文的机械补全，还是修改 D8:333 的范围（需表决）？
- **B3-2：** 若 discard 不归 #18，现行切片表中就没有任何切片承载它（F3-2），这是否构成派工空白？由谁承载，是否属于派工分配议案（5 席参投，`AGENTS.md:23`）？
- **B3-3：** 若闸门 A 认定 A3-1 或 A3-2 需要表决，表决期间 W-09 能否先实现不依赖本项结论的命令（参照 `DEC/D16-15-stress.md:22` “投票期间照常推进”与 G-10）？

### 3.4 可选处置（只列出，不推荐）

归属：

| 代号 | 处置 | 是否改契约或切片表 | 需要注意的地方 |
|---|---|---|---|
| 归属-i | `draft.discard` 归 #18，依据 D10-11(a) 与 D12-10 的秘书对应。 | 若 B3-1 认定为机械补全则不改 | B3-1 |
| 归属-ii | 修订 D8:333，把 `draft.discard` 正式写入 LAB-11b。 | 改切片表 | 按表决修订 |
| 归属-iii | 另指定承载切片。 | 改切片表 | B3-2 |

状态处理（每格是一种候选，不是组合方案）：

| 状态 | 候选 1 | 候选 2 | 需要注意的地方 |
|---|---|---|---|
| 无 pending、未绑定 | 删除草稿行 | — | 草稿引用随之消失（F3-9） |
| `awaiting_approval` | 删除 pending 与草稿（兼作撤回出口） | 拒绝，另设撤回或拒绝命令 | A3-2；候选 2 是 wire 变更 |
| `sent`（已投递、未绑定运行） | 拒绝 | 删除 pending，丢弃草稿 | 已投递的 prompt 是 transcript 中不可变的事实（`DEC/D7-lab-backend.md:69`）；候选 2 下，随后的 `run_started` 将找不到 pending，按 D7-06 改用讨论名称与项目命名（`DEC/D7-lab-backend.md:66`） |
| 已绑定运行 | 拒绝 | 保留行，只从目录隐藏 | 外键约束（F3-8）；候选 2 需新增状态或字段，属于持久化变更 |

---

## 四、空白 4：`draft.save` 的状态矩阵

### 4.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F4-1 | 工人的问题：命令没有 base version，所以 `savedVersion` 只作为服务端单调修订号，不做乐观并发，也不新增字段。`awaiting_approval`、`sent`、已绑定运行三种状态下是否允许保存？若在 awaiting 期间允许，审批时发出的是最新版本还是 start 时的版本？ | (A) 评论 6560165218 第二节第 4 点 |
| F4-2 | `draft.save{draft, canvas}` 不带基准版本；结果返回 `savedVersion`；`DraftWire.savedVersion: number`；页面以它显示“已保存版本 N”。 | (D) `DEC/D12-lab-wire.md:418,470,154`；`DEC/D12-coverage.md:245-246` |
| F4-3 | `pending_launch` 只记 `{conversation, draft, at, state}`，不记草稿版本或快照（G-5、G-14）。 | (D) `DEC/D12-lab-wire.md:155`；`DEC/D7-lab-backend.md:132-133` |
| F4-4 | D7-06 免审批时“直接 sent 并 prompt 草稿全文”；F31 ② “`experiment.approve` 之后向原讨论会话投递草稿”。两处都没有写投递的是哪一个版本。 | (D) `DEC/D7-lab-backend.md:66`；`DEC/D8-mvp-scope.md:150` |
| F4-5 | 已绑定运行的草稿是该运行的“来源草稿”（F3-8）。D7、D12 没有写草稿绑定运行后是否还能编辑。 | (D) `DEC/D12-lab-wire.md:265`；(R) 在 D7、D12 中未找到相关条文 |
| F4-6 | 投影把 `pendingLaunch` 映射为 queued 状态，与草稿状态分开显示。 | (D) `DEC/D12-coverage.md:82`；`DEC/D7-lab-backend.md:66`（“读取时投影 draft、queued、running……”） |
| F4-7 | 审批授权的判定对象是“草稿所属讨论的 owner”（G-6），与草稿内容版本无关。 | (D) `DEC/D12-lab-wire.md:512` |

### 4.2 闸门 A 的问题（交 `Argon`）

- **A4-1：** 审批人批准的是什么：是 start 那一刻的草稿内容，还是“这个草稿”的当前内容？这是否关乎审批语义（D10-08 的“验收语义”或“状态权威与生命周期”）或用户意图？若需引用 `(U)`，请给出。
- **A4-2：** 若审批要发出 start 时的版本，现有字段无法表达（F4-3），需要新增持久化或 wire 字段。这是否属于公开契约变更？
- **A4-3：** 已绑定运行的“来源草稿”（F4-5）在运行开始后被修改，是否改变了已发生事实的含义？这是否触及意图？
- **A4-4：** `savedVersion` 不做乐观并发、只作服务端单调计数（F4-1），这是否就是 D12 现有形状（F4-2）的直接含义，不需要表决？

### 4.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B4-1：** 处置 c 需要新增字段（A4-2）；若闸门 A 认定 a、b 也涉及生命周期语义，是否都按 P0 交 4 席表决？
- **B4-2：** 第三、四项都在定义草稿和 `pending_launch` 的同一组状态。若两项都进入表决，是否应合为同一议案逐行表决，避免两张表的结论互相矛盾？
- **B4-3：** 表决期间，`draft.save` 在“无 pending、未绑定”状态下的行为没有争议，能否先实现（参照 B3-3）？

### 4.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 各状态都允许保存；审批时投递当前最新版本。 | 不新增字段；是否改语义由 A4-1 判定 | 审批人看到的版本可能与申请时不同 |
| b | 有 pending（awaiting 或 sent）或已绑定运行时，拒绝保存；审批时草稿必然等于 start 时的内容。 | 不新增字段；是否改语义由 A4-1 判定 | 等待审批期间无法修改，只能先撤回（依赖第三项的出口） |
| c | awaiting 期间允许保存，审批时投递 start 时的快照。 | 新增版本或快照字段（持久化与 wire） | A4-2；按 P0 表决 |
| d | 已绑定运行的草稿只读，其余状态按 a 或 b 处理。 | 同 a 或 b | 与 A4-3 相关 |

---

## 五、同一评论中不在本次任务范围内的事项（只登记）

- **工人第三节“已能依契约确定”的四点：** 与本实例读到的正文相符的有：`experiment.approve` 不要求 `write`（`DEC/D12-lab-wire.md:512`）；`ownExperiments` 比较审批人的 `member.id` 与讨论的 `conversation.owner`（`DEC/D11A-solo-ruling-review.md:31`）；`pending_launch` 以会话为主键（G-14）；`run_started` 的绑定沿用 LAB-06 的 `nameStartedRun`（`WT11b/…/server/lab/experiments.ts:22`）。冲突时返回 `revision_conflict`、`sent` 分支在同一事务中写 pending 与 `human_irc_queue`，属于工人自述的实现做法 (A)，本实例未作分类。
- **“D12 v3 回写”：** 工人说 W-09 其余切片依赖“D12 v3 回写”。#17 闸门 A 已核实 PM 上的 D12 含 `ConversationWire.slots` 与新注释（`GATE/pepgent-17-gate-a.md:78`），工人此后也自述已读到回写后的正文（`local://state/area-pepgent.md:21`，属 (A)）。
- **LAB-10 接缝：** #18 早先收到的接缝要求是提供 `draftReferences(fnName)`（[评论 6553374054](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6553374054)）。`main` 的 `operations.ts:98-105` 已有一个按 Lab 读取 `draft` 表、返回 `{draft, fns}[]` 的 `draftReferences`，形状与 `DEC/D12-lab-wire.md:343` 一致。它与 D10-11(a) 交给 LAB-11b 的范围是什么关系，本次未判断。
- **切片行的行号引用：** D8:333 与 F31 引用的“D7:161-162”在现行 D7 中指向 `LabHostTool` 联合的末尾（`DEC/D7-lab-backend.md:161-162`），不是启动与绑定的内容；相关内容现在位于时序图 `:189-194`。原引用大概率是 D7 改版后的行号漂移 `[INFERENCE]`。
- **审批与 discard 对 WEB-04 的影响：** WEB-04 依赖 LAB-11b（`DEC/D8-mvp-scope.md:338`）。第三、四项的结论会影响流程编辑器的保存与丢弃交互，本次只登记。

## 六、闸门判定后的程序

- 五项分别判定。对某一项，A 与 B 都确认不越界时，按机械补全放行，结论写回 #18，再由 Pepgent 片区经理送达 W-09。
- 任一闸门认定越界时，由新的 governance-desk 实例按 P0 起草决策表（`ID | what | where | how | 取舍 | 分类`），写入 `local://decisions/`，交议会立案。参投席位与门槛按 `AGENTS.md:22-27`（D1-12）：产品与契约议案 4 席参投；涉及切片范围或派工分配的（例如第〇项 B0-1、第三项 B3-1、B3-2），另加 `ArgonGovernance`。
- 闸门结论建议写入 `GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`（沿用 #17 的做法），保证下一个空白实例只读这些文件就能接续。
