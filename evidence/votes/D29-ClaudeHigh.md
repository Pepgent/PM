# D29 选票：ClaudeHigh

议程：Pepgent#20 LAB-07b：agent 所属 Lab、讨论首步槽位挂载与槽位变化通知（SO-1 至 SO-4）（[Pepgent/PM#48](https://github.com/Pepgent/PM/issues/48)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D29-01 v1：赞成（ClaudeHighD29，2026-11-01T17:38:39.986Z）



# D29 ClaudeHigh 选票（实例 ClaudeHighD29，空白历史独立审查）

审阅对象：D29-01 v1 至 D29-04 v1（PM#48）。读过：issue 正文；`evidence/gates/pepgent-20.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D12-lab-wire.md`（D12-04、类型 :83-160、:255-361、HTTP 路由与“读取范围与归属”、事件失效表）；`DEC/D18-product-opus-contracts.md`（D18-05 及执行附注）；`DEC/D7-lab-backend.md`（D7-06、D7-08、D7-12、D7-19）；`DEC/D19-sor13-control-contract.md`（D19-01 至 D19-05）；`DEC/D3-network-mux.md`（D3-03、D3-06、D3-15、D3-19）；`DEC/D8-mvp-scope.md`（F07–F31）；源码 `WT07/apps/web/src/server/lab/overlay.ts`、`mux.ts`。按 `design-assumes-it-works` 只审主路径。

## steady 压测（契约闭合）

- **D29-01：** D3-06/D3-04 规定每个 agent（根、中心 worker、槽位 Agent 体，本机与远程相同）都经 dial 在 Mux 上有写方声明，D3-15 的 `GET /agents` 从写方声明开始列出，`Presence.agentId` 已在 D12 外部类型（:87），Lab 已有 `MuxClient.presence()`（`mux.ts:60-66`）。D18-05 第 2、3 点给出 Lab→Mux 实例的配置映射，反查即得“Mux 实例对应的 Lab”。根 agent 由 Lab 在本 Lab 实例的 Mux 上 dial（D7-04），结果与现行 `conversation.lab` 相同。不改 soroi、Mux、路由形状，满足 (U) bf96d256。主路径闭合。
- **D29-02：** D7-06 “无 pending 时取讨论名称项目”使“讨论无运行无 pendingLaunch 而有在途槽位”在主路径可达。新格挂到 `DiscussionHeaderWire.conversation.slots`，复用 D19-05 已加的 `ConversationWire.slots`，不新增字段；`intervene.answer` 所需的 `conversation`、`writerSession`、`slot` 都能从该处得到（D12-11）。第一次正式提交建运行时，store 生命周期流的 `run_started` 发 `catalog`，重读后槽位移到 `ExperimentWire.slots`，会话头回到 `[]`，满足“一批只出现一次”。注释修订消除 :151 与 D12-04 的矛盾。主路径闭合。
- **D29-03：** D7-08 的来源列表确实没有端点槽位（F7 属实：D6-04 在步提交时才写调用事件，D19-01 是封闭的请求/回复联合）。本行只用 D19-01 已有的 `writers`/`slots`，与 D7-12 有订阅者时定期读 remote 同形；按 `writerSession`、`slot`、`state` 比较，能覆盖打开、`running→awaiting_human`、结束三种变化，也覆盖 Lab 没有 stdout 的中心 worker。上一次的结果只用于比较，不作为读取来源，因此不是第二个权威。主路径闭合。
- **D29-04：** 四个挂载位置各对应一条现有失效路径：运行项在目录里 → `run` 让目录失效；pendingLaunch 项和讨论头在目录里 → `catalog` 让目录失效；Panel 头在各页的 `panels` 里 → `conversation{id}` 让“`panels` 含该会话的页面”失效。`LabChange` 联合不变。主路径闭合。

## divergent 压测（更简明方案）

- D29-01：考虑过给 agents 路由加 `?lab=`，可以免去逐个实例查找，但会改变 HTTP 形状和 `watchAgent` 签名；本行把查找成本留在 Lab 内部，是更小的改动。没有找到更简单、又不往 soroi/Mux 加 Lab 字段的方案。
- D29-03：考虑过用 Mux 的 `/agents/events` 或根 RPC 帧作信号。前者看不到 Program 体槽位，也看不到进入 `awaiting_human`；后者看不到中心 worker。两者最终都还要回读 `slots`。定期读取是最少机制的方案。
- D29-02/04：另造一个全 null 的实验项需要新的投影形态，另加 `slots` 频道需要改 `LabChange`。本案两处都复用现有结构，已经是最简方案。

## 逐行票

- **D29-01：赞成。**
- **D29-02：赞成。**
- **D29-03：赞成。**
- **D29-04：赞成。**

## 非阻断附注（不构成反例，供定案与派工参考）

1. **D18-05 回写依赖（D29-01）：** D7-19 正文仍是单一 `SOROI_MUX_URL`，WT07 实现也只有一个 `context.mux`（`overlay.ts:57`）。D29-01 依赖 D18-05 第 3 点的“按 Lab 配置 Mux URL”。单实例部署时本行退化为“在本实例 Mux 列表中即属本 Lab”，主路径仍然成立。D18-05 的正文回写与 Lab 侧按 Lab 配置 Mux URL 的实现应在派工时一并交代，`childAgentLab`（`overlay.ts:52-72`）整段由新规则替换。
2. **行号漂移（D29-01）：** 当前工作树中“读取范围与归属”一句在 `D12:553`，三条 agents 路由在 `:543,548-549`。issue 引用的 `:551`、`:541,546-547` 以 PM `34d8f79` 为准，按段名可以定位，回写时按段名替换。
3. **WEB 投影（D29-02）：** 首步 `awaiting_human` 不再出现在实验项里，而是出现在讨论头。F08 S2 写的是“实验详情页”交回；讨论首步的交回入口要由 WEB 投影（W-10）在讨论页渲染。派工 `notify` 除 `AreaMgrPepgent` 外，应让 WEB 切片知悉。
4. **既有缺口，不在本议程内（D29-02/04 的 Automation 格）：** Automation 来源的 `ConversationWire` 在现行线上没有任何读取携带：目录 `discussions` 只含 Discussion 头（D12:283），`panels` 只列当前用户自己的 Panel 头（D12:553），`automation` 页的 `AutomationRunWire.conversation` 只是 id（D12:251）。因此 Automation 会话首步无运行时的槽位，以及 D29-04 为它发的 `conversation{id}`，都没有读方能显示或重读。这个缺口来自 D12-04/D19-05，无论本议程怎样选频道都存在，也不在 SO-1 至 SO-4 的请求范围内，因此不作为对 D29-02/04 的反例。建议协调席另交闸门判定是否立案。
5. **事件与读取的时序（D29-02/04）：** 讨论头注释改成“挂在讨论头的在途槽位也随 catalog 频道失效”。这句只有在 D29-04 通过后才有触发源。两行分别表决，若只有一行通过，回写时须核对注释与失效表是否一致。


## D29-02 v1：赞成（ClaudeHighD29，2026-11-01T17:38:39.986Z）



# D29 ClaudeHigh 选票（实例 ClaudeHighD29，空白历史独立审查）

审阅对象：D29-01 v1 至 D29-04 v1（PM#48）。读过：issue 正文；`evidence/gates/pepgent-20.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D12-lab-wire.md`（D12-04、类型 :83-160、:255-361、HTTP 路由与“读取范围与归属”、事件失效表）；`DEC/D18-product-opus-contracts.md`（D18-05 及执行附注）；`DEC/D7-lab-backend.md`（D7-06、D7-08、D7-12、D7-19）；`DEC/D19-sor13-control-contract.md`（D19-01 至 D19-05）；`DEC/D3-network-mux.md`（D3-03、D3-06、D3-15、D3-19）；`DEC/D8-mvp-scope.md`（F07–F31）；源码 `WT07/apps/web/src/server/lab/overlay.ts`、`mux.ts`。按 `design-assumes-it-works` 只审主路径。

## steady 压测（契约闭合）

- **D29-01：** D3-06/D3-04 规定每个 agent（根、中心 worker、槽位 Agent 体，本机与远程相同）都经 dial 在 Mux 上有写方声明，D3-15 的 `GET /agents` 从写方声明开始列出，`Presence.agentId` 已在 D12 外部类型（:87），Lab 已有 `MuxClient.presence()`（`mux.ts:60-66`）。D18-05 第 2、3 点给出 Lab→Mux 实例的配置映射，反查即得“Mux 实例对应的 Lab”。根 agent 由 Lab 在本 Lab 实例的 Mux 上 dial（D7-04），结果与现行 `conversation.lab` 相同。不改 soroi、Mux、路由形状，满足 (U) bf96d256。主路径闭合。
- **D29-02：** D7-06 “无 pending 时取讨论名称项目”使“讨论无运行无 pendingLaunch 而有在途槽位”在主路径可达。新格挂到 `DiscussionHeaderWire.conversation.slots`，复用 D19-05 已加的 `ConversationWire.slots`，不新增字段；`intervene.answer` 所需的 `conversation`、`writerSession`、`slot` 都能从该处得到（D12-11）。第一次正式提交建运行时，store 生命周期流的 `run_started` 发 `catalog`，重读后槽位移到 `ExperimentWire.slots`，会话头回到 `[]`，满足“一批只出现一次”。注释修订消除 :151 与 D12-04 的矛盾。主路径闭合。
- **D29-03：** D7-08 的来源列表确实没有端点槽位（F7 属实：D6-04 在步提交时才写调用事件，D19-01 是封闭的请求/回复联合）。本行只用 D19-01 已有的 `writers`/`slots`，与 D7-12 有订阅者时定期读 remote 同形；按 `writerSession`、`slot`、`state` 比较，能覆盖打开、`running→awaiting_human`、结束三种变化，也覆盖 Lab 没有 stdout 的中心 worker。上一次的结果只用于比较，不作为读取来源，因此不是第二个权威。主路径闭合。
- **D29-04：** 四个挂载位置各对应一条现有失效路径：运行项在目录里 → `run` 让目录失效；pendingLaunch 项和讨论头在目录里 → `catalog` 让目录失效；Panel 头在各页的 `panels` 里 → `conversation{id}` 让“`panels` 含该会话的页面”失效。`LabChange` 联合不变。主路径闭合。

## divergent 压测（更简明方案）

- D29-01：考虑过给 agents 路由加 `?lab=`，可以免去逐个实例查找，但会改变 HTTP 形状和 `watchAgent` 签名；本行把查找成本留在 Lab 内部，是更小的改动。没有找到更简单、又不往 soroi/Mux 加 Lab 字段的方案。
- D29-03：考虑过用 Mux 的 `/agents/events` 或根 RPC 帧作信号。前者看不到 Program 体槽位，也看不到进入 `awaiting_human`；后者看不到中心 worker。两者最终都还要回读 `slots`。定期读取是最少机制的方案。
- D29-02/04：另造一个全 null 的实验项需要新的投影形态，另加 `slots` 频道需要改 `LabChange`。本案两处都复用现有结构，已经是最简方案。

## 逐行票

- **D29-01：赞成。**
- **D29-02：赞成。**
- **D29-03：赞成。**
- **D29-04：赞成。**

## 非阻断附注（不构成反例，供定案与派工参考）

1. **D18-05 回写依赖（D29-01）：** D7-19 正文仍是单一 `SOROI_MUX_URL`，WT07 实现也只有一个 `context.mux`（`overlay.ts:57`）。D29-01 依赖 D18-05 第 3 点的“按 Lab 配置 Mux URL”。单实例部署时本行退化为“在本实例 Mux 列表中即属本 Lab”，主路径仍然成立。D18-05 的正文回写与 Lab 侧按 Lab 配置 Mux URL 的实现应在派工时一并交代，`childAgentLab`（`overlay.ts:52-72`）整段由新规则替换。
2. **行号漂移（D29-01）：** 当前工作树中“读取范围与归属”一句在 `D12:553`，三条 agents 路由在 `:543,548-549`。issue 引用的 `:551`、`:541,546-547` 以 PM `34d8f79` 为准，按段名可以定位，回写时按段名替换。
3. **WEB 投影（D29-02）：** 首步 `awaiting_human` 不再出现在实验项里，而是出现在讨论头。F08 S2 写的是“实验详情页”交回；讨论首步的交回入口要由 WEB 投影（W-10）在讨论页渲染。派工 `notify` 除 `AreaMgrPepgent` 外，应让 WEB 切片知悉。
4. **既有缺口，不在本议程内（D29-02/04 的 Automation 格）：** Automation 来源的 `ConversationWire` 在现行线上没有任何读取携带：目录 `discussions` 只含 Discussion 头（D12:283），`panels` 只列当前用户自己的 Panel 头（D12:553），`automation` 页的 `AutomationRunWire.conversation` 只是 id（D12:251）。因此 Automation 会话首步无运行时的槽位，以及 D29-04 为它发的 `conversation{id}`，都没有读方能显示或重读。这个缺口来自 D12-04/D19-05，无论本议程怎样选频道都存在，也不在 SO-1 至 SO-4 的请求范围内，因此不作为对 D29-02/04 的反例。建议协调席另交闸门判定是否立案。
5. **事件与读取的时序（D29-02/04）：** 讨论头注释改成“挂在讨论头的在途槽位也随 catalog 频道失效”。这句只有在 D29-04 通过后才有触发源。两行分别表决，若只有一行通过，回写时须核对注释与失效表是否一致。


## D29-03 v1：赞成（ClaudeHighD29，2026-11-01T17:38:39.986Z）



# D29 ClaudeHigh 选票（实例 ClaudeHighD29，空白历史独立审查）

审阅对象：D29-01 v1 至 D29-04 v1（PM#48）。读过：issue 正文；`evidence/gates/pepgent-20.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D12-lab-wire.md`（D12-04、类型 :83-160、:255-361、HTTP 路由与“读取范围与归属”、事件失效表）；`DEC/D18-product-opus-contracts.md`（D18-05 及执行附注）；`DEC/D7-lab-backend.md`（D7-06、D7-08、D7-12、D7-19）；`DEC/D19-sor13-control-contract.md`（D19-01 至 D19-05）；`DEC/D3-network-mux.md`（D3-03、D3-06、D3-15、D3-19）；`DEC/D8-mvp-scope.md`（F07–F31）；源码 `WT07/apps/web/src/server/lab/overlay.ts`、`mux.ts`。按 `design-assumes-it-works` 只审主路径。

## steady 压测（契约闭合）

- **D29-01：** D3-06/D3-04 规定每个 agent（根、中心 worker、槽位 Agent 体，本机与远程相同）都经 dial 在 Mux 上有写方声明，D3-15 的 `GET /agents` 从写方声明开始列出，`Presence.agentId` 已在 D12 外部类型（:87），Lab 已有 `MuxClient.presence()`（`mux.ts:60-66`）。D18-05 第 2、3 点给出 Lab→Mux 实例的配置映射，反查即得“Mux 实例对应的 Lab”。根 agent 由 Lab 在本 Lab 实例的 Mux 上 dial（D7-04），结果与现行 `conversation.lab` 相同。不改 soroi、Mux、路由形状，满足 (U) bf96d256。主路径闭合。
- **D29-02：** D7-06 “无 pending 时取讨论名称项目”使“讨论无运行无 pendingLaunch 而有在途槽位”在主路径可达。新格挂到 `DiscussionHeaderWire.conversation.slots`，复用 D19-05 已加的 `ConversationWire.slots`，不新增字段；`intervene.answer` 所需的 `conversation`、`writerSession`、`slot` 都能从该处得到（D12-11）。第一次正式提交建运行时，store 生命周期流的 `run_started` 发 `catalog`，重读后槽位移到 `ExperimentWire.slots`，会话头回到 `[]`，满足“一批只出现一次”。注释修订消除 :151 与 D12-04 的矛盾。主路径闭合。
- **D29-03：** D7-08 的来源列表确实没有端点槽位（F7 属实：D6-04 在步提交时才写调用事件，D19-01 是封闭的请求/回复联合）。本行只用 D19-01 已有的 `writers`/`slots`，与 D7-12 有订阅者时定期读 remote 同形；按 `writerSession`、`slot`、`state` 比较，能覆盖打开、`running→awaiting_human`、结束三种变化，也覆盖 Lab 没有 stdout 的中心 worker。上一次的结果只用于比较，不作为读取来源，因此不是第二个权威。主路径闭合。
- **D29-04：** 四个挂载位置各对应一条现有失效路径：运行项在目录里 → `run` 让目录失效；pendingLaunch 项和讨论头在目录里 → `catalog` 让目录失效；Panel 头在各页的 `panels` 里 → `conversation{id}` 让“`panels` 含该会话的页面”失效。`LabChange` 联合不变。主路径闭合。

## divergent 压测（更简明方案）

- D29-01：考虑过给 agents 路由加 `?lab=`，可以免去逐个实例查找，但会改变 HTTP 形状和 `watchAgent` 签名；本行把查找成本留在 Lab 内部，是更小的改动。没有找到更简单、又不往 soroi/Mux 加 Lab 字段的方案。
- D29-03：考虑过用 Mux 的 `/agents/events` 或根 RPC 帧作信号。前者看不到 Program 体槽位，也看不到进入 `awaiting_human`；后者看不到中心 worker。两者最终都还要回读 `slots`。定期读取是最少机制的方案。
- D29-02/04：另造一个全 null 的实验项需要新的投影形态，另加 `slots` 频道需要改 `LabChange`。本案两处都复用现有结构，已经是最简方案。

## 逐行票

- **D29-01：赞成。**
- **D29-02：赞成。**
- **D29-03：赞成。**
- **D29-04：赞成。**

## 非阻断附注（不构成反例，供定案与派工参考）

1. **D18-05 回写依赖（D29-01）：** D7-19 正文仍是单一 `SOROI_MUX_URL`，WT07 实现也只有一个 `context.mux`（`overlay.ts:57`）。D29-01 依赖 D18-05 第 3 点的“按 Lab 配置 Mux URL”。单实例部署时本行退化为“在本实例 Mux 列表中即属本 Lab”，主路径仍然成立。D18-05 的正文回写与 Lab 侧按 Lab 配置 Mux URL 的实现应在派工时一并交代，`childAgentLab`（`overlay.ts:52-72`）整段由新规则替换。
2. **行号漂移（D29-01）：** 当前工作树中“读取范围与归属”一句在 `D12:553`，三条 agents 路由在 `:543,548-549`。issue 引用的 `:551`、`:541,546-547` 以 PM `34d8f79` 为准，按段名可以定位，回写时按段名替换。
3. **WEB 投影（D29-02）：** 首步 `awaiting_human` 不再出现在实验项里，而是出现在讨论头。F08 S2 写的是“实验详情页”交回；讨论首步的交回入口要由 WEB 投影（W-10）在讨论页渲染。派工 `notify` 除 `AreaMgrPepgent` 外，应让 WEB 切片知悉。
4. **既有缺口，不在本议程内（D29-02/04 的 Automation 格）：** Automation 来源的 `ConversationWire` 在现行线上没有任何读取携带：目录 `discussions` 只含 Discussion 头（D12:283），`panels` 只列当前用户自己的 Panel 头（D12:553），`automation` 页的 `AutomationRunWire.conversation` 只是 id（D12:251）。因此 Automation 会话首步无运行时的槽位，以及 D29-04 为它发的 `conversation{id}`，都没有读方能显示或重读。这个缺口来自 D12-04/D19-05，无论本议程怎样选频道都存在，也不在 SO-1 至 SO-4 的请求范围内，因此不作为对 D29-02/04 的反例。建议协调席另交闸门判定是否立案。
5. **事件与读取的时序（D29-02/04）：** 讨论头注释改成“挂在讨论头的在途槽位也随 catalog 频道失效”。这句只有在 D29-04 通过后才有触发源。两行分别表决，若只有一行通过，回写时须核对注释与失效表是否一致。


## D29-04 v1：赞成（ClaudeHighD29，2026-11-01T17:38:39.987Z）



# D29 ClaudeHigh 选票（实例 ClaudeHighD29，空白历史独立审查）

审阅对象：D29-01 v1 至 D29-04 v1（PM#48）。读过：issue 正文；`evidence/gates/pepgent-20.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D12-lab-wire.md`（D12-04、类型 :83-160、:255-361、HTTP 路由与“读取范围与归属”、事件失效表）；`DEC/D18-product-opus-contracts.md`（D18-05 及执行附注）；`DEC/D7-lab-backend.md`（D7-06、D7-08、D7-12、D7-19）；`DEC/D19-sor13-control-contract.md`（D19-01 至 D19-05）；`DEC/D3-network-mux.md`（D3-03、D3-06、D3-15、D3-19）；`DEC/D8-mvp-scope.md`（F07–F31）；源码 `WT07/apps/web/src/server/lab/overlay.ts`、`mux.ts`。按 `design-assumes-it-works` 只审主路径。

## steady 压测（契约闭合）

- **D29-01：** D3-06/D3-04 规定每个 agent（根、中心 worker、槽位 Agent 体，本机与远程相同）都经 dial 在 Mux 上有写方声明，D3-15 的 `GET /agents` 从写方声明开始列出，`Presence.agentId` 已在 D12 外部类型（:87），Lab 已有 `MuxClient.presence()`（`mux.ts:60-66`）。D18-05 第 2、3 点给出 Lab→Mux 实例的配置映射，反查即得“Mux 实例对应的 Lab”。根 agent 由 Lab 在本 Lab 实例的 Mux 上 dial（D7-04），结果与现行 `conversation.lab` 相同。不改 soroi、Mux、路由形状，满足 (U) bf96d256。主路径闭合。
- **D29-02：** D7-06 “无 pending 时取讨论名称项目”使“讨论无运行无 pendingLaunch 而有在途槽位”在主路径可达。新格挂到 `DiscussionHeaderWire.conversation.slots`，复用 D19-05 已加的 `ConversationWire.slots`，不新增字段；`intervene.answer` 所需的 `conversation`、`writerSession`、`slot` 都能从该处得到（D12-11）。第一次正式提交建运行时，store 生命周期流的 `run_started` 发 `catalog`，重读后槽位移到 `ExperimentWire.slots`，会话头回到 `[]`，满足“一批只出现一次”。注释修订消除 :151 与 D12-04 的矛盾。主路径闭合。
- **D29-03：** D7-08 的来源列表确实没有端点槽位（F7 属实：D6-04 在步提交时才写调用事件，D19-01 是封闭的请求/回复联合）。本行只用 D19-01 已有的 `writers`/`slots`，与 D7-12 有订阅者时定期读 remote 同形；按 `writerSession`、`slot`、`state` 比较，能覆盖打开、`running→awaiting_human`、结束三种变化，也覆盖 Lab 没有 stdout 的中心 worker。上一次的结果只用于比较，不作为读取来源，因此不是第二个权威。主路径闭合。
- **D29-04：** 四个挂载位置各对应一条现有失效路径：运行项在目录里 → `run` 让目录失效；pendingLaunch 项和讨论头在目录里 → `catalog` 让目录失效；Panel 头在各页的 `panels` 里 → `conversation{id}` 让“`panels` 含该会话的页面”失效。`LabChange` 联合不变。主路径闭合。

## divergent 压测（更简明方案）

- D29-01：考虑过给 agents 路由加 `?lab=`，可以免去逐个实例查找，但会改变 HTTP 形状和 `watchAgent` 签名；本行把查找成本留在 Lab 内部，是更小的改动。没有找到更简单、又不往 soroi/Mux 加 Lab 字段的方案。
- D29-03：考虑过用 Mux 的 `/agents/events` 或根 RPC 帧作信号。前者看不到 Program 体槽位，也看不到进入 `awaiting_human`；后者看不到中心 worker。两者最终都还要回读 `slots`。定期读取是最少机制的方案。
- D29-02/04：另造一个全 null 的实验项需要新的投影形态，另加 `slots` 频道需要改 `LabChange`。本案两处都复用现有结构，已经是最简方案。

## 逐行票

- **D29-01：赞成。**
- **D29-02：赞成。**
- **D29-03：赞成。**
- **D29-04：赞成。**

## 非阻断附注（不构成反例，供定案与派工参考）

1. **D18-05 回写依赖（D29-01）：** D7-19 正文仍是单一 `SOROI_MUX_URL`，WT07 实现也只有一个 `context.mux`（`overlay.ts:57`）。D29-01 依赖 D18-05 第 3 点的“按 Lab 配置 Mux URL”。单实例部署时本行退化为“在本实例 Mux 列表中即属本 Lab”，主路径仍然成立。D18-05 的正文回写与 Lab 侧按 Lab 配置 Mux URL 的实现应在派工时一并交代，`childAgentLab`（`overlay.ts:52-72`）整段由新规则替换。
2. **行号漂移（D29-01）：** 当前工作树中“读取范围与归属”一句在 `D12:553`，三条 agents 路由在 `:543,548-549`。issue 引用的 `:551`、`:541,546-547` 以 PM `34d8f79` 为准，按段名可以定位，回写时按段名替换。
3. **WEB 投影（D29-02）：** 首步 `awaiting_human` 不再出现在实验项里，而是出现在讨论头。F08 S2 写的是“实验详情页”交回；讨论首步的交回入口要由 WEB 投影（W-10）在讨论页渲染。派工 `notify` 除 `AreaMgrPepgent` 外，应让 WEB 切片知悉。
4. **既有缺口，不在本议程内（D29-02/04 的 Automation 格）：** Automation 来源的 `ConversationWire` 在现行线上没有任何读取携带：目录 `discussions` 只含 Discussion 头（D12:283），`panels` 只列当前用户自己的 Panel 头（D12:553），`automation` 页的 `AutomationRunWire.conversation` 只是 id（D12:251）。因此 Automation 会话首步无运行时的槽位，以及 D29-04 为它发的 `conversation{id}`，都没有读方能显示或重读。这个缺口来自 D12-04/D19-05，无论本议程怎样选频道都存在，也不在 SO-1 至 SO-4 的请求范围内，因此不作为对 D29-02/04 的反例。建议协调席另交闸门判定是否立案。
5. **事件与读取的时序（D29-02/04）：** 讨论头注释改成“挂在讨论头的在途槽位也随 catalog 频道失效”。这句只有在 D29-04 通过后才有触发源。两行分别表决，若只有一行通过，回写时须核对注释与失效表是否一致。

