# Lab↔store 接缝金丝雀：最新 main / store-contract

## 结论（严格分三层）

1. **已合入：** store HTTP 图/写入/终态和 lifecycle/run SSE 已在 soroi/main；Lab 的共享 store schema 转出口、LAB-06 `followLifecycle` 和运行身份命名已在 Pepgent/main。**LAB-07a 的 StoreClient/catalog/实验图读取，以及 WEB-02 真 LabBridge 仍未合入；浏览器桥当前仍直接读 fixture。** 不能笼统说 Lab 所有消费者缺席，也不能说 Lab 已真实接图。
2. **局部 runtime 已实跑通过：**
   - 真实 main store CLI → HTTP 创建 transfer/提交 root+stop → Open 图 → end → Ended 图/状态/列表 → 真实 run SSE 四帧并 EOF、lifecycle SSE 两帧；实际响应被 npm 安装的公开 `pepgent-store/contract` 和 **Lab 自己的 `protocol/lab/external/store.ts` 转出口**解析。
   - **真实 store lifecycle SSE → 已合 main 的 Lab `followLifecycle` → 实际迁移后的 SQLite `experiment_ext` 新增 R-001 → DB 关闭重开后记录仍在。** 没有替换 fetch、SSE、store 或消费者，也没有注入 lifecycle/experiment 事实。
3. **完整产品：未通过／本轮不声称。** graph StoreClient/catalog/客户端桥不在 main；未运行未合实现，未走用户登录、创建讨论/启动 agent、页面 loader 与事件失效重读。上述已通过是 backend 接缝集成，不是 A0/F01–F31、UI 或完整产品验收。

**本轮没有复现双方已合入协议错配。原“Lab 读 fixture”断点仍成立，但只适用于浏览器 bridge/实验图 catalog 消费链；LAB-06 生命周期接缝已有真实运行与下游数据证据。**

## 边界、时间与源头

- (U) 本轮明确授权仅刷新最新 main/store-contract、执行 C1-3 异步非阻塞金丝雀；不改工程，不设开工/合入锁。
- 已读本仓 `AGENTS.md`、`LEDGER.md`，特别 C1-3、C1-4、C5-1；克隆内规则也已读取。
- 唯一工作目录：`/tmp/lab-store-nov02.9HyPaW`（macOS 对应 `/private/tmp/...`）。全部 probe、依赖、隔离 HOME、store 数据与 Lab DB 均在其中。
- 运行输出 UTC：生产者 `2026-11-01T17:14:04.774Z`，Lab 消费者 `2026-11-01T17:15:13.998Z`（本地 +09 的 11 月 2 日窗口）。
- 未读取或改动 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout；未读/联系 Opus 及其会话记忆；未使用容器、生产、SOPS 或本机凭据 DB；未改产品源码、commit/push 或立 issue/提案。
- `task` 工具未向此层暴露，按角色递归上限条款未派导师；没有以 fork_task 替代。事前计划在 `/tmp/lab-store-nov02.9HyPaW/plan.md`。

## 版本定位（仅定位，不当正确性证据）

| 来源 | 本轮取回定位 | 路径 |
|---|---|---|
| Pepgent/Pepgent main | `c423bc1a9b48b8abd6fc9a1d9847d6aeff115aeb`，`2026-11-02T00:18:27+09:00` | `/tmp/lab-store-nov02.9HyPaW/Pepgent` |
| Pepgent/soroi main | `05ae761ef8ff0cb045fd7d0bad1af85e03796713`，`2026-11-02T01:47:39+09:00` | `/tmp/lab-store-nov02.9HyPaW/soroi` |
| soroi store-contract | `ceaaf06436bf264650b0a38ec40239bcf0789ea5` | `/tmp/lab-store-nov02.9HyPaW/store-contract`，派生产物 package.json 仅导出 contract/identity、依赖 zod |
| 实际 npm Git 安装 | `package-lock.json` 的 `node_modules/pepgent-store.resolved` 定位到上述 store-contract 提交 | `/tmp/lab-store-nov02.9HyPaW/node_modules/pepgent-store` |

定位命令：`git log -1 --format='%H %cI %s'`、`git ls-remote --heads origin main store-contract`。没有做 hash 比较或把版本标识当验证证据。

## 已合入／缺席的源码证据

以下路径均相对表中对应克隆根，正文可由文件或该版本 GitHub blob 重取：

### Pepgent

- `apps/web/src/client/services/lab.ts:1-14`：导入 `LAB_SNAPSHOT`；`createLabBridge()` 返回 `readSnapshot: async () => LAB_SNAPSHOT`，并明确说明不调用 Lab server runtime、不持久化页面编辑。原断点未修。
- `apps/web/src/protocol/lab/external/store.ts:4-25,44-62`：拥有方 `pepgent-store/contract` 的运行 schema 真转出口。探针实际 import 此文件的 RunGraphSchema/RunSummarySchema，不复制 schema。
- `apps/web/package.json:51`：生产消费声明 `git+https://github.com/Pepgent/soroi.git#store-contract`；本轮隔离 npm 安装沿用同一来源。
- `apps/web/src/rpc/lab.ts:10-19`：`labCatalogRead` 目前仍回 typed not_supported；不能将六个函数名存在视为 catalog 接好。
- `apps/web/src/server/lab/operations.ts:133-150`：experiment/experiments 页落到 `notSupported`，不是实际 store 图投影。
- `apps/web/src/server/lab/experiments.ts:94-107`：`followLifecycle` 从 `/stream/lifecycle?after=<cursor>` 真实 fetch；对每个 data 用 LifecycleEventSchema.parse，调用 nameStartedRun 后推进游标。
- 同文件 `:22-52`：run_started 用 holder 找本地 conversation，生成 experiment_ext；`:56-60` Discussion 名称来自 discussionName。
- `apps/web/src/server/lab/runtime.ts:107-118,132-140`：runtime 启动生命周期订阅，并在外层关闭 DB 前 abort/await 订阅。本轮直接调用此已合模块公开函数，**没有启动整个 host/runtime/auth**。
- `apps/web/src/server/lab/database.ts:18-28`：真实 better-sqlite3 + Drizzle migrations 公开 DB 入口；本轮打开/关闭/重开实际 DB。
- `apps/web/src/server/lab/schema.ts:37-76,106-117`：conversation 的 session/root 关联和 experiment_ext 的身份/命名字段。测试数据库先置 organization + Discussion conversation 是隔离前置，不预置任何 experiment_ext 或运行生命周期事实。
- 也存在 library 的历史用量 HTTP 消费（`server/lab/library.ts:185-191`）；它不是本轮 graph/lifecycle 主题，不扩大运行。

### soroi

- `packages/store/src/main.ts:7-20`：真实 CLI 配置、startService、SIGINT/SIGTERM 生命周期。
- `packages/store/src/server.ts:52-57`：lifecycle SSE，id 为 cursor，data 为 LifecycleEvent；`:95-110` 写步/end/run SSE；`:123-125` 图读取。
- `packages/store/src/streams.ts:36-53`：初始 connected 注释、真实 async iterator、text/event-stream；本轮收到 actual frames。
- `packages/store/src/contract.ts:67-88,184-194,253-265`：正式写请求、返回、RunGraph/summary 和 RunEvent/LifecycleEvent schemas。
- `packages/store/src/database.ts:27-45`：真实 DuckDB/DuckLake/SQLite catalog 初始化，不是内存假 store。
- 文档注意：`packages/store/README.md:192` 仍写“不暴露 SSE”，与上述现行源码及本轮真实 SSE 响应不符。此为观察到的说明滞后，不据此否定已运行能力；未自行改文档。

## GitHub 当前承载事实

本轮读取 open PR 列表仅有无关认证 [PR #4](https://github.com/Pepgent/Pepgent/pull/4)，没有可运行的已合 main 图消费者 PR。相关 issue：

- [LAB-07a #17](https://github.com/Pepgent/Pepgent/issues/17) 当前 OPEN。最新事实：
  - [双闸门结论](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560745517)：07a+07b 在 W-09 自己路径域连续实现；真实 writers/slots 必须接入，不能恒定空槽位；routeTree 归属转 P0。该评论是当前处置事实，不当代码合入证据。
  - [跨组件验证边界澄清](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560760361)：已合 main 的金丝雀由产品全景部门/W-08 执行，不成为工程验收锁。
  - [工人状态](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6560167442) 报 d75b7d9 分支与 blocker；本轮没有 checkout/运行此未合实现。
- [WEB-02 #21](https://github.com/Pepgent/Pepgent/issues/21) 当前 OPEN。其 [退役/后续前提记录](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6559596233) 仍把 LAB-07a main 作为重入前提；[D20 通过记录](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6559773788) 不宣称 LAB-07a 已合。

未将 issue 评论中的旧试跑或自述当本轮消费者成功证据。

## 完整执行命令与输出路径

以下都是本轮实际执行；长进程启动经 exec_command，短命令经 bash。初次目录由 `mktemp -d /tmp/lab-store-nov02.XXXXXX` 得到。

```sh
# cwd=/tmp/lab-store-nov02.9HyPaW
git clone --depth 1 --branch main https://github.com/Pepgent/Pepgent.git Pepgent
git clone --depth 1 --branch main https://github.com/Pepgent/soroi.git soroi
# cwd=/tmp/lab-store-nov02.9HyPaW/soroi
git fetch --depth 1 origin store-contract
git worktree add --detach ../store-contract FETCH_HEAD
```

隔离目录 package.json 依赖：`@duckdb/node-api: latest`、`ulid: latest`、`zod: latest` 和 `pepgent-store: git+https://github.com/Pepgent/soroi.git#store-contract`；后续 npm 安装 Lab 小范围真实模块所需 drizzle-orm/better-sqlite3/tsx。不修改工程 manifest。

```sh
# cwd=/tmp/lab-store-nov02.9HyPaW
npm install --no-audit --no-fund > install.log 2>&1
npm install --no-audit --no-fund drizzle-orm better-sqlite3 tsx > lab-install.log 2>&1
HOME=/tmp/lab-store-nov02.9HyPaW/home \
STORE_HOME=/tmp/lab-store-nov02.9HyPaW/store-data \
STORE_HOST=127.0.0.1 STORE_PORT=0 \
bun soroi/packages/store/src/main.ts 2>&1 | tee store.log
# 实际监听 60041；将输出端口传给下面 probe
bun canary.ts http://127.0.0.1:60041/ > canary.log 2>&1
node --import tsx lab-lifecycle.ts http://127.0.0.1:60041/ > lab-lifecycle.log 2>&1
# 两条 probe 均 exit 0；最后经 PTY Ctrl-C 结束唯一 store 服务
```

- 安装输出：`install.log` 为 `added 7 packages in 12s`；`lab-install.log` 为 `added 6 packages in 2s`。
- 服务输出：`store.log` 为 `pepgent-store listening http://127.0.0.1:60041/ home=/tmp/lab-store-nov02.9HyPaW/store-data`。
- 完整 probe 源码：`canary.ts`、`lab-lifecycle.ts`，均在唯一 /tmp 目录。前者仅 HTTP/SSE + public schema parse；后者调用真实 Lab 模块。
- producer 输出：`canary.log`、`result.json`、`requests.json`、`run-stream.sse`、`lifecycle.sse`。
- consumer 输出：`lab-lifecycle.log`、`lab-lifecycle-result.json`、`lab-lifecycle-requests.json`。
- 实际 Lab DB：`lab-data/lab.sqlite`；store catalog：`store-data/catalog.sqlite`。没有拷贝本机任何 DB。
- 复跑需新的独立目录或分别新的 STORE_HOME 与 Lab DB home；当前 probe 采用唯一命名/空库前置，避免将旧数据当本次执行。不要求重写源码或运行任何未合消费者。

## 关键运行结果（R）

### A. 真生产者 + 公共解析边界

运行 `01M6C1N849HP1BE3EM98Y9TK32`：

- POST transfers 201，POST runs/steps 201；graph `state=Open,at=3`，实际 Root `temp_2200c` 值为 scalar number 2200，unconsumed=[]。
- POST end 200 `{kind:"Ended",seq:4}`；后读图 `state=Ended,at=4` 保留原 Root，state.unconsumed=[]，Ended 列表 startedAt/endedAt 均实际产生。
- run SSE：`id=1 run_started` → `id=2 step_committed`（records 携带 Root）→ `id=3 atom_stopped` → `id=4 run_ended`，随后 EOF=true。不是静态 JSON fixture 或直接内部 Store 调用。
- lifecycle SSE 原始输出：

```text
: connected

id: 1
event: run_started
data: {"run":"01M6C1N849HP1BE3EM98Y9TK32","holder":"lab-store-nov02-root","derivedFrom":null,"event":"run_started","at":"2026-11-01T17:14:04.297Z","cursor":"1"}

id: 2
event: run_ended
data: {"run":"01M6C1N849HP1BE3EM98Y9TK32","holder":"lab-store-nov02-root","derivedFrom":null,"event":"run_ended","at":"2026-11-01T17:14:04.627Z","cursor":"2"}
```

已核对 frame id/event 与公开解析后 seq/cursor/kind 对应。生命周期订阅由 probe 在取完两帧后主动取消；没有声称生命周期流自然终止。

### B. 真 Lab lifecycle 消费者 + 下游持久化

调用生产消费者前 `experiment_ext=[]`。隔离库仅设置一个 organization 和一个合法 Discussion/root holder 关联；sessionFile/worktree 是未访问的本地引用，不启动 omp/agent。

真实 HTTP 提交运行 `01M6C1QC0Q49FKBGTP9BK6EADG`，holder=`lab-live-holder`。**没有直接调用 nameStartedRun 或向其传造的事件**：`followLifecycle` 自己连接真 store，内部公开 schema parse 后写库。探针仅在 10 秒截止内读取 DB 观察实际异步结果，不控制产品消费者流程。

实际 DB 结果（关闭并重开后仍相同）：

```json
{
  "runId": "01M6C1QC0Q49FKBGTP9BK6EADG",
  "labId": "canary-lab",
  "number": "R-001",
  "name": "Live lifecycle canary",
  "projectId": null,
  "draftId": null
}
```

对应 store graph 是 `Ended,at=4`，Root `live_value` 为 number 42，unconsumed=[]。输出末行：

```text
PASS actual store lifecycle SSE -> merged Lab followLifecycle -> durable experiment_ext R-001
```

此记录只保存 Lab 自己拥有的命名事实，不把 store 终态复制为 Lab 权威。关闭顺序是 abort lifecycle → await followLifecycle → close DB；本轮进程退出，store 最后 Ctrl-C 停止。

## 未覆盖与处理归类

| 项 | 归类 | 本轮结论 |
|---|---|---|
| store HTTP/SSE + 当前公开 contract | 局部 runtime 已通过 | 真生产者和真实网络结果，不只是 schema 单体 |
| Lab lifecycle 命名消费 | 已合入且局部 runtime 已通过 | 真 SSE→真模块→SQLite 持久结果 |
| StoreClient/catalog/实验图读取 | 待实现/未合 main | #17 OPEN；不运行分支、不制造消费者通过 |
| 浏览器 LabBridge | 未接线（原断点仍在） | main `LAB_SNAPSHOT` 直返，#21 OPEN |
| 全 host/auth/membership/讨论/agent 启动/页面失效重读 | 未覆盖 | 隔离 DB 前置准备不等于这些用户流程通过；本轮 backend seam 不强扩 UI |
| calls/派生/比较/版本/文件/远端进度 | 不在本次选定主路径 | 不据此推断其对错 |
| 环境限制 | 本次可达 backend 无环境 blocker | 真 DuckLake、原生 SQLite、npm contract 安装均成功；无容器需求 |
| 已合双方协议错配 | 未复现 | 不将未合消费者或旧日志标成新 P1 运行错配 |

仅发现与证据交付给父席；未自行改产品、提出方案或创建 issue。
