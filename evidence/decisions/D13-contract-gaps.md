# D13 实现期跨组件契约缺口（批次）

起草：leader 分身 GapClone（Claude 族，依据 (U) U21“对于领导的处理，我推荐你分身”）。
规则依据：D10-08（契约或范围的空白交领导小组表决，工程师只暂停依赖该空白的部分）；D1-12/16/17；`pepgent-soroi/.claude/rules/design-assumes-it-works.md`（只写主路径，不确定处写占位）。
Argon 基线：`pepgent-pm/evidence/argon/D13-intent.md`。讨论者：discuss:steady（D13Steady）、discuss:divergent（D13Divergent），采纳与不采纳见文末。
路径行号按 2026-11-01 各仓 `origin/main` 工作树。
结果：D13-01 至 D13-05 全部通过（三族各五票赞成，argon 未行使否决）。选票原文：`evidence/votes/D13-leader.md`、`D13-argon.md`、`D13-mentor.md`。

## 条目来源

| 条目 | 来源 BLOCKED | 切片 owner |
| --- | --- | --- |
| D13-01..03、D13-05 | [soroi#215 评论 6554899875](https://github.com/Pepgent/soroi/issues/215#issuecomment-6554899875)（SOR-07） | pepgent-eng-plugin |
| D13-04 | [Pepgent#22 评论 6554974055](https://github.com/Pepgent/Pepgent/issues/22#issuecomment-6554974055)（LAB-11a） | pepgent-eng-lab3 |

## 现状（证据）

**中心环境身份（D13-01..03、D13-05）**

- (D) D4-18（`pepgent-pm/evidence/decisions/D4-remote-exec.md:64`）：中心环境身份 = “中心 agent 运行容器（D2-20）的镜像 digest + 它的运行配置的哈希，由部署注入给这个容器”；类型 `EnvIdentity`（D4:80-83）。注入接口（字段名、编码、谁算、算什么）未写；`design/eval.md:93` 同义复述。D4-02（D4:48）：捕获身份 = 版本 + 输入身份 + 运行环境，Agent 体另加定制身份。D4-04（D4:50）：中心和远程走同一条执行路径，入参、`result.json`、回收方式完全相同。D4-10（D4:56）：`RunRequest.env` 只放调用数据与连接参数。
- (R) 插件 `packages/omp-soroi/src/eval/execute.ts:18-19,97-98` 用字面 `CENTRAL_ENV = "central"`；捕获 ID 把这个名字串放进公式（`execute.ts:183-185`、`src/eval/hash.ts:14-15`）。`src/eval/templates.ts:3-18` 已调用 `remote templates`，但 schema 只解析 `name`，丢弃 `identity`。
- (R) 本机 Program 的 runner 继承中心进程的全部环境：`execute.ts:258-259` 以 `env: { ...process.env, BUN_BE_BUN: "1" }` 启动；中心容器 env 含 `BETTER_AUTH_SECRET`、`MUX_AUTH_TOKEN`、gateway token（deploy `compose.yaml:91-101`）。
- (R) 插件的 soroi 运行配置只在 Main 角色启动时读取：`src/index.ts:18-30` 读 `SOROI_STORE_URL` 构造 `StoreClient`，`src/eval/store.ts:70-73` 校验必填。
- (R) 中心 agent 容器的部署声明：`Pepgent/deploy` `stacks/pepgent-central/compose.yaml:79-151` 的 `lab-web`（镜像 `${LAB_WEB_IMAGE}`，由 `komodo/syncs/central.toml:23-27` 声明为 tag；`state-init`、`auth-seed`、`release.compose.yaml` 的 `release-init` 也用同一变量）；`Pepgent/soroi` `compose.yaml:45-83` 的 `central`（`${CENTRAL_IMAGE:-…:latest}`）。两处都没有已解析的 digest 或配置哈希。
- (R) `scripts/central.py:97-110` 已有写 Komodo Variable 的路径，`:197-202` 用它注入非秘密 Variable（如 `PEPGENT_CENTRAL_RELEASE_TAR`）；`apply`（`:267-307`）是 RunSync → StopStack → DeployStack，没有 registry 查询。ResourceSync `include_variables = false`（`:238-241`）。
- (R) 中心容器启动时执行入口脚本，再由它加载 omp 执行配置：deploy `lab-entrypoint.sh`（挂在 `/run/config/lab-entrypoint.sh`，`compose.yaml:83,131-133`）把 `/run/config/models.yml`、`/run/config/config.yml` 拷进 `$HOME/.omp/agent/` 并安装发行 tar（`lab-entrypoint.sh:7-8,13-17`）；standalone 的 `central-entrypoint.sh`（`compose.yaml:51,66-68,84-86`）、`startup.yml`、`models.yml`、`config.yml`（`:69-74,87-92`），模型由 `command`（`:52`）给出。根 omp 的 argv 由 Lab 代码拼出（`Pepgent/Pepgent` `apps/web/src/server/lab/runtime.ts:36`、`sessions.ts:81`），随镜像内容一起由镜像 digest 覆盖。
- (R) 两个中心 agent 容器声明都没有 `working_dir`、`user`、`platform`、能力或安全选项（deploy `compose.yaml:79-151`、standalone `compose.yaml:45-83`）；挂载只有数据卷、发行 tar、配置文件与只读 Slurm 运行目录。
- (R) remote 模板身份：`pepgent-remote/src/model.rs:139-163,215-218` 的 `ContentDigest` 串行化为 `sha256:<64 位小写 hex>`；`src/identity.rs:38-50` 以字段有序的 JSON 投影取 sha256；Komodo 后端丢弃 secret Variable 的值（`src/backend/komodo/identity.rs:1-2`）。
- (R) store：`packages/store/src/contract.ts:3` 的 `HashSchema` 是不带前缀的 64 位 hex；`:22-25` 的 `EnvSchema` 只存 `{kind:"central"}` 或 `{kind:"remote",template,remoteRun}`，即 D4-18 第 4 点的友好名与溯源。
- (R) 环境变量的传播：Lab 后端把容器 env 交给根 omp（`runtime.ts:39`、`mux-writer.ts:165`）；e2e standin 透传（`e2e/standin/lab-standin.ts:54`）；本机 LocalChild 继承 `process.env`（`packages/omp-soroi/src/subagent/main/supervisor.ts:605-613`）；远程体只拿 `RunRequest.env`（D4-10）。

**停驻会话的 transcript 引用（D13-04）**

- (D) D7-07（`D7-lab-backend.md:67`）：会话已停驻时，“读 `get_state.sessionFile` 指向的 jsonl，不唤醒（D3-11；占位 P2）”；P2（D7:281）。D3-11（`D3-network-mux.md:65`）：已停驻或已死的 agent 读 transcript，不唤醒。D7:55：omp RPC 的 `get_state` 返回 `sessionId`、`sessionFile`。
- (R) `Pepgent/Pepgent` `apps/web/src/server/lab/schema.ts:35-70` 与 `resources/lab/migrations/0000_lab.sql:170-202` 的 `conversation` 只有 `agent_id`、`session_id`、`worktree`，没有 `sessionFile`。
- (R) `get_state` 已在 Lab 的 RPC 路径上：`mux-writer.ts:18-21` 的 `SessionCommand` 含 `get_state`，`:180-187` 发送并解析回复；`ConversationWriter.ensureLive()` 每开一代都调用它（`sessions.ts:77-91`，调用在 `:83-84`），但解析 schema 把 `sessionFile` 标为可选（`sessions.ts:27`）。已有会话开新一代时由 `onIdentity` 回调更新 `sessionId`（`:222-224`）；新会话的回调发生在行插入之前，`sessionId` 靠 `open()` 的插入写入（`:251-253`）。
- (R) 2026-11-01 部署中唯一的 Lab 库（OrbStack 卷 `pepgent-central-lab-db` 下的 `lab.sqlite`，只读查询 `SELECT count(*) FROM conversation`）：0 行；本机没有其他 Lab 库卷。LAB-04（[Pepgent#13](https://github.com/Pepgent/Pepgent/issues/13)）仍 OPEN。
- (R) Lab 与根 omp 在同一容器（D2-20），会话目录在 omp-sessions 卷上（deploy `compose.yaml:106`），Lab 用 `--session-dir <sessionHome>/<conversation.id>` 启动根 omp（`sessions.ts:79-82`）。工程师未找到 omp 的无唤醒路径解析接口（Pepgent#22 评论）。

## 决策项

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D13-01 | **中心环境身份的注入接口** | 中心 agent 容器的环境变量；插件 Main 角色启动配置（`src/index.ts` 与 `SOROI_STORE_URL` 同处）；eval 的 central 分支 | 部署给中心 agent 容器注入两个环境变量：`SOROI_CENTRAL_IMAGE_DIGEST` = 该容器所运行镜像的 registry manifest digest；`SOROI_CENTRAL_CONFIG_DIGEST` = 该容器运行配置的内容哈希（规则见 D13-02）。两者都按 remote `ContentDigest` 的写法：`sha256:<64 位小写 hex>`。插件在 **Main 角色** 启动时与 `SOROI_STORE_URL` 一起解析这两个必填值，构造一次 `EnvIdentity{kind:"central",image,config}`，显式传给 eval；central 分支只消费这个已解析的身份，不在调用路径上读 `process.env`。插件内用独立的 digest 类型表示它们，不复用 store 不带前缀的 `HashSchema`。LocalChild、RemoteChild 不读取、不要求这两个值。字面 `central` 只留作 `Site` 与 store 记录里的显示值（`EnvSchema` 不变，store 无需改动）。这两个值沿现有 env 传播链到达根 omp（Lab 后端、e2e standin 已透传，无需改动） | **得到：** 落实 D4-18 已定的“由部署注入”，插件只消费、不推导；中心与远程两种 `EnvIdentity` 用同一编码；Main 启动时一次解析。**放弃：** 部署多维护两个变量。**备选落选：** ① 部署只注入 image、config 由插件在容器内按自己看到的 env 与文件计算——容器 env 混着 `BETTER_AUTH_SECRET`、`MUX_AUTH_TOKEN`、gateway token（deploy `compose.yaml:91-101`），插件分不出凭据，凭据一轮换身份就变；② 让 remote 新增“任意 Stack 的身份”操作、复用其 Komodo 算法算中心 Stack——要扩大 remote（D2-09）的职责，算法对整个 Stack 取投影（store、mux、auth-seed 一改中心身份就变）且只看 `body` 服务（`identity.rs:357`），standalone `central` 不走 Komodo 仍要第二套；登记成 remote 模板则违背 D4-17（目录只收可运行模板）与 D4-04；③ 插件自查 Docker 或读镜像 tag——要挂 Docker socket，tag 可变，不是不可变身份；④ 挂身份文件代替 env——仍要一个路径 env，且不能沿现有 env 链自动传到根 omp | 串联 | 补 |
| D13-02 | **中心身份值由谁、按什么规则产生** | `Pepgent/deploy`：`scripts/central.py apply`、`komodo/syncs/central.toml`、`stacks/pepgent-central/compose.yaml` 的 `lab-web`；`Pepgent/soroi`：`compose.yaml` 的 `central` 与启动它的 e2e 入口；其他直接启动中心 Main 的入口 | **image：** 入口取得本次实际运行镜像的 digest 引用 `<repo>@<digest>`，容器以它运行，同一 digest 注入 `SOROI_CENTRAL_IMAGE_DIGEST`；运行的镜像与注入的身份出自同一个值。deploy 每次部署时把声明里的 tag 解析成 registry manifest digest（声明仍写 tag，不在声明里钉版本）；e2e 入口消费本次构建记录里的 digest。<br>**config：** `SOROI_CENTRAL_CONFIG_DIGEST = "sha256:" + hex(sha256(UTF-8 JSON 文本 ["soroi-central-config-v1", entrypoint, command, files]))`：`entrypoint`、`command` 是该容器声明的 argv（字符串数组，插值后）；`files` 是 `[容器内路径, "sha256:<该文件字节的 SHA-256，64 位小写 hex>"]` 二元组的数组，按路径的 UTF-8 字节序排列，收该容器的入口脚本与中心 omp 加载的启动、模型、设置文件——deploy `lab-web`：`/run/config/lab-entrypoint.sh`、`/run/config/models.yml`、`/run/config/config.yml`；standalone `central`：`/run/config/central-entrypoint.sh`、`/run/config/startup.yml`、`/run/config/models.yml`、`/run/config/config.yml`。JSON 文本不含任何空白；字符串内只转义 `"` 为 `\"`、`\` 为 `\\`、U+0000–U+001F 中的 `\b` `\f` `\n` `\r` `\t` 用这五个短写、其余控制字符用小写 `\u00XX`，其他字符（含 `/` 与全部非 ASCII）原样以 UTF-8 输出——即 ECMAScript `JSON.stringify` 对字符串数组的输出。容器环境变量、凭据、挂载的数据卷、发行 tar 不进投影：中心节点 runner 的可见环境由 D13-05 收窄为插件内固定、不随部署变化的集合；发行 tar 按现行 D4-02、D4-18 不进入 Program 身份，本条不单侧修订该公式，Agent 体的定制身份另按 D4-18 第 3 点计入。<br>**生产方：** ① `Pepgent/deploy`（eng-ops）：`central.toml` 的镜像改为引用普通 Komodo Variable；`central.py apply` 在 RunSync/DeployStack 之前解析 `LAB_WEB_IMAGE` 的 digest，写入该 Variable（`<repo>@<digest>`，使用这个变量的四个服务一起改为 digest 运行）与两个身份 Variable，`lab-web.environment` 引用两个身份 Variable；沿用 `central.py:97-110` 的 Variable 写入路径。② `Pepgent/soroi` `compose.yaml` 的 `central`（eng-e2e）：两个变量以必填插值声明，由统一 e2e 入口按同一规则提供。③ 直接以 `docker run` 或在宿主机上启动中心 Main 的入口（A0 campaign、DIST-01/CUS-04 的启动脚本、Lab 后端与插件的宿主机开发驱动）同样提供两值，由各入口的 owner 按其实际运行环境给出（占位：假定可得） | **得到：** 两个生产方的 config 规则相同、可审计，不靠各自猜字段；只投影真正改变中心执行的东西，加一个 remote 模板、改登录 origin、改端口不会让中心捕获失效；部署入口是这一对派生值的唯一生产者与注入者（镜像与配置的源头仍是 registry 与部署声明）。**放弃：** 每次发 Pepgent web 镜像，中心捕获都不再复用（D4-18 取舍栏“中心主机升级运行容器也一样”已接受）。**备选落选：** 投影全部非凭据 env、全部挂载与属性（宽投影）——把 `remote.toml`、`slurm.toml`、`BETTER_AUTH_URL`、`PORT` 等算进去，与执行无关的改动会让全部中心捕获失效，D4-18 对远程也只取“影响执行的配置”；节点读进程 env 带来的错误复用改由 D13-05 收窄可见环境消除；把已安装发行的内容哈希并入 config——等于只在中心一侧修订 D4-02 的 Program 身份公式，远程不随之变化，两侧不一致（runner 不进 Program 身份的问题见文末“登记但未列条目的缺口”）；投影字段留给部署方私有实现（初稿）——两个生产方会各算一套 | 串联 | 补 |
| D13-03 | **SOR-07 一次切换捕获身份公式** | SOR-07 所属插件仓的 eval 模块（迁仓前为 `Pepgent/soroi` `packages/omp-soroi`，D10-01B）；store 已有捕获 | SOR-07 在一个 PR 内同时接入中心身份（D13-01）与远程身份（`remote templates` 解析为 `模板名 → identity` 的映射），两者以确定性结构（`kind`、`image`、`config` 都参与）进入捕获公式；该编码只由插件生成和消费，store 只把结果当不透明的 64 位 hex 键。切换前写入的捕获因身份不同不再被复用，不迁移、不保留旧公式 | **得到：** 不存在“中心已带身份、远程仍是名字”的中间公式。**放弃：** 开发期 store 里已有的捕获不再命中复用（开发数据；D4-18 本就要求环境变化不复用）。**备选落选：** 分两次切换（每次都让全部旧捕获失效一次，中间态公式不在任何已通过设计里） | 实现 | 否 |
| D13-04 | **停驻会话 transcript 的持久引用** | `Pepgent/Pepgent` Lab 表 `conversation`（`apps/web/src/server/lab/schema.ts`、`resources/lab/migrations/`）；`ConversationWriter.ensureLive()`、`onIdentity` 回调与 `open()` 插入（`sessions.ts:77-91,222-224,251-253`）；LAB-11a 的讨论读取 | `conversation` 新增列 `session_file`：该会话当前这一代 omp 的 `get_state` 原样返回的 `sessionFile`。`get_state` 的解析把 `sessionFile` 改为必填。`ensureLive()` 复用它已有的那一次 `get_state` 响应，得到 `{sessionId, sessionFile}`：新会话在 `open()` 插入行时一起写入两列；已有会话每开一代，由 `onIdentity` 在同一次更新里覆盖两列。`session_file` 是指向 omp 所拥有 transcript 的外部引用（从源头取回的副本，只代表取回那一刻，每代刷新），不是 transcript 副本，transcript 的权威仍是 omp；Lab 与根 omp 在同一容器、同一会话卷上，所以这个路径 Lab 可直接读。会话停驻时，LAB-11a 按 omp 会话文件格式读这一列指向的 jsonl（D7-07、P2），不唤醒、不扫描目录、不按文件名推断路径；会话在线时按 D7-07 走 Mux 读方 `get_messages`。迁移时已有的 `conversation` 行数为零（(R) 2026-11-01 部署中唯一的 Lab 库 `pepgent-central-lab-db/lab.sqlite`：`conversation` 0 行），所以从迁移起 `session_id` 非空的行 `session_file` 都非空，无需回填 | **得到：** 落实 D7-07“读 `get_state.sessionFile` 指向的 jsonl”，引用随 `lab.sqlite` 跨 Lab 重启保留；路径由 omp 自己给出，Lab 不推导；不新增 RPC 请求。**放弃：** `conversation` 多一列与一次迁移。**备选落选：** ① 进程内缓存——Lab 重启后停驻会话就读不到；② 唤醒会话再 `get_state`——违背 D3-11、D7-07 的“不唤醒”；③ 按 HOME 下 omp 会话目录与 sessionId 推算或扫描文件名——由 Lab 推导 omp 的私有布局；④ 要 omp 新增无唤醒的路径解析接口——U13 不改 omp 宿主代码，现有 RPC 已在 `get_state` 给出路径；⑤ Lab 自定文件路径、以 `--session <file>` 启动（divergent 提出，插件 `supervisor.ts:173,300-301,570` 的做法）——Lab 要先按 omp 的会话文件格式写会话头，或依赖未核实的“omp 自建不存在的会话文件”行为，并改动根会话的启动与恢复参数；当前 `get_state` 已给出路径，读这个公开字段比让 Lab 写 omp 文件格式更小 | 串联 | 补 |
| D13-05 | **中心节点 runner 的可见环境** | 插件 eval 的 `runNode`（`execute.ts:252-264`），它承担每个调用的元数据与默认 env 描述（`execute.ts:92-98`）、本机 Program 执行（`:199-203`）与 Agent 体的 prompt 渲染（`runner.ts:41-45`） | 中心节点 runner 不再继承中心进程的环境，只得到插件内固定的集合：`PATH` = 插件代码里的常量 `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`，`BUN_BE_BUN=1`；不传 `HOME`。适用于元数据描述、本机 Program 执行与 Agent prompt 渲染；随后由 supervisor 经 LocalChild 启动的本机 Agent 进程不受本条影响。PATH 下能找到的系统工具来自镜像，已由 `SOROI_CENTRAL_IMAGE_DIGEST` 覆盖。节点需要的外部值一律经函数参数（atom）传入；需要凭据的 Program 节点放到远程模板上运行，凭据由模板部署注入（D4-10），中心不给节点进程任何凭据。插件开发说明写入这条节点契约。远程 Program 的环境仍由模板部署与 `RunRequest.env` 给出（D4-10），入参与回收方式不变（D4-04） | **得到：** 进程环境不再是捕获身份之外的执行输入，中心身份只需 D13-02 的窄投影即可正确；凭据不再经 runner 环境传给节点进程（同一容器、同一用户，这不是沙箱，`packages/omp-soroi/README.md:117-121`）。**放弃：** 节点代码不能在中心读部署方的环境变量，也拿不到 `HOME`。**备选落选：** ① 继续继承全部环境并把非凭据 env 全部投影进中心身份——改端口、改登录 origin 也让全部中心捕获失效；② 传 Main 进程的 `PATH`、`HOME` 并把两值加入 D13-02 投影——两值由镜像 ENV、compose 声明与入口脚本共同决定，生产方要在部署时预先算出容器内的生效值；③ 节点在定义里声明要用的环境变量并计入身份——等于在 atom 之外另开输入通道（D4-06），非秘密值本可作为 atom 传入，秘密又不能进身份 | 技术 | 补 |

## 对工程派发的影响

| owner | 动作 |
| --- | --- |
| pepgent-eng-plugin | SOR-07 按 D13-01、D13-03、D13-05 实现；本仓检查以设置这两个变量的本机 Main 进程观察捕获身份随变量改变（协议桩观察）、runner 环境只含固定集合；插件开发说明补上两变量与 D13-05 的节点契约 |
| pepgent-eng-ops | deploy 按 D13-02 ① 改 `central.toml`、`central.py apply`、`lab-web.environment` |
| pepgent-eng-e2e | `compose.yaml` 的 `central` 声明两变量；统一 e2e 入口、A0 campaign、DIST-01/CUS-04 启动脚本按 D13-02 提供两值 |
| pepgent-eng-lab3 | LAB-11a 按 D13-04 加列、迁移、`get_state` 必填与两处写入；宿主机开发驱动按 D13-02 ③ 提供两值 |
| pepgent-eng-store | 无（`EnvSchema` 与 store 契约不变） |

## 讨论意见的采纳

| 来源 | 意见 | 处理 |
| --- | --- | --- |
| steady | 变量名与 `sha256:` 编码保留；改为 Main 启动时一次解析并传入 eval；插件用独立 digest 类型，不与 store `HashSchema` 混用 | 采纳，写入 D13-01 |
| steady | 投影规则不能留给部署方私有实现，须定版本标签、字段与规范编码 | 采纳，写入 D13-02 |
| steady | deploy 现有流程没有 digest 解析接点，须写明经普通 Komodo Variable 在 DeployStack 前写入 | 采纳，写入 D13-02 ① |
| steady | “部署是唯一权威”改为“派生身份对的唯一生产者与注入者” | 采纳 |
| steady | 宽投影：全部非凭据 env（凭据只留名字与标记）、全部挂载类型与只读属性、init、user 等 | 不采纳宽投影；它指出的错误复用（runner 继承全部 env，节点可读非凭据 env）属实，改由 D13-05 收窄 runner 可见环境消除 |
| steady | 投影漏掉入口脚本内容 | 采纳，入口脚本加入 `files`（divergent 同样提出） |
| steady | 排除发行 tar 会让中心 Program 在 runner 升级后复用旧捕获 | 不在 D13-02 单侧处理：只在中心把发行并入环境身份会让两侧公式不一致。steady 第三轮确认这是 D4-02 本身的缺口（两侧同时升级 runner 都会错误复用），登记在文末 |
| steady | D13-05 作用域应是全部中心节点 runner 操作（元数据、Program、Agent prompt）；PATH、HOME 并未被 D13-02 覆盖；安全收益不能写成节点整体看不到凭据 | 采纳：D13-05 改为中心节点 runner、PATH 改为插件内常量、不传 HOME、收益措辞改为“不经 runner 环境传递” |
| steady | image 来源统一为“入口取得本次实际运行镜像的 digest 引用”，deploy 解析 tag、e2e 消费构建记录 | 采纳 |
| steady | D13-03 补插件侧切换边界与确定性编码，不绑定仓名 | 采纳 |
| steady | D13-04 复用 `ensureLive()` 已有的 `get_state`；新会话插入与已有会话更新两条写入路径分开写；`sessionFile` 改必填；迁移主路径（已有行无回填来源） | 采纳两条写入路径与必填解析；迁移主路径以实测事实定：部署中唯一 Lab 库 `conversation` 为 0 行，无需回填 |
| mentor | D13-02 规范编码未唯一定义（`/` 是否转义、内层摘要写法）；字段集合是否漏 `working_dir`、`user` 等 | 采纳：逐字符定义转义与内层摘要写法；核实两个容器声明没有这些字段，写入现状 |
| mentor | D13-04 本变更前已停驻的会话迁移后读不到 transcript | 采纳为事实核查：部署中唯一 Lab 库 `conversation` 0 行，反例不落在实际数据上；条目去掉“列可空、不回填”的放弃项 |
| mentor | D13-02 分类应为技术（兼串联） | 保留“串联”：分类争议只在意图与技术之间才影响否决范围（D1-17），本条不涉意图 |
| divergent | env 通道胜出的依据是现有传播链；“必填”只限 Main；store 契约不变 | 采纳，写入 D13-01 |
| divergent | 落选理由换成“插件分不出凭据”和“复用 remote 算法的代价” | 采纳 |
| divergent | 投影按“影响执行”正面列举：入口、命令、omp 的 models/config 文件 | 采纳，写入 D13-02 |
| divergent | `LAB_WEB_IMAGE` 被四个服务共用，解析后一起用 digest；声明仍写 tag，避免“钉版本”误读 | 采纳 |
| divergent | 漏掉的生产方：A0 campaign、DIST-01/CUS-04 启动脚本、宿主机开发驱动 | 采纳，写入 D13-02 ③ 与派发表 |
| divergent | D13-03 多余，可并入 D13-01 | 不采纳：argon 已对其单独表决；保留为实现条目，明确插件侧编码与不迁移 |
| divergent | D13-04 每代覆盖写入；写明 Lab 与根 omp 同容器、同会话卷所以路径可读 | 采纳 |
| divergent | D13-04 改由 Lab 自定会话文件路径（`--session <file>`），不加列 | 不采纳，理由写入 D13-04 落选⑤ |
| divergent | `models.yml` 若含明文凭据，凭据轮换会改变中心身份 | 落地时由 eng-ops 确认；按凭据规则，模型凭据经 gateway token 注入（D8-06），不写进 `models.yml` |
| divergent | D13-05 删去“凭据不再暴露给节点代码”的安全表述；给节点作者写明需要凭据的节点放远程模板 | 采纳 |
| divergent | 相邻缺口：中心 Agent 体定制身份所需的 release 内容哈希从哪里取 | 未列为条目：远程 Agent 拷入定制 tar 本就要按版本读 store 的 `ReleaseRecord`（D4-09、D6-22、D10-13），中心可用同一记录；插件如何知道自己安装的发行版本属于插件仓私有实现。[INFERENCE] 未逐文件核实安装器是否保留 manifest；若 eng-plugin 实现时发现契约空白，按 D10-08 另报 |

## 登记但未列条目的缺口

| 缺口 | 来源 | 为何本批不列条目 |
| --- | --- | --- |
| Program 捕获身份不含 runner：D4-02 定版本 = 节点 bundle 哈希（D4:48），D4-04/05 定实际执行单元是 runner bundle + 节点 bundle、runner 是按内容寻址的发行对象（D4:50-51），D4-18 只给 Agent 体加定制身份（D4:64）。中心与远程同时把 runner 从 R1 升到 R2 时，节点 bundle、输入与环境身份都不变，若 runner 行为改变，两侧都会复用旧捕获 | steady 第三轮 | 不阻塞任何在建切片（SOR-07 按现行公式实现即可），修订需要改已通过的 D4-02/D4-18 并同时动中心与远程两条路径；交 leader 决定是否另开决策项 |

## 计票

| ID | Claude 族 | argon | 导师 | 结果 |
| --- | --- | --- | --- | --- |
| D13-01 | 赞成 | 赞成（【暂定 · 与 (U) 无冲突】，未否决） | 赞成 | 通过 |
| D13-02 | 赞成 | 赞成（【暂定 · 与 (U) 无冲突】，未否决） | 赞成（第一轮反对，反例为编码不唯一与字段集合未核实；按反例修订后重投赞成） | 通过 |
| D13-03 | 赞成 | 赞成 | 赞成 | 通过 |
| D13-04 | 赞成 | 赞成（【暂定 · 与 (U) 无冲突】，未否决） | 赞成（第一轮反对，反例为迁移前已停驻会话无引用；实测 Lab 库 `conversation` 0 行后重投赞成） | 通过 |
| D13-05 | 赞成 | 赞成（【暂定 · 与 (U) 无冲突】，未否决） | 赞成 | 通过 |

分类：五条均无“意图 / 技术”争议；导师认为 D13-02 更接近“技术（兼串联）”，按 D1-17 该区分不影响否决范围，保留“串联”。
