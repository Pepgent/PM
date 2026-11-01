# Pepgent LAB-11b（#18 新空白：已绑定运行的草稿能否再次 `experiment.start`）：闸门 A 判定

## 结论

**仅需澄清（不越界，可作为机械补全免票落实处置 a）：已由 `experiment_ext.draft` 绑定运行的草稿再次调用 `experiment.start{draft}` 时，与该草稿处于 `awaiting_approval` 或 `sent` 状态同形，直接返回既有领域失败 `revision_conflict`，草稿、`pending_launch` 与 `catalog` 均保持不变。**

上述结论是对已通过决策 `D6-12`、`D7-06`、`D12-04` 与 `D26`（`LC-1..LC-6`）的直接合读与字面澄清，不新增或改变任何公开 wire、持久化表结构、权限、失败码或生命周期状态。仅当闸门 A 与闸门 B 对处置 a 均确认不越界时方可免票放行；若任何一方坚持采用处置 c（允许同一已绑定草稿再次启动），则触及 `D7-06`、`D12-04` 与 `D26` 的公开契约修改，必须按 P0 立案表决（`(U) U96`，`SOR/LEDGER.md:110`；`(D)` `SOR/AGENTS.md:60`、`DEC/D10-repo-delivery.md:20`）。

对象：[Pepgent/Pepgent#18 评论 6561364444](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561364444)；材料：`GATE/pepgent-18-restart.md`。本次只写本文件，不提交、不在 GitHub 发言、不联系工人。

## 一、意图裁决

| 意图裁决 | U 原文与出处 | 本次适用边界 |
| --- | --- | --- |
| **定：已通过契约内的直接推论不重复设卡投票，真实契约变更才走 P0** | `(U) U30–U32`、`U83`、`U88`（反对层层设卡阻挠推进，`SOR/LEDGER.md:88,97,102`）；`(U) U96`（防真实契约缺口先合入再回退，`SOR/LEDGER.md:110`） | 既有 `D6-12`/`D7-06`/`D12-04`/`D26` 已排除了已绑定草稿再次 `start`，按同一 `revision_conflict` 拒绝无需再开一轮 P0；若要改目录与实验身份模型允许复跑同一草稿，才须 P0。 |
| **定：无 U 原文不虚构用户逐字指令** | `(U) U1`、`U20`（`SOR/LEDGER.md:68,84`） | 用户未逐字点名 `experiment.start` 的错误码名称；本判定基于已通过决策 `(D)` 的状态闭合性，不把 `revision_conflict` 伪称为用户原话。 |

## 二、A-1 至 A-3 逐项判定（附 `path:line` 依据）

### A-1：`F1`、`F2`、`F5` 是否已确定“一份草稿至多启动一次实验”

**是，既有决策已唯一确定一份草稿至多启动一次实验，已绑定草稿再次 `experiment.start` 已被排除，仅需字面澄清：**

1. **实验与草稿的单向生命周期定义：**
   - `(D)` `DEC/D7-lab-backend.md:66`（D7-06）明定：“**一实验一 store 运行；启动前为草稿。**”
   - `(D)` `DEC/D6-store-service.md:40`（D6-12）与 `SOR/design/layers.md:42` 明定：草稿是“尚未开始的实验画布”，实验开始正式运行后以 store 生成的 `run_id` 作为该实验索引，“同一个 session 先后跑的多个实验各自引用自己的 run id”。
   - `(D)` `DEC/D26-pepgent-18-draft-lifecycle.md:11,68,71` 与 `DEC/D12-lab-wire.md:524,534` 明定：“**投递之后（`sent` 或已绑定运行）草稿就是这次实验的来源，不能再保存或丢弃**”，“要修改已投递的计划，只能另起草稿”（含从运行复盘另起新草稿 `DraftWire.origin.retroRun`，`DEC/D12-lab-wire.md:153`）。
2. **目录与审批结构的唯一性证明：**
   - `(D)` `DEC/D12-lab-wire.md:36,265-266,534`（D12-04）明定：目录中的实验项仅为“各 `ext` 对应运行与**未绑定草稿**”，“已绑定草稿作为运行的来源草稿出现，不另列成一条未绑定草稿项”。
   - 若对已绑定草稿再次执行 `experiment.start` 创建 `pending_launch`（如 `awaiting_approval`），由于已绑定草稿在目录中没有独立的未绑定草稿项，该 `pending_launch` 在 `LabCatalogWire.experiments` 中没有任何承载位置，导致审批人在界面上看不见该待审批项、无法执行 `experiment.approve`（`DEC/D12-coverage.md:82,222`），还会占死该讨论唯一的 `pending_launch` 主键（`DEC/D7-lab-backend.md:130-133`）。
   - `WT11b/apps/web/src/server/lab/schema.ts:106-117` 未给 `experiment_ext.draft_id` 加 SQL `UNIQUE` 只是存储表写法，不推翻上述已通过的业务生命周期契约（`GATE/pepgent-18-gate-a.md:101`）。

### A-2：拒绝时返回既有 `revision_conflict` 是否属既有契约内的落实

**是，属于既有契约内的直接落实，不新增失败码、字段或通道：**

- `(D)` `DEC/D26-pepgent-18-draft-lifecycle.md:38,68,71` 与 `DEC/D12-lab-wire.md:532` 已规定：草稿一旦进入 `sent` 或已由 `experiment_ext.draft` 绑定运行，对其发起与当前生命周期状态冲突的命令（`draft.save`、`draft.discard`）统一返回既有领域失败 `revision_conflict`（定义见 `WT11b/apps/web/src/protocol/errors.ts:37-46,80-91`），且草稿、`pending_launch` 与 `catalog` 均不变。
- `(D)` `WT11b/apps/web/src/server/lab/operations.ts:308-320,389-396` 对处于 `awaiting_approval` 或 `sent` 的草稿再次调用 `experiment.start` 已返回同一个 `revision_conflict`。将 `bound`（已有 `experiment_ext.draft` 指向）分支同样返回 `revision_conflict`，并在 `DEC/D12-lab-wire.md:528-534` 的生命周期说明中补写这一字面说明（**处置 a**），完全落在既有契约内。

### A-3：若认为未排除或选择“允许再启动”的边界

- 仅当选择**处置 c（允许已绑定草稿再次 `experiment.start`）**时，才需要修改公开契约：必须同时改写 `D7-06`（“一实验一运行、启动前为草稿”）、`D12-04`（目录组成与 `ExperimentWire` 如何承载已绑定草稿上的新 `pendingLaunch`）以及 `D26`（“这次实验的来源草稿”），这属于公开 wire 与生命周期变更，必须走 P0。
- 既然 `D6-12`、`D7-06`、`D12-04` 与 `D26` 已排除再次启动，采用**处置 a** 无需再走处置 b 的 P0 投票。
