# D7 Pepgent Lab 业务后端决策表 — Argon 意图裁决、逐行选票与否决审查

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-lab-backend.md`（`D7-01` 至 `D7-21`，共 21 条）
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **计票汇总：** **21 赞成 / 0 反对 / 0 否决**（全表 21 个条目全部通过意图审查并投赞成票）
- **专项审查结论：**
  1. **文末四个待裁点已逐项完成意图裁决**（严格区分有 `(U)` 原话支撑的 **`【定】`** 与属串联/技术细化的 **`【暂定】`**，均支持 leader 立场与 D7 正文方案）；
  2. **“第一版不实现集群健康（P4）与交互 shell（P6）、列入 D9 差距报告”专项核查：** **【定 · 不违反 U2“不要擅自收缩”与 U23“走通我说的所有流程”】**（详据见第一节第 3 点）；
  3. **U24 专项核查：** 全表无任何 `omomp` / `fork` 分身机制残留。

---

## 一、文末四个待裁点与意图行的意图裁决（依 D1-16 严格区分 `【定】` 与 `【暂定】`）

### 1. 待裁点 (1)：`D7-04`、`D7-06` 对 `D6-12` 的解读（讨论即根会话，实验在讨论会话里运行 vs 为每个实验另起无人对话的专属根会话）

- **意图面裁决：`【定 · 符合用户原意，确认用户从未要求“无人对话的实验专属根会话”】`**
  - **依据 `(U)` 原文：**
    1. **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/28767d47`（2026-10-31 02:32:46）：
       > “eval本身是soroi的另一个反面，不再需要外部的控制面，而是，给ai提供一个特殊的环境，并在其中直接写代码，而再提供自定义的包，就可以做agent调度，如果存在这种东西，那soroi设计的一整套preset定义，流转，没有任何意义”
    2. **(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/4986c617`（2026-10-31 07:08:25）：
       > “但是为什么我一开始想要eval，的核心，是模型可以不要一下子把所有东西全写了，而是一点一点写出来，所以有atom提醒，他完全可以一次只写一个值的消费”
    3. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`（2026-10-31 03:54:42）与 `#e3692177`（04:03:59）：
       > “全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了”
       > “大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”
    4. **(U)** `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`（2026-11-01，ask 结果 `multi_human`）：
       > 用户明确选择：`裁掉：一人一会话`
  - **裁决说明：**
    - **【定】** 转向后的核心是取消外层 preset 调度器，由与人对话的中心主 agent 在会话里根据未消费 atom 提醒一步步写 `soroi_eval` 推进实验；业务层每个讨论是一人一会话（`#ed4570ad`），在讨论中装载历史产物并启动实验（`#e3692177`）。用户从未要求为每次实验单独派生一个“无人对话的实验专属根会话”（那会退化回无对话上下文的外层作业启动器，且切断讨论与实验逐步求值的上下文）。因此，将 `D6-12` 的“根 session id”解读为“发起该实验的讨论根会话”（`D2-15`、`D7-04`、`D7-06`），一次实验对应讨论会话下的一次 `store` 运行（`RunId`），同一讨论可先后跑多次实验、同一时刻至多一个未结束运行（并行实验分开讨论，或在同一实验内用 `D5-07` 平铺调用/中心 worker 并发写步），完全符合用户原意。
    - **【暂定】** `ConversationOrigin` 的三分支（`Discussion | Panel | Automation`）及 `draft.launched` 与生命周期流 `run_started` 的绑定字段结构属串联与技术设计补充，无冲突 `(U)` 原话，予以支持。

---

### 2. 待裁点 (2)：旧 `_app` 表面是否加登录（leader 立场：不动，用户说过“先不动”，Lab 服务只监听本机/内网）

- **意图面裁决：`【定 · 裁定旧 _app 面保持原样不动（不加 Lab 登录拦截），支持 leader 立场与 D7-01、D7-21 正文】`**
  - **依据 `(U)` 原文：**
    1. **(U)** `session://01a19232-1c44-73ee-a77a-1ea7281a935e/entry/fa43ba92`（2026-11-01 00:36:56）：
       > “先不动，因为还有别的地方的改动，先把页面做完”
    2. **(U)** `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/cec515af`（2026-11-01，ask 结果 `legacy_surface` 与 `discussion_backing`）：
       > 对旧表面（workhub、模块页、会话协作、旧会话界面）选择：`先不动，等页面做完再议`
       > 对旧 AI 会话回答：`现有的ai应该完全用不了`
  - **裁决说明：**
    - **【定（意图面）】** 用户对旧 `_app` 表面的明确指令是“先不动，等页面做完再议”（`#fa43ba92`、`#cec515af`）。若在中间件里给旧 `_app` 路由、旧 server functions 及 `/api/host/*`、`/api/transcript/*` 加上 Better Auth 登录拦截，属于实质改动旧 `_app` 面的鉴权行为与现有测试契约，违背“先不动”的用户原意。因此裁定维持 `D7-01` 与 `D7-21` 正文写法：`/_lab` 文档、`lab.*` server function 和 `/api/lab/*` 走 Lab 认证（`D7-03`）与 `labRuntime()`；其余旧路由照旧走 `serverRuntime()` 与本机 loopback 令牌，旧 `_app` 面完全不动。不采纳文末注意事项中“让旧面也要求 Lab 登录”的建议。
    - **【技术/部署面（归 leader 取舍）】** 按 leader 立场及 `D2-07`、`D3-01`，Lab 服务只监听本机或独立内网（NetBird mesh），不暴露公网入口，故保持旧 `_app` 面不动不会引入公网未授权访问风险。

---

### 3. 待裁点 (3)：P4–P7 归属，以及“第一版不实现集群健康（P4）与交互 shell（P6）、列入 D9 差距”是否违反 U2“不要擅自收缩”与 U23“走通我说的所有流程”

- **意图面裁决：`【定 · 不违反 U2 与 U23，符合 U1、U2、U23 与 01a18e3a #09e1cc92；支持 leader 立场】`**
  - **依据 `(U)` 原文：**
    1. **(U) `LEDGER.md` U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`，2026-11-01 07:14:14）：
       > “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
    2. **(U) `LEDGER.md` U2**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`，2026-11-01 07:18:38）：
       > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
    3. **(U) `LEDGER.md` U23**：
       > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
    4. **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`（2026-10-31 04:15:49）、`#3afc3fb6`（05:01:28）、`#b45cd22c`（05:52:11）：
       > “远程运行时实际上我想兼顾三种后端，komodo对应docker，slum对应实验室常见的集群，然后是标准k8s控制面……在eval里要做成非常简单的调用，而不是当场决定非常麻烦的参数传递，对于容器或者pod模板是提前构建的。”
       > “remote实际上是单独的程序”、“这是pepgent的仓库，这是独立程序，单独去开私有仓库”
    5. **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92`（2026-10-31 04:53:33，否定早期 assistant 提出的 `open/exec/close` 远程交互 shell 方案）：
       > “首先，文件是需要走自动生成的volume，至于运行的时候怎么映射路径，那是运行时说了算，也就是构建容器模板的时候可以提前写好，运行时被覆盖，到时候创建临时的volume，然后全自动的把文件拷回来，只要能做到这个标准oci行为就不存在你说的文件怎么进出的问题，容器随便删，临时volume也能删。”
  - **专项核查：为何“第一版不实现集群健康（P4）与交互 shell（P6）、列入 D9 差距”不违反 U2 与 U23：**
    1. **对照 U23“走通我说的所有流程”：** 在 `pepgent-pm/evidence/argon/flow-catalog.md`（F01–F32）核定的全部 32 条用户流程中，远程与算力流程为 F14–F18（Komodo 与 Slurm 远程运行 `Program`、远程运行 `Agent`、`status/tail` 状态与日志尾部观察、运行中批次/产物进度只读可见、`abort` 远程中止、结束后浏览完整 Runner Workspace）及 F31（从讨论装载产物、启动实验、调用 soroi 作为 agent 核心跑通全链路）。这些流程由 `D7-08`、`D7-09`、`D7-12`、`D7-13` 与 `D2`–`D6` **100% 完整覆盖，无任何一条被裁减**。相反，用户在历史会话中从未要求做“集群节点/CPU/GPU 实时健康监控面板（P4）”或“Web 交互式容器终端 shell（P6）”，且在 `01a18e3a #09e1cc92` 明确否定了基于远程交互 shell 的执行模型。
    2. **对照 U1 与 U23“最后能在这个基础上知道 pepgent 和 soroi 之间缺失的点，线，面”：** 用户在 **U1** 明确指出“目前 soroi 的设计对于完整的 pepgent 是不够的……离真正的 pepgent 还很远”，并在 **U23** 明确要求在跑通所有流程与核心调用的基础上，产出一份识别 **“pepgent 和 soroi 之间缺失的点，线，面”** 的差距报告（即 `flow-catalog.md` F32 / D9）。原型集群页上的硬件健康容量监控（P4）、容器交互 shell 与预构建检查终端（P6）、在线安装集群控制器的执行器（P7）正是完整 Pepgent 平台基础设施相对于 soroi 核心 + `remote` 单次作业生命周期之间客观存在的“缺失的点、线、面”（见 `flow-catalog.md` F32 第 516 行）。把它们在 D7 中标为占位、第一版不实现并归入 D9 差距报告，**正是严格执行 U1 与 U23 的分步设计，而非违反 U2 的“擅自收缩”**（U2 的不收缩是指走完“设计 → 补充 → 开仓 → 实现 → e2e 测试”全链条并跑通 F01–F32，且符合 `.claude/rules/design-assumes-it-works.md` 的设计阶段占位规则）。
  - **P4–P7 归属裁决：**
    - **【定】** 模板目录与作业生命周期的唯一权威是独立组件 `Pepgent/remote`（**U1**、`01a18e3a #3afc3fb6, #c5030836`），主机与网络基础设施归 `Pepgent/iac`（`D2-07`、`D2-21`），Lab 后端绝不另建第二套集群表或另存后端凭据。
    - **【暂定（支持 leader 立场）】** P3（模板展示元数据）与 P5（按后端列出作业）归 `Pepgent/remote` 模板目录与作业接口；P7（接入向导执行方）的主机与控制器安装归 `Pepgent/iac`、新后端模板目录登记归 `Pepgent/remote`；P4（集群健康与容量）与 P6（交互 shell 与预构建终端）归 `Pepgent/remote` / `Pepgent/iac` 远期范围，第一版不实现，列入 D9 差距报告。

---

### 4. 待裁点 (4)：`AgentTemplate.harness` 与 U13 冲突（leader 立场：改为 omp agent 定义名）

- **意图面裁决：`【定 · 原型 harness 四枚举与 U13 直接冲突，裁定移除多 harness 枚举并支持改为 omp agent 定义名】`**
  - **依据 `(U)` 原文：**
    1. **(U) `LEDGER.md` U13**：
       > “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
    2. **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/5ddb4d88`（2026-10-31 02:31:00）：
       > “而，新时代的harness就是你正在跑的omp”
    3. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a`（2026-10-31 04:39:09）：
       > “pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理，而soroi的工作流程肉眼可见的可能会唤醒一个早就死掉的session”
    4. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`（2026-10-31 04:12:48）：
       > “首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起”
  - **裁决说明：**
    - **【定】** `pepgent/apps/web/src/client/contracts/lab-compute.ts:196` 中的 `harness: 'claude' | 'codex' | 'pi' | 'opencode'` 是转向前多 harness 设想的原型残留，直接违反 **U13**（“对于核心的ai harness，不能偏离以omp为核心”）、`01a18dd4 #5ddb4d88`（“新时代的harness就是你正在跑的omp”）、`01a18e1f #678fe41a`（明确排除无状态的 `pi`）与 `01a18e1f #9c291fe2`（子 agent 运行必须对标主 agent 的 omp 定制）。在 Pepgent 与 soroi 中，AI harness 唯一且固定为 `omp`（模型选择由 `models` 列表及 `D7-15` 的 `get_available_models` / `set_model` 承载，不切换 harness）。
    - **【暂定（支持 leader 立场与 D7-11、D7-17）】** 将 `AgentTemplate` 对应到 Lab 库 `.omp/agents/` 下的 omp agent 定义（与 `D2-12`、`D5-17` 一致），并把 `AgentTemplate.harness` 在阶段 B 改为 omp agent 定义名。

---

### 5. 表中其余意图行的意图裁决（`D7-09`、`D7-20`、`D7-21`）

- **`D7-09`（人类写入：三种介入与中止，分类：意图 + 串联）：`【定 · 符合用户原意】`**
  - 改值先经控制端点中止在途调用再由 `Human` 交回结束槽位、自动触发同一步下游消费并通知 AI；改参数或函数体先 commit 新函数体再发 `derive` 派生新的正式运行（不重放旧脚本）；接管 agent 走带人类来源 `human:<principal>` 的 IRC 待投递表（投递前可 `edit`/`withdraw`，空闲或步边界投递入 transcript）。严格符合 **(U)** `01a18e1f #ba5ad307, #d1baf561, #a0d22b8a, #7bfe3696` 及反重放 **(U)** `01a18efe #9e2d37a1`、`01a18e8a #21495b13`。
- **`D7-20`（soroi 与 Pepgent 的依赖方向，分类：意图）：`【定 · 符合用户原意】`**
  - soroi 对 Pepgent 零感知，Pepgent 只经 store HTTP、Mux（写方/读方/控制端点）、RPC host tools 与 Lab 库 `.omp/` 四条线调用 soroi；拿掉 Pepgent 后 soroi 定制加 store 与 Mux 仍可独立走通全部 soroi 流程，D9 差距报告以第 3 节 18 个 `LabSnapshot` 顶层字段为对照表。严格符合 **(U) `LEDGER.md` U1、U23、U24**。
- **`D7-21`（不复用旧 Paseo 后端，分类：意图）：`【定 · 符合用户原意】`**
  - Lab 区不 import `server/paseo/**`、`hub-client`、`session-store`、`serverRuntime()`，`apps/hub` 不承担任何 Lab 职责，旧 `_app` 面保持不动。严格符合 **(U)** `01a19232 #fa43ba92` 与 `01a192a2 #cec515af`。

---

## 二、对全部 21 个条目的逐行选票（D7-01 至 D7-21）

| ID | what | 起草分类 | 缺失/补充? | Argon 意图判定 | Argon 投票 | 裁决 / 投票理由（附 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- |
| **D7-01** | Lab 后端的进程归属（`apps/web` 同进程隔离区） | 技术 | 是 | 【定】业务归 `Pepgent/Pepgent`，旧 Paseo 与 `_app` 不动（**(U)** U1、`01a19232 #fa43ba92`、`01a192a2 #cec515af`）；【暂定】同进程双 runtime 分流 | **赞成** | 在 `apps/web` 内新增 `server/lab`、`rpc/lab.ts`、`/api/lab/*`、`protocol/lab` 四个隔离区，通过 `app/start.ts` 按面分流，既沿用 `OperationResult` 约定（`D2-14`），又彻底隔离旧 Paseo runtime 且不改动旧 `_app` 面（`D2-19`）。 |
| **D7-02** | Lab 自有状态的持久化（`lab.sqlite` + Drizzle） | 技术 | 否 | 【定】允许成熟开源方案（**(U)** U13），运行状态归 store、transcript 归 omp（**(U)** `01a18e1f #64246eaf, #678fe41a`） | **赞成** | 单写方使用公有领域 SQLite + MIT `better-sqlite3` + Apache-2.0 Drizzle ORM，只存 Lab 自有业务事实与以 `RunId` 为键的展示扩展，不复制 store 运行状态、omp transcript、remote 模板或 Komodo 构建记录，严守单一权威源头。 |
| **D7-03** | 认证与成员（内嵌 Better Auth + organization 插件） | 技术 | 是 | 【定】允许成熟开源方案（**(U)** U13），作废业务仓旧 Keycloak 设计（**(U)** `01a192a2 #ed4570ad`） | **赞成** | 用 MIT 协议的 Better Auth `organization / member / invitation` 及 access control 直接映射 Lab、成员角色（`owner \| researcher \| student \| guest`）与三项权限（`startWithoutApproval`、`buildImages`、`manageMembers`），并将当前用户 ID 作为 Mux `principal`（`D3-12`）与 `HumanHandback.by`（`D5 §3.6`），闭合 `D2-17`。 |
| **D7-04** | 根会话模型：Lab 会话（`conversation`） | 串联 | 是 | **【定 · 符合原意】** 讨论一人一会话、以 omp 为核心、作为 Pepgent 的 agent 核心（**(U)** U13、U23、U24、`01a192a2 #ed4570ad`） | **赞成** | 统一以装着完整 soroi 定制的 `omp --mode rpc`（`SOROI_ROLE=Main`）作为唯一根会话，用 `ConversationOrigin`（`Discussion \| Panel \| Automation`）区分业务来源，Lab 后端作为写方经 `omp-rpc-mux dial` 启动并管理跨代停驻/唤醒（`D3-07`、`D3-10`）。 |
| **D7-05** | Pepgent 业务工具：写方注册的 RPC host tools | 串联 | 是 | 【定】soroi 不反向依赖 Pepgent 业务，以 omp 为核心（**(U)** U1、U13、U23） | **赞成** | 由作为写方的 Lab 后端在每一代 `ready` 后经 `set_host_tools` 注册 6 个 `lab_*` 业务工具，使讨论草稿、结论、产物装载/保存、报告发布与变更建议全部留在 `Pepgent/Pepgent`，保持 soroi 对业务零感知。 |
| **D7-06** | 实验的身份与状态（1:1 对应 store 运行，草稿启动走讨论会话） | 串联 | 是 | **【定 · 待裁点(1)确认】** 草稿不进 store（**(U)** `01a18e1f #32b6f7fd, #7ffcea0c`），实验在讨论会话中由 AI 逐步写 `eval` 推进（**(U)** `01a18dd4 #28767d47`、`01a18ed5 #4986c617`） | **赞成** | 一次实验即一次 store 运行（1:1），`experiment_ext` 只存编号 `R-0xx`、名称、项目、来源草稿等展示属性，实验状态在读取时从草稿、store `RunGraph` 与 eval 控制端点槽位实时投影而不落盘，把 `D6-12` 读作发起实验的讨论会话，与 `D2-15`、`D6-05` 完全闭合。 |
| **D7-07** | 讨论（消息直读 omp transcript，装载产物与讨论上传进 store 对象区） | 串联 | 是 | 【定】一人一会话（**(U)** `01a192a2 #ed4570ad`），唤醒/只读历史归 omp（**(U)** `01a18e1f #678fe41a`），保留原型讨论装载产物业务流（**(U)** `01a18e1f #e3692177`，F09、F31） | **赞成** | 对话消息只以 omp transcript 为唯一源（在线走 Mux 读方，停驻直接读 `.jsonl` 文件不唤醒，`D3-11`、`D6-19`）；装载产物在下一条 prompt 前附清单由 AI 调 `lab_open_artifact` 读取；讨论上传产物字节进 store 对象目录以便后续直接作为运行输入。 |
| **D7-08** | 运行的读取与订阅（GUI 读方门面） | 串联 | 是 | 【定】GUI 直读 store 免 DSL、RPC 只读多路复用可见任意 agent、运行中进度只读可见（**(U)** `01a18e1f #64246eaf, #2dbf970b, #bfd6975c`，F26） | **赞成** | Lab 后端作为前端唯一门面（`D2-18`），组合 store 已提交事实（`graph`/`stream`/`compare`/`search`/`usage`）、eval 控制端点在途叠加层（`writers(runId)` → `slots`，`D3-19`、`D6-11`）与 Mux 读方流及 `/agents/{id}/files`，经 `/api/lab/events` 与 `/api/lab/agents/{id}/stream` 推给浏览器。 |
| **D7-09** | 人类写入：三种介入与中止 | 意图 + 串联 | 是 | **【定 · 符合原意】** 改值取消在途程序并由人类接入产出新 atom 通知 AI、改参数/函数体派生正式运行（无重放）、接管走可编辑排队 IRC（**(U)** `01a18e1f #ba5ad307, #d1baf561, #a0d22b8a, #7bfe3696`、`01a18efe #9e2d37a1`） | **赞成** | 将改值（`takeover`）、主动 `human()` 交回（`answer`）、改参数/函数体（先 commit 库再 `derive`）、接管根/子 agent（`human_irc_queue` / `mux_human_irc*`）与中止运行（`abort`）全部路由给各自权威拥有方并等待结论，Lab 自身不写任何运行记录，与 `D2-06`、`D3-12`、`D5-14..16`、`D6-14..19` 严丝合缝。 |
| **D7-10** | 自动化（订阅 store `/stream/lifecycle` + `croner` + 审批门禁） | 技术 | 是 | 【定】保留原型运行事件驱动自动化与审批门禁（**(U)** `01a18e1f #e3692177`，`layers.md:67-69`，F30），允许成熟 MIT 库（**(U)** U13） | **赞成** | store 只经 `/stream/lifecycle` 发布运行起止事实，Lab 进程内引擎匹配规则、处理 `startWithoutApproval` 审批门禁并启动 `Automation` 会话写回讨论或报告，职责边界清晰。 |
| **D7-11** | 节点库与智能体模板的读写 | 串联 | 是 | 【定】节点为普通 TS 文件、持久化供后续 import、对标主 agent 定制（**(U)** `01a18e1f #47b71e05, #9c291fe2`、`01a18e8a #50f5cf06`，F28、F29） | **赞成** | 当前定义只认 Lab 库 git 仓库（`D2-12`），版本身份取 bundle 哈希、显示用 commit 序号（`D6-21`），影响校验合并 store `/usage` 与 Lab 草稿引用，智能体模板直接对应 `.omp/agents/` 定义（`D5-17`）。 |
| **D7-12** | 集群页与接入向导落到 `remote` 与 `Pepgent/iac`（含 P4–P7） | 串联 | 是 | **【定 · 待裁点(3)确认】** `remote` 独立管理模板目录与作业生命周期（**(U)** U1、`01a18e3a #c5030836, #09e1cc92, #3afc3fb6`），P4/P6 列入 D9 差距不违背 U2、U23 | **赞成** | 集群与作业直接映射 `remote` 后端端点与作业操作（叠加 Mux 在线列表），不在 Lab 另建集群表；P5 归 `remote`、P7 主机安装归 `Pepgent/iac` + 目录登记归 `remote`，P4（集群健康）与 P6（交互 shell）在第一版标为占位并列入 D9 差距报告（F32）。 |
| **D7-13** | 容器（镜像）页落到 `Pepgent/images`、Komodo Build 与 `remote` 模板 | 串联 | 是 | 【定】容器模板提前构建、复用成熟开源方案（**(U)** `01a18e3a #c5030836`、U13、`01a18e1f #e3692177`） | **赞成** | 镜像定义归 `Pepgent/images`、构建归 Komodo Core `RunBuild`、产物元数据读 Distribution v2 API、资源与绑定写 `remote` 模板（`D2-09`、`D2-13`），各归唯一权威源。 |
| **D7-14** | 设置页的其余部分（项目、代码库部署密钥、未分配建议、资源计量 P9） | 技术 | 是 | 【定】保留原型业务面（**(U)** `01a18e1f #e3692177`）并遵守凭据由使用方生成持有规则 | **赞成** | 项目归 Lab 表，代码库部署密钥由 Lab 生成保存在卷内、UI 只展示公钥并支持轮换（严守凭据规则），未分配建议由右栏会话经 `lab_propose_changes` 给出。 |
| **D7-15** | AI 模型目录与选择（omp `get_available_models` / `set_model`） | 技术 | 否 | 【定】以 omp 为核心（**(U)** U13） | **赞成** | 模型目录直接取自 omp RPC `get_available_models`，切换调 `set_model`，不在 Lab 硬编码模型列表。 |
| **D7-16** | 前端接缝，阶段 A：只改异步加载时机，不改数据形状与 feature 代码 | 实现 | 否 | 【定】不打断正在进行的 `_lab` 前端间距整改工作（**(U)** U1、`01a192a2 #9f1a314e`） | **赞成** | 只把 `LabBridge.readSnapshot()` 改为异步并在 `_lab.tsx` 路由 `loader` 中等待，13 个 feature controller 零改动，可与前端 UI 整改无冲突并行落地。 |
| **D7-17** | 前端接缝，阶段 B：线上传权威方原样形状，客户端纯函数投影为现有视图类型 | 实现 + 串联 | 是 | **【定 · 待裁点(4)确认】** 替换静态 fixture 跑通端到端（**(U)** U1、U2、U23），修正 `AgentTemplate.harness` 符合 U13 | **赞成** | 线协议只传 store / Mux / remote / Lab 权威数据，由客户端纯函数投影为现有 `*Fixture` 类型（免重写 13 页 view model），放宽字面量 ID、去除剧情硬编码与固定回复，并将 `AgentTemplate.harness` 改为 omp agent 定义名（落实待裁点 4）。 |
| **D7-18** | Lab 后端的对外接口（`lab.catalog.read`、`lab.page.read`、`lab.command` + SSE + 对象代理） | 技术 | 否 | 【暂定】技术接口收敛，无冲突 `(U)` 原话 | **赞成** | 收敛为目录读取、按页读取、穷尽类型检查的 `LabCommand` 联合以及事件/agent SSE 与对象字节代理，契约集中且符合仓库既有 Zod + `OperationResult` 规范。 |
| **D7-19** | 部署形态与配置（中心主机 Lab 容器，Komodo Stack 声明于 `Pepgent/deploy`） | 实现 | 是 | 【定】中心主机运行 eval、定制从统一发行 tar 安装（**(U)** U23、U24、`01a18e1f #5a37a640, #9c291fe2`） | **赞成** | 根会话与写方（Lab 后端）同在中心主机 Lab 容器内，基于 `omp-agent` 镜像并在启动时安装 soroi 发行 tar，使 Lab 后端可直接在容器内执行 `omp-rpc-mux dial`（对齐 `D2-20`、`D2-23`、`D2-25`）。 |
| **D7-20** | soroi 与 Pepgent 的依赖方向（U23） | 意图 | 否 | **【定 · 符合原意】** 落实 **(U) `LEDGER.md` U1、U23、U24** | **赞成** | 明确 soroi 不认识 Pepgent、Pepgent 只经四条线调用 soroi，脱离 Pepgent 仍能走通全部 soroi 流程，并以第 3 节 18 个 `LabSnapshot` 字段作为 D9“点、线、面”差距盘点对照表。 |
| **D7-21** | 不复用旧 Paseo 后端，旧 `_app` 面保持不动 | 意图 | 否 | **【定 · 符合原意（待裁点 2）】** 落实 **(U)** `01a19232 #fa43ba92` 与 `01a192a2 #cec515af` | **赞成** | 彻底隔离旧 `server/paseo/**`、`hub-client`、`session-store`、`serverRuntime()` 与 `apps/hub`，且旧 `_app` 面保持原样不动。 |

> **非阻塞实施对齐备注（不影响本轮全部赞成票）：**
> `D2-components.md` 在第 3 轮修订中已将 `D2-12`、`D2-15`、`D2-20`、`D2-25` 细化为：Lab 容器同时挂载可重建的“中心检出缓存卷”（写方为 Lab 后端，只做快进）与持久的“会话 worktree 卷”（每个根会话启动前由 Lab 后端创建一个独立 git clone 作为该根会话 `omp` 进程的 `cwd`，承载未合入的会话节点草稿）。`D7-04`（第 64 行）、`D7-11`（第 71 行）、`D7-19`（第 79 行）及第 199–201、229 行已显式引用 `（D2-12）` / `（D2-20）`，后续同步文档与实现时按 `D2-12` / `D2-20` 第 3 轮定稿文本展开即可。

---

## 三、一票否决审查（对“缺失部分或设计补充”条目的审查）

- **否决结论：0 项否决（无否决）。**
- **审查说明：** 依 U11 与 U20（D1-16），对表中全部 14 个标为“缺失部分或设计补充 = 是”的条目（`D7-01`、`D7-03`–`D7-14`、`D7-17`、`D7-19`）逐项核对 `LEDGER.md`（U1–U26）及 `pepgent-pm/evidence/argon/pivot-baseline.md`、`rulings-C.md`、`flow-catalog.md` 中的全部 `(U)` 用户原话证据，均无违背用户原意或擅自收缩范围之处，不行使一票否决权。
