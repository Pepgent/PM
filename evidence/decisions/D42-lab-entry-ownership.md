# D42：Lab 首页、容器、设置三页读取、P15 导出与成员、结论、模板版本、Panel 新建命令的承载切片（解 Pepgent#78 BLOCKED）（P0）——定稿

决策 issue：[Pepgent/PM#61](https://github.com/Pepgent/PM/issues/61)。发起：Coordination（DeskLabEntryOwnership）。本文件由议会 daemon 生成。

## 事实

初审材料与逐项归属表：[`evidence/gates/pepgent78-lab-entry-ownership.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent78-lab-entry-ownership.md)。闸门 A 与闸门 B 的判定：同目录下 `pepgent78-lab-entry-ownership-gate-a.md`、`pepgent78-lab-entry-ownership-gate-b.md`。

**P0 依据。** W-09 已在 [Pepgent#78 评论 6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) 报 BLOCKED。其“一、入口未实现”等待的是入口承载。D1-12 规定：“`P0`（关键路径工程 `BLOCKED` 解阻）”。

**事实（Pepgent main，2026-11-01T21:01Z 取得）。**
- `apps/web/src/server/lab/operations.ts:259-265`：`home`、`containers`、`settings` 页读取返回 `notSupported`。
- `operations.ts:543-569`：`member.invite/role/quota/remove`、`agentTemplate.saveVersion`、`conclusion.confirm`、`panel.prompt` 等命令返回 `notSupported`。
- `server/lab/**` 没有 P15 导出（`ImageDefinition`）的代码。
- main 上除 `panel.prompt` 外没有新建 Panel 会话的代码。`library.apply` 要求 nodes Panel 会话（`library.ts:317`）。
- wire 已齐全，`protocol/lab/pages.ts`、`command.ts` 已有上述页面、命令与结果的类型，不需要改 `protocol/lab/**`。

**决策正文的现状。**
- D7 字段表（`DEC/D7-lab-backend.md:95,102,105,106`）和 D12-08、D12-10（`DEC/D12-lab-wire.md:40,42,544,549,654`）定了这些入口的形状、语义与权限。
- D8 §4.2 的 LAB 切片表（`DEC/D8-mvp-scope.md:321-334`）没有一行写这些入口。
- LAB-03 正文写明“catalog/commands 仍……返回 `not_supported`；本切片不引入……业务审批命令”。
- D12-10 列出的 D9 排除清单不含这些命令。
- `pepgent-soroi/AGENTS.md:123`：“接口或权限表缺少某项不构成授权：禁止据此……把功能移入 D9”。
- `pepgent-soroi/AGENTS.md`：“尚未定案的范围或派工归属必须经表决，或有逐字依据”。

**涉及的 F 流程。**
- 三页读取与 P15：WEB-06 解锁 F17、F31（`DEC/D8-mvp-scope.md:340`），F31 的切片列是“全部 LAB、WEB、DEP”（`:150`），D9-02 依据 WEB-03..06 投影源码和录制的线数据（`:420`）。WEB-06 的验收是“同 WEB-03”，即输入为真实录制的线数据（`:337`）。
- `conclusion.confirm`：F30 S2、F31 ⑥ 写回的是待确认结论（`DEC/D7-lab-backend.md:65`）。
- `panel.prompt`：F29 S2 中 `library.apply` 要求的 nodes Panel 会话只能由它新建（`:148`；D12:549）。
- 成员与 saveVersion：F01–F31 中没有一行逐字使用，它们属于 D12-10 第一版命令。D38-02 v2 以它们成功落库为写 activity 的前提。

**不在本议程：**
- `flowEditor`、`datasets`、`connectCluster` 页读取和其余 16 个未实现命令（初审材料第五节第 1 项），另行处置；
- #78 BLOCKED“二、同一事务冲突”。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D42-01 v1 | 首页、容器、设置三页读取与 P15 镜像定义导出的承载切片 | Pepgent/Pepgent 新切片 LAB-13（新 issue）；W-09 `pepgent-lab`；`apps/web/src/server/lab/**`；D8 §4.2 切片表与 `D8-slice-issues.md` | 新建切片 LAB-13，owner 为 W-09。它承载 `lab.page.read` 的 `home`、`containers`、`settings` 三页读取：<br>- 按 D12-08 的完整页面形状与 D12 类型返回，各页 `panels` 按 D12-08“只选本人本页会话头”；<br>- 第一版无来源的字段，按 D12“第一版无来源字段”一节取精确空值；<br>- `containers.images` 由 P15 从 images 检出导出 `ImageDefinition`（D7-13、D12:654，沿用 P15 占位，假定能工作）。<br><br>活动行的写入、`home.activity` 与 `settings.repoActivity` 的取行、`ImageDefinition.name` 的取值，仍归 Pepgent#78（D38-02 v2、D38-03 v1）。#78 依赖 LAB-13：LAB-13 的代码合入 main 后，#78 BLOCKED 第一类中这三页与 P15 的部分随之解除。<br><br>路径白名单只有 `apps/web/src/server/lab/**`，在 D16-09 的 W-09 行内。不改 `protocol/lab/**`、`rpc/lab.ts`，不改 wire 形状。<br><br>切片只做本仓编译、类型检查和基础检查（C1-3、D16-13）。跨组件结果在 Pepgent#30 与阶段 C 统一验收。<br><br>本行通过后：<br>- 总协调席在 Pepgent 新建 LAB-13 issue；<br>- 秘书在 D8 §4.2 切片表与 `D8-slice-issues.md` 加 LAB-13 一行（解锁 F29、F31；依赖 LAB-04、LAB-07a、LAB-10、LAB-12）；<br>- AreaMgrPepgent 在 #78 登记依赖，并送达 W-09。 | **得到：** 三页读取和 P15 导出有了逐字承载，#78 的结果 3、4、5 可以落地，WEB-06 能录制真实线数据。仍是一席一域，不扩白名单，不改 wire。<br>**代价：** D8 新增一个切片编号和一个 issue。<br>**落选：**<br>- (a) 并入 #78：#78 是 D38 的承载，混入入口实现，一个 issue 就有两个主题；<br>- (b) 重开 LAB-07a 或 LAB-12：这两个切片已关闭，原文只承载 catalog/实验页和 clusters，重开会改写已结案记录；<br>- (c) 交 W-10：越过 D16-09 白名单，`server/lab/**` 只归 W-09；<br>- (d) 列入 D9：违反 AGENTS.md:123，且 D12-08 已把这三页定为第一版读取。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD42）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D42-02 v1 | 成员四命令、结论确认与智能体模板保存版本的承载切片 | 同 LAB-13；W-09；`apps/web/src/server/lab/**`；D12-10 命令与逐命令权限 | LAB-13 同时承载 `member.invite`、`member.role`、`member.quota`、`member.remove`、`conclusion.confirm`、`agentTemplate.saveVersion` 六个命令。按 D12-10 的命令变体、逐 kind 结果与逐命令权限实施：<br>- `member.*` 由 Better Auth organization/member/invitation 作唯一权威（D7-03），要求 `manageMembers`；邀请邮件（P11）按 D8-16 不进第一版；<br>- `conclusion.confirm` 要求 `write`，且操作者是结论所在会话的 owner；<br>- `agentTemplate.saveVersion` 等于对该 Panel 会话 `.omp/agents/<id>` 路径做 `library.merge`（D12-10、D7-11），要求 `editLibrary`，且操作者是该 Panel 会话的 owner。<br><br>契约内的私有代码结构由工程师决定。这六个命令成功落库时写 activity，归 #78（D38-02 v2）；#78 依赖 LAB-13。<br><br>路径白名单、检查方式、新建 issue、回写与送达都同 D-01 行。 | **得到：** D12-10 第一版命令有了承载，#78 结果 1、2 中的六个命令可以落地。命令联合不再有返回 `not_supported` 的第一版变体。<br>**代价：** LAB-13 范围变大。<br>**落选：**<br>- (a) 重开 LAB-03：它的正文明写不引入业务命令；<br>- (b) 重开 LAB-11a 或 LAB-10：它们的原文只承载 `discussion.load` 与附件、`library.stage/apply`；<br>- (c) 列入 D9：D12-10 的 D9 排除清单不含这些命令，且违反 AGENTS.md:123；<br>- (d) 各命令分别开 issue：同一席同一域，徒增仪式（U83）。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD42）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D42-03 v1 | Panel 会话新建入口 panel.prompt 的承载切片 | 同 LAB-13；W-09；`apps/web/src/server/lab/**`；D12-10、D12:508、D12:549 | LAB-13 同时承载 `panel.prompt`。按 D12-10 实施：<br>- Panel 会话不存在时，以操作者为 owner 新建，origin 为 `Panel{page, scope}`；存在时，操作者须是其 owner；权限为 `write`；<br>- 消息按既定 `human_irc_queue` 语义入队后即返回 `{kind:'prompted', conversation}`，投递回复经 `conversation` 频道。<br><br>理由：<br>- `library.apply` 要求 nodes Panel 会话（main `library.ts:317`），`agentTemplate.saveVersion` 要求 agents Panel 会话（D12:544）；<br>- main 上没有任何其他新建 Panel 会话的代码，所以这两条命令和 #78 中对应的 activity、F29 S2 在主路径上都不可达。<br><br>路径白名单、检查方式、新建 issue、回写与送达都同 D-01 行。 | **得到：** `library.apply` 与 `saveVersion` 的主路径可达，F29 S2 和 #78 合入族的 activity 有了前提。各页的 Panel 有了唯一的新建入口。<br>**代价：** LAB-13 多一个跨页命令。<br>**落选：**<br>- (a) 并入 LAB-10：已关闭，原文不含 Panel 新建；<br>- (b) 另开切片：同一席同一域，`saveVersion` 直接依赖它，拆开只会增加等待；<br>- (c) 由部署 seed 预建 Panel 会话：Panel 会话按操作者 owner 新建（D12:549），seed 无法代替。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD42）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D42-Coordination.md`、`votes/D42-ClaudeHigh.md`、`votes/D42-Argon.md`、`votes/D42-LeadMentor.md`、`votes/D42-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。