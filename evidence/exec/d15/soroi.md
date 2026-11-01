# Pepgent/soroi — D15-10② 只读预审包

## LEDGER `4455170` 逐项核对（本次D15-10②步骤）

- **C1-1：** 仅盘点soroi的持久对象；不修改omp、不重做产品设计、不引入omomp能力。
- **C1-2：** 只操作本报告；只读soroi及其worktree；其他仓仅读明确要求的PM定稿/保护对象说明。未进入Pepgent/Pepgent根checkout或联系无关会话。
- **C1-3：** 不收缩D15对象范围；不编写/运行测试，不做跨组件e2e或hash验证。提交标识只用于定位对象与恢复ref。
- **C1-4：** 无Slurm/Komodo/生产操作；无容器启动；不解密SOPS，不读secret。
- **C2-1：** 不决定新设计、私有实现归类或规则解释；提出的动作完全按D15，疑义冻结交双核。
- **C2-2：** 本人完成取证，不转嫁argon代查；本文是给双核预审的对象材料，未联系任何agent。
- **C2-3：** 不投票、不计票、不改已通过决策；D15结论仅从定稿读取。
- **C2-4：** 保护用户直接授权产物；不重投或跳过U58/U60–62/U77–82。
- **C3-1：** 按派工单一仓库只读取证；无额外子agent、无字数限制。
- **C3-2：** 本报告不自称独立领导族票；不替父会话决策。
- **C3-3：** 不承担高阶设计/表决；已通过D15为执行契约，不另启讨论或task:high。
- **C3-4：** 一仓一个执行者，根main未切换；不启动tern工程师，不创建分支或worktree。
- **C3-5：** skill/agent/watchdog仅逐段读取归因，不修改。
- **C4-1：** 不发工程进度评论或无实质回执；仅规定本报告交付。
- **C4-2：** 中文；不peer_send/peer_ask、不另起omp、不联系任何agent或会话。读取已授权记录不是联系。
- **C4-3：** Git/GitHub当前对象作取回时刻副本；本地报告是预审材料不是源头；不改LEDGER。
- **C5-1：** 仅subagent读取01a195a6及其子记录；不读01a193fd；无导师前审或额外agent。
- **C5-2：** 已完整读取指定LEDGER4455170；此清单逐条覆盖C1–C5与R1–R21。
- **C5-3：** 会话差集扣保护名单；会话前代码/patch/PR与用户授权段保留；不以事后票豁免工程改动。
- **C5-4：** 只读治理继续，工程冻结不解除；本步没有revert、close、reset、worktree移除或发布。

- **R1：** 不重查10-31设计来源，保留原调查与合法基线。
- **R2：** 仅识别D10–14会话设计回写，提出D15规定revert；不改设计。
- **R3：** 不创建仓库或迁移store/plugin；owner选择不由本报告推定。
- **R4：** 保护6c1faea、双核定义与基线。
- **R5：** 沿用已通过D15，不重投、不改PM计票。
- **R6：** 本执行者只交只读报告，归档仍由秘书/父会话安排。
- **R7：** 无新角色/模型变动、无watchdog开关操作。
- **R8：** 不恢复tern；保留Opus5.5 high和peers要求。
- **R9：** 根main未切换；无异步总线写入。
- **R10：** 不读01a193fd；U58七禁令列保护。
- **R11：** U80整理与后续修正列段落保护；不复原旧E流水。
- **R12：** 不动环境，不进行探活或复测。
- **R13：** 独立组件仓不在本slice实施范围，跨仓遗产只记保护边界。
- **R14：** 本仓main、分支、issue、PR、dirty与保护patch均入表，不声称实现完成。
- **R15：** 不触碰Pepgent根checkout或前端会话。
- **R16：** 本步非统一e2e；不新增测试或开工门禁。
- **R17：** 不提前做D9或收缩F32。
- **R18：** 保持工程冻结；仅执行本轮对象取证。
- **R19：** 读取D15已通过定稿与归档事实，不把通过决策当回退已完成。
- **R20：** 当前仅②盘点，③回退未授权执行；所有动作均是拟执行，BLOCKED原地冻结。
- **R21：** 本报告待双核预审，不自称复核通过、不恢复工程。

## 调查计划与边界

**决定性问题：** 当前soroi对象减去2026-11-01T05:48:24Z状态、再减去D15-01保护段后，哪些对象可按D15-03处置，哪些必须冻结？

执行计划：① 完整读执行契约、D15定稿、指定LEDGER与INDEX中soroi对象3.1–3.7；② 取当前refs/PR/issue/父子字段及本仓worktree状态；③ 只沿会话明确写操作与点名commit追溯基线，不遍历历史；④ 逐段分离治理授权与leader内容，逐文件分离脏改动；⑤ 只写此报告交双核预审。最廉价定案观察是首个push的old ref、改写前body快照、原始worktree创建/写入回执与当前对象字段，而不是命名/mtime或leader自认。

这是调查slice，无实现/测试Todo；本执行环境未提供task工具，且派工契约明确禁止联系agent，因此未启导师、未向任何agent发消息。仅此产出文件可写，未写仓库或其他临时文件。

**假设与未观察：** 不假定目录名、branch tip时间证明创建时间；StateInventory 06:18取样不是05:48原子快照，只在INDEX无更早变动且有本轮写操作锚点时用于还原基线。GitHub REST与commit/session存在一小时时钟差，原值分别保留，不人为对齐。工程记录中的工具成功回执是操作事实；模型自述与推断单独标注。本文不重新证明任何产品runtime。

### 来源标记与可复现读取

- `INDEX` = `local://inv/d15/INDEX.md`；已读soroi相关3.1–3.7；G1 = `local://inv/d15/G1.md`。报告早先曾用历史日志的事实不会被本执行者重新运行；本次基线关键值重新从允许的会话输出/当前对象取得。
- 主会话entry统一展开为 `session://01a195a6/entry/<id>`；治理子agententry为 `session://01a195a6/agents/<name>/entry/<id>`。例如首push [8c370f91](session://01a195a6/entry/8c370f91) 与新home命令 [9441aa0c](session://01a195a6/entry/9441aa0c)。
- **【W】专门表示只来自tern工程师记录的结论**。按照执行契约提议先读取、单独标记，是否归入D15-02(a)由双核预审决定；本文不自行扩权。以下三个完整根文件中，entry id可用 `read <根文件>.jsonl?q=select(.id=="<id>")` 取得；子agent/日志都在同名不带`.jsonl`的目录内。
  - `plugin`：`/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b.jsonl`
  - `store`：`/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4.jsonl`
  - `e2e`：`/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d.jsonl`

- 只读当前命令实际运行：`git rev-parse HEAD`；`git worktree list --porcelain`；`git for-each-ref --format='%(refname) %(objectname)' refs/heads refs/remotes/origin`；`git ls-remote --heads origin`。当前本地main、origin/main副本、真实远端main均返回 `4455170d1c15ec6d839e21e991f405170f844a08`。这些是对象地址，不是hash校验。
- 当前状态使用 `GIT_OPTIONAL_LOCKS=0 git status --short`（根无输出）、同式读取eng-e2e-home/eng-store-home；eng-store-home的cached/unstaged文件差异分别用`git diff --cached --name-status`、`git diff --name-status`读取。无fetch/pull/checkout、无索引刷新写入请求。
- 当前GitHub：`gh auth status`确认active=RiriAgent；`gh api --paginate 'repos/Pepgent/soroi/issues?state=all&since=2026-11-01T05:48:24Z&per_page=100'`；当前pulls对象字段；GraphQL `repository.issues.nodes { number parent {number url} subIssues {nodes {number url}} }`。没有读取GitHubtimeline或编辑历史。
- 点名对象：`git show -s --format='%H %P %aI %cI %s'`读取f752546、789aa4b、72873a9、a43336c、1b834c9、c1d7e53、8cfd7e6；`git show --format=fuller --stat`读取main revert候选与保护commit；`git show d23d997 1e07f9c f7a66b9`及`git diff f752546 HEAD -- <指定文档>`用于段落来源。没有git log/reflog/blame、没有枚举commit历史。
- prepublish共28份soroi原issue对象，26份实际发布、196/219跳过；逐个body源在表1。`context/soroi-*/availability.json`当前对象快照的parent=404/sub_count=0；未读其timeline子目录。

### 当前refs/对象排除规则

只在差集中对有会话变动来源的对象提出动作；未变的旧refs/worktree不因为多、旧或prunable就删除。当前工作树列表中的Orca两树、旧eng-customization、eng-release、issue-190、issue-196、leader-soroi-mvp、soroi-sto04/06/07/08/09/10/11、soroi-sor06-bundles、test-208、wt-*与/tmp/soroi-standalone-210及旧doc-merge-validation均保持。来源不足的旧目录没有被当作“本轮新树”。INDEX五棵`t*`的本仓注册列表未出现，不能仅因位于worktrees下就归属soroi，本文不提出删除。

`7ec91a8`与`59cdff1`是拉远端同步merge，依D15-03不单独revert。合并PR的child commits已由一次merge revert覆盖，不重复撤销。`e2663c1`等旧LEDGER改写已被U80覆盖，依D15-07不再单独revert；当前LEDGER状态行仅由秘书在后续⑤直接替换。已发评论不可变；例如旧issue199只是收到D14同步评论，不重开。

当前PR272和PR280 OPEN；新PR269/270/271/278/279 MERGED；旧PR260/266 OPEN。未合PR的merge_commit_sha不等于已合main commit，尤其PR280返回的测试merge对象不得误revert。

## 表1：会话前（05:48:24Z）状态

| ID | 对象 | 会话前状态 | 来源与限定 |
| --- | --- | --- | --- |
| B001 | main（本地/远端） | f752546a8958a21476effd93014f3554b532c23b；当时 main，不是当前 main 的回退目标 | 根 entry 8c370f91 push `f752546..d23d997`；git show -s f752546：05:36:01Z。首个会话写入 d23d997 前无其他 soroi main 写入，INDEX X-01–17。 |
| B002 | issue-196-mux-writer（本地/远端） | 789aa4bc4898e7cccfdb44bfd7126182d4b38dae；有 SOR-09 原实现，未 PR | 【W】plugin 63ffc6ba 07:03:36Z worktree 原 tip 789aa4b；72ebe6a6 push `789aa4b...f8807bd (forced update)`；git show 789aa4b Author 04:56:43Z / Commit 05:24:24Z。 |
| B003 | issue-190-durable-sse（本地） | a43336c3b436430c609b246aaad77db479ae6255 + 5 modified + 1 untracked；无上游 | StateInventory 报告 §STO05/原 status；【W】plugin 63ffc6ba；store 196c0cdd `Updating a43336c..d4c516d`；原五文件 diff 为 store/4.bash-original.log，streams 原文为 1ae41ae8。 |
| B004 | issue-190-durable-sse（远端） | 会话前不存在（当时无上游；本次新发布） | StateInventory当前远端清单（06:18）无同名、原工作树无上游；【W】store8750e7f9本轮push -u；G1 §4.2。与本地旧分支分别处理。 |
| B005 | eng/install-check-224（本地/远端） | 72873a969019fc4b942822c4b8b86f953e5cec28 | 【W】plugin 63ffc6ba + 5b81f018 push `72873a9..1b834c9`；旧 PR260 对象在 plugin c7697b76 内 head 72873a9；git show 72873a9 为05:27:55Z。 |
| B006 | test/235-a0-public-launcher | cf4a47face2a0f5d94e55bf9b6ae02830bdb9c15；既有分支 | 当前 PR266 created 04:54:49Z、head cf4a47f；G1 §6 本轮未变；StateInventory 06:18 旧对象，同名 ref 当前。 |
| B007 | eng/e2e-182 | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-53；worker 本轮分支创建/首次发布链；当前 refs 直接观测：e2663c1。 |
| B008 | issue-203-release-import | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-51；worker 本轮分支创建/首次发布链；当前 refs 直接观测：local d2c68e2；remote 44ffa3f。 |
| B009 | eng/e2e-219 | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-53；worker 本轮分支创建/首次发布链；当前 refs 直接观测：e5ad62d。 |
| B010 | eng/e2e-220 | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-53；worker 本轮分支创建/首次发布链；当前 refs 直接观测：97b83ce。 |
| B011 | issue-215-environment-identity | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-52；worker 本轮分支创建/首次发布链；当前 refs 直接观测：d2c68e2。 |
| B012 | issue-205-spawn-capture | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-52；worker 本轮分支创建/首次发布链；当前 refs 直接观测：5b0ebd8。 |
| B013 | eng/e2e-226 | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-53；worker 本轮分支创建/首次发布链；当前 refs 直接观测：d2c68e2。 |
| B014 | issue-store-contract-exports | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-81；worker 本轮分支创建/首次发布链；当前 refs 直接观测：452c385。 |
| B015 | issue-275-artifact-install-identity | 会话前不存在；新建，不用当前 tip 的时间推定创建时刻 | INDEX 3.6 / G1 §4.1；X-77；worker 本轮分支创建/首次发布链；当前 refs 直接观测：8ebb43c。 |
| B016 | [182](https://github.com/Pepgent/soroi/issues/182) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-182.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-182/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B017 | [190](https://github.com/Pepgent/soroi/issues/190) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-190.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-190/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B018 | [196](https://github.com/Pepgent/soroi/issues/196) | OPEN；无 parent、无 child；正文为 prepublish 原文（快照当时 CLOSED，不能把快照开关当会话前开关） | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-196.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-196/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B019 | [203](https://github.com/Pepgent/soroi/issues/203) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-203.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-203/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B020 | [205](https://github.com/Pepgent/soroi/issues/205) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-205.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-205/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B021 | [207](https://github.com/Pepgent/soroi/issues/207) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-207.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-207/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B022 | [209](https://github.com/Pepgent/soroi/issues/209) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-209.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-209/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B023 | [211](https://github.com/Pepgent/soroi/issues/211) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-211.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-211/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B024 | [214](https://github.com/Pepgent/soroi/issues/214) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-214.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-214/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B025 | [215](https://github.com/Pepgent/soroi/issues/215) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-215.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-215/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B026 | [216](https://github.com/Pepgent/soroi/issues/216) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-216.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-216/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B027 | [217](https://github.com/Pepgent/soroi/issues/217) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-217.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-217/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B028 | [219](https://github.com/Pepgent/soroi/issues/219) | OPEN；无 parent、无 child；正文为 prepublish 原文（快照当时 CLOSED，不能把快照开关当会话前开关） | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-219.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-219/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B029 | [220](https://github.com/Pepgent/soroi/issues/220) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-220.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-220/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B030 | [222](https://github.com/Pepgent/soroi/issues/222) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-222.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-222/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B031 | [223](https://github.com/Pepgent/soroi/issues/223) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-223.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-223/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B032 | [224](https://github.com/Pepgent/soroi/issues/224) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-224.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-224/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B033 | [226](https://github.com/Pepgent/soroi/issues/226) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-226.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-226/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B034 | [227](https://github.com/Pepgent/soroi/issues/227) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-227.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-227/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B035 | [228](https://github.com/Pepgent/soroi/issues/228) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-228.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-228/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B036 | [229](https://github.com/Pepgent/soroi/issues/229) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-229.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-229/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B037 | [231](https://github.com/Pepgent/soroi/issues/231) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-231.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-231/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B038 | [232](https://github.com/Pepgent/soroi/issues/232) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-232.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-232/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B039 | [233](https://github.com/Pepgent/soroi/issues/233) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-233.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-233/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B040 | [235](https://github.com/Pepgent/soroi/issues/235) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-235.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-235/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B041 | [245](https://github.com/Pepgent/soroi/issues/245) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-245.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-245/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B042 | [250](https://github.com/Pepgent/soroi/issues/250) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-250.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-250/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B043 | [259](https://github.com/Pepgent/soroi/issues/259) | OPEN；无 parent、无 child；正文为 prepublish 原文 | `local://inv/d15/d10-rewrite-snapshot/prepublish/soroi-259.json` 的 body；D15 现状④证明07:14前无正文改写；旧开关 StateInventory/本轮关闭写操作；context/soroi-259/availability.json parent=404、sub_count=0；当前 GraphQL同形。 |
| B044 | [273](https://github.com/Pepgent/soroi/issues/273) | 会话前不存在；无原正文、无开关或父子边待恢复 | INDEX 3.1；G1 §5.1；X-76；当前对象 created_at 与会话创建调用对应。 |
| B045 | [274](https://github.com/Pepgent/soroi/issues/274) | 会话前不存在；无原正文、无开关或父子边待恢复 | INDEX 3.1；G1 §5.1；X-81；当前对象 created_at 与会话创建调用对应。 |
| B046 | [275](https://github.com/Pepgent/soroi/issues/275) | 会话前不存在；无原正文、无开关或父子边待恢复 | INDEX 3.1；G1 §5.1；X-77；当前对象 created_at 与会话创建调用对应。 |
| B047 | [276](https://github.com/Pepgent/soroi/issues/276) | 会话前不存在；无原正文、无开关或父子边待恢复 | INDEX 3.1；G1 §5.1；X-87；当前对象 created_at 与会话创建调用对应。 |
| B048 | [277](https://github.com/Pepgent/soroi/issues/277) | 会话前不存在；无原正文、无开关或父子边待恢复 | INDEX 3.1；G1 §5.1；X-87；当前对象 created_at 与会话创建调用对应。 |
| B049 | [PR260](https://github.com/Pepgent/soroi/pull/260) | OPEN；既有正文与评论保留；head 72873a9；base main | StateInventory；【W】plugin c7697b76 是更新前完整 PR 读取，Updated 05:28:24Z；当前 head 1b834c9 只多同步 main merge。 |
| B050 | [PR266](https://github.com/Pepgent/soroi/pull/266) | OPEN；既有正文与评论保留；head cf4a47f | 当前 PR fields created 04:54:49Z；StateInventory；G1 §6 本轮未变。 |
| B051 | [PR269](https://github.com/Pepgent/soroi/pull/269) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B052 | [PR270](https://github.com/Pepgent/soroi/pull/270) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B053 | [PR271](https://github.com/Pepgent/soroi/pull/271) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B054 | [PR272](https://github.com/Pepgent/soroi/pull/272) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B055 | [PR278](https://github.com/Pepgent/soroi/pull/278) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B056 | [PR279](https://github.com/Pepgent/soroi/pull/279) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B057 | [PR280](https://github.com/Pepgent/soroi/pull/280) | 会话前不存在 | INDEX 3.1；G1 §6；当前 PR created_at，merge/head 字段；各受派 worker 创建调用。 |
| B058 | /Users/mouriya/Ext/worktrees/eng-e2e-home | 会话前不存在；07:02:07Z 以 origin/main detached 新建 | 根 entry 9441aa0c 明确 worktree add；【W】plugin 63ffc6ba 显示其新 detached e2663c1；X-49/X-53。 |
| B059 | /Users/mouriya/Ext/worktrees/eng-plugin-home | 会话前不存在；07:02:07Z 以 origin/main detached 新建 | 根 entry 9441aa0c 明确 worktree add；【W】plugin 63ffc6ba 显示其新 detached e2663c1；X-49/X-52。 |
| B060 | /Users/mouriya/Ext/worktrees/eng-store-home | 会话前不存在；07:02:07Z 以 origin/main detached 新建 | 根 entry 9441aa0c 明确 worktree add；【W】plugin 63ffc6ba 显示其新 detached e2663c1；X-49/X-51。 |
| B061 | /Users/mouriya/Ext/worktrees/issue-190-durable-sse-ff0716f | 已存在；旧分支 issue-190-durable-sse | StateInventory §本地checkout，06:18:32–33Z；【W】plugin 初始 worktree list。会话本轮只接续，不创建。 |
| B062 | /Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f | 已存在；旧分支 issue-196-mux-writer | StateInventory §本地checkout，06:18:32–33Z；【W】plugin 初始 worktree list。会话本轮只接续，不创建。 |
| B063 | /Users/mouriya/Ext/worktrees/eng-release-230-ff0716f | 已存在；旧分支 eng/install-check-224 | StateInventory §本地checkout，06:18:32–33Z；【W】plugin 初始 worktree list。会话本轮只接续，不创建。 |
| B064 | 其余本仓注册 worktree / refs | 未见会话差集；保留；若要删除，缺会话前存在性证明则禁止操作 | 当前 worktree list / for-each-ref 与 StateInventory旧清单；详见范围说明，未以目录 birth 或 tip 时间替代来源。 |
| B065 | /tmp/pepgent-store-203（本仓关联注册树） | 会话前不存在 | 【W】store cf65e895 07:05:17Z明确git worktree add -b；当前worktree list仍列d2c68e2。单列关联范围，不延伸到其他仓根checkout。 |
| B066 | /tmp/pepgent-store-contract（本仓关联注册树） | 会话前不存在 | 【W】store 077a8969 08:05:45Z明确git worktree add -b；当前worktree list仍列452c385。 |

## 表2：现状 − 会话前 − 保护名单（拟动作，未执行）

本表 `D15-xx` 指定稿行；全部对象仅read。S001–S009为同仓revert顺序，其他行不表示跨类别执行先后。

| ID | 对象 | 现状 | 会话前状态 | INDEX归因/证据 | D15行 | 拟执行动作 / BLOCKED缺口 |
| --- | --- | --- | --- | --- | --- | --- |
| S001 | main commit `e0b14cc` | 08:32:08Z；design/store.md：提交级records；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | V11C / X-90 | D15-07 | 拟 revert #1：普通 revert；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S002 | main commit `9c3753c` | 08:27:44Z；PR279；bb08c40/e3e81b7/5b0ebd8；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | X-52；5b0ebd8 的逐修复指令 INDEX 标未找到，受派 PR279 链由 G1 S3 和当前 PR 对象确认 | D15-06 | 拟 revert #2：merge 用 `-m 1`；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S003 | main commit `d4c516d` | 08:19:04Z；PR278；1832bda/452c385，根exports/schema；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | X-81 | D15-05⑥ | 拟 revert #3：merge 用 `-m 1`；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S004 | main commit `f56e0d1` | 08:07:50Z；design/intervention.md：slots/GUI handback；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | V12 / X-74 | D15-07 | 拟 revert #4：普通 revert；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S005 | main commit `f73aa44` | 08:05:47Z；design/eval.md、store.md：提醒/compare；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | V11B / X-79 | D15-07 | 拟 revert #5：普通 revert；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S006 | main commit `9b808c1` | 07:48:27Z；design/eval.md：File根/source snapshot；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | V11A / X-60 | D15-07 | 拟 revert #6：普通 revert；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S007 | main commit `d2c68e2` | 07:17:49Z；PR271；44ffa3f releases；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | X-51 | D15-06 | 拟 revert #7：merge 用 `-m 1`；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S008 | main commit `6a4b0b7` | 07:13:57Z；PR269；8cfd7e6/f8807bd；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | X-52 | D15-06 | 拟 revert #8：merge 用 `-m 1`；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S009 | main commit `10d73cf` | 07:11:45Z；PR270；e5ad62d F05；当前 main 尚含该改动 | f752546 基线不存在这些会话落地；SOR09旧实现仅在旧分支受保护 | X-53 | D15-06 | 拟 revert #9：merge 用 `-m 1`；以 PR 合入 main；不另 revert 已包含的 child commits；git show 指定对象的 CommitDate 与 PR merge字段为顺序证据。 |
| S010 | .omp/skills/tern-worker/SKILL.md 的 d23d997 六处改写 | 当前32/33/36/37/42/51行：owner、验收、汇报、边界、裁决、哨兵调度 | f752546 同文件对应30–52行旧文；1e07f9c/f7a66b9 的用户要求须扣除 | X-08/X-12/X-16/X-26/X-92 | D15-05① / D15-08 | 逐段替换；采用 PM evidence/argon/D15-08-replacements.md §二定稿（秘书执行）。不整提交 revert d23d997，不恢复 PTY /usage，不改回 GPT。 |
| S011 | .omp/agents/argon.md d23d997 3处改写 | 当前14行目录枚举、16行design已补齐、40行U引用 | f752546旧14、16、40行；详保护表，40行LEDGER兼容指向由替换稿明确保留 | X-16 | D15-05① | 按 replacements §三替换14–16行、保持40行指定LEDGER引用；替换稿并非机械复制旧行，属双核提供文本，不由执行者二次设计。 |
| S012 | .omp/WATCHDOG-LeaderCompliance.md 非保护片段 | 当前1–9参数、13监视目标、15依据、19–24规则、28放过含“证据不足时回答 PASS”、31格式 | 会话前文件不存在；用户监视功能与bdaa278/b521200段落保护 | X-101；后续ArgonGovernance用户授权改写 | D15-08(3) | 采用 replacements §一整体替换；先后保持 enabled=true，监视功能不中断；保护内容语义随双核稿保留，不删除文件或单独revert 53e790c。 |
| S013 | AGENTS.md:39 导师规则后的例外句 | “用户明确要求独立分析时不设此前置，直接派中立取证。” | f752546没有此追加句；工作方式禁令整节另有U58保护 | X-11；d23d997 | D15-08 / D15-01 | 冻结 BLOCKED：D15 task:high 非阻断意见③明列该句不在禁令节、归类待双核明确；本执行者不越权将其等同整节保护或删除。 |
| S014 | branch `eng/e2e-182` | e2663c1；只在本地，ls-remote无同名 | 不存在 | X-53 | D15-06 | 拟删除会话新建分支（仅本地）；先关闭所属未合PR、处理占用worktree。 |
| S015 | branch `issue-203-release-import` | local d2c68e2；remote 44ffa3f；本地/远端均在 | 不存在 | X-51 | D15-06 | 拟删除会话新建分支（本地及远端）；先关闭所属未合PR、处理占用worktree。 |
| S016 | branch `eng/e2e-219` | e5ad62d；本地/远端均在 | 不存在 | X-53 | D15-06 | 拟删除会话新建分支（本地及远端）；先关闭所属未合PR、处理占用worktree。 |
| S017 | branch `eng/e2e-220` | 97b83ce；本地/远端均在 | 不存在 | X-53 | D15-06 | 拟删除会话新建分支（本地及远端）；先关闭所属未合PR、处理占用worktree。 |
| S018 | branch `issue-215-environment-identity` | d2c68e2；只在本地，ls-remote无同名 | 不存在 | X-52 | D15-06 | 拟删除会话新建分支（仅本地）；先关闭所属未合PR、处理占用worktree。 |
| S019 | branch `issue-205-spawn-capture` | 5b0ebd8；本地/远端均在 | 不存在 | X-52 | D15-06 | 拟删除会话新建分支（本地及远端）；先关闭所属未合PR、处理占用worktree。 |
| S020 | branch `eng/e2e-226` | d2c68e2；只在本地，ls-remote无同名 | 不存在 | X-53 | D15-06 | 拟删除会话新建分支（仅本地）；先关闭所属未合PR、处理占用worktree。 |
| S021 | branch `issue-store-contract-exports` | 452c385；本地/远端均在 | 不存在 | X-81 | D15-05⑥ | 拟删除会话新建分支（本地及远端）；先关闭所属未合PR、处理占用worktree。 |
| S022 | branch `issue-275-artifact-install-identity` | 8ebb43c；本地/远端均在 | 不存在 | X-77 | D15-06 | 拟删除会话新建分支（本地及远端）；先关闭所属未合PR、处理占用worktree。 |
| S023 | branch `issue-196-mux-writer` | local 6a4b0b7；remote f8807bd | 789aa4bc4898e7cccfdb44bfd7126182d4b38dae（【W】） | X-52 | D15-06 | 拟恢复本地与远端至789aa4b；非main远端仅此恢复用途 force-with-lease；保留SOR09原实现与原worktree；【W】读取解释待双核预审。 |
| S024 | branch `eng/install-check-224` | local/remote 1b834c9 | 72873a969019fc4b942822c4b8b86f953e5cec28（【W】） | X-52/X-53 | D15-06 | 拟恢复本地/远端72873a9，保留PR260、原10文件及旧正文评论；只撤会话同步merge 1b834c9；【W】解释待预审。 |
| S025 | branch `issue-190-durable-sse` 本地与旧patch | c1d7e53；六文件WIP已提交，worktree clean | a43336c + 原5修改1未跟踪（【W】完整原patch已定位） | X-51/X-57/X-90 | D15-06 | 拟本地ref恢复a43336c，同时逐文件恢复原patch：5个tracked diff取store/4.bash-original.log，streams.ts取1ae41ae8全文。两件一起列为恢复遗产，不能只reset而丢patch；【W】解释待预审。 |
| S026 | remote branch `issue-190-durable-sse` | c1d7e53 | 会话前未发布（StateInventory远端清单无同名） | X-51 | D15-06 | 拟删除本轮新建远端ref；本地旧分支与原patch另保留；不将所有同名ref一并删除。 |
| S027 | [182](https://github.com/Pepgent/soroi/issues/182) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-182.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S028 | [190](https://github.com/Pepgent/soroi/issues/190) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-190.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S029 | [203](https://github.com/Pepgent/soroi/issues/203) body | CLOSED；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-203.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态另按下行重开；既有无父无子不改。 |
| S030 | [205](https://github.com/Pepgent/soroi/issues/205) body | CLOSED；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-205.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态另按下行重开；既有无父无子不改。 |
| S031 | [207](https://github.com/Pepgent/soroi/issues/207) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-207.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S032 | [209](https://github.com/Pepgent/soroi/issues/209) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-209.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S033 | [211](https://github.com/Pepgent/soroi/issues/211) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-211.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S034 | [214](https://github.com/Pepgent/soroi/issues/214) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-214.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S035 | [215](https://github.com/Pepgent/soroi/issues/215) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-215.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S036 | [216](https://github.com/Pepgent/soroi/issues/216) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-216.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S037 | [217](https://github.com/Pepgent/soroi/issues/217) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-217.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S038 | [220](https://github.com/Pepgent/soroi/issues/220) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-220.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S039 | [222](https://github.com/Pepgent/soroi/issues/222) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-222.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S040 | [223](https://github.com/Pepgent/soroi/issues/223) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-223.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S041 | [224](https://github.com/Pepgent/soroi/issues/224) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-224.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S042 | [226](https://github.com/Pepgent/soroi/issues/226) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-226.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S043 | [227](https://github.com/Pepgent/soroi/issues/227) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-227.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S044 | [228](https://github.com/Pepgent/soroi/issues/228) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-228.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S045 | [229](https://github.com/Pepgent/soroi/issues/229) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-229.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S046 | [231](https://github.com/Pepgent/soroi/issues/231) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-231.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S047 | [232](https://github.com/Pepgent/soroi/issues/232) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-232.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S048 | [233](https://github.com/Pepgent/soroi/issues/233) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-233.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S049 | [235](https://github.com/Pepgent/soroi/issues/235) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-235.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S050 | [245](https://github.com/Pepgent/soroi/issues/245) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-245.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S051 | [250](https://github.com/Pepgent/soroi/issues/250) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-250.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S052 | [259](https://github.com/Pepgent/soroi/issues/259) body | OPEN；当前有D10“交付顺序/统一e2e”及义务迁移正文 | 原文：`prepublish/soroi-259.json.body`（完整原正文） | X-50 | D15-04 | 拟按prepublish原样恢复body；不以draft或当前PM引用文重建；状态保留OPEN；既有无父无子不改。 |
| S053 | [196](https://github.com/Pepgent/soroi/issues/196) state | CLOSED / completed | OPEN；本轮PR269/271/279合并关闭；196 body未被批改 | X-52 | D15-06 | 拟重开；不得把snapshot 07:14的196 CLOSED误当基线。重开附PM#23作废说明是否采用交预审，不在本步评论。 |
| S054 | [203](https://github.com/Pepgent/soroi/issues/203) state | CLOSED / completed | OPEN；本轮PR269/271/279合并关闭；196 body未被批改 | X-51 | D15-06 | 拟重开；不得把snapshot 07:14的196 CLOSED误当基线。重开附PM#23作废说明是否采用交预审，不在本步评论。 |
| S055 | [205](https://github.com/Pepgent/soroi/issues/205) state | CLOSED / completed | OPEN；本轮PR269/271/279合并关闭；196 body未被批改 | X-52 | D15-06 | 拟重开；不得把snapshot 07:14的196 CLOSED误当基线。重开附PM#23作废说明是否采用交预审，不在本步评论。 |
| S056 | [273](https://github.com/Pepgent/soroi/issues/273) | OPEN；无parent/child | 不存在 | X-76 | D15-07 | 拟关闭 not planned 并评论引用 [PM#23](https://github.com/Pepgent/PM/issues/23)；274已closed但reason completed，仍须改not planned；不删除历史正文/评论。 |
| S057 | [274](https://github.com/Pepgent/soroi/issues/274) | CLOSED / completed；无parent/child | 不存在 | X-81 | D15-05⑥ | 拟关闭 not planned 并评论引用 [PM#23](https://github.com/Pepgent/PM/issues/23)；274已closed但reason completed，仍须改not planned；不删除历史正文/评论。 |
| S058 | [275](https://github.com/Pepgent/soroi/issues/275) | OPEN；无parent/child | 不存在 | X-77 | D15-07 | 拟关闭 not planned 并评论引用 [PM#23](https://github.com/Pepgent/PM/issues/23)；274已closed但reason completed，仍须改not planned；不删除历史正文/评论。 |
| S059 | [276](https://github.com/Pepgent/soroi/issues/276) | OPEN；parent PM21 | 不存在 | X-87 | D15-07 | 拟关闭 not planned 并评论引用 [PM#23](https://github.com/Pepgent/PM/issues/23)；274已closed但reason completed，仍须改not planned；不删除历史正文/评论。 |
| S060 | [277](https://github.com/Pepgent/soroi/issues/277) | OPEN；parent PM21 | 不存在 | X-87 | D15-07 | 拟关闭 not planned 并评论引用 [PM#23](https://github.com/Pepgent/PM/issues/23)；274已closed但reason completed，仍须改not planned；不删除历史正文/评论。 |
| S061 | [PM21](https://github.com/Pepgent/PM/issues/21) → [276](https://github.com/Pepgent/soroi/issues/276) | GraphQL 当前parent PM21 | 无边（child未存在） | V11B / X-87；逐边Main指令未找到，秘书建实现项链已在INDEX3.5 | D15-07 | 拟移除父子边；PM仓执行者与soroi执行者预审明确单一操作方，避免重复；本步无联系或写操作。 |
| S062 | [PM21](https://github.com/Pepgent/PM/issues/21) → [277](https://github.com/Pepgent/soroi/issues/277) | GraphQL 当前parent PM21 | 无边（child未存在） | V11B / X-87；逐边Main指令未找到，秘书建实现项链已在INDEX3.5 | D15-07 | 拟移除父子边；PM仓执行者与soroi执行者预审明确单一操作方，避免重复；本步无联系或写操作。 |
| S063 | [PR272](https://github.com/Pepgent/soroi/pull/272) | OPEN；head 97b83ce | 不存在 | X-53 | D15-06 | 拟关闭未合PR（保留正文/评论）；随后删新head分支。PR280 merge_commit_sha=0a9e752是未合PR的测试merge值，不能加入revert表。 |
| S064 | [PR280](https://github.com/Pepgent/soroi/pull/280) | OPEN；head 8ebb43c | 不存在 | X-77 | D15-06 | 拟关闭未合PR（保留正文/评论）；随后删新head分支。PR280 merge_commit_sha=0a9e752是未合PR的测试merge值，不能加入revert表。 |
| S065 | eng-e2e-home/e2e/README.md | M；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 11896fda→15ac8712 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S066 | eng-e2e-home/e2e/package.json | M；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 11896fda→15ac8712 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S067 | eng-e2e-home/e2e/pty/README.md | M；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 11896fda→15ac8712 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S068 | eng-e2e-home/e2e/pty/session.ts | M；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 15650a8d→3c154666 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S069 | eng-e2e-home/e2e/standin/sse.ts | M；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 15650a8d；ca70bafc；45e42c7d→d2f99f1f | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S070 | eng-e2e-home/e2e/pty/f20.sh | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 2574737e→a11dd560 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S071 | eng-e2e-home/e2e/pty/f20.ts | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 2574737e→71e90488 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S072 | eng-e2e-home/e2e/pty/f21.sh | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 2574737e→a1a377ed | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S073 | eng-e2e-home/e2e/pty/f21.ts | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 2574737e→7e2c642a | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S074 | eng-e2e-home/e2e/pty/lifecycle-check.ts | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e ead2b8e2→c01a4e68，后续修正至5a614aff | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S075 | eng-e2e-home/e2e/pty/lifecycle.md | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 5bc64e28→d898c8e6；35e83c0a→6af4dc06 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S076 | eng-e2e-home/e2e/pty/lifecycle.ts | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e b7a1c262→b6ff0e26，后续修正至5a614aff | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S077 | eng-e2e-home/e2e/pty/local-smoke.ts | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 41c563ad | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S078 | eng-e2e-home/e2e/pty/owned-root.sh | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e de14c127→44069723 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S079 | eng-e2e-home/e2e/pty/snapshot.ts | ??；当前未提交；完整路径在git status回执 | 新home原本clean；tracked文件在该分支d2c68e2的原文 / untracked不存在 | X-53；【W】e2e 86a2d5df→3824d568；f6f65eab→9fa633d1 | D15-06 | 拟仅丢弃该文件本轮未提交delta（M恢复该分支基底；??删除）；【W】逐文件写入回执排除了仅由目录名推断；不触碰旧PR266所在树。 |
| S080 | eng-store-home/.omp/WATCHDOG-LeaderCompliance.md | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S081 | eng-store-home/.omp/agents/argon-governance.md | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S082 | eng-store-home/.omp/agents/secretary.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S083 | eng-store-home/.omp/skills/tern-worker/SKILL.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S084 | eng-store-home/AGENTS.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S085 | eng-store-home/LEDGER.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S086 | eng-store-home/bun.lock | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S087 | eng-store-home/design/eval.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S088 | eng-store-home/design/intervention.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S089 | eng-store-home/design/store.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S090 | eng-store-home/e2e/README.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S091 | eng-store-home/e2e/package.json | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S092 | eng-store-home/e2e/s1/README.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S093 | eng-store-home/e2e/s1/f05.spec.ts | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S094 | eng-store-home/e2e/s1/local-smoke.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S095 | eng-store-home/e2e/s1/scenario.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S096 | eng-store-home/package.json | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S097 | eng-store-home/packages/omp-soroi/README.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S098 | eng-store-home/packages/omp-soroi/src/contract.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S099 | eng-store-home/packages/omp-soroi/src/eval/agent-body.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S100 | eng-store-home/packages/omp-soroi/src/eval/index.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S101 | eng-store-home/packages/omp-soroi/src/index.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S102 | eng-store-home/packages/omp-soroi/src/subagent/child/capture.ts | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S103 | eng-store-home/packages/omp-soroi/src/subagent/main/agent-session.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S104 | eng-store-home/packages/omp-soroi/src/subagent/main/index.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S105 | eng-store-home/packages/omp-soroi/src/subagent/main/mux-writer.ts | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S106 | eng-store-home/packages/omp-soroi/src/subagent/main/rpc-process.ts | A staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S107 | eng-store-home/packages/omp-soroi/src/subagent/main/supervisor.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S108 | eng-store-home/packages/omp-soroi/src/subagent/protocol.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S109 | eng-store-home/packages/omp-soroi/src/subagent/visibility.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S110 | eng-store-home/packages/store/README.md | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S111 | eng-store-home/packages/store/src/contract.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S112 | eng-store-home/packages/store/src/releases.ts | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S113 | eng-store-home/packages/store/src/server.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S114 | eng-store-home/packages/store/src/store.ts | M staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S115 | eng-store-home/packages/store/test/contract.test.ts | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S116 | eng-store-home/packages/store/test/releases.test.ts | D staged；无unstaged/untracked；HEAD现main4455170 | home会话新建；但此index与工作文件的具体写入/索引刷新来源未找到 | 未找到逐文件staged写操作；【W】10742198→54fbeb5e只证明07:18:52Z switch --ignore-other-worktrees main | D15-06 | 冻结 BLOCKED：缺此文件index/工作副本的逐文件写入/索引刷新归因。已找到07:18:52Z切到共享main的回执；[INFERENCE]可能是main ref后续前进留下的旧index，不把D/A直接当删除，不丢弃或恢复此文件；原STO05六文件patch另保全。 |
| S117 | /Users/mouriya/Ext/worktrees/eng-e2e-home | eng/e2e-226，15dirty | 不存在；根9441aa0c创建 | X-49/X-53 | D15-06 | 拟处理本表该home的分支/dirty后移除本轮新建worktree；不移除会话目录；不碰三个旧工程树。 |
| S118 | /Users/mouriya/Ext/worktrees/eng-plugin-home | issue-275-artifact-install-identity，clean | 不存在；根9441aa0c创建 | X-49/X-52 | D15-06 | 拟处理本表该home的分支/dirty后移除本轮新建worktree；不移除会话目录；不碰三个旧工程树。 |
| S119 | /Users/mouriya/Ext/worktrees/eng-store-home | main4455170，37staged | 不存在；根9441aa0c创建 | X-49/X-51 | D15-06 | 冻结 BLOCKED：37个逐文件来源未解，禁止移除此home |
| S120 | /tmp/pepgent-store-203（本仓关联注册树） | branch issue-203-release-import；d2c68e2；当前有untracked scripts/__pycache__/build-release.cpython-315.pyc | 不存在 | X-51；【W】cf65e895 | D15-06 | 冻结 BLOCKED：新树来源已知，但尚有一个未归因未跟踪文件，先解决下一行再移除；不得递归清理。 |
| S121 | /tmp/pepgent-store-contract（本仓关联注册树） | branch issue-store-contract-exports；452c385；当前status无dirty | 不存在 | X-81；【W】077a8969 | D15-05⑥ / D15-06 | 拟在所属分支删除前移除该会话新树；【W】077a8969创建回执+本轮GIT_OPTIONAL_LOCKS=0 status clean；会话记录目录保留。 |
| S122 | /tmp/pepgent-store-203/scripts/__pycache__/build-release.cpython-315.pyc | 当前untracked；glob确认唯一具体文件 | 该worktree会话新建，但该cache创建操作未定位 | 未找到；关联X-51新树不等于逐文件归因 | D15-06 | 冻结 BLOCKED：缺生成者/生成调用或明确创建来源；不能由.pyc命名推断可丢弃。 |

## 表3：保护段落与遗产

| ID | 对象/提交 | 受保护内容段或实物 | 结论 | 依据与不得扩大范围 |
| --- | --- | --- | --- | --- |
| P001 | f752546 main 基线 | 会话前完整tree；特别D1–D8与各既有组件实现 | 保护 | D15-01①；根8c370f91；不以恢复main ref方式抹掉后续治理授权段落。 |
| P002 | 789aa4b / SOR-09原实现 | 8文件原实现，AuthorDate04:56:43Z；旧分支原tip05:24:24Z；含当时design/subagent.md原文 | 保护 | D15-01① / D15-06；【W】plugin forced-push old ref与指定commit对象。revert PR269不等于删除旧分支实现。 |
| P003 | STO-05 contract.ts | 会话前tracked patch；store/4.bash-original.log中该文件完整diff | 保护 | D15-01①；StateInventory原5修改；【W】07:04:18Z回执4de5b362在本轮SSE修改前保全diff；依a43336c重建原patch，不使用c1d7e53现态替代。 |
| P004 | STO-05 database.ts | 会话前tracked patch；store/4.bash-original.log中该文件完整diff | 保护 | D15-01①；StateInventory原5修改；【W】07:04:18Z回执4de5b362在本轮SSE修改前保全diff；依a43336c重建原patch，不使用c1d7e53现态替代。 |
| P005 | STO-05 records.ts | 会话前tracked patch；store/4.bash-original.log中该文件完整diff | 保护 | D15-01①；StateInventory原5修改；【W】07:04:18Z回执4de5b362在本轮SSE修改前保全diff；依a43336c重建原patch，不使用c1d7e53现态替代。 |
| P006 | STO-05 server.ts | 会话前tracked patch；store/4.bash-original.log中该文件完整diff | 保护 | D15-01①；StateInventory原5修改；【W】07:04:18Z回执4de5b362在本轮SSE修改前保全diff；依a43336c重建原patch，不使用c1d7e53现态替代。 |
| P007 | STO-05 store.ts | 会话前tracked patch；store/4.bash-original.log中该文件完整diff | 保护 | D15-01①；StateInventory原5修改；【W】07:04:18Z回执4de5b362在本轮SSE修改前保全diff；依a43336c重建原patch，不使用c1d7e53现态替代。 |
| P008 | STO-05 streams.ts | 会话前untracked文件59行完整原文，store根entry1ae41ae8（07:04:17.751Z） | 保护 | D15-01①；【W】与5 tracked patch共同保存；本轮后续SSE修正不连带保护。 |
| P009 | [PR260](https://github.com/Pepgent/soroi/pull/260) 与72873a9 | 会话前PR、原正文/评论、10文件成果、eng-release旧worktree | 保护 | D15-01①；当前PR与plugin c7697b76旧全文；不关闭、不删旧分支，仅撤同步main merge。 |
| P010 | [PR266](https://github.com/Pepgent/soroi/pull/266) 与cf4a47f | 会话前PR、完整正文/评论、test/235-a0-public-launcher与旧test-208 worktree | 保护 | D15-01①；当前PR字段/StateInventory；不是本轮新PR。 |
| P011 | AGENTS.md:46–56工作方式禁令 | U58授权总结产生的七条禁令完整节 | 保护 | D15-08(1)，X-07–13；保留等待D15-11③复核；不因同提交d23d997含越权skill而整提交revert。 |
| P012 | AGENTS.md:43 / skill:35 原生worktree规则 | f752546中已存在的工作树纪律；现LEDGER C3-4.4 | 保护 | D15-05②；X-43指令作废不删除会话前遗产或U80正文。 |
| P013 | 1e07f9c 的用户命令落实 | 删除PTY另起omp查/usage步骤及相应必要重编号 | 保护 | D15-08(1)；U60–U61。当前skill已无探针；不恢复旧探针。 |
| P014 | f7a66b9 的用户命令落实 | skill:13 Opus5.5 high说明与18行anthropic/claude-opus-5-5:high参数 | 保护 | D15-08(1)；U62；两处正文可见，无其余新增段落一并保护。 |
| P015 | watchdog用户授权监视功能 | target main、enabled true及持续监视leader功能；保留omp-peers不受影响 | 保护 | D15-08(1)；根用户f1522aca/b43e08ed/3ec9c0d3；替换时不中断监视，不保护PASS豁免。 |
| P016 | 6c1faea | 新增.omp/agents/argon-governance.md全部78行 | 保护 | D15-01②；U77–U78；常驻Argon撰写、Main根369107fc原样提交；当前git show + 当前文件对象定位。 |
| P017 | bdaa278 / LEDGER.md | C1–C5、R1–R21、阶段主线、用户原话有效索引的U80整理（以当前后续修订为准） | 保护 | D15-01②；ArgonGovernance 9fb2c8b8写入→d1766ae6/c6eeb182提交；不把被U80取代旧E表还原。 |
| P018 | bdaa278 / AGENTS.md | 当前5行逐项核对入口、13行argon双核计票、58行精简引用 | 保护 | D15-01②；ArgonGovernance 9fb2c8b8编辑回执；git show bdaa278逐段。 |
| P019 | bdaa278 / .omp/agents/secretary.md | 当前14–16行精简台账、4状态语义、禁止流水账段 | 保护 | D15-01②；U80、ArgonGovernance写入；d23d997秘书单行已被这整块替换，不再单独revert。 |
| P020 | bdaa278 / watchdog | 当前15行C/R核查依据、19/21–24违规项、28合规动作中U80内容、31格式 | 保护 | D15-01②；git show bdaa278和ArgonGovernance实际edit来源；28行末尾继承“证据不足PASS”不属保护，按替换稿去除。 |
| P021 | 80b0267 / LEDGER.md | R1–R21编号纠正与当时C3-3对齐；后者已由b521200更新 | 保护 | D15-01②；ArgonGovernance3812e72d→565d8438。保护当前有效内容，不倒回其过期“不调task:high”文句。 |
| P022 | b521200 / LEDGER.md | U81/U82逐字录入；C2-1/2-3/2-4/C3-3/C5-4及阶段主线的规则解释与task:high明确授权 | 保护 | D15-01②；ArgonGovernance1a1f085d→f78667d7/696d6e17；当前LEDGER对应段落。 |
| P023 | b521200 / watchdog | 当前20行反钻规则罢工；28行task:high与wait接应内容 | 保护 | D15-01②；U81–U82、ArgonGovernance edit；与53e790c原有PASS继承句分开。 |
| P024 | 8ac8243 / LEDGER原话 | 秘书逐字记录U74–U76；已由U80精简但有效原文保留 | 保护 | D15-01②；ArchiveD15Intent71f77ed4/0daa54ca与777052af报告。其E33过程记录非现行恢复目标。 |
| P025 | 2161131 / LEDGER原话 | 秘书逐字记录U77/U78；当前索引保留；原R87边界已被U79/U80替代 | 保护 | D15-01②；LedgerU77b88197bc6/4a5f8470；不复活“仅归档待采纳”的旧指导。 |
| P026 | acab3ee / LEDGER原话 | U79逐字录入及直接授权的规范落实 | 保护 | D15-01②；LedgerU79fd9ec528：6c1faea..acab3ee；旧R/E流水已被U80取代。 |
| P027 | 5fe9179 / 基线登记 | 秘书记录ArgonGovernance基线已原样归档；当前U80版仍保留该合法事实 | 保护 | D15-01②；ArchiveGovBaseline41682a3d，acab3ee..5fe9179；不将拥有方自报读过变成runtime。 |
| P028 | 4455170 / LEDGER.md | R19及D15决策索引记录通过、归档及仍冻结边界 | 保护 | 本轮D15-10①秘书合法归档推进；当前指定核对基准，git show仅该4行diff；不纳私自工程revert。 |
| P029 | 旧LEDGER会话录入中的逐字U部分 | 1e73444、2e9ab60、d51835f的用户原话；当前已由bdaa278整理替代 | 保护 | D15-01② / D15-07；保护有效原话，不单独revert已被取代的旧R/E/名册，也不因这些commit混有状态归因而恢复旧正文。 |
| P030 | PM e519e5b | U57要求的30份旧会话分析报告，跨仓只登记保护边界 | 保护 | D15-01②；本轮不读session01a193fd、不操作PM；交PM执行者单仓落实。 |
| P031 | PM argon基线与替换文本 | 37e6c73、f88748d、dc7893c、D15-governance-baseline后续VG-4修订、D15-08-replacements.md | 保护 | D15-01②；原样归档与ArgonGovernance记录已读；不由soroi执行者修改或投票。 |
| P032 | D10–D14/D11档案、选票、PM决策对象 | 记录保留、效力暂停；不当作本轮恢复工程依据 | 保护 | D15-01首段；当前通过D15并不免除design回写revert。 |
| P033 | 已合PR正文与全部已发评论 | PR269/270/271/278/279正文、review/issue评论与同步评论 | 保护 | D15-03 / D15-07；只由秘书另发暂停效力说明，不编辑删除旧记录；范围外评论无回写。 |
| P034 | .workers/eng-store/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P035 | .workers/eng-plugin/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P036 | .workers/eng-e2e/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P037 | .workers/eng-lab3/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P038 | .workers/eng-web/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P039 | .workers/eng-ops/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P040 | .workers/eng-rt/sessions | 整个原始会话目录及其子agent、日志、local证据 | 保护 | D15-01④；本轮恢复分支、清理worktree不触碰此证据目录；仅前三个工程记录被本文【W】读取。 |
| P041 | Pepgent/Pepgent 978bc0e | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P042 | Pepgent/Pepgent 2d46c1d | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P043 | Pepgent/Pepgent 286f8cb | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P044 | Pepgent/Pepgent 1038aee | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P045 | Pepgent/Pepgent 21f4217 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P046 | Pepgent/Pepgent e44f068 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P047 | Pepgent/Pepgent b212fb6 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P048 | Pepgent/Pepgent a331057 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P049 | Pepgent/Pepgent f35103b | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P050 | Pepgent/Pepgent f7a3313 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P051 | Pepgent/Pepgent a9756eb | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P052 | Pepgent/Pepgent d110c7c | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P053 | Pepgent/Pepgent e83c2f2 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P054 | Pepgent/Pepgent 9a6d455 | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |
| P055 | Pepgent/Pepgent 031d01c | 无关前端会话提交（跨仓保护边界；不访问其根checkout） | 保护 | D15-01③逐个列名；本仓无执行动作，不用区间替代，不自行核验或联系无关会话。 |

## 预审重点与已定位缺口

1. **STO-05原patch不必凭空重建。** 已找到【W】完整五文件原diff（`store/4.bash-original.log`，587行；本次分页读至末尾）与原untracked streams全文（store根entry `1ae41ae8`，59行）。这是原始文件/补丁内容而不是hash对比。其来源都在本轮工程师尚未改SSE前；StateInventory原5M+1??清单独立对应。若双核接纳工程师记录为D15-02(a)，可按原a43336c ref+这六文件恢复，不必用c1d7e53的混合WIP冒充旧patch。若双核否定该读取解释，相关原tip/patch与15个e2e dirty归因结论不得据此执行，须重新标BLOCKED，不是用本报告自行扩大授权。
2. **eng-store-home的37个staged并不等于37个人工改动。** 已查工程师根记录的checkout/index操作，找到 `10742198→54fbeb5e` 在07:18:52Z执行 `git switch --ignore-other-worktrees main` 成功；此后根main不断向前。当前37项与新commit相反，含删除用户授权的argon-governance和watchdog等；[INFERENCE]可能是独立工作副本/index停留旧树、共享ref已前进的结果。未获得每个文件的实际写入或索引变化来源，因此本表逐文件冻结，而非假定它们是待删除的“恶意patch”。原STO05遗产在另一旧worktree，不能混为一谈。
3. **X-95 npm并非从未创建过对象。** 【W】store `72e5038e→b4249c72`（08:32:07Z）确实创建过 `issue-store-npm-contract` 与 `/tmp/pepgent-store-npm`，head9c3753c；`66b08112→925b3098` worktree remove成功、`5ab1ae5b→1d567e90`（08:33:04Z）删除分支成功。当前refs/worktree list无该ref/tree，直接read该目录返回not found；所以没有该对象的现存差集，不再重复删除。npm consumer失败EUNSUPPORTEDPROTOCOL只是旧运行事实，本步没有重跑。另有`/tmp/store-npm-repro-k4qL`测试目录创建记录，不属于本任务指定的仓库或注册worktree；仅交治理分身知悉，不扩张清理范围。
4. **会话新建issue并非全都OPEN。** 当前274为completed关闭；D15要求改为not planned，并非因已closed而跳过。196会话前OPEN、prepublish时CLOSED，需要重开；219会话前OPEN、当前已reopened OPEN，不再重复开关。26个body恢复与3个旧issue重开各自独立，不能以PR关闭替代正文恢复。
5. **AGENTS第39行例外句**是唯一单独冻结的文本分类对象；工作方式禁令七条保护不受影响。正文第5/13/58行是U80授权更改；秘书14–16行已由U80整体替换，不为回退d23d997复活旧秘书规则。watchdog第28行既有U80/81语义也继承PASS句，按双核替换稿整段切换，不整文件保护或先删再建。
6. **父子边**：当前276、277实际parent为[PM21](https://github.com/Pepgent/PM/issues/21)，不是散文依赖。各有独立移边行。闭issue不等于已移边；跨仓边的实际操作方须预审明确，本执行者未为协调发消息。
7. **附加关联树**：Git当前仍登记 `/tmp/pepgent-store-203` 与 `/tmp/pepgent-store-contract`，均为【W】明确会话新建。contract当前clean；203有唯一untracked `scripts/__pycache__/build-release.cpython-315.pyc`，生成来源未定位，文件与树移除动作都冻结。本次没有因为“cache”自动删除。

## 尚不属于差集动作的记录

- 会话前分支/旧worktree与当前未展示会话变动的refs均保持；不遍历历史证明其“应删”，不清理prunable。旧工程树中的STO05/SOR09/安装探针是遗产所在地，不因当前branch merge过就移除。
- 已合PR的正文与所有已发评论保留；INDEX3.3中soroi评论逐项已读映射，未重新拉GitHub事件。D15-07暂停效力说明由秘书另发，本文不发。
- 跨仓保护列（PM用户报告、argon基线、Pepgent15提交）是防误伤边界，不表示soroi执行者执行了那些仓库的盘点/回退，也不表示已接触其工作区。
- 恢复分支只适用于旧非main ref；main永不reset/force push。表中9个revert是同仓严格按CommitDate从新到旧的编号，实际仍须③以revert PR合入；本报告未创建该PR。
- 三张表是取回时刻材料与预审意图，不是已执行状态。没有运行代码、测试、构建、runtime、hash验证；没有git/GitHub写入。只有本文件被写入。

## 数量与交付边界

- 会话前状态表：**66条**。
- 差集表：**122条**（包括主线revert9、逐文件dirty与关联worktree，按每个对象/动作一行计）。
- 保护段落表：**55条**，每项均标“保护”。
- 差集表冻结BLOCKED：**41条**：AGENTS:39一句1条；eng-store-home staged文件37条及其home移除1条；/tmp/pepgent-store-203未跟踪cache1条及其树移除1条。此计数按动作行，不冒称41个独立根因。
- 上述数量不含LEDGER核对清单、来源说明、已撤销npm对象或未变遗产的散文解释。预审通过前所有拟执行动作均未执行，BLOCKED对象维持原地。
