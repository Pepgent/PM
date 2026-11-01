# D8 LeadMentor round 5
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D8-01 | 赞成 | F01–F32 的矩阵现已与 D2–D7 最终可读接口和状态模型对齐：F06 从 RunGraph 边核对输入，F11/F17 通过 `Adopted` 与 `/compare` 证明复用，F23 用 Human/aborted 事件证明替代；F22 同时覆盖函数并发、中心 worker 批次可见性和批次阻止过早结束。MVP 仍是不缩减的全部用户流程。 | — |
| D8-09 | 赞成 | TUI 根会话例外已经成为明确的已定契约而非未决冲突：操作员直接启动的 TUI omp 自持终端、没有 Mux generation 和 eval endpoint；它创建的 Soroi 子 Agent 仍由插件作为写方经 dial 接入 Mux。该边界既允许 Agent Hub kill/`--resume` 的真实入口，又不改变产品中 Lab/RPC 根会话的 Mux 规则。治理需将这一已定例外直接同步回 D2-08/D3，而不是保留矛盾文本。 | — |
| D8-14 | 赞成 | 切片与最终契约已重新对齐：最小 transfer 生命周期进入 VS1，volume 能力留在后续 Store 切片；批次结束和可见性移动到依赖 subagent 的 W2；Aborted graph 变体、release 事务、远程终态、Slurm shared root、只读作业列表和 Lab 投影均有明确 owner、依赖和验收。108 个切片的依赖存在性、波次归属和无跨后波次依赖也已复核。 | — |