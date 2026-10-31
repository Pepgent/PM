# D1 leader 选票

| ID | 票 | 理由 |
| --- | --- | --- |
| D1-01 | 赞成 | peer 工具只有主会话可用（o-sentinel、o-tern-peers 实测），编排必须集中在主会话；不读 session、不写产品代码出自 U1、U2 |
| D1-02 | 赞成 | 逐条对应 U1、U11（否决权）、U13；模型与 effort 已从会话记录确认 |
| D1-03 | 赞成 | U11 只允许 leader、分身、task:high、argon、导师；discuss:* 为 medium effort（o-task-settings） |
| D1-04 | 赞成 | U11 明确列入导师 |
| D1-05 | 赞成 | U2、U14：秘书排期、杂事委托；不投票，避免秘书成为第二个设计来源 |
| D1-06 | 赞成 | U3 说 mid 以下用量近乎无限；U11 不许它们参与设计 |
| D1-07 | 赞成 | U2 指定工程师为 tern 中的完整 agent；启动与 peer_send 往返已实测 |
| D1-08 | 赞成 | U2 把测试列为独立角色；实现者自证不算端到端证据 |
| D1-09 | 赞成 | U4 推荐在 homelab-tf 起测试 VM；iac-projects 规定 IaC 归属 |
| D1-10 | 赞成 | U3；哨兵不能用 peer 工具（实测），只读日志、上报异常 |
| D1-11 | 赞成 | 四种状态便于秘书和哨兵跟踪；peer_send 文档要求避免互相唤醒 |
| D1-12 | 赞成 | U12、U14；分身不单独计票，否则 leader 的票被克隆放大 |
| D1-13 | 赞成 | U15 限定“在本仓库” |
| D1-14 | 赞成 | o-skills：omp 不越过仓库根查找 skill |
| D1-15 | 赞成 | U19 授权；todo-more 白名单与编辑门禁范围不一致是根因（o-todo-tool） |
