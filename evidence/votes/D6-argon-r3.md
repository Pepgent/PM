# D6 store 服务决策表 — Argon 第 3 轮选票（9 条修订行重投）

- **决策文档：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D6-store-service.md`（第 3 轮修订版）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **重投范围：** 本轮按 `task:high` 与导师（`LeadMentor`）第 2 轮反例再修订的 **9 行**：`D6-03`、`D6-05`、`D6-07`、`D6-10`、`D6-13`、`D6-15`、`D6-16`、`D6-18`、`D6-22`（其余 13 行在前两轮已通过且本轮未改动，维持赞成票）。
- **本轮计票结果：** **9 条修订行全部赞成（9 赞成 / 0 反对 / 0 否决）**；全表 22 行累计 **22 赞成 / 0 反对 / 0 否决**。

---

## 一、本轮修订的意图裁决与一票否决审查（依 D1-16）

1. **`D6-16`（分类：意图 + 串联 | 派生执行期间持有会话算父运行 P 的活动写方，提交不带 `mayEnd`）：【定 · 符合用户原意】**
   - **依据 `(U)` 原文：**
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/a0d22b8a`（2026-10-31 08:32:02）：“人类修改正在运行的函数体并派生新的闭包这件事永远都是正式运行”
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/ba5ad307`（2026-10-31 05:16:25）：“新的实例，新的参数，旧的函数体”
     - **(U)** `session://01a18efe-a680-7642-aff1-6f468cf2935e/entry/9e2d37a1`（07:58:00）与 `01a18e8a #21495b13`（08:47:13）：“没有重放，这是意淫的东西”、“跑你妈同一份脚本，从来就没有重放”
   - **裁决说明：** 当被派生的在途调用 C 先把所在步 S（含 `call_aborted`）提交进父运行 P 时，若 P 的未消费 atom 恰好为空且没有 `mayEnd` 门禁，P 会被误标为 `run_ended` 而无法在紧随其后的 `POST /runs/derive` 中写 `run_aborted`。规定派生期间 supervisor 不给 `mayEnd: true`，确保了在途截断派生的状态机严密闭合。

2. **`D6-22` 及 `D6-03`（分类：意图 + 串联 | `PUT /releases/{version}` 以 `releases` 表记录提交导入 release artifact）：【定 · 符合用户原意】**
   - **依据 `(U)` 原文：** **(U) LEDGER U23、U24**。
   - **裁决说明：** 部署 init 导入定制 release artifact 时走标准 store 提交（校验哈希、写 `releases` 身份表记录、移入对象目录），既满足空 store 自举，又严格维持 D6-07“对象目录只存放已提交记录引用的字节”的单一不变量。

3. **`D6-15`（被中止的远程 `Agent` 调用同样汇入 `agent_progress` 并保留 `transcript` 引用）：【定 · 符合用户原意】**
   - **依据 `(U)` 原文：** **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9ff9d2be`（“历史时间轴是个极为重要的功能”）、`#d1baf561`、`#678fe41a`。
   - **裁决说明：** 被中止调用虽然不产出有效 atom，但它在被取消前执行过的进度与对话属于运行历史的一部分；将其 `soroi-batch/` 汇入 `agent_progress` 并在 `Aborted` 与 `HumanEvent.replaced` 中保留 `transcript` session id，使复盘与时间轴完整可查。

4. **一票否决审查（针对本轮 8 条标为“是 / 设计补充”的修订行）：**
   - **0 项否决（不行使一票否决权）。** 全部 9 条修订均符合 `(U)` 用户原话硬约束及 U23、U24。

---

## 二、第 3 轮修订行逐条投票表（9 行）

| ID | 分类 | 缺失/补充 | Argon 意图判定 | Argon 第 3 轮投票 | 理由（核对本轮最新文本与 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- |
| **D6-03** | 技术 | 是 | 【定】远程本机落盘结束后随拷贝回集中副本（`(U)` `#8e0a7e8f, #3dbd0473`）；【暂定】表结构 | **赞成** | 身份表补入 `releases`（版本、内容哈希、导入时刻，配合 D6-22），`Human{capture, event}` 的 `event.replaced` 记录被替代调用及其 `transcript` session id（配合 D6-15 复盘），模型完整自洽。 |
| **D6-05** | 串联 | 是 | 【定】所有末端 atom 停止即结束（`(U)` `#46e29915`）；【暂定】双权威确认机制 | **赞成** | 运行结束由两个状态各自的权威共同确认：① 根会话 eval 插件（在途调用与批次的权威）确认无活动正式 eval 与未释放批次并在 `StepCommit` 置 `mayEnd: true`；② store 在同事务内确认未消费 atom 集合为空才写 `run_ended`，消除了并发写方之一提交后运行被提前结束的反例。 |
| **D6-07** | 串联 | 是 | 【定】自动临时 volume 拷回（`(U)` `01a18e3a #09e1cc92`），dry run 绝不进 store（`(U)` `#68d36f55, #32b6f7fd`）；【暂定】`TransferKind` ADT | **赞成** | 将暂存区定义为 ADT `TransferKind = EvalTransfer{evalCall} \| AgentGenerationTransfer{agent, generation}`，分别对齐 eval 调用（按 `position` 分卷）与非 eval 场景远程 subagent 唤醒（单卷，transcript 写回中心后 `DELETE`，不写 store），与 D4-13 生命周期完全闭合。 |
| **D6-10** | 技术 | 设计补充 | 【定】历史时间轴极为重要、GUI 直读免 DSL（`(U)` `#9ff9d2be, #64246eaf`）；【暂定】`graph` 与 `activity` 拆分 | **赞成** | 拆分为 `GET /runs/{run}/graph?at={seq}`（只投影提交到序号 `k` 时 store 持有的已提交事实，`CallStatus` 无 `Running`）与 `GET /runs/{run}/activity?until={time}`（按调用原始起止时刻回溯重建的活动区间，供时间轴“现在”线使用），两种语义不再混入同一视图。 |
| **D6-13** | 技术 | 设计补充 | 【定】跨运行比较与名字非身份（`(U)` `01a18e8a #4da22ab4`、`store.md:35`、`layers.md:34`）；【暂定】多候选 `Ambiguous` 规则 | **赞成** | 明确提交顺序（步序号、步内位置）不作跨运行身份：同一函数多候选时仅当值身份、`Inherited` 来源或显式 `map` 能唯一消歧才配对，否则即使两侧候选数量相等也一律返回 `Ambiguous`，杜绝按偶然书写顺序错误配对。 |
| **D6-15** | 串联 | 是 | 【定】历史时间轴重要（`(U)` `#9ff9d2be`）、取消运行中程序且对标内置生命周期（`(U)` `#d1baf561, #678fe41a`） | **赞成** | 远程 `Agent` 有序停止拷回后，被中止调用的远程批次照样随该步提交汇入 `agent_progress`，且 `Aborted` 与 `HumanEvent.replaced` 均携带被中止 agent 的 `transcript` session id，保证被替代/中止的调用在复盘时仍可完整回看。 |
| **D6-16** | 意图 + 串联 | 设计补充 | **【定 · 无冲突】** 符合 `(U)` `01a18e1f #a0d22b8a, #ba5ad307` 与无重放 `#9e2d37a1, #21495b13` | **赞成** | 明确从受理派生请求到父运行 P 写下 `run_aborted` 期间，持有会话算 P 的活动写方，supervisor 在把在途步 S 落进 P 时传 `mayEnd: false`，防止 P 在写 `run_aborted` 前因未消费集合暂时为空而被提前标为 `run_ended`。 |
| **D6-18** | 技术 | 否 | 【暂定】出自 `(A)` `#99c65d16` 补充规则，契合 `(U)` `#d1baf561` | **赞成** | `Human` 捕获身份改由 eval 插件在提交前只用已知确定字段（`transfer, position, principal, handback, replaced`）取哈希，而 store 提交时分配的 `run` id、`step` 序号以及 `accepted` 时刻只作事实字段，消除了提交前算身份对 `run`/`step` 的循环依赖，且凭每次调用唯一的 `transfer` 保证每次介入都是新身份。 |
| **D6-22** | 意图 + 串联 | 是 | **【定 · 无冲突】** 符合 `(U)` LEDGER U23、U24 | **赞成** | 部署时 init 通过 `PUT /releases/{version}` 提交导入 release artifact（同一事务校验 sha256、写 `releases` 表、字节放入对象目录），不绕过 store 提交直接写对象目录，与 D6-03、D6-07 完全自洽。 |

---

## 三、第 4 轮修订行重投（D6-05、D6-16）

- **重投范围：** 按 `task:high` 第 3 轮主路径反例再修订的 **2 行**：`D6-05`、`D6-16`（以及 `D6-22` 补明 `PUT /releases/{version}` 将 `boot`、`runner`、定制 tar 各自按内容哈希入对象目录并记入 `releases`）。
- **第 4 轮计票结果：** **2 赞成 / 0 反对 / 0 否决**（全表 22 行最终累计 **22 赞成 / 0 反对 / 0 否决**）。

| ID | 分类 | 缺失/补充 | Argon 意图判定 | Argon 第 4 轮投票 | 理由（核对第 4 轮最新文本与 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- |
| **D6-05** | 串联 | 是 | 【定】所有末端 atom 停止即结束（`(U)` `01a18dd4 #46e29915`）；【暂定】`POST /runs/{run}/end` 双权威确认 | **赞成** | 步提交（`POST /runs/steps`）本身从不写 `run_ended`；改为当根会话 eval 插件（持有运行的 supervisor）确认该运行已无活动正式 eval 且无未释放批次时，不论最后一步由根会话还是汇总转交的 worker 会话提交，统一调用 `POST /runs/{run}/end`，由 store 在该请求事务内确认未消费 atom 集合为空才写 `run_ended`（返回 `Ended{seq}` 或 `NotEmpty{unconsumed}`），解决了汇总转交给 worker 会话时根会话不再提交步导致 `mayEnd` 永远无法送达的反例。 |
| **D6-16** | 意图 + 串联 | 设计补充 | **【定 · 无冲突】** 符合 `(U)` `01a18e1f #a0d22b8a, #ba5ad307` 与无重放 `#9e2d37a1, #21495b13` | **赞成** | 与 D6-05 同步：从受理派生请求到父运行 P 写下 `run_aborted` 期间，持有会话算 P 的活动写方，supervisor 不对 P 发送 `POST /runs/{run}/end` 请求，确保在途步 S 落进 P 后 P 不会被标为 `run_ended`，随后由 `POST /runs/derive` 原子写下 P 的 `run_aborted` 并创建派生运行 R'。 |
