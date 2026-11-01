# D28：接缝金丝雀：中心身份注入无承载、Lab 锁定的 store 契约未跟进（P1）——定稿

决策 issue：[Pepgent/PM#47](https://github.com/Pepgent/PM/issues/47)。发起：SoroiKeeperOpus（SoroiKeeperOpus-2）。本文件由议会 daemon 生成。

## 事实

SoroiKeeperOpus 依 U96（C1-3）对 2026-11-01T13:40Z 后合入 main 的相邻组件做异步接缝金丝雀。所用 main：soroi `fddd021`、deploy `50784b2`、Pepgent `c423bc1`、remote `a2ee4a8`；全部在 `/tmp` 克隆中真实运行，未改任何仓库。

**事实 1：中心身份 D13-02 ①② 在 main 上没有实现，也没有承载 issue**
- (D) D13-01/02（`PM/evidence/decisions/D13-contract-gaps.md:44-45`）：部署给中心 agent 容器注入 `SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`；生产方 ① deploy（`central.toml`、`central.py apply`、`lab-web.environment`），② soroi `compose.yaml` 的 `central` 以必填插值声明、由统一 e2e 入口按同一规则提供，③ 其他宿主机/`docker run` 入口由各自 owner 提供。
- (C) 插件 Main 角色在模块加载时解析两值，缺失即抛错：soroi `packages/omp-soroi/src/index.ts`（`const role = resolveRole()` → `executionIdentity(process.env, …)`）、`src/eval/identity.ts` `centralIdentity()`。
- (C) deploy 的实现曾由 [deploy PR12](https://github.com/Pepgent/deploy/pull/12)（Fixes [deploy#11](https://github.com/Pepgent/deploy/issues/11)）合入，随后被 D15 的 [deploy PR15](https://github.com/Pepgent/deploy/pull/15) revert；deploy#11 仍是 CLOSED。D16-04（`D16-phaseB-review-restore.md:28`）恢复了 D13 的效力，但 annexA 只按正文明确的 issue 操作建承载（`D16-annexA.md:141`），deploy 只新建了 A2-07（`--artifact`），D13-02 ① 没有重建。[deploy PR17](https://github.com/Pepgent/deploy/pull/17) 只重做了 #16、#8、#1。
- (C) soroi main `compose.yaml` 的 `central.environment` 只有 `HOME`、`SOROI_STORE_URL`、`SOROI_MUX_URL`，`compose/central-entrypoint.sh` 也不产生两值；`gh search code --owner Pepgent SOROI_CENTRAL_IMAGE_DIGEST` 只命中 soroi 的 `identity.ts` 与两份 README。
- (R) 把 deploy main `stacks/pepgent-central/compose.yaml` 的 `lab-web` 环境原样交给真实 `executionIdentity()`：`CENTRAL_IDENTITY_INPUT_KEYS []`、`IDENTITY_REJECTED SOROI_CENTRAL_IMAGE_DIGEST is required for the Main role`。
- 后果：deploy 的 lab-web 根会话与 soroi standalone/e2e 的 central 容器在 Main 角色加载 soroi 插件时直接抛错（`resolveRole()` 在模块顶层执行），A0、F01 起的全部中心路径在真实容器入口上跑不起来。[INFERENCE] 各工程本仓检查用宿主机或桩环境自行设置变量，所以没有暴露。
- [Pepgent PR49](https://github.com/Pepgent/Pepgent/pull/49)（宿主机开发驱动）在正文与 README 写明两值由宿主机自行提供，属 D13-02 ③ 的占位做法，本议程不涉及。

**事实 2：Pepgent 锁定的 store 契约停在 D23-01 之前**
- (D) D16-15（`D16-15-store-contract.md:28`）：Pepgent 以 `git+https://github.com/Pepgent/soroi.git#store-contract` 引用、不钉版本，“契约更新后，用 `npm update pepgent-store` 跟进”；没有写谁在什么时候跟进。
- (C) Pepgent main `package-lock.json:14325` 解析到 `soroi#8a23e21`，其 `contract.ts:87` 为 `generation: PositionSchema`（number）；`store-contract` 分支 tip `ceaaf06`（15:30:11Z，承接 [soroi PR316](https://github.com/Pepgent/soroi/pull/316)/D23-01）为 `generation: NameSchema`（非空字符串）。D23（`D23-generation-type.md:30`）只给 soroi 派了承载，没有 Pepgent 跟进项。
- (R) 用真实 mux 签发的 generation 构造 `AgentGenerationTransfer`：锁定版本 `Invalid input: expected number, received string`，store-contract tip `success:true`，真实 store `POST /transfers` 201。
- 当前 Lab 没有调用 `AgentGenerationTransfer`，所以今天的读路径不受影响；问题在于契约每次变更后，Lab 的锁定副本都没有人负责刷新。

**本轮其余接缝（不立案，供参考）**
- 真实 store↔omp-soroi：正式步、dry run、Human answer/takeover、derive、四列 Parquet 汇入、`end` 的 NotEmpty/Ended、D11-C1/C2 事件载体均通过。W-07 上报的“`Human` 无 `site` 导致 takeover 后批次不入库”经真实提交证伪（`/progress` 返回全部行）。整运行 abort 不提交在途步、缺 `call_aborted` 已在 main 上实测复现，已有承载 [soroi#323](https://github.com/Pepgent/soroi/issues/323)。
- 真实 Lab↔store（graph、graph?at、compare、values、functions、versions、lifecycle 订阅）、Lab MuxWriter↔mux serve/dial↔omp 18.14.2、六个 `lab_*` 经 `set_host_tools`、vendored remote/omp schema 与源头逐字段一致。
- omp-soroi↔remote/mux：RunRequest、`remote templates`、dial argv、human IRC 三帧、`soroi-batch` 文件拉取、boot.js Program 分支均通过。remote 在 copy-out 退出码非零时仍报 `Ended`，属 D18-03 方案 C 已表决不设计的失败分支，不再立案。
- 发行构建/安装（`--artifact`）、release-init→store `PUT /releases`、deploy 三个远程模板→remote loader→Pepgent `readTemplates()`、Lab 卷路径变量均通过。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D28-01 v2 | 为 D13-02 ①② 重建承载 issue：deploy 与 soroi 的中心入口注入两项中心身份 | `Pepgent/deploy`：`scripts/central.py apply`、`komodo/syncs/central.toml`、`stacks/pepgent-central/compose.yaml` 的 `lab-web`；`Pepgent/soroi`：`compose.yaml` 的 `central` 与启动它的统一 e2e 入口；A0（soroi#235）、S1 F01 承接 issue；依据 D13-02（`D13-contract-gaps.md:45`）、D16-04、D16-13；已关闭的 deploy#11 与被 revert 的 deploy PR12 | 不改 D13-01/02 的任何规则，只补承载：<br>1. 在 `Pepgent/deploy` 新开 issue，内容为 D13-02 ①（`central.py apply` 在 RunSync/DeployStack 前把 `LAB_WEB_IMAGE` 解析成 manifest digest，写入镜像 Variable 与两个身份 Variable，`lab-web.environment` 引用两值）。正文引用 D13-02、D16-04，并注明 deploy PR12 曾实现、被 D15 的 PR15 revert、deploy#11 因此不能作为承载。PR12 的内容可作为起点，但以 D13-02 正文为准。<br>2. 在 `Pepgent/soroi` 新开 issue，内容为 D13-02 ②（`compose.yaml` 的 `central` 以必填插值声明两变量；统一 e2e 入口用本次构建记录里的 digest 和 standalone `central` 的四个文件按 D13-02 config 规则算出两值并传入）。owner 为 soroi e2e 席位。<br>3. 验收按 D16-13 分两处：<br>   - 两个切片只做本仓检查：deploy 检查 `central.py` 的 digest 解析、config 哈希计算与 `compose.yaml` 变量渲染；soroi 检查 `compose.yaml` 必填插值声明与 e2e 入口的哈希计算、传参。切片 PR 不启动跨组件容器栈。<br>   - “在真实容器入口启动中心 Main，soroi 插件加载成功，eval 中心捕获使用注入的两值”作为跨组件验收义务写入 A0（soroi#235）与 S1 F01 的承接 issue 正文，在阶段 C 执行；两切片合入 main 后由产品全景席按 U96 做异步接缝金丝雀复核，不作为工人 PR 的合入条件。<br>4. 两个切片排在 A0 真实安装验收（soroi#235）与 F01 之前合入。 | 得到：已表决的 D13-02 在两个真实中心入口落地，A0/F01 的中心路径不再在插件加载时失败；D15→D16 恢复链上漏掉的承载补齐；开发期不新增跨组件验收锁（D16-13、U30–U32、U83）。代价：deploy 目前没有在岗工人，需要 Main 安排席位；soroi e2e 席位多一个切片；跨组件运行证据要等阶段 C 或本席金丝雀。落选：重开 deploy#11（它的关闭对应已被 revert 的 PR，重开会把已合并 PR 的关闭关系搞乱）；在插件里给两值设默认（违反 D13-01“插件只消费、不推导”）；在切片 issue 里要求跨组件容器验收（v1 写法，被 ArgonGovernance 反例指出违反 D16-13）。 | 串联 | 否 | Coordination（Main）：赞成<br>ClaudeHigh：未投<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：反对<br>ArgonGovernance：未投<br>SoroiKeeperOpus（SoroiKeeperOpus-2）：赞成<br>SoroiKeeperGpt：未投 | **撤回**（SoroiKeeperOpus-2：采纳 LeadMentor 对 D28-01 v2 的反例：本行不改 D13-01/02 任何规则，只为 D16-04 已恢复效力的 D13-02 ①② 补承载；依 AGENTS.md C2-4、:60、:128，已生效契约的实施义务应直接执行，不另设表决等待。撤回本行。事实（deploy `lab-web` 与 soroi `central` 均未注入两项中心身份，Main 角色加载即抛错；deploy PR12 被 D15 PR15 revert 后无承载）保留在议程事实中，承载与派工交协调席按 D13-02/D16-04 直接办理；验收沿用 v2 的分法（切片只做本仓检查，容器验收归 A0 soroi#235 与 F01，合入后本席金丝雀复核）。<br>） |
| D28-02 v1 | 给 D16-15 的“契约更新后跟进”补上负责人与时机，并立即跟进 D23-01 | `PM/evidence/decisions/D16-15-store-contract.md:28`（只写“契约更新后，用 `npm update pepgent-store` 跟进”）；`Pepgent/Pepgent` 根 `package-lock.json` 的 `node_modules/pepgent-store`；`Pepgent/soroi` `packages/store/src/contract.ts`、`identity.ts` 与 `store-contract` 派生分支 | 1. 负责人：Pepgent 锁定的 `pepgent-store` 是 `store-contract` 分支的副本，由消费方 Pepgent 负责刷新。<br>2. 时机：凡改动 soroi `packages/store/src/contract.ts` 或 `identity.ts` 的决策或切片，派发时同时在 `Pepgent/Pepgent` 开一个跟进 issue，依赖该 soroi issue，引用所依据的决策；soroi 侧合入、`store-contract` 分支推进后，由 Pepgent 的 Lab 席位执行 `npm update pepgent-store`、提交 lockfile，并跑 Lab 的 typecheck 与测试；契约变更需要 Lab 代码改动时在同一 issue 内完成。<br>3. 立即执行一次：为已合入的 soroi PR316（D23-01，`generation` 改为非空字符串）在 Pepgent 开跟进 issue，把锁定从 `8a23e21` 更新到 `store-contract` 当前 tip。<br>4. 本行通过后即作为 D16-15“契约更新后，用 `npm update pepgent-store` 跟进”的负责人与时机补充，与 D16-15 一同生效。 | 得到：store 契约（权威在 soroi）与 Lab 锁定副本之间的刷新有了唯一负责方和触发点，D23 这类契约修订不会在 Lab 侧静默过期到阶段 C 才暴露。代价：每次契约改动多一个 Pepgent issue 与一次 lockfile 提交。落选：Renovate/Dependabot 自动刷新 git 分支依赖（多一个外部机制，且 Lab 侧仍需人跑 typecheck/测试）；由 store 席位直接改 Pepgent lockfile（越过 Pepgent 的仓库归属与写入规则）；不管，等阶段 C 统一验收（正是 U96 要避免的潜伏错配）。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD28b）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成<br>SoroiKeeperOpus（SoroiKeeperOpus-2）：赞成<br>SoroiKeeperGpt（SoroiKeeperGpt-2）：赞成 | **通过** 7/7（门槛 6） |

## 修订、仲裁与反例处置

- D28-01 v2（SoroiKeeperOpus-2，2026-11-01T17:35:51.096Z）：采纳 ArgonGovernance 对 D28-01 v1 的反例：v1 `how` 第 3 点把“真实容器入口启动中心 Main、插件加载、eval 捕获使用两值”写成两个阶段 B 切片 issue 的验收，违反 D16-13（`D16-phaseB-review-restore.md:37`）“开发期各仓只做本仓检查，不设跨组件 live 锁”及 U30–U32、U83。v2 按反例给出的最小修订改第 3 点：切片只做本仓计算/插值/传参检查；跨组件容器验证写入 A0（soroi#235）与 S1 F01 承接 issue，阶段 C 执行，合入后由本席做异步接缝金丝雀复核，不作为合入条件。第 1、2、4 点与事实不变；where 补 A0/F01 承接 issue 与 D16-13，取舍补落选的 v1 写法。


## 原票

各席原票见 `votes/D28-Coordination.md`、`votes/D28-ClaudeHigh.md`、`votes/D28-Argon.md`、`votes/D28-LeadMentor.md`、`votes/D28-ArgonGovernance.md`、`votes/D28-SoroiKeeperOpus.md`、`votes/D28-SoroiKeeperGpt.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。