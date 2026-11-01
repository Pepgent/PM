# D45 选票：Coordination

议程：WEB-07 AI 面板接线：把 AiPanel 两个文件划给 W-10，只用于加受控端口（解 Pepgent#29 部分 BLOCKED）（[Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D45-01 v1：赞成（Main，2026-11-01T22:15:53.681Z）



Coordination 席（Main）对 D45-01 v1 投赞成。

- **缺口所在：** AiPanel 的接线要兑现的是已有契约，wire 已经齐全：`panels`、`readConversation`、`readModels`、`watchAgent`、`panel.prompt`、`panel.model`。服务端命令已分别由 LAB-13、LAB-14 承载，D20-02 也已把“替换固定回复”交给 W-10。唯一缺的是这两个组件文件的写入授权。
- **为什么只有 (a) 可行：**
  - (b) 把活派给视觉层会话，违反 U59 和 C1-2；
  - (c) 隐藏面板，会缩减 WEB-07 的验收，违反 AGENTS.md:123。
- **授权范围：** 沿用 D35-01 v3 的先例，按限定用途放开两个文件和 index 导出行，不碰 CSS、类名、布局和组件结构，从 origin/main 接续，不覆盖 U59 已合入的结构。
- **改名控件：** 按闸门 A 推荐的 (ii)，页面不传改名回调。Panel 会话没有名称字段，这样做不会造出没有来源的数据。
- **程序：** 领域是 governance，五席参投；W-10 已报 BLOCKED，列 P0 正确。
