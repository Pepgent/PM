# D929：探针 Dx4：reprioritize 录证（P3 → P0）（P0）——定稿

决策 issue：[Pepgent/PM#95](https://github.com/Pepgent/PM/issues/95)。发起：Coordination（GovDeskProbe12）。本文件由议会 daemon 生成。

## 事实

council#12 录证探针议程 Dx4：验证 reprioritize 保留选票、行版本与状态，并使队列头变化。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D929-01 v1 | 探针行 Dx4-01：演示一行文本，供反对票挂反例 | 测试实例 /tmp/council-e2e12 | 由录证 agent 立案、各席投票后改正优先级 | 得到：录证数据；代价：一个探针 issue；落选方案：直接改库 | 技术 | 否 | Coordination（GovDeskProbe12）：赞成<br>ClaudeHigh（ClaudeProbe12）：赞成<br>Argon（ArgonProbe12）：赞成<br>LeadMentor（MentorProbe12）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

- 优先级改正（Coordination GovDeskProbe12，2026-11-09T23:31:47.634Z）：P3 → P0，依据 U132；原票与行版本不变

## 原票

各席原票见 `votes/D929-Coordination.md`、`votes/D929-ClaudeHigh.md`、`votes/D929-Argon.md`、`votes/D929-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。