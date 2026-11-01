# D15-10② · Pepgent/lab-library 只读预审包

## 0. LEDGER `4455170` 逐项核对记录（U69）

本记录用于本次只读盘点，不宣称完成回退、独立核验或工程恢复。已完整读执行契约、D15 定稿、LEDGER 当前全文，并在 **soroi 仓库**读取点名对象 `git show 4455170:LEDGER.md`；不是以当前文件代替指定版本。以下“已遵守”只指本执行者本次行为，“范围外”不重写台账状态。

| 条款 | 本步核对与落实 |
|---|---|
| C1-1 | 只盘点 lab-library；不修改 omp/soroi 产品，不从旧提交历史提取设计。 |
| C1-2 | 只读本仓及其注册 worktree；未触碰 Pepgent/Pepgent 根 checkout，未联系无关会话。 |
| C1-3 | 未缩减 D15 对象范围；未写或跑测试、build、lint、runtime；提交标识仅作为对象地址，不作为 hash 验证证据。 |
| C1-4 | 未启动容器、VM、Slurm、Komodo；未接触生产或 SOPS。 |
| C2-1 | 执行已通过契约，不自创处置标准；来源缺口和定稿对象不一致处冻结，交双核预审。 |
| C2-2 | 自行完成本仓取证，不要求 Argon/ArgonGovernance 代查；不联系任何 agent。 |
| C2-3 | 不投票、不改已通过正文；本包只列观察、来源与按 D15 拟执行动作。 |
| C2-4 | 保护用户直接授权及 argon 族授权产物，不另行投票豁免。 |
| C3-1 | 一名执行者只负责一仓的只读对象盘点；没有派生其他调查者。 |
| C3-2 | 本执行者是治理分身的有界子任务，不自称独立投票席。 |
| C3-3 | 不参与设计或重大决策；不增删已通过的高阶审查要求。 |
| C3-4 | 未启动/恢复 tern、未创建/切换分支或 worktree；所有 Git 操作只读，status 显式禁用可选锁。 |
| C3-5 | 未修改共享 skill、角色或本仓 AGENTS。 |
| C4-1 | 不发 GitHub 评论，不把盘点当工程 DONE；交付限定为指定 local 预审文件。 |
| C4-2 | 中文；未用 peer、agent 消息或 PTY omp，不联系会话。 |
| C4-3 | refs 向本地 Git 与远端 ls-remote 查询，issue/PR 向当前 GitHub 对象查询；本包是待预审草稿，不写 LEDGER，不另设持久状态源。 |
| C5-1 | 仅读授权会话 01a195a6 及其子记录；未读被禁止的 01a193fd。任务无 task 工具且禁止联系 agent，未进行导师前审。 |
| C5-2 | 本节逐项记录 C1–C5、R1–R21；不是只写一项笼统“已核对”。 |
| C5-3 | 分清 main 会话中合并与会话前分支产物，特别保护 `83ebca0`；未执行任何丢弃。 |
| C5-4 | 工程冻结保持；完成全部可达只读盘点，不将冻结解释为停止治理。 |
| R1 | 旧设计转向调查不在本步；不重开，不读禁止会话。 |
| R2 | 不补写 design，也不以 D10–D14 回写为已生效基线。 |
| R3 | 保持组件独立，不建仓、不迁仓。 |
| R4 | 保护双核定义与其授权产物；不修改实例或定义。 |
| R5 | 使用已通过 [D15 / PM#23](https://github.com/Pepgent/PM/issues/23)，不另起决策或改票。 |
| R6 | 只完成治理分身交付切片；归档和 LEDGER 由指定秘书负责。 |
| R7 | 不新增监视器、行为分析或其他子任务。 |
| R8 | 不恢复工程会话，不跨仓工程，不改变模型/扩展。 |
| R9 | 不切分支、不提交、不 push、不发常规进度评论。 |
| R10 | 用户授权的 30 份报告受保护；未读其目标旧 session。 |
| R11 | U80 整理与其修正受保护；不修改 LEDGER。 |
| R12 | 既有环境不在盘点验收范围；没有重跑探活或环境验证。 |
| R13 | 本仓会话前 LIB-01 遗产保留；会话中 PR 合入与分支/worktree 分开列。 |
| R14 | soroi 工程和遗产由其执行者负责，本步不操作。 |
| R15 | Pepgent 业务仓与无关前端提交不操作，保护名单逐 SHA 列明。 |
| R16 | 不开展统一 e2e，不宣称 A0/F01–F31 通过。 |
| R17 | 不开展 D9/F32 差距分析。 |
| R18 | 依已归档 INDEX/G6 继续只读取证，不恢复已停止工程师。 |
| R19 | D15 已建立，按定稿及执行契约盘点；发现 PR6 点名 SHA 与当前对象冲突，不改定稿。 |
| R20 | 本步仅 D15-10②；差集是拟动作，所有执行仍须双核预审和下一步派发。 |
| R21 | 不做双核复核或恢复派工；不把本包当成解冻批准。 |

## 1. 方法、范围与决定性观察

**决定性问题：** 能否仅用 D15-02 授权来源，分离本仓 05:48:24Z 已存在的 main/分支/issue/README 产物与之后新增的合入、issue、分支、worktree，并在不破坏 `83ebca0` 的前提下形成可预审动作清单？

步骤：读取定稿与索引 → 当前 refs/PR/issue/关系/worktree → 点名对象及相互 diff → 授权会话证据 → 下列三表。最便宜且决定方向的观察是 **PR6 的当前 base/head/merge 字段，以及 `83ebca0` 的提交时间和内容**：它是会话前的 README patch，不是本会话新编代码；本会话新增的是合并动作。

边界：不运行 git log/reflog、不遍历历史、不读 GitHub 编辑历史或 timeline；不发评论、不调用写 API、不 fetch、不 checkout、不 commit/push、不移除目录。唯一主动写入是本文件。读取旧报告时看到其中曾使用历史命令的记载，不执行那些命令，也不把其 reflog/timeline 结论当作本包的新增授权。

**不作的假设：** commit 时间不等于分支或 worktree 创建时间；当前没有父边不等于会话前没有父边；当前 PR head 不自动证明一个远端 ref 在 05:48:24Z 的精确位置。缺口单独冻结。

### 1.1 来源键（供三表引用）

- **K**：`local://exec/d15/CONTRACT.md`；已通过 D15 定稿 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D15-private-decision-discard.md`（全文，含长行）；LEDGER 点名版本 `4455170`。本包所列其他仓保护对象仅按 K 登记，并未越仓复验。
- **I**：`local://inv/d15/INDEX.md`：X-30、X-50、X-60、X-73、X-76；对象表 3.1–3.7 内本仓 issue/PR、commit、评论、README/13 节点、分支、worktree、workers 行；缺口 C-24/C-25。`local://inv/d15/G6.md` §3.1、§4 G6-01…04、§5、§6。
- **S1**：`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/StateInventory/entry/2a1983c8`（也可 `entry/@46`）：06:17:48Z 的 worktree 注册结果，library main=`0a2da95...`，旧树=`83ebca0...`。
- **S2**：同一子会话 `artifacts/135:423-438`，06:19:02Z：旧 issue5 OPEN、issue1/3 CLOSED，PR6 OPEN，PR2/4 MERGED；当时远端分支名称为 `e2e`、`issue-1-e2e-node-library`、`issue-3-f07-agent-negatives`、`issue-5-bundle-guidance`、`main`。该结果只列分支名，**没有三个旧保留分支的 SHA**。
- **G1**：本次 `git rev-parse HEAD main origin/main`、`git show-ref`、`git worktree list --porcelain`、`git ls-remote --heads origin`。不以 origin/main 本地副本代替远端源头。
- **G2**：本次 `git show -s --format='%H%n%P%n%aI%n%cI%n%s'` 读取点名对象 `83ebca0`、`5c2ddcb`、`beb07a9`、`8d291af`、`4cbb9f3`，以及由 PR6 当前对象点名的 `f622bcf`、`0a2da95`；读取 `git show --stat`、`git show 0a2da95:README.md`、`git diff 0a2da95 f622bcf`、`git diff f622bcf 8d291af`、`git diff 8d291af 4cbb9f3`，均为已点名对象之间比较。全部净变化文件为 README 与 13 个 nodes 文件，无其他路径。
- **G3**：四棵本仓注册 checkout 的 `GIT_OPTIONAL_LOCKS=0 git ... status --porcelain=v1 --untracked-files=all` 均无输出；本次只观察 Git 可见修改/未跟踪，不删除 ignored 的 node_modules 或其他环境文件。`stat -f '%B %N'` 的目录出生值换算 UTC：根 00:02:02、旧 issue5 树 05:13:10、library-8 08:19:20、library-10 08:30:26。目录元数据仅辅助存在时点，创建动作另见 E。
- **H1**：本次 `gh issue list -R Pepgent/lab-library --state all --limit 100 --json number,title,state,body,createdAt,updatedAt,closedAt,url`，完整输出 `artifact://1156:raw:1-1`；`gh pr list ... --state all --json number,title,state,body,createdAt,mergedAt,baseRefName,baseRefOid,headRefName,headRefOid,mergeCommit,url`，完整输出 `artifact://1156:raw:2-2`。当前共 6 个 issue、5 个 PR；未见 open PR。
- **H2**：本次 `gh api 'repos/Pepgent/lab-library/issues?state=all&per_page=100' --jq '.[]|select(.pull_request==null)|{number,state,state_reason,created_at,updated_at,closed_at,html_url}'`：issue1/3/5/7/8/10 均 closed、state_reason=completed。
- **H3**：本次对 issue1/3/5/7/8/10 各做 GET `.../parent` 与 `.../sub_issues`；每个 parent 返回明确 `No parent issue found` 404，children 为空。此为当前关系，不冒称会话前关系。
- **H4**：本次本地 `git show ... 34c887d` 返回 `fatal: ambiguous argument '34c887d': unknown revision...`；远端当前对象 GET `gh api repos/Pepgent/lab-library/commits/34c887d` 返回 HTTP 422 / `No commit found for SHA: 34c887d`。这是对象定位失败，不是 hash 校验。
- **F**：`local://inv/d15/d10-rewrite-snapshot/lab-library.json` 为 `[]`；与本仓在批量改写时没有待改 OPEN D8 issue 相符，**没有可恢复本仓 issue5 正文的 prepublish 快照**。

### 1.2 单独标注的工程师记录（E：范围解释待双核确认）

契约要求本步先读 `.workers` 的 tern 工程师记录，但其是否属于 D15-02(a) 的“子 agent”由双核预审裁决。本包所有 **E** 结论单独标注；不混充 S1/S2 已明确属于主会话子 agent 的记录。

文件：`/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac.jsonl`。

- **E1**：entry `ae0439d7`，06:37:11Z，真实调用结果为 `0a2da95..f622bcf main -> origin/main`、`Updating 0a2da95..f622bcf`；与当前 PR6 base/merge 字段一致。
- **E2**：entry `5622668c`，06:34:21Z，改写/合并前读取的 issue5 完整正文（其后是 PR6 body，不应混为 issue正文）。本次 H1 的 issue5 正文与该部分可见内容一致；未提出正文覆盖动作。该旧正文入口的有效性仍待双核确认。
- **E3**：entry `63234084`，08:19:21Z：`Preparing worktree (new branch 'issue-8-file-input')`，HEAD=f622bcf；对应调用为 `git ... worktree add -b issue-8-file-input /Users/mouriya/Ext/worktrees/library-8 origin/main`。
- **E4**：entry `1e20acee`，08:30:26Z：`Preparing worktree (new branch 'issue-10-node-metadata')`，HEAD=8d291af；对应调用为 `git ... worktree add -b issue-10-node-metadata /Users/mouriya/Ext/worktrees/library-10 origin/main`。

E3/E4 是分支和路径“会话中新建”的直接记录；G6 与 stat 是旁证。若双核不接受 E，则差集 D08–D11 的删除/移除动作必须转冻结，不能仅凭 tip 时间替代创建证据。

## 2. 三表预审结论摘要

1. **main 当前为 `4cbb9f33df04c3df3725bbfc657f7656f4e69616`，会话前候选基线为 `0a2da95df801239c01c82bde8f77b4e7e0331005`。** 来源组合为当前 PR6 base、S1/S2 合并前快照与 E1 old..new；没有遍历提交历史。
2. **重要定位冲突：D15 定稿写 PR6 merge=`34c887d`，当前 PR6 实际 merge=`f622bcf3b8043597cd1d60433bfde66ef4487498`。** 后者两父对象为 main 会话前位置与受保护 `83ebca0`；前者在本地和远端当前对象均取不到。下表 D03 冻结，不能对 `83ebca0` 单独 revert，也不把不存在的 SHA 静默改成另一个执行。
3. PR11 → PR9 → PR6 为按 **Git commit 时间** 从新到旧的拟顺序。PR6 的第 3 步待双核确认对象更正及旧 patch 的保留边界。PR9/11 的功能提交不另重 revert，避免同一 patch 撤两遍。
4. 新 issue7/8/10 当前虽已 CLOSED，但原因是 **completed**，不等于 D15 要求的 not planned。下一步应改为 not_planned 并追加引用 [PM#23](https://github.com/Pepgent/PM/issues/23) 的说明，不改旧评论或已合并 PR body。
5. 当前无父子边；旧 issue5 的会话前真实父子边缺证据，不能由当前空关系推出，D12 冻结关系对象。旧分支 e2e/issue1/issue3 的精确会话前 ref 亦缺证据，D13–D15 原地冻结（不是认定这些旧分支有污染）。

## 表一：05:48:24Z 会话前状态（19 条）

| ID | 对象 | 会话前状态 / 内容来源 | 当前状态及证据 |
|---|---|---|---|
| B01 | main | `0a2da95df801239c01c82bde8f77b4e7e0331005`；H1 PR6 base；S1/S2 合并前 main/PR6 OPEN；E1 的 old..new。该 commit 时间 04:52:45Z（G2）。 | 本地 main、HEAD、origin/main 及远端 main 均指向 `4cbb9f33df04c3df3725bbfc657f7656f4e69616`（G1）；不重写 main ref。 |
| B02 | `issue-5-bundle-guidance` | 既有 PR6 的 head=`83ebca02f25d2d22bdaac70c8ac1ec46b42777e3`；commit 05:20:17Z，PR6 05:21:01Z 已创建；S1 读取同一旧树/head；K 明确保护。 | 本地及远端仍为该对象（G1、H1）；保留，不强推、不删除。 |
| B03 | `issue-8-file-input` | E3 证明本会话 08:19:20Z `-b` 新建，之前不存在该 ref；S2 分支清单无此名。 | 本地/远端 `5c2ddcbb313cd0805cd12852f82c34a7a99f080d`（G1）。 |
| B04 | `issue-10-node-metadata` | E4 证明本会话 08:30:26Z `-b` 新建；S2 无此名。 | 本地/远端 `beb07a957ba7fdf741ecec4ee4d8b84930d03aaa`（G1）。 |
| B05 | `e2e` | S2 06:19 已列为旧保留分支；05:48:24Z 的精确 ref SHA 未取到，不能用旧 commit 日期代替。 | 仅远端及本地 remote-tracking，当前 `7db341c3489dac0f8e48837d8fd6c3eb98c9e48a`；冻结，见 D13。 |
| B06 | `issue-1-e2e-node-library` | 会话前 [PR2](https://github.com/Pepgent/lab-library/pull/2) 的 head 为 `0a93001...`、00:43:24Z 已合并，S2 有同名分支；精确会话前 ref 不由当前 PR head 倒推。 | 本地/远端 `0a93001e378f3f114f48b97074aaac51e7303eab`；冻结，见 D14。 |
| B07 | `issue-3-f07-agent-negatives` | 会话前 [PR4](https://github.com/Pepgent/lab-library/pull/4) 的 head 为 `1c76fab...`、02:44:49Z 已合并，S2 有同名分支；精确会话前 ref 缺口。 | 本地/远端 `1c76fab06be7edc77216244f33e1e1a060104698`；冻结，见 D15。 |
| B08 | [issue5](https://github.com/Pepgent/lab-library/issues/5) | 04:58:18Z 已创建；S2 OPEN，updatedAt=05:21:30Z；E2 有合并前完整正文。K 明确要求重开。 | CLOSED/completed；closedAt=06:37:10Z；H1/H2。正文未提出覆盖（E2 来源解释待审）。 |
| B09 | [issue7](https://github.com/Pepgent/lab-library/issues/7) | 不存在：createdAt=07:16:42Z，S2 无此对象，K 明确会话新建。 | CLOSED/completed，closedAt=09:30:05Z；文档对齐由 PR9 满足；H1/H2、I。 |
| B10 | [issue8](https://github.com/Pepgent/lab-library/issues/8) | 不存在：createdAt=07:47:39Z，K 明确会话新建。 | CLOSED/completed，closedAt=09:29:19Z；H1/H2。 |
| B11 | [issue10](https://github.com/Pepgent/lab-library/issues/10) | 不存在：GitHub createdAt=09:30:23Z；K/I 明确本会话对象。GitHub 时钟与本地记录约差一小时，不擅自校正。 | CLOSED/completed，closedAt=09:35:59Z；H1/H2。 |
| B12 | [issue1](https://github.com/Pepgent/lab-library/issues/1) | CLOSED，自00:43:26Z；S2 与 H1/H2 早于基线的关闭时间一致；正文未见本会话改写归因。 | CLOSED/completed，updatedAt=00:47:04Z；保护，不重开。 |
| B13 | [issue3](https://github.com/Pepgent/lab-library/issues/3) | CLOSED，自02:44:51Z；S2 与 H1/H2 一致；正文未见本会话改写归因。 | CLOSED/completed，updatedAt=02:44:51Z；保护，不重开。 |
| B14 | [PR6](https://github.com/Pepgent/lab-library/pull/6) | OPEN；base=main `0a2da95...`，head=`83ebca0...`；05:21:01Z 创建，S2 在合并前读取 OPEN；旧 body 由 E2 同一完整结果中 PR 部分保存。 | MERGED，merge=`f622bcf...`，06:37:08Z；与定稿 `34c887d` 冲突。PR body/评论不改。 |
| B15 | `/Users/mouriya/Ext/code/pepgent/pepgent-lab-library` | 既有根 checkout；目录 birth 00:02:02Z，S1 main=0a2da95。 | main=4cbb9f3，Git 可见 clean（G1/G3）；根 checkout 不移除。 |
| B16 | `/Users/mouriya/ext/worktrees/issue-5-bundle-guidance-600bf93` | 目录 birth=05:13:10Z；S1 注册、K 保护 PR6 原产物；早于基线。 | `issue-5-bundle-guidance`，83ebca0，Git 可见 clean；保护旧树。 |
| B17 | `/Users/mouriya/Ext/worktrees/library-8` | 会话前不存在；E3 新建记录，G3 birth=08:19:20Z。 | 分支 issue-8-file-input，5c2ddcb，Git 可见 clean。 |
| B18 | `/Users/mouriya/Ext/worktrees/library-10` | 会话前不存在；E4 新建记录，G3 birth=08:30:26Z。 | 分支 issue-10-node-metadata，beb07a9，Git 可见 clean。 |
| B19 | 旧 [issue5](https://github.com/Pepgent/lab-library/issues/5) 的真实父子边 | **未知**。S2 只读状态/标题，E2 正文不是 GitHub 真实关系；F 无本仓 prepublish；I 未给本仓移边命令。 | H3：parent明确404、children为空；不倒推会话前空关系。新 issue7/8/10 会话前不存在，故其会话前父子边为空；当前也为空。 |

说明：PR9/PR11 会话前均不存在（H1 的创建时点、I/K 点名）；已在差集 D01/D02 列其完整对象链，未在表一重复增行。

## 表二：现状 − 会话前 − 保护名单（15 条，5 条冻结 BLOCKED）

所有动作均是预审候选，**本步没有执行**。D08–D11 对 E 来源的依赖见 §1.2。按对象合并代码文件与其 PR 归因，但 issue、ref、worktree、真实关系独立成行。

| ID | 对象 | 现状 | 会话前状态 | INDEX 归因 | D15 行 | 拟执行动作 / 缺口 |
|---|---|---|---|---|---|---|
| D01 | main 上 [PR11](https://github.com/Pepgent/lab-library/pull/11) 合并；`4cbb9f33df04c3df3725bbfc657f7656f4e69616`，功能提交 `beb07a9...` | MERGED；README 4 行新增，13 节点 JSDoc；还改 ask_human 的 SOR-13 注释。Git commit时间08:35:57Z，H1 mergedAt09:35:57Z，各保留原值。 | 无本 PR/本轮元数据；其第一父为8d291af。 | X-76；I/G6-04、G2。具体 group/0 估时为 owner 选择，不伪造 Main 逐字段指令。 | D15-06、03 | **revert 顺序1**：对 merge `4cbb9f3...` 用 `-m 1`，经 revert PR 合 main；不再单独 revert beb07a9。保留13节点原运行体。 |
| D02 | main 上 [PR9](https://github.com/Pepgent/lab-library/pull/9) 合并；`8d291afc6e9a7f57432bd6832aaa124fb4733f82`，功能提交 `5c2ddcb...` | README + run_gp/run_knn/run_lr/run_rf/run_svm；File 参数、stat 字节评分、File 根示例、regular-file 与静态导出说明。Git08:29:17Z，H1 mergedAt09:29:18Z。 | 无本 PR/本轮 File 改动；其第一父=f622bcf，五节点film:string。 | X-73；X-60 是 File 议题前因；I/G6-02/03、G2。 | D15-06、03 | **revert 顺序2**：merge用 `-m 1`；不重复 revert 5c2ddcb。只撤本轮 File/README 修改，旧节点公式及其他来源保留。 |
| D03 | main 上 [PR6](https://github.com/Pepgent/lab-library/pull/6) 的会话中新合并 | 当前 merge=`f622bcf3b8043597cd1d60433bfde66ef4487498`，Git06:37:08Z；两父=0a2da95、83ebca0。定稿点名34c887d，本地无对象、远端422。 | main=0a2da95，PR6 OPEN，83ebca0 已在旧分支受保护。 | X-30；K、H1/H4、G2、S1/S2；E1支持实际merge。 | D15-06、03、01 | **冻结 BLOCKED（拟顺序3）**：缺双核对定稿 SHA 冲突的对象更正结论；并须确认“撤销会话中新合并、旧branch/旧patch完整保留”边界。不得以 revert83ebca0 替代。候选是merge f622bcf `-m 1`，不是本步批准。 |
| D04 | [issue5](https://github.com/Pepgent/lab-library/issues/5) 开关 | closed/completed，PR6 合并后关闭；H2。 | OPEN，S2；旧正文见E2，当前无可见正文差异。 | X-30；I/G6-01；K 明确重开。 | D15-06、03 | 重开，**不覆盖正文**；正文没有待恢复差异且E2有效性待审。若采用契约附带非阻断建议，新增引用PM#23的作废说明，不编辑旧评论；该建议由双核决定。 |
| D05 | [issue7](https://github.com/Pepgent/lab-library/issues/7) | closed/completed；D10静态导出文档同步，后由PR9满足。 | 不存在。 | I明确“未找到Main新建issue7专门指令”；关联V10-11(c)，K明确列入新建issue。 | D15-06、03 | 按 **not planned** 关闭/改关闭原因，并追加引用PM#23说明；不是把已closed当已执行。此处按D15已定清单，不补造Main创建指令。 |
| D06 | [issue8](https://github.com/Pepgent/lab-library/issues/8) | closed/completed。 | 不存在。 | X-73、V10/V11A；I。 | D15-06、03 | 改为closed/not_planned，追加引用PM#23说明；不改既有评论。 |
| D07 | [issue10](https://github.com/Pepgent/lab-library/issues/10) | closed/completed。 | 不存在。 | X-76、V12；I。 | D15-06、03 | 改为closed/not_planned，追加引用PM#23说明；不改既有评论。 |
| D08 | 本地及远端 `issue-8-file-input` ref | tip=5c2ddcb，PR9已合。 | E3直接证明会话中新建。 | X-73；I分支行、E3。 | D15-06、03 | 删除会话新建本地/远端分支；先结束其worktree（D10）。不是force恢复旧ref。E范围解释不获接受则转冻结。 |
| D09 | 本地及远端 `issue-10-node-metadata` ref | tip=beb07a9，PR11已合。 | E4直接证明会话中新建。 | X-76（I分支行同时关联X-73）；E4。 | D15-06、03 | 删除本地/远端新分支；先移除D11。E范围解释不获接受则转冻结。 |
| D10 | `/Users/mouriya/Ext/worktrees/library-8` | 5c2ddcb，Git可见clean。 | E3新建；G3目录birth。 | X-73；I worktree行、G6§5.3。 | D15-06、03 | 移除会话新建worktree；不触碰旧issue5树或.workers证据目录。E范围解释不获接受则冻结。 |
| D11 | `/Users/mouriya/Ext/worktrees/library-10` | beb07a9，Git可见clean。 | E4新建；G3目录birth。 | X-76；I worktree行、G6§5.3。 | D15-06、03 | 移除会话新建worktree；不以其ignored环境文件推定可另做全局清理。E范围解释不获接受则冻结。 |
| D12 | [issue5](https://github.com/Pepgent/lab-library/issues/5) 的真实父子关系 | parent404、children空（H3）。 | 未取到会话前边快照或本会话关系写命令。 | 未找到本仓移边归因；I无对应边，F为空。 | D15-02（对D15-04/06关系恢复的缺口检查） | **冻结 BLOCKED**：缺会话前真实父子边记录；原地不动，不从正文链接或当前空集合推断。只冻结关系恢复，不阻止K明确要求的D04重开。 |
| D13 | 远端 `e2e`（含本地tracking副本） | 7db341c...。 | 精确05:48:24Z ref未知；S2只列分支名。 | 未找到本会话改ref归因。 | D15-02（D15-06差集边界） | **冻结 BLOCKED**：缺旧ref SHA和会话变化归因；不删、不恢复、不用tip时间当创建时间。 |
| D14 | 本地/远端 `issue-1-e2e-node-library` | 0a93001...。 | 旧PR2 head已知，精确会话前ref未知。 | 未找到本会话改ref归因。 | D15-02（D15-06差集边界） | **冻结 BLOCKED**：保留旧ref；不由已合PR字段独自推出它未被移动。 |
| D15 | 本地/远端 `issue-3-f07-agent-negatives` | 1c76fab...。 | 旧PR4 head已知，精确会话前ref未知。 | 未找到本会话改ref归因。 | D15-02（D15-06差集边界） | **冻结 BLOCKED**：保留旧ref；缺失来源同D14。 |

D12–D15 是保守的盘点缺口行，**不是已经证明存在变化的可执行回退行**。不把未知状态算成已污染对象。D15-04 的批量正文恢复在本仓无已证实条目：F为[]，没有据此凭空生成正文恢复任务。D15-05无本仓专属对象，D15-07的既有同步评论保持不可变，暂停说明由秘书统一处理。

## 表三：保护段落 / 对象表（45 条，均为“保护”）

保护以内容来源为单位；P03–P11只覆盖 `83ebca0` 的旧patch，不覆盖后来5c2ddcb/beb07a9改到同一README的全部新段。恢复会话前main与保留旧分支产物是不同操作；PR6定位/保留边界未确认前D03冻结。本表跨仓P20以后是K要求登记的全局保护红线，不是本仓执行者已复验这些仓。

| ID | 受保护内容 / 对象 | 标记与依据 / 执行边界 |
|---|---|---|
| P01 | main会话前树 `0a2da95...` 的全部既有文件、设计依据与实现 | **保护**；K、H1 PR6 base、S1/S2、G2。回退不重造/覆盖无差异文件。 |
| P02 | `83ebca02f25d2d22bdaac70c8ac1ec46b42777e3` 原始commit与 `issue-5-bundle-guidance` ref | **保护**；K明确点名，G2提交05:20:17Z、README +21/-17；不单独revert，不删branch。 |
| P03 | 83ebca0 README“安装与构造器解析”的自动私有快照/恢复依赖首段 | **保护**；G2 0a2da95→83ebca0 来源。后续5c2ddcb加入regular-file限定不在本保护增量。 |
| P04 | 同段host提供 `omp-soroi/node`、optional peer、不手工symlink说明 | **保护**；G2、K；不与后续实现或D10追认混因。 |
| P05 | 83ebca0 README的store启动、从Lab cwd加载插件包目录的两组示例 | **保护**；会话前README patch；不因PR6被本会话合并而销毁旧分支内容。 |
| P06 | 83ebca0 README的真实Git HEAD、manifest/lock、快照与清理生命周期段 | **保护**；G2；后加regular-file措辞另归D02。 |
| P07 | 83ebca0 README单文件bundle、执行物/源码归档段 | **保护**；G2，会话前来源。 |
| P08 | 83ebca0 README有界module-loader说明 | **保护**；G2；5c2ddcb对process.getBuiltinModule的后改措辞不自动受保护。 |
| P09 | 83ebca0 README的human构造器与正式槽位区别、节点表对应行 | **保护**；G2；beb07a9对ask_human源码JSDoc修改不是83ebca0原补丁。 |
| P10 | 83ebca0 README的dry-run File预览路径、formal取回与仅清理本次文件段 | **保护**；G2，会话前来源。 |
| P11 | 83ebca0 README集成依赖内SOR-13、SOR-06/17分工段 | **保护**；G2；5c2ddcb后加File根统一验收段另归D02。 |
| P12 | 旧worktree `/Users/mouriya/ext/worktrees/issue-5-bundle-guidance-600bf93` | **保护**；G3 birth05:13:10Z、S1旧注册、P02；不作为新worktree删除。 |
| P13 | 本仓既有 `AGENTS.md`、`.omp/agents/`、package.json、bun.lock、workloads及节点原运行体 | **保护**；G2净差只有README与13节点，前三个merge的diff明确修改边界；不清理ignored依赖或改工程环境。 |
| P14 | 会话前 [issue1](https://github.com/Pepgent/lab-library/issues/1)、[PR2](https://github.com/Pepgent/lab-library/pull/2) 及既有正文/评论 | **保护**；S2/H1/H2，关闭/合并均早于基线；不重开旧已交付issue。 |
| P15 | 会话前 [issue3](https://github.com/Pepgent/lab-library/issues/3)、[PR4](https://github.com/Pepgent/lab-library/pull/4) 及既有正文/评论 | **保护**；S2/H1/H2；F07旧成果不回滚为本会话新增。 |
| P16 | [issue5](https://github.com/Pepgent/lab-library/issues/5) 原有标题/正文 | **保护**；创建早于基线、S2旧标题及updatedAt；旧全文E2单独待审。只重开，不无依据覆盖正文；真实边缺口D12另列。 |
| P17 | 已合并 [PR6](https://github.com/Pepgent/lab-library/pull/6)、[PR9](https://github.com/Pepgent/lab-library/pull/9)、[PR11](https://github.com/Pepgent/lab-library/pull/11) body与评论记录 | **保护**（记录不可变，不代表实现有效）；K/D15-03，禁止回写。 |
| P18 | I列明本仓既发issue/PR评论，包括6555572734、6555608423、6555449857、6555521177、6555550702、6555547168，及旧合并审查评论 | **保护**（不可变记录）；I§3.4、K；新增暂停/作废说明是另一个对象，不改原评论。 |
| P19 | `.workers/eng-ops/sessions` 及其中根记录、LibraryReview/LibraryFileReview/LibraryMetadataReview等全部后代；其余 `.workers/*/sessions` | **保护**；K/D15-01④；作为证据保留，不随工作树/分支清理。E读取授权解释不影响目录保留要求。 |
| P20 | PM `e519e5b` 的30份用户授权调查报告 | **保护**；K/D15-01②、U57；不读禁止session，不越仓写。 |
| P21 | soroi `6c1faea` 双核定义 | **保护**；K、U77–U78。 |
| P22 | soroi `bdaa278` 内U80整理及AGENTS/secretary/watchdog相关段 | **保护**；K明确点名；不按文件全保leader其余内容。 |
| P23 | soroi `80b0267` 内R编号、C3-3对齐段 | **保护**；K、U80后续修正。 |
| P24 | soroi `b521200` 内U81–U82原话录入 | **保护**；K、用户直接授权。 |
| P25 | PM `37e6c73` Argon意图基线 | **保护**；K/D15-01②。 |
| P26 | PM `f88748d` Argon产物修订 | **保护**；K/D15-01②。 |
| P27 | PM `dc7893c` ArgonGovernance基线 | **保护**；K/D15-01②。 |
| P28 | D15-governance-baseline 的VG-4等argon授权修正内容 | **保护**；K；不由本仓判断具体修订是否可省略。 |
| P29 | `pepgent-pm/evidence/argon/D15-08-replacements.md` | **保护**；执行契约及argon替换文本，非本仓写入范围。 |
| P30 | 秘书逐字记录用户原话、原样归档argon产物的内容段 | **保护**；K/D15-01②，具体逐提交认定由所属仓执行者提交双核，本仓不伪造枚举已复验。 |
| P31 | Pepgent `978bc0e` | **保护**；K/D15-01③无关会话提交，不触碰根checkout。 |
| P32 | Pepgent `2d46c1d` | **保护**；同上，逐个列名。 |
| P33 | Pepgent `286f8cb` | **保护**；同上。 |
| P34 | Pepgent `1038aee` | **保护**；同上。 |
| P35 | Pepgent `21f4217` | **保护**；同上。 |
| P36 | Pepgent `e44f068` | **保护**；同上。 |
| P37 | Pepgent `b212fb6` | **保护**；同上。 |
| P38 | Pepgent `a331057` | **保护**；同上。 |
| P39 | Pepgent `f35103b` | **保护**；同上。 |
| P40 | Pepgent `f7a3313` | **保护**；同上。 |
| P41 | Pepgent `a9756eb` | **保护**；同上。 |
| P42 | Pepgent `d110c7c` | **保护**；同上。 |
| P43 | Pepgent `e83c2f2` | **保护**；同上。 |
| P44 | Pepgent `9a6d455` | **保护**；同上。 |
| P45 | Pepgent `031d01c` | **保护**；同上。 |

## 3. 预审需要明确的事项与交付边界

- **D03：** PR6 当前实际merge f622bcf与定稿34c887d冲突；已同时查本地对象与远端当前commit端点，无需/未用历史。请按D15-12由双核确定执行对象，确认保留83ebca0原branch/patch与撤销会话合并的边界。
- **E范围：** E3/E4足以直接证明新建，但归入D15-02(a)的解释仍待双核；若不接受，D08–D11改冻结，不能仍执行。
- **D12–D15：** 缺会话前父子边与旧保留分支精确ref，不通过读禁止历史补齐，也不靠当前对象推断。保持原地冻结。
- **issue5正文：** 旧正文来自E2，本仓没有prepublish快照；目前未提出恢复正文操作。若预审要求逐字恢复来源，须先接受E2授权范围，不能拿当前body当旧版本。
- **评论：** 新issue not_planned说明与旧issue重开作废说明分开。前者为D15-03明确动作，后者为契约中待双核决定的非阻断建议；均不编辑旧评论或已合PR正文。

已观察的证据是只读Git/GitHub对象输出、命名对象diff、授权会话记录及当前目录元数据；没有运行测试/runtime，也没有将他人PR中旧runtime声明改称本次验证。账号只读查询时 `gh auth status` 显示 RiriAgent active，未切换账号。未修改仓库、GitHub对象或联系任何agent。

**交付计数：表一19条；表二15条（其中冻结BLOCKED 5条：D03、D12、D13、D14、D15）；表三45条。** E解释若被否决，表二另外4条须转冻结，届时冻结共9条；这是明确条件，不伪报已获预审。
