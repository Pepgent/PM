# 决策表草稿：Pepgent#17 BLOCKED-1，`routeTree.gen.ts` 的写入归属

- **状态：** 草稿，未立案、未投票、未提交。议会 daemon 上线后，由它在 Pepgent/PM 创建 decision issue 立案；表决正文以该 issue 为准，本文件不是权威。
- **起草：** governance-desk（总协调指挥席，与 `Main` 合计 1 票）。起草者不另投票。
- **来由：** [Pepgent/Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17)，[BLOCKED-1 评论](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560072203)。闸门结论已写回 #17：[评论 6560745517](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560745517)。
- **为什么要投票：** 闸门 A 判定不越界，闸门 B 判定越界（触及 D16-09 / D20-01 的写入授权空白）。按 C2-2，任一闸门认定越界就按 P0 投票。见 `GATE/pepgent-17-gate-a.md:5`、`GATE/pepgent-17-gate-b.md:9`，`SOR/AGENTS.md:60`。
- **优先级：** P0（关键路径工程 BLOCKED 解阻）。依据 `SOR/AGENTS.md:26`。
- **参投席位与门槛：** 本议案涉及派工白名单，属于组织与派工议案，由 5 席逐条投票：总协调指挥席、独立正反审查席 `claude-high`、产品原始意图席 `Argon`、独立导师仲裁席 `LeadMentor`、组织治理席 `ArgonGovernance`。通过条件：至少 4 席赞成，`Argon` 和 `ArgonGovernance` 都未行使专责否决，且有效反例都已消除。依据 `SOR/AGENTS.md:23,27`、`GATE/pepgent-17-gate-b.md:63`。
- **表决次序：** RT-1 到 RT-4 互相排斥。先表决 RT-1（闸门 B 建议送审的处置 c，`GATE/pepgent-17-gate-b.md:9,50`），RT-1 通过时，RT-2 到 RT-4 不再表决；RT-1 未通过时，依次表决 RT-3、RT-2、RT-4。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 命令输出；`(A)` agent 的说法，只作解释。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`
- `DEC/` = `PM/evidence/decisions/`
- `GATE/` = `PM/evidence/gates/`（Pepgent/PM@`40d6255`）
- `WT/` = `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`（W-09 的 LAB-07a 切片工作树）

## 一、决定性事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | W-09 白名单只含 `apps/web/src/protocol/lab/**`、`apps/web/src/server/lab/**`、`apps/web/src/rpc/lab.ts`、`apps/web/src/app/routes/api/lab/**`、`apps/web/resources/lab/**`，以及承载 `apps/web` 依赖的 package manifest、lockfile 和随依赖变化的 `THIRD_PARTY_NOTICES.md`。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09，W-09 段） |
| F2 | W-10 白名单含 `apps/web/src/app/routes/_lab.tsx` 和 13 个 `_lab.*.tsx` 页面路由。 | (D) `DEC/D20-w10-path-boundary.md:31`（D20-01） |
| F3 | 两席白名单都不含 `apps/web/src/app/routeTree.gen.ts`；`DEC/` 下没有任何决策正文提到 `routeTree`。 | (D) F1、F2；(R) `grep -rn routeTree DEC/` 无匹配，见 `GATE/pepgent-17.md:51` |
| F4 | D16-09 只对 lockfile 写了生成产物规则：“哪个席位改了工作区 manifest，就由它在同一个 PR 中重新生成 lockfile；并行 PR 在 lockfile 上冲突时，rebase 后重新生成。” | (D) `DEC/D16-phaseB-review-restore.md:33`（“lockfile 规则”段） |
| F5 | 该文件头部声明由 TanStack Router 自动生成，不应手改。 | (D) `WT/apps/web/src/app/routeTree.gen.ts:7-9` |
| F6 | 仓库约定：Start 的文件路由表 `apps/web/src/app/routeTree.gen.ts` 由 Start 在 dev/build 时生成并提交，Biome 不检查它。 | (D) `WT/docs/conventions/06-toolchain-and-gates.md:122,124` |
| F7 | 生成由 Vite 插件 `tanstackStart(...)` 完成；web 的 `build` 脚本第一步是 `vite build`，所以每次本仓构建都会在本地重新生成该文件。 | (D) `WT/apps/web/vite.config.ts:38`、`WT/apps/web/package.json:23` |
| F8 | 路由文件以 `createFileRoute('/api/lab/objects/$sha')` 的形式声明，路径字面量和 params 的类型取自生成文件中的 `FileRoutesByPath`；当前生成文件没有 `api/lab` 登记。 | (D) `WT/apps/web/src/app/routes/api/lab/objects/$sha.ts:5-9`、`WT/apps/web/src/app/routeTree.gen.ts:359-360`；见 `GATE/pepgent-17-gate-b.md:39-40` |
| F9 | 剔除生成文件后，`npm --workspace @pepgent/web run typecheck` 在 4 个文件中报 9 个诊断（TS2345、TS2339）。 | (A) [评论 6560072203](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560072203)，未重跑 |
| F10 | 后续切片同样会改路由表：LAB-07b 的 agents stream 与 files、LAB-11a 的上传、LAB-12 的 jobs tail 都会新增 `api/lab` 路由。W-10 若增删 `_lab.*.tsx`，也会改这个文件。 | (A) 评论 6560072203、6560167442；W-10 部分为 `[INFERENCE]`，见 `GATE/pepgent-17.md:52` |
| F11 | 治理已要求从 PR 剔除越域的 `routeTree.gen.ts`；剔除后若出现真实编译 blocker，回原 issue 上报双闸门，不得先合入再补授权。 | (D) `SOR/LEDGER.md:22`（R8 行） |
| F12 | 同一路径域内的关联切片可以连续实现、合并提交；合入只要求本仓编译、类型与基础检查通过，开发期不设跨组件 live 锁。 | (D) `DEC/D16-phaseB-review-restore.md:35,37`（D16-11③、D16-13）、`SOR/AGENTS.md:45,127`；(U) U30–U32 `SOR/LEDGER.md:88`、U83 `SOR/LEDGER.md:97` |
| F13 | 错误分类可能先写进代码，查出来再回退，所以设立事前双闸门。 | (U) U96 `SOR/LEDGER.md:110`；(D) `SOR/AGENTS.md:60` |
| F14 | 规则只有两个来源：`(U)` 和已通过的决策正文；接口或权限表缺少某项，不构成授权。 | (D) `SOR/AGENTS.md:122,124` |
| F15 | 闸门 A：按既有工具链重新生成并提交已批准 Lab 路由的登记，不改变任何 HTTP/SSE 路径、载荷、权限或路由语义；本席不授权扩充白名单。 | (D) `GATE/pepgent-17-gate-a.md:5,44-48` |
| F16 | 闸门 B：生成产物身份、只含 `api/lab` 差量、一次性授权、参照 lockfile 都不能自行产生写入授权；处置 a、b、c、e 都须 P0 投票，建议送审 c。 | (D) `GATE/pepgent-17-gate-b.md:9,48-52` |

## 二、决策项

| ID | what | where | how | 取舍 | 分类 |
|---|---|---|---|---|---|
| RT-1（主案，处置 c） | **`routeTree.gen.ts` 由改路由的席位在同一 PR 中重新生成并提交，W-09 与 W-10 都适用** | D16-09（`DEC/D16-phaseB-review-restore.md:33`）的 W-09 段、W-10 段和“lockfile 规则”段；D20-01（`DEC/D20-w10-path-boundary.md:31`）的路由条目 | 在 D16-09 的“lockfile 规则”段后加一段“路由表规则”，W-09 段和 W-10 段各引用这段，D20-01 的路由条目同步写明：<br>• 范围：`apps/web/src/app/routeTree.gen.ts`。<br>• 谁写：哪个席位在自己的 PR 中增删、改名或改路径了自己白名单内的文件路由，就由它在同一个 PR 中用既有工具链（Start 插件，`vite build` 或 dev）重新生成并提交该文件。W-09 对应 `apps/web/src/app/routes/api/lab/**`（F1），W-10 对应 `_lab.tsx` 与 `_lab.*.tsx`（F2）。<br>• 冲突处理：并行 PR 在该文件上冲突时，rebase 后重新生成。<br>• 不手改：该文件只由工具链生成（F5）。<br>• 不放开其他文件：本规则只授权这个生成产物，不授权对方白名单内的任何手写文件。<br>• 生效后：W-09 在 LAB-07a/07b 的 PR 中提交该文件，F9 的诊断随登记消失。 | **得到：**<br>• 两席各自在本 PR 中完成登记，本仓 typecheck 可过，不跨席位等待（F12）。<br>• 与 lockfile 规则同构（F4），覆盖 F10 的后续切片，不再为同一卡点重复上报。<br>• 保留“生成并提交”的工程约定（F6），不改工具链。<br>**放弃：**<br>• 同一生成文件有两个写方，并行 PR 会出现机械冲突，按 rebase 处理。<br>**备选落选：**<br>• RT-2：后续切片和 W-10 会再遇到同一卡点（F10）。<br>• RT-3：W-10 的页面路由改动仍没有 owner。<br>• RT-4：改变“生成并提交”约定，波及所有改路由的席位，并需另授权白名单外的文件。<br>• 处置 d、f：见第三节。 | 治理 |
| RT-2（备选，处置 a） | **只限 LAB-07a/07b 这一个 PR，授权 W-09 提交由其 `api/lab/**` 路由引起的生成差量** | D16-09 的 W-09 段（`DEC/D16-phaseB-review-restore.md:33`） | 在 W-09 段加一条一次性授权：W-09 在 [#17](https://github.com/Pepgent/Pepgent/issues/17)/[#20](https://github.com/Pepgent/Pepgent/issues/20) 的合并 PR 中，用既有工具链重新生成并提交 `apps/web/src/app/routeTree.gen.ts`，差量只含 `apps/web/src/app/routes/api/lab/**` 引起的登记。该 PR 合入后授权结束。 | **得到：** 授权范围最小，只解除当前卡点。<br>**放弃：** LAB-11a、LAB-12 和 W-10 的路由改动会再次遇到同一卡点，每次都要重新走双闸门和 P0（F10）。<br>**备选落选：** 见 RT-1 的“备选落选”。 | 治理 |
| RT-3（备选，处置 b） | **授权 W-09 在全部切片中，凡改动 `api/lab/**` 路由，就在同一 PR 中重新生成并提交路由表** | D16-09 的 W-09 段（`DEC/D16-phaseB-review-restore.md:33`） | 在 W-09 段加入：`apps/web/src/app/routeTree.gen.ts`，限于由 `apps/web/src/app/routes/api/lab/**` 的增删改引起的重新生成，用既有工具链生成，不手改，在同一 PR 中提交；并行冲突时 rebase 后重新生成。W-10 的白名单不变。 | **得到：** W-09 后续切片（LAB-07b、LAB-11a、LAB-12）不再为同一卡点上报。<br>**放弃：** W-10 改页面路由时，该文件仍没有 owner，W-10 会遇到同一卡点；如果 W-10 要等 W-09 补生成，就形成跨席位串行等待（`GATE/pepgent-17-gate-b.md:49,61`）。<br>**备选落选：** 见 RT-1 的“备选落选”。 | 治理 |
| RT-4（备选，处置 e） | **改工具链：不再提交 `routeTree.gen.ts`，改为在 typecheck 和 build 前生成** | `WT/docs/conventions/06-toolchain-and-gates.md:122`；仓根 `.gitignore`；`apps/web/package.json` 的 `typecheck` 脚本（`WT/apps/web/package.json:26`）；D16-09 的 W-09 段 | 授权 W-09 在本 PR 中做以下改动：<br>• 把 `apps/web/src/app/routeTree.gen.ts` 加入 `.gitignore`，并从索引中移除该文件。<br>• 在 `apps/web/package.json` 的 `typecheck` 前加生成步骤（占位：TanStack Router 的路由生成入口，具体命令由 W-09 决定）。<br>• 把 `06-toolchain-and-gates.md:122` 的“生成并提交”改成“在 dev、build、typecheck 前生成，不提交”。<br>以上三处写入 D16-09 的 W-09 段，作为本议案的一次性授权。 | **得到：** 生成文件不进入任何 PR，两席都不再有写入冲突。<br>**放弃：**<br>• 改变仓库既有的“生成并提交”约定（F6），波及所有改路由的席位和所有检查入口。<br>• `.gitignore` 与该文档不在 W-09 白名单内；D20-03 的文档授权只列另外三份文档（`GATE/pepgent-17-gate-b.md:52`）。<br>**备选落选：** 见 RT-1 的“备选落选”。 | 治理 |

## 三、不入表的处置

以下处置来自闸门材料 1.4 节（`GATE/pepgent-17.md:76,78`），两道闸门都已判定不作为解阻方案，不列为决策项：

- **处置 d（指定单一 owner，在 W-09 合入后补生成）：** 闸门 B 判定，按材料所述的“先合入、后补生成”不可放行：它绕过本仓真实检查的 blocker；改成合入前等待对方代为生成，又会产生跨席位串行依赖；投票也不能用来豁免用户既定约束。见 `GATE/pepgent-17-gate-b.md:51`。闸门 A 也判定不作为本次机械解阻放行，见 `GATE/pepgent-17-gate-a.md:47`。依据还有 F11、F12。
- **处置 f（用断言或非类型化路径压掉类型错误）：** 闸门 A 判定它不能补上缺失的路由登记，见 `GATE/pepgent-17-gate-a.md:49`。闸门 B 判定不作为解阻方案放行，见 `GATE/pepgent-17-gate-b.md:53`。另外，`vite build` 仍会在本地重新生成该文件（F7），越域差量的来源并没有消除。

## 四、投票期间的边界

以下内容已写入 #17 的闸门结论评论，此处只为立案时对照：

- 投票结果出来前，W-09 不得提交 `routeTree.gen.ts`，不得先合入再补授权（F11；`GATE/pepgent-17-gate-b.md:91`）。
- 已批准但不受本项影响的部分照常推进，包括 BLOCKED-2 处置 1 中的 LAB-07b 实现；本议案不冻结无关工程（`GATE/pepgent-17-gate-b.md:89,104`）。
