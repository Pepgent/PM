# 闸门 B 裁决：`D37-01 v2` 修订稿（`pepgent25-web05-d37v2-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent25-web05.md` §六、`/tmp/D37-01-v2.yaml`
- **关联议程与议题：** `D37`（[Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)）、[Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（`WEB-05`）、[Pepgent/Pepgent#27](https://github.com/Pepgent/Pepgent/issues/27)（`WEB-04`）、[Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（`WEB-07`）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **把关复核源头：** 已全量复核 `LEDGER.md:1-140`、`AGENTS.md:1-129`，并独立直读 `D20-w10-path-boundary.md:31-32`（`D20-01`、`D20-02`）、`D16-phaseB-review-restore.md:33,37`（`D16-09`、`D16-13`）与 `D36`（`LEDGER.md:79`）
- **判定时间：** `2026-11-01T20:39Z`

---

## 一、总局判定结论（严格限定于闸门 B 组织、路径白名单、切片承载与程序职责）

1. **闸门 B 判定：** **【`D37-01 v2` 在路径白名单、阶段门禁与切片承载上不越界，无需修改 `D16-09`/`D20` 白名单，不加 `domains: [governance]`（保持 4 席参投），无需另开新 issue】**。
2. **正交双闸门与表决程序边界（`AGENTS.md:27,60,123`）：**
   - 本席不替 `Argon` 裁决 §6.3 `A` 的产品原始意图与公开契约语义；
   - 待 `Argon` 闸门 A（`pepgent25-web05-d37v2-gate-a.md`）确认后，由 `DeskD37Revise` 用 `council revise` 发布 `D37-01 v2` 供 4 个资格席位重投；在 `D37-01 v2` 表决通过前，`W-10` 仍按 `D10-08` 暂停文件型交回及相关新增项，表决通过后由 `AreaMgrPepgent` 在 `#25`、`#27`、`#29` 登记承接并单向送达 `W-10`。

---

## 二、对 §6.3 `B` 问题的逐项判定

1. **`D20-01`/`D20-02` 路径白名单与 `discussions-page.tsx:572` 一处 `onClick`：** **完全在 `D20-01`/`D20-02` 内，无需改白名单、不加 `governance` 域。**
   - `features/lab-automation/{model,controller}/**`、`features/lab-experiment-detail/{model,controller}/**`、`features/lab-datasets/model/datasets-view-model.ts`、`features/lab-discussions/controller/**` 与 `apps/web/src/client/**` 均属 `D20-01` 明文授予 `W-10` 的路径。
   - `features/lab-discussions/ui/discussions-page.tsx:572` 已有的 `AttachIcon` 按钮补一处 `onClick={controller.attach}`，将 UI 按钮动作接到 controller 调用 `LabBridge.uploadArtifact`（即 `D12-13` 将 `D7` 原 `artifact.upload` 命令改走 HTTP 后的形态），不改 CSS、主题、类名、布局、视觉层级、组件结构及无关文案，并在 PR 正文逐行披露，完全属于 `D20-02` 允许的动作接线与“完成上述各项所需的最少 props”。
2. **`WEB-04`（`#27`）与 `WEB-07`（`#29`）切片承载与阶段门禁：** **不涉及阶段门禁变更，无需另开 issue。**
   - `#25`（`WEB-05`）、`#27`（`WEB-04`）、`#29`（`WEB-07`）同属 `W-10` 席位：数据集页详情 `chain` 显示 `ArtifactRef` 是纯 model 投影，归入 `WEB-04`（`#27`）并由纯函数投影单元测试验收（符合 `D8:338` 与 `D16-13`）；实验详情页交回与讨论页上传接线需在运行时脱离 `LAB_SNAPSHOT` 后生效，归入 `WEB-07`（`#29`）承载（与 `D36-02 v2` 先例一致）。
