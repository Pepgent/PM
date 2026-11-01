# GPT 独立事实核验：D13-02①②中央身份生产与注入

## 结论与证据等级

本轮没有读取 SoroiKeeperOpus 的会话、记忆、提案或巡检报告，没有读取 PM#47 正文或其他席位选票，没有投票、建 issue、改源码或操作部署。

| 对象 | 本次独立观察 | 能下的结论 | 不能下的结论 |
|---|---|---|---|
| D13-02① deploy `lab-web` | 现行 main 的 compose 未声明两项中央身份环境变量；`central.toml` 仍直接声明 `LAB_WEB_IMAGE=…:latest`；`central.py apply` 没有生产三项派生 Variable 的路径，随后执行 `RunSync`、`StopStack`、`DeployStack` | **所查现行部署声明/生产入口没有实现该条要求的中央身份生产与注入链。** | 未观察活动 Komodo Variable、runtime.env 或真实容器，不能称“本次真实 lab-web 容器已启动失败” |
| D13-02② standalone `central` | 现行 main `compose.yaml` 的 `central.environment` 只有 HOME、SOROI_STORE_URL、SOROI_MUX_URL，没有两项必填插值；入口脚本也未补注入 | **所查 standalone 声明没有实现两项身份的必填注入。** | 未运行完整统一 e2e 启动器，也未穷举所有外部 Compose override；不能否认外部驱动可另行加入环境 |
| 实际插件消费者 | 真实 `executionIdentity` 在按声明构造的环境下拒绝缺少 image；只提供 image 后拒绝缺少 config；提供两个语法合规的合成值并指向既有 installed release 后接受 | 消费者确实要求两个输入；它不会从 mutable tag 或 compose 自动推导输入 | 合成值通过只证明输入解析路径，不证明来自实际 registry/config，更不证明 D13-02 生产方已经实现 |
| 实际 `resolveRole` 全模块导入 | 两次 source index 导入在各自 15 秒有界窗口均无 stdout/stderr，`exitCode:null` | **该全模块导入没有得到可归因的 resolveRole runtime 结果，不能计为成功或缺值失败证据。** 调用关系仅由现行源码证实 | 不将这项无结果扩写为模型故障、容器失败或消费者拒绝 |

这是一份现状核验，不作架构设计、恢复资格或方案裁决。

## 1. 规则源头与调查范围

### (D) 本次直接读取的有效条文

- PM 本地归档 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D13-contract-gaps.md:44` 是 **D13-01**，规定 Main 启动解析 `SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`；编码为 `sha256:<64位小写hex>`，插件只消费、不自行推导。
- 同文件 `:45` 是 **D13-02**，①规定 deploy 在 RunSync/DeployStack 前解析声明 tag、生产镜像运行引用及两项身份 Variable，lab-web 引用两项身份；②规定 soroi `compose.yaml` 的 central 以必填插值声明两项变量，由统一 e2e 入口提供。
- `.../D16-phaseB-review-restore.md:28` 的 **D16-04** 明文：`D13-01..05 与 D14-01..03 恢复效力`。其后对 artifact 入口的职责分配不等于撤销 D13-02①②。
- 源文链接：[D13 原文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D13-contract-gaps.md#L44-L45)、[D16 恢复条文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D16-phaseB-review-restore.md#L28)。

### 边界

仅在 `/tmp/gpt-d28-central-identity.xAzTTG/` 写探针、计划和原始日志，并按委托写本 local 报告。工程 checkout 只读。没有生产访问，没有 SOPS 解密，没有读取凭据文件/数据库，没有 registry 或 Komodo API 调用，没有启动容器、omp 或模型，没有 hash 计算或 hash 比对作为证据。

系统日历为 2026-11-02；本机 `date -u '+%Y-%m-%dT%H:%M:%SZ'` 的实际输出是 `2026-11-01T17:37:50Z`。保留此时钟差，不把命令输出静默改成系统日期。文件与 issue 状态均是本次取回窗口的副本。

## 2. 当前 main 源码：位置与实际内容

源 clone 基准目录：`/tmp/gpt-nov02-deploy-release-20261102/`。为避免沿用旧观察，本轮另以 `xd://github` 的 `file_read`，显式 `branch:"main"`，读取了下表八个文件；不是读取旧报告，也没有安装 npm tip。

| 源码位置（相对基准目录） | 实际观察 |
|---|---|
| `deploy/stacks/pepgent-central/compose.yaml:79-104` | lab-web 镜像引用 `${LAB_WEB_IMAGE:?…}`，entrypoint 为 `/bin/sh /run/config/lab-entrypoint.sh`，command 为 Node Web；environment 没有 `SOROI_CENTRAL_IMAGE_DIGEST` 和 `SOROI_CENTRAL_CONFIG_DIGEST` |
| `deploy/komodo/syncs/central.toml:23-38` | `LAB_WEB_IMAGE` 在 `:24` 直接声明 `pepgent-registry.orb.local:5000/pepgent/lab-web:latest`，而非引用普通镜像 Variable；同一段没有两项身份 Variable |
| `deploy/scripts/central.py:180-203` | `inject` 写已有 token、release 等输入，未写中央 image/config 身份 |
| `deploy/scripts/central.py:267-307` | `apply` 核对声明与 pending 后在 `:287` 执行 RunSync，最终 `:306-307` StopStack/DeployStack；本函数没有 registry manifest 解析与中央身份 Variable 生产/写入步骤 |
| `deploy/stacks/pepgent-central/lab-entrypoint.sh:6-25` | 复制 models/config，配置 remote home，运行实际 artifact installer，再 exec Web；未生成或 export 两项身份 |
| `soroi/compose.yaml:45-57` | central 使用 mutable tag 默认镜像；environment 只有 `HOME`、`SOROI_STORE_URL`、`SOROI_MUX_URL`，没有两项身份的必填插值 |
| `soroi/compose/central-entrypoint.sh:4-23` | 复制 models/config，读取声明的 gateway/mux token，运行 artifact installer，再 exec 安装后的 soroi；未生成或 export 两项身份 |
| `soroi/packages/omp-soroi/src/eval/identity.ts:37-40,63-69,76-87` | 两项字段分别经 `DigestSchema` 解析；缺值抛必填错误；`executionIdentity` 显式消费 env，并从 installed release 读取 release.json |
| `soroi/packages/omp-soroi/src/index.ts:35-45` | `SOROI_ROLE` 默认 Main；Main 在创建 StoreClient 后调用 `executionIdentity(process.env, packageRoot)`。模块顶层调用 resolveRole（临时 clone 的位置为 `:124`；现行 main 的后续控制代码已有新增行） |

现行 GitHub main 的 `index.ts` 与临时 clone 的完整文件并非同版：远端在后面的 abort/derive 逻辑已有修改。本次直接观察到的身份解析段 `:35-45` 没有这项差异，`identity.ts` 现行正文也保持上述真实函数。**因此不声称整个临时 clone 就是最新 main**；函数 probe 使用的是 clone 中该真实身份函数，现行 main 的对应函数已另从源头核对。版本/安装根路径仅作定位，没有以摘要、hash 或版本号替代行为证据。

可复读 URL：[deploy compose](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/compose.yaml#L79-L104)、[central.py](https://github.com/Pepgent/deploy/blob/main/scripts/central.py#L267-L307)、[central.toml](https://github.com/Pepgent/deploy/blob/main/komodo/syncs/central.toml#L23-L38)、[lab entrypoint](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/lab-entrypoint.sh)、[standalone compose](https://github.com/Pepgent/soroi/blob/main/compose.yaml#L45-L57)、[standalone entrypoint](https://github.com/Pepgent/soroi/blob/main/compose/central-entrypoint.sh)、[identity.ts](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/identity.ts#L63-L87)、[resolveRole](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/index.ts#L35-L45)。

## 3. (R) 有界真实函数 probe

### 输入与方法

- 计划：`/tmp/gpt-d28-central-identity.xAzTTG/plan.md`。
- 探针：`/tmp/gpt-d28-central-identity.xAzTTG/probe.ts`。
- 原始日志：`/tmp/gpt-d28-central-identity.xAzTTG/probe.log`。
- 真实模块：`/tmp/gpt-nov02-deploy-release-20261102/soroi/packages/omp-soroi/src/eval/identity.ts`；没有复制或改写被测函数，没有 mock。
- 使用该消费仓已有 `bun.lock` 与安装后的 workspace 依赖；`bun.lock:421` 的 zod 为 4.6.7，真实解析路径由日志记录为其现有 `.bun/zod@4.6.7/node_modules/zod/index.js`。没有运行 npm/bun install。实际 Bun 1.4.4；这些版本只定位环境。
- 以 Bun.YAML 读取两份实际 compose 的 service.environment。未读取 .env、runtime.env、宿主凭据； unrelated `${…}` 输入换成统一无秘密字符串。standalone Store URL 使用声明里的默认 URL。
- 传给函数的是**按部署声明构造的 host 输入对象**，不冒充容器内 `process.env`。
- 正向边界由调用者补 `sha256:` 后 64 个 `0` 的 image 和 `sha256:` 后 64 个 `1` 的 config。这只是语法合规的合成输入，不是实际 registry/config 的身份。
- release 路径使用先前已存在的 installed customization 根，其 `release.json` 的 version 为 `gpt-nov02-deploy-release-20261102`；没有伪造 release 文件。该记录仅用于让真实函数继续经过 installedRelease 读取路径，不据此推断发行内容或实际镜像正确。

复现命令（进程调用总上限 45 秒，内部 index 导入每次 15 秒）：

```sh
bun /tmp/gpt-d28-central-identity.xAzTTG/probe.ts \
  > /tmp/gpt-d28-central-identity.xAzTTG/probe.log 2>&1
```

### 实际输出

两套声明的 `declaredIdentityFields` 都为 `[]`。下列结果各在 deploy-lab-web、soroi-central 两个 case 中各出现一次：

```text
as-declared:
  rejected
  SOROI_CENTRAL_IMAGE_DIGEST is required for the Main role: Invalid input: expected string, received undefined
image-only-synthetic:
  rejected
  SOROI_CENTRAL_CONFIG_DIGEST is required for the Main role: Invalid input: expected string, received undefined
both-syntactically-compliant-synthetic:
  accepted
  centralKind: central
  releaseVersion: gpt-nov02-deploy-release-20261102
```

日志定位：deploy 的三项结果在 `probe.log:3-5`，standalone 在 `:8-10`。

额外完整模块导入结果保留在 `probe.log:6,11`：`exitCode:null, stdout:"", stderr:""`。每个子进程设置 `timeout:15000`，整次命令约 30 秒结束。未查明导入停在哪个依赖，不对无输出归因。**上述明确的缺值/正向行为证据来自 executionIdentity 真函数，不来自这两次未得结果的 index 导入；resolveRole 的到达关系是源码证据。**

## 4. (R) 当前真实承载 issue 查询

查询只查 GitHub 当前 issue 索引/正文，不读提案方巡检或选票，不创建新 issue。

- `issue://Pepgent/deploy?state=open&limit=100`：**No matches**，该窗口 deploy 没有任何 open issue。
- `issue://Pepgent/soroi?state=open&limit=100`：返回 15 项 open issue，标题是现有 council 工作与 E2E/A0 事项，没有一个标题直接承载中央身份生产/注入。
- `search_issues repo:Pepgent/deploy repo:Pepgent/soroi is:issue is:open "SOROI_CENTRAL"`：0。
- 同范围 `is:open "D13-02"`：0。
- `Pepgent/soroi is:issue is:open "compose" "身份"`：0。
- `Pepgent/deploy is:issue D13`：返回两个 closed issue；其中 [deploy#11「按 D13 注入中心镜像与配置身份」](https://github.com/Pepgent/deploy/issues/11) 是直接对应①的旧承载，但当前 `State:CLOSED, State reason:NOT_PLANNED`。其正文当前仍写具体生产/注入范围，**正文的意图不能把 closed 状态当作 open 工作**。
- 扩大 `is:open central identity` 与 `is:open "中心" "注入"` 查询会返回 E2E 项。抽读 [soroi#231](https://github.com/Pepgent/soroi/issues/231)、[soroi#233](https://github.com/Pepgent/soroi/issues/233)、[soroi#235](https://github.com/Pepgent/soroi/issues/235) 当前正文：前两者是远程 Program/Agent spec 与继承验收义务；后者是 A0/PT​Y 安装验收，明确“不实现产品功能”。没有在这些正文中发现将 deploy 生产方或 standalone compose 必填注入实现分配给它们的条款。

**有界结论：在本次查询的 Pepgent/deploy 和 Pepgent/soroi 当前 open issue 范围中，未找到 D13-02①②生产/注入实现的明确 open 承载。** deploy#11 是存在的 closed 旧承载，不是“从未有 issue”。没有穷举其他仓库、PM decision、项目字段或未公开讨论，因此不声称整个组织绝无任何关联记录。

## 5. 未覆盖与不可外推

1. 没有启动真实容器、执行 entrypoint、登录 Lab、连接模型、运行 eval 调用或检查 capture/DB/下游结果；本次不是端到端部署验收。
2. 没有实际 registry manifest 取值、config 字节投影、Variable 写入或 Compose 完整渲染，因此不能证明生产方修复后的业务语义；本次仅证明所查当前代码缺该链和消费者有必填条件。
3. 没有读取活动镜像、Komodo metadata、runtime.env 或部署拥有方凭据，不能断言真实运行环境一定缺变量；即便外部人工补值存在，也不能据此抹去当前源码声明未按条文生产注入的事实。
4. 全模块导入未获结果，原因未定；不能宣称 Main 启动 runtime 已完成验证。LocalChild/RemoteChild 不是本次生产入口调查对象，不对它们作额外合规裁决。
5. 不以合成 digest、release content 字段、代码/文件摘要比对作为验证。报告中不包含 hash 比对证据。
6. 没有修复、重开或新建承载，没有代父席做资格判定或投票。需由父席结合另一独立调查及有效条文自行整合。
