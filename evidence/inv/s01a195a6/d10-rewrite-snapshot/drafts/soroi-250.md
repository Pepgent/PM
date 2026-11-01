## 统一 e2e 阶段工作项

依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L17-L18)；发行导入接入时点按 [D10-14](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L26)。

开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。

统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。

范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。

本 issue 本身就是 S1 / E2E-13 / F07、F19、F22 的统一执行承接项：[soroi#250](https://github.com/Pepgent/soroi/issues/250)。本项及其 full A0/live 证据不再是任何实现切片的开发前置；开发期完成 driver/spec/runbook 并合入 main，测试者只在统一阶段执行。原结果、checkpoint、真实入口和证据归档义务全部保留。统一阶段 A0 由 [soroi#235](https://github.com/Pepgent/soroi/issues/235) 执行，S1 由各 E2E-* / 本项执行，随后 [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23)，再由 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) 完成 S2。

## 目标

在 S1 `pepgent-soroi-e2e` 的 `central` 中，对同一份正式安装的发行 tar 完成 D8 的 F07、F19、F22 全部真实验收，包括 F22 两部分和独立的两 worker 空未消费集合结束闸门。代码侧来源为 [E2E-13](https://github.com/Pepgent/soroi/issues/221)；本 issue 承接真实场景驱动、原始证据生成和最终验收，不能用固定 oracle 或 reader-only 运行关闭。

## 上下文与原因

- Repo：`Pepgent/soroi`，执行入口为 `e2e/standin/reader.ts` 与 `e2e/s1/f07.spec.ts`、`f19.spec.ts`、`f22.spec.ts`。
- 契约：[D8 全量矩阵](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L126-L141)、[D3 writer/reader/presence](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L59-L69)、[D5 capture、角色与批次](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D5-plugins-eval.md#L78-L88)。
- 开发期交付真实 reader、完整 evidence consumer 与自动驱动代码；统一阶段执行需要 SOR-11/12、MUX-04 与 F07 精确负例 workload。现有 `review(number)` 的固定 prompt 只写文件并交回，不能确定驱动 forbidden-eval 或 pure-text capture；已记录 [owner workload blocker](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552048831)。
- consumer 只消费真实 RPC、native transcript 和 owning-store 快照；没有 producer 或缺少任何阶段时必须非通过，不能靠索引、调用方布尔值或模型措辞补状态。

## 责任与必要决策

- 开发期由 e2e 工程师补齐自动场景驱动并合入 main；统一阶段由独立测试者在真实用户协议上采集并验收，不修改产品行为或以 report worker 替代 capture。
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

## 统一验收前置

- Depends on: [full A0](https://github.com/Pepgent/soroi/issues/235)。
- Depends on: [SOR-08](https://github.com/Pepgent/soroi/issues/204)、[SOR-11](https://github.com/Pepgent/soroi/issues/205)、[SOR-12](https://github.com/Pepgent/soroi/issues/211)：真实提醒、capture、跨进程 worker 与根 obligation registry。
- Depends on: [MUX-03](https://github.com/Pepgent/omp-rpc-mux/issues/3)、[MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5)：reader/presence；reader 已合并不代表 presence 已完成。
- Depends on: [LIB-01](https://github.com/Pepgent/lab-library/issues/1) 及 owner 发布的两个 capture 负例 workload。

## 执行与异步状态

测试者在本 issue / 对应实现 PR 记录 STARTED、BLOCKED、PR、DONE。自动 driver 的实现需要本 issue 对应 PR；若仅运行已有完整 driver，则保留 no-code execution 理由与真实证据。F07/F19/F22 未通过之前保持 open，不以代码侧 issue 的合并关闭代替。


## 承接来源与原验收义务

下列各项由本统一阶段执行项完整承接；原文为范围快照，不恢复开发期门禁。涉及 hash/digest 的值只用于对象寻址或组装身份，禁止以比对作为任何通过证据。多个承接项覆盖同一来源时，各自执行本阶段适用部分，合计覆盖全部原义务，不相互替代。

### 来源 [soroi#196](https://github.com/Pepgent/soroi/issues/196)

原义务原文：

> 子 agent 出现在 `/agents`；停驻和唤醒按 D3-07 开、关代

### 来源 [soroi#205](https://github.com/Pepgent/soroi/issues/205)

原义务原文：

> `review` 完成捕获，并记录 transcript sessionId

### 来源 [soroi#211](https://github.com/Pepgent/soroi/issues/211)

原义务原文：

> worker 能写步；Agent 体没有 eval；同批全部交回后才释放；未释放批次的产出只对产出它的 worker 子树可见，主 agent 的提醒里没有；批次未释放时根 supervisor 不发 `/end`（D5:86-88；D6:33）
