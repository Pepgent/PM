# D25 选票：Argon

议程：Pepgent#17 BLOCKED-1：routeTree.gen.ts 由改路由的席位在同一 PR 中重新生成并提交（[PM#42](https://github.com/Pepgent/PM/issues/42)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D25-01 v1：赞成（Argon-2，2026-11-01T17:21:12.431Z）


**分类意见：** 治理

# D25（PM#42）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】按既有工具链重新生成并提交已批准路由的 `routeTree.gen.ts` 登记，不改变用户原始产品意图、功能范围或跨组件公开契约，且符合反跨席等待原则。**
   - **依据：** `(U) U1`（`LEDGER.md:68`：Argon 守护原始设计意图并维护 `design/`，代码与工程实现取舍归管理层/工程师）、`(U) U20`（`LEDGER.md:84`：无 `(U)` 原文不作意图否决）、`(U) U30–U32` 与 `U83`（`LEDGER.md:88,97`：反对各 AI 互相等待与层层设卡）；`(D)` `DEC/D12-lab-wire.md:45,49,524-534`（Lab HTTP/SSE 路由契约已定）、`WT/docs/conventions/06-toolchain-and-gates.md:122,124`、`evidence/gates/pepgent-17-gate-a.md:5,46`。
   - **边界：** 本条仅授权工具链自动生成的 `apps/web/src/app/routeTree.gen.ts`，不授权手改该文件，不放开对方白名单内的手写文件，也不豁免任何新增或变更 HTTP/SSE 路径、载荷、权限的契约表决义务（`DEC/D10-repo-delivery.md:20`）。无需修改 `design/*.md`。

## 二、条目投票（治理 / 串联 / 技术 / 实现）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D25-01 v1** | 治理 | **approve（赞成）** | 谁在自身白名单内增删改文件路由（W-09 对应 `apps/web/src/app/routes/api/lab/**`，W-10 对应 `_lab.tsx` 与 `_lab.*.tsx`），谁在同一 PR 中用既有 Start/Vite 工具链重新生成并提交 `apps/web/src/app/routeTree.gen.ts`，并行冲突时 rebase 后重生成。该规则与 D16-09 lockfile 规则同构，在保留“生成并提交”既有约定、不改公开契约的前提下，一次覆盖 LAB-07a/07b、后续 `api/lab` 切片及 W-10 页面路由，避免跨席位串行等待与重复上报 BLOCKED。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `治理`）。

