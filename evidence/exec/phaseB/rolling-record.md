# 阶段 B 滚动发车与退役记录

本记录由秘书维护并归档到 PM 的 `evidence/exec/phaseB/`，供 ArgonGovernance 事后检查。Main 只提供每次工人进场、退役的事实及 (R) 证据，不再亲自编辑；秘书据拥有方报告直接更新，进程状态仍由 tern、实现状态由原 issue/PR 确认，不以记录代替源头。

## 退役

| 席位 | 退役依据（源头） | 命令 |
| --- | --- | --- |
| W-06 pepgent-store | `gh issue view`：soroi#282、#190、#203 已 CLOSED（PR #286、#287） | `tern kill session pepgent-store` |
| W-01 pepgent-mux | `gh issue list -R Pepgent/omp-rpc-mux --state open` 返回 0（PR #16、#18 已合入） | `tern kill session pepgent-mux` |
| W-05 pepgent-library | `gh issue list -R Pepgent/lab-library --state open` 返回 0（lab-library#14 合入，关闭 #5、#13） | `tern kill session pepgent-library` |
| W-02 pepgent-remote | `gh issue list -R Pepgent/remote --state open` 返回 0（remote#17 已合入） | `tern kill session pepgent-remote` |
| W-03 pepgent-images | `gh issue list -R Pepgent/images --state open` 返回 0（images#12 合入，关闭 #6 与 #3） | `tern kill session pepgent-images` |
| W-04 pepgent-deploy | `gh issue list -R Pepgent/deploy --state open` 返回 0（deploy#17 合入，关闭 #16、#8、#1） | `tern kill session pepgent-deploy` |
| W-06 pepgent-store（D16-15 临时重新进场） | [soroi#294](https://github.com/Pepgent/soroi/pull/294) 已合入；`store-contract` 分支已生成；W-06 已在 [Pepgent#43 原帖登记解锁](https://github.com/Pepgent/Pepgent/issues/43#issuecomment-6558903750) | Main 报告已执行 `tern kill session pepgent-store` |
| W-07 pepgent-plugin | Main 报告于 `2026-11-01 17:0xZ` 退役，`tern ls` 已无该席；AreaMgrSoroi-3 已核实 [ALL_DONE 所列 18 个 PR](https://github.com/Pepgent/soroi/issues/228#issuecomment-6560689530) 全部合入 `main`，详见下文第 14 项 | Main 已执行 `tern kill session pepgent-plugin`；秘书只登记，不重复启停 |

## 发车

所有席位都按 D16-00、D16-09 的参数启动：Opus 5.5 high，带 omp-peers 和 `--session-dir`。home 用 `-b` 建成命名分支。

| 席位 | tern id | peer | home（基点） | 首个切片 |
| --- | --- | --- | --- | --- |
| W-04 pepgent-deploy | 663671231479811 | 01a19756-6aae | pepgent-deploy-home（deploy e4f16cc） | deploy#16（A2-07），然后 #8（在新路径 pepgent-deploy-issue8 上接续 56eaff7）、#1 |
| W-08 pepgent-e2e | 663739950956547 | 01a19758-9781 | pepgent-e2e-home（soroi 8a764ea） | soroi#285（A2-08），接着 DIST-02 #224（接续 PR260 的 e2e 部分）、A0 #235（接续 PR266）、已合入组件的 E2E spec |
| W-09 pepgent-lab | 663117180698627 | 01a19743-a0be | pepgent-lab-home，独立克隆 pepgent-backend-clone（d4a91fe） | Pepgent#43 |
| W-07 pepgent-plugin | 663228849848323 | 01a19747-23fa | pepgent-plugin-home（soroi 5a1089f） | soroi#283 |
| W-03 pepgent-images | 663263209586691 | 01a19748-1206 | pepgent-images-home（images f66e655） | images#6（issue-6-lab-web-live，d40585f），接着做 #3 |


## 重新进场与当前状态

1. **W-06 pepgent-store 的 D16-15 临时切片已完成并退役。** 本次临时 tern 为 `663838735204355`，peer `01a1975b-ea4f`，按源记录中的 ArgonGovernance 关键路径抢占令重新进场。实现已由 [PR#294](https://github.com/Pepgent/soroi/pull/294) 合入，CI 生成 `store-contract` 分支（首次提交 `8a23e213c03b`）；W-06 已在 [Pepgent#43](https://github.com/Pepgent/Pepgent/issues/43#issuecomment-6558903750) 登记可安装地址 `git+https://github.com/Pepgent/soroi.git#store-contract`，秘书未重复发评论。Main 已报告结束该临时席。
2. **W-02 pepgent-remote 二次进场已完成，已退役。** remote#18 已关闭，PR#19 已合入，remote 仓 OPEN=0（`gh issue list` 返回 0），随后执行了 `tern kill session pepgent-remote`。deploy#17 此前已合入，W-04 已退役；本次释放的名额现已由 W-10 补入，见 W-10 发车记录。
3. **工人沟通由每仓片区经理负责（U98、U99、U107）。** 片区经理以 `peer_ask` 单向主动巡查，并亲自查看本仓工作空间；收到处置后以 `peer_send` 送达并确认恢复，只有 peer 不可达或答复与工作空间不符时才用 `tern capture` 或会话 JSONL 备选取证。工人只在 issue/PR 写状态，不 peer_send 管理层或片区经理。Main 保留首次派活与席位轮换；秘书只汇总拥有方观察，不替片区经理联系工人。
4. **W-10 pepgent-web 首次发车已完成。** 前置 Pepgent#43 由 PR#45 合入（06e6480）；tern `664899592126467`、peer `01a19781-1a1e`，独立克隆 pepgent-web-clone 的 pepgent-web-home，首项 WEB-01 #9。该次发车曾补到四席；后续退役与重新进场条件见第7项，不把首次发车时的组合当作当前盘点。
5. **片区经理改为专门岗位（U99）。** 岗位定义在 `.omp/agents/area-manager.md`，提交 soroi 6d36128。按该岗位重新启动了 AreaMgrPepgent（负责 W-09、W-10）和 AreaMgrSoroi（负责 W-07、W-08）。旧实例写完交接文件后已结束，`proc://` 中只剩新实例。
6. **W-04 pepgent-deploy 第二次进场。** 承载 [deploy#18](https://github.com/Pepgent/deploy/issues/18)，修复 soroi#231 模板接缝；双闸门放行后范围为两TOML加README，三个模板metadata完整，见[范围解除评论](https://github.com/Pepgent/deploy/issues/18#issuecomment-6559568646)。tern `665423578136579`、peer `01a19793-ac7e`，经理 AreaMgrDeploy。**违规事实：** Main启动该席时，已有lab、plugin、e2e、web四席，合计五席，超过D16-10硬上限4且没有抢占令。已交ArgonGovernanceSol检查；实际处置按第7项退役W-10纠错，不把“临时补位”当作豁免，deploy本席交付后仍按正常生命周期退役。
7. **按并发纠错退役 W-10，回到 4 席。** ArgonGovernanceSol 裁定 D16-10 的同时活跃上限 4 是硬边界，因此先退役 W-10：WEB-01 已合入，WEB-02 还在等 D20 和 LAB-07a。AreaMgrPepgent 完成交接后，执行了 `tern kill session pepgent-web`，交接评论见 Pepgent#21 comment 6559596233。`tern ls` 显示当前在跑 4 席：pepgent-lab、pepgent-plugin、pepgent-e2e、pepgent-deploy。W-10 的重新进场条件是 D20 通过且 LAB-07a 合入，用原会话名和原目录进场。第 6 条记录的 5 席违例仍然成立，已计入 R8 降级（soroi 380ab02）。
8. **W-04 deploy 第二次进场结束并退役。** [deploy PR#19](https://github.com/Pepgent/deploy/pull/19) 已合入，[deploy#18](https://github.com/Pepgent/deploy/issues/18) 已关闭，issue 中有 ALL_DONE 评论；`gh issue list -R Pepgent/deploy --state open` 结果为 0，已执行 `tern kill session pepgent-deploy`。该次退役后为 lab、plugin、e2e 三席。随后两个卷路径变量经 D21/D22 审定，以[deploy#20](https://github.com/Pepgent/deploy/issues/20)承载，第三次进退场见第9、10项，不再列为等待初审。
9. **W-04 deploy 第三次进场，承接 deploy#20（D21 与 D22，注入两个卷路径变量）。** 发车前用 `tern ls` 核对过在跑席位为 lab、plugin、e2e 三席，W-04 补上后共 4 席，没有超过上限。本次 tern id 为 666080708132867，peer 为 01a197aa-8615，片区经理为 AreaMgrDeploy2。另外，W-07、W-08 的 home 已快进到 origin/main 380ab02，避免 watchdog 读到旧版规则后对工人误报。
10. **W-04 第三次进场交付后退役。** (R) Main 提供：[deploy PR#21](https://github.com/Pepgent/deploy/pull/21) 已合入，[deploy#20](https://github.com/Pepgent/deploy/issues/20) 已关闭并留有 ALL_DONE 评论，`gh issue list -R Pepgent/deploy --state open` 返回 0，已执行 `tern kill session pepgent-deploy`；AreaMgrDeploy2 核实 `tern capture` 已返回 `no block is called`。最近一次源头观察为 lab、plugin、e2e 三席。W-10 等 LAB-07a（[Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17)，Main 本次报告为 OPEN）合入后，以原会话名、原目录重新进场；D20 已通过，不再作为待投票条件。未提供精确退役UTC，不补造。
11. **W-06 pepgent-store 承接 D23-02 重新进场（Main 本次报告称“第二次进场”）。** (R) 发车前 `tern ls` 为 lab、plugin、e2e 三席；`pepgent-store-home` 的 `status` 干净，`merge --ff-only origin/main` 从 `28dcb24` 快进到 `6fc3c95`。`tern new session pepgent-store ...` 返回 `666428600483843`，`peer_list` 显示 peer `01a197b6-b735`、cwd `pepgent-store-home`。承载为 [soroi#315](https://github.com/Pepgent/soroi/issues/315)，片区经理 AreaMgrSoroi。当前在跑 lab、plugin、e2e、store 四席；发车只记录进程启动，不等于schema修正已合入。另据Main报告，W-07/W-08的home已从`380ab02`快进到`6fc3c95`，用于watchdog cwd限定的验收；不据快进动作宣称验收通过。
12. **W-06本次D23交付后退役。** (R) Main提供的 `gh pr view` 确认[soroi PR#316](https://github.com/Pepgent/soroi/pull/316)为MERGED，合并提交`5ad9b4b`，关闭[soroi#315](https://github.com/Pepgent/soroi/issues/315)；之后执行 `tern kill session pepgent-store`，当前在跑lab、plugin、e2e三席。本仓合入与退役不替代阶段C跨组件验收。
13. **watchdog修复的本窗口执行证据与治理交接。** (R) Main报告修复为omp-config `20330d7`与soroi `6fc3c95`（LeaderCompliance增加cwd限定）；主会话于15:28:14Z重启harness。AreaMgrSoroi核实W-07、W-08、W-06在15:28:32–45Z重启，该观察窗口后这三席未新增LeaderCompliance告警。仅记录经理报告，不推断未来永久无告警。GovClone_55b0的fork快照随重启失效，Main已新fork GovClone_2dcf接替。
14. **W-07 pepgent-plugin 全部交付后退役。** (R，Main 提供) `2026-11-01 17:0xZ` 已执行 `tern kill session pepgent-plugin`，随后 `tern ls` 已无该席；未提供精确分钟与秒，不补造，不据单席退役推断其他席位当时或当前状态。(R，AreaMgrSoroi-3 的取回观察) 经理在本轮 `2026-11-02T01:59:53+09:00` 命令取时前后核实 [soroi#228 的 ALL_DONE](https://github.com/Pepgent/soroi/issues/228#issuecomment-6560689530) 所列 18 个 PR 均 `MERGED`、base 为 `main`；取时不代表全部观察同时发生。清单：[288](https://github.com/Pepgent/soroi/pull/288)、[289](https://github.com/Pepgent/soroi/pull/289)、[290](https://github.com/Pepgent/soroi/pull/290)、[292](https://github.com/Pepgent/soroi/pull/292)、[295](https://github.com/Pepgent/soroi/pull/295)、[296](https://github.com/Pepgent/soroi/pull/296)、[297](https://github.com/Pepgent/soroi/pull/297)、[298](https://github.com/Pepgent/soroi/pull/298)、[300](https://github.com/Pepgent/soroi/pull/300)、[301](https://github.com/Pepgent/soroi/pull/301)、[304](https://github.com/Pepgent/soroi/pull/304)、[311](https://github.com/Pepgent/soroi/pull/311)、[313](https://github.com/Pepgent/soroi/pull/313)、[314](https://github.com/Pepgent/soroi/pull/314)、[317](https://github.com/Pepgent/soroi/pull/317)、[318](https://github.com/Pepgent/soroi/pull/318)、[319](https://github.com/Pepgent/soroi/pull/319)、[320](https://github.com/Pepgent/soroi/pull/320)。秘书读取的经理交接为 `local://state/area-soroi.md`，不把本仓合入、ALL_DONE 或退役等同阶段 C 全流程验证。经理列出的 `Human.site` 契约疑点、根 `bun.lock` 范围、凭据副本自述及遗产 [PR260](https://github.com/Pepgent/soroi/pull/260) 去留仍由管理层各自承接，不因退役自动清零。

## LEDGER 核对

| 条款 | 核对结果 |
| --- | --- |
| C1-2 | 每个域一个席位；Pepgent 使用独立克隆 |
| C1-3 | 同域切片可合并 PR，不设每步验收锁；W-08 在所测代码合入后编写 spec，阶段 C 统一全流程验收尚未开始。开发期异步非阻塞接缝金丝雀依 U96 / C1-3 执行，不作为工人开工、合并或轮换门禁 |
| C3-4 | 切片 worktree 用 `-b` 建；不检出 main |
| 当前席位 | 据 Main `2026-11-01 17:0xZ` 的退役与 `tern ls` 报告，W-07 已退役、不再计入在跑；AreaMgrSoroi-3 已核实其 ALL_DONE 所列 18 个 PR 均合入 main。其他席位状态不由此推断，实时向 tern ls 及原 issue/PR 查询。十席全部至少发车一次；不以本记录作进程面板，不抹除此前五席违例，也不以合入或退役替代阶段 C 验收。W-10 等待 LAB-07a（[Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17)，最近已知 OPEN）合入后重新进场；本轮没有 W-10 新进场事实 |

## W-10 重新进场前置

- 首次前置 [Pepgent#43](https://github.com/Pepgent/Pepgent/issues/43) 已由 [PR#45](https://github.com/Pepgent/Pepgent/pull/45) 合入（06e6480）；[D20](https://github.com/Pepgent/PM/issues/30) 已通过。当前剩余前置为 LAB-07a（[Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17)，Main 本次报告为 OPEN）合入；之后由 Main 安排，以原会话名、原目录重新进场，不从零重做已交付 WEB-01。
