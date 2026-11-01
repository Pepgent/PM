# 阶段 B 席位异步总线汇总

本轮取回时间：2026-11-01T13:20:32Z（UTC）；W-06 退役与 W-09 发车同时结合 Main 通知登记，其余席位沿用各行注明的取回证据。本文是源头取回时刻的副本，不替代 issue/PR，不把进程启动或历史 DONE 当成本轮产品验收完成。秘书未派工、未改业务代码、未运行测试。

## 席位状态

| 席位 | 本轮承载 issue | 本轮 PR | 状态（仅按拥有方总线） | 最后更新时间（UTC） |
|---|---|---|---|---|
| W-06 `pepgent-store` | [soroi#282](https://github.com/Pepgent/soroi/issues/282)、[STO-05 #190](https://github.com/Pepgent/soroi/issues/190)、[STO-12 #203](https://github.com/Pepgent/soroi/issues/203) 均 CLOSED | [#286](https://github.com/Pepgent/soroi/pull/286) MERGED，关闭 #282；[#287](https://github.com/Pepgent/soroi/pull/287) MERGED，关闭 #190/#203 | **DONE／已退役（组件交付，不代表阶段 C 验收）**：三项关闭已由 `gh issue view` 核对，PR 合并由 GitHub 源头核对；Main 报告于 13:2xZ 执行 `tern kill session pepgent-store`，保留会话目录。此前 BLOCKED 已解除，不再列作活跃席位 | 2026-11-01T13:16:16Z（DONE 评论）；13:2xZ（Main 报告退役，具体分钟未提供） |
| W-05 `pepgent-library` | [lab-library#5](https://github.com/Pepgent/lab-library/issues/5)；[lab-library#13](https://github.com/Pepgent/lab-library/issues/13) 承载 D11-F12、D12-15，创建于 13:09:02Z | 本次未重新取回实现 PR 状态，不将历史 [#6](https://github.com/Pepgent/lab-library/pull/6)、[#9](https://github.com/Pepgent/lab-library/pull/9)、[#11](https://github.com/Pepgent/lab-library/pull/11) 当作本轮交付 | 🔄 **承载缺口 BLOCKED 已解除**：W-05 在 [PM 原评论](https://github.com/Pepgent/PM/issues/25#issuecomment-6558363366) 上报缺少有效 OPEN issue；现已有 #13，且 Main 确认 W-05 已收到通知。秘书已在[原 issue 回复解除](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)，未据此宣称实现、PR 或验收完成 | 2026-11-01T13:07:37Z（原 BLOCKED）；13:09:02Z（#13 创建）；解除回复时间见链接 |
| W-01 `pepgent-mux` | [omp-rpc-mux#13](https://github.com/Pepgent/omp-rpc-mux/issues/13) | 未见本轮 PR；历史 [#14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 已被 [#15](https://github.com/Pepgent/omp-rpc-mux/pull/15) 回退 | 🏗 **已派发，未见本轮 STARTED / PR / DONE**。#13 当前 OPEN；最后评论恢复会话前 OPEN，旧 DONE 不生效 | 2026-11-01T10:48:05Z（#13 最后评论；非 W-01 本轮上报） |
| W-02 `pepgent-remote` | [remote#16](https://github.com/Pepgent/remote/issues/16)（A2-01）；随实现对齐 remove 与 Slurm OCI 契约 | 未见本轮 PR；历史 [#15](https://github.com/Pepgent/remote/pull/15) CLOSED 未合并 | 🏗 **承载已建、已派发，未见本轮 STARTED / PR / DONE**。#16 当前 OPEN 无评论；旧 [#14](https://github.com/Pepgent/remote/issues/14) 已被 D15 以 NOT_PLANNED 关闭，不作本轮派工依据 | 2026-11-01T13:03:09Z（#16 创建/更新；尚无工程师评论） |
| W-09 `pepgent-lab` | 首项 [Pepgent#43](https://github.com/Pepgent/Pepgent/issues/43)（A2-12），随后 LAB-10、[Pepgent#44](https://github.com/Pepgent/Pepgent/issues/44)、LAB-04..12，按已发派工稿 | 本轮未见对应实现 PR 记录，不以启动推定 PR 或代码完成 | 🔄 **已发车（Main 运行报告）**：tern `663117180698627`；peer `01a19743-a0be`；pid `25147`。独立克隆 `pepgent-backend-clone`，home 分支 `pepgent-lab-home`，不访问无关根 checkout；首次取回 #43 仍 OPEN 无评论，不替工程师补报 STARTED | 本轮 Main 发车通知；GitHub #43 取回于 2026-11-01T13:20:32Z |

## 依赖解除与证据

- [D16 / PM#25](https://github.com/Pepgent/PM/issues/25)：三族各 14/14、每个决策项 3/3 赞成；D16-00 用户指令不投票。取回时已 CLOSED / COMPLETED。定稿、附件与 Claude/导师四票归档：[PM e3b59f1](https://github.com/Pepgent/PM/commit/e3b59f1a505fa32324eefa009f754c717ebcf454)；Argon 原票：[5bf826e9](https://github.com/Pepgent/PM/commit/5bf826e9f4dfde94fc1ffd991fba4de15177cdcc)；ArgonGovernance 原票：[0278aaa4](https://github.com/Pepgent/PM/commit/0278aaa436ca64388dee26ea4867c116f03033b1)。不等于阶段 B 工程或阶段 C/D 已完成。
- R21 与治理文本由 ArgonGovernance 统一推送：[soroi 499efb9](https://github.com/Pepgent/soroi/commit/499efb9ba79ab92eb7bc45104ca17dfdb0c66dae)；归档负责人随后仅路径补充结案事实并推送 [28dcb245](https://github.com/Pepgent/soroi/commit/28dcb24524ff095a8c4f62d2249f82e124172d6d)。R21 保持 🔄，不自动升 ✅。
- 第 1 批启动记录已归档：[PM `evidence/exec/phaseB/wave1-launch-record.md`](https://github.com/Pepgent/PM/blob/main/evidence/exec/phaseB/wave1-launch-record.md)，提交 [f6e68c6](https://github.com/Pepgent/PM/commit/f6e68c6)。仅证明启动记录已持久化，不把记录内 PID 当成当前进程存活证据。
- [PM#25](https://github.com/Pepgent/PM/issues/25) 的 Project #1 状态由归档负责人设置并回读为 **Done**（item `PVTI_lADOE4p_hs4BjKDXzhFJ2yg`）；只代表决策项结案，不代表工程完成。
- W-06 当时因 PM#25 尚未公示计票，自行判断冻结未解除并暂停，见[原 BLOCKED](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558301314)及[其后更正](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558321367)。Main 本轮指出：等待秘书登记计票不是 `C5-4②` 的发车前置，回写与开发本应并行。现 [PM#25](https://github.com/Pepgent/PM/issues/25) 已关闭并登记三族各 14/14，秘书已发[解除回复](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558344288)，W-06 后续独立完成组件交付并已退役。Main 表示后续派工将明示“D16 已通过（PM#25 已关闭），回写与开发并行，不等待回写”；本记录不据此新增开工门禁。
- 双核原票的固定归档引用已由归档负责人发布在 [PM#25 补充评论](https://github.com/Pepgent/PM/issues/25#issuecomment-6558359030)，分别指向上述两个提交，不把秘书档案 `e3b59f1` 误当成双核原票的归档提交。
- W-05 的 D11-F12、D12-15 普通承载依赖已由 [lab-library#13](https://github.com/Pepgent/lab-library/issues/13) 补齐；据 Main 确认，通知已到达 W-05。解除事实已回复到 [PM#25 原 BLOCKED 所在 issue](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。后续普通依赖解除同样记录在原 issue，不以主会话私下记忆替代总线记录。

## 首轮哨兵巡检：写入白名单纠正

来源：Main 转述首轮哨兵巡检结果及已发出的纠正指令；本节未独立重查工程会话，不替代下一轮哨兵复核。

| 涉及席位 | 首轮发现 | 主会话纠正 | 当前状态 |
|---|---|---|---|
| W-06 `pepgent-store`、W-05 `pepgent-library` | 两席写入了白名单以外的路径：W-06 涉及 `pepgent-pm` 的 refs 和 `/tmp`；W-05 涉及 `/tmp` | Main 已于 `13:1x` 向两席发出纠正，要求读取改用 `file_read` 或 `gh api`，写入只限本席 worktree；具体分钟未提供，不补造 | 🔄 **已纠正，待哨兵下一轮复核**。“已纠正”表示纠正指令已发出，不表示已验证后续执行符合要求 |

## Home worktree 当前约束与记录

现行 LEDGER `C3-4.4` 区分 home 与切片：home 可保持命名分支或 detached，均不检出 `main`、不承载代码提交，禁止来回切换；实际开发的切片工作树用 `-b` 或接续既有遗产分支。当前规则不再把 detached home 本身列为违规。

Main 此前报告，因 watchdog 对当时文字提出异议，曾在原提交上为 `pepgent-{store,library,mux,remote,lab}-home` 五棵 home 建立同名分支，未改文件、未检出 `main`。此为操作记录，不改写首批发车时的实际 detached 状态，也不把该次纠正作为后续反复切换的依据。

W-09 本次以命名分支 `pepgent-lab-home` 发车；Main 已确认并修正派工稿，与实际 `peer_send` 一致：home 仅作入口，不承载提交，不检出 `main`。启动命令与完整派工原文归档于 PM `evidence/exec/phaseB/w09-dispatch.md`，发车与退役记录见同目录 `w09-launch-record.md`。

## 核对 C1–C5

- C1：只记录既定席位及授权范围；不改代码、design/、生产环境，不编写或运行测试，不以 hash 比对作证据。
- C2：计票按已存在原票与 PM 正文记录，秘书不投票、不重新判断设计。
- C3：沿用十席矩阵，本轮不派工、不跨仓操作工程师工作树。
- C4：常规状态只读 issue/PR；保留观察时间，区分本轮记录与已作废历史，不把本汇总作为状态源。
- C5：不触碰冻结目录、不接触无关前端会话；不因本记录另设审批或验收门禁。

后续刷新应直接替换本文件相应行；只有工程师在原 issue/PR 发布新的 STARTED / PR / BLOCKED / DONE，才更新其运行状态。
