# 阶段 B 滚动发车与退役记录

本记录供 ArgonGovernance 事后检查，由秘书归档到 PM 的 `evidence/exec/phaseB/`。

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
3. **工人沟通由每仓片区经理负责（U98、U99）。** 当前专门岗位 AreaMgrPepgent 管 Pepgent 仓工人，AreaMgrSoroi 管 soroi 仓工人，AreaMgrDeploy 管重新进场的 W-04。片区经理用 `tern capture` 巡检、`tern send` 实际送达处置与唤醒，并向管理层上报；工人只在 issue/PR 写状态，不再 peer_send 管理层。主会话保留首次派活，之后管理层裁决交对应经理转达。
4. **W-10 pepgent-web 首次发车已完成。** 前置 Pepgent#43 由 PR#45 合入（06e6480）；tern `664899592126467`、peer `01a19781-1a1e`，独立克隆 pepgent-web-clone 的 pepgent-web-home，首项 WEB-01 #9。该次发车曾补到四席；后续退役与重新进场条件见第7项，不把首次发车时的组合当作当前盘点。
5. **片区经理改为专门岗位（U99）。** 岗位定义在 `.omp/agents/area-manager.md`，提交 soroi 6d36128。按该岗位重新启动了 AreaMgrPepgent（负责 W-09、W-10）和 AreaMgrSoroi（负责 W-07、W-08）。旧实例写完交接文件后已结束，`proc://` 中只剩新实例。
6. **W-04 pepgent-deploy 第二次进场。** 承载 [deploy#18](https://github.com/Pepgent/deploy/issues/18)，修复 soroi#231 模板接缝；双闸门放行后范围为两TOML加README，三个模板metadata完整，见[范围解除评论](https://github.com/Pepgent/deploy/issues/18#issuecomment-6559568646)。tern `665423578136579`、peer `01a19793-ac7e`，经理 AreaMgrDeploy。**违规事实：** Main启动该席时，已有lab、plugin、e2e、web四席，合计五席，超过D16-10硬上限4且没有抢占令。已交ArgonGovernanceSol检查；实际处置按第7项退役W-10纠错，不把“临时补位”当作豁免，deploy本席交付后仍按正常生命周期退役。
7. **按并发纠错退役 W-10，回到 4 席。** ArgonGovernanceSol 裁定 D16-10 的同时活跃上限 4 是硬边界，因此先退役 W-10：WEB-01 已合入，WEB-02 还在等 D20 和 LAB-07a。AreaMgrPepgent 完成交接后，执行了 `tern kill session pepgent-web`，交接评论见 Pepgent#21 comment 6559596233。`tern ls` 显示当前在跑 4 席：pepgent-lab、pepgent-plugin、pepgent-e2e、pepgent-deploy。W-10 的重新进场条件是 D20 通过且 LAB-07a 合入，用原会话名和原目录进场。第 6 条记录的 5 席违例仍然成立，已计入 R8 降级（soroi 380ab02）。
8. **W-04 deploy 第二次进场结束并退役。** deploy PR#19 已合入，deploy#18 已关闭，issue 中有 ALL_DONE 评论；`gh issue list -R Pepgent/deploy --state open` 结果为 0。已执行 `tern kill session pepgent-deploy`。当前在跑 3 席：lab、plugin、e2e。待处理：`PEPGENT_LAB_WORKTREE_HOME` 的 deploy 注入（Pepgent#13，LAB-04 新增），正由 GovClone 初审，审定后决定承载方式。空出的名额优先给 W-10，前提是 D20 通过且 LAB-07a 已合入。
## LEDGER 核对

| 条款 | 核对结果 |
| --- | --- |
| C1-2 | 每个域一个席位；Pepgent 使用独立克隆 |
| C1-3 | 同域切片可合并 PR，不设每步验收锁；W-08 在所测代码合入后编写 spec，阶段 C 统一全流程验收尚未开始。开发期异步非阻塞接缝金丝雀依 U96 / C1-3 执行，不作为工人开工、合并或轮换门禁 |
| C3-4 | 切片 worktree 用 `-b` 建；不检出 main |
| 当前席位 | Main已按并发纠错退役W-10，随后W-04第二次交付并退役；最近一次源头观察为lab、plugin、e2e，共3席。十席全部至少发车一次；实时状态以tern ls和本记录为准，不以退役纠错抹去此前五席违例，不以发车、合入或退役代替阶段C统一验收。W-10重新进场仍以D20通过且LAB-07a合入为前置，W-04后续接D21/D22承载由Main安排 |

## W-10 重新进场前置

- 首次前置 Pepgent#43 已由 PR#45 合入（06e6480）。本次因并发纠错退役后，须 D20 通过且 LAB-07a 合入，再以原会话名、原目录重新进场；不是从零重做已交付 WEB-01。
