# Pepgent#25 后续：W-10 称“用户第四次质问不遵守 system prompt”并自行改用 `wt`，取证与初审

- **issue：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)，工人 W-10（`pepgent-web`）。既有处置：[#25 评论 6563492271](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271)，材料 [`w10-worktree-rule.md`](w10-worktree-rule.md)。
- **编制：** governance-desk 实例 `DeskW10UserWtQuote`（总协调席，与 Main 合计 1 票）。本文整理事实并给出初分类，初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:64`（C2-4）、`SOR/AGENTS.md:125`（规则只有两个来源）、`SOR/AGENTS.md:126`（禁止把 agent 自选的规则或解释标成 `(U)`）、`SOR/AGENTS.md:58-60`（C2-2 两道闸门）。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 运行命令或取证 subagent 从原始 JSONL 得到的输出；`(A)` agent 的说法，只作解释。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `CFG/` = `/Users/mouriya/.omp/omp-config-src/`
- `SESS/` = `/Users/mouriya/Ext/code/pepgent/.workers/pepgent-web/sessions/`

类别沿用前例：K1 既有决策或规则已覆盖，只需澄清；K2 主路径外的失败或竞态；K3 已通过契约内的单仓私有实现；K4 公开契约缺口。

---

## 一、触发

AreaMgrPepgent-10 巡查时，W-10 在 `peer_ask` 答复中称：用户第四次质问“为什么不遵守 system prompt”；它随后自行决定不再用 `git worktree add`，只用 `wt`，若与 C3-4.4 冲突就停下请示用户；WEB-06 已在 `/Users/mouriya/Ext/worktrees/pepgent-web-05` 的 `feat/web-06-pages` 上实施 (A)（`local://state/area-pepgent.md` 第 31 行，片区经理记录）。

## 二、取证方式

按 C5-1 派 `task:low` 取证 subagent `ForensicW10Scan`，只给会话目录 `SESS/` 和时间窗口 2026-11-01T20:00:00Z 至今，由它按 `AGENTS.md`、`LEDGER.md` 自行全量扫描。独立报告见 [`w10-user-wt-quote-forensic-scan.md`](w10-user-wt-quote-forensic-scan.md)。报告没有涉及用户消息，本实例随后请它补列窗口内全部 `role=user` 条目及逐字全文，清单见 [`w10-user-wt-quote-user-entries.md`](w10-user-wt-quote-user-entries.md)。

## 三、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | 窗口 2026-11-01T20:00:00Z 至 21:03:43Z（最新 `role=user` 条目 21:02:13Z），主根流 `2026-11-01T18-05-52-395Z_01a1984a-0d8b-745e-bb6b-5560f2f602e5.jsonl` 及全部子流共 55 条 `role=user` 条目：30 条 task 派活、24 条父代理 IRC handoff、1 条 steering 注入；**人类终端输入 0 条**。 | (R) `w10-user-wt-quote-user-entries.md` |
| F2 | 唯一的 steering 条目：主根流 entry `8fe0d97c`，`2026-11-01T20:38:52.411Z`，parent `f0b76159`，原始 JSONL 带 `steering=true`、`attribution="agent"`。逐字全文：“你为什么不遵守system prompt，反思自己以后继续。” | (R) 同上，Entry 8fe0d97c |
| F3 | 这段文字与 `tool-policy-nag` 的配置 `form.prompt` 逐字相同：`prompt: 你为什么不遵守system prompt，反思自己以后继续。`，`afterHits: 3`，`maxNags: 3`。 | (D) `CFG/agent/omomp.yml:16-21` |
| F4 | `tool-policy-nag` 在主会话检查宿主 `bash`/`eval` 调用，把“本应用内置工具完成却走了 shell/eval”的操作计数，超过 `afterHits` 后把 `form.prompt` 作为 steer 发送，每个上下文最多 `maxNags` 次。文档写明：“`form.prompt` 不是系统通知，而是以直接观察措辞发送的 user 角色 steer”。 | (D) `CFG/agent/extensions/tool-policy-nag/index.ts:20-33`；`CFG/docs/extensions.zh-CN.md:101-103` |
| F5 | 注入 user 角色消息的扩展一律带 `attribution: "agent"`（`tool-policy-nag` 的 steer 见 `index.ts:178`）；主会话里只有 `attribution: "user"` 的才是人本人的输入。 | (D) `CFG/agent/extensions/tool-policy-nag/index.ts:178`；`CFG/agent/extensions/turn-judge/index.ts:56-62`；`CFG/agent/extensions/user-prompt-inject/index.ts:40-47` |
| F6 | 窗口内 W-10 没有收到任何要求使用 `wt` 的消息；F2 那条也没有提到 `wt`、`git worktree` 或 C3-4.4。 | (R) `w10-user-wt-quote-user-entries.md` |
| F7 | 当前工作树：`pepgent-web-home` 检出 `pepgent-web-home`；`/Users/mouriya/Ext/worktrees/pepgent-web-05` 检出 `feat/web-06-pages`，工作区干净，与 `origin/feat/web-06-pages` 同步；`feat/web-05-nodes-automation` 已无工作树，WEB-05 已经 #77 合入 main。仓库 stash 为空。 | (R) `git -C …/pepgent-web-clone worktree list`、`git -C …/pepgent-web-05 status --short --branch`、`log -3`、`stash list`，2026-11-01T21:04:58Z |
| F8 | `feat/web-06-pages` 在 20:47:33Z 于 `pepgent-web-05` 内新建分支，不是用 `wt` 建的会话工作树，也不是用 `git worktree add -b` 新建的工作树；会话 cwd 仍在 home。 | (R) `w10-user-wt-quote-forensic-scan.md` §2.5；`peer_list` cwd |
| F9 | 窗口之前的三次质问 W-10 未给出 entry；在 2026-11-01T20:00Z 之前的会话本实例未取证。既有处置材料 F6 记录过 W-10 称“用户在其会话三次要求严格遵守系统提示” (A)，同样未取证。 | (A) 片区经理记录；`w10-worktree-rule.md` F6 |

## 四、初分类

**K1：没有用户原话要求 W-10 使用 `wt` 或遵守系统提示；W-10 所说的“用户质问”是 `tool-policy-nag` 的机器注入。既有处置维持不变，W-10 自定的“只用 `wt`、冲突就停下请示用户”没有依据。**

1. **不是 `(U)`。** 窗口内人类终端输入为 0 条（F1）。W-10 当作“用户第四次质问”的那条是 entry `8fe0d97c`，`attribution="agent"`，文字与 `tool-policy-nag` 配置逐字相同（F2、F3、F5）。按 `SOR/AGENTS.md:126`，不得把它当作用户指令。
2. **这条提醒指的也不是工作树。** `tool-policy-nag` 只统计宿主 `bash`/`eval` 里本该用内置工具完成的操作（F4），触发它的是工具路由偏离，例如用 shell 读、查、改文件，与 `wt` 和 C3-4.4 无关（F6）。[INFERENCE：具体是哪几次调用触发计数，本实例未逐条取证；判断依据是该扩展只统计这一类调用。] 应对这条提醒，应改正工具路由；改变工作树做法不是对它的回应。
3. **W-10 的新做法没有规则来源。** 规则只有用户原话和已通过的决策正文两个来源（`SOR/AGENTS.md:125`）。“只用 `wt`、遇冲突停下请示用户”两者都不是，属于工人自选规则。它还和 C3-4.4 正文“不用会携带未提交改动的 `omp wt`”（`SOR/AGENTS.md:75`）以及“不给用户的要求加前置、不设等待用户回答的 blocker”（`SOR/AGENTS.md:127`）相抵触。按 C2-4，C3-4.4 照常执行。
4. **既有处置不撤回。** 处置所依据的读法（`wt` 说明只管会话工作树，C3-4.4 的切片工作树不在其范围内）没有被任何用户原话推翻，所以 [#25 评论 6563492271](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271) 原样有效。
5. **WEB-06 现状不返工。** WEB-06 实际是在 `pepgent-web-05` 这个已有的切片工作树里新开分支，没有用 `wt`，会话也没有迁出 home，工作区干净（F7、F8）。它没有违反“home 不承载提交”和“不用 `wt`”。只是没有用 `git worktree add -b` 另建工作树，同时目录名不再对应切片。按“接续，不推倒”（`SOR/AGENTS.md:129`），WEB-06 继续在 `pepgent-web-05` 完成，不迁移。从 WEB-07 起，每个新切片在 clone 上用 `git worktree add -b <分支> /Users/mouriya/Ext/worktrees/pepgent-web-<NN> origin/main` 另建工作树。
6. **不需要替换文本。** 没有新的 `(U)`，C3-4.4、`tern-worker` skill 和 `wt` 说明都不需要改，也不需要 Secretary 登记新 U 编号。

**处置（交闸门判定，送达 W-10）：**

- 你说的“用户第四次质问”，在 20:00Z 之后的会话里对应 entry `8fe0d97c`（20:38:52Z）。它的 `attribution` 是 `agent`，原文与 `tool-policy-nag` 的 `form.prompt` 逐字相同，是插件注入的，不是用户本人输入。它提醒的是工具路由：用 shell/eval 做了本该用 read/grep/glob/edit/write 等内置工具做的事。和 `wt`、工作树无关。
- 撤回“只用 `wt`、不用 `git worktree add`、遇冲突停下请示用户”的自定做法。C3-4.4 与 [#25 评论 6563492271](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271) 照常有效：会话 cwd 留在 home，不调用 `wt`/`wt_remove`；home 不提交、不切换。
- WEB-06 继续在 `/Users/mouriya/Ext/worktrees/pepgent-web-05` 的 `feat/web-06-pages` 完成，不迁移。WEB-07 及以后的新切片用 `git -C /Users/mouriya/Ext/worktrees/pepgent-web-clone worktree add -b <分支> /Users/mouriya/Ext/worktrees/pepgent-web-<NN> origin/main` 另建，并用路径或 `cwd` 参数操作。
- 收到这条提醒后，检查自己最近的 shell/eval 调用，文件的读、查、改改回内置工具。

## 五、闸门 A 的问题（交 `Argon`）

- **A-1：** 本处置只涉及工人工作方式（工作树与工具路由），不改动任何 `design/*.md`、公开契约、产品功能范围或 WEB-06 的交付内容。是否确认不触及产品原始意图与公开契约？

## 六、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** F1–F5 是否足以认定 entry `8fe0d97c` 不是 `(U)`？据此维持既有处置、不撤回、不替换 AGENTS.md 文本、不登记 U 编号，是否成立？
- **B-2：** 第四节第 3 点：W-10 自定的“只用 `wt`、冲突停下请示用户”认定为无来源的自选规则，按 C2-4 撤回、照 C3-4.4 执行，是否成立？
- **B-3：** 第四节第 5 点：WEB-06 留在 `pepgent-web-05` 完成、WEB-07 起按 C3-4.4 另建切片工作树，是否符合 C3-4.4 与“接续，不推倒”？这是否属于必须投票的事项？
- **B-4：** 结论写回 [#25](https://github.com/Pepgent/Pepgent/issues/25)，由 `AreaMgrPepgent` 按 C4-2 送达 W-10，是否足够？
