# Custom agent 缺失 todo 与 edit gate：只读调查结论

## 结论

`secretary.md` 的工具名 **`todo` 已经正确**，CSV frontmatter 也合法。问题不是漏写、大小写、`todo_more` / `todo-more` 别名或 YAML 语法，而是两条不对称的运行路径：

1. OMP executor 在普通（未真正 armed prewalk 的）子 agent 上按名称移除 **所有 `todo`**，不区分 native tool 与同名 extension tool；extension API 再启用 active tools 也受相同过滤。
2. 已启用的 `omp-todo-more` 只给 **`task:high`、`task:mid`、`task:low`、`task:free`** 四个精确 displayName 绕过 executor，直接恢复 `todo`。
3. 同一个插件的 **edit 前置条件没有这四个名字的限制**：凡本会话有 `edit`，都包装其 execute；当前子会话自己的分支上没有 todo list 时，返回初始化提醒、拒绝 edit。

因此 `secretary` 得到了 edit gate，却得不到解除 gate 所需的 todo。父会话初始化自己的 todo 不解决它：gate 与 todo 都通过当前 agent 的 session、当前 session branch 读写状态。

**保持 `secretary` 身份、既有模型路由和非 prewalk 行为的前提下，没有可用的 `tools:` frontmatter 修复。** 要求给出一个不存在的工具别名会误导；现有 `todo` 就是准确名称。

仅有一个有条件的 frontmatter 路径：新增 `prewalk: true`，让 executor 的 prewalk 例外保留插件注册的 `todo`。但它同时启用真实模型 handoff，且必须 target 可用、与初始模型/effort 不是 no-op；不是等价的工具授权修复，不建议把它偷偷当成秘书修复。下文给出准确语法与限制。

## 精确声明 / frontmatter 处理

### 工具名：原声明无需改名

```yaml
tools: read, grep, glob, find, bash, edit, write, todo, task, wait
```

- 正确名字是 `todo`。
- 不是 `todo-more`、`todo_more`、`TodoWrite` 或 `functions.todo`。
- 删除 `tools:` 改用默认工具集，不能绕过后面的 executor 名称过滤。
- 重复列 `todo`、换成 YAML array 同样不能绕过。
- 不应把 `name: secretary` 改成 `task:low` 等白名单名字；那会改变 agent 身份并碰撞现有定义，不是修复。

### 唯一已查明的 frontmatter 例外（改变行为，非无副作用修复）

```yaml
# 在现有 frontmatter 内新增；tools 一行保持原样
prewalk: true
```

源码的含义是：选择 `@smol` 作为 handoff target（`DEFAULT_PREWALK_TARGET`），真正 armed 后不剥离 todo。也支持 `prewalk: "@<已有角色>"` 这样的明确 target，但调查未选择或改写任何模型角色。

成立条件：

- `task.agentPrewalk.secretary` 没有覆盖成 off（本次读取 `cfg://task` 的 agentPrewalk 为 `{}`）；
- target 能解析且有 configured auth；
- target 的模型身份和 effective thinking 配置不与起始配置完全相同，否则 executor 跳过 arm；
- 正常 task child，不是禁用该路径的 prepared session；
- 插件正常加载。

代价：首次符合条件的 edit/write 回合后发生 handoff。`omp://prewalk.md` §Handoff trigger 明确这是模型切换机制，而不是单独的 todo opt-in。不能用“把 target 设成当前同一个模型和 effort”来无副作用保留 todo：executor 会把它认定为 no-op，不 arm，todo 仍被移除。

若目标是保留秘书现有行为，修复归属在插件的 **子 agent 工具恢复策略与 edit gate 适用范围一致性**，而不是 frontmatter 拼写。本次只定位边界，不设计或修改插件。

## 决定性证据链

### 1. 输入声明及解析契约

当前项目 `.omp/agents/secretary.md:1–7`：

```yaml
name: secretary
model: openai-codex/gpt-6-1-sol:high
spawns: task:low, task:free
tools: read, grep, glob, find, bash, edit, write, todo, task, wait
```

`omp://task-agent-discovery.md:34–40`：tools 接受 CSV/array；省略/null 选择 built-in defaults；extension/custom tools 是 additive。该列表不是免除下游 executor policy 的授权。

本地 harness 源码 `/Users/mouriya/Ext/code/oh-my-pi/packages/coding-agent/src/discovery/helpers.ts:333–343`：

```ts
const rawTools = frontmatter.tools;
let tools = rawTools == null ? undefined : (parseArrayOrCSV(rawTools) ?? []);
// ...
if (tools) tools = normalizeToolNames(tools);
```

不存在“该 CSV 没被识别”的证据。

### 2. Native todo 设置与子 agent 移除是不同层

`cfg://todo` 本次返回：

```yaml
enabled: false
```

这符合 todo-more 的安装要求：安装插件的 `index.ts:1–3` 明确 native todo 应关闭。

`omp://tools/todo.md:181–182` 解释：native availability 由 `todo.enabled` 控制；includeYield 场景默认排除，prewalk armed 除外；executor 另把 todo 视为 parent-owned 从子 agent 移除，prewalk 是例外。

本地源码 `packages/coding-agent/src/tools/index.ts:751–752`：

```ts
if (name === "todo")
  return (!includeYield || session.prewalkArmed === true) && cfgTodoEnabled.get(session.settings);
```

**native 开关不是 extension 的开关。** 此环境 native 关闭，但插件仍注册一个名字也叫 `todo` 的独立实现。

本地源码 `packages/coding-agent/src/task/executor.ts:4784–4787,4817–4820`：

```ts
const isParentOwnedTool = (name: string): boolean => !prewalk && name === "todo";
// ...
const filteredSubagentTools = subagentToolNames.filter(name => !isParentOwnedTool(name));
await awaitAbortable(session.setActiveToolsByName(filteredSubagentTools));
```

同文件 `:4878–4886` 在 initializeExtensions 时还传入：

```ts
filterActiveTools: toolNames => toolNames.filter(name => !isParentOwnedTool(name))
```

所以在 tools frontmatter 中列出 todo，不能推翻这个后置名称过滤。

### 3. 已安装、已启用的插件确实注册 `todo`

本次读取 `/Users/mouriya/.omp/plugins/omp-plugins.lock.json` 的 `.plugins["omp-todo-more"]`：

```json
{"version":"0.1.20","enabledFeatures":null,"enabled":true}
```

这是观察到的安装记录，不是建议钉版本。

`/Users/mouriya/.omp/plugins/node_modules/omp-todo-more/package.json:15–18` 将 `./index.ts` 声明为 omp extension。

直接读取 **已安装路径** `.../omp-todo-more/index.ts:72,82–83,163–165`：

```ts
const TOOL_NAME = "todo";
const TOOL_FIELDS = { name: TOOL_NAME, /* ... */ };
// ...
pi.registerTool(TODO_TOOL_DEFINITION);
```

不存在注册内部名和模型名不一致的证据；本次最初关于工具别名的假设已被源码排除。

### 4. task:* 能用不是 built-in 特权，而是插件精确白名单恢复

已安装插件 `index.ts:74–79`：

```ts
const TODO_AGENTS: Record<string, true> = {
  "task:high": true,
  "task:mid": true,
  "task:low": true,
  "task:free": true,
};
```

`:115–130`：

```ts
if (ctx.agent.kind !== "sub") return false;
const ref = AgentRegistry.global().get(ctx.agent.id);
return ref !== undefined && Object.hasOwn(TODO_AGENTS, ref.displayName);
// installForTask:
if (!isTaskAgent(ctx)) return;
// ...
await session.setActiveToolsByName([...enabled, TOOL_NAME]);
```

`:133–141` 还有工具 registry 中没有 todo 时的 `refreshRpcHostTools` 安装路径。`:167–173` 每次 before_agent_start 调 installForTask。

源码注释 `:121,129` 直接说明这是给 task:* 恢复 executor 剥离工具、并直接调用 session 以避开 extension active-tool filter。

**术语更正：** 本环境这四个 `task:*` 不是 OMP 核心 bundled agents。`~/.omp/agent/agents/task-mid.md:1–5` 是 user agent 定义 `name: task:mid`、`spawns: mentor:default`、未列 tools。核心 `packages/coding-agent/src/task/agents.ts:45–75` 的 embedded names 是 scout/reviewer/security-reviewer/seance/task/sonic，不含这四个带冒号的 tier。`cfg://task` 还观察到核心 task/scout/sonic/reviewer/security-reviewer 被 disabled。

因此不能从 task:* 可编辑推断所有自定义 agent 都有 todo，也不能归因于“它没有 restrictive tools 列表所以自然得到 todo”：决定性的差异是 todo-more 对 **名字** 的专门恢复分支。

### 5. edit gate 对自定义子 agent 同样生效

已安装插件 `src/planning.ts:79–118`：

```ts
const session = AgentRegistry.global().get(ctx.agent.id)?.session;
const tool = session?.getToolByName("edit");
// ... wrapper execute:
if (readTodoMore(session.sessionManager.getBranch()).kind === "empty") {
  return { isError: true, content: [{ type: "text", text: INIT_REMINDER }] };
}
// ...
pi.on("session_start", (_event, ctx) => installSafely(ctx));
pi.on("before_agent_start", (_event, ctx) => installSafely(ctx));
pi.on("tool_call", (event, ctx) => {
  if (event.toolName === "edit") installSafely(ctx);
});
```

没有 `ctx.agent.kind === "main"` 判断、没有 TODO_AGENTS 白名单、没有“todo 是否 active”条件。它查询当前 agent 的会话，而非父会话。

同文件 `:15–16` 的 INIT_REMINDER 与用户报告的拒绝文案一致：完整 Todo document 必须成功且 list 有 items 后 edit 才解锁。

当前真实可读文档 `xd://todo/protocol:4–15` 也确认插件使用 `*** Begin Todo` / `INIT` / `PHASE` / `ADD` / `*** End Todo` 格式，不是 `omp://tools/todo.md` 所描述的 native JSON op 协议。两份文档对应不同实现，不应混用。

### 6. prewalk 例外为什么有条件、不能冒充普通修复

`omp://task-agent-discovery.md:48` 说明 frontmatter prewalk 与 per-agent override；`omp://settings.md` 的设置生命周期说明 task dispatch 会重读设置，而不是修改已运行 child。

本地 `packages/coding-agent/src/config/model-resolver.ts:1339–1368`：

- `DEFAULT_PREWALK_TARGET = "@smol"`；
- `task.agentPrewalk` 的 off 优先；
- frontmatter true 解析为默认 target。

本地 `packages/coding-agent/src/task/executor.ts:4534–4567`：

- target 缺失/无 auth：skip prewalk；
- 相同模型与 effective thinking：skip prewalk；
- 否则才 `prewalk = { target, thinkingLevel: ... }`。

结合 `:4787`，被保留的是 **实际 armed** 的 child，不是文件中单纯出现 `prewalk: true` 就保证保留。

## 调查方法、范围与剩余验证

- 只读文档、frontmatter、插件启用记录、已安装插件源码、本地 harness 源码及单键设置；没有改 repo、agent 定义或 config。
- 调查前向 mentor 复核了决定性路径：frontmatter parsing → native/extension identity → executor tool selection → edit state lookup；源码排除了别名假说，确认白名单与 gate 范围不一致。
- `command -v omp` 观察到当前 CLI 路径为 `/Users/mouriya/Library/Application Support/Tern/omp/bin/omp`。核心实现细节以当前暴露的 omp docs 与本地源码互证；本次没有反编译运行二进制，未声称本地 checkout 与运行二进制逐字一致。
- 已安装 plugin 的源码是直接从 `~/.omp/plugins/node_modules/omp-todo-more/` 读取，不仅凭开发 checkout 推断。
- 用户报告“secretary 缺 todo 且 edit 拒绝；task:* 可编辑”作为既有 runtime 事实接受，没有为质疑该事实重跑。
- 未运行测试、模型子会话或修改性 probe；本任务是只读定位，不是假装交付修复，也未验证 prewalk 条件路径的运行结果。
- 后续若父任务选定修复：应在新建 secretary child 上观察 tools roster，成功提交完整 Todo document，再完成一次实际 edit；不能用父会话 todo 或单纯读取文档替代。该 runtime 验证属于实施修复后的父任务，不在本次只读范围。
