# oh-my-omp 工作流提效：Round 1 证据报告与待投票方针

**性质：调查结果 + 未生效提案。** 依最新 U90，本轮不创建或修改正式 `.omp/skills/*/SKILL.md`，不改变角色、宿主、插件或工程契约。拟建 Skill 只交付到 `local://argon/skill-draft-omomp-efficiency.md`，正式方法及 Skill 均列在末尾决策表，等待领导小组表决。本文不是产品 `soroi` 的设计来源，不能把 omomp 的 fork、workpool、peers、watchdog 导入 soroi 产品设计。

作者：`ArgonGovernance.OmompOptimizer`。调查日期：2026-11-01。所有观察时间为 UTC；引用的旧报告有 +09:00 展示，本文已按原始 JSONL 的 Z 时间标注。

## 1. 结论先行

最先应处理的不是“再加一个管理轮次”，而是 **把任务交给实际具有相应权限的角色，并一次写对已有工具协议**：

1. **角色路由失配是本轮首个已复现障碍。** 13:19:45Z 以 `agent: "task:mid"` 启动的子任务，仅在 prompt 中要求“扮演 omomp-optimizer”；实际仍受 task:mid 的禁止再分派/禁止设计 Skill 约束，本片没有原生 task。自带巡检没有启动，不应虚报完成。应由有权限的上层以项目 custom role 直接派发，不用文字扮演替代角色绑定。
2. **task、todo、edit 的协议性返工可以直接量化。** 两次 task 拒绝到成功派发跨度 59.165 秒；两次 todo 语法拒绝到成功跨度 84.047 秒；一次未完整读行的 edit 到成功跨度 24.757 秒。这些是观察到的返工链时间，不是 A/B 实测节省。
3. **查询错误能被并行放大。** Sentinel 把 `ts:.timestamp` 写成 `ts:timestamp`，同一错误扩散到四席，随后在另一批四席查询中复发：8 次错误请求，跨度 122.870 秒。先读取字段形状，再把正确的只读查询并行化。
4. **设备名不等于函数名。** mux 两次调用不存在的 `xd.github`，2.548 秒后改为 `write xd://github` 才进入正常读取路径。remote 的 `gh issue view --comments --json` 同样被真实 CLI 拒绝。
5. **管理链路本身有可见返工，而不能把所有等待都算浪费。** 四席在 110.973 秒内收到“合并同域 PR → 撤回 → 恢复”的三轮消息，共12次广播，其中8次为后两轮纠正。W-05 的承载缺口首报到直接解阻通知约305秒；其中创建 issue 所需时间不是已证实浪费，不能全部算可省。
6. **不采用失真的统计或归因。** Main 有157次 wait、累计19166.600工具秒，并不证明“空等87.6%”；worker watchdog 把被监控工程会话称为 Main，也不能证明顶层 Main 写了该 worker 文件。本文只用原始调用及来源身份支持结论。

## 2. 方法、计划与证据口径

### 调查计划

- **决定性问题：** 能否从实际生效的角色/工具契约及原始调用结果，把可消除的协议返工与正当等待、真实工程错误分开，并给出 omomp 中可执行的替代写法？
- **步骤：** 先读角色、AGENTS、LEDGER；查当前 topic 和插件源码；量化六个领导席与四个工程 JSONL；回溯错误 resultEntry；对照父任务提供的五份巡检；搜索并读外部一手实践；形成报告、Skill 草案和决策表。
- **最便宜的决定性观察：** 原始 task 派发的 `agent` 字段及 task-mid 的 spawns；每个失败调用的 resultEntry；同一修改成功调用的时间戳。它们能直接排除“工具很慢”“工人不努力”等未经证明的解释。
- **边界：** 不改业务代码、不跑工程测试或 build、不访问生产/凭据、不解密 SOPS、不自行投票、不落正式 Skill，不改已发布历史报告。
- **未观测假设：** custom role 在顶层启动后是否实际挂载 task；新 Skill 的实际采用率与端到端节省；所有历史窗口内等待的可执行替代工作。以上不写成已验证。
- **导师/自带巡检：** 本片无 task，依实际 task:mid 递归上限条款记录计划后继续；未用 fork/eval 绕过。父任务提供了5份其调度的巡检报告，本文复用并独立抽查，不能把它们称为本片自行启动的巡检员。

### 时间与计数

- 领导席主观察窗：`2026-11-01T12:10:00Z` 至 `13:21:59.999Z`。`session://` 使用 `since=2026-11-01T1210Z&until=2026-11-01T1321Z`；until 包含整分钟。
- 工程原始 JSONL：首批四席12:59启动后至约13:21，下面每席列出实际最后入样时间。使用 message 记录 timestamp 边界过滤，按 toolCall 和 toolResult 分别计数。它是有界快照，不是席位当前状态。
- `durMs` 是 tool_execution_start 到 toolResult 的差，不是模型思考时长。并行调用的 durMs 不能相加当集群墙钟。
- “失败到成功跨度”包含模型生成、其他动作、消息中断，表示返工链长度；只有失败调用执行时长才是确定的失败工具耗时。没有改后同负载复测，绝不声称已节省全部跨度。
- `status:error`/`isError:true` 只是入口标记。编译错误、合并冲突与权限/协议错误分开，不把所有失败视为低效。
- fork 子代理含继承前缀。PhaseBClone 的本轮 `session_init` 为12:10:01.547Z/12:10:01.598Z（`f12c6074`、`ef0b3bbd`）；12:10:01.260Z 的父 fork 调用不是它的新工作，且在子副本缺结果会显示 error。下表已排除此继承事件，不重复追责。

### 六个领导席样本

| 席位 | 工具事件数 | error 事件数 | 观察到的 wait 数 / 工具秒 | 说明 |
|---|---:|---:|---|---|
| Main | 196 | 2 | 49 / 3423.645 | 不是“3423秒浪费”；子任务可同时推进 |
| PhaseBClone_ffeb | 125 | 3 | 34 / 2484.161 | 已排除继承的父 fork 事件 |
| Secretary | 136 | 4 | 1 / 19.645 | 窗内首工具13:02:56.810Z |
| Sentinel | 155 | 10 | 0 | 121次 read；包含8次同类JQ拼写错误 |
| Argon | 103 | 1 | 17 / 2476.475 | 不能把常驻待命推成缺席 |
| ArgonGovernance | 208 | 12 | 9 / 1108.279 | 包含本文研究开始前的协议返工 |

复现入口：`session://01a195a6/agents/<席位>/events.jsonl?since=2026-11-01T1210Z&until=2026-11-01T1321Z&q=[.,inputs]|map(select(.tool))|{n:length,errors:map(select(.status=="error"))|length}`；Main 省略 agents 段；clone 再排除 `entry=="9d947322"` 的继承事件。不要将六席相加再声称是独立全局事件数。

Main 更早全窗05:50:02.290Z—13:20:56.611Z的查询中，只选 kind=call/exec 得657项，其中wait157次、19166.600秒；该选法漏掉dispatch/irc_out，不是全部工具调用分母。它也不支持旧台账引用的87.6%“空等”数字。

### 四个工程原始样本

共同路径前缀：`/Users/mouriya/Ext/code/pepgent/.workers/`。

| 席位 | JSONL 文件（sessions/ 下） | message记录 | toolCall数 | isError结果数 | 入样首末时间 |
|---|---|---:|---:|---:|---|
| store | `pepgent-store/sessions/2026-11-01T12-59-15-164Z_01a19731-555c-7178-92fa-3b9dc4ba43dc.jsonl` |356|176|7|12:59:54.713—13:18:57.483Z|
| library | `pepgent-library/sessions/2026-11-01T12-59-17-805Z_01a19731-5fad-7799-ba11-46a1a90f71b6.jsonl` |213|116|8|12:59:54.798—13:19:21.539Z|
| mux | `pepgent-mux/sessions/2026-11-01T12-59-20-333Z_01a19731-698d-7711-af7a-3e1a24ddc0bf.jsonl` |199|108|3|12:59:54.918—13:16:59.737Z|
| remote | `pepgent-remote/sessions/2026-11-01T12-59-22-972Z_01a19731-73dc-7363-8511-784f19fccd35.jsonl` |213|115|7|13:00:21.736—13:21:00.169Z|

原始 JSONL 的 isError 结果总数25，不代表25个协议错误。例如store类型错误、git冲突和HTTP409是不同类别，本文不把它们混成“工具不会用”。工程session不在标准session索引中：四个 `session://01a19731-.../events.jsonl` 均返回无此session；因此改用已找到的原始JSONL，未因索引缺席认定进程不存在。

原始计数模板：

```text
read <worker.jsonl>?q=[.,inputs]|map(select(.type=="message" and .timestamp>="2026-11-01T12:59:00Z" and .timestamp<"2026-11-01T13:21:00Z"))|{records:length,calls:([.[]|.message.content[]?|select(.type=="toolCall")]|length),errors:map(select(.message.role=="toolResult" and .message.isError==true))|length}
```

该原始字符串筛选的上界包含 `13:21:00.169Z`（小数点排序早于Z），已在表中如实列出；精确闭开边界应统一毫秒格式或用时间解析，不能把这条便捷查询宣传为严格时间解析器。

## 3. 本机能力：实际读到了什么

| 能力 | 已读依据 | 本轮确定结论 |
|---|---|---|
| 定制源码归属 | `/Users/mouriya/Ext/code/omomp/` 目录；`~/.omp/plugins/package.json` | 目标 `.../oh-my-omp` 目录不存在，父目录存在omp-config及各omp-*仓；没有伪称查过不存在的宿主源码 |
| eval | `omp://tools/eval.md:145-264`、`tool://eval/bridge`、真实eval的typeof输出 | agent/workpool/output/tool.task均为function；函数存在不等于当前角色获准spawn |
| eval权限 | `omp-config/agent/config.yml:156-158` | `eval.tools.enabled:false`只控制kernel定义工具，不表示agent/workpool被关闭 |
| eval文档发现 | `xd://eval/agents`实际返回Unknown topic；可用judge/helpers/archive | 应从已存在的 `omp://tools/eval.md` 获取agent/workpool合同，不能猜设备topic |
| task限制 | `omp-config/agent/agents/task-mid.md:1-21`；`task-split-check/index.ts:98-129`；`isolation-nudge/index.ts:11-18,115-127` | task:mid只准mentor；report-limit会把Concise/brief也视为限制；研究任务显式isolated:false |
| fork | `omp-config/agent/extensions/fork-task/index.ts`、`xd://fork_task/limits` | 依赖原生task、persisted session、async；复制来源上下文，不提供独立盲审，不是逃避spawn policy的办法 |
| todo | 已安装 `omp-todo-more/src/protocol.ts:4-28,147-165`、topics.ts；`xd://todo/protocol` | 一个完整DSL文档、三字符串GOAL/INIT、ADD整数分钟、路径限定DONE |
| read/session | `tool://read/json`、selectors、forge；`session://README`；`session-urls/events.ts:420-460` | 查询元数据后取entry/resultEntry；时间用无冒号形式；bounded selector先于全量读取 |
| edit | `tool://edit/hashline-moves`、hashline-recovery | 最新read header+完整可见目标行；CUT/PUT寄存器支持跨文件移动，不手抄整段 |
| peers | 已安装 `omp-peers/src/tools.ts:124-167` | accepted仅确认投递；idle会被唤醒；main-session-only，subagent不要假冒跨进程peer |
| 终端 | `xd://exec_command`、waiting；`xd://monitor/subscription` | session_id是终端生命周期；monitor看未来输出，max_returns不停止进程；不靠空write_stdin轮询 |
| watchdog | `omp-config/agent/extensions/watchdog-agent/index.ts:19-95` | target与scope是实际配置；review note是判断，不是执行事实；默认每30个动作，不是墙钟30秒 |

**源头限制：** `command -v omp`找到Tern安装的205.2MB编译二进制，不是UTF-8源码；未反编译。宿主实现细节仅引用其内置文档，不声称完成宿主源代码审核。

## 4. 待投票方针与具体证据

以下 OM-01..08 均为待表决提案；“After”是可采用写法，不是已经改变现行规则。

### OM-01：用真实角色绑定保留巡检能力，不以“扮演”替代权限

- **观察窗/量化：** 本片13:19:45.619Z收到1个task:mid派发，要求自行生成low/free巡检；实际自主巡检启动0个，父任务提供5份既有巡检复用。不能报告为“已并发派出了自己的巡检员”。
- **原始证据：** [派发及成功回执](session://01a195a6/agents/ArgonGovernance/entry/08893bea)，参数明确`agent:"task:mid",name:"OmompOptimizer",isolated:false`；项目角色frontmatter允许task:low/free，而task-mid源定义只允许mentor。冲突不是名称大小写问题。
- **Before：** task:mid + prompt“Operate as OmompOptimizer”。
- **After：** 有task且有权限的顶层Main使用`tasks:[{agent:"omomp-optimizer",name:"OmompOptimizer",isolated:false,task:"<本轮范围与交付>"}]`；给调查切片明确只读源和各自报告路径。不要为此修改全局task-mid权限。
- **workpool/agent边界：** `omp://tools/eval.md:218-219,264`说明两者也受spawn policy与递归深度限制。当前eval真实输出为`{workpool:'function',agent:'function',output:'function',taskBridge:'function'}`，仅证明符号存在；没有启动越权子代理。顶层custom-role派发及其自带巡检链尚未由本片运行验证。
- **量化收益边界：** 能恢复任务要求的巡检结构是预期结果，具体墙钟节省未测；本轮实测仅为1次角色错配、0次自主巡检。

### OM-02：一次提交合规task批次，避免隔离和报告长度两轮拒绝

- **观察窗/量化：** ArgonGovernance 13:06:29.024—13:07:28.189Z，同一对probe两次失败、第三次成功；返工跨度59.165秒，确定失败工具执行累计0.003秒。Library 13:05:03.951—13:07:24.045Z，有3次task拒绝后成功，跨度140.094秒，原因包括多主题和未显式isolated。
- **原始证据：** governance [隔离提醒](session://01a195a6/agents/ArgonGovernance/entry/33ab91e4)、[报告长度拒绝](session://01a195a6/agents/ArgonGovernance/entry/e6b25b38)、成功`resultEntry=d164a556`。Library JSONL结果id`b92d78e0`、`c068846c`、`00deda04`，成功`9fa0231c`；完整路径见§2。
- **Before：** 两个研究item省略isolated，Acceptance写“Concise factual report”；第一次只补隔离，第二次才删Concise。
- **After：** 每项显式`agent`与研究用`isolated:false`；一个主题一个item；共享context与task都不写brief/concise/≤N行；“完整报告写local://...并返回路径”。并发写者独立worktree，单一集成人。
- **收益：** 本例可消除2次拒绝请求及对应重写，不承诺省59.165秒；语义split判定仍可能发生，不能命名为“保证零重试”。源码与外部Anthropic的清晰边界/避免重复派工原则一致。

### OM-03：按todo DSL原子提交计划/完成，不把提醒当逐词补丁

- **观察窗/量化：** governance13:03:12.390—13:04:36.437Z，两次失败后成功，84.047秒，失败工具累计0.003秒。mux、remote、library各有1次“Todo is empty”edit拒绝；Main13:00:24.762的无commit DONE被拒，13:00:33.767重试成功，间隔9.005秒。
- **原始证据：** [缺Begin Todo](session://01a195a6/agents/ArgonGovernance/entry/72f0e6da)、[补包装但GOAL仍错](session://01a195a6/agents/ArgonGovernance/entry/5cdf8fb0)，成功`accf469a`；[Main无commit DONE](session://01a195a6/entry/3713366b)。工程JSONL结果mux`8ae5a9fc`、remote`f45d8aea`、library`8cfce008`。
- **Before：** `GOAL "..."\nMEASURE "..."\nDONE WHEN ...`；ADD带EXPLAIN/ESTIMATE关键字；先edit后INIT。
- **After：** 先读`xd://todo/protocol`，在一次`*** Begin Todo`/`*** End Todo`文档中使用`INIT/GOAL "objective" "measure" "doneWhen"`、`ADD "title" "explanation" 10`、`START "title"`。主进程完成有自有改动时用路径限定`DONE "title" "<owned paths>" "<message>"`；共享父工作树的subagent不自行提交。不能为通过DONE夹带他人改动。
- **收益：** 可针对本样本减少2次语法拒绝和3次先edit后计划拒绝；不把计划文书完成当业务runtime完成，不将本轮未批准的定时器方案随示例带入。

### OM-04：只编辑完整看过的最新快照，使用紧范围与原生移动

- **观察窗/量化：** clone12:19:53.708 edit失败→12:19:55.385补读→12:20:18.465成功，24.757秒、1次失败+1次补读。governance主窗21次edit中6次error；不全归为同一根因。store/remote也各有一次unseen_lines。
- **原始证据：** [clone未完整显示25–26行](session://01a195a6/agents/PhaseBClone_ffeb/entry/d1cd45f7)；[governance跨入未显示24–33及43行](session://01a195a6/agents/ArgonGovernance/entry/602e3f5f)；store JSONL`763859f9`、remote`b0a22fd6`。
- **Before：** 用折叠/截断read的tag一次覆盖整个长表，包含从未完整读取的行。
- **After：** 用non-raw read取得当前header；若长行被截断，再以明确`:raw:25-26`读全目标行，再写紧范围`PUT 25.=26:`。新调用以后使用新tag/行号；不凭记忆重用。移动代码时用`CUT ... @name`再`PUT ... @name`，不手抄复制旧块；这一移动方法有文档支持，但本样本没有观察到对应移动错误，不另列收益数字。
- **收益：** clone本例可避免1次失败和返工读；不是提高hash校验，通过的是可见内容和编辑协议，**不以任何hash比对作证据**。

### OM-05：有界查session/JSON，先确认字段形状再并发扩展

- **观察窗/量化：** Sentinel13:04:32.166和13:06:35.036Z，两个四席批次共8次错误，批次首时刻相隔122.870秒；失败durMs总0.037秒。整个Sentinel窗121次read中10次error，至少8次为该拼写错误。
- **原始证据：** [首批调用](session://01a195a6/agents/Sentinel/entry/00a6a2ba)，[undefined filter结果](session://01a195a6/agents/Sentinel/entry/1d766dea)；[第二批相同错误](session://01a195a6/agents/Sentinel/entry/ddae6b52)。失败表达式含`{ts:timestamp,...}`，不是权限或session丢失。
- **Before：** 四个并行JSONL请求复制同一错误，随后再次复制；大范围直接读timeline容易把dispatch/IRC及继承前缀错计。
- **After：** `read <jsonl>?limit=2`确认字段；字段引用写`ts:.timestamp`。先用`events.jsonl?since=...&until=...&q=select(.status=="error")|{t,tool,entry,resultEntry}`定位，随后读resultEntry而不是只读调用entry。工作日志未登记到session索引时用已定位的JSONL，不反复查询不存在的session。无需用shell python/jq抽取同一数据。
- **收益：** 本例减少8次确定失败请求；122.870秒不是已测可回收时间。使用按时间切片/结果entry查询，还能避免不必要全量上下文，但token节省本轮未测。

### OM-06：设备走write协议，GitHub读取走原生URI/file_read

- **观察窗/量化：** mux13:00:02.231两次`xd.github`调用，结果均为Tool not found；13:00:04.779改为write设备，2.548秒后进入正常路径。remote13:00:30.162结果拒绝`gh issue view --comments --json`；library13:16:40.201及13:17:25.917的插值Bun.$调用被delete-guard拒绝，remote13:09:06.758也有非literal command拒绝。这些均不需要加shell包装解决。
- **原始证据：** mux JSONL调用`376a1a75`，错误`f93be227`/`71ad1f7e`，正确调用`e1bfadc2`及成功结果`bcadb008`/`8c96fef7`。remote结果`299cf88e`；library`07d7794a`/`c070af2d`，remote`fb4739b9`。
- **Before：** 发明函数`xd.github(...)`，混用CLI互斥参数，eval里拼Bun.$去绕过原生读取。
- **After：** `read issue://Pepgent/remote/16`（对应 https://github.com/Pepgent/remote/issues/16 ，包括评论）；GitHub文件用`write`到`xd://github`，content为`{"op":"file_read","repo":"Pepgent/PM","path":"evidence/decisions/D16-phaseB-review-restore.md"}`。多个独立读取用并行工具批次或`Promise.all`调用已有tool桥；返回有hasError时先处理，不把错误正文当JSON。
- **边界：** xd://github没有issue_comment/update等op；写评论仍由已授权owner使用现有gh/API路径，不发明不存在的设备方法。账号仍用RiriAgent；不要求操作员粘token。
- **收益：** mux样本可减少2次未知工具请求。没有测到所有gh都比设备慢，不作该声明；选原生入口首先为了参数正确、上下文完整及不落临时文件。

### OM-07：普通承载与状态沿源头总线闭环，取消中间人串行审批

- **观察窗/量化：** W-05 13:07:46Z首报承载缺口，13:07:52Z由Main转给clone；13:12:51.323Z工程JSONL收到解阻通知，约305秒。另在13:03:04.543—13:04:55.516Z，W-05收到3轮方向相反的消息；Main对4席共发12条，后两轮8条为纠正流量。
- **原始证据：** [Main中转](session://01a195a6/entry/91a94ccb)、[Main解阻通知](session://01a195a6/entry/c1f63a54)、[临时撤回](session://01a195a6/entry/600b3c0b)。Library JSONL入站`807e7835`、`55587e54`、`84347b54`记录三轮原文；`daf39d1e`记录13:12:51.323Z与 https://github.com/Pepgent/lab-library/issues/13 的关联。原BLOCKED在 https://github.com/Pepgent/PM/issues/25#issuecomment-6558363366 。
- **Before：** 工程师→Main→治理分身→秘书→Main→工程师；普通解除再发治理回执；以IRC临时解释替换正文，又撤回解释。
- **After：** 已授权的普通缺承载问题由负责issue写入的秘书在原BLOCKED评论闭环，写真实对象链接；经理只处理确有契约选择的决策。派工引用生效用户/决策正文，不重述另建第二套规则；普通STARTED/PR/DONE保留在原issue/PR。必要的跨进程唤醒走peer_send，accepted只代表已投递，不代表动作完成；不要等“收到”回执才推进独立工作。
- **收益边界：** 可减少普通事项的中继跳数和8条改口流量；305秒中秘书创建/取证所需时间未知，不把它全部算浪费，更不声称已实施零等待。无需引入新队列服务或event-store；复用已有GitHub/Agent Hub/omp-peers。

### OM-08：只把真实失败和可行动等待计入优化，保留来源身份

- **观察窗/量化：** 主窗Main49次wait，3423.645工具秒；Argon17次wait，2476.475秒；两者可能同时发生。Root全窗只有1次write_stdin，未观察到重复write_stdin轮询，因此本轮不能捏造“反复PTY轮询”的实例。
- **具体证据：** Main `events.jsonl` 中wait聚合；`session-urls/events.ts:420-460`说明durMs与dispatch投影；fork的两个session_init边界见§2。治理巡检`probe-leadership-now.md`引用 [LeadMentor的Main派发](session://01a195a6/entry/cae1f637)及就位`980f51ea`，反驳旧消息把idle说成缺席；worker被watchdog称Main的材料见`workers-manager-trace.md:74-78`，它本身不是顶层身份凭据。
- **Before：** 把sum(wait durMs)叫纯浪费，拿旧报告快照当当前状态；把watchdog指控直接当执行事实；fork继承调用重复计错。
- **After：** 统计按拥有方、时间窗、session_init边界，回溯toolResult与真实session/cwd；有独立工作才继续，不存在行动时允许wait。长期命令用exec_command返回的session_id挂monitor一次；无condition仅完成时唤醒，有condition时必须理解只观察未来输出且max_returns不杀进程。原生task自动返回结果，不反复读agent/proc充当轮询。
- **收益边界：** 本轮能排除1个继承fork假错误、1类idle误报及不成立的浪费百分比；没有测到PTY轮询节省。monitor是有合同的预防性模板，不能单列成已证实的高影响问题。也不借此取消现有合法watchdog或改变监督授权。

## 5. 外部一手实践：借用方法，不移植架构或业绩数字

已主动使用web_search搜索多Agent并行编排、Actor/Event-Driven工作流和工具优化，再直接读取如下原文：

1. **Anthropic，How we built our multi-agent research system**（2025-06-13）：https://www.anthropic.com/research/multi-agent-research-system 。原文强调：每个子任务有目标、输出形式、工具/来源和边界；专门工具优先；可独立研究方向及工具调用两级并发；成果写artifact并传轻量引用，避免game of telephone；同步等待整批最慢任务会卡信息流。同时提示multi-agent研究可能用chat约15倍token，依赖密集的coding不适合机械扩大并发。
   - **本地映射：** OM-01/02合法角色+单主题派发；OM-06并发原生读取；OM-07文件/issue结果直达；OM-08不凭并发数/等待数判断效果。
   - **明确不搬用：** 文中90.2%研究质量提升、最高90%时间降低、40%工具说明优化收益都不是本项目数据，不写成本轮收益；不把其小样本eval建议解释成“代码完成前可写/跑测试”。
2. **Microsoft AutoGen Core，Agent and Multi-Agent Applications**：https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/core-concepts/agent-and-multi-agent-application.html 。原文定义agent为通过消息通信、维护自身状态、响应事件的独立单位，可在不同进程/机器运行。
   - **本地映射：** 各工程席维护自己的实现/执行事实；秘书持有issue写入任务；经理不当每条状态的同步中转。复用现有Agent Hub与omp-peers，不引入AutoGen依赖，不把它当本地工具API资料。
3. **AutoGen runtime与消息说明（web_search检索到，未在本轮逐段核读）**：https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/core-concepts/architecture.html 、https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/framework/message-and-communication.html 。仅列进一步阅读，不从未读章节生成本地具体实现或收益结论。

外部资料是可讨论的实践依据，不是新增治理规则来源；本地正式方针仍须U90要求的投票。

## 6. 复用巡检报告的有效性与限制

父任务提供并已读：

- `local://argon/leadership-30m-audit.md`：05:48:24—12:18:24Z，13个30分钟窗。保留为历史行为索引；表中“工具回合”“活跃代理”的方法与本报告toolCall口径不同，未直接混算。该文末尾“等回写再预审”是旧提案，不能重新设门禁。
- `local://argon/probe-leadership-now.md`：六席/四秘书最近20分钟的事件链接。LeadMentor idle≠缺席、三轮口径反转均有原始entry或接收JSONL支撑。
- `local://argon/probe-workers-now.md`：四席约13:09的快照。它把“滚动”推成“必须第一批全部完成才发下一批”的解释没有被本文采用，不把其建议升级成契约。
- `local://argon/workers-manager-trace.md`：截至约13:19的worker与经理因果线索。不能仅凭watchdog在worker会话里称“Main”便断言顶层Main亲自实现；本报告不作该人身归因。相关本仓runtime是否“无必要”还涉及上位runtime规则，本轮不建议绕过验证要求。
- `local://argon/clone-and-manager-audit.md`：W-05链路延迟、D16-11a与四秘书生命周期。采用有对应原始记录的时间点，不把当前running/parked状态从旧快照搬成今天的实时结论。

这些报告保留原文，不回写旧报告；有分歧在本报告明确说清，不沿用不可靠数字或结论。

## 7. 交付与未验证项

- 已写本报告会话副本及指定PM evidence同名文件；Skill仅写非生效草案。未修改正式`.omp/skills/`、业务代码、角色定义或系统配置。
- 本轮实际运行的是文件/URI读取、内嵌JSON查询、外部检索以及两次eval观察/数值计算。未运行项目测试、lint、build、工程runtime；未用hash验证作证据。
- 未实施性能优化，因此没有同负载改前/改后收益实测。表中请求减少数是按观察到的错误调用可消除数量推导，不是已兑现SLA。
- custom-role真实启动→自带巡检→产出报告的运行链，以及拟建Skill被角色加载并正确使用的真实路径，均尚未由本片验证；应在表决后由有权限的上层执行，记录首次成功派发、产物及下一有界观察窗。此缺口不阻止交付当前证据报告，但不能宣称Skill已部署或提效已验证。
- 本片在父共享工作目录执行，不自行提交他人文件；PM文件的路径限定提交/推送由父任务集成。未进行git历史或GitHub历史调查。

## 8. 正式待投票决策表（全部未生效）

| ID | what | where | how | 取舍 | 分类 |
|---|---|---|---|---|---|
| OM-01 | 自带巡检角色必须实际按custom role派发 | Main的task派工；项目omomp-optimizer调用方式 | 顶层以agent:"omomp-optimizer"启动；显式只读范围；由运行时验证task及递归能力，不改task-mid权限、不用eval绕过 | 多保留一个真实角色绑定，换取职责与工具一致；修复链尚待实测 | 串联 |
| OM-02 | task一次写全隔离/主题/报告合同 | 巡检task批次与Skill草案§2 | 研究isolated:false、显式agent、单主题、完整报告到文件；正式写者隔离且单一集成人 | 减少拒绝与重写，不保证语义judge永不提醒 | 实现 |
| OM-03 | 固定todo DSL和所有权限定完成写法 | Skill草案§3；各角色执行提示的工具模板 | 读取现有protocol；INIT/GOAL三字符串、ADD整数分钟；DONE只处理自有路径，共享subagent交父集成 | 少量前置协议阅读，避免工具回合反复纠词；不扩张计划仪式 | 实现 |
| OM-04 | 完整可见最新锚点与原生移动 | Skill草案§4；文档编辑动作 | non-raw header+必要raw完整行；紧范围PUT/CUT；移动用寄存器；拒绝按错误类别修正 | 必要补读换取避免大块盲改；不增加hash验证 | 实现 |
| OM-05 | session/JSON按窗定位并追resultEntry | Skill草案§5；Sentinel/巡检工具模板 | 先确认JSON字段，ts:.timestamp；按时间/type查询；fork以session_init分界；未索引worker走原始JSONL | 多一个最小形状观察，减少复制错误和上下文污染 | 实现 |
| OM-06 | GitHub设备/URI代替未知函数及不必要shell包装 | Skill草案§6；只读资料和总线查询 | read issue/pr URI；文件write xd://github file_read；独立读取并发；写操作仍走真实支持的owner路径 | 不声称设备总比gh快；保持账号、权限与完整评论语义 | 实现 |
| OM-07 | 普通承载缺口由秘书在原总线闭环 | 派工/秘书职责衔接及原BLOCKED评论 | 减少Main→clone中转；只升级真实契约问题；引用生效正文、不反复IRC改口；维持合法工程验证与最终验收 | 减少管理跳数；不取消重大设计投票，不给普通问题新增审批 | 串联 |
| OM-08 | 等待和watchdog归因使用真实生命周期 | Skill草案§7及巡检统计口径 | durMs不当浪费；idle不当缺席；watchdog不当执行事实；task自动交付/PTY用monitor；不变更合法监督配置 | 不夸大提效成绩；保留正当等待，拒绝无证据百分比 | 实现 |
| OM-S1 | 在通过后安装一个project级omomp-high-efficiency Skill | 拟路径`.omp/skills/omomp-high-efficiency/SKILL.md`；当前仅`local://argon/skill-draft-omomp-efficiency.md` | 按本表获通过的行落正文；保留触发、Before/After、真实工具模板与权限边界；由有权角色走一次实际加载/使用路径并记录结果 | 当前仅草案不生效；一次复用文档替代反复口头教学，不新增规则来源 | 实现 |
