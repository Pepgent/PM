# 阶段 B 席位异步总线汇总

GitHub 取回基点：2026-11-01T13:20:32Z（UTC），随后按 Main 维护的 `local://exec/phaseB/rolling-record.md` 及本轮原 PR 补录状态。当前活跃四席为 **lab、plugin、images、deploy**；store、mux、remote、library 已退役。各行注明来源，未重新取回的工程实现进度不推断。本文是工作副本，不替代 issue/PR；秘书未派工、未改业务代码、未运行测试。

## 席位状态

| 席位 | 本轮承载 issue | 本轮 PR | 状态（仅按拥有方总线） | 最后更新时间（UTC） |
|---|---|---|---|---|
| W-06 `pepgent-store` | [soroi#282](https://github.com/Pepgent/soroi/issues/282)、[STO-05 #190](https://github.com/Pepgent/soroi/issues/190)、[STO-12 #203](https://github.com/Pepgent/soroi/issues/203) 均 CLOSED | [#286](https://github.com/Pepgent/soroi/pull/286) MERGED，关闭 #282；[#287](https://github.com/Pepgent/soroi/pull/287) MERGED，关闭 #190/#203 | **DONE／已退役（组件交付，不代表阶段 C 验收）**：三项关闭已由 `gh issue view` 核对，PR 合并由 GitHub 源头核对；Main 报告于 13:2xZ 执行 `tern kill session pepgent-store`，保留会话目录。此前 BLOCKED 已解除，不再列作活跃席位 | 2026-11-01T13:16:16Z（DONE 评论）；13:2xZ（Main 报告退役，具体分钟未提供） |
| W-05 `pepgent-library` | [lab-library#5](https://github.com/Pepgent/lab-library/issues/5)、[#13](https://github.com/Pepgent/lab-library/issues/13) | [PR#14](https://github.com/Pepgent/lab-library/pull/14) 已 MERGED，正文关闭 #5/#13 | **已合入／已退役**：Main 滚动记录报告 OPEN issue 数为 0，已执行 `tern kill session pepgent-library`，由 W-04 补位。此前承载缺口已在[原 issue 回复解除](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。真实 File 根装载与 Lab 元数据投影仍留阶段 C，不把本仓合入当成组装可用 | 2026-11-01T13:38:53Z（PR 更新）；退役见滚动源记录 |
| W-01 `pepgent-mux` | [omp-rpc-mux#13](https://github.com/Pepgent/omp-rpc-mux/issues/13)、[#17](https://github.com/Pepgent/omp-rpc-mux/issues/17) | [PR#16](https://github.com/Pepgent/omp-rpc-mux/pull/16)、[PR#18](https://github.com/Pepgent/omp-rpc-mux/pull/18) 均 MERGED，分别关闭 #13、#17 | **已合入／已退役**：合并状态已从 GitHub 取回；Main 滚动记录报告 OPEN issue 数为 0，已执行 `tern kill session pepgent-mux`。不再列作活跃席位，不冒称阶段 C 已通过 | 2026-11-01T13:14:00Z、13:16:42Z（两 PR 更新）；退役见滚动源记录 |
| W-02 `pepgent-remote` | [remote#16](https://github.com/Pepgent/remote/issues/16)（A2-01） | [PR#17](https://github.com/Pepgent/remote/pull/17) MERGED，关闭 #16 | **已合入／已退役**：GitHub OPEN issue 列表已返回无匹配；Main 滚动记录报告执行 `tern kill session pepgent-remote`。真实 registry、Slurm、Apptainer 集成结果仍由阶段 C 承担，不冒称验收完成 | 2026-11-01T13:21:02Z（PR 更新）；退役见滚动源记录 |
| W-09 `pepgent-lab` | 首项 [Pepgent#43](https://github.com/Pepgent/Pepgent/issues/43)（A2-12），随后 LAB-10、[Pepgent#44](https://github.com/Pepgent/Pepgent/issues/44)、LAB-04..12，按已发派工稿 | 本轮未见对应实现 PR 记录，不以启动推定 PR 或代码完成 | 🔄 **已发车（Main 运行报告）**：tern `663117180698627`；peer `01a19743-a0be`；pid `25147`。独立克隆 `pepgent-backend-clone`，home 分支 `pepgent-lab-home`，不访问无关根 checkout；首次取回 #43 仍 OPEN 无评论，不替工程师补报 STARTED | 本轮 Main 发车通知；GitHub #43 取回于 2026-11-01T13:20:32Z |
| W-07 `pepgent-plugin` | 首项 [soroi#283](https://github.com/Pepgent/soroi/issues/283)（A2-05）；本次范围冲突上报在 [PR#290](https://github.com/Pepgent/soroi/pull/290)（关联 #215） | [PR#290](https://github.com/Pepgent/soroi/pull/290) 已 MERGED；本行不据此推定席位全部任务完成 | 🔄 **推进中；LeaderCompliance 范围冲突 BLOCKED 已解除**：ArgonGovernance 在 [bf19aee](https://github.com/Pepgent/soroi/commit/bf19aee641d53b476e683175d85a8261c5f5e1ae) 明确只监督共享根的 Main，排除 `/Users/mouriya/Ext/worktrees/pepgent-*`、`issue-*` 下的 tern 工程席位。秘书已在[原 PR 回复解除](https://github.com/Pepgent/soroi/pull/290#issuecomment-6558717336)；其他既有授权边界不变 | 2026-11-01T13:36:37Z（原上报）、13:36:46Z（PR 更新）；解除回复时间见链接 |
| W-03 `pepgent-images` | [images#6](https://github.com/Pepgent/images/issues/6)，接着 [#3](https://github.com/Pepgent/images/issues/3) | 本轮未取回对应实现 PR，不作推断 | 🔄 **已发车（Main 滚动记录）**：tern `663263209586691`，peer `01a19748-1206`，home `pepgent-images-home`，基点 images `f66e655`；接续 `issue-6-lab-web-live` 的合法 `d40585f`。旧 DONE 已被 D15 作废，不作为本轮完成依据 | 发车见滚动源记录；GitHub 状态为本轮取回副本 |
| W-04 `pepgent-deploy` | 首项 [deploy#16](https://github.com/Pepgent/deploy/issues/16)（A2-07），随后 [#8](https://github.com/Pepgent/deploy/issues/8)、[#1](https://github.com/Pepgent/deploy/issues/1) | 本轮未取回对应实现 PR，不作推断 | 🔄 **已发车（Main 滚动记录）**：tern `663671231479811`，peer `01a19756-6aae`，home `pepgent-deploy-home`，基点 deploy `e4f16cc`；#8 在新路径 `pepgent-deploy-issue8` 接续合法 `56eaff7`，不复用冻结目录 | 发车见滚动源记录；未把发车代报为工程师 STARTED |

## 依赖解除与证据

- [D16 / PM#25](https://github.com/Pepgent/PM/issues/25)：三族各 14/14、每个决策项 3/3 赞成；D16-00 用户指令不投票。取回时已 CLOSED / COMPLETED。定稿、附件与 Claude/导师四票归档：[PM e3b59f1](https://github.com/Pepgent/PM/commit/e3b59f1a505fa32324eefa009f754c717ebcf454)；Argon 原票：[5bf826e9](https://github.com/Pepgent/PM/commit/5bf826e9f4dfde94fc1ffd991fba4de15177cdcc)；ArgonGovernance 原票：[0278aaa4](https://github.com/Pepgent/PM/commit/0278aaa436ca64388dee26ea4867c116f03033b1)。不等于阶段 B 工程或阶段 C/D 已完成。
- R21 与治理文本由 ArgonGovernance 统一推送：[soroi 499efb9](https://github.com/Pepgent/soroi/commit/499efb9ba79ab92eb7bc45104ca17dfdb0c66dae)；归档负责人随后仅路径补充结案事实并推送 [28dcb245](https://github.com/Pepgent/soroi/commit/28dcb24524ff095a8c4f62d2249f82e124172d6d)。R21 保持 🔄，不自动升 ✅。
- 第 1 批启动记录已归档：[PM `evidence/exec/phaseB/wave1-launch-record.md`](https://github.com/Pepgent/PM/blob/main/evidence/exec/phaseB/wave1-launch-record.md)，提交 [f6e68c6](https://github.com/Pepgent/PM/commit/f6e68c6)。仅证明启动记录已持久化，不把记录内 PID 当成当前进程存活证据。
- [PM#25](https://github.com/Pepgent/PM/issues/25) 的 Project #1 状态由归档负责人设置并回读为 **Done**（item `PVTI_lADOE4p_hs4BjKDXzhFJ2yg`）；只代表决策项结案，不代表工程完成。
- W-06 当时因 PM#25 尚未公示计票，自行判断冻结未解除并暂停，见[原 BLOCKED](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558301314)及[其后更正](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558321367)。Main 本轮指出：等待秘书登记计票不是 `C5-4②` 的发车前置，回写与开发本应并行。现 [PM#25](https://github.com/Pepgent/PM/issues/25) 已关闭并登记三族各 14/14，秘书已发[解除回复](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558344288)，W-06 后续独立完成组件交付并已退役。Main 表示后续派工将明示“D16 已通过（PM#25 已关闭），回写与开发并行，不等待回写”；本记录不据此新增开工门禁。
- 双核原票的固定归档引用已由归档负责人发布在 [PM#25 补充评论](https://github.com/Pepgent/PM/issues/25#issuecomment-6558359030)，分别指向上述两个提交，不把秘书档案 `e3b59f1` 误当成双核原票的归档提交。
- W-05 的 D11-F12、D12-15 普通承载依赖已由 [lab-library#13](https://github.com/Pepgent/lab-library/issues/13) 补齐；据 Main 确认，通知已到达 W-05。解除事实已回复到 [PM#25 原 BLOCKED 所在 issue](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。后续 **所有 BLOCKED 解除一律回写到原 issue 或 PR**，不以主会话私下记忆或 `peer_send` 通知替代总线解除记录。
- W-07 的 [LeaderCompliance 范围冲突上报](https://github.com/Pepgent/soroi/pull/290#issuecomment-6558686798) 已因 [bf19aee](https://github.com/Pepgent/soroi/commit/bf19aee641d53b476e683175d85a8261c5f5e1ae) 的适用范围修订解除，已回写[原 PR 评论](https://github.com/Pepgent/soroi/pull/290#issuecomment-6558717336)。该 watchdog 不再约束上述 worktree 中的 tern 工程席位；这里只登记本项解除，不宣称 W-07 整体完成或已独立验证后续不再误报。
- 后续常规发车、退役由 Main 直接维护 `local://exec/phaseB/rolling-record.md`，秘书据此归档并替换本总线对应行，不再要求 Main 为每次常规轮换发送 IRC；源记录归档为 PM `evidence/exec/phaseB/rolling-record.md`。
- 台账已按 C4-3 直接替换：R8/R13 的最新四席与退役情况见 [soroi `8e7bb5e`](https://github.com/Pepgent/soroi/commit/8e7bb5e)，R14/R15 的 store 已合入与 W-09 发车见 [soroi `1cd2716`](https://github.com/Pepgent/soroi/commit/1cd2716)。不升级为产品验收 ✅。

## 首轮哨兵巡检：写入白名单纠正

来源：Main 转述首轮哨兵巡检结果及已发出的纠正指令；本节未独立重查工程会话，不替代下一轮哨兵复核。

| 涉及席位 | 首轮发现 | 主会话纠正 | 当前状态 |
|---|---|---|---|
| W-06 `pepgent-store`、W-05 `pepgent-library` | 两席写入了白名单以外的路径：W-06 涉及 `pepgent-pm` 的 refs 和 `/tmp`；W-05 涉及 `/tmp` | Main 已于 `13:1x` 向两席发出纠正，要求读取改用 `file_read` 或 `gh api`，写入只限本席 worktree；具体分钟未提供，不补造 | 🔄 **已纠正，待哨兵下一轮复核**。“已纠正”表示纠正指令已发出，不表示已验证后续执行符合要求 |

## Home worktree 当前约束与记录

现行 LEDGER `C3-4.4` 区分 home 与切片：home 可保持命名分支或 detached，均不检出 `main`、不承载代码提交，禁止来回切换；实际开发的切片工作树用 `-b` 或接续既有遗产分支。当前规则不再把 detached home 本身列为违规。

Main 此前报告，因 watchdog 对当时文字提出异议，曾在原提交上为 `pepgent-{store,library,mux,remote,lab}-home` 五棵 home 建立同名分支，未改文件、未检出 `main`。此为操作记录，不改写首批发车时的实际 detached 状态，也不把该次纠正作为后续反复切换的依据。

W-09 本次以命名分支 `pepgent-lab-home` 发车；Main 已确认并修正派工稿，与实际 `peer_send` 一致：home 仅作入口，不承载提交，不检出 `main`。启动命令与完整派工原文归档于 PM `evidence/exec/phaseB/w09-dispatch.md`，发车与退役记录见同目录 `w09-launch-record.md`。

## 双模隔离事件：广播误入

来源：Main 转交的 **SoroiKeeperGpt 自报**。按已发生的事件登记，不把发送方自报扩展为独立核验结论。

- SoroiKeeperGpt 误用 `write agent://all` 广播，催收消息因此注入 SoroiKeeperOpus，违反 `U91` 的双模禁止交流规定。
- Main 转交自报中的消息原文：“仍在执行本轮调查的子代理现在收束并提交最终报告；不要扩展范围”。该消息是任务催收，不含事实、记忆或观点；误入事件本身仍已发生。
- SoroiKeeperGpt **称没有读取对方任何内容**，并表示今后只定向发送给自己的子代理。未读取声明及后续改正均按自报记录，秘书未据此声称双模全程隔离已验证。

## 核对 C1–C5

- C1：只记录既定席位及授权范围；不改代码、design/、生产环境，不编写或运行测试，不以 hash 比对作证据。
- C2：计票按已存在原票与 PM 正文记录，秘书不投票、不重新判断设计。
- C3：沿用十席矩阵，本轮不派工、不跨仓操作工程师工作树。
- C4：常规状态只读 issue/PR；保留观察时间，区分本轮记录与已作废历史，不把本汇总作为状态源。
- C5：不触碰冻结目录、不接触无关前端会话；不因本记录另设审批或验收门禁。

后续刷新应直接替换本文件相应行；只有工程师在原 issue/PR 发布新的 STARTED / PR / BLOCKED / DONE，才更新其运行状态。
