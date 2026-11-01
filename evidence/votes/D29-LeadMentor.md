# D29 选票：LeadMentor

议程：Pepgent#20 LAB-07b：agent 所属 Lab、讨论首步槽位挂载与槽位变化通知（SO-1 至 SO-4）（[Pepgent/PM#48](https://github.com/Pepgent/PM/issues/48)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D29-01 v1：赞成（LeadMentor-2，2026-11-01T17:36:10.167Z）


**分类意见：** 串联

# D29 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/48
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D29-01 至 D29-04，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D29-01 / SO-1 | 赞成 | 串联 | agent 的声明与代的实际清单由 Mux 维护，Lab→Mux 实例配置由 Lab 层维护；按所属实例判 Lab，不要求一个尚未开始的运行或槽位充当 agent 归属源。D18-05 已决定一 Lab 一 soroi/Mux 实例，本行使首步、中心 worker 和停驻 agent 的代理权限遵循该实际边界，不向 soroi/Mux 塞入 Lab 字段。只搜索调用者已具成员资格的 Lab 实例，原成员授权语义保留。 |
| D29-02 / SO-2 | 赞成 | 串联 | D7-06 明确允许无 pending 的正式 eval；在首次提交前出现 Human 槽位是正常主路径，不能假造一个运行或 pending 才能展示。本行补到真实 DiscussionHeaderWire.conversation.slots，沿用已有字段与按会话介入身份，且明确不重复携带、同步改注释，消除现挂载表与注释的缺格/张力。 |
| D29-03 / SO-3 | 赞成 | 串联 | store 只在提交时记录调用，不能提供提交前 awaiting_human 的变化通知；writer/slot 端点才是当前在途状态的源。订阅期由 Lab 按现有 writers→slots 链读取并比较，既覆盖 Lab 不持有 stdout 的 worker，也不另改控制协议。比较样本仅用于发现变化，不充当目录/page 读取源；周期读取以内层浏览器订阅存在为开始/结束条件，停驻会话不唤醒，间隔留作实现参数。此处不是为读取观感添加第二权威，而是明确通知源所必需的前次观察。 |
| D29-04 / SO-4 | 赞成 | 串联 | 按真实挂载位置选择现有失效频道，与读取消费者逐项对应：运行→run，pending 或 Discussion 头→catalog，Panel/Automation 头→conversation。没有运行时不发虚假 run 事件，不新增 slots 频道或 LabChange variant；代价是首步目录重读，条目已写明。 |

四票逐行独立，无互为条件的整包票。本席未发现需要投反对票的可复现主路径失效反例，没有行使专责否决或追加生效条件。没有 arbitration.request，本票不是 D1-17 分类终局裁定。

## 直接核对的依据

- 当前 issue 四行 v1；council queue 已将新到 P0 D29 排在 P1 D28 之前，本席遵从队首准入。
- PM/evidence/decisions/D18-product-opus-contracts.md:11（D18-05 完整正文）：Lab 是多租户层，每 Lab 独立 soroi/Mux，soroi 不含 Lab 字段。
- D19-sor13-control-contract.md:29-33（完整）：封闭 method 联合、writers/slots 的真实会话寻址、首步介入、当前挂载与介入身份。
- D7-lab-backend.md:66、68：无 pending 也可正式运行；Lab 持有在线根会话、在途读取与既有变更源。
- D12-lab-wire.md:36、149-151、270-273、543/548-549、573-578：挂载、头字段与注释、agents 成员授权、各频道真实失效消费者。源文件有行号漂移，以读到的符号及正文定位，不只按议程旧行号推定。
- D3-network-mux.md D3-15：agent 项与 generation 分层生命周期、在线列表及事件由 Mux 持有。
- pepgent-20-gate-a.md 与 gate-b.md：已批准 agentId 的实现缺口不重投，未定公开挂载/归属/通知需要 P0；不把 W-07 修复变成 W-09 全席合入等待锁。

## 边界

按本次要求只评审正常主路径，不设计失败、超时、竞态或恢复，不扩大到 Mux 新字段、身份碰撞机制、推送协议或额外探针。支持上游实现缺口由其拥有方修复、相邻 main 开发期异步接缝金丝雀继续执行，但不将这些检查变成本行之外的开工条件。

本席未编写工程代码、未运行编译/测试/runtime、未使用 hash 验证；不声称代理流、Human 交回或刷新已在本次亲测通过。实现与消费方回写仍需按最终逐行结果完成，不能以本票代替实现或阶段 C 验收。归档由 daemon 完成。


## D29-02 v1：赞成（LeadMentor-2，2026-11-01T17:36:10.167Z）


**分类意见：** 串联

# D29 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/48
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D29-01 至 D29-04，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D29-01 / SO-1 | 赞成 | 串联 | agent 的声明与代的实际清单由 Mux 维护，Lab→Mux 实例配置由 Lab 层维护；按所属实例判 Lab，不要求一个尚未开始的运行或槽位充当 agent 归属源。D18-05 已决定一 Lab 一 soroi/Mux 实例，本行使首步、中心 worker 和停驻 agent 的代理权限遵循该实际边界，不向 soroi/Mux 塞入 Lab 字段。只搜索调用者已具成员资格的 Lab 实例，原成员授权语义保留。 |
| D29-02 / SO-2 | 赞成 | 串联 | D7-06 明确允许无 pending 的正式 eval；在首次提交前出现 Human 槽位是正常主路径，不能假造一个运行或 pending 才能展示。本行补到真实 DiscussionHeaderWire.conversation.slots，沿用已有字段与按会话介入身份，且明确不重复携带、同步改注释，消除现挂载表与注释的缺格/张力。 |
| D29-03 / SO-3 | 赞成 | 串联 | store 只在提交时记录调用，不能提供提交前 awaiting_human 的变化通知；writer/slot 端点才是当前在途状态的源。订阅期由 Lab 按现有 writers→slots 链读取并比较，既覆盖 Lab 不持有 stdout 的 worker，也不另改控制协议。比较样本仅用于发现变化，不充当目录/page 读取源；周期读取以内层浏览器订阅存在为开始/结束条件，停驻会话不唤醒，间隔留作实现参数。此处不是为读取观感添加第二权威，而是明确通知源所必需的前次观察。 |
| D29-04 / SO-4 | 赞成 | 串联 | 按真实挂载位置选择现有失效频道，与读取消费者逐项对应：运行→run，pending 或 Discussion 头→catalog，Panel/Automation 头→conversation。没有运行时不发虚假 run 事件，不新增 slots 频道或 LabChange variant；代价是首步目录重读，条目已写明。 |

四票逐行独立，无互为条件的整包票。本席未发现需要投反对票的可复现主路径失效反例，没有行使专责否决或追加生效条件。没有 arbitration.request，本票不是 D1-17 分类终局裁定。

## 直接核对的依据

- 当前 issue 四行 v1；council queue 已将新到 P0 D29 排在 P1 D28 之前，本席遵从队首准入。
- PM/evidence/decisions/D18-product-opus-contracts.md:11（D18-05 完整正文）：Lab 是多租户层，每 Lab 独立 soroi/Mux，soroi 不含 Lab 字段。
- D19-sor13-control-contract.md:29-33（完整）：封闭 method 联合、writers/slots 的真实会话寻址、首步介入、当前挂载与介入身份。
- D7-lab-backend.md:66、68：无 pending 也可正式运行；Lab 持有在线根会话、在途读取与既有变更源。
- D12-lab-wire.md:36、149-151、270-273、543/548-549、573-578：挂载、头字段与注释、agents 成员授权、各频道真实失效消费者。源文件有行号漂移，以读到的符号及正文定位，不只按议程旧行号推定。
- D3-network-mux.md D3-15：agent 项与 generation 分层生命周期、在线列表及事件由 Mux 持有。
- pepgent-20-gate-a.md 与 gate-b.md：已批准 agentId 的实现缺口不重投，未定公开挂载/归属/通知需要 P0；不把 W-07 修复变成 W-09 全席合入等待锁。

## 边界

按本次要求只评审正常主路径，不设计失败、超时、竞态或恢复，不扩大到 Mux 新字段、身份碰撞机制、推送协议或额外探针。支持上游实现缺口由其拥有方修复、相邻 main 开发期异步接缝金丝雀继续执行，但不将这些检查变成本行之外的开工条件。

本席未编写工程代码、未运行编译/测试/runtime、未使用 hash 验证；不声称代理流、Human 交回或刷新已在本次亲测通过。实现与消费方回写仍需按最终逐行结果完成，不能以本票代替实现或阶段 C 验收。归档由 daemon 完成。


## D29-03 v1：赞成（LeadMentor-2，2026-11-01T17:36:10.167Z）


**分类意见：** 串联

# D29 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/48
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D29-01 至 D29-04，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D29-01 / SO-1 | 赞成 | 串联 | agent 的声明与代的实际清单由 Mux 维护，Lab→Mux 实例配置由 Lab 层维护；按所属实例判 Lab，不要求一个尚未开始的运行或槽位充当 agent 归属源。D18-05 已决定一 Lab 一 soroi/Mux 实例，本行使首步、中心 worker 和停驻 agent 的代理权限遵循该实际边界，不向 soroi/Mux 塞入 Lab 字段。只搜索调用者已具成员资格的 Lab 实例，原成员授权语义保留。 |
| D29-02 / SO-2 | 赞成 | 串联 | D7-06 明确允许无 pending 的正式 eval；在首次提交前出现 Human 槽位是正常主路径，不能假造一个运行或 pending 才能展示。本行补到真实 DiscussionHeaderWire.conversation.slots，沿用已有字段与按会话介入身份，且明确不重复携带、同步改注释，消除现挂载表与注释的缺格/张力。 |
| D29-03 / SO-3 | 赞成 | 串联 | store 只在提交时记录调用，不能提供提交前 awaiting_human 的变化通知；writer/slot 端点才是当前在途状态的源。订阅期由 Lab 按现有 writers→slots 链读取并比较，既覆盖 Lab 不持有 stdout 的 worker，也不另改控制协议。比较样本仅用于发现变化，不充当目录/page 读取源；周期读取以内层浏览器订阅存在为开始/结束条件，停驻会话不唤醒，间隔留作实现参数。此处不是为读取观感添加第二权威，而是明确通知源所必需的前次观察。 |
| D29-04 / SO-4 | 赞成 | 串联 | 按真实挂载位置选择现有失效频道，与读取消费者逐项对应：运行→run，pending 或 Discussion 头→catalog，Panel/Automation 头→conversation。没有运行时不发虚假 run 事件，不新增 slots 频道或 LabChange variant；代价是首步目录重读，条目已写明。 |

四票逐行独立，无互为条件的整包票。本席未发现需要投反对票的可复现主路径失效反例，没有行使专责否决或追加生效条件。没有 arbitration.request，本票不是 D1-17 分类终局裁定。

## 直接核对的依据

- 当前 issue 四行 v1；council queue 已将新到 P0 D29 排在 P1 D28 之前，本席遵从队首准入。
- PM/evidence/decisions/D18-product-opus-contracts.md:11（D18-05 完整正文）：Lab 是多租户层，每 Lab 独立 soroi/Mux，soroi 不含 Lab 字段。
- D19-sor13-control-contract.md:29-33（完整）：封闭 method 联合、writers/slots 的真实会话寻址、首步介入、当前挂载与介入身份。
- D7-lab-backend.md:66、68：无 pending 也可正式运行；Lab 持有在线根会话、在途读取与既有变更源。
- D12-lab-wire.md:36、149-151、270-273、543/548-549、573-578：挂载、头字段与注释、agents 成员授权、各频道真实失效消费者。源文件有行号漂移，以读到的符号及正文定位，不只按议程旧行号推定。
- D3-network-mux.md D3-15：agent 项与 generation 分层生命周期、在线列表及事件由 Mux 持有。
- pepgent-20-gate-a.md 与 gate-b.md：已批准 agentId 的实现缺口不重投，未定公开挂载/归属/通知需要 P0；不把 W-07 修复变成 W-09 全席合入等待锁。

## 边界

按本次要求只评审正常主路径，不设计失败、超时、竞态或恢复，不扩大到 Mux 新字段、身份碰撞机制、推送协议或额外探针。支持上游实现缺口由其拥有方修复、相邻 main 开发期异步接缝金丝雀继续执行，但不将这些检查变成本行之外的开工条件。

本席未编写工程代码、未运行编译/测试/runtime、未使用 hash 验证；不声称代理流、Human 交回或刷新已在本次亲测通过。实现与消费方回写仍需按最终逐行结果完成，不能以本票代替实现或阶段 C 验收。归档由 daemon 完成。


## D29-04 v1：赞成（LeadMentor-2，2026-11-01T17:36:10.167Z）


**分类意见：** 串联

# D29 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/48
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D29-01 至 D29-04，均为 v1。

| 条目 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D29-01 / SO-1 | 赞成 | 串联 | agent 的声明与代的实际清单由 Mux 维护，Lab→Mux 实例配置由 Lab 层维护；按所属实例判 Lab，不要求一个尚未开始的运行或槽位充当 agent 归属源。D18-05 已决定一 Lab 一 soroi/Mux 实例，本行使首步、中心 worker 和停驻 agent 的代理权限遵循该实际边界，不向 soroi/Mux 塞入 Lab 字段。只搜索调用者已具成员资格的 Lab 实例，原成员授权语义保留。 |
| D29-02 / SO-2 | 赞成 | 串联 | D7-06 明确允许无 pending 的正式 eval；在首次提交前出现 Human 槽位是正常主路径，不能假造一个运行或 pending 才能展示。本行补到真实 DiscussionHeaderWire.conversation.slots，沿用已有字段与按会话介入身份，且明确不重复携带、同步改注释，消除现挂载表与注释的缺格/张力。 |
| D29-03 / SO-3 | 赞成 | 串联 | store 只在提交时记录调用，不能提供提交前 awaiting_human 的变化通知；writer/slot 端点才是当前在途状态的源。订阅期由 Lab 按现有 writers→slots 链读取并比较，既覆盖 Lab 不持有 stdout 的 worker，也不另改控制协议。比较样本仅用于发现变化，不充当目录/page 读取源；周期读取以内层浏览器订阅存在为开始/结束条件，停驻会话不唤醒，间隔留作实现参数。此处不是为读取观感添加第二权威，而是明确通知源所必需的前次观察。 |
| D29-04 / SO-4 | 赞成 | 串联 | 按真实挂载位置选择现有失效频道，与读取消费者逐项对应：运行→run，pending 或 Discussion 头→catalog，Panel/Automation 头→conversation。没有运行时不发虚假 run 事件，不新增 slots 频道或 LabChange variant；代价是首步目录重读，条目已写明。 |

四票逐行独立，无互为条件的整包票。本席未发现需要投反对票的可复现主路径失效反例，没有行使专责否决或追加生效条件。没有 arbitration.request，本票不是 D1-17 分类终局裁定。

## 直接核对的依据

- 当前 issue 四行 v1；council queue 已将新到 P0 D29 排在 P1 D28 之前，本席遵从队首准入。
- PM/evidence/decisions/D18-product-opus-contracts.md:11（D18-05 完整正文）：Lab 是多租户层，每 Lab 独立 soroi/Mux，soroi 不含 Lab 字段。
- D19-sor13-control-contract.md:29-33（完整）：封闭 method 联合、writers/slots 的真实会话寻址、首步介入、当前挂载与介入身份。
- D7-lab-backend.md:66、68：无 pending 也可正式运行；Lab 持有在线根会话、在途读取与既有变更源。
- D12-lab-wire.md:36、149-151、270-273、543/548-549、573-578：挂载、头字段与注释、agents 成员授权、各频道真实失效消费者。源文件有行号漂移，以读到的符号及正文定位，不只按议程旧行号推定。
- D3-network-mux.md D3-15：agent 项与 generation 分层生命周期、在线列表及事件由 Mux 持有。
- pepgent-20-gate-a.md 与 gate-b.md：已批准 agentId 的实现缺口不重投，未定公开挂载/归属/通知需要 P0；不把 W-07 修复变成 W-09 全席合入等待锁。

## 边界

按本次要求只评审正常主路径，不设计失败、超时、竞态或恢复，不扩大到 Mux 新字段、身份碰撞机制、推送协议或额外探针。支持上游实现缺口由其拥有方修复、相邻 main 开发期异步接缝金丝雀继续执行，但不将这些检查变成本行之外的开工条件。

本席未编写工程代码、未运行编译/测试/runtime、未使用 hash 验证；不声称代理流、Human 交回或刷新已在本次亲测通过。实现与消费方回写仍需按最终逐行结果完成，不能以本票代替实现或阶段 C 验收。归档由 daemon 完成。

