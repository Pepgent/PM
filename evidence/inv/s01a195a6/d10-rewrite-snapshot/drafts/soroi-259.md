## 统一 e2e 阶段工作项

依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L17-L18)；发行导入接入时点按 [D10-14](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L26)。

开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。

统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。

范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。

本 issue 本身就是 S1 / E2E-19 / F26–F30 的统一执行承接项：[soroi#259](https://github.com/Pepgent/soroi/issues/259)。本项及其 full A0/live 证据不再是任何实现切片的开发前置；开发期完成 driver/spec/runbook 并合入 main，测试者只在统一阶段执行。原结果、checkpoint、真实入口和证据归档义务全部保留。统一阶段 A0 由 [soroi#235](https://github.com/Pepgent/soroi/issues/235) 执行，S1 由各 E2E-* / 本项执行，随后 [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23)，再由 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) 完成 S2。

## 目标 / what

交付并由独立测试者执行 F26–F30 的完整 **S1 automatic driver / live acceptance**：在第一段环境 L 中，经真实发行 installer 安装的 omp、真实模型、Mux、store 和节点库，自动产生五个流程的原始事实，并在 `Pepgent/PM/evidence/e2e/<UTC-campaign>/F26` 至 `F30/` 归档五份通过的 D8 `Verdict`。本 issue 完整承接 [E2E-19 原实现项](https://github.com/Pepgent/soroi/issues/208) 原有的 F26–F30 S1 产品验收义务；原实现项的代码阶段交付、关闭或合并不等于本 issue 通过。

## 必须先读 / 来源

- [D8 决策](https://github.com/Pepgent/PM/issues/8)及 [D8 §3 F26–F30 五行](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L145-L149)：本 issue 负责这五行的全部 S1 判据，不接管 S2。
- [D8-02、03、05–09](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L73-L80)：A0、同一正式 CI 发行、环境 L、真实模型、节点库与 LabStandIn 驱动路径。
- [D8-11、12](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L82-L83)和 [§3.1 Verdict](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L153-L178)：只能按权威事实判定，逐断言溯源并进 PM git。
- [D6 HTTP / SSE 契约](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L194-L217)：usage、版本记录、运行事件和独立 lifecycle cursor。
- 仓内 `e2e/standin/lab-standin.ts`（写方、代、dial、RPC 生命周期）、`e2e/standin/evidence.ts`、`e2e/s1/recorded.ts`（Evidence namespace、原始 HTTP/RPC 与观察窗口）以及 E2E-19 交付的 `e2e/s1/f26.spec.ts` 至 `f30.spec.ts`（录制消费者）。
- 范围与时点依据：D10-05/06；E2E-19 代码及 automatic driver 开发期合入，本 issue 在统一 S1 承接全部原 S1 结果及 checkpoint；不得以 oracle 或 native reader-only 宣称产品通过。

## 问题与原因

录制消费者、固定正反 oracle 和真实 native Mux 的读/广播/拒绝传输可以证明验收代码工作，但它们自身不会在已安装 soroi 的 S1 环境中驱动真实模型提交正式步骤、实际执行节点库、变更节点版本或产生 store lifecycle。因此只合入 E2E-19，仍缺少 D8 五个流程的自动产生事实、独立运行和归档闭环；把录制/夹具判定当 live pass 会漏掉这段产品路径。

## 责任与必要决策

- **实现仓库**：`Pepgent/soroi` 的 `e2e/`；**具名责任角色**：开发期 e2e 工程师负责 automatic driver 代码；本 issue 的独立 S1 测试者在统一阶段负责真实执行、五行判定和 PM 证据归档，不由代码作者的 oracle 自证替代。测试者在本 issue 的 `STARTED` 评论登记实际执行身份、发行、工作入口和依赖证据；未登记、未实跑不得关闭。
- **状态 owner**：omp/native RPC 提供实际 session、工具调用和 stdout；Mux 提供连接与拒绝事实；store 提供 run/graph/seq/usage/version/lifecycle；`Pepgent/lab-library` 提供实际 `calc` 代码和 git commit。driver 只消费这些事实，不注入自造 graph、SSE、版本记录或伪造工具结果。
- **automatic driver 交付入口**：在 `e2e/s1/observers-live.ts` 提供 `--config <absolute-path>` 的 Bun 命令，自动执行下述 F26–F30 场景、采集同一 `Evidence` namespace 的原始 RPC/HTTP/SSE/native 事实，并调用五个既有录制消费者。该路径是本 issue 要实现的命令，不声称当前已存在或已执行。配置提供发行 provenance、完整 A0 Verdict、S1 store/mux 地址、安装后公开 launch argv、真实模型、真实节点库 checkout、输出目录；秘密由环境拥有方注入，不进入配置或证据。
- 必须通过 native 写方声明 → 开代 → 本机 dial → ready → 实际 prompt / 工具调用；等待执行完成及 session settlement，先结束内层代/dial 再结束写方。实际提交与结束由 soroi supervisor 发出，不能由 driver 手工 POST 伪造产品运行。
- 保持 `e2e/s1/f26.spec.ts` 至 `f30.spec.ts` 录制入口可单独执行；automatic driver 不得绕过它们或把场景索引当事实。缺 A0、缺任一阶段、错相位、错来源或失败断言都产生失败 Verdict，进程非零退出；一次成功的 fixture/oracle 不得改变 live 结论。

## 预期结果：完整继承的五行 S1 义务

1. **F26 graph + stream 续订与任意 agent 观察**：真实根会话在同一运行中完成两次正式步骤；首次订阅 `after=0`，第一步后用最后已收到的 run seq 断开并续订。每次正式步骤恰好对应一组事件，续订前后无重叠、无缺口；这里的“提交”是 run-step，不是 git commit。graph 的 holder 等于该 native 根会话身份，图中两步节点与事件一致。真实子 agent 的读方拿到全部 native stdout（含完整工具流，不只一个标记）；读方实际发 `prompt`，该读方被 policy `1008` 关闭，写方及其他读方仍继续收发，后续真实帧证明未受影响。
2. **F27 未结束运行与 dry run 零写入**：真实正式步骤留下 `Open` 运行，`graph.unconsumed` 非空且包含实际产出；在同一运行实际 dry-run 执行 `calc` 并读取结构化结果。比较 dry-run 前后同一 owner 的 run/state/graph 和 stream 最大 seq，seq 及持久状态均不变。不得靠未执行 dry-run、空图或替换成夹具通过。
3. **F28 新根会话按名字调用节点库**：结束前一根会话后新开 native 根会话，使用真实 `Pepgent/lab-library` 按名字调用 `calc`，输入 `21`，实际输出 `42`。原始 RPC 工具参数与执行结果、store graph 的 `calc` 调用、指向位置 0 输入的 atom 边和值 21、产出 atom 值 42、holder 和新 session 身份一致，证明持久化节点库及 import 传参路径，而非只证明导出文件存在。
4. **F29 usage 与真实版本变更**：先正式运行实际 doubles `calc(21)` 得 42，`GET /functions/calc/usage` 列出实际运行和版本；保存旧版本 `GET /versions/{old}` 完整记录。修改本 campaign 使用的真实库 `calc` 为 triples 并在库内实际 git commit，再正式执行输入 21 得 63。graph、usage、新 `NodeVersionRecord` 必须指向新版本/新库 commit，两个版本均可按原身份读取；再次读取旧版本记录与原记录内容相同。版本身份仅用于寻址与关联，不以 hash 计算、相等或不同作为正确性或通过证据；正确性由真实 42→63 行为、commit 归属、usage 和旧记录不变共同证明。
5. **F30 lifecycle 驱动面**：在实际运行开始前连接 `/stream/lifecycle`，观察同一次真实运行的 `run_started`、`run_ended` 顺序，两者带实际 run id 和 native holder。按 D6 字段解析 `event`，保留两个各自不同的 opaque `cursor`，不得把 lifecycle cursor 当 run seq 或以 run-stream 数据冒充。独立查询 store 证明运行确为 `Ended`、graph 与同一 holder/run 相符；不是只读到自造结束事件。

## 验收标准 / 真实 checkpoint

下列是交付后在 S1 环境执行的命令，不是已取得的运行证据。`CAMPAIGN_CONFIG` 是测试者保存的实际绝对配置路径，`STORE_URL` 是该配置的 owning store，`RUN_F26`、`RUN_F27`、`RUN_F28`、`RUN_F29_OLD`、`RUN_F29_NEW`、`RUN_F30`、`OLD_VERSION`、`NEW_VERSION` 均从当次原始工具结果/graph 读取并写入复现 README，不按“最新一条”猜测。curl 的实际响应也进入证据目录。driver 命令覆盖真实行为；HTTP 命令是独立下游复核，单独返回 200 不足以通过。

| # | Dimension | Check | Command | Env | Expect |
|---|---|---|---|---|---|
| C0 | environment | 五行共同前置：同一 CI release 安装、full A0、真实模型与真实依赖 | `bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"` | OrbStack 第一段 `pepgent-soroi-e2e` 的 `central`；同项目真实 store/mux；真实库；owner 注入模型凭据 | installer 原始日志和完整 A0 通过记录对应当次正式发行；实际 omp 启动参数、工具调用与真实模型记录可追溯。仅 installer image gate 不能替代 full A0；前置缺失时不得生成 S1 pass。 |
| C26 | integration | 结果 1：两次正式 step 的 graph、after 续订、完整子 agent stdout 和实际读方拒绝 | `bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"`；`curl -fsS "$STORE_URL/runs/$RUN_F26/graph"`；`curl -sS -N --max-time 10 "$STORE_URL/runs/$RUN_F26/stream?after=0"` | C0 的实际环境 L；读方通过真实 Mux 连接 | 原始分段 SSE 和 RPC 证明两次 step 各一组事件、after 接续无重漏；图的 holder/session、节点一致；native stdout 全量逐帧对照；坏读方收到 1008，写方和其他读方后续帧继续。SSE 是长连接，curl 超时退出只界定观察窗口，不作为通过/失败判据。 |
| C27 | function / integration | 结果 2：实际 Open/nonempty unconsumed 和真实 dry-run 前后零写入 | `bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"`；`curl -fsS "$STORE_URL/runs/$RUN_F27/state"`；`curl -fsS "$STORE_URL/runs/$RUN_F27/graph"` | C0；同一 run 在 dry-run 前后各采样 | 原始工具结果证明 calc 的 dry-run 确实执行；前后 run 均 Open、unconsumed 非空、state/graph 持久内容及最大 seq 不变。只在 driver 完成后抓一次快照不够。 |
| C28 | integration | 结果 3：fresh root、按名字 actual calc 21→42、输入边和输出 | `bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"`；`curl -fsS "$STORE_URL/runs/$RUN_F28/graph"` | C0；全新根会话、真实库 doubles 版本 | native get_state 与前根不同；正式工具参数和 Program 调用成功；graph 的输入位置/atom 值为 21、calc 输出为 42，holder 正确。 |
| C29 | integration | 结果 4：真实库 commit、21→42/63、两版 usage 与旧记录不变 | `bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"`；`curl -fsS "$STORE_URL/functions/calc/usage"`；`curl -fsS "$STORE_URL/versions/$OLD_VERSION"`；`curl -fsS "$STORE_URL/versions/$NEW_VERSION"`；`curl -fsS "$STORE_URL/runs/$RUN_F29_OLD/graph"`；`curl -fsS "$STORE_URL/runs/$RUN_F29_NEW/graph"` | C0；campaign 拥有的真实 library git checkout | 实际库源码/commit 输出、两次原始工具调用和图分别给出 42/63；usage 包含真实两次运行和对应版本；新记录 commit 对应修改，旧版本记录修改前后内容一致。不得将 hash 验证用于本行任何证据。 |
| C30 | integration | 结果 5：真实 lifecycle 顺序、身份及独立 Ended | `curl -sS -N --max-time 120 "$STORE_URL/stream/lifecycle"`（在另一个终端先启动并保留原文）；`bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"`；`curl -fsS "$STORE_URL/runs?state=Ended"`；`curl -fsS "$STORE_URL/runs/$RUN_F30/graph"` | C0；订阅在实际 run 开始前已建立 | 原始 lifecycle 的 event 是 run_started→run_ended，同一实际 run/holder，各有不同 opaque cursor；独立 Ended 列表和 graph 确认终态。curl timeout 只停止长连接，不充当判定；driver 自身也必须自动录制该订阅。 |
| C31 | environment / integration | 五行正式判定、源码消费者与 PM 归档闭环 | `bun run e2e/s1/observers-live.ts --config "$CAMPAIGN_CONFIG"`；`bun run e2e/s1/f26.spec.ts --config "$F26_CONFIG"`；`bun run e2e/s1/f27.spec.ts --config "$F27_CONFIG"`；`bun run e2e/s1/f28.spec.ts --config "$F28_CONFIG"`；`bun run e2e/s1/f29.spec.ts --config "$F29_CONFIG"`；`bun run e2e/s1/f30.spec.ts --config "$F30_CONFIG"` | 当次真实采集输入；各 consumer 使用其实际绝对配置路径、独立输出目录 | driver 与五个消费者均 exit 0；五份 Verdict 是 segment S1/env L/result pass 且逐条断言对应实际 RPC/HTTP/SSE/native 来源；PM git 中能读到完整原文、配置脱敏副本及复现命令，不只是本地文件存在。 |

## 证据与关闭条件

- 每个 F 目录包含 `verdict.json`、完整写方/读方 `rpc.jsonl`、`store/` 的 HTTP 请求/响应元数据和正文及 SSE 原文、必要的 native stdout/transcript、`README.md` 复现命令。F29 另含修改前后实际库源码、库 commit 命令输出、usage、两版记录及旧记录重读原文；F26 另含连接/关闭和 stdout 对照；F30 保留独立 lifecycle 原文与终态查询。
- 保存同一正式发行与 full A0 的 provenance、各仓库 commit、镜像身份、omp 版本、实际模型、所有 run/session/agent 身份。身份值可以记录和用于寻址；任何 hash 验证都不得作为证据。token、provider 凭据和 secret 不进证据。
- 五份通过 Verdict 必须符合 D8 §3.1，每条断言保存 expected、observed、source；来源引用能定位当次原始行或 HTTP 响应。模型自然语言、容器 running、HTTP 200、文件存在、oracle 全绿都不能代替结果。
- 归档并 push 到 `Pepgent/PM/evidence/e2e/<UTC-campaign>/F26`…`F30/`，在本 issue 评论附真实 commit/路径链接和逐 checkpoint 结果。开发期 automatic driver PR 关联本 issue 并交付代码，不以代码合入关闭本统一执行项；一个 PR 不得同时关闭 E2E-19。
- 本 issue 是已经接手的继承验证义务终点，不得把 full A0、automatic driver、实际五行运行或 PM 归档再移给另一个 future issue 后关闭。依赖尚未就绪时保留 open，评论 `BLOCKED` 及具体 owner 后置条件；不能以“已接线/录制可用”关闭。

## 统一验收前置与范围边界

- Depends on: [E2E-19 代码阶段](https://github.com/Pepgent/soroi/issues/208)：五个可执行录制消费者、同一 Evidence 采集契约、native transport 和完整固定正反 NONLIVE oracle。该项的合并不是本 issue 的产品通过证据。
- Depends on: [STO-05](https://github.com/Pepgent/soroi/issues/190)：真实 `/runs/{run}/stream?after` 无重漏和 `/stream/lifecycle`；统一 S1 在运行中采集该后置条件的真实证据；不要求在开发期另行 live 验收。
- Depends on: [STO-11](https://github.com/Pepgent/soroi/issues/202)：随真实步骤持久化版本记录、真实 `/functions/calc/usage`、`/versions/{v}`；F29 不得以 fake API 顶替未交付能力。
- 使用 [MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5) 已交付的 native 多方读广播/拒绝能力和 [LIB-01](https://github.com/Pepgent/lab-library/issues/1) 的真实库；关闭状态本身不代替本 campaign 的运行事实。
- Depends on: [full A0 live 验收](https://github.com/Pepgent/soroi/issues/235)：本 campaign 使用同一正式发行的完整 A0 通过记录；本 issue 负责把它实际接入并作为每个流程的门禁，不重开或复制 A0 owner 工作。
- 不在范围：五行 S2 的真实 Lab 页面、草稿 DB、库页面/影响视图、自动化审批和浏览器路径；这些义务仍按 D8 原矩阵保留，不能由本 issue 的 S1 pass 替代。无 parent / sub-issue 新增，不改变现有层级；这里只使用真实 issue 的散文依赖引用。

## 执行与异步状态

独立测试者在本 issue 评论发布 `STARTED` / `PR` / `BLOCKED` / `DONE`，附执行身份、命令、真实后置结果和链接。未取得五行 live pass 与已 push 的 PM 归档前，不发布 DONE 或关闭本 issue。


## 承接来源与原验收义务

下列各项由本统一阶段执行项完整承接；原文为范围快照，不恢复开发期门禁。涉及 hash/digest 的值只用于对象寻址或组装身份，禁止以比对作为任何通过证据。多个承接项覆盖同一来源时，各自执行本阶段适用部分，合计覆盖全部原义务，不相互替代。

### 来源 [soroi#190](https://github.com/Pepgent/soroi/issues/190)

原义务原文：

> 从任意 seq 续订，事件不重不漏
