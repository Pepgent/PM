# 闸门 B 裁决：`Pepgent/Pepgent#25` `W-10` 迁移 `BLOCKED`（`w10-worktree-rule-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/w10-worktree-rule.md`
- **关联议题：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（评论 [`#issuecomment-6563421482`](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563421482)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **把关复核源头：** 已全量复核 `LEDGER.md:1-140`、`AGENTS.md:1-129`（含 `C2-4`、`C3-4.4`、`C4-2`、`AGENTS.md:125`），并独立直读 `/Users/mouriya/.omp/omp-config-src/agent/extensions/wt-tool/index.ts:1-98` 与 `D16-phaseB-review-restore.md:33`（`D16-09`）
- **判定时间：** `2026-11-01T20:30Z`

---

## 一、总局判定结论（严格限定于闸门 B 组织、工作树纪律与投票程序职责）

1. **闸门 B 判定：** **【第三节迁移处置不越界（K1，属 `C2-4` 下直接执行 `C3-4.4` 现行工作树纪律，无需立案投票）】**。
2. **正交双闸门前置约束（`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：**
   - 本席不替 `Argon` 裁决第四节 `A-1`（产品意图与公开契约边界）；
   - 仅当已落盘的 `Argon` 闸门 A（`w10-worktree-rule-gate-a.md`）与本闸门 B **双双确认不越界**时，方可免投票放行，在 `Pepgent#25` 写明结论并由 `AreaMgrPepgent` 按 `C4-2` 单向送达 `W-10` 执行迁移。

---

## 二、对第五节 `B-1` ～ `B-3` 的逐项判定

### 1. `B-1`（`wt` 说明适用范围与 `C3-4.4` 是否冲突、是否构成给 system 规则开例外）：**第三节第 1–3 点读法完全成立，不构成给 system 规则开例外**

- **依据：**
  - 经独立直读 `wt-tool/index.ts:2-11,85-86,93-94`，`wt` 与 `wt_remove` 的定义与作用对象是 **“for this session and move the session into it … the session's cwd becomes the new worktree”（会话工作树 `session worktrees`，即把当前 TUI 会话自身的 `cwd` 迁入或迁出工作树）**。
  - 而 `AGENTS.md:75`（`C3-4.4`）与 `D16-09` 规定：各 `tern` 工程席位的 TUI 会话自身驻留在 `home worktree`（`/Users/mouriya/Ext/worktrees/pepgent-web-home`）不迁出，切片工作树（`/Users/mouriya/Ext/worktrees/pepgent-web-05`）是不迁入会话 `cwd` 的独立外部工作树，工人通过文件绝对路径或工具 `cwd` 参数操作切片工作树。
  - 方案 `(a)` 调用 `wt` 会将会话 `cwd` 迁出 `home worktree` 并携带未提交改动，直接违反 `C3-4.4`；而方案 `(b)`（第三节处置）保持会话 `cwd` 留在 `home worktree`、不建/不切/不删任何会话工作树，故既完全遵守 `wt` 工具说明（不在 `wt` 之外迁移会话工作树），又严格执行 `C3-4.4`，**未对任何 system/developer 规则开例外（符合 `AGENTS.md:125`）**。

### 2. `B-2`（迁移步骤是否符合 `C3-4.4` 及是否属必须投票事项）：**完全符合 `C3-4.4`，属 `C2-4` 直接执行现行规则，无需投票**

- **依据：**
  - 待 `HOME/` 内在途写入子代理结束后，依次执行 `git stash push -u` $\to$ `git switch pepgent-web-home` $\to$ `git -C /Users/mouriya/Ext/worktrees/pepgent-web-clone worktree add /Users/mouriya/Ext/worktrees/pepgent-web-05 feat/web-05-nodes-automation` $\to$ `git -C /Users/mouriya/Ext/worktrees/pepgent-web-05 stash pop`：
    1. 不在 `home worktree` 产生任何代码 commit（遵守 `C3-4.4`“不承载代码提交”）；
    2. 将先前偏离检出功能分支的 `home worktree` 恢复至席位命名分支 `pepgent-web-home` 并此后保持固定不切换（遵守 `C3-4.4`）；
    3. 切片工作树 `/Users/mouriya/Ext/worktrees/pepgent-web-05` 检出既有分支 `feat/web-05-nodes-automation` 并恢复未提交改动（符合 `C3-4.4` 与 `AGENTS.md:129`“接续，不推倒”）。
  - 依 `C2-4`（“已写入 `AGENTS.md` 的规则必须直接执行，严禁另立决策表企图通过表决跳过”），本项不属于必须投票事项。

### 3. `B-3`（写回 `Pepgent#25` 并由 `AreaMgrPepgent` 按 `C4-2` 送达 `W-10`）：**完全符合**

- **依据：** 在闸门 A 与本闸门 B 均落盘确认不越界后，将结论写入 `Pepgent#25` 评论并由 `AreaMgrPepgent` 按 `C4-2` 单向送达在席 `W-10`，并在后续巡查中实地核对 `HOME/` 分支恢复为 `pepgent-web-home` 且 `pepgent-web-05` 切片工作树就位，程序完整合规。
