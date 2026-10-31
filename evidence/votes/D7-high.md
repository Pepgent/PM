# D7 Lab 业务后端决策表 · task:high 选票

投票者：task:high（Governance_e826.HighD7），Claude 族的独立票。
对象：`pepgent-pm/evidence/decisions/D7-lab-backend.md` 的 D7-01 至 D7-21，以及 leader 对文末四个关注点的技术立场。

核对范围：
- 单一权威源与生命周期锚点；
- 与已通过的 D2（`D2-components.md`）、D3（`D3-network-mux.md`）以及 D4–D6 定稿是否一致；
- U23（agent 核心与点、线、面）、U24（soroi 独立，不混 omomp）。

D7 全文没有引入 omomp 的任何机制（fork、peers、tern、todo-more），soroi 也不反向依赖 Pepgent，所以没有与 U24 冲突的条目。

按 `design-assumes-it-works.md`，下面的反对票只用主路径上的数据流断裂或与已通过条目的冲突，不用失败分支、竞态、重试或安全加固。

## 逐行投票

| ID | 票 | 理由 | 修改建议 |
| --- | --- | --- | --- |
| D7-01 | 赞成 | 同进程隔离区沿用了 server function、`OperationResult` 和 SSE 路由这些约定，D2-14 已经选定这一形态（D2:51）。Lab 区不经过 `runOperation` 等待 Paseo，满足 D2-19。中间件按面分流以后，旧面的行为不变。 | — |
| D7-02 | 赞成 | 表里只放 Lab 是权威的事实，以及以外部主键为键的扩展。运行状态、transcript、模板和构建记录都不存，与 D2-14“实验只存运行 id”（D2:51）、D6-12 一致。 | ① `conversation` 行加上该会话的编写 worktree 路径，跟随 D7-04 的修改。② `activity` 只记 Lab 自己产生的事件，例如成员操作、结论确认。运行的开始与结束从 store 的生命周期流投影出来，不再抄一份进表 |
| D7-03 | 赞成 | Better Auth 的 organization、member、invitation 作为成员、角色、邀请的唯一权威，落实了 D2-17 的占位。权限只由 access control 判定，Lab 表里没有第二份判定。 | 引用写错了：D3 里没有 `X-Principal` 这个 header。D3-12 写的是“`principal` 由这条连接在帧里给出，mux 不信任任何自报 header”（D3:66），帧格式见 D3 §4（D3:123-125）。这里应改为“当前用户 id 作为 `mux_human_irc*` 帧的 `principal` 字段，由 Lab 的受信 reader 连接发出” |
| D7-04 | **反对** | 一种根会话，来源用 ADT 区分，启动步骤与 D3-07、D3-09 的顺序一致，这些都成立。问题出在两处，都与已通过的条目冲突：<br>**① cwd 用了中心检出。** 本行和接口草图（D7:201）都写“cwd 是 Lab 库检出”。D2-12 规定：“每个根会话另有一个编写用的 worktree：一份独立的 git clone……作为该会话 omp 进程的 cwd”，“会话 worktree 里尚未合入的改动是该会话节点草稿的权威”，“只有中心检出是远端默认分支的近处副本”（D2:49）。D2-15、D2-20、D2-25 也都写了这个 worktree 由 Lab 后端在启动前创建（D2:52,57,62）。<br>*场景：* 讨论 A 里，AI 改了 `nodes/anneal.ts` 并做 dry run，人还没确认合入。第二天，成员在讨论 B 里正式运行一步，其中调用了 `anneal`。<br>*在哪里失效：* 两个会话共用中心检出作 cwd，B 的 eval 会打包 A 的未确认草稿，把它当作新版本正式运行，并提交进 store。B 的人从没写过、也没确认过这个函数体。另外，中心检出里留着草稿，就不再是默认分支的近处副本，D2-12 的权威划分被打破。<br>**② root eval 模块拿不到注册端点所需的 env。** D3-19 要求每个写 eval 的会话“出示所在进程这一代的 `MUX_GENERATION` 与 `MUX_TOKEN`（写方启动 dial 时放进 env）”（D3:73）。本行只把它们作为 dial 的 `--generation`、`--token` 参数，env 里只有 `SOROI_ROLE`、`SOROI_STORE_URL`、`SOROI_MUX_URL`。<br>*场景：* F31 第 5 步，人在实验详情页接管一个在途调用。<br>*在哪里失效：* 根会话的 eval 模块读不到这两个值，就注册不了 `eval:<根 session id>`。于是 D7-08 的 `writers(runId)` 和 `slots`，以及 D7-09 的 `takeover`、`answer`、`derive`、`abort`，都没有端点可以送达 | 按 ①②③ 修改，我改投赞成。<br>① 启动配方加一步“创建会话 worktree”：Lab 在 `open` 时从 Lab 库远端 clone 一份独立 worktree，放在会话 worktree 卷上（D2-20），作为 dial 的 cwd。路径记进 `conversation` 行。草图 D7:201 同步修改。<br>② env 加上 `MUX_GENERATION`、`MUX_TOKEN`，与 D3-19、D3 §4 一致。dial 本来就把它们当作 `--generation`、`--token` 的默认值。<br>③ 补全会话的生命周期锚点：开始 = worktree 创建、写方声明打开、`conversation` 行写入；每一代嵌在声明里（D3-07）；结束 = 会话删除，先结束在线的代，再关 `/writer`，最后删 worktree（D2-20“会话删除时删除它”） |
| D7-05 | **反对** | 用写方注册 host tools 来承载业务工具，方向正确（D3-06、D3-10），soroi 也不需要认识 Pepgent。失效在 `lab_save_artifact`：它调用 `PUT /objects/{sha}` 把字节存进 store，而定稿的 D6 没有这个端点。D6-07 写的是“所有尚未提交的字节都先进暂存区，没有提交前的通用对象上传”，“没有提交的字节永远不会出现在对象目录里”（D6:35）。D6 的接口草图里，对象目录只有 `GET /objects/{sha256}`（D6:127-133）。<br>**场景：** F31 第 1 步之后，讨论里的 AI 分析了装载的谱图，写出 `analysis/peaks.csv`，然后调用 `lab_save_artifact{path, role}`。<br>**在哪里失效：** 没有可调用的端点。即使给 store 补一个，对象目录里也会出现没有任何提交引用的字节，违背 D6-07 的不变量。Datasets 页随后用 `/api/lab/objects/{sha}` 取这个产物，也取不到 | 按下面修改，我改投赞成：讨论里产生的产物，字节留在该会话的 worktree 文件里，worktree 是这些字节的权威（D2-12、D2-20）。`lab_save_artifact` 只登记 `artifact_meta{conversation, path, sha, role}`。`/api/lab/objects/{sha}` 遇到这类产物，从 worktree 读字节。AI 之后把它作为某次正式运行的根 `File` 输入时，由 eval 中间件按 D6-07 放进这次调用的暂存区，随那一步提交进入对象目录。`lab_open_artifact` 只用于已提交的 store 对象（`GET /objects/{sha}` 合法），写到会话 worktree 里，不写“会话目录”。如果坚持在任何运行之前就把字节放进 store，那就需要修订 D6-07，不能在 D7 里单方面引用 |
| D7-06 | 赞成 | 实验与运行 1:1，运行状态只从 store 读；`experiment_ext` 只存以 `RunId` 为键的展示事实。把 D6-12 读作“讨论会话”，与 D2-15“一次实验是根 omp 会话下的一次 soroi 运行”（D2:52）一致，也与用户选择的“一人一会话”一致。事件流只触发 Lab 分配编号，不生成业务对象。 | 草稿绑定的判定写清楚：一份已 `launched` 的草稿，只绑定该会话在 `launched.at` 之后第一个不带 `derivedFrom` 的 `run_started`，绑定结果记在 `experiment_ext.draft`。Panel 或 Automation 来源的运行没有讨论可取名，名称与项目分别取 `Panel.scope`、规则的作用范围 |
| D7-07 | **反对** | transcript 只认 omp 一个源；停驻时读会话文件，不唤醒（D3-11）；附件与绑定归 Lab。这些都成立。但“讨论来源的产物：字节进 store 的对象目录（D6:35 D6-07 允许‘人类上传’）”引用错了。D6 的“人类上传”只出现在 `PUT /transfers/{t}/objects/{sha256}`（D6:129），也就是一次 eval 调用暂存区里的人类交回文件，不是讨论里的上传。场景和失效位置同 D7-05 | 按 D7-05 的修改，把“讨论来源的产物”改为：字节在会话 worktree 里，`artifact_meta` 只登记元数据；作为运行输入时，按 D6-07 随那一步提交进 store。“实质不同的方案”一栏随之改写 |
| D7-08 | 赞成 | 已提交的事实读 store，在途叠加层读 `writers(runId)` 加各端点的 `slots`（D3-19、D6-11），agent 流用读方连接，远程批次走 files（D3-13），浏览器只连 Lab（D2-18）。变更推送只告诉浏览器“哪个切片变了”，不复制数据。 | 依赖 D7-04 的修改 ②，否则根端点不存在 |
| D7-09 | 赞成 | 每种介入都请求拥有方并等结论（D2-06）。根会话的人类 IRC 待投递表由 Lab 自己持有，子 agent 的待投递表由 subagent 模块持有，与 D3-12 的写方契约一致。按钮映射也与 D6-20 删除“暂停”一致。 | ① D5 §3.6 的 `EvalControl` / `RootEvalControl`（D5:302-311）只有 `slots`、`answer`、`takeover`、`writers`，没有本行用到的 `derive` 和 `abort`。“通过后要改的文档”加一行：D5 接口草图在根端点上补 `derive(parent, at, changes)` 和 `abort(run)`，两者分别对应 D6-16 和 D6-05 的中止。② 改函数体走派生时，持有会话的 worktree 要先快进到新的 commit，插件才能打包出新版本，见 D7-11 的修改 ② |
| D7-10 | 赞成 | 规则、审批和触发记录只在 Lab；事件来自 store 的生命周期流，游标存在 Lab；动作是开一个 `Automation` 来源的根会话。与 D2-16、D6-06 一致，store 没有长出调度器。复盘写回关联讨论时，可以由 `run_ended` 带的根 session 经 `conversation` 表找到讨论。 | — |
| D7-11 | **反对** | 当前定义只认 git，版本用 bundle 哈希，这些都成立。但有一条用户流程在 Pepgent 里没有入口：<br>**场景：** F28 第 1 步。讨论里的 AI 写了新节点 `nodes/xrd_fit.ts` 并 dry run 通过，人说“留下它”。<br>**在哪里失效：** D2-12 规定，AI 在根会话的 worktree 里写节点，“合入默认分支才算持久化……在 Pepgent 里由 Lab 后端在人确认后合入”（D2:49）。本行只有 `library_staging`，即 GUI 表单里暂存的定义改动，`LabCommand` 里的 `library.apply{fns}` 也只应用这份暂存。会话 worktree 里由 AI 写出的文件没有任何命令能合入，这个节点永远不会进库。<br>还有一处：人在节点库页 `library.apply` 之后，已有讨论的会话 worktree 仍是旧定义。在这些讨论里接着正式运行，用的还是旧版本 | 按 ①② 修改，我改投赞成。<br>① 加命令 `library.merge{conversation, paths}`：人确认后，Lab 在该会话 worktree 里 commit 这些路径，push 到默认分支，再快进中心检出。节点库页同时列出各会话 worktree 里尚未合入的节点草稿，标明来自哪个讨论。<br>② 每次 push 到默认分支以后（`library.apply`、`library.merge`、改函数体的派生），以及每一代启动之前，Lab 把相关会话的 worktree 快进合并到默认分支，保留其中未合入的草稿。<br>③ 顺手改掉“`AgentTemplate.harness` 见 D7-16”：这项改动在 D7-17 |
| D7-12 | 赞成 | 模板与作业只有 remote 一个源，Lab 不另存集群表，也不直连 Komodo 另持凭据。没有越过 D2-09 的“范围不变”（D2:46）。 | 能力的归属与第一版范围，见下面“对 leader 四点的表态”第 3 点 |
| D7-13 | 赞成 | 镜像定义、构建记录、tag 与 digest、模板资源，各自从自己的权威读写（D2-13、D2-09），Lab 没有镜像表。 | `build_push` 要先 commit 到 `Pepgent/images`，Lab 容器需要这个仓库的检出和写入凭据，见 D7-19 |
| D7-14 | 赞成 | 项目归 Lab；代码库只记远端、分支和密钥引用，状态从检出读；部署密钥由使用方 Lab 生成并持有，符合凭据规则。 | — |
| D7-15 | 赞成 | 模型目录的权威是 omp，切换模型经写方发 `set_model`；P10 已作为占位写明。 | — |
| D7-16 | 赞成 | 只把读取改成异步，数据仍是 fixture；feature 代码零改动，UI agent 的工作不受影响。loader 的做法与 `_app.tsx:25-26` 相同。 | — |
| D7-17 | 赞成 | 线上只传权威方自己的形状，布局和文案在客户端投影，服务端不编造整份 snapshot。id 放宽、剧情字面量数据化，都放在这一批里完成。 | `harness` 的改法见下面第 1 点：不要让它变成 `id` 的第二份拷贝 |
| D7-18 | 赞成 | 一个读目录、一个读页面、一个命令联合，由 TS 穷尽检查；输入用 Zod，沿用现有约定。 | — |
| D7-19 | **反对** | 镜像组成与 D2-20 一致：omp-agent 加 Node 加 apps/web，启动时从 soroi 发行 tar 安装定制。但卷和凭据清单少了主路径上要用的两项：<br>**① 会话 worktree 卷。** D2-20 把它列为 Lab 后端容器的持久载体之一（D2:57）。本行的卷只有“Lab 库检出、`$PEPGENT_LAB_HOME`、remote home”。D7-04 改正以后，worktree 没有地方放。<br>**② `Pepgent/images` 的检出与写入凭据。** *场景：* 容器页点 Build & Push（`image.build`）。*在哪里失效：* D7-13 要求先把定义 commit 到 images 仓库，再触发 `RunBuild`，但容器里没有 images 检出，部署注入的凭据里也只有 Komodo API 密钥，commit 和 push 都做不了 | 按下面修改，我改投赞成：卷加上“会话 worktree 卷”，生命周期按 D2-20 写；加上 images 仓库的检出，以及它的写入凭据（deploy key 由 Lab 生成并持有，与 D7-14 的 Lab 库部署密钥同一做法）。omp session 目录与 `lab.sqlite` 在 D2-20 里是两个写方不同的载体，建议分成两个卷，不再一起放在 `$PEPGENT_LAB_HOME` 下 |
| D7-20 | 赞成 | 依赖只有一个方向：Pepgent 只经四条线调用 soroi，拿掉 Pepgent，soroi 仍能走通全部流程（D2-25）。以 18 个字段作为 D9 的对照表，与 F32（FC:510-516）一致，满足 U23 的“作为 pepgent 的 agent 核心”和“知道缺失的点、线、面”。 | — |
| D7-21 | 赞成 | 用户原话是“先不动”“现有的ai应该完全用不了”（inv/s-pepgent.md:104），D2-19 也写了这一点。 | — |

## 对 leader 四点的表态

1. **`AgentTemplate.harness` 改为 omp agent 定义名（U13）：赞成方向，字段语义要改一下。** 原型的 `claude | codex | pi | opencode` 与 U13“核心的ai harness，不能偏离以omp为核心”冲突，必须去掉。但按 D5-17 和 D7-11，模板本身就是 omp agent 定义，`AgentTemplate.id` 就是定义名。如果把 `harness` 也设成定义名，它要么永远等于 `id`，成了要保持一致的第二份拷贝；要么指向别的定义，而 omp 的定义没有继承关系，这个指向没有意义。例如 `agentTemplate.duplicate` 复制 `xrd-analyst` 得到 `xrd-analyst-copy`，新模板的 `harness` 该填哪个名字，回答不了。建议：`id` 就是定义名；`harness` 删掉，或者收窄成字面量 `'omp'`；`harnessVersion` 取容器里 omp 的版本。
2. **旧 `_app` 面不动，Lab 服务只监听本机或内网：赞成。** 草稿建议让旧面也要求 Lab 登录，这会改变旧面的行为，就是“动”，与“先不动”（inv/s-pepgent.md:104）和 D2-19 冲突。旧面的令牌暴露属于安全加固，设计阶段不作为理由。成员经内网或 NetBird 网格访问 Lab（D2-07），没有哪条 (U) 要求公网暴露。D7-01 只在中间件里按面分流，旧面仍走 `serverRuntime()` 和本机令牌，行为不变。
3. **P4–P7 归 remote 模板目录与 `Pepgent/iac`；第一版不实现集群健康和交互 shell，在 D9 差距分析里列为缺失的面：赞成，并做两点澄清。**
   - P4（健康、容量）和 P6（交互 shell）不是 soroi 的流程。把它们作为 D9 里缺失的“面”记录下来，正是 U23“知道 pepgent 和 soroi 之间缺失的点，线，面”所要的产出；F32 也把“集群控制器接入向导”“镜像预检流水线”列为这种“面”（FC:516）。这是有记录的差距，不是 U2 所说的擅自收缩。
   - P3（模板元数据）和 P5（作业列表）要在第一版里由 remote 实现，不能一起推到 D9。D2-09 已经把“GUI 展示所需字段”列为 remote 的新增；集群页的 `clusters.jobs` 和容器页的 `liveContainers` 都依赖 P5。如果 remote 不提供作业列表，Lab 就得自己记一份它启动过的作业，形成第二份作业登记。P7 拆开处理：往 remote 目录登记新后端，就是 D2-09 已有的模板写入，第一版可用；主机与控制器的安装归 `Pepgent/iac`，第一版不实现，列入 D9。
4. **D6-12 的读法（讨论即会话，实验跑在讨论会话里）：赞成。** 见 D7-06。

## 计票

赞成 16 · 反对 5（D7-04、D7-05、D7-07、D7-11、D7-19）。

每张反对票都附了场景、证据、失效位置，以及我改投赞成的条件：
- D7-04、D7-11、D7-19 都源于同一处：与已通过的 D2-12、D2-20 的“每个根会话一个编写 worktree”不一致。D7-04 另有一处是缺少 D3-19 要求的 env。
- D7-05、D7-07 源于同一处：引用了定稿 D6 里不存在的 `PUT /objects`。
