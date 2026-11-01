# 阶段 B 席位异步总线汇总

本轮按 Main 最新 rolling-record、片区经理 **2026-11-01T14:29Z** 观察及原 issue 截至 **14:36:15Z** 的放行/恢复记录更新：在跑 **lab、plugin、e2e、web，共4席**，十席全部至少发车一次。remote 二次进场已退役、W-10已补入。以下是取回时副本，不替代 issue/PR、tern ls 或片区经理现场；秘书未派工、未改业务代码、未运行测试。

## 席位状态

| 席位 | 本轮承载 issue | 本轮 PR | 状态（仅按拥有方总线） | 最后更新时间（UTC） |
|---|---|---|---|---|
| W-06 `pepgent-store` | [D16-15 / PM#26](https://github.com/Pepgent/PM/issues/26)；实现 [soroi#293](https://github.com/Pepgent/soroi/issues/293)，消费方 [Pepgent#43](https://github.com/Pepgent/Pepgent/issues/43)；前批 #282/#190/#203 已交付 | 本次 [PR#294](https://github.com/Pepgent/soroi/pull/294) 已 MERGED；前批 PR#286/#287 已合入 | **临时任务已合入／已退役**：W-06 已在[消费方原帖发出解锁评论](https://github.com/Pepgent/Pepgent/issues/43#issuecomment-6558903750)，CI 已生成 `store-contract` 分支；Main 提供的 `git ls-remote` 观察指向 `8a23e213`，并报告已执行 `tern kill session pepgent-store`。秘书未重复发解锁评论，不再计为第五席 | 2026-11-01T13:55:56Z（解锁及 CI 观察评论）；退役按 Main 本轮报告 |
| W-05 `pepgent-library` | [lab-library#5](https://github.com/Pepgent/lab-library/issues/5)、[#13](https://github.com/Pepgent/lab-library/issues/13) | [PR#14](https://github.com/Pepgent/lab-library/pull/14) 已 MERGED，正文关闭 #5/#13 | **已合入／已退役**：Main 滚动记录报告 OPEN issue 数为 0，已执行 `tern kill session pepgent-library`，由 W-04 补位。此前承载缺口已在[原 issue 回复解除](https://github.com/Pepgent/PM/issues/25#issuecomment-6558437925)。真实 File 根装载与 Lab 元数据投影仍留阶段 C，不把本仓合入当成组装可用 | 2026-11-01T13:38:53Z（PR 更新）；退役见滚动源记录 |
| W-01 `pepgent-mux` | [omp-rpc-mux#13](https://github.com/Pepgent/omp-rpc-mux/issues/13)、[#17](https://github.com/Pepgent/omp-rpc-mux/issues/17) | [PR#16](https://github.com/Pepgent/omp-rpc-mux/pull/16)、[PR#18](https://github.com/Pepgent/omp-rpc-mux/pull/18) 均 MERGED，分别关闭 #13、#17 | **已合入／已退役**：合并状态已从 GitHub 取回；Main 滚动记录报告 OPEN issue 数为 0，已执行 `tern kill session pepgent-mux`。不再列作活跃席位，不冒称阶段 C 已通过 | 2026-11-01T13:14:00Z、13:16:42Z（两 PR 更新）；退役见滚动源记录 |
| W-02 `pepgent-remote` | 本次 [remote#18](https://github.com/Pepgent/remote/issues/18)，前批 #16 已结束 | 本次 [PR#19](https://github.com/Pepgent/remote/pull/19)，前批 PR#17 | **已合入／二次进场已退役**：Main 的 rolling-record 确认 remote#18 已关闭、PR#19 合入，OPEN=0 后执行 `tern kill session pepgent-remote`。不再因 Argon 早先报告的 idle 等待状态将其计入在跑席位 | 2026-11-01T14:10:05Z（工人结束，Argon 报告）；本次退役以 Main 最新滚动记录为准 |
| W-09 `pepgent-lab` | [Pepgent#43](https://github.com/Pepgent/Pepgent/issues/43)、[LAB-10 #15](https://github.com/Pepgent/Pepgent/issues/15)、[#44](https://github.com/Pepgent/Pepgent/issues/44)，控制端点相关LAB-08 #24 | [PR#45](https://github.com/Pepgent/Pepgent/pull/45) 已合入 #43 | **推进中／AreaPepgent已观察恢复**：经理14:29Z记录实际工具活动与LAB-10推进。#44第2项已[双闸门放行](https://github.com/Pepgent/Pepgent/issues/44#issuecomment-6559372690)并[终端送达](https://github.com/Pepgent/Pepgent/issues/44#issuecomment-6559378482)，不再等待旧额度恢复；按LAB-10→LAB-04→#44。控制端点受影响部分仍待D19，不阻断无关实现 | 2026-11-01T14:29Z（推进观察）；14:36:07Z（#44送达记录） |
| W-07 `pepgent-plugin` | 当前 [SOR-18 #222](https://github.com/Pepgent/soroi/issues/222)，随后SOR-19/20独立部分；[SOR-13 #209](https://github.com/Pepgent/soroi/issues/209)部分等待 | 经理记录 [PR#300](https://github.com/Pepgent/soroi/pull/300) 已说明本机原生模块限制；File根 [PR#304](https://github.com/Pepgent/soroi/pull/304) 已合入 #299 | **推进中／部分BLOCKED**：AreaSoroi已观察新协议实际送达和确认；SOR-13/14/15待P0控制端点契约D19/PM#29，其他切片继续。#284不再等待install-check，经理已查到DONE；不重复派工 | 2026-11-01T14:29Z（AreaSoroi） |
| W-03 `pepgent-images` | [images#6](https://github.com/Pepgent/images/issues/6)、[#3](https://github.com/Pepgent/images/issues/3) | [PR#12](https://github.com/Pepgent/images/pull/12) 已 MERGED，正文关闭 #6/#3 | **已合入／已退役**：本轮 GitHub OPEN issue 列表返回无匹配，Main 滚动记录报告已执行 `tern kill session pepgent-images`，由 W-08 补位。镜像本仓证据不代替发行安装、真实浏览器会话和部署顺序的阶段 C 验收 | 2026-11-01T13:41:04Z（PR 更新）；退役见滚动源记录 |
| W-04 `pepgent-deploy` | [deploy#16](https://github.com/Pepgent/deploy/issues/16)、[#8](https://github.com/Pepgent/deploy/issues/8)、[#1](https://github.com/Pepgent/deploy/issues/1) | [PR#17](https://github.com/Pepgent/deploy/pull/17) 已 MERGED，正文一次关闭三项 | **已合入／已退役**：GitHub OPEN issue 列表返回无匹配，Main 滚动记录报告已执行 `tern kill session pepgent-deploy`。本仓基础检查不代表阶段 C 的真实 store 导入、seed/Web 顺序、登录及安装后工具验收完成 | 2026-11-01T13:47:17Z（PR 更新）；退役见滚动源记录 |
| W-08 `pepgent-e2e` | [E2E-12 #220](https://github.com/Pepgent/soroi/issues/220)、[E2E-14 #226](https://github.com/Pepgent/soroi/issues/226)、DIST-02/A0 | 沿用既有PR#266/#260分工；经理观察F05、F21驱动已有提交，不据此推断全部统一验收完成 | **推进中／File根依赖已解锁并送达**：#299由PR#304合入，经理已终端送达；工人[#220确认](https://github.com/Pepgent/soroi/issues/220#issuecomment-6559271276)接续F12、采用片区协议。F12后续具体编辑结果待观察，不以接续声明当完成。统一阶段全流程验收未开始；异步非阻塞接缝金丝雀依C1-3/U96，不作为工人门禁 | 2026-11-01T14:29Z（AreaSoroi） |
| W-10 `pepgent-web` | [WEB-01 / Pepgent#9](https://github.com/Pepgent/Pepgent/issues/9)，后续WEB-02..07与E2E-20/21 | 尚未取回对应实现PR | **STARTED（恢复）**：tern `664899592126467`、peer `01a19781-1a1e`；A组5文件已[双闸门放行](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559372684)，经理已[终端送达](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559378242)，工人已[登记恢复](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559380035)，切片`issue-9-web-01-async-snapshot`。B组仍待[P0 D20/PM#30](https://github.com/Pepgent/PM/issues/30)，不随A组放行 | 2026-11-01T14:36:15Z（工人STARTED恢复） |

## 依赖解除与证据

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
- 后续常规发车、退役由 Main 直接维护 `local://exec/phaseB/rolling-record.md`，秘书据此归档并替换本总线对应行，不再要求 Main 为每次常规轮换发送 IRC；源记录归档为 PM `evidence/exec/phaseB/rolling-record.md`。
- 自 U95 通知起，工程轮换只维护本总线与 rolling-record，不再逐次改 LEDGER R8/R13/R14 或为此提交；LEDGER 仅在阶段性变化时替换。D17 重大决策索引已按明确指令更新，skill 保持 🏗，未宣称提效效果已验证。

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

- 每个 repo 设一名独立常驻 task:mid 片区经理：AreaPepgent 管 W-09、W-10；AreaSoroi 管 W-07、W-08。片区经理只写 `local://state/area-*.md` 与 issue 评论，不改业务代码、不裁决契约。
- 工人把 STARTED/PR/BLOCKED/DONE/ALL_DONE 与停工等待写原 issue/PR，不再 peer_send 管理层。经理以 `tern capture` 观察现场、收集停工/前置合入/全部完成，向管理层上报；收到处置后以 `tern send` 送达并观察恢复。
- Main 保留首次派活、全局排期和席位轮换；首次之后的日常工人通信交经理，不再由常规管理人员主动 peer 对接。秘书汇总 issue/PR 与经理记录，不替经理接管工人，不把评论已写等同实际送达。
- 已取得首轮经理送达与响应证据：AreaPepgent 的14:29Z记录确认W-09恢复推进、#43合入、W-10收到协议但因新白名单缺口停工；AreaSoroi 的14:29Z记录确认W-07/W-08收到并处理协议，W-07继续独立切片、W-08接续F12。这里只登记该窗口的实际观察，不泛化为后续通信永久合规。源记录分别为 `local://state/area-pepgent.md` 与 `local://state/area-soroi.md`。

## 核对 C1–C5

- C1：只记录既定席位及授权范围；不改代码、design/、生产环境，不编写或运行测试，不以 hash 比对作证据。
- C2：当前投票依 U95 / LEDGER C2-3 按职能席位与专责权重计票；D15/D16 的三族数字只作为当时历史事实保留，不追溯改票。秘书不投票、不判断设计。
- C3：沿用十席矩阵，本轮不派工、不跨仓操作工程师工作树。
- C4：工程事实沿用 issue/PR，进程与停工观察标明片区经理/Main/Argon 等报告来源；实际送达交每仓片区经理用 tern capture/send 负责。工人不再 peer_send 管理层，秘书不以评论已写替代工人已收到。
- C5：不触碰冻结目录、不接触无关前端会话；不因本记录另设审批或验收门禁。

后续刷新直接替换对应行，标明源头与观察时间；运行状态取 issue/PR 和具名拥有方的进程观察，轮换取 Main 的 rolling-record，不从“消息已投递”推断工人已恢复或完成。
