# D44：Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的承载切片 LAB-14（P1）——定稿

决策 issue：[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)。发起：Coordination（DeskLabEntryBatch2）。本文件由议会 daemon 生成。

## 事实

初审材料与逐项归属表：[`evidence/gates/lab-entry-batch2.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2.md)。闸门 A 与闸门 B 的判定：同目录下 `lab-entry-batch2-gate-a.md`、`lab-entry-batch2-gate-b.md`。

**来由。** [D42（PM#61）](https://github.com/Pepgent/PM/issues/61)初审材料第五节第 1 项列出了这批入口。它们不在 Pepgent#78 BLOCKED 的主路径上，当时没有并入 P0 议程。D42 闸门 A 已提示它们“同样严禁移入 D9”。

**优先级依据（P1）。**
- 本批没有工人报 BLOCKED。W-10 在 [Pepgent#29 评论 6564277591](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564277591) 写明“不是 W-10 的 BLOCKED”，所以不符合 D1-12 的 P0“关键路径工程 `BLOCKED` 解阻”。
- 它是 W-10 的 WEB-07 页面接线与 W-09 的服务端入口之间的接缝缺口。WEB-07 把 13 页接到真实读取和命令，服务端返回 `not_supported` 时页面按 `OperationFailure` 显示。不补，F09、F12、F27、F31 的 S2 会到阶段 C 才失败。
- C1-3 设开发期接缝纠偏，是为了防止这类错配“直到阶段 C 才集中爆发”，发现即发起 P1（`pepgent-soroi/AGENTS.md:26,45`）。
- 它不属于 P2：要补的是工程承载，不是删改 PM 中的错误条文。

**事实（Pepgent main，2026-11-01T21:43Z 取得）。**
- `apps/web/src/server/lab/operations.ts:259-265`：`flowEditor`、`datasets`、`connectCluster` 页读取返回 `notSupported`。同处的 `home`、`containers`、`settings` 已归 D42 的 LAB-13。
- `operations.ts:543-569`：共 26 个命令返回 `notSupported`，D42 承载其中 7 个。剩下 19 个是本批：`lab.update`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete`。
- wire 已齐全，`protocol/lab/pages.ts`、`command.ts` 已有上述页面、命令与结果的类型，不需要改 `protocol/lab/**`。这些入口用到的 Lab 表也都已在 `server/lab/schema.ts` 中。
- Pepgent 全部 40 个 issue 的正文与评论中，这批入口都没有逐字承载。

**决策正文的现状。**
- 形状、语义与权限都已定案：
  - D7 字段表：`DEC/D7-lab-backend.md:89,93,94,95,98,101,102,104,106`；
  - D7-07、D7-14、D7-15：`:67,74,75`；
  - D12-06、D12-08、D12-10 与逐命令权限表：`DEC/D12-lab-wire.md:38,40,42,540-561`。
- D8 §4.2 的 LAB 切片表（`DEC/D8-mvp-scope.md:321-334`）没有一行写这些入口。D42 的 LAB-13（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）只承载 D42-01..03 列出的入口。
- D12-10 列出的 D9 排除清单不含这些命令。D8-16 清单（`DEC/D8-mvp-scope.md:87`）只含接入向导执行（P7），不含这三页读取或这些命令。
- D12“第一版无来源字段”（`DEC/D12-lab-wire.md:625,636,640`）只把 `datasets.artifacts[].role/verdict/contract` 与 `connectCluster` 的安装日志、注册令牌、连接测试结果列 D9。
- `pepgent-soroi/AGENTS.md:123`：“接口或权限表缺少某项不构成授权：禁止据此……把功能移入 D9”。
- `pepgent-soroi/AGENTS.md`：“尚未定案的范围或派工归属必须经表决，或有逐字依据”。

**涉及的 F 流程。**
- `datasets`：F09 S2“数据集页按运行列出产物”、F12 S2“数据集页显示‘被引用于’的运行”、F31 ⑥“数据集页出现产物及来源”（`DEC/D8-mvp-scope.md:128,131,150`）。
- `flowEditor`：F27 S2“流程编辑器保存草稿”（`:146`）。
- `connectCluster`：WEB-06 解锁 F17、F31（`:340`）。D9-01/02 依据录制的线数据做来源分类（`:413,420`）。
- 19 个命令：F01–F31 中没有一行逐字使用，它们都是 D12-10 的第一版命令。由 WEB-07（Pepgent#29）接到真实页面。D42-02 以同样依据承载了 `member.*` 与 `agentTemplate.saveVersion`。

**不在本议程：** #78 BLOCKED“二、同一事务冲突”；D9 列出的向导执行（P7）与实验产物契约字段。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D44-01 v2 | flowEditor、datasets、connectCluster 三页读取的承载切片 | Pepgent/Pepgent 新切片 LAB-14（新 issue）；W-09 `pepgent-lab`；`apps/web/src/server/lab/**`；D8 §4.2 切片表与 `D8-slice-issues.md` | 新建切片 LAB-14，owner 为 W-09。它承载 `lab.page.read` 的三页读取，按 D12-05、D12-06、D12-08 的页面参数与完整形状返回：<br>- `flowEditor{draft}` 返回 `{palette, templates, panels}`。`palette` 取库默认分支的节点定义，与 `experiments.definitions` 同源（D12-06）；草稿本身在目录。<br>- `datasets` 返回 `{artifacts, contexts, references, objectSizes, valueRuns, volumes, templates, panels}`：<br>  - store File 来自目录图；<br>  - 卷为结束远程调用清单；<br>  - valueRuns 读 store（D12-08）；<br>  - `artifacts` 按线上形状返回讨论产物：每条 `artifact_meta` 行原样返回一个 `ArtifactMetaWire`，`role` 有源（D12-13 上传路由写入），返回真实值，不置空、不丢行。D12“第一版无来源字段”所列的 `datasets.artifacts[].role/verdict/contract（实验产物）`（`DEC/D12-lab-wire.md:641`）是视图字段，空值只在 WEB-04 投影层处理；服务端对此无动作，也不在 wire 上新加这些字段。<br>- `connectCluster` 返回 `{templates}`，只读。向导执行（P7）按 D8-16、D12 列 D9（`DEC/D12-lab-wire.md:645`），本切片不做。<br>- 各页 `panels` 按 D12-08“只选本人本页会话头”。<br><br>路径白名单是 D16-09 的 W-09 行，实际只改 `apps/web/src/server/lab/**`。不改 `protocol/lab/**`、`rpc/lab.ts`，不改 wire 形状。<br><br>切片只做本仓编译、类型检查和基础检查（C1-3、D16-13）。跨组件结果在 Pepgent#30 与阶段 C 统一验收。<br><br>本行通过后：<br>- 总协调席在 Pepgent 新建 LAB-14 issue；<br>- 秘书在 D8 §4.2 切片表与 `D8-slice-issues.md` 加 LAB-14 一行（解锁 F09、F12、F27、F31；依赖 LAB-05、LAB-07a、LAB-10、LAB-11a、LAB-12、LAB-13、STO-08）；<br>- AreaMgrPepgent 在 Pepgent#29 登记 LAB-14 为这些入口的服务端承载，并送达 W-09。W-09 在 LAB-13（Pepgent#80）之后接着做。 | **得到：** F09、F12、F27、F31 的 S2 所需读取有了逐字承载，WEB-07 能接上真实数据，D9-02 能录到真实线数据。仍是一席一域，不扩白名单，不改 wire。<br>**代价：** D8 新增一个切片编号和一个 issue；W-09 的队列在 LAB-13 之后加一段。<br>**落选：**<br>- (a) 并入 LAB-13：LAB-13 的范围是 D42 逐行表决的结果，并入等于在 D42 之外扩大它。LAB-13 又是 #78 解除 BLOCKED 的前置，加量会拖长 P0 解阻路径。<br>- (b) 重开 LAB-11b、LAB-11a 或 LAB-12：它们已关闭，原文只承载草稿命令、讨论读取与 clusters。重开会改写已结案记录。<br>- (c) 交 W-10：越过 D16-09 白名单，`server/lab/**` 只归 W-09。<br>- (d) 列入 D9：违反 AGENTS.md:123，且 D12-08 已把三页定为第一版读取。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD44v2）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D44-02 v1 | lab.update、project 四命令、repo 四命令、agentTemplate.writeFile/removeFile 的承载切片 | 同 LAB-14；W-09；`apps/web/src/server/lab/**`；D12-10 命令与逐命令权限；D7-14 | LAB-14 同时承载以下 11 个命令，按 D12-10 的命令变体、逐 kind 结果与逐命令权限实施：<br>- `lab.update`：要求 `organization: update`，写 Better Auth organization 与 `lab_profile`。Lab 仍只由部署 seed 创建，没有 `lab.create`。<br>- `project.create`、`project.rename`、`project.merge`、`project.archive`：要求 `write`。merge 把讨论和实验的归属改到目标项目，archive 改状态（D7-14）。<br>- `repo.connect`、`repo.sync`、`repo.rotate`、`repo.disconnect`：要求 `editLibrary`。<br>  - `library_repo` 记远端、分支和密钥引用；<br>  - Lab 生成并持有私钥，结果只给公钥；<br>  - rotate 重新生成密钥（D7-14）。<br>- `agentTemplate.writeFile`、`agentTemplate.removeFile`：要求 `editLibrary`，且操作者是该 Panel 会话的 owner。写入或删除的是该 agents Panel 会话 worktree 的 `.omp/agents/**`（D12-10）。这个 Panel 会话由 LAB-13 的 `panel.prompt` 新建，所以 LAB-14 依赖 LAB-13。<br><br>契约内的私有代码结构由工程师决定。<br><br>路径白名单、检查方式、新建 issue、回写与送达都同本议程第 1 行。 | **得到：** 设置页与 Lab 信息的第一版命令有了承载，WEB-07 的设置页能接上真实写入。<br>**代价：** LAB-14 范围变大。<br>**落选：**<br>- (a) 并入 LAB-13：理由同第 1 行 (a)。<br>- (b) 重开 LAB-03 或 LAB-10：LAB-03 正文明写不引入业务命令，LAB-10 原文只承载 `library.stage/apply`。<br>- (c) 列入 D9：D12-10 的 D9 排除清单不含这些命令，D8-16 清单也不含，且违反 AGENTS.md:123。D12-10 已按 D8-16 写明命令联合中列 D9 的部分，D42-02 也以同样依据承载了 F 流程未逐字使用的命令。<br>- (d) 各命令分别开 issue：同一席同一域，徒增仪式（U83）。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD44）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D44-03 v1 | discussion 四命令、panel.model、experiment.update、milestone 两命令的承载切片 | 同 LAB-14；W-09；`apps/web/src/server/lab/**`；D12-10 命令与逐命令权限；D7-07、D7-15 | LAB-14 同时承载以下 8 个命令，按 D12-10 的命令变体、逐 kind 结果与逐命令权限实施：<br>- `discussion.bind`、`discussion.rename`、`discussion.move`、`discussion.archive`：要求 `write`，且操作者是该讨论的 owner。<br>  - bind 写 `discussion_binding`，即讨论的 `bound` 运行（D7-07）；<br>  - rename、move、archive 改 `Discussion{name, project, archived}`。<br>- `panel.model`：要求 `write`，且操作者是该会话的 owner。在该会话自己的那一代上发 `set_model{provider, modelId}`；会话已停驻时，按 D7-04 先开新的一代（D7-15）。<br>- `experiment.update`：要求 `write`，且操作者是该运行的会话 owner。改运行的名称与项目（D7 字段表 `experiments`）。<br>- `milestone.create`、`milestone.complete`：要求 `write`，写 `milestone` 表。D42-01 的 `home.milestones` 会读出这些行。<br><br>契约内的私有代码结构由工程师决定。<br><br>路径白名单、检查方式、新建 issue、回写与送达都同本议程第 1 行。 | **得到：** 讨论页、实验、模型切换与首页里程碑的第一版命令有了承载，D12-10 的命令联合中不再有返回 `not_supported` 的第一版变体。<br>**代价：** LAB-14 范围变大。<br>**落选：**<br>- (a) 并入 LAB-13：理由同第 1 行 (a)。<br>- (b) 重开 LAB-11a 或 LAB-11b：它们已关闭，原文只承载 `discussion.load` 与附件、草稿与启动命令。<br>- (c) 列入 D9：理由同第 2 行 (c)。<br>- (d) 另开切片：同一席同一域，徒增仪式（U83）。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD44）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

- D44-01 v2（DeskD44Revise，2026-11-01T21:58:26.799Z）：# D44-01 v2 修订理由（发起席 Coordination，DeskD44Revise）

## 反例核对：LeadMentor 反例成立

LeadMentor-2 的反例题为“不能把讨论产物的有源 role 按实验视图缺源规则置空”。逐项核对如下，均成立：

- **wire 形状。**
  - `datasets.artifacts` 的类型是 `z.array(ArtifactMetaWireSchema)`（Pepgent main `apps/web/src/protocol/lab/pages.ts:185-186`）。
  - `ArtifactMetaWire.role` 是必填的 `ArtifactRoleSchema` 枚举（`raw/figure/log/verdict/metadata/report/conclusion/draft/analysis/todo`），不能为空；该类型没有 `verdict`、`contract` 字段（`rows.ts:192-216`）。
  - D12 的线类型与此一致（`DEC/D12-lab-wire.md:185-186,392-395`）。
- **role 有源。**
  - 上传路由以 `role: ArtifactRole` 为输入，返回 `ArtifactMetaWire`（`DEC/D12-lab-wire.md:597`，D12-13）。
  - 覆盖表把讨论产物的 `artifacts[].role` 记为类 A，来源是 `ArtifactMetaWire.role`（`DEC/D12-coverage.md:316`）。
- **缺源规则管的是另一层。** “第一版无来源字段”一节的表头是“视图字段（web/client/contracts）”，该行原文限定“`datasets.artifacts[].role/verdict/contract`（实验产物）”，缺的是产物契约与判据（D10-11(b)）（`DEC/D12-lab-wire.md:630,632,634,641`）。它只约束 WEB-04 投影层，不约束服务端返回的讨论产物。

v1 写“`artifacts[].role/verdict/contract` 按 D12‘第一版无来源字段’取精确空值”，既去掉了“实验产物”的限定，又把视图层规则放到了服务端。照字面执行，合法上传的 `role=raw` 讨论产物要么违反必填枚举，要么被丢掉。ClaudeHighD44 选票的修正 (ii) 指的是同一处错误。

## v2 改了什么

1. **datasets 的 `artifacts` 一句（消除反例）。** 改为：服务端按线上形状，原样返回每条讨论产物的 `ArtifactMetaWire`，`role` 返回真实值，不置空、不丢行。实验产物视图的 `role/verdict/contract` 空值只在 WEB-04 投影层处理，服务端无动作，也不在 wire 上新加字段。
2. **依赖列补 STO-08（ClaudeHigh 修正 (i)）。**
   - `valueRuns` 直接调用 store 的 `GET /values/{hash}/runs`，这条路由属于 STO-08（`DEC/D8-mvp-scope.md:254`）。LAB-05、07a、10、11a、12、13 的传递依赖都不含 STO-08。
   - STO-08 已在 soroi main 上，不构成等待。
3. **行号（ClaudeHigh 修正 (iii)）。**
   - 行内引用改为 `DEC/D12-lab-wire.md:641`（实验产物字段）和 `:645`（connectCluster 的 P7 字段）。
   - 议程事实段写的 `:625,636,640` 不准确，应读作 `:641,645`。事实段由 daemon 维护、不能手改，初审材料已同步更正。

其余部分逐字未改：what、where、flowEditor、connectCluster、panels、白名单、检查方式、回写与送达、取舍、分类和 domains。LAB-14 的范围不变，不改 wire，也不放宽 `ArtifactRoleSchema`。


## 原票

各席原票见 `votes/D44-Coordination.md`、`votes/D44-ClaudeHigh.md`、`votes/D44-Argon.md`、`votes/D44-LeadMentor.md`、`votes/D44-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。