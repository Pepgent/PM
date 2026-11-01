# Pepgent#17（LAB-07a）两项 BLOCKED 的闸门材料

- **issue：** [Pepgent/Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17)，工人 W-09（tern 会话 `pepgent-lab`）。
- **BLOCKED-1：** [评论 6560072203](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560072203)，`routeTree.gen.ts` 剔除后 typecheck 报 9 个错误。
- **BLOCKED-2：** [评论 6560074431](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560074431)，`slots` 恒为 `[]`，与契约冲突。
- **编制：** governance-desk 初审实例（总协调席，与 Main 合计 1 票）。本文只整理事实，并为两道闸门列出待判问题和可选处置，不下结论，也不构成裁决。
- **程序依据：** 依 `AGENTS.md:60`（C2-2）与 `.omp/agents/governance-desk.md:20`，闸门 A 由 `Argon` 判定（是否触及产品原始意图或公开契约），闸门 B 由 `ArgonGovernance` 判定（是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项）。两道闸门都确认不越界，才可作为机械补全免投票放行；任一闸门认定越界，就按 P0 起草决策表立案投票。本轮按 U106，两道闸门由 Main 各派一个一次性空白实例判定。

来源标记：`(U)` 用户原话；`(D)` 文档原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人的评论属于 `(A)`，其中引用的命令输出未经本实例重跑，凡是本实例亲自观察过的另标 `(R)`。

路径简称：
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`
- `DEC/` = `PM/evidence/decisions/`
- `WT/` = W-09 切片 worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`

---

## 〇、两项共用的事实

| # | 事实 | 来源 |
|---|---|---|
| F0-1 | 分支 `issue-17-lab-catalog-events` 的远端头为 `d75b7d9a2dd1…`。以该分支为 head 的 PR 数量为 0（`gh pr list --head … --state all` 返回 `[]`），也就是说还没有开 PR。 | (R) `gh api repos/Pepgent/Pepgent/branches/issue-17-lab-catalog-events`；`gh pr list -R Pepgent/Pepgent --head issue-17-lab-catalog-events --state all` |
| F0-2 | `WT/` 工作区干净，HEAD 为 `d75b7d9 feat(lab): LAB-07a catalog、实验页、变更流与只读字节代理（routeTree 归属与 slots 待裁决）`。 | (R) `git status --short`、`git log -1`（在 `WT/` 中执行） |
| F0-3 | W-09 白名单：只写 `apps/web/src/protocol/lab/**`（唯一写方）、`apps/web/src/server/lab/**`、`apps/web/src/rpc/lab.ts`、`apps/web/src/app/routes/api/lab/**`、`apps/web/resources/lab/**`，以及承载 `apps/web` 依赖的 package manifest、lockfile 和随依赖变化的 `THIRD_PARTY_NOTICES.md`。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09） |
| F0-4 | 同一行的 lockfile 规则是：哪个席位改了工作区 manifest，就由它在同一个 PR 中重新生成 lockfile；并行 PR 冲突时，rebase 后重新生成。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09，“lockfile 规则”段） |
| F0-5 | W-10 白名单含 `apps/web/src/app/routes/_lab.tsx` 和 13 个 `_lab.*.tsx` 页面路由，但不含 `routeTree.gen.ts`。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09，W-10 段）；`DEC/D20-w10-path-boundary.md:31`（D20-01） |
| F0-6 | 有一个白名单扩展的先例：Pepgent#43 的 W-09 BLOCKED 由治理分身会同双核分类为“机械补全”，把 5 组具体文件扩入 W-09 白名单，未经三族表决。该先例早于 U96 设立的事前双闸门（见 F0-9），程序不同于现行 C2-2。 | (D) `DEC/D16-blocked-pepgent43-triage.md:1-23` |
| F0-7 | D10-08 划定了领导层与工程师的决定权。以下事项回领导层投票，leader 不单裁：意图、范围、D9 分类、缺失设计、跨仓公开契约（HTTP/SSE/WS/RPC、wire、持久化、ADT、权限、状态权威与生命周期）、部署前提、验收语义。已通过契约内的单仓私有结构、算法、文件组织由工程师决定。 | (D) `DEC/D10-repo-delivery.md:20` |
| F0-8 | 接口表或权限表缺少某项，不构成授权。 | (D) `AGENTS.md:122` |
| F0-9 | 用户原话：“BLOCKED 初审的分工和 ArgonGovernance 的职能冲突，而且纠错发生在事后……错误分类可能先写进代码，查出来再回退”。由此设立事前双闸门。 | (U) U96，`LEDGER.md:110`；(D) `AGENTS.md:60` |
| F0-10 | 同一仓或同一互斥路径域内的关联切片，由所属席位连续实现，可以在同一个 PR 中用多个 `Closes #X` 合并提交；只有编译、类型、构建或调用契约上的真实依赖才需要等待。 | (D) `DEC/D16-phaseB-review-restore.md:35`（D16-11③）；`AGENTS.md:45`（C1-3）；(U) U83 `LEDGER.md:97` |
| F0-11 | 开发期各仓只做本仓检查，不设跨组件 live 锁，阶段 C 统一验收。 | (D) `DEC/D16-phaseB-review-restore.md:37`（D16-13）；(U) U30–U32 `LEDGER.md:88` |
| F0-12 | 事后检查结论：治理已要求从 PR 剔除越域文件 `routeTree.gen.ts`；剔除后若出现真实编译 blocker，则在原 issue 上报双闸门，“不得先合入再补授权”。 | (D) `LEDGER.md:22`（R8 行） |

---

## 一、BLOCKED-1：`routeTree.gen.ts` 归属

### 1.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F1-1 | 工人已按事后检查结论执行 `git checkout origin/main -- apps/web/src/app/routeTree.gen.ts`，该文件不进入 LAB-07a 的提交与 PR。 | (A) 评论 6560072203、6560111314 第 1 点 |
| F1-2 | 当前 `WT/` 中的 `routeTree.gen.ts` 共 629 行，含 14 处 `routes/_lab` 导入和 `/api/host/events` 条目，不含任何 `/api/lab/**` 条目。 | (R) `grep -c "routes/_lab"`、`grep -n 'api/lab\|api/host'`、`wc -l`（在 `WT/apps/web/src/app/routeTree.gen.ts` 上执行） |
| F1-3 | LAB-07a 新增 4 个路由文件，都在 W-09 白名单的 `apps/web/src/app/routes/api/lab/**` 内：`events.ts`、`objects/$sha.ts`、`artifacts/$id.ts`、`volumes/$run/$step/$position/files/$.ts`。 | (R) `ls -R WT/apps/web/src/app/routes/api/`；(D) F0-3 |
| F1-4 | 路由文件以 `createFileRoute('/api/lab/objects/$sha')` 这种形式声明，路径字面量的类型取自生成文件。 | (R) `WT/apps/web/src/app/routes/api/lab/objects/$sha.ts:1-5` |
| F1-5 | 剔除生成文件后，`npm --workspace @pepgent/web run typecheck` 报 4 个文件共 9 个诊断：TS2345（路径字面量 not assignable to `keyof FileRoutesByPath`）和 TS2339（params 上不存在 `sha/id/run/step/position`）。 | (A) 评论 6560072203。本实例未重跑 |
| F1-6 | 该文件头部写明由 TanStack Router 自动生成，不应手改。 | (R) `WT/apps/web/src/app/routeTree.gen.ts:1-9`（第 7 行） |
| F1-7 | 仓库约定：Start 的文件路由表 `apps/web/src/app/routeTree.gen.ts` 由 Start 在 dev/build 时生成并提交，Biome 不检查它。 | (D) `WT/docs/conventions/06-toolchain-and-gates.md:122`、`:124`；`WT/biome.jsonc:22` |
| F1-8 | 生成由 Vite 插件 `tanstackStart(...)` 完成，web 的 `build` 脚本第一步就是 `vite build`。因此 W-09 每次做本仓构建都会在本地重新生成该文件。 | (R) `WT/apps/web/vite.config.ts:38`；`WT/apps/web/package.json:23`；(A) 评论 6560111314 第 1 点 |
| F1-9 | D16-09 的席位矩阵中，没有任何席位的白名单含 `routeTree.gen.ts`；`DEC/` 下没有任何决策正文提到 `routeTree`。 | (R) `grep -rn routeTree DEC/` 无匹配；(D) F0-3、F0-5 |
| F1-10 | 后续切片同样会改路由表：LAB-07b 的 agents stream 与 files 新增 `api/lab` 路由，LAB-11a 新增上传路由，LAB-12 新增 jobs tail 路由。W-10 若增删 `_lab.*.tsx`，同样会改这个文件。 | (A) 评论 6560072203 “需要的裁决”、6560167442；(D) W-10 路由白名单见 F0-5（是否会增删 `_lab.*.tsx` 属推断，`[INFERENCE]`） |
| F1-11 | 工人请求裁决两件事：`routeTree.gen.ts` 由谁生成、由谁提交；如果归 W-09，是只限本 PR 中由 `app/routes/api/lab/**` 引起的生成差量，还是同样适用于 LAB-07b 和 LAB-11a 新增的 `api/lab` 路由。 | (A) 评论 6560072203 |

### 1.2 闸门 A 的问题（交 `Argon`）

- **A1-1：** 一个仓内生成产物（`routeTree.gen.ts`）该由谁生成、由谁提交，是否触及产品原始意图？请引用 `(U)`。
- **A1-2：** 这件事是否触及公开契约（F0-7 列出的 HTTP/SSE/RPC、wire、持久化、ADT、权限、状态权威与生命周期、部署前提、验收语义）？F1-3 所列路由的路径与形状已由 D12-13、D12-17 定义（`DEC/D12-lab-wire.md:522-557`），生成文件只是把这些路由登记进路由表。这能否算作 F0-7 所说的“单仓私有文件组织”？
- **A1-3：** 下列处置是否改变已通过的契约？若某项处置会改变 `docs/conventions/06-toolchain-and-gates.md:122` 的“生成并提交”约定（例如 1.4 的处置 c），它是仓库工程约定，还是需要表决的契约？

### 1.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B1-1：** `routeTree.gen.ts` 不在 W-09 白名单内（F0-3、F1-9）。让 W-09 提交该文件（无论全量还是只提交 `api/lab` 差量），是否属于越过 D16-09 白名单、必须修订 D16-09 并投票的事项？还是可以像 F0-6 的先例那样，作为机械补全扩入白名单？F0-6 的先例早于 U96，现行程序下它还能否当作参照？
- **B1-2：** 该文件同时登记 W-09 的 `api/lab/**` 路由和 W-10 的 `_lab*.tsx` 路由（F1-2、F0-5）。把它单独划给某一席位，会不会导致另一席位每次改自己白名单内的路由时都要越域，或者要等对方补生成？这算不算 D16-09 “每个手写文件或段落只有一个 owner”（`DEC/D16-phaseB-review-restore.md:33` “得到”栏）没有覆盖到的生成产物空白？
- **B1-3：** 若参照 F0-4 的 lockfile 规则写一条“谁改路由文件，谁在同一 PR 中重新生成路由表”，这是在现有规则内补全，还是新增规则？按 `AGENTS.md:124`，规则只有 `(U)` 和已通过的决策正文两个来源。
- **B1-4：** 阶段门禁：在没有授权的情况下，W-09 的 PR 无法通过本仓 typecheck（F1-5）。按 F0-10、F0-11，合入只要求本仓编译、类型与基础检查通过；按 F0-12，不得先合入再补授权。下面哪些处置会让 typecheck 失败的 PR 被合入，或者让合入去等另一席位，从而与 D16-11③、D16-13 相冲突？
- **B1-5：** 授权范围：只限本 PR，还是覆盖 W-09 后续切片（LAB-07b、LAB-11a、LAB-12，F1-10）？若同时覆盖 W-10，是否就触及 W-10 的白名单，从而需要修订 D20-01？

### 1.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 涉及的白名单与文本 | 需要注意的地方 |
|---|---|---|---|
| a | 把 `routeTree.gen.ts` 中由 W-09 白名单内路由引起的生成差量扩入 W-09 白名单，只限 LAB-07a 这一个 PR。 | 扩充 W-09 白名单的条目（D16-09） | 后续 LAB-07b、LAB-11a、LAB-12 和 W-10 的路由改动会再次遇到同一卡点（F1-10） |
| b | 同 a，但覆盖 W-09 全部切片：凡改动 `routes/api/lab/**`，就在同一 PR 中重新生成并提交路由表。 | 扩充 W-09 白名单的条目 | W-10 的 `_lab*.tsx` 改动仍没有 owner；两席并行时，同一生成文件会有两个写方 |
| c | 写一条生成产物通用规则，比照 F0-4：哪个席位改了白名单内的路由文件，就由它在同一 PR 中重新生成 `routeTree.gen.ts`；并行冲突时 rebase 后重新生成。W-09 与 W-10 都适用。 | 修订 D16-09，并波及 D20-01 | 与 lockfile 规则同构；是否属于“新增规则”须由 B1-3 判定 |
| d | 指定单一 owner（例如 W-10），由它在 W-09 合入后补生成。 | 修订 D16-09 或 D20-01 | W-09 的 PR 自身 typecheck 不过，与 F0-10、F0-12 冲突，并产生跨席位串行等待 |
| e | 改变工具链：不再提交生成文件，改在 typecheck 或 build 前生成。 | 要改 `docs/conventions/06-toolchain-and-gates.md:122`、`.gitignore` 和 `apps/web/package.json` 中的脚本；后者在 W-09 白名单内，前两者不在 | 改变仓库既有的“生成并提交”约定（F1-7），波及所有改路由的席位 |
| f | 路由文件绕开生成类型（例如改用非类型化的路径或断言）。 | 只改 W-09 白名单内的文件 | 本质是压掉类型错误；`vite build` 仍会在本地重新生成该文件（F1-8），无法消除越域差量的来源 |

---

## 二、BLOCKED-2：`slots` 恒为 `[]`，与契约冲突

### 2.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F2-1 | D12-04 规定，目录中每个实验项带有在线根会话经 `writers()` → 各写方 `slots()` 读到的在途槽位。挂载规则：该会话有 Open 运行时，槽位挂到 `ExperimentWire.slots`；无运行时，Discussion 来源挂到该会话的 `pendingLaunch` 实验项，Panel 与 Automation 来源挂到 `ConversationWire.slots`。实验的 progress/where/now/updated/needs_you 由图与槽位投影得出。 | (D) `DEC/D12-lab-wire.md:36`（D12-04） |
| F2-2 | 类型定义：`ExperimentWire.slots: SlotWire[]`，注释为“该运行所属根会话的全部在途槽位”；`ConversationWire.slots: SlotWire[]`，“该会话在线一代当前全部在途槽位；会话不在线时为空数组”。 | (D) `DEC/D12-lab-wire.md:260-269`（`:264`）、`:149-151` |
| F2-3 | D19-05 把槽位与写方改为按会话寻址，并要求在 D12:149-150 的 `ConversationWire` 中新增 `slots`。PM 远端 main 上的 D12 已含该字段（第 150 行）与第 264 行的新注释。 | (D) `DEC/D19-sor13-control-contract.md:33`、`:41`；(R) `gh api repos/Pepgent/PM/contents/evidence/decisions/D12-lab-wire.md` 解码后 grep 命中 `:150`、`:264` |
| F2-4 | D7-08 规定：在途叠加层由 Lab 读取自己持有的在线一代根会话的 `writers` 与各写方的 `slots`，两者都不按运行过滤，不唤醒停驻会话。 | (D) `DEC/D7-lab-backend.md:68` |
| F2-5 | D8 切片表：LAB-07a 负责“catalog 与实验页的线数据（`RunGraph`）、`/api/lab/events`、对象代理”，依赖 LAB-06、MUX-04，验收为“运行变更时推送 `run` 频道”；LAB-07b 负责“在途叠加层（`writers` 与 `slots`）、agents stream、files”，依赖 LAB-07a、MUX-03、MUX-06、MUX-07，验收为“页面线数据中带有在途槽位”。 | (D) `DEC/D8-mvp-scope.md:327`、`:328`；`issue://Pepgent/Pepgent/20` 正文 |
| F2-6 | 下游依赖：WEB-02（真实 LabBridge、loader 读取线数据）只依赖 LAB-07a 与 WEB-01；WEB-03（实验投影，含 needs_you 等）依赖 LAB-07b。 | (D) `DEC/D8-mvp-scope.md:336`、`:337` |
| F2-7 | Protocol（W-09 是唯一写方）中，`ExperimentWireSchema.slots` 为 `z.array(SlotWireSchema)`，必填，注释写“Only Open runs have slots.”；`ConversationWireSchema` 没有 `slots` 字段。 | (R) `WT/apps/web/src/protocol/lab/catalog.ts:31-45`（`:36-37`）、`WT/apps/web/src/protocol/lab/rows.ts:109-117` |
| F2-8 | 实现中，`readCatalog` 对已绑定运行和未绑定草稿两类实验项都写 `slots: []`，文件头注释为“in-flight overlay (writers → slots) is LAB-07b's and arrives as `slots: []` until then”。 | (R) `WT/apps/web/src/server/lab/catalog.ts:3`、`:116`、`:130` |
| F2-9 | 工人的判断：线上的 `[]` 表示“权威确认没有在途槽位”，实际情况却是“本片尚未读取”，在线一代存在槽位时就成了错误事实。 | (A) 评论 6560074431 |
| F2-10 | 顾问意见（工人转述）：steady 与 mentor 认为恒为 `[]` 不可交付；divergent 认为切分成立，但须写明 07a 合入后、07b 合入前，GUI 接上真实数据会显示“无在途”。 | (A) 评论 6560074431。顾问是工人事后补请的，见 `LEDGER.md:21` R7 |
| F2-11 | 工人说“D12 v3 正文也尚未回写”，D19 的首步槽位挂载在 protocol 中没有字段。本实例核实：protocol 确实没有 `ConversationWire.slots`（F2-7），但 PM 远端 main 的 D12 已含该字段（F2-3）。工人所说的“v3”具体指哪份文本，需要向源头核实。 | (A) 评论 6560074431、6560167442；(R) F2-3、F2-7 |
| F2-12 | 07b 依赖的上游 issue 状态：MUX-03 omp-rpc-mux#3、MUX-06 omp-rpc-mux#6、MUX-07 omp-rpc-mux#7、SOR-13 soroi#209 均为 CLOSED。issue 关闭不等于代码已合入对应仓的 `main`，本实例未核实合入。LAB-07b #20 与 WEB-02 #21 均为 OPEN。 | (R) `gh issue view` ×6 |
| F2-13 | `design/` 中仍是按运行寻址的旧写法 `writers(runId)`、`slots(runId)`，与 D19-05 的按会话寻址不一致。D19 规定 `design/` 由 Argon 回写。 | (D) `design/store.md:150`、`:225`；`design/intervention.md:11`、`:16`；`design/eval.md:236`；`DEC/D19-sor13-control-contract.md:44` |
| F2-14 | 工人请求三选一：(1) #17 不单独合入，与 LAB-07b #20 原子交付；(2) 调整边界，由 #17 直接按 D19 读取 writers/slots；(3) 允许 #17 以“slots 未接入”的明示语义合入，并给出 wire 级的表达方式。裁决前不宣称 catalog 完成，也不改 protocol 字段。 | (A) 评论 6560074431 |
| F2-15 | D24（derive 请求补 `by: UserId`）只涉及根端点的 `derive` 请求，由 W-09 在 LAB-08 发出 `intervene.derive` 时填写，不涉及本项读取侧的 `slots`。 | (D) `DEC/D24-derive-principal.md:19`；`DEC/D8-mvp-scope.md:329`（LAB-08） |

### 2.2 闸门 A 的问题（交 `Argon`）

- **A2-1：** 线上恒为 `[]`，而 F2-2 对它的定义是“全部在途槽位”。这是否构成线上事实与公开契约 D12-04 不符（F2-1、F2-2、F2-9）？
- **A2-2：** 工人选项 (3) 要求给出“slots 未接入”的 wire 级表达，例如可选字段或标签联合。这会改变 `ExperimentWire` 的公开形状和 ADT（F2-2、F2-7），是否属于必须表决的公开契约变更？
- **A2-3：** 工人选项 (2) 把 writers/slots 读取并入 #17，会改变 D8:327/328 的切片范围（F2-5），但不改变 D12 或 D19 的契约本身。这算触及意图或范围（F0-7 的“范围”），还是只是已通过契约内的实现排序？
- **A2-4：** 工人选项 (1) 在一个 PR 中实现 #17 与 #20、用两个 `Closes`（F0-10），不改变任何契约和切片范围，是否就不触及意图或契约？
- **A2-5：** `design/` 仍是按运行寻址的旧写法（F2-13），工人还提到“D12 v3 未回写”（F2-11）。这些是否构成本项必须先补的缺失设计？按 D19 由 Argon 回写 `design/` 是否与本项有关？

### 2.3 闸门 B 的问题（交 `ArgonGovernance`）

- **B2-1：** 白名单：三个选项涉及的文件都在 W-09 白名单内，包括 `protocol/lab/**`、`server/lab/**`（F0-3）。哪个选项会越过 D16-09？
- **B2-2：** 阶段门禁与派工：选项 (1) 依据 D16-11③ 合并提交（F0-10）。合入 #17 的时间因此推迟到 #20 写完，而 WEB-02 只依赖 LAB-07a（F2-6）。这会推迟 W-10 的启动或推进吗？这算不算 D16-10 “W-10 在 protocol/lab 的真实上游合入后优先补入”（`DEC/D16-phaseB-review-restore.md:34`）意义上的阻碍？
- **B2-3：** 选项 (2) 改变 D8 切片边界（F2-5），是否必须投票？07b 的上游 issue 已全部 CLOSED（F2-12），但“已合入 main”这个开工条件尚未核实，这会不会让 (2) 实际上成为跨组件的等待？
- **B2-4：** 选项 (3) 若被闸门 A 认定为契约变更，就必须按 P0 投票。在投票期间，W-09 是否可以继续写白名单内不依赖本项结论的部分（参照 `DEC/D16-15-stress.md:22` “C5-4 投票期间照常推进”）？
- **B2-5：** 无论选择哪个选项，`ConversationWire.slots`（F2-7 缺失、F2-3 已入 D12）都要由 W-09 写入 protocol。这是在落实已通过的 D19，无需另行授权，还是需要单独上报？

### 2.4 可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约或切片表 | 需要注意的地方 |
|---|---|---|---|
| 1 | #17 不单独合入，在同一分支或 PR 中继续实现 LAB-07b，PR 正文写 `Closes #17`、`Closes #20`（D16-11③）。 | 不改 | WEB-02 的上游合入时间推迟（F2-6）；07b 的上游代码是否已合入 `main` 未核实（F2-12） |
| 2 | 修改 D8:327/328 的边界：#17 直接按 D19 读取 writers/slots，07b 只保留 agents stream 和 files。 | 改切片表 | 须判定是否属于范围变更（A2-3、B2-3） |
| 3 | 允许 #17 以“slots 未接入”的明示语义合入，并新增 wire 级表达。 | 改公开 wire | 若被认定为契约变更，须按 P0 立案投票（A2-2）；之后 07b 合入时还要把表达撤掉 |
| 4 | 维持现状：#17 以 `slots: []` 合入，在 PR 或 issue 中写明 07a 合入后、07b 合入前 GUI 会显示“无在途”（divergent 方案，F2-10）。 | 名义上不改 | 线上事实与 D12-04 不符（A2-1）；按 F0-12 不得先合入再补授权 |

---

## 三、同一评论串中不在本次任务范围内的事项（只登记）

- [评论 6560111314](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560111314) 第 6 点：请示跨组件验证的边界，即已运行的 A 段、B 段 (R) 证据是否写入 PR 正文，以及能否重跑 A 段。相关依据为 F0-11 与 D16-13。本次 brief 未列入，需要时由 Main 另行派发。
- [评论 6560167442](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560167442)：LAB-11b #18 另报 BLOCKED（6560165218）；LAB-11a 和 LAB-12 的路由同样涉及 `routeTree`（与 F1-10 相关）。工人自述目前没有可以独立推进的切片，停在 home worktree 等待裁决。

## 四、两道闸门判定后的程序

- 两项 BLOCKED 分别判定。对某一项，A 与 B 都确认不越界时，按机械补全放行，结论写回 #17，再由 Pepgent 片区经理送达 W-09。
- 任一闸门认定越界时，由新的 governance-desk 实例按 P0 起草决策表（`ID | what | where | how | 取舍 | 分类`），写入 `local://decisions/`，交议会立案。参投席位与门槛按 `AGENTS.md:22-27`（D1-12）：产品与契约议案由 4 席参投；若涉及派工分配或白名单（例如 BLOCKED-1 的处置 c、d），另加 `ArgonGovernance`。
- 闸门结论建议写在本文件末尾的“闸门 A 结论”“闸门 B 结论”两节，保证下一个空白实例只读本文件就能接续。
