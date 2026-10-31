# Soroi 2026-10-31 转向调查

## 读法、范围与结论

- **(R，检索范围)** 调查窗口按 session 展示的本地时区 **+09:00，2026-10-30 00:00 至 2026-11-02 00:00** 理解；相应创建时间检索下界是 `2026-10-29T15:00:00Z`。索引表保留元数据的 UTC 原始 `created`，正文引文用 timeline 的 +09:00 时间。因此核心 pivot 虽然元数据创建于 UTC 10 月 30 日，实际发生在本地 **10 月 31 日 02:23:38**。来源：`session://README:51-64`、`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/timeline?type=user`。
- **证据标记：** (U) 用户自己说的话，作为意图依据；(A) assistant/agent 的解释，只证明它曾这样解释，不升级成用户意图；(D) 当前仓库文档；(R) 实际检索/命令/运行输出。本报告没有执行程序验证，也没有用运行实验推断用户意图。session entry ID 只作定位，不作任何 hash 验证证据。
- **(U，中心结论)** 这不是把“AI 当函数”的目的换掉，而是用户否定了为弱、不可侵入 harness 建造**外部控制面 + preset/workflow 弱语言 + daemon 解释器/启动器**的实现方向，反过来借助强 harness（omp）的 eval、定制工具/插件、subagent 与状态管理完成同一目的。依据：`01a18dd4`，02:23:38 `#ca258d0d`、02:30:39 `#6b25e5f7`、02:32:46 `#28767d47`、02:39:59 `#003efe9e`。
- **(U，最新范围校准)** 到 11 月 1 日，用户明确说 Soroi **“本身相当于只是omp的扩展组件，离真正的pepgent还很远”**；Pepgent 是 AI4S 业务整体，不应把 remote、前端或所有平台缺口都塞回 Soroi。依据：`01a193fd-e992-76d2-8c29-060fe52cc094`，07:14:14 `#57d9d58b`。
- **(R，边界)** 只读 session；未读取 git log/show/blame/历史 diff，未读取 GitHub issue/PR 历史，未修改仓库或配置，未创建 GitHub 对象。旧架构细节使用窗口内的用户回顾和一个清楚标为 (A) 的旧文档大纲，不冒充查看过现已移走的旧文档正文。

## Session index

### 检索与复用说明

**(R，检索过程)** 使用了：

1. `session://sessions.jsonl` 按创建时间筛全机器 session，而非只筛当前 cwd；又查 `modified` 在窗口中、`created` 早于窗口且 cwd/title 相关的 session。
2. `session://find?text=soroi&max=100`、`session://find?text=AI4S&max=40`；较老的命中没有因为关键词相似就纳入本次设计证据。
3. `session://sessions.jsonl?q=select((.created >= "2026-10-29T15:00:00") and (.created < "2026-11-01T15:00:00") and ((.cwd|test("pepgent|redesign|soroi")) or ((.title + (.recap // ""))|test("soroi|Soroi|SOROI|AI4S|Pure<T>"))))|{sid,created,title,cwd}&compact=true`。
4. 对相关 session 读 `timeline?type=user`；只在需要旧文档概况时读一段 `type=say`。读 `01a164ea-d00a` 时加窗口时间过滤，避免把整个旧 session 误当新意图。

**(R，索引解释)** 下表列本次找到的相关 session，包括核心设计、宿主/组件调查、前后端归属、旧文档处理，以及 Soroi 实验 session。标题省略装饰性图标；start 是 UTC 元数据时间。cwd 是当前 session 元数据（一些 session 已在 10 月 31 日迁移），不是断言创建时就在该路径。所有行的 ID/start/title/cwd 都来自上面的 `sessions.jsonl` / `find` 输出，点链接可重读完整 timeline。

路径简写只为表宽：

- `S` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`
- `W` = `/Users/mouriya/Ext/worktrees/redesign-bf9de1c`
- `P` = `/Users/mouriya/Ext/code/pepgent/pepgent`
- `R` = `/Users/mouriya/Ext/code/pepgent/pepgent-remote`

### 核心与相关会话（每行均为 R：session 元数据）

| Session ID（可点击） | Start UTC | Title | cwd | 本次相关性/读取深度 |
|---|---|---|---|---|
| [01a164ea-d00a-775b-b980-592a744c9e2c](session://01a164ea-d00a-775b-b980-592a744c9e2c/timeline) | 2026-10-22 18:41:12.714Z | SSOT: 用 SSOT 重写 Soroi 设计 | S | 早于窗口开始，但 10 月 30 日仍有用户发言；只读窗口内用户内容，说明旧架构/文档问题，非新版来源。 |
| [01a18b7b-358e-71e2-b5b8-762fa37d5000](session://01a18b7b-358e-71e2-b5b8-762fa37d5000/timeline) | 2026-10-30 06:24:30.094Z | BLAME: Audit session blame-shifting onto SSoT | `/Users/mouriya/Ext/code/SSoT` | 对上行 Soroi session 的归因审计；读用户时间线，属前置背景而非新架构设计。 |
| [01a18d28-b015-7072-bf1d-3b74bf5712a1](session://01a18d28-b015-7072-bf1d-3b74bf5712a1/timeline) | 2026-10-30 14:13:36.405Z | BACKUP: Update rules to forbid history access | S | 旧文档备份与历史访问禁令；读用户时间线。 |
| [01a18d2b-9243-714e-9e5c-e01d0c7e6130](session://01a18d2b-9243-714e-9e5c-e01d0c7e6130/timeline) | 2026-10-30 14:16:45.379Z | DESIGN: Unify fragmented design documents | S | 转向前用户认为已有明确设计，但文档被 AI 弄乱；读用户时间线。 |
| [01a18d40-5b64-7400-8982-e315c2420732](session://01a18d40-5b64-7400-8982-e315c2420732/timeline) | 2026-10-30 14:39:27.588Z | SOROI: Implement Soroi from core design | S | 转向前实现请求；用户纠正“17 个模块”，强调文档/边界问题；读用户时间线。 |
| [01a18d61-dda3-7309-ae18-f0a967abab6c](session://01a18d61-dda3-7309-ae18-f0a967abab6c/timeline) | 2026-10-30 15:16:03.619Z | SPEC: 基于源码重研 Paseo 设计 | S | 转向前清理旧设计；读用户时间线及 01:57:47 assistant 旧文档总体大纲。 |
| [01a18dd4-e638-75ad-a5f3-f0537daf3896](session://01a18dd4-e638-75ad-a5f3-f0537daf3896/timeline) | 2026-10-30 17:21:42.456Z | HARN: 设计 Pure<T> 架构与评测测试 | W | **核心 pivot 原始发言**；读全部用户时间线。 |
| [01a18dd7-c0e0-723a-9dcf-eefcb79871f8](session://01a18dd7-c0e0-723a-9dcf-eefcb79871f8/timeline) | 2026-10-30 17:24:49.504Z | PLUGIN: Assess porting eval and subagents to pi plugin | `/Users/mouriya/Ext/code/oh-my-pi` | 宿主候选旁路调查：把 omp eval/subagent 搬到 pi 外部插件；读用户时间线。 |
| [01a18e1f-5cf2-7281-bf9a-03d102b315ba](session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/timeline) | 2026-10-30 18:43:02.514Z | HARN: 重构 Soroi Harness 设计 | W | 继承 pivot 前缀，新增 AI4S 原型、远程、宿主、store、介入边界等；读用户时间线。 |
| [01a18e3a-ce1a-72bf-9efc-189705cf936e](session://01a18e3a-ce1a-72bf-9efc-189705cf936e/timeline) | 2026-10-30 19:13:00.954Z | HARN: 保留 Komodo 多后端抽象 | W | 继承前缀后讨论独立 remote、三种后端、Pepgent/AI4S 归属；读 04:00 后用户内容。 |
| [01a18e8a-ba9d-76af-acd2-8e12765ec3e4](session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/timeline) | 2026-10-30 20:40:18.845Z | HARN: 实现 eval 插件系统 | W | eval/文件权衡、两阶段运行、用户纠错、omp 插件；读 05:30 后用户内容。 |
| [01a18ed5-5798-704f-aa9f-c28be4023631](session://01a18ed5-5798-704f-aa9f-c28be4023631/timeline) | 2026-10-30 22:01:48.696Z | EVAL: Weigh eval vs file tradeoffs | W | **重要的后续校准**：逐步写、逐个 Atom 消费，而非整份文件一次写完；读全部用户内容。 |
| [01a18efe-a680-7642-aff1-6f468cf2935e](session://01a18efe-a680-7642-aff1-6f468cf2935e/timeline) | 2026-10-30 22:46:55.872Z | SOROI: 重构 soroi.md 核心模型文档 | W | 文档边界纠正、否定 replay，并没有否定 dry run；读用户时间线。 |
| [01a18f11-0c14-74ba-b97b-32be012acc84](session://01a18f11-0c14-74ba-b97b-32be012acc84/timeline) | 2026-10-30 23:07:01.524Z | IMPL: 实现多后端运行管理业务 | R | remote 独立实现，用户指向 `01a18e3a`；读用户时间线。 |
| [01a18f14-e258-7501-aae9-f0d31ae8e5a5](session://01a18f14-e258-7501-aae9-f0d31ae8e5a5/timeline) | 2026-10-30 23:11:12.984Z | MAIN: 覆盖 main 分支提交 | S | 用户要求新分支覆盖 main；读用户时间线，不以此推断实现完成。 |
| [01a18f15-ee16-71bb-ae90-ba76d6d37225](session://01a18f15-ee16-71bb-ae90-ba76d6d37225/timeline) | 2026-10-30 23:12:21.526Z | FORK: Fork latest omp into Pepgent | S | **明确 fork omp 指令**；读用户时间线。 |
| [01a18f4a-a79c-77de-b951-7efecf85ac21](session://01a18f4a-a79c-77de-b951-7efecf85ac21/timeline) | 2026-10-31 00:09:56.892Z | SOROI: 实现插件式 Subagent | W | **最新宿主限制**：不能改 omp 核心，只能插件，生命周期/IRC 对标；读用户时间线。 |
| [01a19232-1c44-73ee-a77a-1ea7281a935e](session://01a19232-1c44-73ee-a77a-1ea7281a935e/timeline) | 2026-10-31 13:42:00.004Z | MERGE: Move AI4S-prototype to pepgent | S | Pepgent repo/session 迁移与原型移入业务 repo；读用户时间线。 |
| [01a192a2-8358-7559-bf46-e3ed6e387d73](session://01a192a2-8358-7559-bf46-e3ed6e387d73/timeline) | 2026-10-31 15:44:46.424Z | AI4S: 统一 AI4S 原型间距规范 | P | 业务前端实施、组件和主题；读用户时间线，仅用于定位业务工作所在，不审计前端完成状态。 |
| [01a193fd-e992-76d2-8c29-060fe52cc094](session://01a193fd-e992-76d2-8c29-060fe52cc094/timeline) | 2026-10-31 22:04:13.586Z | SOROI: 完成 Soroi 新版最小功能集合 | S | **11 月 1 日最新范围说明**，Soroi 是 omp 扩展组件、非完整 Pepgent；读用户时间线。 |

### 同窗口 Soroi 实验会话（每行均为 R：只索引元数据，未审计实验输出）

这些 session 证明找到了相关实验记录，不证明实验成功，更不替代用户意图。

| Session ID | Start UTC | Title | cwd |
|---|---|---|---|
| [01a18f96-7490-70c1-8acc-716168cdf8bf](session://01a18f96-7490-70c1-8acc-716168cdf8bf/timeline) | 2026-10-31 01:32:44.560Z | ANNEAL: Dry-run and run soroi anneal step | `/tmp/soroi-demo` |
| [01a18f9a-7780-7283-ba7b-c3174bb7d4b8](session://01a18f9a-7780-7283-ba7b-c3174bb7d4b8/timeline) | 2026-10-31 01:37:07.456Z | ANNEAL: Run soroi_eval anneal subagents | `/tmp/soroi-demo` |
| [01a18f9c-dd18-77ac-824c-fb9dd1647a45](session://01a18f9c-dd18-77ac-824c-fb9dd1647a45/timeline) | 2026-10-31 01:39:44.536Z | ANNEAL: Run anneal atoms across subagents | `/tmp/soroi-demo` |
| [01a18f9f-2176-729d-ad12-bd7059111021](session://01a18f9f-2176-729d-ad12-bd7059111021/timeline) | 2026-10-31 01:42:13.110Z | ANNEAL: Run soroi_eval anneal workflow | `/tmp/soroi-demo` |
| [01a18fa3-5f22-71df-8133-482011d8fe53](session://01a18fa3-5f22-71df-8133-482011d8fe53/timeline) | 2026-10-31 01:46:51.042Z | FORK: Run two soroi evaluation forks | `/tmp/soroi-demo` |
| [01a18fa5-22be-71b7-ad6a-5ab22f888b8a](session://01a18fa5-22be-71b7-ad6a-5ab22f888b8a/timeline) | 2026-10-31 01:48:46.654Z | SOROI: Test soroi atoms across forks | `/tmp/soroi-demo` |
| [01a18fa7-275b-7739-a01c-c61524e1c7f2](session://01a18fa7-275b-7739-a01c-c61524e1c7f2/timeline) | 2026-10-31 01:50:58.907Z | FORK: Test forked atoms in soroi run | `/tmp/soroi-demo` |

**(R，排除说明)** `01a0e289-fd58-7396-9020-ddc6868a5f20`（2026-09-27 11:04:49.240Z，`拷贝并解压 AI4S 实验室平台原型压缩包`，cwd `/Users/mouriya/Ext/code/pepgent/pepgent-doc`）因 metadata 的 modified 落在窗口而被检出，但 `timeline?type=user&since=2026-10-30&until=2026-11-01` 返回 **0 条**用户事件，因此不把它算作窗口内新设计讨论。另有旧 Pepgent/IaC session 因迁移而 metadata 更新，单凭 modified 不能证明进行了新讨论。

**(R，祖先重复提醒)** `01a18e1f` 的 timeline 包含 `01a18dd4` 的早先用户发言；`01a18e3a` 又包含前面的部分；`01a18e8a` 也继承上下文。表中 start 不保证所有 timeline 条目都晚于它：fork 保留了祖先条目。相同 `#entry` 的重复不能计作多份独立用户证据。来源：上述各 `timeline?type=user` 的条目和 header；metadata 中 `01a18e1f.parent=01a18dd4...`，`01a18e3a.parent=01a18e1f...`，`01a18e8a.parent=01a18e3a...`。

## Before：被推翻前的 Soroi

### 目的与原因（用户自己的回顾）

1. **(U)** 目的原本就包含消除 agent 的不可观测面，确定性捕获所需结果，并把普通程序融入 agent 工作。为此曾设计 preset/工作流模式，甚至在项目出现前约四个月就有静态编译打算。用户现在批评的是这条设计道路，而非撤回所有目的。来源：`01a18dd4`，02:23:38 `#ca258d0d`（全文见后面的引文 Q1）。
2. **(U)** 旧假设是 harness 本身弱且可定制性弱，agent 不透明、不可侵入，于是控制面必须完全放在外层。为了维持外层控制，Soroi 的 daemon 同时承担弱语言的解释器和 agent 启动器。为了再给业务 GUI 侵入，必须横跨多个层次，导致复杂中间抽象。来源：`01a18dd4`，02:30:39 `#6b25e5f7`（Q2）。
3. **(U)** 旧 capture 需 preset 预先规定 output，再去采集；用户认为未运行 preset 就确保其行为正确等于“预知未来”。来源：`01a18dd4`，02:45:06 `#ec8da5cc`（Q8）。

### 当时文档中的架构/host/scope（明确为 assistant 大纲，不冒充用户确认）

**(A)** 在 pivot 前约半小时，assistant 对旧文档的总结是：

- preset 是函数定义；闭包是绑定输入值后的调用。
- agent 通过 `soroi-closure return/throw` 交结果，`soroi-closure run` 调作者声明的 tool。
- 出口收返回值、capture、`[files]`、tool 折叠四类产物，再 verify。
- 边文件连接上下游，`Sum`/`Case`/`Loop` 表达并行/分支/循环。
- 核心依赖 Workspace 和 Store；agent 的 harness 是 Workspace 的插槽，参考实现是 **Paseo**；daemon 调度和记录，CLI 是无状态客户端。
- 文档分 definition/workflow/runtime/records/CLI/daemon，并有 replay/diff/intervene 等命令。

来源：`01a18d61-dda3-7309-ae18-f0a967abab6c`，2026-10-31 01:57:47，assistant `#7f382e3c.1`，`session://01a18d61-dda3-7309-ae18-f0a967abab6c/entry/7f382e3c`。这是窗口内 assistant 读取旧文档后的解释；**本调查没有直接读取旧文档正文，也不认为用户认可它所列全部机制。** 其中“外层控制/daemon/弱语言”的总体形态另有 Q1/Q2 的 (U) 支持；Paseo 插槽等细节只有这份 (A) 证据。

**(U)** 转向前用户还纠正过把 Soroi 缩成四个模块的做法：“不可能，soroi一共17个模块，而不是你臆想的四个”。这只证明当时不允许忽视整体模块范围，不证明新版仍必须保持那个模块数。来源：`01a18d40`，2026-10-30 23:48:33 `#492f3555`。

**(U)** 转向前文档清理与架构 pivot 不是同一个事件：10 月 30 日 23:19:38 用户仍说“当前实际上是有明确的设计，但是文档被ai搞得一团糟，里面全是分裂的意图，最后根本不能按文档去实现。” 到 10 月 31 日 02:23:38 才明确说整个方向错了、要推翻重来。来源：`01a18d2b` `#1d7e97ef`；`01a18dd4` `#ca258d0d`。不要把先前的“清理 AI 文档垃圾”误写成 pivot 已完成。

## After：转向后的 Soroi

### 1. 反转控制关系：用强 harness 内部能力，而不是再造外部语言

- **(U)** 用户以正在运行的 omp 作为“新时代的 harness”实例；eval 提供给 AI 特殊环境，在其中直接写代码；加自定义包即可调 agent，不再需要原来整套 preset 定义与流转。来源：`01a18dd4` 02:31:00 `#5ddb4d88`、02:32:46 `#28767d47`。
- **(U)** 捕获与记录不再要求 Soroi 在完全不透明 agent 外层强行建立控制面，改成 omp 中的自定义插件；用户原话“soroi原本所有的工作，在omp的视角会变的非常非常非常简单，就是做几个插件”。来源：`01a18dd4` 02:33:44 `#2d861491`、02:44:01 `#db50b20f`。
- **(U)** 这里仍保留普通函数与 agent 函数共处的目的。后续用户再强调 code mode/eval 的核心是 AI 能“一边写agent调度，一边写要运行的函数”，这才是把 agent 当函数。来源：`01a18e8a` 06:15:07 `#3fd1e5c4`。

### 2. 状态/捕获成为程序的组成方式，而不是输出预言

- **(U)** 用户用类 Jotai、不可变中间结果来说明状态管理可以捕获每个中间结果；中间件负责非 agent 输入输出捕获及非本机文件，agent 捕获则通过工具接收文件路径，中间件负责传输/管理。来源：`01a18dd4` 02:41:01 `#f1ad9522`、02:42:12 `#edbaf573`、02:43:29 `#49e6867a`。
- **(U)** Atom/Pure 的要点是必须继续被消费：捕获后产生新的 Atom，或停止。这个机制让程序被逐步构造，而非先写完 preset/output 再靠外部解释器跑。来源：`01a18dd4` 02:48:47 `#afd96ce6`、02:50:10 `#46e29915`、02:51:49 `#d01f7a32`。
- **(U)** 不能把最初的“类似 REPL”冻结成永久内核/整份脚本设计。用户 07:08:25 明确说想要 eval 的核心是模型“不一下子把所有东西全写了，而是一点一点写出来”，且可一次只写一个值的消费。来源：`01a18ed5` `#4986c617`（Q13）。
- **(U)** Store 后来被明确从“session log”视角改为“能落盘的状态管理”，直接支撑值的存储、捕获、复用，GUI 甚至不需要先前临时提出的额外 DSL。来源：`01a18e1f` 05:07:53 `#64246eaf`（Q11）。

### 3. Host 是 omp/fork + plugins；不是“可任意改核心”

- **(U)** 初始方向曾考虑 fork omp 并增加 eval 后端，TS/Effect 并非用户的终极目的或唯一允许方案。来源：`01a18dd4` 03:13:40 `#eaf23bd2`；02:57:04 `#57e9edb8` 及 03:07:59 `#cb9f395b`。后者说明 Effect 细节不重要，追踪也不必由 Effect 全做。
- **(U)** 在宿主讨论中曾提出 fork pi / 重新实现 omp subagent 两种选项，但用户指出 pi 无状态、缺少 omp 挂接到 agent 的状态管理，而 Soroi 可能唤醒早已结束的 session；随后决定重新实现 subagent。来源：`01a18e1f` 04:36:15 `#48f112ff`、04:37:51 `#0a73f18a`、04:39:09 `#678fe41a`、04:44:03 `#c1ef8567`。
- **(U)** 08:12:37 用户明确要求“在pepgent fork一份最新的omp”。来源：`01a18f15` `#ae015a40`。
- **(U)** 09:12:17 对 subagent 实现进一步收窄为：**不可以改 omp 核心，必须只能是插件**，生命周期和 IRC 全面对标内置 subagent；不考虑两侧版本一致或版本问题，只要求 RPC 能通讯。来源：`01a18f4a` `#f488be08`（Q15）。因此“omp fork 作 host”不能被演绎成“必须大改 omp 核心”。
- **(U)** eval 的身份也必须明确是 omp 插件，说明参考了 omp eval 与 pi codemode 的哪些点；用户随后要求单开 `omp-soroi-eval` 仓库实现。来源：`01a18e8a` 08:44:28 `#939ba6b8`、09:06:35 `#a13b6ec6`。

### 4. Workspace/remote 重新归位

- **(U)** Workspace 的本质是把 AI 放到另一个机器运行，至于是容器还是别的机器形态不该定义概念本身。来源：`01a18dd4` 02:34:38 `#f78895ee`（Q6）。
- **(U)** 远程运行与远程捕获是必须补齐的要求，而不是允许任意删除的“以后做”。来源：`01a18e1f` 04:05:05 `#85b259a5`。
- **(U)** remote 是独立程序、独立实现；Pepgent 是 AI4S org。来源：`01a18e3a` 05:00:31 `#5d27138c`、05:01:28 `#3afc3fb6`、05:52:11 `#b45cd22c`（Q16）。
- **(U)** 远程三后端是 Docker/Komodo、实验室 Slurm（原话部分拼作 slum）、标准 K8s 控制面；后续“暂时只实现 Komodo”不允许删掉共享抽象。来源：`01a18e3a` 04:15:49 `#c5030836`、08:05:09 `#2366ef30`、08:06:03 `#56d362ca`。这是需求与当前实现批次的区分，不是 Soroi 要吞并 remote。

### 5. 业务仍是 AI4S/Pepgent；Soroi 只是其中一部分

- **(U)** AI4S 原型被用户称为 Soroi 的“业务层”，理解原型才能理解为何如此设计。来源：`01a18e1f` 03:48:42 `#37b23da9`、03:54:42 `#e818d410`（Q9）。
- **(U)** 用户判断核心反转后 app 业务几乎不用动，体验反而更好。节点库可以保留为可持久预定义、下次 eval import 后传参的东西，但“不一定要去掉”不等于还要维护旧 preset 语言。来源：`01a18e1f` 04:02:49 `#47b71e05`、04:03:59 `#e3692177`（Q10）。
- **(U)** 11 月 1 日最新说明更精确：业务在 `pepgent/pepgent`，已有 agent 做纯前端；Soroi 对完整 Pepgent 不够，只是 omp 扩展组件；remote 本来不属 Soroi。来源：`01a193fd` 07:14:14 `#57d9d58b`（Q17）。
- **(U)** 这也有实际目录意图：用户要求把 `AI4S-prototype` 移入 **pepgent 那个 repo**，不是只把文件移动到同名父目录。来源：`01a19232` 2026-11-01 00:36:26 `#39b999ab`、00:36:37 `#fa43ba92`。

## Invalidated assumptions：用户推翻或明确纠正的假设

| 被否定的假设 | 用户给出的修正 | 证据 |
|---|---|---|
| (U) Soroi 必须在不可侵入、不可观测的 harness 外层另建完整控制面。 | omp 已足够强，直接用其 eval/工具/插件；捕获记录可内置于定制点。 | `01a18dd4` `#6b25e5f7` 02:30:39、`#28767d47` 02:32:46、`#2d861491` 02:33:44。 |
| (U) 为融合普通程序与 agent，需要自己的 preset/workflow 解释语言。 | 用户把它判为“更低能的编程语言”；给 AI 正常代码环境与包即可调度 agent。 | 同 session `#ca258d0d` 02:23:38、`#28767d47`。 |
| (U) 先定义 preset output，设计上就能保证捕获行为正确。 | 不运行无法确保，“等于预知未来”；转向运行中构造/捕获/继续消费。 | 同 session `#ec8da5cc` 02:45:06、`#46e29915` 02:50:10。 |
| (U) Workspace 必须由容器等具体基础设施形态定义。 | 本质是 AI 在另一个机器跑，具体机器形态不决定概念。 | 同 session `#f78895ee` 02:34:38。 |
| (U) 用文件替代 eval，就可以把整份程序一次写完、合并后正式运行。 | 核心是一步一步写；Atom 提醒让模型只写某个值的消费。 | `01a18e8a` 06:28:13 `#12957a28` 是探索方向；`01a18ed5` 07:08:25 `#4986c617` 是后续明确校准，不能只引用前者冻结文件方案。 |
| (U) 普通 session log 就是新 store；GUI 另需 DSL 把运行重建出来。 | 落盘状态管理直接解决复用、值和捕获，前端连 DSL 都不要。 | `01a18e1f` 05:07:53 `#64246eaf`；较早 04:02:49 `#47b71e05` 只是候选 DSL。 |
| (U) 重写 subagent 意味着可改 omp 核心，或必须强制两侧版本一致。 | 后续明确“只插件”、对标生命周期/IRC，版本问题不纳入。 | `01a18f4a` 09:12:17 `#f488be08`。 |
| (U) 新设计存在 replay/单步重放/整份脚本重放。 | 用户数次明确“没有重放”；这并未取消 dry run。 | `01a18efe` 07:58:00 `#9e2d37a1`、07:59:38 `#9492a22a`；`01a18e8a` 08:47:13 `#21495b13`。 |
| (U) dry run 的值必须入 store，或正式运行也有测试替身。 | dry run 不入 store；业务本身模拟与测试模拟是两回事。 | `01a18e8a` 06:56:46 `#a7f465d2`、08:54:56 `#32b6f7fd`、08:56:18 `#a45ac248`；`01a18e1f` 08:30:15 `#7ffcea0c`。 |
| (U) Atom 可跨会话互相可见/消费，eval 可递归在远程执行，远程 agent 可再开远程 agent。 | 用户逐项否定；eval 只有中心主机运行、禁止递归嵌套；远程 agent 不得继续开远程 agent。 | `01a18e1f` 08:18:31 `#63f31453`、08:25:02 `#5a37a640`、08:27:31 `#3dbd0473`。 |
| (U) 所有平台组件都归 Soroi，补完整 Soroi 等于做完整 Pepgent。 | Soroi 是 omp 扩展组件；remote 独立；完整 Pepgent 还需另规划缺失组件。 | `01a193fd` 07:14:14 `#57d9d58b`。 |
| (U) 设计必须先补全边缘/竞态/不确定实现才能继续。 | 新 rule：设计阶段禁边缘/竞态，不确定占位先假定工作。 | `01a18dd4` 02:38:12 `#eaea6240`。这也是转向中的工作方法，不是运行时缺陷处理方案。 |

**(U，防止反向过推)** 用户提过“静态编译”是回顾旧方向中的历史打算，不能据此发明“新版要写一个静态编译器”；同样，他批评旧 daemon 的解释器/启动器角色，不等于已经逐项决定删除所有 daemon/服务进程。依据仍是 `01a18dd4` `#ca258d0d`、`#6b25e5f7` 的原文；本报告不外推进程部署形式。

## Unchanged：没有随 pivot 消失的东西

1. **(U，明说不变)** **AI as functions。** 一个程序既包含普通程序，也包含 agent；agent 是特殊函数。这是最强的不变项，不应把转向描述成“从 workflow 产品变成随便聊天的 agent”。来源：`01a18dd4` 02:39:59 `#003efe9e`。
2. **(U)** **捕获与可观测性。** 用户在最初批评中仍把去掉不可观测面称为 Soroi 的核心；其后用中间件/工具方式继续解释输入、输出、文件产物捕获与传输。改变的是实现位置和编程方式。来源：同 session `#ca258d0d`、`#edbaf573`、`#49e6867a`。
3. **(U)** **普通程序与 agent 同等纳入运行。** 不是只搭 agent 调度器、把普通计算丢到外部失去捕获；用户后来再强调要在 eval 中一边写调度一边写函数。来源：`01a18dd4` `#003efe9e`；`01a18e8a` 06:15:07 `#3fd1e5c4`。
4. **(U)** **业务主体基本保留。** 用户直接说 app 业务几乎不用动；AI4S 原型仍用于解释需求。原型后来搬去 Pepgent repo 是归属变清楚，不是取消业务。来源：`01a18e1f` `#e818d410`、`#e3692177`；`01a19232` `#39b999ab`、`#fa43ba92`。
5. **(U)** **远程运行和远程捕获仍然是要求。** 不因概念变简单而可删。来源：`01a18e1f` 04:05:05 `#85b259a5`。
6. **(U)** **人类介入、派生/重跑仍需有。** 用户解释原来能暂停后修改输入重跑，现在仍是“新的实例，新的参数，旧的函数体”；但新的表达是取消原运行，经“人类接入”特殊程序产生新 Atom，再触发消费，不是把值就地合并。来源：`01a18e1f` 05:16:25 `#ba5ad307`、05:18:56 `#d1baf561`。
7. **(U)** **运行时 workflow 不可改变的要求与历史时间轴仍重要。** 用户说运行时 workflow 不可改变，所以核心反转不妨碍 GUI；另说“历史时间轴是个极为重要的功能”。来源：`01a18e1f` 04:02:49 `#47b71e05`、05:25:49 `#9ff9d2be`。这不授权重新引入被否定的 replay。
8. **(U，有限保留)** **可复用节点定义不必被删除。** 节点库可成为预定义内容的持久化与 import/传参入口；用户措辞是“不一定要去掉”，并非保证旧节点库、旧 preset schema 或旧 GUI 的每个细节不变。来源：`01a18e1f` 04:02:49 `#47b71e05`。

## Verbatim user framing quotes

以下均为 **(U)**，保留中文原文（包括用户措辞），每段给出唯一可复用定位。长段不混入 assistant 的解释。

### Q1：宣布整条外部语言方向错误

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/ca258d0d` — 2026-10-31 02:23:38 +09:00

> 我今天刚刚想通一件事，以至于soroi整个设计都得推翻重来核心目的是我用了过时的思想设计一个harness系统。 soroi的核心是，把agent的不可观测面去掉，通过确定性的捕获，抓取系统内想观测的东西，为了这个抓取，以及把一般程序融入，则设计了整个preset和工作流模式，实际上这是错的，本质上我重新造了一个更低能的编程语言，soroi在四个月前还没有这个项目的时候实际上就打算做成静态编译，我现在回头发现整个方向都是错的

### Q2：旧架构为什么会如此复杂

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/6b25e5f7` — 2026-10-31 02:30:39 +09:00

> soroi的错误的方向是因为，过去的harness可定制性太弱，并且harness自身也太弱，所以，控制面是完全独立的外层，并将agent视作完全不透明也无法侵入的东西。为了维持外部的控制面，需要在弱编程语言的基础上再加一个daemon作为调度，本质上他是一个解释器+agent启动器二合一。如果在此之上，soroi只是一个agent控制核心，再去开发业务的gui，则需要侵入好几个层次完全不同的方向，所以soroi的中间抽象非常复杂，目的就是为了外部好侵入。

### Q3：为什么 omp/eval 会反转控制面

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/5ddb4d88` — 2026-10-31 02:31:00 +09:00

> 而，新时代的harness就是你正在跑的omp，首先，你只阅读关于eval部分的文档

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/28767d47` — 02:32:46

> eval本身是soroi的另一个反面，不再需要外部的控制面，而是，给ai提供一个特殊的环境，并在其中直接写代码，而再提供自定义的包，就可以做agent调度，如果存在这种东西，那soroi设计的一整套preset定义，流转，没有任何意义

### Q4：捕获是插件

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/2d861491` — 2026-10-31 02:33:44 +09:00

> 而，eval启动的是omp自己的subagent，所谓的捕获和记录，本质上只是omp里所需要的自定义插件罢了，你想过这一点吗

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/db50b20f` — 02:44:01

> 所以，你会发现，soroi原本所有的工作，在omp的视角会变的非常非常非常简单，就是做几个插件

### Q5：明确不变的核心——AI as functions

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/003efe9e` — 2026-10-31 02:39:59 +09:00

> 首先，soroi的核心宗旨不变，是一种把ai当作函数去运行的概念，一个程序中，有纯粹的程序组成，也有agent组成，所以agent只是一种特殊的函数

`session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/3fd1e5c4` — 2026-10-31 06:15:07 +09:00

> 我觉得你过于有意迎合pi的设计，首先，为什么要有code mode和eval，就是为了ai能一边写agent调度，一边写要运行的函数，这等同于把agent当函数用

### Q6：Workspace 的本质

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/f78895ee` — 2026-10-31 02:34:38 +09:00

> 而workspace，本质上，就是，把ai放到另一个机器上跑，至于说这个机器是容器还是别的什么东西根本就不管

### Q7：不可变值、捕获、消费

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/f1ad9522` — 2026-10-31 02:41:01 +09:00

> 第二，另一个核心宗旨是，假如我们是一个纯函数式语言，没有变量，只有定量，必须不可变，那么程序中每一个中间结果实际上，都可以被状态管理捕获，就类似jotai

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a` — 02:43:29

> 而，agent的捕获，是纯粹的 自动以工具行为，就比如subagent在omp中必须调用yield返回给主agent信息。那么自定义工具，直接接受subagent给的文件路径，就等于捕获运行时产物，而这个类jotai的中间件，自己完成整个传输和管理部分。

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/46e29915` — 02:50:10

> 那么，我们能不能指定一种规则，atom必须被消费，也就是pure类型必须再一次被消费，而这个消费只有两种可能，一种是捕获，一种是停止。而为什么会有捕获，是因为，运行了一段程序

### Q8：旧 preset/output 是预知未来

`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/ec8da5cc` — 2026-10-31 02:45:06 +09:00

> 而对于一个程序，要捕获什么东西，原本的soroi的设计是不是，preset要先规定output，所以程序才去采集？而你preset不运行，你是不可能完全确保这个行为是正确的，对不对？因为等于预知未来

### Q9：AI4S 原型就是业务层

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/37b23da9` — 2026-10-31 03:48:42 +09:00

> soroi的前端的原型在/Users/mouriya/Downloads/AI4S-prototype.zip，这里，拿过来解压

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410` — 03:54:42

> 全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了

### Q10：业务几乎不动，节点库不一定删除

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/47b71e05` — 2026-10-31 04:02:49 +09:00

> 我认为，新设计可以改变一些东西，比如eval里的特定运行，会产生记录可以另外输出某种dsl，所以gui可以渲染，而本来，运行时的workflow就不可改变，所以这一点是不影响的，然后节点库实际上没有太大存在的必要了，不一定要去掉，因为这等于可以预定义一些东西持久化，下一次eval进来直接import后传参

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e3692177` — 04:03:59

> 大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了

### Q11：后续收敛：状态管理，不是 session log/额外 DSL

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf` — 2026-10-31 05:07:53 +09:00

> 通常来说，以omp的视角来看，store天生是session log，但是，如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了

### Q12：人类介入保留，但不是合并写值

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/ba5ad307` — 2026-10-31 05:16:25 +09:00

> 不，写方不一定只有ai，可以是人在gui写，写了以后通知ai改变了，但是值已经进去了，这个写是这样的，原本是soroi就有暂停运行然后改了重跑，等于是仅更改输入值后跑同样的preset，这对于现在来说是一样的，新的实例，新的参数，旧的函数体，所以要写的东西比你想的要多

`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/d1baf561` — 05:18:56

> 我觉得合并写入是不对的，人类写这种操作等于，将一个运行的程序取消，原本的atom要经过程序消费，现在经过一个特殊的程序，就叫他人类接入，所以产生了新的atom，然后自动触发函数消费

### Q13：eval 的核心是逐步写，不是一次性整份程序

`session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/4986c617` — 2026-10-31 07:08:25 +09:00

> 但是为什么我一开始想要eval，的核心，是模型可以不要一下子把所有东西全写了，而是一点一点写出来，所以有atom提醒，他完全可以一次只写一个值的消费

### Q14：fork omp 的明确指令

`session://01a18f15-ee16-71bb-ae90-ba76d6d37225/entry/ae015a40` — 2026-10-31 08:12:37 +09:00

> 在pepgent fork一份最新的omp

### Q15：host 不等于允许改核心

`session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08` — 2026-10-31 09:12:17 +09:00

> 不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯

### Q16：remote 独立，Pepgent 是 AI4S org

`session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6` — 2026-10-31 05:01:28 +09:00

> 然后还有一点，remote实际上是单独的程序

`session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/b45cd22c` — 05:52:11

> 这是pepgent的仓库，这是独立程序，单独去开私有仓库，另外把本机的那个git repo rule改好，pepgent是一个ai4s的org

[Showing lines 1-300 of 315. Use :301 to continue]