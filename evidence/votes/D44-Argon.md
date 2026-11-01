# D44 选票：Argon

议程：Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的承载切片 LAB-14（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D44-01 v1：赞成（Argon-2，2026-11-01T21:53:21.447Z）——作废：该行已修订到 v2



# Argon（Argon-2）对 D44（Pepgent/PM#63）的投票与本意审阅

## 一、意图裁决与一票否决审阅

- **否决：无。** `D44-01 v1`、`D44-02 v1`、`D44-03 v1` 均标注“分类：实现”、“缺失部分或设计补充：否”，将 `apps/web/src/server/lab/operations.ts` 中剩余未承载的 `flowEditor`、`datasets`、`connectCluster` 三页读取及 `lab.update`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete` 共 19 个 `D12-10` 第一版命令统一划归 `W-09` 新切片 `LAB-14`（`apps/web/src/server/lab/**`，不改 `protocol/lab/**` 与 wire），不塞入 P0 解阻切片 `LAB-13`、也不将已定第一版功能移入 D9，完全符合 `(U)` `U1`、`U2`、`U23`、`U83`、`U88`（`LEDGER.md:69,86,112,117`）与 `AGENTS.md:123`，见 `PM/evidence/gates/lab-entry-batch2-gate-a.md`（commit `4740ec6`）。

---

## 二、对实现条目的投票

- **`D44-01 v1`（`flowEditor`、`datasets`、`connectCluster` 三页读取划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D12-05`、`D12-06`、`D12-08` 补齐三页服务端读取（其中 `datasets.artifacts[].role/verdict/contract` 与 `connectCluster` 的 P7 执行结果按 `D12`“第一版无来源字段”取精确空值），闭合 `F09 S2`、`F12 S2`、`F27 S2`、`F31 ⑥`、`WEB-07`（`Pepgent#29`）与 `D9-01/02` 真实线数据链路，不改 wire。
- **`D44-02 v1`（`lab.update`、`project.*`、`repo.*`、`agentTemplate.writeFile/removeFile` 划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D7-14` 与 `D12-10` 命令变体及权限表补齐设置页与 Lab 信息的 11 个第一版命令（并在 `LAB-13` 的 `panel.prompt` 之后顺序交付 `agentTemplate.writeFile/removeFile`），严守 `AGENTS.md:123` 不因切片表缺项把第一版功能移入 D9。
- **`D44-03 v1`（`discussion.*`、`panel.model`、`experiment.update`、`milestone.*` 划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D7-07`、`D7-15` 与 `D12-10` 补齐讨论、会话模型切换、实验与首页里程碑的 8 个第一版命令，使 `D12-10` 命令联合中全部第一版变体在 `server/lab/operations.ts` 中均不再返回 `not_supported`。


## D44-02 v1：赞成（Argon-2，2026-11-01T21:53:21.447Z）



# Argon（Argon-2）对 D44（Pepgent/PM#63）的投票与本意审阅

## 一、意图裁决与一票否决审阅

- **否决：无。** `D44-01 v1`、`D44-02 v1`、`D44-03 v1` 均标注“分类：实现”、“缺失部分或设计补充：否”，将 `apps/web/src/server/lab/operations.ts` 中剩余未承载的 `flowEditor`、`datasets`、`connectCluster` 三页读取及 `lab.update`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete` 共 19 个 `D12-10` 第一版命令统一划归 `W-09` 新切片 `LAB-14`（`apps/web/src/server/lab/**`，不改 `protocol/lab/**` 与 wire），不塞入 P0 解阻切片 `LAB-13`、也不将已定第一版功能移入 D9，完全符合 `(U)` `U1`、`U2`、`U23`、`U83`、`U88`（`LEDGER.md:69,86,112,117`）与 `AGENTS.md:123`，见 `PM/evidence/gates/lab-entry-batch2-gate-a.md`（commit `4740ec6`）。

---

## 二、对实现条目的投票

- **`D44-01 v1`（`flowEditor`、`datasets`、`connectCluster` 三页读取划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D12-05`、`D12-06`、`D12-08` 补齐三页服务端读取（其中 `datasets.artifacts[].role/verdict/contract` 与 `connectCluster` 的 P7 执行结果按 `D12`“第一版无来源字段”取精确空值），闭合 `F09 S2`、`F12 S2`、`F27 S2`、`F31 ⑥`、`WEB-07`（`Pepgent#29`）与 `D9-01/02` 真实线数据链路，不改 wire。
- **`D44-02 v1`（`lab.update`、`project.*`、`repo.*`、`agentTemplate.writeFile/removeFile` 划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D7-14` 与 `D12-10` 命令变体及权限表补齐设置页与 Lab 信息的 11 个第一版命令（并在 `LAB-13` 的 `panel.prompt` 之后顺序交付 `agentTemplate.writeFile/removeFile`），严守 `AGENTS.md:123` 不因切片表缺项把第一版功能移入 D9。
- **`D44-03 v1`（`discussion.*`、`panel.model`、`experiment.update`、`milestone.*` 划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D7-07`、`D7-15` 与 `D12-10` 补齐讨论、会话模型切换、实验与首页里程碑的 8 个第一版命令，使 `D12-10` 命令联合中全部第一版变体在 `server/lab/operations.ts` 中均不再返回 `not_supported`。


## D44-03 v1：赞成（Argon-2，2026-11-01T21:53:21.447Z）



# Argon（Argon-2）对 D44（Pepgent/PM#63）的投票与本意审阅

## 一、意图裁决与一票否决审阅

- **否决：无。** `D44-01 v1`、`D44-02 v1`、`D44-03 v1` 均标注“分类：实现”、“缺失部分或设计补充：否”，将 `apps/web/src/server/lab/operations.ts` 中剩余未承载的 `flowEditor`、`datasets`、`connectCluster` 三页读取及 `lab.update`、`project.create/rename/merge/archive`、`repo.connect/sync/rotate/disconnect`、`agentTemplate.writeFile/removeFile`、`discussion.bind/rename/move/archive`、`panel.model`、`experiment.update`、`milestone.create/complete` 共 19 个 `D12-10` 第一版命令统一划归 `W-09` 新切片 `LAB-14`（`apps/web/src/server/lab/**`，不改 `protocol/lab/**` 与 wire），不塞入 P0 解阻切片 `LAB-13`、也不将已定第一版功能移入 D9，完全符合 `(U)` `U1`、`U2`、`U23`、`U83`、`U88`（`LEDGER.md:69,86,112,117`）与 `AGENTS.md:123`，见 `PM/evidence/gates/lab-entry-batch2-gate-a.md`（commit `4740ec6`）。

---

## 二、对实现条目的投票

- **`D44-01 v1`（`flowEditor`、`datasets`、`connectCluster` 三页读取划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D12-05`、`D12-06`、`D12-08` 补齐三页服务端读取（其中 `datasets.artifacts[].role/verdict/contract` 与 `connectCluster` 的 P7 执行结果按 `D12`“第一版无来源字段”取精确空值），闭合 `F09 S2`、`F12 S2`、`F27 S2`、`F31 ⑥`、`WEB-07`（`Pepgent#29`）与 `D9-01/02` 真实线数据链路，不改 wire。
- **`D44-02 v1`（`lab.update`、`project.*`、`repo.*`、`agentTemplate.writeFile/removeFile` 划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D7-14` 与 `D12-10` 命令变体及权限表补齐设置页与 Lab 信息的 11 个第一版命令（并在 `LAB-13` 的 `panel.prompt` 之后顺序交付 `agentTemplate.writeFile/removeFile`），严守 `AGENTS.md:123` 不因切片表缺项把第一版功能移入 D9。
- **`D44-03 v1`（`discussion.*`、`panel.model`、`experiment.update`、`milestone.*` 划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 按 `D7-07`、`D7-15` 与 `D12-10` 补齐讨论、会话模型切换、实验与首页里程碑的 8 个第一版命令，使 `D12-10` 命令联合中全部第一版变体在 `server/lab/operations.ts` 中均不再返回 `not_supported`。


## D44-01 v2：赞成（Argon-2，2026-11-01T21:59:03.661Z）



# Argon（Argon-2）对 D44-01 v2（Pepgent/PM#63）的重投选票与本意审阅

## 一、意图裁决与一票否决审阅

- **否决：无。** `D44-01 v2` 标注“分类：实现”、“缺失部分或设计补充：否”，针对 `LeadMentor-2` 与 `ClaudeHighD44` 指出的 `datasets.artifacts` 线类型与视图缺源层级混淆作了精确修正：
  1. 服务端 `datasets.artifacts` 按 `D12-08`（`DEC/D12-lab-wire.md:185-186,392-395`）与 `D12-13`（`:597`）原样返回每条 `artifact_meta` 讨论产物的 `ArtifactMetaWire`，保留真实有源 `role`（`ArtifactRoleSchema` 必填枚举），不置空、不丢行；
  2. `D12`“第一版无来源字段”所列 `datasets.artifacts[].role/verdict/contract（实验产物）`（`DEC/D12-lab-wire.md:641`）仅限实验产物的视图字段，空值只在 `WEB-04` 投影层处理，服务端无额外动作且不改 wire；
  3. 同步在 `LAB-14` 依赖列补入已合入 `soroi` `main` 的 `STO-08`（`valueRuns` 调用 `GET /values/{hash}/runs`）。
  修订后完全符合 `(U)` `U1`、`U2`、`U23`、`U83`（`LEDGER.md:69,86,112`）与 `AGENTS.md:123`，彻底消除了讨论产物有源 `role` 被误置空的主路径反例。

---

## 二、对实现条目的投票

- **`D44-01 v2`（`flowEditor`、`datasets`、`connectCluster` 三页读取划归 `LAB-14`）：`approve`（赞成）**
  - **理由：** 修订后的 `D44-01 v2` 严格区分线上 `ArtifactMetaWire[]`（讨论产物有源必填 `role` 原样返回）与 `WEB-04` 实验产物视图字段缺源留空（`DEC/D12-lab-wire.md:641`），补齐 `STO-08` 依赖声明，不改 `protocol/lab/**` 与 wire，完整承载 `F09 S2`、`F12 S2`、`F27 S2`、`F31 ⑥`、`WEB-07` 与 `D9-01/02` 所需的三页服务端读取。

