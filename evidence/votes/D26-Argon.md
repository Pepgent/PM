# D26 选票：Argon

议程：Pepgent#18 LAB-11b：草稿与启动意图的生命周期（LC-1 至 LC-6）（[PM#43](https://github.com/Pepgent/PM/issues/43)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D26-01 v1：赞成（Argon-2，2026-11-01T17:25:56.970Z）


**分类意见：** 串联

# D26（PM#43）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】草稿画布与启动意图（`pending_launch`）归 Pepgent Lab 后端业务库持有、不进 store；在草稿内容投递给根会话之前（无 pending 或 `awaiting_approval`）允许保存与丢弃（含一并撤回未投递的 `awaiting_approval` 意图），投递之后（`sent` 或已绑定运行）作为本次实验的来源草稿冻结只读，符合用户原始设计意图与单源生命周期原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：soroi 与 Pepgent 业务分层，代码与串联取舍由管理层协商）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，`draft.discard`、`draft.save`、`experiment.start`、`experiment.approve` 完整走通）、`(U) U11`、`U12`、`U20`、`U96`（`LEDGER.md:77-78,84,110`：缺失生命周期设计逐条表决，无 `(U)` 原文不把特定快照/锁偏好伪称为用户原话）；`(D)` `DEC/D6-store-service.md:40`（D6-12：草稿是业务计划，不进 store）、`DEC/D7-lab-backend.md:66,130-133`（D7-06：`pending_launch` 是启动意图，非派生 `run_started` 时将 `sent` 意图绑定运行）、`DEC/D12-lab-wire.md:152-156,265,418-421,470-473,511-512`、`evidence/gates/pepgent-18-gate-a.md:10-11,29-37`。
   - **边界：** 六条规则在不新增持久化/wire 字段、不新增命令或错误码的前提下，闭合了草稿与 `pending_launch` 在主路径上的状态转换与结束锚点。`design/*.md` 只规定“草稿归 Lab 后端业务库、不进 store”，无需修改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D26-01 v1（LC-1）** | 串联 | **approve（赞成）** | `experiment.approve` 将 `pending_launch.state` 置为 `sent`、读取批准时刻的当前 `draft.canvas`（完整无损呈现，principal 取当前审批人 `session.user.id`）入 `human_irc_queue` 并发布 `catalog`。审批人在界面上看到的就是当前 `draft.canvas` 与 `savedVersion`，所见即所批，且无需为 `pending_launch` 增加冗余快照字段。 |
| **D26-02 v1（LC-2）** | 串联 | **approve（赞成）** | `awaiting_approval` 期间计划尚未投递给 agent，允许讨论 owner 继续执行 `draft.save` 更新 `canvas` 与 `savedVersion` 并保持 `awaiting_approval`，不增设草稿写入锁，与 LC-1 自然衔接。 |
| **D26-03 v1（LC-3）** | 串联 | **approve（赞成）** | 草稿一旦进入 `sent`（已向根会话投递/入队启动 prompt）或已由 `experiment_ext.draft` 绑定为运行来源草稿，即代表已投递的实验计划事实；拒绝 `draft.save` 并返回既有 `revision_conflict`，防止事后篡改实验来源草稿，且无需新增快照表或新失败码。 |
| **D26-04 v1（LC-4）** | 串联 | **approve（赞成）** | 无 pending 且未绑定运行的草稿由 `draft.discard` 直接物理删除并发 `catalog`，使其从目录及 LAB-10 `draftReferences` 中干净移除，不引入软删除字段。 |
| **D26-05 v1（LC-5）** | 串联 | **approve（赞成）** | `awaiting_approval` 下的 `draft.discard` 在同一受理中先结束依赖它的未投递 `pending_launch` 再删除 `draft` 行并发 `catalog`，符合内层先于外层结束的生命周期嵌套规则，避免讨论的唯一 `pending_launch` 槽位永久卡死，且无需新增 wire 命令。 |
| **D26-06 v1（LC-6）** | 串联 | **approve（赞成）** | 草稿处于 `sent` 或已绑定运行时拒绝 `draft.discard`（返回既有 `revision_conflict`），保证 `sent` 启动意图在 `run_started` 时能正常绑定，并保持已绑定运行的 `ExperimentWire.draft` 来源草稿完整可读。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。六项设计补充均符合用户原始设计意图与已通过架构边界。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D26-02 v1：赞成（Argon-2，2026-11-01T17:25:56.970Z）


**分类意见：** 串联

# D26（PM#43）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】草稿画布与启动意图（`pending_launch`）归 Pepgent Lab 后端业务库持有、不进 store；在草稿内容投递给根会话之前（无 pending 或 `awaiting_approval`）允许保存与丢弃（含一并撤回未投递的 `awaiting_approval` 意图），投递之后（`sent` 或已绑定运行）作为本次实验的来源草稿冻结只读，符合用户原始设计意图与单源生命周期原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：soroi 与 Pepgent 业务分层，代码与串联取舍由管理层协商）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，`draft.discard`、`draft.save`、`experiment.start`、`experiment.approve` 完整走通）、`(U) U11`、`U12`、`U20`、`U96`（`LEDGER.md:77-78,84,110`：缺失生命周期设计逐条表决，无 `(U)` 原文不把特定快照/锁偏好伪称为用户原话）；`(D)` `DEC/D6-store-service.md:40`（D6-12：草稿是业务计划，不进 store）、`DEC/D7-lab-backend.md:66,130-133`（D7-06：`pending_launch` 是启动意图，非派生 `run_started` 时将 `sent` 意图绑定运行）、`DEC/D12-lab-wire.md:152-156,265,418-421,470-473,511-512`、`evidence/gates/pepgent-18-gate-a.md:10-11,29-37`。
   - **边界：** 六条规则在不新增持久化/wire 字段、不新增命令或错误码的前提下，闭合了草稿与 `pending_launch` 在主路径上的状态转换与结束锚点。`design/*.md` 只规定“草稿归 Lab 后端业务库、不进 store”，无需修改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D26-01 v1（LC-1）** | 串联 | **approve（赞成）** | `experiment.approve` 将 `pending_launch.state` 置为 `sent`、读取批准时刻的当前 `draft.canvas`（完整无损呈现，principal 取当前审批人 `session.user.id`）入 `human_irc_queue` 并发布 `catalog`。审批人在界面上看到的就是当前 `draft.canvas` 与 `savedVersion`，所见即所批，且无需为 `pending_launch` 增加冗余快照字段。 |
| **D26-02 v1（LC-2）** | 串联 | **approve（赞成）** | `awaiting_approval` 期间计划尚未投递给 agent，允许讨论 owner 继续执行 `draft.save` 更新 `canvas` 与 `savedVersion` 并保持 `awaiting_approval`，不增设草稿写入锁，与 LC-1 自然衔接。 |
| **D26-03 v1（LC-3）** | 串联 | **approve（赞成）** | 草稿一旦进入 `sent`（已向根会话投递/入队启动 prompt）或已由 `experiment_ext.draft` 绑定为运行来源草稿，即代表已投递的实验计划事实；拒绝 `draft.save` 并返回既有 `revision_conflict`，防止事后篡改实验来源草稿，且无需新增快照表或新失败码。 |
| **D26-04 v1（LC-4）** | 串联 | **approve（赞成）** | 无 pending 且未绑定运行的草稿由 `draft.discard` 直接物理删除并发 `catalog`，使其从目录及 LAB-10 `draftReferences` 中干净移除，不引入软删除字段。 |
| **D26-05 v1（LC-5）** | 串联 | **approve（赞成）** | `awaiting_approval` 下的 `draft.discard` 在同一受理中先结束依赖它的未投递 `pending_launch` 再删除 `draft` 行并发 `catalog`，符合内层先于外层结束的生命周期嵌套规则，避免讨论的唯一 `pending_launch` 槽位永久卡死，且无需新增 wire 命令。 |
| **D26-06 v1（LC-6）** | 串联 | **approve（赞成）** | 草稿处于 `sent` 或已绑定运行时拒绝 `draft.discard`（返回既有 `revision_conflict`），保证 `sent` 启动意图在 `run_started` 时能正常绑定，并保持已绑定运行的 `ExperimentWire.draft` 来源草稿完整可读。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。六项设计补充均符合用户原始设计意图与已通过架构边界。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D26-03 v1：赞成（Argon-2，2026-11-01T17:25:56.970Z）


**分类意见：** 串联

# D26（PM#43）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】草稿画布与启动意图（`pending_launch`）归 Pepgent Lab 后端业务库持有、不进 store；在草稿内容投递给根会话之前（无 pending 或 `awaiting_approval`）允许保存与丢弃（含一并撤回未投递的 `awaiting_approval` 意图），投递之后（`sent` 或已绑定运行）作为本次实验的来源草稿冻结只读，符合用户原始设计意图与单源生命周期原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：soroi 与 Pepgent 业务分层，代码与串联取舍由管理层协商）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，`draft.discard`、`draft.save`、`experiment.start`、`experiment.approve` 完整走通）、`(U) U11`、`U12`、`U20`、`U96`（`LEDGER.md:77-78,84,110`：缺失生命周期设计逐条表决，无 `(U)` 原文不把特定快照/锁偏好伪称为用户原话）；`(D)` `DEC/D6-store-service.md:40`（D6-12：草稿是业务计划，不进 store）、`DEC/D7-lab-backend.md:66,130-133`（D7-06：`pending_launch` 是启动意图，非派生 `run_started` 时将 `sent` 意图绑定运行）、`DEC/D12-lab-wire.md:152-156,265,418-421,470-473,511-512`、`evidence/gates/pepgent-18-gate-a.md:10-11,29-37`。
   - **边界：** 六条规则在不新增持久化/wire 字段、不新增命令或错误码的前提下，闭合了草稿与 `pending_launch` 在主路径上的状态转换与结束锚点。`design/*.md` 只规定“草稿归 Lab 后端业务库、不进 store”，无需修改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D26-01 v1（LC-1）** | 串联 | **approve（赞成）** | `experiment.approve` 将 `pending_launch.state` 置为 `sent`、读取批准时刻的当前 `draft.canvas`（完整无损呈现，principal 取当前审批人 `session.user.id`）入 `human_irc_queue` 并发布 `catalog`。审批人在界面上看到的就是当前 `draft.canvas` 与 `savedVersion`，所见即所批，且无需为 `pending_launch` 增加冗余快照字段。 |
| **D26-02 v1（LC-2）** | 串联 | **approve（赞成）** | `awaiting_approval` 期间计划尚未投递给 agent，允许讨论 owner 继续执行 `draft.save` 更新 `canvas` 与 `savedVersion` 并保持 `awaiting_approval`，不增设草稿写入锁，与 LC-1 自然衔接。 |
| **D26-03 v1（LC-3）** | 串联 | **approve（赞成）** | 草稿一旦进入 `sent`（已向根会话投递/入队启动 prompt）或已由 `experiment_ext.draft` 绑定为运行来源草稿，即代表已投递的实验计划事实；拒绝 `draft.save` 并返回既有 `revision_conflict`，防止事后篡改实验来源草稿，且无需新增快照表或新失败码。 |
| **D26-04 v1（LC-4）** | 串联 | **approve（赞成）** | 无 pending 且未绑定运行的草稿由 `draft.discard` 直接物理删除并发 `catalog`，使其从目录及 LAB-10 `draftReferences` 中干净移除，不引入软删除字段。 |
| **D26-05 v1（LC-5）** | 串联 | **approve（赞成）** | `awaiting_approval` 下的 `draft.discard` 在同一受理中先结束依赖它的未投递 `pending_launch` 再删除 `draft` 行并发 `catalog`，符合内层先于外层结束的生命周期嵌套规则，避免讨论的唯一 `pending_launch` 槽位永久卡死，且无需新增 wire 命令。 |
| **D26-06 v1（LC-6）** | 串联 | **approve（赞成）** | 草稿处于 `sent` 或已绑定运行时拒绝 `draft.discard`（返回既有 `revision_conflict`），保证 `sent` 启动意图在 `run_started` 时能正常绑定，并保持已绑定运行的 `ExperimentWire.draft` 来源草稿完整可读。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。六项设计补充均符合用户原始设计意图与已通过架构边界。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D26-04 v1：赞成（Argon-2，2026-11-01T17:25:56.970Z）


**分类意见：** 串联

# D26（PM#43）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】草稿画布与启动意图（`pending_launch`）归 Pepgent Lab 后端业务库持有、不进 store；在草稿内容投递给根会话之前（无 pending 或 `awaiting_approval`）允许保存与丢弃（含一并撤回未投递的 `awaiting_approval` 意图），投递之后（`sent` 或已绑定运行）作为本次实验的来源草稿冻结只读，符合用户原始设计意图与单源生命周期原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：soroi 与 Pepgent 业务分层，代码与串联取舍由管理层协商）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，`draft.discard`、`draft.save`、`experiment.start`、`experiment.approve` 完整走通）、`(U) U11`、`U12`、`U20`、`U96`（`LEDGER.md:77-78,84,110`：缺失生命周期设计逐条表决，无 `(U)` 原文不把特定快照/锁偏好伪称为用户原话）；`(D)` `DEC/D6-store-service.md:40`（D6-12：草稿是业务计划，不进 store）、`DEC/D7-lab-backend.md:66,130-133`（D7-06：`pending_launch` 是启动意图，非派生 `run_started` 时将 `sent` 意图绑定运行）、`DEC/D12-lab-wire.md:152-156,265,418-421,470-473,511-512`、`evidence/gates/pepgent-18-gate-a.md:10-11,29-37`。
   - **边界：** 六条规则在不新增持久化/wire 字段、不新增命令或错误码的前提下，闭合了草稿与 `pending_launch` 在主路径上的状态转换与结束锚点。`design/*.md` 只规定“草稿归 Lab 后端业务库、不进 store”，无需修改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D26-01 v1（LC-1）** | 串联 | **approve（赞成）** | `experiment.approve` 将 `pending_launch.state` 置为 `sent`、读取批准时刻的当前 `draft.canvas`（完整无损呈现，principal 取当前审批人 `session.user.id`）入 `human_irc_queue` 并发布 `catalog`。审批人在界面上看到的就是当前 `draft.canvas` 与 `savedVersion`，所见即所批，且无需为 `pending_launch` 增加冗余快照字段。 |
| **D26-02 v1（LC-2）** | 串联 | **approve（赞成）** | `awaiting_approval` 期间计划尚未投递给 agent，允许讨论 owner 继续执行 `draft.save` 更新 `canvas` 与 `savedVersion` 并保持 `awaiting_approval`，不增设草稿写入锁，与 LC-1 自然衔接。 |
| **D26-03 v1（LC-3）** | 串联 | **approve（赞成）** | 草稿一旦进入 `sent`（已向根会话投递/入队启动 prompt）或已由 `experiment_ext.draft` 绑定为运行来源草稿，即代表已投递的实验计划事实；拒绝 `draft.save` 并返回既有 `revision_conflict`，防止事后篡改实验来源草稿，且无需新增快照表或新失败码。 |
| **D26-04 v1（LC-4）** | 串联 | **approve（赞成）** | 无 pending 且未绑定运行的草稿由 `draft.discard` 直接物理删除并发 `catalog`，使其从目录及 LAB-10 `draftReferences` 中干净移除，不引入软删除字段。 |
| **D26-05 v1（LC-5）** | 串联 | **approve（赞成）** | `awaiting_approval` 下的 `draft.discard` 在同一受理中先结束依赖它的未投递 `pending_launch` 再删除 `draft` 行并发 `catalog`，符合内层先于外层结束的生命周期嵌套规则，避免讨论的唯一 `pending_launch` 槽位永久卡死，且无需新增 wire 命令。 |
| **D26-06 v1（LC-6）** | 串联 | **approve（赞成）** | 草稿处于 `sent` 或已绑定运行时拒绝 `draft.discard`（返回既有 `revision_conflict`），保证 `sent` 启动意图在 `run_started` 时能正常绑定，并保持已绑定运行的 `ExperimentWire.draft` 来源草稿完整可读。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。六项设计补充均符合用户原始设计意图与已通过架构边界。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D26-05 v1：赞成（Argon-2，2026-11-01T17:25:56.971Z）


**分类意见：** 串联

# D26（PM#43）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】草稿画布与启动意图（`pending_launch`）归 Pepgent Lab 后端业务库持有、不进 store；在草稿内容投递给根会话之前（无 pending 或 `awaiting_approval`）允许保存与丢弃（含一并撤回未投递的 `awaiting_approval` 意图），投递之后（`sent` 或已绑定运行）作为本次实验的来源草稿冻结只读，符合用户原始设计意图与单源生命周期原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：soroi 与 Pepgent 业务分层，代码与串联取舍由管理层协商）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，`draft.discard`、`draft.save`、`experiment.start`、`experiment.approve` 完整走通）、`(U) U11`、`U12`、`U20`、`U96`（`LEDGER.md:77-78,84,110`：缺失生命周期设计逐条表决，无 `(U)` 原文不把特定快照/锁偏好伪称为用户原话）；`(D)` `DEC/D6-store-service.md:40`（D6-12：草稿是业务计划，不进 store）、`DEC/D7-lab-backend.md:66,130-133`（D7-06：`pending_launch` 是启动意图，非派生 `run_started` 时将 `sent` 意图绑定运行）、`DEC/D12-lab-wire.md:152-156,265,418-421,470-473,511-512`、`evidence/gates/pepgent-18-gate-a.md:10-11,29-37`。
   - **边界：** 六条规则在不新增持久化/wire 字段、不新增命令或错误码的前提下，闭合了草稿与 `pending_launch` 在主路径上的状态转换与结束锚点。`design/*.md` 只规定“草稿归 Lab 后端业务库、不进 store”，无需修改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D26-01 v1（LC-1）** | 串联 | **approve（赞成）** | `experiment.approve` 将 `pending_launch.state` 置为 `sent`、读取批准时刻的当前 `draft.canvas`（完整无损呈现，principal 取当前审批人 `session.user.id`）入 `human_irc_queue` 并发布 `catalog`。审批人在界面上看到的就是当前 `draft.canvas` 与 `savedVersion`，所见即所批，且无需为 `pending_launch` 增加冗余快照字段。 |
| **D26-02 v1（LC-2）** | 串联 | **approve（赞成）** | `awaiting_approval` 期间计划尚未投递给 agent，允许讨论 owner 继续执行 `draft.save` 更新 `canvas` 与 `savedVersion` 并保持 `awaiting_approval`，不增设草稿写入锁，与 LC-1 自然衔接。 |
| **D26-03 v1（LC-3）** | 串联 | **approve（赞成）** | 草稿一旦进入 `sent`（已向根会话投递/入队启动 prompt）或已由 `experiment_ext.draft` 绑定为运行来源草稿，即代表已投递的实验计划事实；拒绝 `draft.save` 并返回既有 `revision_conflict`，防止事后篡改实验来源草稿，且无需新增快照表或新失败码。 |
| **D26-04 v1（LC-4）** | 串联 | **approve（赞成）** | 无 pending 且未绑定运行的草稿由 `draft.discard` 直接物理删除并发 `catalog`，使其从目录及 LAB-10 `draftReferences` 中干净移除，不引入软删除字段。 |
| **D26-05 v1（LC-5）** | 串联 | **approve（赞成）** | `awaiting_approval` 下的 `draft.discard` 在同一受理中先结束依赖它的未投递 `pending_launch` 再删除 `draft` 行并发 `catalog`，符合内层先于外层结束的生命周期嵌套规则，避免讨论的唯一 `pending_launch` 槽位永久卡死，且无需新增 wire 命令。 |
| **D26-06 v1（LC-6）** | 串联 | **approve（赞成）** | 草稿处于 `sent` 或已绑定运行时拒绝 `draft.discard`（返回既有 `revision_conflict`），保证 `sent` 启动意图在 `run_started` 时能正常绑定，并保持已绑定运行的 `ExperimentWire.draft` 来源草稿完整可读。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。六项设计补充均符合用户原始设计意图与已通过架构边界。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D26-06 v1：赞成（Argon-2，2026-11-01T17:25:56.971Z）


**分类意见：** 串联

# D26（PM#43）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】草稿画布与启动意图（`pending_launch`）归 Pepgent Lab 后端业务库持有、不进 store；在草稿内容投递给根会话之前（无 pending 或 `awaiting_approval`）允许保存与丢弃（含一并撤回未投递的 `awaiting_approval` 意图），投递之后（`sent` 或已绑定运行）作为本次实验的来源草稿冻结只读，符合用户原始设计意图与单源生命周期原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：soroi 与 Pepgent 业务分层，代码与串联取舍由管理层协商）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，`draft.discard`、`draft.save`、`experiment.start`、`experiment.approve` 完整走通）、`(U) U11`、`U12`、`U20`、`U96`（`LEDGER.md:77-78,84,110`：缺失生命周期设计逐条表决，无 `(U)` 原文不把特定快照/锁偏好伪称为用户原话）；`(D)` `DEC/D6-store-service.md:40`（D6-12：草稿是业务计划，不进 store）、`DEC/D7-lab-backend.md:66,130-133`（D7-06：`pending_launch` 是启动意图，非派生 `run_started` 时将 `sent` 意图绑定运行）、`DEC/D12-lab-wire.md:152-156,265,418-421,470-473,511-512`、`evidence/gates/pepgent-18-gate-a.md:10-11,29-37`。
   - **边界：** 六条规则在不新增持久化/wire 字段、不新增命令或错误码的前提下，闭合了草稿与 `pending_launch` 在主路径上的状态转换与结束锚点。`design/*.md` 只规定“草稿归 Lab 后端业务库、不进 store”，无需修改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D26-01 v1（LC-1）** | 串联 | **approve（赞成）** | `experiment.approve` 将 `pending_launch.state` 置为 `sent`、读取批准时刻的当前 `draft.canvas`（完整无损呈现，principal 取当前审批人 `session.user.id`）入 `human_irc_queue` 并发布 `catalog`。审批人在界面上看到的就是当前 `draft.canvas` 与 `savedVersion`，所见即所批，且无需为 `pending_launch` 增加冗余快照字段。 |
| **D26-02 v1（LC-2）** | 串联 | **approve（赞成）** | `awaiting_approval` 期间计划尚未投递给 agent，允许讨论 owner 继续执行 `draft.save` 更新 `canvas` 与 `savedVersion` 并保持 `awaiting_approval`，不增设草稿写入锁，与 LC-1 自然衔接。 |
| **D26-03 v1（LC-3）** | 串联 | **approve（赞成）** | 草稿一旦进入 `sent`（已向根会话投递/入队启动 prompt）或已由 `experiment_ext.draft` 绑定为运行来源草稿，即代表已投递的实验计划事实；拒绝 `draft.save` 并返回既有 `revision_conflict`，防止事后篡改实验来源草稿，且无需新增快照表或新失败码。 |
| **D26-04 v1（LC-4）** | 串联 | **approve（赞成）** | 无 pending 且未绑定运行的草稿由 `draft.discard` 直接物理删除并发 `catalog`，使其从目录及 LAB-10 `draftReferences` 中干净移除，不引入软删除字段。 |
| **D26-05 v1（LC-5）** | 串联 | **approve（赞成）** | `awaiting_approval` 下的 `draft.discard` 在同一受理中先结束依赖它的未投递 `pending_launch` 再删除 `draft` 行并发 `catalog`，符合内层先于外层结束的生命周期嵌套规则，避免讨论的唯一 `pending_launch` 槽位永久卡死，且无需新增 wire 命令。 |
| **D26-06 v1（LC-6）** | 串联 | **approve（赞成）** | 草稿处于 `sent` 或已绑定运行时拒绝 `draft.discard`（返回既有 `revision_conflict`），保证 `sent` 启动意图在 `run_started` 时能正常绑定，并保持已绑定运行的 `ExperimentWire.draft` 来源草稿完整可读。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。六项设计补充均符合用户原始设计意图与已通过架构边界。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。

