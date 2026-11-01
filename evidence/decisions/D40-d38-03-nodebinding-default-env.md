# D40：D38-03 更正：容器页 nodeBindingCount 按节点默认环境计，不按 NodeDefinition.template（P0）——定稿

决策 issue：[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)。发起：Coordination（DeskD38Revise）。本文件由议会 daemon 生成。

## 事实

**来源：** D38（[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)）D38-03 v1 已 4/4 通过，其 `how` 规定“`nodeBindingCount`：`containers.definitions` 中 `template` 属于这些模板的节点函数个数（D7-13）”。ClaudeHigh（ClaudeHighD38）在赞成票中指出该处字段应为 `NodeDefinition.defaultEnvironment`。议会 daemon 不接受对已定行的 `revise`（(R) `council revise D38-03 …` → “D38-03 is already decided”）。Coordination 判定这一更正改变照文实现的结果，不能在回写时作为笔误单方改正（`AGENTS.md:123`），故立本议程表决。初审与判定依据：PM `evidence/gates/pepgent28-web06.md`“五、处置结果”。

**事实（(D) 文档或源码原文，(R) 命令输出）：**
- (D) D7-13：“`nodeBindingCount`：默认环境是用这个镜像的模板的节点函数个数”（`D7-lab-backend.md:73`）。D5-10：生效 env 依次取调用覆盖、节点函数的默认模板、`central`（`D5-plugins-eval.md:85`）。
- (D) Pepgent main `apps/web/src/protocol/lab/library.ts:29-31`：`NodeDefinition` 有 `defaultEnvironment: string | null`（“Exact source expression, or null when the constructor declares no environment”）与 `template: TemplateName | null` 两个字段；D12 同形（`D12-lab-wire.md:239`）。
- (D) Pepgent main `apps/web/src/server/lab/library-definition.ts:113-125`：`defaultEnvironment` 取节点构造 `env` 选项的源码原文；`template` 只在 Agent 节点取 `template` 选项，Agent 必须给出。
- (D) Pepgent/soroi main `packages/omp-soroi/src/eval/node.ts:19-20,25,36-37`：`env?: Template`，`Template` 是“Name of an environment template registered in remote”；Agent 的 `template` 是“omp agent definition the subagent runs as”。Pepgent/lab-library main `nodes/review.ts` 写 `{ template: "review" }`，即 agent 定义名。
- (D) 照 D38-03 v1 字面：Program 节点的 `template` 恒为 null，从不计入；Agent 节点以 agent 定义名与 remote 模板名比较。
- 容器页投影归 W-10（`features/lab-containers/model/**`、`client/**`，D20-01）；`NodeDefinition` 导出归 W-09，本行不改导出。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D40-01 v1 | 容器页 `nodeBindingCount` 按节点默认环境（`NodeDefinition.defaultEnvironment`）计，取代 D38-03 v1 中按 `NodeDefinition.template` 计的一项 | D38-03 v1 的 `how`“容器页（W-10）”`nodeBindingCount` 一项；D7-13（`D7-lab-backend.md:73`）回写；容器页投影（W-10，`features/lab-containers/model/**`、`client/**`） | D38-03 v1 的 `nodeBindingCount` 一项改为：`containers.definitions` 中默认环境属于“用这个镜像的模板”的节点函数个数（D7-13）。默认环境取 `NodeDefinition.defaultEnvironment`，即节点构造 `env` 选项的源码原文；原文是字符串字面量时取其值作模板名，与匹配模板的 `TemplateInfo.name` 比较；为 null 的节点不计入。`NodeDefinition.template` 是 Agent 节点运行的 omp agent 定义，不用于本项。<br>D38-03 的其余内容（`ImageDefinition.name`、引用归一、`liveContainers`、`resources`、模板挂载）不变。wire 形状不变，W-09 的导出不变。D38 归档回写 D7-13 时，`nodeBindingCount` 按本行写。 | **得到：** 计数对象与 D7-13 的“默认环境”、soroi 节点构造的 `env` 语义一致；Program 节点按其默认模板计入。<br>**代价：** W-10 需从源码原文取字符串字面量的值；默认环境写成非字面量表达式的节点不计入。<br>**落选：**<br>- 维持 D38-03 v1 按 `template` 计：该字段是 Agent 的 omp agent 定义，Program 节点恒为 null，与 D7-13 不是同一事实。<br>- 作为笔误在回写时改正：改变照文实现的结果并新增取值规则，属公开语义，不能免表决（`AGENTS.md:123`）。<br>- 让 W-09 在导出中把默认环境解析成模板名字段：改 wire 与 W-09 范围，超出更正所需。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD40）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D40-Coordination.md`、`votes/D40-ClaudeHigh.md`、`votes/D40-Argon.md`、`votes/D40-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。