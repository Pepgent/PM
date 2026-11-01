# D8 soroi MVP：验收定义与实现计划

起草：DrafterD8Scope（Claude 族，task:high）。导师 D8Mentor 已在动笔前审过计划，意见在相应行的取舍列里处理。本表与 `decisions/D2-components.md` 至 `D7-lab-backend.md` 对齐，不重议其中已定的归属与契约。设计阶段只写主路径，不确定处写成占位并假定能工作（`pepgent-soroi/.claude/rules/design-assumes-it-works.md`）。

依据缩写（行号均为当前工作树）：

| 缩写 | 文件 |
| --- | --- |
| FC | `pepgent-pm/evidence/argon/flow-catalog.md` |
| D2…D7 | `pepgent-pm/evidence/decisions/D2-components.md` … `D7-lab-backend.md` |
| ENV-S | `pepgent-pm/evidence/env/pepgent-slurm.md`（与 `~/Ext/work/orbstack/pepgent-slurm.md` 同文） |
| ENV-K | `pepgent-pm/evidence/env/pepgent-komodo.md`（与 `~/Ext/work/orbstack/pepgent-komodo.md` 同文） |
| LEDGER | `pepgent-soroi/LEDGER.md` |
| REM-RD | `pepgent-remote/README.md` |
| SUB-RD | `pepgent-omp-soroi-subagent/README.md` |
| EVL-RD | `pepgent-omp-soroi-eval/README.md` |
| SMOKE | `pepgent/apps/web/tests/smoke.md` |
| SNAP | `pepgent/apps/web/src/client/contracts/lab-snapshot.ts` |
| omp://… | omp 自带文档 |
| 规则《…》 | 本机全局规则（系统提示中的 generic-rules / domain-rules），按标题引用 |

## 1. 框架

**要回答的问题。** U23 的原话是：“对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”（LEDGER:126-128）。这句话包含四项要求，D8 分别回答：

1. “最小功能合集”指什么，用什么判定“走通”：MVP 的定义与验收矩阵（§2 D8-01、D8-02，§3）。
2. “完整的omp定制”怎样打包、怎样装到干净的 omp 上：D8-03。
3. “作为pepgent的agent核心”在 MVP 里具体指什么：D8-04。
4. 实现怎样切片、按什么顺序集成：D8-13、D8-14，§4。

此外还要回答两项：在哪里测、怎样测、留什么证据（D8-05 至 D8-12）；D9 怎样盘点“点、线、面”（§5）。

**已定的边界（不重议）。**

- FC 列出的 F01–F32 是验收依据（FC:4，FC:10-45）。
- soroi 以 `Pepgent/soroi` 单仓发行：仓内有 `packages/omp-soroi`、`packages/store`，以及 agent 定义、技能、规则和设置覆盖（D2:62 D2-25；D5:76 D5-01；D6:50 D6-22）。
- Mux 独立成仓 `Pepgent/omp-rpc-mux`；每个 omp 进程都由它的写方用 `omp-rpc-mux dial` 启动（D3:56-62）。
- 远程执行的闭合契约见 D4。
- Lab 后端在 `Pepgent/Pepgent` 的 `apps/web` 里，以写方身份启动根会话（D7:61-64）。
- D2-25 已规定验收分两段，并有一项前置验收（D2:62）：
  - 前置验收：在 HOME 为空的干净上游 omp 中安装 artifact，逐类确认扩展、agent、技能、规则、设置都生效；
  - 第一段：用一个测试客户端扮演 Pepgent，只经 Mux、控制端点和 store 的 HTTP/SSE 走通 soroi 一侧；
  - 第二段：接上真实的 Pepgent；
  - 两段之差就是“点、线、面”。
- 测试环境放在本机 OrbStack（D2:59 D2-22；LEDGER:207 R31）。
- 实现阶段切成小而清楚的单元，交给 task:low / task:free（LEDGER:134-140 U25、U26；LEDGER:261 R60）。
- 全流程交付，不擅自收缩（LEDGER:17-19 U2）。
- 未经 runtime 验证不算完成（规则《没有端到端 runtime 验证 = 没做》）。

**FC 里【暂定】子项的验收口径。** FC 有八处子项标为【暂定】。验收时按已表决的决策行执行，不按 FC 草稿执行：

| FC 子项 | 验收口径 |
| --- | --- |
| F04 `pins` 格式（FC:17） | D5-09（D5:84） |
| F03 强制穷尽解构（FC:16） | D5-11 第 (7) 项（D5:86） |
| F08 `human(request)` 签名（FC:21） | D5-14（D5:89） |
| F12 全文检索（FC:25） | D6-08：不建 FTS，按 SQL 文本匹配（D6:36） |
| F13 对齐键（FC:26） | D6-13（D6:41） |
| F17 “0/3”推送（FC:30） | D3-13：只拉取，不推送（D3:67） |
| F27 草稿持久化（FC:40） | D6-12、D7-02（D6:40；D7:62） |
| F28/F29 Schema 与影响校验（FC:41-42） | D6-21、D7-11（D6:49；D7:71） |
| F30 事件协议（FC:43） | D6-06、D7-10（D6:34；D7:70） |

**FC 与 D6-20 的事件名不同。** FC 的 F01 写的事件名是 `step_formal`、`stop`（FC:57）。验收按 D6-20 收敛后的事件集判定，即 `step_committed`、`atom_stopped`（D6:48）。

## 2. 决策表

分类：意图 / 技术 / 串联 / 实现。最后一列标明该行是否属于缺失部分或设计补充（argon 可以否决的范围，LEDGER:55 U11）。

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D8-01 | **MVP 的定义：F01–F32 全部，不取子集** | 本表 §3 验收矩阵；LEDGER 的 R54–R57（LEDGER:240-243） | MVP 指 §3 矩阵 32 行全部通过，每行至少有一份 §2 D8-12 格式的证据。<br>• F01–F30：按矩阵标的段验收。标“两段”的流程，第一段先过，第二段再过。<br>• F31：只在第二段验收。<br>• F32：D9 报告按 §5 方法完成，并经表决。<br>• FC 的【暂定】子项按 §1 的对照表验收。<br>D2–D7 已定、但没有任何 F 流程会走到的组件或能力（列在 D8-16），不算 MVP 的验收项。它们原样列入 D9 的输入，不默默丢掉 | **选定：** 全集。U23 说“能走通我说的所有流程”，U2 说“不要擅自收缩”（LEDGER:17-19、126-128）。<br>**朴素方案：** 先做核心子集（如 F01–F13），其余记为后续。这正是 U2 禁止的收缩。<br>**实质不同的方案：** 把 D2–D7 的每个组件都当成验收项。这会把用户没说过的流程（例如镜像构建界面）提升为 MVP 门槛，偏离“我说的所有流程”（FC:6“只写用户说过的流程”） | 意图 | 是：U23 |
| D8-02 | **验收的分段与前置项** | `Pepgent/soroi` 的 `e2e/`（前置验收与第一段）；`Pepgent/Pepgent` 的 `apps/web/tests/e2e-lab/`（第二段） | 沿用 D2-25 的三层（D2:62）：<br>• **前置验收 A0**：在 HOME 为空的干净上游 omp 中安装发行 tar，逐类枚举并执行扩展、agent、技能、规则、设置（D8-03）。<br>• **第一段 S1**：由测试客户端 LabStandIn 扮演 Pepgent（D8-08）。它只用 Mux 的写方与读方、控制端点、store 的 HTTP/SSE，以及 PTY（D8-09）。<br>• **第二段 S2**：真实 Lab 后端，加真实浏览器（D8-10）。<br>§3 矩阵为每行标出段。S2 的流程判定必须经由 Lab 的真实入口（登录后的页面或 server function），不能拿 S1 的结果顶替 | **选定：** 两段之差就是 D9 的“线”（D2:62；§5）。<br>**朴素方案：** 只做第二段。soroi 和 Lab 的问题会混在一起，D9 分不清缺口在哪一侧。<br>**实质不同的方案：** 只做第一段，Lab 另行验收。这样拿不到“作为pepgent的agent核心”的证据（U23） | 串联 | 否（D2-25 已定，本行落地） |
| D8-03 | **完整 soroi omp 定制的打包与在干净 omp 上的安装** | `Pepgent/soroi`：<br>• CI 从确定 commit 产出 `soroi-<sha256>.tar`；<br>• 内含 `manifest.json` 与 installer；<br>• 插件包 `packages/omp-soroi`；<br>• `agents/`、`skills/`、`rules/`、`settings/` 覆盖文件。<br>安装目标是 omp-agent 镜像（IMG-01，D2:48 D2-11） | **安装：** installer 只用 omp 的公开机制，把每类内容装到 omp 支持的位置，设置覆盖经 config 路径或启动参数加载（D2:62）。<br>• 中心容器启动时安装同一份 tar（D2:57 D2-20）。<br>• 远程每次启动经 copy-in 拷入同一份 tar，以 `HOME=<mount>/soroi/home` 安装（D4:55 D4-09）。<br>• store 就绪后，init 以 `PUT /releases/{version}` 提交同一份 artifact，store 在一个事务里放入 boot、runner、定制 tar 并写 `ReleaseRecord`（DEP-03，D6:50、155-158）。<br>**A0 探针（DIST-02）：** 在新起的 IMG-01 容器里运行（`docker run --rm -it`，加入 `pepgent-soroi-e2e` 的网络；不用已装好发行 tar 的 `central`）。顺序固定：<br>(a) 检查 `ls -A $HOME` 为空、没有 `~/.omp`；<br>(b) 注入与 `central` 相同的 env（`SOROI_STORE_URL`、`SOROI_MUX_URL` 等）和 `models.yml`，以及 A0 容器自己的 client token（D8-06）；<br>(c) 运行 installer；<br>(d) 由 PTY 驱动 omp 逐类验证：<br>① 扩展：`soroi_eval`、`soroi_task` 出现在工具里，一次 `soroi_eval` dry run 返回 `CallReport`；<br>② agent：`soroi_task` 按 soroi 的 agent 定义名派出一个 worker，worker 的 transcript 记有该定义的模型与系统提示；<br>③ 技能：`read skill://soroi-eval` 返回发行包里的正文；<br>④ 规则：transcript 里有发行包规则的注入记录，注入文本与发行包里的规则文件一致（不以模型回答的措辞作判据，D8-11）；<br>⑤ 设置：子进程的 `personality: none` 生效（D2:62 引 inv/r-subagent.md:64-66）。<br>任何一项失败，A0 即判失败。<br>**omp 版本：** 镜像构建时取上游最新发行版，不钉版本（规则《实现时不钉版本号》），实际版本写进每份 verdict（D8-12） | **选定：** 发行 tar 加 installer，在干净 HOME 中验证。这对应 D2-25 已选的“一个只依赖上游 omp 的发行包”（D2:62），也满足 U24“soroi是独立的omp定制”（LEDGER:130-132）：干净 HOME 证明不依赖本机 omomp。<br>**朴素方案：** 沿用现状，两个仓库各自 `omp plugin link`（EVL-RD:16；SUB-RD:8）。这不是可安装的整体，也证明不了独立性。<br>**实质不同的方案：** 把定制烘进镜像。D2-25 已否决（D2:62）。<br>占位 EP0：omp 的公开机制能接收 installer 放置的规则和设置，并让它们生效。这与 D2 的“安装位置”占位相同（D2:176），A0 会实际确认 | 技术 | 是：U23 |
| D8-04 | **MVP 中 Pepgent 使用 soroi 核心** | 第二段 apps/web server/lab；第一段 LabStandIn | 运行调用面为D7-20四条线：store HTTP/SSE、Mux写方/读方/控制端点（Lab本机dial根）、RPC host tools、Lab库项目定制。Lab只引用D12-01的store权威contract/schema解析HTTP，不导入store服务或插件执行器；依赖接法D10-10/D16-05。MVP要求F31第二段通过，且没有旁路运行接口。LabStandIn只实现写方/读方生命周期、prompt/事件、控制端点和store客户端，不建业务库、不注册lab_*、不做投影，业务仅第二段 | 拿掉Pepgent仍可运行soroi；standin不复刻Lab业务，保留两段差距的意义 | 串联 | 否 |
| D8-05 | **测试环境：中心主机就是本机** | 本机 macOS（arm64）及其 OrbStack。全部资源登记在 `~/Ext/work/orbstack/` 台账（规则《OrbStack 共享资源与台账》） | **中心主机（D2-20 的三个容器在本机落地）：**<br>• 第一段：compose 项目 `pepgent-soroi-e2e`（DIST-03、DIST-04），含 `store`、`mux`、`central`（omp-agent 镜像，加 remote CLI 和 LabStandIn，IMG-05）；<br>• 第二段：Stack `pepgent-central`（DEP-01），由隔离的 Komodo 从 `Pepgent/deploy` 部署，含 `lab-web`、`store`、`mux`（D2:60 D2-23）。<br>两段各用各的 store 卷，互不读写。<br>**寻址：** 一律用 OrbStack 容器域名 `<容器名>.orb.local`。Mac、默认 bridge 容器和 Slurm 机都已实测能经这个域名做 HTTP 访问（ENV-S:10、84）；Komodo 部署的容器也已实测（ENV-K:27、98）。`REMOTE_MUX` 与 store URL 都用这个域名，所以本机、远程和浏览器用同一个地址。<br>**远程后端：**<br>• Komodo：隔离的 Core 加 Periphery。Periphery 持有本机 OrbStack 的 Docker socket，只允许改动 Pepgent 自己命名的资源（ENV-K:9-11、22）；<br>• Slurm：`pepgent-slurm-test`，经 slurmrestd 和 JWT 访问，容器运行时是 Apptainer，机器里没有 Docker（ENV-S:7-13）。<br>**镜像来源：** 本地 CNCF Distribution 仓库 `pepgent-registry`（ENV-01）。它与 D2-13 选的镜像仓库同类（D2:50）。<br>**生命周期：** 环境是长期实例，各轮验收共用。每轮只按自己新建的 run id、agent id 和 remote run 判定与清理；store 不提供删除接口，记录保留，作为 D9 的证据 | **选定：** 测试环境放在本机 OrbStack，leader 已裁决（D2:59；LEDGER:207 R31）。网络层用 OrbStack 自带网络（D2:44 D2-07“本机 OrbStack 测试环境自带网络”）。<br>**朴素方案：** 中心服务直接跑在 Mac 进程里。那样远程容器要访问宿主网络，第二段也就不再是 D2-20 的容器形态。<br>**实质不同的方案：** 测试中心另起一台 OrbStack Linux 机器。它只多一层，换来的仍是同一个 Docker 引擎。<br>占位 EP2：Slurm 机的 Apptainer 能从 HTTP 仓库拉取镜像（`--nohttps` 或 registries 配置）。占位 EP3：Komodo 容器和 Slurm 作业能对 `*.orb.local` 建立 WebSocket；目前只验证过 HTTP（ENV-S:84）。两者都由 ENV-01、ENV-03 最先确认 | 技术 | 是 |
| D8-06 | **e2e 中每个 omp 进程的模型凭据** | 本机 `omp auth-broker serve` 使用现有凭据存储，`omp auth-gateway serve --clients=<file>`；每消费方独立 client token：central/lab-web/A0 容器由部署或 A0 脚本注入，Komodo 经 Variable，Slurm 经只给 pepgent 用户读的文件 | models.yml 随部署注入；网关 provider 为 `transport: pi-native`、baseUrl 指向 gateway、`auth: none`，由 `PEPGENT_GATEWAY_TOKEN` 构造 Authorization 请求头，不再用 apiKey 指向环境变量（D11-12）。gateway 只接 broker；client token 只含 digest 与模型授权、每消费方一个，provider 凭据留本机 broker，不进 tar、RunRequest.env、镜像。按顺序取首个可用模型：opencode-go/deepseek-v4.1-flash → openai-codex/gpt-6-luna → anthropic/claude-haiku-5-5，实际值记 verdict | 凭据拥有方与注入方式不变，不复制 ~/.omp 凭据、不另造 provider key。EP1 在三类位置完成真实补全，由 ENV-02 确认；不足上报，不改成复制秘密 | 技术 | 是 |
| D8-07 | **e2e 的节点库** | 新仓库 `Pepgent/lab-library`（D2:49 D2-12）的 `e2e` 分支与默认分支；Lab 的检出与每个根会话的编写 worktree 照 D2-12 | 节点库只放 §3 用到的节点：<br>• Program 节点：`calc`、`anneal`（多输出，带 `File`）、`slow_step`（可控时长，供介入与中止测试；运行时把标记文件写到运行它的 `central` 容器里的绝对路径 `/var/tmp/soroi-e2e/markers/<label>`，与 runner 的 cwd 无关，供 F03 判定节点进程是否启动）、`run_svm`/`run_rf`/`run_gp`/`run_knn`/`run_lr`（五路，参数子集不同）、`compare_scores`；<br>• Agent 节点：`review`；<br>• Human 节点：`ask_human`；<br>• `package.json` 和 lockfile，依赖一个纯 JS 包，用来证明 F14 的依赖还原（FC:260）；<br>• `.omp/agents/` 下放 Agent 体的定义（D5:92 D5-17）。<br>远程运行一律用 `soroi_eval.env` 覆盖（D4:65 D4-19），不另建远程专用节点 | **选定：** 用一个真实的 Lab 库，节点就是 F 流程的最小输入，版本和影响校验（F29）在真实 git 上验证。<br>**朴素方案：** 在 soroi 仓库里放测试夹具。这条路验证不到 D2-12 的“库是 git 仓库、Lab 确认后 commit”，也验证不到第二段 | 实现 | 否 |
| D8-08 | **驱动 H1：LabStandIn（RPC 驱动）** | `Pepgent/soroi` 的 `e2e/standin/`（TS，Bun），运行在 `central` 容器里，与 `dial` 同处（D3:62 D3-08“写方在本机启动 dial”） | 按 D3-07 执行写方生命周期：①声明写方 → ②`mux_open_generation` → ③本机 `omp-rpc-mux dial -- omp --mode rpc` → ④等 `ready` → 发 `prompt`，等 `prompt_result`（omp://rpc.md:121-122） → ⑦先结束各代再关写方（D3:61）。<br>同一份代码还提供读方连接、`mux_human_irc*` 帧（D3:66）、控制端点请求（D3:73），以及几个只读客户端：store、remote（`status`/`tail`）、Komodo `/read`、slurmrestd `/job/{id}`。<br>**提示词是脚本化的：** 每条 prompt 给出要调用的 `soroi_eval` 的完整参数，harness 断言实际发出的工具参数与脚本一致，然后只对系统行为下判定（D8-11）。<br>F02、F22 检验 AI 是否靠提醒逐步写，这两处的第 2 条 prompt 不给 atom 名。由于第 1 步是脚本写的，atom 名本来就在 AI 的上下文里，所以提醒本身另以 SOR-08 记下的提醒条目作直接证据（EP7） | **选定：** 用 omp 自带的 RPC，经 Mux 驱动真实 omp 与真实模型，路径与 Lab 一致（D7:64）。<br>**朴素方案：** 直接调用插件函数做单元测试。这不经过 omp、Mux 和 store，不算 runtime 验证（规则《没有端到端 runtime 验证 = 没做》）。<br>**实质不同的方案：** 在 Mac 上用 `omp -p` 批量跑。这不经过 Mux，也就测不到 Pepgent 的调用面 | 技术 | 是 |
| D8-09 | **驱动 H2：PTY 中的真实 omp** | 由 `exec_command` 驱动：A0 在新起的 IMG-01 容器里执行 `docker run --rm -it … omp`（加入 `pepgent-soroi-e2e` 网络；先检查 HOME 为空，再注入 env 与凭据，见 D8-03）；F20、F21 在 `central` 容器里执行 `docker exec -it … omp`；脚本在 `e2e/pty/` | 只用于 RPC 驱动覆盖不到的用户路径：<br>• A0 的逐类探针；<br>• F20 的作业取消（`proc://<id>/kill`）与 Agent Hub kill（SUB-RD:60 用 `x` 键）；<br>• F21 的 `omp --resume`（FC:344-351）。<br>PTY 里的 omp 是操作员在终端直接启动的 TUI 根会话：Agent Hub 的 kill 和 `--resume` 只有 TUI/CLI 入口（FC:332-355）。<br>**D3 补充条款（leader 席裁决，第 4 轮通过）：** 操作员在终端直接启动的 TUI 根 omp 自己就是它的写方，不经 Mux；它没有代，环境里没有 `MUX_GENERATION`、`MUX_TOKEN`，所以不注册 `eval:<session>` 控制端点，它持有的运行不经 Lab 介入（D3-19 的端点注册要出示这两个值，D3:73）。它启动的 soroi 子 agent 仍由插件作为写方经 dial 进入 Mux（D3-07、D3-09，D3:61、63），所以 F20、F21 的 `generation_up`/`generation_down` 仍是 Mux 上的权威事实。D2-08（D2:45）“进程一律由写方用 dial 启动”以本条款为修订，TUI 根会话是唯一例外。A0 探针中的根会话同样是 TUI 根会话，适用本条款<br>每条脚本先写定步骤和结束条件，跑完立即退出并关闭 PTY（规则《维护 omp 系列》） | **选定：** Agent Hub 和 `--resume` 是 TUI 与 CLI 的入口，RPC 没有对应命令（omp://rpc.md:147-163 中没有 kill 或 resume）。<br>**朴素方案：** 改用 RPC 的 `cancel_subagent`。它看不到 soroi 子 agent（SUB-RD:76），语义也不同。<br>占位 EP4：在 `docker exec -it` 的 PTY 中，Agent Hub 能用键盘操作 | 技术 | 是 |
| D8-10 | **驱动 H3：真实浏览器走 Lab 页面** | `Pepgent/Pepgent` 的 `apps/web/tests/e2e-lab/`：每个流程一份 runbook（`F31.md` 等）和一份事后核对脚本（`F31.check.ts`） | 浏览器是 `agent-browser` 驱动的真实 Chromium，以 Better Auth 登录的真实用户身份操作（D7:63），走 runbook 里每一步：进入页面、操作、提交、刷新核对。<br>runbook 的每个关键节点在三处核对：<br>① 页面上的结果，截图；<br>② `/api/lab/*` 的网络响应；<br>③ 权威方的副作用：`lab.sqlite` 的行（只读查询）、store 的 HTTP、Mux 的在线列表、remote 的 `status`。<br>被测对象是 `pepgent-central` Stack 里构建好的 host，不是 dev server（SMOKE:22-64） | **选定：** 规则要求 Web 走真实用户路径，用 `agent-browser` 操作浏览器，首页探活和单接口都不算（规则《没有端到端 runtime 验证 = 没做》）；仓库自己的冒烟手册也以“built host 加真实浏览器”为证据（SMOKE:3-7、52-54）。<br>**朴素方案：** 只调用 server function。那不是用户路径。<br>占位 EP6：本机有可用的 `agent-browser` | 技术 | 是 |
| D8-11 | **判定只看事实，不看模型措辞** | 全部 spec、runbook 与 check 脚本 | **断言的来源只能是权威方的事实：**<br>• store 的 HTTP/SSE 响应（D6:54-212；SSE 见 D6:204-212）；<br>• Mux 的在线快照与事件（D3:69）；<br>• RPC 的 `tool_execution_*` 帧和工具结果的结构化字段（D5:242-244 `SoroiEvalResult`）；<br>• remote、Komodo、slurmrestd 的记录；<br>• transcript 文件；<br>• `lab.sqlite` 的行；<br>• 页面截图上的数据。<br>**不能当作证据的：** 模型的自然语言输出、容器在运行、HTTP 200、文件存在。<br>**判据要写到下游状态：** 例如“这次调用在 graph 中的状态是 `Adopted`，`/compare` 中这一对是 `SameCapture`”，而不是“B 跑得更快”。<br>**模型偏离脚本时：** 只记录，不判失败，同一 prompt 至多重发一次；再偏离就换下一个模型（D8-06），并在 verdict 里注明 | **选定：** 被测的是 soroi，不是模型的稳定性（导师：“Assertions rely on model wording, container health, HTTP 200 … instead of downstream state”是走偏的信号）。<br>**朴素方案：** 用 mock 模型。那不是真实运行，也测不到提醒推动 AI 逐步写（F02）这类用户可观察结果 | 技术 | 否 |
| D8-12 | **证据格式与归档位置** | `Pepgent/PM` 的 `evidence/e2e/<campaign>/<F##>/`（R49 要求关键产物进 git，LEDGER:220）；`<campaign>` 取 UTC 时间戳加简述 | 每个流程目录下：<br>• `verdict.json`（§3.1 的 `Verdict` 类型）；<br>• `rpc.jsonl`：写方与读方收发的原始帧；<br>• `store/`：每次查询的 HTTP 响应原文，文件名是“方法-路径”；<br>• `remote/`：`status`、`tail` 输出，以及 Komodo `/read`、slurmrestd 的原文；<br>• `browser/`：第二段的截图与网络日志；<br>• `pty/`：PTY 录屏文本；<br>• `README.md`：复现命令。<br>秘密一律不进证据：token 只经 stdin 或环境变量使用，日志脱敏（ENV-S:25-34 的做法）。<br>verdict 记下各仓库的 commit、发行 tar 哈希、各镜像 digest、omp 版本、模型 id，以及每条断言的来源与观察值 | **选定：** 一个流程一份结构化 verdict，D9 可以机器读取（§5）。<br>**朴素方案：** 只保存日志。D9 拿日志无法按字段归类，第二轮也无法和第一轮对比 | 实现 | 否 |
| D8-13 | **交付顺序：组件连续开发完成后统一组装验收** | §4.1；D10-00/05/06；D16-09/10/13 | 各独立组件或互斥路径域完成代码与本仓检查，之后统一组装，依次 A0 → S1（F01–F30）→ E2E-21 → S2（F08–F31）→ D9（F32）。开发期不执行跨组件 e2e、不用 VS1/VS2/W1–W7 波次作启动门禁。spec/runbook 仅在其所测代码全部合入对应 main 后编写，时点见 D16-10；W-08 写 soroi e2e，W-10 写 E2E-20/21，阶段 B 不执行 | 保留 F01–F32 全范围，接受统一阶段才暴露接线问题，不以最薄 live 中间关卡阻塞组件开发 | 技术 | 是 |
| D8-14 | **切片粒度、档位、归属与交付** | §4.2；所属仓实现 issue 与 PR；PM Project；D16-09 | 每切片保留所属仓或互斥路径域与可观察结果，由负责该仓或互斥路径域的独立 tern 席位连续完成。切片 issue 作为范围、依赖与状态的索引；同一仓或同一互斥路径域内的关联切片，由所属席位连续实现，可以在同一个 PR 中用多个 `Closes #X` 合并提交；只有编译、类型、构建或调用契约上的真实依赖才需要等待；不要求每个切片单独开 PR，也不要求单独做 runtime 验收。VS1、VS2、W1–W7 只是映射 ID，不是波次。档位保留 low（锁定契约机械实现）、free（取证清单由 low 复核）、mid（本仓核心逻辑）、high（提示词/agent/skill/rule 设计及 D9 判断，须领导层审议）。依赖代码或产物合入其仓 main 即可开工，不等上游跨组件 runtime。集成按 D10-06 在全部实现和测试代码合入后统一执行；业务功能与本仓编译、类型与基础检查不删减。模型、席位、路径与测试编写时点按 D16-09/10 | 按仓/域归属，不按横跨多仓的 F 流程争写文件；撤开发期 live 锁，不缩验收 | 实现 | 否 |
| D8-15 | **D9 的方法：从真实运行中盘点点、线、面** | §5；产物是 `Pepgent/PM` 的 `evidence/decisions/D9-gap.md` | 输入：<br>• §3 全部 verdict；<br>• 第二段每页 `lab.page.read` 和 `lab.catalog.read` 的线数据录制；<br>• 18 个字段对应契约的叶子字段清单（SNAP:24-58）；<br>• D7 的字段表与占位（D7:87-106、280-291）；<br>• D8-16 的清单。<br>按 §5 的规则归类，每一项都引用证据路径 | **选定：** 先有证据再归类，对象就是两段之差（D2:62；FC:509-518）。<br>**朴素方案：** 按原型页面凭印象列缺口。导师把“speculative architecture”列为走偏信号 | 意图 + 技术 | 是：U23 |
| D8-16 | **D2–D7 已定、但任何 F 流程都走不到的部分：不进 MVP 验收，原样列入 D9 输入** | §5.4 的清单 | 清单（每项附出处）：<br>• remote 的模板写入操作（D2:46 D2-09）；<br>• 容器页的 Komodo Build 流水线与镜像 tag 读取（D2:50 D2-13；D7:73 D7-13）；<br>• 集群健康与容量（D7 P4）、交互 shell（P6）、接入向导（P7）、仪器事件（P8）、资源计量（P9）、邀请邮件（P11）（D7:283、285-289）；<br>• k8s 后端（REM-RD:10；FC:257 用户提到 k8s，但没有 F 流程去走它）；<br>• NetBird 网格（D2:44 D2-07；测试环境用 OrbStack 网络，D2:59）；<br>• `Pepgent/iac` 的中心主机 VM（D2:58 D2-21）。<br>只有 F 流程直接要用的才实现，例如 F14 要模板身份（REM-05）。<br>**P5 作业列表分两部分：**<br>• 只读部分进入 MVP：算力页从 remote 的运行记录列出作业（新增只读操作 `remote runs`，REM-06），再按 run id 读 `status` 和 `tail`。F17 的 S2 和 F31 第 ④ 步要求算力页显示作业与日志尾部，这是用户流程（FC:299、499），D8-01 不允许缩减。D7-12、D7-18 已按此修订（D7:72、78、284）；<br>• 控制部分不进入 MVP：`restart`、`destroy`、`new_sandbox`（D7:72）列入 D9 输入 | **选定：** 守住 D8-01 的“用户说过的流程”；对用户没要求的流程，既不擅自扩大成 MVP 门槛，也不丢弃，交给 D9 判定是“面”还是“线”。<br>**朴素方案：** 全部实现。这超出 F 流程，属于导师所说“adjacent work to stay out of”。<br>**实质不同的方案：** 直接忽略。U23 要求的盘点会漏项 | 意图 | 是 |

### 2.1 新增占位（先假定能工作，由所列切片最先确认）

| 占位 | 假定 | 最先确认的切片 |
| --- | --- | --- |
| EP0 | installer 用 omp 的公开机制放置的规则和设置能生效（同 D2:176） | DIST-02 |
| EP1 | auth broker、gateway 与 client token 在容器、Komodo 部署、Slurm Apptainer 三类位置都能完成一次真实补全 | ENV-02 |
| EP2 | Apptainer 能从本地 HTTP 仓库拉取镜像 | ENV-01 |
| EP3 | Komodo 容器与 Slurm 作业能对 `*.orb.local` 建立 WebSocket，并能 PUT 大于 100 MiB 的 tar | ENV-03 |
| EP4 | 在 `docker exec -it` 的 PTY 中，Agent Hub 能用键盘操作 | E2E-02 |
| EP5 | Slurm 的 JWT 由本机 `token.sh` 签发后写进 central 容器的 remote 凭据，有效期覆盖一轮验收；过期就重新签发（ENV-S:23） | ENV-04 |
| EP6 | 本机有可用的 `agent-browser` | E2E-20 |
| EP7 | 在 addBeforeModelCall 构造候选时，经 obfuscator 注入可见未消费提醒，并写 transcript `customType:"soroi.unconsumed-reminder"`、数据仅 `{text}`；最终文本相同，空集不注入不记。条目之后首个 assistant 条目对应候选，不能据此证明 provider 实际收请求（D11-37） | SOR-08 |

## 3. 验收矩阵（F01–F32）

**段：** A0、S1、S2，见 D8-02。

**环境：**

- L：第一段 compose，包含 store、mux、central；
- K：L 再加隔离的 Komodo；
- S：L 再加 Slurm 机；
- P：第二段 `pepgent-central` Stack，加浏览器；
- PK、PS：P 分别加 Komodo、Slurm。

**驱动：** 第一段的 spec 在 `Pepgent/soroi` 的 `e2e/s1/`，PTY 脚本在 `e2e/pty/`；第二段的 runbook 在 `Pepgent/Pepgent` 的 `apps/web/tests/e2e-lab/`。

**证据：** 下表只列每个流程特有的证据，通用部分见 D8-12。

| 流程 | 通过判据（可观察的下游事实） | 段 | 环境 | 组件 | 驱动 | 特有证据 |
| --- | --- | --- | --- | --- | --- | --- |
| F01 定制加载、根 atom、`stop`（FC:51-58） | ① A0 通过（D8-03）。<br>② 根 omp 只装了发行 tar，以 Mux 写方 dial 启动。脚本 prompt 调用 `soroi_eval{mode:"formal", code:"const temp_2200c = 2200\nstop(temp_2200c)"}`，这一步以 `POST /runs/steps{run:{kind:"open"}}` 提交；随后根会话的 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次，调用 `POST /runs/{run}/end`，store 返回 `Ended{seq}`（D6:33、115-118）；工具结果为 `runEnded: true`。<br>③ `GET /runs?state=Ended` 含这次运行，它的 `holder` 等于根会话 `get_state.sessionId`。<br>④ `GET /runs/{run}/graph`：有一个 `Root temp_2200c = 2200`，`unconsumed` 为空。<br>⑤ `/runs/{run}/stream?after=0` 的序列依次是 `run_started`、`step_committed`、`atom_stopped`、`run_ended`（D6:48） | A0、S1 | L | IMG-01、DIST-01/03、MUX-01/02/08、STO-01/02/03/12、SOR-01/02/03 | `pty/a0-install.sh`、`s1/f01.spec.ts` | 发行 tar 哈希；`ls -A $HOME` 输出；`POST /runs/{run}/end` 的请求与 `Ended{seq}` 响应原文；graph 与 stream 原文 |
| F02 未消费提醒推动 AI 逐步写（FC:67-74） | ① 首步提交后 store state.unconsumed 非空。② 第二 prompt 只说继续消费并 stop，不给名字；之后 eval code 引用前一步未消费名。③ 各步 step_committed，最后根 supervisor 确认无活动 eval/未释放批次再 /end，由 store 另写 run_ended。④ 图边来自已提交 atom。⑤ 第二 prompt 对应模型调用候选构造时，SOR-08 经 addBeforeModelCall、obfuscator 写下 `soroi.unconsumed-reminder {text}`，atom 集等于当时可见 state.unconsumed，行式按 D5-13；按条目之后首个 assistant 条目对应，不使用 phase/ordinal，不证明 provider 收请求 | S1 | L | SOR-08、STO-03 | `s1/f02.spec.ts` | state 快照；提醒原文及 transcript 顺序；工具参数 |
| F03 三语句与约束（FC:79-93） | ① 脚本提交 9 段违规代码：loop、`map`、对象字面量、数组、作为参数的魔法值、重名、类型不符、嵌套调用、解构不穷尽。每段的工具结果是 `ok:false`，`CheckError.kind` 依次为 `statement_form`、`statement_form`、`statement_form`、`statement_form`、`statement_form`、`duplicate_name`、`type_error`、`statement_form`、`destructure_mismatch`（D5:260-274）。期间 `/runs/{run}/stream` 的最大 seq 不变。每段违规代码里都另放一条 `slow_step(label_<段号>)`，它一旦运行就会写下标记 `/var/tmp/soroi-e2e/markers/<label>`（D8-07）：9 段提交后，`central` 里这个目录没有这 9 个标记，Mux 的 `/agents` 也没有新增 agent，证明检查失败时不启动任何节点进程（FC:84）。<br>② 合法的一步含两条互不依赖的 `slow_step` 调用和一次多输出解构。这两条调用的标记都存在（阳性对照，证明标记探针本身有效）；`/runs/{run}/activity` 中这两次调用的区间相交（D6:38），解构出的每个名字都是独立的 `Root`/`Call` 输出 | S1 | L | SOR-04/05、STO-06、LIB-01 | `s1/f03.spec.ts` | 9 份 CheckError 原文；标记目录前后清单；activity 原文 |
| F04 dry run 与钉住，零写入（FC:99-113） | ① `dry_run` 的一步含一条未钉住的 `calc`，以及一条全部输出都按 atom 名钉住的 `review`（D5:84）。`CallReport.outcome` 分别是 `ran` 和 `pinned`。<br>② 执行前后，`/runs` 的条数、`/runs/{run}/stream` 的最大 seq、`/runs/{run}/graph` 都不变。dry run 产出文件的哈希，`GET /objects/{h}` 返回 404。Mux 的 `/agents` 没有新增 agent。<br>③ 在 `formal` 参数里带 `pins`，被 schema 拒绝（D5:83） | S1 | L | SOR-04/05、SOR-20 | `s1/f04.spec.ts` | 前后 seq 与 objects 的 404 |
| F05 原样提交正式运行（FC:115-125） | 把 F04 那一步代码原样以 `formal` 提交：`step_committed` 事件里的 `code` 与 dry run 的代码逐字节相等；所有调用的 outcome 是 `ran` 或 `reused`，其中 `review` 真的作为 Agent 运行并完成捕获（graph 节点 `body:"Agent"`）；产出对象 `GET /objects/{h}` 返回 200 | S1 | L | SOR-02/03/04、SOR-11 | `s1/f05.spec.ts` | 两份代码的哈希 |
| F06 Program 捕获（FC:131-143） | `anneal` 正式运行后，graph 节点满足：`body:"Program"`，`GET /versions/{version}` 返回的 `NodeVersionRecord` 带 commit 与 lockfile，其中 `bundle` 对象经 `GET /objects/{bundle}` 取回后的 sha256 等于节点的 `version`（D6:49、101-104、196）；输入按位置核对：graph 中指向这个 `anneal` 节点的边 `edges[].to.input`（位置 0、1…）给出各输入的 atom 名，这些 atom 的值（`Root.value` 或上游 `Call.outputs[].value`）等于脚本给出的输入（D6 `RunGraph`）。测试不直接读 capture 身份。`File` 输出 `GET /objects/{h}` 的 sha256 等于 `h`，标量输出等于节点代码按输入应得的值 | S1 | L | SOR-06、STO-02/11、LIB-01 | `s1/f06.spec.ts` | 版本记录与对象哈希 |
| F07 Agent 捕获经 `soroi_return`（FC:145-158） | ① 调用 `review` 时，`/agents/events` 出现一个新 agent 的 `generation_up{where: local}`。子 agent 的 RPC 流里有 `soroi_return` 的 `host_tool_call`。graph 节点为 `body:"Agent"`，`transcript` 等于子 agent 的 sessionId，返回的 `File` 已入对象库。<br>② 脚本让子 agent 尝试调用 `soroi_eval`：子 agent 的流里没有这次 `tool_execution_start`，transcript 记录该工具不可用（D5:81）。<br>③ 子 agent 以纯文本结束一轮，不调用交回工具：该调用的 `CallReport.outcome` 是 `failed`；这一步不提交，`/runs/{run}/stream` 的最大 seq 不变，graph 里没有这个调用节点（D5:80） | S1 | L | SOR-09/10/11、MUX-03/04 | `s1/f07.spec.ts` | 子 agent 的帧与 transcript 片段 |
| F08 Human 捕获（FC:160-170） | S1：由 LabStandIn 驱动正式运行 ask_human；LabStandIn 读取在线根会话的 `{"method":"writers"}`，再逐个请求 `{"method":"slots"}` 找到带 request 的 awaiting_human，不唤醒 parked 会话；随后直接向持有槽位的 `eval:<writerSession>` 发送 `{"method":"answer","handback":HumanHandback}`，成功回复 `{"ok":true,"value":null}`。answer 后 graph 状态 Human、body Human，该位置有 human_handback 无 call_aborted。下一模型调用候选构造时的 `soroi.unconsumed-reminder {text}` 中该 atom 带 `← human`，最终文本与注入相同，按 transcript 顺序对应候选，下一 eval 引用它（D11-37）。S2：真实 Lab 的实验详情页发出 `intervene.answer{conversation,writerSession,slot,handback}`，由 Lab 映射到同一 `eval:<writerSession>` 控制端点，结果相同 | S1、S2 | L、P | SOR-13、MUX-06、LAB-08、WEB-03 | `s1/f08.spec.ts`、`e2e-lab/F08.md` | 槽位快照；提醒条目；截图 |
| F09 落盘、按运行列出、装载旧产物（FC:176-188） | S1：两次运行后，让写方按 ⑤⑦ 结束根会话；新开一个根会话后，`/runs` 能列出两次运行，graph 与对象都可读。在新运行里引用旧运行的 atom 名，返回 `unknown_atom`。<br>S2：数据集页按运行列出产物；`discussion.load` 之后，`lab.sqlite` 的 `discussion_context` 有这一行，会话的下一次 `host_tool_call lab_open_artifact` 拿到的字节与对象哈希一致（D7:67） | S1、S2 | L、P | STO-03、SOR-05、LAB-05、LAB-11a、WEB-04 | `s1/f09.spec.ts`、`e2e-lab/F09.md` | 两次会话的 sessionId |
| F10 时间轴与 `at=k` 回看，无重放（FC:190-201） | 一次运行有 3 步，最后 `stop`。对每个 k，`graph?at=k` 的节点集合等于序号不超过 k 的已提交事实。所有回看查询期间，stream 的最大 seq 不变，Mux 的 `/agents/events` 没有新事件，remote 也没有新 run。S2：实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合 | S1、S2 | L、P | STO-03/05/06、WEB-03 | `s1/f10.spec.ts`、`e2e-lab/F10.md` | 每个 k 的 graph |
| F11 按身份复用（FC:203-213） | 运行 A 中执行 `const y1 = calc(x1)`；运行 B 中执行 `const y2 = calc(x2)`，`x2` 与 `x1` 值相同、名字不同。B 的这次调用：stream 里是 `call_adopted`，graph 中的状态是 `Adopted`（D6:168）；`GET /compare?a=A&b=B` 中 `calc` 这一对是 `SameCapture`，即身份相同（D6-13）。测试不直接读 capture 身份。不以 activity 中有没有区间作判据：activity 按 D6-10 列出每个调用的原始时刻（D6:38） | S1 | L | SOR-02/06、STO-03 | `s1/f11.spec.ts` | stream 原文；compare 原文 |
| F12 一值多分支、反查、检索（FC:215-226） | ① 一步内 `film` 被 5 个调用消费：graph 上有 5 条从 `film` 出发的边。<br>② `film` 是一个 `File` 根 atom，`hash` 取 graph 中 `Root.value.content`，`GET /values/{hash}/runs` 列出用到它的运行（D6:67、194）。<br>③ 根 atom 用中文字符串值：`/search?q=<其中的中文子串>` 命中这个值和步的代码（D6:36）。<br>S2：数据集页显示“被引用于”的运行 | S1、S2 | L、P | STO-08、WEB-04 | `s1/f12.spec.ts`、`e2e-lab/F12.md` | search 原文 |
| F13 跨运行比较（FC:228-237） | R2 改了 R1 的一个根值。`/compare?a=R1&b=R2`：上游配对为 `SameCapture`，受影响的路径为 `Changed`，并逐字段给出两边的值。另构造两个同函数候选，返回 `Ambiguous`（D6:41）。S2：实验详情页的对比视图与之一致 | S1、S2 | L、P | STO-07、WEB-03 | `s1/f13.spec.ts`、`e2e-lab/F13.md` | compare 原文 |
| F14 远程 Program（Komodo）（FC:243-260） | 正式运行带 `env:{<产出名>:"soroi-komodo"}` 的 `anneal`：<br>• 运行期间，Komodo `ListStacks` 能看到以 remote run id 命名的 Stack，`docker volume ls` 能看到同名卷；<br>• `remote status` 变成 `ended` 之后，这一步才提交；<br>• graph 中这个调用节点的 `env` 是 `{kind:"remote", template:"soroi-komodo", remoteRun}`，`remoteRun` 等于运行期间 `ListStacks` 里看到的那个 run id（D6:69、172）。“模板换了镜像后不再复用”不在本行判定，由 SOR-07 的验收负责；<br>• `GET /versions/{v}` 的 lockfile 与 LIB-01 的一致；<br>• 产物已入对象库，标量输出等于节点代码按输入应得的值（同 F06），证明远程执行结果正确，而不只是有产物；<br>• 结束后，Stack 和卷都已删除（`ListStacks`、`docker volume ls` 中都没有）。<br>S2：实验详情页上该节点显示模板与 remote run | S1、S2 | K、PK | SOR-06/07、SOR-17a、STO-04、REM-04/05、IMG-01/02/05、DEP-02、DIST-04 | `s1/f14.spec.ts`、`e2e-lab/F14.md` | Komodo Update 原文；卷清单 |
| F15 远程 Program（Slurm）与 dry run（FC:262-274） | body 与步骤镜像均为 OCI 引用（tag/digest），脚本以 `docker://<引用>` 原样交 Apptainer；templates 在读取目录时用 Registry::resolve 给 identity.image，不用 SIF 路径（D11-10）。① dry_run 在 soroi-slurm 跑 calc，remote status 给 slurmrestd id，作业为 COMPLETED。copy-in→boot runner→copy-out；eval 返回前读取 `/transfers/{t}/volumes/{position}/files/soroi/result.json` 得正确值并出现于 CallReport，返回后同 URL 404、store seq 不变。t/position 取 remote run 记录 RunRequest.output，run id 取本次 remote run 返回，不依赖 runs。② 同代码 formal 后 graph env 为 remote/soroi-slurm/本次 remoteRun，产物入对象库。③ remove 后作业目录删除。连通或提交成功本身不证明本流程 | S1 | S | REM-01/02/03/05、IMG-03、ENV-04、SOR-17a/17b | `s1/f15.spec.ts` | slurmrestd 原文；拷回卷；脚本 OCI argv |
| F16 远程 Agent（FC:276-291） | 正式运行 `review`，`env` 为 `soroi-komodo`：<br>① `/agents/events` 中该 agent 的 `generation_up.where` 是 `remote{runId}`；<br>② 运行中，读方 `GET /agents/{id}/files?dir=soroi-batch` 列出已改名的 `.parquet` 文件；<br>③ 远程子 agent 被脚本要求调用 `soroi_eval`、`soroi_task` 时，两个工具都不可用（D4:62）；<br>④ 提交后，`/runs/{run}/progress` 返回来自这些批次的行（D4:61）；<br>⑤ 中心 session 目录下有 `<id>.jsonl`，内容包含远程那一代的轮次（D4:59），`history://<id>` 可读；<br>⑥ Stack 与卷已删除 | S1 | K | SOR-18/19、MUX-07、STO-10、DEP-02 | `s1/f16.spec.ts` | 批次文件列表；transcript 行数前后对比 |
| F17 远程状态与日志尾部、运行中进度、中止（FC:293-303） | ① 远程 `slow_step` 运行中：`remote status` 为 `running`，`remote tail` 返回 body 的输出。在途结果不能被复用：A 的这次调用还在运行时，另一个根会话的运行 B 以同样的输入和同样的 env 正式运行同一调用，B 的这次调用真实执行（stream 中是 `call_started`/`call_ended`，不是 `call_adopted`）；两者都提交之后，`GET /compare?a=A&b=B` 中这一对是 `SameCapture`，说明 B 不复用只因为 A 当时尚未提交。测试不直接读 capture 身份。<br>② 远程 `review` 运行中，读方能拉取批次文件（同 F16 ②）。<br>③ LabStandIn 对根端点发 `abort{run}`：远程 Program 的 `remote status` 为 `aborted`/`ended`，容器已停止；远程 Agent 按 D6-15 的顺序停止，transcript 已回到中心；store 写入 `call_aborted`、`run_aborted`。<br>S2：算力页显示作业与日志尾部（D7:72） | S1、S2 | K、PK | SOR-14/20、REM-04、LAB-12、WEB-06 | `s1/f17.spec.ts`、`e2e-lab/F17.md` | status 序列；tail 原文 |
| F18 运行结束后浏览工作目录（FC:305-314） | F14 那次调用 remote remove 后，`GET /volumes/{run}/{step}/{pos}` 仍列出 soroi/、in/、work/ 下全部 regular 文件，不表示 symlink 与空目录；按 D11-24 的来历发布规则读取。`/files/{path}` 返回调用产生的文件内容。S2：runner workspace 列出并预览这些文件 | S1、S2 | K、PK | STO-04、WEB-03 | `s1/f18.spec.ts`、`e2e-lab/F18.md` | volume 清单与文件内容；页面 |
| F19 subagent 进程、IRC 往返、steer 与排队（FC:320-330） | ① `soroi_task` 派出 `Alpha`、`Beta`：Mux 上有两个 `generation_up{where: local}`。<br>② `Alpha` 的 transcript 中有发给 `Beta` 的 IRC，`Beta` 的 transcript 中有这条消息和回复，`Alpha` 的 `wait` 拿到了回复。<br>③ `Alpha` 执行 `slow_step` 期间，主 agent 发来的消息在该轮结束之前就出现在 `Alpha` 的 transcript 里（steer）；同一时刻 `Beta` 发来的消息出现在该轮之后（排队）。<br>④ 向 `agent://all` 广播后，所有在线 agent 的 transcript 都有这条广播 | S1 | L | SOR-09/12、MUX-03/04 | `s1/f19.spec.ts` | 三份 transcript 片段与时间戳 |
| F20 停驻、唤醒死会话、kill 与复活（FC:332-343） | PTY 根会话，`task.agentIdleTtlMs` 由设置覆盖调短：<br>① 超时后 Mux 出现 `generation_down`，进程退出，`<Alpha>.jsonl` 仍在；<br>② 再发消息，出现新的 `generation_up`，会话文件是同一个，行数增加；<br>②′ 作业取消：`Alpha` 跑 `slow_step` 期间，根会话对它当前的作业执行 `proc://<id>/kill`（取消作业只中止当前这一轮，agent 仍登记，SUB-RD:15；FC:337）。`Alpha` 的 transcript 中这一轮被中止；Mux 没有 `generation_down`，也没有新的 `generation_up`；再发一条消息，`Alpha` 在同一代里回复；<br>③ 在 Agent Hub 中对 `Alpha` 按 `x`：生成 `<Alpha>.jsonl.tombstone`，出现 `generation_down`；<br>④ 再发消息：tombstone 消失，出现新一代，`Alpha` 回复 | S1 | L | SOR-09、SOR-12、E2E-02、CUS-04 | `pty/f20.sh` | PTY 录屏；文件列表前后对比 |
| F21 `--resume` 找回，只读查看不唤醒（FC:344-355） | PTY：退出 omp，用 `omp --resume` 重新打开。Agent Hub 列出 `Alpha` 为 `parked`。`read history://Alpha` 期间，Mux 没有 `generation_up`。再发消息，出现 `generation_up`，回复追加在同一个 jsonl 里 | S1 | L | SOR-09、E2E-02 | `pty/f21.sh` | `/agents/events` 原文 |
| F22 一步多路并发与汇总（FC:361-376） | ① 一步 5 条 run_* 先 dry 再 formal，activity 至少两区间相交，5 调用同一 step_committed、无单独提前提交。② 下一 prompt 不给名，eval 把 5 产出传 compare_scores。③ 工具无 fork/fork_task。④ 第②步模型调用候选构造时的提醒列全5产出和来源签名，按 D11-37 记录 `{text}`、obfuscator 最终文本与 transcript 顺序，不证明实际 provider 发送。⑤ 主 agent 派 N=3 worker 前保留至少一个自己可见未消费 atom；一次 soroi_task 带 purpose，worker 同运行各写一步，末 worker 含 slow_step 最晚交回。⑥ 读方看到前N−1交回、末个未交回时，standin 向主 agent 发不调工具 prompt 触发候选；该候选提醒有保留 atom、无这批 worker 产出，即使步已入 store。⑦ 读方看到末个 soroi_return 被接受后，下一候选提醒一次列全批产出、组头 purpose；只用读方帧与提醒判定。⑧ 各 step.session 是各 worker 而非根。⑨ 另开两 worker 小批，先交回者将产出全 stop，末个交回前已提交未消费为空；末个也全 stop。末个交回前 store stream 无 run_ended、末步仍入同 Open；释放后根 /end 得 Ended{seq}。判据仅 store 事实，不读 soroi.eval-lifecycle | S1 | L | SOR-05/08、SOR-12、STO-06、LIB-01 | `s1/f22.spec.ts`（E2E-13 收口） | activity；提醒全文与 transcript 顺序；读方 soroi_return 帧；step_committed；工具清单 |
| F23 GUI 改值：中止在途、Human 替代、通知 AI（FC:382-393） | S1：`slow_step` 在途时，对它所在的槽位发 `takeover`。本机 runner 进程消失；这一步提交时带 `call_aborted`、`human_handback`；该调用在 graph 中的状态是 `Human`，stream 中这一位置依次有 `call_aborted` 与 `human_handback`（D6:42、48）。同一步的下游调用消费了人给的值，工具结果中该调用为 `human`。被替代调用的另一个产出留到下一步消费：下一模型调用候选构造时，SOR-08 写 `soroi.unconsumed-reminder {text}`，该产出一行写作 `← human 替代 fn(参数)`，与 F08 主动请求的 `← human` 区分；按 D11-37 的 obfuscator 最终文本和 transcript 顺序对应候选，不证明 provider 收请求。<br>S2：在实验详情页改值，`lab.command` 的结论与 store 上的事实与 S1 一致 | S1、S2 | L、P | SOR-13/14、MUX-06、LAB-08、WEB-03 | `s1/f23.spec.ts`、`e2e-lab/F23.md` | 进程列表前后对比；stream 原文；提醒条目 |
| F24 改参数或函数体，派生运行（FC:395-405） | 分 `InFlight` 与 `Committed` 两种：<br>① 派生后有新运行 R'，`derivedFrom` 指向 P。P 尚未结束时，P 的 stream 中出现 `run_aborted`，P 的 `graph.state` 为 `Aborted`；P 已结束时，P 的 stream 不追加 `run_aborted`，`state` 仍是 `Ended`（D6:44、178、206）。测试不依赖 store 返回给插件的 `parentAborted`。P 原有的 `graph?at=<派生前 seq>` 与派生前完全相同。<br>② R' 中上游调用是 `call_inherited`，graph 中的状态是 `Inherited{sourceRun = P, sourceStep, sourcePosition}`（D6:169；不以 activity 有无区间判定）；被改的调用以新输入或新版本执行。<br>③ 随后根会话收到带人类来源的 IRC，开始新的一轮（D5:91）。<br>`ChangeVersion` 的新函数体，S1 由脚本直接 commit 进 `lab-library`；S2 走 `library.apply`。<br>S2 两条子路径都要走：在实验详情页改参数派生（`ChangeInput`），以及在节点库页暂存改动后 `library.apply`、再从实验详情页按新版本派生（`ChangeVersion`）；两次派生的导航都能显示“派生自” | S1、S2 | L、P | SOR-15、STO-09、LAB-08/10、WEB-03 | `s1/f24.spec.ts`、`e2e-lab/F24.md` | 派生前后两份 graph |
| F25 经 IRC 接管 subagent（FC:407-417） | S1：`Alpha` 忙时，读方连接发 `mux_human_irc` 两条，对第一条 `edit`，对第二条 `withdraw`。`Alpha` 的 transcript 只出现编辑后的第一条，来源是 `human:<principal>`，位置在该轮之后（D3:66）。`Alpha` 空闲时再经读方发一条 `mux_human_irc`：`Alpha` 立即开始新一轮（Mux 读方流里有 `agent_start`），transcript 里有这条消息，来源是 `human:<principal>`（FC:412）。<br>S2：对根会话（Lab 的待投递表 `human_irc_queue`）和子 agent 各做一次，结果相同 | S1、S2 | L、P | SOR-16、MUX-05、LAB-04/08、WEB-03 | `s1/f25.spec.ts`、`e2e-lab/F25.md` | transcript 片段；`human_irc_queue` 行 |
| F26 GUI 读运行 DAG、实时订阅、观察任意 agent（FC:423-432） | S1：`graph` 加 `stream` 续订，每次提交恰好推送一组事件。读方能收到子 agent 的全部 stdout，但发出 `prompt` 会被拒绝（D3:60）。<br>S2：实验详情页的节点集合等于 `graph` 的节点集合。新提交一步时，页面在不刷新的情况下出现新节点（前后截图）。点开 Agent 节点，能看到它的工具调用流 | S1、S2 | L、P | STO-05、MUX-03、LAB-07、WEB-03 | `s1/f26.spec.ts`、`e2e-lab/F26.md` | 两张截图；SSE 原文 |
| F27 未走完的运行与草稿画布（FC:434-444） | S1：一次未结束的运行，`graph.unconsumed` 非空。dry run 前后 seq 不变。<br>S2：实验详情页画出未消费的出口。流程编辑器保存草稿后，`lab.sqlite` 的 `draft` 表有这一行，store 中没有任何新运行（D6:40） | S1、S2 | L、P | STO-03、LAB-11b、WEB-04 | `s1/f27.spec.ts`、`e2e-lab/F27.md` | `draft` 行；`/runs` 条数 |
| F28 节点库：持久化、import 传参、GUI 列出（FC:450-460） | S1：新开的根会话按名字调用 `calc`，调用成功。<br>S2：节点库页列出 LIB-01 的全部节点，参数、默认值、返回字段、体、默认环境都与源码一致（D7 P1） | S1、S2 | L、P | LIB-01、LAB-10、WEB-05 | `s1/f28.spec.ts`、`e2e-lab/F28.md` | 导出原文与源码对照 |
| F29 修改前的影响校验与版本（FC:462-471） | S1：`/functions/calc/usage` 列出用到它的运行。修改 `calc` 并 commit 后，再正式运行，得到新版本哈希；旧捕获的 `GET /versions/{旧}` 不变。<br>S2：`library.stage` 之后，影响视图列出这些运行；`library.apply` 生成 commit，并把检出快进 | S1、S2 | L、P | STO-11、LAB-10、WEB-05 | `s1/f29.spec.ts`、`e2e-lab/F29.md` | 两个版本记录；git log |
| F30 运行事件驱动自动化与审批（FC:477-487） | S1：`/stream/lifecycle` 推送 `run_started` 与 `run_ended`，带运行 id 与 holder。<br>S2：规则 A-01 命中，生成一条 `automation_run`，开出 origin 为 `Automation` 的会话，结论写回关联讨论。设为“需批准”的规则停在 `waiting`，在浏览器中点击批准后才开会话（D7:70） | S1、S2 | L、P | STO-05、LAB-09、WEB-05 | `s1/f30.spec.ts`、`e2e-lab/F30.md` | `automation_run` 行；截图 |
| F31 Pepgent 调用核心，走通全链路（FC:493-507） | 浏览器中按顺序完成 FC:496-501 的六步：<br>① 登录，在讨论页装载历史产物，发出目标；<br>② 由讨论启动实验：`experiment.start` 建 `pending_launch`，免审批为 `sent`、需审批为 `awaiting_approval`，`experiment.approve` 之后向原讨论会话投递草稿；`run_started` 后写 `experiment_ext.draft` 并删除这条 `pending_launch`（D7:66、161-162、250-254）；<br>③ 会话依次 dry run、正式运行，节点包括本机 Program、远程（Komodo）Program 和 Agent；<br>④ 实验详情页与算力页实时显示 DAG、subagent 流、容器日志尾部；<br>⑤ 做一次 F23 和一次 F24；<br>⑥ 运行结束后，数据集页出现产物及来源，runner workspace 可浏览，A-01 的复盘写回原讨论。<br>每一步都按 D8-10 三处核对。并且 Lab 进程只有 D8-04 的四条线 | S2 | PK（可选加 PS） | 全部 LAB、WEB、DEP | `e2e-lab/F31.md` | 全程截图与网络日志 |
| F32 点、线、面报告（FC:509-518） | `D9-gap.md` 按 §5 完成：18 个字段都有结论；每一项“点、线、面”都引用 `evidence/e2e/…` 下的证据路径；D8-16 的清单逐项归类。报告经领导小组表决（LEDGER:59 U12） | — | — | D9-01/02/03 | §5 | D9 本身 |

### 3.1 `Verdict` 结构

```ts
type Segment = "A0" | "S1" | "S2";
type Env = "L" | "K" | "S" | "P" | "PK" | "PS";
type Source =
  | { kind: "store"; method: string; path: string }
  | { kind: "mux"; path: string }
  | { kind: "rpc"; agent: string; frame: string }                 // 帧在 rpc.jsonl 中的行号
  | { kind: "remote"; op: "status" | "tail" | "templates"; run?: string }
  | { kind: "komodo"; request: string }
  | { kind: "slurm"; path: string }
  | { kind: "transcript"; file: string; lines: [number, number] }
  | { kind: "labdb"; query: string }
  | { kind: "browser"; screenshot: string; network?: string };
type Assertion = { id: string; claim: string; source: Source; expected: string; observed: string; pass: boolean };
type Deviation = { prompt: number; model: string; note: string };   // D8-11：模型偏离脚本的记录
type Verdict = {
  flow: `F${string}`; segment: Segment; env: Env;
  startedAt: string; endedAt: string;
  build: { commits: Record<string, string>; release: string; images: Record<string, string>; omp: string; model: string };
  runs: string[]; agents: string[]; remoteRuns: string[];          // 本次新建的身份，D8-05 按它们清理和判定
  assertions: Assertion[]; deviations: Deviation[];
  result: { kind: "pass" } | { kind: "fail"; failed: string[] };
};
```

## 4. 实现计划

### 4.1 统一 e2e 的执行顺序

开发期按 D16-09/10 的十席矩阵完成各组件及已具备编写条件的 spec/runbook，不设跨组件 live 开工锁，不执行每波 e2e。

统一阶段入口（D10-06）：全部实现切片与 E2E-* spec/runbook/check 代码合入各自 main；实现切片有本仓真实入口局部观察；镜像、release tar、部署声明与环境已存在。三个插件集成测试迁仓前按 `packages/omp-soroi/test` 原位置计入，迁后在 soroi e2e。

| 顺序 | 工作 | 范围与观察 |
| --- | --- | --- |
| 1 | A0 | 干净 HOME 安装完整定制，逐类验证扩展、agent、技能、规则、设置，DIST-02 全五类 |
| 2 | S1 | LabStandIn、PTY、store/Mux/remote 真实链路，F01–F30 |
| 3 | E2E-21 | 真实 Better Auth → discussion.create/prompt → Lab 写方 dial → store 运行 → lifecycle 绑定 experiment_ext → 目录/实验页读取 Ended 图与 run 变更；server-function 层核对 |
| 4 | S2 | 接真实 Lab 与浏览器，F08–F31；页面、接口、权威下游三处核对 |
| 5 | D9 | 基于上述全部证据分析 F32 点、线、面，领导小组逐项表决 |

原 live issue 均为此统一阶段的工作项，不作为任何组件开发前置。F 流程、切片业务义务和证据结构不缩减。


### 4.2 切片表（按所属仓库分组）

各列含义：

- **依赖：** 编译、类型、构建或调用契约上必需的代码/产物；代码合入其仓 main 即可开工，不等上游跨组件 runtime。
- **解锁：** 说明服务哪些最终流程，不作开发期 live 门禁。
- **验收：** 本仓真实入口的可观察结果；开发期不启动其他 Pepgent 组件、不跑全 compose、不执行 F 行。下表迁出的跨组件结果列在“统一验收前置”，只约束统一阶段执行，不免除本仓检查。
- **统一验收前置：** 组装前必须备好的运行环境与跨组件观察；未单列此列的切片无新增运行前置，原 F 范围仍在 §3 与 E2E 收口表保留。
- **档位：** 保留原设计分工；具体工程席与模型按 D16-09/10。

表中的 VS1/VS2 只是切片标识，不代表开发波次或验收关卡；工程排期取 D16 席位矩阵。

#### ENV：本机测试环境（台账 `~/Ext/work/orbstack/`，执行者是基础设施操作员）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| ENV-01 `VS1` | CNCF Distribution 容器 `pepgent-registry`（HTTP，`pepgent-registry.orb.local:5000`），先登记台账；Slurm 机的 Apptainer 配置为接受该仓库 | — | 全部镜像 | ① Mac 推送一个 alpine tag；② Komodo 部署的容器用这个镜像输出 nonce；③ Slurm 机上 `apptainer pull docker://…`，并以 `pepgent` 用户执行同一 nonce 命令。三处都要成功（EP2） | low |
| ENV-02 `VS1` | 本机 auth broker 与 gateway；`--clients` 文件给每个消费方一个 token（只存 digest）；每个消费方一份 `models.yml`（D8-06）。在台账里登记进程与端口 | ENV-01 | 全部 | 在一个装了上游 omp 的临时容器（先登记，用后删除）、Komodo 部署的容器、Slurm 作业里，`omp -p "reply ok" --model <D8-06 顺序>` 都返回补全；三处日志里都找不到 provider token（EP1）。`--clients` 文件里另为 A0 的临时 IMG-01 容器准备一个 client token（D8-03、E2E-02）。不依赖 IMG-01，所以能排在 VS1 最前面 | mid |
| ENV-03 | 网络可达矩阵：起一个临时的 WS/HTTP 回显容器（先登记，用后删除）。分别从 Komodo 部署的容器和 Slurm 作业建立 WS 往返，并 PUT 一个 100 MiB 的 tar | ENV-01 | F14–F18 | 两处 WS 往返成功，tar 的 sha256 一致（EP3）；临时资源删除，台账更新 | low |
| ENV-04 | token.sh 签发 Slurm JWT，私密写入 central/lab-web remote home（有效期覆盖一轮，不打印）；config.toml 的 soroi-slurm 模板写 IMG-01/02 的 OCI 引用（tag/digest），body/步骤镜像均以 docker:// 原样交 Apptainer，不写 SIF；run_root=/srv/pepgent-runs，shared_root 为容器挂载点，identity.image 在读取目录时解析（D11-10） | REM-01、IMG-03、DIST-04、DEP-02 | F15 | templates 列出模板/identity，status 读 Slurm 作业，tail 读 body.log | low |

#### IMG：`Pepgent/images`（新仓库，D2:50）

| ID | 切片 | 依赖 | 解锁 | 本仓验收 | 档位 | 统一验收前置 |
| --- | --- | --- | --- | --- | --- | --- |
| IMG-01 `VS1` | omp-agent：上游最新 omp、omp-rpc-mux、bun，arm64、空 HOME | MUX-08、ENV-01 | 全部 | 镜像内各二进制版本可调用，HOME 为空，镜像已推送；引用仅记身份 | low | A0 的干净镜像 |
| IMG-02 | remote-step 镜像，用 remote Dockerfile 推送本地仓库 | ENV-01 | F14–F18 | 镜像中 remote step copy-in 可执行并取得给定输入 | low | 远程拷入拷出 |
| IMG-03 | IMG-01/02 推到 pepgent-registry，Slurm 模板用 OCI tag/digest，无独立 SIF 产物（D11-10） | IMG-01、IMG-02、ENV-01 | F15 | pepgent 用户 `apptainer exec docker://<IMG-01引用> omp --version` 与 `apptainer exec docker://<IMG-02引用> remote --help` 可调用 | low | Slurm body、步骤镜像均可拉取 |
| IMG-04 `VS2` | lab-web：IMG-01 加 remote CLI、Node、apps/web 构建产物；入口 installer 安装 tar | IMG-01、LAB-01、DIST-01 | S2 | 镜像构建与本仓入口检查，omp/mux/remote 可调用；不拉 store/Mux/Lab 完整栈 | low | 统一 S2 检查认证、seed 后服务与工具清单 soroi_eval/soroi_task（A0 同法） |
| IMG-05 `VS1` | central：IMG-01 加 remote CLI、从 soroi 默认分支取 e2e 依赖及 standin 入口（D11-04A） | IMG-01 | S1 | 镜像构建、本仓入口与 standin --help；不启动全 compose | low | 统一 S1 中 remote templates 和 standin 实际工作 |

#### MUX：`Pepgent/omp-rpc-mux`（新仓库，Rust，D3:56）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| MUX-01 `VS1` | `serve`：`/agents/{id}/writer`、`mux_open_generation` 签发 generation 与 token、`/process` 校验 token、逐行双向转发、`mux_attached`、`mux_exited`、`mux_close_stdin`（D3:59-61） | — | 全部 | 与 MUX-02 联合验收：写方 dial 一个 `omp --mode rpc`，收到 `ready`，`get_state` 往返成功，`mux_close_stdin` 之后收到 `mux_exited` | mid |
| MUX-02 `VS1` | `dial`：拉起子进程、持有 stdio、出站 WS、处理 `mux_close_stdin`、上报退出码（D3:58） | MUX-01 | 全部 | 同上；另外，dial 被 kill 后，子进程也退出 | mid |
| MUX-03 `VS2` | 读方：命令白名单、id 加前缀、广播、`mux_welcome`、代的事件（D3:60） | MUX-01 | F07、F19、F26 | 读方能读到 stdout；读方发 `get_messages` 后，response 原样广播给所有连接；请求方按自己的 `r{conn}:` 前缀识别自己的那条，其他读方也会看到这条原始帧（D3-06，D3:60）；读方发 `prompt` 被拒绝 | low |
| MUX-04 `VS2` | 在线：`GET /agents`、`/agents/events`（D3:69） | MUX-01 | F07、F16、F19–F21 | 一次停驻和唤醒，在快照和事件里给出相同答案 | low |
| MUX-05 | 人类 IRC 帧从读方转给写方，只接受受信 reader 凭据（D3:66） | MUX-03 | F25 | 受信读方发的帧能到达写方；非受信读方被拒绝 | low |
| MUX-06 | 控制端点：`WS /endpoints/{name}` 绑定写方声明与代；`POST /endpoints/{name}/requests` 转发（D3:73） | MUX-01 | F08、F23、F24 | 请求能往返；同名端点只有同一会话的新一代能接替 | mid |
| MUX-07 | 文件：`dial --root/--expose`、`mux_list_files`、`mux_read_file`、`GET /agents/{id}/files…`（D3:67） | MUX-02 | F16、F17 | 只能列出 `--expose` 声明的目录，读到的字节与源文件一致 | low |
| MUX-08 `VS1` | 发布：linux arm64/x64 与 macOS 的静态二进制；`serve` 容器镜像；compose 服务片段 | MUX-02 | 全部 | 镜像在本地仓库；`omp-rpc-mux serve` 容器可以访问 | low |

#### STO：`Pepgent/soroi` 的 `packages/store`（D6:29）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| STO-01 `VS1` | Bun 服务；DuckLake（SQLite 目录库）；按 D6-03 建全部表；对象目录；`GET /objects/{sha}`（D6:30-31） | — | 全部 | 服务重启后表和对象都还在 | low |
| STO-02 `VS1` | `POST /runs/steps`：`open` 或 `existing`、一个事务、事件、`StepCommitted`；`POST /runs/{run}/end`：在请求的事务里确认未消费集合为空才写 `run_ended`，返回 `EndResult`（`Ended{seq}` 或 `NotEmpty`）；PM#5 第 1 项的最小 transfer 闭环：`POST /transfers`、`PUT /transfers/{t}/objects/{sha256}`、步提交时把被引用的字节转入对象目录、`GET /transfers/{t}/objects/{sha256}`、`DELETE /transfers/{t}`（D6:32-33、35、107、115-118；PM#5） | STO-01 | 全部 | 用 HTTP 夹具开一个 transfer，带这个 transfer 提交 F01 的那一步，再调用 `/end`：返回 `Ended{seq}`，事件顺序正确；未消费非空时返回 `NotEmpty`，不写任何记录；transfer 分两种情形验收：① 正式提交的 EvalTransfer：提交前 `GET /transfers/{t}/objects/{sha}` 返回 200；步提交之后 `GET /objects/{sha}` 返回 200，同一个 transfer URL 返回 404（D6-07：提交事务里转入对象目录并删除暂存区）；② 另开一个从不提交的 transfer：显式 `DELETE` 之前同一 URL 返回 200，之后返回 404 | mid |
| STO-03 `VS1` | `GET /runs`、`/runs/{run}/graph?at`、`/runs/{run}/state`、`/captures/{id}`（D6:38）；被中止的调用在 `RunGraph` 中是独立的 `Aborted` 变体，不带 `version`、`body`、`env`，`outputs = []`（PM#5 第 2 项） | STO-02 | 全部 | 对 3 步夹具，`at=k` 的投影都正确；含一个被中止调用的夹具投影出 `Aborted` 变体 | mid |
| STO-04 | 远程用的 volume 与进度部分（最小 transfer 闭环已在 STO-02，PM#5 第 1 项）：`PUT /transfers/{t}/volumes/{position}` 的 tar 解包、`GET /transfers/{t}/volumes/{position}/files/{path}`、提交时写 volume 清单、`GET /volumes/{run}/{step}/{position}` 与其文件（D6:35、146-152） | STO-02 | F14–F18 | dry run 删除暂存区后，volume 文件返回 404；正式提交后，volume 清单与文件都可读 | mid |
| STO-05 `VS2` | SSE：`/runs/{run}/stream?after`、`/stream/lifecycle?after`（D6:34、37） | STO-02 | F10、F26、F30 | 从任意 seq 续订，事件不重不漏 | low |
| STO-06 | `/runs/{run}/activity?until`（D6:38） | STO-03 | F03、F22 | 区间等于提交时带上的原始时刻 | low |
| STO-07 | `/compare`，对齐规则按 D6-13（D6:41） | STO-03 | F13 | 夹具得到 `SameCapture`、`Changed`、`Ambiguous` | mid |
| STO-08 | `/search`（ILIKE，含中文）、`/values/{hash}/runs`（D6:36）；`File` 值的身份就是它的内容哈希（`pepgent-soroi/design/store.md:29`：文件的身份是“内容的哈希”），所以 `hash` 可以直接用 graph 中的 `Root.value.content` | STO-02 | F12 | 中文子串能命中；以一个 `File` 根 atom 的 `Root.value.content` 查询 `/values/{hash}/runs`，列出用到它的运行 | low |
| STO-09 | `POST /runs/derive`、`/runs/{run}/abort`（D6:44、33） | STO-02 | F17、F24 | 一个事务里完成：P 未结束时写 `run_aborted`，R' 写 `Inherited`、继承的停止记录与新根 atom；返回 `Derived{run, seq, parentAborted}`（D6:44、131） | mid |
| STO-10 | 在步提交的同一事务里，把暂存区 `soroi-batch/` 的四列批次（`seq`、`at`、`kind`、`transcript_entry`）汇入 `agent_progress`；store 为每批填入 `run_id`、`step`、`position`；`/runs/{run}/progress`（D6:31-32） | STO-04 | F16 | 夹具 Parquet 汇入后可查；dry run 不汇入 | low |
| STO-11 | `NodeVersionRecord` 随步提交；`/functions/{name}/usage`、`/versions/{v}`（D6:49） | STO-04 | F06、F29 | 两个版本、两次运行，usage 都正确 | low |
| STO-12 `VS1` | store 镜像与 compose 服务；发行导入 `PUT /releases/{version}`（正文是 artifact 字节，带声明的 sha256）：同一事务校验哈希，把 boot、runner、定制 tar 各自按内容哈希放入对象目录，写 `ReleaseRecord`；`GET /releases`（D6:50、155-158）。init 在 store 就绪后调用一次。`boot.js` 的 program、agent 分支分别随 SOR-17a、SOR-18 进入发行物，届时由 DIST-01 重新产出 | STO-01、DIST-01 | 全部 | 冷启动后 init 返回 `ReleaseRecord`；`GET /releases` 有这条记录，它引用的 boot、runner、定制 tar 都能 `GET /objects/<哈希>`；哈希不符时不写任何记录 | low |

#### SOR：`Pepgent/soroi` 的 `packages/omp-soroi`（D5:76）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| SOR-01 `VS1` | 把两个旧仓的代码迁到 `src/eval`、`src/subagent`；一个扩展入口，按 `SOROI_ROLE` 选角色；旧仓迁完后归档（D5:76） | — | 全部 | 在 omp 中加载后，Main 角色注册了 `soroi_eval` 与 `soroi_task` | low |
| SOR-02 `VS1` | store HTTP 客户端：删进程内 DuckLake，提交/state/复用走 SOROI_STORE_URL；每 eval 开 EvalTransfer，产出/bundle 入暂存，formal 带 transfer、dry 返回删（D6-07） | SOR-01、STO-02、STO-03 的契约代码 | 全部 | 本仓真实入口检查客户端与 transfer 路径，插件无 DuckDB 句柄；不执行跨组件 F01；统一验收前置：统一 S1 F01 中观察实际带 transfer 提交与 dry 后暂存删除，不作开工锁 | mid |
| SOR-03 `VS1` | 运行生命周期：第一次正式提交带 `open`；根会话的 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次后，调用 `POST /runs/{run}/end`，不论最后一步由哪个会话提交（D6:33） | SOR-02 | 全部 | F01 以 `Ended{seq}` 和 `run_ended` 结束；有活动的正式 eval 时不发 `/end`。批次分支由 SOR-12 的验收与 E2E-13（F22 ⑨）验证 | mid |
| SOR-04 | `soroi_eval` 参数改为判别联合；`pins` 按 atom 名；`env` 参数；`CallReport`（D5:83-85；D5:230-245） | SOR-01 | F03–F05 | 带 pins 的 formal 被 schema 拒绝；只钉一部分输出被拒绝 | low |
| SOR-05 | 检查器按 D5-11 的十项，`CheckError` 用 ADT（D5:86；D5:260-274） | SOR-04 | F03、F09 | F03 的 9 段违规代码全部得到预期的 `kind` | mid |
| SOR-06 | 先按 lockfile 恢复依赖，再 `Bun.build`，以 bundle 哈希为版本；runner bundle；`Site.central`；`NodeVersionRecord` 放进暂存区（D4:47-50；D6:49） | SOR-02、STO-04、STO-11 | F06、F11、F14 | 只改 helper 文件，版本也变 | mid |
| SOR-07 | 环境身份：中心取部署注入值；远程取 `remote templates.identity`（D4:64） | SOR-06、REM-05 | F11、F14、F15 | 同一调用先正式运行一次；然后把模板换到一个已确认 digest 不同的镜像（或改动计入 `config` 身份的模板配置）。先断言 `remote templates` 返回的 `identity` 前后不同，再以相同输入正式运行同一调用：第二次在 stream 中是 `call_started`/`call_ended` 而不是 `call_adopted`，graph 状态不是 `Adopted`，`/compare` 中这一对不是 `SameCapture` | low |
| SOR-08 | 公开 addBeforeModelCall 每次候选现算未消费集合，按 Subagents.visibility 过滤，经 obfuscator 注入；格式/批次目的按 D5-13。每次注入记 transcript customType=soroi.unconsumed-reminder，数据仅{text}；空集不注入不记，按条目后首 assistant 对应候选，不证明 provider 实发（D11-37） | SOR-02 | F02、F08、F22、F23 | 本仓真实候选入口观察提醒与可见集、最终文本一致及 transcript 顺序；批次可见性在统一 E2E-13 的 F22⑥⑦ 收口，不读 soroi.eval-lifecycle | low |
| SOR-09 | subagent 改走 Mux：`MuxWriter`、`Generation`、`ProcessRef`；本机子进程用 dial 启动（D3:63） | SOR-01、MUX-02 | F07、F19–F21 | 子 agent 出现在 `/agents`；停驻和唤醒按 D3-07 开、关代 | mid |
| SOR-10 | `ReturnContract`；删除“最后一条回复兜底”，保留 IRC 唤醒回执（D5:79-80；现状见 SUB-RD:21） | SOR-01 | F07 | 没有交回就没有结果；唤醒回执仍会送达 | low |
| SOR-11 | `spawnCapture`：删除 `runSubprocess`；`LocalChild` 的 host call 转发（D5:78、93） | SOR-09、SOR-10 | F07 | `review` 完成捕获，并记录 transcript sessionId | mid |
| SOR-12 | 角色闸门、`writesEval`、嵌套的 `soroi_task`、批次与 `purpose`、批次释放（D5:81-82、87） | SOR-09、SOR-03、SOR-08 | F19、F22 | worker 能写步；Agent 体没有 eval；同批全部交回后才释放；未释放批次的产出只对产出它的 worker 子树可见，主 agent 的提醒里没有；批次未释放时根 supervisor 不发 `/end`（D5:86-88；D6:33） | mid |
| SOR-13 | 每个 `writesEval` 为真的会话注册控制端点 `eval:<session>`，接受封闭的 `method` 联合：会话端点 `{"method":"slots"}`、`{"method":"answer","handback":HumanHandback}`、`{"method":"takeover","handback":HumanHandback}`；根端点另外接受 `{"method":"writers"}`、`{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[],"by":UserId}`、`{"method":"abort","run":RunId}`。`slots()` 返回本会话当前全部在途槽位，不带 run；`writers()` 返回包含根会话自身的 `{session,endpoint}[]`，不带 run。`answer`/`takeover` 以 `conversation`、`writerSession`、`slot` 寻址并按 `conversation.owner` 授权；`derive` 与 `abort` 仍按运行由根端点处理。成功回复统一为 `{"ok":true,"value":V}`：`answer`、`takeover`、`abort` 为 `null`，`derive` 为 store 确认的新运行 `{run}`；失败回复不在设计中。`human()` 构造器 | SOR-02、SOR-11 | MUX-06 | F08、F23 | 经 Mux 能按会话读到槽位，`answer` 能结束槽位 | mid |
| SOR-14 | 本机的中止路径：结束 Program 的 runner，中止 Agent 当前这一轮（D6:43） | SOR-13 | F17、F23 | runner 进程消失；子 agent 仍可唤醒 | low |
| SOR-15 | 派生：`InFlight` 先落成 `Committed`，再请求 store，再执行 R' 的第一步；用 IRC 通知 AI（D6:44；D5:91） | SOR-13、STO-09 | F24 | F24 的两种变体都成立 | mid |
| SOR-16 | 监管者实现人类 IRC 写方契约：待投递表、`edit`、`withdraw`，在空闲或步边界 `deliver`（D3:66） | SOR-09、MUX-05 | F25 | 编辑后的消息被投递，撤回的不投递 | low |
| SOR-17a | 远程 Program 的正式运行路径：暂存区、`call.json`、`RunRequest`、`remote` CLI 客户端、等到终态、取回结果、随步提交、`remove`；`boot.js` 的 program 分支（D4:51-54）。终态有两种：`Ended`（拷出已送达）与 `EndedUnstarted{ended_at}`（排队后被取消、从未开始，leader 技术裁决 PM#4）；后者没有拷出，这次调用记为失败，不读暂存区 | SOR-06、STO-04、REM-05、REM-07 | F14、F15、F18 | 在 Komodo 上跑通一次 formal：结果随步提交，Stack 与卷已删除。`EndedUnstarted` 分支在 Slurm 上由 E2E-17 验证（排队中取消，中间件不读暂存区，`remove` 在终态之后成功） | mid |
| SOR-17b | 远程 Program 的 dry run 分流：结果交回 AI，调用返回时 `DELETE /transfers/{t}`，不提交、不写对象（D4:67） | SOR-17a | F15 | 在 Komodo 上跑通一次 dry run：store 的 seq 不变，暂存区文件返回 404 | low |
| SOR-18 | 远程 Agent：`launchRemote`；拷入两个定制 tar；`boot.js` 的 agent 分支；transcript 拷入拷出；交回（D4:55-60） | SOR-17a、SOR-11、MUX-07 | F16、F17 | 远程那一代能连回 Mux，并完成交回 | mid |
| SOR-19 | `RemoteChild` 写 Parquet 批次：每个批次只含 `seq`、`at`、`kind`、`transcript_entry` 四列，`kind` 只允许 `turn \| tool_call \| file_written`；先写 `x.parquet.tmp`，完成后原子改名为 `x.parquet`（D4:61） | SOR-18、STO-10 | F16 | `soroi-batch/` 中只有已改名的文件；批次只含四列 | low |
| SOR-20 | 远程中止：Program 用 `remote abort`，等到终态（`Ended` 或 `EndedUnstarted`）再 `remove`；Agent 按顺序停止。dry run 零写入的回归检查（D6:43；D4:67；PM#4） | SOR-14、SOR-18 | F04、F17 | 远程 Agent 中止后，transcript 回到中心。中止一个仍在排队的作业得到 `EndedUnstarted` 的分支由 E2E-17 在 Slurm 上验证 | low |

#### CUS 与 DIST：`Pepgent/soroi` 仓根（D2:62）

| ID | 切片 | 依赖 | 解锁 | 本仓验收 | 档位 | 统一验收前置 |
| --- | --- | --- | --- | --- | --- | --- |
| CUS-01 | 本定制三类 agent：主、中心 worker、Agent 体，不借 omomp/本机内容 | SOR-01 | F07、F19、F22 | 定制仓公开加载入口检查定义 | high | A0② |
| CUS-02 | soroi-eval 技能：逐步消费、dry/formal、pins/env/stop、worker 目的 | SOR-04 | F02、F22 | 定制仓公开技能读取入口 | high | A0③ |
| CUS-03 | 三语句/无魔法值/穷尽解构/atom必消费/dry后原样formal规则 | SOR-05 | F03、F05 | 定制仓规则加载入口 | high | A0④ |
| CUS-04 | personality:none、审批策略、task.agentIdleTtlMs 设置覆盖 | SOR-01 | F20 | 定制仓设置入口观察 | low | A0⑤ |
| DIST-01 `VS1` | installer、manifest、内容命名发行 tar | SOR-01 | 全部 | 干净上游 omp 安装后扩展与设置生效 | mid | 组装使用该发行 |
| DIST-02 | W-08 编写 A0 五类 PTY 探针（#224、e2e/install-check/**）；build-release.py 重写属 W-07 A2-06 | DIST-01、CUS-01–04、E2E-02 代码已合入后编写（D16-10） | A0 | 开发期交付探针代码与 runbook，不执行跨组件 e2e；定制仓可用自身 tar、干净 omp、网关做本仓 A0，不起 store/Mux | low | 统一阶段以 IMG-01/发行/网关执行五类，全部通过 EP0 |
| DIST-03 `VS1` | standalone compose 定义：store、mux、central | STO-12、MUX-08、IMG-05、DIST-01 的产物契约 | S1 | compose 定义解析及本仓入口检查，不起三服务做开工门禁 | low | 三服务实际互通，central 已安装 tar |
| DIST-04 | full profile 挂 remote home/Komodo 凭据；挂 Slurm 共享 runs 到 shared_root，ENV-04 补 soroi-slurm，body/步骤 OCI 引用由 Apptainer 原样拉取，目录时解析身份（D11-10） | DIST-03、DEP-02 | F14–F18 | profile/路径定义与本仓入口检查 | low | central templates 列 Komodo/Slurm 与 identity；shared_root 读取作业文件 |

#### REM：`Pepgent/remote`（D2:46）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| REM-01 | Slurm run/status：JWT 经 slurmrestd 提交，run_root/<run> 依次 copy-in/body/copy-out，脚本 `apptainer exec docker://<模板OCI引用>` 原样执行 body/步骤镜像，不用 SIF；body.log 与 job 状态读取。run_root 为集群可见，shared_root 为调用方可读同存储，句柄记确切路径，测试映射按 ENV-S | IMG-03 | F15 | 本仓 Slurm 入口给出 Ended、拷出 tar、shared_root body.log | mid |
| REM-02 | Slurm 的 `tail`（读 `shared_root/<run>/body.log`）、`abort`（取消后等到终态）、`remove`（等到终态后清理 `run_root/<run>/` 再记 `removed`）；排队中被取消的作业记 `EndedUnstarted`（REM-07，PM#4） | REM-01、REM-07 | F15、F17 | `tail` 返回 body 的输出；运行中 abort 得到 `Ended`，排队中 abort 得到 `EndedUnstarted`；两种终态之后 `remove` 都记下 `removed`，`run_root/<run>/` 不存在 | low |
| REM-03 | Slurm 的 env 注入：把 `REMOTE_*`、调用方的 env、部署方的密钥文件传进 `apptainer --env`（D4:56） | REM-01 | F15、F16 | body 中能读到这些变量，密钥不出现在运行记录里 | low |
| REM-04 | soroi 约定的 Komodo 模板：`templates/komodo/soroi/compose.yaml`，body 命令为 `omp ${REMOTE_MOUNT}/soroi/boot.js`（D4:54；现有示例 `templates/komodo/example/compose.yaml`） | IMG-01、IMG-02 | F14、F16 | 用一个夹具 `boot.js` 跑通拷入、body、拷出 | low |
| REM-05 | templates 输出 identity{image,config}：Slurm 与 Komodo/k8s 在读取目录时同用 Registry::resolve，OCI tag/digest 均可，Slurm 执行不预解析（D11-10） | — | F11、F14、F15 | 换镜像 tag 后目录返回新 image 身份，并以实际调用观察复用行为，不以 digest 比对当通过证据 | low |
| REM-07 | `RunStatus` 与生命周期新增终态 `EndedUnstarted{ended_at}`（排队后被取消、从未开始）；`remove` 先等到终态（`Ended` 或 `EndedUnstarted`）再记 `removed`；Komodo 后端按同一规则处理；`remote schema` 输出随之更新（leader 技术裁决 PM#4） | — | F14、F15、F17 | `remote schema` 含新变体；Komodo 上一个已结束的作业 `remove` 照常记 `removed`；对一个尚未结束的作业调用 `remove`，等到终态后才记 `removed` | low |
| REM-06 | 只读作业列表 `remote runs`：读 remote home 里的运行记录 `runs/<run>.json`（REM-RD:52、94-96），列出每个作业的 run id、模板、后端、生命周期事实与起止时间；按 run id 的 `status`、`tail` 沿用现有操作。只读，不加任何控制操作（D8-16） | REM-01 | F17（S2）、F31 | 先后跑两个作业（一个 Komodo、一个 Slurm），`remote runs` 列出两条，字段与各自 `status` 一致；`remove` 后仍按记录列出，状态为 `removed` | low |

#### LIB：`Pepgent/lab-library`（新仓库，D2:49）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| LIB-01 | D8-07 的节点、`package.json` 与 lockfile、`.omp/agents/` | SOR-01 | F03、F06–F30 | 每个节点都能 dry run 一次，结果符合节点里写明的预期 | low |

#### LAB 与 WEB：`Pepgent/Pepgent` 的 `apps/web`（D7）

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| LAB-01 `VS2` | `server/lab` 隔离区、`labRuntime()`、`rpc/lab.ts` 骨架、请求中间件分流（D7:61、78、81） | — | S2 | Lab 区不 import Paseo 区（由架构检查确认）；`lab.catalog.read` 返回 `OperationResult` | low |
| LAB-02 `VS2` | `lab.sqlite`：Drizzle schema 与迁移（D7:62） | LAB-01 | S2 | 启动时自动迁移，表齐全 | low |
| LAB-03 `VS2` | Better Auth 加 organization 插件、角色、`/api/auth/*`；e2e 管理员账号由部署种子创建；登录页由 UI 负责人实现（D7:63） | LAB-02 | S2 | 邮箱加密码能登录；没有会话时访问 Lab 面被拒绝 | low |
| LAB-04 `VS2` | `LabSessions`：写方、开代、dial、`ready`、`get_state`、`set_host_tools`；根会话的 `human_irc_queue`（根会话的写方就是 Lab，不经 Mux 转发，D3:66）；`discussion.create` 与 `discussion.prompt`（D7:64、69） | LAB-02、MUX-03、DIST-01 | F25、F31 | 一条 prompt 到达根会话，会话停驻后能唤醒 | mid |
| LAB-05 | `lab_*` host tools（D7:65、216-221） | LAB-04、STO-04 | F09、F31 | `lab_open_artifact` 把产物拷进本会话 worktree 的 `inputs/`，字节与 store 对象哈希一致；`lab_save_artifact` 在 worktree 里生成不可变快照 `artifacts/<hash>/<文件名>` 并登记 `artifact_meta`，不写 store（D7:65、67、219） | low |
| LAB-06 `VS2` | store 客户端；订阅生命周期流，写 `experiment_ext`；实验状态的投影（D7:66） | LAB-02、STO-05 | F30、F31 | 收到 `run_started` 后分配 `R-0xx` 编号 | low |
| LAB-07a `VS2` | 读取侧：catalog 与实验页的线数据（`RunGraph`）、`/api/lab/events`、对象代理（D7:68） | LAB-06、MUX-04 | F26 | 运行变更时推送 `run` 频道 | low |
| LAB-07b | 读取侧：在途叠加层（`writers` 与 `slots`）、`/api/lab/agents/{id}/stream`、files（D7:68） | LAB-07a、MUX-03、MUX-06、MUX-07 | F08、F17、F26 | 页面线数据中带有在途槽位，SSE 转发读方帧 | mid |
| LAB-08 | 命令：`intervene.takeover`、`intervene.answer`、`intervene.derive`，`run.abort`，`human.irc`（D7:69） | LAB-07b、SOR-13、SOR-15、SOR-16 | F08、F23–F25 | 每条命令的结论都由拥有方返回 | low |
| LAB-09 | 自动化：事件触发、`croner` 定时、审批门禁（D7:70） | LAB-04、LAB-06 | F30 | A-01 规则写入 `automation_run`；`waiting` 状态的运行批准后才开会话 | low |
| LAB-10 | 节点库：从 TS 导出定义（D7 P1）、`library.stage` 与 `library.apply`（commit 后快进）、usage（D7:71） | LAB-02、STO-11、LIB-01 | F24、F28、F29 | 导出与源码一致；apply 生成 commit | mid |
| LAB-11a | 讨论的读取与装载：停驻会话的 transcript 读取（P2）、`discussion.load`、附件（D7:67） | LAB-04、LAB-05 | F09、F31 | 读停驻会话不会唤醒它；`discussion.load` 写入 `discussion_context` | low |
| LAB-11b | 草稿与启动：`draft.save`、`experiment.start`、`experiment.approve`；启动意图与审批状态记在 `pending_launch`，运行绑定记在 `experiment_ext.draft`，不往草稿写 `launched`（D7:66、161-162；D6:40） | LAB-04、LAB-06 | F27、F31 | 草稿只在 `lab.sqlite`，不进 store；免审批时 `pending_launch` 为 `sent`、会话收到含草稿的 prompt；`run_started` 后 `experiment_ext.draft` 指向该草稿，`pending_launch` 已删除 | low |
| LAB-12 | 算力页的只读读取（D7-12、D7-18；D8-16）：`lab.page.read{lab, page:'clusters'}` 返回 `templates`、`jobs: {run: RemoteRunSummary; status: RunStatus}[]`、`presence`；日志尾部另由只读 SSE `GET /api/lab/jobs/{run}/tail` 提供（`remote tail` 快照，有订阅者时定期取）。有订阅者时定期调用 `remote runs`、`remote status`，变化经 `/api/lab/events` 的 `compute` 频道通知重读；作业最新事实为 `Removed` 时不开 tail 流（D7:72、78、145-146）。第一版无命令 | REM-05、REM-06、REM-07、REM-02、MUX-04 | F17、F31 | 一个运行中的远程作业出现在页面线数据里，带模板与状态；tail SSE 推送它的日志尾部；作业结束后 `compute` 通知触发重读、状态更新；排队中被取消的作业显示终态 `EndedUnstarted`（PM#4）；`remove` 之后不再开 tail 流 | low |
| LAB-13 | [Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)，owner W-09；承载 `home`、`containers`、`settings` 三页完整读取与 P15 镜像定义导出，以及 `member.invite`、`member.role`、`member.quota`、`member.remove`、`conclusion.confirm`、`agentTemplate.saveVersion`、`panel.prompt` 七个命令（D42-01/02/03 v1）。页面形状、精确空值、本人本页 Panel、命令结果、逐命令权限及 `human_irc_queue` 语义按 D12；只写 `apps/web/src/server/lab/**`，不改 protocol、RPC 或 wire。活动写入、`home.activity` 与 `settings.repoActivity` 取行及 `ImageDefinition.name` 取值仍归 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)，#78 依赖本切片代码合入 main | LAB-04、LAB-07a、LAB-10、LAB-12 | F29、F31 | 只做本仓编译、类型检查和基础检查；跨组件结果在 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) 与阶段 C 统一验收（[D42 定稿](https://github.com/Pepgent/PM/issues/61)） | 未指定 |
| WEB-01 | 阶段 A：`readSnapshot` 改为异步，loader 构造服务（D7:76） | — | S2 | 13 个 controller 没有改动，页面照常渲染 | low |
| WEB-02 | 阶段 B 的基础：`src/protocol/lab`、新的 `LabBridge`、`subscribe`、`send`、`watchAgent`（D7:77、117-123） | LAB-07a、WEB-01 | S2 | 页面 loader 读取线数据，事件使它失效后重读 | mid |
| WEB-03 | 投影：catalog、实验列表、实验详情（`RunGraph` 到 `ExperimentFlowFixture`，含时间轴、对比、派生导航、runner workspace 与交回地址）。目录投影在本切片交付；所选 Lab 的持有与重读、详情页回看/派生/对比/workspace/交回五项真实页面接线归 WEB-07（D36-01 v1、D36-02 v2），不作为 WEB-03 关闭条件。D35-01 v3 的共享组件受控位置/回调属性与 model 内时刻→`k` 纯映射可在本切片交付，关闭时未交付的部分随 WEB-07 回看接线承接 | WEB-02、LAB-07b | F08、F10、F13、F18、F23–F26 的投影；页面接线在 WEB-07 | 纯函数投影的单元测试，输入是真实录制的线数据；录制中含 `Aborted` 变体的调用（不带 `version`、`body`、`env`，`outputs = []`），投影出被中止的节点（PM#5 第 2 项） | mid |
| WEB-04 | 投影：讨论、数据集、流程编辑器；数据集页详情“来源链路”末尾的“产物”行显示该产物的 `ArtifactRef`（D37-01 v2）：两类产物的 `chain` 均追加 `{ label: copy.columns.artifact, value: artifact.id, mono: true, page: 该产物第一项的 page }`，讨论产物取 `ArtifactMetaWire.id`，运行产物为 `store:<content>`；只改 model，复用已有 UI 与文案 | WEB-02、LAB-11a、LAB-11b | F09、F12、F27；文件型交回引用串的纯投影 | 同上；数据集页引用串由本切片的投影单元测试验收，真实讨论上传接线归 WEB-07 | low |
| WEB-05 | 投影：节点库、自动化 | WEB-02、LAB-09、LAB-10 | F28–F30 | 同 WEB-03 | low |
| WEB-06 | 投影：集群、容器、接入向导、设置、首页 | WEB-02、LAB-12 | F17、F31 | 同 WEB-03 | low |
| WEB-07 | 阶段 B 一次落地：放宽 id、把剧情字面量改成数据事实、`AgentTemplate.id` 改为 omp agent 定义名、`AgentTemplate.harness` 收窄为字面量 `'omp'`（D7:71、77）、运行时不再引用 `LAB_SNAPSHOT`；同时交付客户端所选 Lab 的持有与切换重读，以及详情页回看、派生、对比、workspace、交回五项真实页面接线，具体行为见下文（D36-01 v1、D36-02 v2）。详情页文件型交回用现有 `text` 字段接收 `ArtifactRef`，讨论页现有 `AttachIcon` 按钮接 `uploadArtifact`，两项按 D37-01 v2 交付。D35-01 v3 在 WEB-03 关闭时尚未交付的共享属性与纯映射随回看接线一并承接。W-10 按 D20-01/02 路径与 UI 数据绑定边界实施，保留 U59 合法结构/语义，不联系无关前端会话；文档按 D20-03 交接（D7-17） | WEB-03–06；D35-01 的提交时间轴 wire 按最终通过版本消费 | S2 | 构建好的 host 在浏览器中走完 13 个页面，数据都来自后端（SMOKE:22-54）；切换 Lab 与五项接线均交付，含详情页文件型交回及讨论页附件上传接线；F10 S2 仍以拖动时间轴读取 `at=k` 的真实节点集合统一验收 | mid |

**WEB-07 的切换 Lab 与详情页接线（D36）。** 客户端持有 `selectedLabId: LabId | null`，首次为 `null`；切换时 `readCatalog(selectedLabId)` 重读目录，按新 `catalog.lab` 重读页面并重订阅 events，不写 Better Auth 会话。该行为随去除运行时 `LAB_SNAPSHOT` 一并交付，WEB-03 只交目录投影。

详情页路由 loader 调用 `readPage('experiment')`，五个入口与该页真实数据切换一并接线：

- 回看：“回看到这一步”工具栏动作，以及 D35-01 v3 的游标受控位置/拖动或点选回调接到 `readPage('experiment', {at})`；`at=k` 按 D12-05 读 `rewind`，`at=null` 读实时。不能用工具栏动作替代拖动。
- 派生、对比、交回：工具栏动作与数据驱动的 `DialogSpecFixture`，调用处传入 `ActionDialog` 已有的 `onDone`。文件型交回字段用已有 `kind: 'text'`（`mono: true`）接收 `ArtifactRef`，自动化页同样适用（D37-01 v2）；提示接受 `store:<Hash>` 或 `discussion:<DiscussionArtifactId>`，引用串见数据集页详情“来源链路”的“产物”行。model 按 `awaiting_human.shape` 生成字段，提交时按 `ArtifactRefSchema` 解析，组成 `GuiReturned { kind: 'file', artifact }`，与其余字段一起放入 `intervene.answer` / `intervene.takeover` 的 `GuiHandback.fields`。自动化页交回归 WEB-05，详情页交回归 WEB-07，不将文件值当作字符串交回。
- workspace：卷清单放入节点侧栏已有的 `artifactsAndSignals` 行。

新文件经讨论页已有附件入口上传（D37-01 v2，WEB-07）：`features/lab-discussions/ui/discussions-page.tsx` 的 `AttachIcon` 按钮只补 `onClick={controller.attach}`；controller 以程序化 `input type=file` 打开浏览器文件选择，不渲染新元素，再调用 `LabBridge.uploadArtifact(当前讨论会话, 文件名, 'raw', 文件)`。交回人上传到自己作为 owner 的讨论会话，产物进入 datasets 页 `artifacts`；已有产物可直接在数据集页详情复制引用串，新文件上传后也到该处复制，再粘贴到自动化页或详情页交回框。Lab 依 P16 将字节放入持有槽位会话可读位置，不要求上传会话与交回会话相同。不改 `protocol/lab/**`、`server/lab/**`、`packages/ui` 或 D16-09/D20 白名单；`ui/**` 仅接上述一处 `onClick`，不在对话框中新增文件上传控件。通过后的承接登记与实际送达由 AreaMgrPepgent 在 [WEB-05 / #25](https://github.com/Pepgent/Pepgent/issues/25)、[WEB-04 / #27](https://github.com/Pepgent/Pepgent/issues/27)、[WEB-07 / #29](https://github.com/Pepgent/Pepgent/issues/29)办理，不以本次回写代替送达或实现。

数据投影仍由 WEB-03 交付；上述五项页面接线与切换 Lab 不作为 WEB-03 关闭条件。相关 F 流程的 S2 部分在 WEB-07 合入后的统一 S2 验收，范围不缩减。D35-01 的共享组件属性与时刻→`k` 映射按最终通过版本实施，WEB-03 关闭时未交付部分在 WEB-07 承接。AreaMgrPepgent 在 [WEB-07 / Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29) 评论登记承接 [D36-01、D36-02 v2](https://github.com/Pepgent/PM/issues/55)，逐项列出切换 Lab 及回看、派生、对比、workspace、交回五项接线，回看须含工具栏动作和 D35 游标回调，再送达 W-10；W-10 在 WEB-07 的 PR 正文逐项列出落点。路径仍限 D20-01，详情页 `ui` 只改 D20-02 允许的行。

#### DEP：`Pepgent/deploy`（新仓库，D2:60）

| ID | 切片 | 依赖 | 解锁 | 本仓验收 | 档位 | 统一验收前置 |
| --- | --- | --- | --- | --- | --- | --- |
| DEP-01 `VS2` | 隔离 Komodo 的 pepgent-central 三容器/持久卷声明、ResourceSync；Slurm runs 挂 shared_root；凭据沿本地私有文件注入 Variables，不解密 SOPS，先登记环境台账 | IMG-04、STO-12、MUX-08 的产物契约 | S2 | 本仓声明解析与入口检查，不把完整 Stack 部署当开发门禁 | low | 统一组装 DeployStack、重建卷保留，lab-web shared_root 读 Slurm 文件 |
| DEP-02 | 登记 soroi-komodo 模板 Stack、lab-web remote home；Slurm 经 ENV-04 写 body/步骤 OCI 引用，目录时解析身份、不维护 SIF（D11-10） | REM-04、DEP-01 | F14–F18、F31 | 本仓模板声明与入口检查 | low | lab-web templates 列 Komodo 与 Slurm |
| DEP-03 `VS2` | release-init：store 就绪后 PUT 同发行 artifact；开发期以不进入活动 Stack 的形式合 main，不让 PR 等接入（D10-14） | STO-12、DIST-01 的代码与接口 | S2 | 本仓真实入口检查 init，不拉 store/完整栈；定义保留全部导入义务 | low | 统一阶段 `/releases` 与带boot发行就绪后接活动 Stack，init后Web服务；ReleaseRecord 及引用对象可读 |

#### E2E 与 D9

| ID | 切片（开发期只编写，不执行跨组件测试） | 编写依赖 | 解锁 | 开发期交付 | 档位 | 统一验收前置 |
| --- | --- | --- | --- | --- | --- | --- |
| E2E-01 | W-08 LabStandIn 写方/RPC/store/Verdict | 所测 MUX-02、STO-03 代码合入 | S1 | 驱动与记录脚本合入 | mid | 夹具运行生成 §3.1 verdict |
| E2E-02 | W-08 PTY有界驱动；A0新容器空HOME→注env/models/token→installer→五类；F20/21进central | 所测 IMG-01、DIST-03、ENV-02 代码合入 | A0、F20/21 | 脚本、runbook与结束条件合入 | low | 原A0顺序、资源与PTY清理；所需镜像/网关/compose就绪 |
| E2E-10 | W-08 F01 spec | E2E-01与F01所有所测实现合入 | F01 | spec合入 | low | A0后统一S1通过F01 |
| E2E-11a | W-08 F02–04 spec | 所测SOR-03/04/05/08、LIB-01合入 | F02–04 | spec合入 | low | S1通过；提醒按D11-37 |
| E2E-11b | W-08 F05 spec，原样formal F04并真跑review | E2E-11a、SOR-11与所测实现合入 | F05 | spec合入 | low | S1通过 |
| E2E-12 | W-08 F06、09–13 spec | 所测SOR-06、STO-05–08/11合入 | F06、09–13 | spec合入 | low | S1通过 |
| E2E-13 | W-08 F07/19/22与读方；F22一步五路及worker批次屏障/目的，保留主agent可见atom，只读帧/提醒/store事实 | 所测SOR-08/11/12、MUX-03/04合入 | F07/19/22 | spec合入 | low | S1全部两部分通过，不读eval-lifecycle |
| E2E-14 | W-08 F20/21 PTY | 所测E2E-02、SOR-09、SOR-12、CUS-04合入 | F20/21 | 脚本合入 | low | S1真实PTY通过 |
| E2E-15 | W-08 F08、23–25 S1 spec | 所测SOR-13–16、MUX-05/06合入 | F08、23–25 | spec合入 | low | S1通过，含F24两变体 |
| E2E-16 | W-08 F14/17 Program/18 spec | 所测SOR-17a/20、DIST-04、STO-07合入 | F14/17/18 | spec合入 | low | Komodo统一S1通过 |
| E2E-17 | W-08 F15；Slurm tail/shared_root、排队取消EndedUnstarted、不读拷出后remove | 所测REM-01–03、SOR-17a/17b、DIST-04、ENV-04合入 | F15 | spec合入 | low | Slurm统一S1全部义务通过 |
| E2E-18 | W-08 F16/17 Agent spec | 所测SOR-18/19、MUX-07合入 | F16/17 | spec合入 | low | 远程Agent统一S1通过 |
| E2E-19 | W-08 F26–30 S1 | 所测STO-05、MUX-04、LIB-01合入 | F26–30 | spec合入 | low | S1通过 |
| E2E-20 | W-10 apps/web/tests/e2e-lab 的S2 runbook/check：F08–13、17/18、23–31 | 所测WEB-07、DEP-01/02以及SOR/LAB等全部实现合入（D16-10） | S2、F31 | runbook/check合入；阶段B不执行 | low | S1、E2E-21后真实浏览器全路径；EP6，D8-10三处核对 |
| E2E-21 | W-10 apps/web/tests/e2e-lab 的Lab server-function真实链路核对（§4.1） | 所测LAB-04/06/07a、DEP-01/03以及SOR等全部实现合入（D16-10） | S2 | 核对脚本合入；阶段B不执行 | low | 统一S1后、S2前，讨论→dial→运行→绑定→Ended图/run通知 |
| D9-01 | 叶子字段清单：TS编译器API遍历18字段类型，列路径/类型 | WEB-07 | F32 | 完整清单，由low复核 | free | 统一S2之后以实际契约复核 |
| D9-02 | 每叶子来源类别、投影位置与录制值 | D9-01、E2E-20 | F32 | 类别与证据路径齐全 | low | 必须已有真实线数据录制 |
| D9-03 | 点线面归类与报告，交领导层表决 | D9-02、全部verdict | F32 | §5逐条执行，报告表决 | high | A0/F01–31全部统一运行结果 |

**合计：** 109 个切片。

| 分组 | 数量 |
| --- | --- |
| ENV | 4 |
| IMG | 5 |
| MUX | 8 |
| STO | 12 |
| SOR | 21 |
| CUS | 4 |
| DIST | 4 |
| REM | 7 |
| LIB | 1 |
| LAB | 15 |
| WEB | 7 |
| DEP | 3 |
| E2E | 15 |
| D9 | 3 |

**F 流程的收口切片：** 每个 F 流程都由 E2E 组里的一个切片收口，即上表“解锁”列中出现该流程的那个 E2E 切片。没有哪个流程没有收口切片（导师：“leave any F-row without one closing slice”是走偏信号）。

## 5. D9 的方法：点、线、面

### 5.1 输入

- §3 的全部 verdict，第一段与第二段都要。
- 第二段每页 `lab.page.read` 和 `lab.catalog.read` 的线数据录制，取自 E2E-20 的网络日志。
- D9-01 的叶子字段清单，以 SNAP:24-58 的 18 个顶层字段为根：`labs`、`account`、`members`、`projects`、`experiments`、`aiModels`、`home`、`experimentsPage`、`experimentFlows`、`flowEditor`、`nodeLibrary`、`automation`、`datasets`、`discussions`、`clusters`、`connectCluster`、`containers`、`settings`。
- D7 的字段表（D7:87-106），以及占位 P1–P9、P11–P13（D7:280-291）。
- D2–D6 中尚未确认的占位：D2:163-176、D3 §6、D4:313-324、D5:350-363、D6:285-296。
- D8-16 的清单。

### 5.2 叶子来源分类（D9-02，机械判定）

对每个叶子 `f`，依据 WEB-03 至 WEB-06 的投影源码和录制的线数据，判定为下列四类之一：

- **A（权威值）：** 投影直接取自某个权威方的线字段，录制值非空，并且与该权威方的事实一致。例如 `RunGraph.nodes[].env` 等于 store 的 capture。
- **C（派生值）：** 投影只用 A 类字段计算得到，例如进度和泳道坐标（D7:77）。
- **K（文案）：** 取自 renderer 的 copy 目录（D7:77）。
- **U（无来源）：** 投影里写的是常量或默认值，或者取自 D7 的某个占位；或者录制中该字段始终为空，而 FC 或原型的业务形态要求它有值。例如 D7:93 的 `progress.total`。

### 5.3 归类规则（D9-03）

**点**：单个能力上的缺口。满足下列任一条即记一项：

- 一个 U 类叶子；
- 一个枚举值：契约类型里有，但没有任何权威方会发出；
- 一个 `LabCommand` 变体或 `lab_*` 工具参数：没有拥有方处理它，或者结论里缺字段；
- 一个第一段的断言：要靠 D8-11 允许的偏离记录才能通过。

每一项都写明：

- 字段路径；
- 应有的权威方，依 D2 的归属判定；
- 证据路径；
- 建议的承接切片。

**线**：一条跨组件路径没有闭合。满足下列任一条即记一项：

- **第一段过、第二段不过：** 同一流程第一段通过而第二段失败。按 `rpc.jsonl`、store stream 和 Lab 网络日志的时间戳逐跳比对，定位第一跳断在哪里，跳的顺序是“UI → Lab → Mux 或端点或 store 或 remote → 回推 → UI”。
- **命令没有回推：** 一条命令有结论，但 `/api/lab/events` 没有推送对应切片，页面要刷新才看到。
- **路径经过未确认的占位：** 一个流程的通过依赖仍是占位的环节，例如 D3 P1、D4 的“冷复活接入”（D4:323）。

每一项都写明：

- 起点和终点；
- 断开的那一跳；
- 涉及的仓库；
- 证据。

**面**：整块产品区域在 Pepgent 与 soroi 之间没有承担者。满足下列任一条即记一项：

- **某个顶层字段整体无来源：** 该字段下 U 类叶子过半，且 D7 字段表把它的权威方写成占位或外部系统，例如 `clusters` 依赖的 P4、P6，`connectCluster` 的 P7。
- **D8-16 清单中的一项，环境里根本没有部署它的权威组件：** 例如 Komodo Build 流水线、k8s 后端、NetBird 网格、仪器事件、资源计量。

每一项都写明：

- 区域；
- 按 D2 的归属判据，它应该由哪个仓库或组件承担，或者需要新组件；
- 与 U1 的对应：“对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在”（LEDGER:15）。

### 5.4 D8-16 清单的处理

清单中每一项都必须得出结论：

- **面：** 该项需要新组件或新仓库；
- **线：** 组件存在，只缺接线；
- **点：** 组件存在，只缺单个能力；
- **已覆盖：** 第二段证明它已被某个流程顺带走到。

不允许不下结论。

**第一版无来源字段（D12“第一版无来源字段”逐项纳入）：** 以下线上不出现（已定义的可空字段取 null），投影留空，D9 判为 U，不得用演示值补齐；同样必须逐项给出点/线/面/已覆盖结论。

| 视图字段 | 缺失来源 |
| --- | --- |
| home.progress.phase/detail | 研究阶段与整体进展叙述 |
| home.clusters.*；clusters.clusters[].health/load/gpu/cpu/nodeCount/handshakeAge；gpuNodePatterns；gateways；containers.clusterAvailability | P4 集群健康与容量 |
| clusters.clusters[].isDefault | Lab 默认集群选择；P3 与 remote 没有该事实。视图允许 null、投影一律 null，不以 false 或首个模板端点造默认值，不显示默认标记（D38-01） |
| experimentFlows[].description（未绑草稿） | 无草稿运行的研究描述 |
| experimentFlows[].remainingMinutes | 未提交的后续调用不可知 |
| nodes[].status 的 failed_verdict/flagged；tableVerdict；detail.verdict；artifactContracts；datasets.artifacts[].role/verdict/contract（实验产物） | 产物契约与判据，D10-11(b) |
| clusters.containers[].state 与 images[].liveContainers[].state 的 failed/exited 区分 | remote 不记退出结果 |
| clusters.containers[].logs[].time/severity；containers[].host；resources.used | tail仅纯文本，宿主与用量P4 |
| containers.images[].group/note/dependencies[].source/reason/change；files[].modified/change；layers[].size；occupancy[].layer/change；builds | images/registry未定义事实，构建与标签按D8-16不进第一版 |
| images[].terminal；shellTranscript；agents[].scratch 的容器/终端；connectCluster 安装日志/注册令牌/连接测试 | P6交互shell、P7接入执行 |
| settings.repositories[].images；imageDependencies；仓库/模板on-push与凭据注入开关 | 库镜像依赖与仓库自动化策略 |
| settings.agents[].targets；models[].purpose；entries[].source 的repository分支 | omp agent定义无这些项 |
| automation.rules[].triggerKind 的instrument与相应运行 | P8仪器事件，公开类型不含该变体 |
| settings.members[].gpuHours.used | P9计量；gpuHoursUsed=null |

### 5.5 产出形式

`D9-gap.md` 的正文由三部分组成：

1. 一张 18 行的表：字段 × 点 / 线 / 面的数量，每格链接到明细；
2. 一张 F01–F31 的表：第一段与第二段的结论，以及差异所在的跳；
3. 点、线、面三份明细表。

## 6. 反例回应（导师意见中不改的部分）

导师列出的“相邻工作”已采纳为 D8-16 和 D8-04 的边界，不再另行回应。以下一项不改：

| 意见 | 回应 |
| --- | --- |
| “Decision rows omit … voting provenance, or Argon intent review/veto status” | 本表是起草稿，投票与 argon 审查在决策流程中进行（LEDGER:194 R38；LEDGER:217-218 R46、R47）。表决结果由治理分身记录在 PM issue 里，不预先写进起草稿 |
