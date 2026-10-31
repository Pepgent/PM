# D2 组件图与归属 — Argon 全表选票与意图裁决

- **议题：** D2 组件图与归属（[Pepgent/PM#2](https://github.com/Pepgent/PM/issues/2)，定稿 `pepgent-pm/evidence/decisions/D2-components.md`）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **总体计票结论：** `D2-01` 至 `D2-25` 全部 **25 个条目一致投赞成票（25 赞成 / 0 反对 / 0 否决）**。
- **专项核对结论：**
  1. **D2-04 / D2-25 定稿核对：** `D2-components.md` 中的 `D2-04`、`D2-25`、仓库表及第 180、183 行已完整、如实反映 `pepgent-pm/evidence/argon/D2-rulings.md` 的裁决（`store` 归属 soroi 同仓 `Pepgent/soroi` 的 `packages/store` 同版本发布；`Pepgent/omp-rpc-mux` 保持独立成仓并由 `Pepgent/soroi` 的 compose 作为外部组件引入）。
  2. **U24 无 `fork` 残留核对：** 全文已彻底清除将 soroi 建立在 omomp `fork` / `fork_task` 分身之上的表述；`D2-01`、`D2-02`、`D2-03`、`D2-05`、`D2-25`、U23 流程覆盖表及第 32、156、184 行均明确“soroi 是基于上游 omp 的独立定制，不含 omomp 的 `fork` 或分身，中心并发写步由 `omp-soroi` 的 `subagent` 模块派出的中心 agent 承担”。

---

## 一、意图裁决（`D2-01`、`D2-04`、`D2-19`、`D2-25` 及 U24 并发写步意图确认）

依 U20 / D1-16，凡有直接 `(U)` 用户原话支撑的裁决标为 **`【定】`**；凡属 `(A)` 助手方案或技术具体化而无逐字 `(U)` 原话的标为 **`【暂定】`**。

### 1. `D2-01`（omp 宿主不动，分类：意图）—— **【定 · 符合原意，赞成】**
- **【定 · 宿主边界与去 fork】** 核心 AI harness 以 omp 为核心，严禁修改 omp 宿主代码，所有定制均通过插件/扩展接入；`Pepgent/oh-my-pi` fork 在组件图中无角色；主侧与子进程不要求版本一致，只要求 `--mode rpc` 正常通讯。
  - **(U) LEDGER U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`）：“soroi本身相当于只是omp的扩展组件”
  - **(U) LEDGER U13**：“对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  - **(U)** `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`（2026-10-31 09:12:17）：“不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯”
  - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a`（2026-10-31 04:39:09）：“pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理，而soroi的工作流程肉眼可见的可能会唤醒一个早就死掉的session”

### 2. `D2-04`（store 服务，分类：意图）—— **【定 · 符合原意（已如实反映 `D2-rulings.md`），赞成】**
- **【定 · 领域与仓库归属】** store 的值与记录权威属于 soroi 本身，归 `Pepgent/soroi` 单仓的 `packages/store` 与 soroi 定制同版本发布，不另开非 soroi 的 `Pepgent/store` 外部仓库。
  - **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/2d861491`：“所谓的捕获和记录，本质上只是omp里所需要的自定义插件罢了”
  - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`：“通常来说，以omp的视角来看，store天生是session log，但是，如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了”
  - **(U) LEDGER U23**：“对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
  - **对比：** 用户在 **(U) LEDGER U1** 与 `01a18e3a #3afc3fb6, #b45cd22c` 明确将 `remote` 划出 soroi 独立开仓，在 `01a18e3a #09e1cc92` 将中心化 omp RPC 多路复用器划入“独立的网络层”，从未把 `store` 划出 soroi。
- **【定 · 伴随进程不违背 U1 / U13 / C-1】** store 以只增不改、纯被动的单写方伴随常驻进程运行，从不决定下一步运行什么，既不修改 omp 宿主代码，也不是被废除的外部解释器+启动器控制面。
  - **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/6b25e5f7, #28767d47`；**(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/8e0a7e8f`（运行中各自本机独立落盘，运行结束后随拷贝回集中副本）。
- **【定 · 不建重复 FTS 反向索引、保留事件表时间轴、dry run 远程传输只经暂存区不进中心副本】**
  - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/543f0ccd`（05:29:58）：“如果，数据本身还要再在数据库里存一遍反向索引，等同于又写了一遍，那么原始的我二进制数据反而没有啥意义了，不如一开始就是搜索引擎”——直接对 DuckLake 文本列做 SQL 匹配、不建 FTS 派生索引（leader 裁决 B）严格契合此原话。
  - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9ff9d2be`（05:25:49）：“历史时间轴是个极为重要的功能”
  - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`（08:30:15）：“eval里所有的正式远程运行才需要进入store，任何非正式运行从头到尾都不进store，否则为什么叫非正式？”；**(U)** `01a18e8a #32b6f7fd`：“dry run根本没有store”
- **【暂定 · 进程拓扑与暂存区 HTTP 接口细节】** 单写方具体以独立常驻 HTTP 进程承载远程 copy-in/copy-out 暂存区与 SSE 订阅，源自 `(A)` `01a18e1f #99c65d16`（经 `(U) #bfd6975c` 拍板写文档）与技术细化，无冲突 `(U)` 原话，赞成。

### 3. `D2-19`（旧 Paseo、`_app` 与 `apps/hub` 保持不动，分类：意图）—— **【定 · 符合原意，赞成】**
- **【定 · 先不动旧线、不复用旧 AI 后端】**
  - **(U)** `session://01a19232-1c44-73ee-a77a-1ea7281a935e/entry/fa43ba92`（2026-11-01 00:36:56）：“先不动，因为还有别的地方的改动，先把页面做完”
  - **(U)** `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/cec515af`（2026-11-01 05:31:53）：“我认为现有的ai应该完全用不了，要大改，目前还是纯前端阶段，不要考虑后端”

### 4. `D2-25`（soroi omp 定制可安装整体，分类：意图）—— **【定 · 符合原意（已如实反映 `D2-rulings.md`），赞成】**
- **【定 · 符合 U23 完整定制与核心调用要求】** `Pepgent/soroi` 单仓交付 `packages/omp-soroi`（eval 与 subagent 模块）、`agents/`、`skills/`、`rules/`、设置覆盖、同仓 `packages/store` 服务及 compose（一并拉起 store 与外部 `Pepgent/omp-rpc-mux`），脱离 `Pepgent/Pepgent` 即可独立走通用户说过的全部流程，并能作为 Pepgent 的 agent 核心被调用。
  - **(U) LEDGER U23**：“对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
- **【定 · 符合 U24 独立定制与去 omomp / 去 fork】** 本定制只依赖上游 omp，不包含也不依赖 omomp 的任何组件（`fork_task` 分身、todo-more、peers、tern、watchdog 及本机提示词/agent 定义）。
  - **(U) LEDGER U24**：“我需要你转交给argon，不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
- **【定 · Mux 独立成仓】** `Pepgent/omp-rpc-mux` 属于独立网络层组件，独立成仓并在 compose 中作为外部组件引入。
  - **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92`：“应该是在独立的网络层中，有中心化的omp rpc多路复用器”

### 5. 第 184 行“并发写步（意图）”专项确认 —— **【定 · 符合 U24 与嵌套硬约束】**
- **【定】** 用户在 **U24** 明确指出 omomp 的 `fork` 在 soroi 中根本不应该存在；同时用户在 **(U)** `01a18ed5 #ea638181` 与 `01a18e8a #4da22ab4` 要求支持并发多路步骤/实例与下游汇总，在 **(U)** `01a18e1f #5a37a640` 规定“eval禁止递归嵌套，eval永远只有中心主机能运行”，在 **(U)** `01a18e1f #3dbd0473` 规定“远程agent爱怎么执行怎么执行，但是不允许再接着开远程agent”。
- 因此，`D2-02`、`D2-03`、`D2-05`、`D2-25` 将并发写步定为“由根 agent 经 `omp-soroi` 的 `subagent` 模块在中心主机并发派出的中心 agent 承担（可启动运行 `Agent` 节点的 subagent，而 `Agent` 体内禁用 `eval`、远程 `Agent` 禁止再开远程 `Agent`）”，完全符合 **U24** 与上述全部 `(U)` 原话。

---

## 二、对全部 25 个条目的逐行投票（D2-01 至 D2-25）

| ID | 起草分类 | 缺失/补充? | Argon 投票 | 裁决 / 投票理由（附 `(U)` 依据） |
| --- | --- | --- | --- | --- |
| **D2-01** | 意图 | 否 | **赞成** | **【意图裁决 · 定】** 严守上游 omp 宿主不修改、`Pepgent/oh-my-pi` 无角色、两侧不要求版本一致，符合 **(U) LEDGER U1, U13** 与 `01a18f4a #f488be08`。 |
| **D2-02** | 技术 | 是 | **赞成** | `eval` 模块与 `subagent` 模块合入 `Pepgent/soroi` 的 `packages/omp-soroi`；并发批次改由同包 `subagent` 模块派发界定（去除 `fork_task`，符合 **U24**）；只持有在途捕获、正式记录交 `D2-04`、`dry run` 不写 store、`Agent` 体禁用 `eval`，符合 **(U)** `01a18dd4 #edbaf573`、`01a18e8a #32b6f7fd`、`01a18e1f #5a37a640`。 |
| **D2-03** | 技术 | 是 | **赞成** | 纯插件实现独立 RPC subagent，生命周期与 IRC 全方位对标内置；经 `omp-rpc-mux dial` 启动；嵌套只禁 `Agent` 体调 `eval` 与远程 `Agent` 再开远程 `Agent`；按 C-5 删除 `lastAssistantText` fallback，符合 **(U)** `01a18e1f #9c291fe2, #678fe41a, #7bfe3696, #c1ef8567, #5a37a640, #3dbd0473` 及 **U24**。 |
| **D2-04** | 意图 | 是 | **赞成** | **【意图裁决 · 定（进程拓扑细节为暂定）】** 如实反映 `argon/D2-rulings.md`：store 归 `Pepgent/soroi` 的 `packages/store` 同仓同版本发布；单写方伴随进程不违背 U1/U13/C-1；直接对 DuckLake 文本列做 SQL 匹配不建重复 FTS 表（符合 `01a18e1f #543f0ccd`）；远程 `dry run` 只经暂存区从头到尾不进中心副本（符合 `01a18e1f #7ffcea0c`、`01a18e8a #32b6f7fd`）。 |
| **D2-05** | 串联 | 是 | **赞成** | 同包内 `eval` 模块与 `subagent` 模块直接调用闭合 `Agent` 节点捕获，唯一交回通道为 `soroi_return`（含 typed 结果与 `File` 路径），消除内置 `runSubprocess` 占位与 fallback，符合 **(U)** `01a18dd4 #49e6867a`、`01a18e8a #4567dcfd`、`01a18e1f #c1ef8567`。 |
| **D2-06** | 串联 | 是 | **赞成** | 人类介入三通路（改值先中止在途捕获再写 `Human` 捕获并提醒 AI；改函数体或参数只重调被改调用作为派生正式运行首步，后续由 AI 继续消费未消费 atom、未变调用按身份复用，**不按旧步自动重跑**；接管 agent 走带人类来源的 omp IRC）完全符合 **(U)** `01a18e1f #ba5ad307, #d1baf561, #a0d22b8a, #7bfe3696` 及反重放硬约束 `01a18efe #9e2d37a1`、`01a18e8a #21495b13`。 |
| **D2-07** | 技术 | 是 | **赞成** | 独立网络层采用标准 OCI 网络加现有 NetBird 网格，使远程容器/计算节点无需额外特权即可访问中心 Mux 与 store，符合 **(U)** `01a18e3a #09e1cc92`。 |
| **D2-08** | 技术 | 是 | **赞成** | 中心化 omp RPC Mux（`Pepgent/omp-rpc-mux`）独立成仓，只持有连接表并做单写方/多只读读方路由与控制端点转发，进程一律由写方经 `omp-rpc-mux dial -- omp --mode rpc` 启动，不做进程启动器或调度器，符合 **(U)** `01a18e3a #09e1cc92`、`01a18e1f #2dbf970b` 与 `01a18dd4 #6b25e5f7`。 |
| **D2-09** | 技术 | 是 | **赞成** | `Pepgent/remote` 作为独立程序维护模板目录与单次作业生命周期（`copy-in → body → copy-out`），三后端共享抽象、先实现 Komodo，并补齐模板写入接口供 UI 绑定镜像，符合 **(U) LEDGER U1** 与 `01a18e3a #3afc3fb6, #b45cd22c, #c5030836, #2366ef30, #56d362ca`。 |
| **D2-10** | 串联 | 是 | **赞成** | 由 soroi 侧在中心打包节点及其依赖（含 `package.json`）的闭包 bundle 与 runner，经 store 对象或暂存区 `copy-in` 交目标环境执行，既解决依赖还原又保持 `remote` 对 soroi 零感知，符合 **(U)** `01a18e8a #8d913d2f, #f4c96767` 与 **LEDGER U1**。 |
| **D2-11** | 串联 | 是 | **赞成** | 远程 `Agent` 启动时经 `copy-in` 拷入与中心字节一致的 D2-25 定制发布 tar，以 `remote` 模板目录兼作服务发现，唤醒时开新作业拷入 transcript，符合 **(U)** `01a18e1f #9c291fe2, #678fe41a` 与 `01a18e3a #d5414f59`。 |
| **D2-12** | 技术 | 是 | **赞成** | 节点库与 agent 定义保存在 git 仓库（`Pepgent/lab-library`），中心检出作 cwd 供 `eval` 直接 import；版本身份取 `Bun.build` bundle 内容哈希并在提交时保存 bundle 字节，符合 **(U)** `01a18e1f #47b71e05`、`01a18e8a #50f5cf06, #e7747df0, #8d913d2f, #f4c96767` 及 `argon/version-ruling.md`。 |
| **D2-13** | 技术 | 是 | **赞成** | 镜像定义存 `Pepgent/images`，复用已部署的 Komodo Build 与 CNCF Distribution（Apache-2.0）构建推送后绑定 `remote` 模板，符合 **(U) LEDGER U13** 与容器设置页业务需求。 |
| **D2-14** | 技术 | 是 | **赞成** | 在 `Pepgent/Pepgent` 的 `apps/web` 服务层新增 `server/lab` 替换静态 `LabBridge` fixture，实验只存运行 id 索引、运行状态从 store 读取，不制造第二状态源，符合 **(U) LEDGER U1, U2** 与 `01a18e1f #e818d410, #e3692177`。 |
| **D2-15** | 串联 | 是 | **赞成** | 每个讨论对应一个中心 omp 主会话（一人一会话），由 Lab 后端经 `omp-rpc-mux dial` 启动并作为写方，支持装载产物与从讨论启动实验，符合 **(U) LEDGER U13, U23** 与 `01a192a2 #d6423438`。 |
| **D2-16** | 技术 | 是 | **赞成** | Lab 后端订阅 store 变更流，按运行开始/结束事件触发中心会话等动作并带审批门禁，符合 **(U)** `01a18e1f #e3692177`（`design/layers.md:67-69`）。 |
| **D2-17** | 技术 | 是（占位） | **赞成** | 成员、项目、角色归属 Lab 后端，废弃旧业务仓 Keycloak 遗留设计，认证机制留后续决策表，符合 **(U)** `01a192a2 #ed4570ad` 与主路径占位规则。 |
| **D2-18** | 实现 | 否 | **赞成** | 保留 `_lab` 17 个页面，通过 `LabBridge` 切换为调用 D2-14 异步服务并删除静态 fixture，保持 renderer 门面边界，符合 **(U) LEDGER U1** 与 `01a18e1f #e3692177`。 |
| **D2-19** | 意图 | 否 | **赞成** | **【意图裁决 · 定】** 旧 Paseo、`_app` 与 `apps/hub` 保持不动，不复用为 Mux 或 soroi 后端，符合 **(U)** `01a19232 #fa43ba92` 与 `01a192a2 #cec515af`。 |
| **D2-20** | 技术 | 是 | **赞成** | 中心主机运行 Lab 后端（含根 omp 进程与本机 subagent）、store 服务、Mux 三个容器，`eval` 只在中心 omp 进程运行，中心与远程从同一份发布 tar 安装定制，符合 **(U)** `01a18e1f #5a37a640, #9c291fe2`。 |
| **D2-21** | 技术 | 是 | **赞成** | 在 `Pepgent/iac` 中声明中心主机 VM、镜像仓库主机与网络地址，职责边界清晰。 |
| **D2-22** | 技术 | 是 | **赞成** | 因 `homelab-tf` 路径受 SOPS 解密规则限制，在本机 OrbStack 建立隔离的 Slurm（`slurmrestd`/JWT）与 Komodo 测试环境并登记台账（R31 已实测跑通），符合 **(U) LEDGER U4**（“如果可以，我推荐”）的测试目标与凭据安全规则。 |
| **D2-23** | 实现 | 是 | **赞成** | 新建 `Pepgent/deploy` 集中管理 Pepgent 服务的 Komodo ResourceSync 与 Stack，符合应用归属与凭据注入规则。 |
| **D2-24** | 实现 | 否 | **赞成** | 明确 `Pepgent/soroi` 为设计+发行单仓，归档已迁入的 `omp-soroi-eval` 与 `omp-soroi-subagent`，将 `pepgent-doc` 与 `oh-my-pi` 移出组件图，符合 **U23、U24** 与 C-1。 |
| **D2-25** | 意图 | 是 | **赞成** | **【意图裁决 · 定】** 如实反映 `argon/D2-rulings.md`：`Pepgent/soroi` 单仓打包插件、agent 定义、技能、规则、设置覆盖、同仓 store 服务与 compose（引入外部 `Pepgent/omp-rpc-mux`），完全剥离 omomp 与 `fork`（**U24**），可脱离 Pepgent 独立走通全部流程并作为 Pepgent 的 agent 核心（**U23**）。 |

---

## 三、对“缺失部分或设计补充”的一票否决审查（共 19 项，0 否决）

依 U11 与 U20（D1-16），对表中全部 19 个标为“缺失部分或设计补充 = 是”的条目（`D2-02`–`D2-17`、`D2-20`–`D2-23`、`D2-25`）逐项核查：

1. **无任何条目违背 `(U)` 用户原意或擅自收缩范围：**
   - 此前预审中发现的潜在意图冲突（如将 `store` 划出 soroi 另建外部仓、在 `D2-04` 建重复 FTS 派生表、在 `D2-06` 派生运行中按已存步自动重跑造成变相重放、在 `D2-08` 让 Mux 充当进程启动器，以及混入 omomp 的 `fork` 分身）均已在当前定稿中按 `(U)` 原话彻底修正。
2. **结论：不行使一票否决权（0 否决），全部通过。**
