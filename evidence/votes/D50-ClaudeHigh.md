# D50 选票：ClaudeHigh

议程：W-10 已合入的 10 个 vitest 测试与 lab-home barrel 正式纳入 D20-01 白名单（PR#75、PR#88 事后路径纠偏）（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D50-01 v1：赞成（ClaudeHighD50，2026-11-02T00:28:04.106Z）



# D50 ClaudeHigh 席选票（ClaudeHighD50，空白历史；steady + divergent）

核对对象：PM#69 当前正文（D50-01 v1、D50-02 v1）；pepgent-soroi `AGENTS.md`（D1-12 P2 定义 `:26`、C2-4 `:64`、C4-3 `:82`）；PM `evidence/decisions/D20-w10-path-boundary.md:31`、`D16-phaseB-review-restore.md:33`、`D39-pr75-replay-at-d35-01.md:48-49,54`；`evidence/gates/w10-whitelist-gate-b.md`；PR#75（26 个文件）与 PR#88（141 个文件）的文件清单，以及 11 个域外文件的 diff 或 import。

## D50-01 v1：赞成

**steady（保守边界）**
1. 事实成立。D20-01 与 D16-09 的 W-10 一行，对 vitest 的授权只有 `apps/web/tests/vitest/lab-*-view-model.test.ts`，并把 `lab-return-path.test.ts` 列为不在范围内，所以这是封闭清单。D39-01 v3 修订说明 `:48` 已确认 `lab-replay-at.test.ts` 不匹配。PR#75 的 diff/21 与 PR#88 的 diff/106、107、110、117、119、121、123、124、125 都是新增文件，文件名与议程所列 10 个一一对应。PR#75 其余的 vitest 文件（`lab-wire-*-view-model.test.ts`、`lab-experiment-detail-view-model.test.ts`）都匹配既有 glob，所以议程没有漏列。
2. “只测 W-10 白名单内的代码”这一用途限定成立。我逐个核对了 import：被测模块全部位于 `apps/web/src/client/services/lab/**`、`features/lab-experiment-detail/model/**` 或 `features/lab-flow-editor/model/**`，都在 W-10 白名单内。测试对 `src/protocol/lab/**`（W-09 唯一写方）和 `renderer/application/contracts/lab-localizer.js` 只做只读 import，用作类型或 fixture 构造，不写入。这与 D16-03④“W-10 只读消费 protocol/lab”一致，不构成越界。
3. 与 D39 不冲突。D39-01 v3 只规定 `lab-replay-at.test.ts`“不动”（`:49,54`），没有禁止为它指定归属。本行只补写方，不要求改动该文件。
4. 没有违反 C4-3 不可变边界。how 已写明只改 PM 活动文档 D20、D16，不改 PM#25、PM#30 的正文和 daemon 数据，满足闸门 B 的修正要求 B。
5. 不存在路径互斥冲突。这 10 个文件只有 W-10 一个写方，W-09 的白名单（D16-09）不含 `tests/vitest/**`。
6. P2 与 governance 领域判定成立（`AGENTS.md:26`；闸门 B (3)(4)）。

**divergent（发散替代）**
- 我考虑过把授权改成“`tests/vitest/lab-*.test.ts` 减去排除项”的反向写法，可以免去今后每加一个测试就开一次 P2 议程。但 WEB-01..07 已全部关闭，后续的 E2E-20/21 落在已授权的 `tests/e2e-lab/**`，没有已知的新单测需要。按“设计阶段只写主路径”，逐名列入最简单，不必为假想的未来测试预先放宽。落选理由 (b)、(c) 成立：搬迁或删除测试只是为了迁就路径，会损失覆盖。
- 没有找到主路径失效的反例。

## D50-02 v1：赞成

**steady（保守边界）**
1. 事实成立。PR#88 diff/81 只删了 `chartSeriesPaths` 这一行 re-export（+0/-1），同一 PR 的 diff/82 改了 `model/home-view-model.ts`。model 删掉某个导出后，barrel 如果还引用它，`apps/web` 就会编译失败，所以 barrel 必须和 model 在同一 PR 中修改。D20-01 只覆盖 `controller/**`、`model/**`、`ui/**`，feature 根部的 `index.ts` 不在其中。D45 的 index 授权只针对 `packages/ui/src/lab/index.ts`。因此确实存在“model 可改、barrel 无人可写”的死锁，本行消除的正是它。
2. 用途限定足够窄：只改对 `./model/**`、`./ui/**` 的 re-export 列表，且跟随同一 PR 中的导出增删和改名；不加逻辑，不加新的导出来源。`ui/**` 的导出变化本身仍受 D20-02 约束（不改组件结构），所以 barrel 授权不会绕开视觉层边界。
3. 与 U59 保护（D20 Q1）不冲突。这次只删去已不存在的导出，没有回滚 U59 已合入的合法成果。
4. C4-3 边界、P2 优先级、governance 领域的判定与 D50-01 相同，都成立。

**divergent（发散替代）**
- 我考虑过另一种做法：在 model 中保留 `chartSeriesPaths`，从而不必改 barrel。这等于为了迁就路径保留死导出，比授权 1 个文件更差。另一种是一次性授权全部 13 个 `features/lab-*/index.ts`；在没有已知需要的前提下属于预设边缘情况，落选理由 (b) 成立。
- 没有找到主路径失效的反例。

## 非阻断附注

D50-01 how 中的用途限定“只测 W-10 白名单内的代码”，秘书写入 D20、D16 时可以补半句“可只读 import 其他席位的类型与 schema 作 fixture”，以免事后检查把 `protocol/lab/**` 的 import 误判为越界。这不影响本票。


## D50-02 v1：赞成（ClaudeHighD50，2026-11-02T00:28:04.106Z）



# D50 ClaudeHigh 席选票（ClaudeHighD50，空白历史；steady + divergent）

核对对象：PM#69 当前正文（D50-01 v1、D50-02 v1）；pepgent-soroi `AGENTS.md`（D1-12 P2 定义 `:26`、C2-4 `:64`、C4-3 `:82`）；PM `evidence/decisions/D20-w10-path-boundary.md:31`、`D16-phaseB-review-restore.md:33`、`D39-pr75-replay-at-d35-01.md:48-49,54`；`evidence/gates/w10-whitelist-gate-b.md`；PR#75（26 个文件）与 PR#88（141 个文件）的文件清单，以及 11 个域外文件的 diff 或 import。

## D50-01 v1：赞成

**steady（保守边界）**
1. 事实成立。D20-01 与 D16-09 的 W-10 一行，对 vitest 的授权只有 `apps/web/tests/vitest/lab-*-view-model.test.ts`，并把 `lab-return-path.test.ts` 列为不在范围内，所以这是封闭清单。D39-01 v3 修订说明 `:48` 已确认 `lab-replay-at.test.ts` 不匹配。PR#75 的 diff/21 与 PR#88 的 diff/106、107、110、117、119、121、123、124、125 都是新增文件，文件名与议程所列 10 个一一对应。PR#75 其余的 vitest 文件（`lab-wire-*-view-model.test.ts`、`lab-experiment-detail-view-model.test.ts`）都匹配既有 glob，所以议程没有漏列。
2. “只测 W-10 白名单内的代码”这一用途限定成立。我逐个核对了 import：被测模块全部位于 `apps/web/src/client/services/lab/**`、`features/lab-experiment-detail/model/**` 或 `features/lab-flow-editor/model/**`，都在 W-10 白名单内。测试对 `src/protocol/lab/**`（W-09 唯一写方）和 `renderer/application/contracts/lab-localizer.js` 只做只读 import，用作类型或 fixture 构造，不写入。这与 D16-03④“W-10 只读消费 protocol/lab”一致，不构成越界。
3. 与 D39 不冲突。D39-01 v3 只规定 `lab-replay-at.test.ts`“不动”（`:49,54`），没有禁止为它指定归属。本行只补写方，不要求改动该文件。
4. 没有违反 C4-3 不可变边界。how 已写明只改 PM 活动文档 D20、D16，不改 PM#25、PM#30 的正文和 daemon 数据，满足闸门 B 的修正要求 B。
5. 不存在路径互斥冲突。这 10 个文件只有 W-10 一个写方，W-09 的白名单（D16-09）不含 `tests/vitest/**`。
6. P2 与 governance 领域判定成立（`AGENTS.md:26`；闸门 B (3)(4)）。

**divergent（发散替代）**
- 我考虑过把授权改成“`tests/vitest/lab-*.test.ts` 减去排除项”的反向写法，可以免去今后每加一个测试就开一次 P2 议程。但 WEB-01..07 已全部关闭，后续的 E2E-20/21 落在已授权的 `tests/e2e-lab/**`，没有已知的新单测需要。按“设计阶段只写主路径”，逐名列入最简单，不必为假想的未来测试预先放宽。落选理由 (b)、(c) 成立：搬迁或删除测试只是为了迁就路径，会损失覆盖。
- 没有找到主路径失效的反例。

## D50-02 v1：赞成

**steady（保守边界）**
1. 事实成立。PR#88 diff/81 只删了 `chartSeriesPaths` 这一行 re-export（+0/-1），同一 PR 的 diff/82 改了 `model/home-view-model.ts`。model 删掉某个导出后，barrel 如果还引用它，`apps/web` 就会编译失败，所以 barrel 必须和 model 在同一 PR 中修改。D20-01 只覆盖 `controller/**`、`model/**`、`ui/**`，feature 根部的 `index.ts` 不在其中。D45 的 index 授权只针对 `packages/ui/src/lab/index.ts`。因此确实存在“model 可改、barrel 无人可写”的死锁，本行消除的正是它。
2. 用途限定足够窄：只改对 `./model/**`、`./ui/**` 的 re-export 列表，且跟随同一 PR 中的导出增删和改名；不加逻辑，不加新的导出来源。`ui/**` 的导出变化本身仍受 D20-02 约束（不改组件结构），所以 barrel 授权不会绕开视觉层边界。
3. 与 U59 保护（D20 Q1）不冲突。这次只删去已不存在的导出，没有回滚 U59 已合入的合法成果。
4. C4-3 边界、P2 优先级、governance 领域的判定与 D50-01 相同，都成立。

**divergent（发散替代）**
- 我考虑过另一种做法：在 model 中保留 `chartSeriesPaths`，从而不必改 barrel。这等于为了迁就路径保留死导出，比授权 1 个文件更差。另一种是一次性授权全部 13 个 `features/lab-*/index.ts`；在没有已知需要的前提下属于预设边缘情况，落选理由 (b) 成立。
- 没有找到主路径失效的反例。

## 非阻断附注

D50-01 how 中的用途限定“只测 W-10 白名单内的代码”，秘书写入 D20、D16 时可以补半句“可只读 import 其他席位的类型与 schema 作 fixture”，以免事后检查把 `protocol/lab/**` 的 import 误判为越界。这不影响本票。

