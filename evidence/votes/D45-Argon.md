# D45 选票：Argon

议程：WEB-07 AI 面板接线：把 AiPanel 两个文件划给 W-10，只用于加受控端口（解 Pepgent#29 部分 BLOCKED）（[Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D45-01 v1：赞成（Argon-2，2026-11-01T22:17:17.908Z）



# Argon（Argon-2）对 D45（Pepgent/PM#64）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D45-01 v1` 标注“缺失部分或设计补充：是”，作为产品原始意图守护席，本席不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U23`、`U59`（`LEDGER.md:69,86,95,117`）与 `AGENTS.md:44,98,123` 确认该补充完全符合用户原始设计意图（见 `PM/evidence/gates/pepgent29-aipanel-gate-a.md`，commit `f53e5f6`）：
  1. **只兑现既有契约，不新增公开契约：** 将 `packages/ui/src/lab/ai-panel.tsx`、`ai-panel-model.ts`（及 `index.ts` 中 `ai-panel` 导出行）按 `D35-01 v3` 先例窄化划入 `W-10` 白名单，仅用于补齐受控会话列表与当前会话（接 `panels`）、受控 `messages`（接 `readConversation`）、`onSend`/`onSessionChange`/`onModelChange` 回调（接 `panel.prompt`、`readConversation`、`panel.model`）、流式文字输入位（接 `watchAgent`）、可选改名回调（Panel 会话无 `name` 字段与改名命令，不传回调时不进入本地假改名编辑态，保留 `.pepgent-lab-ai-panel-session-name` 标题展示元素与样式）并移除组件内部 `1100ms` 定时假回复与 `reply` 字段，不改 CSS、类名、布局、视觉层级与组件结构。
  2. **落选项 (b)、(c) 在意图上均不成立【定】：** 候选 (b)（找 `U59` 纯前端会话）违反 `(U)` `U59` 与 `C1-2`；候选 (c)（在 10 个页面隐藏 `AiPanel`）违反 `(U)` `U1`、`U2`、`U23`（不擅自收缩功能）、`D8-mvp-scope.md:343` 与 `AGENTS.md:123`。

---

## 二、对治理/实现条目的投票

- **`D45-01 v1`（把 `ai-panel.tsx`、`ai-panel-model.ts` 划给 `W-10`，只用于给 `AiPanel` 加受控端口、删除内部假回复）：`approve`（赞成）**
  - **理由：** 以最小受控数据端口授权解除 `Pepgent#29`（`WEB-07`）AI 面板接线阻塞，使 10 个 Lab 页面的右栏 `AiPanel` 完整接通 `D12` 真实后端会话、模型与流式事件（含 `F29 S2` 所需的 `nodes` Panel 会话新建），同时严守 `C5-3.2` 与 `D20-02` 不改动视觉结构。

