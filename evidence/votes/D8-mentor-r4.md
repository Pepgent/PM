# D8 LeadMentor round 4
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D8-01 | 赞成 | F01–F32 继续作为不可缩减的完整 MVP。F22 现在同时验收一步内函数并发和多个中心 worker 的批次屏障；F15 使用正确的 EvalTransfer position 路径；F17/F31 所需的只读 P5 也已进入 MVP。此前会造成假阳性或漏验用户流程的缺口均已补齐。 | — |
| D8-03 | 赞成 | A0 在新起的 IMG-01 容器、空 HOME、无既有 `.omp` 和无 omomp 环境中执行；它加入真实 e2e 网络并注入独立 client token，逐类验证 extension、agent、skill、rule、settings。Release 导入也已与 D6 最终接口对齐为一次 `PUT /releases/{version}` 事务。 | — |
| D8-04 | 赞成 | Pepgent→Soroi 的四条边界已经按 D7-20 精确表述为 Store、Mux 写方/读方/控制端点、RPC host tools 和 Lab project `.omp`；LabStandIn 只实现共同协议，不复制任何 Pepgent 业务行为，S1/S2 的职责分离清楚。 | — |
| D8-09 | 赞成 | 操作员直接启动的 TUI 根会话天然持有自己的终端 stdin/stdout，Agent Hub kill 与 `omp --resume` 也只有该入口；将它定义为自身 writer、不经 Mux，而它启动的 Soroi 子 Agent 仍由插件作为写方经 dial 接入 Mux，职责是自洽的。治理应按本轮 leader-seat 裁决直接同步 D3：D3 的“所有进程经 dial”限定为由 Lab/subagent 等外部写方驱动的 RPC 进程，不包括操作员直接拥有的 TUI 根进程；不应继续把本项留成未决冲突。 | — |
| D8-13 | 赞成 | VS1 已改为正式 step 先 `open` 提交，再由根 supervisor 确认无活动 formal eval/未释放 batch 后独立调用 `/runs/{run}/end` 并断言 `Ended{seq}`；VS2 紧接着打通真实 Lab server-function 路径，随后再按本机、subagent、介入、远程、Web、D9 扩宽，垂直集成顺序正确。 | — |
| D8-14 | 赞成 | 108 个切片按仓库、单一职责和可观察验收拆分，依赖图已经检查无不存在节点、无环、无依赖后波次；发行导入、Lab 安装、A0 容器、远程终态、Slurm shared root、只读 P5 和拆分后的过大切片均已有明确 owner 与 runtime gate。模型档位和 issue→PR 流程也符合用户约束。 | — |
| D8-16 | 赞成 | 不被 F 流程触达的能力继续作为 D9 输入而不是静默删除或擅自扩大 MVP；P5 已正确拆分为进入 MVP 的只读 `remote runs/status/tail` 与留给 D9 的 restart/destroy/sandbox 控制能力，并已同步到 D7-12、D7-13、D7-18，因此 F17/F31 不再与已通过的 Lab 契约冲突。 | — |