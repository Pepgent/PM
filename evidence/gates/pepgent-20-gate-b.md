# Pepgent LAB-07b（#20）：四项 BLOCKED 闸门 B 判定

判定席位：组织治理与分配守护席（`ArgonGovernance-2`）。

对象：[Pepgent/Pepgent#20（LAB-07b）](https://github.com/Pepgent/Pepgent/issues/20) [评论 6561107115](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115) 上报的四项契约裁决请求（交付分支 `issue-17-lab-catalog-events`，[PR #55](https://github.com/Pepgent/Pepgent/pull/55)）。输入材料为 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent-20.md`。

本判定仅审席位路径白名单、阶段门禁、过渡行为是否符合“只暂停依赖部分”、跨席位送达归属与投票程序边界，不替 `Argon`（闸门 A）裁决产品原始意图或公开契约内容。本实例不提交、不在 GitHub 发言、不联系工人。

---

## 一、四项逐项结论总表

| 项 | 闸门 B 结论与具体处置边界 | 参投/送达与程序归属 |
| --- | --- | --- |
| **一、子 agent 的所属 Lab** | **1. 主路径（处置 a：有 Open 运行、槽位按 `D5 §3.6` / `D12:98-100` 带 `agentId`）：** 若 A1-1 确认主路径已由既有契约规定，则 W-09 按 `D5 §3.6` 消费 `SlotState.running.agentId` 属本域既有契约实现，**B 不越界、免票放行**；`packages/omp-soroi/src/eval/slots.ts` 漏填 `agentId` 属 **W-07（`pepgent-plugin`）路径域内的既有契约实现缺口**，无需重投，由协调席/秘书建 soroi 修复承载并经 **`AreaMgrSoroi`** 送达 W-07，**严禁将 W-07 修复设为 W-09 PR#55 的合入等待锁**。<br>**2. 扩展归属或跨仓关联（处置 b / c）：** 处置 b 修改 `D12:537` 权限归属规则，处置 c 修改 `D3`/`D19` 公开形状且横跨 W-01/W-07/W-09，**均须 P0 投票**。<br>**3. 过渡行为（B1-2）：** 表决或 W-07 补齐前，W-09 对已定主路径照常实现、仅对未定类别的子 agent 返回 `not_found`，符合 `D10-08`“只暂停依赖部分”。 | 主路径免票（W-07 缺口经 `AreaMgrSoroi` 送达）；处置 b 属产品/契约 4 席 P0；处置 c 若改 W-01/W-07 派工范围则含治理席 5 席 P0。 |
| **二、Discussion 既无运行也无 pendingLaunch 时槽位的位置** | **1. 挂载位置选择（处置 a / b / c）：** 补齐 `D12-04`/`D19-05②` 讨论无运行无 pending 时的挂载格、扩展 `ExperimentWire` 或规定首步不展示，均触及 `D10-08` 公开 wire 语义/缺失设计/验收语义；若 A 未能凭既有条文确认为纯机械落点，**必须 P0 投票**。<br>**2. 过渡行为纠偏（B2-1，否决处置 d 的整读失败）：** W-09 当前在该状态下令 `slotSite` 返回 `not_supported` 从而**导致整个 `readCatalog` 目录读取失败（`overlay.ts:30-57`）**，超出 `D10-08`“只暂停依赖部分”边界，**B 不予放行**！在 P0 定案前，至多只能暂停该未定格的槽位挂载（保持该讨论 `slots: []`，不让整次 `readCatalog` 失败）。 | 产品/契约 4 席 P0（不改 W-09 白名单），与第一、四项需投票行合表逐行表决。 |
| **三、端点读取失败的语义** | **1. 失败与竞态映射（B3-1，处置 d / a）：** 依 `D19-02`、`D5:316` 与 `.claude/rules/design-assumes-it-works.md`，控制端点失败与两次调用间下线竞态不在主路径设计范围内，且 W-09 仅使用既有 `OperationResult` 错误变体、代码在 `server/lab/**` 白名单内。若 A3-1/A3-2 确认不改变 `D12:151` 公开契约，**B 确认不越界，作为单仓私有实现免票放行由 W-09 自主决定并在 PR 正文说明**。<br>**2. 若 A 认定 b/c 改变了 `D12:151` 公开在线语义且须规定：** 则仅就该公开语义变更入 P0。 | A 确认为主路径外实现时免票放行；仅在 A 认定改变公开语义时入 4 席 P0。 |
| **四、槽位变化的通知源** | **1. 各可选处置的程序边界（B4-1）：** 处置 a（删改 `D12-17` 失效表）、处置 b（补 `D7-08` RPC 帧观察源与无运行槽位频道）、处置 d（补有订阅者时的轮询通知源）均改变或补齐 `D7-08` / `D12-17` 公开失效契约（属 `D10-08` 缺失设计/公开契约/验收语义），若 A 认定需规定则**必须 P0 投票**；处置 c（控制端点加订阅/推送）改 `D19-01`/`D3-19` 且跨越 **W-07、W-01、W-09** 三席路径域，**必须 P0 投票**。<br>**2. 过渡行为（B4-2）：** 表决期间 W-09 不私自加轮询或改跨仓接口、只交付已确定的 `writers`/`slots` 读取与 store 运行流 `run` 频道转发，符合“只暂停依赖部分”。 | 处置 a/b/d 为产品/契约 4 席 P0；处置 c 跨 W-01/W-07/W-09，若改派工则加治理席 5 席 P0。与第一、二项合表逐行表决。 |

---

## 二、依据与证据边界

路径简称与来源标记沿用 `GATE/pepgent-20.md:9-15`。

| 判据维度 | 本轮核对条文与事实 | 来源 |
| --- | --- | --- |
| 事前正交双闸门 | A 判产品原始意图与公开契约，B 判席位路径域、阶段门禁与投票程序；仅 A、B 均确认无越界方可免票放行，任一越界转 P0 | (D) `SOR/AGENTS.md:58-60`；(U) U96 `SOR/LEDGER.md:116` |
| W-09 / W-07 / W-01 互斥路径白名单 | W-09 独写 `Pepgent` 的 `protocol/lab/**`、`server/lab/**`、`rpc/lab.ts`、`routes/api/lab/**`（及依 `D25-01` 同 PR 重生成 `routeTree.gen.ts`）；`packages/omp-soroi/**` 归 W-07；`omp-rpc-mux` 归 W-01。各席严禁越域代写或共 PR | (D) `DEC/D16-phaseB-review-restore.md:33`；`DEC/D25-pepgent-17-routetree.md`；`SOR/AGENTS.md:71-75` |
| 必须投票类别与只暂停依赖部分 | 公开 wire、持久化、ADT、权限、状态权威与生命周期、缺失设计、验收语义须表决；既定契约内私有结构/算法由工程师决定；遇空白只暂停依赖部分，不冻结整席或炸毁无关功能 | (D) `DEC/D10-repo-delivery.md:20`；`SOR/AGENTS.md:122-127` |
| 设计只写主路径 | 控制端点失败回复不在设计中；设计阶段不考虑失败分支、超时、重试或调用间竞态 | (D) `DEC/D19-sor13-control-contract.md:30`（D19-02）；`SOR/.claude/rules/design-assumes-it-works.md` |
| 阶段边界与反设卡 | 开发期只做本仓检查，不设跨组件 live 验收锁；`D8:328` LAB-07b 依赖列不含 SOR 切片，不得为另一仓的字段补齐增设跨仓合并等待锁 | (D) `DEC/D8-mvp-scope.md:328`；`DEC/D16-phaseB-review-restore.md:34-37`；(U) U30–U32、U83 `SOR/LEDGER.md:88,97` |

---

## 三、对材料 B 问题的逐项详细答复

### 3.1 第一项：子 agent 所属 Lab（B1-1、B1-2、B1-3）

1. **B1-1（主路径与 soroi 缺 `agentId` 的送达及排期边界）：**
   - `DEC/D5-plugins-eval.md:239,297` 与 `DEC/D12-lab-wire.md:98-100` 已经在已通过契约中定义了 `SlotState.running.agentId?: AgentId`，`DEC/D12-lab-wire.md:537` 也定义了“子 agent 取它所在运行（槽位的 `agentId`……）的 `experiment_ext.lab_id`”。
   - 若闸门 A（A1-1）确认主路径即按此执行，则 W-09 在 `Pepgent` 内按既有 `SlotState.running.agentId` 编写归属解析**不越界、免票放行**。
   - `SOR/packages/omp-soroi/src/eval/slots.ts:15-19` 未填入 `agentId`，属于 **W-07（`pepgent-plugin`）在自身路径域内未落实已通过 D5 §3.6 契约的实现缺口**。修复只改 `packages/omp-soroi/**` 内部实现以对齐既有公开契约，无需重新投票；由协调席/秘书在 `Pepgent/soroi` 登记修复承载，并由 **`AreaMgrSoroi`** 用单向 peer 送达 W-07（若 W-07 不在席则随 `soroi#323` 等同域重入承载一并交办）。
   - **反设卡硬边界：** `D8:328` 的 LAB-07b 依赖列不包含 `SOR-*`，开发期不做跨组件 live 验收（`D16-13`）。因此 **W-09 的 PR#55 绝不需要等待 W-07 先合入 `slots.ts` 修复才能合入本仓 `main`**；W-09 只需在自身 `protocol/lab` 与 `server/lab` 中按既有契约消费 `slot.state.agentId`，当运行时上游尚未传回 `agentId` 时自然落入 `not_found`，待 W-07 修复合入后在异步接缝金丝雀或阶段 C 自动咬合。
2. **B1-2（未定类别的过渡行为）：**
   - 对第一步正式运行尚无 Open 运行（F1-6）及非槽位子 agent（F1-7），在闸门 A 认定需表决且 P0 尚未通过前，W-09 仅对这部分无法按 `D12:537` 解析出 `lab_id` 的子 agent 返回 `not_found`，而不影响根 agent 与已有 Open 运行槽位子 agent 的 stream/files 读取，完全符合 `D10-08`“只暂停依赖部分”。
3. **B1-3（处置 b 与处置 c 的表决与路径边界）：**
   - **处置 b** 改写 `D12:537` 的权限判定规则（从“取所在运行的 `experiment_ext.lab_id`”改为“取根会话的 `conversation.lab`”），虽代码在 W-09 白名单内，但属于 `D10-08` 明列的**权限公开契约变更**，必须进入 P0（产品/契约 4 席）。
   - **处置 c** 要求 Mux（W-01）或 soroi（W-07）新增公开的“在线条目→根会话/运行”关联字段，既修改 `D3`/`D19` 跨仓公开契约，又跨越 W-01 / W-07 / W-09 的路径域，必须进入 P0；若议案同时改变 W-01 或 W-07 的切片范围/派工，该行须标 `domains: [governance]` 由 5 席参投。

### 3.2 第二项：Discussion 无运行无 pendingLaunch 时的槽位位置（B2-1、B2-2）

1. **B2-1（过渡行为越界纠偏——禁止因单讨论首步在途让整个 `readCatalog` 返回 `not_supported`）：**
   - 材料 F2-5 与 `WT07/apps/web/src/server/lab/overlay.ts:30-57` 显示：当任一 Discussion 处于“无运行且无 `pendingLaunch`”的第一步正式调用在途时，当前过渡代码让 `slotSite` 返回 `not_supported`，进而导致**整个 Lab 的 `readCatalog` 目录读取失败**。
   - **闸门 B 裁定：该过渡行为（处置 d）违反 `D10-08`“只暂停依赖部分”与反设卡原则，不予放行！**
   - 理由：“只暂停依赖部分”是指在“Discussion 无运行无 pendingLaunch 的槽位挂在哪里”未决前，只暂停**该状态下该讨论的在途槽位挂载**，绝不允许把单讨论的一个未定挂载格扩大为整个 `readCatalog` 接口失败（使同 Lab 下所有其他实验、讨论和目录读取全部瘫痪）。
   - **合规过渡要求：** 若本项需进入 P0 表决，在表决结果出来前，W-09 必须将过渡行为修正为“对该未定格暂不挂载槽位（保持 `slots: []`），`readCatalog` 正常返回其余全部目录数据”；待 P0 选定 a / b / c 后再按决议实现该格挂载。
2. **B2-2（表决与合表）：**
   - 处置 a（挂到 `DiscussionHeaderWire.conversation.slots` 并补失效规则）、处置 b（新增全 null `ExperimentWire` 占位形态）、处置 c（规定首步不展示）均涉及 `D12-04` / `D19-05②` 的公开 wire 挂载表或验收语义；若闸门 A 认定需表决，应与第一、四项的需表决项**合入同一张 LAB-07b P0 议案逐行表决**（产品/契约 4 席）。

### 3.3 第三项：端点读取失败的语义（B3-1、B3-2）

1. **B3-1：** `D19-02`（`DEC/D19-sor13-control-contract.md:30`）已明文裁定“控制端点失败回复的形状不在设计中，按‘能工作’处理”，且 `.claude/rules/design-assumes-it-works.md` 规定设计阶段不考虑失败分支与竞态（F3-2、F3-5）。只要闸门 A（A3-1/A3-2）确认本项不构成对 `D12:151` 公开契约的修改，**B 侧确认完全落在 W-09 `server/lab/**` 私有实现自由度内，免票放行由 W-09 自定并在 PR 正文记明（处置 d / a）**，不为此单立投票。
2. **B3-2：** 在不新增公开 error variant 的前提下，W-09 当前以 `persistence_unavailable` 处理控制端点读取失败（处置 a）不越过路径白名单或阶段门禁。

### 3.4 第四项：槽位变化的通知源（B4-1、B4-2）

1. **B4-1（路径域与程序边界）：**
   - **处置 c** 需修改 `D19-01`（soroi 控制端点）与 `D3-19`（Mux 路由），跨越 W-07（`packages/omp-soroi/**`）、W-01（`omp-rpc-mux`）与 W-09（`Pepgent`）三席路径白名单，必须 P0 投票，严禁单方实施；
   - **处置 a**（删改 `D12-17` `run` 频道触发定义）、**处置 b**（补 `D7-08` RPC 帧观察源与 `run`/`catalog`/`conversation` 触发规则）、**处置 d**（补有订阅者时的轮询通知源）代码虽在 W-09 的 `server/lab/**` 白名单内，但均涉及 `D7-08` / `D12-17` 公开事件失效契约或 `F08 S2` / `F31 ④` 验收语义（`D10-08`），若闸门 A 认定属于缺失设计或契约修改，**必须 P0 投票**（产品/契约 4 席）。
2. **B4-2（合表与表决期过渡）：**
   - 须投票项与第一、二项合入同一张 LAB-07b P0 议案逐行表决；
   - 表决期间 W-09 不加轮询、不改控制端点，先交付已确定的 `writers`/`slots` 读取与 store 运行流 `run` 频道转发，符合“只暂停依赖部分”。

---

## 四、后续程序汇总

1. **免票放行项（须 A 同步确认无越界）：**
   - 第一项主路径（按 `D5 §3.6` 消费 `SlotState.running.agentId`；soroi `slots.ts` 漏填字段作为 W-07 既有契约实现缺口交 `AreaMgrSoroi` 送达，不阻塞 W-09 PR#55）；
   - 第三项端点读取失败与下线竞态映射（A 确认为主路径外单仓实现时，由 W-09 自主决定）。
2. **过渡行为强制修正项：**
   - 第二项在 P0 定案前，**严禁因单个 Discussion 处于无运行无 pendingLaunch 的首步在途而返回 `not_supported` 炸毁整个 `readCatalog`**；过渡期只允许暂停该未定格的槽位挂载（保持 `slots: []`）。
3. **P0 合表立案项：**
   - 第一项非主路径归属（若选 b/c）、第二项无运行无 pendingLaunch 的讨论槽位挂载（a/b/c）、第四项槽位变化通知源与频道（a/b/c/d），凡经 A 或 B 认定越界的，由 `DeskPepgent20Rulings` 合为一张 P0 议案用 `council propose --seat Coordination` 立案逐行表决。
