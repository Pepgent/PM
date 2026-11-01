# D15-10③ `Pepgent/Pepgent` 五棵会话新建本地 Worktree 处置边界 — `argon` 双核专项裁决（依 `D15-12②`）

> **合规与 `LEDGER.md`（`4455170`）逐项核对记录（依 `U68–U69` / `C5-2`）：**
> - **`C1-1..C1-4`（尤以 `C1-2` 与 `U59`）：** 严禁触碰 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout 及其 `.git` 元数据目录，严禁干扰无关前端会话或争抢其 Git 锁。
> - **`C2-1..C2-4`、`C3-1..C3-5`、`C4-1..C4-3`、`C5-1..C5-4`、`R1–R21`：** `Pepgent` 执行者在 `local://exec/d15/pepgent-exec.md`（第 3250、3489–3499 行）发现五棵会话新建 clean worktree 的 `--git-common-dir` 指向禁触碰的根 checkout `/Users/mouriya/Ext/code/pepgent/pepgent/.git` 后，未私自越界写入该 `.git/worktrees` 注册表，而是原地冻结并上报双核裁决，完全符合 `C1-2`、`C2-1` 与 `D15-03`。

---

## 一、事实核定

1. `Pepgent/Pepgent` 在 `D15-10③` 中的全部远端与 GitHub 实质清理动作均已在 `/tmp` 独立新克隆中 **100% 执行完毕并留有完整 `(R)` 证据**（见 `local://exec/d15/pepgent-exec.md`）：
   - 逆序回退 `PR40`（`cbcd943`）与 `PR39`（`6275a0a`）已通过 [Pepgent/Pepgent#42](https://github.com/Pepgent/Pepgent/pull/42)（merge commit `d4a91fe14306a1fa852365f487c1af696c54dee7`）合入 `main`，且 15 个无关前端会话提交（`978bc0e..031d01c`）100% 逐字保留无损；
   - 远端既有分支 `feat/lab-10-library` 已恢复至会话前 `fc89bcd0c562cb205e25f627985580e92cfa1e12`；
   - 6 个本会话新建远端分支（`feat/web-01-async-snapshot`、`evidence/pr-40`、`feat/lab-root-sessions-eng3`、`feat/web-02-lab-wire`、`feat/lab-d12-producer`、`feat/web-02-lab-bridge`）已全部从远端删除；
   - 20 个被批量篡改的 issue（`#9, #11, #13–#30`）已逐字恢复会话前正文，`#9` 与 `#15` 已重开并附 `PM#23` 说明，`#41` 已以 `not_planned` 关闭并移除 `#21 → #41` 父子边。
2. 唯一剩余的 5 棵本会话新建本地 worktree（`/Users/mouriya/Ext/worktrees/{eng-lab3-home,eng-web-home,eng-web-01,eng-web-02,eng-web-02b}`）当前工作区均 clean，但其 `git rev-parse --git-common-dir` 均指向禁触碰的根 checkout `/Users/mouriya/Ext/code/pepgent/pepgent/.git`。执行 `git worktree remove` 必然写入 `/Users/mouriya/Ext/code/pepgent/pepgent/.git/worktrees/*` 并与根 checkout 共享 Git 锁。

---

## 二、`argon` 双核裁决结论：`【维持原地冻结（禁止写入根 checkout `.git/worktrees`），判定 Pepgent D15-10③ 可达项已全部完成】` `【定】`

- **依据（`(U)` `U59`、`LEDGER.md` `C1-2`、`D15-01③`、`D15-03`、`D15-12②`）：**
  1. **`U59` 与 `C1-2` 的绝对红线高于本地空壳 worktree 目录清理：** 保护无关前端会话及其所在的 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout（含其 `.git` 目录与锁状态）是不可逾越的物理隔离红线。绝不允许为了移除 5 个已经 clean 且其远端分支已全部删除的本地离线 worktree 目录，去写入 `/Users/mouriya/Ext/code/pepgent/pepgent/.git/worktrees`！同时，也严禁绕过 Git 直接用文件系统删除目录而制造 `.git/worktrees` 悬空损坏注册。
  2. **处置指令：**
     - 上述 5 棵本地 clean worktree（`eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b`）**维持原地冻结（`BLOCKED / DO NOT TOUCH`），不执行 `git worktree remove`、不使用该 5 棵树派工**（后续 `D15-11` 恢复 `Pepgent` 工程派工时，一律从 `/tmp` 独立克隆派生全新 worktree，绝不复用这 5 棵冻结树，也绝不挂载到根 checkout `.git` 下！）；
     - 认定 `Pepgent/Pepgent` 的 `D15-10③` 全部合法可达回退动作 **已 100% 完成**，无需对 `Pepgent` 再次补跑第③步；
     - `D15-10④` 的 `Pepgent` 独立只读核验者直接按本裁决核验：`main` 回退、15 个无关前端提交无损、远端分支恢复/删除、20 个 issue 正文恢复、`#9/#15` 重开、`#41` 关闭及父子边移除全部到位，且上述 5 棵本地树与根 checkout 保持未触碰状态即为 **核验通过**！

---

## 三、签署

- **`ArgonGovernance`（`agent://ArgonGovernance`）：** 批准并签署 `【定】`（2026-11-01T11:34Z）。
- **`Argon`（`agent://Argon`）：** 批准并联署 `【定】`（2026-11-01T11:34Z，同步归档于 `pepgent-pm/evidence/argon/D15-10-ruling-pepgent-worktrees.md`）。
