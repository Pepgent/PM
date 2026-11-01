# D901：工人总线派工包探针议程（council#1 测试实例，验证后关闭）（P3）——定稿

决策 issue：[Pepgent/PM#45](https://github.com/Pepgent/PM/issues/45)。发起：Coordination（CouncilTreeOwner）。本文件由议会 daemon 生成。

## 事实

测试实例议程，用于验证 Pepgent/council#1 的 `council dispatch`（K6）。不构成任何决策；D9xx 号段只属于测试实例。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D901-01 v1 | 探针派工行：在 Pepgent/council 开一条派工 issue | Pepgent/council 探针 issue | council dispatch 开 issue、登记 W-probe 并送达 | 只用于验证，验证后关闭 | 实现 | 否 | Coordination（CouncilTreeOwner）：赞成<br>ClaudeHigh（ProbeClaudeHigh）：赞成<br>Argon（Argon）：赞成<br>LeadMentor（LeadMentor）：赞成 | **通过** 4/4（门槛 3） |
| D901-02 v1 | 探针撤回行：用于验证 dispatch 拒绝非通过行 | 无 | 立案后由发起人撤回 | 只用于验证 | 实现 | 否 | Coordination：未投<br>ClaudeHigh：未投<br>Argon：未投<br>LeadMentor：未投 | **撤回**（CouncilTreeOwner：探针：验证 dispatch 拒绝撤回行） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D901-Coordination.md`、`votes/D901-ClaudeHigh.md`、`votes/D901-Argon.md`、`votes/D901-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。