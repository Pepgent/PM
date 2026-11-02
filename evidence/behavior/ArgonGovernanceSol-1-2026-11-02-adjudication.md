# ArgonGovernanceSol-1 独立监督审计验收

## 对象、窗口与方法

OmompOptimizer-2 按 C2-2.3③ / U97 通过 task 新派 `GovSolAuditR4_0118`，只给完整子流 URI 与窗口，不给候选问题。对象 `session://01a195a6-e09a-7070-8423-a7910184b28a/agents/ArgonGovernanceSol-1/`；窗口 UTC 2026-11-02 00:37–01:18。原始报告：`evidence/behavior/ArgonGovernanceSol-1-2026-11-02.md`。本验收只覆盖该窗口，不把窗口后补救倒推成此前已履职。

## 采纳的结论

1. **治理票、闸门 B、反全局等待锁及独立部门边界大体符合职责。** 没有因可达路径错误或有明确议程依赖的等待而认定罢工；没有观察到业务代码、测试、SOPS 或用户凭据操作越界。
2. **独立实况/自我巡检职责在窗口内漏履行。** 独立报告检视该子流的全窗口工具记录，未见实际派发 inspector/sentinel 或独立周期巡查启动；父验收又直接核对：
   - `entry/67b52c16`，01:17:20.019Z，用户指出没有履行自身职责或挂巡检。
   - `entry/76724c35`，01:17:45.632Z，实际 say：“接岗后我把职责收缩成了投票和闸门 B，没有挂独立于议会事件的定时巡检，也没有新派巡检员反向审查我自身”。同 entry 的实际动作仍是读取规范和时间，没有把后续意图当成已经执行。
   - `council watch` 是议会事件监听，不是已经完成独立巡检的证据。
3. **这是已证实的窗口级漏履职，不据此推定故意罢工、产品越权或应撤换席位。** 不增加每 PR/每切片验收锁，不打开无证据针对 low/free 的全局监督。

## 同席 watchdog 覆盖核查

本部门独立读取项目 `.omp/WATCHDOG-GovernanceSelfCheck.md` 的初读快照：`target: argon-governance`。实际加载源 `~/.omp/omp-config-src/agent/extensions/watchdog-agent/runtime.ts:68-90` 中 sub identity 为 role/name 与 fileId，target 逐个精确匹配；因此仅原 role 的 target 不会覆盖 `argon-governance-sol`。

同一加载源 `spec.ts:91-103,136` 明确支持逗号串或内联列表。项目同一规则可以用 `target: [argon-governance, argon-governance-sol]` 表达同一治理席的两种 role，不必改机制实现、model、every 或监督正文；这是 U96/U100 已规定的同席外部监督覆盖补全，不是新增正式提效制度。

项目文件由 ArgonGovernanceSol-1 拥有，本部门已回传上述源头与支持的语法，不并行写。源码只能证明解析/匹配语义；必须以正确 Sol 会话的审阅、注入或 cursor 运行事实判断实际覆盖，不能凭 target 文本已改或 timer 打印 tick 宣称监督履职闭环。

## 窗口后的消息与未作的认证

ArgonGovernanceSol-1 通报已新派两个巡检并挂 clock，又通报收到真实 GovernanceSelfCheck 注入、撤回提前标记 DONE。它还报告固定 `agent://ArgonGovernance` 别名可能令另一条告警引用旧 actor 产物。这些是窗口后的拥有方消息，本验收不把它们冒充已亲验的结束状态；等待其已派只读取证者给出可解析运行证据，不唤醒旧巡检员复查。

本部门检查实际加载 `review.ts:158-171`，reviewer 接收规则 guidance 与当前 transcript；项目 guidance 又写了固定旧别名。此处只记录可检验的风险线索，不据此认定每条告警都错，不为消除合法告警提前删改监督正文。后续取证必须仍区分当前被监视 actor 与旧实例产物。

## 处置边界

- 原报告保留，本验收与原报告一起持久化；不修改 LEDGER 状态，不把局部修复认证为长期合规。
- 已有独立巡检/同席覆盖要求不重新投票，不另开与 D54 重复的制度。
- U124/U125 的工人、管理者和片区经理取证另用全新实例处理；不把本窗口结论扩大到那些对象，不用 peer 消息代替应有的流程决议。
