# D5 omp-soroi-eval ↔ omp-soroi-subagent 契约与 eval 半截项 · task:high 的选票

投票者：Claude 族独立 task:high 席（`Governance_e826.HighD5`）。本票与 leader 的票合起来构成 Claude 族的一票，族内全赞成才算赞成。

依据：
- 决策表 `evidence/decisions/D5-plugins-eval.md`（全表 D5-01–D5-19，以及 §3 接口草图、§5 占位、§6 文档改动）；
- 上游 `D2-components.md`（D2-02/03/05/06/11/12/15/25）、`D3-network-mux.md`（D3-03/07/08/10/11/12/19）、`D4-remote-exec.md`（D4-13/14/16/18/19/21）、`D6-store-service.md`（D6-03/04/05/09/11/14–19，接口草图 `transcript: SessionId`，P6）；
- leader 裁决 A–E；`argon/rulings-C.md` C-4、C-5、E-1–E-5、I-1–I-3；
- `LEDGER.md` U23、U24。

本票未咨询 discuss:*，也没有另开 mentor。

核对口径：每项状态是否只有一个权威源头；生命周期的开始、结束锚点由谁确认；与 D2/D3/D4/D6 及裁决 A–E 是否一致；是否满足 U23（完整 omp 定制）和 U24（无 fork）。按设计阶段只写主路径的规则，下面的反例都发生在主路径上，不涉及边缘情况或竞态。

| ID | 票 | 理由 | 反例（反对时）与修改 |
| --- | --- | --- | --- |
| D5-01 | 赞成 | 与裁决 A、D2-24、D2-25 一致：合并为 `Pepgent/soroi` 的 `packages/omp-soroi`，旧仓迁入后归档。交回契约只在 `src/contract.ts` 定义一处，eval 与 subagent 之间是编译期接口，不需要跨仓契约包和 `pi.events` 握手，满足单一权威。按 `SOROI_ROLE`（D4-16）选角色。U24：整行不依赖 fork 或 omomp。 | — |
| D5-02 | 反对 | 方向正确（U23：插件、技能、规则、agent 定义整体发行）。但 how 和取舍里各有一句与上游定稿相反。 | **反例 1（裁决 D、D2-15、D3-08/D3-10）：** how 写的是“Lab 后端经 Mux 启动中心 omp 主会话”。按裁决 D，Mux 不启动进程：Lab 后端以写方身份打开 `/agents/{root}/writer`，再在本机运行 `omp-rpc-mux dial -- omp --mode rpc …`。本表 §1 的“采用的相邻决策”（第 61 行）也是这样写的。实现者照 D5-02 去读，会给 Mux 加一个 spawn 接口，正是裁决 D 禁止的做法。**反例 2（D2-11、D4-09）：** 取舍写的是“远程机器的 omp-agent 镜像装的也是同一份（D2-11）”。D2-11 原文是“omp-agent 镜像只含 omp、Mux 与系统依赖……soroi 定制（D2-25 的发布 tar）和库的内容每次启动经 copy-in 拷入”。如果照 D5-02 把定制装进镜像，每次 soroi 发版都要重建镜像，远程加载的字节也会和中心不一致，D2-11 与 D4-09 正是为了避免这种分叉。**修改：** ①把“经 Mux 启动中心 omp 主会话（D2-15）”改为“以写方身份打开 `/agents/{root}/writer`，用 `omp-rpc-mux dial -- omp --mode rpc` 启动中心 omp 主会话（D2-15、D3-10、裁决 D）”；②把“omp-agent 镜像装的也是同一份”改为“omp-agent 镜像不含定制，每次启动经 copy-in 拷入与中心同一份字节（D2-11、D4-09）”。其余不变。 |
| D5-03 | 反对 | 主体正确：用 `Subagents.spawnCapture` 替换 `runSubprocess`，落实 C-5 的技术面和 D2-05；agent 的身份与状态只由主进程的 `AgentRegistry` 持有；在 `LocalChild` 里经 host call 转到主进程监管者，与 D3-07/D3-09 中“监管者是写方”的结构一致。问题出在捕获记录里存什么，以及 GUI 怎样读 transcript。 | **反例（D6-03、D3-11、D4-13、D2-01）：** ①how 写的是“捕获记录里存 `agentId` 和 transcript 文件”，§3.1 的 `CaptureHandback` 也带 `sessionFile: string`。D6-03 的 `captures` 和 D6 接口草图存的却是 `transcript: SessionId`。transcript 的权威是 omp（D2-01）。远程 `Agent` 运行时，transcript 的权威在 volume 的 `soroi/agent/`，拷出后才转回中心（D4-13）。把文件路径写进 store，等于在 store 里存一份会随 D4-13 的权威转移而失效的位置副本，同一件事也就有了两种互相矛盾的记录口径。②how 写“GUI 经 `history://` 查看”。`history://` 是 omp 进程内的 URL，而 Lab 后端是 TanStack 服务端，不是 omp，无法解析它。D3-11 定的读法是：Lab 后端作为 Mux 读方读取；已停驻或已死的 agent 读它的 transcript。**修改：** 删去 `CaptureHandback.sessionFile`；捕获记录只存 omp 会话 id，与 D6-03 的 `transcript: SessionId` 同一个字段；把“GUI 经 `history://` 查看”改为“GUI 经 Lab 后端按 D3-11 读取（在线时作为 Mux 读方，停驻后读 transcript）”。 |
| D5-04 | 赞成 | 一个工具名，按 `ReturnContract = report \| capture` 生成 schema，落实 C-5【定】“交回结果和文件路径”和 D2-05“按节点返回类型生成 schema”。契约写在 spawn 时的启动配方里，生命周期与 agent 相同，复活时按配方重新 `set_host_tools`，所以不形成第二个状态源。`{ kind: "file", path, placement }` 与 D4-14 一致。subagent 只收路径，取回由中间件负责（`eval.md:94`）。 | — |
| D5-05 | 赞成 | 删除 `lastAssistantText` 兜底，落实 C-5【定】的否决。保留 IRC 唤醒回执是 IRC 语义，不是结果通道，对标内置（U `#f488be08`）。 | — |
| D5-06 | 赞成 | 与 D4-16 一致；用户的两条禁令（`#5a37a640`、`#3dbd0473`）由结构保证：`capture` 及其之下 `writesEval` 都为假，所以 eval 不会嵌套；`RemoteChild` 不注册 `soroi_task`，所以远程不能再开 soroi subagent，远程只能经写 eval 的中心会话启动。撤销实现者在 ask 超时后自定的一刀切（C-4 已否决）。`writesEval` 由监管者在 spawn 时计算，权威和生命周期都清楚。 | — |
| D5-07 | 赞成 | U24：用 soroi 自己的 `soroi_task` 中心 worker 替代 fork，又保留了“多个 agent 分头消费”的原意（`#2c08aa6d`）。按 D6-05，运行属于根会话；按 D6-03，步记写它的会话 id。与 D2-02、D2-05 一致。 | — |
| D5-08 | 赞成 | 判别联合让正式运行在类型上就没有 pins，满足 E-2【定】：dry run 不写 store，正式运行没有替身，不锁定上一次 eval，不让模型合并重写。“原样提交同一段代码、重新执行、按身份复用”与 D4-21、D6-04 一致。 | — |
| D5-09 | 赞成 | 按输出 atom 名钉值，解决同一函数多次调用的歧义（s-eval G02）。键空间与 D4-19 的 env 覆盖相同；名字在一次运行内唯一（`eval.md:37`）。 | — |
| D5-10 | 赞成 | 照搬 D4-19；生效 env 的取值顺序与 D4-18 相同；代码里不出现模板名字面量，满足 E-1【定】。初版的环境 atom 方案已撤回，理由成立。 | — |
| D5-11 | 赞成 | 检查清单完整，落实 E-3 与 s-eval G06；错误建模成 `CheckResult`，不抛异常。(10)“dry run 里的 `Human` 调用必须钉住”与 D5-14 自洽。(4) 节点路径与 D2-12 一致。 | — |
| D5-12 | 反对 | 批次界定方式（一次 `soroi_task` 就是一批，`purpose` 写在启动配方里，权威是监管者，不进 store）正确，也与 D6 的回复一致。但“释放”条件没有取自 worker 工作结束这件事的权威源头，而是从 store 的步推断出来的。 | **反例（主路径）：** 主 agent 用一次 `soroi_task` 派出 5 个 worker，各跑一种退火算法。eval 本来就是逐步写的：每个 worker 先正式提交第 1 步（预处理，得到 `film_norm_svm` 等），再提交第 2 步（真正的曲线 `curve_svm` 等）。按本行的释放条件“每个成员的会话在 store 里都至少有一步已提交”，5 个 worker 都提交完第 1 步时，这一批就释放了。发起者的提醒里只有预处理产物，组头却是“比较五种算法的曲线”。发起者据此开始汇总，而 5 条曲线还没有产生。这违背了 E-5【定】“下游……知道要干什么”，也违背了本行标题“同批全部正式运行后一起释放”。worker 什么时候做完，权威是监管者持有的作业结束锚点，即该 worker 的 `report` 轮次调用了 `soroi_return`，而不是 store 里有没有步。**修改：** 把“释放”改为：“同批每个成员的 `report` 作业都已经经 `soroi_return` 交回。这是监管者持有的作业结束锚点，与发起者收到这批 `soroi_task` 结果是同一时刻；不从 store 的步推断。”其余（`batchId`、`purpose`、释放前只对子树可见、转交即再派一个 worker）不变。 |
| D5-13 | 赞成 | 每次请求模型前，从 store 现算未消费 atom，不缓存，权威是 store（D6-10 的未消费 atom 单列）。批次分组取自监管者（`batchOf`），来源标记满足 E-5【定】的“分得清谁是谁”。“已释放”的含义随 D5-12 修订后的定义走，本行文字不用改。 | — |
| D5-14 | 反对 | 主动 `human(request)`、等待人类交回的槽位、与 capture 同形的交回、身份取事件哈希（D6-17、D6-18），这些都对。但控制端点只按根会话注册，到不了由 worker 进程持有的槽位，而按 D5-07，worker 写步是主路径。 | **反例（D5-07 × D3-19 × P7）：** 主 agent 用 `soroi_task` 派出 worker W（`LocalChild`，`writesEval` 为真）。W 在自己的进程里调用 `soroi_eval`，这一步含有 `human(...)` 调用，于是“等人类交回”的槽位开在 W 进程的 eval 模块里。按 D3-19 和 P7，端点只有一个：`eval:<根 session id>`，由“中心 omp 进程里的插件”注册，并“送回持有这次运行的进程”（单数）。如果由主进程注册，Lab 后端调用 `slots(runId)` 看不到 W 的槽位，`answer` 也到不了 W；如果 W 也去注册同名端点，就与主进程冲突。§3.1 的 host call 只有 `spawn`、`spawn_capture`、`abort_turn`、`batch_of`（P2），没有槽位往来。结果是：W 在 `human` 调用上永远等不到交回，这一步无法提交。**修改：** ①每个 `writesEval` 为真的会话注册自己的端点 `eval:<本会话 id>`，槽位的权威就是这个会话的 eval 模块。②主进程的端点再回答 `writers(runId)`，内容取自监管者里本根会话下 `writesEval` 为真的启动配方，作为 Lab 后端找到全部端点的入口。③Lab 后端先问 `eval:<根>` 拿到写方列表，再逐个读取槽位、送达 `answer`。④P7 的“持有这次运行的进程”改为“持有该槽位的写 eval 会话”。这会把 D3-19 的端点名从“形如 `eval:<根 session id>`”放宽为“`eval:<写 eval 的会话 id>`”，需要交给 D3 起草者同步一行文字。 |
| D5-15 | 反对 | 槽位接管的流程与 D6-14、D6-15 一致：先中止，再以人的交回结束槽位；atom 名不变，所以同一步的下游自动消费，满足 I-1【定】“自动触发函数消费”。已提交的部分归 D6 派生运行，与裁决 C 一致。但它和 D5-14 是同一个缺口。 | **反例：** 同 D5-14。worker W 的一步里有一个正在运行的 `Program`，它的 runner 是 W 进程的子进程。人在 GUI 点“接管”，`takeover` 只能到达 `eval:<根>`，即主进程。主进程无法结束 W 的 runner：它不持有 W 的槽位，也没有 host call 能把接管请求送进 W。被接管的调用会继续跑完，人的值也绑定不上。**修改：** 与 D5-14 相同，即按写 eval 的会话注册端点，并由主端点回答 `writers`；`takeover` 送到持有槽位的会话，由该会话的中间件按 (1)–(4) 执行。 |
| D5-16 | 反对 | 情形一（在 `soroi_eval` 进行中，由工具结果标出 `human`）正确。情形二多加了一条订阅链路，用来得知插件自己已经拿到的结论。 | **反例（D6-04、D6-16、D6-09）：** 运行的每一次提交，都由某个 eval 插件实例调用 store 发起（D6-04；store 是单写方，D6-01）。情形二举的例子“D6 的派生运行产出了新 atom”，按 D6-16 正是“派生请求由 eval 插件执行，store 在一次提交里建新运行”：同一个插件发出提交，也收到 store 的提交结论。另外订阅 `GET /runs/{run}/stream`（P8）得知同一件事，是“为了得知自己写入的结果而读副本”，多出一条需要对齐的链路。D6-09 也只把 Lab 后端定为这条流的读方。**修改：** 情形二改为：“执行派生请求（D6-16）的 eval 插件拿到 store 的提交结论后，向拥有这次运行的主会话投递一条带人类来源的 IRC（principal 取自派生请求，占位 P9）。”where 里删去“订阅 store 服务的运行流（D6-09）”，同时删除占位 P8。 |
| D5-17 | 赞成 | 用 omp 自己的 agent 定义作为 `AgentTemplate`，不另造格式，满足“对标主 agent”（`#9c291fe2`）。与 D2-12（库的 `.omp/agents`）、D2-25 一致；`eval.md:70` 的 `template` 与 `env` 是两个不同字段，与 D4 的运行环境模板名不冲突。 | — |
| D5-18 | 赞成 | 中心放置：路径相对子 agent 的 cwd，由中间件读字节、算身份，随这一步提交。远程放置：随 copy-out 进暂存区再绑定，与 D4-07、D4-14、D6-07 一致。subagent 只管路径，不碰文件。 | — |
| D5-19 | 反对 | 补写“eval 禁止递归嵌套”（`#5a37a640`）、删去 fork（U24），都对。但要写进 `eval.md` 的那句话，和同表 D5-06 定下的资格不一致。 | **反例：** 按 D5-06 (1)，`report` worker 的 `writesEval`“在派出方为真时为真”，可以传递。主 agent 派出 W1，W1 把自己那一路再拆开，用 `soroi_task` 派出 W2，W2 的 `writesEval` 为真，会注册 `soroi_eval`。而 D5-19 要写进 `eval.md` 的句子是“只有中心主机上的主 agent 和它经 `soroi_task` 派出的 worker 能写 eval”，按字面 W2 不在其中，文档与实现矛盾。**修改：** 改为“只有中心主机上的主 agent，以及从主 agent 起经 `soroi_task` 逐级派出的 `report` worker（即启动配方里 `writesEval` 为真的会话，D5-06）能写 eval；`Agent` 体及其之下都没有 eval 工具”。§6 的 `eval.md:164-168`、`subagent.md:20-21` 两行改动按同一措辞写。 |

## 计票

赞成 12 · 反对 7（D5-02、D5-03、D5-12、D5-14、D5-15、D5-16、D5-19）。

所有反对票都附了反例，也给出了只改本行的修改；修改后本席赞成。D5-14、D5-15 的修改会把 D3-19 的端点名从根会话放宽到写 eval 的会话，这属于跨表契约，需要治理分身转给 D3 起草者同步一行文字。
