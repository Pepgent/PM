# D5 LeadMentor round 2
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D5-01 | 赞成 | Eval 与 subagent 模块之间存在宽而稳定的编译期契约，合并为单包能消除跨仓运行时握手和版本协调；旧仓迁移后归档符合 clean cutover 与 U23 的单一可安装定制要求。 | — |
| D5-02 | 赞成 | `packages/omp-soroi` 对完整定制的贡献、Pepgent 调用路径和远程安装路径已经闭合；远程镜像不烘焙定制，每代 copy-in 与中心同哈希 tar。干净 HOME 中必须实测 extension、agent、skill、rule、settings 全部发现，P11 不会被当作已完成事实。 | — |
| D5-03 | 赞成 | `Agent` 节点统一走 Soroi supervisor，主进程 `AgentRegistry` 继续持有身份与生命周期；LocalChild 经 host call 转发 spawn，捕获记录只保存稳定 session id，不保存会随远程权威转移失效的文件路径。 | — |
| D5-04 | 赞成 | `report \| capture` 用 ADT 区分委派种类，capture schema 按节点返回形状生成；文件仅交回路径，取回与持久化由中间件完成。Sidecar 保存的是不可变启动配方，复活后能恢复同一 host-tool schema。 | — |
| D5-05 | 赞成 | 作业和捕获轮次只有 `soroi_return` 一个结果通道，彻底删除 last-assistant-text 兜底；IRC 唤醒回执属于消息总线语义，不冒充捕获结果。 | — |
| D5-06 | 赞成 | `writesEval`、Role 和工具注册结构性落实两条用户禁令：Agent 体及其后代没有 eval，RemoteChild 不能再启动 Soroi 远程 Agent；同时撤销没有用户依据的“所有子进程均不能派出”限制。 | — |
| D5-07 | 赞成 | 一步内平铺调用并发与多个中心 worker 并发写步被明确区分；worker 通过 Soroi 自己的 `soroi_task` 运行并写入同一运行，不使用 fork 或其他 omomp 机制，符合 Argon 的专项裁决。 | — |
| D5-08 | 赞成 | `dry_run \| formal` 判别联合在类型上排除正式运行 pins；formal 重新检查、执行同一代码并只按身份复用，不把 dry run 变成隐式提交或锁定脚本。 | — |
| D5-09 | 赞成 | Pins 以唯一输出 atom 定位具体调用，并要求整条调用全钉或不钉；同一函数的多次调用可以分别表达，也不会形成部分真实、部分虚假的调用结果。 | — |
| D5-10 | 赞成 | Env override 以输出 atom 定位后归一化到 call；同一调用出现不同模板时返回 `env_conflict`，因此每个调用获得唯一 Placement。环境仍是执行位置，不被错误塞进节点数据参数。 | — |
| D5-11 | 赞成 | 检查器覆盖语句形态、可见 atom、名字、节点解析、类型、扁平返回、穷尽解构、pins、env 和 dry-run Human；可见集由 Store 已提交状态与 supervisor 的 spawn 快照/子树/已释放批次共同计算，与提醒保持一致。 | — |
| D5-12 | 赞成 | 批次成员完成锚点已经改为其 `report` 契约被 supervisor 接受，而不是从“至少提交一步”推断；全部成员完成后才释放，多 worker 时 purpose 必填，批次目的和产出来源可以一起进入汇总提醒。 | — |
| D5-13 | 赞成 | 未消费 atom 每次从 Store 权威现算、不缓存；主 Agent 和 worker 按各自可见范围过滤，并展示来源、环境、Human 替代和 batch purpose，模型看到的状态与 checker 允许引用的状态一致。 | — |
| D5-14 | 赞成 | 每个写 eval 的会话注册自己的 endpoint，根 endpoint 只提供 `writers(runId)` 发现入口；Human slot 的权威留在实际写该步的 eval 模块，Lab 能把 handback 路由到唯一持有者。 | — |
| D5-15 | 赞成 | Takeover 先定位并请求实际槽位 owner 中止调用，等待结论后才用 Human handback 完成同一槽位；原 atom 名保持不变，下游按正常数据依赖继续，已提交调用则明确改走派生运行。 | — |
| D5-16 | 赞成 | 进行中的介入通过当前工具结果通知写步 Agent；派生请求在路由前已唤醒并恢复持有 endpoint 的 eval 插件，该插件拿到 Store 提交结论后经带人类来源的 IRC 唤醒主会话，不依赖停驻期间不存在的订阅者。 | — |
| D5-17 | 赞成 | `AgentTemplate` 直接复用 omp agent definition 名，模型、thinking、工具和系统提示沿用宿主公开机制；发行包与 Lab `.omp/agents` 是既有发现来源，没有另造 harness 模板格式。 | — |
| D5-18 | 赞成 | 中心与远程 File 输入/交回均只由中间件解析、取回、计算身份并随正式 step 提交；subagent 只处理路径，不持有文件存储职责。路径安全加固按当前项目规则留给实现阶段，不影响主路径契约。 | — |
| D5-19 | 赞成 | 文档明确 eval 不能递归；只有中心 Main 与逐级派出的 `writesEval` report worker 能写 eval，Agent 体及其后代没有该工具。流程图、并发、存储和接口中的 fork 表述均被 Soroi 自身机制替换。 | — |