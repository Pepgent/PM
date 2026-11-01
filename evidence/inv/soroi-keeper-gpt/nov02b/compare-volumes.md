# Lab ↔ store compare / volume 本轮独立接缝调查

## 结论

**本窗口已定位为既有隔离环境运行着较旧的 store 路由实现，不是最新双方已合 main 的 compare/volume 协议错配；没有由本反例支持的新公开契约 P1 需求。**

- 原始 W-10 404 作为已发生事实保留。原评论未提供 scheme/host/port、query、run/step/position、命令或响应日志，因此**无法恢复其具体原请求**，不能认定 W-10 当时究竟请求了裸路径还是完整路径，也不把本轮探针冒称成原请求。
- 本轮实际 GET 中，中心 store 即使使用有效的已存在 run id，`/compare?a=...&b=...` 依然返回 `404 {kind:not_found,message:"Route does not exist"}`。只读复制运行容器自身 `server.ts` 后，看到其 HTTP 实现根本没有 compare 或 volume 分支。这把故障定位到了运行服务的代码面，而不是数据不足、参数漏填或 Lab 最新客户端。
- S1 的运行实现有 compare，没有 volume。合法 compare 返回 200，裸 compare 返回 400，完整 volume 返回相同的 route-missing 404。不能拿 S1 的 compare 成功推定它也支持 volume。
- 新取回 soroi main 的 native 独立 store，在独占 `/tmp` 数据中，通过真正 HTTP API 接收 tar、提交两次正式 run 并结束；**未修改的 Pepgent main `StoreClient`、配合 Lab lockfile 实际记录的 contract 模块**成功读取 compare、volume 清单和文件正文，响应均 200，文件最终正文逐字一致。
- 最新 API 上裸 `/volumes` 本来就不受支持；裸 `/compare` 缺 a/b，本轮返回 400 而不是 404。这两个裸路径不可合称“完整功能不存在”。

以上是本轮局部接缝事实，不是阶段 C、W-10 UI、Lab 认证/归属检查或完整 remote 执行流验收。部署刷新归既有实施路径，未创建新机制、提案、issue、PR、派工或共享环境改动。

## 1. 证据来源、隔离和版本边界

### 原始问题

(A) 原评论：[Pepgent/Pepgent#26，2026-11-01T19:14:00Z](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562604645)，第 6 项：

> 已登记的两个 store 只有 Root 节点，没有 Call、AbortedCall 或 derivedFrom；central 的 `/compare` 与 `/volumes` 返回 404 `Route does not exist`。

(D) 后续管理评论保留此观察为跨组件接缝事项：[2026-11-01T19:30:48Z](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562796849)。本轮不处理评论中的 D35 / UI / 定义版本等其他事项。

本轮只从原 issue 和已登记资源文档寻找地址：

- `/Users/mouriya/Ext/work/orbstack/pepgent-central.md:24-30`：`http://pepgent-central-store.orb.local:3001`。
- `/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e.md:9-13`：`http://pepgent-soroi-e2e-store.orb.local:3001`。

未查 W-10 工作区/会话，未联系工人或无关前端。未读任何 Opus 会话、目录、记忆、报告或票；未读旧巡检。未访问生产、SOPS、凭据或共享 DB；未对共享 store 发任何写请求。没有创建容器。

### 全新源代码副本

独占目录：`/tmp/gpt-nov02b-compare-volumes.T5tNY6/`，其中 `soroi/`、`lab/` 分别是从 GitHub main 新 clone 的副本，非工程 checkout。以下 commit 仅为源码定位，不是 hash 验证证据。

| 对象 | 本轮取回时 main 定位 | commit 时间及主题 |
|---|---|---|
| Store 生产者 | [Pepgent/soroi 6e0c2398d14954d4f3106be63bb774ef679cfdfd](https://github.com/Pepgent/soroi/commit/6e0c2398d14954d4f3106be63bb774ef679cfdfd) | 2026-11-02T04:25:45+09:00，Merge pull request #338 from Pepgent/e2e-250-259-live-drivers |
| 已合 Lab caller | [Pepgent/Pepgent 05756a56adc6c40dcf54e67f3fc1c1c7637fff3c](https://github.com/Pepgent/Pepgent/commit/05756a56adc6c40dcf54e67f3fc1c1c7637fff3c) | 2026-11-02T04:16:14+09:00，docs(lab): apply revised WEB-02 delta 1 from #51 (#70) |
| Lab 的已锁定外部 schema 依赖 | [store-contract ceaaf06436bf264650b0a38ec40239bcf0789ea5](https://github.com/Pepgent/soroi/commit/ceaaf06436bf264650b0a38ec40239bcf0789ea5) | `lab/package-lock.json` 的 `packages["node_modules/pepgent-store"].resolved` 实际记录；clone 到 `contract/` 并 checkout 该对象 |

不以最新 main schema 替换 Lab 实际锁定 schema 后声称兼容。Lab 原源文件保持不变，仅在 `/tmp` 为其 `pepgent-store` 模块设置链接指向上述锁定包；该包 zod 链到 native store 安装的 zod。

运行条件：(R) Bun `1.4.4`；`bun install` 在临时 soroi 副本安装出 `@duckdb/node-api@2.0.0-r.1`、zod `4.6.7`、ulid `3.0.2`。未新增版本钉选，未运行产品测试套件、build、lint 或 typecheck。

## 2. 合法路由、参数及源码定位

(D) [D6 已通过正文](https://github.com/Pepgent/PM/issues/5) D6-04/05/07/13：正式步提交、运行结束、transfer tar 上传、已提交 volume 寻址以及 compare 均已存在。

(D) [D12 现行正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md) D12-01/05/06/13：Lab 直接解析 store 自有 schema；experiment 参数携带 compare run id 和 workspace `{step,position}`；文件经过 Lab 字节路由转取。

最新 soroi 副本的相对路径：

- `packages/store/src/server.ts:76-89`：`GET /compare?a=<RunId>&b=<RunId>`；可选单个 `map`，值为 URL 编码 JSON tuple-array，如 `[["a_seed","b_seed"]]`。`a`、`b` 是 IdSchema 的 26 字符 store id，不是 Lab experiment id。
- `packages/store/src/server.ts:136-142`：`GET /volumes/<run>/<step>/<position>` 返回清单；`/files/<relative path>` 返回字节。没有全局 `GET /volumes`。
- `packages/store/src/server.ts:95-99,144-160`：`POST /transfers`、`PUT /transfers/<t>/volumes/<position>`、`POST /runs/steps`。
- `packages/store/src/transfers.ts:69-88`：实际解开 tar，逐 regular file 暂存，生成清单；不是从探针虚造 manifest 直接塞 DB。
- `packages/store/src/store.ts:285-309`：正式 open 请求产生 run id；提交事件确定 step 序号；不能把 commit 返回的最终 seq 当作 call 的 step。
- `packages/store/src/store.ts:312-327,386-408,435-439`：正式 call 卷写入、对象提升、提交后删除 transfer。
- `packages/store/src/contract.ts:67-89,103-118,211-234`：请求及响应精确 schema。
- `design/store.md:118,151,175-191` 和 `packages/store/README.md:28-33,46,159`：完整公开路径和 JSON map；旧 D6 表中 colon/comma 示意不能代替现行 JSON map。该可选 map 在本轮也实际请求成功，但 Lab compare 方法当前不传 map，未为其设计新 UI。

最新 Lab 副本的相对路径：

- `apps/web/src/server/lab/store.ts:39-59`：URL、原始 GET、错误映射和响应 schema.parse。
- `apps/web/src/server/lab/store.ts:71-76`：`compare(a,b)` 由 URLSearchParams 发送 a/b；`volume(run,step,position)` 使用完整路径。
- `apps/web/src/server/lab/operations.ts:85-93`：experiment 页面读取调用 compare、volume。
- `apps/web/src/server/lab/http.ts:197-214`：公开 Lab volume file handler 在身份/归属检查后，按 path 分段 encodeURIComponent，调用 `StoreClient.bytes` 转读 store。
- `apps/web/package.json:52`、`package-lock.json` 对应包项：store-contract 分支依赖和实际 lock 定位。

## 3. 既有隔离运行服务：只读 GET

(R) `existing.ts` 对两个登记地址各执行 5 个有界请求，每次 10 秒 deadline；完整原始记录保存在 `/tmp/gpt-nov02b-compare-volumes.T5tNY6/existing.jsonl`。

两个 `/runs` 响应各只有一个 run。因此本轮完整 compare 使用同一个现有 run 同时作为 a/b，只用于验证路由、参数和读取主路径；没有向共享 store 补数据，也不冒称共享环境已有两个运行的比较样本。

### 中心 store

```http
GET http://pepgent-central-store.orb.local:3001/runs
200
[{"run":"01M6AM0BFQHAY5M8K8T3ADSQVB","holder":"deploy-persistence-ad1cc6f457d84d1b8478e7ca7fde495e","state":"Ended","startedAt":"2026-11-01T03:56:13.688Z","endedAt":"2026-11-01T03:56:14.266Z"}]

GET http://pepgent-central-store.orb.local:3001/compare
404
{"kind":"not_found","message":"Route does not exist"}

GET http://pepgent-central-store.orb.local:3001/volumes
404
{"kind":"not_found","message":"Route does not exist"}

GET http://pepgent-central-store.orb.local:3001/compare?a=01M6AM0BFQHAY5M8K8T3ADSQVB&b=01M6AM0BFQHAY5M8K8T3ADSQVB
404
{"kind":"not_found","message":"Route does not exist"}

GET http://pepgent-central-store.orb.local:3001/volumes/01M6AM0BFQHAY5M8K8T3ADSQVB/2/0
404
{"kind":"not_found","message":"Route does not exist"}
```

### S1 store

```http
GET http://pepgent-soroi-e2e-store.orb.local:3001/runs
200
[{"run":"01M6ACB67PSDANGEP2D3RS557B","holder":"dist03-compose-1793497340084","state":"Ended","startedAt":"2026-11-01T01:42:20.150Z","endedAt":"2026-11-01T01:42:39.696Z"}]

GET http://pepgent-soroi-e2e-store.orb.local:3001/compare
400
{"kind":"invalid_request","message":"[\n  {\n    \"expected\": \"string\",\n    \"code\": \"invalid_type\",\n    \"path\": [],\n    \"message\": \"Invalid input: expected string, received null\"\n  }\n]"}

GET http://pepgent-soroi-e2e-store.orb.local:3001/volumes
404
{"kind":"not_found","message":"Route does not exist"}

GET http://pepgent-soroi-e2e-store.orb.local:3001/compare?a=01M6ACB67PSDANGEP2D3RS557B&b=01M6ACB67PSDANGEP2D3RS557B
200
{"a":"01M6ACB67PSDANGEP2D3RS557B","b":"01M6ACB67PSDANGEP2D3RS557B","pairs":[{"kind":"SameValue","a":{"kind":"Root","name":"dist03_value","value":{"kind":"scalar","scalar":{"kind":"number","v":42}}},"b":{"kind":"Root","name":"dist03_value","value":{"kind":"scalar","scalar":{"kind":"number","v":42}}}}]}

GET http://pepgent-soroi-e2e-store.orb.local:3001/volumes/01M6ACB67PSDANGEP2D3RS557B/2/0
404
{"kind":"not_found","message":"Route does not exist"}
```

这里 `2/0` 是**本轮有意构造的语法完整探针地址**，不是从 Root-only 图发现的真实 call。单靠这项 404 不足以区分“没有卷”和“没有路由”；下面运行文件给出了决定性边界。

### 运行代码面，而非标签推断

(R) 只读容器 metadata：

```text
/pepgent-central-store created=2026-11-01T03:59:38.794423337Z started=2026-11-01T03:59:39.905359957Z image_name=pepgent-registry.orb.local:5000/pepgent/soroi-store:latest cmd=["bun","src/main.ts"]
/pepgent-soroi-e2e-store created=2026-11-01T02:55:19.120019448Z started=2026-11-01T02:55:20.583904151Z image_name=pepgent-registry.orb.local:5000/pepgent/soroi-store:latest cmd=["bun","src/main.ts"]
```

两者 WorkingDir 均 `/app/packages/store`。通过 `docker cp` 仅复制 `src/server.ts`（不是 DB、配置或凭据）：

- `central-running-server.ts:38-84`：完整 HTTP 分派仅 runs、steps、end/state/activity/graph、captures、objects、transfers、transfer objects PUT，随后兜底 `Route does not exist`；**没有 compare、volume**。
- `s1-running-server.ts:47-61`：有 compare，使用 a/b 和 JSON map；`:62-110` 后续完整分派没有 volume，随后同一兜底。

这证明当前运行代码缺对应分支。未用 image digest 或任何 hash 比较作验证。没有取得运行镜像精确源码 commit 的可靠 label，**运行环境的精确 Git commit 未知**；不从 `:latest` 推断它是 GitHub main，也不从台账历史 commit 反推本轮运行源码。分类只依赖实际路由和容器所执行文件。

## 4. 最新 source native store ↔ 已合 Lab client

(R) 独立 native 服务使用真实 `startService`、Bun HTTP、DuckDB/DuckLake/SQLite、tar 解包和正式提交路径；home=`/tmp/gpt-nov02b-compare-volumes.T5tNY6/native-data`，端口由 `port:0` 分配为 `58867`。没有替代 store、mock HTTP 或直接写 DB。

**输入边界：** 两个正式提交是 canary 自己构造的最小协议载荷；A 记录 Done/Executed remote-site call，B 记录 Adopted 同一 capture，根值都为 42、名字不同。tar 中有真实 regular file。这里没有启动 remote/slurm/runner，也不把请求中的 `template:canary-native` / `remoteRun` 声称为真实 remote 作业；此实验验证公开提交与读取接口，不验证执行引擎来源。身份字段仅为协议必需内容寻址值，未进行 hash 验证或以 hash 为成功证据。

### 完整操作顺序与返回

下表所有 native URL 的共同前缀为 `http://127.0.0.1:58867`，末尾 raw trace 附件逐项保存完整 URL、完整 JSON 请求体、HTTP status 和响应体。

| 方法和完整路径 | 请求 | status / body |
|---|---|---|
| POST `/transfers` | `{"kind":"EvalTransfer","evalCall":"nov02b-volume-a"}` | 201 `{"transfer":"01M6C9RMDR92YT607WWXEJ43P4"}` |
| PUT `/transfers/01M6C9RMDR92YT607WWXEJ43P4/volumes/0` | 真实 `volume.tar` 字节 | 204，空正文 |
| POST `/runs/steps` | A，完整载荷见 `native.jsonl` 与 `canary.ts` | 201 `{"run":"01M6C9RMDZSH520FZBC8MKSH8E","seq":5}` |
| POST `/runs/01M6C9RMDZSH520FZBC8MKSH8E/end` | `{}` | 200 `{"kind":"Ended","seq":6}` |
| POST `/transfers` | `{"kind":"EvalTransfer","evalCall":"nov02b-volume-b"}` | 201 `{"transfer":"01M6C9RMKY87FM4XG44887PH2Z"}` |
| POST `/runs/steps` | B，完整载荷见附件 | 201 `{"run":"01M6C9RMKZ6SRDMA2P3HYK41RB","seq":4}` |
| POST `/runs/01M6C9RMKZ6SRDMA2P3HYK41RB/end` | `{}` | 200 `{"kind":"Ended","seq":5}` |

本轮 A 的 call `step=2,position=0` 是从 Lab `StoreClient.graph()` 读取的正式图定位，不使用 commit 返回的 `seq=5` 来猜测 workspace。

### compare：未修改的最新 main caller 实际执行

```http
GET http://127.0.0.1:58867/compare?a=01M6C9RMDZSH520FZBC8MKSH8E&b=01M6C9RMKZ6SRDMA2P3HYK41RB
200
```

Lab `StoreClient.compare()` 经过自身 `RunComparisonSchema.parse` 返回 `ok:true`；pairs 是 `SameValue`（不同根名 `a_seed` / `b_seed`，数值均为 42）和 `SameCapture`（A 的 Ended call，B 的 Adopted call）。完整响应及解析后的对象均保存在 `native.jsonl`，不是仅检查 HTTP status。

额外现行 map 主路径：

```http
GET http://127.0.0.1:58867/compare?a=01M6C9RMDZSH520FZBC8MKSH8E&b=01M6C9RMKZ6SRDMA2P3HYK41RB&map=%5B%5B%22a_seed%22%2C%22b_seed%22%5D%5D
200
```

响应同为上述 SameValue/SameCapture 两对。这里直接 GET 补充覆盖 store 的可选参数格式，不冒称 Lab 当前提供 map 参数入口。

### volume 清单与最终文件

```http
GET http://127.0.0.1:58867/volumes/01M6C9RMDZSH520FZBC8MKSH8E/2/0
200
{"files":[{"path":"workspace/result note.txt","content":"88fef2e3e441e12a7da5447cdbb83221e44321815c4c3ce7def36c11fbe87764","size":54}]}

GET http://127.0.0.1:58867/volumes/01M6C9RMDZSH520FZBC8MKSH8E/2/0/files/workspace/result%20note.txt
200
compare-volume-native-canary
formal public API volume
```

- 第一项实际调用 Lab `StoreClient.volume()`，由其 `VolumeManifestSchema.parse` 解析，返回 `ok:true`。
- 第二项实际调用 Lab `StoreClient.bytes()`，路径分段编码与 `http.ts:211-212` 相同；最终正文保存为 `downloaded-volume.txt`，逐字与 `expected-volume.txt` 比较，`exactContent:true`。证据是清单字段和完整 54 字节内容，不是 content 字段或 hash 对比。
- 未调用需要完整 Lab runtime、成员认证及 experiment_ext 的 `labVolumeFile()` handler，因此没有认证、Lab DB 归属或浏览器层通过声明。

### 裸路径对照与停止

```http
GET http://127.0.0.1:58867/compare
400
{"kind":"invalid_request","message":"[\n  {\n    \"expected\": \"string\",\n    \"code\": \"invalid_type\",\n    \"path\": [],\n    \"message\": \"Invalid input: expected string, received null\"\n  }\n]"}

GET http://127.0.0.1:58867/volumes
404
{"kind":"not_found","message":"Route does not exist"}
```

(R) 驱动 finally 中实际 await `service.close()`，最后一行：

```json
{"event":"stopped","base":"http://127.0.0.1:58867/"}
```

`bun canary.ts` exit 0，耗时 2.29 秒；`native.stderr` 空。没有遗留自有 listener。临时数据、源码和证据保留在独占目录供父席取证；未操作其他服务生命周期。

## 5. 实际完整命令与保留附件

以下命令均实际运行；cwd 明确写在段落中。源码读取由 read/find/grep 工具完成，不混入 shell 文件遍历。

在 `/tmp`：

```sh
mktemp -d /tmp/gpt-nov02b-compare-volumes.XXXXXX
# -> /tmp/gpt-nov02b-compare-volumes.T5tNY6
```

在该独占目录：

```sh
git clone --depth 1 --branch main https://github.com/Pepgent/soroi.git soroi && git clone --depth 1 --branch main https://github.com/Pepgent/Pepgent.git lab
git -C soroi log -1 --format='%H %cI %s' && git -C lab log -1 --format='%H %cI %s' && bun --version && gh auth status
bun existing.ts > existing.jsonl && cat existing.jsonl
docker ps -a --format '{{.Names}}\t{{.Image}}\t{{.Status}}' && docker inspect pepgent-central-store pepgent-soroi-e2e-store --format '{{.Name}} image={{.Config.Image}} image_id={{.Image}} created={{.Created}} started={{.State.StartedAt}} cmd={{json .Config.Cmd}} labels={{json .Config.Labels}}'
docker inspect pepgent-central-store pepgent-soroi-e2e-store --format '{{.Name}} created={{.Created}} started={{.State.StartedAt}} image_name={{.Config.Image}} cmd={{json .Config.Cmd}}' > runtime-metadata.txt && cat runtime-metadata.txt
git clone --depth 1 --branch store-contract https://github.com/Pepgent/soroi.git contract && git -C contract fetch --depth 1 origin ceaaf06436bf264650b0a38ec40239bcf0789ea5 && git -C contract checkout --detach FETCH_HEAD && docker inspect pepgent-central-store pepgent-soroi-e2e-store --format '{{.Name}} cwd={{.Config.WorkingDir}}'
mkdir -p lab/node_modules contract/node_modules && ln -s ../../contract lab/node_modules/pepgent-store && ln -s ../../soroi/packages/store/node_modules/zod contract/node_modules/zod && docker cp pepgent-central-store:/app/packages/store/src/server.ts central-running-server.ts && docker cp pepgent-soroi-e2e-store:/app/packages/store/src/server.ts s1-running-server.ts
bun canary.ts > native.jsonl 2> native.stderr && cat native.jsonl
```

在 `/tmp/gpt-nov02b-compare-volumes.T5tNY6/soroi/packages/store`：

```sh
bun install
```

第一次 Docker metadata 命令同时打印了运行镜像 identity / compose labels；这些只是观察到的元数据，未对其做 hash 验证，结论不依赖 digest。gh 状态确认 RiriAgent，没有切账号；未提取或复制认证 token。

本地保留附件（均属于本轮新生成，不依赖旧巡检）：

| 路径（统一前缀 `/tmp/gpt-nov02b-compare-volumes.T5tNY6/`） | 内容 |
|---|---|
| `plan.md` | 决定性问题、步骤、边界、未验证假设；此递归窗口没有 task 工具，按规则不借 fork 绕过 mentor 限制 |
| `existing.ts`、`existing.jsonl` | 所有共享环境只读请求的完整驱动和完整 URL / status / body |
| `central-running-server.ts`、`s1-running-server.ts` | 从实际容器只读取回的完整 HTTP 路由实现 |
| `runtime-metadata.txt` | 限定容器时间、镜像名字、入口命令 |
| `canary.ts` | 完整可复现 native HTTP canary，包含完整提交载荷、tar 构造、未修改 Lab import、日志捕获和 finally close |
| `native.jsonl` | 所有 native HTTP 请求的完整 URL / JSON requestBody / status / body；tar 请求体为保留文件 `volume.tar` |
| `native.stderr` | 空诊断输出 |
| `volume.tar` | 实际上传的 tar，不是模拟文件清单 |
| `expected-volume.txt`、`downloaded-volume.txt` | 完整输入/最终内容（54 bytes） |
| `native-data/` | 仅本 canary 的实际 store 持久状态，无外部 DB 副本 |
| `soroi/`、`lab/`、`contract/` | 全新取回的源代码及本轮 native 依赖 |

原始工具输出另可定位：native 完整 stdout `artifact://4765`。共享环境 GET 的完整原始记录见 `existing.jsonl`。核心可重现证据均有具体本机路径，不要求依赖 artifact 可见性。

## 6. 分类与不外推事项

| 候选解释 | 本轮裁定 |
|---|---|
| 最新 store / 最新已合 Lab compare-volume 协议错配 | 本轮主路径不成立：真实 native HTTP + 实际 Lab caller + 其锁定 schema 已通过 |
| 旧隔离环境未刷新 | **成立到运行路由实现边界**：中心执行文件无 compare/volume，S1 无 volume；最新 source 均有。精确旧 commit 未知，不伪造 |
| 原 W-10 调用不符合既有契约 | 原完整请求未提供，不能裁定原调用；仅能确认裸 volumes 本身不是契约路由，裸 compare 缺参数 |
| 共享 store 缺少真实调用/卷数据 | `/runs` 的实际样本确实不足以提供两个-run/卷验收；未写共享数据。该事实不解释中心有效 compare 请求的 route-missing 分派 |
| 新公开契约缺口应走 P1 | 本轮没有可复现的新缺口。是否安排既有部署刷新由父席按所有权裁定，不设计新机制、不代改共享环境 |

没有覆盖：W-10 未合代码、真实浏览器、Lab 登录和实验归属、remote 作业执行、版本内容回取、Aborted/Derived 等其他 graph 投影。已完成的仅为这份任务的 compare / volume 公开 API 及已合 caller 接缝 canary。原 404 历史没有被“重跑通过”抹去；它与本轮运行版本事实分别记录。
