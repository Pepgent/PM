# Pepgent#17 W-09 请求：LAB-08/09/11a/12 叠加在未合入的 07a/07b 分支上开发——闸门材料

- **请求：** [Pepgent/Pepgent#17 评论 6561296393](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6561296393)，工人 W-09（tern 会话 `pepgent-lab`）。原文的请求句：“投票期间，是否允许 LAB-08/09/11a/12 也按 #18 的方式接续，即在 `issue-17-lab-catalog-events` 上叠加开发，PR 的 base 设为该分支？裁决前这四片我不开工。”
- **编制：** governance-desk 实例 `DeskPepgent17Stacking`（总协调席，与 Main 合计 1 票）。本文只整理事实，列出待判问题和建议保留的限定，不下结论，也不构成裁决。
- **程序依据：** `AGENTS.md:60`（C2-2）与 `.omp/agents/governance-desk.md` 第二节第 1 条：闸门 A 由 `Argon` 判定（是否触及产品原始意图或公开契约），闸门 B 由 `ArgonGovernance` 判定（是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项）。两道闸门都确认不越界，才可免票放行；任一闸门认定越界，就按 P0 立案投票。
- **范围外：** [#20 评论 6561107115](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115) 的四项契约裁决由另一治理实例处理，本文不判，只把它当作叠加时必须避开的未决语义。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件、源码、本仓议会 tally 与上述 issue 正文和评论；没有运行构建、类型检查或测试，没有读 git 历史或 session，没有联系工人。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`（`AGENTS.md`、`LEDGER.md` 均指该目录下的文件）
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`
- `GATE/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/`
- `WT07a/` = W-09 的 LAB-07a/07b 切片 worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`（分支 `issue-17-lab-catalog-events`）

---

## 一、事实

### 1.1 既有决策与规则

| # | 事实 | 来源 |
|---|---|---|
| F-1 | D8 对“依赖”列的定义：编译、类型、构建或调用契约上必需的代码或产物；代码合入其仓 `main` 即可开工，不等上游跨组件 runtime。 | (D) `DEC/D8-mvp-scope.md:203` |
| F-2 | D16-09：W-09 只写 `apps/web/src/protocol/lab/**`（唯一写方）、`apps/web/src/server/lab/**`、`apps/web/src/rpc/lab.ts`、`apps/web/src/app/routes/api/lab/**`、`apps/web/resources/lab/**`，以及承载 `apps/web` 依赖的 manifest、lockfile 与 `THIRD_PARTY_NOTICES.md`；每个席位有独立的分支与 PR。 | (D) `DEC/D16-phaseB-review-restore.md:33` |
| F-3 | D16-11③：同一仓或同一互斥路径域内的关联切片，由所属席位连续实现，可以在同一个 PR 中用多个 `Closes #X` 合并提交；只有编译、类型、构建或调用契约上的真实依赖才需要等待；不要求每个切片单独开 PR，也不要求单独做 runtime 验收。 | (D) `DEC/D16-phaseB-review-restore.md:35` |
| F-4 | D16-13：开发期各仓只做本仓检查，不设跨组件 live 锁；全部切片合入各自 `main` 后进入阶段 C 统一验收。 | (D) `DEC/D16-phaseB-review-restore.md:37` |
| F-5 | D16-10：同时活跃的席位不超过 4 个（按席位计，不按切片计）；W-10 在 `protocol/lab` 的真实上游合入后优先补入。 | (D) `DEC/D16-phaseB-review-restore.md:34` |
| F-6 | C1-3：同仓/同域关联切片可合并提交 PR，只做本仓编译/类型/基础检查即可合入，不设工人开工锁或每 PR 合并锁。 | (D) `SOR/AGENTS.md:45` |
| F-7 | 工作方式禁令：禁止把“依赖切片已有跨组件 runtime 证据”设为下游开工条件；严禁在工程发车、PR 合并或席位轮换前增设层层同步审批等待锁。D10-08：实现遇空白或冲突在 issue 标 BLOCKED，只暂停依赖部分。 | (D) `SOR/AGENTS.md:128`；`DEC/D10-repo-delivery.md:20` |
| F-8 | 工作方式禁令：接口或权限表缺少某项不构成授权；公开接口、持久化、ADT、权限、状态权威与生命周期、范围、验收语义不得单方新增或改变。 | (D) `SOR/AGENTS.md:123` |
| F-9 | C3-4.3：严禁让不同路径域的工程师推同一分支或同一 PR。 | (D) `SOR/AGENTS.md:74` |
| F-10 | R8 行：治理已要求从 PR 剔除越域文件；若剔除后出现真实编译 blocker，回原 issue 上报双闸门，不得先合入再补授权。 | (D) `SOR/LEDGER.md:22` |
| F-11 | 用户原话设立事前双闸门的理由：错误分类可能先写进代码，查出来再回退。 | (U) U96 `SOR/LEDGER.md:110`；(D) `SOR/AGENTS.md:60` |

### 1.2 #18 的同类先例（已送达 W-09）

| # | 事实 | 来源 |
|---|---|---|
| P-1 | #18 第〇项闸门 B：复用同席位、同路径域的既有模块不越界；D8 依赖列不是禁止同域复用的穷尽名单，实际 import 依赖记在 issue/PR，不必为每个内部 import 重投切片表；同域连续实现（处置 c）获 B 许可，“但不是所有切片必须捆绑的新增规则”，也不得把 c 固化为全部后端或全部未决事项的开工锁。 | (D) `GATE/pepgent-18-gate-b.md` 第一节第〇行、第三节 3.1 第 2–3 点、3.2 表 c 行 |
| P-2 | #18 第〇项闸门 B 对叠加（处置 b）：叠加不是先行合入上游的许可；PR 以 `main` 为目标且差量带上游内容时，必须先满足上游各自的授权与本仓检查，不得挟带待 P0 的文件，不得绕过 #17 已定的 07a/07b 交付范围；PR 以 07a 分支为目标则等同处置 c。 | (D) `GATE/pepgent-18-gate-b.md` 第三节 3.2 表 b 行 |
| P-3 | #18 双闸门结论评论写明的限定：不新增 store 前置校验；`catalog` 通知不能省；叠加不是先行合入的许可；同一交付不夹带未表决的生命周期选择；不改切片表，实际 import 依赖记在 issue/PR。 | (D) [#18 评论 6561259743](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561259743) 第〇节 |
| P-4 | #18 第三、四项（`draft.discard` 分状态行为、`draft.save` 状态矩阵与审批投递版本）须 P0，表决前依赖这些语义的代码不得先合入。 | (D) 同上评论第三、四节；草稿 `DEC/drafts/pepgent-18-draft-lifecycle.md` |

### 1.3 #17/#20 当前状态

| # | 事实 | 来源 |
|---|---|---|
| S-1 | PR #55 合并 07a 与 07b（`Closes #17`、`Closes #20`），HEAD `ddf5085`；合入还差 BLOCKED-1 的 routeTree 投票与 #20 四项裁决。 | (A) 评论 6561296393 |
| S-2 | routeTree 的 P0 已定案：D25-01 v1 以 5/5 通过并归档（PM#42）。内容：`apps/web/src/app/routeTree.gen.ts` 由在自己 PR 中增删、改名或改路径了自己白名单内文件路由的席位，在同一 PR 中用既有工具链重新生成并提交；并行 PR 冲突时 rebase 后重新生成；不手改；不放开其他文件。D25 的事实栏 F10 明确把 LAB-11a 的上传路由、LAB-12 的 jobs tail 路由列为覆盖对象。 | (R) `council tally D25`：“D25-01 v1 [治理] … → 通过 5/5（门槛 4）”，“archived (PM#42)”；(D) PM `origin/main` 的 `evidence/decisions/D25-pepgent-17-routetree.md` 第一节 F10 与决策项表 |
| S-3 | #20 四项待裁决：① 子 agent 的所属 Lab；② Discussion 既无运行也无 pendingLaunch 时槽位挂载位置；③ 端点读取失败（404/503/502/网络/`{ok:false}`）的语义；④ 无运行槽位变化的推送源与频道。工人在裁决前的暂行实现：子 agent 的 stream/files 返回 `not_found`；②所述状态下目录读取返回 `not_supported`（capability `lab.catalog.slots`）；③一律返回 `persistence_unavailable`；④不加轮询。 | (A) [#20 评论 6561107115](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115) |
| S-4 | `LabEvents`（`subscribe`/`publish`，按 Lab 分发 `LabChange`）只在 07a/07b 分支上。 | (D) `WT07a/apps/web/src/server/lab/events.ts:8-40` |
| S-5 | D12-17 的频道：`automation`（`automation_rule`、`automation_run` 变化）、`conversation`（消息结束；附件、结论正文、装载上下文、已读、人类消息队列变化；Panel 会话头改变）、`compute`（remote 作业列表或状态变化；Mux 在线变化）、`catalog`、`run`、`library`。 | (D) `DEC/D12-lab-wire.md:541-562` |

### 1.4 四个切片的范围与依赖列

| 切片 | issue | 范围 | D8 依赖列 | 工人所称与 07a/07b 的真实代码依赖 | 来源 |
|---|---|---|---|---|---|
| LAB-08 | [#24](https://github.com/Pepgent/Pepgent/issues/24) | `intervene.takeover`、`intervene.answer`、`intervene.derive`、`run.abort`、`human.irc` | LAB-07b、SOR-13、SOR-15、SOR-16 | 依赖 LAB-07b（D8 已列） | (D) `DEC/D8-mvp-scope.md:329`；#24 正文“依赖关系”；(A) 评论 6561296393 |
| LAB-09 | [#19](https://github.com/Pepgent/Pepgent/issues/19) | 自动化：事件触发、`croner` 定时、审批门禁 | LAB-04、LAB-06 | `automation` 频道要用 `LabEvents`（D8 未列） | (D) `DEC/D8-mvp-scope.md:330`；#19 正文；(A) 同上 |
| LAB-11a | [#22](https://github.com/Pepgent/Pepgent/issues/22) | 停驻会话 transcript 读取、`discussion.load`、附件 | LAB-04、LAB-05 | `conversation` 频道（`LabEvents`）；上传路由涉及 routeTree（D8 未列） | (D) `DEC/D8-mvp-scope.md:332`；#22 正文；(A) 同上 |
| LAB-12 | [#11](https://github.com/Pepgent/Pepgent/issues/11) | 算力页只读读取与 `GET /api/lab/jobs/{run}/tail` | REM-05、REM-06、REM-07、REM-02、MUX-04 | `compute` 频道（`LabEvents`）；jobs tail 路由涉及 routeTree（D8 未列） | (D) `DEC/D8-mvp-scope.md:334`；#11 正文；(A) 同上 |

- LAB-08 的 SOR-13/15/16 与 LAB-12 的 REM-*/MUX-04 是跨仓依赖，按 F-1 须在各自仓 `main` 有代码；本材料未核实其合入状态，叠加 07a/07b 分支不改变这些依赖。
- 介入命令按 `conversation` 寻址，并按 `conversation.owner` 授权（D12-11、D19-05），不经过子 agent 的所属 Lab（S-3 ①）。(D) `DEC/D12-lab-wire.md:43,514`；`DEC/D19-sor13-control-contract.md:33`

---

## 二、分析：是否已由既有决策覆盖

1. **叠加本身。** 四片与 07a/07b 同属 W-09、同一路径域（F-2）。F-3 允许同域关联切片连续实现、合并提交，只有真实代码依赖才需等待；P-1 已判定复用同席位未合入模块不越界、D8 依赖列不是穷尽名单。四片对 `LabEvents`（及 LAB-08 对 07b）的依赖是真实的编译/调用依赖（S-4），在 07a/07b 分支上叠加即可满足，不需要等 #55 合入 `main`。`[INFERENCE]` 叠加属于 F-3 与 P-1/P-2 已覆盖的工程组织方式，不改变任何 wire、持久化、权限或切片表。
2. **routeTree。** #18 请求时它还是待决 P0；现在 D25-01 已通过（S-2），LAB-11a、LAB-12 新增的 `api/lab` 路由由 W-09 在同一 PR 中重新生成并提交 `routeTree.gen.ts`。此项不再是叠加的障碍，也不需要另行裁决。
3. **未决语义。** 叠加开发与未决语义是两件事：叠加不让任何一片取得 #20 四项（S-3）或 #18 第三、四项（P-4）的裁决权。可能触碰的地方：LAB-11a 的 `conversation` 频道若涉及无运行槽位变化（S-3 ④）；任何一片若读取在途槽位而碰到 S-3 ②③；LAB-11a 的 `discussion` 读取若展示草稿或 `pending_launch` 的分状态行为（P-4）。
4. **工人的“裁决前不开工”。** F-6、F-7 规定不设开工锁、只暂停依赖部分。`[INFERENCE]` 四片中不依赖 `LabEvents` 的部分本可在 `main` 上开工；工人选择等待属于自我约束，裁决只需明确叠加许可及其限定，不另设等待条件。

## 三、建议保留的限定（交两道闸门确认或修正）

| # | 限定 | 依据 |
|---|---|---|
| L-1 | **不先行合入上游。** 叠加 PR 的 base 为 `issue-17-lab-catalog-events`；在 #55 合入 `main` 之前，任何叠加 PR 不得以 `main` 为目标合入并带入 07a/07b 内容。#55 合入后，再 rebase 到 `main`、改 base 为 `main`，各自通过本仓检查后合入。若改为并入 #55 的同一交付（多个 `Closes`），则等同处置 c，须一并满足 #55 的全部前提。 | F-10、F-11、P-2 |
| L-2 | **不夹带待表决语义。** 不为 #20 四项（S-3）或 #18 第三、四项（P-4）选定行为；对工人在 #20 上的暂行处理（`not_found`、`not_supported`、`persistence_unavailable`、不加轮询）不加扩展、不在新代码中当作既定契约依赖；依赖这些语义的部分在裁决前暂停，其余照常。 | F-8、D10-08（F-7）、P-3、P-4 |
| L-3 | **routeTree 按 D25-01。** 新增或改动 `api/lab/**` 路由的 PR 在同一 PR 中用既有工具链重新生成并提交 `routeTree.gen.ts`；不手改；与 #55 或其他叠加 PR 冲突时 rebase 后重新生成；不借此写白名单外的其他文件。 | S-2 |
| L-4 | **事件通知不省略。** 各片改变 D12-17 所列事实时都发对应频道（`automation`、`conversation`、`compute`、`catalog` 等），不得以“事件模块未合入”为由先交付不发通知的代码。 | S-5、P-3 |
| L-5 | **不改切片表与跨仓依赖。** D8 依赖列不因叠加改动，对 07a/07b 的实际 import 依赖记在各切片 issue/PR；LAB-08 的 SOR-13/15/16、LAB-12 的 REM-*/MUX-04 仍须在各自仓 `main` 有代码，叠加不豁免。 | F-1、P-1 |
| L-6 | **单席位、单路径域。** 叠加分支与 PR 只由 W-09 推送，不让 W-10 或其他席位共分支、共 PR；不改白名单外文件。 | F-2、F-9 |
| L-7 | **不增设锁。** 本许可不构成“四片必须叠加”或“必须等 #55”的新规则；工人也可以在 `main` 上实现不依赖 `LabEvents` 的部分。叠加不设额外审批、跨组件 runtime 或逐片验收前置。 | F-4、F-6、F-7、P-1 |

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** 在 07a/07b 分支上叠加开发 LAB-08/09/11a/12，是否触及产品原始意图或公开契约？`[INFERENCE]` 叠加只改变代码的落脚分支，不改 wire、持久化、权限或命令语义。
- **A-2：** 四片中，哪些部分与 #20 四项（S-3）或 #18 第三、四项（P-4）的未决语义发生契约耦合？L-2 的“依赖部分暂停、其余照常”是否足以避免把未决语义先写进代码？特别是：LAB-11a 的 `conversation` 频道与 S-3 ④；LAB-08 介入命令是否因按 `conversation` 寻址（1.4 节末条）而与 S-3 ① 无关。
- **A-3：** L-4（事件通知不省略）是否完整表达了 D12-17 对四片的要求？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 四片叠加是否已由 D16-11③（F-3）与 #18 第〇项闸门 B 结论（P-1、P-2）覆盖，可作为同域连续实现免票放行？还是因扩大到四片而构成派工或切片范围的实质变化，须 P0？
- **B-2：** L-1 两种落地方式（#55 合入后改 base 为 `main`；或并入 #55 同一交付）是否都在既有许可内？后者会把四片与 #55 的 #20 裁决绑在一起，是否违反 P-1 的“不得固化为全部未决事项的开工锁”？
- **B-3：** D25-01 通过后，LAB-11a、LAB-12 的路由与 `routeTree.gen.ts` 按 L-3 处理，是否还有遗留的白名单问题？
- **B-4：** L-7 是否与 F-6、F-7 一致：裁决只给出叠加许可与限定，不给工人另设等待条件？
- **B-5：** 四片叠加使 W-09 的未合入代码量增加、`main` 上 `protocol/lab` 的真实上游更晚完整，这是否与 D16-10“W-10 在 `protocol/lab` 的真实上游合入后优先补入”（F-5）冲突？`[INFERENCE]` 叠加 PR 不改变 #55 的合入时点，WEB-02 只依赖 LAB-07a。

## 六、可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约或切片表 | 需要注意的地方 |
|---|---|---|---|
| a | 放行叠加：四片在 `issue-17-lab-catalog-events` 上叠加开发，PR base 为该分支，按 L-1 至 L-7 限定。 | 不改 | B-1、B-2 |
| b | 不放行叠加：四片等 #55 合入 `main` 后从 `main` 开工；其间只做不依赖 `LabEvents` 与 07b 的部分。 | 不改 | 是否构成 F-7 所禁的等待锁（B-4） |
| c | 四片并入 #55 的同一交付（多个 `Closes`）。 | 不改 | #55 合入前提扩大到四片；与 #20 裁决绑定（B-2） |
