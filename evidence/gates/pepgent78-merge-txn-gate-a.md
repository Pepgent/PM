# 闸门 A 裁决：Pepgent#78 BLOCKED 二类（节点合入族 `git push` 与 `lab.sqlite` `activity` 写入时机）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)（[评论 6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088)），`PM/evidence/gates/pepgent78-merge-txn.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86`：全流程走通，功能不收缩）、`U83`、`U88`（`LEDGER.md:112,117`：按主路径与既有契约推进）。
  - `(D)` `SOR/.claude/rules/design-assumes-it-works.md`（设计阶段只写主路径，不为失败分支或中途失败后的一致性设计处理）、通用规则《权威源头与生命周期》（“向源头请求并等待结论，再依结论记录”）、`SOR/AGENTS.md:60,123`（C2-2、D10-08）、`DEC/D7-lab-backend.md:62,71`（D7-02、D7-11）、`DEC/D12-lab-wire.md:42,214,447,521`、`DEC/D38-pepgent-28-web06-cluster-activity-image.md:20`。

---

## 一、闸门 A 判定结论

1. **产品原始意图与公开契约判定（不越界）：**
   - 把节点合入族（`library.merge`、`library.apply`、`agentTemplate.saveVersion`）明确为 **“在 `merge()` 的 `git push` 成功后，于 `lab.sqlite` 写入 `activity` 行（其中 `library.apply` 与删除 `library_staging` 在同一 SQLite 事务内执行）；成员与结论两族仍在原 SQLite 落库事务内写 `activity` 行；wire 形状不变，不为 `push` 后 SQLite 写入失败设计失败分支或额外字段”**，**完全符合 `D7-02`、`D7-11`、`D12-10` 与 `D38-02 v2` 的产品原意，不改变任何跨组件公开契约或 wire 形状。**
   - 排除“读取时从 git 历史投影”：git commit 不含操作成员 `actor`、命令名 `kind` 与讨论所属 `project`（`F-9`），且违背 `D7-02`“activity 表记 Lab 自有事件”与 `D38-02 v2` 写行模型。
2. **关于是否须表决 vs 可在 `#78` 免投票作答（K1+K2，闸门 A 判不越界，并兼容闸门 B 程序裁量）：**
   - **从意图与契约角度（K1 + K2，本席判不越界、无需为意图缺口立表决）：**
     - 按 `D7-11`（`DEC/D7-lab-backend.md:71`），节点合入的权威源是 Lab 库 git 远端默认分支（`git push`），而非 `lab.sqlite`；按《权威源头与生命周期》“向源头请求并等待结论，再依结论记录”，对跨 `git` 与 `lab.sqlite` 的合入族命令而言，等 `git push` 确认成功后再在 `lab.sqlite` 事务内记录 `activity`（对 `library.apply` 则与删除 `library_staging` 同处该 SQLite 事务）本来就是 `D38-02 v2` 在主路径上的唯一正确含义（**K1**）。
     - W-09 所问“push 成功但写 activity 失败或 `staging: 'retained'` 时如何处理”属于典型的跨资源中途失败分支（**K2**），按 `SOR/.claude/rules/design-assumes-it-works.md`（“不考虑并发顺序、锁、幂等、重入或中途失败后的一致性”）设计阶段只写主路径，不设失败分支。
   - **与闸门 B（`ArgonGovernance`）的衔接：**
     - 若闸门 B 亦确认属 K1+K2，可直接在 `#78` 写明上述主路径结论免投票放行；
     - 若闸门 B 依 `SOR/AGENTS.md:123` 认定修改 `D38-02 v2` / `DEC/D12-lab-wire.md:214` 与 `#78` 预期结果 1 中的字面措辞“在同一事务”须走 P0 议程，**本席同步确认初审材料第四节的 P0 议程草案（`D-01`）在产品意图与公开契约上完全成立，可直接立案。**
