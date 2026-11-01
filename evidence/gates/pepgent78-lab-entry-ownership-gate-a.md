# 闸门 A 裁决：Pepgent#78 BLOCKED 一类（Lab 首页/容器/设置读取、P15 导出与成员/结论/模板版本/Panel 新建命令的承载切片）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)（[评论 6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088)），`PM/evidence/gates/pepgent78-lab-entry-ownership.md`、`PM/evidence/gates/pepgent78-lab-entry-ownership-proposal.yaml`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86`：已有前端界面接通后端与 e2e 全流程走通，功能不收缩）、`U83`、`U88`（`LEDGER.md:112,117`：按切片职责推进，不拆碎同域工作）。
  - `(D)` `SOR/AGENTS.md:26,60,123`（D1-12、C2-2、禁止据切片/接口表缺项把功能移入 D9、尚未定案的派工归属须经表决）、`DEC/D7-lab-backend.md:65,71,73,87,95,102,105,106`、`DEC/D8-mvp-scope.md:148-150,321-334,340,420`（F29–F32、D8 §4.2 LAB 切片表、WEB-06、D9-02）、`DEC/D12-lab-wire.md:40,42,447,508,544,549,654`（D12-08、D12-10、P15）、`DEC/D38-pepgent-28-web06-cluster-activity-image.md`。

---

## 一、闸门 A 总体判定

- **结论：** **完全赞同议程草案三行（`D-01`、`D-02`、`D-03` 统一划归 `W-09` 新切片 `LAB-13`，路径白名单 `apps/web/src/server/lab/**`），按 P0 立案表决。**
  1. **不改变任何已定公开契约，且是兑现产品原始意图的必要承载补齐：** `home`、`containers`、`settings` 三页读取、`P15` `ImageDefinition` 导出、`member.invite/role/quota/remove`、`conclusion.confirm`、`agentTemplate.saveVersion` 与 `panel.prompt` 的线协议形状、行为语义与权限均已在 `D7`、`D12-08`、`D12-10` 与 `D38` 中定案，`protocol/lab/**` 类型齐全；仅因 `D8` §4.2 `LAB` 切片表漏记服务端承载切片才在 `operations.ts` 返回 `not_supported`。将它们集中补入 `W-09` 的 `LAB-13` 不改 wire，直接打通 `Pepgent#78`、`WEB-06`（`Pepgent#28`）线数据录制及 `F29 S2`、`F30 S2`、`F31`、`F32` 主路径。
  2. **落选项“列入 D9”或“由部署 seed 预建 Panel 会话”在产品意图上均不成立（若采纳将触发本席依 `(U)` `U2`/`U23` 否决）：**
     - **严禁列入 D9：** `D12-08` 已将 `home`、`containers`、`settings` 定为第一版页面读取，`D12-10` 的 D9 排除清单亦不含上述七条命令；依 `(U)` `U2`、`U23` 与 `SOR/AGENTS.md:123`（“接口或权限表缺少某项不构成授权：禁止据此……把功能移入 D9”），不得因 `D8` 切片表漏记承载而把第一版已定功能缩减进 D9。
     - **严禁以部署 seed 代替 `panel.prompt`：** 按 `DEC/D12-lab-wire.md:42,508,549`，Panel 会话在不存在时以当前操作者为 `owner` 按 `{ page, scope }` 动态新建，且 `library.apply`（`F29 S2`）与 `agentTemplate.saveVersion` 均校验操作者为该 Panel 会话的 `owner`，静态部署 seed 无法替代 `panel.prompt` 的真实新建与入队语义。

---

## 二、对初审材料第五节第 1 项（其余未承载第一版入口）的意图提示

- 初审材料第五节第 1 项列出的 `flowEditor`、`datasets`、`connectCluster` 三页读取及 `lab.update`、`project.*`、`repo.*`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete` 共 16 个命令，同样属于 `D7`、`D12-08`、`D12-10` 已定案的第一版入口（且直接支撑 `F09 S2`、`F12 S2`、`F27 S2` 与 `WEB-04`/`WEB-06`/`WEB-07` 真实后端读取），**同样严禁移入 D9**。
- 本次 P0 议程聚焦解除 `Pepgent#78` 的直接 `BLOCKED` 完全合理；上述剩余未承载入口应由总协调席紧接安排 `W-09` 切片承载立项，确保 `WEB-07` 与阶段 C 全链路无 `not_supported` 缺口。
