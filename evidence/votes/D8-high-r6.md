# D8 soroi MVP 验收定义与实现计划 · task:high 第 6 轮选票

投票者：task:high（Governance2_880f.D8HighR4），Claude 族的独立票。

对象：`pepgent-pm/evidence/decisions/D8-mvp-scope.md` 第 5 轮修订后需要重投的 D8-01、D8-14。修订清单见 `D8-r1-responses.md` 的“第 5 轮”。

## 核对方法

1. **读修订后的全文：** 范围是“第 5 轮”表里列出的全部位置。
   - 矩阵：F06、F07、F08、F11、F12、F14、F15、F22、F24（D8:125-143）；
   - 决策行：D8-11（D8:82）；
   - 切片：STO-02、SOR-07、SOR-12、E2E-16（D8:267、289、294、383）。
2. **对照我第 5 轮的反例与改投条件逐条比对。**
3. **按第 5 轮立下的标准，对 §3 的 32 行再扫一遍：** 每个判据只能读 D6 读取接口暴露的字段（D6:54-212）。扫描时查找以下关键词，剩下的命中都是 Lab 自己的事实或否定性说明：
   - “来历”“身份”“replaced”“parentAborted”“捕获”“CaptureRecord”“identity”“origin”。

## 逐行投票

| ID | 票 | 理由 | 反例 |
| --- | --- | --- | --- |
| D8-01 | 赞成 | **第 5 轮改投条件逐条满足：**<br>• **F14（D8:133）：** 改为 graph 节点的 `env` 是 `{kind:"remote", template:"soroi-komodo", remoteRun}`，`remoteRun` 等于 `ListStacks` 中看到的 run id（D6:69、172）。“换镜像后不再复用”交给 SOR-07。<br>• **F15 ②（D8:134）：** 改为 `env.template = "soroi-slurm"`，`remoteRun` 等于这次 `remote run` 返回的 run id。<br>• **F08（D8:127）：** 改为 graph 状态是 `Human`、`body` 是 `"Human"`，stream 中这一位置有 `human_handback`、没有 `call_aborted`。<br>**全面扫描后的同步修改也都读得到：**<br>• **F11：** graph 中这次调用的 `CallStatus` 是 `Adopted`（D6:168）。<br>• **F24 ①：** 判据改为 P 的 stream 中有没有 `run_aborted`、P 的 `graph.state` 是什么（D6:178、206），不再依赖插件收到的 `parentAborted`。<br>• **F24 ②：** 改为 graph 中的 `Inherited{sourceRun = P, …}`（D6:169）。<br>• **F07 ③：** 改为这一步不提交，即 stream 最大 seq 不变、graph 里没有这个调用节点。这与 D6 的提交形状一致：`CallCommit.outcome` 只有 `Done` 和 `Aborted` 两种（D6:93-100），交回失败的调用本来就无法随步提交。<br>• **F12 ②：** `hash` 取 `Root.value.content`（D6:67、194）。<br>• **F06：** `bundle` 经 `/objects` 取回后的 sha256 等于 `version`（D6:101-104）。<br>• **F22 ⑨：** 两个 worker 都把产出全部 `stop`。这样提前结束的实现会在 stream 里留下 `run_ended`，判据可以证伪；释放后 `/end` 得到 `Ended`，前提成立。<br>扫描后，矩阵中不再有读取 D6 读取接口之外字段的判据。仍出现的“capture 身份”“`parentAborted`”只用于说明“测试不读它”；F30 的 `origin` 是 `lab.sqlite` 的事实 | — |
| D8-14 | 赞成 | 第 4 轮的两条反例在第 5 轮已经消除，本轮修订没有破坏它们：<br>• STO-02 保留 VS1 的最小 transfer 闭环，并加上 `GET /transfers/{t}/objects/{sha}`。验收改为在同一个 URL 上判定：`DELETE` 之前返回 200，之后返回 404（D8:267）。这样实现没做这个端点时，判据也不会误判通过；<br>• SOR-07 的验收改为可观察的事实：换镜像后同一调用真实执行，不是 `call_adopted`，`/compare` 也不是 `SameCapture`（D8:289）。它承接了 F14 移出的判据；<br>• SOR-12 的依赖加上 SOR-03、SOR-08（D8:294）；<br>• E2E-16 的依赖加上 STO-07（D8:383）。<br>依赖都写出来了，没有切片依赖更晚的波次 | — |

## 非阻塞建议（不构成改投条件）

**F12 ② 的 hash。** F12 ② 把 `/values/{hash}/runs` 的 `hash` 取作 `File` 值的内容哈希 `Root.value.content`。这要求 D6 占位 P1 对 `File` 值的身份编码就是内容哈希（D6:57、67）。

建议由 STO-08 的验收写明这一点：用一个 `File` 根 atom 的 `content` 查询 `/values`，能列出用到它的运行。这样实现者不会把 `File` 值的身份编码成 `{content, media, name}` 的哈希，否则 F12 ② 会落空。

## 计票

本轮赞成 2，反对 0：

- **赞成：** D8-01、D8-14。

加上前几轮的票，task:high 对 D8-01 至 D8-16 全部赞成：

| 轮次 | 赞成的行 |
| --- | --- |
| 第 1 轮 | D8-02、D8-05、D8-10、D8-11、D8-12、D8-15 |
| 第 2 轮 | D8-08 |
| 第 3 轮 | D8-06、D8-07 |
| 第 4 轮 | D8-03、D8-04、D8-13、D8-16 |
| 第 5 轮 | D8-09 |
| 本轮 | D8-01、D8-14 |

## D8-14 round 7

对象：第 6 轮修订后的 D8-14，见 `D8-r1-responses.md` 的“第 6 轮”。LeadMentor 在 `D8-mentor-r6.md` 中提出的两个反例已被采纳。本节核对修订后的 STO-02、SOR-07、STO-08（D8:267、289、273）。

| ID | 票 | 理由 | 反例 |
| --- | --- | --- | --- |
| D8-14 | 赞成 | **STO-02：** 导师的反例成立。D6-07 规定正式提交在同一事务里把字节转入对象目录，并删除暂存区（D6:35），所以我第 6 轮建议的“`DELETE` 前 200、后 404”只适用于从不提交的 transfer，套到正式路径上就错了。<br>现在拆成两种情形，分别对应 D6-07 的两个结束锚点：<br>• **① 正式提交：** 提交前 transfer URL 返回 200；提交后 `/objects/{sha}` 返回 200，同一个 transfer URL 返回 404；<br>• **② 从不提交：** 显式 `DELETE` 前返回 200，之后返回 404。<br>两种情形都在同一个 URL 上先 200、后 404，没实现这个端点的 store 通不过。这也与 PM#5 第 1 项“正式提交后的清理仍以提交确认为锚点”一致。<br>**SOR-07：** 第二个反例也成立：只换 tag 不保证 digest 改变，第二次被复用可能是合法的。现在改为换到 digest 确认不同的镜像，或改动计入 `config` 的模板配置，并先断言 `remote templates` 返回的 `identity` 前后不同（D4-18、REM-05），再断言第二次不是 `Adopted`、`/compare` 不是 `SameCapture`。<br>这个判据只在身份确实改变时才要求“不复用”，与 D4-18 的身份公式一致。<br>**STO-08：** 依据 `design/store.md:29`“文件的身份是内容的哈希”，写明 `File` 值的身份就是它的内容哈希，并加上用 `Root.value.content` 查询 `/values` 的验收。我在本文件中提的非阻塞建议已落实。<br>依赖没有变化，切片数仍为 108 | — |

**非阻塞建议：** SOR-07 的验收要正式运行一次远程调用，这要用到远程正式运行路径 SOR-17a，但依赖列只有 SOR-06、REM-05。

- 两者同在 W4，实际不会阻塞；
- 建议在依赖里写出 SOR-17a，并写出另一个 digest 的镜像从哪里来（例如 IMG-02 另推一个 tag）。

**计票：** 本节 D8-14 赞成。task:high 对 D8-01 至 D8-16 仍全部赞成。
