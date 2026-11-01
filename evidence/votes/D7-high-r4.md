# D7 Lab 业务后端决策表 · task:high 第 4 轮选票

投票者：task:high（Governance2_880f.D7HighR2），Claude 族的独立票。

对象：`decisions/D7-lab-backend.md` 中按 `decisions/D7-r1-responses.md` 第 4 轮第 24 条修订的 D7-12、D7-13、D7-18。起因是 LeadMentor 对 D8-16 的反例与 leader 裁决：P5 的只读部分进第一版。其余 18 行沿用前几轮的赞成票（`votes/D7-high-r2.md`、`votes/D7-high-r3.md`）。

核对依据：
- remote 的现有接口与权威划分：`inv/r-remote.md:65-67,78-82,100-104,120-125`；
- remote 源码 `pepgent-remote/src/ops.rs` 里 `status`、`tail` 对已移除作业的处理（本轮直接读了源码）；
- D2-20：remote CLI 的 home 在 Lab 容器里（D2:57）；
- flow-catalog 的 F17 与 F31 第 4 步。

按 `design-assumes-it-works.md`，反对票只用主路径上的数据流断裂。

## 逐行投票

| ID | 票 | 理由 | 反例 |
| --- | --- | --- | --- |
| D7-12 | 赞成 | **权威没变。** remote 仍是作业与生命周期事实的唯一权威，它的 README 和设计都这样写（`inv/r-remote.md:67,78`）。新增的 `remote runs` 只读 remote 自己的 `runs/<run>.json`，Lab 不建作业表。第 1 轮我担心的“第二份作业登记”不会出现。<br>**列表是完整的。** 中心 omp 进程（根会话、本机 subagent、eval 中间件）都在 Lab 容器里，它们调用的 remote 与 Lab 用的是同一个 `$REMOTE_HOME`（D2-20，D2:57）。eval 只在中心运行，远程 agent 不能再开远程作业（FC:290-291）。所以主路径上的每一个远程作业都记在 Lab 读的这份 home 里，`remote runs` 不会漏掉作业。<br>**F17、F31 第 4 步走得通。** 列表来自 `remote runs`；状态来自 `remote status <run>`，这是 remote 的 owner 操作，结论也由 remote 记进它自己的记录（`ops.rs`：“Asks the backend, records its conclusion”）；输出尾部来自 `remote tail <run>`，经只读 SSE 推给浏览器。Mux 在线列表叠加在作业上，标出哪些作业里有 agent 连着。控制部分（`restart`、`destroy`、`new_sandbox`）仍列入 D9；这几个按钮在 F17、F31 的主路径上都不是必经步骤。<br>**已移除的作业也核对了。** 主路径上 eval 拷出后会 `remote remove`（D6-15；`inv/r-remote.md:80`），所以列表里会有已移除的作业。按 `ops.rs`，`status` 对它们返回 remote 记录的最后状态，不访问后端，每项附状态不会失败。<br>附注（非阻塞）：<br>① `tail` 对已移除的作业返回 `RunRemoved`（`ops.rs`），因为后端日志已随 Stack 一起删除。算力页只应对最新生命周期事实不是 `Removed` 的作业打开 tail 流；`RemoteRunSummary` 已带最新生命周期事实，可以直接据此判断。<br>② `remote tail` 每次返回最后 N 行快照，不是流（`inv/r-remote.md:101`）。“实时”尾部的做法是：有订阅者时，Lab 周期性调用 `remote tail`，推送新的尾部窗口；没有订阅者就停止。`compute` 频道的“作业列表或状态变化”同样靠 Lab 在算力页有订阅时轮询 `remote runs` 与 `remote status` 发现。建议把这两句写进正文，免得实现时误以为 remote 会主动推送。 | — |
| D7-13 | 赞成 | `liveContainers` 改为取自 `remote runs` 加 `remote status` 中用这个镜像的模板、状态为 `Running` 的作业，与 D7-12 同源，没有另起来源。模板与镜像的对应关系仍来自 P3 的模板元数据。其余内容与第 2 轮赞成时相同。 | — |
| D7-18 | 赞成 | 作业的读取放进 `lab.page.read('clusters')` 的线数据（`jobs: { run: RemoteRunSummary; status: RunStatus }[]`），外加一条只读 SSE `GET /api/lab/jobs/{run}/tail`，都不进 `LabCommand`。命令联合仍只放有真实执行方的写操作，与第 2 轮一致。`RunStatus` 直接用 remote 已有的 tagged 类型（`Queued \| Running \| Ended`，`inv/r-remote.md:120`），线上传的仍是权威方自己的形状（D7-17）。新路由同样走 Lab 认证中间件（D7-01 的 `/api/lab/*` 分流）。 | — |

## 计票

本轮三行：赞成 3 · 反对 0。

连同其余 18 行，全表：赞成 21 · 反对 0。
