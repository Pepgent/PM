# D8 soroi MVP：验收定义与实现计划 — Argon 意图裁决、F01–F32 判据核查、逐行选票与否决审查

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md`（`D8-01` 至 `D8-16` 共 16 条，及 §3 `F01`–`F32` 验收矩阵、§4 104 个实现切片、§5 D9 方法）
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **计票汇总：** **16 赞成 / 0 反对 / 0 否决**（`D8-01`–`D8-16` 全部通过意图审查并投赞成票）
- **核心意图专项裁决汇总：**
  1. **MVP 是否完整覆盖用户说过的全部流程且无擅自收缩（U2、U23）：** **`【定 · 完全覆盖 F01–F32 全部 32 条流程，无任何擅自收缩】`**
  2. **soroi 是否打包为不依赖 omomp 的独立 omp 定制（U13、U23、U24）：** **`【定 · 完全独立打包并在干净 HOME 的上游 omp 中逐类验证，无 omomp、无 fork】`**
  3. **Pepgent 将 soroi 作为 agent 核心调用是否真实（U1、U23）：** **`【定 · 第二段 S2 由真实 Pepgent Lab 后端经 D7-20 四条线驱动真实 omp 根会话并由真实浏览器三处核对，真实有效】`**
  4. **F01–F32 验收矩阵判据是否弱于用户原话：** **`【定 · 0 条弱于用户原话（全部 32 条判据均对齐或严于 flow-catalog.md 与用户原话；附 3 项非阻塞执行细化提示）】`**

---

## 一、核心意图专项裁决（依 D1-16 引用 `(U)` 原文）

### 1. MVP 定义是否完整覆盖用户描述的全部流程且无静默收缩（`D8-01`、`D8-16`、§3 矩阵）

- **意图裁决：`【定 · 符合用户原意，无任何静默收缩】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U2**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`，2026-11-01 07:18:38）：
     > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
  2. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
  3. **(U) `LEDGER.md` U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`，2026-11-01 07:14:14）：
     > “目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
  4. **(U) `LEDGER.md` U4**：
     > “对于slurm和komodo的测试，如果可以，我推荐你在homelab tf里启动vm创建小型测试环境。”
- **裁决说明：**
  - **【定】** `D8-01` 将 MVP 定义为 `pepgent-pm/evidence/argon/flow-catalog.md` 核定的 **F01–F32 全部 32 条用户流程 100% 通过**，每条流程均产出结构化 `verdict.json` 与权威方原始证据（`D8-12`），并由 §4.2 中明确的收口切片（`E2E-10`–`E2E-21`、`D9-01`–`D9-03`）一一承接，没有任何一条用户流程被裁减、延后或降级为 mock 单测。
  - **【定】** `D8-16` 将 D2–D7 已定、但 F01–F32 没有任何一条用户流程会走到的外围能力（如 `remote` 模板写入 CLI、容器页 Komodo Build 触发、集群硬件健康 P4、交互 shell P6、接入向导执行器 P7、仪器事件 P8、资源计量 P9、邀请邮件 P11、k8s 后端、生产 NetBird 网格与 `Pepgent/iac` 中心 VM）排除在 MVP 通过门槛之外，同时硬性规定它们**原样列入 D9 输入并在 §5.4 逐项给出“面 / 线 / 点 / 已覆盖”的归类结论**。这既守住了 **U23**“走通我说的所有流程”（不把用户未要求的流程混入 MVP 阻塞主线），又守住了 **U1、U2、U23**“不静默丢弃、完整盘点 Pepgent 与 soroi 之间缺失的点、线、面”。

---

### 2. soroi 是否打包为独立的 omp 定制且彻底剥离 omomp（`D8-03`、`CUS-01`–`04`、`DIST-01`–`02`、`F01`、`F22`）

- **意图裁决：`【定 · 符合 U13、U23、U24】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U24**：
     > “我需要你转交给argon，不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
  2. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制”
  3. **(U) `LEDGER.md` U13**：
     > “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  4. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`（2026-10-31 04:12:48）：
     > “首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起”
- **裁决说明：**
  - **【定】** `D8-03` 与 `CUS-01`–`CUS-04`、`DIST-01`–`DIST-02` 将 soroi 打包为单一内容寻址发行包 `soroi-<sha256>.tar`（内含 `manifest.json`、`installer`、合并后的插件包 `packages/omp-soroi`，以及仓内自写的 `agents/`、`skills/`、`rules/`、`settings/` 覆盖文件），明确规定不修改上游 omp 宿主代码（U13）、不借用本机 `~/.omp` 或 `omomp` 的任何插件/提示词/机制（U24）。
  - **【定】** 前置验收 **A0（`DIST-02`）** 在 `ls -A $HOME` 为空、无 `~/.omp` 的干净上游 `omp-agent` 镜像（`IMG-01`）中运行 `installer`，由 PTY 驱动真实 `omp` 逐类实测验证五类定制（① 扩展 `soroi_eval` / `soroi_task`、② agent 定义、③ `skill://soroi-eval`、④ 规则注入与约束、⑤ 设置覆盖 `personality: none`）全部生效；远程 `Agent`（`D4-09`、`SOR-18`、`F16`）在启动时拷入同一哈希的 `soroi-<sha256>.tar` 到隔离的 `HOME=<mount>/soroi/home`，保证远程与中心加载逐字节一致的定制；`F22 ③` 显式断言根会话工具列表中不存在 `fork`、`fork_task`。

---

### 3. Pepgent 将 soroi 作为 agent 核心的使用是否真实（`D8-02`、`D8-04`、`D8-10`、`D8-13`、`D8-15`、`F31`、`F32`）

- **意图裁决：`【定 · 符合 U1、U2、U23】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
  2. **(U) `LEDGER.md` U1**：
     > “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远”
  3. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`（2026-10-31 03:54–04:03）：
     > “全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了”
     > “大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”
- **裁决说明：**
  - **【定】** `D8-02` 与 `D8-04` 确立两段式验收：
    - 第一段 **S1** 由只实现协议义务、不含任何业务库和 `lab_*` 工具的 `LabStandIn`（`D8-08`）独立验证 soroi 一侧；
    - 第二段 **S2** 由 `Pepgent/Pepgent` 的真实 Lab 后端（`server/lab`）在 `pepgent-central` 容器栈中仅经 `D7-20` 的四条边界线（① 作为根会话写方执行 `omp-rpc-mux dial -- omp --mode rpc`、② 读 `store` HTTP/SSE、③ 调用 `eval` 控制端点、④ 注册 `lab_*` RPC host tools，外加 `Pepgent/lab-library` 的 `.omp/` 内容）把 soroi 当作其 agent 核心调用，且 Lab 区不 import soroi 的任何内部包。
  - **【定】** `D8-10` 与 `F31` 要求在构建好的 `pepgent-central` 真实宿主上，用 `agent-browser` 驱动真实 Chromium 以登录用户身份走完“讨论页装载历史产物 → 启动实验 → `dry_run` 与 `formal` 执行本机/远程 `Program` 与 `Agent` → 实时渲染 DAG/subagent 流/日志尾部 → 人类介入 F23 与 F24 → 数据集归档、Runner Workspace 浏览与自动化复盘写回讨论”全链路，并在每个关键节点做页面截图、`/api/lab/*` 响应与权威方副作用（`lab.sqlite`、`store`、`Mux`、`remote`）三处核对。
  - **【定】** `D8-15` 与 `F32` 基于 S1 与 S2 真实运行的 `verdict.json`、线数据录制及 `LabSnapshot` 18 个顶层字段的叶子清单，机械比对并归类出缺失的“点、线、面”（`D9-gap.md`），完全落实 **U23** 的最后一项要求。

---

### 4. 任务切分与模型档位分配是否符合 U11、U25、U26（`D8-14`、§4.2）

- **意图裁决：`【定 · 符合 U11、U25、U26】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U11**：
     > “对于缺失的部分，设计的补充，argon拥有一票否决权，并且所有的设计，和重要决策，不允许使用task high以下的模型参与，只能是你，你的分身，task high，argon，导师。”
  2. **(U) `LEDGER.md` U25**：
     > “我需要你注意一点，不要过度依赖task high，对于能节省成本的low，free，要尽可能用上，不要怕验证”
  3. **(U) `LEDGER.md` U26**：
     > “在任务足够清晰，设计足够可靠，决策项足够小，任务不是很庞大的时候，task low和task free都十分可靠”
- **裁决说明：**
  - **【定】** `D8-14` 与 §4.2 将全部工作拆分为单仓库、单职责、带独立 runtime 验收的 **104 个小切片**：其中契约已在 D2–D7 定稿的机械实现与 e2e 脚本共 **71 个切片交 `low`**，机械遍历取证 **1 个切片交 `free`（由 `low` 复核）**，单仓核心逻辑 **28 个切片交 `mid`**，仅把涉及提示词/agent 定义/技能/规则内容设计与 D9 归类判断的 **4 个切片（`CUS-01`、`CUS-02`、`CUS-03`、`D9-03`）交 `high`**，严格遵循 U11、U25、U26。

---

## 二、§3 验收矩阵（F01–F32）判据强弱逐条核查

对照 `pepgent-pm/evidence/argon/flow-catalog.md`（FC）及每条流程所依据的 `(U)` 原话，对 `D8-mvp-scope.md` §3 的 F01–F32 通过判据逐条核查如下：

- **总体结论：** **全部 32 条流程（F01–F32）的通过判据均不弱于用户原话（0 条弱化）。** §1 对 FC 中 8 处 `【暂定】` 子项与 `D6-20` 事件名收敛的映射均与已表决的 D3–D7 决策一致，未削弱任何 `(U)` 意图要求。

| 流程 | FC 与 `(U)` 核心要求 | D8 §3 通过判据核查 | 是否弱于用户原话? |
| --- | --- | --- | --- |
| **F01** | 独立 soroi 定制加载、定义根 atom、`stop` 结束运行（U13、U23、U24、`01a18dd4 #46e29915`、`01a18ed5 #276d1776`） | A0 干净 `$HOME` 五类定制探针全过；Mux 写方 dial 启动根 omp；`soroi_eval` 正式运行 `const temp_2200c = 2200; stop(temp_2200c)` 返回 `runEnded: true`；store `/runs`、`/graph`（`Root temp_2200c = 2200`，`unconsumed` 空）、`/stream` 四事件序列全部核对 | **否（完全对齐）** |
| **F02** | 未消费 atom 提醒推动 AI 逐步写出消费程序（`01a18ed5 #4986c617`、`01a18dd4 #d01f7a32`） | 第 1 步后 `state.unconsumed` 非空；第 2 条 prompt **不给 atom 名**，验证 AI 靠未消费提醒引用上一步 `state.unconsumed` 中的名字逐步 `step_committed` 直至 `run_ended`，graph 边完整 | **否（完全对齐）** |
| **F03** | 三语句、禁 loop/map/object/array/魔法值/重名/嵌套调用、多输出解构与无依赖并发（`01a18ed5 #440c8605, #b7357c72, #13abc2a1, #276d1776, #98d47f20`） | 9 段违规代码逐一验证结构化 `CheckError.kind` 且 `stream` 最大 `seq` 不变；合法步验证两条无依赖 `slow_step` 在 `/activity` 中执行区间相交，且多输出对象解构为独立扁平 atom | **否（完全对齐）** |
| **F04** | `dry run` 真实试跑与外部 `pins` 钉住昂贵调用，零 store 写入（`01a18e8a #48078e3a, #32b6f7fd, #a45ac248`、`01a18e1f #7ffcea0c`） | 未钉住 `calc` 为 `ran`、按 atom 名全钉住的 `review` 为 `pinned`（`/agents` 无新增）；前后 `/runs`、`/stream` seq、`/graph` 不变，产出文件 `/objects/{h}` 返回 404；`formal` 带 `pins` 被 schema 拒绝 | **否（完全对齐）** |
| **F05** | `dry run` 通过后原样提交 `formal` 固化入 store（`01a18e8a #433e07ba, #a7f465d2, #8854f464`） | F04 同一段代码原样提交 `formal`：`step_committed.code` 与 `dry_run` 逐字节相等，调用 `ran`/`reused`，`/objects/{h}` 返回 200 | **否（完全对齐）** |
| **F06** | `Program` 节点捕获标量与 `File` 产物落盘（`01a18dd4 #003efe9e, #edbaf573, #ec8da5cc, #946fc403`） | `anneal` 正式运行后 graph 节点 `body:"Program"`、`version` 等于 bundle 哈希、`/versions/{v}` 带 commit 与 lockfile、`File` 对象 sha256 吻合、标量值正确 | **否（完全对齐）** |
| **F07** | `Agent` 节点经唯一交回工具 `soroi_return` 捕获结果与文件路径，禁嵌套 `eval`，无纯文本兜底（`01a18dd4 #49e6867a`、`01a18e1f #c1ef8567, #5a37a640`） | ① 子 agent `generation_up{where: local}`、RPC 流有 `soroi_return` host tool call、`body:"Agent"`、`transcript` 等于子 sessionId、`File` 入对象库；② 子 agent 调 `soroi_eval` 不可用；③ 不调交回工具直接结束回合判定为 `failed` 且无捕获写入 | **否（完全对齐）** |
| **F08** | `Human` 捕获产出新 atom 并带提醒触发下游消费（`01a18e1f #d1baf561`） | S1 与 S2：主动 `ask_human` 产生 `awaiting_human` 槽位，提交 `answer` 后捕获 `body:"Human"`，下一步提醒带 `← human` 推动 AI 在下一次 `soroi_eval` 引用该 atom | **否（完全对齐）** |
| **F09** | Store 落盘跨会话持久、按运行列出、装载旧产物、严禁跨运行直接引用 atom 名（`01a18e1f #64246eaf, #a5f938df, #63f31453, #e3692177`） | S1：结束根会话后新开根会话仍可读两次运行，新运行直接引用旧运行 atom 名报 `unknown_atom`；S2：数据集页按运行列出，`discussion.load` 后 AI 调 `lab_open_artifact` 拿到与对象哈希一致的字节 | **否（完全对齐）** |
| **F10** | 事件表驱动历史时间轴与 `at=k` 回看，绝无代码重放（`01a18e1f #9ff9d2be`、`01a18efe #9e2d37a1`、`01a18e8a #21495b13`） | S1 与 S2：3 步运行对每个 `k` 查询 `graph?at=k` 节点集合精确匹配，回看期间 `stream` 最大 `seq` 不变、`/agents/events` 无新事件、`remote` 无新 run；S2 拖动时间轴视图一致 | **否（完全对齐）** |
| **F11** | 按捕获身份（节点版本 + 输入值身份 + 运行环境）跨运行直接复用（`01a18e1f #64246eaf`、`01a18e8a #071be582`） | 运行 B 以同名值不同变量名 `x2` 调用 `calc(x2)`：`stream` 为 `call_adopted`、capture 身份等于运行 A、`/activity` 无 B 该次调用的执行区间 | **否（完全对齐）** |
| **F12** | 一值多分支消费、按值反查运行、内容检索（`01a18e8a #cab573e1`、`01a18e1f #d6cf9b35, #543f0ccd`） | ① `film` 被 5 个调用消费产生 5 条出边；② `/values/{hash}/runs` 反查运行；③ `/search?q=<中文子串>` 命中根 atom 值与步代码（按 D6-08）；S2 数据集页展示“被引用于” | **否（完全对齐）** |
| **F13** | 跨运行按调用对齐逐项比较产出（`01a18e8a #4da22ab4`、`01a18e1f #e3692177`） | S1 与 S2：`/compare?a=R1&b=R2` 区分上游 `SameCapture`、受影响路径 `Changed`（逐字段给两边值）及同函数多候选 `Ambiguous`；S2 实验详情对比视图一致 | **否（完全对齐）** |
| **F14** | 远程 `Program`（Komodo）：依赖还原、临时 volume 进出、产物入库与清理（`01a18e3a #c5030836, #09e1cc92`、`01a18e8a #8d913d2f, #f4c96767`） | S1 与 S2：运行中可见同名 Komodo Stack 与 Docker volume，`ended` 后才提交，捕获 `env` 带 `remoteRun` 与 `remote templates.identity`，`/versions/{v}` lockfile 与 `LIB-01` 一致，产物入库，结束后 Stack 与 volume 已删除；S2 节点展示模板与 remote run | **否（完全对齐）** |
| **F15** | 远程 `Program`（Slurm HTTP 后端）：集群作业与 `dry run` 试跑（`01a18e3a #c5030836, #d5414f59`、`01a18e8a #68d36f55`、U4） | ① `dry_run` 经 `slurmrestd` 完成 copy-in / runner / copy-out，结果进 `CallReport`，返回后暂存区 404 且 store `seq` 不变；② `formal` 捕获 Slurm 模板身份且产物入库；③ `remote remove` 后作业目录删除 | **否（完全对齐）** |
| **F16** | 远程 `Agent`：对标主定制、经 Mux 连回、单层限制、本机 Parquet 批次落盘写回（`01a18e1f #9c291fe2, #8e0a7e8f, #5a37a640, #3dbd0473`、`01a18e3a #09e1cc92`） | ① `generation_up.where = remote{runId}`；② 运行中读方列出 `soroi-batch` 已改名 `.parquet`；③ 远程子 agent 内 `soroi_eval` 与 `soroi_task` 均不可用；④ 提交后 `/runs/{run}/progress` 可查批次行；⑤ `<id>.jsonl` 写回中心且 `history://<id>` 可读；⑥ Stack 与卷已删除 | **否（完全对齐）** |
| **F17** | 远程 `status`/`tail` 观察、运行中进度只读可见且汇入前不可复用、远程 `abort`（`01a18e1f #2dbf970b, #bfd6975c, #d1baf561`） | S1 与 S2：① 运行中 `status=running`、`tail` 有输出、`/captures/{id}` 返回 404（未汇入不可复用）；② 读方拉取运行中远程 `Agent` 批次文件；③ `abort{run}` 终止远程 `Program` 容器与远程 `Agent`（transcript 回中心，写 `call_aborted`、`run_aborted`）；S2 算力页显示作业与日志尾部 | **否（完全对齐）** |
| **F18** | 远程运行结束后浏览完整 Runner Workspace（`01a18e3a #09e1cc92`、`01a18e1f #e3692177`） | S1 与 S2：`remote remove` 删远端容器与卷后，`GET /volumes/{run}/{step}/{pos}` 仍完整列出 `soroi/`、`in/`、`work/` 文件且字节哈希一致；S2 实验详情页可列出并预览 | **否（完全对齐）** |
| **F19** | 独立 RPC subagent 启动、父子/兄弟/广播 IRC 往返、忙时父 steer 与同辈排队（`01a18f4a #f488be08`、`01a18e1f #7bfe3696`） | ① `Alpha`、`Beta` 各自 `generation_up{where: local}`；② `Alpha ↔ Beta` IRC 往返并唤醒 `wait`；③ `Alpha` 跑 `slow_step` 时父消息在本轮结束前 steer 入 transcript，兄弟消息排队在本轮之后；④ `agent://all` 广播全员收到 | **否（完全对齐）** |
| **F20** | Subagent 空闲超时停驻（Park）、唤醒死会话、Agent Hub kill（Tombstone）与复活（`01a18e1f #678fe41a`、`01a18f4a #f488be08`） | PTY 实测：① 空闲超时 `generation_down`、进程退出、`.jsonl` 保留；② 发消息触发新 `generation_up` 续写同一 `.jsonl`；③ Agent Hub 按 `x` 生成 `.tombstone` 并 `generation_down`；④ 再发消息删 `.tombstone`、起新一代并回复 | **否（完全对齐）** |
| **F21** | 主进程 `--resume` 重启找回历史 subagent、只读查看 `history://` 不唤醒、发消息冷复活（`01a18e1f #678fe41a, #2dbf970b`、`01a18f4a #f488be08`） | PTY 退出重开 `omp --resume`：Agent Hub 列出 `Alpha` 为 `parked`；`read history://Alpha` 期间无 `generation_up`；发消息后 `generation_up` 并追加同一 `.jsonl` | **否（完全对齐）** |
| **F22** | 一步平铺多条调用并发执行多路算法、来源提醒与下一步汇总比较，无 `fork`（U24、`01a18e8a #4da22ab4`、`01a18ed5 #ea638181, #b7357c72, #13abc2a1`） | ① 一步平铺 5 条不同参数子集的 `run_*`，先 `dry_run` 再 `formal`，`/activity` 区间相交，同属一个 `step_committed` 一次提交；② 下一条 prompt 不给名字，AI 靠提醒把 5 个产出名传给 `compare_scores`；③ 根会话工具无 `fork`、`fork_task` | **否（完全对齐；见下方提示 2）** |
| **F23** | GUI 改值：中止在途调用、`Human` 捕获替代、通知 AI 并触发下游消费（`01a18e1f #ba5ad307, #d1baf561`） | S1 与 S2：`slow_step` 在途发 `takeover`，runner 进程消失，提交带 `call_aborted`、`human_handback`，来历 `Human` 且 `replaced` 指向原调用，同一步下游调用自动消费新值且工具结果标为 `human`；S2 页面改值一致 | **否（完全对齐；见下方提示 1）** |
| **F24** | GUI 改参数或函数体：派生新正式运行并按身份复用上游（`01a18e1f #ba5ad307, #a0d22b8a`） | S1 与 S2：覆盖 `InFlight` 与 `Committed` 两种；派生出 `R'`（`derivedFrom = P`，P 写 `run_aborted` 且原历史图不变），`R'` 上游 `call_inherited` 无执行区间，被改调用以新输入或新版本正式执行，根会话收到人类来源 IRC 开启新一轮 | **否（完全对齐；见下方提示 3）** |
| **F25** | GUI 经 IRC 接管 subagent：带人类来源、忙时排队与投递前编辑/撤回（`01a18e1f #7bfe3696`、`01a18f4a #f488be08`） | S1 与 S2：`Alpha` 忙时发两条 `mux_human_irc`，第一条 `edit`、第二条 `withdraw`，transcript 在该轮之后只出现编辑后的第一条且来源为 `human:<principal>`；S2 对根会话与子 agent 各验证一次 | **否（完全对齐）** |
| **F26** | GUI 直读 store 渲染运行 DAG、SSE 实时订阅更新、经 Mux 只读观察任意 agent（`01a18e1f #64246eaf, #2dbf970b`） | S1 与 S2：`graph` + `stream` 续订；读方收子 agent 全部 stdout 且发 `prompt` 被拒；S2 实验详情页节点等于 `graph`，新提交一步免刷新出现新节点，点开 Agent 节点可见工具调用流 | **否（完全对齐）** |
| **F27** | GUI 渲染未走完的运行与草稿画布，绝不把 `dry run` 写进 store（`01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c, #e3692177`） | S1 与 S2：未结束运行 `graph.unconsumed` 非空，`dry_run` 前后 `seq` 不变；S2 画出未消费出口，流程编辑器保存草稿入 `lab.sqlite` `draft` 表且 store `/runs` 零新增 | **否（完全对齐）** |
| **F28** | 节点库 TS 文件持久化、后续 `eval` 按名调用、GUI 列出签名与默认环境（`01a18e1f #47b71e05`、`01a18e8a #50f5cf06, #e7747df0`） | S1 与 S2：新根会话按名调用 `calc` 成功；S2 节点库页列出 `LIB-01` 全部节点，参数、默认值、返回字段、体、默认环境与源码一致 | **否（完全对齐）** |
| **F29** | 修改节点库函数前的影响校验与不可变版本追溯（`01a18e1f #e3692177, #a0d22b8a`） | S1 与 S2：`/functions/calc/usage` 列出引用运行；修改 commit 后产生新版本哈希，旧捕获 `/versions/{旧}` 不变；S2 `library.stage` 显示影响运行列表，`library.apply` 生成 commit 并快进检出 | **否（完全对齐）** |
| **F30** | 运行起止事件驱动自动化与人工审批门禁（`01a18e1f #e818d410, #e3692177, #85b259a5`） | S1 与 S2：`/stream/lifecycle` 推送 `run_started` / `run_ended`；S2 规则 A-01 触发 `Automation` 会话将结论写回关联讨论，“需批准”规则停在 `waiting`、浏览器点击批准后才启动会话 | **否（完全对齐）** |
| **F31** | Pepgent 从讨论装载产物、启动实验并调用 soroi 作为 agent 核心走通全链路（U1、U2、U23、`01a18e1f #e818d410, #e3692177`） | S2 真实浏览器按序走完 FC:496-501 六步（含本机/远程 Komodo `Program` 与 `Agent`、实时 DAG/subagent 流/日志尾部、F23 与 F24 介入、数据集与 Runner Workspace 浏览、A-01 复盘写回讨论），每步三处核对，且 Lab 仅经 D8-04 四条线调用 soroi | **否（完全对齐）** |
| **F32** | 基于真实运行识别并交付 Pepgent 与 soroi 之间缺失的“点、线、面”报告（U1、U23） | `D9-gap.md` 按 §5 完成：覆盖 `LabSnapshot` 全部 18 个顶层字段、每项引用 `evidence/e2e/…` 真实运行证据、`D8-16` 清单逐项归类，并经领导小组表决 | **否（完全对齐）** |

> **非阻塞执行细化提示（供编写 `E2E-13`、`E2E-15`、`E2E-20` 脚本与 runbook 时直接带入，不改变 D8 表结构）：**
> 1. **F23 的跨步提醒格式（对齐 `D5-13`）：** F23 已验证同一步内的下游调用自动消费人类接管值及工具结果标记 `human`；若被 `takeover` 的调用产出在新一步被消费，提醒行格式按 `D5-13` 为 `← human 替代 fn(参数)`（与 F08 的主动 `← human` 区分），可在 `s1/f23.spec.ts` 中顺带断言。
> 2. **中心 worker 批次释放提醒（对齐 `D5-07`、`D5-12`）：** F22 验证了单步内 5 条平铺调用并发；`SOR-03` 与 `SOR-12` 已涵盖中心 worker（`writesEval: true`）写步与同批全部交回后释放（带 `purpose` 组头），在 `E2E-13`（涵盖 F07、F19、F22）中把 `SOR-12` 的多 worker 批次释放一并记入 verdict 即可。
> 3. **F24 S2 的参数修改与函数体修改：** F24 判据正文已写明“`ChangeVersion` 的新函数体，S1 由脚本直接 commit 进 `lab-library`；S2 走 `library.apply`。S2：在实验详情页改参数，导航能显示‘派生自’”；在 `e2e-lab/F24.md` 中确保 S2 同时覆盖页面改参数派生与经 `library.apply` 改函数体派生两条子路径。

---

## 三、对全部 16 个决策项的逐行选票（D8-01 至 D8-16）

| ID | what | 起草分类 | 缺失/补充? | Argon 意图判定 | Argon 投票 | 裁决 / 投票理由（附 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- |
| **D8-01** | MVP 的定义：F01–F32 全部，不取子集 | 意图 | 是：U23 | **【定 · 符合原意】** 完整落实 **(U) `LEDGER.md` U2、U23** | **赞成** | 将 §3 矩阵全部 32 条用户流程 100% 通过作为 MVP 唯一判据，拒绝只做子集的收缩方案，也拒绝把用户未说过的流程混入 MVP 门槛；外围已定项由 `D8-16` 完整送入 D9。 |
| **D8-02** | 验收的分段与前置项（A0、S1、S2） | 串联 | 否 | 【定】落实 `D2-25` 与 **(U) `LEDGER.md` U23、U24** | **赞成** | A0 验证干净上游 omp 独立定制安装，S1 由 `LabStandIn` 独立验证 soroi 协议面，S2 由真实 Lab 后端加真实浏览器验证“作为 Pepgent 的 agent 核心”，两段之差直接构成 D9 的“线”证据。 |
| **D8-03** | 完整 soroi omp 定制的打包与在干净 omp 上的安装 | 技术 | 是：U23 | **【定 · 符合原意】** 落实 **(U) `LEDGER.md` U13、U23、U24** 与 `01a18e1f #9c291fe2` | **赞成** | 产出内容寻址 `soroi-<sha256>.tar`，中心与远程安装同一份 tar；A0 在 `ls -A $HOME` 为空、无 `~/.omp` 的 `IMG-01` 容器中用 PTY 逐类验证扩展、agent、技能、规则、设置五类全部生效，彻底证明不依赖本机 `omomp`。 |
| **D8-04** | MVP 中 Pepgent 怎样把 soroi 当作 agent 核心使用 | 串联 | 否 | **【定 · 符合原意】** 落实 **(U) `LEDGER.md` U1、U23** 与 `D7-20` | **赞成** | 严格限定 Lab 进程只经 `D7-20` 四条线（写方 `dial`、`store` HTTP/SSE、控制端点、RPC host tools）加 Lab 库 `.omp/` 调用 soroi，不 import soroi 内部包；`LabStandIn` 严守纯协议边界，不复刻 Lab 业务逻辑。 |
| **D8-05** | 测试环境：中心主机就是本机（OrbStack + 隔离 Komodo + Slurm） | 技术 | 是 | 【定】符合 **(U) `LEDGER.md` U4（R31）** 与 OrbStack 台账规则；【暂定】容器拓扑与 `*.orb.local` 寻址 | **赞成** | 复用本机已实测通过的 OrbStack Slurm（`slurmrestd` + JWT + Apptainer）与隔离 Komodo 环境，S1（`pepgent-soroi-e2e`）与 S2（`pepgent-central`）各自独立 store 卷，满足真实容器与集群运行要求。 |
| **D8-06** | e2e 中每个 omp 进程的模型凭据（`auth-broker` + `auth-gateway`） | 技术 | 是 | 【定】遵守凭据规则与 `D4-10`，模型顺序遵守 omp 维护规则；【暂定】broker/gateway 注入拓扑 | **赞成** | 用 `omp auth-broker` + `omp auth-gateway` 分发消费方专属 client token，provider 长期凭据永不进发行 tar、`RunRequest.env`、镜像或拷回的 volume。 |
| **D8-07** | e2e 的节点库（`Pepgent/lab-library`） | 实现 | 否 | 【定】节点为普通 TS 文件、含 `package.json` 依赖还原与 `.omp/agents/`（**(U)** `01a18e1f #47b71e05`、`01a18e8a #50f5cf06, #8d913d2f, #f4c96767`） | **赞成** | 用真实 `Pepgent/lab-library` git 仓库承载 `calc`、`anneal`、`slow_step`、五路 `run_*`、`compare_scores`、`review`、`ask_human` 及纯 JS 依赖包，同时支撑 S1 与 S2 的版本演进和影响校验（F14、F28、F29）。 |
| **D8-08** | 驱动 H1：`LabStandIn`（RPC 驱动） | 技术 | 是 | 【暂定】S1 测试驱动技术设计，无冲突 `(U)` 原话 | **赞成** | 在 `central` 容器内按 `D3-07` 完整走写方与读方生命周期（声明、开代、`dial`、`ready`、`prompt`、读事件、控制端点、store），且对 F02、F22 不给 atom 名以真实检验未消费提醒。 |
| **D8-09** | 驱动 H2：PTY 中的真实 omp | 技术 | 是 | 【定】对标 omp 内置 subagent TUI Agent Hub 与 `--resume` 生命周期（**(U)** `01a18e1f #678fe41a`、`01a18f4a #f488be08`） | **赞成** | 针对 RPC 未暴露的 CLI/TUI 入口（A0 探针、F20 Agent Hub 按 `x` kill、F21 `omp --resume`），在 `central` 容器内用有界 PTY 脚本驱动真实 `omp`，跑完即退。 |
| **D8-10** | 驱动 H3：真实浏览器走 Lab 页面 | 技术 | 是 | 【定】符合 **(U) `LEDGER.md` U2、U23** 与端到端 runtime 验证规则 | **赞成** | 用 `agent-browser` 驱动真实 Chromium 登录构建好的 `pepgent-central` 宿主，按 runbook 在页面截图、`/api/lab/*` 网络响应与权威方副作用（`lab.sqlite`、`store`、`Mux`、`remote`）三处核对。 |
| **D8-11** | 判定只看事实，不看模型措辞 | 技术 | 否 | 【暂定】测试断言准则，无冲突 `(U)` 原话 | **赞成** | 强制所有断言锚定在 `store`、`Mux`、RPC 结构化工具结果、`remote`/Komodo/`slurmrestd`、transcript、`lab.sqlite` 与页面数据的下游事实，杜绝把模型措辞或单纯 HTTP 200 当作通过证据。 |
| **D8-12** | 证据格式与归档位置（`Pepgent/PM` `evidence/e2e/`） | 实现 | 否 | 【定】落实 **(U) `LEDGER.md` U20（R49）** 关键产物进 git | **赞成** | 每个流程归档机器可读的 `verdict.json` 及 `rpc.jsonl`、`store/`、`remote/`、`browser/`、`pty/`、`README.md`（脱敏），直接供 D9 机器读取比对。 |
| **D8-13** | 垂直集成的顺序：先打通最薄的端到端（VS1、VS2），再按波次加宽 | 技术 | 是 | 【定】服务于 **(U) `LEDGER.md` U2、U23** 全流程端到端交付；【暂定】波次编排 | **赞成** | VS1 先打通“干净 omp 装发行 tar + Mux dial + `soroi_eval formal` + store `run_ended`（F01）”，VS2 紧接着打通 Lab 写方调用脊柱，使跨组件接缝在最早期暴露，随后 W1–W7 有序加宽。 |
| **D8-14** | 切片的粒度、档位、仓库归组与交付流程 | 实现 | 否 | **【定 · 符合原意】** 落实 **(U) `LEDGER.md` U2、U11、U25、U26** | **赞成** | 104 个切片按单仓单块切分并构成依赖 DAG，大量启用 `low`（71 个）与 `free`（1 个，由 `low` 复核），`high` 只留给 U11 要求的定制内容设计与 D9 归类判断（4 个），由 tern 中独立 omp 进程交付。 |
| **D8-15** | D9 的方法：从真实运行中盘点点、线、面 | 意图 + 技术 | 是：U23 | **【定 · 符合原意】** 落实 **(U) `LEDGER.md` U1、U23** | **赞成** | 以 S1/S2 全部 `verdict.json`、S2 页面线数据录制、`LabSnapshot` 18 个顶层字段的叶子清单、D2–D7 占位表与 `D8-16` 清单为输入，按 A/C/K/U 四类机械判定来源并严格归入“点、线、面”，每项附证据路径。 |
| **D8-16** | D2–D7 已定、但任何 F 流程都走不到的部分：不进 MVP 验收，原样列入 D9 输入 | 意图 | 是 | **【定 · 符合原意】** 落实 **(U) `LEDGER.md` U1、U2、U23** | **赞成** | 既守住 U23“走通我说的所有流程”（不把未要求的外围功能变成 MVP 阻塞项），又通过 §5.4 强制逐项在 D9 中得出“面 / 线 / 点 / 已覆盖”结论，确保零遗漏。 |

---

## 四、一票否决审查（对“缺失部分或设计补充”条目的审查）

- **否决结论：0 项否决（无否决）。**
- **审查说明：** 依 U11 与 U20（D1-16），对表中全部 10 个标为“缺失部分或设计补充 = 是”的条目（`D8-01`、`D8-03`、`D8-05`、`D8-06`、`D8-08`、`D8-09`、`D8-10`、`D8-13`、`D8-15`、`D8-16`）及 §3 `F01`–`F32` 验收矩阵逐项核对 `pepgent-soroi/LEDGER.md`（U1–U29）与 `pepgent-pm/evidence/argon/flow-catalog.md` 中的全部 `(U)` 用户原话证据，均无违背用户原意、无擅自收缩范围、无 `omomp`/`fork` 混入，不行使一票否决权。
