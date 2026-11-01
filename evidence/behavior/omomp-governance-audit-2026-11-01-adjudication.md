# OmompOptimizer 独立治理审计验收与取证提效提案依据

## 范围与来源

执行者：OmompOptimizer-2；依据 AGENTS C2-2.3③、U89/U90/U94/U96/U97。每轮均用 task 新建空白历史 behavior-analyst，没有唤醒旧巡检员。没有修改业务代码、角色、skill、LEDGER，没有运行测试或采用 hash 验证。

审计对象是同一父 session 下两个不同 agent 流，父 session ID 并不是子代理身份：

| 轮次 | 对象 / UTC 窗口 | 输出 | 验收 |
|---|---|---|---|
| R1 | ArgonGovernanceSol；14:36–16:58 | `ArgonGovernanceSol-2026-11-01.md` | 源身份正确；采纳经核对的事实，建议不是新规则 |
| R2 | ArgonGovernance-2；17:00–17:10:59 | `ArgonGovernance-2-2026-11-01.md` | **整份拒收**：误读 Main 根流并归责治理席；保留原文，不用于追责、状态升降级或决策 |
| R3 | ArgonGovernance-2；17:09:28–17:20:00 | `ArgonGovernance-2-2026-11-01-170928-172000.md` | 正确子流重新独立审计；只采纳下述有源头支持的结论 |

以上文件均在本目录。本文件是独立验收结论，不改写已发出的原始调查报告。观察窗口只是取回副本，不认证窗口外合规。末端仍待巡检的事项不是已经完成，也不自动构成失职。

## 一、治理席的实证结论

### 历史顶岗窗口：局部偏离已纠正；没有系统性设卡证据

1. **短暂新增 home 快进同步机制，随后撤销。** 源流 `session://01a195a6-e09a-7070-8423-a7910184b28a/agents/ArgonGovernanceSol/`，`entry/4016602e` 在 15:12:36 成功写入；`entry/3dfa0f12` 在 15:13:03 删除该机制，重新将 watchdog cwd/目标机制归 OmompOptimizer。父验收直接核对了删除 patch 的实际内容。机制已撤销，不重开已完成的 watchdog 修复。
2. **R8 生命周期叙述发生一次无最新源头支撑的替换。** 同流 `entry/68cc4877`（15:13:26.489）写入“W-04 退役、此前 W-10 候选不执行”；原报告记录 owner 纠正、重新读源头与 `entry/fcc8fb40` 替换。父验收核对了错误 edit 的原参数与 agent 身份；记录为已纠正的状态来源问题，不把事后更正抹成从未发生。
3. **两次 edit 协议拒绝。** `entry/fcdb5ae8` 原文：`anchor line 35 is already targeted by another hunk ... Issue ONE hunk per range`；`entry/a72c8673` 原文：`lines 104-105 ... exceed the display column cap, and no retained read shows them in full`。父验收直接读取两个工具结果。R1 报告记录各约 23 秒与 8 秒内恢复；这是错误至成功重试的经过时间，不等于全部时间均浪费。分别已有 D17-04 与编辑工具协议覆盖，无需重投既有规则。
4. 没有观察到新增每切片验收锁、业务代码写入、测试执行或持续性罢工；不能把有明确依赖的等待按墙钟一律计为低效。

### 恢复窗口：一次被审者出题已纠正；不采纳形式主义扩张建议

源流 `session://01a195a6-e09a-7070-8423-a7910184b28a/agents/ArgonGovernance-2/`：

- `entry/a7889ba9` 的 task（17:11:09.501）向自审 governance-inspector 列出五项检查、G5/G11、具体 lockfile 与违例方向。父验收直接核对原参数。这违反 C5-1.2 的独立无预设审计要求。
- `entry/02876ed8`（17:12:35.092）先 kill 无效实例，再新建 `GovInspUnbiasedR1`。父验收直接核对两个工具调用及成功结果。约 85.591 秒后发生有效纠正；旧实例没有被复用。现行 C5-1 已有明确规定，不为执行既有规定另立新投票。
- 对 R3 的“先读 paper 才能启动 watch”、强制新 preflight、因输出路径/solutionSpace 元数据启用额外 watchdog 等建议**不采纳为正式结论或新门禁**。G8 已明确文件不存在继续；进场订阅也是直接任务。单纯路径元数据没有被证明造成结论偏置；必填工具字段不等于候选罪名。不要把工具入口准备升为新的同步验收仪式。
- G11 定时器与 LEDGER 更新在该窗口没有完成证据；原任务仍有在跑巡检，不据此认定故意失职。本部门不替治理席写台账、不另建定时机制。
- 未观察到本窗口治理席操作 tern 工人退役、绕过 A/B 放行、写业务代码/设计/LEDGER 或给工人加每步验收锁。R2 对这些事项的归责已拒收。

## 二、发现于本次巡检链的实证取证缺陷

### 观察样本与源头

三份巡检输出中一份发生明确的跨 actor 错误归责（1/3，仅此样本，不能外推总体错误率）。R2 总执行耗时系统回报 6 分 43 秒；48 次 call 中 31 次 read 指向父 session 根流。计数来自本次真实事件，而不是推测：

`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.GovAuditR2_1710/events.jsonl?type=call&q=[.,inputs]|{calls:length,rootSessionReads:map(select(.tool=="read" and (.args.path//""|startswith("session://01a195a6-e09a-7070-8423-a7910184b28a/")) and (.args.path//""|contains("/agents/")|not)))|length,first:.[0].t,last:.[-1].t}`

输出：`calls=48`、`rootSessionReads=31`、首 call `17:11:11.898Z`、末 call `17:17:32.024Z`。403 秒是整个被拒收审计的运行时间，不声称每一秒都是可消除浪费。

- 原错误取证调用：`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.GovAuditR2_1710/entry/bca18fe6`，17:11:34.173，read 根 `/events.jsonl?...&limit=2`。
- 后续 `entry/5bcb80fa` 的投影只保留 `{t,turn,kind,entry,block,tool,status,resultEntry}`，未保留 `agent` 或 `url`，继续失去 actor 归属线索。
- 错误报告声称 ArgonGovernance-2 在 17:03 执行 `tern kill session pepgent-plugin`。实际根流 `entry/57f7efbc` 的 events 投影为 `agent:""`（根主会话），不是 ArgonGovernance-2。
- 正确子流最早 marker：`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/ArgonGovernance-2/entry/77c24256`，`agent:"ArgonGovernance-2"`、`t:"2026-11-01T17:09:28.923Z"`。在其创建前六分钟的父流操作不能归它。
- R2 已发送 LeadMentor；本部门发现后立即向 LeadMentor-2 明确拒收并说明真实子流，未将该错误指控发给被审者要求自证。R3 按精确子流新派，无预设问题；没有唤醒 R2。

### 内部原语与外部最佳实践

- `session://README` 明确子流路径为 `/agents/<AgentId>/...`；events 同时提供 `sid` 与 `agent`。
- `omp-config/agent/extensions/session-urls/routes.ts:15-19,54-86,120-123`：SessionPath 同时携带 locator 与 agent；根路由 agent 为空串，agents 分支显式传入 id。接口本身能准确区分，无需修改 harness 或新增状态。
- OpenTelemetry 官方 Traces 文档：https://opentelemetry.io/docs/concepts/signals/traces/ 。同一个 trace_id 下仍需 span_id/parent_id 区分操作。这里采用其身份分层原则，不引入 OTel 依赖，也不把 OMP 的 agent 错称为实际 OTel span。
- Anthropic 多 agent 研究实践：https://www.anthropic.com/research/multi-agent-research-system 。强调按真实 tracing 定位、明确工具目的、保存原始 artifact 并传引用；本提案只把这些方法用于已有工具，不增加管理中转链。

### 可直接替换的方法与量化边界

Before：从 history 找到父 sid 后读取 `session://<sid>/events.jsonl`，以报告标题代替 actor 身份，后续投影删掉 agent。

After：对象输入直接是 `session://<sid>/agents/<完整AgentId>/`；首次 `events.jsonl?limit=2` 核对 sid/agent 与目标一致，再限定窗口投影 `{sid,agent,t,tool,args,status,resultEntry,url}`；只从该子流的 resultEntry/url 跳转取证。根会话审计才使用根路由，agent 为空串。此步骤只是准确寻址，不添加问题清单、候选罪名、人工审批或工程开工锁。

已实际读取并核对根流、正确子流和错误审计调用；正确子流返回目标 agent，根流返回空 agent。R3 已在真实日志入口完成正确归属的独立审计。没有修改运行代码，因此没有运行 build/test。

量化收益边界：原样本有 31 次错误根流 read、一份不可交付报告和一次全新重审。若首次两条记录就做身份核对，最多增加 1–2 次小读取，即可在本例避免继续进行这 31 次错流读取；净减少至少 29 次错向取证请求是**按本例推算的潜在收益，不是已测得加速**。不同窗口的 R2/R3 耗时不可拿来当同负载前后性能比较；不声称百分比提速。

## 三、处置

1. R1 / R3 的原始报告保留；本验收明确区分采纳事实与未生效建议。
2. R2 原文保留为拒收样本，绝不作为治理席追责事实。
3. edit 协议、状态权威、被审者不得出题，沿用已存在规则，不重投。
4. 唯一拟新增正式方针：在 omomp-efficiency 的有界取证节加入 actor 身份寻址与首读核对方法。经 `council propose --seat OmompOptimizer` 按 P3 立案；通过前不修改 skill/角色，也不新增监督或验收机制。
5. 订阅 OmompOptimizer 已实际建立、daemon watching 已确认，常驻等待议程事件。文件持久化交秘书路径限定归档；本部门不替秘书维护台账。
