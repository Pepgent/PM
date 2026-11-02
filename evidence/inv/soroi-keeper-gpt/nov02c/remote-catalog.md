# Nov02c：deploy → remote templates → Lab readTemplates 真实目录金丝雀

调查员：SoroiKeeperGpt-2.RemoteCatalogCanaryNov02c。取证窗口：2026-11-02 00:17–00:26Z（最后一项精确运行时结果见文末补充）。仅调查相邻接口，不是统一完整 E2E。

## 1. 结论与分类

**当前 main 的目录主路径已真实贯通；共享 lab-web 的 Slurm image 解析失败属于旧运行产物边界，而不是当前 deploy/remote/Lab main 双方协议错配。**

- `(R)` 当前 deploy main 的未改 `remote-home.mjs`，由独立一次性容器在真实 `/run/config` 输入路径执行，正常生成目录与自己的短生命周期 runtime credentials；没有拦截任何 fs/凭据写入，也没有重写生成函数。
- `(R)` 从当前 remote main 本机源码构建的 CLI，读取上述真实生成目录，连接既有隔离 registry 与 Komodo Core，`templates` exit0，返回 `infra-slurm-check`、`soroi-komodo`、`soroi-slurm` 三项。
- `(R)` 当前 Lab main 的真实 `readTemplates` 函数经其未改 `execFile('remote',['templates'])`、JSON 解析和当前 `TemplateWireSchema`，返回 `ok:true`、3 项，所有 metadata 均被真实 schema 接受。不是直接把固定 JSON 喂给一个替代 parser。
- `(R)` 共享 `pepgent-central-lab-web` 内的现有 binary 仍报原始 `Slurm image must be docker://<repository>@sha256:<digest>, not a tag or SIF path`；其非秘密 live catalog 已经是当前裸 `:latest` 声明。新建容器或更换 Lab 应用代码不意味着其 vendored remote 已升级。
- `(R)` 当前 lab-library 的 13 个真实定义，经当前 Lab 的 `readNodeDefinitions`、`NodeDefinitionSchema` 和 `defaultTemplate` 读取/投影，全部 `defaultEnvironment:null` → `central`。3 个 Agent 定义的 `template` 分别为源码表达式 `"review"`、`"text_only"`、`"try_eval"`，**不是 remote 模板名**，不应因它们不在 remote catalog 而报缺失。
- 没有发现本次目录路径的“缺实现”或外部 registry 故障。**不声称 Slurm/Apptainer 启动、step 镜像拉取、正式作业、GUI 登录或整个用户流程已通过。**

## 2. 源头、版本与授权边界

本轮先读工作台 `AGENTS.md`、`LEDGER.md` U91–U97、`.omp/agents/soroi-keeper-gpt.md`，以及工程 clone 中实际存在的 `AGENTS.md`。remote 仓根没有 `AGENTS.md`。未读取或联系另一产品守护席的任意会话、报告或记忆；未触碰无关 Pepgent 根 checkout。

原始问题向 GitHub 重取：<https://github.com/Pepgent/deploy/issues/28>。本轮返回 **CLOSED/COMPLETED**，更新于 `2026-11-02T00:17:07Z`。其关闭不作为 runtime 证据；原文记录的旧 binary 失败完整保留。D11-10 原文读取于 <https://github.com/Pepgent/PM/blob/main/evidence/decisions/D11B-solo-ruling-review.md>：配置允许裸 tag/digest，目录读取解析 body image identity；作业运行时原样把引用交 Apptainer。没有自行增加部署/身份机制。

所有产品仓均从 GitHub 新取到独占 `/tmp/gpt-nov02c-remote-catalog/`：

| 源码对象 | GitHub 取回位置 | 当时 revision（只定位源码，不作 hash 验证） |
|---|---|---|
| deploy main | `deploy/` | `9e2d09cee0ac94e3ca49b8b9a7064e8edf66afd3`，2026-11-02T09:17:05+09:00，合入 tag 声明 |
| remote main | `remote/` | `a2ee4a8099d732b6317432fd0cf03507cf23dcf2`，2026-11-01T23:09:34+09:00 |
| Pepgent main | `lab/` | `67dea015adf03ab5ddc25483e6d7afc818f03582`，2026-11-02T08:45:32+09:00 |
| lab-library main | `library/` | `d0dd4a600a155e7ede57d3c23da0ead1403f8e14` |
| Lab 已声明的实际 npm 依赖 `pepgent-store` | `store-contract/`，soroi 的 `store-contract` 分支 | `ceaaf06436bf264650b0a38ec40239bcf0789ea5`；仅满足当前 Lab package.json 明确的运行依赖，没有改 dependency/contract，没有拿未合新产品实现替代 main |

本轮没有源码内容 hash 比对，没有以 OCI digest/commit 相等判通过。原始 wire/log 中包含产品正常输出的 identity 字段，不把它们当测试校验机制。

## 3. 实际源码接线（可按路径行号独立重取）

### deploy 输入与生成器

- `deploy/stacks/pepgent-central/slurm.toml:1-26,28-51`：两个 Slurm preset，body `pepgent-registry.orb.local:5000/pepgent/omp-agent:latest`、step `…/remote-step:latest`；完整 metadata 声明存在。
- `deploy/stacks/pepgent-central/remote.toml:1-26`：registry HTTP exception、`soroi-komodo` 的 Core/Stack 与 metadata。
- `deploy/stacks/pepgent-central/remote-home.mjs:4-8`：必须有 `REMOTE_HOME`、Komodo key/secret、Slurm JWT；缺少则失败。
- 同文件 `:12-15`：实际读 `/run/config/remote.toml` 与 `/run/config/slurm.toml`；只对 Slurm `shared_root` 做产品已有的 `/srv/pepgent-runs` → `/srv/pepgent-slurm-runs` 替换，然后写 `config.toml`。
- 同文件 `:17-24`：产品正常写临时 credentials，0600，再 rename。
- `compose.yaml:100-109,144-152,170-178`：生产部署的 owner→env→generator 接线及 config mount。`lab-entrypoint.sh:10-11` 以 Bun 执行生成器后 unset 入口 env。
- `deploy/scripts/slurm.py:29-70` 是刷新 JWT、更新 Variable、preview/apply 和 standalone 投影入口。**本轮没有调用该有共享副作用的刷新/部署入口**，所以不冒称它的 apply/readiness 验收通过。

### remote loader、真实依赖与 metadata

- `remote/src/home.rs:112-138,219-228`：`REMOTE_HOME` 选择目录，真实 TOML loader 解析 config 与 credentials。
- `remote/src/ops.rs:34-36`：目录操作只走 identity/templates，不走 `run`。
- `remote/src/model.rs:182-211`：`OciImage` 接受真实裸 OCI 引用；当前源码的错误文案为 `invalid OCI image reference ... without docker:// or a SIF path`，不是 deployed binary 的旧文案。
- `remote/src/identity.rs:71-110,126-149`：Slurm body 引用经真实 registry client 解析；metadata.image 保留声明原文。目录路径不拉取/运行 body 或 step。
- 同文件 `:156-223`：由模板执行配置派生 endpoint、CPU、内存、工作 mount，合入声明 metadata。
- 同文件 `:254-319`：按真实配置遍历各后端，再构造 `TemplateInfo`。
- `remote/src/backend/komodo/identity.rs:21-35` 与 `api.rs:1-3`：Komodo 目录身份读取使用 Core `POST /read`，`GetStack` / `ListVariables`，认证走消费方已有 credential；没有 Stack write/execute。

### Lab consumer 与关联语义

- `lab/apps/web/src/server/lab/remote.ts:19-44`：真实 `execFile`→JSON→schema；没有将 remote 的内部 stderr 原文泄露为 UI 错误。
- `lab/apps/web/src/protocol/lab/pages.ts:88-90`：`TemplateWireSchema = TemplateInfoSchema`。
- `lab/apps/web/src/protocol/lab/external/remote.ts:39-72`：metadata 的 devices/image/mounts/resources，TemplateInfo 的 name/backend/mount/description/identity/metadata。
- `lab/apps/web/src/server/lab/library-definition.ts:15-38,113-137`：真实静态导出构造器选项的原始 TS 表达式，`env`→defaultEnvironment，Agent `template`→agent definition 引用。
- `lab/apps/web/src/protocol/lab/library.ts:28-37`：`defaultEnvironment` 是节点默认 remote 环境的表达式；`template` 是 omp agent definition，不参与 remote 名字 join。
- `lab/apps/web/src/client/services/lab/project-common.ts:16-26`：只对完整字符串 literal 的 defaultEnvironment 做名字精确关联；null 返回 central。

## 4. 真实运行与完整日志

### 4.1 新取源码与构建

```sh
mkdir -p /tmp/gpt-nov02c-remote-catalog
git clone --depth 1 --branch main https://github.com/Pepgent/deploy.git /tmp/gpt-nov02c-remote-catalog/deploy
git clone --depth 1 --branch main https://github.com/Pepgent/remote.git /tmp/gpt-nov02c-remote-catalog/remote
git clone --depth 1 --branch main https://github.com/Pepgent/Pepgent.git /tmp/gpt-nov02c-remote-catalog/lab
# cwd=/tmp/gpt-nov02c-remote-catalog/remote
cargo build --locked > /tmp/gpt-nov02c-remote-catalog/build-remote.log 2>&1
```

实测构建 exit0：`Finished dev profile [unoptimized + debuginfo] target(s) in 2m 51s`。CLI 实际执行路径固定是本次构建的 `/tmp/gpt-nov02c-remote-catalog/remote/target/debug/remote`，不使用已安装旧 remote。

consumer harness 仅安装实际运行依赖，不修改 Lab 源码，不建立伪模块：

```sh
npm install --prefix /tmp/gpt-nov02c-remote-catalog zod tsx --ignore-scripts --no-audit --no-fund
npm install --prefix /tmp/gpt-nov02c-remote-catalog typescript --ignore-scripts --no-audit --no-fund
git clone --depth 1 --branch store-contract https://github.com/Pepgent/soroi.git /tmp/gpt-nov02c-remote-catalog/store-contract
npm install --prefix /tmp/gpt-nov02c-remote-catalog /tmp/gpt-nov02c-remote-catalog/store-contract --ignore-scripts --no-audit --no-fund
```

`store-contract/package.json:4-10` 真正导出 `./contract`→`contract.ts`，并依赖真实 zod；不使用替代 schema。

### 4.2 现有隔离资源与直接下游读取

创建前已读取 `~/Ext/work/orbstack/`、`pepgent-central.md`、`pepgent-images.md`，实际运行 `docker ps -a` 和 `orb list`。复用已有 registry/Core 与已存在的 lab-web 本地 image；没有建 VM、共享依赖、网络或卷。`node:current` 和 `lab-web:latest` 两个未命中本地 image 的检查失败后，没有拉取或启动它们；实际运行 host image 从现有 container 的 `docker inspect --format '{{.Image}}'` 取得，仅作 Bun/Node 宿主，不冒充 source-built remote。

实际直读命令：

```sh
curl --silent --show-error --max-time 15 \
  -D /tmp/gpt-nov02c-remote-catalog/registry.headers \
  http://pepgent-registry.orb.local:5000/v2/pepgent/omp-agent/manifests/latest \
  -H 'Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.list.v2+json' \
  -o /tmp/gpt-nov02c-remote-catalog/registry.json
curl --silent --show-error --max-time 15 \
  http://pepgent-komodo-core.orb.local:9120 \
  -o /tmp/gpt-nov02c-remote-catalog/core-home.html
```

registry 响应 `HTTP/1.1 200 OK`，`Content-Type: application/vnd.oci.image.index.v1+json`、856 bytes。完整 headers/body 分别保存在上述两个文件。Core 根页面 curl 仅是可达性辅助，不作为 authenticated catalog 成功证据；后者来自 source-built remote 的真实成功返回。没有替换远端响应、mock registry、假 Komodo Stack 或假模板。

### 4.3 完整 driver 与实际消费命令

完整、可重新执行的 driver：`/tmp/gpt-nov02c-remote-catalog/catalog-driver.py`。完整 consumer：`/tmp/gpt-nov02c-remote-catalog/consume.ts`。两者没有任何 secret literal。driver 的严格流程：

1. 从既有隔离 standalone consumer owner `~/Ext/work/orbstack/pepgent-soroi-e2e/remote-home/credentials.toml` 读取所需三个字段，仅在进程内作为 env 注入；不复制个人 HOME、不解密 SOPS、不读取 agent.db、不打印值。
2. 生成器自身在独占 `/tmp/.../generated-home` 写自己的 runtime credentials，不拦截写入。container env 用 `-e NAME` 转交值，命令行/日志无凭据。
3. driver 依次执行以下真实入口；PATH 的唯一调整是使 Lab 的 `remote` 解析到本次 build。
4. 不论失败成功，finally 对临时 `credentials.toml` / `.new` 清空并 chmod0600；本轮最终是 `0 bytes 600`。共享 owner 文件只读、未改变。

最终实际调用结构（实际 image selector 由只读 inspect 获得，原样完整 argv 保存在 driver 日志首行）：

```sh
docker run --rm --pull=never \
  --name gpt-nov02c-remote-catalog-generator \
  --network none --read-only --cap-drop ALL --user 501:20 \
  --mount type=bind,source=/tmp/gpt-nov02c-remote-catalog/deploy/stacks/pepgent-central,target=/run/config,readonly \
  --mount type=bind,source=/tmp/gpt-nov02c-remote-catalog/generated-home,target=/canary-home \
  -e REMOTE_HOME=/canary-home \
  -e REMOTE_KOMODO_KEY -e REMOTE_KOMODO_SECRET -e REMOTE_SLURM_JWT \
  --entrypoint bun '<existing local lab-web image>' /run/config/remote-home.mjs

# 下面均由 driver 设置 REMOTE_HOME=/tmp/gpt-nov02c-remote-catalog/generated-home
# PATH=/tmp/gpt-nov02c-remote-catalog/remote/target/debug:$PATH
/tmp/gpt-nov02c-remote-catalog/remote/target/debug/remote templates
/tmp/gpt-nov02c-remote-catalog/remote/target/debug/remote schema
/tmp/gpt-nov02c-remote-catalog/node_modules/.bin/tsx /tmp/gpt-nov02c-remote-catalog/consume.ts
```

实际 consumer 核心代码是：

```ts
import { readTemplates } from './lab/apps/web/src/server/lab/remote.ts';
import { TemplateInfoSchema } from './lab/apps/web/src/protocol/lab/external/remote.ts';
async function main() {
  const result = await readTemplates(new AbortController().signal);
  // 保存真实结果；失败设置非零退出。
  // 成功时对每个真实条目再次输出 TemplateInfoSchema.safeParse(entry).success。
}
```

Node-host 的完整成功链日志：`catalog-driver.third.log`，最终对齐部署的 Bun-host 链日志：`catalog-driver.bun.log`。每条实际 argv、exit、stdout、stderr 都在日志中。独立原始输出：

- `generator.stdout` / `.stderr`
- `remote-templates.stdout` / `.stderr`
- `remote-schema.stdout` / `.stderr`（CLI schema 原样完整输出）
- `lab-consumer.stdout` / `.stderr`
- `lab-readTemplates.json`（真实 OperationResult，包含完整三项）
- `generated-home/config.toml`（非秘密生成产物）

所有相对文件均位于 `/tmp/gpt-nov02c-remote-catalog/`。精确路径注入、credential生命周期与宿主区别均在此明确列出，不把这些探针与正式 Web/Slurm 作业拼成完整 E2E。

### 4.4 真实输出的关键信息

```text
RESULT generator exit 0
[remote-home] catalog and private credentials refreshed
RUNTIME_HOME {"directoryMode":"0o700","credentialsMode":"0o600","credentialsPresent":true}
RESULT remote-templates exit 0
RESULT remote-schema exit 0
RESULT lab-consumer exit 0
{"ok":true,"count":3,...}
CLEARED credentials.toml bytes 0
CLEANUP no credential values retained; no job commands invoked
```

三项共有 `metadata.image = pepgent-registry.orb.local:5000/pepgent/omp-agent:latest`、`devices:[]`、`mounts:[{path:'/work',access:'rw'}]`，Lab schema 全部通过。其余关键字段：

| name | backend | cpu / memoryGiB / gpu | diskGiB / maxRuntimeHours | priority / allowPreemptible | boundClusters 与 primaryCluster |
|---|---|---|---|---|---|
| infra-slurm-check | slurm | 1 / 0.5 / 0 | 1 / 0.25 | low / true | `http://pepgent-slurm-test.orb.local:6820/slurm/v0.0.44` |
| soroi-komodo | komodo | 1 / 1 / 0 | 10 / 2 | normal / false | `http://pepgent-komodo-core.orb.local:9120` |
| soroi-slurm | slurm | 1 / 0.5 / 0 | 10 / 2 | normal / false | `http://pepgent-slurm-test.orb.local:6820/slurm/v0.0.44` |

三项都 `selector:null`、`deviceAccess:false`、`outboundNetwork:true`。真实 wire 同时返回产品的 identity.image/config；本调查没有对它们计算或比对 hash。

## 5. defaultEnvironment / template 关联：实测与未覆盖

```sh
git clone --depth 1 --branch main https://github.com/Pepgent/lab-library.git /tmp/gpt-nov02c-remote-catalog/library
/tmp/gpt-nov02c-remote-catalog/node_modules/.bin/tsx /tmp/gpt-nov02c-remote-catalog/bindings.ts \
  > /tmp/gpt-nov02c-remote-catalog/bindings.log 2>&1
```

`bindings.ts` 原样调用当前 Lab `readNodeDefinitions(root,实际nodes路径)`，将全部返回值走 `NodeDefinitionSchema.parse`，并对刚才真实 remote catalog 的 `TemplateInfoSchema.array().parse` 结果调用产品 `defaultTemplate`。不是手写替代默认值。

结果 exit0，13 个真实定义：anneal、ask_human、calc、compare_scores、review、run_gp、run_knn、run_lr、run_rf、run_svm、slow_step、text_only、try_eval，全部 `defaultEnvironment:null`、`binding:'central'`、`matchedRemote:null`。3 个 Agent 的 `template` 保留带引号的源表达式；其余 template:null。完整结果：`bindings.log` / `library-bindings.json`。

**当前真实库没有声明 remote defaultEnvironment literal，因此本轮没有“真实库节点正向绑定 soroi-slurm”的 runtime 样本；不造节点、不改库、不为补覆盖而冒称已测。** 当前关联逻辑与真实库字段能正常消费，但不证明用户后来指定远端 env 的整个执行流程。

## 6. 共享 lab-web 旧运行产物：只读定位

本轮没有改、重启或进入其持久 DB。实际只读命令：

```sh
docker inspect --format '{{.Created}} {{.Config.Image}}' pepgent-central-lab-web
docker exec pepgent-central-lab-web sh -c \
  'remote --version; stat -c "%y %s %n" /usr/local/bin/remote; remote templates'
docker exec pepgent-central-lab-web cat /var/lib/pepgent/remote/config.toml
```

观察到容器创建时间 `2026-11-02T00:17:24.876241791Z`；binary 输出 `remote 0.1.0`，时间/大小 `2026-11-01 05:27:07.000000000 +0000 12441336 /usr/local/bin/remote`。版本字符串不包含源码 revision，**不能确认它精确来自哪个 commit**；“05:27前后旧发行”只作时间与行为定位，不把 mtime 等同源码版本。

原始 stderr：

```text
remote: invalid TOML in /var/lib/pepgent/remote/config.toml: TOML parse error at line 55, column 1
   |
55 | [templates.infra-slurm-check]
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Slurm image must be docker://<repository>@sha256:<digest>, not a tag or SIF path
```

终端完整原始记录：`term://1-fad2be95-1646-4011-a53b-b497fa30294b`；底层保留日志 `/var/folders/8w/2m72zhg91gq6cr9_ngx6l0q40000gn/T/pi-unified-exec-93633-1-bb7b3d02.log`。这次重读是新 main 已换 tag 后为确定运行产物边界，不是因怀疑原报告而重复验旧路径。

live 非秘密 config 的实际读取见 `term://2-27c1634b-18cc-4048-8dd5-f132ae9edd1e`：两个 Slurm preset 均 body/step `:latest`，完整 metadata 存在，shared_root 是产品生成器投影的 `/srv/pepgent-slurm-runs`。因此新声明已经抵达 live consumer，而其 binary 在进入 registry 身份读取前的 TOML image parser 就失败。

额外向当前 GitHub `Pepgent/images` main 读取 `Dockerfile`（`xd://github file_read`，不依赖本地工程 checkout）：`ARG REMOTE_IMAGE=…/remote-step:latest`，`remote-client` 从该 stage `COPY /usr/local/bin/remote`，lab-web 继承此链。**这是发布/重建载体关系，不是 remote source main 已自动进入现有 lab-web 的证明。** 本轮不发布 image、不修部署、不立案，后续由父席裁决。

## 7. 失败保留与恢复范围

1. 首轮 harness 在自身 `consume.ts` 的顶层 await 处失败：`Top-level await is currently not supported with the cjs output format`。原错保留 `lab-consumer.first.stderr` 与 `catalog-driver.log`；产品 remote/generator 当轮已经 exit0。修复仅是将临时 harness 包进 async main，不改产品。
2. 次轮进入真实 Lab imports 后失败：`Cannot find module 'pepgent-store/contract'`，来自真实 `external/store.ts → catalog.ts → pages.ts → remote.ts` import 链。原错保留 `lab-consumer.second.stderr` 与 `catalog-driver.second.log`。随后取当前 Lab 明确声明的真实 store-contract 包，不写 stub、不跳过 pages.ts。
3. 补齐实际依赖后，从 generator→remote→真实 Lab consumer 完整重跑，第三轮全部 exit0。再将宿主从 Node 对齐 `lab-entrypoint.sh` 的 Bun，最终链日志独立保留，不覆盖先前失败记录。
4. `node:current` / `lab-web:latest` 本地 image 名未找到，仅是宿主选择查询；没有外部 registry 失败，也没有通过拉取旧 latest 隐藏问题。

## 8. 覆盖、限制与生命周期闭环

| 项目 | 本轮结论 |
|---|---|
| 最新 deploy config → 未改真实 generator | 覆盖；真实输入路径/声明，产品正常写 runtime 文件 |
| generator→source-built remote 的实际 TOML loader | 覆盖；真实目录、真实 credential loader |
| 真实隔离 registry + Komodo 源模板 | 覆盖；返回三项，不使用假响应 |
| remote→当前 Lab readTemplates /权威模板schema | 覆盖；实际子进程入口，不是只对 JSON 文件解析 |
| metadata 必要字段 | 覆盖；完整 Table/输出文件见上 |
| 真实库默认字段→当前 Lab 静态导出与投影 | 覆盖；13个 null→central；无正向远端 literal 样本 |
| 共享 lab-web vendored remote | 只读定位；当前仍旧 parser 错误，不声称已修 |
| scripts/slurm.py 的 refresh/preview/apply | 未运行，避免共享环境修改 |
| Slurm JWT 认证/调度、Apptainer、step pull、作业/清理 | 未运行且不在本片目录读取范围；credentials存在不等于其Slurm JWT已通过验证 |
| Web浏览器/UI/完整用户流程 | 未运行，不拼探针冒称 E2E |

自有资源登记：`~/Ext/work/orbstack/gpt-nov02c-remote-catalog.md`。容器每次 `--rm` 自行退出，无端口/网络/卷/服务。已观察 `docker ps -a --filter name=gpt-nov02c-remote-catalog-generator --format '{{.Names}} {{.Status}}'` 无行；`stat -f '%z bytes %Lp %N' .../generated-home/credentials.toml` 输出 `0 bytes 600 ...`。最终 driver 再次 finally 清空。

未改产品、未写评论/issue/PR、未拷贝 agent.db/生产凭据、未解密 SOPS、未重启任何共享环境。保留的 /tmp 源码、driver、非秘密 config 与完整日志属于本轮可复现证据；运行凭据内容不保留。

## 9. 最终精确运行时结果与可重建 driver

最终 `python3 /tmp/gpt-nov02c-remote-catalog/catalog-driver.py > /tmp/gpt-nov02c-remote-catalog/catalog-driver.bun.log 2>&1` **exit0**。该日志 `:1` 的实际 argv 是 `--entrypoint bun`（非 Node），`:2` generator exit0，`:6` remote-templates exit0，`:118` remote-schema exit0，`:1212` lab-consumer exit0，`:1214-1215` `ok:true,count:3`，`:1312` 临时 credentials 清空为0 bytes。最终资源查询仍无容器，credentials `0 bytes 600`。

下列完整脚本可从本报告重新创建，不需要任何日志中的 secret。先执行第4节 clone/install/build 命令；先完成 ledger 登记和资源检查，再保存并运行这些脚本。owner credential 来源必须仍是隔离环境现有消费方，不改成个人或生产 credential。若 owner 来源或隔离依赖已不存在，则记录环境缺口，不伪造响应。

### catalog-driver.py

```python
from pathlib import Path
import json
import os
import subprocess
import tomllib

ROOT = Path('/tmp/gpt-nov02c-remote-catalog')
HOME = ROOT / 'generated-home'
OWNER = Path.home() / 'Ext/work/orbstack/pepgent-soroi-e2e/remote-home/credentials.toml'
HOME.mkdir(mode=0o700, exist_ok=True)
HOME.chmod(0o700)
owner = tomllib.loads(OWNER.read_text())
core = owner['komodo']['http://pepgent-komodo-core.orb.local:9120']
slurm = owner['slurm']['http://pepgent-slurm-test.orb.local:6820/slurm/v0.0.44']
env = dict(os.environ)
env.update(REMOTE_KOMODO_KEY=core['key'], REMOTE_KOMODO_SECRET=core['secret'], REMOTE_SLURM_JWT=slurm['token'])

def run(label, args, environment=None):
    print('COMMAND', label, json.dumps(args), flush=True)
    completed = subprocess.run(args, env=environment, text=True, capture_output=True, timeout=150)
    (ROOT / f'{label}.stdout').write_text(completed.stdout)
    (ROOT / f'{label}.stderr').write_text(completed.stderr)
    print('RESULT', label, 'exit', completed.returncode, flush=True)
    print(completed.stdout, end='', flush=True)
    print(completed.stderr, end='', flush=True)
    return completed

try:
    image = subprocess.check_output(['docker', 'inspect', '--format', '{{.Image}}', 'pepgent-central-lab-web'], text=True).strip()
    command = ['docker', 'run', '--rm', '--pull=never', '--name', 'gpt-nov02c-remote-catalog-generator', '--network', 'none', '--read-only', '--cap-drop', 'ALL', '--user', f'{os.getuid()}:{os.getgid()}', '--mount', f'type=bind,source={ROOT}/deploy/stacks/pepgent-central,target=/run/config,readonly', '--mount', f'type=bind,source={HOME},target=/canary-home', '-e', 'REMOTE_HOME=/canary-home', '-e', 'REMOTE_KOMODO_KEY', '-e', 'REMOTE_KOMODO_SECRET', '-e', 'REMOTE_SLURM_JWT', '--entrypoint', 'bun', image, '/run/config/remote-home.mjs']
    generated = run('generator', command, env)
    if generated.returncode:
        raise SystemExit(generated.returncode)
    print('RUNTIME_HOME', json.dumps({'directoryMode':oct(HOME.stat().st_mode & 0o777), 'credentialsMode':oct((HOME/'credentials.toml').stat().st_mode & 0o777), 'credentialsPresent':(HOME/'credentials.toml').stat().st_size > 0}), flush=True)
    runtime_env = dict(os.environ, REMOTE_HOME=str(HOME), PATH=f'{ROOT}/remote/target/debug:' + os.environ['PATH'])
    catalog = run('remote-templates', [str(ROOT/'remote/target/debug/remote'), 'templates'], runtime_env)
    schema = run('remote-schema', [str(ROOT/'remote/target/debug/remote'), 'schema'], runtime_env)
    consumer = run('lab-consumer', [str(ROOT/'node_modules/.bin/tsx'), str(ROOT/'consume.ts')], runtime_env)
    raise SystemExit(max(catalog.returncode, schema.returncode, consumer.returncode))
finally:
    for filename in ['credentials.toml', 'credentials.toml.new']:
        path = HOME/filename
        if path.exists():
            with path.open('w') as stream:
                stream.truncate(0)
            path.chmod(0o600)
            print('CLEARED', filename, 'bytes', path.stat().st_size, flush=True)
    print('CLEANUP no credential values retained; no job commands invoked', flush=True)
```

### consume.ts

```ts
import { writeFile } from 'node:fs/promises';
import { readTemplates } from './lab/apps/web/src/server/lab/remote.ts';
import { TemplateInfoSchema } from './lab/apps/web/src/protocol/lab/external/remote.ts';

async function main() {
const result = await readTemplates(new AbortController().signal);
await writeFile('/tmp/gpt-nov02c-remote-catalog/lab-readTemplates.json', JSON.stringify(result, null, 2));
if (!result.ok) {
  console.log(JSON.stringify(result));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ ok: true, count: result.output.length, entries: result.output.map((entry) => ({name:entry.name, backend:entry.backend, metadata:entry.metadata, authoritativeSchemaParsed:TemplateInfoSchema.safeParse(entry).success})) }, null, 2));
}
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
```

### bindings.ts

```ts
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { readNodeDefinitions } from './lab/apps/web/src/server/lab/library-definition.ts';
import { defaultTemplate } from './lab/apps/web/src/client/services/lab/project-common.ts';
import { NodeDefinitionSchema } from './lab/apps/web/src/protocol/lab/library.ts';
import { TemplateInfoSchema } from './lab/apps/web/src/protocol/lab/external/remote.ts';

async function main() {
  const root = '/tmp/gpt-nov02c-remote-catalog/library';
  const paths = (await readdir(`${root}/nodes`)).filter((path) => path.endsWith('.ts')).sort().map((path) => `nodes/${path}`);
  const definitions = await readNodeDefinitions(root, paths);
  const raw: unknown = JSON.parse(await readFile('/tmp/gpt-nov02c-remote-catalog/remote-templates.stdout', 'utf8'));
  const templates = TemplateInfoSchema.array().parse(raw);
  const observations = definitions.map((definition) => {
    NodeDefinitionSchema.parse(definition);
    const binding = defaultTemplate(definition, templates);
    return {name:definition.name, body:definition.body.kind, defaultEnvironment:definition.defaultEnvironment, template:definition.template, binding:binding.kind, matchedRemote:binding.kind === 'template' ? binding.template.name : null};
  });
  await writeFile('/tmp/gpt-nov02c-remote-catalog/library-bindings.json', JSON.stringify(observations, null, 2));
  console.log(JSON.stringify({count:observations.length, observations}, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
```

终端退出元数据补全：共享 lab-web 的只读定位命令（`session_id=1`，上述 `term://1-fad2be95-1646-4011-a53b-b497fa30294b`）最终 **exit_code=1**，与保留的 Slurm TOML 解析错误一致；它不是遗留运行服务。该元数据不改变 source-built 目录链 exit0 的结论。
