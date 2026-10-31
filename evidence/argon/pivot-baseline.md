# Soroi 2026-10-31 重大转向意图基线（Pivot Baseline）

本文件由 Argon 批准发布，以“转向前 → 转向后”对照的形式确立 2026-10-31 转向的完整意图基线，并融合全部 25 份调查报告（含 `local://inv/r-pepgent.md`）的证据，作为后续架构与组件决策投票的强制前提。

---

## 一、总表：转向前 → 转向后

| 维度 | 转向前（2026-10-31 02:23 之前） | 转向后（2026-10-31 02:23 之后至今） | 核心 `(U)` 证据 |
| --- | --- | --- | --- |
| **基本假设** | 假定 AI harness 能力弱、可定制性弱，把 agent 视为完全不透明、不可侵入的黑箱 | 以强 harness（**omp**）为核心，直接利用 omp 的代码执行、插件/扩展、自定义工具、subagent 状态管理与 RPC 能力 | `(U)` `01a18dd4 #6b25e5f7`（02:30:39）、`#5ddb4d88`（02:31:00）；`AGENTS.md` **U6**、**U13** |
| **soroi 的形态** | 独立的外部控制面 + 自造的 preset/workflow 弱编程语言（含 `Sum`/`Case`/`Loop` 与边文件）+ 解释器与启动器二合一的调度 daemon（共 17 个模块，曾打算做静态编译） | **omp 的扩展组件（插件集合）**：不在 harness 外另搭控制面，**严禁修改 omp 宿主核心代码**；由引擎（`store` + 节点构造器/`stop`/类 jotai 中间件）、宿主插件（`omp-soroi-eval` + `omp-soroi-subagent`）与人类介入层组成 | `(U)` `01a18dd4 #ca258d0d`（02:23:38）、`#28767d47`（02:32:46）、`#2d861491`（02:33:44）、`#db50b20f`（02:44:01）；`01a18f4a #f488be08`（09:12:17）；**U1**、**U13** |
| **程序怎么写、怎么跑** | 先静态声明完整 preset 定义与输出契约（“预知未来”），或让 AI 一次写完整份流程脚本，由外层 daemon 解释调度，并支持 replay 重放 | **基于未消费 `atom` 提醒的被动逐步 `eval`**：AI 不一次写完整流程，每次只看系统提醒的未消费 `atom`（底层 `Pure<T>`，表层 `const` 具名变量，扁平标量或单 `File`）写一步消费（三语句限制、禁 `loop`/`map`/`object`/`array`/魔法值，多输出返回扁平对象并当场穷尽解构）；所有正式运行过的步在 store 中逐步长成程序；**无重放（replay）** | `(U)` `01a18dd4 #f1ad9522, #ec8da5cc, #afd96ce6, #46e29915`；`01a18ed5 #4986c617, #440c8605, #b7357c72, #13abc2a1, #276d1776, #98d47f20`；`01a18efe #9e2d37a1`；`01a18e8a #21495b13` |
| **节点与节点库** | 封闭的 preset 声明语言，规定输入、预期输出和采集规则 | **独立的普通 TS 文件**（`program` / `agent` / `human` 构造器确定体种类，文件哈希即版本）；节点库降级为“预定义持久化、下次 `eval` 直接 import 后传参”的函数复用能力 | `(U)` `01a18dd4 #946fc403`；`01a18e1f #47b71e05`；`01a18e8a #50f5cf06, #e7747df0` |
| **捕获机制** | 出口按 preset 预声明的返回值、capture、`[files]`、tool 折叠采集并 verify | **运行时事实捕获（Capture HKT，不在 Effect 内）**：运行前不声明产出；`Program` 由类 jotai 中间件捕获真实输入输出，`Agent` 通过调用宿主侧唯一交回工具（交回结果与文件路径）捕获产物，中间件完成非本机文件传输与管理 | `(U)` `01a18dd4 #edbaf573, #49e6867a, #ec8da5cc, #01b74874, #cb9f395b` |
| **测试与正式运行** | 靠外层 sim/replay 档位或让模型把多轮试验重写合并成正式脚本 | **两阶段 `eval`（`dry run` 与 `正式运行`）**：`dry run` 真跑未钉住部分（可在 Slurm 真试跑算法），对昂贵设备/agent 经外部输入叠加返回值（不改被测代码），**从头到尾不写 store**；`正式运行` 不带钉住值（业务固定值直接写根 atom），不搞“锁定上一次 eval”，结果写入 store | `(U)` `01a18e8a #433e07ba, #48078e3a, #68d36f55, #a7f465d2, #8854f464, #32b6f7fd, #a45ac248`；`01a18e1f #7ffcea0c` |
| **Agent 宿主与 Subagent** | Workspace 插槽（参考实现为 Paseo daemon），外层通过 `soroi-closure` CLI 交互 | **omp 纯插件 `omp-soroi-subagent`**：不选无状态的 pi，也不用内置进程内 `yield` subagent；每个 subagent 是独立 `omp --mode rpc` 进程，定制、生命周期（含唤醒早已死掉的 session）和 IRC 全方位对标内置 subagent | `(U)` `01a18e1f #9c291fe2, #678fe41a, #2dbf970b, #7bfe3696, #c1ef8567`；`01a18f4a #f488be08` |
| **Store 与 GUI 读取** | 近似 session log 或外层运行记录，曾设想导出额外 workflow DSL 供前端渲染，或中央库承受多集群并发写 | **可落盘的状态管理（DuckLake + 对象存储）**：GUI 直接读 Store，**连 DSL 都不要了**；`eval` 只在中心主机运行并直接提交；正式远程 `Agent`（仅限一层，禁止再开远程 `Agent`）运行中写本机 Parquet 批次目录，结束后随 volume 拷回一次汇入中心副本；事件表为历史时间轴唯一权威 | `(U)` `01a18e1f #64246eaf, #9ff9d2be, #d6cf9b35, #543f0ccd, #a5f938df, #8e0a7e8f, #63f31453, #5a37a640, #3dbd0473` |
| **人类介入** | 暂停运行后改参数重跑同一份 preset，或曾被误解为 GUI 与 AI 多写方合并覆写 store | **独立的一层（`intervention.md`），只发生在正式运行上，只新增不修改**：(1) 改值 = 取消原运行程序 → `Human` 捕获消费原输入产出新 atom → 通知 AI 改变了并触发下游消费；(2) 改函数体或参数 = 派生新的正式运行（未变部分按身份复用）；(3) 接管 subagent = 走既有带来源的 IRC 队列与编辑 | `(U)` `01a18e1f #7bfe3696, #ba5ad307, #d1baf561, #a0d22b8a, #2d06b34c, #6145f170, #f1f9c0b5` |
| **soroi 与 Pepgent 的关系** | 容易把 soroi 误当成整个 AI4S 平台后端或把所有执行/业务模块塞进 soroi | **soroi 只是 omp 的扩展组件，离完整 Pepgent 还很远**；Pepgent 下的 `remote`、网络层、AI4S 业务前后端等按职责独立存在 | `(U)` `AGENTS.md` **U1**（`01a193fd #57d9d58b`）；`01a18e3a #3afc3fb6, #b45cd22c` |

---

## 二、哪些职责迁出了 soroi，分别归谁

1. **远程容器/集群作业执行与工作卷进出 → 迁出归独立组件 `Pepgent/remote`**
   - **依据：** `(U)` `AGENTS.md` **U1**（“就像remote一样他本质上不属于soroi是独立存在”）；`01a18e3a #5d27138c, #3afc3fb6, #b45cd22c`（独立程序、独立私有仓库、Rust 跨平台）。
   - **归属边界：** `remote` 拥有预构建环境模板目录（Komodo / Slurm HTTP / K8s 三后端共享抽象，首期实现 Komodo）和单次远程作业生命周期（临时 volume 创建 → `copy-in` → `body` → `copy-out` 拷回调用方指定目标 → `remove`）。`remote` 不知道 soroi、atom 或 store 的存在；soroi 的中间件只是它的一个客户端。
2. **跨机器/容器的 omp RPC 桥接与多读方事件流复用 → 迁出归“独立网络层 + 中心化 omp RPC 多路复用器（Mux）”**
   - **依据：** `(U)` `01a18e3a #09e1cc92`（“然后怎么连回来soroi，应该是在独立的网络层中，有中心化的omp rpc多路复用器”）；`01a18e1f #2dbf970b`（“因为本来就是rpc启动的，而rpc实际上本来就要额外做只读层面的多路复用”）。
   - **归属边界：** 远程 subagent 连回主侧、GUI 只读订阅任意 running agent 事件流、远程运行中进度推送，由独立网络层与中心化 RPC Mux 承担，不由 `remote` 或业务容器各自造隧道。
3. **Agent 对话历史、会话状态机、工具执行与内置 IRC 总线 → 归宿主 `omp`**
   - **依据：** `(U)` `01a18e1f #64246eaf, #678fe41a, #7bfe3696`；`01a18f4a #f488be08`；**U13**。
   - **归属边界：** agent transcript（`.jsonl`）归 omp `SessionManager` 管，soroi store 只在捕获记录中引用其 session id，不复制对话；subagent 的四态生命周期与 IRC 投递归 omp 内置机制，soroi 只以插件接入。
4. **AI4S 实验室平台业务面（17 个页面的产品工作台） → 归业务应用仓库 `Pepgent/Pepgent`**
   - **依据：** `(U)` **U1**（“对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的”）；`01a19232 #39b999ab, #fa43ba92`（将 `AI4S-prototype` 移入 `pepgent` 仓库）。
   - **归属边界：** 实验室、成员、项目标签、讨论会话、数据集目录视图、实验列表与详情画布、流程编辑器、节点库管理界面、Sandbox 集群与接入向导、容器镜像设置、自动化规则与审批 UI 属于建在 soroi 與 `remote` 之上的 Pepgent 业务应用，不属于 soroi 扩展组件本身。
5. **宿主机、VM/CT、网络与 Komodo/Slurm 基础环境声明 → 归 `Pepgent/iac` 与 `homelab-tf`**
   - **依据：** `(U)` **U4**（`01a193fd #5e62a529`）；`(D)` `local://inv/r-iac.md`、`local://inv/r-homelab-tf.md`。

---

## 三、因此哪些新契约或新组件成为必需

随着控制面反转与职责迁出，为了把散落的部件串成完整可运行的 Pepgent 与新版 soroi，以下 **5 项新组件/契约** 成为必需（供后续架构决策表逐条设计）：

1. **独立网络层与中心化 omp RPC 多路复用器（RPC Mux）：**
   - 必需原因：远程 `Agent` 容器启动后需按 `REMOTE_MUX` 连回中心主侧；GUI 需要作为多个只读读方实时订阅任意 subagent 事件流与远程本地 Parquet 批次进度；人类在 GUI 接管 subagent 时需向该通道注入带人类来源的 IRC 并撤回/编辑排队消息（`(U)` `01a18e3a #09e1cc92`、`01a18e1f #2dbf970b, #7bfe3696`）。
2. **Store 数据服务边界（`store.md` 所称“soroi 服务”的宿主与接口契约）：**
   - 必需原因：在不恢复旧外置调度 daemon（`(U)` `01a18dd4 #28767d47`）的前提下，必须有一个明确进程/服务承担：(a) 为 `remote` 的 `copy-in` 提供输入文件 `HTTP GET` 端点、为 `copy-out` 提供 `HTTP PUT tar` 接收端点；(b) 将拷回的远程 `Agent` 本地 Parquet 批次与产出文件一次提交汇入中心 DuckLake + 对象存储，并同步更新 FTS 全文检索表；(c) 接收 GUI 的人类介入（中止捕获、`Human` 交回、派生新运行）；(d) 向 GUI 与自动化引擎推送运行事件与 Store 变更订阅（`(U)` `01a18e1f #64246eaf, #8e0a7e8f, #ba5ad307, #d1baf561, #a0d22b8a`）。
3. **远程 `Program` 与远程 `Agent` 的可执行载荷、定制部署与服务发现契约：**
   - 必需原因：
     - 远程 `Program`：节点是普通 TS 文件，可能有 `package.json` 第三方依赖与本地相对依赖，必须在 `remote` 作业的临时 volume 中还原执行并按位置传入解包后的输入、捕获输出标量/扁平对象与 `File`（`(U)` `01a18e8a #8d913d2f, #f4c96767`）；
     - 远程 `Agent`：目标机器/容器必须部署与主侧对标的 omp 定制，且主侧能通过服务发现找到可启动 subagent 的目标并唤醒旧 session（`(U)` `01a18e1f #9c291fe2, #678fe41a`）。
4. **`omp-soroi-eval` 与 `omp-soroi-subagent` 的插件间闭合契约：**
   - 必需原因：当前两插件各自独立实现了一半（`eval` 仍用内置 `runSubprocess` 占位，`subagent` 的 `soroi_return` 只有字符串且带违规 fallback，且一刀切禁了中心分身再开 subagent）。必须打通两插件：中心主 agent 及 `fork` 分身在 `eval` 中调用 `Agent` 节点时，统一通过 `omp-soroi-subagent` 启动独立 RPC 进程，并以唯一交回工具捕获 typed 结果与 `File` 路径（`(U)` `01a18dd4 #49e6867a`、`01a18e1f #c1ef8567, #3dbd0473`、`01a18e8a #4567dcfd`）。
5. **Pepgent Lab 业务后端（对接前端 `LabBridge` 的真实服务层）：**
   - 必需原因：见下文第六节对 `local://inv/r-pepgent.md` 的补读核对——业务仓库目前只有旧桌面会话的 Paseo 后端，AI4S Lab 的 17 个页面完全建立在静态内存 `LAB_SNAPSHOT` 上，没有任何真实 Lab 后端接口。要完成 **U1、U2** 要求的全流程交付，必须规划并实现连接前端 `PepgentBridge.lab` 与底层 `soroi`（Store / Eval / Subagent / Intervention）、`remote`、镜像构建及讨论/自动化模型的 Lab 业务后端。

---

## 四、哪些核心意图从始至终没有变

1. **AI 当函数运行（AI as functions）：** 程序中既有普通计算函数也有 agent 函数，agent 只是特殊的函数，输入与输出同样作为确定性的值流动（`(U)` `01a18dd4 #003efe9e`、`01a18e8a #3fd1e5c4`）。
2. **消除不可观测面与确定性产物捕获：** 每个中间结果都不可变、可追溯来源（哪次运行、哪次调用、哪个节点版本、哪个环境）、按内容/调用身份跨运行复用（`(U)` `01a18dd4 #ca258d0d, #f1ad9522`、`01a18e1f #64246eaf`）。
3. **AI4S 实验室平台的业务形态：** 反转的只是底层 harness 与执行/捕获机制，上层 AI4S 实验室业务几乎不用动，且体验更好（`(U)` `01a18e1f #e818d410, #e3692177`）。
4. **远程运行、远程捕获、历史时间轴与人类介入：** 这四项始终是不可削减的核心能力要求（`(U)` `01a18e1f #85b259a5, #9ff9d2be, #ba5ad307, #d1baf561, #a0d22b8a`）。

---

## 五、补读第 25 份报告 `local://inv/r-pepgent.md` 的核对结论

已完整通读 `local://inv/r-pepgent.md:1-337`。该报告不推翻 `bootstrap.md` 与 `rulings-C.md` 的任何结论，并在以下三处将 Pepgent 业务仓的静态事实彻底钉实：

1. **证实 AI4S Lab 前端目前是 100% 静态 Fixture（无任何 Lab 后端 API）：**
   - `(D)` `pepgent/apps/web/src/client/services/lab.ts:1-13` 仅定义了同步只读接口 `LabBridge { readSnapshot(): LabSnapshot }`，直接返回内存常量 `LAB_SNAPSHOT`，注释明写“UI-only for now — no server function, storage or timer”；`createLabServices()` 不发任何网络请求或 SSE 订阅（`r-pepgent.md:26-27,267-275`）。
   - 这直接印证了 **U1**“目前 soroi 的设计对于完整的 pepgent 是不够的”：前端已经把 17 个页面和 `LabSnapshot` 领域契约（`lab-common.ts`、`lab-home.ts`、`lab-experiments.ts`、`lab-workspace.ts`、`lab-compute.ts`）建好，等待真实的 Lab 业务后端与 `soroi` / `remote` 接通。
2. **证实 `pepgent/pepgent` 现有的后端与 `apps/hub` 属于旧 Paseo 桌面会话线，不能直接冒充新 soroi / RPC Mux 后端：**
   - `(D)` `pepgent/apps/web/src/protocol/operations.ts:33-73` 实现的 server functions 与 `/api/host/events`、`/api/transcript/stream` SSE 路由全部服务于旧 `_app` 路由下的 Paseo 会话管理，且 `apps/hub` 是 Paseo WebSocket relay（`r-pepgent.md:28,154-169,279-315`）。
   - 用户在前端会话中已明确表示“现有的ai应该完全用不了，先不动”（`(U)` `01a192a2 #cec515af`，见 `s-pepgent.md:80,104`）。因此，在后续架构设计中，**严禁把旧 Paseo daemon / `apps/hub` 直接当成已完成的新版 omp RPC 多路复用器或 soroi 后端**；必须在 `apps/web` 的 TanStack Start server 层（或独立服务）围绕 `omp` + `soroi` + `remote` 构建新的 Lab 服务接口来替换静态 `LabBridge`。
3. **明确了 Lab 业务后端需要承接的具体领域面（`LabSnapshot` 18 个顶层字段）：**
   - 其中 `experiments`、`experimentFlows`、`flowEditor`、`nodeLibrary`、`datasets`（实验产物部分）直接消费或操作 **soroi（Store / Eval / Intervention / 节点库）**；
   - `clusters`、`connectCluster`、`containers` 对接 **`remote` 与环境/镜像构建管理**；
   - `labs`、`account`、`members`、`projects`、`home`、`discussions`、`automation`、`settings` 则属于 **Pepgent Lab 业务应用自身的状态与编排层**（其中讨论与自动化会调用 omp 会话并订阅 soroi 运行事件）。
