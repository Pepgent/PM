# D5 导师重投请求

本票请求针对 D5“omp-soroi-eval ↔ omp-soroi-subagent 契约与 eval 半截项”的逐行重投；投票按三个身份族（Claude、argon、导师）分别收票，三族中 2 族赞成即通过，任何反对票都必须携带具体反例（场景、证据，以及条目在哪里失效），否则反对票作废。

## 当前决策表（逐字）

| ID | what | where | how | 取舍 | 分类 | 补充 |
| --- | --- | --- | --- | --- | --- | --- |
| D5-01 | 两个插件合并成一个包 `packages/omp-soroi`（leader 已裁决 A） | `Pepgent/soroi` 单仓里的 `packages/omp-soroi`：eval 代码在 `src/eval/`，subagent 代码在 `src/subagent/`，交回契约在 `src/contract.ts`。`Pepgent/omp-soroi-eval` 和 `Pepgent/omp-soroi-subagent` 的代码迁入后，两个旧仓在 GitHub 归档 | 一个扩展入口，按 `SOROI_ROLE`（D4-16）选角色。eval 直接 import subagent 模块的 `Subagents` 接口（§3.1），不经事件总线 | **合并的好处：** 两边之间的契约很宽，包括角色、交回契约、写 eval 的资格（D5-06）、批次成员、`LocalChild` 里转发 spawn。合并后这些都是编译期类型，交回工具只有一处定义，`eval.md:3`“同一个插件还提供交回工具”仍然成立。与 store、compose、技能、规则同仓同版本，就是 U23 要的一个可安装整体。**代价：** 两个旧仓的代码要迁移，旧仓要归档。**落选方案：** D2 原稿让两个仓库各自独立，由发行仓把两者作为依赖打包。那样要多维护一个跨仓库的契约包，还要靠 `pi.events`（`loader.ts:557`）做运行时握手 | 技术 / 串联 | 设计补充 |
| D5-02 | `packages/omp-soroi` 在“完整 omp 定制”中的贡献，以及 Pepgent 怎样调用（U23） | `Pepgent/soroi` 单仓：`packages/omp-soroi` 的 `package.json` 里的 `omp.extensions`；同仓的 agent 定义、技能、规则和设置覆盖（D2-25） | **插件：** eval 模块提供 `soroi_eval`、未消费提醒、中间件和介入控制端点；subagent 模块提供监管者、`soroi_task`、`soroi_return` 和子进程桥接。**技能 `soroi-eval`：** 怎样写一步，dry run 与正式运行，pins 与 env，`stop`，派出中心 worker 并写批次目的。**规则：** 每个 atom 都要消费；dry run 通过后原样提交同一段代码，不合并、不改写。**agent 定义（D2-25 列出的三种角色）：** 写 eval 的主 agent，写 eval 的中心 worker，`Agent` 体。**调用路径：** Pepgent 的 Lab 后端以写方身份打开 `/agents/{root}/writer`，用 `omp-rpc-mux dial -- omp --mode rpc` 启动中心 omp 主会话（D2-15、D3-10、裁决 D），以 RPC 发 prompt、收事件；运行图和时间轴读 store 服务（D6）；在途调用读各写 eval 会话的控制端点（D5-14、D6-11）。**远程：** omp-agent 镜像不烘焙定制；boot 每次把与中心同一哈希的发行 tar 经 copy-in 拷入，安装到隔离的 HOME（D2-11、D4-09）。**验收：** 在干净的 HOME 里安装发行包后实测，extension、agent 定义、技能、规则、设置覆盖全部被 omp 发现，才算完整定制 | 一个仓库发行一份定制，中心和远程加载的是同一份字节，不会分叉；soroi 发版不需要重建镜像。omp 插件 manifest 只声明 extensions、tools、hooks、commands 和 settings（`plugins/types.ts:26-49`）；扩展包里的 agent 目录会被发现（`inv/o-placement.md:34-40`）。技能和规则怎样随安装生效，记为占位 P11，由上面的验收确认 | 串联 | 缺失部分 |
| D5-03 | `Agent` 节点改走 soroi subagent，替换 `runSubprocess` | `src/eval/agent-body.ts` 改为调用 `Subagents.spawnCapture`；删除 `AGENT_BODY_PREFIX` 前缀约定（`agent-body.ts:11-12`） | 中间件调用 `spawnCapture({ parentId: 写这一步的 agent, cwd, agent: AgentTemplate, assignment: prompt, placement }, shape, signal)`，返回 `Promise<CaptureHandback>`。写这一步的 agent 可以是主 agent，也可以是 soroi 派出的中心 worker。在 `Main` 里，这个调用直接进同进程的监管者；在 `LocalChild` 里，经 host call `{ op: "spawn_capture" }` 转到主进程的监管者，交回随 host call 的回复返回。捕获轮次不在父 agent 上登记异步作业，因为 `soroi_eval` 这次调用本身就在等它；取消走 `soroi_eval` 的 AbortSignal，中止子 agent 当前这一轮。子 agent 照常登记进 `AgentRegistry`，受内置生命周期管理。捕获记录只存子 agent 的 omp 会话 id，与 D6-03 的 `transcript: SessionId` 是同一个字段；transcript 的权威仍是 omp（D2-01，远程时按 D4-13 转移）。GUI 经 Lab 后端按 D3-11 读取：在线时作为 Mux 读方，停驻后读 transcript | 落实 C-5 的技术面：以 omp-soroi-subagent 替换 runSubprocess（`argon/rulings-C.md:135`），也落实 D2-05 的进程内 API。agent 的身份与状态仍只由主进程的 `AgentRegistry` 持有；store 不存会随 D4-13 失效的文件位置。代价：每次 `Agent` 调用都起一个 omp 进程，比进程内 subagent 重 |
| D5-04 | 唯一交回工具 `soroi_return` 的统一契约 | `packages/omp-soroi/src/contract.ts`；`#launch` 里的 `set_host_tools`；sidecar `<id>.soroi.json` | 工具名只有一个，schema 按委派种类生成，`ReturnContract = report \| capture`。<br>• `report`（`soroi_task` 的委派）：`{ result: string }`。<br>• `capture`：按节点的返回形状生成。单个输出是 `{ value }`，多个输出是扁平字段；`File` 字段收文件路径字符串。<br>交回值的类型是 `Returned`，文件写成 `{ kind: "file", path, placement }`。subagent 只收下路径；取回、算内容身份、送进 store 的对象由中间件做（`eval.md:94`）。契约是启动参数：spawn 时写进 sidecar，复活时按 sidecar 重新 `set_host_tools`，所以复活后 schema 不变 | 落实 C-5 要求的 typed 结果与 `File` 路径捕获（`argon/bootstrap.md:96`），以及 D2-05“按节点返回类型生成 schema”。契约在 agent 的一生里不变，属于启动配方，不另设状态源。代价：同一个 agent 不能在两种委派之间切换 schema（主路径不需要） | 技术 | 设计补充 |
| D5-05 | 删除“最后一条回复兜底”；保留 IRC 唤醒回执 | `supervisor.ts:309-328` 的 `#settleTurn` | 作业轮次和捕获轮次只在 `soroi_return` 被调用时交回。一轮结束而没有交回，就没有结果，不发 `lastAssistantText`。别的 agent 用 IRC 唤醒它的那一轮，结束时把输出回给唤醒者：这对标内置的唤醒监视器，属于 IRC 语义，不是结果通道，保留。同步改 README:21 和工具说明 `main/index.ts:9` | C-5【定】否决兜底（`argon/rulings-C.md:132-133`）。保留唤醒回执，是为了满足“生命周期和irc全方位对标omp内置subagent”（`inv/s-subagent.md:90-91`，U `#f488be08`） | 意图（落地为实现） | 否 |
| D5-06 | 嵌套边界：谁能写 eval，谁能派出 subagent | 两插件的角色判定（`SOROI_ROLE`，D4-16）；启动配方里的 `writesEval` | (1) **写 eval：** `soroi_eval` 和未消费提醒只在 `writesEval` 为真的会话里注册。`Main` 为真；`soroi_task` 派出的 `report` worker，在派出方为真时为真；`capture`（`Agent` 体）和它派出的一切都为假。`writesEval` 由监管者在 spawn 时计算，写进启动配方。<br>(2) **派出 soroi subagent：** `Main` 和 `LocalChild` 注册 `soroi_task`。去掉 `MAIN_AGENT_ID` 检查；`LocalChild` 里的调用经 host call `{ op: "spawn" }` 转到主进程的监管者，父 id 是这个子 agent。`RemoteChild` 不注册 `soroi_task`，只能用自己进程里的内置 task。<br>(3) **远程启动：** 只有一条路，即写 eval 的中心 agent 调用 env 为远程的 `Agent` 节点（D4-16） | 正好落在用户的两条禁令上（`argon/rulings-C.md:117-120`）：任何 `Agent` 体之下都没有 eval，所以 eval 不会嵌套；远程 agent 没有工具能再开 soroi subagent。同时撤销没有用户依据的一刀切（`inv/s-subagent.md:175`）。用结构保证，不做运行时计数 | 意图 + 技术 | 否 |
| D5-07 | 并发写步由 soroi 派出的中心 worker 承担，不用 fork | `soroi_task`；技能 `soroi-eval` | 两种并发：<br>• **一步之内：** 平铺写多条互不依赖的调用，引擎自然并发（`eval.md:136`，依据 U `#13abc2a1`）。<br>• **多个 agent 分头写步：** 主 agent 用 `soroi_task` 派出几个中心 worker（`LocalChild`，`report` 契约，`writesEval` 为真），每个 worker 在同一个运行里用 `soroi_eval` 写自己的一步。<br>这些 worker 写的步属于同一个运行：worker 的运行，是它所属根会话的运行。按 D6，步记下写它的会话 id | U24 要求 soroi 不含 fork。用户最早要“可以通过fork self开分身去处理”（`argon/rulings-C.md:121-122`），本意是让多个 agent 分头消费，这里换成 soroi 自己的机制，与 D2 的口径一致（`D2-components.md:32`）。代价：worker 不继承父 agent 的对话，父 agent 要在委派里写清这几路为什么开；这正是 D5-12 的“目的说明” | 技术 | 设计补充 |
| D5-08 | `soroi_eval` 工具签名：dry run 与正式运行 | `src/eval/index.ts` 的参数 schema | 改成判别联合：`{ mode: "dry_run", code, pins?, env? } \| { mode: "formal", code, env? }`。正式运行在类型上就没有 pins，不再需要运行时检查（`index.ts:49-51`）。正式运行就是把同一段代码再提交一次：重新检查、重新执行，store 里已有的捕获按身份复用；不记住、也不锁定上一次 dry run。工具说明和技能写明：dry run 通过后原样提交，不合并多步，不改写代码 | 意图约束：dry run 不写 store，正式运行没有替身，不锁定上一次 eval，不让模型最后合并重写（`argon/rulings-C.md:222-230`）。字段名属【暂定】技术项（`:231`）。代价：正式运行时，没钉住、也没命中复用的调用会再真实跑一遍；这是用户“dry run 是测试”的本意 | 技术 | 设计补充 |
| D5-09 | pins 按调用产出的 atom 名钉值 | `soroi_eval.pins`；检查器 | `pins: Record<AtomName, PinValue>`，键是调用语句绑定的输出 atom 名，`PinValue = number \| string \| boolean \| { file: path }`。一条调用的输出全部被钉住，这条调用就不运行；只钉一部分会被检查拒绝。同一函数调用两次，绑定的名字不同，可以分别钉不同的值。删除现行按函数名钉值的做法 | 名字在一次运行里唯一（`eval.md:37`），用名字当键不会歧义，也和“永远只有 atom”的心智一致；与 D4-19 的 env 覆盖用同一种键。同函数多次调用的区分是 s-eval G02 的缺口（`inv/s-eval.md:227`） | 技术 | 设计补充 |
| D5-10 | 单次调用换 env：采用 D4-19 | `soroi_eval.env`；检查器；中间件 | `env?: Record<AtomName, 模板名>`，键是这次调用产出的任意一个 atom 名。检查器把每个键归并到产出它的调用；同一条调用的几个键给了不同模板，报 `env_conflict`。生效的 env 依次取：这里的覆盖，节点函数的默认模板，`central`。生效的 env 算进捕获身份（现行身份已含 env，`execute.ts:122`）。步的代码仍只有三种语句，不出现模板名字面量。检查器核对键是本步某条调用的输出，模板名在 remote 的模板目录里（占位 P6） | 意图约束：调用要简单，模板提前构建，不写魔法值，不定义 object（`argon/rulings-C.md:216-220`）。env 是“在哪里跑”，不是参与数据流的值，所以放在工具参数里，不改调用的参数个数。**备选（本稿初版）：** 用 `const gpu: Env = "slurm-a100"` 定义环境 atom，作为末尾参数传入。它让 env 进入数据流、改变参数个数，因与 D4 冲突而撤回 | 技术 | 设计补充 |
| D5-11 | 执行前检查清单 | `src/eval/check.ts`（大部分已有，`inv/r-eval.md:69-72`）；`eval.md` 占位表第一行改写成正文 | 按顺序检查：<br>(1) 只有三种语句；根 atom 只允许数字、字符串、布尔字面量。<br>(2) 引用的 atom 都在本会话的可见集里，或在本步前文定义过。可见集与 D5-13 的提醒用同一个计算：atom 取自 store 服务里本运行已提交的状态，再按监管者给出的可见范围（`Subagents.visibility`：spawn 时的快照、自己的子树、已释放的批次）过滤；主 agent 的可见范围是整个运行中已释放的部分。检查器不直接读整个运行。<br>(3) 新名字在本运行和本步内都不重复。<br>(4) 被调函数能解析到节点文件（`<cwd>/nodes/<name>.ts`，库在 D2-12）。<br>(5) 按节点签名做 TS 类型检查。<br>(6) 返回类型只能是 `Atomic` 或一层扁平对象。<br>(7) 解构的字段集合等于返回类型的字段集合；标量返回值不能解构。<br>(8) pins 只钉调用输出；一条调用要钉就全钉；值的种类与字段相符。<br>(9) env 的键是本步某条调用的输出，同一条调用不冲突，模板存在。<br>(10) dry run 里的 `Human` 调用必须被钉住（理由见 D5-14） | 补上 s-eval G06 指出的“穷尽解构要核对字段集合”（`inv/s-eval.md:231`），以及 argon E-3 要求写明的检查职责（`argon/bootstrap.md:142`）。穷尽解构本身是【暂定】（`argon/rulings-C.md:240`），这里只是落实现行文档已有的规则。检查和提醒共用一个可见集，模型能引用的正是它被提醒看到的 | 技术 | 设计补充 |
| D5-12 | 批次：一次 `soroi_task` 派出的中心 worker 算一批，同批全部交回后一起释放 | `soroi_task` 的参数 `purpose`（派出多于一个 worker 时必填）；启动配方；监管者的作业结束锚点；`Subagents.batchOf(id)` | **批次：** 一次 `soroi_task` 调用就是一批，`batchId` 取这次工具调用的 id。一次派出多于一个 worker 时 `purpose` 必填。每个 worker 的启动配方里写 `batchId` 和 `purpose`；这是 spawn 时定下、之后不变的启动事实，权威是监管者，不进 store（按 D6）。<br>**成员完成：** 这个成员 `report` 契约的 `soroi_return` 被监管者接受。<br>**释放：** 同批全部成员都已完成。这是监管者持有的作业结束锚点，与发起者收到这批 `soroi_task` 结果是同一时刻；不从 store 的步推断。<br>**释放前：** 批次产出只对产出它的 worker 子树可见。<br>**释放后：** 这批输出连同 `purpose` 一起出现在发起者的提醒里。<br>**交给别的 agent 汇总：** 发起者在释放后再派一个 worker；它看得到派出之前已有的 atom，提醒里带着目的说明，不需要另设转交接口 | 【定】的部分是五个结果下游分得清、知道要干什么，并且从一开始就不同名（`argon/rulings-C.md:248-250`）；运行内名字唯一和提醒里的来源（D5-13）已满足这一点。worker 是逐步提交的，store 里“有一步”不等于这一路做完；做完的权威是 worker 的交回，所以释放取自监管者。多 worker 时 `purpose` 必填，下游才知道这批要干什么。同批屏障、目的说明、转交是【暂定】（`:251`），D2-02 也写了“批次由 soroi 自己的 subagent 派发来界定”。`purpose` 是 soroi 自有工具的参数，不依赖 omomp。**更省的备选：** 不设屏障，只靠唯一名字和来源；`eval.md:161-162` 要一并删除 | 技术 | 设计补充 |
| D5-13 | 未消费提醒的注入方式与内容 | 写 eval 的会话的 `context` 钩子（`index.ts:108-121`，沿用现行注入位置） | **怎样算：** 每次请求模型前，都从 store 服务现算本运行的未消费 atom，不缓存。<br>**每行写法：** `名字 = 预览 ← fn(参数) @env`。批次产出按批次分组，组头是 `purpose`。`Human` 产出标 `← human`；介入替换的标 `← human 替代 fn(参数)`。<br>**谁看得到什么：** 主 agent 看本运行里已释放的全部 atom；worker 看派出它之前已有的 atom、自己子树产出的 atom，以及已释放的批次 | 把占位“宿主能读取 store 里的未消费 atom 并注入系统提醒”（`eval.md:185`）落成具体钩子。worker 的可见范围是此前实现者的自选（`inv/s-eval.md:216`），这里按技术项提交投票，不当作用户意图 | 技术 | 设计补充 |
| D5-14 | `Human` 构造器的主动调用路径 | `src/eval/node.ts` 增加 `human`；中间件的调用槽位；每个写 eval 的会话经 Mux 注册的控制端点 `eval:<本会话 id>`（D2-06、D2-08、D3-19、D6-11） | `human<X, A>(request: (...xs: X) => string)`，`A` 和 `agent` 一样显式写出。<br>**端点：** 每个 `writesEval` 为真的会话注册自己的端点 `eval:<本会话 id>`，槽位的权威就是这个会话的 eval 模块。根会话的端点另外回答 `writers(runId)`：内容取自监管者里本根会话下 `writesEval` 为真的启动配方，是 Lab 后端找到全部端点的入口。<br>**流程：** 正式运行跑到 `Human` 调用时，写这一步的会话的中间件给这次调用开一个槽位，状态为“等人类交回”，带请求文本、输入 atom 和返回形状。Lab 后端先问 `eval:<根>` 拿到写方列表，再逐个读取槽位，GUI 显示请求；人提交 `HumanHandback`，形状与 `soroi_return` 的 capture 契约相同，送到持有该槽位的会话的端点，回到中间件。<br>这一步提交时，这次捕获写成 `body: "Human"`，身份取这次人类事件的哈希，不复用（D6 已同意）。<br>dry run 不写 store，也不开放人类交回，所以 dry run 里的 `Human` 调用必须钉住 | 接通 `eval.md:71` 已有的 `human` 构造器与 GUI 交回入口（argon I-2，`argon/bootstrap.md:169`；s-eval G10，`inv/s-eval.md:235`）。“与交回工具同形”是【暂定】（`argon/rulings-C.md:280`）。在途状态的权威是持有槽位的 eval 模块，不是 store（D6-11）；worker 写步是主路径（D5-07），所以端点按写 eval 的会话注册，不只按根会话 | 串联 | 缺失部分 |
| D5-15 | 被动介入：接管运行中的调用 | 中间件的调用槽位；持有槽位的会话的控制端点上的 `takeover`；`Subagents.abortTurn`；Program 运行器与 `remote abort`（D6-15） | 正式运行中，每次调用都是一个槽位，在写这一步的会话的控制端点上可见（D5-14，Lab 后端经 `writers(runId)` 找到它）。人在 GUI 里接管一个运行中的槽位时，`takeover` 送到持有该槽位的会话，由它的中间件执行：<br>(1) 先中止这次调用的体。`Agent` 中止子 agent 当前这一轮；`Program` 结束运行器进程；远程的调用用 `remote abort`。<br>(2) 再用人的 `HumanHandback` 结束这个槽位。<br>(3) 槽位绑定的 atom 名不变，所以同一步里的下游调用照常自动消费。<br>(4) 这一步一次提交（D6-04），带 `call_aborted` 和 `human_handback` 事件，这次捕获记成 `body: "Human"`，带上它替换的调用（函数、版本、输入）。<br>已经提交的步不在此列：改已提交的东西是派生运行，归 D6 | 用户原话：“将一个运行的程序取消，原本的atom要经过程序消费，现在经过一个特殊的程序，就叫他人类接入，所以产生了新的atom，然后自动触发函数消费”（`argon/rulings-C.md:278`）。槽位接管让“自动触发”在同一步内自然成立，不需要第二套调度；intervention.md 的“改值”三步（`intervention.md:11-15`）在 eval 一侧有了入口。运行器是持有槽位的会话的子进程，只有它能中止，所以接管必须送到这个会话 | 串联 | 缺失部分 |
| D5-16 | 人类介入产出新 atom 后通知 AI | 执行派生请求的 eval 插件；向会话投递带人类来源的 IRC（占位 P9） | **情形一：** 介入发生在 `soroi_eval` 调用进行中。这次工具结果把该调用标成 `human`，写这一步的 agent 当场就知道。**情形二：** agent 已经空闲，例如 D6 的派生运行产出了新 atom。派生运行由 eval 插件自己向 store 提交（D6-16）；它拿到 store 的提交结论后，直接向拥有这次运行的主会话投递一条带人类来源的 IRC（principal 取自派生请求），唤醒新的一轮；提醒里这些 atom 带 `← human` 标记 | 用户原话：“写了以后通知ai改变了”（`argon/rulings-C.md:277`，【定】）。复用 IRC 唤醒，与“人工接管走 IRC，来源可辨”（`argon/rulings-C.md:171-173`）走同一条路。提交方本来就拿到提交结论，不再订阅 store 的运行流去得知自己写下的结果（D6-09 的读方只有 Lab 后端） | 串联 | 缺失部分 |
| D5-17 | `AgentTemplate` 就是 omp 的 agent 定义名 | `node.ts` 的 `agent(prompt, { template })`；`discoverAgents(cwd)` | `template` 是 omp agent 定义的名字，子进程按这个定义启动：模型、thinking、工具、系统提示（`supervisor.ts:155-172`）。定义随发行包（D2-25）或 Lab 库的 `.omp/agents`（D2-12）分发 | 用 omp 现成的定制机制，满足“对标主 agent”（`argon/rulings-C.md:202-204`），不另造模板格式。AgentTemplate 的字段结构原是【暂定】（`argon/rulings-C.md:246`） | 技术 | 设计补充 |
| D5-18 | `Agent` 体的文件输入与交回路径怎样解析 | 中间件；`Placement` | **中心放置：** `File` 输入给子 agent 的是中心可读的路径；交回路径相对子 agent 的 cwd 解析，中间件读出字节、算内容身份，随这一步提交进 store 服务。**远程放置：** 输入经 copy-in 出现在 volume 里；交回路径随 copy-out 回到 store 服务，再由中间件绑定（D4、D6-07，占位 P5） | 落实“交回工具只收下路径，文件可能在另一台机器上，取回、存储和管理都由中间件完成”（`eval.md:94`）。subagent 只管路径，不碰文件 | 串联 | 设计补充 |
| D5-19 | 在 eval.md 写明“eval 禁止递归嵌套”，并撤下 fork 说法 | `design/eval.md`“存储”“并发”“接口”及开头的流程图 | 加一句：eval 不能嵌套；只有中心主机上的主 agent，以及从主 agent 起经 `soroi_task` 逐级派出、`writesEval` 为真的 `report` worker（D5-06）能写 eval，`Agent` 体及其之下都没有 eval 工具。把 `:5`、`:161-162`、`:166` 以及 `:175` 接口表里的 fork 分身改成 D5-07 的说法 | s-eval G08 指出用户原话“eval禁止递归嵌套”在文档里没有单独写出（`inv/s-eval.md:233`，U `#5a37a640`）；U24 要求删去 fork | 意图 | 设计补充 |

## Argon 专项裁决（`argon/eval-writers-ruling.md` section 二.1，逐字摘录）

| 裁决事项 | 状态 | 裁决内容与 `(U)` 依据 |
| --- | --- | --- |
| **4. 同时支持“单步内平铺调用并发”与“中心多 agent 并发写步 + 全齐后提醒汇总”** | **【定】** | (a) 一步 `eval` 内平铺多条无依赖调用语句（禁 `loop`/`map`/`object`/`array`，结构从一开始不能同名），引擎自然并发；(b) 中心主机支持派出多个中心 agent 在同一运行内并发写 `eval` 步消费 atom，同批全部完成后一起进入带来源和批次目的的未消费提醒供汇总。依据：**(U)** `01a18dd4 #2c08aa6d`、`01a18ed5 #440c8605, #ea638181, #b7357c72, #13abc2a1`、`01a18e8a #4da22ab4, #e0de24df`。 |
| **5. 撤回“只有主 agent 单会话能写 eval”的无据限制；以 `soroi_task` 中心 `report` worker（`writesEval = true`）+ `purpose` 批次屏障承载多 agent 并发写步** | **【暂定】** | “只有主 agent 写 eval、不允许派出的中心 agent 写 eval 步”无 `(U)` 依据，予以撤回。在不用 `omomp` `fork`（U24）的前提下，由主 agent 经 `packages/omp-soroi` 的 `soroi_task` 逐级派出中心 `report` worker（`LocalChild`，启动配方 `writesEval = true`）在同一运行内并发写 `eval` 步，并以一次 `soroi_task` 调用 + `purpose` 参数界定批次与释放屏障（`D2-02/03/05`、`D5-06/07/12/13/14/19`），因具体工具参数与字段名未由用户逐字口述，按 D1-16 标为 **【暂定】**（完全满足第 1–4 项全部 `【定】` 意图硬约束的技术/串联与设计补充方案）。 |

## 早期 LeadMentor 反对与当前受影响行（反对意见逐字，当前行逐字）

### D5-02

早期反对意见（逐字）：`| D5-02 | 反对 | 反例：远程镜像烘焙了定制，更新后版本不一致。修改：镜像不烘焙定制，每次 copy-in；在干净 HOME 实测 extension、agent、skill、rule、settings 都能被发现 |`

当前受影响行（逐字）：

| D5-02 | `packages/omp-soroi` 在“完整 omp 定制”中的贡献，以及 Pepgent 怎样调用（U23） | `Pepgent/soroi` 单仓：`packages/omp-soroi` 的 `package.json` 里的 `omp.extensions`；同仓的 agent 定义、技能、规则和设置覆盖（D2-25） | **插件：** eval 模块提供 `soroi_eval`、未消费提醒、中间件和介入控制端点；subagent 模块提供监管者、`soroi_task`、`soroi_return` 和子进程桥接。**技能 `soroi-eval`：** 怎样写一步，dry run 与正式运行，pins 与 env，`stop`，派出中心 worker 并写批次目的。**规则：** 每个 atom 都要消费；dry run 通过后原样提交同一段代码，不合并、不改写。**agent 定义（D2-25 列出的三种角色）：** 写 eval 的主 agent，写 eval 的中心 worker，`Agent` 体。**调用路径：** Pepgent 的 Lab 后端以写方身份打开 `/agents/{root}/writer`，用 `omp-rpc-mux dial -- omp --mode rpc` 启动中心 omp 主会话（D2-15、D3-10、裁决 D），以 RPC 发 prompt、收事件；运行图和时间轴读 store 服务（D6）；在途调用读各写 eval 会话的控制端点（D5-14、D6-11）。**远程：** omp-agent 镜像不烘焙定制；boot 每次把与中心同一哈希的发行 tar 经 copy-in 拷入，安装到隔离的 HOME（D2-11、D4-09）。**验收：** 在干净的 HOME 里安装发行包后实测，extension、agent 定义、技能、规则、设置覆盖全部被 omp 发现，才算完整定制 | 一个仓库发行一份定制，中心和远程加载的是同一份字节，不会分叉；soroi 发版不需要重建镜像。omp 插件 manifest 只声明 extensions、tools、hooks、commands 和 settings（`plugins/types.ts:26-49`）；扩展包里的 agent 目录会被发现（`inv/o-placement.md:34-40`）。技能和规则怎样随安装生效，记为占位 P11，由上面的验收确认 | 串联 | 缺失部分 |

### D5-10

早期反对意见（逐字）：`| D5-10 | 反对 | 同 D4-19 |`

当前受影响行（逐字）：

| D5-10 | 单次调用换 env：采用 D4-19 | `soroi_eval.env`；检查器；中间件 | `env?: Record<AtomName, 模板名>`，键是这次调用产出的任意一个 atom 名。检查器把每个键归并到产出它的调用；同一条调用的几个键给了不同模板，报 `env_conflict`。生效的 env 依次取：这里的覆盖，节点函数的默认模板，`central`。生效的 env 算进捕获身份（现行身份已含 env，`execute.ts:122`）。步的代码仍只有三种语句，不出现模板名字面量。检查器核对键是本步某条调用的输出，模板名在 remote 的模板目录里（占位 P6） | 意图约束：调用要简单，模板提前构建，不写魔法值，不定义 object（`argon/rulings-C.md:216-220`）。env 是“在哪里跑”，不是参与数据流的值，所以放在工具参数里，不改调用的参数个数。**备选（本稿初版）：** 用 `const gpu: Env = "slurm-a100"` 定义环境 atom，作为末尾参数传入。它让 env 进入数据流、改变参数个数，因与 D4 冲突而撤回 | 技术 | 设计补充 |

### D5-11

早期反对意见（逐字）：`| D5-11 | 反对 | 反例：checker 读整个运行，绕过可见范围；并发时出现同名输出。修改：checker 使用 supervisor 给出的可见集；store 在提交时复核 |`

当前受影响行（逐字）：

| D5-11 | 执行前检查清单 | `src/eval/check.ts`（大部分已有，`inv/r-eval.md:69-72`）；`eval.md` 占位表第一行改写成正文 | 按顺序检查：<br>(1) 只有三种语句；根 atom 只允许数字、字符串、布尔字面量。<br>(2) 引用的 atom 都在本会话的可见集里，或在本步前文定义过。可见集与 D5-13 的提醒用同一个计算：atom 取自 store 服务里本运行已提交的状态，再按监管者给出的可见范围（`Subagents.visibility`：spawn 时的快照、自己的子树、已释放的批次）过滤；主 agent 的可见范围是整个运行中已释放的部分。检查器不直接读整个运行。<br>(3) 新名字在本运行和本步内都不重复。<br>(4) 被调函数能解析到节点文件（`<cwd>/nodes/<name>.ts`，库在 D2-12）。<br>(5) 按节点签名做 TS 类型检查。<br>(6) 返回类型只能是 `Atomic` 或一层扁平对象。<br>(7) 解构的字段集合等于返回类型的字段集合；标量返回值不能解构。<br>(8) pins 只钉调用输出；一条调用要钉就全钉；值的种类与字段相符。<br>(9) env 的键是本步某条调用的输出，同一条调用不冲突，模板存在。<br>(10) dry run 里的 `Human` 调用必须被钉住（理由见 D5-14） | 补上 s-eval G06 指出的“穷尽解构要核对字段集合”（`inv/s-eval.md:231`），以及 argon E-3 要求写明的检查职责（`argon/bootstrap.md:142`）。穷尽解构本身是【暂定】（`argon/rulings-C.md:240`），这里只是落实现行文档已有的规则。检查和提醒共用一个可见集，模型能引用的正是它被提醒看到的 | 技术 | 设计补充 |

### D5-12

早期反对意见（逐字）：`| D5-12 | 反对 | 反例：worker 提交第一步后批次就被释放。修改：以 \`report\` 的 \`soroi_return\` 被接受为锚点；\`purpose\` 必填 |`

当前受影响行（逐字）：

| D5-12 | 批次：一次 `soroi_task` 派出的中心 worker 算一批，同批全部交回后一起释放 | `soroi_task` 的参数 `purpose`（派出多于一个 worker 时必填）；启动配方；监管者的作业结束锚点；`Subagents.batchOf(id)` | **批次：** 一次 `soroi_task` 调用就是一批，`batchId` 取这次工具调用的 id。一次派出多于一个 worker 时 `purpose` 必填。每个 worker 的启动配方里写 `batchId` 和 `purpose`；这是 spawn 时定下、之后不变的启动事实，权威是监管者，不进 store（按 D6）。<br>**成员完成：** 这个成员 `report` 契约的 `soroi_return` 被监管者接受。<br>**释放：** 同批全部成员都已完成。这是监管者持有的作业结束锚点，与发起者收到这批 `soroi_task` 结果是同一时刻；不从 store 的步推断。<br>**释放前：** 批次产出只对产出它的 worker 子树可见。<br>**释放后：** 这批输出连同 `purpose` 一起出现在发起者的提醒里。<br>**交给别的 agent 汇总：** 发起者在释放后再派一个 worker；它看得到派出之前已有的 atom，提醒里带着目的说明，不需要另设转交接口 | 【定】的部分是五个结果下游分得清、知道要干什么，并且从一开始就不同名（`argon/rulings-C.md:248-250`）；运行内名字唯一和提醒里的来源（D5-13）已满足这一点。worker 是逐步提交的，store 里“有一步”不等于这一路做完；做完的权威是 worker 的交回，所以释放取自监管者。多 worker 时 `purpose` 必填，下游才知道这批要干什么。同批屏障、目的说明、转交是【暂定】（`:251`），D2-02 也写了“批次由 soroi 自己的 subagent 派发来界定”。`purpose` 是 soroi 自有工具的参数，不依赖 omomp。**更省的备选：** 不设屏障，只靠唯一名字和来源；`eval.md:161-162` 要一并删除 | 技术 | 设计补充 |

### D5-16

早期反对意见（逐字）：`| D5-16 | 反对 | 反例：会话停驻后插件不在，通知丢失。修改：Lab 后端订阅 store 并唤醒 session |`

当前受影响行（逐字）：

| D5-16 | 人类介入产出新 atom 后通知 AI | 执行派生请求的 eval 插件；向会话投递带人类来源的 IRC（占位 P9） | **情形一：** 介入发生在 `soroi_eval` 调用进行中。这次工具结果把该调用标成 `human`，写这一步的 agent 当场就知道。**情形二：** agent 已经空闲，例如 D6 的派生运行产出了新 atom。派生运行由 eval 插件自己向 store 提交（D6-16）；它拿到 store 的提交结论后，直接向拥有这次运行的主会话投递一条带人类来源的 IRC（principal 取自派生请求），唤醒新的一轮；提醒里这些 atom 带 `← human` 标记 | 用户原话：“写了以后通知ai改变了”（`argon/rulings-C.md:277`，【定】）。复用 IRC 唤醒，与“人工接管走 IRC，来源可辨”（`argon/rulings-C.md:171-173`）走同一条路。提交方本来就拿到提交结论，不再订阅 store 的运行流去得知自己写下的结果（D6-09 的读方只有 Lab 后端） | 串联 | 缺失部分 |

### D5-18

早期反对意见（逐字）：`| D5-18 | 反对 | 反例：交回 /etc/passwd 或经 symlink 读到凭据。修改：限定输出根目录，路径 canonicalize，限制大小 |`

当前受影响行（逐字）：

| D5-18 | `Agent` 体的文件输入与交回路径怎样解析 | 中间件；`Placement` | **中心放置：** `File` 输入给子 agent 的是中心可读的路径；交回路径相对子 agent 的 cwd 解析，中间件读出字节、算内容身份，随这一步提交进 store 服务。**远程放置：** 输入经 copy-in 出现在 volume 里；交回路径随 copy-out 回到 store 服务，再由中间件绑定（D4、D6-07，占位 P5） | 落实“交回工具只收下路径，文件可能在另一台机器上，取回、存储和管理都由中间件完成”（`eval.md:94`）。subagent 只管路径，不碰文件 | 串联 | 设计补充 |

Vote every row: ID | 票 | 理由 | 反例 (反对时必填)

## Governance 对未逐字采纳的两条反对的回应

- **D5-16（会话停驻后插件不在，通知丢失）：反驳，不改。** IRC 投递到已停驻或空闲的会话会先唤醒它再注入（`design/subagent.md` 设计依据第 3 节：“给已死的 agent 发消息：IRC 投递先走 `ensureLive`，再注入”）；根会话的写方是 Lab 后端，它持有根会话的待投递队列并在会话空闲或步边界投递（D3-12、D7-09）。所以“停驻”不丢通知，主路径上不需要 Lab 后端另行订阅 store。
- **D5-18（交回 /etc/passwd、symlink、大小限制）：反驳，不改。** 设计阶段只写主路径，安全加固分支不在本阶段设计（D2、D3、D6 的同类反例都按此处理）。
- D5-02、D5-10、D5-11、D5-12 已按你的修改建议改写，见上面各行原文。
- 另：argon 已裁决“只有主 agent 写 eval”没有用户 (U) 原文支持，主 agent 与经 `soroi_task` 派出的中心 worker 都可以写 eval 步（见上方摘录），D5-06、D5-07、D5-12、D5-13 不需改动。

若仍反对，请给出主路径上的反例。
