# 闸门 B 裁决：`Pepgent/Pepgent#78` `W-09 BLOCKED` 二类（合入族与 `D38-02 v2`“同一事务”原文冲突，`pepgent78-merge-txn-gate-b.md`）

- **初审材料：** `evidence/gates/pepgent78-merge-txn.md`（`DeskPepgent78Txn`）
- **关联议题：** [Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)（`BLOCKED` 评论 [`#issuecomment-6564186088`](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) 第二节“二、`library.merge`、`library.apply`：与‘同一事务’原文的确切冲突”）
- **把关席位：** `ArgonGovernance`（`ArgonGovernance-2`，组织治理与分配守护席，正交闸门 B）
- **核对基准：** 已逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–143 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核实不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`、`D16-13`）、`Pepgent/Pepgent#78` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/library.ts:315-418`、`operations.ts:295-305`。

---

## 一、总局判定汇总

| 审查项 | 闸门 B 结论 | 组织、路径白名单、阶段门禁与投票路由依据 |
|---|---|---|
| **1. 是否越过席位路径白名单或阶段门禁** | **不越过白名单或阶段门禁** | 经独立直读 `apps/web/src/server/lab/library.ts:315-418` 与 `operations.ts:295-305`，`library.merge`、`library.apply`、`agentTemplate.saveVersion` 的合入及 `activity` 行写入均限 `apps/web/src/server/lab/**`，完全位于 `D16-09` 授予 `W-09`（`pepgent-lab`）的排他路径白名单内；wire 形状不变（不改 `apps/web/src/protocol/lab/**`），仍由既有 `Pepgent#78` 承载；阶段 B 仅执行本仓编译、类型与基础检查（符合 `C1-3`、`D16-13`）。 |
| **2. 是否属于必须投票事项（改写已定案 `D38-02 v2` / `D12:214` 写入语义）** | **越界（`K2`），必须进入议会表决** | `D38-02 v2`（[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)）与 `D12:214` 已由议会定案写明“上述命令成功落库时，在同一事务写一行 activity”。将节点合入族三命令改为“在 `merge()` `git push` 成功后于 `lab.sqlite` 写 `activity` 行（`library.apply` 与删除 `library_staging` 同事务）”，属于改写已定案决策行与 `D12` 的持久化/事务生命周期语义，按 `AGENTS.md:123` 与 `D10-08` 严禁协调席或 `Main` 在 `#78` 评论中以“实现期澄清”单方放行；且因 `D38` 已定案归档不可 `council revise`，必须依 `C2-2.2` 通过 `council propose` 另立议程表决。 |
| **3. 立案的 `P0` 定级与 `domains` 是否正确** | **`priority: P0`、不加 `domains: [governance]`（4 席契约行，门槛 3）完全正确** | 1. **`P0` 定级依据（`AGENTS.md` D1-12、C2-3）：** `W-09` 已在 [Pepgent/Pepgent#78#issuecomment-6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) 正式上报 `BLOCKED`，且 `library.merge` 入口已在 `main` 上、直接受阻于本事务语义冲突，属于关键路径工程 `BLOCKED` 解阻，定级 `P0` 正确。<br>2. **不加 `domains: [governance]` 依据：** 本议程仅修订 `D38-02 v2` / `D12:214` 中合入族 `activity` 写入时机，代码落点仍在 `W-09` 既有 `apps/web/src/server/lab/**` 白名单与既有承载 `Pepgent#78` 内，不改变席位路径白名单、不新增切片或改变管理层组织制度，故按 4 席契约行投票（不加 `domains: [governance]`）。 |
