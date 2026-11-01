# D12 对现有 Lab 视图契约的逐叶子覆盖审计

## 范围、方法与结论

**结论：发现 51 条 GAP（按共同缺失的业务来源分组；一条可涉及多个明确列出的叶子）。** 这些不是 P1–P17 已承认的 U，也不是要求把 renderer 文案搬到服务端。主要集中在实验属主、报告元数据、在途调用时刻、节点分组与估时、讨论摘要与引用关系、镜像定义深度，以及设置页所需的讨论/Panel/项目与模板配置。

审计基线是读到的 `local://decisions/D12.md` 537 行版本：包含 `LabPageWire` 第 332–358 行、P14–P17 第 501–504 行。后续草案修订不自动成为本报告的证据。只读了指定 Web 工作树、D7、D12、Argon 基线及 [PR39 的节点定义类型](https://github.com/Pepgent/Pepgent/pull/39/files)。没有读取禁止的根 checkout、会话历史或运行程序；唯一写入是本报告。

已完整阅读 `client/contracts/lab-{auth,common,compute,experiments,home,snapshot,text,workspace}.ts`。`lab-auth.ts` 是登录输入/结果，不可从 `LabSnapshot` 到达；`lab-text.ts` 是本地化转换，不新增业务叶子，因此两者没有第 19 张表。

**审计问题：目录加当前页面公开线数据，是否足以在不猜业务事实、不补隐式跨页读取的情况下，投影出现有视图每个叶子？** 步骤是展开全部类型，核对显式来源，再核对特别容易混淆的 consumer（首页报告/图、设置详情/模板、自动化计数）。最便宜的决定性观察是对照 D12 的 `LabPageWire` 字段和其引用类型：例如 PR39 `NodeDefinition` 没有 `group` 或估时，而 `flowEditor.palette` 和 `nodeLibrary.definitions` 消费它们。无 `task` 工具可用，按递归上限规则未启动 mentor。

不在范围内：重新设计接口、实现投影、修改视图契约、讨论失败/竞态、评价性能、浏览器/runtime 验证。本文中的算法是可计算性证明，不是已经存在的实现。

### 分类与展开约定

- **A**：D12 已有同义权威字段，改名/取子字段不改变含义。用户内容 `string` 到 `LabString` 的承接不要求服务端生成双语。
- **C**：有具体权威输入，给出纯函数算法；时间显示额外使用页面显式传入的当前时刻与 locale。
- **K**：renderer copy、显示规则、布局或页面本地编辑状态。**K 不允许保存演示 AI 回答或伪造运行结果**；原型种子字段可保留为无业务作用的空演示输入，而不是接通后继续播剧情。
- **U**：D12 明说没有来源，或沿用 D7 明确编号的占位。P1 仅覆盖产物契约/判据，不自动覆盖任意节点元数据；P3 仅覆盖 remote 模板资料，不自动覆盖镜像历史或节点估时。
- **GAP**：没有以上任何成立的来源。分为“权威模型没有这个事实”和“已有别页类型，但当前读取没有它”两种；后者不能靠隐藏请求冒充纯投影。
- `[]` 表示数组元素，`[id]` 表示索引值；同一行逗号分隔的每个路径各自获得该行分类。条件不同的同名叶子明确分行。
- `LabText` / `LabString` 当文本叶子，不把 `en`、`zh-CN` 作为后端业务字段。`kind` 判别字段也计入。
- 表中路径均以所在节的顶层字段为根；`experimentFlows[run]` 下省略 `[run]`。
- `Cat` = `LabCatalogWire`；`Page.x` = `LabPageWire['x']`；`Exp` = `ExperimentWire`；`Def` = D12 引用的 PR39 `NodeDefinition`（PR 源文件第 31–53 行）；`Tpl` = `TemplateWire`。
- 合法输入为目录、当前页、D12 明写的按会话模型读取与字节/流路由。`discussions` 列表与选中 `discussion` 详情可以按 D12 已公开的两个读取组合；这不是所有页面都可偷偷加载其他业务页的许可。列表的最后消息文本仍必须由列表读取本身提供，不能逐讨论取完整 transcript 冒充摘要。

### 两类公共结构的有限展开

为避免在十余张表反复写同一弹窗类型，以下两个**有限路径集合**是表格中的缩写，不是漏查的 `*`：

- **D（DialogSpecFixture，common:140–184）** = `id, title, subtitle, fields[].key, fields[].label, fields[].hint, fields[].kind, fields[].placeholder, fields[].value, fields[].mono, fields[].rows, fields[].options[].id, fields[].options[].label, fields[].options[].meta, fields[].onText, fields[].text, fields[].code, warning.tone, warning.text, tone, confirmLabel, hasCancel, completion.kind, completion.title, completion.detail, size, labelColumn`。`value` 的字符串/布尔/数组分支均是页面输入；选择目录对象时从对应目录事实初始化，不能另存一份业务事实。
- **AI-K（AiConversationFixture 的 copy/页面叶子，common:111–132）** = `prompts[], reply, placeholder, subtitle, scope.label, seed[].blocks[].note, seed[].blocks[].kind[actions], seed[].blocks[].actions[].label, seed[].blocks[].actions[].emphasis`。其中 `reply` / 演示 actions 不能作为真实响应；真实文本必须来自 messages。真实工具动作若需要独立业务 payload，不可只发显示 label。
- **AI-A/C（公共会话的动态叶子）** = `sessions[].name, sessions[].meta, seed[].kind, seed[].text, seed[].blocks[].kind[changes], seed[].blocks[].title, seed[].blocks[].rows[].kind, seed[].blocks[].rows[].text, scope.value`。每节明确其页面来源；不是说所有这些字段都在一个 `messages` 字段中。
- **Preview（workspace:54–57）** = `kind, columns[], rows[][], highlightedRow, note, aspect[0], aspect[1], dimensions, text`；各使用处区分解码内容 C 与高亮/说明 K。
- **Detail（compute:15–23）** = `kind, createdById, focusedByCount, title, rows[].label, rows[].value, rows[].format, rows[].id, rows[].note, rows[].enabled`；设置节对业务值逐项拆开，不把整个 Detail 当 copy。

## 1. labs

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `[].id` | A | `Cat.labs[].id` |
| `[].glyph` | A | `Cat.labs[].glyph`；缺省图标是 renderer 规则，不造 Lab 属性 |
| `[].name` | A | `Cat.labs[].name` |
| `[].description` | A | `Cat.labs[].description` |
| `[].activity` | GAP | G01；只给选中 Lab 的 experiments，不能计算其他可切换 Lab 的活动数 |

## 2. account

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `memberId` | A | `Cat.account.member` |
| `displayName` | A | `Cat.account.name` |
| `email` | A | `Cat.account.email` |
| `role` | C | `Cat.account.role` 查角色 copy |
| `labMembers` | C | `Cat.members.length` 插入成员数 copy |

## 3. members

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `[].id` | A | `Cat.members[].id` |
| `[].name` | A | `Cat.members[].name` |
| `[].initials` | A | `Cat.members[].profile.initials`；如使用姓名首字母则是同一输入的 C |
| `[].avatarTone` | A | `Cat.members[].profile.avatarTone`；渲染器缺省颜色不是新业务事实 |

## 4. projects

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `[].id` | A | `Cat.projects[].id` |
| `[].name` | A | `Cat.projects[].name` |
| `[].itemCount` | GAP | G02；D7 说由投影算，但目录没有项目下讨论/结论等项目项全集，也未定义 item 的计数口径 |

## 5. experiments

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `[].id` | C | 运行取 `Exp.ext.run`；未绑定草稿取 `Exp.draft.id`，按 D12 草稿/运行路由引用区分 |
| `[].name` | A | `Exp.ext.name` / `Exp.draft.canvas.title` |
| `[].owner` | GAP | G03；`holder` 是 SessionId，`writerSession` 也是 SessionId，不能当 MemberId；目录没有会话到成员的关联 |
| `[].status` | C | 草稿/pendingLaunch→draft/queued，`run.state`→running/ended/stopped；任一 `slots[].state.kind=awaiting_human`→needs_you |
| `[].project` | A | `Exp.ext.project` / `Exp.draft.project` |
| `[].where` | C | 以 `graph.nodes[Call].env` 的 central/template/remoteRun 分组，拼环境标识和调用数；设备友好名若要求则另依赖 P3 |
| `[].progress.done` | C | 统计已提交的 `graph.nodes[Call]`；不从预计节点数造分母 |
| `[].progress.total` | U | D7:93、D12-04/08 明定无来源，不画进度条 |
| `[].nodeTotal` | C | 已结束运行计 `graph.nodes[Call].length`；草稿计 `draft.canvas.nodes.length`；开放运行的未来总数不提供 |
| `[].now` | C | 将 `slots[].state` 的运行/等人事实、函数名及 `graph.state` 投为状态句；不能保留“剩余约 1h”的剧情数字 |
| `[].nowSignal` | C | awaiting_human→attention，Aborted→negative，正常完成→positive |
| `[].discussion.id` | A | 有来源草稿时 `Exp.draft.origin.discussion`；任意 bound 讨论全集不在此字段承诺内 |
| `[].discussion.label, [].discussion.more` | GAP | G04；缺讨论名称与同运行的全部讨论关系，无法显示名称和“另有 N 个” |
| `[].updated`（运行） | C | 取 `run.startedAt/endedAt` 与提交调用起止的最大已知时刻，格式化相对时间 |
| `[].recency`（运行） | C | 按同一可用运行时刻降序赋 1-based rank |
| `[].updated, [].recency`（草稿） | GAP | G48；DraftWire 没有保存时刻，savedVersion 也不能跨草稿比较 |

## 6. aiModels

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `[].id` | C | `ConversationModelsWire.available[]` 的 provider 与 id 编成无歧义选择键；发命令仍传原 provider/id |
| `[].name` | A | `ConversationModelsWire.available[].name` |
| `[].meta` | C | 由 available[].provider 生成 provider 显示；不能自行宣称上下文窗口/价格 |

这是 D7-15 的按会话读取，不应作为全 Lab 静态目录重新装回 Cat。

## 7. home

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `updated` | C | 从 `Page.home.activity[].at`、reports[].createdAt、milestones[].completedAt 等已返回事实取最近时刻；如果文案表示“读取时间”，用页面加载时刻而不冒充业务变更 |
| `reportsThisWeek` | C | 按 reports[].createdAt 过滤当前周后计数 |
| `reports[].id, reports[].project, reports[].title` | A | `Page.home.reports[].id/project/title` |
| `reports[].date, reports[].dateShort, reports[].time` | C | 格式化 reports[].createdAt |
| `reports[].paragraphs[]` | C | 按空行分段显示 `ReportWire.body`；不据此猜报告来源或标签 |
| `reports[].equation.after, reports[].equation.tex, reports[].equation.number` | GAP | G05；body 没有规定公式编码、位置或编号，不能声称这些结构化叶子可无歧义解析 |
| `reports[].model` | GAP | G06；ReportWire 无发布时使用模型，不能用当前会话模型替代 |
| `reports[].sourceCount` | GAP | G07；无来源引用集合/计数，figures 不等于 sources |
| `reports[].tags[], reports[].moreTagCount` | GAP | G08；无标签全集；后者只有在全集存在后才能按可见上限计算 |
| `reports[].figure.kind` | C | 按 figures 产物的实际媒介选择图片/可视化显示；只拥有图片不代表可逆推出采样参数 |
| `reports[].figure.label, reports[].figure.caption` | GAP | G09；ReportWire.figures 只有 ArtifactId，不携图号/题注 |
| `reports[].figure.placeholder` | K | renderer 的图片占位符，不是报告图片字节 |
| `reports[].figure.chart.title, reports[].figure.chart.xLabel, reports[].figure.chart.yLabel, reports[].figure.chart.series[].name` | GAP | G09；科学图题、坐标语义、曲线名是报告内容，不能用固定 copy 伪造 |
| `reports[].figure.chart.seed, reports[].figure.chart.series[].floor, reports[].figure.chart.series[].decay, reports[].figure.chart.series[].noise` | K | home-view-model 的确定性演示曲线生成参数；不是实测事实，不能作为接通后真实研究图的数据来源。真实图的事实仍须来自 figures 字节/显式数据 |
| `reports[].layout` | K | 例如第一张 full，其余 compact，属页面卡片布局 |
| `events[].id, events[].project` | A | `Page.home.activity[].id/project`；milestone 行可由 milestone.id/project 生成 |
| `events[].category, events[].glyph` | C | 按 activity.kind / milestone 事实种类映射 renderer 分类和图标 |
| `events[].date, events[].dateShort, events[].time` | C | 格式化 ActivityWire.at / MilestoneWire.completedAt/dueAt |
| `events[].title` | C | 用 activity.kind 的 copy 标题或 milestone.title；没有新业务标题来源时不得虚构 |
| `events[].text` | A | ActivityWire.text / MilestoneWire.description |
| `events[].action.label, events[].action.dialog` | K | renderer 按事件种类选 CTA 和本地弹窗 |
| `progress.percent` | C | completed milestones / all milestones × 100；这是里程碑完成比例，不是未知实验节点分母 |
| `progress.milestones.done, progress.milestones.total` | C | 统计 milestones[].completedAt 非空数与总数 |
| `progress.phase, progress.detail` | GAP | G10；有 milestone 标题描述，但没有研究阶段/整体进展叙述及其关联定义 |
| `progress.next` | C | 未完成里程碑按 dueAt 排序，取下一项 title |
| `progress.estimate` | C | 下一项 dueAt 相对页面当前时间格式化；只能表达截止时间，不是推断实际完成预测 |
| `clusters.health, clusters.healthDetail` | U | P4 后端健康；不能以远程有作业等同健康 |
| `clusters.rows[].name` | U | P3 模板端点/集群显示元数据 |
| `clusters.rows[].usage, clusters.rows[].loadPercent, clusters.rows[].health, clusters.rows[].detail` | U | P4 使用率、容量与健康明细 |
| `discussions[].id, discussions[].name, discussions[].project` | A | `Page.home.discussions[].conversation.id/origin.name/origin.project` |
| `discussions[].activity, discussions[].activitySignal` | C | 由 Header.lastMessageAt 与 runs 关联目录中运行状态生成最近活动/待处理提示；不冒充最后消息原文 |
| `discussions[].experiments` | C | Header.runs[].run 去重并 join |
| `quote` | K | D7:95 明确移 renderer copy |
| `ai.sessions[].name, ai.sessions[].meta` | C | `Page.home.panels[].conversation.origin` 的 page/scope 生成名称，messages 时间/条数生成 meta |
| `ai.seed[].kind` | C | panels[].messages 的 user/assistant role 映射 |
| `ai.seed[].text` | A | panels[].messages 的文本内容 |
| `ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | panels[].attachments[kind=changes].kind/target/rows[].kind/text，经 toolCallId 关联消息 |
| `ai.scope.value` | C | 当前页面/焦点项目的已知目录名称或 Panel origin.scope |
| `ai.<AI-K>` | K | 上述有限 AI-K 集合，renderer copy/页面状态 |
| `dialogs[id].<D>` | K | id=report/results/dataset/sources/milestone；完整 D 集合，用户选择值由 reports/目录事实初始化 |

## 8. experimentsPage

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `experimentIds[]` | C | Cat.experiments 映射运行/草稿引用 |
| `focusProjectIds[]` | K | 当前聚焦项目的页面状态，候选 id 来自 Cat.projects |
| `window.start.hour, window.start.minute, window.end.hour, window.end.minute` | K | 页面选择时间窗，提交为 LabPageParams.experiments.from/until |
| `window.now.hour, window.now.minute, window.tickMinutes` | K | 当前页面时钟与刻度间隔 |
| `lanes[].device, lanes[].description` | U | P3；D12-06 按调用模板绑定设备归组，说明必须来自真实模板资料而不是剧情仪器名 |
| `lanes[].slots[].runId` | C | 该调用所属 Exp.run.run / 草稿 id |
| `lanes[].slots[].nodeLabel` | A | GraphNode.Call.fn / DraftNode.fn |
| `lanes[].slots[].startMinute, lanes[].slots[].endMinute`（已提交调用） | C | (Call.startedAt/endedAt − 页面窗起点) / 60000 |
| `lanes[].slots[].startMinute, lanes[].slots[].endMinute`（草稿计划） | C | 以页面计划锚点累计 DraftNode.estimateMinutes；只标 planned，不冒充实际执行 |
| `lanes[].slots[].startMinute, lanes[].slots[].endMinute`（在途运行） | GAP | G11；SlotWire/SlotState 不带开始时刻或估计结束时刻 |
| `lanes[].slots[].kind` | C | Call.status、SlotState、草稿 origin 与同设备区间相交映射；conflict 只是投影发现，不是仲裁机制 |
| `lanes[].slots[].tooltip` | C | 由 run/fn/已知区间和 kind 套 renderer 模板 |
| `lanes[].slots[].zone.kind, lanes[].slots[].zone.index` | K | 页面泳道分区布局，不是设备权威状态 |
| `ai.sessions[].name, ai.sessions[].meta, ai.seed[].kind` | C | `Page.experiments.panels` 的 origin 与消息 role/时刻/数量映射 |
| `ai.seed[].text, ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | `Page.experiments.panels[].messages` 文本及 attachments[changes].target/rows |
| `ai.scope.value` | C | 当前焦点项目来自 Cat.projects |
| `ai.<AI-K>` | K | 完整 AI-K 集合 |

## 9. experimentFlows

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `runId` | C | `Page.experiment.experiment` 的运行/草稿引用 |
| `title` | A | Exp.ext.name / Exp.draft.canvas.title |
| `description`（草稿） | A | Exp.draft.canvas.description |
| `description`（运行） | GAP | G13；ext 没有描述，来源草稿也不保证存在，不能把函数名当研究描述 |
| `clockStart.hour, clockStart.minute` | C | 运行开始时刻分解；草稿时轴的计划锚点为页面本地参数 |
| `nodes[].instanceId` | C | Call 用 (step,position) 无歧义编码；草稿用 DraftNode.id；槽位用 (writerSession,slot) |
| `nodes[].nodeId, nodes[].libraryId, nodes[].name` | C | 用 Call.fn / SlotWire.fn / DraftNode.fn 生成节点标识与函数显示名 |
| `nodes[].device` | GAP | G12；experiment 页没返回 templates，不能从 env.template 标识得到实际设备显示 |
| `nodes[].lane, nodes[].dependencyColumn` | C | 依图边拓扑层次及 env 分组布局；草稿也可直接承接 DraftNode.lane/column |
| `nodes[].from[]` | C | GraphEdge.from 对应生产该 atom 的节点映射到目标调用；草稿取 DraftNode.from |
| `nodes[].origin`（草稿） | A | Exp.draft.canvas.nodes[].origin |
| `nodes[].origin`（运行） | K | 运行图不承诺“由计划/AI 建议”来源；此 draft 展示区分不应被当成运行血缘事实 |
| `nodes[].status`（done/running/waiting/planned/ai_suggestion） | C | Call.status / SlotState.kind / DraftNode.origin 映射 |
| `nodes[].status`（failed_verdict/flagged） | U | P1 产物判据；不能把 Aborted 自动叫“判据失败” |
| `nodes[].timing.kind` | C | 运行区间→interval，草稿估时→estimate |
| `nodes[].timing.startMinute, nodes[].timing.endMinute`（已提交调用） | C | Call.startedAt/endedAt 相对 clockStart |
| `nodes[].timing.startMinute, nodes[].timing.endMinute`（在途调用） | GAP | G11；槽位没有时刻 |
| `nodes[].timing.durationMinutes` | A | 草稿 DraftNode.estimateMinutes |
| `nodes[].tableVerdict.text, nodes[].tableVerdict.signal` | U | P1 产物契约及判据 |
| `nodes[].detail.parameters[].label, nodes[].detail.parameters[].value`（已提交） | C | GraphEdge.to.input 对应输入位，追 from atom 的 Root.value / Call.outputs[].value，格式化值；无参数名时只可显示位置 |
| `nodes[].detail.parameters[].label, nodes[].detail.parameters[].value`（草稿显式覆盖） | A | DraftNode.inputs[].parameter/expression |
| `nodes[].detail.parameters[].label, nodes[].detail.parameters[].value`（草稿默认参数全集） | GAP | G49；experiment 页没有节点定义默认值 |
| `nodes[].detail.parameters[].label, nodes[].detail.parameters[].value`（在途） | GAP | G49；running SlotState 不含输入/版本，awaiting_human 也只列 atom 名与 shape，不能补全节点参数 |
| `nodes[].detail.artifactsAndSignals[].label, nodes[].detail.artifactsAndSignals[].value` | C | Call.outputs 的 field/name/value 与 Page.experiment.workspace.files；真正判据信号部分另归 P1 |
| `nodes[].detail.verdict[].label, nodes[].detail.verdict[].value` | U | P1 |
| `nodes[].detail.parameters[].format, nodes[].detail.artifactsAndSignals[].format, nodes[].detail.verdict[].format` | K | 展示文本/字面值样式 |
| `nodes[].detail.parameters[].signal, nodes[].detail.artifactsAndSignals[].signal, nodes[].detail.verdict[].signal` | U | 作为业务判据强调时属 P1；不是随意配色造信号 |
| `arms[].lane, arms[].label` | C | 由图 env 分组及计算的 lane 生成；草稿承接 canvas.lanes[].index/label |
| `columns[]` | C | 草稿 canvas.columns[].name；运行依拓扑层编号并用 copy 标题 |
| `artifactContracts[].libraryId, artifactContracts[].files[]` | U | P1；图输出文件不等于期望产物契约 |
| `selectedInstanceId` | K | 页面选择状态 |
| `mode` | C | draft 存在且无 run→draft；Open→running；Ended/Aborted→结束显示（停止标签不应谎称自然结束） |
| `estimatedMinutes` | C | 草稿按 column 对 estimateMinutes 取最大再求和 |
| `now.hour, now.minute` | K | 页面当前时钟 |
| `remainingMinutes` | GAP | G47；未提交未来调用不可知，D12 也没有运行剩余估时来源 |
| `retro.endedLabel` | C | 格式化 Exp.run.endedAt |
| `retro.finishKind` | C | 仅 state=Ended 时映为 natural，不能把 Aborted 映成 natural |
| `retro.verdict, retro.failedVerdictCount` | U | P1 |
| `retro.totalMinutes` | C | (run.endedAt − run.startedAt) / 60000 |
| `retro.artifactCount` | C | 全图 Call.outputs[].value[kind=file] 计数，不限当前时间轴截取片段 |
| `retro.interventionCount` | C | 全图 Call.status 为 Human 或 Adopted 的调用数；这是接管/交回的记录数，不是任意人类聊天次数 |
| `ai.sessions[].name, ai.sessions[].meta, ai.seed[].kind` | C | `Page.experiment.panels` origin/消息 role/时刻映射 |
| `ai.seed[].text, ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | `Page.experiment.panels[].messages` 文本、attachments[changes].target/rows |
| `ai.scope.value` | C | 当前运行标题/选中节点 fn |
| `ai.<AI-K>` | K | 完整 AI-K 集合 |
| `dialogs[id].<D>` | K | draft=keep/discard/start/edit_parameters/remove；running=conflict/waiting/pause/intervene/logs/truncate；ended=follow_up/cite/export/retro_report/artifacts。完整 D 集合；真实日志/输入值不能靠 copy 生成 |

## 10. flowEditor

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `runId, projectId, title` | A | `Page.flowEditor.draft.id/project/canvas.title`（草稿引用不应继续写死 R-022） |
| `origin.discussionId, origin.retroRunId` | A | draft.origin.discussion/retroRun |
| `origin.description` | C | 用 origin 的讨论/运行标识套 copy；不冒充未返回的讨论题目 |
| `palette[].id, palette[].name` | A | Page.flowEditor.palette[].name（函数标识/名称） |
| `palette[].device` | U | P3，Def.template 关联 templates[].metadata.devices |
| `palette[].durationMinutes` | GAP | G14；Def 无默认估时，某个草稿节点估时也不是可复用节点的默认时长 |
| `palette[].availability.kind, palette[].availability.runId` | C | Def.template→templates 设备，与 Cat.experiments 当前在途环境/计划区间关联；有占用 busy，有待启动计划 queued，否则 ok。真实设备绑定依 P3 |
| `palette[].parameters[].label, palette[].parameters[].value` | A | Def.parameters[].name/defaultValue |
| `palette[].output` | C | Def.returns / fields[].name/type 生成输出签名显示 |
| `palette[].group` | GAP | G15；Program/Agent/Human 不是 dev/char/calc，模板名称也不编码学科分组 |
| `palette[].computeCluster` | U | P3 boundClusters，不再固定 atlas |
| `nodes[].instanceId, nodes[].libraryId, nodes[].column, nodes[].lane, nodes[].from[]` | A | draft.canvas.nodes[].id/fn/column/lane/from |
| `nodes[].parameterOverrides[].parameterIndex` | C | 将 DraftNode.inputs[].parameter 按同 fn 的 Def.parameters[].name 找索引 |
| `nodes[].parameterOverrides[].value` | A | DraftNode.inputs[].expression |
| `columns[].index, columns[].name` | C | canvas.columns 的序号与 name，按页面规则追加空列 |
| `selectedInstanceId` | K | 页面选择状态 |
| `suggestedLibraryIds[]` | C | 取 canvas.nodes[origin=ai_suggestion].fn 去重；不是写死 N-04+ |
| `savedLabel` | C | 用 draft.savedVersion 生成“已保存版本 N”；不能显示未返回的保存时刻/作者 |
| `savedVersion` | A | draft.savedVersion |
| `ai.sessions[].name, ai.sessions[].meta, ai.seed[].kind` | C | `Page.flowEditor.panels` origin/role/消息时刻映射 |
| `ai.seed[].text, ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | `Page.flowEditor.panels[].messages` 文本及 attachments[changes].target/rows |
| `ai.scope.value` | A | draft.canvas.title |
| `ai.<AI-K>, dialogs[save].<D>` | K | 完整有限集合，编辑值来自当前草稿与页面本地未保存输入 |

## 11. nodeLibrary

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `definitions[].id, definitions[].name` | A | `Page.nodes.library.nodes[].name` |
| `definitions[].group` | GAP | G15，Def 没有 dev/char/calc 分类 |
| `definitions[].device` | U | P3，Def.template 关联 Page.nodes.templates 的设备 |
| `definitions[].usageCount` | C | 按同 fn 的 Page.nodes.usage[].versions[].runs[].calls 求和；不以可见引用行数替代 |
| `definitions[].duration` | GAP | G14，Def 无默认时长 |
| `definitions[].image, definitions[].cluster, definitions[].devicePath` | U | P3；由 Def.template 匹配 templates 的 image/boundClusters/mounts，设备挂载还需 P3 明确资料 |
| `definitions[].inputs[]` | C | Def.parameters 生成输入签名/参数名称 |
| `definitions[].parameters[].label, definitions[].parameters[].value` | A | Def.parameters[].name/defaultValue |
| `definitions[].parameters[].type` | C | 从 Def.parameters[].type 的 TS 类型字面量映射展示类型；range 不是任意 number 的真实约束，不得伪造范围 |
| `definitions[].artifactContract[].file, definitions[].artifactContract[].requirement, definitions[].criteria[]` | U | P1 产物契约/判据；PR39 artifacts(field,type) 不是 required 文件路径契约 |
| `selectedDefinitionId, editScope[]` | K | 页面选择与编辑范围 |
| `mounts[].path, mounts[].access` | U | P3，Page.nodes.templates[].metadata.mounts |
| `stagedChanges[].nodeId` | A | Page.nodes.library.staged[].fn |
| `stagedChanges[].changes[].section, stagedChanges[].changes[].key, stagedChanges[].changes[].new, stagedChanges[].changes[].old, stagedChanges[].changes[].kind` | C | 同 fn 默认 Def 与 staged[].definition 按参数名/环境字段 diff；契约区实际内容仍是 P1，不由源码字面字符串猜判据 |
| `stagedChanges[].changes[].why` | GAP | G16；source diff 没有修改动机 |
| `experimentReferences[].kind, experimentReferences[].runId` | C | usage.runs 生成 catalog_run；draftReferences[].draft 生成 page_draft |
| `experimentReferences[].name` | C | draftReferences[].draft 关联 Cat.experiments[].draft.canvas.title |
| `experimentReferences[].status, experimentReferences[].stateText, experimentReferences[].description` | C | usage.runs.state 关联目录状态，用 fn/version/calls/草稿标题生成摘要 |
| `impacts[].condition.scoped[], impacts[].condition.hasLiveChanges[], impacts[].condition.hasNoLiveChanges[]` | C | 编辑范围、本次 Def diff、usage 中 state=Open 的运行按 fn 求交/差集 |
| `impacts[].message` | C | 以受影响函数与运行数套 renderer copy |
| `ai.sessions[].name, ai.sessions[].meta, ai.seed[].kind` | C | Page.nodes.panels 的 origin/role/消息时刻映射 |
| `ai.seed[].text, ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | Page.nodes.panels[].messages 文本与 attachments[changes].target/rows |
| `ai.scope.value` | C | 当前 editScope 的函数标识 join |
| `ai.<AI-K>` | K | 完整 AI-K 集合 |
| `dialogs` | K | 空元组，无可展开业务叶子 |

## 12. automation

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `rules[].id, rules[].name, rules[].enabled, rules[].creatorId` | A | `Page.automation.rules[].id/name/enabled/creator` |
| `rules[].triggerKind` | A | rule.when.kind |
| `rules[].trigger` | C | when.event/cron/source 按 variant 套 copy；instrument 事实接入仍依 P8 |
| `rules[].effect` | A | rule.then.prompt |
| `rules[].lastRun.state, rules[].lastRun.time` | C | 同 rule 的 runs 依 createdAt 选最新适用状态，格式化时刻；不是固定历史样本 |
| `rules[].scope.kind` | C | lab→all、focused_project→focus、project→project |
| `rules[].scope.projectId` | A | rule.scope[kind=project].project |
| `rules[].historicalRunCount` | C | Page.automation.runs 按 rule.id 计总数；D12 未限定为可见样本/分页，因此可完整计数 |
| `rules[].when[].text, rules[].when[].detail` | C | 对 when 的结构化触发事实生成步骤文案；instrument.source 的真实接入归 P8 |
| `rules[].conditions[].text, rules[].conditions[].detail` | A | rule.conditions[] 文本；同一条件可作为步骤正文/详情，不增造执行结果 |
| `rules[].then[].text, rules[].then[].detail` | C | 用 then.prompt 与 requiresApproval 生成 agent/审批步骤 |
| `rules[].when[].actor.kind, rules[].conditions[].actor.kind, rules[].then[].actor.kind` | C | D12-09 指定由 when/then/requiresApproval 投影：触发 automatic，条件与动作 agent，需审批步骤 approval |
| `rules[].when[].actor.name, rules[].conditions[].actor.name, rules[].then[].actor.name` | GAP | G51；原消费显示具体执行者（如 Retro writer / Flow planner），rule.name 是规则标题，不是该执行者名称 |
| `runs[].id, runs[].automationId, runs[].kind, runs[].action` | A | AutomationRunWire.id/rule/state.kind/state[kind=waiting].action |
| `runs[].time` | C | 格式化 run.createdAt |
| `runs[].text, runs[].source` | C | trigger.event/run 或 manual.by 关联 Cat.members，schedule.at 套 copy |
| `runs[].duration` | C | endedAt−createdAt；running 用页面时钟与 createdAt，未结束不伪造完成时长 |
| `manualRun.kind, manualRun.time, manualRun.text, manualRun.sourceMemberId, manualRun.duration` | K | 原型点击后插入的本地种子；真实手动运行必须以 automation.run 的结果再读取 runs，不能继续生成假历史 |
| `ai.sessions[].name, ai.sessions[].meta, ai.seed[].kind` | C | Page.automation.panels origin/role/消息时刻映射 |
| `ai.seed[].text, ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | Page.automation.panels[].messages 文本及 attachments[changes].target/rows |
| `ai.scope.value` | A | 当前 rule.name |
| `ai.<AI-K>, dialogs[id].<D>` | K | AI-K 与 D 全集合；id=new_rule/edit_rule/approve/dismiss |

## 13. datasets

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `artifacts[].id` | C | 讨论取 Page.datasets.artifacts[].id；store 文件按 `store:${value.content}` |
| `artifacts[].path, artifacts[].name` | C | store 取 GraphNode.outputs[].value.name（稳定语义输出名）；讨论取 ArtifactMetaWire.name，字节访问使用 id，不泄露 worktree 路径 |
| `artifacts[].extension` | C | 文件名后缀或已知 media 映射 |
| `artifacts[].role`（讨论） | A | ArtifactMetaWire.role |
| `artifacts[].role`（实验） | U | P1 产物契约角色 |
| `artifacts[].size` | U | store 依 P14；讨论则有 ArtifactMetaWire.size，可直接格式化，不把它也视为缺失 |
| `artifacts[].time` | C | 实验取产出 Call.endedAt，讨论取 ArtifactMetaWire.createdAt |
| `artifacts[].projectId`（实验） | A | 对应 Exp.ext.project |
| `artifacts[].projectId`（讨论） | GAP | G17；artifact.conversation 不携该讨论的 origin.project，datasets 页也无讨论 header |
| `artifacts[].verdict` | U | P1；不能把文件名叫 verdict 当作已经 pass |
| `artifacts[].preview.kind, artifacts[].preview.columns[], artifacts[].preview.rows[][], artifacts[].preview.aspect[0], artifacts[].preview.aspect[1], artifacts[].preview.dimensions, artifacts[].preview.text` | C | 经 D12-12 对象/产物字节路由取真实字节，在客户端按 media 解码表格/图片/文本 |
| `artifacts[].preview.highlightedRow, artifacts[].preview.note` | K | 页面高亮/解码说明；若 note 宣称研究判据则需 P1，不能写死正确性结论 |
| `artifacts[].references[].kind[context], artifacts[].references[].discussionId[context]` | C | Page.datasets.contexts 的 artifacts 反向建索引 |
| `artifacts[].references[].kind[evidence], artifacts[].references[].discussionId[evidence]` | C | Page.datasets.references[kind=references] 的 artifacts 与 conversation 反向建索引 |
| `artifacts[].references[].outputId` | GAP | G19；AttachmentWire.references 没有“哪份讨论产出以此为证据”的产出 id 关联 |
| `artifacts[].kind, artifacts[].runId` | C | 来源是 store File 或 ArtifactMeta 判别；store run 来自产出图所属运行 |
| `artifacts[].lineage.node` | A | 生产文件的 GraphNode.Call.fn |
| `artifacts[].lineage.container` | A | Call.env[kind=remote].remoteRun；central 显示 central 的 copy |
| `artifacts[].lineage.image` | GAP | G18；datasets 页没有 templates，图 env 只有模板名/remoteRun，无镜像 |
| `artifacts[].contract.kind, artifacts[].contract.requiredPath, artifacts[].contract.schema.kind, artifacts[].contract.schema.columns` | U | P1 契约与 schema 判定 |
| `artifacts[].discussionId` | A | ArtifactMetaWire.conversation |
| `artifacts[].origin` | GAP | G17；讨论产物来源描述需该讨论名称/项目等事实，ArtifactMeta.source 只是可选来源字符串，不等价讨论 origin |
| `groupOrder.experiments[], groupOrder.discussions[]` | C | 按 artifact 来源插入顺序稳定去重分组 id |
| `facets.experimentRoles[], facets.discussionRoles[], facets.verdicts[], facets.extensions[]` | K | 页面提供的有限筛选选项来自枚举/copy；实际计数按产物计算，P1 未有值时不能造数量 |
| `facets.experiments[], facets.discussions[]` | C | artifacts 来源 id 去重 |
| `discussionLabels[].discussionId` | A | ArtifactMetaWire.conversation / contexts[].conversation |
| `discussionLabels[].name` | GAP | G17；不能把无来源的短标题当 copy |
| `ai.sessions[].name, ai.sessions[].meta, ai.seed[].kind` | C | Page.datasets.panels origin/role/消息时刻映射 |
| `ai.seed[].text, ai.seed[].blocks[].kind[changes], ai.seed[].blocks[].title, ai.seed[].blocks[].rows[].kind, ai.seed[].blocks[].rows[].text` | A | Page.datasets.panels[].messages 文本与 attachments[changes].target/rows |
| `ai.scope.value` | C | 选中产物的真实文件名 |
| `ai.<AI-K>, dialogs[id].<D>` | K | 完整 AI-K/D 集合；id=load/export/download，插值从真实选择集生成 |

## 14. discussions

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `userId` | A | Cat.account.member（旧字面量 jd 实为当前成员标识，应按 D12 放宽） |
| `discussions[].id, discussions[].name, discussions[].projectId` | A | Page.discussions.discussions[].conversation.id/origin.name/origin.project |
| `discussions[].experiments[].runId, discussions[].experiments[].relation` | A | DiscussionHeaderWire.runs[].run/relation，保留双关系 |
| `discussions[].time` | C | Header.lastMessageAt 格式化 |
| `discussions[].last` | GAP | G20；Header 只有最后消息时刻，没有摘要文本 |
| `discussions[].unread` | C | 比较 Header.lastMessageAt 与 readAt |
| `discussions[].started` | C | Header.startedAt 格式化 |
| `discussions[].messages[].id` | C | 选中 Page.discussion.messages 的 transcript 顺序生成稳定显示键；不声称 AgentMessage 自带不存在的业务消息 id |
| `discussions[].messages[].time, discussions[].messages[].day` | C | OmpMessage.timestamp 分解/格式化；停驻读取依 P2 |
| `discussions[].messages[].text` | A | Page.discussion.messages 文本内容（P2 停驻 transcript） |
| `discussions[].messages[].kind` | C | OmpMessage.role 的 user/assistant 映射；工具消息用于挂附件不伪装成人类 |
| `discussions[].messages[].references[]` | C | Page.discussion.attachments[kind=references].artifacts 经 toolCallId 归到对应 assistant 消息 |
| `discussions[].messages[].attachments[].kind` | A | AttachmentWire.kind[plan/conclusion] |
| `discussions[].messages[].attachments[].plan.runId` | C | plan.draft 关联目录草稿/已绑定运行；未启动时使用草稿引用，不虚构 store RunId；目录中找不到该草稿 = 已丢弃（D26-04/05），转录附件保留，不虚构草稿或运行，标题与步骤仍从附件本身渲染 |
| `discussions[].messages[].attachments[].plan.title, discussions[].messages[].attachments[].plan.steps[].text, discussions[].messages[].attachments[].plan.steps[].node` | A | AttachmentWire[plan].title/plan[].text/plan[].node |
| `discussions[].messages[].attachments[].plan.meta` | C | 由 plan 步数、草稿引用与 pendingLaunch.state 套 copy；目录中找不到 plan.draft = 已丢弃（D26-04/05），呈现“已丢弃”，标题与步骤仍取附件本身 |
| `discussions[].messages[].attachments[].draft.text, discussions[].messages[].attachments[].draft.evidence` | A | AttachmentWire[conclusion].conclusion 关联 Page.discussion.conclusions[].text/evidence |
| `discussions[].messages[].attachments[].draft.confidence` | K | 原型固定 medium 演示标签，不可冒充模型给出的置信度 |
| `discussions[].conclusions[].kind` | A | ConclusionWire.confirmation.kind |
| `discussions[].conclusions[].text, discussions[].conclusions[].evidence, discussions[].conclusions[].pendingRunId` | A | Page.discussion.conclusions[].text/evidence/pendingRun |
| `discussions[].conclusions[].time`（confirmed） | C | 格式化 ConclusionWire.confirmation.at |
| `discussions[].conclusions[].time`（pending） | GAP | G21；ConclusionWire 无创建时刻，不能用确认时间字段或会话开始时刻替代 |
| `artifacts[].id, artifacts[].runId, artifacts[].path, artifacts[].node` | C | Cat.experiments 图中 File.value.content/name 与生产 Call.fn/run 建引用；讨论产物则承接 Page.discussion.artifacts，不伪造 run 所有权 |
| `artifacts[].size` | U | store 文件 P14；讨论快照已有 ArtifactMetaWire.size |
| `filePreviews[].path` | C | 用同一产物引用中的语义 name/path 作客户端 preview 索引 |
| `filePreviews[].preview.kind, filePreviews[].preview.columns[], filePreviews[].preview.rows[][], filePreviews[].preview.aspect[0], filePreviews[].preview.aspect[1], filePreviews[].preview.dimensions, filePreviews[].preview.text` | C | 经 D12 对象/产物字节路由获取后解码；不能复用剧情中的同名文件内容 |
| `filePreviews[].preview.highlightedRow, filePreviews[].preview.note` | K | 页面高亮与预览说明 |
| `experimentProgress[].runId` | A | Page.discussion.runs[].run |
| `experimentProgress[].detail, experimentProgress[].progress.done` | C | 关联 Cat 中同运行状态/已提交 Call 计数生成摘要与完成数 |
| `experimentProgress[].progress.total` | U | D7:93、D12-04 未知总节点数 |
| `experimentProgress[].progress.kind` | C | 只有真实已知总数（如已结束全图）才 measured；开放运行未知总数为 none，不补假分母 |
| `initialLoadedArtifactIds[]` | A | Page.discussion.context；每会话分别读取，不再共享原型上下文 |
| `saveConclusion.discussionId, saveConclusion.messageId, saveConclusion.conclusion.kind, saveConclusion.conclusion.time, saveConclusion.conclusion.text, saveConclusion.conclusion.evidence, saveConclusion.conclusion.pendingRunId` | K | 原型模拟“保存后出现一份预写结论”的本地场景配置；真实确认只能引用已有 ConclusionWire 并读回，不继续制造预写结论 |
| `replyTemplate` | K | 原型假回复模板，接通后不作为 AI 内容来源 |
| `dialogs[id].<D>` | K | 完整 D 集合；id=new_discussion/why_nodes/download/rename/move/export/archive |

## 15. clusters

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `clusters[].id, clusters[].name, clusters[].kind, clusters[].isDefault, clusters[].endpoint` | U | P3 现有后端端点、模板与默认选择资料；当前展开的 TemplateMetadata 未把全部后端资料写实，不能用 backend enum 当 endpoint |
| `clusters[].health, clusters[].reportedLoadPercent, clusters[].gpu.used, clusters[].gpu.total, clusters[].cpu.used, clusters[].cpu.total, clusters[].nodeCount, clusters[].healthText, clusters[].handshakeAge` | U | P4 健康/容量/握手，D12-08 明确不出线或 null |
| `gpuNodePatterns[].clusterId, gpuNodePatterns[].firstNode, gpuNodePatterns[].gpusPerNode, gpuNodePatterns[].usedGpuPattern[]` | U | P4，不用固定数组画假 GPU 占用 |
| `gateways[].host, gateways[].cpu.used, gateways[].cpu.total, gateways[].devices, gateways[].health` | U | P3 设备/端点资料与 P4 主机容量健康；网关运行事实没有额外权威源 |
| `containers[].id, containers[].name` | A | Page.clusters.jobs[].run.run；实际是 remote 作业引用，不宣称底层 Docker id |
| `containers[].clusterId` | U | P3，run.template 关联后端端点 |
| `containers[].host` | U | P4 具体物理节点位置；remote summary 没有调度宿主 |
| `containers[].purpose` | C | jobs 条目→run，Mux 在线 agent 条目→agent；box/service 的实际实例不在第一版控制能力中（P5） |
| `containers[].binding` | C | remoteRun 与 Cat.graph.Call.env.remoteRun、slots.state.remoteRun 关联生成 run/fn；agent 用 Presence.agentId |
| `containers[].image` | U | P3，job.run.template 关联 Tpl.metadata.image |
| `containers[].state` | GAP | G22；queued/running/ended 可映射，remote ended/ended_unstarted 无退出结果，无法区别 failed 与 exited |
| `containers[].uptime` | C | RunStatus.started_at 或 Lifecycle 对应起止时刻求差 |
| `containers[].resources.kind, containers[].resources.cpu.used, containers[].resources.cpu.total, containers[].resources.memoryGiB.used, containers[].resources.memoryGiB.total` | U | P4 使用量；P3 资源上限不是实时 used |
| `containers[].mounts[].path, containers[].mounts[].mode` | U | P3 Tpl.metadata.mounts |
| `containers[].logs[].message` | C | watchJobTail 返回 text 按行拆分/直接展示整段 |
| `containers[].logs[].time, containers[].logs[].severity` | GAP | G23；tail 只有原始 text，帧 at 是抓取时刻，不是每条日志发生时刻，也无逐行 severity |
| `conversations[cluster].sessions[].name, conversations[cluster].sessions[].meta, conversations[cluster].seed[].kind` | C | Page.clusters.panels 按 origin.scope 对应 cluster，再映射 origin/role/消息时刻 |
| `conversations[cluster].seed[].text, conversations[cluster].seed[].blocks[].kind[changes], conversations[cluster].seed[].blocks[].title, conversations[cluster].seed[].blocks[].rows[].kind, conversations[cluster].seed[].blocks[].rows[].text` | A | Page.clusters.panels[].messages 文本及 attachments[changes].target/rows |
| `conversations[cluster].scope.value` | C | 当前 cluster 的已知标识；友好名依 P3 |
| `conversations[cluster].<AI-K>, dialogs[id].<D>` | K | 完整 AI-K/D 集合；id=handshake/pull_image/new_sandbox/shell/restart/destroy；第一版不把弹窗存在当成命令已实现 |
| `legacyConnections[].kind, legacyConnections[].fields[].label, legacyConnections[].fields[].value, legacyConnections[].fields[].format, legacyHandshakeChecklist[]` | K | 注释明确是 unbound legacy modal source；移 copy/页面输入，不作为第二套连接实现 |

## 16. connectCluster

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `paths[].kind, paths[].title, paths[].description, paths[].cardSteps[].number, paths[].cardSteps[].text, paths[].cardFacts[].label, paths[].cardFacts[].value, paths[].cardFacts[].format, paths[].cardRequirements[]` | K | 接入路径选择卡文案/静态要求 |
| `paths[].authDefaults[].kind, paths[].authDefaults[].privateKey, paths[].authDefaults[].password` | K | 页面输入默认值；不从公开 wire 发私钥或密码 |
| `paths[].steps[].id, paths[].steps[].title, paths[].steps[].subtitle, paths[].steps[].kind, paths[].steps[].description, paths[].steps[].requiresTest` | K | 向导步骤/copy |
| `paths[].steps[].fields[].key, paths[].steps[].fields[].label, paths[].steps[].fields[].hint, paths[].steps[].fields[].kind, paths[].steps[].fields[].placeholder, paths[].steps[].fields[].options[].id, paths[].steps[].fields[].options[].label, paths[].steps[].fields[].onText` | K | 向导表单/copy |
| `paths[].authSteps[key].id, paths[].authSteps[key].title, paths[].authSteps[key].subtitle, paths[].authSteps[key].kind, paths[].authSteps[key].description, paths[].authSteps[key].requiresTest` | K | key=key/password/agent；同 WizardStep 分支 |
| `paths[].authSteps[key].fields[].key, paths[].authSteps[key].fields[].label, paths[].authSteps[key].fields[].hint, paths[].authSteps[key].fields[].kind, paths[].authSteps[key].fields[].placeholder, paths[].authSteps[key].fields[].options[].id, paths[].authSteps[key].fields[].options[].label, paths[].authSteps[key].fields[].onText` | K | 同 WizardField 全叶子 |
| `paths[].defaults.host, paths[].defaults.port, paths[].defaults.user, paths[].defaults.auth.kind, paths[].defaults.auth.privateKey, paths[].defaults.auth.password, paths[].defaults.name` | K | 页面尚未提交的输入，不是现有远程机器事实 |
| `paths[].defaults.sudo, paths[].defaults.address, paths[].defaults.webPort, paths[].defaults.dataDirectory, paths[].defaults.database.kind, paths[].defaults.database.uri, paths[].defaults.tls, paths[].defaults.admin, paths[].defaults.email, paths[].defaults.enrollSelf, paths[].defaults.allowedNetworks, paths[].defaults.registry, paths[].defaults.ntp, paths[].defaults.backup` | K | controller 分支页面默认输入 |
| `paths[].defaults.clusterId, paths[].defaults.method, paths[].defaults.role, paths[].defaults.labels, paths[].defaults.exposeGpu, paths[].defaults.devices, paths[].defaults.maxContainers, paths[].defaults.reserve, paths[].defaults.agentPort` | K | node 分支页面默认输入，cluster 候选来自模板元数据 P3 |
| `paths[].externalDatabaseStep.id, paths[].externalDatabaseStep.title, paths[].externalDatabaseStep.subtitle, paths[].externalDatabaseStep.kind, paths[].externalDatabaseStep.description, paths[].externalDatabaseStep.requiresTest, paths[].externalDatabaseStep.fields[].key, paths[].externalDatabaseStep.fields[].label, paths[].externalDatabaseStep.fields[].hint, paths[].externalDatabaseStep.fields[].kind, paths[].externalDatabaseStep.fields[].placeholder, paths[].externalDatabaseStep.fields[].options[].id, paths[].externalDatabaseStep.fields[].options[].label, paths[].externalDatabaseStep.fields[].onText, paths[].externalDatabaseUri` | K | controller 外部 DB 额外步骤和未提交输入 |
| `paths[].manualConnectionStep.id, paths[].manualConnectionStep.title, paths[].manualConnectionStep.subtitle, paths[].manualConnectionStep.kind, paths[].manualConnectionStep.description, paths[].manualConnectionStep.requiresTest, paths[].manualConnectionStep.fields[].key, paths[].manualConnectionStep.fields[].label, paths[].manualConnectionStep.fields[].hint, paths[].manualConnectionStep.fields[].kind, paths[].manualConnectionStep.fields[].placeholder, paths[].manualConnectionStep.fields[].options[].id, paths[].manualConnectionStep.fields[].options[].label, paths[].manualConnectionStep.fields[].onText` | K | node 手工接入步骤 copy |
| `paths[].installStages[].label, paths[].installStages[].value, paths[].installStages[].format, paths[].review[].title, paths[].review[].rows[].label, paths[].review[].rows[].value, paths[].review[].rows[].format, paths[].summary[].label, paths[].summary[].value, paths[].summary[].format, paths[].ports[].label, paths[].ports[].value, paths[].ports[].format, paths[].requirements[], paths[].installCommand` | K | 安装说明/当前输入摘要，不代表命令已执行 |
| `paths[].installLogs[]` | U | P7 真实安装执行方未实现；不能播放静态 success 日志 |
| `paths[].completion.title, paths[].completion.description, paths[].completion.rows[].label, paths[].completion.rows[].value, paths[].completion.rows[].format` | K | 完成页布局/copy/输入回显；第一版不能据此宣告安装成功 |
| `paths[].completion.enrollment.kind, paths[].completion.enrollment.token` | U | P7 接入执行与注册结果；不发假 token |
| `existingClusters[].clusterId, existingClusters[].kind, existingClusters[].endpoint` | U | P3，Page.connectCluster.templates 的真实后端目录资料 |
| `existingClusters[].health, existingClusters[].nodeCount, existingClusters[].gpu.used, existingClusters[].gpu.total` | U | P4 |
| `clusterChoices[].clusterId, clusterChoices[].kind, clusterChoices[].detail` | U | P3 真实目录标识/展示资料；detail 如宣称容量则另依 P4 |
| `connectionTestResults[].kind` | K | 页面测试类型枚举 |
| `connectionTestResults[].text` | U | P7，无真实连接测试结果 |

## 17. containers

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `images[].id, images[].name` | C | Page.containers.images[].name/path 生成稳定镜像定义标识与名称（导出依 P15） |
| `images[].group` | GAP | G24；P15 ImageDefinition 无 runner/judge/box 分类 |
| `images[].tag, images[].digest` | A | Page.containers.tags[].tag/digest，按 repository 对应镜像 |
| `images[].size` | C | 格式化 RegistryTagWire.size |
| `images[].status` | C | 有发布 tag→published，仅定义/构建未发布→pending |
| `images[].nodeBindingCount` | GAP | G26；containers 未返回节点库定义，不能按 Def.template 与模板镜像计算绑定数量 |
| `images[].base` | U | P15 ImageDefinition.base |
| `images[].note` | GAP | G25；P15 没有镜像业务说明 |
| `images[].liveContainers[].name, images[].liveContainers[].binding` | C | jobs[].run.run，关联 Cat 中 remoteRun 生成 run/fn 绑定 |
| `images[].liveContainers[].location` | U | P3 模板后端端点；真实宿主依 P4 |
| `images[].liveContainers[].tag` | U | P3 模板使用镜像引用；不能把 registry 最新 tag 当作运行中镜像 |
| `images[].liveContainers[].state` | GAP | G22；主要状态可映射，但 failed/exited 区别无权威退出结果 |
| `images[].dependencies[].name, images[].dependencies[].version, images[].dependencies[].kind` | U | P15 ImageDefinition.dependencies 对应字段 |
| `images[].dependencies[].source, images[].dependencies[].reason` | GAP | G27；P15 只含 name/version/kind，仓库来源与依赖原因没有定义 |
| `images[].dependencies[].change.kind, images[].dependencies[].change.replacement` | GAP | G28；没有比较基准或依赖变化资料 |
| `images[].builds[].tag, images[].builds[].size` | C | tags 的 tag/size；正在构建则关联 builds[].tag |
| `images[].builds[].state` | GAP | G29；KomodoBuild.state 是 running/succeeded/failed，不是 default/history/draft；没有默认 tag 的权威选择 |
| `images[].builds[].note` | C | 用 KomodoBuild.state 与 startedAt/endedAt 套状态文案；不能编造构建原因 |
| `images[].layers[].kind` | C | 对 ImageDefinition.dependencies.kind 分组（导出依 P15） |
| `images[].layers[].size` | GAP | G30；registry 总大小不能分解为逐层/逐依赖种类大小，P15 没有层记录 |
| `images[].resources.cpu, images[].resources.memoryGiB, images[].resources.gpu, images[].resources.diskGiB, images[].resources.maxRuntimeHours, images[].resources.boundClusters[], images[].resources.priority` | U | P3 Tpl.metadata.resources 对应字段 |
| `images[].resources.allowPreemptible, images[].resources.deviceAccess, images[].resources.outboundNetwork, images[].resources.primaryCluster, images[].resources.selector` | GAP | G31；P3 展开形状明确没有这些策略/选择器；不能从设备存在推断允许访问或从数组第一项推断默认集群 |
| `images[].directories[].id, images[].directories[].parentId, images[].directories[].name` | C | P15 files[].path 按路径组件建目录树并生成稳定 id |
| `images[].directories[].access` | U | P3 挂载权限；P15 文件清单本身没有访问策略 |
| `images[].directories[].note` | K | 目录类型解释 copy；若显示特有业务说明则没有来源，不得写剧情说明 |
| `images[].files[].id, images[].files[].directoryId, images[].files[].name, images[].files[].kind` | C | 从 P15 files[].path 构建树与文件/目录节点 |
| `images[].files[].size` | U | P15 files[].size |
| `images[].files[].modified` | GAP | G33；文件修改时间不在 P15，构建时间不能替代 |
| `images[].files[].change, images[].occupancy[].change` | GAP | G28；没有文件比较基准/版本 diff |
| `images[].files[].contents` | GAP | G32；P15 只有 path/size，D12 的字节路由没有 images 检出文件读取 |
| `images[].files[].format` | C | 按文件后缀/媒介选择 code/text 样式 |
| `images[].occupancy[].id, images[].occupancy[].parentId, images[].occupancy[].name, images[].occupancy[].kind` | C | 同 P15 文件目录树，runtime_mount 由 P3 mounts 派生 |
| `images[].occupancy[].size.kind, images[].occupancy[].size.mb, images[].occupancy[].size.mbPerGiB` | C | files[].size 转 MiB，目录按子项求和；image_size 直接引用 registry 总大小，mbPerGiB 是单位换算常数。runtime mount 容量不得从镜像大小冒充（P4） |
| `images[].occupancy[].layer` | GAP | G34；没有文件到镜像层的归属 |
| `images[].occupancy[].note` | K | 文件/目录/运行时挂载的显示说明，不是新业务元数据 |
| `images[].terminal[].kind, images[].terminal[].text` | U | P6 交互 shell/预构建终端 |
| `images[].conversation.sessions[].name, images[].conversation.sessions[].meta, images[].conversation.seed[].kind` | C | Page.containers.panels 按 origin.scope 对应 image，映射 origin/role/消息时刻 |
| `images[].conversation.seed[].text, images[].conversation.seed[].blocks[].kind[changes], images[].conversation.seed[].blocks[].title, images[].conversation.seed[].blocks[].rows[].kind, images[].conversation.seed[].blocks[].rows[].text` | A | Page.containers.panels[].messages 文本与 attachments[changes].target/rows |
| `images[].conversation.scope.value` | C | 当前 image 名称 |
| `images[].conversation.<AI-K>` | K | 完整 AI-K 集合 |
| `clusterAvailability[].clusterId, clusterAvailability[].kind` | U | P3 集群目录资料 |
| `clusterAvailability[].gpuFree, clusterAvailability[].cpuFree, clusterAvailability[].memoryFreeGiB, clusterAvailability[].reportedLoadPercent, clusterAvailability[].detail` | U | P4 真实容量，不拿模板资源请求当资源空闲量 |
| `resourceLimits[].resource, resourceLimits[].unit, resourceLimits[].min, resourceLimits[].max, resourceLimits[].description` | K | 资源编辑控件范围/单位/copy；若要表达真实基础设施配额则应另有权威，不能把 slider max 当集群限额 |
| `prebuildStages[]` | K | 静态阶段文案；实际执行依 P6 |
| `shellTranscript[].kind, shellTranscript[].text` | U | P6，不能返回演示成功输出 |
| `historicalXrdSeed[].kind, historicalXrdSeed[].text, historicalXrdSeed[].blocks[].kind, historicalXrdSeed[].blocks[].title, historicalXrdSeed[].blocks[].note, historicalXrdSeed[].blocks[].rows[].kind, historicalXrdSeed[].blocks[].rows[].text, historicalXrdSeed[].blocks[].actions[].label, historicalXrdSeed[].blocks[].actions[].emphasis` | K | 原型特定 XRD 演示对话，不是真实历史；接通时不得当 transcript 使用 |
| `dialogs[id].<D>` | K | 完整 D 集合；id=build_push/run_prebuild/prebuild_check |

## 18. settings

| 叶子字段 | 类 | 来源或算法 |
| --- | --- | --- |
| `members[].memberId, members[].email, members[].description, members[].role, members[].displayName, members[].mainProjectId` | A | Cat.members[].id/email/profile.description/role/name/profile.mainProject |
| `members[].focusSummary[]` | GAP | G35；profile 只有 mainProject，原消费含多项目关注列表与 +N，不能从主项目推断 |
| `members[].gpuHours.used` | U | P9，Page.settings.members[].gpuHoursUsed 无来源时 null |
| `members[].gpuHours.quota.kind, members[].gpuHours.quota.hours` | C | Cat.member.profile.gpuHoursQuota 的 null→unlimited，数值→limited/hours |
| `members[].lastActive, members[].presence` | C | Page.settings.members[].lastActiveAt 格式化，online 映 online/offline |
| `members[].canApprove` | C | Page.settings.members[].grants.approve 查 any/own_experiments/none copy，不降成 boolean |
| `members[].permissions.startWithoutApproval, members[].permissions.buildImages, members[].permissions.manageMembers` | A | 对应 MemberStatusWire.grants 字段 |
| `roles[].id, roles[].label` | C | Page.settings.roles[].role，查 renderer 角色名称 |
| `projects[].projectId, projects[].description` | A | Cat.projects[].id/description |
| `projects[].state` | C | Cat.projects[].archived→active/archived |
| `projects[].experimentCount` | C | Cat.experiments 的 ext.project/draft.project 按项目去重计实验 |
| `projects[].discussionCount, projects[].conclusionCount, projects[].lastActivity` | GAP | G36；settings 没有讨论/结论全集，也没该项目完整活动事实，repoActivity 仅仓库活动 |
| `repositories[].id, repositories[].branch, repositories[].remote` | A | Page.settings.repos[].id/branch/remoteUrl |
| `repositories[].description` | GAP | G38；LibraryRepoWire 无业务描述 |
| `repositories[].status` | C | checkout.ahead 与中心检出已有事实映同步提示；没有失败事实时不能显示 broken 的故障理由 |
| `repositories[].images[], repositories[].nodes` | GAP | G39；未返回镜像对源码仓库依赖、也没有节点库定义/仓库归属 |
| `repositories[].lastSync` | C | 格式化 repo.checkout.fetchedAt |
| `agents[].id, agents[].description` | A | Page.settings.agentTemplates[].id/description |
| `agents[].harness` | A | AgentTemplateWire.harness='omp'；必须按已定决定改掉旧多 harness 联合 |
| `agents[].harnessVersion` | GAP | G41；AgentTemplateWire 没有 omp 运行版本，lastCommit 不是 harness 版本 |
| `agents[].version.kind, agents[].version.version` | C | 页面未保存输入→draft，已持久化用 lastCommit.sequence/commit→saved |
| `agents[].uses` | U | P17，D12 明确第一版不显示 |
| `agents[].lastSaved` | C | 格式化 lastCommit.at；若显示保存人则还需 commit 作者，不能用当前用户替代 |
| `agents[].targets[]` | GAP | G42；模板应用目标目录没有出线 |
| `agents[].models[].id` | A | AgentTemplateWire.models[] |
| `agents[].models[].purpose` | GAP | G43；string[] 模型列表没有各模型用途 |
| `agents[].entries[].kind, agents[].entries[].path` | C | AgentTemplateWire.files[].path 构建文件/目录树 |
| `agents[].entries[].contents` | A | AgentTemplateWire.files[].contents |
| `agents[].entries[].source`（本地新增） | K | 页面尚未提交的新文件标 added |
| `agents[].entries[].source`（已持久化文件的 template / repository 区别） | GAP | G50；AgentTemplateWire.files 只有 path/contents，没有文件来源，不可按路径猜 |
| `agents[].scratch.containerId, agents[].scratch.title, agents[].scratch.description, agents[].scratch.transcript[].kind, agents[].scratch.transcript[].text` | U | P6 交互 scratch shell；不能用演示容器 id 与 transcript 当实际容器 |
| `agents[].scratch.addedFile.path, agents[].scratch.addedFile.contents` | K | 页面演示新增文件的本地编辑种子；真实变更来自本地编辑/工具产生的真实 diff，不自动插入模板 |
| `experiments[].runId, experiments[].projectId, experiments[].title` | A | Cat.experiments 的 run/draft 引用、ext/draft.project、ext.name/canvas.title |
| `experiments[].ownerId` | GAP | G03，与目录实验属主同一缺口 |
| `experiments[].status` | C | 与 experiments.status 同一纯投影 |
| `discussions[].discussionId, discussions[].ownerId, discussions[].projectId, discussions[].participantIds[], discussions[].title, discussions[].unread` | GAP | G45；settings 没有讨论 headers。participantIds 不是要恢复多人会话：有 owner 后可投影 `[owner]`，但当前本页连 owner 也未提供 |
| `invitations[].email, invitations[].role` | A | Page.settings.invitations[].email/role |
| `invitations[].description, invitations[].sent` | C | inviter→Cat.members 姓名与 sentAt 格式化；邮件实际送达依 P11，不能根据 sentAt 宣称已收到 |
| `unassigned.experimentCount` | C | Cat.experiments 中 project=null 的实验/草稿计数 |
| `unassigned.discussionCount` | GAP | G45；同样缺讨论全集 |
| `unassigned.suggestions[].kind, unassigned.suggestions[].discussionId, unassigned.suggestions[].runId, unassigned.suggestions[].projectId, unassigned.suggestions[].reason` | GAP | G46；suggestions 是 AttachmentWire[changes] 的 target + 文本 rows，没有类型化对象 id、目标项目 id 与理由关系；不能解析自然语言猜命令对象 |
| `imageDependencies[].image, imageDependencies[].node, imageDependencies[].warning` | GAP | G39；settings 没有镜像定义/节点绑定及其依赖资料 |
| `repositoryEvents[].kind, repositoryEvents[].when, repositoryEvents[].source, repositoryEvents[].description` | C | repoActivity.kind 映事件种类，at 格式化，actor 关联成员名作来源，text 作描述；没有发生的故障不生成事件 |
| `members[].details[].kind, projects[].details[].kind, repositories[].details[].kind, agents[].details[].kind` | K | 选择已有 Detail variant 的 renderer 结构 |
| `members[].details[].title, members[].details[].rows[].label, members[].details[].rows[].format, projects[].details[].title, projects[].details[].rows[].label, projects[].details[].rows[].format, repositories[].details[].title, repositories[].details[].rows[].label, repositories[].details[].rows[].format, agents[].details[].title, agents[].details[].rows[].label, agents[].details[].rows[].format` | K | 详情标签、格式与布局 |
| `members[].details[].rows[].value` | C | 当前已有成员 role/grants/mainProject/quota 生成 Access 事实行；不是任意未建模成员属性 |
| `projects[].details[].createdById, projects[].details[].focusedByCount` | GAP | G37；project 无创建人；mainProject 不等于完整关注关系 |
| `projects[].details[].rows[].value` | GAP | G36/G37；project_tagged_items 的讨论/结论计数、创建人、关注人数需要缺失事实；实验计数部分可由 Cat 计算 |
| `repositories[].details[].rows[].value` | C | 已有 Connection 行来自 remoteUrl/branch/publicKey（公钥不含私钥）；固定“只读部署密钥”不能掩盖没有访问权限事实 |
| `agents[].details[].rows[].value`（template_metadata） | GAP | G41/G42；文件数/版本/保存时刻可算，但 harnessVersion 与 targets 无来源 |
| `agents[].details[].rows[].value`（template_models） | GAP | G43；模型 id 有，purpose 无 |
| `members[].details[].rows[].id, projects[].details[].rows[].id, repositories[].details[].rows[].id, agents[].details[].rows[].id` | K | renderer 控件稳定键，不能拿它当持久化配置存在的证据 |
| `members[].details[].rows[].note, projects[].details[].rows[].note` | K | renderer 解释性文案 |
| `repositories[].details[].rows[].note`（引用实际自动化规则） | GAP | G40；例如真实“之后运行某规则”关联不是 copy，wire 没有该关联 |
| `agents[].details[].rows[].note`（静态解释） | K | renderer 文案；不能用文案宣称实际已经注入 secret |
| `members[].details[].rows[].enabled` | C | 成员权限开关来自 MemberStatusWire.grants |
| `projects[].details[].rows[].enabled` | K | 现有项目仅标签/计数，不存在业务 toggle；是未使用 union 分支，不制造项目配置 |
| `repositories[].details[].rows[].enabled, agents[].details[].rows[].enabled` | GAP | G40；仓库 on-push 重建/留言与模板只读/凭据注入/启动更新策略没有线字段 |
| `conversations[tab].sessions[].name, conversations[tab].sessions[].meta, conversations[tab].seed[].kind, conversations[tab].seed[].text, conversations[tab].seed[].blocks[].kind[changes], conversations[tab].seed[].blocks[].title, conversations[tab].seed[].blocks[].rows[].kind, conversations[tab].seed[].blocks[].rows[].text` | GAP | G44；Page.settings 没有 panels，只有 changes suggestions，不能恢复会话消息或会话列表；tab=members/projects/repos/agents |
| `agents[].editorConversation.sessions[].name, agents[].editorConversation.sessions[].meta, agents[].editorConversation.seed[].kind, agents[].editorConversation.seed[].text, agents[].editorConversation.seed[].blocks[].kind[changes], agents[].editorConversation.seed[].blocks[].title, agents[].editorConversation.seed[].blocks[].rows[].kind, agents[].editorConversation.seed[].blocks[].rows[].text` | GAP | G44；同样缺按模板 scope 的 Panel 会话 |
| `conversations[tab].scope.value, agents[].editorConversation.scope.value` | C | 当前 tab/选中模板 id 或已知模板名，本地 scope 不等于存在对应会话 |
| `conversations[tab].<AI-K>, agents[].editorConversation.<AI-K>` | K | 完整 AI-K 集合；不得以 reply 代替缺失的真实 Panel |
| `dialogs[id].<D>` | K | 完整 D 集合；id=invite/new_project/connect_repo/role/quota/remove/rename/merge/archive/sync/rotate/disconnect/add_template/add_file/remove_file/add_model/history/duplicate_template/delete_template/save_version/resend/suggest |
| `dialogSelection.initialName, dialogSelection.titleNameDialogIds[], dialogSelection.renameValue, dialogSelection.duplicateValue, dialogSelection.mergeOptions` | K | 选择/插值规则；initialName 用当前选择成员名，不留 J. Doe 剧情默认 |

## GAP 汇总（51 条来源缺口）

行号前缀都相对于 `/Users/mouriya/Ext/worktrees/eng-web-home/apps/web/src/client/contracts/`。D7 路径为 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-lab-backend.md`。以下每条都列明视图路径、业务含义与 **D7 18 字段表指向的拥有方**；这是缺失证据清单，不替父任务决定新增字段设计。

| ID | 视图字段路径（file:line） | 业务含义 / 缺少什么 | 按 D7 应向哪个权威源取 |
| --- | --- | --- | --- |
| G01 | `labs[].activity`（lab-common.ts:39） | 所有可切换 Lab 各自运行中实验数；Cat 仅含选中 Lab 的实验 | D7:89：各 Lab 的运行事实（store + Lab 的实验归属），不是 profile 静态文案 |
| G02 | `projects[].itemCount`（lab-common.ts:68） | 项目焦点选择器的项目项数量；计数口径与所需讨论等全集未进入目录 | D7:92：Lab project 相关对象，由投影统计；不能凭空定 item=实验 |
| G03 | `experiments[].owner`（lab-common.ts:80）；`settings.experiments[].ownerId`（lab-compute.ts:213） | 实验所属成员；SessionId 与 MemberId 无映射 | D7:93/106：Lab 的 conversation/member 业务关联加 store 根 session |
| G04 | `experiments[].discussion.label, .more`（lab-common.ts:95–96） | 来源讨论标题及其他关联讨论数；目录只有 discussion id，缺 headers/绑定全集 | D7:93、102：Lab conversation、run_conversation 关系 |
| G05 | `home.reports[].equation.after, .tex, .number`（lab-home.ts:53） | 报告公式位置、LaTeX 与编号；body 未声明编码 | D7:95：Lab report 内容；需要权威报告内容的可解析表示，不让前端猜正文结构 |
| G06 | `home.reports[].model`（lab-home.ts:54） | 报告发布时模型来历 | D7:95：Lab report 的发布事实/来源会话；不能用当前 omp 模型冒充历史模型 |
| G07 | `home.reports[].sourceCount`（lab-home.ts:55） | 报告来源文献/证据数量 | D7:95：Lab report 的来源引用关系；figures 不是 sources |
| G08 | `home.reports[].tags[], .moreTagCount`（lab-home.ts:56–57） | 报告标签及折叠后剩余标签数 | D7:95：Lab report 标签全集，前端再截断计数 |
| G09 | `home.reports[].figure.label, .caption`（lab-home.ts:40–41）；`.figure.chart.title, .xLabel, .yLabel`（lab-home.ts:31–33）；`.figure.chart.series[].name`（lab-home.ts:19） | 图号/题注与研究图坐标、曲线语义；只有 ArtifactId 和未声明格式的正文不足 | D7:95：Lab report 与其 figure 产物内容/元数据；不是 renderer 通用 copy |
| G10 | `home.progress.phase, .detail`（lab-home.ts:104、108） | 当前研究阶段与整体进展说明；milestone 没有明确这些语义 | D7:95：Lab milestone/研究进展业务事实；不能以任一 milestone 描述猜整体阶段 |
| G11 | `experimentsPage.lanes[].slots[].startMinute, .endMinute`（lab-experiments.ts:16–17，在途）；`experimentFlows[run].nodes[].timing.startMinute, .endMinute`（lab-experiments.ts:67，在途） | 正在执行调用的实际起点和可显示区间；SlotWire 无时刻 | D7:96–97：各 eval 写方槽位的在途事实（已结束部分才来自 store 调用） |
| G12 | `experimentFlows[run].nodes[].device`（lab-experiments.ts:48） | 当前调用/草稿节点绑定的设备显示；experiment 页没带模板输入 | D7:97 与 96 的模板设备归组：remote P3 元数据；P3 本身已占位，本条是本页未接入它 |
| G13 | `experimentFlows[run].description`（lab-experiments.ts:80，运行） | 没有来源草稿的正式运行的业务描述 | D7:97/93：Lab 实验业务属性；store 图只有调用事实，不拥有研究描述 |
| G14 | `flowEditor.palette[].durationMinutes`（lab-experiments.ts:123）；`nodeLibrary.definitions[].duration`（lab-experiments.ts:169） | 可复用节点默认估时；Def 无此字段，单个草稿的 estimate 不等于库默认值 | D7:98–99：Lab 库节点定义元数据；若另归 remote 或其他拥有方，需要明确决定，现不能推断 |
| G15 | `flowEditor.palette[].group`（lab-experiments.ts:129–130）；`nodeLibrary.definitions[].group`（lab-experiments.ts:164） | dev/char/calc 业务分组；不能由 Program/Agent/Human 或任意函数名唯一推断 | D7:98–99：Lab 库节点定义元数据 |
| G16 | `nodeLibrary.stagedChanges[].changes[].why`（lab-experiments.ts:178） | 每项节点修改理由 | D7:99：Lab 的节点修改意图/会话工具提交资料；源代码 diff 不包含动机 |
| G17 | `datasets.artifacts[].projectId`（lab-workspace.ts:67，讨论产物）、`.origin`（lab-workspace.ts:81）；`datasets.discussionLabels[].name`（lab-workspace.ts:99） | 讨论产物所属项目、讨论来历及短标题；datasets 不含 conversation header | D7:101–102：Lab conversation origin/project，与 artifact_meta.conversation 关联 |
| G18 | `datasets.artifacts[].lineage.image`（lab-workspace.ts:78） | 产生文件的实际环境镜像；datasets 无 templates，env 只有 template/remoteRun | D7:101：remote 模板 P3 的镜像资料，需随本页关联进入 |
| G19 | `datasets.artifacts[].references[].outputId`（lab-workspace.ts:72） | 哪个讨论产出以该文件为证据；references 附件只有输入 artifacts 和 conversation | D7:101–102：Lab 讨论产物/附件/证据关系，不能把 conversation id 当产出 id |
| G20 | `discussions.discussions[].last`（lab-workspace.ts:145） | 讨论列表最后消息摘要；Header 仅 lastMessageAt | D7:102：omp transcript 消息（停驻依 P2），由明确列表读取带出最新消息事实 |
| G21 | `discussions.discussions[].conclusions[].time`（lab-workspace.ts:133，pending） | 待确认结论创建时刻 | D7:102：Lab conclusion 创建事实；confirmation.at 只属于 confirmed |
| G22 | `clusters.containers[].state`（lab-compute.ts:48）；`containers.images[].liveContainers[].state`（lab-compute.ts:152） | 成功结束与失败结束区别；remote 的 ended 没有退出结果 | D7:103、105：remote 作业生命周期/退出事实；不能根据“已结束”判定 failed |
| G23 | `clusters.containers[].logs[].time, .severity`（lab-compute.ts:52） | 每条日志原始时刻与级别；SSE 帧 at 是抓取时间，remote tail 只发纯文本 | D7:103：remote tail 原始日志事实；若文本没有结构则不能声称恢复逐行元数据 |
| G24 | `containers.images[].group`（lab-compute.ts:149） | runner/judge/box 镜像业务分类 | D7:105：images 仓库镜像定义；P15 展开形状无分类 |
| G25 | `containers.images[].note`（lab-compute.ts:151） | 镜像业务说明 | D7:105：images 仓库定义/说明；不能把 fixture 的镜像专属描述归通用 copy |
| G26 | `containers.images[].nodeBindingCount`（lab-compute.ts:150） | 绑定该镜像的节点定义数；containers 没读节点定义 | D7:105 结合 99：Lab 库节点定义 → remote 模板 → images 绑定，前端计数 |
| G27 | `containers.images[].dependencies[].source, .reason`（lab-compute.ts:134） | 依赖下载/安装来源与依赖引入原因；P15 只有 name/version/kind | D7:105：images 镜像构建定义/依赖元数据 |
| G28 | `containers.images[].dependencies[].change.kind, .replacement`（lab-compute.ts:133–134）；`.files[].change`（lab-compute.ts:137）；`.occupancy[].change`（lab-compute.ts:142） | 相对哪一版本的依赖/文件变更和替代版本；无基准、旧定义或 diff | D7:105：images 仓库版本/变更事实，由客户端做 diff，不凭空标 added/modified |
| G29 | `containers.images[].builds[].state`（lab-compute.ts:154） | 哪个镜像版本是 draft/default/history；构建成功不等于默认 | D7:105：images/镜像仓库/remote 模板实际默认绑定选择，非 Komodo 构建状态 |
| G30 | `containers.images[].layers[].size`（lab-compute.ts:155） | 逐层或依赖类别的镜像体积 | D7:105：images/镜像仓库层资料；registry 总 size 不可逆分解 |
| G31 | `containers.images[].resources.allowPreemptible, .deviceAccess, .outboundNetwork, .primaryCluster, .selector`（lab-compute.ts:145–146） | 抢占、设备/出网策略、主集群与调度选择器；P3 resources 明确遗漏 | D7:105：remote 模板资源/调度配置。P3 已展开不代表未列字段自动有来源 |
| G32 | `containers.images[].files[].contents`（lab-compute.ts:139） | 镜像构建文件实际可编辑内容；P15 只有 path/size，无对应字节路由 | D7:105：images 检出文件内容，由其拥有方读取出线 |
| G33 | `containers.images[].files[].modified`（lab-compute.ts:137） | 文件修改时刻/修改标签；未给文件或 commit 时刻 | D7:105：images 文件/版本事实，不能借构建起止时刻替代 |
| G34 | `containers.images[].occupancy[].layer`（lab-compute.ts:142） | 文件/目录属于哪层 | D7:105：images 构建与镜像层归属，当前 P15 没有 |
| G35 | `settings.members[].focusSummary[]`（lab-compute.ts:184） | 成员多项目关注摘要，原型明确含主项目以外的 +N | D7:91、106：Lab member_profile/成员项目关系；只有 mainProject 不足 |
| G36 | `settings.projects[].discussionCount, .conclusionCount, .lastActivity`（lab-compute.ts:190）；`.details[].rows[].value` 中相同事实（lab-compute.ts:22） | 项目讨论/结论总数及最后活动；settings 没有相关全集 | D7:106（同 95、102）：Lab conversation/conclusion/activity，按 project 聚合 |
| G37 | `settings.projects[].details[].createdById, .focusedByCount`（lab-compute.ts:17） | 项目创建者、关注该项目成员数；ProjectWire 无创建者，关注不是 mainProject 同义词 | D7:92、106：Lab project 创建事实与成员关注关系 |
| G38 | `settings.repositories[].description`（lab-compute.ts:191） | 代码库业务说明；LibraryRepoWire 无描述 | D7:106：Lab library_repo 或对应受管理仓库说明，当前未承接 |
| G39 | `settings.repositories[].images[], .nodes`（lab-compute.ts:191）；`settings.imageDependencies[].image, .node, .warning`（lab-compute.ts:217） | 仓库关联镜像与节点数量/依赖警告；settings 没有定义与依赖图 | D7:106 结合 99、105：Lab 库/中心检出和 images 定义的源码依赖事实 |
| G40 | `settings.repositories[].details[].rows[].enabled, .note`；`settings.agents[].details[].rows[].enabled`（lab-compute.ts:23） | on-push 自动重建/讨论通知、具体规则关联、模板只读/凭据注入/启动更新配置；不是通用 UI toggle | D7:106：Lab 管理的仓库/模板配置（必要时关联 automation）；当前 rows 只有前端 fixture，Wire 没有策略 |
| G41 | `settings.agents[].harnessVersion`（lab-compute.ts:196）；`.details[].rows[].value` 的 harness 版本（lab-compute.ts:21–22） | 实际 omp harness 版本；lastCommit 是模板版本 | D7:106：omp 安装/模板运行元数据，不是多 harness 恢复，也不是钉版本 |
| G42 | `settings.agents[].targets[]`（lab-compute.ts:198）；`.details[].rows[].value` 中 targets（lab-compute.ts:21–22） | 模板应用到容器的目标路径 | D7:106：Lab 库 `.omp/agents` 的模板部署/应用规则，AgentTemplateWire 未列 |
| G43 | `settings.agents[].models[].purpose`（lab-compute.ts:200）；`.details[].rows[].value` 中模型用途（lab-compute.ts:21–22） | 每个配置模型的用途说明；models:string[] 只有 id | D7:106：Lab agent 模板定义，不是 omp 可用模型目录的 provider/name |
| G44 | `settings.conversations[tab].{sessions[].name,sessions[].meta,seed[].kind,seed[].text,seed[].blocks[].kind[changes],seed[].blocks[].title,seed[].blocks[].rows[].kind,seed[].blocks[].rows[].text}`（lab-compute.ts:219 → lab-common.ts:111–126）；`settings.agents[].editorConversation` 下同组路径（lab-compute.ts:203） | 各设置标签/模板编辑器的真实 Panel 会话、消息、变更块；settings 无 panels，suggestions 不等于 transcript | D7:106、D7-04/17：Lab Panel conversation + omp 消息 + Lab 附件 |
| G45 | `settings.discussions[].discussionId, .ownerId, .projectId, .participantIds[], .title, .unread`（lab-compute.ts:214）；`settings.unassigned.discussionCount`（lab-compute.ts:216） | 全部讨论清单/属主/未读/未分配计数；本页无讨论 headers；participantIds 只应为单 owner 投影 | D7:106（同 102）：Lab conversation/已读事实，不新增多人讨论 |
| G46 | `settings.unassigned.suggestions[].kind, .discussionId, .runId, .projectId, .reason`（lab-compute.ts:216） | AI 建议把哪个具体讨论/实验归到哪个项目及其理由；changes 文本未携这些引用 | D7:106：Panel `lab_propose_changes` 产生的 Lab 建议附件；需要语义引用，不能在前端 NLP 猜 id |
| G47 | `experimentFlows[run].remainingMinutes`（lab-experiments.ts:101） | 正在运行实验的预计剩余时长；未来调用与默认估时未给出 | D7:97/93：Lab 草稿计划估时或明确的运行估计源；store 已提交图只能给过去事实，D7 表没有授权猜测 |
| G48 | `experiments[].updated, .recency`（lab-common.ts:99–101，草稿） | 草稿最近保存/更新的真实时刻及跨草稿新鲜度排序；DraftWire.savedVersion 不含时刻且不能跨草稿比较 | D7:93：Lab draft 保存/更新事实 |
| G49 | `experimentFlows[run].nodes[].detail.parameters[].label, .value`（lab-experiments.ts:33–34、39、72；草稿默认值与在途输入） | 完整参数详情：experiment 页没有节点定义默认值，运行槽位也不带输入/版本；不能只显示参数覆盖却称已支撑全部详情 | D7:97–98：Lab 库节点定义的参数默认值、eval 在途槽位输入事实；已提交输入才可从 store GraphEdge/Value 解出 |
| G50 | `settings.agents[].entries[].source`（lab-compute.ts:193–194，持久化文件） | 区分模板自带与 repository 继承文件；合并后的 files(path,contents) 丢失来源 | D7:106：Lab 库 `.omp/agents` 的文件来源/继承事实；本地 added 是页面状态，不是此缺口 |
| G51 | `automation.rules[].when[].actor.name, .conditions[].actor.name, .then[].actor.name`（lab-workspace.ts:9、37–39） | 自动化步骤的具体 agent 执行者；当前消费可显示 Retro writer、Flow planner 等，规则标题不等价执行者名 | D7:100：Lab automation_rule 的动作/执行会话配置；当前 then 只有 prompt，没有执行者关联 |

### 需要保留的区分

1. **不是新增 GAP 的已知 U**：P1 产物契约/判据，P2 停驻 transcript，P3 模板与设备，P4 健康容量，P5 控制，P6 shell，P7 安装执行，P8 仪器触发，P9 GPU 用量，P11 邮件，P14 对象大小，P15 已明确列出的镜像定义字段，P17 模板使用次数，以及未知 `progress.total`。这些应诚实保留 U，不能为了“覆盖率”降为 K 或伪造 A。
2. **同名文本不等于 copy**：报告模型/图题/标签、镜像用途、仓库描述、变更理由是真实业务内容；renderer copy 只能提供标签与模板，不能给出那些值。
3. **有别页类型不等于本页有输入**：G12/G18/G26/G36/G39/G44/G45 主要是读取组合不闭合，不要求建立第二份权威数据。
4. **原型演示种子不是业务来源**：chart 采样参数、manualRun、saveConclusion、replyTemplate、historicalXrdSeed 等 K 只描述现有演示/页面脚手架性质；它们不能继续制造假研究图、AI 回复或已完成操作。真实数据入口仍应是对应 A/C。
5. 本报告不为这些缺口设计失败分支、重试、锁或仲裁，也没有把主路径未定的业务字段擅自决定归属到新表。D7 未明确的精确拥有方已标明需设计决定，不能以“投影会算”跳过。
