# D7 Lab 业务后端决策表 · task:high 第 2 轮选票

投票者：task:high（Governance2_880f.D7HighR2），Claude 族的独立票。

对象：`decisions/D7-lab-backend.md` 修订后的 D7-01 至 D7-21。第 1 轮选票是 `votes/D7-high.md`，回应表是 `decisions/D7-r1-responses.md`。

核对方法：
- 第 1 轮的 5 张反对票（D7-04、05、07、11、19），逐条对照我当时写的改投条件，看修订正文是否满足；
- 第 1 轮附了建议的赞成行（D7-02、03、06、09、13），看建议是否落实，有没有带出新的断裂；
- 回应表引用的已通过条目逐一回到原文核对：D2-12、D2-15、D2-20（D2:49-57），D3-07、D3-12、D3-19 与 §4 的 `ReaderUp`、dial 命令行（D3:61-73,121-125,161-165,189），D5 §3.6 的 `HumanHandback`、`RootEvalControl`（D5:299-311），D6-05、D6-06、D6-07 与 `/stream/lifecycle` 的形状（D6:33-35,212）。

按 `design-assumes-it-works.md`，反对票只能用主路径上的数据流断裂，或与已通过条目的冲突。下面“附注”只是措辞或类型上的改进，不是改投条件。

## 逐行投票

| ID | 票 | 理由 | 反例 |
| --- | --- | --- | --- |
| D7-01 | 赞成 | 第 1 轮赞成，本轮正文未改，理由不变：同进程隔离区，Lab 区不经 `serverRuntime()`，中间件按面分流，旧面行为不变（D2-14、D2-19）。 | — |
| D7-02 | 赞成 | 第 1 轮的两条建议都已落实：`conversation` 含编写 worktree 路径；`activity` 只记 Lab 自己产生的事件，运行起止在读取时从 store 生命周期流投影。新增的 `pending_launch` 是显式命令留下的意图记录，`deploy_key` 是 Lab 作为使用方持有的凭据，都属于“Lab 是权威的事实”。“会话 worktree 的文件不存”与 D2-12 一致：worktree 是会话草稿的权威，表里不再抄一份。<br>附注：`artifact_meta` 没有照我第 1 轮的建议记 `sha`。字节的权威是 worktree 里的文件，表里再记一份哈希就是可能过期的副本，不记反而更对。 | — |
| D7-03 | 赞成 | 引用已改正。`principal` 由 Lab 的受信 reader 连接写进 `mux_human_irc*` 帧（D3:66；`ReaderUp` 见 D3:121-125），同一个用户 id 作为 `HumanHandback.by`（D5:299 定义为 `by: string`）。`approve` 拆成独立权限，与 `startWithoutApproval` 分开，D7-06、D7-10、D7-14 的引用一致。 | — |
| D7-04 | 赞成 | 第 1 轮的两处冲突都已消除：<br>① **cwd。** 每个会话首次启动前，从 Lab 库远端克隆一份独立 clone 作为所有代的 cwd，删除会话时删除。与 D2-12“一份独立的 git clone……作为该会话 omp 进程的 cwd”、D2-15、D2-20 一致。我第 1 轮的场景（讨论 A 的未确认 `anneal` 草稿被讨论 B 正式运行打包）不再成立：B 的 cwd 是 B 自己的 clone。<br>② **env。** dial 的 env 里有 `MUX_GENERATION`、`MUX_TOKEN`，omp 继承同一份 env，eval 模块据此注册 `eval:<session id>`，满足 D3-19。“dial 从 env 读”也与 D3 一致：远程路径上 boot.js exec 的 dial 不带 `--generation`，generation 只经 `remote run` 的 env 给出（D3:165,189），dial 本来就要从 env 读。<br>启动顺序“写方声明 → 开一代 → 快进 worktree → dial → ready → `get_state` → `set_host_tools`”嵌在 D3-07 的两层锚点里；快进放在拿到 generation 之后、dial 之前，只改 cwd，不影响锚点。 | — |
| D7-05 | 赞成 | 改投条件已满足：`lab_save_artifact` 只登记 `artifact_meta`，字节留在本会话 worktree，不调用 store，所以不再依赖 D6 里不存在的 `PUT /objects/{sha}`，也不会在对象目录里留下无人引用的字节（D6-07）。`lab_open_artifact` 区分两种来源：store 产物经 `GET /objects/{sha}`，别的会话的讨论产物从那个会话的 worktree 拷贝，都写进本会话的 `inputs/`。<br>附注：`discussion_context` 和 `lab_open_artifact` 的 `ArtifactId` 同时指两种东西（store 的 sha 与 `artifact_meta.id`）。建议写成 sum type：`ArtifactRef = Store{sha} \| Discussion{artifactMeta}`，`/api/lab/objects` 与 `/api/lab/artifacts` 两条路由就由 tag 决定，不用靠 id 的形状判断。 | — |
| D7-06 | 赞成 | 第 1 轮建议的“只绑定下一次不带 `derivedFrom` 的 `run_started`”已用 `pending_launch` 落实，而且比我建议的写法更好：`launched.at` 之后第一个运行的判定，换成了每个会话至多一条显式意图记录。<br>核对了两个前提：<br>• `/stream/lifecycle` 的每条数据带 `holder` 和 `derivedFrom`（D6:212），所以 Lab 能按会话匹配，也能排除派生运行；<br>• dry run 从头到尾不进 store（D6:17,32），时序图里 agent 先 dry run，不会产生 `run_started`，不会被误绑。<br>Panel、Automation 来源和派生运行的名称与项目规则都已写明。 | — |
| D7-07 | 赞成 | 改投条件已满足。讨论产物在提交前只以会话 worktree 为权威；人上传时由 Lab 写进 `uploads/`。AI 把它作为根 `File` 输入正式运行时，eval 中间件按 D6-07 把字节放进本次调用的 `EvalTransfer`，随那一步提交转入对象目录。D6-07 规定“所有尚未提交的字节都先进暂存区”，`StepCommit.transfer` 承载“本步全部未提交字节”（D6:107），所以根输入的字节也走这条路。`.gitignore` 排除 `artifacts/`、`uploads/`、`inputs/`，`library.merge` 不会把产物带进库。 | — |
| D7-08 | 赞成 | 第 1 轮赞成的前提是 D7-04 ②。现在 env 已补上，根端点能注册，`writers(runId)` 加各端点的 `slots` 这条路径走得通（D3-19、D6-11）。 | — |
| D7-09 | 赞成 | 第 1 轮的两条建议都已落实：<br>① “通过后要改的文档”加了 D5 `RootEvalControl` 补 `derive` 与 `abort` 一行（D5:309-311 目前确实没有这两个）。`at` 用 `Committed \| InFlight{writerSession, slot}`，与 D6-16 一致。持有会话取自 store 运行记录的根 session（D6-05）。<br>② 改函数体时，先经 `library.merge` 合入默认分支，再把持有会话的 worktree 快进到这个 commit，插件随后打包新版本。与 D6-16“人确认后 commit 进库”一致。<br>附注：正文没写人改的函数体先落在哪个 worktree，才能交给 `library.merge{conversation, paths}`。最直接的写法是由 Lab 写进持有会话的 worktree，再对这个会话执行 `library.merge`；这样持有会话的 worktree 已经是新版本，不必再快进一次。现写法读作“经节点库页 Panel 会话合入，再由 ② 快进到持有会话”，数据同样能到达，所以不构成断裂。 | — |
| D7-10 | 赞成 | 第 1 轮赞成。本轮只把审批改用独立的 `approve` 权限，不再借用 `startWithoutApproval`，更正确。复盘写回经 `run_ended` 的 `holder`（D6:212）在 `conversation` 表里找到讨论，路径不变。 | — |
| D7-11 | 赞成 | 改投条件 ①②③ 都已满足：<br>① `library.merge{conversation, paths}`：在会话 worktree 里 commit、合并默认分支、push；节点库页列出各会话 worktree 里未合入的改动，标明来自哪个讨论。我第 1 轮的 F28 场景（AI 写出 `nodes/xrd_fit.ts`，人说“留下它”）现在有了入口。`library.apply` 也改为写进 Panel 会话的 worktree，再走同一条合入，合入路径只剩一条。<br>② 每次 push 后快进中心检出（D2-12），并把各会话 worktree 快进合并到默认分支；每一代启动前也做一次（D7-04 ③）。已有讨论接着正式运行时用的是新定义。<br>③ `harness` 收窄为 `'omp'`，`id` 就是定义名，没有第二份拷贝。<br>附注：`agentTemplate.saveVersion` 是“一次经 `library.merge` 的 commit”，但命令里没有 `conversation`。建议照 `library.apply` 写明：先写进设置页 Panel 会话的 worktree，再走 `library.merge`。 | — |
| D7-12 | 赞成 | 第 1 轮我提出 P5 应在第一版由 remote 实现，理由是怕 Lab 另记一份作业登记。修订把 P5 与依赖它的 `restart`、`destroy`、`new_sandbox`、`liveContainers` 一起推到 D9，并明确写了“Lab 不自己记一份启动过的作业”，第二份登记不会出现。这一点我关心的权威问题已解决；范围问题由 argon 裁定不违反 U2、U23（votes/D7-argon.md:49-69）。<br>flow-catalog 里没有哪条流程的主路径需要 GUI 按后端列作业：F17 的观察用 `remote status`、`remote tail`，本行保留了。也就找不到主路径反例。P3 仍作为第一版的占位保留，集群页和容器页的模板字段有来源。 | — |
| D7-13 | 赞成 | 第 1 轮的建议已落实：`build_push` 在 images 检出卷上 commit 并 push，检出卷与 deploy key 在 D7-19 里有了位置。`liveContainers` 随 P5 列入 D9，与 D7-12 一致。 | — |
| D7-14 | 赞成 | `canApprove` 改为来自独立的 `approve` 权限，与 D7-03 一致；部署密钥由 Lab 生成，私钥在 Lab 业务库卷上，符合凭据规则。 | — |
| D7-15 | 赞成 | 模型目录与 `set_model` 都发给同一个会话的同一代，读到的目录就是将要切换模型的那个进程的目录，结果确定，权威是 omp。会话已停驻时先按 D7-04 开新的一代，复用同一条启动配方，没有新增机制。 | — |
| D7-16 | 赞成 | 第 1 轮赞成，本轮正文未改：只改时机，数据仍是 fixture，feature 代码零改动。 | — |
| D7-17 | 赞成 | `harness` 收窄为字面量 `'omp'`，`id` 承载定义名，采纳了我第 1 轮第 1 点的理由。其余线协议与投影的写法不变。 | — |
| D7-18 | 赞成 | 新增的 `/api/lab/artifacts/{id}` 与 D7-05、D7-07 的“讨论产物在 worktree”对应；`LabCommand` 只收有执行方的命令，P4–P7 不进联合，与 D7-12 一致。<br>附注：接口草图里没有 18 字段表引用的 `experiment.update`、`report.*`、`milestone.*`、`discussion.rename/move/archive`。草图本来只列主路径，不构成断裂；落地时这些变体要进同一个穷尽 switch。 | — |
| D7-19 | 赞成 | 改投条件已满足：按 D2-20 列出六个卷并写明各自的写方，会话 worktree 卷与 images 检出卷都在；Lab 库与 images 仓库的部署密钥由 Lab 生成并持有；`lab.sqlite` 与 omp session 分成两个卷，与 D2-20 的持久载体一一对应。会话 worktree 卷的写方写作“该会话的 omp 和人，Lab 创建与删除”，原样取自 D2-20。Lab 写 `uploads/`、`inputs/` 和合入时的 commit，都是替人或 agent 执行，不是另一个权威。 | — |
| D7-20 | 赞成 | 第 1 轮赞成，本轮未改：依赖只有一个方向，拿掉 Pepgent，soroi 仍能走通全部流程（D2-25、U23）。 | — |
| D7-21 | 赞成 | 第 1 轮赞成，本轮未改：用户原话“先不动”“现有的ai应该完全用不了”（inv/s-pepgent.md:104），D2-19。 | — |

## 第 1 轮反例的处理结果

| 第 1 轮反例 | 修订后的正文 | 结论 |
| --- | --- | --- |
| D7-04 ①：所有会话共用中心检出作 cwd | 每个会话一份独立 clone，记在 `conversation.worktree` | 已消除 |
| D7-04 ②：eval 模块拿不到 `MUX_GENERATION`、`MUX_TOKEN` | 两者放进 dial 的 env，omp 继承 | 已消除 |
| D7-05：`lab_save_artifact` 调用不存在的 `PUT /objects/{sha}` | 只登记元数据，字节留在 worktree | 已消除 |
| D7-07：讨论产物进对象目录，引用错了 D6-07 | 提交前以 worktree 为权威，正式运行时经暂存区随步提交 | 已消除 |
| D7-11：会话里 AI 写出的节点没有合入入口；合入后已有 worktree 不刷新 | `library.merge`，push 后快进中心检出和各 worktree | 已消除 |
| D7-19：缺会话 worktree 卷、images 检出与写入凭据 | 六个卷；两把部署密钥由 Lab 生成并持有 | 已消除 |

## 计票

赞成 21 · 反对 0。
