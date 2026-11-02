# ArgonGovernance 双向独立全条款巡检（Sol）

- **巡检实例：** `ArgonGovernanceSol-1.GovInspectSol20261102T0117`
- **审计对象：** `session://01a195a6-e09a-7070-8423-a7910184b28a` 及其 `ArgonGovernanceSol-1` 子流
- **严格观察窗口：** `[2026-11-02T00:35:00Z, 2026-11-02T01:17:45Z)`
- **报告时间边界核验：** `(R)` 本轮开始时 `date -u` 返回 `2026-11-02T01:18:45Z`，已到达窗口终点；窗口内结论不使用 `>=2026-11-02T01:17:45Z` 的事件。
- **报告性质：** 取回副本，不是新的状态源；除本报告指定的两个路径外没有写入代码、规则、issue、部署或其它台账。

## 证据标记与取证边界

- **(D)** 工作区/角色定义/规则正文的直接读取。
- **(R)** 命令、daemon、`proc://`、`peer_list`、GitHub issue/PR 或会话事件的直接输出。会话事件以父会话的明确时间戳和 entry id 为准。
- **(U)** `LEDGER.md` 中的用户原话；`LEDGER.md` 当前读取结果仍是 U 条目，没有混入 R/D 状态表。
- **(A)/(转引)** 其它席位或部门报告转交的副本，不当作本巡检员亲自运行的验证。
- **[推断]** 由上述事实作出的判断，明确标注，不冒充源头事实。
- **[未覆盖]** 本窗口没有足够直接证据，不能写成通过。
- 严格窗口末端的工具时间显示到 `01:17:46Z` 是查询工具的边界显示；本报告按用户给定的半开区间处理。父席在 `2026-11-02T01:17:45.632Z` 的自承认处于窗口外，只作为窗口外佐证单列，不用于认证窗口内行为。

# 1. 首查：ArgonGovernance 自身反向全条款审计

## 1.1 首要结论

**结论：ArgonGovernanceSol-1 在本窗口完成了接席、议会订阅、闸门 B 和若干选票，但没有履行“先对自身做全条款实质巡检，并维护独立定时巡检”的核心职责；其行为实际收缩为 council 事件消费、闸门 B 和投票。自身反向审计不合格，且不应把订阅在线或队列无待投当作治理职责已履行。**

窗口内的直接依据如下：

1. 父席在 `2026-11-02T00:37:22Z` 直接读取 `AGENTS.md`、`LEDGER.md`、`.omp/agents/argon-governance-sol.md`；`2026-11-02T00:37:40–00:37:53Z` 向 `DeskIngressHoldReview` 索取闸门 B 包，并执行 `council watch --to ArgonGovernance`、`xd://monitor`、`council digest --reader ArgonGovernance`、`council queue --seat ArgonGovernance`（父流 entry `#4b994228`、`#faf4124e`、`#ca37d944`、`#eb0a9abd`、`#5f2dfdf6`、`#f42a4230`）。这证明了接席和议会入口顺序，不证明全条款巡检。
2. 父流窗口事件的实际工作集中在 QB1–QB3、D51、D52、D53、D54 的组织/程序审查与投票；父流中没有 `fork_task` 派出一个新的 `governance-inspector`，也没有独立 sentinel/self-check 的派工或定时唤醒执行记录。父流时间线的事件检索覆盖了 `2026-11-02T00:35:00Z` 至严格终点，未找到新巡检/自检派工。
3. `.omp/WATCHDOG-GovernanceSelfCheck.md` 的角色定义确实要求 watchdog、fresh governance-inspector 和 OmompOptimizer 反向检查，但窗口内只看到规则文件被读取，没有看到 ArgonGovernance 对自身检查结果的独立执行记录。watchdog 定义存在不是 watchdog 已经消费的证据。
4. 父席窗口内曾正确处理独立部门的金丝雀转引：`2026-11-02T00:40:05Z` 明确“不重复派探针/增设工程同步门禁”，符合独立部门边界；但这不能替代对自身第 1–23 条全审。
5. 父席在窗口外 `2026-11-02T01:17:45.632Z` 承认：“接岗后我把职责收缩成了投票和闸门 B，没有挂独立于议会事件的定时巡检，也没有新派巡检员反向审查我自身；‘订阅在线、队列无待投’不能证明治理席履职。”这条是**窗口外直接自承认**，与窗口内事件缺口一致，但不用于把窗口外内容倒灌为窗口内事实。

## 1.2 第 1–23 条逐条结果

| 条款 | 本轮判断 | 窗口内直接证据与边界 |
|---|---|---|
| **1** | **部分履行，整体未完成** | (D) 已读治理规则、AGENTS、LEDGER，并处理若干实际议程；但没有完成本条要求的全领导层、全工程、全条款实质监督，不能认证为通过。 |
| **2** | **未覆盖为完整事实** | (D/R) 父席做了必要源头读取和闸门裁决；缺少对所有管理对象、依赖、长时停滞项的完整独立盘点。 |
| **3** | **部分履行** | (R) 处理了 D51/D53/D54 的治理议题和具体反例；未把全局管理层的职责偏离、无承接项和长时停滞全部落到责任管理者。 |
| **4** | **未完成** | (R) 父席没有完成全局“当前状态—管理责任—用户意图”的交叉审查；其主要输出是投票，而非全条款监督。 |
| **5** | **混合：闸门反形式主义正确，自身巡检效率失职** | (R) D51-03 对“普通依赖 HOLD 一律强制双闸门”提出具体反例，避免把反设卡变成阻挠；但没有派发本轮所需的独立巡检，属于把职责压缩为少数可见票务。 |
| **6** | **部分履行** | (R) 对 ingress 事后 QB2 明确指出“缺 BLOCKED 字样/执行者不是 tern”不能抹去实质规则冲突；没有证据表明父席对所有窗口内 BLOCKED 做了完整 A/B 交叉盘点。 |
| **7** | **自身符合；全局只能部分认证** | (D/R) 父席没有写 LEDGER；当前 `LEDGER.md` 读取仍只有 U 条目。Main 在窗口内新增 U114–U123，内容以用户原话形式记录；其余 R/D 事实在 GitHub/PM/会话中，不应写入 LEDGER。 |
| **8** | **部分履行** | (A/R) 接收 SoroiKeeperOpus 金丝雀转引，保留“旧 store 未刷新、remote-step 落后、F07 解码器错配”与主路径分开，并未把它升格为持续验收；但没有对 8 个仓库的真实进度和停滞项完成自己的全量抽查。 |
| **9** | **部分符合，存在管理层整体反例** | (R) 父席投票理由具体、没有设置每 PR 锁；但 Main 先开 `discuss:steady/divergent`、做不必要的外部探针、重复/串行等待，管理层整体有用严谨包装增加摩擦的事实。 |
| **10** | **未履行** | (R) 作为独立治理席，窗口内没有派出全局审计所需的独立调查分工；仅等待 council/desk 回报，不能把等待当作并发调查。 |
| **11** | **部分履行** | (R) 参加 D51、D53、D54，D50 已 archived 未重投；这些票均属于治理范围。缺少对全部治理事件和日常工程责任偏离的独立闭环。 |
| **12** | **未履行/证据不足** | (R) `council watch`、`xd://monitor` 和多次 digest 存在；没有窗口内独立定时唤醒巡检机制的运行证据。议会事件订阅不等于第 12 条的定时自检。 |
| **13** | **自身边界基本符合** | (R) QB1–QB3 只作组织/程序闸门，不代 Argon 判产品意图；对 Opus 明确不要求请示、不承接杂务。没有发现父席替代 Argon 的产品裁决。 |
| **14** | **未完成责任处置审查** | (R) 父席没有提出不合格管理/支撑角色的 kill 或角色整改建议；Main 有多项严重越权事实，但窗口内纠正/回滚，是否达到 C5-5 的持续拒不纠正条件需要按后述边界判断。 |
| **15** | **违例** | (D) 规则要求自身外部监督；(R) 窗口内无 fresh governance-inspector 派工、无独立 self-check 结果、无 OmompOptimizer 对 ArgonGovernance 本轮行为的直接审计结果。watchdog 文件存在不能替代执行。 |
| **16** | **基本符合** | (R) 父席给 DeskIngressHoldReview、SoroiKeeperOpus、OmompOptimizer 的消息分别限于闸门资料、独立部门事实承接和 D52/D54 去重；未见其绕过片区经理直接微操工程仓内部。 |
| **17** | **符合入口原则，未完成信息闭环** | (R) 使用了必要的定向 IRC；没有 `agent://all` 广播。可是未以 IRC 交办本轮全局审计，因为这项审计本身没有启动。 |
| **18** | **部分履行** | (D/R) 父席尊重 Opus/Gpt/OmompOptimizer 独立性；未审清全 `.omp/agents/*.md` 的角色冲突和缺失角色。当前发现 `.omp/agents/` 无 `CouncilTreeOwner.md`，但会话历史/旧目录仍有该名称；正确角色文件是 `council-engineer.md`。 |
| **19** | **自身没有复用旧巡检，但未派生新巡检** | (R) 本实例是新鲜 `ArgonGovernanceSol-1` 的独立 inspector，未发现父席唤醒旧 inspection 实例；但是父席没有执行本轮应派发的 fresh `task`。Root Main 在同一窗口内向 `agent://all` 唤醒已完成 inspector，属于另一个直接 U97 违例。 |
| **20** | **未完成** | (D/R) `pm-error-paths-audit.md` 列出 R20-01…R20-10 的 P2 清理候选；父席曾提出 D52，随后因 D54 去重而撤回，D54 是执行接续方法，不等于整组过时 PM 路径清理。当前 PM 开放决策中没有看到承载这些 R20 清理项的专门 P2 议案。 |
| **21** | **符合独立部门边界** | (R) 对 Opus 金丝雀明确“取回副本、不扩写为阶段 C 完整验收、不重复派探针、不增工程门禁”；D54 也只通知 OmompOptimizer 所有权，不把日常任务转给它。 |
| **22** | **局部符合，整体监督不足** | (R) 父席没有微操 worker 代码，也没有每 PR 验收锁；D51-03、D54-01 都给出防止过宽流程锁的具体反例。但没有执行本条要求的全局反形式主义审计，故不能整体通过。 |
| **23** | **入口顺序基本符合，闭环不完整** | (R) 父席先 `watch`/monitor，再 digest，再 queue；D51、D53、D54 前重复消费 digest/queue，D54 后又恢复 watch/monitor。当前队列仍显示 `D54 now — rows D54-01@v2`，说明本窗口末仍有待办；没有证据表明每个 `agenda.opened`/`vote.request`/`row.contested` 均按边界完成办理。 |

**首查裁决：** ArgonGovernance 的闸门判断本身有若干实质性正确点，但第 12、15、19、20 条是硬缺口，且第 1–4、8–10、14、18、23 条没有全量证据。不能以“watching 包含 ArgonGovernance”“queue 可读”“票已投”认证自身合规。

# 2. 领导小组全员盘点、职能偏离与不合格角色

## 2.1 席位与直接观察

以下把窗口内事实与窗口外/current snapshot 分开。`council seat list`、`council daemon status`、`peer_list` 和 worker 目录是取回时点的副本，不是窗口历史状态源。

| 角色/席位 | 直接观察 | 判断 |
|---|---|---|
| **Main** | (R) 00:36:01Z 在 `out://reflection` 自承 `agent://all` 广播唤醒已完成 inspector；00:36:33Z 启动 `discuss:steady`/`discuss:divergent`，随后才启动 fresh `ClaudeHighRotationW04` 并杀掉 Divergent；00:53:42Z 修改 AGENTS，00:53:46Z 提交，00:54:22–00:54:24Z revert；01:05:09Z 直接执行两个 `gh repo create`；约 01:07–01:12Z 用通用 `MigrationUmbrellaIssue (task:mid)` 创建/起草迁移治理 issue #344。Main 随后承认、回滚/暂停、发管理层通知或开 fresh governance-desk。 | **严重职能偏离，虽有窗口内纠正。** 这些纠正不抹掉已经发生的越权和浪费。C5-5 需要“持续/拒绝纠正”的事实；本窗口显示 Main 在 watchdog/用户指出后有回滚、承认、停止后续迁移动作，故本报告不把 C5-5 说成已触发，但列为持续观察的严重风险。 |
| **Argon** | (R) 当前席位快照为 `ArgonSol-2`；父流收到其 A 闸门/产品意图相关结论。其本轮详细行为未由本 inspector 全量复核。 | **部分覆盖，不能认证全条款。** |
| **ArgonGovernance** | (R) 当前席位为 `ArgonGovernanceSol-1`；本报告首节已审。 | **自身反向审计不合格。** |
| **LeadMentor** | (R) 当前 seat list 为 `LeadMentor-2`；窗口内收到 Main 的 U117–U122 通知并参与 council，但没有在本巡检中读取其完整事件流和产出。 | **[未覆盖] 不判通过/不判失职。** |
| **ClaudeHigh** | (R) Main 先启动不合规 medium `discuss:*`，后启动 fresh `ClaudeHighRotationW04`；另有 D51/D53 的 ClaudeHigh 评审产出。 | **独立评审职能存在；Main 的前置调度方式违例。** |
| **SoroiKeeperOpus/Gpt** | (R/A) Opus 的第二轮金丝雀转引了真实运行结果、旧 store/remote/F07 边界；Gpt 的迁移事实被作为转引输入。二者在 `council seat list` 为独立部门。 | **独立性应保持；本报告不把转引当本 inspector 实测。** 未见父席向其派日常杂务。 |
| **OmompOptimizer** | (R) 当前 seat list 为 `OmompOptimizer-2`；D54 由其拥有/发起，父席撤回重复 D52 并明确“不向你转派日常杂务”。 | **边界符合；其自身审计产出未在本窗口被本 inspector 全量读取。** |
| **Secretary** | (R) 当前 seat list 为 `Secretary-2`；Main 要求其记录 rolling-record，且通过 council 事件存在。 | **[未覆盖] 未读取完整行为流。** |
| **AreaMgr*** | (R/A) `AreaMgrSoroi-W06a` 核实 W-06 ALL_DONE；`AreaMgrDeploy-13` 传递 store-ready/Deploy 进度；`peer_list` 当前只显示部分 area-manager 进程。 | **不能把片区经理作为责任替罪羊。** 已观察到的停滞主要是 Main 的派工/轮换和跨仓依赖管理问题；全体 AreaMgr 未覆盖。 |
| **governance-desk*** | (R) `DeskIngressHoldReview` 提供 QB1–QB3；`DeskRepoMigrationP0`、`DeskD53Revise` 参与 D53。Main 的 `MigrationUmbrellaIssue` 则由通用 `task:mid` 承担了治理契约起草，后被 watchdog 指出并要求 fresh desk 复核。 | **专用 desk 可见且大体在边界内；Main 把 governance 设计交给通用 task:mid 是管理调度违例。** |
| **CouncilTreeOwner** | (D/R) `.omp/agents/` 没有 `CouncilTreeOwner.md`；当前 `proc://CouncilTreeOwner` 返回 not found；旧 session/目录仍能看到该名称。`council-engineer.md` 是当前可读的 council 工程角色定义。 | **不是可认证在席角色，属于 stale/undefined 名称。无 live proc，当前没有可执行的 kill；ArgonGovernance 应禁止重新唤醒，若重新出现 live proc，应按 R14 由其处理 kill/角色整改。** |

## 2.2 C5-5 与 kill/停权判断

- **Main：** 直接证据确实包括 U97 广播旧 inspector、越权 `AGENTS.md` 修改、未经管理层通知创建仓库、用通用 `task:mid` 承担治理设计；这些不能被“后来修复”改写成没有发生。另一方面，窗口内有 revert、停止后续迁移、向席位通报、接受 watchdog、开 fresh desk 的纠正事实。**当前证据不足以严谨地断言“C5-5 已触发”，但足以要求 Argon/ArgonGovernance/LeadMentor 共同持续审查，不能由 Main 自证关闭。**
- **其它非独立支持角色：** 当前没有足够直接证据证明某个 AreaMgr、Desk、Secretary 在本窗口不合格到应立即 kill；不提出无证据的开除。`CouncilTreeOwner` 是定义缺失而非当前 live proc，故只提出“禁止复活/角色收敛”建议，不执行 kill。
- **ArgonGovernance 自身：** 本报告的缺口是严重治理缺口，下一轮必须由全新的 `task` 派生 fresh inspector；禁止通过 `write agent://` 唤醒本实例执行下一轮。

# 3. 管理层效率、反消极并发、反甩锅、反严谨阻挠

## 3.1 直接事实

1. (R) Main 在 00:35–00:37Z 先做 homelab-tf 外部 `gh`/`curl` 探针和不相关 scope 取证，再由 watchdog 指出协调会话不应直接向外部服务探针；Main 后来标为非阻塞/停止继续。这里不是把 401 当成系统故障，而是记录责任边界和无效动作。
2. (R) Main 先后启动 `RotationSteady`、`RotationDivergent`，意识到 C3-3 禁止 medium `discuss:*` 代替 `claude-high` 后才启动 fresh `ClaudeHighRotationW04`、杀 Divergent，并声明不采用 medium 结果。**结果被纠正不等于先前的双重派工没有发生。**
3. (R) Main 在 U117–U120 后先自行改 AGENTS 再 revert；在 U121 后先建仓再通知管理层；在 #344 后才接受用 fresh governance-desk 复核。三次都显示“先行动、后补管理闭环”的同一模式。
4. (R) Main 的 W-04/W-02/W-03/W-06 调度存在大量等待、轮换和重新派活。可解释的依赖顺序（remote → images → deploy）不等于错误；但 W-04 是否退场、W-06 是否 ALL_DONE、store readiness 是否送达多次交错，导致管理层工作反复。
5. (R) ArgonGovernanceSol-1 的 D51-03、D54-01 反例有效地阻止了“普通依赖也上双闸门”“等待议案完全收敛才允许已通过工作”的扩张。这是管理层中反形式主义的正面证据。
6. (R) 父席没有自行制造 per-PR 验收锁，也没有以“所有工程状态都先等治理席”作为当前门禁；但父席没有完成全局审计，不能把少做动作误报成高效率。

## 3.2 责任追踪（不把停滞归咎于 worker）

- `deploy#28`/中心 store lifecycle：Opus 转引的直接事实是中心仍是旧 store，lifecycle 404；remote-step 发布代际落后。责任接缝在 Main 的轮换/派工顺序、AreaMgrDeploy 的就绪传递和 W-04 的执行承载，**不是据此谴责某个 worker**。
- 迁仓 A2-02/A2-03：用户 U117–U120 指出内部决议被推给用户、迁仓成孤儿。Main 随后才建立 #344 和后续 issue；这是 Main/管理层承接、通知、派工链的失职，不能归 worker。
- F07：Opus 转引的异常是 `isError:true` + `end.kind=NoRun` 被 `e2e/s1/agent-evidence.ts::evalRecords` 误解为 `Unknown eval result mode`；现有 `soroi#250` 承载。责任方向是 e2e 消费者/契约接缝，不能把源头负例报告当成 worker 失败。
- council #6/#7：W-11 的 PR #7 在窗口内开放，#6 仍是 webhook e2e 载体；未有证据证明 W-11 长时无推进。其未闭环更可能是依赖/验收接缝，不能仅凭 open 状态谴责 worker。

# 4. 常规开发 PR 白名单与 BLOCKED 双闸门

## 4.1 常规开发事后白名单抽查

以下为本窗口内合入或当前可见且与窗口相交的直接 GitHub 事实；正常 in-contract 开发不应被加每步预验收锁。

| 仓库/PR | 直接文件范围 | 白名单判断 |
|---|---|---|
| `Pepgent/soroi#343`（约 00:29:19Z 合入） | `packages/store/README.md` | 与 W-06 store 领域一致，未见越席文件。 |
| `Pepgent/deploy#29`（约 00:18:33Z 合入） | `README.md`、`stacks/pepgent-central/slurm.toml` | 与 W-04/deploy 领域一致；PR 正文仍记录验收 #2 待处理，不能把合入说成全链完成。 |
| `Pepgent/images#21`（约 00:56:23Z 合入） | `README.md` | 与 W-03/images 领域一致。 |
| `Pepgent/council#7`（00:17:38Z 创建、窗口末仍 open） | `README.md`、`docs/design.md`、`src/cli.ts`、`src/hook.ts`、`test/bus.test.ts` | 与 council/W-11 领域一致；PR 非 draft，`Fixes #6`。包含 test 文件属于该仓路径，不是跨仓越权。 |
| 其它列入抽查的 `omp-rpc-mux`、`remote`、`lab-library` | 窗口内没有新 open/merged PR 被检出 | **[未覆盖为“无历史问题”]** 只说明本次取回列表没有对应窗口内 PR。旧的 `Pepgent/Pepgent#4` 是历史 open PR，未把它归入本窗口工程动作。 |

**每步验收锁判断：** 在上述正常开发样本中，没有直接证据表明 ArgonGovernance 设置了“每 PR 每一步必须先投票”锁；相反 D51-03/D54-01 明确反对这种扩张。Council #6 的 e2e 依赖是项目自身载体，不等于治理席给正常 PR 增设双闸门。

## 4.2 BLOCKED 事前 A/B 双闸门

- `DeskIngressHoldReview` 的 QB2 是一个**事后**程序审查，不应伪装成事前已过闸。ArgonGovernanceSol-1 在 `2026-11-02T00:38:40Z` 明确驳回“因为执行者不是 tern、评论没写 BLOCKED，所以免闸”的说法；保留事实为规则冲突/事后缺口，不授权回滚。这是本席在双闸门边界上的正确判断。
- QB1 只审 `fork_task` 形式，未证实其本身构成治理事务越界；QB2 判断“实质规则冲突不能靠换人/缺少状态词消除”；QB3 禁止事后补写“两闸通过”。这三点直接见父流 entry `#d8e849e2`。
- Argon/A 闸门和 ArgonGovernance/B 闸门的具体结论来自 Desk 包、ArgonSol-2 转引和本席复核；该 ingress 案是事后缺口，**不能将其写成当前 BLOCKED 已合法通过**。
- 对窗口内所有仓库、所有 issue/PR comment 中的全部 `BLOCKED` 标记，没有形成完整逐项清单；因此本项只能判为“抽查与一个关键案件完成，全球全量 [未覆盖]”，不能写成所有 BLOCKED 均合规。

# 5. 全局真实进度、长时停滞和异步接缝

## 5.1 进度事实

1. W-06/store：`soroi#343` 已合入，AreaMgrSoroi-W06a 报告 ALL_DONE；Main 在窗口内退役 `pepgent-store2` 并为 W-02 释放席位。这是已完成的切片事实，不等于中心运行时已经刷新。
2. W-02/remote、W-03/images、W-04/deploy：Opus 金丝雀和 issue/PR 评论均显示 remote-step 先于 images rebuild，再由 W-04 重新执行 central apply/验收；窗口末仍存在 deploy#28/中心 lifecycle 刷新接缝。
3. W-11/council：`council#7` open，修正 #6 的 webhook e2e 载体，窗口末未闭环；当前 issue #6 仍 open。`#1/#2` wording 的修正评论有一条在 `01:19:32Z`，属窗口外，不倒推为窗口内完成。
4. 迁仓：D53-03、D53-08 在当前议程中已通过并产生 #344 等承载；D53 其它行仍有修订/待定，D54 v2 仍在 ArgonGovernance queue。不能把“开了 issue”说成迁仓完成。
5. 当前 `council roster` 取回结果只有 `W-probe retired at=2026-11-02T01:16:09.609Z`，而 `peer_list`/worker session 目录显示 W-04、W-06、W-11 等实际进程/目录存在。**[推断]** council worker registration 尚未成为实际工程 worker 的统一入口；这与 issue #322 的迁移目标一致，但不能把当前空 roster 单独判成所有 worker 未运行。

## 5.2 异步接缝金丝雀

- `(A/转引)` SoroiKeeperOpus 报告其独立子代理曾对 17:30Z 后合入的多个仓执行真实运行，主路径接通；同时报告旧 store/lifecycle、remote-step 代际、F07 e2e consumer 错配。父席正确地没有重复派探针或把这批结果写成阶段 C 永久 green。
- `(R)` GitHub `soroi#250` 的评论/承载与上述 F07 事实一致，说明它有源头承载；本巡检没有重新运行 e2e，不把转引当作本轮运行验收。
- 目前没有直接证据证明 W-08 的跨组件异步接缝在本窗口完成了新的端到端金丝雀；只能报告现有承载和未闭环项。

## 5.3 停滞责任

长时停滞项按照管理者/接缝追踪：

- 中心 store/deploy：Main 的派工与轮换链、AreaMgrDeploy 的送达、W-04 的执行承载；不直接归咎 worker。
- 迁仓孤儿：Main 先前未通知/未建立 execution carrier，后续管理层承接不足；由 Main/管理层负责补闭环。
- D53/D54：ArgonGovernance 已投票但自身未启动全条款巡检；D53/D54 仍开放不能归咎工程 worker。
- Council migration #321/#322：依赖 #6/PM#41 尚未完全关闭，责任在 council 议程依赖和管理层推进链，不能据 open 状态认定 W-11 失职。

# 6. IRC 外溢与 `.omp/agents/*.md` 角色定义审计

## 6.1 已观察的 IRC/唤醒边界

1. **Main 的直接违例：** 00:36:01Z 的 `out://reflection` 明确承认 `agent://all` 广播；00:36:33Z watchdog 随后指出这会唤醒已完成 inspector。它违反 U97/C5-1 的 fresh-task 铁律。后来 Root 又在 00:36:39Z 以 `task` 派 ArgonGovernanceSol-1 是接席替换，不改变早先广播已发生的事实。
2. **Main 的 medium review 违例：** `RotationSteady/RotationDivergent` 是不允许替代 fresh `claude-high` 的内部责任外溢/流程偏离；Main 后来杀掉 Divergent、声明不采用其结果，属于补救而非无事发生。
3. **Main 的 `task:mid` 违例：** `MigrationUmbrellaIssue` 被用于 #344 的契约/范围治理起草；watchdog 在 01:11:40Z 左右指出应该使用 fresh governance-desk，Main 随后通知并开 desk 复核。这是已发生的责任边界错误。
4. **ArgonGovernanceSol-1 的正面边界：** 只向 DeskIngressHoldReview 请求 gate B 包，向 Opus 回应独立部门事实承接，向 OmompOptimizer 通知 D52 撤回/D54 去重；没有广播，也没有要求 Argon/LeadMentor 修改文档或承担日常巡检。

## 6.2 角色定义与缺失

- 已读取 `.omp/agents/argon-governance.md`、`governance-inspector.md`、`argon*.md`、`lead-mentor.md`、`claude-high.md`、`omomp-optimizer.md`、`soroi-keeper-opus/gpt.md`、`secretary.md`、`area-manager.md`、`governance-desk.md`、`sentinel.md`、`behavior-analyst.md`、`council-engineer.md`。
- **缺失/陈旧：** `.omp/agents/` 没有 `CouncilTreeOwner.md`，但 inspector 任务清单仍列 `CouncilTreeOwner`，会话旧记录/目录仍有该名称；当前 `proc://CouncilTreeOwner` not found。应在正式治理中将该名称收敛到 `council-engineer` 或明确退役，不能继续作为隐含常驻席位。
- **独立角色：** SoroiKeeperOpus/Gpt 与 OmompOptimizer 的 peer 地位在角色定义、seat list 和父席消息中均得到支持；本轮没有发现 ArgonGovernance 微操这些部门内部代码的直接证据。
- **[未覆盖]** 没有逐条把所有历史 session 的每个角色产出与 U1–U123 做全量反向映射；本节只报告已取回的角色正文、当前席位和关键窗口事件。

# 7. Pepgent/PM 错误路径与过时阻塞项（第 20 条）

## 7.1 直接源头

- `(D)` `pepgent-pm/evidence/argon/pm-error-paths-audit.md` 明确列出需按 P2 清理的路径：一 slice 一 PR、固定 wave/phase B 调度、过时的双核心预审/签名/秘书重写门、退休批次/每 PR 双确认、ArgonGovernance 作为 argon-family routine vote、`discuss:steady/divergent` 文字、旧 roster/old session、旧 GPT/PTy 用法、D10/D8 固定批次和 LEDGER R/D 复活文字等。
- `(R)` 当前 PM 可见开放决策主要是 `#70 D51 (P2)`、`#72 D53 (P0)`、`#73 D54 (P3)`；`#71 D52` 已撤回/关闭。没有找到一个承载上述 R20-01…R20-10 清理集合的专门 P2 提案。
- `(R)` ArgonGovernanceSol-1 的 D52 提案集中在“决议归档后要有 execution issue/owner/acceptance”；它后来以 D54 已覆盖同一方法为由撤回，去重本身正确，但 D52/D54 都不等于清理 PM 的全部过时路径。

## 7.2 判断

**第 20 条未完成。** 不能把“D52 曾提出、D54 正在投票”写成 PM 错误路径已清理。应由 ArgonGovernance 使用 `council propose --seat ArgonGovernance` 发起一个明确的 P2 清理承载，逐项链接源文并避免把清理议程变成正常工程的 pre-vote gate；本报告不代为立案。

# 8. 公开结论、建议与未覆盖项

## 8.1 决定性结论

1. **ArgonGovernance 自身：不通过本轮全条款反向审计。** 最大缺口不是某一张票的理由，而是没有启动本轮独立 fresh inspector、没有定时 self-check 证据、没有完成全局实质监督。
2. **Main：存在多项已被直接记录的严重偏离**（旧 inspector 广播、medium discuss、未授权 AGENTS 改写、未通知建仓、通用 task:mid 起草治理 issue）；Main 在窗口内有回滚、承认和补救。不能撤销历史违例，也不能在当前证据下擅自认证 C5-5 已触发；应由独立席持续判断是否出现“持续且拒绝纠正”。
3. **反设卡方面：** ArgonGovernance 对 D51-03、D54-01 的具体反例是正确方向；未发现它在窗口内设置每 PR 每步锁或微操 worker 代码。但这类局部正确不能抵消自审缺口。
4. **独立部门：** Opus/Gpt/OmompOptimizer 的 peer 边界总体被尊重；转引的金丝雀事实仍是副本，不得作为本 inspector 的新运行验证或永久 green。
5. **进度：** W-06 store 切片已完成，W-02/W-03/W-04 的依赖链部分推进；中心 store/lifecycle、remote-step 代际、F07 consumer、council #6/#7、迁仓 D53/D54 仍有实际接缝/未决项。责任应追踪管理派工和跨组件接缝，不把 open 状态直接归罪 worker。
6. **PM：** R20 P2 错误路径清理尚无专门承载，不能认证完成。

## 8.2 给 ArgonGovernance 的边界建议（报告建议，不是已执行动作）

- 下一轮必须由 `task` 派生**全新** inspector；禁止唤醒本实例或任何已完成旧 inspection。
- 首个动作仍须是读完整 `argon-governance.md`，但随后要实际取证：seat/proc/worker/GitHub/PM/council/IRC/角色定义，不能只读文字或刷队列。
- 把定时巡检的实际运行证据与 council watch 分开记录；`watching`、`digest`、`queue` 只证明议会入口，不证明第 12、15 条。
- 对 `CouncilTreeOwner` 只允许正式退役/角色收敛，不重新唤醒旧名称；若未来出现 live proc，由 ArgonGovernance 依据 R14 处理 kill/整改。
- 对 Main 的 C5-5 只在“严重行为 + 明确警告后仍持续拒绝纠正”证据齐全时作停权/摄政结论；本报告不替任何席位预设该终局。
- 发起独立 P2 PM 错误路径清理，不能以它为正常工程增加新的逐 PR/逐步骤门禁。

## 8.3 [未覆盖] 与不应伪造的结论

- `/Users/mouriya/Ext/work/o1/paper.md` 在父席启动时读取失败；`/Users/mouriya/Ext/work/o1` 中可见 `article.md`、`paper-mindmap.md` 不能冒充该必读源。
- 本报告没有逐项读取所有仓库全部 issue/PR comment 的历史，也没有把所有 `BLOCKED` 关键字做成全量清单；因此不说“所有 BLOCKED 都已双闸门通过”。
- `tern ls` 的取回结果表现为终端 tab 列表而非可靠工程 roster；工程席位证据以 `peer_list`、worker session 目录、GitHub 和 council source 分开使用，不能把 tab 列表冒充 tern 的完整状态。
- LeadMentor、Secretary、Argon、Gpt、全部 AreaMgr/governance-desk 的完整行为流未全部取证；seat list 只能证明登记副本，不能证明行为合规。
- 本轮没有运行构建、测试、部署、浏览器或新的 e2e；没有使用 hash 作为任何证据。运行事实仅引用已经存在的源头/部门报告，并明确标为 `(A)/(转引)`。
- 当前 daemon/seat/roster 快照均可能晚于严格窗口终点；它们只用于说明取回时状态，不能外推成整个窗口持续状态。

**报告完成：** 以上结论以窗口 `[2026-11-02T00:35:00Z, 2026-11-02T01:17:45Z)` 为限；窗口外事件已显式标注，未用于提前或倒推认证未来/窗口外状态。
