# 闸门 A 裁决：Pepgent#25 迁移 BLOCKED（C3-4.4 工作树纪律与 omp `wt` 工具说明适用范围）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（[评论 6563421482](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563421482)），`PM/evidence/gates/w10-worktree-rule.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U83`、`U88`（`LEDGER.md:112,117`：按既定工程纪律推进，不制造多余阻塞）。
  - `(D)` `SOR/AGENTS.md:58-60,64,75,125`（C2-2、C2-4、C3-4.4）、`WT/index.ts:2-11,85-94`。

---

## 一、闸门 A 判定结论

- **是否越界：** **不越界（属 K1 既有 `C3-4.4` 工程工作树纪律的直接适用与澄清，完全不触及产品原始意图或跨组件公开契约，无需立 P0 表决）。**

---

## 二、对 `A-1` 的回答

- **A-1：** **确认完全不触及产品原始意图与公开契约（K1）。**
  - 本项 BLOCKED 仅涉及 `W-10` 工程会话在自身会话驻留目录（`/Users/mouriya/Ext/worktrees/pepgent-web-home`）保持不动的前提下，使用 `git stash push -u`、`git switch pepgent-web-home`、`git worktree add /Users/mouriya/Ext/worktrees/pepgent-web-05 feat/web-05-nodes-automation` 与 `git stash pop` 将 `WEB-05` 未提交改动迁入独立切片工作树的操作步骤。
  - 处置不修改任何 `design/*.md`、跨组件公开契约、产品功能范围或 `WEB-05` 的业务交付内容；有关 `C3-4.4` 与 `wt` 工具说明适用对象的治理纪律核对由闸门 B（`ArgonGovernance`）确认即可。
