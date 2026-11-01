# D14 Program 捕获身份纳入发行身份

起草：leader 分身 GapClone（Claude 族，依据 (U) U21“对于领导的处理，我推荐你分身”），受 leader 会话 01a195a6 指派。
来源：D13 文末登记的缺口（`pepgent-pm/evidence/decisions/D13-contract-gaps.md`“登记但未列条目的缺口”，steady 第三轮提出）。leader 要求现在处理：D13-05 已在改中心 runner 的环境，SOR 切片近期会改 runner。
规则依据：D10-08；D1-12/16/17；`pepgent-soroi/.claude/rules/design-assumes-it-works.md`（只写主路径）。
Argon 基线：`pepgent-pm/evidence/argon/D14-intent.md`。讨论者：discuss:steady、discuss:divergent，采纳与不采纳见文末。
路径行号按 2026-11-01 各仓 `origin/main` 工作树。
结果：D14-01 至 D14-03 全部通过（三族各三票赞成，argon 未行使否决）。D14-01 的分类由导师按 D1-17 终局裁定为“技术/补”。选票原文：`evidence/votes/D14-leader.md`、`D14-argon.md`、`D14-mentor.md`。

## 现状（证据）

- (D) D4-02（`pepgent-pm/evidence/decisions/D4-remote-exec.md:50`）：节点版本 = 节点 bundle 的内容哈希；捕获身份 = 版本 + 输入身份 + 运行环境（D4-18），Agent 体另加定制身份。
- (D) D4-04（D4:52）：中心与远程“都运行 runner bundle 加节点 bundle；入参、`result.json`、回收方式完全相同”。D4-05（D4:53）：远程拷入的 runner、boot 程序、定制 tar 是 release 导入时按内容哈希放进对象目录的发行物。D4-08（D4:56）：远程 `boot.js` 选择 program/agent 分支、读取调用、启动子进程。
- (D) D4-18 第 3 点（D4:66）：Agent 体的定制身份 = soroi release artifact 的内容哈希 + 本次拷入的 Lab 库 `.omp/` tar 的内容哈希。中心插件从哪里取得 release artifact 的内容哈希没有写（D13 文末“相邻缺口”同一问题）。
- (D) D6-22 与接口草图（`D6-store-service.md:50,158-163`）：`ReleaseRecord = { version, content, boot, runner, customization, importedAt }`，`content` 是整个 artifact 的内容哈希；部署 init 把同一份 artifact 经 `PUT /releases/{version}` 导入。
- (R) 发行构建：`Pepgent/soroi` `scripts/build-release.py:204-245`。外层 tar 含 `install.ts`、`README.md`、`manifest.json`、`customization.tar`、`runner.js`（以及有时的 `boot.js`）；`manifest.json` 只记 `customization`、`runner`、`boot` 三个组件的哈希（`:214-225`），不覆盖 `install.ts`；artifact 以自身 sha256 命名为 `soroi-<sha256>.tar`（`:241-242`）。
- (R) 安装：`scripts/install.ts:68-75` 只接受 `--home`；安装器从解包目录运行，读 manifest、校验组件（`:75-78`），把 `customization.tar` 解到 `~/.omp/soroi/<customization sha256>`（`:80-86`），随后恢复依赖、链接插件、生成启动器（`:87-99`），不记录 artifact 的内容哈希。调用方：deploy `lab-entrypoint.sh:13-17`、standalone `compose/central-entrypoint.sh:18`，都先把挂在 `/release/soroi.tar` 的 artifact 解到临时目录再运行安装器。
- (R) 中心执行：插件每次 eval 用 `Bun.build` 从已安装的 `runner.ts` 打 runner（`packages/omp-soroi/src/eval/bundle.ts:155-161`、`execute.ts:111`）；`runNode` 决定 runner 的 cwd、环境与请求编码（`execute.ts:252-260`），`toOutputs` 决定输出字段与 `File` 路径的解释（`execute.ts:266-304`）。捕获 ID 只含节点版本、输入与 env 名（`src/eval/hash.ts:14-15`、`execute.ts:183-185`）。
- (R) 插件也可以直接从源码加载（`packages/omp-soroi/README.md:9-17`），宿主机开发验证用过这条路（`evidence/e2e/20261101T051325Z-eval-object-root/metadata/runtime-evidence.json:106`）；这条路上没有任何安装产物。
- (R) 远程 Program（SOR-17a，[soroi#214](https://github.com/Pepgent/soroi/issues/214)）与 `boot.js` 尚未实现。

失效场景：节点 bundle、输入、环境身份都不变，而发行里决定 Program 执行与回收的代码变了——runner 的参数解码或 `result.json` 写法、插件 `runNode` 的 cwd/环境/请求编码（含 D13-05 的固定 `PATH`）、`toOutputs` 的 `File` 路径解释、远程 `boot.js` 的启动方式。现行公式下两侧都会复用旧捕获。

## 决策项

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D14-01 | **Program 捕获身份加入发行身份（修订 D4-02 的 Program 公式）** | 插件 eval 的捕获公式；`design/eval.md`、`design/store.md` 的捕获身份段 | 发行身份 = soroi release artifact 的内容哈希（64 位小写 hex），与 DIST-01 的 artifact 文件名 `soroi-<sha256>.tar` 是同一个值；这份 artifact 经 init 导入 store 后（store 要求含 boot，SOR-17a 补齐 boot 之后才能导入，`packages/store/src/releases.ts:7-24`），也等于它的 `ReleaseRecord.content`。外层 tar 由 `write_deterministic_tar` 写出（`scripts/build-release.py:239`）。经 runner 执行的调用——Program 与 Agent——的捕获身份都含发行身份：Program = 节点版本 + 输入身份 + 环境身份（D4-18、D13）+ 发行身份；Agent 不变（D4-18 第 3 点的定制身份本来就含同一个发行身份，另加 Lab 库 `.omp/` tar）。中心与远程同一个值：远程执行的 runner、boot 与定制 tar 都来自这份 artifact 导入后的对象（D4-05、D6-22）。发行身份在插件的确定性捕获编码里作为单独字段，编码属插件私有（D13-03） | **得到：** 发行里一切决定 Program 执行与回收的代码——runner、中心 `runNode` 与 `toOutputs`、远程 `boot.js`、安装器——一改，两侧都不再复用旧捕获；Program 与 Agent 用同一个发行身份，公式一致；不需要知道调用的体种类就能决定是否加入（runner 执行的都加）；复用已有的 `ReleaseRecord.content`，不加发行组件。**放弃：** 每次 soroi 发行——包括只改 skill、agent 定义或 README 的发行——之后，同样的 Program 调用都要重算，其中可能有耗时数小时的远程作业（D4-21）；开发期每次合入都会发行，且与 D13 接受的“Pepgent web 镜像发版让中心捕获失效”叠加。这是效率损失，不是错误复用；等实测成为瓶颈再缩小粒度（例如在 manifest 里加只覆盖 eval 代码、runner、boot 的派生组件）。派生运行按 `Inherited` 继承（`packages/store/src/contract.ts:50`）、节点库与 usage 读 store 历史，不受影响；跨发行做的复用验收会看到预期内的不复用。**备选落选：** ① 只加 runner 字节哈希——`runNode`、`toOutputs`、`boot.js` 的改动仍会错误复用；② 新建独立的 `ProgramRuntime` 发行组件、把 runner 与全部适配逻辑收进去后只哈希它——失效最精确，但要重构 D4-04/D4-08 的执行单元，目前没有证据表明额外失效的代价值得；③ 手工维护协议版本号——忘记递增就错误复用，没有机制保证；④ 把 runner 并进节点版本——runner 一改所有节点版本都变，节点版本历史失真，且仍不覆盖启动器 | 技术 | 补 |
| D14-02 | **中心插件取得发行身份的方式** | `scripts/install.ts`（DIST-01）；deploy `stacks/pepgent-central/lab-entrypoint.sh`；standalone `compose/central-entrypoint.sh`；A0 campaign 与 DIST-01/CUS-04 启动脚本、宿主机开发驱动；插件 Main 启动配置（`src/index.ts`，与 `SOROI_STORE_URL` 同处） | 安装器新增必填参数 `--artifact <path>`：对该 artifact 文件取 sha256 作为发行身份，与 manifest 的 `version` 一起写入安装目录里的 `release.json`（`{ "version": …, "content": "<64 位小写 hex>" }`，放在已安装定制的根目录）。所有调用安装器的入口把它们解包的同一个 artifact 路径传给 `--artifact`（deploy 与 standalone 都是 `/release/soroi.tar`）。插件在 Main 角色启动时读已安装的 `release.json`，与 D13-01 的环境身份一起显式传给 eval。每个 HOME 同一时刻只有最近一次安装的发行生效（入口每次启动先安装再启动进程），`release.json` 随安装覆盖。eval 只在从已安装发行启动的 Main 中运行：宿主机开发与验证也先 `build-release.py` 产出 artifact、再用安装器装进一个 HOME，不再以源码直接加载的插件运行 eval。远程不需要新接口：store 对同一 artifact 计算出相同的 `content`（D6-22） | **得到：** 发行身份的源头是 artifact 本身，由已经持有它的安装器算一次，插件只消费；同时补上 D4-18 第 3 点中心 Agent 定制身份缺的那个值；开发与部署走同一条安装路径，捕获身份只有一种来源。**放弃：** 三个部署入口与开发驱动多传一个参数；开发验证多一步打包与安装。**备选落选：** ① 用 `manifest.json` 字节的哈希——manifest 不覆盖 `install.ts`、`README.md`，且与 `ReleaseRecord.content` 不是同一个值，Agent 定制身份与 Program 发行身份会出现两套；② 部署方计算并注入 `SOROI_RELEASE_DIGEST`——把发行身份的生产放到部署方，standalone 与 A0 各算一次，D13-02 已把发行 tar 排除在部署投影之外；③ 插件按 `version` 查 store `GET /releases` 取 `content`——中心执行的是本机安装的那份，读 store 只是绕一圈的副本，且依赖 init 先导入；④ 保留源码直接加载并在其上现场生成一个“开发发行身份”——出现第二种身份来源 | 串联 | 补 |
| D14-03 | **发行身份与 SOR-07 在同一次切换中接入** | SOR-07 所属插件仓（迁仓前 `Pepgent/soroi` `packages/omp-soroi`）的捕获公式 | D13-03 的“一个 PR 同时接入中心与远程环境身份”扩为同时接入发行身份（D14-01）。中心侧发行身份依赖 D14-02 的安装产物；远程 Program 在 SOR-17a 实现时沿用同一公式。切换前的捕获不迁移 | **得到：** 只让全部旧捕获失效一次，不出现“有环境身份、无发行身份”的中间公式。**放弃：** SOR-07 的 PR 依赖 DIST-01 的安装器改动先合入 main（运行入口上的真实前置）。**备选落选：** 另开一次切换——让全部捕获再失效一次 | 实现 | 否 |

## 对工程派发的影响

| owner | issue | 动作 |
| --- | --- | --- |
| pepgent-eng-plugin | [soroi#199](https://github.com/Pepgent/soroi/issues/199)（DIST-01） | 安装器加 `--artifact`，写 `release.json`；`compose/central-entrypoint.sh` 传 `--artifact /release/soroi.tar`；插件开发说明改为先打包安装再运行 eval |
| pepgent-eng-plugin | [soroi#215](https://github.com/Pepgent/soroi/issues/215)（SOR-07） | 按 D14-01、D14-03 把发行身份并入同一次切换；Main 启动时读 `release.json` |
| pepgent-eng-plugin | [soroi#214](https://github.com/Pepgent/soroi/issues/214)（SOR-17a） | 远程 Program 的捕获身份用 D14-01 公式 |
| pepgent-eng-ops | Pepgent/deploy（中心 Stack） | `lab-entrypoint.sh` 调用安装器时传 `--artifact /release/soroi.tar` |
| pepgent-eng-e2e | A0 campaign、DIST-01/CUS-04 启动脚本 | 安装器 argv 加 `--artifact`；所有中心 Main 入口从已安装发行启动 |
| pepgent-eng-lab3 | 宿主机开发驱动 | 从已安装发行启动根 omp |
| pepgent-eng-store | — | 无：`ReleaseRecord.content` 已在契约中；捕获记录不另存发行身份，与 D13 不存环境身份一致，身份是不透明的键 |

## 讨论意见的采纳

| 来源 | 意见 | 处理 |
| --- | --- | --- |
| steady | 只哈希 runner 不够：中心 `runNode`（cwd、环境、请求编码，`execute.ts:252-260`）、`toOutputs`（`File` 路径解释，`:266-304`）与远程 `boot.js`（D4-08）都持有执行语义，改它们会错误复用；推荐用整个 release 内容哈希 | 采纳，D14-01 改为发行身份 |
| steady | 中心改执行发行 `runner.js` 时须在 Main 启动重算其哈希、元数据缺体种类、源码加载入口无 manifest | 方案改为发行身份后：不再依赖中心执行发行 `runner.js` 的字节，保留现有 `buildRunner`（runner 源码与 Bun 分别由发行身份与镜像 digest 覆盖）；Program 与 Agent 都含发行身份，不需要体种类；源码加载入口按 D14-02 改为先安装。防篡改、半写属于异常路径，按设计规则不在此处理 |
| steady | `ReleaseRecord.content` 等式以成功导入为前提，store 当前要求 boot | 采纳，写入 D14-01 |
| divergent | 开发方式加载没有 manifest，二选一：只从安装位置读，或由启动方注入 | 采纳“所有 Main 入口先安装”，写入 D14-02 |
| divergent | 用整个 release 内容哈希的代价应写实：发行频繁时昂贵远程作业被重算 | 采纳，写入 D14-01 放弃栏 |
| divergent | store 是否在捕获记录里存 runner/发行身份须明确 | 明确不存，与 D13 不存环境身份一致，写入派发表 |
| divergent | 外层 tar 是否确定性 | 已核实 `build-release.py:239` 用 `write_deterministic_tar`，写入 D14-01 |
| argon（第一轮） | 赞成 runner-only，理由为粒度恰当、改 skill 不失效 | 被 steady 的错误复用反例取代；argon 第二轮按新文本重新裁决 |

## 计票

| ID | Claude 族 | argon | 导师 | 结果 |
| --- | --- | --- | --- | --- |
| D14-01 | 赞成 | 赞成（【暂定 · 与 (U) 无冲突】，未否决；第一轮曾赞成 runner-only 文本，按 steady 反例改写后重投赞成） | 赞成 | 通过 |
| D14-02 | 赞成 | 赞成（【暂定 · 与 (U) 无冲突】，未否决） | 赞成 | 通过 |
| D14-03 | 赞成 | 赞成 | 赞成 | 通过 |

分类仲裁：导师在 D13 曾认为此缺口属“意图/修订”；起草者与 argon 标“技术”。按 D1-17 交导师仲裁，导师终局裁定 D14-01 为“技术/补”：用户原意（按身份确定性复用、不重放、远程与本机同一中间件捕获）未变，新增的是实现它所需的身份分量，与 D4-18 同构。
