# U117–U120：仓 A / 仓 B 迁仓的独立现状与 caller 清单

## 1. 调查性质与取回范围

本报告只提供 GPT 产品全景席审议迁仓议案所需的事实副本；不选择新仓 owner、仓名，不投票，不起草迁移架构或执行方案。最后一次 GitHub 承载快照取于 **2026-11-02T01:02:41Z**；其后读到的 D53 正文版本为 v1。所有结论仅代表取回时刻。

- **(U)** 用户源头：本工作台 `LEDGER.md:63–66`（U117–U120）。U117 点名 D10 决策归档不等于迁仓完成、A2-02/A2-03 未建、旧 BLOCKED-A/B 与无人推进；U118 明确否定把管理层内部决议绕成等待用户决定。本报告不把旧等待文字认定为当前有效 blocker，也不为当事人免责。
- **(D)** 已通过边界：当前 [D10 / PM#16](https://github.com/Pepgent/PM/issues/16)、[D10 正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D10-repo-delivery.md)、[D16 / PM#25](https://github.com/Pepgent/PM/issues/25)、[D16-15 / PM#26](https://github.com/Pepgent/PM/issues/26)、[D18 / PM#28](https://github.com/Pepgent/PM/issues/28)。只读决策正文，没有读取其他产品全景席的选票、调查报告、会话或记忆。
- **(R)** 代码来源：`Pepgent/soroi`、`Pepgent/Pepgent`、`Pepgent/images`、`Pepgent/deploy`、`Pepgent/lab-library` 的当前 `main`，均经 GitHub `file_read` 取得；目录及当前 branch/PR/issue 状态经 GitHub API 取得。未进入无关 Pepgent 根 checkout，未读无关前端 PR4 的正文或 diff。
- 未改工程仓、未 commit/push、未创建仓或 issue、未运行测试/build/check、未连接生产或解密凭据、未用 hash 比对作证据。没有调查任何会话历史。
- 查找方式：先取各仓 current-main tree，再读已定位文件。Pepgent 的 GitHub code search 对已确认存在的 `pepgent-store` 也返回 0，故没有把该索引当“没有 caller”的证据；补以当前 main 文件直读：44 个 `apps/web/src/server/lab/*.ts`、13 个 `src/protocol/lab` 文件、4 个相关 API route 文件。不是对整个 Pepgent 前端进行审计。

## 2. 已定的三仓边界，而非待本席重选的设计

依据 D10-01A/B、02、03、10 及 D18-02：

| 对象 | 已定归属/产物 | 当前落点与证据 |
|---|---|---|
| 仓 A | store 常驻 HTTP 服务、持久化实现、公开 store contract/identity、服务镜像；服务代码不进入 B 的定制发行 tar | `soroi/packages/store/**`；[package.json](https://github.com/Pepgent/soroi/blob/main/packages/store/package.json)、[main.ts](https://github.com/Pepgent/soroi/blob/main/packages/store/src/main.ts)、[Dockerfile](https://github.com/Pepgent/soroi/blob/main/packages/store/Dockerfile) |
| 仓 B | `omp-soroi` 定制源码、节点 API、插件、agents/skills/rules、发行设置、builder、installer、release workflow、自己的根 manifest/lockfile/README | `packages/omp-soroi/**` 与下节根发行文件；[package.json](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/package.json) |
| `Pepgent/soroi` | 设计、领导工作台、统一 e2e、组装 compose；只消费 A 服务镜像与 B 的发行物 | [根 package.json](https://github.com/Pepgent/soroi/blob/main/package.json)、[e2e/package.json](https://github.com/Pepgent/soroi/blob/main/e2e/package.json)、[compose.yaml](https://github.com/Pepgent/soroi/blob/main/compose.yaml)、[compose.full.yaml](https://github.com/Pepgent/soroi/blob/main/compose.full.yaml) |

D10-02 已规定代码仓布局和安装布局分开：B 的源码放仓根，但发行内保留 `packages/omp-soroi` 安装布局，installer 的安装路径不变。D16-09 已规定迁出后 soroi 根 README/package.json/compose 归 W-08，workspaces 只剩 `e2e`。这不是本报告的新方案。

D10-04 规定按迁入时 main 快照接续，不以等待在途 PR 为前提；不能把“完整统一流程尚未通过”推断成已有实现无效或从零重做。D10-04 对历史已合 PR/评论不回写。

## 3. A 的入口、公开契约与 B 实际消费

### 3.1 A 自己拥有的内容

[packages/store/package.json](https://github.com/Pepgent/soroi/blob/main/packages/store/package.json)：

- 包名 `pepgent-store`；bin `pepgent-store -> ./src/main.ts`；`start -> bun src/main.ts`。
- 两个公开 subpath：`pepgent-store/contract -> src/contract.ts`、`pepgent-store/identity -> src/identity.ts`。
- 服务 runtime 依赖包括 `@duckdb/node-api`、`ulid`、`zod`；契约派生产物不是这份完整服务包的第二个状态源。
- [main.ts](https://github.com/Pepgent/soroi/blob/main/packages/store/src/main.ts) 从 `STORE_HOME/HOST/PORT` 启动服务，关闭时调用服务 owner 的 close；数据目录与对象/暂存数据属于 store，不属于 release builder。
- [Dockerfile:3–8](https://github.com/Pepgent/soroi/blob/main/packages/store/Dockerfile#L3-L8) 当前以 soroi 根为 context，硬编码 `WORKDIR /app/packages/store` 与 `COPY packages/store/package.json`、`COPY packages/store/src`。D10-02 已明确迁仓后 Dockerfile 按 A 仓根 context。
- [store README](https://github.com/Pepgent/soroi/blob/main/packages/store/README.md) 当前发布例子从 soroi 的 `origin/main` 导出，再以 `packages/store/Dockerfile` 发布 `pepgent/soroi-store:latest`。此“构建来源/context”是实际迁移接点；镜像既有名字不是新仓已创建或已迁出的证明。

### 3.2 当前 `store-contract` 是 A 源码的派生产物

[.github/workflows/store-contract.yml](https://github.com/Pepgent/soroi/blob/main/.github/workflows/store-contract.yml) 当前在 soroi main push 后：

1. 把 `packages/store/src/contract.ts`、`identity.ts` 复制到 `store-contract` branch 根。
2. 生成仅含 `./contract`、`./identity` exports 和 `zod` dependency 的最小 `pepgent-store` manifest，无 workspaces 或安装脚本。
3. 向同一远端的 `store-contract` 追加提交；分支是副本，不是契约第二源头。

分支当前 manifest 可直接见 [store-contract/package.json](https://github.com/Pepgent/soroi/blob/store-contract/package.json)。根 [soroi/package.json](https://github.com/Pepgent/soroi/blob/main/package.json) 已没有 D16-05 最初的临时 contract/identity exports；不能照旧 D16-05 摘要再“删除一次”不存在的导出。

[D16-15](https://github.com/Pepgent/PM/issues/26) 是根导出过渡方案的实际修订：A 建立后由 A 产出契约包，旧 soroi `store-contract` 分支停用。D53 对 A 如何继续派生产物的具体写法仍是待表决提案，不作为本报告已定事实。

### 3.3 B 当前生产代码只直接导入 `pepgent-store/contract`

[packages/omp-soroi/package.json](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/package.json) 当前 dependency 为 `pepgent-store: workspace:*`。生产源码的直接命中如下（均已从 GitHub main 直读确认）：

| caller | 入口与作用 |
|---|---|
| [`src/eval/store.ts:4–7`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/store.ts#L4-L7) | 从 contract 导入 HTTP 响应 schema、StepCommit/DeriveCommit/ReleaseRecord 等；`StoreClient` 以 `SOROI_STORE_URL` 请求服务，不嵌入 A 数据库 |
| [`src/eval/endpoint.ts:8`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/endpoint.ts#L8) | `ChangeSchema` runtime 导入 |
| [`src/eval/bundle.ts:7`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/bundle.ts#L7) | `NodeVersionRecord` type |
| [`src/eval/commit.ts:1`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/commit.ts#L1) | `Call/Capture/StepCommit` types |
| [`src/eval/control.ts:4`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/control.ts#L4) | `DeriveCommit/RunGraph` types |
| [`src/eval/execute.ts:21`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/execute.ts#L21) | `NodeVersionRecord` type |
| [`src/eval/reminder.ts:4`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/reminder.ts#L4) | `AtomState` type |

A 对外有两个 subpath，不等于 B 的生产代码已经消费两个。此次 `src` 字面扫描没有发现 B 生产代码导入 `pepgent-store/identity`；B 有自己的 [eval/hash.ts](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/hash.ts)。当前直接越包读 A identity 的位置是下文 `test/store-client.test.ts:4`。这里不评价或重设身份算法。

## 4. B 的产物、入口及 release 路径

### 4.1 产品入口和随迁内容

[packages/omp-soroi/package.json](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/package.json) 当前：

- `exports['.'] -> ./src/index.ts`，且 `omp.extensions = ['./src/index.ts']`：完整插件注册入口。
- `exports['./node'] -> ./src/eval/node.ts`：Lab 库的公开构造器入口；[node.ts](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/node.ts) 定义 `program/agent/human/file` 与 `File` 等类型。
- `files` 含 `src/agents/skills/rules`；`repository.url` 与 `repository.directory` 仍指向 soroi 的子目录，属于 D10-04⑥ 已列的迁移接点。
- 产品 agent/skill/rule 在 `packages/omp-soroi/{agents,skills,rules}`；不要与留在工作台的 `.omp/agents`、`.omp/skills` 混为一组。

按已定 D10-02 随 B 一起迁出的根发行文件：

| 文件 | 当前真实用途 |
|---|---|
| [`scripts/build-release.py`](https://github.com/Pepgent/soroi/blob/main/scripts/build-release.py) | 制作 `customization.tar`、`runner.js`、`boot.js`、manifest 和外层 release tar |
| [`scripts/install.ts`](https://github.com/Pepgent/soroi/blob/main/scripts/install.ts) | `--home` 与必填 `--artifact`；解包、恢复 runtime dependencies、写 `release.json`、`omp plugin link`、生成公开 launcher |
| [`.github/workflows/release.yml`](https://github.com/Pepgent/soroi/blob/main/.github/workflows/release.yml) | `bun install` 后执行 `python3 scripts/build-release.py --output /tmp/soroi-release`，上传名为 `soroi-release` 的 Actions artifact |
| [`.omp/settings/soroi.yml`](https://github.com/Pepgent/soroi/blob/main/.omp/settings/soroi.yml) | 发行 overlay；approvalMode 与 agentIdleTtlMs；不是领导工作台 agent 定义 |
| 根 manifest、lockfile、[`README.md`](https://github.com/Pepgent/soroi/blob/main/README.md) 的发行说明 | D10-02 要求 B 有自己的根文件；soroi 则保留/改为设计与组装说明，不是把 soroi 根目录整体搬走 |

### 4.2 当前 builder 的实际源路径与已定目标存在静态差异

[`build-release.py:161–184`](https://github.com/Pepgent/soroi/blob/main/scripts/build-release.py#L161-L184) 不是只打包插件：它遍历 `root/packages/*` 中每个带 manifest 的目录，收 manifest、README 与 `src/agents/skills/rules`，生成相应 workspaces，再收 `.omp/settings`。因此当前 main 会把 **store 服务源码也收入 customization**。这由代码路径直接得出，是静态事实；本调查没有实际构建 tar。

这与 D10-03、D18-02 执行附注“发行 tar 不含 store 服务实现，只带所需契约”不一致。不能把照搬当前 builder 视为已经满足既定发行边界。

其他明确路径：

- [`build-release.py:190–203`](https://github.com/Pepgent/soroi/blob/main/scripts/build-release.py#L190-L203) 从 `packages/omp-soroi/src/eval/{runner,boot}.ts` bundle 运行入口；B 仓根布局变化会影响这里。
- [`build-release.py:229–237`](https://github.com/Pepgent/soroi/blob/main/scripts/build-release.py#L229-L237) 外层成员是 `install.ts`、根 README、manifest、customization、runner、boot。builder 不读取 `e2e/`。
- [`install.ts:102–119`](https://github.com/Pepgent/soroi/blob/main/scripts/install.ts#L102-L119) 安装后固定取 `packages/omp-soroi` 注册，overlay 固定在 `.omp/settings/soroi.yml`；launcher 为 `$HOME/.local/bin/soroi`。D10-02 已明确这些发行内安装位置不随源码仓根变化而重选。

### 4.3 留在 soroi 的真实组装路径

- [`compose.yaml`](https://github.com/Pepgent/soroi/blob/main/compose.yaml) 的 store 当前既有 image，又有 `build.context: . / dockerfile: packages/store/Dockerfile`；D10-02 已规定迁出后只消费 A image。
- [`compose/central-entrypoint.sh`](https://github.com/Pepgent/soroi/blob/main/compose/central-entrypoint.sh) 从 `/release/soroi.tar` 解包，以同一 artifact 路径调用 installer，然后 exec 已安装公开 launcher；属于统一组装，不是 B 产品源码。
- [`compose.full.yaml`](https://github.com/Pepgent/soroi/blob/main/compose.full.yaml) 只给 central 追加 remote-home、Slurm runs 挂载；不是 store/插件本体。
- [`e2e/package.json`](https://github.com/Pepgent/soroi/blob/main/e2e/package.json) 当前 devDependency `omp-soroi: workspace:*`；源码迁走后这是需执行方处理的现存 workspace caller。
- **额外直接源码 caller：** [`e2e/install-check/verify.ts:8`](https://github.com/Pepgent/soroi/blob/main/e2e/install-check/verify.ts#L8) `import type { CallReport } from '../../packages/omp-soroi/src/eval/params.ts'`。即使它只是 type import，删除 packages 之后原相对路径也不再存在。不能仅改 `e2e/package.json` 而漏掉它。
- [`e2e/install-check/probe-node.ts:1`](https://github.com/Pepgent/soroi/blob/main/e2e/install-check/probe-node.ts#L1) 使用 `omp-soroi/node`；[`registration.ts`](https://github.com/Pepgent/soroi/blob/main/e2e/install-check/registration.ts) 则经公开 registry 找真实安装包根，二者消费性质不同。

## 5. 当前实际有四个直接启动 A 服务的 B 测试，不是旧清单的三个

| 当前 main 文件 | 直接跨域引用 |
|---|---|
| [`test/bundle.test.ts:6`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/test/bundle.test.ts#L6) | `../../store/src/server.ts` 的 `startService` |
| [`test/eval-supervisor.test.ts:3`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/test/eval-supervisor.test.ts#L3) | 同上 |
| [`test/store-client.test.ts:3–4`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/test/store-client.test.ts#L3-L4) | server 的 `startService`，以及 `../../store/src/identity.ts` 的 `contentHash` |
| **[`test/dry-run.test.ts:5`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/test/dry-run.test.ts#L5)** | **同样导入真实 `startService`**，正文实际启动服务、执行 evaluator、读回 transfer/object/run 结果 |

D10-02 当时列了前三个，且已定依赖真实 store 的跨组件测试归统一 e2e。第四个是现在的 caller 存量；本报告没有新写/运行测试，也不把测试数量当新验收门禁。

## 6. Pepgent 当前 main 的真实消费接点

### 6.1 Git contract dependency 与 lockfile

- [`apps/web/package.json`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/package.json)：`pepgent-store = git+https://github.com/Pepgent/soroi.git#store-contract`。
- [`package-lock.json:81`](https://github.com/Pepgent/Pepgent/blob/main/package-lock.json#L81) 记录声明地址；[`14344–14349`](https://github.com/Pepgent/Pepgent/blob/main/package-lock.json#L14344-L14349) 的 `node_modules/pepgent-store` 则以 `git+ssh://git@github.com/Pepgent/soroi.git#<resolved commit>` 记录实际解析来源。这只是 lock 的来源定位，不是完整性证据，也不是本席要求钉版本。
- [`scripts/third-party-closure.mjs:24`](https://github.com/Pepgent/Pepgent/blob/main/scripts/third-party-closure.mjs#L24) 的第一方例外当前按包名集合 `pepgent-store` 判断，并非这一行按 soroi URL 判断。需区分“依赖地址确实要迁”与“所有许可证脚本必然都要改”；本轮未在 `generate-third-party-notices.mjs` 找到独立的 `pepgent-store`/soroi 字面规则。

### 6.2 直接 contract callers

对本轮直读范围，直接导入/重导出均为 `pepgent-store/contract`：

| 文件 | 入口 |
|---|---|
| [`server/lab/store.ts:5`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/store.ts#L5) | runs、graph、compare、volume、value usage 与事件读取的权威 schema |
| [`server/lab/automation.ts:10`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/automation.ts#L10) | `LifecycleEventSchema`、`LifecycleEvent` |
| [`server/lab/experiments.ts:6`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/experiments.ts#L6) | `LifecycleEventSchema`、`RunEventSchema`、`LifecycleEvent` |
| [`protocol/lab/external/store.ts:4–43`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/external/store.ts#L4-L43) | store schemas/types 的集中引入、重导出；不是 Lab 重建契约 |

这些 import 名称与契约所有权是既有公共接点；本报告不要求因迁仓重写类型或复制 schema。

### 6.3 不能漏掉的真实发行构建 caller

**[`apps/web/scripts/lab-dev-release.mjs`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/scripts/lab-dev-release.mjs)**：

- 第 12 行硬编码 `https://github.com/Pepgent/soroi.git`；
- 在 `/tmp` clone 该仓 `main`，`bun install`，执行 `python3 scripts/build-release.py`；
- 解包后以同一 tar 传 `install.ts --home ... --artifact ...`，将 installer 输出的公开 launcher 交给 Lab；
- [`apps/web/package.json`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/package.json) 的 `lab:dev-release` 是用户可达入口；[`apps/web/README.md:265–268`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/README.md#L265-L268) 同时写死从 Pepgent/soroi main 构建。

因此 Pepgent 不是仅有 contract Git URL 一个迁移接点。删除 soroi 的 `scripts/build-release.py` 而不处理该 caller，会留下开发发行入口悬空。这是现存调用事实，不是新增功能。

### 6.4 节点 API 的源码解析消费者

[`server/lab/library-definition.ts:67`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/library-definition.ts#L67) 按源码 import specifier **`omp-soroi/node`** 识别 `program/agent/human`，不是按仓库 URL 查构造器。仓库迁移与包名/公开 subpath 改名不能混为一件事；本报告没有提议改这个公开入口。

## 7. images：两个不同的 soroi 接点不可一起换走

依据 [Dockerfile](https://github.com/Pepgent/images/blob/main/Dockerfile) 与 [README](https://github.com/Pepgent/images/blob/main/README.md)：

| 接点 | 当前真实消费 | 与三仓边界的关系 |
|---|---|---|
| `central` 的 named context `soroi` | `e2e-build` COPY 整份已提交 soroi 导出，再 `bun install --frozen-lockfile --production --filter soroi-e2e`；最终只复制 node_modules 与 e2e 到 `/opt/soroi` | e2e 留 soroi；这个 context 不是“插件源码来源”，不能因为 B 迁走就整体改成 B |
| `lab-web` 的 context `pepgent` | 编译 Pepgent 正式 production build | 仍由 Pepgent 源头拥有 |
| `lab-web` 的 context `store-contract` | bare repo，只读 bind 到 `/store-contract.git`；npm ci 的临时 GIT_CONFIG 把 `ssh://git@github.com/Pepgent/soroi.git` 和 `https://github.com/Pepgent/soroi.git` 都 insteadOf 到它 | 是 contract 源地址与 mirror 输入接点，需要与 Pepgent lock 的真实来源保持一致；不是部署期复制 schema |
| release / boot | README 指当前 soroi 的发行/`boot.js` 来源；镜像不烘焙发行 tar，运行时安装 | 来源描述应对照 B；不能把 `/opt/soroi/e2e` 当被测发行 |

README 的 lab-web 构建示例明确使用 `SOROI_SOURCE` fetch `store-contract`，再把该分支推到临时 bare repo，作为 `--build-context store-contract=...`。旧 lock 所指 commit 留在 branch 历史中，是当前构建输入设计；这里没有进行任何历史挖掘或 hash 验证。

镜像说明把三个对象分开：镜像构建时的 `/opt/soroi/e2e`、部署挂入的 `/release/soroi.tar`、installer 在 HOME 生成的定制/launcher。这三者现存生命周期不同，不是三份产品权威源。

## 8. deploy：镜像输入、tar 输入及活动声明范围

- [`komodo/syncs/central.toml`](https://github.com/Pepgent/deploy/blob/main/komodo/syncs/central.toml) 声明 `STORE_IMAGE=.../pepgent/soroi-store:latest` 与 `SOROI_RELEASE_TAR=[[PEPGENT_CENTRAL_RELEASE_TAR]]`。仓名迁移不等于镜像名或容器内 tar 挂载路径也必须改名。
- [`scripts/central.py::inject`](https://github.com/Pepgent/deploy/blob/main/scripts/central.py) 的 `variables --release <path>` 消费真实绝对 tar 路径，注入 `PEPGENT_CENTRAL_RELEASE_TAR`；脚本不从 soroi 构建发行，不自己替代 installer。
- [`stacks/pepgent-central/compose.yaml`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/compose.yaml) 从 `STORE_IMAGE` 启动独立 store，lab-web 只读挂同一个 tar 为 `/release/soroi.tar`。
- [`lab-entrypoint.sh`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/lab-entrypoint.sh) 每次启动解包 tar，调用真实 installer 的 `--home` 与 `--artifact`，然后 exec Node，PATH 暴露已安装 `soroi`；不直接引用源码插件路径。
- [`release-init.ts`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/release-init.ts) 只读 manifest 的 version/schemaVersion，以整个 tar 作 `PUT /releases/{version}` 请求体，接收 store 的 ReleaseRecord；拆组件/落对象归 store。
- [`release.compose.yaml`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/release.compose.yaml) 是发行导入叠加文件。当前 [central.toml](https://github.com/Pepgent/deploy/blob/main/komodo/syncs/central.toml) 的活动 `file_paths` 只有 `compose.yaml`，`config_files` 未含 release-init，故它**不是当前普通 preview/apply 已启用的活动初始化步骤**。这与 D10-14 的统一组装接入时点一致，不能以代码已在 main 声称已经运行。
- [deploy README](https://github.com/Pepgent/deploy/blob/main/README.md) 当前仍把真实 installer/store/release 归 soroi；来源描述是文档迁移接点。它还明确把本仓 `pepgent-deploy-sync` clone 当部署声明副本；该 clone 并非 store-contract mirror。contract 的 bare mirror 输入位于 images 构建链，二者不能混称。

## 9. lab-library：peer、13 个节点 caller 与开发说明

[package.json](https://github.com/Pepgent/lab-library/blob/main/package.json) 当前将 `omp-soroi: '*'` 列为 optional peer；optional 只表示库 dependency 安装可不装插件，不表示正式执行可以没有真实 Soroi。

下列 13 个当前 main 节点都直接 import **`omp-soroi/node`**，已经逐文件确认：

- [`nodes/anneal.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/anneal.ts#L2)、[`calc.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/calc.ts#L2)、[`compare_scores.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/compare_scores.ts#L2)、[`slow_step.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/slow_step.ts#L2)；
- [`run_gp.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_gp.ts#L2)、[`run_knn.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_knn.ts#L2)、[`run_lr.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_lr.ts#L2)、[`run_rf.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_rf.ts#L2)、[`run_svm.ts:2`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_svm.ts#L2)；
- [`ask_human.ts:1`](https://github.com/Pepgent/lab-library/blob/main/nodes/ask_human.ts#L1)、[`review.ts:1`](https://github.com/Pepgent/lab-library/blob/main/nodes/review.ts#L1)、[`text_only.ts:1`](https://github.com/Pepgent/lab-library/blob/main/nodes/text_only.ts#L1)、[`try_eval.ts:1`](https://github.com/Pepgent/lab-library/blob/main/nodes/try_eval.ts#L1)。

[README](https://github.com/Pepgent/lab-library/blob/main/README.md) 的真实开发说明还包含：`cd /path/to/soroi` 后安装、`bun packages/store/src/main.ts` 启独立服务、`-e /path/to/soroi/packages/omp-soroi` 加载插件包目录、底部 Soroi 节点 API blob URL。它们是 D10-04⑥ 已列的路径迁移接点；库节点、`.omp/agents`、worktree/merge 语义仍由库和 Lab 各自拥有，不随 B 整仓搬走。

## 10. 当前 open PR、遗留 branch 与执行承载

### 10.1 Open PR：当前没有范围内在途 PR

本轮分别调用五个目标仓的 `gh pr list --state open --limit 100`，读取 head/base/files；Pepgent 排除无关前端 PR4。soroi、images、deploy、lab-library 返回空，Pepgent 排除 PR4 后也返回空。最后快照再次取得 soroi/Pepgent 的同一结果。

不能继续复述 D16 当时“PR260、PR266 保持 OPEN”的当前状态：

- [soroi PR260](https://github.com/Pepgent/soroi/pull/260)：当前 **CLOSED、未 merge**；head `eng/install-check-224` 仍存在，compare main 结果 ahead=6、behind=302，变动路径为 README、bun.lock、`e2e/install-check/**`、`e2e/package.json`、`scripts/build-release.py`。这是要被盘点的遗留分支，不是仍 open 的执行承载，也不能据旧 PR body 的“保持 open”反推现状。
- [soroi PR266](https://github.com/Pepgent/soroi/pull/266)：当前 **MERGED**；head `test/235-a0-public-launcher` compare ahead=0。

### 10.2 Branch ancestry 不等于未交付功能

范围：列出五仓全部远端 branch 名；比较 soroi 当前 STO/SOR/CUS 与发行相关命名分支（旧 redesign、RiriAgent 旧架构、无关文档分支不作新设计依据），另抽查 e2e/A0 和其他仓下列直接消费接点。不读取 git 历史设计。

soroi 下列分支相对 main 仍 diverged，但对应 PR 当前都已 MERGED，因此不能据 ahead 数认定它们仍待工程恢复：

| branch | ahead / behind | 当前 PR |
|---|---:|---|
| `issue-209-eval-endpoint` | 2 / 142 | [PR314 MERGED](https://github.com/Pepgent/soroi/pull/314) |
| `issue-217-derive` | 1 / 136 | [PR317 MERGED](https://github.com/Pepgent/soroi/pull/317) |
| `issue-222-remote-agent` | 2 / 128 | [PR318 MERGED](https://github.com/Pepgent/soroi/pull/318) |
| `issue-228-remote-agent-stop` | 1 / 124 | [PR320 MERGED](https://github.com/Pepgent/soroi/pull/320) |
| `issue-229-remote-batches` | 1 / 125 | [PR319 MERGED](https://github.com/Pepgent/soroi/pull/319) |
| `issue-312-agent-lab-identity` | 1 / 145 | [PR313 MERGED](https://github.com/Pepgent/soroi/pull/313) |

额外抽查：

- soroi `issue-284-build-release`、`store-publish-342`、`eng/release-230`、`issue-283-install-artifact`、`issue-193-http-store-client`、`issue-190-durable-sse`、`e2e-330-a0-identity` 均 ahead=0。
- Pepgent `issue-44-lab-dev-release` ahead=1/behind=29，对应 [PR49 MERGED](https://github.com/Pepgent/Pepgent/pull/49)；`issue-60-store-contract-refresh` ahead=1/behind=22，对应 [PR61 MERGED](https://github.com/Pepgent/Pepgent/pull/61)。同样不当成待恢复切片。
- images `issue-14-store-contract-context`、deploy `issue-28-slurm-tags`、lab-library `issue-5-bundle-guidance` 均 ahead=0。
- `store-contract` 是 workflow 生成的 orphan 派生分支；GitHub compare main...store-contract 返回 no common ancestor。它不是“未合入产品 PR 分支”，其当前 manifest 已单独读取，不把 compare 失败算 migration blocker。

本报告没有访问工人本地 worktree 或进程；不对未读取的本地未提交修改作不存在断言。

### 10.3 当前议程与真正执行 issue 要分开

查询范围：PM 的 open issue 全部（limit 100，实际 6）；soroi 的 open issue 全部（实际 15）；images、deploy、lab-library 的 open issue 全部；Pepgent 的 open issue 标题/URL。对 soroi 的 open issue body 另按“迁仓/仓 A/仓 B/D10-01..04/BLOCKED-A/B/A2-02/A2-03”筛选，没有命中迁仓执行承载。

- [PM#16 D10](https://github.com/Pepgent/PM/issues/16) 已 CLOSED：正文第 62 行明确只是决策归档，不是代码、迁仓或 runtime 完成，不是执行总 issue。
- [PM#25 D16](https://github.com/Pepgent/PM/issues/25)、[PM#28 D18](https://github.com/Pepgent/PM/issues/28) 同样是 closed 决策；旧延期不是今天继续不建承载的理由。
- **已出现 [PM#72 D53 / P0](https://github.com/Pepgent/PM/issues/72)**，发起者 Coordination / DeskRepoMigrationP0。当前正文明确每行只是待表决提案，不表示迁仓完成。第 3–8 行提议 A2-02/A2-03、soroi 切换、消费方切换和总 issue，但截至取回时刻，这些仍是议案中的拟建承载，不是已经创建、派发并执行的工程 issue。
- [PM#71 D52 / P2](https://github.com/Pepgent/PM/issues/71) 是决议与执行责任闭环的治理议程，正文明确不替迁仓 P0 选 owner/仓名、不重复另立迁仓 issue；不能把它当 A/B 搬迁的实现 PR 或已完成执行总单。
- soroi 当前 open 的 [#321](https://github.com/Pepgent/soroi/issues/321)、[#322](https://github.com/Pepgent/soroi/issues/322) 是 council 工人总线，不是 A/B 产品迁仓。其余 13 个 open issue 是 DIST-02/A0/S1/E2E 工作；[DIST-02 #224](https://github.com/Pepgent/soroi/issues/224) 按 D10-04 留 soroi，本身不是 B 迁仓单。
- images、lab-library 无 open issue；deploy 仅 [#28](https://github.com/Pepgent/deploy/issues/28) Slurm tag；Pepgent 可见 open [#23](https://github.com/Pepgent/Pepgent/issues/23)、[#30](https://github.com/Pepgent/Pepgent/issues/30) 为统一验收，另有无关认证 [#3](https://github.com/Pepgent/Pepgent/issues/3)，均不是本轮 A/B 迁仓实现承载。

因此准确表述是：**迁仓已不是“没有议程”，当前已有真实 P0 决策议程；在上述取回范围内，尚未取得实际 A/B 迁仓执行 issue/PR。** 这不是仅凭 open 标题作出的“全 GitHub 永远无承载”断言，也不推定稍后不会创建。

## 11. 本席审议 D53 应对照的 caller 与已有完整性证据位置

这是存量索引，不新增验收要求，不要求工人逐 PR 跨仓全验。

| 审议对照项 | 当前已取得的证据位置 | 能/不能据此认定什么 |
|---|---|---|
| A/B 实现和入口是否完整接续 | 第 2–4 节的 manifests、src/main、index/node、product content、builder/install/workflow；第 10 节 branch/PR 状态 | 能定位当前应保全的实现与遗留分支；不能用 branch ahead 或旧 PR body 宣称功能缺失/已完成 |
| A contract 源与副本关系 | workflow、派生 manifest、Pepgent manifest/lock、images named context | 能识别源码源头与派生输入；不以 lock commit 或摘要比对认证迁仓成功 |
| B 与 A 的实际依赖 | 7 个生产 contract import、4 个真实 store 测试 | 当前不是只有旧决议列出的 3 个集成测试 |
| soroi 删除 packages 后的 caller | e2e workspace dependency、`install-check/verify.ts:8`、compose 本地 build、probe-node 的公开 node API | 这些都是真实路径接点；仅迁文件/改 manifest 不表示所有 caller 已接续 |
| Pepgent 开发发行入口 | `apps/web/scripts/lab-dev-release.mjs`、`lab:dev-release`、Web README | D53-06 当前只写 contract 依赖时，会漏掉真实 clone/build 入口 |
| images 两路上下文 | Dockerfile 的 e2e-build 与 web-build，README 的 Git 导出/bare mirror 输入例子 | central e2e 来源与 contract mirror 来源不是同一迁移动作 |
| deploy 真实消费 | tar mount、entrypoint、release-init、active central.toml | 当前 release-init 代码在 main，但未纳入活动 Stack；该既定组装时点不能被“迁仓完整性”偷偷前移 |
| library/静态 parser 的包契约 | 13 个节点、optional peer、Lab `library-definition.ts` 字面识别 | repo URL 与 `omp-soroi/node` 公共入口不是同一层，不能把位置迁移无意扩大为公开 API 重命名 |
| 既有运行证据格式与执行位置 | [`e2e/install-check/verify.ts`](https://github.com/Pepgent/soroi/blob/main/e2e/install-check/verify.ts)、[`e2e/pty/README.md`](https://github.com/Pepgent/soroi/blob/main/e2e/pty/README.md)、[`e2e/README.md`](https://github.com/Pepgent/soroi/blob/main/e2e/README.md)、[A0 #235](https://github.com/Pepgent/soroi/issues/235)、[S1 #182](https://github.com/Pepgent/soroi/issues/182)、[E2E-21 #23](https://github.com/Pepgent/Pepgent/issues/23)、[E2E-20 #30](https://github.com/Pepgent/Pepgent/issues/30) | 是已有真实流程/持久结果应从何处读取的索引；本报告未运行它们，不声称通过，更不要求每个迁仓微步骤先跑全套 |

**供父席特别留意的现存遗漏，不是本席另起设计：**

1. 当前真实 store 集成测试有第四个 `dry-run.test.ts`。
2. e2e verifier 有越目录的私有 `CallReport` type import。
3. Pepgent `lab-dev-release.mjs` 仍 clone soroi 并调用即将迁出的 builder。
4. 当前 release builder 仍把完整 store 源码打入 customization，与既定“只带契约、不带服务”边界不同。
5. `eng/install-check-224` 仍存在而 PR260 已关闭未合；其他多个 diverged 分支的 PR 已合，不能混判。
6. 当前 D53 是 open P0 决策承载，不能再说“无议程”；拟建执行总单/子单也不能提前算已建已执行。

本调查的完整交付是上述实证接点与源位置。没有认证迁仓完成，没有用 hash 证明完整性，没有引入锁、补偿、dual-write、兼容层或新的验收门禁。父席保留议案判断、架构理解、投票和记忆更新。
