# D15 草案发散审查（D15Divergent，只读）

审查对象：`local://decisions/D15.md`（全文）。对照：`local://inv/d15/INDEX.md`（全文）、所引报告片段（R04、R05、S4、G3、G6）、`local://argon/D15-intent.md`、`local://argon/D15-governance-baseline.md`、`LEDGER.md`（U80 版全文）、`AGENTS.md`、`.omp/skills/tern-worker/SKILL.md`、`.omp/WATCHDOG-LeaderCompliance.md`、`.git/logs/HEAD`（soroi 本地 reflog，纯文本）、`/tmp/d10-rewrite/`（D10Rewrite 留下的临时文件）、`local://task-log/Main.md`。没有改任何文件，没有联系任何 agent。我没有 bash，所以没有执行 gh/git 命令；凡是需要 gh/git 才能确认的结论，都标为 `[INFERENCE]` 或列为执行前必查项。

## 一、换一个框架：丢弃清单不应靠人工逐行列举，而应以“05:48:24Z 时的状态”为准算差集

草案按决策来源组织（M-1…M-4 → D15-02…D15-06），每行人工列出对象和动作，执行者再“按 D15-02…D15-06 丢弃”（D15-10③）。下面第二节逐行给出反例，这些反例几乎都出在同一个地方：人工列举在三处失效。

1. **漏项。** 有 7 个会话前就存在的 issue 被会话中的合并关闭了，表里没有让任何一行把它们重开（见 D15-04、D15-05）。
2. **顺序冲突。** 同一仓库的多个 merge 被拆在不同的行里，按行号顺序执行会和后面的提交冲突（见 D15-02、D15-03、D15-10）。
3. **范围误伤。** 引用 INDEX §3.7 当作“会话新建 worktree”的清单，但这一节同时收录了既有树和来源不明的树（见 D15-05）。

**备选方案：** 每个仓库的执行者先从各自的权威来源取得 05:48:24Z 的目标状态，再减去受保护对象的显式白名单，差集逐项对照 INDEX 归因；归因不到的写 BLOCKED，不丢弃。各对象的权威来源如下：

| 对象 | 05:48:24Z 状态的权威来源 |
| --- | --- |
| git 的 main 与分支 | push 事件中的 `before` SHA，或本地 reflog |
| issue 正文 | GitHub GraphQL `userContentEdits` 编辑历史 |
| issue 开关状态、父子边 | issue timeline 事件 |
| Project 状态 | Project item 事件 |

白名单至少要逐个写出这些 SHA 或对象：

- Pepgent 的 15 个无关提交；
- soroi 的 `bdaa278`、`80b0267`、`6c1faea`；
- PM 的 `e519e5b`、`37e6c73`、ArgonGovernance 基线的归档提交；
- D10–D14 的归档提交（`91dd67e`、`cb47daa`、`95bb071`、`904017b`、`6001098`、`d43f047`、`95bd75a`）。

- **代价：** 每个仓库多做一轮 timeline 和编辑历史查询。
- **失败模式：** 有些对象在任何记录里都取不到 T 时刻状态，例如 mux 的会话前草稿、STO-05 的未提交补丁、被 rebase 的 SOR-09 原提交。它们会变成 BLOCKED。草案已经有 BLOCKED 通道（D15-10），所以这不是新增的阻塞。
- **成立条件：** GitHub 和 git 保留了 T 时刻的状态。正文编辑历史、timeline、push 事件都由平台保存。草案目前选的正文来源（D10Rewrite 的 transcript）反而不可靠，见 D15-02 和 D15-03。

这个方案不改 D15 的意图，也不打折 U70。它只把执行依据从“人工列出的清单”换成“对象的权威来源”，D15-02…D15-06 降为归因说明。

## 二、逐行立场

### D15-00：赞成
这一行直接执行 U65–U70 原话，不投票，符合 C2-4（U79/U80）和用户最新原话“我直接授权的东西，你非要对抗？妄想通过裁决跳过？”。

### D15-01：有条件
- **条件：** 必须写明受保护的会话产物，不能只靠“逐字执行原话”这一个例外。
- **反例：** PM `e519e5b`（X-15，06:12）是 Main 自己决定把 30 份 s01a193fd 报告复制进 PM，INDEX:59 记为“归档不等审稿，亲自复制”，不是逐字执行原话。按 D15-01 的口径它属于私自决策，应该丢弃；但 C5-3.2 和 Argon (c) 明令保护这 30 份报告，V-5 规定破坏即否决。同样落在 D15-01 口径里、却被 C2-4 或 LEDGER 保护的还有：`37e6c73`（X-118）、X-103 启动常驻 Argon。
- **改法：** 在 D15-01 后列一张保护清单，写明每个对象依据的 LEDGER 条款。

### D15-02：反对（按现文本执行不了）
1. **会话前正文没有已记录的来源。** 这一行写“4 个 issue 正文恢复为会话前版本”，但没写来源。
   - `/tmp/img6-body.md`、`/tmp/img3-body.md` 存的是 Main 写的新正文，06:38:59 已删除（INDEX:1200–1201）。
   - D10Rewrite 的上下文抓取时间是 07:09:42Z（`/tmp/d10-rewrite/context/capture-summary.json` 的 `captured_at`），晚于 06:38–06:55 的改写。该文件里 images-6 的标题已经是改后的“lab-web 镜像的 seed/migrations 包装与启动顺序”，状态为 closed。
   - 唯一的权威来源是 GitHub 的正文编辑历史（`userContentEdits`）。G2:335 只说“没有拿不到的编辑历史就不虚构旧正文”，没有任何报告真正查过它。
2. **“4 个 issue 重开”与事实不符。** images#3 当前是 OPEN（INDEX:235），只有正文和子边被改，需要重开的只有 images#6、deploy#8、deploy#1。
3. **revert 顺序会冲突。** deploy PR9（`35d309f`，06:50）、PR10（`c29e216`，07:17）、PR12（`26a0c8a`，08:15）都改了 `README.md`、`compose.yaml`、`central.py`（INDEX:774–779）。D15-02 先 revert PR9，而 PR10 和 PR12 在 D15-04；按 D15-10③ 的行号顺序执行，PR9 的 revert 会和后两个 PR 冲突。必须按仓库倒序：先 PR12，再 PR10，最后 PR9。
4. **既有分支上的会话提交没有处理方法。** `issue-6-lab-web-live`（`64114c6`）和 `issue-8-lab-auth-seed`（`419a286`、`4589a17`）是会话前就有的分支，会话中被推入了新提交（INDEX:957–958）。“丢弃”的定义只写了“新建分支删除，既有分支保留”，那么这些会话提交怎么处理？如果把分支 ref 重置到会话前的 SHA，就和定义里的“不改写 git 历史”冲突。草案需要明确：功能分支允许把 ref 恢复到会话前 SHA（来源是 push 事件的 `before`），只有 main 用 revert。

### D15-03：有条件
- **来源指错了地方。** transcript 原文只有“Fetched current OPEN bodies for all 49 targets”（R05:107），说明抓过，正文本身并不在记录里。会话前正文的实体在 `/tmp/d10-rewrite/prepublish/*.json` 和 `context/*/issue.json`。`/tmp` 不是持久存储，也没有归档进 PM（D15-14 没列）。
- **抓取时间晚于会话开始。** 例如 `prepublish/soroi-190.json` 的 `updated_at` 是 `2026-11-01T07:04:44Z`。05:48 到 07:04 之间这些正文是否被别人编辑过，`updated_at` 区分不出来（评论也会刷新它），只有编辑历史能回答。
- **顺序。** PM 的 `cd5bff0`（07:12）之后，`262cab4`、`6d2da5a`、`b61be5a`（D15-06）又改了 D8 两个文件。先 revert `cd5bff0` 会冲突，必须先 revert 后面这些。

### D15-04：有条件（其中 ②④ 反对）
- **① 局部 revert 做不了。** d23d997 之后，同一个 tern-worker 文件又被 `1e07f9c` 和 `f7a66b9` 修改（reflog 第 266、275 行），所以“revert 两文件中的 d23d997 部分”无法用 `git revert` 完成，只能逐 hunk 手工编辑。执行契约必须先给出这两个文件从 05:48 到 HEAD 的完整 diff 和各 hunk 的来源。
- **② 与受保护的 LEDGER 矛盾。** 草案作废 X-43（全项目改用原生 `git worktree add`），但同一条规则现在写在以下三处：
  - LEDGER C3-4.4，ArgonGovernance 依 U80 写入，D15 自己的 C2-4 对照行把它列为不丢弃；
  - AGENTS.md:43；
  - tern-worker SKILL.md:35。

  R04:77–78 显示 X-43 当时引用了 tern-worker 已有的派工说明。所以要么 X-43 的私自部分只是“覆盖 omp wt 默认”这句宣称，要么 U80 版 LEDGER 吸收了一个私自决定。草案必须二选一并写明；否则执行者面对的是一条“已作废”却仍被基准条款强制的规则。
- **④ 漏了 Pepgent#9。** PR40 关闭了会话前就存在的 Pepgent#9（07:09 抓取时还是 open，见 `capture-summary.json`；INDEX:223、922）。ArgonGovernance 的 M-3 明确列出“#9 CLOSED 状态”，D15-04④ 没有重开它，触发 VG-1。
- **⑥ 顺序。** soroi 上 PR278（08:19）之后还合并了 PR279（08:27，D15-05），按仓库倒序应先处理 PR279。

### D15-05：反对
1. **worktree 范围误伤。** 草案写“会话中新建的 worktree 与目录：INDEX §3.7”，但这一节同时包含：
   - `t9c99fbade`、`td6f2e23eb`、`td9707c5b1`、`tf1cbc382c`、`tf620c8462`：标注“未找到对应指令（G6 精确路径查询无命中）”。其中的 `m/` 是 2026-09 出生的克隆，里面有未暂存的 `ci/*` 删除（INDEX:817–887、989–1005；C-29 写明“不认定本会话造成”）。
   - `deploy-8`、`issue-6-lab-web-live-75a9ab7`、`issue-190-durable-sse-ff0716f`：标注“既有树，非本轮新建”（INDEX:1078–1080）。D15-05 自己还要求把 issue-190 这棵树恢复到会话前的 5+1 文件状态。

   照“移除 §3.7 中的树”执行，会删掉来源不明的树和既有树。必须改成显式路径白名单：只列 G6 §5.1 中 birth 晚于 05:48:24Z、且能归因到 X 行的树。
2. **mux 草稿的处理写不通。** “mux `issue-13-mux-design` 的会话前两份未提交草稿保留在原 worktree”无法执行：
   - 该 worktree 已不在 mux 的 worktree list 中（INDEX:1081）；
   - 草稿已被提交进 `e004fa1`，并且掺入了会话中的修正（G6:115–117：DONE 记载“接手时修正 dial 拒绝原因…”）。

   会话前的原文已无法单独分离，应直接写 BLOCKED，或写明来源（issue#13 05:20 的 STARTED 评论只说明分工，不含正文）。
3. **重开漏项。** 以下会话前存在、被会话中的合并关闭、本行却没有重开：
   - Pepgent#15（PR39；07:09 抓取时 open）；
   - soroi#196（PR269）、#203（PR271）、#205（PR279）；
   - lab-library#5（PR6）；
   - omp-rpc-mux#13（PR14）。

   依据：INDEX:206、252、254–255、240、246，以及 `capture-summary.json` 中这些 issue 均为 open。Project 的 Done 状态（INDEX:922–928）也没有提及。
4. **既有分支上的会话提交。** 和 D15-02 的问题相同：
   - `eng/install-check-224` 上的 `1b834c9` 已 push，且该分支是会话前 OPEN 的 PR260 的分支；
   - `issue-190-durable-sse` 上的 `c1d7e53` 已 push；
   - `issue-196-mux-writer` 在会话中被 rebase，远端现在是 `f8807bd`，会话前的原 SHA 不在任何现存 ref 上（INDEX:945–947）。

   “会话前 commit 留在原分支”对被 rebase 的 SOR-09 不成立：分支上留下的是会话中生成的新对象。要恢复，需要从 push 事件或 reflog 取会话前 SHA，再把 ref 恢复过去。

### D15-06：有条件
- **从 revert 清单删掉 `7ec91a8`。** 它是 `pull --no-rebase origin main` 产生的合并提交（reflog 第 277 行），不是回写。对它做 `revert -m 1`，会把远端一侧带进来的内容一并撤销 `[INFERENCE：远端侧至少含 08:27 之后到达的提交]`。只需 revert `e0b14cc`。同理，`59cdff1`（第 274 行）也不能当作回写对象。
- `589aa0c` 改了 D11A 归档文件中的行锚。revert 会恢复归档原文，与“D10–D14 档案作为记录保留”一致，但需要写明。
- 顺序要求同 D15-03。

### D15-07：有条件
- **赞成**不 revert `e2663c1`：C1-3 已有“代码编写完成前禁止编写和运行测试”和“hash 不作证据”，满足 VG-6。
- **条件一：** D15-04 执行后，现行 LEDGER 的 R4（`argon.md`）、R8（引用 `1e07f9c`、`f7a66b9`）、R9（“已写入 AGENTS.md 与 tern-worker 技能”）会和实物不一致。D15-07 写“D15 执行完成后秘书替换 R19–R21”，范围要扩大到 R4、R8、R9。
- **条件二（与 Argon 基线的张力）：** Argon (c) 要求“`LEDGER.md` 中对 U1–U73 用户逐字原话的忠实记录”不得毁灭。U80 整理删掉了 U33、U35–37、U40–41、U43–55、U73 的原文（LEDGER 第四节注），而根会话的用户原话 prompt 17–25 根本没有进入 U 索引，其中包括“你必须为本对话启动watchdog…”“watchdog必须对你自己的一举一动进行监视”“禁止混淆advisor和omomp的watchdog”“从头到尾都不启动argon什么意思？”“你不分析session记录，然后意淫破坏范围？”。这不是要回退 U80，而是 D15-08 的依据缺了 U 编号，见下一行。

### D15-08：有条件
- **watchdog 一项与 Argon 的【定】裁决直接冲突。** Argon (d)⑤ 依据 U27–U29，裁定主会话自设的 watchdog “必须按 U70 丢弃并由管理层重审”。D15-08 选择保留，却没有引用 (U)。按 C2-3.5，引了 (U) 的 Argon 裁决会胜出。
  - 保留确实有用户原话支撑：用户直接下令“你必须为本对话启动watchdog检查你自己”“watchdog必须对你自己的一举一动进行监视”“禁止混淆advisor和omomp的watchdog”，Argon (d)⑤ 把它和 U27–U29 的低档 watchdog 混为一谈。但这些原话不在 LEDGER 里。
  - 草案必须按 D1-16 以会话 id + entry 引用这些原话，请 Argon 修正 (d)⑤，而不是靠表决覆盖一条【定】裁决（那样会触发 V-2）。
- **“argon 族赞成票即视为审定现行文本”** 用一票代替了 Argon (d)① 要求的“逐条对照 LEDGER 复核”，而且和 D15-11③（再次复核 AGENTS.md 和 tern-worker）重复。应删掉“视为审定”，统一交 D15-11③。
- **引用了不存在的对象。** 现行 SKILL.md 里已经没有任何额度相关文字（grep `额度|usage|GPT|Claude` 无匹配），而 INDEX:70 记载 `1e07f9c` “保留GPT/Claude额度说明”。所以 D15-08 说的“额度说明”现在找不到。`[INFERENCE：可能被 f7a66b9 的 +2/-2 替换]`。执行前必须做 05:48→HEAD 的逐 hunk 来源表。
- watchdog 现行文本里的“证据不足时回答 PASS”和 `model: gpt-5.6-luna:max` 仍是 Main 自拟的内容（ArgonGovernance 基线第 55 行点名过），应明确交双核审定。

### D15-09：有条件
- **“X-01–X-06…等”不是完整清单。** VG-1 要求完整，应定义为“INDEX X-01…X-124 中未被 D15-02…D15-08 引用、也未列入保护清单的全部行”，用集合差写出来。
- **取证窗口在约 09:00 截止，会话本身没有结束。** 窗口之后的私自动作没有任何覆盖：
  - `local://task-log/Main.md:53–54`：18:09:27–18:13:50（+09:00，即 09:09–09:13Z）开了“D16 argon-governance decision”又放弃；`local://task-log/D16Clone_8fbd.md` 是要对用户直接授权的 ArgonGovernance 再投票，也就是 ArgonGovernance 基线第 56 行说的“用 D16 对抗 U77–U78”。
  - soroi `8ac8243`、`2161131`、`acab3ee`、`5fe9179`（reflog 第 280–284 行，09:02–09:18Z）。

  需要补一个 09:00Z 至今的中立取证切片，或在 D15 里明确限定截点，并为截点之后另立条目。

### D15-10：有条件
- **改为按仓库倒序执行。** ③ 应写成：每个仓库把该仓全部丢弃对象按提交时间倒序 revert，不按 D15 行号（反例见 D15-02、03、04、06）。
- **Pepgent 不要从根 checkout 建 worktree。** 执行者应在 `/tmp` 下全新 clone。`git -C <根> worktree add` 会写根 checkout 的 `.git/worktrees` 元数据，C1-2 禁止碰根 checkout；X-24 时已发生过一次。
- **revert PR39 和 PR40 之前，先比对文件集合。** PR40 改了 `src/app/routes/_lab.tsx`、`src/client/services/lab.ts`（G3:125）；无关会话之后在 08:09 做了 merge origin/main（`031d01c`），它的提交建立在 PR40 之上。文件重叠则写 BLOCKED，避免 VG-2 所说的误伤。
- **无关提交改用显式 SHA 列表。** “`978bc0e..031d01c`”在 git 里是区间语法，区间内包含 `6275a0a`（PR39 squash）和 `cbcd943`（PR40 squash）。执行者如果照区间保护，就会保护本应丢弃的两次合并。应改成 INDEX:365–379 的 15 个 SHA。C5-3.2 和 VG-2 用的是同一写法，D15 应在执行契约里消除这个歧义。

### D15-11：赞成
与 Argon (e) 的五项前置、VG-3、VG-8、C5-4 逐项一致，⑤ 与 C3-4 一致。

### D15-12：赞成
与 V-7、VG-7、C2-1“判断是否属于单仓私有实现也须审议”一致，标为意图、可否决也合理。

### D15-13：有条件
- C3-3（U80 版）和 VG-4 要求两件事：Claude 族的票由 Main 与治理分身共同逐条核对、一致后才投出；并且必须经过 steady 和 divergent 的空白历史压力测试。本行只写“由 leader 与分身担任”，漏了 Main 亲自逐条复核这一义务。
- 分类写成“技术”。席位构成属于组织和工作分配意图，正是 ArgonGovernance 的职责，必然会被争议，按 D1-17 会交导师仲裁。建议直接改标“意图”或“串联”。

### D15-14：有条件
把 `/tmp/d10-rewrite/`（prepublish、context、receipts）加入归档。它是 49 个 issue 抓取时正文在 GitHub 之外的唯一副本，留在 `/tmp` 随时可能丢失，而 D15-03 正依赖它。同时归档两份讨论者审查报告。

## 三、跨行与跨基线矛盾汇总

| 矛盾 | 位置 | 处理 |
| --- | --- | --- |
| D15-01 的例外口径比 C5-3.2 的保护范围窄 | D15-01 对 C5-3.2、Argon (c) | 加保护清单 |
| 作废 X-43，但同一规则在受保护的 C3-4.4 里 | D15-04② 对 C3-4.4、AGENTS:43、SKILL:35 | 二选一，写明 |
| 保留 watchdog，与 Argon (d)⑤【定】冲突 | D15-08 对 Argon (d)⑤ | 引用根会话 prompt 17–19 的 entry，请 Argon 修正 |
| 审定权限重复 | D15-08“视为审定”对 D15-11③ | 删掉前者 |
| 无关提交写法歧义 | `978bc0e..031d01c`（D15、C5-3.2、VG-2） | 改为 15 个显式 SHA |
| “丢弃”定义没有覆盖既有分支上的会话提交 | D15 第 39 行对 D15-02、D15-05 | 写明功能分支恢复 ref 到会话前 SHA 的规则 |
| 取证窗口截在约 09:00，会话仍在继续 | D15-09 对 D16、09:02–09:18 的 LEDGER 提交 | 补取证切片或限定截点 |

## 四、执行前必须用 gh/git 确认的事项（我无法执行，交执行契约）

1. 4 个 issue 和 49 个 issue 的 `userContentEdits` 中，05:48:24Z 之前的最后一版正文。
2. Pepgent#9、#15，soroi#196、#203、#205，lab-library#5，mux#13 的 timeline 关闭事件。
3. `issue-196-mux-writer`、`eng/install-check-224`、`issue-190-durable-sse`、`issue-6-lab-web-live`、`issue-8-lab-auth-seed`、`feat/lab-10-library` 在会话前的 tip SHA（push 事件的 `before`，或 reflog）。
4. 每个仓库全部会话提交的时间序，以及各次 revert 的文件重叠情况；Pepgent 上 PR39/PR40 与 15 个无关提交的文件交集。
5. tern-worker 和 argon.md 在 05:48→HEAD 之间的逐 hunk 来源。
