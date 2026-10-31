# D4 远程执行决策表 · task:high 的选票

投票者：task:high（`Governance_e826.HighD4`，Claude 族）。对象：`evidence/decisions/D4-remote-exec.md` 的 D4-01 至 D4-22。

依据：

- 用户原话台账 `pepgent-soroi/LEDGER.md` U1–U24；
- 已定的 leader 技术裁决 A–E；
- 同目录 `D2-components.md`（修订中）、`D3-network-mux.md`、`D5-plugins-eval.md`、`D6-store-service.md` 的现行文本；
- 设计文档 `pepgent-soroi/design/store.md`、`layers.md`，以及 `pepgent-remote/design/remote.md`。

本票没有咨询 discuss:* 或其他导师（U11），以免 LeadMentor 之外的意见间接进入计票。

| ID | 票 | 理由 | 反例（仅反对票） / 修改建议 |
| --- | --- | --- | --- |
| D4-01 | 赞成 | 单文件 bundle 回答了 U `#8d913d2f`“还得处理依赖，并把它还原成ts文件，在目标环境执行”。目标端不装依赖，也就不必访问 registry，模板仍可提前构建（U `#c5030836`）。与裁决 E 一致 | “打不进 bundle 的依赖归镜像”这条代价，在 D4-03 写成检查器或打包时的显式报错，不要等到远程运行时才失败（只作说明，不影响本票） |
| D4-02 | 赞成 | 版本 = bundle 内容哈希，就是裁决 E；D6-21 和 argon `version-ruling.md` 都已确认 | how 里“bundle 按内容哈希放进对象存储”一句，改成：正式运行首次提交时存成对象（D6-21 的 `PUT /objects/{hash}`）；dry run 只放进本次调用的传输暂存区（D6-07）。理由：dry run 不写中心副本，见 U `#7ffcea0c`“dry run根本没有store”和 D6-04 |
| D4-03 | 赞成 | 直接回答 U `#f4c96767`“package.json怎么办”：`package.json` 归节点项目（D2-12 的 Lab 库），只在中心打包时用一次；系统级依赖归镜像（`layers.md:10`） | 无 |
| D4-04 | 赞成 | 中心和远程共用一份 bundle 和一套回收代码，满足“远程运行的捕获与本机相同”。`Site` 与 D5 的 `Placement` 是同一个类型（D5 §3） | 无 |
| D4-05 | **反对** | `RunRequest` 的映射与 D6-07、D2-10 的文件端点冲突，dry run 走不通 | **反例：** AI 新写了节点 `anneal.ts`，用 `env: { curve_2200c: "slurm-a100" }` 做 dry run。D4-21 要求它真实执行（U `#68d36f55`“在slum里试跑某种算法非常正常”）。<br>① 本行把节点 bundle 映射成 `HttpGet /objects/<version>`，可是 bundle 要到首次正式提交才存成对象（D6-21），copy-in 会拿到 404，体起不来。中间件如果为此先 PUT 进 `/objects`，就是 dry run 写了中心副本，违反 U `#7ffcea0c` 和 D6-04。dry run 中被钉住的 File 输入（D5-09 的 `{ file: path }`）同样不在中心副本里。<br>② 拷出目标 `/volumes/{run}/{step}/{call}` 要填运行 id，但 dry run 根本没有运行：运行由首次正式提交建立（D6-05）。何况 D6 里的 `/volumes/{run}/{step}/{position}` 是已提交 volume 的 GET 清单，不是 PUT 目标（D6 接口 :119-120）。<br>失效位置：本行的 `inputs` 与 `output` 两项，以及 §4.3、§4.6。<br>**能赢得赞成的修改：** 映射改按 D6-07 写：<br>• 每次远程调用（dry run 与正式运行相同），中间件先 `POST /transfers` 取得 `t`；<br>• 已在中心副本的字节 → `HttpGet /objects/{hash}`；<br>• 其余字节（dry run 的节点 bundle、boot、被钉住的文件）先 `PUT /transfers/{t}/objects/{hash}`，再用 `HttpGet /transfers/{t}/objects/{hash}` 拷入；<br>• `output` → `HttpPutTar /transfers/{t}/volume`。<br>§4.3、§4.6、§5 时序与 D4-07 第 2–4 步的端点名同步改写；“路径按 D6”落实到行文里 |
| D4-06 | 赞成 | 按位置传参，File 改写成按内容哈希命名的本地路径，节点函数不必知道自己在哪里运行（`eval.md:74`、`layers.md:12`） | File 的来源 URL 随 D4-05 的修改：不在中心副本的输入走 `/transfers/{t}/objects/{hash}` |
| D4-07 | 赞成 | 拷回整个 volume，解进只用于传输的暂存区，正式运行与 dry run 的差别只在“是否被提交引用”。这与 D6-07 的暂存区语义一致，也落实了 `remote.md:36,74` | 第 2 步的 PUT 目标与暂存区名称按 D6-07 写成 `PUT /transfers/{t}/volume` 和 transfer id；第 4 步“提交后删除暂存区”与 D6 相同，可直接引用 D6-07 |
| D4-08 | 赞成 | 一个 `boot.js` 入口同时承载 Program 与 Agent，模板只是 remote 的数据（`remote.md:75`）。runner 随拷入带进去，不烘焙进镜像，所以没有触碰 remote 否决过的“每个业务镜像内置 runner”（`remote.md:147`）。Agent 分支必须先解开定制（D4-09）再 exec dial，因此需要 boot 这一层。修订后的 D3-04、D3-14、D3-17、P3 已改为以本行为准 | 按修订后的 D3-04 与 D3 §4 改写 Agent 分支：exec `omp-rpc-mux dial --root ${REMOTE_MOUNT} --expose soroi-batch [--expose <产物目录>] -- omp --mode rpc …`。程序名用 `omp-rpc-mux`（D2-08、D3），不用 `pepgent-mux`；删去 `--batch-dir`。D3 已取消 `--batch-dir` 和 `mux_batch` 推送 |
| D4-09 | **反对** | 只拷入 soroi 定制 tar，漏了 Lab 库里的 project 级定制。远程 Agent 因此达不到“运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起”（U `#9c291fe2`） | **反例：** 节点作者在 Lab 库里定义 `.omp/agents/xrd-analyst.md`，配套的 skill 和 rule 也放在 Lab 库的 `.omp/` 下。D2-12 规定 Lab 库的检出就是中心 omp 进程的 cwd，库中包含 Agent 节点用的 agent 定义、技能和规则；D5-17 规定 `template` 可以来自“发行包或 Lab 库的 `.omp/agents`”。节点写 `agent(prompt, { template: "xrd-analyst" })`，env 为远程：<br>• 本行只把 D2-25 的定制 tar 解到 `HOME`；<br>• 远程 cwd 是 `<mount>/work`，没有 `.omp/`；<br>• §4.1 `CallRequest.agentDef` 的注释又写死成“soroi 定制里的 Agent 体 agent 定义名”。<br>结果是远程 omp 找不到 `xrd-analyst`，Lab 库的 skill 和 rule 也不加载，与中心运行同一节点时加载的定制不同。D2-11 的部署条写的是“soroi 定制（D2-25 的发布 tar）和**库的内容**每次启动经 copy-in 拷入（D4-09）”，本行没有兑现。<br>**能赢得赞成的修改：** how 补上：<br>• Lab 库当前提交的 project 级 `.omp/` 子树（agents、skills、rules）按内容寻址打成第二个 tar，经 copy-in 解到远程 omp 的 cwd，即 `<mount>/work/.omp/`；<br>• `CallRequest.agentDef` 改为“按 omp 的发现顺序，在 soroi 定制和 Lab 库中解析的 agent 定义名”；<br>• §4.4 布局和 §4.3 的 Agent 差异说明加上这个 tar。<br>另外两处措辞跟随裁决 A：“两个插件”改为“插件包 `omp-soroi`”；`agent.tar` 的说明不变 |
| D4-10 | 赞成 | 长期凭据由部署的拥有方注入，不进 tar，也不进会被 `runs/<run>.json` 落盘的 `RunRequest.env`。这与凭据规则以及 `inv/r-remote.md:121` 的事实一致 | `RunRequest.env` 的启动参数清单改为逐字引用修订后的 D3 §4（:154）：`SOROI_SUBAGENT_ID`、`SOROI_SUBAGENT_PARENT`、`MUX_GENERATION`、`MUX_TOKEN`，本行缺的是 `MUX_GENERATION`。`MUX_TOKEN` 由 mux 在 `mux_open_generation` 中返回（D3-07 ②），不要写成“写方签发” |
| D4-11 | 赞成 | 本机与远程只有一种传输（裁决 D：Mux 只持连接表，进程由写方用 dial 启动；修订后的 D3-07、D3-08 一致）。RPC 帧原样转发，插件不另造协议（U `#09e1cc92`） | 第 1、2 步的 URL 与参数逐字引用 D3 §4：<br>• writer 用 `Authorization: Bearer`，再经 `mux_open_generation` 开一代；<br>• process 带 `generation={g}&token={t}&run={REMOTE_RUN}`。<br>本行现在缺 generation，写方开的那一代就无法与连上来的进程对应（D3-07 ②③）。<br>第 4 步补上：读方经 `GET /agents/{id}/files` 拉取 `--expose` 目录（D3-13）。“已对齐”的说法改为实际对齐后再写 |
| D4-12 | 赞成 | 生命周期嵌套与 D3-07 一致：写方声明 ⊃ 代，这里再细化为代 ⊃ remote 作业 ⊃ volume。各层有各自的权威（remote 管作业，supervisor 只在一代期间持有 run id），`.soroi.json` 只当配方，不当状态读，符合“是生是死全部遵照omp既有的生命周期”（U `#9c291fe2`、`#678fe41a`） | 无 |
| D4-13 | 赞成 | 任何时刻只有一处 transcript 算数：运行中在 volume，拷出后回到中心。冷复活和 `history://` 照旧读中心文件，对齐 D3 的 P5 | 停驻发生在 eval 调用之外时（IRC 唤醒后再停驻），那一代的拷出也走 D4-05 修改后的 transfer。transfer 不依赖 run 和 step，所以写回路径无需另设 |
| D4-14 | 赞成 | 交回通道只有一条，本机与远程相同（C-5，U `#49e6867a`）。捕获的结束锚点放在“拷出到达”，因为文件在拷出之前确实不在中心 | 无 |
| D4-15 | 赞成 | 落实 U `#8e0a7e8f`“本机落盘……运行结束后，才会随着拷贝一起回集中副本”。汇入与这一步的提交在同一事务，与 D6-04、D6-07 的 `read_parquet` 汇入一致 | ①“`omp-soroi-eval` 以远程角色运行”改为“`omp-soroi` 插件包的 eval 模块以 `RemoteChild` 角色运行”（裁决 A）。②“`dial --batch-dir` 监视这个目录，经多路复用器推送给读方”改为：dial 以 `--expose soroi-batch` 开放这个目录，读方经 `GET /agents/{id}/files` 拉取（修订后的 D3-13，只拉取，不推送）。§4.4 的布局说明与 §4.7 的 dial 一行同步 |
| D4-16 | 赞成 | 一层由结构保证：`soroi_task` 没有放置参数（D5 §3 `SoroiTaskParams`），开远程 agent 只能经 `soroi_eval` 的远程 `Agent` 节点，而 Agent 体会话没有 `soroi_eval`（D5-06）。不需要运行时计数，满足 U `#5a37a640`“eval禁止递归嵌套”和 `#3dbd0473` | where 列的“两个插件的角色判定”改为“`omp-soroi` 的角色判定”（裁决 A） |
| D4-17 | 赞成 | 发现只认 remote 模板目录这一个权威，不出现第二份机器清单（`remote.md:34`）。回应 U `#9c291fe2`“只需要补充，部署，服务发现”。修订后的 D3-14 已改为引用本行的判据 | 无 |
| D4-18 | **反对** | 把生效 env 算进身份是对的，但身份里的“运行环境”只取模板名，而模板名并不稳定地指向同一个环境 | **反例：** 用户在 Lab 容器页给 `slurm-a100` 换了镜像（升级 CUDA 或 numpy），走的是 D2-13 的流程：提交到 images、构建，再经 D2-09 新增的“模板写入”绑定到同名模板。之后对同一节点、同一输入做正式运行：<br>① 捕获身份 = bundle 哈希 + 输入身份 + `"slurm-a100"`，与换镜像前相同，store 按身份复用旧镜像算出的结果。用户换环境的目的落空。这正是 D4-02 为节点版本修掉的同一类错误（BS:128：版本身份覆盖实际执行物）。<br>② 旧捕获的来源记的是 `slurm-a100` 加 remote run id；remote 的运行记录只存原请求里的模板名（`inv/r-remote.md:121`）。于是 `layers.md:22`“产物带来源……哪个运行环境（镜像、机器）”查到的是**现在**绑定的镜像，答错了。<br>失效位置：本行的身份公式与来源字段；`store.md:16,31` 的“运行环境”。<br>**能赢得赞成的修改（任选其一写进 how）：**<br>(a) 身份中的运行环境 = 模板名 + 模板记录的内容哈希。模板记录指 remote 登记的内容（`remote.md:81-85`：Komodo 的 Stack、Slurm 的作业预设与镜像路径、k8s 的 manifest）。`remote templates` 补充返回模板记录或它的哈希，捕获的来源也记下这份哈希和镜像引用；remote 侧的改动与 D2-09 新增模板写入同属一次接口扩展。<br>(b) 模板登记后不可改写：D2-09 的“模板写入”只新增模板，换镜像就是登记新模板名，模板名因此可以当作环境的内容身份。本行写明这一前提，并在 D2-09 和 D2-13 同步 |
| D4-19 | 赞成 | 覆盖写在工具参数里，代码仍只有三种语句，调用参数仍只是 atom 名（`eval.md:136-137`），保持了 U `#c5030836` 的“非常简单”。D5-10 已采纳，D5-09 的 pins 用同一种定位方式 | 无 |
| D4-20 | 赞成 | 主路径不需要跨步的运行状态。依裁决 C，派生运行不按已存的步重跑，换环境就是在新写的步里用 D4-19 表达。本行也给 argon 留了改成运行记录默认 env 字段的出口 | how 里“改动随派生运行记录”改成与裁决 C、D6-16 一致的说法：派生运行里新写的步各自带 D4-19 的覆盖，store 只按 D6-16 记派生来源与改动 |
| D4-21 | 赞成 | 直接落实 U `#68d36f55`、`#32b6f7fd`、`#7ffcea0c`：dry run 真实发起远程作业，结果交给 AI，不写 store；transcript 归 omp，所以照常回到中心 | 具体实现依赖 D4-05 修改后的 transfer 映射；不修改 D4-05，本行就无法实现（见 D4-05 的反例） |
| D4-22 | **反对** | 打包描述与已定的裁决 A 相矛盾 | **反例：** 本行写“远程执行的 soroi 一侧全部在**两个插件**里”“两个插件随 D2-25 的 soroi 定制……装在中心主机”；§2 组件表又把 store 服务写成 `Pepgent/store`。而裁决 A 和现行 D2-02、D2-03、D2-25、D5-01、D6-01、D6-22 的结论是：一个插件包 `Pepgent/soroi` 的 `packages/omp-soroi`（eval 模块加 subagent 模块），store 在同仓的 `packages/store`，两个旧仓迁入后归档。<br>按本行通过后，§7 会把两插件的打包写进 `eval.md` 和 `subagent.md`，与 D5 对 `eval.md:3`、`soroi.md:13-14`、`subagent.md:26-37` 的改写直接冲突。安装者照本行安装两个已归档的插件，装不出 U23 要求的“完整的omp定制”。<br>**能赢得赞成的修改：**<br>• how 的打包段改为“远程执行的 soroi 一侧全部在 `packages/omp-soroi`：eval 模块含打包、runner/`boot.js`、`Site` 执行、env 参数、remote 客户端、`RemoteChild` 写批次；subagent 模块含 `launchRemote`、Mux 写方、代、transcript 拷入拷出”；<br>• 安装段改为“`packages/omp-soroi` 随 D2-25 的定制整体安装”；<br>• §2 组件表与 D4-05、D4-07、§4.6 的 store 归属改为 `Pepgent/soroi` 的 `packages/store`（D6-01） |

## 不计票的跨表附注（请秘书转交 leader 与相关起草者）

1. **D3 与 D4 的模板约定：已由 D3 修订解决。** 修订后的 D3-04、D3-14、D3-17、P3 以 D4-08、D4-09 为准：body 是 `boot.js`，定制与 Lab 库的 `.omp/` 每次拷入。D4 还要按 D4-08、D4-15 的附注删去 `--batch-dir`，改用 `--expose`。
2. **dial 程序名。** D2-08、D3、D5 写 `omp-rpc-mux`，D4 的 §2、D4-08、D4-11、D4-15、§4.7、§5.2 仍写 `pepgent-mux`，应统一改为 `omp-rpc-mux`。
3. **§2 组件表。** `omp-soroi-eval`、`omp-soroi-subagent` 两行合成 `packages/omp-soroi` 的两个模块；store 服务改为 `packages/store`（裁决 A、D6-01）。§2 不是投票行，但 D4-22 修改后应一并更正。
4. **控制端点注册（修订后的 D3-19）。** 每个写 eval 的会话注册端点时，都要出示本代的 `MUX_GENERATION` 和 `MUX_TOKEN`。所以 D4-10 的启动参数清单必须带上这两项，本机的 `LocalChild` 也一样。

## 计票

赞成 18 · 反对 4（D4-05、D4-09、D4-18、D4-22）
