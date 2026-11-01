# D19：SOR-13 控制端点（`eval:<session>`）的线上契约

起草：治理分身 GovClone。优先级：P0，属关键路径解阻。

## 依据与表决规则

**来源：** W-07 在 soroi#209 报的 BLOCKED，https://github.com/Pepgent/soroi/issues/209#issuecomment-6559262177 。

**涉及的已通过正文：**
- D3-19（D3-network-mux.md:73）
- D5:295-313 的 `EvalControl`/`RootEvalControl` 以及 D5-14（D5:89）
- D6-05（D6:33）
- D7-04、D7-06、D7-09（D7-lab-backend.md:64、66、69）
- D12 的 Shape 定义（D12:97）及其序列图（D12:605、615）

**已实现的传输层：** Mux 不解析 body，原样透传：`POST /endpoints/{name}/requests` 的 body 封进 `mux_request{req,body}` 转出，回复以 `mux_reply{req,body}` 带回（omp-rpc-mux `src/serve/endpoint.rs:19-148`，MUX-06/PR#11）。因此控制端点的 JSON 形状只能由契约来定。

**分类：** 跨组件公开契约。调用方是 Lab 后端（W-09），注册方是 omp-soroi 的 eval 模块（W-07）。按 U96，这一项不能按机械补全放行，作为 P0 进入表决。

**计票（LEDGER C2-3，U95，产品/契约议案）：** 四席参投，即总协调席（Main 与 GovClone 合计 1 票）、claude-high、Argon、LeadMentor。参投席中至少 3 席赞成、Argon 不行使否决、有效反例全部消除，即为通过。

**表决期间：** W-07 暂停 SOR-13/14/15，SOR-18/19/20 中不依赖本项的部分照常推进。W-09 中消费控制端点的切片（LAB-08 #24 介入等），在端点 JSON 定案之前先只实现与此无关的部分。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D19-01 | **控制端点请求体统一为带 `method` 标签的 JSON** | D5:305-313；D7-09:69；D12:605、615；`packages/omp-soroi` eval 模块；`apps/web/src/server/lab/**` 的 Mux 调用 | 请求体是带 `method` 判别字段的 sum type。所有写 eval 的会话端点都接受：<br>• `{"method":"slots","run":<RunId \| null>}`<br>• `{"method":"answer","handback":HumanHandback}`<br>• `{"method":"takeover","handback":HumanHandback}`<br>根会话端点另外接受：<br>• `{"method":"writers","run":<RunId \| null>}`<br>• `{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[]}`<br>• `{"method":"abort","run":RunId}`<br>`HumanHandback`、`DeriveAt`、`Change` 沿用 D5、D6-16 已定的字段，序列化为 JSON。D12 序列图中的 `{writers}`、`{slots}`、`{takeover: HumanHandback}` 改按本行写法 | 线上只有一种请求形状，两席各自实现即可对上；D5 原有的 TS 方法签名保留为语义，不再充当线上格式。W-07 的提案漏了 `derive`，本行补上 | 串联 | 是：D5 只给了方法签名，没有线上格式 |
| D19-02 | **回复体统一为 `ok` 判别的结果** | 同上 | 成功：`{"ok":true,"value":<V>}`；失败：`{"ok":false,"error":{"kind":<string>,"message":<string>}}`。<br>`answer`、`takeover`、`derive`、`abort` 成功时 `value` 为 `null`（对应 D5 中的 `void`）。<br>`slots` 的 `value` 为 `[{slot,fn,state}]`，`state` 即 D5 的 `SlotState`。<br>`writers` 的 `value` 见 D19-03 | `void` 在 JSON 中有了明确表示，业务失败与 Mux 传输失败分开；`error.kind` 的取值由注册方定义并写入插件说明 | 串联 | 是：D5 没有定义回复格式 |
| D19-03 | **`writers` 返回会话及其端点名** | D3-19；D5:311；D7-06、D7-09 | `writers` 的 `value` 为 `[{"session":<SessionId>,"endpoint":"eval:<SessionId>"}]`，包含根会话自身。D5:311 的 `readonly string[]` 改为这个形状，与 D3-19“各自的端点名”一致 | D3-19 与 D5 的写法统一；Lab 不必自己拼端点名 | 串联 | 否：只是消除两处已通过正文的矛盾 |
| D19-04 | **Shape 的线上标签沿用 `record`** | D5:113-115；D12:97；`packages/omp-soroi/src/contract.ts:9-15` | 线上的 `Shape` 序列化为 `{"kind":"single","type":FieldKind}` 或 `{"kind":"record","fields":{...}}`，与 D5、D12 一致。插件内部目前的 `{kind:"fields"}` 只在插件内使用，在端点出口转换 | 不改动两份已通过的正文；转换只发生在注册方一处 | 技术 | 否 |
| D19-05 | **首步 Human 槽位的发现：`run` 允许为 `null`，由 Lab 按自己持有的根会话寻址** | D5-14；D6-05；D7-04（Lab 的 `conversation` 表是根会话的唯一来源）；D7-06（`pending_launch` 与讨论会话对应）；D7-09 | 根会话在 store 中还没有运行时（D6-05：运行在首次正式提交时才建立），首步 Human 调用的槽位只存在于该会话的 eval 模块里。Lab 从自己的 `conversation` 表直接取根会话 id，向 `eval:<根会话 id>` 发 `{"method":"writers","run":null}` 与 `{"method":"slots","run":null}`，就能拿到本会话及其派出的写方在“尚未建立运行的在途步”中持有的槽位。运行建立后，照原规则按 RunId 寻址。`answer`、`takeover` 只按 `slot` 定位，不依赖 `run` | 首步 Human 不再无法被发现，且不改 D6-05 的运行开始锚点，也不提前在 store 建运行；Lab 只多一条“对无运行的会话也查询槽位”的路径 | 串联 | 是：D5-14 与 D6-05 之间缺了这条衔接 |
