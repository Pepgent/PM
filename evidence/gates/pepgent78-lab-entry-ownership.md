# Pepgent#78 BLOCKED 一类：Lab 入口无切片承载的初审与归属议程草案

- **issue：** [Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)，工人 W-09 `pepgent-lab`，承载 D38-02 v2 与 D38-03 v1 的服务端部分。
- **BLOCKED：** [issuecomment-6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088)。本材料只处理其中“一、入口未实现”。“二、`library.merge`、`library.apply` 与‘同一事务’原文的冲突”不在本材料范围。
- **编制：** governance-desk 实例 `DeskLabEntryOwnership`，属总协调席，与 Main 合计 1 票。下文的类别是起草者的初分，不是裁决。
- **程序：** 闸门 A 由 `Argon` 判定，闸门 B 由 `ArgonGovernance` 判定（`SOR/AGENTS.md:60`，C2-2）。任一道闸门判定越界，就按 P0 立案表决。

来源标记：
- `(U)`：用户原话。
- `(D)`：文档或源码原文。
- `(R)`：本实例运行命令得到的输出。
- `(A)`：agent 的说法，只作解释。工人和片区的评论都属于 `(A)`。

本实例只读决策文件、issue 和 main 源码，没有运行构建或测试，没有读 git 历史或 session，也没有触碰 Pepgent 根 checkout。

源码基线：2026-11-01T21:01Z 用 `gh api repos/Pepgent/Pepgent/tarball/main` 取得 Pepgent main 快照，解到 `/tmp/labentry/src/`，只读。

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
| F-1 | `readPage` 中，`home`、`flowEditor`、`datasets`、`connectCluster`、`containers`、`settings` 六页都落到 `return notSupported(\`lab.page.read:${input.page}\`)`。文件头注释：“Each page and command kind is served by the slice that implements it; until then the operation answers a typed not_supported”。 | (R) `S/operations.ts:1-2,259-265` |
| F-2 | `runCommand` 中有 24 个命令落到 `return notSupported(\`lab.command:${command.kind}\`)`：`lab.update`、`member.invite/role/quota/remove`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile/saveVersion`、`discussion.bind/rename/move/archive`、`conclusion.confirm`、`panel.prompt`、`panel.model`、`experiment.update`、`milestone.create/complete`。 | (R) `S/operations.ts:543-569` |
| F-3 | `S/**` 中没有 `ImageDefinition` 或 images 检出的导出代码。 | (R) `grep -rn ImageDefinition S/` 无命中 |
| F-4 | 上述页面与命令在 wire 上已经齐全，不需要改 `protocol/lab/**`：<br>- 页面参数：`home`/`containers`/`settings` 用 `NoParamsSchema`；<br>- 页面形状：`home`、`containers`（`images: ImageDefinitionSchema[]`）、`settings` 都已定义；<br>- 命令变体：`member.*`、`agentTemplate.saveVersion`、`conclusion.confirm` 都已定义；<br>- 命令结果：`invited`、`Done`、`merged`。 | (R) `P/pages.ts:59,82,84,95-109,139,200-207`；`P/command.ts:58-62,75,84,138-141,152,160` |
| F-5 | D8 §4.2 的 LAB 切片表共 14 行：LAB-01 至 LAB-12，其中 07、11 各拆为 a、b。<br>- 写明页面读取的只有三行：LAB-07a“catalog 与实验页”，LAB-12“`page:'clusters'`”，LAB-10“节点库”。<br>- 写明命令的有：LAB-04 `discussion.create/prompt`；LAB-08 `intervene.*`、`run.abort`、`human.irc`；LAB-09 自动化；LAB-10 `library.stage/apply`；LAB-11a `discussion.load`；LAB-11b `draft.save`、`experiment.start/approve`。<br>- 没有任何一行写 `home`、`containers`、`settings`、P15、`member.*`、`conclusion.confirm`、`agentTemplate.*` 或 `panel.*`。 | (D) `DEC/D8-mvp-scope.md:321-334` |
| F-6 | D7 字段表给出各页的读写入口：<br>- `home`：读 `readPage('home')`，写 `milestone.create/complete`、`panel.prompt`；<br>- `containers`：读 `readPage('containers')`，第一版无命令；<br>- `settings`：读 `readPage('settings', {})`，写 `member.*`、`project.*`、`repo.*`、`agentTemplate.writeFile/removeFile/saveVersion`；<br>- `discussions`：写 `discussion.*`、`conclusion.confirm`。<br>这张表没有切片列。 | (D) `DEC/D7-lab-backend.md:87,95,102,105,106` |
| F-7 | D12-08 定义了 `containers={images,templates,jobs,definitions,panels}`，其中“images 按 P15 从检出导出含文本”。还定义了 `settings={members,roles,invitations,repos,repoActivity,library,agentTemplates,ompVersion,discussionActivity,panels}` 和 `home={reports,activity,milestones,templates,jobs,discussionActivity,panels}`。P15 是占位：“Lab 能从 images 检出读出每个镜像的 `ImageDefinition`……假定能工作”。 | (D) `DEC/D12-lab-wire.md:40,654` |
| F-8 | D12-10 规定命令联合“无兜底”，并逐一列出第一版不含、列入 D9 的命令：`image.build/template.bind`、`cluster.connect`、`sandbox.create`、`job.restart/destroy`、`shell`、预检查。这份清单不含 F-2 中的任何命令。 | (D) `DEC/D12-lab-wire.md:42` |
| F-9 | D12 规定了 Panel 会话的新建方式和保存版本的前提：<br>- `panel.prompt` 的权限是：“`write`；Panel 会话不存在时以操作者为 owner 新建，存在时须是其 owner”；<br>- `agentTemplate.saveVersion` 要求 `editLibrary`，且操作者是“该 Panel 会话的 owner”；<br>- saveVersion 等于对 `.omp/agents/<id>` 路径做 `library.merge`。 | (D) `DEC/D12-lab-wire.md:42,447,544,549` |
| F-10 | main 上除 `panel.prompt` 外，没有任何新建 Panel 会话的代码：`originKind 'Panel'` 只出现在读取、校验和 schema 中。同时，`library.apply` 要求“the node library Panel conversation”。 | (R) `grep -rn "'Panel'" S/` 命中 `experiments.ts:76`、`library.ts:317`、`operations.ts:31`、`overlay.ts:47`、`schema.ts:42,65`、`wire.ts:36-38`，都不是新建 |
| F-11 | D38-02 v2：八个命令成功落库时，在同一事务写一行 activity。`home.activity` 返回本 Lab 的全部行；`settings.repoActivity` 只返回节点合入族的行。<br>D38-03 v1：`ImageDefinition.name` 取发布时的 OCI repository 路径，导出“沿用 P15 占位，假定能工作”。 | (D) `DEC/D38-pepgent-28-web06-cluster-activity-image.md`；#78 正文 |
| F-12 | #78 正文“依赖关系”：“D38 只规定这些入口成功时的 activity 写入、两个读取字段与 `name` 的取值，不规定入口本身的实现。实施时若当前 `origin/main` 仍是这样，W-09……报 `BLOCKED`，不自行扩大范围。” | (D) #78 正文 |
| F-13 | W-09 已在 #78 报 BLOCKED。其“一、入口未实现”列出六个命令、`home`/`settings` 读取和 P15 导出（含 `containers` 读取），等待对象是“Main 另派的入口承载”。 | (A) [#78 评论 6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) |
| F-14 | LAB-03 已关闭，其验收写明：“catalog/commands 仍按其真实实现返回 `not_supported`；本切片不引入……业务审批命令”。 | (D) [Pepgent#12](https://github.com/Pepgent/Pepgent/issues/12) 正文 |
| F-15 | 秘书在各 LAB/WEB issue 中按 D16-06④ 发过“契约以 D12 为准”的评论，列出“D12-08：讨论、数据集、算力、容器、设置、首页”。这些评论只标出各切片要参照的 D12 行，分配不到具体页面：<br>- LAB-12（[#11](https://github.com/Pepgent/Pepgent/issues/11#issuecomment-6558364526)）、LAB-07b（[#20](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6558363183)）、LAB-11a（[#22](https://github.com/Pepgent/Pepgent/issues/22#issuecomment-6558364060)）引用的是同一行标题；<br>- 这些切片的 D8 正文分别只承载 clusters、在途叠加层、讨论读取。 | (D) 各评论原文；`DEC/D8-mvp-scope.md:328,332,334` |
| F-16 | 在 WEB-06 上，W-10 说明：“home、settings、containers、connectCluster 的服务端读取目前返回 `not_supported`……这不阻塞 WEB-06 的纯投影，但页面要接上真实数据，还需要 W-09 实现这几个读取。” | (A) [#28 评论 6563665330](https://github.com/Pepgent/Pepgent/issues/28#issuecomment-6563665330) |
| F-17 | WEB-06 的验收是“同 WEB-03”。WEB-03 的验收原文：“纯函数投影的单元测试，输入是真实录制的线数据”。WEB-06 解锁 F17、F31。 | (D) `DEC/D8-mvp-scope.md:337,340` |
| F-18 | F31 的切片列是“全部 LAB、WEB、DEP”。D9-02 的叶子来源分类规则是“依据 WEB-03 至 WEB-06 的投影源码和录制的线数据”。 | (D) `DEC/D8-mvp-scope.md:150,420` |
| F-19 | F30 S2 要求“结论写回关联讨论”，F31 ⑥ 要求“A-01 的复盘写回原讨论”。`lab_draft_conclusion` 建的是“待确认结论”。LAB-09 的落点处置写明结论记在原讨论下，“由讨论 owner 确认”。 | (D) `DEC/D8-mvp-scope.md:149,150`；`DEC/D7-lab-backend.md:65`；(A) [#19 处置表](https://github.com/Pepgent/Pepgent/issues/19)；`pepgent-pm/evidence/gates/pepgent-19.md:278` |
| F-20 | F29 S2 要求“`library.apply` 生成 commit，并把检出快进”。 | (D) `DEC/D8-mvp-scope.md:148` |
| F-21 | 禁令原文：“接口或权限表缺少某项不构成授权：禁止据此……把功能移入 D9。” | (D) `SOR/AGENTS.md:123` |

全量核对的范围：
- 决策正文：D7、D8 切片表与 D8-16、D8-slice-issues、D10、D12（含 D12-coverage）、D16-09/10/13、D20、D30、D31、D35、D36、D38、D40。
- Pepgent 的全部 40 个 issue（含已关闭）的正文与评论，原文快照在 `/tmp/labentry/i*.md`。

核对结果：本材料列出的入口，在上述正文与 issue 中都没有逐字的切片承载。

## 二、逐项归属表

| 入口 | 现有承载 | 依据 | 涉及的 F 流程 |
|---|---|---|---|
| `lab.page.read` `home` | **无** | F-1、F-5、F-6；D12-08 只定形状（F-7） | 首页由 WEB-06 投影，WEB-06 解锁 F17、F31（F-17），F31 的 S2 全链路含全部 LAB/WEB（F-18）。F32/D9-02 需要它的录制线数据（F-18）。#78 结果 3 的 `home.activity` 取自本页 |
| `lab.page.read` `containers` | **无** | F-1、F-5、F-6、F-7 | 同上（WEB-06 → F31；F32）。#78 结果 5 的 `ImageDefinition.name` 由本页的 `images` 出线 |
| `lab.page.read` `settings` | **无** | F-1、F-5、F-6、F-7 | 同上（WEB-06 → F31；F32）。#78 结果 4 的 `settings.repoActivity` 取自本页 |
| P15 导出（`containers.images`） | **无**（D7-13、D12:654 只定占位与 `name` 取值） | F-3、F-7、F-11 | 随容器页走 F31、F32 |
| `member.invite`、`member.role`、`member.quota`、`member.remove` | **无**。LAB-03 明确不含业务命令（F-14） | F-2、F-5、F-6、F-8、F-14 | F01–F31 中没有一行逐字使用。它们属于 D12-10 第一版命令，不在 D9 排除清单内（F-8），不得据缺项移入 D9（F-21）。D38-02 v2 以它们成功落库为写 activity 的前提（F-11） |
| `conclusion.confirm` | **无** | F-2、F-5、F-6 | F30 S2、F31 ⑥ 产出待确认结论，确认由讨论 owner 执行（F-19）。D38-02 v2 的结论事件以此为前提 |
| `agentTemplate.saveVersion` | **无** | F-2、F-5、F-6、F-9 | F01–F31 中没有一行逐字使用。它属于 D12-10 第一版设置页命令（F-6、F-8）。D38-02 v2 的节点合入族包含它 |
| 附：`panel.prompt` | **无** | F-2、F-9、F-10 | 它是新建 Panel 会话的唯一入口（F-9），main 上没有别的新建路径（F-10）。`library.apply` 需要 nodes Panel 会话，所以 F29 S2（F-20）和 #78 中 `library.apply` 的 activity 都要先有它。`agentTemplate.saveVersion` 需要 agents Panel 会话（F-9），也要先有它 |

## 三、初审结论（起草者初分，K4：缺派工归属）

- 上述入口的行为契约都已由 D7、D12 定案，wire 齐全（F-4），所以不缺契约。
- 缺的是**承载切片与派工归属**：D8 切片表和全部 issue 都没有逐字承载（F-5、F-14、F-15）。
- `SOR/AGENTS.md` 规定：“尚未定案的范围或派工归属必须经表决，或有逐字依据”。所以这件事不能由治理承接者或 Main 单方补派。
- W-09 已在 #78 报 BLOCKED 等待承载（F-13）。按 D1-12，“`P0`（关键路径工程 `BLOCKED` 解阻）”，本议程报 P0。
- **P0 理由：** #78 的预期结果 1（八个命令中的六个）、3、4、5，在 main 上没有可落地的入口。#78 正文自己写明这种情形报 BLOCKED（F-12）。另外，`library.apply` 的 activity 因缺 Panel 会话新建入口在主路径上不可达（F-10）。所以 #78 的主路径整体卡住。#28 WEB-06 的验收要求“真实录制的线数据”（F-17），三页读取未实现就无法录制。

## 四、归属议程（两道闸门判定须表决后已立案为 [D42（PM#61）](https://github.com/Pepgent/PM/issues/61)）

```yaml
title: Lab 首页、容器、设置三页读取、P15 导出与成员、结论、模板版本、Panel 新建命令的承载切片（解 Pepgent#78 BLOCKED）
slug: lab-entry-ownership
priority: P0
rows:
  - D-01 三页读取与 P15 导出 → 新切片 LAB-13（W-09，apps/web/src/server/lab/**）
  - D-02 member.invite/role/quota/remove、conclusion.confirm、agentTemplate.saveVersion → LAB-13
  - D-03 panel.prompt → LAB-13
```

完整行文见同目录 [`pepgent78-lab-entry-ownership-proposal.yaml`](pepgent78-lab-entry-ownership-proposal.yaml)；立案后以议会 daemon 发布的 decision issue 正文为准。

## 五、不在本议程的发现（报 Main，另行处置）

1. main 上还有一批 D12 第一版入口返回 `not_supported`，同样没有逐字的切片承载：
   - 页面读取：`flowEditor`、`datasets`、`connectCluster`；
   - 命令：`lab.update`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete`。

   依据见 F-1、F-2、F-5、F-8。受影响的 F 流程：
   - F09 S2“数据集页按运行列出产物”、F12 S2“数据集页显示被引用于”：都需要 `datasets` 读取（`DEC/D8-mvp-scope.md:128,131`）；
   - F27 S2“流程编辑器保存草稿”：需要 `flowEditor` 读取（`DEC/D8-mvp-scope.md:146`）；
   - WEB-04、WEB-06、WEB-07 的真实页面数据。

   这些入口不在 #78 BLOCKED 的主路径上，本实例不把它们并进 P0 议程。
2. #78 BLOCKED“二、`library.merge`/`library.apply` 与‘同一事务’原文冲突”需要另立闸门初审。它的解法可能修订 D38-02 v2，与本议程的承载问题正交。
