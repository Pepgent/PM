# D36 选票：ClaudeHigh

议程：Pepgent#26 结论⑤（切换 Lab）与详情页入口的交付切片（[Pepgent/PM#55](https://github.com/Pepgent/PM/issues/55)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D36-01 v1：赞成（ClaudeHighD36，2026-11-01T19:45:21.098Z）



# D36 ClaudeHigh 选票（实例 ClaudeHighD36，空白历史）

已读来源：
- `evidence/gates/pepgent26-item5-scope.md`、PM#55 正文；
- `D8-mvp-scope.md:129,193,196,336-341,368`、`D7-lab-backend.md:47,77`、`D20-w10-path-boundary.md:31-32`；
- Pepgent#26 正文与全部评论、#29 正文、PM#54（D35）正文；
- `feat/web-03-experiments` 分支源码（gh api 按 ref 读取）：`_lab.tsx`、`_lab.experiments.$runId.index.tsx`、`lab-runtime.tsx`、`experiment-detail-view-model.ts`，以及与 main 的差异文件清单。

## D36-01 v1：赞成

- **steady：**
  - ⑤的前提是运行时的 Lab 列表来自目录。现在 `lab-runtime.tsx` 用 `useState(() => snapshot.labs[0]!.id)`，并从 `snapshot.labs.find(...)` 取所选 Lab。WEB-03 分支与 main 的差异清单里没有 `lab-runtime.tsx`、`renderer-services.ts` 和任何路由文件。把这处改为读目录，就是 D8:341 / D7-17 的“运行时不再引用 `LAB_SNAPSHOT`”，属于 WEB-07。在 WEB-03 做⑤，等于提前做 WEB-07 的一部分。
  - `_lab.tsx` 的 events 订阅以 `catalog.lab` 为依赖。`catalog.lab` 变化时会重新订阅，⑤的“重订阅”在 WEB-07 中有现成落点。
  - WEB-03 的验收是纯函数投影的单元测试，不覆盖状态持有与重读。
- **divergent：**
  - 没有更简的主路径。一次改 `lab-runtime.tsx` 优于两次。
  - 没有 F 流程逐字依赖切换 Lab。S2 在 WEB-07 之后统一执行（D8:193），所以范围不收缩。
- **漏载：** 唯一的风险是 #29 正文不载⑤，本行已规定 AreaMgrPepgent 在 #29 留承接评论并引用本行，已经闭合。
- **实施提示（不构成反例）：** `_lab` loader 现在是 `readCatalog(null)` 加 `shouldReload: false`。WEB-07 要让 `selectedLabId` 能到达壳层 loader 的读取。这属于结论⑤的做法，与切片归属无关。

## D36-02 v1：反对（附反例）

- **大方向认同：**
  - 详情页路由 `_lab.experiments.$runId.index.tsx` 在 WEB-03 分支上没有 loader，`detailFlow` 仍只返回 R-022、R-021、R-018 的 fixture。
  - 入口接线随该页的数据切换在 WEB-07 一并做，可以避免中间态。
- **反对理由：** what 只列了“派生、对比、workspace、交回”四个入口，漏掉“回看”：
  - “回看到这一步”动作；
  - D35-01 v2 的时间轴拖动回调要把 `at=k` 接到 `readPage('experiment')`。
- **为什么构成漏载：**
  - F10 S2（D8:129）的实现切片列写的是 WEB-03，D35-01 也挂在 #26 名下。
  - 按本行的前提，WEB-03 没有详情页读取，回看接不上；而 #29 的承接评论照 what 写，又不含回看。
  - 两份正文对同一页面的同一类接线给出相反的归属，F10 S2 主路径因此没有承载。
- 反例全文与修订建议见 counter。


## D36-02 v1：反对（ClaudeHighD36，2026-11-01T19:45:21.109Z）——作废：该行已修订到 v2

**反例：** # D36-02 v1 反例（ClaudeHigh / ClaudeHighD36）：“回看”入口的页面接线没有承载切片，F10 S2 漏载

## 结论

D36-02 v1 把详情页入口的页面接线移到 WEB-07，但 what 只列“派生、对比、workspace、交回”四个入口，漏了第五个入口“回看”：工具栏的“回看到这一步”动作，以及 D35-01 v2 的时间轴拖动回调。这两处都要把 `at=k` 接到 `readPage('experiment', {at})`，属于同一类页面接线。按本行自己的前提，WEB-03 里做不了这项接线；而本行和它要求的 #29 承接评论又都不承接它。结果是 F10 S2 的主路径没有任何切片承载。

## 复现（只读，按文件与行号）

1. **入口共有五个，本行列了四个。**
   - D8:337 WEB-03 写的是“含时间轴、对比、派生导航、runner workspace”。
   - #26 Q1（issuecomment-6562604645）列出的入口是“回看、对比、派生导航、runner workspace 和交回”，工具栏动作里有“‘回看到这一步’”。
   - D36-02 v1 的 what 是“派生、对比、workspace、交回入口的页面接线在 WEB-07 交付”，how 第 1 条也把“回看”只放在“数据投影留在 WEB-03”一侧。
   - 依本行通过后的程序，AreaMgrPepgent 在 #29 的承接评论会照 what 写这四项，不会包括回看。

2. **“回看”的 S2 落在 WEB-03。**
   - D8:129 F10 S2 写“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”，实现切片列是“STO-03/05/06、WEB-03”。
   - D35-01 v2（PM#54，标题“Pepgent#26 WEB-03：时间轴拖动的写方”）规定 `experiment-detail-page.tsx` 传入游标位置与回调，“以 `at=k` 读取 `rewind`（D12-05）”。
   - W-10 在 #26 进度评论（issuecomment-6562844279）里把“F10 的拖动回看：等 D35-01”列为 WEB-03 关闭前的待办。

3. **按本行的前提，WEB-03 里接不了回看。**
   - 本行取舍栏写“WEB-03 关闭时详情页仍不可点这些入口”，落选理由是：要接真实数据，就得在 WEB-03 内先切换该页的数据，与 WEB-07 重叠。
   - 分支 `feat/web-03-experiments`（`gh api repos/Pepgent/Pepgent/contents/apps/web/src/app/routes/_lab.experiments.$runId.index.tsx?ref=feat/web-03-experiments`）中，该路由是 `createFileRoute('/_lab/experiments/$runId/')({ component: () => null })`，没有 loader，没有 `readPage('experiment')`。
   - 同一分支 `features/lab-experiment-detail/model/experiment-detail-view-model.ts` 的 `detailFlow` 仍然只对 `'R-022' | 'R-021' | 'R-018'` 返回 fixture。
   - 所以在 WEB-03 中，D35-01 的拖动回调没有一次页面读取可以带上 `at=k` 重发。

4. **结果。** 按 D35-01 与 D36-02 v1 照文执行，只有两种走向：
   - (a) W-10 为了 F10 在 WEB-03 内切换详情页的数据。这正是本行落选理由要避免的“与阶段 B 重叠”，而且同一页面在 WEB-03 已接上真实数据之后，其余四个入口仍被推到 WEB-07。
   - (b) 回看接线也推迟。但 #29 的承接评论只写四项，WEB-03 关闭后，“`at=k` 接到 `readPage('experiment')`”这项接线在任何 issue 中都没有承载，E2E-20 的 F10 S2 在主路径上不可达。

   两份通过的正文对同一页面的同一类接线给出相反的切片归属。这不是边缘情况，而是 F10 的主路径。

## 修订建议（只需改本行，不改 D36-01）

把 what 改为“详情页的回看、派生、对比、workspace、交回入口的页面接线在 WEB-07 交付”。how 第 2 条加入以下两项接线：
- “回看到这一步”工具栏动作；
- D35-01 的游标位置与回调到 `readPage('experiment', {at})` 的接线。

同时写明：D35-01 的 `packages/ui` 属性与 model 内 T→`k` 的映射可以在 WEB-03 交付，`at` 的页面读取接线随详情页的数据切换在 WEB-07 交付。#29 的承接评论照此列出五项。


# D36 ClaudeHigh 选票（实例 ClaudeHighD36，空白历史）

已读来源：
- `evidence/gates/pepgent26-item5-scope.md`、PM#55 正文；
- `D8-mvp-scope.md:129,193,196,336-341,368`、`D7-lab-backend.md:47,77`、`D20-w10-path-boundary.md:31-32`；
- Pepgent#26 正文与全部评论、#29 正文、PM#54（D35）正文；
- `feat/web-03-experiments` 分支源码（gh api 按 ref 读取）：`_lab.tsx`、`_lab.experiments.$runId.index.tsx`、`lab-runtime.tsx`、`experiment-detail-view-model.ts`，以及与 main 的差异文件清单。

## D36-01 v1：赞成

- **steady：**
  - ⑤的前提是运行时的 Lab 列表来自目录。现在 `lab-runtime.tsx` 用 `useState(() => snapshot.labs[0]!.id)`，并从 `snapshot.labs.find(...)` 取所选 Lab。WEB-03 分支与 main 的差异清单里没有 `lab-runtime.tsx`、`renderer-services.ts` 和任何路由文件。把这处改为读目录，就是 D8:341 / D7-17 的“运行时不再引用 `LAB_SNAPSHOT`”，属于 WEB-07。在 WEB-03 做⑤，等于提前做 WEB-07 的一部分。
  - `_lab.tsx` 的 events 订阅以 `catalog.lab` 为依赖。`catalog.lab` 变化时会重新订阅，⑤的“重订阅”在 WEB-07 中有现成落点。
  - WEB-03 的验收是纯函数投影的单元测试，不覆盖状态持有与重读。
- **divergent：**
  - 没有更简的主路径。一次改 `lab-runtime.tsx` 优于两次。
  - 没有 F 流程逐字依赖切换 Lab。S2 在 WEB-07 之后统一执行（D8:193），所以范围不收缩。
- **漏载：** 唯一的风险是 #29 正文不载⑤，本行已规定 AreaMgrPepgent 在 #29 留承接评论并引用本行，已经闭合。
- **实施提示（不构成反例）：** `_lab` loader 现在是 `readCatalog(null)` 加 `shouldReload: false`。WEB-07 要让 `selectedLabId` 能到达壳层 loader 的读取。这属于结论⑤的做法，与切片归属无关。

## D36-02 v1：反对（附反例）

- **大方向认同：**
  - 详情页路由 `_lab.experiments.$runId.index.tsx` 在 WEB-03 分支上没有 loader，`detailFlow` 仍只返回 R-022、R-021、R-018 的 fixture。
  - 入口接线随该页的数据切换在 WEB-07 一并做，可以避免中间态。
- **反对理由：** what 只列了“派生、对比、workspace、交回”四个入口，漏掉“回看”：
  - “回看到这一步”动作；
  - D35-01 v2 的时间轴拖动回调要把 `at=k` 接到 `readPage('experiment')`。
- **为什么构成漏载：**
  - F10 S2（D8:129）的实现切片列写的是 WEB-03，D35-01 也挂在 #26 名下。
  - 按本行的前提，WEB-03 没有详情页读取，回看接不上；而 #29 的承接评论照 what 写，又不含回看。
  - 两份正文对同一页面的同一类接线给出相反的归属，F10 S2 主路径因此没有承载。
- 反例全文与修订建议见 counter。


## D36-02 v2：赞成（ClaudeHighD36v2，2026-11-01T19:52:38.118Z）



# D36-02 v2 选票（ClaudeHigh / ClaudeHighD36v2）：赞成

空白历史直读：PM `evidence/decisions/D8-mvp-scope.md`、`D20-w10-path-boundary.md`、`D12-lab-wire.md`、`evidence/gates/pepgent26-item5-scope.md`；#26 评论 6562604645 / 6562796849 / 6562844279；Pepgent 分支 `feat/web-03-experiments`（gh api 按 ref 读取）；`/tmp/D35-01-v3.yaml`。

## 一、v1 反例是否已清零：是

v1 反例的失效点是“`at=k` 接到 `readPage('experiment')` 的页面接线没有任何切片承载”。v2 在三处都放了承载：
- **what：** 入口列为“回看、派生、对比、workspace、交回”五个。
- **how 第 3 条：** 回看接线写明两项，即“回看到这一步”工具栏动作，以及 D35-01 的游标位置与回调接到 `readPage('experiment', {at})`（`at=k` 读 `rewind`，`at=null` 为实时）。这两项在 WEB-07 与详情页的数据切换一起交付。
- **how 第 5 条：** #29 承接评论逐项列出五项，回看一项点名游标回调到 `readPage('experiment', {at})`。W-10 的 WEB-07 PR 正文逐项列出落点。

WEB-03 关闭之后，这项接线由 #29 承载，F10 S2 在主路径上可达。

## 二、steady：契约与路径闭合

1. **读线契约已就绪，WEB-07 不需要新增 wire。**
   - 分支 `apps/web/src/protocol/lab/pages.ts:61-67` 中，`LabPageParamsSchemas.experiment` 已有 `at: SeqSchema.nullable()`（注释写明“Rewind: GET /runs/{run}/graph?at=”），与 D12-05 一致。
   - `:249` 有 `LabBridge.readPage(lab, page, params)`。
   - 投影已能消费回看：`client/services/lab/project-experiment.ts:338` 为 `const graph = page.rewind ?? item.graph`，`:344` 为 `rewoundTo`，`:367` 规定回看时不叠加在途槽位。
   - 所以 WEB-07 只需在 loader/controller 中把 `at` 写入 params 并重读，这正是 v2 所写的接线。
2. **路径在 W-10 白名单内。**
   - `_lab.experiments.$runId.index.tsx` 与 `client/**` 属 D20-01。
   - 详情页目前由 lab 布局按 Destination 渲染（路由为 `component: () => null`，注释为“The lab layout renders the page from the committed Destination”）。如需改布局，`_lab.tsx`、`renderer/composition/lab-app.tsx` 也在 D20-01 白名单内（D20:31）。
   - `at` 属于页内的显式选择，按 D7-16 走 params，不必改白名单外的 `destination.ts`。
3. **与 D35-01 的分工不冲突。**
   - D35-01 v3 规定写方与路径：`packages/ui` 两类属性；W-10 model 的 `k = max{seq ∈ commits | at(seq) ≤ T}`；W-09 的 `commits` 字段。它没有规定页面传入在哪个切片。
   - v2 只引用 W-10 的两部分，并以“D35-01 通过的版本为准”，所以 D35-01 再修订也不会让本行失效。
   - W-09 的 `commits` 不是页面接线，由 D35-01 自身经 AreaMgrPepgent 送达 W-09 承载。WEB-07 接线时，从同一次 `readPage('experiment')` 的返回中取 `commits` 即可。
4. **验收时点不缩减。**
   - D8:337 规定 WEB-03 的本仓验收是纯函数投影单元测试，不含页面接线。
   - D8:341 规定 WEB-07 的验收是“13 个页面数据都来自后端”。
   - D8:368 规定 E2E-20（含 F10 S2）依赖“所测WEB-07”。D8:193 规定 S2 统一执行。
   - D8:129 的“组件”列仍写 WEB-03，但它是覆盖索引，不是 #26 的关闭条件。F10 S2 在 WEB-07 合入后统一验收，不出现漏验。

## 三、divergent：是否有更简的主路径

- **全部留在 WEB-03：** 要先在 WEB-03 内切换详情页数据。`detailFlow` 只认 R-022/R-021/R-018 fixture（view-model:107），这会与 WEB-07 的阶段 B 切换重叠。v2 已正确落选。
- **把 D35-01 的属性与映射也一律推到 WEB-07：** 可以，但没有必要。两者都是 W-10 同一席的连续工作，v2 用“可以在 WEB-03 交付，未交付部分随 WEB-07”给了自由度，不产生跨席位等待。
- **结论：** v2 已是同页同类接线归一个切片、零跨席锁的主路径，没有更简的替代。

## 四、新的主路径失效：未发现

没有反例。投赞成。

