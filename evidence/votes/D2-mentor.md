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
 
## 第 2 轮（按修订行重投）

| ID | 票 | 理由 / 反例与修改（摘要） |
| --- | --- | --- |
| D2-02 | 赞成 | `Agent` 体会话不注册 `soroi_eval`，远程 `RemoteChild` 写本地批次，正式提交后权威转入中心 store。 |
| D2-04 | 赞成 | store 仍是唯一写方；最新修订把节点版本的 bundle 与来源证据列入历史记录，未把当前定义从 git 默认分支移走。 |
| D2-06 | 赞成 | 改值在同一步结束调用槽位、让下游继续并一次提交；人类 IRC 经读方送写方，停驻会话先建立新一代。 |
| D2-07 | 赞成 | IaC 是期望声明，NetBird 管理服务是 peer、route 与连接的运行时权威，并补上官方构件与 AGPL 源码约束。 |
| D2-08 | 赞成 | 批次由读方按需拉取，人类 IRC 与介入控制端点分路由；导师提出的断线孤儿进程属于失败分支，按设计阶段只写主路径的规则不另加机制。 |
| D2-09 | 赞成 | 补齐 subagent 模块在远程启动 `Agent` 时调用 `remote run`，remote 仍是模板目录与作业生命周期的唯一持有者。 |
| D2-10 | 赞成 | dry run 与正式运行中尚未提交的本机产出都经 store 暂存区传给远程，载荷版本覆盖实际执行内容。 |
| D2-11 | 赞成 | 远程作业用持久 volume 保存 transcript 与 blob，正常退出时先 copy-out 落盘，再 remove；库内容由 D4 补齐。 |
| D2-12 | 反对 | 反例：store 只保存 bundle，却声称历史可查看源码；bundle 不能替代入口 TS、source map、Git commit、构建 manifest 等来源证据。修改：节点首次正式提交时同时保存入口 TS、源码清单与 source map、commit、manifest 与 lockfile 身份，并明确这些只是历史证据，当前定义仍以 git 默认分支为准。 |
| D2-14 | 赞成 | web 进程只作业务库访问服务，Lab 业务记录放在独立持久卷，记录的开始与结束锚点已写清。 |
| D2-16 | 赞成 | 规则与启停只归 Lab 业务库，每次触发单独记一条记录；触发会话由 Lab 后端作为写方经 dial 启动。 |
| D2-20 | 赞成 | 中心主机的 store 数据、Lab DB、omp session 与检出等持久载体均已列出写方和生命周期锚点。 |
| D2-23 | 赞成 | 镜像仓库的 CNCF Distribution Stack、持久卷和 ResourceSync 纳入 `Pepgent/deploy`，iac 只负责主机与网络。 |
| D2-25 | 反对 | 反例：只把规则和 settings 放进 tar，未证明干净上游 omp 会发现并使其生效，定制可能在新环境失效。修改：发布 artifact 带安装 manifest 与 installer，中心和远程走同一公开安装机制，并在不含 omomp、HOME 为空的干净上游 omp 中实际枚举和执行 extension、agent、skill、rule、settings。 |

第 2 轮计票：14 行中赞成 12、反对 2（D2-12、D2-25）。D2-15 尚待下一轮的 worktree/cwd 修订后重投。

## 第 3 轮（按最新修订行重投）

| ID | 票 | 理由 / 反例与修改（摘要） |
| --- | --- | --- |
| D2-04 | 赞成 | 最新文本同时保存 bundle、入口 TS、源码清单与 source map、Git commit、构建 manifest 和 lockfile 身份；这些是不可变的历史执行证据，当前定义仍由 git 默认分支持有。 |
| D2-12 | 赞成 | 会话 worktree 内未合入的改动明确是该会话节点草稿的权威；worktree 是独立 clone，放在持久会话 worktree 卷上，中心检出才是可重建近处副本，状态边界已闭合。 |
| D2-15 | 赞成 | 根会话 cwd 改为由 Lab 后端在启动前创建的会话编写 worktree，并与独立持久 session 目录的生命周期安排一致。 |
| D2-20 | 赞成 | 中心检出缓存卷与会话 worktree 卷已拆开；前者可重建，后者持久并由会话 omp 与人写入，会话删除时结束，不再丢失未合入草稿。 |
| D2-25 | 赞成 | 已加入 installer、manifest 和干净上游 omp 的前置验收，并把第一段限制为测试客户端扮演 Pepgent 的 soroi 侧流程；cwd、控制端点和人类 IRC 的调用面也与 D2-12、D2-15、D2-06、D2-08 对齐。 |

第 3 轮计票：5 行中赞成 5、反对 0。

## 导师最终计票

第 1 轮反对 9 行（D2-07、D2-08、D2-11、D2-14、D2-15、D2-16、D2-20、D2-23、D2-25）；第 2 轮对 14 个修订行投出 12 赞成、2 反对（D2-12、D2-25）；第 3 轮对 D2-04、D2-12、D2-15、D2-20、D2-25 投出 5 赞成。至此 D2-01 至 D2-25 全部为导师赞成，无否决。
