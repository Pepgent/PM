# 本机 omomp 定制能力清单

## 结论与证据边界

本机的“omomp”不是一个统一插件：它由 **omp-config 分发的本地 extensions + 全局 prompt 文件 + 独立安装的 npm/GitHub plugins + Tern/Orca/Otty 宿主集成**组成。源码仓库位于 `~/Ext/code/omomp/`，包括 `omp-config`、`omp-todo-more`、`omp-unified-exec`、`omp-peers`、`omp-playbooks`、`omp-roundtable`、`omp-thinking-translator`、`omp-remote-build`、`omp-ask-more`、`omp-codex-image-gen`、`oh-my-omp-dot-github`。发现依据：读取 `~/Ext/code/omomp/` 的父目录 `~/Ext/code/`，其中完整列出该目录的子仓库。最初对整个 `~/Ext` 的递归 glob 超时，不作为缺失证据；随后缩小目录直接找到它们。

**当前安装以 `~/.omp/agent/` 与 `~/.omp/plugins/node_modules/` 为准**。本文引用源码仓库文档解释机制时明确标为 D；没有通过 hash 对照推断安装与仓库一致，没有读取 git/session/GitHub 历史，没有修改配置或源代码，没有运行模型交互或测试。本文是一份源代码与配置库存，不冒充已实测每个 hook 的运行证明。

`command -v omp` 实际输出：`/Users/mouriya/Library/Application Support/Tern/omp/bin/omp`。这证明当前 PATH 指向 Tern 管理的 omp，不证明其他进程的 CLI 参数、profile 或环境完全相同。

### 引用缩写

- **A** = `/Users/mouriya/.omp/agent`
- **E** = `/Users/mouriya/.omp/agent/extensions`
- **P** = `/Users/mouriya/.omp/plugins/node_modules`
- **D** = `/Users/mouriya/Ext/code/omomp/omp-config/docs`
- **R** = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`
- `omp://...:L-L` = 当前安装提供的 harness 文档行号，不是历史记录。

### 范围矩阵读法

- **Main**：普通 full-mode omp 的主 session。
- **Task**：以 `task:high/mid/low/free` 定义运行的原生 task 子 session；不是新的 OS 进程。
- **Custom**：以 `.omp/agents/*.md` 的其他名字运行的 task 子 session，如 `argon`、`secretary`。
- **Tern Main**：Tern 启动的**独立 omp 进程**的主 session。在使用同一 agent-dir、同一 full 配置且未关闭 extensions/plugins 的前提下，它适用 Main 规则，而不是 Task 规则；每个进程重新加载自己的配置和 cwd。Tern 本身不会把它变成 task 子 agent。
- **✓** 表示代码/安装文档支持注册和适用；仍受可用工具、配置、目标匹配限制。**条件**的具体条件写在同一行。
- 原生 task 与 eval `agent()` / `workpool()` 共用 agent policy，但 eval 启动总是 structured；普通 task 默认 `task.structured: false`。因此“有 completion judge 代码”和“这次 task 受 completion judge 拦截”不是一回事。依据：`omp://task-agent-discovery.md:325-333`。

本地 extensions 的安装说明明确写 main 和同进程 subagents 都加载（`E/README.txt:4-7`）；但**这个 README 的旧功能说明已经过时**：例如 `:68-72` 说子 agent 没有 todo，而当前独立 todo 插件已经只为四个 task tier 恢复它。下面的适用范围优先使用安装代码与当前 harness 文档，而不照抄旧 README。

## 当前安装与配置入口

实际 `omp plugin list` 输出（只记录发现结果，不把版本当功能证据）：

```text
npm Plugins:
● omp-ask-more@0.1.0
● omp-codex-image-gen@0.3.4
● omp-peers@0.1.3
● omp-playbooks@0.1.40
● omp-remote-build@0.1.9
● omp-thinking-translator@0.10.1
● omp-todo-more@0.1.20
● omp-unified-exec@0.14.22
● pi-bansos@0.4.12
● pi-package-search@0.1.1
● pi-pretty-codeblocks@0.1.0
```

所有这些 plugin 的 catalog `enabled: true`，且 plugin settings 当前为空：`~/.omp/plugins/omp-plugins.lock.json:1-59`。安装来源见 `~/.omp/plugins/package.json:4-15`。**omp-roundtable 不在该列表和 catalog 中**；存在源码仓库及 `A/omp-roundtable/` 状态目录并不等于插件当前已安装或启用。

### 两套设置不能混为一谈

1. **omp 原生设置**：`A/config.yml`，例如 task、modelRoles、compaction、todo、launch；项目层可影响生效值，不能把全局文件当本 session 的完整合成配置。
2. **omp-config extensions 设置**：`A/omomp.yml`，通常先取 `<cwd>/.omp/omomp.{yml,yaml,json,toml}` 的有效 section，再取 agent-dir 的有效 section。是**整段首个有效值**，不是 deep merge；一个目录有多个 omomp 文件视为歧义跳过。依据：`E/_shared/omomp.ts:6-18,89-121`。
3. `system-prompt-replace`、`model-compaction`、`omomp-lang` 明确只读 agent-dir，不读项目 omomp，见各功能行。
4. 独立插件拥有自己的配置；例如 translator JSON、remote-build JSON、原生 plugin settings，不能假设它们都会读 omomp 同名段。公共约定文档见 `~/.claude/rules/omomp-plugin-paradigm.rule.md`；本文具体控制方式仍以插件安装代码/文档为依据。

### 对长跑直接相关的原生设置

| 当前全局设置 | 含义、限制与证据 |
|---|---|
| `task.eager: preferred` | 倾向在有收益时委派，不是每件小事强制 fan-out；`A/config.yml:54-55`，实际 prompt 分支 `A/SYSTEM_TEMPLATE.md:108-131`。 |
| `task.maxRuntimeMs: 0` | 关闭 task 硬墙钟截止；`A/config.yml:56` + `omp://tools/task.md:197`。**不是无限自主运行保证**：原生 soft request budget 默认 200，1.5 倍强制停止；可按 exact agent name 设置 budget，见 `omp://tools/task.md:196`。本全局 config 未设置该 budget。 |
| `task.maxConcurrency: 64` | 每 session semaphore 的并发上限；`A/config.yml:81`，机制见 `omp://tools/task.md:190`。不是 64 个独立 OS omp main。 |
| `task.isolation.enabled: true`, `merge: branch` | 调用仍须 `isolated: true` 才隔离；branch 策略 commit/cherry-pick 回 parent；`A/config.yml:76-78`、`omp://tools/task.md:156-157`。 |
| `task.enableEffort: false`, `maxEffort: high` | 普通 task 不暴露 per-item effort；既定 agent/model selector 控制 effort，不能为了调用方便改角色绑定；`A/config.yml:79-82`、`omp://task-agent-discovery.md:44`。 |
| `eval.tools.enabled: false` | 禁用把父 eval kernel 自定义工具交给子 agent 的 `tools` 通道；不等于禁用 eval 本身，不等于 plugin tools 不加载；`A/config.yml:155-157`、`omp://tools/task.md:36,57`。 |
| `todo.enabled: false` | 关闭原生 todo，由独立 todo-more 取代；不是关闭 todo-more；`A/config.yml:163-164`、`P/omp-todo-more/README.md:16-28`。 |
| `launch.enabled: false` | 原生命名 service launch 不提供，PTY 长任务走 unified-exec；`A/config.yml:168-169`、`D/plugins-and-modes.md:16`。 |
| compaction order `remote → soft → snapcompact → handoff → shake`; `asyncEnabled: false`; idle 200000 | 尽量推迟有损整理且不提前异步摘要；`A/config.yml:105-114`、`D/prompts-and-context.md:76-78`。模型阈值另有 extension，见下。 |
| `checkpoint.enabled: true`, `edit.mode: hashline`, `readLineNumbers: true`, `inlineToolDescriptors: on` | 保留原生 checkpoint、需 read snapshot 的锚点编辑、工具描述内联后才能做替换；`A/config.yml:150-160`。 |

## 核心行为与适用范围

### Todo、委派和完成约束

| 功能 | 做什么 / 触发点 | Main | Task | Custom | Tern Main | 配置、使用方式与逐项证据 |
|---|---|---|---|---|---|---|
| **todo-more 状态与 edit gate** | 每 session 分支维护 goal `{objective,measure,doneWhen}`、phase、带 explanation/分钟预算的 item。`edit` **实际执行时**若 list 为空则拒绝，不只是在 tool_call 批次预检；INIT/edit 同批次按实际执行状态判断。用户消息在 provider context 附 todo 提醒，调查/讨论不要求 todo。 | ✓ | 四 tier 强制恢复 todo | **edit gate 适用，但 todo 恢复不是通用的，见下方重要陷阱** | 同 Main；另有 Tern HUD/editor | `P/omp-todo-more/index.ts:74-79,115-141,163-181`；执行 wrapper `src/planning.ts:79-118`，用户 context `:120-134`；安装现状 `A/config.yml:163-164`。调用前读 `xd://todo/protocol`、`xd://todo/lifecycle`。 |
| **todo continuation / 中断与额度后续** | 未完成 actionable items 时停轮提醒；用户提问/人为中断不自动续跑。Main 非人为 cutoff（provider error、悬挂 tool 尾等）10 秒后 nudge；额度 429 等 reset 后一分钟（或估计 30 分钟），有 draft 则等待。 | ✓ | 有自己的 list/reminders | hook 可运行；受 todo 入口问题影响 | ✓ | 插件 `index.ts:175-177`；`P/omp-todo-more/README.md:266-296`。`Ctrl+N` / `/todo-more-cancel` 取消 pending reminder；它不跨进程持久化。原生 `todo` 的 reminder 参数与源码约束不可假装全被 omomp.yml 控制。 |
| **todo 预算 / overtime** | `in_progress` 墙钟累计；ask 等用户时间不计。最近 deadline 一次性 timer；超时每个 budget 一次 warning，不改状态、不延长预算、不自动 spawn，不取消任务。 | ✓ | ✓ | 同 todo 可用性条件 | ✓ | `P/omp-todo-more/README.md:159-215`；注册 `index.ts:176`；当前每项必须正整数分钟。调 `ESTIMATE` 是重新预测，不是掩盖超时。 |
| **todo DONE → git checkpoint** | 有未提交改动时 DONE 需 commit clause；插件用 host git bindings 做实际 stage/commit，再记录结果。状态不是“打勾后未来补交”。 | ✓ | ✓，并检查 parent workspace commit ownership | 同 todo 条件 | ✓ | `P/omp-todo-more/README.md:217-265`；`index.ts:107-113,138,159` 把 parent cwd 交 executor。命令为 `DONE target "message"` 或 `DONE target "paths" "message"`。这里只描述机制，没有用 hash 当验证证据。 |
| **ctx / Task log / post-compaction recovery** | `ctx list/show` 显示当前树、handoff、goal、task 时间线；成功状态变更写共享 local task-log；Main compaction 后注入 ctx tree 和 Main 当前状态。 | ✓ | ctx/log 可用，post-compact Main-only | ctx 可注册；显示默认会隐藏非 task 系列节点 | ✓，但只覆盖自己的进程树 | 注册 `P/omp-todo-more/index.ts:57-58,180-181`；`D/prompts-and-context.md:120-134`。`ctx list all=true` 才包含内部/自定义隐藏上下文；不是跨进程 peers。旧 `E/ctx-tool/`、`ctx-tasklog/` 空目录不是另一个活跃实现。 |
| **isolation-nudge** | tool_call 检查 `task`：同 cwd 将有 ≥2 write-capable workers 且有 item 未显式 isolated 时阻一次；要求 writer true、reader false。不检查 fork_task；同 task 文本重试可过。 | ✓ | ✓ | ✓，若可 task | ✓ | 注册 `E/isolation-nudge/index.ts:147-161`；完整语义 `D/extensions.md:39-43`。无配置。不能把它当始终强制隔离的安全锁。 |
| **task-split-check / split** | Main 的 task 派给 `task:low/mid/free` 时判断一个 item 是否合并多个独立主题；文件多不等于多主题。失败阻整个 call；同文本第二次可过。 | ✓ | 不运行 split | 不运行 split；Custom 作为 Main 派发目标也不在覆盖名单 | ✓ | `E/task-split-check/index.ts:96-114,262-301`。fallback `smol`：`A/omomp.yml:44-45`；purpose role：`A/config.yml:24`。25s/fail-open 机制见 `D/extensions.md:49-57`。 |
| **task-split-check / report-limit** | 任意 session 的 task/fork_task，目标为 `task:*` 或省略 agent 时，检查 shared context+task 是否限制返回报告长度；要求移除限制，原样重试仍阻。产物本身字数要求不算报告 cap。 | ✓ | ✓，若还可 spawn | ✓，若还可 spawn | ✓ | `E/task-split-check/index.ts:116-129,262-305`。长报告可写 `local://...` 返回路径，不要靠“brief report”缩掉证据。对目标 `argon` 等非 task 名不覆盖，不代表允许丢证据。 |
| **task-completion-judge** | 只拦截 `task:low/mid/free` 的 terminal structured **yield**；用 assignment、自身 todo goal、最近 calls/results 与交付判断 DONE/NOT_DONE。NOT_DONE bounce 一次；DONE 后有 pending/in_progress todo 另 bounce 一次；blocked items 不阻；模型/config/read error fail-open。 | 不适用 | **low/mid/free 且有 yield**；high 不适用；普通 unstructured task 不触发 | 不适用（按 definition displayName 精确名单） | Main 不适用；它的子 task 同前 | `E/task-completion-judge/index.ts:1-41,455-542`；名单检查 `:470-475`。`A/omomp.yml:21-22` fallback smol；`A/config.yml:23` purpose role。没有这个 gate 不能推导“验收已通过”；反过来一回 bounce 也不是无限强制完成。 |
| **fork_task** | 拷贝 caller/其他 live agent 最新真实 model request 的历史与 system/tools prefix，继承背景继续做；不是 fresh task。无 agent 用源模型与 shared cwd；显式 agent 只选绑定模型+prompt role，默认 isolated。 | ✓ | ✓，受宿主可用性/深度限制 | ✓，**不把所选 agent 的 tool allowlist 当沙箱** | 同 Main，但只 fork 本进程 live 捕获的 request | `E/fork-task/index.ts:519-526,653` 注册；`D/prompts-and-context.md:80-98`。工具自带 `xd://fork_task/limits`。需要 async；`from` 的 parked agent 需先唤醒；进程重启丢 snapshot 后不能冷 revive；shake 显式启用才做有损 elision。 |

### 对 Custom agents 最重要的陷阱

**目前项目 agent 名称不会自动享有 todo-more 的四 tier 恢复逻辑。** 源代码只恢复 `task:high/mid/low/free`（`P/omp-todo-more/index.ts:74-79,115-141`）。当前安装文档说原生 child 会剥掉 parent-owned `todo`，除非 prewalk 已 armed（`omp://tools/task.md:136`）。但 planning edit wrapper 没有 agent-name 例外（`P/omp-todo-more/src/planning.ts:83-118`）。因此，自定义 child 可能得到 **空 todo 无法 edit、又没有 todo 可 INIT** 的组合；仅在 frontmatter 加 `todo` 不构成已证明的修复。这是源代码支持的集成风险，不是本次 live reproduce 的结论；同轮 TodoToolProbe 另行负责实际探查，本文未改配置绕过。

当前文件实际是：

- `R/.omp/agents/argon.md:1-7`：`model: google-antigravity/gemini-4-argon`、`thinking-level: high`、`spawns: task:mid, task:low, task:free`，没有 `tools` 字段，所以沿用 default built-ins，不是只读 sandbox。正文“不写代码”是行为职责。
- `R/.omp/agents/secretary.md:1-7`：显式 `tools: read, grep, glob, find, bash, edit, write, todo, task, wait`，spawns low/free，模型为该文件 selector；该 todo 字面声明本身不消除 executor stripping 风险。

### Prompt、工具指导与漂移监视

| 功能 | 做什么 / 触发点 | Main | Task | Custom | Tern Main | 配置、使用方式与证据 |
|---|---|---|---|---|---|---|
| **SYSTEM_TEMPLATE** | Handlebars 全局底板，运行时 tools/skills/rules、委派约束；sub Step 4 为 Hand-off，Main 为 Verify。 | ✓ | ✓，sub 分支 | ✓，sub 分支 | ✓ | `A/SYSTEM_TEMPLATE.md:1-11,38-131,134-198`；层次说明 `D/prompts-and-context.md:9-18`。定制不是静态 SYSTEM.md；本次不修改。 |
| **PERSONALITY / APPEND_SYSTEM / RULES** | Personality 为 evidence-first 高密度写作。Append 明确用户 override、最终交付要带证据、不得省读、重要决策双 discuss、长调查 mentor。`RULES.md` 当前为空。 | ✓ | Personality none，Append 不继承 | 同 Task | 同 Main | `A/PERSONALITY.md:1-42`；`A/APPEND_SYSTEM.md:1-24` 明说 children 不继承 appendix；`A/RULES.md:1` 空；`D/prompts-and-context.md:11-13`。必须在任务合同中显式传递有关要求。 |
| **system-prompt-replace** | before_agent_start 最后对已渲染 system 做 literal/regex 更正：删 sub 禁 todo 旧句；改用户错误规则；禁止 eval 查文件；补 xd device 调用警告。 | ✓，sub-only rule 跳过 | ✓ | ✓ | ✓ | `A/config.yml:1-3,150` 指定 `extensions-last/...`；`A/omomp.yml:23-35` 当前 replacements；安装 hook `A/extensions-last/system-prompt-replace/index.ts:152-215`。只读 agent-dir 段；load-order 说明 `D/prompts-and-context.md:20-50`；light 不加载它。 |
| **append-system-model** | 每次 before_agent_start 按当前 model/provider regex append 文件内容；各 child 看自己的模型。 | ✓ | ✓ | ✓ | ✓ | 注册/读取 `E/append-system-model/index.ts:135-167`；当前 `APPEND_SYSTEM_MODEL.md:1-5` 匹配 GPT，追加“代码完成前不编写/运行测试；禁止 hash 验证作证据”。Argon 非 GPT 不匹配该块。改 sibling 文件或 model 下一 prompt 生效。 |
| **repo-rules** | 扫 `.claude/.agents/.pi` rules 与 user rules；unscoped 放 system，`paths` 规则在匹配文件 read/write/edit 后作为 trusted context 注入，避免同规则重复放置。 | ✓ | ✓ | ✓ | ✓，按新 cwd 扫 | `E/repo-rules/index.ts:202-225` hooks；`D/prompts-and-context.md:60-70` roots/去重/绝对 glob。本任务实际收到 `omp-maintenance` 与 `omomp-plugin-paradigm` path rules，正是该行为。 |
| **tool-topics** | 将 read/bash/task 等工具说明变成 common instructions + Topics 索引；`tool://` 提供渐进式详细文档。 | ✓，需 read | ✓，需 read | ✓，需 read | ✓ | `E/tool-topics/index.ts:107-110`；`D/extensions.md:254-263` coverage/lifecycle。文档在 extension load 时读一次，文件变化需新启动；tool name/layout 不匹配保留 native 并警告。plugin 工具使用各自 `xd://tool/topic`，不是 tool://。 |
| **tool-topic-injection** | tool_result 后参数 regex 命中即把 topic 加 developer context；不阻执行；失败调用也可得到指导。marker 仍在实际 context 时每 rule 一次，compaction 丢 marker 后可再注入。 | ✓ | ✓ | ✓ | ✓ | hook `E/_shared/tool-topic-injection.ts:65-98`；配置加载 `E/tool-topic-injection/index.ts:11-21`；当前规则 `A/omomp.yml:52-113`（SSH、archives、SQLite、JSON、documents、forge/runtime/web、grep regex/scopes）；`rules: []` 关闭；整段 override 不 deep merge。 |
| **tool-policy-nag: form / intent / risk** | host bash/bash_bg/eval 路由违规作为漂移信号；提醒不阻断。当前 heuristic：3 hits 后最多3次中文反思 steer；intent JUDGE 当前不运行；risk 至少4命令或600字、3程序且有 write 时提醒。 | ✓ | 不发这些提醒；继承 runtime interceptor setting | 同 Task | ✓ | `A/omomp.yml:8-20`；hook `E/tool-policy-nag/index.ts:393-463`，Main guard `:191-198`。heuristic runtime 覆盖 `bashInterceptor.enabled=false`，所以不能只看 `A/config.yml:172-195` 说正则 interceptor 仍在拦；说明 `D/extensions.md:83-121`。每 watched call 重读段。 |
| **tool-policy-nag: PTY lane** | 有 `pty: {}` 且 active tools 包含 exec_command 时，拒绝在 host bash/eval 跑 passthrough（SSH/container/另一个 shell）、terminal/交互、open-ended wait；`pty:true` 不豁免；指向 `xd://exec_command`。 | ✓ | ✓ | ✓ | ✓ | `E/tool-policy-nag/index.ts:407-411` **在 Main-only lanes 前执行**；`D/extensions.md:107-112` 列分类与检测边界。检查 host tools，**不是分析/约束 plugin exec_command 的命令内容**。 |
| **lang-nag** | agent_end 取最终回复末段前200字判断中文；不符则给**下一次用户输入**加“说中文”，不立即重写报告；slash 清 pending，用户抢先输入取消检查。 | ✓ | 不适用 | 不适用 | ✓ | `E/lang-nag/index.ts:183-242`；当前 `A/omomp.yml:1-3`；model role `A/config.yml:22`；机制 `D/extensions.md:153-157`。session start/switch 读配置，错误不阻。 |
| **turn-judge** | 每个 stop/nonempty assistant turn 后按 TURN-JUDGE 文件 target/model/provider/skipTools 判断是否合理结束；Main 后台 judgment 可续起 turn；sub 等最多20s，若匹配可替换交付回复。 | 当前 GPT Main 命中 | 框架支持，但当前 shipped target main 不命中 | 同 Task | 当前 GPT Main 命中 | hook `E/turn-judge/index.ts:773-781`；当前 `TURN-JUDGE-gpt-talk-only.md:1-16`：target main、GPT regex、跳 wt/harness_restart、只说不做 threshold0.8；`D/extensions.md:142-151`。不是所有模型、所有 agent 的永久强制循环。 |
| **watchdog-agent** | 按 WATCHDOG-*.md 周期审查，每 tool call/非空 text 算1 action，默认每30次及 terminal catch-up；target 可 main、精确 custom/tier、subagents、*。Chat reviewer 或 ≥2 option 的 JUDGE；支持 aside/steer/nextTurn/followUp、window/full、maxPerContext。 | 按 target | 按 target，交付 best-effort | 可按自定义名 target | 按 target | 注册 `E/watchdog-agent/index.ts:95-100` → `runtime.ts:62-64,81-86,212-215,676-781`；文件发现 `spec.ts:85-86` + `_shared/spec-files.ts:6-18`；详细 schema `D/extensions.md:123-140`。`/watchdog list/on/off/add/edit/rm`；add/edit 要 draft→revise→确认写盘。**当前检查的 extension、R 根与 R/.omp 无 WATCHDOG 文件**，所以不能宣称已启用某个周期 watchdog。 |
| **shared JUDGE / roles** | lang/turn/watchdog option/tool-policy intent 共用 judgment 路由；purpose chat role 优先，否则原生 judge 链，失败用 omomp judge fallbackRole tiny；不是每个检查都直接拿 Main 模型。 | 按调用者 | 按调用者 | 按调用者 | 同 Main | `D/extensions.md:74-81`；当前 `A/omomp.yml:48-49`，`A/config.yml:10-26,196-216`。task split/completion 另有 purpose→smol 的 chat chain，不应混为同一机制。未验证任何配置 selector 的实际可用性。 |

### 长上下文、宿主安全与人机界面

| 功能 | 行为 / 触发点 | Main / Task / Custom / Tern | 配置、使用方式与证据 |
|---|---|---|---|
| **model-compaction** | Main before_agent_start 将 regex threshold 写 runtime settings，child 读继承值；不改磁盘；切 context-window tier 的规则会跳过并警告。 | Main 写；Task/Custom 读；Tern Main 各自写 | 当前 GPT regex 650000 tokens：`A/omomp.yml:38-41`；guard `E/model-compaction/index.ts:296-300`；`D/prompts-and-context.md:100-118`。只读 agent-dir，project 段忽略。 |
| **child-memory-warning** | Darwin 下 first Main 开 2s timer，追所有 omp 子孙及已观察 process group/orphan；单个 owned process physical footprint 超4GiB warning+agent消息一次；**从不 kill**。 | 每 OS omp 进程一次 Main 负责；覆盖 Task/Custom 引发子进程；Tern 每进程独立 | 当前 `A/omomp.yml:46-47`；Main/platform guard `E/child-memory-warning/index.ts:168-172,204-221`；`D/extensions.md:195-203`。threshold 每scan读取，project优先。监测的是子进程，不是所有其他 omp peers 的资源总量。 |
| **delete-guard + delete tool** | main/sub 的 host bash/eval 删除/动态命令在执行前拒绝；注册 literal-path delete，默认 trash；永久删除每次必须 UI确认，headless child/print不能永久删。 | Main/Task/Custom/Tern ✓；有 tools 时可用 delete；guard 无开关 | `E/delete-guard/index.ts:259-270`；`D/extensions.md:163-189`。不覆盖 unified-exec 命令、脚本文件内部、git clean/rsync 等自有删除语义。故不是完整权限沙箱。 |
| **input-polish** | Main TUI ctrl+enter，用 tool-less depth1 helper改 draft；overlay保留原稿，Enter采用并提交，Esc/Ctrl+C取消；/!/$开头或空draft不触发。 | Main/Tern TUI ✓；Task/Custom 不适用 | `E/input-polish/index.ts:302-306,416-418`；当前 key/中文指令/fallback smol `A/omomp.yml:4-7`，model role `A/config.yml:21`；`D/extensions.md:205-212`。term不支持协议可 alt+enter。 |
| **doc-polish** | 注册 polish_doc 与 /polish-doc；split→并行 polish→check 的 extension-less 内存助手，把原稿副本和 review 输出 /tmp，不修改原文件。 | Main/Task/Custom工具可注册；Tern同Main | `E/doc-polish/index.ts:747-781`；`D/extensions.md:214-229`；当前 concurrency8 `A/omomp.yml:36-37`，split/polish roles `A/config.yml:25-26`，未配置check时回split链。主要给人可读文档，返回要求Main完整读review。 |
| **wt / wt_remove** | Main TUI tool排队，等turn真正idle才调用 /wt 或 /move；wt_remove两步状态确认，检查jobs/subagents，回main再移除。 | Main/Tern TUI ✓；Task/Custom不可用 | `D/extensions.md:231-238`；目录 `E/wt-tool/index.ts`（自动发现entry）。不是在child调用/git手工worktree的等价物。 |
| **harness_restart** | Main TUI排队restart，落request marker，resume后注入“重启完成，继续”。 | Main/Tern TUI ✓；Task/Custom拒绝 | 安装guard `E/harness-restart/index.ts:149-168`、注册`:235-249`；`D/extensions.md:240-244`。仅业务确需重启时用，不能把它当保留fork snapshot保证。 |
| **omomp-lang** | 面向人的 UI strings 语言，模块load时export OMOMP_LANG；不翻译model prompts/results/logs。 | 每进程；Task/Custom沿进程环境；Tern也重新解析 | `A/omomp.yml:50-51` 当前zh；`E/omomp-lang/index.ts:75-80`；`D/extensions.md:307-316`。环境OMOMP_LANG优先；agent-dir only；配置变化新process生效。 |
| **omp-config-autoupdate** | Root Main启动检查/应用分发，保留机器定制并处理冲突；不是所有child都更新。 | Main/Tern Main ✓；Task/Custom不运行startup更新 | 当前 enabled true `A/omomp.yml:42-43`；guard/command `E/omp-config-autoupdate/index.ts:488-495,732-736`；`D/plugins-and-modes.md:7-11`。`/omp-config-autoupdate status/on/off/run/adapt/conflicts notify|agent`。当前运行的extension不是编辑磁盘后自动hot-reload。 |
| **antigravity-wire-profiles** | Root session_start取backend模型maxOutputTokens更新process内wire profile，修正新Gemini wire摘要budget；before_agent_start等同一加载promise。 | Main初始化；Task/Custom用进程表；Tern各进程初始化 | `E/antigravity-wire-profiles/index.ts:234-248`；`D/extensions.md:246-252`。凭据存在才可查；失败保留旧表、记录warning，不据此推断Argon实际连通。 |
| **session:// reader** | 只读跨 session 时间线/条目/metadata/FTS查找，process-global scheme，不写history；可筛project/date/type/time。 | Main/Task/Custom/Tern ✓（有read/grep） | `E/session-urls/index.ts`入口；`D/extensions.md:294-305`。任务明确准许历史研究时才读 `session://README` 走入口；本库存没有读取历史数据。不要误当多进程消息总线。 |

### Advisor 的原始用户请求注入

**user-prompt-inject** 在 subagent `session_start` 扫描 `PROMPT-INJECT-*.md`，按 `ctx.agent.name` 选择目标；每次 `context` 将 root 的人类原始请求与 ask 答案渲染为 developer message，放到模型输入前面，不把 parent 的解释当原始用户意图。安装 hook 证据：`E/user-prompt-inject/index.ts:293-354`。当前文件 `E/user-prompt-inject/PROMPT-INJECT-user-goal.md:1-18` 的 target **仅 `mentor:default, discuss:steady, discuss:divergent`**；Main、task tiers、argon/secretary 本身不命中，但它们调用的这些advisor可以命中（须尚有深度）。Tern 独立 Main 自身不命中，它自己的advisor以自己的root用户请求为源。添加其他machine/project `PROMPT-INJECT-*.md` 才能扩展target；这是 context hook，不是把 APPEND_SYSTEM 全部继承给child，也不是越过root authority添加新需求的授权。light关闭此extension。

### 报告交付时实际观察到的 edit gate

本次整理库存时，向 `edit` 提交仅修改 `local://inv/o-omomp.md` 的补充段落，工具实际拒绝并返回 `Todo is empty... edit is blocked until the complete document succeeds and the list has items.`；随后将报告文件交付阶段建立为一项 Todo，再进行该补充。没有把这次普通 task:mid 的观察冒充为 argon/secretary 的复现，也没有修改任何全局设置来绕过 gate。它还说明：**gate 以 edit 调用和当前session分支状态为准，不会因为目标是报告artifact就自动豁免。**

## 独立 plugins

| Plugin | 具体能力与触发条件 | Main | Task / Custom | Tern 独立 Main | 配置、使用与证据 |
|---|---|---|---|---|---|
| **omp-peers** | 同OS用户各omp主session发现、/btw式只读side question、IRC注入唤醒。 | ✓ | **拒绝，不是peer** | ✓，同用户跨profile也能互通 | `P/omp-peers/index.ts:1-24,32-50`；tool guard `src/tools.ts:162-166`；`README.md:13-44`。无settings。`peer_list`后用真实session id/唯一前缀；peer_ask无工具、不改目标history但花目标模型usage；peer_send入目标conversation，idle唤醒，busy下一步送达。 |
| **omp-unified-exec** | 六个PTY tools：exec_command/write_stdin/set_on_exit/monitor/kill_session/list_sessions；交互、daemon、SSH/container passthrough等走这里；工具返回session_id后继续stdin/monitor。 | ✓ | ✓，没有main-only guard；每session own terminal lifecycle | ✓ | 注册 `P/omp-unified-exec/src/index.ts:1289,1331,1359,1425,1463,1528`；session绑定`:1120-1131`，shutdown终止owned sessions`:1155-1189`。默认不exit-wake，仅用户明确要求才on_exit wake；`monitor`用于有界观察，不能跨omp借session id。`/unified-exec-sessions`人类inspect/kill，`:1204-1260`。不被host bash/eval guard当作其自身命令解析。 |
| **omp-playbooks** | YAML playbook、blocks、Run/Launch、revision/timeline、Tern旁pane；8个playbook tools。 | **须 numeric TERN_PANE** | 同一进程环境满足时factory可注册，**不是main-only**；eval helper受可用eval/agent spawn policy | ✓，numeric TERN_PANE 且tern可用时 | `P/omp-playbooks/package.json:9-10`入口；`src/extension/index.ts:34-50`：没有pane立即return且无tools/topics/commands。用`playbook_open`后从eval `playbook.agent/run/spawn/result`；`topics/playbook_open.execution.md:5-25`。**这些helper调用本进程eval agent()**，不是每block新开omp进程：`src/extension/eval-prelude.ts:1-18,139-148`。block preset agent/isolated可覆盖；bundled task禁用时需传明确agent。 |
| **omp-ask-more** | 替换ask为带brief/evidence/tradeoff/demo的全屏问题页；超时提醒+返还未答项给模型；取消可abort当前run。 | TUI rich surface | 没TUI退native ask；不能把它当child能向人弹完整sheet保证 | Tern sheet；同native结果shape | 注册 `P/omp-ask-more/index.ts:121-144`，UI失败fallback`:107-115`；`D/plugins-and-modes.md:23`。配置`askMore.timeout`默认1800s、`returnTimeout`默认1200s；每call读settings，`:81-83`。tool带`xd://ask/...`topics。 |
| **omp-thinking-translator** | 只翻译**实际可见、渲染的**assistant thinking，异步替换显示，不是翻译模型上下文。 | 可见TUI thinking | 子报告/思考只有宿主实际展示时才有显示收益；headless无渲染不能视为翻译模型input | ✓ | entry `package.json:32-35`；render期dispatch注释 `extensions/thinking-translator.ts:366-367`，message hooks`:423-462`。`A/thinking-translator.json:1-60` enabled true、Simplified Chinese、model fallback列表、trace false；`/thinking-translator status/init --global|--project`，注册`:267-270`。 |
| **omp-remote-build** | Mutagen per-worktree同步+Komodo remote build/container tools；预备环境，container_exec/stdin/list/kill、init/build image。 | **只opt-in linked worktree** | 同条件；isolated subagent可自动begin自己的env | 同条件 | `P/omp-remote-build/src/index.ts:229-239,282-303`：工作树root有有效`.omp/remote-build.json`且不是main checkout才激活；不是仅安装就生效。机器host配置 `A/remote-build.json:1-12` 指cachyos、km/mutagen；`D/plugins-and-modes.md:25`前置依赖。当前R/.omp目录只见agents，本次没有把远端连通当已验证。 |
| **omp-codex-image-gen** | codex_generate_image + imagegen skill，经ChatGPT/Codex subscription调用gpt-image-2生成/编辑PNG（1–5 reference images）。 | 工具注册 | 工具可注册，受任务/tool可见性 | 同Main | `P/omp-codex-image-gen/index.ts:106-111`；`D/plugins-and-modes.md:19`。需要本地既有订阅凭据；没有在本次调用生成图片。 |
| **pi-bansos** | bansos provider，本机proxy/free model路由及relay UI；task:free链可用其模型。 | process/provider能力 | 可通过model binding用bansos，不是child专属plugin | 每进程加载；不要凭port推测谁owner | `P/pi-bansos/extensions/index.ts:1255-1259,1298-1302` 注册provider/command；relay state读写语义`:210-227`；`D/plugins-and-modes.md:17`。`/bansos`管理relay；机器state `~/.pi/agent/pi-bansos-relay-state.json`。没有读取其中可能敏感内容，也没有探测proxy运行。 |
| **pi-package-search** | search_pi_packages/install_pi_package，发现与用户明确要求时安装npm pi packages。 | ✓ | plugin tools additive可注册，安装仍须用户要求 | ✓ | `P/pi-package-search/extensions/index.ts:6-11`无agent guard；`D/plugins-and-modes.md:20`。调用前读pi-package-search skill，不因为发现插件就自动装。 |
| **pi-pretty-codeblocks** | 仅TUI renderer隐藏代码fences与默认2列缩进，保留syntax highlight；不改conversation文本。 | 渲染适用 | 只要宿主展示该Markdown就适用，不改变child逻辑 | 渲染适用 | `P/pi-pretty-codeblocks/README.md:3-14,44-61`。`PI_PRETTY_CODEBLOCKS_LANG=1`显示语言名，`PI_PRETTY_CODEBLOCKS_INDENT=0`保留原缩进，startup环境控制。 |
| **omp-roundtable（仅发现源码，未列为安装）** | issue graph→durable agenda/tickets；workflow work/judge/action/decision/final；owner与独立review seats；GitHub效果源确认后推进，Main只调度独立ticket并裁exception。 | **本次安装未建立active** | 不自动给普通task附roundtable；若安装启用，seat是独立native session，不是普通受限task | 源码描述launcher经Tern启动`omp --roundtable owner/repo#N` | 源码`~/Ext/code/omomp/omp-roundtable/README.md:11-39,121-159`。无`--roundtable`注册nothing else；workflowFile可native plugin settings或OMP_ROUNDTABLE_WORKFLOW，运行agenda冻结workflow；seat加载Main extensions但自身headless、可delegate，fresh judge histories。**不能把源码能力当当前Main已有工具。** 当前catalog/list缺失为安装状态证据；`A/omp-roundtable/key`未读取。 |

### 多进程协调的精确边界

- `agent://`、原生IRC、wait与ctx：**一个omp process里的父子/已注册agent树**。agent id不是跨进程地址。当前harness还明确“非parent/自child或broadcast消息”可能独立唤起reply turn：`omp://tools/task.md:225-227`。
- `omp-peers`：**跨omp process的Main sessions**。每个有Main的进程监听`/tmp/omp-<uid>/peers/<pid>.sock`；alive以能连socket为准，非heartbeat；同用户profile无隔离。peer_list还显示只有presence记录的非plugin进程候选，候选不等于可通信。`P/omp-peers/README.md:29-44`。
- 子agent不能直接peer_send；应把跨进程问题交Main转发。peer_send只确认已注入，没有read receipt/reply tracking/offline queue；需要结果就等实际reply，不自造同步机制。`P/omp-peers/src/tools.ts:162-166`、`README.md:34-35`。
- `session://`只读历史与元信息，不是发送消息或验证活进程的接口。playbook的Launch记录也不是agent当前运行状态的替代品。

## Project agent 编写与长期自主运行工作方式

1. **精确写 name/description，显式 spawns，模型经既有绑定。** `.omp/agents` 项目优先于 user agent、extension/plugin agent、bundled；exact-case first-wins；文件按字典序。每次dispatch重读，已有child不hot-reload。当前原生说明 `omp://task-agent-discovery.md:25-49,150-180,207-228`；本机作者说明 `A/agents/README.txt:112-143`。
2. **没有spawns不是“可以继续delegate”。** 缺spawns且tools不显式含task，会得到空spawn policy；tools含task时legacy默认*。`spawns:*`的省略agent默认bundled task，而本机已disabled task/scout/sonic/reviewer/security-reviewer；显式名单省略agent会选第一个。必须每item显式`agent`，不要误把任务name当agent type。依据`A/agents/README.txt:12-45`、`A/config.yml:57-74`。
3. **深度默认2**：Main→custom depth1→worker depth2；depth2没有task、不能再找mentor。Argon若delegate task:mid，该mid就得自己执行，不能按user worker prompt再spawn mentor。依据`omp://task-agent-discovery.md:372-376`、`A/agents/README.txt:48-59`。
4. **tools allowlist不是权限隔离。** 原生frontmatter tools只选择built-ins，MCP/extension/custom tools additive；`tools: []`也不保证没有扩展tool。依据`omp://task-agent-discovery.md:38`。prompt“不写代码”是职责，不能自动把delete、exec_command等插件工具挡住。fork_task显式agent更只复用role/model，不实施其tool限制。
5. **模型优先级**：task.agentModelOverrides > agent frontmatter > parent active/fallback；本机tiers具体映射在`A/config.yml:63-74`。per-call model默认off，并不能给子任务传任意model绕开operator绑定；`omp://task-agent-discovery.md:222-268`。本文不更改任何role。
6. **custom todo集成风险先解决再让agent承担edit型长期工作**；四tier worker可把纯调查与work分开，work前一次完整INIT，不靠每tool一条todo。完成后更新真实状态，不能为了通过gate缩goal、DROP没做的项。
7. **不要把“无限maxRuntime”误作“无需协调”。** 原生soft budget、maxDepth、task completion、todo提醒、turn judge、PTY生命周期、fork snapshot生命周期分别有边界。清晰assignment与可观察验收仍由parent负责。当前SYSTEM_TEMPLATE sub handoff明确未委派verification不自行跑check：`A/SYSTEM_TEMPLATE.md:146-167`。
8. **长跑恢复用事实渠道**：todo状态在branch journal；ctx task log是accepted操作时间线；fork是活进程request副本；peers是实时Main通信；terminal session是插件拥有的运行对象。各自开始结束锚点不同，不以索引/计划替代真实执行状态。

## 非 omomp 核心的已安装宿主集成

| 文件 | 触发/范围/控制 | 证据 |
|---|---|---|
| `orca-prefill.ts` | session_start且ORCA_PANE_KEY、有UI、ORCA_OMP_PREFILL时，把prefill放editor并消费env；没有Orca pane就无效。对child没有显式kind判断，但headless/UI guard通常使其不做编辑器操作。 | `E/orca-prefill.ts:1-12`。 |
| `orca-titlebar-spinner.ts` | factory只有ORCA_PANE_KEY才注册；画working/needs-input/idle title marker，timer随生命周期回收；只影响能setTitle的UI，非agent职责逻辑。 | `E/orca-titlebar-spinner.ts:15-24,40-76`。 |
| `orca-agent-status.ts` | lifecycle/model/session metadata发宿主hook；ORCA_AGENT_HOOK_ENDPOINT指定endpoint文件；orca-model command供宿主切模型。不是task completion judge。 | `E/orca-agent-status.ts:7-56,63-99,112-118,527-535`。本文未读取endpoint内容/凭据。 |
| `otty-integration.ts` | session_start/agent_start/tool_call/agent_end异步报告idle/processing到Otty CLI/socket；传OS pid，Otty只关联自己的pane；从不block/autoapprove。无main-only判断，child也可发event但归属pid由宿主解释。 | `E/otty-integration.ts:20-22,45-66,70-88`。 |

## Full / Light 差异

`A/config-light.yml:1-14` 关闭 doc-polish、fork-task、isolation-nudge、lang-nag、task-completion-judge、task-split-check、tool-policy-nag、turn-judge、user-prompt-inject、watchdog-agent，并把task.eager改default。`extensions: []`跳过extensions-last替换。**独立plugins仍加载**，所以todo/ctx、unified-exec、peers不是light就消失。来源`D/plugins-and-modes.md:41-55`。light不是隔离profile，也不是关闭所有安全规则：delete-guard、repo-rules、topics、memory warning、compaction等仍保留。

## 本次明确未做的运行断言

- 未验证每个configured model、provider、subscription、backend或remote build连通。
- 未把roundtable源码、遗留目录或catalog presence当成其runtime已执行证据。
- 未启动新omp实例去触发autoupdate/PTY/ask/watchdog；没有创建测试、临时probe、修改agent定义或设置。
- custom todo/edit组合是明确安装代码与当前harness契约的推导，仍需真实custom child入口检验；不能写成已看到该agent一次edit失败。所有其他scope结论是registration/guard层面的库存，不宣称逐功能端到端验收。
