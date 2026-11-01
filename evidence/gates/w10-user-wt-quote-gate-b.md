# 闸门 B 裁决：`Pepgent/Pepgent#25` 后续 `W-10` 误认 `tool-policy-nag` 为用户原话（`w10-user-wt-quote-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/w10-user-wt-quote.md`
- **关联议题：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（既有处置评论 [`#issuecomment-6563492271`](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **把关复核源头：** 已分段全量直读并复核 `LEDGER.md:1-141`（`#E637`，含 `:1-14`、`:15-88`、`:89-141`，核对 `:85` 对 `tool-policy-nag` `attribution: "agent"` 非用户原话的既有核定及 `U7`/`U22`/`U97`/`U103–U111`）、`AGENTS.md:1-129`（含 `C2-4`、`C3-4.4`、`C4-2`、`AGENTS.md:125-127,129`）与初审取证事实 `F1–F8`
- **判定与全量复核时间：** `2026-11-01T21:10Z`（全量复核 `LEDGER.md:89-141` 后确认 `B-1`～`B-4` 结论不变）

---

## 一、总局判定结论（严格限定于闸门 B 组织、工作树纪律与程序边界职责）

1. **闸门 B 判定：** **【第四节处置不越界（K1，属 `C2-4` 下直接执行 `C3-4.4` 与 `AGENTS.md:125-127,129` 现行规则，无需立案投票）】**。
2. **正交双闸门程序规则（`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：**
   - 本席不替 `Argon` 裁决第五节 `A-1`（产品原始意图与公开契约边界）；
   - 仅当已落盘的 `Argon` 闸门 A（`w10-user-wt-quote-gate-a.md`）与本闸门 B **双双确认不越界**时，方可免票放行，在 `Pepgent#25` 写回结论并由 `AreaMgrPepgent` 按 `C4-2` 单向送达 `W-10`。

---

## 二、对第六节 `B-1` ～ `B-4` 的逐项判定

### 1. `B-1`（`entry 8fe0d97c` 是否为 `(U)`，是否维持既有处置、不改 `AGENTS.md`、不登记 `U` 编号）：**完全成立**
- **依据：** 取证 subagent `ForensicW10Scan` 对原始 JSONL 的核查（`F1–F5`）证实，`20:00Z–21:03Z` 窗口内人类终端输入为 `0` 条，`entry 8fe0d97c` 带 `steering: true`、`attribution: "agent"`，与 `/Users/mouriya/.omp/omp-config-src/agent/omomp.yml:16-21` 中 `tool-policy-nag` 的 `form.prompt` 逐字相同（与 `LEDGER.md:85` 已剔除的 `U8`/`U16` 同源）。依 `AGENTS.md:126`，扩展注入的 `attribution: "agent"` 消息绝非人类操作员原话 `(U)`；既有处置（`#25` 评论 `6563492271`）维持有效，无需修改 `AGENTS.md` 或登记新 `U` 编号。

### 2. `B-2`（撤回 `W-10` 自定的“只用 `wt`、遇冲突停下请示用户”，照 `C3-4.4` 执行）：**完全成立**
- **依据：** `AGENTS.md:125` 规定“规则只有两个来源：用户原话 `(U)` 和已通过的决策正文”。`W-10` 因误把 `tool-policy-nag` 工具路由提醒当成工作树指令而自定的做法无任何规则来源，且直接违反 `C3-4.4`（`AGENTS.md:75`“不用会携带未提交改动的 `omp wt`”）与 `AGENTS.md:127`（“禁止设‘等待用户回答’一类的 blocker”），须按 `C2-4` 撤回并严格执行 `C3-4.4`（同时把文件读/查/改切回内置工具以消除 `tool-policy-nag` 触发源）。

### 3. `B-3`（`WEB-06` 留在 `pepgent-web-05` 完成、`WEB-07` 起按 `C3-4.4` 另建切片工作树是否合规及是否需投票）：**完全符合 `C3-4.4` 与 `AGENTS.md:129`，无需投票**
- **依据：** `F7–F8` 证实 `pepgent-web-home` 已恢复检出 `pepgent-web-home`、`WEB-05` 已由 `PR#77` 合入 `main`，而 `WEB-06`（`feat/web-06-pages`）位于 `home worktree` 之外的独立外部工作树 `/Users/mouriya/Ext/worktrees/pepgent-web-05` 且会话 `cwd` 仍在 `home worktree`。按 `AGENTS.md:129`（“接续，不推倒”），不因目录后缀名而无谓搬迁正在进行的 `WEB-06`；自 `WEB-07` 起对每个新切片使用 `git -C /Users/mouriya/Ext/worktrees/pepgent-web-clone worktree add -b <分支> /Users/mouriya/Ext/worktrees/pepgent-web-<NN> origin/main` 另建工作树，属 `C2-4` 下直接执行现行规则（`K1`），不属于必须投票事项。

### 4. `B-4`（写回 `Pepgent#25` 并由 `AreaMgrPepgent` 按 `C4-2` 送达 `W-10`）：**完全符合**
- **依据：** 在双闸门均落盘确认不越界后，写回 `Pepgent#25` 并由 `AreaMgrPepgent` 按 `C4-2` 单向送达 `W-10`，程序完整合规。
