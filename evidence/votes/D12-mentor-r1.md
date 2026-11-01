## 投票口径

我只依据所提供的 D12 决策表、已经通过的 D7/D8/D11 结论与 argon 红线投票，不引入目标会话内容，也不预设仓库中还存在未展示的定义。

判断重点是：

1. 线契约是否足以让后端与前端分别实现，而无需再猜字段、命令或帧形；
2. 每个事实是否仍由其权威方提供，Lab 只在边界解析、组合和授权；
3. 是否违反已通过的 D7、D8、D11 或 V-1～V-6；
4. 同一记录是否被多个读取面重复携带；
5. 第一版明确排除的内容是否又被公开契约重新引入。

---

# 逐条投票

## D12-01 外部形状来源

**投票：赞成。**

理由：

- store 通过仓 A 的 contract 模块消费，符合 D10-10 已通过的“不得复制第二份契约”原则。
- remote 与 omp 均从拥有方发布的 schema 生成类型，来源明确。
- Mux README 和 D5 §3.6 是当前给出的权威契约来源；在没有可生成 schema 的前提下，转录比根据前端视图反推更正确。
- “Lab 入口解析一次、浏览器网络边界解析一次”明确了两个信任边界，解析后的命名类型可以在各自进程内部使用，避免到处重复验证。
- contract 已出现 `capture`、`AbortedCall`、`SameValue`、带 `sha256:` 前缀的 digest 等实际差异，足以证明第一稿手抄形状已经不能作为权威来源。

实现时必须保持本条已经写明的约束：运行时解析器也必须由权威 schema/contract 派生，不能只生成 TypeScript 类型后再手写另一套结构校验；否则仍会重新产生第二份契约。这不是对本条的反对，而是其既定原则的直接实现要求。

**分类：同意“串联”。**

---

## D12-02 线协议总则

**投票：反对。**

### 具体反例

条目定义：

```ts
type NoParams = Record<never, never>
```

在 TypeScript 中，`Record<never, never>` 没有任何必需属性，实质上不能表达“只允许精确空对象”。例如无参 settings 页面本应拒绝旧的 `{tab}` 参数，但以下调用在结构类型层面不能由这个类型可靠阻止：

```ts
const oldSettingsParams = { tab: "members" }
const params: Record<never, never> = oldSettingsParams
```

同理，一个调用方仍可以把：

```ts
{ tab: "members" }
```

传给 D12-05 已改成无参的 settings 页面。这样 D7:106 的旧参数不会在编译边界被清除，浏览器网络边界也无法仅凭该 TypeScript 别名确定是否应拒绝多余字段。

### 证据与失效位置

- **证据：** `Record<never, never>` 只是在键集合为空时产生没有已声明属性的对象类型，并不是精确空对象的运行时 schema。
- **失效位置：**
  - D12-02 的 `NoParams` 定义；
  - D12-05 的八个无参页面；
  - “浏览器网络边界解析一次”的承诺，因为该别名本身没有给出精确拒绝额外字段的网络解析规则。

应改成能在静态和运行时都表示精确空对象的契约：运行时使用拥有明确 `additionalProperties: false`/strict-object 语义的空对象 schema；对应 TS 输出可以采用项目 schema 生成器产生的类型。若必须手写 TS 表达，至少不能使用 `Record<never, never>` 冒充精确空对象。

除此之外，本条的 ID 来源、store 类型复用、ISO UTC、语言中性字符串、敏感路径不出线、`ArtifactRef` 和 `OperationResult` 分层方向均赞成。

**分类：同意“技术”。**

---

## D12-03 RPC 面

**投票：赞成。**

理由：

- 六个 server function 的职责边界清楚：
  - 目录读取；
  - 页面读取；
  - 命令提交；
  - 会话详情；
  - 当前会话可用模型与状态；
  - 当前成员阅读位置。
- 会话是讨论页和右栏共同消费的独立读取单位，这比把完整消息复制进每个页面载荷更符合 D11-47C。
- `lab.conversation.models` 明确读取“该会话自己那一代”的 `get_available_models/get_state`，没有拿全局或当前进程状态冒充会话事实。
- 合并 PR39 的 library 能力、去除 `unavailable` 与 `LibraryCommit.cache`、为 staged 补 `definition` 和 `reason`，都在减少无来源字段或近处副本。
- RPC 面保持了 D7-18 的主体结构，而不是退回每个页面领域各造一套读写函数。

D12-08 当前又把讨论详情放回页面，这与本条冲突；该问题应在 D12-08 修正，不影响本条 RPC 分层本身成立。

**分类：同意“技术”。**

---

## D12-04 LabCatalogWire

**投票：赞成。**

理由：

- 目录承担跨页面稳定复用的 Lab、grant、成员、项目、实验和讨论头，页面载荷不再重复同一记录，符合 D11-47C。
- 实验事实分别从各自源头取得：
  - ext 与运行行来自 store/Lab 连接记录；
  - 最新 `RunGraph` 来自 store；
  - 在途槽位来自实际端点；
  - 草稿和 pending launch 来自 Lab；
  - 会话和 owner 通过根 session 与 Lab conversation 映射连接。
- “根端点 writers，再逐端点 slots”保留了 D5 所定义的端点归属，没有把某一端点的槽位状态拼成一个无来源的全局状态。
- discussion 只带会话头、运行关联与结论 ID，不带随每条消息变化的最后消息或已读位置，避免每次消息结束都使整个目录失效。
- `progress.total` 没有来源，因此明确不出线，而不是后端猜一个数字满足前端旧视图。
- 排序依据为权威创建时刻，客户端无需根据非权威活动字段猜顺序。

**分类：同意“串联”。**

---

## D12-05 LabPageParams

**投票：赞成。**

理由：

- 13 页被完整划分为 8 个无参页面和 5 个有参页面，没有遗漏页面叶子。
- experiment 参数同时覆盖：
  - 运行或草稿；
  - 指定序号回看；
  - 与另一运行对比；
  - Runner Workspace 的 step/position。
- `flowEditor{draft}`、`discussion{conversation}`、`nodes{version|null}` 都直接指向其实际读取对象。
- settings 一次返回四个标签的数据和计数，纠正了旧 `{tab}` 只能读取当前标签、却又要求标签栏同时显示其他计数的冲突。

本票成立的前提只是修正 D12-02 的 `NoParams` 表达方式；参数划分本身是正确的，不需要因为一个公共空对象类型错误而推翻本条。

**分类：同意“技术”。**

---

## D12-06 实验类页面

**投票：赞成。**

理由：

- experiments、experiment、flowEditor 三页只携带其页面专属读取结果；运行、草稿与实验基础记录继续从目录取得，避免重复。
- DraftCanvas 只保存语义事实：
  - 节点函数；
  - 参数覆盖表达式；
  - 上游关系；
  - arm 分组；
  - 估时；
  - 来源；
  - 阶段名。
- 列位置由拓扑深度计算，泳道由 arm 和模板设备计算，不把派生布局升级成第二份持久化事实。
- 草稿不进 store，满足 V-5；store 不会被迫承担它没有创建的对象生命周期。
- `rewind`、`comparison` 和 `workspace` 是页面请求对应的专属投影，来源分别明确，没有要求目录伪造这些视图。
- `presence` 由 Mux 提供，模板和定义来自各自拥有方，客户端再投影成既有前端视图契约，符合 V-3。

**分类：同意“串联”。**

---

## D12-07 nodes/automation 页

**投票：赞成。**

理由：

- nodes 页复用 PR39 的 `LibrarySnapshot`，而不是另造 library wire。
- staged 条目补足服务端实际导出的 `definition` 和 `reason`，这两个字段分别来自导出结果和 staging 记录，而不是客户端猜测。
- usage 明确逐定义读取 `/functions/{name}/usage`，权威来源清楚。
- `draftReferences` 合入 LAB-11b，避免节点页再通过扫描草稿内容自行推断。
- version 是明确页面参数；templates 和 panels 也均有来源。
- automation 页面只读取 Lab 自有规则和运行记录，不把条件判断或 agent 执行结果伪装成本地计算。

D12-09 中 instrument trigger 的 MVP 冲突应在那里修正；本条页面数据构成仍可成立。

**分类：同意“串联”。**

---

## D12-08 讨论、数据集、算力、容器、设置、首页

**投票：反对。**

### 具体反例

本条写：

- `discussions{activity, selected=目录第一条讨论详情|null}`
- `discussion{activity, selected}`
- 随后又定义 `ConversationDetailWire`

这表示页面读取会直接携带完整讨论详情。与此同时，D12-03 已经决定：

- `lab.conversation.read{conversation}` 是独立读取；
- 会话是“讨论页与右栏共用”的独立单位。

假设用户打开 discussions 页面，目录第一条为 conversation `c1`：

1. `lab.page.read({page:"discussions"})` 返回 `selected = ConversationDetailWire(c1)`；
2. 同一页面或右栏按 D12-03 又通过 `lab.conversation.read({conversation:"c1"})` 读取相同消息、附件、结论、上下文和未投递消息；
3. `message_end` 后，客户端同时存在两份 `c1` 详情副本；
4. D12-17 又要求 conversation 变化同时使独立 conversation 详情和 discussion 页面失效。

这不只是重复字节，而是同一记录拥有两个公开读取位置，与“会话作为独立读取单位”和 D11-47C 直接矛盾。

### 证据与失效位置

- **证据：**
  - D12-03：会话独立读取，供讨论页与右栏共用；
  - D12-04：目录与页面/会话读取不重复携带同一记录；
  - D12-08：页面的 `selected` 被写成“讨论详情”，并紧接着定义 `ConversationDetailWire`。
- **失效位置：**
  - discussions/discussion 页公开线契约；
  - conversation 的单一读取单位；
  - D12-17 的失效划分，因为同一详情必须在两个 cache slice 中同步。

应将页面中的 `selected` 收缩为：

```ts
ConversationId | null
```

或直接不返回 selected，由目录顺序确定默认 ID；完整详情只通过 `lab.conversation.read` 获取。`activity` 可以继续保留在页面，因为它是讨论列表投影，不等同于完整会话详情。

本条其他页面的主要数据来源划分整体正确，尤其是 P4、P6、P7、P9、镜像 tag 与 Komodo 构建不进第一版，以及对象大小、镜像定义等明确作为占位而非造数。

**分类：同意“串联”。**

---

## D12-09 自动化

**投票：反对。**

### 具体反例

本条允许规则 trigger：

```text
instrument P8
```

但背景中已通过的 D8-16 明确规定：

- 仪器事件 P8 **不进 MVP**；
- 应列入 D9。

假设 MVP 中用户或已有规则创建：

```text
trigger = instrument(...)
enabled = true
```

自动化规则表可以合法保存并展示该规则，但第一版没有仪器事件源，也没有负责产生该 trigger fact 的拥有方。该规则将永远不能产生 automation run。UI 和 API 会把一个第一版不可履行的触发器公开为有效规则，不是“占位假定能工作”，而是把已经明确排除的能力重新纳入 MVP 公共联合。

### 证据与失效位置

- **证据：**
  - D8-16：仪器事件 P8 不进 MVP，列 D9；
  - D12-09：第一版规则 trigger 联合直接包含 `instrument P8`；
  - D12-10：第一版命令联合又没有说明 instrument 规则只能读取、不能创建。
- **失效位置：**
  - AutomationRule trigger 联合；
  - 规则创建/更新命令；
  - MVP 可实现性；
  - enabled 规则的语义，因为拥有方无法提供触发事实。

第一版应从可创建的 trigger 联合中移除 `instrument`。它可以留在 D9 的未来扩展记录中，但不能作为当前公开线契约的有效 variant。event、schedule 与已有来源的 manual 触发事实可以继续保留。

除此之外，本条“不另造条件语言”、approval 步骤停在 waiting、批准后由 Main 根会话执行、conditions 交给该会话判断、模板只用于派子 agent 等方向均赞成，也符合 harness 只有 omp 的 V-4。

**分类：同意“串联”。**

---

## D12-10 命令联合与结果

**投票：反对。**

### 具体反例

本条声称：

> 每个 kind 显式写出无兜底

但实际决策表使用了大量通配族或自然语言引用：

- `intervene.*`
- `run.abort`
- `member.*`
- `library.*`
- `agentTemplate.*`
- `repo.*`
- `project.*`
- `approve 类`

只有少数命令给出了局部名称，例如：

- `agentTemplate.writeFile`
- `agentTemplate.removeFile`
- `agentTemplate.saveVersion`

仍没有完整列出每个命令的：

1. 精确 discriminant；
2. 输入载荷；
3. 每个字段的类型；
4. 对应 `LabCommandOutput[kind]`；
5. 受理后的精确返回结构。

例如工程师要实现“创建项目”时，只知道 `project.*` 需要 `write`，却无法从本条判断：

- kind 是 `project.create`、`project.add` 还是其他；
- payload 是否包含 name、description、repo、createdBy；
- createdBy 由浏览器提交还是服务端从操作者取得；
- 返回 `ProjectId`、完整 `ProjectWire`，还是无值受理结果。

同样，`agentTemplate.writeFile` 没有定义 path、内容表示、目标 conversation/id 与结果；`member.*` 也没有列出 invite、role change、remove 各自的载荷和结果。

### 证据与失效位置

- **证据：**
  - V-1 明确要求“13 页与命令必须完整无省略”；
  - 本条自己承诺“每个 kind 显式写出无兜底”；
  - 实际文本仍以 `*` 和“approve 类”代替联合叶子。
- **失效位置：**
  - `LabCommand` 联合；
  - `LabCommandOutput` 映射；
  - `LabCommandResult<C>`；
  - 前后端穷尽 switch；
  - 权限矩阵，因为目前权限只附在命令族上，不能证明每个实际 kind 都有且只有一个规则。

这是 D12 当前最直接的阻塞项之一。必须把完整命令 discriminated union 和完整 output map 写出，不能继续用命令族、星号或散文代替。权限说明可以作为每个叶子的附属表，但不能替代载荷和结果类型。

**分类：同意“串联”。**

---

## D12-11 GUI 交回

**投票：赞成。**

理由：

- GUI 只提交浏览器能够权威表达的字段值：
  - number；
  - string；
  - boolean；
  - 已经上传后得到的 `ArtifactRef`。
- Lab 在边界把 GUI 输入转换成 D5 的 `HumanHandback`，补上实际 slot 和当前 `UserId`，然后交给持槽位的会话端点。
- `by` 来自认证成员，而不是浏览器自报。
- 文件不以内存对象、浏览器路径或私有路径出线，只通过 artifact 引用传递。
- store Handback 仍由 eval 插件在提交时生成，不把内部插件事实混到 GUI 公共契约中。
- 这保持了两个不同生命周期：
  - GUI human handback 由 Lab 接收并转交；
  - store handback 由 eval 插件在 store 调用生命周期内产生。

**分类：同意“串联”。**

---

## D12-12 讨论已读

**投票：反对。**

### 具体反例

V-6 已明确：

> guest 只读

本条却明确规定 guest 可以调用：

```text
lab.conversation.markRead
```

且该调用会插入或更新：

```text
conversation_read{
  conversation,
  member,
  readAt
}
```

假设 guest 打开一条讨论：

1. 浏览器调用 `markRead`；
2. Lab 对 `conversation_read` 执行持久化写入；
3. 后续 `activity` 返回的权威事实发生变化；
4. 其他读取可以根据该记录计算该 guest 是否未读。

这是一项成功的服务端持久化写操作，不是纯读取。它虽然只改变调用者自己的阅读位置、不改变讨论正文，但 V-6 当前没有写成“guest 不得修改共享事实”，而是“guest 只读”。D12 无权仅通过把该写入移出 `LabCommand`，就使其不再属于写能力。

### 证据与失效位置

- **证据：**
  - V-6：guest 只读；
  - D12-12：guest 可以调用；
  - D12-12：新增权威表并记录 `readAt`。
- **失效位置：**
  - guest 权限红线；
  - `markRead` 授权；
  - D12-10 用 `lab:write` 表达 guest 只读的整体语义，因为这里人为绕开了命令联合和 `lab:write`。

第一版如果坚持 V-6 的字面结论，应有以下主路径：

- owner/researcher/student 可以写自己的 `conversation_read`；
- guest 可以读取讨论，但不持久化 guest 的 readAt，返回 `null` 或不为 guest提供权威未读状态。

若产品决定“guest 只读”只禁止共享领域事实、允许写个人阅读游标，那必须先把 V-6 本身正式改写成该语义；不能在 D12-12 中暗设例外。

**分类异议：本条不应分类为纯“技术”。**

它解释并改变了 V-6 的权限语义，至少应分类为：

> **串联 / 产品权限决策**

表结构和比较算法是技术部分，但“guest 是否可持久化 readAt”不是纯技术选择。

---

## D12-13 字节与上传

**投票：反对。**

### 具体反例一：artifact upload 没有完整响应契约

本条给出：

```text
POST /api/lab/conversations/{c}/artifacts?name=&role=
原始字节
```

但没有定义：

- `role` 的枚举；
- `Content-Type` 是否保留；
- 成功响应是 `ArtifactRef`、artifact metadata，还是空响应；
- 后续 `GuiHandback` 应从响应的哪个字段取得引用。

假设浏览器上传 GUI handback 文件，D12-11 要求最终提交：

```ts
{ artifact: ArtifactRef }
```

但 D12-13 没有说明 upload 如何把原始字节转换并返回这个 `ArtifactRef`，前端仍无法实现完整主路径。

### 具体反例二：两个代理端点只有路径，没有协议

本条新增：

```text
/api/lab/agents/{id}/files
/api/lab/volumes/{run}/{step}/{position}/files/{path}
```

但没有定义：

- HTTP method；
- agent files 是列目录、读取文件、写文件还是多种操作；
- agent file 的目标 path 放在哪里；
- 响应是原始字节、JSON 文件列表还是 Mux 原帧；
- volume 文件读取是否返回原始字节；
- 写文件是否允许；
- 对应的公开请求与响应类型。

例如前端想读取代理 agent 的 `notes.md`，仅凭 `/agents/{id}/files` 无法判断应调用：

```text
GET /agents/{id}/files?path=notes.md
GET /agents/{id}/files/notes.md
POST /agents/{id}/files
```

也无法判断返回文本、字节还是 JSON。

### 证据与失效位置

- **证据：** 本条只完整指定了第一个端点的 method 和 body 形式；后三项所需的 role、成功响应、代理 method 和响应形状都未出现。
- **失效位置：**
  - GUI 文件交回主路径；
  - agent 文件浏览；
  - volume 文件浏览；
  - 浏览器网络边界解析；
  - “公开线契约补全”的任务目标。

必须为每个路由写出 method、参数、body、成功响应以及字节响应的媒体类型。代理上游不等于可以省略 Lab 对浏览器公开的协议。

**分类：同意“技术”。**

---

## D12-14 在途槽位补字段

**投票：赞成。**

理由：

- `startedAt` 只有实际调用端点知道；
- `version` 必须是“该调用实际使用的节点版本”，不能拿当前 library 定义冒充历史执行事实；
- running 的 `inputs` 同样是调用开始时的实际输入，不应由草稿、当前定义或 RunGraph 反推；
- 同时给 running 与 awaiting_human 加 `startedAt/version`，保留了同一调用从执行到等待人工期间的事实连续性；
- 这是对 D5 §3.6 权威形状的必要补全，不是 Lab 自行增加派生字段。

**分类：同意“串联”。**

---

## D12-15 节点分组与估时

**投票：赞成。**

理由：

- group 和 estimate 是节点定义自身的业务元数据，随节点源码维护，比 Lab 表另存一份更符合单一权威源。
- JSDoc 必填，使前端必填字段有真实来源，不需要默认 group 或默认分钟数。
- 静态读取而不执行节点代码，避免为读取元数据触发节点模块副作用。
- `NodeDefinition.group` 与前端视图采用同一个有限枚举，适合穷尽处理。
- README 明确作者约定，保证新节点不会只靠隐含实现知识补字段。
- `dev | char | calc` 和 `number` 已经足以形成公共契约，无需再造 Lab 自有分类表。

**分类：同意“串联”。**

---

## D12-16 host tools 与表补列

**投票：赞成。**

理由：

- `lab_publish_report` 在写入时取得 project、tags、sources 和实际会话模型，都是发布动作能够确定并应由 Lab 记录的事实。
- Markdown body 对公式、编号和 `artifact:` 图片引用给出单一表达，没有让前端把展示语法反推成结构化事实。
- `lab_save_artifact.sources`、`lab_propose_changes.assignments` 都在事实产生时记录来源和归属，避免后续从正文、文件名或消息上下文猜测。
- 新增的 created/updated 字段均由创建或更新该记录的一方写入，生命周期锚点明确。
- `project.created_by`、`automation_rule.created_by`、`automation_run.ended_at` 等都是此前前端需要、但不能可靠推导的事实。
- `discussion_context.artifact_id` 改存 `ArtifactRef` 并去外键，承认讨论产物不只可能来自 store，也可能来自 discussion；不会再把 union reference 假装成单一表外键。

维护性建议：既然 `discussion_context.artifact_id` 已经不再是数据库 ID，而是 `ArtifactRef`，正式迁移时最好直接命名为 `artifact_ref`。历史名称不应成为新语义中的误导。该命名问题不影响本条事实来源和主路径，因此不构成反对票。

**分类：同意“串联”。**

---

## D12-17 事件与流帧形

**投票：反对。**

### 具体反例一：`LabChange` 仍未定义

本条只说：

```text
events 每帧 LabChange
```

然后给出一张失效表，但没有给出 `LabChange` 的 discriminated union。

假设 store 通知 run `r1` 已改变。浏览器必须知道：

- 这是 `catalog`、`run`、`conversation`、`automation`、`library` 还是 `compute`；
- 对于 run 变化，具体是哪一个 `RunId`；
- 对于 conversation 变化，具体是哪一个 `ConversationId`；
- 是否还需要 LabId；
- frame 的字段名与类型是什么。

否则浏览器无法实现本条写的：

> 该运行 experiment

因为它甚至不能从未定义的 `LabChange` 中取得“该运行”的 ID。

例如以下形状都符合目前的自然语言，却互不兼容：

```ts
{ kind: "run", run: runId }
```

```ts
{ slice: "run", id: runId }
```

```ts
{ kind: "changed", target: { type: "run", id: runId } }
```

这说明公共帧形仍然需要工程师猜测。

### 具体反例二：panels 与失效矩阵没有闭合

D12-06～D12-08 让大量页面返回：

```text
panels = 当前用户本页 Panel 会话头
```

但 conversation 变化的失效列表只包含：

- 独立会话详情；
- discussion(s)/home/settings 的 activity；
- datasets。

它没有包含：

- experiments；
- experiment；
- flowEditor；
- nodes；
- automation；
- clusters；
- connectCluster；
- containers。

假设用户在 nodes 页新建或更新本页 Panel 会话。该页面的 `panels` 列表或会话头已经改变，但若只发 `conversation` change，失效表没有要求重读 nodes 页；SSE 又明确不携带实体补丁，只发“哪个切片变了”，因此页面会保留旧 panel 数据。

如果 Panel 创建另有 catalog change，就必须在契约中明确由哪个权威动作发出哪个 change；当前表没有给出这一生命周期规则，不能靠实现者猜测同时发两类事件。

### 证据与失效位置

- **证据：**
  - D12-17 只命名 `LabChange`，未列字段或 variant；
  - D12-06～08 多页明确带 panels；
  - D12-17 的 conversation 失效行没有覆盖这些页面。
- **失效位置：**
  - SSE 浏览器解析边界；
  - cache slice 定位；
  - run/conversation 定向刷新；
  - 各页面 panel 更新；
  - V-1 要求的完整公开线契约。

需要显式写出 `LabChange` 联合，例如至少为每个 variant 指定其精确 ID 字段；同时必须把 Panel 会话的创建、头变化和消息变化分别映射到明确的 slice 失效规则。

`AgentStreamFrame` 与 job tail 的局部形状方向是正确的：

```ts
{ kind: "omp_line", line }
| { kind: "mux", frame }
```

和：

```ts
{ observedAt, text }
```

但不能弥补核心 `LabChange` 未定义。

**分类：同意“技术”。**

---

# 分类意见汇总

绝大多数原分类可以接受。唯一明确异议是：

| 条目 | 原分类 | 我的分类 |
|---|---|---|
| D12-12 | 技术 | **串联 / 产品权限决策** |

原因是 conversation_read 的表结构与比较算法是技术事项，但“guest 是否可以造成权威持久化写入”直接解释 V-6 的权限红线，不能作为纯技术实现细节通过。

D12-05 虽然修订 D7:106，仍主要是页面参数协议，归“技术”可以接受。D12-13 和 D12-17 也确属公开协议的技术定义问题。

---

# 总评

## 票数

- **赞成：10 项**
  - D12-01
  - D12-03
  - D12-04
  - D12-05
  - D12-06
  - D12-07
  - D12-11
  - D12-14
  - D12-15
  - D12-16

- **反对：7 项**
  - D12-02
  - D12-08
  - D12-09
  - D12-10
  - D12-12
  - D12-13
  - D12-17

## 总体结论

**D12 的总体方向正确，但当前文本不能整体通过。**

正确主线已经非常清楚：

1. store、remote、omp、Mux 与 Lab 表分别保有自己创建的事实；
2. 外部契约从权威来源导入或生成，而不是继续手抄；
3. Lab 在边界解析、授权和组合；
4. 浏览器把权威线数据纯函数投影成既有前端视图；
5. 草稿不进 store，布局不持久化；
6. 会话、运行、目录和页面应按记录生命周期分开读取；
7. SSE 只通知失效，不复制完整领域记录；
8. 无来源字段不造数，进入 D9。

这正是应该继续的方向，不需要推翻重做。

但是，当前仍有七个明确阻塞：

1. **D12-02：** `Record<never, never>` 不能表达精确无参协议；
2. **D12-08：** 页面再次内嵌 `ConversationDetailWire`，违反 D12-03 与 D11-47C；
3. **D12-09：** 第一版公开 instrument trigger，与 D8-16/P8 排除结论冲突；
4. **D12-10：** 命令仍以 `*` 和命令族省略，直接违反 V-1；
5. **D12-12：** guest 持久化 readAt 与 V-6“guest 只读”冲突；
6. **D12-13：** 三个字节/文件端点没有完整请求与响应契约；
7. **D12-17：** 核心 `LabChange` 仍未定义，且 Panel 会话失效矩阵没有闭合。

其中 **D12-10、D12-13、D12-17** 是“工程师仍无法仅凭公开契约实现”的直接阻塞；**D12-08、D12-09、D12-12** 是与已通过决策或红线的冲突；**D12-02** 是确定的 TypeScript/网络契约表达错误。

因此我的总票是：

> **D12 整体反对通过；保留 10 个赞成条目，仅修正上述 7 个条目后重新表决。**

修正不需要扩大范围或引入新机制，都是沿当前权威源、生命周期和完整联合的主线把已经承诺的契约真正写完整。