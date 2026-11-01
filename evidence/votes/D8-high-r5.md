# D8 soroi MVP 验收定义与实现计划 · task:high 第 5 轮选票

投票者：task:high（Governance2_880f.D8HighR4），Claude 族的独立票。

对象：`pepgent-pm/evidence/decisions/D8-mvp-scope.md` 第 4 轮修订后需要重投的 D8-01、D8-09、D8-14。修订与反例的对照见 `D8-r1-responses.md` 的“第 4 轮”。

## 核对方法

1. **逐项读修订后的全文，** 范围是“第 4 轮”表里列出的全部位置：
   - 矩阵：F06、F11、F15、F17、F22、F23（D8:125-142）；
   - 切片：STO-02/03/04、SOR-02/03/08/12/20、REM-06、LAB-12、WEB-03（D8:267-356）；
   - 决策行：D8-09（D8:80）。
2. **与第 4 轮选票（`D8-high-r4.md`）的反例和改投条件逐条比对。**
3. **对矩阵全文做同类复查：** 判据里的每个字段，都要能从已通过的 D6 读取接口得到，即接口草图中的 `GraphNode`、`Env`、`RunEvent`、`/compare` 等（D6:69、167-207）。这是第 4 轮反例 1 的同一个检查，本轮扩到第 4 轮没有覆盖的行。

## 逐行投票

| ID | 票 | 理由 | 反例 |
| --- | --- | --- | --- |
| D8-01 | 反对 | 第 4 轮的反例已经按方案 (a) 消除：<br>• **F06：** 改经 `RunGraph.edges[].to.input` 按位置找到输入 atom，再核对它的值（D8:125）；<br>• **F11：** 改为 `/compare` 中这一对是 `SameCapture`（D8:130，D6-13）；<br>• **F17 ①：** 改为在途期间 B 真实执行（`call_started`/`call_ended`，不是 `call_adopted`），提交后 `/compare` 为 `SameCapture`（D8:136）；<br>• **F23：** 改为 graph 状态 `Human`，加上 stream 中这一位置的 `call_aborted`、`human_handback`（D8:142）；<br>• **F22 ⑨：** 用一个小批次，先交回的 worker 把产出全部 `stop`。这样如果实现提前结束运行，stream 中就会出现 `run_ended`，判据可以证伪（D8:141）；<br>• **F15 ①：** 写明 `t` 与 `position` 取自 `RunRequest.output`。<br>以上各项都只用 D6 已有的读取接口。<br>但对矩阵做同类复查后，还有三处判据读的是 D6 读取接口里不存在的字段 | **F14（D8:133）：**“环境身份等于 `remote templates` 返回的 `identity`”。D4-18 的环境身份（镜像 digest 加配置身份）只在 store 内部的 `captures` 表里。可读的 `Env` 只有 `{kind:'remote'; template; remoteRun}`（D6:69），`GraphNode`、`RunEvent`、`/compare` 都不暴露环境身份。<br>**F15 ②（D8:134，本轮在重投范围内）：**“捕获的 env 身份来自 Slurm 模板”，问题相同。<br>**F08（D8:127）：**“`replaced` 为空”。`HumanEvent.replaced` 不在 `GraphNode` 和 `RunEvent` 里（D6:170-173、205-207），与第 4 轮已经修好的 F23 是同一个问题。<br>照 D6 实现的 store 加上这三条 spec，判据无法判定，所以 F08、F14、F15 在正确的实现上也过不了，D8-01 要求的“32 行全部通过”就无法达成。第 4 轮我只点了 F17 ① 与 F23，漏了这三处，本轮补上。<br>**最小修改（同方案 (a)，不改 D6）：**<br>• **F14：** 改为 graph 节点的 `env` 是 `{kind:"remote", template:"soroi-komodo", remoteRun}`，且 `remoteRun` 等于 `ListStacks` 里看到的 run id。“模板换镜像后身份改变、不再复用”已经是 SOR-07 的验收（D8:289），F14 引用它，不直接读身份。<br>• **F15 ②：** 改为 `env.template = "soroi-slurm"`。<br>• **F08：** 照 F23 的办法，改为状态 `Human`，并且 stream 中这一位置有 `human_handback`、没有 `call_aborted`。 |
| D8-09 | 赞成 | “待裁决”段已改写为已定的 D3 补充条款（D8:80）：<br>• TUI 根 omp 自己就是写方，不经 Mux；<br>• 它没有代，环境里没有 `MUX_GENERATION`、`MUX_TOKEN`，所以不注册 `eval:<session>`，它持有的运行不经 Lab 介入。这与 D3-19（D3:73）以及 D7-04 的“端点注册要出示 g、t”（D7:212、242）一致；<br>• 它的子 agent 仍由插件作为写方经 dial 进入 Mux（D3-07、D3-09），F20、F21 用到的 `generation_up`/`generation_down` 仍是 Mux 上的权威事实；<br>• D2-08 写明以本条款为修订，TUI 根会话是唯一例外；<br>• A0 的根会话适用同一条款。<br>第 4 轮非阻塞建议 1 已经全部落实 | — |
| D8-14 | 赞成 | **反例 1 已消除（PM#5 第 1 项）：**<br>• STO-02（VS1）加上了最小 transfer 闭环，即 `POST /transfers`、对象 PUT、提交时转入、`DELETE`；验收为带 transfer 提交 F01 的那一步（D8:267）；<br>• STO-04 收窄为 volume tar、volume 读取与清单，与 PM#5 第 1 项逐字对齐（D8:269）；<br>• SOR-02 写明每次 eval 调用开一个 EvalTransfer，提交时带上，dry run 返回时删除，与 D6-07、D6:107 一致（D8:284）。<br>因此 VS1 的 F01 可以闭合。<br>**反例 2 已消除：** SOR-03、SOR-08 的批次判据移到 W2 的 SOR-12，并交给 E2E-13 的 F22 ⑥⑦⑨ 验证（D8:285、290、294），VS1 → W1 → W2 的顺序成立。<br>**其余同步修改：**<br>• STO-03、WEB-03 加上了 PM#5 第 2 项的 `Aborted` 独立变体（D8:268、356）；<br>• LAB-12 的依赖加上 REM-07、REM-02，REM-06 的依赖加上 REM-01；<br>• SOR-20 的排队中止分支交给 E2E-17（D8:303、328、353）；<br>• F06 的组件列由 STO-04 改为 STO-02，与 STO-04 的收窄一致 | — |

## 非阻塞建议（不构成改投条件）

1. **SOR-12 的依赖（D8:294）：** 它的验收现在含“主 agent 的提醒里没有”和“批次未释放时根 supervisor 不发 `/end`”，要用到 SOR-08 与 SOR-03，但依赖列只写了 SOR-09。按波次顺序 W1 在 W2 之前，实际不会阻塞，但 DAG 应写出 SOR-03、SOR-08。
2. **STO-02 的验收：** “`DELETE` 之后 transfer 里的路径返回 404”要能区分实现对错，就需要 `GET /transfers/{t}/objects/{sha}` 在 `DELETE` 之前返回 200。这个端点（D6:144）不在 STO-02 的列表里，建议加入，或把判据改为再对同一 transfer 执行 `PUT` 返回 404。
3. **F22 ⑨：** 判据的最后一步是“批次释放之后 `/end` 得 `Ended`”，这要求最后一个 worker 也把产出全部 `stop`，建议写明。
4. **F24 ①：** `parentAborted` 是 store 返回给插件的值，测试方能否拿到，取决于根端点的结论里是否带上它。建议同时以 P 的 stream 中有没有 `run_aborted` 作为判据，这本来就可以直接观察。
5. **E2E-16 的依赖：** F17 ① 现在用 `/compare`，E2E-16 的依赖可以写出 STO-07。

## 计票

本轮赞成 2，反对 1：

- **赞成：** D8-09（含 D3 补充条款）、D8-14；
- **反对：** D8-01（F14、F15 ② 的环境身份，以及 F08 的 `replaced`，都不在 D6 读取接口中）。

**D8-01 的改投条件：** 按上表的最小修改，改写 F14、F15 ②、F08 的判据，并且矩阵中不再有任何判据读取 D6 读取接口之外的字段。

加上前几轮的票，task:high 对 D8-02 至 D8-16 全部赞成，只剩 D8-01 未决。
