# Remote 与执行底座：意图、边界及文档差距

## 阅读口径与结论

- **(U)** 用户本人在 session 中的原话，是意图证据；**(A)** assistant/agent 的提案或解释，不自动升级为用户要求；**(D)** 当前工作树文档；**(R)** 实际命令/runtime 输出。本报告没有执行程序、基础设施操作或测试，因此不声称任何新的 **R** 证据。
- 调查窗口为 2026-10-29 至 2026-11-01。检索跨 Pepgent 各目录及 `redesign` worktree 的用户/assistant 对话，重点原始证据实际集中在 10 月 31 日与 11 月 1 日；fork 继承的相同用户条目没有被当成数份独立证明。时间按 session 渲染的 **+09:00 本地时间**。
- **(U+D) 核心结论：remote 是 Pepgent 的独立程序，不是 soroi 内部模块；soroi 中间件只是客户端。三后端的抽象必须保留，最初仅实现 Komodo；这是阶段性实现范围，不是永久排除 Slurm/k8s。** 证据：下文 U5–U8、U13–U14；`pepgent-remote/design/remote.md:3-19,30-50`。
- **(U+A+D) “执行底座”不能直接等同于 remote。** 用户讲的是捕获/追踪不应依赖 Effect；assistant 将只运行副作用的求值部分称为“执行底座”，后来又提出 async 求值器。当前 `soroi.md` 仍分别列出 remote 与执行底座。证据：U3、A1、A2；`pepgent-soroi/design/soroi.md:7-17`。
- **(U+A+D) 最显著缺口是 soroi 侧远程 Program 的可执行交付契约，而不是 remote 的“再加一个后端”。** 用户明确指出依赖、TS 目标环境执行问题；对话有 runner/bundle 提案，但当前 remote 文档只描述模板内命令，eval 文档只说独立节点文件可发送，未把两者完整接起来。证据：U10、A4；`pepgent-remote/design/remote.md:44-50,72-75`，`pepgent-soroi/design/eval.md:64-79,89-96`。这应由 soroi/remote 的设计负责人定接口，不能从此推导 remote 要理解 TS、atom 或捕获。

### 来源简称

以下简称均指当前工作树，而非 git 历史：

- **L** = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/design/layers.md`
- **E** = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/design/eval.md`
- **S** = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/design/store.md`
- **SA** = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/design/subagent.md`
- **SO** = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/design/soroi.md`
- **RD** = `/Users/mouriya/Ext/code/pepgent/pepgent-remote/design/remote.md`
- **RR** = `/Users/mouriya/Ext/code/pepgent/pepgent-remote/README.md`
- **RC** = `/Users/mouriya/Ext/code/pepgent/pepgent-remote/templates/komodo/example/compose.yaml`

## Intent

### 用户意图原话账本

**U1 — 位置不是旧 Workspace 控制面。** (U) 2026-10-31 02:34:38，session `01a18e3a-ce1a-72bf-9efc-189705cf936e`，entry `f78895ee`：

> 而workspace，本质上，就是，把ai放到另一个机器上跑，至于说这个机器是容器还是别的什么东西根本就不管

[原始条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/f78895ee)

**U2 — 捕获和文件传输属于中间件。** (U) 同 session，02:42:12，entry `edbaf573`：

> 一种类jotai中间件他负责程序中非agent的部分的捕获，这次输入了什么，输出了什么，而因为他是中间件，所以可以处理非本机的文件捕获

02:43:29，entry `49e6867a`：

> 而，agent的捕获，是纯粹的 自动以工具行为，就比如subagent在omp中必须调用yield返回给主agent信息。那么自定义工具，直接接受subagent给的文件路径，就等于捕获运行时产物，而这个类jotai的中间件，自己完成整个传输和管理部分。

[捕获](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/edbaf573) · [路径与传输](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/49e6867a)。注意：这里以 `yield` 作类比，后续用户决定重新实现 subagent、不走内置 yield；不能把这句还原成必须使用内置 yield 的要求。后续决定见 session `01a18e1f-5cf2-7281-bf9a-03d102b315ba`，04:44:03，entry `c1ef8567`；当前 SA:9,20。

**U3 — 捕获不在 Effect 内。** (U) 03:07:59，entry `cb9f395b`：

> effect的细节实际上不重要，因为我自己写过zio，是肯定能做到的，并且一些行为不一定非得effect自己处理，因为我们本来就要自己包一个Pure<T>，捕获的行为不在effect内，那么追踪不需要effect全做

[原始条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/cb9f395b)

**U4 — layers 先写要求，不混实现。** (U) 04:05:05，entry `85b259a5`：

> 然后，再写一个文档，soroi要补什么设计层要实现什么，其中特别是，远程运行和远程捕获，这是要求，不是现在立刻写怎么实现和方案

[原始条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/85b259a5)。因此 L:5-24 本来就不该承担 remote 的后端实现细节。

**U5 — 三后端、提前模板、简单调用、共享中间层。** (U) 04:15:49，entry `c5030836`：

> 接下来是关于远程运行的东西，远程运行时实际上我想兼顾三种后端，komodo对应docker，slum对应实验室常见的集群，然后是标准k8s控制面，这会有多复杂，现在需要评估，然后在eval里要做成非常简单的调用，而不是当场决定非常麻烦的参数传递，对于容器或者pod模板是提前构建的。这是一个评估+设计问题，需要把三种不太的后端完全分离实现，共享抽象和中间层。对于标准k8s控制面，可以引入类似komodo的东西，komodo自己不支持k8s，但是他的sdk非常好用，所以docker直接经过他，免去亲自对接N个集群的问题

[原始条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836)

**U6 — 自动临时 volume、运行时覆盖挂载、自动拷回、独立网络层。** (U) 04:53:33，entry `09e1cc92`：

> 首先，文件是需要走自动生成的volume，至于运行的时候怎么映射路径，那是运行时说了算，也就是构建容器模板的时候可以提前写好，运行时被覆盖，到时候创建临时的volume，然后全自动的把文件拷回来，只要能做到这个标准oci行为就不存在你说的文件怎么进出的问题，容器随便删，临时volume也能删。然后怎么连回来soroi，应该是在独立的网络层中，有中心化的omp rpc多路复用器，怎么实现怎么干的你别管，反正在一个网络里，这也应该是oci标准行为，而不需要其他能力

[原始条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92)

**U7 — 可以独立实现，而且是独立程序。** (U) 05:00:31，entry `5d27138c`：

> remote的部分我认为是可以单独实现的

05:01:28，entry `3afc3fb6`：

> 然后还有一点，remote实际上是单独的程序

05:02:08，entry `c87758b6`：

> 因为是单独的程序，所以有必要考虑用什么语言写，不一定非得是ts

[独立实现](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/5d27138c) · [独立程序](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6) · [语言独立](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c87758b6)

**U8 — 跨平台包括 Windows；反对 Slurm SSH。** (U) 05:05:53，entry `93b7f0b4`：

> 这个组件要跨平台的，可能运行在windows，而不是纯arm macos或者linux x86

05:10:07，entry `d5414f59`：

> 我比较反对slurm用ssh，用ssh太不优雅

assistant 随后提出 slurmrestd/HTTP、可选 FirecREST；用户 05:11:42，entry `e5b56608` 回答：

> 改

[跨平台](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/93b7f0b4) · [反对 SSH](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/d5414f59) · [要求修改](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/e5b56608)

**U9 — 远程运行环境指定被明确追问；多数答复被认可但 command 被质疑。** (U) session `01a18e8a-ba9d-76af-acd2-8e12765ec3e4`，05:48:22，entry `6431b7aa`：

> 有一个问题，运行环境，在这里面怎么指定，我确实执行求值了，在哪求值，要传什么

assistant 的答复 `004e04da` 包含函数默认模板、调用覆盖、整个运行覆盖，以及模板包含镜像、集群、设备直通、挂载。用户 05:51:03，entry `071be582`：

> 这里面别的我觉得都没问题，command我有很大的顾虑，因为command甚至可能需要dry run

[追问](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/6431b7aa) · [答复（A）](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/004e04da) · [限定认可](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/071be582)。不能据此把后来废弃的 `command` 构造器或整个旧类型草案重新变成要求。

**U10 — 不能把远程函数执行简化为拼命令。** (U) 同 session，05:54:31，entry `8d913d2f`：

> 实际上，我想了一下，这东西没这么简单，为什么，你看起来好像是构建命令，而实际上，你还得处理依赖，并把它还原成ts文件，在目标环境执行

06:35:10，entry `f4c96767`：

> 然后还有一点是，package.json怎么办

[依赖与目标执行](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/8d913d2f) · [package.json](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/f4c96767)

**U11 — dry run 可能在 Slurm 上真试跑算法；正式执行不是测试替身。** (U) 同 session，06:45:30，entry `48078e3a`：

> dry run本质上是模拟测试，所以依赖注入要想办法解决，并且agent模拟也要解决

06:47:05，entry `68d36f55`：

> 然后dry run确实有模拟到什么程度的问题，在slum里试跑某种算法非常正常

06:56:46，entry `a7f465d2`：

> 你是不是弱智啊，老子在说你所说的正式运行要模拟这件事根本就不可能存在，如果正式运行要模拟，直接正式运行等同于写死一个值，压根不存在模拟不模拟这一说，这是业务上要求模拟，和测试上要求模拟是两码事

[测试注入](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/48078e3a) · [Slurm 试跑](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/68d36f55) · [业务模拟与测试](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/a7f465d2)。后续 08:54:56，entry `32b6f7fd` 又明确“dry run根本没有store，eval里一个atom什么时候叫成功运行还需要store？”。因此不能把早期“只 stage、不执行函数体”提案当最终 dry run 语义。

**U12 — 中央 eval、单层远程 agent、本机记录后拷回。** (U) session `01a18e1f-5cf2-7281-bf9a-03d102b315ba`，05:35:38，entry `8e0a7e8f`：

> 我认为ducklake没有太大问题，部署非常方便，然后我认为其实还有更优雅的解法，我不知道ducklake能不能这么做，对于运行中的数据，实际上他们各自是独立的db，而只有运行结束后，才会随着拷贝一起回集中副本，根本没有并发不并发写入的问题，而写入这事，本来就应该本机落盘，而不是，有一堆集群，维护一个中央的数据库全写一个库

08:25:02，entry `5a37a640`：

> 你以为这样改就能了事？从store拷入运行环境都来了，eval禁止递归嵌套，eval永远只有中心主机能运行

08:27:31，entry `3dbd0473`：

> 到底为什么要ducklake，是为了远程的agent准备的，你到底写的什么鸡巴东西，远程agent爱怎么执行怎么执行，但是不允许再接着开远程agent

08:30:15，entry `7ffcea0c`：

> eval里所有的正式远程运行才需要进入store，任何非正式运行从头到尾都不进store，否则为什么叫非正式？

[本机记录](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/8e0a7e8f) · [中央 eval](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640) · [单层 agent](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/3dbd0473) · [只有正式进 store](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c)

**U13 — 独立 Pepgent 仓库。** (U) session `01a18e3a-ce1a-72bf-9efc-189705cf936e`，05:52:11，entry `b45cd22c`：

> 这是pepgent的仓库，这是独立程序，单独去开私有仓库，另外把本机的那个git repo rule改好，pepgent是一个ai4s的org

[原始条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/b45cd22c)。这是组织归属证据；本次没有新建仓库或检查 GitHub 历史。

**U14 — Komodo 先实现，三后端抽象不许删。** (U) 同 session，08:05:09，entry `2366ef30`：

> k8s和slum的部分暂时不实现，只实现komodo，但是中间层的抽象要有

08:06:03，entry `56d362ca`：

> 谁允许你删抽象的？

[实现范围](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/2366ef30) · [纠正删抽象](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/56d362ca)

**U15 — 后续再次明确 remote 不属于 soroi。** (U) 2026-11-01 07:14:14，session `01a193fd-e992-76d2-8c29-060fe52cc094`，entry `57d9d58b`，相关原文完整句：

> 对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好，argon可以fork出来多个，用于专注于不同方面的考虑，对于subagent的使用。务必，根据业务和架构面的不同各司其职并且以自己的视角和边界思考。而不是由某一个agent带歪。

[原始条目](session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b)

### “执行底座”这个词的证据地位

- **A1 (A)** 10 月 31 日 03:08:15，session `01a18e3a-ce1a-72bf-9efc-189705cf936e`，entry `71916474`，assistant 在 U3 后写：“执行底座 | 只负责把有副作用的部分跑起来，可以用 Effect，也可以不用”；又写捕获与追踪不在 Effect 里做。[条目](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/71916474)。这是执行层与捕获层分离的解释，不是用户命名的新独立系统。
- **A2 (U+A)** 05:45:50，session `01a18e8a-ba9d-76af-acd2-8e12765ec3e4`，用户 entry `607b623f` 问“还需要effect吗”；assistant 05:46:08，entry `3739bb9f` 建议不需要，剩余 async/await + AbortController 求值器，并建议把“执行底座”改为“async 求值器”。[提问](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/607b623f) · [解释](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/3739bb9f)。不能仅凭此断言用户永久禁止 Effect；用户强约束是捕获独立于它。
- **(D)** SO:7,16-17 保留“执行层只需要会运行”，分别列 remote 与“执行底座：运行有副作用的部分”，后者无设计链接。此处确实还有设计未落地，但它不是把 remote 再吞回 soroi 的理由。

## Ownership

| 对象/职责 | 用户证据 | 当前文档及解释证据 | 判断 |
| --- | --- | --- | --- |
| remote 程序及三个 backend 模块 | **(U)** U5、U7、U13、U15 | **(D)** RD:3-19,90-106；**(A)** `01a18e3a`/`72abb95c`，05:01:43 明确从 soroi 库改为独立程序 | 保留；必须维持依赖方向，不能把 remote 当 soroi 内部运行时 |
| 模板目录和远程作业 run 生命周期 | **(U)** U7 的独立程序要求 | **(A)** 同 `72abb95c` 将目录及排队/运行/结束/中止/删除归 remote；**(D)** RD:30-37，RR:94-96 | 这是与独立程序要求一致且已经文档化的具体划分，不是假称用户逐项指定了 API |
| 捕获、值、atom、正式运行写 store | **(U)** U2、U3、U12 | **(D)** E:89-96,153,164-176；S:5-23,54-70 | soroi 侧职责，remote 不需要懂这些 |
| 调用方提交输入来源、输出目的地 | **(U)** U6、U7 | **(A)** `01a18e3a`/`72abb95c` 把“拷回 soroi store”改为调用方目标；**(D)** RD:39-50 | 文档保留了通用客户端边界；HTTP GET/PUT 是当前设计选择，不是用户钦定传输协议 |
| volume 返回后的工作目录/产物 | **(U)** U6 | **(D)** RD:36,72-75；soroi 中间件随后管理文件，E:94 | remote 负责送达指定目标；soroi 决定哪些是捕获值/如何落 store |
| 独立网络层与中心 omp RPC 多路复用器 | **(U)** U6 | **(A)** `01a18e3a`/`72abb95c` 说两边都不归；**(D)** RD:26-28,37,88,166 | 网络能力是独立前提；实现仍占位，不能要求 remote 顺手承担完整 agent 控制面 |
| Agent 身份、唤醒、IRC、交回及对标主 agent 定制 | **(U)** `01a18e1f`/`9c291fe2`，04:12:48；`c1ef8567`，04:44:03；U12 | **(D)** SA:14-23,27-36；RD:75 将 RPC 互通交给 subagent 设计 | 远程作业生命周期不是 AgentRegistry 生命周期；两者不能合并成一套状态 |
| 本地有副作用的函数求值 | **(U)** U3 | **(A)** A1/A2；**(D)** SO:7-17 | 执行底座与 remote 分列；具体如何实现是设计问题，不属于用户已指定的独立组件 |

**(U+D) 对标主 agent 的准确范围：** 用户在 `01a18e1f`/`9c291fe2`（04:12:48）说“首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起”。SA:17 对应插件、扩展、设置、agent 定义、技能、规则；RD:75 只描述命令不意味着这些部署内容由 remote 理解或制造。部署与服务发现仍由 SA:23,151-155 留待设计。

## Interface to soroi

### 当前接口主路径

1. **(U+D)** soroi 函数保存 remote 模板名，调用可以更换；运行时不手工拼所有集群参数。用户依据 U5、U9；当前 E:69-79，L:10，RD:79-88。L 把镜像、集群、设备直通、挂载列为环境内容；RD 把后端配置放预建模板里。
2. **(A+D)** 中间件将模板、挂载覆盖、环境变量、输入文件来源、输出目标交给 remote；remote 返回 run id。`templates`、`run`、`status`、`tail`、`abort`、`remove` 是 assistant 在 `01a18e3a`/`72abb95c`（05:01:43）给出的具体 API，现为 RD:39-50、RR:12-43 的设计，不应包装成六个名字都是用户原话。
3. **(U+A+D)** 临时 volume 在最外层，copy-in → body → copy-out 依次运行，整个 volume 拷出后再允许删除。U6 明确要求临时 volume、自动拷回和可删除；独立步骤镜像、三步顺序与“整个 volume”是 assistant `ab258ad5`（04:54:44）的落法，当前 RD:52-75、RR:98-125、RC:17-52 保留。它避免给每个业务镜像内置 runner，但不等于 soroi 无需可执行适配器。
4. **(D)** 第一种 transfer 是每个输入的 HTTP GET 和整个 volume tar 的 HTTP PUT；RR:26-41 有 JSON 实例，RD:50 指明来源/目标变体可扩展。此处是当前文档的协议，不是新增研究中验证过的服务。
5. **(U+D)** 运行状态、输出尾部与中止通过 remote 获取，remote 向后端请求后记录结论；L:13-14 与 RD:35,45-48、RR:94-96 对齐。用户 U5 期待简单启动，U6 接受执行/拷回；具体状态枚举与接口名是文档/assistant 设计。
6. **(U+D)** 只有正式运行写 store；远程 Agent 先本机写记录，拷出后归入中心副本。U12；E:153,166-168，S:48,54-70。remote 的通用文件运输不应自行决定正式/dry run 或 DuckLake 表结构。
7. **(U+D)** eval 在中心主机运行，远程 agent 不再开远程 agent。U12；E:164-168。这条限制属于 soroi 的运行模型，不是限制独立 remote 程序不能被其他客户端组合使用。

### 被用户纠正或尚未完整收束的接口推导

- **A3 — 被替换的远程 shell 环境方案。** (A→U→D) assistant `01a18e3a`/`a4cb6dd2`（04:31:42）曾主张 `open/exec/close`、tar/ls 经 exec 搬文件，称状态由 soroi 权威持有、Slurm 只走 SSH。用户 U6、U7、U8 后已改成独立 remote、自动 volume、作业 API/HTTPS。当前 RD:21-50,102-106 与旧方案不同。不要恢复 exec 文件通道或 soroi 代管 remote lifecycle。
- **A4 — runner/bundle 有提案但不是完结契约。** (A) `01a18e8a`/`3b7f6a03`（05:51:46）提出：Program 统一 TS 函数，runner 经 copy-in 放进 volume，模板固定命令执行它；`1c355d2e`（05:55:26）进一步提出 Bun.build bundle、系统依赖留在镜像。**(U)** U10 指出了真实需求，不等于认可每个打包选择。**(D)** E:76 现为“文件即版本”，RD:75 现为“模板镜像里的程序命令”；目前没有清楚写出实际传什么节点代码、怎么解析参数/返回 File、依赖从哪来。此处只报告缺口，不替设计负责人选择 bundle 或 runner 形态。
- **A5 — `stage/start` 不是当前 remote 必须缺的接口。** (A) `01a18e8a`/`1aba007b`（05:56:44）在早期 dry run 不执行体的假设下建议拆 `run` 为 `stage`/`start`。**(U)** 后来的 U11、`32b6f7fd`（08:54:56）及 `a45ac248`（08:56:18）强调测试运行且不写 store；**(D)** E:147-156 当前是实际运行、可外部钉住返回值。没有证据据此要求 remote 实现 stage/start；把旧提案当永久接口属于错误。

## Slurm/Komodo

### 后端角色及实现顺序

- **(U+D) Komodo 是 Docker 管理入口，不是 Slurm/k8s 的统一底层。** U5 明确通过它免去逐台对接 Docker 主机；RD:83,96,104 当前为 Core 地址 + 模板 Stack，remote 只连 Core，由 Periphery 管 Docker 主机。
- **(U+D) Slurm 面向实验室常见计算集群。** U5 明确其业务角色；RD:84,97,105 当前预设含 API、partition/QOS、资源、Pyxis/Apptainer 与集群镜像路径。标准 k8s 是第三个独立模块，RD:85,98,106；用户允许 k8s 引入类似 Komodo 的管理入口，但并未钦定 Rancher。
- **(U+A+D) 不要把 Slurm 重新改回 remote 直连 SSH。** U8 的反对与“改”直接作用于 assistant `34fa0dae` 的 HTTP 提案；RD:102-106,148 保留 HTTPS、slurmrestd/JWT，站点已有 FirecREST 时可用。FirecREST 内部如何接集群不是要求 remote 自己用 SSH。
- **(U+D) 暂时只实现 Komodo，抽象包含三后端。** U14；RD:7-19 的接口、生命周期、模板目录、backend 分派、步骤镜像全部覆盖；RR:6-10 明确 Slurm/k8s 模块未实现。这不是违反最初范围。11 月 1 日提出 Slurm 测试环境会使后续验证规划需要考虑它，但不能凭一句推荐篡改 10 月 31 日“暂时不实现”的明确阶段范围。
- **(A+D) Slurm/K8s 的落法是设计而非 runtime 事实。** RD:97-98 提出的共享目录 + bind + 三步 srun、PVC + initContainer + body Job + copy-out Job，没有在本调查中运行。slurmrestd/JWT、输出转发、共享存储、PVC 均明确占位（RD:160-171）。

### 测试环境意图

**(U) 2026-11-01 07:21:29，session `01a193fd-e992-76d2-8c29-060fe52cc094`，entry `5e62a529`：**

> 对于slurm和komodo的测试，如果可以，我推荐你在homelab tf里启动vm创建小型测试环境。我已经在很久之前就把homelabtf清理出来了不少，退役了很多容器。

[原始条目](session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/5e62a529)

- **(U) 这是推荐可用路径，不是已有环境已就绪的断言，也不是命令直接恢复退役服务。** “如果可以”“推荐”“启动vm创建小型测试环境”共同限定其意思；并未指定 VM id、资源配额或集群拓扑。证据即上述原话。
- **(U+D) 测试至少有两类，不能混同。** U11 是 soroi dry run 中对 Slurm 算法可真跑、对设备/昂贵 agent 可外部替代的语义；11 月 1 日原话是部署小型 Slurm/Komodo 基础设施以验证真实执行链。E:147-156 记录前者；RD/RR 当前没有后者的环境部署设计。
- **(D，不是 R) RR:8 声称 Komodo implemented，RR:133-134 声称五类跨平台 CI 构建/smoke。** 这些是文档状态，不能由此声称本任务已重现真实远程调用、模型交回、store 导入或 Slurm 端到端路径。没有执行或重跑任何测试。

## Gaps

### L:5-24 每一项要求的证据分类与当前对接情况

| 当前 layers 要求 | 意图证据分类 | remote/相邻当前文档 | 差距判定 |
| --- | --- | --- | --- |
| Program 和 Agent 都能远程运行（L:9） | **(U)** U1、U2、U9、U10；Agent 同主 agent 要求见 `01a18e1f`/`9c291fe2` | **(D)** RD:75 都作为模板命令；E:58,69-79；SA:16-23 | 目标保留；soroi Program 代码/依赖/输入输出适配没接完，Agent 远程启动仍未完成文档自认（SA:51） |
| 镜像、集群、设备直通、挂载，函数默认/调用覆盖（L:10） | **(U+A)** U5 的预建模板与 U6 的挂载覆盖是直接要求；镜像/设备等具体清单出自 `004e04da`，用户 U9 限定认可 | **(D)** RD:79-88，RR:55-85，E:79 | 模板名及挂载覆盖保留；镜像/集群在 backend 模板中表达。设备直通由模板承担，但 RD 无明确配置/展示契约，不应误报“不支持设备” |
| Agent 对标主 agent（L:11） | **(U)** `01a18e1f`/`9c291fe2` | **(D)** SA:17,23,151-155；RD:75 | 归属正确；定制部署和服务发现是显式未定项，不是 remote API 自己解决 |
| 输入文件远程可按路径读（L:12） | **(U)** U6，U12 的输入从 store 拷入 | **(D)** RD:44,50,64,87；RR:31-40 | 主路径文档保留；File 值如何变远程参数路径的 soroi 侧契约未完整写出 |
| 状态、开始结束时间、输出尾部随时取（L:13） | **(D/A)** 此逐项要求由 layers 文档列出；用户要求简单远程执行，未找到逐字枚举；`ab258ad5`/`72abb95c` 给出 API 解释 | **(D)** RD:45-46,94-106；RR:21-22,42-43 | 有 status/tail 对接；RD 的 Running 一格未写 started_at，RR 明确有，文档精度略不同；不能以此断言 runtime 缺字段 |
| 中止后远端执行随之结束（L:14） | **(D/A)** 当前要求 + assistant API 设计，不冒称独立用户原话 | **(D)** RD:47,96-98；RR:118-119 | 接口覆盖；soroi 人类介入中止怎样等待 remote 结论属于调用方衔接，L 本身不应写方案 |
| 捕获与本机相同（L:20） | **(U)** U2 的统一中间件，远程 Agent 定制要求 | **(D)** E:81-96，RD:75 | 机制归属一致，但无法仅凭 generic command 保证 Program 的完整返回值捕获 |
| 交回文件取回存储，跨机器同内容（L:21） | **(U)** U2、U6 | **(D)** RD:50,72-75，E:94，S:46,69 | copy-out 和 store 的职责已分开；中间件/目标接收服务完整契约仍未连起来 |
| 产物带运行/调用/镜像机器来源（L:22） | **(D/A)** L 的业务需求；不是本次发现的逐字用户清单 | **(D)** S:16 捕获记录有节点版本、运行环境、所属步；RD:35,44 给 remote run id 与模板 | 需明确 remote run id、最终实际环境/机器与 soroi 捕获的关联；模板名本身不足以在文档中解释每个实际机器来源 |
| 运行中可见已交回/仍写入产物（L:23） | **(D/A)** L 当前要求；RD:167 明说占位 | **(D)** RD:167；S:64,70,78,85 | status/tail 不等于产物进度/文件读取接口；网络层、远程批次推送和 live volume 读取仍只是假定 |
| 结束后可浏览工作目录（L:24） | **(U+A)** U6 自动全拷回；`ab258ad5` 明确“整个 volume”满足浏览 | **(D)** RD:74；RR:40-41 | 文件交付主路径明确；浏览 UI/索引属调用方，不归 remote |

### 需要高层设计负责人接续的具体缺口

1. **(U+A+D) 远程 Program 可执行载荷的对接没有闭合。** U10 直接要求处理依赖和 TS 目标执行；A4 有 runner/bundle 想法；E:76 与 RD:75 没写完整的交付单元、依赖约定、入参解码、标量/File 返回、运行环境系统依赖。记录缺口不代表必须恢复早期 Bun.build 提案，也不代表 remote 负责语言运行时设计。
2. **(U+D) 独立组件归属的表述有误读风险。** U15 明确 remote 不属于 soroi；RD:5 正确说自己不知道 soroi。SO:5-17 将它放在“soroi 的组成”的执行层表中，却没当场注明是外部独立组件。外部依赖列在组成表不必然矛盾，但领导设计应保持用户的独立边界，不能把表头当所有权证据。
3. **(D) 模板环境可展示性没有完整说明。** L:10 与 L:50 要求环境能被指定、节点库能展示；RD:43 的 templates 只返名和说明，RD:81-88 的 backend 表没有一个通用的镜像/机器/设备/挂载说明视图。各模板可以表达这些并不等于客户端已有可读契约。它是产品接口缺口，不是要求新增一个缓存或第二个目录。
4. **(D) 产物实时进度的“可见”层次不清。** L:23 需要 live 产物；RD:167 直接占位。S:64/85 有远程推送，S:70 又说“结果在写回前对别处不可见”。可合理区分“可观察进度”与“正式可消费的值”，但当前文字未说明得足够明确；本报告不裁决二者实际矛盾，而标出需统一语义的边界。
5. **(U+D) 远程 Agent 的部署/发现及 transcript/工件/blob 路径仍未定。** 对标主 agent 与可唤醒是用户要求；SA:51,151-155 明确没有完成远程启动、部署、发现并列出存放待定。这不是 remote 的通用 volume 设计单独就能证明完成的工作。
6. **(U+D) 测试环境建议没有当前工作树部署方案。** 11 月 1 日 U 测试环境原话提供 homelab-tf VM 路径；RD/RR 描述 backend 与构建，并无小型 Slurm/Komodo 环境规格。本调查没有检查 IaC 仓库，由负责基础设施调查者给出当前可用资源，不推断已有或新建。

## Open questions

这些是交给拥有设计权的领导团队/Argon 的边界问题，不是要求再次询问用户，也不是本调查自行定方案。

1. **(U+A+D) soroi 侧远程 Program 交付什么实际可执行单元？** 满足 U10 的依赖与目标执行要求、E:76 独立节点文件以及 RD:75 通用命令边界即可；runner/bundle/依赖镜像的具体选择仍需明确归属。不要把早期 assistant 的 bundle 方案误认用户已批准。
2. **(U+D) 环境模板的设备/镜像/实际机器信息由哪个接口提供给节点库与来源链展示？** 保持 remote 唯一模板目录；L:10,22,50 与 RD:43,79-88 之间还缺读取契约。不能因为 UI 需要显示就在 soroi 另造一份权威目录。
3. **(U+D) remote job 与远程 Agent session 的连接锚点是什么？** remote run id 管作业，AgentRegistry 管 agent 状态；SA:19,31-36,153-155 与 RD:35 的关系尚未具体落到远程启动/唤醒/记录路径。应维持两种生命周期，不能混成“remote 状态就是 agent 状态”。
4. **(D) live 文件/批次进度由独立网络层提供的最小接口是什么？** RD:166-167、S:64,70,85,107 都保留占位；要区分可观测进度和可被下游消费的正式值，不增加中央实时写库以绕过 U12。
5. **(U+D) Slurm 后续实现/测试的阶段安排如何与 Komodo-first 范围结合？** U14 明确先 Komodo且保留抽象；11 月 1 日用户推荐 Slurm+Komodo 小环境。既不能永久忽略 Slurm，也不能宣称最新一句已经明令要求立刻实现其全部模块。
6. **(U+A+D) “执行底座”还缺的是哪个实际运行职责？** U3 要求捕获不在 Effect 中；A1/A2 把它解释为副作用求值器；SO:17 仍无设计链接。需要明确本地求值器、soroi 远程 Program 适配器、独立 remote 各自职责，不应因同属执行层合并所有权。

### 未做事项

本次仅调查 session 与当前文件，未读取 git 历史或 GitHub issue/PR 历史，未修改 repo、omp 配置或外部状态，未运行 build/test/runtime 验证。README 的 implemented/CI 叙述仅标 D；本报告没有用历史 assistant 测试宣称代替 R 证据，也没有将 hash 验证作为证据。
