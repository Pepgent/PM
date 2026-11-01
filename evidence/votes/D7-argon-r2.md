# D7 Pepgent Lab 业务后端决策表 — Argon 第 2 轮选票（修订行重投确认与专项意图裁决）

- **决策文档：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-lab-backend.md`（第 2 轮修订版）
- **反例回应表：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-r1-responses.md`
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **重投范围：** 本轮修订的全部 **16 个条目**（`D7-02`、`D7-03`、`D7-04`、`D7-05`、`D7-06`、`D7-07`、`D7-09`、`D7-10`、`D7-11`、`D7-12`、`D7-13`、`D7-14`、`D7-15`、`D7-17`、`D7-18`、`D7-19`）；未改动的 **5 个条目**（`D7-01`、`D7-08`、`D7-16`、`D7-20`、`D7-21`）维持第 1 轮赞成票（见 `votes/D7-argon.md`）。
- **本轮计票结果：**
  - **16 条修订行：16 赞成 / 0 反对 / 0 否决**
  - **全表 21 行总计：21 赞成 / 0 反对 / 0 否决**

---

## 一、专项意图裁决（依 D1-16 严格区分有 `(U)` 原文支撑的 `【定】` 与属技术/串联细化的 `【暂定】`）

### (a) `D7-11` / `D7-17`：将 `AgentTemplate.harness` 收窄为字面量 `'omp'`，并以 omp agent 定义名作为 `AgentTemplate.id`

- **意图面裁决：`【定 · 符合用户原意（移除原型 claude | codex | pi | opencode 四枚举、固定 AI harness 为 omp、模板即 .omp/agents/ 定义）】` + `【暂定 · 支持 id = 定义名、harness = 'omp' 的字段映射】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U13**：
     > “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  2. **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/5ddb4d88`（2026-10-31 02:31:00）：
     > “而，新时代的harness就是你正在跑的omp”
  3. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a`（2026-10-31 04:39:09）：
     > “pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理，而soroi的工作流程肉眼可见的可能会唤醒一个早就死掉的session”
  4. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`（2026-10-31 04:12:48）：
     > “首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起”
  5. **(U) `LEDGER.md` U15、U23**：允许在项目级 `.omp/agents/` 做 agent 定义定制，soroi MVP 是一套完整的 omp 定制并作为 Pepgent 的 agent 核心。
- **裁决说明：**
  - **【定（意图核心）】** 原型 `pepgent/apps/web/src/client/contracts/lab-compute.ts:196` 中的 `harness: 'claude' | 'codex' | 'pi' | 'opencode'` 是转向前多 harness 设想的残留，直接冲突 **U13**（核心 AI harness 不能偏离以 omp 为核心）、`01a18dd4 #5ddb4d88`（新时代的 harness 就是 omp）、`01a18e1f #678fe41a`（明确排除无状态的 `pi`）与 `01a18e1f #9c291fe2`（子 agent 运行必须对标主 agent 的 omp 定制）。在 Pepgent 与 soroi 中，AI harness 唯一且固定为 `'omp'`，而智能体模板（`AgentTemplate`）在业务上就是 Lab 库 `.omp/agents/` 下的 omp agent 定义（与已通过的 `D2-12`、`D5-17` 一致）。
  - **【暂定（字段映射细化）】** 第 2 轮修订采纳 `task:high` 第 1 点建议，把“模板 = omp agent 定义”的身份落到 `AgentTemplate.id`（即 `.omp/agents/<name>.md` 的定义名），并将 `AgentTemplate.harness` 收窄为字面量 `'omp'`（`harnessVersion` 取容器内 omp 版本），避免把 `harness` 也填成定义名而形成与 `id` 重复的第二份拷贝（以及 `agentTemplate.duplicate` 时的指向歧义）。该字段映射比第 1 轮写法更忠实地表达了“harness 恒为 `'omp'`（**【定】**）、模板身份即 omp agent 定义名”的语义，无任何冲突 `(U)` 原话，予以确认并支持。

---

### (b) `D7-12`（连同 `D7-13`、`D7-18`、占位表 P4–P7）：将集群健康（P4）、作业列表及依赖它的 `restart`/`destroy`/`new_sandbox`/`liveContainers`（P5）、交互 shell 与预构建检查终端（P6）、接入向导执行方（P7）移出第一版并列入 D9 差距清单（对照 U2“不要擅自收缩”与 U23“走通我说的所有流程、知道缺失的点线面”）

- **意图面裁决：`【定 · 不违反 U2 与 U23，符合 U1、U2、U23 与 01a18e3a #09e1cc92, #c5030836, #3afc3fb6】` + `【暂定 · 支持第一版不暴露无执行方命令、不在 Lab 自建第二份作业表】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`，2026-11-01 07:14:14）：
     > “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
  2. **(U) `LEDGER.md` U2**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`，2026-11-01 07:18:38）：
     > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
  3. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
  4. **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`（2026-10-31 04:15:49）、`#09e1cc92`（04:53:33）、`#3afc3fb6`（05:01:28）：
     > “在eval里要做成非常简单的调用，而不是当场决定非常麻烦的参数传递，对于容器或者pod模板是提前构建的。”
     > “到时候创建临时的volume，然后全自动的把文件拷回来，只要能做到这个标准oci行为就不存在你说的文件怎么进出的问题，容器随便删，临时volume也能删。”
     > “remote实际上是单独的程序”
  5. **(U)** `session://01a18efe-a680-7642-aff1-6f468cf2935e/entry/9e2d37a1`（2026-10-31 07:58:00）：
     > “没有重放，这是意淫的东西”
- **裁决说明：**
  1. **【定 · 对照 U23“走通我说的所有流程”：F01–F32 无任何一条流程被裁减】**
     在 `pepgent-pm/evidence/argon/flow-catalog.md` 核定的全部 32 条用户流程（F01–F32）中，涉及远程与算力的流程为 F14–F18（Komodo 与 Slurm 远程运行 `Program`、远程运行 `Agent`、`remote status <run>` 与 `remote tail <run>` 状态和日志尾部观察、运行中批次/产物进度只读可见、`abort` 远程中止、结束后浏览完整 Runner Workspace）以及 F31 步骤 3–4（实验运行期间前端通过 Lab 后端订阅 `store`、中心化 RPC Mux 与 `remote status/tail` 观察进展）。在修订后的 `D7-08`、`D7-09`、`D7-12`、`D7-13` 中，集群页按后端归组展示 `remote templates`（含 P3 模板元数据），并通过 Mux 在线列表（`D3-15`）定位正在运行的远程 agent 容器及其作业 `run_id`，对该 `run_id` 直接调用 `remote status`、`remote tail`；实验中止走 `D7-09` 的 `run.abort` → `remote abort`。**F01–F32 的全部主路径 100% 完整走通。**
  2. **【定 · 对照 U1 与 U23“知道 pepgent 和 soroi 之间缺失的点、线、面”与 U2“不要擅自收缩”】**
     用户从未在会话中把“集群硬件健康/容量面板（P4）”、“跨后端枚举全部独立作业并从集群页手动 `restart`/`destroy`/`new_sandbox`（P5）”、“Web 交互式容器 shell 与预构建终端（P6）”或“页面一键安装集群控制器（P7）”定义为 soroi 的流程；相反，用户在 `01a18e3a #09e1cc92` 明确规定远程容器与临时 volume 是随单次 `eval` 调用自动创建、拷回后即删的瞬态载体（并否定了远程交互 shell 模型），且已通过的 `D2-09` 已裁定 `Pepgent/remote`“范围不变（不加集群控制面、健康检查、交互 shell）”。更关键的是，用户在 **U1** 指出“soroi 本身相当于只是 omp 的扩展组件，离真正的 pepgent 还很远”，并在 **U23** 明确要求在跑通全部流程并把 soroi 作为 Pepgent 的 agent 核心之后，识别出 **“pepgent 和 soroi 之间缺失的点，线，面”**（即 F32 / D9）。P4–P7 正是完整 Pepgent 算力运维面相对于 soroi 核心 + `remote` 单次作业执行器之间客观存在的“缺失的面”（见 `flow-catalog.md:516`）。将其在第一版诚实标为未实现并归入 D9 差距清单，**是严格执行 U1 与 U23 的分步规划，绝非违反 U2 的“擅自收缩”**。
  3. **【暂定 · 支持 D7-12 与 D7-18 的处理方式】**
     第一版不在 Lab 后端自建第二份“启动过的作业表”来填补 P5（否则违反单一权威源头规则），也不把无真实执行方的 `cluster.connect`、`sandbox.create`、`job.restart`、`job.destroy`、shell 与预构建检查放进第一版 `LabCommand`（消除第 1 轮把 `restart` 错误映射成 `abort` 及暴露空命令的反例），界面对应按钮不可用并统一记入 D9。

---

### (c) 其余修订行的意图面复核结论

- **`D7-03`（旧 `_app` 面保持不动，Lab 服务只监听本机或内网）：`【定 · 符合原意】`**
  撤回第 1 轮草稿文末“给旧 `_app` 面加 Lab 登录”的建议，保持旧 `_app` 面完全不动，符合 **(U)** `01a19232 #fa43ba92`（“先不动，因为还有别的地方的改动，先把页面做完”）与 `01a192a2 #cec515af`（“先不动，等页面做完再议”）。
- **`D7-04`、`D7-06`（讨论即根会话，每会话独立编写 worktree，`pending_launch` 单槽绑定）：`【定 · 符合原意】` + `【暂定 · 技术细化】`**
  讨论即根会话、实验在讨论会话内由 AI 逐步写 `soroi_eval` 推进符合 **(U)** `01a18dd4 #28767d47`、`01a18ed5 #4986c617`、`01a192a2 #ed4570ad`；为每个根会话克隆独立编写 worktree 作为 `cwd` 并注入 `MUX_GENERATION`/`MUX_TOKEN` 对齐已通过的 `D2-12`、`D2-15`、`D2-20`、`D3-19`。
- **`D7-05`、`D7-07`（讨论产物在正式运行提交前留在会话 worktree，随正式运行步提交进 store）：`【定 · 符合原意】` + `【暂定 · 串联细化】`**
  未正式运行的字节不直接 `PUT` 进 store 对象目录，只有作为 `soroi_eval` 正式运行的根 `File` 输入随步提交才进入 store，符合 **(U)** `01a18e1f #32b6f7fd, #7ffcea0c`（未正式运行不写 store）与 `D6-07`。
- **`D7-09`（人类写入：三种介入与中止，`at = Committed | InFlight`）：`【定 · 符合原意】`**
  支持对已提交调用（`Committed{step, position}`）与正在运行调用（`InFlight{writerSession, slot}`）发起派生，改函数体时先经 `library.merge` 合入默认分支并快进持有会话的 worktree，完全符合 **(U)** `01a18e1f #ba5ad307, #d1baf561, #a0d22b8a, #7bfe3696` 与反重放 **(U)** `01a18efe #9e2d37a1`。

---

## 二、16 个修订条目的逐条重投表（附未改 5 条复核）

| ID | what | 起草分类 | 缺失/补充? | Argon 意图判定 | 第 2 轮投票 | 裁决与投票理由（核对本轮修订与 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- |
| **D7-02** | Lab 自有状态的持久化（`lab.sqlite` + Drizzle） | 技术 | 否 | 【定】允许成熟开源方案（**(U)** U13），运行状态归 store、transcript 归 omp（**(U)** `01a18e1f #64246eaf, #678fe41a`）；【暂定】表结构与动态流投影 | **赞成** | `conversation` 增加 `worktree` 路径（对齐 D7-04）；`activity` 只记 Lab 自产事件，首页动态中运行的开始与结束在读取时从 store 生命周期流（D6-06）投影，消除了运行起止的双写副本；新增 `pending_launch`、`deploy_key` 表。 |
| **D7-03** | 认证与成员（Better Auth + 四项权限 + 本机/内网监听） | 技术 | 是 | **【定】** 允许成熟开源方案（**(U)** U13）、作废旧 Keycloak（**(U)** `01a192a2 #ed4570ad`）、旧 `_app` 面不动（**(U)** `01a19232 #fa43ba92`）；【暂定】四权限与帧字段 | **赞成** | 新增独立 `approve` 权限（对应原型 `MemberSettings.canApprove`），与 `startWithoutApproval` 解耦；当前用户 id 作为 `mux_human_irc*` 帧的 `principal` 字段由受信 reader 连接发出（对齐 D3-12）；写明只监听本机或内网，旧 `_app` 面保持不动。 |
| **D7-04** | 根会话模型：Lab 会话（`conversation`）与会话 worktree | 串联 | 是 | **【定 · 符合原意】** 讨论一人一会话、以 omp 为核心、作为 Pepgent 的 agent 核心（**(U)** U13、U23、U24、`01a192a2 #ed4570ad`）；【暂定】worktree 与 env 配方 | **赞成** | 每个 Lab 会话首次启动前在会话 worktree 卷上克隆独立 clone 作为所有代的 `cwd`，每一代启动前快进合并默认分支并保留未合入改动（对齐 D2-12/15/20）；dial 的 env 显式传入 `MUX_GENERATION`、`MUX_TOKEN` 等供 eval 模块注册控制端点（对齐 D3-19）。 |
| **D7-05** | Pepgent 业务工具：写方注册的 RPC host tools | 串联 | 是 | 【定】soroi 不反向依赖 Pepgent（**(U)** U1、U13、U23），未提交字节不进 store（**(U)** `01a18e1f #32b6f7fd`）；【暂定】worktree 内保留讨论产物 | **赞成** | `lab_save_artifact` 只登记 `artifact_meta{conversation, path, role}`，字节留在本会话 worktree；`lab_open_artifact` 将产物放入本会话 worktree 的 `inputs/`，去掉了定稿 D6 中不存在的 `PUT /objects/{sha}`。 |
| **D7-06** | 实验的身份与状态（1:1 对应 store 运行 + `pending_launch`） | 串联 | 是 | **【定 · 符合原意】** 草稿不进 store（**(U)** `01a18e1f #32b6f7fd, #7ffcea0c`），实验在讨论会话中由 AI 逐步写 `eval` 推进（**(U)** `01a18dd4 #28767d47`）；【暂定】`pending_launch` 绑定 | **赞成** | `experiment.start` 建每会话至多一条的 `pending_launch`，下一次不带 `derivedFrom` 的 `run_started` 唯一绑定它并写入 `experiment_ext.draft` 后删除，解决了同一讨论先后启动草稿 A、B 的绑定歧义；补齐 Panel/Automation 与派生运行的命名规则。 |
| **D7-07** | 讨论（transcript 单源 + 讨论产物以会话 worktree 为权威） | 串联 | 是 | 【定】一人一会话（**(U)** `01a192a2 #ed4570ad`）、保留装载产物启动实验流（**(U)** `01a18e1f #e3692177`，F09、F31）、未正式提交不进 store（**(U)** `#32b6f7fd`） | **赞成** | 讨论产物在正式运行提交前以会话 worktree 为唯一权威，经 `/api/lab/artifacts/{id}` 读取，`.gitignore` 排除 `artifacts/`、`uploads/`、`inputs/`；作为 `soroi_eval` 根 `File` 输入正式运行时按 D6-07 随步提交进入 store 对象目录。 |
| **D7-09** | 人类写入：三种介入与中止 | 意图 + 串联 | 是 | **【定 · 符合原意】** 改值取消在途程序交回、改在途或已提交参数/函数体派生新运行（无重放）、接管走可编辑排队 IRC（**(U)** `01a18e1f #ba5ad307, #d1baf561, #a0d22b8a, #7bfe3696`、`01a18efe #9e2d37a1`） | **赞成** | 持有会话取自 store 运行记录的根 session（D6-05），`derive` 与 `abort` 发往根端点（并同步补入 D5 `RootEvalControl`）；`at` 为 `Committed{step, position} \| InFlight{writerSession, slot}`（对齐 D6-16）；改函数体先经 `library.merge` 合入再快进持有会话 worktree。 |
| **D7-10** | 自动化（订阅 store `/stream/lifecycle` + `approve` 权限） | 技术 | 是 | 【定】保留运行事件驱动自动化与审批门禁（**(U)** `01a18e1f #e3692177`，`layers.md:67-69`，F30）；【暂定】独立 `approve` 权限 | **赞成** | 审批门禁改用 D7-03 的独立 `approve` 权限，不再借用“启动实验免审批”的 `startWithoutApproval`。 |
| **D7-11** | 节点库与智能体模板的读写（`library.merge` + `harness: 'omp'`） | 串联 | 是 | **【定 · 专项裁决(a)确认】** 节点为普通 TS 文件、人确认后持久化、AI harness 唯一固定为 `'omp'`（**(U)** U13、U15、U23，`01a18dd4 #5ddb4d88`、`01a18e1f #47b71e05, #9c291fe2`，F28、F29）；【暂定】`library.merge` 与字段映射 | **赞成** | 新增 `library.merge{conversation, paths}` 合入会话 worktree 写出的节点并快进中心检出与各会话 worktree（闭合 F28）；`AgentTemplate.id` 即 `.omp/agents/` 定义名，`harness` 收窄为字面量 `'omp'`。 |
| **D7-12** | 集群页与接入向导落到 `remote`（P4–P7 列入 D9） | 串联 | 是 | **【定 · 专项裁决(b)确认】** `remote` 独立管理模板与作业（**(U)** U1、`01a18e3a #c5030836, #09e1cc92, #3afc3fb6`），P4–P7 列入 D9 符合 U1、U23，不违反 U2“不要擅自收缩”；【暂定】第一版按钮置灰 | **赞成** | 模板与在线远程 agent 容器直接取自 `remote templates`（P3）与 Mux 在线列表 + `remote status/tail`；P4–P7 不在第一版实现、全部列入 D9 差距清单，Lab 不自建第二份作业表填补 P5，消除了把 `restart` 映射成 `abort` 的错误。 |
| **D7-13** | 容器（镜像）页落到 `Pepgent/images`、Komodo Build 与 `remote` 模板 | 串联 | 是 | 【定】容器模板提前构建、复用成熟方案（**(U)** `01a18e3a #c5030836`、U13、`01a18e1f #e3692177`）；【暂定】images 检出卷提交流程 | **赞成** | `build_push` 明确先在 images 检出卷上 commit 并 push 到 `Pepgent/images`（D7-19），再调 Komodo Core `RunBuild`；`liveContainers`（P5）与预构建检查/终端（P6）对齐 D7-12。 |
| **D7-14** | 设置页的其余部分 | 技术 | 是 | 【定】保留原型业务面（**(U)** `01a18e1f #e3692177`）并遵守凭据规则；【暂定】`deploy_key` 表与 `approve` 引用 | **赞成** | `where` 补入 `deploy_key` 表，成员 `canApprove` 对齐 D7-03 的独立 `approve` 权限。 |
| **D7-15** | AI 模型目录与选择（按会话自身那一代查询与切换） | 技术 | 否 | 【定】以 omp 为核心（**(U)** U13）；【暂定】按本会话当前代调用 `get_available_models` / `set_model` | **赞成** | 打开模型选择时在该会话自己的那一代上调用 `get_available_models`（停驻则先开新代），`set_model` 发给同一代，结果确定，删除原 P10。 |
| **D7-17** | 前端接缝，阶段 B：线上传权威方原样数据，客户端投影 | 实现 + 串联 | 是 | **【定 · 专项裁决(a)确认】** 替换静态 fixture 跑通端到端（**(U)** U1、U2、U23），修正 `AgentTemplate.harness` 符合 U13；【暂定】`harness: 'omp'` 与 `id` 映射 | **赞成** | 将 `AgentTemplate.harness` 去掉四枚举收窄为 `'omp'`、`id` 定为 omp agent 定义名（与 D7-11 一致），避免冗余拷贝。 |
| **D7-18** | Lab 后端的对外接口 | 技术 | 否 | 【定】讨论产物读 worktree、P4–P7 列入 D9 不违背 U2/U23；【暂定】新增 `/api/lab/artifacts/{id}` 与收缩 `LabCommand` | **赞成** | 补入讨论产物字节路由 `GET /api/lab/artifacts/{id}`；第一版 `LabCommand` 只保留有真实执行方的命令，P4–P7 对应命令不进联合，契约诚实闭合。 |
| **D7-19** | 部署形态与配置（中心主机 Lab 容器 + 六卷按写方分离） | 实现 | 是 | 【定】中心主机运行 eval、定制从发行 tar 安装、旧 `_app` 面不动（**(U)** U23、U24、`01a18e1f #5a37a640, #9c291fe2`、`01a19232 #fa43ba92`）；【暂定】六卷与凭据配置 | **赞成** | 按 D2-20 明确列出 6 个独立卷（Lab 业务库卷、omp session 卷、中心检出缓存卷、会话 worktree 卷、images 检出卷、remote home 卷）及各自唯一写方，补齐 Lab 库与 images 仓库的部署密钥生成与持有。 |

> **未改动的 5 个条目复核（维持第 1 轮赞成票）：** `D7-01`（赞成）、`D7-08`（赞成）、`D7-16`（赞成）、`D7-20`（赞成，【定】）、`D7-21`（赞成，【定】）。

---

## 三、一票否决审查（依 U11、U20 / D1-16）

- **否决结论：0 项否决（无否决）。**
- **审查说明：** 对本轮修订涉及的全部条目（含 13 条标为“缺失部分或设计补充 = 是”的修订行：`D7-03`–`D7-07`、`D7-09`–`D7-14`、`D7-17`、`D7-19`）逐项核对 `LEDGER.md`（U1–U29）及 `pepgent-pm/evidence/argon/pivot-baseline.md`、`rulings-C.md`、`flow-catalog.md` 中的全部 `(U)` 用户原话证据，本轮全部修订均是为了对齐已通过的 D2–D6 契约与单一权威源头规则，无任何一处违背用户原意或擅自收缩范围，不行使一票否决权。
