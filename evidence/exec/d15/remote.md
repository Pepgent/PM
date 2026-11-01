# Pepgent/remote：D15-10② 只读预审包

## 0. LEDGER `4455170` 逐项核对记录（U69）

执行者：`D15Clone_b978.remote`。本次只产出盘点草稿，**没有执行回退、改变仓库或 GitHub 对象，也没有发评论或联系任何 agent/会话**。本节核对来源为实际读取的 `git show 4455170:LEDGER.md` 与完整当前 `LEDGER.md`，不是仅凭派工转述。提交标识在全文只作对象地址，不作 hash 校验证据。

### C1–C5（逐条核对）

| 条款 | 本步落实与边界 |
|---|---|
| C1-1 | 只盘点 remote，不设计 soroi，不从历史提交提取新版设计，不改 omp 宿主。 |
| C1-2 | 单仓 remote 及其注册 worktree；不访问 Pepgent/Pepgent 根 checkout，不联系无关会话，不并入 mux 工程。 |
| C1-3 | 不写代码、测试，不运行测试/build/runtime；不改变最终 A0/F01–F32 范围，不增加开发期门禁，不作 hash 验证。 |
| C1-4 | 不连接 Slurm/Komodo/生产设施，不创建环境，不接触或解密 SOPS。 |
| C2-1 | 仅按已通过 D15 列事实及拟动作，不自行设计处置规则；交治理分身供双核预审。 |
| C2-2 | 自行取证，不把调查转给 Argon/ArgonGovernance；本次未向双核发消息。 |
| C2-3 | 不开展新表决，不将 D11-B 的既有票当作免除 D15 丢弃的依据；按对象列来源。 |
| C2-4 | 用户直接授权和 argon 族 U74–U82 内容列保护；不就执行这些命令另立否决机制。 |
| C3-1 | 本任务是已锁定口径的单仓只读盘点，不作架构/设计决策。 |
| C3-2 | 治理分身派发，本执行者不冒充独立领导票。 |
| C3-3 | 不参与或代替重大决策的高阶审查；D15 已通过是输入，不在本步重审。 |
| C3-4 | 一名执行者只负责 remote；不启动 tern，不切分支，不创建/移除 worktree，不恢复 eng-rt。 |
| C3-5 | 不改共享 skill、agent 定义或 harness 配置。 |
| C4-1 | 不发送常规进度消息、不写 GitHub 评论；唯一交付为指定 local 预审文件。 |
| C4-2 | 中文；未联系其他会话，未在 PTY 启动 omp。读取获准 session 记录不是通信。 |
| C4-3 | 当前 refs 问远端 `ls-remote`，PR/issue 问 GitHub 当前对象；local 取证按取回时快照使用，不当实时源。本文件是待预审草稿，不回写 LEDGER。 |
| C5-1 | 由 subagent 读取获准记录；没有读取 session `01a193fd`，没有导师前审或另派 agent。当前工具没有 `task`，且本任务明令禁止联系其他 agent。 |
| C5-2 | 本节在产出开头逐条覆盖 C1–C5、R1–R21。 |
| C5-3 | 差集与保护内容分开，不能因 `5e61f47` 使用旧文件就连旧文件一并删除；只建议关闭新 PR/issue、移边、删除会话新分支/树。 |
| C5-4 | 仅推进 D15-10②；未解除工程冻结，未合并业务代码；本包不表示 R20/R21 完成。 |

### R1–R21（逐项核对）

| 要求 | 本步核对 |
|---|---|
| R1 | 不重做转向调查，不读禁读旧 session，不从 git 历史取设计。 |
| R2 | 不修改 design；记录 remote 分支文档增量，不把回写视作有效新基线。 |
| R3 | remote 独立仓边界保持；不创建/迁移新仓。 |
| R4 | 双核定义、用户授权内容受保护；本步不修改或重启双核。 |
| R5 | 依据 [D15 / PM#23](https://github.com/Pepgent/PM/issues/23) 已通过文本，盘点不是新投票。 |
| R6 | 按治理分身的一仓任务执行，只交本文件；不越权充当秘书。 |
| R7 | 单主题只读任务，不新增监控、不派高低阶子任务。 |
| R8 | 不恢复工程进程；原 eng-rt 会话目录保护；不再次混派 remote/mux。 |
| R9 | 不切换任何分支、不改变工作树；不发状态评论。 |
| R10 | 不读取 `01a193fd`；U57 的报告归档列全局保护。 |
| R11 | 不修改 U80 整理后的 LEDGER 或关联治理正文。 |
| R12 | 本步不操作测试设施，不把既有环境记录当本次运行结果。 |
| R13 | 保留会话前 REM-01..07 与旧 PR/issue；识别会话新分支六文件增量。 |
| R14 | 不处理 soroi 实现；SOR/STO 遗产仅登记跨仓保护，不在本仓操作。 |
| R15 | 不处理 Pepgent 实现及无关前端会话；15 个提交逐个列出保护。 |
| R16 | 不执行统一验收，不收缩其范围；现存 PR runtime 声明只作为原记录保留。 |
| R17 | 不开展 D9/F32 分析，不声称完整运行完成。 |
| R18 | 保持工程停止；以获准当前对象/会话锚点补齐执行前事实，不转嫁调查。 |
| R19 | 已读 D15 定稿与执行契约，不改票、不重新计票。 |
| R20 | 本次仅其 D15-10② 盘点前置步骤；实际回退、命令证据与独立核验尚未执行。 |
| R21 | 本包交双核预审，不代替 D10–D14 合法性复核或恢复派工批准。 |

## 1. 方法、范围、来源与决定性观察

**决定性问题：** remote 的每个待丢弃对象，能否同时确定 `2026-11-01T05:48:24Z` 前状态、现状、INDEX 归因与 D15 动作，并隔离所有会话前内容？

工作顺序：读执行契约/D15/固定 LEDGER/INDEX → 查当前 refs、PR/issue 与 worktree → 读取原始派发、秘书创建/挂边、必要工程记录 → 列三表。最便宜的决定性观察是：旧 [PR13](https://github.com/Pepgent/remote/pull/13) 的 `mergeCommit/mergedAt` 与新 [PR15](https://github.com/Pepgent/remote/pull/15) 的 `base/head/mergedAt`，再用点名提交对象确认 `5e61f47` 的直接 parent 和六文件改动。这避免把一个未合并分支错误当成 main 的回退任务。

不在范围：业务正确性审查、测试或运行复验、新设计、执行回退、删除临时目录、调整 Project 状态、修改他仓。本次唯一主动文件写入是本文件。没有运行 `git log`、`git reflog`、fetch、checkout、reset、merge、push；未读取 GitHub 编辑历史或 timeline 事件。

### 来源键

- **L**：`git show 4455170:LEDGER.md`；当前 `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/LEDGER.md`。
- **D**：完整已读 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D15-private-decision-discard.md`，含截断行 44–51 的 raw 全文；[D15 / PM#23](https://github.com/Pepgent/PM/issues/23) 为关联对象。
- **K**：`local://exec/d15/CONTRACT.md`。
- **I**：`local://inv/d15/INDEX.md`，remote 相关主表 X-85、V11B，以及对象表 3.1 的 #14/PR15；3.2 的 `5e61f47`；3.3 的 PR15 评论；3.4 六文件；3.5 的 `PM21→remote14`；3.6 的 main/issue-14 分支；3.7 的 worktree、eng-rt 目录。辅助读 `local://inv/d15/G6.md`；未重跑其中历史检索命令。
- **Q**：`local://inv/d15/d10-rewrite-snapshot/remote.json` 实际为 `[]`。因此 remote 没有 X-50 的 49 个正文恢复对象。
- **G1**：本次 `git rev-parse HEAD main origin/main`、`git for-each-ref --format='%(refname) %(objectname)'`、`git worktree list --porcelain`、`git ls-remote --heads origin`、无可选锁的 status 输出。refs 与 worktree 关键输出附 §5。
- **G2**：本次 `git show --format=fuller --stat 5e61f47`、`git show --format=fuller --no-patch 1c2408d`、`git cat-file -p 5e61f47`、`git diff --name-status 1c2408d 5e61f47`，并读取完整六文件 diff（本次工具输出 `artifact://1210`）。仅读取点名对象，不走提交历史。
- **H1**：本次 `gh issue list -R Pepgent/remote --state all --limit 100 --json number,title,body,state,stateReason,createdAt,updatedAt,closedAt,url`；`gh pr list` 当前全部 7 个 PR 的 base/head/merge 字段；`gh pr view 15` 当前对象。完整当前 issue 正文已读于工具输出 `artifact://1166` 第一行；不重建正文编辑历史。
- **H2**：本次 GET `repos/Pepgent/remote/issues/14`、其 `/parent`、`/sub_issues`，及 `repos/Pepgent/PM/issues/21/sub_issues`。另 GET remote 全部 issues 的 `parent_issue_url/sub_issues_summary`。#14 的数据库 ID 为 `6144755477`，当前父为 [PM#21](https://github.com/Pepgent/PM/issues/21)，子项为 `[]`。
- **H3**：本次 `gh pr view 15 --json comments` 的当前评论清单。只取当前对象，不读 edits/timeline。已发评论不可变，列 P25；没有采纳其测试声称作为本次验证。
- **S1**：`session://01a195a6/entry/7246f182`：08:17:08Z 实际投递给 eng-rt 的 remote/mux 任务，点名 [remote#14](https://github.com/Pepgent/remote/issues/14)，随 PR 同步 design。
- **S2**：`session://01a195a6/agents/D10Clone_a555/entry/a5bb50e9`：08:02:11Z 派秘书新建 remote OCI/remove 实现 issue。`session://01a195a6/agents/D10Clone_a555.SecD11B/entry/264daf65` 是发布脚本正文；`.../entry/5d7d25ba` 是 08:10:37Z 实际执行输出，明确 `CREATED remote/issues/14` 与 `PARENT remote/issues/14 -> PM/issues/21`。它还显示新 issue 加入 Project，但 D15 没有要求删除 Project item，本包不自行增加该动作。
- **S3**：`session://01a195a6/entry/ec6e29a2`：08:16:36Z 建 `.workers/eng-rt/sessions`；`session://01a195a6/entry/8756f1f8`：08:29:39Z restore 命令使用 remote 新 worktree 及工程会话文件。均为主会话记录，不是向会话发消息。
- **S4**：获准 `local://state/inventory.md`（同一 01a195a6 的 StateInventory 子 agent 产物），取回窗口 06:17–06:24Z：remote 根 checkout clean，旧六分支已存在，无 open PR；本次只取 remote 行，不把其他仓 checkout 当本次读取入口。
- **M**：本次当前目录元数据：根 checkout birth epoch `1793393674` = `2026-10-30T20:54:34Z`；新 worktree `1793521068` = `2026-11-01T08:17:48Z`；worker sessions `1793520996` = `2026-11-01T08:16:36Z`。仅作路径存在时间的旁证，不用 birth 单独归因作者。

### 工程会话读取：单独标记，待双核确认范围解释

**W 类来源不混入 S 类主会话证据。** 按 K 的暂行要求，读取 `session://01a1962e`（eng-rt），其记录源与 `.workers/eng-rt/sessions`、S3 restore 路径关联：

- **W1** `session://01a1962e/entry/2b8341d6`，08:17:48Z：`New worktree created`，从 remote 根移到 `issue-14-slurm-oci-d2a2e42`，branch=`issue-14-slurm-oci`。
- **W2** `session://01a1962e/entry/aed5676d`，08:22:36Z push 实际输出 `* [new branch] issue-14-slurm-oci -> issue-14-slurm-oci`。

W1/W2 能直接证明本地创建和远端新建。若双核不接受工程会话纳入 D15-02(a)，本包仍有 S2 的新 issue、S1 的初派、S3 的新 worktree 使用、M 的 birth、S4 的此前分支/工作树枚举、当前 PR15 的会话后创建与 head，作为交叉支持；**不得把“读取了 W”误称其范围已获最终裁定**。这些读取未运行工程记录中的任何命令；未打开其中 `git log` 或 GitHub timeline 结果 entry。

### 证据推导与未扩大断言

- main 的会话前位置来自当前旧 PR13 的 merge 字段（`mergedAt=05:24:44Z`），以及 06:18–06:24 盘点/后续 PR15 base；不是仅由当前 main 向前猜。
- 旧六分支会话前 tip 使用旧 PR 的 head 字段，辅以 S4 的既有分支枚举。没有观察到它们在本会话被改写的候选动作；不因“旧分支仍有 ahead”就删除。
- 七个旧 issue 当前 `updatedAt` 都早于起点，S4 亦记录原切片已关闭，Q 无 remote 改写项。因此其会话前正文来源是未在会话内发生记录更新的当前完整正文。**[INFERENCE]** 这里是由当前时间字段及获准会话盘点支持的会话前还原，不冒称持有 05:48:24Z 独立抓取的 JSON。七个旧 issue 不进入任何写动作。
- GitHub 与本机工程记录有约一小时差异：例如 S2 的创建动作在 08:10Z，GitHub #14 `createdAt=09:10:47Z`。全文保留各源时间，不校正时钟、不据单一时间推断停止指令之后仍在工程写入。

## 2. 表一：会话前（05:48:24Z）状态（21 项）

`A = 1c2408d6258e4dfad26f4f3607ab641098efee43`；`B = 5e61f47e234795f8a4bc5c80f5467a1035d9ada4`。两者仅为对象地址。

| ID | 对象 | 会话前状态 / 内容来源 | 当前对照与来源 |
|---|---|---|---|
| S01 | `main`（本地/远端；origin/main 是副本） | A；旧 [PR13](https://github.com/Pepgent/remote/pull/13) `mergeCommit=A`，05:24:44Z 已合，早于起点；S4 之后未有合并，PR15 base 仍为 A | G1 本地 main、HEAD、origin/main=A；`ls-remote` 远端 main=A；PR15 merge 为空。没有 main 回退差集 |
| S02 | `docs/remote-contract-11`（local/remote） | `3331e5eae22ebd0b8f6c3565aa1b4b6b5accdbd0`；旧 [PR12](https://github.com/Pepgent/remote/pull/12) head，04:22:45Z 已合；S4 已列分支 | G1 当前同一 tip；保留 |
| S03 | `feat/readonly-runs-5`（local/remote） | `504d1417dd15dee672dd75528c3fc3d50a895f69`；旧 [PR10](https://github.com/Pepgent/remote/pull/10) head，04:03:09Z 已合；S4 已列分支 | G1 当前同一 tip；保留 |
| S04 | `feat/slurm-backend`（local/remote） | `8eedd7d376d0d2e807621be1e12a6beca6baf9ba`；旧 [PR2](https://github.com/Pepgent/remote/pull/2) head，00:46:54Z 已合；S4 已列分支 | G1 当前同一 tip；保留 |
| S05 | `feat/soroi-template-6`（local/remote） | `b73310ccc27bc6fa16ee38b145203504e81cc160`；旧 [PR9](https://github.com/Pepgent/remote/pull/9) head，02:46:46Z 已合；S4 已列分支 | G1 当前同一 tip；保留 |
| S06 | `feat/template-identity-3`（local/remote） | `8473972c40d509c5d9f798e46b4b930dd66978f6`；旧 [PR8](https://github.com/Pepgent/remote/pull/8) head，02:29:46Z 已合；S4 已列分支 | G1 当前同一 tip；保留 |
| S07 | `fix/terminal-before-remove-4`（local/remote） | `f3f1a31afa31022b3ff10c1072afa8badbbaa6c8`；旧 [PR13](https://github.com/Pepgent/remote/pull/13) head，05:24:44Z 已合；S4 已列分支 | G1 当前同一 tip；保留 |
| S08 | `issue-14-slurm-oci`（local/remote） | 不存在；S4 无此分支；S2 本会话才创建其任务；W1/W2 为直接新建佐证（范围待双核确认） | G1 local 与远端均 B；PR15 head=B |
| S09 | [PR15](https://github.com/Pepgent/remote/pull/15) | 不存在；H1 当前 `createdAt=09:31:07Z`；S1 为会话派工 | OPEN，base=A/head=B，mergeCommit/mergedAt=null；H1 |
| S10 | [issue1](https://github.com/Pepgent/remote/issues/1) | CLOSED/COMPLETED，00:46:55Z 关闭；正文用 H1 当前完整 body（updatedAt=00:47:03Z）；无父、子=0，H2 当前字段 | 当前仍 CLOSED；REM-01..03 合法遗产；S4/H1/H2，无会话写入候选 |
| S11 | [issue3](https://github.com/Pepgent/remote/issues/3) | CLOSED/COMPLETED，02:29:47Z；正文 H1（updatedAt=02:41:12Z）；无父、子=0 | 当前仍 CLOSED；REM-05 遗产；S4/H1/H2 |
| S12 | [issue4](https://github.com/Pepgent/remote/issues/4) | CLOSED/COMPLETED，05:24:46Z；正文 H1（updatedAt=05:25:24Z）；无父、子=0 | 当前仍 CLOSED；REM-07 遗产；S4/H1/H2，不因 PR15 改 remove 就重开此旧 issue |
| S13 | [issue5](https://github.com/Pepgent/remote/issues/5) | CLOSED/COMPLETED，04:03:11Z；正文 H1（updatedAt=04:03:41Z）；无父、子=0 | 当前仍 CLOSED；REM-06 遗产；S4/H1/H2 |
| S14 | [issue6](https://github.com/Pepgent/remote/issues/6) | CLOSED/COMPLETED，02:46:47Z；正文 H1（updatedAt=03:39:40Z）；无父、子=0 | 当前仍 CLOSED；REM-04 遗产；S4/H1/H2 |
| S15 | [issue7](https://github.com/Pepgent/remote/issues/7) | CLOSED/DUPLICATE，00:58:02Z；正文 H1（updatedAt=00:58:02Z）；无父、子=0 | 当前仍 CLOSED/DUPLICATE；S4/H1/H2 |
| S16 | [issue11](https://github.com/Pepgent/remote/issues/11) | CLOSED/COMPLETED，04:22:47Z；正文 H1（updatedAt=04:22:59Z）；无父、子=0 | 当前仍 CLOSED；文档遗产；S4/H1/H2 |
| S17 | [issue14](https://github.com/Pepgent/remote/issues/14) | 不存在，无旧正文/开关状态可恢复；S2 明确 CREATED | OPEN；title/body 是 D11-B OCI/remove 新任务；H1/H2 |
| S18 | 真实父子边 [PM21](https://github.com/Pepgent/PM/issues/21) → [remote14](https://github.com/Pepgent/remote/issues/14) | 不存在；子对象本会话新建；S2 实际 PARENT 输出 | H2 当前 `/parent` 指向 PM21；#14 无子项 |
| S19 | `/Users/mouriya/Ext/code/pepgent/pepgent-remote` 根 checkout | 已存在；M birth=10-30 20:54:34Z；S4 06:18:32Z clean、main | G1 仍 main/A、clean；保留根 checkout |
| S20 | `/Users/mouriya/Ext/worktrees/issue-14-slurm-oci-d2a2e42` | 本会话新建；M birth=08:17:48Z，S4 无旧树，S1 初派/S3 restore 使用，W1 为直接创建输出 | G1 注册在新分支/B；无 tracked、staged、untracked 差异；无可选锁 status 实际空输出 |
| S21 | `/Users/mouriya/Ext/code/pepgent/.workers/eng-rt/sessions` | 本会话新建；S3 mkdir，M birth=08:16:36Z | 当前目录存在；按 D15-01④ 保护，**不是 worktree 删除对象** |

旧 issue 的父子边只作“无变动、无拟动作”记录；不从当前 parent=null 推断所有历史时刻都无父边。其会话前表述结合 S4 与未更新的当前对象，范围同 §1 的推导说明。

## 3. 表二：现状 − 会话前 − 保护名单（12 项）

**全部是预审后的拟动作，本步没有执行。** remote main 没有本会话合入的提交，因此本仓 **revert 序号为空（0 个）**，不为了形式 revert `5e61f47` 到 main，不恢复或强推 main。B 直接 parent=A（G2），只有下面六文件增量；文件行是分支移除覆盖范围，**不代表要在 main 单独做六次文件还原**。

| ID | 对象 | 现状 | 会话前状态 | INDEX 归因 / 直接来源 | D15 行 | 拟执行动作 |
|---|---|---|---|---|---|---|
| Δ01 | [PR15](https://github.com/Pepgent/remote/pull/15) | OPEN，未合，base=A/head=B | 不存在 | X-85；V11B；I、S1、H1 | D15-06 | 关闭 PR（不合并、不改正文、不改已发评论）；在 worktree/分支清理前处理 |
| Δ02 | [remote14](https://github.com/Pepgent/remote/issues/14) | OPEN，新 OCI/remove 任务 | 不存在 | X-85 关联实施；V11B 为新建链（I 明确为 V 流程，**未找到逐条 Main 建号指令**）；S2 提供实际 CREATED | D15-07 | 以 `not planned` 关闭，按 D15-03 评论引用 [PM#23](https://github.com/Pepgent/PM/issues/23)；不“恢复为空正文” |
| Δ03 | [PM21](https://github.com/Pepgent/PM/issues/21) → [remote14](https://github.com/Pepgent/remote/issues/14) | 真实父子边存在；child id=6144755477 | 不存在 | V11B；I 3.5、S2 实际 PARENT；未找到逐边 Main 指令，不冒认 X-85 本身逐字要求挂边 | D15-07 | 移除该子边（不是删评论中的链接）；仅 remote14 这一边，不处理 PM21 其他 children |
| Δ04 | 新 worktree `/Users/mouriya/Ext/worktrees/issue-14-slurm-oci-d2a2e42` | 注册新分支/B；clean，无需丢弃未提交补丁 | 不存在 | X-85；I 3.7、S1/S3/M；W1 直接创建佐证待双核范围确认 | D15-06 | 移除这个会话新建 worktree；不删根 checkout，不删 `.workers` 会话目录；在删除本地分支前处理 |
| Δ05 | 本地 `refs/heads/issue-14-slurm-oci` | B | 不存在 | X-85；I 3.6、S2/S4、W1（暂行） | D15-06 | worktree 移除后删除本地新分支；**不是恢复到 A**（A 是起点代码，不是该新分支会话前 ref） |
| Δ06 | 远端 `refs/heads/issue-14-slurm-oci` | `ls-remote` 当前 B | 不存在 | X-85；I 3.6、S4/H1；W2 的 `[new branch]` 为直接佐证待双核确认 | D15-06 | 删除远端新分支；不 force-push A，不动其他六个旧分支；origin 跟踪 ref 只作派生副本处理 |
| Δ07 | B 上 `README.md` 增量 | 43 行 diff；旧 digest/SIF、cancel-on-remove 及 Komodo 启动失败公开描述被替换 | A 文件完整内容；G2 minus hunks | X-85；I 3.4、S1、G2 | D15-06 | 随新分支/树丢弃增量；A 的接口、网络、boot、凭据、生命周期旧正文全部保留；不在 main 改文档 |
| Δ08 | B 上 `design/remote.md` 增量 | 16 行 diff；接口 remove、Slurm catalog/identity、后端表、Komodo 段、Slurm 生命周期改写 | A 文件；G2 minus hunks | X-85；I 3.4、S1、G2 | D15-06 | 随新分支/树丢弃；含 k8s 表的会话修正一并丢弃，不把旧设计整体删除 |
| Δ09 | B 上 `src/backend/slurm/mod.rs` 增量 | 47 行 diff；新增 wait_terminal/poll_terminal、修改 body/step script 引用 | A 的有界 wait 与旧镜像调用；G2 | X-85；I 3.4、G2 | D15-06 | 随新分支/树丢弃；保留 A 的既有 Slurm 后端实现 |
| Δ10 | B 上 `src/identity.rs` 增量 | 19 行 diff；slurm_identity async resolver、step accessor 与 caller 修改 | A 的同步 slurm_identity 和既有 identity 实现；G2 | X-85；I 3.4、G2 | D15-06 | 随新分支/树丢弃；保留 A 的目录身份及 Komodo/k8s 代码 |
| Δ11 | B 上 `src/model.rs` 增量 | 28 行 diff；step_image:String→SlurmImage、去 digest 字段、source/解析修改 | A 中 SlurmImage digest/严格 URI、step_image:String；G2 | X-85；I 3.4、G2 | D15-06 | 随新分支/树丢弃；保留 A 全部类型与旧模型实现 |
| Δ12 | B 上 `src/ops.rs` 增量 | 1 行替换（diff 两行）：Slurm remove 调用 wait_terminal | A 调用 `slurm.abort_status(handle).await?`；G2 | X-85；I 3.4、G2 | D15-06 | 随新分支/树丢弃；保留 A 的操作生命周期代码，不触碰旧 PR13 的合法实现 |

**冻结 BLOCKED：0 项。** 12 行均有可得会话前状态（新对象为“不存在”）及归因；W 类证据的授权解释仍须双核确认，已显式隔离，不能把本包当预审已通过。若双核否定 W 且认为主会话/当前对象/目录证据不足以确定本地或远端新建，执行方应将 Δ04–Δ06 相应对象转为原地冻结，不能用推测补足。本报告不预先替双核作这一解释裁决。

动作顺序建议只表达生命周期约束：先关闭新 PR/issue、移除新父子边，再移除 clean 新 worktree，最后删除其本地/远端新分支。main 没有 revert 顺序号。新分支删除不要求主动删除 Git 对象数据库中的 B；不做 gc 或历史改写。

## 4. 表三：保护段落/对象表（49 项）

“保护”只限定列出的内容/对象，不把同名文件的会话新增部分一起保住。P01–P25 是 remote 本地盘点触及的保护边界；P26–P49 是 D15 明令要求列出的**跨仓排除边界**，仅据已通过 D15/LEDGER 登记，不冒称本执行者已经逐仓核验作者和源会话；具体提交内段落核验由对应仓执行者负责。

| ID | 内容段或对象 | 标记 | 依据与保留范围 |
|---|---|---|---|
| P01 | main/A 中除下列六文件外的全部既有树内容 | 保护 | D15-01①；S01、G1/G2，main 未吸收 B；不得改 main 历史或丢旧运行代码 |
| P02 | `README.md` 的 A 原文及 B 未修改段落 | 保护 | D15-01①；旧 [PR12](https://github.com/Pepgent/remote/pull/12) 04:22:45Z 已合；Δ07 只处置 B 增量 |
| P03 | `design/remote.md` 的 A 原文及 B 未修改段落 | 保护 | D15-01①；既有设计、REM 切片与文档成果；Δ08 不是整文件删除 |
| P04 | `src/backend/slurm/mod.rs` 的 A 实现 | 保护 | D15-01①、L R13；旧 [PR2](https://github.com/Pepgent/remote/pull/2) 已合；保留既有 backend，Δ09 只丢 B 变化 |
| P05 | `src/identity.rs` 的 A 实现 | 保护 | D15-01①；旧 [PR8](https://github.com/Pepgent/remote/pull/8) 的模板身份成果；Δ10 不伤既有代码 |
| P06 | `src/model.rs` 的 A 实现 | 保护 | D15-01①；既有模型/接口；Δ11 只丢本会话模型增量 |
| P07 | `src/ops.rs` 的 A 实现 | 保护 | D15-01①；旧 [PR13](https://github.com/Pepgent/remote/pull/13) 的终态与 remove 生命周期实现；Δ12 不回退 A |
| P08 | 六个旧分支及当前/会话前 tip（S02–S07 逐个列名） | 保护 | D15-01①；旧 PR head 字段、S4 与 G1；不因已合并而顺便清理旧分支 |
| P09 | [issue1](https://github.com/Pepgent/remote/issues/1) 正文/CLOSED 状态 | 保护 | S10；会话前遗产，无本会话候选写动作 |
| P10 | [issue3](https://github.com/Pepgent/remote/issues/3) 正文/CLOSED 状态 | 保护 | S11；会话前遗产 |
| P11 | [issue4](https://github.com/Pepgent/remote/issues/4) 正文/CLOSED 状态 | 保护 | S12；不能把新 #14 与原 REM-07 混同 |
| P12 | [issue5](https://github.com/Pepgent/remote/issues/5) 正文/CLOSED 状态 | 保护 | S13；会话前遗产 |
| P13 | [issue6](https://github.com/Pepgent/remote/issues/6) 正文/CLOSED 状态 | 保护 | S14；会话前遗产 |
| P14 | [issue7](https://github.com/Pepgent/remote/issues/7) 正文/DUPLICATE 关闭状态 | 保护 | S15；不重开重复项 |
| P15 | [issue11](https://github.com/Pepgent/remote/issues/11) 正文/CLOSED 状态 | 保护 | S16；会话前文档 issue |
| P16 | 旧 [PR2](https://github.com/Pepgent/remote/pull/2) 及已发正文/评论 | 保护 | D15-01①/03，mergedAt=00:46:54Z；不回写已合 PR |
| P17 | 旧 [PR8](https://github.com/Pepgent/remote/pull/8) 及已发正文/评论 | 保护 | D15-01①/03，mergedAt=02:29:46Z |
| P18 | 旧 [PR9](https://github.com/Pepgent/remote/pull/9) 及已发正文/评论 | 保护 | D15-01①/03，mergedAt=02:46:46Z |
| P19 | 旧 [PR10](https://github.com/Pepgent/remote/pull/10) 及已发正文/评论 | 保护 | D15-01①/03，mergedAt=04:03:09Z |
| P20 | 旧 [PR12](https://github.com/Pepgent/remote/pull/12) 及已发正文/评论 | 保护 | D15-01①/03，mergedAt=04:22:45Z |
| P21 | 旧 [PR13](https://github.com/Pepgent/remote/pull/13) 及已发正文/评论 | 保护 | D15-01①/03，mergedAt=05:24:44Z |
| P22 | main 上 PR13 merge 对象 A 与原六个旧分支提交 | 保护 | 会话前已存在；仅作对象地址，禁止为“清理”重写历史/删除 Git 对象 |
| P23 | `/Users/mouriya/Ext/code/pepgent/pepgent-remote` 根 checkout | 保护 | S19；会话前路径，D15-03 只移除会话新建树 |
| P24 | `.workers/eng-rt/sessions` 及全部后代证据目录 | 保护 | D15-01④；虽本会话新建也保留。已发现工程 session 目录含 RemoteMentor 记录；不删除 worker 整根 |
| P25 | 已发 [issue14 STARTED](https://github.com/Pepgent/remote/issues/14#issuecomment-6555434687)；PR15 的 [driver](https://github.com/Pepgent/remote/pull/15#issuecomment-6555564569)、[before](https://github.com/Pepgent/remote/pull/15#issuecomment-6555565085)、[after](https://github.com/Pepgent/remote/pull/15#issuecomment-6555565625)、[review](https://github.com/Pepgent/remote/pull/15#issuecomment-6555605906) | 保护（不可变记录，不赋予实现合法性） | D15-03 已发评论不改；H3 当前四个 PR 评论与 W 中 STARTED 链接。保留记录不代表认可其中运行/评审结论 |
| P26 | PM `e519e5b` 的 U57 30 份报告归档 | 保护（跨仓排除） | D15-01②、L R10；不读取禁读原会话、不处理 PM 文件 |
| P27 | soroi `6c1faea` 的双核 agent 定义/授权内容 | 保护（跨仓排除） | D15-01②、U77–U78；本仓无此提交改动 |
| P28 | soroi `bdaa278` 的 U80 LEDGER 整理及 AGENTS/secretary/watchdog 对齐段 | 保护（跨仓排除） | D15-01②；只保护 argon 族段，不保护同文件其余 leader 新增段 |
| P29 | soroi `80b0267` 的 R 编号、C3-3 对齐段 | 保护（跨仓排除） | D15-01②、U80；由 soroi 执行者逐段核对 |
| P30 | soroi `b521200` 的 U81–U82 逐字记录段 | 保护（跨仓排除） | D15-01②；用户原话/argon 族授权 |
| P31 | PM argon 基线/规范及修订：`37e6c73`、`f88748d`、`dc7893c`，含 D15-governance-baseline 的 VG-4 修订 | 保护（跨仓排除） | D15-01②；逐提交地址列名，不假定 remote 存在这些对象 |
| P32 | PM `evidence/argon/D15-08-replacements.md` | 保护（跨仓排除） | K、D15-08；由秘书执行 argon 过渡替换，不由 remote 执行者改写 |
| P33 | 秘书逐字记录用户原话/原样归档 argon 产物的提交与内容段 | 保护（跨仓排除） | D15-01②；本仓六文件 B 增量无此类保护段证据，不能据“文档”二字保住 B；跨仓精确清单交 PM/soroi 执行者 |
| P34 | Pepgent `978bc0e` | 保护（跨仓排除） | D15-01③ 无关前端会话；不访问其根 checkout |
| P35 | Pepgent `2d46c1d` | 保护（跨仓排除） | D15-01③ |
| P36 | Pepgent `286f8cb` | 保护（跨仓排除） | D15-01③ |
| P37 | Pepgent `1038aee` | 保护（跨仓排除） | D15-01③ |
| P38 | Pepgent `21f4217` | 保护（跨仓排除） | D15-01③ |
| P39 | Pepgent `e44f068` | 保护（跨仓排除） | D15-01③ |
| P40 | Pepgent `b212fb6` | 保护（跨仓排除） | D15-01③ |
| P41 | Pepgent `a331057` | 保护（跨仓排除） | D15-01③ |
| P42 | Pepgent `f35103b` | 保护（跨仓排除） | D15-01③ |
| P43 | Pepgent `f7a3313` | 保护（跨仓排除） | D15-01③ |
| P44 | Pepgent `a9756eb` | 保护（跨仓排除） | D15-01③ |
| P45 | Pepgent `d110c7c` | 保护（跨仓排除） | D15-01③ |
| P46 | Pepgent `e83c2f2` | 保护（跨仓排除） | D15-01③ |
| P47 | Pepgent `9a6d455` | 保护（跨仓排除） | D15-01③ |
| P48 | Pepgent `031d01c` | 保护（跨仓排除） | D15-01③ |
| P49 | 他仓会话前遗产：images `d40585f`；deploy `dded751`/`56eaff7`；library `83ebca0`；Pepgent `feat/lab-10-library` 原提交；SOR-09 原实现、STO-05 原 5 修改+1 未跟踪补丁；mux `issue-13-mux-design` 原两稿；其他既有分支/PR | 保护（跨仓排除） | D15-01①；不因 remote/mux 被同一 eng-rt 接续而把 mux 文件/树混入 remote 删除范围 |

## 5. 本次只读取证的关键命令与实际观察

### 当前 refs 与工作树

```sh
git rev-parse HEAD main origin/main
git for-each-ref --format='%(refname) %(objectname)'
git worktree list --porcelain
GIT_OPTIONAL_LOCKS=0 git status --short --branch
git ls-remote --heads origin
```

关键输出：

```text
HEAD/main/origin-main: 1c2408d6258e4dfad26f4f3607ab641098efee43
remote refs/heads/main: 1c2408d6258e4dfad26f4f3607ab641098efee43
local/remote refs/heads/issue-14-slurm-oci: 5e61f47e234795f8a4bc5c80f5467a1035d9ada4

worktree /Users/mouriya/Ext/code/pepgent/pepgent-remote
HEAD 1c2408d6258e4dfad26f4f3607ab641098efee43
branch refs/heads/main

worktree /Users/mouriya/ext/worktrees/issue-14-slurm-oci-d2a2e42
HEAD 5e61f47e234795f8a4bc5c80f5467a1035d9ada4
branch refs/heads/issue-14-slurm-oci

## main...origin/main
```

Git 的注册路径使用小写 `ext`，派工/会话使用 `Ext`；本机读取指向同一实际 worktree，本包保留工具原始拼写，不据大小写造第二棵树。工作树上的 `GIT_OPTIONAL_LOCKS=0 git status --porcelain=v1 --untracked-files=all`、`git diff --stat`、`git diff --cached --stat` 均为空输出。这里是只读文件状态盘点，不是业务 runtime 验证。

### 点名对象内容

```sh
git show --format=fuller --stat 5e61f47
git show --format=fuller --no-patch 1c2408d
git cat-file -p 5e61f47
git diff --name-status 1c2408d 5e61f47
```

实际 parent：`1c2408d6258e4dfad26f4f3607ab641098efee43`。B 作者/提交者 RiriAgent，CommitDate=`2026-11-01 17:22:31 +0900`（08:22:31Z）。实际 6 文件、83 additions/72 deletions：

```text
M README.md
M design/remote.md
M src/backend/slurm/mod.rs
M src/identity.rs
M src/model.rs
M src/ops.rs
```

A 是旧 PR13 merge，CommitDate=`2026-11-01 14:24:43 +0900`（05:24:43Z）；与 GitHub mergedAt 05:24:44Z 各保留其原值。

### GitHub 当前对象与原始会话写操作

本次 `gh auth status` 显示 active account=`RiriAgent`，未切账号。所有 gh 命令仅 GET/view/list，没有 POST/PATCH/DELETE。PR15 当前 `OPEN`，`mergedAt=null`、`mergeCommit=null`；旧 6 个 PR 均在起点前合并。当前 8 个 issue 中仅 #14 OPEN，另外 7 个在起点前已关闭；新 #14 的父为 PM21、无子项。

秘书原始执行回执（S2）：

```text
CREATED https://github.com/Pepgent/remote/issues/14 Project=Todo
PARENT https://github.com/Pepgent/remote/issues/14 -> https://github.com/Pepgent/PM/issues/21
```

工程 W2 原始 push 回执（单独标记，范围解释待双核）：

```text
To https://github.com/Pepgent/remote.git
 * [new branch]      issue-14-slurm-oci -> issue-14-slurm-oci
branch 'issue-14-slurm-oci' set up to track 'origin/issue-14-slurm-oci'.
```

## 6. 预审结论边界与交付计数

- 表一 **21 项**，表二 **12 项**，表三 **49 项**；表二 **冻结 BLOCKED 0 项**，main revert **0 个**。
- 本仓需要处置的是一个未合并 PR、一个新 issue、一条新父子边、一棵新 clean worktree、其本地/远端新分支，以及该分支覆盖的六文件增量。六文件不是额外六次 main 写操作。
- 待双核明确：W 类工程会话属于 D15-02(a) 的范围解释。本包把其结论单列，未把咨询结论伪造成授权。
- 没有取不到且仍要执行的旧正文恢复项；remote 的 prepublish 列表为空。旧 issue/PR 与六个旧分支均不拟写入；未把“未找到逐边 Main 指令”混同“未找到任何归因”，S2 的秘书创建链和 V11B 已提供实际归因。
- `.workers/eng-rt/sessions` 不在删除范围。PM/其他仓保护项只是排除边界，不代表跨仓检查已由本执行者完成。
- 本次是只读盘点完成，不是回退完成，也不是 runtime 验证。③实际执行、④独立核验和⑤秘书状态替换均未开展；必须先经 Argon、ArgonGovernance 预审。
