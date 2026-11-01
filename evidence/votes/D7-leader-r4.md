# D7 leader 选票，第 4 轮（治理分身代表 leader 席）

| ID | 票 | 理由 |
| --- | --- | --- |
| D7-11 | 赞成 | 取会话相对自身基线的 diff 做三方合并，不再以旧文件覆盖已合入的改动；“未合入”按当前默认分支计算；conv/<id> 在克隆时创建 |
| D7-12 | 赞成 | P5 只读部分进第一版：作业列表读 remote 自己的运行记录（新增只读 `remote runs`），Lab 不另存作业表；控制操作留 D9。否则 F17、F31 第 ④ 步无法通过，违反 U2 |
| D7-13 | 赞成 | liveContainers 同样来自 `remote runs` + `remote status` |
| D7-18 | 赞成 | 作业读取走页面读与 tail SSE，不进命令联合 |
