# D19 选票：claude-high 独立审查席

议案：D19（原编号 D18，PM#29），SOR-13 控制端点 `eval:<session>` 的线上契约。草案见 `local://decisions/D19.md`。
投票席：claude-high，独立计 1 票（LEDGER C2-3，U95）。
审查方式：steady 与 divergent 两个立场都过一遍。依据只取源头：PM 克隆 `/tmp/govclone-pm` 中已通过的正文、`pepgent-omp-rpc-mux/src/serve/endpoint.rs`、`pepgent-soroi/packages/**` 的源码，以及 soroi#209 的 BLOCKED 原文。

## 总表

| 条目 | 票 | 分类意见 | 一句话理由 |
| --- | --- | --- | --- |
| D19-01 | **反对**（修正后转赞成） | 串联 | `DeriveAt` 同时引用了 D5 和 D6-16，而两者的 `InFlight` 字段不同，两席各按一份实现就对不上 |
| D19-02 | **反对**（修正后转赞成） | 串联 | `derive` 成功时回 `null`，但 D12 的 `intervene.derive` 要返回新运行的 `RunId` |
| D19-03 | **赞成** | 串联 | 消除了 D3-19 与 D5:311 的矛盾，不破坏 D7-09 |
| D19-04 | **赞成** | 技术 | 线上用 `record`，与 D5 和 D12 一致；建议实现里一并改名，见下文 |
| D19-05 | **反对** | 串联 | 只在端点一侧补了 `run:null`，Lab 线协议（D12）没接上；而且 `run` 过滤本身会让并发写方的槽位消失 |

## 三处指定核对的结论

1. **D19-05 的 `run:null` 寻址与 D6-05、D7-04、D7-06 是否自洽。**
   - 与 D6-05 自洽：没有移动运行的开始锚点，也没有提前在 store 建运行。
   - 与 D7-04 自洽：`ConversationRow.session` 是 Lab 自有的事实（D7:128，并在 D7-04 的第 ④ 步 `get_state` 时记下），会话的各代共用同一个 session 文件，端点名因此稳定。
   - 与 D7-06 **不自洽**。D7-06 要求从“待人类槽位”投影出 `needs_you`，而 D7-06 落到线上的 D12 写的是 `ExperimentWire.slots // 只有 Open 运行有`（D12-lab-wire.md:263）。此外，介入命令必须带 `run: RunId`（D12:422-423），权限也按“该运行的会话 owner”判定（D12:512）。所以首步槽位即使被发现，也没有地方放，人也无法交回。见 D19-05 的反例 A。
2. **D19-01 的 derive 字段是否与 D6-16 一致。**
   - `parent` 与 `changes` 一致：与 D6:125-129 相同，`Change` 与 store 已实现的 `ChangeSchema` 相同（`packages/store/src/contract.ts:169-172`，`ChangeInput{position,value,name}` 或 `ChangeVersion{fn,from,to}`）。
   - `at` **不一致**。D6-16 和 D6:127 的 `InFlight` 只有 `{slot}`；D5:312、D7-09 和 D12:383 的 `DeriveAt` 都是 `{kind:"InFlight", writerSession, slot}`。D19-01 写的是“沿用 D5、D6-16”，同时引用了两个不同的形状。见 D19-01 的反例。
3. **D19-03 是否破坏 D7-09。** 不破坏。D7-09 要用到两样东西：一是 `writers(runId)` 给出的其余写方端点，二是 `InFlight` 里的 `writerSession`。`[{session, endpoint}]` 两样都提供。D7-06 的“在途写方由根端点 writers 给出”也照样成立。

---

## D19-01 请求体用 `method` 标签：**反对**（修正后转赞成）

**steady 审查：**
- 判别字段这个方向是对的。Mux 原样透传 body：`Call::parse` 只校验 body 是合法 JSON，再拼进 `mux_request{req,body}`，见 `endpoint.rs:67-88`。所以请求形状只能由契约来定。
- `answer` 与 `takeover` 把 `slot` 放在 `HumanHandback` 里面（D5:300），D7-09 写的 `takeover{slot, handback}` 和 D12:615 写的 `{takeover: HumanHandback}` 由此统一，没有冲突。
- `abort{run}` 与 D7-09 一致。

**反例：** `DeriveAt` 的来源含糊，两席会各实现出不同的形状。

- **场景：** F24 的 InFlight 变体。人在 GUI 里对一个仍在运行的调用发起派生（D8-mvp-scope.md:143）。
- **证据：**
  - W-07 若按 D6-16 和 D6:127 实现：`at = {kind:"InFlight", slot}`。插件的边界解析一律用 `.strict()`（`packages/omp-soroi/src/contract.ts:9-26`），store 的 `DeriveSchema` 也是 `strictObject`（`packages/store/src/contract.ts:174-178`）。
  - W-09 按 D12:383 和 D7-09 发送：`{kind:"InFlight", writerSession, slot}`。
- **失效位置：** 注册方解析请求时报出未知键 `writerSession`，derive 被拒。反过来，如果 W-07 按 D5 实现，而 Lab 按 D6 不发 `writerSession`，就缺字段。
- **语义上必须带 `writerSession`：** `SlotId` 是“写这一步的工具调用 id + 调用序号”（D5:295），不含会话。根端点要中止 C，并把 C 所在的那一步提交进 P（D6-16），这一步可能由某个 worker 会话在写，根端点必须知道该找哪个 worker。所以 D6:127 的 `{slot}` 是不足的那一份。

**修正（一行）：** 把 `DeriveAt` 明确为 D12:383（等同 D5:312）：`Committed{step,position} | {kind:"InFlight", writerSession, slot}`。同时在“通过后要改的文档”里加一条：D6:127 的 `Derive.at` 补上 `writerSession`。修正后本席转赞成，不必再讨论。

**divergent 审查：** 如果 D19-05 按下文的建议去掉 `run` 参数，本行的 `slots` 与 `writers` 改成 `{"method":"slots"}` 和 `{"method":"writers"}`。

**非阻断提示（不是本议案引入的缺口）：** `ChangeInput.value` 是 store 的 `Value`，文件值只带 `content: Hash`；新根的字节按 store README:175 走插件的 EvalTransfer。GUI 派生时如果用 Lab 持有的 `ArtifactRef` 作为新的文件输入，字节怎样到达插件可读的位置，目前没有写明。D12 的 P16 只覆盖了交回，没有覆盖派生。F24 的主路径是改标量，不受影响。建议另立一个与 P16 同形的占位。

---

## D19-02 回复体用 `ok` 判别：**反对**（修正后转赞成）

**steady 审查：** 信封的划分是对的。Mux 的传输失败走 HTTP 状态码（401、400、413、503、502，见 `endpoint.rs:122-147`），业务结论放在 200 的 body 里，两者分开。`slots` 回复 `[{slot,fn,state}]`，Lab 再拼上端点对应的会话，就得到 `SlotWire{writerSession,…}`（D12:258），能对上。

**反例：** `derive` 成功时回 `null`，Lab 拿不到新运行的 id。

- **场景：** F24 任一变体。GUI 发 `intervene.derive`。
- **证据：**
  - D12:476 定义 `'intervene.derive': { kind: 'derived'; run: RunId }`。
  - D12-10（D12:42）写的是“intervene/abort 返端点结论”。
  - D7 的序列图 D7-lab-backend.md:205 写“MUX-->>LAB: 结论（新运行 R'，derivedFrom = run）”。
- **失效位置：** 按 D19-02，端点回 `{"ok":true,"value":null}`，Lab 无法按 D12 构造命令结果。要拿到新运行的 id，只能去生命周期流里按 `derivedFrom == parent` 匹配。这是用就近可得的数据代替源头，还得另加一套对应关系，而新运行 R' 的 id 本来就在插件手里：store 返回给插件的 `Derived{run,seq,parentAborted}`（`packages/store/src/contract.ts:180`）。

**修正：** `derive` 成功时 `value` 为 `{"run": <新运行 R' 的 RunId>}`，在 store 确认 `Derived` 后回复。`answer`、`takeover`、`abort` 仍回 `null`。在“通过后要改的文档”里同时把 D5:312 的返回类型 `void` 改为 `{ run: RunId }`。修正后本席转赞成。

**divergent 审查（非阻断）：** 项目的 ADT 惯例要求穷尽处理，`error.kind: string` 是开放字符串，Lab 无法穷尽匹配。建议注册方把它定成封闭枚举，写进插件导出的契约类型，而不只写在说明文字里。设计阶段只走主路径，这一点不构成反对理由。

---

## D19-03 `writers` 返回会话及其端点名：**赞成**

**steady 审查：**
- D3-19（D3-network-mux.md:73）写的是“哪些会话在写 eval、各自的端点名”，D5:311 写的是 `readonly string[]`，两处原本矛盾，本行把它们统一了。
- “包含根会话自身”与 D5:158 一致。
- 对 D7-09 和 D7-06 的影响见上文第 3 条核对：都不破坏。

**divergent 审查：** 按 D3-19，`endpoint` 就是 `eval:<session>`，是 `session` 的确定函数，同一个事实在线上有两种写法。好在它们由同一个权威（根会话的监管者）一次产出，不构成第二个源头，也省得 Lab 自己拼端点名。可以接受。

---

## D19-04 Shape 的线上标签沿用 `record`：**赞成**

**steady 审查：**
- 线上形状与 D5:113-115、D12:97 一致，Lab 照 D12-01 转录即可对上。
- 插件内的 `{kind:"fields"}` 只出现在插件内部：`contract.ts:9-15` 的定义，`subagent/protocol.ts:40` 的 host call，以及 `supervisor.ts:63` 的 sidecar。它不越过组件边界，只在出口转换一次，主路径不会断。

**divergent 审查（非阻断，建议在实现层采纳）：** D5 §3.1 把 `Shape` 定在 `packages/omp-soroi/src/contract.ts` 中，标签是 `record`。现在的实现偏离了已通过的正文，出口转换等于给这份偏离补一层翻译。另外，`eval/check.ts:356-363` 里 `bind.kind` 与 `shape.kind` 都叫 `"fields"`（`Binding` 定义在 `eval/model.ts:24`），两个不同的类型共用一个标签。直接把 `Shape` 的标签改成 `record`，涉及 contract.ts、check.ts、protocol.ts 和测试几处，改完后出口不需要转换，同名标签的歧义也一并消除。这属于实现层面的选择，不影响本条对线上形状的投票。

---

## D19-05 首步 Human 用 `run:null` 发现：**反对**

**问题本身成立：** 首步正式运行在等人交回时，store 里还没有运行（D6-05；插件在 `eval/index.ts:57,77` 按“当前有无 Open 运行”决定发 `open` 还是 `existing`），`slots(runId)` 无从寻址。soroi#209 的 BLOCKED 第 4 点说的就是这件事，必须补上。草案的补法有两个主路径反例。

### 反例 A：Lab 线协议没接上，槽位发现了也交回不了（死锁）

- **场景：** 讨论会话启动实验，状态是 `pending_launch=sent`。AI 的第一次正式 `soroi_eval` 中含 `human(...)`；dry run 里它被钉住（D5-11 第 10 条），正式运行时开出一个 `awaiting_human` 槽位。此时 store 中还没有运行。
- **证据与失效位置：**
  1. Lab 照 D19-05 用 `slots(null)` 拿到了槽位，但 `ExperimentWire.slots` 被规定为“只有 Open 运行有”（D12:263），首步槽位在目录线上无处可放，D7-06 的 `needs_you` 投影不出来。
  2. 即使 GUI 拿到了槽位，`intervene.answer` 的类型是 `{run: RunId; slot; handback}`（D12:423），而此时不存在 `RunId`。D12-01 规定浏览器边界和 Lab 入口各解析一次，这个命令在边界上就构造不出来。
  3. 权限判定“`write`，且是该运行的会话 owner”（D12:512）要从运行推出会话。D7-09 的“找端点”只写了“取自 store 运行记录的根 session”，没有无运行时的分支。D19-05 的 where 列提到了 D7-09，但 how 列没有修改它，也完全没有列出 D12。
- **结果：** 人交不回答案，这一步就提交不了；这一步不提交，store 就不建运行；没有运行，按草案的规则也就永远不会改用 RunId 寻址。首步含 Human 的实验卡死在 `sent` 状态。

### 反例 B：`run` 过滤会让并发写方的在途槽位消失

- **场景：** D5-07 的主路径。主 agent 用一次 `soroi_task` 派出 worker A 和 worker B，两者在同一个运行里各写一步。两个 worker 开始第一步时都还没有运行。B 先提交，带 `open` 建立了运行 R。这时 A 的第一步还在途，含一个 `awaiting_human` 槽位，或者一个正在跑、人想接管的调用。
- **证据：** 草案把 `slots(null)` 定义为“尚未建立运行的在途步”中的槽位，那么 `slots(R)` 就只含属于 R 的在途步。现行插件在一步开始时解析一次 `runId`（`eval/index.ts:57`），并把它一直用到提交（`:77`）。照这个读法，A 的在途步被归为 null。
- **失效位置：** R 建立后，Lab 照草案“运行建立后按 RunId 寻址”：先发 `writers(R)`，再对 A 的端点发 `slots(R)`，结果为空。Lab 不会再发 `slots(null)`，因为 R 已经是 Open。A 的槽位从在途叠加层（D6-11、D7-08）里消失：Human 等不到交回，接管（F23）也找不到目标。A 不交回，这一批就不释放（D5-12）；有未释放的批次，根会话就无法确认运行结束（D6-05 的 ①）。
- **根因：** 按 D6-05，一个根会话同一时刻至多有一个未结束的运行，所以根会话下全部写方的全部在途步，都属于“该会话当前或即将建立的那一个运行”。`run` 参数对槽位集合没有提供任何区分信息。它只会引出“这一步算哪个运行”的归类问题，而归类在别的写方先提交时就会出错。

### 修正

本席建议直接采用 divergent 方案。它比“为 null 补路径”更简单，两个反例也一并消除。

1. **槽位按会话寻址，不再按运行。** `slots` 与 `writers` 去掉 `run` 参数，写成 `{"method":"slots"}` 和 `{"method":"writers"}`。`slots` 返回本会话当前全部在途槽位；`writers` 返回本根会话下当前全部写方，含自身。D5:304 和 D5:311 的签名同步去掉 `runId`。这只改了查询的过滤条件，不动 D6-05 的锚点和 D3-19 的路由。
2. **Lab 按自己持有的会话去查。** 对有在线一代的根会话（Lab 是这一代的写方，自己就知道哪些会话在线），从 `eval:<conversation.session>` 读 `writers`，再逐个读 `slots`。D12:605 的“Open 运行”改成“在线的根会话”。已停驻的会话没有在途的 `soroi_eval`：工具调用活不过一轮，worker 的监管者又在根进程里，所以不必唤醒它们，也不会违反 D3-19 关于“先开新一代”的规定。读到的槽位挂到哪里：该会话有 Open 运行时，挂到这个运行的 `ExperimentWire.slots`；没有时，挂到该会话的 `pendingLaunch` 实验项上（Discussion 来源）或 `ConversationWire` 上（Panel 与 Automation 来源）。同时改掉 D12:263 的注释。
3. **介入命令按会话寻址。** `intervene.answer` 与 `intervene.takeover` 的 `run: RunId` 换成 `conversation: ConversationId` 加 `writerSession: SessionId`，后者 `SlotWire` 本来就有（D12:258）。Lab 直接把请求发到 `eval:<writerSession>`，权限按 `conversation.owner` 判定。D12:512 的“该运行的会话 owner”本来就是这个会话的 owner，语义不变。D7-09 的“找端点”相应补上“无运行时取 `conversation.session`”。

如果起草方坚持保留 `run`，最低也要做到两点，才能消除两个反例：
- **消除反例 A：** 写明上面第 2、3 条对 D7-09 和 D12（`:263`、`:422-423`、`:512`、`:605`）的修订，并列入“通过后要改的文档”。
- **消除反例 B：** 规定 `slots(R)` 返回“本会话全部在途槽位，当且仅当 R 是本根会话当前的 Open 运行”。但这样一来，`run` 已经只是一个恒等的过滤条件，不如直接删掉。

---

## 计票口径

- 本席：D19-03、D19-04 赞成；D19-01、D19-02、D19-05 反对。
- D19-01 与 D19-02 的反例各只需一行修正，起草方采纳后本席即转为赞成。
- D19-05 的反例 A、B 都涉及 D12（W-09 的线协议），需要起草方给出修订文本，本席复核后再改票。

---

# 第 2 轮（复核 D19 v2）

复核对象：`local://decisions/D19.md` v2。对照第 1 轮的反例逐条核对，再到 PM 克隆中检索 `writers(runId)`、`slots(runId)`、`ConversationWire` 和 `WritersReply`，检查已通过正文里是否还有残留冲突。

## 第 2 轮总表

| 条目 | 第 2 轮票 | 分类意见 | 结论 |
| --- | --- | --- | --- |
| D19-01 | **赞成** | 串联 | 反例已消除 |
| D19-02 | **赞成** | 串联 | 反例已消除 |
| D19-03 | **赞成**（维持） | 串联 | 设计不变；替换清单要补 D3:147，见下文 |
| D19-04 | **赞成**（改后重投） | 技术 | 内部表示交给 W-07 自定，线上形状不变 |
| D19-05 | **赞成** | 串联 | 反例 A、B 都已消除；替换清单要补 D12:149-150 等处，见下文 |

## 逐条复核

**D19-01：赞成。**
- `DeriveAt` 只剩一个来源，即 D12:383：`Committed{step,position}`，或 `{kind:"InFlight", writerSession, slot}`。
- D6:127 已列入替换。严格解析不会再因为多一个键或少一个键而拒绝请求。
- `slots` 与 `writers` 不再带 `run`，与 D19-05 的会话寻址一致。

**D19-02：赞成。**
- `derive` 在 store 确认后回 `{"run": Derived.run}`，满足 D12:476 的 `{kind:'derived', run}`。D5:312 已列入替换。
- `ErrorKind` 改成封闭枚举，写进插件导出的契约。
- 非阻断提示：Lab 按 D12-01 的方式转录这个枚举。D12-01 当前的转录来源只列了“D5 §3.6 + D12-14”，建议回写 D12 时把 `ErrorKind` 一并列为转录项。

**D19-03：赞成，维持。** 补充一个残留冲突，属于替换清单的遗漏，不推翻设计：D3 接口草图里已有一份 writers 回复类型，D3:147 写的是 `WritersReply = { runId: string; writers: { sessionId: string; endpoint: string }[] }`。它带 `runId` 外层，字段名是 `sessionId`，与 D19-03 的 `[{session, endpoint}]` 不同。如果 W-09 照 D3:147 严格解析，在途叠加层会读成空。这一处必须列入替换（见下面的清单）。

**D19-04：赞成，改后重投。**
- 线上形状仍是 `single` 或 `record`，与 D5:113-115、D12:97 一致。
- 插件内部表示交给 W-07 自定，两条路都写明了：在出口转换，或者按 D5 §3.1 把内部标签改成 `record`。实现可以自由选择，不影响跨组件契约。

**D19-05：赞成。**
- **反例 A 已消除。** 首步槽位读取后的挂载已经写明：有运行时挂到 `ExperimentWire.slots`；没有运行时，Discussion 来源挂到 `pendingLaunch` 实验项，Panel 和 Automation 来源挂到 `ConversationWire`。`intervene.answer` 与 `intervene.takeover` 改为用 `conversation` 加 `writerSession` 寻址，权限改为按会话的 owner 判定，D7-09 补上了无运行时的分支。人能交回，实验不会卡在 `sent`。
- **反例 B 已消除。** 槽位按会话列出，不再归属于某个运行，并发写方先提交时不会再把别的写方的在途步归错。
- `derive` 和 `run.abort` 仍按运行寻址。两者都必须已有运行（`parent` 和 `run`），所以这样寻址正确。
- 只读取在线的根会话，这一点成立：已停驻的会话没有在途的 `soroi_eval`，worker 的监管者又在根进程里。

## 替换清单还须补全

这些是编辑性补充，不是设计反例，不需要再投票。本席的赞成票以它们进入替换清单为前提。按“修正文档必须全面检查关联文档的语义”，执行回写时还要替换以下仍写着按运行寻址、或与新线上形状冲突的已通过正文：

- **D3：**
  - D3:73（D3-19：`writers(runId)`，以及“从 store 查到根会话 → writers(runId)”）
  - D3:133（注释 `writers(runId)`）
  - **D3:147（`WritersReply` 改为 `{session, endpoint}[]`，去掉 `runId` 外层）**
- **D5：**
  - D5:61（采用的相邻决策里写着 `writers(runId)`）
  - D5:89（D5-14）、D5:90（D5-15）
  - D5:363（P7）
- **D6：**
  - D6:33（D6-05“根端点另答 `writers(runId)`”）
  - D6:319（P6）
- **D7：**
  - D7:38（框架）
  - D7:68（D7-08 在途叠加层：`writers(runId)` 加“逐个请求 slots”，改为按在线根会话读取）
  - D7:198、:200（序列图）
- **D8：**
  - D8-mvp-scope.md:276（SOR-13 行：`slots(runId)`、`writers(runId)`）
  - F08 行中的 `writers(runId)` 写法
- **D12：**
  - **D12:149-150：`ConversationWire` 加 `slots: SlotWire[]`。D19-05 要求 Panel 和 Automation 的槽位挂在这里，但这个类型目前没有槽位字段，不加就无处可挂。**
  - D12:36（D12-04 目录说明里“writers→slots”的来源改为在线根会话）
  - D12:614（序列图中的命令 `intervene.takeover{run, slot, handback}`；清单只列了 :615）

清单中加粗的两项（D3:147、D12:149-150）会直接让两席的解析对不上，必须在定稿时写进“通过后要改的文档”。其余各项是语义上残留的旧写法，由秘书或 Argon 回写时一并替换。

## 第 2 轮计票口径

本席第 2 轮：D19-01 至 D19-05 全部**赞成**。第 1 轮提出的反例已全部消除。上面的替换清单补全属于编辑性执行，不影响本席的票。

---

# 第 3 轮（复核 D19 v3：重投 D19-02、D19-05）

复核对象：`local://decisions/D19.md` v3。v3 只改了 D19-02、D19-05 两条正文和“通过后要改的文档”；D19-01、03、04 与 v2 相同，本席第 2 轮的赞成票维持不变。

## 第 3 轮总表

| 条目 | 第 3 轮票 | 分类意见 | 结论 |
| --- | --- | --- | --- |
| D19-02 | **赞成** | 串联 | 第 1 轮反例（`derive` 回新运行 id）仍已消除；删去失败分支符合本仓规则 |
| D19-05 | **赞成** | 串联 | `ConversationWire.slots` 已补上，替换清单全部并入 |

## D19-02：赞成

**第 2 轮依据的变化：** 第 2 轮赞成时引用了“`ErrorKind` 已改成封闭枚举”，v3 删掉了这一项。这不影响本席的票：本席在第 1 轮就把 `ErrorKind` 列为非阻断建议，当时写明“设计阶段只走主路径，这一点不构成反对理由”。第 1 轮的反对理由只有一个，即 `derive` 回 `null`。v3 仍保留 `derive` 回 `{"run": Derived.run}`，D5:312 的修改也仍在替换清单里，所以这个反例依旧消除。

**steady 审查：**
- 各方法成功时的 `value` 与 D12 的命令结果逐一对得上：`answer`、`takeover`、`abort` 回 `null`，对应 D12:474、475、477 的 `Done`；`derive` 回 `{run}`，对应 D12:476；`slots` 回 `[{slot,fn,state}]`，拼上会话后就是 D12:258 的 `SlotWire`；`writers` 见 D19-03。
- 删掉失败回复和 `ErrorKind`，符合 `.claude/rules/design-assumes-it-works.md` 的要求：设计阶段只写主路径，不为失败分支设计处理。主路径上两席的解析仍然一一对应。

**divergent 审查（非阻断）：** 同一条规则还写着“不为失败分支……预留结构”。`"ok":true` 的唯一作用，是将来与失败变体区分开，严格说也是为失败分支预留的结构。如果严格执行这条规则，成功回复可以直接写成 `{"value":V}`；`void` 写成 `{"value":null}` 一样有明确的 JSON 表示，Mux 的 `parse_reply` 接受任意 JSON 作为 body（`endpoint.rs:43-63`）。保留 `ok` 不会让主路径断裂，两席对上同一个字面量即可，所以本席不据此反对。是否去掉，由起草方和 ArgonSol 按同一条规则统一口径决定。

## D19-05：赞成

**核对：**
- D12:149-150 的 `ConversationWire` 已新增 `slots: SlotWire[]`，Panel 和 Automation 来源的首步槽位有了挂载点。第 1 轮反例 A 对这两种来源的残留缺口也已补上。
- 第 2 轮替换清单逐项都已并入“通过后要改的文档”：
  - 加粗的 D3:147（`WritersReply` 去掉 `runId` 外层，改为 `{session, endpoint}[]`）和 D12:149-150；
  - D12:36、:614；
  - D3:73、:133；
  - D5:61、89、90、363；
  - D6:33、319；
  - D7:38、68、198、200；
  - D8-mvp-scope.md:276 的 SOR-13 行与 F08 行。
- 第 1 轮反例 A、B 仍已消除：介入命令按会话寻址，人能交回；槽位按会话列出，不再按运行过滤，并发写方先提交时不会丢槽位。

**非阻断编辑提示：** 新字段的定义写的是“该会话在线一代当前全部在途槽位”，挂载规则写的却是“Panel 和 Automation 来源挂到 `ConversationWire.slots`”。照字段定义，Discussion 会话的 `ConversationWire.slots` 也会有值，于是同一个槽位会同时出现在 `ExperimentWire.slots`（或 `pendingLaunch` 实验项）和 `ConversationWire.slots` 里。两份都来自同一次端点读取，不构成第二个源头，主路径也不会断。但前端投影 `needs_you` 时，可能把同一个槽位算两次。建议回写 D12 时二选一：
1. 把字段定义收窄为“仅 Panel、Automation 来源的会话填充”；
2. 或者在 D7-06 和 D12 的投影说明里写明，Discussion 来源的 `needs_you` 只取实验项。

## 第 3 轮计票口径

本席第 3 轮：D19-02、D19-05 **赞成**；D19-01、D19-03、D19-04 维持第 2 轮的**赞成**。D19-01 至 D19-05 全部赞成，本席提出的反例已全部消除。上面两条提示都不阻断，也不影响本席的票。
