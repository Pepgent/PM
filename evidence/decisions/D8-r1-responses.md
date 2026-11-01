# D8 第 1–7 轮投票：反例回应、修订与最终计票

## 第 1 轮

本轮投票见 Pepgent/PM issue #8（https://github.com/Pepgent/PM/issues/8）：

| 投票方 | 结果 |
| --- | --- |
| argon | 16/16 赞成 |
| leader | 16/16 赞成 |
| task:high | 13 赞成，3 反对（D8-01、D8-13、D8-14），选票见 `evidence/votes/D8-high.md` |

本文逐轮记录每个反例、非阻塞建议及其对应修订，修订直接落在 `evidence/decisions/D8-mvp-scope.md`。各轮选票和导师投票包保留为当轮的原始证据；最终文本以第 7 轮表决对象为准。

修订后，D8 共有 107 个切片（原 104）。用脚本复核过：

- 所有依赖都指向存在的切片，依赖图里没有环；
- 每个切片恰好属于一个波次，没有切片依赖更晚的波次；
- VS1 仍是 18 个切片，VS2 仍是 13 个；
- F01–F32 每条流程都有收口切片。

## 1. 反对票的反例

| 选票位置 | 反例 | 修订 |
| --- | --- | --- |
| D8-01 反例 1（`D8-high.md:19`） | F02、F22 的第 1 步由脚本写出，atom 名本来就在 AI 的上下文里。即使提醒钩子什么都不注入，F02、F22 也照样通过，提醒注入（FC:71）和来源签名（FC:368）都没有被观察到 | **SOR-08：** 每次注入的提醒原文另记一条 transcript 自定义条目，不进模型上下文；验收加上“每次注入都有对应条目，正文与注入文本相同”。<br>**§2.1：** 新增占位 EP7，由 SOR-08 最先确认。<br>**矩阵 F02：** 加 ⑤，提醒条目的 atom 集合等于当时的 `state.unconsumed`，每行符合 D5-13 的格式。<br>**矩阵 F22：** 加 ④，提醒条目列出全部 5 个产出，每行都带 `← run_*(…)`。<br>**D8-08：** 写明提醒本身以 SOR-08 的条目作直接证据 |
| D8-01 反例 2（`D8-high.md:19`） | F20 只测了 Agent Hub kill，没测 FC:337 的 `proc://<id>/kill`（只取消当前这一轮，进程存活） | **矩阵 F20：** 在 ② 和 ③ 之间加 ②′。`Alpha` 跑 `slow_step` 期间，根会话执行 `proc://<id>/kill`。判据：这一轮在 transcript 中被中止；Mux 没有 `generation_down`，也没有新的 `generation_up`；再发消息，`Alpha` 在同一代里回复（SUB-RD:15；FC:337）。<br>**D8-09：** PTY 的用途补上作业取消 |
| D8-01 反例 3（`D8-high.md:19`） | F25 只测了 subagent 忙时，没测 FC:412 的“空闲时立即唤醒” | **矩阵 F25：** S1 加一条，`Alpha` 空闲时经读方发 `mux_human_irc`，`Alpha` 立即开始新一轮（读方流里有 `agent_start`），transcript 中有这条消息，来源是 `human:<principal>` |
| D8-13（`D8-high.md:31`） | F04 那一步含 Agent 节点 `review`。F05 要把同一段代码原样正式提交，`review` 必须真的运行，这要 W2 的 SOR-09 至 SOR-11 交付。可是 F05 排在 W1，W1 因此关不上 | **§4.1：**<br>• W1 的流程改为“F02–F04、F06、F09–F13”；<br>• W2 的流程加上 F05，并写明理由。<br>**§4.2：** E2E-11 拆成两片：<br>• E2E-11a：F02–F04，留在 W1；<br>• E2E-11b：F05，依赖 E2E-11a 与 SOR-11，归入 W2。<br>**矩阵 F05：** 判据加上“`review` 作为 Agent 真正运行并完成捕获（`body:"Agent"`）”，组件加上 SOR-11 |
| D8-14 反例 1（`D8-high.md:32`） | STO-12 的验收要求发行 tar 已在对象库中，但它没有依赖产出发行 tar 的 DIST-01 | **STO-12：**<br>• 依赖改为 STO-01、DIST-01；<br>• init 改为按 `manifest.json` 逐项导入；<br>• 验收改为“manifest 列出的每个发行物都能 `GET /objects/<哈希>`”；<br>• 写明 `boot.js` 的两个分支分别随 SOR-17a、SOR-18 进入发行物，届时由 DIST-01 重新产出 |
| D8-14 反例 2（`D8-high.md:32`） | 没有切片负责在 lab-web 里安装 soroi（D2-20 的规定），VS2 中 dial 起来的根会话没有 `soroi_eval` | **IMG-04：**<br>• 容器启动时用 installer 安装发行 tar，做法与 central 相同（D2:57）；<br>• 依赖加上 DIST-01；<br>• 验收加上“按 A0 第 ① 项的办法检查，lab-web 里 `omp` 的工具清单含 `soroi_eval`、`soroi_task`” |
| D8-14 反例 3（`D8-high.md:32`） | A0 要求 HOME 为空，可是 E2E-02 在已经装好发行 tar 的 `central` 里运行，A0 的第一项检查就会失败 | **E2E-02：**<br>• 依赖改为 IMG-01、DIST-03；<br>• A0 用 `docker run --rm -it` 新起 IMG-01 容器，F20、F21 仍在 `central` 中运行；<br>• 验收改为“在新起的 IMG-01 容器里执行 A0 探针，退出后容器和 PTY 都已清理”。<br>**D8-03、D8-09：** 同步写明 A0 在新起的 IMG-01 容器里运行 |

## 2. task:high 的非阻塞建议

| 建议 | 修订 |
| --- | --- |
| D8-03 A0 第 ④ 项用了模型措辞，与 D8-11 冲突（`D8-high.md:21`） | D8-03 第 ④ 项改为“transcript 里有发行包规则的注入记录，注入文本与发行包里的规则文件一致”，不再用模型的回答作判据 |
| F03 没有覆盖“不启动任何节点进程”（FC:84；`D8-high.md:44`） | 矩阵 F03：每段违规代码另放一条 `slow_step(label_<段号>)`，判定它的标记文件不存在，且 Mux `/agents` 没有新增。D8-07：`slow_step` 运行时在 cwd 写标记文件 `out/slow_step-<label>` |
| F14 只证明有产物，没有证明远程结果正确（`D8-high.md:55`） | 矩阵 F14：加“标量输出等于节点代码按输入应得的值（同 F06）” |
| LAB-11 一片包含五项功能，偏大（`D8-high.md:81`） | 拆成两片：<br>• LAB-11a“读取与装载”：停驻会话的 transcript、`discussion.load`、附件；<br>• LAB-11b“草稿与启动”：`draft.save`、`experiment.start`。<br>WEB-04 改为依赖两者；矩阵 F09 引用 LAB-11a，F27 引用 LAB-11b |
| SOR-17 偏大（`D8-high.md:81`） | 拆成两片：<br>• SOR-17a“正式运行路径”，mid；<br>• SOR-17b“dry run 分流”，low，依赖 SOR-17a。<br>同步更新：SOR-18 依赖 SOR-17a，E2E-16 依赖 SOR-17a，E2E-17 依赖 SOR-17a 与 SOR-17b；矩阵 F14、F15 的组件；W4 的切片清单及其并行说明 |

## 3. argon 的执行细化提示（`evidence/votes/D8-argon.md:128-131`）

| 提示 | 修订 |
| --- | --- |
| 1. F23 的跨步提醒格式 | 矩阵 F23：被替代调用的另一个产出留到下一步消费，提醒条目中这一行写作 `← human 替代 fn(参数)`（D5:88），与 F08 的 `← human` 区分。矩阵 F08 也改为以提醒条目作证据。SOR-08 的“解锁”列加上 F08、F23 |
| 2. 中心 worker 的批次释放 | E2E-13：把 SOR-12 的多 worker 批次释放记入 verdict。判据是同批全部交回之后，提醒条目里才出现以 `purpose` 为组头的这批产出（D5:87） |
| 3. F24 的 S2 两条子路径 | 矩阵 F24：S2 必须走两条路径：在实验详情页改参数派生（`ChangeInput`），以及经节点库 `library.apply` 改函数体后按新版本派生（`ChangeVersion`）。两次派生的导航都要显示“派生自” |

## 4. 改动清单

- **决策行：** D8-03、D8-07、D8-08、D8-09。
- **占位：** §2.1 新增 EP7。
- **验收矩阵：** F02、F03、F05、F08、F09、F14、F15、F20、F22、F23、F24、F25、F27。
- **波次表（§4.1）：** W1、W2、W4、W6，以及“并行与提前”第一条。
- **切片表（§4.2）：**
  - 改动：IMG-04、STO-12、SOR-08、SOR-18、WEB-04、E2E-02、E2E-13、E2E-16、E2E-17；
  - 拆分：SOR-17 拆为 SOR-17a、SOR-17b，LAB-11 拆为 LAB-11a、LAB-11b，E2E-11 拆为 E2E-11a、E2E-11b；
  - 计数：合计 107，其中 SOR 21、LAB 14、E2E 15。

## 第 2 轮（round 2）

第 2 轮投票结果：argon 7/7 赞成；task:high 对 D8-01、D8-08、D8-09、D8-13、D8-14 赞成，对 D8-03、D8-07 反对，选票见 `evidence/votes/D8-high-r2.md`。两张反对票都针对第 1 轮修订新引入的内容。

| 选票位置 | 反例 | 修订 |
| --- | --- | --- |
| D8-03（`D8-high-r2.md:18`） | 第 1 轮把 A0 改到新起的 IMG-01 容器里，但这个容器既没有模型凭据，也没有 `SOROI_STORE_URL` 和 Mux 地址，还不在 `pepgent-soroi-e2e` 网络里。A0 的探针要模型真的跑一轮，所以五项全部失败；到 W2 之后，即使有了凭据，`soroi_eval` 和 `soroi_task` 也连不上 store 与 Mux | **D8-03：** A0 容器加入 `pepgent-soroi-e2e` 网络，执行顺序固定为：<br>(a) 检查 HOME 为空；<br>(b) 注入与 `central` 相同的 env、`models.yml` 和 A0 自己的 client token；<br>(c) 运行 installer；<br>(d) 执行探针。<br>**D8-06：** 消费方加上 A0 的临时 IMG-01 容器。<br>**ENV-02：** `--clients` 文件里另为 A0 容器准备一个 client token。<br>**E2E-02：** 写明 (a)–(d) 的顺序；依赖加上 ENV-02；验收要求 (a) 在注入之前就通过。<br>**D8-09：** 写明 A0 容器要入网，并且先查 HOME 再注入 |
| D8-07（`D8-high-r2.md:19`） | 节点运行时的 cwd 是 runner 的临时目录或 `<mount>/work`（D4:50、53），不是会话 worktree，所以标记永远不会出现在矩阵检查的位置，F03 无论如何都会通过。合法那一步也没有断言标记存在，探针失效了也没人能发现 | **D8-07：** `slow_step` 把标记写到运行它的 `central` 容器里的绝对路径 `/var/tmp/soroi-e2e/markers/<label>`，与 runner 的 cwd 无关。<br>**矩阵 F03：**<br>• ① 判定该目录里没有 9 个违规段的标记；<br>• ② 判定合法那一步两条 `slow_step` 的标记都存在，作为阳性对照；<br>• 证据列加上“标记目录前后清单” |

第 2 轮改动清单：

- 决策行：D8-03、D8-06、D8-07、D8-09；
- 验收矩阵：F03；
- 切片：ENV-02、E2E-02。

切片数不变，仍是 107。

## 第 3 轮

第 3 轮投票结果：task:high 与 argon 均 16/16 赞成；LeadMentor 第 1 轮 13 赞成，对 D8-01、D8-13、D8-16 反对，选票原文见 `evidence/votes/D8-mentor.md`。

| 选票位置 | 反例 | 修订 |
| --- | --- | --- |
| D8-01 反例 1（`D8-mentor.md:4`） | F22 只测了一步内的五路并发，没有测多个中心 worker 的批次屏障。假如实现在前两个 worker 交回时就把它们的 atom 暴露给主 agent，F22 仍会通过 | **矩阵 F22：** 新增第二部分 ⑤–⑨：<br>• ⑤ 一次带 `purpose` 的 `soroi_task` 派出 3 个 `writesEval` 为真的中心 worker；<br>• ⑥ 前 N−1 个 `soroi_return` 被接受之后，强制主 agent 请求一次模型，这次的提醒条目里没有这批产出，尽管它们已在 store 里提交；<br>• ⑦ 第 N 个被接受之后，提醒一次列出全部产出，组头是 `purpose`；<br>• ⑧ 每个 `step_committed.step.session` 都是写这一步的 worker 的会话；<br>• ⑨ 批次释放之前，根 supervisor 不发 `/end`。<br>组件加上 SOR-12。<br>**E2E-13：** 写明 F22 两部分都由它收口，依赖加上 SOR-08 |
| D8-01 反例 2（`D8-mentor.md:4`） | F15 查询的 `GET /transfers/{t}/files/soroi/result.json` 不是 D6-07 的 EvalTransfer 路径。正确的实现对这个 URL 本来就返回 404，所以判据是假阳性 | **矩阵 F15：** 改用 D6-07 的路径 `GET /transfers/{t}/volumes/{position}/files/soroi/result.json`（D6:147）。eval 返回之前在这个 URL 上读到正确值；返回之后同一 URL 返回 404。D8 中已经没有旧路径 |
| D8-13（`D8-mentor.md:16`） | VS1 第 6 步写的是 `POST /runs/steps（open、mayEnd）`，但已通过的 D6-05 删除了 `mayEnd`，改为根 supervisor 另行调用 `POST /runs/{run}/end`。照 D6 实现时，运行会一直保持 Open，F01 永远不会结束 | **§4.1 VS1：**<br>• 第 6 步改为 `POST /runs/steps（open）`；<br>• 新增第 7 步：根 eval supervisor 确认没有活动的正式 eval、也没有未释放的批次，调用 `POST /runs/{run}/end`，断言 `Ended{seq}`。<br>**矩阵 F01：** ② 写明这一调用和 `Ended{seq}`；证据列保存 `/end` 的请求与响应。<br>**STO-02：** 加上 `POST /runs/{run}/end` 与 `EndResult`（D6:115-118），验收覆盖 `Ended`、`NotEmpty` 两种结果。<br>**SOR-03：** 改为 supervisor 调用 `/end`，不论最后一步由哪个会话提交。<br>D8 中已经没有 `mayEnd` |
| D8-16（`D8-mentor.md:19`） | D8 的 F17（S2）和 F31 要求算力页显示作业与日志尾部，但已通过的 D7 把 P5 移出了第一版，W6 必然无法通过 | **D8-16：** P5 拆成两部分：<br>• 只读部分进入 MVP：新增只读操作 `remote runs`（REM-06），从运行记录列出作业，再按 run id 读 `status`、`tail`；<br>• 控制部分 `restart`、`destroy`、`new_sandbox` 列入 D9 输入。<br>D7-12、D7-18 由治理同步修订。<br>**REM-06：** 改写为只读的 `remote runs`，读 `runs/<run>.json`（REM-RD:52、94-96），去掉“归属待投票”，验收覆盖 Komodo 与 Slurm 各一个作业，以及 `remove` 之后的记录。<br>**LAB-12：** 改写为算力页的只读线数据（`templates`、作业列表、`Presence`、`status`、`tail`），不加控制命令，依赖加上 MUX-04 |

第 3 轮改动清单：

- 决策行：D8-16；
- 验收矩阵：F01、F15、F22；
- 波次说明：§4.1 的 VS1 步骤；
- 切片：STO-02、SOR-03、REM-06、LAB-12、E2E-13。

切片数不变，仍是 107。脚本复核：所有依赖都指向存在的切片，每个切片都在某个波次里，没有切片依赖更晚的波次。

### 第 3 轮：与 D2–D7 最终文本的对齐

按 leader 的要求，把 §3 每一行、§4.2 每个切片与 D2–D7 当前通过的文本逐项核对，D7 按正在修订的最新文件读。核对分五路进行（D2+D3、D4、D5、D6、D7），每路只报冲突，不报省略；D 文件没有改动。另外并入 leader 在 PM#4 登记的两项技术裁决。

**改变语义的对齐（这些行和切片需要重投）**

| D8 位置 | 改动 | 依据 | 语义 |
| --- | --- | --- | --- |
| MUX-03 验收 | “只有自己收到 response”改为“response 广播给所有连接，请求方按 `r{conn}:` 前缀认领”（D3:60） | 见改动内的引用 | 是 |
| D8-04 how | “四条线”按 D7-20 原样转述：Mux 写方、读方与控制端点合为一条，Lab 库 `.omp/` 是第四条 | 见改动内的引用 | 否 |
| F02 ③ | “最后一步 `run_ended`”改为“最后一步提交后，根 supervisor 调用 `POST /runs/{run}/end`，store 另写 `run_ended`”（D6:33） | 见改动内的引用 | 是 |
| F06 | 输入身份改从 `GET /captures/{identity}` 的 `CaptureRecord.inputs` 核对，graph 节点没有 `inputs` | 见改动内的引用 | 是 |
| F11 | 删去“activity 里没有执行区间”，改以 `call_adopted` 与来历 `Adopted` 判定 | 见改动内的引用 | 是 |
| F24 ①② | P 的 `run_aborted` 只在 P 未结束时写，按 `parentAborted` 核对；继承调用以 `call_inherited` 与来历 `Inherited` 判定，不看 activity | 见改动内的引用 | 是 |
| STO-09 验收 | `run_aborted` 只在 P 未结束时写，返回 `Derived{…parentAborted}` | 见改动内的引用 | 是 |
| D8-03 how、STO-12、DEP-03 | 发行导入改为 `PUT /releases/{version}` 一次事务写 `ReleaseRecord`，不再逐项导入对象 | 见改动内的引用 | 是 |
| SOR-08 验收 | 提醒内容改为“`state` 再按 `Subagents.visibility` 过滤后的集合” | 见改动内的引用 | 是 |
| SOR-13 | `writers(runId)` 只在根端点；通用端点只有 `slots`、`answer`、`takeover`；运行级 `abort` 发到根端点 | 见改动内的引用 | 是 |
| F31 ②、LAB-11b | 草稿 `launched` 改为 `pending_launch` 与 `experiment.approve`，绑定记在 `experiment_ext.draft`；LAB-11b 依赖加 LAB-06 | 见改动内的引用 | 是 |
| LAB-12 | 页面线数据只带 `templates`、`jobs{run, status}`、`presence`；日志尾部改走 SSE `/api/lab/jobs/{run}/tail`；`compute` 频道通知；`Removed` 不开流 | 见改动内的引用 | 是 |
| WEB-07 | `harness` 收窄为 `'omp'`，定义名放在 `AgentTemplate.id` | 见改动内的引用 | 是 |
| LAB-05 验收 | `lab_save_artifact` 改为在会话 worktree 生成不可变快照、不写 store；`lab_open_artifact` 拷进 worktree 的 `inputs/` | 见改动内的引用 | 是 |
| SOR-17a、SOR-20、REM-02、新切片 REM-07 | 新增终态 `EndedUnstarted{ended_at}`：新切片 REM-07 在 remote 的 `RunStatus` 与生命周期里加上它，`remove` 等终态后才记 `removed`（两后端，W4）；中间件按终态等待，`EndedUnstarted` 的调用记为失败且不读暂存区；abort 等终态（leader 技术裁决 PM#4）。SOR-17a、REM-02 依赖加 REM-07 | 见改动内的引用 | 是 |
| REM-01、REM-02、ENV-04、DIST-04、DEP-01、E2E-17 | Slurm 模板带 `run_root`（集群可见）与 `shared_root`（调用方可读）；`tail` 读 `shared_root/<run>/body.log`；central 与 lab-web 挂载 Mac 的 `pepgent-slurm/runs` 作为 `shared_root`，验收覆盖可读与 tail（PM#4）。E2E-17 依赖加 ENV-04 | 见改动内的引用 | 是 |
| LAB-12 验收 | 补上排队中被取消的作业显示终态 `EndedUnstarted`（PM#4） | 见改动内的引用 | 是 |
| D8-09（连带 F20、F21、E2E-02） | PTY 根会话改为明确标注“操作员在终端直接启动的 TUI 根会话，不经写方 dial；子 agent 仍经 Mux”，并标为与 D2-08/D3-08/D3-10 冲突、提请在 D3 补条款。D8 不能单方面消除这个冲突 | 见改动内的引用 | 是（需裁决） |

**只改引用、不改语义（不需要重投）**

- REM-05：D4:217-227 → D4:229-242
- §5.1：D4:300-309 → D4:313-324；D6:258-269 → D6:285-296
- §5.1：D7 占位 P1–P12（D7:263-274）→ P1–P9、P11–P13（D7:280-291）
- §5.3：D4:308 → D4:323
- D8-11：D6:54-190 → D6:54-212
- D8-15：D7:263-274 → D7:280-291
- D8-16：D7:266-273 → D7:283、285-289

**需要领导小组裁决的一项。** D8-09 中 F20、F21 的 PTY 根会话，与 D2-08、D3-08、D3-10“所有 omp 都由写方 dial 启动”冲突。Agent Hub kill 与 `--resume` 只有 TUI/CLI 入口，D8 无法在不违背其中一方的情况下改写。D8-09 已写明这个冲突，并提议在 D3 补一句：操作员在终端直接启动的 TUI 根会话不经 Mux，其子 agent 仍经 Mux。

**第 3 轮对齐后的计数：** 新增 REM-07，切片数从 107 变为 108（REM 7 个），归入 W4。依赖变化：SOR-17a、REM-02 加 REM-07，LAB-11b 加 LAB-06，E2E-17 加 ENV-04。脚本复核：所有依赖都指向存在的切片，每个切片都在某个波次里，没有切片依赖更晚的波次。

## 第 4 轮

第 4 轮投票结果：argon 7/7、导师 7/7 赞成；task:high 对 D8-03、D8-04、D8-09、D8-13、D8-16 赞成，对 D8-01、D8-14 反对，选票见 `evidence/votes/D8-high-r4.md`。leader 席选方案 (a)，不改 D6。同时吸收 PM#5 的两项实现期澄清，以及 task:high 的非阻塞建议 1、2、3、5、6、7。

| D8 位置 | 改动 | 依据 | 语义 |
| --- | --- | --- | --- |
| F06 | 输入改为经 `RunGraph.edges[].to.input` 按位置找到 atom，再核对其值；不读 capture 身份 | D8-high-r4.md:36 方案 (a) | 是 |
| F11 | “capture 身份等于 A 的”改为 `/compare?a=A&b=B` 中这一对是 `SameCapture`，证据列同步 | D8-high-r4.md:36 方案 (a) | 是 |
| F17 ① | 删去读 `/captures/{id}` 的 404 判据；改为在途期间运行 B 的同一调用真实执行（非 `call_adopted`），提交后 `/compare` 为 `SameCapture` | D8-high-r4.md:36（F17 ① 同类问题） | 是 |
| F23 | `event.replaced` 不在任何读取接口中，改为 graph 状态 `Human` 加 stream 中该位置的 `call_aborted`、`human_handback`（task:high 非阻塞建议 6） | D8-high-r4.md:78 建议 6 | 是 |
| F22 ⑨ | 改为可证伪的判据：小批次中先交回的 worker 全部 `stop`，最后一个交回前未消费为空，判定此时没有 `run_ended`、最后一步仍进同一 `Open` 运行、释放后 `/end` 得 `Ended` | D8-high-r4.md:56-60 建议 3 | 是 |
| F15 ① | 写明 `t`、`position` 取自 remote 运行记录中的 `RunRequest.output`（task:high 非阻塞建议 2） | D8-high-r4.md:52-54 建议 2 | 否 |
| STO-02、STO-04、SOR-02 | PM#5 第 1 项：最小 transfer 闭环（`POST /transfers`、对象 PUT、提交时转入、`DELETE`）移进 VS1 的 STO-02；STO-04 收窄为 volume tar 与 volume 读取；SOR-02 写明每次 eval 调用开一个 EvalTransfer | D8-high-r4.md:41 反例 1；PM#5 第 1 项 | 是 |
| SOR-03、SOR-08、SOR-12 | 批次判据移出 VS1/W1 的 SOR-03、SOR-08，并入 W2 的 SOR-12 验收，使 VS1 → W1 → W2 成立 | D8-high-r4.md:41 反例 2 | 是 |
| STO-03、WEB-03 | PM#5 第 2 项：`RunGraph` 的 `Aborted` 变体不带 `version`、`body`、`env`，`outputs = []`，写进投影与消费方的验收 | PM#5 第 2 项；D8-high-r4.md:62-64 建议 4 | 是 |
| D8-09 | “待裁决”段改写为已定的 D3 补充条款：TUI 根 omp 自己是写方、不经 Mux、没有代，不注册 `eval:<session>` 控制端点，持有的运行不经 Lab 介入；子 agent 仍经 Mux；D2-08 以本条款为修订；A0 的根会话适用同一条款 | D8-high-r4.md:46-50 建议 1；leader 席裁决 | 是 |
| LAB-12、REM-06、SOR-20 | 依赖如实写出：LAB-12 加 REM-07、REM-02，REM-06 加 REM-01；SOR-20 的排队中止分支交给 E2E-17 验证（task:high 非阻塞建议 5） | D8-high-r4.md:66-74 建议 5 | 否（依赖与验收归属） |
| D8-16 | “D7-12、D7-18 正在同步修订”改为已修订的引用 | D8-high-r4.md:80-82 建议 7 | 否 |

F06 的组件列由 STO-04 改为 STO-02，因为对象经最小 transfer 闭环落盘。测试一律不直接读 capture 身份，F06、F11、F17 ① 都改从 `RunGraph` 与 `/compare` 得到可观察的事实。

切片数仍是 108。脚本复核：所有依赖都指向存在的切片，每个切片都在某个波次里，没有切片依赖更晚的波次。

**第 4 轮补充确认（MUX-03）：** MUX-03 的验收按 D3-06 写为：读方发 `get_messages` 后，response 原样广播给所有连接；请求方按自己的 `r{conn}:` 前缀识别自己的那条，其他读方也会看到这条原始帧（D3:60）。全文不再有“只有请求方收到”或“只有请求方认领”的说法。语义同第 3 轮对齐的第 1 项，本次只是措辞更明确，不需要另行重投。

## 第 5 轮

第 5 轮投票结果：argon 3/3、导师 3/3、leader 赞成；task:high 对 D8-09、D8-14 赞成，对 D8-01 反对，选票见 `evidence/votes/D8-high-r5.md`。反例是三处判据读的字段不在 D6 的读取接口里：F14、F15 ② 的环境身份，F08 的 `replaced`。

按治理的要求，本轮把 §3 全部 32 行和 §4.2 的切片验收再查一遍。检查标准是：每个判据只读 D6 读取接口暴露的字段，即 `GraphNode`（含 `Env`、`CallStatus`）、`GraphEdge`、`RunGraph`、`RunEvent`、`/runs`、`/runs/{run}/state`、`/compare`、`/versions`、`/values`、`/volumes`、`/progress`、`/objects`、transfer 端点与生命周期流（D6:54-212）。插件内部的 `CallOrigin`、`HumanEvent`、`CaptureRecord` 中的环境身份，以及插件收到的 `parentAborted`，都不当作测试可读的事实。store 切片自身的单元验收（如 STO-09 检查自己返回的 `Derived`）不在此列。另外落实 task:high 的五条非阻塞建议。

| D8 位置 | 改动 | 语义 |
| --- | --- | --- |
| F14 | 环境身份（只在 store 内部）改为 graph 节点 `env.template = "soroi-komodo"`、`env.remoteRun` 等于 `ListStacks` 中看到的 run id；“换镜像后不再复用”交 SOR-07 验收 | 是 |
| F15 ② | “env 身份来自 Slurm 模板”改为 graph 节点 `env.template = "soroi-slurm"`，`remoteRun` 等于这次 `remote run` 返回的 run id | 是 |
| F08 | “来历 Human、replaced 为空”改为 graph 状态 `Human`、`body:"Human"`，stream 中该位置有 `human_handback`、没有 `call_aborted` | 是 |
| F11 | “来历是 `Adopted`”改为 graph 中 `CallStatus` 为 `Adopted`（D6:168） | 是 |
| F24 ①② | `parentAborted` 改为直接观察 P 的 stream 中有无 `run_aborted` 与 `graph.state`；“来历 Inherited”改为 graph 状态 `Inherited{sourceRun = P, …}` | 是 |
| F07 ③ | “store 没有对应捕获”改为这一步不提交：stream 最大 seq 不变，graph 里没有这个调用节点 | 是 |
| F12 ② | 写明 `hash` 取 graph 中 `film`（File 根 atom）的 `Root.value.content`，测试不需要自己计算标量值的身份 | 是 |
| F06 | “`version` 等于 bundle 哈希”写明读法：`/versions/{version}` 的 `bundle` 经 `/objects` 取回后 sha256 等于 `version` | 否（读法写明） |
| SOR-07 验收 | “身份随之改变，不再复用”改为可观察判据：换镜像后同一调用真实执行（非 `call_adopted`），`/compare` 不是 `SameCapture`；承接 F14 移出的“换镜像后不再复用” | 是 |
| D8-11 示例 | 示例改为只用 D6 读取接口中的字段 | 否 |
| SOR-12 依赖 | 加上 SOR-03、SOR-08（非阻塞建议 1） | 否 |
| STO-02 | 最小 transfer 闭环加上 `GET /transfers/{t}/objects/{sha256}`；404 判据改为 DELETE 前 200、后 404 的同一 URL（非阻塞建议 2） | 是 |
| F22 ⑨ | 写明最后一个 worker 也全部 `stop`（非阻塞建议 3） | 否（补全前提） |
| E2E-16 依赖 | 加上 STO-07（F17 ① 用 `/compare`，非阻塞建议 5） | 否 |

复查后，矩阵里已经没有“来历”“capture 身份等于”“环境身份等于”“`replaced`”“没有对应捕获”这类读不到的判据。F24 中唯一保留的 `parentAborted` 一词，是用来说明测试不依赖它。

切片数仍是 108。脚本复核：所有依赖都指向存在的切片，没有切片依赖更晚的波次。

## 第 6 轮

第 6 轮投票结果：D8-01 三方赞成；D8-14 获 task:high、argon、leader 赞成，LeadMentor 反对，并给出两个有效的主路径反例（`evidence/votes/D8-mentor-r6.md`）。

| D8 位置 | 反例 | 改动 | 语义 |
| --- | --- | --- | --- |
| STO-02 验收 | 正式提交时，D6-07 在提交事务里把字节转入对象目录并删除暂存区，所以“DELETE 前 200、后 404”对正式路径不成立 | 分两种情形：① 正式提交的 EvalTransfer：提交前 transfer URL 返回 200；步提交之后 `/objects/{sha}` 返回 200，同一 transfer URL 返回 404。② 另开一个从不提交的 transfer：显式 `DELETE` 之前返回 200，之后返回 404 | 是 |
| SOR-07 验收 | 只换镜像 tag，不保证 digest 改变，第二次调用可能合法地被复用 | 先换到一个已确认 digest 不同的镜像，或改动计入 `config` 身份的模板配置。先断言 `remote templates` 返回的 `identity` 前后不同，再断言第二次调用不是 `Adopted`、`/compare` 不是 `SameCapture` | 是 |
| STO-08 内容与验收（编辑性） | — | 写明 `File` 值的身份就是它的内容哈希（`pepgent-soroi/design/store.md:29`：文件的身份是“内容的哈希”），所以 F12 ② 可以用 `Root.value.content` 查询 `/values`；验收加上这一查询 | 否 |

切片数不变，仍是 108；依赖没有变化。

## 第 7 轮：最终计票

第 6 轮导师的两条反例均已按上节修订。D8-14 第 7 轮由 leader、独立 task:high、argon、LeadMentor 全部投赞成；其余未改行沿用各自最新有效赞成票。Claude 族须 leader 席与独立 task:high 席均赞成才计赞成；以下每行均满足，最终三族各一票，16 行均为 **3 赞成 / 0 反对，通过**。argon 各轮均无生效否决。

选票文件均在 `evidence/votes/`。表中 r1 指无 `-rN` 后缀文件；r7 的 task:high、argon、导师选票分别位于 `D8-high-r6.md` 的 “D8-14 round 7”、`D8-argon-r6.md` 的 “D8-14 第 7 轮”、`D8-mentor-r6.md` 的 “D8-14 round 7”；leader 为 `D8-leader-r7.md`。

| ID | leader 席最新票 | task:high 最新票 | Claude 族 | argon 最新票 | 导师最新票 | 结果 |
| --- | --- | --- | --- | --- | --- | --- |
| D8-01 | r6 赞成 | r6 赞成 | 赞成 | r6 赞成 | r6 赞成 | 3/3 通过 |
| D8-02 | r1 赞成 | r1 赞成 | 赞成 | r1 赞成 | r1 赞成 | 3/3 通过 |
| D8-03 | r4 赞成 | r4 赞成 | 赞成 | r4 赞成 | r4 赞成 | 3/3 通过 |
| D8-04 | r4 赞成 | r4 赞成 | 赞成 | r4 赞成 | r4 赞成 | 3/3 通过 |
| D8-05 | r1 赞成 | r1 赞成 | 赞成 | r1 赞成 | r1 赞成 | 3/3 通过 |
| D8-06 | r1 赞成 | r3 赞成 | 赞成 | r3 赞成 | r1 赞成 | 3/3 通过 |
| D8-07 | r1 赞成 | r3 赞成 | 赞成 | r3 赞成 | r1 赞成 | 3/3 通过 |
| D8-08 | r1 赞成 | r2 赞成 | 赞成 | r2 赞成 | r1 赞成 | 3/3 通过 |
| D8-09 | r5 赞成 | r5 赞成 | 赞成 | r5 赞成 | r5 赞成 | 3/3 通过 |
| D8-10 | r1 赞成 | r1 赞成 | 赞成 | r1 赞成 | r1 赞成 | 3/3 通过 |
| D8-11 | r1 赞成 | r1 赞成 | 赞成 | r1 赞成 | r1 赞成 | 3/3 通过 |
| D8-12 | r1 赞成 | r1 赞成 | 赞成 | r1 赞成 | r1 赞成 | 3/3 通过 |
| D8-13 | r4 赞成 | r4 赞成 | 赞成 | r4 赞成 | r4 赞成 | 3/3 通过 |
| D8-14 | r7 赞成 | r7 赞成 | 赞成 | r7 赞成 | r7 赞成 | 3/3 通过 |
| D8-15 | r1 赞成 | r1 赞成 | 赞成 | r1 赞成 | r1 赞成 | 3/3 通过 |
| D8-16 | r4 赞成 | r4 赞成 | 赞成 | r4 赞成 | r4 赞成 | 3/3 通过 |

### leader 席已作出的技术裁决

- **D3 的操作员 TUI 根会话补充条款：** 操作员直接启动的 TUI 根 omp 自己就是写方，不经 Mux；没有 generation，也没有 `MUX_GENERATION`、`MUX_TOKEN`，不注册 `eval:<session>`，它持有的运行不经 Lab 介入。其 soroi 子 agent 仍由插件作为写方经 dial 接入 Mux。A0、F20、F21 适用；Lab / LabStandIn 的 RPC 根会话仍经 Mux。依据 `D8-leader-r4.md`、`D8-leader-r5.md` 与 D8-09。
- **capture 身份判据选方案 (a)，不扩 D6：** F06 从 `RunGraph.edges[].to.input` 和 atom 值核对输入；F11 及 F17 以可读的图状态、stream 与 `/compare` 的 `SameCapture` 判定，不要求测试读取内部 capture 身份。依据 `D8-leader-r5.md` 与第 4 轮修订。
- **P5 的只读部分进入 MVP：** `remote runs`、按 run id 的 `status` / `tail` 及对应 Lab 只读页面数据支撑 F17 S2 / F31；`restart`、`destroy`、`new_sandbox` 不进入 MVP，列入 D9。依据 `D8-leader-r4.md`、D8-16 与第 3 轮修订。

### 第 7 轮非阻塞建议的处置

`D8-high-r6.md` 第 7 轮建议在 SOR-07 的依赖列显式写出 SOR-17a，并写明另一个 digest 镜像的来源。投票者明确标为“非阻塞建议（不构成改投条件）”，且确认两者同在 W4、实际不会阻塞。本次不改已表决文本、不将建议升级为阻塞项；该建议随选票原文保留，供实现排期时参考。

本次完成的是决策、反例回应与选票归档，不代表 108 个切片已经实现或 F01–F32 已完成 runtime 验收。
