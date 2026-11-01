# D7 LeadMentor round 4
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D7-11 | 赞成 | Conversation 的改动现在以会话基线到当前工作区的差异定义，覆盖私有 branch commits 和未提交内容；`library.merge` 只对人确认的路径生成 patch，并在基于当前默认分支的干净 integration checkout 中执行三方合并，因此不会用旧基线整文件覆盖其他会话已经确认的修改。“未合入”也改为相对当前默认分支判定，不会把已经进入默认分支的内容继续显示为草稿。 | — |
| D7-12 | 赞成 | P5 已拆为只读与控制两部分：第一版由 remote 自己的 `runs`、`status`、`tail` 提供 F17/F31 必需的作业列表、状态和日志；Lab 不保存第二份作业表。restart、destroy、sandbox 等控制能力继续留在 D9，不会为了满足读取流程扩张成外部调度控制面。 | — |
| D7-13 | 赞成 | 容器页的 `liveContainers` 现在从同一权威 `remote runs` 和 `remote status` 投影，镜像定义、Build、registry 和模板仍分别从各自 owner 读取；没有恢复 Lab 自有镜像或作业状态副本。 | — |
| D7-18 | 赞成 | 第一版接口已加入真实可实现的只读作业数据和 tail SSE，同时保持控制操作不进入 `LabCommand`。算力页与容器页能够完成 D8 的状态/日志读取路径，而 P4、控制型 P5、P6、P7 仍明确不可用并进入 D9。 | — |