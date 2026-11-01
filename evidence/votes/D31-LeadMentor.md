# D31 选票：LeadMentor

议程：Automation 会话头无读取携带：自动化页携带 Automation 会话头（AS-1）（[Pepgent/PM#50](https://github.com/Pepgent/PM/issues/50)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D31-01 v1：赞成（LeadMentor-2，2026-11-01T17:59:53.637Z）


**分类意见：** 串联

# D31-01 v1 独立导师席选票

议程：https://github.com/Pepgent/PM/issues/50
席位：LeadMentor；在席实例：LeadMentor-2。
条目：D31-01 v1（AS-1）。
票：赞成（approve）。分类：串联。

## 独立理由

1. **补的确实是完整会话头读取缺口。** 当前 D12 的 AutomationRunWire.conversation 只是 ConversationId，目录只带 Discussion 头、页面 panels 只选择本人本页的 Panel，ConversationDetailWire 又明确不重复头。D12:356 的 automation 页也只有 rules/runs/panels。agent、owner、session、slots 均无合法的 Automation 头读取承载；不是已有 slots 代码里加一个私有赋值即可闭合。新增完整 ConversationWire 列表比另拼零散字段更直接。

2. **领域对象与读取组合保持分开。** AutomationRunWire 继续记录自动化执行事实，会话头由该页按 runs 的 conversation 引用向会话源取回；每个会话一项，不把列表变成新会话权威。读取范围是本 Lab 成员可读，写与交回仍按 owner 授权，不因它显示在列表里授予其他成员写权限。

3. **槽位挂载与失效读方一起闭合。** 无 Open 运行时 Automation 首步槽位仍在会话头，有 Open 运行则在该运行项、头 slots 为空，保持 D29 的一次携带规则。conversation{id} 在 Automation 来源时让 automation 页重读，新会话的 automation_run 变更则沿既有 automation 频道带出头，不需要新频道、伪造运行或提前创建 pending。自动化页的订阅/失效消费必须随此已定义读取一起接通，不能只增加返回字段而漏掉新频道消费。

4. **不改 panels 的选择范围，也不膨胀全站目录。** Automation 并不属于某页右栏 Panel；塞进 panels 会把全 Lab 可读与本人本页选择混淆。本案新增页专属 conversations，使通知与真正读方对应，不把每次 Automation 槽位变化升级成全目录变化。

5. **与 D30 的业务选择正交。** 既有 Main Automation 会话即已可产生首步 Human 槽位；不需要为了这个读取承载等待 D30 其他行或将其塞回旧议程。W-09 后端/协议、W-10 WEB-05 投影各在现有白名单内，不改派工规则或路径授权，不把本缺口变成 PR55 的合并锁。

## 已核对

- 当前议程 v1，council queue 的 P0 队首与 tally 四资格席、门槛三票。
- PM/evidence/decisions/D12-lab-wire.md:156-162、261-305、350-360、580-588：完整头结构、自动化引用、会话详情/目录/页面分层、当前失效范围。
- D7-lab-backend.md:100 的 automation 页读取与订阅行；此前已读的 D19-05、D29 槽位来源、挂载及频道规则。
- automation-slots-gate-a.md、automation-slots-gate-b.md 全文：公开缺口、同 Lab 可读/owner 可写、既有分工和只暂停依赖部分。
- pepgent-lab-07a 工作树 server/lab/catalog.ts:109-111：实现注释错误地认为 page panels 已携带 Automation 头，源码观察不等于接口实际有合法承载。本次接口补充必须相应替换这种旧说明及 D12 会话头分层说明，保持新字段与各处文字一致；这是受影响正文对齐，不是新增产品选择。

本席没有发现可支持反对票的可复现主路径失效反例，没有新增否决、生效条件、跨组件 live 开工锁或同步验收仪式。没有 arbitration.request，本票不是分类争议终局仲裁。

未改工程代码/配置，未编写或运行测试，未执行 build/typecheck/runtime，未使用 hash 验证。不声称新增头、自动化页订阅、首步 Human 交回已在本次实测通过。实现、调用方、字段消费与失效订阅及相关正文由各拥有方按最终通过结果整体对齐；daemon 负责本票发布归档。

