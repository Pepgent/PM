# Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的初审与承载议程草案

- **来由：** [D42（PM#61）](https://github.com/Pepgent/PM/issues/61) 初审材料 [`pepgent78-lab-entry-ownership.md`](pepgent78-lab-entry-ownership.md) 第五节第 1 项。该项列出的入口不在 Pepgent#78 BLOCKED 的主路径上，当时没有并入 P0 议程。闸门 A（[`pepgent78-lab-entry-ownership-gate-a.md`](pepgent78-lab-entry-ownership-gate-a.md) 第二节）已提示这些入口“同样严禁移入 D9”，需要另行安排承载。
- **编制：** governance-desk 实例 `DeskLabEntryBatch2`，属总协调席，与 Main 合计 1 票。下文的类别是起草者的初分，不是裁决。
- **程序：** 闸门 A 由 `Argon` 判定，闸门 B 由 `ArgonGovernance` 判定（`SOR/AGENTS.md:60`，C2-2）。本批没有 BLOCKED，草案按 P1 起草；如果闸门 B 判定另一级别，以闸门 B 为准。

来源标记：
- `(U)`：用户原话。
- `(D)`：文档或源码原文。
- `(R)`：本实例运行命令得到的输出。
- `(A)`：agent 的说法，只作解释。

本实例只读了决策文件、issue 和 main 源码。没有运行构建或测试，没有读 git 历史或 session，也没有触碰 Pepgent 根 checkout。

源码基线：2026-11-01T21:43Z 用 `gh api repos/Pepgent/Pepgent/tarball/main` 取得 Pepgent main 快照，解到 `/tmp/labentry2/src/`，只读。同一时刻还取得 Pepgent 全部 40 个 issue（含已关闭）的正文与评论，快照在 `/tmp/labentry2/issues/`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `pepgent-pm/evidence/decisions/`
- `W/` = Pepgent main 的 `apps/web/src/`
- `S/` = `W/server/lab/`
- `P/` = `W/protocol/lab/`

---

## 一、事实

| # | 事实 | 来源 |
|---|---|---|
| G-1 | `readPage` 中，`home`、`flowEditor`、`datasets`、`connectCluster`、`containers`、`settings` 六页都落到 `return notSupported(\`lab.page.read:${input.page}\`)`。其中 `home`、`containers`、`settings` 已由 D42-01 划给 LAB-13，本批只剩 `flowEditor`、`datasets`、`connectCluster`。 | (R) `S/operations.ts:259-265`；(D) `DEC/D42-lab-entry-ownership.md` |
| G-2 | `runCommand` 中有 26 个命令落到 `return notSupported(\`lab.command:${command.kind}\`)`。D42 已承载其中 7 个：`member.invite/role/quota/remove`、`agentTemplate.saveVersion`、`conclusion.confirm`、`panel.prompt`。本批是剩下的 19 个：<br>- `lab.update`；<br>- `project.create/rename/merge/archive`；<br>- `repo.connect/sync/rotate/disconnect`；<br>- `agentTemplate.writeFile/removeFile`；<br>- `discussion.bind/rename/move/archive`；<br>- `panel.model`；<br>- `experiment.update`；<br>- `milestone.create/complete`。<br>D42 初审 F-2 写作“24 个”，闸门 A 第二节写作“16 个命令”，两处都是计数笔误；按源码逐行数，合计 26 个，本批 19 个。 | (R) `S/operations.ts:543-569` |
| G-3 | 本批入口在 wire 上已经齐全，不需要改 `protocol/lab/**`：<br>- 页面参数：`flowEditor` 为 `{draft}`，`datasets`、`connectCluster` 为 `NoParams`；<br>- 页面形状：`flowEditor={palette,templates,panels}`，`datasets={artifacts,contexts,references,objectSizes,valueRuns,volumes,templates,panels}`，`connectCluster={templates}`；<br>- 19 个命令的变体与逐 kind 结果都已定义。 | (R) `P/pages.ts:74,77,81,165,185-194,199`；`P/command.ts:56,63-73,80-83,92,98,120-127,137,142-151,156-159,162,168,187-188` |
| G-4 | 本批入口用到的 Lab 表都已在 schema 中：`lab_profile`、`project`、`conversation`、`discussion_binding`、`experiment_ext`、`milestone`、`deploy_key`、`library_repo`、`artifact_meta`、`discussion_context`。 | (R) `S/schema.ts:7,13,37,106,119,124,141,221,293,301` |
| G-5 | D7 字段表给出了本批各入口的读写方式：<br>- `labs`：写 `lab.update`；<br>- `experiments`：改名或改项目用 `experiment.update`；<br>- `aiModels`：`panel.model` 调该代 `set_model`；<br>- `home`：写 `milestone.create/complete`；<br>- `flowEditor`：读 `readPage('flowEditor', {draft})`，palette 是节点库导出；<br>- `datasets`：读 `readPage('datasets')`，“实验产物契约列 D9”；<br>- `discussions`：写 `discussion.*`；<br>- `connectCluster`：读 `readPage('connectCluster')`，只读，“第一版无命令”，“P7 不在第一版，列入 D9”；<br>- `settings`：写 `project.*`、`repo.*`、`agentTemplate.writeFile/removeFile`。 | (D) `DEC/D7-lab-backend.md:89,93,94,95,98,101,102,104,106` |
| G-6 | D7-14 规定了设置页其余部分的语义：<br>- 项目 merge 把讨论和实验的归属改到目标项目，archive 改状态；<br>- `library_repo` 记远端、分支和密钥引用；<br>- Lab 生成并持有私钥，界面只显示公钥，rotate 重新生成。<br>D7-15 规定 `set_model{provider, modelId}` 发给该会话自己的那一代。D7-07 规定讨论的 `bound` 是人手动绑定的运行（`discussion_binding`）。 | (D) `DEC/D7-lab-backend.md:67,74,75` |
| G-7 | D12-08 定了三页的形状：<br>- `datasets={artifacts,contexts,references,objectSizes,valueRuns,volumes,templates,panels}`，“store File 来自目录图，卷为结束远程调用清单，valueRuns 读 store”；<br>- `connectCluster={templates}`，只读；<br>- 各页 `panels` 只选本人本页会话头。<br>D12-06 规定 `flowEditor.palette` 取库默认分支。 | (D) `DEC/D12-lab-wire.md:38,40` |
| G-8 | D12-10 是命令联合，“无兜底”。它的逐命令权限表对本批每个命令都写明了权限：<br>- `lab.update`：`organization: update`；<br>- `project.*`：`write`；<br>- `repo.*`：`editLibrary`；<br>- `agentTemplate.writeFile/removeFile`：`editLibrary`，且是该 Panel 会话的 owner；<br>- `discussion.bind/rename/move/archive`：`write`，且是该讨论的 owner；<br>- `panel.model`：`write`，且是该会话的 owner；<br>- `experiment.update`：`write`，且是该运行的会话 owner；<br>- `milestone.*`：`write`。<br>第一版不含、列入 D9 的只有：`image.build/template.bind`、`cluster.connect`、`sandbox.create`、`job.restart/destroy`、`shell`、预检查。这份清单不含 G-2 中的任何命令。 | (D) `DEC/D12-lab-wire.md:42,540-561` |
| G-9 | D12“第一版无来源字段”一节列 D9、投影留空的是“视图字段（web/client/contracts）”，与本批相关的是：<br>- `datasets.artifacts[].role/verdict/contract`（实验产物）：缺产物契约与判据；<br>- `connectCluster` 的安装日志、注册令牌、连接测试结果（P7）。<br>这一节约束的是 WEB-04/06 投影层，不约束服务端线形状。线上 `datasets.artifacts` 是讨论产物的 `ArtifactMetaWire[]`：`role` 是必填枚举，由上传路由写入，有源；没有 `verdict`、`contract` 字段。这一节也不含 `flowEditor`、`datasets`、`connectCluster` 三页读取本身。 | (D) `DEC/D12-lab-wire.md:630,634,641,645,185-186,597`；`DEC/D12-coverage.md:316`；(R) `P/pages.ts:185-186`、`P/rows.ts:192-216` |
| G-10 | D8-16 是“D2–D7 已定、但任何 F 流程都走不到的部分：不进 MVP 验收，原样列入 D9 输入”，正文有一句“只有 F 流程直接要用的才实现”。它的清单中有接入向导（P7），但没有 G-1、G-2 中的页面读取或命令。<br>D12-10 晚于 D8，由 D16-03 恢复。它按 D8-16 逐项写出了命令联合中列 D9 的部分（G-8），其余命令都是第一版命令。<br>D42-02 以同样的依据，把 F01–F31 中没有逐字使用的 `member.*`、`agentTemplate.saveVersion` 划给 LAB-13，已 5/5 通过。 | (D) `DEC/D8-mvp-scope.md:87`；`DEC/D12-lab-wire.md:42`；`DEC/D16-phaseB-review-restore.md:27`；`DEC/D42-lab-entry-ownership.md` |
| G-11 | D8 §4.2 的 LAB 切片表（LAB-01 至 LAB-12）没有一行写本批入口：<br>- LAB-11b 只写 `draft.save`、`experiment.start/approve`，不写 `flowEditor` 读取；<br>- LAB-11a 只写 `discussion.load` 与附件；<br>- LAB-12 只写 `page:'clusters'`。<br>D42 新建的 LAB-13 只承载 D42-01..03 列出的入口。 | (D) `DEC/D8-mvp-scope.md:321-334`；`DEC/D42-lab-entry-ownership.md` |
| G-12 | 在 Pepgent 全部 40 个 issue 的正文与评论中，本批入口都没有逐字承载。<br>提到它们的只有以下几处，都是记录缺口，不是承载：<br>- #73 正文记录“`flowEditor` 页的读取目前返回 `notSupported`”；<br>- #28 评论记录 `connectCluster` 读取返回 `not_supported`；<br>- #29 评论 6564277591 记录“这些都属于 W-09（server/lab），目前只有 #78 承载其中的 activity 与 P15 部分，没有找到其余部分的承载 issue”，并写明“不是 W-10 的 BLOCKED”。 | (R) `grep` 于 `/tmp/labentry2/issues/{b,c}*.md`；(A) [#29 评论 6564277591](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564277591) |
| G-13 | WEB-04（#27）与 WEB-06（#28）已关闭，投影已交付。WEB-07（#29）仍 open，负责把 13 页接到真实读取和命令。W-10 写明：服务端返回 `not_supported` 时，页面按 `OperationFailure` 显示，不回退到 fixture；#30 浏览器验收时这些页面与命令能否走通，要看 W-09 是否交付。 | (R) `gh issue list`；(A) #29 评论 6564277591 |
| G-14 | F 流程逐字要求以下读取：<br>- F09 S2：“数据集页按运行列出产物”；<br>- F12 S2：“数据集页显示‘被引用于’的运行”；<br>- F27 S2：“流程编辑器保存草稿后，`lab.sqlite` 的 `draft` 表有这一行”；<br>- F31 ⑥：“运行结束后，数据集页出现产物及来源”，F31 的切片列为“全部 LAB、WEB、DEP”。<br>WEB-04 解锁 F09、F12、F27；WEB-06 解锁 F17、F31。 | (D) `DEC/D8-mvp-scope.md:128,131,146,150,338,340` |
| G-15 | D9-01 以 SNAP 的 18 个顶层字段为根，其中包括 `labs`、`projects`、`home`、`flowEditor`、`datasets`、`connectCluster`、`settings`。D9-02 依据 WEB-03..06 的投影源码和录制的线数据做叶子来源分类。 | (D) `DEC/D8-mvp-scope.md:413,420` |
| G-16 | 禁令原文：“接口或权限表缺少某项不构成授权：禁止据此……把功能移入 D9。” | (D) `SOR/AGENTS.md:123` |
| G-17 | D1-12 的优先级：“`P0`（关键路径工程 `BLOCKED` 解阻）→ `P1`（产品全景/跨组件接缝金丝雀纠偏）→ `P2`（PM 错误路径清理）→ `P3`（`omomp` 工作流提效方针）”。C1-3 设开发期接缝纠偏，是为了防止跨组件错配“潜伏……直到阶段 C 才集中爆发”，发现即发起 P1。 | (D) `SOR/AGENTS.md:26,45` |
| G-18 | W-09 当前在 `/Users/mouriya/Ext/worktrees/pepgent-lab-78` 承载 #78。D42 新建的 LAB-13 已由总协调席建为 [Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)。 | (A) Main 派活 brief；(D) 闸门 B 材料 `lab-entry-batch2-gate-b.md` |

## 二、逐项归属表

| 入口 | 现有承载 | 依据 | 涉及的 F 流程与下游 |
|---|---|---|---|
| `lab.page.read` `flowEditor` | **无** | G-1、G-3、G-5、G-7、G-11、G-12 | F27 S2（流程编辑器保存草稿，G-14）；WEB-04 投影、WEB-07 真实数据；D9-01 `flowEditor` 字段 |
| `lab.page.read` `datasets` | **无** | G-1、G-3、G-5、G-7、G-9、G-11、G-12 | F09 S2、F12 S2、F31 ⑥（G-14）；WEB-04、WEB-07；D9-01 `datasets` 字段。服务端原样返回讨论产物的 `ArtifactMetaWire`，`role` 返回真实值；实验产物视图的 `role/verdict/contract` 按 G-9 只在 WEB-04 投影层留空 |
| `lab.page.read` `connectCluster` | **无** | G-1、G-3、G-5、G-7、G-9、G-12 | WEB-06（解锁 F17、F31）、WEB-07；D9-01/02 需要它的录制线数据（G-15）。向导执行（P7）按 G-9、G-10 列 D9，不在本批 |
| `lab.update` | **无** | G-2、G-5、G-8 | F01–F31 中没有一行逐字使用；D12-10 第一版命令，不在 D9 排除清单（G-8），不得据缺项移入 D9（G-16）。WEB-07；D9-01 `labs` 字段 |
| `project.create/rename/merge/archive` | **无** | G-2、G-5、G-6、G-8 | 同上；设置页（WEB-06、WEB-07）；D9-01 `projects`、`settings` 字段 |
| `repo.connect/sync/rotate/disconnect` | **无** | G-2、G-4、G-5、G-6、G-8 | 同上；设置页 `repos`（D42-01 的 `settings` 读取会出线这些行） |
| `agentTemplate.writeFile/removeFile` | **无** | G-2、G-5、G-8 | 同上；设置页 agents Panel。操作者须是 agents Panel 会话的 owner，这个会话只能由 D42-03 的 `panel.prompt` 新建（D42 初审 F-9、F-10），所以依赖 LAB-13 |
| `discussion.bind/rename/move/archive` | **无**（LAB-11a 只写 `discussion.load`） | G-2、G-5、G-6、G-8、G-11 | 同上；讨论页（WEB-04、WEB-07） |
| `panel.model` | **无** | G-2、G-5、G-6、G-8 | 同上；任一会话的模型切换（D7-15） |
| `experiment.update` | **无** | G-2、G-5、G-8 | 同上；实验改名或改项目 |
| `milestone.create/complete` | **无** | G-2、G-4、G-5、G-8 | 同上；首页 `milestones`（WEB-06、WEB-07；D42-01 的 `home` 读取会出线这些行） |

## 三、初审结论（起草者初分，K4：缺派工归属）

- **不缺契约：** 本批入口的形状、语义与权限都已由 D7、D12-06/08/10 定案，wire 齐全（G-3），表也都已建好（G-4）。
- **缺的是承载切片与派工归属：** D8 切片表、D42 和全部 issue 都没有逐字承载（G-11、G-12）。按 `SOR/AGENTS.md`，“尚未定案的范围或派工归属必须经表决，或有逐字依据”，所以不能由治理承接者或 Main 单方补派。
- **不得移入 D9：** D12-10 的 D9 排除清单与 D8-16 清单都不含本批入口（G-8、G-10）。只有 G-9 列出的视图字段在投影层留空，服务端不为它们做任何事。禁令 G-16 不允许据缺项移入 D9。
- **优先级草拟 P1，不报 P0：** 没有工人为这批入口报 BLOCKED，W-10 明写“不是 W-10 的 BLOCKED”（G-12），所以不符合 P0“关键路径工程 `BLOCKED` 解阻”。但它是 W-10 的 WEB-07 页面接线与 W-09 的服务端入口之间的接缝缺口。不补，F09、F12、F27、F31 的 S2 会到阶段 C 才失败（G-13、G-14）。这正是 C1-3 要提前纠偏的情形，符合 P1“接缝纠偏”（G-17）。它也不属于 P2：要补的是工程承载，不是删改 PM 中的错误条文。

### 切片取舍：另开 LAB-14，不并入 LAB-13

- **不并入 LAB-13 的理由：**
  - D42 已定案，LAB-13 的范围是 D42-01..03 逐行表决的结果。并入要改已定案的承载范围，等于在 D42 之外扩大它。
  - LAB-13 是 #78 的前置：#78 要等 LAB-13 合入 main 才能解除 BLOCKED 第一类（D42-01）。把本批 3 页读取和 19 个命令塞进去，会拖长 P0 解阻路径，与 D1-12 只用 P0 处理关键路径解阻的本意相反。
  - 两批的优先级不同（P0 与 P1），分开立案才能按 daemon 队列各自排序。
- **另开一个 LAB-14，不按页面拆成多个切片：** 同一席位（W-09）、同一路径域，拆成多个 issue 徒增仪式（U83，C1-3 允许同域关联切片合并提交）。
- **LAB-14 依赖 LAB-13：** `agentTemplate.writeFile/removeFile` 要求操作者是 agents Panel 会话的 owner，而这个会话只能由 LAB-13 的 `panel.prompt` 新建。W-09 是同一席位，按 LAB-13 → LAB-14 顺序做即可。这个依赖不是开工锁，也不要求跨组件 runtime 证据（`SOR/AGENTS.md:128`）。

## 四、承载议程（两道闸门判定后已按 P1 立案为 [D44（PM#63）](https://github.com/Pepgent/PM/issues/63)）

- **闸门 A（Argon-2）：** [`lab-entry-batch2-gate-a.md`](lab-entry-batch2-gate-a.md)。判定不改已定公开契约；三行划归 LAB-14、不并入 LAB-13、不列 D9、不拆碎 issue，在产品意图与切片取舍上都成立；同意按 P1 立案。
- **闸门 B（ArgonGovernance-2）：** [`lab-entry-batch2-gate-b.md`](lab-entry-batch2-gate-b.md)。判定不越白名单与阶段门禁；属尚未定案的切片归属（K4），必须表决；非 BLOCKED 的跨席位接缝纠偏，定级 P1 成立；三行 `domains: [governance]`，5 席参投；另开 LAB-14、依赖 LAB-13 合规。


```yaml
title: Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的承载切片 LAB-14
slug: lab-entry-batch2
priority: P1
rows:
  - D-01 flowEditor、datasets、connectCluster 三页读取 → 新切片 LAB-14（W-09，apps/web/src/server/lab/**）
  - D-02 lab.update、project.*、repo.*、agentTemplate.writeFile/removeFile → LAB-14
  - D-03 discussion.bind/rename/move/archive、panel.model、experiment.update、milestone.create/complete → LAB-14
```

完整行文见同目录 [`lab-entry-batch2-proposal.yaml`](lab-entry-batch2-proposal.yaml)。立案后以议会 daemon 发布的 decision issue 正文为准。

## 五、表决中的反例处置

- **结果：** D44-02 v1、D44-03 v1 都以 5/5 通过。D44-01 v1 被 LeadMentor 反例阻断，反例题为“不能把讨论产物的有源 role 按实验视图缺源规则置空”（见 [PM#63 LeadMentor-2 选票](https://github.com/Pepgent/PM/issues/63#issuecomment-6564428305)）。ClaudeHighD44 选票的修正 (ii) 指出的是同一处错误。
- **核对：反例成立。**
  - v1 写“`artifacts[].role/verdict/contract` 按 D12‘第一版无来源字段’取精确空值”。这句去掉了原文“实验产物”的限定，又把视图层的留空规则放到了服务端。
  - 线上 `datasets.artifacts` 是讨论产物的 `ArtifactMetaWire[]`，`role` 是必填枚举且有源，没有 `verdict`、`contract` 字段（更正后的 G-9）。照 v1 的字面执行，合法上传的 `role=raw` 讨论产物要么违反必填枚举，要么被丢掉。
- **处置：** 发起席（`DeskD44Revise`）用 `council revise D44-01` 立了 v2，v1 的票全部作废，5 席重投。v2 相对 v1 只改三处：
  - `artifacts` 一句改为：服务端按线上形状原样返回讨论产物的 `ArtifactMetaWire`，`role` 返回真实值，不置空、不丢行；实验产物视图的 `role/verdict/contract` 只在 WEB-04 投影层留空，服务端无动作，wire 上不新加字段。
  - 依赖列补 STO-08。`valueRuns` 直接调用 STO-08 的 `GET /values/{hash}/runs`（`DEC/D8-mvp-scope.md:254`），该路由已在 soroi main 上，不构成等待。
  - 行号改为 `DEC/D12-lab-wire.md:641,645`。议程事实段由 daemon 维护，其中的 `:625,636,640` 应读作 `:641,645`。本材料的 G-9 已更正。
- 除这三处外，what、where、其余 how、取舍、分类和 domains 都与 v1 相同。修订理由全文已随 revise 提交，由 daemon 记录在 PM#63。
