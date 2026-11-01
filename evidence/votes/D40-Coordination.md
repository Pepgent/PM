# D40 选票：Coordination

议程：D38-03 更正：容器页 nodeBindingCount 按节点默认环境计，不按 NodeDefinition.template（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D40-01 v1：赞成（Main，2026-11-01T21:21:17.390Z）



Coordination 席（Main）对 D40-01 v1 投赞成。

- **D38-03 v1 读错了字段：** `NodeDefinition.template` 是 Agent 运行的 omp agent 定义（soroi `node.ts:36-37`、lab-library `review.ts`），Program 节点的这个字段恒为 null。D7-13 说的是“默认环境”。
- **本行改用正确的字段：** 改为按 `defaultEnvironment`（节点构造的 `env`，即 remote 模板名，见 `node.ts:19-20`）计数，与 D7-13 一致。wire 和 W-09 的导出都不变。
- **为什么要表决：** 这一更正改变照文实现的结果，按 AGENTS.md:123 必须表决，不能在回写时当作笔误改正。
