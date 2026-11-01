## 统一 e2e 阶段工作项

依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L17-L18)；发行导入接入时点按 [D10-14](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L26)。

开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。

统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。

范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。

本 issue 本身就是 S1 / E2E-11a / F02–F04 的统一执行承接项：[soroi#245](https://github.com/Pepgent/soroi/issues/245)。本项及其 full A0/live 证据不再是任何实现切片的开发前置；开发期完成 driver/spec/runbook 并合入 main，测试者只在统一阶段执行。原结果、checkpoint、真实入口和证据归档义务全部保留。统一阶段 A0 由 [soroi#235](https://github.com/Pepgent/soroi/issues/235) 执行，S1 由各 E2E-* / 本项执行，随后 [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23)，再由 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) 完成 S2。

## 目标
在真实 S1 central 经 Mux 驱动已安装 soroi，完成 F02、F03、F04 的 D8 下游验收，归档真实而非 oracle/fixture 的 Verdict。

## 责任与来源
本 issue 继承 https://github.com/Pepgent/soroi/issues/213 的完整 runtime 义务。按 D10-05/06，驱动/spec 开发期合入，独立测试者仅在全部组件开发完成后的统一 S1 执行本 issue；本项不是任何实现切片的前置，完整义务不再延期。判据来自 https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md 的 F02–F04 行；不改变产品目标。

## 预期结果与验收
| Flow | 真实下游结果 | Command | Env / Expect |
|---|---|---|---|
| F02 | 脚本根步骤留下未消费 atom；第二条 prompt 仅“继续消费未消费的 atom，消费完调用 stop”；实际每个 formal eval 消费前一步未消费名字；边来自前一步已提交值；store 结束事件由根supervisor产生；同请求提醒正文和集合正确，pre-request phase/ordinal/条目顺序可核对 | `bun run --cwd e2e f02 --config /absolute/path/to/F02.json` | 完整S1 + same-release A0；exit0且真实Verdict pass |
| F03 | 9段违规代码给出规定CheckError，stream无推进、9个独立slow_step标记均不存在、无新agent；合法阳性对照真实产生两marker，activity区间交叠，解构字段各自成为atom | `bun run --cwd e2e f03 --config /absolute/path/to/F03.json` | 同上，真实library与activity；exit0且真实Verdict pass |
| F04 | 未钉住Program真实执行、review所有输出钉住且无新agent；前后runs/graph/seq不变；从真实未钉住File输出路径读取原字节得到对象身份，GET objects为404；formal+pins经真实宿主schema拒绝且seq不变 | `bun run --cwd e2e f04 --config /absolute/path/to/F04.json` | 同上，central可读实际File；exit0且真实Verdict pass |

每个流程在 PM `evidence/e2e/<campaign>/<F##>/` 保存原始RPC、HTTP/SSE、状态/graph/activity、marker/实际File数据及复现命令。模型偏离只记录，最多同prompt重发一次后换下一模型；不同尝试使用不同根session，不能相互污染。不把模型措辞、容器存活或本地oracle的exit0标为产品通过。

## 已裁决的观测细节
- F02：SOR-08 data为 `{phase:"before_provider_request",requestOrdinal,text}`；以active transcript分支上的顺序、递增ordinal和随后同请求assistant的toolCallId绑定证明。customType由 https://github.com/Pepgent/soroi/issues/204 公布；不从message_start/assistant.timestamp/model_usage推断请求开始。裁决记录：https://github.com/Pepgent/soroi/issues/213#issuecomment-6551846769 。
- F04：预览仅定位actual File path，在central读真实原字节取得身份，再查对象404；hash本身不作为runtime证据，不使用期望字节或测试pin文件替代未钉住Program输出。裁决记录：https://github.com/Pepgent/soroi/issues/213#issuecomment-6551717344 。

## 统一验收前置与代码/产物
- 驱动与spec：https://github.com/Pepgent/soroi/issues/213 。代码侧oracle/缺A0拒绝不能关闭本issue。
- 完整A0：https://github.com/Pepgent/soroi/issues/235 ，以及发行/central部署。
- HTTP与根supervisor：https://github.com/Pepgent/soroi/issues/193 、https://github.com/Pepgent/soroi/issues/201 。
- CheckError与执行前检查：https://github.com/Pepgent/soroi/issues/195 。
- 提醒source契约：https://github.com/Pepgent/soroi/issues/204 。
- SSE/activity：https://github.com/Pepgent/soroi/issues/190 、https://github.com/Pepgent/soroi/issues/189 。
- library：https://github.com/Pepgent/lab-library/issues/1 。SOR-04 https://github.com/Pepgent/soroi/issues/185 已交付；完整S1仍须实际消费其效果。

## 范围边界
不补产品功能，不用local in-process store代替中心store，不把oracle手构输入当成真实流程数据。依赖齐备后本测试者继续并发布真实结果。
