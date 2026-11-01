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
