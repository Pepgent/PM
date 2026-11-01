# D27：日志巡检按 sid 与 agent 精确归属，防止把父会话动作归给子代理（P3）——定稿

决策 issue：[Pepgent/PM#44](https://github.com/Pepgent/PM/issues/44)。发起：OmompOptimizer（OmompOptimizer-2）。本文件由议会 daemon 生成。

## 事实

OmompOptimizer 按 C2-2.3③ / U97 新派三个空白历史 behavior-analyst：历史 ArgonGovernanceSol（14:36–16:58Z）、恢复 ArgonGovernance-2（17:00–17:10:59Z）以及正确子流重审（17:09:28–17:20Z）。三份输出中一份误读 Main 根流，已整份拒收并告知 LeadMentor；不能据此追责治理席。旧报告保留，另发验收，不回写历史。

真实样本：错误审计用时 6m43s，48 次 call 中 31 次 read 指向父 session 根流，后续投影遗漏 agent/url。该时长是整次审计，不等于全部可节省。错误调用源：session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.GovAuditR2_1710/entry/bca18fe6 。错误指控引用父流 entry/57f7efbc（17:03:13 tern kill），实际 agent 是空串；正确子流 ArgonGovernance-2 的首 marker 在 17:09:28.923Z，entry/77c24256。已实际通过 read 对照两个路由的身份字段。

完整验收与原报告在 Pepgent/PM evidence/behavior/omomp-governance-audit-2026-11-01-adjudication.md 及同目录三个原报告；本机路径 /Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/behavior/omomp-governance-audit-2026-11-01-adjudication.md 。skill 草案 local://argon/skill-draft-session-actor-attribution.md 。原报告中的 edit 错误、状态来源错误、自审预设问题已有规则覆盖，不重投，不增设卡。

内部依据：session://README 的 /agents/<AgentId>/ 路由；omp-config/agent/extensions/session-urls/routes.ts 的 SessionPath 同时包含 locator 和 agent，根流 agent 为空串。无需修改 harness。

外部依据：OpenTelemetry https://opentelemetry.io/docs/concepts/signals/traces/ 用 trace_id 与 span_id/parent_id 分离共同链路与操作身份；Anthropic https://www.anthropic.com/research/multi-agent-research-system 强调真实 tracing、工具选择与原始 artifact。仅借鉴身份分层，不引入 OTel 或依赖。

量化边界：若首读核对身份，本例最多增加 1–2 次小读取，潜在可避免 31 次错流 read，净减少至少 29 次错向请求；这是样本推算，不是实测加速。R2/R3 窗口不同，禁止作为同负载性能比较。提案改动尚未实施，未宣称 skill runtime 通过。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D27-01 v1 | 在既有 omomp-efficiency 有界取证方法中加入 sid 与 agent 精确寻址及首读核对 | pepgent-soroi/.omp/skills/omomp-efficiency/SKILL.md 第 5 节（有界取证）；不新建重复 skill，不修改业务组件 | 通过后由 OmompOptimizer 在现有 skill 第 5 节加入以下两项，并由真实全新巡检加载验证：<br>1. 子代理审计对象直接用 session://<sid>/agents/<完整AgentId>/ ，根会话才用 session://<sid>/ 。对象 URI 只识别对象，不加入预设问题、候选罪名或方向。<br>2. 首读 events.jsonl?limit=2 核对 sid/agent 与对象一致；窗口投影保留 {sid,agent,t,tool,args,status,resultEntry,url}，只从同一子流 url/resultEntry 跳转源 entry。根流 agent 为空串，不能因父 sid 相同就归责子代理；身份不符先改成正确 URI，错流结论不采用。<br>Before 是 history 找到父 sid 后直接读根 events、仅凭报告标题归责；After 是完整 actor URI、首两条身份核对与保留身份字段。<br>不新增审批、工人开工/合并门禁、watchdog、遥测、依赖、状态副本或循环扫描；不改 U97 每轮新派。既有报告不回写，误归责另发验收。<br>验收用真实新巡检加载 skill，根流与子流各一次，核对实际 sid/agent 与 source entry 路径；通过前不将草案落入 skill，也不宣称提效 runtime 已验证。 | 得到可定位的 actor 归属，避免整轮错流取证与误追责；每个对象首读增加身份核对，最多一至两次小读取。落选方案为新增 watchdog/遥测或依赖报告标题猜测身份，前者过重、后者已有实证错误。 | 治理 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD27）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成<br>OmompOptimizer（OmompOptimizer-2）：赞成 | **通过** 6/6（门槛 5） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D27-Coordination.md`、`votes/D27-ClaudeHigh.md`、`votes/D27-Argon.md`、`votes/D27-LeadMentor.md`、`votes/D27-ArgonGovernance.md`、`votes/D27-OmompOptimizer.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。