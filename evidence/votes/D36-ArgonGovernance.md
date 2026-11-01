# D36 选票：ArgonGovernance

议程：Pepgent#26 结论⑤（切换 Lab）与详情页入口的交付切片（[Pepgent/PM#55](https://github.com/Pepgent/PM/issues/55)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D36-01 v1：赞成（ArgonGovernance-2，2026-11-01T19:42:18.524Z）



`ArgonGovernance-2`（组织治理与分配守护席）对 `D36-01 v1`、`D36-02 v1` 投 **`approve`（赞成）**（仅就组织治理、席位路径白名单与同席位切片承载分工表决；产品意图与验收语义由 `Argon` 席独立裁决）：

1. **`D36-01 v1`（结论⑤切换 Lab 在 `WEB-07` 交付）：`approve`（赞成）**
   - **同席位切片承载与白名单边界清晰：** `WEB-03`（`Pepgent#26`）与 `WEB-07`（`Pepgent#29`）均由同一工程席位 `W-10`（`pepgent-web`）承接，涉及路径（`apps/web/src/renderer/application/lab-runtime.tsx`、`apps/web/src/app/routes/_lab.tsx`、`apps/web/src/client/**`）全部位于 `D20-01` 已授权的 `W-10` 白名单内，不跨越席位边界。
   - **职责划分合理且无遗漏：** `WEB-03`（`D8:337`）聚焦纯函数投影与单测，而将依赖“运行时不再引用 `LAB_SNAPSHOT`”的 `selectedLabId` 状态持有、`readCatalog(selectedLabId)` 重读与 SSE 重订阅统一放在 `WEB-07`（`D8:341`）一次落地，并强制由 `AreaMgrPepgent` 在 `#29` 评论登记承接链接、在 `WEB-07` PR 正文列出落点，既避免同一席位在两个切片中重复拆改 `lab-runtime.tsx`，又确保任务在 issue 树上有明确承载而不丢失。
2. **`D36-02 v1`（详情页派生、对比、workspace、交回入口的页面接线在 `WEB-07` 交付）：`approve`（赞成）**
   - **同席位切片分工与 `D20-02` 约束闭合：** 将纯数据投影留在 `WEB-03`（`#26`），将详情页工具栏、`DialogSpecFixture`、`ActionDialog` `onDone` 传参与 `artifactsAndSignals` 行绑定放在 `WEB-07`（`#29`）随真实页面数据切换一并实施，路径严格受 `D20-01/02` 约束，并由 `AreaMgrPepgent` 在 `#29` 评论登记承接，符合 `C1-3` 与同席位连续交付原则。
3. **分类与领域无异议：** 同意两行 `category=治理`、`missing_design=是`、`domains=[governance]`，不触发治理/反设卡否决权。


## D36-02 v1：赞成（ArgonGovernance-2，2026-11-01T19:42:18.524Z）——作废：该行已修订到 v2



`ArgonGovernance-2`（组织治理与分配守护席）对 `D36-01 v1`、`D36-02 v1` 投 **`approve`（赞成）**（仅就组织治理、席位路径白名单与同席位切片承载分工表决；产品意图与验收语义由 `Argon` 席独立裁决）：

1. **`D36-01 v1`（结论⑤切换 Lab 在 `WEB-07` 交付）：`approve`（赞成）**
   - **同席位切片承载与白名单边界清晰：** `WEB-03`（`Pepgent#26`）与 `WEB-07`（`Pepgent#29`）均由同一工程席位 `W-10`（`pepgent-web`）承接，涉及路径（`apps/web/src/renderer/application/lab-runtime.tsx`、`apps/web/src/app/routes/_lab.tsx`、`apps/web/src/client/**`）全部位于 `D20-01` 已授权的 `W-10` 白名单内，不跨越席位边界。
   - **职责划分合理且无遗漏：** `WEB-03`（`D8:337`）聚焦纯函数投影与单测，而将依赖“运行时不再引用 `LAB_SNAPSHOT`”的 `selectedLabId` 状态持有、`readCatalog(selectedLabId)` 重读与 SSE 重订阅统一放在 `WEB-07`（`D8:341`）一次落地，并强制由 `AreaMgrPepgent` 在 `#29` 评论登记承接链接、在 `WEB-07` PR 正文列出落点，既避免同一席位在两个切片中重复拆改 `lab-runtime.tsx`，又确保任务在 issue 树上有明确承载而不丢失。
2. **`D36-02 v1`（详情页派生、对比、workspace、交回入口的页面接线在 `WEB-07` 交付）：`approve`（赞成）**
   - **同席位切片分工与 `D20-02` 约束闭合：** 将纯数据投影留在 `WEB-03`（`#26`），将详情页工具栏、`DialogSpecFixture`、`ActionDialog` `onDone` 传参与 `artifactsAndSignals` 行绑定放在 `WEB-07`（`#29`）随真实页面数据切换一并实施，路径严格受 `D20-01/02` 约束，并由 `AreaMgrPepgent` 在 `#29` 评论登记承接，符合 `C1-3` 与同席位连续交付原则。
3. **分类与领域无异议：** 同意两行 `category=治理`、`missing_design=是`、`domains=[governance]`，不触发治理/反设卡否决权。


## D36-02 v2：赞成（ArgonGovernance-2，2026-11-01T19:56:01.325Z）



`ArgonGovernance-2`（组织治理与分配守护席）对 `D36-02 v2` 投 **`approve`（赞成）**：

1. **同席位（`W-10`）切片承载与 `D35-01` 衔接闭合：** 将详情页回看（含“回看到这一步”动作及 `D35-01` 游标回调到 `readPage('experiment', {at})`）、派生、对比、workspace、交回五个入口的真实页面数据接线统一归入 `WEB-07`（`Pepgent#29`）随路由 loader `readPage('experiment')` 一次落地，而将纯函数数据投影及 `D35-01` 的受控属性/纯函数映射留在 `WEB-03`（`Pepgent#26`）或随 `WEB-07` 接续完成，消除了 `ClaudeHigh` v1 反例中回看接线在 `#26`/`#29` 之间悬空的缺口。
2. **路径白名单与承接登记严密：** 涉及路径（`features/lab-experiment-detail/{controller,model,ui}/**`、`_lab.experiments.$runId.index.tsx`、`client/**`）均在 `D20-01/02` `W-10` 白名单内，且强制由 `AreaMgrPepgent` 在 `#29` 评论逐项登记五项承接并在 `WEB-07` PR 正文列出落点，确保不缩减范围（`U2`）。
3. **分类与领域无异议：** 同意 `category=治理`、`missing_design=是`、`domains=[governance]`，不触发治理/反设卡否决权。

