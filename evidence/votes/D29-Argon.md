# D29 选票：Argon

议程：Pepgent#20 LAB-07b：agent 所属 Lab、讨论首步槽位挂载与槽位变化通知（SO-1 至 SO-4）（[Pepgent/PM#48](https://github.com/Pepgent/PM/issues/48)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D29-01 v1：赞成（Argon-2，2026-11-01T17:35:21.927Z）


**分类意见：** 串联

# D29（PM#48）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】多租户与 Lab 归属只留在 Lab 后端（按每 Lab 独立部署的 Mux 实例归属），严禁向 `soroi` 或 `omp-rpc-mux` 内部侵入 `labId`；同时补齐讨论会话无 `pendingLaunch` 时的首步槽位挂载与在途槽位变化通知源，保障首步人类介入与实时运行图完整可用。**
   - **依据：** `(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05：“你错了，web对接soroi多租户啊，我说的是多租户概念不侵入soroi，想什么啊”）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，走通全部人类介入与观察流程）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）；`(D)` `DEC/D7-lab-backend.md:66,68,72`、`DEC/D12-lab-wire.md:36,149-151,270,541-573`、`DEC/D19-sor13-control-contract.md:29,33`、`evidence/gates/pepgent-20-gate-a.md`。
   - **边界：** 四项均属于 Pepgent Lab 后端消费与公开线协议（`D7`、`D12`、`D19-05②`）的闭合，`design/store.md:150` 与 `design/intervention.md:11` 现有“无运行时挂到 `pendingLaunch` 实验项或 `ConversationWire.slots`”表述已兼容，无需再改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D29-01 v1（SO-1）** | 串联 | **approve（赞成）** | 严格对齐已通过的 D18-05（`(U) bf96d256`，每 Lab 一套独立 Mux 实例，`soroi` 与 `Mux` 不含 Lab 字段）：Lab 后端处理 `/api/lab/agents/{id}/stream` 与 `/files*` 时，从调用者所属各 Lab 的 Mux 实例 `GET /agents` 列表（D3-15，写方声明存续期间含停驻 agent）确定该 `agentId` 所属 Lab 并授权转发。一条规则同时覆盖根 agent、有/无运行时的槽位子 agent、`soroi_task` 中心 worker 及槽位已结束仍在线/停驻的 agent，且不改动任何跨仓协议或 HTTP 路由签名。 |
| **D29-02 v1（SO-2）** | 串联 | **approve（赞成）** | 补齐 `D12-04` 与 `D19-05②` 漏掉的“Discussion 无 `Open` 运行且无 `pendingLaunch`”分支，将该状态下的在途槽位挂到 `DiscussionHeaderWire.conversation.slots`，保证讨论会话不经 `experiment.start` 直接发起正式运行时首步 `awaiting_human` 槽位可被发现并交回，且无需新增字段或伪造全 `null` 的假 `ExperimentWire`。 |
| **D29-03 v1（SO-3）** | 串联 | **approve（赞成）** | 与 `D7-12`（有订阅者时定期读 `remote runs`/`status`）同构：仅在某 Lab 的 `/api/lab/events` 有浏览器订阅者期间，Lab 对自己持有在线一代的根会话定期读取 `writers` → `slots`，与上一次观测集合比较（仅作差分基准，不作读取缓存源），发现变化即按挂载位置发通知。无需修改 `D19-01` 控制端点封闭联合或 `omp-rpc-mux`，且完整覆盖 Lab 不直接持有 stdout 的中心 worker 写方。 |
| **D29-04 v1（SO-4）** | 串联 | **approve（赞成）** | 槽位变化通知频道与 `SO-2` 的四个挂载位置一一对应（运行项发 `run{run}`，`pendingLaunch` 实验项或讨论头发 `catalog`，Panel/Automation 会话头发 `conversation{id}`），直接复用现有 `LabChange` 联合与 `D12-17` 失效读取规则，不新增频道变体。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D29-02 v1：赞成（Argon-2，2026-11-01T17:35:21.928Z）


**分类意见：** 串联

# D29（PM#48）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】多租户与 Lab 归属只留在 Lab 后端（按每 Lab 独立部署的 Mux 实例归属），严禁向 `soroi` 或 `omp-rpc-mux` 内部侵入 `labId`；同时补齐讨论会话无 `pendingLaunch` 时的首步槽位挂载与在途槽位变化通知源，保障首步人类介入与实时运行图完整可用。**
   - **依据：** `(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05：“你错了，web对接soroi多租户啊，我说的是多租户概念不侵入soroi，想什么啊”）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，走通全部人类介入与观察流程）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）；`(D)` `DEC/D7-lab-backend.md:66,68,72`、`DEC/D12-lab-wire.md:36,149-151,270,541-573`、`DEC/D19-sor13-control-contract.md:29,33`、`evidence/gates/pepgent-20-gate-a.md`。
   - **边界：** 四项均属于 Pepgent Lab 后端消费与公开线协议（`D7`、`D12`、`D19-05②`）的闭合，`design/store.md:150` 与 `design/intervention.md:11` 现有“无运行时挂到 `pendingLaunch` 实验项或 `ConversationWire.slots`”表述已兼容，无需再改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D29-01 v1（SO-1）** | 串联 | **approve（赞成）** | 严格对齐已通过的 D18-05（`(U) bf96d256`，每 Lab 一套独立 Mux 实例，`soroi` 与 `Mux` 不含 Lab 字段）：Lab 后端处理 `/api/lab/agents/{id}/stream` 与 `/files*` 时，从调用者所属各 Lab 的 Mux 实例 `GET /agents` 列表（D3-15，写方声明存续期间含停驻 agent）确定该 `agentId` 所属 Lab 并授权转发。一条规则同时覆盖根 agent、有/无运行时的槽位子 agent、`soroi_task` 中心 worker 及槽位已结束仍在线/停驻的 agent，且不改动任何跨仓协议或 HTTP 路由签名。 |
| **D29-02 v1（SO-2）** | 串联 | **approve（赞成）** | 补齐 `D12-04` 与 `D19-05②` 漏掉的“Discussion 无 `Open` 运行且无 `pendingLaunch`”分支，将该状态下的在途槽位挂到 `DiscussionHeaderWire.conversation.slots`，保证讨论会话不经 `experiment.start` 直接发起正式运行时首步 `awaiting_human` 槽位可被发现并交回，且无需新增字段或伪造全 `null` 的假 `ExperimentWire`。 |
| **D29-03 v1（SO-3）** | 串联 | **approve（赞成）** | 与 `D7-12`（有订阅者时定期读 `remote runs`/`status`）同构：仅在某 Lab 的 `/api/lab/events` 有浏览器订阅者期间，Lab 对自己持有在线一代的根会话定期读取 `writers` → `slots`，与上一次观测集合比较（仅作差分基准，不作读取缓存源），发现变化即按挂载位置发通知。无需修改 `D19-01` 控制端点封闭联合或 `omp-rpc-mux`，且完整覆盖 Lab 不直接持有 stdout 的中心 worker 写方。 |
| **D29-04 v1（SO-4）** | 串联 | **approve（赞成）** | 槽位变化通知频道与 `SO-2` 的四个挂载位置一一对应（运行项发 `run{run}`，`pendingLaunch` 实验项或讨论头发 `catalog`，Panel/Automation 会话头发 `conversation{id}`），直接复用现有 `LabChange` 联合与 `D12-17` 失效读取规则，不新增频道变体。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D29-03 v1：赞成（Argon-2，2026-11-01T17:35:21.928Z）


**分类意见：** 串联

# D29（PM#48）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】多租户与 Lab 归属只留在 Lab 后端（按每 Lab 独立部署的 Mux 实例归属），严禁向 `soroi` 或 `omp-rpc-mux` 内部侵入 `labId`；同时补齐讨论会话无 `pendingLaunch` 时的首步槽位挂载与在途槽位变化通知源，保障首步人类介入与实时运行图完整可用。**
   - **依据：** `(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05：“你错了，web对接soroi多租户啊，我说的是多租户概念不侵入soroi，想什么啊”）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，走通全部人类介入与观察流程）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）；`(D)` `DEC/D7-lab-backend.md:66,68,72`、`DEC/D12-lab-wire.md:36,149-151,270,541-573`、`DEC/D19-sor13-control-contract.md:29,33`、`evidence/gates/pepgent-20-gate-a.md`。
   - **边界：** 四项均属于 Pepgent Lab 后端消费与公开线协议（`D7`、`D12`、`D19-05②`）的闭合，`design/store.md:150` 与 `design/intervention.md:11` 现有“无运行时挂到 `pendingLaunch` 实验项或 `ConversationWire.slots`”表述已兼容，无需再改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D29-01 v1（SO-1）** | 串联 | **approve（赞成）** | 严格对齐已通过的 D18-05（`(U) bf96d256`，每 Lab 一套独立 Mux 实例，`soroi` 与 `Mux` 不含 Lab 字段）：Lab 后端处理 `/api/lab/agents/{id}/stream` 与 `/files*` 时，从调用者所属各 Lab 的 Mux 实例 `GET /agents` 列表（D3-15，写方声明存续期间含停驻 agent）确定该 `agentId` 所属 Lab 并授权转发。一条规则同时覆盖根 agent、有/无运行时的槽位子 agent、`soroi_task` 中心 worker 及槽位已结束仍在线/停驻的 agent，且不改动任何跨仓协议或 HTTP 路由签名。 |
| **D29-02 v1（SO-2）** | 串联 | **approve（赞成）** | 补齐 `D12-04` 与 `D19-05②` 漏掉的“Discussion 无 `Open` 运行且无 `pendingLaunch`”分支，将该状态下的在途槽位挂到 `DiscussionHeaderWire.conversation.slots`，保证讨论会话不经 `experiment.start` 直接发起正式运行时首步 `awaiting_human` 槽位可被发现并交回，且无需新增字段或伪造全 `null` 的假 `ExperimentWire`。 |
| **D29-03 v1（SO-3）** | 串联 | **approve（赞成）** | 与 `D7-12`（有订阅者时定期读 `remote runs`/`status`）同构：仅在某 Lab 的 `/api/lab/events` 有浏览器订阅者期间，Lab 对自己持有在线一代的根会话定期读取 `writers` → `slots`，与上一次观测集合比较（仅作差分基准，不作读取缓存源），发现变化即按挂载位置发通知。无需修改 `D19-01` 控制端点封闭联合或 `omp-rpc-mux`，且完整覆盖 Lab 不直接持有 stdout 的中心 worker 写方。 |
| **D29-04 v1（SO-4）** | 串联 | **approve（赞成）** | 槽位变化通知频道与 `SO-2` 的四个挂载位置一一对应（运行项发 `run{run}`，`pendingLaunch` 实验项或讨论头发 `catalog`，Panel/Automation 会话头发 `conversation{id}`），直接复用现有 `LabChange` 联合与 `D12-17` 失效读取规则，不新增频道变体。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。


## D29-04 v1：赞成（Argon-2，2026-11-01T17:35:21.928Z）


**分类意见：** 串联

# D29（PM#48）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】多租户与 Lab 归属只留在 Lab 后端（按每 Lab 独立部署的 Mux 实例归属），严禁向 `soroi` 或 `omp-rpc-mux` 内部侵入 `labId`；同时补齐讨论会话无 `pendingLaunch` 时的首步槽位挂载与在途槽位变化通知源，保障首步人类介入与实时运行图完整可用。**
   - **依据：** `(U) bf96d256`（`DEC/D18-product-opus-contracts.md:11`，D18-05：“你错了，web对接soroi多租户啊，我说的是多租户概念不侵入soroi，想什么啊”）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：全流程功能不收缩，走通全部人类介入与观察流程）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）；`(D)` `DEC/D7-lab-backend.md:66,68,72`、`DEC/D12-lab-wire.md:36,149-151,270,541-573`、`DEC/D19-sor13-control-contract.md:29,33`、`evidence/gates/pepgent-20-gate-a.md`。
   - **边界：** 四项均属于 Pepgent Lab 后端消费与公开线协议（`D7`、`D12`、`D19-05②`）的闭合，`design/store.md:150` 与 `design/intervention.md:11` 现有“无运行时挂到 `pendingLaunch` 实验项或 `ConversationWire.slots`”表述已兼容，无需再改 `design/*.md`。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D29-01 v1（SO-1）** | 串联 | **approve（赞成）** | 严格对齐已通过的 D18-05（`(U) bf96d256`，每 Lab 一套独立 Mux 实例，`soroi` 与 `Mux` 不含 Lab 字段）：Lab 后端处理 `/api/lab/agents/{id}/stream` 与 `/files*` 时，从调用者所属各 Lab 的 Mux 实例 `GET /agents` 列表（D3-15，写方声明存续期间含停驻 agent）确定该 `agentId` 所属 Lab 并授权转发。一条规则同时覆盖根 agent、有/无运行时的槽位子 agent、`soroi_task` 中心 worker 及槽位已结束仍在线/停驻的 agent，且不改动任何跨仓协议或 HTTP 路由签名。 |
| **D29-02 v1（SO-2）** | 串联 | **approve（赞成）** | 补齐 `D12-04` 与 `D19-05②` 漏掉的“Discussion 无 `Open` 运行且无 `pendingLaunch`”分支，将该状态下的在途槽位挂到 `DiscussionHeaderWire.conversation.slots`，保证讨论会话不经 `experiment.start` 直接发起正式运行时首步 `awaiting_human` 槽位可被发现并交回，且无需新增字段或伪造全 `null` 的假 `ExperimentWire`。 |
| **D29-03 v1（SO-3）** | 串联 | **approve（赞成）** | 与 `D7-12`（有订阅者时定期读 `remote runs`/`status`）同构：仅在某 Lab 的 `/api/lab/events` 有浏览器订阅者期间，Lab 对自己持有在线一代的根会话定期读取 `writers` → `slots`，与上一次观测集合比较（仅作差分基准，不作读取缓存源），发现变化即按挂载位置发通知。无需修改 `D19-01` 控制端点封闭联合或 `omp-rpc-mux`，且完整覆盖 Lab 不直接持有 stdout 的中心 worker 写方。 |
| **D29-04 v1（SO-4）** | 串联 | **approve（赞成）** | 槽位变化通知频道与 `SO-2` 的四个挂载位置一一对应（运行项发 `run{run}`，`pendingLaunch` 实验项或讨论头发 `catalog`，Panel/Automation 会话头发 `conversation{id}`），直接复用现有 `LabChange` 联合与 `D12-17` 失效读取规则，不新增频道变体。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意全部标为 `串联`）。

