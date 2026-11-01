# Pepgent#18（LAB-11b）新契约空白的闸门材料：已绑定运行的草稿能否再次 `experiment.start`

- **issue：** [Pepgent/Pepgent#18](https://github.com/Pepgent/Pepgent/issues/18)，工人 W-09（tern 会话 `pepgent-lab`）。
- **来由：** [评论 6561364444](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561364444) 末节“新的契约空白”。工人当前对这一状态返回 `not_supported`，没有自行二选一。
- **编制：** governance-desk 实例 `DeskPepgent18Restart`（总协调席，与 Main 合计 1 票）。本文整理事实，为两道闸门列出待判问题和可选处置；闸门结论见 `GATE/pepgent-18-restart-gate-a.md`、`GATE/pepgent-18-restart-gate-b.md`。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）。闸门 A 由 `Argon` 判定（是否触及产品原始意图或公开契约），闸门 B 由 `ArgonGovernance` 判定（是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项）。两道闸门都确认不越界，才可作为机械补全免票放行；任一闸门认定越界，就按 P0 立案。
- **设计范围：** 只写主路径（`SOR/.claude/rules/design-assumes-it-works.md`），不讨论并发、重试或恢复。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件与源码，没有运行构建、类型检查或测试。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`；`GATE/` = `PM/evidence/gates/`
- `WT11b/` = W-09 的 LAB-11b 工作树 `/Users/mouriya/Ext/worktrees/pepgent-lab-11b/`（分支 `issue-18-lab-draft-launch`，工人自述 HEAD 为 `d9ec267`）；`LAB/` = `WT11b/apps/web/src/server/lab/`

`DEC/D7-lab-backend.md:66` 与 `DEC/D12-lab-wire.md:522-534` 是 D26 回写后的工作区正文；回写内容以已归档的定稿 `DEC/D26-pepgent-18-draft-lifecycle.md` 为准。

---

## 一、问题

草稿已经有 `experiment_ext.draft` 指向它（即它是某次运行的来源草稿），此时讨论 owner 对它发 `experiment.start{draft}`，该怎么处理？

工人列出的两面（(A) 评论 6561364444）：
- D7-06 写了“一实验一 store 运行；启动前为草稿；同讨论先后多实验”，但没说同一份草稿绑定后能否再启动。
- 表结构不禁止：`experiment_ext.draft_id` 没有唯一约束。
- 目录只为未绑定草稿出草稿项。若允许再次启动，产生的 pending 在目录里看不到，也就无从审批。

同一草稿的其他状态已有结论，不在本问题内：
- 草稿自身有 pending（`awaiting_approval` 或 `sent`）时再 start：D7-06“每会话至多一条”，工人返回 `revision_conflict`（F8）。
- 同讨论另一份草稿有 pending 时 start：同上。

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | D7-06 的 what 栏开头：“一实验一 store 运行；启动前为草稿。”`experiment_ext` 以 RunId 为键，只存编号、名称、项目、来源草稿。末句：“同讨论先后多实验、同刻至多一未结束”。 | (D) `DEC/D7-lab-backend.md:66` |
| F2 | D6-12：草稿画布是“尚未开始的实验画布”，是 Lab 的业务对象；“实验开始正式运行后，Lab 后端从生命周期流收到这次运行的 `run_started`……把 store 生成的 run id 存进业务库作为该实验的索引；同一个 session 先后跑的多个实验各自引用自己的 run id”。 | (D) `DEC/D6-store-service.md:40`；`SOR/design/layers.md:42` 同义 |
| F3 | D12-04：目录中的“实验为各 ext 对应运行与未绑定草稿”；无运行时，Discussion 来源的槽位挂到该会话的 `pendingLaunch` 实验项。 | (D) `DEC/D12-lab-wire.md:36` |
| F4 | `ExperimentWire.draft` 是“未绑定运行的草稿，或绑定运行的来源草稿”；`ExperimentWire.pendingLaunch` 与 `draft` 并列在同一实验项上。 | (D) `DEC/D12-lab-wire.md:265-266` |
| F5 | D26 的统一规则：“投递之后（`sent` 或已绑定运行）草稿就是这次实验的来源，不能再保存或丢弃。”D26-03 的代价栏：“要修改已投递的计划，只能另起草稿。”D26-06 的代价栏：“已启动过实验的草稿会一直留在目录中。”六行均 4/4 通过。 | (D) `DEC/D26-pepgent-18-draft-lifecycle.md:11,68,71` |
| F6 | D26 回写后的 D12 生命周期段：“已绑定草稿作为运行的来源草稿出现，不另列成一条未绑定草稿项；其内容不能再保存或丢弃。”状态表只列 `draft.save`、`draft.discard` 两列，没有 `experiment.start` 列。 | (D) `DEC/D12-lab-wire.md:522-534` |
| F7 | `experiment.start{draft}` → `{kind:'launch', state: 'awaiting_approval' \| 'sent'}`；权限为 `write` 且是草稿所属讨论的 owner。D7、D12、D26 均没有写 start 遇到已绑定草稿时的结果。 | (D) `DEC/D12-lab-wire.md:420,472,511`；(R) 在 `DEC/D7-lab-backend.md`、`DEC/D12-lab-wire.md`、`DEC/D26-pepgent-18-draft-lifecycle.md` 中检索 `experiment.start`、`已绑定`、`再次`，没有找到这一格 |
| F8 | 工人实现把草稿状态分为 `free`、`awaiting_approval`、`sent`、`bound` 四种。start 在 `awaiting_approval`、`sent` 及“同讨论另一草稿有 pending”时返回 `revision_conflict`；在 `bound` 时返回 `not_supported`，注释为“Whether a draft already bound to a run may start again is not decided (Pepgent#18)”。 | (D) `LAB/operations.ts:308-320,389-396` |
| F9 | `experiment_ext.draft_id` 只有指向 `draft` 的外键，没有唯一约束。 | (D) `LAB/schema.ts:106-117` |
| F10 | 目录构建时，凡已被某个 `experiment_ext` 指向的草稿都跳过，不出草稿项；`pendingLaunch` 只挂在草稿项上。因此已绑定草稿上若再建 pending，目录中没有任何实验项携带它。 | (D) `LAB/catalog.ts:142-153` |
| F11 | 审批只有 `experiment.approve{draft}`，页面审批入口在实验项的 needs_you/queued 投影上；草稿对话框动作为 keep/discard/start/edit_parameters/remove，已结束实验的对话框动作为 follow_up/cite/export/retro_report/artifacts，没有 start。 | (D) `DEC/D12-lab-wire.md:421`；`DEC/D12-coverage.md:82,222`；`DEC/D7-lab-backend.md:66`（“needs_you（待人类槽位/审批）”） |
| F12 | 草稿可以从某次运行的复盘起草：`DraftWire.origin.retroRun: RunId \| null`。 | (D) `DEC/D12-lab-wire.md:153`；`DEC/D12-coverage.md:229` |
| F13 | 现有领域失败码：`not_found`、`revision_conflict`、`invalid_input`、`persistence_unavailable`、`not_supported`；Lab 已用 `revision_conflict` 表示“与当前状态冲突的写入”，D26-03/06 也用它拒绝 `sent` 或已绑定草稿上的 save/discard。 | (D) `DEC/D26-pepgent-18-draft-lifecycle.md:38,68,71`（F12 引 `WT11b/apps/web/src/protocol/errors.ts:37-46,80-91`） |
| F14 | 领导层表决类别含“状态权威与生命周期”与公开 wire；已通过契约内的单仓私有结构、算法由工程师决定。接口表或权限表缺少某项不构成授权。 | (D) `DEC/D10-repo-delivery.md:20`；`SOR/AGENTS.md:123` |
| F15 | 本实例在材料中没有找到用户就“同一草稿能否反复启动”说过的原话。 | (R) 在 `SOR/LEDGER.md` 中检索 `草稿`、`重跑`、`再次` |

## 三、初审观察（不是裁决）

既有正文没有逐字写出“start 遇已绑定草稿时如何”，但下面几条已通过的条文都只能在“一份草稿至多成为一次实验”时同时成立：

1. **实验身份：** “一实验一 store 运行；启动前为草稿”（F1）与“草稿是尚未开始的实验画布，开始运行后以 run id 作为该实验的索引”（F2）。草稿是实验启动前的形态，启动后实验以运行为索引。一份已绑定的草稿再启动，等于同一实验有第二个运行，或者一份草稿同时是两个实验的启动前形态。
2. **目录与审批：** 目录只为未绑定草稿出草稿项，pending 只挂在草稿项上（F3、F6、F10）；已绑定草稿上的 pending 在目录里没有承载项，`awaiting_approval` 时也就没有审批入口（F11）。允许再启动，就必须改 D12-04 的目录组成或 `ExperimentWire` 的形状。
3. **D26 的来源草稿语义：** 投递之后草稿就是“这次实验的来源”，要修改只能另起草稿（F5）。再次启动会让同一份来源草稿对应多次实验。
4. **再跑的既有路径：** 产品里再次做实验的入口是另起草稿（含从复盘起草，F12），已结束实验的对话框没有 start（F11）。

由此有两种读法，交两道闸门判定：
- **读法甲（仅需澄清）：** 已绑定草稿再次 start 已被 F1–F5 排除，只缺失败码的字面。按 D26-03/06 的同一方式返回既有领域失败 `revision_conflict`，草稿、pending 与 `catalog` 都不变，不改 wire、持久化或目录。
- **读法乙（公开契约缺口）：** F7 显示 start 的状态行为没有成文；无论允许还是拒绝，都是 D10-08 的“状态权威与生命周期”选择，按 P0 立一行。

## 四、待判问题

### 闸门 A（交 `Argon`）

- **A-1：** F1、F2、F5 是否已经确定“一份草稿至多启动一次实验”？即：已绑定草稿再次 `experiment.start` 是否已被既有决策排除，只需澄清？
- **A-2：** 若已排除，拒绝时返回既有 `revision_conflict`、状态与 `catalog` 不变（与 D26-03/06 以及 start 遇 pending 的处理同形），是否就是既有契约内的落实，不新增失败码、字段或通道？
- **A-3：** 若认为未排除，是否属于草稿与启动意图生命周期的公开缺口，须 P0？“允许再启动”需要改哪些公开面（D12-04 目录组成、`ExperimentWire`、D26 的来源草稿语义）？

### 闸门 B（交 `ArgonGovernance`）

- **B-1：** 若 A 认定只需澄清，按读法甲落实是否越过 W-09 白名单（改动只在 `LAB/operations.ts`）、阶段门禁，或属于必须投票的事项？
- **B-2：** 若须 P0，这一行的参投席位：它不改派工、范围或切片表，是否按产品与跨组件契约行由 4 席表决（`SOR/AGENTS.md:22,27`）？
- **B-3：** 表决或澄清期间，W-09 只把 `bound` 分支留在 `not_supported`、其余已放行与 D26 已通过的部分照常实现，是否符合 D10-08“只暂停依赖部分”？

## 五、可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 澄清：已绑定草稿再次 start 返回 `revision_conflict`，草稿、pending、`catalog` 不变。D12 生命周期段的状态表补一列或一句说明。 | 闸门判定为澄清时不改 | 回写只是把既有结论写成字面 |
| b | P0 立一行，主案同 a；备选“允许再启动”写在取舍栏。 | 改 D12 生命周期段 | 4 席表决 |
| c | P0 立一行，主案为允许再启动：同一草稿可对应多个 `experiment_ext`，目录为已绑定草稿上的 pending 另出实验项。 | 改 D12-04 目录组成、D26 来源草稿语义 | 公开面改动最大；与 F1、F2 的“一实验一运行、启动前为草稿”需要重新解释 |

## 六、顺带确认：评论 6561378382

[评论 6561378382](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561378382) 问的是表决前 `draft.discard` 应返回 `Done` 还是 `not_supported`。D26 已通过（[PM#43](https://github.com/Pepgent/PM/issues/43)），各状态下 discard 的结果都已确定（`DEC/D12-lab-wire.md:528-532`），这一问随之失效。工人已确认无须另行回答（(A)，经主会话转述）。本项不送闸门。
