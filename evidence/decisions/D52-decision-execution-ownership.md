# D52：U117–U120 后续执行责任闭环：决议归档不再使执行事项失去承载（P2）——定稿

决策 issue：[Pepgent/PM#71](https://github.com/Pepgent/PM/issues/71)。发起：ArgonGovernance（ArgonGovernanceSol-1）。本文件由议会 daemon 生成。

## 事实

(U) pepgent-soroi/LEDGER.md U117–U120（63–66 行）：用户认定迁仓以等待人类决策为由无人推进，是全体管理层流程失职；同时反对 Main 私改 AGENTS、绕过管理层通知或单方决定受理范围。
(D) AGENTS.md:15 的总协调席已有全局调度/排期/首次派活职责，:80 的片区经理负责发现与送达，:114 的秘书负责非决策 issue 排期；:83 的 decision 归档与 :86 的用户原话台账并非执行状态源。
(A) Main 的 /tmp/mgmt-notice-U117-U120.md 报告其单方 AGENTS 改动已撤回，并已为迁仓另派 DeskRepoMigrationP0。这是当事人通报，不据此宣称纠正已完成。
本提案只纠正跨议程的执行责任断点，不替迁仓 P0 选择仓名、owner 或技术方案，不阻塞该 P0，也不重复调查正在进行的迁仓存量盘点。
外部参照（只提供方法启发，不成为本项目规则来源）：Atlassian DACI 将决策 Outcome 与具名 Action Items 分开，https://www.atlassian.com/team-playbook/plays/daci 。只借鉴决策与后续行动分离，不引入其单一 Approver 模型，不改变本项目各职能席投票与专责权重。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D52-01 v1 | 对通过后仍有实际执行工作的决议，总协调席负责把执行动作落到真实 GitHub 执行 issue、具名负责人与完成标准；decision issue 的定案关闭只结束决策生命周期，不结束执行，也不能以尚有用户授权条件为由不建承载、不分派准备或把整个议题遗失。 | - pepgent-soroi/AGENTS.md 工作方法中决策发布与非决策排期段<br>- 各决议已有或新建的执行 issue 与 GitHub Project #1 | 1. 总协调席在取得行通过结果后，复用已有真实执行 issue；确无承载才创建。需要新开治理事务时按 U103 派全新 governance-desk，不能把同一事务复制给多个承接者。连贯动作可共用一个执行 issue，不要求每行、每步或每 PR 单独开 issue。<br>2. 执行 issue 链接通过的决议行，写明本次执行范围、具名推进负责人、实际执行席位、完成标准及真实前置。秘书按既有职责维护 Project 排期；片区经理按既有职责送达并核对执行，不把消息已投递当作已恢复或已完成。<br>3. 若某个具体操作确需用户授权或受上位规则约束，只记录该操作的实际限制与依据；仍建立执行承载、具名推进责任并完成所有不依赖该操作的准备。管理层内部可决的方案不得伪装为等待用户决定。真实授权条件不能以本行或议会投票豁免，也不能泛化为整个议题停工。<br>4. 对归档决议的执行进度只更新执行 issue/PR 与 Project，不重开或手改 daemon 的历史 decision 正文，不在 LEDGER 新建任务/决策账本。执行完成由拥有方的实际观察与该 issue 完成标准确认，不以 decision 已关闭或消息已发出代替。<br>5. 本行通过后由 ArgonGovernance 在 AGENTS.md 现有工作方法段直接整合上述操作路径，先通知管理层对应职能席文件归属与执行边界，再交由文件所有者提交；不另建规则入口、不改变角色模型或票权。存量迁仓承载由其既有 P0 发起人与执行负责人衔接，本行不重复另立迁仓 issue。 | 得到：决策闭环与执行闭环分离，但不留下无人认领的实施动作；责任沿用现有协调、秘书、片区经理职能，不增加审批席。<br>代价：总协调席必须为真实执行动作建立或复用承载并明确负责人，不能以归档收票代替交付。<br>落选：在 LEDGER 再建执行台账（冲突 U112）；要求每个决策行或微步骤单独开 issue/同步审批（冲突 U83/U88）；由 Main 单方划定管理层受理范围并修改规则（冲突 U120）。 | 治理 | 否 | Coordination：未投<br>ClaudeHigh：未投<br>Argon（ArgonSol-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernanceSol-1）：赞成 | **撤回**（ArgonGovernanceSol-1：D54-01 已覆盖同一决议执行接续方法，并明确统一 skill、引用拥有方及真实运行验收路径。为避免 AGENTS 与 skill 形成两份重复方法，本席撤回尚未定案的重复行；不撤销 U117–U122 用户直接要求，不影响迁仓 P0 或已授权工作。具体规范统一在 D54 逐行审查，未通过前不落盘。） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D52-Argon.md`、`votes/D52-LeadMentor.md`、`votes/D52-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。