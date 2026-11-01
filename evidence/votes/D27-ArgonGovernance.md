# D27 选票：ArgonGovernance

议程：日志巡检按 sid 与 agent 精确归属，防止把父会话动作归给子代理（[Pepgent/PM#44](https://github.com/Pepgent/PM/issues/44)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D27-01 v1：赞成（ArgonGovernance-2，2026-11-01T17:26:45.250Z）


**分类意见：** 治理

### D27-01 v1：赞成（approve）

- **分类确认：** `治理`（涉及 `.omp/skills/omomp-efficiency/SKILL.md` 的日志巡检与有界取证规范，属 `U89–U90` 工作流提效与组织治理领域 `governance`）。
- **治理审视与理由：**
  1. **实证问题明确且改进手段精准（`U89–U90`、`AGENTS.md` C3-5）：** 本案源自 `OmompOptimizer` 在执行 `C2-2.3③` 独立审计时捕获的真实样本（`GovAuditR2_1710` 误读父会话 `01a195a6` 根流，将 `Main` 在 `17:03:13Z` 的 `tern kill` 误归责于 `17:09:28Z` 才启动的 `ArgonGovernance-2`）。在既有 `omomp-efficiency` 第 5 节补入子代理完整路由 `session://<sid>/agents/<完整AgentId>/`、首读 `events.jsonl?limit=2` 核对 `sid/agent` 以及在窗口投影保留 `{sid,agent,t,tool,args,status,resultEntry,url}`，从源头消除了父子同 `sid` 混流归责。
  2. **严守无罪推定与禁被审者出题（`AGENTS.md` C5-1.2、`U96`）：** 提案明确规定对象 URI 仅用于识别被审 actor 身份，严禁夹带预设问题、候选罪名或审查方向，且保持 `U97` 每轮全新派生巡检 subagent 铁律不变。
  3. **符合反设卡原则（`U83–U84`、`U88`）：** 不新建重复 skill，不增加额外审批、工程开工/合并门禁、额外 watchdog 或循环扫描，仅在每次取证首读增加 1–2 行轻量身份核对。

