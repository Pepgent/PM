# 闸门 A 裁决：Pepgent#29（WEB-07）第二次部分 BLOCKED（AI 面板失败文案）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（[评论 6565014238](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6565014238)），`local://decisions/pepgent29-blocked-2.md`
- **总体结论：** **候选 `(a)`【不越界】（K1+K3），推荐按候选 `(a)` 直接交付、免票放行；候选 `(b)`【越界】，不采用 `(b)` 与 `(c)`。**

---

## 逐项判定与依据

### 1. QA1：按候选 `(a)` 交付（AI 面板内失败不显示原因，发送失败保留草稿，读取失败消息/模型为空）

- **判定：【不越界】（K1 + K3），不触及产品原始意图或公开契约，免票放行。**
- **依据：**
  1. **无任何 `(U)` 或已通过决策要求 `AiPanel` 展示失败文案：** 核对 `SOR/LEDGER.md` 全部用户原话及 `D7`、`D8`、`D12`、`D12-coverage`、`D20`、`D45` 正文，没有任何条款要求 `AiPanel` 渲染命令拒绝或读取失败的原因文案。
  2. **符合只写主路径规则与覆盖审计范围：** `SOR/.claude/rules/design-assumes-it-works.md` 明文规定“设计阶段只写主路径：禁止考虑边缘情况和竞态处理。不为异常输入、失败分支……设计任何处理，也不为它们预留结构”；`DEC/D12-coverage.md:13` 亦明确将失败分支排除在范围外。
  3. **符合权威源头原则与 `D45-01 v1` 授权范围：** 候选 `(a)` 在 `onSend` 未被受理（reject）时保留草稿、不伪造已发送消息，读取失败时消息与模型为空，严格遵守《权威源头与生命周期》（未获权威源成功结论前不伪造本地成功状态），且完全落在 `D45-01 v1` 已授权的“发送/消息/模型”受控端口用途之内。

### 2. QA2：候选 `(b)` 借用 `AI-K` 的 `conversation.subtitle` 显示失败文案

- **判定：【越界】，不成立。**
- **依据：**
  1. 在 `DEC/D12-coverage.md:33,148` 中，`subtitle` 被明确归类为 `AI-K`（各页面的静态面板功能说明 copy），不是错误状态槽位（也无 `role="alert"` 可访问性语义）。
  2. 借用 `subtitle` 覆盖显示运行时失败文案，既改变了 `D12-coverage` 已定案的 `AI-K` 字段语义，又违反 `D20-02`（`DEC/D20-w10-path-boundary.md:32`：“不改……与本次无关的文案”）与 `design-assumes-it-works.md`。同理，候选 `(c)` 为失败分支修改 `packages/ui` 组件结构并重投 `D45` 亦违反 `design-assumes-it-works.md` 与 `D20-02`，不予采用。
