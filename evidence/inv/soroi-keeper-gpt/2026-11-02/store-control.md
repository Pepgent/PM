# 2026-11-02 store ↔ omp-soroi Human/control 接缝金丝雀

## 结论与证据等级

**本轮在最新 `Pepgent/soroi main` 的真实 checker/executor、控制请求 dispatcher、HTTP store 与 DuckLake 持久化之间，跑通了正式 Human answer 和运行中 Program takeover 两条限定接缝；没有复现 `Human.site` 协议错配。** takeover 的 optional volume 经真实 `BatchWriter`→Parquet→HTTP transfer→formal commit 后，`GET /runs/{run}/progress` 返回 1 条定位到正式 run/step/position 的数据。

**这不是完整产品控制链验收。** 本轮直接调用产品导出的 `checkStep` / `executeStep` / `handleControl` / `formalRecords` / `StoreClient`，没有启动安装版 Main、没有经过 Mux 的 HTTP→WebSocket 中继、没有调用模型、没有真实远端 Agent/native transcript。`writers`、`derive`、`abort` 的根 owner 实现已在 main，但本轮仅核查实现接线，未 runtime 覆盖。不能把它们写成“缺实现”，也不能把本轮写成三者已通过。

**root `soroi-main` prompt 自动注入仍未实现。** 最新 README 明确如此，Main 的入口接线与其一致；不需要以模型全验来重复证实文档已承认的缺口。

### 分类

| 项目 | 最新 main 状态 | 本轮事实 |
|---|---|---|
| 正式 Human slots / answer | 已实现 | **真实限定接缝通过**，record shape 正确标记 `record`，输出与 principal 持久化，run `Ended` |
| Program takeover → Human | 已实现 | **真实限定接缝通过**，原 Program 被中止，保存 replaced 信息、handback、输出与 `call_aborted` 事件 |
| `Human.site` | 当前 Human origin 根本不要求 site | **未复现错配**；Human commit 使用 optional volume，无 volume 的 answer 也成功 |
| batch payload → agent_progress | 生产者 `BatchWriter` 与 store 消费者均存在 | **真实 codec / volume / commit / readback 通过**；不是 remote Agent 完整流水 |
| `writers` / `derive` / `abort` | 已实现根 owner + dispatcher | **未 runtime 覆盖**，不是消费者缺席 |
| root `soroi-main` prompt hook | README 明确未实现 | **待实现**，只读源码结论 |
| 安装版 Main / Mux 线上控制 / 远端 transcript batch | 这次没有组装启动 | **环境/范围边界**，不称已通过 |

本轮没有发现足以据此认定 P1 的“已实现双方可复现协议错配”。父席负责是否结合其他接缝证据立案；本调查员未改产品、未开 issue/PR/提案。

## 1. 来源、版本定位与隔离

- `(U)` 已读工作台 `AGENTS.md` 的 C1-3、C1-4、C5-1 及 `LEDGER.md` 对应 R9/R12/R14/R16 与阶段边界；按 U96 只对已合入 main 的相邻实现跑异步非阻塞探针，不设开工/合入锁，不替代 A0/F01–F31。
- `(C)` 源码来自新克隆：`https://github.com/Pepgent/soroi.git`，branch `main`，克隆目录 `/tmp/gpt-nov02-store-control-1748`。
- 版本定位：`05ae761ef8ff0cb045fd7d0bad1af85e03796713`，提交时间 `2026-11-02T01:47:39+09:00`，subject `config: keep idle council subscribers alive (agentIdleTtlMs 0)`。这里只用于定位，**不是正确性证据**。
- 源码定位链接：[本轮源码快照](https://github.com/Pepgent/soroi/tree/05ae761ef8ff0cb045fd7d0bad1af85e03796713)。以下 `packages/...:line` 均相对于该克隆。
- `(R)` 最终成功窗口：`2026-11-01T17:15:58Z–17:16:02Z`（当地 11 月 2 日），Bun `1.4.4`，store 仅监听 `127.0.0.1` 的临时端口。
- 未修改工程 checkout，未 commit/push，未访问无关前端根 checkout、生产服务、SOPS、本机凭据数据库或其他模型席位资料；没有使用容器，因而没有创建 OrbStack 资源。
- 旧 GPT INDEX §4 仅用作调查索引，所有产品结论均重新从源码/本次 runtime 取回。没有读取 git 历史中的设计。
- 无 `task` 工具；按本工人递归上限指令，将计划写 `/tmp/gpt-nov02-store-control-1748/canary-plan.md` 后执行，没有借 `fork_task` 绕过 mentor 限制。

## 2. 权威边界与真实执行方式

### 产品权威与生命周期

- slot 事实由真实 `WriterControl` / `SlotRegistry` 持有；`handleControl` 是产品 WebSocket relay 最终调用的同一 dispatcher（`endpoint.ts:58-88,113-121`）。
- 执行使用真实 `checkStep`（包括 Lab snapshot/依赖恢复/TS 解析）、`executeStep`（包括真实 node bundle 与 runner 子进程）、`formalRecords`，没有自写协议替代品或 mock store。
- store 是 run/seq/正式 records/`agent_progress` 的权威，通过真实 loopback HTTP 执行 transfer、对象上传、commit、end、graph、stream、progress；服务底层是本次新建的真实 DuckLake 数据目录。
- `EvalSupervisor.register` 在正式评估开始前登记，`EvaluationStore.close` 释放正式 obligation，真实 supervisor 请求 store end；随后 `control.end` 移除 slot overlay。结果由 graph/SSE/重开服务后的持久层确认，而非探针自行标绿。

### 必须保留的非覆盖边界

源克隆没有安装版 `release.json` 与生产部署注入的 central image/config provenance。`executeStep` 需要显式 `ExecutionIdentity`，探针仅在该注入边界使用自己的本地 runtime/source 描述（version 明示 `source-canary-not-installed-release`），**没有把它冒充正式 OCI image 或安装版 release**。内部内容标识仅是产品执行必需输入，没有比较或用其证明行为正确。

因此，已验证结论只覆盖公开模块入口之后的 Human/control/store 边界，不覆盖 `src/index.ts:35-45` 的 Main role/installed-release 启动。没有复制模型凭据，也没有模型调用；这是有意限定的异步 canary，不是假装完成整个产品入口。

## 3. 正式 Human answer：真实请求、结果与持久化

### 输入与调用

Lab node `/tmp/gpt-nov02-store-control-1748/canary-lab/nodes/review.ts` 是完整可运行的 Human 定义：

```ts
import { human } from "omp-soroi/node";
export default human<[number], { score: number; note: string }>(input => `Review measured input ${input}`);
```

正式 code：

```ts
const input = 7;
const { score: score_1, note: note_1 } = review(input);
stop(score_1);
stop(note_1);
```

`handleControl({method:"slots"})` 实际返回的核心内容：

```json
{"ok":true,"value":[{"slot":"eval-answer:0","fn":"review","state":{"kind":"awaiting_human","request":"Review measured input 7","inputs":["input"],"shape":{"kind":"record","fields":{"score":"number","note":"string"}}}}]}
```

上面为摘录，完整 state 的 startedAt/version 在 `runtime/observations.jsonl` 的 `answer-slots`。实际 handback：

```json
{"method":"answer","handback":{"slot":"eval-answer:0","by":"local-canary-operator","fields":{"score":{"kind":"number","value":42},"note":{"kind":"string","value":"Approved measured input 7"}}}}
```

实际响应：

```json
{"ok":true,"value":null}
```

### store 与终态

- `POST /runs/steps` 实际返回 **201**；正式 run `01M6C1RQCARK804F35C9X85J0W`。
- supervisor 释放 obligation 后返回 `Ended{seq:7}`；`GET graph` 记录 root `input=7` 与 Human call，output `score_1=42`、`note_1="Approved measured input 7"`，`state:"Ended"`、`unconsumed:[]`。
- SSE 真实顺序：`run_started → step_committed → call_started → human_handback → atom_stopped(score_1) → atom_stopped(note_1) → run_ended`。
- 结束后 `slots` 返回 `[]`。
- 无 volume 的 Human 提交成功，`GET /progress` 为 `[]`，与这条纯中心 Human 调用吻合。
- 关闭后重开同一 store，DuckLake `calls.origin` 中保存 `kind:"Human"`、`event.principal:"local-canary-operator"`、score/note handback、`replaced:null` 与 accepted 时间。不是只停留在 HTTP 请求或内存 outcome。

原始证据：

- `runtime/http.jsonl`：完整 HTTP method/URL/request/status/response。
- `runtime/observations.jsonl`：控制请求、响应与执行 outcome。
- `runtime/answer-formal-records.json`：产品 `formalRecords` 原样输出。
- `runtime/answer-graph.json`、`runtime/answer-events.sse`、`runtime/answer-progress.json`。
- `runtime/persisted-origins.json:1-39`：重开服务后的 Human principal/handback。

## 4. 运行中 takeover → Human + optional volume batch progress

### 真实运行中的调用

Lab 的 `slow.ts` 是真实 Program：接收 number，等待 30 秒，再返回 input+1；本轮在它真实进入 running slot 后通过 takeover 中断，不等待它正常结束，也没有用 mock Promise 伪装产品 executor。

正式 code：

```ts
const input = 9;
const result = slow(input);
stop(result);
```

真实 `slots` 返回 `eval-takeover:0`，`state.kind:"running"`、`body:"Program"`、`env:"central"`、`inputs:["input"]`。

真实请求/响应：

```json
{"method":"takeover","handback":{"slot":"eval-takeover:0","by":"local-canary-operator","fields":{"value":{"kind":"number","value":99}}}}
```

```json
{"ok":true,"value":null}
```

结果：

- `executeStep` 返回 `kind:"human"`，result 为 **99**，不是 Program 自己的 10；`replaced.fn:"slow"`、原 inputs 与 `transcript:null` 被保存。
- `POST /runs/steps` 返回 **201**，run `01M6C1RT4GZWEBY2HHEYC78D35`，随后真实 supervisor 返回 `Ended{seq:7}`。
- SSE：`run_started → step_committed → call_started → call_aborted → human_handback → atom_stopped(result) → run_ended`。
- graph 为 `Human`、result=99、`unconsumed:[]`；结束后 slots `[]`。
- 重开同一 store 后 `calls.origin` 仍保存 principal、handback=99 与 replaced 事实（`runtime/persisted-origins.json:40-74`）。

### batch 的具体覆盖

探针在真正观察到 takeover slot 后，调用产品 `BatchWriter.write` 写入 1 条 Parquet 行，引用明确命名为 **`canary-observation:eval-takeover:slot-opened`**。它不是伪称原生 transcript entry，也不是 remote agent turn；是可追溯的本次探针 observation。

产品 `BatchWriter` 的实际输出文件为 `runtime/takeover-volume/soroi-batch/000000.parquet`；探针将真实文件字节打成 `runtime/takeover-volume.tar`，通过 `PUT /transfers/{transfer}/volumes/0` 上传，响应 **204**。该 transfer 与 Human formal commit 相同，**没有新增 Human.site 字段**。

store 在同一正式事务中导入，`GET /runs/01M6C1RT4GZWEBY2HHEYC78D35/progress` 实际返回：

```json
[{"run":"01M6C1RT4GZWEBY2HHEYC78D35","step":2,"position":0,"seq":0,"at":"2026-11-01T17:16:01.009Z","kind":"tool_call","transcriptEntry":"canary-observation:eval-takeover:slot-opened"}]
```

这证明真实 producer 的四列 Parquet 与 store 的原生 ingestion/正式定位/read API 咬合，并且 Human optional volume 可承载它。**不证明** `installRemoteBatches` 已从真实 remote native transcript 采集、Mux 拉取与 remote copy-out 全链实际发生；本轮的 tar delivery 是显式探针适配步骤。

原始证据：`runtime/takeover-formal-records.json`、`runtime/takeover-graph.json`、`runtime/takeover-events.sse`、`runtime/takeover-progress.json`、`runtime/takeover-volume.tar`、`runtime/http.jsonl`。

## 5. Human.site 与控制端点最新源码位置

### Human.site 不是当前契约要求

- `packages/store/src/contract.ts:26-29`：SiteSchema 仍用于 Executed 的 placement。
- `contract.ts:41-50`：Human origin 精确为 `{kind:"Human", capture, event}`，**无 site**；Executed 才有 site。
- `packages/omp-soroi/src/eval/commit.ts:60-71`：正式 Human producer 同样只发 capture/event；单输出内部字段 `""` 与 handback 外部 `value` 的转换由产品代码完成。
- `packages/store/src/store.ts:406-411`：Human 检查 event transfer/position 后 `commitVolume(...,"optional")`，不解引用 `origin.site`；有 replaced 时写 `call_aborted`。
- `store.ts:312-327`：选定 volume 的 `soroi-batch/*.parquet` 在正式 step 事务内映射到 run/step/position。
- 本轮无 volume answer 和有 volume takeover 均 201 + durable Ended，是直接行为证据；不是 schema 单体 parse 或编译推断。

### 控制端点状态

| 方法 | 接线位置 | 本轮覆盖 |
|---|---|---|
| slots | `eval/endpoint.ts:66-71,91-98` → `SlotRegistry.list` | runtime；awaiting_human 的 shape 为 `record`，running 以及最终清空均已观察 |
| answer | `endpoint.ts:70` → `slots.ts:99-105` → `execute.ts:398-418` | runtime |
| takeover | `endpoint.ts:71` → `slots.ts:107-113` → `execute.ts:328-349` | runtime，真实 Program runner 被中止并变为 Human |
| writers | `endpoint.ts:72-75` → `src/index.ts:61-62` → `subagent/main/supervisor.ts:396-405` | 已实现，只读核查；未启动真实 worker roster，不宣称 runtime 通过 |
| derive | `endpoint.ts:77-80` → `src/index.ts:73-97` | 已实现，包含 target landing / quiesce / store derive / firstStep / human notification；本轮未执行 |
| abort | `endpoint.ts:82-85` → `src/index.ts:64-70` | 已实现，检查根当前 run 后中止 writer eval 再交 store；本轮未执行 |
| Mux relay registration | `endpoint.ts:100-141` | 已实现；本轮直接 dispatcher，没有经过这一传输段 |

`derive` request 现有必填 `by`（`endpoint.ts:40-41`、`control.ts:15-16`）；不是旧的无 by 契约。这里是源码刷新，不是本轮 derive 成功证据。

### batch 生产者/消费者不是缺席

- `eval/batches.ts:30-45`：从 session message entries 提取 turn/tool_call/file_written。
- `batches.ts:50-77`：真实 BatchWriter 四列 Parquet，临时文件后 rename；本轮直接调用该 producer。
- `batches.ts:84-99`：RemoteChild 的 session_start/turn_end/session_shutdown hook。
- `src/index.ts:111-117,140-143`：RemoteChild mount 与 `installRemoteBatches` 接线已存在。
- `packages/store/src/progress.ts:28-46`：原生 Parquet 列序/类型校验与插入 agent_progress。
- `packages/store/src/server.ts:113-117`、`store.ts:856-865`：progress HTTP 读取与 run/step/position 查询。

旧记忆的“worker batch visibility 缺口”不能整体照抄为当前缺实现；当前应区分已有组件与尚未证明的真实远端生命周期。

## 6. root soroi-main prompt：仍待实现，不跑模型全验

- `packages/omp-soroi/README.md:83-93` 明确区分 agent definitions discovery 与根会话 prompt，原文说 root system-prompt hook `is not implemented yet`，临时入口仍为 `--append-system-prompt`。
- `packages/omp-soroi/src/index.ts:126-131`：Main 安装 `soroiEval` 与 `installMain`；没有读取 soroi-main body 并注入根 prompt。
- `packages/omp-soroi/src/subagent/main/index.ts:6-14`：这里只注册 task 与 shutdown disposal。
- `packages/omp-soroi/agents/soroi-main.md` 的定义文件存在，不等于根 prompt 已自动应用；child launch 的 systemPrompt 也不构成 root hook。

结论为 **待实现**，不是环境故障；本轮未新增、修复或绕过该产品缺口。

## 7. 完整复现命令与输出保留

所有探针文件、安装日志、成功/失败原始日志都保存在 `/tmp/gpt-nov02-store-control-1748`，未加入任何工程提交。

本次实际运行的命令（每条在相应 cwd 下独立执行）：

```sh
# cwd /tmp
git clone --depth 1 --branch main https://github.com/Pepgent/soroi.git /tmp/gpt-nov02-store-control-1748

# cwd /tmp/gpt-nov02-store-control-1748
git log -1 --format='%H%n%cI%n%s'
bun install > install.log 2>&1

# cwd /tmp/gpt-nov02-store-control-1748/canary-lab
bun install > ../lab-install.log 2>&1
# 给完整 Lab Program 声明 @types/bun 后
bun install > ../lab-install-types.log 2>&1

# cwd /tmp/gpt-nov02-store-control-1748
bun control-canary.ts > runtime-console.log 2>&1
# 前两轮探针自身修正后保留输出再完整重跑
mv runtime-console.log runtime-attempt1-console.log && bun control-canary.ts > runtime-console.log 2>&1
mv runtime runtime-attempt2 && mv runtime-console.log runtime-attempt2-console.log && bun control-canary.ts > runtime-console.log 2>&1
# 最后一条退出 0，完整 answer + takeoverWithProgress 均走完

# 关闭后重新打开同一个 store，读 durable origins 和 runs
bun readback.ts > readback-console.log 2>&1
# 修正独立脚本的 zod 导入位置后
mv readback-console.log readback-attempt1-console.log && bun readback.ts > readback-console.log 2>&1
# 最后一条退出 0
```

再次复现时，从已保留的 `control-canary.ts` 与 `readback.ts` 运行即可；前一成功 store 内两条 run 已 Ended，服务均已关闭。若需完全干净窗口，应使用新的 `/tmp` 克隆/日志目录，不覆盖本轮原始证据。

### 探针自身问题，不能记为产品错配

1. 第一次输入把 record destructuring 写成 shorthand `{score,note}`，产品 checker 正确拒绝 `statement_form`；按既有公开语法改为显式 renaming 后完整路径重跑。原始 `runtime-attempt1-console.log`，对应失败行保留在 `runtime-attempt2/observations.jsonl`。
2. 第二次探针把 `Bun.file(file)` 直接放进 `new Bun.Archive` 的 object map，在本机 Bun 中生成了空 Parquet member；原 BatchWriter 实际文件有 921 bytes。store 拒绝 `Invalid soroi-batch Parquet ... too small` 是正确行为。改成将实际文件 `bytes()` 放入 archive 后，全程重跑成功。没有改产品 parser，也没有抑制错误。原始失败 `runtime-attempt2-console.log`、`runtime-attempt2/takeover-volume.tar`、`runtime-attempt2/http.jsonl` 均保留。
3. 独立 `readback.ts` 最初从没有 zod hoist 的 workspace 根 import 裸 `zod` 失败；改为本次真实已安装的 store workspace public entry 文件后，重开 store 与持久层读取成功。原始 `readback-attempt1-console.log`。

### 最终日志索引

| 路径（相对 `/tmp/gpt-nov02-store-control-1748`） | 内容 |
|---|---|
| `control-canary.ts` | 完整有界探针、实际导入公共入口、identity 注入边界说明 |
| `readback.ts` | 独立重开服务后的 durable rows/read API 读取 |
| `canary-lab/nodes/review.ts`, `nodes/slow.ts` | 完整 Human / Program 节点，不是未实现产品测试 |
| `runtime-console.log` | 最后一轮成功的 stdout/stderr，末尾 `complete {answer:true,takeoverWithProgress:true}` |
| `runtime/observations.jsonl` | 完整 slots/request/reply/outcome/commit/end |
| `runtime/http.jsonl` | 完整 HTTP 请求/响应/status；包括 /runs/steps 201、volume 204、graph/progress 200 |
| `runtime/answer-*.json`, `answer-events.sse` | answer formalRecords/graph/progress/events |
| `runtime/takeover-*.json`, `takeover-events.sse`, `takeover-volume.tar` | takeover / batch 正式结果与真实传递载荷 |
| `runtime/persisted-origins.json`, `runtime/reopened-runs.json` | 关闭再重开后保存的 principal、handback、replaced 与 Ended runs |
| `runtime/store/` | 本次新建的 DuckLake catalog/data；不是本机用户凭据或生产数据 |
| `readback-console.log` | durable readback 成功输出 |

## 8. 父席集成建议（事实边界，不新增产品方案）

- 可以把 GPT INDEX §4 的 store/plugin 限定通过范围从旧 Root→stop→Ended 刷新为 **正式 Human answer + Program takeover → Human record/Ended**，并附上以上直接模块入口边界。
- `Human.site` 不能继续作为当前已知错配；本轮无 volume/有 volume 两种当前正式 payload 均成功。
- batch 不能继续笼统写成生产者缺席；可写 **BatchWriter→volume→formal agent_progress 限定通过，真实 RemoteChild transcript/Mux/copy-out 尚未覆盖**。
- root prompt hook 仍是明确待实现；writers/derive/abort 是已有实现但本轮未覆盖，不是缺失消费者。
- 不把本次结果提升成完整 Human Lab 控制 UX、Mux 端点、安装版 Main 或阶段 C 验收通过。
