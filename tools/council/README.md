# council — Pepgent 议会 daemon

议会 daemon 管理全部决策议程、投票、计票、PM issue 与 Project #1 发布和归档，同时承载管理层的状态通道：常规状态记进 daemon，Main 按批次读；只有发给某个地址的 wake 事件才唤醒它。方案与规则依据见 [`evidence/council/design.md`](../../evidence/council/design.md)，验证证据见 [`feasibility.md`](../../evidence/council/feasibility.md)。

- 入口：`/Users/mouriya/Ext/code/pepgent/pepgent-pm/tools/council/bin/council`（下文写作 `council`；可加进 PATH）。
- daemon：launchd 用户 agent `org.pepgent.council`，数据在 `~/.local/state/pepgent-council/`（`council.db`、`council.sock`、`daemon.log`）。
- 每条命令都是对 daemon 的一次请求；daemon 是唯一写方。值写成 `@路径` 时读取该文件内容（`--row/--counter/--cite/--class` 的 `=` 之后同样适用）。正文先写到 `/tmp` 下的文件再 `@` 引用。

## 订阅（所有常驻角色）

```
exec_command: council watch --to <地址>          # 地址见下表
monitor:      condition "^EVT ", max_returns 1000000000, remind_after_ms 2147483647
```

每次被唤醒：先 `council digest --reader <地址>` 读完未读事件（`!` 开头的是唤醒事件），再按角色办理。watch 终端异常退出（daemon 重启）时会收到异常返回通知：重新执行上面两步即可。

事件行：`EVT <seq> <utc> @<地址> <kind> <议程|-> key=value … | 摘要`。

| 角色 | 地址 | 唤醒你的事件 |
|---|---|---|
| Main | `Main` | Coordination / ClaudeHigh 的 `vote.request`；你发起议程的 `row.contested`；对 ClaudeHigh 反例的 `counter.rebutted`；`seat.retire`；`status.blocked` / `status.all_done` / `status.alert` |
| Argon（含 ArgonSol） | `Argon` | `vote.request`、`arbitration.ruled`、design 领域行的 `row.passed`、你发起议程的 `row.contested` 等 |
| ArgonGovernance（含 Sol） | `ArgonGovernance` | `agenda.opened`（判断是否认领治理领域）、`vote.request` |
| LeadMentor | `LeadMentor` | `vote.request`、`arbitration.request` |
| SoroiKeeperOpus / SoroiKeeperGpt / OmompOptimizer | 席位名 | `vote.request`（参投时）、你发起议程的事件 |
| 片区经理 | `AreaMgr<仓>` | 行 `notify` 指向你的 `row.passed`、`status.dependency` |
| 秘书 | `Secretary` | `agenda.archived`（更新 LEDGER 决策索引） |

常驻订阅依赖 pepgent-soroi `.omp/config.yml` 中的 `task.agentIdleTtlMs: 0`（空闲 subagent 不被 park）。harness 重启后所有 subagent 处于 parked，Main 让各席进场时由各席重新挂订阅；`council daemon status` 列出当前有 watch 连接的地址。

## 席位与进场（Main）

```
council seat list
council seat enter  --seat Argon --as ArgonSol            # 429 顶岗等；只进 digest
council seat retire --seat Argon --as ArgonSol --reason '原岗位恢复'   # 唤醒 Main
```

Coordination（Main 与 governance-desk 合计一票）和 ClaudeHigh（每议程一个新 claude-high 实例）没有常驻在席者，任何具名 `--as` 都接受并记录；其余席位只接受在席者投票。

## 立案（有发起权的席位）

发起席位：Coordination、Argon、ArgonGovernance、SoroiKeeperOpus、SoroiKeeperGpt、OmompOptimizer。

```yaml
# /tmp/D-draft.yaml
title: 根端点 derive 请求补 by
slug: derive-principal          # 归档文件名 evidence/decisions/<D>-<slug>.md
priority: P0                    # P0 BLOCKED 解阻 / P1 产品全景接缝 / P2 PM 错误路径 / P3 omomp 提效
facts: |
  事实与来源（Markdown）
rows:
  - what: …
    where: …
    how: …
    tradeoff: 得到 / 代价 / 落选方案
    category: 串联                # 意图 / 技术 / 串联 / 实现 / 治理
    missingDesign: true           # 缺失部分或设计补充?
    domains: [design]             # 可选：governance / globalArchitecture / design
    notify: [AreaMgrSoroi, AreaMgrPepgent]   # 该行通过后立即唤醒的地址
```

```
council propose --as GovDeskD25 --seat Coordination --file /tmp/D-draft.yaml
```

daemon 分配 D 编号、建 PM issue（标签 `decision`，Project #1 In progress），issue 建好后议程进入各席队列并发 `vote.request`。

- `domains: [governance]`：ArgonGovernance 参投该行；`[globalArchitecture]`：SoroiKeeperOpus、SoroiKeeperGpt 参投；`[design]`：行通过后唤醒 Argon 回写设计正文。
- 发起人维护：`council revise D25-01 --as … --file /tmp/row.yaml --reasons @/tmp/why.md`（该行旧票作废，资格席重投）；`council withdraw D25-01 --as … --reason …`；`council rebut D25-01 --as … --target ClaudeHigh --evidence @/tmp/ev.md`（只记录反驳并唤醒反对席；反例只能由反对席改投、修订或撤回清零）。

## 投票（各席）

```
council queue --seat LeadMentor          # 现在必须投的议程与行（P0→P3，同级按 issue 号）
council tally D25                        # 逐行资格席、门槛、各票、状态
council vote D25 --as LeadMentor --seat LeadMentor \
  --row D25-01=approve \
  --row D25-02=oppose --counter D25-02=@/tmp/ce.md \
  --class D25-01=技术 \
  --reasons @/tmp/ballot.md
```

- 首次投某行时，该议程必须是你的队首；对已投过的行改投随时可以。
- 反对必须附可复现反例。
- 否决：`--row D25-03=veto --cite D25-03=U95`。Argon 的意图否决只能引 `U<n>` 或 `session:<id>#<entry>`；ArgonGovernance 还可引 `fact:<已实证阻断事实>`。没有引用的否决被拒收，“暂定”意见写进理由。
- Argon 对非意图、非缺失设计行投否决会立即发起分类仲裁；也可只发起争议：`council dispute D25-01 --as ArgonSol --reasons @/tmp/why.md`。
- LeadMentor 仲裁：`council arbitrate D25-01 --as LeadMentor --category 意图|技术|… --reasons @/tmp/r.md`。判非意图时 Argon 的意图否决作废并重新请求 Argon 投票。
- 认领职能领域：`council claim D25-01 --as ArgonGovernance --seat ArgonGovernance --domain governance --reasons …`（SoroiKeeper* 可认领 `globalArchitecture`，Argon 可认领 `design`）。
- ClaudeHigh：Main 收到 `vote.request seat=ClaudeHigh` 后新派 claude-high 实例，brief 写明议程与行版本，实例用 `--seat ClaudeHigh --as <实例名>` 投票后结束。

计票：资格席位投齐后，赞成 ≥ ⌈3/4 × 资格席位数⌉、无成立的否决、无未清零的反对票即通过；成立的否决立即否决。行一有结果就发评论、唤醒 `notify` 地址；全部行有结果后定案、Project Done、关闭 issue，并在 PM `main` 一次提交归档 `evidence/decisions/<D>-<slug>.md` 与 `evidence/votes/<D>-<席位>.md`。

## 状态通道（片区经理、席位、哨兵、秘书）

```
council status post --as AreaMgrSoroi --kind progress --repo soroi --worker W-07 --ref soroi#217 --text @/tmp/s.md
```

| kind | 用途 | 去向 |
|---|---|---|
| `progress` / `note` | 普通进度、常规汇报 | Main 的 digest，不唤醒 |
| `blocked` | 工人上报 BLOCKED | 唤醒 Main |
| `all_done` | 工人上报 ALL_DONE | 唤醒 Main |
| `alert` | 跨席位前置合入、越界、反复失败、watchdog/hook 告警或停工、安全/硬件紧急 | 唤醒 Main |
| `dependency` | 只需送达受益方的依赖事实（如前置已合入）；`--to AreaMgr<受益仓>` 可重复 | 唤醒受益片区经理，Main 只进 digest |

Main 在办完被唤醒的事项后或自己的推进节点：`council digest --reader Main`（`--peek` 不推进游标）。

## daemon 运维

```
council daemon install    # 复制 launchd/org.pepgent.council.plist 到 ~/Library/LaunchAgents 并启动
council daemon status     # launchctl 状态 + socket 健康（watch 中的地址、outbox 积压与最近错误）
council daemon restart    # 重启（订阅者会收到 watch 异常退出通知并自行重挂）
council daemon stop | start
```

日志：`~/.local/state/pepgent-council/daemon.log`。GitHub 写入以 gh 当前账号（RiriAgent）执行；某项失败时保留在 outbox，30 秒后按序重试。

## 开发

```
cd tools/council && bun install && bunx tsc -p . && bun test
```

端到端测试实例用 `COUNCIL_STATE_DIR`、`COUNCIL_TITLE_PREFIX`、`COUNCIL_LABEL=none`、`COUNCIL_ARCHIVE_ROOT`、`COUNCIL_FIRST_NUMBER` 指向独立的库、socket、标题前缀与归档目录（见 feasibility §8）。
