# Pepgent 多仓当前 main / open issue / PR 接口全景取证

## 0. 取证边界与结论摘要

- **用户范围 (U)：** 只读 `RiriAgent` 路由下 `Pepgent/{soroi,Pepgent,remote,omp-rpc-mux,lab-library,images,deploy,PM}` 的当前 `main`、当前 open issue/PR；变化下界为 `2026-11-01T19:38Z`。重点是 Lab-13、Lab-14、WEB-07、`soroi#340/#341`、`deploy#25/#27/#28`，以及 store 镜像、发行和 consumer 接口。
- **来源：** GitHub 的 repo view、commit/merged-PR/open-issue/open-PR 列表，当前 `main` 文件，及关键 issue/PR 正文和已经存在的 owner runtime 评论。PM 只读 D44–D49 的决策正文/U/D 必要部分；未读投票评论、其他产品席调查、会话或记忆。
- **执行：** 仅建立 `/tmp/gpt-nov02c-github/` 的浅克隆用于给当前 `main` 文件补 `path:line`；未修改任何产品源码、未创建 PR/issue、未运行测试或检查。没有把 hash 比对作为证据；源码中的 digest/hash 字段仅按接口语义定位。
- **mentor 前置：** 已按本仓 `AGENTS.md:110-113` 写出决定性观察并尝试派 `mentor:default`；本会话 task 工具因 recursion/settings 不可用，未得到 mentor 结论，未把其缺席伪作证据。

### 结论（先给父席）

1. **代码承载已经密集合入，但不是阶段 C 产品完成。** `soroi#340/#341`、Pepgent 的 Lab 线协议、LAB-13、LAB-14、WEB-07、images#15/#17/#19、deploy#25/#27/#29 均能在当前 `main` 找到对应实现/声明。相关 PR 的合入、issue 的 DONE/closed、open=0 都只证明承载或记录层，不证明统一真实用户路径。
2. **主路径有一个明确的运行产物错配：store。** Soroi 当前 `main` 的 store server 已声明 `GET /stream/lifecycle`（`packages/store/src/server.ts:52-58`），而 deploy#26 在 `23:57Z` 的新发行部署评论记录运行中的 `soroi-store:latest` 持续 `store lifecycle stream answered HTTP 404`（[deploy#26 comment](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565811512)）。这不是当前源码缺实现；是当前运行 store 镜像/发行与 Lab consumer 期待的接口不一致，需由 store 镜像发行/部署组装在阶段 C 重取源头后处理。报告没有重跑该旧路径。
3. **主路径还有一个明确的旧 remote 运行产物边界：Slurm。** deploy#28 的问题正文记录旧运行中的 `remote templates` 报 `Slurm image must be docker://<repository>@sha256:<digest>`；remote 当前 `main` 已接受 tag，并在目录读取时解析 `identity.image`（`remote/src/model.rs:182-210`、`remote/src/identity.rs:126-148`）。deploy#29 已把两个 Slurm preset 改为 `:latest`，但 `deploy#28` 仍为 **OPEN / REOPENED**，验收 2 依赖 remote-step 重发且 lab-web 依据新产物重建。这里是旧运行产物/发布前提错配，不是当前 remote 源码缺少 tag parser；未重跑。
4. **WEB-07 的接缝已经接到真实 page read/command，但浏览器真实路径仍由 open `Pepgent#30` 承接；E2E-21 server-function 仍由 open `Pepgent#23` 承接。** 当前 route loader、Lab backend page read、35-kind command 与受控 AI panel 均存在；PR#88 明确把浏览器验证交给 #30，并没有声称端到端通过。另有一处非运行时的 source hygiene 残留：`settings-view-model.ts:15,246-267` 仍 type-only 依赖 `LabSnapshot`，虽调用方传入当前 `session.catalog`，不能把“fixture 只供测试”扩大解读为“fixture 类型名已全部清除”。
5. **Soroi F07/F22/F26–F30、远程 Agent/Slurm、A0 等当前责任仍落在阶段 C open issues。** `soroi#250/#259/#233/#232/#235` 等仍 open，且正文明确不能以代码合入或录制 consumer 关闭真实运行义务。

---

## 1. 可复现的源头读取方法

### 1.1 实际执行的只读取回命令

```sh
mkdir -p /tmp/gpt-nov02c-github
for repo in soroi Pepgent remote omp-rpc-mux lab-library images deploy PM; do
  gh repo clone "Pepgent/$repo" "/tmp/gpt-nov02c-github/$repo" -- --depth 1 --branch main
done
```

实际命令输出是各仓的 `Cloning into '/tmp/gpt-nov02c-github/<repo>'...`，八个仓均完成浅克隆。克隆只用于当前 `main` 文件行号定位，不读取 git 历史，不以 revision/hash 比对作为证据。

GitHub 当前源头入口：

- [Pepgent/soroi](https://github.com/Pepgent/soroi)（默认分支 `main`）
- [Pepgent/Pepgent](https://github.com/Pepgent/Pepgent)（默认分支 `main`）
- [Pepgent/remote](https://github.com/Pepgent/remote)（默认分支 `main`）
- [Pepgent/omp-rpc-mux](https://github.com/Pepgent/omp-rpc-mux)（默认分支 `main`）
- [Pepgent/lab-library](https://github.com/Pepgent/lab-library)（默认分支 `main`）
- [Pepgent/images](https://github.com/Pepgent/images)（默认分支 `main`）
- [Pepgent/deploy](https://github.com/Pepgent/deploy)（默认分支 `main`）
- [Pepgent/PM](https://github.com/Pepgent/PM)（默认分支 `main`）

### 1.2 状态解释

本报告把三层严格分开：

- **已合入：** GitHub merged PR / 当前 `main` 文件可读；只证明 source carrier。
- **局部 runtime：** owner 在 issue/PR 中贴出的实际命令与输出；只覆盖该评论的路径和当时运行产物。
- **统一用户路径：** A0 → S1 → E2E-21 → S2 的实际运行及下游结果；本轮没有重跑，也没有用 merged/DONE/open=0 替代它。

---

## 2. 2026-11-01T19:38Z 之后的 main / merged 变化

### 2.1 `Pepgent/soroi`

GitHub merged PR 搜索（下界后）得到：

- [PR #339](https://github.com/Pepgent/soroi/pull/339)：standalone compose 文档按中心身份插值重写；文档承载，不是新的跨组件运行证明。
- [PR #340](https://github.com/Pepgent/soroi/pull/340)：启动配方写入 `role`，释放批次提醒按 `purpose` 成组。
- [PR #341](https://github.com/Pepgent/soroi/pull/341)：F07 补齐发布 workload 的 `try_eval` / `text_only` 负例采集，明确引用 open [#250](https://github.com/Pepgent/soroi/issues/250) 的阶段 C。

当前 `main` 代码锚点：

- `packages/omp-soroi/src/subagent/protocol.ts:14-22`：`RoleSchema = Main | LocalChild | RemoteChild`，child role 不含 `Main`。
- `packages/omp-soroi/src/subagent/main/supervisor.ts:77-81`：sidecar 的 `role` 是必填持久化字段。
- `packages/omp-soroi/src/subagent/main/supervisor.ts:243-247,404-408`：central spawn 与 capture spawn 均由 `childRole(placement)` 产生 role。
- `packages/omp-soroi/src/subagent/main/supervisor.ts:851-853`：visibility host call 返回 `releasedBatchOf`。
- `packages/omp-soroi/src/subagent/main/supervisor.ts:1010-1015`：central → `LocalChild`、remote → `RemoteChild`，未知 variant 走 exhaustive `assertNever`。
- `packages/omp-soroi/src/subagent/main/supervisor.ts:1029-1032`：冷复活解析 sidecar 后检查 role 与 placement 一致。
- `packages/omp-soroi/src/subagent/main/supervisor.ts:1050-1054`：本机 child 的 `SOROI_ROLE` 来自 spec。
- `packages/omp-soroi/src/subagent/main/remote-agent.ts:36-38,114-117`：远程 `RunRequest.env` 同样传 `SOROI_ROLE: agent.role`。
- `packages/omp-soroi/src/subagent/scopes.ts:28-29,66-77`：以 batch id 保存释放批次，输出 `releasedBatchOf`，同 purpose 的不同批次不合并。
- `packages/omp-soroi/src/eval/reminder.ts:52-77`：组头 `批次「purpose」（已全部正式运行）`，成员缩进两格，其他 atom 保持顶层顺序。
- `e2e/s1/live-f07.ts:13,59-94,108-118`：从 owner publication 读取两类负例，三阶段共用 capture 观察顺序，正例/`try_eval`/`text_only` 均进入同一 run 的 producer。

边界：PR#340 正文虽然贴有局部 TUI/runtime 读数，但其自身仍列出远程放置、capture 冷复活、嵌套批次等风险；当前唯一可接受的统一承载仍是阶段 C 的 [#250](https://github.com/Pepgent/soroi/issues/250)。PR#341 正文明确阶段 B 不跑真实 A0/跨组件路径；不能把 producer 输入解析通过当作 capture 行为通过。

### 2.2 `Pepgent/Pepgent`

下界后 merged PR 搜索得到一条连续的 Lab 线协议和 GUI 线：

- [#72](https://github.com/Pepgent/Pepgent/pull/72)：experiment `versionedDefinitions`。
- [#74](https://github.com/Pepgent/Pepgent/pull/74)：experiment commits 与 experiments definitions。
- [#75](https://github.com/Pepgent/Pepgent/pull/75)：WEB-03 目录/泳道/实验详情投影、计划条和时间轴属性。
- [#76](https://github.com/Pepgent/Pepgent/pull/76)：讨论/数据集/流程编辑器投影。
- [#77](https://github.com/Pepgent/Pepgent/pull/77)：节点库/Automation 投影和 handback 入口。
- [#79](https://github.com/Pepgent/Pepgent/pull/79)：设置、首页、容器、集群、接入向导投影。
- [#82](https://github.com/Pepgent/Pepgent/pull/82)：`NodeDefinition.template` 改为 omp agent definition 名。
- [#84](https://github.com/Pepgent/Pepgent/pull/84)：**LAB-13** home、`panel.prompt`、`conclusion.confirm`、`member.quota` 与 activity。
- [#85](https://github.com/Pepgent/Pepgent/pull/85)：**LAB-14** flowEditor/datasets/connectCluster 读取与 19 个命令。
- [#86](https://github.com/Pepgent/Pepgent/pull/86)：LAB-13 剩余成员命令和 `agentTemplate.saveVersion`。
- [#87](https://github.com/Pepgent/Pepgent/pull/87)：LAB-13 containers/settings 读取、ImageDefinition 来源、repoActivity。
- [#88](https://github.com/Pepgent/Pepgent/pull/88)：**WEB-07** 13 个 Lab 页面切换到真实 route loader read/command，fixture 退出生产路径。
- [#90](https://github.com/Pepgent/Pepgent/pull/90)：W-10 文档对齐，非新的产品接口。

当前 `main` 的 LAB-13/LAB-14 后端锚点：

- `apps/web/src/server/lab/operations.ts:121-183`：experiment 读取真实 store graph/commits/compare/volume、版本定义和 Mux presence；不是 fixture 读取。
- `apps/web/src/server/lab/operations.ts:307-315`：`flowEditor` 从 Lab library、remote templates、当前用户 Panel 读取 palette/templates/panels。
- `apps/web/src/server/lab/operations.ts:318-330`：`datasets` 与 `connectCluster` 真实读取入口。
- `apps/web/src/server/lab/operations.ts:333-347`：`containers` 通过 `context.images.definitions()`、remote templates/jobs、library、Panel 组合返回。
- `apps/web/src/server/lab/operations.ts:350-358`：`settings` 通过 settings facts、activity、Panel 组合返回。
- `apps/web/src/server/lab/operations.ts:361-377`：所有上述 page 已进入 `readPage` 的实际 switch。
- `apps/web/src/server/lab/operations.ts:679-753`：`runCommand` 已把 `panel.*`、成员族、`lab.update`、project、repo、agent template、discussion、experiment、milestone 等命令分派到具体 owner 模块；不再是 LAB-14 所述的统一 `not_supported` 占位。
- `apps/web/src/server/lab/images.ts:1-5,22-34,77-129`：`images.json` 是唯一清单源；检出缺失时 clone，已有检出每次读取前 fetch + ff-only，清单和文件读取在同一串行队列内完成。
- `apps/web/src/server/lab/runtime.ts:32-80`：`PEPGENT_LAB_IMAGES_HOME` / `PEPGENT_LAB_IMAGES_REMOTE` 是部署注入的两个接口；Mux/trusted reader 也由环境解析，Lab consumer 不另造 images 凭据变量。
- `apps/web/src/protocol/lab/pages.ts:129-197`：`ImageDefinition`、experiment commits/versionedDefinitions、datasets、containers、settings wire 形状均已存在。

当前 `main` 的 WEB-07 GUI 接缝：

- `apps/web/src/app/routes/_lab.home.tsx:6-16`：route loader 调用 `getLabBridge().readPage(..., 'home', ...)`，再交给 `LabPageEntry`。
- 其他 12 个叶子 route 同型；例如 `apps/web/src/app/routes/_lab.datasets.tsx:6-16`、`_lab.compute.clusters.connect.tsx:6-16`、`_lab.experiments.$runId.index.tsx:8-26`。
- `apps/web/src/renderer/application/contracts/lab-session.tsx:255-260`：AI Panel 的 authority 写明为 page read 的 Panels、`readConversation`、`readModels`、`panel.prompt`、`panel.model`、agent stream。
- `apps/web/src/renderer/application/contracts/lab-session.tsx:262-368`：Panel 读取/模型/stream/send 的实际 controller 接线；`panel.prompt` 受理后显式失效当前 page leaf。
- PR#88 正文第 31、68–73、88–123 行保留的当前边界：生产路径不再读 `session.snapshot` / `LAB_SNAPSHOT`，但 fixture 仍只供测试；浏览器真实路径移交 open [#30](https://github.com/Pepgent/Pepgent/issues/30)，server-function 垂直集成移交 open [#23](https://github.com/Pepgent/Pepgent/issues/23)。
- **源码细节（不等同 runtime fixture 读取）：** 当前 `apps/web/src/renderer/features/lab-settings/model/settings-view-model.ts:15,246-267` 仍有 type-only `LabSnapshot` import，并以 `Pick<LabSnapshot, 'members' | 'projects'> & { settings }` 作为函数参数；调用方 `apps/web/src/renderer/features/lab-settings/controller/use-settings-controller.ts:58-60` 传入的是 `session.catalog + settings`。因此本轮只观察到旧类型名残留，未观察到 `LAB_SNAPSHOT` 值进入生产读取；但若目标是完全删除 fixture 类型耦合，这是一处当前 main 的相邻清理缺口，不能按 PR#88 的“fixture 只供测试”叙述直接抹平。


### 2.3 `Pepgent/remote`

下界后的 merged PR 和 commit 搜索均为 0；当前 `main` 的相邻接口仍是：

- `src/model.rs:113-132`：Slurm template 的 body/step image、shared root、env file。
- `src/model.rs:182-210`：`OciImage` 接受 registry/repository 的 tag 或 `@sha256`，拒绝 `docker://`/SIF path；执行保留原文，目录 identity 另行解析。
- `src/identity.rs:126-148`：Slurm 目录读取时以 registry manifest 解析 `identity.image`；注释明确 tag 移动后执行仍使用目录读到的 written reference。
- `src/ops.rs:34-36`：`remote templates` 读取 owner 的模板 catalog。
- `README.md` 的 Interface/Template identity/Slurm sections：remote 自己拥有运行生命周期、模板 catalog、tag/digest 的读取身份；不把 deploy 或本机 image cache 当 authority。

本仓当前没有 open issue/PR 承载新错配；Slurm 旧运行产物问题由 open `deploy#28` 记录，故 source 责任与 runtime 责任目前分置。

### 2.4 `Pepgent/omp-rpc-mux`

下界后的 merged PR 和 commit 搜索均为 0，当前 main 侧接口未见新的相邻改动：

- `src/main.rs:17-23`：一个程序提供 `serve` 与 `dial`，Mux 不启动 agent、不保存 transcript、不维护 agent 业务状态。
- `src/main.rs:25-49`：serve 接收 deployment bearer 和独立 trusted-reader credential；两个 secret 不能相同。
- `src/main.rs:51-70`：dial 从 `REMOTE_MUX`、`SOROI_SUBAGENT_ID`、`MUX_GENERATION`、`MUX_TOKEN`、`REMOTE_RUN`、`REMOTE_MOUNT`/`--expose` 读取边界。
- `src/dial/files.rs:24-35`：没有 `root + expose` 就没有文件 capability；只声明 root 也不自动暴露文件。

Mux 没有当前 open issue/PR；F25/远程 Agent 的真实消费仍由 soroi 阶段 C issues 负责，不可用 Mux merged 或 image tag 代替。

### 2.5 `Pepgent/lab-library`

下界后的 merged PR、commit、open issue/PR 均为 0。当前 `main` README 仍明确：

- `README.md:3-7`：本仓拥有 `nodes/*.ts`、依赖/lockfile 和 `.omp/agents/` 定义；正式运行历史由 Soroi store 保存，本仓不复制 Lab 状态。
- `README.md:9-13`：Soroi plugin 是执行时必需的实际插件，库依赖安装与执行边界分开。
- `README.md:38-48`：节点由 AST 静态导出；节点元数据和 Agent definition 是库源头。
- `README.md:106-132`：`try_eval`、`text_only` 两个 F07 负例 workload 的原始代码与真实通过证据要求；完整持久子 Agent 流仍由 SOR-11/F07 阶段 C 验收。
- `README.md:134-139`：远程生命周期归 remote/Soroi，Lab 页面和节点导出归 Pepgent/E2E-20；本库不复制这些实现。

因此 `lab-library` 当前没有新增 carrier；其 F07 workload 是 soroi#250 的输入源/依赖，而不是一个已完成的 live acceptance。

### 2.6 `Pepgent/images`

下界后的 merged PR：

- [#15](https://github.com/Pepgent/images/pull/15)：lab-web build 的 `store-contract` named context，不把 GitHub 凭据带入构建。
- [#17](https://github.com/Pepgent/images/pull/17)：根 `images.json` 三个发布目标的机器可读清单。
- [#19](https://github.com/Pepgent/images/pull/19)：lab-web 仅加 `openssh-client`，不带凭据/config/known_hosts。

当前 main 锚点：

- `Dockerfile:61-72`：`store-contract` 是调用者导出的 bare context，只有 `npm ci` 的进程环境使用 `GIT_CONFIG_* insteadOf`；不是镜像层或运行时的 Git 配置。
- `Dockerfile:90-99`：OpenSSH 只进 `lab-web` stage；`omp-agent`/`central` 不继承该 stage 的安装。
- `images.json:140-193`：`pepgent/lab-web` 的发布项同时列出 `openssh-client`、`@pepgent/web` 和运行配置；清单本身不进入镜像层。
- `README.md:53-64`：`images.json` 是 Lab 读取的镜像权威；改 Dockerfile 发布内容时同 PR 改清单。
- `README.md:94-118`：lab-web 的构建上下文是已提交 Pepgent source + soroi `store-contract` bare context，完成后才 push。

当前 images 没有 open issue/PR。注意：images repo 的清单/镜像定义已落地，不等于 deploy 当前运行的 `lab-web:latest` 和 store/remote-step 运行产物都已按当前 source 重发。

### 2.7 `Pepgent/deploy`

下界后相关 carrier：

- [#25](https://github.com/Pepgent/deploy/pull/25)：Mux trusted-reader 和 lab-web 同源注入、Slurm preset 的旧 image 引用更新。
- [#27](https://github.com/Pepgent/deploy/pull/27)：Lab images checkout 两变量、按路径只读 deploy key、SSH alias/config。
- [#29](https://github.com/Pepgent/deploy/pull/29)：两个 Slurm preset 改用 movable tags，closing open [#28](https://github.com/Pepgent/deploy/issues/28)；但 #28 当前仍 OPEN/REOPENED，运行验收不是由 merge 自动关闭。

当前 main 锚点：

- `stacks/pepgent-central/compose.yaml:65-78`：Mux serve 以 `MUX_AUTH_TOKEN` + 独立 `MUX_TRUSTED_READER_TOKEN` 启动。
- `stacks/pepgent-central/compose.yaml:80-109`：lab-web 同时消费 `PEPGENT_LAB_IMAGES_HOME=/var/lib/pepgent/images`、`PEPGENT_LAB_IMAGES_REMOTE=pepgent-images:Pepgent/images.git`、store URL、Mux URL、trusted reader 和 remote consumer credentials。
- `stacks/pepgent-central/compose.yaml:110-156`：images checkout volume、release tar、models/config、只读 deploy key bind，以及仅挂 lab-web 的 SSH config/known_hosts。
- `stacks/pepgent-central/compose.yaml:179-193`：alias `pepgent-images` 只把 SSH key 用于 GitHub images remote。
- `komodo/syncs/central.toml:23-42`：`STORE_IMAGE=.../soroi-store:latest`、`MUX_IMAGE=.../omp-rpc-mux:latest`、`LAB_WEB_IMAGE_TAG=.../lab-web:latest`，以及 release/config/key 路径注入。
- `komodo/syncs/central.toml:45-63`：Komodo template 使用 `omp-agent:latest` 与 `remote-step:latest`。
- `stacks/pepgent-central/slurm.toml:1-14,28-40`：`soroi-slurm` 与 `infra-slurm-check` 的 body/step image 均是 `:latest`，不再手写 digest。
- `scripts/central.py:208-238`：部署只核对 owner-held `images-ssh-key` 的 0600，不把私钥写入 Komodo Variable；trusted reader/bearer 仍经各自 owner/secret 路径注入。

### 2.8 `Pepgent/PM`

PM 没有下界后的 open PR。当前 open issue 是 #68、#15、#14、#13；相关决策正文见第 5 节。PM 不是本轮产品源码 carrier，不能用 PM 文档中的“已决/已归档”替代当前 main/runtime。

---

## 3. 当前 open issue / PR 载荷

以下是本轮从各仓当前源头重取的列表；`open=0` 只表示当前列表为空，不表示该仓所有产品行为已验收。

### `Pepgent/soroi`（open PR：0）

当前 open issue：

- [#322](https://github.com/Pepgent/soroi/issues/322) 领导层规则/角色/工人技能整体切换到 council 工人总线（治理外围，不是产品接口）。
- [#321](https://github.com/Pepgent/soroi/issues/321) council 工人事件总线并迁出独立仓（治理外围，不是产品接口）。
- [#259](https://github.com/Pepgent/soroi/issues/259) F26–F30 S1 automatic driver 与完整 live 验收。
- [#250](https://github.com/Pepgent/soroi/issues/250) F07/F19/F22 真实 S1 验收与自动驱动。
- [#245](https://github.com/Pepgent/soroi/issues/245) F02–F04 真实 S1 提醒/检查/dry run 验收。
- [#235](https://github.com/Pepgent/soroi/issues/235) 真实发行 A0 五类 PTY 安装验收。
- [#233](https://github.com/Pepgent/soroi/issues/233) E2E-18 F16–F17 远程 Agent。
- [#232](https://github.com/Pepgent/soroi/issues/232) E2E-17 F15 Slurm 与排队取消。
- [#231](https://github.com/Pepgent/soroi/issues/231) E2E-16 F14/F17 Program/F18。
- [#227](https://github.com/Pepgent/soroi/issues/227) E2E-15 F08 与 F23–F25 介入。
- [#226](https://github.com/Pepgent/soroi/issues/226) E2E-14 F20–F21 PTY 生命周期。
- [#224](https://github.com/Pepgent/soroi/issues/224) DIST-02 A0 五类安装探针。
- [#220](https://github.com/Pepgent/soroi/issues/220) E2E-12 F06/F09–F13 捕获及读取。
- [#219](https://github.com/Pepgent/soroi/issues/219) E2E-11b F05 原样正式提交。
- [#182](https://github.com/Pepgent/soroi/issues/182) F01 根 atom 与 stop 全链路。

其中 #250/#259 正文都明确：阶段 B 的 spec/代码合入不等于阶段 C 产品通过；完整 A0、真实模型、owner runtime、原始 RPC/HTTP/SSE/transcript、PM 归档仍是关闭条件。#233/#232 同样保留 remote/Slurm runtime 责任。

### `Pepgent/Pepgent`

- open [#30](https://github.com/Pepgent/Pepgent/issues/30)：E2E-20 第二段浏览器 runbook 与核对；WEB-07 真实浏览器路径、S2、F08–F31。
- open [#23](https://github.com/Pepgent/Pepgent/issues/23)：E2E-21 VS2 server-function 垂直集成；部署、认证、store release、Lab server-function。
- open [#3](https://github.com/Pepgent/Pepgent/issues/3)：Keycloak OIDC 登录替代静态访问 token（本轮 Lab13/14/WEB-07 之外）。
- open [PR #4](https://github.com/Pepgent/Pepgent/pull/4)：OIDC 登录；与本轮 Lab page/read seam 无关。

### `Pepgent/remote`、`Pepgent/omp-rpc-mux`、`Pepgent/lab-library`、`Pepgent/images`

四仓当前 open issue 和 open PR 列表均无匹配。这个“0 open”仅是承载列表事实；远程 Agent、Slurm、F07 workload、镜像构建等真实结果仍由 soroi/PM 阶段 C issue 及 deploy#28 的运行前提承接。

### `Pepgent/deploy`

- open/reopened [#28](https://github.com/Pepgent/deploy/issues/28)：Slurm preset 从 digest 改 movable tag；PR#29 已 merged，但 issue 正文仍要求在 `main` 真实执行 `scripts/slurm.py --branch main` 和 `docker exec ... remote templates`。正文依赖 remote-step 重新发布以及 lab-web 依据新产物重建。
- open PR：0。

### `Pepgent/PM`

- open [#68](https://github.com/Pepgent/PM/issues/68)：P2 D49，PM 活动决策正文与 open D9 错误路径/过时条文清理；当前决策表仍显示投票中，未把它当完成。
- open [#15](https://github.com/Pepgent/PM/issues/15)、[#14](https://github.com/Pepgent/PM/issues/14)、[#13](https://github.com/Pepgent/PM/issues/13)：D9/F32 任务继续 open；PM#68 只提议清理其过时模板，不关闭 F32。
- open PR：0。

---

## 4. store 镜像、发行和 consumer 变动

### 4.1 Store 当前 source contract

- `soroi/packages/store/src/server.ts:41-58`：服务启动 `Bun.serve`，`GET /stream/lifecycle` 读取 lifecycle cursor 并交给 `EventStreams` 长连接。
- `soroi/packages/store/src/server.ts:59-65`：`PUT /releases/{version}` 导入发行，`GET /releases` 列出发行，`GET /versions/{version}` 读历史版本。
- `soroi/packages/store/src/contract.ts:90-100`：`ReleaseRecord` 是 version/content/boot/runner/customization/importedAt；manifest 必须是 schemaVersion 1 且有三个 component。
- `soroi/packages/store/src/store.ts:239-281`：发行记录由 store 自己持久化，导入时解析 manifest、放置 boot/runner/customization 对象并写 releases 表；这不是 Lab 自己维护的第二份 release registry。
- `soroi/packages/store/Dockerfile:1-20`：store image 直接以 `oven/bun` 启动 `bun src/main.ts`，端口 3001。
- `soroi/compose.yaml:4-15`：本仓 compose 的 store target 是 `pepgent-registry.orb.local:5000/pepgent/soroi-store:latest`，可从当前 soroi source 的 `packages/store/Dockerfile` 构建；deploy 中仅消费该 tag。

### 4.2 Pepgent consumer 当前 source contract

- `Pepgent/package.json:51-53`：`apps/web` 声明 `pepgent-store` 为 `git+https://github.com/Pepgent/soroi.git#store-contract`。
- `Pepgent/package-lock.json:80-82,14344-14346`：lockfile 对同一 `store-contract` consumer 有 resolved git dependency；本报告只记录存在 consumer lock，不读取或比较 hash。
- `Pepgent/apps/web/src/server/lab/store.ts:1-5`：Lab server 直接 import `pepgent-store/contract` 的 RunComparison/RunEvent/RunGraph/RunSummaries/ValueUsage/VolumeManifest/StoreError schemas。
- `Pepgent/apps/web/src/server/lab/store.ts:109-143`：`StoreClient.commits` 读取 `/runs/{run}/stream?after=0`，按 `run_started`/`step_committed` 收集 commit timeline，并把缺 route/中断/契约外事件映射为 `persistence_unavailable`。
- `Pepgent/apps/web/src/protocol/lab/pages.ts:129-197`：experiment `commits`、`versionedDefinitions`、datasets `valueRuns/objectSizes/volumes`、containers `ImageDefinition` 等 wire consumer 已存在。

### 4.3 既有运行产物的生命周期 404

deploy#26 的 owner runtime 评论（不是本轮重跑）给出完整边界：

- [comment 6565765502](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565765502)：旧发行不支持 `install.ts --artifact`，`lab-web` 在启动阶段反复重启；随后换用由 soroi main 构建且支持 `--home --artifact` 的发行，重新 `variables`/`preview`/`apply`。
- [comment 6565811512](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565811512)（`23:57Z` 记录）：新发行部署后 `running=true restarts=0`、`curl http://127.0.0.1:59410/` 返回 200；但日志持续为 `store lifecycle stream answered HTTP 404`，评论明确归因为当前 `soroi-store:latest` 没有 Lab 订阅的 lifecycle endpoint。该评论也记录 images clone 当时因 deploy key 未注册而 `Permission denied (publickey)`。
- [comment 6565846243](https://github.com/Pepgent/deploy/issues/26#issuecomment-6565846243)：deploy key 注册后，按原 clone 命令 exit 0，#26 owner 标记六项验收完成。

**交叉结论：** 当前 soroi `main` source 有 lifecycle route，而运行 store image 的 owner observation 是 404；因此当前边界应记录为 **旧运行 store 产物/consumer 错配**，不是“主源码缺 lifecycle 实现”。待阶段 C 由 store image 发布者和 deploy 组装重新取回当前 source，确认 `STORE_IMAGE` 的真实产物与 Lab consumer 是同一契约；本轮没有触碰或重启既有服务，也没有重跑旧 path。

### 4.4 `store-contract` build input

- images [PR#15](https://github.com/Pepgent/images/pull/15) 的 current source carrier 在 `images/Dockerfile:61-72`：`store-contract` bare context 仅在 `npm ci` 时以 `insteadOf` 解决私有 git dependency，凭据不入 image layer。
- images README `:94-118` 的构建命令要求调用者从 soroi clone 导出 `origin/store-contract`，从 Pepgent clone 导出 `origin/main`，再用两个 named context 构建 lab-web。
- **责任缺口：** 这个 build seam 只覆盖 lab-web 的 `pepgent-store` package 安装；它不自动重建 deploy 当前 `soroi-store:latest`。store service 自身仍由 `soroi/packages/store/Dockerfile`/本仓 compose 负责，deploy 只在 `central.toml:26` 消费 tag。

---

## 5. images / deploy / remote 的发行接缝

### 5.1 images → lab-web → deploy images checkout

当前代码链：

1. images `Dockerfile:90-99` 在 `lab-web` stage 安装 OpenSSH。
2. images `images.json:140-193` 为 lab-web 列出 `openssh-client` 和 `@pepgent/web`。
3. deploy `compose.yaml:94-95` 给 Lab backend 两个字面值：`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE`。
4. deploy `compose.yaml:140-156,179-193` 只将 deploy key bind、alias config 和 known_hosts 挂入 lab-web。
5. Pepgent `apps/web/src/server/lab/images.ts:77-129` 每次 containers read 前让 Lab 成为 checkout 唯一写方并 ff-only 到 remote，再读 `images.json`。

deploy#26 的 owner runtime 记录已经看到：key 注册后 clone exit 0，私钥没有进入 image/env，#26 已关闭。但这只证明 images checkout 注入路径当时已在该部署中完成；不证明 store lifecycle 或 Web 浏览器路径完成。

### 5.2 Slurm tag 变化与旧 runtime parser

- 当前 deploy `slurm.toml:1-14,28-40` 两个 preset 都写 `omp-agent:latest` 与 `remote-step:latest`。
- 当前 remote `src/model.rs:182-210` 允许 tag/digest，`src/identity.rs:126-148` 在 catalog 时解析 registry identity，执行保留 written tag。
- deploy#28 [正文](https://github.com/Pepgent/deploy/issues/28) 的现有 runtime 记录（不重跑）是：

```text
docker exec pepgent-central-lab-web remote templates
remote: invalid TOML in /var/lib/pepgent/remote/config.toml: ...
Slurm image must be docker://<repository>@sha256:<digest>
```

正文还记录：当时 lab-web 中 `remote 0.1.0` 的构建产物早于 remote main 的 tag-support 变化；remote main 当前错误文案已是 `invalid OCI image reference ... without docker:// or a SIF path`，但这只是 source/runtime 边界的定位信息，不是 hash 验证。

- [PR#29](https://github.com/Pepgent/deploy/pull/29) 已把声明改成 tag，但正文写明真实验收需在合入 `main` 后用 `python3 scripts/slurm.py --branch main` 与 `docker exec ... remote templates` 重取；issue #28 当前仍 open/reopened。

**责任划分：**

- deploy owns `slurm.toml` declarations and `scripts/slurm.py` deployment invocation。
- remote owns tag-capable CLI/catalog implementation and `remote-step` release source。
- images/deployment release assembly owns whether running `remote-step:latest` / lab-web actually contains current remote.
- soroi stage-C #232 owns the real Slurm F15 behavior and `EndedUnstarted` outcome；不能用 `remote templates` 单独成功替代 F15。

当前未发现 remote/images 的 open issue 承载上述 release freshness dependency；它只在 deploy#28 正文的依赖关系中出现，是阶段 C/运行组装缺口。

### 5.3 Mux / remote / Soroi release identity

- Mux current source `src/main.rs:25-49,51-70` 把 deployment bearer、trusted reader、per-generation dial token 分成不同输入；deploy `compose.yaml:65-71,100-106` 按该边界注入。
- Soroi `scripts/build-release.py:205-243` 将 customization、runner、boot 和 manifest 一起打包；`scripts/install.ts:62-123` 要求 `--home` 与 `--artifact`，把安装后的 release identity 写入安装目录并生成 `soroi` launcher。
- deploy#26 的 23:53 runtime 先暴露旧 tar 不支持 `--artifact`，23:57 切换到由当前 soroi main 构建的发行后恢复运行；这是发行源头与部署选定 tar 的生命周期事实，不是本轮重新验证。
- Soroi `packages/omp-soroi/src/eval/identity.ts:42-58,73-87` 消费 deployment central identity + installed release identity；运行时只消费 owner 提供的 release/central facts，不以当前 source checkout 代替安装产物。

---

## 6. PM 当前有效 U/D 正文（只取必要部分）

### D44 — PM#63，已决定/closed，不等于阶段 C

来源：[PM#63](https://github.com/Pepgent/PM/issues/63)。

- D44-01 v2（正文第 56–58 行）：LAB-14 owner 是 W-09，`flowEditor`/`datasets`/`connectCluster` 三页和完整 wire 形状；真实跨组件结果留 Pepgent#30/阶段 C。
- D44-02 v1（第 59 行）：LAB-14 同时承载 11 个基础命令，路径为 `apps/web/src/server/lab/**`。
- D44-03 v1（第 60 行）：LAB-14 同时承载 discussion 四命令、`panel.model`、`experiment.update`、milestone 两命令。

当前 main 的 `operations.ts:307-330,361-377,679-753` 与这些 row 的 where/how 对齐；这证明承载已装配，不证明真实 store/Mux/remote/Web 业务流通过。

### D45 — PM#64，已决定/closed，不等于浏览器 AI Panel 通过

来源：[PM#64](https://github.com/Pepgent/PM/issues/64)。D45-01 v1（正文第 43–47 行）把 `packages/ui/src/lab/ai-panel.tsx`、`ai-panel-model.ts` 和必要导出/页面 controller 接线划给 W-10，只删除内部假回复、把会话/messages/model/send 改为受控；不改 wire、服务端或 CSS。当前 `useLabPanel` 的 `lab-session.tsx:255-368` 与 PR#88 说明对齐，但浏览器真实用户路径仍是 open #30。

### D46 — PM#65，已决定/closed，定义 LAB-13 接缝

来源：[PM#65](https://github.com/Pepgent/PM/issues/65)。当前必要 rows：

- D46-01 v1（正文第 40 行）：Better Auth 成员命令成功后单独写 activity；`member.quota`/`conclusion.confirm` 仍按既有事务规则。
- D46-02 v1（第 41 行）：Lab 只接收 `PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 两变量，Lab 是 checkout 唯一写方，每次 containers read 前快进。
- D46-03 v2（第 42 行）：`images.json` 是 images owner 的机器可读权威，Lab 不解析 Dockerfile。
- D46-04 v1（第 43 行）：online/lastActiveAt 是 Lab 自己观测的进程内事实，不落库。
- D46-05 v1（第 44 行）：agent template 是 `.omp/agents/<id>.md`，saveVersion 合并单文件。
- D46-06 v2（第 45 行）：允许 LAB-13 为 YAML parser 增加 manifest/lock/notices 路径。

当前 Pepgent `runtime.ts:51-80`、`images.ts:1-129`、`operations.ts:338-358,719-742` 与 D46 rows 对齐；#80 已被 PR#87 承载关闭，但仍不代替 #30/#23/阶段 C。

### D47 — PM#66，已决定/closed，deploy/images 凭据接缝

来源：[PM#66](https://github.com/Pepgent/PM/issues/66)。

- D47-01 v2（正文第 46 行）：images deploy key 私钥留部署 owner 文件，按路径只读 bind 进 lab-web，不经 Komodo Variable/Stack environment；Lab 后端接口仍只收 D46-02 两变量。
- D47-02 v1（正文第 47 行）：只在 lab-web stage 安装 OpenSSH，不带凭据/config/known_hosts。

当前 deploy `compose.yaml:94-95,140-156,179-193`、`central.py:208-238` 和 images `Dockerfile:90-99` 对齐；deploy#26 owner runtime 在 00:00 后记录 clone exit 0。仍不能把它扩大解释为 store 或 Slurm runtime 已完成。

### D48 — PM#67，已决定/closed，D47 执行前提

来源：[PM#67](https://github.com/Pepgent/PM/issues/67)。D48-01 v2（正文第 36–40 行）只授权打开 org deploy-key policy 并让 `Pepgent/images` 稳态保留一把只读 key；这是凭据执行前提，不是新的 Lab API。当前报告不读取或复制 key 值。

### D49 — PM#68，当前 OPEN / 投票中

来源：[PM#68](https://github.com/Pepgent/PM/issues/68)。

- 第 28–34 行的 D49-01 v2 / D49-02 v3 是 PM 活动文档和 open D9 模板清理提议，当前票栏仍写“投票中”，不能当作已定案。
- D49 事实段明确三项 open D9（PM#13/#14/#15）继续承载 F32，不因模板过时而关闭。
- D49 与本轮接口事实的关系仅是文档治理；不改变 Lab13/Lab14/Web7、store、remote、images/deploy 的运行状态。

---

## 7. 责任、承载与缺口矩阵

| 接口主题 | 当前已有承载 | 当前缺口/错配 | 责任 owner 与阶段 |
|---|---|---|---|
| Soroi child role / released-batch reminder | soroi main `supervisor.ts`, `remote-agent.ts`, `scopes.ts`, `reminder.ts`；merged #340 | 远程 role/cold revival/nested batch 的统一运行仍由 #250 F22 观察；不把 PR 正文局部读数当阶段 C | Soroi plugin owner + #250 阶段 C |
| F07 try_eval/text_only | `e2e/s1/live-f07.ts:13,59-94,108-118`；merged #341；lab-library README:106-132 | 生产者未在 A0/真实链路运行；真实 capture/no-return 仍 #250 | Soroi E2E W-08 / #250 阶段 C，workload owner 为 lab-library/SOR-11 |
| Lab experiment/store projection | `Pepgent/server/lab/store.ts:1-143`、operations:121-183、pages wire | consumer 期待的 lifecycle/stream/versions/valueRuns 等必须由运行 store 实际提供 | Soroi store image owner + Pepgent Lab consumer，#23/#30/阶段 C |
| LAB-13 | operations:338-358,719-742；images.ts/runtime.ts；PR#84/#86/#87 | 源码已实现；真实部署、私有 images clone、store/Mux 下游仍不等于 GUI/业务通过 | Pepgent W-09 implementation；#23/#30 阶段 C |
| LAB-14 | operations:307-330,361-377,679-753；PR#85 | 源码已实现；真实 remote/Mux/SSH/library/repo 命令仍需统一下游路径 | Pepgent W-09 implementation；#23/#30 阶段 C |
| WEB-07 | route loaders、`LabPageEntry`、`useLabPanel`；PR#88 | 无本轮浏览器操作/截图/真实用户登录；#30 open；仍有后端失败由 page failure 显示而非 fixture fallback | Pepgent W-10 + #30 S2 |
| store lifecycle | 当前 source `soroi/packages/store/src/server.ts:52-58` 有 endpoint | deploy#26 23:57 owner runtime 记录运行 `soroi-store:latest` 404；属于旧 image/consumer mismatch | Store release owner 发布当前 source；deploy 组装/重部署；#23/#30 阶段 C |
| store image vs store-contract | soroi `packages/store/Dockerfile:1-20`；images build context `Dockerfile:61-72`；Pepgent package.json/lock consumer | lab-web build context 不会自动刷新 deploy `STORE_IMAGE`；当前 deploy `central.toml:26` 仍只写 floating tag | Soroi store image发布 + deploy runtime组装；无独立 remote/images open carrier |
| images checkout / deploy key | images manifest/Dockerfile；deploy compose/central.py；#26 owner 00:00 clone exit 0 | #26 这条接缝已由 owner 记录完成；不延伸为 store/Slurm/Web 完成 | images/deploy owners；阶段 C 复核 |
| Slurm image tag | deploy `slurm.toml:9-10,36-37`；remote `model.rs:182-210`, `identity.rs:126-148`; PR#29 | 旧运行 `remote templates` 解析失败，#28 open/reopened，依赖 remote-step 重发和 lab-web rebuild | deploy#28 W-04 + remote/images release；Soroi #232 F15 阶段 C |
| Mux serve/dial | mux main `src/main.rs:25-70`；deploy compose trusted/bearer env | 当前无新的 source carrier/open issue；实际 F25/Agent flows仍由Soroi E2E open issues验证 | Mux owner source + Soroi #227/#233 阶段 C |
| lab-library node/F07 workload | README:3-13,38-48,106-139 | 当前无 open carrier；库源头存在不代表真实节点执行、Agent transcript 或页面投影通过 | lab-library owner提供源；Soroi/Pepgent阶段 C消费 |
| PM D49 | PM#68 当前 open decision body | 投票未完；不能以 PM 清理提议替代产品状态 | ArgonGovernance/PM；P2治理，不是阶段 C产品验收 |

---

## 8. 覆盖、未覆盖与明确结论

### 已覆盖（本轮 source 读到）

- 当前八仓默认分支和下界后 merged/open 载荷列表。
- soroi#340/#341 的当前 role/batch/reminder/F07 代码入口。
- Lab13/14 backend page reads、command dispatch、images checkout、store contract consumer。
- WEB-07 route loader、page entry、受控 AI panel 接线。
- images `store-contract` build input、`images.json`、lab-web OpenSSH。
- deploy#25/#27/#29 的 current compose/sync/Slurm declarations 和 deploy-key injection source。
- remote tag acceptance/registry identity source、Mux serve/dial interface、lab-library ownership。
- PM D44–D49 必要决策正文和当前 open D9/D49 载荷。
- deploy#26 23:57 lifecycle 404、随后 key/clone runtime 记录、deploy#28 旧 Slurm parser 错误的已有 owner logs；没有重跑。

### 未覆盖（本轮明确不做）

- 不启动/重启本地或生产服务，不接触 OrbStack 共享容器、卷、Core、SOPS、凭据值。
- 不重新执行 deploy#26 lifecycle、images clone、Slurm `remote templates` 或任何旧 runtime 路径；引用的是 GitHub owner 已有评论。
- 不做 A0、S1、S2、浏览器真实登录/操作、数据库/下游状态核对；这些由 #235/#250/#259/#232/#233/#227/#30/#23 等阶段 C owner 承接。
- 不读取 SoroiKeeperOpus 会话/记忆，不读 session/history，不读 PM 投票理由/其他产品席调查，不联系无关 Pepgent 根 checkout。
- 不把 merged PR、closed issue、owner DONE、HTTP 200、container running、open=0、或任何 hash/digest 比对提升为完整用户流程完成。

### 最终分类

- **主路径已合双方，但未统一组装：** Lab13/Lab14/WEB-07 与 soroi#340/#341 的源码接口已对齐，阶段 C 的跨组件业务链仍由 open issue 承接。
- **旧运行产物/版本错配：** store runtime 在 23:57 的 lifecycle 404 与当前 soroi main route 不一致；deploy#28 记录旧 remote image 对 tag 的 Slurm parser 错误，而 remote main 已支持 tag。
- **缺实现：** 本轮相邻接口源代码中未发现 Lab13/Lab14/WEB-07、images manifest、deploy key bind、remote tag parser 的明显“未实现占位”；但这不等于 runtime pass。
- **环境/阶段限制：** 本轮遵守不跑测试、不重跑无变化旧路径；真实发行、store image freshness、remote-step/lab-web re-build、浏览器、server-function、Slurm/remote/F07/F22 均留给各自阶段 C owner。
