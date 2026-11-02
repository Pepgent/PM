# `NodeDefinition.template` 被当作 remote 模板名：初审与闸门材料

- **来源：** governance-desk 实例 `DeskD38Revise` 处理 D40（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）时发现，属该事务范围外，当时没有立案；见 `GATES/pepgent28-web06.md` 第六节 6.2。这里的问题与 D40 是同一个误读，只是 D40 只处理 `nodeBindingCount` 一项。
- **编制：** governance-desk 实例 `DeskNodeTemplateField`，属总协调席，与 Main 合计 1 票。下文的类别和更正方向是起草者的初分，不是裁决。
- **程序：** 依 C2-2（`SOR/AGENTS.md:60`），闸门 A 交 `Argon-2` 判定，闸门 B 交 `ArgonGovernance-2` 判定。两道闸门都认为不越界时，在对应 issue 按正文作答；任一闸门认为越界时，起草决策表立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令的输出；`(A)` agent 的说法，只作解释。本实例只读决策文件和源码，没有运行构建或测试，没有读 git 历史或 session，也没有触碰 `Pepgent/Pepgent` 根 checkout（U59）。

源码基线：用 `gh api repos/Pepgent/<repo>/tarball/main` 取 Pepgent、soroi、lab-library 的 main 快照，解到 `/tmp/deskntf/`，只读。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = PM `evidence/decisions/`
- `GATES/` = PM `evidence/gates/`
- `W/` = Pepgent main `apps/web/src/`
- `P/` = `W/protocol/lab/`
- `S/` = `W/client/services/lab/`
- `OS/` = soroi main `packages/omp-soroi/src/`
- `LL/` = lab-library main

---

## 一、核实：确属误读

| # | 事实 | 来源 |
|---|---|---|
| F-1 | D5-17（已通过）：“`AgentTemplate` 就是 omp 的 agent 定义名……`template` 是 omp agent 定义的名字，子进程按这个定义启动：模型、thinking、工具、系统提示。定义随发行包（D2-25）或 Lab 库的 `.omp/agents`（D2-12）分发”。 | (D) `DEC/D5-plugins-eval.md:92` |
| F-2 | D5 合同：`type TemplateName = string & {…} // remote 模板目录里的名字`；放置位置 `Placement = central \| { kind: "remote"; template: TemplateName }`。D5-10：生效 env 依次取调用覆盖、**节点函数的默认模板**、`central`。 | (D) `DEC/D5-plugins-eval.md:85,105,108-110` |
| F-3 | soroi 实现：`/** Name of an environment template registered in remote. */ export type Template = string`；所有节点都有 `env: Template \| undefined`；只有 `AgentFn` 有 `template: string`，注释为 `/** omp agent definition the subagent runs as. */`；构造器写法是 `agent(prompt, { template, env? })`、`program(run, { env? })`。 | (D) `OS/eval/node.ts:19-20,25,36-37,48-56` |
| F-4 | lab-library 的 Agent 节点写 `{ template: "review" }`、`{ template: "text_only" }`、`{ template: "try_eval" }`，都是 agent 定义名；main 上没有任何节点写 `env`。 | (D) `LL/nodes/review.ts:14`、`LL/nodes/text_only.ts:10`、`LL/nodes/try_eval.ts:17`；(R) `grep -n env LL/nodes/*.ts` 无命中 |
| F-5 | 服务端导出：`env` 选项的源码原文写入 `defaultEnvironment`；`template` 选项只在 Agent 节点读取，写入 `template` 的是 `property.initializer.getText(source)`，即源码原文；Agent 节点没有 `template` 时报错。 | (D) `W/server/lab/library-definition.ts:113-126` |
| F-6 | 协议：`defaultEnvironment: z.string().nullable()`，注释“Exact source expression, or null when the constructor declares no environment”；`template: TemplateNameSchema.nullable()`，其中 `TemplateNameSchema` 是 remote 生成的模板名类型。 | (D) `P/library.ts:29-31`；`P/external/remote.ts:6-7` |
| F-7 | D12 的类型定义：`defaultEnvironment: string \| null; template: TemplateName \| null`，其中 `TemplateName` 取自 remote 生成产物。 | (D) `DEC/D12-lab-wire.md:102,239` |
| F-8 | D7-13 计 `nodeBindingCount` 用的是“默认环境”；D7 P1 导出的是“默认环境”，D8 F28 S2 核对的也是“默认环境”，三处都没有说按 agent 定义名关联 remote 模板。 | (D) `DEC/D7-lab-backend.md:73,221`；`DEC/D8-mvp-scope.md:147` |

**结论（初分）：** 是误读。`NodeDefinition.template` 只有 Agent 节点才有值，值是 omp agent 定义名（F-1、F-3、F-4、F-5）；节点对应的 remote 模板（D5 所说的“默认模板”）是 `defaultEnvironment`（F-2、F-3、F-6）。D12 把 `template` 的类型写成 remote 的 `TemplateName`（F-7），这与已通过的 D5-17 冲突。凡是用这个字段到 `templates` 里找设备、镜像、集群或挂载的规则和代码，查的都不是同一个事实：

- Program 和 Human 节点的 `template` 恒为 null，永远不会关联到模板；
- Agent 节点拿 agent 定义名去和 remote 模板名比较。

另外，导出值是源码原文，带引号（例如 `"review"`），按名称相等比较时匹配不到任何模板（F-5）[INFERENCE：依 TypeScript `getText` 返回含引号的原文推断，未运行]。

## 二、影响清单

### 2.1 已通过的决策正文

| # | 决策行 | 位置 | 受影响内容 |
|---|---|---|---|
| A-1 | D12 节点库类型（按 D12-03、D12-15 修订 `feat/lab-10-library` 基线） | `DEC/D12-lab-wire.md:230,239` | `template: TemplateName \| null` 的类型与 D5-17 冲突；`defaultEnvironment` 没有说明它就是 D5-10 的默认模板。 |
| A-2 | D35-02 v3（泳道计划条） | `DEC/D35-pepgent-26-web03-timeline-plan-defs.md:21`；回写在 `DEC/D12-lab-wire.md:59` | “泳道由 `NodeDefinition.template` 经 `templates` 的设备（P3）确定”。照这句实现，Program 节点从不进泳道，Agent 节点以 agent 定义名找设备。 |
| A-3 | D38-03 v1（`nodeBindingCount`） | D38（PM#57）；D40-01 | 同一误读，已由 D40-01 单独更正。D40-01 以 4/4 通过（门槛 3），议程已归档（(R) `council tally D40`）。本材料不重复处理，只在 2.3 记下 W-10 送达。 |

**评审输入中的同一误读（不是决策正文，但 W-10 照它实现过）。** D12 的逐叶子覆盖审计是 D12 的评审输入（`DEC/D12-lab-wire.md:3`）。ClaudeHighD40 在 D40 的选票里也指出了下列各行（(A)，经本实例对照原文核实为 (D)）：

| # | 位置 | 原文写法 | 对应代码 |
|---|---|---|---|
| A-4 | `DEC/D12-coverage.md:232` | `palette[].device`：“P3，Def.template 关联 templates[].metadata.devices” | C-4 |
| A-5 | `DEC/D12-coverage.md:234` | `palette[].availability`：“Def.template→templates 设备，与 Cat.experiments 当前在途环境/计划区间关联” | C-4 |
| A-6 | `DEC/D12-coverage.md:258` | 节点库 `definitions[].device`：“P3，Def.template 关联 Page.nodes.templates 的设备” | C-5 |
| A-7 | `DEC/D12-coverage.md:261` | 节点库 `definitions[].image/cluster/devicePath`：“由 Def.template 匹配 templates 的 image/boundClusters/mounts” | C-5 |
| A-8 | `DEC/D12-coverage.md:445` | 容器页 `images[].nodeBindingCount`：“按 Def.template 与模板镜像计算绑定数量” | 已由 D40-01 更正 |

调查报告保持原样，不改（`SOR/AGENTS.md:125`）。更正正文写明 A-4 至 A-7 不再作为实现依据。`palette[].computeCluster`（`DEC/D12-coverage.md:238`，“P3 boundClusters”）原文没有写关联键，但 C-4 同样按 `template` 取值，一并列入更正范围。

### 2.2 已合入代码（Pepgent main）

| # | 写方 | 位置 | 现状 |
|---|---|---|---|
| C-1 | W-09 | `P/library.ts:31` | `template: TemplateNameSchema.nullable()`，把 agent 定义名标成 remote 模板名类型（`P/external/remote.ts:6-7`）。运行时同为 `z.string()`，错在类型名和语义上（ClaudeHighD40 同样指出这一处）。 |
| C-2 | W-09 | `W/server/lab/library-definition.ts:122` | 导出值是源码原文，与 `defaultEnvironment` 一致，本身不违反 D5-17。 |
| C-3 | W-10 | `S/project-experiments.ts:53-55,98-106` | D35-02 计划条：`!definition?.template` 时不画；有值时按 `definition.template` 找设备。 |
| C-4 | W-10 | `S/project-flow-editor.ts:46-49,67-79` | 流程编辑器面板：`device`、`availability` 的 queued 判定、`calc` 组的 `computeCluster`，都按 `definition.template` 找模板。 |
| C-5 | W-10 | `S/project-node-library.ts:94-102` | 节点库：`device`、`image`、`cluster`、`devicePath`、`mounts` 按 `definition.template` 找模板。 |
| C-6 | W-10 | `S/project-experiment.ts:281-289` | 实验详情的草稿节点：`device` 按 `def.template` 找设备，找不到时显示 `template` 原文。 |

不受影响：
- 已提交调用与在途槽位的泳道：它们取 `Call.env.template`、`SlotState.env`，这两个确实是 remote 模板（`S/project-experiments.ts:121-133`；`S/project-experiment.ts:193,200`；D12-14）。
- 节点库“容器”分区原样显示 `defaultEnvironment`、`template` 两个字段（`S/project-node-library.ts:35-36,114`），不做关联。

### 2.3 在制切片

| 切片 | 席位 | 状态 | 关系 |
|---|---|---|---|
| [WEB-07 / Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29) | W-10 | OPEN | 阶段 B 的真实页面接线，消费 C-3 至 C-6 四个投影。C-3 至 C-5 所在的 WEB-03、WEB-04、WEB-05（[#26](https://github.com/Pepgent/Pepgent/issues/26)、[#27](https://github.com/Pepgent/Pepgent/issues/27)、[#25](https://github.com/Pepgent/Pepgent/issues/25)）均已 CLOSED，只能由在制的 W-10 切片承接改正。 |
| [WEB-06 / Pepgent#28](https://github.com/Pepgent/Pepgent/issues/28) | W-10 | OPEN | `nodeBindingCount` 原先暂停，等 D40-01 结果；D40-01 已通过，由 AreaMgrPepgent 按 D40-01 送达（A-3）。 |
| W-09 | W-09 | Pepgent 没有在制的 W-09 issue（(R) `gh issue list -R Pepgent/Pepgent --state open`：#3、#23、#28、#29、#30） | C-1 归 W-09 的 `protocol/lab/**`（D16-03④），如需改动，须由协调席补承载。 |

## 三、更正方向（候选主案，待闸门与表决）

1. **字段语义（改 D12 类型，W-09 改协议）：**
   - `template: string | null`：Agent 节点构造时 `template` 选项的源码原文，即 omp agent 定义名（D5-17）；其他体为 null。它不是 remote 模板名，不用于关联 `templates`。
   - `defaultEnvironment` 的注释补一句：它就是 D5-10 的“节点函数的默认模板”。
   - 导出值不变。`P/library.ts` 的 `template` 改为 `z.string().nullable()` 并加注释，wire 形状和运行时校验都不变。
2. **关联规则（取代 D35-02 v3 的泳道一句，W-10 改投影）：** 凡是由节点定义找 remote 模板，进而取设备、泳道、镜像、集群、挂载、面板占用的地方，都改用 `defaultEnvironment`，取值规则与 D40-01 相同：原文是字符串字面量时取其值作模板名，与 `TemplateInfo.name` 比较；为 null 或不是字面量时，该节点没有 remote 模板（按 D5-10 落在 `central`），这些字段为空。适用于 C-3 至 C-6，由 W-10 在 WEB-07 改。
3. **落选：**
   - 维持 `template`：与 D5-17 和 soroi 实现不符，Program 节点永远没有泳道和设备。
   - 由 W-09 在导出时把默认环境解析成新的模板名字段：要改 wire 形状，超出更正所需。D40-01 也按“W-10 取字面量值”处理，两处保持一致。
   - 作为笔误在回写时单方改正：这会改变照文实现的结果（Program 节点进入泳道、Agent 节点改用其 env），同时改了 wire 类型的语义，按 `SOR/AGENTS.md:123` 不能免表决。D40 的判定与此相同（`GATES/pepgent28-web06.md` 6.2）。

**初分类：** 串联项，改已通过正文 D12（类型）和 D35-02 v3（泳道），跨 soroi eval 与 Pepgent Lab wire 两个组件。起草者认为它属于须表决的跨组件契约纠偏。按 D1-12，这里没有工人 `BLOCKED`，不进 P0；拟列 **P1**（跨组件接缝纠偏），由闸门判定。

## 四、请两道闸门判定

- **闸门 A（Argon-2）：**
  - “`NodeDefinition.template` = omp agent 定义名，节点的 remote 模板 = `defaultEnvironment`”是否就是 D5-10、D5-17、D7-13 与 D7 P1 的原意？
  - 改 D12 类型、改 D35-02 v3 的泳道依据，是否触及公开契约或已通过正文，因此须表决？
  - 当前 lab-library 没有节点声明 `env`，更正后计划条和面板设备都会为空。这是否违背 D7:96 时间轴的意图，还是属于 lab-library 内容的问题、不在本议题内？
- **闸门 B（ArgonGovernance-2）：**
  - W-09 改 `P/library.ts`、W-10 在 WEB-07 改 `S/**` 四个投影，是否都在 D16-09、D20-01 的白名单内，不改切片归属？
  - W-09 没有在制 issue，由协调席按 D16-04 补承载，是否合规？
  - 是否必须表决，优先级定 P1 是否符合 D1-12？是否需要加 `governance`？
  - 表决期间 W-10 是否只暂停 C-3 至 C-6 中“由定义找模板”的部分，WEB-07 其余部分照常？

闸门结论分别写入 `GATES/node-template-field-gate-a.md`（Argon-2）与 `GATES/node-template-field-gate-b.md`（ArgonGovernance-2）。

## 五、处置结果

- **闸门 A（Argon-2，`node-template-field-gate-a.md`，PM `80e364d`）：**
  - 第三节的两点是 D5-10、D5-17、D7-13 和 D7 P1 的原意：`template` 是 omp agent 定义名，节点的 remote 模板是 `defaultEnvironment`。
  - 改 D12 类型和 D35-02 v3 的泳道依据，属于纠正已通过正文和跨组件公开语义（K4），必须表决；同意列 P1。
  - 未声明 `env` 的节点按 D5-10 落在 `central`，不画计划条，设备为空。这符合 D7:96 和 D35-02 v3 的意图。lab-library 现有节点没有声明 `env`，属于库内容的问题，不在本议题内。
- **闸门 B（ArgonGovernance-2，`node-template-field-gate-b.md`，PM `106d456`）：**
  - 两处改动都在 D16-09 和 D20-01 白名单内，不改切片归属：W-09 改 `protocol/lab/library.ts`，W-10 在 WEB-07（#29）改四处投影。
  - 必须表决。没有 `BLOCKED`，不进 P0，按跨组件接缝纠偏列 P1；两行都是 4 席参与的契约行，不加 `governance`。
  - 通过后，由协调席按 D16-04 为 W-09 补建承载 issue，或并入既有承载。
  - 表决期间，W-10 只在 C-3 至 C-6 的模板关联上等待，WEB-07 的其余接线照常推进。
- **立案：** `council propose --seat Coordination --as DeskNodeTemplateField --file /tmp/deskntf/D-node-template-field.yaml` 立为 D41（[Pepgent/PM#60](https://github.com/Pepgent/PM/issues/60)，P1）。共两行，资格席为 Coordination、ClaudeHigh、Argon、LeadMentor，门槛 3：
  - D41-01：D12 类型改正，并改 W-09 协议的类型名与注释；
  - D41-02：节点定义与模板之间改用 `defaultEnvironment` 关联，取代 D35-02 v3 的泳道一句，四处投影由 W-10 在 WEB-07 承接。
- **登记：** 在 [Pepgent#29 issuecomment-6564146198](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564146198) 记下 D41 立案和表决期范围，由 Pepgent 片区经理送达 W-10。D40-01 的 `nodeBindingCount` 结果在 #28 另行送达。
- **D41-02 反例处置（governance-desk 实例 `DeskD41Revise`）：**
  - **反例：** LeadMentor-2 对 D41-02 v1 投反对票（PM#60 评论）。理由是 v1 把“默认环境原文不是字面量”和“没有默认环境”混为一谈，并据此认定节点落在 `central`。Main 的 Coordination 票（`/tmp/D41-main.md`）认为反例成立。
  - **核实（(D)）：** D5-10 只在没有默认模板时才落到 `central`（`DEC/D5-plugins-eval.md:85`）。soroi 的 `program`、`agent` 构造器保存 `o.env` 原值，类型为 `string`（`OS/eval/node.ts:47-56`）。describe 返回实际的 `fn.env`（`OS/eval/runner-core.ts:50`）；执行时取 `override ?? metadata.env ?? CENTRAL_ENV`（`OS/eval/execute.ts:182`）。导出只取原文、不求值（`W/server/lab/library-definition.ts:122`）。因此 `env: environment` 这类常量引用导出为非字面量，运行时却会选对应的 remote 模板。D40-01 只规定非字面量不计数，没有认定它落在 `central`（`DEC/D40-d38-03-nodebinding-default-env.md:21`）。反例成立。
  - **处置：** 执行 `council revise D41-02 --as DeskD41Revise --file /tmp/deskd41r/D41-02-v2.yaml --reasons @/tmp/deskd41r/why.md`，输出 `D41-02 revised to v2; votes on v1 no longer count.`。v2 只改取值规则，其余内容不变：
    - null 表示没有声明默认环境，按 D5-10 落在 `central`；
    - 非字面量只表示本版不能静态识别它的模板，实际环境仍由 eval 决定，不认定落在 `central`，也不认定没有 remote 模板；
    - 这两种情况下，由模板派生的字段都为空；
    - 泳道一句中的“没有对应模板的节点”改为“没有关联到模板的节点”。
  - **结果：** D41-01 v1 和 D41-02 v2 都以 4/4 通过（门槛 3），D41 已归档（(R) `council tally D41`）。
