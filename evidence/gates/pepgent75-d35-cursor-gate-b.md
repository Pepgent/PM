# Pepgent PR#75（WEB-03）中两处 D35-01 v3 时间轴游标细节 — 非阻塞事后治理检查意见（撤回事前闸门框架）

- **对应材料：** `evidence/gates/pepgent75-d35-cursor.md`（`DeskPr75D35Detail`，PM `14fe7c2`）
- **检查席位：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–141 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核实不存在，按 G8 继续），并独立直读 `evidence/decisions/D35-pepgent-26-web03-timeline-plan-defs.md:1-45`、`evidence/decisions/D20-w10-path-boundary.md`、`Pepgent/Pepgent` `apps/web/src/renderer/features/lab-experiment-detail/model/replay-at.ts:1-24`、`packages/ui/src/lab/time-axis.tsx:120-204`、`packages/ui/src/lab/time-axis-model.ts:70-125`。

---

## 零、撤回事前闸门（Gate A/B）与 `P0` 前置审批框架（`.omp/agents/argon-governance.md:19-21`、`AGENTS.md:58-60`、D1-12、C2-3）

1. **已合入非 `BLOCKED` 事项不适用事前双闸门（Gate A/B），转为非阻塞事后治理检查：**
   - `pepgent75-d35-cursor.md:3-8,74` 明示：`Pepgent/Pepgent PR#75` 已合入 `main`（`7273b26`），性质**“不是正式 `BLOCKED`。PR 已合入，W-10 没有暂停任何工作……本项不阻塞 `WEB-07` 的其他接线”**。
   - 按 `.omp/agents/argon-governance.md:19-21`（§6）与 `AGENTS.md:58-60`（C2-2.2），正交双闸门（Gate A / Gate B）仅用于**工程师上报 `BLOCKED` 的放行前事前把关**；对已通过契约与路径白名单内的常规开发（含已合入 `PR#75`），**不设事前投票或双闸门前置审批，只由本席做非阻塞事后检查**。
   - 因此，本席**正式撤回将本项纳入事前 Gate A/B 前置放行及 `P0` 阻塞立案的框架**，将本文定性为对已合入 `PR#75` 的**非阻塞事后治理检查意见**，不设任何前置放行锁。
2. **严禁为非 `BLOCKED` 事项注入 `P0` 门禁（`AGENTS.md` D1-12、C2-3、`.omp/agents/argon-governance.md` §9）：**
   - `P0` 严格专用于**“关键路径 `BLOCKED` 解阻”**；本项既非 `BLOCKED` 也不阻塞 `WEB-07`，严禁以 `P0` 立案抢占阻塞解阻队列或制造门禁设卡。

---

## 一、非阻塞事后治理检查结论（回应 B-1 ～ B-3）

| 事项 | 非阻塞事后检查结论 | 组织、路径白名单与常规路由依据 |
|---|---|---|
| **B-1：第 1 处（`T < first.minute` 轴外左 padding 空集钳位到 `first.minute`）** | **事后检查合规（`D10-08` 单仓私有实现，不设事前闸门，不立案）** | 经独立直读 `apps/web/src/renderer/features/lab-experiment-detail/model/replay-at.ts:14-17`，`const minute = Math.max(T, first.minute)` 完全位于 `D20-01` 授予 `W-10` 的 `apps/web/src/renderer/features/lab-*/{model,controller}/**` 路径白名单内，未触碰 `packages/ui/**` 未授权文件或 `W-09` 的 `apps/web/src/protocol/**`、`server/**`，不跨席位边界、不破阶段门禁。按 `D10-08` 属于已通过契约内的单仓私有算法实现，无需事前双闸门审批、不立案；协调席可直接在 `PR#75` 评论记录复核说明（不回写已合入 PR 正文，符合 `AGENTS.md` C4-2）。 |
| **B-2：第 2 处（同刻提交 `seq 1`/`seq 2` 与亚像素间隔提交在 `D35-01 v3` 公式下的可达性说明）与 `WEB-07`（`#29`）承载路由** | **事后检查无白名单越界；严禁立 `P0`、不设事前闸门；保持常规推进或按非阻塞 `P1`/`P2` 处理，后续由 `WEB-07`（`Pepgent#29`）在 `W-10` 白名单内承载合规** | 1. **实现与白名单事后检查：** `W-10` 在 `replay-at.ts:7-23` 严格按 `D35-01 v3` 已决公式实现且未自加交互，无路径白名单越界。<br>2. **非阻塞路由（不走事前闸门、不立 `P0`）：** 本项不阻塞 `WEB-07` 推进。若在既有 `D35-01 v3` 契约内作常规修复或无需改动决策正文，直接按常规开发推进，无需投票；若产品席（`Argon` / `SoroiKeeperOpus/Gpt`）或协调席认为需修订已通过的 `D35-01 v3`（`PM#54`）正文/公式，因协调席不得在 PR 评论中单方改写已决决策正文（`AGENTS.md:123`），应直接通过 `council propose` 按对应的**非阻塞优先级**立案（**严禁使用 `P0`**）：① 若属 `P1`（产品全景/接缝纠偏）且代码落点在 `W-10` 既有 `D20-01` 与 `D35-01 v3` 白名单内，按 4 席契约行投票（不加 `domains: [governance]`；若突破 `packages/ui/**` 两类属性限制则加 `domains: [governance]`）；② 若属 `P2`（PM 错误路径/正文清理），依 `AGENTS.md` D1-12（`:18,23,26-27`）与 `.omp/agents/argon-governance.md:25` 规定，所有 `P2` 事项无论代码路径如何均属于治理域（必带 `domains: [governance]`，由含 `ArgonGovernance` 第 5 票的 5 席投票）。<br>3. **后续承载路由（`WEB-07` `Pepgent#29`）：** `PR#75` 已合入不可回写（`AGENTS.md` C4-2），且 `D36-02 v2`（`LEDGER.md:79`）与 `D8-mvp-scope.md:341` 已明确 `D35-01 v3` 在 `WEB-03` 关闭时未交付的回看接线由同一 `W-10` 席位的 `WEB-07`（`Pepgent#29`）承接。任何后续 `replay-at.ts` 调整随 `WEB-07`（`#29`）一并承载、不另开新切片 issue，符合 `D16-09`、`D20-01` 与 `C4-2`。 |
| **B-3：送达路径（协调席将结论写回 `PR#75` 评论，实际送达 `W-10` 由 `AreaMgrPepgent` 负责，治理承接者不直连工人）** | **实际送达尚未发生/未证实（计划不当作已送达状态，`AGENTS.md` C4-1/C4-2）** | 治理承接者不直接联系工程席位符合 `AGENTS.md` C3-2 与 C4-2；但按 `AGENTS.md:80-81`（C4-1、C4-2）与权威源头规则（“索引与意图不当作状态使用”），“计划由 `AreaMgrPepgent` 送达”仅属意图，不构成已送达结论。必须在议程定案及评论写回后，由对应片区经理 `AreaMgrPepgent` 实际执行 `peer_send` 并经 `peer_ask` 或工作空间变化观察确认 `W-10` 已收到后，方可记为送达完成。 |
