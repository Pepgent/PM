## 统一 e2e 阶段工作项

依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L17-L18)；发行导入接入时点按 [D10-14](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L26)。

开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。

统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。

范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。

本 issue 本身就是 S1 / E2E-10 / F01 的统一执行承接项：[soroi#182](https://github.com/Pepgent/soroi/issues/182)。本项及其 full A0/live 证据不再是任何实现切片的开发前置；开发期完成 driver/spec/runbook 并合入 main，测试者只在统一阶段执行。原结果、checkpoint、真实入口和证据归档义务全部保留。统一阶段 A0 由 [soroi#235](https://github.com/Pepgent/soroi/issues/235) 执行，S1 由各 E2E-* / 本项执行，随后 [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23)，再由 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) 完成 S2。

## 目标
在真实 S1 环境运行已交付的 `e2e/s1/f01.spec.ts`，取得 F01 的真实下游判定与 PM 归档，不用夹具结果代替。

## 上下文与问题
F01 由 D8 §3 验收矩阵定义：https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md 。LabStandIn 核心由 https://github.com/Pepgent/soroi/issues/181 交付；该任务只证明真实 mux 与夹具的驱动和证据路径，fixture 的 Verdict 为 fail，不能证明正式 soroi F01。

## 责任与必要决策
独立测试者负责驱动和权威证据，不改产品。本 issue 按 D10-05/06 在全部组件开发完成后的统一 S1 阶段执行；不再作为任何实现切片的前置。store 持有运行事实，根 supervisor 发 end，测试者只观察。

## 预期结果
- 根 omp 只装发行 tar，由 mux writer/dial 启动；A0 对同一 release 的证据通过。
- 精确 formal 代码 `const temp_2200c = 2200\nstop(temp_2200c)` 产生新运行，工具结构化结果 runEnded=true；Ended 列表和 graph holder 等于 get_state.sessionId，唯一 Root 为 temp_2200c=2200，unconsumed 为空。
- 真实 store SSE 顺序为 run_started、step_committed、atom_stopped、run_ended；记录 supervisor 的 open step 与 end 的请求/Ended 响应原文。
- PM `evidence/e2e/<campaign>/F01/` 保存 D8 Verdict、raw RPC、HTTP/SSE、A0 和可复现命令；缺失判据必须失败。

## 范围边界
不重做 LabStandIn，不接入真实 Lab，不以 fixture 或本机进程内 store 替代真实 S1。

## 验收标准
| Dimension | Check | Command | Env | Expect |
|---|---|---|---|---|
| integration | 上述全部真实 F01 下游事实 | `bun run --cwd e2e f01 --config /absolute/path/to/campaign.json` | 已安装完整 tar 的 S1 central、mux、store，注入拥有方模型网关凭据 | exit 0；Verdict pass；每条断言可回到原始证据 |

## 统一验收前置
- STO-01..03：https://github.com/Pepgent/soroi/issues/180 交付中心 HTTP store。
- SOR-02/03：产品插件 HTTP store 客户端与根 supervisor 显式 end。
- STO-05：真实 store SSE（不在 #180 范围内）。
- DIST-01/A0：发行 tar 安装与相同 release 的安装探针证据。
统一执行前置代码/产物：SOR-02 [soroi#193](https://github.com/Pepgent/soroi/issues/193)、SOR-03 [soroi#201](https://github.com/Pepgent/soroi/issues/201)、STO-05 [soroi#190](https://github.com/Pepgent/soroi/issues/190)、DIST-01 [soroi#199](https://github.com/Pepgent/soroi/issues/199)、A0 [soroi#235](https://github.com/Pepgent/soroi/issues/235)。这些只约束统一阶段执行，不是开发期开工门禁；本执行项保留完整验证义务。


## 承接来源与原验收义务

下列各项由本统一阶段执行项完整承接；原文为范围快照，不恢复开发期门禁。涉及 hash/digest 的值只用于对象寻址或组装身份，禁止以比对作为任何通过证据。多个承接项覆盖同一来源时，各自执行本阶段适用部分，合计覆盖全部原义务，不相互替代。

### 来源 [soroi#203](https://github.com/Pepgent/soroi/issues/203)

原义务原文：

> 冷启动后 init 返回 `ReleaseRecord`；`GET /releases` 有这条记录，它引用的 boot、runner、定制 tar 都能 `GET /objects/<哈希>`；哈希不符时不写任何记录
