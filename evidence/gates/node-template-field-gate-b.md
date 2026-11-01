# `NodeDefinition.template` 被当作 remote 模板名 — 组织、白名单与提案路由审查意见（`node-template-field-gate-b.md`）

- **对应初审材料：** `evidence/gates/node-template-field.md`（`DeskNodeTemplateField`）
- **审查席位：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–143 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核实不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:27-36`（`D16-03`、`D16-04`、`D16-09`、`D16-11`）、`evidence/decisions/D20-w10-path-boundary.md`、`evidence/decisions/D35-pepgent-26-web03-timeline-plan-defs.md:21`、`Pepgent/Pepgent` `apps/web/src/protocol/lab/library.ts:1-45` 及 `Pepgent/Pepgent#30`。

---

## 零、程序性质界定（非工程师 `BLOCKED`，不设 `P0` 或事前放行锁）

- `node-template-field.md:3,100` 明示本项系 `DeskD38Revise` 处理 `D40`（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）时发现的同源跨组件契约/投影误读，**“这里没有工人 `BLOCKED`，不进 `P0`”**。
- 按 `.omp/agents/argon-governance.md:19-21`（§6）与 `AGENTS.md:58-60`（C2-2.2），正交双闸门的事前放行锁仅适用于工程师上报的 `BLOCKED`；本文件作为**非阻塞治理、路径白名单与提案路由审查意见**回答第四节四项问题，不设阻塞工人推进的前置锁，也不替 `Argon`（`Argon-2`）裁决 `D5`/`D7`/`D12` 产品原始意图。

---

## 一、对第四节四项问题的逐项结论

| # | 问题 | 结论 | 组织、路径白名单、阶段与提案队列依据 |
|---|---|---|---|
| **1** | `W-09` 改 `apps/web/src/protocol/lab/library.ts`、`W-10` 在 `WEB-07`（`Pepgent#29`）改 `apps/web/src/client/services/lab/**` 四个投影，是否都在 `D16-09`、`D20-01` 的白名单内，不改切片归属？ | **合规（均在既有白名单内，不改切片归属）** | 1. **`W-09` 路径白名单：** 经独立直读 `apps/web/src/protocol/lab/library.ts:20-40`，将第 31 行 `template` 类型由 `TemplateNameSchema.nullable()` 改为 `z.string().nullable()` 并补注释，完全位于 `D16-03④` 与 `D16-09` 授予 `W-09`（`pepgent-lab`）的 `apps/web/src/protocol/lab/**` 唯一写方白名单内。<br>2. **`W-10` 路径白名单与切片归属：** `C-3`～`C-6`（`apps/web/src/client/services/lab/{project-experiments,project-flow-editor,project-node-library,project-experiment}.ts`）全部位于 `D20-01` 授予 `W-10`（`pepgent-web`）的 `apps/web/src/client/**` 白名单内。因 `WEB-03`（`#26`）、`WEB-04`（`#27`）、`WEB-05`（`#25`）已 CLOSED，由同一 `W-10` 席位在制的 `WEB-07`（[Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)）一并承载这四处投影更正、不另开新 `W-10` 切片，符合 `D16-09`、`D20-01` 与 `AGENTS.md` C4-2。 |
| **2** | `W-09` 没有在制 issue，由协调席按 `D16-04` 补承载，是否合规？ | **合规（待议案表决通过后补建或并入 `W-09` 承载 issue）** | 经核对 `Pepgent/Pepgent` 当前 OPEN issues（`#3`、`#23`、`#28`、`#29`、`#30`，其中 `#30` 为 `W-10` 的 `E2E-20`），`W-09` 原切片已全部关闭。待本议案表决通过后，由协调席/秘书按定稿在 `Pepgent/Pepgent` 补建 `W-09` 承载 issue（或与 `D38-02 v2` 的 `W-09` 改动并入同一 `W-09` 承载 issue，依 `D16-11③` 同一席位关联切片可在同一 PR 中合并提交），再由 `Main` 新开一次性 `AreaMgrPepgent` 送达 `W-09`（待实际 `peer_send` 并经 `peer_ask` 或工作空间观察确认后方记为已送达，遵循 `C4-1`/`C4-2`），符合 `D16-04` 与 `LEDGER.md` `D28`/`D32` 既有先例。 |
| **3** | 是否必须表决，优先级定 `P1` 是否符合 `D1-12`？是否需要加 `governance`？ | **必须表决；定 `P1`（跨组件接缝纠偏）且不加 `governance`（4 席契约行）符合 `D1-12`** | 1. **必须表决（`AGENTS.md:123`、`D10-08`）：** 本项需修订已通过决策 `D12`（`NodeDefinition.template` 类型）与 `D35-02 v3`（泳道计划条关联字段，由 `NodeDefinition.template` 改为 `NodeDefinition.defaultEnvironment`），并改变 `Program` 与 `Agent` 节点在四个投影中的实际关联结果，与 `D40`（`Pepgent/PM#59`）同源，严禁作为笔误单方回写，必须走 `council propose` 表决。<br>2. **优先级与 `domains`（`AGENTS.md` D1-12、C2-3）：** 因无工人 `BLOCKED`，严禁立为 `P0`；作为跨 `soroi` eval 与 `Pepgent` Lab wire/投影的**跨组件接缝纠偏**定为 **`P1`** 完全符合 `D1-12`（`P0→P1→P2→P3`）。由于 `W-09` 与 `W-10` 均在既有 `D16-09`/`D20-01` 白名单内实现、不修改席位路径白名单或管理层组织规则，按 `P1` 立案时**不加 `domains: [governance]`（4 席契约行）**。（注：若提案方将某行单独定为 `P2`“PM 错误路径清理”，依 `AGENTS.md` D1-12 第 18、23、26–27 行规定，所有 `P2` 事项必带 `domains: [governance]` 5 席；按当前 `P1` 跨组件接缝纠偏立案则为 4 席。） |
| **4** | 表决期间 `W-10` 是否只暂停 `C-3` 至 `C-6` 中“由定义找模板”的部分，`WEB-07` 其余部分照常？ | **合规（不阻塞 `WEB-07` 其余全部接线推进）** | 按 `D10-08` 与 `C1-3`（`U83` 反设卡原则），`P1` 议案表决期间严禁冻结 `WEB-07`（`Pepgent#29`）：`W-10` 仅不在表决通过前自行改写 `C-3`～`C-6` 中“由节点定义找模板”的四处关联逻辑，`WEB-07` 的其余全部页面接线与投影照常推进。 |
