# GPT 2026-11-02 deploy ↔ Soroi release 接缝金丝雀

## 结论

本轮从 GitHub 克隆双方最新 `main` 后，使用**真实源码构建出的同一个发行 tar**，已跑通两个相邻公开入口：

1. `Pepgent/deploy` 当前 `lab-entrypoint.sh` → tar 自带真实 `install.ts --home ... --artifact ...` → 真正的 `bun install`、`omp plugin link` → 安装出的公开 `soroi --version`，**容器退出 0，输出 `18.14.2`**。
2. `Pepgent/deploy` 当前 `release-init.ts` → 当前 `Pepgent/soroi` main 的真实 store HTTP `PUT /releases/{version}` → store 内部 `ReleaseManifestSchema` → `GET /releases` 可见该记录 → `GET /objects/<record object>` 能取得真实 `boot.js`、`runner.js`、`customization.tar`，均 HTTP 200。

**旧三项的现状不是“三项全部完成”：**

| 旧断点 | 当前判定 | 本轮事实 |
|---|---|---|
| installer 缺 `--artifact` | **已修复，真实跨仓 runtime 通过** | deploy 当前入口第 18 行传入两个必需参数，真实 installer、plugin link、公开 launcher 完成 |
| producer 省略 boot、store 必填 boot | **已修复，当前真实发行/导入咬合** | builder 从真实 `boot.ts` 打包 `boot.js`；installer、store 均要求 boot；真实 import 成功且下载得到 boot JS |
| release-import init 未进入活动部署 | **脚本与 overlay 已实现，活动接入仍未完成** | 手工调用当前 init 脚本已成功；Git 声明与隔离 Core 的实时 Stack 都只选择 `compose.yaml`，不加载 `release.compose.yaml` |

本轮没有复现双方新的协议错配；**不能把手工 init 成功、overlay 存在或 installer 成功称作活动 ResourceSync 已启用 init，更不能称作完整部署或完整 Lab 用户流程通过。** 本报告只陈述事实，不另作产品设计、阶段门禁或 P1 立案决定。

## 范围、权威与操作边界

- 先读本工作台 `AGENTS.md`、`LEDGER.md`，特别遵循 C1-3/C1-4/C5-1；随后读取克隆内规则及实际实现。
- 旧记忆仅作为索引：`/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-gpt/02-implemented-vs-missing.md:142-147`、`04-repos-and-module-wiring.md:173-175,203-208`。未读取或联系 Opus 席位、会话或记忆；未读无关前端根 checkout。
- 工程源头是 GitHub 当前 main；运行态结论来自本轮真实 build、Docker、HTTP 和隔离 Core 只读 API。历史设计未从 git 提取。
- 唯一工作根：`/tmp/gpt-nov02-deploy-release-20261102/`。未修改工程 checkout、未 commit/push、未操作生产、未解密 SOPS、未复制本机凭据数据库。
- 容器前已读 `~/Ext/work/orbstack/` 以及相关台账，运行 `docker ps -a && orb list`；观察到既有隔离 Core/Periphery、store、Lab、registry 和 Slurm VM。完整原始库存输出为本会话 `artifact://3263`。
- 复用既有登记的一次性无状态资源名 `soroi-keeper-gpt-canary-deploy-install`；其当时不存在。只复用 registry 的真实 lab-web 镜像和 Docker 默认 bridge，不新建有状态容器、卷、网络或持久服务。
- 父席已显式许可仅更新 `~/Ext/work/orbstack/soroi-keeper-gpt-canary-deploy-install.md` 的当前输入根和生命周期事实；该唯一资源登记已直接替换旧条目。
- 当前 main store 用 Mac 上真实 Bun/DuckDB 服务进程运行，loopback `127.0.0.1:59742`、独立 `/tmp/.../store-home`，避免把旧容器镜像错误当最新源码，也不触碰共享 store 的任何数据。
- 无 `task` 工具可用，按本角色递归上限 fallback 写下计划后自行执行；未借 fork 绕过 mentor/tool 限制。计划在工作根 `plan.md`。

## 版本定位（仅定位，不作为正确性证据）

| 对象 | 本轮取回版本 |
|---|---|
| `Pepgent/deploy` main | `50784b2faa4393f8a7d4c966e847f4ad0e66cc5d`，`2026-11-02T00:13:42+09:00`，Merge pull request #21 |
| `Pepgent/soroi` main | `05ae761ef8ff0cb045fd7d0bad1af85e03796713`，`2026-11-02T01:47:39+09:00` |
| 本轮 release version | `gpt-nov02-deploy-release-20261102`（显式命名，避免占用真实发布版本） |
| Mac Bun / Python | `1.4.4` / `3.15.1` |
| 容器真实公开 launcher | `soroi --version` 输出 `18.14.2` |
| 隔离 Core `GetVersion` | `2.3.4` |
| lab-web image | `pepgent-registry.orb.local:5000/pepgent/lab-web:latest`；镜像 Config.Labels 为 null，因此不臆测其源码 commit |

GitHub 版本入口：[deploy main commit](https://github.com/Pepgent/deploy/commit/50784b2faa4393f8a7d4c966e847f4ad0e66cc5d)、[soroi main commit](https://github.com/Pepgent/soroi/commit/05ae761ef8ff0cb045fd7d0bad1af85e03796713)。未读取未合并分支、未运行未完成产品代码测试。

## 源码接缝证据（D）

以下相对路径均相对于工作根内同名 clone，给定 commit 可复查：

- `soroi/scripts/build-release.py:190-202` 用 `bun build --target=bun` 编译真实入口；`:205-235` 构建 runner、boot、customization，manifest 和外层 tar 都含三组件。不是伪二进制或 boot stand-in。
- `soroi/scripts/install.ts:10-17,35-49`：boot 已是必填组件；`:67-80` 要求 `--home` 与 `--artifact`；`:93-123` 解包、安装依赖、记录 release、调用真实 `omp plugin link`、写公开 launcher。
- `deploy/stacks/pepgent-central/lab-entrypoint.sh:14-25`：解包同一个 `/release/soroi.tar`，第 18 行明确调用 `bun "$release_dir/install.ts" --home "$HOME" --artifact "$artifact"`，最后执行传入公开命令。
- `soroi/packages/store/src/contract.ts:97-101`：`ReleaseManifestSchema` 严格要求 boot/runner/customization。
- `soroi/packages/store/src/server.ts:59-63,133-134`：公开 release PUT、release GET、object GET；`src/store.ts:247-281` 内部对真实 tar 解析 schema、写组件对象，并事务插入 releases。这里不是单独 schema 测试，本轮调用了完整真实 HTTP import 路径。
- `deploy/stacks/pepgent-central/release-init.ts:27-38,54-69`：从真实 tar 读取 manifest version，单 PUT 给 store，再解析 store 的 ReleaseRecord。记录协议中的 content/object 字段是产品数据，不作为本报告验证依据。
- `deploy/stacks/pepgent-central/release.compose.yaml:1-30`：真正的 release-init 服务声明、store healthy 前置和 lab-web completed-successfully 前置已存在；第 1 行也明确说明活动 Sync 尚未加载。
- `deploy/komodo/syncs/central.toml:6-18`：当前声明 `file_paths = ["compose.yaml"]`，config_files 没有 release-init；不从“overlay 文件存在”推断它已经运行。

## 实际命令与日志（R）

命令执行顺序如下；所有命令中的内容寻址文件名仅用于找到真实产品输入，不进行任何 hash 比较，也不把 hash 当证据。产品实现自身仍执行现有协议必需的摘要处理，未修改/绕过它。

### 1. 克隆与真实 build

```sh
mkdir -p /tmp/gpt-nov02-deploy-release-20261102
git clone --depth 1 --branch main https://github.com/Pepgent/deploy.git /tmp/gpt-nov02-deploy-release-20261102/deploy
git clone --depth 1 --branch main https://github.com/Pepgent/soroi.git /tmp/gpt-nov02-deploy-release-20261102/soroi
# cwd: .../soroi
bun install > /tmp/gpt-nov02-deploy-release-20261102/dependencies.log 2>&1
python3 scripts/build-release.py \
  --output /tmp/gpt-nov02-deploy-release-20261102/release \
  --version gpt-nov02-deploy-release-20261102 \
  > /tmp/gpt-nov02-deploy-release-20261102/build-release.log 2>&1
```

观察：依赖命令退出 0、安装 125 packages；真实 builder 退出 0 并生成 tar。`dependencies.log` 含 `Blocked 2 postinstalls`，未绕过该策略；当前真实 store native runtime 和 installer 路径仍成功。这一构建本身不被冒充部署正确性证据。

实际 tar：
`/tmp/gpt-nov02-deploy-release-20261102/release/soroi-f81ba8ebb31211bcda2ce526971ad5b595439620bacb17af933eee98f823febe.tar`

### 2. 真实 deploy entrypoint / installer

完整可执行驱动：`/tmp/gpt-nov02-deploy-release-20261102/run-installer.py`。

```sh
python3 /tmp/gpt-nov02-deploy-release-20261102/run-installer.py \
  > /tmp/gpt-nov02-deploy-release-20261102/installer.log 2>&1
```

驱动调用 `docker run --rm --init --network bridge --name soroi-keeper-gpt-canary-deploy-install --user 1000:1000`，使用真实 registry lab-web image，entrypoint `/bin/sh /run/config/lab-entrypoint.sh soroi --version`。挂载：

- 本轮真实 tar → `/release/soroi.tar`（只读）；
- 当前 deploy clone 的 `lab-entrypoint.sh`、`remote-home.mjs`、`remote.toml`、`slurm.toml` → `/run/config/*`（只读）；
- 已有隔离 `pepgent-gateway/lab-web/models.yml`、`config.yml` → 对应 config（只读）；
- 独立 `/tmp/.../container/home` → `/home/agent`（只含本轮安装数据）。

没有用空 config/伪凭据替代组件：真实 remote 消费者 key/secret 来自既有 `pepgent-central/remote-api.json`，真实 Slurm JWT 来自其既有 owner 文件，仅经进程 env 注入 Docker。未打印任何值、未调用 scheduler/model。产品 `remote-home.mjs` 写出的临时 HOME credential copy 已在退出后清空，原 owner 文件未改。

`installer.log:3-14` 核心输出：

```text
[remote-home] catalog and private credentials refreshed
bun install v1.4.4 (38afee6c8)
118 packages installed [4.69s]
Blocked 2 postinstalls. Run `bun pm untrusted` for details.
✔ Linked omp-soroi from /home/agent/.omp/soroi/<product-install-directory>/packages/omp-soroi
... version: gpt-nov02-deploy-release-20261102 ... command: /home/agent/.local/bin/soroi
18.14.2
container_exit=0
```

上面为节录（省略产品对象标识，不是另一次输出）；原始完整行在日志。安装出的 `release.json` 读回 version 为 `gpt-nov02-deploy-release-20261102`；`container/home/.local/bin/soroi:1-5` 是可执行真实 launcher，调用真正 `omp --config <installed soroi.yml> "$@"`。

生命周期实测：

```sh
docker ps -a --filter name=soroi-keeper-gpt-canary-deploy-install \
  --format '{{.Names}} {{.Status}}' \
  > /tmp/gpt-nov02-deploy-release-20261102/container-final.log
```

输出为空，`--rm` 后没有同名残留。未新建 named volume/network/port。

### 3. 当前 main store 与真实 init/import

通过 PTY 启动真实服务（session 1）：

```sh
# cwd: /tmp/gpt-nov02-deploy-release-20261102/soroi
STORE_HOME=/tmp/gpt-nov02-deploy-release-20261102/store-home \
STORE_HOST=127.0.0.1 STORE_PORT=59742 \
bun packages/store/src/main.ts \
  > /tmp/gpt-nov02-deploy-release-20261102/store.log 2>&1
```

`store.log:1`：

```text
pepgent-store listening http://127.0.0.1:59742/ home=/tmp/gpt-nov02-deploy-release-20261102/store-home
```

随后调用真实 deploy init：

```sh
SOROI_STORE_URL=http://127.0.0.1:59742 bun \
  /tmp/gpt-nov02-deploy-release-20261102/deploy/stacks/pepgent-central/release-init.ts \
  /tmp/gpt-nov02-deploy-release-20261102/release/soroi-f81ba8ebb31211bcda2ce526971ad5b595439620bacb17af933eee98f823febe.tar \
  > /tmp/gpt-nov02-deploy-release-20261102/release-import.log 2>&1
bun /tmp/gpt-nov02-deploy-release-20261102/observe-import.ts \
  > /tmp/gpt-nov02-deploy-release-20261102/downstream.log 2>&1
tar -tf /tmp/gpt-nov02-deploy-release-20261102/downloaded/customization.tar \
  > /tmp/gpt-nov02-deploy-release-20261102/customization-files.log
```

真实 init 退出 0，返回版本 `gpt-nov02-deploy-release-20261102` 和 `importedAt: 2026-11-01T17:13:35.066Z`。下游观察器不模拟任何服务，只通过公开 GET 取回记录及其中的三对象；原始 readback 在 `releases-readback.json`。

`downstream.log`：

```text
GET /releases status=200 version=gpt-nov02-deploy-release-20261102 importedAt=2026-11-01T17:13:35.066Z
GET /objects/<store-returned-object> component=boot status=200 bytes=183447
GET /objects/<store-returned-object> component=runner status=200 bytes=178444
GET /objects/<store-returned-object> component=customization status=200 bytes=583680
```

该段是 JSON 日志的字段节录；完整 JSON 在文件。下载目录 `downloaded/` 保留取得的三个实际文件；`boot.js:1-4` 明确是 builder 编译的 `packages/omp-soroi/src/eval/boot.ts`，不是伪 boot；customization tar 实际可列出设置、插件 src、agent、skills、rules 等资产。大小只是传输观察，不是正确性代替。

完成后向自己启动的 store PTY 发送 Ctrl-C，真实服务 **exit_code 0**。没有重启共享服务或修改其数据库；未声称验证过跨重启持久性或 remote boot 实际作业执行。

### 4. 活动隔离 ResourceSync 与 Stack 实读

完整只读驱动：`observe-sync.py`。它复用当前 deploy 的 `scripts/central.py:58-80` Core 客户端读取既有隔离 API owner 文件，并硬性检查 host 为 `http://127.0.0.1:59120`；不调用 preview/apply，不刷新/改动他人 source clone，不产生写 API。

```sh
python3 /tmp/gpt-nov02-deploy-release-20261102/observe-sync.py \
  > /tmp/gpt-nov02-deploy-release-20261102/active-sync.log 2>&1
```

真实观察：

```text
GetVersion: 2.3.4
GetResourceSync pepgent-central:
  repo="", branch="main", files_on_host=true,
  resource_path=["komodo/syncs/central.toml"], managed=false
GetStack pepgent-central:
  files_on_host=true
  run_directory=/Users/mouriya/Ext/work/orbstack/pepgent-deploy-sync/stacks/pepgent-central
  file_paths=["compose.yaml"]
  config_files=[lab-entrypoint.sh, remote.toml, remote-home.mjs, slurm.toml]
  ignore_services=[state-init, auth-seed]
```

**活动选择与最新 main 的声明一致：未启用 release overlay。** 该事实不需要也没有运行 RunSync/DeployStack 去制造新状态。现有中央 Lab 容器仍运行，只说明既有部署存在，不代表本轮最新 release 已经走完整 Stack/init/Lab 启动。

## root prompt 资产旁观

- 真实 import 后的 customization tar 列表包含 `packages/omp-soroi/agents/soroi-main.md`（`customization-files.log:5`）。真实安装 HOME 内也存在同文件，正文确实以 `You are the soroi main agent...` 开始。
- 当前 `soroi/packages/omp-soroi/package.json:21-25` 注册扩展；安装 launcher 只加 config，不加 main agent/prompt 参数（`scripts/install.ts:115-121`）。当前 `.omp/settings/soroi.yml:1-6` 没有 root prompt 选择；`src/subagent/main/index.ts:6-14` 安装 task 和 shutdown hook。
- 因此本轮可确认“root prompt 资产有发行并安装”，**不能由此升级为“根会话已自动注入该正文”**。本轮没有启动模型回合/TUI，因此不提供 assembled system prompt runtime 结论，也不把旧记忆中的 root prompt 缺口宣布修复。

## 未覆盖与后续可执行位置

1. 活动 ResourceSync 未加载 overlay 是**源头实读确认的现状**，不是环境故障；当前声明有意把 overlay 留给组装。是否属于计划内待实现或须 P1 纠偏交父席按当前决议判断。
2. 本轮 import 是真实生产者/消费者的最小路径，但由 host Bun 运行 init 脚本，不是 Komodo overlay 服务生命周期；未跑 Stack release-init → lab-web dependency，也未跑完整 Lab 登录、Main 启动或业务操作。
3. 完整部署 runtime 应在已登记本机隔离 `pepgent-central` 组装环境，由相应 owner 选择真实 overlay 并执行受控 Stack 生命周期后观察 init 成功、store release 可见及 Lab 后续用户路径；本轮不擅自改该活动声明。
4. 真实 boot 已构建、传输并被 store 接收，不等于执行了远程 Program/Agent。未调用 Slurm/Komodo jobs，相关 runtime 不属于本主题。
5. 没有 hash 比较、mock、stand-in、schema 单体验证冒充完整路径；没有新增产品修复、issue 或提案。

## 交付文件索引

所有下列文件位于 `/tmp/gpt-nov02-deploy-release-20261102/`：

- `plan.md`：执行前范围、假设与决定性观察。
- `dependencies.log`、`build-release.log`、`release/`：真实依赖/build 及 tar。
- `run-installer.py`、`installer.log`、`container-final.log`、`image-source.log`、`container/home/`：真实安装命令、结果、退出后库存和安装资产（临时 remote credential 已清空）。
- `store.log`、`release-import.log`、`observe-import.ts`、`downstream.log`、`releases-readback.json`、`downloaded/`、`customization-files.log`：真实 import 与下游记录/对象。
- `observe-sync.py`、`active-sync.log`：隔离 Core 的实时只读选择。

本报告是本轮取回时刻的调查副本，不替代 GitHub、源仓或 Core 的状态权威；后续源头变化后需按实际变化重取。
