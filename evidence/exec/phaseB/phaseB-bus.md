# 阶段 B 席位异步总线汇总

本轮按 Main 提供的 (R) 事实更新：**W-03 `pepgent-images` 的 D47-02 交付后退役**，AreaMgrImages-6 核实 [ALL_DONE](https://github.com/Pepgent/images/issues/18#issuecomment-6565574006)，images#18 CLOSED、PR#19 MERGED，images 全仓无 OPEN 项，Main 已执行退役命令。当前在岗 **W-10、W-04 两席**。Main 交办的 D48 执行结果与跨席位前置见下文；其中 deploy#26 在 Main 报告时仍 OPEN，秘书取回的更晚 DONE 评论与关闭时间确认其现已 CLOSED，不把关闭当作 W-04 已退役。阶段 C 义务仍由原 OPEN issue 承接；本轮不写 LEDGER、不重跑 runtime 或凭据验证、不启停或联系工人。

**并发纠错已发生，不追溯抹除违例：** Main 在已有 4 席时启动 deploy，曾形成 5 席，超过 D16-10 硬上限 4 且没有抢占令；治理席裁定退役 W-10，Main 完成交接退役纠错。此后 W-06 正常补入形成 4 席，D23 交付后退役回 3 席；这些是当时快照，不是当前进程盘点。R8 已由治理席降级（soroi `380ab02`）；本次正常轮换不等同持续约束永久合规，不因轮换改写 LEDGER R8/R13/R14。

## 席位状态

| 席位 | 本轮承载 issue | 本轮 PR | 状态（仅按拥有方总线） | 最后更新时间（UTC） |
|---|---|---|---|---|
| W-06 `pepgent-store` | [D23-02 / soroi#315](https://github.com/Pepgent/soroi/issues/315)已关闭；前批D16-15及#282/#190/#203已交付 | [PR#316](https://github.com/Pepgent/soroi/pull/316) MERGED，合并提交5ad9b4b；前批PR#294/#286/#287已合入 | **D23已合入／本次已退役**：(R) Main提供gh pr view确认MERGED及关闭#315，之后执行 `tern kill session pepgent-store`。不再计入在跑席；本次tern666428600483843/peer01a197b6-b735启动记录保留在rolling-record。仅本仓交付，不冒称阶段C跨组件非eval唤醒已验证 | 最新依据Main本次(R)合入/退役报告；未提供精确退役UTC，不补造 |
| W-05 `pepgent-library` | [lab-library#5](https://github.com/Pepgent/lab-library/issues/5)、[#13](https://github.com/Pepgent/lab-library/issues/13) | [PR#14](https://github.com/Pepgent/lab-library/pull/14) 已 MERGED，正文关闭 #5/#13 | **已合入／已退役**：Main 滚动记录报告 OPEN issue 数为 0，已执行 `tern kill session pepgent-library`，由 W-04 补位。此前承载缺口已在[原 issue 回复解除](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。真实 File 根装载与 Lab 元数据投影仍留阶段 C，不把本仓合入当成组装可用 | 2026-11-01T13:38:53Z（PR 更新）；退役见滚动源记录 |
| W-01 `pepgent-mux` | 本批 [omp-rpc-mux#20](https://github.com/Pepgent/omp-rpc-mux/issues/20) CLOSED/COMPLETED；[#19](https://github.com/Pepgent/omp-rpc-mux/issues/19) 已交付 | [PR#21](https://github.com/Pepgent/omp-rpc-mux/pull/21) 已合入 #19；前批 PR#16/#18 已合入事实保留在 rolling-record | **本批交付后已退役**：(R，Main 提供) AreaMgrMux-2 已核实 [#20 DONE](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562906833)、[ALL_DONE](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562908726) 及 home 干净，Main 已执行 `tern kill session pepgent-mux`。本次启动标识保留在 rolling-record 第 20 项，不再列作活跃席位；本仓交付不等于镜像、部署或阶段 C 已完成 | Main 本次 (R) 合入/退役报告，转述 AreaMgrMux-2 核实；精确退役 UTC 未提供，不补造 |
| W-02 `pepgent-remote` | 本次 [remote#18](https://github.com/Pepgent/remote/issues/18)，前批 #16 已结束 | 本次 [PR#19](https://github.com/Pepgent/remote/pull/19)，前批 PR#17 | **已合入／二次进场已退役**：Main 的 rolling-record 确认 remote#18 已关闭、PR#19 合入，OPEN=0 后执行 `tern kill session pepgent-remote`。不再因 Argon 早先报告的 idle 等待状态将其计入在跑席位 | 2026-11-01T14:10:05Z（工人结束，Argon 报告）；本次退役以 Main 最新滚动记录为准 |
| W-09 `pepgent-lab` | 24 项开发承载全部 CLOSED（AreaMgrPepgent-21 核实，Main 提供）；阶段 C 留 [#30](https://github.com/Pepgent/Pepgent/issues/30)、[#23](https://github.com/Pepgent/Pepgent/issues/23) OPEN | 最终承载 PR 均已合入 main，逐项清单见[整席 ALL_DONE](https://github.com/Pepgent/Pepgent/issues/80#issuecomment-6565300789) | **整席开发承载 ALL_DONE／已退役**：(R，Main 提供) AreaMgrPepgent-21 已核实，Main 已执行 `tern kill session pepgent-lab`。退役见 rolling-record 第 34 项；D20-03 的三份文档 owner 随退役交 W-10，renderer README 始终 W-10。原 ALL_DONE 的阶段 C 未验证范围保留，不以开发闭环等同真实浏览器或跨组件已验证 | Main 本次 (R) 退役报告与 AreaMgrPepgent-21 核实；秘书已取回整席 ALL_DONE 及 #30/#23 OPEN，精确退役 UTC 未提供 |
| W-07 `pepgent-plugin` | 本批 [soroi#329](https://github.com/Pepgent/soroi/issues/329)、[#336](https://github.com/Pepgent/soroi/issues/336)、[#337](https://github.com/Pepgent/soroi/issues/337) 已交付（Main 提供） | [PR#339](https://github.com/Pepgent/soroi/pull/339) 合入 #329；[PR#340](https://github.com/Pepgent/soroi/pull/340) 合入 #336/#337 | **本批交付后已退役**：(R，Main 提供) AreaMgrSoroi-R 已核实 [ALL_DONE](https://github.com/Pepgent/soroi/issues/336#issuecomment-6563489265) 及 home status 干净，Main 已执行 `tern kill session pepgent-plugin`。此前进场标识保留在 rolling-record 第 25 项；home 干净不代表历史脏树已清理，退役不替代阶段 C 验收 | Main 本次 (R) 退役报告，转述 AreaMgrSoroi-R 核实；精确退役 UTC 未提供，不补造 |
| W-03 `pepgent-images` | [images#18](https://github.com/Pepgent/images/issues/18) 已 CLOSED | [PR#19](https://github.com/Pepgent/images/pull/19) 已 MERGED；带 ssh 的 lab-web 已发布（Main 提供） | **本批 ALL_DONE／已退役**：(R，Main 提供) AreaMgrImages-6 已核实 [ALL_DONE](https://github.com/Pepgent/images/issues/18#issuecomment-6565574006)，images 无 OPEN 项，Main 已执行 `tern kill session pepgent-images`。第 36 项启动与第 39 项退役记录均保留；不将镜像发布当作阶段 C 全流程通过 | Main 本次 (R) 退役报告；秘书已取回评论、issue/PR 与空 OPEN 列表，精确退役 UTC 未提供 |
| W-04 `pepgent-deploy` | [deploy#26](https://github.com/Pepgent/deploy/issues/26) 已于 2026-11-02T00:01:01Z CLOSED（晚于 Main 的 OPEN 报告窗口） | [PR#27](https://github.com/Pepgent/deploy/pull/27) 于 2026-11-01T23:48:56Z MERGED | **仍在岗／切片已关闭**：Main 本次仍列 W-04 在岗；随后[执行方 DONE](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565846243)记录验收 2 clone exit 0、6 项完成。只据原评论记局部 runtime，不重跑、不推断退役或阶段 C 通过 | Main 本次 (R) 在岗观察；GitHub 后续 DONE 2026-11-02T00:00:56Z、closedAt 00:01:01Z |
| W-08 `pepgent-e2e` | [soroi#259](https://github.com/Pepgent/soroi/issues/259)、[#250](https://github.com/Pepgent/soroi/issues/250) 阶段 B 编写已交付；阶段 C 义务仍留原 OPEN issue | [PR#338](https://github.com/Pepgent/soroi/pull/338) 合入 #259 及 #250 此前交付；[PR#341](https://github.com/Pepgent/soroi/pull/341) 合入 #250 最终负例交付 | **全席阶段 B ALL_DONE／维持退役**：(R，Main 提供) AreaMgrSoroi-R4 核实 [ALL_DONE](https://github.com/Pepgent/soroi/issues/259#issuecomment-6564651940)，home 与 14 个切片 worktree 都干净，Main 已执行 `tern kill session pepgent-e2e`。按[依赖更正](https://github.com/Pepgent/soroi/issues/259#issuecomment-6564664717)，#336/#337 已由 PR#340 合入关闭，不再是现存 blocker，但 F22 仍待阶段 C 实测；不重开阶段 B。退役见 rolling-record 第 30 项，本次在岗组合取总述，不沿用历史快照 | 退役源头为 Main 前次 (R) 报告与 AreaMgrSoroi-R4 核实；原 ALL_DONE 观察为 2026-11-01T22:13Z，精确退役 UTC 未提供 |
| W-10 `pepgent-web` | D20-03 三份文档全文语义核对；[WEB-07 / #29](https://github.com/Pepgent/Pepgent/issues/29) 保持关闭 | [PR#88](https://github.com/Pepgent/Pepgent/pull/88) 已合入；21 行待核实 UI 已按[结论评论](https://github.com/Pepgent/Pepgent/pull/88#issuecomment-6565460794)追认免票 | **继续在岗／不退役**：(R，Main 提供) D20-03 三份文档全文语义核对尚未完成。启动标识仍取 rolling-record 第 18 项，本次不是重新发车；UI 追认不等于文档核对完成，也不等于阶段 C 已验收 | Main 本次 (R) 在岗报告；秘书已取回 PR#88 与 #29 的追认结论评论，未提供精确 UTC |

## 本次候补顺序

来源：Main 本次 (R) W-03 退役报告。**当前在岗 W-10、W-04 两席**；deploy#26 后续关闭不等于 W-04 已退役，未收到新的启停结论前不自行改进程状态。W-09 等此前退役事实保持，阶段 C 义务仍留原 OPEN issue，秘书不据任务关闭或排期意图启动/结束席位。

## 依赖解除与证据

- **D48 授权动作执行结果与部署后续。** Main 报告且[deploy#26 登记评论 6565839690](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565839690)记载：org 开关 true、只读 key `168412790` 已注册，隔离其他 SSH key 的 ls-remote exit 0，全 org 只有该 key。秘书只取回公开登记，不接触私钥或重跑验证。[deploy PR#27](https://github.com/Pepgent/deploy/pull/27)于 23:48:56Z 合入，images PR#19 已发布 ssh 客户端镜像（Main 提供）。Main 的 OPEN/待验收 2 窗口后，[执行方 DONE 评论](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565846243)于 2026-11-02T00:00:56Z 记录容器内 clone exit 0、全部 6 项验收完成，GitHub 00:01:01Z 将 #26 关闭。记录使用最新源头状态，但不把局部 runtime、关闭或 key 注册等同阶段 C 验收、W-04 退役或实际送达。
- **PR#88 的 21 行“待核实”UI 已全部追认免票。** Main 交办，且已从 [PR#88 结论评论](https://github.com/Pepgent/Pepgent/pull/88#issuecomment-6565460794)与 [#29 结案评论](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6565463019)取回：不立案、不开纠偏承载、代码不需要改动，#29 保持关闭；不回写已合入 PR 正文。闸门 A 原文原样归档 [pepgent29-ui-pending-gate-a.md](../../gates/pepgent29-ui-pending-gate-a.md)。未来接模板删除命令时恢复 danger 条件及锁图标原行引用纠正的附注留原评论，未据此新增实现任务；W-10 的三份文档核对仍未完成。
- **D47 已定案归档。** 议会 `agenda.archived` #531（2026-11-01T23:35:32.481Z）确认 [PM#66](https://github.com/Pepgent/PM/issues/66) D47-01 v2、02 v1 各 5/5 通过（门槛 4），[定稿、修订、反驳与原票](https://github.com/Pepgent/PM/commit/e424f96869ea)已由 daemon 归档，替换“01 修订中”的旧状态。01 的私钥持久源与只读 bind 按 v2 执行，不经 Komodo Variable/Stack environment，Lab 双变量接口不变；02 由 images#18 承载。未据定案宣称已送达、恢复、部署或阶段 C 验收通过。
- **WEB-07 第二次 BLOCKED（AI 面板失败文案）免票放行。** Main 已确认按候选 (a) 处置，原上报为 [Pepgent#29 评论 6565014238](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6565014238)。[闸门 A 原文](../../gates/pepgent29-blocked-2-gate-a.md)与[闸门 B 原文](../../gates/pepgent29-blocked-2-gate-b.md)均判定 (a) 不越界：不在面板内显示失败原因，发送未受理保留草稿、不伪造发送成功，读取失败时消息/模型为空；不借用 subtitle，不新增失败输入位或组件结构，D20/D45 白名单不变。初审与待送达稿取 local://decisions/pepgent29-blocked-2*.md；本条不把待送达稿、原文归档或 Main 放行等同经理已实际送达或工人已恢复。
- **D46-03 v2 的跨席位前置已合入。** (R，Main 提供，秘书已取回 GitHub 状态) [images#16](https://github.com/Pepgent/images/issues/16) CLOSED、[PR#17](https://github.com/Pepgent/images/pull/17) MERGED，根 `images.json` 已进入 images main；下游 [Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80) 当前 CLOSED。[ALL_DONE 原评论](https://github.com/Pepgent/images/issues/16#issuecomment-6565014276)明确 W-03 未验证 Lab 侧读取与导出，不把前置合入或下游关闭当作阶段 C 验收证据。
- [D16 / PM#25](https://github.com/Pepgent/PM/issues/25)：三族各 14/14、每个决策项 3/3 赞成；D16-00 用户指令不投票。取回时已 CLOSED / COMPLETED。定稿、附件与 Claude/导师四票归档：[PM e3b59f1](https://github.com/Pepgent/PM/commit/e3b59f1a505fa32324eefa009f754c717ebcf454)；Argon 原票：[5bf826e9](https://github.com/Pepgent/PM/commit/5bf826e9f4dfde94fc1ffd991fba4de15177cdcc)；ArgonGovernance 原票：[0278aaa4](https://github.com/Pepgent/PM/commit/0278aaa436ca64388dee26ea4867c116f03033b1)。不等于阶段 B 工程或阶段 C/D 已完成。
- R21 与治理文本由 ArgonGovernance 统一推送：[soroi 499efb9](https://github.com/Pepgent/soroi/commit/499efb9ba79ab92eb7bc45104ca17dfdb0c66dae)；归档负责人随后仅路径补充结案事实并推送 [28dcb245](https://github.com/Pepgent/soroi/commit/28dcb24524ff095a8c4f62d2249f82e124172d6d)。R21 保持 🔄，不自动升 ✅。
- 第 1 批启动记录已归档：[PM `evidence/exec/phaseB/wave1-launch-record.md`](https://github.com/Pepgent/PM/blob/main/evidence/exec/phaseB/wave1-launch-record.md)，提交 [f6e68c6](https://github.com/Pepgent/PM/commit/f6e68c6)。仅证明启动记录已持久化，不把记录内 PID 当成当前进程存活证据。
- [PM#25](https://github.com/Pepgent/PM/issues/25) 的 Project #1 状态由归档负责人设置并回读为 **Done**（item `PVTI_lADOE4p_hs4BjKDXzhFJ2yg`）；只代表决策项结案，不代表工程完成。
- W-06 当时因 PM#25 尚未公示计票，自行判断冻结未解除并暂停，见[原 BLOCKED](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558301314)及[其后更正](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558321367)。Main 本轮指出：等待秘书登记计票不是 `C5-4②` 的发车前置，回写与开发本应并行。现 [PM#25](https://github.com/Pepgent/PM/issues/25) 已关闭并登记三族各 14/14，秘书已发[解除回复](https://github.com/Pepgent/soroi/issues/282#issuecomment-6558344288)，W-06 后续独立完成组件交付并已退役。Main 表示后续派工将明示“D16 已通过（PM#25 已关闭），回写与开发并行，不等待回写”；本记录不据此新增开工门禁。
- 双核原票的固定归档引用已由归档负责人发布在 [PM#25 补充评论](https://github.com/Pepgent/PM/issues/25#issuecomment-6558359030)，分别指向上述两个提交，不把秘书档案 `e3b59f1` 误当成双核原票的归档提交。
- W-05 的 D11-F12、D12-15 普通承载依赖已由 [lab-library#13](https://github.com/Pepgent/lab-library/issues/13) 补齐；据 Main 确认，通知已到达 W-05。解除事实已回复到 [PM#25 原 BLOCKED 所在 issue](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。后续 **所有 BLOCKED 解除一律回写到原 issue 或 PR**，不以主会话私下记忆或 `peer_send` 通知替代总线解除记录。
- W-07 的 [LeaderCompliance 范围冲突上报](https://github.com/Pepgent/soroi/pull/290#issuecomment-6558686798) 已因 [bf19aee](https://github.com/Pepgent/soroi/commit/bf19aee641d53b476e683175d85a8261c5f5e1ae) 的适用范围修订解除，已回写[原 PR 评论](https://github.com/Pepgent/soroi/pull/290#issuecomment-6558717336)。该 watchdog 不再约束上述 worktree 中的 tern 工程席位；这里只登记本项解除，不宣称 W-07 整体完成或已独立验证后续不再误报。
- D16-15 的 C5/C6 解锁已由 W-06 本人在 [Pepgent#43 原帖发布](https://github.com/Pepgent/Pepgent/issues/43#issuecomment-6558903750)，秘书已查到该评论，按 Main 要求不重复补发。合入 [PR#294](https://github.com/Pepgent/soroi/pull/294) 与 [CI 成功观察](https://github.com/Pepgent/soroi/pull/294#issuecomment-6558903754) 均有源头记录；W-09 继续按原 issue 完成本仓交付。
- 重启后续接总线时，#284 的 W-07 进度仍写“等待 install-check 交接裁决”。原帖已有[初审](https://github.com/Pepgent/soroi/issues/284#issuecomment-6558804885)及[双核会审](https://github.com/Pepgent/soroi/issues/284#issuecomment-6558827868)，秘书已[回写已有解除条件](https://github.com/Pepgent/soroi/issues/284#issuecomment-6558973174)：发行物不带 install-check，W-08 通过 A0 驱动自行投送，不再等待新裁决；未关闭实现 issue，未新增契约或门禁。
- #220 的 File 根承载 [#299](https://github.com/Pepgent/soroi/issues/299) 已由 [PR#304](https://github.com/Pepgent/soroi/pull/304) 合入。AreaSoroi 已实际送达，W-08 在[#220确认接续](https://github.com/Pepgent/soroi/issues/220#issuecomment-6559271276)；不再列为待承载或待领导分类，不以此等同F12统一真实验收通过。
- #226 的 F20②′ 已按[初审](https://github.com/Pepgent/soroi/issues/226#issuecomment-6559003280)登记依赖 [SOR-12 #211](https://github.com/Pepgent/soroi/issues/211#issuecomment-6559101325)。D8 的 E2E-14 依赖及 F20 组件列已直接补齐 SOR-12（[PM aa9899b](https://github.com/Pepgent/PM/commit/aa9899b)，main 整合 [6e0ea23](https://github.com/Pepgent/PM/commit/6e0ea23)）；保持 slow_step、角色闸门与阶段边界，不换成 sleep。
- 滚动记录 `local://exec/phaseB/rolling-record.md` 现由秘书维护归档（C4-1、R6）；Main 每次只提供进场、退役事实与 (R) 证据，不再亲自编辑。秘书据此替换本总线对应行，并归档为 PM `evidence/exec/phaseB/rolling-record.md`；不从记录代替查询进程与实现源头。
- 自 U95 通知起，工程轮换只维护本总线与 rolling-record，不再逐次改 LEDGER R8/R13/R14 或为此提交；LEDGER 仅在阶段性变化时替换。D17 重大决策索引已按明确指令更新，skill 保持 🏗，未宣称提效效果已验证。
- [D19 / PM#29](https://github.com/Pepgent/PM/issues/29) v3已4/4通过；六份PM技术正文已[回写1fc4428](https://github.com/Pepgent/PM/commit/1fc4428)。W-07已在[#209登记STARTED消费](https://github.com/Pepgent/soroi/issues/209#issuecomment-6559532128)，不再等投票，不以此当实现完成。
- [D20 / PM#30](https://github.com/Pepgent/PM/issues/30) v4三项各5/5、无否决/有效反例，CLOSED/Project Done；[五席原票与D16/D7/D8回写5621469](https://github.com/Pepgent/PM/commit/5621469)。[文档承载#51](https://github.com/Pepgent/Pepgent/issues/51)全部差量合入前保持open，W09在席owner为W09、退役后W10；renderer README始终W10，经理已实际送达。
- [D21 / PM#32](https://github.com/Pepgent/PM/issues/32)与[D22 / PM#31](https://github.com/Pepgent/PM/issues/31)均4/4通过，CLOSED/Project Done；D22[协调席已有赞成原票已补登](https://github.com/Pepgent/PM/issues/31#issuecomment-6559817971)，[补登与4/4归档ea2e7ae](https://github.com/Pepgent/PM/commit/ea2e7ae)。共用[deploy#20](https://github.com/Pepgent/deploy/issues/20)已由[PR#21](https://github.com/Pepgent/deploy/pull/21)合入关闭，W04第三次退役，依据Main本次(R)报告。[D7-19接口名与语义回写8a8ec77](https://github.com/Pepgent/PM/commit/8a8ec77)。`library.merge`的/tmp偏差仍由[Pepgent#52](https://github.com/Pepgent/Pepgent/issues/52)独立承载，[经理已送达并观察消费](https://github.com/Pepgent/Pepgent/issues/52#issuecomment-6559750631)；部署声明合入不能当该应用偏差已修复，也不替代阶段C真实卷路径观察。
- [D23 / PM#33](https://github.com/Pepgent/PM/issues/33)已P0结案：01四席4/4、02五席5/5，无否决/反例；[定稿、五票、取证与D6回写a5a0c5e](https://github.com/Pepgent/PM/commit/a5a0c5e)。[soroi#222第3项已回复正式结论](https://github.com/Pepgent/soroi/issues/222#issuecomment-6559952673)，store承载[soroi#315](https://github.com/Pepgent/soroi/issues/315)已由[PR#316](https://github.com/Pepgent/soroi/pull/316)合入关闭，W06退役（Main提供）；不将其他BLOCKED项、整个SOR-18或阶段C标完成。
- [D24 / PM#34](https://github.com/Pepgent/PM/issues/34) v2已P0结案，四席4/4、0否决/分类争议，首轮反例由v2消除、第2轮改赞成，v1票不计；[定稿与各轮原票5fd29cf](https://github.com/Pepgent/PM/commit/5fd29cf)，[九处正文已回写6beff82](https://github.com/Pepgent/PM/commit/6beff82)。store POST/runs/derive、DeriveCommit和GUI intervene.derive不变、D12未改；W07解析by、W09从认证上下文填当前UserId。[SOR15原BLOCKED已登记结论](https://github.com/Pepgent/soroi/issues/217#issuecomment-6560041051)，已交GovClone_2dcf安排两仓经理送达；尚未取回本项实际送达/恢复证据，不以文书结案冒称工程完成。
- watchdog本窗口闭环证据来自Main与AreaMgrSoroi：修复omp-config `20330d7`、soroi `6fc3c95`的cwd限定；Main于15:28:14Z重启，经理核实W07/W08/W06于15:28:32–45Z重启后未新增LeaderCompliance告警。只记录该窗口，不泛化为未来永久合规。旧GovClone_55b0快照失效，Main已新fork GovClone_2dcf接替。
- **D13-02 ①② 承载与阶段 C 分工已登记。** D28-01 撤回后，由协调席按 D13-02、D16-04 直接补 [deploy#22（W-04，①）](https://github.com/Pepgent/deploy/issues/22)与 [soroi#327（W-08，②）](https://github.com/Pepgent/soroi/issues/327)，不新增投票等待。GitHub 依赖源头显示 [A0 / soroi#235](https://github.com/Pepgent/soroi/issues/235) 依赖两项，验证 lab-web 容器入口①与独立中心②；[S1 F01 / soroi#182](https://github.com/Pepgent/soroi/issues/182) 只依赖 soroi#327，只验证 S1 独立中心②。DeskD13Carriers 明确后者不是漏边，秘书未改依赖图；切片只做本仓检查，真实容器、中心身份、插件加载与 eval 的跨组件结果仍须阶段 C 取证。

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

## 每仓片区经理与实际送达（U98）

来源：Main 转交的用户直接指令、已就位报告及 rolling-record 第34行。原话已登记 LEDGER U98；本节直接替换旧的工人 peer_send 方案，不将其保留为并行执行口径。

- 每个 repo 设一名独立常驻 task:mid 专门片区经理（U98、U99）：当前岗位为 AreaMgrPepgent、AreaMgrSoroi、AreaMgrDeploy，分别负责对应仓工人。原 AreaPepgent/AreaSoroi 已交接退出；下文14:29Z记录仍保留当时真实观察者名称。片区经理写 `local://state/area-*.md` 与 issue 评论，不改业务代码、不裁决契约。
- 工人把 STARTED/PR/BLOCKED/DONE/ALL_DONE 与停工等待写原 issue/PR，不 peer_send 管理层或片区经理。经理依 U107 用 `peer_ask` 单向主动巡查并亲自查看工作空间；处置用 `peer_send` 送达并观察恢复，只有 peer 不可达或答复与工作空间不符时，才用 `tern capture` 或会话 JSONL 备选取证，不用 `tern send` 代替 peer 送达。
- Main 保留首次派活、全局排期和席位轮换；首次之后的日常工人通信交经理，不再由常规管理人员主动 peer 对接。秘书汇总 issue/PR 与经理记录，不替经理接管工人，不把评论已写等同实际送达。
- 已取得首轮经理送达与响应证据：AreaPepgent 的14:29Z记录确认W-09恢复推进、#43合入、W-10收到协议但因新白名单缺口停工；AreaSoroi 的14:29Z记录确认W-07/W-08收到并处理协议，W-07继续独立切片、W-08接续F12。这里只登记该窗口的实际观察，不泛化为后续通信永久合规。源记录分别为 `local://state/area-pepgent.md` 与 `local://state/area-soroi.md`。

## 核对 C1–C5

- C1：只记录既定席位及授权范围；不改代码、design/、生产环境，不编写或运行测试，不以 hash 比对作证据。
- C2：当前投票依 U95 / LEDGER C2-3 按职能席位与专责权重计票；D15/D16 的三族数字只作为当时历史事实保留，不追溯改票。秘书不投票、不判断设计。
- C3：沿用十席矩阵，本轮不派工、不跨仓操作工程师工作树。
- C4：工程事实沿用 issue/PR，进程与停工观察标明具名片区经理或 Main 等拥有方及观察时间；实际巡查、送达与恢复确认由每仓片区经理依 U107 用 peer 单向负责，秘书不接管工人、不以评论已写或消息投递替代实际收到。
- C5：不触碰冻结目录、不接触无关前端会话；不因本记录另设审批或验收门禁。

后续刷新直接替换对应行，标明源头与观察时间；运行状态取 issue/PR 和具名拥有方的进程观察，轮换取 Main 的 rolling-record，不从“消息已投递”推断工人已恢复或完成。
