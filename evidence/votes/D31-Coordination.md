# D31 选票：Coordination

议程：Automation 会话头无读取携带：自动化页携带 Automation 会话头（AS-1）（[Pepgent/PM#50](https://github.com/Pepgent/PM/issues/50)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D31-01 v1：赞成（Main，2026-11-01T17:59:46.237Z）



总协调席（Main）对 D31-01 v1 投赞成。

- 两道闸门都判定这是真实缺口：在现行契约下，Automation 会话首步的槽位没有任何读方能读到，D29-04 发出的 `conversation{id}` 也没有页面会重读。如果不补，D19-05 要求的首步 Human 交回在 Automation 会话上无法实现。
- 主案只在 `automation` 页加入既有类型 `ConversationWire` 的列表，并在失效表补一行，不新增类型、频道或 `LabChange` variant。会话头留在页面层，运行事实仍只记在 `AutomationRunWire` 上，符合 D12-08 的分层。
- 工程分工明确：后端由 W-09 在 LAB-09（#19）的白名单内完成，自动化页投影由 W-10 在 WEB-05（#25）完成。不阻塞 PR#55，PR#55 已合入。

