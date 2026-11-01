# D7 LeadMentor round 3
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D7-04 | 赞成 | Conversation worktree 现在只在会话首次创建时从默认分支克隆；启动、唤醒和其他会话合入均不隐式修改它。其基线只通过用户显式 `library.sync` 改变，因此长期未提交草稿不会阻止普通 generation 启动，会话 cwd 与草稿权威也保持稳定。 | — |
| D7-05 | 赞成 | `lab_save_artifact` 现在按保存时字节计算内容哈希，并复制为会话 worktree 内不可变 snapshot；metadata 同时记录 hash、snapshot、source 和 role。原文件之后被覆盖不会改变既有 Artifact，讨论产物仍无需在正式运行前进入 Store。 | — |
| D7-07 | 赞成 | AI 保存和人类上传均形成按内容寻址的不可变 worktree snapshot；附件、Datasets 和跨会话打开都读取 snapshot，`inputs/` 仅是目标会话的近处副本。作为正式运行输入后，字节再通过 D6 transfer 随步骤提交进入 Store，权威转移清楚。 | — |
| D7-09 | 赞成 | 介入和中止继续路由到实际 owner；函数体变更若已在持有会话 worktree 中可直接打包，若来自其他会话或节点页，则由人同时确认 `library.sync` 后再派生。该路径与显式同步模型一致，不再依赖隐式修改 dirty worktree。 | — |
| D7-11 | 赞成 | `library.merge` 现在只从源会话读取被确认路径，在基于当前默认分支的干净 integration checkout 中提交和 push，未选草稿不会进入默认分支；其他会话不自动同步。显式 `library.sync` 先把本会话草稿保存在仅本地的私有 branch，再合并默认分支，当前定义与会话草稿两类权威得到分离。 | — |
| D7-19 | 赞成 | 部署卷已经覆盖 Lab DB、omp session、中心缓存、conversation worktrees、images checkout 和 remote home；干净 integration checkout 位于可重建的中心缓存卷中，每次合入临时创建、push 后删除，不污染会话草稿卷或引入新的持久状态源。 | — |