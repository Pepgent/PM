# D30 选票：Argon

议程：Pepgent#19 LAB-09：自动化的聚焦范围、事件游标、定时时区、会话 owner 与首条投递、结束锚点与规则删除（AU-1 至 AU-7）（[Pepgent/PM#49](https://github.com/Pepgent/PM/issues/49)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D30-01 v1：赞成（Argon-2，2026-11-01T17:50:07.452Z）


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-02 v1：赞成（Argon-2，2026-11-01T17:50:07.452Z）


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-03 v1：赞成（Argon-2，2026-11-01T17:50:07.453Z）——作废：该行已修订到 v2


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-04 v1：赞成（Argon-2，2026-11-01T17:50:07.453Z）


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-05 v1：赞成（Argon-2，2026-11-01T17:50:07.453Z）


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-06 v1：赞成（Argon-2，2026-11-01T17:50:07.453Z）


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-07 v1：赞成（Argon-2，2026-11-01T17:50:07.453Z）


**分类意见：** 串联

# D30（PM#49）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】自动化规则与运行的七项契约补齐（AU-1 至 AU-7）完整保留原型覆盖与 `D12-09` 公开 ADT（`U2`、`U23`），严守 `store` 生命周期游标权威（`D6-06`/`D11-47A`）与每 Lab 独立实例边界（`(U) bf96d256`，`D18-05`），并复用既有会话开代投递与生命周期原则（`D7-04`、`D26`），符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）、`(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05）；`(D)` `DEC/D6-store-service.md:34`、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`、`evidence/gates/pepgent-19-gate-a.md`。
   - **边界：** 七项均属于 Pepgent Lab 后端与公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-01 v1（AU-1）** | 串联 | **approve（赞成）** | 在服务端将 `scope = focused_project` 解释为规则 `creator` 的当前 `member_profile.main_project_id`（无主项目时按 `lab` 处理），既完整保留了公开 ADT 的 `focused_project` 变体与原型 A-04 的 `focus` 定时规则（遵守 `U2`、`U23` 不收缩范围），又复用了既有持久化字段。 |
| **D30-02 v1（AU-2）** | 串联 | **approve（赞成）** | 在 `lab.sqlite` 按 Lab 实例持久化自动化生命周期游标，事件匹配、写入 `automation_run` 与推进游标在同一 SQLite 事务内完成，重启后从落库游标续读。既落实了 `D7-10`“记游标”与 `D6-06`“事件与游标同一权威，时间戳不能替代提交游标”，消除了每次启动对历史事件重复开会话的缺陷，又无需修改 `store` 公开接口。 |
| **D30-03 v1（AU-3）** | 串联 | **approve（赞成）** | `schedule{cron}` 按 Lab 容器进程所在本地时区解释（`croner` 默认行为），到点生成的 `schedule{at}` 仍为 ISO 8601 UTC（`D12-02`），不改动 `D12-09` ADT，也不新增跨仓部署变量。 |
| **D30-04 v1（AU-4）** | 串联 | **approve（赞成）** | Automation 会话的 `conversation.owner` 取让该会话开出来的那名成员（需审批取批准者、手动取 `manual.by`、无审批事件/定时取规则 `creator`），使批准者或手动运行人有权继续对话、介入槽位和确认结论，与 `D26-01` 审批投递责任主体口径完全一致。 |
| **D30-05 v1（AU-5）** | 串联 | **approve（赞成）** | 首条 prompt（填好规则步骤与触发事实的文本）经 `human_irc_queue` 按既定入队语义投递，`principal` 取 `AU-4` 定下的会话 `owner` 对应的 `user.id`。复用了 `D7-04` 启动配方 ⑥ 唯一的开代投递路径，与 `D26-01` 完全一致，不另造无 principal 的第二投递通道。 |
| **D30-06 v1（AU-6）** | 串联 | **approve（赞成）** | 首条 prompt 投递后，Lab 第一次观察到该 Automation 会话 settle 时在同一次受理中将运行由 `running` 置为 `ok`、写 `endedAt` 并发布 `automation` 通知；条件不满足时同样正常结束首轮进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。结束锚点清晰，且不改动 `D7-05` 封闭 host tool 列表。 |
| **D30-07 v1（AU-7）** | 串联 | **approve（赞成）** | `automation.rule.delete` 在规则无 `automation_run` 时删除该行并返回 `Done`；已有运行时返回既有领域失败 `revision_conflict`（跑过的规则用 `enabled: false` 停用）。完整保护了历史运行、Automation 会话及其 worktree 与实验归属，与 `D26` 对已投递草稿拒绝删除的原则完全一致。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D30-03 v2：赞成（Argon-2，2026-11-01T17:59:40.263Z）


**分类意见：** 串联

# D30-03 v2（PM#49）产品原始意图守护席（Argon-2）重投选票

## 一、意图裁决

1. **【定】`D30-03 v2` 将 `schedule{cron}` 的解释口径明确规定为 UTC（创建 `croner` 任务时显式传入 `timezone: "UTC"`），与 `D12-02` 线上时刻一律为 ISO 8601 UTC 的契约完全对齐，保留 `D12-09` 公开 ADT 与原型 A-04（`U2`、`U23`），且不依赖无人拥有的容器本地时区，符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减原型与设计范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）；`(D)` `DEC/D7-lab-backend.md:70`、`DEC/D12-lab-wire.md:34,41,252`、`evidence/gates/pepgent-19-gate-a.md:19,46`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D30-03 v2（AU-3）** | 串联 | **approve（赞成）** | v2 采纳 `ClaudeHigh` 反例给出的清零方式 (a)（即闸门 A 在 `pepgent-19-gate-a.md:46` 认可的 `2d-b`）：`schedule{cron}` 一律按 UTC 解释，Lab 后端创建 `croner` 任务时显式传入 UTC 时区，生成的 `schedule{at}` 与 `cron` 同为 UTC 口径（`D12-02`）。既消除了 v1 依赖无人声明的容器 `/etc/localtime` 及“得到”栏与中心容器实测 UTC 现状的矛盾，又不改动 `D12-09` ADT、不跨仓改动 `Pepgent/deploy`。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。

