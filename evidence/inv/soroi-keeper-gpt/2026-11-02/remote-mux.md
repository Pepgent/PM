# Nov02 Remote / Mux 接缝金丝雀

## 结论

本轮发现 **Remote Agent 已实现，而且实际可启动最新 Soroi boot 的 Agent 分支，经最新源码构建的 Mux serve/dial 连接真实 omp，完成 RPC get_state、generation 正常退出与 transcript manifest 落盘**。旧“Agent disabled / 未实现”结论不再成立。

**没有在本轮实际覆盖的最新双方公共接口上复现出字段或 CLI 错配。** `dial --root/--expose` 在当前双方中一致并已实际执行；`REMOTE_MUX` 与 `SOROI_MUX_URL` 的名字不同不构成这条 RemoteChild 主路径的缺陷。控制端点的生产注册代码通过真实 omp 扩展 API 接入最新 Mux 后，`POST slots` 返回业务成功，非根 `writers` 请求正确被业务层拒绝。

**没有声称跑通完整 scheduler→copy-in→Remote Agent→copy-out→concludeRemoteJob。** 本轮的完整新远程作业被已登记隔离环境的旧配置阻断；源码本身的实现缺席与环境未刷新严格区分。父席明确要求保留此覆盖边界，不刷新共享环境、不为本轮另起完整 store/backend 栈。

## 1. 源头、版本与隔离

调查只读 `pepgent-soroi/AGENTS.md`、`LEDGER.md`，特别是 C1-3/C1-4/C5-1；没有读取或联系 Opus 席位及其记忆/会话，没有读取无关 Pepgent 前端根 checkout。没有改工程 checkout、commit/push、生产连接、SOPS 解密、agent.db 或模型 secret 复制。

独立目录：

```text
/tmp/gpt-remote-mux-nov02.tbGQFR
```

以下只是**取回版本定位，不是正确性或 hash 验证证据**：

| 仓库 | 新克隆 main 的版本定位 | 提交标题 |
|---|---|---|
| Pepgent/soroi | `05ae761ef8ff0cb045fd7d0bad1af85e03796713` | config: keep idle council subscribers alive (agentIdleTtlMs 0) |
| Pepgent/remote | `a2ee4a8099d732b6317432fd0cf03507cf23dcf2` | Merge pull request #19 from Pepgent/w02-remote-18-template-metadata |
| Pepgent/omp-rpc-mux | `140624344b3e1ddce9883a3dfa509aedecb02b70` | Merge pull request #18 from Pepgent/issue-17-reader-not-ready |

remote 与 Mux **均从以上新克隆源码编译**，不使用已安装旧 `~/.cargo/bin/remote` / `omp-rpc-mux` 冒充当前 main：

```text
remote CLI: /tmp/gpt-remote-mux-nov02.tbGQFR/remote-target/debug/remote
Mux serve/dial: /tmp/gpt-remote-mux-nov02.tbGQFR/mux-target/debug/omp-rpc-mux
```

外部宿主 omp 使用真实已安装 `/Users/mouriya/Library/Application Support/Tern/omp/bin/omp`，`omp --version` 为 **18.15.0**；这是宿主依赖版本，不将其称作本轮 Soroi/Mux 源码产物。Soroi workspace 安装依赖的 pi-coding-agent 包为 18.14.2；实际 agent transcript 的 runtime 为 18.15.0。boot.js 是本轮源码通过真实发行脚本 bundle 的产物。

每个 omp 都使用本目录内新 HOME / PI_CODING_AGENT_DIR；只指定模型名称 `opencode-go/deepseek-v4.1-flash` 让 RPC 启动，不发送任何模型 prompt，不注入模型 secret。模型完成、soroi_return 不在本轮证据范围。

开始前已读：

- `~/Ext/work/orbstack/pepgent-soroi-e2e.md`
- `~/Ext/work/orbstack/pepgent-komodo.md`
- `~/Ext/work/orbstack/pepgent-mux.md`
- 相关 images/sandbox 登记。

执行 `docker ps -a --format '{{.Names}} {{.Status}} {{.Image}}' && orb list`，观察既有 S1 store/mux/central、Komodo/Periphery、registry 与 `pepgent-slurm-test`。本轮**未创建、重启或修改任何容器/VM/网络/卷/Stack**。只从 Mac 读取已登记 S1 的配置和既有 remote run 事实；只启动自己的 native loopback Mux（127.0.0.1:19469）和自己的 omp/boot 子进程。

`plan.md` 保存目标问题、决定性观察、假设与范围。该 worker 无 `task` 工具，依 recursion-cap 规则未派 mentor，没有用 fork_task 绕过。

## 2. 已实现且实测成立：Remote Agent body 与 Mux generation

### 当前源码位置

相对本目录克隆：

- `soroi/packages/omp-soroi/src/subagent/main/remote-agent.ts:82-135`：真实 `startRemoteJob` 构建 library/state/call 输入和 RemoteRuns 请求；env 包含角色、agent/parent、generation/token。
- 同文件 `:142-168`：真实 `concludeRemoteJob` 先等 terminal，再读取 agent manifest，把 transcript/blob 写回中心；generation 自有 transfer/job 由此结束。
- `soroi/packages/omp-soroi/src/eval/boot.ts:46-91`：Agent 分支安装 customization、展开 agentDef、运行 dial、列出 transcript manifest。
- `soroi/packages/omp-soroi/src/subagent/remote-launch.ts:21-34`：使用真实 discoverAgents，首次创建 transcript header，打印 RPC argv。
- `soroi/packages/omp-soroi/src/subagent/launch-argv.ts:25-40`：RPC argv 公共构造。
- `mux/src/main.rs:51-70`：真实 dial CLI 接受 `--root` / 多个 `--expose`，generation/token 等从 env 获取。

### 实际执行路径

`boot-canary.ts` 使用真实 `MuxWriter.start({kind:'remote', start(grant) ...})`：Mux 发放 generation 后启动真实已安装 omp 的 embedded-Bun 模式，运行从最新 main 构建的 `boot.js`。它实际完成 unpack、production dependencies install、plugin link、discoverAgents、RPC argv 构造和 source-built dial。

这是 **本机隔离目录中运行 Remote Agent body 公共 boot 入口**；不是 scheduler 启动的远程作业，`REMOTE_RUN=remote-local-body-canary` 是明确的本地 transport 探针位置标签，不是伪造的 `remote run` 返回值。CallRequest 使用真实生产 schema，fixture agent definition 只给模型名称、无 turn。没有用 fake Mux、fake omp 或 fake RPC ready/response。

实际输出（`boot-canary.log:1-10`）：

```text
serve_start omp-rpc-mux listening on 127.0.0.1:19469
body_started 72184
attached {"generation":"2c292ca7-f77d-4add-a8b2-35c860af5bbb","where":{"kind":"remote","runId":"remote-local-body-canary"}}
event {"type":"advisor_cost_changed"}
get_state <真实 RPC state，完整正文在日志>
generation_end {"kind":"exited","code":0}
body_exit 0
agent_manifest {"files":["gpt-nov02-remote-body.jsonl"]}
serve_exit 143
```

可观察的下游文件：

```text
boot-volume/soroi/agent-files.json
boot-volume/soroi/agent/gpt-nov02-remote-body.jsonl
```

真实 transcript header 的 cwd 为 `.../boot-volume/work`，随后实际落下 model_change / thinking_level_change，runtime 18.15.0；没有用户消息或模型回答。`AgentManifestSchema.parse` 实际消费了 boot 产生的 manifest。

**这证明的是：** 当前 boot Agent 主分支不是 disabled，实际的 release customization 安装/agentDef 展开/dial 参数/generation-ready/RPC/自然 stdin 结束/manifest 生成能衔接。

**不证明的是：** startRemoteJob 的 Store 输入 staging、scheduler/Komodo/Slurm 执行、copy-in/out、模型 turn/soroi_return、wake transcript 回传、完整 concludeRemoteJob 的中心写回。

另有独立本地 caller 正路：`mux-canary.ts` 调用真实 `MuxWriter.start({kind:'local'})`，由生产 `#spawnDial` 启动 source-built dial 和真实 omp，`get_state` 成功，generation exit0，writer close。日志 `mux-canary.log:1-8`。

### 两个曾怀疑的接缝已排除

1. **dial CLI 不匹配：未复现。** boot.ts:79 的 `--root` / `--expose soroi-batch` / `--expose work` 与当前 mux/src/main.rs:65-68 一致，实际 boot path exit0。
2. **REMOTE_MUX / SOROI_MUX_URL：不是上述 RemoteChild 路径错配。** remote/src/backend/mod.rs:15-20,38-47 注入 `REMOTE_MUX`；mux dial 从该变量读取（main.rs:53-54）；boot.ts:78-80 直接继承并用于 dial。本轮没有给 remote body 注入 SOROI_MUX_URL，仍成功。RemoteChild 本身不写 eval，`soroi/.../src/index.ts:111-117,140-143` 只安装 child/remote batches，而 writing-session endpoint 才读 SOROI_MUX_URL。早期仅据变量名差异形成的怀疑已撤回。

## 3. 实测控制端点：实际插件注册代码 → Mux HTTP POST

`endpoint-canary.ts` 使用 source-built Mux serve/dial、生产 MuxWriter 和真实 omp。通过 `-e endpoint-extension.ts` 调用生产 `installEndpoint`，用生产 `mainAccess` 与真实 `WriterControl`，不伪造 slots 响应，也不直接跳过 Mux 调 handleControl。

**精确覆盖边界：** 这是 endpoint 模块的非根 writing-endpoint 组合探针；adapter 仅提供该入口实际使用的 access 函数，不等同完整 Main 插件安装/RootEval 业务流程。没有 root control，未验证 derive/abort，也没有在途 slots。所有已运行注册、解析、路由、控制回复均是生产实现。

源码：

- `soroi/packages/omp-soroi/src/eval/endpoint.ts:107-122`：env→WebSocket 注册→mux_request→handleControl→mux_reply。
- 同文件 `:125-141`：真实 session_start/switch/shutdown hook。
- 同文件 `:35-43,58-86`：method 请求与成功/拒绝业务语义。
- `mux/src/serve.rs:79-91`：endpoint WS/HTTP 路由。
- `mux/src/serve/endpoint.rs:19-23,43-64,91-149`：generation/token 与 request/reply 转发。

`endpoint-canary.log:3-8`：

```text
sessionId 01a1981f-d0c0-7034-9d56-613074beeb7c
endpoint slots 200 {"ok":true,"value":[]}
endpoint writers 200 {"ok":false,"error":"eval:01a1981f-d0c0-7034-9d56-613074beeb7c 不是根会话的端点，没有 writers"}
generation_end {"kind":"exited","code":0}
writer_closed
serve_exit 143
```

Mux HTTP 200 携带非根业务拒绝是生产 handleControl 的真实结果，**不是 HTTP/Mux 失败**。此结果说明本次 root-null probe 没有越权宣称根 writers 成功。

## 4. remote 公共 schema/catalog 与真实 retained terminal 消费

### 公共 request/schema

source-built `remote schema` 实际输出保存在 `remote-schema.json`，顶层为 Recorded/RunRecord/RunRequest/RunStarted/RunStatus/RunSummary/TemplateInfo。

- 当前 `RunRequest` 必需 template/output；mount 可省；env/inputs 有默认。
- inputs/source 为 http_get，output 为 http_put_tar。
- RunStatus 为 queued/running/ended/ended_unstarted，时间字段 snake_case。
- 对应生产 caller `soroi/.../src/eval/remote.ts:7-23,43-45,70-79` 与 `remote/src/model.rs:417-452,507-523,618-623`。

实际调用 **真实 `templateCatalog`、真实 `RemoteRuns.start` 和真实 `RemoteRuns.terminal`**，不是把 JSON 直接塞入 zod 当完整路径。

### 旧 S1 catalog 环境阻断（不归责最新 main 协议）

`REMOTE_HOME=~/Ext/work/orbstack/pepgent-soroi-e2e/remote-home` 使用已登记隔离环境。当前 source-built CLI 和 production plugin caller 的 templates/run 都到达相同实际配置解析错误：

```text
remote: invalid TOML in .../remote-home/config.toml: TOML parse error at line 29, column 1
29 | [templates.infra-slurm-check]
missing field `metadata`
```

日志：`remote-catalog.stderr:1-6`、`remote-canary.log:1-10`。

S1 config 本身仍是旧结构，`config.toml:7-12` 的 Komodo 项也无新 resources/metadata；Slurm 项 `:22-23,37-38` 仍有 docker:// 前缀。**本轮只实际证明首个 metadata 解析错误；没有把未继续执行的其他字段列为已运行失败。** 没改这份共享配置、没创建新作业、没使用旧已安装 remote 规避最新解析。

最新 deploy main 的 TOML 生成不在本 slice 调查范围。父席同轮 deploy canary 已有最新 deploy→最新 remote 的独立证据；不能把未刷新的 S1 服务当作它们的双方实现错配。

`RemoteRuns.start` 发出的真实 JSON 已被 CLI 的 read_request 接受，随后失败于 ops.run 的 config 加载（remote/src/main.rs:68-74,88-106；ops.rs:43-45）。它并没有返回 run id，本报告不虚构新 run 生命周期。

### 最新 consumer 对旧真实 retained terminal 的消费成功

source-built `remote runs` 从原隔离 home 返回真实旧 run：

```text
remote-01m6anvvyt67fp53020zkqyh1q
queued 2026-11-01T04:28:43.877814161Z
running started_at 2026-11-01T04:28:46Z
ended ended_at 2026-11-01T04:28:48Z
removed 2026-11-01T04:28:49.174584668Z
```

`RemoteRuns.terminal` 实际调用最新 CLI status 并消费返回：

```text
terminal_retained_real_run {"kind":"Ended","startedAt":"2026-11-01T04:28:46.000Z","endedAt":"2026-11-01T04:28:48.000Z"}
```

见 `remote-retained-runs.json` 与 `remote-canary.log:11`。没有复制/改写该 record。remote/src/ops.rs:75-82 对已 removed 或已 terminal 的真实事实直接返回，不查 scheduler；因此此项**只是当前 CLI→当前 plugin terminal wire 消费的真实覆盖，不是新作业或现时 backend 状态验证**。没有跑 abort/remove 修改该旧 run。

## 5. Store 边界的分类纠正

只读请求已登记旧 S1 store：

```sh
curl --silent --show-error http://pepgent-soroi-e2e-store.orb.local:3001/releases > store-releases.json
```

返回：

```json
{"kind":"not_found","message":"Route does not exist"}
```

这只说明**共享旧服务没刷新**。当前克隆 `soroi/packages/store/src/server.ts:59-63` 已明确实现 PUT /releases/{version} 与 GET /releases。README:192 的“does not yet expose ... release import”是过期文案，不是源码缺席证据；早先按它形成的猜测已撤回。

父席转交同轮 deploy canary 的真实最新 store 证据（非本 worker 执行）：`/tmp/gpt-nov02-deploy-release-20261102/downstream.log:1-4` 显示 GET /releases 200，boot/runner/customization 对象 GET 均200。该 worker 的 store 按生命周期已停止，未复用/重启，不将其关闭当产品 blocker。

## 6. 完整命令与证据目录

所有以下命令都在所列独立目录中；probe 源文件保留以便父席复现，未进产品仓。源码 refs 是版本定位，不用任何 hash 比对作正确性证据。发行脚本内部已有内容寻址是产品正常路径，不拿其摘要或相等性作为验证结论。

### 取回与构建

```sh
gh auth status
mktemp -d /tmp/gpt-remote-mux-nov02.XXXXXX
# 本次目录 /tmp/gpt-remote-mux-nov02.tbGQFR

git clone --depth 1 --branch main https://github.com/Pepgent/soroi.git soroi
git clone --depth 1 --branch main https://github.com/Pepgent/remote.git remote
git clone --depth 1 --branch main https://github.com/Pepgent/omp-rpc-mux.git mux

git -C soroi log -1 --format='%H %cI %s'
git -C remote log -1 --format='%H %cI %s'
git -C mux log -1 --format='%H %cI %s'

# cwd remote
cargo build --target-dir /tmp/gpt-remote-mux-nov02.tbGQFR/remote-target > /tmp/gpt-remote-mux-nov02.tbGQFR/remote-build.log 2>&1
# cwd mux
cargo build --target-dir /tmp/gpt-remote-mux-nov02.tbGQFR/mux-target > /tmp/gpt-remote-mux-nov02.tbGQFR/mux-build.log 2>&1
# cwd soroi
bun install > /tmp/gpt-remote-mux-nov02.tbGQFR/plugin-install.log 2>&1
python3 scripts/build-release.py --output /tmp/gpt-remote-mux-nov02.tbGQFR/release > /tmp/gpt-remote-mux-nov02.tbGQFR/release-build.log 2>&1
```

两个 cargo build 都实际 exit0，分别约72秒和68秒；bun install exit0。构建只是准备步骤，不拿它们当接缝验证。

### 运行（cwd 独立目录）

```sh
./remote-target/debug/remote schema > remote-schema.json
REMOTE_HOME=/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e/remote-home ./remote-target/debug/remote templates > remote-catalog.json 2> remote-catalog.stderr
REMOTE_HOME=/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e/remote-home ./remote-target/debug/remote runs > remote-retained-runs.json

PATH=/tmp/gpt-remote-mux-nov02.tbGQFR/remote-target/debug:$PATH REMOTE_HOME=/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e/remote-home bun remote-canary.ts > remote-canary.log 2>&1

bun mux-canary.ts > mux-canary.log 2>&1

mkdir -p boot-volume/soroi library/.omp/agents
# 将 release/ 下实际发行 tar 解包至 boot-volume/soroi；名称由 build-release.py 输出。
tar -xf release/soroi-a57e58b7bd8e318fb15ce2b2187641a7fff1a9944a33d5b611e6abae0110c3dc.tar -C boot-volume/soroi
# library/.omp/agents/canary.md 由 write 创建，完整正文在该文件；不含凭据。
mkdir -p boot-env-home
tar -cf boot-volume/soroi/library-omp.tar -C library .omp
bun boot-canary.ts > boot-canary.log 2>&1

mkdir -p endpoint-home
bun endpoint-canary.ts > endpoint-canary.log 2>&1
```

probe 文件：`remote-canary.ts`、`mux-canary.ts`、`boot-canary.ts`、`endpoint-canary.ts`、`endpoint-extension.ts`。脚本内部包含完整 argv、显式隔离 env、20秒/90秒截止条件与 finally 生命周期收束。

运行问题的原始保留：

- `mux-canary-no-model.log`：首次未指定模型时真实 omp 返回“ No default model selected”，不是 Mux 错配。补显式模型名后完整 local 正路 exit0；未获取凭据或调用模型。
- `remote-canary-uninjected.log`：仅在脚本内改 process.env 未传至所运行 CLI，落到默认 ~/.config/remote；最终用启动命令显式 env 注入后，真实命中已登记 home 并得到上述 metadata 错误/retained terminal 成功。此初始 probe 环境问题不归责产品。

最终正路的所有 generation/omp/body 均已有 exit0；每个自有 native Mux 在 finally 结束（serve_exit143 是主动 SIGTERM）。无自有后台服务仍需父席接管，无 OrbStack 资源变动需要清理。

## 7. 交付状态矩阵

| 项目 | 本轮状态 | 准确边界 |
|---|---|---|
| Agent 仍 disabled 的旧断点 | 已被现行实现与 runtime 排除 | 最新 boot 真实 Agent 安装、dial、RPC、manifest 成功 |
| local plugin MuxWriter→最新 serve/dial→真实 omp | 通过 | get_state、generation exit0、writer close |
| Remote Agent boot→最新 Mux/dial→真实 omp | 通过局部真实路径 | 本机 body，不经过 scheduler/copy steps；无模型 turn |
| 生产 installEndpoint→真实 Mux POST | 通过局部真实路径 | 非根、空 slots；非根 writers 正确拒绝；非完整 Main root |
| 最新 remote schema 与 caller 请求解析 | 已实际到 CLI 配置边界 | request 被接受后配置报错，未产生新 run |
| 最新模板 catalog 实际解析 | 环境限制 | 旧 S1 config 缺 metadata；不是最新 deploy 协议错配 |
| 当前 remote terminal consumer | 通过局部真实路径 | 消费原始已 removed 真实 run 的 retained Ended，不是 fresh scheduler |
| startRemoteJob 全部 staging、scheduler、copy-in/out、concludeRemoteJob | 未覆盖 | 不刷新共享旧 store/config、不额外重建完整环境；本轮不称通过 |
| 当前双方字段/CLI 可复现错误 | 未发现 | 已运行的正路成立；不把未覆盖项包装成正确 |
| 本轮产品改动/issue/PR | 无 | 只报告发现与边界，未提案、未改产品 |
