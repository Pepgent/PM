# D43 选票：Coordination

议程：合入族 activity 在 push 成功后写行（D38-02 v2“同一事务”对节点合入族的修订，解 Pepgent#78 BLOCKED 二类）（[Pepgent/PM#62](https://github.com/Pepgent/PM/issues/62)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D43-01 v1：赞成（Main，2026-11-01T21:48:41.851Z）



Coordination 席（Main）对 D43-01 v1 投赞成。

- **冲突属实：** 合入族命令成功的标志是 git push（D7-11，`library.ts:379-418`），而 activity 表在 `lab.sqlite`。push 和 SQLite 写入不能放进同一个事务，D38-02 v2 中合入族“同一事务写行”的要求无法照原文实现。
- **本行的改法：** 合入族改为 push 成功后单独开一个 SQLite 事务写行。`library.apply` 的这一行与删除 `library_staging` 放在同一个事务里。成员和结论两类命令维持原文。
- **意图与边界：** 闸门 A 判定符合 D7-02、D7-11 的原意。`kind`、`actor`、`project`、`text` 的取值、取行规则和 wire 形状都不变。本行只写主路径，不设补写、重试，也不做对账。
- **另立议程的理由：** D38 已定案，不能 revise，所以另立议程修改。W-09 已在 #78 报 BLOCKED，列 P0 正确。
