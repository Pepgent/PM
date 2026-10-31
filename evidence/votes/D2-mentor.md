# D2 导师（LeadMentor）选票，第 1 轮

| ID | 票 | 理由 / 反例与修改（摘要） |
| --- | --- | --- |
| D2-01 | 赞成 | 宿主 omp 保持上游原样，transcript、会话、四态与 IRC 由宿主持有；soroi 只经扩展点接入 |
| D2-02 | 赞成 | eval 只持在途捕获，正式事实等 store 确认提交 |
| D2-03 | 赞成 | subagent 不复制 omp 状态；重启文件只是索引 |
| D2-04 | 赞成 | 单写方解决多进程、远程汇入、无会话读取；许可证（DuckDB/DuckLake MIT，SQLite 公有领域）无障碍 |
| D2-05 | 赞成 | 唯一结果契约，删除最后回复兜底 |
| D2-06 | 赞成 | 介入先请求在途状态拥有方并等结论 |
| D2-07 | 反对 | 反例：IaC 仍声明 peer/route，NetBird 控制面里已撤销，系统误判网络可用。修改：IaC 是期望声明，NetBird 管理服务是 peer、route、连接的运行时权威；补许可证约束：用官方未修改构件；若修改 AGPL 服务端须提供源码 |
| D2-08 | 反对 | 反例：`/writer` 断线而 `/process` 仍在线，出现无写方的孤儿进程。修改：process 绑定有效 writer；writer 结束前先结束 process；writer 消失时 Mux 关闭 process 通道 |
| D2-09 | 赞成 | remote 唯一持有模板目录与作业生命周期 |
| D2-10 | 赞成 | soroi 侧闭包打包，remote 零感知；版本覆盖实际执行 bundle |
| D2-11 | 反对 | 反例：远程 agent 在 copy-out 前断线，下次唤醒拷入旧 transcript，丢失两轮。修改：运行期间 transcript 在作业持久 volume，由远程 SessionManager 写；退出后先完成 transcript copy-out 与主侧落盘确认，再 remove 与状态转换 |
| D2-12 | 赞成 | git 默认分支是唯一权威，中心检出是近处副本 |
| D2-13 | 赞成 | 许可证判断合理：Distribution Apache-2.0；Komodo GPL-3.0 以服务方式运行不触发网络条款 |
| D2-14 | 反对 | 反例：web 容器重建后，若业务状态生命周期跟随进程，所有 Lab 数据丢失。修改：web 进程只是业务库访问服务；记录以事务提交开始、显式删除结束；数据库持久卷独立于进程 |
| D2-15 | 反对 | 反例：容器重建后 `.jsonl` 消失，讨论无法唤醒。修改：中心 omp 的 session 目录放独立持久卷 |
| D2-16 | 反对 | 反例：规则同时存在 Lab 库与业务 DB，禁用后重启又被装载；SSE 重连重复触发。修改：规则只归 Lab 业务 DB；记录 `(rule_id, source_event_id)` 判重 |
| D2-17 | 赞成 | 只定归属，认证留后续 |
| D2-18 | 赞成 | renderer 只经门面 |
| D2-19 | 赞成 | 旧 Paseo 线不参与，符合“先不动” |
| D2-20 | 反对 | 反例：三个容器重建，DuckLake、Lab DB、transcript 全落在容器层而丢失。修改：列出四类持久载体（store 数据、Lab DB、omp session、可重建的 Lab 检出）及 owner、锚点、挂载 |
| D2-21 | 赞成 | 主机、网络归 iac，应用 Stack 归 workload 仓 |
| D2-22 | 赞成 | 用户原话是“如果可以，推荐”；SOPS 禁令下改 OrbStack 合理 |
| D2-23 | 反对 | 反例：iac 建了 registry 主机，但无人部署 Distribution 容器，Build push 被拒。修改：registry 的 Stack、卷、ResourceSync 纳入 `Pepgent/deploy` |
| D2-24 | 赞成 | 旧插件仓迁入后归档，clean cutover |
| D2-25 | 反对 | 反例：空主机首次启动时 store 里没有发布 tar，定制无法安装。修改：发布来源是 `Pepgent/soroi` CI 从确定 commit 产出的 release artifact；部署 init 在 store 就绪后按哈希导入同一字节 |
