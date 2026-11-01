# D12（Pepgent Lab 公开线契约）Argon 逐条选票与意图裁决

投票人：`ArgonD12Vote`（argon 族，按 D1-12 全族合计一票）
对象：`local://decisions/D12.md`（D12-01 至 D12-17）
基线依据：`local://argon/D12-intent.md`（基线 1–7、红线 V-1–V-6）、`pepgent-soroi/LEDGER.md`、`pepgent-pm/evidence/decisions/{D7-lab-backend,D8-mvp-scope,D10-repo-delivery,D11A-solo-ruling-review}.md`、`local://decisions/D12-coverage.md`

---

## 一、三项专项意图裁定

### (a) D12-12：`guest` 调用 `lab.conversation.markRead` 只记录自己的阅读位置，是否属于 V-6 禁止的写入？

- **裁定结论：`【定：不属于 V-6 禁止的领域写入，不与用户原意冲突】`。**
- **`(U)` 依据：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`** 及 **`session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**：用户要求保留 `AI4S-prototype` 原型的业务层与 `owner | researcher | student | guest` 四角色模型，其中 `guest` 定位为只读成员（`Read-only`，无 `startWithoutApproval`、`approve`、`buildImages`、`manageMembers`、`editLibrary` 及讨论发言权限）。
- **理由：**
  1. V-6 禁止的是让只读 `guest` 执行修改实验室共享业务事实的领域写命令（`LabCommand`：创建或修改项目、实验、草稿、讨论消息/元数据、结论确认、节点库、成员、仓库、自动化、里程碑、运行介入等）。
  2. `guest` 作为有效 Lab 成员，本来就拥有读取该 Lab 讨论列表与讨论详情的权限（`D7-03`、`D11-49`）。`lab.conversation.markRead{conversation}` 并非 `LabCommand`，它只写调用者本人的 `conversation_read{conversation, member, readAt}` 行，用来计算该调用者自己在 UI 上看到的 `unread` 状态，不改变任何共享的 Lab 业务记录，也不影响其他成员看到的视图。因此允许 `guest` 调用 `markRead` 符合用户原意，不触发 V-6。

### (b) D12-10：`project.*` 只要求 `write`（`owner | researcher | student`）是否与用户原意冲突？

- **裁定结论：`【定：不与用户原意冲突】`（非 guest 成员间的项目写权限归技术/串联项，投赞成）。**
- **`(U)` 依据：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`** 及 **`session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**：原型成员与角色权限矩阵只区分 `startWithoutApproval`（`owner`/`researcher`）、`canApprove`（`owner` 全部 / `researcher` 自己实验）、`buildImages`（`owner`）、`manageMembers`（`owner`）以及 `guest` 只读。
- **理由：**
  1. 用户原话 `(U)` 与前端原型从未规定只有 `owner` 或 `researcher` 才能创建、改名、合并或归档项目（`project.create/rename/merge/archive`），也未禁止 `student` 管理项目标签。
  2. D12-10 将 `project.*` 纳入 Better Auth 的 `lab: write`（授予 `owner | researcher | student`，排除 `guest`），既严格拦截了 `guest` 写入（守住 V-6 与 `AGENTS.md` 第 1 条禁令），又未在 `(U)` 之外凭空给 `student`/`researcher` 增加未授权的限制。

### (c) D12-15：节点 `@group dev|char|calc` 与 `@estimateMinutes` 必填，沿用前端视图契约的闭合枚举，是否符合基线 2 / V-3？

- **裁定结论：`【定：完全符合基线 2 与 V-3】`。**
- **`(U)` 依据：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`**、**`session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**（保留前端原型视图契约，V-3）；
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`**、**`#47b71e05`**、**`session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/50f5cf06`**（后端拥有方为状态唯一源头，节点库 TS 文件持久化定义，基线 2）；
  - **(U) `LEDGER.md` U23**（严禁伪造数据掩盖缺口，V-2）。
- **理由：**
  1. **符合 V-3：** 前端契约 `web/client/contracts/lab-experiments.ts:8, 123, 129, 164, 169` 中 `NodeGroup = 'dev' | 'char' | 'calc'` 与节点默认时长 `durationMinutes`/`duration` 是流程编辑器调色板（`flowEditor.palette`）和节点库卡片（`nodeLibrary.definitions`）的必填视图字段。D12-15 原样对齐该闭合枚举与数值类型，保留了前端视图契约。
  2. **符合基线 2 与 V-2：** 节点的学科分组（制样/器件 `dev`、表征 `char`、计算 `calc`）和默认计划估时（`estimateMinutes`）属于可复用节点的领域元数据（而非 UI 画布的 `lane`/`column` 像素或布局坐标）。D12-15 将其放在节点定义唯一权威源 `Pepgent/lab-library` 的节点源码 JSDoc 中，由 TS AST 静态导出（与 `D7-11`、`D10-11(c)` 一致），补上了 `D12-coverage.md` 的 G14、G15 缺口，同时避免了前端投影捏造假默认值。

---

## 二、否决红线 V-1 至 V-6 逐条核对表

| 红线 | 内容摘要 | 是否触发 | 核对证据（`local://decisions/D12.md` 行号） |
| --- | --- | --- | --- |
| **V-1** | 遗漏 13 个页面中的任何页面，或保留 `/* … */`、`// …其余页面同理` 省略号 | **未触发** | `LabCatalogWire`（:279-283）、`LabPage` 13 个变体（:298-299）、`LabPageParams` 13 页（:300-315）、`LabPageWire` 13 页（:334-360）、`LabCommand` 49 个具名变体（:389-438）、`LabCommandOutput`/`LabCommandResult`（:441-491）及事件流（:498-506）全部完整定义，无任何省略号或未定义类型引用。 |
| **V-2** | 在后端或 Wire 中塞入假数据 / 静态 fixture 掩盖 D9 缺口 | **未触发** | “第一版无来源字段”（:517-535）明确将 P4 集群健康容量、P6 交互终端、P7 接入向导执行、P9 GPU 小时用量（`gpuHoursUsed: number \| null`，:331）、产物契约与判据、`progress.total`（:36）、`remainingMinutes`（:526）等列为不出线或 `null`，投影留空并在 D9 判为 `U`，严禁把原型演示值当数据。 |
| **V-3** | 删改前端原型页面或破坏 18 个 `LabSnapshot` 视图契约基准 | **未触发** | 保留 `client/contracts/lab-*.ts` 18 个顶层视图契约与 13 个页面组件；针对覆盖审计 G01–G51 补齐了有权威源的 wire 输入（D12-04/06/08/09/14/15/16）。 |
| **V-4** | 恢复多 harness 枚举、混入 `omomp`/`fork`、或复用旧 Paseo 后端 | **未触发** | `AgentTemplateWire.harness` 固定为字面量 `'omp'`（:224）；无 `fork`/`fork_task`；不引用旧 Paseo 或 `apps/hub`。 |
| **V-5** | 把 `dry run` 或未启动草稿写进 `store`，或引入代码重放与跨运行直接消费 atom | **未触发** | 草稿 `DraftCanvas` 只存 `lab.sqlite`（:38、181-200），不进 `store`；时间轴回看 `rewind` 走 `GET /runs/{run}/graph?at=`（:38、338），无重放；讨论装载产物走 `discussion.load` + `lab_open_artifact`，无跨运行直接消费 atom。 |
| **V-6** | 违背四角色权限语义（放开 `guest` 写权限或取消 `student` 启动实验审批门禁） | **未触发** | `LabGrants`（:130-134）与 D12-10（:42）要求所有 `LabCommand` 具备 `write` 或更严权限（均不授予 `guest`）；保留 `PendingLaunchWire.state: 'awaiting_approval' \| 'sent'`（:152）与 `experiment.approve`、`automation.approve` 审批流转；`markRead` 仅记个人阅读位置（见裁定 (a)）。 |

---

## 三、D12-01 至 D12-17 逐条选票表

| ID | 票 | 理由/反例 | (U) 引文 |
| --- | --- | --- | --- |
| **D12-01** | **赞成** | `store` 契约通过 git 依赖直接引用仓 A 的 `pepgent-store/contract`（不钉版本，与 D10-10 同构），`remote` 由 `remote schema` 生成，`omp` 由 `rpc-wire.schema.json` 生成，Mux 与在途槽位明确标注转录来源，消除了第一稿手抄契约导致的 `GraphNode.capture`、`AbortedCall`、`ComparisonPair.SameValue`、`ContentDigest` 漂移，符合基线 2“后端权威源头唯一性”与全局规则《权威源头与生命周期》《实现时不钉版本号》。 | **(U) `01a18e1f #64246eaf`**（store 为落盘状态管理唯一源头）；**(U) `LEDGER.md` U13**（以 omp 为核心） |
| **D12-02** | **赞成** | Lab 自有 ID 放宽为不透明品牌字符串（消除原型故事线字面量硬编码，符合基线 3），`store` ID 直接沿用 `contract` 推导类型，用户内容用语言中性 `string`，`ArtifactRef = store:<sha256> \| discussion:<DiscussionArtifactId>` 统一两类产物引用，且明确 `worktree` 路径、私钥路径、Better Auth 内部表与凭据不出线（符合基线 7 与《凭据规则》）。 | **(U) `LEDGER.md` U1、U23**；**(U) `01a18e1f #e3692177`** |
| **D12-03** | **赞成** | 保持 `D7-18` 的 `lab.catalog.read`、`lab.page.read`、`lab.command` 统一入口，将会话详情 `lab.conversation.read`、按会话模型读取 `lab.conversation.models`（遵循 `D7-15` 向该会话自身那一代发 `get_available_models` 与 `get_state`）和 `lab.conversation.markRead` 独立出来，并将 PR39 的节点库读写并入统一 RPC 面、去除非主路径变体，符合基线 1、基线 5 与主路径规则。 | **(U) `LEDGER.md` U1、U13、U23**；**(U) `01a192a2 #ed4570ad`** |
| **D12-04** | **赞成** | 完整定义 `LabCatalogWire`，补齐 `labs[].openRuns`（解 G01）、`projects[].createdBy` 与 `itemCount` 口径（解 G02、G37）、`ExperimentWire.conversation` 与 `owner`（解 G03）、以及全 Lab `DiscussionHeaderWire[]`（解 G04、G36、G45）；目录、页面与会话详情遵循 D11-47C 不重复携带同一记录；明确 `progress.total` 无来源（解 V-2）。 | **(U) `LEDGER.md` U1、U2、U23**；**(U) `01a18e1f #64246eaf`** |
| **D12-05** | **赞成** | 完整定义全部 13 个 `LabPage` 的 `LabPageParams`（满足基线 1 / V-1）；`experiment` 参数覆盖运行/草稿引用、历史时间轴回看 `at`（F10）、跨运行对比 `compare`（F13）和 Runner Workspace `workspace`（F18）；`settings` 改为无参一次返回四标签所需数据，使跨标签计数无需额外隐式请求。 | **(U) `LEDGER.md` U1、U2、U23**；**(U) `01a18e1f #9ff9d2be`**（历史时间轴） |
| **D12-06** | **赞成** | 完整定义 `experiments`、`experiment`、`flowEditor` 三页线数据与 `DraftCanvas` 语义结构：`experiment` 补入 `templates`（解 G12）与 `definitions`（解 G49）；`DraftCanvas` 只存拓扑依赖 `from`、分组 `arm`、参数覆盖与估时，不在后端存 `column`/`lane` 布局坐标，且草稿只存 `lab.sqlite` 绝不进 `store`，严格符合基线 2、基线 4 与 V-5。 | **(U) `01a18e8a #32b6f7fd`**、**`01a18e1f #7ffcea0c`**（非正式运行与草稿不进 store）；**(U) `01a18efe #9e2d37a1`**（无重放） |
| **D12-07** | **赞成** | 完整定义 `nodes` 与 `automation` 页线数据：`nodes` 在服务端导出暂存源码的 `definition` 并携带修改理由 `reason`（解 G16），预取各函数的 `usage` 并结合 `draftReferences` 支撑 F28、F29；不在浏览器端打包 TS AST 解析器，职责划分清晰。 | **(U) `01a18e1f #47b71e05`**、**`01a18e8a #50f5cf06`**（节点库 TS 定义持久化与导出） |
| **D12-08** | **赞成** | 完整定义 `discussions`、`discussion`、`datasets`、`clusters`、`connectCluster`、`containers`、`settings`、`home` 八页线数据与 `ConversationDetailWire`：补齐讨论 `activity`（含最后一条消息与当前成员 `readAt`，解 G20）、`datasets.templates`（解 G18）、`containers.definitions`（解 G26）与文本文件内容（解 G32）、`settings` 的 `panels`/`ompVersion`/`discussionActivity`（解 G41、G44、G45）；Komodo 构建记录与镜像仓库 tag 按 D8-16 不进第一版，符合基线 1、基线 5、基线 6 与 V-1、V-2。 | **(U) `LEDGER.md` U1、U2、U23**；**(U) `01a192a2 #ed4570ad`、`#cec515af`** |
| **D12-09** | **赞成** | 完整定义 `AutomationRuleWire` 与 `AutomationRunWire`：`when / conditions / then` 步骤携带结构化 `actor`（`automatic \| agent{template} \| approval`，解 G51）；触发后开的 `Automation` 会话保持为装着完整 soroi 定制的 Main 根会话（`D7-04`），由 Main 判断条件并用 `.omp/agents` 模板派子 agent（`D5-17`）；审批权限对齐 D11-29A/B，支撑 F30 与 F31 ⑥。 | **(U) `LEDGER.md` U13、U23**；**(U) `01a18e1f #e818d410`** |
| **D12-10** | **赞成** | 完整列出 49 个 `LabCommand` 变体与 `LabCommandOutput`（消灭 `/* … */`，满足 V-1）；智能体模板编辑走 Panel 会话 worktree 与 `library.merge`（`D7-11`）；不设 `lab.create`（对齐 D11-30）；不越界加入 D8-16 已归入 D9 的第一版不做命令；权限由 Better Auth 判定，新增 `lab: write` 拦截 `guest`（满足 V-6），会话级写命令校验 `conversation.owner`（对齐一人一会话与 D11-49），`project.*` 要求 `write` 不与用户原意冲突（见专项裁定 (b)）。 | **(U) `LEDGER.md` U1、U2、U23**；**(U) `01a18e1f #ba5ad307`、`#d1baf561`、`#a0d22b8a`、`#7bfe3696`**；**(U) `01a192a2 #ed4570ad`** |
| **D12-11** | **赞成** | 明确区分 GUI 交回输入 `GuiHandback`、发往会话控制端点的 `HumanHandback`（D5 §3.6）与 eval 插件提交给 store 的 `Handback`（D6），文件产物经 P16 落到持有槽位会话可读路径，严格遵守《权威源头与生命周期》的层次边界，支撑 F08 与 F23。 | **(U) `01a18e1f #ba5ad307`、`#d1baf561`**（GUI 人类介入写值交回） |
| **D12-12** | **赞成** | 新增 `conversation_read{conversation, member, readAt}` 与 `lab.conversation.markRead{conversation}`，按查看成员记录个人阅读游标，使 `discussions[].unread` 有真实权威源；允许只读成员 `guest` 记录自己的阅读位置不修改任何共享业务状态，不触发 V-6（见专项裁定 (a)）。 | **(U) `01a18e1f #e818d410`、`#e3692177`**；**(U) `01a192a2 #ed4570ad`** |
| **D12-13** | **赞成** | 将 `artifact.upload` 改为原始字节 HTTP `POST /api/lab/conversations/{conversation}/artifacts?name=&role=`，避免在 JSON RPC 中塞入大文件 `Blob`；补齐 `/api/lab/agents/{id}/files*`（代理 Mux，支撑 F16/F26）与 `/api/lab/volumes/{run}/{step}/{position}/files/{path}`（代理 store，支撑 F18 S2 Runner Workspace 文件预览），符合基线 4 与基线 6。 | **(U) `LEDGER.md` U2、U23** |
| **D12-14** | **赞成** | 在 eval 控制端点的 `SlotState.running` 与 `SlotState.awaiting_human` 上补齐调用开始时已知的 `startedAt: Instant`、`version: Version` 及 `running.inputs: AtomName[]`，由唯一权威拥有方（仓 B eval 插件）提供在途调用的真实起止时刻、绑定节点版本与输入参数，消除覆盖审计 G11、G49 缺口，避免客户端用当前默认分支冒充在途调用版本。 | **(U) `01a18e1f #64246eaf`**（状态取自真实运行权威源头） |
| **D12-15** | **赞成** | 在 `Pepgent/lab-library` 节点源码 JSDoc 约定必填 `@group dev \| char \| calc` 与 `@estimateMinutes <非负整数>` 并由 TS AST 静态导出为 `NodeDefinition.group` 与 `estimateMinutes`，对齐前端视图契约 `NodeGroup` 闭合枚举，消除覆盖审计 G14、G15 缺口，完全符合基线 2、V-2 与 V-3（见专项裁定 (c)）。 | **(U) `01a18e1f #e818d410`、`#e3692177`、`#47b71e05`**；**(U) `01a18e8a #50f5cf06`** |
| **D12-16** | **赞成** | 在 `lab_publish_report`、`lab_save_artifact`、`lab_propose_changes` 三个 host tools 输入与 `lab.sqlite` 对应表中补齐产生时刻已知的业务事实（报告项目/标签/来源/模型/公式与图语法、产物来源与创建时刻、结论创建时刻、草稿更新时刻、项目创建者、讨论创建时刻、仓库描述、暂存理由、项目归属建议结构等），在写入源头消除覆盖审计 G05–G09、G16、G19、G21、G37、G38、G46、G48，避免前端用 NLP 猜测或造假。 | **(U) `LEDGER.md` U1、U23**；**(U) `01a18e1f #e3692177`** |
| **D12-17** | **赞成** | 完整定义 `/api/lab/events`（`LabChange`）、`/api/lab/agents/{id}/stream`（`AgentStreamFrame` 区分 `omp_line` 与 `mux` 控制帧）、`/api/lab/jobs/{run}/tail`（`JobTailFrame`）的 SSE 帧形与频道失效表；`conversation` 频道仅在 `message_end` 与 Lab 事实变化时触发重读，流式 token 走 `watchAgent`，兼顾实时性与读取边界。 | **(U) `01a18e1f #2dbf970b`**（只读层面的多路复用与实时流观察） |

---

## 四、计票汇总（Argon 席位）

- **赞成（17 条）：** D12-01、D12-02、D12-03、D12-04、D12-05、D12-06、D12-07、D12-08、D12-09、D12-10、D12-11、D12-12、D12-13、D12-14、D12-15、D12-16、D12-17。
- **反对（0 条）：** 无。
- **否决（0 条）：** 无（V-1 至 V-6 均未触发）。
