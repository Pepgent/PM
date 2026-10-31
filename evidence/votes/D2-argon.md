# D2 优先意图裁决（D2-04、D2-25，含 U24 前提）

> 状态说明：依 `Governance_e826` 通知，因用户新增 **U24**（“不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”），D2 全表正退回起草者删改 `fork`/分身相关行，全表逐行投票待修订版完成后进行。本文件先记录 D2-04 与 D2-25 的意图裁决。

---

## 1. D2-04：store 服务的归属与进程形态

### 意图裁决
1. **【定 · 领域与仓库归属】store 的值与记录权威属于 soroi 本身，应留在 `Pepgent/soroi` 与 soroi 定制同仓、同版本发布，不另开独立的 `Pepgent/store` 仓库。**
   - **依据 `(U)` 原文：**
     - **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/2d861491`（2026-10-31 02:33:44）：
       > “所谓的捕获和记录，本质上只是omp里所需要的自定义插件罢了”
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`（2026-10-31 05:07:53）：
       > “通常来说，以omp的视角来看，store天生是session log，但是，如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了”
     - **(U) LEDGER U23**：
       > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
     - **(U) U24**：
       > “不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
     - **对比 `(U)` 对外部独立组件的划界：** 用户在 **(U) LEDGER U1** 与 `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6, #b45cd22c` 中明确把 `remote` 划为不属于 soroi 的独立程序并要求单独开仓，在 `01a18e3a #09e1cc92` 中明确把中心化 omp RPC 多路复用器划入“独立的网络层”；但用户从未把 `store` 划出 soroi。因此将 store 服务收回 `Pepgent/soroi` 仓内（而非另立非 soroi 的 `Pepgent/store`），与 `design/soroi.md`“store 是 soroi 引擎里值的唯一权威”完全一致。

2. **【定 · 不违背 U1 / U13 / C-1】store 以单写方伴随服务进程运行，不违背“soroi 是 omp 扩展组件、不修改 omp 宿主代码、不在外层另搭调度控制面”。**
   - **依据 `(U)` 原文：**
     - **(U) LEDGER U1、U13** 与 `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08` 禁止的是修改 omp 宿主核心代码；
     - **(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/6b25e5f7, #28767d47` 废除的是在 harness 外层把 agent 当黑箱调度的“解释器+启动器二合一 daemon”；
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/8e0a7e8f`（2026-10-31 05:35:38）：
       > “对于运行中的数据，实际上他们各自是独立的db，而只有运行结束后，才会随着拷贝一起回集中副本，根本没有并发不并发写入的问题，而写入这事，本来就应该本机落盘，而不是，有一堆集群，维护一个中央的数据库全写一个库”
   - **裁决说明（在 U24 不含 `fork` 的前提下同样成立）：** 即使不设 omomp 的 `fork` 分身，中心主机上依然同时存在多个独立讨论的中心 omp 主会话，且远程运行结束后需经 HTTP `copy-out` 将 Parquet 批次与文件汇入集中副本、GUI 在无活跃 omp 会话时也需查询和订阅 store。store 伴随进程只做只增不改的记录汇入与读取，从不决定下一步运行什么，既不修改 omp 宿主代码，也不是外部控制面。

3. **【暂定 · 进程拓扑细节】**
   - store 的中央副本单写方具体以独立常驻伴随进程（`store.md:65` 中的“soroi 服务”）承载，源自历史会话 `(A)` `01a18e1f #99c65d16`（经 `(U) #bfd6975c`“我认为差不多都敲定了，先写文档”采纳），无逐字 `(U)` 强制规定 OS 进程边界，按规则标为 **【暂定】**（技术面赞成）。

---

## 2. D2-25：伴随服务与 U23 / U24“独立的完整 omp 定制”边界

### 意图裁决
1. **【定 · 满足 U23 与 U24】`Pepgent/soroi` 同仓交付“omp 插件 + agents/skills/rules/设置覆盖 + store 伴随服务 + compose（拉起 store 与外部 Mux）”满足 U23“一个完整的 omp 定制”与 U24“soroi 是独立的 omp 定制（不混入 omomp 的 fork）”。**
   - **依据 `(U)` 原文：**
     - **(U) LEDGER U23**：
       > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
     - **(U) U24**：
       > “不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
     - **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/09e1cc92`（2026-10-31 04:53:33）：
       > “然后怎么连回来soroi，应该是在独立的网络层中，有中心化的omp rpc多路复用器，怎么实现怎么干的你别管，反正在一个网络里，这也应该是oci标准行为，而不需要其他能力”
   - **裁决说明：**
     - **与 omomp 解耦（U24）：** `Pepgent/soroi` 是基于上游 omp 的独立定制，不包含也不依赖 omomp 的 `fork` / `fork_task` 分身概念；其内部的并发与 subagent 调度完全由 soroi 自身的 `omp-soroi-eval` 与 `omp-soroi-subagent` 定义。
     - **定制完整性（U23）：** 将 store 服务收回 `Pepgent/soroi` 同仓同版本发布，并通过同仓 compose 拉起 store 服务与独立网络层的 `Pepgent/omp-rpc-mux`（`01a18e3a #09e1cc92`），使得安装 `Pepgent/soroi` 并启动其伴随 compose 后，即可在不依赖 `Pepgent/Pepgent` 上层业务应用的情况下独立走通用户要求的全部流程，并作为 Pepgent 的 agent 核心被调用。
