# soroi-228-site：闸门 B 判定

判定席位：ArgonGovernance（本轮一次性组织治理席实例；不新增席位或票数）。

对象：[soroi#228](https://github.com/Pepgent/soroi/issues/228) 所报 `Human` 来历缺 `site` 的风险，以及初审材料第五节登记的整运行 `abort` 问题。

本判定只管席位路径域、阶段门禁和投票程序，不代替 Argon 的闸门 A，不是实施指令或对产品本意的裁决。本轮只写本文件，没有联系工人、在 GitHub 发言、提交、运行测试、启动服务、启用定时唤醒或开展巡检。

路径简称：

- `SOROI`：`/Users/mouriya/Ext/code/pepgent/pepgent-soroi`
- `PM`：`/Users/mouriya/Ext/code/pepgent/pepgent-pm`
- `DEC`：`PM/evidence/decisions`
- `BRIEF`：`PM/evidence/gates/soroi-228-site.md`

## 一、适用程序与已核事实

1. **双闸门不能互相代裁。** `SOROI/AGENTS.md:58-60` 与 `SOROI/.omp/skills/tern-worker/SKILL.md:51-59` 规定：A 判产品意图/公开契约，B 判路径域/阶段/程序；仅双方均不越界才可免票。任一认定越界，须 P0 表决，不得先合入再追认。用户原话依据是 `SOROI/LEDGER.md:110`（U96）。
2. **既定域内实现不因需要修复就必须投票。** `DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D16-phaseB-review-restore.md:36`（D16-12）及 `SOROI/AGENTS.md:122` 区分既有契约内的私有实现/本仓测试与公开 ADT、持久化、生命周期、验收语义变更。
3. **路径归属不因席位退役转移。** `DEC/D16-phaseB-review-restore.md:33`（D16-09，已读完整长行）：`packages/store/**` 归 W-06；`packages/omp-soroi/**` 归 W-07；`e2e/**` 归 W-08；Lab 的公开协议及服务端消费方归 W-09。各域独立进程、分支和 PR，不可由闲着的另一席兼写。
4. **当前 W-06、W-07 均不在岗。** 本实例直接运行 `tern ls`，输出中的工程会话只有 `pepgent-lab`（663117180698627）与 `pepgent-e2e`（663739950956547），没有 `pepgent-store` 或 `pepgent-plugin`；`PM/evidence/exec/phaseB/rolling-record.md:43` 记录 W-06 D23 交付后退役，W-07 已经核实 ALL_DONE 后退役则是本轮任务给定事实。该记录的旧三席盘点不能覆盖本次 `tern ls`。本条仅为本次取回快照，不保证后续实时状态。
5. **与 B 判定有关的源码前提已经核实。** `SOROI/packages/store/src/contract.ts:41-51,136-142` 的 `Human` 无 `site`，事件已有 `transfer/position`；`SOROI/packages/store/src/store.ts:312-327,406-412` 的 Human 分支按该位置调用 `commitVolume`，该函数读到 `soroi-batch/*.parquet` 时调用 `importAgentProgress`。这是源码事实，不是本轮运行成功的证明。已通过的发布规则见 `DEC/D11A-solo-ruling-review.md:40`（D11-24），其效力由 `DEC/D16-phaseB-review-restore.md:26` 恢复。
6. **开发期不是每步跨组件验收期。** `DEC/D16-phaseB-review-restore.md:34,37`（D16-10/13）、`SOROI/AGENTS.md:45,127` 规定代码完成后才写/跑测试、逐 spec 所测代码合入后可编写、本仓基础检查不变成跨组件 live 锁；阶段 C 仍统一验收。U96 后增加的异步非阻塞接缝金丝雀是 `SOROI/AGENTS.md:45` 的明确安排，不能把旧 D16-13 解释为连这一安排也禁止，更不能把金丝雀变成开工/合并前置。

必读来源缺失说明：已请求 `/Users/mouriya/Ext/work/o1/paper.md`，工具返回不存在，随后读取其父目录也未列出该文件；没有把同目录的 `article.md`、摘要或其他材料冒充论文原文。本次结论直接依据上述可读用户原话、现行规则与决策正文，不引用未读论文作为证据。

## 二、逐项判定

### B-1：处置 b 的路径域与工程性质

**结论：B 侧不越界，可作为 W-06 域内本仓测试免投票实施，但不是由当前在岗的 W-07/W-08/W-09 代写，也不要求现在为此恢复 W-06。**

`packages/store/test/**` 完全包含在 D16-09 的 W-06 白名单内（`DEC/D16-phaseB-review-restore.md:33`）；本仓测试脚本归工程师自主决定（`DEC/D10-repo-delivery.md:20`）。拟测的 Human 选卷和批次导入代码已经存在（`SOROI/packages/store/src/store.ts:312-327,406-412`），本仓回归用例本身不改 `OriginSchema`、持久化或验收语义。前提是 A 独立确认没有契约缺口，且写测试前所测实现确已完成；一旦测试设计需新增 `site` 或改变语义，就不再属于本项放行。

W-06 当前不在岗，白名单仍属于 W-06。若后续选择 b，由 Main 按既有同域重新进场、独立 worktree/分支/PR 与同时活跃不超过 4 的规则调度 W-06，不需为正常同域再进场另立治理投票（`DEC/D16-phaseB-review-restore.md:33-34,36`）。本次不派工、不恢复进程。

### B-2：处置 c（给 Human 加 site）

**结论：不能免票放行，必须 P0 逐项表决公开 ADT/持久化与跨组件消费变更；投票后仍须各席只写本域，不能通过一张跨域 PR 绕过隔离。**

处置 c 明确改变入站 `OriginSchema`、持久化 `StoredOriginSchema` 和选卷依据，影响 W-06、W-07，并可能影响 W-09 的 Lab 消费方（`BRIEF:102`；`SOROI/packages/store/src/contract.ts:46-51,136-142`；`DEC/D10-repo-delivery.md:20,22`）。这属于 D10-08 点名的 ADT、wire/持久化公开契约变更，不是“补一个字段”的私有实现。

多席分别在自己的白名单内修改，不等于每个工程师都越域；本项必须投票的独立理由是公开契约改变。任何让单席直接修改 `packages/store/**` 和 `packages/omp-soroi/**` 的执行方式，则还会实际跨越 D16-09 互斥域，不能由协调席口头放宽（`DEC/D16-phaseB-review-restore.md:33`；`SOROI/AGENTS.md:74`）。本判定不赞成或否决 `site` 方案的产品必要性，该问题仍归 A。

### B-3：处置 a、b 的阶段安排与承载

**结论：A 若确认既有契约无缺口，优先采用 a，免票记录结论，不因未查询 `/progress` 重开原实现或新建验收切片；b 是可选的代码完成后本仓回归，不是关闭风险说明或继续阶段 B 的前置。**

本轮材料将 [soroi#228](https://github.com/Pepgent/soroi/issues/228) 记为已合入关闭，并明确上报是“推断、未运行”的风险说明，不是正式 BLOCKED（`BRIEF:3-4`）；SOR-20 的既定判据是远程中止后 transcript 回中心，F17 还有全运行中止义务（`DEC/D8-mvp-scope.md:136,284`）。不能把没有取得某一额外 runtime 证据自动改写成“已完成实现必须重开”。

- **a 的具体处置：** 后续由有权限的记录执行者在现有讨论位置补充双闸门结论及源码依据，不改已合并 PR 正文，不宣称 runtime 已证明批次汇入，不要求工人重新进场。按本轮 developer 的 `github-issue-pr-routing` 规则，已有 PR 后的实现澄清附在 [PR #320](https://github.com/Pepgent/soroi/pull/320) 的新评论；原 issue 可以用链接索引该裁决，不承载另一套实现讨论。本轮不进行这些写入。
- **b 的具体处置：** 如选择补本仓回归，按 B-1 由 W-06 承接，不改原 SOR-20 完成口径，不把新测试或 W-06 重新进场作为其他席位开工/合入条件。只运行 store 本仓真实实现的回归不违反 D16-13；若变成插件、remote、store 全栈运行，就不能再称为“store 本仓测试”。
- **跨组件证据：** 完整用户流程仍在阶段 C 统一执行；开发期也可由已授权的产品全景部门/W-08 按 U96 做异步非阻塞接缝观察。不能承诺现有 F16/F17 已自动覆盖 takeover 的 `/progress` 断言：F16 的条款是正常远程 Agent 提交，F17 的中止入口是整运行 abort（`DEC/D8-mvp-scope.md:135-136`）。附加观察不自动变成新增强制判据，处置 d 另见 B-4。

以上以 `DEC/D16-phaseB-review-restore.md:34,36-37`、`SOROI/AGENTS.md:45,127` 和 `SOROI/LEDGER.md:97,110`（U83/U96）为阶段及反设卡依据。

### B-4：处置 d（改 E2E-18/F17 强制判据）

**结论：按材料所写的“增加 takeover 后 `/progress` 必须有行”这一强制验收修改，必须 P0 表决，不能由 W-08 或秘书以补测试之名直接改判据；只记录不改变通过条件的附加观测不在此列。**

`DEC/D8-mvp-scope.md:136`（F17③）规定的是向根端点发 `abort{run}`、远程中止与 `call_aborted/run_aborted`，不是 takeover 后 Human 来历的查询；F16④ 的批次查询则见同文 `:135`。将另一入口和查询提升为 [E2E-18（soroi#233）](https://github.com/Pepgent/soroi/issues/233) 的强制通过条件，改变了已有验收语义，属于 `DEC/D10-repo-delivery.md:20` 与 `SOROI/AGENTS.md:122` 明列的投票类别。W-08 对 `e2e/**` 有写权限，不等于有修改公开验收契约的决定权（`DEC/D16-phaseB-review-restore.md:33`）。

投票通过后，W-08 在自己的路径域回写 spec；如系调用链修复，各实现席另改自己的域，不得由 W-08 补业务实现。该结论不否定对既有义务增加非强制观测的正常工程自由。

### B-5：送达对象与已退役席位

**结论：选择 a 时无需唤回已退役 W-07，也无需通知不在岗 W-06；裁决留在既有讨论位置并供 soroi 片区经理及后续承接者读取，只有确有 b/c 或 abort 修复任务需要执行，才在对应席重新进场后由片区经理送达。**

`tern ls` 已确认 W-06/W-07 都不在岗；不能把“让上报方知道了”设成完成无代码澄清的前提。Main 负责首次派活和轮换，后续工人裁决由片区经理单向送达，管理层不直接联系工人（`SOROI/AGENTS.md:80-81`；`SOROI/.omp/skills/tern-worker/SKILL.md:14-20`）。a 没有 store 改动，W-06 不是必须收件人；b 给 W-06；c 涉及 W-06/W-07，只有实际受影响的 Lab 消费任务才给 W-09；W-08 若承接观测/spec 则取得相应判据与来源，不顺带成为实现 owner。

### B-6：处置 e（注释/正文歧义澄清）

**结论：A 若确认只是将现有 D11-24/HumanEvent 规则说清，B 侧免票允许由 Argon 修改 design 文本，无需改代码或恢复工人；不得借澄清改写已通过 PM 契约，实质修改则必须 P0。**

D6 草图已有 HumanEvent 的 transfer/position，CallOrigin.Human 无 site（`DEC/D6-store-service.md:72-85`）；D11-24 已有 Human/Aborted 位置卷发布规则（`DEC/D11A-solo-ruling-review.md:40`）。是否仍存在意图或公开契约歧义，由 A 判，不由 B 代定。

`design/*.md` 的执行角色是 Argon，PM 的已授权正文同步是秘书，不能让 W-06/W-07 或秘书越权修改 design（`DEC/D16-phaseB-review-restore.md:30,79`）。本轮优先不动 PM 决策正文；A 如认定需要实质修订 D6/D11-24，则进入 P0，不能把“秘书同步”当成改变契约的授权。

## 三、范围外登记：整运行 abort 的独立 B 判定

**结论：本项不能被 takeover 的 a 结论顺带消案；既有契约内的实现修复归 W-07、无需仅因修复重新投票，但在 A 尚未确认既有义务前不作无条件放行，凡需要新增/选择“中止步是否提交”的公开生命周期或持久化语义，必须 P0，不能单方删改 `design/store.md:131` 迁就现状。**

### 源头核实

- `SOROI/design/store.md:99-100,131` 分别给出运行中止锚点、嵌套生命周期和“随运行中止时，已写下批次随这一步汇入”的文字。
- `DEC/D6-store-service.md:32-33,43-44`（D6-04/05/15/16）分别规定步提交、结束/中止、被中止调用的批次与记录、InFlight 派生先落步的路径。
- **初审材料未突出但与本项直接相关的既定验收：** `DEC/D8-mvp-scope.md:136` 的 F17③ 已明确要求整运行 `abort{run}` 后 store 写入 **`call_aborted` 和 `run_aborted` 两者**，不能只把 transcript 回中心和运行终止当成 F17 全通过。此处只引用现有义务，没有替 A 解释它如何与 D6 全部条款组合。
- `SOROI/packages/omp-soroi/src/eval/index.ts:81-88,106-113` 明确在出现 failed 时跳过步提交，随后结束 remote 资源与 eval 会话；`SOROI/packages/omp-soroi/src/eval/execute.ts:334-352` 区分 takeover/derive 的中止结果与一般失败；`SOROI/packages/omp-soroi/src/eval/supervisor.ts:78-102` 等在途义务释放后调用 store abort。**[INFERENCE，未运行]** 这些代码与材料所述“整运行中止没有落该步”的现象相符；本轮不把 PR 的历史输出冒充新 runtime 证据。

### 权限、席位与程序

1. **A 的专责：** 判断这是否已由 D6-04/05/15、D8 F17③规定，只差实现，还是存在需要表决的契约空白/冲突；B 不替 A 选中止语义。
2. **B 对既有义务修复的明确放行范围：** A 若确认既有义务且修复只涉及 `packages/omp-soroi/**`、沿用既有 `Aborted`/StepCommit/abort 接口及批次路径，则属于 W-07 域内实现缺口，B 不另设投票或阶段 C 等待锁；应由 Main 正常安排 W-07 同域重新进场，以独立修复承载接续，不修改已合并 PR、不抹去原交付成果，不交 W-08 或 W-06 代写（`DEC/D16-phaseB-review-restore.md:33-36`；`SOROI/AGENTS.md:128`）。本轮没有创建该承载或派工。
3. **B 的 P0 界线：** 若处置需决定新的中止步持久化方式、改变 store 终止锚点/提交允许状态、改公开 schema、删减“随运行中止汇入”义务，或变更 F17 已有 `call_aborted` 判据，则触及 D10-08 明列的生命周期/持久化/验收语义，必须 P0；若涉及 store 实现则仍归 W-06，不能由 W-07 越域补齐（`DEC/D10-repo-delivery.md:20,22`；`SOROI/AGENTS.md:60,122`）。
4. **阶段边界：** 修复实现属于当前阶段 B；修复代码完成前不写/跑其测试。对应 spec 在所测代码合入后由合法域 owner 编写，完整跨组件执行仍在阶段 C，U96 金丝雀保持非阻塞。不能拿这项风险无限冻结无关切片，也不能把它推到 D9 删除当前范围。

## 四、票权与后续采用方式

- **本轮实际建议：** 对 takeover 的 `site` 风险采用 a；b 可选、e 由 A 判断是否值得澄清；不实施 c/d，除非另获 P0 通过；整运行 abort 保留独立承接，按第三节的 A/B 边界处理。没有把“源码看起来能工作”标成 runtime 已验证。
- **c/d 或第三节中的公开契约变更：** 属产品/架构/跨组件契约议题，常设参投为总协调席（Main 与治理承接者合计一票）、独立审查席、Argon、LeadMentor；如提案另含白名单重划、派工制度或 PM 错误路径清理，该治理条目须加 ArgonGovernance 独立参投。B 审查职责不意味着日常单仓技术议题都需治理席例行计票（`SOROI/AGENTS.md:14-27`）。
- **需要投票时：** 本次双闸门所列越界处置按 P0 逐项提交，不把尚未发生的可选 c/d 变成 a 的投票前置；按现行议会程序处理议题与选票，不用 IRC 收票或唤醒旧巡检实例。U103/U105 的用户原话见 `SOROI/LEDGER.md:116`，优先于旧文书中的手工消息流。此文件只给程序判定，没有实际发起投票。
- **交付边界：** 本文件待主会话汇合独立的 gate-a 结论后采用；B 的“可免票”只代表 B 边界通过，不冒充双闸门共同放行。本轮指定文件交由主会话/文件所有者统一归档，本实例不提交。
