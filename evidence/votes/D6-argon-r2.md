# D6 store 服务决策表 — Argon 第 2 轮选票（修订行重投）

- **决策文档：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D6-store-service.md`（第 2 轮修订版，含 `D6-05`、`D6-10`、`D6-13` 按导师第 2 轮主路径反例再修订方向）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **重投范围：** 本轮按 `task:high` 与导师（`LeadMentor`）反例修订的 **15 行**：`D6-03`、`D6-04`、`D6-05`、`D6-07`、`D6-08`、`D6-10`、`D6-12`、`D6-13`、`D6-14`、`D6-15`、`D6-16`、`D6-17`、`D6-18`、`D6-21`、`D6-22`（其余 7 行 `D6-01`、`D6-02`、`D6-06`、`D6-09`、`D6-11`、`D6-19`、`D6-20` 第 1 轮已通过且本轮未改动，维持第 1 轮赞成票）。
- **本轮计票结果：** **15 条修订行全部赞成（15 赞成 / 0 反对 / 0 否决）**；全表 22 行累计 **22 赞成 / 0 反对 / 0 否决**。

---

## 一、本轮修订的意图裁决与一票否决审查（依 D1-16）

1. **`D6-16`（分类：意图 + 串联 | 派生运行补入 `InFlight{slot}` 先落成 `Committed{step, position}`、继承 `stops` 记录及 `holder` 根会话规则）：【定 · 符合用户原意】**
   - **依据 `(U)` 原文：**
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/a0d22b8a`（2026-10-31 08:32:02）：
       > “eval因为明确存在正式运行，正式运行同等于固化，所以才有人类介入的可能性，人类修改正在运行的函数体并派生新的闭包这件事永远都是正式运行”
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/ba5ad307`（2026-10-31 05:16:25）：
       > “新的实例，新的参数，旧的函数体”
     - **(U)** `session://01a18efe-a680-7642-aff1-6f468cf2935e/entry/9e2d37a1`（07:58:00）与 `01a18e8a #21495b13`（08:47:13）：
       > “没有重放，这是意淫的东西”、“跑你妈同一份脚本，从来就没有重放”
   - **裁决说明：** 第 1 轮 `Derive.at` 仅支持已提交步，无法直接指向**正在运行**的调用 C，且同一步中定义的根 atom 与已跑完的兄弟调用会丢失。第 2 轮修订为先中止在途调用并将当前步落进父运行 P（记 `call_aborted`），再以 `Committed{step, position}` 派生 R'、同时继承 `stops` 记录，直接落实了用户“修改**正在运行的**函数体并派生新闭包”的 `(U)` 原意，且严守“只跑被改调用、下游不重放”。

2. **`D6-08`、`D6-14`、`D6-22`（分类含“意图”的其余三条修订行）：【定 · 符合用户原意】**
   - **`D6-08`：** 在 `design/store.md` 明确写清“只检索 DuckLake 文本列与文件元数据（名字、路径、媒体类型），不检索文件内容、不建 FTS 派生表”，符合 **(U)** `01a18e1f #d6cf9b35, #543f0ccd, #a5f938df`。
   - **`D6-14`：** `calls.来历 = Human{event}`（`event.replaced` 指向被替代调用），交回文件同样先入暂存区随步提交转入，符合 **(U)** `01a18e1f #ba5ad307, #d1baf561`。
   - **`D6-22`：** 明确区分 **standalone**（`Pepgent/soroi` compose 拉起 `pepgent-store` 与 Mux，脱离 Pepgent 走通本机全流程）与 **完整 e2e**（显式接入 `remote`、模板、OrbStack Slurm/Komodo 与独立网络层走通远程全流程）两个 profile，符合 **(U) LEDGER U23、U24** 与 **U4（R31）**。

3. **一票否决审查（针对本轮 14 条标为“是 / 设计补充”的修订行）：**
   - **0 项否决（不行使一票否决权）。** 本轮全部修订（含 `D6-05`、`D6-10`、`D6-13` 按导师第 2 轮主路径反例再修订方向）均消除了第 1–2 轮具体反例，无任何一处违背 `(U)` 用户原话。

---

## 二、第 2 轮修订行逐条投票表（15 行）

| ID | 分类 | 缺失/补充 | Argon 意图判定 | Argon 第 2 轮投票 | 理由（核对本轮修订与 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- |
| **D6-03** | 技术 | 是 | 【定】远程本机落盘结束后随拷贝回集中副本（`(U)` `#8e0a7e8f, #3dbd0473`）、禁止跨运行消费 atom（`(U)` `#63f31453`）；【暂定】表结构 | **赞成** | 新增 `agent_progress` 分区表专收远程 `soroi-batch/`（只引用 transcript 条目，不复制对话、不污染 `events` 的 11 种封闭集合与 `calls`/`captures`）；`CallOrigin` 四个变体（`Executed{site}`、`Adopted`、`Human{event}`、`Inherited{sourceRun, sourceStep, sourcePosition, capture}`）标签唯一且穷尽处理；`runs` 显式记录持有根会话 `holder`。 |
| **D6-04** | 串联 | 是 | 【定】dry run 不进 store，正式步原子提交（`(U)` `#32b6f7fd, #8e0a7e8f`） | **赞成** | 统一端点路径为 `POST /runs/steps`，包含被中止调用的记录，并将远程 `Agent` 批次明确写为同事务 `INSERT INTO agent_progress SELECT * FROM read_parquet(…)`。 |
| **D6-05** | 串联 | 是 | 【定】末端 atom 全停止即结束（`(U)` `#46e29915`）；【暂定】单根会话单活跃运行与 `mayClose` 确认 | **赞成** | 补入“一个根会话同一时刻至多一个未结束的运行”（根 `holder` session id 对应 D3-19 的 `eval:<session id>` 控制端点），且**注明按导师第 2 轮主路径反例修订方向投票：运行结束须同时满足 supervisor 确认无活动写方（`mayClose`，无在途并发 worker）+ store 确认未消费 atom 集合为空**，防止并发 worker A 先提交完自己分支时提前写 `run_ended`。 |
| **D6-07** | 串联 | 是 | 【定】自动临时 volume 拷回（`(U)` `01a18e3a #09e1cc92`），dry run 绝不进 store（`(U)` `#68d36f55, #32b6f7fd, #7ffcea0c`） | **赞成** | 取消提交前直接 `PUT /objects/{sha256}`，改为每次 eval 调用开一个 `/transfers/{t}` 暂存区，所有未提交字节（本机产出、节点 bundle 与源码清单、人类上传、远程 copy-out `PUT /transfers/{t}/volumes/{position}`）一律先进暂存区，仅在正式步提交事务内按引用转入对象目录，彻底杜绝未提交孤儿对象与 dry run 污染，且全文统一 `{position}`。 |
| **D6-08** | 意图 + 技术 | 设计补充 | **【定 · 无冲突】** 符合 `(U)` `01a18e1f #d6cf9b35, #543f0ccd, #a5f938df` | **赞成** | 在 `design/store.md` 明确写清检索边界（文本列 SQL `ILIKE` + 文件名字/路径/媒体类型检索，不建 FTS 派生表、不检索文件内容），接口 `hits.kind` 同步补入 `'file'`。 |
| **D6-10** | 技术 | 设计补充 | 【定】历史时间轴极为重要、GUI 直读免 DSL（`(U)` `#9ff9d2be, #64246eaf`）；【暂定】seq 投影与重建时间线拆分 | **赞成** | **注明按导师第 2 轮主路径反例修订方向投票：将按提交序号的权威图投影（`at=seq:{k}`）与按原始时刻重建的时间线视图拆开**，既保持提交序号作为 store 事件表的唯一状态游标，又能按调用原始起止时刻重建历史时刻“正在运行”的时间轴视图（`design/layers.md:41`）。 |
| **D6-12** | 串联 | 设计补充 | 【定】未正式运行的草稿不进 store（`(U)` `#32b6f7fd, #7ffcea0c`）；【暂定】Lab 存 `run_id` 索引 | **赞成** | Lab 后端从生命周期流（D6-06）收到 `run_started` 后将 `run_id` 存入业务库作为实验索引，解决同一根会话先后跑多次实验或派生新运行时仅靠 `session_id` 无法区分的问题。 |
| **D6-13** | 技术 | 设计补充 | 【定】跨运行比较与名字非身份（`(U)` `01a18e8a #4da22ab4`、`store.md:35`、`layers.md:34`）；【暂定】对齐与 `Ambiguous` 规则 | **赞成** | 去掉“根 atom 按名字对齐”，改为支持显式根映射 `map`、唯一值身份对齐以及按调用输入位置对齐（两边同位置均为根 atom 时随之对齐并标 `Changed`）；**注明按导师第 2 轮主路径反例修订方向投票：同一函数同一输入位置存在多候选时（无论两边候选数量是否相同）不靠 `(step, position)` 书写顺序强行配对，多候选一律返回 `Ambiguous` 交由显式映射消歧**。 |
| **D6-14** | 意图 + 串联 | 设计补充 | **【定 · 无冲突】** 符合 `(U)` `01a18e1f #ba5ad307, #d1baf561` | **赞成** | `calls.来历` 统一为 `Human{event}`（`event.replaced` 指向被替代调用），交回文件同样先写入本步暂存区再随步提交转入对象目录，与 D6-07、D6-17、D6-18 完全闭合。 |
| **D6-15** | 串联 | 是 | 【定】取消运行中程序且远程 `Agent` 对标内置生命周期（`(U)` `#d1baf561, #678fe41a, #9c291fe2`） | **赞成** | 远程 `Agent` 中止改为有序停止（经 Mux 中止当前轮 → 关闭这一代进程 → 等远程 omp 退出 → 照常 `copy-out` 收回 transcript 与 blob → 中心确认 → `remote remove`，被中止调用的 `soroi-batch/` 不汇入 `agent_progress`），避免了直接 `remote abort` 导致远程对话历史丢失的反例。 |
| **D6-16** | 意图 + 串联 | 设计补充 | **【定 · 无冲突】** 符合 `(U)` `01a18e1f #a0d22b8a, #ba5ad307` 与无重放 `#9e2d37a1, #21495b13` | **赞成** | `Derive.at` 扩为 `Committed{step, position} \| InFlight{slot}`：在途调用先中止同一步在途项并将该步已完成的调用与根 atom 提交进父运行 P，再派生 R'；R' 同时继承 P 的 `stops` 记录（防止已停止 atom 重新出现在提醒中），并规定了 `holder` 会话分配规则以维护 D6-05 不变量。 |
| **D6-17** | 技术 | 设计补充 | 【暂定】主动 `human(request)` 与被动介入共用 `Human{event}`，无冲突 | **赞成** | 与 D6-14、D6-18 统一使用 `Human{event}`（主动请求时 `event.replaced = null`），类型定义一致。 |
| **D6-18** | 技术 | 否 | 【暂定】出自 `(A)` `#99c65d16` 补充规则，契合 `(U)` `#d1baf561` | **赞成** | 将 `Human` 捕获身份定为稳定字段（`run, step, position, principal, handback, replaced`）的哈希，把受理时刻 `accepted` 移出身份哈希仅作事实字段，保证同一次人类交回重试幂等，同时每次介入仍是独立新身份、不被跨运行错误复用。 |
| **D6-21** | 串联 | 是 | 【定】节点为普通 TS 文件、持久化与版本覆盖依赖（`(U)` `#47b71e05, #50f5cf06, #8d913d2f, #f4c96767`） | **赞成** | 首次正式运行某节点版本时，随步提交 `NodeVersionRecord`（bundle、入口 TS、含 source map 的源码清单、Git commit、构建 manifest、lockfile），使历史调用不仅有可执行 bundle，还能取回原始 TS 源码（闭合 `inv/s-node-library.md:251-257` G4）。 |
| **D6-22** | 意图 + 串联 | 是 | **【定 · 无冲突】** 符合 `(U)` LEDGER U23、U24、U4 | **赞成** | 拆分为 **standalone**（仅 compose 拉起 store 与 Mux 走通本机全流程）与 **完整 e2e**（显式接入 `remote`、模板、OrbStack Slurm/Komodo 与网络层走通远程全流程）两个 profile，并由 init 在 store 就绪后按哈希导入 release artifact，边界诚实可执行。 |
