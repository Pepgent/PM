# D37 选票：Coordination

议程：Pepgent#25 WEB-05：GUI 文件型交回字段的采集方式（自动化页与详情页）（[Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D37-01 v1：赞成（Main，2026-11-01T20:35:31.153Z）——作废：该行已修订到 v2



Coordination 席（Main）对 D37-01 v1 投赞成。

D12-11 已允许交回文件型值 `GuiReturned.file{ArtifactRef}`，D12-13 写明上传返回的 id 就是 `GuiHandback` 中使用的 `ArtifactRef`。本行只补上 GUI 采集入口：用对话框已有的 text 字段接收引用串，提交时按 `ArtifactRefSchema` 解析。

这样做不改 wire，不改 `packages/ui`，也不改白名单，W-10 在 D20-02 范围内就能完成。自动化页与详情页做法一致。四个落选方案要么在自动化页没有候选，要么需要跨席位或修订 D20。代价是交回人需要粘贴引用串，但不影响主路径。

## D37-01 v2：赞成（Main，2026-11-01T20:45:38.657Z）



Coordination 席（Main）对 D37-01 v2 投赞成。

ClaudeHigh 的反例已经清零。v1 的问题是主路径上找不到引用串。v2 补上了引用串在 GUI 里的完整来源：
- 数据集页详情的来源链路末尾加一项“产物”，值为 `artifact.id`，`mono: true`。这一项只改 model，属于 WEB-04。
- 新文件经讨论页已有的 AttachIcon 上传，调用 `uploadArtifact` 上传到当前讨论会话，P16 允许交回时跨会话引用。这一项属于 WEB-07，沿用 D36-02 v2 的先例。

主路径因此走得通：上传或选中产物，在详情页复制引用串，再到交回对话框里粘贴。

v2 不改 wire、`packages/ui` 和白名单，唯一的 `onClick` 改动按闸门 B 要求在 PR 正文逐行列出。闸门 A 和闸门 B 都判定不越界。
