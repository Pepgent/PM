# omp-rpc-mux：D15-10② 只读预审包

## LEDGER `4455170` 逐项核对（本步骤开始时）

本步骤依执行契约指定的 LEDGER 基准，已完整读取当前 `pepgent-soroi/LEDGER.md` 的 C1–C5、R1–R21 与用户引文（包括补读被截断的 U1），并读取点名对象的 `git show 4455170:LEDGER.md`；提交标识仅定位指定版本，不是 hash 验证证据。任务是 [D15（PM#23）](https://github.com/Pepgent/PM/issues/23) 已通过后的只读盘点，不是重新设计、偏离分析或实际回退。

| 条款 | 本步骤逐项落实 |
|---|---|
| C1-1 | 不改 omp 宿主、不引入 omomp 产品能力；只盘点独立 mux 对象，不从 git 历史发明设计。 |
| C1-2 | 仅 Pepgent/omp-rpc-mux 及本仓 worktree；未触碰 Pepgent/Pepgent 根 checkout 或无关会话。 |
| C1-3 | 不缩减 D15 盘点范围；不编写/运行测试，不做跨组件门禁，不把 SHA 相同当作校验证据。 |
| C1-4 | 不启动隔离或生产环境，不访问或解密 SOPS。 |
| C2-1 | 仅执行 D15-02/06/10 已定方法；未知项冻结，分类及规则解释留给双核预审。 |
| C2-2 | 不把取证转嫁 Argon；产出供 Argon 与 ArgonGovernance 审查，本执行者不联系 agent。 |
| C2-3 | 不自行表决或新增重要决定；报告区分对象事实、来源副本与推断。 |
| C2-4 | 用户授权的保护内容不经本执行者重新表决，不因所在文件有其他改动而整体删除。 |
| C3-1 | 本执行者只负责一个已锁定主题（mux 仓库盘点），无字数限制、未再派工。 |
| C3-2 | 这是治理分身派来的事实盘点，不将执行者算独立表决席。 |
| C3-3 | 不参与设计或替代 task:high/讨论席；不重新开启 D15 表决。 |
| C3-4 | 一仓一个只读执行者；不恢复 tern、不创建/切换分支或 worktree，不与 remote 工程混派。 |
| C3-5 | 不修改任何 skill、agent、harness 或规则。 |
| C4-1 | 不改 issue/PR、不发评论；仅写本预审草稿，交付由父任务自动接收。 |
| C4-2 | 中文；不发送 peer/agent 消息，不在 PTY 启动 omp。 |
| C4-3 | 当前 refs 从 git/远端查，当前 issue/PR 从 GitHub GET 查；快照明确取回时点；local 产出只是预审草稿，未写 LEDGER。 |
| C5-1 | 作为 subagent 读取获准的 01a195a6 记录；未读 01a193fd；无 task 工具，且本任务禁止联系任何 agent，未作导师咨询。 |
| C5-2 | 本开头逐项核对全部 C 条与 R1–R21；实际回退须另行重新核对。 |
| C5-3 | 以内容段保护两份会话前草稿；不因 e004fa1 同时承载旧稿与新修正而把它整体视为可保留成果。 |
| C5-4 | 工程继续冻结；只推进 D15 治理盘点，不把报告完成写成回退完成或恢复工程授权。 |
| R1 | 不重新调查 10-31 转向，不从 git 历史提取设计。 |
| R2 | 不修改 design；D10–D14 的效力暂停边界保持。 |
| R3 | mux 独立仓边界保持，不建新仓或选择 owner。 |
| R4 | 承认常驻双核预审职责；不改定义、不联系双核。 |
| R5 | 使用已通过 D15，不自行发起决策或更新 Project。 |
| R6 | 执行治理分身的只读委派；不代秘书归档到仓库。 |
| R7 | 不启动 watchdog 或额外子 agent；本步骤无实现/测试。 |
| R8 | 不重启工程师、不跨仓操作、不在 PTY 查额度、不联系无关会话。 |
| R9 | 不变更主会话或本仓 checkout 分支；无 git 写操作。 |
| R10 | 不读取 01a193fd；U57 报告属保护项，非本任务调查对象。 |
| R11 | 不回退 U80 整理，不改 LEDGER 或关联治理文本。 |
| R12 | 不改变或重验 OrbStack/Slurm/Komodo/Gateway。 |
| R13 | 会话前 MUX-01..08 合法实现保留；只列本会话相关文档合并与对象状态差集。 |
| R14 | soroi 核心组件不在本切片，不改其实现或状态。 |
| R15 | Pepgent 业务不在本切片；无关前端 15 提交列为全局保护排除项。 |
| R16 | 不执行统一 A0/F01–F31，不新增开发期门禁。 |
| R17 | 不开展 D9/F32，不用本盘点替代运行差距分析。 |
| R18 | 工程冻结继续；本步骤未停止或恢复进程，不转嫁取证。 |
| R19 | 已读 D15 定稿及三族通过记录；仅以已批准文本为执行契约。 |
| R20 | 当前仅第②步；下列动作均为拟执行，无 revert、重开、删分支或 worktree 清理已发生的声明。 |
| R21 | 双核复核与恢复预审尚未由本步骤完成；不得据本报告恢复 tern。 |

## 调查计划与界限

- **决定性问题：** 能否仅由获准的当前对象、01a195a6 记录及现有快照确定 mux 的会话前 main/分支、issue、worktree，并把两份旧草稿与接手者新增修正按原文分离？
- **步骤：** 先读契约、D15 全文、LEDGER 与 INDEX 相关对象；取当前 refs、PR14、issue13 及父子边；读点名的 40a1a9c/e004fa1/5affef9 对象；在获准记录内查旧草稿与接手改写；最后写三表并标明冻结缺口。
- **最便宜的决定性观察：** PR14 的 base/head 字段与 merge 对象说明 main 基线；工程接手时的两份文档完整读取结果，加逐项 edit 原文，决定是否能反向拆出旧稿。不能以当前 e004fa1 与 main 的净 diff 充当旧草稿。
- **不在范围：** 真正回退、issue/PR 写操作、评论、fetch/pull、checkout、分支及 worktree 管理、运行验证、重设计文档或联系其他 agent/会话。
- **观察与假设分开：** D15 已明定旧稿存在并保护；会话前草稿字节是否能完整重建尚须查记录。`.workers` 工程记录只按契约中待双核确认的 D15-02(a) 解释单列来源，不以此自动解除冻结。
- **导师：** 无 `task` 工具；按本角色的递归上限规定直接执行已定方法，且严格遵守本任务不联系任何 agent 的限制。

## 结论与计数

- **会话前状态表19条、差集表8条、保护段落表38条。差集3条“冻结 BLOCKED”：D03、D04、D08，按表行计数。D03/D04是同名分支的本地/远端两个ref。**
- 当前本地main、origin/main缓存和远端main均为 `5affef95620263a835978886c855f8e66f2845d0`；本地/远端 `issue-13-mux-design` 均为 `e004fa191888019c00caad8de33deed113b7d38a`。这是对象地址，不是hash校验证据。
- 会话前main定位为 `40a1a9cb203af01922533287bb3a134cff2a125b`：当前[PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) baseRefOid、会话前[PR12](https://github.com/Pepgent/omp-rpc-mux/pull/12) merge字段均指向它。工程记录的main快进回执另有 `40a1a9c..5affef9`。
- **记录中能完整分离“接手前旧稿”和接手者修正**：README完整92行、design/mux.md完整256行尚在修改前读取结果中；随后两次edit只替换8个原行（README两行、design六行），不只是PR正文概括的五类修正。原行全部列于文末。**不因此解除D15-06冻结**：工程记录是否纳入D15-02(a)待双核确认；08:21Z接手前版本与05:48:24Z原稿逐字同一，尚缺该时点直接内容快照，不能冒称直接观测。
- **旧worktree已被会话中的工程师移除**：08:33:58Z成功移除回执尚存，当前本仓仅根checkout注册。D15只授权移除会话新树，未给被删旧树的恢复动作，D08冻结交预审，不能报成“无树可删所以已恢复干净”。
- [issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)会话前OPEN、当前CLOSED/COMPLETED，拟重开；标题、正文、[PM8](https://github.com/Pepgent/PM/issues/8)父边和空子列表未发现本会话差异，不误列入49正文重写对象。
- 本次只写本文件；未写仓库/refs/worktree/GitHub对象，未发评论、未联系agent。未跑测试/build/lint/runtime，未使用hash验证，未运行git log/reflog，未读GitHub编辑历史/timeline事件，未读session 01a193fd。工具要求为本输出建立的内部Todo不产生仓库提交。

## 来源与读取边界

观察截止记录命令返回 **2026-11-01T10:11:07Z**；多次GET/文件读取不是原子快照。来源如下；INDEX旧快照不冒充实时状态：

- **S0：** 契约全文、D15定稿全文（长行D15-01…08已raw补读）、LEDGER全文及点名4455170对象。
- **S1：** INDEX X-85；对象表3.1 issue13/PR14、3.2 e004fa1/5affef9、3.3两新评论、3.4两Markdown、3.5无本仓新增边、3.6分支/main、3.7旧worktree；G6 §3.1、G6-06/07。未执行G6曾列的历史遍历命令。
- **S2（获准根会话）：** [01a195a6 entry7246f182](session://01a195a6/entry/7246f182)（08:17:08Z接手两dirty文档）；[entry28a46d5b](session://01a195a6/entry/28a46d5b)及 `session://01a195a6/local/state/inventory.md:446-452,963-973`（06:18:33Z两dirty、06:21Z旧分支无upstream）。没有进入其引用的禁止旧会话。
- **S3：** `local://inv/d15/d10-rewrite-snapshot/omp-rpc-mux.json[0]`；`context/omp-rpc-mux-13/{issue.json,parent.json,sub_issues/page-001.json,availability.json}`。快照captured_at **07:07:32.651200Z**；issue updated_at **05:20:52Z**、open、父PM8、子`[]`。**未读同目录timeline/。**
- **S4（当前Git源头）：** 本仓 `git rev-parse --show-toplevel HEAD refs/heads/main refs/remotes/origin/main`、`git worktree list --porcelain`、`git for-each-ref --format='%(refname) %(objectname)' refs/heads refs/remotes/origin`、`git ls-remote --heads origin`。根checkout的 `git --no-optional-locks status --porcelain=v1 --untracked-files=all` 输出空。当前README92行、design256行均完整读过。无fetch/pull/checkout。
- **S5（点名commit）：** `git show --no-patch --format=fuller 5affef9 e004fa1 40a1a9c`、`git show --format= --stat e004fa1`、`git diff 40a1a9c e004fa1 -- README.md design/mux.md`、`git cat-file -p e004fa1`。merge父40a1a9c/e004fa1；e004fa1单父40a1a9c；2文件288+/188−。CommitDate：e004fa1 **08:32:25Z**，5affef9 **08:33:35Z**。未遍历其他commit。
- **S6（当前GitHub）：** RiriAgent active；`gh issue view 13 -R Pepgent/omp-rpc-mux --json number,title,body,state,stateReason,createdAt,updatedAt,closedAt,url,comments`；`gh pr view 14 ... --json number,title,state,body,baseRefName,baseRefOid,headRefName,headRefOid,mergeCommit,mergedAt,createdAt,url`；GET `repos/Pepgent/omp-rpc-mux/issues/13/parent`与`/sub_issues`；PR12当前base/head/merge字段；全仓当前列表（7 issues、7 PRs，唯一会话中新PR14）。截断输出从 `artifact://1161:raw:19-22`、`artifact://1226:raw:1-2`读全。
- **W（单列，待双核确认是否纳入D15-02(a)）：** `.workers/eng-rt`启动的工程记录 `01a1962e-a218-766a-bfd2-4e6408b33c51`，由S2投递回执点名，现通过 `session://01a1962e/` 只读访问（非联系会话）。当前metadata cwd为remote worktree；`.workers/eng-rt/sessions/`仅余锁与RemoteMentor.md，但session工具仍能读完整工程记录，不能据目录清单说JSONL已丢。
  - **W1：** [40dc69a4](session://01a1962e/entry/40dc69a4)、[9dcdb1e5](session://01a1962e/entry/9dcdb1e5)，08:21:23Z修改前README92行/design256行完整读取，无内容截断。
  - **W2：** [4d7c1068](session://01a1962e/entry/4d7c1068)、[f89f4408](session://01a1962e/entry/f89f4408)，08:25:12Z/08:25:23Z两个edit完整参数与成功回执，共8替换行。
  - **W3：** [7a32f3ed](session://01a1962e/entry/7a32f3ed)提交；[b257ae51](session://01a1962e/entry/b257ae51)首次new branch push；[746ad254](session://01a1962e/entry/746ad254)main快进old..new；[83704d67](session://01a1962e/entry/83704d67)旧worktree移除。

GitHub PR14 createdAt/mergedAt **09:33:07Z/09:33:35Z**，issue13 closedAt **09:33:37Z**；保留与git/session相差一小时的原值，不自行校时或据此推断停止指令后变更。

## 表一：会话前（05:48:24Z）状态（19条）

| ID | 对象 | 会话前状态/内容来源 | 确定性与缺口 |
|---|---|---|---|
| B01 | main本地/远端 | `40a1a9cb203af01922533287bb3a134cff2a125b`；S6 PR12会话前merge、PR14 base；S5第一父 | W3另存old..new快进；不是以当前main倒推。 |
| B02 | 本地issue-13-mux-design | 已有旧分支和未提交两稿；S0/S2 | **精确起点ref未直接取得**；候选40a1a9c来自e004fa1单父及PR14 base，属[INFERENCE]，不能冒称起点ref快照。D03冻结。 |
| B03 | 远端issue-13-mux-design | S2 06:19Z远端7分支清单无此名，W3首次push是new branch | 会话前远端不存在是有界回推；即使新远端ref，也服从D15-06明确冻结而不删除。 |
| B04 | issue-1-mux-vs1本地/远端 | S2既存；S4当前`c68973b007f4868a94c4738ab2b702ddea504741` | [PR2](https://github.com/Pepgent/omp-rpc-mux/pull/2)会话前MERGED；无05:48Z ref直接采样，无会话变动归因，保护不动。 |
| B05 | issue-3-readers本地/远端 | S2既存；当前`8864a75e61402160e32f37010fa8e4e676cfddf9` | [PR8](https://github.com/Pepgent/omp-rpc-mux/pull/8)会话前MERGED；旧ref无直接采样，保护不动。 |
| B06 | issue-4-trusted-human本地/远端 | S2既存；当前`89d7ba15e5938e6195c4e9f9ec24a5db3971815a` | [PR10](https://github.com/Pepgent/omp-rpc-mux/pull/10)会话前MERGED；旧ref无直接采样，保护不动。 |
| B07 | issue-5-presence本地/远端 | S2既存；当前`5f0f23ffc43e4011be0b057d247e310c6bbf5245` | [PR9](https://github.com/Pepgent/omp-rpc-mux/pull/9)会话前MERGED；旧ref无直接采样，保护不动。 |
| B08 | issue-6-control-endpoints本地/远端 | S2既存；当前`81d34da62ae45bb7d604debf6c5ab6100082b23b` | [PR11](https://github.com/Pepgent/omp-rpc-mux/pull/11)会话前MERGED；旧ref无直接采样，保护不动。 |
| B09 | issue-7-file-capabilities本地/远端 | `0b3484c93b5f9f5eefa5c6ef0ef4a0767a6e166a` | S6会话前[PR12](https://github.com/Pepgent/omp-rpc-mux/pull/12) head字段、S2/S4。保护不动。 |
| B10 | [issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)标题/正文 | 标题“补齐已实现的 Mux 架构与协议设计”；全文S3的`.body`，纯文档及复用旧运行证据要求已存在 | created05:19:52Z、updated05:20:52Z，07:07Z快照；S6当前全文与所读旧全文无内容差异，不属49改文差集。 |
| B11 | [issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)开关 | OPEN、closed_at=null，旧STARTED已存在 | S3原始对象，D15-06明定重开。 |
| B12 | [PM8](https://github.com/Pepgent/PM/issues/8)→[mux13](https://github.com/Pepgent/omp-rpc-mux/issues/13) | S3真实父边PM8，当前GET同一对象 | 会话前边由07:07Z快照回推；S1/S2未找到本边写操作，保持现状，不以Parent正文代替边。 |
| B13 | [issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)子边 | S3子列表`[]`，当前GET`[]` | 未找到本会话增删子边，保持现状。 |
| B14 | [PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) | 起点不存在，S6 created09:33:07Z | S2旧openPR无mux项；新对象记录保留，main效果撤。 |
| B15 | worktree issue-13-mux-design-1689316 | **会话前存在**、两旧dirty稿；S0遗产确认、S2 06:18Z本地盘点 | 精确HEAD缺口见B02；当前已不在注册列表，不归为会话新树。 |
| B16 | 根checkout pepgent-omp-rpc-mux | 已存在、main；S2 06:18Z clean | 05:48Z dirty字节未直接采样；S4目前main/clean不冒充起点证明。 |
| B17 | 旧dirty README.md | S0确定旧稿存在；W1完整接手前92行；原38/59与当前不同 | W来源待预审，08:21Z→05:48Z逐字同一不是直接观测。 |
| B18 | 旧dirty design/mux.md | S0确定旧稿存在；S2未跟踪；W1接手前完整256行；原3/140/148/214/227/242与当前不同 | 同B17；不能把main新增256行当本会话新写256行。 |
| B19 | .workers/eng-rt/sessions | 会话中新建工程记录路径，W metadata起点08:16:40Z | X-85/S2投递回执点名；D15-01④保护证据，不删除。 |

## 表二：现状 − 会话前 − 保护名单（8条）

按对象分行，不等于8个命令。D01/D02/D05/D06是同一合并的不同视图，**main只能revert一次**。本仓仅此一个应撤merge，故从新到旧编号只有 **revert顺序1**。所有动作均未执行。

| ID | 对象 | 现状 | 会话前状态 | INDEX归因 | D15行 | 拟执行动作/缺口 |
|---|---|---|---|---|---|---|
| D01 | main上[PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) merge5affef9 | HEAD，父40a1a9c/e004fa1，git08:33:35Z | B01 40a1a9c；旧dirty稿在分支非main | X-85；3.1/3.2/3.6 | D15-06/03 | **revert顺序1：预审后`git revert -m 1 5affef9`，经revert PR合入main，不改写历史**。不把旧稿重新合main，不动冻结分支。 |
| D02 | [e004fa1](https://github.com/Pepgent/omp-rpc-mux/commit/e004fa1) | 08:32:25Z，2文档288+/188−，旧稿混8修正行 | 无此提交，旧稿未提交 | X-85；3.2/3.4 | D15-06/01 | main效果随D01撤，**不再单独revert**；载体冻结保留，拆分来源见下节。 |
| D03 | refs/heads/issue-13-mux-design | 本地e004fa1，无注册worktree | 既有分支，旧ref未直接取得，旧稿dirty | X-85；3.6 | D15-06/02 | **冻结 BLOCKED**：不删、不用、不强推候选40a1a9c；缺起点直接ref/逐字稿、W来源解释与合法拆分恢复结论。 |
| D04 | 远端refs/heads/issue-13-mux-design | ls-remote e004fa1；W3首次new branch push | 旧本地分支无upstream，旧远端清单无此ref | X-85；3.6 | D15-06/03 | **冻结 BLOCKED**：明确冻结优先，不套一般“新远端分支删除”；与D03同一拆分/授权缺口。 |
| D05 | main README.md | 92行操作版，38/59为接手修正版 | main40a1a9c原文；dirty操作版在旧树 | X-85；3.4 | D15-06/01 | 由D01恢复main原文；P02旧稿只保全，不借旧稿豁免保留当前main修正。 |
| D06 | main design/mux.md | 新增256行，含6修正行 | main无文件，旧dirty文件在既有worktree | X-85；3.4 | D15-06/01 | 由D01撤main新增文件；不是删除P03旧稿，冻结分支不动。 |
| D07 | [issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)开关 | CLOSED/COMPLETED，09:33:37Z；PR14 Fixes13 | B11 OPEN，正文/边不变 | X-85；3.1 | D15-06/03 | 预审后**重开**；不重写正文、不移边、不关闭not planned。作废说明新评论是否采用留双核决定，旧评论不改。 |
| D08 | 旧worktree issue-13-mux-design-1689316 | 注册表/路径glob均无；W3 08:33:58Z成功移除 | B15会话前存在并有旧稿 | X-85；3.7只记列表已无；精确移除来自W3 | D15-06/02/03 | **冻结 BLOCKED**：不能再删旧树，也不自行重建。缺精确旧HEAD/直接起点字节与D15中未规定的旧树恢复动作，交双核处理。 |

排除项：issue13标题/正文、PM8父边、空子列表无可见差异；PR14及三条issue评论不可变；workers会话证据受保护。全仓无OPEN PR、无本会话新建issue，故无关闭not planned或关闭OPEN PR的mux动作。D15-04/05/07在本仓未发现额外对象，不按跨仓同名指令造行。

## 表三：保护段落/对象（38条）

保护以原内容为单位，**不整体保护e004fa1或当前两个文件全文**。P11以后的跨仓项仅为D15-01排除，不宣称代其他执行者完成归因。

| ID | 原内容/对象 | 保护依据与边界 |
|---|---|---|
| P01 | mux会话前main40a1a9c的MUX-01..08、AGENTS、构建/发行、原README | **保护**：C5-3/D15-01①，S5/S6；D01只撤后来的文档merge。 |
| P02 | 旧README92行：W1 40dc69a4；当前1–37、39–58、60–92及原38/59 | **保护**：D15-01①/06；2原行下列；不保护接手替换后的38/59。W来源待确认。 |
| P03 | 旧design256行：W1 9dcdb1e5；当前除3/140/148/214/227/242外250行及6原行 | **保护**：D15-01①/06；6原行下列，不保护接手替换行。W来源待确认。 |
| P04 | 会话前本地issue-13-mux-design及现混合载体 | **保护载体、冻结禁用**：D15-06，不等于修正内容继续有效；旧ref缺口D03。 |
| P05 | 旧worktree存在事实、原路径与旧稿记录 | **保护**：D15-03不清旧树；已被会话移除，D08不再清理也不私自补建。 |
| P06 | [issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)原标题/正文、PM8边、空子边、[旧STARTED6553861442](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6553861442) | **保护**：S3完整对象，会话前遗产；只重开。 |
| P07 | 六旧分支issue-1-mux-vs1、issue-3-readers、issue-4-trusted-human、issue-5-presence、issue-6-control-endpoints、issue-7-file-capabilities，本地/远端 | **保护不写**：S2/S4，无会话变动归因。旧SHA未采到不等于任意恢复授权。 |
| P08 | [已合并PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14)正文/评论 | **保护不可变记录**：D15-03，main效果仍撤。 |
| P09 | [新STARTED6555467069](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555467069) | **保护不可变评论**：D15-03，INDEX3.3/X-85。 |
| P10 | [DONE6555587386](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555587386) | **保护不可变评论**：D15-03；DONE文字不构成当前恢复授权。 |
| P11 | PM e519e5b：U57三十份报告 | **保护**：D15-01②；本仓无该对象，不触碰或读禁止session。 |
| P12 | soroi 6c1faea：U77–U78双核定义 | **保护**：D15-01②用户直接授权。 |
| P13 | soroi bdaa278：U80整理LEDGER及AGENTS/secretary/watchdog对应段 | **保护**：D15-01②；不连带保护同文件其他leader内容。 |
| P14 | soroi 80b0267：R编号/C3-3对齐等授权修正段 | **保护**：D15-01②，非本执行者重新分类。 |
| P15 | soroi b521200：U81–U82原话段 | **保护**：D15-01②。 |
| P16 | PM 37e6c73：常驻Argon意图基线 | **保护**：D15-01②。 |
| P17 | PM f88748d：argon基线/规范修订段 | **保护**：D15-01②。 |
| P18 | PM dc7893c：ArgonGovernance基线 | **保护**：D15-01②。 |
| P19 | PM evidence/argon/D15-intent.md、D15-governance-baseline.md含VG-4、D15-08-replacements.md | **保护argon授权原文段**：D15-01②；本仓不改，归各自执行者。 |
| P20 | 秘书逐字用户原话/原样归档argon产物的提交内容段 | **保护**：D15-01②；mux仅见e004fa1工程文档，无此类新提交事实，不给它套豁免。 |
| P21 | Pepgent/Pepgent 978bc0e | **保护**：D15-01③无关前端会话；仅列名不触根checkout。 |
| P22 | Pepgent/Pepgent 2d46c1d | **保护**：D15-01③。 |
| P23 | Pepgent/Pepgent 286f8cb | **保护**：D15-01③。 |
| P24 | Pepgent/Pepgent 1038aee | **保护**：D15-01③。 |
| P25 | Pepgent/Pepgent 21f4217 | **保护**：D15-01③。 |
| P26 | Pepgent/Pepgent e44f068 | **保护**：D15-01③。 |
| P27 | Pepgent/Pepgent b212fb6 | **保护**：D15-01③。 |
| P28 | Pepgent/Pepgent a331057 | **保护**：D15-01③。 |
| P29 | Pepgent/Pepgent f35103b | **保护**：D15-01③。 |
| P30 | Pepgent/Pepgent f7a3313 | **保护**：D15-01③。 |
| P31 | Pepgent/Pepgent a9756eb | **保护**：D15-01③。 |
| P32 | Pepgent/Pepgent d110c7c | **保护**：D15-01③。 |
| P33 | Pepgent/Pepgent e83c2f2 | **保护**：D15-01③。 |
| P34 | Pepgent/Pepgent 9a6d455 | **保护**：D15-01③。 |
| P35 | Pepgent/Pepgent 031d01c | **保护**：D15-01③，十五项不以区间替代。 |
| P36 | /Users/mouriya/Ext/code/pepgent/.workers/eng-rt/sessions/及01a1962e记录 | **保护**：D15-01④；锁/RemoteMentor.md和session工具内记录均不删除；未宣称归档完整已验证。 |
| P37 | .workers/{eng-lab3,eng-ops,eng-store,eng-plugin,eng-e2e,eng-web}/sessions/ | **保护**：D15-01④，范围外未扫描，不因目录新而删。 |
| P38 | 跨仓旧遗产：images d40585f；deploy dded751/56eaff7；library83ebca0；Pepgent feat/lab-10-library旧commit；SOR-09原实现；STO-05原5改+1未跟踪补丁；会话前PR/分支 | **保护且范围外不动**：D15-01①；不冒称已完成这些对象旧SHA/补丁拆分。 |

## 旧稿可分离性：8个原行及来源

W1完整读取早于W2修改；两次edit不增删行。**能直接提取完整“接手前版本”，无需从当前文档正确性推测旧稿；不能自行批准恢复。** 若以后合法拆分采用e004fa1载体，要替回以下8原行，其他按W1原样。这里仅取证，不是决定提交、更新ref或重建worktree的方法。

**README原38行**（W1 40dc69a4；W2 4d7c1068后来替换）：

```text
这里的 token 是本代凭据，不是部署 bearer。writer 应通过环境注入，避免出现在 argv。dial 先完成 process 连接再启动 child；stderr 继承调用方，不混入 RPC stdout。停驻/唤醒和同一份 transcript 的选择由 writer/omp 按设计契约处理。
```

**README原59行**（W1；W2 f89f4408后来删除ready-ack子句）：

```text
无 expose 就没有文件权限，包括只设置 root 的情况；exposure 目录可由 agent 启动后创建。文件、reader 和端点 HTTP 的 source-ready 锚点见设计，不能仅从 writer 原始 ready 推断文件 HTTP 已可用。serve/dial 必须来自同一配套发行，不混用旧内部协议，也不增加外部 writer ready-ack。
```

**design/mux.md原3行**（W1 9dcdb1e5；W2 4d7c1068后来改导语）：

```text
本设计兑现 [D3](https://github.com/Pepgent/PM/issues/3) 的 D3-02 至 D3-08、D3-13、D3-15、D3-19 及接口、主路径，并包含已实现的人工 IRC 传输。相对 D3 §4–5 的草图，以下内容描述实际契约：process 先连接再启动 child、完整的 welcome generation、原始 ready 后的内部 mux_ready、reader 内部 envelope 与拒绝帧。构建、CLI/env、凭据注入及发行操作见 [README](../README.md)。
```

**design原140行**（W1；W2 4d7c1068后来改reason集合）：

```text
| dial → serve | `mux_reader_rejected{prefix,reason}` | 仅拒绝相应 reader；reason 为 not_ready/stdin_closed/busy/too_large/invalid/forbidden |
```

**design原148行**（W1；W2 4d7c1068后来改raw ready说明）：

```text
ready、reader envelope/rejection、exit 与文件控制帧均不作为普通 stdout 广播。dial/serve 必须成对升级，不混用旧协议或增加 compatibility shim。reader 的 success 以真实 omp response 为准，不以近端 queue capacity 冒充源头接收。
```

**design原214行**（W1；W2 f89f4408后来补HTTP响应形状）：

```text
path 为 root-relative 协议路径，bytes 来自源 metadata。GET 重新访问源，不信任旧清单缓存；从同 fd 读回 bytes，不解释 UTF8、不改换行，空文件为200/零字节。
```

**design原227行**（W1；W2 f89f4408后来改FIFO方向）：

```text
| serve process 出站与 dial stdin FIFO | 各72项；serve 的 reader/file 共享 writer64项之外的8项 margin；dial 文件命令不进 stdin |
```

**design原242行**（W1；W2 f89f4408后来补files）：

```text
| 重复 writer | 409；无声明的 reader/process 为404 |
```

这些原行可能含后来review指出的文案问题；本步骤不以“修正正确”为由保留会话修正，也不私自修旧稿。D15要求保全旧稿、丢弃会话修正，再由合法决定产生修正。

## 双核预审需要裁定的缺口及后续职责

1. **D03/D04继续冻结。** 已有完整接手前稿/8原行，缺W记录读取范围的确认、05:48Z直接ref/逐字稿来源。双核若接受D15遗产确认加S2/W1链条，也仍须合法拆分结论，不能由本执行者恢复40a1a9c却漏掉旧dirty稿。
2. **D08旧树缺失不能略过。** 具体移除回执W3待预审；旧树恢复动作不在已定清理方式中，本步骤不创建目录/分支，交双核处理。
3. **D01/D07有足够来源形成动作候选**，不依赖将旧稿合入main。能否在局部BLOCKED时先执行，留双核/治理分身按契约决定，本执行者未动手。
4. **六旧分支无会话差集**，多数未取到起点精确SHA但也无拟恢复动作；保护不写，不造六个无关BLOCKED操作。
5. 第③步通过预审另获派工后，每个实际动作须保存(R)命令/输出；第④步由独立核验者核对main、issue与保护内容。本文源头响应证明盘点事实，**不是已回退、runtime或最终验收证据**。
