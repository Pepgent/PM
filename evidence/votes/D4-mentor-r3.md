# D4 LeadMentor round 3
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D4-01 | 赞成 | 远程 Program 的执行物已经闭合为 Bun 单文件 bundle；普通 JS/TS 依赖在中心打包，无法打包的依赖在远程作业前明确失败而非延迟到目标端，目标环境不再运行包安装。 | — |
| D4-02 | 赞成 | 节点版本使用实际执行 bundle 的内容哈希，覆盖相对 import 和包依赖；所有未提交 bundle 及来源证据先进入 transfer，只有正式步骤事务确认时才转入对象目录，dry run 不污染中心副本。 | — |
| D4-03 | 赞成 | `package.json` 和 lockfile 归节点项目；中心 packager 自动按 frozen lockfile 恢复依赖，并将依赖目录建模为 lockfile 哈希派生的可失效缓存。新中心环境不依赖人工 `bun install`，系统级依赖继续归模板镜像。 | — |
| D4-04 | 赞成 | central/remote 使用同一 runner、节点 bundle、参数和结果协议，执行位置由 `Site/Placement` ADT 表达；差异只在进程和文件运输位置，不存在第二套捕获语义。 | — |
| D4-05 | 反对 | 一次 eval 共用一个 transfer、调用按 position 分卷、`call.json` 文件化和两类 copy-in 来源都正确；但本行声称 D6-22 的 release 导入会把 boot、runner、Soroi customization tar 分别放进对象目录，而目前提供的 D6-22 文本只定义 `PUT /releases/{version}` 将完整 release artifact 字节作为一个对象提交，并未定义拆包及成员对象记录。 | **主路径反例：** 空 Store 通过 `PUT /releases/v1` 导入一份 `soroi-release.tar`，`releases` 只引用 tar 的内容哈希；第一次远程 Program 的 RunRequest 请求 `GET /objects/<boot-js-hash>`。Store 只有完整 tar 对象，没有独立 boot.js 对象，模板在启动 body 前无法 copy-in `soroi/boot.js`。**修改：** Release artifact 带不可变 manifest，列出 boot、runner、customization tar 等远程成员及各自哈希；`PUT /releases/{version}` 必须在同一提交中校验并登记这些成员对象，`releases` 记录引用 manifest 与成员。或者 D4-05 每次把 boot/runner 放入 transfer；不能仅凭完整 release tar 已导入就推断内部文件可按独立哈希 GET。 |
| D4-06 | 赞成 | 调用请求通过 `call.json` 按位置传参；标量保持值语义，File 被改写为目标端挂载路径下的可读绝对路径，节点函数无需感知执行位置。 | — |
| D4-07 | 赞成 | 多远程调用共用同一 eval transfer，各自写入 `volumes/{position}`；remote `ended` 是 copy-out 到达的确认，正式提交原子转入中心副本，dry run 在所有结果取回后删除 transfer。 | — |
| D4-08 | 赞成 | 模板统一使用真实二进制 `omp-rpc-mux`；挂载路径在部署时展开，boot 和子进程使用明确绝对 argv、不经 shell。Agent 只暴露 `soroi-batch` 与 `work` capability directories，和 D3 契约一致。 | — |
| D4-09 | 赞成 | 远程每代加载与中心同哈希的 Soroi 用户级定制，以及当前会话 worktree 中同字节的 project `.omp/` 定制；两者分别进入隔离 HOME 与 cwd，不带本机 omomp 或凭据。按用户原话与 Argon 裁决，不增加两侧 omp 版本协商。 | — |
| D4-10 | 赞成 | 长期 provider 凭据由模板部署 owner 经既定 secret 路径注入，不进入 tar 或 RunRequest；RunRequest 只携带调用数据和本 generation 的 Mux 启动参数。Token 的安全加固不是本轮主路径设计项。 | — |
| D4-11 | 赞成 | Writer declaration、generation、remote env、process URL、dial 参数和 RPC 帧与 D3 逐项一致；本机与远程只在 dial 的启动位置不同，传输协议只有一条。 | — |
| D4-12 | 赞成 | 生命周期已按真实包含关系建模为 `agent identity ⊃ writer declaration ⊃ remote job/volume ⊃ body ⊃ process generation`；copy-in 在 ready 前、copy-out 在进程退出后，每层均有开始、结束和确认者。 | — |
| D4-13 | 赞成 | Transcript 运行中由远程 SessionManager 唯一写，copy-out 后权威回到中心；`EvalTransfer` 与 `AgentGenerationTransfer` 的 owner 和结束锚点已经分开，非 eval 的普通 IRC 唤醒也有明确单卷 `/volume` 路径。 | — |
| D4-14 | 赞成 | `soroi_return` 仍是唯一交回通道；模型只交回 typed 字段和路径，中心结束进程并等待 remote `ended` 后才读取对应 volume 文件，因此工具交回和文件捕获完成两个锚点没有混淆。 | — |
| D4-15 | 赞成 | RemoteChild 仅将运行进度写成与 D6 `agent_progress` 对齐的 Parquet；reader 只拉取已原子改名文件，正式步骤提交时同事务汇入，dry run 不汇入。 | — |
| D4-16 | 赞成 | `Main/LocalChild/RemoteChild`、`writesEval` 和工具注册共同结构性保证 Agent 体无 eval、RemoteChild 不能再启动 Soroi remote Agent；远程 Agent 仍可使用 omp 自身进程内 task。 | — |
| D4-17 | 赞成 | 可启动环境的唯一发现源是 remote 模板目录；D3 仅引用同一 D4-08 判据，Soroi 不维护第二机器清单或服务注册表。 | — |
| D4-18 | 赞成 | 捕获身份覆盖节点 bundle、输入和不可变运行环境；Agent body 还包含 Soroi release 哈希与 Lab `.omp/` tar 哈希。镜像、模板配置、中心容器、Agent 定义、skill、rule 或发行变化都不会错误复用旧捕获。 | — |
| D4-19 | 赞成 | Env override 仍以输出 atom 定位调用，但 checker 会归一化到 call；同一调用的不同模板产生穷尽的 `env_conflict`，执行与捕获身份只接收唯一 call-level override。 | — |
| D4-20 | 赞成 | 不新增跨步骤、跨 worker 的运行级环境状态；每个新写步骤通过 D4-19 表达调用覆盖，派生运行不重放旧步骤，与已定派生语义一致。 | — |
| D4-21 | 赞成 | Dry run 真实执行远程 Program/Agent，但 bundle、输入、volume 和批次只存在 transfer 中，全部结果取回后删除；不写捕获、对象目录或运行事实。Agent transcript 仍归 omp session，不属于 Store。 | — |
| D4-22 | 赞成 | 远程执行的 eval/subagent 能力统一位于单包 `packages/omp-soroi`，Store 同仓作为伴随服务；Pepgent 只驱动中心 Agent 和登记环境，不替 Soroi 调 remote，也没有形成额外定制或 omomp 依赖。 | — |

## D4-05 re-vote after rebuttal

| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D4-05 | 赞成 | 新证据确认已通过的 D6-03、D6-22 和接口定义要求 `PUT /releases/{version}` 在同一事务中校验 release，并把 boot、runner、customization tar 分别按内容哈希写入对象目录；`ReleaseRecord` 明确记录各成员哈希。因此远程调用可按 D4-05 从 `/objects/{hash}` 获取各发行成员，我此前反例不再成立。 | — |