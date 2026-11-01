| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D11-T | **赞成** | 分流表遵守 D10-07 的两步复核结构：先区分“已被 D10 取代”“正文已规定”“私有实现或证据流程”“仍需表决的产品契约”，再让直接消费者依赖的契约逐条表决。LR-05/09/27/31/33/41/50 的旧门禁或放权语义确已由 D10-00/05/08/09 覆盖；LR-39、LR-45 已由 D10-11、D10-12 表决；LR-51 无公开镜像的部分不凭私聊传述复原，而只把可核实内容去重并入相关条目，符合“不从缺失信息推断事实”。LR-06 等私有实现条目没有借复核之名改变提示词内容或新增跨组件契约。D11-A/B 的分批仅决定表决顺序，未把任何未追认契约默认为已通过；依赖切片仍须等待对应条目，符合 D10-07。 | — |
| D11-49 | **赞成** | `discussion:create/prompt` 把讨论写权限显式加入 Better Auth，而不是从“成员身份”推断写权限；owner、researcher、student 可创建和操作自己的讨论，guest 保持只读，符合 AGENTS.md 第 1 条及 D10-12 的权限口径。`discussion.prompt` 再核对 `conversation.owner == 当前用户在目标 Lab 的 member.id`，落实 D7-04 的成员身份权威和 D2-15 的一人一会话；角色授权与资源归属各由其权威记录判定。同 Lab 其他成员可读但不能成为第二个人类写方。消息 principal 使用 `session.user.id` 表达实际登录主体，与 conversation 的 Lab member 所有权记录职责不同，不构成重复所有者。 | — |
| D11-47A | **赞成** | 生命周期流需要跨运行、稳定且可续读的顺序；由 store 在提交 `run_started/run_ended/run_aborted` 的同一事务中分配并持久化递增十进制 cursor，使事件事实和顺序只有一个权威源头。`after` 严格大于及缺省 `"0"` 语义明确。已有数据按 `(at, run_id, seq)` 一次性分配的是首次发布顺序，并明确不伪称历史真实跨运行顺序，避免把迁移生成的索引冒充历史事实。生命周期流没有单个运行的自然终点，因此持续到订阅方断开合理。 | — |
| D11-47B | **赞成** | 单运行流已有 D6 的 `seq` 权威顺序，以十进制 `seq` 作为 SSE `id`、`kind` 作为 `event`、完整 `RunEvent` 作为 `data`，无需再引入第二种单运行 cursor。`after` 严格大于可无重复续读；运行已经结束时，在历史事件全部发出后关闭流，使订阅方能从流结束确认该有限生命周期已经完成。它与 D11-47A 的跨运行生命周期 cursor 服务不同查询范围，不冲突。 | — |
| D11-47C | **赞成** | 修订后每项记录只有一个事件携带者：普通调用由调用类事件携带调用节点及入边；本步新根和名字由 `step_committed` 携带；派生运行在没有相应调用事件的情况下，由 `run_started(seq1)` 携带物化的继承调用、名字、新根和边。消费者只需按权威事件顺序插入，无需对同一事实做按键 upsert、去重或对账。该结构既满足 D6-09“连同引用的记录”，又消除了原方案中完整 `records` 与调用事件重复发送同一节点和边的问题。 | — |
| D11-29A | **赞成** | 原型文案已经区分 owner 可审批所有运行、researcher 只审批自己实验，布尔 `approve` 无法准确表达该状态；改为 `approval:any/ownExperiments` 是必要的权限 ADT。owner 拥有 `any`，researcher 拥有 `ownExperiments`，student、guest 无审批权；`startWithoutApproval` 授 owner、researcher，与 student“需审批：运行、容器”的文案一致。`buildImages`、`manageMembers` 只授 owner，也消除了两个 researcher fixture 中 `buildImages` 一真一假的不一致，而没有从缺失权限推导额外授权。 | — |
| D11-29B | **赞成** | 草稿的 `origin.discussion` 已指向讨论，而 `conversation.owner` 已由 D7-04 定义为 Lab member id；据此判断“自己的实验”复用现有权威记录，且与 D11-49 的讨论所有权口径一致。不再为草稿复制一个不可变 user id，避免 conversation/member 所有者与草稿创建者成为两份可能分叉的记录。审批时比较目标 Lab 中审批者的 `member.id`，没有把全局 user id 与 Lab 内成员身份混用。 | — |
| D11-30 | **赞成** | `/sign-in` 与 Better Auth API 作为认证入口公开，未登录的页面请求重定向、Lab API 返回 401，区分了浏览器导航和程序调用。D7-03 未授权公开注册或自助建 Lab，因此保持关闭正确；成员继续从既定邀请流程加入。初始管理员与首个 Lab 属于部署一次性初始化，由 LAB-03 已有 seed 创建；seed 完成后 Web 才开始服务，Web 本身不兼任 seed，生命周期和权威清晰。该条没有重投既定邮箱密码认证或部署种子内容，只补齐公开入口和启动顺序。 | — |
| D11-32 | **赞成** | Pepgent/deploy 的 `origin/main` 是部署声明权威；中心主机的专用 clone 是 apply 前更新的本地副本。Core 和 Periphery 只读挂载同一副本，分别让 ResourceSync 与 Stack 消费同一时点的声明，避免两份 checkout 漂移。`files-on-host` 不要求给 Komodo 再配置 Git provider token，也没有以临时凭据绕过凭据所有者。更新 clone 与 apply 的顺序明确，具体更新命令仍属于 deploy 私有实现。 | — |
| D11-08 | **赞成** | 已完成 `GraphNode.Call` 的 capture 由 store 作为执行记录权威直接返回，消费方不再从输出字段或其他副本推算。`capture: Hash` 与 store 的内容身份体系一致。允许 `SINGLE_FIELD` 的输出字段名为空串，同时保持 atom 名非空，准确区分了输出字段标识与根 atom 名称两个领域概念。 | — |
| D11-11A | **赞成** | 中止调用不是“有一个空 body 的正常调用”，而是生命周期不同的活动记录；使用独立 `AbortedCall` 变体并不携带 body，使合法状态由类型直接表达，避免同一空 body 同时表示正常空输出和中止。该变体是 D5/D6 消费方需要共享的契约，归入串联恰当。 | — |
| D11-11B | **赞成** | D5-11(8) 已要求拒绝把 pin 指向根 atom 或非调用输出；新增 `pin_key{name}` 精确表达“名字存在，但目标种类不能作为 pin”的结构化错误。复用 `unknown_atom` 会把“目标不存在”和“目标存在但类型不合法”压成同一错误，导致检查器及调用方无法忠实报告既定拒绝原因。 | — |
| D11-13A | **赞成** | `SameValue`、`SameCapture`、`Changed`、`Aborted{side}` 分别表达值相同、已完成调用捕获相同、字段发生差异及一侧中止；`SameCapture` 限定已完成调用，避免给中止状态伪造 capture。`Changed.fields` 的 `Both/OnlyA/OnlyB` 穷尽表达双方都有值和单侧存在，不依赖缺失 optional 字段或字符串约定。 | — |
| D11-13B | **赞成** | 一一映射本质上是有序的 `[rootA, rootB]` 对数组；用 URL 编码后的 JSON 数组可以保留结构，并允许根名合法包含冒号、逗号等字符。`rootA:rootB,…` 需要额外转义规则且会产生解析歧义。该条只定义接口参数编码，没有增加新的比较范围。 | — |
| D11-19 | **赞成** | `DeriveCommit` 统一通过 `EvalTransfer` 传递新根字节，即使纯标量时 transfer 为空，也避免新增“请求体直接携带字节”的第二入口。派生运行的 `run_started(seq1)` 是继承调用、名字、新根和边的物化锚点，不伪造一个 `step_committed`；第一个正式提交才成为第一步。仅继承带 capture 的已完成调用，中止调用继续属于父运行；受影响输入重新标为未消费且不自动 stop，保持派生运行后续求值所需状态。该设计与 D11-47C 的单一事件携带者一致。 | — |
| D11-24 | **赞成** | volume 清单以可寻址内容为对象，只包含 regular file；符号链接和空目录不是独立文件内容事实，因此 F18“全部文件”解释为“全部 regular file”没有删减文件内容。远程 `Executed`、`Human`、`Aborted` 只发布对应位置已接受 transfer 中的 volume；`Inherited` 通过源坐标只读引用父运行内容，不复制相同内容。中心 `Executed`、`Adopted` 与未被事实引用的暂存卷不发布，符合内容权威和生命周期边界。 | — |
| D11-12 | **赞成** | 网关 provider 使用 `auth:none`，由唯一的 `PEPGENT_GATEWAY_TOKEN` 构造一次 `Authorization` 头，避免把同一 token 同时交给 `apiKey` 机制和网关认证层而产生双前缀或发现缓存差异。token 的拥有者和注入路径仍沿用 D8-06，本条不新增凭据来源。各消费方 `models.yml` 尚未逐一观察属于实现核对范围；契约已经明确目标配置，不能因当前只观察到 env 注入接缝就把未核对的配置状态当成事实。 | — |
| D11-01 | **赞成** | 正常退出原样报告程序退出码；信号结束按 POSIX 惯例报告 `128 + signal number`，可以复用现有整数退出码字段和消费者处理路径。另设 `{signal}` 变体会在没有产品需要时扩大协议分支。actor 布局、队列容量和发送时限不影响跨组件可见行为，继续作为 Mux 私有实现恰当。 | — |
| D11-04A | **赞成** | IMG-05 已通过的范围要求 central 镜像具备 e2e 依赖和 standin 入口；LR-04 无权以单独裁决缩减这一范围。拆仓后这些输入由 Pepgent/soroi 默认分支拥有，images 构建时从其权威仓取得即可。该条恢复已定交付范围而不是增加新的产品契约，分类为实现合理。 | — |
| D11-04B | **赞成** | D8-16 已把容器页 Komodo Build 流水线列入 D9 输入，不能为了当前镜像交付而提前把整个流水线拉回 MVP。流水线实现前，四类自有镜像使用现有 `docker buildx` 构建并推送 pepgent-registry；流水线以后真正进入实现，再把构建入口切到 Komodo Build。这样当前实现不被未来 D9 工作阻塞，又明确了最终切换点，没有保留两套长期并行的构建权威。 | — |
| D11-42 | **赞成** | 每次 eval 都从 Lab 当前 git 跟踪文件及未跟踪、未忽略的 regular file 创建私有快照，保留未提交改动，使检查器和 Bun.build 读取完全相同的输入。依赖也在该快照内按 lockfile 冻结安装，不跨 eval 复用可能与新快照不一致的目录；正确性优先于缓存。节点对 omp-soroi 公共构造器的导入解析到当前已加载插件，使实际执行插件与类型/构造器来源一致；lab-library 仅声明 optional peer，不要求操作员额外建立手工 symlink。 | — |
| D11-44 | **赞成** | 节点源码只允许从 `node:module` 或 `module` 静态具名导入 `isBuiltin`、`builtinModules`，bundle 闭包仍可在构建时确定。`createRequire`、`Module`、`register`、`registerHooks`、`process.getBuiltinModule` 等运行时加载入口不进入节点支持范围，避免实际执行代码绕过 bundle 和发行身份。条目明确这是受支持 API 边界而非通用安全沙箱，没有声称解决未设计的攻击或失败路径。 | — |
| D11-WB | **赞成** | D11 通过的结论必须直接替换 D2–D8、`design/eval.md` 和 lab-library README 中相应旧正文，否则工程师仍会从旧权威入口实施相互冲突的草图。该条按每个通过项列明回写位置，只回写已经投票通过的内容；不在正文中保留更正记录，也不修改已发评论或已合并 PR 的历史记录，符合“文档里不留遗留层”和记录不可变边界。 | — |
| D11-F12 | **赞成** | F12 已要求 `film` 是 File 根 atom，D6 `Value` 和 store 内容身份已经可以表达 File；当前缺口只是正式 eval 入口如何创建这一值。专用 `file("<相对路径>")` 是 eval DSL 内建形式，不解析为节点库调用、不产生调用或 capture，并在普通调用识别之前处理，因而没有伪造一个业务节点。路径只定位会话 worktree 中的输入，身份取文件内容 SHA-256；`name`、`media` 沿用插件现有 File 规则，路径不成为内容身份。dry run 和正式运行共用 `EvalTransfer` 这一条字节入口：dry run 只在本次 eval 生命周期内使用并在返回时删除，正式提交只把被引用字节转入对象目录，没有绕过 store 直接写根事实。lab-library 将五个 `run_*` 参数改为 `film: File`，完整保留 F12 判据，也没有让 soroi 认识 Pepgent 专属 `ArtifactId`。 | — |

## D11-F12 分类仲裁意见

**终局仲裁：D11-F12 维持“串联”，不是“意图”。**

理由如下：

1. `design/eval.md:159` 是设计正文中的既有技术结论，不等同于用户原话。按照 D1-16，argon 若主张它代表用户意图，必须引用具体的 `(U)` 编号及原文；仅声称“这一行有用户原话来源”不足以把技术项改成意图项，更不能据此使用意图否决权。

2. 当前可核实的冲突是两个既有设计输入之间的冲突：F12 要求 `film` 为 File 根 atom，而 eval DSL 目前只提供标量根字面量。如何在不修改 omp 宿主、不新增 store 外字节入口的前提下，让插件检查器、EvalTransfer、store File value、Lab artifact 装载和 lab-library 参数贯通，是典型的跨组件接口串联问题。

3. 用户意图决定的是“不缩减 F12”和“保留完整流程”；具体采用 `file("<相对路径>")`、路径以何处为基准、字节何时进入 transfer、dry run 如何结束其临时生命周期，均不是用户原话指定的产品意图，而是实现既定 F12 所需的技术契约。

4. 依 D1-17，分类争议默认技术项；argon 不能把设计文档的技术句子自行提升为用户意图来扩大否决范围。因此，即使 argon提出争议，在未给出能够明确指定“正式根永远只能是数字、字符串、布尔，且排除 File 根”的 `(U)` 原文前，D11-F12 的分类仍终局裁定为**串联**。