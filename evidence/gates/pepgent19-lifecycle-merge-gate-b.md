# 闸门 B 裁决：`Pepgent#19`（LAB-09）W-09 `BLOCKED` 两路 lifecycle 订阅合并提议（`pepgent19-lifecycle-merge-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent19-lifecycle-merge.md`
- **关联议题与 PR：** [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)（评论 [`#issuecomment-6562606897`](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6562606897)）、[PR#62](https://github.com/Pepgent/Pepgent/pull/62)、[PR#64](https://github.com/Pepgent/Pepgent/pull/64)
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T19:24Z`

---

## 一、总局判定结论

1. **对合并改造提议本身（做法 ① 与做法 ②）：判定为【越界】（触及已通过决策 `D30-02` v1 的 `how` 栏及回写后的 `D7-10` 公开契约正文，未经 `P0` 议会表决修订 `D30-02` 前，严禁单方按“私有结构”免票放行实施合并）。**
2. **对初审可选处置 `a`（撤回该合并提议，维持 `PR#62`/`PR#64` 已按 `D30-02` v1 合入 `main` 的两路独立订阅现状，不立案表决）：在治理程序上不越界；但依 `.omp/agents/argon-governance.md` 第 6 条与 `AGENTS.md` C2-2.2，【必须以 `Argon` 闸门 A（`pepgent19-lifecycle-merge-gate-a.md`）同样记录确认支持处置 `a` 为前置条件】——在闸门 A 裁决正式落盘并确认前，暂停送达解阻，严禁仅凭闸门 B 单方通知片区经理放行！**

---

## 二、逐项判定（对应初审第四节 `B-1` ～ `B-4`）

### 1. `B-1`（席位路径白名单）：**路径在 `W-09` 白名单内**

- **依据：** 两种做法涉及的 `apps/web/src/server/lab/{experiments,automation,runtime}.ts` 均位于 `D16-09` 规定的 `W-09`（`pepgent-lab`）独占路径白名单内，不涉及跨席位文件写入。

### 2. `B-2`（是否修改已通过决策正文、是否属必须投票事项）：**做法 ① 与做法 ② 均越界，若要实施必须按 `P0` 投票修订 `D30-02`**

- **依据：**
  - **做法 ②（单流从落库游标起读）：** 直接改变 `LAB-06` `followLifecycle` 从 `"0"` 幂等重放以重建仍 Open 运行 watcher 的生命周期行为，违反 `D30-02` v1 与 `D7-10` 明文规定的“`LAB-06` 的 `followLifecycle` 不变”。
  - **做法 ①（单流从 `"0"` 起读，自动化按落库游标跳过）：** `D30-02` v1（4/4 全票通过，`evidence/decisions/D30-pepgent-19-lab-automation.md:37`）的 `how` 栏及已回写的 `D7-10`（`evidence/decisions/D7-lab-backend.md:70`）逐字规定：“自动化对该 Lab 的 store 以 `GET /stream/lifecycle?after=<落库游标>` 订阅……每次启动不再对历史事件重复开会话……`LAB-06` 的 `followLifecycle` 不变”。将自动化的订阅起点从 `after=<落库游标>` 改为从 `"0"` 全量重放并在客户端比较跳过，实质改写了已通过决策行 `D30-02` 的 `how` 与取舍。
  - 依 `AGENTS.md:123`（“leader 不当契约来源：契约空白或冲突进入议会表决，管理层不直接拍板契约内容”）与 `.omp/agents/argon-governance.md` 第 6 条（防 `D15` 式回退），治理承接者与 `Main` 均不得把改写已通过决策行 `how` 的做法单方标为“私有代码结构”免票放行；若真要改为单流，只能走处置 `c` 按 `P0` 立案修订 `D30-02`。

### 3. `B-3`（未定期间保持两路现状是否符合“只暂停依赖部分”）：**完全合规**

- **依据：** `W-09` 在上报评论 `6562606897` 时保持 `PR#62`/`PR#64` 已合入 `main` 的两路独立订阅实现不变，未在双闸门裁决前先行改写合入，且其余不依赖该提议的工作照常推进，严格遵守了 `D10-08`、`AGENTS.md:123`（“只暂停依赖它的那部分工作”）与 `C2-2.2`。

### 4. `B-4`（撤回越界改造提议、维持已合入现状且不立案表决是否合程序，及与闸门 A 的联合放行条件）：**治理程序合规，但须待闸门 A 裁决落盘一致后方可送达解阻**

- **依据：**
  - 现状的两路独立订阅（`followLifecycle` 从 `"0"` 起读、`followAutomationEvents` 从 `after=<落库游标>` 起读）本身就是严格按照已通过的 `D30-02` v1 与 `D7-10` 实现并已合入 `main` 的合规状态。
  - 当一项额外改造提议被闸门判定为触及已通过决策正文时，起草人选择撤回该改造提议、维持已通过的 `D30-02` 契约与已合入实现（处置 `a`），不产生任何契约变更，因此无需为“不修改 `D30-02`”另行发起 `P0` 投票（符合 `U88`）。
  - **正交双闸门前置条件（`C2-2.2` / `.omp/agents/argon-governance.md:20-21`）：** 仅当 `Argon` 闸门 A（`pepgent19-lifecycle-merge-gate-a.md`）已正式落盘且同样确认按处置 `a` 撤回提议、维持现状（或无需立案）时，方可由协调席在 [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19) 评论并经 `AreaMgrPepgent-3` 送达 `W-09` 解除该条 `BLOCKED`；在闸门 A 记录完成前，暂缓送达。
