# D7 第 1 轮反例回应

对象：`decisions/D7-lab-backend.md`。反例来源：
- task:high 的选票 `votes/D7-high.md`；
- LeadMentor 的选票 `votes/D7-mentor.md`；
- 治理汇总 `governance-state-2026-11-01.md:274-289`。

argon 21 票全部赞成（`votes/D7-argon.md`），它对四个待裁点的裁决已写入正文的“已裁决的条目”一节。

leader 的技术立场已采用：
- `AgentTemplate.harness` 不再是多 harness 枚举，模板就是 omp agent 定义（U13）；
- 旧 `_app` 面保持不动，Lab 服务只监听本机或内网；
- P4–P7 不在第一版，列入 D9。

按设计阶段规则，只回应主路径上的数据流断裂，以及与已通过条目的冲突。本轮没有哪条反例属于纯失败、竞态或安全加固，所以没有因此驳回的条目。修改方式与某一方建议不同的有两处：第 5 条（选了 task:high 的改法，没选 LeadMentor 的）和第 16 条（与 leader 原话略有不同），理由写在各自那一行。

| # | 反例（来源） | 处理 | 改动的条目 | 新写法摘要 |
| --- | --- | --- | --- | --- |
| 1 | `conversation` 要记该会话的 worktree；`activity` 不要抄 store 的运行起止（high D7-02 ①②；治理 #1） | 采纳 | D7-02 | `conversation` 表增加 worktree 路径。`activity` 只记 Lab 自己产生的事件，首页动态里运行的开始与结束在读取时从 store 生命周期流投影。新增表 `pending_launch`、`deploy_key` |
| 2 | 引用了 D3 里不存在的 `X-Principal` header（high D7-03；治理 #2） | 采纳 | D7-03 | 当前用户 id 作为 `mux_human_irc*` 帧的 `principal` 字段，由 Lab 的受信 reader 连接发出（D3-12，D3 §4 `ReaderUp`）。另写明 Lab 只监听本机或内网 |
| 3 | 根会话的 cwd 用了共享的中心检出，一个讨论里未确认的节点草稿会被另一个讨论正式运行时打包进去（high D7-04 ①；mentor D7-04；治理 #3） | 采纳 | D7-04 | 每个 Lab 会话首次启动前，Lab 在会话 worktree 卷上克隆一份独立 clone，路径记在 `conversation.worktree`，作为该会话所有代的 cwd。每一代启动前把默认分支快进合并进来，保留未合入的改动（D2-12、D2-15、D2-20） |
| 4 | 根会话的 eval 模块拿不到注册端点所需的 `MUX_GENERATION`、`MUX_TOKEN` env（high D7-04 ②；治理 #3） | 采纳 | D7-04；接口草图 | dial 的 env 里放 `MUX_GENERATION`、`MUX_TOKEN`、`SOROI_ROLE=Main`、`SOROI_STORE_URL`、`SOROI_MUX_URL`。dial 从 env 读 generation 和 token（D3 §4 命令行），omp 继承同一份 env，eval 模块据此注册 `eval:<session id>`（D3-19）。时序图加了端点注册这一步 |
| 5 | `lab_save_artifact` 调用 `PUT /objects/{sha}`，定稿的 D6 没有这个端点（high D7-05；mentor D7-05；治理 #4） | 采纳 high 的改法 | D7-05、D7-18；接口草图 | `lab_save_artifact` 只登记 `artifact_meta{conversation, path, role}`，字节留在本会话 worktree。`lab_open_artifact` 把产物放进 worktree 的 `inputs/`。讨论产物的字节经新路由 `/api/lab/artifacts/{id}` 读取。mentor 提的“transfer 上传后由 store promote”需要 D6 新增一个不挂在 eval 调用下的提交路径；high 的改法不改 D6，所以选了它 |
| 6 | 同一讨论先后启动草稿 A、B，`run_started` 无法判断绑定哪一个（mentor D7-06；high D7-06 建议；治理 #5） | 采纳 | D7-06；接口草图 | `experiment.start` 建一条 `pending_launch{conversation, draft, at, state}`，每个会话至多一条。该会话下一次不带 `derivedFrom` 的 `run_started` 只绑定这一条，绑定写进 `experiment_ext.draft` 后删除它。Panel、Automation 来源和派生运行的名称与项目规则写明了。运行状态、持有它的根 session、`derivedFrom` 都只从 store 读 |
| 7 | 讨论产物进 store 对象目录引用的是错误的 D6 读法（high D7-07；mentor D7-07；治理 #6） | 采纳 | D7-07 | 讨论产物在提交前以会话 worktree 为唯一权威（AI 写出的文件，或人上传时由 Lab 写到 `uploads/`）。AI 把它作为根 `File` 输入正式运行时，eval 中间件按 D6-07 把它放进暂存区，随那一步提交进入对象目录。Lab 库的 `.gitignore` 排除 `artifacts/`、`uploads/`、`inputs/` |
| 8 | D5 的控制端点接口没有 `derive`、`abort`；派生只能指向已提交的调用（high D7-09 ①；mentor D7-09；治理 #7） | 采纳 | D7-09；接口草图；“通过后要改的文档” | 持有运行的会话取自 store 运行记录的根 session（D6-05）。`derive`、`abort` 发到这个会话的根端点。`at` 是 `Committed{step, position} \| InFlight{writerSession, slot}`，与 D6-16 一致。文档表新增一行：D5 的 `RootEvalControl` 补上 `derive` 与 `abort` |
| 9 | 改函数体后，持有会话的 worktree 还是旧版本（high D7-09 ②） | 采纳 | D7-09、D7-11 | 改函数体时先经 `library.merge` 合入默认分支，再把持有会话的 worktree 快进到这个 commit，插件随后打包出新版本 |
| 10 | 自动化审批借用了 `startWithoutApproval`（mentor D7-10；治理 #8） | 采纳 | D7-03、D7-10、D7-06、D7-14 | 新增独立权限 `approve`，对应原型的 `MemberSettings.canApprove`，用于批准自动化动作和待审批的实验启动。`startWithoutApproval` 只决定发起人启动实验时要不要等审批 |
| 11 | 会话 worktree 里由 AI 写出的节点没有命令能合入；合入后已有的 worktree 不刷新（high D7-11；治理 #9） | 采纳 | D7-11；18 字段表 `nodeLibrary`；接口草图 | 新增 `library.merge{conversation, paths}`：在会话 worktree 里 commit，合并默认分支后 push。节点库页列出各会话 worktree 里未合入的节点改动。`library.apply` 先写进节点库页那个 Panel 会话的 worktree，再走同一条合入路径。每次 push 后快进中心检出，并把各会话 worktree 快进合并到默认分支；每一代启动前也做一次 |
| 12 | `restart` 映射成 `abort`，作业并不会重启；P4–P7 的范围前后不一（mentor D7-12；治理 #10） | 采纳 leader 立场 | D7-12、D7-18；占位 P4–P7；18 字段表 `clusters`、`connectCluster`、`containers` | 第一版不实现作业列表（P5），`restart`、`destroy`、`new_sandbox` 随之不可用，也就不存在错误的 `restart` 映射。P4、P6、P7 同样不在第一版，全部列入 D9（argon：votes/D7-argon.md:49-69）。Lab 不自己记一份作业来填补 P5。high 提出 P5 应在第一版由 remote 实现；按 leader 立场推到 D9，这样也就不会形成 high 担心的第二份作业登记 |
| 13 | 模型目录从任一在线会话读取，结果不确定（mentor D7-15；治理 #11） | 采纳 | D7-15；18 字段表 `aiModels`；占位 P10 删除 | 打开模型选择时，在这个会话自己的那一代上调用 `get_available_models`，会话已停驻就先开新的一代。`set_model` 发给同一代。`readCatalog` 不再带全 Lab 的 `aiModels` |
| 14 | 命令联合里有没有执行方的 `cluster.connect`（mentor D7-18；治理 #12） | 采纳 | D7-18；接口草图 | 第一版 `LabCommand` 只含有执行方的命令；`cluster.connect`、`sandbox.create`、`job.*`、shell 和预构建检查都不进联合，界面按钮不可用，列入 D9 |
| 15 | 卷少了会话 worktree、images 检出及其写入凭据；Lab 库与 session 混放在一个卷（high D7-19；mentor D7-19；治理 #13） | 采纳 | D7-19、D7-13、D7-02 | 按 D2-20 列出六个卷：Lab 业务库、omp session、中心检出缓存、会话 worktree、images 检出、remote home，各写明写方。Lab 库与 images 仓库的部署密钥由 Lab 生成并持有，其余凭据由 `Pepgent/deploy` 注入。`build_push` 在 images 检出卷上 commit 并 push |
| 16 | `AgentTemplate.harness` 仍是原型的多 harness 形状（high 第 1 点；治理 #14；leader 立场） | 采纳，改法与 leader 原话略有不同 | D7-11、D7-17；18 字段表 `settings` | 去掉 `claude \| codex \| pi \| opencode` 四枚举。`AgentTemplate.id` 就是 omp agent 定义名，`harness` 收窄为字面量 `'omp'`，`harnessVersion` 取容器里 omp 的版本。没有照 leader 原话把 `harness` 设成定义名：那样它会成为必须与 `id` 保持一致的第二份拷贝（high 第 1 点）。“模板 = omp agent 定义”由 `id` 承载，与 argon 的裁决（votes/D7-argon.md:73-87）一致 |
| 17 | 旧 `_app` 面是否加登录（草稿原建议；argon 待裁点 2；leader 立场） | 撤回原建议 | D7-03、D7-19；“已裁决的条目” | 旧面保持不动，不加 Lab 登录；Lab 服务只监听本机或内网（argon：votes/D7-argon.md:34-45） |
| 18 | soroi 在可执行路径里是否真的在场；`origin` 不应参与 Mux 寻址（D7Mentor 起草期的审查） | 采纳（第 1 轮投票前已改） | D7-04 | 写明 dial 拉起的 omp 加载的是容器里从 soroi 发行 tar 装好的定制，Lab 只给 env 和 cwd；`origin` 是 Pepgent 的业务分类，不参与 Mux 寻址 |

## 需要重投的条目

| 条目 | 改动 | 需要重投的一方 |
| --- | --- | --- |
| D7-04、D7-05、D7-07、D7-11、D7-19 | 按 task:high 的改投条件修改 | task:high、LeadMentor |
| D7-06、D7-09、D7-10、D7-12、D7-15、D7-18 | 按 LeadMentor 的反例修改 | LeadMentor、task:high |
| D7-02、D7-03、D7-13、D7-14、D7-17 | 落实 task:high 的建议，以及由上面各行带出的改动 | 三方 |

argon 已全票赞成；本轮改动都属于技术或串联细化，意图层面没有变化，但由 argon 决定是否需要重新确认。

## 第 2 轮

第 2 轮投票结果：task:high 21/21 赞成，argon 21/21 赞成，leader 赞成；LeadMentor 17 赞成、4 反对（`votes/D7-mentor-r2.md`）。下面四条反例都是主路径上的断裂，全部采纳。

| # | 反例（来源） | 处理 | 改动的条目 | 新写法摘要 |
| --- | --- | --- | --- | --- |
| 19 | 每一代启动前把默认分支合并进会话 worktree：worktree 本来就带着未提交的草稿，git 拒绝合并，会话起不来（mentor-r2 D7-04） | 采纳 | D7-04；接口草图 `LabSessions.open` | 启动配方删掉“同步 worktree”这一步，现在是六步。worktree 在会话第一次启动前从当前默认分支克隆，此后基线只在人执行 `library.sync` 时改变；启动、唤醒和别的会话合入节点都不碰它 |
| 20 | `library.merge` 在源会话 worktree 里 commit 并 push，每次 push 后再合并进所有会话 worktree：遇到未提交草稿时 git 拒绝；为合并先提交全部草稿，又会让未确认内容进入 commit（mentor-r2 D7-11） | 采纳 | D7-11、D7-09、D7-19；18 字段表 `nodeLibrary`；接口草图；占位 P13 | `library.merge{conversation, paths}` 从源会话读出选中路径的内容，在一份干净的集成检出上（基于当前默认分支，每次新建，放在中心检出缓存卷上，push 后删除）只提交这些路径并 push，然后快进中心检出。源会话 worktree 和其他会话都不被改动。新增 `library.sync{conversation}`，由人发起：未提交的改动先提交到这份 clone 里的私有分支 `conv/<conversation>`（从不 push），再把默认分支合并进来。D7-09 派生时，新函数体写在持有会话里就直接打包；写在别处时，人确认派生也就确认了对持有会话执行 `library.sync`。P13 改为假定这两种合并主路径上无冲突 |
| 21 | `lab_save_artifact` 只记一个可变的 worktree 路径，文件被覆盖后，已保存的产物读到的是新字节（mentor-r2 D7-05） | 采纳 | D7-05；接口草图 `ArtifactMetaRow`、`LabHostTool` | 保存时读出字节、算内容哈希，复制成 worktree 里的不可变快照 `artifacts/<hash>/<文件名>`。`artifact_meta` 记下 id、所属会话、hash、快照路径、原路径和 role。同一会话里相同字节复用已有的 `ArtifactId`，字节一变就生成新的快照和新的 `ArtifactId`。仍然不写 store |
| 22 | 上传文件和讨论产物指向可变路径，同名再上传或 agent 改写后，已有引用和跨会话装载会读到新内容（mentor-r2 D7-07） | 采纳 | D7-07；18 字段表 `datasets`；接口草图 `artifact.upload` | 上传时也由 Lab 按内容哈希直接写成快照，不再有 `uploads/` 目录。附件、Datasets 页和 `lab_open_artifact` 都读快照。`inputs/` 里的文件只是从快照派生出的近处副本。作为正式运行输入时，字节仍按 D6-07 经暂存区随那一步提交进 store。`.gitignore` 排除 `artifacts/` 和 `inputs/` |

### 第 2 轮需要重投的条目

| 条目 | 改动 | 需要重投的一方 |
| --- | --- | --- |
| D7-04、D7-05、D7-07、D7-11 | 按 LeadMentor 第 2 轮的反例修改 | LeadMentor；task:high 与 argon 是否复核，由治理决定 |
| D7-09、D7-19 | 随 D7-11 带出的改动：派生时的同步改为显式的 `library.sync`；在中心检出缓存卷上放干净的集成检出 | 三方确认 |

## 第 3 轮

第 3 轮投票结果：argon 6/6 赞成，LeadMentor 6/6 赞成；task:high 对 D7-11 投反对，其余赞成（`votes/D7-high-r3.md`）。

| # | 反例（来源） | 处理 | 改动的条目 | 新写法摘要 |
| --- | --- | --- | --- | --- |
| 23 | `library.merge` 把选中路径的整份文件拷到集成检出上提交。会话基线落后于默认分支时，别的会话已经确认的合入会被静默冲掉；这一步根本没有经过合并，P13 的“无冲突”假定也挡不住。另外，“未合入”是相对会话自己的 HEAD 算的，已经合入的节点会一直被列为草稿（high-r3 D7-11） | 采纳 | D7-11；18 字段表 `nodeLibrary`；接口草图 `library.merge`；占位 P13 | 会话的改动定义为：从会话基线 `merge-base(conv/<conversation>, 默认分支)` 到会话工作区内容的差异，包括私有分支上的提交和未提交的改动。`library.merge` 只针对选中路径做这份 diff，在基于当前默认分支的干净集成检出上执行 `git apply --3way`，以会话基线为合并基准，然后提交、push、快进中心检出。之后别的会话合入的改动得以保留。“未合入”改为相对**当前默认分支**计算，节点库页另外标出每个会话落后默认分支几个 commit（采纳该票对 D7-04 的附注）。合并冲突仍是占位 P13。源会话的 worktree 和私有分支不被改动 |

本轮没有采纳 high-r3 对 D7-05 的两条附注：`ArtifactId` 的复用键改为 `(conversation, hash, role)`，以及 `discussion_context` 改用 sum type。原因是 D7-05 本轮已获三方赞成，这两条也都是非阻塞的建议，留到实现阶段处理，不为它们重开投票。

### 第 3 轮需要重投的条目

| 条目 | 需要重投的一方 |
| --- | --- |
| D7-11 | task:high；argon、LeadMentor 是否复核由治理决定 |

## 第 4 轮

起因不是 D7 的选票，而是 LeadMentor 对 D8 的反例（`votes/D8-mentor.md`，D8-16）。按已通过的 D7，P5（作业列表）整体不在第一版，Lab 拿不到作业列表。可是 F17 要求算力页显示作业与日志，F31 第 4 步要求算力页实时显示容器 stdout 尾部。照 D7 实现的 Lab 因此永远过不了 D8 的 W6 验收，等于悄悄收缩了用户流程（U2）。leader 席位的技术裁决：P5 的只读部分进第一版。

| # | 反例（来源） | 处理 | 改动的条目 | 新写法摘要 |
| --- | --- | --- | --- | --- |
| 24 | P5 整体推迟，使 F17 与 F31 第 4 步（作业列表、状态、日志尾部）在第一版无法完成（D8-mentor D8-16；leader 裁决） | 采纳 | D7-12、D7-13、D7-18；18 字段表 `clusters`、`containers`；接口草图 `LabPageWire.clusters` 与命令注释；占位 P5；“已裁决的条目”；文档表 `remote.md` 一行 | remote 新增只读操作 `remote runs`，由 `Pepgent/remote` 实现，返回其作业记录（`runs/<run>.json`）的摘要：run id、模板、后端、最新生命周期事实。算力页的线数据带 `jobs`，每项附 `remote status`；日志尾部经新的只读 SSE `GET /api/lab/jobs/{run}/tail`，由 Lab 调用 `remote tail`。容器页 `liveContainers` 取自同一份列表。remote 仍是作业的唯一权威，Lab 不建作业表。作业的读取走 `lab.page.read` 和 tail 流，不是命令。`restart`、`destroy`、`new_sandbox` 等控制部分仍不在第一版，列入 D9，P4、P6、P7 不变 |

### 第 4 轮需要重投的条目

| 条目 | 需要重投的一方 |
| --- | --- |
| D7-12、D7-18（及随之改动的 D7-13） | 三方 |
