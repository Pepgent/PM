# 闸门 B 裁决：`soroi#321`（`council` 工人总线树）未经操作员确认的 14 行条文立案前初审

- **裁决席位：** 组织治理与分配守护席 `ArgonGovernance-2`（闸门 B）
- **审阅材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/council-tree.md`（快照 `#074D`）、`/tmp/council-tree-draft.yaml`（快照 `#B2F3`）、`LEDGER.md`（`U90`、`U104–U111`）、`AGENTS.md`（`C2-2`、`C2-3`、`C2-4`、`C4-1`、`C4-2`、`C4-3`、第 123–125 行）

---

## 一、总体闸门 B 结论

**【必须进入议会逐行表决（优先级 `P3`），且在表决通过前冻结 `Pepgent/council PR#5` 合入与工人总线激活】**

`soroi#321` 树中除操作员已直接确认的 4 条原话（已登记为 `LEDGER.md` `U108–U111`）外，其余由转达会话 `01a197b3` 起草、未经操作员确认的 14 行条文（`01–14`）改变了领导层与工人的状态权威、通信边界、片区经理触发细则、派工与回执机制及跨仓部署配置，必须通过议会逐行表决后方可合入 `Pepgent/council` `main` 并激活切换。

---

## 二、逐问裁决（B-1 ～ B-3）

### 1. B-1：优先级 `P3`、各行分类与 `domains: [governance]` 标注

1. **优先级 `P3` 成立：**
   - 本议案属于领导层组织工作流与 `omomp` 提效（`U90`、`U104`、`U108–U111`），不属于工程关键路径 `BLOCKED`（`P0`）、产品全景接缝纠偏（`P1`）或 `PM` 错误路径清理（`P2`，移除 `Pepgent/PM` 内旧 `tools/council` 副本由 `PM#41` 承载）。
   - 当前议会 `P0–P2` 队列已清空（`D30`、`D31`、`D32` 均已结案归档），以 `P3` 立案可立即进入表决，不阻塞任何高优事项。
2. **各行分类与 `domains: [governance]` 标注：**
   - `01`、`03`、`06` 标为 `治理`，`02`、`05`、`07`、`08`、`09`、`10`、`12`、`13`、`14` 标为 `串联`，`04`、`11` 标为 `技术`，`missingDesign: false`（`council` 为管理层治理工具，不属 `soroi` 产品 `design/` 基线，具体产品意图边界以闸门 A `Argon` 裁决为准），分类成立。
   - **关于 `domains: [governance]`：** `01–03`、`05–10`、`12–14` 标注 `domains: [governance]` 完全成立；此外，**第 `04` 行（跨 `Pepgent/council` 与 `homelab-tf#600` 的本机守护进程/凭据注入边界）与第 `11` 行（在整个 `Pepgent` GitHub org 挂载组织级 webhook 及本机 `~/.config/pepgent-council/webhook-secret` 准入边界）同样涉及管理层基础设施治理与跨仓执行权责，要求将 `04`、`11` 一并标注 `domains: [governance]`（即全部 14 行统一包含 `governance` 领域，由 5 席资格席位 `Coordination,ClaudeHigh,Argon,LeadMentor,ArgonGovernance` 按门槛 4 统一表决）**。若起草稿未在 `04`、`11` 标 `governance`，本席将在立案后通过 `council claim-domain` 认领。

### 2. B-2：`01`、`02` 表决前已上生产的程序违例定性与处置边界

1. **程序违例定性（`AGENTS.md:123`、`C2-2.2`）：**
   - `01`（`council status post` 收窄为仅收 `progress|note|alert`）与 `02`（以 `council` subagent 身份及固定首行送达工人）在未经管理层表决前即随 `pepgent-council` 提交 `4c6fa23`（未合并的 `council PR#5`）加载进生产 daemon，违反 `AGENTS.md:123`“leader 不当契约来源”与合入/上线前门禁（已由 `SentinelWindowR1` 记入 `evidence/argon/sentinel-20261101T1828Z.md` 第 10 项及 `LEDGER.md`）。
2. **表决前阻断范围（Hold）与未通过时的回退程序：**
   - 鉴于当前 `council roster` 为空（`no workers registered`）、`council deliveries` 为 `0`、webhook 尚未安装，且停止生产 daemon 会中断本议案自身的议会投票，允许 daemon 进程在表决期间维持运行以完成议会收票，但**必须执行两项硬阻断：**
     ① **在 `01–14` 表决完成并处理完全部未通过/反例行之前，严禁合入 `Pepgent/council PR#5`（或向 `Pepgent/council` `main` 推送未决条文代码），严禁推进 `soroi#322` 改写 `AGENTS.md` / `.omp/` 规则文本；**
     ② **表决通过前，严禁调用 `council worker enter`、`council deliver`、`council dispatch`、`council hook install` 或 `council ingress install` 激活工人总线，期间片区经理与工人通信继续严格沿用现行 `C4-1`/`C4-2`（`U107`）。**
   - 将 `01`、`02` 显式标明 `【已上生产】` 纳入本表第 1、2 行逐行表决是正确的补救程序；**若 `01` 或 `02` 未获通过，必须由 `Pepgent/council` 负责 agent 在 `PR#5` 中立即回退或按修订通过版本改写并重载 daemon**。
3. **与 `D7`/`D8`（`U109–U110`“由这个 agent 全权掌管整体实现和迁移方案”）的边界：**
   - **完全不越界！** `U109–U110` 授予 `council` 专属 agent 的是**代码实现与迁移方案的执行自主权**（防止 `Main` 微操代码或跨仓混派），**绝不是授权该 agent 绕过领导层不平衡民主投票（`U12`、`U90`、`C2-3`）单方立法或篡改 `AGENTS.md` 治理契约**。管理层通过议会表决确定“契约与规则是什么（What/Where/How 边界）”，定案后由 `council` 专属 agent 全权负责在 `Pepgent/council`（`council#1` / `PR#5`）内实现或回退未通过项，二者职责正交、互不侵犯。

### 3. B-3：`F1` 四条操作员原话排除在表外及行内原话切分的合规性（`C2-4`）

1. **符合 `C2-4` 与 `U79`：**
   - 操作员在转达会话 `01a197b3-2ce9-73a8-9494-2b078d81cef4` 直接下达的 4 条指令已由秘书核实 entry 并登记入 `LEDGER.md`：`U108`（D2 用 GitHub hook 不轮询，`89921acf`）、`U109`（D7 独立 `Pepgent/council` 仓与专属 agent，`3537c412`/`d062d076`）、`U110`（D8 高优异步安排专属 agent 全权掌管整体实现和迁移方案、实现后整体迁移，`23665a5d`）、`U111`（D5 核心：片区经理保留，改为事件触发的诊断角色，`ca16231b`/`349ae633`）。
   - 依 `AGENTS.md` `C2-4` 与 `U79`（“我直接授权的东西，你非要对抗？妄想通过裁决跳过？”），上述 4 条 `(U)` 原话直接生效，**严禁放进投票表里由模型投票推翻**。
2. **行内原话切分清晰：**
   - 第 `06` 行（D5 细化：哪三种事件触发、`Main` 每次用 `task` 新开 `area-manager` 实例）、第 `07` 行（D6/K7：决策 issue 与归档仍发布到 `Pepgent/PM`，通过配置读取）、第 `11` 行（K4：org 级 hook、HMAC、GUID 去重、投递日志恢复与 `webhook.sock` 具体协议）均在行文末尾显式注明操作员 `(U)` 原话部分不在表决范围，仅对转达会话起草的具体机制细化进行表决，切分清楚，不存在借表决跳过原话或借原话捆绑免票的情形。
