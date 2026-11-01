# 阶段 B 四席异步总线汇总

首轮取回时间：2026-11-01T13:04:21Z（UTC）；W-06 行随后依据 13:05:17Z 的新 STARTED 评论更新。本文是从 GitHub 取回时刻的工作副本，不替代 issue/PR，不把进程启动或历史 DONE 当成本轮实现完成。秘书未派工、未改业务代码、未运行测试。

## 席位状态

| 席位 | 本轮承载 issue | 本轮 PR | 状态（仅按拥有方总线） | 最后更新时间（UTC） |
|---|---|---|---|---|
| W-06 `pepgent-store` | [soroi#282](https://github.com/Pepgent/soroi/issues/282)（A2-10）；后续 STO-05、[STO-12 #203](https://github.com/Pepgent/soroi/issues/203) | 本次取回的 soroi OPEN PR 中未见 #282 的实现 PR；既有 [#260](https://github.com/Pepgent/soroi/pull/260)、[#266](https://github.com/Pepgent/soroi/pull/266) 属 W-08 遗产，不计入 W-06 | 🔄 **STARTED**：[W-06 自行确认 D16 已通过且解冻，前两条 BLOCKED/更正作废](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558336737)。工作入口 `/Users/mouriya/Ext/worktrees/store-a2-10-contract-exports`，分支 `store-a2-10-contract-exports`，基于 `origin/main`；尚无完成或 PR 上报 | 2026-11-01T13:05:17Z（W-06 最后状态评论） |
| W-05 `pepgent-library` | [lab-library#5](https://github.com/Pepgent/lab-library/issues/5)；[lab-library#13](https://github.com/Pepgent/lab-library/issues/13) 承载 D11-F12、D12-15，创建于 13:09:02Z | 本次未重新取回实现 PR 状态，不将历史 [#6](https://github.com/Pepgent/lab-library/pull/6)、[#9](https://github.com/Pepgent/lab-library/pull/9)、[#11](https://github.com/Pepgent/lab-library/pull/11) 当作本轮交付 | 🔄 **承载缺口 BLOCKED 已解除**：W-05 在 [PM 原评论](https://github.com/Pepgent/PM/issues/25#issuecomment-6558363366) 上报缺少有效 OPEN issue；现已有 #13，且 Main 确认 W-05 已收到通知。秘书已在[原 issue 回复解除](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)，未据此宣称实现、PR 或验收完成 | 2026-11-01T13:07:37Z（原 BLOCKED）；13:09:02Z（#13 创建）；解除回复时间见链接 |
| W-01 `pepgent-mux` | [omp-rpc-mux#13](https://github.com/Pepgent/omp-rpc-mux/issues/13) | 未见本轮 PR；历史 [#14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 已被 [#15](https://github.com/Pepgent/omp-rpc-mux/pull/15) 回退 | 🏗 **已派发，未见本轮 STARTED / PR / DONE**。#13 当前 OPEN；最后评论恢复会话前 OPEN，旧 DONE 不生效 | 2026-11-01T10:48:05Z（#13 最后评论；非 W-01 本轮上报） |
| W-02 `pepgent-remote` | [remote#16](https://github.com/Pepgent/remote/issues/16)（A2-01）；随实现对齐 remove 与 Slurm OCI 契约 | 未见本轮 PR；历史 [#15](https://github.com/Pepgent/remote/pull/15) CLOSED 未合并 | 🏗 **承载已建、已派发，未见本轮 STARTED / PR / DONE**。#16 当前 OPEN 无评论；旧 [#14](https://github.com/Pepgent/remote/issues/14) 已被 D15 以 NOT_PLANNED 关闭，不作本轮派工依据 | 2026-11-01T13:03:09Z（#16 创建/更新；尚无工程师评论） |

## 依赖解除与证据

- [D16 / PM#25](https://github.com/Pepgent/PM/issues/25)：三族各 14/14、每个决策项 3/3 赞成；D16-00 用户指令不投票。取回时已 CLOSED / COMPLETED。定稿、附件与 Claude/导师四票归档：[PM e3b59f1](https://github.com/Pepgent/PM/commit/e3b59f1a505fa32324eefa009f754c717ebcf454)；Argon 原票：[5bf826e9](https://github.com/Pepgent/PM/commit/5bf826e9f4dfde94fc1ffd991fba4de15177cdcc)；ArgonGovernance 原票：[0278aaa4](https://github.com/Pepgent/PM/commit/0278aaa436ca64388dee26ea4867c116f03033b1)。不等于阶段 B 工程或阶段 C/D 已完成。
- R21 与治理文本由 ArgonGovernance 统一推送：[soroi 499efb9](https://github.com/Pepgent/soroi/commit/499efb9ba79ab92eb7bc45104ca17dfdb0c66dae)；归档负责人随后仅路径补充结案事实并推送 [28dcb245](https://github.com/Pepgent/soroi/commit/28dcb24524ff095a8c4f62d2249f82e124172d6d)。R21 保持 🔄，不自动升 ✅。
- 第 1 批启动记录已归档：[PM `evidence/exec/phaseB/wave1-launch-record.md`](https://github.com/Pepgent/PM/blob/main/evidence/exec/phaseB/wave1-launch-record.md)，提交 [f6e68c6](https://github.com/Pepgent/PM/commit/f6e68c6)。仅证明启动记录已持久化，不把记录内 PID 当成当前进程存活证据。
- [PM#25](https://github.com/Pepgent/PM/issues/25) 的 Project #1 状态由归档负责人设置并回读为 **Done**（item `PVTI_lADOE4p_hs4BjKDXzhFJ2yg`）；只代表决策项结案，不代表工程完成。
- 归档负责人已向 W-06 原 BLOCKED 补齐[解除回复](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558344288)，引用 [PM#25](https://github.com/Pepgent/PM/issues/25)、PM 归档提交和 soroi 台账提交；W-06 已独立发布上述 STARTED。
- 双核原票的固定归档引用已由归档负责人发布在 [PM#25 补充评论](https://github.com/Pepgent/PM/issues/25#issuecomment-6558359030)，分别指向上述两个提交，不把秘书档案 `e3b59f1` 误当成双核原票的归档提交。
- W-05 的 D11-F12、D12-15 普通承载依赖已由 [lab-library#13](https://github.com/Pepgent/lab-library/issues/13) 补齐；据 Main 确认，通知已到达 W-05。解除事实已回复到 [PM#25 原 BLOCKED 所在 issue](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。后续普通依赖解除同样记录在原 issue，不以主会话私下记忆替代总线记录。

## 首轮哨兵巡检：写入白名单纠正

来源：Main 转述首轮哨兵巡检结果及已发出的纠正指令；本节未独立重查工程会话，不替代下一轮哨兵复核。

| 涉及席位 | 首轮发现 | 主会话纠正 | 当前状态 |
|---|---|---|---|
| W-06 `pepgent-store`、W-05 `pepgent-library` | 两席写入了白名单以外的路径：W-06 涉及 `pepgent-pm` 的 refs 和 `/tmp`；W-05 涉及 `/tmp` | Main 已于 `13:1x` 向两席发出纠正，要求读取改用 `file_read` 或 `gh api`，写入只限本席 worktree；具体分钟未提供，不补造 | 🔄 **已纠正，待哨兵下一轮复核**。“已纠正”表示纠正指令已发出，不表示已验证后续执行符合要求 |

## Home worktree 命名分支纠正

来源：Main 本轮通知；以下为其报告的执行事实与规则适用说明，秘书未独立运行工作树检查，也未修改 D16 决策原文。

- watchdog 指出，home worktree 处于 detached 状态，与 LEDGER `C3-4.4` 要求使用 `-b` 命名分支不符。
- Main 报告已依 `C2-4` 直接执行 LEDGER，在原提交上为五棵 home worktree 新建同名分支：`pepgent-store-home`、`pepgent-library-home`、`pepgent-mux-home`、`pepgent-remote-home`、`pepgent-lab-home`。
- Main 报告此操作没有改动任何文件，也没有检出 `main`。
- Main 明确：D16-09 原文“home 为 detached”与 `C3-4.4` 冲突，现以 LEDGER 为准。本节登记该通知，不把此前发车记录中的 detached 状态改写成当时已是命名分支，也不据此认定其他工作树纪律已验证。

## 核对 C1–C5

- C1：只记录四席已授权范围；不改代码、design/、生产环境，不编写或运行测试，不以 hash 比对作证据。
- C2：计票按已存在原票与 PM 正文记录，秘书不投票、不重新判断设计。
- C3：沿用十席矩阵，本轮不派工、不跨仓操作工程师工作树。
- C4：常规状态只读 issue/PR；保留观察时间，区分本轮记录与已作废历史，不把本汇总作为状态源。
- C5：不触碰冻结目录、不接触无关前端会话；不因本记录另设审批或验收门禁。

后续刷新应直接替换本文件相应行；只有工程师在原 issue/PR 发布新的 STARTED / PR / BLOCKED / DONE，才更新其运行状态。
