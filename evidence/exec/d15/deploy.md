# Pepgent/deploy：D15-10② 只读预审包

## LEDGER `4455170` 逐项核对记录（本步骤开始时适用，U69）

已完整读取执行契约、D15 定稿、当前 LEDGER，并用 `git show 4455170:LEDGER.md` 读取指定对象；编号是对象地址，不是 hash 校验证据。以下只核对本次只读盘点，不把台账既有“✅”升级为本人重新验证的结论。

- **C1**：C1-1 不从历史提取或重新设计 soroi；C1-2 只负责 deploy，本地读取范围为 deploy 根及其三个登记 worktree，不碰 Pepgent/Pepgent 根 checkout；C1-3 不写代码、不写/跑测试、不做跨组件门禁、不用 hash 作为证据；C1-4 不连接生产、Komodo、Slurm、Docker 或数据库，不解密 SOPS。
- **C2**：C2-1 只将已通过 D15 映射到对象，不自行裁定规则或恢复工程；C2-2 独立取证，不请 Argon 双核代查；C2-3 不重新设计、投票或计票，本包留待双核预审；C2-4 保留用户授权产物，不以另立表决跳过。
- **C3**：C3-1 本任务为明确单仓只读主题；C3-2 本人是执行子任务，不作为独立 Claude 族票；C3-3 不用本次盘点替代高阶审查；C3-4 不启动 tern、不复用跨仓工程进程、不切分支/工作树；C3-5 不改 skill、角色或 harness。
- **C4**：C4-1 不发 issue/PR 评论或常规状态消息；C4-2 全中文，不联系任何 agent/会话，不在 PTY 起 omp；C4-3 当前状态向 Git/GitHub GET 请求，local 仅为本次预审材料，不改 LEDGER、不冒称回退已完成。
- **C5**：C5-1 仅由本子代理读取获准的 01a195a6 记录，不读 01a193fd，不开展预设罪名分析、不作导师前审；C5-2 本节逐项核对 C 与 R；C5-3 差集排除会话前代码、旧分支与证据目录；C5-4 工程冻结保持，只推进本步治理盘点。未调用导师/其他 agent。
- **R1**：不重开转向调查，不从 git 历史提取设计。
- **R2**：不改 design，不提前恢复 D10–D14 回写效力。
- **R3**：保持 deploy 独立仓边界，不开仓或迁仓。
- **R4**：双核角色定义与其授权内容不在本仓回退范围；不联系双核。
- **R5**：依已通过 [D15 / PM#23](https://github.com/Pepgent/PM/issues/23)，不新立决策或票。
- **R6**：本报告交派发者自动收取，不代秘书归档或更新台账。
- **R7**：不启动 watchdog、behavior-analyst 或额外子代理。
- **R8**：不恢复工程师，不起 PTY omp，不触碰无关会话。
- **R9**：只读取 ref/worktree，不切分支，不更新 refs 或发评论。
- **R10**：不读 01a193fd；30 份用户授权报告保持保护。
- **R11**：U80 整理、修正与其治理文档段落保持保护，不回退 LEDGER。
- **R12**：不重新运行环境准备或部署检查，不读凭据。
- **R13**：只盘点 deploy；dded751/56eaff7 会话前成果明确保护。
- **R14**：不处理 soroi 代码。
- **R15**：不处理 Pepgent 应用代码，无关前端 15 提交逐名列保护。
- **R16**：不跑 A0/F01–F31，不降低最终验收范围。
- **R17**：不冒充 D9/F32 差距分析。
- **R18**：仅复用与补齐已归档取证，不恢复已停工程进程。
- **R19**：D15 已通过是本步骤前提，不把建立决议等同执行回退完成。
- **R20**：本次只交会话前状态、差集、保护段落；零回退、零 GitHub 写入。
- **R21**：不开展双核合法性复核，不恢复派工；本包供预审而非替代预审。

## 问题、方法与边界

**决定性问题：** 在获准来源内，能否为 deploy 的每个拟回退对象同时定位 05:48:24Z 会话前状态、当前状态、INDEX 归因，并将会话前 seed 成果与会话内改动分开？

步骤：先读契约/定稿/LEDGER/INDEX 3.1–3.7 与 G4，再从原 session 的改写前读取结果、当前 PR 字段和当前 refs 建基线；读取点名 commit 的内容及点名对象间 diff；检查根与三个 worktree 的当前只读 status；缺来源的对象冻结。最便宜的决定性观察是改写前 issue 工具结果与 PR9 的 base SHA；seed 分支恢复位置由会话 push 的 `56eaff7..419a286` 补足。

**范围外：** 执行 revert、改 issue/PR/Project、移动父子边、删/恢复 ref、移除 worktree、实际部署与运行中环境对账。仓外专用部署 clone、Komodo Variables、凭据及数据卷不作为本仓 worktree 清理对象。未运行 git log/reflog，未遍历提交历史，未读取 GitHub 编辑历史或 timeline/events。G4 旧报告中包含这些旧取证方法；本次只把该报告当作已归档索引，不把其历史读取结论作为缺失基线的替代。

**假设与保留：** 本报告是逐项来源支持的快照，不声称能证明所有不可达/已删除对象从未存在。PR 元数据与 commit 时间的时钟差异原样保留；revert 顺序用点名 commit 的 CommitDate，不校正 GitHub 的时间。

### 来源编号

- **S1**：`session://01a195a6/entry/239d6dfb`，06:51:29Z 改写前读取 [deploy#1](https://github.com/Pepgent/deploy/issues/1)：OPEN、Updated 04:37:05Z，完整 Body 第11–50行。
- **S8**：`session://01a195a6/entry/51a5995a`，06:46:00Z 改写前读取 [deploy#8](https://github.com/Pepgent/deploy/issues/8)：OPEN、Updated 05:27:31Z，完整 Body 第11–58行，另含会话前评论 6553917058。
- **SE**：`session://01a195a6/entry/5656e900` 与 `0b3e456f`，06:46:09/11Z 的删除 images#6 父边、添加 images#3 父边回执；前者本次实际读到结果 `6`。原窗口 `session://01a195a6/timeline?since=2026-11-01T064500Z&until=2026-11-01T065000Z`。
- **SI**：`local://state/inventory.md:214-225,922-929`，01a195a6.StateInventory 的 06:18:31/32Z 只读盘点：根 main 干净、deploy-8 既有树干净；本地分支列表尚无 issue-1/11。D15-01 明确认定 deploy seed 为会话前遗产。06:18 快照本身不冒充 05:48 的精确创建时刻。
- **T（待双核确认读取范围解释）**：`/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac.jsonl`。按执行契约先读并单独标记，不能隐去 D15-02(a) 的解释待确认：entry `4f8fbd90`（06:48:52Z）push `56eaff7..419a286`；`e50ddc5c`（06:49:30Z）push `419a286..4589a17`；`fa7a89a9`（06:46:09Z）worktree list 根 a5fecf1、deploy-8 56eaff7；`3dd27155`（06:54:04Z）new branch issue-1-release-init、HEAD 35d309f；`b3616147`（07:56:14Z）new branch issue-11-central-identity、HEAD c29e216。这些是原始工具结果，不是工程师口头完成声明。
- **G**：本次在 deploy 目录实际执行 `git rev-parse HEAD main origin/main`、`git for-each-ref --format='%(refname) %(objectname)' refs/heads refs/remotes`、`git worktree list --porcelain`、`git ls-remote --heads origin`；逐树执行 `git --no-optional-locks status --short --untracked-files=all`。根、deploy-1 无条目；deploy-8/11 各有 `?? scripts/__pycache__/central.cpython-315.pyc`。没有 fetch/pull/checkout。
- **C**：本次 `git show --no-patch --format=fuller` 读取 D15/G4/PR 点名的 a5fecf1、dded751、56eaff7、419a286、4589a17、35d309f、925864a、c29e216、01b0fb4、b4be605、26a0c8a；读取 dded751/56eaff7 补丁、`git diff 56eaff7 4589a17`、`git diff c29e216 26a0c8a` 相关文件与 diff stat。SHA 仅作对象地址。
- **H**：本次 `gh api 'repos/Pepgent/deploy/issues?state=all&per_page=100'` 与 `/pulls?state=all&per_page=100` 当前字段，单独 GET #1/#8 完整 body；GraphQL 当前 issue parent/subIssues/projectItems。GH 当前活动账号为 RiriAgent，未切账号。读取 current conversation comment 的 id/url/created_at/updated_at，没有读编辑历史或事件。
- **I**：`local://inv/d15/INDEX.md` 的 deploy 相关 3.1–3.7 行；`local://inv/d15/G4.md` 作索引及既有报告，不重新执行其中 log/reflog/events 命令。
- **P**：`local://inv/d15/d10-rewrite-snapshot/deploy.json` 只含 #1、已是主会话改写后的 body；`publication.json` 的49个发布对象没有 deploy，不能用这个快照恢复 #1/#8 的会话前正文。二者恢复必须用 S1/S8。

本轮最后读取时间锚点：`date -u` → **2026-11-01T10:10:26Z**。H/G 是本轮取回快照，而非承诺执行时仍未变化。

## 表一：会话前（2026-11-01T05:48:24Z）状态（18 项）

| ID | 对象 | 会话前状态 | 来源与确定程度 |
|---|---|---|---|
| B01 | deploy main / origin/main | `a5fecf1d0ee3d2f216afaffa730a10d833180a6d` | H：[PR7](https://github.com/Pepgent/deploy/pull/7) merge 04:32:52Z；[PR9](https://github.com/Pepgent/deploy/pull/9) base 同值。C：PR9 第一 parent 同值。T 的06:46当前根同值为补证，不以当前HEAD倒推。 |
| B02 | issue-8-lab-auth-seed（本地/远端） | `56eaff7eb3ff26c144a926d0c2b46e948b1e92d3`，已存在/已推送 | T：`56eaff7..419a286` 的 old ref；SI 已有此分支；D15-01 指名保护 dded751/56eaff7，C 05:18:00/05:27:32Z 内容。精确 ref 依赖 T 范围获准。 |
| B03 | issue-2-central-stack | `1db43d3b1e1b1488f51aecf99db4c1b5fcf2bcd7` | H：[PR4](https://github.com/Pepgent/deploy/pull/4) 会话前 head，SI 已存在；G 现存同一 ref。 |
| B04 | issue-3-remote-catalog | `ab077aa412216cc2f13bf20fe2fb93ef3b67e466` | H：[PR5](https://github.com/Pepgent/deploy/pull/5) 会话前 head，SI 已存在；G 现存同一 ref。 |
| B05 | issue-6-slurm-consumers | `05f44745ecd65e9ced466634392222acc262d09e` | H：[PR7](https://github.com/Pepgent/deploy/pull/7) 会话前 head，SI 已存在；G 现存同一 ref。 |
| B06 | issue-1-release-init | 不存在；本会话新建 | T：06:54:04Z Preparing worktree (**new branch**)；SI 的较早分支列表无此名。 |
| B07 | issue-11-central-identity | 不存在；本会话新建 | T：07:56:14Z Preparing worktree (**new branch**)；SI 无此名。 |
| B08 | [deploy#1](https://github.com/Pepgent/deploy/issues/1) | OPEN；标题 DEP-03 中心 store 发行初始化；完整 body 取 S1；parent null、无 child | S1：Created00:45:51/Updated04:37:05，验收为真实 GET releases/objects，VS2 与 STO-12/DIST-01 runtime 前置；H 当前 parent null/无child，I 未列本会话改其边，父边不拟操作。 |
| B09 | [deploy#8](https://github.com/Pepgent/deploy/issues/8) | OPEN；标题“在 Web serving 前初始化 Lab 管理员并隔离 bootstrap 输入”；完整 body 取 S8；父 [images#6](https://github.com/Pepgent/images/issues/6) | S8：Created05:09:29/Updated05:27:31；SE 删除旧父边成功。原body含完整真实浏览器、会话持久、4行验收。 |
| B10 | [deploy#11](https://github.com/Pepgent/deploy/issues/11) | 不存在 | H Created07:56:09Z，I X-68/X-83。 |
| B11 | [deploy#13](https://github.com/Pepgent/deploy/issues/13) | 不存在，因此无 PM#21 父边/Project item | H Created09:10:56Z；I V11B/X-87 与创建链。 |
| B12 | [deploy#14](https://github.com/Pepgent/deploy/issues/14) | 不存在 | H Created09:11:42Z；I X-78/X-83。 |
| B13 | [PR9](https://github.com/Pepgent/deploy/pull/9)、[PR10](https://github.com/Pepgent/deploy/pull/10)、[PR12](https://github.com/Pepgent/deploy/pull/12) | 均未创建 | H Created06:50:32、07:16:52、09:10:07Z；已有 seed **分支**不等于已有 PR9。 |
| B14 | deploy 根 checkout | 已存在，main=a5fecf1；未见会话前脏改动 | SI 06:18:31根干净；D15 会话前合法DEP成果与H PR7补证。不是新worktree，不移除。 |
| B15 | `/Users/mouriya/Ext/worktrees/deploy-8` | 会话前已有 seed 工作树，分支 B02；不删除 | D15-01遗产、SI 06:18:32 clean、T较晚list；I3.7明确既有。没有用旧报告reflog作依据。 |
| B16 | `/Users/mouriya/Ext/worktrees/deploy-1` | 本会话新建 | T `3dd27155` 明确 new branch/APFS clone 成功；主会话 `97347527` 回报已建为额外线索。 |
| B17 | `/Users/mouriya/Ext/worktrees/deploy-11` | 本会话新建 | T `b3616147` 明确 new branch/APFS clone 成功；I X-68。 |
| B18 | Project：#1/#8 旧item状态；两树 pycache | 会话前 Project Status 未取得；deploy-8 pycache 的05:48内容/来源未取得；deploy-11树不存在但不据此推断其现有pycache作者 | 不读取 timeline/events 补洞；SI的06:18 clean只能证明该观察时刻无未跟踪条目，不能替代05:48状态或创建者归因。相关对象冻结，见差集。 |

## 表二：差集（现状 − 会话前 − 保护名单，27 项）

所有“拟执行”仅供预审，**本次一项未执行**。C 中三个 merge 的 CommitDate 为 08:15:12Z、07:17:34Z、06:50:51Z，revert 从新到旧编号 **1→2→3**。非 merge 五项列明覆盖关系，不对同一内容再重复 revert。

| ID | 对象 | 现状 | 会话前状态 | INDEX归因 | D15行 | 拟执行动作 / 冻结缺口 |
|---|---|---|---|---|---|---|
| D01 | main 的 [PR12](https://github.com/Pepgent/deploy/pull/12) merge `26a0c8a` | H/G已合；D13身份生产注入，含01b0fb4/b4be605 | B01未合 | X-68/X-83 | D15-05⑦ | **revert顺序1：`26a0c8a -m 1`**，经revert PR；不改已合PR正文评论。 |
| D02 | main 的 [PR10](https://github.com/Pepgent/deploy/pull/10) merge `c29e216` | 已合；非活动release-init/overlay | B01未合 | X-56/X-58 | D15-05③ | **revert顺序2：`c29e216 -m 1`**；不单独保留dot拒绝或overlay。 |
| D03 | main 的 [PR9](https://github.com/Pepgent/deploy/pull/9) merge `35d309f` | 已合；含会话前seed与会话内README | B01未合；seed仅在B02 | X-30/X-39 | D15-04 | **revert顺序3：`35d309f -m 1`**；同时保留/恢复B02、B15的dded751/56eaff7。保护是把旧成果留在原分支，不是把会话内合并永久留main；不得删除旧分支或旧树。 |
| D04 | `01b0fb4` | PR12的身份生产/初preview写入；main可达 | 无 | X-68（preview具体选择非leader逐字指令） | D15-05⑦ | 随D01撤其净内容；不再单独revert。 |
| D05 | `b4be605` | PR12 preview改report-only；main可达 | 无 | X-68（工程师修正，非捏造leader决定） | D15-05⑦ | 随D01撤净内容；不再单独revert。 |
| D06 | `925864a` | PR10客户端/overlay/README；dot分支仍在 | 无 | X-56/X-58 | D15-05③ | 随D02撤；不重复revert。 |
| D07 | `419a286` | PR9 README将浏览器义务移S2、parent改images3 | B02的原README | X-39 | D15-04 | main随D03撤；旧分支随D18恢复，保留原段。 |
| D08 | `4589a17` | PR9 README串行/whole-stack重启边界 | B02原README，无这次追加/改写 | X-30任务链；具体措辞非Main逐字指令 | D15-04 | 同D07；按无效派工产物处理，不虚构具体leader措辞。 |
| D09 | [#1](https://github.com/Pepgent/deploy/issues/1) body | 本仓协议桩+统一S2承接 | S1完整原body | X-41/X-45 | D15-04 | 恢复S1 Body11–50全部正文；不使用P的已改写#1；不把早期错误“先objects上传”恢复进去。 |
| D10 | [#1](https://github.com/Pepgent/deploy/issues/1) state | CLOSED completed | S1 OPEN | X-56/X-58 | D15-04/05③ | 重开；评论6554797010不改。是否新增引用PM#23的裁决作废说明由双核预审，非本轮擅自发。 |
| D11 | [#8](https://github.com/Pepgent/deploy/issues/8) body | 3行本仓检查、浏览器移S2、Parent images3 | S8完整原body | X-39 | D15-04 | 恢复S8 Body11–58全部正文；标题当前与旧标题一致，无标题改动可撤。 |
| D12 | [#8](https://github.com/Pepgent/deploy/issues/8) state | CLOSED completed | S8 OPEN | X-30/X-39 | D15-04 | 重开，保留已发评论。 |
| D13 | [images#3](https://github.com/Pepgent/images/issues/3) → [deploy#8](https://github.com/Pepgent/deploy/issues/8) | H parent images3 | SE/S8 parent images6 | X-38 | D15-04 | 移边回 [images#6](https://github.com/Pepgent/images/issues/6)；同一跨仓边由本仓child负责提案，images执行者勿重复操作。 |
| D14 | [#11](https://github.com/Pepgent/deploy/issues/11) | CLOSED completed | 不存在 | X-68/X-83 | D15-05⑦ | 会话新issue：关闭原因为not planned，保留正文/评论并引用[PM#23](https://github.com/Pepgent/PM/issues/23)；不是重开旧issue。 |
| D15 | [#13](https://github.com/Pepgent/deploy/issues/13) | OPEN | 不存在 | X-87/V11B | D15-07 | not planned关闭，评论引用[PM#23](https://github.com/Pepgent/PM/issues/23)。 |
| D16 | [PM#21](https://github.com/Pepgent/PM/issues/21) → [deploy#13](https://github.com/Pepgent/deploy/issues/13) | H真实parent存在 | 无child、无边 | V11B / X-87 | D15-07 | 移除会话新增父边；跨仓边本仓child提案，PM勿重复执行。 |
| D17 | [#14](https://github.com/Pepgent/deploy/issues/14) | OPEN，未有对应实现 | 不存在 | X-78/X-83 | D15-05⑦ | not planned关闭，评论引用[PM#23](https://github.com/Pepgent/PM/issues/23)，不假称调用方artifact代码已回退。 |
| D18 | 本地/远端 issue-8-lab-auth-seed | `4589a17` | `56eaff7`（B02，T） | X-30/X-39 | D15-04，依D15-03 | 恢复旧ref到`56eaff7`；仅非main可force-with-lease，不能删分支。**以T读取范围获双核承认为前提**；不承认则精确旧ref来源缺失，改冻结，绝不猜。 |
| D19 | 本地/远端 issue-1-release-init | `925864a` | 新建（B06，T） | X-43/X-56/X-58 | D15-05③ | D21移除后删会话分支，非恢复到35d309f；T范围待确认。 |
| D20 | 本地/远端 issue-11-central-identity | `b4be605` | 新建（B07，T） | X-68/X-83 | D15-05⑦ | 拟删会话分支；本地删除依赖D22解除冻结，不能先强行拆掉dirty树；T范围待确认。 |
| D21 | `/Users/mouriya/Ext/worktrees/deploy-1` | G登记、clean、925864a | 本会话新树（T） | X-43/X-56 | D15-05③ / D15-06工作树 | 拟移除会话新树，再D19；T范围待确认。 |
| D22 | `/Users/mouriya/Ext/worktrees/deploy-11` | G登记、b4be605，存在D24未知文件 | 本会话新树（T） | X-68 | D15-05⑦ / D15-06工作树 | **冻结 BLOCKED**：树创建已定位，但不能用移树间接删除D24未知来源文件。缺D24归因/合法保留处置；本地D20同步暂停。 |
| D23 | deploy-8 `scripts/__pycache__/central.cpython-315.pyc` | G未跟踪，未读二进制 | 05:48内容及创建者未知 | 未找到 | D15-06，依D15-02 | **冻结 BLOCKED**：缺对象来源及会话前内容；不因“缓存”推定可删。旧树本身保留，不能用clean清掉它。 |
| D24 | deploy-11 `scripts/__pycache__/central.cpython-315.pyc` | G未跟踪，未读二进制 | 树新建，但文件作者/生成链未知 | 未找到 | D15-06，依D15-02 | **冻结 BLOCKED**：缺具体生成链归因；不因位于新树就推定可删。阻塞D22。 |
| D25 | [#1](https://github.com/Pepgent/deploy/issues/1) Project item `PVTI_lADOE4p_hs4BjKDXzhFFajA` Status | H Done /07:17:38Z | 会话前Status未取到 | X-30相关自动化；Main逐字段指令未找到 | D15-04，依D15-02 | **冻结 BLOCKED**：不猜会话前Todo/In progress，不手改Project。重开issue与Project恢复分开。 |
| D26 | [#8](https://github.com/Pepgent/deploy/issues/8) Project item `PVTI_lADOE4p_hs4BjKDXzhFG4-o` Status | H Done /06:50:56Z | 会话前Status未取到 | X-30相关自动化；Main逐字段指令未找到 | D15-04，依D15-02 | **冻结 BLOCKED**：同D25，缺原Status。 |
| D27 | [#13](https://github.com/Pepgent/deploy/issues/13) Project item `PVTI_lADOE4p_hs4BjKDXzhFH-Fc` | H存在Todo /09:10:59Z | 无此issue/item | V11B创建链，但自动Status逐字段归因未找到 | D15-07，依D15-02 | **冻结 BLOCKED**：关闭issue/移父边已有授权，另删Project item或恢复Status并非D15-03明确动作；提请双核确认，不以关闭issue替代该对象的处置记录。 |

### 差集与保护相交处的明确边界

1. PR9 含受保护的 dded751/56eaff7，但这两份代码会话前在旧分支、不在main。按D15-03撤会话内merge与恢复旧ref是两项不同动作：main回到a5fecf1的内容，旧分支/旧树保留完整56eaff7内容。不重复revert旧提交，不丢弃旧分支，不将整份PR9代码认作本会话原创。
2. 三个merge累计净diff为6个tracked路径、367 insertions/11 deletions；其中会话前seed四文件89/8，不等于本会话原创。`56eaff7→4589a17`只改README、4/3。身份生产、release overlay与seed来源可区分。
3. 当前旧分支issue-2/3/6与其PR的head字段相符，本轮未发现应回退差异；不因旧合并分支仍存在就删除它们。
4. 当前主线README的“中心运行身份”“DEP-03发行导入”及相应代码属于D01/D02覆盖；“Lab认证初始化”与seed凭据/卷代码的大部分源于受保护dded751，只有两次README修订来自本会话。按源commit内容划分，不全文件豁免。
5. 19条已发会话评论及3份已合PR正文不是可删差集，逐项在保护表列出。D15-07要求的暂停同步说明由秘书另执行；本人没有发表评论。

## 表三：保护段落/对象表（56 项）

“保护”指不丢弃相应来源内容；旧分支成果在原分支保存，不能据此把其会话内合并也豁免。跨仓全局红线只列保护约束，本执行者不跨仓核验或操作。

| ID | 保护对象 / 内容段 | 标记与依据、位置 |
|---|---|---|
| P01 | deploy 会话前main `a5fecf1`整棵内容 | **保护**；D15-01①，B01。DEP-01/02、ENV-04等旧成果不重做；H PR7时间与PR9 base可定位。 |
| P02 | `dded751`：README seed/credential/lifecycle段 | **保护**；C补丁：56eaff7版README29、39、43–51、90、106、112；后续同段新增内容不一并保护。 |
| P03 | `dded751`：`scripts/central.py` | **保护**；SeedOrganization/LabAdminSeed、lab_auth_inputs、inject调用、apply的service-scoped StopStack；C补丁逐段显示。 |
| P04 | `dded751`：`komodo/syncs/central.toml` | **保护**；auth-seed ignore_services、管理员输入路径、BETTER_AUTH_URL、稳定secret Variable声明；不包含D13新增identity。 |
| P05 | `dded751`：`stacks/pepgent-central/compose.yaml` | **保护**；auth-seed service、seed/Web auth env、lab-db与只读seed输入、Web依赖seed成功。 |
| P06 | `56eaff7`：同compose的state-init command | **保护**；会话前05:27:32Z补丁`chmod 700 /state/lab`及前行分号，不能误删。 |
| P07 | 旧issue-8分支与deploy-8 worktree | **保护**；B02/B15；只恢复旧ref，不移除树，不丢D23未知文件。 |
| P08 | 旧issue-2-central-stack | **保护**；B03、[PR4](https://github.com/Pepgent/deploy/pull/4)。 |
| P09 | 旧issue-3-remote-catalog | **保护**；B04、[PR5](https://github.com/Pepgent/deploy/pull/5)。 |
| P10 | 旧issue-6-slurm-consumers | **保护**；B05、[PR7](https://github.com/Pepgent/deploy/pull/7)。 |
| P11 | [#1](https://github.com/Pepgent/deploy/issues/1)会话前body/标题与既有对象身份 | **保护**；S1整段恢复源，不删除旧issue，不照P快照恢复错误版本。 |
| P12 | [#8](https://github.com/Pepgent/deploy/issues/8)会话前body/标题、05:27:31Z评论 | **保护**；S8；原评论[6553917058](https://github.com/Pepgent/deploy/issues/8#issuecomment-6553917058)不改。 |
| P13 | [PR9](https://github.com/Pepgent/deploy/pull/9)已合正文/评论 | **保护记录**；D15-03不可变；只撤merge效应。 |
| P14 | [PR10](https://github.com/Pepgent/deploy/pull/10)已合正文/评论 | **保护记录**；D15-03。 |
| P15 | [PR12](https://github.com/Pepgent/deploy/pull/12)已合正文/评论 | **保护记录**；D15-03。 |
| P16 | [#8评论6554589839](https://github.com/Pepgent/deploy/issues/8#issuecomment-6554589839) | **保护记录**；06:46:09Z STARTED；X-38/39。 |
| P17 | [PR9评论6554627398](https://github.com/Pepgent/deploy/pull/9#issuecomment-6554627398) | **保护记录**；06:50:44Z review；X-30/39。 |
| P18 | [#8评论6554631896](https://github.com/Pepgent/deploy/issues/8#issuecomment-6554631896) | **保护记录**；06:51:15Z DONE；X-38/39。 |
| P19 | [#1评论6554639579](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554639579) | **保护记录**；06:52:09Z STARTED；X-41。 |
| P20 | [#1评论6554681051](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554681051) | **保护记录**；06:56:55Z wire等待；X-41/V10。 |
| P21 | [#1评论6554714166](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554714166) | **保护记录**；07:00:45Z D10同步；D15-07暂停效力而非改旧评论。 |
| P22 | [#1评论6554797010](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554797010) | **保护记录，不保护裁决效力**；07:09:51Z dot私有分类，X-58。作废说明是否追加待预审。 |
| P23 | [#1评论6554863471](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554863471) | **保护记录**；07:17:01Z PR通知。 |
| P24 | [PR10评论6554867233](https://github.com/Pepgent/deploy/pull/10#issuecomment-6554867233) | **保护记录**；07:17:24Z review。 |
| P25 | [#1评论6554875459](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554875459) | **保护记录**；07:18:19Z DONE。 |
| P26 | [#1评论6555011547](https://github.com/Pepgent/deploy/issues/1#issuecomment-6555011547) | **保护记录**；07:33:23Z D11A同步；不修改既发同步。 |
| P27 | [#11评论6555237900](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555237900) | **保护记录**；07:57:21Z STARTED/preview选择；X-68。 |
| P28 | [#11评论6555273732](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555273732) | **保护记录**；09:01:13Z D14同步，D15-07暂停说明另办。 |
| P29 | [#11评论6555337051](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555337051) | **保护记录**；09:07:49Z preview修正。 |
| P30 | [PR12评论6555361800](https://github.com/Pepgent/deploy/pull/12#issuecomment-6555361800) | **保护记录**；09:10:20Z D14等待。 |
| P31 | [PR12评论6555406386](https://github.com/Pepgent/deploy/pull/12#issuecomment-6555406386) | **保护记录**；09:14:51Z evidence。 |
| P32 | [PR12评论6555408666](https://github.com/Pepgent/deploy/pull/12#issuecomment-6555408666) | **保护记录**；09:15:05Z按leader指令合并。 |
| P33 | [#11评论6555419268](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555419268) | **保护记录**；09:16:09Z DONE。 |
| P34 | [#14评论6555604475](https://github.com/Pepgent/deploy/issues/14#issuecomment-6555604475) | **保护记录**；09:35:46Z producer通知；不是已交付deploy代码。 |
| P35 | `.workers/eng-ops/sessions`及全部后代/原jsonl | **保护**；D15-01④。包括DeploySeedReview、IdentityReview、ImagesReview、LibraryFileReview、LibraryMetadataReview、LibraryReview、ReleaseReview、SyncFreshness、local/task-log；不因清理worktree删证据。其他`.workers/*/sessions`同样不得触碰。 |
| P36 | PM `e519e5b`用户授权30份报告 | **保护（跨仓红线）**；D15-01②/U57，不读原01a193fd。 |
| P37 | soroi `6c1faea`双核定义 | **保护（跨仓红线）**；D15-01②/U77–78。 |
| P38 | `bdaa278`、`80b0267`、`b521200`对应LEDGER/AGENTS/secretary/watchdog授权段落 | **保护（跨仓红线）**；D15-01②/U80–82；不把同文件leader私自段落整体豁免。 |
| P39 | Argon基线规范与D15-08替换文本；秘书原样归档/逐字用户记录 | **保护（跨仓红线）**；D15-01②，点名PM `37e6c73`、`f88748d`、`dc7893c`、D15-governance-baseline VG-4修订、`evidence/argon/D15-08-replacements.md`；具体跨仓段落由各仓执行者列来源确认，本仓不代作作者结论。 |
| P40 | Pepgent无关提交 `978bc0e` | **保护（跨仓红线）**；D15-01③/U59。 |
| P41 | Pepgent无关提交 `2d46c1d` | **保护（跨仓红线）**；同上。 |
| P42 | Pepgent无关提交 `286f8cb` | **保护（跨仓红线）**；同上。 |
| P43 | Pepgent无关提交 `1038aee` | **保护（跨仓红线）**；同上。 |
| P44 | Pepgent无关提交 `21f4217` | **保护（跨仓红线）**；同上。 |
| P45 | Pepgent无关提交 `e44f068` | **保护（跨仓红线）**；同上。 |
| P46 | Pepgent无关提交 `b212fb6` | **保护（跨仓红线）**；同上。 |
| P47 | Pepgent无关提交 `a331057` | **保护（跨仓红线）**；同上。 |
| P48 | Pepgent无关提交 `f35103b` | **保护（跨仓红线）**；同上。 |
| P49 | Pepgent无关提交 `f7a3313` | **保护（跨仓红线）**；同上。 |
| P50 | Pepgent无关提交 `a9756eb` | **保护（跨仓红线）**；同上。 |
| P51 | Pepgent无关提交 `d110c7c` | **保护（跨仓红线）**；同上。 |
| P52 | Pepgent无关提交 `e83c2f2` | **保护（跨仓红线）**；同上。 |
| P53 | Pepgent无关提交 `9a6d455` | **保护（跨仓红线）**；同上。 |
| P54 | Pepgent无关提交 `031d01c` | **保护（跨仓红线）**；同上。 |
| P55 | D1–D8旧基线与其他仓会话前遗产 | **保护（跨仓红线）**；D15-01①：images d40585f、library83ebca0、Pepgent feat/lab-10-library、SOR09原实现、STO05原6文件patch、mux issue13原草稿、旧PR260/266；不在deploy差集中执行。 |
| P56 | D10–D14、D11A/B/C决策档案、选票与PM决策issue | **保护记录，效力暂停**；D15-01，不删档案，不因本次撤执行产物改写过去投票。 |

## 当前对象定位补充与预审待定点

当前G读取的全部deploy远端分支共7条：main=`26a0c8ac318db996f1d207010288fe01994c9c80`；issue-8=`4589a1702010bbda60bd642b65b5463a10bcc126`；issue-1=`925864a676bdbe658a1b4005730723930fc14e12`；issue-11=`b4be605ed62fa6930872a656e9d2b0a8ecfb2da5`；其余旧issue-2/3/6见B03–05。根与origin/main现均在26a0c8a。此为ref源头返回，不是hash验证。

- **固定冻结6项**：D22、D23、D24、D25、D26、D27。D20本地删除有D22前置阻塞，不重复计成独立缺口。D23/24来源未确认，不能按扩展名自动删。
- **T范围待双核确认**：B02、B06/07、B16/17、D18–21显式使用工程师`.workers`原记录。按契约先读取并单列，未擅自宣布解释通过；若该范围不纳入D15-02(a)，精确seed旧ref及新树创建回执需从合法来源补足，受影响动作转冻结，不凭G4的reflog结果补洞。
- **Project处置待定**：D25/26缺原Status；D27虽然新item归因到V11B创建链，但D15的具体动作表没有明确Project item删改方式。已将其冻结而非悄悄省略。关闭/重开issue不自动等于Project回到了会话前。
- **跨仓边唯一动作对象**：D13、D16以deploy child为入口；双核需在整合包中指定一次执行，不能两仓同时移动同一边。本报告未联系images/PM执行者。
- **PR9保护解释供核对**：D03与D18须成套满足“main撤会话merge、旧分支完整留存”。没有设计新的cherry-pick/补偿提交，也没有执行任何保护重写。
- **秘书专属动作**：D15-07对收到同步评论的对象追加暂停效力说明、D15-08文本替换、LEDGER状态替换，均不由本次只读盘点执行。重开旧issue后的裁决作废说明是否采用，按契约交双核预审。

## 交付与证据限度

本报告完整三表：会话前状态 **18项**、差集 **27项**、保护段落/对象 **56项**；差集固定冻结 **6项**，另明确T来源范围的条件性缺口。

唯一写入是`local://exec/d15/deploy.md`。未改仓库文件、未提交/push、未改GitHub对象、未发评论、未联系agent或会话。没有测试、部署或回退runtime验证；本步骤不要求也不允许把这些操作提前执行。以上只证明当前对象/会话原始工具回执及逐段来源已盘点，不证明D15-10③/④已完成。
