# 闸门 A 裁决：Pepgent#29（WEB-07）AI 面板 `AiPanel` 受控端口与白名单接线

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（[BLOCKED 评论 6564495563](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564495563)），`PM/evidence/gates/pepgent29-aipanel.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86,95`：已有前端界面接通后端，不要擅自收缩）、`U59`（`LEDGER.md:117`：“那是一个跟你无关的agent，你找他干什么？”）。
  - `(D)` `SOR/AGENTS.md:44,60,98,123`（C1-2、C2-2、C5-3.2、禁止把已定第一版功能移入 D9）、`DEC/D7-lab-backend.md:67,75`（D7-07、D7-15）、`DEC/D8-mvp-scope.md:343`（`WEB-07` 13 个页面数据都来自后端，运行时不再引用 `LAB_SNAPSHOT`）、`DEC/D12-lab-wire.md:49,172-176,380-406,413-419,457,461-462,552,554-555,603`、`DEC/D12-coverage.md:19,33-34,143-148`、`DEC/D20-w10-path-boundary.md:12,31-32`、`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:11,20`、`DEC/D42-lab-entry-ownership.md:42`、`DEC/D44-lab-entry-batch2.md:48`。

---

## 一、闸门 A 总体判定

| 问题 | 闸门 A 判定 | 结论摘要 |
|---|---|---|
| **Q2：`AiPanel` 用途清单是否只兑现既有契约、候选 (b)(c) 是否意图不成立** | **用途清单完全符合既有契约与产品意图；候选 (b)、(c) 在产品原始意图上均不成立【定】** | 候选 `(a)` 的受控端口清单（受控会话列表与当前会话接 `panels`、受控 `messages` 接 `readConversation`、`onSend`/`onSessionChange`/`onModelChange` 接 `panel.prompt`/`readConversation`/`panel.model`、流式文字输入位接 `watchAgent`、移除组件内 `1100ms` 定时假回复，不改 CSS/类名/布局/视觉外观）仅兑现 `D12`、`D12-coverage`、`D8:343` 与 `D20-02` 已定契约，不新增公开契约；因 `packages/ui/src/lab/ai-panel.tsx`、`ai-panel-model.ts`（及 `index.ts` 导出行）不在 `D16-09`/`D20-01` 的 `W-10` 白名单内，同意参照 `D35-01 v3` 先例按 P0 立案授予防御性收窄白名单。 |
| **Q3：Panel 会话改名控件处置与“新建会话”接线（K3）** | **不改公开契约；推荐 `(ii)`（保留标题展示样式，不传 `onRename` 时不进本地假改名态），且“新建会话”按 `panel.prompt`（`{page, scope}` 存在即复用、不存在即新建）接线属 K1+K3 契约内实现** | `Panel` 会话的 `origin` 为 `{kind:'Panel'; page; scope}`，无 `name` 字段与改名命令（`D12-lab-wire.md:172-176,552`）；“新建会话”切到当前页 `{page, scope}` 并由 `panel.prompt` 按需新建或复用会话，完全属于 `D12-10` 契约内的客户端实现（K1+K3）。 |

---

## 二、逐项详细依据

### 1. Q2：候选 `(a)` 用途清单与排除候选 `(b)`、`(c)` 的本意裁决【定】

1. **用途清单只兑现 `D12`、`D12-coverage` 与 `D20-02` 既有契约，不新增公开契约：**
   - **会话头与正文：** `D12-08` 与 `D12-coverage.md:143-147` 已规定各页 `panels: ConversationWire[]` 提供当前用户本页的 Panel 会话头，`ai.sessions[].name/meta` 由 `panels[].conversation.origin`（`page`/`scope`）及消息时刻/条数生成，消息正文与 `changes` 块来自 `readConversation`（`panels[].messages` 与 `attachments`），模型列表来自 `readModels`。
   - **发送、模型切换与流式文字：** `D12-10` 与 `D7-15` 已定义 `panel.prompt`（承载于 `LAB-13`，`D42-03`）与 `panel.model`（承载于 `LAB-14`，`D44-03`），`D12-17` 已定义 `watchAgent` 流式文字帧。
   - **移除 `1100ms` 定时假回复：** `D12-coverage.md:19,33-34` 明确规定：“**K 不允许保存演示 AI 回答或伪造运行结果**……其中 `reply` / 演示 actions 不能作为真实响应；真实文本必须来自 messages”；`D20-02`（`DEC/D20-w10-path-boundary.md:32`）亦写明“演示 id 与固定回复的替换”。在 `AiPanel` 中移除 `replyTimer` 定时假回复（注：`AiPanelConversation.reply` 在类型上可设为可选 `reply?: string` 或不再被组件消费，以免破坏尚未删除的 `AiConversationFixture` 静态兼容），是兑现 `WEB-07`（`D8-mvp-scope.md:343`）“13 个页面数据都来自后端”的必要条件。
2. **候选 `(b)` 与 `(c)` 在产品原始意图上均不成立【定】：**
   - **候选 `(b)`（找 U59 / 纯前端会话改组件）违反 `(U)` `U59` 与 `C1-2`：** 用户在 `U59`（`LEDGER.md:117`）明确训诫“那是一个跟你无关的agent，你找他干什么？”，`C1-2`（`AGENTS.md:44`）严禁联系无关前端会话；且 `D20` Q1【定】（`DEC/D20-w10-path-boundary.md:12`）与 `D35-01 v3` 已确立 `C5-3.2` 只保护不破坏、不回滚 `U59` 合法视觉结构，不禁止经议会授权由 `W-10` 在 `packages/ui` 指定文件上补充最少受控数据端口。
   - **候选 `(c)`（在 10 个页面隐藏 `AiPanel`）违反 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`：** 用户在 `U1`、`U2`、`U23`（`LEDGER.md:69,86,95`）明确要求已有前端界面接通后端、“不要擅自收缩”，`D8-mvp-scope.md:343` 要求 `WEB-07` 走完 13 个页面且数据来自后端；把 10 个页面的 `AiPanel` 隐藏属于擅自缩减第一版已定功能，直接违反用户本意。

### 2. Q3：Panel 会话改名控件与“新建会话”接线

1. **Panel 会话改名控件处置（推荐 `(ii)`，对 `(i)`/`(ii)` 均不否决）：**
   - 按 `D12-lab-wire.md:172-176,457,552`，`Panel` 会话的 `origin` 是 `{ kind: 'Panel'; page: LabPage; scope: string }`，服务端不存 Panel 自定义名称，命令联合中也只有 `discussion.rename` 而无 `panel.rename`；按 `D12-coverage.md:143`，`ai.sessions[].name` 由 `origin` 的 `page`/`scope` 投影生成。
   - 在 `packages/ui/src/lab/ai-panel.tsx:324-360` 中，`.pepgent-lab-ai-panel-session-name` 本身承载当前会话标题显示。推荐采用 **`(ii)` 的受控只读收敛方式**：保留 `.pepgent-lab-ai-panel-session-name` 标题元素的 DOM 结构、CSS 类名与名称展示（不隐藏会话标题本身），仅在未传入改名回调（或禁用改名）时不切换到 `headerMode.kind === 'rename'` 文本框、不显示误导性的“重命名”提示，从而既遵守 `D20-02`（不改布局与视觉结构），又遵守《权威源头与生命周期》（不在无后端权威源的 Panel 会话上提供刷新即丢失的本地假改名）。（若议案保留 `(i)` 仅作组件内部瞬态 state，同样不改变 wire 契约，本席亦不行使否决权，但 `(ii)` 更符合权威源头原则。）
2. **“新建会话”按 `D12-10` `panel.prompt` 接线属 K1+K3（免增命令契约）：**
   - 按 `D12-lab-wire.md:461,554`，Panel 会话按 `(lab, owner, page, scope)` 唯一标识，`panel.prompt` 规定“Panel 会话不存在时以操作者为 owner 新建，存在时须是其 owner”，线协议无单独的 `panel.create` 命令。
   - 因此，点击“新建会话”（或切换到当前页/当前焦点对象的 `{page, scope}`）并在用户发送首条消息时调用 `panel.prompt({ lab, panel: { page, scope }, msg, text })` 完成按需新建或复用，完全是兑现 `D12-10` 既有契约的客户端内部实现（K1+K3），无需新增任何协议变体。
