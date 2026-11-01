# D31 选票：Argon

议程：Automation 会话头无读取携带：自动化页携带 Automation 会话头（AS-1）（[Pepgent/PM#50](https://github.com/Pepgent/PM/issues/50)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D31-01 v1：赞成（Argon-2，2026-11-01T18:00:08.055Z）


**分类意见：** 串联

# D31（PM#50）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】在 `LabPageWire.automation` 新增 `conversations: ConversationWire[]` 携带 Automation 会话头，并在 `D12-17` 的 `conversation` 频道失效读取中补入 `automation` 页（当该会话为 Automation 来源时），一次性闭合 Automation 会话的 `owner`、`agent`、`session` 与首步无运行时的 `slots` 读取，保障全流程人类介入与实时订阅可用（`U2`、`U23`、`D19-05②`、`D29-02/04`、`D30-04`）。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自收缩范围）、`(U) U96`（`LEDGER.md:110`：公开契约缺失设计事前表决）；`(D)` `DEC/D7-lab-backend.md:64,68,70,100`、`DEC/D12-lab-wire.md:36,39-41,51-58,156-162,261-305,356,564,586`、`DEC/D19-sor13-control-contract.md:33`、`DEC/D29-pepgent-20-slot-overlay.md:32,34`、`evidence/gates/automation-slots-gate-a.md`。
   - **边界：** 属于 Pepgent Lab 后端公开线协议（`D7`、`D12`）的闭合，不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D31-01 v1（AS-1）** | 串联 | **approve（赞成）** | 采用闸门 A 推荐的处置 `a`：`LabPageWire.automation` 新增 `conversations: ConversationWire[]`（列出该页 `runs` 中 `conversation` 非空运行对应的 Automation 会话头，对本 Lab 全员可见，`slots` 按 `D12-04` 挂载表填充），并在 `D12-17` `conversation` 频道失效列表中补入 `automation` 页（当该会话为 Automation 来源时）。既使 Automation 会话首步无运行时的 `slots`、`owner`（供写与交回授权判定）与 `agent`（供 `watchAgent`）有唯一清晰的读取载体，又严守 `D12-08`“会话头在页面、`lab.conversation.read` 不重复”的分层，不污染全站 `LabCatalogWire` 或 `panels` 定义。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。

