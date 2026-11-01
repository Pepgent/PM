# D45：WEB-07 AI 面板接线：把 AiPanel 两个文件划给 W-10，只用于加受控端口（解 Pepgent#29 部分 BLOCKED）（P0）——定稿

决策 issue：[Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)。发起：Coordination（DeskPepgent29Blocked）。本文件由议会 daemon 生成。

## 事实

初审材料：[`evidence/gates/pepgent29-aipanel.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent29-aipanel.md)。闸门 A、闸门 B 的判定在同目录 `pepgent29-aipanel-gate-a.md`、`pepgent29-aipanel-gate-b.md`。

**P0 依据。** W-10 在 [Pepgent#29 评论 6564495563](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564495563) 报了部分 BLOCKED，WEB-07 的 PR 要等 AI 面板这一项有结论后才能合入。D1-12 规定：“`P0`（关键路径工程 `BLOCKED` 解阻）”。

**代码事实（Pepgent main 源码，`packages/ui/src/lab/`）：**
- `AiPanel` 自述为“self-contained prototype conversation; no model/network IO”（`ai-panel.tsx:140`）。
- props 只有一个外部回调 `onAction`，没有受控的会话、消息或模型（`ai-panel-model.ts:72-82`）。`reply` 是必填的“fixed reply”（`:44-54`）。
- 发送时，组件在本地追加消息，1100ms 后无条件追加假回复（`ai-panel.tsx:196-225`）。
- 切换会话、新建会话、改名、选择模型都只改内部 state（`:149-156,173-194,292-295,413-422`）。
- 10 个 Lab 页面的 `ui` 渲染了它（`features/lab-*/ui/*-page.tsx`）。

**契约已经齐全，缺的只是组件文件的写方：**
- 各页带 `panels: ConversationWire[]`。`readConversation`、`readModels`、`watchAgent`、`panel.prompt`、`panel.model` 都已定义（`DEC/D12-lab-wire.md:49,380-419,461-462,554-555,603`）。
- 服务端承载：`panel.prompt` 归 LAB-13（D42-03），`panel.model` 归 LAB-14（D44-03）。
- D12 覆盖审计：`reply` 不能当作真实响应，真实文本取自 messages；会话名与 meta 由 `panels[].origin` 和消息生成（`DEC/D12-coverage.md:33-34,143,147`）。
- WEB-07 的验收是“13 个页面，数据都来自后端”（`DEC/D8-mvp-scope.md:343`）。D20-02 已把“固定回复的替换”交给 W-10（`DEC/D20-w10-path-boundary.md:32`）。

**路径边界：**
- `packages/ui/**` 不在任何席位的白名单内。D20-01 与 D35-01 v3 只把 `time-axis.tsx`、`time-axis-model.ts` 划给 W-10，并写明“不扩大到 `packages/ui` 其余文件”（`DEC/D20-w10-path-boundary.md:31`；`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:11,20`）。
- `ai-panel.tsx` 与 `ai-panel-model.ts` 是会话前就有的合法遗产，C5-3.2 只要求不破坏、不回滚（`PM/evidence/exec/d15/pepgent.md:599-616`；D20 Q1【定】）。
- (U) U59：“那是一个跟你无关的agent，你找他干什么？”；C1-2 严禁联系无关会话。`AGENTS.md:123`：接口缺项不能作为移入 D9 的理由。

**表决期间：** W-10 只暂停 AI 面板接线这一支，其余部分照常推进（C2-2.2）。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D45-01 v1 | 把 `ai-panel.tsx`、`ai-panel-model.ts` 划给 W-10，只用于给 AiPanel 加受控端口、删除内部假回复 | D16-09 / D20-01 的 W-10 一行；`packages/ui/src/lab/ai-panel.tsx`、`packages/ui/src/lab/ai-panel-model.ts`，以及 `packages/ui/src/lab/index.ts` 中 ai-panel 的导出行（`:14-26`）；`apps/web/src/renderer/features/lab-*/{controller,model,ui}/**` 中 10 个使用 AiPanel 的页面（W-10，已在白名单内）；WEB-07 / Pepgent#29 | 在 D20-01 的 W-10 白名单中加入 `packages/ui/src/lab/ai-panel.tsx` 与 `packages/ui/src/lab/ai-panel-model.ts`。`index.ts` 中 ai-panel 的导出行只在新增导出类型时补上类型名。<br><br>这两个文件的改动只限以下用途：<br>- **会话：** 会话列表和当前会话改为受控，由调用方传入；切换会话或新建会话时回调 `onSessionChange`。<br>- **消息：** messages 改为受控，由调用方传入。<br>- **发送：** 用户发送和快捷 prompt 都回调 `onSend(text)`。<br>- **模型：** 选择模型时回调 `onModelChange(id)`，当前模型由调用方传入。<br>- **流式文字：** 加一个输入位，接收进行中的流式文字。<br>- **改名：** 改名回调设为可选。Panel 会话没有名称字段，也没有改名命令（D12:172-176、457、552），所以页面不传这个回调。没有回调时，组件不进入本地改名编辑态；会话名的展示元素、类名和样式保持不变（闸门 A 对 Q3 推荐的 (ii)）。<br>- **删除：** 删掉组件内部的 1100ms 定时假回复和 `AiPanelConversation.reply` 字段。各页 controller 里构造 `reply` 的代码一并删除，这些 controller 都在 W-10 白名单内。<br><br>不改 CSS、类名、布局、视觉层级与组件结构；`ai-panel.css` 不写。从最新 `origin/main` 接续，不删除、不回退、不覆盖 U59 已合入的结构和合法语义。PR 正文按 D20-02 逐行列出这些文件改动的行和用途。<br><br>**页面侧接线（W-10 已有路径，WEB-07 交付）：**<br>- 会话列表取本页 `panels`，会话名和 meta 按 D12-coverage:143 生成。<br>- 选中会话后，用 `readConversation` 读正文，用 `readModels` 读当前模型和可选模型。<br>- 发送时发 `panel.prompt{lab, panel:{page, scope}, msg, text}`。没有选中会话时，`scope` 按 D12-coverage:147 取本页的 scope；该 Panel 会话已存在则复用（D12-10）。<br>- 换模型时发 `panel.model`。<br>- 流式文字取所选会话 agent 的 `watchAgent`。消息结束后，按 `conversation{id}` 频道重读（D12-17）。<br><br>不改 wire、protocol、服务端；服务端命令仍由 LAB-13、LAB-14 承载。<br><br>切片只做本仓编译、类型检查和基础检查（C1-3、D16-13）。相关流程统一在 WEB-07 合入后的 S2 中验收，范围不缩减。<br><br>本行通过后，按以下顺序推进：<br>1. 秘书在 D16-09 的 W-10 段与 D20-01 加入这两个文件及用途限定。<br>2. AreaMgrPepgent 在 #29 登记，并送达 W-10。<br>3. W-10 解除 AI 面板这一支的暂停。 | **得到：**<br>- 10 页右栏 AI 接上真实的 Panel 会话、模型和流式文字，WEB-07 的“数据都来自后端”能完整交付，F29 S2 所需的 nodes Panel 会话也可以从 GUI 新建。<br>- 写入授权只放开两个文件的接线用途，视觉层不动，与 D35-01 v3 的先例一致。<br><br>**代价：** W-10 要在 U59 的共享组件里做最少的接线改动。外部会话可能在同一文件上改动，冲突按 rebase 处理。<br><br>**落选：**<br>- (b) 交给视觉层 owner（U59 纯前端会话）：U59 与 C1-2 禁止联系；为此新设前端席位，已在 D35-01 v3 落选。<br>- (c) 条件渲染隐藏 AiPanel：缩减 WEB-07 的“13 页数据都来自后端”，违背 U2；又以接口缺项为由搁置功能，违背 AGENTS.md:123。<br>- 只在 controller 侧换掉 seed：发送路径仍是本地伪造的成功，属于半接线。<br>- 在 `features/.../ui` 自建一个面板来替代 AiPanel：新增组件结构，违背 D20-02。 | 治理 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD45）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D45-Coordination.md`、`votes/D45-ClaudeHigh.md`、`votes/D45-Argon.md`、`votes/D45-LeadMentor.md`、`votes/D45-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。