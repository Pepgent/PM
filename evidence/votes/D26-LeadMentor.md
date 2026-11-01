# D26 选票：LeadMentor

议程：Pepgent#18 LAB-11b：草稿与启动意图的生命周期（LC-1 至 LC-6）（[PM#43](https://github.com/Pepgent/PM/issues/43)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D26-01 v1：赞成（LeadMentor-2，2026-11-01T17:24:55.525Z）


**分类意见：** 串联

# D26 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/43
席位：LeadMentor；在席实例：LeadMentor-2。
版本：D26-01 至 D26-06，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D26-01 / LC-1 | 赞成 | 串联 | 批准时读取当前 canvas 并按既定人类消息队列投递，给出了此前未定义的审批对象。Lab 的 draft 仍是画布唯一源；pending 只保留启动意图，不伪装成申请时版本快照，不增加第二内容源。沿用审批请求实际用户的 principal，不混同 approval 权限与 discussion.prompt 权限。新规则是当前内容选择，不是声称用户早已指定此选择。 |
| D26-02 / LC-2 | 赞成 | 串联 | awaiting_approval 仍处于草稿可编辑阶段，保存只更新同一草稿的 canvas、保存修订号和更新时间；pending 不变，状态没有被近处副本代管。与 LC-1 的批准时内容选择吻合，不需撤回—重建才能修改草稿，也不新增 base version、快照或并发控制。 |
| D26-03 / LC-3 | 赞成 | 串联 | sent 与已绑定两段覆盖从投递意图到来源关系的连续阶段：不允许再 save，来源草稿因此可准确表示此次发出的计划，而不是可事后改写的同 id 内容。state 判据来自 pending 与 experiment_ext，不增 draft.launched 标志。返回已存在的 revision_conflict 是本行明确表决的状态语义，不是从该错误码已经存在倒推出授权；失败时不改记录也不发虚假的 catalog。 |
| D26-04 / LC-4 | 赞成 | 串联 | 对无 pending、无运行引用的草稿，discard 就终结 Lab 自有草稿对象并发布 catalog；LAB-10 从 draft 表派生的引用随源对象消失，不另存软删除或维护第二份使用状态。不可恢复是明示取舍，不因习惯额外设计回收站。 |
| D26-05 / LC-5 | 赞成 | 串联 | 等待审批的启动意图是草稿的内层对象，丢弃时同时结束它与草稿，给出了 pending 在非运行启动路径上的明确结束锚点。与现有 pending→draft 外键相容：该意图不再引用被删除的草稿，讨论也不再被已丢弃意图占用。只想撤回但保留草稿并非本命令的能力，条目已明示这个代价，不伪称完整独立撤回功能。 |
| D26-06 / LC-6 | 赞成 | 串联 | sent 以后不再把 discard 当作尚未投递的撤回；pending 按既有非派生 run_started 主路径绑定到 experiment_ext，再结束。绑定后的草稿作为来源保留，与 LC-3 共同使来源的存在与内容一致。没有把 pending 的存在当成运行已开始，运行开始及状态仍由 store 确认，也未新增 Lab 的运行状态副本。 |

## 已核对的源头

1. 当前议程 issue 正文，逐行 what/where/how/取舍、六行 v1；council queue 确认本席队首 D26，tally 确认四资格席、逐行门槛三票。
2. PM/evidence/decisions/D7-lab-backend.md:66：pending 是意图而非运行状态，start/approve 与非派生 run_started 的原有绑定锚点。
3. PM/evidence/decisions/D12-lab-wire.md:152-156、265-268、470-473、511-512、557：draft/pending/ext wire、来源草稿、命令结果、权限与 catalog 义务。
4. 工人工作树 pepgent-lab-11b/apps/web/src/server/lab/schema.ts:78-116：draft 当前 canvas/保存修订号、pending 的 conversation 主键及 draft 外键、experiment_ext 的来源外键；experiments.ts:22-52：按 sent pending 绑定并移除意图，而非解析 agent 回报的 draft id。
5. 同工作树 protocol/errors.ts:37-46、80-91：revision_conflict 已存在于领域错误联合。
6. 本仓 design/layers.md 全文，特别 :42、:49-51、:65：草稿属于 Lab，正式运行状态来自 store，草稿引用与正式运行事实分别归其拥有方。
7. pepgent-18-gate-a.md、pepgent-18-gate-b.md：生命周期缺口需要逐行 P0；discard 的命令存在性、无 pending 未绑定时保存、完整草稿呈现及实际审批人 principal 不重复表决。

## 整体边界

六票各自独立，不是“其他五行通过才赞成”的组合票。本表不授权未入表备选。未发现需要提交反对票的可复现主路径失效反例，没有新增 veto、同步审批或验收条件。

分类均为串联、缺失设计补充：这些行决定 Lab/GUI/agent 之间正常启动路径的公开生命周期，不把“批准时当前内容”“绑定后只读”或“discard 撤回未发送意图”伪称用户逐字原意。没有 arbitration.request，本票不替代 D1-17 的终局仲裁。

本审查按指定范围只判断正常主路径，不设计超时、重试、恢复、竞态、并发控制或 sent 后不启动运行的处理；不扩大到 start 新状态表、审批拒绝命令或 store 读取准入机制。现有独立权限检查与主路径通知义务保留。

未改工程代码、未编写或运行测试、未运行 build/typecheck/runtime 探针，未使用 hash 验证。本票依据契约与源码静态核对，不声称 LAB-11b 已实现或用户路径已验证；公开正文及 WEB-04 等消费方仍按各行真实通过结果对齐，不以投票完成代替实现或验收。


## D26-02 v1：赞成（LeadMentor-2，2026-11-01T17:24:55.525Z）


**分类意见：** 串联

# D26 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/43
席位：LeadMentor；在席实例：LeadMentor-2。
版本：D26-01 至 D26-06，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D26-01 / LC-1 | 赞成 | 串联 | 批准时读取当前 canvas 并按既定人类消息队列投递，给出了此前未定义的审批对象。Lab 的 draft 仍是画布唯一源；pending 只保留启动意图，不伪装成申请时版本快照，不增加第二内容源。沿用审批请求实际用户的 principal，不混同 approval 权限与 discussion.prompt 权限。新规则是当前内容选择，不是声称用户早已指定此选择。 |
| D26-02 / LC-2 | 赞成 | 串联 | awaiting_approval 仍处于草稿可编辑阶段，保存只更新同一草稿的 canvas、保存修订号和更新时间；pending 不变，状态没有被近处副本代管。与 LC-1 的批准时内容选择吻合，不需撤回—重建才能修改草稿，也不新增 base version、快照或并发控制。 |
| D26-03 / LC-3 | 赞成 | 串联 | sent 与已绑定两段覆盖从投递意图到来源关系的连续阶段：不允许再 save，来源草稿因此可准确表示此次发出的计划，而不是可事后改写的同 id 内容。state 判据来自 pending 与 experiment_ext，不增 draft.launched 标志。返回已存在的 revision_conflict 是本行明确表决的状态语义，不是从该错误码已经存在倒推出授权；失败时不改记录也不发虚假的 catalog。 |
| D26-04 / LC-4 | 赞成 | 串联 | 对无 pending、无运行引用的草稿，discard 就终结 Lab 自有草稿对象并发布 catalog；LAB-10 从 draft 表派生的引用随源对象消失，不另存软删除或维护第二份使用状态。不可恢复是明示取舍，不因习惯额外设计回收站。 |
| D26-05 / LC-5 | 赞成 | 串联 | 等待审批的启动意图是草稿的内层对象，丢弃时同时结束它与草稿，给出了 pending 在非运行启动路径上的明确结束锚点。与现有 pending→draft 外键相容：该意图不再引用被删除的草稿，讨论也不再被已丢弃意图占用。只想撤回但保留草稿并非本命令的能力，条目已明示这个代价，不伪称完整独立撤回功能。 |
| D26-06 / LC-6 | 赞成 | 串联 | sent 以后不再把 discard 当作尚未投递的撤回；pending 按既有非派生 run_started 主路径绑定到 experiment_ext，再结束。绑定后的草稿作为来源保留，与 LC-3 共同使来源的存在与内容一致。没有把 pending 的存在当成运行已开始，运行开始及状态仍由 store 确认，也未新增 Lab 的运行状态副本。 |

## 已核对的源头

1. 当前议程 issue 正文，逐行 what/where/how/取舍、六行 v1；council queue 确认本席队首 D26，tally 确认四资格席、逐行门槛三票。
2. PM/evidence/decisions/D7-lab-backend.md:66：pending 是意图而非运行状态，start/approve 与非派生 run_started 的原有绑定锚点。
3. PM/evidence/decisions/D12-lab-wire.md:152-156、265-268、470-473、511-512、557：draft/pending/ext wire、来源草稿、命令结果、权限与 catalog 义务。
4. 工人工作树 pepgent-lab-11b/apps/web/src/server/lab/schema.ts:78-116：draft 当前 canvas/保存修订号、pending 的 conversation 主键及 draft 外键、experiment_ext 的来源外键；experiments.ts:22-52：按 sent pending 绑定并移除意图，而非解析 agent 回报的 draft id。
5. 同工作树 protocol/errors.ts:37-46、80-91：revision_conflict 已存在于领域错误联合。
6. 本仓 design/layers.md 全文，特别 :42、:49-51、:65：草稿属于 Lab，正式运行状态来自 store，草稿引用与正式运行事实分别归其拥有方。
7. pepgent-18-gate-a.md、pepgent-18-gate-b.md：生命周期缺口需要逐行 P0；discard 的命令存在性、无 pending 未绑定时保存、完整草稿呈现及实际审批人 principal 不重复表决。

## 整体边界

六票各自独立，不是“其他五行通过才赞成”的组合票。本表不授权未入表备选。未发现需要提交反对票的可复现主路径失效反例，没有新增 veto、同步审批或验收条件。

分类均为串联、缺失设计补充：这些行决定 Lab/GUI/agent 之间正常启动路径的公开生命周期，不把“批准时当前内容”“绑定后只读”或“discard 撤回未发送意图”伪称用户逐字原意。没有 arbitration.request，本票不替代 D1-17 的终局仲裁。

本审查按指定范围只判断正常主路径，不设计超时、重试、恢复、竞态、并发控制或 sent 后不启动运行的处理；不扩大到 start 新状态表、审批拒绝命令或 store 读取准入机制。现有独立权限检查与主路径通知义务保留。

未改工程代码、未编写或运行测试、未运行 build/typecheck/runtime 探针，未使用 hash 验证。本票依据契约与源码静态核对，不声称 LAB-11b 已实现或用户路径已验证；公开正文及 WEB-04 等消费方仍按各行真实通过结果对齐，不以投票完成代替实现或验收。


## D26-03 v1：赞成（LeadMentor-2，2026-11-01T17:24:55.525Z）


**分类意见：** 串联

# D26 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/43
席位：LeadMentor；在席实例：LeadMentor-2。
版本：D26-01 至 D26-06，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D26-01 / LC-1 | 赞成 | 串联 | 批准时读取当前 canvas 并按既定人类消息队列投递，给出了此前未定义的审批对象。Lab 的 draft 仍是画布唯一源；pending 只保留启动意图，不伪装成申请时版本快照，不增加第二内容源。沿用审批请求实际用户的 principal，不混同 approval 权限与 discussion.prompt 权限。新规则是当前内容选择，不是声称用户早已指定此选择。 |
| D26-02 / LC-2 | 赞成 | 串联 | awaiting_approval 仍处于草稿可编辑阶段，保存只更新同一草稿的 canvas、保存修订号和更新时间；pending 不变，状态没有被近处副本代管。与 LC-1 的批准时内容选择吻合，不需撤回—重建才能修改草稿，也不新增 base version、快照或并发控制。 |
| D26-03 / LC-3 | 赞成 | 串联 | sent 与已绑定两段覆盖从投递意图到来源关系的连续阶段：不允许再 save，来源草稿因此可准确表示此次发出的计划，而不是可事后改写的同 id 内容。state 判据来自 pending 与 experiment_ext，不增 draft.launched 标志。返回已存在的 revision_conflict 是本行明确表决的状态语义，不是从该错误码已经存在倒推出授权；失败时不改记录也不发虚假的 catalog。 |
| D26-04 / LC-4 | 赞成 | 串联 | 对无 pending、无运行引用的草稿，discard 就终结 Lab 自有草稿对象并发布 catalog；LAB-10 从 draft 表派生的引用随源对象消失，不另存软删除或维护第二份使用状态。不可恢复是明示取舍，不因习惯额外设计回收站。 |
| D26-05 / LC-5 | 赞成 | 串联 | 等待审批的启动意图是草稿的内层对象，丢弃时同时结束它与草稿，给出了 pending 在非运行启动路径上的明确结束锚点。与现有 pending→draft 外键相容：该意图不再引用被删除的草稿，讨论也不再被已丢弃意图占用。只想撤回但保留草稿并非本命令的能力，条目已明示这个代价，不伪称完整独立撤回功能。 |
| D26-06 / LC-6 | 赞成 | 串联 | sent 以后不再把 discard 当作尚未投递的撤回；pending 按既有非派生 run_started 主路径绑定到 experiment_ext，再结束。绑定后的草稿作为来源保留，与 LC-3 共同使来源的存在与内容一致。没有把 pending 的存在当成运行已开始，运行开始及状态仍由 store 确认，也未新增 Lab 的运行状态副本。 |

## 已核对的源头

1. 当前议程 issue 正文，逐行 what/where/how/取舍、六行 v1；council queue 确认本席队首 D26，tally 确认四资格席、逐行门槛三票。
2. PM/evidence/decisions/D7-lab-backend.md:66：pending 是意图而非运行状态，start/approve 与非派生 run_started 的原有绑定锚点。
3. PM/evidence/decisions/D12-lab-wire.md:152-156、265-268、470-473、511-512、557：draft/pending/ext wire、来源草稿、命令结果、权限与 catalog 义务。
4. 工人工作树 pepgent-lab-11b/apps/web/src/server/lab/schema.ts:78-116：draft 当前 canvas/保存修订号、pending 的 conversation 主键及 draft 外键、experiment_ext 的来源外键；experiments.ts:22-52：按 sent pending 绑定并移除意图，而非解析 agent 回报的 draft id。
5. 同工作树 protocol/errors.ts:37-46、80-91：revision_conflict 已存在于领域错误联合。
6. 本仓 design/layers.md 全文，特别 :42、:49-51、:65：草稿属于 Lab，正式运行状态来自 store，草稿引用与正式运行事实分别归其拥有方。
7. pepgent-18-gate-a.md、pepgent-18-gate-b.md：生命周期缺口需要逐行 P0；discard 的命令存在性、无 pending 未绑定时保存、完整草稿呈现及实际审批人 principal 不重复表决。

## 整体边界

六票各自独立，不是“其他五行通过才赞成”的组合票。本表不授权未入表备选。未发现需要提交反对票的可复现主路径失效反例，没有新增 veto、同步审批或验收条件。

分类均为串联、缺失设计补充：这些行决定 Lab/GUI/agent 之间正常启动路径的公开生命周期，不把“批准时当前内容”“绑定后只读”或“discard 撤回未发送意图”伪称用户逐字原意。没有 arbitration.request，本票不替代 D1-17 的终局仲裁。

本审查按指定范围只判断正常主路径，不设计超时、重试、恢复、竞态、并发控制或 sent 后不启动运行的处理；不扩大到 start 新状态表、审批拒绝命令或 store 读取准入机制。现有独立权限检查与主路径通知义务保留。

未改工程代码、未编写或运行测试、未运行 build/typecheck/runtime 探针，未使用 hash 验证。本票依据契约与源码静态核对，不声称 LAB-11b 已实现或用户路径已验证；公开正文及 WEB-04 等消费方仍按各行真实通过结果对齐，不以投票完成代替实现或验收。


## D26-04 v1：赞成（LeadMentor-2，2026-11-01T17:24:55.525Z）


**分类意见：** 串联

# D26 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/43
席位：LeadMentor；在席实例：LeadMentor-2。
版本：D26-01 至 D26-06，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D26-01 / LC-1 | 赞成 | 串联 | 批准时读取当前 canvas 并按既定人类消息队列投递，给出了此前未定义的审批对象。Lab 的 draft 仍是画布唯一源；pending 只保留启动意图，不伪装成申请时版本快照，不增加第二内容源。沿用审批请求实际用户的 principal，不混同 approval 权限与 discussion.prompt 权限。新规则是当前内容选择，不是声称用户早已指定此选择。 |
| D26-02 / LC-2 | 赞成 | 串联 | awaiting_approval 仍处于草稿可编辑阶段，保存只更新同一草稿的 canvas、保存修订号和更新时间；pending 不变，状态没有被近处副本代管。与 LC-1 的批准时内容选择吻合，不需撤回—重建才能修改草稿，也不新增 base version、快照或并发控制。 |
| D26-03 / LC-3 | 赞成 | 串联 | sent 与已绑定两段覆盖从投递意图到来源关系的连续阶段：不允许再 save，来源草稿因此可准确表示此次发出的计划，而不是可事后改写的同 id 内容。state 判据来自 pending 与 experiment_ext，不增 draft.launched 标志。返回已存在的 revision_conflict 是本行明确表决的状态语义，不是从该错误码已经存在倒推出授权；失败时不改记录也不发虚假的 catalog。 |
| D26-04 / LC-4 | 赞成 | 串联 | 对无 pending、无运行引用的草稿，discard 就终结 Lab 自有草稿对象并发布 catalog；LAB-10 从 draft 表派生的引用随源对象消失，不另存软删除或维护第二份使用状态。不可恢复是明示取舍，不因习惯额外设计回收站。 |
| D26-05 / LC-5 | 赞成 | 串联 | 等待审批的启动意图是草稿的内层对象，丢弃时同时结束它与草稿，给出了 pending 在非运行启动路径上的明确结束锚点。与现有 pending→draft 外键相容：该意图不再引用被删除的草稿，讨论也不再被已丢弃意图占用。只想撤回但保留草稿并非本命令的能力，条目已明示这个代价，不伪称完整独立撤回功能。 |
| D26-06 / LC-6 | 赞成 | 串联 | sent 以后不再把 discard 当作尚未投递的撤回；pending 按既有非派生 run_started 主路径绑定到 experiment_ext，再结束。绑定后的草稿作为来源保留，与 LC-3 共同使来源的存在与内容一致。没有把 pending 的存在当成运行已开始，运行开始及状态仍由 store 确认，也未新增 Lab 的运行状态副本。 |

## 已核对的源头

1. 当前议程 issue 正文，逐行 what/where/how/取舍、六行 v1；council queue 确认本席队首 D26，tally 确认四资格席、逐行门槛三票。
2. PM/evidence/decisions/D7-lab-backend.md:66：pending 是意图而非运行状态，start/approve 与非派生 run_started 的原有绑定锚点。
3. PM/evidence/decisions/D12-lab-wire.md:152-156、265-268、470-473、511-512、557：draft/pending/ext wire、来源草稿、命令结果、权限与 catalog 义务。
4. 工人工作树 pepgent-lab-11b/apps/web/src/server/lab/schema.ts:78-116：draft 当前 canvas/保存修订号、pending 的 conversation 主键及 draft 外键、experiment_ext 的来源外键；experiments.ts:22-52：按 sent pending 绑定并移除意图，而非解析 agent 回报的 draft id。
5. 同工作树 protocol/errors.ts:37-46、80-91：revision_conflict 已存在于领域错误联合。
6. 本仓 design/layers.md 全文，特别 :42、:49-51、:65：草稿属于 Lab，正式运行状态来自 store，草稿引用与正式运行事实分别归其拥有方。
7. pepgent-18-gate-a.md、pepgent-18-gate-b.md：生命周期缺口需要逐行 P0；discard 的命令存在性、无 pending 未绑定时保存、完整草稿呈现及实际审批人 principal 不重复表决。

## 整体边界

六票各自独立，不是“其他五行通过才赞成”的组合票。本表不授权未入表备选。未发现需要提交反对票的可复现主路径失效反例，没有新增 veto、同步审批或验收条件。

分类均为串联、缺失设计补充：这些行决定 Lab/GUI/agent 之间正常启动路径的公开生命周期，不把“批准时当前内容”“绑定后只读”或“discard 撤回未发送意图”伪称用户逐字原意。没有 arbitration.request，本票不替代 D1-17 的终局仲裁。

本审查按指定范围只判断正常主路径，不设计超时、重试、恢复、竞态、并发控制或 sent 后不启动运行的处理；不扩大到 start 新状态表、审批拒绝命令或 store 读取准入机制。现有独立权限检查与主路径通知义务保留。

未改工程代码、未编写或运行测试、未运行 build/typecheck/runtime 探针，未使用 hash 验证。本票依据契约与源码静态核对，不声称 LAB-11b 已实现或用户路径已验证；公开正文及 WEB-04 等消费方仍按各行真实通过结果对齐，不以投票完成代替实现或验收。


## D26-05 v1：赞成（LeadMentor-2，2026-11-01T17:24:55.525Z）


**分类意见：** 串联

# D26 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/43
席位：LeadMentor；在席实例：LeadMentor-2。
版本：D26-01 至 D26-06，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D26-01 / LC-1 | 赞成 | 串联 | 批准时读取当前 canvas 并按既定人类消息队列投递，给出了此前未定义的审批对象。Lab 的 draft 仍是画布唯一源；pending 只保留启动意图，不伪装成申请时版本快照，不增加第二内容源。沿用审批请求实际用户的 principal，不混同 approval 权限与 discussion.prompt 权限。新规则是当前内容选择，不是声称用户早已指定此选择。 |
| D26-02 / LC-2 | 赞成 | 串联 | awaiting_approval 仍处于草稿可编辑阶段，保存只更新同一草稿的 canvas、保存修订号和更新时间；pending 不变，状态没有被近处副本代管。与 LC-1 的批准时内容选择吻合，不需撤回—重建才能修改草稿，也不新增 base version、快照或并发控制。 |
| D26-03 / LC-3 | 赞成 | 串联 | sent 与已绑定两段覆盖从投递意图到来源关系的连续阶段：不允许再 save，来源草稿因此可准确表示此次发出的计划，而不是可事后改写的同 id 内容。state 判据来自 pending 与 experiment_ext，不增 draft.launched 标志。返回已存在的 revision_conflict 是本行明确表决的状态语义，不是从该错误码已经存在倒推出授权；失败时不改记录也不发虚假的 catalog。 |
| D26-04 / LC-4 | 赞成 | 串联 | 对无 pending、无运行引用的草稿，discard 就终结 Lab 自有草稿对象并发布 catalog；LAB-10 从 draft 表派生的引用随源对象消失，不另存软删除或维护第二份使用状态。不可恢复是明示取舍，不因习惯额外设计回收站。 |
| D26-05 / LC-5 | 赞成 | 串联 | 等待审批的启动意图是草稿的内层对象，丢弃时同时结束它与草稿，给出了 pending 在非运行启动路径上的明确结束锚点。与现有 pending→draft 外键相容：该意图不再引用被删除的草稿，讨论也不再被已丢弃意图占用。只想撤回但保留草稿并非本命令的能力，条目已明示这个代价，不伪称完整独立撤回功能。 |
| D26-06 / LC-6 | 赞成 | 串联 | sent 以后不再把 discard 当作尚未投递的撤回；pending 按既有非派生 run_started 主路径绑定到 experiment_ext，再结束。绑定后的草稿作为来源保留，与 LC-3 共同使来源的存在与内容一致。没有把 pending 的存在当成运行已开始，运行开始及状态仍由 store 确认，也未新增 Lab 的运行状态副本。 |

## 已核对的源头

1. 当前议程 issue 正文，逐行 what/where/how/取舍、六行 v1；council queue 确认本席队首 D26，tally 确认四资格席、逐行门槛三票。
2. PM/evidence/decisions/D7-lab-backend.md:66：pending 是意图而非运行状态，start/approve 与非派生 run_started 的原有绑定锚点。
3. PM/evidence/decisions/D12-lab-wire.md:152-156、265-268、470-473、511-512、557：draft/pending/ext wire、来源草稿、命令结果、权限与 catalog 义务。
4. 工人工作树 pepgent-lab-11b/apps/web/src/server/lab/schema.ts:78-116：draft 当前 canvas/保存修订号、pending 的 conversation 主键及 draft 外键、experiment_ext 的来源外键；experiments.ts:22-52：按 sent pending 绑定并移除意图，而非解析 agent 回报的 draft id。
5. 同工作树 protocol/errors.ts:37-46、80-91：revision_conflict 已存在于领域错误联合。
6. 本仓 design/layers.md 全文，特别 :42、:49-51、:65：草稿属于 Lab，正式运行状态来自 store，草稿引用与正式运行事实分别归其拥有方。
7. pepgent-18-gate-a.md、pepgent-18-gate-b.md：生命周期缺口需要逐行 P0；discard 的命令存在性、无 pending 未绑定时保存、完整草稿呈现及实际审批人 principal 不重复表决。

## 整体边界

六票各自独立，不是“其他五行通过才赞成”的组合票。本表不授权未入表备选。未发现需要提交反对票的可复现主路径失效反例，没有新增 veto、同步审批或验收条件。

分类均为串联、缺失设计补充：这些行决定 Lab/GUI/agent 之间正常启动路径的公开生命周期，不把“批准时当前内容”“绑定后只读”或“discard 撤回未发送意图”伪称用户逐字原意。没有 arbitration.request，本票不替代 D1-17 的终局仲裁。

本审查按指定范围只判断正常主路径，不设计超时、重试、恢复、竞态、并发控制或 sent 后不启动运行的处理；不扩大到 start 新状态表、审批拒绝命令或 store 读取准入机制。现有独立权限检查与主路径通知义务保留。

未改工程代码、未编写或运行测试、未运行 build/typecheck/runtime 探针，未使用 hash 验证。本票依据契约与源码静态核对，不声称 LAB-11b 已实现或用户路径已验证；公开正文及 WEB-04 等消费方仍按各行真实通过结果对齐，不以投票完成代替实现或验收。


## D26-06 v1：赞成（LeadMentor-2，2026-11-01T17:24:55.525Z）


**分类意见：** 串联

# D26 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/43
席位：LeadMentor；在席实例：LeadMentor-2。
版本：D26-01 至 D26-06，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D26-01 / LC-1 | 赞成 | 串联 | 批准时读取当前 canvas 并按既定人类消息队列投递，给出了此前未定义的审批对象。Lab 的 draft 仍是画布唯一源；pending 只保留启动意图，不伪装成申请时版本快照，不增加第二内容源。沿用审批请求实际用户的 principal，不混同 approval 权限与 discussion.prompt 权限。新规则是当前内容选择，不是声称用户早已指定此选择。 |
| D26-02 / LC-2 | 赞成 | 串联 | awaiting_approval 仍处于草稿可编辑阶段，保存只更新同一草稿的 canvas、保存修订号和更新时间；pending 不变，状态没有被近处副本代管。与 LC-1 的批准时内容选择吻合，不需撤回—重建才能修改草稿，也不新增 base version、快照或并发控制。 |
| D26-03 / LC-3 | 赞成 | 串联 | sent 与已绑定两段覆盖从投递意图到来源关系的连续阶段：不允许再 save，来源草稿因此可准确表示此次发出的计划，而不是可事后改写的同 id 内容。state 判据来自 pending 与 experiment_ext，不增 draft.launched 标志。返回已存在的 revision_conflict 是本行明确表决的状态语义，不是从该错误码已经存在倒推出授权；失败时不改记录也不发虚假的 catalog。 |
| D26-04 / LC-4 | 赞成 | 串联 | 对无 pending、无运行引用的草稿，discard 就终结 Lab 自有草稿对象并发布 catalog；LAB-10 从 draft 表派生的引用随源对象消失，不另存软删除或维护第二份使用状态。不可恢复是明示取舍，不因习惯额外设计回收站。 |
| D26-05 / LC-5 | 赞成 | 串联 | 等待审批的启动意图是草稿的内层对象，丢弃时同时结束它与草稿，给出了 pending 在非运行启动路径上的明确结束锚点。与现有 pending→draft 外键相容：该意图不再引用被删除的草稿，讨论也不再被已丢弃意图占用。只想撤回但保留草稿并非本命令的能力，条目已明示这个代价，不伪称完整独立撤回功能。 |
| D26-06 / LC-6 | 赞成 | 串联 | sent 以后不再把 discard 当作尚未投递的撤回；pending 按既有非派生 run_started 主路径绑定到 experiment_ext，再结束。绑定后的草稿作为来源保留，与 LC-3 共同使来源的存在与内容一致。没有把 pending 的存在当成运行已开始，运行开始及状态仍由 store 确认，也未新增 Lab 的运行状态副本。 |

## 已核对的源头

1. 当前议程 issue 正文，逐行 what/where/how/取舍、六行 v1；council queue 确认本席队首 D26，tally 确认四资格席、逐行门槛三票。
2. PM/evidence/decisions/D7-lab-backend.md:66：pending 是意图而非运行状态，start/approve 与非派生 run_started 的原有绑定锚点。
3. PM/evidence/decisions/D12-lab-wire.md:152-156、265-268、470-473、511-512、557：draft/pending/ext wire、来源草稿、命令结果、权限与 catalog 义务。
4. 工人工作树 pepgent-lab-11b/apps/web/src/server/lab/schema.ts:78-116：draft 当前 canvas/保存修订号、pending 的 conversation 主键及 draft 外键、experiment_ext 的来源外键；experiments.ts:22-52：按 sent pending 绑定并移除意图，而非解析 agent 回报的 draft id。
5. 同工作树 protocol/errors.ts:37-46、80-91：revision_conflict 已存在于领域错误联合。
6. 本仓 design/layers.md 全文，特别 :42、:49-51、:65：草稿属于 Lab，正式运行状态来自 store，草稿引用与正式运行事实分别归其拥有方。
7. pepgent-18-gate-a.md、pepgent-18-gate-b.md：生命周期缺口需要逐行 P0；discard 的命令存在性、无 pending 未绑定时保存、完整草稿呈现及实际审批人 principal 不重复表决。

## 整体边界

六票各自独立，不是“其他五行通过才赞成”的组合票。本表不授权未入表备选。未发现需要提交反对票的可复现主路径失效反例，没有新增 veto、同步审批或验收条件。

分类均为串联、缺失设计补充：这些行决定 Lab/GUI/agent 之间正常启动路径的公开生命周期，不把“批准时当前内容”“绑定后只读”或“discard 撤回未发送意图”伪称用户逐字原意。没有 arbitration.request，本票不替代 D1-17 的终局仲裁。

本审查按指定范围只判断正常主路径，不设计超时、重试、恢复、竞态、并发控制或 sent 后不启动运行的处理；不扩大到 start 新状态表、审批拒绝命令或 store 读取准入机制。现有独立权限检查与主路径通知义务保留。

未改工程代码、未编写或运行测试、未运行 build/typecheck/runtime 探针，未使用 hash 验证。本票依据契约与源码静态核对，不声称 LAB-11b 已实现或用户路径已验证；公开正文及 WEB-04 等消费方仍按各行真实通过结果对齐，不以投票完成代替实现或验收。

