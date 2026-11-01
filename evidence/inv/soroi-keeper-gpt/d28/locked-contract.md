# D28 独立事实核验：Pepgent 锁定契约与 generation

## 结论（仅 C/R 与已定责任契约，不作议案裁决）

1. **Pepgent 远端 `main` 的既有 `package-lock.json` 尚未消费已修正的 generation schema。** 声明依赖仍指向 `store-contract` 分支，但 `resolved` 锁定对象中的 `TransferSchema` 要求 number。在独占 `/tmp` 中按该原锁闭包实际执行 `npm ci` 后，同一个 UUID 格式的 `AgentGenerationTransfer` 输入被锁定包拒绝，实际错误是 `generation: expected number, received string`。
2. **当前 `store-contract` 分支和 store `main` 主源均接受同一个输入，并原样保留 generation 字符串。** 这一结论来自精确导出 schema 的真实执行，不来自提交号差异、文本摘要或文件 hash。
3. **当前 Lab 消费了该包的其他契约，但没有消费 `TransferSchema` / `AgentGenerationTransfer`。** 已合入源码中的实际读路径包括库 usage/version 的 HTTP 解析和 store lifecycle SSE 解析；generation 不进入这些 schema。因此已证实的是**锁定依赖内的潜伏副本错配**，不是“当前 Lab 的创建 transfer 入口已实测失败”，也不能据此称整个 Lab 当前所有读取失败。
4. **责任边界早已存在。** D16-15 指定 W-06 维护唯一 store 契约源与 CI 派生分支，W-09 通过既有 `npm update pepgent-store` 跟进消费；D23-01 已规定 Mux 字符串原值，D23-02 指定 store 修正归 W-06。这里不提出新发布、同步、版本、门禁或状态机制。

## 范围、隔离与来源

- 新调查窗口；未读取或联系 SoroiKeeperOpus 的会话、记忆或报告；未读取 PM47 的巡检正文、提案或其他席选票。
- 仅使用 U/D 既定边界、远端当前分支源码、原锁闭包和本次运行输出；未采用任何席位的巡检结论。
- 工程 checkout 未修改。所有获取源码、安装闭包、探针与日志都在独占目录：`/tmp/gpt-d28-locked-contract.RbkaPm/`。
- 未访问生产、SOPS、凭据数据库；未修改源码、创建 issue、投票或广播；未执行未合入分支代码。
- 命令 `date -u '+%Y-%m-%dT%H:%M:%SZ'` 在本轮返回 `2026-11-01T17:36:46Z`，这是工具宿主时钟输出，作为取证定位，不据此推断其他系统时间。
- 以下提交标识**仅定位被读取对象**，不作为正确性或一致性证据：
  - Pepgent/Pepgent `main`：`1a5332e3327b818edf667f807f933c3115d29536`。
  - Pepgent/soroi `main`：`8e6549ae1071c340e71aed76f4a73339cb91e3ad`。
  - Pepgent/soroi `store-contract`：`ceaaf06436bf264650b0a38ec40239bcf0789ea5`。
  - 消费锁定位对象：`8a23e213c03b244914e7fdded28182f3eb0d0572`。

## D：已定契约与责任

### D16-15

直接读取 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D16-15-store-contract.md:28` 的完整正文，而非其他席摘要。

[归档正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D16-15-store-contract.md)：

- ①②：W-06 维护 `contract.ts`、`identity.ts` 与 `.github/workflows/store-contract.yml`，从 `packages/store/src` 产出最小契约包。
- ②：`store-contract` 只是由 CI 追加的派生产物，不是第二契约源；包只导出 `./contract`、`./identity`，只依赖 zod，无 workspaces、无安装脚本。
- ③：W-09 使用 `git+https://github.com/Pepgent/soroi.git#store-contract`，导入 `pepgent-store/contract`；契约更新后用 `npm update pepgent-store` 跟进。
- 本轮没有运行 `npm update`、删除既有锁或 fresh 安装 branch tip 来声称消费已更新。

当前源码也体现这个既定派生方式：`/tmp/gpt-d28-locked-contract.RbkaPm/source/.github/workflows/store-contract.yml:3-6,20-32,33-55` 从 main push 触发，复制主源两文件、写最小 manifest、追加并推送派生分支。这里只核其代码与当前分支结果，未审计 CI 历次运行或派生延迟。

### D23

直接读取 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D23-generation-type.md:21-22`。

[归档正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D23-generation-type.md)：

- D23-01：`AgentGenerationTransfer.generation` 是 D3 的 `Generation`（string），值为 Mux `mux_generation` 帧签发原值；store 保存不转换，schema 使用非空字符串；不改 D3、D4、Mux。
- D23-02：store 路径域写方为 W-06；W-07 按 string 实现自己的非 eval 唤醒，不以本次 store 修正为跨组件开工锁。
- 此处仅取决策表责任与类型正文，没有读取归档的其他席投票理由。

## C：锁定对象与当前主源

以下路径都可直接复读，`consumer/`、`source/`、`derived/` 分别是本轮从相应远端当前分支浅克隆得到的源码快照。

### 消费仓原锁

`/tmp/gpt-d28-locked-contract.RbkaPm/consumer/package-lock.json:80`：

```json
"pepgent-store": "git+https://github.com/Pepgent/soroi.git#store-contract"
```

同文件 `:14323-14328`：

```json
"node_modules/pepgent-store": {
  "version": "0.0.0",
  "resolved": "git+ssh://git@github.com/Pepgent/soroi.git#8a23e213c03b244914e7fdded28182f3eb0d0572",
  "dependencies": { "zod": "latest" }
}
```

原锁的 `node_modules/zod` 是 `4.5.4`，registry resolved 为 `https://registry.npmjs.org/zod/-/zod-4.5.4.tgz`。安装使用的是原锁的这个对象，不是临时解析 zod latest。

原锁获取方式：先以 GitHub `file_read(repo=Pepgent/Pepgent, branch=main, path=package-lock.json)` 读取远端，再浅克隆相同远端 main 供有界源码与锁闭包取证。未读取受保护的 Pepgent 根工程 checkout 业务文件。

### 实际 npm 安装后的锁定包

`/tmp/gpt-d28-locked-contract.RbkaPm/locked-install/node_modules/pepgent-store/contract.ts:5-8,85-89`：

```ts
const NameSchema = z.string().min(1);
const PositionSchema = z.number().int().nonnegative().safe();
export const TransferSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("EvalTransfer"), evalCall: NameSchema }),
  z.strictObject({ kind: z.literal("AgentGenerationTransfer"), agent: NameSchema, generation: PositionSchema }),
]);
```

安装器写出的 `/tmp/gpt-d28-locked-contract.RbkaPm/locked-install/node_modules/.package-lock.json` 也记录上述锁定 resolved，zod 为 `4.5.4`。这只是实际安装定位；决定性证据是下面的 schema 执行结果。

### 当前主源与派生分支

- `/tmp/gpt-d28-locked-contract.RbkaPm/source/packages/store/src/contract.ts:5,85-89`。
- `/tmp/gpt-d28-locked-contract.RbkaPm/derived/contract.ts:5,85-89`。

两处当前代码均为：

```ts
const NameSchema = z.string().min(1);
// TransferSchema 的 AgentGenerationTransfer variant：
generation: NameSchema
```

当前服务入口 `/tmp/gpt-d28-locked-contract.RbkaPm/source/packages/store/src/server.ts:144-146` 对 `POST /transfers` 先执行 `parse(TransferSchema, await jsonBody(request))`，再创建 transfer。`source/packages/store/src/transfers.ts:13-17` 将 kind 原样 JSON 持久化，`:20-22` 读回时按同一 schema 解析。这是源码调用关系，不冒充本轮已跑 HTTP/持久化。

### Mux generation 的真实格式依据

直接读取现有 Mux 源码：

- `/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux/src/serve/router.rs:533-544`：处理 `OpenGeneration` 时 `Uuid::new_v4()`，作为 `WriterFrame::Generation { generation: id, ... }` 发出。
- `/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux/src/protocol.rs:67-79`：`mux_generation`、`mux_attached`、`mux_exited` 的 generation 字段是 `Uuid`，帧用 Serialize 输出。

本轮运行输入使用对应的 UUID v4 连字符字符串格式。**没有启动 Mux，也不声称该具体 UUID 是 live Mux 实际签发。** 这里核验的是用户指定的真实 Mux generation 格式能否被两份精确 schema 接受。

## R：实际安装、输入与解析结果

### 实际命令

工作目录最初用 `mktemp -d /tmp/gpt-d28-locked-contract.XXXXXX` 获得。其下执行：

```sh
git clone --depth 1 --single-branch --branch main https://github.com/Pepgent/Pepgent.git consumer
git clone --depth 1 --single-branch --branch main https://github.com/Pepgent/soroi.git source
git clone --depth 1 --single-branch --branch store-contract https://github.com/Pepgent/soroi.git derived
```

三条 clone 均成功。没有查看 git 历史；`rev-parse HEAD` 只定位取回版本。

在 `locked-install/` 写入最小 probe manifest（仍声明原分支 spec），并写入**只裁掉无关 web/workspace 依赖**的原锁闭包：原 `node_modules/pepgent-store` 与原 `node_modules/zod` 两条锁记录保持原 resolved/依赖/registry 信息。原始完整 `consumer/package-lock.json` 保留，未删除或更新。安装命令：

```sh
# cwd: /tmp/gpt-d28-locked-contract.RbkaPm/locked-install
npm ci --ignore-scripts --no-audit --no-fund \
  --cache /tmp/gpt-d28-locked-contract.RbkaPm/npm-cache \
  > /tmp/gpt-d28-locked-contract.RbkaPm/install.log 2>&1
```

退出成功，`install.log:2` 原始输出：`added 2 packages in 3s`。

运行工具定位：Node `v26.12.1`、npm `11.20.0`、Bun `1.4.4`。这些是本轮环境，不是新增版本要求。

### 输入边界与运行方法

`locked-install/probe.ts` 直接导入：

```ts
import { TransferSchema as locked } from 'pepgent-store/contract';
import { TransferSchema as derived } from '../derived/contract.ts';
import { TransferSchema as source } from '../source/packages/store/src/contract.ts';
```

三者传入**同一个冻结对象**，没有转换、删除字段或另造映射：

```json
{"kind":"AgentGenerationTransfer","agent":"gpt-d28-agent","generation":"9d227408-04ad-4f72-9ca8-dda6aac11bfd"}
```

边界：variant 精确、agent 非空、generation 为 UUID v4 格式 string，无额外键。非数字输入不是异常输入，而是 D23 已规定的主路径 generation 类型。

运行命令：

```sh
# cwd: /tmp/gpt-d28-locked-contract.RbkaPm/locked-install
NODE_PATH=/tmp/gpt-d28-locked-contract.RbkaPm/locked-install/node_modules \
  bun run probe.ts \
  > /tmp/gpt-d28-locked-contract.RbkaPm/schema-runtime.jsonl 2>&1
```

`NODE_PATH` 使三份精确 schema 都使用这次原锁安装的 zod；没有改主源或派生分支文件。Bun 仅作 TypeScript 加载器，不据此声称已验证 Pepgent 的 Vite/tsc 构建或原生 Node 加载 `.ts` 支持。

### 可复现原始结果

`/tmp/gpt-d28-locked-contract.RbkaPm/schema-runtime.jsonl:2-4`：

```json
{"label":"consumer-locked","success":false,"issues":[{"expected":"number","code":"invalid_type","path":["generation"],"message":"Invalid input: expected number, received string"}]}
{"label":"store-contract-tip","success":true,"data":{"kind":"AgentGenerationTransfer","agent":"gpt-d28-agent","generation":"9d227408-04ad-4f72-9ca8-dda6aac11bfd"},"generationPreserved":true}
{"label":"store-main-source","success":true,"data":{"kind":"AgentGenerationTransfer","agent":"gpt-d28-agent","generation":"9d227408-04ad-4f72-9ca8-dda6aac11bfd"},"generationPreserved":true}
```

因此，“派生分支已修正”和“消费锁已跟进”不能互相代替；本轮前者通过实际解析，后者存在实际拒绝反例。

## C：Lab 当前消费边界

### 实际导入与读取

1. `consumer/apps/web/src/protocol/lab/external/store.ts:5-25,27-62` 从 `pepgent-store/contract` 导入/导出 RunGraph、RunSummary、Capture、NodeVersion、FunctionUsage 等；**完整 import/export 列表没有 TransferSchema 或 TransferKind**。
2. `consumer/apps/web/src/server/lab/library.ts:164-171`：`usage` 通过 `FunctionUsageSchema` 读 `functions/{fn}/usage`，`version` 通过 `NodeVersionSchema` 读 `versions/{version}`；`:185-196` 明确 `fetch → response.json → schema.safeParse`。
3. `consumer/apps/web/src/server/lab/operations.ts:107-130,133-150`：当前 nodes 页面读路径调用 library usage/version；该窗口其余列举页面仍走现有 not_supported，而非据静态页面 schema 就认为已接入 store 图读取。
4. `consumer/apps/web/src/server/lab/experiments.ts:6,94-107`：直接使用包的 `LifecycleEventSchema`，对 `GET stream/lifecycle?after=...` SSE 数据 `JSON.parse` 后 `.parse`；`runtime.ts:117-118` 在配置 storeUrl 时启动该订阅。
5. `consumer/apps/web/src/protocol/lab/catalog.ts:32-35` 与 `pages.ts:145-148` 虽声明 RunSummary/RunGraph wire shapes，不能把类型声明当成已接好的完整页面运行路径。

### 查找覆盖与结论限度

实际执行源码搜索：

```text
path = consumer/apps/web/src
pattern = pepgent-store|TransferSchema|AgentGenerationTransfer
```

返回的包直接引用只有 `protocol/lab/external/store.ts` 与 `server/lab/experiments.ts`；不存在 `TransferSchema` / `AgentGenerationTransfer` 匹配。随后定位 read callsites，读取完整 external/store 导入导出列表、library 真实解析代码、experiments 的 SSE 解析代码和 operations 的当前路由分派。搜索范围是当前 main 的完整 `apps/web/src`，而非只搜单个文件或以搜索器弱命中当不存在。

**判定边界：** Lab 当前确实通过第一方依赖消费契约，但所读 schema 并不使用 generation 字段。锁定包内错配是实际存在的潜伏副本偏差；若直接使用该锁定 TransferSchema 接受 Mux generation，会在 schema 边界拒绝（本轮已运行）。未证明 Lab 现有业务触发这个拒绝，也未声称任何容器入口的部署状态。

## 未覆盖与交接

- 未全量 `npm ci` web/workspaces；按授权仅安装 store 与其原锁 zod 闭包，不给全 Web 安装/构建结论。
- 未启动完整 Lab、浏览器、认证、生产容器、live Mux 或 store HTTP/DB；不把 host schema 探针称为真实容器入口/非 eval 唤醒 E2E。
- 未执行 `npm update pepgent-store`；没有观察更新后锁的结果，也不声称已修复消费锁。
- 未测非法/空 generation、数值旧输入、跨代历史数据迁移或其他 schema 演进；本轮只核同一个规定主路径输入。
- 未追查 CI 运行历史或谁最后维护消费锁，也未据版本差异归责具体会话。既定职责仅按 D16-15 / D23 报告。
- 远端状态可能在本轮获取后继续变化；结论绑定上述实际取回源码和输出。
- 父席可据此整合 C/R 和既定责任；本报告不裁决 D28 行文、不投票、不引入新机制。
