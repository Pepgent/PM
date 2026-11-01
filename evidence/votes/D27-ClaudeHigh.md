# D27 选票：ClaudeHigh

议程：日志巡检按 sid 与 agent 精确归属，防止把父会话动作归给子代理（[Pepgent/PM#44](https://github.com/Pepgent/PM/issues/44)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D27-01 v1：赞成（ClaudeHighD27，2026-11-01T17:29:19.383Z）


**分类意见：** 治理

# ClaudeHigh（ClaudeHighD27）对 D27-01 v1 的选票理由

**结论：赞成**；分类意见：治理。

## 已核对的源头

- `session://README` 第 16–23 行：events.jsonl 字段包含 `sid agent t tool args status resultEntry url`，子流路由为 `session://<id>/agents/<AgentId>/{timeline,events.jsonl,entry/…}`。提案投影 `{sid,agent,t,tool,args,status,resultEntry,url}` 的每个字段都存在。
- `~/.omp/agent/extensions/session-urls/routes.ts:15-19`：`SessionPath.agent` 注释为 “Full subagent id, or "" for the root session”。`:82-86` 的 agents 分支显式传入 id，且 `AGENT_ID` 正则允许点号，因此嵌套 id（如 `OmompOptimizer-2.GovAuditR2_1710`）可以寻址。`:99`、`:122` 的根路由 agent 为 `""`。这说明 “根流 agent 为空串” 和 “无需改 harness” 都成立。
- 验收文件 §二第 40–49 行：48 次调用中有 31 次读根流，`entry/57f7efbc` 的 `agent:""` 早于子流首个 marker `entry/77c24256`（17:09:28.923Z）。错误是由寻址错误造成的，与提案要修的位置一致。

## steady（契约闭合）

- **与 C5-1.2 一致。** 子流 URI 本身就是“被分析会话 ID”，提案也写明 URI 只识别对象，不带问题或罪名，所以不扩大调用方传给分析员的内容。
- **与 skill 第 10 行一致。** skill 只说明现有工具的正确用法，不新增治理、验证或派工规则。本行只补充寻址方法，不增加审批、门禁、watchdog 或状态副本。
- **与现有 §5 一致。** §5 已经要求“先用 `?limit=2` 看清字段”，身份核对可以合进同一次首读，实际几乎没有额外请求。
- 我没有找到会导致主路径断裂或死锁的契约冲突，因此不投反对。

## divergent（更简方案）

- 我考虑过只要求使用子流 URI、不做首读核对。不过路由会按 URL 原样回填 agent，首读核对的实际作用是让根流的 `agent:""` 被看见，从而拦住手误输入的根 URL。它和已有的 `limit=2` 合并后成本接近零，没有更简单的方案能替代。
- 我也考虑过 watchdog、遥测或报告标题。前两者属于新增机制，违背“机制即信号”；报告标题已经实证出错。提案的落选理由成立。

## 落地注意（不构成反例，不附条件）

1. **behavior-analyst 是否加载本 skill 需要在验收中确认。** `.omp/agents/behavior-analyst.md:14` 把对象写作 `session://<id>` / `history://<agent>`，没有引用 omomp-efficiency；skill 的 description 又以“领导工作台”开头。分析员子代理会不会自动加载，要在验收的“真实新巡检加载 skill”中看实际加载记录。即使分析员不加载，调用方 OmompOptimizer 按第 1 项给出子流 URI，也已经能阻止本样本的错误。
2. **按文档一致性要求更新出处。** skill 第 6 行标题 “(D17-01..09)”、第 8 行“依据是 D17”、第 53 行 “§5（D17-05）” 写入后要补上 D27 出处。首读核对应并入第 55 行现有的 `limit=2` 条目，不另起一个重复步骤。

