# 闸门 A 裁决：soroi#321（council 工人总线树）14 行条文立案前分类初审

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/soroi#321](https://github.com/Pepgent/soroi/issues/321)（子项：[Pepgent/council#1](https://github.com/Pepgent/council/issues/1)、[Pepgent/PM#41](https://github.com/Pepgent/PM/issues/41)、[Pepgent/soroi#322](https://github.com/Pepgent/soroi/issues/322)），`PM/evidence/gates/council-tree.md`，`/tmp/council-tree-draft.yaml`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：
    - `U61`（工人加载 `omp-peers`）、`U83` / `U88`（反层层设卡、提效推进）、`U90`（工作流提效正式方针进投票）、`U97`（每次用全新 subagent 巡检）；
    - `U103`（治理事务不再 `fork_task`，改为新开 `task` 从空白上下文开始）；
    - `U104`（“3.主控不再当消息总线：工人和席位的常规状态写进 issue 或文件，主控按批次读，不每条消息都唤醒，此项是重大的流程变更，需要合理的设计”）；
    - `U105`（“4.投票不要使用irc，用可并发修改的机制，由程序控制后写入，所有的投票和议题管理均交给程序自动处理，issue写入同样也交由程序实现，程序需要是daemon，并且可以配合exec command monitor订阅，而不需要额外的主动通知机制。实现由专门的task high自行实现，方案需要确认可行并交给管理层过目，实现后立刻投入生产使用”）；
    - `U107`（“`.omp/agents/area-manager.md` 应该使用peer，而不是绕过，只有实地考察的备选方案才需要阅读sessionlog，并且鼓励亲自查看工作空间” / “这是区域管理主动巡查工人，而不是工人给区域管理报告，这是纯单向通信”）；
    - **`U108`（`LEDGER.md:133`，`01a197b3` entry `89921acf`）：** “轮询非常傻逼，应该是github hook”；
    - **`U109`（`LEDGER.md:134`，`01a197b3` entry `3537c412` & `d062d076`）：** “在soroi的issue里要单独做一个issue，内容是council的增强，里面需要写明增强什么，后续工作流程怎么改变，council在那个issue被实现的时候需要单独在pepgent开设council的仓库，而不是在soroi里共用，转移成专门的repo专门的agent处理” / “council仓库你可以给他先开好，不需要他们去开”；
    - **`U110`（`LEDGER.md:135`，`01a197b3` entry `23665a5d`）：** “这个issue开完后，使用peer通知01a195a6-e09a-7070-8423-a7910184b28a的排期，高优先级，，council现在已有可用实现，异步安排subagent立刻做这个issue，并且由这个agent全权掌管整体实现和迁移方案，专用的agent实现以后再整体迁移新的工作方式”；
    - **`U111`（`LEDGER.md:136`，`01a197b3` entry `ca16231b` & `349ae633`）：** “保留，改为事件触发的诊断角色”。
  - `(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`（D1-12、D1-17、C2-1、C2-2、C2-4、C4-1~C4-3）。

---

## 一、对闸门 A 问题（`A-1` 至 `A-3`）的逐项裁决

### 1. A-1（哪些条文已有 `(U)` 原话依据、是否应按 C2-4 剔除或免表决）

1. **事实栏引用修正（`U108–U111` 已入账）：**
   - `council-tree.md` `F1` 与 `/tmp/council-tree-draft.yaml` 第 7–8 行将操作员 2026-11-02 的四条指示标为“`(A)` Main brief 转述、由秘书另行登记为 U 条目”。经核查 `SOR/LEDGER.md:133-136`，该四条原话**已正式登记为 `U108`（D2 用 GitHub hook）、`U109`（D7 独立 `Pepgent/council` 仓与专属 agent）、`U110`（D8 由专属 agent 全权掌管整体实现和迁移方案、实现后再整体迁移新工作方式）、`U111`（D5 片区经理保留、改为事件触发的诊断角色）**。议案 `facts` 应直接引用 `(U) U108–U111`（`LEDGER.md:133-136`）。
2. **14 行中与 `(U)` 直接授权的关系判定：**
   - **第 `04` 行（`D3`：Mac `cloudflared` + `homelab-tf/cf-ingress`）与第 `11` 行（`K4`：org 级 webhook、HMAC、GUID 去重、投递日志恢复、`webhook.sock`）：**
     - 操作员在 `(U) U108` 已直接下达“应该是 github hook”，并在 `(U) U110` 明文授权“**异步安排 subagent 立刻做这个 issue，并且由这个 agent 全权掌管整体实现和迁移方案**”。
     - 第 `04` 行与第 `11` 行纯属 `Pepgent/council` 接收 GitHub webhook 的单一组件技术实现细节，不改变 `AGENTS.md` 中的组织治理角色或工人行为规范，按 `C2-4` 与 `U110` **本已属于专属 agent（`CouncilTreeOwner`）全权掌管的实现范围，具备 `(U) U108`、`U110` 依据，可按 C2-4 从表决行中剔除（直接归入 facts 说明由 `council#1` 专属 agent 按 `U108`/`U110` 执行）**。
     - *注：* 若总协调席与闸门 B 为落实 `(U) U105`“方案需要确认可行并交给管理层过目”而希望保留 `04`、`11` 在 P3 议案中供管理层过目确认，本席不反对保留，但必须在议案中写明：**依 `U110`，P3 表决异步进行，绝不阻塞 `CouncilTreeOwner` 对 `council#1` 的实现推进。**
   - **第 `07` 行（`D6/K7`：代码在 `Pepgent/council`，决策 issue 与 `evidence/` 仍在 `Pepgent/PM`，发布目标从配置读取）：**
     - `council` 独立建仓已由 `(U) U109` 规定；决策 issue 与 `evidence/` 归 `Pepgent/PM` 已是现行 `AGENTS.md:83`（`C4-3`）的既定规则；代码不硬编码仓库名属于 `U110` 专属 agent 的实现职责。因此第 `07` 行同样已有 `U109` + `U110` + `C4-3` 依据，**可并入 facts 免表决，或保留在表中作串联确认**。
   - **其余 11 行（`01`、`02`、`03`、`05`、`06`、`08`、`09`、`10`、`12`、`13`、`14`）：**
     - 虽然大方向承接 `(U) U104`（主控不当消息总线、状态写进 issue、按批次读）与 `(U) U105`、`U108`、`U111`，但其中具体契约（如 `status post` 收窄、`STATUS <kind> worker=<W-id>` 语法、工人 `Active/Retired` 登记锚点、`worker.blocked / worker.unreachable / diagnosis.request` 三事件触发全新 `area-manager` `task`、`dispatch` 只接受已通过决策行等）属于对 `U104`“此项是重大的流程变更，需要合理的设计”与 `U105`“方案需要确认可行并交给管理层过目”的具体落地设计，且将作为 [soroi#322](https://github.com/Pepgent/soroi/issues/322) 改写 `AGENTS.md`（`C2-1`、`C4-1`、`C4-2`）和 `.omp/` 规则的正式依据。这 11 行没有逐字对应的 `(U)` 原话，**应当入表表决**。

---

### 2. A-2（是否有哪一行与 `(U)` 原意冲突：重点核查 `05`、`10` 与 `U107`，以及 `06` 与 `U111`）

- **判定结论：14 行均不与 `(U)` 原话冲突（0 项否决）。但第 `06` 行（或 `soroi#322` 改写规则时）应显式保留 `U107` 对片区经理诊断方式的约束。**
- **逐项核查：**
  1. **第 `05` 行（`D4` + `K3` 通道：走 `omp-peers` socket `irc`，不用 `tern send`）与 `(U) U107`：**
     - `(U) U107` 包含两条核心要求：① 使用 `peer` 通信而不是绕过；② 纯单向通信（管理侧向工人单向发，而不是工人通过 `peer` 向管理侧汇报）。
     - 第 `05` 行规定 `council` 通过 `omp-peers` socket 的 `irc` 向工人单向投递消息（禁用 `tern send`），结合第 `02` 行（声明单向消息，`peer` 回复送不到 `council`，工人只能在 GitHub issue/PR 写状态评论），**完全守住了 `U107`“走 `peer` 通道 + 纯单向通信”的两条核心要求**，无任何冲突。
  2. **第 `10` 行（`K3` 回执：`Delivered / Unreachable / Failed`，工人是否处理看后续 GitHub 状态评论）与 `(U) U107`、`U108`、`U111`：**
     - `U107` 下达于 `U108–U111`（引入 GitHub webhook 事件总线并将片区经理改为事件触发的诊断角色）之前。在 `U108`（“轮询非常傻逼，应该是 github hook”）与 `U111`（片区经理“保留，改为事件触发的诊断角色”）生效后，常规状态下不再由常驻片区经理轮询工人，而是在 `Unreachable` / `Failed`（产生 `worker.unreachable`）或 `worker.blocked` / `diagnosis.request` 时触发片区经理介入诊断。这正是 `U108` + `U111` 对 `U107` 触发机制的显式演进，不构成冲突。
  3. **第 `06` 行（`D5` 细化：三种事件触发，Main 每事件用 `task` 新开 `area-manager` 实例做首诊和实地查看）与 `(U) U111`、`U107`、`U103`、`U97`：**
     - “每事件用 `task` 新开一个 `area-manager` 实例、办完即结束”严格对齐 `(U) U111`（事件触发的诊断角色）、`(U) U103`（治理事务不再 `fork_task`，改为新开 `task` 从空白上下文开始）与 `(U) U97`（每次用全新的 subagent 做巡检）。
     - **补充要求（保持 `U107` 语义完整）：** `(U) U107` 中“`.omp/agents/area-manager.md` 应该使用 peer，而不是绕过，只有实地考察的备选方案才需要阅读 sessionlog，并且鼓励亲自查看工作空间”是对 `area-manager` **实地诊断方法**的直接原话约束。第 `06` 行已写“做首诊和实地查看”，建议在第 `06` 行 `how` 中补半句明确：“`area-manager` 实例诊断时仍遵守 `U107`（使用 `peer` 单向巡查并亲自查看工作空间，`session://` 日志仅作备选）”。这样 `U107` 与 `U111` 完全闭合。

---

### 3. A-3（是否触及 soroi 产品原始意图或 `design/` 基线，`missingDesign: false` 与初分类是否成立）

- **`missingDesign: false` 全部成立：** `Pepgent/council` 是领导层议会与工程编排事件总线工具，不属于 `soroi` 产品运行时（`omp-soroi`、`store`、`omp-rpc-mux`、`remote`、`Pepgent` Lab），不触及 `pepgent-soroi/design/*.md` 的任何设计基线。
- **初分类无异议：** 14 行中没有“产品意图”行；起草稿将各行标为 `治理`（`01`、`03`、`06`）、`串联`（`02`、`05`、`07`、`08`、`09`、`10`、`12`、`13`、`14`）、`技术`（`04`、`11`），分类合理，本席无异议。

---

## 二、闸门 A 结论汇总表

| 审查维度 | 闸门 A 裁决 |
|---|---|
| **事实栏 `(U)` 引用** | `F1` 的四条操作员原话已在 `SOR/LEDGER.md:133-136` 正式登记为 **`U108`、`U109`、`U110`、`U111`**，议案 `facts` 应直接标为 `(U) U108–U111`，不再标为 `(A)` 转述。 |
| **已有 `(U)` 依据可剔除的行（A-1）** | **第 `04` 行（D3）与第 `11` 行（K4）** 属 `U108`（用 GitHub hook）+ `U110`（由专属 agent 全权掌管整体实现和迁移方案）直接授权的单一组件实现细节，**第 `07` 行（D6/K7）** 已由 `U109` + `U110` + 现行 `C4-3` 覆盖；这 3 行按 `C2-4` 可从表决行剔除（若闸门 B 为落实 `U105`“交给管理层过目”保留在 P3 表中，本席亦不反对，但须写明不阻塞 `council#1` 实现）。其余 **11 行（`01–03, 05–06, 08–10, 12–14`）** 涉及 `AGENTS.md` 与工作流契约改写，应入表表决。 |
| **与 `(U)` 原意冲突（A-2）** | **无冲突（0 行否决）。** 第 `05`、`10` 行保留了 `U107` 的 `omp-peers` 渠道与纯单向通信；建议在第 `06` 行 `how` 补明事件触发的 `area-manager` 实例诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **`missingDesign` 与分类（A-3）** | **无异议。** 全部 `missingDesign: false`，不涉及 `pepgent-soroi/design/*.md`，初审 `治理 / 串联 / 技术` 分类成立。 |
