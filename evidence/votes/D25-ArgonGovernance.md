# D25 选票：ArgonGovernance

议程：Pepgent#17 BLOCKED-1：routeTree.gen.ts 由改路由的席位在同一 PR 中重新生成并提交（[PM#42](https://github.com/Pepgent/PM/issues/42)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D25-01 v1：赞成（ArgonGovernance-2，2026-11-01T17:20:59.868Z）


**分类意见：** 治理

### D25-01 v1：赞成（approve）

- **分类确认：** `治理`（涉及 `D16-09` 与 `D20-01` 席位路径白名单与生成产物写入规则，属组织治理与派工分配领域 `governance`）。
- **治理审视与理由：**
  1. **事前正交双闸门程序合规（`AGENTS.md` C2-2.2、`U96`）：** W-09 已先按治理要求从分支剔除未授权的 `apps/web/src/app/routeTree.gen.ts`，在真实暴露本仓 `typecheck` 诊断后回 [Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17) 正式上报 `BLOCKED-1`，经闸门 A（`pepgent-17-gate-a.md`）与闸门 B（`pepgent-17-gate-b.md`）正交初审后进入 `P0` 表决，未发生“先越权合入、事后追认或回退”。
  2. **兼顾四级隔离与反设卡推进（`AGENTS.md` C1-3、C3-4，`U30–U32`、`U83–U84`）：** `routeTree.gen.ts` 系 TanStack Start 工具链根据文件路由自动生成的派生注册表（F5–F7）。采用与 `D16-09` lockfile 规则同构的“谁在自身白名单内增删改文件路由（W-09 对应 `apps/web/src/app/routes/api/lab/**`，W-10 对应 `_lab.tsx` 与 `_lab.*.tsx`），谁在同一 PR 中用既有工具链重新生成并提交，并行冲突时 rebase 后重新生成”，既保证 W-09 与 W-10 各自独立分支/PR 的本仓 `typecheck` 自洽，又消除跨席位代生成等待锁（排除处置 d）及后续切片（`LAB-07b`、`LAB-11a`、`LAB-12` 与 `W-10` 路由变更）的重复 `BLOCKED` 设卡（优于 RT-2、RT-3），且不改变仓库既有工具链约定（优于 RT-4）。
  3. **手写代码互斥边界不放松：** 条款明确限定该文件只由工具链生成、禁止手改，且不授权触碰对方白名单内的任何手写文件，符合 `D16-09` 与 `D20-01` 的互斥隔离原则。

