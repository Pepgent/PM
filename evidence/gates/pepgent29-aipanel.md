# Pepgent#29（WEB-07）AI 面板部分 BLOCKED 的初审材料

- **issue：** [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)，工人 W-10（`pepgent-web` 席）。BLOCKED 评论：[issuecomment-6564495563](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564495563)。W-10 只报了部分 BLOCKED，没有自选候选方案，其余部分照常推进。
- **编制：** governance-desk 实例 `DeskPepgent29Blocked`，属总协调席，与 Main 合计 1 票。下文分类是起草者的初分，不是裁决。
- **程序（`SOR/AGENTS.md:60`，C2-2.2）：** 闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都判不越界的项，在 #29 按既有正文作答、免票放行；任一闸门判越界的项，立为 P0 议程。表决期间只暂停受阻分支，也就是 AI 面板接线。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`，下文逐条用源码复核。本实例只读决策正文和源码：源码取自 `gh api` 下载的 Pepgent `main` 源码包，2026-11-02 取回，解压在 `/tmp`。没有读 git 历史或 session，没有运行构建或测试，没有触碰 Pepgent 根 checkout（U59）。

路径简称：`SOR/` = `pepgent-soroi/`；`DEC/` = `pepgent-pm/evidence/decisions/`；`UI/` = Pepgent `packages/ui/src/lab/`；`F/` = Pepgent `apps/web/src/renderer/features/`。

---

## 一、事实

| # | 事实 | 来源 |
|---|---|---|
| F-1 | `AiPanel` 自述是“self-contained prototype conversation; no model/network IO”。props 只有 `conversation`、`models`、`copy`、`showLabel`、`resetKey` 和 `onAction`，没有发送、会话切换或模型切换的回调，也没有受控的 messages 或流式文字输入。`AiPanelConversation.reply` 是必填 string，注释写明“The fixed reply every sent message receives”。 | (D) `UI/ai-panel.tsx:140`；`UI/ai-panel-model.ts:44-54,72-82` |
| F-2 | 用户发送后，`send()` 先在组件内追加 user 消息，1100ms 后无条件追加 `conversation.reply` 作为 assistant 回复。快捷 prompt 走同一个 `send()`。 | (D) `UI/ai-panel.tsx:196-212,214-225` |
| F-3 | 当前会话、新建会话、改名和选模型都只改组件内部 state，不通知外部。 | (D) `UI/ai-panel.tsx:149-156,173-194,292-295,413-422` |
| F-4 | 10 个 Lab 页面的 `ui` 渲染 `<AiPanel>`：automation、clusters、containers、datasets、experiment-detail、experiments、flow-editor、home、node-library、settings。各页 controller 用 `useMemo<AiPanelConversation>` 构造 fixture。 | (R) `grep -rn "<AiPanel" F/`：`automation-page.tsx:51`、`clusters-page.tsx:308`、`containers-page.tsx:80`、`datasets-page.tsx:59`、`experiment-detail-page.tsx:85`、`experiments-page.tsx:57`、`flow-editor-page.tsx:67`、`home-page.tsx:73`、`node-library-page.tsx:98`、`settings-page.tsx:68` |
| F-5 | **wire 已经齐全：** 各页都带 `panels: ConversationWire[]`；`readConversation`、`readModels` 和 `watchAgent` 已有确切签名；`panel.prompt` 与 `panel.model` 两个命令及其权限已定义。流式文字走 `watchAgent`。`panels` 只列当前用户自己的 Panel 会话头，是页面的选择范围。服务端承载已经划定：`panel.prompt` 归 LAB-13（D42-03），`panel.model` 归 LAB-14（D44-03）。 | (D) `DEC/D12-lab-wire.md:49,380-406,413-419,461-462,554-555,603`；`DEC/D42-lab-entry-ownership.md:42`；`DEC/D44-lab-entry-batch2.md:48` |
| F-6 | **数据映射已有正文：** D12 覆盖审计写明：`reply` 和演示 actions 不能当作真实响应，真实文本必须来自 messages；`ai.sessions[].name/meta` 由 `panels[].origin` 的 page/scope 和消息时刻、条数生成；`ai.scope.value` 按页取已知名称或 Panel 的 `origin.scope`。 | (D) `DEC/D12-coverage.md:33-34,143,147` |
| F-7 | **WEB-07 的交付与验收：** 交付内容包括“运行时不再引用 `LAB_SNAPSHOT`”；验收是“构建好的 host 在浏览器中走完 13 个页面，数据都来自后端”。路径限 D20-01/02，保留 U59 的合法结构与语义，不联系无关前端会话。 | (D) `DEC/D8-mvp-scope.md:343` |
| F-8 | D20-02 规定 W-10 在 `features/lab-*/ui/**` 写“演示 id 与固定回复的替换……以及完成上述各项所需的最少 props 和条件渲染”；不改 CSS、主题、类名、布局、视觉层级和组件结构。 | (D) `DEC/D20-w10-path-boundary.md:32` |
| F-9 | **`packages/ui` 不归任何席位：** D16-09 的 W-10 段没有列 `packages/ui`。D20-01 和 D35-01 v3 只把 `UI/time-axis.tsx`、`UI/time-axis-model.ts` 授权给 W-10，并写明“不扩大到 `packages/ui` 其余文件”。D35 的事实栏写明：“`packages/ui/**` 不在 D16-09、D20-01、D25 的任何席位白名单内”。D37-01 v2 为避开 `packages/ui` 里的 `ActionDialog`，改用已有 `text` 字段。 | (D) `DEC/D16-phaseB-review-restore.md:33`（W-10 段）；`DEC/D20-w10-path-boundary.md:31`；`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:11,20`；`DEC/D37-pepgent25-gui-file-handback.md:15,23` |
| F-10 | **U59 与 `packages/ui`：** D15 盘点中，U59 会话的提交改过 `packages/ui/src/lab/` 下的多个文件，其中有 `ai-panel.css`；`ai-panel.tsx` 与 `ai-panel-model.ts` 不在该差集内，属于会话前已经存在的合法遗产。C5-3.2 只要求不破坏、不回滚这些成果。D20 Q1【定】：“C5-3.2 与 U59 只保护不破坏、不回滚 U59 会话已合入的合法成果，不表示它改过的文件永久不得再改”。 | (D) `PM/evidence/exec/d15/pepgent.md:533,599-616`；`SOR/AGENTS.md:98`；`DEC/D20-w10-path-boundary.md:12` |
| F-11 | U59：“那是一个跟你无关的agent，你找他干什么？”。C1-2 规定严禁触碰 Pepgent 根 checkout，也严禁联系无关会话。D35-01 v3 的落选项已排除“新设前端席位：只为两个属性增设席位”。 | (U) `SOR/LEDGER.md:117`；(D) `SOR/AGENTS.md:44`；`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20` |
| F-12 | `SOR/AGENTS.md:123`：“接口或权限表缺少某项不构成授权：禁止据此放开权限……或把功能移入 D9”。U2：“不要擅自收缩”。 | (D) `SOR/AGENTS.md:123`；(U) `SOR/LEDGER.md:95` |
| F-13 | Panel 会话的 origin 是 `{kind:'Panel'; page; scope}`，没有 name 字段。改名命令只有 `discussion.rename`，权限限讨论 owner。`panel.prompt` 的规则是：Panel 会话不存在时以操作者为 owner 新建，存在时操作者须是其 owner。 | (D) `DEC/D12-lab-wire.md:172-176,457,552,554` |
| F-14 | `UI/index.ts:14-26` 导出 `AiPanel` 和 `ai-panel-model` 的类型，各页 controller 经 `@pepgent/ui/lab` 引用这些类型。 | (D) `UI/index.ts:14-26` |

## 二、三项核对（brief 指定）

1. **D20、D16-09 的白名单和 U59。** W-10 白名单内没有 `UI/ai-panel.tsx`、`UI/ai-panel-model.ts`（F-9），其中 `packages/ui` 只放开了 time-axis 两个文件。U59 只保护 U59 会话的合法成果不被破坏或回滚，不禁止经授权的最少接线（F-10）；但也不能把活派给 U59 会话（F-11）。
2. **既有决策里 AiPanel 的接线归属。** 没有任何决策正文点名 `AiPanel` 或 `ai-panel*`（(R) `grep -rn "AiPanel\|ai-panel" DEC/`，命中只有 D15 盘点里的 `ai-panel.css`）。客户端数据侧归 W-10 已有依据：WEB-07 要求数据都来自后端（F-7），D20-02 列明“固定回复的替换”（F-8），D12 覆盖审计给了数据映射（F-6）。服务端两个命令分别归 LAB-13、LAB-14（F-5）。缺的只是组件文件本身的写方。
3. **`packages/ui` 归哪个席位。** 不归任何席位（F-9）。唯一先例是 D35-01 v3：对 time-axis 的两个文件按 P0 表决，限定用途后授权给 W-10，并要求“不改视觉、PR 正文逐行列出”。

## 三、初审结论（起草者初分）

- **类别：K4，缺写入授权。** 契约、wire、数据映射和服务端承载都已齐全（F-5、F-6），只是组件文件没有写方（F-9）。这和 D35-01 是同一形态。W-10 的候选 (b) 违反 U59 和 C1-2，而且同类方案已在 D35-01 落选（F-11）；候选 (c) 缩减 WEB-07 的“13 页数据都来自后端”（F-7），触及 U2 和 `AGENTS.md:123`（F-12）。剩下的只有候选 (a)。扩白名单属于 D16-09 席位白名单修订，先例 D35-01 v3 是按 P0、`governance` 领域五席表决的。
- **起草者的议案草案（候选 a，按 D35-01 v3 的写法收窄）：**
  - **where：** D16-09 / D20-01 的 W-10 一行；`UI/ai-panel.tsx`、`UI/ai-panel-model.ts`；`UI/index.ts` 中 ai-panel 的导出行，仅在新增导出类型时补列名。
  - **用途只限以下几项：**
    - 让会话列表与当前会话受控，数据源为 `panels`；
    - 让 messages 受控，数据源为 `readConversation`；
    - 新增 `onSend`、`onSessionChange`、`onModelChange` 回调，分别接 `panel.prompt`、读取所选会话、`panel.model`；
    - 加流式文字的输入位，数据源为 `watchAgent`；
    - 删除组件内部的定时假回复和 `reply` 字段。
  - **不改：** CSS、类名、布局与视觉外观。
  - **PR 正文：** 按 D20-02 逐行列出这些文件的改动。
  - **U59 遗产：** 从最新 `origin/main` 接续，不删除、不回退、不覆盖 U59 的合法结构。
- **请闸门判定的具体问题：**
  - **Q1（闸门 B）：** 把 `UI/ai-panel.tsx`、`UI/ai-panel-model.ts`（以及 `UI/index.ts` 的导出行）划给 W-10，是否属于越过 D16-09 / D20-01 白名单、必须按 P0 表决的事项？`domains` 是否为 `governance`（五席，门槛 4）？
  - **Q2（闸门 A）：** 用途清单是否只是兑现 F-5、F-6 已有的契约，不新增公开契约或意图？候选 (b)、(c) 在意图上是否都不成立？
  - **Q3（闸门 A）：** Panel 会话没有名称字段，也没有改名命令（F-13），组件现有的“改名”控件怎么处理：(i) 保留现状，只改本地显示，不接 wire；(ii) 不向 Panel 暴露改名，由 W-10 经最少 props 隐藏；(iii) 其他。另外，“新建会话”按 D12-10 的 `panel.prompt`（`{page, scope}`，存在即复用）接线，是否属于契约内的私有实现（K3）？
- **不受阻的部分：** W-10 评论“不受阻、照常推进”所列的各项继续推进，与本项无关。
