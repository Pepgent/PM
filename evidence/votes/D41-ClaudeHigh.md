# D41 选票：ClaudeHigh

议程：NodeDefinition.template 是 omp agent 定义名：更正 D12 类型与 D35-02 v3 泳道依据，节点的 remote 模板取 defaultEnvironment（[Pepgent/PM#60](https://github.com/Pepgent/PM/issues/60)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D41-01 v1：赞成（ClaudeHighD41，2026-11-01T21:46:54.342Z）



# D41 ClaudeHigh 选票（ClaudeHighD41，空白历史）

核对基线：PM `evidence/gates/node-template-field{,-gate-a,-gate-b}.md`、`evidence/decisions/D5-plugins-eval.md`、`D12-lab-wire.md`、`D35-pepgent-26-web03-timeline-plan-defs.md`、`D40-d38-03-nodebinding-default-env.md`；源码为 `/tmp/deskntf/` 下 gh api 取得的 soroi、Pepgent、lab-library main 快照（只读）。

## D41-01 v1：赞成

**steady（契约闭合）：**
- soroi `packages/omp-soroi/src/eval/node.ts:19-20,25,36-37,47-56`：所有节点只有 `env: Template | undefined` 指向 remote 模板（注释 “Name of an environment template registered in remote”）；`template: string` 仅在 `AgentFn` 上，注释 “omp agent definition the subagent runs as”。执行端 `execute.ts:182-187` 用 `override ?? metadata.env ?? CENTRAL_ENV` 去 `remote templates` 目录查模板，从不用 `template`。这与 D5-10、D5-17（`D5-plugins-eval.md:85,92`）一致，D12 现行 `template: TemplateName | null`（`D12-lab-wire.md:250`）与之冲突，本行更正方向正确。
- Pepgent `protocol/lab/external/remote.ts:6`：`TemplateNameSchema = z.string()`，没有品牌。`library.ts:31` 改为 `z.string().nullable()` 后，wire 与运行时校验不变；W-10 现有 `templates.get(definition.template)` 等写法在 D41-02 落地前仍能编译，W-09 与 W-10 的改动没有先后锁。
- 导出端 `server/lab/library-definition.ts:121-122` 对 `env`、`template` 都取 `getText` 源码原文，本行按“源码原文”定义两字段，与实现一致；lab-library `nodes/review.ts:14`、`text_only.ts:10`、`try_eval.ts:17` 都是 agent 定义名字面量。
- 全仓 `apps/web/src` 中 `NodeDefinition.template` 的消费方只有 C-3～C-6 四处投影（由 D41-02 改）和节点库“容器”分区的原样显示（`project-node-library.ts:36`、`node-library-view-model.ts:167`），没有消费方把它与 `AgentTemplateWire.id` 关联，所以“原文带引号”不构成主路径断裂。

**divergent：** 另造品牌类型或在导出端去引号都要多改 wire 或 W-09 范围，本行“只改类型名与注释”已是最小改动。

**附注（不影响赞成）：** D12 当前该行在 `D12-lab-wire.md:250`，材料写 `:239`，回写按内容定位即可。

## D41-02 v2：赞成

**steady（契约闭合）：**
- 关联键正确：节点实际运行的 remote 模板就是 `env`（`execute.ts:182-187`），D41-02 把四处投影的关联键从 `template` 改为 `defaultEnvironment`，与 D40-01（容器页 `nodeBindingCount`，`D40-…md:21`）的取值规则一致，节点库、流程编辑器、计划条、容器页四类页面共用同一个关联键。
- v2 把 null 与非字面量分开处理，与 D5-10 和 soroi 一致：只有缺默认模板时才落到 `central`（`execute.ts:182`），而 `env: someConst` 在运行时会选到真实的 remote 模板。v2 只说“由模板派生的字段为空”，不认定落在 `central`，因此不和运行事实矛盾。LeadMentor 对 v1 的反例已被吸收。
- 覆盖完整：`apps/web/src` 里由节点定义去找 `templates` 的位置恰好是 `project-experiments.ts:100,104`（计划条门控与泳道）、`project-flow-editor.ts:47-48,67-78`（`devicesOf`/queued 占用、`device`、`availability`、`computeCluster`）、`project-node-library.ts:94-107`（`device`/`image`/`cluster`/`devicePath`/`mounts`）、`project-experiment.ts:282-289`（草稿节点 `device`）。本行列出的字段与这些位置一一对应，没有遗漏。flow editor 中 busy 判定读的是 `slot.state.env`，与已提交调用的 `Call.env.template`（`project-experiments.ts:123`）一样，本来就是 remote 模板，本行保持不变，这样处理正确。
- D35-02 v3 的 how 中只有“泳道由 `NodeDefinition.template` 经 `templates` 的设备（P3）确定”这一句引用 `template`（D35 定稿第 21 行），其余条目不涉及该字段。本行替换这一句后，D35-02 v3 不会留下自相矛盾的条目。新增的“没有关联到模板的节点仍参与依赖累计，但不画计划条”与现行 `finishOf` 对全部草稿节点累计的做法一致。
- 字面量 `env: "central"` 按规则取值为 `central`，与 `TemplateInfo.name` 比较时匹配不到任何模板，派生字段为空，与它实际在中心运行的事实一致。Human 构造器不接收选项（`node.ts:59-61`），`defaultEnvironment` 恒为 null，不会产生错误关联。

**divergent（更简主路径）：** 我考虑过让 W-09 在导出时求出模板名字段。这样做要改 wire 和 W-09 的范围，还会和已通过的 D40-01（由 W-10 取字面量值）形成两种取值做法。本行由 W-10 在在制的 WEB-07 里一次改完四处投影，不新增席位，也不需要跨席位等待，已经是吞吐最高的路径。lab-library 当前没有节点声明 `env`，所以这些字段暂时为空；这是库内容的问题，闸门 A 已经判定它不在本议题内，不构成功能收缩。


## D41-02 v2：赞成（ClaudeHighD41，2026-11-01T21:46:54.342Z）



# D41 ClaudeHigh 选票（ClaudeHighD41，空白历史）

核对基线：PM `evidence/gates/node-template-field{,-gate-a,-gate-b}.md`、`evidence/decisions/D5-plugins-eval.md`、`D12-lab-wire.md`、`D35-pepgent-26-web03-timeline-plan-defs.md`、`D40-d38-03-nodebinding-default-env.md`；源码为 `/tmp/deskntf/` 下 gh api 取得的 soroi、Pepgent、lab-library main 快照（只读）。

## D41-01 v1：赞成

**steady（契约闭合）：**
- soroi `packages/omp-soroi/src/eval/node.ts:19-20,25,36-37,47-56`：所有节点只有 `env: Template | undefined` 指向 remote 模板（注释 “Name of an environment template registered in remote”）；`template: string` 仅在 `AgentFn` 上，注释 “omp agent definition the subagent runs as”。执行端 `execute.ts:182-187` 用 `override ?? metadata.env ?? CENTRAL_ENV` 去 `remote templates` 目录查模板，从不用 `template`。这与 D5-10、D5-17（`D5-plugins-eval.md:85,92`）一致，D12 现行 `template: TemplateName | null`（`D12-lab-wire.md:250`）与之冲突，本行更正方向正确。
- Pepgent `protocol/lab/external/remote.ts:6`：`TemplateNameSchema = z.string()`，没有品牌。`library.ts:31` 改为 `z.string().nullable()` 后，wire 与运行时校验不变；W-10 现有 `templates.get(definition.template)` 等写法在 D41-02 落地前仍能编译，W-09 与 W-10 的改动没有先后锁。
- 导出端 `server/lab/library-definition.ts:121-122` 对 `env`、`template` 都取 `getText` 源码原文，本行按“源码原文”定义两字段，与实现一致；lab-library `nodes/review.ts:14`、`text_only.ts:10`、`try_eval.ts:17` 都是 agent 定义名字面量。
- 全仓 `apps/web/src` 中 `NodeDefinition.template` 的消费方只有 C-3～C-6 四处投影（由 D41-02 改）和节点库“容器”分区的原样显示（`project-node-library.ts:36`、`node-library-view-model.ts:167`），没有消费方把它与 `AgentTemplateWire.id` 关联，所以“原文带引号”不构成主路径断裂。

**divergent：** 另造品牌类型或在导出端去引号都要多改 wire 或 W-09 范围，本行“只改类型名与注释”已是最小改动。

**附注（不影响赞成）：** D12 当前该行在 `D12-lab-wire.md:250`，材料写 `:239`，回写按内容定位即可。

## D41-02 v2：赞成

**steady（契约闭合）：**
- 关联键正确：节点实际运行的 remote 模板就是 `env`（`execute.ts:182-187`），D41-02 把四处投影的关联键从 `template` 改为 `defaultEnvironment`，与 D40-01（容器页 `nodeBindingCount`，`D40-…md:21`）的取值规则一致，节点库、流程编辑器、计划条、容器页四类页面共用同一个关联键。
- v2 把 null 与非字面量分开处理，与 D5-10 和 soroi 一致：只有缺默认模板时才落到 `central`（`execute.ts:182`），而 `env: someConst` 在运行时会选到真实的 remote 模板。v2 只说“由模板派生的字段为空”，不认定落在 `central`，因此不和运行事实矛盾。LeadMentor 对 v1 的反例已被吸收。
- 覆盖完整：`apps/web/src` 里由节点定义去找 `templates` 的位置恰好是 `project-experiments.ts:100,104`（计划条门控与泳道）、`project-flow-editor.ts:47-48,67-78`（`devicesOf`/queued 占用、`device`、`availability`、`computeCluster`）、`project-node-library.ts:94-107`（`device`/`image`/`cluster`/`devicePath`/`mounts`）、`project-experiment.ts:282-289`（草稿节点 `device`）。本行列出的字段与这些位置一一对应，没有遗漏。flow editor 中 busy 判定读的是 `slot.state.env`，与已提交调用的 `Call.env.template`（`project-experiments.ts:123`）一样，本来就是 remote 模板，本行保持不变，这样处理正确。
- D35-02 v3 的 how 中只有“泳道由 `NodeDefinition.template` 经 `templates` 的设备（P3）确定”这一句引用 `template`（D35 定稿第 21 行），其余条目不涉及该字段。本行替换这一句后，D35-02 v3 不会留下自相矛盾的条目。新增的“没有关联到模板的节点仍参与依赖累计，但不画计划条”与现行 `finishOf` 对全部草稿节点累计的做法一致。
- 字面量 `env: "central"` 按规则取值为 `central`，与 `TemplateInfo.name` 比较时匹配不到任何模板，派生字段为空，与它实际在中心运行的事实一致。Human 构造器不接收选项（`node.ts:59-61`），`defaultEnvironment` 恒为 null，不会产生错误关联。

**divergent（更简主路径）：** 我考虑过让 W-09 在导出时求出模板名字段。这样做要改 wire 和 W-09 的范围，还会和已通过的 D40-01（由 W-10 取字面量值）形成两种取值做法。本行由 W-10 在在制的 WEB-07 里一次改完四处投影，不新增席位，也不需要跨席位等待，已经是吞吐最高的路径。lab-library 当前没有节点声明 `env`，所以这些字段暂时为空；这是库内容的问题，闸门 A 已经判定它不在本议题内，不构成功能收缩。

