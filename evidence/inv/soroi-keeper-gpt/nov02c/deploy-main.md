# Deploy → selected Soroi release → Main RPC → Mux 接缝金丝雀

窗口：2026-11-02 00:17–00:25Z。调查员：SoroiKeeperGpt-2.DeployMainCanaryNov02c。只读工程仓；没有产品改动、PR/issue、Stack refresh/restart、SOPS、生产访问、个人凭据补入或模型 turn。

## 结论

**本窗口实际选定发行的启动接缝通过；D28 所指的 D13 两项中心身份不再缺注入。** 不是把合成值喂给 parser，也不是只跑 `--version`：

1. 从隔离 Core 当前 Stack → 普通 Variables → 当前 lab-web 容器读到了实际生产方的镜像引用与两项环境身份；当前源代码明确由 deploy 的生产函数在 RunSync/DeployStack 前发布。
2. 对该容器实际只读挂载的 `/release/soroi.tar`，运行它自己的 `install.ts --home <独立 /tmp HOME> --artifact /release/soroi.tar`，安装退出 0。使用该安装结果的公开 `HOME/.local/bin/soroi --mode rpc`，收到 `ready`、`get_state success:true`，实际注册/公开 `soroi_eval`、`soroi_task`，没有模型消息；最终 EOF 退出 0。
3. 同一公开安装入口再经实际部署里的 dial → 实际 Mux serve 启动。既定 owner 已注入的 trusted-reader bearer 只用于探针后端连接，值不输出、不写文件、不传给 dial/omp 子进程。受信 reader 的 `get_state` 得到真实 omp 回复；受信人工帧到 writer，未投递给模型。`mux_close_stdin` → `mux_exited code:0` → dial 退出 0，finally 关 reader/writer。

**分层结论：这是“当前已选发行 + 已部署运行产物的局部 runtime 通过”，不是“最新 soroi main 的全量发行已部署”，也不是 Lab 用户流程/A0/F01 全验。** 实际 tar 的 manifest version 仍为 `852551823e5f6a109cbf042b3da828e4cc2b74df`，本窗口新取 soroi main 为 `5f31e702cef6775e2033c0bd6475c2ba6d17a053`。前者是旧于当前 main 的已发布产物；不能用本轮成功认证后者的全部新功能。Mux 容器声明仍显示 `latest`，未发现 source revision label；本报告不把 tag 当版本证明，只报告实际那对运行 serve/dial 在本路径中的表现。

## 基准、源码定位与范围

已读当前 AGENTS、LEDGER U91–U97 和 GPT 席位角色。只读以下指定源头，未读/联系 Opus 会话、记忆、报告或票：

- [D13 / PM#18](https://github.com/Pepgent/PM/issues/18?comments=0)：D13-01 必填身份消费与 D13-02 生产方/配置投影。
- [D14 / PM#20](https://github.com/Pepgent/PM/issues/20)：安装器 `--artifact` 和安装目录 `release.json`。
- [D28 / PM#47](https://github.com/Pepgent/PM/issues/47?comments=0)：只取决策正文；D28-01 撤回不撤销 D13 实施义务，不把 CLOSED 当 runtime。

新取 main 的隔离克隆：

| 仓库 | clone 路径 | source revision（仅定位，不作验证） |
|---|---|---|
| Pepgent/deploy | `/tmp/gpt-nov02c-deploy-main/deploy` | `9e2d09cee0ac94e3ca49b8b9a7064e8edf66afd3` |
| Pepgent/soroi | `/tmp/gpt-nov02c-deploy-main/soroi` | `5f31e702cef6775e2033c0bd6475c2ba6d17a053` |
| Pepgent/omp-rpc-mux | `/tmp/gpt-nov02c-deploy-main/mux` | `9829496ac20320940b4f3626b54fa0bb332f5b39` |

没有重算/比对任何 hash，也没有把 hash 验证作为证据。下述 digest/tar 文件名只作为已有接口字段与运行对象定位原样记录。

### 当前生产方与消费方（C/D）

- `deploy/scripts/central.py:245-268`：从 registry HEAD 的 `Docker-Content-Digest` 生产镜像引用；不是插件自查 tag。
- `:271-330`：渲染选定 Compose，只取入口 argv、command 与三个既定文件，生产中心 config 身份。**本轮只读此实现，不调用它重算配置。**
- `:333-336`：发布 `PEPGENT_CENTRAL_LAB_WEB_IMAGE`、`PEPGENT_CENTRAL_IMAGE_DIGEST`、`PEPGENT_CENTRAL_CONFIG_DIGEST`。
- `:409-450`，特别 `:429-430`：publish 在 RunSync 和最终 DeployStack 之前。
- `komodo/syncs/central.toml:24-42`：镜像、release、两项身份与独立 trusted-reader secret Variable 的引用。
- `stacks/pepgent-central/compose.yaml:80-106`：lab-web 的入口、两项 `SOROI_CENTRAL_*`、store/Mux 与 trusted-reader 注入；`:119-133` 选定 release 与非secret models/config 的只读挂载。
- `lab-entrypoint.sh:6-8,13-24`：复制消费方的 models/config，解包同一个 artifact 并带 `--artifact` 安装，公开 launcher 入 PATH，不遮蔽 omp、不加启动 prompt。
- `soroi/scripts/install.ts:93-123`：安装、记录 release.json、plugin link、生成 public launcher。
- `soroi/packages/omp-soroi/src/index.ts:35-45,127-134`：模块加载确定 Main，读取一次 store/执行身份，安装 eval 与 main 工具。
- `src/eval/identity.ts:63-87`：Main 的两项中心身份来自 env，发行身份来自安装目录 release.json；插件不代替生产方推导。
- `mux/README.md:24-28`：独立 trusted-reader bearer 的注入范围与不下传 omp 的边界。
- `mux/design/mux.md:46-50,115-130`：writer 原始 ready 不等于 reader source-ready；reader 等非空 welcome generation 或 generation_started。

## 实际 Core/容器输入（R）

权威源是运行 Core 与 Docker，不是资源台账。先读了 `~/Ext/work/orbstack/`，运行 `docker ps -a` / `orb list`；复用既有隔离 lab-web 的独立进程，没有创建容器、网络、卷或 VM。没有改台账所管资源。

Core：`http://127.0.0.1:59120`，`GetVersion` → `2.3.4`。

`GetStack(pepgent-central)`：

```json
{"repo":"","branch":"main","file_paths":["compose.yaml"],"files_on_host":true,"run_directory":"/Users/mouriya/Ext/work/orbstack/pepgent-deploy-sync/stacks/pepgent-central"}
```

这是已授权的隔离 files-on-host 部署，不推断为生产 GitProvider 接入已完成。

实际引用：

```text
LAB_WEB_IMAGE=[[PEPGENT_CENTRAL_LAB_WEB_IMAGE]]
SOROI_RELEASE_TAR=[[PEPGENT_CENTRAL_RELEASE_TAR]]
SOROI_CENTRAL_IMAGE_DIGEST=[[PEPGENT_CENTRAL_IMAGE_DIGEST]]
SOROI_CENTRAL_CONFIG_DIGEST=[[PEPGENT_CENTRAL_CONFIG_DIGEST]]
```

实际非secret Variables / 容器输入：

```text
PEPGENT_CENTRAL_LAB_WEB_IMAGE=pepgent-registry.orb.local:5000/pepgent/lab-web@sha256:9c7d4834da5f691edd22c271096631f6707c2877a538f3bb3b7f27536ba05edd
SOROI_CENTRAL_IMAGE_DIGEST=sha256:9c7d4834da5f691edd22c271096631f6707c2877a538f3bb3b7f27536ba05edd
SOROI_CENTRAL_CONFIG_DIGEST=sha256:27b3f52c920f3fd364a9b0ca3b0654d24626de80392f2c643850b21adf83e418
SOROI_STORE_URL=http://pepgent-central-store.orb.local:3001
SOROI_MUX_URL=ws://pepgent-central-mux.orb.local:8080
```

lab-web created `2026-11-02T00:17:24.876241791Z`，started `00:17:30.175949233Z`，实际 Config.Image 为上面的 digest 引用。探针未触发该次重建，也没有改变它。

实际 release bind：

```text
/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e/releases/soroi-a1f534dbff43cd7a36f1578e8ba63f93493435cd049244fea84ea40d7ced879f.tar
  → /release/soroi.tar (rw=false)
```

台账索引该 tar 来自官方 [Soroi Release run 41364008282](https://github.com/Pepgent/soroi/actions/runs/41364008282)；本轮独立读取实际 tar manifest 确认其声明 version 与 customization/runner/boot 三个组件。**没有据此声称做了字节完整性认证。**

实际另两份挂载：

```text
~/Ext/work/orbstack/pepgent-gateway/lab-web/models.yml → /run/config/models.yml (ro)
~/Ext/work/orbstack/pepgent-gateway/lab-web/config.yml → /run/config/config.yml (ro)
```

两文件只含网关 URL、环境引用与模型选择，无凭据字面值。config 默认模型序列为 opencode-go/deepseek-v4.1-flash、openai-codex/gpt-6-luna、anthropic/claude-haiku-5-5。models 的 Authorization 是 `$PEPGENT_GATEWAY_TOKEN` 命令引用；本轮沿用既有消费者 env，不打印它、不从个人 HOME 复制凭据。

trusted-reader：Core 对应 Variable `is_secret:true`；lab-web 与 Mux 当前 env 均存在该字段。容器 inspect 与 Core ListVariables 响应只在探针进程内投影；日志仅保存指定非secret字段和存在性，未落盘完整响应。token 未输出、未写入脚本或报告、未复制凭据文件。

Mux 容器 started `2026-11-01T23:50:47.876559221Z`；入口 `/omp-rpc-mux serve --listen 0.0.0.0:8080`，无数据卷。只使用实际 deployed Mux URL，不启动第二套。

## 公共入口实际执行与结果

探针源码/日志保留在 `/tmp/gpt-nov02c-deploy-main/`：`inspect.py`、`main-probe.ts`、`mux-probe.ts`、`closure.ts`。实际独立容器内目录 `/tmp/gpt-nov02c-deploy-main-6BcHyI`：空 HOME 经所选 tar 安装，独立 cwd `work`、独立 `sessions` 和 `mux-sessions`。不挂/复制共享 agent.db、会话 HOME 或凭据文件。

### 1. 安装

真实 argv（初轮日志 `main-probe.log:1-3`）：

```text
tar -xf /release/soroi.tar -C /tmp/gpt-nov02c-deploy-main-6BcHyI/release
bun /tmp/gpt-nov02c-deploy-main-6BcHyI/release/install.ts --home /tmp/gpt-nov02c-deploy-main-6BcHyI/home --artifact /release/soroi.tar
```

退出均 0；安装输出 `118 packages installed`、`Linked omp-soroi`，返回 public command 和 settings。它自己的 hash 步骤只是既有安装器内部行为，不作为本报告验证证据。真正接缝证据是后续插件加载与 RPC/工具结果。

### 2. 不经 Mux 的 Main 公共启动

最终日志 `main-final.log`；真实 argv：

```text
/tmp/gpt-nov02c-deploy-main-6BcHyI/home/.local/bin/soroi --mode rpc --session-dir /tmp/gpt-nov02c-deploy-main-6BcHyI/sessions -e /tmp/gpt-nov02c-deploy-main-6BcHyI/observe.ts
```

`observe.ts` 只在 session_start 打印 `pi.getAllTools().map(t => t.name)`，不替换产品工具/业务、不改 prompt。主结论也由公开 get_state 的 dumpTools 独立可见，不依赖观察扩展伪造结果。

```json
{"type":"ready","protocolVersion":1,"supportedProtocolVersions":[1,2],"maxFrameBytes":1048576,"maxReassembledFrameBytes":67108864}
{"id":"canary-state","type":"get_state"}
```

真实 response 投影：

```json
{"id":"canary-state","success":true,"sessionId":"01a199a5-1111-7364-b35f-c89cb0decf30","sessionFile":"/tmp/gpt-nov02c-deploy-main-6BcHyI/sessions/2026-11-02T00-24-54-289Z_01a199a5-1111-7364-b35f-c89cb0decf30.jsonl","messageCount":0,"tools":["read","bash","edit","eval","glob","grep","task","wait","todo","web_search","write","soroi_eval","soroi_task"],"isStreaming":false}
```

`RPC_RESULT {"state":true,"code":0}`，`FINAL_CHILD_EXIT 0`。实际全工具 registry 同样包含 `soroi_eval` 与 `soroi_task`。没有 prompt 请求、模型 turn、eval 调用或 store 捕获。

### 3. 同一 installed Main 经 Mux + trusted-reader

最终日志 `mux-source-ready.log`，实际 dial argv：

```text
omp-rpc-mux dial -- /tmp/gpt-nov02c-deploy-main-6BcHyI/home/.local/bin/soroi --mode rpc --session-dir /tmp/gpt-nov02c-deploy-main-6BcHyI/mux-sessions -e /tmp/gpt-nov02c-deploy-main-6BcHyI/observe.ts
```

writer URL `ws://pepgent-central-mux.orb.local:8080/agents/GptNov02cDeployMain-ecdad0d4-7483-464c-a842-afd4b280a6f0/writer`，基础 bearer 来自当前 lab-web 既有 env。

`mux_open_generation` 得到 generation `3e6e6323-dbf4-4006-bdd9-94193def1528`；本代 token 只进子进程 env，不日志。dial env 真实投影 `trustedReaderInChildEnv:false`。

reader URL 同 id 的 `/reader`，使用当前后端 env 的独立 trusted-reader bearer。先收到 `mux_welcome generation:null`，等待真实 `mux_generation_started` 后发送 `get_state`。

实际成功结果：

```json
{"id":"r625ff0d8467f4e28ae468d367a8615ea:trusted-state","success":true,"sessionId":"01a199a4-1edb-7202-846a-9fb4b47c13f6","sessionFile":"/tmp/gpt-nov02c-deploy-main-6BcHyI/mux-sessions/2026-11-02T00-23-52-283Z_01a199a4-1edb-7202-846a-9fb4b47c13f6.jsonl","messageCount":0,"tools":["read","bash","edit","eval","glob","grep","task","wait","todo","web_search","write","soroi_eval","soroi_task"],"isStreaming":false}
```

人工帧仅做 Mux 角色运输边界：

```json
{"type":"mux_human_irc","principal":"canary-transport-only","msg":"gpt-nov02c-no-delivery","body":"transport boundary only; writer does not forward to omp"}
```

writer 实收同一字段/正文。这里的 principal 是明确的 transport-only 探针串，不是用户认证身份；**不声称测试了 Lab 身份校验、待投递业务或模型接收**。

结束：`mux_close_stdin` → `mux_exited {generation:...,code:0}`，`DIAL_RESULT code:0`，`MUX_FINALLY {childExit:0,closed:true}`。此结果同时证明本次实际运行的 serve/dial 对在该路径兼容；不推断其他协议分支或 tag 对应最新源代码。

## 原失败原样保留及归因

本窗口没有为怀疑历史失败而重跑旧路径。以下是新探针自身真实经历，均保留原日志：

1. `main-probe.log:5-15`：首次空 HOME 安装成功，但未复制真实入口的非secret models/config，启动失败 `No default model selected`、exit1。**分类：探针准备遗漏，不是 D13/安装器失败，不补个人凭据。** 随后按真实 `lab-entrypoint.sh:6-8` 复制这两份 owner 声明，完整重走公开 Main 启动。
2. `main-owner-config.log:9-14`：`get_state success:true`，但探针误发并不存在的 `get_commands`，得到 `Unknown command: get_commands`，探针等待两条成功直到45秒期限，结束码143。**分类：探针使用错 RPC，不是插件未加载。** 改为 get_state 自身的 dumpTools + registry 观察，最终公开入口正常 EOF exit0。
3. `mux-probe.log:1-6`：原始 ready 后 reader 的 welcome generation 仍 null，探针过早发 read；未得到预期回复，到45秒期限。**分类：探针未遵守当前明确 source-ready 边界，不归因产品缺陷。** 依 `design/mux.md:50` 等 generation_started 后完整重走，成功如上。

未覆盖的历史 [deploy#26](https://github.com/Pepgent/deploy/issues/26) lifecycle404 与 [deploy#28](https://github.com/Pepgent/deploy/issues/28) Slurm image 解析错误不被本报告覆盖或清零。本轮只核发行/身份/Main/Mux启动接缝；不借这里成功否认相邻远程路径失败。

## Root prompt hook：只查源头

当前 main 与所选 release 的 `src/index.ts:129-134` Main 安装路径是 soroiEval + installMain；`src/subagent/main/index.ts:6-13` 安装 soroi_task 与 shutdown；本轮没有找到在该入口把 `agents/soroi-main.md` 正文主动追加为默认 root system prompt 的 hook。

所选发行确实包含 `packages/omp-soroi/agents/soroi-main.md:1-47`，它作为可发现 agent definition 存在，不等于未带 `--agent soroi-main` 的 root 已加载其正文。发行 `.omp/settings/soroi.yml:1-6` 仅设置 yolo 和 idle TTL，不选择该 agent。

`src/eval/reminder.ts:15-48` **有** session_start 绑定的 `addBeforeModelCall` hook，但用途是读取当前运行未消费 atoms 并注入 reminder，不是 root agent definition 的装载 hook。按 assignment，不拓展模型全验，不对 root prompt 最终语义作 runtime 通过宣告；也不自行新增机制/立案。

## 可复现命令、日志与进程归属

本轮实际命令：

```sh
mkdir -p /tmp/gpt-nov02c-deploy-main
gh repo clone Pepgent/deploy /tmp/gpt-nov02c-deploy-main/deploy -- --depth 1 --branch main
gh repo clone Pepgent/soroi /tmp/gpt-nov02c-deploy-main/soroi -- --depth 1 --branch main
gh repo clone Pepgent/omp-rpc-mux /tmp/gpt-nov02c-deploy-main/mux -- --depth 1 --branch main
docker ps -a --format '{{.Names}}\t{{.Image}}\t{{.Status}}'
orb list
python3 /tmp/gpt-nov02c-deploy-main/inspect.py | tee /tmp/gpt-nov02c-deploy-main/inspect.log
docker exec -i pepgent-central-lab-web bun run - < /tmp/gpt-nov02c-deploy-main/main-probe.ts
# 首次运行不设 CANARY_EXISTING_ROOT 会新建 /tmp HOME、解包/安装并复制真实非secret配置。
# 本窗口安装成功后复用同一安装结果的最终直接启动：
docker exec -i -e CANARY_EXISTING_ROOT=/tmp/gpt-nov02c-deploy-main-6BcHyI pepgent-central-lab-web bun run - < /tmp/gpt-nov02c-deploy-main/main-probe.ts | tee /tmp/gpt-nov02c-deploy-main/main-final.log
docker exec -i pepgent-central-lab-web bun run - < /tmp/gpt-nov02c-deploy-main/mux-probe.ts | tee /tmp/gpt-nov02c-deploy-main/mux-source-ready.log
docker exec -i pepgent-central-lab-web bun run - < /tmp/gpt-nov02c-deploy-main/closure.ts | tee /tmp/gpt-nov02c-deploy-main/closure.log
```

将脚本中固定 `root` 改为首条安装输出的 `PROBE_ROOT` 即可在新的独立 HOME 复现；不要复制产品持久 HOME 或凭据，也不要刷新 Stack。若现有容器/挂载不再存在，先向 Core 和 Docker重新取回实际选择；不依赖此窗口副本猜测。

完整原始输出文件（没有截掉失败）：

- `inspect.log`：Core 版本/Stack引用/指定非secret Variable与容器字段。
- `main-probe.log`：安装完整 stdout/stderr 和首轮缺模型声明失败。
- `main-owner-config.log`：完整 ready/get_state（含原始 dumpTools）及错误 get_commands、deadline。
- `main-final.log`：最终直接 Main get_state + 工具投影 + 正常退出。
- `mux-probe.log`：初轮过早 reader 请求与 deadline。
- `mux-source-ready.log`：最终全路径真实输出（含正常退出/终于关闭）。
- `closure.log`：独立进程/Mux声明范围的结束观察。

closure 实测：

```text
OWN_PROCESS_ROWS []
PS_EXIT 0
OWN_MUX_DECLARATIONS {"url":"http://pepgent-central-mux.orb.local:8080/agents","status":200,"agents":[]}
```

第一轮错误 Mux driver 的 deadline 未打印 finally 标记；不拿其未打印部分冒充正常退出。它的 owned child/声明已经由上述 scope 结束观察确认不再存在。最终正确 driver 则显式经过 finally。

## 覆盖 / 未覆盖与分类

| 项目 | 判定 |
|---|---|
| D13 两值真实生产方/部署引用/当前容器输入 | 已观察链路存在；没有合成值/默认身份；未重算 config 身份、未回放部署操作 |
| 实际选定 tar、`--artifact`、release 安装公共入口 | 安装退出0，实际 Main成功加载并返回 RPC/工具 |
| Main RPC、get_state、soroi_eval/soroi_task 注册 | 直接路径与真实 Mux路径均通过，无模型turn |
| trusted reader owner注入及运输权限 | 实际 bearer读取/人工帧到writer通过；子进程未收到 trusted字段 |
| 最新源码与实际运行产物关系 | 选定 release旧于当前main；不认证最新main全部功能；Mux source revision未由标签确定 |
| root prompt hook | 源头核查已给出；不扩模型全验 |
| 完整 Lab 登录→建会话→业务工具→持久结果 | 未运行；不可将本轮拼为完整E2E |
| eval capture是否使用这两个值 | 未执行eval；只有生产方/消费方源码链和Main启动，不作捕获正确性通过宣告 |
| Slurm、远程作业、旧lifecycle404、release-init→store | 未重跑，不改原失败状态 |

本窗口没有确认新的“已合双方错配”或“缺实现”阻断。明确存在的是**运行产物并非最新main全量发行**这一覆盖边界，以及源头中未见默认root载入专用agent正文hook的事实（仅源头核查，不自行定案）。所有产品/部署声明保持不变。
