# Argon 对 D12（Pepgent Lab 公开 Wire 契约补充）的意图基线报告

> **合规声明（依 `LEDGER.md` U1、U11、U20 / D1-16、D1-17 及 U24）：**
> 1. 本报告所有意图裁决与一票否决红线均逐字引用 **`(U)` 用户原话**（标注 `pepgent-soroi/LEDGER.md` 的 `U` 编号及历史会话 `session://<sid>/entry/<entry>`），具备直接 `(U)` 原话支撑的标为 **`【定】`**。
> 2. 凡缺乏直接 `(U)` 原话、属于在已通过 D2–D8/D10 框架下闭合跨组件接缝或选择具体 TypeScript/JSON 字段结构的事项，一律显式标为 **`【暂定】`**（归串联/技术/实现项，交由领导小组按 U12/U20 逐条投票，不用作一票否决依据）。
> 3. 本次调查严格只读 `pepgent-soroi/LEDGER.md`、`pepgent-pm/evidence/` 与 `/Users/mouriya/Ext/worktrees/eng-web-home/apps/web`，未触碰 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout，未改任何仓库文件。

---

## 一、专项问题回答（(a) Wire 源头与前端原型保留、(b) 数据禁令与角色可见性、(c) 13 个页面的 MVP 范围）

### (a) Wire 是否必须以前端现有页面实际消费的字段为源头？（用户是否要求保留前端原型？）

1. **用户是否要求保留前端原型：是，`【定】`。**
   - **`(U)` 引文：**
     - **(U) `LEDGER.md` U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`）：
       > “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`**（2026-10-31 03:54:42）：
       > “全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了”
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e3692177`**（2026-10-31 04:03:59）：
       > “大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/1951b981`**（2026-11-01 00:45:13）：
       > “如果要按AI4S-prototype这个原型来实现，在现在的基础上，现在有了基本的ai ui，你要怎么实现”
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`、`#1b65d9a8`、`#9df25cb1`**：
       > 用户拒绝删减原型页面或功能，宣布旧业务仓设计文档“均不做数，都是遗留垃圾，应该删除”，选择“挂进应用路由，数据用类型化 fixture”，并授权“去实现吧，这个实现可以用task high来做”。
2. **Wire 是否以页面现有消费字段为“权威源头”：必须严格区分“视图消费目标是前端契约 `【定】`”与“状态权威源头是后端各拥有方 `【定】`”（即 D7-17“线上传权威方形状，客户端投影对齐前端现有视图字段”`【暂定 · 已表决通过】`）：**
   - **`(U)` 引文：**
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`**（2026-10-31 05:07:53）：
       > “通常来说，以omp的视角来看，store天生是session log，但是，如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了”
     - **(U) `LEDGER.md` U23**：
       > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
   - **裁决说明：**
     - **【定（前端视图契约是投影终点与 D9 基准，不可删减）】** 前端 `apps/web/src/client/contracts/lab-*.ts`（`LabSnapshot` 的 18 个顶层字段）及 13 个页面的组件结构完整体现了用户亲自设计的 `AI4S-prototype` 业务面。D12 + 客户端投影层（`WEB-03`～`WEB-06`）必须以喂饱现有 13 个页面 controller/view-model 所消费的视图字段为目标，且保留 `client/contracts/lab-*.ts` 的 18 个顶层字段作为 D9（`D8-15` §5）机械遍历叶子（`A` 权威、`C` 派生、`K` 文案、`U` 无来源）的基准，**不得为了后端省事而删改页面或砍掉视图字段**。
     - **【定（后端各拥有方是状态的唯一权威源头，不得反客为主）】** 依 `01a18e1f #64246eaf`（前端连额外 DSL 都不要，直接读持久化状态管理）与全局规则《权威源头与生命周期》，wire 协议上承载的事实必须以各后端权威拥有方（`store` 的运行/图/事件/对象/volume、`omp-rpc-mux` 的在线与读方流、`Pepgent/remote` 的模板与作业、根 `omp` 的会话 transcript 与模型目录、`lab.sqlite` 的业务表与 Better Auth 组织/成员/角色）为唯一源头。**严禁把前端为了静态演示而写的布局坐标（`lane`、`dependencyColumn`）、双语静态文案（`LabText` 弹窗模板 `DialogSpecFixture`、首页名言 `quote`）、或派生统计值当成后端存储/传输的权威源头。**
     - **【暂定（D7-17 已表决通过的接缝架构）】** D7-17 规定：`src/protocol/lab/`（`LabCatalogWire`、`LabPageWire`）只传输权威方自己的数据形状；由客户端纯函数（`src/client/services/lab/project-*.ts`）结合 `renderer/locales/` 的 copy 目录，将 wire 数据投影为现有 `client/contracts/lab-*.ts` 的 `*Fixture` 类型。因此，对 D12 的精确要求是：**以 13 个页面现有 `*Fixture` 中全部 `A` 类（有后端权威源）和 `C` 类（由权威源派生）叶子字段为需求清单，反推并补齐 `LabCatalogWire` 与 13 个 `LabPageWire[P]` 中必须携带的权威数据字段，使客户端纯函数无需任何额外隐藏请求即可完成投影。**

---

### (b) 是否有用户原话禁止或要求某类数据（假数据、fixture、角色可见性）？

1. **禁止在接通后端后残留静态 fixture、假数据或故事线字面量伪装成权威数据 `【定】`：**
   - **`(U)` 引文：**
     - **(U) `LEDGER.md` U1**（“目前soroi的设计对于完整的pepgent是不够的……后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”）、**U2**（“这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”）、**U23**（“能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”）。
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/cec515af`**：> 对是否沿用旧 AI 回答：`现有的ai应该完全用不了`。
   - **约束结论 `【定】`：**
     - 纯前端阶段（`01a192a2 #ed4570ad`“不存在端到端，仅ui”）允许用 `LAB_SNAPSHOT` 静态 fixture 仅限前端独立开发期；在完整 Pepgent 全流程（U2、U23）的阶段 B（`D7-17`、`WEB-07`）中，**运行时不得再引用 `LAB_SNAPSHOT` 静态 fixture，不得保留 1200ms 定时器的假 AI 回复，不得保留写死的故事线字面量 ID（如 `'geometric_ai'`、`'jd'`、`'R-021'`、`'R-022'`、`'R-018'`）**。
     - **严禁后端在 wire 中伪造假数据去填充尚未实现的“缺失的点、线、面”（如 P4 集群硬件健康与 GPU 节点占用、P6 容器交互 shell 与预构建终端、P7 接入向导安装日志、P8 仪器事件、P9 GPU 小时计量）**。凡后端无权威来源的字段，wire 中不得伪造，必须由客户端投影留作默认值/空值，在 D9（`D8-15` §5.2）中诚实暴露为 **`U`（无来源）** 或 **`K`（文案）**，否则将直接篡改并掩盖 **U23** 要求识别的“缺失的点、线、面”。
2. **禁止把 `dry run` 或未启动的草稿写进 `store`；正式运行与草稿严格分离 `【定】`：**
   - **`(U)` 引文：**
     - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/32b6f7fd`**：> “dry run根本没有store，eval里一个atom什么时候叫成功运行还需要store？”
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`**：> “eval里所有的正式远程运行才需要进入store，任何非正式运行从头到尾都不进store，否则为什么叫非正式？”
   - **约束结论 `【定】`：** Wire 中实验的草稿数据（`DraftRow`、`PendingLaunchRow`）只能来自 `lab.sqlite`；`store` 的 `RunGraph` 只含已正式提交的步与未消费 atom，绝不含 `dry run` 或未运行预设节点。
3. **禁止多 harness 枚举（`'claude' | 'codex' | 'pi' | 'opencode'`），唯一 harness 为 `'omp'` `【定】`：**
   - **`(U)` 引文：**
     - **(U) `LEDGER.md` U13**：> “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
     - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/5ddb4d88`**：> “而，新时代的harness就是你正在跑的omp”
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a`**：> “pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理”
   - **约束结论 `【定】`：** Wire 与前端契约中 `AgentTemplate.harness` 必须收窄为唯一字面量 `'omp'`，`AgentTemplate.id` 为 Lab 库 `.omp/agents/` 下的 omp agent 定义名（`D7-11`、`D7-17`）。
4. **讨论限制为“一人一会话”，禁止多人讨论会话与旧 Paseo 数据 `【定】`：**
   - **`(U)` 引文：**
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**：> `multi_human: 裁掉：一人一会话`
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/cec515af`**：> `legacy_surface: 先不动，等页面做完再议`；`discussion_backing: 现有的ai应该完全用不了`
   - **约束结论 `【定】`：** 讨论 wire 不设多人参与者或讨论内邀请字段；消息来自 omp 会话 transcript，绝不读取旧 Paseo `session-store` 或 `apps/hub`。
5. **角色模型与可见性/权限要求（`owner | researcher | student | guest`）`【定（角色与写权限） / 暂定（读可见性）】`：**
   - **`(U)` 引文：**
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`**（保留原型业务层）；
     - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**（拒绝删除原型 `Owner/Researcher/Student/Guest` 成员角色页，废除旧仓库冲突设计文档）。
   - **约束结论：**
     - **【定（四角色与写权限门禁）】** Wire 必须保留 `MemberRole = 'owner' | 'researcher' | 'student' | 'guest'`，并携带 Better Auth 判定的角色权限状态（`startWithoutApproval`、`approve`、`buildImages`、`manageMembers` 以及 D10-12 新增的 `editLibrary`），供设置页展示权限矩阵与前端控制审批/操作入口：
       - `guest` 为**只读（`Read-only`）**，禁止一切写命令；
       - `student` 启动实验需审批（`pending_launch.state = 'awaiting_approval'`），Wire 必须携带 `pending_launch` 与 `automation_run`（`waiting`）状态，以便拥有 `approve` 权限的 `owner`/`researcher` 在页面看到待批准项并执行 `experiment.approve` / `automation.approve`（`F30`、`F31 ②`）。
     - **【暂定（读取侧角色可见性）】** 用户在 `(U)` 原话中从未要求对同一 Lab 内不同角色的成员隐藏页面或做行级读取裁剪。只要通过 Better Auth 会话认证且是目标 Lab 的成员（含只读 `guest`），均可调用 `lab.catalog.read` 与 `lab.page.read` 读取该 Lab 的目录与 13 个页面数据（与 `D7-03`、`D10-12` 一致）。

---

### (c) 13 个页面是否都属 MVP 范围？

1. **在“Wire 读取契约覆盖、客户端投影接通、13 页真实浏览器加载不报错、以及作为 D9 点线面录制输入”层面：13 个页面全部属于 MVP 范围 `【定】`。**
   - **`(U)` 引文：**
     - **(U) `LEDGER.md` U2**：> “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
     - **(U) `LEDGER.md` U23**：> “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
     - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`**：> “全面阅读这个原型，这是soroi的业务层……app层的业务好像几乎不用动”
   - **约束结论 `【定】`：**
     - 已通过的 `D7-17`、`D7-18` 与 `D8`（`WEB-02`～`WEB-07`、`D8-15` §5.1）明确规定：`WEB-07` 切换后运行时不再引用 `LAB_SNAPSHOT`，构建好的 host 在浏览器中走完 **13 个页面**，数据全部来自后端 `lab.catalog.read` 与 `lab.page.read`；且 `D8-15`（F32 / D9）必须采集全部页面的线数据录制与 18 个 `LabSnapshot` 顶层字段做叶子比对。
     - 因此，**D12 必须完整定义全部 13 个页面的 `LabPageParams[P]` 与 `LabPageWire[P]`，绝不允许只定义 3 个页面、将剩余 10 个页面留作 `// …其余页面同理` 省略号，也不允许任何一页的 `lab.page.read` 返回 `not_supported`。**
2. **在“各页面背后的写命令与外部基础设施实现深度”层面：严格按已通过的 `D7` 与 `D8-01`、`D8-16` 划分为“F01–F31 完整读写闭环页”与“MVP 只读 / 部分占位归入 D9 差距页” `【定】`：**
   - **完整读写闭环页面（F08–F18、F23–F31 直接走通）：** `experiment`、`flow_editor`（`flowEditor`）、`node_library`（`nodes`）、`automation`、`datasets`、`discussions`、`discussion`，加上提供项目/成员/仓库/智能体模板管理的 `settings`、提供实验列表与泳道的 `experiments`、提供全局概览与 Panel/报告的 `home`。
   - **第一版只读、控制或外围能力按 D8-16 原样列入 D9 的页面：**
     - `clusters`：第一版**只读**（`LAB-12`），返回 `remote templates`、`remote runs` + `remote status` 作业列表与 `Mux` 在线列表，加 `/api/lab/jobs/{run}/tail` 日志尾部 SSE（满足 `F17 S2` 与 `F31 ④`）；集群硬件健康容量（P4）、作业控制（`restart`/`destroy`/`new_sandbox`，P5 控制部分）、交互 shell（P6）第一版不实现（无写命令），列入 D9。
     - `connect_cluster`（`connectCluster`）：第一版**只读、无命令**，返回 `remote` 现有集群端点列表，向导步骤文案归 renderer copy；在线安装集群控制器的执行方（P7）第一版不实现，列入 D9。
     - `containers`：展示 `Pepgent/images` 镜像定义、`remote templates` 绑定与 `remote runs` 正在运行的 `liveContainers`；Komodo Build 流水线与镜像仓库 tag 读取（按 `D8-16`）、预构建检查与容器交互终端（P6）不在 F01–F31 路径内，列入 D9。

---

## 二、`eng-web-home` 中 13 个 Lab 页面与共享目录现状核对表

经核对 `/Users/mouriya/Ext/worktrees/eng-web-home/apps/web/src/`（`renderer/application/contracts/destination.ts`、`renderer/composition/lab-app.tsx`、`client/contracts/lab-*.ts`、`renderer/features/lab-*/`），13 个 Lab 页面与共享目录的对应关系如下：

| # | 前端路由 (`destination.ts`) | 前端 `LabPage.kind` | D7 草图 `LabPage` 名 | 消费的 `LabSnapshot` 顶层字段 | 页面核心内容与控制器消费字段 | 关联 F 流程与 MVP 读写定位 |
| --- | --- | --- | --- | --- | --- | --- |
| **目录** | `/_lab` 壳层（`LabNavigation`） | —（`readCatalog`） | —（`readCatalog`） | `labs`, `account`, `members`, `projects`, `experiments`（`aiModels` 改按会话读） | Lab 切换器（名称、glyph、运行中实验数）、当前登录账号与角色、项目焦点选择器（含计数）、跨页成员与实验目录索引 | **MVP 必达**（`LAB-07a`、`WEB-03`） |
| **1** | `/home` | `'home'` | `'home'` | `home` + `labs`, `projects`, `members`, `experiments` | 研究报告卡片（`reports`、图表/图片、`reportsThisWeek`）、动态流（`events`：`experiments \| data \| milestones`）、里程碑进度环（`progress`）、集群状态行（`clusters`）、活跃讨论行（`discussions`）、右栏 Panel 会话（`ai`） | **MVP 必达**（`WEB-06`；`report.*`、`milestone.*`、`panel.prompt`） |
| **2** | `/experiments` | `'experiments'` | `'experiments'` | `experimentsPage` + `experiments`, `projects`, `members` | 全部实验列表（按状态/项目/搜索过滤排序）、仪器设备排期泳道图（`window`、`lanes` 含调用起止时段与草稿计划时段）、右栏 Panel 会话（`ai`） | **MVP 必达**（`WEB-03`；模板设备字段 P3，排期仲裁归 D9） |
| **3** | `/experiments/$runId` | `'experiment'` (`{runId}`) | `'experiment'` (`{run}`) | `experimentFlows[runId]` | 三态实验详情（`draft \| running \| ended`）：运行 DAG 节点与边、历史时间轴（`?at=seq`）、跨运行对比（`/compare`）、派生自（`derivedFrom`）导航、在途槽位（`slots`）、节点参数/产物/判据详情、Runner Workspace 文件浏览（`/volumes`）、子 agent 实时流、右栏/节点介入弹窗 | **MVP 核心闭环**（`F08, F10, F13, F14, F18, F23–F27, F31`；`LAB-07a/b, LAB-08, WEB-03`） |
| **4** | `/experiments/$runId/edit` | `'flow_editor'` (`{runId}`) | `'flowEditor'` (`{draft}`) | `flowEditor` + `projects` | 实验草稿画布（`nodes: EditorNode[]`、`columns`、`origin`、`savedVersion`）、节点库调色板（`palette` 含参数、默认时长与设备繁忙状态）、画布连接校验、右栏 Panel 会话（`ai`） | **MVP 核心闭环**（`F27, F31 ②`；`LAB-11b, WEB-04`；`draft.save`, `experiment.start`） |
| **5** | `/experiments/nodes` | `'node_library'` | `'nodes'` | `nodeLibrary` + `experiments` | 节点库定义卡片（`definitions`：参数、默认值、返回输出、体种类、默认环境模板、挂载）、各会话未合入节点改动与落后 commit 数（D7-11）、暂存变更（`stagedChanges`）、历史运行与草稿引用（`experimentReferences`）及影响校验（`impacts`）、右栏 Panel 会话（`ai`） | **MVP 核心闭环**（`F24, F28, F29`；`LAB-10, WEB-05`；`library.stage/apply/merge/sync`；产物契约按 D10-11 归 D9） |
| **6** | `/automation` | `'automation'` | `'automation'` | `automation` + `projects`, `members` | 自动化规则列表与详情（`rules`：`when / conditions / then`、`triggerKind`、`scope`、`enabled`）、运行历史与待审批门禁（`runs`：`waiting` 含 `action` 及 `ok \| failed \| skipped \| running`）、右栏 Panel 会话（`ai`） | **MVP 核心闭环**（`F30, F31 ⑥`；`LAB-09, WEB-05`；`automation.rule.upsert/run/approve/dismiss`；P8 仪器触发归 D9） |
| **7** | `/datasets` | `'datasets'` | `'datasets'` | `datasets` + `experiments`, `projects` | 实验产物（来自 store 捕获 `File`、volume 清单、来源节点/模板/remote run、反查引用运行）与讨论产物（来自会话 worktree `artifact_meta` 不可变快照）、加载进讨论上下文（`discussion_context`）、文件预览、右栏 Panel 会话（`ai`） | **MVP 核心闭环**（`F09, F12, F31 ①⑥`；`LAB-05, LAB-11a, WEB-04`；`discussion.load`, `artifact.upload`） |
| **8** | `/discussions` | `'discussions'` | `'discussions'` | `discussions` + `projects`, `experiments`, `members` | 与 `discussion` 共用 `LabDiscussionsPage`（`discussionId = null` 时展示讨论列表并默认选中第一条讨论） | **MVP 核心闭环**（与 `#9` 同源，`WEB-04`） |
| **9** | `/discussions/$discussionId` | `'discussion'` (`{discussionId}`) | `'discussion'` (`{id}`) | `discussions` + `projects`, `experiments`, `members` | 讨论列表（按项目/实验分组）、一人一会话消息流（来自 omp transcript，含 `references` 及 `plan`/`conclusion` 附件）、待确认/已确认结论（`conclusions`）、已装载上下文产物（`context`）、关联与发起的实验运行（`bound` / `originated`）及待审批启动状态（`pending_launch`） | **MVP 核心闭环**（`F09, F25, F30, F31 ①②⑥`；`LAB-04, LAB-05, LAB-11a/b, WEB-04`） |
| **10** | `/compute/clusters` | `'clusters'` | `'clusters'` | `clusters` | 集群端点（来自 `remote` 模板归组）、运行与历史作业列表（来自 `remote runs` + `remote status`）及容器日志尾部（`/api/lab/jobs/{run}/tail`）、在线 agent 叠加（Mux `Presence`）、按集群右栏 Panel 会话 | **MVP 只读闭环**（`F17 S2, F31 ④`；`LAB-12, WEB-06`；第一版无写命令，P4 容量/P5 控制/P6 shell 归 D9） |
| **11** | `/compute/clusters/connect` | `'connect_cluster'` | `'connectCluster'` | `connectCluster` | 已有集群列表（来自 `remote`）与两套接入向导静态步骤（`controller` / `node`，文案归 copy） | **MVP 只读展示**（`WEB-06`；第一版无写命令，P7 执行器归 D9） |
| **12** | `/compute/containers` | `'containers'` | `'containers'` | `containers` | 镜像定义与层/文件树（来自 `Pepgent/images` 检出）、模板资源绑定（来自 `remote templates`）、正在跑的 `liveContainers`（来自 `remote runs` + `remote status`）、节点绑定计数（来自节点库导出）、右栏 Panel 会话 | **MVP 页面必达**（`WEB-06`；Komodo Build 触发与 P6 预检终端按 D8-16 归 D9） |
| **13** | `/settings/$tab` (`members \| projects \| repos \| agents`) | `'settings'` (`{tab}`) | `'settings'` (`{tab}`) | `settings` + `projects`, `members` | 四标签页：成员与角色权限矩阵/邀请（Better Auth + `member_profile`）、项目与未分配项建议（`project` + `lab_propose_changes`）、代码库与部署公钥（`library_repo` + `deploy_key` + git 状态）、智能体模板（`.omp/agents/`，`harness: 'omp'`）及各 tab 右栏 Panel 会话 | **MVP 必达**（`LAB-03, D7-14, D10-12, WEB-06, WEB-07`；P9 GPU 小时计量与 P11 邮件归 D9） |

> **注：** 另有公开登录路由 `/sign-in`（`lab-sign-in`），直接走 Better Auth 客户端服务（`/api/auth/*`），不属于 `LabPage` 的 13 个变体。

---

## 三、D12 意图基线条目（逐条：结论 + `(U)` 引文 + 对 D12 的约束）

### 基线 1：13 个页面与目录的 Wire 契约完整性（禁止省略号与半截定义）`【定】`

- **结论 `【定】`：** D12 必须一次性补齐 `LabCatalogWire`、`LabPage`、`LabPageParams`（全部 13 页）、`LabPageWire`（全部 13 页）、`LabCommand`（全部变体的完整字段，消灭 `/* … */`）、`LabCommandResult`、以及 `/api/lab/events`、`/api/lab/agents/{id}/stream`、`/api/lab/jobs/{run}/tail` 的完整类型定义。
- **`(U)` 引文：**
  - **(U) `LEDGER.md` U1**：> “因为我已经在过去的零散对话中已经给出了正确的设计，并且当前的design大部分内容是正确的，只是都只做了半截。另外，对于如何把不成体系的东西串联起来，需要你和讨论者再加argon共同协商，并且不允许偏离我的本意”
  - **(U) `LEDGER.md` U2**：> “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
  - **(U) `LEDGER.md` U26**：> “在任务足够清晰，设计足够可靠，决策项足够小，任务不是很庞大的时候，task low和task free都十分可靠”
- **对 D12 的约束：**
  - **必须有：** `LabCatalogWire` 及全部 13 个 `LabPage` 变体各自的 `LabPageParams[P]` 与 `LabPageWire[P]` 精确字段定义；`LabCommand` 每一个变体的完整 payload 与 `LabCommandResult` 返回结构。
  - **不得有：** 任何 `/* … */`、`// …其余页面同理`、未定义的类型名引用、或把跨模块 wire 字段留给实现工程师自行猜测（违背 U11、U26、U39 及 D10-08）。

---

### 基线 2：权威源头唯一性与客户端投影边界（Wire 传权威事实，前端契约作投影目标与 D9 基准）`【定（权威原则与视图保留） / 暂定（具体字段切分）】`

- **结论 `【定】`：** Wire 类型只承载各权威拥有方（`store`、`Mux`、`remote`、`omp`、`lab.sqlite` + Better Auth、`lab-library`/`images` git 检出）的领域事实；前端 `client/contracts/lab-*.ts` 的 18 个顶层视图契约保持原位，由客户端纯函数投影生成，不作删减。
- **`(U)` 引文：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`**：> “如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了”
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e3692177`**：> “大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”
  - **(U) `LEDGER.md` U23**：> “能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
- **对 D12 的约束：**
  - **必须有：**
    1. 覆盖 13 个页面全部 `A` 类（权威值）与 `C` 类（由权威值派生）叶子所需的后端权威数据字段；
    2. 对 `store` 已定契约类型（如 `RunSummary`、`RunGraph`、`RunEvent`、`CompareResult`、`VolumeListing`、`NodeVersionRecord`、`FunctionUsage`）、`Mux` 已定类型（`Presence`、`OmpLine`）、`remote` 已定类型（`TemplateInfo`、`RemoteRunSummary`、`RunStatus`）的直接引用或同构映射，避免发明第二套 workflow DSL。
  - **不得有：**
    1. 在服务端计算或通过 wire 传输纯 UI 布局坐标（如 `lane`、`dependencyColumn`、像素宽度）、静态双语 UI 文案模板（`DialogSpecFixture`、首页 `quote`、接入向导静态步骤文案）；
    2. 删改 `client/contracts/lab-*.ts` 的 18 个顶层字段结构以逃避 D9 叶子盘点。

---

### 基线 3：严禁假数据与故事线硬编码，诚实暴露 D9 缺口 `【定】`

- **结论 `【定】`：** Wire 契约与后端实现中严禁塞入 mock/fixture 假数据来填充未实现的占位能力（P4、P6、P7、P8、P9、P11 等）；前端契约中的故事线字面量 ID 必须在阶段 B 放宽为通用字符串。
- **`(U)` 引文：**
  - **(U) `LEDGER.md` U1**：> “目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远”
  - **(U) `LEDGER.md` U23**：> “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
- **对 D12 的约束：**
  - **必须有：**
    1. 所有实体 ID（`LabId`、`MemberId`、`ProjectId`、`RunId`、`DraftId`、`ConversationId`、`AutomationRuleId`、`AutomationRunId`、`ArtifactId`、`ClusterId`、`ImageId`、`AgentId`、`DefinitionId` 等）在 `src/protocol/lab/` 中定义为 `string`（或品牌 `string`），并在阶段 B 同步放宽 `client/contracts/lab-*.ts` 中的故事线字面量联合（如 `'geometric_ai'`、`'jd'`、`'stab'`、`'R-021'`、`'R-022'`、`'R-018'`、`'N-01'`、`'A-01'` 等）；
    2. 对第一版不实现的占位能力（如 P4 集群硬件容量/GPU 节点占用、P6 交互 shell/预构建终端、P7 接入向导安装执行、P8 仪器事件、P9 GPU 小时用量 `gpuHours.used`、逐步求值事先未知的 `progress.total`），wire 中要么不伪造该字段、要么明确定义为 `null` / 空数组，使客户端投影与 D9-02 能机械判定其为 `U`（无来源）。
  - **不得有：** 后端返回写死的假集群负载、假 GPU 节点占用、假终端输出、假 AI 回复或 `LAB_SNAPSHOT` 静态常量。

---

### 基线 4：实验、草稿、历史时间轴、跨运行比较与人类介入的 Wire 要求 `【定】`

- **结论 `【定】`：** 实验详情页、实验列表页与流程编辑器的 wire 必须完整支撑：正式运行与草稿分离（`dry run` 零入库）、历史时间轴按序号 `at=k` 回看（无重放）、跨运行比较（`/compare`）、远程结束后浏览 Runner Workspace（`/volumes`）、以及三种人类介入（`takeover` 改值、`answer` 回答主动 `human()`、`derive` 改参数或函数体派生新正式运行）与中止（`abort`）。
- **`(U)` 引文：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9ff9d2be`**：> “历史时间轴是个极为重要的功能”
  - **(U) `session://01a18efe-53d0-7218-a9b2-6fd35ae9213b/entry/9e2d37a1`** 与 **`01a18e8a #21495b13`**：> “没有重放，这是意淫的东西”、“跑你妈同一份脚本，从来就没有重放”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/32b6f7fd`** 与 **`01a18e1f #7ffcea0c`**：> “dry run根本没有store”、“任何非正式运行从头到尾都不进store”
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/ba5ad307`、`#d1baf561`、`#a0d22b8a`、`#7bfe3696`**：
    > “不，写方不一定只有ai，可以是人在gui写，写了以后通知ai改变了，但是值已经进去了……新的实例，新的参数，旧的函数体”
    > “人类写这种操作等于，将一个运行的程序取消，原本的atom要经过程序消费，现在经过一个特殊的程序，就叫他人类接入，所以产生了新的atom，然后自动触发函数消费”
    > “人类修改正在运行的函数体并派生新的闭包这件事永远都是正式运行”
    > “因为omp的subagent语义里一切都是irc，所以irc可以知道来源是主agent，而irc可以是一条普通的user prompt，所以可以派对，乃至被人类编辑”
- **对 D12 的约束：**
  - **必须有：**
    1. `LabPageParams['experiment']` 与 `LabPageWire['experiment']` 必须支持：读取当前或指定历史序号 `at?: Seq` 的 `RunGraph`（F10）、读取与另一运行（如 `derivedFrom` 父运行或指定运行）的 `CompareResult`（F13）、读取 `derivedFrom` 派生链信息（F24）、读取已结束远程调用的 Runner Workspace 目录清单 `/volumes/{run}/{step}/{pos}`（F18）、读取在途槽位 `slots`（含 `awaiting_human` 请求与运行中调用，F08/F23/F24）以及关联子 agent 的 `Presence` 与实时流入口（F26）；
    2. `ExperimentWire` 必须包含 `pending_launch` 状态（`'awaiting_approval' | 'sent'`），以支撑 `F31 ②` 免审批/需审批启动实验的完整状态流转；
    3. `LabCommand` 必须完整包含 `intervene.takeover`、`intervene.answer`、`intervene.derive`（支持 `Committed{step, position}` 与 `InFlight{writerSession, slot}`，含改参数 `ChangeInput` 与改版本 `ChangeVersion`）、`run.abort`、`human.irc`（支持 `enqueue | edit | withdraw`，作用目标涵盖根会话 `human_irc_queue` 与子 agent `mux_human_irc`）。
  - **不得有：** 任何“重放旧脚本”命令、把 `dry run` 写入 `store` 的字段、或原地覆写已提交运行图节点的命令。

---

### 基线 5：讨论、Panel 会话、模型选择与宿主边界的 Wire 要求 `【定】`

- **结论 `【定】`：** 讨论（一人一会话）与各页右栏 Panel 会话均由装着完整 soroi 定制的根 `omp` 驱动，消息直读 omp transcript；智能体模板固定 `harness: 'omp'`；模型列表与切换直接走会话自己的 omp 进程；完全隔离旧 Paseo 与 `apps/hub`。
- **`(U)` 引文：**
  - **(U) `LEDGER.md` U13**：> “对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  - **(U) `LEDGER.md` U23**：> “一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
  - **(U) `LEDGER.md` U24**：> “不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
  - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad` & `#cec515af`**：> `multi_human: 裁掉：一人一会话`；`legacy_surface: 先不动`；`现有的ai应该完全用不了`
- **对 D12 的约束：**
  - **必须有：**
    1. `discussion` 与 `discussions` 页面 wire 提供：讨论列表摘要（含关联实验 `originated` / `bound`、项目、最新消息摘要）、当前讨论的 omp transcript 消息、工具产生的附件（`plan`、`conclusion`、`references`）、结论列表（`confirmed` / `pending`）、已装载产物 ID 列表（`discussion_context`）、以及该讨论会话的 `pending_launch` 与 `human_irc_queue`；
    2. 各带右栏 AI 的页面 wire 提供或可按 `{ page, scope }` 读取对应的 `Panel` 会话状态、消息与变更建议附件（`lab_propose_changes`），以及按会话读取/切换 omp 模型（`D7-15`）；
    3. 设置页 `agents` 标签页 wire 中智能体模板的 `harness` 类型固定为字面量 `'omp'`，`id` 为 `.omp/agents/` 下的定义名。
  - **不得有：** `'claude' | 'codex' | 'pi' | 'opencode'` 多 harness 枚举；多人讨论成员邀请字段；任何引用 `server/paseo/**`、`hub-client` 或 `fork`/`fork_task` 的类型。

---

### 基线 6：节点库、数据集、算力页与自动化的 Wire 要求 `【定】`

- **结论 `【定】`：**
  1. **节点库页（`nodes` / `node_library`）：** Wire 必须返回中心检出 `nodes/*.ts` 导出的定义（参数、默认值、返回字段、体种类、默认环境模板；产物契约按 D10-11(b) 列入 D9）、各会话 worktree 相对默认分支未合入的节点路径与落后 commit 数（D7-11）、`library_staging` 暂存修改、以及 `store` `/functions/{name}/usage` 加草稿引用的使用与影响数据（F28、F29）。
  2. **数据集页（`datasets`）：** Wire 必须返回 `store` 正式运行产出的 `File` 对象、volume 文件清单、产生它的节点/环境/运行来历、被引用运行列表（`/values/{hash}/runs`），以及各会话 worktree 中的讨论产物快照（`artifact_meta`）与 `discussion_context`；严禁跨运行直接消费 atom（F09、F12）。
  3. **算力页（`clusters`）：** Wire 必须返回 `remote templates`（含 `identity` 与 P3 展示字段）、`remote runs` + `remote status` 构成的作业列表 `jobs: { run: RemoteRunSummary; status: RunStatus }[]`（含 `EndedUnstarted` 终态）及 `Mux` 在线 agent 列表 `presence`，并配只读 SSE `/api/lab/jobs/{run}/tail`（F17 S2、F31 ④、LAB-12）。
  4. **自动化页（`automation`）：** Wire 必须返回 `automation_rule` 与 `automation_run`（含 `waiting` 待批准状态与 `running` 关联会话），命令支持 `upsert`、`run`、`approve`、`dismiss`（F30、F31 ⑥）。
- **`(U)` 引文：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/47b71e05`**、**`01a18e8a #50f5cf06`**：节点文件是普通 TS 文件，预定义持久化供后续 import 调用。
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/63f31453`**：> “跨会话消费从头到尾就是错的，听不懂？”
  - **(U) `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6`、`#c5030836`、`#09e1cc92`** 与 **`LEDGER.md` U1**：`remote` 独立管理模板目录与作业生命周期。
- **对 D12 的约束：**
  - **必须有：** 上述四页对应的完整权威 wire 结构与命令；
  - **不得有：** 在算力页或接入向导页第一版加入 `cluster.connect`、`sandbox.create`、`job.restart`、`job.destroy`、`shell` 等已在 D7-12 / D8-16 明确定为第一版不做并归入 D9 的命令。

---

### 基线 7：四角色权限矩阵与凭据安全的 Wire 要求 `【定】`

- **结论 `【定】`：** Wire 必须准确反映 `owner | researcher | student | guest` 四角色与 Better Auth 判定的五项权限（`startWithoutApproval`、`approve`、`buildImages`、`manageMembers`、`editLibrary`），且严禁在任何 wire 响应中泄露私钥或凭据明文。
- **`(U)` 引文：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`**；
  - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**（保留原型 `Owner/Researcher/Student/Guest` 成员角色设计）；
  - 全局规则《凭据规则》。
- **对 D12 的约束：**
  - **必须有：** `LabCatalogWire`（或 `account`）与 `LabPageWire['settings']` 携带成员的 `MemberRole` 及权限判定结果（含 `approve` 范围与 `editLibrary`）；`deploy_key` 仅含 `id`、`publicKey`、`createdAt`。
  - **不得有：** 将 `privateKeyPath` 或私钥内容、模型 API key、Mux 写方 token 放进公开 wire 类型；将 `guest` 设为可写角色。

---

## 四、对 D12 技术、串联、实现条目的投票立场（Argon 权限 4）

以下事项无直接 `(U)` 原话硬性规定具体写法，标为 **`【暂定】`**，归串联/技术/实现项。只要 D12 草案满足下列准则且不触碰第五节否决红线，Argon 席位将投 **赞成** 票：

1. **`【暂定】` `LabPage` 13 个页面标识符的命名统一：**
   - 现状中前端路由契约 `destination.ts` 使用 snake_case（`'flow_editor' | 'node_library' | 'connect_cluster'`），而 D7 草图（第 128–129 行）使用了 `'flowEditor' | 'nodes' | 'connectCluster'`。D12 无论统一采用 `destination.ts` 的 snake_case 还是 D7 草图的命名（或在 `LabBridge` 内部做 1:1 映射），只要 13 个页面一一对应、编译期穷尽检查，均投 **赞成**。
2. **`【暂定】` `discussions`（`/discussions`）与 `discussion`（`/discussions/$discussionId`）两页的 Wire 复用方式：**
   - 前端这两个路由挂载同一个 `LabDiscussionsPage`（区别仅为 `discussionId` 是否为 `null`，为 `null` 时默认选中第一条讨论）。D12 可以让 `LabPageWire['discussions']` 与 `LabPageWire['discussion']` 共用同一套讨论列表 + 当前打开讨论详情结构（当列表为空时当前讨论详情为 `null`），避免重复定义，投 **赞成**。
3. **`【暂定】` 右栏 Panel 会话与模型列表的读取挂接方式：**
   - 各页面右栏 `Panel` 会话的消息与建议附件（`lab_propose_changes`）可以内嵌在各页 `LabPageWire[P]` 的 `panel` 字段中返回，而模型列表按 `D7-15` 在打开模型选择或会话就绪时按会话从 omp `get_available_models` 读取（或随会话状态返回），只要遵循 `D7-15`“模型目录取自该会话自己的 omp 进程，不在 `readCatalog` 硬编码全局列表”，投 **赞成**。
4. **`【暂定】` `lab.catalog.read` 在未指定 `lab`（`lab: null`）时的返回契约：**
   - 首次进入 `/_lab` 时客户端尚未选定 `labId`，`lab.catalog.read{lab: null}` 默认选中当前登录用户在 Better Auth 中的第一个所属 Lab（organization）并返回该 Lab 的 catalog 与 `selectedLabId`，投 **赞成**。
5. **`【暂定】` `artifact.upload` 与文件字节传输编码：**
   - 在 JSON server function `lab.command` 中传输上传文件内容时，使用 base64 字符串或 `Uint8Array`/multipart，只要在会话 worktree 下按内容哈希生成不可变快照 `artifacts/<hash>/<name>` 并登记 `artifact_meta`（`D7-05`、`D7-07`），投 **赞成**。

---

## 五、一票否决红线清单（Argon 权限 1 & 2：触发即否决）

依据 **U1、U11、U20（D1-16）**，D12 是对已通过 D7 的设计补充，Argon 拥有一票否决权。若 D12 草案出现以下任一情形，我将直接凭所附 `(U)` 原文行使否决权或判定与用户原意冲突失败：

1. **【否决红线 V-1：遗漏 13 个页面中的任何页面，或继续留省略号】**
   - 若 `LabPageParams` / `LabPageWire` 未覆盖全部 13 个 Lab 页面、或 `LabCommand` 仍保留 `/* … */` 省略号、或允许某页 `lab.page.read` 返回 `not_supported`。
   - **依据 `(U)`：** **U1**（修补半截设计）、**U2**（全流程不擅自收缩）、**U23**（走通所有流程并基于 18 个字段盘点点线面）、**U26**（设计足够可靠、决策项足够小）。
2. **【否决红线 V-2：在后端或 Wire 中塞入假数据 / 静态 fixture 掩盖 D9 缺口】**
   - 若对第一版未实现的占位能力（P4 集群硬件健康容量、P6 交互 shell 与预构建终端、P7 接入向导安装执行、P8 仪器事件、P9 GPU 小时计量）在后端伪造假数据通过 wire 返回，导致 D9-02 把本属 `U`（无来源）的缺口误判为 `A`（权威值），或让阶段 B 运行时继续读取 `LAB_SNAPSHOT`。
   - **依据 `(U)`：** **U1**、**U2**、**U23**（“最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”）。
3. **【否决红线 V-3：删改前端原型页面或破坏 18 个 `LabSnapshot` 视图契约基准】**
   - 若为了省写投影函数而删除前端现有页面、组件或砍掉 `client/contracts/lab-*.ts` 中的业务视图结构（除 D7-17 已定的放宽 ID 字面量、去除剧情硬编码与将 `AgentTemplate.harness` 收窄为 `'omp'` 外）。
   - **依据 `(U)`：** `01a18e1f #e818d410, #e3692177`（原型即业务层，App 层业务大体保留）、`01a192a2 #ed4570ad`、**U23**。
4. **【否决红线 V-4：恢复多 harness 枚举、混入 `omomp`/`fork`、或复用旧 Paseo 后端】**
   - 若在 wire 中保留 `'claude' | 'codex' | 'pi' | 'opencode'`、引入 `fork`/`fork_task`、或读取旧 Paseo `session-store` / `apps/hub`。
   - **依据 `(U)`：** **U13**（不能偏离以 omp 为核心）、**U24**（不要混淆 soroi 和 omomp，fork 根本不应存在）、`01a192a2 #cec515af`（现有的 ai 完全用不了）。
5. **【否决红线 V-5：把 `dry run` 或未启动草稿写进 `store`，或引入代码重放（replay）与跨运行直接消费 atom】**
   - 若 wire 将未启动草稿或 `dry run` 结果混作 `store` 的运行记录，或设计“重放旧脚本”命令，或允许跨运行直接引用 atom 名。
   - **依据 `(U)`：** `01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c`（dry run 绝不进 store）、`01a18efe #9e2d37a1`、`01a18e8a #21495b13`（从来没有重放）、`01a18e1f #63f31453`（禁止跨会话消费 atom）。
6. **【否决红线 V-6：违背四角色权限语义（如放开 `guest` 写权限或取消 `student` 启动实验审批门禁）】**
   - 若 wire 或命令权限设计允许只读 `guest` 执行写命令，或取消 `student` 启动实验与待批准自动化规则的审批状态流转。
   - **依据 `(U)`：** `01a18e1f #e818d410, #e3692177`、`01a192a2 #ed4570ad`（保留原型四角色与审批门禁设计）。
