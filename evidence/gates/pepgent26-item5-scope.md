# Pepgent#26（WEB-03）结论⑤的交付切片：初审材料

- **issue：** [Pepgent/Pepgent#26](https://github.com/Pepgent/Pepgent/issues/26)（WEB-03），关联 [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（WEB-07）。工人 W-10。
- **起因：**
  - 结论评论 [issuecomment-6562796849](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562796849) 已经裁定⑤：所选 Lab 由客户端持有 `selectedLabId: LabId | null`，切换时以 `readCatalog(selectedLabId)` 重读目录，再按新的 `catalog.lab` 重读页面并重新订阅 events；不写 Better Auth 会话。这条结论没有说在哪个切片交付。
  - W-10 在 [issuecomment-6562844279](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562844279) 第 3 条写道：“切换 Lab 按结论⑤……它与详情页的派生/对比/workspace/交回入口（按 Q1 的读法）都属于页面接线……按 D8 第 341 行，页面接线属于 WEB-07，所以这些入口和 Lab 切换在 WEB-07 落地。如果管理层认为它们必须在 WEB-03 内完成，请在本 issue 指出，本席照做。”
- **编制：** governance-desk 实例 `DeskPepgent26Item5Scope`（总协调席，与 Main 合计 1 票）。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件、源码与 issue 正文，没有运行构建或测试，没有读 git 历史或 session。

路径简称：`DEC/` = `pepgent-pm/evidence/decisions/`；`WT/` = W-10 工作入口 `/Users/mouriya/Ext/worktrees/pepgent-web-home/`（分支 `feat/web-03-experiments`）；`SOR/` = `pepgent-soroi/`。

## 一、处置程序

依 Main 对本派工的更正：尚未定案的范围或派工归属必须经 PM 表决，双闸门只用于放行 BLOCKED 中的机械补全。所以本项不送闸门：
- 已通过的决策正文（D8、D20、D12）或现行 issue 正文逐字写明⑤归哪个切片时，免票，在 #26 引用该原文作答；
- 没有写明时，按 P0 立案交表决。

依据：
- `SOR/.omp/agents/governance-desk.md:20`（D）：“两道闸门都确认不越界才可作为机械补全放行；任一方认定触及意图、公开契约或席位边界，按 P0 起草决策表立案投票。你没有单方免投票放行权。”
- `SOR/AGENTS.md:26`（D1-12，D）：“`P0`（关键路径工程 `BLOCKED` 解阻）”。

## 二、问题 1：既有正文是否已写明⑤的归属

逐字核对的条文：

| # | 条文原文 | 来源 |
|---|---|---|
| T-1 | WEB-03：“投影：catalog、实验列表、实验详情（`RunGraph` 到 `ExperimentFlowFixture`，含时间轴、对比、派生导航、runner workspace）”；本仓验收：“纯函数投影的单元测试，输入是真实录制的线数据；录制中含 `Aborted` 变体的调用（不带 `version`、`body`、`env`，`outputs = []`），投影出被中止的节点（PM#5 第 2 项）” | (D) `DEC/D8-mvp-scope.md:337` |
| T-2 | WEB-07：“阶段 B 一次落地：放宽 id、把剧情字面量改成数据事实、`AgentTemplate.id` 改为 omp agent 定义名、`AgentTemplate.harness` 收窄为字面量 `'omp'`（D7:71、77）、运行时不再引用 `LAB_SNAPSHOT`；W-10 按 D20-01/02 路径与 UI 数据绑定边界实施，保留 U59 合法结构/语义，不联系无关前端会话；文档按 D20-03 交接（D7-17）”；依赖 “WEB-03–06”；本仓验收：“构建好的 host 在浏览器中走完 13 个页面，数据都来自后端（SMOKE:22-54）” | (D) `DEC/D8-mvp-scope.md:341` |
| T-3 | #26 正文“目标 / what”：“投影：catalog、实验列表、实验详情（`RunGraph` 到 `ExperimentFlowFixture`，含时间轴、对比、派生导航、runner workspace）”；“不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。” | (R) `gh issue view 26 -R Pepgent/Pepgent` |
| T-4 | #29 正文“目标 / what”：“阶段 B 一次落地：放宽 id、把剧情字面量改成数据事实、`AgentTemplate.id` 改为 omp agent 定义名、`AgentTemplate.harness` 收窄为字面量 `'omp'`（D7:71、77）、运行时不再引用 `LAB_SNAPSHOT`；经 Main 与 UI 负责人协调（D7:77）” | (R) `gh issue view 29 -R Pepgent/Pepgent` |
| T-5 | D7-17：“**读取：** 每个页面路由的 `loader` 调用 `readPage`，壳层调用 `readCatalog`。”“**页面改动：** 各页本地 reducer 的动作改为命令；UI 数据绑定、最少 props/条件渲染由 W-10 按 D20-02 完成……” | (D) `DEC/D7-lab-backend.md:77` |
| T-6 | D20-01：“`renderer/composition/lab-app.tsx`、`renderer/application/lab-runtime.tsx`、`renderer/application/contracts/lab-session.tsx`”列入 W-10 白名单；A 组 5 个文件“按 WEB-02..07 的需要加 `send`、`subscribe` 等调用”；取舍栏：“WEB-01..07 的全部非视觉落点都有唯一的系统内写方” | (D) `DEC/D20-w10-path-boundary.md:31` |
| T-7 | D12-03：“catalog.read{lab:LabId或null}（null 取当前用户首 Lab）”；D12-04：“目录含当前用户全部 Lab……所选 Lab 账户与 grants” | (D) `DEC/D12-lab-wire.md:35,36` |
| T-8 | D7 现状表：“`LabRuntime` 每页读一次 snapshot；所选 Lab、聚焦项目是页面生命周期状态” | (D) `DEC/D7-lab-backend.md:47` |

检索：`grep -rn "切换 Lab\|所选 Lab\|selectLab\|selectedLabId" DEC/D8-mvp-scope.md DEC/D20-w10-path-boundary.md DEC/D12-lab-wire.md`（R）只命中 D12-04 的“所选 Lab 账户与 grants”，它规定目录内容，不涉及切片。

**结论：没有写明。**
- D8、D20、D12 与 #26、#29 正文都没有出现“切换 Lab”“所选 Lab 由谁持有”或⑤的任何同义表述与切片的对应。
- T-1、T-3 的“投影：catalog”是把目录线数据投影成视图类型的纯函数（T-5“客户端的纯函数把线数据投影成现有的 `*Fixture` 视图类型”），不含状态持有与重读。
- T-2、T-4 的“运行时不再引用 `LAB_SNAPSHOT`”与 T-5 的“壳层调用 `readCatalog`”在语义上覆盖⑤的落点，但没有逐字点名⑤。W-10 所称“按 D8 第 341 行，页面接线属于 WEB-07”是它的读法（A），D8:341 原文没有“页面接线”一词。

按第一节程序，本项立案交表决。

## 三、问题 2：放在哪个切片交付，是否会收缩功能范围

**代码现状（只读核对，R）：**
- `WT/apps/web/src/app/routes/_lab.tsx:59`：`loader: async () => ({ services: getLabServices(), catalog: await getLabBridge().readCatalog(null) })`。壳层已经读目录，但只读首 Lab。
- `WT/apps/web/src/renderer/application/lab-runtime.tsx:21`：`const [labId, setLabId] = useState<LabId>(() => snapshot.labs[0]!.id);`；`:37` 从 `snapshot.labs` 中取所选 Lab；`:42` `selectLab: setLabId`。
- `WT/apps/web/src/renderer/bootstrap/renderer-services.ts:2,48`：`import { LAB_SNAPSHOT } …`；`labServices ??= createLabServices(LAB_SNAPSHOT);`。

运行时的所选 Lab 仍从 `LAB_SNAPSHOT` 中挑选。要让切换真正重读目录，运行时必须先改为从目录读取 Lab 列表，也就是 T-2 的“运行时不再引用 `LAB_SNAPSHOT`”。

| 方案 | 交付内容 | 范围影响 |
|---|---|---|
| **a. WEB-07 交付（主案）** | WEB-03 只交付目录投影（已含全部 Lab 与所选 Lab 的视图数据）；WEB-07 在 `lab-runtime.tsx`、`_lab.tsx`、`client/**` 实现⑤：客户端持有 `selectedLabId`，切换时 `readCatalog(selectedLabId)`、按新 `catalog.lab` 重读页面并重订阅 events，不写 Better Auth 会话 | 不收缩：⑤的全部行为保留，随 WEB-07 的阶段 B 切换一次落地，在 S2 由 WEB-07 的“13 个页面数据都来自后端”统一验收（`DEC/D8-mvp-scope.md:193`：“S2 \| 接真实 Lab 与浏览器，F08–F31”）。条件：#29 必须写明它承接⑤，否则 WEB-03 关闭后⑤在任何 issue 里都没有承载 |
| b. WEB-03 交付 | WEB-03 内先把运行时的 Lab 列表与所选 Lab 改为来自目录，再实现⑤ | 不收缩，但 WEB-03 要提前做 WEB-07 的一部分运行时切换（T-2），两个切片在 `lab-runtime.tsx` 上分两次改同一处；WEB-03 的本仓验收（T-1，纯函数投影单元测试）也不覆盖这类接线 |

两种放法都不删除⑤的任何行为，也都不改 D8:196 的“F 流程、切片业务义务和证据结构不缩减”。区别只在承载 issue 与改动时机。没有任何 F 流程逐字涉及切换 Lab（上节检索）。

## 四、同一评论的附带项：详情页入口

W-10 同一句把“详情页的派生/对比/workspace/交回入口（按 Q1 的读法）”也放进 WEB-07。
- 这些入口的数据投影（`derivedFrom`、回看、对比、workspace、交回地址）W-10 已在 WEB-03 分支完成（A，[issuecomment-6562844279](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562844279)）。T-1 的括注“含时间轴、对比、派生导航、runner workspace”修饰的是“`RunGraph` 到 `ExperimentFlowFixture`”的投影。
- 入口在详情页上的接线（工具栏动作接到真实页面数据）是哪个切片交付，D8、D20、D12 与 #26、#29 正文同样没有逐字写明。Q1 结论只裁定了做法属于 D20-02 允许的范围，没有裁定切片。
- 它与⑤同属“页面接线归 WEB-03 还是 WEB-07”，并入同一议案作第二行。
- 范围影响与⑤相同：F08、F10、F13、F18、F23–F26 的 S2 部分本来就在 WEB-07 合入后的统一 S2 中验收（`DEC/D8-mvp-scope.md:368`，E2E-20 依赖“所测WEB-07”），放在 WEB-07 不缩减任何流程。

## 五、处置

- **立案：** P0 议案两行（⑤；详情页入口），由 `DeskPepgent26Item5Scope` 以 `council propose --seat Coordination` 发起，`notify` 含 `Main`、`AreaMgrPepgent`。
- **表决前：** W-10 的现有做法不变，即两项都不在 WEB-03 内接线；两行若改判 WEB-03，再按结果补做。
- **通过后：** AreaMgrPepgent 把结果送达 W-10，并在 #29 留评论写明 WEB-07 承接的内容（引用议案行），使 #26 关闭后仍有承载。

## 六、立案结果

- **议程：** D36（[Pepgent/PM#55](https://github.com/Pepgent/PM/issues/55)，P0）。
  - D36-01：⑤在 WEB-07 交付，治理领域。
  - D36-02：详情页入口的页面接线在 WEB-07 交付，入口的数据投影留在 WEB-03，治理领域。
- **#26 告知评论：** [issuecomment-6562912843](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562912843)，写明正文未载归属、已立案 D36、表决前维持现有做法。
