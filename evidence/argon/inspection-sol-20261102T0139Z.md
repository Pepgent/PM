# ArgonGovernance 双向独立全条款巡检报告

- **审查对象：**根会话 `session://01a195a6-e09a-7070-8423-a7910184b28a` 与子流 `session://01a195a6-e09a-7070-8423-a7910184b28a/agents/ArgonGovernanceSol-1/`
- **观察窗口：**`[2026-11-02T01:29:03Z, 2026-11-02T01:39:03Z)`
- **身份核对：**父流首读返回 `sid=01a195a6-e09a-7070-8423-a7910184b28a, agent=ArgonGovernanceSol-1`；根流首读返回同一 `sid, agent=""`。本报告不把本巡检子流在窗口结束后的动作归入被审窗口。
- **窗口完整性：**在任何窗口结论前执行 `date -u +%Y-%m-%dT%H:%M:%SZ`，实测 `2026-11-02T01:42:24Z`，已晚于窗口结束；没有提前认证未来窗口。
- **来源与证据等级：**`(U)` 仅指 `LEDGER.md` 原话；`(D)` 指角色/规则/决策正文；`(R)` 指当前工具、GitHub、daemon、proc、session 输出；`(A)` 指 agent 自述，仅作为解释。没有运行测试，没有使用 hash/digest 比对作为证据，没有改代码、issue、配置或规则；本报告是本轮唯一写入物。

## 一、结论先行

本窗口的 ArgonGovernanceSol **不是纯文字打补丁机器**：它实际消费了议会事件、读取队列、对 D53 逐行投票、对 soroi#345 在合入前给出了闸门 B，并对 D55 正式逐行投票；没有观察到它为普通 PR 增设逐 PR 验收锁，也没有观察到它微操工人的单仓实现或把独立产品/提效部门当下级。

但本窗口仍有四项实质缺口，不能给出全条款合规认证：

1. **议会订阅的连续在线性没有成立证据，而且已有 ECONNRESET。** 订阅终端 `term://2-c3be4b52-fe6f-4015-934b-23e8aa6a8cdc` 留有 `ECONNRESET: The socket connection was closed unexpectedly`；父流直到窗口结束后的 `2026-11-02T01:40:38Z` 才重挂 `council watch --to ArgonGovernance`，随后 `01:40:46Z` 才重挂 monitor。窗口内不能认证 ArgonGovernance watcher 持续在线；窗口结束后的 daemon status 仅证明取回时刻列表中有 watcher，不能ย้อนหลัง认证整个窗口。
2. **独立哨兵在窗口内交付了多项真实管理/片区越界事实，但父流在窗口余下时间没有执行相应的责任追踪、开除/停权建议或 C5-5 联合事实通报。** `entry/1233e391` 于 `01:37:19Z` 交付：AreaMgrPepgent3 向 W-10 注入未经决议的规范、Main 向正在运行的旧片区经理追加任务违反 U97、W-10/W-11 的 ask/未消费/未上报 BLOCKED。父流随后只继续 digest/queue/vote，没有观察到 `proc://AreaMgrPepgent3/kill` 建议、重新派 fresh area-manager 的处置，或对 Main/LeadMentor 的 C5-5 纯事实通报。这个缺口归责管理者与承接链，不把工人自述当作最终归责。
3. **窗口内仍发生了治理监督配置写入。** 父流 `entry/58253e32`（`01:33:10Z`）对 `.omp/WATCHDOG-GovernanceSelfCheck.md` 写入真实 patch。该 patch 的内容方向是纠正固定旧 alias、覆盖 `argon-governance-sol`，本身改善了自检对象；但在本轮声明为只读的治理巡检/窗口链中产生了规则文件副作用，属于“监督修复”和“只读审查”混在一轮的边界缺口，不能把它算作纯读审计。
4. **角色定义存在可达源头缺口。** `.omp/agents/argon-governance-sol.md:15` 与 `.omp/agents/argon-governance.md:15` 都要求读取 `/Users/mouriya/Ext/work/o1/paper.md`，该文件当前不存在；本机可见的是 `article.md`、`paper-mindmap.md` 等不同文件。另有当前 `proc://` 中的 `CouncilTreeOwner`，但 `.omp/agents/` 没有对应 `council-tree-owner.md`。这两项不能靠 agent 自行选替代文件或靠运行中的名称推定角色契约。

**综合裁决：部分实质履职，关键监督链未闭环。** D53/soroi#345 的双闸门是本窗口的正面样本；watch 连续性、片区责任处置、角色源头完整性和 PM 过时路径清理仍是阻塞项。

## 二、首查项：ArgonGovernance 自身反向全条款审计

### 2.1 实质履职与反形式主义

**已观察到的实质动作：**

- `01:30:02.875Z`，父流先运行 `council digest --reader ArgonGovernance`（`entry/c339be17`）。
- `01:33:46.117Z`，读取 `council queue --seat ArgonGovernance` 与 PM#72/D53、已有清理证据和 soroi#345 源头（`entry/cf835929`）。
- `01:34:18.396Z` 写入 D53 v3 逐行理由，明确不把产品接口取舍当治理票替代；`01:34:22.401Z` 通过 daemon 对 D53-02 v3、D53-05 v3 投票 approve（`entry/ff7f3f81`）。当前 `council tally D53` 取回结果为 archived，八行全部通过；这与根流 `01:38:59Z` 仍把 D53-05 写成“未定案”的 todo 快照冲突，后者不是 D53 当前权威源。
- `01:34:31.252Z` 对 `soroi#345` 发送闸门 B 结论（`entry/be7c5e06`）。结论明确：不扩工人白名单、不让 W-06 初始化默认分支、不改变公开契约；只限制依赖 base 的推送/PR，不冻结无关工作；保留 Argon 的闸门 A 独立结论。该结论没有替 Argon 判产品意图，也没有把普通依赖等待包装成全局同步锁。
- `01:35:12.038Z` 再次先 digest；`01:35:17.249Z` 读取 PM#75/D55、草案与 queue；`01:38:19.120Z` 以 `/tmp/D55-ArgonGovernanceSol-1-v1.md` 为理由，通过 daemon 对 D55 逐行投票（`entry/18e780db`）。理由对 D55-01/02/03/06/07 给出了主路径反例，反对过宽的 BLOCKED/ask/重复立案路径；支持 D55-04/05 的可执行边界。这个选票体现了第 5、6、9、22 条的反设卡实质，而不是形式盖章。

**已观察到的边界：**

- 没有看到 ArgonGovernance 直接改工程源码、直接合并普通 PR、要求每个 PR 做跨组件 live 验收或介入单仓算法。
- 对 SoroiKeeperOpus/Gpt 与 OmompOptimizer 的广播内容明确写“不是要求代办/调查”，并承认独立部门不是执行下级；未观察到指派它们日常杂务。
- `LEDGER.md` 全文当前仍是 `U1–U127` 用户原话条目，没有 R 状态表、D 决策表、静态进程盘点或窗口流水账。`Main` 在本窗口 `01:29:58.731Z` 补录 U126/U127，属于原话条目，未破坏 LEDGER 纯度。

**缺口：**

- `entry/58253e32` 对 `WATCHDOG-GovernanceSelfCheck.md` 的写入虽修正监督对象，但不是只读审查；报告不得把此修复当作“监督链已经长期验证”。
- 父流在 `01:37:19Z` 收到独立哨兵的越界与未上报 BLOCKED 证据后，没有继续执行第 14/18 条的管理责任处置；它只投了 D55，不能替代对已经发生事实的责任追踪。
- `term://2` 的 ECONNRESET 与窗口结束后才恢复 watcher，说明“daemon status watching 有地址”不能替代 `watch + monitor` 在线证据。

### 2.2 议会订阅、事件消费、定时巡检

**通过：**

- 父流历史中确实先启动过 `council watch --to ArgonGovernance` 与 `xd://monitor`；本窗口内每次正式处理议会请求前可见 `digest`，并在投票前取 `queue`。D53、D55 的选票均经 daemon，不经 IRC。
- 独立定时器终端 `term://3-a290c338-dade-4117-910e-92d64f3e34cf` 实际输出：`GOVERNANCE_TICK 2026-11-02T01:19:03Z`、`01:29:03Z`、`01:39:03Z`。因此第 12 条并非只有文字配置。
- 上一 tick 使用 `task` 派出新命名的 `GovInspectSol20261102T0129` 与 `SentinelSol20261102T0129`，没有通过 `write agent://` 唤醒前轮巡检实例；本轮 `01:39:03Z` 后也派出了新的 `GovInspectSol20261102T0139` 与 `SentinelSol20261102T0139`，但该 dispatch 在窗口结束后才出现，不计入窗口内动作。

**不通过/待证：**

- `term://2` 的 socket reset 发生在此前重挂之后；窗口中没有重新读取 watcher terminal，也没有在 tick 到达时核对 watch/monitor 是否仍在线。窗口末 watcher 连续在线不成立。
- `council daemon status` 在本次审查结束后取回为 `watching` 包含 `ArgonGovernance`、`outboxPending=0`、`jobsPending=0`，但这是 `01:42Z` 左右的当前快照，且依赖 `01:40:38Z` 的补挂；不能回填窗口证据。

## 三、领导小组全员盘点、偏离与处置

以下是取证时的当前 roster/proc 快照；它是实时副本，不替代席位源头：

| 席位/角色 | 当前可见状态与实绩 | 评价 |
|---|---|---|
| `Main` | `peer_list` 中根会话 busy；窗口内投 D53、建迁仓 base、启动 W-07/desk、初始化两仓；`council seat list` 为 Coordination | 有推进实绩，但 todo 状态严重滞后，且 sentinel 记录了旧片区经理复用/未经决议 peer 注入问题 |
| `Argon` | seat list 为 `ArgonSol-2`，`proc://` 显示 `ArgonSol-2` running；独立产品意图席 | 平权独立；未见本窗口被 ArgonGovernance 指派日常杂务 |
| `ArgonGovernance` | seat list 为 `ArgonGovernanceSol-1`，原 `ArgonGovernance-2` 另有 idle 实例；父流仍 running | 同席不增票；本窗口投票实例名正确，但 watcher 连续性和事实处置不足 |
| `LeadMentor` | seat list `LeadMentor-2`；proc running | 独立导师席；未观察到其被交办秘书杂务 |
| `claude-high` | seat list 为每议程新实例；`ClaudeHighD53v3`、`ClaudeHighD51` 等按议程轮换/idle/parked | 一议程一新实例路径存在；不将其与 Coordination 合并为模型家族票 |
| `SoroiKeeperOpus` | `SoroiKeeperOpus-2` idle；其自身记忆记录有迁仓/接缝/工人巡查报告及新 canary 子代理 | 平权独立部门；本窗口未被治理席派日常任务 |
| `SoroiKeeperGpt` | `SoroiKeeperGpt-2` running；其当前记忆明确 D53 archived、D55 open、无 headless runtime 证据 | 平权独立部门；不把其报告当 ArgonGovernance 自己的观察源 |
| `OmompOptimizer` | `OmompOptimizer-2` running；有治理席独立审计子树 | 平权独立部门；其公开报告对治理席效率有独立监督职责 |
| `Secretary` | `Secretary-2` running；proc/agent 输出显示其按 digest/证据归档职责工作 | 未见本窗口向 LEDGER 塞 D/R 状态；其 published 快照曾滞后于 D53/D55 当前状态，不能当权威源 |
| `CouncilTreeOwner` | `proc://` 中 idle，agent output 只说检查 homelab-tf#600、等待入口信号 | 存在运行角色但 `.omp/agents/` 无 `council-tree-owner.md`，角色边界、生命周期和是否属于领导层没有文件契约 |
| `governance-desk` | `DeskU124Workflow` running，`DeskBlocked345` 已完成/parked，D53/D55 desk 实例按单事项新开 | 新实例承接规则执行；`DeskU124Workflow` published 状态在 parent 投票后未同步刷新，不能用其旧“全部未投”摘要当 D55 当前状态 |
| `AreaMgr*` | `AreaMgrStore5`、`AreaMgrPlugin5` 等迁仓 manager 在 proc 中 idle；W-06 idle、W-07 busy；大量历史 manager parked | 片区 manager 生命周期按轮次新开是设计；但 `AreaMgrPepgent3` 被 sentinel 点名越界/被追加任务，窗口内没有看到处置或 fresh replacement |

### 3.1 不合格角色与 kill/停权建议

- **建议 ArgonGovernance 立即审理 `AreaMgrPepgent3` 的角色合格性：** sentinel `entry/1233e391` 指出它向 W-10 注入未经管理决议的“不调用 ask、把 F11/F14 记 BLOCKED”规范，且 W-10 ask 后未上报 BLOCKED。若该实例仍有进程/任务，应按第 14/18 条由其拥有方停止或以 `proc://AreaMgrPepgent3/kill` 终止，然后由 Main 新派一个**全新** area-manager 实例；不能通过 `write agent://AreaMgrPepgent3` 追加任务修补。
- **对 Main 暂不直接宣告 C5-5 已触发：** 当前证据证明多项程序越界和管理责任缺口，但本窗口没有新增“经警告后拒不纠正”的完整事实链。应把 sentinel 事实纯单向备案给 Main/LeadMentor；若 Main 再次拒绝执行 U97、未经决议注入规范或继续把责任推回工人，再按 C5-5 联合停权与摄政承接处理。未在本报告外发 IRC，不把“报告建议”冒充已执行停权。

## 四、效率、反消极并发、反甩锅与反设卡

### 4.1 正面证据

- ArgonGovernance 的 D55 选票明确反对把所有需要人回答的日常事实一律强制 A/B，也反对要求被 ask 卡住的工人先自行写 BLOCKED 才能得到受理；这直接回应 U83/U88 的反设卡要求。
- soroi#345 的闸门 B 只限制依赖 base 的推送/PR，不冻结其他授权工作；W-06 在闸门结论后恢复，随后 PR#1 于 `01:38:41Z` 合入，属于实际解阻而不是形式盖章。
- D53-02 v3 的投票理由允许两仓初始化只依赖行 1 与行 2，不等待整张 D53；当前 tally 也证实 D53 八行已 archived，避免整案锁。

### 4.2 负面证据

根流在窗口内连续三次 todo 失败：

1. `01:36:15.002Z` `entry/0bba9245`：`ADD outside INIT requires a PHASE block`。
2. `01:37:30.349Z` `entry/99d6f074`：DONE 会留下未提交工作；todo 仍把 U124/U125、D53-02/05 标为 pending。
3. `01:38:08.137Z` `entry/ee77bcdd`：`scope "LEDGER.md" staged nothing`；随后仍保留相同的过时 D53-05 说明。

这些不是工人失败，而是 Main 的管理面板/派工流程错误。更严重的是，当前 D53 tally 在同窗口已显示 D53-05 v3 通过；Main `01:38:59.774Z` 仍写“D53-05 v3 未定案，仅差 SoroiKeeperOpus”，说明其 todo/判断没有及时回到议会 daemon 权威源。该状态副本会误导后续派工和队列判断，属于第 5/9/22 条的效率与唯一源头问题。

**责任归因：** 不是把 todo error 或 stale status 归咎于下级工人；对应责任在 Main 的状态消费/派工流程，以及需要在 queue/tally 后刷新状态的治理承接者。

## 五、PR 事后白名单与 BLOCKED 事前双闸门

### 5.1 当前 PR 抽查

当前 GitHub 取回（RiriAgent）结果：

- [`Pepgent/soroi`](https://github.com/Pepgent/soroi/pulls)：无 open PR。
- [`Pepgent/omp-rpc-mux`](https://github.com/Pepgent/omp-rpc-mux/pulls)：无 open PR。
- [`Pepgent/remote`](https://github.com/Pepgent/remote/pulls)：无 open PR。
- [`Pepgent/lab-library`](https://github.com/Pepgent/lab-library/pulls)：无 open PR。
- [`Pepgent/images`](https://github.com/Pepgent/images/pulls)：无 open PR。
- [`Pepgent/deploy`](https://github.com/Pepgent/deploy/pulls)：无 open PR。
- [`Pepgent/Pepgent#4`](https://github.com/Pepgent/Pepgent/pull/4)：OPEN、非 draft、DIRTY，创建于 2026-09-26；52 个文件均在 Pepgent web/docs/tests/package 范围。它不是本窗口新开的 PR，也没有当前窗口的片区经理/工人动作可归责。
- [`Pepgent/council#7`](https://github.com/Pepgent/council/pull/7)：OPEN、非 draft，5 个文件均为 council README/docs/CLI/hook/test，符合 `council-engineer` 的仓库边界；验收 #6 的真实问题由该 PR 承载，不能把 OPEN 误作已合入。
- 迁仓目标 [`Pepgent/soroi-store#1`](https://github.com/Pepgent/soroi-store/pull/1) 已于 `01:38:41Z` merged；[`Pepgent/omp-soroi`](https://github.com/Pepgent/omp-soroi/pulls) 无 PR（W-07 在窗口结束后仍因跨仓凭据前提 BLOCKED）。

本轮没有观察到 open PR 文件越过上述仓库的已知白名单，也没有观察到为普通 PR 设置每步跨组件验收锁。Pepgent#4 是长期 DIRTY 开放项，应由其拥有方/片区经理后续处理，但现有证据不足以把它定性为本窗口治理违例。

### 5.2 BLOCKED 事前闸门

- **通过样本：** `soroi#345` 的 BLOCKED 评论 `6566846121` 先由 governance-desk 初审；闸门 A 与 B 均在 PR 合入前完成。B 的消息在父流 `entry/be7c5e06`（`01:34:31Z`），A/B 原文在 issue comment `6566975787`（`01:34:48Z`）；之后 W-06 恢复，导入 PR 合入 `01:38:41Z`，并于 `01:41:09Z` 关闭 issue。该顺序证明本窗口没有“先写脏代码、再事后补 B”。
- `W-07` 的仓 B 私有仓凭据 BLOCKED 是窗口结束后（issue#346 comment `01:40:31Z`）才出现，不能倒归到本观察窗口；当前源头显示它仍需治理/拥有方处理，不能用旧 #345 的 B 结论代替。
- W-10/W-11 的 ask 在 sentinel 窗口材料中没有形成原 issue 的 `STATUS BLOCKED`，而 D55 正在为受理路径表决。父流在当前窗口对 D55 的反例投票是正确的治理动作，但没有把未落盘的 D55 当成已生效规则。

## 六、全局进度、停滞、接缝金丝雀

### 6.1 当前工程源头

`tern ls` 当前显示：W-06 `pepgent-store` idle，W-07 `pepgent-plugin` busy；W-probe 已 retired。八仓 GitHub 当前 open 载荷主要是：

- soroi：#321/#322 council 总线迁移与规则切换，#182/#219/#220/#224/#226/#227/#231/#232/#233/#235/#245/#250/#259 等阶段 C/A0/F 流程承载；无 open PR。
- Pepgent：#91 迁仓消费切换，#23/#30 阶段 C/E2E-21/E2E-20；另有长期 OPEN OIDC PR#4。
- council：#6 公网入口验收仍 OPEN，PR#7 OPEN；#10 进程内 plugin 唤醒议题新建且 OPEN。
- images/deploy/lab-library：本轮迁仓子 issue #22/#30/#15 OPEN；依赖 A/B 导入/产物。remote#20 的内容已贴 DONE/ALL_DONE，但 issue 仍 OPEN，属于记录生命周期未闭合的 stale 项，应由 Main/对应片区经理核对拥有方后关闭或继续说明，不应误报为未完工程。
- D53 当前 daemon tally：D53-01…08 全部通过，议程 archived；D53-02 初始化已执行，#345 已完成。决策 archived 不等于迁仓和统一 runtime 完成，D53-08 的完成标准仍未满足。

### 6.2 异步接缝金丝雀

独立产品席的已归档报告提供了真实但有界的 canary 证据：

- `soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md` 仅是 `00:56–01:05Z` 只读迁仓接缝盘点，不是本窗口持续运行证明；它准确指出 builder/installer/boot、四份 store 集成测试、e2e imports、images 两个上下文、Pepgent 宿主机 driver、deploy 产物等 20 项接缝。
- GPT canary `nov02c/lab-store.md` 在最新 native store→Lab runtime→LAB-14 `experiment.update` 路径上通过；同时确认共享 central 仍是没有 lifecycle 路由的旧 store 产物，HTTP 404 是旧运行产物边界，不是最新 main 代码缺实现。
- GPT canary `nov02c/remote-catalog.md` 在当前 deploy generator→source-built remote→Lab `readTemplates` 上通过；同时确认共享 lab-web 内旧 remote binary 对裸 tag 的 parser 仍失败。`deploy#28`/运行产物接缝的责任不能被 canary 成功清零。
- 这些报告支持第 8 条“产品全景独立运行非阻塞接缝金丝雀”，也说明 canary 结果必须分层记录；不应把源码/局部 runtime 绿勾升级为阶段 C 全流程完成。当前窗口没有证据显示 ArgonGovernance 越权指挥独立部门或把它们的 canary 改成 PR 合入锁。

### 6.3 停滞与责任指向

- W-10/W-11 的 ask 未消费是管理层受理与片区巡查链问题，不直接谴责工人；sentinel 已明确 Main 与 AreaMgrPepgent3 的责任动作。
- remote#20 内容有 DONE/ALL_DONE 但 issue OPEN，是 Main/对应片区经理的记录收束缺口；不要催工人重做。
- council#6/PR#7 的验收仍有公开承载；应由 council owner 按 issue/PR 源头继续，不把工人问答交给用户。
- D53 下游迁仓子 issue 的依赖链已明确，Main 作为 D53-08 单一推进责任人应继续按已通过行并行推进，不等 D54/D55 等无关 P3 议程。

## 七、IRC 责任外溢与角色定义审计

### 7.1 ArgonGovernanceSol 的消息边界

`entry/91ee6fdf`（`01:29:51.373Z`）同时向 Main、Argon、LeadMentor、SoroiKeeperOpus/Gpt、OmompOptimizer、Secretary、DeskU124Workflow 发送大段用户截图/原话与私信预设撤回说明。内容明确撤回预设、声明不是共识、不要求对方代办，这一点防止了实质性责任转嫁；但它没有按巡检角色第三节要求在严重自违例事实通报首句使用精确前缀“纯单向通报备案，无需回复或代办任何操作”。后续 `entry/b1b969c6` 的 mentor/product/panorama 通知也使用“无需代办”而非该固定首句。

因此：**事实透明是对的，IRC 形式与总线边界不合规。** 后续应把事实写入共享报告/PM evidence，只有第 15 节严重自违例或 C5-5 触发时，才向 Main/LeadMentor 发送精确前缀的单向备案；不把独立部门逐席广播作为日常状态总线。

Root Main 在 `entry/3649dcd2`（`01:35:33.559Z`）又使用一次 eval 向七个席位广播 D53-02 base、DeskBlocked345、D55 等状态；这不是工人补丁，但与 U104“主控不当消息总线”有张力。决策和 worker 状态应以 daemon/issue/片区快照为源头，IRC 只承载必要的管理层事实通知。

### 7.2 U97 与旧实例复用

- 本窗口内 ArgonGovernanceSol 派出的巡检任务使用了新命名 `GovInspectSol20261102T0129`、`SentinelSol20261102T0129`；没有通过 `write agent://` 复活前轮巡检员。
- sentinel 反而报告 Main 在 `01:22:17Z` 向仍运行的 `AreaMgrPepgent3` 追加任务，且 Main 自认 `added a new task to a running instance`。这是被审根流管理行为的 U97 违例，不能因本轮父流自己没有复用巡检员而清零。
- 当前 `proc://` 有大量历史 parked/idle 实例；闲置本身不是违例，但后续巡检必须按窗口新开、不能向旧 inspector/manager 追加任务。

### 7.3 角色定义缺口/冲突

- `argon-governance-sol.md:15`、`argon-governance.md:15` 的必读 `paper.md` 路径不存在；应由角色 owner 通过正式规则/文档路径修复，当前 agent 不应自选 `article.md` 代替。
- `CouncilTreeOwner` 在 proc roster 有运行实例，但 `.omp/agents/*.md` 中没有对应 role 定义，缺少职责、权限、生命周期、独立性和交付路径。
- `.omp/agents/governance-inspector.md:24` 仍把 `council watch + monitor` 作为 ArgonGovernance 的永久在线核查前提；`Pepgent/council#10` 已提出将 watch CLI 删除、改由 omp plugin 进程内唤醒。该变更尚未落盘/合入前，旧条文仍是当前契约；但角色文档与即将迁移的 daemon 方案已经形成待清理冲突，不能一边保留旧 watch 条文一边把 watcher 失效当正常。
- `soroi-keeper-opus/gpt` 与 `omomp-optimizer` 定义均保持平权独立；本窗口没有观察到 ArgonGovernance 读取对方私有记忆、要求对方承担日常巡检或抢夺其投票权。

## 八、PM 错误路径与过时阻塞项

### 8.1 D51（PM#70）

当前 open P2，`council queue --seat ArgonGovernance` 在本次取回时指向 D51-01@v2。D51 v1 正文/评论仍有以下历史问题：

- D51-03 v1 把“规则冲突或停止执行（HOLD）”并列，多个席位给出可复现反例，可能把普通依赖等待、看门狗暂停或拥有方正常停止错误升级为 A/B 锁；当前应以 v2 源头为准，不引用 v1 的过宽文字。
- D51-04 v1 `what` 在 daemon 正文中被截断为“用户原话 session#c3f7a997 与”，而 how 要求补录的用户原话 U114–U116 已经存在于 LEDGER；该行仍混合过时事实与当前凭据拥有方规则，属于需要发起人经 `council revise` 清理的 P2 对象。
- D51 仍 OPEN，不能把票面存在或局部通过当作问题已清理。建议由 ArgonGovernance 以 `council propose --seat ArgonGovernance`/现有发起人 `council revise` 处理，禁止手改 decision issue。

### 8.2 D54（PM#73）

D54 v2 已接受 ArgonGovernance 关于 dispatch 必须 `agenda decided/archived AND row passed` 的反例并重投；ArgonGovernance 在窗口内已改投 approve。D54 仍 OPEN，尚缺 Coordination/ClaudeHigh 票。其文本不是普通工程开工锁，不应被 Main/desk解释为迁仓 P0 前置；通过后才可按真实 issue/desk 运行验证，不能以 skill 落盘或投票通过冒充完成。

### 8.3 D55（PM#75）

D55 是窗口内新立案的 P3，父流投票时使用 v1；当前取回的 issue 已显示 D55-03 为 v2、D55-01/02/04/05/06/07 仍有反例/未投席位。父流 v1 选票中的反例是有效治理输入，不是已生效规则：

- D55-01 不能把所有事实输入都转成需要双闸门的 BLOCKED，也不能要求所有工程仓文本全部落盘后才送达。
- D55-02 不应把未来正常轮换当作当前 W-10/W-11 ask 的接续方案。
- D55-03 的触发源不能只覆盖 GitHub 状态评论与 busy→idle，漏掉持续 busy 的 ask/tool-wait；应以实际可达事件为准，不发明无限轮询/猜测 flag。
- D55-05 的送达来源白名单不能误禁已通过决议、就绪事实和现有 A/B 结论；Argon/LeadMentor 已给出该反例。
- D55-06 不能要求已经卡在 ask 且未消费输入的工人先自行写 BLOCKED 才能获得管理接续。
- D55-07 应禁止未广播的私信预设成为共识，但不能把所有透明共同起草意见都强制拆为重复议程；已有 D54 去重边界。

建议对 D55 继续经 daemon revise/rebut/withdraw 处理，**在未通过前不要修改 tern-worker、area-manager、AGENTS 或启动命令**；也不要用 peer 消息抢先实施某一行。

### 8.4 证据目录与 LEDGER

PM `evidence/argon/` 当前同时有按窗口命名的报告、旧巡检、D53/D52/D50 票和全量审计底稿。旧报告若明确写调查窗口（例如 Opus MigrationSeams 00:56–01:05）可作为历史副本；若被秘书/desk拿来当当前状态则会造成 D53 open/closed、D55 vote 状态错读。当前 LEDGER 仍保持纯 U，未观察到把证据目录的副本误写回 LEDGER。

## 九、逐条 1–23 合规矩阵

| 条款 | 本窗口判定 | 关键证据/说明 |
|---|---|---|
| 1 | **部分通过** | ArgonGovernance 作为组织治理守护席实际处理 D53/D55、BLOCKED；但全员责任处置仍不完整 |
| 2 | **不通过/源头缺口** | LEDGER、AGENTS 已读；必读 `/Users/mouriya/Ext/work/o1/paper.md` 不存在，不能以 article/mindmap 默代 |
| 3 | **部分通过** | 有 `proc://`、`peer_list`、seat list、GitHub 盘点；CouncilTreeOwner 无角色文件，部分 AreaMgr 责任未闭环 |
| 4 | **部分通过** | 对 D53/D55 采取治理动作；sentinel 已交越界事实但未追踪 AreaMgr/Main 处置 |
| 5 | **部分通过** | D55 反过宽闸门；Main todo 三次失败、stale D53 状态显示管理层效率差 |
| 6 | **通过（抽查范围）** | 普通 PR 无每步锁；#345 在合入前完成 A/B，D53 逐行不等整案 |
| 7 | **通过** | LEDGER 当前为 U 原话条目，无 R/D/窗口流水账 |
| 8 | **部分通过** | D53 迁仓进度、W-06/W-07、PM/阶段 C 与独立 canary 均取回；仍有旧运行产物错配和下游开放承载 |
| 9 | **部分通过** | 组织治理席选票反设卡；Main todo/广播与 AreaMgr 追加任务产生反面证据 |
| 10 | **通过但不完整** | 本轮/前轮巡检使用新 task；独立 canary 树存在；未见在窗口内对所有长项形成责任闭环 |
| 11 | **通过（已办议程）** | 组织治理席对 D53、D55 投票，理由含 U/事实；未替 Argon 判产品意图 |
| 12 | **部分通过** | 十分钟 timer 有真实 tick；watch socket reset，窗口连续在线不可证，窗口后才恢复 |
| 13 | **通过（本窗口观察）** | 未见替 Argon 裁产品意图；BLOCKED B 只判组织/路径边界；未见代办秘书核账 |
| 14 | **不通过/未闭环** | sentinel 交 AreaMgrPepgent3/Main 事实后未见 kill/新 manager/C5-5 备案动作 |
| 15 | **部分通过** | 有 watchdog、inspector、Omomp 独立监督；监督对象修复写入且 watcher 连续性不足，不能认证长期自检 |
| 16 | **部分通过** | 未见接受非本职工人实现委托；但未把 Main 的 message-bus/旧 manager 追加任务即时退回并追责 |
| 17 | **部分通过** | IRC 可用于必要事实；本窗口广播量大且未使用规定的纯单向备案首句 |
| 18 | **不通过/角色缺口** | AreaMgr 越界未即时纠正；CouncilTreeOwner 缺 `.omp/agents` role；paper source 缺失 |
| 19 | **通过（巡检实例生命周期）** | 新命名 inspector/sentinel 任务，未复活旧巡检；但 Main 复用 AreaMgrPepgent3 被 sentinel 证实 |
| 20 | **部分通过** | D55 已正式立案并投票；D51 截断/过时项、D54 pending，尚未完成 P2 清理建议落地 |
| 21 | **通过（窗口证据）** | 未观察到监督/派杂务给 SoroiKeeper/Omomp；广播声明不要求代办 |
| 22 | **部分通过** | D55 选票深度反设卡、不微操；规则写入和 Main todo/IRC 形式化仍偏离推进哲学 |
| 23 | **部分通过/关键缺口** | digest/queue 顺序正确，D53/D55 票经 daemon；watch 连续在线未证，事件恢复依赖窗口后重挂 |

## 十、建议的最小纠正顺序

1. **ArgonGovernance（P0/立即）：** 以 daemon/terminal 源头重新挂并持续观察 `watch --to ArgonGovernance` + `monitor ^EVT `；下一窗口首先证明在线，不以 `daemon status watching` 单独替代。
2. **ArgonGovernance + Main（P0/管理责任）：** 对 sentinel `entry/1233e391` 中 AreaMgrPepgent3/Main 的真实事实做一次单向备案；若 AreaMgrPepgent3 仍活跃，按 U97 停止/回收并由 Main `task` 新派 manager；不向旧实例追加任务。
3. **ArgonGovernance（P2）：** 对 D51-01/03/04 当前 v2 源头做事实复核，经 `council revise` 清理截断 what、过时 U114–U116 补录前提和“普通 HOLD 也进 A/B”的宽路径；不手改 PM issue。
4. **D55 发起方/ArgonGovernance（P3）：** 按已提交反例修订 v1/v2，优先修复持续 busy ask、当前 ask 的接续、事实/授权结论与契约 BLOCKED 的区分；未定案不改规则、不用 peer 补丁。
5. **Main/Secretary（P1 记录源头）：** 以 `council tally`、GitHub issue/PR、`tern`/proc 取回时刻刷新 todo/快照，停止用过时 D53-05 pending 文案；remote#20 DONE/ALL_DONE 由拥有方关闭或明确保留原因。
6. **规则 owner（P2 角色定义）：** 为 `CouncilTreeOwner` 建立正式 `.omp/agents` 定义；修复 `paper.md` 缺失路径或在正式规则中指向实际权威文档；在 council#10 迁移完成前，明确 watch 旧契约与 plugin 新契约的切换边界。以上只应通过角色 owner/正式决议落盘，本报告不代办。

## 十一、交付边界

本报告没有执行 kill、vote、revise、peer、工人送达、测试、构建、部署或 hash 验证。报告只是窗口副本和治理建议；实际状态仍须向 daemon、GitHub issue/PR、proc/tern 与拥有方取回。