# D6 store 服务：写入、读取、订阅、介入记录与运行生命周期

依据缩写（行号均为当前工作树）：

| 缩写 | 文件 |
| --- | --- |
| PB | `pepgent-pm/evidence/argon/pivot-baseline.md` |
| RC | `pepgent-pm/evidence/argon/rulings-C.md` |
| BS | `pepgent-pm/evidence/argon/bootstrap.md` |
| inv/… | `pepgent-pm/evidence/inv/…` |
| D2 | `pepgent-pm/evidence/decisions/D2-components.md` |
| design/… | `pepgent-soroi/design/…` |
| U23、U24 | Main 逐字转述的用户新指令（待秘书登记进 LEDGER）。U23：“对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”。U24：“不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制” |

## 框架

store 是“能落盘的状态管理”，不是 session log，GUI 直接读它，不另设 DSL（PB:20，用户原话 `#64246eaf`）；历史时间轴“是个极为重要的功能”（RC:262）；DuckLake 是为远程 agent 准备的：运行中本机独立落盘，运行结束后随拷贝回集中副本，不让一堆集群写一个中央库（RC:95，`#8e0a7e8f`；RC:120，`#3dbd0473`）；dry run 从头到尾不进 store（RC:229-230，`#32b6f7fd`）；人类写值不是合并写入，而是取消原程序、改由“人类接入”消费并产出新 atom，并“通知ai改变了”（RC:277-278，`#ba5ad307`、`#d1baf561`）；人类修改正在运行的函数体并派生新闭包永远是正式运行（RC:279，`#a0d22b8a`）；“没有重放”（RC:263，`#9e2d37a1`、`#21495b13`）。

`design/store.md` 已把中心提交、远程汇入、提交后推送、全文派生表都派给一个叫“soroi 服务”的执行者，但没有写它是哪个进程、和 eval 插件怎么分工（inv/s-store.md:197-202；`design/store.md:65,68-69,85-86`）。argon 把它的进程归属、FTS 派生表、`Human` 身份都标为【暂定】交投票（PB:76-78；RC:191,259,266）。另有七处半截设计归本表：S-1 检索（RC:254-259）、S-2 运行生命周期与派生记录（RC:260-266；BS:153-158）、S-3 草稿与跨运行比较（RC:267-272；BS:159-162）、I-1 到 I-3 的记录侧（RC:274-286；BS:166-171）、节点库的持久化、列出、版本、影响校验（RC:241-246；inv/s-node-library.md:223-267）。

本表接受 D2 已定的归属，不重议：store 服务是 `Pepgent/soroi` 单仓的 `packages/store`（同仓有插件包 `packages/omp-soroi` 与 compose），随 soroi 定制同版本发布的中心常驻进程，是中心副本唯一写方（D2:40）；介入的入口在 Lab 后端，经 Mux 到持有该运行的 eval 插件，store 只记录结果（D2:42）；节点库的当前定义在每个 Lab 的 git 仓库里（D2:48）；Lab 后端是 GUI 的门面，自动化在 Lab 后端里订阅 store（D2:50,52）；store 服务作为 soroi omp 定制的伴随服务随发行仓的 compose 拉起（D2:61）。按 U24，本表不出现 `fork` 分身或并发批次的任何记录，不依赖 omomp 的机制。

leader 已就与 D2 草稿的分歧作出技术裁决：D6-08 不建 FTS 派生索引；D6-16 派生运行不按已存的步重新执行；节点函数版本为 `Bun.build` bundle 的内容哈希（待 argon 确认）。D6-11 在途进度从 eval 插件读、不经 store，D2 已无异议。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D6-01 | **store 服务进程与单写方** | `Pepgent/soroi` 单仓的 `packages/store`（随 soroi 定制同版本发布）；中心主机一个 Bun 常驻进程 `pepgent-store`，进程内用 `@duckdb/node-api` 打开 DuckLake（D2:40,56；argon/D2-rulings.md） | 服务是中心副本唯一的 DuckLake 连接持有者，也是唯一读方入口：eval 插件、Lab 后端、remote 的步骤容器都只经它的 HTTP 接口读写。eval 插件不再在 omp 进程内打开 DuckLake（现状 inv/r-eval.md:99-103）。**权威：** 中心副本（值、名字、步、调用、捕获、停止、运行、事件）和对象目录。**生命周期：** 进程由 Komodo Stack 起停，独立于任何 omp 会话；数据比进程活得久（`design/layers.md:30`） | **选定：** 单写方服务，其余皆客户端。**朴素方案：** 各 omp 进程各自打开同一个 DuckLake。中心主机上并存多个根会话，还有远程汇入和 GUI 读取，多写方要靠锁维持一致，违背“一项状态一个源头”。**实质不同的方案：** 由 Lab 后端进程内嵌 store。把引擎的值权威塞进业务应用，违背组件独立存在（RC:53） | 串联 | 是：PB:76 暂定 1；inv/s-store.md:197-202 |
| D6-02 | **落盘选型** | 中心主机文件系统：`$STORE_HOME/catalog.sqlite`（DuckLake 目录库）、`$STORE_HOME/data/`（Parquet）、`$STORE_HOME/objects/<sha256>`（文件原始字节） | DuckLake 规格不变（`design/store.md:41-52`），目录库用 SQLite：只有一个写方进程，SQLite 足够，已验证 Bun 可读写（`design/store.md:94`）。对象按内容哈希放本地目录，由 store 服务经 HTTP 提供给远程。小提交走 DuckLake 目录库内联（`design/store.md:95`），定期合并整理见占位 P7 | **选定：** 本地文件系统，不起 S3 服务。DuckDB、DuckLake 为 MIT，SQLite 为公有领域。**朴素方案：** 即选定方案。**实质不同的方案：** S3 兼容对象存储。MinIO 与 Garage 均为 AGPL-3.0，MinIO 社区版已停止发布二进制；SeaweedFS 为 Apache-2.0，协议友好，但只有一台中心主机、远程一律经 store 的 HTTP 取对象时，它只多一个要运维的服务。将来中心拆成多台主机时再换 SeaweedFS，DuckLake 的 `DATA_PATH` 和对象目录换成 S3 前缀即可 | 技术 | 否（store.md 已定方向，本行定具体件） |
| D6-03 | **记录模型修订：调用与捕获分开，按调用连起名字** | `Pepgent/soroi` 的 `packages/store` 的表；`design/store.md` 的“存什么” | 身份表（不分区）：`vals`（值）、`captures`（捕获：身份、节点函数名、版本、体、运行环境、按位置的输入值身份、产出字段→值身份、agent transcript session id）。运行表（按 `run_id` 分区）：`runs`、`steps`（代码、写这一步的 omp session id、提交时间）、`calls`（步内位置、函数名、输入 atom 名、产出 atom 名、捕获身份、来历）、`names`、`stops`、`events`。`calls.来历` 是 sum type：`Executed`（本次运行）、`Adopted`（身份命中中心副本，采用已有记录）、`Human`（人类交回，附被替代的调用）、`Inherited`（派生运行从父运行继承）。消费关系仍不单独存：一个 atom 被哪些 `calls` 的输入名引用，或有没有 `stops` 记录 | **选定：** 调用（运行内、带名字）与捕获（跨运行、带身份）分两层。这回答了“复用在当前运行里怎么记”（inv/s-store.md:225-230）和“捕获只存值身份、消费按名字定义”的断裂（inv/s-store.md:232-236），现有插件已有同名两层表（inv/r-eval.md:99）。**朴素方案：** 捕获行直接带运行 id 和名字。同一个捕获被多个运行复用时要复制，身份不再唯一。**实质不同的方案：** 加一张消费表。是可由 `calls` 推出的派生数据，不需要 | 技术 | 是：S-2（BS:153-158） |
| D6-04 | **写入粒度：一步一次提交** | eval 插件 → store：`POST /runs/{run}/steps` | 正式运行的一步，在它全部调用结束（含远程拷回、人类交回）后，由 eval 插件一次提交：步、调用、新捕获、新名字、停止、事件（每个调用的开始、结束时刻作为事件带原始时间写入）。远程 `Agent` 的批次在同一个事务里 `INSERT … SELECT * FROM read_parquet(…)` 汇入（D6-07）。dry run 不调用任何写接口 | **选定：** 一步一事务，与“一个 atom 被消费 = 所在的一步已正式运行”（`design/eval.md:102`）的原子性一致；D4、D5 起草者采用同一粒度。**实质不同的方案：** 每个调用开始、结束各提交一次，让 store 也承载在途状态。在途捕获的权威是 eval 插件（D2:38），提前写进 store 等于先改自己的记录再去对齐。在途状态的读法见 D6-11 | 串联 | 是：inv/s-store.md:265-269 |
| D6-05 | **运行的开始与结束锚点** | `runs` 与 `events`；判定在 store 服务的提交事务里 | **开始：** 一个根 omp 会话没有未结束的运行时，它的第一次正式提交（或 D6-16 的派生请求）由 eval 插件带上 `open: { session }`，store 在同一事务里建运行、写 `run_started`；运行 id 由 store 生成，确认者是 store 的提交。**结束：** 每次提交时，store 在事务内计算该运行的未消费 atom 集合；为空就在同一事务写 `run_ended`。这与“所有末端的 atom 都停止了，流程就结束了”（`design/eval.md:120`）同义，现有插件已如此（inv/r-eval.md:103-104）。**中止：** 派生请求或人类中止整个运行时，eval 插件先中止全部在途调用并得到结论，再请求 store 写 `run_aborted`。**嵌套：** 远程 volume 与批次 ⊂ 调用 ⊂ 步 ⊂ 运行；内层都在一步提交之前结束，所以运行的结束锚点之前没有未收尾的内层 | **选定：** 开始由执行方请求、store 确认；结束由 store 依自己持有的事实判定，不另设“结束”命令。**朴素方案：** 由 AI 或 GUI 显式宣布结束。结束条件已完全由 store 的记录决定，另一方宣布只会制造第二个判断源。**实质不同的方案：** 运行与 omp 会话等寿命。一个会话可以先后跑多次运行，派生运行也不新开会话 | 串联 | 是：S-2（BS:157）；inv/s-gui-read.md:180 G3 |
| D6-06 | **运行事件对外可见** | store 服务 `GET /stream/lifecycle`（SSE）；消费方是 Lab 后端的自动化（D2:52） | 每次提交后，store 把本次提交写入的 `run_started`、`run_ended`、`run_aborted` 推给全局生命周期流；每条带运行 id、根 session、派生自哪次运行、序号、时间。订阅方带 `after=<全局游标>` 续读。store 不启动任何程序；自动化规则、审批与启动会话都在 Lab 后端 | **选定：** store 只发布事实，由订阅方决定动作，不长出调度器（PB:13；inv/s-gui-read.md:181 G4）。**朴素方案：** Lab 后端轮询运行列表。延迟与无效读取都更多，且仍读同一个源 | 串联 | 是：`design/layers.md:67-69` |
| D6-07 | **文件端点：copy-in、copy-out 与传输暂存区** | store 服务 HTTP；URL 由 eval 中间件写进 remote 的 `RunRequest`，remote CLI 不调用 store（D2:45） | **暂存区：** 每次远程调用（dry run 与正式运行都一样）由 eval 中间件先 `POST /transfers` 开一个暂存区，store 生成 transfer id，放在 `$STORE_HOME/staging/<transfer>/`。暂存区只用于传输，不进中心副本，任何查询都看不到它（D2:40）。**copy-in：** 已在中心副本里的输入 `File` 用 `GET /objects/{sha256}`；还不在中心副本里的字节（dry run 改过的节点 bundle、尚未提交的本机产出）由中间件 `PUT /transfers/{t}/objects/{sha256}`，远程用 `GET /transfers/{t}/objects/{sha256}` 取（remote 的 `HttpGet` 源，inv/r-remote.md:105,156）。节点 bundle 的版本是其内容哈希（leader 裁决，待 argon 确认）。**copy-out：** `PUT /transfers/{t}/volume`，正文是整个 volume 的 tar（inv/r-remote.md:106）；store 解包进暂存区。dry run 时中间件经 `GET /transfers/{t}/files/{path}` 取回产出交给 AI。**结束锚点：** dry run 在 eval 调用返回时由中间件 `DELETE /transfers/{t}`；正式运行在提交这一步时，调用记录引用该 transfer，store 在同一事务里把 volume 文件按内容哈希移入对象目录、写清单对象与 `volumes` 行（调用 → 清单）、读 `soroi-batch/` 的 Parquet 写进中心分区表，提交完成后删除暂存区；权威在这次提交时从远程批次目录转到中心副本（`design/store.md:68`）。**浏览：** `GET /volumes/{run}/{step}/{call}` 返回清单，`GET /volumes/{…}/files/{path}` 返回文件，满足“结束后能浏览工作目录”（`design/layers.md:24`） | **选定：** 每次远程调用一个暂存区，生命周期嵌在调用内：开始由中间件请求，结束是 dry run 返回或正式提交。dry run 的远程试跑（RC:225，`#68d36f55`“在slum里试跑某种算法非常正常”）因此有地方收发文件，又不进 store（RC:229）。**朴素方案：** 远程 run id 作键、直接写对象目录。拿到 run id 前 `RunRequest` 就要带上输出地址；dry run 的字节会混进中心对象目录。**实质不同的方案：** remote 把 volume 拷到中心主机共享目录，再由 store 去扫。多一个共享目录和一份文件状态 | 串联 | 是：PB:76 暂定 1；D2:40 |
| D6-08 | **检索：不建派生索引** | store 服务 `GET /search?q=…` | 结构化字段直接 SQL。文本检索对 DuckLake 表的文本列做 `ILIKE '%q%'`：字符串标量值（`vals`）、atom 名、步的代码、节点函数名；结果按运行归组。文件按名字、路径、媒体类型检索，内容检索不在本行范围（与现 `design/store.md:86` 只索引文本列的范围相同）。“一个值在哪些运行里出现过”是 `GET /values/{hash}/runs`（`design/layers.md:33`）。删除 `design/store.md:86` 的 FTS 派生表 | **选定：** 不存第二份文本。用户反对“数据本身还要再在数据库里存一遍反向索引”（RC:257，`#543f0ccd`），偏好列存（RC:258）；DuckDB `fts` 的默认 `ignore = '(\\.|[^a-z])+'` 会把中文全部剥掉（R：`curl https://duckdb.org/docs/2.0/core_extensions/full_text_search.html` 输出），实验室文本以中文为主，派生表检索不到。代价：没有相关度排序，全量扫描随数据增长；等有实测的性能需求，再加派生索引并写明来源、失效与刷新。**朴素方案：** 即选定方案。**实质不同的方案：** 保留 `fts` 派生表并在全部写入路径上更新（D2:40、PB:77 暂定 2）。见上，中文不可用 | 意图 + 技术 | 设计补充：S-1（RC:254-259） |
| D6-09 | **订阅推送** | store 服务 `GET /runs/{run}/stream?after={seq}`（SSE）；读方是 Lab 后端，浏览器只连 Lab 后端（D2:54） | 每次提交后，store 把该运行新增的事件连同它们引用的记录（调用、捕获、名字、停止）按序号推给订阅这个运行的读方；读方先 `GET /runs/{run}/graph` 取快照（带当前序号），再从该序号续订。远程 agent 运行中的进度不经 store，由读方经 Mux 订阅（D2:44；`design/store.md:85`） | **选定：** 提交即推送，序号即游标，和时间轴用同一个权威（事件表）。**朴素方案：** 读方轮询 `graph`。同一个源，只是延迟大。**实质不同的方案：** store 转发远程批次进度。store 会持有一份不归它的副本 | 技术 | 是：PB:76 暂定 1 |
| D6-10 | **运行图投影与时点回看** | store 服务 `GET /runs/{run}/graph?at={seq}` | 返回 `RunGraph`（见接口草图）：节点是根 atom 与调用，边是“产出名 → 消费它的调用的第几个输入”，状态与起止时刻取自事件，产物取自捕获的产出字段；未消费 atom 单列。`at=k` 只用序号不超过 k 的事件与它们引用的记录，不依赖 DuckLake 快照（`design/store.md:77,80`）。这是按需计算的视图，不落盘、不是 DSL | **选定：** 一个只读投影同时服务当前图和历史时点。修正 `design/store.md:84` 把“事件给出体的种类、产物”混为一谈的表述（inv/s-gui-read.md:183 G6）。**朴素方案：** 让 GUI 自己拼表。每个读方各写一份拼装逻辑 | 技术 | 设计补充：inv/s-gui-read.md:183-185 |
| D6-11 | **在途状态的读法** | 在途调用、待人类交回的 `Human` 调用：eval 插件经 Mux 注册的控制端点（D2:44,168）；已提交事实：store | Lab 后端画运行中的图 = store 的 `graph` 快照与 `stream`，叠加 eval 插件控制端点上的在途调用（开始时刻、体、环境、远程 run id、是否在等人类交回），再叠加 Mux 上远程批次进度。一步提交后，在途叠加层里的这几个调用由已提交记录取代 | **选定：** 在途状态只从它的权威（eval 插件，D2:38）读，store 只装已提交的事实。**实质不同的方案：** eval 插件把在途变化推给 store 再转发（D5 起草者最初的设想）。store 会持有在途状态的副本，late subscriber 还要 store 自己保存最新快照，这是第二份状态 | 串联 | 是：inv/s-gui-read.md:184 G7 |
| D6-12 | **草稿** | 草稿画布（原型 R-022 流程编辑器）归 Lab 后端的业务库（D2:50）；store 不存草稿 | store 只负责“还没走完的运行”：已正式运行的步与未消费 atom（`design/store.md:84`）。原型里尚未开始的实验画布是 Lab 的业务对象：引用节点库函数名，供讨论和启动实验时作为 agent 的上下文，从不被执行，也不进 store。实验启动后，Lab 后端记下它启动的根 session id；store 的运行带同一个 session id，两边按它关联，不加新字段 | **选定：** 草稿是业务计划，不是值，不进值的权威；dry run 也就不必为画草稿写 store（RC:269-270）。**实质不同的方案：** store 存未运行的捕获作为草稿节点。用户已否定（inv/s-gui-read.md:169） | 串联 | 设计补充：S-3（RC:272；inv/s-gui-read.md:178 G1） |
| D6-13 | **跨运行比较按调用对齐** | store 服务 `GET /compare?a={run}&b={run}` | 纯查询，按图自底向上对齐：根 atom 按名字对齐（派生运行另用派生记录里的改名映射）；两个调用对齐，当且仅当节点函数名相同且每个输入位置的 atom 已对齐；对齐调用的产出按字段名对齐。每对标为 `SameCapture`（身份相同）、`Changed`（对齐但产出不同）、`OnlyA`、`OnlyB`，逐字段给出两边的值 | **选定：** 结构对齐，覆盖改了参数后身份已变的调用（inv/s-gui-read.md:179 G2）；派生运行继承父运行的名字（D6-16），对齐天然成立。用户要求“并发开五个验证同一个东西，然后我要比较这五个”（RC:271，`#4da22ab4`）。**朴素方案：** 只按捕获身份对齐。只能认出没变的调用。**实质不同的方案：** 记录一个跨运行的“调用位置 id”。要为比较多存一份状态 | 技术 | 设计补充：S-3（RC:272） |
| D6-14 | **改值：中止在途捕获，由 `Human` 交回** | 入口 Lab 后端 → Mux → 持有运行的 eval 插件（D2:42）；记录进 store | 只针对在途调用。插件中止该调用（D6-15），得到结论后，用人类的交回（与交回工具同形：字段值 + 文件）作为这个调用的产出，绑定到原代码里该调用本来要绑定的那些名字，`calls.来历 = Human{replaced}`。同一步里已写好的下游调用照常消费这些名字（“自动触发函数消费”，RC:278）；这一步提交时，eval 工具返回给 AI 的结果和之后的未消费提醒都标明 `名字 ← 人类接入（替代 anneal(film, temp_2200c)）`，AI 由此得知人改了值（“写了以后通知ai改变了”，RC:277）。已提交的调用不能改值，要改走 D6-16 | **选定：** 在途改值与派生运行按“调用是否已提交”划界，回答 I-2 的重叠（inv/s-intervention.md:154-158）。**朴素方案：** GUI 改 store 里的值。用户否定合并写入（RC:278）。**实质不同的方案：** 改值也派生新运行。会让每次改一个在途值都截断整个运行，用户的说法是“将一个运行的程序取消”而非整个运行 | 意图 + 串联 | 设计补充：I-1、I-2（RC:274-280） |
| D6-15 | **中止的执行路径** | eval 插件（在途调用的拥有方）；store 只记录结论 | 本机 `Program`：结束 runner 进程。远程 `Program`：`remote abort <run>`（inv/r-remote.md:102）。本机 `Agent`：取消结果作业，中止 subagent 当前这一轮，agent 仍可唤醒（`design/subagent.md:44` 已验证）。远程 `Agent`：同样中止当前轮（经 Mux），再 `remote abort`。被中止的调用不汇入远程批次。中止时刻与“被谁替代”在该步提交时作为事件写入 | **选定：** 请求拥有方并等结论（D2:42）。**实质不同的方案：** store 或 Lab 后端直接调 remote。跳过在途调用的拥有方，插件可能在被替代后才收到交回 | 串联 | 是：I-3（BS:170-171） |
| D6-16 | **派生运行：改参数或函数体** | 入口同 D6-14；派生请求由 eval 插件执行，store 在一次提交里建新运行 | 请求指向父运行 P 的一个调用 C，带改动：`ChangeInput{位置, 新值}`（新值成为新根 atom）和/或 `ChangeVersion{函数名, 新版本}`（新函数体先由 Lab 后端在人确认后 commit 进库，D2:48）。插件中止 P 的在途调用，请求 store 写 `run_aborted`（P 未结束时），并在同一请求里开新运行 R'：R' 继承 P 中不在 C 下游的全部名字（`calls.来历 = Inherited`，按身份复用，不运行），新根 atom 绑定改过的输入。插件随即把“新的实例”作为 R' 的第一步正式运行：同一函数（或新版本）、替换后的输入、原来的产出名。之后 R' 的下游由 AI 按未消费提醒一步步写，提醒标明 `来自派生：R-016 在 N-05 改了 temp`；与父运行相同的调用按身份直接复用。R' 记 `derivedFrom = P`、改动列表；P 的记录不动 | **选定：** 只自动运行被改的那一个调用（“新的实例，新的参数，旧的函数体”，RC:264），下游不按 P 已存的步重新执行，因为“没有重放”（RC:263）。**朴素方案：** 按 P 已存的步把受影响的部分全部重跑（D2:173 的占位、`design/intervention.md:24` 的字面理解）。这就是对同一份脚本的重放。**实质不同的方案：** 只建 R'，连 C 也交给 AI 重写。人的改动就停在一个未消费的根 atom 上，“受影响的部分重新运行”一个都没有发生 | 意图 + 串联 | 设计补充：S-2、I-2（RC:260-266）；inv/s-intervention.md:166-170 |
| D6-17 | **主动 `human(request)` 节点** | 在途请求读自 eval 插件控制端点（D6-11）；交回经 Lab 后端 → Mux → 插件 | `human` 构造器的调用开始后进入“等待人类交回”；GUI 从在途叠加层看到它和 `request` 文本；人交回（与交回工具同形）后，调用结束，`calls.来历 = Human{replaced: none}`，随这一步提交。与 D6-14 共用一个交回类型 | **选定：** 被动介入与主动请求是同一种 `Human` 调用，只差有没有被替代的调用。交回形状同交回工具为【暂定】（RC:280） | 技术 | 设计补充：I-2（BS:169） |
| D6-18 | **`Human` 捕获的身份** | `captures` | 身份 = 介入事件的哈希（运行、步、调用位置、交回内容、受理时刻），每次都是新身份，不会被复用（保留 `design/store.md:32`） | **选定：** 人的回答不是输入的函数，按输入算身份会让下次同样输入时错误复用一次人类回答。该规则来自 assistant 的补充，用户未单独确认（RC:266；inv/s-store.md:252-257），交投票 | 技术 | 否（保留现文，改为投票确认） |
| D6-19 | **接管 agent 不经 store** | Lab 后端 → Mux → subagent 插件 → omp IRC（D2:42） | 人发出的 IRC 带人类来源，可排队（RC:173，`#7bfe3696`）；对话只在 omp transcript 里。store 不为一条 IRC 建 `Human` 捕获；那个 agent 之后经交回工具交回时，是一次普通的 `Agent` 捕获，捕获记录里的 transcript session id 可回看人的消息 | **选定：** IRC 不等于交回结果（inv/s-intervention.md:184-188）。**实质不同的方案：** 每条人类 IRC 记一个 store 事件。是 transcript 的第二份副本 | 串联 | 是：I-3（BS:171） |
| D6-20 | **事件类型收敛** | `events` | 保留：`run_started`、`run_ended`、`run_aborted`、`step_committed`、`call_started`、`call_ended`、`call_adopted`、`call_inherited`、`call_aborted`、`human_handback`、`atom_stopped`。删除 `design/store.md:19` 的“暂停、继续”：转向后程序由 AI 逐步写出，store 没有任何一方会产生“暂停”这个事实，也没有 (U) 原话支撑。原型的“暂停”按钮落到 D6-16 的中止整个运行或 D6-14 的介入 | **选定：** 每个事件类型都有确定的产生者。按 U24 只保留有 (U) 支撑的东西。该删除交投票，不默默收缩 | 技术 | 设计补充 |
| D6-21 | **节点库：持久化、列出、版本、影响校验的 store 侧** | 当前定义在 Lab 库 git 仓库（D2:48）；store 保存所有用过的版本字节并回答使用情况 | **持久化：** 首次正式运行某个节点版本时，eval 中间件把它的 bundle 存成对象（`PUT /objects/{hash}`），所以任何历史调用都能取回当时的源码（inv/s-node-library.md:251-257 G4）。**版本：** 身份 = `Bun.build` bundle 的内容哈希（leader 裁决，待 argon 确认）；GUI 的“v3”是该函数在库仓库里改动它的 commit 序号，只作显示（inv/s-node-library.md:261-267 G5）。**列出：** 参数、默认值、返回字段、体、运行环境由 Lab 后端从库仓库的 TS 导出（占位 P2），store 不存。**影响校验：** `GET /functions/{name}/usage` 按版本列出用到它的运行（含状态）与调用次数；Lab 后端再并上草稿里的引用（D6-12） | **选定：** 当前定义归 git，store 只管“哪个版本被正式用过、用在哪”这类值的事实。**朴素方案：** store 也存当前定义和名字映射。会成为第二个当前定义源（D2:48） | 串联 | 是：E-4（RC:241-246；BS:143-144） |
| D6-22 | **在 soroi omp 定制中的打包、安装与被 Pepgent 调用（U23）** | `Pepgent/soroi` 单仓：`packages/omp-soroi`（插件包）、`packages/store`（store 服务）与仓根 compose（D2:61）；compose 拉起 `pepgent-store` 与 Mux，store 镜像由同一仓库构建，与插件同版本 | soroi 定制里的 eval 插件只认一个配置项 `SOROI_STORE_URL`；store 服务是定制声明的伴随服务，单独 `docker compose up` 即可让定制脱离 Pepgent 走通 dry run、正式运行、复用、远程拷入拷出、时间轴、介入记录、运行事件与比较。Pepgent 侧由 Lab 后端以同一个 URL 读取、订阅、比较、检索，部署时由 `Pepgent/deploy` 的 Stack 拉起同一个镜像（D2:59） | **选定：** omp 定制本身只含 omp 侧内容，store 以伴随服务进入同一个发行单元，满足“能走通我说的所有流程”（U23）又不把常驻服务塞进 omp 进程。是否算进“完整的omp定制”交 argon（D2:184） | 意图 + 串联 | 是：U23 |

## 接口草图（主路径）

```ts
// ---- 身份与值 ----
type Hash = string & { readonly _: 'Hash' }        // sha256，对确定性编码取（占位 P1）
type RunId = string & { readonly _: 'RunId' }      // store 生成的 ULID
type Seq = number & { readonly _: 'Seq' }          // 运行内递增序号
type SessionId = string                            // 根 omp session
type AtomName = string
type FnName = string                               // 库内函数名
type Version = Hash                                // 节点 bundle 的内容哈希（D4）

type Scalar =
  | { kind: 'string'; v: string } | { kind: 'number'; v: number }
  | { kind: 'boolean'; v: boolean } | { kind: 'null' }
type Value = { kind: 'scalar'; scalar: Scalar } | { kind: 'file'; content: Hash; media: string; name: string }
type Body = 'Program' | 'Agent' | 'Human'
type Env = { kind: 'central' } | { kind: 'remote'; template: string; remoteRun: string }

// ---- 写入：eval 插件 → store，一步一次（D6-04、D6-05） ----
type CallOrigin =
  | { kind: 'Executed'; capture: CaptureRecord }                 // 本次运行产生的新捕获
  | { kind: 'Executed'; capture: CaptureRecord; transfer: TransferId } // 远程：同事务汇入暂存区里的批次
  | { kind: 'Adopted'; capture: Hash }                            // 身份命中中心副本
  | { kind: 'Human'; capture: CaptureRecord; replaced: Hash | null; handback: Handback }
type CaptureRecord = {
  identity: Hash; fn: FnName; version: Version; body: Body; env: Env
  inputs: Hash[]                                   // 按位置的输入值身份
  outputs: { field: string; value: Value }[]
  transcript: SessionId | null                     // Agent 捕获引用 omp transcript
}
type CallCommit = {
  position: number; fn: FnName; inputNames: AtomName[]
  outputNames: { field: string; name: AtomName }[]
  origin: CallOrigin
  startedAt: string; endedAt: string; aborted: { at: string } | null
}
type StepCommit = {
  run: { kind: 'open'; session: SessionId } | { kind: 'existing'; run: RunId }
  session: SessionId; code: string
  roots: { name: AtomName; value: Value }[]
  calls: CallCommit[]; stops: AtomName[]
}
type StepCommitted = { run: RunId; seq: Seq; runEnded: boolean }
// POST /runs/steps        body: StepCommit   → StepCommitted

// ---- 派生（D6-16）：eval 插件 → store ----
type Change =
  | { kind: 'ChangeInput'; position: number; value: Value; name: AtomName }
  | { kind: 'ChangeVersion'; fn: FnName; from: Version; to: Version }
type Derive = { parent: RunId; at: { step: Seq; position: number }; changes: Change[]; session: SessionId }
type Derived = { run: RunId; seq: Seq; parentAborted: boolean }
// POST /runs/derive       body: Derive → Derived   （继承名字与新根 atom 同一事务写入）
// POST /runs/{run}/abort  → { seq: Seq }

type Handback = { fields: { field: string; value: Value }[] } // 与交回工具同形（【暂定】RC:280）

// ---- 文件（D6-07） ----
type TransferId = string & { readonly _: 'TransferId' } // store 生成；暂存区只用于传输，不进中心副本
// GET    /objects/{sha256}                          → bytes（中心副本里的对象）
// PUT    /objects/{sha256}                          ← bytes（正式提交前上传的本机产出、人类上传）
// POST   /transfers                                 → { transfer: TransferId }
// PUT    /transfers/{t}/objects/{sha256}            ← bytes（尚不在中心副本里的输入、dry run 的节点 bundle）
// GET    /transfers/{t}/objects/{sha256}            → bytes（remote-step copy-in）
// PUT    /transfers/{t}/volume                      ← application/x-tar（remote-step copy-out）
// GET    /transfers/{t}/files/{path}                → bytes（dry run 取回产出）
// DELETE /transfers/{t}                             （dry run 返回时；正式运行由提交后 store 自行删除）
// GET    /volumes/{run}/{step}/{position}           → { files: { path: string; content: Hash; size: number }[] }
// GET    /volumes/{run}/{step}/{position}/files/{path} → bytes

// ---- 读取（D6-09、D6-10、D6-13、D6-08、D6-21） ----
type CallStatus = 'Ended' | 'Adopted' | 'Inherited' | 'Human' | 'Aborted'
type GraphNode =
  | { kind: 'Root'; name: AtomName; value: Value }
  | { kind: 'Call'; step: Seq; position: number; fn: FnName; version: Version; body: Body; env: Env
      status: CallStatus; startedAt: string; endedAt: string
      outputs: { field: string; name: AtomName; value: Value }[]; transcript: SessionId | null }
type GraphEdge = { from: AtomName; to: { step: Seq; position: number; input: number } }
type RunGraph = {
  run: RunId; session: SessionId; derivedFrom: { run: RunId; changes: Change[] } | null
  state: 'Open' | 'Ended' | 'Aborted'; at: Seq
  nodes: GraphNode[]; edges: GraphEdge[]; unconsumed: AtomName[]
}
// GET /runs?state=Open|Ended|Aborted               → { run: RunId; session: SessionId; state; startedAt; endedAt }[]
// GET /runs/{run}/graph?at={seq}                   → RunGraph
// GET /runs/{run}/state                            → { unconsumed: { name; value; origin: string }[] }  （未消费提醒用）
// GET /captures/{identity}                         → CaptureRecord | 404   （复用查找）
// GET /compare?a={run}&b={run}                     → RunComparison
// GET /search?q={text}                             → { run: RunId; hits: { kind: 'value'|'name'|'code'|'fn'; text: string }[] }[]
// GET /values/{hash}/runs                          → { run: RunId; names: AtomName[] }[]
// GET /functions/{name}/usage                      → { version: Version; runs: { run: RunId; state; calls: number }[] }[]
type Pair =
  | { kind: 'SameCapture'; a: GraphNode; b: GraphNode }
  | { kind: 'Changed'; a: GraphNode; b: GraphNode; fields: { field: string; a: Value; b: Value }[] }
  | { kind: 'OnlyA'; a: GraphNode } | { kind: 'OnlyB'; b: GraphNode }
type RunComparison = { a: RunId; b: RunId; pairs: Pair[] }

// ---- 推送（SSE） ----
type RunEvent =
  | { kind: 'run_started' | 'run_ended' | 'run_aborted'; seq: Seq; at: string }
  | { kind: 'step_committed'; seq: Seq; at: string; step: { session: SessionId; code: string } }
  | { kind: 'call_started' | 'call_ended' | 'call_adopted' | 'call_inherited' | 'call_aborted' | 'human_handback'
      seq: Seq; at: string; call: GraphNode }
  | { kind: 'atom_stopped'; seq: Seq; at: string; name: AtomName }
// GET /runs/{run}/stream?after={seq}   → SSE，data: RunEvent
// GET /stream/lifecycle?after={cursor} → SSE，data: { run: RunId; session: SessionId; derivedFrom: RunId | null; event: 'run_started'|'run_ended'|'run_aborted'; at: string; cursor: string }
```

## 主路径时序

正式运行一步：一个本机 `Program` 调用、一个远程 `Agent` 调用，提交后推送并触发自动化。

```mermaid
sequenceDiagram
  participant AI as 主 agent（中心 omp）
  participant EV as omp-soroi-eval
  participant ST as store 服务
  participant RM as remote CLI
  participant JOB as remote 作业
  participant LAB as Lab 后端
  AI->>EV: soroi_eval（正式运行）
  EV->>ST: GET /runs/{run}/state、GET /captures/{id}
  ST-->>EV: 未消费 atom；身份未命中
  EV->>EV: 本机 Program 调用运行
  EV->>ST: POST /transfers → t；PUT /transfers/{t}/objects/{hash}（尚不在中心副本的字节）
  EV->>RM: run（inputs = GET /objects/… 或 /transfers/{t}/objects/…，output = PUT /transfers/{t}/volume）
  RM->>JOB: 部署 copy-in → body → copy-out
  JOB->>ST: GET /objects/{hash}、GET /transfers/{t}/objects/{hash}
  JOB->>ST: PUT /transfers/{t}/volume（tar）
  ST->>ST: 解包进暂存区 t（不进中心副本）
  EV->>RM: status → ended
  EV->>ST: POST /runs/steps（StepCommit，含 transfer 引用）
  ST->>ST: 一个事务：写步、调用、捕获、名字、停止、事件；暂存区文件移入对象目录并记清单；read_parquet 汇入批次；未消费为空则写 run_ended；提交后删暂存区
  ST-->>EV: StepCommitted{seq, runEnded}
  EV-->>AI: 结果与新的未消费 atom
  ST-->>LAB: /runs/{run}/stream：新事件
  ST-->>LAB: /stream/lifecycle：run_ended
  LAB->>LAB: 自动化规则命中，经 Mux 启动复盘会话
```

在途改值与派生运行：

```mermaid
sequenceDiagram
  participant GUI as 前端
  participant LAB as Lab 后端
  participant MUX as Mux
  participant EV as omp-soroi-eval
  participant ST as store 服务
  GUI->>LAB: 介入：替代在途调用 C，交回值
  LAB->>MUX: 控制请求 → 持有该运行的 eval 插件
  MUX->>EV: Replace{call C, handback}
  EV->>EV: 中止 C（本机结束进程 / remote abort / 中止 agent 当前轮），等结论
  EV->>EV: 交回值绑定到 C 原本的产出名，同一步的下游调用继续
  EV->>ST: POST /runs/steps（C 的来历 = Human{replaced}）
  ST-->>LAB: stream：call_aborted、human_handback、step_committed
  EV-->>MUX: 结论
  MUX-->>LAB: 结论
  Note over EV: eval 工具结果与提醒标明“由人类接入替代”
  GUI->>LAB: 派生：在 C 处改参数 temp
  LAB->>MUX: Derive{parent P, at C, ChangeInput}
  MUX->>EV: Derive
  EV->>EV: 中止 P 的在途调用
  EV->>ST: POST /runs/derive
  ST->>ST: 一个事务：P 写 run_aborted；开 R'，继承 C 上游名字，绑定新根 atom
  EV->>ST: POST /runs/steps（R' 第一步：重新调用 C）
  EV->>EV: 唤醒主 agent（占位 P3），提醒标明派生来源
```

## 占位（先假定能工作）

| 占位 | 假定 |
| --- | --- |
| P1 确定性编码 | 有一种确定性编码可以对结构化值稳定取哈希（`design/store.md:106`） |
| P2 节点签名导出 | Lab 后端能从库仓库的 TS 节点文件导出参数、默认值、返回字段、体与环境 |
| P3 唤醒根会话 | eval 插件能向空闲的根会话注入一条消息，开始新的一轮（派生后通知 AI） |
| P4 网络地址 | 远程作业能经独立网络层访问 store 服务的 URL（D2:43） |
| P5 远程批次格式 | 远程 `Agent` 写的 `soroi-batch/` 位于 `REMOTE_MOUNT` 下，是与中心分区表同 schema 的 Parquet（D4 起草者的提案）；运行中读方经 Mux 拉取这个目录的文件（D3-13） |
| P6 控制端点 | eval 插件经 Mux 打开 `WS /endpoints/eval:<根 session id>`，Lab 后端 `POST /endpoints/{name}/requests` 送来在途叠加层查询、替代与派生请求，Mux 转回结论（D3-19；D2:168） |
| P7 合并整理 | store 服务定期对 DuckLake 执行内联数据落盘、小文件合并、快照过期；时间轴不依赖快照 |
| P8 认证 | store 服务只接受中心主机内与网络层内的调用方；与 Lab 后端之间的认证留给后续决策表 |

## 通过后要改的设计文档

| 文档与章节 | 改动 |
| --- | --- |
| `design/store.md` 开头与“谁往里写” | “soroi 服务”改称 store 服务，写明它是 `Pepgent/soroi` 单仓 `packages/store` 中随 soroi 定制同版本发布的独立进程、中心副本唯一写方（D6-01）；eval 插件经它提交（D6-04） |
| `design/store.md`“存什么” | 拆出“调用”记录与 `来历` 四种变体；步记写它的 session id；运行记派生自哪次运行与改动列表（含函数版本）；事件类型按 D6-20 收敛（D6-03、D6-16、D6-20） |
| `design/store.md`“身份” | 节点函数版本改为 `Bun.build` bundle 的内容哈希（leader 裁决，待 argon 确认）；`Human` 身份一行保留，注明经投票确认（D6-18） |
| `design/store.md`“落盘” | 目录库定为 SQLite，对象目录为本地文件系统，写明不起 S3 服务的理由（D6-02） |
| `design/store.md`“远程 agent 运行中” | 传输暂存区（dry run 与正式运行共用，不进中心副本）、copy-in/copy-out 的 URL、volume 清单、批次在步提交的同一事务里汇入（D6-07） |
| `design/store.md` 新增“运行的生命周期” | 开始、结束、中止锚点与嵌套关系（D6-05），生命周期事件流（D6-06） |
| `design/store.md`“读取、订阅与检索” | 图投影与时点回看、订阅游标、在途叠加层的来源、比较对齐、检索改为 SQL 文本匹配并删去 FTS 派生表（D6-08 至 D6-13） |
| `design/store.md`“验证结果” | 删去全文检索一行的结论依赖，改记 `fts` 默认 `ignore` 剥除中文的观察 |
| `design/intervention.md`“改值” | 写明只针对在途调用、中止路径、交回绑定原产出名、AI 如何得知（D6-14、D6-15） |
| `design/intervention.md`“改函数体或参数” | 写明派生只重新调用被改的那一个调用，下游由 AI 继续，不重放（D6-16） |
| `design/intervention.md`“接管 agent”与“写进 store 的东西” | IRC 接管不进 store，只经 transcript 引用关联（D6-19）；主动 `human` 节点与被动介入共用一种交回（D6-17） |
| `design/layers.md`“GUI 读取”“记录”“预定义函数库”“运行事件” | 草稿归 Lab 业务对象（D6-12）；比较的对齐方式链接到 store；节点库链接到 D2-12 与 store 的使用查询（D6-21）；运行事件节补上指向 store 生命周期流的设计链接（D6-06） |
| `design/eval.md`“节点函数”“存储”“接口” | 版本定义随 D4；正式运行经 store 服务一次提交；store 接口表改列 HTTP 读写；删去任何 `fork` 批次记录的表述（U24） |
| `design/soroi.md`“组成” | store 服务注明为 soroi 定制的伴随服务、外部独立进程（D6-22） |
