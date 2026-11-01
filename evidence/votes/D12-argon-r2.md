# D12（Pepgent Lab 公开线契约）第 2 轮 Argon 重投选票（含 D12-13 读取范围与归属补投）

投票人：`ArgonD12Vote`（argon 族，按 D1-12 全族合计一票）
对象：`local://decisions/D12.md` 第 2 轮修订的 7 个条目（D12-02、D12-08、D12-09、D12-10、D12-12、D12-13、D12-17）及对应类型与表格（`NoParams`、`AutomationTrigger`、`LabPageWire.discussions/discussion`、逐命令权限表、HTTP 路由表与“读取范围与归属”段、事件失效表）。其余 10 条（D12-01、03、04、05、06、07、11、14、15、16）正文未变，维持第 1 轮赞成票（`local://votes/D12-argon.md`）。

---

## 一、对 D12-13 补充“读取范围与归属”（同一 Lab 成员可读别人的 Panel 会话）的专项意见

- **结论：**
  1. **本意核对 `【定：不与用户原意冲突】`：**
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/2dbf970b`**：> “rpc实际上本来就要额外做只读层面的多路复用”
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**：> `multi_human: 裁掉：一人一会话`
     - “一人一会话”与 `D11-49` 的 `conversation.owner` 约束的是**写方归属**（只有会话所有者能对该讨论或 Panel 会话发 prompt、改模型、写模板文件或确认结论），而 `(U) 01a18e1f #2dbf970b` 明确要求 RPC 支持只读多路复用观察。用户在 `(U)` 中从未要求对同一 Lab 的其他成员隐藏讨论或 Panel 会话的只读访问。
  2. **对照基线 §1(b).5 读取可见性 `【暂定 · 赞成】`：**
     - 与 `local://argon/D12-intent.md:72`“只要通过 Better Auth 会话认证且是目标 Lab 的成员（含只读 `guest`），均可读取该 Lab 数据，不做行级读取裁剪”完全一致。
     - 将各页 `LabPageWire[P].panels` 定性为“当前用户在本页的 Panel 会话头选择范围”，而将 `lab.conversation.read`、`lab.conversation.models` 及 `/api/lab/agents/{id}/stream`、`/api/lab/artifacts/{id}` 的读取授权定为“调用者是该会话所属 Lab（`conversation.lab`）的成员”，既保持了页面右栏默认只展示本人 Panel 会话的清晰 UI 体验，又允许同 Lab 成员在查看节点库/智能体模板未合入草稿（`LibrarySnapshot.drafts`、`AgentTemplateWire.drafts`）或关联会话时合法读取同一 Lab 内的会话与产物，且严守了写操作（`panel.prompt`、`panel.model`、`agentTemplate.writeFile/removeFile/saveVersion`、上传产物）必须为会话 `owner` 的边界。
     - 根 agent 按 `conversation.lab`、子 agent 按所在运行 `experiment_ext.lab_id`、卷文件按 `experiment_ext.lab_id`、中心共享的 `jobs/{run}/tail` 与 `objects/{sha}` 按本中心任一 Lab 成员判定归属，权限边界清晰闭合。

---

## 二、否决红线 V-1 至 V-6 第 2 轮核对表

| 红线 | 内容摘要 | 是否触发 | 第 2 轮修订后的核对证据（`local://decisions/D12.md` 行号） |
| --- | --- | --- | --- |
| **V-1** | 遗漏 13 个页面中的任何页面，或保留 `/* … */`、`// …其余页面同理` 省略号 | **未触发** | 13 页 `LabPageParams`（:298-313）与 `LabPageWire`（:332-358）、49 个 `LabCommand` 与 `LabCommandOutput`（:387-489）、逐命令权限表（:494-515）、10 条 HTTP 路由表与“读取范围与归属”（:519-533）及事件失效表（:550-557）全部显式写出，零省略。 |
| **V-2** | 在后端或 Wire 中塞入假数据 / 静态 fixture 掩盖 D9 缺口 | **未触发** | D12-09 移除第一版不实现的 `instrument` 触发变体（:236-238、243-246），并将其列入“第一版无来源字段”（:576）在 D9 判为 `U`。 |
| **V-3** | 删改前端原型页面或破坏 18 个 `LabSnapshot` 视图契约基准 | **未触发** | 前端 `client/contracts/lab-*.ts` 18 个顶层字段与 13 个页面视图契约保持原位不变。 |
| **V-4** | 恢复多 harness 枚举、混入 `omomp`/`fork`、或复用旧 Paseo 后端 | **未触发** | `AgentTemplateWire.harness` 仍固定为 `'omp'`（:224），无 `fork`/`fork_task`，不触碰旧 Paseo 或 `apps/hub`。 |
| **V-5** | 把 `dry run` 或未启动草稿写进 `store`，或引入代码重放与跨运行直接消费 atom | **未触发** | 草稿仍只存 `lab.sqlite`（:38、181-200），回看仍走 `GET /runs/{run}/graph?at=`，无重放、无跨运行消费 atom。 |
| **V-6** | 违背四角色权限语义（放开 `guest` 写权限或取消 `student` 启动实验审批门禁） | **未触发** | 逐命令权限表（:494-515）与上传路由 `POST /api/lab/conversations/{conversation}/artifacts`（:526）对全部写操作要求 `write` 或更严权限（均不授予 `guest`）及会话 `owner`；保留 `PendingLaunchWire` 与 `experiment.approve` / `automation.approve` 审批流转；`markRead` 仅记调用者个人阅读游标（D12-12）。 |

---

## 三、第 2 轮修订条目（D12-02、08、09、10、12、13、17）逐条选票表

| ID | 票 | 理由/反例 | (U) 引文 |
| --- | --- | --- | --- |
| **D12-02** | **赞成** | 将无参页面的参数类型收紧为 `NoParams = Record<string, never>`（`D12.md:34、107`）、运行时 schema 为 `z.object({}).strict()`，编译期与运行期均拒绝携带多余字段（如旧 `{tab}`），消除了 `Record<never, never>` 允许非空对象通过的漏洞，符合边界精确解析原则与基线 1。 | **(U) `LEDGER.md` U1、U23**；**(U) `01a18e1f #e3692177`** |
| **D12-08** | **赞成** | 将 `LabPageWire.discussions.selected` 改为 `ConversationId \| null`、`LabPageWire.discussion.selected` 改为 `ConversationId`（`D12.md:40、347-348`），使讨论正文与右栏 Panel 一样只经 `lab.conversation.read` 读取，消除了同一份 `ConversationDetailWire` 在页面与会话读取中重复出现的双入口问题，与 `D11-47C`“每个事实只由一处携带”及基线 2 完全一致。 | **(U) `LEDGER.md` U1、U2、U23**；**(U) `01a18e1f #64246eaf`**；**(U) `01a192a2 #ed4570ad`、`#cec515af`** |
| **D12-09** | **赞成** | 从公开线类型 `AutomationTrigger` 与 `AutomationTriggerFact` 中移除第一版不实现的 `instrument` 变体（`D12.md:41、236-238、243-246`），并将其归入“第一版无来源字段”（`D12.md:576`）作为 D9 输入，与 `D8-16` 将 P8 仪器事件移出 MVP 保持严格一致，符合基线 3 与 V-2。 | **(U) `LEDGER.md` U13、U23**；**(U) `01a18e1f #e818d410`** |
| **D12-10** | **赞成** | 新增“逐命令权限”表（`D12.md:42、492-515`），将全部 49 个 `LabCommand['kind']` 逐一映射到对应的 Better Auth 权限语句（`organization: update`、`manageMembers`、`editLibrary`、`discussion: create/prompt`、`approval: any/ownExperiments`、`write`）与会话 `owner` 归属检查，消除通配符歧义；严格拦截 `guest` 的一切领域写命令（守住 V-6），且 `project.*` 要求 `write` 不与用户原意冲突。 | **(U) `LEDGER.md` U1、U2、U23**；**(U) `01a18e1f #ba5ad307`、`#d1baf561`、`#a0d22b8a`、`#7bfe3696`**；**(U) `01a192a2 #ed4570ad`** |
| **D12-12** | **赞成** | 正文机制不变，分类由“技术”改为“串联”并引用第 1 轮 Argon 意图裁定（`D12.md:44`）：`lab.conversation.markRead` 只记录调用者本人的 `(conversation, member)` 阅读游标 `readAt`，不修改任何实验室共享业务事实，不属于 V-6 禁止的领域写入，允许只读成员 `guest` 拥有自己的已读状态符合用户原意。 | **(U) `01a18e1f #e818d410`、`#e3692177`**；**(U) `01a192a2 #ed4570ad`** |
| **D12-13** | **赞成** | 新增“HTTP 路由”完整表格与“读取范围与归属”段（`D12.md:45、517-534`），逐条写明 10 条路由的 HTTP 方法、参数、请求体、成功响应/媒体类型与精确归属判定（上传要求 `write` 且为该会话 `owner`；会话/讨论产物读要求 `conversation.lab` 成员；根 agent 按 `conversation.lab`、子 agent 与卷文件按 `experiment_ext.lab_id`；中心级 `jobs/{run}/tail` 与 `objects/{sha}` 按本中心任一 Lab 成员；同 Lab 成员含 `guest` 可读该 Lab 全部会话，`panels` 仅为页面选择范围），与基线 §1(b).5 读取可见性及 `(U) 01a18e1f #2dbf970b` 一致，符合 V-1 与 V-6。 | **(U) `LEDGER.md` U2、U23**；**(U) `01a18e1f #2dbf970b`** |
| **D12-17** | **赞成** | 明确 `LabChange` 六个频道变体，并闭合 Panel 会话头的失效路径（`D12.md:49、554`）：发起 `panel.prompt` 新建 Panel 会话的页面在命令返回后使自身 loader 失效；Panel 会话头变化时发 `conversation{id}`，`panels` 含该会话的页面重读，无需改动 `D7` 已定的 `LabChange` 联合。 | **(U) `01a18e1f #2dbf970b`**（只读层面的多路复用与实时流观察） |

---

## 四、第 2 轮计票汇总（Argon 席位）

- **本轮重投 7 条全票赞成（7 / 7）：** `D12-02`、`D12-08`、`D12-09`、`D12-10`、`D12-12`、`D12-13`（含最新“读取范围与归属”）、`D12-17`。
- **连同第 1 轮未改动 10 条，D12 全表 17 条全票赞成（17 / 17），反对 0 条，否决 0 条（V-1 至 V-6 均未触发）。**
