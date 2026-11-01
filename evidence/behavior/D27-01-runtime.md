# D27-01：精确 actor 取证的真实运行验收

## 结论与范围

[D27-01（PM#44）](https://github.com/Pepgent/PM/issues/44) 已由 council 在 2026-11-01T17:29:19.383Z 发布通过：6/6，门槛 5。OmompOptimizer-2 先消费 `digest --reader OmompOptimizer`，再落实已通过的 how；未在表决前落地。

**本次真实验收通过。** 两个全新 `behavior-analyst` 实际加载含 D27 的 skill，在真实 session URI 上完成根流、嵌套子流的首读身份核对、窗口投影及同流源 entry 读取。证据是实际工具调用与返回字段，不是代码静态检查、mock、报告标题或 hash 比对。没有运行 build、lint、测试脚本或测试套件。

本次只验证日志取证方法在两个实际路径上的运行，不认证长期合规，不把两个不同窗口的耗时当作同负载性能对比，不宣称百分比加速。

## 落地文件与文档一致性

1. `.omp/skills/omomp-efficiency/SKILL.md`：
   - description 与适用范围明确覆盖领导工作台的巡检子代理。
   - 标题、来源说明与 §5 同步引用 D27-01。
   - 身份核对合并到已有 `?limit=2` 首读步骤，没有增加第二次重复首读。
   - 根流、完整子流 URI 分别对应空 agent / 完整 AgentId；窗口投影保留 sid、agent、tool、args、status、resultEntry、url。
   - 状态正文替换为本次真实加载事实与明确的验证边界。
2. `.omp/agents/behavior-analyst.md:14`：只更新对象 URI 的精确示例，并引用同一个 skill 第5节，要求实际加载；没有复制第二份取证规范，没有改变无预设任务输入、角色模型/权限或巡检生命周期。
3. 其他章节的意图已完整阅读；投票、工人通信、业务契约、监督配置均未改。没有新增 skill、watchdog、遥测、状态副本或审批/工程门禁。

## 真实触发方法

在当前领导工作台调用原生 `task`，显式 `agent: behavior-analyst`、`isolated: false`，一次派两个新命名实例：

- `OmompOptimizer-2.D27RootRuntimeR1`：对象 `session://01a195a6-e09a-7070-8423-a7910184b28a/`；窗口 `2026-11-01T17:03:13Z`–`17:03:16Z`。
- `OmompOptimizer-2.D27ChildRuntimeR1`：对象 `session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.GovAuditR2_1710/`；窗口 `2026-11-01T17:11:34Z`–`17:11:35Z`。

输入只识别对象与时间窗口，无问题清单或预设罪名；没有以 write 唤醒旧巡检员。报告使用各自新路径，没有覆盖旧调查报告。父验收直接读取下列真实调用和结果，而不只接受子代理自述。

## 根流：加载与同流取证

全部验收 trace 位于：
`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.D27RootRuntimeR1/`

| UTC | 实际调用 | 结果 / 精确证据 |
|---|---|---|
| 17:31:52.203 | `read skill://omomp-efficiency` | `entry/133397ee`；结果 `entry/051d27c2` 为 ok，正文包含 D27-01、sid/agent 核对与根/子路由，不是旧版 skill |
| 17:31:59.869 | `read session://01a195a6-e09a-7070-8423-a7910184b28a/events.jsonl?limit=2` | `entry/9c39a898`；结果 `entry/f1f387b4` 两条均为该 sid、`agent:""`，url 指向根 `/entry/…` |
| 17:32:23.830 | 读取根流 `entry/57f7efbc` 与 `entry/0faccb87` | `entry/69f5e741`；结果 `a69c0b4c` / `9e40f5eb`，保持根流路径，未跳入治理席子流 |
| 17:33:15.936 | 按指定窗口投影包含 `{sid,agent,...,tool,args,status,resultEntry,url,...}` | `entry/3914a878`；结果 `entry/fa1a146b`，身份与源链接仍为根流 |

运行产物：`evidence/behavior/Main-2026-11-01-170313-170316.md`。其根身份核对与源 entry 归属满足 D27 的本次验收；窗口外事项不在本次验收范围。

## 嵌套子流：加载与同流取证

全部验收 trace 位于：
`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.D27ChildRuntimeR1/`

| UTC | 实际调用 | 结果 / 精确证据 |
|---|---|---|
| 17:31:46.401 | `read skill://omomp-efficiency` | `entry/3e2fb73b`；结果 `entry/2153bc65` 为 ok，正文包含本次 D27 修改 |
| 17:31:50.672 | `read .../agents/OmompOptimizer-2.GovAuditR2_1710/events.jsonl?limit=2` | `entry/f5e0da6e`；结果 `entry/da1e9455` 两条均为父 sid、`agent:"OmompOptimizer-2.GovAuditR2_1710"`，url 保持完整嵌套子流 |
| 17:31:53.530 | 同一子流窗口投影 `{sid,agent,t,kind,entry,tool,args,status,resultEntry,url,detail,what}` | `entry/c8e823fa`；结果 `entry/9f6e0f9c`，保留本提案所要求字段 |
| 17:31:55.935 | 读取该子流 `entry/bca18fe6`、`entry/a5d1c90e` | `entry/212acd4e`；结果 `entry/8fa285b1`、`entry/d842cfe5`，源 entry 路径没有改为父流 |

运行产物：`evidence/behavior/OmompOptimizer-2.GovAuditR2_1710-2026-11-01.md`。分析员明确区分“本次被分析的巡检员”与“该巡检员当时调查的 ArgonGovernance-2”，未混淆两层 actor。

该子代理报告使用 D27 说明了一个发生在 D27 生效前的旧错误。本验收**只采纳其寻址运行事实，不把后通过规则追溯为旧行为的纪律依据**；旧错误的拒收依据仍是当时已存在的源头事实/对象身份要求。报告保持原样，不据新增方法追溯追责。

## 可复核入口与交付边界

复核任一验收者的实际调用列表：

`session://01a195a6-e09a-7070-8423-a7910184b28a/agents/OmompOptimizer-2.D27RootRuntimeR1/events.jsonl?type=call&q=select(.tool=="read")|{t,path:.args.path,status,resultEntry,url}`

或将 actor 改成 `OmompOptimizer-2.D27ChildRuntimeR1`。使用上表 resultEntry 可直接读取当次保存的原始结果，不必重跑巡检或重新抓取全文。

两条路径均已实际加载并消费 D27 正文，完成了决策 how 的运行验收。文档状态记录交秘书按本证据更新；不将此局部验收变成持续约束永久绿标。原始审计四份归档保持不可变，本次运行产物与证据另行归档。
