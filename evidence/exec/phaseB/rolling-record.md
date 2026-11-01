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
3. **工人沟通改由片区经理负责（用户直接指令，U98）。** 每个在跑仓设一名常驻 task:mid 片区经理：AreaPepgent 管 W-09、W-10；AreaSoroi 管 W-07、W-08。片区经理用 `tern capture` 巡检工人，用 `tern send` 送达裁决、唤醒空闲工人并向管理层上报。工人不再用 peer_send 联系管理层，状态一律写 issue/PR，由片区经理收集。管理层的裁决交对应片区经理转达；主会话只在首次派活时直接 peer_send 工人，不再使用此前的工人直接 peer_send 上报协议。
4. **W-10 pepgent-web 已发车。** 前置条件是 Pepgent#43 已由 PR#45 合入（06e6480）。tern id 为 664899592126467，peer 为 01a19781-1a1e，home 在 pepgent-web-home（独立克隆 pepgent-web-clone）。首个切片是 WEB-01 #9。席位归片区经理 AreaPepgent 管理。当前在跑的有 lab、plugin、e2e、web，共 4 席。
## LEDGER 核对

| 条款 | 核对结果 |
| --- | --- |
| C1-2 | 每个域一个席位；Pepgent 使用独立克隆 |
| C1-3 | 同域切片可合并 PR，不设每步验收锁；W-08 在所测代码合入后编写 spec，阶段 C 统一全流程验收尚未开始。开发期异步非阻塞接缝金丝雀依 U96 / C1-3 执行，不作为工人开工、合并或轮换门禁 |
| C3-4 | 切片 worktree 用 `-b` 建；不检出 main |
| 当前席位 | 在跑 lab、plugin、e2e、web，共 4 席；store、mux、remote、library、images、deploy 已退役。十席均已至少发车一次；当前运行以 tern ls 和本记录为准，发车、合入与退役不等于阶段 C 统一验收通过 |

## W-10 发车前置

- Pepgent#43 已由 PR#45 合入（06e6480），W-10 已据此发车，不再列为待前置。
