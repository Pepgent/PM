# D26 选票：ClaudeHigh

议程：Pepgent#18 LAB-11b：草稿与启动意图的生命周期（LC-1 至 LC-6）（[PM#43](https://github.com/Pepgent/PM/issues/43)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D26-01 v1：赞成（ClaudeHighD26，2026-11-01T17:27:28.716Z）



# D26 ClaudeHigh 选票（实例 ClaudeHighD26，独立空白历史，steady + divergent 双立场）

已读：PM#43 正文；`GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`；`DEC/drafts/pepgent-18-draft-lifecycle.md`；`DEC/D7-lab-backend.md:66,130-133`（D7-06）；`DEC/D12-lab-wire.md:152-156,164,265,418-421,470-473,511-512,557-559`；`DEC/D12-coverage.md:82,222,245,362-364`；`WT11b/apps/web/src/server/lab/{schema.ts:78-117,146-155, experiments.ts:24-56, catalog.ts:104-153, operations.ts:176-182,286-295, tools.ts:106-127, database.ts:22, http.ts:37}`；`WT11b/apps/web/src/protocol/errors.ts:36-46,80-91`。

## 总判断

六行主案合起来是一条单调的规则：投递前（无 pending / `awaiting_approval`）可改可丢，投递后（`sent` / 已绑定）冻结为来源。逐格核对 `pending_launch`、`experiment_ext` 两条外键（`schema.ts:102,116`，`foreign_keys = ON` 于 `database.ts:22`）与绑定代码（`experiments.ts:39-50`），没有发现哪一格在主路径上走不通、与既有契约冲突或互相矛盾。
- LC-2 与 LC-5 互相补位：等待审批时能直接改（LC-2），所以 LC-5 把丢弃和撤回合成一个动作，不会让用户失去“撤回后修改”这条路。
- LC-3 与 LC-6 互相补位：投递后既不能改也不能删，所以 `run_started` 绑定时读到的草稿（`experiments.ts:44-48`）就是 agent 收到的那一份，外键也始终成立。

divergent 立场下，比较了四种更简的替代：start 时快照、等待期加锁、软删除、新增 withdraw/reject。每一种都要新增字段、命令或锁，主案在“零新增 wire / 持久化”这一点上已经最简。所以六行都不投反对。

## 逐行

- **D26-01（LC-1）赞成。**
  - 理由：审批时读取当前 canvas，与 LC-2 一起构成“批准的就是看到的”。不新增字段，与 F7 一致。并发下看到的版本和投递的版本可能不一致，这属于竞态，按 `design-assumes-it-works` 不纳入。
  - 回写提示（非反例）：how 栏列出的“三件事”只写了 `catalog`。按 D12-17（`D12-lab-wire.md:559`），“人类消息队列变化”还要发 `conversation`；现有入队路径也同时发通知并唤醒投递（`operations.ts:293-295`）。回写 D12-10 时建议写成“按既定 `human_irc_queue` 入队语义（含 D12-17 `conversation` 通知与投递）”，避免实现方照字面只发 `catalog`。

- **D26-02（LC-2）赞成。**
  - 理由：等待审批期间可以修改，不需要锁，也不需要撤回出口；pending 不变，审批人从目录看到的就是最新草稿（`catalog.ts:144-151` 会把 pending 与草稿一起投影）。
  - 回写提示（非反例）：本行写了“`savedVersion` 加一”。但闸门 A:117 和闸门 B:100 都把具体增量算法留给工程师，F14 也没写死 +1。回写时只写“按 F14 同一保存修订号规则递增”，就能与“行为与无 pending 相同”保持一致；否则这一格会比 F14 多规定一层。

- **D26-03（LC-3）赞成。**
  - 理由：`sent` 时由 pending 判定，绑定后由 `experiment_ext.draft` 判定，衔接处没有空档（`experiments.ts:44-50` 在同一事务里写 ext、删 pending）。
  - `revision_conflict` 在 Lab 里本来就用来表示“与当前状态冲突的写入”，HTTP 映射为 409（`library.ts:117-119,307`；`operations.ts:292`；`http.ts:37`），不需要新增失败码。
  - 同一草稿在不同时间多次启动时，来源保持一致，是附带的好处。

- **D26-04（LC-4）赞成。**
  - 理由：在“无 pending、无 ext 指向”的前提下，`draft` 行没有其他外键指向它，物理删除能成功；目录与 `draftReferences` 随之一致。
  - 回写提示（非反例）：`lab_propose_experiment` 写入的 `plan` 附件 JSON 里带着 `draft: DraftId`（`tools.ts:123-124`；`D12-lab-wire.md:164`）。丢弃之后，这个附件仍引用已删除的草稿，而 `D12-coverage.md:362` 的 `plan.runId` 映射只写了“目录草稿 / 已绑定运行”两种情况。附件属于转录历史，保留引用与“丢弃即删除”并不冲突，标题和步骤仍从附件本身渲染，所以不构成主路径失效。建议回写时在 coverage:362/364 补上“目录中找不到 = 已丢弃”这一种呈现。

- **D26-05（LC-5）赞成。**
  - 理由：同一事务先删 pending、再删 draft，满足 `pending_launch` 外键（`schema.ts:102`），也给 `awaiting_approval` 提供了唯一出口，释放会话主键。
  - divergent 复核：“只撤回、保留草稿”的诉求已经由 LC-2 覆盖（不用撤回也能改），因此不需要另设 withdraw。审批人没有拒绝命令（F9），这是既有契约的现状，本行没有让它变得更差。
  - 回写提示：同 D26-04 的 `plan` 附件呈现。

- **D26-06（LC-6）赞成。**
  - 理由：投递后拒绝丢弃，保证 `run_started` 绑定时一定能读到草稿（否则会触发 `experiments.ts:45` 的“missing draft”抛错路径），也保证 `experiment_ext.draft` 外键（`schema.ts:116`）一直成立。
  - 代价表述需要更正：“一直留在目录中”实际是作为运行的来源草稿出现在目录里，不是一条独立的未绑定草稿项（`catalog.ts:142-145` 会跳过已绑定草稿）。这处表述不影响本行主案。


## D26-02 v1：赞成（ClaudeHighD26，2026-11-01T17:27:28.716Z）



# D26 ClaudeHigh 选票（实例 ClaudeHighD26，独立空白历史，steady + divergent 双立场）

已读：PM#43 正文；`GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`；`DEC/drafts/pepgent-18-draft-lifecycle.md`；`DEC/D7-lab-backend.md:66,130-133`（D7-06）；`DEC/D12-lab-wire.md:152-156,164,265,418-421,470-473,511-512,557-559`；`DEC/D12-coverage.md:82,222,245,362-364`；`WT11b/apps/web/src/server/lab/{schema.ts:78-117,146-155, experiments.ts:24-56, catalog.ts:104-153, operations.ts:176-182,286-295, tools.ts:106-127, database.ts:22, http.ts:37}`；`WT11b/apps/web/src/protocol/errors.ts:36-46,80-91`。

## 总判断

六行主案合起来是一条单调的规则：投递前（无 pending / `awaiting_approval`）可改可丢，投递后（`sent` / 已绑定）冻结为来源。逐格核对 `pending_launch`、`experiment_ext` 两条外键（`schema.ts:102,116`，`foreign_keys = ON` 于 `database.ts:22`）与绑定代码（`experiments.ts:39-50`），没有发现哪一格在主路径上走不通、与既有契约冲突或互相矛盾。
- LC-2 与 LC-5 互相补位：等待审批时能直接改（LC-2），所以 LC-5 把丢弃和撤回合成一个动作，不会让用户失去“撤回后修改”这条路。
- LC-3 与 LC-6 互相补位：投递后既不能改也不能删，所以 `run_started` 绑定时读到的草稿（`experiments.ts:44-48`）就是 agent 收到的那一份，外键也始终成立。

divergent 立场下，比较了四种更简的替代：start 时快照、等待期加锁、软删除、新增 withdraw/reject。每一种都要新增字段、命令或锁，主案在“零新增 wire / 持久化”这一点上已经最简。所以六行都不投反对。

## 逐行

- **D26-01（LC-1）赞成。**
  - 理由：审批时读取当前 canvas，与 LC-2 一起构成“批准的就是看到的”。不新增字段，与 F7 一致。并发下看到的版本和投递的版本可能不一致，这属于竞态，按 `design-assumes-it-works` 不纳入。
  - 回写提示（非反例）：how 栏列出的“三件事”只写了 `catalog`。按 D12-17（`D12-lab-wire.md:559`），“人类消息队列变化”还要发 `conversation`；现有入队路径也同时发通知并唤醒投递（`operations.ts:293-295`）。回写 D12-10 时建议写成“按既定 `human_irc_queue` 入队语义（含 D12-17 `conversation` 通知与投递）”，避免实现方照字面只发 `catalog`。

- **D26-02（LC-2）赞成。**
  - 理由：等待审批期间可以修改，不需要锁，也不需要撤回出口；pending 不变，审批人从目录看到的就是最新草稿（`catalog.ts:144-151` 会把 pending 与草稿一起投影）。
  - 回写提示（非反例）：本行写了“`savedVersion` 加一”。但闸门 A:117 和闸门 B:100 都把具体增量算法留给工程师，F14 也没写死 +1。回写时只写“按 F14 同一保存修订号规则递增”，就能与“行为与无 pending 相同”保持一致；否则这一格会比 F14 多规定一层。

- **D26-03（LC-3）赞成。**
  - 理由：`sent` 时由 pending 判定，绑定后由 `experiment_ext.draft` 判定，衔接处没有空档（`experiments.ts:44-50` 在同一事务里写 ext、删 pending）。
  - `revision_conflict` 在 Lab 里本来就用来表示“与当前状态冲突的写入”，HTTP 映射为 409（`library.ts:117-119,307`；`operations.ts:292`；`http.ts:37`），不需要新增失败码。
  - 同一草稿在不同时间多次启动时，来源保持一致，是附带的好处。

- **D26-04（LC-4）赞成。**
  - 理由：在“无 pending、无 ext 指向”的前提下，`draft` 行没有其他外键指向它，物理删除能成功；目录与 `draftReferences` 随之一致。
  - 回写提示（非反例）：`lab_propose_experiment` 写入的 `plan` 附件 JSON 里带着 `draft: DraftId`（`tools.ts:123-124`；`D12-lab-wire.md:164`）。丢弃之后，这个附件仍引用已删除的草稿，而 `D12-coverage.md:362` 的 `plan.runId` 映射只写了“目录草稿 / 已绑定运行”两种情况。附件属于转录历史，保留引用与“丢弃即删除”并不冲突，标题和步骤仍从附件本身渲染，所以不构成主路径失效。建议回写时在 coverage:362/364 补上“目录中找不到 = 已丢弃”这一种呈现。

- **D26-05（LC-5）赞成。**
  - 理由：同一事务先删 pending、再删 draft，满足 `pending_launch` 外键（`schema.ts:102`），也给 `awaiting_approval` 提供了唯一出口，释放会话主键。
  - divergent 复核：“只撤回、保留草稿”的诉求已经由 LC-2 覆盖（不用撤回也能改），因此不需要另设 withdraw。审批人没有拒绝命令（F9），这是既有契约的现状，本行没有让它变得更差。
  - 回写提示：同 D26-04 的 `plan` 附件呈现。

- **D26-06（LC-6）赞成。**
  - 理由：投递后拒绝丢弃，保证 `run_started` 绑定时一定能读到草稿（否则会触发 `experiments.ts:45` 的“missing draft”抛错路径），也保证 `experiment_ext.draft` 外键（`schema.ts:116`）一直成立。
  - 代价表述需要更正：“一直留在目录中”实际是作为运行的来源草稿出现在目录里，不是一条独立的未绑定草稿项（`catalog.ts:142-145` 会跳过已绑定草稿）。这处表述不影响本行主案。


## D26-03 v1：赞成（ClaudeHighD26，2026-11-01T17:27:28.716Z）



# D26 ClaudeHigh 选票（实例 ClaudeHighD26，独立空白历史，steady + divergent 双立场）

已读：PM#43 正文；`GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`；`DEC/drafts/pepgent-18-draft-lifecycle.md`；`DEC/D7-lab-backend.md:66,130-133`（D7-06）；`DEC/D12-lab-wire.md:152-156,164,265,418-421,470-473,511-512,557-559`；`DEC/D12-coverage.md:82,222,245,362-364`；`WT11b/apps/web/src/server/lab/{schema.ts:78-117,146-155, experiments.ts:24-56, catalog.ts:104-153, operations.ts:176-182,286-295, tools.ts:106-127, database.ts:22, http.ts:37}`；`WT11b/apps/web/src/protocol/errors.ts:36-46,80-91`。

## 总判断

六行主案合起来是一条单调的规则：投递前（无 pending / `awaiting_approval`）可改可丢，投递后（`sent` / 已绑定）冻结为来源。逐格核对 `pending_launch`、`experiment_ext` 两条外键（`schema.ts:102,116`，`foreign_keys = ON` 于 `database.ts:22`）与绑定代码（`experiments.ts:39-50`），没有发现哪一格在主路径上走不通、与既有契约冲突或互相矛盾。
- LC-2 与 LC-5 互相补位：等待审批时能直接改（LC-2），所以 LC-5 把丢弃和撤回合成一个动作，不会让用户失去“撤回后修改”这条路。
- LC-3 与 LC-6 互相补位：投递后既不能改也不能删，所以 `run_started` 绑定时读到的草稿（`experiments.ts:44-48`）就是 agent 收到的那一份，外键也始终成立。

divergent 立场下，比较了四种更简的替代：start 时快照、等待期加锁、软删除、新增 withdraw/reject。每一种都要新增字段、命令或锁，主案在“零新增 wire / 持久化”这一点上已经最简。所以六行都不投反对。

## 逐行

- **D26-01（LC-1）赞成。**
  - 理由：审批时读取当前 canvas，与 LC-2 一起构成“批准的就是看到的”。不新增字段，与 F7 一致。并发下看到的版本和投递的版本可能不一致，这属于竞态，按 `design-assumes-it-works` 不纳入。
  - 回写提示（非反例）：how 栏列出的“三件事”只写了 `catalog`。按 D12-17（`D12-lab-wire.md:559`），“人类消息队列变化”还要发 `conversation`；现有入队路径也同时发通知并唤醒投递（`operations.ts:293-295`）。回写 D12-10 时建议写成“按既定 `human_irc_queue` 入队语义（含 D12-17 `conversation` 通知与投递）”，避免实现方照字面只发 `catalog`。

- **D26-02（LC-2）赞成。**
  - 理由：等待审批期间可以修改，不需要锁，也不需要撤回出口；pending 不变，审批人从目录看到的就是最新草稿（`catalog.ts:144-151` 会把 pending 与草稿一起投影）。
  - 回写提示（非反例）：本行写了“`savedVersion` 加一”。但闸门 A:117 和闸门 B:100 都把具体增量算法留给工程师，F14 也没写死 +1。回写时只写“按 F14 同一保存修订号规则递增”，就能与“行为与无 pending 相同”保持一致；否则这一格会比 F14 多规定一层。

- **D26-03（LC-3）赞成。**
  - 理由：`sent` 时由 pending 判定，绑定后由 `experiment_ext.draft` 判定，衔接处没有空档（`experiments.ts:44-50` 在同一事务里写 ext、删 pending）。
  - `revision_conflict` 在 Lab 里本来就用来表示“与当前状态冲突的写入”，HTTP 映射为 409（`library.ts:117-119,307`；`operations.ts:292`；`http.ts:37`），不需要新增失败码。
  - 同一草稿在不同时间多次启动时，来源保持一致，是附带的好处。

- **D26-04（LC-4）赞成。**
  - 理由：在“无 pending、无 ext 指向”的前提下，`draft` 行没有其他外键指向它，物理删除能成功；目录与 `draftReferences` 随之一致。
  - 回写提示（非反例）：`lab_propose_experiment` 写入的 `plan` 附件 JSON 里带着 `draft: DraftId`（`tools.ts:123-124`；`D12-lab-wire.md:164`）。丢弃之后，这个附件仍引用已删除的草稿，而 `D12-coverage.md:362` 的 `plan.runId` 映射只写了“目录草稿 / 已绑定运行”两种情况。附件属于转录历史，保留引用与“丢弃即删除”并不冲突，标题和步骤仍从附件本身渲染，所以不构成主路径失效。建议回写时在 coverage:362/364 补上“目录中找不到 = 已丢弃”这一种呈现。

- **D26-05（LC-5）赞成。**
  - 理由：同一事务先删 pending、再删 draft，满足 `pending_launch` 外键（`schema.ts:102`），也给 `awaiting_approval` 提供了唯一出口，释放会话主键。
  - divergent 复核：“只撤回、保留草稿”的诉求已经由 LC-2 覆盖（不用撤回也能改），因此不需要另设 withdraw。审批人没有拒绝命令（F9），这是既有契约的现状，本行没有让它变得更差。
  - 回写提示：同 D26-04 的 `plan` 附件呈现。

- **D26-06（LC-6）赞成。**
  - 理由：投递后拒绝丢弃，保证 `run_started` 绑定时一定能读到草稿（否则会触发 `experiments.ts:45` 的“missing draft”抛错路径），也保证 `experiment_ext.draft` 外键（`schema.ts:116`）一直成立。
  - 代价表述需要更正：“一直留在目录中”实际是作为运行的来源草稿出现在目录里，不是一条独立的未绑定草稿项（`catalog.ts:142-145` 会跳过已绑定草稿）。这处表述不影响本行主案。


## D26-04 v1：赞成（ClaudeHighD26，2026-11-01T17:27:28.716Z）



# D26 ClaudeHigh 选票（实例 ClaudeHighD26，独立空白历史，steady + divergent 双立场）

已读：PM#43 正文；`GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`；`DEC/drafts/pepgent-18-draft-lifecycle.md`；`DEC/D7-lab-backend.md:66,130-133`（D7-06）；`DEC/D12-lab-wire.md:152-156,164,265,418-421,470-473,511-512,557-559`；`DEC/D12-coverage.md:82,222,245,362-364`；`WT11b/apps/web/src/server/lab/{schema.ts:78-117,146-155, experiments.ts:24-56, catalog.ts:104-153, operations.ts:176-182,286-295, tools.ts:106-127, database.ts:22, http.ts:37}`；`WT11b/apps/web/src/protocol/errors.ts:36-46,80-91`。

## 总判断

六行主案合起来是一条单调的规则：投递前（无 pending / `awaiting_approval`）可改可丢，投递后（`sent` / 已绑定）冻结为来源。逐格核对 `pending_launch`、`experiment_ext` 两条外键（`schema.ts:102,116`，`foreign_keys = ON` 于 `database.ts:22`）与绑定代码（`experiments.ts:39-50`），没有发现哪一格在主路径上走不通、与既有契约冲突或互相矛盾。
- LC-2 与 LC-5 互相补位：等待审批时能直接改（LC-2），所以 LC-5 把丢弃和撤回合成一个动作，不会让用户失去“撤回后修改”这条路。
- LC-3 与 LC-6 互相补位：投递后既不能改也不能删，所以 `run_started` 绑定时读到的草稿（`experiments.ts:44-48`）就是 agent 收到的那一份，外键也始终成立。

divergent 立场下，比较了四种更简的替代：start 时快照、等待期加锁、软删除、新增 withdraw/reject。每一种都要新增字段、命令或锁，主案在“零新增 wire / 持久化”这一点上已经最简。所以六行都不投反对。

## 逐行

- **D26-01（LC-1）赞成。**
  - 理由：审批时读取当前 canvas，与 LC-2 一起构成“批准的就是看到的”。不新增字段，与 F7 一致。并发下看到的版本和投递的版本可能不一致，这属于竞态，按 `design-assumes-it-works` 不纳入。
  - 回写提示（非反例）：how 栏列出的“三件事”只写了 `catalog`。按 D12-17（`D12-lab-wire.md:559`），“人类消息队列变化”还要发 `conversation`；现有入队路径也同时发通知并唤醒投递（`operations.ts:293-295`）。回写 D12-10 时建议写成“按既定 `human_irc_queue` 入队语义（含 D12-17 `conversation` 通知与投递）”，避免实现方照字面只发 `catalog`。

- **D26-02（LC-2）赞成。**
  - 理由：等待审批期间可以修改，不需要锁，也不需要撤回出口；pending 不变，审批人从目录看到的就是最新草稿（`catalog.ts:144-151` 会把 pending 与草稿一起投影）。
  - 回写提示（非反例）：本行写了“`savedVersion` 加一”。但闸门 A:117 和闸门 B:100 都把具体增量算法留给工程师，F14 也没写死 +1。回写时只写“按 F14 同一保存修订号规则递增”，就能与“行为与无 pending 相同”保持一致；否则这一格会比 F14 多规定一层。

- **D26-03（LC-3）赞成。**
  - 理由：`sent` 时由 pending 判定，绑定后由 `experiment_ext.draft` 判定，衔接处没有空档（`experiments.ts:44-50` 在同一事务里写 ext、删 pending）。
  - `revision_conflict` 在 Lab 里本来就用来表示“与当前状态冲突的写入”，HTTP 映射为 409（`library.ts:117-119,307`；`operations.ts:292`；`http.ts:37`），不需要新增失败码。
  - 同一草稿在不同时间多次启动时，来源保持一致，是附带的好处。

- **D26-04（LC-4）赞成。**
  - 理由：在“无 pending、无 ext 指向”的前提下，`draft` 行没有其他外键指向它，物理删除能成功；目录与 `draftReferences` 随之一致。
  - 回写提示（非反例）：`lab_propose_experiment` 写入的 `plan` 附件 JSON 里带着 `draft: DraftId`（`tools.ts:123-124`；`D12-lab-wire.md:164`）。丢弃之后，这个附件仍引用已删除的草稿，而 `D12-coverage.md:362` 的 `plan.runId` 映射只写了“目录草稿 / 已绑定运行”两种情况。附件属于转录历史，保留引用与“丢弃即删除”并不冲突，标题和步骤仍从附件本身渲染，所以不构成主路径失效。建议回写时在 coverage:362/364 补上“目录中找不到 = 已丢弃”这一种呈现。

- **D26-05（LC-5）赞成。**
  - 理由：同一事务先删 pending、再删 draft，满足 `pending_launch` 外键（`schema.ts:102`），也给 `awaiting_approval` 提供了唯一出口，释放会话主键。
  - divergent 复核：“只撤回、保留草稿”的诉求已经由 LC-2 覆盖（不用撤回也能改），因此不需要另设 withdraw。审批人没有拒绝命令（F9），这是既有契约的现状，本行没有让它变得更差。
  - 回写提示：同 D26-04 的 `plan` 附件呈现。

- **D26-06（LC-6）赞成。**
  - 理由：投递后拒绝丢弃，保证 `run_started` 绑定时一定能读到草稿（否则会触发 `experiments.ts:45` 的“missing draft”抛错路径），也保证 `experiment_ext.draft` 外键（`schema.ts:116`）一直成立。
  - 代价表述需要更正：“一直留在目录中”实际是作为运行的来源草稿出现在目录里，不是一条独立的未绑定草稿项（`catalog.ts:142-145` 会跳过已绑定草稿）。这处表述不影响本行主案。


## D26-05 v1：赞成（ClaudeHighD26，2026-11-01T17:27:28.716Z）



# D26 ClaudeHigh 选票（实例 ClaudeHighD26，独立空白历史，steady + divergent 双立场）

已读：PM#43 正文；`GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`；`DEC/drafts/pepgent-18-draft-lifecycle.md`；`DEC/D7-lab-backend.md:66,130-133`（D7-06）；`DEC/D12-lab-wire.md:152-156,164,265,418-421,470-473,511-512,557-559`；`DEC/D12-coverage.md:82,222,245,362-364`；`WT11b/apps/web/src/server/lab/{schema.ts:78-117,146-155, experiments.ts:24-56, catalog.ts:104-153, operations.ts:176-182,286-295, tools.ts:106-127, database.ts:22, http.ts:37}`；`WT11b/apps/web/src/protocol/errors.ts:36-46,80-91`。

## 总判断

六行主案合起来是一条单调的规则：投递前（无 pending / `awaiting_approval`）可改可丢，投递后（`sent` / 已绑定）冻结为来源。逐格核对 `pending_launch`、`experiment_ext` 两条外键（`schema.ts:102,116`，`foreign_keys = ON` 于 `database.ts:22`）与绑定代码（`experiments.ts:39-50`），没有发现哪一格在主路径上走不通、与既有契约冲突或互相矛盾。
- LC-2 与 LC-5 互相补位：等待审批时能直接改（LC-2），所以 LC-5 把丢弃和撤回合成一个动作，不会让用户失去“撤回后修改”这条路。
- LC-3 与 LC-6 互相补位：投递后既不能改也不能删，所以 `run_started` 绑定时读到的草稿（`experiments.ts:44-48`）就是 agent 收到的那一份，外键也始终成立。

divergent 立场下，比较了四种更简的替代：start 时快照、等待期加锁、软删除、新增 withdraw/reject。每一种都要新增字段、命令或锁，主案在“零新增 wire / 持久化”这一点上已经最简。所以六行都不投反对。

## 逐行

- **D26-01（LC-1）赞成。**
  - 理由：审批时读取当前 canvas，与 LC-2 一起构成“批准的就是看到的”。不新增字段，与 F7 一致。并发下看到的版本和投递的版本可能不一致，这属于竞态，按 `design-assumes-it-works` 不纳入。
  - 回写提示（非反例）：how 栏列出的“三件事”只写了 `catalog`。按 D12-17（`D12-lab-wire.md:559`），“人类消息队列变化”还要发 `conversation`；现有入队路径也同时发通知并唤醒投递（`operations.ts:293-295`）。回写 D12-10 时建议写成“按既定 `human_irc_queue` 入队语义（含 D12-17 `conversation` 通知与投递）”，避免实现方照字面只发 `catalog`。

- **D26-02（LC-2）赞成。**
  - 理由：等待审批期间可以修改，不需要锁，也不需要撤回出口；pending 不变，审批人从目录看到的就是最新草稿（`catalog.ts:144-151` 会把 pending 与草稿一起投影）。
  - 回写提示（非反例）：本行写了“`savedVersion` 加一”。但闸门 A:117 和闸门 B:100 都把具体增量算法留给工程师，F14 也没写死 +1。回写时只写“按 F14 同一保存修订号规则递增”，就能与“行为与无 pending 相同”保持一致；否则这一格会比 F14 多规定一层。

- **D26-03（LC-3）赞成。**
  - 理由：`sent` 时由 pending 判定，绑定后由 `experiment_ext.draft` 判定，衔接处没有空档（`experiments.ts:44-50` 在同一事务里写 ext、删 pending）。
  - `revision_conflict` 在 Lab 里本来就用来表示“与当前状态冲突的写入”，HTTP 映射为 409（`library.ts:117-119,307`；`operations.ts:292`；`http.ts:37`），不需要新增失败码。
  - 同一草稿在不同时间多次启动时，来源保持一致，是附带的好处。

- **D26-04（LC-4）赞成。**
  - 理由：在“无 pending、无 ext 指向”的前提下，`draft` 行没有其他外键指向它，物理删除能成功；目录与 `draftReferences` 随之一致。
  - 回写提示（非反例）：`lab_propose_experiment` 写入的 `plan` 附件 JSON 里带着 `draft: DraftId`（`tools.ts:123-124`；`D12-lab-wire.md:164`）。丢弃之后，这个附件仍引用已删除的草稿，而 `D12-coverage.md:362` 的 `plan.runId` 映射只写了“目录草稿 / 已绑定运行”两种情况。附件属于转录历史，保留引用与“丢弃即删除”并不冲突，标题和步骤仍从附件本身渲染，所以不构成主路径失效。建议回写时在 coverage:362/364 补上“目录中找不到 = 已丢弃”这一种呈现。

- **D26-05（LC-5）赞成。**
  - 理由：同一事务先删 pending、再删 draft，满足 `pending_launch` 外键（`schema.ts:102`），也给 `awaiting_approval` 提供了唯一出口，释放会话主键。
  - divergent 复核：“只撤回、保留草稿”的诉求已经由 LC-2 覆盖（不用撤回也能改），因此不需要另设 withdraw。审批人没有拒绝命令（F9），这是既有契约的现状，本行没有让它变得更差。
  - 回写提示：同 D26-04 的 `plan` 附件呈现。

- **D26-06（LC-6）赞成。**
  - 理由：投递后拒绝丢弃，保证 `run_started` 绑定时一定能读到草稿（否则会触发 `experiments.ts:45` 的“missing draft”抛错路径），也保证 `experiment_ext.draft` 外键（`schema.ts:116`）一直成立。
  - 代价表述需要更正：“一直留在目录中”实际是作为运行的来源草稿出现在目录里，不是一条独立的未绑定草稿项（`catalog.ts:142-145` 会跳过已绑定草稿）。这处表述不影响本行主案。


## D26-06 v1：赞成（ClaudeHighD26，2026-11-01T17:27:28.716Z）



# D26 ClaudeHigh 选票（实例 ClaudeHighD26，独立空白历史，steady + divergent 双立场）

已读：PM#43 正文；`GATE/pepgent-18-gate-a.md`、`GATE/pepgent-18-gate-b.md`；`DEC/drafts/pepgent-18-draft-lifecycle.md`；`DEC/D7-lab-backend.md:66,130-133`（D7-06）；`DEC/D12-lab-wire.md:152-156,164,265,418-421,470-473,511-512,557-559`；`DEC/D12-coverage.md:82,222,245,362-364`；`WT11b/apps/web/src/server/lab/{schema.ts:78-117,146-155, experiments.ts:24-56, catalog.ts:104-153, operations.ts:176-182,286-295, tools.ts:106-127, database.ts:22, http.ts:37}`；`WT11b/apps/web/src/protocol/errors.ts:36-46,80-91`。

## 总判断

六行主案合起来是一条单调的规则：投递前（无 pending / `awaiting_approval`）可改可丢，投递后（`sent` / 已绑定）冻结为来源。逐格核对 `pending_launch`、`experiment_ext` 两条外键（`schema.ts:102,116`，`foreign_keys = ON` 于 `database.ts:22`）与绑定代码（`experiments.ts:39-50`），没有发现哪一格在主路径上走不通、与既有契约冲突或互相矛盾。
- LC-2 与 LC-5 互相补位：等待审批时能直接改（LC-2），所以 LC-5 把丢弃和撤回合成一个动作，不会让用户失去“撤回后修改”这条路。
- LC-3 与 LC-6 互相补位：投递后既不能改也不能删，所以 `run_started` 绑定时读到的草稿（`experiments.ts:44-48`）就是 agent 收到的那一份，外键也始终成立。

divergent 立场下，比较了四种更简的替代：start 时快照、等待期加锁、软删除、新增 withdraw/reject。每一种都要新增字段、命令或锁，主案在“零新增 wire / 持久化”这一点上已经最简。所以六行都不投反对。

## 逐行

- **D26-01（LC-1）赞成。**
  - 理由：审批时读取当前 canvas，与 LC-2 一起构成“批准的就是看到的”。不新增字段，与 F7 一致。并发下看到的版本和投递的版本可能不一致，这属于竞态，按 `design-assumes-it-works` 不纳入。
  - 回写提示（非反例）：how 栏列出的“三件事”只写了 `catalog`。按 D12-17（`D12-lab-wire.md:559`），“人类消息队列变化”还要发 `conversation`；现有入队路径也同时发通知并唤醒投递（`operations.ts:293-295`）。回写 D12-10 时建议写成“按既定 `human_irc_queue` 入队语义（含 D12-17 `conversation` 通知与投递）”，避免实现方照字面只发 `catalog`。

- **D26-02（LC-2）赞成。**
  - 理由：等待审批期间可以修改，不需要锁，也不需要撤回出口；pending 不变，审批人从目录看到的就是最新草稿（`catalog.ts:144-151` 会把 pending 与草稿一起投影）。
  - 回写提示（非反例）：本行写了“`savedVersion` 加一”。但闸门 A:117 和闸门 B:100 都把具体增量算法留给工程师，F14 也没写死 +1。回写时只写“按 F14 同一保存修订号规则递增”，就能与“行为与无 pending 相同”保持一致；否则这一格会比 F14 多规定一层。

- **D26-03（LC-3）赞成。**
  - 理由：`sent` 时由 pending 判定，绑定后由 `experiment_ext.draft` 判定，衔接处没有空档（`experiments.ts:44-50` 在同一事务里写 ext、删 pending）。
  - `revision_conflict` 在 Lab 里本来就用来表示“与当前状态冲突的写入”，HTTP 映射为 409（`library.ts:117-119,307`；`operations.ts:292`；`http.ts:37`），不需要新增失败码。
  - 同一草稿在不同时间多次启动时，来源保持一致，是附带的好处。

- **D26-04（LC-4）赞成。**
  - 理由：在“无 pending、无 ext 指向”的前提下，`draft` 行没有其他外键指向它，物理删除能成功；目录与 `draftReferences` 随之一致。
  - 回写提示（非反例）：`lab_propose_experiment` 写入的 `plan` 附件 JSON 里带着 `draft: DraftId`（`tools.ts:123-124`；`D12-lab-wire.md:164`）。丢弃之后，这个附件仍引用已删除的草稿，而 `D12-coverage.md:362` 的 `plan.runId` 映射只写了“目录草稿 / 已绑定运行”两种情况。附件属于转录历史，保留引用与“丢弃即删除”并不冲突，标题和步骤仍从附件本身渲染，所以不构成主路径失效。建议回写时在 coverage:362/364 补上“目录中找不到 = 已丢弃”这一种呈现。

- **D26-05（LC-5）赞成。**
  - 理由：同一事务先删 pending、再删 draft，满足 `pending_launch` 外键（`schema.ts:102`），也给 `awaiting_approval` 提供了唯一出口，释放会话主键。
  - divergent 复核：“只撤回、保留草稿”的诉求已经由 LC-2 覆盖（不用撤回也能改），因此不需要另设 withdraw。审批人没有拒绝命令（F9），这是既有契约的现状，本行没有让它变得更差。
  - 回写提示：同 D26-04 的 `plan` 附件呈现。

- **D26-06（LC-6）赞成。**
  - 理由：投递后拒绝丢弃，保证 `run_started` 绑定时一定能读到草稿（否则会触发 `experiments.ts:45` 的“missing draft”抛错路径），也保证 `experiment_ext.draft` 外键（`schema.ts:116`）一直成立。
  - 代价表述需要更正：“一直留在目录中”实际是作为运行的来源草稿出现在目录里，不是一条独立的未绑定草稿项（`catalog.ts:142-145` 会跳过已绑定草稿）。这处表述不影响本行主案。

