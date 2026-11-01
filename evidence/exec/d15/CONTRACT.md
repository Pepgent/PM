# D15-10 执行契约（交 Argon、ArgonGovernance 预审）

依据：PM#23 已通过的 D15（定稿 `pepgent-pm/evidence/decisions/D15-private-decision-discard.md`，归档 `0909dbf`）；LEDGER `4455170`（C1–C5、R1–R21）。派发者：治理分身 D15Clone_b978（D15-10②，主会话按 C5-4.1 只转达执行方）。

## 第②步：只读盘点（现在执行）

- 每仓一名 task:mid 执行者，`isolated:false`，只读；唯一可写的是自己的产出文件 `local://exec/d15/<仓>.md`，以及 Pepgent 的 `/tmp` 新克隆。
- 产出开头：对 LEDGER `4455170` 的 C1–C5、R1–R21 逐项核对记录（U69）。
- 读取来源（D15-02）：
  - (a) 会话 01a195a6 及其子 agent 的记录（用 `session://`，先读 `session://README`）；**按主会话转达的 ClaudeHighD15 非阻断意见第 1 条，提议把 `/Users/mouriya/Ext/code/pepgent/.workers/<名>/sessions` 中 tern 工程师的会话记录纳入 (a)——这是对 D15-02(a) 范围的解释，解释权属 argon 族（D15-12②），以双核预审结论为准；第②步先读取并在产出中把来自这些记录的结论单独标注，便于预审取舍。**
  - (b) 当前对象：当前 refs（`git rev-parse`、`git ls-remote`）、当前 PR/issue 对象字段（`gh pr view`、`gh issue view`、`gh api` GET 当前对象）、会话记录或 PR 字段点名的 commit 对象（`git show`、`git cat-file`、点名 SHA 之间的 `git diff`）、当前文件内容；`local://inv/d15/` 下的取证、INDEX 与 `d10-rewrite-snapshot/`。
  - 不运行 `git log`、`git reflog`，不遍历提交历史，不读 GitHub 编辑历史或 timeline 事件（仓库规则 `.claude/rules/design-assumes-it-works.md`）。不读 session 01a193fd。
- Pepgent/Pepgent 只在 `/tmp` 新克隆中读取，不碰 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout。
- 产出三张表：
  1. **会话前（05:48:24Z）状态**：main 与相关分支 ref 的会话前 SHA（来源：会话记录中的 push 输出 `old..new`、PR 字段）；相关 issue 的会话前正文来源、开关状态、父子边；相关 worktree 是否会话前已存在。每项写来源。
  2. **差集表**：现状 − 会话前 − 保护名单，每项一行：对象、现状、会话前状态、INDEX 归因（X 编号或“未找到”）、对应 D15 行（D15-04/05/06/07）、拟执行动作（按 D15-03：revert 顺序号、重开、关闭 not planned、移边、删分支、恢复分支 SHA、移除 worktree、冻结 BLOCKED）。同仓 revert 按提交时间从新到旧编号。
  3. **保护段落表**（D15-01）：会话前遗产、用户直接命令产物（`e519e5b`、`6c1faea`）、argon 族依 U74–U82 写入的提交与段落（如 `bdaa278`、`80b0267`、`b521200`、argon 基线与 `D15-08-replacements.md`）、秘书逐字记录用户原话或原样归档 argon 产物的提交、Pepgent 无关会话 15 个 SHA、`.workers` 会话目录；逐项标“保护”并写依据。
- 任何对象取不到会话前内容或归因不到：标“冻结 BLOCKED”，写缺什么来源。

## 第③步：回退（预审通过后才执行，由治理分身另行派发）

- 每仓同一名执行者按自己第②步、经预审确认的差集表执行；每步开始前附 LEDGER 核对记录。
- main：从新到旧 revert（merge 用 `-m 1`），开 revert PR 合入，不改写 main 历史；会话中拉取远端产生的合并提交不单独 revert。
- 会话前已存在的分支：ref 恢复到会话前 SHA，仅此情形允许对非 main 分支 `--force-with-lease`。会话新建分支删除。
- issue：正文恢复会话前版本；被会话关闭的会话前 issue 重开；会话新建 issue 以 not planned 关闭并评论引用 PM#23；父子边恢复；已合并 PR 正文与评论、已发出评论不改；按 ClaudeHighD15 非阻断意见第 2 条，在重开 issue 下补一条引用 PM#23 的“该 issue 中 leader 于会话 01a195a6 的裁决评论按 D15 作废”说明（是否采用由预审决定）。
- worktree：只移除会话新建的；会话前或来源不明的不动。
- 每个动作交 (R)：实际命令与输出。GitHub 使用 RiriAgent。
- D15-08(3) 文本替换由秘书按 `pepgent-pm/evidence/argon/D15-08-replacements.md` 执行，watchdog 全程启用。
- 第④步 task:low 独立核验；第⑤步秘书替换 LEDGER R4、R8、R9、R18–R21。
