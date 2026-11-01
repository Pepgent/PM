# 闸门 B 裁决：`Pepgent#26`（WEB-03）Q1–Q3 与六项工人自定处理（`pepgent26-web03-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent26-web03.md`
- **关联议题：** [Pepgent/Pepgent#26](https://github.com/Pepgent/Pepgent/issues/26)（评论 [`#issuecomment-6562604645`](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562604645)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T19:28Z`

---

## 一、总局判定结论与分流汇总（仅审路径白名单、阶段门禁与投票程序边界）

依 `AGENTS.md:60`（`C2-2.2`）、`D10-08`、`D16-09`、`D20-01/02` 与 `.omp/agents/argon-governance.md` 第 6、13 条，本席仅对**席位路径白名单、阶段门禁与必须投票的程序类别**作出判定；所有产品原始意图、UI 呈现取舍与验收语义判断均由 `Argon`（闸门 A）独立裁决：

| 项目 | 闸门 B（组织/路径/程序）结论 | 处置去向（须与 `Argon` 闸门 A 裁决取交集后执行） |
|---|---|---|
| **Q1**（详情页补回看、对比、派生导航、workspace 与交回入口） | **路径与程序不越界（K1）** | 改动均在 `D20-01/02` `W-10` 白名单内；待闸门 A 落盘并确认不违背产品意图后，方可免投票放行 |
| **Q2**（被中止节点 `AbortedCall` 的状态色） | **不写 `renderer/styles/lab/**` 时路径不越界（K1）** | 仅改 `client/**`、`model/**`、`locales/**` 落在 `D20-01` 白名单内；若闸门 A 亦确认无需写 `renderer/styles/lab/**`，免投票放行；若闸门 A 要求修改 `renderer/styles/lab/**`，则因触及 `D20-02` 路径禁令须并入 `P0` 表决 |
| **Q3**（`packages/ui/src/lab/time-axis.tsx` 席位路径白名单归属） | **触及 `packages/ui/**` 时路径越界（K4，`domains: [governance]`）** | `packages/ui/src/lab/time-axis.tsx` 不在现行 `D16-09`/`D20-01`/`D25` 任何席位白名单内：凡需修改 `packages/ui/src/lab/time-axis.tsx` 的方案，必须并入 `P0` 议案表决授权路径白名单（至于是否必须修改该组件以满足产品验收意图，由 `Argon` 闸门 A 裁决） |
| **自定 ①**（泳道时间窗默认值） | **路径与程序不越界（K3/K2）** | 位于 `W-10` 白名单内且不跨席位；待闸门 A 亦确认不越界后免投票不立案 |
| **自定 ②**（泳道计划条留空并移入 D9） | **程序越界（K4，`D9` 分类与已通过决策范围变更属必投类别）** | 依 `AGENTS.md:123` 与 `D10-08`，工人无权单方将 `D12-06`/`D7:96` 已登记条目移入阶段 D 的 `D9`；无论补规则或改范围，程序上均须并入 `P0` 议案表决 |
| **自定 ③**（`D12-06` `definitions` 与 `D12-14` 按 `version` 关联的跨席位线协议） | **修改 `protocol/lab/**` 或 `server/lab/**` 属跨席位越界（K4）；`W-10` 仅在自身白名单内按 `D10-08` 暂停依赖部分合规（K1）** | 跨 `W-09`（`packages/protocol/src/lab/**`、`apps/web/src/server/lab/**`）与 `W-10` 的 wire 契约修订及跨席位派工，程序上必须并入 `P0` 议案表决；表决前 `W-10` 在自身白名单内遵守 `D10-08`“只暂停依赖部分”不越界 |
| **自定 ④**（详情页 `$runId` 路由按 catalog 判定 `run \| draft`） | **路径与程序不越界（K3/K2）** | 位于 `W-10` 的 `_lab.*.tsx` 白名单内且不触碰禁写的 `destination.ts`；待闸门 A 亦确认不越界后免投票不立案 |
| **自定 ⑤**（切换 Lab 写入 Better Auth 会话 `active organization`） | **工人自定方案程序越界（K4，予以驳回）；按既有 `D12-03/04` 客户端传参不越界（K1）** | 工人自定写服务端会话触及 `D10-08`“状态权威与生命周期”必投类别，严禁自定采用；驳回后按闸门 A 确认的既有 `D12-03/04` 在 `W-10` 白名单（`_lab.tsx`、`lab-runtime.tsx`、`client/**`）内持有 `selectedLabId` 传参，不跨路径边界、无需立案 |
| **自定 ⑥**（`WEB-03` 实现 `AbortedCall` 投影，跨组件新录制样本留待 `#30` F24 补测） | **阶段门禁与程序不越界（K1）** | 符合 `#26`/`#30` 分工与 `D16-13` 阶段 B 本仓门禁边界；待闸门 A 亦确认不越界后免投票不立案 |

> **正交双闸门前置约束（`C2-2.2`、`.omp/agents/argon-governance.md` 第 6 条）：** 上表所有在闸门 B 下标为“不越界”的条目，均**必须以已落盘的 `Argon` 闸门 A（`pepgent26-web03-gate-a.md`）共同确认不越界为前置条件**，方可免投票写入 `#26` 评论并经 Pepgent 片区经理送达；凡被闸门 A 或闸门 B 任一判为须投票的条目，统一并入 `P0` 议案经议会 daemon 立案表决。

---

## 二、逐项组织、路径白名单与程序边界审查理由

1. **`Q1-B`（路径与程序不越界）：** 涉及文件均在 `D20-01` `W-10` 白名单（`features/lab-experiment-detail/model/**`、`client/contracts/**`、`locales/lab-experiment-detail-copy.ts`）与 `D20-02` 允许的 `features/lab-experiment-detail/ui/experiment-detail-page.tsx` 最少绑定范围内（仅向 `ActionDialog` 传既有可选 `onDone` prop，不修改 `packages/ui/src/lab/action-dialog.tsx`）。
2. **`Q2-B`（不触碰 `renderer/styles/lab/**` 时路径不越界）：** `D20-02` 规定“`renderer/styles/lab/**`、`renderer/platform/web/astryx-theme/**` 一律不写”。仅在 `client/**`、`model/**`、`locales/**` 增加 `aborted` 状态并映射既有 `DagCardTone` 不违反 `D20-01/02` 路径边界；若闸门 A 认为产品意图要求修改 `renderer/styles/lab/lab-experiment-detail.css`，则因跨出 `D20-02` 白名单而须入 `P0` 表决。
3. **`Q3-B`（触及 `packages/ui/src/lab/time-axis.tsx` 属路径白名单越界，须入 `P0` 表决）：** `packages/ui/src/lab/time-axis.tsx` 不在现行 `D16-09`、`D20-01`、`D25` 的任何席位路径白名单中，且 `D20-02` 禁止在 `features/lab-experiment-detail/ui/**` 自建替代组件结构。因此，若闸门 A 裁定需修改 `packages/ui/src/lab/time-axis.tsx`，该路径授权在组织程序上属于席位互斥路径白名单修订，必须并入 `P0` 议案表决（`domains: [governance]`）；表决前 `W-10` 不得写入 `packages/ui/**`。
4. **`B-②`（移入 `D9` 属程序越界，须入 `P0` 表决）：** 依 `AGENTS.md:123` 与 `D10-08`，阶段 D 的 `D9` 分类及已通过决策（`D12-06`、`D7:96`）的条目取舍均属必须经管理层表决的程序类别，工人不得单方决定留空或移入 `D9`。
5. **`B-③`（跨 `W-09`/`W-10` 路径与 wire 契约修订须入 `P0` 表决；过渡期遵守 `D10-08` 不越界）：** 修改 `packages/protocol/src/lab/**` 与 `apps/web/src/server/lab/**` 跨越 `W-10` 与 `W-09` 互斥路径白名单并涉及公开 wire 契约修订，依 `D10-08` 与 `C2-2.2` 必须并入 `P0` 议案表决；表决与 `W-09` 承载完成前，`W-10` 在自身白名单内按 `D10-08`“只暂停依赖部分”处理符合组织程序。
6. **`B-⑤`（工人自定写服务端会话触及 `D10-08` 必投类别，予以驳回；按既有 `D12-03/04` 客户端持有 `selectedLabId` 不越界）：** `D10-08` 将“状态权威与生命周期”列为工人不能自定的类别，故驳回工人自定写 Better Auth 会话 `active organization` 的方案；驳回后按闸门 A 裁定的既有 `D12-03`/`D12-04` 由客户端在 `D20-01` `W-10` 白名单内持有 `selectedLabId` 传给 `readCatalog(selectedLabId)`，不跨席位路径边界，无需另立议案。
7. **`B-①④⑥`（路径、阶段门禁与程序不越界）：** ① 与 ④ 均在 `W-10` 既有路径白名单内，不触碰白名单外的 `destination.ts`；⑥ 将依赖跨组件运行产出的新录制样本留待 `#30`（`F24`）补测，符合 `D16-13` 阶段 B 只做本仓检查的阶段门禁。
