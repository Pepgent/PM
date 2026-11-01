# 闸门 B 退回声明：`soroi#250`（E2E-13）W-08 非 `BLOCKED` 产品缺陷登记不设事前闸门盖章（`w08-f22-defects-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/w08-f22-defects.md`
- **关联议题：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（评论 [`#issuecomment-6562476097`](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562476097)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席）
- **更新时间：** `2026-11-01T19:22Z`

---

## 一、退回前置盖章与反设卡声明（依 `U88` 及 `.omp/agents/argon-governance.md` §6、§9、§16、§22）

1. **撤回前置闸门 B 盖章，退回由普通 owner 路由直接办理：**
   - `w08-f22-defects.md:4` 已明确记录：“这不是正式 `BLOCKED`：W-08 声明 spec 判据不降，也不阻塞当前驱动的编写”，且两项缺陷（`supervisor.ts` sidecar 缺 `role`、`reminder.ts` 批次提醒缺 `purpose` 组头）均属已通过契约（`D5 §3.1`、`D5-13`、`D5 §3.5`、`D8` SOR-08/SOR-12/F22）及 `D16-09` `W-07`（`packages/omp-soroi/**`）独占白名单内的常规实现偏差。
   - 依 `.omp/agents/argon-governance.md` 第 6 条（“对已通过契约与路径白名单内的常规开发，不设事前投票，由你做事后检查”）、第 9 条（严防“层层设卡，用严谨包装阻挠”）、第 16 条（“对于非你职责的事情，如果有 irc 进入，必须返回，这种事项禁止发给你”）与 `U88`（禁止增加多余盖章流程），**非正式 `BLOCKED` 的既有契约内常规缺陷承载严禁送交事前双闸门盖章或审批排期**！
2. **常规路由与事后检查边界：**
   - 本席**撤回并拒绝**将本项作为事前闸门 B 准入裁决：协调席/承接者直接按既有 `D16-09` owner 路由在 `Pepgent/soroi` 开出 `W-07` 承载 issue 并在 `#250` 附链接，由 `Main` 按常规 `D16-10` 排期处理；本席仅保留合入后的常规事后非阻塞检查。
