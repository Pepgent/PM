# D41 选票：Argon

议程：NodeDefinition.template 是 omp agent 定义名：更正 D12 类型与 D35-02 v3 泳道依据，节点的 remote 模板取 defaultEnvironment（[Pepgent/PM#60](https://github.com/Pepgent/PM/issues/60)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D41-01 v1：赞成（Argon-2，2026-11-01T21:29:07.296Z）



### 意图裁决（本席说了算）
- 无（`D41-01 v1` 与 `D41-02 v1` 均标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D41-01 v1（串联，缺失部分或设计补充：否）：赞成（`approve`）。**
  - **理由与依据：** 按 `DEC/D5-plugins-eval.md:85,92`（`D5-10`、`D5-17`）与 `design/node.md`、`packages/omp-soroi/src/eval/node.ts:19-56`，`template` 仅在 `Agent` 节点构造器中表示子进程运行的 omp agent 定义名（`.omp/agents/<name>.md`），而 `env`（导出为 `NodeDefinition.defaultEnvironment`）才是节点的 `remote` 默认环境模板名。将 `D12`（`D12-lab-wire.md:239`）与 `apps/web/src/protocol/lab/library.ts:29-31` 中 `NodeDefinition.template` 的类型由 `TemplateName | null`（`TemplateNameSchema.nullable()`）更正为 `string | null`（`z.string().nullable()`）并补齐两字段注释，彻底消除把 agent 定义名误作 `remote` 模板名的根源（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。
- **D41-02 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 将节点定义关联 `remote` 模板的依据统一改用 `NodeDefinition.defaultEnvironment`（与 `D40-01` 相同：源码原文为字符串字面量时取其值与 `TemplateInfo.name` 匹配，否则落在 `central`、派生字段为空），取代 `D35-02 v3`（`D12-lab-wire.md:59`）中的 `NodeDefinition.template` 并统一应用于 `WEB-07`（`Pepgent#29`）承接的四处投影（`project-experiments.ts`、`project-flow-editor.ts`、`project-node-library.ts`、`project-experiment.ts`），使声明了 `env` 的 `Program` 与 `Agent` 节点均能正确关联泳道、设备、镜像、集群与挂载，完全符合 `D5-10`、`D7-13`、`D7:96` 与 `D35-02 v3` 原意（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。

### 否决（一票否决权）
- 无（`D41-02 v1` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23` 及 `D5`、`D7`、`D12`、`D35`、`D40`、`design/node.md` 完全一致，本席不行使否决权）。


## D41-02 v1：赞成（Argon-2，2026-11-01T21:29:07.296Z）——作废：该行已修订到 v2



### 意图裁决（本席说了算）
- 无（`D41-01 v1` 与 `D41-02 v1` 均标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D41-01 v1（串联，缺失部分或设计补充：否）：赞成（`approve`）。**
  - **理由与依据：** 按 `DEC/D5-plugins-eval.md:85,92`（`D5-10`、`D5-17`）与 `design/node.md`、`packages/omp-soroi/src/eval/node.ts:19-56`，`template` 仅在 `Agent` 节点构造器中表示子进程运行的 omp agent 定义名（`.omp/agents/<name>.md`），而 `env`（导出为 `NodeDefinition.defaultEnvironment`）才是节点的 `remote` 默认环境模板名。将 `D12`（`D12-lab-wire.md:239`）与 `apps/web/src/protocol/lab/library.ts:29-31` 中 `NodeDefinition.template` 的类型由 `TemplateName | null`（`TemplateNameSchema.nullable()`）更正为 `string | null`（`z.string().nullable()`）并补齐两字段注释，彻底消除把 agent 定义名误作 `remote` 模板名的根源（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。
- **D41-02 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 将节点定义关联 `remote` 模板的依据统一改用 `NodeDefinition.defaultEnvironment`（与 `D40-01` 相同：源码原文为字符串字面量时取其值与 `TemplateInfo.name` 匹配，否则落在 `central`、派生字段为空），取代 `D35-02 v3`（`D12-lab-wire.md:59`）中的 `NodeDefinition.template` 并统一应用于 `WEB-07`（`Pepgent#29`）承接的四处投影（`project-experiments.ts`、`project-flow-editor.ts`、`project-node-library.ts`、`project-experiment.ts`），使声明了 `env` 的 `Program` 与 `Agent` 节点均能正确关联泳道、设备、镜像、集群与挂载，完全符合 `D5-10`、`D7-13`、`D7:96` 与 `D35-02 v3` 原意（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。

### 否决（一票否决权）
- 无（`D41-02 v1` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23` 及 `D5`、`D7`、`D12`、`D35`、`D40`、`design/node.md` 完全一致，本席不行使否决权）。


## D41-02 v2：赞成（Argon-2，2026-11-01T21:41:40.712Z）



### 意图裁决（本席说了算）
- 无（`D41-02 v2` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D41-02 v2（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **将节点定义关联 `remote` 模板的依据统一改用 `NodeDefinition.defaultEnvironment`，并严格区分 `null` 与非字面量表达式（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `DEC/D5-plugins-eval.md:85,92`、`DEC/D12-lab-wire.md:59`、`design/node.md`）：**
       - `defaultEnvironment` 原文为字符串字面量时取其值与 `TemplateInfo.name` 匹配，用于 `D35-02 v3` 泳道计划条及 `WEB-07`（`Pepgent#29`）承接的四处投影（`project-experiments.ts`、`project-flow-editor.ts`、`project-node-library.ts`、`project-experiment.ts`），与 `D40-01` 完全一致；
       - 将 `defaultEnvironment === null`（未声明默认环境，无覆盖时按 `D5-10` 落在 `central`）与非字面量表达式（本版不静态识别模板、派生字段为空，但运行时实际环境仍由 `eval` 按 `D5-10` 权威决定，不宣称落在 `central`）分开表述，完整清零 `LeadMentor` 在 v1 提出的反例。

### 否决（一票否决权）
- 无（`D41-02 v2` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23` 及 `D5`、`D7`、`D12`、`D35`、`D40`、`design/node.md` 完全一致，本席不行使否决权）。

