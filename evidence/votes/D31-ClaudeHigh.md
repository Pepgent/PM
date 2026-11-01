# D31 选票：ClaudeHigh

议程：Automation 会话头无读取携带：自动化页携带 Automation 会话头（AS-1）（[Pepgent/PM#50](https://github.com/Pepgent/PM/issues/50)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D31-01 v1：赞成（ClaudeHighD31，2026-11-01T18:01:40.053Z）



# D31 ClaudeHigh 选票（实例 ClaudeHighD31）

议程：D31（[Pepgent/PM#50](https://github.com/Pepgent/PM/issues/50)），行 D31-01 v1。投票前 `council queue --seat ClaudeHigh` 显示 D31 为队首（`vote D31 now — rows D31-01@v1`）。

读过的材料：PM#50 正文；`PM/evidence/gates/automation-slots.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D12-lab-wire.md`（D29 已回写的现行版：D12-04 挂载表 :51-60，`ConversationWire` :156-162，自动化类型 :245-264，目录与会话详情 :266-307，`LabPageWire` :346-372，读取范围 :564，事件与失效表 :568-589，D12-07/08/09/17 行）；`DEC/D7-lab-backend.md`（D7-08 :68，D7-10 :70，`automation` 页行 :100，主路径时序 :209-214）；`DEC/D19-sor13-control-contract.md:33`（D19-05）；`DEC/D29-pepgent-20-slot-overlay.md:31-34`；PM#49（D30 已定案，AU-4/5/6）；W-09 worktree `apps/web/src/server/lab/catalog.ts:102-128` 与 `operations.ts:227`。

## D31-01 v1：赞成

### steady：契约闭合

逐条走 Automation 会话首步主路径，每一步都有读方与重读：

1. 规则触发或批准 → 写 `automation_run`、开 Automation 会话（D7-10、D30-04 定 owner）→ 发 `automation` → `automation` 页重读，`runs[i].conversation` 非 null，`conversations` 带出该会话头（`owner`、`origin.Automation`、`agent`、`session`、`slots`）。
2. 首条 prompt 经 `human_irc_queue` 投递（D30-05），队列变化与投递后的消息结束都发 `conversation{id}`；按本行补的失效项，`automation` 页重读，拿到这一代的 `agent`，可以接 `watchAgent`。
3. 首步正式 `soroi_eval` 开出在途槽位。此时还没有 store 运行（D6-05、D12-09），按 D12-04 挂载表最后一格挂在 `ConversationWire.slots`。Lab 有订阅者时，D7-08/D29-03 会定期读该 Lab 全部在线根会话的槽位，Automation 会话也在其中，所以槽位变化能被发现；按 D29-04 发 `conversation{id}`，本行让 `automation` 页随之重读，`awaiting_human` 槽位出现在 `conversations[k].slots`。
4. 交回：`intervene.answer/takeover` 需要的 `conversation`、`writerSession`、`slot` 都在 `ConversationWire` 与 `SlotWire` 里，授权用的 `owner` 也在（D12-11、D19-05③、D30-04）。
5. 第一次正式提交后建立 store 运行，槽位改挂 `ExperimentWire.slots`，会话头的 `slots` 变为 `[]`。本行写明“有 Open 运行时为 `[]`”，与 D12-04 的“每批槽位在一个响应里只出现一次”、`ConversationWire.slots` 注释（:162）一致。

分层检查：目录不带 Automation 会话头，页面带它，没有违反 D12-04 的“页面只带目录没有的事实”；`lab.conversation.read` 仍不带会话头（D12-08）；`AutomationRunWire`、`panels` 定义、`LabChange` 联合不变；读取范围按 :564，全体成员可见，与 D12 的读取口径一致。

前端怎样执行“该会话为 Automation 来源时”这条失效：判断已加载的 `automation.conversations` 里是否有该 id，与现行“`panels` 含该会话的页面”同一种机制。会话开出以前，页面靠 `automation` 频道带出它。主路径上没有漏重读的时刻。

结论：没有找到主路径失效反例。

### divergent：有没有更简明的主路径

- b（把会话头内嵌进 `AutomationRunWire`）、c（目录）、d（`panels`）、e（不展示）都更差，理由与取舍栏、闸门 A 的判定一致。c 让整个目录随 Automation 槽位变化重读；e 推翻 D19-05②、D29-02/04 与 D30-04 的“交回槽位”。
- 我考虑过让 Automation 头槽位变化改发 `automation` 频道，这样就不用扩失效表。但这要改刚通过的 D29-04；`automation` 频道还会让 `home` 一起失效；而且消息结束、会话头变化本来就走 `conversation{id}`，还是得补失效项。不比本行简明。
- 本行复用现有类型 `ConversationWire`、现有频道和挂载表，只加一个列表和一条失效项，是改动最小的闭合。

### 非阻断附注（回写或实现时顺带处理，不构成反例）

1. **D12-17 散文同步：** D12-17 行 how 栏写了“Panel 会话头属于各页的 `panels` …… Panel 会话改变时 Lab 发 `conversation{id}`，`panels` 含该 id 的页面重读”，失效表 `conversation` 行“什么时候发”只列了“Panel 会话头改变”。回写时建议把这两处补成对称的“Automation 会话头属于 `automation` 页的 `conversations`”和“Panel 或 Automation 会话头改变”。这样，新一代开出时 `agent`/`session` 的变化也有明文频道，不只依靠泛称的“Lab 侧事实变化”。不补也不影响主路径：第 2 步投递后的 `conversation{id}` 已经能让页面拿到新一代的 `agent`。
2. **失效项写法：** “`automation` 页（该会话为 Automation 来源时）”可以写成与 `panels` 同一形式的“`conversations` 含该会话的 `automation` 页”，前端按已加载数据就能判断，不需要另查来源。两种写法在主路径上等价。
3. **实现注释：** W-09 `catalog.ts:109-111` 注释说 Automation 头“由 page panels 携带”，实现本行时应改为 `automation.conversations`。
4. **可发现范围：** Automation 首步槽位只在 `automation` 页可见，首页的 needs_you 不汇总它，与 Panel 头只在本页可见的现状一致。如果之后要在首页汇总，另行立案，不在本行范围。

