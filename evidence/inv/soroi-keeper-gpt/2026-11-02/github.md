# Pepgent 八仓 GitHub 当前全景（SoroiKeeper Gpt-2）

## 观察边界

- GitHub 身份：`gh auth status` 在本次读取开始时显示 **RiriAgent active=true**（keyring；CLI 已掩码 token），未切换到其他账号。
- 观察时间：`date -u` 记录为 **2026-11-01T17:14:34Z**。本次变动下界：**2026-11-01T13:35:24Z**。
- 事实来源：各仓 GitHub `main` 的 repo metadata 与 `file_read`；下界后的 commit/merge 搜索；当前 `state=open` 的 issue/PR forge 列表；需要判断接缝时读取当前 issue/PR 正文和当前 main 源码。报告中的“已合入”只指 GitHub PR/当前 main 的事实；“未验收”只按正文明确的缺口记录，不由 issue 的 `DONE` 或 merge 状态推断 runtime。
- PM 特别边界：只读取当前 open issue 的已公布正文（PM#41、PM#13–15）和当前 open 列表；没有读取另一模型席位的报告或票的理由，也不把 PM 历史归档当作当前决定。
- 本报告不把 hash、commit SHA 或文件存在当作行为证据；只把它们作为 GitHub 对象定位信息。没有在本席执行测试、构建或产品修改。
- GitHub 搜索并行读取期间曾有若干 API rate-limit 响应；随后通过 `issue://…?state=open`、`pr://…?state=open` 和 `file_read` 重新取得当前源头列表/源码。下文没有把 rate-limit 时未取得的结果当作“无结果”。

## 一、每仓当前 main 与当前 open 项

### 1. `Pepgent/soroi`

- Repo：<https://github.com/Pepgent/soroi>
- `default branch=main`，TypeScript，repo metadata 的更新时间 **2026-11-01T17:11:34Z**。
- 当前 main 的根说明仍将 `omp-soroi`、standalone store 和 central deployment 作为同一发行闭合，并明确 release 内容、`SOROI_STORE_URL`、Mux/central identity 与 installer 的边界：<https://github.com/Pepgent/soroi/blob/main/README.md>。
- 下界后的接缝相关合入：
  - [PR #294](https://github.com/Pepgent/soroi/pull/294)（2026-11-01T13:55:56Z，store contract）：运行时无关的 `contract.ts`/`identity.ts` 与 `store-contract` 派生分支 workflow 已合入；正文仍把首次生成分支留为合入后观察。
  - [PR #295](https://github.com/Pepgent/soroi/pull/295)（13:57:16Z，remote Program）：`remote run/status/remove`、release `boot.js`、copy-in/out 与 remote capture placement 已合入；其 runtime 证据是本地 remote 协议桩，不是 Komodo/Slurm。
  - [PR #298](https://github.com/Pepgent/soroi/pull/298)（14:05:50Z，Agent `spawnCapture`）：capture agent、LocalChild `spawn_capture` host call 和 Mux 路径已合入；正文明确真实 Agent 体交回留给 [#219](https://github.com/Pepgent/soroi/issues/219) / [#250](https://github.com/Pepgent/soroi/issues/250)。
  - [PR #303](https://github.com/Pepgent/soroi/pull/303)（14:25:36Z，remote store recorder）：为远程 runner 发布 recorder 地址、记录请求顺序与 remote run id 的 e2e driver 已合入；真实 Komodo/Slurm 可达性留给阶段 C。
  - [PR #311](https://github.com/Pepgent/soroi/pull/311)（14:42:25Z，remote Program abort）：只补 remote Program 的 `remote abort` 等终态、dry-run zero-write；正文说 Remote Agent 有序停止仍等 SOR-18/SOR-20。
  - [PR #314](https://github.com/Pepgent/soroi/pull/314)（15:18:46Z，eval control endpoint / takeover / abort）与 [PR #316](https://github.com/Pepgent/soroi/pull/316)（15:30:04Z，`AgentGenerationTransfer.generation` 改为非空字符串）已合入。#316 当前正文的 source anchor 是 `packages/store/src/contract.ts:87`，且明确跨 Mux 实际签发、store 暂存、拷出、删除未运行。
  - [PR #318](https://github.com/Pepgent/soroi/pull/318)（16:14:17Z，remote Agent capture / wake）与 [PR #319](https://github.com/Pepgent/soroi/pull/319)（16:20:00Z，四列 Parquet progress batch）已合入；两者的真实探针使用本地 `remote` CLI 替身，真实后端留给 [#233](https://github.com/Pepgent/soroi/issues/233)。
  - [PR #320](https://github.com/Pepgent/soroi/pull/320)（updated 17:12:54Z，Remote Agent 有序停止）已合入。其正文的 S1/S3 读数明确只有 `run_aborted`、没有被中止步骤提交；这个缺口随后由当前 open [#323](https://github.com/Pepgent/soroi/issues/323) 承载。
- 当前 open issue（forge 读取，观察时仍 open）：
  - [#323](https://github.com/Pepgent/soroi/issues/323) 整运行 abort 时缺 `call_aborted`/批次提交；[#322](https://github.com/Pepgent/soroi/issues/322) 规则、角色、技能切到 council 总线；[#321](https://github.com/Pepgent/soroi/issues/321) council 工人事件总线与独立仓迁出。
  - [#259](https://github.com/Pepgent/soroi/issues/259) F26–F30 S1；[#250](https://github.com/Pepgent/soroi/issues/250) F07/F19/F22 S1；[#245](https://github.com/Pepgent/soroi/issues/245) F02–F04 S1/dry-run；[#235](https://github.com/Pepgent/soroi/issues/235) A0 五类发行安装验收。
  - [#233](https://github.com/Pepgent/soroi/issues/233) E2E-18 F16–F17 Remote Agent；[#232](https://github.com/Pepgent/soroi/issues/232) E2E-17 Slurm；[#231](https://github.com/Pepgent/soroi/issues/231) E2E-16 Program；[#227](https://github.com/Pepgent/soroi/issues/227) E2E-15 介入；[#226](https://github.com/Pepgent/soroi/issues/226) E2E-14 PTY；[#224](https://github.com/Pepgent/soroi/issues/224) DIST-02 A0。
  - [#220](https://github.com/Pepgent/soroi/issues/220) E2E-12；[#219](https://github.com/Pepgent/soroi/issues/219) E2E-11b；[#182](https://github.com/Pepgent/soroi/issues/182) F01/stop。
- 当前 open PR：只有 [PR #260](https://github.com/Pepgent/soroi/pull/260)，base `main`、head `eng/install-check-224`、`Merge state: DIRTY`。正文写明五类 A0 **尚未通过**：R3 parser 修正待完整 fresh-HOME Linux A0；CI/prepare、静态检查和前一轮结果不替代 A0。

### 2. `Pepgent/Pepgent`

- Repo：<https://github.com/Pepgent/Pepgent>
- `default branch=main`，TypeScript，metadata 更新时间 **2026-11-01T15:18:31Z**。
- 下界后的 Lab/接缝合入： [PR #45](https://github.com/Pepgent/Pepgent/pull/45)（D12 Lab wire/store schema，14:25:54Z）、[#46](https://github.com/Pepgent/Pepgent/pull/46)（LAB-10 library 与 D12 read/write，14:40:17Z）、[#47](https://github.com/Pepgent/Pepgent/pull/47)（WEB-01 异步 snapshot loader，14:38:42Z）、[#48](https://github.com/Pepgent/Pepgent/pull/48)（discussion prompt，14:51:34Z）、[#49](https://github.com/Pepgent/Pepgent/pull/49)（已安装发行启动根 omp，14:53:52Z）、[#50](https://github.com/Pepgent/Pepgent/pull/50)（生命周期流/`experiment_ext`，15:03:11Z）、[#53](https://github.com/Pepgent/Pepgent/pull/53)（LAB-05 host tools，15:15:17Z）、[#54](https://github.com/Pepgent/Pepgent/pull/54)（`library.merge` cacheHome，15:18:27Z）均已合入 main。
- 当前 open issue：[#51](https://github.com/Pepgent/Pepgent/issues/51) 文档同步；[#30](https://github.com/Pepgent/Pepgent/issues/30) E2E-20 浏览器；[#29](https://github.com/Pepgent/Pepgent/issues/29) WEB-07；[#28](https://github.com/Pepgent/Pepgent/issues/28) WEB-06；[#27](https://github.com/Pepgent/Pepgent/issues/27) WEB-04；[#26](https://github.com/Pepgent/Pepgent/issues/26) WEB-03；[#25](https://github.com/Pepgent/Pepgent/issues/25) WEB-05；[#24](https://github.com/Pepgent/Pepgent/issues/24) LAB-08 介入/中止/IRC；[#23](https://github.com/Pepgent/Pepgent/issues/23) E2E-21 server function；[#22](https://github.com/Pepgent/Pepgent/issues/22) LAB-11a；[#21](https://github.com/Pepgent/Pepgent/issues/21) WEB-02 LabBridge；[#20](https://github.com/Pepgent/Pepgent/issues/20) LAB-07b 在途/Agent 流；[#19](https://github.com/Pepgent/Pepgent/issues/19) LAB-09；[#18](https://github.com/Pepgent/Pepgent/issues/18) LAB-11b；[#17](https://github.com/Pepgent/Pepgent/issues/17) LAB-07a；[#11](https://github.com/Pepgent/Pepgent/issues/11) LAB-12；[#3](https://github.com/Pepgent/Pepgent/issues/3) OIDC。
- 当前 open PR：只有 [PR #4](https://github.com/Pepgent/Pepgent/pull/4)，OIDC；它是 2026-09 的旧 open PR，不是本 cutoff 后的接缝实现。其正文列出的 source anchors 是 `apps/web/src/app/start.ts:48-49`、`apps/web/src/server/auth/service.ts:113-142`、`apps/web/src/server/auth/sessions.ts:39-41,221-225`、SSE routes 与 `runtime-host.ts:177-178`；其自身也把 Lab authorization、ingress/https 和后续 E2E 标为未覆盖。

### 3. `Pepgent/remote`

- Repo：<https://github.com/Pepgent/remote>
- `default branch=main`，Rust，metadata 更新时间 **2026-11-01T14:09:39Z**。
- [PR #19](https://github.com/Pepgent/remote/pull/19)（merged 14:09:35Z）把 D12 `TemplateMetadata` 加到 `remote templates`，并更新 `src/model.rs`、`src/identity.rs`、Komodo/Slurm identity、schema 和示例模板。
- 当前 open issue/PR：**无**（forge `state=open` 列表为空）。

### 4. `Pepgent/omp-rpc-mux`

- Repo：<https://github.com/Pepgent/omp-rpc-mux>
- `default branch=main`，Rust，metadata 更新时间 **2026-11-01T13:16:46Z**，早于本次 cutoff。
- 下界后的 `search_commits`：**0**；当前 main 没有本 cutoff 后的新 merge/source commit。当前 main README 仍规定同一程序提供 `serve`/`dial`，Mux 不保存 transcript、Agent 业务状态或业务队列：<https://github.com/Pepgent/omp-rpc-mux/blob/main/README.md>。
- 当前 open issue/PR：**无**。

### 5. `Pepgent/lab-library`

- Repo：<https://github.com/Pepgent/lab-library>
- `default branch=main`，TypeScript，metadata 更新时间 **2026-11-01T13:38:58Z**。
- [PR #14](https://github.com/Pepgent/lab-library/pull/14)（merged 13:38:53Z）恢复自动构建/加载边界，并把五个 `run_*` 影像节点改为消费公共 `File`、为 13 个节点写 `@group`/`@estimateMinutes`。
- 当前 open issue/PR：**无**。当前节点例：[`nodes/run_svm.ts:1-8`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_svm.ts#L1-L8) 以 `File.path` 的字节数计算；[`nodes/ask_human.ts:1-8`](https://github.com/Pepgent/lab-library/blob/main/nodes/ask_human.ts#L1-L8) 使用公共 `human` 构造器。

### 6. `Pepgent/images`

- Repo：<https://github.com/Pepgent/images>
- `default branch=main`，Dockerfile，metadata 更新时间 **2026-11-01T13:41:08Z**。
- [PR #12](https://github.com/Pepgent/images/pull/12)（merged 13:41:04Z）恢复 lab seed migrations 打包，并让 `central` 携带从 soroi 默认分支导出的 e2e/LabStandIn 依赖；`lab-web` 不携带 `/opt/soroi`。
- 当前 open issue/PR：**无**。当前 [`Dockerfile:9-36`](https://github.com/Pepgent/images/blob/main/Dockerfile#L9-L36) 将 remote-client、central e2e payload、lab-web migrations 分成不同 stage；当前 README 仍把 A0/S1/E2E-20/E2E-21 交给阶段 C。

### 7. `Pepgent/deploy`

- Repo：<https://github.com/Pepgent/deploy>
- `default branch=main`，Python，metadata 更新时间 **2026-11-01T15:13:47Z**。
- 下界后的合入： [PR #17](https://github.com/Pepgent/deploy/pull/17)（13:47:17Z，central artifact/install、auth seed、release import overlay）、[#19](https://github.com/Pepgent/deploy/pull/19)（14:56:57Z，remote TemplateMetadata 与裸 OCI digest）、[#21](https://github.com/Pepgent/deploy/pull/21)（15:13:43Z，Lab worktree/library volume roots）。
- 当前 open issue/PR：**无**。

### 8. `Pepgent/PM`

- Repo：<https://github.com/Pepgent/PM>
- `default branch=main`，TypeScript，metadata 更新时间 **2026-11-01T17:10:44Z**。
- 当前 open issue（只取正文/不取另一席报告或票理由）：
  - [PM#41](https://github.com/Pepgent/PM/issues/41)：移除 PM 中 council 代码/设计副本；正文的当前责任是 PM 只作决策发布与归档，并明确其 blocks [soroi#322](https://github.com/Pepgent/soroi/issues/322)。
  - [PM#15](https://github.com/Pepgent/PM/issues/15)：D9-03 点线面缺口报告与表决；正文要求先收齐 F01–F31 的真实 runtime 证据。
  - [PM#14](https://github.com/Pepgent/PM/issues/14)：D9-02 叶子来源分类与录制值比对；正文要求每个叶子都有类别和证据路径。
  - [PM#13](https://github.com/Pepgent/PM/issues/13)：D9-01 18 个字段的叶子类型清单；正文要求覆盖 18 个字段并由 low 复核。
- 当前 open PR：**无**。上述 PM 正文都明确“类型/构建/容器存活不替代完整 runtime 证据”，本报告不把任何 `DONE`/merge 标签扩展成 runtime 结论。

## 二、接缝实现的事实链

### A. store ↔ plugin ↔ Lab

1. **store 的 authority 与公开契约已合入。** Soroi 当前 `packages/store/src/contract.ts` 仍定义 `Value`、`Capture`、`Call`、`AgentProgressBatch`/`AgentProgress`、`AgentGenerationTransfer` 等公开 ADT；`packages/omp-soroi/src/eval/store.ts` 通过 `pepgent-store/contract` 消费它们，并把 store 作为唯一 HTTP 边界，不在 evaluator 保存当前 run/namespace 副本。相关当前 source：[`packages/omp-soroi/src/eval/store.ts:1-75`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/store.ts#L1-L75)、[`packages/omp-soroi/src/eval/store.ts:84-159`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/store.ts#L84-L159)。PR #294 的合入正文说明 `store-contract` 分支由 main push workflow 维护；该分支首次生成/追加提交在合入后观察，不把 workflow 的存在当作已经观察到的派生结果。
2. **Pepgent Lab 没有另立 store schema。** [Pepgent#45 diff](https://github.com/Pepgent/Pepgent/pull/45/files) 的当前落点 [`apps/web/src/protocol/lab/external/store.ts:7-88`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/external/store.ts#L7-L88) 从 `pepgent-store/contract` import/re-export schema/type，只为 Lab 的 `RunId`/`SessionId`/`FnName` 等做边界别名。
3. **Lab library consumer 已接上 store usage/version 读方。** 当前 [`apps/web/src/server/lab/library.ts:155-187`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/library.ts#L155-L187) 用 `SOROI_STORE_URL` 读取 `functions/{fn}/usage` 与 `versions/{version}`，按 `FunctionUsageSchema`/`NodeVersionSchema` 解析；当前 [`apps/web/src/server/lab/operations.ts:96-120`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L96-L120) 在 nodes page 组装 library、usage、draft references、remote templates 与 version。
4. **store 的 `Aborted` 分支已存在，但 plugin 消费路径仍有缺口。** 当前 open [soroi#323](https://github.com/Pepgent/soroi/issues/323) 正文给出 source anchors：`packages/store/src/store.ts:401-404` 已在 `Aborted` 分支 `commitVolume(position, "optional")` 并写 `call_started`/`call_aborted`；`packages/store/src/store.ts:312-327` 会把 `soroi-batch/*.parquet` 同事务汇入 `agent_progress`。同一正文又指出 [`packages/omp-soroi/src/eval/index.ts:81-88`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/index.ts#L81-L88) 把普通 abort 后的 reject 归为 `failed`、跳过 `s.commit`，[`packages/omp-soroi/src/eval/index.ts:106-110`](https://github.com/Pepgent/soroi/blob/main/packages/omp-soroi/src/eval/index.ts#L106-L110) 随后清理 transfer；因此 store 已有的 branch 尚未被插件整运行-abort 路径消费。#323 自己标出两道闸门均为静态 `[INFERENCE]`、未重跑；这不是 runtime 通过结论。
5. **Remote Agent progress 的 producer/consumer 边界已合入但跨仓仍未闭合。** [soroi#319](https://github.com/Pepgent/soroi/pull/319) 的 source/正文规定 RemoteChild 写四列 `seq, at, kind, transcript_entry` 的 `.parquet.tmp` 后 rename；store 在正式步骤 commit 时补 `run/step/position` 并写入 `agent_progress`。PR 的真实读数是在本地 Mux/store 与替身 remote 上得到，真实 Komodo/Slurm 和 wake generation 的批次仍由 [soroi#233](https://github.com/Pepgent/soroi/issues/233) 承接。

### B. Lab library ↔ Lab backend ↔ deploy

1. **库的 producer 已改为 File 输入。** [lab-library#14](https://github.com/Pepgent/lab-library/pull/14) 合入后，当前 `nodes/run_{svm,rf,gp,knn,lr}.ts` 从 `File` 取 `stat(path).size`，并在 JSDoc 给 13 个节点写 group/estimate；[`nodes/run_svm.ts:1-8`](https://github.com/Pepgent/lab-library/blob/main/nodes/run_svm.ts#L1-L8) 是当前 main 的直接例子。
2. **Lab backend 的 central checkout 与 merge 逻辑已合入。** 当前 [`apps/web/src/server/lab/library.ts:83-128`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/library.ts#L83-L128) 让一个 runtime owner 串行使用 cache checkout、fetch/ff-only default branch；[`apps/web/src/server/lab/library.ts:206-232`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/library.ts#L206-L232) 读 nodes、drafts、staged source；[`apps/web/src/server/lab/library.ts:316-353`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/library.ts#L316-L353) 在 `cacheHome` 下建立 integration checkout、`git apply --3way`、commit/push，再 fast-forward central checkout。Pepgent#54 已合入，消费方不再依赖临时 `/tmp` 集成检出作为最终路径。
3. **权限/owner 与 store/remote seam 已在实现，但多数 Lab page/command 尚未接通。** [`apps/web/src/server/lab/operations.ts:33-65`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L33-L65) 由 Better Auth 取得 member/grant/owner，不让 Lab 表另存授权判定；`readNodes` 只覆盖 nodes。[`apps/web/src/server/lab/operations.ts:122-140`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/server/lab/operations.ts#L122-L140) 对其它 page 返回 typed `not_supported`；[`apps/web/src/server/lab/operations.ts:155-208`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L155-L208) 仅把四个 `library.*` command 路由到实现，其余 command 明确返回 `not_supported`。这是当前 source 事实，不把 open issue 标题解释成已实现。
4. **Lab↔Mux host tool 接缝已合入，但当前 queue/reader/业务状态仍由消费者负责。** [`apps/web/src/server/lab/sessions.ts:69-123`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/sessions.ts#L69-L123) 处理 `host_tool_call`/`host_tool_cancel`，给 generation 设置 `hostToolDefinitions()` 并把结果送回；[`apps/web/src/server/lab/tools.ts:78-100`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L78-L100) 的 `store:` artifact 通过 `SOROI_STORE_URL` 读对象，discussion artifact 从 conversation worktree 读；host tool 本身不写 store。当前 open [Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20)、[#21](https://github.com/Pepgent/Pepgent/issues/21)、[#17](https://github.com/Pepgent/Pepgent/issues/17)、[#24](https://github.com/Pepgent/Pepgent/issues/24) 仍承载读取/流、Bridge、catalog/事件、介入等后续 slices。
5. **deploy 已把两个 Lab 根注入到相应 volume。** 当前 [`stacks/pepgent-central/compose.yaml:88-111`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/compose.yaml#L88-L111) 将 `PEPGENT_LAB_WORKTREE_HOME=/work` 与 `PEPGENT_LAB_LIBRARY_HOME=/var/lib/pepgent/library` 写入 `lab-web`；同一 compose 的 volumes 在 [`:146-177`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/compose.yaml#L146-L177) 声明 `session-worktrees`/`library-cache`。这与 [deploy#21](https://github.com/Pepgent/deploy/pull/21) 一致，但该 PR 正文明确只做声明检查，真实 Lab clone/merge 生命周期留阶段 C。

### C. remote TemplateMetadata ↔ Lab ↔ deploy

1. **remote producer 已合入 main。** [remote#19](https://github.com/Pepgent/remote/pull/19) 的当前落点 [`src/model.rs:230-377`](https://github.com/Pepgent/remote/blob/main/src/model.rs#L230-L377) 增加 `TemplateDeclaration`、`TemplateMetadata`、`TemplateResources` 并将 `TemplateInfo.metadata` 作为必需字段；[`src/identity.rs:130-221`](https://github.com/Pepgent/remote/blob/main/src/identity.rs#L130-L221) 以模板 source/执行设置构造 metadata，工作 volume 首项为 `rw`，声明重复工作卷时报错。metadata 是目录事实，remote backend 不据此执行资源调度。
2. **deploy catalog consumer 已同步。** 当前 [`stacks/pepgent-central/remote.toml:1-24`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/remote.toml#L1-L24) 为 `soroi-komodo` 补 `resources` 与 metadata；[`stacks/pepgent-central/slurm.toml:1-29`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/slurm.toml#L1-L29) 为 `soroi-slurm` 补 metadata，并使用不带 `docker://` 的裸 OCI digest 引用。deploy#19 正文说明这些是 isolated-test declarations，不是生产资源承诺；当前没有 preview/apply 后的真实 catalog read 证据。
3. **Pepgent Lab consumer 已接 CLI 与 schema。** 当前 [`apps/web/src/server/lab/remote.ts:7-42`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/remote.ts#L7-L42) 运行 `remote templates`，按 `TemplateWireSchema` 解析；`readNodes` 将结果作为 nodes page 的 `templates` 返回（见 `operations.ts:96-120`）。这证明源代码接线，不证明真实 Core/registry/Slurm 的 `remote templates` 在部署环境成功。

### D. Mux ↔ Soroi/remote/Lab

1. **Mux 自身在 cutoff 后没有 source 变动。** 当前 [`src/serve.rs:30-99`](https://github.com/Pepgent/omp-rpc-mux/blob/main/src/serve.rs#L30-L99) 的 `serve` 仍提供 writer/process/reader/files/presence/endpoints 路由，区分基础 bearer 与可选 trusted-reader bearer；[`src/dial.rs:20-82`](https://github.com/Pepgent/omp-rpc-mux/blob/main/src/dial.rs#L20-L82) 仍以 generation/token 建 process 连接后启动 child；[`src/protocol.rs:1-112`](https://github.com/Pepgent/omp-rpc-mux/blob/main/src/protocol.rs#L1-L112) 仍限定 reader command 与 `mux_*` control frame。Mux 当前 main 无 open issue/PR。
2. **Soroi 已消费 Mux generation 但真实跨后端仍未验收。** Soroi PR #316 将 store transfer 的 generation 改为原样 string；PR #318/319/320 将 remote Agent、批次与有序停止接到 Mux/remote/store。PR #318/319/320 的正文均明确真实 Komodo/Slurm、部署凭据和阶段 C E2E 留空；因此“Mux 接线已合入”不等于“remote/Lab 端到端可用”。
3. **Pepgent Lab 已消费 host-tool 回调。** 当前 sessions source 处理 host tool call/cancel，并通过 Mux writer 返回结果；然而 [Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20) 的正文仍把在途 overlay/SSE 作为 open slice，且 [Pepgent#24](https://github.com/Pepgent/Pepgent/issues/24) 仍把 intervention/abort/human IRC 作为 open slice。
4. **deploy 当前只配置基础 Mux bearer。** 当前 compose 的 `mux` service 在 [`stacks/pepgent-central/compose.yaml:65-82`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/compose.yaml#L65-L82) 设置 `MUX_AUTH_TOKEN`，没有同一段的 `MUX_TRUSTED_READER_TOKEN` 配置。这里只记录声明事实，不推断运维是否另有外部覆盖；Soroi/remote 的 trusted-reader 业务证据仍在 E2E open slices。

### E. images ↔ deploy ↔ release/store

1. **images 当前分层与 deploy 的 release 输入已合入。** 当前 [`Dockerfile:9-36`](https://github.com/Pepgent/images/blob/main/Dockerfile#L9-L36) 先构造 `remote-client`，再在 `central` 复制 `/opt/soroi/node_modules` 与 `/opt/soroi/e2e`，在 `lab-web` 的 web build 中复制 `apps/web/resources/lab/migrations`（[`Dockerfile:74-86`](https://github.com/Pepgent/images/blob/main/Dockerfile#L74-L86)）。`lab-web` 默认 Node entrypoint 与 central e2e payload 的职责已分开。
2. **deploy 当前启动顺序和 release import 接缝已合入。** [`stacks/pepgent-central/lab-entrypoint.sh:1-27`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/lab-entrypoint.sh#L1-L27) 复制 models/config、生成 remote home、解包 `/release/soroi.tar`，用同一个 artifact 调 `install.ts --artifact`，再 `exec` Node；[`release-init.ts:1-76`](https://github.com/Pepgent/deploy/blob/main/stacks/pepgent-central/release-init.ts#L1-L76) 读 manifest 后向 `/releases/{version}` 发 PUT。compose 还把 `auth-seed` 置于 `lab-web` 之前，并让 store/mux 成为依赖。
3. **已合入不等于部署 runtime 已观察。** deploy#17 正文的客户端协议桩只证明 release-init 请求和失败退出；真实 store import、seed→Web、浏览器会话和安装后工具清单分别留给 [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23)、[#30](https://github.com/Pepgent/Pepgent/issues/30) 和 [soroi#235](https://github.com/Pepgent/soroi/issues/235)。images#12 的断网 central smoke/seed 只证明镜像内入口/依赖布局的本地闭合，不替代 A0/S1。

## 三、已合入与尚未合入消费方

| 接缝 | 已合入的 producer / source | 已合入的 consumer | 当前尚未闭合或未有真实证据 |
|---|---|---|---|
| store contract / AgentProgress / release | soroi store contract、store-contract workflow、Aborted/AgentProgress store schema；soroi PR #294/#316/#319 | `omp-soroi` HTTP client；Pepgent external/store re-export；Lab library usage/version/artifact 读方 | [soroi#323](https://github.com/Pepgent/soroi/issues/323) 证明整运行 abort 路径仍跳过 step commit；[soroi#220](https://github.com/Pepgent/soroi/issues/220)、[#233](https://github.com/Pepgent/soroi/issues/233)、[Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23) 的统一 runtime 尚未完成 |
| Lab nodes/File/metadata | lab-library#14 的 File 节点与 group/estimate；soroi File root 已由 #304 合入 | Pepgent#46 library definition/read、#54 cacheHome merge、Lab nodes page | Lab 导出/页面与 File root 的真实路径仍由 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30)、[soroi#220](https://github.com/Pepgent/soroi/issues/220) 承接；多数 Lab pages/commands 在 source 中仍 `not_supported` |
| remote TemplateMetadata | remote#19 `TemplateInfo.metadata` | deploy#19 TOML；Pepgent#46 `remote templates` parser | deploy#19 明确未跑真实 Core/registry/catalog；Lab↔remote 仍等阶段 C 的 [soroi#231](https://github.com/Pepgent/soroi/issues/231) / [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23) |
| Mux generation/process/reader/files | Mux main 当前实现（cutoff 后无新提交） | soroi #316/#318/#319/#320；Pepgent#53 sessions host tools；images/deploy compose | 无 Mux open issue/PR，但真实 remote backend、凭据注入、Lab overlay/SSE/intervention 仍在 open issues；接线没有替代 E2E |
| Remote Agent/Parquet/abort | soroi #318/#319/#320 已合入；store 可消费四列 batch | central/local Mux/store 替身路径已有 PR 级观察 | #320 的 S1/S3 仍只有 `run_aborted`、无 `call_aborted`/进度入库，现由 #323 修复；真实 Komodo/Slurm 由 #233/#231/#232 仍 open |
| image/release/deploy | images#12、deploy#17/#19/#21、soroi release/boot 合入 | deploy compose、artifact installer、store import client、Lab env roots | images/deploy PR 正文均把真实 seed/Web/browser/store import/installer tool list/A0/S1 留给阶段 C；没有把声明检查视作 runtime |
| council/PM | 只有当前 open 正文中的迁出意图与依赖关系 | 当前没有请求范围内已合入的 council consumer implementation | PM#41、soroi#321/#322 都仍 open；PM 只作为发布/归档事实源，未读取其他席位报告/票据理由 |

## 四、验收证据边界

### 已观察到的近端/局部行为（只按原 PR 正文的范围计）

- `remote#19`：临时 remote home 中 `remote templates` 的配置解析/metadata 形状与负例；未连接真实 Komodo Core/registry，也未与 Lab 联调。
- `soroi#295`：store 本机服务 + remote 协议桩 + 实际 release boot/runner 的 Program 流程，含 copy-in/out、Adopted 与 remove 顺序；不是 Komodo/Slurm runtime。
- `soroi#318/#319/#320`：真实 omp/Mux/store 配合本地 remote CLI 替身的 Agent、批次与顺序停止读数；#320 的读数本身揭示了整运行 abort 后只剩 `run_aborted`，所以不能把该 PR 的 merge 当成 #323 的结果 1/2 已通过。
- `Pepgent/Pepgent#46/#53/#54`：source-level Lab runtime、store/remote parser、host-tool callback、cacheHome integration checkout 已合入；这证明实现落点，不证明真实浏览器/下游业务路径。
- `lab-library#14`：一次性 Bun driver 对 File 字节数、缺失文件、节点元数据和 bundle 的本仓观察；没有真实安装 Soroi 后的 eval/File-root/Lab 页面验收。
- `images#12`：断网容器中的 central smoke、Bun cache、seed migrations、auth endpoint；正文明确不是 A0/S1/E2E-20。
- `deploy#17/#19/#21`：Compose/source declaration、协议桩、配置渲染与路径对应检查；没有真实 Core preview/apply、真实 store import、容器内完整 Lab/remote 生命周期。

### 当前仍需阶段 C/真实用户入口的事实

- [soroi#233](https://github.com/Pepgent/soroi/issues/233) 与 [#231](https://github.com/Pepgent/soroi/issues/231) 正文要求完整真实 remote Agent/Program 的 runtime 下游结果；仅“依赖代码已合入 main”可开工，不等于验收通过。
- [soroi#235](https://github.com/Pepgent/soroi/issues/235) 与当前 open [PR #260](https://github.com/Pepgent/soroi/pull/260) 仍要求从安装发行、fresh HOME、公开 launcher、实际五类行为完成 A0；PR #260 当前明写 A0 尚未通过。
- [Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23) / [#30](https://github.com/Pepgent/Pepgent/issues/30) 仍承接真实 server-function/浏览器/组装路径；Lab page source 中的 `not_supported` 不能用静态文件存在或 merge 替代。
- [PM#13](https://github.com/Pepgent/PM/issues/13)、[#14](https://github.com/Pepgent/PM/issues/14)、[#15](https://github.com/Pepgent/PM/issues/15) 的当前正文均把 runtime 证据放在 D9/F32 的前置条件中。PM#41 则只谈 PM 副本边界与发布影响；没有以这些正文推断 daemon runtime。
- [soroi#323](https://github.com/Pepgent/soroi/issues/323) 的原因段明确标注静态控制流与双闸门为 `[INFERENCE]`、未经本 issue 重跑；应只记录为当前 open defect/待验证，不宣称已修复或已复现 runtime。

## 结论（不设计新方案）

截至 **2026-11-01T17:14:34Z**，请求范围内的主要 producer/consumer 接线已在各仓 `main` 合入：store contract → plugin/Lab schema，lab-library File nodes → Lab library checkout/read/write，remote TemplateMetadata → deploy catalogs/Lab parser，Mux → Soroi/Pepgent session paths，images/deploy → release/store/Lab environment。`omp-rpc-mux` 本身在 cutoff 后无变动且无 open 项。

仍有三个可直接由源头确认的“尚未闭合”事实：

1. **Soroi plugin/store abort seam**：store 的 `Aborted`/batch 处理已存在，但 #320 的整运行 abort 读数没有提交在途步骤，#323 仍 open，且正文明确静态推断未重跑。
2. **跨组件消费/真实验收**：remote/Slurm/Komodo、Lab 浏览器/真实 server functions、A0/S1/E2E-16/17/18、PM D9/F32 仍由 open issues 承载；合入和局部替身观察均没有替代这些下游结果。
3. **Lab/council 的未实现或未切换区域**：Pepgent 当前 source 只把 library/discussion 的少量 operations 路由到实现，其它 page/command 返回 typed `not_supported`；soroi/PM 的 council 迁出与规则整体切换 issue 仍 open。