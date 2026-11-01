# D31：Automation 会话头无读取携带：自动化页携带 Automation 会话头（AS-1）（P0）——定稿

决策 issue：[Pepgent/PM#50](https://github.com/Pepgent/PM/issues/50)。发起：Coordination（DeskAutomationSlots）。本文件由议会 daemon 生成。

## 事实

- **来由：** D29（[Pepgent/PM#48](https://github.com/Pepgent/PM/issues/48)，已定案）ClaudeHigh 选票“非阻断附注”第 4 条（[`evidence/votes/D29-ClaudeHigh.md`](https://github.com/Pepgent/PM/blob/c6fb37c/evidence/votes/D29-ClaudeHigh.md)）指出的既有缺口：Automation 来源的 `ConversationWire` 在现行线上没有任何读取携带。不是工人 BLOCKED，按 C2-2 先过两道闸门。闸门材料与判定：[`automation-slots.md`](https://github.com/Pepgent/PM/blob/c6fb37c/evidence/gates/automation-slots.md)、[`-gate-a.md`](https://github.com/Pepgent/PM/blob/c6fb37c/evidence/gates/automation-slots-gate-a.md)、[`-gate-b.md`](https://github.com/Pepgent/PM/blob/c6fb37c/evidence/gates/automation-slots-gate-b.md)（PM `c6fb37c`）。本议程第 1 行即 AS-1。
- **为什么要投票：** 闸门 A 判定这是公开 wire 与 D12-17 失效表的缺失设计，不是既有条文的澄清，候选处置都须 P0，并反对“不展示”（gate-a 第 13-18、20-25、38-46 行）。闸门 B 同判须 P0：4 席参投、不加 `domains`，单独立案、不并入 D30，不必等 D30 定案（gate-b 第 11-14、20-27、29-43 行）。依据 `SOR/AGENTS.md:60`（C2-2）、`DEC/D10-repo-delivery.md:20`（D10-08）。
- **参投与门槛：** 产品与跨组件契约行，4 席投票（总协调、ClaudeHigh、Argon、LeadMentor），≥3 赞成、无未清零反例、无成立否决即通过（`SOR/AGENTS.md:22,27`）。
- **设计范围：** 只写主路径（`SOR/.claude/rules/design-assumes-it-works.md`）。
- **承载与表决期（闸门 B）：** Lab 后端与 `protocol/lab` 由 W-09 在 LAB-09（[Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)）承载；**自动化页的 WEB 投影由 W-10 在 WEB-05（[Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)）承接**，渲染 Automation 会话头、其首步在途槽位与交回入口。不阻塞 [PR#55](https://github.com/Pepgent/Pepgent/pull/55)（#17/#20）；表决通过前不把本项改动写入待合入 PR 或任何集成分支；#19 只暂停本项依赖部分。不等 D30（[PM#49](https://github.com/Pepgent/PM/issues/49)）定案。

**决定性事实**（`DEC/` = PM `evidence/decisions/`，行号为 PM `c6fb37c`）：

| # | 事实 | 来源 |
|---|---|---|
| F1 | 挂载表：“无运行、Panel 或 Automation 来源 → 该会话头的 `ConversationWire.slots`”；`conversation` 频道在“挂在 Panel 或 Automation 的 `ConversationWire.slots` 的在途槽位变化”时发出（D19-05②、D29-02、D29-04，已回写）。 | (D) `DEC/D12-lab-wire.md:51-58,586`；`DEC/D19-sor13-control-contract.md:33` |
| F2 | 目录只带 `discussions: DiscussionHeaderWire[]`（`origin.kind = 'Discussion'`），`ExperimentWire.conversation` 只是 id。 | (D) `DEC/D12-lab-wire.md:271-295` |
| F3 | 各页 `panels` 只列当前用户本人本页的 Panel 会话头，是选择范围，不是读取权限；同一 Lab 成员可读该 Lab 全部会话。`automation` 页为 `{ rules, runs, panels }`。 | (D) `DEC/D12-lab-wire.md:40,356,564` |
| F4 | `AutomationRunWire.conversation: ConversationId \| null`，只是 id；`lab.conversation.read` 的 `ConversationDetailWire` 不带会话头（“会话头……在目录或页面 panels，不重复”）。 | (D) `DEC/D12-lab-wire.md:261-263,297-305` |
| F5 | `conversation` 频道的失效读取不含 `automation` 页；`automation` 频道在 `automation_rule`、`automation_run` 变化时发，失效 `automation`、`home`。 | (D) `DEC/D12-lab-wire.md:586-587` |
| F6 | `ConversationWire = { id, lab, owner, origin, agent, session, slots, createdAt }`；缺的是整个 Automation 会话头：`agent` 供 `watchAgent`，`owner` 判定谁能写与交回，`slots` 供首步介入（gate-a A-3）。 | (D) `DEC/D12-lab-wire.md:156-162`；gate-a 第 27-34 行（A-3） |
| F7 | 主路径可达：Automation 会话是装着 soroi 定制的 Main 根会话，可开出运行；运行在第一次正式提交时才建立，第一步在途期间槽位挂在其会话头。D30-04 取舍栏写“批准者与手动运行人能继续对话、交回槽位”（D30 表决中）。 | (D) `DEC/D12-lab-wire.md:41`（D12-09）；`DEC/D6-store-service.md:33`（D6-05）；PM#49 D30-01、D30-04 |
| F8 | W-09 现实现以为“page panels carry”Automation 头，而 `panels()` 只查 `originKind = 'Panel'`，Automation 头不进入任何返回。 | (D) `WT07/apps/web/src/server/lab/catalog.ts:109-111`、`operations.ts:86-93`（W-09 的 LAB-07a/07b worktree） |

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D31-01 v1 | AS-1：**`automation` 页新增 `conversations: ConversationWire[]` 携带 Automation 会话头，`conversation{id}` 让该页失效** | D12-07“节点库与自动化页”（`DEC/D12-lab-wire.md:39`）与 `LabPageWire.automation`（`:356`）；D12-17 失效表 `conversation` 行（`:586`）；D7 `automation` 页行（`DEC/D7-lab-backend.md:100`） | • `LabPageWire.automation` 由 `{ rules, runs, panels }` 改为 `{ rules, runs, conversations, panels }`，新增 `conversations: ConversationWire[]`：`runs` 中 `conversation` 非 null 的各运行对应的 Automation 会话头，每个会话一项，按“读取范围与归属”对本 Lab 全体成员可见（不按 owner 过滤）。<br>• 每项是完整的 `ConversationWire`（`owner`、`agent`、`session`、`slots` 等），`slots` 按 D12-04 挂载表填写：该会话无运行时为其在线一代全部在途槽位；有 Open 运行时为 `[]`（槽位在该运行项）。<br>• D12-17 失效表 `conversation` 行的“失效的读取”补“`automation` 页（该会话为 Automation 来源时）”；其余频道、`LabChange` 联合、`AutomationRunWire`、`panels` 定义与 `lab.conversation.read` 都不变。<br>• 新会话开出时，`automation_run` 的变化已发 `automation`，`automation` 页重读即带出新会话头。<br>• 回写：D12-07“节点库与自动化页”行的 `automation=` 字段列表、`LabPageWire.automation` 类型与 D12-17 失效表；D7 `automation` 页行（`DEC/D7-lab-backend.md:100`）的读取说明。 | **得到：**<br>• Automation 会话首步无运行时的槽位有读方能显示、能交回（D19-05 的目的，F7）；D29-04 为它发的 `conversation{id}` 有页面重读。<br>• 一次闭合整个 Automation 会话头：`agent` 供 `watchAgent`，`owner` 供写与交回判定（F6）。<br>• 守 D12-08 的分层：会话头在页面，`lab.conversation.read` 不重复；`AutomationRunWire` 仍只记运行事实。<br>• Automation 会话只在自动化页消费，槽位变化只让该页重读。<br>**代价：** 自动化页多一个列表；`conversation{id}` 多失效一页。<br>**落选：**<br>• `AutomationRunWire.conversation` 改为 `ConversationWire \\| null`（gate-a 可作备选）：运行事实与会话头耦合在一个类型里，会话消息结束也要随运行一起重算。<br>• 目录新增 Automation 会话头列表：每次槽位变化让整个目录重读，且目录的其他读方不消费它。<br>• `panels` 兼列 Automation 会话头：改变 `panels`“本人本页 Panel 头的选择范围”定义，Automation 会话不属于某页，且应全员可见。<br>• Automation 无运行时的槽位不展示：首步 `awaiting_human` 无法交回，推翻 D19-05②、D29-02/04（gate-a 反对）。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD31）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D31-Coordination.md`、`votes/D31-ClaudeHigh.md`、`votes/D31-Argon.md`、`votes/D31-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。