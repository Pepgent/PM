# soroi#250（E2E-13）W-08 登记的两项产品缺陷：sidecar 缺 `role`；批次提醒缺 `purpose` 组头

- **issue：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（F07/F19/F22 真实 S1 验收与自动驱动，OPEN），工人 W-08（`pepgent-e2e`）。
- **上报位置：** [评论 6562476097](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562476097)（2026-11-01T19:03:01Z）第 1、2 点。工人把它们标为“依赖 / 产品缺陷登记”，请管理层为产品 owner 建承载。这不是正式 `BLOCKED`：W-08 声明 spec 判据不降，也不阻塞当前驱动的编写，只会让阶段 C 的 F22 断言失败。同一评论另有三处消费者侧的修正（write 回执层级、RPC 子代无 `session_init`、CallReport 的 `agentId` 可选），工人已在 `e2e/**` 内自行修正，不在本材料范围内。
- **编制：** governance-desk 实例 `DeskW08DefectCarrier`（总协调席，与 Main 合计 1 票）。本文只整理事实，并为两道闸门列出待判问题。它不是裁决。
- **程序依据：** `AGENTS.md:60`（C2-2）的双闸门只适用于正式 `BLOCKED`，本项不是正式 `BLOCKED`，不在其范围内。按 `.omp/agents/argon-governance.md` 第 6 条，已通过契约与路径白名单内的常规开发不设事前审批，只做事后检查。因此本项按既定 owner 路由（D16-09）处理：直接在产品仓补承载 issue。本材料曾同时送交闸门 A 和闸门 B，两边的回复记在文末“处置结果”。

来源标记：`(U)` 用户原话；`(D)` 文档原文，包括决策正文和 `design/`；`(R)` 本实例运行命令或直读源码得到的事实；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读了代码，没有运行测试或服务。

路径简称：
- `SOROI/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`。本实例读取时，`HEAD` 与 `origin/main` 都是 `d1ed328`（R：`git fetch && git rev-parse HEAD origin/main`）。
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`

---

## 一、缺陷 1：启动配方（sidecar）缺 `role`

### 1.1 契约原文

| # | 事实 | 来源 |
|---|---|---|
| F1 | D5 §3.1 的 `LaunchRecipe`（sidecar `<id>.soroi.json`，“只在 spawn 时写，之后不变，不当状态读”）含 `readonly role: Role`。同文定义 `type Role = "Main" \| "LocalChild" \| "RemoteChild"`（`SOROI_ROLE`，D4-16）。 | (D) `DEC/D5-plugins-eval.md:163-175`（`role` 在 `:170`）、`:106` |
| F2 | D5 回写表要求 `subagent.md`“实现”节写明：“sidecar 含角色、放置、契约、`writesEval` 和批次”。 | (D) `DEC/D5-plugins-eval.md:383` |
| F3 | 设计现状：启动配方 `<id>.soroi.json` 含 `parentId`、`cwd`、`launch`、`role`（`Main \| LocalChild \| RemoteChild`）、`placement`、`contract` 等字段。 | (D) `SOROI/design/subagent.md:40` |
| F4 | SOR-12 的范围包括“角色闸门、`writesEval`、嵌套的 `soroi_task`、批次与 `purpose`、批次释放（D5:81-82、87）”，解锁 F19、F22。 | (D) `DEC/D8-mvp-scope.md:275` |

### 1.2 实现现状（soroi main `d1ed328`）

| # | 事实 | 来源 |
|---|---|---|
| F5 | `SidecarSchema` 是 `.strict()`，字段只有 `parentId`、`cwd`、`launch`、`placement`、`contract`、`writesEval`、`batch`，没有 `role`。 | (R) `SOROI/packages/omp-soroi/src/subagent/main/supervisor.ts:71-81` |
| F6 | `writeSidecar` 写出的对象同样只有这七个字段，不写 `role`。`readSpec` 用 strict schema 解析 sidecar。 | (R) `SOROI/packages/omp-soroi/src/subagent/main/supervisor.ts:1000-1010` |
| F7 | 子进程角色目前只经环境变量 `SOROI_ROLE = "LocalChild"` 传入，没有落进启动配方。 | (R) `SOROI/packages/omp-soroi/src/subagent/main/supervisor.ts:1030` |
| F8 | F22 spec 用 owner 的启动配方断言 worker 是 `LocalChild`、`report` 契约、`writesEval` 为真、批次 id 与 `purpose`、放置为 `central`；其中 `recipe.role` 读的就是 sidecar。 | (R) `SOROI/e2e/s1/f22.spec.ts:93` |

### 1.3 读码结论（`[INFERENCE]`，未运行）

- **C1：** D5 §3.1、D5 回写表和 `design/subagent.md:40` 都规定启动配方含 `role`（F1–F3）。实现中缺这个字段（F5、F6），属于对已通过契约的实现偏差，而不是契约缺口。补齐以后，`LaunchRecipe` 的形状与 D5 一致，不新增也不改变任何已规定的字段。
- **C2：** 这一项在 W-07 的路径域内：`packages/omp-soroi/**`（见 F15）。SOR-12（[soroi#211](https://github.com/Pepgent/soroi/issues/211)）已关闭（F16）。

## 二、缺陷 2：批次提醒没有以 `purpose` 为组头分组

### 2.1 契约原文

| # | 事实 | 来源 |
|---|---|---|
| F9 | D5-13 规定“每行写法”是 `名字 = 预览 ← fn(参数) @env`，并写明“批次产出按批次分组，组头是 `purpose`”。 | (D) `DEC/D5-plugins-eval.md:88` |
| F10 | D5 §3.5 的提醒示例中，组头一行是 `- 批次「比较五种退火算法在 2200°C 的曲线」（已全部正式运行）`，其下缩进列出该批的 atom 行。批次外的 atom 与组头同级。 | (D) `DEC/D5-plugins-eval.md:278-286`（组头在 `:283`） |
| F11 | 设计现状写明：批次释放后，“整批未消费输出连同 `purpose` 组头一起出现在发起者的提醒里”。 | (D) `SOROI/design/eval.md:221` |
| F12 | SOR-08 规定“格式/批次目的按 D5-13”。SOR-12 负责批次与 `purpose`、批次释放，验收包括“主 agent 的提醒里没有”未释放批次的产出。 | (D) `DEC/D8-mvp-scope.md:271`、`:275` |
| F13 | F22 ⑦：“读方看到末个 soroi_return 被接受后，下一候选提醒一次列全批产出、组头 purpose”。E2E-13 的范围也写明 F22 要检查 worker 批次屏障与批次目的。 | (D) `DEC/D8-mvp-scope.md:141`（⑦）、`:361` |
| F14 | D11-37 规定提醒的注入点和记录：`addBeforeModelCall`、obfuscator，条目数据只有 `{ text }`。它没有改动 D5-13 的格式和分组。 | (D) `DEC/D11B-solo-ruling-review.md:10` |

### 2.2 实现现状

| # | 事实 | 来源 |
|---|---|---|
| F15a | 提醒正文是平铺的 atom 行。每行写成 `- 名字 = 值 ← origin`；如果这个 atom 属于某个批次，就在行尾追加 `（这批的目的：…）`。实现没有组头，也没有把同批 atom 缩进到组头下面。 | (R) `SOROI/packages/omp-soroi/src/eval/reminder.ts:31-40`（`:36-37`） |
| F15b | F22 spec 用 `reminderGroups` 按 D5 §3.5 的嵌套列表解析组头 `- 批次「…」`，再断言释放后只有一个与 `purpose` 相同的组，并且这个组里列全了本批剩余的产出。 | (R) `SOROI/e2e/s1/predicates.ts:51-64`；`SOROI/e2e/s1/f22.spec.ts:128-129` |

### 2.3 读码结论（`[INFERENCE]`，未运行）

- **C3：** D5-13、D5 §3.5 和 `design/eval.md:221` 都规定了按 `purpose` 分组的组头（F9–F11）。SOR-08 和 SOR-12 引用了这一格式（F12），F22 ⑦ 以它为判据（F13）。实现采用行尾附注（F15a），没有分组，因此属于实现偏差，不是契约缺口。修复只改提醒正文的排版，D11-37 的注入点和条目形状保持不变（F14）。
- **C4：** 行尾附注本身也偏离了 D5-13 的“每行写法”（F9）。修复时，组头承担目的说明，atom 行恢复原来的写法。
- **C5：** 这一项也在 W-07 的路径域内（F15）。SOR-08（[soroi#204](https://github.com/Pepgent/soroi/issues/204)）已关闭（F16）。

## 三、席位、路径域与切片状态

| # | 事实 | 来源 |
|---|---|---|
| F15 | D16-09：W-07 `pepgent-plugin` 在 soroi 内只写 `packages/omp-soroi/**`、`scripts/**` 等；W-08 `pepgent-e2e` 只写 `e2e/**`、`compose.yaml`、`compose.full.yaml`。两项缺陷涉及的文件 `supervisor.ts` 和 `reminder.ts` 都在 W-07 的路径域内。 | (D) `DEC/D16-phaseB-review-restore.md:33` |
| F16 | SOR-08 [soroi#204](https://github.com/Pepgent/soroi/issues/204) 和 SOR-12 [soroi#211](https://github.com/Pepgent/soroi/issues/211) 都是 CLOSED。#250 为 OPEN。 | (R) `gh issue view 204/211/250 -R Pepgent/soroi` |
| F17 | W-07 已暂时退场，为 W-10 腾出席位；它剩下的承载只有 [soroi#329](https://github.com/Pepgent/soroi/issues/329)，尚未开工。本实例读取时，`tern ls` 中有 lab、e2e、deploy、web 四席，没有 `pepgent-plugin`。 | (D) `pepgent-pm/evidence/exec/phaseB/rolling-record.md:50`、`:60`；(R) `tern ls` |
| F18 | D16-10：同时活跃的席位不超过 4 个；有席位释放名额后，从依赖已满足的等待席位中补入。 | (D) `DEC/D16-phaseB-review-restore.md:34` |
| F19 | D10-08：在已通过的契约内，单仓私有结构、算法和文件组织由工程师决定；跨仓公开契约、ADT、持久化和验收语义要回到领导层表决。 | (D) `DEC/D10-repo-delivery.md:20` |
| F20 | D16-11 ③：同一互斥路径域内的关联切片，可以由所属席位连续实现，并在同一个 PR 中用多个 `Closes #X` 一起提交。 | (D) `DEC/D16-phaseB-review-restore.md:35` |

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** 按 C1，D5 §3.1、D5:383 和 `design/subagent.md:40` 已经规定启动配方含 `role`。在 sidecar 中补写 `role`，是否属于恢复已通过的契约，不构成新增或修改公开契约？
- **A-2：** 按 C3、C4，D5-13、D5 §3.5 和 `design/eval.md:221` 已经规定提醒“按批次分组，组头是 `purpose`”，并给出示例。把行尾附注改成组头加缩进，是否属于恢复已通过的契约，不改变 D11-37 的注入点和条目形状？
- **A-3：** F22 ⑦ 的判据“组头 purpose”和 F22 spec 对启动配方 `role` 的断言，是否都在已通过的验收语义内，并且不需要降级？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 两项修复都只写 `packages/omp-soroi/**`（F15），属于 W-07 的路径白名单。是否可以作为实现缺陷，在 `Pepgent/soroi` 新开承载 issue（建议两项分别开 issue；按 F20，可以由 W-07 合在一个 PR 里），由 W-07 承接，不需要事前投票？
- **B-2：** 阶段门禁：SOR-08 和 SOR-12 已关闭，是新开承载 issue 而不是重开原切片，这样是否合规？W-07 目前不在岗（F17），重新入场的排期是否属于 Main 的全局排期（D16-10），不需要表决？
- **B-3：** 送达：由协调席开 issue，并在 #250 评论中链接承载 issue；W-07 重新入场时，由 Main 首次派活或由 soroi 片区经理送达。本实例不联系工人。这条路由是否符合 C4 和“leader 不当工人常规通信总线”？

## 六、处置

- 按既定 owner 路由，在 `Pepgent/soroi` 开两个承载 issue。正文写明四项：缺陷、所依据的契约原文位置、承接席位 W-07、被阻塞的阶段 C 用例 F22（E2E-13 / #250）。然后在 #250 评论中链接这两个 issue。
- 闸门 A 和闸门 B 的回复分别在同目录的 `w08-f22-defects-gate-a.md` 和 `w08-f22-defects-gate-b.md`，处置结果在文末“处置结果”一节。下一个空白实例只读这三个文件就能接续。

## 处置结果

- 闸门 A（`Argon-2`）认定：两项都是没按已通过的契约实现，判据不降（`w08-f22-defects-gate-a.md`）。闸门 B（`ArgonGovernance-2`）退回了事前盖章，理由是：非 `BLOCKED` 的既有契约内缺陷不送事前闸门，直接走 owner 路由，本席只保留事后检查（`w08-f22-defects-gate-b.md`，PM `40f6faf`）。本项不立案，也不投票。
- 已在 `Pepgent/soroi` 开两个承载 issue，都由 W-07 `pepgent-plugin` 承接，路径为 `packages/omp-soroi/**`：
  - [soroi#336](https://github.com/Pepgent/soroi/issues/336)：启动配方 sidecar 按 D5 §3.1 写入 `role`。
  - [soroi#337](https://github.com/Pepgent/soroi/issues/337)：未消费提醒按 D5-13 以 `purpose` 组头分组。

  两项都阻塞 [#250](https://github.com/Pepgent/soroi/issues/250) 在阶段 C 的 F22。
- 已在 [#250 评论 6562678969](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562678969) 链接这两个承载 issue。
- 待排期：W-07 目前不在岗。它重新入场的时间由 Main 按 D16-10 安排，届时 #329、#336、#337 一起处理。入场后由 Main 首次派活，或由 soroi 片区经理送达。本实例不联系工人。
