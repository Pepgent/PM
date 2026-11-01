# 闸门 B 裁决：`Pepgent#19`（LAB-09）W-09 `BLOCKED` 两路 lifecycle 订阅合并提议（`pepgent19-lifecycle-merge-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent19-lifecycle-merge.md`
- **关联议题与 PR：** [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)（评论 [`#issuecomment-6562606897`](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6562606897)）、[PR#62](https://github.com/Pepgent/Pepgent/pull/62)、[PR#64](https://github.com/Pepgent/Pepgent/pull/64)
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T19:20Z`

---

## 一、总局判定结论

1. **对合并改造提议本身（做法 ① 与做法 ②）：判定为【越界】（触及已通过决策 `D30-02` v1 的 `how` 栏及回写后的 `D7-10` 公开契约正文，未经 `P0` 议会表决修订 `D30-02` 前，严禁单方按“私有结构”免票放行实施合并）。**
2. **对初审可选处置 `a`（直接撤回该合并提议，维持 `PR#62`/`PR#64` 已按 `D30-02` v1 合入 `main` 的两路独立订阅现状，不立案表决）：判定为【完全符合治理程序，免投票直接以“不实施该改造提议、维持已通过契约现状”结案】！**

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

### 4. `B-4`（撤回越界改造提议、维持已合入现状且不立案表决是否合程序）：**完全合程序，支持采用处置 `a` 直接撤回提议结案**

- **依据：**
  - 現状的两路独立订阅（`followLifecycle` 从 `"0"` 起读、`followAutomationEvents` 从 `after=<落库游标>` 起读）本身就是严格按照已通过的 `D30-02` v1 与 `D7-10` 实现并已合入 `main` 的合规状态，对功能与正确性无任何影响（仅对同一 store 多一条 SSE 长连接）。
  - 该合并提议既非 `(U)` 用户原话要求，也非既有切片（`LAB-09` / `Pepgent#19`）的验收条件。当一项额外改造提议被闸门判定为触及已通过决策正文时，起草人选择**撤回该改造提议、維持已通过的 `D30-02` 契约与已合入实现（处置 `a`）**，不产生任何契约变更，因此无需为“不修改 `D30-02`”另行发起 `P0` 投票（符合 `U88` 杜绝无谓流程空转）。
  - 由协调席在 [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19) 评论明确“不实施两路 lifecycle 订阅合并改造，维持 `D30-02` v1 与 `PR#62`/`PR#64` 已合入的两路独立订阅现状”，并经 `AreaMgrPepgent-3` 单向送达 `W-09` 解除该条 `BLOCKED`。
