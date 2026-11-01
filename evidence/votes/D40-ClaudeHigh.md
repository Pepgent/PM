# D40 选票：ClaudeHigh

议程：D38-03 更正：容器页 nodeBindingCount 按节点默认环境计，不按 NodeDefinition.template（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D40-01 v1：赞成（ClaudeHighD40，2026-11-01T21:23:43.828Z）



# D40-01 v1 — ClaudeHigh（ClaudeHighD40）：赞成

从空白历史出发，读了 D40 立案正文（`/tmp/desk38r/D-d38-03-nodebinding.yaml`）、D38-03 v1 行（`/tmp/desk38r/D38-03-v1-row.yaml`）、PM `evidence/gates/pepgent28-web06.md` 第五、六节，以及 `/tmp/desk38r/` 下 Pepgent、soroi main 快照的源码。

## steady（契约闭合）

1. **字段语义与 D7-13 一致。** D7-13（`D7-lab-backend.md:73`）写的是“默认环境是用这个镜像的模板的节点函数个数”。soroi `packages/omp-soroi/src/eval/node.ts:19-20,25,49-50,55-56`：`env?: Template` 是“Name of an environment template registered in remote”；Agent 的 `template` 是“omp agent definition the subagent runs as”（`:36-37`）。按 `template` 计数统计的是另一种关系，所以本行的更正成立。
2. **数据都在本页 wire 上。** `protocol/lab/pages.ts:204`：`containers.definitions: NodeDefinition[]`；`protocol/lab/library.ts:29-30`：`defaultEnvironment: string | null` 是“Exact source expression”。`server/lab/library-definition.ts:121` 用 `property.initializer.getText(source)` 取 `env` 选项的原文，所以字符串字面量导出后带引号，必须“取其值”。本行明确写了这一步，W-10 照文实现能得到模板名。
3. **比较对象与现有客户端一致。** 生效 env 的取值顺序是调用覆盖、节点默认、`central`（D5-10，`D5-plugins-eval.md:85`；soroi `execute.ts:182`）。`central` 不是 remote 模板：`check.ts:430` 只把非 `central` 的名字加入 remote 集合，`execute.ts:183` 直接走中心。因此 `defaultEnvironment` 为 null 的节点不属于任何 remote 模板，“不计入”与 D7-13 的“用这个镜像的模板”一致。Pepgent 客户端已经用 `template.name === env` 把 env 与 `TemplateInfo.name` 对应（`client/services/lab/project-experiment.ts:52-55`），本行沿用同一个键，没有另立第二套约定。
4. **Human 节点。** 构造参数只能有 1 个（`library-definition.ts:79`），`defaultEnvironment` 恒为 null，不计入；soroi `node.ts:61` 中 `env: undefined`，两边一致。
5. **范围。** wire 形状、W-09 导出、白名单和切片归属都不变。D38-03 的其余内容不受影响，主路径没有断点或依赖顺序问题。

## divergent（更简方案）

- 落选项“W-09 导出解析好的模板名”需要改 wire，并扩大 W-09 的范围；用 soroi 求值得到 env 又违反 D10-11(c) 的“静态导出、不执行”。只取字面量是最小、零等待的做法。我没有找到更简明的主路径。

## 附带建议（不构成反对，不影响本行）

- **同一误读出现在其他页的覆盖审计，建议另立一项，与本行同域合并。** `D12-coverage.md:232,234,258,261` 把流程编辑器 `palette[].device/availability`、节点库 `definitions[].device/image/cluster/devicePath` 都写成“Def.template 关联 templates”；`:445` 的 G26 注释同样写“按 Def.template”。这些与本行认定的事实冲突，最好按同一规则（`defaultEnvironment` 字面量 → `TemplateInfo.name`）一并更正。D38 归档回写 D7-13 时，`D12-coverage.md:445` 的注释也应同步，免得文档里同时留下两种关联规则。
- **wire 注解的不一致，供 W-09 拥有方参考。** `protocol/lab/library.ts:31` 把 `template` 定为 `TemplateNameSchema`（remote 模板名），本行认定它是 omp agent 定义名；D12（`D12-lab-wire.md:239`）同形。本行不改 wire，不受影响。

