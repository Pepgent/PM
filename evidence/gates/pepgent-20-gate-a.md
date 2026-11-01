# Pepgent LAB-07b（#20）：闸门 A（意图与公开契约）判定

## 四项结论

| 项目 | 闸门 A 结论 | 可执行处置与 P0 边界 |
| --- | --- | --- |
| **一：子 agent 的所属 Lab** | **主路径（处置 a）不越界，可免票放行：`D5 §3.6` 与 `D12` 已规定 `SlotState.running` 含 `agentId?: AgentId`，`omp-soroi` 漏填属 W-07 实现缺口。若要覆盖首步尚无运行期间或非槽位子 agent 而修改 `D12:537` 归属规则（处置 b）或改跨仓协议（处置 c），必须 P0 投票。** | 免票范围限于按现有 `D5 §3.6` / `D12:99,537` 补齐 `SlotState.running.agentId` 并按槽位归属。若立 P0 修订 `D12:537`，依 `(U) bf96d256` 与 `D18-05` 严禁将 `labId` 侵入 soroi 或 Mux，应按根会话 `conversation.lab`（或每 Lab 独立 Mux 实例）归属（处置 b 方向）。 |
| **二：Discussion 无运行且无 `pendingLaunch` 时槽位的位置** | **触及 `D12-04` / `D19-05②` 的公开 wire 挂载缺口，必须 P0 投票。** | `D7-06` 允许讨论会话不经 `experiment.start` 直接发起正式运行，其首步在途期间无运行且无 `pendingLaunch` 在主路径可达；现行挂载表漏列该分支。处置 a/b/c 均改变或补齐公开挂载契约，处置 d 使整个 `readCatalog` 失败，均不能免票放行。 |
| **三：端点读取失败与上下线竞态的语义** | **不越界，可免票放行（处置 d：由工程师在既有错误变体与 `[]` 之间自定，含采用处置 b / c 将 worker 或刚启动根端点的 404/503 竞态记为 `[]`）。** | 依据 `D19-02` 与 `.claude/rules/design-assumes-it-works.md`，失败分支与端点注册/下线竞态不在设计范围内；尚未注册控制端点或已下线的代本无在途 `soroi_eval` 槽位，记为 `[]` 不改变 `D12:151` 公开语义，无需 P0。 |
| **四：槽位变化的通知源与无运行槽位频道** | **触及 `D7-08` 与 `D12-17`（及若选 c 则触及 `D19-01`）的公开通知来源与失效频道缺失设计，必须 P0 投票。** | `D12-17` 已把“写方端点的槽位变化”列为 `run` 频道触发条件，但 `D7-08` 未定通知源，且无运行槽位变化走哪个频道未在 `D12-17` 定义；处置 a/b/c/d 均须 P0 表决。 |

以上四项分别判定，仅当闸门 A 与闸门 B 对同一具体处置均确认不越界时方可免票放行；任一闸门认定越界的项须合入 P0 议案逐行表决（`(U) U96`，`SOR/LEDGER.md:110`；`(D)` `SOR/AGENTS.md:60`、`DEC/D10-repo-delivery.md:20`）。

对象：[Pepgent/Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20)（[评论 6561107115](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115)）；材料：`GATE/pepgent-20.md`。本次只写本文件，不提交、不在 GitHub 发言、不联系工人。

## 一、意图裁决

| 意图裁决 | U 原文与出处 | 本次适用边界 |
| --- | --- | --- |
| **定：多租户概念属于 Web（Lab 后端），严禁侵入 soroi 或 Mux** | `(U) bf96d256`：“你错了，web对接soroi多租户啊，我说的是多租户概念不侵入soroi，想什么啊”（`DEC/D18-product-opus-contracts.md:11`） | 解决子 agent 所属 Lab 时，严禁在 `omp-soroi` 或 `omp-rpc-mux` 协议中新增 `labId` 字段；归属只能在 Lab 后端按根会话 `conversation.lab` 或每 Lab 独立实例判定。 |
| **定：全流程功能（含首步人类介入与实时运行图）不收缩，不因局部未决设全席停工锁** | `(U) U2`、`U23`（`SOR/LEDGER.md:69,86`）；`(U) U30–U32`、`U83`（`SOR/LEDGER.md:88,97`）；`(U) U96`（`SOR/LEDGER.md:110`） | 讨论会话首步在途槽位（尤其 `awaiting_human`）不能被永久吞掉或导致整个目录不可读；公开契约缺口按 P0 表决，表决前只暂停依赖该缺口的部分。 |
| **定：没有 U 原文的具体技术选择不冒充用户意图** | `(U) U1`、`U20`（`SOR/LEDGER.md:68,84`） | 用户未逐字指定端点竞态错误码或槽位变化通知的具体探测机制（RPC 帧 vs 订阅期轮询），不就此类技术路径行使意图否决。 |

## 二、第一项：子 agent 的所属 Lab（A1-1 至 A1-4）

1. **A1-1（主路径已有契约，属实现缺口）：**
   - `(D)` `DEC/D5-plugins-eval.md:297`（D5 §3.6）与 `DEC/D12-lab-wire.md:99-100` 已明文规定 `SlotState.running` 包含 `agentId?: AgentId`；`DEC/D12-lab-wire.md:537` 规定子 agent 由槽位的 `agentId` 关联所在运行取 `experiment_ext.lab_id`。
   - `(D)` `SOR/packages/omp-soroi/src/eval/slots.ts:15-19` 未填入 `agentId` 是 W-07 对已通过契约的实现遗漏，不是契约空白。**处置 a（维持现有契约，由 W-07 补齐 `SlotState.running.agentId`，Lab 按槽位 `agentId` 关联归属）不越界，A 免票放行。**
2. **A1-2（首步正式运行尚无 store 运行时的归属）：**
   - 按 `D6-05` 与 `D19-05`，首步正式运行在途期间尚无 `run_id` 与 `experiment_ext`，但槽位正是从该根会话 `eval:<conversation.session>` 的 `writers`/`slots` 读出的，业务上天然属于 `conversation.lab`。
   - 然而 `D12:537` 字面只写了“取它所在运行的 `experiment_ext.lab_id`”（系 `D19-05` 改按会话寻址前的表述）。若要将子 agent 归属正式改为（或补充为）取所属根会话的 `conversation.lab`（**处置 b**），属于对 `D12:537` 公开权限规则的修订（`G-7`、`G-8`），**须进入 P0 表决**。
3. **A1-3（不在槽位里的子 agent）：**
   - `soroi_task` 派出的中心 worker 是写方会话（出现在根会话 `writers()` 返回的 `{ session, endpoint }` 中，但 `writers()` 返回的是 `SessionId` 而非 `AgentId`）；槽位已结束但仍在线的子 agent 与 dry run 子 agent 则不在当前 `slots()` 中。
   - 注意 `(D)` `DEC/D18-product-opus-contracts.md:11`（**D18-05**，已获 5/5 通过）已规定：每个 Lab 部署一套独立的 soroi 实例（含独立的 Mux、store），Lab 后端按 `labId` 路由到对应 Lab 的 `SOROI_MUX_URL`。在 D18-05 下，某 Lab 的 Mux 实例上的在线 agent 天然属于该 Lab。若在单路由 `/api/lab/agents/{id}/stream` 下需修订 `D12:537` 的归属判定（如处置 b 按根会话 `conversation.lab` / 该 Lab 的 Mux 实例归属，或处置 c 扩展 `writers` / Mux 关联），均触及公开契约，**须进入 P0 表决**；且依 `(U) bf96d256`，任何往 soroi 或 Mux 内部塞入 `labId` 的方案均违背用户本意。
4. **A1-4（dry run 子 agent）：**
   - `(D)` `SOR/design/intervention.md:7,16` 明定 dry run 不写 store、不开槽位；未发现任何 `(U)` 原话要求 GUI 必须为无运行、无槽位的 dry run 子 agent 开放流代理。`F26 S2` 与 `F31 ④` 针对正式运行的节点与流。

## 三、第二项：Discussion 无运行且无 `pendingLaunch` 时槽位的位置（A2-1 至 A2-3）

1. **A2-1（主路径可达，属公开 wire 缺失设计，必须 P0）：**
   - `(D)` `DEC/D7-lab-backend.md:66`（D7-06）明确允许讨论会话在无 `pending_launch` 时直接发起正式 `soroi_eval`（“无 pending 时取讨论名称项目”）。该首步在途期间会话尚无 store 运行（`D6-05`），也无 `pendingLaunch`，但已有在途槽位。`D12-04`（`:36`）与 `D19-05②`（`DEC/D19-sor13-control-contract.md:33`）只写了 Discussion 挂 `pendingLaunch`、Panel/Automation 挂 `ConversationWire.slots`，漏掉了“Discussion 无运行且无 `pendingLaunch`”这一格，**必须 P0 投票**。
2. **A2-2（`ConversationWire.slots` 注释与正文的张力）：**
   - `DEC/D12-lab-wire.md:151` 注释写 `ConversationWire.slots` 为“该会话在线一代当前全部在途槽位”，但 `:36` 与 `D19-05②` 为避免重复携带，对 Discussion 规定了与 Panel/Automation 不同的挂载位置，且 `:270` 写 `DiscussionHeaderWire`“只随 catalog 频道失效”。因此选择**处置 a**（无运行且无 `pendingLaunch` 时挂到 `DiscussionHeaderWire.conversation.slots`，有 `pendingLaunch` 或运行后移走）虽不新增字段且最简洁，仍需通过 **P0** 明确补入 `D12-04` / `D19-05②` 挂载规则（本席在 P0 中支持处置 a，不赞成凭空伪造四字段全 `null` 的假 `ExperimentWire` 处置 b）。
3. **A2-3（处置 c 与处置 d 不可作为最终契约）：**
   - 若选**处置 c（不展示）**，当讨论会话不经 `experiment.start` 在首步调用主动 `human(request)` 时，槽位进入 `awaiting_human`，不展示会使人无法发现并交回，导致首步永远无法提交建出运行，直接违背 `D19-05` 取舍目的与 `(U) U2`、`U23`。
   - **处置 d（让整个 `readCatalog` 返回 `not_supported` 失败）** 会使整个实验室目录在讨论首步在途期间崩溃不可读，不可放行。

## 四、第三项：端点读取失败与竞态的语义（A3-1 至 A3-2）

1. **A3-1（属设计范围外的失败/竞态处理，免票放行处置 d）：**
   - `(D)` `DEC/D19-sor13-control-contract.md:30`（D19-02）与 `SOR/.claude/rules/design-assumes-it-works.md` 明确规定：控制端点失败回复与并发/上下线竞态不在设计阶段规定范围内，按占位由实现处理。
   - 因此，worker 在 `writers()` 与 `slots()` 之间下线（404/503）或根会话刚 `ready` 尚未注册端点（404）的竞态处理，属于已通过契约内的单仓实现细节（`G-7`），**不触及产品意图或公开契约，闸门 A 免票放行处置 d（由工程师自定，含采用处置 b / c）**。
2. **A3-2（将 404/503 下线/未注册竞态记为 `[]` 不改变公开语义）：**
   - 尚未注册控制端点或进程代已下线的会话，实际上没有任何正在执行的 `soroi_eval` 在途槽位；将其记为 `[]` 表达的就是“当前无在途槽位”的真实事实（不同于 LAB-07a 中未实现读取代码却硬编码 `[]`）。不改变 `D12:151` 的公开语义，也无需新增错误变体。

## 五、第四项：槽位变化的通知源与无运行槽位频道（A4-1 至 A4-4）

1. **A4-1（属公开通知契约的缺失设计，必须 P0）：**
   - `(D)` `DEC/D12-lab-wire.md:558`（D12-17）已将“它任一写方端点的槽位变化”列为 `run` 频道的触发条件，但 `(D)` `DEC/D6-store-service.md:32`（D6-04）规定 store 事件只在整步提交时才写入，在途槽位的开启与进入 `awaiting_human` 不会出现在 store 运行流中；同时 `D7-08` 与 `D19-01` 未规定 Lab 如何获知槽位变化。该缺口对有运行和无运行的在途槽位同样存在，**必须 P0 投票**。
2. **A4-2（无运行槽位变化的失效频道未覆盖，须一并 P0）：**
   - 无运行槽位（挂在 `pendingLaunch` 实验项、无 pending 的 Discussion 或 Panel/Automation `ConversationWire.slots`）变化时，数据库中的 `pending_launch` 行与会话头并未改变，`D12-17` 现有文字未覆盖其触发频道，须在 P0 中明确（例如有运行发 `run{run}`，无运行按挂载位置发 `catalog` / `conversation{id}`）。
3. **A4-3（处置 a 修改已通过 `D12-17` 契约并影响在途可观察性，不能免票）：**
   - 若选处置 a（删去 `D12-17` 的槽位变化触发、不推通知），在途调用进入 `awaiting_human`（`F08 S2`）或长时运行（`F31 ④`）期间，直到整步结束前 store 无事件发出，GUI 将无法及时刷新出待人工回答的槽位。因此处置 a 修改了已通过的 `D12-17` 与验收可观察性，不能免票放行。
4. **A4-4（各候选的通知机制边界）：**
   - **处置 c** 修改 `D19-01` / `D3-19` 控制端点跨仓协议；**处置 b**（Lab 从已持有的根会话/写方读方 RPC 流观察 `soroi_eval` 的 `tool_execution_*` 等帧后重读槽位并按挂载位置发事件）或 **处置 d**（Lab 在有浏览器订阅 `/api/lab/events` 期间对在线根会话定期读取 `writers`/`slots`，有变化时发对应频道，与 `D7-12` 有订阅者时定期读 `remote runs`/`status` 推 `compute` 同构）虽不改 `D19-01` 控制端点协议，但均需补齐 `D7-08` 通知源与 `D12-17` 无运行槽位的频道映射，故均须通过 **P0** 表决选定。
