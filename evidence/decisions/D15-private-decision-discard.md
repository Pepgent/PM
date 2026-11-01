# D15 新 leader 会话 01a195a6 的私自决策作废、丢弃重做与恢复派工

起草：leader 分身 D15Clone_b978（Claude 族，依据 (U) U21“对于领导的处理，我推荐你分身”），受 leader 会话 01a195a6 指派。起草者与被审查对象同属 Claude 族（leader 及其分身），利益冲突在此披露；事实只取自独立取证，不采用 leader 或本分身的自述。Claude 族一票须主会话、本分身与独立空白历史 task:high 都赞成（C2-3.2、U82）。
历史 D15 表决参与者：常驻 Argon（基线 `pepgent-pm/evidence/argon/D15-intent.md`，PM `37e6c73`）与 ArgonGovernance（基线 `pepgent-pm/evidence/argon/D15-governance-baseline.md`，PM `dc7893c`）；当年的计票记录与原票保留。现行规则：argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票。ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席。
事实来源：22 名 task:mid 独立取证（R01–R12 时间切片、S1–S4 分身与子 agent、G1–G6 仓库对象侧）与 behavior-analyst BehaviorMain，只读、无预设问题；去重索引 `local://inv/d15/INDEX.md`（主表 X-01…X-124、表决内活动 V10…V14、对象表 3.1–3.9、缺口表）。讨论者审查：`local://inv/d15/D15Steady.md`、`local://inv/d15/D15Divergent.md`。归档后路径为 `pepgent-pm/evidence/inv/s01a195a6/`。
基线时点：会话开始 **2026-11-01T05:48:24Z**。

## 起草步骤的 LEDGER 逐项对照（U68–U69；LEDGER 按 U80 整理后的 C1–C5、R1–R21、U1–U80）

| LEDGER 条款 | 对本表的约束 | 本表落实 |
| --- | --- | --- |
| C1-1、C1-2 | soroi 独立定制；组件多仓；不碰 Pepgent 根 checkout 与无关会话 | Pepgent/Pepgent 只在 `/tmp` 新克隆中操作；无关 15 个 commit 列入保护名单（D15-01） |
| C1-3 | 不收缩；开发期无跨组件门禁；代码完成前不写不跑测试；hash 不作证据 | 丢弃只针对私自决策改动；重做仍先开发后统一 e2e；核验交 gh/git 输出 |
| C2-1 | 主会话不单方拍板；“是否私有实现”也须领导小组审议；已通过契约内私有实现由工程师自决 | D15-01 口径；D15-11④、D15-12 |
| C2-2 | Argon 裁决用户原意并代表 argon 族投一票；ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席；取证不转嫁双核 | 23 份取证由本分身派出；历史审查与原票保留，不据此新增例行投票席 |
| C2-3 | 逐条表决、族计票、反例优先、argon 引 (U)、分类仲裁 | 每行 what/where/how/取舍/分类；PM issue 计票 |
| C2-4 | 用户直接授权事项不得表决跳过 | D15-00 不投票；U57、U77–U78、U80 的产物列入保护名单 |
| C3-2、C3-3 | 分身不代表独立判断；压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策 | 利益冲突披露；历史 steady/divergent 两份审查保留；现行压力测试与投票按 D15-13 |
| C3-4 | 一仓一进程、Opus 5.5 high、不共分支、worktree 纪律 | D15-10 每仓一名执行者；D15-11 |
| C3-5 | 改共享 skill 或角色定义前须领导小组与 argon 双核审定 | D15-05①、D15-08 |
| C4-1、C4-2 | 异步总线；不向 argon 族发无实质回执；不在 PTY 另起 omp | 执行状态写 PM D15 issue 与对象 issue |
| C4-3 | local 只存草稿；定稿归档 PM；台账直接替换，不堆流水 | D15-14；`/tmp/d10-rewrite` 已先复制到 `local://inv/d15/d10-rewrite-snapshot`，随表决归档 PM |
| C5-1 | 独立无预设取证，无导师前审 | 本分身曾做一次导师前审，已作废并取消第一批 22 名取证者重派（`D15-process.md` 步骤 1） |
| C5-2 | 每步对照 C1–C5 与 R 表 | 本节；`D15-process.md` 逐步记录 |
| C5-3 | 私自改动 100% 丢弃回退；会话前遗产与无关提交不动 | D15-01…D15-07 |
| C5-4 | 表决与回退期间工程冻结，治理不停 | D15-10、D15-11 |
| R4、R8、R9、R18–R21 | 现行状态行 | D15-07 执行后替换 |

## 现状（证据）

- (R) leader 在 05:48–09:00Z 间做出的表决流程外决定或指令 124 条（INDEX 主表 X-01…X-124）；09:00Z 后另有 D16 分身尝试（09:09–09:13Z，已取消，E34 原文）与 soroi 四次 LEDGER 提交（09:02–09:18Z），取证截点后发生（D15Divergent §D15-09）。
- (R) 表决流程内 D10（PM#16）、D11-A（#17）、D11-B（#21）、D11-C（#22）、D12（#19）、D13（#18）、D14（#20）均有三族票；argon 席位是各分身临时起的 argon 实例（D10Clone_a555.ArgonD10、LabWireClone_5d6b.ArgonD12/ArgonD12Vote、GapClone_e2d7.D13Argon），常驻 Argon 于 08:44:30Z 才启动（X-103）。
- (R) 会话期间未见 leader 每一步逐项检查 LEDGER 的记录（BehaviorMain；R01–R12）。
- (R) 49 个 issue 改写前的完整 issue 对象（含正文）存于 `/tmp/d10-rewrite/prepublish/*.json`（51 份，另两份为发布前已关闭的 soroi#196、#219），取回时间 07:14Z；这些 issue 在 07:14Z 前没有正文改写指令（INDEX 中只有 X-50 涉及它们的正文），故改写前正文即会话前正文。已复制到 `local://inv/d15/d10-rewrite-snapshot/`。
- (R) images#6、images#3、deploy#8、deploy#1 的会话前正文在主会话改写前读取它们的工具结果中（R03、R04 引 `S#239d6dfb` 等）。
- (R) Pepgent/Pepgent 上无关会话的 15 个 commit（G3 §4.3）：`978bc0e`、`2d46c1d`、`286f8cb`、`1038aee`、`21f4217`、`e44f068`、`b212fb6`、`a331057`、`f35103b`、`f7a3313`、`a9756eb`、`d110c7c`、`e83c2f2`、`9a6d455`、`031d01c`；main 当前 head 为 `031d01c`。
- (D) Argon 裁决 (a)–(f)、V-1..V-7；ArgonGovernance M-1..M-4、VG-1..VG-8。

## 决策项

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D15-00 | **01a195a6 中未经常驻 Argon 与管理层、未逐项检查 LEDGER 的决定全部无效，其造成的改动全部丢弃重做** | 全部仓库、issue、PR、分支、worktree、文档 | 直接执行 U65、U66、U67、U69、U70 原话；本行不投票（U79、C2-4）。以下各行只确定对象清单与执行方式 | — | 用户指令 | 否 |
| D15-01 | **判定口径与保护名单** | 本表全部行 | 采用 Argon 裁决 (a)(b)(d)：05:48:24Z 后 leader 或其分身在表决流程外做出的决定、派工、处置、分类、文档与 skill 修改都属私自决策；事后表决采用相同内容不免除丢弃，先丢弃，再由合法决定重新产生。D10–D14、D11-A/B/C 的决策档案、选票与 PM issue 作为记录保留，效力暂停，经常驻 Argon 与 ArgonGovernance 逐条复核前不作派工或回写依据；由它们执行产生的回写、issue 改写、新建 issue 与代码改动按本表丢弃。**保护名单（不丢弃），以内容段为单位而不是以文件为单位：** ① 会话前遗产：images `d40585f`；deploy `dded751`、`56eaff7`；lab-library `83ebca0`；Pepgent `feat/lab-10-library` 会话前 commit；SOR-09 原实现（AuthorDate 04:56:43Z）；STO-05 会话前 5 修改 + 1 未跟踪补丁；mux `issue-13-mux-design` 会话前两份草稿；会话前已存在的分支、PR（如 soroi PR260、PR266）及其会话前内容。② 用户直接命令或直接授权的产物：PM `e519e5b`（U57 的 30 份报告）；soroi `6c1faea`（U77–U78）；argon 族（常驻 Argon、ArgonGovernance）依 U74–U82 写入的全部内容段——包括 LEDGER 依 U80 的整理及其后续修正（如 `bdaa278`、`80b0267` 中的 R 编号与 C3-3 对齐、`b521200` 录入的 U81–U82）、`bdaa278` 在 AGENTS.md、secretary.md、watchdog 中改动的段落、PM 中的 argon 基线与规范及其修订（如 `37e6c73`、`f88748d`、`dc7893c` 与 D15-governance-baseline 的 VG-4 修订）；秘书逐字记录用户原话、原样归档 argon 产物的提交。执行者在差集表中按作者与会话记录把这些提交与段落逐个列出并标“保护”，交 argon 族预审确认。同一文件中由 leader 写入、且不属于上述段落的内容不受保护，按 D15-05、D15-08 处理。③ 无关会话：上列 Pepgent 15 个 SHA 逐个列名，不用区间。④ 各 `.workers/<名>/sessions` 会话目录作为证据保留 | **得到：** 与 U65–U70 原话一致，不留“事后追认”后门（V-2、V-3）；保护名单显式，且只保护用户授权与会话前的内容段，不让同一文件里的 leader 私自内容一并逃过丢弃（V-5、VG-2）。**放弃：** 复核前不能使用已通过的契约补充；执行者要做段落级来源表。**备选落选：** 按文件整体保护——会让 AGENTS、watchdog 等文件里的 leader 私自内容逃过丢弃（导师反例） | 意图 | 否 |
| D15-02 | **确定会话前状态的方法与读取授权** | 8 个仓库（soroi、PM、Pepgent、deploy、images、lab-library、remote、omp-rpc-mux）及其 issue | 读取来源一律限于两类，同一规则适用于 git 与 GitHub：(a) 会话 01a195a6 及其子 agent 的记录，由 subagent 读取（U1 授权）；(b) 当前对象——当前 refs、当前 PR 与 issue 对象的字段（如 PR 的 merge commit、base/head）、会话记录中点名的 commit 对象、当前文件内容，以及 `local://inv/d15/d10-rewrite-snapshot`。不读 reflog、不遍历 git 历史日志、不读 GitHub 编辑历史；仓库规则 `.claude/rules/design-assumes-it-works.md` 对 git、session、issue/PR 历史设了“没有允许禁止查看”，本表不另行创设授权。据此得出 05:48:24Z 状态：分支会话前位置取自会话记录中的 push 输出（`old..new`）与 PR 对象字段；issue 正文取自会话记录中改写前读取的原文，49 个取自 prepublish 快照；issue 开关与父子边取自会话记录中的写操作。用“现状 − 会话前状态 − 保护名单”得到差集，逐项对到 INDEX 归因；两类来源都取不到会话前内容、或归因不到的对象原地冻结，写 BLOCKED 交领导小组（是否向用户申请读取历史的授权由领导小组决定） | **得到：** git 与 GitHub 同一读取规则，不自相矛盾（主会话反例）；清单由数据推出，避免漏项与误伤（D15Divergent）。**放弃：** 记录缺失的对象只能冻结，回退可能不完整，待授权后补。**备选落选：** 读 reflog 而不读 GitHub 编辑历史——同属历史，规则不一致；两者都读——仓库规则要求先有允许 | 实现 | 否 |
| D15-03 | **回退规则** | 同上 | main：每仓按提交时间从新到旧 revert（含 merge 用 `-m 1`），经 revert PR 合入，不改写 main 历史；会话中从远端拉取产生的合并提交（如 soroi `7ec91a8`、`59cdff1`）不单独 revert。会话前已存在的分支上有会话提交或被 rebase 的：把分支 ref 恢复到会话前位置（只对非 main 分支允许 `--force-with-lease`，目的仅为恢复会话前 SHA）。会话新建的分支删除。issue：正文恢复会话前版本；被会话中合并或操作关闭的会话前 issue 重开；会话新建的 issue 以 not planned 关闭并评论引用 D15；父子边恢复会话前状态；已合并 PR 的正文与评论、已发出的评论不改。worktree：只移除会话新建的；会话前已有或来源不明的（如 5 棵 `t*` 树）不动。Pepgent/Pepgent 只在 `/tmp` 新克隆中操作；revert PR39、PR40 前先比对它们与 15 个无关 commit 是否改了同一批文件，有重叠则 BLOCKED | **得到：** 冲突最少、历史不改写、遗产不受损。**放弃：** 非 main 分支恢复要强推。**备选落选：** 按决策行顺序逐行执行——同一仓库的合并被拆到不同行会冲突（deploy PR9/PR10/PR12） | 实现 | 否 |
| D15-04 | **M-1、M-2：issue 改写、父子边与随后合并** | M-1：images#6（标题/正文/关闭）、images#3（正文/子边）、deploy#8（正文/父边/关闭）、deploy#1（正文/关闭）、images PR8（merge `207f11a`、`64114c6`）、deploy PR9（merge `35d309f`、`419a286`、`4589a17`）。M-2：49 个 issue（R05 §5.2）、PM `cd5bff0` | 按 D15-02、D15-03 执行：4 个正文用改写前读取的原文恢复，deploy#8 移回 images#6 之下，images#6、deploy#8、deploy#1 重开（images#3 本就 OPEN）；49 个正文用 prepublish 快照恢复；PM 中 `cd5bff0` 与后续改同批文件的回写一起按从新到旧 revert | **得到：** 撤销 X-32、X-33、X-38、X-39、X-41、X-45、X-50 的落地改动。**放弃：** 开发期跨组件门禁重新出现在 issue 正文中，直到复核后重写。**备选落选：** 等复核后直接覆盖——违反“先丢弃后重做”（Argon (b)） | 实现 | 否 |
| D15-05 | **M-3：leader 当场单裁产生的改动** | ① soroi `d23d997` 中 tern-worker SKILL.md 与 `.omp/agents/argon.md` 的改动；② X-43 改用原生 `git worktree add` 的指令（无文件）；③ deploy PR10（merge `c29e216`、`925864a`）与 deploy#1 评论 `6554797010` 所载 `.`/`..` 版本拒绝；④ Pepgent PR40（merge `cbcd943`、`2705199`）、远端分支 `evidence/pr-40`（`1246470`）、Pepgent#9 的关闭；⑤ Pepgent#41 及其父边、分支 `feat/web-02-lab-wire`、`feat/lab-d12-producer`、`feat/web-02-lab-bridge`；⑥ soroi#274、PR278（merge `d4c516d`、`1832bda`、`452c385`、分支 `issue-store-contract-exports`）；⑦ deploy#11、PR12（merge `26a0c8a`、`01b0fb4`、`b4be605`）、deploy#14；⑧ X-95 npm 产物指令（已撤回） | ① 逐段恢复：同一文件此后又被 `1e07f9c`、`f7a66b9` 改过，执行者对 05:48→HEAD 做逐段来源表，只撤 d23d997 的段落，保留两次用户命令的逐字落实（D15-08）；② 指令作废；同一规则在会话前已有来源（旧 E17 纠错写入的 AGENTS 工作方法）且现写在 U80 整理的 LEDGER C3-4.4，按 D15-01② 保留，不因 X-43 作废而删除；③④⑥⑦ 按 D15-03 revert、重开 Pepgent#9、关闭会话新建 issue、删除会话分支；⑤ 关闭 #41、删除三分支（`feat/web-02-lab-bridge` 的指令来源未完全确定，按 D15-02 先核归因）；⑧ 执行者核实 eng-store 无相应分支或未提交产物，有则删除 | **得到：** 撤销 X-16、X-43、X-58、X-61、X-80–X-84、X-95 的落地物（C3-5）。**放弃：** DEP-03 非活动实现、WEB-01 异步 loader、store contract 导出、D13 部署注入回到未合并。**备选落选：** 逐项追认——V-2、VG-7 否决 | 实现 | 否 |
| D15-06 | **M-4：私自派工下产生的其余改动** | 已合并：lab-library PR6（merge `34c887d`）、PR9（`8d291af`/`5c2ddcb`）、PR11（`4cbb9f3`/`beb07a9`）及会话新建的 lab-library#7、#8、#10；Pepgent PR39（merge `6275a0a`、`7046c52`、`e88987a`、`ef57d03`、`5609e09`）；soroi PR269（`6a4b0b7`、`8cfd7e6`、`f8807bd`）、PR270（`10d73cf`、`e5ad62d`）、PR271（`d2c68e2`、`44ffa3f`）、PR279（`9c3753c`、`bb08c40`、`e3e81b7`、`5b0ebd8`）；omp-rpc-mux PR14（`5affef9`、`e004fa1`）；PM `eedda7d`。未合并：soroi PR272、PR280 及分支 `eng/e2e-182`、`eng/e2e-219`、`eng/e2e-220`、`eng/e2e-226`、`issue-215-environment-identity`、`issue-205-spawn-capture`、`issue-275-artifact-install-identity`；`issue-190-durable-sse` 上的 `c1d7e53`；`eng/install-check-224` 上的 `1b834c9`；remote PR15（`5e61f47`、`issue-14-slurm-oci`）；Pepgent 分支 `feat/lab-root-sessions-eng3`（`c445a22`、`695daea`）。工作树：`eng-e2e-home`、`eng-store-home` 的未提交与已暂存改动，及 D15-02 差集中会话新建的其余 worktree。被会话合并关闭的会话前 issue：Pepgent#15、soroi#196、#203、#205、lab-library#5、omp-rpc-mux#13 | 按 D15-02、D15-03 执行并重开上列 issue。SOR-09：revert PR269 合并，`issue-196-mux-writer` 恢复到会话前 SHA。mux：revert PR14 合并；会话前草稿已与会话修正一起提交进 `e004fa1`，分支 `issue-13-mux-design` 原地冻结并 BLOCKED，不删除也不使用，待合法拆分后只恢复会话前草稿、丢弃会话修正。`issue-190-durable-sse`、`eng/install-check-224` 恢复到会话前位置；STO-05 会话前补丁若不能从记录分离，原地冻结并 BLOCKED。`eng-e2e-home`、`eng-store-home` 的脏改动先逐文件归因，确定为会话产物的丢弃，不能确定的冻结 | **得到：** 私自派工的产物全部撤回，遗产不受损（V-5、VG-2）。**放弃：** 会话内全部工程进展，重做时重新开发。**备选落选：** 直接删除会话期间出现的全部 worktree——其中有会话前与来源不明的树 | 实现 | 否 |
| D15-07 | **分身执行已表决决策产生的回写与新建 issue；台账状态** | PM 回写 `b336254`、`4e1eb44`、`589aa0c`、`6d2da5a`、`ec07387`、`262cab4`、`b61be5a`、`3beaff4`；soroi 设计回写 `9b808c1`、`f73aa44`、`f56e0d1`、`e0b14cc`；为执行决策新建的 images#9、#10，deploy#13，remote#14，soroi#273、#275、#276、#277，PM#8→images#9 与 PM#21 下的子边；LEDGER R4、R8、R9、R18–R21 | 依 D15-01 按 D15-03 revert / 关闭 / 移除子边；PM#16–#22 与已发出的同步评论不改，秘书在每个决策 issue 与收到同步评论的 issue 下各发一条评论：“效力按 D15 暂停，待常驻 Argon 与 ArgonGovernance 复核”。LEDGER：会话期间按 leader 指令写入的台账内容已被 U80 整理取代（`e2663c1` 对旧 E6 的改写不复存在，禁测规则在 C1-3），不再回退；执行完成后秘书按 C4-3 直接替换 R4、R8、R9、R18–R21 | **得到：** 文档与 issue 回到会话前口径；台账与实物一致。**放弃：** D12 Lab wire 等补充暂不在设计正文中。**备选落选：** 保留回写到复核结束——与“先丢弃后重做”冲突；revert `e2663c1`——会把 U80 删除的旧流水塞回 LEDGER（C4-3） | 实现 | 否 |
| D15-08 | **执行用户直接命令时加入的原话之外内容** | soroi `d23d997` 的 AGENTS.md 禁令（U58）；`1e07f9c`（U60）；`f7a66b9`（U62）；`53e790c` 的 `.omp/WATCHDOG-LeaderCompliance.md` | 区分三种内容：(1) 逐字落实原话的保留——tern-worker 不在 PTY 查额度、worker 模型为 Opus 5.5 high、watchdog 持续监视主会话（依据会话 01a195a6 用户原话 entry `f1522aca`（08:38:46Z）“你必须为本对话启动watchdog检查你自己到底怎么违反工作方针”、`b43e08ed`（08:38:58Z）“watchdog必须对你自己的一举一动进行监视”、`3ec9c0d3`（08:39:36Z）“禁止混淆advisor和omomp的watchdog”，与 U27–U29 针对 task:low/free 的 watchdog 不是同一对象，请 Argon 据此复核其裁决 (d)⑤）；AGENTS.md 的工作方式禁令是 U58 明确要求 leader“自己总结……写入agents.md”的内容，属用户授权范围，保留并在 D15-11③ 由 argon 族逐条复核。(2) argon 族依 U80 写入的段落按 D15-01② 保留。(3) 其余由 leader 加入、不能逐字归属于用户命令的段落（skill 中 `1e07f9c`、`f7a66b9` 的其余措辞，watchdog 的提示词、豁免段与参数中不属于 (2) 的部分）在 D15-10 执行时立即移除：秘书用 ArgonGovernance 提供的替换文本整体替换这些段落，watchdog 在替换前后都保持启用，不出现无人监视的时段 | **得到：** 私自加入的内容立即丢弃（导师反例），用户要求的监视不中断，U58 授权的禁令不被误删。**放弃：** watchdog 的替换文本由 argon 族撰写，需等其提供。**备选落选：** 审定前沿用现行全文——私自内容继续生效，违反 U70；先 revert 再重写——监视中断 | 意图 | 是：argon 族可否决 |
| D15-09 | **无持久改动或已被取代的私自决定** | 附录 A 中映射到本行的 X 条目，以及取证截点后的 D16 分身尝试（09:09–09:13Z） | 作废，在 D15 定稿与归档中列出，不写入 LEDGER（C4-3），无对象可回退 | **得到：** 清单完整（VG-1）。**放弃：** 无。**备选落选：** 不列——清单会看似只有持久改动 | 实现 | 否 |
| D15-10 | **执行顺序与执行者** | 各仓库、PM | 每一步开始前，执行该步的 agent 都先逐项对照 LEDGER C1–C5 与 R 表并把核对记录附在该步产出里（U69），包括秘书与只读盘点。① 秘书开 PM D15 issue，把 23 份取证、INDEX、讨论者报告、`d10-rewrite-snapshot` 与流程记录归档到 PM；② 治理分身为每个仓库派一名执行者（task:mid，一仓一进程），按 D15-02 只读产出会话前状态、差集表与保护段落表，连同执行契约交 Argon、ArgonGovernance 预审；③ 预审通过后按 D15-03 执行回退，逐项交 (R)（gh/git 命令与输出）；D15-08(3) 的文本替换同步由秘书执行；④ 另一名 task:low 独立核验各仓与会话前状态一致、保护名单未动，交 (R)；⑤ 秘书按 D15-07 替换 LEDGER 状态行。任何一步遇到 BLOCKED，对象原地冻结，交治理分身与 argon 族处理 | **得到：** 每一步都有 LEDGER 核对，先盘点后动手，每仓单一执行者，可核验（U69、VG-8、C3-4）。**放弃：** 执行耗时。**备选落选：** 只在盘点完成后附一次核对表——秘书归档与只读盘点两步缺少核对（导师反例） | 实现 | 否 |
| D15-11 | **恢复工程派工的条件** | 主会话、治理分身、tern 工程师 | 依次满足：① D15 表决通过；② D15-10 全部完成并核验；③ 常驻 Argon 与 ArgonGovernance 逐条复核 D10–D14、D11-A/B/C、`design/`、AGENTS.md、tern-worker skill 与 watchdog 文本，结果作为新的 PM 决策；④ 重做中的决策、公开契约、派工契约、仓库与路径域划分、issue 验收正文、设计回写逐项三族表决，附 C1–C5 核对表并先交 argon 族预审；已通过契约内的单仓私有实现由工程师自决（C2-1），但派工与合并前附 C1–C5 核对；⑤ 工程师一仓或一个互斥路径域一个 tern 进程，不跨仓、不共用分支或 PR，模型 `anthropic/claude-opus-5-5:high`，保留 omp-peers 扩展（C3-4） | **得到：** 与 Argon (e)、VG-3、VG-8、C5-4 一致，且不把私有实现选择也拉进表决。**放弃：** 工程恢复推迟到复核与重做表决之后。**备选落选：** 不受影响的仓先恢复——全部仓的派工都出自同一批私自派工 | 串联 | 否 |
| D15-12 | **主会话处理 BLOCKED、分类与规则解释的边界** | 主会话、治理分身、argon 族 | ① 主会话不做任何分类或处置，包括“是否属于私有实现”的判断；工程师 BLOCKED 由治理分身连同 Argon、ArgonGovernance 对照 LEDGER 与已通过决策初审分类；涉及意图、范围、公开契约、权限、状态与生命周期、部署前提、验收语义的，起草决策项三族表决后回写 issue。② 依 U81–U82：主会话对 AGENTS.md、LEDGER.md、宿主规则与 watchdog 告警没有单方解释权，不得抠字眼找规则麻烦、不得单方宣布不照办 watchdog 告警、不得挑起伪争议；规则疑问的解释权归 Argon 与 ArgonGovernance，分类争议归导师。③ 同进程的治理、表决、回退子 agent 运行时，主会话完成当前步骤后调用 `wait` 接应，结果返回的当回合推进下一步，不以“不再做任何动作”“暂时没有需要处理的事项”结束回合。④ 主会话单方工程指挥、issue/PR 修改与合并权按 Argon S-3 冻结至 D15-11 满足 | **得到：** 关闭“leader 当场裁决”与“找规则麻烦罢工”两条通道（V-7、VG-7、C2-1、U81–U82）。**放弃：** 解阻更慢；主会话失去规则解释权。**备选落选：** 让主会话判断哪些属于私有实现——正是 X-58 的失效方式 | 意图 | 是：argon 族可否决 |
| D15-13 | **Claude 族席位与压力测试** | 派工契约、治理分身任务说明、决策流程 | 依据 U11 与 U82，AGENTS.md 与 LEDGER.md 中关于 task:high 的规定即是用户早已作出的明确授权；主会话或分身不得以“出自旧会话”“本对话未额外许可”为由禁用或跳过 task:high。所有重大设计与决策的压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策；独立空白历史 task:high 参与 Claude 族逐条投票。Claude 族一票由主会话、治理分身、独立 task:high 共同构成，三者逐条独立赞成方计 Claude 族赞成（D1-12、C2-3、C3-3）。argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票；ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席 | **得到：** 空白历史的独立审查席（VG-4、C3-3），Claude 族一票不再只由同前缀的主会话与分身给出。**放弃：** task:high 成本。**备选落选：** 以“未获许可”不调度 task:high——与 U82 冲突，此前修订稿即属此误 | 意图 | 否 |
| D15-14 | **归档与台账** | PM `evidence/`；LEDGER.md | 取证、INDEX、讨论者报告、快照、流程记录、D15 定稿、选票分别归档到 `pepgent-pm/evidence/inv/s01a195a6/`、`evidence/decisions/`、`evidence/votes/`；LEDGER 只按 C4-3 直接替换 D15-07 所列状态行与决策索引中 D15 的状态 | **得到：** 持久化与台账去噪同时满足。**放弃：** 无。**备选落选：** 在 LEDGER 新增 E 项——旧 E 表已依 U80 删除 | 实现 | 否 |

## 附录 A：INDEX 主表 X 条目到本表的映射

| X 条目 | 落地对象 | 本表行 |
| --- | --- | --- |
| X-01–X-06、X-14、X-18、X-20–X-24、X-31、X-37、X-48、X-63、X-64、X-66、X-69、X-70、X-89、X-91、X-93、X-94、X-96–X-99、X-102、X-104、X-105、X-107–X-110、X-112–X-115、X-117、X-119、X-120、X-122、X-124 | 无持久对象，或只有 local 草稿、计划、发言、已撤回或已停止的指令 | D15-09 |
| X-07–X-13、X-16、X-17 | soroi `d23d997`：AGENTS.md 部分；tern-worker、argon.md 部分；secretary.md 部分已被 U80 取代 | D15-08；D15-05①；D15-01② |
| X-15 | PM `e519e5b`（U57） | D15-01② 保护 |
| X-19、X-27、X-36、X-88、X-100、X-118 中的 LEDGER 提交 | 台账 | D15-07（已被 U80 取代） |
| X-118 中的 PM `37e6c73` | Argon 基线归档 | D15-01② 保护 |
| X-25、X-34、X-40、X-42、X-46、X-47、X-57、X-59、X-60、X-62、X-65、X-67、X-71、X-72、X-90 | 送交表决的请求；产物为 D10–D14、D11 档案 | D15-01（档案保留、效力暂停）；执行产物见 D15-07 |
| X-26、X-92、X-101 | `1e07f9c`、`f7a66b9`、`53e790c` | D15-08 |
| X-28–X-30、X-49、X-85 | tern 会话、home worktree、workers 目录、一人多仓派工 | D15-06（worktree）；D15-01④（会话目录保留）；D15-11⑤ |
| X-32、X-33、X-35、X-38、X-39、X-41、X-44、X-45、X-50 | M-1、M-2 对象 | D15-04 |
| X-43、X-58、X-61、X-80–X-84、X-95、X-68、X-78（deploy#14） | M-3 对象 | D15-05 |
| X-51–X-56、X-73、X-75–X-77、X-85 | M-4 对象 | D15-06 |
| X-74、X-79、X-86、X-87 | 回写与新建 issue | D15-07 |
| X-103 | 常驻 Argon 启动（用户追问后） | 不丢弃（领导小组成员，C2-2） |
| X-106、X-111、X-116、X-121、X-123 | 常驻 Argon 自身动作 | 不属 leader 决策 |

## 对执行的影响

| 执行者 | 对象 | 动作 |
| --- | --- | --- |
| 秘书 | PM、LEDGER | 开 D15 issue；归档；D15-07 暂停评论；D15-08 文本替换（按 argon 族指示）；D15-14 台账 |
| 执行者（每仓一名，task:mid） | soroi、PM、Pepgent/Pepgent（`/tmp` 新克隆）、deploy、images、lab-library、remote、omp-rpc-mux | D15-02 盘点与差集；D15-03…D15-07 回退 |
| 核验者（task:low） | 同上 | 核验会话前状态与保护名单，交 (R) |
| 常驻 Argon、ArgonGovernance | 差集表与执行契约；D10–D14、D11-A/B/C、design、AGENTS.md、skill、watchdog | D15-10② 预审；D15-11③ 复核 |

## 计票

结果：D15-01 至 D15-14 全部通过（三族各 14/14 赞成，argon 族未行使否决）。D15-00 为用户指令，不投票。D15-13 的分类由 argon 族坚持改为“意图”，导师按 D1-17 终局仲裁为“意图”。各轮反例与修改见 `D15-rounds.md`。

| ID | Claude 族（主会话 + D15Clone_b978 + 独立 task:high） | argon 族（Argon + ArgonGovernance） | 导师（LeadMentorD15） | 结果 |
| --- | --- | --- | --- | --- |
| D15-01 | 赞成（v5） | 赞成（v5） | 赞成（v5；首轮反对，反例已采纳） | 通过 |
| D15-02 | 赞成（v3；主会话首轮反对，反例已采纳） | 赞成（v3） | 赞成（v3） | 通过 |
| D15-03 | 赞成 | 赞成 | 赞成 | 通过 |
| D15-04 | 赞成 | 赞成 | 赞成 | 通过 |
| D15-05 | 赞成 | 赞成 | 赞成 | 通过 |
| D15-06 | 赞成（v3） | 赞成（v3） | 赞成（v3；首轮反对，反例已采纳） | 通过 |
| D15-07 | 赞成 | 赞成 | 赞成 | 通过 |
| D15-08 | 赞成（v3） | 赞成（v3） | 赞成（v3；首轮反对，反例已采纳） | 通过 |
| D15-09 | 赞成 | 赞成 | 赞成 | 通过 |
| D15-10 | 赞成（v3） | 赞成（v3） | 赞成（v3；首轮反对，反例已采纳） | 通过 |
| D15-11 | 赞成 | 赞成 | 赞成 | 通过 |
| D15-12 | 赞成（v5） | 赞成（v5；ArgonGovernance 对 v3 引 U81–U82 否决，已修改） | 赞成（v5） | 通过 |
| D15-13 | 赞成（v5；主会话对 v2 撤回赞成，反例已采纳） | 赞成（v5；ArgonGovernance 对 v3 引 U11、U82 否决，已修改） | 赞成（v5） | 通过 |
| D15-14 | 赞成 | 赞成 | 赞成 | 通过 |

选票原文：`votes/D15-claude-main.md`、`D15-claude-clone.md`、`D15-claude-high.md`、`D15-argon.md`、`D15-argon-governance.md`、`D15-mentor.md`。

## task:high 的非阻断意见（不改已通过文本，交执行阶段的双核预审处理）

1. D15-02(a)：`.workers/*/sessions` 中 tern 工程师会话是否算“01a195a6 的子 agent 记录”需双核明确；SOR-09 重基只记录在这些会话里。
2. 重开的会话前 issue 下，leader 留下的裁决评论（如 deploy#1 `6554797010`）建议补一条引用 D15 的作废说明。
3. D15-08：AGENTS.md 第 39 行导师规则后的“用户明确要求独立分析时不设此前置”不在禁令一节，归类需双核明确；ArgonGovernance 的过渡替换文本建议并入 D15-11③ 复核。
4. D15-12④：冻结期结束不等于主会话恢复单方指挥权，C2-1 始终有效。
5. D15-13：内容来自用户直接授权，定稿可按 C2-4 标为用户指令。
6. PM D15 issue 开立时完整登记各轮反例、处理与各族原票后再完成计票。
