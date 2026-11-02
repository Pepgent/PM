# Nov02c：最新 Lab backend ↔ store 真实业务消费者金丝雀

## 结论与分类

**已完成本轮最小接缝金丝雀，未发现所选最新 main 主路径的双方协议错配。已实证 central 的 lifecycle 404 属于旧运行产物缺路由，而非本轮最新 store main 缺实现。**

实际补强的是：最新 native store 的真实 HTTP commit → 真实 lifecycle SSE → 生产 `launchLabRuntime` → 独立 Lab SQLite 自动建立 `experiment_ext` → **LAB-14 新增 `runCommand(experiment.update)`** 经实际 Better Auth 身份/权限和 store 的运行 holder 解析 → SQLite 中真正改名、改项目。不是只调用 `followLifecycle`，不是重跑旧 compare/volume，也不是 GUI 或完整实验执行验收。

四类归属：

| 分类 | 本轮判断 |
|---|---|
| 主路径已合双方错配 | 所选生命周期命名 + LAB-14 experiment.update 未发现；不外推所有接口 |
| 旧运行产物 | **确认**：central 正运行 store 的完整 HTTP 路由源码没有 lifecycle/SSE 路由，GET 返回404；最新 main 有且真实返回200/SSE |
| 缺实现 | 所选最新主路径无此发现；其他 LAB-13/14 页面/命令未全量验收 |
| 环境限制 | 无阻止本轮 native 主路径的环境限制；未运行浏览器/Mux/真实 omp generation，故不称 Web 验收或完整 F 流程 |

没有改产品、没有开 issue/PR、没有派工、没有重启或写入共享服务。只读 central；所有本轮写入仅在 `/tmp/gpt-nov02c-lab-store/` 与本报告。没有读取另一产品席位的会话/报告/记忆；没有复制生产凭据/SOPS/agent.db。未用 hash 比对或 hash 验证；下面源码 revision 只作定位。

## 1. 源头、计划和新增消费层依据

(U)/(D) 已读本工作台当前 `AGENTS.md`、`LEDGER.md`，重点 U91–U97、C1-3、C1-4、C2-1、C4-3、C5-1；已读 `.omp/agents/soroi-keeper-gpt.md` 和双方克隆的 AGENTS。

(D) 本轮新增路径依据直接取回：

- [LAB-14：Pepgent/Pepgent#83](https://github.com/Pepgent/Pepgent/issues/83)，目标及 D44-03 how 明确新增 `experiment.update`，要求 write + run root conversation owner，改名和项目；issue 创建于 2026-11-01 22:04Z，明确晚于旧19:35窗口。
- [已定案 D44：Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)，正文事实指出此前 `experiment.update` 返回 not_supported；D44-03 v1 的 how 明确本命令语义。因此选择新消费层，不假定 lifecycle 低层函数自身本轮一定变化。
- [deploy#26 原始23:57Z失败记录](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565811512)：原记录中的 store lifecycle404保留，不以本轮 native通过消除它。

计划已先记录 `/tmp/gpt-nov02c-lab-store/plan.txt`。决定性问题：不预置 `experiment_ext`，真实 store commit 后它是否由生产 runtime 的 HTTP/SSE 自动出现，并能由新 LAB-14 公共命令真正修改？最便宜决定性观察为 before=[] → SSE后 R-001 → command done → runtime关闭后 SQLite仍有新名/新项目。无 `task` 工具，本层递归上限，按角色指令未用 fork_task 替代导师。

### 源码定位（克隆时 main 的快照，不作运行证明）

根目录 `W=/tmp/gpt-nov02c-lab-store`：

- `W/Pepgent` main locator：`67dea015adf03ab5ddc25483e6d7afc818f03582`。
- `W/soroi` main locator：`5f31e702cef6775e2033c0bd6475c2ba6d17a053`。
- Lab `apps/web/package.json:52` 仍声明 `git+https://github.com/Pepgent/soroi.git#store-contract`；`package-lock.json:14344-14349` 实际锁到 `ceaaf06436bf264650b0a38ec40239bcf0789ea5`，安装出的包为 `pepgent-store@0.0.0`，exports `./contract -> ./contract.ts`、`./identity -> ./identity.ts`。**原锁保留，未换 latest main contract、未 alias、未打补丁。** 本轮实际 old locked parser ↔ latest store runtime 的通过是运行证据，revision字串本身不是。

### 生产调用链锚点

以下路径相对 `W/Pepgent`，store 路径另注明：

- `apps/web/src/server/lab/runtime.ts:157-185` 打开真实迁移 SQLite、创建 StoreClient 和事件总线，并启动 lifecycle；`:206-222` abort/await子生命周期后关DB。
- `apps/web/src/server/lab/experiments.ts:104-123` 真 `fetch` SSE；`:165-190` 请求 `stream/lifecycle?after=0` 并执行 `nameStartedRun`。
- 同文件 `:24-55` 从 holder 对应 Lab conversation 命名，自动写 `experiment_ext`；`:71-75` 讨论名作为初名。
- `apps/web/src/server/lab/operations.ts:679-680,748-749` 是本轮调用的公共 server command dispatcher，不是私有 `updateExperiment` 直调。
- `apps/web/src/server/lab/experiment-update.ts:16-33` 检查实际登录/权限/owner/项目，然后更新真实数据库。
- `apps/web/src/server/lab/automation.ts:373-379` 的 `rootConversationOf` 通过 `store.runs()` 读真实 holder；`store.ts:63-65` 使用原锁 `RunSummariesSchema` 解析 GET /runs。
- `apps/web/src/server/lab/caller.ts:79-104,114-120` 实际调用 Better Auth session、membership、permission，Lab conversation表确认owner。
- `apps/web/src/server/lab/database.ts:18-27` better-sqlite3 + drizzle真实迁移/连接，无内存DB代替。
- `W/soroi/packages/store/src/server.ts:52-57` 当前 main lifecycle HTTP/SSE路由；`:91-96` runs读取/commit；`:144-146`创建transfer。
- `W/soroi/packages/store/src/store.ts:285-302` commit事务中产生run_started事实，不由探针伪造SSE。

## 2. central 只读定位：旧产物路由缺失

首次约00:19Z读取 current central，保留文件读取在00:22Z。不是为了怀疑原报告而重测：目的是把404定位到实际运行路由源码边界。没有 auth/写数据/重启。

实际命令（后一次保存现有证据）：

```sh
docker inspect --format '{{.Config.WorkingDir}} {{json .Config.Cmd}}' pepgent-central-store
docker exec pepgent-central-store cat /app/packages/store/src/server.ts > /tmp/gpt-nov02c-lab-store/central-store-server.ts
docker inspect --format '{{.Name}} created={{.Created}} started={{.State.StartedAt}} image-reference={{.Config.Image}}' pepgent-central-store pepgent-central-lab-web > /tmp/gpt-nov02c-lab-store/central-runtime.txt
docker logs --since 2026-11-02T00:17:30Z --until 2026-11-02T00:19:35Z pepgent-central-lab-web 2>&1 | grep 'lifecycle stream answered' > /tmp/gpt-nov02c-lab-store/central-lifecycle-errors.log
curl --silent --show-error --max-time 3 -i 'http://pepgent-central-store.orb.local:3001/stream/lifecycle?after=0' > /tmp/gpt-nov02c-lab-store/central-lifecycle-response.log
curl --silent --show-error --max-time 3 -i 'http://pepgent-central-store.orb.local:3001/runs' > /tmp/gpt-nov02c-lab-store/central-runs-response.log
```

(R) 实际工作目录 `/app/packages/store`，Cmd `["bun","src/main.ts"]`。实际源码已完整取回97行，`central-store-server.ts:36-43` 进入 fetch 后直接从 GET /runs 开始；`:44-83` 其余只有步骤/end/state/activity/graph/captures/objects/transfers；`:84` 落到 `Route does not exist`。**整份运行源码没有 `/stream/lifecycle` 或 EventStreams。** 这比 `latest` 标签、创建时间或镜像引用更直接。

(R) `central-runtime.txt`：store 创建 `2026-11-01T03:59:38.794423337Z`、启动 `03:59:39.905359957Z`；Lab 创建 `2026-11-02T00:17:24.876241791Z`、启动 `00:17:30.175949233Z`。未因 image-reference 带 latest 就认为它最新。

(R) 保存的HTTP响应：

```text
HTTP/1.1 404 Not Found
Content-Type: application/json;charset=utf-8
Date: Mon, 02 Nov 2026 00:22:38 GMT
Content-Length: 53

{"kind":"not_found","message":"Route does not exist"}
```

GET `/runs` 同期200，返回一个既有 Ended run（没有改它）：

```json
[{"run":"01M6AM0BFQHAY5M8K8T3ADSQVB","holder":"deploy-persistence-ad1cc6f457d84d1b8478e7ca7fde495e","state":"Ended","startedAt":"2026-11-01T03:56:13.688Z","endedAt":"2026-11-01T03:56:14.266Z"}]
```

`central-lifecycle-errors.log` 完整18行，反复包含两类真实错误：

```text
[lab experiments] automation lifecycle stream interrupted; retrying Error: store automation lifecycle stream answered HTTP 404
[lab experiments] lifecycle stream interrupted; retrying Error: store lifecycle stream answered HTTP 404
```

判定：central store入口可达，但**旧运行源码确实没有新Lab所需路由**。未定位其镜像发布/部署owner修复，也没有自行部署；这项交父席裁定。没有把它当成本轮 latest main 不兼容。

## 3. native 真实最小业务主路径

### 实际环境与命令

Node `v26.12.1`、Bun `1.4.4`、npm `11.20.0`。只用native；未创建容器/VM/卷。已读中央OrbStack台账并 `docker ps -a` 识别共享服务。所有native数据有独立路径，不复用 shared store/Lab state。

```sh
mkdir -p /tmp/gpt-nov02c-lab-store
git clone --depth 1 --branch main https://github.com/Pepgent/Pepgent.git /tmp/gpt-nov02c-lab-store/Pepgent
git clone --depth 1 --branch main https://github.com/Pepgent/soroi.git /tmp/gpt-nov02c-lab-store/soroi
# cwd W/Pepgent
npm ci --no-audit --no-fund > /tmp/gpt-nov02c-lab-store/npm-ci.log 2>&1
# cwd W/soroi
bun install > /tmp/gpt-nov02c-lab-store/bun-install.log 2>&1
# cwd W/soroi，自己的终端 session_id=2
STORE_HOME=/tmp/gpt-nov02c-lab-store/store-state STORE_HOST=127.0.0.1 STORE_PORT=59437 bun packages/store/src/main.ts > /tmp/gpt-nov02c-lab-store/store.log 2>&1
# cwd W/Pepgent
node --import tsx lab-store-canary.mts > /tmp/gpt-nov02c-lab-store/canary.log 2>&1
node read-lifecycle.mjs > /tmp/gpt-nov02c-lab-store/lifecycle-frames.log
sqlite3 -json /tmp/gpt-nov02c-lab-store/lab-state/lab.sqlite 'SELECT run_id,lab_id,number,name,project_id,draft_id FROM experiment_ext;' > /tmp/gpt-nov02c-lab-store/sqlite-persisted.log
```

`npm ci` exit0，1122 packages；运行了仓库既有postinstall/prepare，未手改产品。`bun install` exit0，125 packages，提示blocked 2 postinstalls；native实际启动/调用仍通过，不以install成功代替runtime。`store.log`：`pepgent-store listening http://127.0.0.1:59437/ home=/tmp/gpt-nov02c-lab-store/store-state`。

**完整可执行原探针**（未删减、未打产品补丁）保留：

- `/tmp/gpt-nov02c-lab-store/Pepgent/lab-store-canary.mts`：5825 bytes完整源码，实际运行此文件；真实 HTTP fetch、生产runtime/dispatcher、实际DB写入、finally停止。
- `/tmp/gpt-nov02c-lab-store/Pepgent/read-lifecycle.mjs`：721 bytes完整源码，真实GET读至run_ended后取消reader，无伪SSE。
- `/tmp/gpt-nov02c-lab-store/plan.txt`：运行前问题、假设、边界。

重取复现时使用同一clone/依赖命令和完整探针；新一轮必须给state/home和store端口独立目录/端口，不能在本轮已存在的 DB 上重跑初始化。同一原锁按其package-lock读取，不以最新contract覆盖。

### 注入、适配、业务前置边界

1. `resolveLabRuntimeOptions` 收到的原生环境对象：`HOME=W/home`、`PEPGENT_LAB_HOME=W/lab-state`、`SOROI_STORE_URL=http://127.0.0.1:59437/`、`BETTER_AUTH_URL=http://127.0.0.1:59438`；secret用该临时消费方进程新生随机值，未读取/复制/打印任何既有凭据。端口59438只是Auth baseURL配置，**没有启动对应Web HTTP server**。
2. 实际 `launchLabRuntime` 使用 `apps/web/resources/lab/migrations`，真实better-sqlite3 DB `W/lab-state/lab.sqlite`。
3. 用实际 `context.auth.api.signUpEmail/signInEmail/createOrganization/listMembers` 建立隔离真实组织、owner与cookie，按生产seed相同server API族。没有stub auth，没有直接预置auth数据库；但这是**server API业务前置，不是浏览器登录验收**。登录cookie/随机密码/secret都未输出。
4. `project.create` 通过生产 `runCommand` 实际写入目标项目。
5. **唯一直接SQL业务前置**：插入一个属于该owner的Discussion conversation，绑定本探针声明的holder session、agent/worktree/sessionFile字符串。没有启动Mux/omp，也没有读取该会话文件；这些是合法已有会话声明的隔离前置，**不证明会话启动、AI工作、auth/UI链路**。没有直接插入 `experiment_ext`、没有直接调用 `nameStartedRun`。
6. Store写入仅真实 `POST /transfers` 和 `POST /runs/steps`。空步骤 `code:"",roots:[],calls:[],stops:[],versions:[]` 只为建立合法run和生命周期；不伪称执行过实验计算。创建的transfer/run皆在自己的store目录。
7. 没有mock fetch、HTTP替身、SSE替身、全局网络函数改写、Zod patch、Mux替身。Node经tsx加载克隆生产TS，这一加载边界不是built Web/GUI验收。

### 完整关键运行日志（canary.log共15行）

```jsonl
{"label":"AUTH_BUSINESS_PREREQUISITE","value":{"organization":"pielT4EM8NH1ksm915mK6pVuQup8GQRA","member":"9wGLuudj6qt3DWFXwMfPiXXWahNweQd7","role":"owner","sessionEstablished":true,"through":"actual Better Auth server API, not browser"}}
{"label":"PROJECT_COMMAND","value":{"ok":true,"output":{"kind":"created","project":"e641748a-b72c-46b6-a5d5-c6637a0840a4"}}}
{"label":"CONVERSATION_PRECONDITION","value":{"conversationId":"723673f2-bb3a-40b2-be44-1d3c77b536e9","session":"native-canary-root-nov02c","preparedDirectly":true,"note":"Legal owned conversation declaration only; no Mux/omp generation/UI exercised; no experiment result preseeded"}}
{"label":"BEFORE_EXPERIMENT_ROWS","value":[]}
{"label":"HTTP","value":{"url":"http://127.0.0.1:59437/transfers","method":"POST","body":{"kind":"EvalTransfer","evalCall":"native-canary-nov02c"},"status":201,"response":{"transfer":"01M6CT4V9GD2RBH5M9AH7VBD5J"}}}
{"label":"HTTP","value":{"url":"http://127.0.0.1:59437/runs/steps","method":"POST","body":{"run":{"kind":"open","session":"native-canary-root-nov02c"},"session":"native-canary-root-nov02c","code":"","transfer":"01M6CT4V9GD2RBH5M9AH7VBD5J","roots":[],"calls":[],"stops":[],"versions":[]},"status":201,"response":{"run":"01M6CT4V9SCZW2C04X51Y7TB80","seq":2}}}
{"label":"SSE_CREATED_EXPERIMENT","value":{"runId":"01M6CT4V9SCZW2C04X51Y7TB80","labId":"pielT4EM8NH1ksm915mK6pVuQup8GQRA","number":"R-001","name":"Lifecycle named original","projectId":null,"draftId":null}}
{"label":"EXPERIMENT_COMMAND_INPUT","value":{"kind":"experiment.update","run":"01M6CT4V9SCZW2C04X51Y7TB80","name":"LAB-14 renamed after real SSE","project":"e641748a-b72c-46b6-a5d5-c6637a0840a4"}}
{"label":"EXPERIMENT_COMMAND_RESULT","value":{"ok":true,"output":{"kind":"done"}}}
{"label":"PERSISTED_EXPERIMENT","value":{"runId":"01M6CT4V9SCZW2C04X51Y7TB80","labId":"pielT4EM8NH1ksm915mK6pVuQup8GQRA","number":"R-001","name":"LAB-14 renamed after real SSE","projectId":"e641748a-b72c-46b6-a5d5-c6637a0840a4","draftId":null}}
{"label":"HTTP","value":{"url":"http://127.0.0.1:59437/runs","method":"GET","body":null,"status":200,"response":[{"run":"01M6CT4V9SCZW2C04X51Y7TB80","holder":"native-canary-root-nov02c","state":"Open","startedAt":"2026-11-02T00:22:01.273Z","endedAt":null}]}}
{"label":"HTTP","value":{"url":"http://127.0.0.1:59437/runs/01M6CT4V9SCZW2C04X51Y7TB80/end","method":"POST","body":{},"status":200,"response":{"kind":"Ended","seq":3}}}
{"label":"LAB_CHANGE_NOTICES","value":[{"kind":"catalog"},{"kind":"run","run":"01M6CT4V9SCZW2C04X51Y7TB80"},{"kind":"catalog"}]}
{"label":"PASS","value":{"scope":"latest native store HTTP/SSE -> production launchLabRuntime -> SQLite naming -> LAB-14 runCommand experiment.update -> store-backed owner resolution -> persisted name/project"}}
{"label":"LAB_STOPPED","value":true}
```

公共命令内部GET /runs的实际网络请求没有单独网络抓包；其**生产未替换StoreClient实现**与命令成功、对应真实endpoint响应、匹配holder共同界定这条证据，未捏造内部request日志。

### 实际SSE完整帧与关闭后独立SQLite读取

`lifecycle-frames.log`（这里是单独读取同一真实store已产生事件，不是用这份帧喂Lab）：

```text
{"url":"http://127.0.0.1:59437/stream/lifecycle?after=0","status":200,"contentType":"text/event-stream; charset=utf-8"}
: connected

id: 1
event: run_started
data: {"run":"01M6CT4V9SCZW2C04X51Y7TB80","holder":"native-canary-root-nov02c","derivedFrom":null,"event":"run_started","at":"2026-11-02T00:22:01.273Z","cursor":"1"}

id: 2
event: run_ended
data: {"run":"01M6CT4V9SCZW2C04X51Y7TB80","holder":"native-canary-root-nov02c","derivedFrom":null,"event":"run_ended","at":"2026-11-02T00:22:01.636Z","cursor":"2"}
```

实际 Lab订阅URL由生产 `experiments.ts:169` 固定初始 `/stream/lifecycle?after=0`，Accept=`text/event-stream`；未改变它。完整runtime停机之后，独立 `sqlite3` 进程输出：

```json
[{"run_id":"01M6CT4V9SCZW2C04X51Y7TB80","lab_id":"pielT4EM8NH1ksm915mK6pVuQup8GQRA","number":"R-001","name":"LAB-14 renamed after real SSE","project_id":"e641748a-b72c-46b6-a5d5-c6637a0840a4","draft_id":null}]
```

这证明不是仅command acceptance或内存投影：真实HTTP/SSE已驱动业务事实，并在新命令后持久化。SSE结束帧独立读到，不额外声称Lab所有terminal通知、重放、watchRun竞态都已覆盖。

## 4. 覆盖、未覆盖、服务结束

已覆盖：最新store native启动；原锁contract解析最新runs/lifecycle；完整生产Lab runtime lifecycle拥有关系；实际SQLite从无实验行到自动命名；新LAB-14公共dispatcher的project.create与experiment.update；真实Auth server API身份/权限；真实store holder读取；关闭后DB持久化；中央旧running源路由边界。

未覆盖：浏览器登录/GUI、built Web RPC transport、完整Lab页面、Mux/omp真实generation、模型/工具执行、草稿启动或审批、LAB-13其他功能、datasets/containers/settings读取、自动化规则下游、compare/volume（旧范围不重跑）、完整F01–F32。不把这些探针拼成完整E2E。

结束观察：Lab `finally` 执行 `endLabRuntime` + `await runtime.stop()`，日志 `LAB_STOPPED=true`；生命周期/compute/slots及DB按生产stop await。读取SSE helper取消reader并清timer。native store终端2以SIGINT结束，工具确认 `running=false, escalated=false, exit_code=0`。没有本轮存活服务，没有共享数据清理/重启。日志/完整探针/自己的DB留在获准 `/tmp` 证据目录。

交父席的唯一外部处置事实：**central尚运行缺lifecycle路由的旧store产物，影响Lab命名和automation订阅；最新main选定业务链已通过。** 是否立项/如何更新运行产物由父席定夺，本调查未自行设计新机制或立案。
