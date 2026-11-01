# Pepgent#25 迁移 BLOCKED 的闸门材料：C3-4.4 与 omp `wt` 工具说明是否冲突

- **issue：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)，工人 W-10（`pepgent-web`）。BLOCKED 见 [#25 评论 6563421482](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563421482)（2026-11-01T20:25:36Z）。
- **编制：** governance-desk 实例 `DeskW10WorktreeRule`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初分类，并列出交两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:58-60`（C2-2）：两道闸门都确认不越界，才可以免投票放行；任一闸门认定越界，按 P0 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论和片区经理转述都属于 `(A)`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `WT/` = `/Users/mouriya/.omp/omp-config-src/agent/extensions/wt-tool/`（与 `/Users/mouriya/.omp/agent/extensions/wt-tool/index.ts`、`/Users/mouriya/Ext/code/omomp/omp-config/agent/extensions/wt-tool/index.ts` 同文）
- `HOME/` = `/Users/mouriya/Ext/worktrees/pepgent-web-home`（仓库 `/Users/mouriya/Ext/worktrees/pepgent-web-clone`）

类别沿用前例：K1 既有决策或规则已覆盖，只需澄清；K2 主路径外的失败或竞态；K3 已通过契约内的单仓私有实现；K4 公开契约缺口（含验收语义）。

---

## 一、工人提出的问题

W-10 认为 C3-4.4 要求用 `git worktree add` 建切片工作树并禁用 omp `wt`，而它运行时的 `wt` / `wt_remove` 工具说明禁止自行用 `git worktree` 建、切、删工作树，两条照字面同时执行就没有合规的建树方式 (A)。它列出两个方案、不自选 (A)：

- (a) 子代理结束后用 `wt` 从当前 HEAD 建会话工作树并带走未提交改动，在新工作树里切回 `feat/web-05-nodes-automation`、删临时 `wt/*` 分支，home `git switch --detach`；
- (b) 按 C3-4.4 用 `git worktree add` 检出遗产分支，未提交改动用 `git stash -u` 或复制带过去。

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | C3-4.4：home worktree 是各工程席位的“驻留入口目录”，“不检出 `main`、不承载代码提交”，保持 `pepgent-<席位>-home` 或 `--detach`，“二者均完全合规，禁止来回切换”；切片工作树“在各自仓库使用 `git worktree add -b <分支> <路径> origin/main`（或检出既有遗产分支）建立，不用会携带未提交改动的 `omp wt`”。 | (D) `SOR/AGENTS.md:75` |
| F2 | C2-4：已写入 `AGENTS.md` 的规则必须直接执行，不另立决策表表决跳过。“规则只有两个来源”：不给 system/developer 规则开例外。 | (D) `SOR/AGENTS.md:64,125` |
| F3 | `tern-worker` skill 给工人的派活模板：“共享仓库一律用 `git -C <仓库> worktree add -b <分支> /Users/mouriya/Ext/worktrees/<名> origin/main`，不用 `omp` 的 `wt`（`C3-4.4`）”。 | (D) `SOR/.omp/skills/tern-worker/SKILL.md:47` |
| F4 | `wt` 工具说明第 1–2 句：“Create a new git worktree for this session and move the session into it: … uncommitted changes carried along; the session's cwd becomes the new worktree.” / “Use this tool for session worktrees; never create, switch to, or remove worktrees yourself with `git worktree` or by changing directories.” `wt_remove`：“Remove the worktree this session is in and move the session back …” / “Use this tool to leave a session worktree; never remove or leave worktrees yourself with `git worktree` or by changing directories.” W-10 引用的原文与源码逐字一致。 | (D) `WT/index.ts:85-86,93-94` |
| F5 | 扩展头注释说明它的用途：“let the main agent move its session into a new worktree and back out of it, which OMP only lets the human do”；`wt` 就是人类 `/wt` 命令本身（建树、迁移会话、cwd 改到新树）。工具只在 TUI 主会话注册（“TUI-main-only tools wt and wt_remove”）。 | (D) `WT/index.ts:2-3,5-11,65` |
| F6 | 该扩展属于 omp-config 工具定制（`omp-config-src`），不是 `AGENTS.md` 规则正文，也不是 `(U)` 用户原话。W-10 称用户在其会话三次要求严格遵守系统提示 (A)，本实例未取证。 | (D) 路径本身；(A) BLOCKED 评论 |
| F7 | 其他工人的会话 cwd 都停在各自 home：W-07 `pepgent-plugin-home`、`pepgent-lab-home`、W-03 `pepgent-images-home`。它们的切片工作树是同仓的独立 linked worktree，会话本身没有迁进去，例如 soroi 的 `issue-336-337-role-purpose`、`issue-315-generation-string`，images 的 `pepgent-images-14`。这些工人同样是 TUI 主会话，带同一份 `wt` 工具说明。 | (R) `peer_list`；`git -C SOR worktree list`；`git -C …/pepgent-images worktree list` |
| F8 | W-10 自己的仓库里也已有这种非会话切片：`/Users/mouriya/Ext/worktrees/pepgent-web-02` 检出 `feat/web-02-lab-bridge`，W-10 会话 cwd 是 `HOME/`。 | (R) `git -C HOME worktree list`；`peer_list` |
| F9 | 当前 `HOME/` 检出 `feat/web-05-nodes-automation`（`fe37f41`，与 `feat/web-04-workspace` 同一提交），13 个已跟踪文件修改、4 个未跟踪文件（`apps/web/src/client/services/lab/project-{automation,node-library}.ts`、`apps/web/tests/vitest/lab-wire-{automation,node-library}-view-model.test.ts`）。分支 `pepgent-web-home` 存在（`f56835a`），`/Users/mouriya/Ext/worktrees/pepgent-web-05` 不存在，仓库 stash 为空。 | (R) `git -C HOME status --short`；`git branch -vv`；`git stash list` |

## 三、初分类

**K1：不是规则冲突，是工人对 `wt` 说明适用范围的误读；C3-4.4 已覆盖本次迁移。**

1. **`wt` 说明管的是“会话工作树”。** 说明第 1 句把它定义为“为本会话建树并把会话迁进去、cwd 改到新树”（F4），扩展的用途是让 agent 做人类 `/wt`、`/move` 的事（F5）。第 2 句“never create, switch to, or remove worktrees yourself with `git worktree` or by changing directories”的对象是第 1 句限定的 session worktrees：不要绕开工具自己把会话搬进或搬出工作树。C3-4.4 的切片工作树不是会话工作树：会话留在 home（F1 “驻留入口目录”），只用路径或 `cwd` 参数操作切片。W-07、W-03 等工人和 W-10 自己的 `pepgent-web-02` 都是这样做的（F7、F8），从未与 `wt` 说明冲突。
2. **C3-4.4 的“不用 omp wt”覆盖本次迁移。** 该句排除 `wt` 的理由正是“会携带未提交改动”（F1），本次方案 (a) 用的就是这个携带行为；而且 (a) 会把会话 cwd 迁出 home，与 home 作为驻留入口目录相冲突。所以 (a) 不符合 C3-4.4。
3. **两条规则可以同时满足。** 会话留在 home，用 `git stash -u` 把未提交改动收起，home 回到 `pepgent-web-home`，用 `git worktree add <路径> feat/web-05-nodes-automation` 检出既有分支（C3-4.4 括号内明文允许），再在切片里 `git stash pop`。整个过程没有建、切、删会话工作树，不触碰 `wt` 说明的范围（第 1 点），也不在 home 提交、不用 `wt`（F1）。
4. **brief 设想的“先在 home 提交再迁出”不采用。** C3-4.4 明文规定 home “不承载代码提交”（F1）；stash 不在任何分支上留提交，能达到同样效果。
5. **home 回到命名分支而不是 detach。** home 当前检出的是功能分支，本身已偏离 C3-4.4；回到席位命名分支 `pepgent-web-home` 是恢复原状。之后保持不动，不再在命名分支与 detach 之间切换（F1）。
6. **由谁改文本：不需要。** `wt` 说明（工具定制，F6）与 C3-4.4（`AGENTS.md` 正文，F2）在上述读法下不冲突，不需要 OmompOptimizer 改工具说明，也不需要用户裁定。没有给 system 规则开例外：本处置不让工人违背 `wt` 说明的任何一句，只指出它的适用对象。

**处置（供闸门判定，送达 W-10）：**

等 Web05Nodes、Web05Automation 两个写入子代理都结束、`HOME/` 不再有写入后，W-10 会话保持 cwd 在 `HOME/`，依次执行：

```sh
git -C /Users/mouriya/Ext/worktrees/pepgent-web-home stash push -u -m "WEB-05 迁出 home"
git -C /Users/mouriya/Ext/worktrees/pepgent-web-home switch pepgent-web-home
git -C /Users/mouriya/Ext/worktrees/pepgent-web-clone worktree add /Users/mouriya/Ext/worktrees/pepgent-web-05 feat/web-05-nodes-automation
git -C /Users/mouriya/Ext/worktrees/pepgent-web-05 stash pop
```

- 核对：`HOME/` 的 `git status --short` 为空、分支为 `pepgent-web-home`；`pepgent-web-05` 的 `git status --short` 是原来那 13 个修改和 4 个未跟踪文件。
- 之后 WEB-05 的编辑、提交、推送和子代理都指向 `/Users/mouriya/Ext/worktrees/pepgent-web-05`（路径或 `cwd` 参数），会话不迁入、不调用 `wt` / `wt_remove`，`HOME/` 不再提交、不再切换。
- `feat/web-03-experiments`、`feat/web-04-workspace` 及已推送历史不改动。

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** 本 BLOCKED 只涉及工程进程的工作树操作方式，处置不改动任何 `design/*.md`、跨组件公开契约、产品功能范围或 WEB-05 的交付内容。是否确认不触及产品原始意图与公开契约？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 第三节第 1–3 点的读法（`wt` 说明只管会话工作树；C3-4.4 的“不用 omp wt”涵盖本次迁移；两条可同时满足）是否成立？是否构成给 system 规则开例外（F2 “规则只有两个来源”）？
- **B-2：** 处置的迁移步骤是否符合 C3-4.4 的 home 纪律（不提交、回到命名分支后不再切换）与切片建立方式（检出既有遗产分支）？本处置是否属于必须投票的事项，还是 C2-4 下直接执行现行规则？
- **B-3：** 结论写回 [#25](https://github.com/Pepgent/Pepgent/issues/25)，由 `AreaMgrPepgent` 按 C4-2 送达 W-10，是否足够？

## 六、处置结论

- 闸门 A（`Argon-2`，[`w10-worktree-rule-gate-a.md`](w10-worktree-rule-gate-a.md)，PM `821dfba`）：不越界，K1，不触及产品意图与公开契约。
- 闸门 B（`ArgonGovernance-2`，[`w10-worktree-rule-gate-b.md`](w10-worktree-rule-gate-b.md)，PM `8f7b3da`）：不越界，K1；B-1 读法成立，不构成给 system 规则开例外；B-2 迁移步骤符合 C3-4.4，属 C2-4 直接执行，无需投票；B-3 送达方式成立。
- 按第三节处置免票放行，结论写回 [#25 评论 6563492271](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271)，由 `AreaMgrPepgent` 按 C4-2 送达 W-10。
