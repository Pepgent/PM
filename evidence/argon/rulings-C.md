# Argon 意图裁决（C-1 至 C-5）与各议题用户原意硬约束清单

## 一、C-1 至 C-5 逐条意图裁决

每条均拆分**意图面**（由 Argon 裁决）与**技术实现面**（交 leader 技术取舍，并写明不得突破的意图约束）。

---

### C-1：宿主边界——“自有的 omp fork（可改运行时后端）” vs “以 omp 为核心、不改 omp 宿主代码、只做插件”

- **问题拆分与裁决：**
  - **【意图裁决（Argon）】** **裁定为“以 omp 为核心，严禁修改 omp 宿主核心代码，soroi 的宿主侧能力全部以 omp 插件/扩展实现”。**
    - 用户在 10-31 03:13 探索阶段曾提过“打算给 omp fork，可能加 eval 的运行时后端”，并在 08:12 让建了 `Pepgent/oh-my-pi` 仓库；但在 09:12 与 11-01 的最终指令中已明确收口为硬性禁令：**不可以改 omp 核心，必须只能是插件**；**不能偏离以 omp 为核心，不修改 omp 的宿主代码**。
    - `design/soroi.md:7,23` 与 `design/eval.md:3` 中关于“宿主是自有的 omp fork”“omp fork 可能为 eval 增加新的运行时后端”的表述违背最终用户本意，予以**否决并直接修正**。
  - **【交 leader 技术取舍】**
    - 在不修改 omp 宿主代码的前提下，`omp-soroi-eval` 与 `omp-soroi-subagent` 两个插件如何通过 omp 现存公开扩展接口（`ExtensionAPI`、`AgentRegistry`、`AgentLifecycleManager`、`RpcClient` / `--mode rpc`、hooks、custom tools、internal URL router）完成挂载与协作，以及 `Pepgent/oh-my-pi` 仓库仅作为对齐/构建发布用途还是归档不用，交由 leader 做技术取舍。
    - **意图约束：** 任何技术方案不得向 omp 宿主源码打补丁、不得要求修改 omp 内置模块或新增私有宿主改动。
- **依据的 `(U)` 证据：**
  - `(U)` `AGENTS.md` **U13**（`session://01a193fd-e992-76d2-8c29-060fe52cc094`）：“对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  - `(U)` `AGENTS.md` **U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`）：“soroi本身相当于只是omp的扩展组件”
  - `(U)` `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`（2026-10-31 09:12:17）：“不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯”
- **受影响的文件与行：**
  1. `design/soroi.md:7`
  2. `design/soroi.md:23`
  3. `design/eval.md:3`
- **替换文本（完整段落）：**
  - `design/soroi.md:7`（连同 C-2 一起替换 `design/soroi.md:5-18`，见 C-2）：
    > soroi 是 omp 的扩展组件，以插件接入宿主 omp，不修改 omp 的宿主代码，也不在 harness 外面另搭控制面。捕获和追踪都在引擎里，不在宿主或执行层里；执行层只需要会运行。
  - `design/soroi.md:23` 替换为：
    > 节点文件和 eval 里的步都用 TS 写，类型由 TS 检查，不考虑 Python。soroi 要兼顾能力较弱的模型。
  - `design/eval.md:3` 替换为：
    > eval 是 soroi 的一个 omp 插件提供的工具，不修改 omp 的宿主代码；它和 omp 内置的 `eval` 是两个工具。同一个插件还提供交回工具和未消费提醒。程序按纯函数式的方式来写：只有定量，没有变量，一切不可变，所以每一个中间结果都是一个确定的值，都能被完整捕获，方式类似 jotai。

---

### C-2：组件归属——`remote` 列入 soroi 组成表 vs `remote` 本质上不属于 soroi、独立存在

- **问题拆分与裁决：**
  - **【意图裁决（Argon）】** **裁定 `Pepgent/remote` 是 Pepgent 下的独立程序与独立组件，不属于 soroi；soroi 的中间件只是 `remote` 的客户端之一。**
    - `design/soroi.md:16` 在 `## 组成` 表中把 `remote` 列为 soroi 的内部组成部分（执行层），混淆了组件所有权边界，违反用户在 U1 中对 `remote` 归属的明确界定，予以**修正**。
  - **【交 leader 技术取舍】**
    - soroi 中间件以 CLI 子进程调用还是 library/HTTP 方式调用 `remote`，以及输入/输出 URL 由哪个服务承载，交由 leader 技术取舍。
    - **意图约束：** `remote` 必须保持对 soroi 零感知（不知道 atom、捕获、store 或 omp 的存在）；不能把 soroi 专属语义塞进 `remote`，也不能把 `remote` 吞并进 soroi 仓库。
- **依据的 `(U)` 证据：**
  - `(U)` `AGENTS.md` **U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`）：“对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在”
  - `(U)` `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/5d27138c`（2026-10-31 05:00:31）：“remote的部分我认为是可以单独实现的”
  - `(U)` `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6`（2026-10-31 05:01:28）：“然后还有一点，remote实际上是单独的程序”
  - `(U)` `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/b45cd22c`（2026-10-31 05:52:11）：“这是pepgent的仓库，这是独立程序，单独去开私有仓库”
- **受影响的文件与行：**
  - `design/soroi.md:5-19`
- **替换文本（合并 C-1 与 C-2 后的 `design/soroi.md:5-19` 完整段落）：**
  ```markdown
  ## 组成

  soroi 是 omp 的扩展组件，以插件接入宿主 omp，不修改 omp 的宿主代码，也不在 harness 外面另搭控制面。捕获和追踪都在引擎里，不在宿主或执行层里；执行层只需要会运行。

  | 部分 | 组件 | 文档 |
  | --- | --- | --- |
  | 引擎 | store | [`store.md`](store.md) |
  | 引擎 | 节点函数的构造器、`stop`、中间件 | [`eval.md`](eval.md) |
  | 宿主插件 | eval、交回工具、未消费提醒 | [`eval.md`](eval.md) |
  | 宿主插件 | subagent | [`subagent.md`](subagent.md) |
  | 人类介入 | 中止捕获、`Human` 捕获、派生运行 | [`intervention.md`](intervention.md) |
  | 执行层 | 执行底座：运行有副作用的部分 | — |

  远程运行由 Pepgent 下独立存在的外部组件 [`Pepgent/remote`](https://github.com/Pepgent/remote) 提供，不属于 soroi；soroi 的中间件作为客户端调用它。

  AI4S 原型要求 soroi 补的设计层见 [`layers.md`](layers.md)。
  ```

---

### C-3：远程 `Agent` 运行中可见性——`store.md:70`“写回前对别处不可见” vs 运行中实时进度推送

- **问题拆分与裁决：**
  - **【意图裁决（Argon）】** **裁定：远程 `Agent` 运行期间，其本地批次目录中的进度与写入中产物对只读观察方（GUI 等）经网络层可见；但其产出的值在运行结束写回中心副本之前，不进入中心副本，因此不能被其他运行按身份复用，也不能被其他步当作已写入中心 store 的正式记录使用。**
    - `design/store.md:70` 原文“正在运行的远程 agent，结果在写回前对别处不可见”把“不入中心副本、不可跨运行复用”误写成了无差别的“对别处不可见”，直接与同文 `:64,78,85` 及 `design/layers.md:13,23,41` 冲突，予以**修正**。
  - **【交 leader 技术取舍】**
    - 远程运行环境如何通过独立网络层把本地 Parquet 批次目录和在途产物进度推送给只读订阅方，交由 leader 在网络层议题中做技术取舍。
    - **意图约束：** 严禁为了让 GUI 看到实时进度而让远程 `Agent` 在运行中直接并发写中心 DuckLake 数据库（违反 `01a18e1f #8e0a7e8f`“本机落盘，运行结束后随拷贝一起回集中副本”）；严禁跨运行消费正在运行中的未汇入 atom（违反 `01a18e1f #63f31453`）。
- **依据的 `(U)` 证据：**
  - `(U)` `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/8e0a7e8f`（2026-10-31 05:35:38）：“对于运行中的数据，实际上他们各自是独立的db，而只有运行结束后，才会随着拷贝一起回集中副本，根本没有并发不并发写入的问题，而写入这事，本来就应该本机落盘，而不是，有一堆集群，维护一个中央的数据库全写一个库”
  - `(U)` `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/bfd6975c`（2026-10-31 05:37:17）：用户对紧邻的 `#fecb24a3`（运行中的图与进度经网络层只读本地库，汇入中心前结果不能给其他运行复用）明确拍板“我认为差不多都敲定了，先写文档”。
  - `(U)` `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/63f31453`（2026-10-31 08:18:31）：“跨会话消费从头到尾就是错的，听不懂？难道要开好几个atom互相看见atom？那我拆你妈库呢”
- **受影响的文件与行：**
  - `design/store.md:70`
- **替换文本（完整句子）：**
  - `design/store.md:70` 替换为：
    > - **写回前不入中心副本、不可复用。** 正在运行的远程 agent，运行中的进度可由读方从它的批次目录读取或经网络层订阅；但它产出的值在写回中心副本前不进中心副本，不能被别的运行按身份复用。

---

### C-4：Subagent 嵌套边界——“禁止远程 agent 再开远程 agent” vs 插件超时自决“一刀切禁止所有子进程开 soroi subagent”

- **问题拆分与裁决：**
  - **【意图裁决（Argon）】** **否决实现者在 `ask` 超时后自行决定的“所有子 agent 一律禁止再开 soroi subagent”。裁定用户原意为：**
    1. **`eval` 只在中心主机运行，且 `eval` 禁止递归嵌套**（即 `Agent` 节点函数内部不能再调用 `soroi_eval`）；
    2. **中心主机上主 agent `fork` 出来的分身与主 agent 一样在中心主机写 `eval` 步，必须允许其在 `eval` 步中调用 `Agent` 节点函数（即启动 soroi subagent）**；
    3. **远程 `Agent` 节点函数在远程环境里怎么执行由它自己决定（可用内置进程内子任务），但严禁远程 `Agent` 再开远程 `Agent`（单层远程限制）。**
  - **【交 leader 技术取舍】**
    - 在 `omp-soroi-eval` 与 `omp-soroi-subagent` 中，中心主机的 `fork` 分身调用 `Agent` 节点时，是由该分身直接经插件注册进根会话 `Supervisor`，还是经 host bridge 委托中心主进程 `Supervisor` 统一 spawn 并归入根 `AgentRegistry`，交由 leader 做技术取舍。
    - **意图约束：** 必须保证中心 `fork` 分身能正常执行含 `Agent` 节点的 `eval` 步；必须保证远程 `Agent` 无法再启动远程 `Agent`，且 `Agent` 节点内部无法调用 `soroi_eval`。
- **依据的 `(U)` 证据：**
  - `(U)` `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640`（2026-10-31 08:25:02）：“eval禁止递归嵌套，eval永远只有中心主机能运行”
  - `(U)` `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/3dbd0473`（2026-10-31 08:27:31）：“到底为什么要ducklake，是为了远程的agent准备的，你到底写的什么鸡巴东西，远程agent爱怎么执行怎么执行，但是不允许再接着开远程agent”
  - `(U)` `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/2c08aa6d`（2026-10-31 02:56:20）与 `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/ea638181`（07:22:25）：未消费 atom 可通过 `fork` 分身并发处理，各分身各自跑步骤产出新 atom。
  - `(R)` `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/57bc79eb`：证实 `nested_spawn` 限制是先前 agent 在 `ask` 超时未获用户回答后的自行裁剪，非用户批准。
- **受影响的文件与行：**
  - `design/subagent.md:20` 后新增一条要求，并修正 `design/subagent.md:50`（见 C-5 合并替换文本）。
  - 代码实现受影响位置（供 leader 安排工程师修改，Argon 不改代码）：`pepgent-omp-soroi-subagent/src/main/index.ts:28-31`、`pepgent-omp-soroi-eval/src/agent-body.ts`。

---

### C-5：Agent 结果交回通道——“唯一交回工具（交回结果与文件路径）” vs 插件“仅字符串 + 未调用时自动 fallback 最后一条回复”

- **问题拆分与裁决：**
  - **【意图裁决（Argon）】** **否决 `pepgent-omp-soroi-subagent` 中“当 subagent 未调用 `soroi_return` 就结束回合时，自动把 `lastAssistantText` 作为结果交回”的 fallback 行为；裁定交回工具（`soroi_return`）是 `Agent` 节点唯一合法的结果交回通道，且必须支持交回结构化结果与文件路径（`File`）以完成运行时产物捕获。**
    - 用户当初决定重写 subagent 的直接原因就是内置 subagent 走 `yield` 或最后回复不符合确定性工具捕获的需求（`01a18dd4 #49e6867a`、`01a18e1f #c1ef8567`）；保留“未调工具就拿最后文本交回”的 fallback 直接破坏了确定性捕获。
  - **【交 leader 技术取舍】**
    - `omp-soroi-eval` 与 `omp-soroi-subagent` 之间如何合并/对接 `soroi_return` 的 host tool schema（使 `omp-soroi-eval` 彻底替换掉内置 `runSubprocess` 占位，改为驱动 `omp-soroi-subagent` 并按节点函数返回类型校验标量/扁平对象与 `File` 路径），交由 leader 做技术取舍。
    - **意图约束：** 1. 严禁任何“不调用交回工具即自动拿普通回复文本当捕获结果”的 fallback；2. 交回工具在宿主侧执行，收到文件路径即触发中间件取回并存入 store；3. `omp-soroi-eval` 的 `Agent` 节点必须真正运行在 `omp-soroi-subagent` 上，不能停留在内置 `runSubprocess` 占位。
- **依据的 `(U)` 证据：**
  - `(U)` `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a`（2026-10-31 02:43:29）：“而，agent的捕获，是纯粹的 自动以工具行为，就比如subagent在omp中必须调用yield返回给主agent信息。那么自定义工具，直接接受subagent给的文件路径，就等于捕获运行时产物，而这个类jotai的中间件，自己完成整个传输和管理部分。”
  - `(U)` `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/c1ef8567`（2026-10-31 04:44:03）：“而omp内置的subagent必须走yield还和我们的需求不太符合，那就这么决定，重新实现subagent，文档该重写的重写”
  - `(U)` `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/4567dcfd`（2026-10-31 09:09:41）：“第三方subagent现在由别人处理，你用内置subagent先当占位符占着”（证明内置 subagent 只是当时并发开工时的临时占位，集成时必须替换成新 subagent 插件）。
- **受影响的文件与行：**
  - `design/subagent.md:20` 及 `design/subagent.md:50`
  - 代码实现受影响位置（供 leader 安排工程师修改，Argon 不改代码）：`pepgent-omp-soroi-subagent/src/main/supervisor.ts:309-328,459-470`、`pepgent-omp-soroi-subagent/README.md:21`、`pepgent-omp-soroi-eval/src/agent-body.ts:1-69`。
- **替换文本（合并 C-4 与 C-5 后的 `design/subagent.md` 替换段落）：**
  - `design/subagent.md:20` 替换为两条：
    ```markdown
    - **结果只经交回工具交回，不走 `yield` 或最后一条回复。** 交回工具是唯一的结果通道，交回结果和文件路径，见 [`eval.md`](eval.md) 的“捕获的三种来源”。
    - **单层远程，中心可分身调用。** 中心主机上的主 agent 和它 `fork` 出的分身都可以启动 subagent 运行 `Agent` 节点函数；远程 subagent 不能再开远程 subagent（见 [`eval.md`](eval.md) 的“存储”）。
    ```
  - `design/subagent.md:50`（在 `未覆盖的有四项` 中）替换为：
    ```markdown
    - 中心分身再开 soroi subagent 还没有做（当前插件一刀切禁掉了所有子进程再开 soroi subagent，而要求只禁止远程 subagent 再开远程 subagent）；
    ```

---

## 二、遗漏议题与半截设计的“用户原意硬约束清单”（供起草决策项表遵守）

以下只列有明确 **`(U)` 用户原话证据** 的硬约束；违反任一条硬约束的决策表条目将被 Argon 行使一票否决权。

### 1. 三个遗漏的核心议题

#### 议题 I：独立网络层与中心化 omp RPC 多路复用器（Mux）
1. **必须位于独立的网络层，包含中心化的 omp RPC 多路复用器：** 远程运行的容器/机器通过这个独立网络层连回中心主侧，且在同一网络内应属于标准 OCI 行为，不要求业务容器具备额外特权能力（`(U)` `01a18e3a #09e1cc92`）。
2. **必须支持 RPC 只读层面的多路复用，使任意 agent 对 GUI 可见：** subagent 本身以 RPC 启动，GUI 等观察方通过 RPC 只读多路复用器看见任意 agent，而不抢占唯一控制写方（`(U)` `01a18e1f #2dbf970b`）。
3. **支持带来源的 IRC 投递与人类接管：** omp 的 subagent 语义里一切指令都是可辨识来源的 IRC，人工接管同样走这条普通 user prompt / IRC 路径，支持排队与人类编辑（`(U)` `01a18e1f #7bfe3696`、`01a18f4a #f488be08`）。

#### 议题 II：完整 Pepgent 平台组件归属与缺失组件规划
1. **soroi 只是 omp 的扩展组件，绝不等于完整 Pepgent：** 严禁把完整 Pepgent 收缩成“只做完 soroi 插件”，也严禁把所有平台业务组件都塞进 soroi 内部（`(U)` `AGENTS.md` **U1**、**U2**，`01a193fd #57d9d58b, #8544bdb8`）。
2. **组件按职责独立存在：** 像 `remote` 一样，Pepgent 下的独立基础设施/执行组件本质上不属于 soroi（`(U)` **U1**，`01a18e3a #3afc3fb6, #b45cd22c`）。
3. **业务应用层在 `pepgent/pepgent`，AI4S 原型即业务层需求：** 核心反转后业务层大体保留（首页、讨论、数据集、实验与实验图、流程编辑器、节点库、Sandbox 集群、接入集群、容器设置、自动化、设置）；前端本轮做了 typed fixture 纯 UI，后续必须补齐缺失后端组件并走完“设计 → 补充 → 开仓 → 实现 → e2e 测试”全流程（`(U)` **U1**、**U2**；`01a18e1f #e818d410, #e3692177`；`01a192a2 #ed4570ad`）。
4. **允许采用成熟、开源、协议友好的现成方案，但核心 AI harness 必须以 omp 为核心且不修改 omp 宿主代码：** 不必所有组件都从零自造，但不得恢复已被废除的旧 Pepgent 业务仓设计文档（如旧 `ConfigGet/Check/Proposal` preset 控制面）（`(U)` **U13**；`01a192a2 #ed4570ad`；`01a18dd4 #28767d47`）。

#### 议题 III：远程 `Program` 与远程 `Agent` 的可执行交付与依赖闭合
1. **远程 `Program` 不能简化成单纯拼命令字符串，必须处理依赖（含 `package.json`）并在目标环境还原成 TS 执行：** `(U)` `01a18e8a #8d913d2f`（“你看起来好像是构建命令，而实际上，你还得处理依赖，并把它还原成ts文件，在目标环境执行”）、`#f4c96767`（“然后还有一点是，package.json怎么办”）。
2. **文件进出统一走自动生成的临时 volume 与自动拷回：** 构建容器模板时可设默认挂载路径、运行时可覆盖；运行时创建临时 volume，结束后全自动把文件拷回，容器与临时 volume 随时可删（`(U)` `01a18e3a #09e1cc92`）。
3. **远程 `Agent` 必须对标主 agent 定制，沿用既有生命周期，补齐部署与服务发现：** 远程 `Agent` 若不带与主 agent 对标的 omp 定制，捕获便无从谈起；本机与远程只差在启动与连接位置，生死全部遵照 omp 既有生命周期，并能唤醒早已死掉的 session（`(U)` `01a18e1f #9c291fe2, #678fe41a`；`01a18f4a #f488be08`）。
4. **`remote` 保持三后端（Komodo、Slurm HTTP、K8s）共享抽象与中间层，首期实现 Komodo，Slurm 反对用 SSH：** `(U)` `01a18e3a #c5030836, #93b7f0b4, #d5414f59, #e5b56608, #2366ef30, #56d362ca`。

---

### 2. 十一处半截设计的硬约束（E-1..E-5、S-1..S-3、I-1..I-3）

#### Eval 与节点函数（E-1 至 E-5）
- **E-1（单次调用 `env` 覆盖语法）：**
  - 调用处必須维持足够简单（传预构建模板名，不当场拼复杂容器/集群参数，`(U)` `01a18e3a #c5030836`）；
  - 严禁破坏“禁止魔法值字面量直接作为节点函数调用参数、禁止在步里定义 object/array”的语法纪律（`(U)` `01a18ed5 #13abc2a1, #276d1776`）。
- **E-2（两阶段 `dry run` / `正式运行` 调用签名与 `pins` 粒度）：**
  - `dry run` 从头到尾绝不写 store，成功与否直接看调用返回（`(U)` `01a18e8a #32b6f7fd, #a45ac248`；`01a18e1f #7ffcea0c`）；
  - `dry run` 可在 Slurm 等环境真试跑算法，对昂贵设备或 agent 用外部输入替代返回值，严禁侵入节点函数内部加 `ctx`/字符串注入点，也严禁凭空多造一份模拟定义文件（`(U)` `01a18e8a #48078e3a, #68d36f55, #11b35a1f, #88a4ef02, #18d55f0a`）；
  - 正式运行绝无模拟/替身档位（业务固定值直接写根 atom），绝不搞“锁定上一次的 eval”，也绝不让弱模型在测试后重新合并改写整份代码（`(U)` `01a18e8a #433e07ba, #a7f465d2, #8854f464`）。
- **E-3（`Pure<T>`、`Capture`、`Fn` 类型闭合与检查）：**
  - 表层变量不显式套 `pure(...)`，但底层必须保留 `Pure<T>` 类型以追踪派生与消费；捕获作为 HKT 能确定性区分 `Program` 体与 `Agent` 体，且追踪不必塞进 Effect 内部（`(U)` `01a18dd4 #afd96ce6, #01b74874, #946fc403, #cb9f395b`；`01a18e8a #cab573e1`）；
  - 顶层 atom 只能是纯标量或单 `File`（不嵌套 object/array），多输出必须返回一层扁平对象并在调用处穷尽解构（`(U)` `01a18ed5 #440c8605, #98d47f20`；`01a18e8a #e0de24df`）；
  - `eval` 只在中心主机运行，**禁止递归嵌套**（`(U)` `01a18e1f #5a37a640`）。
- **E-4（预定义函数库 / 节点库的持久化、导入与元数据）：**
  - 节点函数就是普通独立 TS 文件，不再是 preset 工作流语言；保留节点库的意义是“预定义一些东西持久化，下一次 eval 进来直接 import 后传参”（`(U)` `01a18e1f #47b71e05`；`01a18e8a #50f5cf06, #e7747df0`）；
  - 严禁为了节点库或值传递而把 `export` 名称当成 atom 实例（因为同一函数并发跑五次会产生五个实例，必须靠调用处绑定不同 atom 名区分，`(U)` `01a18e8a #4da22ab4`）。
- **E-5（并发批次与汇总转交）：**
  - 下游必须能从提醒中看清多个相近结果各自对应哪个算法与哪些参数（`(U)` `01a18ed5 #ea638181`）；
  - 同一批 `fork` 并发产出的 atom 必须全部正式运行完后一起交下游，默认由发起这批并发的父 agent 汇总，若转交其他分身汇总则附批次目的说明（`(U)` `01a18e8a #e0de24df` 整体吸收 `01a18ed5 #766ebed5`；严禁采用 `01a18e8a #574ae904` 超时自决的删减版）。

#### Store 与 GUI 读取（S-1 至 S-3）
- **S-1（全文检索 FTS 派生表与全路径写入）：**
  - 严禁把结构化数据先存一遍无意义的二进制，再在数据库里重复抄写完整反向索引（`(U)` `01a18e1f #543f0ccd`）；
  - 内容必须方便检索（`(U)` `01a18e1f #d6cf9b35`），且中心直接提交、人类介入、远程拷回汇入的所有正式记录都必须可检索。
- **S-2（运行生命周期、派生运行记录、身份复用记录）：**
  - 历史时间轴是极为重要的核心功能（`(U)` `01a18e1f #9ff9d2be`），但严禁发明“重放（replay）”机制（`(U)` `01a18efe #9e2d37a1`；`01a18e8a #21495b13`）；
  - 人类修改正在运行的参数或**函数体**并派生新闭包/新运行，永远是正式运行（`(U)` `01a18e1f #ba5ad307, #a0d22b8a`），运行记录必须能表达参数变更与函数体（版本）变更；
  - 严禁跨运行直接互见/消费 atom，运行之间只按身份复用已写入中心副本的正式记录（`(U)` `01a18e1f #64246eaf, #63f31453`）。
- **S-3（GUI 直读、草稿与跨运行比较）：**
  - GUI 直接读 Store，不再需要额外导出 workflow DSL（`(U)` `01a18e1f #64246eaf`）；
  - 严禁为了画草稿而把 `dry run` 写进 Store（`(U)` `01a18e8a #32b6f7fd`；`01a18e1f #7ffcea0c`）；
  - 必须支持多实例/跨运行结果对比（`(U)` `01a18e8a #4da22ab4`；`01a18e1f #e3692177`）。

#### 人类介入（I-1 至 I-3）
- **I-1（写了以后通知 AI 改变了）：**
  - 人在 GUI 写入后，值进入 store 并**必须通知 AI 发生了改变**，自动触发后续消费（`(U)` `01a18e1f #ba5ad307, #d1baf561`）。
- **I-2（`Human` 捕获与派生正式运行的边界，以及主动 `human` 节点）：**
  - 严禁多写方合并覆写旧值：人类改值等于取消正在运行的程序，原本要被程序消费的 atom 改由特殊的“人类接入（`Human`）”程序消费并产出新 atom；人类修改正在运行的函数体或参数派生新闭包/新运行，永远是正式运行（`(U)` `01a18e1f #ba5ad307, #d1baf561, #a0d22b8a`）；
  - 严禁以 ask 超时为由删掉 `Human` 体（`(R)` `01a18e8a #574ae904` 的超时自决无效）。
- **I-3（中止捕获与人工 IRC 接管）：**
  - 人工接管 subagent 必须复用 omp subagent 既有的 IRC 语义（可识别来源、普通 user prompt、可排队、可被人类编辑），不另造第二套控制通道（`(U)` `01a18e1f #7bfe3696`；`01a18f4a #f488be08`）；
  - 人类介入作为独立的一层由 `design/intervention.md` 持有，严禁在多个设计文档重复抄写同一规则（`(U)` `01a18e1f #2d06b34c, #6145f170, #f1f9c0b5`）。
