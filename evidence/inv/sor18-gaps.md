# SOR-18 三项契约取证

## 来源、范围与标记

- 只读调查对象：[SOR-18](https://github.com/Pepgent/soroi/issues/222) 的 [BLOCKED 原文](https://github.com/Pepgent/soroi/issues/222#issuecomment-6559418096)。没有实施、测试、部署、修改仓库文件或提交；未把内容哈希校验用作证据。
- 已先执行 `git -C /tmp/govclone-pm pull -q`，退出 0、无 stdout；随后从该副本读取已通过正文。Soroi 与 Mux 分别通过 `git clone -q https://github.com/Pepgent/soroi.git /tmp/govclone-soroi`、`git clone -q https://github.com/Pepgent/omp-rpc-mux.git /tmp/govclone-mux` 获取，均退出 0。这里只使用当前源码与指定 BLOCKED，不追溯提交/PR 历史。
- **(D)**：决策文档原文及其可直接读出的契约事实。**(R)**：本次命令输出或源码读取工具的输出；标成「源码」的事实是静态读取，不声称已运行对应功能。所有引用均附本次副本的 `path:line`，不是 BLOCKED 中已经漂移的旧行号。
- 路径缩写：`PM/` = `/tmp/govclone-pm/`；`SOR/` = `/tmp/govclone-soroi/`；`MUX/` = `/tmp/govclone-mux/`；`OMP/` = `/Users/mouriya/Ext/code/oh-my-pi/`。这些缩写在下文均指真实文件系统路径。
- **(R，版本边界)** `omp --help` 实际报告 `omp v18.15.0`；本次额外读取的本地 OMP 源码 `OMP/packages/coding-agent/package.json:1-3` 写的是 `18.12.6`。下文关于 discovery 内部实现/包导出的结论限于这份可读源码；未把它当作已安装 18.15.0 二进制的逐行还原。CLI 输出摘录保存于 `/tmp/govclone-omp-help.txt:1-30`。

## Q1：agentDef 如何映射为启动参数

### 1. D11-28 的 call.json 规定

**(D，逐字)** `PM/evidence/decisions/D11B-solo-ruling-review.md:13` 的 how：

> 远程 `Agent` 的 `call.json` 不携带 `capture`。捕获身份由中心 eval 中间件依 D4-18 计算，随正式步的中心提交进入 store；boot 只按调用配方启动远程 agent，`RemoteChild` 只产生 D4-15 的四列运行中批次，二者都不创建、校验或持久化捕获身份。`CallRequest.agent` 为 `{ kind, session, customization, library, state, agentDef, prompt }`

**(D，逐字)** 上述形状的字段类型在 `PM/evidence/decisions/D4-remote-exec.md:120-129`：

```ts
	| {
			readonly kind: "agent";
			readonly session: VolumeFile; // "soroi/agent/<id>.jsonl"
			readonly customization: VolumeFile; // "soroi/customization.tar"：D2-25 的 soroi 定制
			readonly library: VolumeFile; // "soroi/library-omp.tar"：Lab 库的 .omp/
			readonly state: VolumeFile | null; // "soroi/agent.tar"；首次启动为 null
			readonly agentDef: string; // Agent 体 agent 定义名（发行包或 Lab 库）
			readonly prompt: string; // 中心用目标端路径渲染好的提示词
	  };
// agent 调用另有 D3 §4 的启动参数：SOROI_SUBAGENT_ID、SOROI_SUBAGENT_PARENT、MUX_GENERATION、MUX_TOKEN；以及 SOROI_ROLE=RemoteChild。
```

**(D，事实)** `agentDef` 是 **string，含义为 Agent 体的定义名**，来源可以是发行包或 Lab 库；它不是该草图中的完整定义对象，也不是已展开的 argv。依据：同文件 `:126` 与 D11-28 的七字段形状。

### 2. D4-08～D4-13 的相关原文

以下按 ID 引用相关完整句/步骤；没有把 `…` 补成文档中不存在的参数。

**(D，D4-08，逐字)** `PM/evidence/decisions/D4-remote-exec.md:56`：

> 镜像提供 `omp`、`omp-rpc-mux` 与系统依赖；体命令 `omp <mount>/soroi/boot.js`（`BUN_BE_BUN=1`），部署时展开挂载路径。boot 从 `REMOTE_MOUNT`、`SOROI_CALL_PATH` 读 call.json，以绝对 argv exec、不经 shell：program 跑 runner；agent 解开 D4-09 的定制，再 exec `omp-rpc-mux dial --root <mount> --expose soroi-batch --expose work -- omp --mode rpc --session <mount>/soroi/agent/<id>.jsonl …`。D3 启动参数 `SOROI_SUBAGENT_ID/PARENT`、`MUX_GENERATION/TOKEN` 由写方经 env 给出；`REMOTE_MUX/RUN/MOUNT` 由 remote 注入，dial 将它们作参数默认值。只开放已改名批次与产物目录，不开放整个 volume。Agent call.json 不带 capture；boot 只按调用配方启动，不创建、校验、持久化捕获身份（D11-28），身份由中心 eval 算出并随正式步提交 store

**(D，D4-09，逐字)** 同文件 `:57`，how（保留原文步骤，去掉表格 HTML 换行）：

> 拷入两个按内容寻址的 tar，都不含凭据：
> 1. **soroi 定制 tar**：D2-25 的发行 tar（`packages/omp-soroi` 插件包、设置覆盖、soroi 的 agent 定义、技能、规则），中心主 agent 的运行容器也从同一份 tar 安装（D2-20）；部署 init 把它作为 release 事实提交进 store（D6-22），远程从 `GET /objects/{hash}` 拷入。`boot.js` 把它解到 `<mount>/soroi/home`，以 `HOME=<mount>/soroi/home` 启动 omp，让 omp 只从这里加载用户级定制。
> 2. **Lab 库定制 tar**：中心会话 cwd（Lab 库的 worktree，D2-12）里的 `.omp/`（agent 定义、技能、规则），按内容哈希打包，放进暂存区经 `GET /transfers/{t}/objects/{hash}` 拷入。`boot.js` 把它解到远程 cwd `<mount>/work/.omp/`，omp 按 project 级定制加载。
> 本机 `~/.omp` 和 omomp 的任何东西都不进入。omp 可执行文件来自镜像，两侧版本不作考虑

同一行取舍中还写：

> Agent 节点的 `template` 可以来自发行包或 Lab 库的 `.omp/agents`（D5-17），两者远程都找得到。

**(D，D4-10，逐字)** 同文件 `:58`：

> `RunRequest.env` 只放调用数据，以及 D3 §4 规定的启动参数 `SOROI_SUBAGENT_ID`、`SOROI_SUBAGENT_PARENT`、`MUX_GENERATION`、`MUX_TOKEN`；`MUX_GENERATION` 与 `MUX_TOKEN` 由 Mux 在 `mux_generation` 帧里签发给写方（D3-07）

**(D，D4-11，逐字)** 同文件 `:59`：

> 1. supervisor 打开写方连接 `WS /agents/{id}/writer`，带 `Authorization: Bearer <writer 凭据>`，发 `mux_open_generation`，收到 `mux_generation { generation, token }`，把这条连接作为 `RpcProcess` 的传输。
> 2. supervisor 调用 `remote run`，`env` 为 D3 §4 的 `{ SOROI_SUBAGENT_ID, SOROI_SUBAGENT_PARENT, MUX_GENERATION, MUX_TOKEN }`，另加 `SOROI_CALL_PATH` 与 `SOROI_ROLE=RemoteChild`。
> 3. 体里的 `omp-rpc-mux dial --root <mount> --expose soroi-batch --expose work` 出站连接 `WS /agents/{id}/process?generation={g}&token={t}&host={hostname}&run={REMOTE_RUN}`，把 `omp --mode rpc` 的每一行 JSONL 作为一条 text 消息原样转发；写方收到 `mux_attached { generation, where }`，再收到 omp 的 `ready`。
> 4. prompt、IRC、host tool（含交回工具）、host URI 全部照旧。
> 5. 读方订阅 `WS /agents/{id}/reader`。
> 本机 subagent 由 subagent 模块自己启动 `omp-rpc-mux dial --generation g --token t -- omp --mode rpc …`，本机和远程只有一种传输

**(D，D4-12，逐字)** 同文件 `:60`，第 4、5 步：

> 4. 拷入完成后 boot 启动体，dial 退出后体结束。
> 5. 代 id 在 remote run 前由 mux_open_generation 分配，从写方收到 ready 到进程退出、stdout 读完、mux_exited 结束。停驻、kill 或结果作业取消时，先结束代、再体、再作业；远程 Agent 保住 transcript 的顺序按 D6-15。作业状态权威是 remote；supervisor 只在作业期间持 run id，sidecar 仅记启动配方

**(D，D4-13，逐字)** 同文件 `:61`：

> 1. 作业开始时：中心把 `<id>.jsonl` 和它引用的 blob 打成 `agent.tar`，放进这次作业的暂存区拷入（D4-05）。中心文件是来源，tar 是一次性副本。

同一行关于非 eval 唤醒的全文见 Q3。

### 3. 中心现行 spawnCapture → #argv

**(R，源码)** `SOR/packages/omp-soroi/src/subagent/main/supervisor.ts:24`：

```ts
import { discoverAgents } from "@oh-my-pi/pi-coding-agent/task/discovery";
```

**(R，源码)** `spawnCapture` 的映射链位于同文件 `:250-279`：

```ts
const definition = (await discoverAgents(request.cwd)).agents.find(agent => agent.name === request.agent);
// ...
launch: {
    agent: definition.name,
    model: definition.model?.[0] ?? request.model,
    thinking: definition.thinkingLevel,
    tools: definition.tools,
    systemPrompt: definition.systemPrompt,
},
```

这里读取的是 `request.cwd` 可发现的同名定义。`definition.model` 取第一个候选，缺省用 `request.model`；定义的 thinking、tools、systemPrompt 分别进入启动配方。此处名称保存到 `launch.agent`，但下列 `#argv` 不把这个名称作为 CLI agent 参数传递。依据：`:257-270`、`:396-416`。

**(R，源码)** 同文件 `:396-416` 的完整 argv 构造：

```ts
#argv(spec: AgentSpec): string[] {
    const { launch } = spec;
    return [
        process.execPath,
        "--mode",
        "rpc",
        "--session",
        spec.sessionFile,
        "--no-context-files",
        "--no-ui",
        ...configOverlays(process.argv),
        "--config",
        CHILD_CONFIG,
        "-e",
        this.#entry,
        ...(launch.model ? ["--model", launch.model] : []),
        ...(launch.thinking ? ["--thinking", launch.thinking] : []),
        ...(launch.tools ? ["--tools", withCoordinationTools(launch.tools).join(",")] : []),
        "--append-system-prompt",
        [launch.systemPrompt, subagentPrompt(spec)].filter(Boolean).join("\n\n"),
    ];
}
```

**(R，源码)** 补充的协调工具是 `read`、`write`、`wait`，用 Set 去重；agent 定义正文与 subagent 身份/协调提示词合并后进入 `--append-system-prompt`。`CHILD_CONFIG` 指 `../child.config.yml`。依据：同文件 `:44-46`、`:734-745`（提示词函数的声明/返回位置）、`:788-790`、`:414-415`。上面 argv 中没有 `-p`，也没有位置初始 prompt。当前源码还在 `spawnCapture :252` 和 `#launch :346` 明确拒绝 remote placement；不能把这条中心启动实现记为远程已经实现。

### 4. discoverAgents 是什么，依赖哪些输入

**(R，源码)** 它是 OMP 包内导出的函数，不是 Soroi 自己实现的扫描器，也不只是 CLI 命令。证据：`OMP/packages/coding-agent/src/task/discovery.ts:86-90` 的函数签名：

```ts
export async function discoverAgents(
    cwd: string,
    home: string = os.homedir(),
    extensionRoots?: EffectiveExtensionRoots,
): Promise<DiscoveryResult>
```

`OMP/packages/coding-agent/package.json:472-475` 导出 `./task/*`，映射到 `./src/task/*.ts`，涵盖 Soroi 正在 import 的 `@oh-my-pi/pi-coding-agent/task/discovery`。因此，就这份源码和包导出而言，远程代码可以调用同一个库入口；「必须重新实现定义解析」并不是这两处源码的事实。是否能在具体 boot 环境 import 到它，另受安装/打包结果约束，见下一节；本次没有运行远程 import。

**(R，源码)** 发现输入与规则：

| 输入/行为 | 观察到的代码事实 | 出处 |
| --- | --- | --- |
| 项目 cwd | `path.resolve(cwd)` 后调用 `findAllNearestProjectConfigDirs("agents", resolvedCwd)`，只保留 `.omp` source | `OMP/packages/coding-agent/src/task/discovery.ts:91-105` |
| 项目目录查找 | 从 cwd 向父目录走，为每种配置目录取最近存在的子目录；不是只看 cwd 当层 | `OMP/packages/coding-agent/src/config.ts:218-246` |
| 用户级目录 | `getConfigDirs("agents", { project: false })`；用户基目录为 `path.join(os.homedir(), globalAgentDir?.() ?? dir)` | `OMP/packages/coding-agent/src/task/discovery.ts:93-98`；`OMP/packages/coding-agent/src/config.ts:84-88,128-143` |
| 默认用户路径 | 当前配置名缺省 `.omp`，agent 子目录缺省 `.omp/agent`，故任务定义默认在 **`~/.omp/agent/agents`**，不是 `~/.omp/agents`；profile 会改变 agent 基目录 | `OMP/packages/coding-agent/src/task/discovery.ts:4-9`；`OMP/packages/utils/src/dirs.ts:328-336` |
| HOME 参数与进程状态 | `home` 默认 `os.homedir()`，显式传给扩展/marketplace root 查找；用户原生目录的 `getConfigDirs` 则独立使用进程的 `os.homedir()`/配置状态，并没有把该 `home` 参数传进去 | `OMP/packages/coding-agent/src/task/discovery.ts:86-98,115-130`；`OMP/packages/coding-agent/src/config.ts:84-88` |
| 扩展包定义 | 能力 provider 启用时经 `listOmpExtensionRoots({ cwd, home, repoRoot: null, extensionRoots })` 查每个 root 的 `agents` | `OMP/packages/coding-agent/src/task/discovery.ts:113-120` |
| 扩展 roots 来源 | 文档注释明确包括 settings `extensions:`、CLI `--extension`/`-e`、启用的 npm/link plugins；受有效 roots 与 provider 配置影响 | `OMP/packages/coding-agent/src/task/discovery.ts:4-11,113-130`；`OMP/packages/coding-agent/src/discovery/omp-extension-roots.ts:1-16` |
| Markdown 解析 | 读取定义目录 `.md` 后调用 `parseAgent`；`parseAgent` 解析 frontmatter，以正文 `body` 作为 `systemPrompt` | `OMP/packages/coding-agent/src/task/discovery.ts:53-65`；`OMP/packages/coding-agent/src/task/agents.ts:105-124` |
| 同名覆盖 | 顺序为 project、user、扩展/插件、bundled；按名称保留首先发现者 | `OMP/packages/coding-agent/src/task/discovery.ts:76-81,107-120,157-175` |

### 5. boot.js 的仓库、包与远程包可用性

**(D)** 组件归属：runner/`boot.js` 在 `Pepgent/soroi` 的 `packages/omp-soroi`，eval 模块 `src/eval/`；subagent 模块也在同一个包。不是另一个 `boot` 仓库。依据：`PM/evidence/decisions/D4-remote-exec.md:34-35`。D4-22 同文件 `:70` 逐字写：

> 打包：远程执行的 soroi 一侧全部在一个插件包 `packages/omp-soroi` 里。eval 模块含打包、runner/`boot.js`、`Site` 执行、env 参数、remote 客户端、远程角色写批次；subagent 模块含 `launchRemote`、Mux 写方、generation、transcript 拷入拷出。store 服务在同仓的 `packages/store`。

**(R，源码)** 当前 `boot.js` 的源码是 `SOR/packages/omp-soroi/src/eval/boot.ts`。发行脚本将它以 `bun build --target=bun` 打成独立 `boot.js`；`runner.js`、`boot.js`、`customization.tar` 是同一外层 release 的三个组件。依据：`SOR/scripts/build-release.py:190-212,228-236`；包名和仓地址在 `SOR/packages/omp-soroi/package.json:2,6-9`。

**(R，源码)** `customization.tar` 的打包器枚举同仓 `packages/*`，放入各包的 `package.json`、`src`、`agents`、`skills`、`rules`，生成 workspace 根 `package.json`，并放入 `.omp/settings`。该实现不是把已安装的依赖树直接归档。依据：`SOR/scripts/build-release.py:161-186`。`omp-soroi` 对 `@oh-my-pi/pi-coding-agent`、`pi-agent-core`、`pi-ai`、`pi-tui` 声明 peerDependencies；`pepgent-store` 为 workspace dependency。依据：`SOR/packages/omp-soroi/package.json:30-45`。

**(R，源码)** 当前安装器在解 tar **之后**显式执行：

```ts
await run(["bun", "install", "--production", "--cwd", installedRoot], env);
// ...
const packageRoot = path.join(installedRoot, "packages", "omp-soroi");
await run(["omp", "plugin", "link", packageRoot], env);
```

来源：`SOR/scripts/install.ts:102-114`；其环境还设 `HOME` 和 `PI_CODING_AGENT_DIR`（`:104-105`）。

**(D)+(R，事实边界)** D4-09 规定远程加载同一份定制，D4-22 写“作为一个整体装在中心主机”以及远程与中心“加载同一套定制”（`PM/evidence/decisions/D4-remote-exec.md:57,70`）。当前打包源码能证明 `omp-soroi` 等本仓包的**源码文件**会进入定制 tar；当前安装器能证明完整安装路径还包含依赖安装与插件链接（上述源码行）。不能仅从“已解 tar”推称 npm/peer 包已经可解析、插件已经被发现。当前 boot 只含 program 分支，尚无 agent 解包/安装/发现实现：`SOR/packages/omp-soroi/src/eval/boot.ts:34-48`；其 `CallRequestSchema` 也只有 program：`SOR/packages/omp-soroi/src/eval/runner-protocol.ts:19-23`。本次没有远程安装或包加载的运行观察。

### 6. 本机 omp --help 的实际输出

**(R，命令)** 执行 `omp --help`，退出 0。以下逐字摘录及来源位置取自保存的成功 stdout 选段 `/tmp/govclone-omp-help.txt`：

| 主题 | 实际输出 | 选段出处 |
| --- | --- | --- |
| agent | `agents         Manage bundled task agents` | `:26-27` |
| 用户级 agent 解包 | `omp agents unpack           - Export bundled subagents to ~/.omp/agent/agents (default)` | `:29` |
| 项目级 agent 解包 | `omp agents unpack --project - Export bundled subagents to ./.omp/agents` | `:30` |
| system prompt | `--system-prompt=<value>           System prompt (default: coding assistant prompt)` | `:11` |
| 模板 system prompt | `--system-prompt-template=<value>  Handlebars system prompt template (mutually exclusive with --system-prompt)` | `:12` |
| 追加 system prompt | `--append-system-prompt=<value>    Append text or file contents to the system prompt` | `:13` |
| 初始输入 | `MESSAGES   Messages to send (prefix files with @)` | `:8-9` |
| 初始 prompt 示例 | `omp "List all .ts files in src/"`；`omp @prompt.md @image.png "What color is the sky?"` | `:20-23` |
| `-p` | `-p, --print                           Non-interactive mode: process prompt and exit` | `:17` |
| RPC | `--mode=<value>                    Output mode: text (default), json, rpc, or rpc-ui` | `:15` |
| RPC 下无 UI | `--no-ui                           With --mode rpc or rpc-ui: run extensions headless (rpc-ui tool UI remains enabled)` | `:18` |

**(R，命令输出范围)** 这次完整 help 的 FLAGS 列表没有 `--agent` 或按 agent 定义名选择身份的 flag；它列出了 `agents` 管理子命令。这个观察只描述 help 输出，不把“未列出”扩展为对所有未公开 CLI 行为的证明。中心实际如何展开定义，证据是前面的 `spawnCapture` 和 `#argv`，不是仅凭 help 推断。

## Q2：prompt 投递通道

### 1. 已通过正文写的通道

**(D，逐字)** D11-28 写：

> boot 只按调用配方启动远程 agent
> `CallRequest.agent` 为 `{ kind, session, customization, library, state, agentDef, prompt }`

来源：`PM/evidence/decisions/D11B-solo-ruling-review.md:13`。其中列出 `prompt` 字段，但这两句没有把该字段描述成 boot 的位置参数投递。D4 的类型注释写：

```ts
readonly prompt: string; // 中心用目标端路径渲染好的提示词
```

来源：`PM/evidence/decisions/D4-remote-exec.md:127`。

**(D，逐字)** D4-11 写：

> prompt、IRC、host tool（含交回工具）、host URI 全部照旧。

来源：同文件 `:59`。更具体的 **§5.2 远程 Agent（正式运行）** 原文在 `:285-297`：

```text
    E->>E: runner 用目标端路径渲染 prompt
    E->>S: POST /transfers → t（EvalTransfer）；放入 call.json、Lab 库 .omp/ 的 tar 等未提交的字节
    E->>P: spawn(placement = remote(t), Agent 体定义, prompt, transfer t)
    P->>P: 登记 AgentRef
    P->>M: WS /agents/{id}/writer；mux_open_generation
    M->>P: mux_generation { g, token }
    P->>R: remote run(SOROI_CALL_PATH, SOROI_SUBAGENT_ID/PARENT, MUX_GENERATION, MUX_TOKEN, inputs, output = PUT /transfers/{t}/volumes/{position})
    R->>B: 拷入完成后启动体
    B->>B: soroi 定制 → HOME；Lab 库 .omp/ → work/.omp/
    B->>M: omp-rpc-mux dial --root --expose soroi-batch --expose work → /agents/{id}/process?generation=g&token=…
    M->>P: ready（这一代开始）
    M->>P: mux_attached
    P->>B: prompt（RPC，经 M）
```

参与者在 `:279-284` 定义：P 是中心 subagent supervisor，M 是 Mux，B 是 boot.js + 远程 omp。

**(D，直接回答)** 已通过 D4 §5.2 **明确写的是中心 supervisor 向远程进程发 RPC prompt，经 Mux**，不是 boot 把初始 prompt 放进 CLI argv。依据就是 `:297` 的 `P->>B: prompt（RPC，经 M）`。这里区分两件事：通道已在时序中明写；`call.prompt` 这个 JSON 字段如何与中心发出的 prompt 对应，D11-28 的七字段列举与 D4 类型注释没有再给出字段读取的具体实现语句。不能据后者把前者记成“正文没有写 prompt 通道”。

### 2. 本机 capture ready 后发 assignment 的源码位置

**(R，源码)** 链路如下：

1. `spawnCapture` 先 `await this.#launch(spec)`，再 `await session.prompt(request.assignment)`：`SOR/packages/omp-soroi/src/subagent/main/supervisor.ts:279,301`。
2. `#launch` 等 `writer.start(...)`，注册 host tools / URI schemes、读 state、构造 session、loadMessages 后 `generation.assertReady()` 才返回：同文件 `:354-389`。
3. `writer.start` 先发 `mux_open_generation`，取得 generation 后 `await generation.ready`：`SOR/packages/omp-soroi/src/subagent/main/mux-writer.ts:169-184`。
4. generation 收到 `ready` 帧时进入 ready phase 并 resolve startup：同文件 `:278-284`。
5. `session.prompt(text)` 发 `{ type: "prompt", message: text, streamingBehavior: ... }`：`SOR/packages/omp-soroi/src/subagent/main/agent-session.ts:184-189`。
6. `Generation.command` 调用 `this.writer.send({ ...command, id })`，`send` 将 JSON 发到写方 WebSocket：`SOR/packages/omp-soroi/src/subagent/main/mux-writer.ts:329-340,197-199`。

这些是本机已存在的源码链路，非本次运行的 capture 结果。

### 3. 远程是否以 RPC 模式接入 Mux

**(D，直接回答)** 是，正文约定如此。D4-08 的原文命令为：

```text
omp-rpc-mux dial --root <mount> --expose soroi-batch --expose work -- omp --mode rpc --session <mount>/soroi/agent/<id>.jsonl …
```

来源：`PM/evidence/decisions/D4-remote-exec.md:56`。D4-11 `:59` 又明确说 dial 把 `omp --mode rpc` 的每一行 JSONL 作为一条 text 消息原样转发。D3 §4 原文也写：

```text
omp-rpc-mux dial  [--mux $REMOTE_MUX] [--agent $SOROI_SUBAGENT_ID] [--generation $MUX_GENERATION] \
                  [--token $MUX_TOKEN] [--root $REMOTE_MOUNT] [--expose <rel>]… -- omp --mode rpc --session … <对标参数>
```

来源：`PM/evidence/decisions/D3-network-mux.md:162-163`。这是约定，不是当前 Soroi agent boot 已经运行成功的证明；当前实现边界见 Q1 第 5 节。

## Q3：generation 类型冲突

### 1. store 当前结构的完整定义

**(R，源码，逐字)** `SOR/packages/store/src/contract.ts:85-89`：

```ts
export const TransferSchema = z.discriminatedUnion("kind", [
	z.strictObject({ kind: z.literal("EvalTransfer"), evalCall: NameSchema }),
	z.strictObject({ kind: z.literal("AgentGenerationTransfer"), agent: NameSchema, generation: PositionSchema }),
]);
export type TransferKind = z.infer<typeof TransferSchema>;
```

该源码没有另一个独立同名 `AgentGenerationTransfer` interface；完整 variant 就是上面 `z.strictObject(...)` 那一行。其字段 schema 定义为：

```ts
const NameSchema = z.string().min(1);
const PositionSchema = z.number().int().nonnegative().safe();
```

来源：同文件 `:5,8`。因此 agent 是非空字符串，generation 是非负安全整数，kind 为固定字面量，且该对象禁止额外字段。

### 2. D6 原文及这个 generation 的所指

**(D，逐字)** 当前 D6「接口草图（主路径）」文件部分（问题中所称 §4 的该结构）在 `PM/evidence/decisions/D6-store-service.md:137-150`：

```ts
// ---- 文件（D6-07）：未提交的字节一律在暂存区，提交时转入对象目录 ----
type TransferId = string & { readonly _: 'TransferId' } // store 生成并持有；不进中心副本
type TransferKind =                               // 两种都只是传输暂存区（D4-13）
  | { kind: 'EvalTransfer'; evalCall: string }     // eval 调用开始时开；按 position 分卷；dry run 返回或步提交确认后结束
  | { kind: 'AgentGenerationTransfer'; agent: string; generation: number } // 非 eval 场景的远程 agent 一代；一卷；transcript 写回确认后由 subagent 模块 DELETE
// GET    /objects/{sha256}                                  → bytes（中心副本里的对象）
// POST   /transfers               body: TransferKind        → { transfer: TransferId }
// PUT    /transfers/{t}/objects/{sha256}                    ← bytes（本机产出、节点 bundle 与源码、人类上传、transcript 包）
// GET    /transfers/{t}/objects/{sha256}                    → bytes（remote-step copy-in）
// PUT    /transfers/{t}/volumes/{position}                  ← application/x-tar（EvalTransfer 的 remote-step copy-out）
// GET    /transfers/{t}/volumes/{position}/files/{path}     → bytes（dry run 取回产出）
// PUT    /transfers/{t}/volume                              ← application/x-tar（AgentGenerationTransfer 的 copy-out）
// GET    /transfers/{t}/volume/files/{path}                 → bytes（subagent 模块取回 transcript 与 blob）
// DELETE /transfers/{t}                                     （EvalTransfer：dry run 返回时；AgentGenerationTransfer：transcript 写回确认后）
```

**(D，直接回答)** **是：已通过正文里，这个字段的来源就是 Mux 分配的远程 Agent 进程 generation；不是 store 自己另发的代号，也不是 eval 调用 position。** 这是下列正文连续指向同一个生命周期对象的事实：

- D4-11 `PM/evidence/decisions/D4-remote-exec.md:59` 明写“generation 由 Mux 分配，写方开的那一代与拨入的进程一一对应（D3-07）”。
- D4-12 同文件 `:60` 明写“代 id 在 remote run 前由 mux_open_generation 分配”，并以 ready / 进程退出 / mux_exited 界定这一代。
- D4-13 同文件 `:61` 为 **eval 调用之外唤醒的这一代**建立 `AgentGenerationTransfer { agent, generation }`，指向 D6 同步结构。
- D4 §5.2 同文件 `:312` 把这两个动作放在同一句唤醒流程里：先 `mux_open_generation` 再开 `AgentGenerationTransfer`（原文见第 4 小节）。
- D6 自身 `:141` 注释同样写“非 eval 场景的远程 agent 一代”。store 生成的是独立的 **TransferId**（`:138,143`），不是该字段 generation。
- volume 的位置编号只出现在 **EvalTransfer** 的 `/volumes/{position}`；AgentGenerationTransfer 是单卷 `/volume`（`:145-149`）。

这里没有把 D6 的 `number` 隐去：它确实与 D3 的 `string`、Mux 的 UUID 实现不同；正文所指的对象相同，并不使两处类型声明自动一致。

### 3. D3 与 Mux 签发实现

**(D，逐字)** `PM/evidence/decisions/D3-network-mux.md:78-79`：

```ts
type AgentId = string;            // omp AgentRegistry 的 id
type Generation = string;         // mux 为一次进程分配
```

同文件 `:101-105` 把它用在写方接收帧：

```ts
type WriterDown =
  | OmpLine                                               // 当前这一代的 stdout，原样，含 ready
  | { type: "mux_generation"; generation: Generation; token: string }
  | { type: "mux_attached"; generation: Generation; where: Where }
  | { type: "mux_exited"; generation: Generation; code: number }
```

**(R，源码，逐字)** `MUX/src/serve/router.rs:533-544`：

```rust
                WriterControl::OpenGeneration => {
                    ensure!(
                        matches!(agent.generation, Generation::None),
                        "generation already issued or attached"
                    );
                    let id = Uuid::new_v4();
                    let token = format!("{}{}", Uuid::new_v4().simple(), Uuid::new_v4().simple());
                    agent.writer_frame(WriterFrame::Generation {
                        generation: id,
                        token: &token,
                    })?;
                    agent.generation = Generation::Issued { id, token };
```

**(R，源码)** `MUX/src/protocol.rs:68-79` 的 `WriterFrame::Generation` 字段是 `generation: Uuid`，帧名 `mux_generation`。Soroi 接收端则明确按字符串解析：`SOR/packages/omp-soroi/src/subagent/main/mux-writer.ts:18-21` 的 `generation: z.string()`；同文件 `:13-15` 的 `ProcessRef.generation` 也是 `string`。这与 D3 的字符串契约一致，与 store 的整数 schema 不同。本次没有以真实 POST 触发类型拒绝；上述事实来自类型/解析器与签发代码。

### 4. 哪些已通过正文将它连到 store 字段

**(D，D4-12，逐字)** `PM/evidence/decisions/D4-remote-exec.md:60`：

> 一个声明可跨多次作业与唤醒。
> 代 id 在 remote run 前由 mux_open_generation 分配，从写方收到 ready 到进程退出、stdout 读完、mux_exited 结束。

**(D，D4-13，逐字)** 同文件 `:61`：

> 暂存区按来历分两种（ADT，D6-07 同步）：
> • `EvalTransfer { evalCall }`：Agent 节点调用发生在一次 `soroi_eval` 里，用这次 eval 调用的暂存区（D4-05），交给 `launchRemote`；它在 eval 调用返回（dry run）或这一步提交确认（正式运行）时结束。
> • `AgentGenerationTransfer { agent, generation }`：eval 调用之外的唤醒（例如 IRC 唤醒后再停驻），由 subagent 模块自己 `POST /transfers` 开，拷出写到单卷 `PUT /transfers/{t}/volume`（D6）；transcript 与 blob 写回中心并确认后，subagent 模块显式 `DELETE`。

**(D，D4 §5.2，逐字)** 同文件 `:312`：

> 唤醒同一个 agent 时，supervisor 再开一代（`mux_open_generation`），重走上图前半段，多拷入一个 `soroi/agent.tar`（中心 transcript 与 blob 的一次性副本）。这次唤醒不在 eval 调用里时，由 subagent 模块自己开 `AgentGenerationTransfer`，拷出写到单卷 `PUT /transfers/{t}/volume`，transcript 写回确认后删除（D4-13）。

**(D，D4 类型交汇，逐字)** 同文件 `:94-97`：

```ts
/** 传输暂存区的来历（D4-13，D6-07）。 */
type Transfer =
	| { readonly kind: "EvalTransfer"; readonly id: TransferId; readonly evalCall: EvalCallId } // 一次 soroi_eval 一个；dry run 返回或步提交确认后结束
	| { readonly kind: "AgentGenerationTransfer"; readonly id: TransferId; readonly agent: AgentId; readonly generation: Generation }; // 非 eval 唤醒；写回确认后 DELETE
```

**(D，D6-07，逐字片段)** `PM/evidence/decisions/D6-store-service.md:35`：

> 暂存区为 ADT：`EvalTransfer{evalCall}` 每次 eval 开一个、按 position 分卷；`AgentGenerationTransfer{agent,generation}` 为非 eval 的远程唤醒开一卷。store 生成 id、持有 `$STORE_HOME/staging/<transfer>/`；暂存字节不进中心副本，正式查询不可见。

同一行还写：

> 非 eval 唤醒在 transcript/blob 写回中心确认后由 subagent 模块 DELETE，不产生 store 记录。

D6 `:139-143` 再以 `TransferKind` 将该结构规定为 `POST /transfers` 的 body，但把 generation 写成 `number`。以上是明确的跨正文交汇位置，而非仅凭两个字段同名猜测来源。

### 5. 代码交汇边界与当前实现状态

**(R，源码)** Mux 签发后的 Soroi 一侧：

- `SOR/packages/omp-soroi/src/subagent/main/mux-writer.ts:169-184` 发 `mux_open_generation` 并等待签发/ready；`:18-21` 将响应 generation 解析为 string；`:254-259` 将该 id 原样设为 `MUX_GENERATION` 后启动 dial；`:273-275` 存入 `ProcessRef.generation`。
- store 入口 `SOR/packages/store/src/server.ts:144-146` 对 `POST /transfers` 的 JSON 正文先 `parse(TransferSchema, ...)`，再调用 `store.transfers.create(kind)`。因此请求到这里会遇到 `contract.ts:87` 的整数 generation schema。
- `SOR/packages/store/src/transfers.ts:13-17` 的 `create` 自己生成的是 `ulid()` transfer id，原请求 kind 写入 `kind.json`；`:20-22` 读回来仍用 `TransferSchema.parse`。它没有在这些代码中将 Mux generation 转成 store 自有代号。
- `SOR/packages/store/src/transfers.ts:56-64` 区分 EvalTransfer 的 `volumes/<position>.json` 和 AgentGenerationTransfer 的 `volume.json`；单卷路径并不使用 generation 当位置编号。

**(D)+(R，当前界线)** 两边在文档上的交汇就是 D4 `Transfer.generation: Generation` → D6 `POST /transfers` 的 `TransferKind.generation: number`；对应的实际入口是 store `server.ts:144-146` → `contract.ts:85-88`。当前 Soroi remote capture/launch 仍在 `supervisor.ts:252,346` 被拒绝、boot 的 schema 与 switch 仍只有 program（Q1 所列位置），所以本次没有看到一个已实现并实际发出该远程唤醒请求的生产调用链；不把契约类型不一致写成已经实测发生的 HTTP 失败。
