# Pepgent#24（LAB-08）BLOCKED 的闸门材料：两项契约裁决请求

- **issue：** [Pepgent/Pepgent#24](https://github.com/Pepgent/Pepgent/issues/24)，工人 W-09（tern 会话 `pepgent-lab`）。交付 PR：[Pepgent/Pepgent#58](https://github.com/Pepgent/Pepgent/pull/58)（`Fixes #24`，分支 `issue-24-lab-intervene`，base `issue-17-lab-catalog-events`，HEAD `bd4ab41`）。
- **BLOCKED：** [评论 6561585140](https://github.com/Pepgent/Pepgent/issues/24#issuecomment-6561585140) 的两项“契约空白”。过渡行为：第一项返回 `revision_conflict`（“not online”），第二项返回 `not_supported`。
- **编制：** governance-desk 实例 `DeskPepgent24Rulings`（总协调席，与 Main 合计 1 票）。本文整理事实，给每项标出类别，并列出待两道闸门判定的问题和可选处置。类别是起草者的初分，不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界的项才可作为机械补全免投票放行；任一闸门认定越界的项，合为一张 P0 议案立案投票。两项分别判定，结论互不替代。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论与 PR 正文属于 `(A)`。本实例只读文件与源码，没有运行构建、测试或跨组件程序，没有读 git 历史或 session。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`（`AGENTS.md`、`LEDGER.md`、`design/`）
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`
- `MUX/` = `/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux/`（main `cd11f31`）
- `DEP/` = `/Users/mouriya/Ext/code/pepgent/pepgent-deploy/`（main `50784b2`）
- `WT08/` = W-09 的 LAB-08 worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-08/`（PR#58，`bd4ab41`）

类别（brief 规定的四类）：
- **K1 既有决策已覆盖，只需澄清**
- **K2 主路径外的失败或竞态**（`SOR/.claude/rules/design-assumes-it-works.md`：设计只写主路径）
- **K3 隐含的内部实现**（`DEC/D10-repo-delivery.md:20` D10-08：已通过契约内的单仓私有结构、算法、文件组织由工程师决定）
- **K4 公开契约缺口**（D10-08 表决类别：跨仓公开契约、权限、状态权威与生命周期、部署前提、验收语义等）

---

## 一、根会话停驻时的 `intervene.derive` 与 `run.abort`

### 1.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F1-1 | 工人的问题：Mux 不替消费者唤醒停驻进程；D7-09 只写了“读取时不唤醒”。对已结束运行派生时根会话很可能已停驻。请裁定由 Lab 开一代再发，还是直接拒绝。过渡：返回 `revision_conflict`（“not online”）。工人引用的出处是“omp-rpc-mux design/mux.md 控制端点一节”。 | (A) 评论 6561585140 第 1 项；PR#58 正文 |
| F1-2 | 工人引用的 `design/mux.md` 不在 Mux main 上（该目录不存在）。Mux main README 的现行文字：名字仍归声明但端点“已停驻”时 POST 返回 503；名字归属跨停驻保留到 writer 声明结束，由同一声明的新一代接替；Mux 本身不启动进程。与“Mux 不代为唤醒”一致。 | (R) `ls MUX/` 无 `design/`；(D) `MUX/README.md:187,199`；`DEC/D2-components.md:45`（D2-08） |
| F1-3 | **D2-06 路由前提：**“介入请求只能送到在线的控制端点。根会话已停驻时，Lab 后端作为写方先开新的一代，等端点注册后再路由。” | (D) `DEC/D2-components.md:43` |
| F1-4 | **D3-19：**“持有者已停驻时，它的写方（根会话由 Lab 后端，中心 worker 由根会话的 subagent 模块）先开新一代，等端点注册后再路由。”同一行写明读取 `writers`/`slots`“不唤醒 parked 会话”。 | (D) `DEC/D3-network-mux.md:73` |
| F1-5 | **设计正文：**“`intervene.derive` 与 `run.abort` 按运行寻址，从 store 运行记录查到 `holder` 后发往根端点 `eval:<holder>`（若目标会话已空闲停驻，写方先在同一写方声明里启动新的一代进程，等控制端点注册后再路由请求）。” | (D) `SOR/design/intervention.md:11` |
| F1-6 | D5 第 2 轮对导师意见的处理：“D2-06 已定：对已停驻的会话发起派生时，Lab 后端作为写方先开新一代，等端点注册后再路由；所以执行派生、拿到提交结论的插件一定在线，可以直接投递 IRC”（D5-16 情形二）。 | (D) `DEC/D5-plugins-eval.md:395`；`:91`（D5-16） |
| F1-7 | D7-09 的“已停驻的会话没有在途 `soroi_eval`，读取时不唤醒”出现在“找端点”段，约束的是读取；同一行的派生、中止段没有“不唤醒”的条件。D7-04 的启动配方与“唤醒：在同一个写方声明里开新的一代（D3-07），从 ① 之后的 ② 开始”是开代的既定步骤；D7-15 对模型目录同样规定“会话已停驻时，按 D7-04 先开新的一代”。 | (D) `DEC/D7-lab-backend.md:69`（D7-09）；`:64`（D7-04）；`:75`（D7-15）；`:146-147`（`LabSessions.open/prompt`） |
| F1-8 | 主路径可达：F24 ① 写明“P 已结束时”派生出 R'，即对已结束运行派生是验收流程的一部分。 | (D) `DEC/D8-mvp-scope.md:143`（F24）；LAB-08 `:329` |
| F1-9 | Lab 已有开代路径：`LabSessions` 的 `kick`/`start` 在同一写方声明里开代、`spawn` dial、等 `ready`；PR#58 的 `onRun` 在 `onlineRoot` 不满足时直接返回 `conflict`，没有复用该路径。 | (D) `WT08/apps/web/src/server/lab/sessions.ts:86-107,180-197`；`WT08/apps/web/src/server/lab/intervene.ts:120-148` |
| F1-10 | “等端点注册后再路由”中的等待方式（等 `ready` 后请求、遇到注册前的 503 怎么办）：Mux 规定端点可在 ready 前建立，HTTP 请求等本代真实 ready；名字仍归声明但端点离线或代未 ready 返回 503。控制端点失败回复与竞态不在设计范围内（D19-02）。 | (D) `MUX/README.md:176,199`；`DEC/D19-sor13-control-contract.md:30`（D19-02） |

### 1.2 初分类

- **主体：K1（既有决策已覆盖，只需澄清）。** D2-06、D3-19 与 `design/intervention.md:11` 三处已通过的正文直接回答了工人的问题：根会话停驻时，Lab 作为写方先开新一代，等端点注册后再路由 derive/abort。D7-09 的“不唤醒”只约束读取。工人引用的“Mux 不代为唤醒”与此一致：唤醒由写方负责，不由 Mux 负责。
- **附属：K3 + K2。** 复用 `LabSessions` 的哪段开代代码、何时判定“端点已注册”属于单仓实现（K3）；开代后注册前的 503 窗口属于竞态（K2），按 D19-02 不作设计。

### 1.3 闸门 A 的问题（交 `Argon`）

- **A1-1：** F1-3 至 F1-6 是否已完整回答本项，使“Lab 先开一代、等端点注册后再发 derive/abort”成为既有契约，而不是新增决定？
- **A1-2：** “直接拒绝”（处置 b）是否与 D2-06/D3-19 冲突，并使 F24 ①“P 已结束时派生”在主路径上不可达？
- **A1-3：** 唤醒根会话只为路由一条控制请求，不投递 prompt；随后由插件按 D5-16 情形二投递带 `human:<by>` 的 IRC 开启新一轮。这一串行为是否已全部由现有条文规定，没有触及新的产品意图？

### 1.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B1-1：** 若 A 认定是 K1，本项是否只需在 #24 写明出处，由 Pepgent 片区经理送达 W-09，在 PR#58 内补实现，不立案、不跨席位？
- **B1-2：** 开代复用 `LabSessions` 的现有路径只改 W-09 白名单内的 `apps/web/src/server/lab/**`，是否不涉及其他席位的路径或派工？

### 1.5 可选处置（只列出）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 按 D2-06/D3-19/`intervention.md:11` 执行：根会话停驻时，Lab 在同一写方声明里开新一代，等端点可用后发送 derive/abort，结论原样返回；等待方式与注册前竞态由工程师在既有错误变体内自定。 | 不改 | 只补 PR#58 的实现 |
| b | 直接拒绝（维持 `revision_conflict`）。 | 与 D2-06、D3-19 冲突，需改契约 | F24 ① 不可达 |

---

## 二、子 agent 的 `human.irc`：受信 reader 凭据与同容器 omp 的隔离

### 2.1 现有决策中的权威与边界

| 对象 | 权威 / 持有者 | 边界条文 | 来源 |
|---|---|---|---|
| 子 agent 的人类 IRC 待投递表 | 该 agent 的写方，即父进程里的 subagent 监管者（soroi） | Lab 不持有子 agent 的待投递表；GUI 经 Lab 在 `/agents/{id}/reader` 上发 `mux_human_irc*` 帧，Mux 原样转给写方 | (D) `DEC/D3-network-mux.md:66`（D3-12）；`DEC/D7-lab-backend.md:69`（D7-09）；`SOR/design/intervention.md:57`；`SOR/design/subagent.md:22` |
| 根 agent 的人类 IRC 待投递表 | Lab 后端（`human_irc_queue`） | 不经 Mux；PR#58 已实现 | (D) D3-12；D7-09 |
| 发人类帧的资格 | Mux 依连接凭据授予 | “只有用后端凭据建立的受信 reader 连接能发人类帧，`principal` 由这条连接在帧里给出，mux 不信任任何自报 header” | (D) D3-12；`DEC/D8-mvp-scope.md:238`（MUX-05 验收：受信读方的帧能到达写方，非受信读方被拒绝） |
| 受信 reader 凭据的持有者 | Lab 后端 | D7 第 1 轮采纳：“当前用户 id 作为 `mux_human_irc*` 帧的 `principal` 字段，由 Lab 的受信 reader 连接发出” | (D) `DEC/D7-r1-responses.md:20`；`MUX/README.md:105` |
| 凭据的注入 | `Pepgent/deploy`（W-04） | “Mux 的写方与读方凭据……由 `Pepgent/deploy` 按既定路径注入”；“凭据由该仓库按既定路径注入，不手工粘贴” | (D) `DEC/D7-lab-backend.md:79`（D7-19）；`DEC/D2-components.md:60`（D2-23）；`MUX/README.md:14` |
| 凭据的隔离要求 | Mux 组件文档（W-01 路径，非决策正文） | “部署者必须将受信凭据仅注入 serve 与 Lab 后端，不得让任意 omp 通过环境、挂载文件或进程检查读取它。dial 会继承调用方环境，Mux 的角色闸门不是 OS 沙箱，也不以过滤某个 env 名称替代凭据隔离。” | (D) `MUX/README.md:117` |
| 根 omp 的运行位置 | Lab 容器，Lab 是写方 | 根 omp 与它在本机启动的 subagent 都是 Lab 容器里的进程；“根会话与写方同在一个容器，Lab 才能直接在本机执行 dial” | (D) `DEC/D2-components.md:57`（D2-20）；`DEC/D7-lab-backend.md:79`（D7-19 取舍）；`DEC/D3-network-mux.md:64`（D3-10）；`DEC/D7-lab-backend.md:64`（D7-04 ③“在本容器内执行 dial”） |
| 多 Lab | 每个 Lab 一套 soroi 实例（含独立 Mux），Lab 后端按 `labId` 路由；部署单元供给细节按用户原话作为占位 | agent 的所属 Lab 取它所在 Mux 实例对应的 Lab | (D) `DEC/D18-product-opus-contracts.md:11`（D18-05，`(U) bf96d256`、`d5277d47`）；`DEC/D29-pepgent-20-slot-overlay.md:31`（D29-01） |

### 2.2 事实

| # | 事实 | 来源 |
|---|---|---|
| F2-1 | 工人的问题：根 omp 由 Lab 在同一容器内以同一用户启动，继承 Lab 的进程环境；Lab 持有受信 secret，omp 就能读到。请裁定凭据的隔离方式，例如改变部署拓扑，或由部署方提供隔离的注入路径。过渡：子 agent 的 `human.irc` 返回 `not_supported`。 | (A) 评论 6561585140 第 2 项；PR#58 正文 |
| F2-2 | Lab 启动 dial 时 `env: { ...process.env, MUX_GENERATION, MUX_TOKEN, SOROI_ROLE, SOROI_MUX_URL, MUX_AUTH_TOKEN, … }`，即根 omp 继承 Lab 的全部环境。 | (D) `WT08/apps/web/src/server/lab/sessions.ts:186-197` |
| F2-3 | 中心 Stack 的 `lab-web` 服务没有 `user:`，Lab 后端与根 omp 同容器、同 UID；环境里没有受信 reader 凭据，`mux` 服务也没有 `--trusted-reader-token*` 参数。deploy README：“不擅自升级协议或添加该二进制不支持的 trusted-reader 参数；人工 IRC 的新协议能力不在 DEP-01 完成结论内”。 | (D) `DEP/stacks/pepgent-central/compose.yaml:65-100`；`DEP/README.md:97` |
| F2-4 | 同 UID 下，只剔除子进程环境变量不能满足 F2.1 末行的要求：omp 可读同 UID 进程的环境与同 UID 可读的文件；Mux README 明说“不以过滤某个 env 名称替代凭据隔离”。 | (D) `MUX/README.md:117`；推论 `[INFERENCE]` |
| F2-5 | 根 omp 本身需要部署 bearer：soroi 子 agent 的写方（监管者）在根 omp 进程内，用部署 bearer 打开 `/agents/{id}/writer`；PR#58 已把 `MUX_AUTH_TOKEN` 传给 dial。部署 bearer 只能建 writer、只读 reader 和调用控制端点，不能发人类帧；受信 reader bearer 必须与部署 bearer 不同。 | (D) `SOR/design/subagent.md:50`；`MUX/README.md:26,86,178`；F2-2 |
| F2-6 | 已有先例：D13-05 收窄中心节点 runner 的可见环境（runner 不再继承中心进程环境），取舍栏写明收益只是“不经 runner 环境传递”，不是节点整体看不到凭据。 | (D) `DEC/D13-contract-gaps.md:48,71,87` |
| F2-7 | 相关验收：F25“经 IRC 接管 subagent”（读方连接发 `mux_human_irc`、edit、withdraw，transcript 中来源为 `human:<principal>`）；SOR-16 监管者写方契约；LAB-08 依赖 SOR-16、列 F23–F25。 | (D) `DEC/D8-mvp-scope.md:144,279,329` |
| F2-8 | 人类来源在 transcript 与插件中有区别：监管者区分人类发起的轮次（D5 `Turn.human`），回答不交还给 `human:*`。凭据被 agent 读到，意味着 agent 可以用任意 `principal` 发出被当作人类的帧。 | (D) `DEC/D3-network-mux.md:66`（D3-12 第 3 段）；推论 `[INFERENCE]` |
| F2-9 | 现有决策规定了凭据的持有者（Lab 后端）和注入者（deploy），没有规定同一容器、同一用户下 Lab 后端与根 omp 之间怎样隔离。D2-20/D7-19 选定同容器，没有写进程用户；D7-04 的启动配方没有写环境剔除或换用户。 | (R) 在 `DEC/D2-components.md`、`D3`、`D7`、`D12`、`D13`、`D18`、`D19`、`D29` 中检索“受信/trusted/凭据隔离/user”未见此项；`DEP/` 中仅 F2-3 两处 |

### 2.3 初分类

- **K4（公开契约缺口，属 D10-08 的“部署前提”与“权限”）。** 权威已定：受信凭据由 Lab 后端持有（D7 r1）、由 deploy 注入（D7-19、D2-23）、由 Mux 校验（D3-12）。缺的是同容器内 Lab 后端与根 omp 之间的隔离方式。现有的同容器同用户拓扑（D2-20、D7-19、D7-04）不能满足 Mux 文档的隔离要求（F2-4）。任何处置都要改 D7-04 的启动配方、D7-19/D2-20 的部署形态或 Mux 文档的部署要求之一，并跨 W-09（Lab）、W-04（deploy），可能还涉及 W-03（images 的容器用户）。
- 不属 K2：子 agent 的人类 IRC 是 F25 的主路径，不是失败分支。
- 不属 K3：处置会改变部署前提与跨仓启动配方，不是单仓私有结构。

### 2.4 闸门 A 的问题（交 `Argon`）

- **A2-1：** “任意 omp 不得读到受信凭据”（Mux README:117）是否属于 D3-12“只有后端凭据建立的受信 reader 连接能发人类帧”与 `human:*` 来源可辨的既定意图（F2-8），从而处置 c 触及产品意图？如需 `(U)`，请给出。
- **A2-2：** 处置 a、b 分别改 D7-04 配方与 D7-19/D2-20 拓扑，是否都属于部署前提的公开契约，必须表决？
- **A2-3：** 维持 `not_supported`（处置 d）是否使 F25 在 GUI 路径上不可达，违背“全流程不收缩”（`(U) U2`、`U23`）？

### 2.5 闸门 B 的问题（交 `ArgonGovernance`）

- **B2-1：** 本项改动跨 W-09（`apps/web` 的 dial 启动）与 W-04（`stacks/pepgent-central` 的用户、secret 与 Mux 参数），可能还涉及 W-03（镜像用户），是否属于跨席位派工，必须投票？
- **B2-2：** 表决期间 W-09 对子 agent 的 `human.irc` 维持 `not_supported`、其余命令照常交付，是否符合 D10-08“只暂停依赖部分”？PR#58 能否在第一项补齐后、本项定案前合入？
- **B2-3：** deploy README:97 已把人工 IRC 排除在 DEP-01 完成结论外（F2-3）。本项定案后由谁承载 deploy 侧改动（新 issue 或既有切片），是否需要在议案中写明？

### 2.6 可选处置（只列出）

| 代号 | 处置 | 改动面 | 需要注意的地方 |
|---|---|---|---|
| a | **同容器、分 OS 用户：** Lab 后端以专用用户运行，受信凭据以只有该用户可读的 file-backed secret 注入（serve 用 `--trusted-reader-token-file` 读同一来源）；Lab 以另一个非特权用户启动 dial/根 omp，传给 dial 的环境只列 D7-04 ③ 的项和部署 bearer，不继承 Lab 环境。 | 改 D7-04 ③ 启动配方、D7-19 凭据与用户；W-04 compose 与 secret；镜像需有两个用户（W-03） | Lab 需要降权启动子进程的能力；会话 worktree 卷（写方是 omp 和人，Lab 创建）与 omp session 卷（Lab 读 transcript）的属主和组权限要随之确定 |
| b | **拆容器：** 受信 reader 连接放到不运行任何 omp 的容器（例如 Lab 后端与根 omp 分处两个容器，Lab 以写方身份跨容器启动根 omp）。 | 改 D2-20、D7-19 拓扑与 D7-04 ③“在本容器内执行 dial” | 与 D7-19 取舍“根会话与写方同在一个容器，Lab 才能直接在本机执行 dial”冲突；会话 worktree、Lab 库检出等共享卷要重新划分 |
| c | **把 Lab 容器整体定为受信边界：** 接受同容器 omp 能读到凭据，改 Mux README:117 的部署要求。 | 改 Mux 文档（W-01）的部署前提 | agent 能以任意 `principal` 发人类帧（F2-8）；由 A2-1 判定是否触及意图 |
| d | **维持 `not_supported`。** | 不改 | F25 GUI 路径不可达（A2-3） |

---

## 三、同一评论中不在本次范围内的事项（只登记）

- **P16 文件交回的路径可达性：** 工人推断“持槽会话在 remote 放置时，中心 worktree 的 `inputs/` 路径能否到达由 eval 插件负责”，自述未核实，没有标 BLOCKED。本材料不作分类。
- **PR#58 的叠加交付与 PR#55 前提：** 按 [#17 评论 6561391690](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6561391690) 与 D25、D29 的既有结论执行，与本两项无关。

## 四、闸门判定后的程序

- 两项分别判定。某一项 A、B 都确认不越界时，按机械补全放行，结论写回 #24，再由 Pepgent 片区经理送达 W-09。
- 任一闸门认定越界的项，合为一张 P0 议案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`），由本实例用 `council propose --seat Coordination` 立案；排队、收票、计票与归档由议会 daemon 完成（`SOR/AGENTS.md:24-27`）。
- 闸门结论写入 `PM/evidence/gates/pepgent-24-gate-a.md`（Argon）、`PM/evidence/gates/pepgent-24-gate-b.md`（ArgonGovernance）。
