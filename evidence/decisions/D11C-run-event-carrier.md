# D11-C 运行事件的记录携带者与派生的 `call_inherited`

起草：leader 分身 D10Clone（Claude 族）。来源：STO-05 工程师 eng-store 在 [soroi#190](https://github.com/Pepgent/soroi/issues/190#issuecomment-6555491023) 上报 D11-47C（[PM#17](https://github.com/Pepgent/PM/issues/17)）落地时与已通过设计的两处冲突。讨论者：discuss:steady（D11CSteady）、discuss:divergent（D11CDivergent），处理见文末。本表只写主路径。

## 冲突事实

- **(D)** D11-47C 已回写到 D6-09（D6:37）与 `RunEvent` 草图（D6:227–233）：六种调用类事件都携带 `call: GraphNode` 与 `edges`，同时规定“每个事实只由一处携带”“消费方按事件顺序插入，不按键合并”。
- **(R)** main `packages/store/src/store.ts:306–331`：同一调用在一次提交里有多条调用事件——Executed 为 started+ended，Aborted 为 started+aborted，Human 替代为 started+[aborted]+handback；在途 worktree `store.ts:635–640` 把每条都投影成同一最终节点与入边。按草图，“按序插入”会把同一节点插入多次（F23 的 Human 替代即至少三条）。
- **(R)** main 一次提交内先写 `step_committed` 再写调用事件（`store.ts:212–229、306–334`），调用事件的 `step_seq` 即该提交的锚点；`activity` 读取 `calls.started_at/ended_at`，不读事件（`store.ts:533–545`）。已通过的两张时序图（D6:294、D7:203）却把 `step_committed` 写在调用事件之后。
- **(D/R)** D6-16（D6:44）回写为“继承项没有各自的调用事件”；D8 F24②（D8:143）要求“R' 中上游调用是 `call_inherited`”；D6-20（D6:48）保留该类型；main 派生实现写 `run_started`（seq 1）后为每个继承调用写一条 `call_inherited`，再为继承的停止写 `atom_stopped`（`store.ts:433–464`）。**(A)** 工程师称已有持久化数据中存在 `call_inherited`；本表不依赖这一陈述。

## 条目

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D11-C1 | **节点与入边由提交级事件携带，调用类事件只标记转变（取代 D11-47C 的携带规则）** | D6-04（D6:32）、D6-09（D6:37）、D6-10（D6:38）、`RunEvent` 草图（D6:227–233）、时序图（D6:294、D7:203）；`design/store.md:40、94–99、133–140、149`；F10、F11、F23、F26（D8:129、130、142、145） | **携带：** 一次提交的节点与入边只由一条提交级事件携带，容器为 `records: { nodes: GraphNode[]; edges: GraphEdge[] }`：普通一步由 `step_committed` 携带本步的全部调用节点（最终状态）、入边与本步新定义的根节点；派生运行由 `run_started`（seq 1）携带物化的继承调用、新根与边（D11-19）。名字随节点携带（根的 `name`、调用的 `outputs[].name`），不另列。**标记：** 六种调用类事件只为 `{ kind, seq, at, step, position }`，表达该调用的转变种类与时刻；`step` 等于携带该节点的提交级事件的 `seq`（派生继承调用为 1），`(step, position)` 即节点坐标。**顺序：** 同一提交内提交级事件序号最小，调用标记按调用位置依次跟随，`atom_stopped` 随后。**投影：** `graph?at=k` 中一次提交的记录在其提交级事件的序号处整体生效，同一提交后续的调用标记不改变图；`activity` 从调用记录的 `startedAt`、`endedAt` 重建，不由标记成对恢复。**消费：** 消费方在提交级事件到达时插入记录，标记用于转变种类序列（F11、F17、F23 所要求的 `call_adopted`、`call_started/call_ended`、`call_aborted` 后 `human_handback`）；节点与入边在事件实例层只出现一次，不需要按键合并 | **选定：** 提交是 store 里记录产生的单位（D6-04），节点与入边在事件实例层只出现一次；标记保留 F 判据所用的转变种类序列。**备选（D11-47C 现行文本）：** 每条调用事件都带完整节点：同一调用多条事件重复携带。**备选：** 只由每个调用的最后一条事件带节点：`call_aborted` 单独中止时带、被人类交回替代时不带，同一事件两种形状，且新根仍由 `step_committed` 携带，一步的记录拆在多条事件里。**备选：** 六种调用事件合并为一种 `call_committed{node}`：须改写 D6-20、F11、F17、SOR-07、F23、F24 的验收文字。**备选：** stream 不带任何记录、只作失效通知（Lab 主路径现只以 `step_committed` 为失效信号后重读 graph，D12:609–611）：须删去已通过 D6-09“连同它们引用的记录”，留待有读方需要时再议 | 串联 | 是：D6-09、D6-10 与 `RunEvent` 修订 |
| D11-C2 | **派生物化提交发 `call_inherited` 标记** | D6-16（D6:44）；D6-20（D6:48）；D8 F24②（D8:143）；main `store.ts:433–464` | 派生运行 R' 的物化提交依次写：`run_started`（seq 1，携带记录，D11-C1）→ 每个继承调用一条 `call_inherited` 标记 → 每条继承的停止一条 `atom_stopped`，同一提交内序号连续。`call_inherited.at` 是物化提交的时刻；继承调用节点的 `startedAt`、`endedAt` 取自父运行 P 的原调用。仍不写步、不发 `step_committed`，之后第一个正式步才是 R' 的第一步（D11-19 不变）。F24② 保持不变 | **选定：** 继承调用与其他调用一样有自己的转变标记，F24 与 main 实现都不用改。**备选（D6-16 现行文本）：** 继承项没有调用事件：要改 F24②、删改 main 的派生事件序列，且 D6-20 保留的 `call_inherited` 在派生主路径上没有产生者 | 串联 | 否 |
| D11-WB3 | **回写正文** | 见 how | 本表通过后秘书直接替换，不留更正记录：D6-04（一步一次提交；调用记录存起止时刻；同一事务先写提交级事件、再写调用标记与停止；标记 `at` 为该转变的时刻）；D6-09 与 `RunEvent` 草图（按 D11-C1，含 `records` 容器与标记形状，删去“不在此另定记录容器的字段编码”“不携带调用或入边”“调用节点与其入边的唯一携带者，消费方按序插入”）；D6-10（`at=k` 锚点与 activity 来源）；D6-16（删去“继承项没有各自的调用事件”，按 D11-C2 写物化提交的事件序列）；D6:294 与 D7:203 时序图改为 `step_committed`（携带记录）、`call_started`、`call_aborted`、`human_handback`；`design/store.md:40、94–99、133–140、149`。核对 D8 F10、F11、F23、F24、F26，与本表一致则不改 | **选定：** 正文是工程师读的依据 | 实现 | 否 |

## 影响

| 条目 | 直接消费 | 需修改的实现 |
| --- | --- | --- |
| D11-C1 | STO-05、LAB-06、LAB-07a、WEB-02、WEB-03、E2E-12、E2E-19 | store 工程师：contract 的 `RunEventSchema`（调用事件改为标记，`step_committed` 与派生 `run_started` 带 `records`）、`runEvents()` 投影（STO-05 在途）。Lab 与 WEB 工程师：store 客户端对 `RunEvent` 的穷尽处理与实验详情的增量处理按新形状。e2e 工程师：对 SSE 原文的断言 |
| D11-C2 | STO-05、STO-09、SOR-15、E2E-15（F24） | 无：main 派生实现已是此序列；STO-05 投影随 D11-C1 输出标记形状 |

## 对讨论者意见的处理

| 意见 | 来源 | 处理 |
| --- | --- | --- |
| activity 区间来自调用记录，不由标记恢复；“调用事件保留原始时刻供活动时间线”与实现不符 | Steady、Divergent | 采纳：取舍理由改为 F 判据所需的转变种类序列，activity 来源写入 how |
| 写明 `graph?at=k` 在提交级事件序号处整体生效 | Steady、Divergent | 采纳 |
| “同一事实只出现一次”说过头：起止时刻在节点与标记中各出现 | Divergent | 采纳：收窄为“节点与入边在事件实例层只出现一次” |
| 写明提交内顺序，修正 D6:294、D7:203 两张时序图 | Steady、Divergent | 采纳 |
| 定 `records` 容器字段，名字不另列 | Divergent | 采纳 |
| 标记的 `step` 等于提交级事件的 `seq` | Divergent | 采纳 |
| `call_inherited.at` 是物化时刻；物化提交顺序含 `atom_stopped` | Divergent | 采纳 |
| “已有库中已写入”只能是 (A) | Steady | 采纳 |
| WB3 补 D6-04、D6-10、`design/store.md` 具体位置、D8 F10/F11/F23/F24/F26 核对 | Steady | 采纳 |
| 影响补 Lab、WEB、E2E 的消费方迁移 | Steady | 采纳 |
| stream 不带记录、只作失效通知 | Divergent（列为可考虑框架，未主张） | 不采纳：须删去已通过 D6-09 的“连同它们引用的记录”，现有冲突用 C1 即可闭合；列为备选 |
