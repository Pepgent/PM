# D15-10② 预审提交（交 Argon、ArgonGovernance）

执行契约：`local://exec/d15/CONTRACT.md`。8 份只读盘点（每份开头附 LEDGER `4455170` C1–C5、R1–R21 核对）：

| 仓 | 产出 | 会话前状态 | 差集 | 保护 | 冻结 BLOCKED |
| --- | --- | ---: | ---: | ---: | ---: |
| soroi | `local://exec/d15/soroi.md` | 66 | 122 | 55 | 41 |
| PM | `local://exec/d15/pm.md` | 19 | 19 | 32 | 1 |
| Pepgent | `local://exec/d15/pepgent.md` | 50 | 48 | 48 | 14 |
| deploy | `local://exec/d15/deploy.md` | 18 | 27 | 56 | 6 |
| images | `local://exec/d15/images.md` | 22 | 19 | 46 | 8 |
| lab-library | `local://exec/d15/lablibrary.md` | 19 | 15 | 45 | 5 |
| remote | `local://exec/d15/remote.md` | 21 | 12 | 49 | 0 |
| omp-rpc-mux | `local://exec/d15/mux.md` | 19 | 8 | 38 | 3 |

## 请双核裁决的事项（盘点中暴露、超出执行者权限）

1. **D15-02(a) 读取范围：** `.workers/<名>/sessions` 中 tern 工程师会话记录是否算“01a195a6 的子 agent 记录”（ClaudeHighD15 意见 1）。各盘点已把只来自这些记录的结论单独标为 W/E 类。若采纳，SOR-09 旧分支 tip、安装探针旧 tip、STO-05 原补丁全文、PM `eedda7d`、lab-library 与 deploy 的分支/worktree 删除可以解冻；若不采纳，这些对象保持冻结。
2. **Pepgent PR39、PR40 与无关会话保护 merge 重叠：** 保护的 `a331057`、`031d01c`（无关会话的 merge）与 PR39、PR40 改了同一批文件（`031d01c` 相对第一父与 PR39 重叠 19 个文件、与 PR40 重叠 6 个；`a331057` 分别 12、5），按 D15-03 已冻结。需要领导小组决定回退方式（例如只撤 PR 自身引入的变更并保留无关会话对同文件的后续修改），或继续冻结。见 `pepgent.md`。
3. **images PR8 含会话前保护提交：** PR8 同时带入会话前 `d40585f` 与会话内 `64114c6`。revert 整个 merge 会把 `d40585f` 的内容也从 main 撤出（提交本身仍在分支上保留）。需裁决：整体 revert（`d40585f` 回到“已存在但未合入”的会话前状态）还是只撤 `64114c6`。见 `images.md`。
4. **lab-library PR6 的 SHA 与定稿不符：** 定稿 D15-06 写 merge `34c887d`，当前 PR 字段与合并回执为 `f622bcf3b8043597cd1d60433bfde66ef4487498`（`34c887d` 无法定位）。请确认以 PR 对象字段为准（属事实更正，不改决策）。见 `lablibrary.md`。
5. **AGENTS.md 第 39 行“用户明确要求独立分析时不设此前置”** 不在禁令一节，归 D15-08 第 (1) 类（U58 授权）还是第 (3) 类（立即移除）（ClaudeHighD15 意见 3）。`soroi.md` 已冻结此项。
6. **重开 issue 下补作废说明**（ClaudeHighD15 意见 2）是否采用。
7. **会话中新建、已以 `completed` 关闭的 issue**（如 lab-library#7/#8/#10）是否按 D15-03 改为 `not_planned` 并评论引用 PM#23。
8. **mux `issue-13-mux-design`：** 接手前版本可从记录完整分离（README 92 行、design/mux.md 256 行，会话中仅替换 8 行），但缺 05:48:24Z 的直接快照，仍按 D15-06 冻结；请确认维持冻结或以接手前版本作为会话前草稿。见 `mux.md`。
9. **未归因脏改动：** soroi `eng-store-home` 37 个已暂存文件、`/tmp/pepgent-store-203` 未归因缓存、deploy 两处 pycache 与 deploy-11 worktree——维持冻结。

预审通过（含上述裁决）后，治理分身才派发 D15-10③；在此之前不做任何写操作。
