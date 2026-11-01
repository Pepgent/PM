# D25 选票：ClaudeHigh

议程：Pepgent#17 BLOCKED-1：routeTree.gen.ts 由改路由的席位在同一 PR 中重新生成并提交（[PM#42](https://github.com/Pepgent/PM/issues/42)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D25-01 v1：赞成（ClaudeHighD25，2026-11-01T17:23:18.426Z）


**分类意见：** 治理

# D25-01 v1：ClaudeHigh 独立正反审查票（实例 ClaudeHighD25）

**票：赞成（approve）。分类：同意“治理”。**

本席只读核对了 `council tally D25`、议会库中 D25 facts 与 D25-01 v1 的 what/where/how/取舍原文、`PM/evidence/gates/pepgent-17.md`、`-gate-a.md`、`-gate-b.md`、`-item6.md`，以及 D16-09 整行（`DEC/D16-phaseB-review-restore.md:33`）、D20-01（`DEC/D20-w10-path-boundary.md:31`）、`SOR/AGENTS.md:60,74,123-128`、`WT/apps/web/src/app/routeTree.gen.ts`（1-38、359-381、589-629）。没有运行构建或 typecheck；F9 的 9 个诊断沿用 (A) 来源。

## steady（保守）压力测试：主路径闭合，没有找到失效反例

1. **触发面闭合。** D16-09 整行中，`apps/web/src/app/routes/**` 下只有两段归属：W-09 的 `routes/api/lab/**` 和 W-10 的 `_lab.tsx`、`_lab.*.tsx`。其余路由（`_app.*`、`api/auth/$`、`api/host/events`、`api/transcript/stream`、`workhub`、`sign-in`、`index`）不属于任何席位，不会触发席位写入。RT-1 覆盖了席位会碰到的全部路由改动，没有第三个席位被漏掉。
2. **触发条件与生成内容一致。** 生成文件只有路由结构：导入（`routeTree.gen.ts:11-38`）、`.update({id,path,getParentRoute})`、`FileRoutesByPath`（`:359` 起）、children 组装（`:589-619`）和固定的 `Register` 声明（`:621-629`），不含 loader、handler 等路由体内容。所以“增删、改名、改路径”这组触发条件正好对应生成文件会变化的情况。
3. **F9 的诊断会消失。** TS2345 和 TS2339 都来自 `FileRoutesByPath` 里没有 `/api/lab/**`。W-09 用 `vite build` 重新生成后，这些路径和 params 进入声明，诊断随之消失。本仓 typecheck 能在 W-09 自己的 PR 内通过，满足 D16-11③④、D16-13，也不需要另一席位代为生成。
4. **不违反隔离与程序。** 两席仍然各用自己的克隆、分支和 PR，没有共分支或共 PR（`AGENTS.md:74` C3-4.3）。授权在提交之前由决策正文生效，符合 F11 的“不得先合入再补授权”和 `AGENTS.md:125` 对规则来源的要求。D16-09 的“得到”栏要求的是“每个手写文件一个 owner”；生成产物由改动方重新生成，与已通过的 lockfile 规则同构，不和单一 owner 原则冲突。
5. **工程约定不变。** 保留 `06-toolchain-and-gates.md:122` 的“生成并提交”，不需要授权白名单外的 `.gitignore` 或工具链文档。闸门 A 已判定不触及产品契约（`gate-a.md:5,46`），闸门 B 建议送审的正是本处置（`gate-b.md:9,50`）。
6. **并行冲突能机械解决。** 每次重新生成都以本克隆当前的 `origin/main` 为底，结果包含对方已经合入的路由。两席 PR 在该文件上冲突时，后合入的一方 rebase 后重新生成即可，不需要人工合并内容，也不需要等对方。

## divergent（发散）立场：没有更简洁、等待更少的主路径

- **RT-2（只授权本 PR）、RT-3（只授权 W-09）：** LAB-07b、LAB-11a、LAB-12 和 W-10 改路由时会再次卡住，每次都要重走双闸门和 P0（F10）。RT-3 下 W-10 还会产生跨席位串行等待（`gate-b.md:49,61`）。
- **RT-4（生成文件不入库）：** 两席写入冲突会消失，但要改仓库约定，并授权 `.gitignore` 和工具链文档这两个白名单外文件，影响所有检查入口，成本更高。
- **把规则泛化为“所有生成产物，任何席位都可以重新生成”：** 现在没有第二个产物需要这样处理，属于没有需求的抽象。
- **结论：** RT-1 是改动最少、零跨席位等待、能一次解决后续切片的主路径。

## 给回写方的非阻断提示（不是反例，不附条件）

D16-09 第 33 行的 W-10 段已经内嵌了 D20-01 的白名单原文。回写“路由表规则”时，D16-09 的 W-09 段、W-10 段和 D20-01 应该同时引用同一段规则，保持三处语义一致，避免只改其中一处。

