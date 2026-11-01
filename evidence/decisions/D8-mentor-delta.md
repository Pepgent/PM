# D8 mentor delta

第 4 轮上下文：导师在第 1 轮针对 D8-01、D8-13、D8-16 提出的三个反例均已采纳；之后已完成与 D2–D7 最终文本的对齐通读，并将 item 16 的 leader-seat 技术裁决并入 D8-09/D3 条款。该裁决原句为：“an operator-launched TUI root omp (a human at the terminal, used for Agent Hub kill in F20 and `omp --resume` in F21) is its own writer and does not go through the Mux; the soroi subagents it starts still go through the Mux via the writer's dial.”

## VERBATIM: D8-r1-responses.md sections “第 3 轮” and “第 3 轮：与 D2–D7 最终文本的对齐”

## 第 3 轮

第 3 轮投票结果：task:high 与 argon 均 16/16 赞成；LeadMentor 第 1 轮 13 赞成，对 D8-01、D8-13、D8-16 反对，选票原文见 `evidence/votes/D8-mentor.md`。

| 选票位置 | 反例 | 修订 |
| --- | --- | --- |
| D8-01 反例 1（`D8-mentor.md:4`） | F22 只测了一步内的五路并发，没有测多个中心 worker 的批次屏障。假如实现在前两个 worker 交回时就把它们的 atom 暴露给主 agent，F22 仍会通过 | **矩阵 F22：** 新增第二部分 ⑤–⑨：<br>• ⑤ 一次带 `purpose` 的 `soroi_task` 派出 3 个 `writesEval` 为真的中心 worker；<br>• ⑥ 前 N−1 个 `soroi_return` 被接受之后，强制主 agent 请求一次模型，这次的提醒条目里没有这批产出，尽管它们已在 store 里提交；<br>• ⑦ 第 N 个被接受之后，提醒一次列出全部产出，组头是 `purpose`；<br>• ⑧ 每个 `step_committed.step.session` 都是写这一步的 worker 的会话；<br>• ⑨ 批次释放之前，根 supervisor 不发 `/end`。<br>组件加上 SOR-12。<br>**E2E-13：** 写明 F22 两部分都由它收口，依赖加上 SOR-08 |
| D8-01 反例 2（`D8-mentor.md:4`） | F15 查询的 `GET /transfers/{t}/files/soroi/result.json` 不是 D6-07 的 EvalTransfer 路径。正确的实现对这个 URL 本来就返回 404，所以判据是假阳性 | **矩阵 F15：** 改用 D6-07 的路径 `GET /transfers/{t}/volumes/{position}/files/soroi/result.json`（D6:147）。eval 返回之前在这个 URL 上读到正确值；返回之后同一 URL 返回 404。D8 中已经没有旧路径 |
| D8-13（`D8-mentor.md:16`） | VS1 第 6 步写的是 `POST /runs/steps（open、mayEnd）`，但已通过的 D6-05 删除了 `mayEnd`，改为根 supervisor 另行调用 `POST /runs/{run}/end`。照 D6 实现时，运行会一直保持 Open，F01 永远不会结束 | **§4.1 VS1：**<br>• 第 6 步改为 `POST /runs/steps（open）`；<br>• 新增第 7 步：根 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次，调用 `POST /runs/{run}/end`，断言 `Ended{seq}`。<br>**矩阵 F01：** ② 写明这一调用和 `Ended{seq}`；证据列保存 `/end` 的请求与响应。<br>**STO-02：** 加上 `POST /runs/{run}/end` 与 `EndResult`（D6:115-118），验收覆盖 `Ended`、`NotEmpty` 两种结果。<br>**SOR-03：** 改为 supervisor 调用 `/end`，不论最后一步由哪个会话提交。<br>D8 中已经没有 `mayEnd` |
| D8-16（`D8-mentor.md:19`） | D8 的 F17（S2）和 F31 要求算力页显示作业与日志尾部，但已通过的 D7 把 P5 移出了第一版，W6 必然无法通过 | **D8-16：** P5 拆成两部分：<br>• 只读部分进入 MVP：新增只读操作 `remote runs`（REM-06），从运行记录列出作业，再按 run id 读 `status`、`tail`；<br>• 控制部分 `restart`、`destroy`、`new_sandbox` 列入 D9 输入。<br>D7-12、D7-18 由治理同步修订。<br>**REM-06：** 改写为只读的 `remote runs`，读 `runs/<run>.json`（REM-RD:52、94-96），去掉“归属待投票”，验收覆盖 Komodo 与 Slurm 各一个作业，以及 `remove` 之后的记录。<br>**LAB-12：** 改写为算力页的只读线数据（`templates`、作业列表、`Presence`、`status`、`tail`），不加控制命令，依赖加上 MUX-04 |

第 3 轮改动清单：

- 决策行：D8-16；
- 验收矩阵：F01、F15、F22；
- 波次说明：§4.1 的 VS1 步骤；
- 切片：STO-02、SOR-03、REM-06、LAB-12、E2E-13。

切片数不变，仍是 107。脚本复核：所有依赖都指向存在的切片，每个切片都在某个波次里，没有切片依赖更晚的波次。

### 第 3 轮：与 D2–D7 最终文本的对齐

按 leader 的要求，把 §3 每一行、§4.2 每个切片与 D2–D7 当前通过的文本逐项核对，D7 按正在修订的最新文件读。核对分五路进行（D2+D3、D4、D5、D6、D7），每路只报冲突，不报省略；D 文件没有改动。另外并入 leader 在 PM#4 登记的两项技术裁决。

**改变语义的对齐（这些行和切片需要重投）**

| D8 位置 | 改动 | 依据 | 语义 |
| --- | --- | --- | --- |
| MUX-03 验收 | “只有自己收到 response”改为“response 广播给所有连接，请求方按 `r{conn}:` 前缀认领”（D3:60） | 见改动内的引用 | 是 |
| D8-04 how | “四条线”按 D7-20 原样转述：Mux 写方、读方与控制端点合为一条，Lab 库 `.omp/` 是第四条 | 见改动内的引用 | 否 |
| F02 ③ | “最后一步 `run_ended`”改为“最后一步提交后，根 supervisor 调用 `POST /runs/{run}/end`，store 另写 `run_ended`”（D6:33） | 见改动内的引用 | 是 |
| F06 | 输入身份改从 `GET /captures/{identity}` 的 `CaptureRecord.inputs` 核对，graph 节点没有 `inputs` | 见改动内的引用 | 是 |
| F11 | 删去“activity 里没有执行区间”，改以 `call_adopted` 与来历 `Adopted` 判定 | 见改动内的引用 | 是 |
| F24 ①② | P 的 `run_aborted` 只在 P 未结束时写，按 `parentAborted` 核对；继承调用以 `call_inherited` 与来历 `Inherited` 判定，不看 activity | 见改动内的引用 | 是 |
| STO-09 验收 | `run_aborted` 只在 P 未结束时写，返回 `Derived{…parentAborted}` | 见改动内的引用 | 是 |
| D8-03 how、STO-12、DEP-03 | 发行导入改为 `PUT /releases/{version}` 一次事务写 `ReleaseRecord`，不再逐项导入对象 | 见改动内的引用 | 是 |
| SOR-08 验收 | 提醒内容改为“`state` 再按 `Subagents.visibility` 过滤后的集合” | 见改动内的引用 | 是 |
| SOR-13 | `writers(runId)` 只在根端点；通用端点只有 `slots`、`answer`、`takeover`；运行级 `abort` 发到根端点 | 见改动内的引用 | 是 |
| F31 ②、LAB-11b | 草稿 `launched` 改为 `pending_launch` 与 `experiment.approve`，绑定记在 `experiment_ext.draft`；LAB-11b 依赖加 LAB-06 | 见改动内的引用 | 是 |
| LAB-12 | 页面线数据只带 `templates`、`jobs{run, status}`、`presence`；日志尾部改走 SSE `/api/lab/jobs/{run}/tail`；`compute` 频道通知；`Removed` 不开流 | 见改动内的引用 | 是 |
| WEB-07 | `harness` 收窄为 `'omp'`，定义名放在 `AgentTemplate.id` | 见改动内的引用 | 是 |
| LAB-05 验收 | `lab_save_artifact` 改为在会话 worktree 生成不可变快照、不写 store；`lab_open_artifact` 拷进 worktree 的 `inputs/` | 见改动内的引用 | 是 |
| SOR-17a、SOR-20、REM-02、新切片 REM-07 | 新增终态 `EndedUnstarted{ended_at}`：新切片 REM-07 在 remote 的 `RunStatus` 与生命周期里加上它，`remove` 等终态后才记 `removed`（两后端，W4）；中间件按终态等待，`EndedUnstarted` 的调用记为失败且不读暂存区；abort 等终态（leader 技术裁决 PM#4）。SOR-17a、REM-02 依赖加 REM-07 | 见改动内的引用 | 是 |
| REM-01、REM-02、ENV-04、DIST-04、DEP-01、E2E-17 | Slurm 模板带 `run_root`（集群可见）与 `shared_root`（调用方可读）；`tail` 读 `shared_root/<run>/body.log`；central 与 lab-web 挂载 Mac 的 `pepgent-slurm/runs` 作为 `shared_root`，验收覆盖可读与 tail（PM#4）。E2E-17 依赖加 ENV-04 | 见改动内的引用 | 是 |
| LAB-12 验收 | 补上排队中被取消的作业显示终态 `EndedUnstarted`（PM#4） | 见改动内的引用 | 是 |
| D8-09（连带 F20、F21、E2E-02） | PTY 根会话改为明确标注“操作员在终端直接启动的 TUI 根会话，不经写方 dial；子 agent 仍经 Mux”，并标为与 D2-08/D3-08/D3-10 冲突、提请在 D3 补条款。D8 不能单方面消除这个冲突 | 见改动内的引用 | 是（需裁决） |

**只改引用、不改语义（不需要重投）**

- REM-05：D4:217-227 → D4:229-242
- §5.1：D4:300-309 → D4:313-324；D6:258-269 → D6:285-296
- §5.1：D7 占位 P1–P12（D7:263-274）→ P1–P9、P11–P13（D7:280-291）
- §5.3：D4:308 → D4:323
- D8-11：D6:54-190 → D6:54-212
- D8-15：D7:263-274 → D7:280-291
- D8-16：D7:266-273 → D7:283、285-289

**需要领导小组裁决的一项。** D8-09 中 F20、F21 的 PTY 根会话，与 D2-08、D3-08、D3-10“所有 omp 都由写方 dial 启动”冲突。Agent Hub kill 与 `--resume` 只有 TUI/CLI 入口，D8 无法在不违背其中一方的情况下改写。D8-09 已写明这个冲突，并提议在 D3 补一句：操作员在终端直接启动的 TUI 根会话不经 Mux，其子 agent 仍经 Mux。

**第 3 轮对齐后的计数：** 新增 REM-07，切片数从 107 变为 108（REM 7 个），归入 W4。依赖变化：SOR-17a、REM-02 加 REM-07，LAB-11b 加 LAB-06，E2E-17 加 ENV-04。脚本复核：所有依赖都指向存在的切片，每个切片都在某个波次里，没有切片依赖更晚的波次。

## Current decision-table rows (verbatim)

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D8-01 | **MVP 的定义：F01–F32 全部，不取子集** | 本表 §3 验收矩阵；LEDGER 的 R54–R57（LEDGER:240-243） | MVP 指 §3 矩阵 32 行全部通过，每行至少有一份 §2 D8-12 格式的证据。<br>• F01–F30：按矩阵标的段验收。标“两段”的流程，第一段先过，第二段再过。<br>• F31：只在第二段验收。<br>• F32：D9 报告按 §5 方法完成，并经表决。<br>• FC 的【暂定】子项按 §1 的对照表验收。<br>D2–D7 已定、但没有任何 F 流程会走到的组件或能力（列在 D8-16），不算 MVP 的验收项。它们原样列入 D9 的输入，不默默丢掉 | **选定：** 全集。U23 说“能走通我说的所有流程”，U2 说“不要擅自收缩”（LEDGER:17-19、126-128）。<br>**朴素方案：** 先做核心子集（如 F01–F13），其余记为后续。这正是 U2 禁止的收缩。<br>**实质不同的方案：** 把 D2–D7 的每个组件都当成验收项。这会把用户没说过的流程（例如镜像构建界面）提升为 MVP 门槛，偏离“我说的所有流程”（FC:6“只写用户说过的流程”） | 意图 | 是：U23 |
| D8-03 | **完整 soroi omp 定制的打包与在干净 omp 上的安装** | `Pepgent/soroi`：<br>• CI 从确定 commit 产出 `soroi-<sha256>.tar`；<br>• 内含 `manifest.json` 与 installer；<br>• 插件包 `packages/omp-soroi`；<br>• `agents/`、`skills/`、`rules/`、`settings/` 覆盖文件。<br>安装目标是 omp-agent 镜像（IMG-01，D2:48 D2-11） | **安装：** installer 只用 omp 的公开机制，把每类内容装到 omp 支持的位置，设置覆盖经 config 路径或启动参数加载（D2:62）。<br>• 中心容器启动时安装同一份 tar（D2:57 D2-20）。<br>• 远程每次启动经 copy-in 拷入同一份 tar，以 `HOME=<mount>/soroi/home` 安装（D4:55 D4-09）。<br>• store 就绪后，init 以 `PUT /releases/{version}` 提交同一份 artifact，store 在一个事务里放入 boot、runner、定制 tar 并写 `ReleaseRecord`（DEP-03，D6:50、155-158）。<br>**A0 探针（DIST-02）：** 在新起的 IMG-01 容器里运行（`docker run --rm -it`，加入 `pepgent-soroi-e2e` 的网络；不用已装好发行 tar 的 `central`）。顺序固定：<br>(a) 检查 `ls -A $HOME` 为空、没有 `~/.omp`；<br>(b) 注入与 `central` 相同的 env（`SOROI_STORE_URL`、`SOROI_MUX_URL` 等）和 `models.yml`，以及 A0 容器自己的 client token（D8-06）；<br>(c) 运行 installer；<br>(d) 由 PTY 驱动 omp 逐类验证：<br>① 扩展：`soroi_eval`、`soroi_task` 出现在工具里，一次 `soroi_eval` dry run 返回 `CallReport`；<br>② agent：`soroi_task` 按 soroi 的 agent 定义名派出一个 worker，worker 的 transcript 记有该定义的模型与系统提示；<br>③ 技能：`read skill://soroi-eval` 返回发行包里的正文；<br>④ 规则：transcript 里有发行包规则的注入记录，注入文本与发行包里的规则文件一致（不以模型回答的措辞作判据，D8-11）；<br>⑤ 设置：子进程的 `personality: none` 生效（D2:62 引 inv/r-subagent.md:64-66）。<br>任何一项失败，A0 即判失败。<br>**omp 版本：** 镜像构建时取上游最新发行版，不钉版本（规则《实现时不钉版本号》），实际版本写进每份 verdict（D8-12） | **选定：** 发行 tar 加 installer，在干净 HOME 中验证。这对应 D2-25 已选的“一个只依赖上游 omp 的发行包”（D2:62），也满足 U24“soroi是独立的omp定制”（LEDGER:130-132）：干净 HOME 证明不依赖本机 omomp。<br>**朴素方案：** 沿用现状，两个仓库各自 `omp plugin link`（EVL-RD:16；SUB-RD:8）。这不是可安装的整体，也证明不了独立性。<br>**实质不同的方案：** 把定制烘进镜像。D2-25 已否决（D2:62）。<br>占位 EP0：omp 的公开机制能接收 installer 放置的规则和设置，并让它们生效。这与 D2 的“安装位置”占位相同（D2:176），A0 会实际确认 | 技术 | 是：U23 |
| D8-04 | **MVP 中 Pepgent 怎样把 soroi 当作 agent 核心使用** | 第二段：`Pepgent/Pepgent` 的 `server/lab`（D7:61）。第一段：LabStandIn 只承担同一套协议义务 | **调用面就是 D7-20 的四条线（D7:80）：**<br>① store 的 HTTP 与 SSE；<br>② Mux 的写方、读方与控制端点：Lab 作为根会话写方，在本机执行 `omp-rpc-mux dial -- omp --mode rpc`（D7:64 D7-04），控制端点见 D3:73 D3-19；<br>③ RPC host tools（D7:65）；<br>④ Lab 库项目级 `.omp/` 的规则、技能和 agent 定义。<br>**MVP 判据：** F31 在第二段通过（§3），且 Lab 进程里只有这四条线连向 soroi，Lab 区不 import soroi 的任何包（D7:80-81）。<br>**LabStandIn 的边界（导师意见）：** 它只实现写方与读方协议（声明、开代、dial、`ready`、prompt、读事件），以及调用控制端点与 store。它没有业务库，不注册 `lab_*` 工具，不做投影；任何业务行为都只在第二段验收 | **选定：** soroi 不认识 Pepgent；拿掉 Pepgent，soroi 仍能走通（D7:80）。<br>**朴素方案：** 第一段用真实 Lab 后端代替 LabStandIn。这样 soroi 一侧和 Lab 一侧的缺口无法分开。<br>**实质不同的方案：** LabStandIn 复刻一部分 Lab 业务，比如草稿与自动化。那会变成第二个 Lab，也会让第二段失去意义（导师 D8Mentor：“stand-ins acquire business behavior that belongs to real Lab”） | 串联 | 否 |
| D8-09 | **驱动 H2：PTY 中的真实 omp** | 由 `exec_command` 驱动：A0 在新起的 IMG-01 容器里执行 `docker run --rm -it … omp`（加入 `pepgent-soroi-e2e` 网络；先检查 HOME 为空，再注入 env 与凭据，见 D8-03）；F20、F21 在 `central` 容器里执行 `docker exec -it … omp`；脚本在 `e2e/pty/` | 只用于 RPC 驱动覆盖不到的用户路径：<br>• A0 的逐类探针；<br>• F20 的作业取消（`proc://<id>/kill`）与 Agent Hub kill（SUB-RD:60 用 `x` 键）；<br>• F21 的 `omp --resume`（FC:344-351）。<br>PTY 里的 omp 是操作员在终端直接启动的 TUI 根会话：Agent Hub 的 kill 和 `--resume` 只有 TUI/CLI 入口（FC:332-355）。它不经写方 dial，所以不在 Mux 的写方声明里；它的 soroi 子 agent 仍由插件作为写方经 dial 启动（D3:62-63），Mux 的在线事件照样可作为证据。<br>**待裁决（与已通过条目冲突）：** D2-08、D3-08、D3-10 写的是“所有 omp 进程都由写方经 `omp-rpc-mux dial -- omp --mode rpc` 启动”（D2:45；D3:62、64），没有给终端里直接启动的 TUI 根会话留出位置。本行提请领导小组在 D3 补一句：操作员在终端直接启动的 TUI 根会话不经 Mux，其子 agent 仍经 Mux。若不补，F20 的 Agent Hub kill 和 F21 的 `--resume` 就没有合规的验收入口<br>每条脚本先写定步骤和结束条件，跑完立即退出并关闭 PTY（规则《维护 omp 系列》） | **选定：** Agent Hub 和 `--resume` 是 TUI 与 CLI 的入口，RPC 没有对应命令（omp://rpc.md:147-163 中没有 kill 或 resume）。<br>**朴素方案：** 改用 RPC 的 `cancel_subagent`。它看不到 soroi 子 agent（SUB-RD:76），语义也不同。<br>占位 EP4：在 `docker exec -it` 的 PTY 中，Agent Hub 能用键盘操作 | 技术 | 是 |
| D8-13 | **垂直集成的顺序：先打通最薄的端到端，再加宽** | §4.1 的波次表；排期在 Pepgent/PM 的 Project（LEDGER:187 R22） | **VS1（第一条垂直切片）：** 由 LabStandIn 在第一段走通 F01，详见 §4.1。<br>**VS2：** 打通最薄的 Pepgent 路径。真实 Better Auth 会话 → Lab `discussion.create`、`discussion.prompt`（F01 的代码）→ Lab 作为写方 dial 根会话 → store 生成运行 → Lab 从生命周期流写入 `experiment_ext` → `lab.page.read{experiment}` 返回 `Ended` 的 `RunGraph`，`/api/lab/events` 推送 `run` 变更。VS2 在 server function 层验收（E2E-21）；浏览器验收要等阶段 B 一次落地之后（D7:77 D7-17）。<br>**加宽：** VS1、VS2 之后依次是 W1 本机 eval、W2 subagent 经 Mux、W3 介入与 S1 读侧、W4 远程 Komodo、W5 Slurm、W6 Pepgent 全页面、W7 D9。远程 Program 一侧与 W5 Slurm 只依赖 VS1、VS2、W1，可以与 W2、W3 并行；远程 Agent 与中止要等 W2、W3（§4.1） | **选定：** VS1 先证明“完整定制 + Pepgent 用的调用面 + store”这条脊柱可行；VS2 紧接着证明 Lab 一端也能接上，所以 D9 的“线”在早期就开始暴露。<br>**朴素方案：** 按组件逐个做完再集成。U2 要求的是全流程交付，到最后才集成，问题会集中在 W6 一起暴露。<br>**实质不同的方案：** VS1 直接用浏览器走 F31 的最短路径。那要先做完 Better Auth 和阶段 B，切片就不再薄，失败时也分不清是哪一层 | 技术 | 是 |
| D8-14 | **切片的粒度、档位、仓库归组与交付流程** | §4.2 的切片表。每个切片在它所属的仓库开一个 issue，并配一个 PR 关闭它（规则《GIT规范》：issue 与 PR 的路由）；排期在 PM 的 Project | **粒度：** 每个切片改一个仓库里的一块，由一个工程进程完成，并有一条可单独观察的验收。<br>**档位：**<br>• `low`：契约已在 D2–D7 写明的机械实现；<br>• `free`：取证和清单类工作，结论交 `low` 复核（LEDGER:134-136 U25）；<br>• `mid`：同一仓库内的核心逻辑（提交事务、检查器、Mux 路由、比较算法）；<br>• `high`：提示词、agent 定义、技能与规则的内容设计，以及 D9 的归类判断（LEDGER:55 U11）。<br>**依赖：** 切片之间的依赖构成 DAG。只有依赖的切片已有 runtime 验收证据，下游才能开工。<br>**集成：** 每个波次由一个集成负责人验收，执行该波次的 e2e spec。<br>**执行者：** tern 中的独立 omp 工程师与测试者进程（LEDGER:19 U2） | **选定：** 设计已在 D2–D7 定稿，切成小单元后能交给 low/free（LEDGER:138-140 U26）。<br>**朴素方案：** 每个仓库一个大任务，对 low/free 来说太大。<br>**实质不同的方案：** 按流程切。一个流程会横跨 5 个仓库，同一个文件也会被多个流程切片争用 | 实现 | 否 |
| D8-16 | **D2–D7 已定、但任何 F 流程都走不到的部分：不进 MVP 验收，原样列入 D9 输入** | §5.4 的清单 | 清单（每项附出处）：<br>• remote 的模板写入操作（D2:46 D2-09）；<br>• 容器页的 Komodo Build 流水线与镜像 tag 读取（D2:50 D2-13；D7:73 D7-13）；<br>• 集群健康与容量（D7 P4）、交互 shell（P6）、接入向导（P7）、仪器事件（P8）、资源计量（P9）、邀请邮件（P11）（D7:283、285-289）；<br>• k8s 后端（REM-RD:10；FC:257 用户提到 k8s，但没有 F 流程去走它）；<br>• NetBird 网格（D2:44 D2-07；测试环境用 OrbStack 网络，D2:59）；<br>• `Pepgent/iac` 的中心主机 VM（D2:58 D2-21）。<br>只有 F 流程直接要用的才实现，例如 F14 要模板身份（REM-05）。<br>**P5 作业列表分两部分：**<br>• 只读部分进入 MVP：算力页从 remote 的运行记录列出作业（新增只读操作 `remote runs`，REM-06），再按 run id 读 `status` 和 `tail`。F17 的 S2 和 F31 第 ④ 步要求算力页显示作业与日志尾部，这是用户流程（FC:299、499），D8-01 不允许缩减。D7-12、D7-18 正在同步修订，以与本行一致；<br>• 控制部分不进入 MVP：`restart`、`destroy`、`new_sandbox`（D7:72）列入 D9 输入 | **选定：** 守住 D8-01 的“用户说过的流程”；对用户没要求的流程，既不擅自扩大成 MVP 门槛，也不丢弃，交给 D9 判定是“面”还是“线”。<br>**朴素方案：** 全部实现。这超出 F 流程，属于导师所说“adjacent work to stay out of”。<br>**实质不同的方案：** 直接忽略。U23 要求的盘点会漏项 | 意图 | 是 |

## Current matrix rows (verbatim)

| 流程 | 通过判据（可观察的下游事实） | 段 | 环境 | 组件 | 驱动 | 特有证据 |
| --- | --- | --- | --- | --- | --- | --- |
| F01 定制加载、根 atom、`stop`（FC:51-58） | ① A0 通过（D8-03）。<br>② 根 omp 只装了发行 tar，以 Mux 写方 dial 启动。脚本 prompt 调用 `soroi_eval{mode:"formal", code:"const temp_2200c = 2200\nstop(temp_2200c)"}`，这一步以 `POST /runs/steps{run:{kind:"open"}}` 提交；随后根会话的 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次，调用 `POST /runs/{run}/end`，store 返回 `Ended{seq}`（D6:33、115-118）；工具结果为 `runEnded: true`。<br>③ `GET /runs?state=Ended` 含这次运行，它的 `holder` 等于根会话 `get_state.sessionId`。<br>④ `GET /runs/{run}/graph`：有一个 `Root temp_2200c = 2200`，`unconsumed` 为空。<br>⑤ `/runs/{run}/stream?after=0` 的序列依次是 `run_started`、`step_committed`、`atom_stopped`、`run_ended`（D6:48） | A0、S1 | L | IMG-01、DIST-01/03、MUX-01/02/08、STO-01/02/03/12、SOR-01/02/03 | `pty/a0-install.sh`、`s1/f01.spec.ts` | 发行 tar 哈希；`ls -A $HOME` 输出；`POST /runs/{run}/end` 的请求与 `Ended{seq}` 响应原文；graph 与 stream 原文 |
| F02 未消费提醒推动 AI 逐步写（FC:67-74） | ① 第 1 步（脚本）提交后，`GET /runs/{run}/state.unconsumed` 非空。<br>② 第 2 条 prompt 只说“继续消费未消费的 atom，消费完调用 stop”，不给 atom 名。之后 AI 发出的每个 `soroi_eval` 的 `code`，都引用了上一步 `state.unconsumed` 里的名字。<br>③ 各步依次 `step_committed`；最后一步提交之后，根 supervisor 确认没有活动的正式 eval、也没有未释放的批次，调用 `POST /runs/{run}/end`，store 另写 `run_ended`（D6:33）。<br>④ graph 的每条边都从已提交的 atom 指向后一步的调用。<br>⑤ 提醒本身有直接证据：第 2 条 prompt 之后、第一次请求模型之前，SOR-08 记下的提醒条目（transcript 自定义条目，不进模型上下文）里，atom 集合等于当时的 `/runs/{run}/state.unconsumed`，每行符合 D5-13 的 `名字 = 预览 ← fn(参数) @env`（D5:88） | S1 | L | SOR-08、STO-03 | `s1/f02.spec.ts` | 每轮前的 state 快照；提醒条目原文；工具参数 |
| F06 Program 捕获（FC:131-143） | `anneal` 正式运行后，graph 节点满足：`body:"Program"`，`version` 等于 bundle 哈希，`GET /versions/{v}` 返回的 `NodeVersionRecord` 带 commit 与 lockfile（D6:49）；`GET /captures/{identity}` 返回的 `CaptureRecord.inputs` 是按位置排列的输入值身份（D6:87-91、191；graph 的 `Call` 节点不带 `inputs`）。`File` 输出 `GET /objects/{h}` 的 sha256 等于 `h`，标量输出等于节点代码按输入应得的值 | S1 | L | SOR-06、STO-04/11、LIB-01 | `s1/f06.spec.ts` | 版本记录与对象哈希 |
| F11 按身份复用（FC:203-213） | 运行 A 中执行 `const y1 = calc(x1)`；运行 B 中执行 `const y2 = calc(x2)`，`x2` 与 `x1` 值相同、名字不同。B 的这次调用：stream 里是 `call_adopted`，来历是 `Adopted`，capture 身份等于 A 的（D6:31）。不以 activity 中有没有区间作判据：activity 按 D6-10 列出每个调用的原始时刻（D6:38） | S1 | L | SOR-02/06、STO-03 | `s1/f11.spec.ts` | 两次运行的 capture 身份 |
| F15 远程 Program（Slurm）与 dry run 试跑（FC:262-274） | ① `dry_run` 在 `soroi-slurm` 上执行 `calc`：`remote status` 给出 slurmrestd 作业 id，`/slurm/v0.0.44/job/{id}` 为 `COMPLETED`。作业脚本依次执行了 copy-in、`boot.js` 的 runner、copy-out：在 eval 调用返回之前，`GET /transfers/{t}/volumes/{position}/files/soroi/result.json`（D6-07 的 EvalTransfer 路径，D6:147）读到正确的值，这个值出现在 `CallReport` 里。调用返回后，同一个 URL 返回 404，store 的 seq 不变（D4:67）。返回前 200、返回后 404 都在同一 URL 上判定，所以 404 只能来自暂存区被删除<br>② 同一步以 `formal` 提交：捕获的 env 身份来自 Slurm 模板，产物已入对象库。<br>③ `remote remove` 之后，作业目录已删除。<br>（导师：Slurm 能连通、作业能提交，都不能证明 F15） | S1 | S | REM-01/02/03/05、IMG-03、ENV-04、SOR-17a/17b | `s1/f15.spec.ts` | slurmrestd 作业原文；拷回的 volume 清单 |
| F22 一步多路并发与汇总（FC:361-376） | ① 一步平铺 5 条 `run_*` 调用，先 dry run，再 formal：activity 显示至少两条区间相交。stream 中这 5 次调用属于同一个 `step_committed`，提交之前没有任何一次单独提交。<br>② 下一条 prompt 不给名字，AI 的下一次 `soroi_eval` 把 5 个产出名都传给 `compare_scores`。<br>③ 根会话的工具里没有 `fork`、`fork_task`（U24）。<br>④ 第 ② 步请求模型之前 SOR-08 记下的提醒条目列出全部 5 个产出，每行都带来源签名 `← run_*(…)`（FC:368；D5:88）。<br>**第二部分：多个中心 worker 分头写步（D5-07、D5-12，D5:82、87）。**<br>⑤ 主 agent 用一次带 `purpose` 的 `soroi_task` 派出 N=3 个 `writesEval` 为真的中心 worker，各自在同一运行里用 `soroi_eval` 写一步。最后一个 worker 的任务含 `slow_step`，所以它最晚交回。<br>⑥ 读方流上看到前 N−1 个 worker 的 `soroi_return` 被接受之后、第 N 个交回之前，LabStandIn 给主 agent 发一条不调用工具的 prompt，迫使它请求一次模型。这次请求前 SOR-08 记下的提醒条目里，没有这批 worker 的任何产出，尽管这些步已经在 store 里提交。<br>⑦ 第 N 个 `soroi_return` 被 supervisor 接受之后，主 agent 下一次请求前的提醒条目一次列出这批全部产出，组头是 `purpose`。<br>⑧ stream 中这批的每个 `step_committed.step.session` 都是写这一步的 worker 的会话 id，而不是根会话的（D6:31）。<br>⑨ 运行结束仍由根 supervisor 调用 `POST /runs/{run}/end`；批次释放之前，它不发这个请求（D6:33） | S1 | L | SOR-05/08、SOR-12、STO-06、LIB-01 | `s1/f22.spec.ts`（两部分都由 E2E-13 收口） | activity 原文；各次提醒条目原文与时间戳；worker 的 `soroi_return` 帧；`step_committed` 原文；工具清单 |
| F24 改参数或函数体，派生运行（FC:395-405） | 分 `InFlight` 与 `Committed` 两种：<br>① 派生后有新运行 R'，`derivedFrom` 指向 P。P 尚未结束时，同一事务里写 P 的 `run_aborted`，返回 `parentAborted: true`；P 已结束时不追加中止，返回 `parentAborted: false`（D6:44、131）。P 原有的 `graph?at=<派生前 seq>` 与派生前完全相同。<br>② R' 中上游调用是 `call_inherited`，来历是 `Inherited`（不以 activity 有无区间判定）；被改的调用以新输入或新版本执行。<br>③ 随后根会话收到带人类来源的 IRC，开始新的一轮（D5:91）。<br>`ChangeVersion` 的新函数体，S1 由脚本直接 commit 进 `lab-library`；S2 走 `library.apply`。<br>S2 两条子路径都要走：在实验详情页改参数派生（`ChangeInput`），以及在节点库页暂存改动后 `library.apply`、再从实验详情页按新版本派生（`ChangeVersion`）；两次派生的导航都能显示“派生自” | S1、S2 | L、P | SOR-15、STO-09、LAB-08/10、WEB-03 | `s1/f24.spec.ts`、`e2e-lab/F24.md` | 派生前后两份 graph |
| F31 Pepgent 调用核心，走通全链路（FC:493-507） | 浏览器中按顺序完成 FC:496-501 的六步：<br>① 登录，在讨论页装载历史产物，发出目标；<br>② 由讨论启动实验：`experiment.start` 建 `pending_launch`，免审批为 `sent`、需审批为 `awaiting_approval`，`experiment.approve` 之后向原讨论会话投递草稿；`run_started` 后写 `experiment_ext.draft` 并删除这条 `pending_launch`（D7:66、161-162、250-254）；<br>③ 会话依次 dry run、正式运行，节点包括本机 Program、远程（Komodo）Program 和 Agent；<br>④ 实验详情页与算力页实时显示 DAG、subagent 流、容器日志尾部；<br>⑤ 做一次 F23 和一次 F24；<br>⑥ 运行结束后，数据集页出现产物及来源，runner workspace 可浏览，A-01 的复盘写回原讨论。<br>每一步都按 D8-10 三处核对。并且 Lab 进程只有 D8-04 的四条线 | S2 | PK（可选加 PS） | 全部 LAB、WEB、DEP | `e2e-lab/F31.md` | 全程截图与网络日志 |

## Current §4.1 VS1 steps (verbatim)

**第一条垂直切片 VS1。** 它的目标是一个问题：从发行 tar 装进干净 omp 的 soroi，能否被写方经 Mux dial 起来，写出一次正式运行，并由 store 确认 `run_ended`？

VS1 走的路径，依次是：

1. 本地仓库里的 omp-agent 镜像；
2. 安装发行 tar；
3. `store` 和 `mux` 以 compose 拉起；
4. LabStandIn 声明写方、开代、dial；
5. 根会话执行 `soroi_eval formal`；
6. `POST /runs/steps`（`open`）；
7. 根会话的 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次，调用 `POST /runs/{run}/end`，store 返回 `Ended{seq}`（D6:33、115-118）；
8. `graph`、`stream` 的断言（F01 行）。

VS1 只含 18 个切片，不含任何节点、subagent、远程或 Lab。它覆盖了 Pepgent 调用 soroi 的全部骨架：写方、dial、RPC、store。最便宜的早期观察是 ENV-02：模型凭据通路（EP1）若不成立，后面所有 e2e 都无法运行。所以 ENV-02 排在 VS1 的最前面。


## Current §4.2 requested slice rows (verbatim)

| ID | 切片 | 依赖 | 解锁 | 验收 | 档位 |
| --- | --- | --- | --- | --- | --- |
| MUX-03 `VS2` | 读方：命令白名单、id 加前缀、广播、`mux_welcome`、代的事件（D3:60） | MUX-01 | F07、F19、F26 | 读方能读到 stdout；读方发 `get_messages` 后，response 广播给所有连接，只有请求方按自己的 `r{conn}:` 前缀认领（D3:60）；读方发 `prompt` 被拒绝 | low |
| STO-02 `VS1` | `POST /runs/steps`：`open` 或 `existing`、一个事务、事件、`StepCommitted`；`POST /runs/{run}/end`：在请求的事务里确认未消费集合为空才写 `run_ended`，返回 `EndResult`（`Ended{seq}` 或 `NotEmpty`）（D6:32-33、115-118） | STO-01 | 全部 | 用 HTTP 夹具提交 F01 的那一步后调用 `/end`：返回 `Ended{seq}`，事件顺序正确；未消费非空时返回 `NotEmpty`，不写任何记录 | mid |
| STO-09 | `POST /runs/derive`、`/runs/{run}/abort`（D6:44、33） | STO-02 | F17、F24 | 一个事务里完成：P 未结束时写 `run_aborted`，R' 写 `Inherited`、继承的停止记录与新根 atom；返回 `Derived{run, seq, parentAborted}`（D6:44、131） | mid |
| STO-12 `VS1` | store 镜像与 compose 服务；发行导入 `PUT /releases/{version}`（正文是 artifact 字节，带声明的 sha256）：同一事务校验哈希，把 boot、runner、定制 tar 各自按内容哈希放入对象目录，写 `ReleaseRecord`；`GET /releases`（D6:50、155-158）。init 在 store 就绪后调用一次。`boot.js` 的 program、agent 分支分别随 SOR-17a、SOR-18 进入发行物，届时由 DIST-01 重新产出 | STO-01、DIST-01 | 全部 | 冷启动后 init 返回 `ReleaseRecord`；`GET /releases` 有这条记录，它引用的 boot、runner、定制 tar 都能 `GET /objects/<哈希>`；哈希不符时不写任何记录 | low |
| SOR-03 `VS1` | 运行生命周期：第一次正式提交带 `open`；根会话的 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次后，调用 `POST /runs/{run}/end`，不论最后一步由哪个会话提交（D6:33） | SOR-02 | 全部 | F01 以 `Ended{seq}` 和 `run_ended` 结束；批次未释放时 supervisor 不发 `/end` | mid |
| SOR-08 | 未消费提醒，格式与可见范围按 D5-13；批次分组在 SOR-12 补上（D5:88）。每次注入的提醒原文另记一条 transcript 自定义条目，不进模型上下文，作为可读事实（EP7） | SOR-02 | F02、F08、F22、F23 | 提醒每次请求前从 `/runs/{run}/state` 现算未消费 atom，再按该会话的 `Subagents.visibility` 过滤；内容等于过滤后的可见未消费集合，未释放批次的产出只对产出它的 worker 子树可见（D5:86-88）；每次注入都有一条对应的自定义条目，正文与注入文本相同 | low |
| SOR-13 | 每个 `writesEval` 为真的会话注册控制端点 `eval:<session>`，提供 `slots(runId)`、`answer`、`takeover`；只有根会话的端点另答 `writers(runId)`（D5:89、301-311；D3:73）。整个运行的 `abort` 发到根端点（D7-09）。`human()` 构造器 | SOR-02、SOR-11、MUX-06 | F08、F23 | 经 Mux 能读到槽位，`answer` 能结束槽位 | mid |
| SOR-17a | 远程 Program 的正式运行路径：暂存区、`call.json`、`RunRequest`、`remote` CLI 客户端、等到终态、取回结果、随步提交、`remove`；`boot.js` 的 program 分支（D4:51-54）。终态有两种：`Ended`（拷出已送达）与 `EndedUnstarted{ended_at}`（排队后被取消、从未开始，leader 技术裁决 PM#4）；后者没有拷出，这次调用记为失败，不读暂存区 | SOR-06、STO-04、REM-05、REM-07 | F14、F15、F18 | 在 Komodo 上跑通一次 formal：结果随步提交，Stack 与卷已删除。`EndedUnstarted` 分支在 Slurm 上由 E2E-17 验证（排队中取消，中间件不读暂存区，`remove` 在终态之后成功） | mid |
| SOR-20 | 远程中止：Program 用 `remote abort`，等到终态（`Ended` 或 `EndedUnstarted`）再 `remove`；Agent 按顺序停止。dry run 零写入的回归检查（D6:43；D4:67；PM#4） | SOR-14、SOR-18 | F04、F17 | 远程 Agent 中止后，transcript 回到中心；中止一个仍在排队的作业得到 `EndedUnstarted`，随后 `remove` 成功 | low |
| REM-01 | Slurm 后端的 `run` 与 `status`：经 slurmrestd 用 JWT 提交作业脚本（ENV-S:21-36），在集群可见的 `run_root/<run>/` 里依次 `apptainer exec` copy-in、body、copy-out，body 输出写到 `body.log`；status 读 `/job/{id}`。模板带两个根：集群可见的 `run_root` 与调用方可读的 `shared_root`（同一存储，测试环境里是 ENV-S:14 的 `/srv/pepgent-runs` ↔ `~/Ext/work/orbstack/pepgent-slurm/runs`），运行句柄记下两者推出的确切路径（leader 技术裁决 PM#4）。现状是“not implemented”（REM-RD:9） | IMG-03 | F15 | 跑通 REM-RD 的示例请求，`status` 为 `ended`，PUT 目标收到 tar；`shared_root/<run>/body.log` 在调用方可读 | mid |
| REM-02 | Slurm 的 `tail`（读 `shared_root/<run>/body.log`）、`abort`（取消后等到终态）、`remove`（等到终态后清理 `run_root/<run>/` 再记 `removed`）；排队中被取消的作业记 `EndedUnstarted`（REM-07，PM#4） | REM-01、REM-07 | F15、F17 | `tail` 返回 body 的输出；运行中 abort 得到 `Ended`，排队中 abort 得到 `EndedUnstarted`；两种终态之后 `remove` 都记下 `removed`，`run_root/<run>/` 不存在 | low |
| REM-06 | 只读作业列表 `remote runs`：读 remote home 里的运行记录 `runs/<run>.json`（REM-RD:52、94-96），列出每个作业的 run id、模板、后端、生命周期事实与起止时间；按 run id 的 `status`、`tail` 沿用现有操作。只读，不加任何控制操作（D8-16） | — | F17（S2）、F31 | 先后跑两个作业（一个 Komodo、一个 Slurm），`remote runs` 列出两条，字段与各自 `status` 一致；`remove` 后仍按记录列出，状态为 `removed` | low |
| REM-07 | `RunStatus` 与生命周期新增终态 `EndedUnstarted{ended_at}`（排队后被取消、从未开始）；`remove` 先等到终态（`Ended` 或 `EndedUnstarted`）再记 `removed`；Komodo 后端按同一规则处理；`remote schema` 输出随之更新（leader 技术裁决 PM#4） | — | F14、F15、F17 | `remote schema` 含新变体；Komodo 上一个已结束的作业 `remove` 照常记 `removed`；对一个尚未结束的作业调用 `remove`，等到终态后才记 `removed` | low |
| LAB-05 | `lab_*` host tools（D7:65、216-221） | LAB-04、STO-04 | F09、F31 | `lab_open_artifact` 把产物拷进本会话 worktree 的 `inputs/`，字节与 store 对象哈希一致；`lab_save_artifact` 在 worktree 里生成不可变快照 `artifacts/<hash>/<文件名>` 并登记 `artifact_meta`，不写 store（D7:65、67、219） | low |
| LAB-11b | 草稿与启动：`draft.save`、`experiment.start`、`experiment.approve`；启动意图与审批状态记在 `pending_launch`，运行绑定记在 `experiment_ext.draft`，不往草稿写 `launched`（D7:66、161-162；D6:40） | LAB-04、LAB-06 | F27、F31 | 草稿只在 `lab.sqlite`，不进 store；免审批时 `pending_launch` 为 `sent`、会话收到含草稿的 prompt；`run_started` 后 `experiment_ext.draft` 指向该草稿，`pending_launch` 已删除 | low |
| LAB-12 | 算力页的只读读取（D7-12、D7-18；D8-16）：`lab.page.read{lab, page:'clusters'}` 返回 `templates`、`jobs: {run: RemoteRunSummary; status: RunStatus}[]`、`presence`；日志尾部另由只读 SSE `GET /api/lab/jobs/{run}/tail` 提供（`remote tail` 快照，有订阅者时定期取）。有订阅者时定期调用 `remote runs`、`remote status`，变化经 `/api/lab/events` 的 `compute` 频道通知重读；作业最新事实为 `Removed` 时不开 tail 流（D7:72、78、145-146）。第一版无命令 | REM-05、REM-06、MUX-04 | F17、F31 | 一个运行中的远程作业出现在页面线数据里，带模板与状态；tail SSE 推送它的日志尾部；作业结束后 `compute` 通知触发重读、状态更新；排队中被取消的作业显示终态 `EndedUnstarted`（PM#4）；`remove` 之后不再开 tail 流 | low |
| WEB-07 | 阶段 B 一次落地：放宽 id、把剧情字面量改成数据事实、`AgentTemplate.id` 改为 omp agent 定义名、`AgentTemplate.harness` 收窄为字面量 `'omp'`（D7:71、77）、运行时不再引用 `LAB_SNAPSHOT`；经 Main 与 UI 负责人协调（D7:77） | WEB-03–06 | S2 | 构建好的 host 在浏览器中走完 13 个页面，数据都来自后端（SMOKE:22-54） | mid |
| DIST-04 | full profile：central 挂载 remote home，含模板 `soroi-komodo` 与 Komodo 凭据；另把 Slurm 共享运行目录（Mac `~/Ext/work/orbstack/pepgent-slurm/runs`，ENV-S:14）挂到 `soroi-slurm` 模板的 `shared_root`；`soroi-slurm` 的模板项由 ENV-04 补上（D6:50；PM#4） | DIST-03、DEP-02 | F14–F18 | central 中 `remote templates` 列出 `soroi-komodo` 及其 `identity`；central 里 `shared_root` 能读到 Slurm 作业写下的文件 | low |
| DEP-01 `VS2` | 在隔离的 Komodo 上建 Stack `pepgent-central`：`lab-web`、`store`、`mux` 三个容器和它们的持久卷；`lab-web` 另把 Slurm 共享运行目录（Mac `~/Ext/work/orbstack/pepgent-slurm/runs`，ENV-S:14）挂到 `soroi-slurm` 模板的 `shared_root`（PM#4）；ResourceSync；凭据由本地私有文件写成 Komodo Variable，不解密任何 SOPS（规则《凭据规则》第 4 条）。先登记台账 | IMG-04、STO-12、MUX-08 | S2 | `DeployStack` 成功（ENV-K:84 的检查法）；重建容器后，各卷仍在；`lab-web` 里 `shared_root` 能读到 Slurm 作业写下的文件 | low |
| DEP-03 `VS2` | `pepgent-central` 的 store 就绪后，init 以 `PUT /releases/{version}` 提交发行 artifact（D6:50、155-158） | STO-12、DIST-01 | S2 | `GET /releases` 有这条 `ReleaseRecord`，它引用的对象都能 `GET /objects/<哈希>` | low |
| ENV-04 | 用 `token.sh` 签发 Slurm JWT，写进 central 和 lab-web 容器 remote home 的 `credentials.toml`，写的时候不打印，有效期覆盖一轮验收（EP5）；两个 remote home 的 `config.toml` 加上模板 `soroi-slurm`（指向 IMG-03 的 SIF；`run_root = /srv/pepgent-runs`，`shared_root` 为容器内挂载点，PM#4） | REM-01、IMG-03、DIST-04、DEP-02 | F15 | 两个容器里 `remote templates` 列出 `soroi-slurm` 及其 `identity`，`remote status` 能读到一个 Slurm 作业，`remote tail` 能读到它的 `body.log` | low |
| E2E-13 | F07、F19、F22 的 spec（读方客户端在此补齐）。F22 两部分都在这里收口：第一部分是一步内 5 路并发；第二部分（矩阵 F22 ⑤–⑨）是多个中心 worker 的批次屏障，前 N−1 个交回时主 agent 的提醒里没有这批产出，全部交回后以 `purpose` 为组头一次出现（D5:87） | SOR-08、SOR-11、SOR-12、MUX-03、MUX-04 | F07、F19、F22 | 通过 | low |
| E2E-17 | F15 的 spec；另验证 Slurm 作业的 `remote tail` 经 central 的 `shared_root` 读到 body 输出，以及排队中取消得到 `EndedUnstarted`（PM#4） | REM-01–03、SOR-17a、SOR-17b、DIST-04、ENV-04 | F15 | 通过 | low |

Vote rows D8-01, D8-03, D8-04, D8-09, D8-13, D8-14, D8-16: ID | 票 | 理由 | 反例 (反对时必填)
