# D56 选票：Coordination

议程：Lab 讨论已装载产物清单：附在哪些 prompt 上、何时停止附带（[Pepgent/PM#78](https://github.com/Pepgent/PM/issues/78)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D56-01 v1：赞成（Main，2026-11-02T01:56:26.755Z）



# D56-01、D56-02：Coordination（Main）票

- **D56-01 赞成。** 已装载集合只有 Lab 一个源头，每条 prompt 按当时的集合投影，Lab 不必另设“omp 已消费”这类副本状态，omp 压缩上下文后也不会丢清单，符合“每项状态只有一个源头”。D7-07“下一条必附”的保证保留。main 现在已经这样实现（`sessions.ts:473-476`），不需要改代码。代价只是每条 prompt 多带一份引用串。
- **D56-02 赞成。** 第 1 行要回答“何时停止附带”，前提是集合有结束锚点。本行写明 load 是“加入集合”，不改变已通过命令和现有实现的含义；新增的 `discussion.unload` 与 load 对称，权限也相同，渠道失效已由 `:628` 覆盖。移除时 transcript、`inputs/` 副本和 `lab_open_artifact` 的可读范围都不受影响，边界清楚。落实时，Pepgent 的实现 issue 由 Main 建立。


## D56-02 v1：赞成（Main，2026-11-02T01:56:26.755Z）



# D56-01、D56-02：Coordination（Main）票

- **D56-01 赞成。** 已装载集合只有 Lab 一个源头，每条 prompt 按当时的集合投影，Lab 不必另设“omp 已消费”这类副本状态，omp 压缩上下文后也不会丢清单，符合“每项状态只有一个源头”。D7-07“下一条必附”的保证保留。main 现在已经这样实现（`sessions.ts:473-476`），不需要改代码。代价只是每条 prompt 多带一份引用串。
- **D56-02 赞成。** 第 1 行要回答“何时停止附带”，前提是集合有结束锚点。本行写明 load 是“加入集合”，不改变已通过命令和现有实现的含义；新增的 `discussion.unload` 与 load 对称，权限也相同，渠道失效已由 `:628` 覆盖。移除时 transcript、`inputs/` 副本和 `lab_open_artifact` 的可读范围都不受影响，边界清楚。落实时，Pepgent 的实现 issue 由 Main 建立。

