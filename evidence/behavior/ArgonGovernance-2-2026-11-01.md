# ArgonGovernance-2 行为分析（2026-11-01）

## 分析对象与证据范围

- **对象：** `history://ArgonGovernance-2`；对应 session 为 `session://01a195a6-e09a-7070-8423-a7910184b28a`。
- **窗口：** `2026-11-01T17:00:00Z` 至 `2026-11-01T17:10:59Z`。
- **唯一标尺：** `.omp/agents/argon-governance.md`、`AGENTS.md`（尤其 C2-2、C3-2、C4-1、C5-1 与工作方式禁令）、`LEDGER.md`，以及派工时的既有 brief。
- **取证方法：** 对目标 session 的 bounded `events.jsonl` 时间窗逐项读取，再读取对应 entry 及 task/wait 结果；结论只依据 transcript 中可见的时间戳、entry ID、工具参数和工具结果。目标会话中的 thinking 只作为行为线索，若没有对应工具事实不单独当作执行证据。
- **边界：** 本分析不读取 git 历史或 GitHub issue/PR 历史，不做产品范围或设计判断；本报告不把任何 hash/commit 标识用作证据。

## 窗口内行动时间线

| 时间（UTC） | entry | 可观察动作 | 取证结论 |
|---|---|---|---|
| 17:00:39.475 | `205936f1` / task result `c514dbd2` | 并行派出 `DeskPepgent18`、`DeskSoroi228Site`；context 明写“常驻席位暂未在岗，所以闸门 A、B 交回 Main 另派一次性实例判定”，同时要求 desk 不下闸门结论。 | 事实整理部分符合 `governance-desk` 职责；A/B 归属说明违反双闸门席位边界。两个 desk 的返回结果确认它们确实只整理材料、没有下结论。 |
| 17:01:06.871 | `4298f619` | `LeaderCompliance` watchdog 指出上述 A/B 委托违反 C2-2.2 与 `governance-desk.md:20`。 | 这是窗口内收到的明确外部纠偏信号。 |
| 17:01:10.640 | `68ac2462` | watchdog 后仅调用 `wait`。 | 没有立即修正前一派工；到正确的 gate 派工之间约 3 分 47 秒。 |
| 17:02:08.315 | `f0014d83` / todo result `e0033497` | 以一个 Todo `DONE` 标记 U107 片区经理调整完成。 | 单次状态更新；未观察到 LEDGER 写入、重复刷账或新的验收锁。 |
| 17:03:13.508 | `57f7efbc` / result `0faccb87` | 直接运行 `tern kill session pepgent-plugin`；结果无输出。 | 这是对 W-07 工人进程的直接退役动作。恢复计划 N4 写的是由 Main 执行，C4-1 将工人退役请求放在 Main/片区经理协作路径；目标角色没有被赋予该项 tern 生命周期操作。 |
| 17:03:15.273 | `fc406598` / result `a53c63f8` | 运行 `tern ls`，结果中不再显示 `pepgent-plugin`。 | 目标确实做了源头检查；检查成功不能改变退役动作的角色归属结论。 |
| 17:04:57.884 | `5249260e` / result `91c48c30` | 新派 `GateASoroi228`（`argon-sol`）与 `GateBSoroi228`（`argon-governance-sol`），分别处理 A/B；要求一次性、不得联系工人、不得发 GitHub、不得提交。 | 该派工的席位分工符合 C2-2.2 与 U100 的顶岗路径，且使用并行独立实例。需要注意：初始 brief 已写明该类 B 闸门正在由一次性 `argon-governance-sol` 判定并要求目标“不重判”；因此重新派出 `GateBSoroi228` 至少构成派工契约冲突，transcript 没有显示旧实例被取消、过期或结果无效。 |
| 17:07:46.125 | `dc9c23f2` / result `6b349064` | 新派 `GateAPepgent18`（`argon-sol`）与 `GateBPepgent18`（`argon-governance-sol`），分别处理 A/B。 | A/B 的 seat mapping 与一次性实例生命周期正确；同样是对初始 brief 中“B 不重判”要求的再次新派，属于可确认的派工契约不一致。 |
| 17:07:59.775 | `f96e02c1` / result `1948136f` | 重新完整读取 `local://state/recovery-plan.md`。 | 读操作成功；没有参数错误或失败重试。其必要性在 transcript 中未充分说明，不能仅凭一次整文件读取认定为违规。 |
| 17:09:28.178 | `107b9422` / result `04ecb22b` | 一次 task 调用并行重启 7 个常驻席位，并在共享 context 中明确写出：投票 daemon 立即使用，角色文本“尚未改写”，待 soroi#322 一次切换；G2/G3/G10 也推迟到 #322。 | 这是窗口内最明确的制度性偏离：目标承认规则文本尚未固化，仍按自己的“混合流程”向所有席位派工。 |
| 17:09:33.113–17:09:34.607 | `520a6eda` / `a4ab58bd` | wait 结果显示 `GateBSoroi228` 已完成；同时明确列出 `GateASoroi228` 仍在运行。 | 在最后一次明确的 gate 状态观察中，A 尚未完成。 |
| 17:10:04.266 | `733cdd6d` / result `2a2bdc68` | 在没有新的可见 gate-A 完成 entry 或 read 证据的情况下，派出 `DeskSoroi228Outcome`；任务把“缺口不成立”“按处置 a 免票澄清”“A 已确认既有义务”等作为已定结论交给 desk，并要求评论原 issue、开承载 issue。 | 结论派工早于 transcript 中可见的 gate-A 完成证据。若 gate-A 在不可见的外部路径完成，当前 transcript 也没有给出可核验来源；本报告将其记为证据缺口/过早固化，不把 gate-A 实体结论本身判为事实。该 task 的 acceptance 还要求回报提交标识，存在把提交标识当验收材料的风险；窗口内未观察到实际 hash 验证。 |
| 17:10:43.503 | `0bfc82cf` | `LeaderCompliance` blocker 指出 latest task 在未完成文本切换时采用 daemon 的 undocumented hybrid workflow，要求先完成授权文本固化。 | 目标在窗口结束前未出现修正该 dispatch 的工具动作；会话随后被 blocker 中断。 |

## 1. 职责边界与实际动作对齐度

### 1.1 明确偏离：把 A/B 闸门暂时交回 Main/泛化一次性 desk

`205936f1` 的 dispatch context 直接写明“闸门 A、B 交回 Main 另派一次性实例判定”。这与：

- `.omp/agents/governance-desk.md:20`（desk 必须把 A 交 Argon、B 交 ArgonGovernance，desk 没有单方免投票放行权）；
- `AGENTS.md` C2-2.2（A/B 必须由对应职能席位事前把关）；
- `.omp/agents/argon-governance.md:19–21`（ArgonGovernance 只做 B，不替 Argon 裁意图）

不一致。

这是**确认的派工边界偏离**，但影响应限定为 dispatch contract 错误：desk 子任务本身明确“只整理材料、不替闸门下结论”，其完成结果也写明“没有下任何闸门结论”。因此，窗口证据不支持“错误 desk 已经放行 BLOCKED”这一更严重的说法。之后 `5249260e`、`dc9c23f2` 改用 `argon-sol`/`argon-governance-sol`，说明目标最终采用了正确的 seat mapping，但没有在 watchdog 后立即完成修正。

### 1.2 明确偏离：直接执行 W-07 tern 退役

`57f7efbc` 的唯一工具调用是 `tern kill session pepgent-plugin`，随后用 `tern ls` 检查结果。恢复计划已把 W-07 退役列为 N4/Main 的动作；`AGENTS.md` C4-1 则规定片区经理负责发现并上报退役请求，Main 保留全局排期与轮换。目标初始 brief 也没有把 W-07 tern 退役列为 ArgonGovernance 的接手事项。

因此，这是**目标角色越过生命周期/轮换边界的确认偏离**。源头检查做得正确，但“已核实 ALL_DONE”是退役依据，不是该角色获得 tern kill 权限的依据。窗口内没有证据表明目标因此修改了业务代码或设计文档。

### 1.3 明确偏离：对“B 不重判”的既有 brief 新派 Gate B

目标初始任务明确说：Pepgent#18 与 soroi#228 site 缺口的 B 闸门已有一次性 `argon-governance-sol` 实例判定，目标“不重判”；仅之后的新 BLOCKED 由目标处理。窗口中却出现两个新的 B gate task：

- `5249260e`：`GateBSoroi228`，`argon-governance-sol`；
- `dc9c23f2`：`GateBPepgent18`，`argon-governance-sol`。

这是**派工契约不一致**。报告不进一步断言旧实例一定已经完成或新任务一定造成重复文件写入，因为窗口 transcript 没有给出旧实例取消/失效的证据；但新任务的对象正是 brief 指定“不重判”的两个对象，已经足够构成边界/效率风险。

### 1.4 明确偏离：规则文本未固化前按混合流程重启席位

`107b9422` 的 context 明确承认投票/议题相关角色文本尚未改写，却要求 7 个席位按 daemon 立即运行，并写“等 soroi#322 一次切换”。这直接触发了窗口末的 `LeaderCompliance` blocker `0bfc82cf`。

该行为违反：

- `AGENTS.md:125`：角色定义、skill、派活模板与已通过决策冲突时，必须先替换文本再派活；只在 LEDGER 追加解释而不改文本属于违规；
- `LEDGER.md:116–117`（U105/U106）：投票程序投产与文件固化/重启的排序约束；
- `AGENTS.md` C2-4：已授权规则直接执行，但不能用 leader 自己的解释给未固化文本开例外。

这是**确认的制度/dispatch 偏离**，不是产品设计判断。窗口结束前未见目标撤回或修正该 task；因此该问题在窗口边界仍开放。

### 1.5 证据不足而不下更重结论：过早派发 #228 outcome

`a4ab58bd` 的 wait 结果在 17:09:34 仍显示 `GateASoroi228` running；`733cdd6d` 在 17:10:04 已把“缺口不成立”和“A 已确认既有义务”写入 outcome desk brief，但窗口内没有新的 gate-A 完成 entry、对应 `read` 或其它可观察源头结果。

这足以认定**在可见 transcript 中缺少双闸门完成证据就固化了 outcome brief**。但无罪推定要求不能把“gate A 实际从未完成”写成事实：如果它在未被本 session 记录的路径完成，当前证据无法否定。正确分类是“证据链不完整/派工时机过早”，而非“已证实 gate A 结论错误”。

### 1.6 未观察到的边界问题

在本窗口内未观察到目标：

- 直接编辑业务代码、设计文档或 `LEDGER.md`；
- 读取 git 历史或 GitHub issue/PR 历史；
- 向用户发起 `ask`；
- 用 IRC/peer 直接向工人转嫁常规通信；
- 由错误的治理 desk 实例实际替 A/B 下结论；
- 通过 `write agent://` 唤醒旧巡检员继续巡检。

这些是“未观察到违例”，不是对窗口外行为的认证。

## 2. 反设卡与反形式主义核查

### 2.1 没有观察到“每一步验收锁”或人为串行工程门禁

窗口中的 gate 任务是并行派出，task 结果也显示多个兄弟任务同时运行；目标没有要求工人在每一步执行测试、runtime 验收或提交前逐项盖章。`205936f1` 的 desk 任务本身要求只读核实材料，属于 BLOCKED 双闸门前的事实整理，不等于给工程切片增加验收锁。

### 2.2 混合流程是实质性反形式主义问题

虽然目标意图是“先用已投产 daemon，再把文字统一并入 #322”，但 `AGENTS.md:125` 已规定不能以派工说明或 LEDGER 追加解释替代冲突文本的固化。`107b9422` 把这个未固化的解释直接传播给 7 个席位，形成 undocumented hybrid workflow；这不是必要的谨慎检查，而是以 leader 自行解释绕开文本来源优先级。

### 2.3 Todo 与等待行为

窗口内只看到一次 `todo DONE`（`f0014d83`）和多次带有实际兄弟任务结果的 `wait`。没有看到每几分钟刷 LEDGER、重复同一状态、要求子代理逐步回验或借空 Todo 阻塞工程的证据。等待主要伴随并行 task 运行，不能仅按 wall-clock 间隔认定为低效。

## 3. 工具与工作流效率

### 3.1 有效做法

- `205936f1`、`5249260e`、`dc9c23f2`、`107b9422`、`733cdd6d` 的 task 调用均返回成功，没有观察到同型参数错误扇出或失败后无界重试。
- A/B gate 在修正后用两个不同 seat 的实例并行执行，符合相互独立的判定职责。
- `tern kill` 后紧接 `tern ls` 做了源头检查；尽管动作归属不对，检查步骤本身没有重复失败。
- wait 结果含具体 task 输出；没有把“已派发”单独当成所有事务都完成。问题出现在后续 outcome brief 的证据链，而不是 wait 工具参数错误。

### 3.2 需要改进的效率/可靠性

1. **watchdog 纠偏延迟。** `4298f619` 在 17:01:06 已精确指出 A/B 错误归属；目标在 17:01:10 继续 wait，并先处理 Todo、W-07 退役和 seat listing，至 17:04:57 才改用正确 gate seat。这里不是空等，但对 blocker 的修正优先级不够高，增加了错误派工存续时间。
2. **同一对象的 Gate B 新派。** 两次新派 `argon-governance-sol` B gate 与初始 brief 的“不重判”冲突，至少增加了重复核对和结果汇合成本。派工前应先确认既有 gate 实例/结果的生命周期，而不是按材料文件是否存在就重开。
3. **双闸门结果同步不足。** 在最后一次明确 wait 观察仍显示 Gate A running 后，30 秒内就把固定 outcome 交给 desk；即使外部状态后来完成，也没有在该 task context 中附可观察结果路径。这会让 desk 依据不完整的副本继续对外写入。
4. **规则切换与席位启动顺序错误。** 一次 task 批量并行启动 7 席本身高效，但把“文本未固化”与“所有席位立刻按新通道运行”打包进同一 brief，使并发放大了制度不一致；并行化不能替代先完成权威文本切换。

## 4. 制度与角色定义改进建议

以下建议仅针对派工粒度、角色边界和监督范围，不改变产品范围或业务设计：

1. **在 ArgonGovernance 派工边界中明确排除 tern 生命周期操作。** W-07/W-08 的 `ALL_DONE`、退役请求和 `tern kill/start` 应由片区经理上报、Main 执行；ArgonGovernance 只审组织/程序归属，除非有单独的、明确写入 brief 的管理角色处置授权。这样可以保留其治理否决权，同时避免把“监督工人”误读为“直接操作工人进程”。
2. **为 BLOCKED 派工拆成“事实 desk”和“闸门席位”两层且一项一实例。** desk brief 只允许事实整理；A/B brief 必须分别写明 `seat=Argon`/`seat=ArgonGovernance`、对象、当前 gate 实例或“无既有实例”的事实。若上游 brief 明确“不重判”，派工模板应要求先引用既有结果或报告缺失，不能直接产生同名的新 Gate B 实例。
3. **把“规则文本固化完成”设为席位重启 dispatch 的前置条件，而不是在 task context 里用解释覆盖冲突。** 若文本与决定尚未一致，派工只能继续做只读准备或文本固化事务；不得同时启动依赖新规则的常驻订阅。该前置属于角色/派工边界，不是额外的逐步工程验收锁。
4. **为 outcome desk 增加双闸门可见证据栏。** 在派工 brief 中只接受两个已完成 gate entry/报告路径作为结论输入；若任一 gate 仍 running，desk 只能等待或整理，不得把结论写成“已定”。这能减少 gate 文件副本、wait 输出和内部 thinking 之间的状态错位。
5. **建议临时开启 `WATCHDOG-LowTierScope` 一个窗口。** 监督范围仅限：`tern kill/start`、包含“规则未固化/等 #322”措辞的常驻席 dispatch、以及对同一对象重复创建 Gate B 实例；不监视产品实现细节，也不把 watchdog 结论直接当成有罪结论。若下一窗口没有同类行为，可关闭，避免把低层监督扩大为常驻形式检查。

## 5. 总结

在本窗口内，`ArgonGovernance-2` 有两项主要的实质性治理偏离和一项明确的重复派工契约风险：

1. 17:00 的 desk brief 把 A/B 闸门归回 Main/泛化一次性实例；收到 watchdog 后才在 17:04、17:07 改用正确的 `argon-sol` 与 `argon-governance-sol`。
2. 17:03 直接执行 `tern kill session pepgent-plugin`，越过恢复计划指定的 Main/片区经理生命周期边界。
3. 对初始 brief 指定“不重判”的两个 B 闸门又新派一次性 `argon-governance-sol` 实例，形成派工契约冲突。
4. 17:09 在明确知道规则文本尚未固化时，仍批量启动依赖 daemon 的常驻席位；17:10:43 的 blocker 直接确认该 hybrid workflow 不被授权。

同时，未观察到错误 desk 实例实际代替 A/B 放行 BLOCKED、业务代码/设计/LEDGER 直接写入、git/GitHub 历史读取、用户提问、重复参数失败或每步验收锁。#228 outcome 的 gate-A 证据在可见 transcript 中不完整，应作为“过早固化/证据缺口”处理，不应在没有额外源头证据时升级为 gate-A 实体结论错误。
