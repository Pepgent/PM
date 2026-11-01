# 闸门 A 裁决：Automation 来源 `ConversationWire` 无读取携带缺口

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应材料：** `PM/evidence/gates/automation-slots.md`（源自 [D29 / PM#48](https://github.com/Pepgent/PM/issues/48) `ClaudeHigh` 选票非阻断附注第 4 条）
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（从设计到实现与 e2e 全流程走通，不擅自收缩功能范围）、`U96`（公开契约缺失设计事前表决）。`LEDGER.md` 中无专门针对 `Automation` 会话头的单条用户原话（`F10`）。
  - `(D)` `DEC/D7-lab-backend.md:64,68,70,209-214`、`DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D12-lab-wire.md:36,40-41,51-58,156-162,261-305,356,564,582-590`、`DEC/D19-sor13-control-contract.md:33`（D19-05②）、`DEC/D29-pepgent-20-slot-overlay.md:32,34`、[PM#49 / D30](https://github.com/Pepgent/PM/issues/49)（`D30-01`、`D30-04`）。

---

## 一、对待判问题（`A-1` 至 `A-3`）的逐项裁决

### 1. A-1（已覆盖还是缺口）：**属于公开 wire 与失效契约的缺失设计（须 P0 投票，不可免票澄清放行）**

- **事实依据：**
  - `D19-05②`、`D12-04`（含已通过的 `D29-02`）与 `D12-17`（含已通过的 `D29-04`）明确规定：当 `Automation` 会话尚无 `Open` 运行时，其在途槽位挂在该会话头的 `ConversationWire.slots` 上，槽位变化发 `conversation{id}`。
  - 但现行 `D12` 中：`LabCatalogWire.discussions` 只含 `Discussion` 会话头（`F5`）；各页 `panels` 只含当前用户本页的 `Panel` 会话头（`F6`）；`LabPageWire.automation` 的 `runs: AutomationRunWire[]` 只携带 `conversation: ConversationId | null`（`F7`）；`lab.conversation.read` 返回的 `ConversationDetailWire` 明确不重复携带 `ConversationWire` 会话头（`F8`）；且 `D12-17` 中 `conversation` 频道的失效读取列表不包含 `automation` 页（`F9`）。
- **判定：** 现行条文中没有任何读取接口返回 `origin.kind = 'Automation'` 的 `ConversationWire`，也没有让 `conversation{id}` 失效 `automation` 页的规则。按 `D10-08`（`F18`）与 `AGENTS.md:123`（接口表缺项不构成授权），这不属于既有条文已覆盖的澄清，而是**公开 wire 结构与 `D12-17` 失效表的缺失设计，必须立案 P0 表决**。

### 2. A-2（意图：处置 `e` 是否违背意图与既有决策）：**违背 `U2`/`U23` 全流程完整交付意图及 `D19-05②`、`D29-02/04`、`D30-04` 既有结论，反对处置 `e`**

- 虽然 `LEDGER.md` 无专门点名 `Automation` 会话头的 `(U)` 原话，但：
  1. `D7-04` 与 `D12-09` 规定 `Automation` 会话与 `Discussion`、`Panel` 一样是装着完整 soroi 定制的 `Main` 根会话（`F11`），可以发起正式运行并在首步产生 `awaiting_human` 在途槽位（`F12`、`F13`）；
  2. `D19-05②` 与 `D29-02/04` 专门将 `Automation` 列入无运行时在途槽位的四个挂载位置之一，目的正是保证首步 `awaiting_human` 槽位可被发现与交回（`F14`），`D30-04`（AU-4）也明确以“批准者与手动运行人能继续对话、交回槽位、确认会话内结论”作为设置 `conversation.owner` 的依据（`F13`）；
  3. 若选处置 `e` 删去 `Automation` 无运行时的槽位展示，不仅直接推翻刚通过的 `D19-05②` 与 `D29-02/04`，还会导致 `Automation` 会话在首步需要人工介入时死锁在不可见的槽位上，并在 `A-3` 指出的整个会话头读取上留下空白，违背 `(U) U2`、`U23`。

### 3. A-3（范围：只缺 `slots` 还是缺整个 `Automation` 会话头 `ConversationWire`）：**缺的是整个 `Automation` 会话头 `ConversationWire`（含 `owner`、`agent`、`session`、`slots` 等全部字段）**

- `ConversationDetailWire`（`lab.conversation.read`）只返回 `{ conversation: ConversationId, messages, attachments, conclusions, context, artifacts, ircQueue }`，不携带 `ConversationWire = { id, lab, owner, origin, agent, session, slots, createdAt }`（`F4`、`F8`）。
- 前端展示与操作一条已开出会话的 `automation_run` 时，不仅需要无运行时的 `slots`，还需要：
  - `agent: AgentId | null`：用于调用 `watchAgent`（`GET /api/lab/agents/{id}/stream`）订阅该 `Automation` 根会话的实时流；
  - `owner: MemberId`：用于判定当前成员是否为该 `Automation` 会话的 `owner`（`D30-04`），从而决定能否向该会话发消息、`human.irc`、交回/接管槽位或确认会话内结论；
  - `session: SessionId | null` 与 `slots: SlotWire[]`：用于展示和介入首步在途槽位。
- 因此，补齐 `Automation` 来源的 `ConversationWire` 读取携带，即可用既有 `ConversationWire` 类型一次性闭合 `owner`、`agent`、`session` 与 `slots`，无需拆分零散字段。

---

## 二、对可选处置（`a` 至 `e`）的逐项判定

| 代号 | 处置概述 | 闸门 A 判定（是否可免票 / 须 P0） | 闸门 A 审查意见与排序 |
|---|---|---|---|
| **a** | `LabPageWire.automation` 新增 `conversations: ConversationWire[]`（该页 `runs` 中各运行 `conversation` 对应的 Automation 会话头，按 Lab 读取范围全员可见）；`D12-17` `conversation` 行失效读取补“`automation` 页（该会话为 Automation 来源时）” | **须 P0 投票（改 `LabPageWire.automation` 与 `D12-17` 公开契约，不可免票）** | **【推荐作为 P0 主案】** 严格遵循 `D12-08`“会话头在目录或页面、`lab.conversation.read` 不重复会话头”的分层；保持 `AutomationRunWire` 与 `ConversationWire` 各自职责正交；按 `D12:564` 全 Lab 成员可见（不与只列本人本页 Panel 的 `panels` 混淆）；也不会像放进 `catalog` 那样在槽位变化时引起全站目录重读。 |
| **b** | `AutomationRunWire.conversation` 由 `ConversationId \| null` 改为 `ConversationWire \| null`；失效表同 `a` | **须 P0 投票（改 `AutomationRunWire` 与 `D12-17` 公开契约，不可免票）** | **【可作备选写进取舍栏】** 能闭合同一缺口，但将运行记录外键与完整会话头耦合在同一类型中，正交性不如 `a`。 |
| **c** | `LabCatalogWire` 新增 Automation 会话头列表 | **须 P0 投票（改 `LabCatalogWire` 与 `D12-04`，不可免票）** | **【落选】** Automation 会话只在 `automation` 页消费，放入全站目录既膨胀 `catalog`，又与 `D29-04` 按 `conversation{id}` 局部失效的设计不符。 |
| **d** | `panels` 也列 Automation 会话头 | **须 P0 投票（改 `D12:564` 与 `D12-08` 语义，不可免票）** | **【落选】** `panels` 定义为“当前用户本人、本页的 `Panel` 会话头选择范围”（`F6`），而 `Automation` 会话不属于某个页面的右栏 `Panel`，且按 `D12:564` 应对同一 Lab 全体成员可读。 |
| **e** | Automation 无运行时的槽位不展示，删去 `D12-04`（`D29-02`）与 `D29-04` 中的 Automation 格 | **须 P0 投票，且本席反对** | **【反对】** 违反 `U2`/`U23` 全流程完整交付意图，推翻已通过的 `D19-05②`、`D29-02/04` 与 `D30-04`，且使 `Automation` 会话在整套公开 wire 上彻底失去 `ConversationWire`（含 `owner`、`agent`、`session`、`slots`）的读取入口。 |
