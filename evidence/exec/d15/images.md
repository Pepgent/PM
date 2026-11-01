# Pepgent/images — D15-10② 只读预审包

## LEDGER `4455170` 逐项核对记录

本步依据已通过的 [D15（PM#23）](https://github.com/Pepgent/PM/issues/23) 与 `local://exec/d15/CONTRACT.md`，只读产出；尚未执行回退。先完整读取契约、D15 定稿、LEDGER 当前全文，再以 `git show 4455170:LEDGER.md` 读取指定基准；以下逐项核对是本步行为约束，不把台账中的已验证状态冒称为本执行者重新验证。

| 条款 | 本步核对与落实 |
|---|---|
| C1-1 | 只盘点 images 对象，不提取新版 soroi 设计，不修改 omp 宿主或产品设计。 |
| C1-2 | 严限 Pepgent/images 及其 worktree；跨仓父子边只读列出，不触碰 Pepgent/Pepgent 根 checkout，不联系无关会话。 |
| C1-3 | 不改变全流程范围；不写、不跑测试；提交标识仅作对象地址，未作 hash 校验或功能证据。 |
| C1-4 | 不连接生产、Slurm、Komodo、Docker 或 Registry，不读取/解密 SOPS。 |
| C2-1 | 不自行裁决混合保护内容的回退口径；差集交 Argon 双核预审，疑点原地冻结。 |
| C2-2 | 自行完成本仓取证，不转嫁双核代查，不联系任何 agent。 |
| C2-3 | 不重开表决、不作新设计；只逐项映射已通过 D15，未找到的归因如实列明。 |
| C2-4 | 用户直接授权的内容按 D15-01 保护，不以重新表决跳过丢弃要求。 |
| C3-1 | 单仓、单主题、只读取证；没有再派子任务或限制他人报告。 |
| C3-2 | 由治理分身派出的单仓执行者，产出不冒称独立治理裁决。 |
| C3-3 | 不代替高阶审查或双核预审，不启动讨论/表决实例。 |
| C3-4 | 不启停 tern，不切分支、不创建/移除 worktree；一仓一执行者。 |
| C3-5 | 不修改任何共享 skill、agent 定义或 harness。 |
| C4-1 | 本步只写指定本地产出，不写 issue/PR 或评论，不发无实质回执。 |
| C4-2 | 中文；不联系 agent/会话，不在 PTY 启动 omp。 |
| C4-3 | 当前状态向 Git refs/GitHub 当前对象读取；本文件是预审副本，不回写 LEDGER，不自行提交归档。 |
| C5-1 | 只读获准的 01a195a6 及其子 agent 记录；未读 01a193fd；没有导师前审或先定罪调查。 |
| C5-2 | 本节逐项列出 C1–C5 与 R1–R21；不是仅附一句“已核对”。 |
| C5-3 | 差集扣除会话前遗产，特别分开 d40585f 与 64114c6，不把合并时间当编写时间。 |
| C5-4 | 工程冻结不变；本步推进只读清算，不恢复业务开发或合入代码。 |

| 要求 | 本步核对与落实 |
|---|---|
| R1 | 不调查新版设计转向；使用已通过 D15 与对象记录。 |
| R2 | 不改 design；D10–D14 内容不作恢复派工依据。 |
| R3 | images 独立仓边界不变，不建仓或迁仓。 |
| R4 | 双核角色与用户授权产物列保护边界，不改其文件。 |
| R5 | 使用已通过的 D15；本步不计票、不开 issue。 |
| R6 | 执行治理分身的一仓只读委派；不代秘书归档或改台账。 |
| R7 | 不增加监督实例；不参与设计决策。 |
| R8 | 不启动工程师，不重复跨仓混派，不改模型/扩展。 |
| R9 | 不切主会话/本仓分支，不使用 wt，不写工程状态评论。 |
| R10 | 保护 U57 的报告产物；不读被禁止的旧会话。 |
| R11 | 保留 U80 整理的 LEDGER 与关联治理段落；本步无回写。 |
| R12 | 不重新检验环境，不操作 OrbStack。 |
| R13 | images 既有镜像代码与文档按段保护；本步不声称重新验证其 runtime。 |
| R14 | soroi 核心代码不在本仓操作范围。 |
| R15 | Pepgent 业务与无关前端提交不在本仓操作范围，15 个标识逐项列保护。 |
| R16 | 不运行统一 e2e，也不设新的跨组件门禁。 |
| R17 | 不进行 D9/F32 差距分析。 |
| R18 | 工程停止边界保持；自取事实，不向双核推责。 |
| R19 | D15 已通过/归档作为授权输入；不以其通过冒称回退完成。 |
| R20 | 仅完成 D15-10② 的三张表；③实际回退尚未获本步执行授权。 |
| R21 | ③④⑤及双核复核/恢复派工仍是后续步骤，不擅自解除冻结。 |

> C 核对表按 LEDGER 可见编号逐项列出 20 个条款；文件引言写“22条”，本步不据引言虚构额外编号、不改原台账。

## 方法、计划与证据口径

**决定性问题：** 能否仅凭获准记录与当前对象，分清会话前 images 遗产、会话内改动和不可变记录，并为每个拟动作给出会话前目标，而不误删 d40585f？

**计划：** ①读契约、D15、LEDGER、INDEX 3.1–3.7 中 images 行；②读当前 refs、worktree、issue/PR/父子边；③读点名提交的内容差异与会话中改写前 issue 原文；④逐段扣除保护内容，缺失则冻结；⑤只写本文件。最便宜的决定性观察是 PR8 的 base=41753eb、head=64114c6，以及 d40585f/64114c6 的分别 diff：同一合并既含会话前补丁，也含会话内 README 修改，不能盲目整体处理。范围外：业务正确性、新架构、运行环境清理、其他仓回退、最终执行方案设计。假设与未决：`.workers` 记录纳入 D15-02(a) 尚待双核解释；会话开始与首次盘点之间不能只靠“没有找到创建”推定 worktree 创建时间。

本步未联系导师或任何 agent；当前工具集中无 `task`，亦遵守本次禁止联系的约定。未运行 `git log`、`git reflog`、遍历提交历史、GitHub 编辑历史/timeline 或 session 01a193fd。既有 G5 报告含其当时使用历史接口的叙述，本步没有重跑；会话前 ref 关键结论另外由当前 PR 字段和获准记录确认，不以其历史接口片段代替本步授权。

**采样时刻：** 当前 refs/GitHub/文件为本步读取得到的副本；最后时间输出 `2026-11-01T10:09:51Z`。非原子快照。`gh auth status` 显示当前 active=RiriAgent；没有切账号。仅 GET/GraphQL query，无 GitHub 写操作。

### 来源地址

- **S0**：`local://exec/d15/CONTRACT.md`；D15 定稿 `pepgent-pm/evidence/decisions/D15-private-decision-discard.md`，尤其 D15-01…07、10。
- **S1**：`local://inv/d15/INDEX.md`：X-30/32/33/35/38/39/50/73/87；对象 3.1 images#3/#6/#9/#10、PR8；3.2 64114c6/207f11a；3.3 五条评论；3.4 Dockerfile/README；3.5 三组跨仓边及 Project；3.6 两个主 ref；3.7 `.workers/eng-ops/sessions`。`local://inv/d15/G5.md` 为对象侧取证副本。
- **S2**：`session://01a195a6/entry/9dbf7d46`，06:37:50Z 改写前完整 [images#6](https://github.com/Pepgent/images/issues/6) 读取；其 Updated=05:09:45Z，早于会话开始。
- **S3**：`session://01a195a6/entry/58fc37fd`，06:37:50Z 改写前完整 [images#3](https://github.com/Pepgent/images/issues/3) 读取；其 Updated=01:05:04Z，早于会话开始。
- **S4**：`session://01a195a6/entry/5656e900` 与 `/entry/0b3e456f`：实际 DELETE images/6/sub_issue 与 POST images/3/sub_issues，sub_issue_id=6143502988（[deploy#8](https://github.com/Pepgent/deploy/issues/8)）；结果分别 6、3。未读 timeline。
- **S5**：`local://state/inventory.md`，取回窗口 06:17:27–06:24:01Z，images 行 71、176、203、217、235；既有 clean branch/worktree、尚无 PR8。该时间晚于基线，不能单独证明 worktree 在 05:48:24Z 已存在。
- **S6**：当前 `git rev-parse main origin/main issue-6-lab-web-live origin/issue-6-lab-web-live`；`git ls-remote --heads origin`；`git worktree list --porcelain`；两棵树的 `git --no-optional-locks status --short --branch`。输出见下。
- **S7**：当前 `git show --format=fuller --stat 207f11a`、`git show --format=fuller d40585f`、`git show --format=fuller 64114c6`、`git diff 41753eb 207f11a -- Dockerfile README.md`。对象均已被 D15/会话点名；仅读取这些对象，不枚举父链。
- **S8**：`gh api 'repos/Pepgent/images/issues?state=all&per_page=100'` 的当前对象；`gh api repos/Pepgent/images/pulls/8`；GraphQL query 取 #3/#6/#9/#10 的 parent/subIssues/projectItems。当前完整正文输出保存在本会话 `artifact://1170`，图为 `artifact://1171`；关键状态与图在本文件抄录，不依赖 artifact 的持续可用性。
- **S9**：当前仓 `AGENTS.md`、`README.md`；`local://inv/d15/d10-rewrite-snapshot/images.json` 与 `prepublish/` 文件列表。images.json 仅列已改的 #3，**prepublish 无 images 文件**；#3/#6 不能用 07:14 快照恢复，应使用 S2/S3。与 D15-04 的“49+4”相符，本仓不另虚构第50个批量正文动作。
- **W（单独标记，待双核采纳）**：`/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac.jsonl`。`id=4c6e2add`，06:43:19Z 实际 push 输出 `d40585f..64114c6 issue-6-lab-web-live -> issue-6-lab-web-live`；`id=e2cfabc6`，06:47:22Z fetch/FF 输出 `41753eb..207f11a main -> origin/main`。`id=f2d6fbbd` 与 `653bc4fd`，06:40:38Z，工程师把 README 113 行 SIF 段与 133/135 行包装/统一验收段在同次 edit 中改写，后者为成功结果。其 `20.bash.log:50-52` 取样 main=41753eb、worktree=d40585f。

### 当前读取输出摘要（不是功能验收）

```text
local main / origin/main = 207f11ad8ad8a6c5b662f7f99419c1fc323a0c07
local issue-6-lab-web-live / origin/issue-6-lab-web-live = 64114c63df3ec27884bfec1bc505af77b7724496
remote refs/heads/main = 207f11ad8ad8a6c5b662f7f99419c1fc323a0c07
remote refs/heads/issue-6-lab-web-live = 64114c63df3ec27884bfec1bc505af77b7724496
remote refs/heads/issue-1-agent-central = b210a7edf73f2450130298f6614927850ec2d8c1
remote refs/heads/issue-5-lab-web-image = 3a7d516069b175363c5f0afea9a34b15561daa27
status root: ## main...origin/main
status linked tree: ## issue-6-lab-web-live...origin/issue-6-lab-web-live
PR8: created 06:44:12Z; merged 06:47:17Z
PR8 base.sha=41753ebccd41dd398eb8232dc736a8a3af33483d
PR8 head.sha=64114c63df3ec27884bfec1bc505af77b7724496
PR8 merge_commit_sha=207f11ad8ad8a6c5b662f7f99419c1fc323a0c07
207f11a Merge: 41753eb 64114c6
```

本地和远端分别向各自源头读取；未拿 origin/* 缓存冒充远端。状态无文件行表示当次 status 未显示 dirty，不证明历史上未出现过文件。

## 表一：会话前（2026-11-01T05:48:24Z）状态 — 22 项

| ID | 对象 | 会话前状态/内容来源 | 证据与确定性 |
|---|---|---|---|
| B01 | main（本地/远端基线） | `41753ebccd41dd398eb8232dc736a8a3af33483d` | S8 PR8 base；S7 merge 第一父；S2 会话前评论点名 PR7 合并41753eb；W 的 old..new 额外印证。 |
| B02 | issue-6-lab-web-live（既有 branch） | `d40585f37f437184f26cc8bf5d97c6f6c687f14a` | D15-01明确会话前遗产；S7 Author/CommitDate=05:05:27Z，内容为 migrations + README；S5 既有已推未开PR分支；精确旧ref由 W push 输出确认，W 范围待双核。 |
| B03 | issue-1-agent-central | 会话前既有分支；精确旧 ref 未从获准记录取得。当前=b210a7edf73f2450130298f6614927850ec2d8c1 | S1/G5 列既有；本步只读当前地址，不以 commit 时间推创建或旧 ref。不拟修改。 |
| B04 | issue-5-lab-web-image | 会话前既有分支；精确旧 ref 未从获准记录取得。当前=3a7d516069b175363c5f0afea9a34b15561daa27 | S1/G5、S6；不拟修改，不凭 tip 日期推会话前位置。 |
| B05 | [images#3](https://github.com/Pepgent/images/issues/3) | OPEN；标题 IMG-04 lab-web 镜像；完整旧 body=S3 结果 Body（内层行11–77，不含 Comments） | Updated=01:05:04Z。原 child 串行、live认证/工具、runtime前置与关闭语义均可逐字恢复。 |
| B06 | [images#6](https://github.com/Pepgent/images/issues/6) | OPEN；标题“验证 lab-web 的真实认证与运行时 Soroi 安装集成”；完整旧 body=S2 结果 Body（内层行11–53） | Updated=05:09:45Z；含三行真实 installer/浏览器/同容器工具验收。 |
| B07 | [images#5](https://github.com/Pepgent/images/issues/5) | CLOSED；基础镜像已由 [PR7](https://github.com/Pepgent/images/pull/7) 关闭 | S2/S3会话前内容、当前S8 closed_at=02:53:02Z；无本轮正文改写归因，不拟修改。 |
| B08 | [PR8](https://github.com/Pepgent/images/pull/8) | 不存在 | S8 created_at=06:44:12Z；S5当时亦无PR8。 |
| B09 | [images#9](https://github.com/Pepgent/images/issues/9) | 不存在 | S8 created_at=07:35:33Z；S1 V11A。 |
| B10 | [images#10](https://github.com/Pepgent/images/issues/10) | 不存在 | S8 REST created_at=09:10:51Z；S1 V11B。跨源与session约一小时差照录，不自行校时。 |
| B11 | [images#6](https://github.com/Pepgent/images/issues/6) → [deploy#8](https://github.com/Pepgent/deploy/issues/8) | 存在 | S4实际DELETE旧边；S1 X-38。 |
| B12 | [images#3](https://github.com/Pepgent/images/issues/3) → [deploy#8](https://github.com/Pepgent/deploy/issues/8) | 不存在 | S4实际POST新边；D15-04指定移回；与B11为同一次移挂。 |
| B13 | [images#3](https://github.com/Pepgent/images/issues/3) → [#5](https://github.com/Pepgent/images/issues/5)、[#6](https://github.com/Pepgent/images/issues/6) | 既有 child；本轮保持 | S2/S3 parent/child原文，S8当前真实边；不把文字链接单独当API历史证据，未见本轮对此两边写操作。 |
| B14 | [PM#8](https://github.com/Pepgent/PM/issues/8) → [images#9](https://github.com/Pepgent/images/issues/9) | 不存在（child尚未创建） | B09、S1 3.5/V11A；S8当前存在。 |
| B15 | [PM#21](https://github.com/Pepgent/PM/issues/21) → [images#10](https://github.com/Pepgent/images/issues/10) | 不存在（两端本轮创建） | B10、S1 3.5/V11B；S8当前存在。 |
| B16 | 根 worktree `/Users/mouriya/Ext/code/pepgent/pepgent-images` | 06:18:31Z 已存在、main clean；05:48:24Z 精确存在锚点未取得 | S5；当前S6仍main。没有移除根树的候选动作，原地保留。 |
| B17 | linked worktree `/Users/mouriya/ext/worktrees/issue-6-lab-web-live-75a9ab7` | 06:18:33Z已存在、clean、既有branch；05:48:24Z精确创建/存在锚点未取得 | S5、W首次样本；“已接管既有树”不等于拿到了会话前创建锚点，来源不足不移除。 |
| B18 | [images#3](https://github.com/Pepgent/images/issues/3) Project item/status | 精确会话前状态未取得；当前Todo | S8；S1未列本轮手工改变指令。不拟修改。 |
| B19 | [images#6](https://github.com/Pepgent/images/issues/6) Project item/status | 精确会话前状态未取得；当前Done | S8；S1 3.5只归PR关联bot结果，不能倒推先前必为Todo/In progress。 |
| B20 | [images#9](https://github.com/Pepgent/images/issues/9) Project item | 不存在（issue未创建） | B09；当前Todo，PVTI_lADOE4p_hs4BjKDXzhFHvPs。 |
| B21 | [images#10](https://github.com/Pepgent/images/issues/10) Project item | 不存在（issue未创建） | B10；当前Todo，PVTI_lADOE4p_hs4BjKDXzhFH-Bs。 |
| B22 | 会话前评论与已合并 [PR2](https://github.com/Pepgent/images/pull/2)、[PR7](https://github.com/Pepgent/images/pull/7) | 已存在、保持；#3旧评论6551512543；#6旧评论6552560216、6553639646 | S2/S3逐字记录，S8当前对象时间均早于基线。不回写既发评论/已合并PR。 |

## 表二：差集（现状 − 会话前 − 保护名单）— 19 项

**这是拟动作表，不是执行回执。** 唯一 main 合并候选为 06:47:17Z 的207f11a，revert顺序号 **1**（从新到旧）；64114c6是其已合入父侧提交，不再作为第二次独立revert，避免重复。合并中 d40585f 保护段不能当私自产物；其与 D15-03整体merge revert 的具体落地边界待双核预审。所有冻结项原地不动。

| ID | 对象 | 现状 | 会话前状态 | INDEX归因 | D15行 | 拟执行动作/缺失来源 |
|---|---|---|---|---|---|---|
| D01 | main / [PR8 merge207f11a](https://github.com/Pepgent/images/pull/8) | main=207f11a；2文件+16/-8；包含保护d40585f与会话内64114c6 | main=41753eb；d40585f当时只在既有branch | X-30/32/35/39；3.2/3.4 | D15-04、D15-03、D15-01 | **冻结 BLOCKED**；候选revert #1（merge -m1，经revert PR），但整体revert会从main移走d40585f的Dockerfile与README段。需要双核明确“只恢复其原branch位置”是否足以满足保护，或给出按段扣除后的执行契约；本执行者不自行选择整体撤销/再次移植/只revert64114c6。 |
| D02 | README 包装/验收段（当前133、135行） | 本仓seed→Node/HTTP；完整安装/浏览器/工具义务改指#3统一阶段 | d40585f中的真实浏览器/匿名拒绝与#6live收口段 | X-32/35；3.4 README | D15-04 | 拟在D01经审定的单一main回退动作中恢复d40585f对应原段，不另编号第二次revert；仅确认这两个段的归因，不改业务契约。 |
| D03 | README SIF段（当前113行） | 改回“remote模板实际SIF路径由部署登记” | d40585f明确本地SIF仅程序验证，body用digest-qualified docker://，不得以SIF当body身份 | **INDEX未找到专门Main指令**（3.2、3.4、C-24）；W补充工程师实际edit成功 | D15-04、D15-02 | **冻结 BLOCKED**；W证明会话内具体作者与改写，但将其归入X-30私自派工产物需要双核采纳W范围/确认归因，不据同commit就声称Main逐字指令。若采纳，恢复d40585f原段；不得把本段与包装段混称同一条验收指令。 |
| D04 | 本地/远端 issue-6-lab-web-live ref | 64114c6，worktree clean | d40585f，W old..new；D15保护既有branch | X-30/32；3.6 | D15-04、D15-03 | 拟恢复到d40585f，不删除既有branch；仅非main允许force-with-lease。**冻结 BLOCKED**：精确旧ref关键W授权范围待双核；且该ref整体恢复也包含D03，不能绕过其冻结。 |
| D05 | [images#6](https://github.com/Pepgent/images/issues/6)标题 | lab-web镜像的seed/migrations包装与启动顺序 | 验证lab-web的真实认证与运行时Soroi安装集成（S2逐字） | X-32 | D15-04 | 拟恢复S2标题；不覆盖评论。 |
| D06 | [images#6](https://github.com/Pepgent/images/issues/6)正文 | 包装两结果/两验收，真实跨组件义务迁A0/S2 | S2完整旧Body；Updated05:09:45Z | X-32/35 | D15-04 | 拟逐字恢复S2 Body，不从images.json取当前已改版本。 |
| D07 | [images#6](https://github.com/Pepgent/images/issues/6)开关 | CLOSED completed，closed_at06:47:19Z | OPEN，S2 | X-35/39，PR8 closing | D15-04 | 拟重开；是否补引用[PM#23](https://github.com/Pepgent/PM/issues/23)的作废说明，按契约非阻断意见由双核决定；不改既发DONE。 |
| D08 | [images#3](https://github.com/Pepgent/images/issues/3)正文 | 包装→统一E2E；去wave/runtime前置 | S3完整旧Body；OPEN不变 | X-33；X-50秘书跳过本仓已改先例 | D15-04 | 拟逐字恢复S3 Body；标题与OPEN不改，非49批量快照恢复。 |
| D09 | [images#3](https://github.com/Pepgent/images/issues/3) → [deploy#8](https://github.com/Pepgent/deploy/issues/8) | 当前真实边存在 | 不存在 | X-38；3.5 | D15-04 | 拟移除此新边；与D10为同一次恢复移挂，不由两仓重复写；请预审指定单执行方，images包仅列本仓端。 |
| D10 | [images#6](https://github.com/Pepgent/images/issues/6) → [deploy#8](https://github.com/Pepgent/deploy/issues/8) | 当前不存在 | 原真实边存在，S4 DELETE | X-38；3.5 | D15-04 | 拟在移除D09后恢复原边；deploy#8正文/重开由deploy执行者负责，不能用仅改Parent文字代替API边恢复。 |
| D11 | 新建 [images#9](https://github.com/Pepgent/images/issues/9) | OPEN，standin补齐；07:35:33Z创建 | 不存在 | X-73；V11A；3.1 | D15-07 | 拟以not planned关闭，评论引用[PM#23](https://github.com/Pepgent/PM/issues/23)；不删除issue对象、不改原评论。 |
| D12 | 新建 [images#10](https://github.com/Pepgent/images/issues/10) | OPEN，OCI代SIF；REST09:10:51Z创建 | 不存在 | X-87；V11B；3.1 | D15-07 | 拟以not planned关闭，评论引用[PM#23](https://github.com/Pepgent/PM/issues/23)；不把尚无实现PR当已交付代码回退。 |
| D13 | [PM#8](https://github.com/Pepgent/PM/issues/8) → [images#9](https://github.com/Pepgent/images/issues/9) | 真实父子边存在 | 不存在 | V11A；3.5；专门逐边Main指令未找到，秘书流程已有归因 | D15-07 | 拟移除此会话新增边；与PM仓执行者避免重复，预审统一指定写入者。 |
| D14 | [PM#21](https://github.com/Pepgent/PM/issues/21) → [images#10](https://github.com/Pepgent/images/issues/10) | 真实父子边存在 | 不存在 | V11B；X-87；3.5 | D15-07 | 拟移除此会话新增边；PM决策issue及评论仍保留，预审统一指定写入者。 |
| D15 | [images#6](https://github.com/Pepgent/images/issues/6) Project status | Done，item PVTI_lADOE4p_hs4BjKDXzhFFgDs | 精确旧status未取得 | X-30关联PR；3.5：bot自动动作、未找到Main手动指令 | D15-02、D15-04 | **冻结 BLOCKED**；缺会话前status及D15对Project字段的明确动作。不能自行写Todo/In progress，重开issue也不等于已观察Project恢复。 |
| D16 | [images#9](https://github.com/Pepgent/images/issues/9) Project item | 新建Todo item PVTI_lADOE4p_hs4BjKDXzhFHvPs | 不存在 | V11A；3.5；逐事件手工Main指令未找到 | D15-02、D15-07 | **冻结 BLOCKED**；新增事实可确定，D15-07明确issue/父子边但未明列Project item删除/状态恢复，需双核解释是否纳入③执行契约；本步不加动作。 |
| D17 | [images#10](https://github.com/Pepgent/images/issues/10) Project item | 新建Todo item PVTI_lADOE4p_hs4BjKDXzhFH-Bs | 不存在 | V11B；3.5；逐事件手工Main指令未找到 | D15-02、D15-07 | **冻结 BLOCKED**；同D16，缺明确Project字段处置授权，不自造删除范围。 |
| D18 | linked worktree `/Users/mouriya/ext/worktrees/issue-6-lab-web-live-75a9ab7` | 64114c6 clean，仍注册 | 会话前精确存在锚点未取得；06:18:33Z已存在 | X-30接续，不是创建归因；S5 | D15-06、D15-03 | **冻结 BLOCKED**（仅是否可移除）；本步不能确认其为会话新建，按规则不移除。branch恢复是D04独立问题。 |
| D19 | 根 worktree `/Users/mouriya/Ext/code/pepgent/pepgent-images` | main207f11a clean | 会话前精确存在锚点未取得；06:18:31Z已存在 | S5；未找到本会话创建指令 | D15-06、D15-03 | **冻结 BLOCKED**（仅创建归因/移除范围）；保留根checkout，不把main改动等于工作树本轮新建。main内容处理只见D01。 |

**冻结计数：8项：D01、D03、D04、D15、D16、D17、D18、D19。** 计数以ID为准，不把一个冻结项内多个缺口分别计数。

不在可变差集内的会话记录：已合并[PR8](https://github.com/Pepgent/images/pull/8)正文/评论与五条新评论均不可回写；按D15-03保留，详保护表P17/P18。自动交叉引用不是可删除的独立文本/边动作。本步未取得任何images新实现branch、dirty文件或新worktree创建的确定来源；不以此宣称历史上绝对没有其他对象。

## 表三：保护内容/段落与不可变记录 — 46 项

“保护”不表示功能已运行验证；跨仓项是本步遵守的禁止误伤边界，**未重取其他仓内容，不给出跨仓已验证声明**。本仓保护按内容段，不保护整个README免于D02/D03。跨仓秘书提交集合的精确枚举由PM/soroi执行者核对，本仓不猜新标识。

| ID | 对象/段落 | 标记 | 依据、保护边界 |
|---|---|---|---|
| P01 | images main会话前41753eb及既有内容 | 保护 | D15-01①、B01；既有[PR7](https://github.com/Pepgent/images/pull/7)非本轮可丢弃成果。 |
| P02 | d40585f Dockerfile67–68 migrations复制 | 保护 | S7 Author/CommitDate05:05:27Z；D15-01①明列；不能把PR8合入日期当首次编写日期。 |
| P03 | d40585f README73行migrations原路径保留说明 | 保护 | S7该提交diff；当前仍在README73；不要随merge revert误删。 |
| P04 | d40585f README117行稳定BETTER_AUTH_SECRET/URL与无默认凭据 | 保护 | S7会话前补丁；不含任何实际secret值。 |
| P05 | d40585f README124–131 public seed CLI、owner-only JSON、seed/serving生命周期 | 保护 | S7会话前补丁；当前内容仍在，区别于133/135行本轮替换段。 |
| P06 | d40585f README113原OCI/body身份段 | 保护 | S7旧文本：本地SIF仅程序验证、body使用digest-qualified docker://，不可本地SIF当body身份；64114c6反向改写，见D03。 |
| P07 | d40585f原README浏览器/匿名拒绝、真实installer后Node、#6live收口段 | 保护 | S7会话前内容；本轮包装/统一义务替换应撤销而非把原义务一并删除。 |
| P08 | 既有branch issue-1-agent-central | 保护 | S1/G5既有ref；当前b210a7e只作地址；没有本轮修改归因，不删除。 |
| P09 | 既有branch issue-5-lab-web-image | 保护 | S1/G5既有ref；当前3a7d516只作地址；不删除。 |
| P10 | 既有branch issue-6-lab-web-live及d40585f内容 | 保护 | D15-01①；只拟按D04恢复，不当新branch删除；W精确目标待采纳。 |
| P11 | linked worktree本身 | 保护（来源不明保留） | D15-03只移除会话新建；B17/D18缺精确锚点，不删除。 |
| P12 | images根checkout本身 | 保护（来源不明保留） | B16/D19；不把可变main ref与工作目录生命周期混同。 |
| P13 | [images#3](https://github.com/Pepgent/images/issues/3)旧Body/OPEN、既有[#5](https://github.com/Pepgent/images/issues/5)/[#6](https://github.com/Pepgent/images/issues/6) child | 保护 | S3完整源文；只恢复本轮更改，不关闭完整IMG-04根。 |
| P14 | [images#6](https://github.com/Pepgent/images/issues/6)旧标题/Body/OPEN与原[deploy#8](https://github.com/Pepgent/deploy/issues/8) child | 保护 | S2/S4、D15-04；按原来源恢复，不重拟正文。 |
| P15 | 已合并[PR2](https://github.com/Pepgent/images/pull/2)、[PR7](https://github.com/Pepgent/images/pull/7)正文/评论 | 保护 | 会话前遗产；D15-03既发/已合并记录不改。 |
| P16 | 旧评论[#3:6551512543](https://github.com/Pepgent/images/issues/3#issuecomment-6551512543)、[#6:6552560216](https://github.com/Pepgent/images/issues/6#issuecomment-6552560216)、[#6:6553639646](https://github.com/Pepgent/images/issues/6#issuecomment-6553639646) | 保护 | S2/S3；原发记录保留，不改为新结论。 |
| P17 | 会话新评论[#3:6555011783](https://github.com/Pepgent/images/issues/3#issuecomment-6555011783)、[#6:6554521128](https://github.com/Pepgent/images/issues/6#issuecomment-6554521128)、[#6:6554599994](https://github.com/Pepgent/images/issues/6#issuecomment-6554599994)、[PR8:6554578276](https://github.com/Pepgent/images/pull/8#issuecomment-6554578276)、[PR8:6554599116](https://github.com/Pepgent/images/pull/8#issuecomment-6554599116) | 保护（不可变记录，不授予决策效力） | S1 3.3；D15-03已发评论不改，D11-A同步效力由秘书按D15-07另发暂停说明。 |
| P18 | 已合并[PR8](https://github.com/Pepgent/images/pull/8)正文与MERGED记录 | 保护（记录，不保护代码效力） | D15-03；不编辑原body/评论，不删除PR，main代码处理另见D01。 |
| P19 | PM e519e5b：U57的30份报告 | 保护（跨仓边界） | D15-01②；不读其所分析的旧session，不回退报告。 |
| P20 | soroi6c1faea：argon双核定义 | 保护（跨仓边界） | U77–U78；D15-01②。 |
| P21 | soroi bdaa278：LEDGER与AGENTS/secretary/watchdog中U80段落 | 保护（跨仓边界） | D15-01②；按段，不保护同文件leader其他私自内容。 |
| P22 | soroi80b0267：R编号/C3-3对齐 | 保护（跨仓边界） | D15-01②；U80后续修正。 |
| P23 | soroi b521200：U81–U82记录 | 保护（跨仓边界） | D15-01②；用户原话，不误删。 |
| P24 | PM37e6c73：常驻Argon基线 | 保护（跨仓边界） | D15-01②。 |
| P25 | PM f88748d：argon规范/基线修订 | 保护（跨仓边界） | D15-01②。 |
| P26 | PM dc7893c：ArgonGovernance基线 | 保护（跨仓边界） | D15-01②。 |
| P27 | D15-governance-baseline VG-4后续修订段 | 保护（跨仓边界） | D15-01②；精确提交由PM执行者列，本仓不猜。 |
| P28 | PM evidence/argon/D15-08-replacements.md | 保护（跨仓边界） | argon族替换产物；D15-08与执行契约指定秘书，不在images实施。 |
| P29 | 秘书逐字记录用户原话/原样归档argon产物的提交与内容段 | 保护（跨仓边界） | D15-01②；本仓已读取对象未发现这类images提交，不虚构images SHA；跨仓枚举由其负责者完成。 |
| P30 | D10–D14、D11-A/B/C的决策档案、选票与[PM#16–22](https://github.com/Pepgent/PM/issues/16)等决策记录 | 保护（档案，效力暂停） | D15-01：保留原记录，不将其执行产物免于丢弃；其余链接：[17](https://github.com/Pepgent/PM/issues/17)、[18](https://github.com/Pepgent/PM/issues/18)、[19](https://github.com/Pepgent/PM/issues/19)、[20](https://github.com/Pepgent/PM/issues/20)、[21](https://github.com/Pepgent/PM/issues/21)、[22](https://github.com/Pepgent/PM/issues/22)。 |
| P31 | Pepgent978bc0e | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P32 | Pepgent2d46c1d | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P33 | Pepgent286f8cb | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P34 | Pepgent1038aee | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P35 | Pepgent21f4217 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P36 | Pepgent e44f068 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P37 | Pepgent b212fb6 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P38 | Pepgent a331057 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P39 | Pepgent f35103b | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P40 | Pepgent f7a3313 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P41 | Pepgent a9756eb | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P42 | Pepgent d110c7c | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P43 | Pepgent e83c2f2 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P44 | Pepgent9a6d455 | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P45 | Pepgent031d01c | 保护（无关会话） | D15-01③；跨仓未读/未触碰。 |
| P46 | `.workers/*/sessions`，尤其`.workers/eng-ops/sessions`及其子agent/日志 | 保护（证据） | D15-01④；即使其读取授权解释未决，也不删除会话目录。W引用是只读，未联系原工程师。 |

## 交双核预审的具体问题与交付界限

1. **D01混合merge**：D15-04要求撤PR8、D15-01保护d40585f；请明确main去除会话合并时对原branch遗产的保护落实方式，不能让执行者自行设计补偿提交。
2. **W读取范围**：本包已单列`.workers`的三类结论：old..new、首次worktree样本、SIF实际编辑者。若不纳入D15-02(a)，B02精确旧ref及D03归因仍需其他获准来源，相关项保持冻结。
3. **跨仓边单写入者**：D09/D10与deploy，D13/D14与PM是同一组真实边，不应两个执行者重复操作；本包只交拟动作，未联系其他执行者或写入外仓。
4. **Project字段**：D15/D16/D17有当前对象事实，但不自行从关闭/重开推导Project状态或扩充删除范围。
5. **worktree**：两树本步clean；最早获准取样晚于会话开始，不能把当前存在或首次出现当会话新建。D18/D19冻结的是生命周期归因与移除，非阻止已确定的issue正文恢复。

已完成本次只读交付：表一22项、表二19项、表三46项；表二冻结8项。未改任何仓库文件、refs、worktree或GitHub对象，未提交/push/评论，未联系agent/会话，唯一写入为本文件。未执行任何回退或runtime检查；本任务是只读预审盘点，不以这份文档宣称R20或R21完成。
