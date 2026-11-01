# D8 soroi MVP：验收定义与实现计划（第 4 轮：Mentor 反例修订与 D2–D7 全量对齐复核）— Argon 意图裁决与重投选票

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md`（对照 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-r1-responses.md`“第 3 轮”与“第 3 轮：与 D2–D7 最终文本的对齐”）
- **复核范围：**
  1. Mentor 第 1 轮反例修订涉及的 `D8-01`（含矩阵 `F15`、`F22`）、`D8-13`（含 `VS1`、`F01`、`STO-02`、`SOR-03`）、`D8-16`（含 `REM-06`、`LAB-12`）；
  2. 与 D2–D7 最终文本及 PM#4 技术裁决对齐涉及的 `D8-01`（矩阵 `F02`、`F06`、`F11`、`F20`、`F21`、`F24`、`F31`）、`D8-03`、`D8-04`、`D8-09`（含第 16 项 D3 补充条款）、`D8-14`（含 `MUX-03`、`STO-09`、`STO-12`、`DEP-03`、`SOR-08`、`SOR-13`、`SOR-17a`、`SOR-20`、`REM-01`、`REM-02`、`REM-07`、`ENV-04`、`DIST-04`、`DEP-01`、`LAB-05`、`LAB-11b`、`LAB-12`、`WEB-07`、`E2E-13`、`E2E-17`，切片总数 108 个）。
  3. 其余未改动决策行维持赞成票。
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **计票汇总：**
  - **本轮重投行（D8-01、D8-03、D8-04、D8-09、D8-13、D8-14、D8-16）：7 赞成 / 0 反对 / 0 否决**
  - **全表累计（D8-01 至 D8-16）：16 赞成 / 0 反对 / 0 否决**

---

## 一、专项意图裁决（依 D1-16 引用 `(U)` 原文）

### 1. 第 16 项条款（操作员终端直接启动的 TUI 根 `omp` 不经 Mux；其启动的 soroi subagent 仍经写方 `dial` 走 Mux）是否符合用户关于 Subagent 对标与独立网络层 Mux 的原意（`D8-09`、`F20`、`F21`、`E2E-02` 及 `D3-08`/`D3-10` 补充条款）

- **意图裁决：`【定 · 符合用户原意】`**
- **依据 `(U)` 原文：**
  1. **(U)** `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`（2026-10-31 09:12:17）：
     > “不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯”
  2. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a`（2026-10-31 04:39:09）：
     > “pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理，而soroi的工作流程肉眼可见的可能会唤醒一个早就死掉的session”
  3. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/2dbf970b`（2026-10-31 04:40:40）：
     > “如果重新实现subagent，那么对于gui来说可见任意的agent更好做了，因为本来就是rpc启动的，而rpc实际上本来就要额外做只读层面的多路复用”
  4. **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92`（2026-10-31 04:53:33）：
     > “然后怎么连回来soroi，应该是在独立的网络层中，有中心化的omp rpc多路复用器，怎么实现怎么干的你别管，反正在一个网络里，这也应该是oci标准行为，而不需要其他能力”
  5. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
- **裁决说明：**
  - **【定】** 用户在 `#2dbf970b` 与 `#09e1cc92` 中提出中心化 `omp` RPC 多路复用器（Mux）的本意，是让**以 RPC 模式启动的会话**（包括插件启动的所有本机/远程 soroi subagent，以及 Pepgent Lab 后端把 soroi 当作 agent 核心调用时以 `--mode rpc` 启动的根会话）经由独立网络层的中心化 Mux 进行单写方控制与多读方只读观察。
  - **【定】** 同时，用户在 `#f488be08` 与 `#678fe41a` 中明确要求不修改 `omp` 宿主代码、以纯插件全方位对标 `omp` 内置 subagent 的生命周期（含交互式 TUI 的 Agent Hub 按 `x` kill 生成 `.tombstone` 以及 CLI 的 `omp --resume` 重启找回停驻子会话，即 `F20`、`F21`）。当人类操作员在终端直接启动交互式 TUI 根 `omp` 时，宿主进程占用终端 TTY（而非 `--mode rpc` 的 JSONL stdio），操作员本人即该 TUI 根会话的直接写方，自然不经 RPC Mux；而该 TUI 根会话内加载的 `omp-soroi` 插件作为 subagent supervisor 写方，启动的每一个 soroi subagent 依然严格经 `omp-rpc-mux dial -- omp --mode rpc` 走 Mux，其 `generation_up` / `generation_down` 在线事件和只读观察完全保持一致。
  - 因此，在 `D3-08`/`D3-10` 补充“操作员在终端直接启动的 TUI 根会话本身是自己的写方、不经 Mux；其启动的 soroi subagent 仍经写方 `dial` 走 Mux；Lab 后端与 `LabStandIn` 启动的 RPC 根会话仍经写方 `dial` 走 Mux”，消除了原 D3 措辞对 CLI/TUI 直启场景的过度概括，完全符合用户原意。

---

### 2. 将 P5 拆分为“只读作业列表与状态/日志尾部（`remote runs` + `status` + `tail`）进 MVP、控制操作（`restart`、`destroy`、`new_sandbox`）进 D9”是否符合 U2 / U23（`D8-16`、`REM-06`、`LAB-12`、`F17`、`F31`）

- **意图裁决：`【定 · 符合 U1、U2、U23】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
  2. **(U) `LEDGER.md` U2**：
     > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
  3. **(U) `LEDGER.md` U1**：
     > “目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
  4. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/2dbf970b`、`#bfd6975c`、`#e818d410`、`#e3692177`（`FC:293-303` F17、`FC:493-507` F31）：
     > 远程运行期间，GUI 与调用方观察运行状态、容器日志尾部与运行中进度（F17 S2 与 F31 第 ④ 步“实验详情页与算力页实时显示 DAG、subagent 流、容器日志尾部”）。
- **裁决说明：**
  - **【定】** `F17`（S2）与 `F31` 第 ④ 步要求算力页（`clusters`）展示远程作业状态与日志尾部，这是用户说过的流程；将 P5 的**只读部分**（`REM-06` 新增只读 `remote runs` 读取 `runs/<run>.json`，配合既有 `remote status`、`remote tail` 与 `LAB-12` 的页面线数据及 `/api/lab/jobs/{run}/tail` SSE）纳入 MVP，并与 `D7-12`、`D7-18` 同步对齐，严守了 **U2**“不要擅自收缩”与 **U23**“能走通我说的所有流程”。
  - **【定】** 算力页上脱离 `soroi_eval` 运行的独立容器控制动作（`restart`、`destroy`、`new_sandbox`）不在任何一条用户说过的 F01–F32 流程中（仅存在于前端静态原型 `LAB_SNAPSHOT`），将它们留在 `D8-16` 清单并作为 **D9** 的输入按 §5.4 归类为“点 / 线 / 面”，既不把用户未要求的原型按钮变成 MVP 阻塞项，也不静默丢弃，完全符合 **U1** 与 **U23**。

---

### 3. `F22` 补入第二部分（多中心 worker 批次屏障）、`F15` 对齐 `D6-07` 路径、`VS1`/`F01`/`F02` 对齐显式 `POST /runs/{run}/end` 及 PM#4 `EndedUnstarted` 与 Slurm `shared_root`

- **意图裁决：**
  - **`F22` 第二部分（多中心 worker 写步与批次释放屏障）：`【定 · 符合原意】`**（依据 **(U)** `01a18ed5 #4986c617`、`01a18e1f #63f31453, #5a37a640`：未消费提醒推动 AI、跨会话不泄漏未释放 atom；`writesEval` 与 `purpose` 组头细则为已通过的 D5-07/D5-12 技术契约 `【暂定】`）。
  - **`F15` 改用 `GET /transfers/{t}/volumes/{position}/files/soroi/result.json`：`【定 · 符合原意】`**（依据 **(U)** `01a18e8a #68d36f55, #32b6f7fd`、`01a18e1f #7ffcea0c`：Slurm `dry run` 真实试跑且零 store 写入；具体 URL 结构对齐 D6-07 `【暂定】`）。
  - **`VS1`、`F01`、`F02`、`STO-02`、`SOR-03` 改用根 supervisor 显式调用 `POST /runs/{run}/end`：`【定 · 符合原意】`**（依据 **(U)** `01a18dd4 #46e29915`、`01a18ed5 #276d1776`：全部 atom 被消费或 `stop` 后运行方才结束；移除 `mayEnd` 改为独立 `/end` 请求对齐 D6-05 `【暂定】`）。
  - **其余 D2–D7 对齐项与 PM#4 技术裁决（`EndedUnstarted`、Slurm `run_root`/`shared_root`、`PUT /releases/{version}`、`CaptureRecord.inputs`、`call_adopted`/`call_inherited` 判据、`pending_launch`、`lab_save_artifact` 工作区快照等）：** 均不与任何 `(U)` 原话冲突，属 `【暂定】` 技术/实现闭合，并保持与已通过的 D2–D7 完全一致。

---

## 二、本轮重投行逐条选票（D8-01、D8-03、D8-04、D8-09、D8-13、D8-14、D8-16）

| ID | 本轮修订内容摘要 | 起草分类 | 缺失/补充? | Argon 意图裁决（附 `(U)` 依据） | Argon 投票 | 裁决与投票理由 |
| --- | --- | --- | --- | --- | --- | --- |
| **D8-01** | 矩阵修订：<br>• `F22` 新增第二部分 ⑤–⑨，验证带 `purpose` 的多个 `writesEval: true` 中心 worker 并发写步、前 N−1 个交回时不提前暴露给主 agent、第 N 个交回后一次性带 `purpose` 组头进入提醒、记下各自 `step.session` 且释放前不调 `/end`；<br>• `F15` 改用 D6-07 的 `GET /transfers/{t}/volumes/{position}/files/soroi/result.json`，在同一个 URL 上验证返回前 200、返回后 404；<br>• `F01 ②`、`F02 ③` 对齐根 supervisor 调用 `POST /runs/{run}/end`；<br>• `F06` 从 `GET /captures/{identity}` 核对 `inputs`；`F11`、`F24` 按 `call_adopted`/`call_inherited` 与 `parentAborted` 判定；`F31 ②` 对齐 `pending_launch` 与 `experiment.approve` | 意图 | 是：U23 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U2、U23** 及 `FC` 各流 `(U)` 原话 | **赞成** | 消除了 `F22` 漏测多中心 worker 批次屏障和 `F15` 旧 URL 恒 404 的假阳性问题，并将 `F01`、`F02`、`F06`、`F11`、`F24`、`F31` 的下游断言与 D5–D7 最终契约严密对齐。 |
| **D8-03** | store 就绪后，init 改用 `PUT /releases/{version}` 在同一事务内校验哈希、写入 boot/runner/定制 tar 对象并记录 `ReleaseRecord`（对齐 D6-22，`STO-12`、`DEP-03` 同步） | 技术 | 是：U23 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U13、U23、U24**；【暂定】`/releases/{version}` 事务接口 | **赞成** | 保证中心与远程所使用的单一发行包在 store 中具备原子性的版本与内容寻址记录，与 D6-22 完全一致。 |
| **D8-04** | “四条线”按 `D7-20` 原文对齐表述：① store HTTP/SSE；② Mux 写方、读方与控制端点；③ RPC host tools；④ Lab 库项目级 `.omp/` | 串联 | 否 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U1、U23** 与 `D7-20` | **赞成** | 表述与 `D7-20` 完全一致，边界清晰。 |
| **D8-09** | 写明 `F20`、`F21` 的 PTY 根会话是操作员在终端直接启动的 TUI 根会话，不经写方 `dial`；它启动的 soroi 子 agent 仍由插件作为写方经 `dial` 走 Mux，并并入 leader 第 16 项裁决（在 D3 的 `D3-08`/`D3-10` 补入该条款） | 技术 | 是 | **【定 · 符合原意】** 依据 **(U)** `01a18f4a #f488be08`、`01a18e1f #678fe41a, #2dbf970b`、`01a18e3a #09e1cc92` 与 **U23** | **赞成** | 既守住 TUI Agent Hub kill 与 `omp --resume` 对内置 subagent 生命周期的全方位对标（不改 omp 核心），又守住所有 soroi subagent 与 Lab 驱动的根会话一律经中心化 RPC Mux 通讯。 |
| **D8-13** | `VS1` 第 6 步改为 `POST /runs/steps（open）`，新增第 7 步由根 eval supervisor 确认无活动正式 eval 且无未释放批次后调用 `POST /runs/{run}/end` 断言 `Ended{seq}`；移除全部 `mayEnd` | 技术 | 是 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U2、U23** 与 `01a18dd4 #46e29915`；【暂定】`/end` 端点 | **赞成** | 修复了 `VS1` 沿用已废除 `mayEnd` 导致运行无法变为 `Ended` 的阻塞问题，与 `D6-05` 完全闭合。 |
| **D8-14** | 切片表与 D2–D7 及 PM#4 对齐（共 108 个切片）：新增 `REM-07`（`EndedUnstarted{ended_at}` 与 `remove` 等终态），更新 `MUX-03`、`STO-02`、`STO-09`、`STO-12`、`SOR-03`、`SOR-08`、`SOR-13`、`SOR-17a`、`SOR-20`、`REM-01`、`REM-02`、`REM-06`、`ENV-04`、`DIST-04`、`DEP-01`、`DEP-03`、`LAB-05`、`LAB-11b`、`LAB-12`、`WEB-07`、`E2E-13`、`E2E-17` | 实现 | 否 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U2、U11、U25、U26** | **赞成** | 108 个切片保持单仓单职责与无环依赖 DAG，档位划分严格遵守 U11/U25/U26，且与 D2–D7 最终文本及 PM#4 裁决零冲突。 |
| **D8-16** | P5 拆分为两部分：只读部分（`REM-06` 的 `remote runs` 读 `runs/<run>.json`，配合按 run id 的 `status`、`tail` 及 `LAB-12` 页面线数据与 tail SSE）进入 MVP，支撑 `F17`（S2）与 `F31`；控制部分（`restart`、`destroy`、`new_sandbox`）不进 MVP，原样列入 D9 输入 | 意图 | 是 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U1、U2、U23** 与 `01a18e1f #2dbf970b, #bfd6975c, #e3692177` | **赞成** | 既保证用户流程 `F17`（S2）和 `F31` 第 ④ 步在算力页观察作业状态与日志尾部不缩水（U2、U23），又把用户未要求过的独立容器控制按钮交给 D9 归类（U1、U23），消除与 D7 的冲突。 |

---

## 三、一票否决审查

- **否决结论：0 项否决（无否决）。**
- **审查说明：** 依 U11 与 U20（D1-16），对本轮修订的全部决策行、验收矩阵条目与 108 个实现切片（含第 16 项 D3 补充条款及 P5 读写拆分）逐一核对 `(U)` 用户原话证据，全部符合用户原始设计意图，无任何擅自收缩或偏离，不行使一票否决权。
