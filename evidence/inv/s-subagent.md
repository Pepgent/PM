# Soroi subagent：会话意图、当前实现与设计缺口调查

## Evidence / scope

本报告为只读调查，覆盖 2026-10-29..2026-11-01 相关会话及当前工作树；没有修改仓库、配置或外部状态，没有读 git / GitHub issue / PR 历史，没有运行测试。下文所有时间按会话 timeline 的 **+09:00**；原始 entry 的 UTC 时间可由链接核对。

证据标记：**(U)** 用户本人原话，作为意图依据；**(A)** assistant / agent 的解释、选择或完成声明，不能替代用户授权；**(D)** 当前文档或当前源码静态事实（源码明确写为 source）；**(R)** 会话中保存的实际工具 / runtime 输出。历史 R 只证明当时被运行的代码，**不证明当前工作树已重新验证**。没有使用 hash 作为行为或交付证据。

路径简写：
- `P/` = `/Users/mouriya/Ext/code/pepgent/pepgent-omp-soroi-subagent/`。
- `S/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`。
- `Design` = session `01a18e1f-5cf2-7281-bf9a-03d102b315ba`，重构 Harness 设计。
- `Remote` = session `01a18e3a-ce1a-72bf-9efc-189705cf936e`，远程运行设计。
- `Impl` = session `01a18f4a-a79c-77de-b951-7efecf85ac21`，实现插件式 Subagent。

发现方式：`session://find?text=subagent&max=80`、`…?text=omp-soroi-subagent&max=30`、`…?text=服务发现&max=30`，以及 `session://type/user/projects/-Ext-worktrees-redesign-ff0716f/2026-10-3*/*/timeline` 的主题检索。关键设计和实现发生在 `redesign-bf9de1c` worktree，不在插件 cwd 下；按 `.cwd|contains("soroi-subagent")` 查询元数据未返回会话，因此没有把“插件 cwd 没命中”误写成没有实现会话。（R：上述 session 查询输出。）对 soroi 项目 10-29/30 user timeline 的关键词搜索没有额外命中；本报告不据此声称所有相关历史都穷尽。

## 1. Decisions

### 1.1 Pivot 先确定：捕获是插件行为，远程只改变运行位置

**(U)** Design [#2d861491，10-31 02:33:44](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/2d861491)：
> 而，eval启动的是omp自己的subagent，所谓的捕获和记录，本质上只是omp里所需要的自定义插件罢了，你想过这一点吗

**(U)** Design [#f78895ee，02:34:38](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/f78895ee)：
> 而workspace，本质上，就是，把ai放到另一个机器上跑，至于说这个机器是容器还是别的什么东西根本就不管

**(U)** Design [#49e6867a，02:43:29](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/49e6867a)：
> 而，agent的捕获，是纯粹的 自动以工具行为，就比如subagent在omp中必须调用yield返回给主agent信息。那么自定义工具，直接接受subagent给的文件路径，就等于捕获运行时产物，而这个类jotai的中间件，自己完成整个传输和管理部分。

这里用户当时以 `yield` 为已知例子说明**工具调用捕获**，并不是决定继续使用 yield；后续 04:44 明确决定重写 subagent，原因之一就是 yield 不符合需要。不能拿早期例子覆盖后面的决定。（U：见 1.3；D：`S/design/eval.md:83-96` 当前明确交回结果和文件路径，传输由中间件负责。）

### 1.2 主 agent 定制、生命周期、部署与发现是要求，不是可有可无的远端变体

**(U)** Design [#9c291fe2，04:12:48](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2)：
> 然后，接下来是一个关于远程agent运行的问题，首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起，而，omp的subagent实际上是启动了完整的进程并通过rpc沟通，中间有一个抽象层，如果远程agent搬走，完全不控制subagent，只改连接方式变成远程连接，远程启动，是生是死全部遵照omp既有的生命周期，那么这个实现非常好做，只需要补充，部署，服务发现，而这个实现实际上之前做了个半吊子，在https://github.com/mouriya-s-lab/oh-my-pi/issues/1，这个做错了，后来我纠正了，但是因为这个会大幅度改变omp所以让fork难以维护丢掉了。但是对于soroi来说，实际上我们不太需要一直跟随上游版本，所以这个实现得重新设计并加回来，这是一个调研阶段的东西，也是产出文档

**重要分离：** 这段里“omp 内置 subagent 已经是独立 RPC 进程”是用户当时对现状的判断，后来调查推翻的是这个**事实前提**，不是用户的目标：远端对标主 agent、只有启动 / 连接位置不同、生命周期沿用、补部署和服务发现。当前 `S/design/subagent.md:55-61` 解释内置实际上在主进程内创建 AgentSession。（U + D。）

### 1.3 不选 pi，重新实现 omp subagent；需要唤醒很久以前死掉的 session

**(U)** Design [#48f112ff，04:36:15](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/48f112ff) 曾提出 fork pi 的替代；[#0a73f18a，04:37:51](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/0a73f18a)：
> 或者还有另一种，那就是重新实现一个omp subagent

**(U)** Design [#678fe41a，04:39:09](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a)：
> 这两种方法都是要对核心机制大改，pi实际上有一个问题所以我不想用他，pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理，而soroi的工作流程肉眼可见的可能会唤醒一个早就死掉的session

**(U)** Design [#c1ef8567，04:44:03](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/c1ef8567)：
> 而omp内置的subagent必须走yield还和我们的需求不太符合，那就这么决定，重新实现subagent，文档该重写的重写

当前设计已保留这三点：`S/design/subagent.md:9-10,19-20`。（D。）

### 1.4 任意 agent 对 GUI 可见；RPC 需要只读多路复用；人工接管走可识别来源的 IRC

**(U)** Design [#2dbf970b，04:40:40](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/2dbf970b)：
> 而还有一个问题是，如果重新实现subagent，那么对于gui来说可见任意的agent更好做了，因为本来就是rpc启动的，而rpc实际上本来就要额外做只读层面的多路复用

**(U)** Design [#7bfe3696，04:42:56](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7bfe3696)：
> 而实际上做人工接管也是可以的，因为omp的subagent语义里一切都是irc，所以irc可以知道来源是主agent，而irc可以是一条普通的user prompt，所以可以派对，乃至被人类编辑

“派对”按原文保留，不擅自修正为另一词。来源可辨、GUI 可见、只读多路复用是明确意图；具体 TUI Agent Hub Enter 是否必须支持，用户没有单独裁决。当前 `S/design/subagent.md:21-22` 保存 IRC 与多读方要求；人工接管细节现放 `S/design/intervention.md:27-29`，不是应在 subagent 文档里重复实现整个人工介入层。（U + D。）

### 1.5 另一个会话已明确“独立网络层 + 中心化 omp RPC 多路复用器”

**(U)** Remote [#09e1cc92，04:53:33](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92)：
> 首先，文件是需要走自动生成的volume，至于运行的时候怎么映射路径，那是运行时说了算，也就是构建容器模板的时候可以提前写好，运行时被覆盖，到时候创建临时的volume，然后全自动的把文件拷回来，只要能做到这个标准oci行为就不存在你说的文件怎么进出的问题，容器随便删，临时volume也能删。然后怎么连回来soroi，应该是在独立的网络层中，有中心化的omp rpc多路复用器，怎么实现怎么干的你别管，反正在一个网络里，这也应该是oci标准行为，而不需要其他能力

这比 subagent 当前文档末尾的“事件流的只读多路复用先假定能工作”更具体：用户已给出**网络层独立、中心化 RPC 复用器**的组件形态，但没有给具体实现。（U；D 对照：`S/design/subagent.md:157-163`。）

**(U)** Remote [#3afc3fb6，05:01:28](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6)：
> 然后还有一点，remote实际上是单独的程序

不能把 remote 调度程序、subagent 插件和独立网络层混成一个组件；本报告只记录边界，不设计其接口。（U；当前 subagent 对照见第 4 节。）

### 1.6 限制是“远程 agent 不再开远程 agent”，不是用户禁止所有本地嵌套

**(U)** Design [#5a37a640，08:25:02](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640)：
> 你以为这样改就能了事？从store拷入运行环境都来了，eval禁止递归嵌套，eval永远只有中心主机能运行

**(U)** Design [#3dbd0473，08:27:31](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/3dbd0473)：
> 到底为什么要ducklake，是为了远程的agent准备的，你到底写的什么鸡巴东西，远程agent爱怎么执行怎么执行，但是不允许再接着开远程agent

当前 `S/design/eval.md:165-168` 正确保留这一层远程限制。插件当前做成所有 child 均无 soroi_task，是更窄的实现，不是这段话本身直接授权的等价规则。（U + D：`P/src/index.ts:27-34`、`P/src/main/index.ts:28-31`、`P/README.md:77`。）

### 1.7 最后的明确技术约束：纯插件、生命周期与 IRC 全方位对标、不谈版本一致

**(U)** Impl [#6294d758，09:10:21](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/6294d758)：
> 给pepgent开omp-soroi-subagent仓库，然后去实现subagent

**(U)** Impl [#f488be08，09:12:17](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08)：
> 不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯

这条晚于 Design 中“可能大改核心 / fork 不必一直追上游”的讨论，约束实施方式为**只做插件、不改核心**。当前 `S/design/subagent.md:11-12` 已正确更新。使用某个版本做历史测试不等于新增版本绑定契约。（U + D。）

## 2. Implementation status

### 2.1 当前工作树实际包含什么（source，不当作 runtime）

| 能力 | 当前源码事实 (D) | 历史 runtime (R) / 限制 |
|---|---|---|
| 独立本地 RPC 进程 | `P/src/main/supervisor.ts:230-285` 用同一 `process.execPath --mode rpc --session …`；`P/src/main/rpc-process.ts:53-69,94-130` 是 Bun.spawn + stdin/stdout JSONL；`P/package.json:13-16` 注册扩展入口 | 历史 PID / argv 实证，见 2.2。**当前 runtime 未运行** |
| 插件角色 | `P/src/index.ts:14-34` 按环境选择 Main/child；`P/src/protocol.ts:13-21,68-72` 定义身份环境变量、host URI scheme 和 soroi_return | 主 / 子同一入口；不是另一 daemon 的实现 |
| 主侧身份与 lifecycle | `P/src/main/supervisor.ts:115-138,177-189,288-305` 接入内置 AgentRegistry / AgentLifecycleManager；aborted reopen 删 tombstone，adopt RPC reviver；`.soroi.json` 保存 launch 配方；`:525-533` | park / revive / root resume 有历史证据。主侧 live runtime Map 是 bookkeeping，不是另造四状态 authority；见源码 `:211-222` |
| 冷复活 | `P/src/main/supervisor.ts:118-138` 拦截 ensureLive，辨认 sidecar 后 adopt；`:225-260` 重启并读原 transcript；`:509-533` 落 session header 与 sidecar | 根进程 resume 后能收到老 Alpha 回复；不等于支持远端 JSONL、远程 cwd、工件搬运 |
| parent / peer IRC | `P/src/main/agent-session.ts:161-170` 把 IRC envelope 发为 RPC prompt；`P/src/child/index.ts:43-47,83-123` 经 input hook 回内置 deliverIrcMessage，绑定真实 id/parent，外部 agent/history 请求转回 host；`P/src/main/supervisor.ts:351-389` 主侧调用原 URL router / WaitTool | 双向、兄弟、busy-parent steer、broadcast 有历史证据；不是完整 GUI 人工编辑 / 撤回链路 |
| host tool 交回 | `P/src/main/supervisor.ts:248-252,331-348,459-470` 注册 host tool；schema **只有 result:string**，写 `<id>.md` 并完成父 job `:426-429` | 文本结果交回历史通过。**没有结构化文件路径捕获接口**，不能算完成 eval 的 Agent capture 契约 |
| 非工具 fallback | `P/src/main/supervisor.ts:309-328` 未调用 soroi_return 时把 lastAssistantText 发出去；`P/README.md:21` 明写 fallback；`P/src/main/index.ts:9` 工具说明同样允许 | 与工具文案“only result channel” (`supervisor.ts:463,492`) 及 `S/design/eval.md:86` 唯一交回工具语义存在冲突。没找到用户授权这个 fallback |
| task job 与 cancel | `P/src/main/supervisor.ts:398-423` 用 root asyncJobManager 注册 parent-owned task；cancel 把当前 turn 置 none 并 abort，不终结 agent 身份 | `proc://Sleeper/kill` 历史取消成功，之后可继续 IRC。**不要与 RPC cancel_subagent 混淆** |
| child 定制 | `P/src/main/supervisor.ts:155-172,263-285,536-557` 解析 agent definition 的第一 model、thinking、tools、systemPrompt；承接 env、父 --config overlay；显式 `--no-context-files --approval-mode yolo` + child config | 传参、prompt marker、配置 self-report 有历史证据；未证明所有插件、模型 fallback、全部设置 / MCP 均与父等价，见 2.3 |
| 一写多读 | `P/src/main/agent-session.ts:128-154` 镜像 messages + Set listeners，进程内 subscribe fan-out | 只证明本地 adapter 有 subscribers；没有外部 GUI 网络订阅 / 任意进程可见的端到端证据 |
| Hub | `P/src/main/agent-session.ts:86-101` 明确拒绝聚焦，抛人类可读原因；`:186-189` 两个 idle UI housekeeping 空方法 | 列表、park/kill 可见；Enter 后留 Main，已观测。不应说“完整支持 Hub” |
| 嵌套 | child 只 installChild，不注册 soroi_task：`P/src/index.ts:27-34`；Main 工具另检查 MAIN_AGENT_ID：`P/src/main/index.ts:28-31` | **所有 soroi 子进程都不能再开 soroi 子进程**；child 仍可有原生 in-process task (`P/src/child/index.ts:58-60,98-102`) |
| shutdown | `P/src/main/index.ts:57-64` dispose 所有 RpcAgentSession，含未 settle / 未 adopt 的 child；`rpc-process.ts:85-91` 关 stdin 并等进程退出 | 历史每轮 driver close 后进程输出为空；不是远端失联生命周期证据 |
| 远程启动 / 部署 / 服务发现 | 完整 launch 路径固定本机 execPath、cwd、env (`supervisor.ts:230-285`)，transport 固定本地 Bun.spawn (`rpc-process.ts:53-61`)；公开 spawn schema 只有 context / task / name / agent (`main/index.ts:16-19`) | **未实现**。`S/design/subagent.md:51` 和 Impl 结束声明一致。没有 host selection、remote transport、部署产物或可启动主机登记路径 |

### 2.2 可直接引用的历史 runtime 证据

以下不是 assistant 总结，而是保留的真实工具结果。历史命令的 `/tmp/soroi-e2e/drive.ts` 已是当时一次性测试驱动；**不能承诺今天该命令还能复现**。当前仓库只有 `check: tsc --noEmit` (`P/package.json:18-20`)，没有把这些临时 driver 作为现存验收设施。（D + R：Impl [#e9189669 / #50c3caff 结束阶段](session://01a18f4a-a79c-77de-b951-7efecf85ac21/timeline?type=say&since=2026-10-31T1227) 说明清理。）

1. **最终主路径 driver：** 命令 `bun /tmp/soroi-e2e/drive.ts all`，完整后台完成输出在 Impl [#e09ef28b，11:36:02](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/e09ef28b)，未截断关键行在 [artifact 74 raw:5-24](session://01a18f4a-a79c-77de-b951-7efecf85ac21/artifacts/74:raw:5-24)。（R。）
   - spawn Alpha PID `20209`；async-result 交回 `391`；`Alpha.md="391"`，sidecar=true。
   - argv 为真实 Tern omp `18.14.1 --mode rpc --session …/Alpha.jsonl`，带 overlay、plugin entry、model、no-context / yolo。
   - Main 收到来自 Alpha 的 `PONG-7`，保留内置 IRC 来源模板。
   - park 前有 PID，45 秒后 `3-after-park-processes:""`；唤醒后收到 `REVIVED-3`，新 PID `20486`。
   - transcript `sameFile:true,prefixKept:true`，内容长度 17933→20400；header session id 仍为 `01a18fce-a180-7263-abcb-db210c2497c3`。这是内容 / 会话连续性输出，不是 hash 证据。
   - 兄弟 relay 观测明确有 Alpha→Beta 与 Beta→Alpha；Main 收到 `SIBLING-OK`。
   - close 后 `processes:""`。
   - 同一个结果里 **get_subagents 一直是空数组，cancel_subagent 返回 cancelled:false**。步骤名虽然叫 `5-after-kill` / `5-irc-after-kill-revive`，实际该步骤没 kill 成功，不能拿 `AFTER-KILL-5` 当 kill→revive 证明。

2. **busy、broadcast、agent definition、job cancel：** 命令 `SOROI_OVERLAY=/tmp/soroi-e2e/overlay-long.yml bun /tmp/soroi-e2e/drive.ts extra`，完整结果 Impl [#29222951，11:28:08](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/29222951)。（R。）
   - Busy 收件回执 `outcome:"injected"`，结果含 `DONE-SLEEP STEERED-8`。
   - Main broadcast `3 of 3`，Alpha / Echo / Busy 均回；child broadcast Main 收到 `broadcast:true`，Echo / Busy 回 Alpha。
   - Echo argv `--tools read,bash,write,wait`；结果含定义 prompt marker `AGENT-DEF-MARKER-42`。
   - **但 Echo 自报的完整工具列表仍有 delete、fork_task、ask、todo、playbook 等扩展工具。** 因而证据只能说内置工具参数受限，不能说“所有工具严格只剩四个”。
   - cancel Sleeper 后 job `cancelled`，`doneDelivered:false,sleeperMd:false,sleeperProcess:true,jobNotices:[]`；后收到 `SLEEPER-ALIVE`；transcript aborted=true。

3. **真实 TUI 的 park / kill / tombstone / revive：**
   - Impl [#121cb570，11:11:03](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/121cb570)：Agent Hub 显示 Delta `parked`。
   - [#ad43d0ab，11:11:24](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/ad43d0ab)：按 x 后 Hub 显示 `aborted`。
   - [#6c97e49e，11:11:44](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/6c97e49e)：磁盘 glob 有 `Delta.jsonl.tombstone`。
   - [#b640f6a4，11:12:22](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/b640f6a4)：给 Delta 发 IRC 后 TUI 显示 `Delta revived`，主会话继续，并出现 task 结果；输出里被测 Main 文本报告收到 `KILL-REVIVED-9`（这部分只是被测 agent 的叙述，单独看不等于抓到 IRC 原始帧）。
   - [#1ef7193d，11:12:30](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/1ef7193d)：同目录 glob 已没有 tombstone，保留同名 JSONL / MD / sidecar。（R，证据合起来比错误命名的 RPC 步骤可靠。）

4. **主进程重启后找回：** `bun /tmp/soroi-e2e/drive.ts restart`，Impl [#e0893c40，11:36:21](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/e0893c40)：root 重启后收到来自 Alpha 的原始 `irc:incoming`，正文 `AFTER-RESTART-7`，close 后进程为空。前后 `get_subagents` 仍为空。（R。）

5. **child config：** `bun /tmp/soroi-e2e/drive.ts config`，Impl [#c53f0246，11:18:43](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/c53f0246)：父收到 child IRC `CONFIG personality=none (--config overlay) ttl=25000 (--config overlay)`。这证明配置查询结果经真实 child 返回；没有证明完整父 settings 的实时穿透。（R。）

6. **Hub 聚焦限制已真实触发，不只是 README 猜测：** Impl [#4f7af0cd，11:33:22](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/4f7af0cd) 的 TUI 显示拒绝提示 `Soroi subagent Focus runs in its own process and cannot be shown in the main view…`；随后 [#df81c2c5，11:33:48](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/df81c2c5) Main 照常回复 `MAIN-OK`。（R。）

### 2.3 没有被这些证据证明的东西

- **当前树运行正确性**：本次 assignment 是调查，不启动进程 / 测试。所有“已实测”均限定历史运行，不把文件相似或文档相同当成当前验证。（R 范围说明；D 当前源码见 2.1。）
- **完整定制 parity**：历史测试证明命令参数、prompt marker、personality / TTL、部分扩展存在；没有逐项证明父 runtime 新增的 extension / host tools、MCP、profile、设置变化均被子进程对齐。当前 argv 只显式转父 --config overlays 和本插件 -e；不能由“同 binary、同 env”自动推导所有定制来源相同。（D：`P/src/main/supervisor.ts:263-285,542-557`；R：2.2-2 / 5。）
- **GUI 任意 agent 可见 / 人工接管**：内部 listener fan-out 不等于外部只读多路复用器已实现；root RPC `get_subagents` 反而实测看不到 soroi agents。没有实际人类来源标记、待投递消息编辑 / 撤回、远程 GUI 订阅证据。（U：1.4-1.5；D：`P/src/protocol.ts:57-66` 只带 from/to/body 等通用字段；R：2.2-1 / 4。）
- **文件路径捕获 / file bytes / store**：soroi_return 目前仅 Markdown 字符串，未观察路径收集、中间件取回、store 记录；不能把 `Alpha.md` 的文本结果文件当作完成所有 Agent 运行产物捕获。（D：`P/src/main/supervisor.ts:426-429,459-470`；`S/design/eval.md:86,94`。）

## 3. Rejections and abandonment

### 3.1 用户明确拒绝 / 修正

| 对象 | 证据与结论 |
|---|---|
| 原外部控制面 / launcher + interpreter 式思路 | **(U)** Design [#6b25e5f7，02:30:39](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/6b25e5f7) 说明旧设计把 agent 当不可侵入黑箱，需要外层 daemon + 弱语言；[#28767d47，02:32:46](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/28767d47) 指出 eval + 包调度下原 preset 流转不再有意义。对本 slice 的含义是不要再由 subagent 插件重造一套 workflow / 生命周期控制面 |
| 远端自己有另一套模型 / 配置 / 生命周期语义 | **(U)** #9c291fe2 要求主 agent 定制与既有 lifecycle；**(D)** `S/design/subagent.md:139-149` 把旧远程方案的远端自治、prepare/start、租约等列作作废原因。后者是文档总结，不独立证明每条都曾被用户逐项拒绝 |
| pi 替代路线 | **(U)** #678fe41a 明确“不想用他”，因为缺状态管理且会唤醒早死 session；最后 #c1ef8567 选择重写 omp subagent |
| 继续走 yield | **(U)** #c1ef8567 明确与需求不符；**(D)** 当前 child prompt `supervisor.ts:492` 禁止 yield |
| 为实现改 omp 核心 | **(U)** Impl #f488be08：“不可以改omp核心，必须只能是插件” |
| 主 / 子版本对齐、版本规划 | **(U)** 同 #f488be08：“乃至不考虑版本问题，只考虑rpc模式能正常通讯” |
| 远程递归调用 / 远程再开远程 agent | **(U)** Design #9552d5c5（08:21:03）拒绝“远程的远程的远程”；#5a37a640 和 #3dbd0473 给出中心 eval / 单层远程边界；不应扩大成用户禁止一切本地 nested agent |

**旧 fork 尝试的状态须降格报告：** 用户在 #9c291fe2 亲口说之前“做错了”“让fork难以维护丢掉了”，足以证明该路线已弃。（U。）当前文档 `S/design/subagent.md:141` 还列了具体关闭 PR 数 / 文件统计，这是 **D**，本次禁止读 GitHub / git 历史，未独立核实这些数字，也不把它们当新实现依据。

### 3.2 实现者放弃 / 缩小，不是用户明确拒绝

- **Hub Enter、nested soroi spawns**：实现者提问后得到工具结果 `hub_focus: (timed out: the user did not answer; decide it yourself with your best judgment)`，nested_spawn 同样 timeout。（R：Impl [#57bc79eb，10:33:14](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/57bc79eb)。）最终选择不支持是 assistant 决定；问题选项把 no nested 与 no remote recursion 当成一致，这是 **A** 推断，不是 U。（A：同 entry 的问句 / 选项；Impl [#50c3caff，12:28:27](session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/50c3caff) 自认“问过你，没得到回答…没做”。）
- **远程启动、部署、发现**：Impl 完成声明明说“都没有做”。这是 **A** 实施范围缺口，未找到 U 将其取消；原要求仍在。（A：#50c3caff；U：#9c291fe2；D：当前本地-only launch 与设计 :51。）
- **root RPC 子 agent 总线可见性**：已实际观察为空 / cancelled:false，然后记录为 extension 拿不到 core bus。是已确认限制，不是用户放弃 GUI 可见目标。（R：#e09ef28b / #e0893c40；A：#50c3caff；U：#2dbf970b。）
- **复活实现策略的废弃**：最早拦截 persisted-reviver setter / 为躲延迟加载加快捷键；交互模式时加载时序不成立，后改为包装 global ensureLive，删快捷键。当前 source 确认最终方案。（A：Impl #880735ef / #d3abf3cd，11:06:54 / 11:07:36；D：`P/src/main/supervisor.ts:115-138`；R：随后 TUI park / kill 路径。）
- **Hub 完整渲染模拟**：早期按 Enter 失败，最终 guard 在需要 pending-tool-results 时拒绝并回滚 Main；这不是实现了 live focus。（A：Impl #851b49dc / #3d79b786；R：2.2-6；D：`agent-session.ts:86-101`。）

## 4. Gaps vs `S/design/subagent.md`

### 4.1 文档与用户意图 / 跨组件契约之间的缺口

1. **独立网络层 + 中心化 RPC multiplexer 未进入实质组件边界。** 文档 `:22` 说多读方，`:157-163` 仍仅占位，没有记下用户在 Remote #09e1cc92 已明确的网络层形态；不是还要用户从零决定是否存在这个组件。（U + D；见 1.5。）
2. **远程单层限制在 eval 文档有，但不能解释成插件 blanket 禁止嵌套。** subagent `:50` 只陈述做不到，未区分 local nested 与 remote nested，也未说明该范围选择无用户回答。应把它读成实现缺口，而不是既定领域约束。（U #3dbd0473；D `S/design/eval.md:167` / subagent :50；R ask timeout #57bc79eb。）
3. **“唯一交回工具”与 fallback 的冲突没有被文档揭出。** subagent `:20` 要结果经交回工具；eval `:86` 写唯一通道；当前源码 `#settleTurn` / README 却允许 final assistant 文本自动交回。child prompt 又自称 only result channel。已有文档的“交回工具实现完成”范围过于模糊。（D：`P/src/main/supervisor.ts:309-328,459-470,492`、README :21；U：工具捕获与替换 yield 的 1.1 / 1.3。）
4. **交回工具只有 result 字符串，没有 paths。** subagent `:20` 链接 eval 的捕获来源，却没说明当前 soroi_return 与 eval 需要“结果 + 文件路径”的差距；仅 `<id>.md` 的文本结果不足以满足运行产物捕获。（D：`S/design/eval.md:86,94`；`P/src/main/supervisor.ts:459-470`。）
5. **人工接管的来源 / 编辑契约未与 subagent transport 对上。** 它应继续由 intervention 层拥有，不应复制整章；但 `S/design/intervention.md:29` 的人类来源标记、消息撤回编辑与当前只转发通用 IrcMessage 的插件没有接口证据。（U #7bfe3696；D `P/src/protocol.ts:57-66`、child :43-47；无对应 R。）

### 4.2 文档已诚实承认、仍必须保留为未完成的实施项

- **Hub 聚焦不支持**（`:48`）：历史真实触发；只保住 Main 可用不是支持 focus。（D + R 2.2-6。）
- **root RPC host 看不到 soroi agents**（`:49`）：get_subagents 空数组、cancel_subagent false 有直接证据，阻断现成 GUI 基于 root subagent stream 的可见路径。（D + R 2.2-1 / 4。）
- **nested soroi 不支持**（`:50`）：source 明确，但来源是 A 的 scope 选择，不是 U 禁令。（D + A + R timeout。）
- **远程启动、部署、发现都未做**（`:51`）：要求 `:16,23` 依然成立，不应因为本地主路径通过就把整项标完成。（D；U 1.2。）
- **远端 transcript / artifact / blob 放置、部署形态、发现来源**（`:151-155`）：确实没有落地；网络层形态已部分有 U，但精确存储 / transfer / discovery 接口在本 slice 证据中仍未解决。（D + U 1.5。）

### 4.3 实现 / 验证叙述需要精确限定

- 文档 `:38-44` 的“本机在 18.14.1 E2E”有历史 R 支持，但不是现树重新验证。主路径 driver 的 named kill 步骤实际上 `cancelled:false`；真正 Hub kill 证据来自另一个 TUI 路径，二者不能混用。（R 2.2-1 / 3。）
- `:40` 把 agent 定义的模型、工具、提示词并写为生效：现有 R 显示 prompt marker 与 argv，测试定义的 model 与父相同；严格不同模型选择、thinking、生效后的完整 tools 集合并未被独立证实。扩展工具仍在 Echo 的报告中。应区分 launch 参数映射与完整定制 parity。（R #29222951；D supervisor :166-171,280-284。）
- `:36` 写“设置…各自加载”而 `:107` 设计依据说主侧当前有效设置，当前实现没有把主侧内存中的全部有效设置通过 RPC 同步，只有子本机加载 + overlay/env。源码是明确方案，完整等价仍无证据。（D `P/src/main/supervisor.ts:263-285,542-557`；R config 只测 personality/TTL。）
- 文档 `:27` 的“不另建…生命周期”与实际主要使用 core lifecycle 一致；但 cold revival 靠插件覆盖全局 ensureLive，不是公开 RPC 天然提供的跨进程 agent。应把这个接入点和 structural cast 事实视为维护边界，而非“仅用标准 RPC 即全兼容”的证据。（D supervisor :115-138、`agent-session.ts:237-248`。）
- `:5,53-137` 的旧源码基线与最终运行版本分开写是正确的；不能把文档版本字符串解释成用户要钉版本。用户明确反对考虑版本问题。（U #f488be08；D doc :5,12,38。）

## 5. Open questions / unresolved evidence

这些是交给父 session / 意图裁决者的未决契约或证据位置，不是向用户索取已提供信息，也不是本报告自拟架构。

1. **两个“交回工具”如何成为同一条 Agent 捕获结果路径？** 目前 subagent 的 soroi_return 只给 Markdown；eval 契约是宿主执行、结果加文件路径、唯一通道。两者的统一接口不在当前插件里；fallback 是否必须删除，需要以已明确的唯一通道意图裁决，不能默认为合法。（U 1.1 / 1.3；D eval :86,94，source :309-328,459-470。）
2. **GUI 可见性的交付位置：** 网络层独立、中心化 multiplexer 已有 U；但它与 plugin 的 subscriptions、root RPC 缺失的 subagent 帧、冷 transcript 读取之间的具体跨组件接口，仍没有这份源码或本 slice 会话的已实现证据。（U #09e1cc92 / #2dbf970b；D adapter :128-154；R root roster 空。）
3. **完整 parity 的边界：** 用户明确 lifecycle / IRC 全方位对标，也要求主 agent 定制；Hub focus 和 local nested 是否属于“最小功能”不可仅根据当时的超时自行缩小。远程 nested 禁止是明确规则；local nested 没有相同 U 禁令。（U #f488be08 / #3dbd0473；R #57bc79eb；A 完成声明。）
4. **remote 正式运行的数据与存活会话记录不是同一对象：** 用户要求远端本机写、完成后拷回，且要唤醒早死 session；当前 source 的 sidecar / JSONL / cwd 都是本地主机路径。远端长生命周期 transcript、工件、blob 如何让主侧读到和继续打开，需要跨 store / network / remote 的接口裁决，不能由这个本地插件的成功测试推出答案。（U Design #8e0a7e8f 05:35:38、#678fe41a；D `S/design/subagent.md:92,109,153`、当前 launch source。）
5. **部署 / discovery 对标如何取材：** 用户已说必须有带相同定制的 omp 和服务发现；具体 host registry 来源、部署形态仍仅文档待定，插件没有实现。不能从本地 SSH 别名或 broker 列表推断“可运行对标 agent 的机器”已登记。（U #9c291fe2；D `S/design/subagent.md:119-137,154-155`。）
6. **哪些历史测试可作为当前验收输入而非当前通过结果：** 现存证据可用于编写验收路径：本地 spawn / host return、父子 / 兄弟 / busy IRC、广播、park / same-file revive、Hub kill / tombstone、root resume、cancel job、Main 不因聚焦失败崩溃；当前树尚未重跑，远程 / 多读 GUI / human edit / 文件捕获则本来就没有历史通过证据。（R 2.2；D 当前实现范围。）

### Bottom line

**(U + D + R)** 用户方向已经非常清楚：**omp 纯插件、每个 subagent 独立 RPC 进程、主侧沿用状态和 IRC、可复活旧 session、交回工具捕获、远程与本机只差启动 / 连接、另补部署 / 发现及独立网络复用层**。当前插件是有真实本地历史运行证据的实现，不是空仓库或被全部推翻的旧方案；但它**不是已完成的新 Soroi subagent 全部要求**。应保留已证实的本地主路径成果，同时把远程、网络多读可见性、文件捕获统一接口、人工 IRC 接管衔接，以及未经用户批准的能力收缩，明确列为未落地 / 待意图裁决，而不是把 assistant 完成声明当成用户设计的终点。
