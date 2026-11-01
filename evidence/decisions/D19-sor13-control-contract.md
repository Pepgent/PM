# D19：SOR-13 控制端点（`eval:<session>`）的线上契约

起草：治理分身 GovClone。优先级：P0，属关键路径解阻。版本 v2：采纳 claude-high 在 `local://votes/D19-claude-high.md` 中对 D19-01、02、05 提出的反例，改用会话寻址方案；D19-03 正文未改；D19-04 措辞调整，按发起人通知重投。

## 依据与表决规则

**来源：** W-07 在 soroi#209 报的 BLOCKED，https://github.com/Pepgent/soroi/issues/209#issuecomment-6559262177 。

**涉及的已通过正文：**
- D3-19（D3-network-mux.md:73）
- D5:295-313 的 `EvalControl`/`RootEvalControl` 以及 D5-14（D5:89）
- D6-05（D6:33）
- D7-04、D7-06、D7-09（D7-lab-backend.md:64、66、69）
- D12 中的 Shape 定义（D12:97）、`SlotWire` 与 `ExperimentWire.slots`（D12:258、263）、`DeriveAt`（D12:383）、介入命令（D12:422-423）、命令结果（D12:476）、权限（D12:512）、序列图（D12:605、615）
- D6-16 中的 `Derive.at`（D6:127）

**已实现的传输层：** Mux 不解析 body，原样透传：`POST /endpoints/{name}/requests` 的 body 封进 `mux_request{req,body}` 转出，回复以 `mux_reply{req,body}` 带回（omp-rpc-mux `src/serve/endpoint.rs:19-148`，MUX-06/PR#11）。因此控制端点的 JSON 形状只能由契约来定。

**分类：** 跨组件公开契约。调用方是 Lab 后端（W-09），注册方是 omp-soroi 的 eval 模块（W-07）。按 U96，这一项不能按机械补全放行，作为 P0 进入表决。

**计票（LEDGER C2-3，U95，产品/契约议案）：** 四席参投，即总协调席（Main 与 GovClone 合计 1 票）、claude-high、Argon、LeadMentor。参投席中至少 3 席赞成、Argon 不行使否决、有效反例全部消除，即为通过。

**表决期间：** W-07 暂停 SOR-13/14/15，SOR-18/19/20 中不依赖本项的部分照常推进。W-09 中消费控制端点的切片（LAB-08 #24 介入等），在端点 JSON 定案之前先只实现与此无关的部分。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D19-01 | **控制端点请求体统一为带 `method` 标签的 JSON** | D5:304-313；D6:127；D7-09:69；D12:383、605、615；`packages/omp-soroi` eval 模块；`apps/web/src/server/lab/**` 的 Mux 调用 | 请求体是带 `method` 判别字段的 sum type。<br>所有写 eval 的会话端点都接受：<br>• `{"method":"slots"}`<br>• `{"method":"answer","handback":HumanHandback}`<br>• `{"method":"takeover","handback":HumanHandback}`<br>根会话端点另外接受：<br>• `{"method":"writers"}`<br>• `{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[]}`<br>• `{"method":"abort","run":RunId}`<br>`DeriveAt` 以 D12:383 为准，即 `Committed{step,position} \| {kind:"InFlight",writerSession,slot}`。D6:127 的 `Derive.at` 补上 `writerSession`，与 D5:312、D7-09 一致。之所以必须带 `writerSession`，是因为 `SlotId` 不含会话信息，根端点要靠它找到该在哪个写方中止并提交。`HumanHandback` 与 `Change` 沿用 D5:300 和 store 的 `ChangeSchema`。D12 序列图中的 `{writers}`、`{slots}`、`{takeover: HumanHandback}` 一律改为本行写法 | 线上只有一种请求形状，两席分别实现也能对上；`DeriveAt` 只有一个来源，严格解析不会因多一个键或少一个键被拒。D5 原有的 TS 方法签名保留为语义描述，不再当作线上格式。W-07 的提案漏了 `derive`，本行补上 | 串联 | 是：D5 只给了方法签名，没有线上格式；D6:127 与 D5、D12 不一致 |
| D19-02 | **回复体：成功结果的主路径格式** | 同上；D5:312；D7:205；D12:476 | 成功时回复 `{"ok":true,"value":<V>}`。失败回复的形状先作为占位，按“能工作”处理，本行不作设计（依据 `.claude/rules/design-assumes-it-works.md`：设计阶段只写主路径）。<br>各方法成功时的 `value`：<br>• `answer`、`takeover`、`abort`：`null`。<br>• `derive`：store 确认派生后，返回 `{"run":<新运行 RunId>}`，取自 store 返回的 `Derived.run`。D5:312 的返回类型同步由 `void` 改为 `{ run: RunId }`，以满足 D12:476 的 `{kind:'derived', run}`。<br>• `slots`：`[{slot,fn,state}]`，其中 `state` 就是 D5 的 `SlotState`。Lab 再拼上端点所属的会话，就得到 D12:258 的 `SlotWire`。<br>• `writers`：见 D19-03 | 主路径上 `void` 有了明确的 JSON 表示；Lab 直接从源头拿到新运行的 id，不必到生命周期流里反查。失败分支留到实现时按占位处理 | 串联 | 是：D5 没有定义回复格式 |
| D19-03 | **`writers` 返回会话及其端点名** | D3-19；D5:311；D7-06、D7-09 | `writers` 的 `value` 为 `[{"session":<SessionId>,"endpoint":"eval:<SessionId>"}]`，包含根会话自身。D5:311 的 `readonly string[]` 改为这个形状，与 D3-19 的“各自的端点名”一致 | D3-19 与 D5 的写法统一；Lab 不必自己拼端点名 | 串联 | 否：只是消除两处已通过正文之间的矛盾 |
| D19-04 | **Shape 的线上标签沿用 `record`** | D5:113-115；D12:97；`packages/omp-soroi/src/contract.ts:9-15` | 线上的 `Shape` 序列化为 `{"kind":"single","type":FieldKind}` 或 `{"kind":"record","fields":{...}}`，与 D5、D12 一致。插件内部的表示由 W-07 自定：可以在端点出口做转换，也可以按 D5 §3.1 直接把内部标签改为 `record`；后者还能消除 `check.ts:356-363` 中 `Binding` 与 `Shape` 同名标签的歧义 | 两份已通过的正文都不用改 | 技术 | 否 |
| D19-05 | **槽位与写方按会话寻址，不按运行寻址；介入命令随之改为按会话寻址** | D5-14；D5:304、311；D6-05；D7-04；D7-06；D7-09；D12:258、263、422-423、512、605 | **原则：** D6-05 规定一个根会话同一时刻至多有一个未结束的运行，因此根会话下所有写方的在途步，都属于该会话当前已有或即将建立的那一个运行。用 `run` 过滤槽位不提供任何区分，反而会在并发写方先提交时把其他写方的在途步归错。<br>**① 端点：** `slots` 返回本会话当前全部在途槽位，`writers` 返回本根会话下当前全部写方（含自身）。两者都不带 `run`（D19-01）。D5:304、311 的签名去掉 `runId`。<br>**② Lab 读取：** Lab 只读取自己持有在线一代的根会话：从 `eval:<conversation.session>` 读 `writers`，再逐个读 `slots`。已停驻的会话没有在途的 `soroi_eval`，不用唤醒。读到的槽位按以下规则挂载：该会话有 Open 运行时，挂到该运行的 `ExperimentWire.slots`；没有运行时，Discussion 来源挂到该会话的 `pendingLaunch` 实验项，Panel 和 Automation 来源挂到 `ConversationWire`。D12:263 的注释改为“该运行所属根会话的全部在途槽位”，D12:605 的“Open 运行”改为“在线的根会话”。<br>**③ 介入命令：** D12:422-423 中 `intervene.takeover` 与 `intervene.answer` 的 `run: RunId` 改为 `conversation: ConversationId` 加 `writerSession: SessionId`（取自 `SlotWire`）。Lab 把请求直接发到 `eval:<writerSession>`。D12:512 对这两条命令的权限改为“`write`，且是该会话的 owner”，语义不变。D7-09 的“找端点”补一句：无运行时，取 `conversation.session`。`intervene.derive` 与 `run.abort` 仍按运行寻址 | 首步 Human 的槽位既能被发现，人也能交回，实验不会卡在 `sent`；并发写方的槽位不会丢；D6-05 的运行开始锚点不变，也不提前在 store 建运行 | 串联 | 是：D5-14 与 D6-05 之间、D12 的介入寻址都缺了这一环 |

## 通过后要改的文档

由秘书或 Argon 按职责直接替换正文，不留更正记录：
- **D5：** D5:304、311、312（签名去掉 `runId`；`writers` 返回 `{session,endpoint}[]`；`derive` 返回 `{run}`）。
- **D6：** D6:127（`InFlight` 补 `writerSession`）。
- **D7：** D7-09“找端点”补无运行分支。
- **D12：** D12:263、:422-423、:512、:605、:615。
- **design：** `design/` 中对应段落由 Argon 回写。

非阻断，另行立占位：GUI 派生时，如果用 Lab 持有的 `ArtifactRef` 作新的文件输入，字节如何到达插件可读的位置，现在没有写。这属于与 D12 P16 同形的缺口，不在本议案范围内。
