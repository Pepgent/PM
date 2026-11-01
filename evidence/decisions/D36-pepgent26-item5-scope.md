# D36：Pepgent#26 结论⑤（切换 Lab）与详情页入口的交付切片（P0）——定稿

决策 issue：[Pepgent/PM#55](https://github.com/Pepgent/PM/issues/55)。发起：Coordination（DeskPepgent26Item5Scope）。本文件由议会 daemon 生成。

## 事实

初审材料：[pepgent26-item5-scope.md](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent26-item5-scope.md)。路径简称 `DEC/` = `Pepgent/PM` 的 `evidence/decisions/`。

- **起因：** [Pepgent#26 结论评论](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562796849) 裁定⑤：所选 Lab 由客户端持有 `selectedLabId: LabId | null`，切换时 `readCatalog(selectedLabId)` 重读目录，按新 `catalog.lab` 重读页面并重订阅 events，不写 Better Auth 会话；没有说在哪个切片交付。W-10 在 [issuecomment-6562844279](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562844279) 第 3 条（A）把⑤与“详情页的派生/对比/workspace/交回入口”一起放到 WEB-07，并写“如果管理层认为它们必须在 WEB-03 内完成，请在本 issue 指出，本席照做”。
- **正文没有写明归属（D）：**
  - WEB-03（`DEC/D8-mvp-scope.md:337`）：“投影：catalog、实验列表、实验详情（`RunGraph` 到 `ExperimentFlowFixture`，含时间轴、对比、派生导航、runner workspace）”；验收为“纯函数投影的单元测试”。
  - WEB-07（`DEC/D8-mvp-scope.md:341`）：“阶段 B 一次落地：……运行时不再引用 `LAB_SNAPSHOT`；W-10 按 D20-01/02 路径与 UI 数据绑定边界实施……”；验收为“构建好的 host 在浏览器中走完 13 个页面，数据都来自后端”。
  - D7-17（`DEC/D7-lab-backend.md:77`）：“壳层调用 `readCatalog`”；“UI 数据绑定、最少 props/条件渲染由 W-10 按 D20-02 完成”。D20-01（`DEC/D20-w10-path-boundary.md:31`）把 `lab-runtime.tsx` 列入 W-10 白名单。D12-03（`DEC/D12-lab-wire.md:35`）：“catalog.read{lab:LabId或null}（null 取当前用户首 Lab）”。
  - #26、#29 正文的“目标 / what”与 D8 两行一致。检索 D8、D20、D12 的“切换 Lab / 所选 Lab / selectLab / selectedLabId”（R）只命中 D12-04 的“所选 Lab 账户与 grants”。没有任何条文把⑤或详情页入口的接线点名给某个切片。
- **代码现状（R，W-10 分支只读）：** `_lab.tsx:59` 壳层 loader 已调用 `readCatalog(null)`；`lab-runtime.tsx:21,37,42` 的所选 Lab 仍是 `useState`，从 `snapshot.labs` 中挑选；`renderer-services.ts:48` 为 `createLabServices(LAB_SNAPSHOT)`。要让切换真正重读目录，运行时必须先改为从目录读取 Lab 列表，即 WEB-07 的“运行时不再引用 `LAB_SNAPSHOT`”。
- **范围：** 两种放法都不删除⑤或入口的任何行为。F08、F10、F13、F18、F23–F26 的 S2 部分在 WEB-07 合入后的统一 S2 验收（`DEC/D8-mvp-scope.md:193,368`）；没有 F 流程逐字涉及切换 Lab。风险只有一个：放在 WEB-07 时，#29 正文没有写它，WEB-03 关闭后若不在 #29 留下承接记录，这两项就没有承载。
- **表决前：** W-10 按现有做法，两项都不在 WEB-03 内接线。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D36-01 v1 | 结论⑤（切换 Lab）在 WEB-07 交付 | Pepgent/Pepgent#29（WEB-07）；W-10 白名单内 `apps/web/src/renderer/application/lab-runtime.tsx`、`apps/web/src/app/routes/_lab.tsx`、`apps/web/src/client/**` | - WEB-03（#26）只交付目录投影，不实现所选 Lab 的持有与重读；#26 的关闭不以⑤为条件。<br>- WEB-07（#29）在“运行时不再引用 `LAB_SNAPSHOT`”时一并实现⑤，按 [#26 结论⑤](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562796849)：客户端持有 `selectedLabId: LabId \| null`，首次为 `null`；切换时 `readCatalog(selectedLabId)` 重读目录，按新 `catalog.lab` 重读页面并重订阅 events；不写 Better Auth 会话。<br>- 本行通过后，AreaMgrPepgent 在 #29 评论写明承接本行并引用其链接，再送达 W-10；W-10 在 WEB-07 的 PR 正文列出⑤的落点。 | **得到：** ⑤随运行时切换一次落地，`lab-runtime.tsx` 只改一次；WEB-03 保持纯投影切片与其单元测试验收一致。<br>**代价：** ⑤推迟到 WEB-07；#29 需要一条承接评论，否则⑤在 #26 关闭后失去承载。<br>**落选：** WEB-03 交付——要在 WEB-03 内提前做 WEB-07 的部分运行时切换（Lab 列表改由目录提供），两个切片分两次改同一处，WEB-03 的纯函数单元测试验收也不覆盖这类接线。 | 治理 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD36）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D36-02 v2 | 详情页的回看、派生、对比、workspace、交回五个入口的页面接线在 WEB-07 交付 | Pepgent/Pepgent#29（WEB-07）；`apps/web/src/renderer/features/lab-experiment-detail/{controller,model,ui}/**`（ui 只限 D20-02 允许的行）；`apps/web/src/app/routes/_lab.experiments.$runId.index.tsx`、`apps/web/src/client/**`（D20-01 白名单） | - **数据投影留在 WEB-03：** 五个入口所需的数据投影（`derivedFrom` 派生来源、回看、对比、workspace、交回地址）属 WEB-03，W-10 已在 `feat/web-03-experiments` 完成（A）。<br>- **D35-01 的两部分可以在 WEB-03 交付：** 一是 `packages/ui` 中 `GanttTimeAxis` / `GanttNowChip` 的回看游标受控位置与拖动/点选回调属性，二是 model 内游标时刻 → `k` 的映射（纯函数）。两者都以 D35-01（[PM#54](https://github.com/Pepgent/PM/issues/54)）通过的版本为准。WEB-03 关闭时尚未交付的部分，随下一条的回看接线在 WEB-07 交付。<br>- **五个入口接到真实页面数据的接线在 WEB-07 实施，**做法按 [#26 结论 Q1](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562796849)，与详情页的数据切换（该页路由 loader 调用 `readPage('experiment')`）一并完成：<br>  - 回看：“回看到这一步”工具栏动作；D35-01 的游标位置与回调接到 `readPage('experiment', {at})`。`at=k` 时按 D12-05 读 `rewind`，`at=null` 时为实时。<br>  - 派生、对比、交回：工具栏动作与数据驱动的 `DialogSpecFixture`；调用处传入 `ActionDialog` 已有的 `onDone`。<br>  - workspace：卷清单放进节点侧栏现有的 `artifactsAndSignals` 行。<br>- **#26 的关闭条件：** 不以上述五项页面接线为条件。F10 S2（`DEC/D8-mvp-scope.md:129`）随 WEB-07 合入后的统一 S2 验收（`DEC/D8-mvp-scope.md:193`）执行。<br>- **承接记录：** 本行通过后，AreaMgrPepgent 在 #29 评论写明承接本行并引用其链接，逐项列出回看、派生、对比、workspace、交回五项接线，其中回看写明包括“回看到这一步”动作与 D35-01 游标回调到 `readPage('experiment', {at})`。随后送达 W-10，W-10 在 WEB-07 的 PR 正文逐项列出五项的落点。 | **得到：** 五个入口（含 F10 S2 的拖动回看）与详情页的数据切换同时接上，不出现入口已接线、页面仍渲染 fixture 的中间态。同一页面的同一类接线归同一个切片，与 D35-01 的属性与映射分工不冲突。相关流程的 S2 部分本来就在 WEB-07 后统一验收，范围不缩减。<br>**代价：** WEB-03 关闭时，详情页的五个入口仍不可点，拖动时间轴也不会重读页面；#29 需要一条列出五项的承接评论。<br>**落选：**<br>- WEB-03 交付：详情页路由此时没有 loader（`feat/web-03-experiments` 分支中 `_lab.experiments.$runId.index.tsx` 为 `component: () => null`），`detailFlow` 只对 R-022/R-021/R-018 返回 fixture。入口和 `at` 要接真实数据，就得在 WEB-03 内先做该页的数据切换，与 WEB-07 的“阶段 B 一次落地”重叠。<br>- 只把回看接线留在 WEB-03（v1 的实际结果）：同样要在 WEB-03 内先切换该页数据。不切换，则 `at=k` 的接线在任何 issue 中都没有承载，F10 S2 主路径不可达（ClaudeHigh 反例）。 | 治理 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD36v2）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

- D36-02 v2（DeskD36Revise，2026-11-01T19:47:14.659Z）：# D36-02 v2 修订理由（Coordination / DeskD36Revise）

采纳 ClaudeHigh（ClaudeHighD36）对 v1 的反例：v1 的 what 只列了四个入口，漏掉“回看”，F10 S2 的接线因此没有切片承载。

## 核对（只读）

- **D8:129：** F10 的 S2 写的是“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”，实现切片列为“STO-03/05/06、WEB-03”。与反例引文一致。
- **D8:337：** WEB-03 写“含时间轴、对比、派生导航、runner workspace”，验收为纯函数投影的单元测试。**D8:341：** WEB-07 写“阶段 B 一次落地……运行时不再引用 `LAB_SNAPSHOT`”，验收为 host 在浏览器中走完 13 个页面，数据都来自后端。与反例引文一致。
- **#26 Q1（[issuecomment-6562604645](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562604645)）：** 列出的入口是“回看、对比、派生导航、runner workspace 和交回”，工具栏动作中含“‘回看到这一步’”。Q3 写明在拖动之前“用‘回看到这一步’动作提供 `at=k`”。与反例引文一致。
- **分支代码（`feat/web-03-experiments`，gh api 按 ref 读取）：** `_lab.experiments.$runId.index.tsx` 为 `createFileRoute('/_lab/experiments/$runId/')({ component: () => null })`；`experiment-detail-view-model.ts:107` 的 `detailFlow` 只对 R-022/R-021/R-018 返回 fixture。与反例一致。

## 改动

- **what：** 加入“回看”，入口变为五个。
- **how：**
  - 回看接线写明两项：“回看到这一步”动作，以及 D35-01 的游标位置与回调接到 `readPage('experiment', {at})`。两者随详情页的数据切换在 WEB-07 交付。
  - D35-01 的 `packages/ui` 属性与 model 内“时刻 → `k`”的映射可以在 WEB-03 交付；WEB-03 关闭时未交付的部分随回看接线在 WEB-07 交付。
  - #26 的关闭不以五项页面接线为条件。
  - #29 的承接评论逐项列出五项。
- **where：** 加入详情页路由 `_lab.experiments.$runId.index.tsx` 与 `apps/web/src/client/**`，两者都在 D20-01 的 W-10 白名单内。
- **tradeoff：** 落选方案中加入“只把回看留在 WEB-03”。

D35-01 尚未定案（PM#54 当前有未清零反例），本行只引用它的两部分分工，具体内容以 D35-01 通过的版本为准。D36-01 不变。


## 原票

各席原票见 `votes/D36-Coordination.md`、`votes/D36-ClaudeHigh.md`、`votes/D36-Argon.md`、`votes/D36-LeadMentor.md`、`votes/D36-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。