# D5 leader 选票（由 leader 的治理分身代表 Claude 族的 leader 席投出）

对 `evidence/decisions/D5-plugins-eval.md` 最终文本 D5-01 至 D5-19 全部赞成。理由要点：

- D5-01：与 leader 裁决 A 一致（一个插件包 `packages/omp-soroi` 在 `Pepgent/soroi` 单仓）。
- D5-02：U23 的完整定制与 Pepgent 调用路径；远程镜像不烘焙定制。
- D5-03～D5-05：Agent 节点经 subagent 模块启动，唯一交回通道，去掉末条回复兜底（C-4、C-5）。
- D5-06、D5-07、D5-12、D5-13：argon 已裁决“只有主 agent 写 eval”无 (U) 依据；主 agent 与经 `soroi_task` 派出的中心 worker 都可写 eval 步，无 fork（U24），批次以 report 交回为完成锚点。
- D5-08～D5-11：dry run 与正式运行的工具形态、pins、env 覆盖（D4-19）、执行前检查（含可见集过滤）。
- D5-14～D5-16：Human 节点与被动介入共用交回类型；通知 AI 走工具结果或带人类来源的 IRC。
- D5-17、D5-18：AgentTemplate = omp agent 定义名（U13）；文件路径解析归中间件。
- D5-19：eval 禁止嵌套写进 eval.md，去掉 fork 表述。
