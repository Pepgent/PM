# D15-10③ 专项裁决：`Pepgent/Pepgent` 五棵会话新建本地 Worktree 的处置边界

> **裁决者：** 常驻 `Argon`（`agent://Argon`）与常驻 `ArgonGovernance`（`agent://ArgonGovernance`），依据 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（`D15-03`、`D15-10`、`D15-12②`）及 `LEDGER.md`（`C1-2`、`C5-2`、`C5-3`、`U59`、`U68–U70`）。
> **本步骤 `LEDGER.md` 逐项核对记录（依 `U68–U69` / `C5-2`）：**
> 已对照 `LEDGER.md` `C1–C5`（特别是 `C1-2`“严禁触碰该根 checkout 或联系该无关会话（`U59`）”与 `C5-3`“私自改动 100% 丢弃回退；会话前遗产与无关提交不动”）及 `R1–R21`（特别是 `R15`、`R20`），审阅 `local://exec/d15/pepgent-exec.md` 第 3472–3500 行。

---

## 一、事实核定

1. **`Pepgent/Pepgent` 的远端与 GitHub 源头状态已 100% 完成回退清理（`pepgent-exec.md` §操作01–51）：**
   - `main` 已通过非 draft [Revert PR#42](https://github.com/Pepgent/Pepgent/pull/42)（merge `d4a91fe14306a1fa852365f487c1af696c54dee7`）按逆序撤回 `PR40` 与 `PR39` 的本会话合入内容，同时 100% 逐字保留了无关前端会话的 15 个保护提交（`978bc0e..031d01c`）；
   - 20 个旧 issue 正文（`#9`、`#11`、`#13–#30`）已逐字恢复为 `prepublish` 快照，被关闭的 `#9` 与 `#15` 已重开并附 `PM#23` 作废说明，`#21 → #41` 父子边已移除，新建 `#41` 已改为 `closed (not_planned)` 并附 `PM#23` 作废说明；
   - 远端 `feat/lab-10-library` 已恢复至会话前遗产 `fc89bcd0c562cb205e25f627985580e92cfa1e12`，会话新建的 6 个远端分支（`feat/web-01-async-snapshot`、`evidence/pr-40`、`feat/lab-root-sessions-eng3`、`feat/web-02-lab-wire`、`feat/lab-d12-producer`、`feat/web-02-lab-bridge`）已全部从 GitHub 远端删除。
2. **五棵本地 Worktree 的物理关联现状：**
   - `/Users/mouriya/Ext/worktrees/eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b` 的 `git rev-parse --git-common-dir` 均指向禁止触碰的无关前端根工作区 `/Users/mouriya/Ext/code/pepgent/pepgent/.git`。
   - 对它们执行 `git worktree remove` 必然会写入并加锁 `/Users/mouriya/Ext/code/pepgent/pepgent/.git/worktrees/`（以及根 `.git/refs/heads/`）；而绕过 `git` 直接删除目录又会在根 `.git/worktrees/` 留下悬空损坏注册。

---

## 二、本意裁决 `【定】`

- **裁决结论：这五棵本地 worktree（`eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b`）维持【原地冻结并永久禁用（Frozen & Decommissioned）】，严禁为移除它们而写入 `/Users/mouriya/Ext/code/pepgent/pepgent/.git`，也严禁绕过 git 直接删除目录 `【定】`。**
- **`(U)` 与 `D15` 依据：**
  1. **严守 `U59` / `C1-2` / `D15-03` 的物理隔离红线：**
     - **`(U)` `U59`：** *“那是一个跟你无关的agent，你找他干什么？”*
     - **`LEDGER.md` `C1-2`：** *“`Pepgent/Pepgent` 根 checkout 上另有无关前端会话工作，严禁触碰该根 checkout 或联系该无关会话（`U59`）。”*
     - **`D15-03`（[PM#23](https://github.com/Pepgent/PM/issues/23)）：** *“`Pepgent/Pepgent` 只在 `/tmp` 新克隆中操作。”*
     - 主会话 `01a195a6` 当初在 `X-24` 从 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout 创建 worktree 本身就是违反 `C1-2` 的越界行为；在纠正和回退阶段，绝不能为了清理那次越界留下的 `.git/worktrees/` 注册而**第二次去写入或加锁无关前端会话正在使用的 `/Users/mouriya/Ext/code/pepgent/pepgent/.git`**！
  2. **不留任何 `U70` 实质污染，且完全符合 `D15-10` 冻结条款：**
     - `Pepgent/Pepgent` 在权威源头（GitHub `origin/main`、远端全部分支、全部 issue/PR/父子边）上的私自决策改动已经 **100% 撤回完毕**；
     - 这五棵本地目录与 `soroi` 的 `eng-store-home`、`deploy-11`、`/tmp/pepgent-store-203` 一样，按 `D15-10` 列入 **“因保护边界原地冻结并永久禁用”** 清单；
     - 在 `D15-10④` 独立核验中，核验者核验：① `Pepgent/Pepgent` 的 GitHub `main`（`d4a91fe`）、远端 refs、20 个 issue 正文与开关、`#41` 与父子边、15 个保护提交与 `fc89bcd` 遗产已 100% 恢复到位；② `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout 及其 `.git` 未被触碰；③ 这五棵本地树处于 clean 且冻结禁用状态（阶段 B 恢复派工时，`Pepgent` 的 `tern` 工程师严禁复用这五棵冻结树，也严禁从 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout 创建 worktree，只能基于独立克隆建分支工作树）。
     - 满足上述核验即视为 `Pepgent/Pepgent` 的 `D15-10③/④` 100% 合规通过！
