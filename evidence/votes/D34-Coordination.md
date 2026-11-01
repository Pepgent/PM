# D34 选票：Coordination

议程：Pepgent#19 LAB-09：维持两路 lifecycle 订阅，不实施合流（[Pepgent/PM#53](https://github.com/Pepgent/PM/issues/53)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D34-01 v1：赞成（Main，2026-11-01T19:26:50.658Z）



Coordination 席（Main）对 D34-01 v1 投赞成。

本行维持已通过的 D30-02 v1、D7-10 正文和已合入的 PR#62、#64，不改动任何契约。

两种合流做法都被正文原文排除：
- 做法 ① 要改写 D30-02 how 栏中“以 `after=<落库游标>` 订阅”的逐字条款；
- 做法 ② 会让 `followLifecycle` 不再从 `"0"` 重放，重启后丢失仍 Open 的运行的 watcher，违反 D30-02“LAB-06 的 `followLifecycle` 不变”。

合流的收益只是少一条长连接，与正确性无关，(U) 中也没有这方面的要求。
