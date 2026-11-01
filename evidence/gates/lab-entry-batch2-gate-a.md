# 闸门 A 裁决：Lab 第二批未承载入口（flowEditor/datasets/connectCluster 三页读取与 19 个第一版命令的承载切片 LAB-14）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/PM#61](https://github.com/Pepgent/PM/issues/61)（`D42`）、[Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)（`WEB-07`），`PM/evidence/gates/lab-entry-batch2.md`、`PM/evidence/gates/lab-entry-batch2-proposal.yaml`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86`：已有前端界面接通后端与 e2e 全流程走通，功能不收缩）、`U83`、`U88`（`LEDGER.md:112,117`：按切片职责推进，同席同域不拆碎 issue）。
  - `(D)` `SOR/AGENTS.md:26,45,60,123`（D1-12、C1-3、C2-2、禁止据接口/切片表缺项把功能移入 D9、尚未定案的派工归属须经表决）、`DEC/D7-lab-backend.md:67,74,75,89,93-95,98,101-106`（D7-07、D7-14、D7-15 与字段表）、`DEC/D8-mvp-scope.md:87,128,131,146,150,321-334,338,340,413,420`（D8-16、F09/F12/F27/F31、D8 §4.2、D9-01/02）、`DEC/D12-lab-wire.md:38,40,42,540-561,625,636,640`（D12-06、D12-08、D12-10、第一版无来源字段）、`DEC/D16-phaseB-review-restore.md:27`（D16-03）、`DEC/D42-lab-entry-ownership.md`。

---

## 一、闸门 A 总体判定

- **结论：** **完全赞同议程草案三行（`D-01`、`D-02`、`D-03` 统一划归 `W-09` 新切片 `LAB-14`，路径白名单 `apps/web/src/server/lab/**`）及切片取舍，同意按 P1 立案表决。**

---

## 二、逐项依据

1. **不改变任何已定公开契约，且完整闭合 `D7`、`D12-06/08/10` 第一版服务端入口与 `F09`/`F12`/`F27`/`F31`/`D9-01..02` 主路径：**
   - `flowEditor`、`datasets`、`connectCluster` 三页读取及 `lab.update`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete` 共 19 个命令的线协议形状、参数、结果、权限及 `server/lab/schema.ts` 表结构均已在 `D7` 与 `D12` 中定案，不改 `protocol/lab/**` 与 wire。
   - 补齐 `LAB-14` 后，`apps/web/src/server/lab/operations.ts` 中全部 `D12-08` 页面读取与 `D12-10` 第一版命令均不再返回 `not_supported`，使 `WEB-07`（`Pepgent#29`）13 页真实数据与命令接线、`Pepgent#30` 浏览器验收及阶段 C 全链路（含 `F09 S2`、`F12 S2`、`F27 S2`、`F31 ⑥`、`D9-01/02`）彻底消除服务端入口缺口。
2. **`D8-16` 与 `D12-10` 关系及反“列入 D9”落选项确认：**
   - 初审材料 `G-10` 的判定完全成立：`D12-10`（经 `D16-03` 恢复）已按 `D8-16` 逐项列出命令联合中列入 D9 的排除项（`image.build/template.bind`、`cluster.connect`、`sandbox.create`、`job.restart/destroy`、`shell`、预检查），而 `D12`“第一版无来源字段”仅将 `datasets.artifacts[].role/verdict/contract` 与 `connectCluster` 的 P7 执行结果列 D9（投影留空）。
   - 本批三页读取与 19 个命令均不在 D9 排除清单内；依 `(U)` `U2`、`U23` 与 `SOR/AGENTS.md:123`（“接口或权限表缺少某项不构成授权：禁止据此……把功能移入 D9”），落选项“列入 D9”在产品意图上绝不成立。
3. **切片取舍（单列 `LAB-14`、不塞入 `LAB-13`、也不拆碎多个 issue）成立：**
   - `LAB-13`（`D42`）是解除 `Pepgent#78` P0 `BLOCKED` 的直接前置，保持 `LAB-13` 精简并在其后紧接单列同席同域的 `LAB-14`（P1），既不拖慢 `#78` 解阻，又遵循 `U83` 不拆碎同席位同路径域工作。
