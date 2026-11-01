# 闸门 A 裁决：`NodeDefinition.template` 被当作 remote 模板名的跨组件契约纠偏

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)（`D40`）、[Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（`WEB-07`），`PM/evidence/gates/node-template-field.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86`：已有前端界面接通后端与 e2e 全流程走通，功能不收缩）。
  - `(D)` `SOR/AGENTS.md:26,60,123`（D1-12、C2-2、D10-08）、`SOR/design/node.md`、`DEC/D5-plugins-eval.md:85,92,105,108-110`（D5-10、D5-17）、`DEC/D7-lab-backend.md:73,96,221`（D7-13、P1）、`DEC/D8-mvp-scope.md:147,341`（F28 S2、WEB-07）、`DEC/D12-lab-wire.md:59,102,230,239`、`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:21`（D35-02 v3）、`DEC/D40-d38-03-node-binding-default-env.md`。

---

## 一、闸门 A 总体判定

- **分类与程序结论：** **属 K4（已通过决策正文 `D12`、`D35-02 v3` 与跨组件公开契约语义纠偏），依 `SOR/AGENTS.md:123` 必须经议会表决；同意按 `D1-12` 立为 P1 议案，并完全同意材料第三节的候选主案。**

---

## 二、对第四节“闸门 A”三问的逐项回答

1. **“`NodeDefinition.template` = omp agent 定义名，节点的 remote 模板 = `defaultEnvironment`”是否就是 D5-10、D5-17、D7-13 与 D7 P1 的原意？**
   - **答复：** **是，完全是 `D5-10`、`D5-17`、`D7-13`、`D7 P1` 与 `SOR/design/node.md` 的原意。**
   - 按 `DEC/D5-plugins-eval.md:85,92` 与 `OS/eval/node.ts:19-56`，`template` 仅存在于 `Agent` 节点构造器 `agent(prompt, { template, env? })`，表示子进程运行所用的 omp agent 定义名（`.omp/agents/<name>.md`）；而所有节点构造器的 `env` 选项（导出为 `NodeDefinition.defaultEnvironment`）才是 `D5-10` 所称“节点函数的默认模板”（即 `remote` 环境模板名）。把 `NodeDefinition.template` 标为 `remote` 的 `TemplateName` 并用于关联 `templates` 确系对 `D5-17` 的误读。

2. **改 D12 类型、改 D35-02 v3 的泳道依据，是否触及公开契约或已通过正文，因此须表决？**
   - **答复：** **是，触及已通过正文与跨席位公开语义（K4），必须立议案表决（同意按 P1 立案）。**
   - 更正既修改了已通过的 `DEC/D12-lab-wire.md:230,239`（`NodeDefinition.template` 由 `TemplateName | null` 改为 `string | null`，`P/library.ts:31` 改为 `z.string().nullable()`）与 `D35-02 v3`（`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:21`、`DEC/D12-lab-wire.md:59` 泳道关联依据由 `NodeDefinition.template` 改为 `NodeDefinition.defaultEnvironment`），也改变了 `W-10` 四处投影（`C-3` `project-experiments.ts`、`C-4` `project-flow-editor.ts`、`C-5` `project-node-library.ts`、`C-6` `project-experiment.ts`）的关联结果（使声明了 `env` 的 `Program`/`Agent` 节点均按 `defaultEnvironment` 字符串字面量值关联 `TemplateInfo.name`，与 `D40-01` 规则完全统一）。依 `SOR/AGENTS.md:123` 不得作为笔误免票单改。

3. **当前 lab-library 没有节点声明 `env`，更正后计划条和面板设备都会为空。这是否违背 D7:96 时间轴的意图，还是属于 lab-library 内容的问题、不在本议题内？**
   - **答复：** **不违背 `D7:96` 时间轴与 `D35-02 v3` 的意图。**
   - 按 `D5-10`（`DEC/D5-plugins-eval.md:85`），未声明 `env` 的节点默认运行在 `central`（不绑定 `remote` 硬件设备模板）；而 `D35-02 v3`（`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:21`）本来就明文规定“**定义未绑模板或模板无设备时不画计划条**”。当节点声明了绑定设备的 `remote` 模板 `env` 时，更正后的规则即可正确画出计划条并投影面板设备；当前 `lab-library` 种子节点是否声明 `env` 属于种子库内容，不在本项协议与投影纠偏范围内。
