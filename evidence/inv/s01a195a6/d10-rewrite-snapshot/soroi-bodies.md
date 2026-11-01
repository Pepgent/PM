# https://github.com/Pepgent/soroi/issues/259 F26–F30 S1 automatic driver 与完整 live 验收

## 目标 / what

交付并由独立测试者执行 F26–F30 的完整 **S1 automatic driver / live acceptance**：在第一段环境 L 中，经真实发行 installer 安装的 omp、真实模型、Mux、store 和节点库，自动产生五个流程的原始事实，并在 `Pepgent/PM/evidence/e2e/<UTC-campaign>/F26` 至 `F30/` 归档五份通过的 D8 `Verdict`。本 issue 完整承接 [E2E-19 原实现项](https://github.com/Pepgent/soroi/issues/208) 原有的 F26–F30 S1 产品验收义务；原实现项的代码阶段交付、关闭或合并不等于本 issue 通过。

## 必须先读 / 来源

- [D8 决策](https://github.com/Pepgent/PM/issues/8)及 [D8 §3 F26–F30 五行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L145-L149)：本 issue 负责这五行的全部 S1 判据，不接管 S2。
- [D8-02、03、05–09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L73-L80)：A0、同一正式 CI 发行、环境 L、真实模型、节点库与 LabStandIn 驱动路径。
- [D8-11、12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83)和 [§3.1 Verdict](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L153-L178)：只能按权威事实判定，逐断言溯源并进 PM git。
- [D6 HTTP / SSE 契约](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L194-L217)：usage、版本记录、运行事件和独立 lifecycle cursor。
- 仓内 `e2e/standin/lab-standin.ts`（写方、代、dial、RPC 生命周期）、`e2e/standin/evidence.ts`、`e2e/s1/recorded.ts`（Evidence namespace、原始 HTTP/RPC 与观察窗口）以及 E2E-19 交付的 `e2e/s1/f26.spec.ts` 至 `f30.spec.ts`（录制消费者）。
- 范围分阶段依据：leader 已授权 E2E-19 的 source PR 只关闭代码实现项；合并前必须由具名 live issue 接住全部原 S1 结果及 checkpoint，不得以 oracle 或 native reader-only 验证宣称 D8 产品通过。本 issue 是该完整承接项，不是缩减版或再次延期的容器。

## 问题与原因

录制消费者、固定正反 oracle 和真实 native Mux 的读/广播/拒绝传输可以证明验收代码工作，但它们自身不会在已安装 soroi 的 S1 环境中驱动真实模型提交正式步骤、实际执行节点库、变更节点版本或产生 store lifecycle。因此只合入 E2E-19，仍缺少 D8 五个流程的自动产生事实、独立运行和归档闭环；把录制/夹具判定当 live pass 会漏掉这段产品路径。

## 责任与必要决策

- **实现仓库**：`Pepgent/soroi` 的 `e2e/`；**具名责任角色**：本 issue 的独立 S1 测试者，负责 automatic driver、真实执行、五行判定和 PM 证据归档，不由代码作者的 oracle 自证替代。测试者在本 issue 的 `STARTED` 评论登记实际执行身份、发行、工作入口和依赖证据；未登记、未实跑不得关闭。
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
- 归档并 push 到 `Pepgent/PM/evidence/e2e/<UTC-campaign>/F26`…`F30/`，在本 issue 评论附真实 commit/路径链接和逐 checkpoint 结果。本 issue 的代码 PR 只关闭本 issue；一个 PR 不得同时关闭 E2E-19。
- 本 issue 是已经接手的继承验证义务终点，不得把 full A0、automatic driver、实际五行运行或 PM 归档再移给另一个 future issue 后关闭。依赖尚未就绪时保留 open，评论 `BLOCKED` 及具体 owner 后置条件；不能以“已接线/录制可用”关闭。

## 依赖关系与范围边界

- Depends on: [E2E-19 代码阶段](https://github.com/Pepgent/soroi/issues/208)：五个可执行录制消费者、同一 Evidence 采集契约、native transport 和完整固定正反 NONLIVE oracle。该项的合并不是本 issue 的产品通过证据。
- Depends on: [STO-05](https://github.com/Pepgent/soroi/issues/190)：真实 `/runs/{run}/stream?after` 无重漏和 `/stream/lifecycle`；该 runtime 后置条件须有证据后才能执行对应 live 验收。
- Depends on: [STO-11](https://github.com/Pepgent/soroi/issues/202)：随真实步骤持久化版本记录、真实 `/functions/calc/usage`、`/versions/{v}`；F29 不得以 fake API 顶替未交付能力。
- 使用 [MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5) 已交付的 native 多方读广播/拒绝能力和 [LIB-01](https://github.com/Pepgent/lab-library/issues/1) 的真实库；关闭状态本身不代替本 campaign 的运行事实。
- Depends on: [full A0 live 验收](https://github.com/Pepgent/soroi/issues/235)：本 campaign 使用同一正式发行的完整 A0 通过记录；本 issue 负责把它实际接入并作为每个流程的门禁，不重开或复制 A0 owner 工作。
- 不在范围：五行 S2 的真实 Lab 页面、草稿 DB、库页面/影响视图、自动化审批和浏览器路径；这些义务仍按 D8 原矩阵保留，不能由本 issue 的 S1 pass 替代。无 parent / sub-issue 新增，不改变现有层级；这里只使用真实 issue 的散文依赖引用。

## 执行与异步状态

独立测试者在本 issue 评论发布 `STARTED` / `PR` / `BLOCKED` / `DONE`，附执行身份、命令、真实后置结果和链接。未取得五行 live pass 与已 push 的 PM 归档前，不发布 DONE 或关闭本 issue。



# https://github.com/Pepgent/soroi/issues/250 F07/F19/F22 真实 S1 验收与自动驱动

## 目标

在 S1 `pepgent-soroi-e2e` 的 `central` 中，对同一份正式安装的发行 tar 完成 D8 的 F07、F19、F22 全部真实验收，包括 F22 两部分和独立的两 worker 空未消费集合结束闸门。代码侧来源为 [E2E-13](https://github.com/Pepgent/soroi/issues/221)；本 issue 承接真实场景驱动、原始证据生成和最终验收，不能用固定 oracle 或 reader-only 运行关闭。

## 上下文与原因

- Repo：`Pepgent/soroi`，执行入口为 `e2e/standin/reader.ts` 与 `e2e/s1/f07.spec.ts`、`f19.spec.ts`、`f22.spec.ts`。
- 契约：[D8 全量矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L126-L141)、[D3 writer/reader/presence](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L59-L69)、[D5 capture、角色与批次](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L78-L88)。
- 代码侧已获准先交真实 reader 和完整 evidence consumer；当前 SOR-11/12、MUX-04 与 F07 精确负例 workload 尚未全部发布。现有 `review(number)` 的固定 prompt 只写文件并交回，不能确定驱动 forbidden-eval 或 pure-text capture；已记录 [owner workload blocker](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552048831)。
- consumer 只消费真实 RPC、native transcript 和 owning-store 快照；没有 producer 或缺少任何阶段时必须非通过，不能靠索引、调用方布尔值或模型措辞补状态。

## 责任与必要决策

- 独立测试者负责补齐自动场景驱动，在真实用户协议上采集并验收，不修改产品行为或以 report worker 替代 capture。
- library/SOR-11 owner 发布两个真实 Agent-node 负例 workload 及精确调用方式。测试消费公开 workload，不临时修改 `review`、agent 模板或安装隐藏测试 flag。
- 原始事实的拥有者保持不变：Mux 维护连接与代；native omp 维护 transcript/工具流；supervisor 接受 `soroi_return` 并维护批次释放；store 维护已提交图、序列、活动和终态。索引和启动 recipe 不作动态状态。
- 每个交回必须关联成功的 `tool_execution_end` / native ToolResult；仅有 `host_tool_call` 不是已接受。批次释放不能由 store 中已有 worker step 推断。
- 本 issue 继承的真实验证义务不得再次延期；如某产品依赖失败，记录具名 blocker 并保持本 issue open。

## 预期结果

1. F07 的真实 `review` 在本机子代中通过 `soroi_return` 完成 capture；graph 的 Agent body/transcript 对应实际子 session，File 可从对象库读取且内容正确。两个独立负例分别证明 capture 子没有 eval、纯文本不交回使调用失败且整步不提交。
2. F19 的 Alpha/Beta 是真正的 soroi 子进程；IRC 往返及 wait 与实际 sender/recipient/消息身份一致。Alpha 的真实 slow_step 在途时，parent 消息在轮次结束前以 steer 出现，sibling 消息在轮次之后投递，广播进入全部在线目标 transcript。
3. F22 的五个平铺调用先 dry、再原样 formal；活动区间有真实重叠且只提交一个 step。无名 continuation 在下一次实际 eval 中把全部五个输出交给 compare_scores，输入边与 store 一致；该请求的 SOR-08 记录带五个来源，实际工具清单没有 fork/fork_task。
4. F22 的三 worker 一次带 purpose 派发，均 writesEval 且在同一 root run 下以各自 session 写步。N−1 个交回已接受而末个未交回时，主会话实际请求模型，提醒不含这批产出；末个交回后，下一请求一次出现完整产出与 purpose 组头。
5. F22 另起两 worker 小批次，先完成成员停止自己的全部产出，使最后成员交回前 store 未消费集合确为空；最后成员的全 stop 步仍可提交进同一 Open run，释放前没有 run_ended，释放后根 supervisor 才从 `/end` 得到 Ended。

## 验收标准

| # | Dimension | Check | Command / 真实入口 | Env | Expect |
|---|---|---|---|---|---|
| 1 | environment | 全部结果的同发行前置 | 经发行 installer 与 `e2e/pty/a0-install.sh` 的完整 A0 路径，再读取实际 build/发行/镜像身份 | 新 IMG-01 + S1 central | full A0 pass；非 image gate；同 tar；真实安装 omp/mux/library 与 owner 注入的模型凭据 |
| 2 | integration | 结果 1：三组 capture | 自动驱动 writer/RPC 与 child reader，随后 `bun run --cwd e2e f07 --config /absolute/path/to/f07-recorded.json` | S1 L，真实模型 | 正向 review/local generation/成功交回/正确图与 File；forbidden 无执行 start 且 native tools 确无 eval；纯文本 failed CallReport、seq/图不变、无调用节点 |
| 3 | integration | 结果 2：IRC | 自动驱动真实 soroi_task、agent URI write/wait 与在途 slow_step，随后 `bun run --cwd e2e f19 --config /absolute/path/to/f19-recorded.json` | S1 L，真实模型 | Alpha/Beta generation_up；sender/recipient/持久化对应；parent steer/peer queue 的真实轮次边界；全部在线目标收到广播 |
| 4 | integration | 结果 3：五路一步 | 自动脚本先 dry 后 formal，原样代码；下一 prompt 不给 atom 名，随后 `bun run --cwd e2e f22 --config /absolute/path/to/f22-recorded.json` | S1 L，真实 library/model | 五路真实区间交叉且一 step；compare_scores 的五条真实输入边；对应请求的五行来源提醒；native tool dump 无 fork |
| 5 | integration | 结果 4：三 worker 屏障 | 同一 F22 driver：一次 purpose batch，读方确认前两次 accepted return；以公开 parent IRC/wait gate 保留最后成员，前后各触发一次无工具主请求 | S1 L，SOR-08/12 | store 已提交不等于批次释放；前提醒无该批，后提醒完整且 purpose 一次；每步 session 是实际 worker |
| 6 | integration | 结果 5：可证伪结束闸门 | 同一 F22 driver：独立两 worker run；第一个全 stop，最后成员 gate 后全 stop | S1 L，真实 store/supervisor | 释放前 Open+empty 且无 run_ended；最后一步仍在该 run；释放后 root `/end` 返回 Ended |
| 7 | assumption | 原始消费证据完整且没有伪通过 | 归档三份真实 `verdict.json`、writer/reader `rpc.jsonl`、native transcripts/recipe、HTTP/SSE/activity 与复现命令至 `Pepgent/PM/evidence/e2e/<UTC>/F07,F19,F22` | 本次 live campaign | 所有命名阶段均有 owner 原始事实；三份 Verdict 全 pass；缺阶段/trigger、错误身份、提前释放或提前 end 都不能 pass |

固定输入、fake WS server、单独的真实 mux+omp 只读会话和 missing-A0 fail 都不满足表 2–6；类型检查和容器 Running 不承担结果覆盖。hash 只用于身份/对象地址，不作为运行正确性证明。

## 依赖关系

- Depends on: [full A0](https://github.com/Pepgent/soroi/issues/235)。
- Depends on: [SOR-08](https://github.com/Pepgent/soroi/issues/204)、[SOR-11](https://github.com/Pepgent/soroi/issues/205)、[SOR-12](https://github.com/Pepgent/soroi/issues/211)：真实提醒、capture、跨进程 worker 与根 obligation registry。
- Depends on: [MUX-03](https://github.com/Pepgent/omp-rpc-mux/issues/3)、[MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5)：reader/presence；reader 已合并不代表 presence 已完成。
- Depends on: [LIB-01](https://github.com/Pepgent/lab-library/issues/1) 及 owner 发布的两个 capture 负例 workload。

## 执行与异步状态

测试者在本 issue / 对应实现 PR 记录 STARTED、BLOCKED、PR、DONE。自动 driver 的实现需要本 issue 对应 PR；若仅运行已有完整 driver，则保留 no-code execution 理由与真实证据。F07/F19/F22 未通过之前保持 open，不以代码侧 issue 的合并关闭代替。



# https://github.com/Pepgent/soroi/issues/245 完成 F02–F04 的真实 S1 提醒、检查与 dry run 验收

## 目标
在真实 S1 central 经 Mux 驱动已安装 soroi，完成 F02、F03、F04 的 D8 下游验收，归档真实而非 oracle/fixture 的 Verdict。

## 责任与来源
本 issue 继承 https://github.com/Pepgent/soroi/issues/213 的完整 runtime 义务。Leader 已批准实现代码先合入，由同一独立测试者在依赖到位后执行本 issue，不能二次延期。判据来自 https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md 的 F02–F04 行；不改变产品目标。

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

## 依赖关系与当前限制
- 驱动与spec：https://github.com/Pepgent/soroi/issues/213 。代码侧oracle/缺A0拒绝不能关闭本issue。
- 完整A0：https://github.com/Pepgent/soroi/issues/235 ，以及发行/central部署。
- HTTP与根supervisor：https://github.com/Pepgent/soroi/issues/193 、https://github.com/Pepgent/soroi/issues/201 。
- CheckError与执行前检查：https://github.com/Pepgent/soroi/issues/195 。
- 提醒source契约：https://github.com/Pepgent/soroi/issues/204 。
- SSE/activity：https://github.com/Pepgent/soroi/issues/190 、https://github.com/Pepgent/soroi/issues/189 。
- library：https://github.com/Pepgent/lab-library/issues/1 。SOR-04 https://github.com/Pepgent/soroi/issues/185 已交付；完整S1仍须实际消费其效果。

## 范围边界
不补产品功能，不用local in-process store代替中心store，不把oracle手构输入当成真实流程数据。依赖齐备后本测试者继续并发布真实结果。



# https://github.com/Pepgent/soroi/issues/235 完成真实发行的 A0 五类 PTY 安装验收

## 目标

在新建 IMG-01 容器内，从空 HOME 开始，经真实 CI 发行 installer、公开 launcher 与真实 PTY 完成 D8 的 A0 五类探针，归档完整 A0 Verdict。本 issue 完整继承 [E2E-02](https://github.com/Pepgent/soroi/issues/218) 尚未完成的真实 A0 验收义务，不另拆代码阶段与 live 阶段；只有完整 runtime 通过及清理、归档到位才能关闭，不能再次延期。

## 上下文与责任

- 设计来源：[D8 MVP 验收定义](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md)（D8-03、D8-09、E2E-02）。原驱动的 gate-only/shell runtime 不代表完整 A0。
- 独立测试者拥有 `e2e/pty/*`、campaign 配置、真实 A0 执行、凭据消费、证据脱敏与最终清理；本次驱动接线以 `test/235-a0-public-launcher` 为工作入口。不得修改 verifier、产品、settings 或 rules 来迁就测试。
- DIST-01 提供真实发行 installer；[DIST-02](https://github.com/Pepgent/soroi/issues/224) 的 release owner 通过 [verifier PR260](https://github.com/Pepgent/soroi/pull/260) 维护 prepare、observer 和五类判定。gateway 部署方拥有 A0 client token 与配置，测试者仅按既定路径消费。
- 按 [leader 排期与写入权裁决](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553136037)，本 issue 与 DIST-02/PR260 共用一次完整真实 A0，由测试者独占运行写入权；verifier owner 保持 PR260 open，直至取得该次完整证据。目前尚无完整 A0 pass。

## 预期结果

1. 新建无定制的 `pepgent-registry.orb.local:5000/pepgent/omp-agent:latest` 容器，加入已有 `pepgent-soroi-e2e`；在任何 env、models、client token 注入前，记录 `ls -A $HOME` 为空且没有 `.omp`。
2. 仅在空 HOME 门禁通过后，注入与 central 同配置的 models/settings、SOROI 地址和 A0 独占 client token，使用真实 CI release installer，经公开 launcher 启动；不得以 source link、bare omp、fixture 或本地重建安装替代。
3. 在真实 PTY 中逐类验证扩展（含非空 dry-run CallReport）、agent 定义及实际模型/系统提示、skill 正文、rule 注入原文、child `personality:none`；消费 DIST-02 基于 native 事实的判定，而非模型措辞。
4. 将同一 release 的 D8 A0 Verdict、raw PTY、root/child transcript、原始来源及复现命令归档并 push 到 PM；结束本次进程/容器及临时输入，由 Docker 确认本次资源不存在，最终 cleanup assertion 成功后才可得到整体 pass。既有共享网络、store、mux、central 不属于本次清理对象。

## 当前已发布的安装与探针契约

完整 argv、PTY steps 与 proof 字段见 release owner 的[本轮正式契约](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553021595)，逐项消费该契约，不猜测脚本或另造判定。

- 实际发行来自 [CI41270217013](https://github.com/Pepgent/soroi/actions/runs/41270217013)，manifest source `777c75678b8ec73822a3bdbe7c9cdfa87bd64f57`；tar：`/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e/releases/soroi-621607dfe57f576be0e07bad19fbdaf0299d6f7beb024cea9f4de63947597b3a.tar`。发行/source 身份仅定位本轮工件，禁止将 hash 验证作为任何形式的证据。
- 解包后 installer argv：`["bun","install.ts","--home","/home/agent"]`。
- 必需的 `prepare:string[]`：`["bun","/tmp/soroi-a0/release/install-check/prepare.js","--home","/home/agent","--proof","/tmp/soroi-a0/proof","--work","/tmp/soroi-a0/work"]`。
- 公开用户启动入口：`/home/agent/.local/bin/soroi`；`PI_CODING_AGENT_DIR=/home/agent/.omp/agent`。使用正式契约中的完整 `ompArgs` 与 PTY `steps`，不是 bare omp。
- 将已解析的实际 campaign `config.build` 写入 `/tmp/soroi-a0/build.json`；verifier argv：`["bun","/tmp/soroi-a0/release/install-check/verify.js","--home","/home/agent","--proof","/tmp/soroi-a0/proof","--build","/tmp/soroi-a0/build.json"]`。Build 的环境字段由 campaign owner 记录，不从文件名推导。
- 顺序为注入前空 HOME 门禁 → 注入 A0 配置/env/token → real installer → prepare 完成并观察 prepared barrier → 公开 launcher 的真实 PTY → verifier → 证据复制脱敏与全部 driver cleanup → 最终整体结果。
- PTY recipe 先读 `skill://soroi-eval`，真实执行 `install_check_double(21)` 得到 `42` 的非空 dry-run Program/CallReport，再派发具名 `InstallCheckWorker`（`soroi-worker`），等待其真实 `soroi_return` 交回 `install-check-complete`。`soroi-install-check:turn-end` 仅用于 PTY 同步，不作为通过证据。
- prepare 的 `prepared.json` 是实际注册查询等观测的副本，`recipe.json` 仅表示意图；两者不等于五类通过。root/child 原始 transcript 保留在 `proof/sessions/`，native `before_agent_start` observer 的 `soroi-install-check` entry 提供实际 model、settings、tools、agent discovery 和 systemPrompt 等事实。verify 再请求 live 注册根，输出 `proof/verified-registration.json` 和 D8 `proof/verdict.json`；五类 assertion ID 为 `extension`、`agent`、`skill`、`rule`、`settings`，来源定位最终 campaign 内真实记录。缺证或任一类别失败须非零退出。

## 已具备的环境与依赖

- Installer：[DIST-01](https://github.com/Pepgent/soroi/issues/199) 的 [PR239](https://github.com/Pepgent/soroi/pull/239) 已合并；[公开入口及既有 runtime 证据](https://github.com/Pepgent/soroi/issues/235#issuecomment-6552732641)已发布。当前本轮 CI tar 与 prepare 的依据采用上节正式契约。
- S1 网络：[DIST-03](https://github.com/Pepgent/soroi/issues/210) 的 [PR247](https://github.com/Pepgent/soroi/pull/247) 已合并；独立测试者已通过 `docker network inspect pepgent-soroi-e2e` 观察到该网络，既有 store/mux/central 已运行。复用现有资源，不另建一套共享依赖。
- 设置：[CUS-04](https://github.com/Pepgent/soroi/issues/186) 已由 [PR234](https://github.com/Pepgent/soroi/pull/234) 合并。child settings 的判定消费本轮 verifier 的 native 观测，不捏造 personality 字段。
- 五类 verifier：[PR260](https://github.com/Pepgent/soroi/pull/260) 当前仍 open；[owner 记录](https://github.com/Pepgent/soroi/pull/260#issuecomment-6553105958)只证明实际 CI tar 已完成无模型/token 的 installer→prepare smoke，不证明五类 A0。剩余义务是本 issue 与其共用的完整真实运行，而非等待一个尚不存在的 installer CLI。
- Gateway：[ENV-02](https://github.com/Pepgent/PM/issues/10) 的 A0 独占 consumer 已由[部署方交付](https://github.com/Pepgent/soroi/issues/235#issuecomment-6551524999)。消费 `~/Ext/work/orbstack/pepgent-gateway/a0/` 下现有 `token`、`models.yml`、`config.yml`，不读取或公开凭据值作记录。注入语义按[最新版配置契约](https://github.com/Pepgent/soroi/issues/235#issuecomment-6551616541)：`transport: pi-native`、gateway baseUrl、`auth: none`，command-resolved `Authorization` 从 `PEPGENT_GATEWAY_TOKEN` 生成 bearer；这不是关闭 gateway 鉴权。不要采用旧 provider `apiKey` 写法、`--api-key` 或 provider credential env。token 只在门禁后经既定 stdin/env 路径注入，不复用 central token，不复制 provider/broker 凭据，不挂载 host HOME，不进入命令行、镜像、Verdict、transcript 或 copy-out。

## 验收与关闭条件

| Dimension | Check | Command | Env | Expect |
|---|---|---|---|---|
| integration | 完整覆盖上述结果 1–4，不削减继承的 full A0 | `e2e/pty/a0-install.sh /absolute/path/to/a0.json`，配置使用上述正式 tar、installer、prepare、launcher、Build、verifier 与完整 PTY recipe | 新 IMG-01 + 现有 S1 网络与 gateway + A0 独占配置/token + 本轮真实 CI 发行及 DIST-02 | exit0；完整 D8 A0 Verdict pass；五类均有真实原始来源；PM 已 push 原始证据与复现命令；本次资源清理确认且最终 cleanup assertion 成功 |

原驱动的空 HOME gate、installer→prepare smoke、typecheck、构建、文件存在、模型文本、marker 或 root-only `calls:[]` 均不能满足本表。本 issue 在完整 A0 结果到位前保持 open，不以再次拆分或转移义务关闭。若真实运行发现产品、installer 或 verifier 缺陷，由对应 owner 修复并从新 CI 下载发行物，重跑完整相关 A0 路径；不用 fake fallback 或 source install 绕过。

## 范围边界

不实现产品功能、不改变模型凭据拓扑、不改 verifier/产品/settings/rules；测试者仅维护既有驱动接线和执行证据。本次 A0 不表示任何 S1 流程已通过；尤其 F26–F30 的 automatic driver 与完整 live 验收仍由 [独立 live issue](https://github.com/Pepgent/soroi/issues/259) 承担。



# https://github.com/Pepgent/soroi/issues/233 E2E-18 F16–F17 远程 Agent

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L385)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F16、F17（Agent 部分）的 spec

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-18`。
- 解锁：F16、F17。
- 档位 / tier：`low`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-18](https://github.com/Pepgent/soroi/issues/222)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-19](https://github.com/Pepgent/soroi/issues/229)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/232 E2E-17 F15 Slurm 与排队取消

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L384)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F15 的 spec；另验证 Slurm 作业的 `remote tail` 经 central 的 `shared_root` 读到 body 输出，以及排队中取消得到 `EndedUnstarted`（PM#4）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-17`。
- 解锁：F15。
- 档位 / tier：`low`。
- 波次 / wave：`W5`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [REM-01](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-02](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-03](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-17b](https://github.com/Pepgent/soroi/issues/223)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DIST-04](https://github.com/Pepgent/soroi/issues/225)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [ENV-04](https://github.com/Pepgent/PM/issues/12)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/231 E2E-16 F14、F17 Program 与 F18

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L383)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F14、F17（Program 部分）、F18 的 spec

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-16`。
- 解锁：F14、F17、F18。
- 档位 / tier：`low`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-20](https://github.com/Pepgent/soroi/issues/228)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DIST-04](https://github.com/Pepgent/soroi/issues/225)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-07](https://github.com/Pepgent/soroi/issues/194)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/229 SOR-19 RemoteChild Parquet 批次

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L302)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D4-15](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L61)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

`RemoteChild` 写 Parquet 批次：schema 与 `agent_progress` 相同，先写临时名再改名（D4:61）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-19`。
- 解锁：F16。
- 档位 / tier：`low`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

`soroi-batch/` 中只有已改名的文件

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-18](https://github.com/Pepgent/soroi/issues/222)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-10](https://github.com/Pepgent/soroi/issues/200)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/228 SOR-20 远程中止与 dry run 零写入

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L303)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D6-15](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L43)：本切片继承的组件归属与行为契约。
- [D4-21](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L67)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

远程中止：Program 用 `remote abort`，等到终态（`Ended` 或 `EndedUnstarted`）再 `remove`；Agent 按顺序停止。dry run 零写入的回归检查（D6:43；D4:67；PM#4）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-20`。
- 解锁：F04、F17。
- 档位 / tier：`low`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

远程 Agent 中止后，transcript 回到中心。中止一个仍在排队的作业得到 `EndedUnstarted` 的分支由 E2E-17 在 Slurm 上验证

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-14](https://github.com/Pepgent/soroi/issues/216)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-18](https://github.com/Pepgent/soroi/issues/222)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/227 E2E-15 F08 与 F23–F25 介入

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L382)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F08、F23–F25 的 S1 spec

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-15`。
- 解锁：F08、F23–F25。
- 档位 / tier：`low`。
- 波次 / wave：`W3`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-14](https://github.com/Pepgent/soroi/issues/216)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-15](https://github.com/Pepgent/soroi/issues/217)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-16](https://github.com/Pepgent/soroi/issues/207)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-05](https://github.com/Pepgent/omp-rpc-mux/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-06](https://github.com/Pepgent/omp-rpc-mux/issues/6)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/226 E2E-14 F20–F21 PTY 生命周期

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L381)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F20、F21 的 PTY 脚本

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-14`。
- 解锁：F20、F21。
- 档位 / tier：`low`。
- 波次 / wave：`W2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [E2E-02](https://github.com/Pepgent/soroi/issues/218)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [CUS-04](https://github.com/Pepgent/soroi/issues/186)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/224 DIST-02 A0 五类安装探针

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L314)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

A0 探针：PTY 脚本逐类验证五类内容（D8-03）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`DIST-02`。
- 解锁：A0。
- 档位 / tier：`low`。
- 波次 / wave：`W1`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

五类全部通过（EP0）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [CUS-01](https://github.com/Pepgent/soroi/issues/183)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [CUS-02](https://github.com/Pepgent/soroi/issues/198)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [CUS-03](https://github.com/Pepgent/soroi/issues/206)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [CUS-04](https://github.com/Pepgent/soroi/issues/186)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [IMG-01](https://github.com/Pepgent/images/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-02](https://github.com/Pepgent/soroi/issues/218)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/223 SOR-17b 远程 Program dry run

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L300)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D4-21](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L67)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

远程 Program 的 dry run 分流：结果交回 AI，调用返回时 `DELETE /transfers/{t}`，不提交、不写对象（D4:67）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-17b`。
- 解锁：F15。
- 档位 / tier：`low`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

在 Komodo 上跑通一次 dry run：store 的 seq 不变，暂存区文件返回 404

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/222 SOR-18 远程 Agent 启动与交回

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L301)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D4-09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L55)：本切片继承的组件归属与行为契约。
- [D4-10](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L56)：本切片继承的组件归属与行为契约。
- [D4-11](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L57)：本切片继承的组件归属与行为契约。
- [D4-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L58)：本切片继承的组件归属与行为契约。
- [D4-13](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L59)：本切片继承的组件归属与行为契约。
- [D4-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L60)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

远程 Agent：`launchRemote`；拷入两个定制 tar；`boot.js` 的 agent 分支；transcript 拷入拷出；交回（D4:55-60）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-18`。
- 解锁：F16、F17。
- 档位 / tier：`mid`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

远程那一代能连回 Mux，并完成交回

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-11](https://github.com/Pepgent/soroi/issues/205)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/220 E2E-12 F06 与 F09–F13 捕获及读取

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L379)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F06、F09–F13 的 spec

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-12`。
- 解锁：F06、F09–F13。
- 档位 / tier：`low`。
- 波次 / wave：`W1`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-06](https://github.com/Pepgent/soroi/issues/212)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-05](https://github.com/Pepgent/soroi/issues/190)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-06](https://github.com/Pepgent/soroi/issues/189)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-07](https://github.com/Pepgent/soroi/issues/194)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-08](https://github.com/Pepgent/soroi/issues/191)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-11](https://github.com/Pepgent/soroi/issues/202)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/219 E2E-11b F05 原样正式提交

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L378)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F05 的 spec（原样提交 F04 那一步，`review` 作为 Agent 真正运行）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-11b`。
- 解锁：F05。
- 档位 / tier：`low`。
- 波次 / wave：`W2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [E2E-11a](https://github.com/Pepgent/soroi/issues/213)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-11](https://github.com/Pepgent/soroi/issues/205)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/217 SOR-15 派生运行与 IRC 通知

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L297)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D6-16](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L44)：本切片继承的组件归属与行为契约。
- [D5-16](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L91)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

派生：`InFlight` 先落成 `Committed`，再请求 store，再执行 R' 的第一步；用 IRC 通知 AI（D6:44；D5:91）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-15`。
- 解锁：F24。
- 档位 / tier：`mid`。
- 波次 / wave：`W3`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

F24 的两种变体都成立

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-09](https://github.com/Pepgent/soroi/issues/192)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/216 SOR-14 本机中止路径

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L296)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D6-15](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L43)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

本机的中止路径：结束 Program 的 runner，中止 Agent 当前这一轮（D6:43）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-14`。
- 解锁：F17、F23。
- 档位 / tier：`low`。
- 波次 / wave：`W3`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

runner 进程消失；子 agent 仍可唤醒

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/215 SOR-07 不可变环境身份

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L289)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D4-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L64)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

环境身份：中心取部署注入值；远程取 `remote templates.identity`（D4:64）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-07`。
- 解锁：F11、F14、F15。
- 档位 / tier：`low`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

同一调用先正式运行一次；然后把模板换到一个已确认 digest 不同的镜像（或改动计入 `config` 身份的模板配置）。先断言 `remote templates` 返回的 `identity` 前后不同，再以相同输入正式运行同一调用：第二次在 stream 中是 `call_started`/`call_ended` 而不是 `call_adopted`，graph 状态不是 `Adopted`，`/compare` 中这一对不是 `SameCapture`

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-06](https://github.com/Pepgent/soroi/issues/212)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-05](https://github.com/Pepgent/remote/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/214 SOR-17a 远程 Program 正式运行

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L299)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D4-05](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L51)：本切片继承的组件归属与行为契约。
- [D4-06](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L52)：本切片继承的组件归属与行为契约。
- [D4-07](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L53)：本切片继承的组件归属与行为契约。
- [D4-08](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D4-remote-exec.md#L54)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

远程 Program 的正式运行路径：暂存区、`call.json`、`RunRequest`、`remote` CLI 客户端、等到终态、取回结果、随步提交、`remove`；`boot.js` 的 program 分支（D4:51-54）。终态有两种：`Ended`（拷出已送达）与 `EndedUnstarted{ended_at}`（排队后被取消、从未开始，leader 技术裁决 PM#4）；后者没有拷出，这次调用记为失败，不读暂存区

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-17a`。
- 解锁：F14、F15、F18。
- 档位 / tier：`mid`。
- 波次 / wave：`W4`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

在 Komodo 上跑通一次 formal：结果随步提交，Stack 与卷已删除。`EndedUnstarted` 分支在 Slurm 上由 E2E-17 验证（排队中取消，中间件不读暂存区，`remove` 在终态之后成功）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-06](https://github.com/Pepgent/soroi/issues/212)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-04](https://github.com/Pepgent/soroi/issues/188)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-05](https://github.com/Pepgent/remote/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-07](https://github.com/Pepgent/remote/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/211 SOR-12 角色闸门与 worker 批次释放

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L294)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D5-06](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L81)：本切片继承的组件归属与行为契约。
- [D5-07](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L82)：本切片继承的组件归属与行为契约。
- [D5-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L87)：本切片继承的组件归属与行为契约。
- [D5-11](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L86)：本切片继承的组件归属与行为契约。
- [D5-13](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L88)：本切片继承的组件归属与行为契约。
- [D6-05](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L33)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

角色闸门、`writesEval`、嵌套的 `soroi_task`、批次与 `purpose`、批次释放（D5:81-82、87）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-12`。
- 解锁：F19、F22。
- 档位 / tier：`mid`。
- 波次 / wave：`W2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

worker 能写步；Agent 体没有 eval；同批全部交回后才释放；未释放批次的产出只对产出它的 worker 子树可见，主 agent 的提醒里没有；批次未释放时根 supervisor 不发 `/end`（D5:86-88；D6:33）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-03](https://github.com/Pepgent/soroi/issues/201)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-08](https://github.com/Pepgent/soroi/issues/204)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/209 SOR-13 eval 控制端点与 human 构造器

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L295)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L69)：本切片继承的组件归属与行为契约。
- [D5-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L89)：本切片继承的组件归属与行为契约。
- [D3-19](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L73)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

每个 `writesEval` 为真的会话注册控制端点 `eval:<session>`，提供 `slots(runId)`、`answer`、`takeover`；只有根会话的端点另答 `writers(runId)`（D5:89、301-311；D3:73）。整个运行的 `abort` 发到根端点（D7-09）。`human()` 构造器

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-13`。
- 解锁：F08、F23。
- 档位 / tier：`mid`。
- 波次 / wave：`W3`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

经 Mux 能读到槽位，`answer` 能结束槽位

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-02](https://github.com/Pepgent/soroi/issues/193)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-11](https://github.com/Pepgent/soroi/issues/205)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-06](https://github.com/Pepgent/omp-rpc-mux/issues/6)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/207 SOR-16 人类 IRC 待投递协议

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L298)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D3-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L66)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

监管者实现人类 IRC 写方契约：待投递表、`edit`、`withdraw`，在空闲或步边界 `deliver`（D3:66）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-16`。
- 解锁：F25。
- 档位 / tier：`low`。
- 波次 / wave：`W2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

编辑后的消息被投递，撤回的不投递

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-05](https://github.com/Pepgent/omp-rpc-mux/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/205 SOR-11 spawnCapture 与 host call 转发

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L293)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D5-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L78)：本切片继承的组件归属与行为契约。
- [D5-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L93)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

`spawnCapture`：删除 `runSubprocess`；`LocalChild` 的 host call 转发（D5:78、93）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-11`。
- 解锁：F07。
- 档位 / tier：`mid`。
- 波次 / wave：`W2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

`review` 完成捕获，并记录 transcript sessionId

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-10](https://github.com/Pepgent/soroi/issues/197)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/203 STO-12 store 镜像与发行导入

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L277)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D6-22](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L50)：本切片继承的组件归属与行为契约。
- [D2-04](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L41)：本切片继承的组件归属与行为契约。

## 目标 / what

store 镜像与 compose 服务；发行导入 `PUT /releases/{version}`（正文是 artifact 字节，带声明的 sha256）：同一事务校验哈希，把 boot、runner、定制 tar 各自按内容哈希放入对象目录，写 `ReleaseRecord`；`GET /releases`（D6:50、155-158）。init 在 store 就绪后调用一次。`boot.js` 的 program、agent 分支分别随 SOR-17a、SOR-18 进入发行物，届时由 DIST-01 重新产出

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`STO-12`。
- 解锁：全部。
- 档位 / tier：`low`。
- 波次 / wave：`VS1`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

冷启动后 init 返回 `ReleaseRecord`；`GET /releases` 有这条记录，它引用的 boot、runner、定制 tar 都能 `GET /objects/<哈希>`；哈希不符时不写任何记录

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [STO-01](https://github.com/Pepgent/soroi/issues/180)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/196 SOR-09 subagent 经 Mux 启停

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L291)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D3-07](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L61)：本切片继承的组件归属与行为契约。
- [D3-09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L63)：本切片继承的组件归属与行为契约。
- [D2-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L39)：本切片继承的组件归属与行为契约。
- [D2-03](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L40)：本切片继承的组件归属与行为契约。

## 目标 / what

subagent 改走 Mux：`MuxWriter`、`Generation`、`ProcessRef`；本机子进程用 dial 启动（D3:63）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`SOR-09`。
- 解锁：F07、F19–F21。
- 档位 / tier：`mid`。
- 波次 / wave：`W2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

子 agent 出现在 `/agents`；停驻和唤醒按 D3-07 开、关代

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [SOR-01](https://github.com/Pepgent/soroi/issues/178)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-02](https://github.com/Pepgent/omp-rpc-mux/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/190 STO-05 运行与生命周期 SSE

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L270)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D6-06](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L34)：本切片继承的组件归属与行为契约。
- [D6-09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L37)：本切片继承的组件归属与行为契约。
- [D2-04](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L41)：本切片继承的组件归属与行为契约。

## 目标 / what

SSE：`/runs/{run}/stream?after`、`/stream/lifecycle?after`（D6:34、37）

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`STO-05`。
- 解锁：F10、F26、F30。
- 档位 / tier：`low`。
- 波次 / wave：`VS2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

从任意 seq 续订，事件不重不漏

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [STO-02](https://github.com/Pepgent/soroi/issues/180)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/soroi/issues/182 在真实 S1 环境验收 F01 根 atom 与 stop 全链路

## 目标
在真实 S1 环境运行已交付的 `e2e/s1/f01.spec.ts`，取得 F01 的真实下游判定与 PM 归档，不用夹具结果代替。

## 上下文与问题
F01 由 D8 §3 验收矩阵定义：https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md 。LabStandIn 核心由 https://github.com/Pepgent/soroi/issues/181 交付；该任务只证明真实 mux 与夹具的驱动和证据路径，fixture 的 Verdict 为 fail，不能证明正式 soroi F01。

## 责任与必要决策
独立测试者负责驱动和权威证据，不改产品。Leader 于本轮派工确认 E2E-01 可以先交付，E2E-10 真实运行独立跟踪；依赖齐备后由同一测试者执行。store 持有运行事实，根 supervisor 发 end，测试者只观察。

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

## 依赖关系
- STO-01..03：https://github.com/Pepgent/soroi/issues/180 交付中心 HTTP store。
- SOR-02/03：产品插件 HTTP store 客户端与根 supervisor 显式 end。
- STO-05：真实 store SSE（不在 #180 范围内）。
- DIST-01/A0：发行 tar 安装与相同 release 的安装探针证据。
以上是已定产品能力，不是待讨论的设计结论；各切片实际 issue 创建后补链接。本任务由当前独立测试者继承，不能二次延期验证。



