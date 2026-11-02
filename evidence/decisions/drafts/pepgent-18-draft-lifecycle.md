# 决策表草稿：Pepgent#18（LAB-11b）草稿与启动意图的生命周期

- **状态：** 已由议会 daemon 立案为 D26（[Pepgent/PM#43](https://github.com/Pepgent/PM/issues/43)），LC-1 至 LC-6 依次对应 D26-01 至 D26-06，六行均以 4/4 通过并定稿。定稿正文见 `PM/evidence/decisions/D26-pepgent-18-draft-lifecycle.md`，本文件不是权威。
- **起草：** governance-desk（总协调指挥席，与 `Main` 合计 1 票），起草者不另投票。
- **来由：** [Pepgent/Pepgent#18](https://github.com/Pepgent/Pepgent/issues/18)，[BLOCKED 评论 6560165218](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6560165218) 第二节第 3、4 点。闸门结论已写回 #18：[评论 6561259743](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561259743)。
- **为什么要投票：** 闸门 A 判定第三、四项触及草稿与启动意图的公开生命周期缺口，必须 P0（`GATE/pepgent-18-gate-a.md:10-11`）；闸门 B 同样判定必须 P0，并要求两项合为同一议案逐行表决（`GATE/pepgent-18-gate-b.md:14-15,107`）。依据 `SOR/AGENTS.md:60`（C2-2）、`DEC/D10-repo-delivery.md:20`（D10-08 的“状态权威与生命周期”）。
- **优先级：** P0（关键路径工程 BLOCKED 解阻），`SOR/AGENTS.md:26`。
- **参投席位与门槛：** 各行都是产品与跨组件契约行，不改派工、范围或切片表（`GATE/pepgent-18-gate-b.md:14,96,115`），由 4 席逐行投票：总协调指挥席、独立正反审查席 `claude-high`、产品原始意图席 `Argon`、独立导师仲裁席 `LeadMentor`。每行至少 3 席赞成、无未清零反例、无成立的专责否决即通过。依据 `SOR/AGENTS.md:22,27`。
- **表决方式：** LC-1 至 LC-6 同时、逐行表决，彼此不互斥，也不以别行的结果为表决条件。每行只写一个主案，备选写在该行“取舍”栏。六行的主案合起来构成一条一致的规则：**草稿内容投递给 agent 之前（无 pending 或 `awaiting_approval`）可以保存、可以丢弃；投递之后（`sent` 或已绑定运行）草稿就是这次实验的来源，不能再保存或丢弃；审批投递批准那一刻的草稿。** 任何一行未通过，只是该格仍未定义，不与已通过的行冲突。
- **设计范围：** 只写主路径（`SOR/.claude/rules/design-assumes-it-works.md`）。不设计超时、重试、恢复、并发或竞态处理，也不处理 agent 收到 `sent` prompt 后不开运行的情形（闸门 A 同此限定，`GATE/pepgent-18-gate-a.md:100`）。
- **立案字段：** `priority: P0`；每行 `category: 串联`、`missingDesign: true`、不填 `domains`；`notify: [AreaMgrPepgent]`。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 命令输出；`(A)` agent 的说法，只作解释。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`
- `DEC/` = `PM/evidence/decisions/`
- `GATE/` = `PM/evidence/gates/`（Pepgent/PM@`7afc735`）
- `WT11b/` = `/Users/mouriya/Ext/worktrees/pepgent-lab-11b/`（W-09 的 LAB-11b 切片工作树）

## 一、决定性事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | 草稿状态由三处记录派生：`draft` 行；以会话为主键、每会话至多一条的 `pending_launch{conversation, draft, at, state: 'awaiting_approval' \| 'sent'}`；`experiment_ext.draft` 指向运行的来源草稿。草稿本身不写 `launched`。 | (D) `DEC/D7-lab-backend.md:130-133`；`DEC/D12-lab-wire.md:152-156`；`DEC/D8-mvp-scope.md:333`；`WT11b/apps/web/src/server/lab/schema.ts:78-117` |
| F2 | D7-06：experiment.start 在原讨论建 pending_launch；有 startWithoutApproval 直接 sent 并 prompt 草稿全文，否则 awaiting_approval；生命周期流见非派生 run_started 时，将 sent 意图绑运行、写 ext、删除 pending；无 pending 时取讨论名称项目。取舍：“pending 是意图而非运行状态”。 | (D) `DEC/D7-lab-backend.md:66` |
| F3 | 命令形状：`draft.save{draft, canvas}` → `{kind:'saved', savedVersion}`；`draft.discard{draft}` → `Done`；`experiment.start{draft}` → `{kind:'launch', state}`；`experiment.approve{draft}` → `Done`。save 不带基准版本。 | (D) `DEC/D12-lab-wire.md:418-421,470-473` |
| F4 | 权限：save、discard、start 要求 `write` 且是草稿所属讨论的 owner；approve 要求 `approval: any`，或 `approval: ownExperiments` 且草稿所属讨论的 owner 是操作者。 | (D) `DEC/D12-lab-wire.md:511-512` |
| F5 | `ExperimentWire.draft` 是“未绑定运行的草稿，或绑定运行的来源草稿”；`experiment_ext.draft_id` 以外键指向 `draft`。 | (D) `DEC/D12-lab-wire.md:265`；`WT11b/apps/web/src/server/lab/schema.ts:112,116` |
| F6 | 草稿、`pending_launch` 的任一事实变化都发 `catalog`。 | (D) `DEC/D12-lab-wire.md:557`（D12-17） |
| F7 | `pending_launch` 不记草稿版本或内容快照；`draft` 只有当前 canvas、`saved_version`（默认 0、非负）与更新时间。 | (D) `DEC/D12-lab-wire.md:155`；`WT11b/apps/web/src/server/lab/schema.ts:85-103` |
| F8 | 现有绑定按会话取 `state = 'sent'` 的 pending，读该草稿写 `experiment_ext`，再删除 pending；不靠 agent 回报草稿 id。 | (D) `WT11b/apps/web/src/server/lab/experiments.ts:37-48` |
| F9 | 实验审批只有 `experiment.approve`，没有拒绝或撤回命令。 | (D) `DEC/D12-lab-wire.md:418-421` |
| F10 | 页面用 `draft.savedVersion` 显示“已保存版本 N”；投影把 pendingLaunch 显示为 queued；草稿对话框有 keep/discard/start/edit_parameters/remove。 | (D) `DEC/D12-coverage.md:82,222,245-246` |
| F11 | LAB-10 的 `draftReferences` 直接从 `draft` 表读取各草稿引用的函数。 | (D) `WT11b/apps/web/src/server/lab/operations.ts:98-105`；`DEC/D12-lab-wire.md:343` |
| F12 | 现有领域失败码只有 `not_found`、`revision_conflict`、`invalid_input`、`persistence_unavailable` 与 `not_supported`；Lab 节点库已用 `revision_conflict` 表示与当前状态冲突的写入。 | (D) `WT11b/apps/web/src/protocol/errors.ts:37-46,80-91`；`WT11b/apps/web/src/server/lab/library.ts:32` |
| F13 | 审批触发的 prompt 已按双闸门放行：取审批请求当前用户的 `session.user.id` 为 principal，入 `human_irc_queue`，正文是完整 `DraftCanvas` 的无损呈现。 | (D) `GATE/pepgent-18-gate-a.md:8-9`；`GATE/pepgent-18-gate-b.md:12-13` |
| F14 | 无 pending、未绑定草稿的保存（完整 canvas，`savedVersion` 作服务端保存修订号，不新增 base version、乐观锁或字段）已获双闸门放行，不入本表。 | (D) `GATE/pepgent-18-gate-a.md:11,117-118`；`GATE/pepgent-18-gate-b.md:15,103` |
| F15 | `draft.discard` 由 W-09 在 LAB-11b 承载已获放行，不重投命令是否存在。 | (D) `GATE/pepgent-18-gate-a.md:10`；`GATE/pepgent-18-gate-b.md:14,92` |
| F16 | 闸门 A 在材料中未找到用户亲自选定以下任一具体语义的原话：审批固定申请时版本、绑定后草稿永远只读、discard 兼作撤回审批。本表各行因此不是意图裁决，而是串联行。 | (D) `GATE/pepgent-18-gate-a.md:34,37` |
| F17 | 既有功能不能因切片漏列而删除；真实契约缺口不能先写入代码、合入后补票。 | (U) U2 `SOR/LEDGER.md:75`、U23–U24 `SOR/LEDGER.md:92`、U96 `SOR/LEDGER.md:116`；(D) `GATE/pepgent-18-gate-a.md:32-33` |

## 二、决策项

| ID | what | where | how | 取舍 | 分类 |
|---|---|---|---|---|---|
| LC-1 | **`experiment.approve` 投递批准那一刻该草稿的当前 canvas** | D7-06（`DEC/D7-lab-backend.md:66`）的 how 栏“否则 awaiting_approval；approval:any 可批准……”之后；D12-10 权限表（`DEC/D12-lab-wire.md:511-512`）之后新增“草稿与启动意图的生命周期”一段，LC-1 至 LC-6 都写在这一段 | 草稿处于 `awaiting_approval` 时，`experiment.approve` 在一次受理中完成三件事：<br>• 把该会话的 `pending_launch.state` 改为 `sent`；<br>• 读取此刻 `draft.canvas`，按 F13 已放行的方式（完整无损呈现，principal 取审批人的 `session.user.id`）入 `human_irc_queue`；<br>• 发 `catalog`（F6）。<br>`PendingLaunchWire`、`DraftWire` 与命令结果的形状都不变，不新增版本或快照字段。 | **得到：**<br>• 不新增持久化或 wire 字段（F7）。<br>• 审批人在页面上看到的是草稿当前内容与“已保存版本 N”（F10），批准的就是投递给 agent 的内容。<br>**代价：** 申请人在 `awaiting_approval` 期间改了草稿（见 LC-2）时，投递的内容与 start 那一刻不同。<br>**落选：**<br>• 投递 start 时的快照：要给 `pending_launch` 新增版本或内容快照字段（持久化与 wire 变更），并保存两份内容（`GATE/pepgent-18-gate-a.md:115`）。<br>• 等待审批期间锁定草稿、使两者必然相同：见 LC-2 的落选方案。 | 串联 |
| LC-2 | **`awaiting_approval` 期间允许 `draft.save`，行为与无 pending 的草稿相同** | 同 LC-1 的新增段；D7-06 的 how 栏 | 草稿有 `state = 'awaiting_approval'` 的 pending 时，`draft.save` 按 F14 已放行的方式保存：<br>• 替换 canvas；<br>• `savedVersion` 加一，并在结果中返回；<br>• 更新 `updatedAt`，发 `catalog`。<br>pending 保持 `awaiting_approval`，不因保存而撤回或重新申请。 | **得到：**<br>• 申请人在等待审批时仍能修改计划，不需要先撤回再重新 start。<br>• 草稿不另设“锁定”状态。<br>**代价：** 审批人批准时看到的版本可能晚于申请时的版本（LC-1）。<br>**落选：** pending 存在期间拒绝保存，使审批内容必然等于 start 时的内容。这需要一个撤回出口才能修改（LC-5 的出口会连草稿一起丢弃），还在草稿上叠加了一道按 pending 判断的写入锁。 | 串联 |
| LC-3 | **草稿在 `sent` 或已绑定运行时，拒绝 `draft.save`** | 同 LC-1 的新增段；D12-10 中 `draft.save` 的结果说明（`DEC/D12-lab-wire.md:470`） | 满足以下任一条件时，`draft.save` 返回既有领域失败 `revision_conflict`（F12），草稿、pending 和 `catalog` 都不变：<br>• 该草稿所在会话的 `pending_launch.state = 'sent'` 且指向它；<br>• 有 `experiment_ext.draft` 指向它。<br>不新增失败码。 | **得到：** 草稿内容一经投递给 agent，就固定为本次实验的计划；运行绑定后，“来源草稿”（F5）就是 agent 实际收到的内容，实验页显示的计划不会被事后改写。<br>**代价：** 要修改已投递的计划，只能另起草稿。<br>**落选：**<br>• 继续允许保存：来源草稿会与已投递内容不一致，改写已发生事实的含义（`GATE/pepgent-18-gate-a.md:116`）。<br>• 保存时自动复制成新草稿：等于新增一种隐式创建草稿的命令语义。 | 串联 |
| LC-4 | **无 pending、未绑定运行的草稿，`draft.discard` 删除草稿行** | 同 LC-1 的新增段；D12-10 中 `draft.discard` 的结果说明（`DEC/D12-lab-wire.md:471`） | 草稿既没有 pending 指向，也没有 `experiment_ext.draft` 指向时，`draft.discard` 删除该 `draft` 行，返回 `Done`，发 `catalog`。该草稿随之从目录与 LAB-10 的 `draftReferences` 中消失（F11）。 | **得到：** “丢弃”就是删除，不新增隐藏状态或字段；草稿引用随之消失，节点库的使用情况与实际草稿一致。<br>**代价：** 丢弃后无法恢复。<br>**落选：** 软删除（新增隐藏标记）：属于持久化与 wire 变更，并且要让目录、草稿引用都按该标记过滤。 | 串联 |
| LC-5 | **`awaiting_approval` 时，`draft.discard` 同时删除 pending 与草稿，撤回这次启动意图** | 同 LC-1 的新增段；D7-06 的 how 栏，在“将 sent 意图绑运行、写 ext、删除 pending”之后补写 pending 的第二个结束锚点 | 草稿有 `state = 'awaiting_approval'` 的 pending 时，`draft.discard` 在一次受理中删除该 `pending_launch` 行和 `draft` 行，返回 `Done`，发 `catalog`。该讨论随即可以再建 pending。命令形状与结果不变（F3），不新增拒绝或撤回命令。 | **得到：**<br>• `awaiting_approval` 有了出口，不会永久占住该讨论的 `pending_launch` 主键（F1、F9）。<br>• 不新增 wire 命令。<br>**代价：** `draft.discard` 的语义扩大为“丢弃草稿，并撤回它尚未投递的启动意图”；只想撤回申请、保留草稿时没有对应命令。<br>**落选：** 此状态下拒绝 discard，另设 `experiment.withdraw`/`experiment.reject`：属于 wire 变更，现有材料也不能证明用户需要单独的拒绝命令（`GATE/pepgent-18-gate-a.md:100`）。 | 串联 |
| LC-6 | **草稿在 `sent` 或已绑定运行时，拒绝 `draft.discard`** | 同 LC-1 的新增段；D12-10 中 `draft.discard` 的结果说明（`DEC/D12-lab-wire.md:471`） | 满足 LC-3 所列任一条件时，`draft.discard` 返回既有领域失败 `revision_conflict`（F12），草稿、pending 和 `catalog` 都不变。<br>主路径上，`sent` 的 pending 由随后的非派生 `run_started` 绑定并删除（F2、F8），草稿此后作为来源草稿保留。 | **得到：**<br>• 已投递的启动意图按 D7-06 绑定到运行。<br>• 来源草稿一直存在，满足 `experiment_ext.draft` 外键（F5）。<br>• 不新增状态或字段。<br>**代价：** 已启动过实验的草稿会一直留在目录中。<br>**落选：**<br>• `sent` 时删除 pending 与草稿：随后的 `run_started` 会按“无 pending”取讨论名称与项目（F2），已投递的 prompt 仍留在 transcript 中，实验失去来源。<br>• 已绑定时隐藏草稿：要新增隐藏状态或字段（持久化与 wire 变更）。<br>• 已绑定时删除草稿并把 `experiment_ext.draft` 置空：运行失去来源草稿。 | 串联 |

## 三、不入表的事项

- **无 pending、未绑定草稿的保存：** 已获双闸门放行（F14），W-09 在表决期间照常实现，不入表。
- **`draft.discard` 的归属：** 已获双闸门放行（F15），不入表，不修订 D8:333。
- **第〇、一、二项：** 已获双闸门有限放行，见 [#18 评论 6561259743](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561259743)。
- **新增 store 前置校验、新增 prompt 解析协议、改变 principal 来源或投递通道：** 目前没有任何一方提出采用，不入表。若有人坚持提出，单独立行（`GATE/pepgent-18-gate-a.md:127`）。
- **#17 的 `routeTree.gen.ts`：** 按其既有议案独立处理，不并入本表（`GATE/pepgent-18-gate-b.md:116`）。

## 四、通过后的回写范围

- **D7-06：** 在 how 栏补写审批投递内容（LC-1），以及 pending 的第二个结束锚点（LC-5）。
- **D12-10：** 新增“草稿与启动意图的生命周期”一段，按状态列出 save 与 discard 的行为与失败码（LC-1 至 LC-6）。
- **W-09 的 LAB-11b 实现：** 按通过的行实现。
- **WEB-04：** 流程编辑器在 `sent` 或已绑定状态下的保存、丢弃交互，按通过的行消费（`DEC/D8-mvp-scope.md:338`）。
- **未通过的行：** 该格仍未定义。W-09 只暂停依赖该格的代码，不先写入后补票（F17）。
