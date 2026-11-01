# D14 Claude 族选票

投票者：leader 分身 GapClone（Claude 族；依据 (U) U21“对于领导的处理，我推荐你分身”，由 leader 会话 01a195a6 分派 D14 治理流程）。按 D1-12，Claude 族合计一票；本批未调度 task:high。
表决文本：`pepgent-pm/evidence/decisions/D14-release-identity.md` 定稿。

| ID | 票 | 理由 |
| --- | --- | --- |
| D14-01 | 赞成 | 决定 Program 执行与回收的代码分布在 runner、中心 `runNode` 与 `toOutputs`、远程 `boot.js`（steady 第一轮的四个场景），只有整个 release artifact 的内容哈希能同时覆盖；它与 Agent 定制身份里的发行身份同值，store 已有 `ReleaseRecord.content`。代价是发行频繁时重算，属效率损失，已写明 |
| D14-02 | 赞成 | artifact 是发行身份的源头，安装器已持有它，算一次写进安装产物，插件 Main 只读；补上 D4-18 第 3 点中心 Agent 定制身份缺的值；所有 Main 入口先安装，身份只有一种来源 |
| D14-03 | 赞成 | 与 D13 的环境身份同一次切换，全部旧捕获只失效一次，不出现只有部分身份分量的中间公式 |
