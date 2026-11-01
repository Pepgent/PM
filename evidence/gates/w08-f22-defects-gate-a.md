# 闸门 A 裁决：soroi#250（E2E-13）W-08 登记的两项产品缺陷（sidecar 缺 `role`；批次提醒缺 `purpose` 组头）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（评论 `6562476097`），`PM/evidence/gates/w08-f22-defects.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，严禁降级或收缩验收判据）。
  - `(D)` `SOR/design/subagent.md:40`、`SOR/design/eval.md:221`、`DEC/D5-plugins-eval.md:88,106,163-175,278-286,383`（D5-13、D5 §3.1、D5 §3.5）、`DEC/D8-mvp-scope.md:141,271,275,361`（F22 ⑦、SOR-08、SOR-12、E2E-13）、`DEC/D11B-solo-ruling-review.md:10`（D11-37）。

---

## 一、闸门 A 判定结论

- **是否越界：** **不越界（两项均属已通过契约 `D5`、`D8` 与 `design/subagent.md:40`、`design/eval.md:221` 的工程实现偏差，不触及新产品意图或公开契约变更，可免票在 `Pepgent/soroi` 为 `W-07` 建立缺陷修复承载 issue）。**
- **意图裁决与 `(U)` 依据：**
  - **【定】`LaunchRecipe`（`<id>.soroi.json`）携带 `role` 字段，以及批次释放后的未消费提醒按 `purpose` 组头（`- 批次「<purpose>」（已全部正式运行）`）分组缩进呈现，均是 `design/subagent.md:40`、`design/eval.md:221` 与 `D5`、`D8` F22 ⑦ 已定基线；严禁通过降级 `f22.spec.ts` 断言迁就实现偏差（`U2`、`U23`），必须由 `W-07` 在 `packages/omp-soroi/**` 内按已通过契约修复。**

---

## 二、对 `A-1` 至 `A-3` 的逐问回答

- **A-1（缺陷 1：sidecar 补写 `role`）：** **是，属于恢复已通过契约，不构成新增或修改公开契约。**
  - `DEC/D5-plugins-eval.md:163-175,383` 与 `SOR/design/subagent.md:40` 已明文规定 `<id>.soroi.json` 启动配方包含 `role`（`Main | LocalChild | RemoteChild`）。`supervisor.ts:71-81,1000-1010` 漏写该字段属实现遗漏，由 `W-07` 补齐即可。
- **A-2（缺陷 2：批次提醒改为 `purpose` 组头加缩进）：** **是，属于恢复已通过契约，且不改变 `D11-37` 的注入点和条目形状。**
  - `DEC/D5-plugins-eval.md:88,278-286`（D5-13 与 §3.5 示例）及 `SOR/design/eval.md:221` 已明文规定批次产出按批次分组、组头为 `- 批次「<purpose>」（已全部正式运行）` 并在其下缩进列出同批 atom 行（`- 名字 = 预览 ← fn(参数) @env`）。`reminder.ts:31-40` 写成平铺行尾附注偏离了 `D5-13` 与 `D5 §3.5`，由 `W-07` 修复提醒文本排版即可，`D11-37` 的注入点与 `{ text }` 结构保持不变。
- **A-3（F22 验收语义不降级）：** **是，完全成立。**
  - `D8` F22 ⑦（`DEC/D8-mvp-scope.md:141`）明文要求“下一候选提醒一次列全批产出、组头 purpose”，`f22.spec.ts` 对 sidecar `role` 与提醒 `purpose` 组头的断言均在已通过的验收语义之内，严禁降级判据（`(U) U2`、`U23`）。
