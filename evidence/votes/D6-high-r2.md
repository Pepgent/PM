# D6 store 服务决策表 · task:high 的第 2 轮选票

投票者：task:high（Governance_e826.HighD6），Claude 族的独立票。
对象：`pepgent-pm/evidence/decisions/D6-store-service.md` 第 2 轮改过的 15 行：D6-03、04、05、07、08、10、12、13、14、15、16、17、18、21、22。
D6-05、D6-10、D6-13 正在按导师第 2 轮的主路径反例再改。按秘书 Governance_e826 的通知，这三行按通知里的方向投票，并在理由里注明：
- D6-05：运行结束要两方确认，supervisor 确认没有活动写方，store 确认没有未消费 atom；
- D6-10：拆成按序号的投影和重建的时间线；
- D6-13：有多个候选时一律返回 `Ambiguous`。

“反例回应”一节把幂等、并发结束、tar 安全与过期、超时强制中止都归为非主路径。我认同：按 `design-assumes-it-works.md`，这些不作为反对理由。下面四张反对票都是主路径上的数据流断裂，不是失败分支，也不是竞态。

| ID | 票 | 理由 | 修改建议 |
| --- | --- | --- | --- |
| D6-03 | 赞成 | 第 1 轮的三条要求都已落实：<br>• 新增 `agent_progress`，只引用 transcript 条目；<br>• 分工写明：调用、捕获、事件只由中心提交写，远程批次只汇入 `agent_progress`，`events` 的封闭类型集合不用扩大；<br>• `CallOrigin` 的四个变体各有唯一标签，`Inherited` 只引用父运行的调用，不复制。 | — |
| D6-04 | 赞成 | 一步一个事务；“被中止”也算调用结束；批次的汇入目标明确为 `agent_progress`。幂等重试属于重试分支，回应成立。 | — |
| D6-05 | 赞成（按通知的方向） | 结束改为两方确认：supervisor 确认没有活动写方，store 确认没有未消费 atom。两个确认都向各自的权威请求，修掉了“一个 worker 提交后未消费集合为空，运行被提前结束”。“一个根会话同一时刻至多一个未结束的运行”和按持有会话路由到 `eval:<session id>`（D3-19）都与 D3 第 1 轮修订一致。 | 定稿时写明：派生请求（D6-16）执行期间，持有会话的 eval 插件算作活动写方。这样 D6-16 的反对就不需要另改结构，见 D6-16 的修改 (b)。 |
| D6-07 | 赞成 | 所有没提交的字节先进 store 持有的暂存区，提交时才转入对象目录，对象目录里只有中心副本引用的东西。暂存区的生命周期嵌在 eval 调用里。路径统一为 `/transfers/{t}/volumes/{position}`，并写明 D4 也照此修改。 | 远程 `Agent` 要拷入的 soroi 定制 tar，以及 `boot.js`/runner（D4-05、D4-09），要写明按节点 bundle 的同一规则处理：中心副本里还没有时，先进本次调用的暂存区，第一次正式运行时随那一步提交。这是 D6-22 那张反对票要求的修改落在本行的部分。 |
| D6-08 | 赞成 | 检索边界写进了 `design/store.md`，文件只按元数据检索，与第 1 轮的建议一致。 | — |
| D6-10 | 赞成（按通知的方向） | 按序号的投影与重建的时间线拆开：前者表示“提交到第 k 次时”，后者按原始时刻重建，能显示“12:00 正在运行”。这回应了第 1 轮的建议，两者仍出自事件表这一个权威。 | 时间线返回的类型也写成 sum type。`Running` 只在时间线里出现，不要放进按序号投影的 `CallStatus`，否则按序号投影也要处理一个永远不会出现的变体。 |
| D6-12 | 赞成 | 实验以 store 生成的 run id 作索引，业务库只存这一个索引。一个会话先后跑多个实验时也能区分。run id 从生命周期流里的 `run_started` 取得，不复制状态。 | — |
| D6-13 | 赞成（按通知的方向） | 根 atom 按显式映射或唯一的值身份对齐，调用按输入位置对齐，名字不参与对齐。我第 1 轮的反例（R-014 写 `temp_2200c`，R-018 写 `temp_2300c`）在这个规则下能对上。有多个候选时一律返回 `Ambiguous`，交给人用显式映射，不会任意配对。出处已改引 `layers.md:34`。 | — |
| D6-14 | 赞成 | `Human{event}`，`event.replaced` 指向被替代的调用，划界不变。 | 被替代的是 `Agent` 调用时，要能找到那个 agent 的 transcript，见 D6-15。 |
| D6-15 | **反对** | 有序停止（中止当前轮 → 关闭这一代进程 → copy-out → `remote remove`）保住了 transcript 的字节，这一点成立。但这一行又写了“被中止调用的 `soroi-batch/` 不汇入 `agent_progress`”，而 store 里没有任何地方记下这个 agent 的 transcript。<br>**场景：** 一个远程 `Agent` 调用 C 已经跑了 3 小时，人按 D6-14 交回值替代了它。这一步提交时，C 这个位置的 `CallCommit` 是 `Done{ Human{ capture, event } }`，`Human` 捕获的 `transcript` 为 `null`，`HumanEvent.replaced` 只是 C 本来的捕获身份哈希，而这个身份没有 `captures` 行，`GET /captures/{id}` 返回 404。C 的批次又不汇入。<br>**在哪里失效：** 复盘时，`graph`、`progress?step=&position=`、`captures` 都找不到被替代 agent 的 session id 和任何进度，它做了 3 小时的工作在 store 的历史里不可达。“仍可经 omp 回看”需要先知道 session id，而 store 正是唯一的记录。这还违背了：<br>• (U) `#8e0a7e8f`：运行中的数据“随着拷贝一起回集中副本”。这是正式运行的数据，不是 dry run。<br>• RC:262：历史时间轴“极为重要”。 | 按 ① ② 修改，我投赞成。<br>① 被中止的 `Agent` 调用也在这一步提交时把 `soroi-batch/` 汇入 `agent_progress`，因为它是正式运行的数据。<br>② 被中止调用的 transcript session id 进入记录：`CallCommit.outcome` 的 `Aborted` 加 `transcript: SessionId \| null`；`HumanEvent.replaced` 改为 `{ capture: Hash; transcript: SessionId \| null } \| null`。 |
| D6-16 | **反对** | 我第 1 轮的反例（在途调用没有地址）已经由 `InFlight{slot}` 修掉，继承停止记录、持有会话的规则也都补上了。但“InFlight 先落成 Committed”分成了两次提交，这在主路径上会让 P 被错误地判为“已结束”。<br>**场景：** 原型“R-016 在 N-05 被截断重跑”。P 的最后一步 S 是 `const temp_2200c = 2200; const { curve: c1, log: l1 } = anneal(film, temp_2200c)`，`anneal` 是唯一还在跑的调用，其余 atom 都已消费。人把 temp 改成 2300。插件先 `POST /runs/steps` 把 S 落进 P：根 atom `temp_2200c`，以及 `anneal` 的 `call_aborted`。<br>**在哪里失效：** 按 D6-03，消费 = 被 `calls` 的输入名引用。被中止的 `anneal` 行引用了 `film` 和 `temp_2200c`，所以它们已消费；`c1`、`l1` 从没绑定。于是这次提交后未消费集合为空，store 在同一事务里写 `run_ended`，生命周期流随即推出 `run_ended`，自动化 A-01“实验状态变为已结束时起草复盘”（`layers.md:69`）对一个被截断的实验触发。接着 `POST /runs/derive` 按“P 未结束时才写 `run_aborted`”跳过中止，P 最终显示为 `Ended`，而不是“被截断”。 | 满足下面任一项，我改投赞成：<br>(a) 两次提交合成一个事务：`DeriveCommit.at` 改为 `Committed \| { kind: 'Partial'; step: StepCommit; position }`。store 在同一事务里把 S 写进 P、写 P 的 `run_aborted`、开 R'，P 不会经过“已结束”。<br>(b) 依赖 D6-05 的修订：在 D6-05 和本行写明，派生执行期间持有会话的插件是活动写方，supervisor 不确认“无活动写方”，所以落进 S 的那次提交不会写 `run_ended`；派生请求随后照常写 `run_aborted`。 |
| D6-17 | 赞成 | 主动请求与被动介入共用 `Human{event}`，只是 `replaced` 为空。 | — |
| D6-18 | **反对** | 方向成立：人的回答不是输入的函数，每次介入都是新身份；受理时刻移出身份，保证同一次介入的身份稳定。失效的是身份的输入在计算时还拿不到。<br>**场景：** 正式运行的一步里有一个主动的 `human(request)` 调用（D6-17），或者有一次在途替代（D6-14）。<br>**在哪里失效：** 按接口草图，`CallOrigin.Human.capture.identity` 和 `HumanEvent.step: Seq` 都由 eval 插件放进 `StepCommit`。但步的序号由 store 在提交事务里生成，插件要等 `StepCommitted{seq}` 返回后才知道。这又是这次运行的第一步时（`run: { kind: 'open' }`），连 `run` 也要提交后才由 store 生成。所以插件无法按“运行、步、调用位置……”算出身份。另外，接口草图的注释写“身份取自前五个字段”（run、step、position、principal、handback），不含 `replaced`，与行内“含被替代的调用”不一致。 | 按下面修改，我投赞成：身份改为插件提交前就有的字段的哈希，即 `transfer`（store 在 `POST /transfers` 时生成，每次 eval 调用一个，全局唯一）、调用位置、principal、交回内容、`replaced`。`HumanEvent` 里的 `run`、`step` 改为由 store 在提交时填写的事实字段，不进身份。草图注释和行内文字统一。 |
| D6-21 | 赞成 | 执行物和原始源码一起存：bundle、入口、源码清单（含 source map）、commit、构建 manifest、lockfile。都经暂存区随第一次正式运行提交，Git 仍是当前定义的权威。 | — |
| D6-22 | **反对** | standalone 与完整 e2e 分成两个 profile，把远程流程对外部系统的依赖说清楚了，这一点成立。新加的“部署时 init 在 store 就绪后按哈希把 release artifact 导入”与 D6-07 冲突。<br>**场景：** 在一套全新部署上，第一次正式运行一个远程 `Agent`。按 D4-05、D4-09，copy-in 从 `GET /objects/{hash}` 取 soroi 定制 tar 和 `boot.js`，所以它们必须先在对象目录里。<br>**在哪里失效：** D6-07 已经删掉了提交前的通用 `PUT /objects`，并规定“没有提交的字节永远不会出现在对象目录里，对象目录只装中心副本引用的东西”。init 的导入既没有端点可用，又直接破坏这条不变量。release artifact 进入对象目录后，没有任何提交引用它们。 | 按下面修改，我投赞成：删掉 init 导入。release artifact（定制 tar、`boot.js`、runner）按 D6-07 和 D6-21 的同一规则处理：中心副本里还没有时，中间件先放进本次调用的暂存区，copy-in 用 `/transfers/{t}/objects/{hash}`；第一次正式运行时随那一步提交，转入对象目录，并在这次调用的记录里引用。这样一次 compose 就能让空 store 工作，也不需要 compose 之外的动作。 |

## 计票

赞成 11（其中 D6-05、D6-10、D6-13 按秘书通知的修订方向投）· 反对 4（D6-15、D6-16、D6-18、D6-22）。

四张反对票都附了场景、证据、失效位置，以及能让我改投赞成的修改。D6-16 的修改 (b) 与 D6-05 正在进行的修订相连：D6-05 定稿时写明“派生期间持有会话是活动写方”，D6-16 就可以改投赞成。
