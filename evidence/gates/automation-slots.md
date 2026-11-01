# Automation 会话头无读取携带：闸门材料

- **来由：** D29（[Pepgent/PM#48](https://github.com/Pepgent/PM/issues/48)，已定案）ClaudeHigh 选票“非阻断附注”第 4 条（实例 `ClaudeHighD29`，选票原文 `/tmp/claudehigh-d29/ballot.md`；daemon 归档在 `PM/evidence/votes/D29-ClaudeHigh.md`）。原文：Automation 来源的 `ConversationWire` 在现行线上没有任何读取携带，因此 Automation 会话首步无运行时的槽位，以及 D29-04 为它发的 `conversation{id}`，都没有读方能显示或重读；这个缺口来自 D12-04/D19-05，不在 D29 请求范围内，建议协调席另交闸门判定是否立案。
- **性质：** 不是工人上报的 BLOCKED，是独立审查席在表决中发现的既有缺口。按 `SOR/AGENTS.md` C2-2 同样先过两道事前闸门：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约，闸门 B 由 `ArgonGovernance` 判定路径白名单、阶段门禁、承载与投票程序。两道都判不越界才免票放行；任一判越界，按 P0 立案逐行表决。
- **编制：** governance-desk 实例 `DeskAutomationSlots`（总协调席，与 Main 合计 1 票）。本文只整理事实与待判问题，列出可选处置，不下结论，不构成裁决。
- **设计范围：** 只写主路径（`SOR/.claude/rules/design-assumes-it-works.md`）。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。本实例只读文件、源码与 `council tally`，没有运行构建或测试，没有读 git 历史或 session。

路径简称：`SOR/` = `pepgent-soroi/`；`PM/` = `pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`；`GATE/` = `PM/evidence/gates/`；`WT07/` = W-09 的 LAB-07a/07b worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`（PR [Pepgent/Pepgent#55](https://github.com/Pepgent/Pepgent/pull/55) 的分支）。`DEC/` 行号以 PM `d0b4a86`（D29 正文已回写进 D12、D7）为准。

---

## 一、事实

### 1.1 现行契约规定了 Automation 槽位的挂载位置

| # | 事实 | 来源 |
|---|---|---|
| F1 | 挂载规则（D12-04，源自 D19-05②）：该会话有 Open 运行时，槽位挂到该运行的 `ExperimentWire.slots`；无运行时，Discussion 来源挂到 `pendingLaunch` 实验项，**Panel 与 Automation 来源挂到 `ConversationWire.slots`**。 | (D) `DEC/D19-sor13-control-contract.md:33`（D19-05②）；`DEC/D12-lab-wire.md:36` |
| F2 | D29-02（已通过 4/4）把挂载规则补成完整一张表，已回写为 D12“D12-04 在途槽位挂载”一节，其中“无运行、Panel 或 Automation 来源 → 该会话头的 `ConversationWire.slots`”；`ConversationWire.slots` 注释为“按 D12-04 挂在本会话头时，为该会话在线一代当前全部在途槽位；否则为空数组”。D7-08 同步为“无运行的 Panel 或 Automation 挂会话头”。 | (D) `DEC/D29-pepgent-20-slot-overlay.md:32`；`DEC/D12-lab-wire.md:51-58,160-162`；`DEC/D7-lab-backend.md:68` |
| F3 | D29-04（已通过 4/4）：“挂在 Panel 或 Automation 的 `ConversationWire.slots`：`conversation{id}`”；各频道的失效读取不变。已回写进 D12-17 `conversation` 行的“什么时候发”。 | (D) `DEC/D29-pepgent-20-slot-overlay.md:34`；`DEC/D12-lab-wire.md:586` |
| F4 | `ConversationWire = { id, lab, owner, origin, agent, session, slots, createdAt }`；`origin` 含 `Automation{rule, automationRun}` 变体。 | (D) `DEC/D12-lab-wire.md:156-162` |

### 1.2 现行所有读取都不携带 Automation 来源的 `ConversationWire`

| # | 事实 | 来源 |
|---|---|---|
| F5 | 目录：`LabCatalogWire.discussions: DiscussionHeaderWire[]`，`DiscussionHeaderWire.conversation` 注释为“`origin.kind = 'Discussion'`”；目录没有其他会话头列表。`ExperimentWire.conversation` 只是 `ConversationId`。 | (D) `DEC/D12-lab-wire.md:271-295` |
| F6 | 页面 `panels`：“`panels` 只列出当前用户自己的 Panel 会话头，是页面的选择范围，不是读取权限”；D12-08“各页 panels 只选本人本页会话头”。`automation` 页为 `{ rules, runs, panels }`。 | (D) `DEC/D12-lab-wire.md:564`（“读取范围与归属”段）、`:40`（D12-08）、`:356`；`:39`（D12-07） |
| F7 | `automation` 页的运行：`AutomationRunWire.conversation: ConversationId \| null`，只是 id。 | (D) `DEC/D12-lab-wire.md:261-263` |
| F8 | 会话详情 `lab.conversation.read` 返回 `ConversationDetailWire{conversation: ConversationId, messages, …}`，注释：“会话头、运行关系、pending_launch 在目录或页面 panels，不重复”；D12-08 同此。即消息正文能按 id 读到，会话头不能。 | (D) `DEC/D12-lab-wire.md:297-305`、`:40` |
| F9 | 失效表：`conversation` 频道失效“该会话的 `lab.conversation.read`；`discussions`、`discussion`、`home`、`settings`（`activity` 与 `discussionActivity`）；`panels` 含该会话的页面；`datasets`”，不含 `automation` 页。`automation` 频道只在 `automation_rule`、`automation_run` 变化时发，失效 `automation`、`home`。 | (D) `DEC/D12-lab-wire.md:586-587` |
| F10 | `design/` 六份文档（`eval`、`intervention`、`layers`、`soroi`、`store`、`subagent`）均不涉及 Automation 来源或 Lab 会话头。 | (R) 在 `SOR/design/` 检索 `automation`、`Automation`、`自动化` 无命中 |

由 F1–F9：Automation 会话无运行时的在途槽位按契约挂在它的 `ConversationWire.slots` 上，而该 `ConversationWire` 不出现在任何读取的返回里；D29-04 为它发的 `conversation{id}` 只能让该会话的 `lab.conversation.read`（不含头与槽位）失效。`[INFERENCE]`

### 1.3 主路径可达性

| # | 事实 | 来源 |
|---|---|---|
| F11 | Automation 会话“与其他 Lab 会话一样是装着 soroi 定制的 Main 根会话”，`agent{template}` 步由它派出子 agent；D7 主路径时序为开 Automation 会话 → prompt → `lab_draft_conclusion` → `/api/lab/events {conversation, automation}`。 | (D) `DEC/D12-lab-wire.md:41`（D12-09）；`DEC/D7-lab-backend.md:209-214` |
| F12 | 运行在根会话第一次正式提交时才建立，第一步正式运行在途期间没有运行；正式运行的每次调用开在途槽位，dry run 不开。 | (D) `DEC/D6-store-service.md:33`（D6-05）；`SOR/design/intervention.md:7,16` |
| F13 | D30（[Pepgent/PM#49](https://github.com/Pepgent/PM/issues/49)，本文编写时投票中，Coordination/Argon/LeadMentor 已赞成，ClaudeHigh 未投）AU-1 写明“由该规则的 Automation 会话开出的运行”；AU-4 取舍栏“得到”写“批准者与手动运行人能继续对话、交回槽位、确认会话内结论”。 | (D) PM#49 正文 D30-01、D30-04 行；(R) `council tally D30` |
| F14 | D19-05 的目的之一是首步 Human 槽位能被发现、能交回，实验不会卡在 `sent`；D29-02 以同一目的补了 Discussion 的那一格。 | (D) `DEC/D19-sor13-control-contract.md:33`；`DEC/D29-pepgent-20-slot-overlay.md:32` |

由 F11–F13：Automation 会话发起正式 `soroi_eval` 时，第一步在途期间槽位挂在其 `ConversationWire.slots`，这一状态在主路径上可达；若第一步含 `awaiting_human`，无读方能显示，也就无从交回。`[INFERENCE]`

### 1.4 实现现状与归属

| # | 事实 | 来源 |
|---|---|---|
| F15 | W-09 的实现注释：“a Panel's or Automation's slots with no run ride on its conversation, which page panels carry”；而 `panels()` 只查 `originKind = 'Panel'` 且 owner 为本人、页为本页的会话。Automation 会话头因此不进入任何返回。 | (D) `WT07/apps/web/src/server/lab/catalog.ts:109-111`；`WT07/apps/web/src/server/lab/operations.ts:86-93` |
| F16 | 席位白名单：`apps/web/src/protocol/lab/**`（唯一写方）与 `server/lab/**` 归 W-09；`apps/web/src/client/**` 等前端数据绑定归 W-10。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09）；`DEC/D20-w10-path-boundary.md:31-32`（D20-01、D20-02） |
| F17 | 切片：LAB-07b（[Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20)，open）“读取侧：在途叠加层（`writers` 与 `slots`）……验收：页面线数据中带有在途槽位”；LAB-09（[Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)，open）自动化事件、定时、审批，依 D30 表决中；WEB-05（[Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)，open）“投影：节点库、自动化”，F28–F30。 | (D) `DEC/D8-mvp-scope.md:328,330,339`；(R) `gh issue view` 19/20/25 状态 |
| F18 | 表决类别：跨仓公开契约（wire、失效）与缺失设计须表决；已通过契约内的私有结构由工程师决定；接口表缺项不构成授权。 | (D) `DEC/D10-repo-delivery.md:20`（D10-08）；`SOR/AGENTS.md:123` |

---

## 二、待判问题

### 2.1 闸门 A（交 `Argon`）

- **A-1（已覆盖还是缺口）：** F1–F3 规定了 Automation 槽位挂在 `ConversationWire.slots`、变化发 `conversation{id}`，但 F5–F9 没有任何读取携带 Automation 来源的会话头，失效表也不含 `automation` 页。这是否属于既有决策已覆盖、只需澄清的情形（若是，请指出覆盖它的条文），还是公开 wire 与失效契约的缺失设计（F18）？
- **A-2（意图）：** 若选“Automation 首步无运行时槽位不展示”（处置 e），是否违背 D19-05 的目的（F14）与 D30-04 取舍栏“交回槽位”（F13）？有无 `(U)` 原文直接约束 Automation 会话的可介入性？
- **A-3（范围）：** 缺口是否只限于 `slots`，还是整个 Automation 会话头（`owner`、`agent`、`session`）？例如 GUI 订阅该会话根 agent 的 `watchAgent` 需要 `agent`。

### 2.2 闸门 B（交 `ArgonGovernance`）

- **B-1（承载与席位）：** 若需表决，表决席位为产品/跨组件契约 4 席，还是需加 `domains`？实现承载归哪个 issue：LAB-07b（#20，在途叠加层，验收“页面线数据中带有在途槽位”）还是 LAB-09（#19，自动化），WEB 投影是否由 W-10 的 WEB-05（#25）承接（F16、F17）？
- **B-2（门禁）：** 表决期间，W-09 的 PR#55 与 LAB-09 是否只暂停依赖本缺口的部分（Automation 会话头与其首步槽位的携带），其余照常合入？是否需要等 D30 定案再立案（AU-4 只出现在取舍栏，F13）？
- **B-3（合表）：** 若需表决，是否单独立一张 P0 议案，不并入 D30？

---

## 三、可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | `automation` 页新增 `conversations: ConversationWire[]`：该页 `runs` 中各运行 `conversation` 对应的 Automation 会话头（按 Lab 读取范围，所有成员可见）；D12-17 `conversation` 行失效读取补“`automation` 页（该会话为 Automation 来源时）”。 | 改 `LabPageWire.automation`、D12-17 失效表 | 新增字段；`automation` 频道之外 `conversation{id}` 也使该页重读 |
| b | `AutomationRunWire.conversation` 由 `ConversationId \| null` 改为 `ConversationWire \| null`；失效表同 a。 | 改 `AutomationRunWire`、D12-17 | 运行事实与会话头混在一个类型里 |
| c | 目录新增 Automation 会话头列表。 | 改 `LabCatalogWire`、D12-04 | 每次槽位变化让整个目录重读 |
| d | `panels` 也列 Automation 会话头。 | 改 D12:564 与 D12-08 的 `panels` 定义 | `panels` 是“本人本页 Panel 头”的选择范围，Automation 会话不属于某页 |
| e | Automation 无运行时的槽位不展示，删去 D12-04 挂载表（D29-02）与 D29-04 中的 Automation 格。 | 改挂载规则与 D29-04 | A-2 |

---

## 四、闸门判定后的程序

- A 与 B 都判不越界：免票放行，结论评论写到 B-1 判定的承载 issue，由对应片区经理送达工人。
- 任一判越界：由本实例按 P0 立案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`；涉及 W-10 的 WEB 投影时在事实中写明）。
- 判定写入 `GATE/automation-slots-gate-a.md`（Argon）与 `GATE/automation-slots-gate-b.md`（ArgonGovernance）。
