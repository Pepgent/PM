# 时间切片 7/12：实现期派工、契约裁决与验收依赖

## 范围、方法与结论边界

目标会话：`01a193fd-e992-76d2-8c29-060fe52cc094`。元数据返回 cwd 为 `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`，标题为完成 Soroi 最小功能集合，最终状态 `aborted`。

通过 `events.jsonl?q=[.,inputs]|length` 得到根会话 **N=1514**。按零基数组区间 `[floor(6N/12),floor(7N/12))` 分段，第七段为 **一基序号 758–883（126 个事件）**，时间 **2026-11-01 00:46:35.613Z–01:20:33.157Z**。向两边约加总事件数的 3%，实际通读 **713–929**；前后重叠仅作因果上下文。向后追踪本段发起事项，必要时追至目标会话结束，不把所有后续事项都纳入本段评价。

读取了完整事件（包括 thinking、call、IRC、subresult），补读所有本段有实质信息的 wait 返回：它们往往藏着 IRC，单看 events 的 call 行会漏掉真正决策依据。针对本段发起的原生子代理 `AuthorCUS02`、`EnvGateway` 和 `Governance3_844c` 读取相应结论与必要运行输出；独立 tern 工程会话不在授权内，**未打开这些 session**。未运行 git、未访问 GitHub；链接只是目标会话原文中的交付地址，当前状态未独立确认。

**总览：**本段不是无所作为。它实质推进了已有工程师的下一批任务、CUS-01/02、gateway 配置修复、store 读接口、Lab notice 修复和治理接班；亦反复区分代码交付与真实 live 验收。主要偏差是：**把新的公开契约直接作为 leader“技术裁决、不重投”发布；让 DONE 继续集中回 leader；对 CUS-04 保留了后来已被根因推翻的前置；将不能用哈希作证据的规则降格为“可以作附注”**。这些不等于本段全部成果无效，更不证明所有报告的 runtime 已经成功。

## 用户意图与当时可依据的要求

以下用户原话均来自目标根会话，不读取其引用的其他历史会话：

- **(U)** `#57d9d58b`，2026-10-31 22:14:14Z：“argon…核心边界是维持好我的原始设计意图…在代码和设计上的取舍是你自己做”，“对于历史session的调查永远只允许subagent调查”。后来用户进一步限制决策程序，不能只引用这句来抵消后面的投票要求。
- **(U)** `#8544bdb8`，22:18:38Z：“从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”；推荐独立 tern 工程/测试进程、秘书与领导分身。
- **(U)** `#75447a98`，22:30:54Z：“所有的设计，和重要决策…只能是你，你的分身，task high，argon，导师。”
- **(U)** `#fccb1a91`，22:32:32Z：“对于决策，遵照正常的民主投票…每一个条目需要写明what where how，取舍。”`#576af8ce`，22:35:07Z：“任何重大决策，以及投票事项…使用pm仓库的issue来管理。”
- **(U)** `#0bffd31f`，22:47:07Z：leader 是通讯瓶颈，建议 issue 评论/mailbox 异步总线，“leader 只处理上报和决策”；同时要求区分制度建立与实际执行验证。
- **(U)** `#a8cf7c58`，22:55:12Z：“对于领导的处理，我推荐你分身…你应该专注于推进。”
- **(U)** `#742b8876`，23:04:05Z：完整 omp 定制，走通所有流程，成为 Pepgent agent 核心，最后明确 Pepgent 与 soroi 缺失的点线面。`#5165b3b6`，23:07:02Z：soroi 是独立 omp 定制，不混入 omomp/fork。
- **(D，当前文件而非历史快照)** `AGENTS.md:9–24,30–43` 记录逐条投票、argon 的 U 证据门槛、异步总线、秘书职责、路径限定提交。这份当前文件含后加条款，本文不把所有当前条款倒推为 00:46Z 已有；与根用户原话吻合的部分可作佐证。

## 发现 1：按依赖接续派工确有发生，不是所有工程师都被动等待

**位置：**事件 758–765，`#a74218a3` 00:46:35Z、`#e7a8b73d` 00:46:51Z、`#6e48e974` 00:47:59Z、`#15f8d792` 00:48:06Z；事件 804–805，`#3009df2e`/`#9b066761` 00:56:42–47Z。

**摘录：**
- **(A)** 给 images：“下一项 IMG-04…依赖 LAB-01 合并…在那之前保持空闲。”
- **(A)** tester：“真实F01未运行、不判通过…等…依赖就绪后…继续真实验收。”
- **(A)** LAB-01 报合并后，leader 即通知：“按约开始 IMG-04”。

| 观察 | 解释 | 建议 |
|---|---|---|
| leader 没有为了填满 images 时间强行让其并行碰 remote 模板；LAB-01 到达后约五秒派出 IMG-04。tester 在 F01 live 等依赖时被派去 E2E-02/11a/13。store 工程师明确继续 SOR-02→03→STO-05/04/12。 | 与用户独立工程进程、按架构分工、持续推进的要求一致。未发现“本段所有 AI 都只在等待”的证据。images 短暂停驻有明确依赖依据；不能仅凭 wait 工具次数判定无效等待。 | 保留按可达功能接续的做法，但需修正后文过时依赖和终局验收阶段安排。 |

**后续结论（均为 A）：**IMG-04 基础交付到 `#021a1265` 03:34:07Z 才报告合并 [images PR 7](https://github.com/Pepgent/images/pull/7)，完整 root/live 仍 open；SOR-02 到 `#b1aa3558` 01:52:09Z 报 [PR 243](https://github.com/Pepgent/soroi/pull/243) 合并，SOR-03 到 `#3fe46949` 02:57:27Z 报 [PR 249](https://github.com/Pepgent/soroi/pull/249)。这些不是本段当时已完成的成果。

## 发现 2：测试代码与 live 义务明确拆开，没有把 fixture 成功冒充 F01/A0 通过；但产生了新的交付路由

**位置：**事件 763–765、774–775、818–819、840；`#6e48e974` 00:47:59Z、`#47ca559a`/`#2ae7a78f` 00:50:18–21Z、`#7831b60e` 01:00:30Z、`#8a27764c` 01:06:44Z。

**摘录：**
- **(A)** E2E-01：“valid 14行为断言通过但 fail=[live-build]…真实F01未运行、不判通过”。
- **(A)** leader：“代码 PR…关闭现成的实现 issue…每个仍欠真实验收的部分…另开…live 验收 issue…不留未合并的 PR 或长期 worktree。”
- **(A)** E2E-02：“fullA0:false…完整A0义务仍open”。

| 观察 | 解释 | 建议 |
|---|---|---|
| tester 主动提出 closing keyword 与“未验收 issue 保持 open”的冲突；leader 明示代码 issue/live issue 分开。E2E-01 [PR 187](https://github.com/Pepgent/soroi/pull/187) 对应 [live 182](https://github.com/Pepgent/soroi/issues/182)，E2E-02 [PR 240](https://github.com/Pepgent/soroi/pull/240) 对应 [live 235](https://github.com/Pepgent/soroi/issues/235)。 | 状态诚实、没有 fake pass，这点符合用户“不收缩全流程”和状态分层要求。但“代码提前合并、live另承接”是新交付流程裁决，不应等同原切片的完整验收；它也需纳入治理规则，而非默认为关闭实现 issue 就完成最终功能。 | 迁移时保留 code/live 关联，完整义务按原验收核对，不以合并率替代全流程进度。 |

**追踪结果：**`#2a0673c5` 01:53:14Z 报 [E2E-11a PR 246](https://github.com/Pepgent/soroi/pull/246) 合并、[live 245](https://github.com/Pepgent/soroi/issues/245) open，明确三个真实 flow not-run；`#c51fa60b` 03:25:47Z 报 [E2E-13 PR 256](https://github.com/Pepgent/soroi/pull/256) 合并、[live 250](https://github.com/Pepgent/soroi/issues/250) open，“不交假自动producer”。`#dde57dce` 03:34:05Z 报最终移除测试 worktree、返回 main。未发现这些上报把 live 义务宣称成功。

**阶段顺序限定：**本段确有“依赖未齐前先把驱动和 spec 写好”的命令。当前 `LEDGER.md:E6` 反而写“实现冻结后才开始写测试…不采纳”；后续用户 `#417eadf8` 05:27:00Z 明确指出“不是把东西开发好后再做e2e测试…一开始规划…有问题”。这是**后续明确纠正**，支持接续时改为先开发后统一 e2e；不能伪称本段已经收到这句后来指令。原始静态系统提示全文未在事件流完整呈现，故不以本次调查者自身规则冒充当时已注入证据。

## 发现 3：CUS-01 意图审查路线正确，真实缺陷被定位并交给拥有者

**位置：**事件 766–773、790–792、827；`#3f5caa33`（wait 返回）00:48:06Z、`#b6465d03` 00:48:45Z、`#3720cafe`（wait 返回）00:49:26Z、`#c4fc18e6` 00:50:04Z、`#826fc455` 00:53:14Z、`#68a938e9` 01:03:13Z。

**摘录：**
- **(A)** AuthorCUS01 无法 spawn argon：“Please route an argon intent review…I'm running the PTY check meanwhile.”
- **(A)** leader 请 Argon：“PASS / CHANGE（确切替换措辞 + U 原文引用）/ VETO…不改这三个文件。”
- **(A)** 缺陷上报：“Unknown model…runSubprocess passes no parent model…failed dry-run call then crashed the root omp…execute.ts:97”。

| 观察 | 解释 | 建议 |
|---|---|---|
| leader 充当工具权限缺口的单次路由；Argon 给三定义 PASS 并列 U 证据，没替作者写代码；崩溃与模型继承问题转给 eng-sor2 的 SOR-11，不要求提示词作者越界修核心。 | 符合用户 Argon 守意图、不写代码、工程角色各司其职。发现者没有把 Agent-body 的失败当全角色通过。 | 保留三定义及意图审查；主路径尚欠自动 root prompt、包根子进程发现和 body 完整交回，不能只凭文本通过认定完整定制完成。 |

**结果（A）：**[CUS-01 PR 237](https://github.com/Pepgent/soroi/pull/237) 报已合并；main/worker 做了 PTY，body 仅能按名发现，完整 handback 未验证。审后加了“return exactly once”及 atom-name pins/env 技术改文，作者解释首次 worker 连调 return 七次。根崩溃部分在 `#0831edf8` 00:52:49Z 被 SOR-04 提前修；`#27b415b6` 01:05:58Z 报失败后根进程可继续 formal。但模型继承/启动挂起并未因此完成：目标尾段仍在做 SOR-09，未见 SOR-11 或 ROOTPROMPT 的 DONE。

## 发现 4：包内 assets 与 root prompt 接入有明确所有者；但从“原生应可工作”到完整可用仍有缺口

**位置：**前重叠 `#29ce3ef1` 00:45:46Z；本段事件 777–780、828–831、855–857、873–874。

**摘录：**
- **(A)** leader：“技能与规则放 packages/omp-soroi/{skills,rules}/…请…真跑确认 rules/ 也被扫描到”。
- **(A)** Main 角色插件负责注入根 system prompt，产品路径不用 `--append-system-prompt`。
- **(A)** AuthorCUS01：“nothing yet adds soroi-main…for the check I passed it with --append-system-prompt”。

| 观察 | 解释 | 建议 |
|---|---|---|
| leader 统一 agents/skills/rules 的包根位置，把 root hook 指给 SOR，installer 不创造新角色语义。DIST 01 的真实验证被要求确认原生 rules 扫描。 | 接口责任可追踪，符合独立 omp 定制而非修改宿主。但“原生扫描”最初是待证前提，不应记为事实；root hook 当时确实未实现。此新接入设计是否经原 D 表授权，须结合后文投票问题复核。 | 保留资产和真实扫描证据；完整安装验收必须使用真实 root hook 与真实 child 启动，而非长期使用测试追加 prompt 代替产品接入。 |

**追踪：**DIST owner `#06a9348c` 01:10:51Z 自报规则包根扫描已在 prompt 证实；后续 [DIST-01 PR 239](https://github.com/Pepgent/soroi/pull/239) 到 `#8cc624e1` 03:07:54Z 才报五类真实证据齐。native `AuthorCUS02` 的实际 PTY 输出见发现 5，不能由它证明 root hook 已实现。

## 发现 5：本段新发 CUS-02 完成了有独立作用的 skill-only 运行；没有拿控制组替代技能证据

**位置：**事件 831–832 发起于 `#52b0403e` 01:03:34Z；事件 871 `#5bec4b16` 01:13:43Z 返回。原生子代理 `AuthorCUS02`：`#718c0690` 01:07:01Z 请求审查、`#4f3e0be4` 01:08:11Z 收 Argon PASS、实际工具结果 `#3fe4124e`（write_stdin 起于 01:10:52Z，输出 01:11:22Z）。

**摘录：**
- **(A)** 作者：“Control run only…It never read the skill”。
- **(R)** PTY：“✦ soroi-eval 182 lines”；随后显示 dry_run 的两个钉住输出，formal “所有 atom 都已消费，运行结束”。
- **(A)** Argon 分节把用户原文部分标【定】，D5 技术约定标【暂定】，0 CHANGE/VETO。

| 观察 | 解释 | 建议 |
|---|---|---|
| task:high 写 `packages/omp-soroi/skills/soroi-eval/SKILL.md`，修改 files/README，Argon 逐节审意图；作者先发现 DeepSeek 控制组未读 skill，另起无 agent 定义的 Luna skill-only 路径。实际 PTY 支持技能被发现并用于 dry/formal 两调用。 | 对应设计档交 high、Argon 只裁意图与弱模型可操作的要求。**未发现本项以控制组冒充技能效果的问题。**合并、字节相同和副作用行数仍主要来自作者报告，不能把 R 的有限终端窗口扩大为全覆盖证明。 | 保留 skill 与实际 PTY；purpose 批次、remote env、Human/File/部分 pins 等作者明确未测项留给对应实现/最终验收，不把全 skill 运行功能写成完成。 |

**结果（A）：**[PR 241](https://github.com/Pepgent/soroi/pull/241) 合并、关闭 [198](https://github.com/Pepgent/soroi/issues/198)；worktree 删除。Argon 审查文件先未提交，Governance3 后报已归档。作者在 `/tmp/cus02-rt` 留了 runtime scratch；本调查未查看其当前存在情况。

## 发现 6：本段多项公开契约由 leader 单方补充，并明确要求“不重投”——程序上偏离逐条民主决策

**位置与摘录：**
- `#73994f15`/`#f5dee370` 00:53:08–14Z：**(A)** RunGraph.Call 增 capture，空输出 field；leader：“这是对 D6 读接口的增补…登记（leader 技术裁决…不重投）”。
- `#ac8d8e65` 00:57:14Z：**(A)** Activity Aborted 独立 variant，不用 nullable。
- `#d2e4554b` 01:00:01Z：**(A)** CheckError 新增 pin_key、提前 HumanFn/human 声明层。
- `#169155b7` 01:10:37Z：**(A)** compare 新增 SameValue、Aborted side、Both/OnlyA/OnlyB。
- `#01c6b2b5` 01:07:46Z：**(A)** D8-06 apiKey 写法改 auth:none/header，并交秘书登记。
- **(U)** `#fccb1a91` 要逐条民主投票；**(D)** 当前台账 E28 亦承认实现期二十多项跨组件契约单方裁决未经过 Argon/导师/PM 投票。

| 观察 | 解释 | 建议 |
|---|---|---|
| 本段不是仅决定私有函数名；公开 Graph、Activity、Compare、CheckError、consumer 配置契约都变了。操作方式是一次 peer_send 批准→让秘书事后写 PM 评论，其中 capture 项直接写“不重投”。未见为这些项在本链启动逐条表决。 | 缺口可能真实、具体 ADT 方案可能正确；技术正确不等于决策程序合规。用户最初说技术由 leader 取舍，后来明确逐条投票与领导小组，不存在“只要标技术就免投票”的已见用户授权。本项判断依据是已见明示不重投与单方执行链，不是“搜索没找到所以一定无票”。 | 不推倒已合并实现；整理这些接口增补的 what/where/how/取舍及消费方，交领导小组逐项复核，Argon 查意图、技术席投票。用新决策结果修正文档正文，不改已合并 PR 史实。 |

**后续（A）：**[STO-06 PR 238](https://github.com/Pepgent/soroi/pull/238)、[STO-07 PR 242](https://github.com/Pepgent/soroi/pull/242)、[SOR-05 PR 251](https://github.com/Pepgent/soroi/pull/251) 等交付沿用了这些裁决；成果可保留，程序欠账不可由合并抹掉。

## 发现 7：Slurm 身份裁决解决真实证据缺口，但额外强制 digest-only 改了模板可用范围

**位置：**事件 794–797，`#088b0177` 00:54:26Z、`#1677598c` 00:54:36Z。

**摘录：**
- **(A)** 工程师：“解析当前tag不能代表现存SIF…不返回null/伪hash/漏项”。
- **(A)** leader：“image 必须是带 digest 的 OCI 引用…不带 digest 的 tag 或裸 SIF 路径…配置错误拒绝”。

| 观察 | 解释 | 建议 |
|---|---|---|
| 工程师不从 tag 推断旧 SIF 身份，正确指出来源缺口；leader 从建议 OCI URI 进一步裁为 digest-only catalog，连裸 SIF/tag 一律拒绝，ENV-04 也照此部署。 | 不伪造身份与单源原则一致；但这是公开配置契约和功能可用范围变化，不是无关紧要的实现格式。它归发现 6 的待复核设计项。运行中记录到的镜像版本不是本调查的哈希验证证据。 | 沿用现有实现先归档事实与被拒范围，复核最终契约；不要把“必须钉住”视为用户原话。 |

**追踪（A）：**`#f6dff477` 02:31:21Z 报 [REM-05 PR 8](https://github.com/Pepgent/remote/pull/8) 合并，明确遵循 leader 的 digest-only 规则；后续 `#61e05e7c` 03:43:56Z 报真实已发布镜像消费，非仅源码 binary。本文未独立检查发布状态。

## 发现 8：store 读切片的推进和类型化失败分支有清晰链；私有编码与公开语义应分开

**位置：**事件 800–803 `#126f36ac`/`#02c01fd1` 00:55:03–10Z；807–808；850–852；859–860 `#8b160f45`/`#4c5e0381` 01:12:17–20Z。

**摘录：**
- **(A)** leader 派 STO-06 activity→07 compare→08 search，“不建 fts 索引”。
- **(A)** worker：“合法根名可含 : 或 ,…map=a:b,...有歧义”；leader 采用 URL-encoded JSON tuple-array，“单一格式”。

| 观察 | 解释 | 建议 |
|---|---|---|
| LIB-01 上报完成后，leader 把空闲工程师转去 store 读侧，并告知并行 owner 与共享文件边界；worker 不伪造 Aborted 的 body/capture，主动上报 schema 缺口；map 编码不靠限制合法名字或双格式兼容绕过。 | 分工、单格式、保留真实历史符合意图与维护偏好。map 具体编码可归实现选择，但公开 Pair variants/活动语义属于设计；leader 说“这类接口编码细节以后直接决定”不应被扩大为任意契约设计自决。 | 接续保留实现；把编码格式与已变更公开类型一起写完整契约，由批准后的类型约束工程师本地实现。 |

**追踪（A）：**`#d98b5975` 01:38:14Z 报 STO-06/07/08 全部合并 [238](https://github.com/Pepgent/soroi/pull/238)/[242](https://github.com/Pepgent/soroi/pull/242)/[244](https://github.com/Pepgent/soroi/pull/244)，canonical main 新进程 HTTP/重启响应等证据在 PR。STO-09 是后续新派工，不是本段原 STO-06/07/08 范围。

## 发现 9：gateway 修复和 A0 凭据补充遵循拥有方路径，有实际三次启动输出

**位置：**事件 818–819 `#7831b60e`/`#2bcb808b` 01:00:30–35Z；829 `#52b0403e` 01:03:34Z；隐藏 wait `#724e86c2`/`#a08f2ea9` 01:06:46–48Z；843 `#01c6b2b5` 01:07:46Z；862 `#6f37b0c7` 01:13:05Z。原生 `EnvGateway/entry/e7a8afae` 的运行输出取自 01:10:16Z。

**摘录：**
- **(A)** tester：“没有A0专属grant/token…没有拷贝central…不让用户粘token”。
- **(A)** leader 让 EnvGateway 沿 ENV-02 setup 创建 a0，token 0600，不打印值。
- **(R)** native 终端：`docker exit=0`、同一 HOME，`startup=1/2/3` 各 `ok`；每次 `malformed_configured_provider_rows:0`；`three_real_completions=true; same_home_cache=true`。

| 观察 | 解释 | 建议 |
|---|---|---|
| 先请求凭据拥有方补注入而非复制其他 consumer；配置排查查到 native discovery 把 gateway 多 provider catalog 缓存为 opencode，从而双前缀；leader 批准 auth:none+header 的配置修复，不改 omp 宿主；owner 报更新五消费者与 Slurm 副本。 | 凭据治理、根因修复而非删除 cache/fallback、不改宿主均与用户和规则一致。R 支持同 HOME 连续三次确实运行成功；A0完整验收与 handback 不包含在此证据里。配置契约变更的决策程序仍见发现 6。 | 保留 setup、注入说明和修复配置；不要回退成共享 token，亦不要把 gateway 通畅当 A0 五类验收通过。 |

**结果（A）：**a0 注入说明发 [235 评论](https://github.com/Pepgent/soroi/issues/235#issuecomment-6551616541)，根因/配置发 [186 评论](https://github.com/Pepgent/soroi/issues/186#issuecomment-6551613983)；未要求用户醒来处理。日志扫描零命中只能证明扫描范围，不能扩大成穷尽无泄密。

## 发现 10：CUS-04 前置被设得过宽，根因修复后没有及时解除；该依赖后来由 leader 自己撤回

**位置：**事件 781–783 `#b97a587a`/`#356e7fa5` 00:52:20–28Z；gateway 修复事件 862 01:13:05Z；后续 `#63eac6bf` 03:12:40Z、`#b1d28693` 03:12:47Z、`#1089ea10` 03:29:23Z。

**摘录：**
- **(A)** CUS-04 上报双 provider 与 Luna startup 挂起；leader：“CUS-04 保持 open…完成 SOR-11 时…通知…重跑”。
- **(A)** 03:12:40Z owner：“旧doubleprefix…gatewayowner权威纠正…不会自行越过你的234gate”。
- **(A)** leader 后来：“原先的门槛…旧配置问题…不再挡 CUS-04”。

| 观察 | 解释 | 建议 |
|---|---|---|
| 最初等待真实 child 可用有依据；但 gateway 根因在本段 01:13 已确认修复，CUS-04 仍受先等 SOR-09/11 的命令约束。直到 03:12 owner 再问，leader 才允许用修好网关验确切 diff。期间 DIST-02 依赖 CUS-04。 | 后续撤门槛是强证据：gateway 故障与插件模型继承/启动错误被混为同一先决条件，造成可避免的顺序等待。不能从现有证据精确计算全部实际损失时间，但至少命令层面旧 gate 持续到 03:12。 | 每次拥有方确认根因/修复，立刻逐条重新判断其阻塞的真实功能，不以旧 issue 标签代替生命周期事实；已修 gateway 不要求等不相关 SOR 工作。 |

**后续（A）：**[CUS-04 PR 234](https://github.com/Pepgent/soroi/pull/234) 到 03:29 报成功 handback→idle→TTL parked→wake 并合并，插件原缺陷仍独立保留，说明可解除依赖而不缩减验收。

## 发现 11：Lab schema 与 notice 缺陷交给 source owner，没绕过 build gate；文档任务强调实际实现

**位置：**事件 835–836 `#e9322946`/`#eac9405d` 01:05:04–08Z；846–848 `#bd94115d`/`#3583a397` 01:09:40–48Z；823–825 `#d47fd37c` 01:00:48Z。

**摘录：**
- **(A)** Lab：“双向 FK 构成首次插入环…仅 conversation.automation_run_id+UNIQUE…wire不变”。leader 同意并说以后同类单仓 schema 自决。
- **(A)** images：“正式 npm ci + npm run build…notices stale…不跳gate、不私改源业务”。leader：“派源仓工程师…Darwin 与 Linux arm64 都通过…不跳过gate”。
- **(A)** 文档派工：“只写实际实现的行为”，“直接改正文，不留旧表述”。

| 观察 | 解释 | 建议 |
|---|---|---|
| schema 用单一存储关联+投影而非双 FK；历史 actor 外部 id 不绑被删除会员；Linux notice 缺陷不让镜像仓静默跳过，交 Pepgent owner 独立问题；多仓文档分别交已有 owner。 | 处理真实 runtime/build 失败且尊重代码 ownership。schema 的单仓物理实现与跨组件语义需区分，不能把历史权限/生命周期的任意设计都称内部细节。后端文档派给 mid 的实现者可做事实对齐，不应擅自设计新基线。 | 保留 source 修复；以真实引入依赖更新 NOTICE，不提前为未引入 croner 编造许可；不要把不同仓文档复制成多个权威入口。 |

**追踪（A）：**`#1a34fd24` 02:16:47Z 报 [LAB-02 PR 33](https://github.com/Pepgent/Pepgent/pull/33)；`#9cdaf7ca` 02:38:18Z 报 [notice PR 35](https://github.com/Pepgent/Pepgent/pull/35)，Darwin 和 Linux 两平台 build/check；`#aa4c651f` 03:04:01Z 报 [docs PR 37](https://github.com/Pepgent/Pepgent/pull/37)，核实 croner 不存在故没加 NOTICE，原型 CLAUDE 无虚假 backend 主张故不制造 UI 文档任务。remote docs 到 `#5f903443` 04:24:14Z 报 [PR 12](https://github.com/Pepgent/remote/pull/12)。mux docs 到 05:03 的最后相关 DONE 仍是 feature 完成后“继续独立文档PR”，未见该文档终局交付。

## 发现 12：DIST-01 重复 issue 和分支串依赖被纠正；新验收要求又引入 CUS-03 等待

**位置：**事件 855–857 `#06a9348c`/`#15dd9145` 01:10:51–56Z；865 `#5f4c2b40` 01:13:21Z；874 `#cc32b3d9` 01:15:38Z。

**摘录：**
- **(A)** owner：“199…我后来又建230属重复…自行加‘成功soroi_task handback’验收，超出D8 DIST01原行”。
- **(A)** leader：“从 CUS-04 分支拆开…只含 installer/manifest/CI，单独合并”。
- **(A)** 之后 leader 又要求 installer 验收包括 agents/skills/rules 各 PTY。

| 观察 | 解释 | 建议 |
|---|---|---|
| worker 主动自纠重复 issue 与自加验收；leader 支持回到原切片标准，拆离 CUS-04，让其独立保留 open。随后对发行 installer 增加五类 assets 的直接运行证据，rules 当时尚待 CUS-03，而 CUS-03 又被排在 SOR-05 之后。 | 修复不必要分支依赖是正向行动；但“切片按原标准”与后来追加完整 assets gate 存在需管理的范围变化。后续实际出现 VS1 等 W1 的 BLOCKED，不能说拆分后 DIST-01 已无依赖。 | 将组件代码功能与最终组装验证分层，不以新加全套资产门槛重写原实现 issue；最终发行验收必须保留，不是删除。 |

**追踪（A）：**`#8a583ab5` 02:24:09Z 明确 DIST-01 等 CUS-03/SOR-05；后续允许 CUS-03 提前并行，`#46dd03e3` 02:37:31Z 报其 [PR 252](https://github.com/Pepgent/soroi/pull/252) 已合并；DIST-01 到 03:07 才报 [PR 239](https://github.com/Pepgent/soroi/pull/239) 完成。不可把本段 01:10 的 CI/本地结果当最终发行物验收。

## 发现 13：哈希证据规则被 leader 降格，虽同时正确要求真实安装路径

**位置：**事件 872–874；wait 返回 `#deb5e341` 对应 01:13:44Z 发起、约 01:15:24Z 收；`#cc32b3d9` 01:15:38Z。后重叠 `#5bde503f` 01:33:32Z 再提醒。

**摘录：**
- **(A)** Governance2：“confirm whether the no-hash-evidence rule applies here”。
- **(A)** leader thinking：“keep the hash check as supplementary evidence”；发给 owner：“哈希比对只能作为完整性附注，验收证据必须是运行事实”。

| 观察 | 解释 | 建议 |
|---|---|---|
| leader 正确要求下载 CI tar→干净 HOME→installer→真实工具/设置/资产发现；但仍明确批准哈希比对作补充证据。 | 在禁止任何形式 hash 验证证据的要求下，“补充/附注”不构成豁免。这是范围明确的规则放松，不应因主证据是 runtime 就忽略。本文不使用任何哈希比对证明产物正确；上文 commit/镜像标识仅用于定位。 | 交付证据只保留真实安装与行为结果；若保留摘要值作为产物地址，明确其不是验证。与真实损坏产物被拒的行为测试分开，不应禁止必要行为测试。 |

**追踪（A）：**Governance3 round3 `#9a5296e6` 01:33:38Z 仍报告 [PR 239](https://github.com/Pepgent/soroi/pull/239) 使用 hash matching；leader 再提醒只是附注。最终 owner 03:07 声称用了 CI 完整运行证据。该“附注许可”的历史偏差没有因后来 runtime 通过而变合规。

## 发现 14：台账旧副本的误判被源头澄清，没有观察到用户改动被丢弃

**位置：**事件 791–792 `#7b705877` 00:54:16Z；865–869 `#5f4c2b40`/`#a88fa78e`/wait `#0352a311`/`#230dc2b2` 01:13:21–43Z。

**摘录：**
- **(A)** owner 报 autostash LEDGER 副本冲突，主 checkout 未被其修改。
- **(A)** leader 先说 main “又有未提交 LEDGER”；Governance2 查后：“main checkout is clean…stale copy…should be dropped, not applied”。
- **(A)** leader 据此通知丢旧 stash，不应用。

| 观察 | 解释 | 建议 |
|---|---|---|
| leader 先由工作树中的副本推断 main 当前状态；随后请求台账拥有方确认，得到 clean/已提交旧副本结论后才指示 drop。较早 Argon 文档改动也交治理限定三路径提交。 | 初始推断不符合状态源头原则，但实际纠正步骤遵循先查拥有方再动作。**未发现本链删除未保存用户改动的证据。**drop 是否真执行、stash 对应内容需 git 授权才可独立确认。 | 后续只称“工程师工作树带了旧副本”，不要继续传播“main 又 dirty”；保持路径限定提交，不把所有共享文件一并归入本任务。 |

## 发现 15：Governance3 实际接班并形成 round3；哨兵没有因缺记录擅改 eng-lab 任务

**位置：**事件 821、844、867、875–880；`#8addad4c` 01:00:36Z；`#01c6b2b5` 01:07:46Z；`#cc32b3d9` 01:15:38Z；`#61b39efa` 01:15:46Z；`#d69cf20a` 01:15:52Z；`#d3dddc19` 01:20:10Z。

**摘录：**
- **(R)** fork 首次失败 `#f57a2c77`：“禁止限制…报告字数…删掉…限制后重新派发”。
- **(A)** 重派改为“full round report in digest…give path”，成功并给九工程师清单、排除 UI/OS watchdog。
- **(A)** scanner 问 E2E “etc.”，leader 明确只分配 E2E-10/02/11a/13，其余用 issue 证据。

| 观察 | 解释 | 建议 |
|---|---|---|
| Governance2 从设计/台账交付切到 round2；leader 恢复周期总线、归档评审，交新 fork 接续。初次工具拒绝后修改报告交付方式重派成功，没强行绕过滤器。scanner 对含糊派工回问，而非自行给所有测试切片标 Assigned。 | 使用分身、秘书、哨兵与用户要求一致。fork 成功只证明启动，round3 结论才说明确有执行。哨兵“eng-lab不在registry”是工具可见性缺口，不是工程师停止工作的证明。 | 保留 digest/assignment 数据；明确自定义 session-dir 供哨兵读取，不把未找到当无工作；总线汇总与“单方裁决登记”要分开，后者不能替代投票。 |

**追踪（A）：**`#9a5296e6` 01:33:38Z 报 round3 digest [固定路径](https://github.com/Pepgent/PM/blob/eb15c47/evidence/bus/digest-20261101T012847Z.md)、27/108、CUS-02 review 归档、四新合并、三个待 leader 行动；eng-lab缺记录只 note，未改派工。后续至 round8 仍有报告，最后随用户要求停止，不是只完成一次 fork。Governance2 首个总结说“108 implementation slices…none…run yet”，这是其设计/文档范围总结，和当时已有工程 DONE 不应混用为全项目事实。

## 发现 16：DONE 仍集中进入 leader，再转发秘书，未落实“常规进度走总线”的通讯分流

**位置：**本段大量 IRC：`#126f36ac` 00:55:03Z、`#3009df2e` 00:56:42Z、`#27b415b6` 01:05:58Z、`#8a27764c` 01:06:44Z；`#01c6b2b5` 01:07:46Z leader 把九项已收 DONE 再逐条交治理登记。

**摘录：**
- **(U)** `#0bffd31f`：“所有消息都汇到leader的上下文，它会成为最先爆掉的那个…PM issue评论…异步总线”。
- **(A)** 本段派工结尾反复“本条无需回复”；但 roster/工作方式仍保留仅 DONE/BLOCKED 回 leader。
- **(D，事后自记)** 当前 `LEDGER.md:E24` 明认“让所有工程师把 DONE/进展 peer_send 给自己并逐条转述…违反…异步总线”。

| 观察 | 解释 | 建议 |
|---|---|---|
| 虽已用治理分身抓 issue/PR，完整 DONE 仍一条条进入 root，root 再转给治理。状态消息中包含大量命令/验证细节，与需要裁决的 blocker 混在同一入口。 | “无需回复”减少 ping-pong 是对的；但不等于取消了集中式状态路由。与用户降低领导通讯瓶颈、leader只推进和裁决的意图不一致，事后台账也承认。 | 常规 DONE/证据只写 owner issue/PR，由秘书定期汇总；peer 只送需裁决/安全异常/真正解除关键前置的摘要。直接对关键依赖触发下一任务可保留，不必转述每项细节。 |

## 发现 17：切片末端 F04 观测缺口被明确指出并作实物路径判断，尚未出现 live 成功结论

**位置：**事件 883 `#61c10f95` 01:20:33Z；后重叠 884–885 `#12d02afb` 01:20:37Z。

**摘录：**
- **(A)** tester：“不能用期望字节hash/pin文件代替实际输出…预览格式只是定位…尚未把这条标通过”。
- **(A)** leader：“实际 path 作定位…读原字节…查 /objects…404；同时断言 store seq…不变”。

| 观察 | 解释 | 建议 |
|---|---|---|
| 真正问题是 dry-run File 输出完整身份没有公开返回；tester 拒绝用期望夹具替实际对象，leader 允许沿实际路径定位，且加 seq 不变。 | 不拿模型措辞/期望文件冒充实际输出是正确的，404/无事件是可观察行为。其证明方法本身是否触及禁止 hash 验证的边界应由验收规则统一明确，不能泛化成摘要相等即正确；本文不将该身份计算当任何已运行成功的证据。 | 保留实际 File 事实的可观测入口；最终先把产品开发完，再沿同一真实输出测不落库；在接口归属处解决事实发布，不继续堆假 oracle。 |

**追踪（A）：**此项并入 [E2E-11a PR 246](https://github.com/Pepgent/soroi/pull/246) 的 code-side；01:53 的 DONE 仍明确“没有真实…File404…运行”，真实 F02/03/04 留 [live 245](https://github.com/Pepgent/soroi/issues/245)。因此本链最终结论是实现了 consumer/spec，**不是** F04 已通过。

## 本段全部发起链的闭合索引

下表避免把只有派发的事项误记为交付；详细证据/评价见上方发现。

| 本段发起或接续 | 最后相关结论（来自目标根/原生子代理） | 状态口径 |
|---|---|---|
| images 等 LAB01→启动 IMG04 | 03:34 `#021a1265` 基础 PR7；root3/live6 仍 open | A：基础交付、完整未验 |
| tester E2E02→11a→13 | PR240/246/256，live235/245/250；03:34回main | A：code-side，非live |
| CUS01审查路由→Argon→作者 | `#826fc455` PASS；`#68a938e9` PR237，body未验 | A；审查与缺口明确 |
| child模型/崩溃/startup缺陷→SOR09/11 | SOR04修拒绝传播；SOR10另交付；05:24仍在SOR09，未见SOR11/ROOTPROMPT交付 | A：部分修复，其余未完成 |
| skills/rules包根→DIST owner | 真扫描报告；03:07 DIST01 PR239 | A：接入交付；root hook未交 |
| SOR02 capture/空field | 01:52 PR243 | A：已报合并 |
| REM05→04→06→07+docs | 02:31 PR8、03:39 PR9、04:04 PR10、04:24 docs PR12、05:25 PR13 | A：已报交付；末尾镜像刷新仍待 |
| Slurm digest-only裁决 | REM05沿用、ENV04沿用 | A：已实施；待治理复核 |
| LIB owner转STO06/07/08 | 01:38 PR238/242/244 | A：已报合并 |
| Activity/Compare/pin_key/Human 声明裁决 | 上述store PR与02:47 SOR05 PR251 | A：被实现，不是投票证明 |
| EnvGateway补a0→双前缀修复 | 01:13返回；native同HOME三次ok | 有R支持的配置修复；非完整A0 |
| mux/remote/Pepgent事实文档派工 | remote04:24 PR12、Pepgent03:04 PR37；mux05:03仍说接着做docs | A：两已报、一未见终局 |
| Lab schema确认 | 02:16 LAB02 PR33 | A：已报合并 |
| 跨平台notice source修复 | 02:38 Pepgent PR35，后IMG04基础交付 | A：未跳gate |
| DIST01拆CUS04→原issue199 | 03:07 PR239；重复230按duplicate处理的当前GH状态未查 | A：已报合并；重复处理需授权确认 |
| CUS04等SOR09/11 | 03:12撤gate；03:29 PR234 | A：过时前置被撤 |
| CUS02 task:high→Argon→PTY | 01:13 PR241；有native PTY读回 | A+R：技能核心路径 |
| 文档/LEDGER即时限定提交、旧stash处理 | Governance2说mainclean、旧副本；leader据此drop命令 | A：源头纠正；真drop未独立确认 |
| Governance3 fork失败→修订重派→roster→UnblockScan | 首次R拒绝，重派ok，01:33 round3，后续至round8 | A+R：真实接班，非仅提示词 |
| F04观测裁决 | E2E11a consumer落地，live245未跑 | A：未live通过 |

## 从已有成果接回正轨

1. **不抹去已经形成的代码、prompt/skill 和 runtime 记录。**把“代码已合并”“局部运行成功”“完整流程通过”分开，重点保留 body/SOR09/11/root hook/A0/live 未完成的明确标记。
2. **恢复领导小组决策，而不是让 leader 或工程师包办。**本段 Graph/Activity/Compare/CheckError/模型注入/打包/Slurm 身份与关闭路由变更整理为逐条 what/where/how/取舍，复核其既有授权；未获授权的设计增补经 Argon/导师/Claude 族表决。事务由秘书执行，不把 PM 评论登记当投票。
3. **按用户后续明确纠正调整交付阶段。**各独立组件先完成本仓开发及局部自测，保留现有局部证据；全部功能到位后统一组装完整定制，再跑 F01–F32 与 D9。不是砍掉最终流程，也不是继续用 spec/fixture 迭代替代交付。
4. **依据拥有方的新结论撤销旧依赖。**CUS04案例表明必须把 gateway配置故障、child模型继承、startup错误、设置停驻分别管理；一个源头故障修复后不能继续默认后续功能都必须等整条SOR队列。
5. **切断集中式DONE转述。**secretary从issue/PR收常规状态；leader只接决策/异常和最关键依赖解除摘要。原生fork/tern各角色成果与挂起项按同一索引接续，不重新全量审计已经有效的证据。
6. **尚缺事实的确认位置：**当前 GitHub 合并/关闭、stash 是否已drop、文档最终内容是否符合各PR，均须另获 git/GitHub 授权。现有可用证据只证明目标会话记录了这些报告和部分运行输出，不能直接宣称当前仓库完整可靠。

## 置信度与未覆盖部分

- **高置信度：**N=1514、事件边界、每次实际派发内容、单方“不重投”措辞、fork拒绝原因与修订、target内原始用户指令、native CUS02 PTY显示、native gateway同HOME三次ok、CUS04后来明确撤gate。
- **中置信度：**各独立工程师的合并/runtime/清理报告。它们作为 A 引用，通常附PR/PM路径，但本调查禁止访问这些GitHub对象，也禁止打开这些独立peer session，未升级为独立R证明。
- **未覆盖：**目标会话的完整初始系统提示在events内未完整呈现；没有把本调查自身system/developer规则直接假托成当时注入原文。未验证镜像、数据库、容器/文件当前状态；未做任何新测试；未从hash验证推导正确性。
- 本段没有新真实用户讲话，用户意图来自前序根会话原话；05:27后的训令和Argon D10只是后续纠正，不倒装为00:46时已经收到的命令。当前AGENTS/LEDGER含后加自纠，引用时均标D/事后。
- 本报告不裁决所有架构设计优劣、不替主调查重新审全部12段。未发现问题的链条已明确记为一致，未解决的终局链条已明确写未完成。
