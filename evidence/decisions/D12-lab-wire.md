# D12 Pepgent Lab 公开线契约（D7-17、D7-18 的补全）

起草：LabWireClone（Claude 族，依据 U21）。评审输入：argon 意图基线 `evidence/argon/D12-intent.md`（V-1–V-6）、D12Steady/D12Divergent、逐叶子审计 `D12-coverage.md`。本表补全 D7 公开线契约，并有限修订 D5 §3.6、D7-05/10/11/18 与会话前分支 `feat/lab-10-library`（`fc89bcd`）；落点见文末。权限与身份按 D11-49、D11-29A/B、D11-30；RunEvent 的节点与入边携带按 D11-C1、D11-C2，不将其推广为全系统去重原则。

依据缩写（行号均为当前工作树）：

| 缩写 | 文件 |
| --- | --- |
| D3…D10 | `pepgent-pm/evidence/decisions/D3-network-mux.md` … `D10-repo-delivery.md` |
| web/… | `Pepgent/Pepgent` `origin/main`（16fe1f2）的 `apps/web/src/…` |
| Library 基线 | `Pepgent/Pepgent` 会话前分支 [`feat/lab-10-library`](https://github.com/Pepgent/Pepgent/tree/feat/lab-10-library)（`fc89bcd`，LAB-10），包括 `protocol/lab/library.ts`；以下修订均在此合法基线上接续 |
| contract | `Pepgent/soroi` `packages/store/src/contract.ts`（D10-10 后归仓 A） |
| remote/… | `Pepgent/remote` 的 `src/…` |
| mux | `Pepgent/omp-rpc-mux` 的 `README.md` |
| rpc.md | `omp://rpc.md` |
| B21 | eng-web 的阻塞上报 [Pepgent#21 评论 6554819439](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6554819439) |
| COV | `evidence/decisions/D12-coverage.md` 的缺口编号 G01–G51 |

## 框架

**要回答的问题（B21 ①–④）。** D7 的接口草图（D7:110-222）定义了 `LabBridge` 的方法签名、`LabPage` 的 13 个值、`LabChange`、3 个页面的线数据和大部分命令，但 `LabCatalogWire`、`LabPageParams` 被引用而未定义（D7:118-119）；其余十页是“其余页面同理”（D7:141-148）；`project.*`、`repo.*` 的载荷是 `/* … */`、`LabCommandResult` 未定义（D7:121、177-180）；外部类型在 Lab 仓里从哪里来没有写（B21 ④）。D10-08 规定 wire schema、持久化格式、ADT variant 和权限矩阵回领导小组投票。LAB 后端（eng-lab3）与 WEB 投影（eng-web）是同仓两个 owner（D10-09），这份契约是他们之间的接缝。

**不变的前提（D7 已定）。** 线上只放权威方自己的形状，服务端不拼文案、不算布局；投影是客户端纯函数，把线数据投影成现有 `*Fixture` 视图类型（D7-17）。一个读目录、一个读页面、一个命令联合；SSE 推送变更通知，浏览器重读（D7-18）。18 个 `LabSnapshot` 字段各自的权威源（D7:87-106）。前端只经 Lab 后端（D2-18）。

**argon 基线（(U) 依据见基线原文）。** 13 页与全部命令必须完整定义（V-1）；无来源字段不出线或为 `null`，D9 判为 `U`，不得造数（V-2）；前端视图契约保留（V-3）；harness 只有 `'omp'`（V-4）；草稿与 dry run 不进 store、无重放（V-5）；guest 只读、student 启动经审批（V-6）。

**覆盖审计的处理原则。** 对第一稿的 51 条缺口：有权威源而本页没带的，补进线数据；权威方已有、只缺字段的，补字段并写明拥有方；D2–D7 没有任何权威源、且 F 流程走不到的，按 D8-16 的规则列入 D9 输入（见“第一版无来源字段”），投影留空，不造数。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D12-01 | **外部形状消费来源（B21 ④）** | apps/web 依赖；protocol/lab/external | store 引用仓 A 默认分支的 contract 模块，不钉版本，lockfile记录实际commit；类型导入protocol，Lab客户端直接用权威zod schema解析HTTP。仓A建前按D16-05：W-06 A2-10先完成schema/根exports/zod/lockfile，W-09 A2-12再接Pepgent依赖与protocol；建A后改依赖并删临时根导出。remote由remote schema生成TS，omp由发布的rpc-wire.schema.json生成；无产物的Mux按README转录并标来源，在途槽位按D5 §3.6+D12-14转录。Lab外部响应入口解析一次，浏览器网络边界解析一次 | 引用/生成已有产物，不复制schema；D10-10与D10讨论意见表的Lab契约消费已按本条、D16-01直接回写 | 串联 | 是：Lab契约依赖 |
| D12-02 | **线协议总则** | `src/protocol/lab/` 全部类型 | ① Lab 自有的 id 是不透明品牌字符串：`LabId` = Better Auth organization id，`MemberId` = member id，`UserId` = user id，其余为各表主键；store 拥有的 id、序号、哈希、时刻直接取 contract 推导的类型，不另加品牌；原型字面量联合按 D7-17 放宽。② 时刻是 ISO 8601 UTC 字符串（`Instant`）。③ 用户内容是语言中性 `string`，后端不发 `LabText`。④ Lab 行以 `*Wire` 出线，只含业务事实；worktree 路径、私钥路径、Better Auth 内部表、凭据不出线。⑤ 产物引用是属主限定串 `ArtifactRef = store:<sha256> \| discussion:<DiscussionArtifactId>`，与原型 `${string}:${string}` 同形；讨论产物行的 id 只能是 `discussion:` 一支。⑥ 无参页面的参数是精确空对象：类型 `NoParams = Record<string, never>`，运行时 schema `z.object({}).strict()`，带任何字段（例如旧的 `{tab}`）都被拒绝。⑦ `LabBridge` 返回解包后的成功值；server function 外层仍是 `OperationResult`，失败抛 `OperationFailure`（web/client/api/call.ts） | **选定：** 一个属主限定引用让 `lab_open_artifact`、`discussion.load`、数据集页对两类产物一视同仁（D7-05、D7-07）；外部 id 沿用权威方类型，投影不需要类型断言（D12Divergent）。**备选：** 两个 id 字段分开：每个引用处都要成对出现。**备选：** `Record<never, never>`：多余字段可以通过（导师反例） | 技术 | 否 |
| D12-03 | **RPC 面（B21 ③④）** | `src/rpc/lab.ts` | 六个 POST server function 经 runLabOperation：catalog.read{lab:LabId或null}（null 取当前用户首 Lab）、page.read{lab,page,params}、command{command}、conversation.read{conversation} → ConversationDetailWire、conversation.models{conversation} → ConversationModelsWire（该会话本代 get_available_models/get_state，停驻先开代）、conversation.markRead{conversation}。Library 基线 `feat/lab-10-library`（fc89bcd）的 library.read 并入 page.read('nodes')，library.command 并入 command；LibraryConversationDraft/NodeVersionDisplay 去 unavailable，LibraryCommit 去 cache；staged 加 definition/reason，usage 页面读取逐定义预取 | 一个目录、一个页面、一个命令联合；会话独立读取供讨论与 Panel 共用，不在每页重复取 transcript | 技术 | 是：会话读取与模型读路径 |
| D12-04 | **LabCatalogWire（B21 ①）** | catalog.read；壳层 loader | 目录含当前用户全部 Lab（各带 openRuns，按 D18-05 分别查询该 Lab 实例的 store Open 运行）、所选 Lab 账户与 grants、成员、含创建者的项目、实验、讨论。`experiment_ext.lab_id` 保留，用于定位运行所属 Lab 实例的 store，不在共享 store 内划分租户。实验为各 ext 对应运行与未绑定草稿；每项带 ext、store 运行行、最新图、在线根会话的 `writers()` → 各写方 `slots()` 在途槽位、draft、pending_launch、由根 session 连 conversation 得到的会话与 owner。在途槽位按本节下方“D12-04 在途槽位挂载”表放置，每批槽位在一个响应里只出现一次。读取只针对自己持有的在线一代，停驻会话不唤醒。讨论是全部 Discussion 会话头，创建时刻降序，含 originated/bound 运行与结论 id；最后消息和本人 readAt 在页面 activity。**目录、页面、会话读取按本条规定避免重复携带；本规则独立于 RunEvent 的节点与入边携带规则**（D11-C1/C2）：页面只带目录没有的事实。实验 progress/where/now/updated/needs_you 从图与槽位投影，total 无源；项目项数为实验数加讨论数 | 实验与讨论头在目录共用，消息不使整个目录重读；挂在讨论头的在途槽位变化随 catalog 失效（D29-02/04）。按 D7 读法带全图，并只从在线根会话及其写方读取在途槽位，不把 D11-C1/C2 当作本条的依据 | 串联 | 否 |
| D12-05 | **`LabPageParams`（B21 ②）** | `lab.page.read` | `NoParams`：`home`、`automation`、`datasets`、`discussions`、`clusters`、`connectCluster`、`containers`、`settings`。`experiments`：`{ from: Instant; until: Instant }`（泳道时间窗）。`experiment`：`{ ref: run \| draft; at: Seq \| null; compare: RunId \| null; workspace: { step; position } \| null }`——回看 `GET /runs/{run}/graph?at=`、对比 `GET /compare`、Runner Workspace `GET /volumes/{run}/{step}/{position}`。`flowEditor`：`{ draft }`。`discussion`：`{ conversation }`。`nodes`：`{ version: Version \| null }`。`settings` 一次返回四个标签（覆盖 D7:106 的 `{tab}`：标签栏同时显示四类计数，且目录已带成员、项目、讨论） | **选定：** 参数只放路由与页面上的显式选择；聚焦项目、选中行仍是页面状态（D7-16）。**备选：** `settings{tab}`：另需一份跨标签计数摘要 | 技术 | 是：修订 D7:106 |
| D12-06 | **实验类页面：`experiments`、`experiment`、`flowEditor`** | `LabPageWire` | `experiments`：`{ templates, definitions, panels }`，运行与草稿取自目录，`definitions` 与 `flowEditor.palette` 同取库默认分支；实际时段取调用起止与槽位起始时刻，尚未执行的未绑定草稿按定义与依赖投影计划条，已绑定运行及 `sent` 且有槽位的首步在途项不画计划条，规则见下文“实验页面投影与版本来源”。`experiment`：`{ rewind, comparison, workspace, templates, definitions, versionedDefinitions, commits, presence, panels }`，实验本身取自目录；`rewind` 是 `at` 非空时的回看图；“派生自”取 `graph.derivedFrom`；默认分支 `definitions` 仅供草稿，运行图及在途槽位按 `versionedDefinitions` 关联实际版本定义；`commits` 带全部提交的真实序号与时刻，拖动据此映射 `at=k`，不从调用时刻反推；`presence` 只来自 Mux，槽位在目录的 `slots`。`flowEditor`：`{ palette, templates, panels }`，草稿取自目录，`palette` 是库默认分支的定义，可用性从目录运行与模板算出（D7:98）。**草稿编码 `DraftCanvas` 只存语义：** 节点（函数、参数覆盖、上游、所属分组 `arm`、估时、来源 plan/AI 建议）、阶段名；列由拓扑深度、泳道由 `arm` 与模板设备在客户端算出。草稿只在 `lab.sqlite`，不进 store（D6-12） | **选定：** 编辑器位置与泳道计划均由客户端投影，后端不存坐标；默认分支定义不冒充调用实际版本，真实提交时间轴包括 Root-only 提交（D35-01 v3、D35-02 v3、D35-03 v1）。**备选：** 存 `column`、`lane`：后端持有布局坐标 | 串联 | 是：`DraftCanvas` 编码与实验页补充字段 |
| D12-07 | **节点库与自动化页** | LabPageWire；Library 基线 `feat/lab-10-library`（fc89bcd）；automation_rule/run | nodes={library,usage,draftReferences,templates,version,panels}；library 沿该基线 LibrarySnapshot 并按 D12-03 修订，staged 带服务端静态导出的 definition 与 reason；usage 为逐定义函数使用查询，草稿引用归 LAB-11b（D10-11(a)）。automation={rules,runs,conversations,panels}，规则与运行结构 D12-09。`conversations: ConversationWire[]` 携带 `runs` 中 `conversation` 非 null 的各运行对应的完整 Automation 会话头，每个会话一项，对本 Lab 全体成员可见、不按 owner 过滤（D31-01）。其 `slots` 按 D12-04 挂载：无运行时带该会话在线一代全部在途槽位，有 Open 运行时为 `[]`、槽位在运行项；不改变 `panels` 的本人本页 Panel 选择范围 | 沿合法基线形状，不把 TS AST 导出搬浏览器；Automation 会话头由自动化页携带，不重复放入目录、运行 wire 或会话详情 | 串联 | 否 |
| D12-08 | **讨论、数据集、算力、容器、设置、首页** | LabPageWire | discussions={activity,selected}，activity 为最后消息时刻/角色/正文与当前成员 readAt，selected 取目录创建最新讨论，无则null；discussion={activity,selected}，selected 来自参数。正文只经 conversation.read，讨论 loader 按 selected 读详情，Panel 同一路读。详情含 messages、attachments、conclusions、context、artifacts、ircQueue；头、运行关系、pending 在目录或页面，不重复。datasets={artifacts,contexts,references,objectSizes,valueRuns,volumes,templates,panels}，store File 来自目录图，卷为结束远程调用清单，valueRuns 读 store。clusters={templates,jobs,presence,panels}；connectCluster={templates}只读；containers={images,templates,jobs,definitions,panels}，images 按 P15 从检出导出含文本，definitions 统计绑定数；构建记录与标签按 D8-16 不进第一版。settings={members,roles,invitations,repos,repoActivity,library,agentTemplates,ompVersion,discussionActivity,panels}；home={reports,activity,milestones,templates,jobs,discussionActivity,panels}。各页 panels 只选本人本页会话头 | 来源按 D7 权威表与本条；正文只有 D12-03 一个读取位置，消息变化在页面由 conversation 失效；目录/页面去重独立于 RunEvent 的 D11-C1/C2 | 串联 | 否 |
| D12-09 | **自动化规则的结构与运行事实** | `automation_rule`、`automation_run`；LAB-09；D7-10 | 规则：`{ name, enabled, scope, trigger, when, conditions, then, creator }`。`trigger` 是 `event{run_started \| run_ended \| run_aborted} \| schedule{cron}`；**cron 显式按 UTC 解释，croner 传 `timezone: "UTC"`，schedule.at 为同一 UTC 时刻的 ISO 8601 串（D30-03 v2）**，不增加时区字段或部署变量。仪器触发（P8）按 D8-16 不进第一版，列入 D9，公开类型不含该变体。`scope` 的三个 variant 不变；`focused_project` 在每次匹配或命名时读规则创建者当前 `member_profile.main_project_id`，事件匹配与 `project{p}` 相同，开出的 ext 项目取该项目；创建者无主项目时按 Lab 范围、ext 项目为 null，不在规则保存项目副本（D30-01）。`when`、`conditions`、`then` 是作者写的步骤 `{ text, detail, actor }`，`actor` 为 `automatic`、`agent{template}`（Lab 库 `.omp/agents` 的定义名）或 `approval`。事件触发按 D7-10 / D30-02 的每 Lab 落库生命周期 cursor 续读，不改 store cursor 语义。then 含 approval 时运行停 waiting，action 是规则步骤与触发事实填好的 prompt，批准后开 Automation 会话。**该会话与其他 Lab 会话一样是装着 soroi 定制的 Main 根会话（D7-04）**；owner 取批准者，手动开出取 manual.by，无审批的事件/定时开出取规则 creator；后续授权沿既有规则以此 owner 判定，权限表不变（D30-04）。首条 prompt（审批时为 waiting.action，其余为同样填好的文本）按既定 human_irc_queue 语义入队，principal 取该 owner 对应的 user.id，含既有 human:<principal> 前缀、投递时机和 conversation 通知，不新增通道（D30-05）。conditions 由 Main 判断，agent 步由它用模板派子 agent（D5-17）。首条投递后第一次 session_settled 或 prompt_result.sessionSettled 为真时，同次受理将 running 改为 ok、endedAt 记该时刻并发 automation；条件不满足时说明原因并结束首轮，也为 ok，续写不再改变该运行。skipped 仅由 automation.dismiss 产生，failed 判定由工程师自定，不新增状态、字段或 host tool（D30-06）。运行 trigger 事实 event{run,event,at} / schedule{at} / manual{by,at} 与会话关联形状不变。规则删除按 D12-10 / D30-07。批准权限按 D11-29A：approval:any 可批任意；approval:ownExperiments 只可批事件触发、触发运行 owner 为本人 | **选定：** 条件交给 Main 判断，不另造条件语言；步骤是用户内容，原型步骤、执行者名称有来源（COV G51）。UTC cron 的当地时间由规则作者换算，ok 表示首轮结束，不区分是否实际执行条件动作。**备选：** 用模板直接作为根会话：失去 soroi_eval 与 Lab host tools（D12Divergent）。**备选：** 审批放进会话、在条件判断之后：要新增 host tool 并改变状态顺序，审批人看到的是填好的 prompt。**备选：** 保留 instrument：把 D8-16 排除的能力重新引入契约 | 串联 | 是：规则结构与 D30 自动化语义 |
| D12-10 | **命令联合、结果与权限（B21 ③）** | protocol/lab/command.ts；lab.command | 完整联合、逐 kind 结果与权限按下文；`LabCommandResult<C> = LabCommandOutput[C['kind']]`，无兜底。结果为拥有方受理并记录，不是后续执行完成；discussion.create 写行返 id，首 prompt 才起根；discussion/panel.prompt 入 human_irc_queue 即返回，投递回复经 conversation；intervene/abort 返端点结论。模板文件写设置 agents Panel worktree，writeFile/removeFile，saveVersion{conversation,id}=library.merge `.omp/agents/<id>`；Library 基线 `feat/lab-10-library`（fc89bcd）的合入路径由 nodes 放宽含 `.omp/agents/**`。Lab 由 seed 建，没有 lab.create。Better Auth 新增 lab:write 授 owner/researcher/student，不授 guest；discussion create/prompt 按 D11-49；lab.update 需 organization:update；member 需 manageMembers；library/agentTemplate/repo 需 editLibrary；审批按 D11-29A；其余 write。会话写还需 member.id 等于 conversation.owner；project 只需 write。报告由 host tool 写、GUI 只读。第一版不含 image.build/template.bind、cluster.connect、sandbox.create、job.restart/destroy、shell、预检查，按 D8-16 列 D9 | guest 只读、会话写限 owner；不上传整套模板覆盖已合入修改 | 串联 | 是：补命令/结果与write权限 |
| D12-11 | **GUI 介入的交回** | `intervene.takeover`、`intervene.answer`；D5 §3.6 | 命令带 `conversation: ConversationId`、`writerSession: SessionId`、`slot: SlotId` 与 `GuiHandback = { fields: Record<string, GuiReturned> }`，`GuiReturned` 为数值、字符串、布尔或 `file{artifact: ArtifactRef}`。Lab 按 `conversation.owner` 授权，直接把它转成 D5 的 `HumanHandback{slot, by: 当前 UserId, fields: Record<string, Returned>}`，发到 `eval:<writerSession>` 的持有槽位会话；在线根会话的 writers/slots 读取不唤醒 parked 会话。文件值按 P16 落到该会话可读的路径。store 的 `Handback` 由 eval 插件在提交时生成，不出现在 GUI 线上 | **选定：** 每层用拥有方的形状：GUI 输入、端点请求（D5）、store 提交（D6）；介入按 conversation 与 writerSession 直接送持有槽位的会话，不让 Lab 按运行猜端点。**备选：** GUI 直接发 store `Handback`：越过 eval 插件这一拥有方 | 串联 | 否 |
| D12-12 | **讨论已读** | 新表 `conversation_read{conversation, member, readAt}`；`lab.conversation.markRead{conversation}` | 未读是当前查看成员自己的状态：成员打开一个讨论时，前端调 `lab.conversation.markRead`，Lab 记下该成员读到的时刻。它不是 `LabCommand`，只要求有效会话与目标 Lab 的成员身份，**guest 也可调用**：它只记录调用者本人的阅读位置，不改变任何共享的 Lab 事实。`discussions`、`discussion`、首页与设置页的 `activity` 带当前成员的 `readAt` 与最后一条消息时刻，未读由投影比较 | **选定：** 按成员记已读，任何能读讨论的成员（含 guest）都有自己的未读状态。argon 依 (U)（`01a18e1f #e818d410`、`#e3692177`；`01a192a2 #ed4570ad`）裁定：个人阅读位置不属于 V-6 禁止的领域写入（`evidence/votes/D12-argon.md`）。**备选：** guest 不持久化已读：guest 的未读没有来源（导师提议）。**备选：** 只记所有者的已读：其他成员看到的是所有者的状态（D12Steady）。**备选：** 浏览器本地存储：换设备即丢失，不是权威事实 | 串联 | 是：原型字段此前无权威源 |
| D12-13 | **字节与上传面** | `src/app/routes/api/lab/*` | 各路由的方法、参数、请求体、响应与媒体类型见“HTTP 路由”一节（下文）。要点：`GET /api/lab/objects/{sha}`、`GET /api/lab/artifacts/{id}` 不变（D7-18）；**`artifact.upload` 改为 `POST /api/lab/conversations/{conversation}/artifacts?name=&role=`**，请求体是原始字节，返回 `ArtifactMetaWire`，其 `id` 就是之后在 `GuiHandback`、`discussion.load` 中使用的 `ArtifactRef`；新增 Mux 文件代理两条（列目录、读文件，D3:89-90）与 store 卷文件代理一条（D6:152），都只读。认证同 D7-18 | **选定：** 字节走 HTTP，命令联合只带结构化数据。**备选：** D7 原写的 `artifact.upload{bytes: Blob}`：JSON 载荷不适合大文件 | 技术 | 是：files 与 Runner Workspace 的浏览器入口 |
| D12-14 | **在途槽位补起始时刻、版本与输入（修订 D5 §3.6）** | omp-soroi eval 插件的控制端点 `slots`；仓 B | `SlotState.running` 与 `SlotState.awaiting_human` 都增加 `startedAt: Instant`、`version: Version`（该调用实际使用的节点版本）；`running` 另增加 `inputs: AtomName[]`（`awaiting_human` 已有 `inputs`）。插件在调用开始时已知这些事实。投影按 `version` 关联节点定义，不用当前库默认分支代替 | **选定：** 在途节点的时段、版本与参数只有插件知道（COV G11、G49）。**备选：** 投影用当前库定义：调用期间库可能已前进，把当前状态冒充执行事实 | 串联 | 是：D5 §3.6 补字段 |
| D12-15 | **节点分组与默认估时** | lab-library 约定；Library 基线 `feat/lab-10-library`（fc89bcd）的 TS AST 导出 | 节点 JSDoc 必写 `@group dev \| char \| calc`、`@estimateMinutes <非负整数>`；静态导出 NodeDefinition.group/estimateMinutes，不执行节点代码，只针对遵约节点。NodeGroup 与现有视图枚举同形；lab-library README 记约定 | 业务元数据随源码，不造默认值、不另存定义副本 | 串联 | 是：G14/G15 |
| D12-16 | **Lab host tools 与 Lab 表的字段补充（修订 D7-05、D7-02）** | `src/server/lab/tools.ts`；`schema.ts` | `lab_publish_report` 输入加 `project`、`tags: string[]`、`sources: ArtifactRef[]`，`body` 是 Markdown（`$$…$$` 公式，`\tag{}` 编号；图写作 `![题注](artifact:<ArtifactRef>)`）；Lab 发布时从该会话 `get_state` 记下模型。`lab_save_artifact` 输入加 `sources: ArtifactRef[]`（这份产物依据了哪些产物）。`lab_propose_changes` 输入加 `assignments: { item: discussion \| experiment; project; reason }[]`。表的补列：`report.project_id/tags/sources/model`、`artifact_meta.created_at/sources`（名称与大小取自快照文件本身）、`conclusion.created_at`、`draft.updated_at`、`project.created_by`、`conversation.created_at`、新表 `conversation_read`（D12-12）、`library_repo.description`、`library_staging.reason`、`automation_rule.created_by` 与步骤 JSON、`automation_run.ended_at`；**D30-02 补生命周期游标记录：每个 Lab 实例一行，保存自动化最后处理的 store 生命周期事件 cursor，表名、列名由工程师定，消费事务与续读语义见 D7-10**；`discussion_context.artifact_id` 存 `ArtifactRef`，去掉指向 `artifact_meta` 的外键 | **选定：** 这些都是 Lab 或 agent 产生时就知道的事实，在写入处记下（COV G05–G09、G16、G19、G21、G37、G38、G46、G48）。**备选：** 从正文或文件名猜：投影不确定 | 串联 | 是 |
| D12-17 | **事件与流的帧形** | `GET /api/lab/events?lab=`、`/api/lab/agents/{id}/stream`、`/api/lab/jobs/{run}/tail` | `events`：每帧 `event: change`，`data` 是一个 `LabChange`（D7:130-132 的联合，原样列在“事件”一节：`catalog`、`run{run}`、`conversation{id}`、`automation`、`library`、`compute`）；`conversation` 频道在一条消息结束（`message_end`）、Lab 侧事实变化、Panel 或 Automation 会话头改变，以及挂在这些会话头的在途槽位变化时发出，流式文字走 `watchAgent`。槽位变化由 D7-08 的有订阅者定期端点读取发现，按 D12-04 当前挂载位置通知，具体频道见下方失效表（D29-03/04）。**会话头与页面失效：** Panel 会话头属于各页的 `panels`；Panel 会话由 `panel.prompt` 新建，发起命令的页面在命令返回后让自己的 loader 失效。Automation 会话头属于 `automation` 页的 `conversations`；新会话开出时 `automation_run` 变化已发 `automation`，该页重读带出会话头。Panel 或 Automation 会话头改变时 Lab 发 `conversation{id}`，`panels` 含该会话的页面及 `conversations` 含该会话的自动化页重读（D31-01）。`agents/{id}/stream`：每帧 `data` 是 `AgentStreamFrame`（`{kind: 'omp_line', line}` 或 `{kind: 'mux', frame}`），`line` 是原样的 omp JSONL 文本。`jobs/{run}/tail`：每帧 `{ observedAt, text }`，`text` 是 `remote tail` 的整段快照，`observedAt` 是 Lab 取到它的时刻。频道到读取的失效表见下文 | **选定：** 通知只说“哪个切片变了”（D7-08）；帧外层统一包装，字符串行与 Mux 控制帧在 SSE 文本上无歧义。**备选：** 每个读方帧都发 `conversation`：每个 token 使整页重读。**备选：** 给 Panel 头另设频道：改 D7 的 `LabChange` 联合 | 技术 | 否 |

### D12-06 实验页面投影与版本来源

**提交时间轴（D35-01 v3）。** W-09 在 `experiment` 页带出 `commits: { seq: Seq; at: Instant }[]`，`ref` 为草稿时为 `[]`。服务端先取 `GET /runs/{run}/graph` 得到其 `at`，再读 `GET /runs/{run}/stream?after=0` 直到该序号，按序收集每个携带 `records` 的提交级事件 `run_started` 与 `step_committed` 的 `seq`、`at`；只有根值、没有调用的提交同样在列。W-10 model 将游标时刻 T 映射为 `k = max{ seq ∈ commits | at(seq) ≤ T }`，以 `at=k` 按 D12-05 读取 `rewind`；游标处在或晚于最后一项提交时刻时，`at=null`、读取实时状态。不从 `Call` / `AbortedCall` 的 `step` 或 `endedAt` 反推提交。详情页只接受控位置及拖动/点选回调，“回看到这一步”工具栏动作不能代替拖动；交付切片按 D8 的 WEB-03/WEB-07（D36-02 v2）。

**泳道计划条（D35-02 v3）。** W-09 在 `experiments` 页增加 `definitions: NodeDefinition[]`，与 `flowEditor.palette` 同源，服务端取 `context.library.read(lab)` 的库默认分支定义。W-10 按以下规则投影，不将计划条列入 D9：

- 仅给尚未开始执行的未绑定草稿画计划条：`ExperimentWire.run` 为 null、`draft` 非空，且不满足 `pendingLaunch.state = 'sent'` 且 `slots` 非空。满足后者的实验项已经开始第一正式步，虽须第一次正式提交才建立运行，但此时只画在途槽位的实际时段。
- 已绑定运行（含 `Open`）不画计划条，只画已提交调用与在途槽位的实际区间；来源草稿只是索引，不按 `fn`、画布顺序或调用次序把草稿节点对应成调用或槽位的运行进度。
- 草稿节点按 `fn` 关联 `definitions`，时长取 `DraftNode.estimateMinutes ?? NodeDefinition.estimateMinutes`；泳道由 `NodeDefinition.template` 经 `templates` 的设备（P3）确定。
- 根节点锚点取 `now`；按 `DraftNode.from` 的拓扑顺序累计，节点起点为各上游结束时刻的最大值。区间只标 `planned`，不冒充实际执行。
- 实际时段取目录图中调用的 `startedAt/endedAt` 与在途槽位的 `startedAt`（D12-14），按调用模板经 `templates` 的设备归泳道。冲突由投影在同一设备泳道的计划区间与实际区间之间算出，后端不存计划坐标。

**版本化节点定义（D35-03 v1）。** W-09 在 `experiment` 页增加 `versionedDefinitions: { version: Version; definition: NodeDefinition }[]`，覆盖该运行图中各 `Call.version` 与目录在途槽位 `SlotState.version` 出现的每个版本。服务端按版本静态导出定义：已提交版本取 store `GET /versions/{version}` 的 `NodeVersionRecord`（commit 与源码）；尚未提交的在途版本从持槽会话的 worktree 导出（占位，假定能工作）。`definitions` 保持库默认分支，仅供草稿节点使用；W-10 按实际 `version` 关联在途与已提交节点的定义（D12-14），不用默认分支代替。过渡期内，在途与已提交节点不关联定义、参数默认值留空。wire 与服务端归 W-09，消费及投影归 W-10。

### D12-04 在途槽位挂载（D29-02）

| 会话当前状态 | 槽位挂载位置 |
| --- | --- |
| 有 Open 运行 | 该运行的 `ExperimentWire.slots` |
| 无运行、Discussion 来源、有 pendingLaunch | 该 pendingLaunch 实验项的 `ExperimentWire.slots` |
| 无运行、Discussion 来源、无 pendingLaunch | 该讨论的 `DiscussionHeaderWire.conversation.slots` |
| 无运行、Panel 或 Automation 来源 | 该会话头的 `ConversationWire.slots` |

每批槽位在一个响应里只出现一次；不挂在会话头时，该会话头的 `slots` 为 `[]`。会话不在线时在途槽位为空，不唤醒停驻会话。

## 类型定义

文件布局：`src/protocol/lab/external/`（D12-01）、`ids.ts`、`rows.ts`、`catalog.ts`、`pages.ts`、`command.ts`、`events.ts`，每个类型同时导出 zod schema。外部类型名以权威方产物中的导出名为准。

`apps/web/src/protocol/lab/**` 仅由 W-09 `pepgent-lab` 写入（D16-03④）：在自己的分支与 PR 中经 A2-12 完成并合入 main 后，W-10 `pepgent-web` 从 origin/main 只读消费；两席不同时修改此域，不共分支或 PR。仓 A 建立前的 store 契约接法按 D16-05，由 W-06 的 A2-10 先合入，再由 W-09 接依赖。

### 外部类型（D12-01）

```ts
// ---- external/store.ts：import type 自仓 A 的 contract 模块（contract.ts） ----
export type {
  Value, Capture, NodeVersionRecord, RunState, CallStatus, GraphNode, GraphEdge, RunGraph, RunSummary,
  FunctionVersionUsage, ComparisonPair, RunComparison, VolumeManifest, ValueUsage, Activity,
} from 'pepgent-store/contract'
export type RunId = RunSummary['run']                           // store 拥有的 id 与时刻直接取 contract 推导的类型，不另加品牌
export type SessionId = RunSummary['holder']
export type Seq = RunGraph['at']
export type Hash = NodeVersionRecord['version']                 // 64 位小写 hex
export type AtomName = string
export type FnName = string
export type Version = Hash
export type FunctionUsage = FunctionVersionUsage[]              // GET /functions/{name}/usage（contract FunctionUsageSchema）
export type Change = Extract<RunGraph['derivedFrom'], object>['changes'][number]   // contract ChangeSchema 推导的类型
export type Committed = { kind: 'Committed'; step: Seq; position: number }

// ---- external/remote.ts：由 `remote schema` 生成（remote/model.rs） ----
// 生成产物中 Lab 用到的：TemplateName、BackendKind、TemplateInfo、Lifecycle、RunSummary（此处导出名为 RemoteRunSummary）、RunStatus

// ---- external/omp.ts：由 omp 的 rpc-wire.schema.json 生成（rpc.md:1726-1748） ----
// 生成产物中 Lab 用到的：AgentMessage（导出名 OmpMessage）、Model（导出名 OmpModel）

// ---- external/mux.ts：转录自 mux README（与 D3 §4 一致） ----
export type AgentId = string & { readonly __brand: 'AgentId' }
export type Generation = string
export type Where = { kind: 'local'; host: string } | { kind: 'remote'; runId: string }
export type OmpLine = string
export type Presence = { agentId: AgentId; since: Instant; generation: { id: Generation; where: Where; since: Instant } | null }
export type FileEntry = { path: string; bytes: number; kind: 'file' | 'dir' }
export type MuxReaderFrame =                                   // ReaderDown 中除 OmpLine 外的帧
  | { type: 'mux_welcome'; prefix: string; generation: Generation | null }
  | { type: 'mux_generation_started'; generation: Generation; where: Where }
  | { type: 'mux_generation_exited'; generation: Generation; code: number }

// ---- external/eval.ts：转录自 D5 §3.6（D5-plugins-eval.md:112-125、294-313），加 D12-14 ----
export type SlotId = string
export type FieldKind = 'number' | 'string' | 'boolean' | 'file'
export type Shape = { kind: 'single'; type: FieldKind } | { kind: 'record'; fields: Record<string, FieldKind> }
export type SlotState =
  | { kind: 'running'; body: 'Program' | 'Agent'; env: TemplateName | 'central'; agentId?: AgentId; remoteRun?: string
      startedAt: Instant; version: Version; inputs: AtomName[] }            // D12-14
  | { kind: 'awaiting_human'; request: string; inputs: AtomName[]; shape: Shape; startedAt: Instant; version: Version }   // D12-14
```

### id 与 Lab 行（D12-02、D12-16）

```ts
// ---- ids.ts ----
export type Instant = string                                             // ISO 8601 UTC；与 contract 的时刻同为 string
export type NoParams = Record<string, never>                             // 运行时 z.object({}).strict()：精确空对象
export type LabId = string & { readonly __brand: 'LabId' }               // Better Auth organization.id
export type UserId = string & { readonly __brand: 'UserId' }             // Better Auth user.id
export type MemberId = string & { readonly __brand: 'MemberId' }         // Better Auth member.id
export type ProjectId = string & { readonly __brand: 'ProjectId' }
export type ConversationId = string & { readonly __brand: 'ConversationId' }
export type DraftId = string & { readonly __brand: 'DraftId' }
export type ConclusionId = string & { readonly __brand: 'ConclusionId' }
export type AutomationRuleId = string & { readonly __brand: 'AutomationRuleId' }
export type AutomationRunId = string & { readonly __brand: 'AutomationRunId' }
export type ReportId = string & { readonly __brand: 'ReportId' }
export type MilestoneId = string & { readonly __brand: 'MilestoneId' }
export type InvitationId = string & { readonly __brand: 'InvitationId' }
export type LibraryRepoId = string & { readonly __brand: 'LibraryRepoId' }
export type DiscussionArtifactId = string & { readonly __brand: 'DiscussionArtifactId' }   // artifact_meta.id
export type StoreArtifactRef = `store:${string}`                         // store:<Hash>
export type DiscussionArtifactRef = `discussion:${string}`               // discussion:<DiscussionArtifactId>
export type ArtifactRef = StoreArtifactRef | DiscussionArtifactRef

// ---- rows.ts ----
export type LabRole = 'owner' | 'researcher' | 'student' | 'guest'
export type LabGlyph = 'robot' | 'flask' | 'puzzle'
export type AvatarTone = 'ink' | 'teal' | 'orange' | 'blue'
export type LabGrants = {                                                // Better Auth 判定的结果（D7-03、D10-12、D11-29A、D11-49、D12-10）
  write: boolean; discussion: { create: boolean; prompt: boolean }
  startWithoutApproval: boolean; approve: 'any' | 'own_experiments' | 'none'
  buildImages: boolean; manageMembers: boolean; editLibrary: boolean; updateLab: boolean   // updateLab = organization:update
}
export type LabWire = { id: LabId; name: string; glyph: LabGlyph | null; description: string | null; openRuns: RunId[] }
export type MemberWire = {
  id: MemberId; user: UserId; name: string; email: string; role: LabRole
  profile: { avatarTone: AvatarTone | null; initials: string | null; description: string | null
             mainProject: ProjectId | null; gpuHoursQuota: number | null }
}
export type AccountWire = { user: UserId; name: string; email: string; member: MemberId; role: LabRole; grants: LabGrants }
export type ProjectWire = { id: ProjectId; lab: LabId; name: string; description: string | null; archived: boolean; createdBy: MemberId }
export type ConversationOrigin =                                         // D7:188-191
  | { kind: 'Discussion'; name: string; project: ProjectId | null; archived: boolean }
  | { kind: 'Panel'; page: LabPage; scope: string }
  | { kind: 'Automation'; rule: AutomationRuleId; automationRun: AutomationRunId }
export type ConversationWire = { id: ConversationId; lab: LabId; owner: MemberId; origin: ConversationOrigin
                                 agent: AgentId | null; session: SessionId | null; slots: SlotWire[]; createdAt: Instant }
// slots = 按 D12-04 挂在本会话头时，为该会话在线一代当前全部在途槽位；否则为空数组；会话不在线时为空数组。读取在线根会话时由 writers() → 各会话 slots() 填充。
export type DraftWire = { id: DraftId; lab: LabId; project: ProjectId | null
                          origin: { discussion: ConversationId; retroRun: RunId | null }
                          canvas: DraftCanvas; savedVersion: number; updatedAt: Instant }
export type PendingLaunchWire = { conversation: ConversationId; draft: DraftId; at: Instant; state: 'awaiting_approval' | 'sent' }
export type ExperimentExtWire = { run: RunId; number: string; name: string; project: ProjectId | null; draft: DraftId | null }
export type ArtifactRole = 'raw' | 'figure' | 'log' | 'verdict' | 'metadata' | 'report' | 'conclusion' | 'draft' | 'analysis' | 'todo'
export type ArtifactMetaWire = { id: DiscussionArtifactRef; conversation: ConversationId; hash: Hash; name: string
                                 size: number; source: string | null; role: ArtifactRole; sources: ArtifactRef[]; createdAt: Instant }
export type ChangeRow = { kind: 'add' | 'change' | 'remove'; text: string }
export type Assignment = { item: { kind: 'discussion'; conversation: ConversationId } | { kind: 'experiment'; run: RunId }
                           project: ProjectId; reason: string }
export type AttachmentWire = { id: string; conversation: ConversationId; toolCallId: string } & (
  | { kind: 'plan'; draft: DraftId; title: string; plan: { text: string; node: string }[] }
  | { kind: 'conclusion'; conclusion: ConclusionId }
  | { kind: 'references'; artifacts: ArtifactRef[] }
  | { kind: 'changes'; target: string; rows: ChangeRow[]; assignments: Assignment[] })
export type ConclusionWire = { id: ConclusionId; conversation: ConversationId; text: string; evidence: string
                               pendingRun: RunId | null; createdAt: Instant
                               confirmation: { kind: 'pending' } | { kind: 'confirmed'; at: Instant; by: MemberId } }
export type ReportWire = { id: ReportId; lab: LabId; conversation: ConversationId | null; project: ProjectId | null
                           title: string; body: string; figures: ArtifactRef[]; tags: string[]; sources: ArtifactRef[]
                           model: { provider: string; id: string } | null; createdAt: Instant }
export type ActivityWire = { id: string; lab: LabId; actor: MemberId | null; project: ProjectId | null
                             kind: string; text: string; at: Instant }  // 只记 Lab 自己产生的事件（D7-02）
// kind 为产生事件的 D12-10 命令名，仅以下三族（D38-02 v2），wire 仍为 string：
// 成员：member.invite、member.role、member.quota、member.remove；结论确认：conclusion.confirm；
// 节点合入：library.merge、library.apply、agentTemplate.saveVersion，不将后两者改写为 library.merge。
export type MilestoneWire = { id: MilestoneId; lab: LabId; project: ProjectId | null; title: string
                              description: string | null; dueAt: Instant | null; completedAt: Instant | null }
export type InvitationWire = { id: InvitationId; email: string; role: LabRole; sentAt: Instant; inviter: MemberId }
export type LibraryRepoWire = { id: LibraryRepoId; remoteUrl: string; branch: string; description: string
                                publicKey: string | null; checkout: { head: string; sequence: number; fetchedAt: Instant; ahead: number } }
export type HumanIrcQueueWire = { msg: string; principal: UserId; body: string; queuedAt: Instant }
```

#### Lab 自有活动的读取与首页投影（D38-02 v2）

**写入（W-09）：上述命令成功落库时，在同一事务写一行 activity。**

`ActivityWire` 的形状不变，`kind` 只取上述三族的原命令名。`actor` 为执行命令的成员；结论事件的 `project` 取其讨论的项目，节点合入事件在命令会话是讨论时取该讨论项目、Panel 会话为 null，成员事件为 null。`text` 为事实摘要：结论正文、合入结果的 `paths` 列表，或成员与角色/配额；不新增关联目标字段。`home.activity` 返回本 Lab 的全部 activity 行；`settings.repoActivity` 仅返回节点合入族三个命令名的行。

首页由 W-10 按封闭词表投影：`conclusion.confirm` → category `experiments`、glyph `literature`、action.dialog `results`；`library.merge`、`library.apply`、`agentTemplate.saveVersion` → category `data`、glyph `database`、action.dialog `dataset`。`member.*` 仍落库与出线，但不进入首页事件流。标题按 `kind` 取 renderer copy，入口打开 renderer 本地已有弹窗，不跳具体关联对象、不新增合入专属弹窗。合入弹窗标题沿现有“数据集”，不是“文献”。活动写入和页面读取归 W-09，首页投影与 `client/services/lab/invalidation.ts` 归 W-10；D12-17 的 `library` 频道令 `home` 重读，成员与结论仍沿 `catalog` 令 `home`、`settings` 失效。

### 草稿编码（D12-06；`draft.canvas` 列存其 JSON）

```ts
export type DraftCanvas = {
  title: string
  description: string
  stages: { name: string }[]                  // 第 i 个名字标注拓扑深度为 i 的那一组节点
  nodes: DraftNode[]
}
export type DraftNode = {
  id: string                                  // 画布内唯一
  fn: FnName                                  // 节点库函数名
  from: string[]                              // 上游 DraftNode.id
  inputs: { parameter: string; expression: string }[]   // 覆盖的参数；值是 TS 表达式文本，与 NodeDefinition.parameters[].defaultValue 同一写法
  arm: string | null                          // 实验分组（如对照组），用户内容
  estimateMinutes: number | null              // 计划时长；只作估时，不是执行证据；缺省时投影取 NodeDefinition.estimateMinutes
  origin: 'plan' | 'ai_suggestion'
}
// lab_propose_experiment{title, plan} 建草稿：每个 plan 步一个节点，from = 前一步，arm = null，origin = 'plan'
```

### 节点库（`feat/lab-10-library`（`fc89bcd`）按 D12-03、D12-15 修改）

```ts
export type NodeParameter = { name: string; type: string; optional: boolean; defaultValue: string | null }  // defaultValue 是 TS 表达式原文，不求值
export type NodeReturnField = { name: string; type: string }
export type NodeDefinition = {
  name: FnName; path: string; signature: string
  parameters: NodeParameter[]; returns: string; fields: NodeReturnField[]
  body: { kind: 'Program' | 'Agent' | 'Human'; source: string }
  defaultEnvironment: string | null; template: TemplateName | null
  documentation: string; source: string
  artifacts: { field: string; type: string }[]
  group: NodeGroup; estimateMinutes: number                           // D12-15，lab-library 约定必填
}
export type NodeGroup = 'dev' | 'char' | 'calc'                       // 与 web/client/contracts/lab-experiments.ts:8 同一枚举
export type LibrarySnapshot = {
  commit: string; sequence: number; nodes: NodeDefinition[]
  staged: { fn: FnName; changes: { base: string; source: string }; reason: string; definition: NodeDefinition }[]
  drafts: { conversation: ConversationId; paths: string[]; behind: number }[]   // 含 .omp/agents/** 的未合入改动
}
export type LibraryVersionDetails = { record: NodeVersionRecord; display: { kind: 'commit_sequence'; sequence: number } }
export type AgentTemplateWire = {                                     // D7-11：Lab 库 .omp/agents 的 omp agent 定义
  id: string; harness: 'omp'; description: string; models: string[]  // models 取自 frontmatter
  files: { path: string; contents: string }[]                         // 默认分支（中心检出）上的文件
  lastCommit: { commit: string; sequence: number; at: Instant }
  drafts: { conversation: ConversationId; paths: string[] }[]        // 各会话未合入的该模板文件改动
}
```

### 自动化（D12-09）

```ts
export type AutomationActor = { kind: 'automatic' } | { kind: 'agent'; template: string } | { kind: 'approval' }
export type AutomationStep = { text: string; detail: string; actor: AutomationActor }
export type AutomationTrigger =
  | { kind: 'event'; event: 'run_started' | 'run_ended' | 'run_aborted' }
  | { kind: 'schedule'; cron: string }                    // D30-03 v2：cron 按 UTC 解释，croner 显式 timezone: "UTC"
export type AutomationScope = { kind: 'lab' } | { kind: 'focused_project' } | { kind: 'project'; project: ProjectId }
// focused_project 每次匹配/命名时取 creator 当前 mainProject，无主项目按 lab；不增加规则字段（D30-01）。
export type AutomationRuleInput = { lab: LabId; name: string; enabled: boolean; scope: AutomationScope; trigger: AutomationTrigger
                                    when: AutomationStep[]; conditions: AutomationStep[]; then: AutomationStep[] }
export type AutomationRuleWire = AutomationRuleInput & { id: AutomationRuleId; creator: MemberId }
export type AutomationTriggerFact =
  | { kind: 'event'; run: RunId; event: 'run_started' | 'run_ended' | 'run_aborted'; at: Instant }
  | { kind: 'schedule'; at: Instant }
  | { kind: 'manual'; by: MemberId; at: Instant }
export type AutomationRunWire = { id: AutomationRunId; rule: AutomationRuleId; trigger: AutomationTriggerFact
                                  createdAt: Instant; endedAt: Instant | null; conversation: ConversationId | null
                                  state: { kind: 'waiting'; action: string } | { kind: 'running' } | { kind: 'ok' | 'failed' | 'skipped' } }
// 首条 prompt 投递后的首次 settle 记 ok 与 endedAt，续写不再改变该运行；条件不满足同为 ok，skipped 只由 dismiss 产生（D30-06）。
```

### 目录、会话与页面（D12-04 至 D12-08）

```ts
// ---- catalog.ts ----
export type SlotWire = { writerSession: SessionId; slot: SlotId; fn: FnName; state: SlotState }
export type ExperimentWire = {
  ext: ExperimentExtWire | null
  run: RunSummary | null
  graph: RunGraph | null                      // 最新提交
  slots: SlotWire[]                           // 该运行所属根会话的全部在途槽位
  draft: DraftWire | null                     // 未绑定运行的草稿，或绑定运行的来源草稿
  pendingLaunch: PendingLaunchWire | null
  conversation: ConversationId                // 运行：根 session 对应的会话；草稿：origin.discussion
  owner: MemberId                             // 该会话的所有者
}
export type DiscussionHeaderWire = {           // 讨论头随 catalog 频道失效；挂在讨论头的在途槽位也随 catalog 频道失效（D29-02/04）
  conversation: ConversationWire              // origin.kind = 'Discussion'
  runs: { run: RunId; relation: 'originated' | 'bound' }[]
  conclusions: ConclusionId[]
}
export type DiscussionActivityWire = {         // 随消息变化，只在页面，随 conversation 频道失效
  conversation: ConversationId
  lastMessage: { at: Instant; role: 'user' | 'assistant'; text: string } | null
  readAt: Instant | null                      // 当前成员（D12-12）
}
export type LabCatalogWire = {
  labs: LabWire[]; lab: LabId; account: AccountWire
  members: MemberWire[]; projects: ProjectWire[]
  experiments: ExperimentWire[]; discussions: DiscussionHeaderWire[]   // discussions 按创建时刻降序
}

// ---- 会话详情：lab.conversation.read（讨论页、各页右栏与 Automation 会话共用）；会话头在目录、页面 panels 或 automation.conversations，运行关系与 pending_launch 在目录，不重复 ----
export type ConversationDetailWire = {
  conversation: ConversationId
  messages: OmpMessage[]
  attachments: AttachmentWire[]
  conclusions: ConclusionWire[]
  context: ArtifactRef[]                      // discussion_context
  artifacts: ArtifactMetaWire[]               // 本会话的讨论产物
  ircQueue: HumanIrcQueueWire[]
}
export type ConversationModelsWire = { current: OmpModel; available: OmpModel[] }

// ---- pages.ts ----
export type LabPage = 'home' | 'experiments' | 'experiment' | 'flowEditor' | 'nodes' | 'automation' | 'datasets'
  | 'discussions' | 'discussion' | 'clusters' | 'connectCluster' | 'containers' | 'settings'
export type LabPageParams = {
  home: NoParams
  experiments: { from: Instant; until: Instant }
  experiment: { ref: { kind: 'run'; run: RunId } | { kind: 'draft'; draft: DraftId }; at: Seq | null
                compare: RunId | null; workspace: { step: Seq; position: number } | null }
  flowEditor: { draft: DraftId }
  nodes: { version: Version | null }
  automation: NoParams
  datasets: NoParams
  discussions: NoParams
  discussion: { conversation: ConversationId }
  clusters: NoParams
  connectCluster: NoParams
  containers: NoParams
  settings: NoParams
}
export type TemplateMetadata = {                                             // P3
  image: string; devices: string[]
  mounts: { path: string; access: 'rw' | 'ro' | 'device' }[]
  resources: { cpu: number; memoryGiB: number; gpu: number; diskGiB: number; maxRuntimeHours: number
               priority: 'low' | 'normal' | 'high'; boundClusters: string[]; primaryCluster: string | null
               selector: string | null; allowPreemptible: boolean; deviceAccess: boolean; outboundNetwork: boolean }
}
export type TemplateWire = TemplateInfo & { metadata: TemplateMetadata }
export type JobWire = { run: RemoteRunSummary; status: RunStatus }
export type ImageDefinition = {                                               // P15
  name: string; path: string; base: string // name = 发布的 OCI repository 路径，不含 registry 主机、tag 或 digest，例如 pepgent/omp-agent（D38-03）
  dependencies: { name: string; version: string; kind: 'base' | 'sdk' | 'python_package' | 'internal_library' | 'files' | 'runtime_config' }[]
  files: { path: string; size: number; contents: string | null }[]           // contents：文本文件全文，二进制为 null
}
export type MemberStatusWire = { member: MemberId; grants: LabGrants; lastActiveAt: Instant | null; online: boolean
                                 gpuHoursUsed: number | null }               // P9：无来源时 null，D9 判为 U
export type VolumeWire = { run: RunId; step: Seq; position: number; manifest: VolumeManifest }

export type LabPageWire = {
  home: { reports: ReportWire[]; activity: ActivityWire[]; milestones: MilestoneWire[]
          templates: TemplateWire[]; jobs: JobWire[]; discussionActivity: DiscussionActivityWire[]; panels: ConversationWire[] }
  experiments: { templates: TemplateWire[]; definitions: NodeDefinition[]; panels: ConversationWire[] } // 草稿与运行在目录；definitions 与 flowEditor.palette 同取默认分支
  experiment: { rewind: RunGraph | null; comparison: RunComparison | null; workspace: VolumeManifest | null
                templates: TemplateWire[]; definitions: NodeDefinition[] // 默认分支，仅供草稿
                versionedDefinitions: { version: Version; definition: NodeDefinition }[]
                commits: { seq: Seq; at: Instant }[] // 全部提交级事件，含 Root-only；草稿为 []
                presence: Presence[]; panels: ConversationWire[] }
  flowEditor: { palette: NodeDefinition[]; templates: TemplateWire[]; panels: ConversationWire[] }   // 草稿在目录
  nodes: { library: LibrarySnapshot; usage: { fn: FnName; versions: FunctionUsage }[]
           draftReferences: { draft: DraftId; fns: FnName[] }[]; templates: TemplateWire[]
           version: LibraryVersionDetails | null; panels: ConversationWire[] }
  automation: { rules: AutomationRuleWire[]; runs: AutomationRunWire[]; conversations: ConversationWire[]; panels: ConversationWire[] }
  datasets: { artifacts: ArtifactMetaWire[]; contexts: { conversation: ConversationId; artifacts: ArtifactRef[] }[]
              references: AttachmentWire[]; objectSizes: { content: Hash; size: number }[]
              valueRuns: { content: Hash; runs: ValueUsage[] }[]; volumes: VolumeWire[]
              templates: TemplateWire[]; panels: ConversationWire[] }
  discussions: { activity: DiscussionActivityWire[]; selected: ConversationId | null }   // selected = 目录 discussions[0]；详情经 lab.conversation.read
  discussion: { activity: DiscussionActivityWire[]; selected: ConversationId }
  clusters: { templates: TemplateWire[]; jobs: JobWire[]; presence: Presence[]; panels: ConversationWire[] }
  connectCluster: { templates: TemplateWire[] }
  containers: { images: ImageDefinition[]; templates: TemplateWire[]; jobs: JobWire[]
                definitions: NodeDefinition[]; panels: ConversationWire[] }
  settings: { members: MemberStatusWire[]; roles: { role: LabRole; grants: LabGrants }[]; invitations: InvitationWire[]
              repos: LibraryRepoWire[]; repoActivity: ActivityWire[]
              library: { commit: string; sequence: number; nodes: FnName[] }
              agentTemplates: AgentTemplateWire[]; ompVersion: string                 // ompVersion：P18
              discussionActivity: DiscussionActivityWire[]; panels: ConversationWire[] }
}

// ---- 前端接缝（D7:117-123 补全）----
export interface LabBridge {
  readCatalog(lab: LabId | null): Promise<LabCatalogWire>
  readPage<P extends LabPage>(lab: LabId, page: P, params: LabPageParams[P]): Promise<LabPageWire[P]>
  readConversation(conversation: ConversationId): Promise<ConversationDetailWire>
  markRead(conversation: ConversationId): Promise<void>                                // lab.conversation.markRead（D12-12）
  readModels(conversation: ConversationId): Promise<ConversationModelsWire>
  send<C extends LabCommand>(command: C): Promise<LabCommandOutput[C['kind']]>
  uploadArtifact(conversation: ConversationId, name: string, role: ArtifactRole, bytes: Blob): Promise<ArtifactMetaWire>
  subscribe(lab: LabId, onChange: (change: LabChange) => void): () => void            // SSE /api/lab/events
  watchAgent(agent: AgentId, onFrame: (frame: AgentStreamFrame) => void): () => void   // SSE /api/lab/agents/{id}/stream
  watchJobTail(run: string, onTail: (tail: JobTailFrame) => void): () => void          // SSE /api/lab/jobs/{run}/tail
}
```

### 命令与结果（D12-10、D12-11）

```ts
// ---- command.ts ----
export type HumanIrcGuiOp =                                                             // D7:184-185
  | { op: 'enqueue'; msg: string; body: string } | { op: 'edit'; msg: string; body: string } | { op: 'withdraw'; msg: string }
export type DeriveAt = Committed | { kind: 'InFlight'; writerSession: SessionId; slot: SlotId }   // D7:181-183
export type GuiReturned =
  | { kind: 'number'; value: number } | { kind: 'string'; value: string } | { kind: 'boolean'; value: boolean }
  | { kind: 'file'; artifact: ArtifactRef }                                            // P16
export type GuiHandback = { fields: Record<string, GuiReturned> }                      // 单个输出用字段名 "value"（D5:130）

export type LabCommand =
  | { kind: 'lab.update'; lab: LabId; name: string; glyph: LabGlyph; description: string }
  | { kind: 'member.invite'; lab: LabId; email: string; role: LabRole }                // 重发即再次邀请同一邮箱
  | { kind: 'member.role'; member: MemberId; role: LabRole }
  | { kind: 'member.quota'; member: MemberId; gpuHours: number | null }                // null = 不限
  | { kind: 'member.remove'; member: MemberId }
  | { kind: 'project.create'; lab: LabId; name: string; description: string }
  | { kind: 'project.rename'; project: ProjectId; name: string }
  | { kind: 'project.merge'; project: ProjectId; into: ProjectId }
  | { kind: 'project.archive'; project: ProjectId }
  | { kind: 'repo.connect'; lab: LabId; remoteUrl: string; branch: string; description: string }
  | { kind: 'repo.sync'; repo: LibraryRepoId }
  | { kind: 'repo.rotate'; repo: LibraryRepoId }
  | { kind: 'repo.disconnect'; repo: LibraryRepoId }
  | { kind: 'agentTemplate.writeFile'; conversation: ConversationId; path: string; contents: string }   // 写进该 Panel 会话 worktree 的 .omp/agents/**
  | { kind: 'agentTemplate.removeFile'; conversation: ConversationId; path: string }
  | { kind: 'agentTemplate.saveVersion'; conversation: ConversationId; id: string }   // = library.merge 该模板的路径（D7:71）
  | { kind: 'discussion.create'; lab: LabId; project: ProjectId | null; name: string }
  | { kind: 'discussion.prompt'; conversation: ConversationId; msg: string; text: string }   // = 根会话 human_irc enqueue（D7-09）
  | { kind: 'discussion.load'; conversation: ConversationId; artifacts: ArtifactRef[] }
  | { kind: 'discussion.bind'; conversation: ConversationId; run: RunId }
  | { kind: 'discussion.rename'; conversation: ConversationId; name: string }
  | { kind: 'discussion.move'; conversation: ConversationId; project: ProjectId | null }
  | { kind: 'discussion.archive'; conversation: ConversationId }
  | { kind: 'conclusion.confirm'; conclusion: ConclusionId }
  | { kind: 'panel.prompt'; lab: LabId; panel: { page: LabPage; scope: string }; msg: string; text: string }
  | { kind: 'panel.model'; conversation: ConversationId; provider: string; modelId: string }   // 任一会话（D7-15）
  | { kind: 'human.irc'; to: AgentId; op: HumanIrcGuiOp }
  | { kind: 'draft.save'; draft: DraftId; canvas: DraftCanvas }
  | { kind: 'draft.discard'; draft: DraftId }
  | { kind: 'experiment.start'; draft: DraftId }
  | { kind: 'experiment.approve'; draft: DraftId }
  | { kind: 'experiment.update'; run: RunId; name: string; project: ProjectId | null }
  | { kind: 'intervene.takeover'; conversation: ConversationId; writerSession: SessionId; slot: SlotId; handback: GuiHandback }
  | { kind: 'intervene.answer'; conversation: ConversationId; writerSession: SessionId; slot: SlotId; handback: GuiHandback }
  | { kind: 'intervene.derive'; run: RunId; at: DeriveAt; changes: Change[] }
  | { kind: 'run.abort'; run: RunId }
  | { kind: 'library.stage'; lab: LabId; fn: FnName; changes: [{ kind: 'source'; source: string }]; reason: string }
  | { kind: 'library.apply'; lab: LabId; conversation: ConversationId; fns: FnName[] }
  | { kind: 'library.merge'; lab: LabId; conversation: ConversationId; paths: string[] }   // nodes/*.ts 或 .omp/agents/**
  | { kind: 'library.sync'; lab: LabId; conversation: ConversationId }
  | { kind: 'automation.rule.create'; rule: AutomationRuleInput }
  | { kind: 'automation.rule.update'; id: AutomationRuleId; rule: AutomationRuleInput }
  | { kind: 'automation.rule.delete'; id: AutomationRuleId }
  | { kind: 'automation.run'; rule: AutomationRuleId }
  | { kind: 'automation.approve'; run: AutomationRunId }
  | { kind: 'automation.dismiss'; run: AutomationRunId }
  | { kind: 'milestone.create'; lab: LabId; project: ProjectId | null; title: string; description: string; dueAt: Instant | null }
  | { kind: 'milestone.complete'; milestone: MilestoneId }

type Done = { kind: 'done' }
type LibraryCommit = { commit: string; paths: string[] }
export type LabCommandOutput = {
  'lab.update': Done
  'member.invite': { kind: 'invited'; invitation: InvitationId }
  'member.role': Done
  'member.quota': Done
  'member.remove': Done
  'project.create': { kind: 'created'; project: ProjectId }
  'project.rename': Done
  'project.merge': Done
  'project.archive': Done
  'repo.connect': { kind: 'connected'; repo: LibraryRepoId; publicKey: string }
  'repo.sync': { kind: 'synced'; head: string }
  'repo.rotate': { kind: 'rotated'; publicKey: string }
  'repo.disconnect': Done
  'agentTemplate.writeFile': Done
  'agentTemplate.removeFile': Done
  'agentTemplate.saveVersion': LibraryCommit & { kind: 'merged' }
  'discussion.create': { kind: 'created'; conversation: ConversationId }
  'discussion.prompt': Done
  'discussion.load': Done
  'discussion.bind': Done
  'discussion.rename': Done
  'discussion.move': Done
  'discussion.archive': Done
  'conclusion.confirm': Done
  'panel.prompt': { kind: 'prompted'; conversation: ConversationId }
  'panel.model': Done
  'human.irc': Done
  'draft.save': { kind: 'saved'; savedVersion: number }
  'draft.discard': Done
  'experiment.start': { kind: 'launch'; state: 'awaiting_approval' | 'sent' }
  'experiment.approve': Done
  'experiment.update': Done
  'intervene.takeover': Done
  'intervene.answer': Done
  'intervene.derive': { kind: 'derived'; run: RunId }
  'run.abort': Done
  'library.stage': { kind: 'staged'; fn: FnName }
  'library.apply': LibraryCommit & { kind: 'applied'; staging: 'cleared' | 'retained' }
  'library.merge': LibraryCommit & { kind: 'merged' }
  'library.sync': { kind: 'synced'; conversation: ConversationId }
  'automation.rule.create': { kind: 'created'; rule: AutomationRuleId }
  'automation.rule.update': Done
  'automation.rule.delete': Done
  'automation.run': { kind: 'started'; run: AutomationRunId }
  'automation.approve': Done
  'automation.dismiss': Done
  'milestone.create': { kind: 'created'; milestone: MilestoneId }
  'milestone.complete': Done
}
export type LabCommandResult<C extends LabCommand> = LabCommandOutput[C['kind']]       // D7:121 引用的结果类型
```

**逐命令权限**（Better Auth 判定角色语句；“owner”指该会话的 `conversation.owner` 等于操作者在目标 Lab 的 `member.id`，D11-49 口径；运行与草稿的会话见 `ExperimentWire.conversation`）

| `kind` | 权限 |
| --- | --- |
| `lab.update` | `organization: update` |
| `member.invite`、`member.role`、`member.quota`、`member.remove` | `manageMembers` |
| `project.create`、`project.rename`、`project.merge`、`project.archive` | `write` |
| `repo.connect`、`repo.sync`、`repo.rotate`、`repo.disconnect` | `editLibrary` |
| `agentTemplate.writeFile`、`agentTemplate.removeFile`、`agentTemplate.saveVersion` | `editLibrary`，且是该 Panel 会话的 owner |
| `discussion.create` | `discussion: create` |
| `discussion.prompt` | `discussion: prompt`，且是该讨论的 owner |
| `discussion.load`、`discussion.bind`、`discussion.rename`、`discussion.move`、`discussion.archive` | `write`，且是该讨论的 owner |
| `conclusion.confirm` | `write`，且是该结论所在会话的 owner |
| `panel.prompt` | `write`；Panel 会话不存在时以操作者为 owner 新建，存在时须是其 owner |
| `panel.model` | `write`，且是该会话的 owner |
| `human.irc` | `write`，且是该 agent 所属运行的会话 owner |
| `draft.save`、`draft.discard`、`experiment.start` | `write`，且是草稿所属讨论的 owner；`experiment.start` 的 `pending_launch.state` 由 `startWithoutApproval` 决定（D7-06） |
| `experiment.approve` | `approval: any`；或 `approval: ownExperiments` 且草稿所属讨论的 owner 是操作者（D11-29A、D11-29B） |
| `experiment.update` | `write`，且是该运行的会话 owner |
| `intervene.takeover`、`intervene.answer` | `write`，且是 `conversation.owner` 等于操作者在目标 Lab 的 `member.id` |
| `intervene.derive`、`run.abort` | `write`，且是该运行的会话 owner |
| `library.stage` | `editLibrary` |
| `library.apply`、`library.merge`、`library.sync` | `editLibrary`，且是参数中会话的 owner |
| `automation.rule.create`、`automation.rule.update`、`automation.rule.delete`、`automation.run` | `write` |
| `automation.approve`、`automation.dismiss` | `approval: any`；或 `approval: ownExperiments` 且该运行由事件触发、触发运行的 owner 是操作者 |
| `milestone.create`、`milestone.complete` | `write` |

#### 自动化规则删除（D30-07）

`automation.rule.delete{id}` 的命令形状、结果联合与权限不变。规则没有任何 `automation_run` 时，删除该规则行，返回 `Done` 并发 `automation`；规则已有运行时，返回既有领域失败 `revision_conflict`，规则、运行与 Automation 会话都不变。跑过的规则用 `automation.rule.update` 设 `enabled: false` 停用，不新增软删除字段、隐藏状态或失败码，也不级联删除运行、会话、worktree、结论或由它开出的实验的会话归属。

#### 草稿与启动意图的生命周期（D26-01 至 D26-06）

按 [D26（PM#43）](https://github.com/Pepgent/PM/issues/43)，草稿内容投递给 agent 之前可保存、可丢弃；投递之后（`sent` 或已绑定运行）保留为本次实验的来源草稿。状态由 `draft`、指向它的 `pending_launch` 与 `experiment_ext.draft` 派生，不在草稿上新增 `launched`、隐藏标记、版本快照或其他状态字段。上述逐命令权限与 `PendingLaunchWire`、`DraftWire`、命令结果形状保持不变。

**审批投递（LC-1）：** 草稿处于 `awaiting_approval` 时，`experiment.approve` 在一次受理中把该会话的 `pending_launch.state` 改为 `sent`，读取批准那一刻的当前 `draft.canvas`，以完整 `DraftCanvas` 的无损呈现、审批人的 `session.user.id` 为 principal，**按既定 `human_irc_queue` 入队语义（含 D12-17 的 `conversation` 通知与投递）**入队；pending 变化另发 `catalog`。不保存 start 时的内容快照，不新增版本或快照字段。

| 草稿的派生状态 | `draft.save` | `draft.discard` |
| --- | --- | --- |
| 无 pending 指向，且未绑定运行 | 按 D26 F14 已放行的保存规则替换完整 canvas，`savedVersion` 作为服务端保存修订号递增并随 `{kind:'saved', savedVersion}` 返回，更新 `updatedAt`、发 `catalog`；不新增基准版本、乐观锁或字段 | LC-4：删除该 `draft` 行，返回 `Done`、发 `catalog`；草稿从目录与 LAB-10 的 `draftReferences` 中消失 |
| 指向该草稿的 pending 为 `awaiting_approval`，且未绑定运行 | LC-2：按 F14 同一保存修订号规则递增 `savedVersion`，其余保存行为与无 pending 的草稿相同；pending 保持 `awaiting_approval`，不因保存撤回或重新申请 | LC-5：在一次受理中同时删除该 `pending_launch` 行与 `draft` 行，返回 `Done`、发 `catalog`；撤回尚未投递的启动意图，释放该讨论的 pending 主键，随后可再建 pending；不新增撤回或拒绝命令 |
| 该草稿所在会话的 pending 为 `sent` 且指向它，或已有 `experiment_ext.draft` 指向它 | LC-3：返回既有领域失败 `revision_conflict`；草稿、pending 和 `catalog` 都不变，不新增失败码 | LC-6：返回既有领域失败 `revision_conflict`；草稿、pending 和 `catalog` 都不变，不新增失败码 |

**已绑定草稿再次启动：** 草稿已有 `experiment_ext.draft` 指向它时，`experiment.start` 返回既有领域失败 `revision_conflict`，草稿、`pending_launch` 和 `catalog` 都不变（[Pepgent#18 restart 双闸门处置 a](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561436037)）。

主路径上，`sent` 的 pending 由随后的非派生 `run_started` 绑定到运行、写入 `experiment_ext` 后删除（D7-06）。已绑定草稿作为运行的来源草稿出现，不另列成一条未绑定草稿项；其内容不能再保存或丢弃。`plan` 转录附件保留历史内容，所指草稿已丢弃时的呈现见 `D12-coverage.md` 的 discussions 映射。

### HTTP 路由（D12-13、D12-17）

| 方法与路径 | 参数 | 请求体 | 成功响应 | 权限 |
| --- | --- | --- | --- | --- |
| `GET /api/lab/events?lab=` | `lab: LabId` | — | `text/event-stream`，每帧 `event: change`、`data: LabChange` | 调用者是 `lab` 的成员 |
| `GET /api/lab/agents/{id}/stream` | `id: AgentId` | — | `text/event-stream`，每帧 `data: AgentStreamFrame` | 调用者是该 agent 所属 Lab 的成员（归属见表下） |
| `GET /api/lab/jobs/{run}/tail` | `run`：remote 作业 id | — | `text/event-stream`，每帧 `data: JobTailFrame`；作业最新事实为 `removed` 时不开流（D7-18） | 调用者是本中心任一 Lab 的成员（remote home 由 Lab 容器持有，作业不按 Lab 划分，D7-19；算力页列出的就是这份作业表） |
| `GET /api/lab/objects/{sha}` | `sha: Hash` | — | 对象字节，`application/octet-stream`；媒体类型由投影取 `Value.file.media` | 调用者是本中心任一 Lab 的成员（store 每个中心一份，对象按内容寻址） |
| `GET /api/lab/artifacts/{id}` | `id: DiscussionArtifactId` | — | 快照字节，`application/octet-stream` | 调用者是该产物所在会话所属 Lab 的成员 |
| `POST /api/lab/conversations/{conversation}/artifacts?name=&role=` | `conversation: ConversationId`；`name: string`；`role: ArtifactRole` | 原始字节（`Content-Type` 不参与存储） | `application/json`，`ArtifactMetaWire`；其 `id` 即后续使用的 `ArtifactRef` | `write`，且是该会话的 owner |
| `GET /api/lab/agents/{id}/files?dir=` | `id: AgentId`；`dir`：相对路径 | — | `application/json`，`FileEntry[]` | 同 `agents/{id}/stream` |
| `GET /api/lab/agents/{id}/files/{path}` | `id: AgentId`；`path`：相对路径 | — | 文件字节，`application/octet-stream` | 同 `agents/{id}/stream` |
| `GET /api/lab/volumes/{run}/{step}/{position}/files/{path}` | store 的运行、步、位置与卷内路径 | — | 文件字节，`application/octet-stream` | 调用者是该运行所属 Lab 的成员（`experiment_ext.lab_id`） |
| `/api/auth/*` | Better Auth | Better Auth | Better Auth | 公开（D11-30） |

**读取范围与归属。** 同一 Lab 的成员（含 guest）可以读取该 Lab 的全部会话，包括别人的讨论与 Panel 会话（argon 基线：读取不按角色或所有者隐藏）；`panels` 只列出当前用户自己的 Panel 会话头，是页面的选择范围，不是读取权限。agent 的所属 Lab，是其 `GET /agents` 列表里有该 agentId 的那个 Mux 实例所属的 Lab（D18-05、D29-01；停驻 agent 仍在列表里）。根 agent 与子 agent 用同一规则，根 agent 的结果与取 `conversation.lab` 相同。Lab 后端处理 `/api/lab/agents/{id}/stream`、`/files?dir=`、`/files/{path}` 时，在调用者为成员的各 Lab 的 Mux 实例列表中找该 agentId；找到就以该 Lab 作授权判定，并把请求转到该实例；都没有则返回 `not_found`。路由、参数、`AgentStreamFrame` 与 `watchAgent` 签名不变，不往 soroi 或 Mux 增加任何 Lab 字段。`lab.conversation.read`、`lab.conversation.models` 同样要求调用者是该会话所属 Lab 的成员。

六个 server function（D12-03）都是 `POST`，请求体是对应输入的 JSON，响应是 `OperationResult` 包住的输出；`lab.conversation.markRead` 输出为空。

### 事件（D12-17）

```ts
// ---- events.ts ----
export type LabChange =                                                                 // D7:130-132，不变
  | { kind: 'catalog' } | { kind: 'run'; run: RunId } | { kind: 'conversation'; id: ConversationId }
  | { kind: 'automation' } | { kind: 'library' } | { kind: 'compute' }
export type AgentStreamFrame = { kind: 'omp_line'; line: OmpLine } | { kind: 'mux'; frame: MuxReaderFrame }
export type JobTailFrame = { observedAt: Instant; text: string }
// GET /api/lab/events?lab=        event: change；data: LabChange
// GET /api/lab/agents/{id}/stream data: AgentStreamFrame
// GET /api/lab/jobs/{run}/tail    data: JobTailFrame
```

| 频道 | 什么时候发 | 失效的读取 |
| --- | --- | --- |
| `catalog` | Lab、成员、邀请、项目、`experiment_ext`、草稿、`pending_launch`、讨论头（名称、项目、归档、运行关系、结论）的任一事实变化；store 生命周期流的任一事件；挂在 pendingLaunch 实验项或讨论头 `DiscussionHeaderWire.conversation.slots` 的在途槽位变化 | 目录；`home`、`experiments`、`settings`、`discussions`、`discussion` |
| `run` | 该运行的 store 运行流事件；挂在该运行 `ExperimentWire.slots` 的在途槽位变化（D7-08 有订阅者时定期读在线根会话 `writers` → 各写方 `slots` 比较发现，不等待步提交） | 目录；同一运行的 `experiment`；`datasets` |
| `conversation` | 该会话一条消息结束（`message_end`）；附件、结论正文、装载上下文、当前成员已读、人类消息队列变化；Panel 或 Automation 会话头改变；挂在 Panel 或 Automation 的 `ConversationWire.slots` 的在途槽位变化 | 该会话的 `lab.conversation.read`；`discussions`、`discussion`、`home`、`settings`（`activity` 与 `discussionActivity`）；`panels` 含该会话的页面；`conversations` 含该会话的自动化页；`datasets` |
| `automation` | `automation_rule`、`automation_run` 变化 | `automation`；`home` |
| `library` | 库默认分支、`library_staging`、会话未合入改动、`.omp/agents` 变化 | `nodes`、`flowEditor`、`experiment`、`containers`、`settings`、`home` |
| `compute` | remote 作业列表或状态变化（有订阅者时定期发现，D7-12）；Mux 在线变化 | `clusters`、`containers`、`home`、`experiment` |

## 第一版无来源字段（D8-16 规则，列入 D9 输入）

这些视图字段在 D2–D7 与本表中都没有权威源，且任何 F 流程走不到：线上不出现，投影留空，D9 判为 `U`。原型里的演示值不得作为数据。

| 视图字段（web/client/contracts） | 缺什么 | COV |
| --- | --- | --- |
| `home.progress.phase`、`.detail` | 研究阶段与整体进展叙述 | G10 |
| `home.clusters.*`、`clusters.clusters[].health/load/gpu/cpu/nodeCount/handshakeAge`、`gpuNodePatterns`、`gateways`、`containers.clusterAvailability` | 集群健康与容量（P4） | — |
| `clusters.clusters[].isDefault` | Lab 默认集群选择；P3 的 `TemplateMetadata` 与 remote 只给每个模板自己的唯一后端端点，不给 Lab 默认值。视图 `ClusterRecord.isDefault` 为 `boolean \| null`，投影一律 `null`、不渲染默认标记，不改 UI、remote 或 wire（D38-01） | — |
| `experimentFlows[].description`（未绑定草稿的运行） | 没有草稿的运行无研究描述 | G13 |
| `experimentFlows[].remainingMinutes` | 未提交的后续调用不可知 | G47 |
| `nodes[].status` 的 `failed_verdict/flagged`、`tableVerdict`、`detail.verdict`、`artifactContracts`、`datasets.artifacts[].role/verdict/contract`（实验产物） | 产物契约与判据（D10-11(b)） | — |
| `clusters.containers[].state` 的 failed 与 exited 之分、`images[].liveContainers[].state` 同 | remote 不记退出结果 | G22 |
| `clusters.containers[].logs[].time/severity`、`containers[].host`、`resources.used` | remote tail 是纯文本快照；调度宿主与用量（P4） | G23 |
| `containers.images[].group/note/dependencies[].source/reason/change`、`files[].modified/change`、`layers[].size`、`occupancy[].layer/change`、`builds` | images 仓库与镜像仓库的这些事实不在 P15；Komodo 构建与标签按 D8-16 不进第一版 | G24、G25、G27–G30、G33、G34 |
| `images[].terminal`、`shellTranscript`、`agents[].scratch` 的容器与终端、`connectCluster` 的安装日志、注册令牌、连接测试结果 | 交互 shell（P6）、接入向导执行方（P7） | — |
| `settings.repositories[].images`、`imageDependencies`、仓库与模板的 on-push、凭据注入等开关 | 库仓库与镜像的依赖关系、仓库自动化策略 | G39、G40 |
| `settings.agents[].targets`、`models[].purpose`、`entries[].source` 的 `repository` 分支 | omp agent 定义没有这些项 | G42、G43、G50 |
| `automation.rules[].triggerKind` 的 `instrument` 与相应运行 | 仪器事件（P8），按 D8-16 不进第一版；公开类型不含该变体 | — |
| `settings.members[].gpuHours.used` | 资源计量（P9）；`gpuHoursUsed` 为 `null` | — |

## 占位（设计阶段先假定能工作）

沿用 D7 的 P1–P13（D7:278-291；P1 的定义导出已由 D10-11(c) 与 D12-15 定案，产物契约部分列入 D9）。本表新增或展开：

| 占位 | 假定 |
| --- | --- |
| P3（展开） | remote 模板能返回 `TemplateMetadata`（见类型定义），即 D2-09 的“GUI 展示所需字段” |
| P14 对象大小 | store `GET /objects/{sha}` 响应带 `Content-Length`，Lab 读响应头即可得到大小 |
| P15 镜像定义导出 | Lab 能从 images 检出读出每个镜像的 `ImageDefinition`（D7-13）；`name` 导出发布的 OCI repository 路径，不含 registry 主机、tag 或 digest，模板引用按 D7-13 / D38-03 归一关联，假定能工作 |
| P16 GUI 交回中的文件 | Lab 把 `ArtifactRef` 的字节放进持有槽位会话可读的位置，以 D5 `Returned.file{path, placement}` 交给端点 |
| P17 智能体模板使用次数 | 设置页“使用次数”能从会话记录统计；第一版投影不显示 |
| P18 omp 版本 | Lab 能读出所装 omp 的版本（D7-11“`harnessVersion` 取容器里 omp 的版本”） |
| P19 仓 A 契约依赖 | `Pepgent/Pepgent` 能以 git 依赖引用仓 A 的 `contract` 模块（D10-10） |

## 主路径时序（WEB-02 的读取与失效）

```mermaid
sequenceDiagram
    participant UI as 前端 _lab（loader）
    participant LAB as Lab 后端
    participant ST as store
    participant MUX as Mux
    UI->>LAB: lab.catalog.read{lab: null}
    LAB->>ST: GET /runs；逐个 GET /runs/{run}/graph
    LAB->>MUX: 在线根会话：POST /endpoints/eval:{conversation.session}/requests {"method":"writers"}，再逐端点 {"method":"slots"}；不唤醒 parked 会话
    LAB-->>UI: LabCatalogWire
    UI->>LAB: lab.page.read{lab, 'experiment', {ref: run, at: null, compare: null, workspace: null}}
    LAB-->>UI: { rewind, comparison, workspace, templates, definitions, versionedDefinitions, commits, presence, panels }
    UI->>LAB: lab.conversation.read{右栏 Panel 会话}
    UI->>LAB: GET /api/lab/events?lab=
    ST-->>LAB: /runs/{run}/stream step_committed
    LAB-->>UI: event: change {kind: 'run', run}
    UI->>LAB: 按失效表重读目录与 experiment
    UI->>LAB: lab.command{intervene.takeover{conversation, writerSession, slot, handback}}
    LAB->>MUX: POST /endpoints/eval:{writerSession}/requests {"method":"takeover","handback":HumanHandback}
    MUX-->>LAB: {"ok":true,"value":null}
    LAB-->>UI: { kind: 'done' }
```

## 通过后要改的文档与代码

| 文档或代码 | 位置 | 改成什么 |
| --- | --- | --- |
| `pepgent-pm/evidence/decisions/D7-lab-backend.md` | D7-05、D7-10、D7-11、D7-18 行，字段表 `settings` 行（D7:106），接口草图（D7:116-185） | 接口草图与 D7-18 的线契约改为指向本表；server function 加 `lab.conversation.read`、`lab.conversation.models`；`artifact.upload` 改为 D12-13 的路由；`settings` 读取无参；D7-05 的三个 host tool 输入按 D12-16；D7-10 的规则结构按 D12-09；D7-11 的模板编辑命令按 D12-10 |
| `pepgent-pm/evidence/decisions/D5-plugins-eval.md` | §3.6 `SlotState`（D5:295-297） | 按 D12-14 补 `startedAt`、`version`、`inputs` |
| `pepgent-pm/evidence/decisions/D10-repo-delivery.md` | D10-10 行与 D10:63 | 写明 Pepgent/Pepgent 也以 git 依赖引用仓 A 的 `contract`（D12-01） |
| `pepgent-pm/evidence/decisions/D8-mvp-scope.md` | §5.4 清单 | 加入本表“第一版无来源字段” |
| `Pepgent/Pepgent` 会话前分支 `feat/lab-10-library`（`fc89bcd`） | rpc/lab.ts、protocol/lab/library.ts、server/lab/library*.ts、server/lab/access.ts | 按 D12-03 并入统一读写面；staged 加 definition/reason，去 unavailable/cache；合入路径含 `.omp/agents/**`；NodeDefinition 加 group/estimateMinutes；access control 加 write |
| `Pepgent/Pepgent` `server/lab/schema.ts` | D12-16 所列各表 | 按 D12-16 补列与改外键 |
| `Pepgent/lab-library` | README 节点编写约定 | `@group`、`@estimateMinutes` JSDoc 约定（D12-15） |
| omp-soroi eval 插件（仓 B） | 控制端点 `slots` | D12-14 的三个字段 |
| `Pepgent/Pepgent` LAB/WEB 切片 issue | #13 LAB-04、#14 LAB-05、#16 LAB-06、#17 LAB-07a、#20 LAB-07b、#24 LAB-08、#19 LAB-09、#15 LAB-10、#22 LAB-11a、#18 LAB-11b、#11 LAB-12；#21 WEB-02 至 #29 WEB-07 | 秘书评论：契约以 D12 为准，列出各切片落在本表的哪几行 |
