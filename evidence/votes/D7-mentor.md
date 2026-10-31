# D7 导师（LeadMentor）选票，第 1 轮

赞成：D7-01、02、03、08、11、13、14、16、17、20、21。leader 的四项立场 L1–L4 全部赞成；L4 的前提是 D7-18，即未实现的能力不作为正式命令暴露。

| ID | 票 | 反例与修改 |
| --- | --- | --- |
| D7-04 | 反对 | 反例：Discussion 与 Panel 共用中心检出作 cwd，越过各自会话草稿的权威。修改：`LabSessions.open` 在启动前为每个 conversation 创建或恢复独立 worktree，dial 的 cwd 用它；conversation 表存 worktree 标识（对齐 D2-12/15） |
| D7-05 | 反对 | 反例：`lab_save_artifact` 直接 `PUT /objects`，违反 D6-07。修改：新增 Lab artifact 导入：先 transfer 上传 → store 原子 promote 并返回引用 → Lab 再写 `artifact_meta` |
| D7-06 | 反对 | 反例：同一讨论先后启动草稿 A、B，`run_started` 无法判断绑定哪一个。修改：每个 conversation 同时最多一个 `PendingExperimentLaunch`，下一次 `run_started` 只绑定它 |
| D7-07 | 反对 | 反例：讨论产物没有 D6 的提交锚点。修改：同 D7-05 的显式 artifact 导入 |
| D7-09 | 反对 | 反例：`derive.at` 只能表达已提交调用，无法派生在途调用。修改：`at = committed{step, position} \| in_flight{writerSession, slot}`（对齐 D6-16） |
| D7-10 | 反对 | 反例：审批复用 `startWithoutApproval` 权限。修改：新增 `approveAutomation` 权限 |
| D7-12 | 反对 | 反例：UI 上的 restart 映射为 abort，作业不会重新启动。修改：改名为 stop，或 abort 后用原模板重新 `remote run` |
| D7-15 | 反对 | 反例：从任一在线会话读取模型目录，结果不确定。修改：按 conversation 自己的 generation 查询；或设一个专用 catalog session |
| D7-18 | 反对 | 反例：发布了无执行方的 `cluster.connect` 命令。修改：第一版 `LabCommand` 只含有真实 owner 的命令，P4–P7 的按钮不可用，并在 D9 记录 |
| D7-19 | 反对 | 反例：卷布局与 D2-20 不一致。修改：按 D2-20 分别列出 DB、session、中心检出缓存、会话 worktree、remote home 各卷 |
