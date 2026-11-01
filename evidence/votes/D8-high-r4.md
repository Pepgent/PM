# D8 soroi MVP 验收定义与实现计划 · task:high 第 4 轮选票

投票者：task:high（Governance2_880f.D8HighR4），Claude 族的独立票。

对象：`pepgent-pm/evidence/decisions/D8-mvp-scope.md` 第 3 轮修订后需要重投的行。修订清单见 `D8-r1-responses.md` 的“第 3 轮”和“第 3 轮：与 D2–D7 最终文本的对齐”。

- **D8-01：** 矩阵 F01、F02、F06、F11、F15、F22、F24、F31 的修订文本；
- **D8-03、D8-04；**
- **D8-09：** 含第 16 项的 D3 补充条款。按 leader 席的技术裁决，操作员在终端直接启动的 TUI 根 omp 自己就是写方，不经 Mux；它启动的 soroi 子 agent 仍经写方的 dial 进入 Mux；
- **D8-13：** VS1 的步骤；
- **D8-14：** 修订过的切片 MUX-03、STO-02、STO-09、STO-12、SOR-03、SOR-08、SOR-13、SOR-17a、SOR-20、REM-01、REM-02、REM-06、REM-07、LAB-05、LAB-11b、LAB-12、WEB-07、DIST-04、DEP-01、DEP-03、ENV-04、E2E-13、E2E-17；
- **D8-16。**

## 核对依据

每一项都与下列文本逐条核对：

- **已通过的 D2–D7 当前文本：**
  - D2-08、D2-20、D2-25（D2:45、57、62）；
  - D3-06 至 D3-19（D3:60-73）；
  - D4-05、D4-07（D4:51、53）；
  - D5-07、D5-11 至 D5-16，以及 §3.3、§3.6（D5:82-91、234-244、290-311）；
  - D6-03 至 D6-22 与接口草图（D6:31-50、105-212）；
  - D7-04 至 D7-20 与接口草图（D7:64-80、138-212、242）；
- **PM#4 的 leader 实现期裁决**（2026-11-01T00:21Z 评论）：
  - `EndedUnstarted{ended_at}`，`remove` 要等到终态；
  - Slurm 的 `shared_root`/`run_root`，central 与 lab-web 都要挂载共享目录；
- **PM#5 的 leader 实现期澄清**（2026-11-01T00:19Z 评论）：
  1. 首批 STO 切片（STO-01/02/03）包含最小 transfer 生命周期；
  2. `RunGraph` 中被中止的调用（Aborted）是一个独立变体，不带 `version`、`body`、`env`。

## 逐行投票

| ID | 票 | 理由 | 反例 |
| --- | --- | --- | --- |
| D8-01 | 反对 | 本轮修订的多数行与 D2–D7 一致：<br>• **F01、F02 ③：** 改为由根 supervisor 调用 `POST /runs/{run}/end` 并得到 `Ended{seq}`，与 D6-05、D6:115-118 一致；`runEnded` 字段在 D5:244 中存在；<br>• **F15：** 改用 D6:147 的 EvalTransfer 路径；<br>• **F22：** 第二部分的 ⑤–⑧ 与 D5-12 一致，即释放取自监管者，worker 逐步提交；`step_committed.step.session` 在 D6:205-207 的 `RunEvent` 中存在；<br>• **F24：** `parentAborted` 与“P 未结束时才写中止”的写法与 D6-16、D6:131 一致；<br>• **F31 ②：** `pending_launch`、`experiment.approve` 与 `experiment_ext.draft` 的写法与 D7-06、D7:161-162 一致。<br>但 F06 与 F11 的修订文本，判据所依赖的事实无法从 D6 的任何读取接口得到 | **F06（D8:125）：** 判据要求读 `GET /captures/{identity}` 返回的 `CaptureRecord.inputs`。可是在已通过的 D6 中，测试方拿不到某次调用的捕获身份：<br>• `GraphNode` 的 `Call` 变体没有 `capture` 字段（D6:170-173）；<br>• `CallStatus` 没有（D6:167-169）；<br>• `RunEvent` 的 `call_*` 只带 `GraphNode`（D6:205-207）；<br>• `/runs/{run}/state` 的 `origin` 只是字符串（D6:189）；<br>• 工具结果里的 `CallReport` 也没有（D5:234-240）。<br>D6:191 的 `/captures/{identity}` 是供插件查复用用的：插件自己算出身份（D6:229），读方并不知道这个身份。<br>所以，一个完全按 D6 实现的 store 加 F06 spec，构造不出这个 URL，F06 ② 无法判定，D8-01 要求的“32 行全部通过”在正确的实现上也无法达成。<br>**F11（D8:130）：** “capture 身份等于 A 的”同样没有可观察的来源。<br>**最小修改（任选其一）：**<br>(a) F06 改用 `RunGraph.edges[].to.input` 按位置找到输入 atom，再核对这些 atom 的值，即 `Root.value` 或上游 `Call.outputs[].value`；F11 改为 `GET /compare?a=A&b=B` 中 `calc` 那一对是 `SameCapture`（D6-13 规定 `SameCapture` 表示身份相同，D6:198）。<br>(b) leader 仿照 PM#5 第 2 项发一条实现期澄清，给 `GraphNode` 的 `Call` 变体加上 `capture: Hash`，F06、F11 保持现在的写法。<br>F17 ① 的“这次调用的 capture 身份 `GET /captures/{id}` 返回 404”（D8:136）有同样的问题，F17 不在本轮重投范围内，要按同一办法一并修改 |
| D8-03 | 赞成 | **发行导入：** 改为 `PUT /releases/{version}`，一个事务里校验哈希，把 boot、runner、定制 tar 按内容哈希分别放入对象目录，并写 `ReleaseRecord`。这与 D6-22（D6:50）、D6:155-158 逐字一致，也与 PM#4 正文中导师对 D4-05 的重投依据一致。<br>**runner：** VS1 的发行物里能有 runner，来源是 SOR-01 迁入的现有 `runner.ts`（D4:18 引 `src/runner.ts:1-42`）。<br>**A0：** 顺序 (a)–(d) 与第 2 轮通过的版本相同 | — |
| D8-04 | 赞成 | “四条线”按 D7-20（D7:80）原样转述：<br>• store；<br>• Mux 的写方、读方与控制端点；<br>• RPC host tools；<br>• Lab 库 `.omp/`。<br>根会话启动方式引用 D7-04 的启动配方，控制端点引用 D3-19。<br>LabStandIn 的边界没有长出业务行为。本轮改动不改变语义 | — |
| D8-09 | 赞成 | **D3 补充条款：** 第 16 项的条款是“操作员在终端直接启动的 TUI 根 omp 自己是写方，不经 Mux；它的 soroi 子 agent 仍由插件作为写方经 dial 启动”。<br>• 这条条款给出了 F20 的 Agent Hub kill 与 F21 的 `--resume` 合规的验收入口，这两项只有 TUI/CLI 入口（FC:332-355；omp://rpc.md 没有 kill 或 resume 命令）。<br>• 子 agent 仍走 D3-07、D3-09 的写方生命周期，所以 F20 ①–④、F21 用到的 `generation_up`/`generation_down` 仍是 Mux 上的权威事实（D3-15）。<br>**与 D3 其余条款不冲突：**<br>• D3-12 规定根会话的人类 IRC 写方是 Lab，PTY 流程用不到；<br>• D3-19 的端点注册要出示 `MUX_GENERATION`/`MUX_TOKEN`，这两个值只有经 dial 启动时才在 env 里（D7:212、242）；TUI 根会话没有代，不注册 `eval:<session>`，F20、F21 和 A0 也都不用它的端点。<br>**A0：** A0 的 IMG-01 容器入网、先查 HOME 后注入，与 D8-03 一致 | — |
| D8-13 | 赞成 | VS1 的第 6 步改为 `POST /runs/steps（open）`，新增第 7 步：supervisor 调用 `POST /runs/{run}/end` 并断言 `Ended{seq}`。这两步与 D6-05、D6:115-118 一致，`mayEnd` 已经清除，导师在第 3 轮提出的反例已消除。<br>VS1 能否真正闭合，还取决于 D8-14 中 STO-02 的修改（见下一行）。那是切片内容的问题，不是 VS1 步骤顺序的问题，所以本行赞成 | — |
| D8-14 | 反对 | 多数修订切片与 D2–D7 以及 PM#4 一致：<br>• **MUX-03：** 与 D3:60 逐字一致；<br>• **STO-09：** 与 D6-16、D6:131 一致；<br>• **STO-12、DEP-03：** 与 D6-22 一致；<br>• **SOR-13：** 与 D5 §3.6、D7-09 一致；<br>• **SOR-17a、SOR-20、REM-02、REM-07：** 处理 `EndedUnstarted`，`remove` 等到终态，符合 PM#4 第 1 项；<br>• **REM-01/02、ENV-04、DIST-04、DEP-01、E2E-17：** `shared_root`、`body.log` 与两处挂载，符合 PM#4 第 2 项；<br>• **REM-06、LAB-12：** 与 D7-12、D7-18、D7:145-146 一致；<br>• **LAB-05：** 与 D7-05、D7:216-221 一致；<br>• **LAB-11b：** 与 D7-06 一致；<br>• **WEB-07：** 与 D7-11、D7-17 一致；<br>• **E2E-13：** 收口 F22 的两部分。<br>但 STO-02 没有吸收 PM#5 第 1 项，SOR-03 与 SOR-08 的验收又依赖更晚波次才有的批次 | **反例 1（STO-02 与 PM#5 第 1 项，VS1 无法闭合）：**<br>• D6 的 `StepCommit.transfer` 是必填字段（D6:107）；<br>• D6-07 规定每次 eval 调用开始时，中间件都要 `POST /transfers`，dry run 与正式运行都一样（D6:35）。<br>所以 F01 的那一步正式提交必须先有 transfer 端点。PM#5 第 1 项为此把最小闭环划进首批 STO 切片（STO-01/02/03）：`POST /transfers`、`PUT /transfers/{t}/objects/{sha256}`、步提交时转入对象目录、`DELETE /transfers/{t}`。<br>D8 却没有吸收这一点：<br>• STO-02（D8:267）只写了 `/runs/steps` 与 `/end`；<br>• STO-04（D8:269）仍写着“`POST /transfers`、PUT 对象……DELETE”，而 STO-04 在 W1，不在 VS1。<br>照 D8 实现时，VS1 的 store 没有 `/transfers`，SOR-02/03 按 D6-07 开暂存区就会失败；如果不开，`StepCommit` 又缺少必填的 `transfer`。两种情况下 `s1/f01.spec.ts` 都过不了，VS1 关不上。<br>**最小修改：**<br>• STO-02 的内容与验收加上上述最小 transfer 闭环，验收为 F01 那一步带 transfer 提交；<br>• STO-04 收窄为 volume tar、`GET /transfers/{t}/volumes/…/files`、`/volumes/…` 与远程进度，与 PM#5 第 1 项逐字对齐；<br>• SOR-02 写明每次 eval 调用开一个 EvalTransfer。<br>**反例 2（验收依赖更晚的波次）：** 有两个切片的验收依赖 W2 的批次：<br>• **SOR-03（VS1，D8:285）：** 验收含“批次未释放时 supervisor 不发 `/end`”；<br>• **SOR-08（W1，D8:290）：** 验收含“未释放批次的产出只对产出它的 worker 子树可见”。<br>可是批次只有在 SOR-12（W2，D8:294）落地之后才存在，SOR-08 自己也写着“批次分组在 SOR-12 补上”。<br>D8-14 规定“只有依赖的切片已有 runtime 验收证据，下游才能开工”。按这条规则：<br>• E2E-10 依赖的 F01 链与 E2E-11a（W1，依赖 SOR-03、SOR-08）都要等 W2 的 SOR-12；<br>• §4.1 的波次顺序（VS1 → W1 → W2）因此不成立。<br>**最小修改：** 把这两条批次判据移到 SOR-12 的验收里，或照 SOR-17a 的写法注明“批次分支由 E2E-13 的 F22 ⑥⑦⑨ 验证”，并从 SOR-03、SOR-08 的验收中删去 |
| D8-16 | 赞成 | P5 拆成两部分，与 D7-12、D7-18 修订后的文本一致：<br>• 只读部分（`remote runs`、`status`、`tail`）进入 MVP；<br>• 控制部分 `restart`、`destroy`、`new_sandbox` 列入 D9（D7:72、283）。<br>P4、P6–P9、P11 的出处与 D7:283、285-289 一致。<br>导师在第 3 轮的反例是“F17 S2 与 F31 ④ 必然失败”，现在已消除 | — |

## 非阻塞建议（不构成改投条件）

**1. D8-09 / D3 条款的措辞**

- 在条款里明写：“TUI 根会话没有代，因而不注册 `eval:<session>` 控制端点，它持有的运行不经 Lab 介入”。这样 SOR-13 的实现者不会在没有 `MUX_GENERATION` 的情况下尝试注册端点。A0 的根会话同样是 TUI 根会话，适用同一句话。
- D2-08（D2:45）写的是“进程一律由写方用 dial 启动”，应引用这条 D3 新条款，避免两张表字面上冲突。
- D8-09 的“待裁决”段在裁决落地后，应改写为对已定条款的引用。

**2. F15 ①**

写明 spec 从哪里取得 `t` 与 `position`：remote 运行记录 `runs/<run>.json` 里原样保存了 `RunRequest.output`，即 D4-05 的 `PUT /transfers/{t}/volumes/{position}`。同时写明 run id 的来源：E2E-17 不依赖 REM-06，所以不能用 `remote runs`。

**3. F22 ⑨**

批次释放之前，前 N−1 个 worker 的产出仍未消费。即使 supervisor 提前发了 `/end`，store 也只会返回 `NotEmpty`、什么都不写，所以 ⑨ 观察不到 supervisor 是否发过请求。

如果要让 ⑨ 能证伪，可以另放一个小批次：其中已交回的 worker 把产出全部 `stop`，让已提交的未消费集合在最后一个 worker 交回前为空。然后判定在批次释放之前 stream 里没有 `run_ended`，并且最后一个 worker 的步仍提交进同一个 `Open` 运行。这正是 D6-05 所防的情形。

**4. PM#5 第 2 项（Aborted 是独立变体）**

STO-03 的 graph 投影，以及 LAB-07a、WEB-03 的消费方，应写明处理这个不带 `version`、`body`、`env` 的变体。这几个切片不在本轮范围内。

**5. 依赖没有覆盖验收的需要**

| 切片 | 验收需要 | 依赖缺了什么 |
| --- | --- | --- |
| LAB-12 | 显示 `EndedUnstarted` | REM-07、REM-02 |
| REM-06 | 列出一个 Slurm 作业 | REM-01 |
| SOR-20 | 中止一个仍在排队的作业，得到 `EndedUnstarted` | 实际只有 Slurm 能稳定排队（REM-02，W5）。建议照 SOR-17a 交给 E2E-17 验证 |

按“依次”的波次顺序，前两项实际不会阻塞，但 DAG 应如实写出这些依赖。

**6. F23 的 `event.replaced`**

“`event.replaced` 指向原调用”（D8:142）与 F06 是同一类问题：`GraphNode` 和 `RunEvent` 都没有暴露 `HumanEvent`。F23 不在本轮范围内，提请一并处理。

**7. D8-16 的措辞**

“D7-12、D7-18 正在同步修订”可以改为已修订的引用。

## 计票

本轮赞成 5，反对 2：

- **赞成：** D8-03、D8-04、D8-09（含第 16 项的 D3 条款）、D8-13、D8-16；
- **反对：** D8-01（F06、F11 的捕获身份不可观察）、D8-14（STO-02 没有吸收 PM#5 第 1 项的 transfer 闭环；SOR-03、SOR-08 的验收依赖 W2）。

改投条件：

- **D8-01：** 按 (a) 或 (b) 修改 F06、F11，并连带修改 F17 ①；
- **D8-14：** 按反例 1 的修改对齐 STO-02、STO-04（以及 SOR-02），并按反例 2 的修改移走 SOR-03、SOR-08 中的批次判据。
