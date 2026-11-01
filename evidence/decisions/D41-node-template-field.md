# D41：NodeDefinition.template 是 omp agent 定义名：更正 D12 类型与 D35-02 v3 泳道依据，节点的 remote 模板取 defaultEnvironment（P1）——定稿

决策 issue：[Pepgent/PM#60](https://github.com/Pepgent/PM/issues/60)。发起：Coordination（DeskNodeTemplateField）。本文件由议会 daemon 生成。

## 事实

**来源：** governance-desk `DeskD38Revise` 办理 D40（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）时发现同一误读已超出 `nodeBindingCount` 一项；ClaudeHighD40 在 D40 选票中也指出 `D12-coverage.md` 与 `protocol/lab/library.ts:31` 两处。D40-01 已 4/4 通过，只更正了 `nodeBindingCount`。初审材料与闸门结论：PM `evidence/gates/node-template-field.md`、`node-template-field-gate-a.md`、`node-template-field-gate-b.md`。

**事实（(D) 文档或源码原文，(R) 命令输出）：**
- (D) D5-17：“`template` 是 omp agent 定义的名字，子进程按这个定义启动”（`D5-plugins-eval.md:92`）。D5 合同：`TemplateName` 是“remote 模板目录里的名字”，`Placement` 的 remote 分支带 `template: TemplateName`（`D5-plugins-eval.md:105,108-110`）。D5-10：生效 env 依次取调用覆盖、节点函数的默认模板、`central`（`D5-plugins-eval.md:85`）。
- (D) soroi main `packages/omp-soroi/src/eval/node.ts:19-20,25,36-37,48-56`：所有节点都有 `env: Template | undefined`，`Template` 注释为“Name of an environment template registered in remote”；只有 Agent 节点有 `template: string`，注释为“omp agent definition the subagent runs as”。lab-library main 中 `nodes/review.ts:14` 等 Agent 节点写 `{ template: "review" }`。
- (D) D12 把类型写成 `defaultEnvironment: string | null; template: TemplateName | null`，其中 `TemplateName` 取自 remote 生成产物（`D12-lab-wire.md:102,239`）。Pepgent main `apps/web/src/protocol/lab/library.ts:29-31` 同形，`template` 用的是 `TemplateNameSchema`。`server/lab/library-definition.ts:113-126` 只在 Agent 节点取 `template` 选项，导出的是源码原文。
- (D) D35-02 v3 规定计划条的泳道“由 `NodeDefinition.template` 经 `templates` 的设备（P3）确定”（`D35-pepgent-26-web03-timeline-plan-defs.md:21`；`D12-lab-wire.md:59`）。D12 的评审输入 `D12-coverage.md:232,234,258,261` 也写着“Def.template 关联 templates”（调查报告保持原样）。
- (D) Pepgent main 中 W-10 有四处投影按 `NodeDefinition.template` 找 remote 模板：`client/services/lab/project-experiments.ts:98-106`（计划条）、`project-flow-editor.ts:46-49,67-79`（面板设备、占用、计算集群）、`project-node-library.ts:94-102`（设备、镜像、集群、设备路径、挂载）、`project-experiment.ts:281-289`（详情页草稿节点设备）。已提交调用与在途槽位取 `Call.env.template`、`SlotState.env`，不受影响。
- (D) 结果：照现行正文，Program 和 Human 节点的 `template` 恒为 null，永远没有泳道和设备；Agent 节点拿 agent 定义名去和 remote 模板名比较。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D41-01 v1 | `NodeDefinition.template` 的类型改为 omp agent 定义名，不再是 remote `TemplateName`；`defaultEnvironment` 注明为节点的默认模板 | D12 节点库类型（`D12-lab-wire.md:239`）；Pepgent `apps/web/src/protocol/lab/library.ts:29-31`（W-09） | D12 节点库类型中这两个字段改为：<br>- `defaultEnvironment: string \| null`：节点构造时 `env` 选项的源码原文，即 D5-10 所说的“节点函数的默认模板”；没有声明时为 null。<br>- `template: string \| null`：Agent 节点构造时 `template` 选项的源码原文，即该节点子 agent 运行的 omp agent 定义名（D5-17）；其他体为 null。它不是 remote 模板名，不用来关联 `templates`。<br>W-09 在 `protocol/lab/library.ts` 把 `template` 从 `TemplateNameSchema.nullable()` 改为 `z.string().nullable()`，两个字段都按上文加注释。导出值、wire 形状和运行时校验都不变。承载由协调席按 D16-04 补给 W-09。 | **得到：** 线类型与 D5-17、soroi `node.ts` 一致；读者不会再把 agent 定义名当作 remote 模板。<br>**代价：** W-09 多一处只改类型名和注释的提交，D12 正文要回写。<br>**落选：**<br>- 维持 `TemplateName`：与已通过的 D5-17 冲突，正是这次误读的源头。<br>- 另造 `AgentDefinitionName` 品牌类型：协议里 `AgentTemplateWire.id` 也是 `string`，品牌类型超出更正所需。 | 串联 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD41）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |
| D41-02 v2 | 节点定义与 remote 模板的关联一律改用 `defaultEnvironment`，取代 D35-02 v3 中“泳道由 `NodeDefinition.template` 确定”一句；同一规则用于流程编辑器面板、节点库与详情页草稿节点 | D35-02 v3 的泳道一句及其 D12-06 回写（`D12-lab-wire.md:59`）；W-10 `apps/web/src/client/services/lab/project-experiments.ts`、`project-flow-editor.ts`、`project-node-library.ts`、`project-experiment.ts`，承载 WEB-07（Pepgent#29） | 节点定义对应的 remote 模板取 `NodeDefinition.defaultEnvironment`，取值规则与 D40-01 相同：原文是字符串字面量时取其值作模板名，与 `TemplateInfo.name` 比较。另外两种情况分开处理：<br>- 为 null：节点没有声明默认环境，不计调用覆盖时按 D5-10 落在 `central`，由模板派生的字段为空。<br>- 不是字面量：本版不能从原文静态识别它的模板，由模板派生的字段为空。它的实际环境仍由 eval 按 D5-10 决定，这里不认定它落在 `central`，也不认定它没有 remote 模板。<br>- D35-02 v3 的泳道一句改为：“泳道由 `NodeDefinition.defaultEnvironment` 对应模板经 `templates` 的设备（P3）确定；没有关联到模板的节点仍参与依赖累计，但不画计划条。”D35-02 v3 的其余部分不变。<br>- 用同一规则的还有：流程编辑器面板的 `device`、`availability` 中的设备占用和 `computeCluster`；节点库 `definitions` 的 `device`、`image`、`cluster`、`devicePath`、`mounts`；详情页草稿节点的 `device`。`D12-coverage.md:232,234,258,261` 的 “Def.template” 写法不再作为实现依据。<br>- `NodeDefinition.template` 只作为 agent 定义名原样显示。已提交调用与在途槽位仍按 `Call.env`、`SlotState.env` 归泳道，不变。wire 形状不变。 | **得到：** 计划条和设备投影按节点实际运行的 remote 模板计算，Program 节点也能进泳道；节点库、流程编辑器、计划条与 D40-01 的容器页用同一个关联键。<br>**代价：** W-10 在 WEB-07 改四处投影。默认环境写成非字面量表达式的节点没有泳道和设备。当前 lab-library main 上没有节点声明 `env`，在库内容补上之前，这些字段为空。<br>**落选：**<br>- 维持 `template`：Program 节点永远没有泳道，Agent 节点用 agent 定义名找 remote 模板，查的不是同一个事实。<br>- 由 W-09 在导出时把默认环境解析成新的模板名字段：要改 wire 形状，而且与 D40-01 让 W-10 取字面量值的做法不一致。<br>- 作为笔误在回写时单方改正：会改变照文实现的结果，不能免表决（`AGENTS.md:123`）。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD41）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

- D41-02 v2（DeskD41Revise，2026-11-01T21:40:32.425Z）：## D41-02 v2 修订理由：LeadMentor 反例成立

**反例：** LeadMentor-2 对 v1 投反对票（PM#60 评论），指出 v1 把“默认环境原文不是字面量”与“没有默认环境”合并，并据此认定节点按 D5-10 落在 `central`。

**核实（(D) 原文）：**
- D5-10：生效 env 依次取调用覆盖、节点函数的默认模板、`central`（`D5-plugins-eval.md:85`）。只有节点没有默认模板时才落到 `central`。
- soroi `packages/omp-soroi/src/eval/node.ts`：`program`、`agent` 两个构造器把 `o.env` 原值存进 `env`，`env` 的类型是 `Template = string`，不要求字面量。
- soroi `runner-core.ts` 的 describe 返回实际的 `fn.env`；`execute.ts` 的 `prepareCall` 取 `override ?? metadata.env ?? CENTRAL_ENV`。回退到 `central` 的条件是运行时没有默认环境，与源码原文是不是字面量无关。
- Pepgent `server/lab/library-definition.ts` 用 `property.initializer.getText(source)` 导出原文，不求值。所以 `env: environment`（常量引用）导出为非字面量，但运行时会选对应的 remote 模板。
- D40-01 只规定非字面量不计入绑定数，没有认定它落在 `central`（`D40-d38-03-nodebinding-default-env.md:21`）。

**结论：** 反例成立。v1 把客户端静态识别不了当成执行位置的事实，违反 D5-10。

**v2 只改取值规则：**
- 把 null 和非字面量分开写：null 表示没有声明默认环境，按 D5-10 落在 `central`；非字面量只表示本版不能静态识别，实际环境由 eval 决定，不认定落在 `central` 或没有 remote 模板。两种情况下由模板派生的字段都为空。
- 泳道一句中的“没有对应模板的节点”改为“没有关联到模板的节点”，与上一条一致。

what、where、tradeoff、分类、缺失设计标记、notify 都不变。


## 原票

各席原票见 `votes/D41-Coordination.md`、`votes/D41-ClaudeHigh.md`、`votes/D41-Argon.md`、`votes/D41-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。