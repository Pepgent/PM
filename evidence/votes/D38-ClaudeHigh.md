# D38 选票：ClaudeHigh

议程：Pepgent#28 WEB-06：默认集群无源、首页 Lab 活动词表、镜像与模板的关联键（[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D38-01 v1：赞成（ClaudeHighD38，2026-11-01T21:10:50.821Z）



# D38 选票：ClaudeHigh 席（ClaudeHighD38）

- 议程：[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)
- 行版本：D38-01 v1、D38-02 v1、D38-03 v1，已用 `council queue --seat ClaudeHigh` 与 `council tally D38` 确认。
- 本席从空白历史出发，直接读了以下源头：
  - Pepgent/Pepgent、Pepgent/remote、Pepgent/images 三仓的 main，用 `gh api …/tarball/main` 取得，解到 `/tmp/ch38`；
  - PM 的 D7、D8、D12 正文与 D12-coverage；
  - 初审材料与闸门 A、B 的结论。
- 本席未读 git 历史或 session，未用 hash 作证据，未运行构建或测试。

| 行 | 票 |
|---|---|
| D38-01 v1 | 赞成 |
| D38-02 v1 | **反对**（附反例） |
| D38-03 v1 | 赞成 |

## D38-01 v1：赞成

### steady：主路径走得通

- **找不到默认集群的来源。**
  - D12 的 `TemplateMetadata.resources`（`D12-lab-wire.md:344-350`）只有每个模板自己的 `boundClusters` 和 `primaryCluster`。
  - remote 的 `model.rs:360-364` 和 `README.md:235` 把这两个字段定义为“模板唯一的后端端点”。
  - 没有任何一处给出 Lab 级的“默认集群选择”。
  - D12-coverage:389 把 `isDefault` 归为 U，依据写的是“P3 …默认选择资料”，而 P3 展开后的形状里并没有这一项。
- **改成 null 不需要动 UI。**
  - `isDefault` 的消费方只有 `renderer/features/lab-clusters/ui/clusters-page.tsx` 的第 63 行和第 589 行，写法都是 `x.isDefault && …`。字段改为 `boolean | null` 后，值为 null 时不渲染，`ui/**` 不用改。
  - fixture（`client/services/lab-fixture/compute.ts:24,44,64,84`）只是演示数据，按 D12:616 不能当数据用。
- **程序合规。** 本行走的是表决，满足 `AGENTS.md:123` 的要求；把该字段补进 D12:614-632 的表和 D8 §5.4，与 D12:27 的原则一致。

### F 流程范围：没有缩减

WEB-06 绑定的 F 流程是 F17 S2（算力页的作业与日志尾部）和 F31 ④（`D8-mvp-scope.md:136,150,340`），两者都没有用到默认集群标记。按 D8-16，F 流程走不到的项本来就列入 D9，所以这不是缩减。

### divergent：没有更简单的做法

三个落选方案都比本行差：

- 投影为 `false`：等于宣称“不是默认”，是造数。
- 取第一个模板的 `primaryCluster`：是推断。D12-coverage:461 也明说“不能…从数组第一项推断默认集群”。
- 让 remote 增加默认集群配置：为一个标记扩大 remote 的契约，代价过大。

## D38-02 v1：反对

反例全文见 `--counter D38-02`。要点：

- “节点合入”在 Lab 库默认分支上有三个入口命令：`library.merge`、`library.apply` 和 `agentTemplate.saveVersion`。依据：
  - `command.ts:74-75,110,112`；
  - `server/lab/library.ts:345,357`，其中 `library.apply` 与 `library.merge` 调用的是同一个 `this.merge`；
  - D7-11 写“再同一路 merge”；
  - D12-10 写“saveVersion=library.merge”。
- v1 的词表与写入只收 `library.merge`。结果是 F29 S2 主路径上 nodes 页的 `library.apply` 合入不写 activity，首页和 `settings.repoActivity` 都看不到这次合入，D7-02 的“节点合入”被缩小成一个入口。
- W-09 如果改写 `kind = library.apply`，又超出了 v1 的封闭词表，W-10 无法穷尽处理。可见 v1 没有闭合它要闭合的这份跨席契约。

### 起草者自补的“成员事件不进首页”：本席同意

- 首页 `HomeEvent.category` 只有 `experiments`、`data`、`milestones` 三类（`client/contracts/lab-home.ts:13,69`），原型 fixture 里也没有成员事件（`lab-fixture/home.ts:105-162`）。U59 与 D20-02 不允许新增类别。
- D7-02 只要求成员事件落库，没有要求在首页显示；也没有任何 F 流程走到首页的成员事件。
- 成员行照常落库并出线，不算缩减。

这一点不是反对的理由。

### 修订时建议顺带处理（不构成反对理由）

- D12-17 失效表的 `library` 频道应加上 `home`（`D12-lab-wire.md:611`）。
- 把 `library.merge` 映射到 `sources` 弹窗不合适：该弹窗的标题 copy 是“文献”（`lab-fixture/home.ts:254-257`），用在代码合入上名不副实。

## D38-03 v1：赞成

### steady：主路径走得通

- **remote 只接受规范的 OCI 引用。** remote 的 `OciImage` 用 `oci_client::Reference` 解析，拒绝 `docker://` 和 SIF 路径（`model.rs:182-211`，`README.md:307-310`）。因此 `TemplateMetadata.image` 一定是规范引用，v1 的归一规则对它成立。
- **主路径上的两个模板都能匹配到 `pepgent/omp-agent`。**
  - images 仓的发布地址是 `pepgent-registry.orb.local:5000/pepgent/omp-agent:latest`（`images/README.md:58`）。
  - Komodo 模板的 body 用 `SOROI_IMAGE` 展开后得到这个 omp-agent 引用（`remote/README.md:257-259`）。归一过程：去掉 `:latest`，再去掉首段的 `host:port`，得到 `pepgent/omp-agent`。
  - Slurm 模板写的是 digest 形式的引用（`images/README.md:151`）。去掉 `@sha256:…` 后，得到同样的结果。
- **从 images 检出得到发布路径。** images 仓是一个 Dockerfile，含 `omp-agent`、`central`、`lab-web` 三个 target，发布路径为 `pepgent/<target>`。从检出得到这个发布路径，属于 P15 的占位；按 `design-assumes-it-works`，先假定它能工作。

### 起草者自补的“多模板共用一个镜像时取按模板名排序的第一个”：本席同意

- **这是主路径，不是边缘情况。** DEP-02 登记的 soroi-komodo 和 Slurm 两个模板，body 都是 omp-agent（`D8-mvp-scope.md:360`；remote README:257），所以一个镜像对应多个模板正是主路径上会出现的情况。
- **对显示的实际影响很小。**
  - 视图里 `ImageRecord.resources` 是单个 `ResourceDefaults`（`lab-compute.ts:143-156`）。
  - 页面用到 `boundClusters` 和 `primaryCluster` 的地方，只有对 `clusterAvailability` 的逐项比对（`containers-view-model.ts:203-217`）。而 `clusterAvailability` 已列为第一版无来源字段（D12:621），投影为空，这两个字段在第一版不会渲染出任何标记。
  - 真正显示出来的只有 cpu、mem、gpu、disk、runtime 这几项。它们都是某个真实模板的事实，不是造数。
  - 正文已经把“只显示其中一个模板”写为代价，按名排序也给出了确定的选择。
- **不违反 D12-coverage:461。** 该条禁止的是“从数组第一项推断默认集群”。本行取的是一个模板自己的完整资源，不是从集合里推断出一个 Lab 级事实。

### F 流程范围：没有缩减

容器页不在 F17 S2 和 F31 的必经步骤里。本行补的是数据来源，没有删减任何东西。

### divergent

- 两个落选方案都更差：
  - 按 `identity.image` 的 digest 关联：需要读 registry v2 API，而第一版不读 tag 和 digest（D12-08、D8-16）。
  - 让 images 列出模板：依赖方向反了。
- 措辞上有一处小瑕疵：nodeBindingCount 一项里写的“`template` 属于这些模板”，实际字段是 `NodeDefinition.defaultEnvironment`（`protocol/lab/library.ts:30`）。语义明确，不影响主路径，只提请回写正文时改正。


## D38-02 v1：反对（ClaudeHighD38，2026-11-01T21:10:50.821Z）——作废：该行已修订到 v2

**反例：** # D38-02 v1 反例：“节点合入”有三个入口命令，v1 词表只收 `library.merge`，nodes 页主路径的合入不产生 activity

## 结论

D38-02 v1 规定 `kind` 是“产生该事件的 Lab 命令名”，“节点合入”族只列 `library.merge`；W-09 只在“上述命令成功落库时”写 activity 行；`settings.repoActivity` 只取 `kind = library.merge` 的行。

但在 Lab 库默认分支上产生合入提交的命令有三个，不止一个。W-09 照 v1 字面实现时，另外两个命令的合入不写 activity。于是 nodes 页主路径（F29 S2 的 `library.apply`）上的合入，在首页事件流和设置页仓库活动里都不出现。D7-02 规定 activity 要记“节点合入”，v1 只覆盖了其中一个入口，没有表决就缩小了 D7-02 的范围。

## 复现步骤（只读，源码取自 `gh api repos/Pepgent/Pepgent/tarball/main`）

1. **三个命令都产生合入提交。**
   - `apps/web/src/protocol/lab/command.ts:112`：`library.merge { lab, conversation, paths }`。
   - `command.ts:110`：`library.apply { lab, conversation, fns }`。它的结果见 `command.ts:174-178`：`{ kind: 'applied', commit, paths, staging }`，与 `library.merge` 带同一组 `libraryCommit` 字段。
   - `command.ts:74-75`：`agentTemplate.saveVersion`，注释为 “= library.merge of the template's path (D7:71)”。它的结果见 `command.ts:152`：`{ kind: 'merged', commit, paths }`。
2. **实现上是同一次合入。** `apps/web/src/server/lab/library.ts` 中：
   - `case 'library.apply'`（第 315 行起）先把暂存源码写进 nodes 页 Panel 的 worktree，然后在第 345 行调用 `this.merge(command.lab, command.conversation, …)`；
   - `case 'library.merge'`（第 354-357 行）调用的也是这个 `this.merge`；
   - `this.merge`（第 379-380 行的注释）执行 `git apply --3way`、commit、push，再把中心检出快进。
3. **决策正文同样认为这三个命令都是合入。**
   - D7-11（`PM/evidence/decisions/D7-lab-backend.md:71`）：“library.apply 先把暂存源码写进 nodes 页 Panel worktree，**再同一路 merge**”。
   - D12-10（`D12-lab-wire.md:42`）：“saveVersion{conversation,id}=library.merge `.omp/agents/<id>`”。
   - D7-02（`D7-lab-backend.md:62`）：activity 记“成员、结论确认、**节点合入**等 Lab 自有事件”。
4. **这是 F 流程的主路径。** F29 S2（`D8-mvp-scope.md:148`）：“`library.stage` 之后，影响视图列出这些运行；`library.apply` 生成 commit，并把检出快进”。也就是说，nodes 页的合入走的是 `library.apply`，不是 `library.merge`。
5. **照 v1 实现的结果。** 用户在 nodes 页执行 `library.stage` → `library.apply`，Lab 库默认分支得到一个新提交。按 v1：
   - `library.apply` 不在词表里，W-09 不写 activity 行；
   - `home.activity` 中没有这次合入，首页 `data` 类事件为空；
   - `settings.repoActivity`（`kind = library.merge`）中也没有这次提交。

   通过 `agentTemplate.saveVersion` 保存智能体模板版本，结果相同。

6. **另一种实现也不成立。** 如果 W-09 为了不丢事件而写 `kind = 'library.apply'`，这个值不在 v1 词表里，W-10 没有对应映射，穷尽 switch 不能处理它。两种做法都说明 v1 没有闭合 W-09 与 W-10 之间的这份契约，而这正是本行要闭合的东西。

## 修订方向（供起草者参考，不替起草者定稿）

“节点合入”族改为凡是在 Lab 库默认分支产生合入提交的命令都写一行：`library.merge`、`library.apply`、`agentTemplate.saveVersion`。可以选以下任一做法：

- 三个命令名都列入词表，并给出相同的首页映射；`settings.repoActivity` 取这三个值的行；
- 或明确规定：凡是经 `this.merge` 落提交的命令，一律写 `kind = library.merge`。这需要同时把“kind 取命令名”改成“kind 取事件名”。

修订时建议顺带处理两点：

- D12-17 失效表中，`library` 频道目前只让 `nodes/flowEditor/experiment/containers/settings` 失效（`D12-lab-wire.md:611`）。本行让合入出现在首页之后，该行应加上 `home`。
- `library.merge → action.dialog 'sources'`：该弹窗的标题 copy 是 “Sources / 文献”（`apps/web/src/client/services/lab-fixture/home.ts:254-257`），用在代码合入上，用户看到的名称不符。


# D38 选票：ClaudeHigh 席（ClaudeHighD38）

- 议程：[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)
- 行版本：D38-01 v1、D38-02 v1、D38-03 v1，已用 `council queue --seat ClaudeHigh` 与 `council tally D38` 确认。
- 本席从空白历史出发，直接读了以下源头：
  - Pepgent/Pepgent、Pepgent/remote、Pepgent/images 三仓的 main，用 `gh api …/tarball/main` 取得，解到 `/tmp/ch38`；
  - PM 的 D7、D8、D12 正文与 D12-coverage；
  - 初审材料与闸门 A、B 的结论。
- 本席未读 git 历史或 session，未用 hash 作证据，未运行构建或测试。

| 行 | 票 |
|---|---|
| D38-01 v1 | 赞成 |
| D38-02 v1 | **反对**（附反例） |
| D38-03 v1 | 赞成 |

## D38-01 v1：赞成

### steady：主路径走得通

- **找不到默认集群的来源。**
  - D12 的 `TemplateMetadata.resources`（`D12-lab-wire.md:344-350`）只有每个模板自己的 `boundClusters` 和 `primaryCluster`。
  - remote 的 `model.rs:360-364` 和 `README.md:235` 把这两个字段定义为“模板唯一的后端端点”。
  - 没有任何一处给出 Lab 级的“默认集群选择”。
  - D12-coverage:389 把 `isDefault` 归为 U，依据写的是“P3 …默认选择资料”，而 P3 展开后的形状里并没有这一项。
- **改成 null 不需要动 UI。**
  - `isDefault` 的消费方只有 `renderer/features/lab-clusters/ui/clusters-page.tsx` 的第 63 行和第 589 行，写法都是 `x.isDefault && …`。字段改为 `boolean | null` 后，值为 null 时不渲染，`ui/**` 不用改。
  - fixture（`client/services/lab-fixture/compute.ts:24,44,64,84`）只是演示数据，按 D12:616 不能当数据用。
- **程序合规。** 本行走的是表决，满足 `AGENTS.md:123` 的要求；把该字段补进 D12:614-632 的表和 D8 §5.4，与 D12:27 的原则一致。

### F 流程范围：没有缩减

WEB-06 绑定的 F 流程是 F17 S2（算力页的作业与日志尾部）和 F31 ④（`D8-mvp-scope.md:136,150,340`），两者都没有用到默认集群标记。按 D8-16，F 流程走不到的项本来就列入 D9，所以这不是缩减。

### divergent：没有更简单的做法

三个落选方案都比本行差：

- 投影为 `false`：等于宣称“不是默认”，是造数。
- 取第一个模板的 `primaryCluster`：是推断。D12-coverage:461 也明说“不能…从数组第一项推断默认集群”。
- 让 remote 增加默认集群配置：为一个标记扩大 remote 的契约，代价过大。

## D38-02 v1：反对

反例全文见 `--counter D38-02`。要点：

- “节点合入”在 Lab 库默认分支上有三个入口命令：`library.merge`、`library.apply` 和 `agentTemplate.saveVersion`。依据：
  - `command.ts:74-75,110,112`；
  - `server/lab/library.ts:345,357`，其中 `library.apply` 与 `library.merge` 调用的是同一个 `this.merge`；
  - D7-11 写“再同一路 merge”；
  - D12-10 写“saveVersion=library.merge”。
- v1 的词表与写入只收 `library.merge`。结果是 F29 S2 主路径上 nodes 页的 `library.apply` 合入不写 activity，首页和 `settings.repoActivity` 都看不到这次合入，D7-02 的“节点合入”被缩小成一个入口。
- W-09 如果改写 `kind = library.apply`，又超出了 v1 的封闭词表，W-10 无法穷尽处理。可见 v1 没有闭合它要闭合的这份跨席契约。

### 起草者自补的“成员事件不进首页”：本席同意

- 首页 `HomeEvent.category` 只有 `experiments`、`data`、`milestones` 三类（`client/contracts/lab-home.ts:13,69`），原型 fixture 里也没有成员事件（`lab-fixture/home.ts:105-162`）。U59 与 D20-02 不允许新增类别。
- D7-02 只要求成员事件落库，没有要求在首页显示；也没有任何 F 流程走到首页的成员事件。
- 成员行照常落库并出线，不算缩减。

这一点不是反对的理由。

### 修订时建议顺带处理（不构成反对理由）

- D12-17 失效表的 `library` 频道应加上 `home`（`D12-lab-wire.md:611`）。
- 把 `library.merge` 映射到 `sources` 弹窗不合适：该弹窗的标题 copy 是“文献”（`lab-fixture/home.ts:254-257`），用在代码合入上名不副实。

## D38-03 v1：赞成

### steady：主路径走得通

- **remote 只接受规范的 OCI 引用。** remote 的 `OciImage` 用 `oci_client::Reference` 解析，拒绝 `docker://` 和 SIF 路径（`model.rs:182-211`，`README.md:307-310`）。因此 `TemplateMetadata.image` 一定是规范引用，v1 的归一规则对它成立。
- **主路径上的两个模板都能匹配到 `pepgent/omp-agent`。**
  - images 仓的发布地址是 `pepgent-registry.orb.local:5000/pepgent/omp-agent:latest`（`images/README.md:58`）。
  - Komodo 模板的 body 用 `SOROI_IMAGE` 展开后得到这个 omp-agent 引用（`remote/README.md:257-259`）。归一过程：去掉 `:latest`，再去掉首段的 `host:port`，得到 `pepgent/omp-agent`。
  - Slurm 模板写的是 digest 形式的引用（`images/README.md:151`）。去掉 `@sha256:…` 后，得到同样的结果。
- **从 images 检出得到发布路径。** images 仓是一个 Dockerfile，含 `omp-agent`、`central`、`lab-web` 三个 target，发布路径为 `pepgent/<target>`。从检出得到这个发布路径，属于 P15 的占位；按 `design-assumes-it-works`，先假定它能工作。

### 起草者自补的“多模板共用一个镜像时取按模板名排序的第一个”：本席同意

- **这是主路径，不是边缘情况。** DEP-02 登记的 soroi-komodo 和 Slurm 两个模板，body 都是 omp-agent（`D8-mvp-scope.md:360`；remote README:257），所以一个镜像对应多个模板正是主路径上会出现的情况。
- **对显示的实际影响很小。**
  - 视图里 `ImageRecord.resources` 是单个 `ResourceDefaults`（`lab-compute.ts:143-156`）。
  - 页面用到 `boundClusters` 和 `primaryCluster` 的地方，只有对 `clusterAvailability` 的逐项比对（`containers-view-model.ts:203-217`）。而 `clusterAvailability` 已列为第一版无来源字段（D12:621），投影为空，这两个字段在第一版不会渲染出任何标记。
  - 真正显示出来的只有 cpu、mem、gpu、disk、runtime 这几项。它们都是某个真实模板的事实，不是造数。
  - 正文已经把“只显示其中一个模板”写为代价，按名排序也给出了确定的选择。
- **不违反 D12-coverage:461。** 该条禁止的是“从数组第一项推断默认集群”。本行取的是一个模板自己的完整资源，不是从集合里推断出一个 Lab 级事实。

### F 流程范围：没有缩减

容器页不在 F17 S2 和 F31 的必经步骤里。本行补的是数据来源，没有删减任何东西。

### divergent

- 两个落选方案都更差：
  - 按 `identity.image` 的 digest 关联：需要读 registry v2 API，而第一版不读 tag 和 digest（D12-08、D8-16）。
  - 让 images 列出模板：依赖方向反了。
- 措辞上有一处小瑕疵：nodeBindingCount 一项里写的“`template` 属于这些模板”，实际字段是 `NodeDefinition.defaultEnvironment`（`protocol/lab/library.ts:30`）。语义明确，不影响主路径，只提请回写正文时改正。


## D38-03 v1：赞成（ClaudeHighD38，2026-11-01T21:10:50.821Z）



# D38 选票：ClaudeHigh 席（ClaudeHighD38）

- 议程：[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)
- 行版本：D38-01 v1、D38-02 v1、D38-03 v1，已用 `council queue --seat ClaudeHigh` 与 `council tally D38` 确认。
- 本席从空白历史出发，直接读了以下源头：
  - Pepgent/Pepgent、Pepgent/remote、Pepgent/images 三仓的 main，用 `gh api …/tarball/main` 取得，解到 `/tmp/ch38`；
  - PM 的 D7、D8、D12 正文与 D12-coverage；
  - 初审材料与闸门 A、B 的结论。
- 本席未读 git 历史或 session，未用 hash 作证据，未运行构建或测试。

| 行 | 票 |
|---|---|
| D38-01 v1 | 赞成 |
| D38-02 v1 | **反对**（附反例） |
| D38-03 v1 | 赞成 |

## D38-01 v1：赞成

### steady：主路径走得通

- **找不到默认集群的来源。**
  - D12 的 `TemplateMetadata.resources`（`D12-lab-wire.md:344-350`）只有每个模板自己的 `boundClusters` 和 `primaryCluster`。
  - remote 的 `model.rs:360-364` 和 `README.md:235` 把这两个字段定义为“模板唯一的后端端点”。
  - 没有任何一处给出 Lab 级的“默认集群选择”。
  - D12-coverage:389 把 `isDefault` 归为 U，依据写的是“P3 …默认选择资料”，而 P3 展开后的形状里并没有这一项。
- **改成 null 不需要动 UI。**
  - `isDefault` 的消费方只有 `renderer/features/lab-clusters/ui/clusters-page.tsx` 的第 63 行和第 589 行，写法都是 `x.isDefault && …`。字段改为 `boolean | null` 后，值为 null 时不渲染，`ui/**` 不用改。
  - fixture（`client/services/lab-fixture/compute.ts:24,44,64,84`）只是演示数据，按 D12:616 不能当数据用。
- **程序合规。** 本行走的是表决，满足 `AGENTS.md:123` 的要求；把该字段补进 D12:614-632 的表和 D8 §5.4，与 D12:27 的原则一致。

### F 流程范围：没有缩减

WEB-06 绑定的 F 流程是 F17 S2（算力页的作业与日志尾部）和 F31 ④（`D8-mvp-scope.md:136,150,340`），两者都没有用到默认集群标记。按 D8-16，F 流程走不到的项本来就列入 D9，所以这不是缩减。

### divergent：没有更简单的做法

三个落选方案都比本行差：

- 投影为 `false`：等于宣称“不是默认”，是造数。
- 取第一个模板的 `primaryCluster`：是推断。D12-coverage:461 也明说“不能…从数组第一项推断默认集群”。
- 让 remote 增加默认集群配置：为一个标记扩大 remote 的契约，代价过大。

## D38-02 v1：反对

反例全文见 `--counter D38-02`。要点：

- “节点合入”在 Lab 库默认分支上有三个入口命令：`library.merge`、`library.apply` 和 `agentTemplate.saveVersion`。依据：
  - `command.ts:74-75,110,112`；
  - `server/lab/library.ts:345,357`，其中 `library.apply` 与 `library.merge` 调用的是同一个 `this.merge`；
  - D7-11 写“再同一路 merge”；
  - D12-10 写“saveVersion=library.merge”。
- v1 的词表与写入只收 `library.merge`。结果是 F29 S2 主路径上 nodes 页的 `library.apply` 合入不写 activity，首页和 `settings.repoActivity` 都看不到这次合入，D7-02 的“节点合入”被缩小成一个入口。
- W-09 如果改写 `kind = library.apply`，又超出了 v1 的封闭词表，W-10 无法穷尽处理。可见 v1 没有闭合它要闭合的这份跨席契约。

### 起草者自补的“成员事件不进首页”：本席同意

- 首页 `HomeEvent.category` 只有 `experiments`、`data`、`milestones` 三类（`client/contracts/lab-home.ts:13,69`），原型 fixture 里也没有成员事件（`lab-fixture/home.ts:105-162`）。U59 与 D20-02 不允许新增类别。
- D7-02 只要求成员事件落库，没有要求在首页显示；也没有任何 F 流程走到首页的成员事件。
- 成员行照常落库并出线，不算缩减。

这一点不是反对的理由。

### 修订时建议顺带处理（不构成反对理由）

- D12-17 失效表的 `library` 频道应加上 `home`（`D12-lab-wire.md:611`）。
- 把 `library.merge` 映射到 `sources` 弹窗不合适：该弹窗的标题 copy 是“文献”（`lab-fixture/home.ts:254-257`），用在代码合入上名不副实。

## D38-03 v1：赞成

### steady：主路径走得通

- **remote 只接受规范的 OCI 引用。** remote 的 `OciImage` 用 `oci_client::Reference` 解析，拒绝 `docker://` 和 SIF 路径（`model.rs:182-211`，`README.md:307-310`）。因此 `TemplateMetadata.image` 一定是规范引用，v1 的归一规则对它成立。
- **主路径上的两个模板都能匹配到 `pepgent/omp-agent`。**
  - images 仓的发布地址是 `pepgent-registry.orb.local:5000/pepgent/omp-agent:latest`（`images/README.md:58`）。
  - Komodo 模板的 body 用 `SOROI_IMAGE` 展开后得到这个 omp-agent 引用（`remote/README.md:257-259`）。归一过程：去掉 `:latest`，再去掉首段的 `host:port`，得到 `pepgent/omp-agent`。
  - Slurm 模板写的是 digest 形式的引用（`images/README.md:151`）。去掉 `@sha256:…` 后，得到同样的结果。
- **从 images 检出得到发布路径。** images 仓是一个 Dockerfile，含 `omp-agent`、`central`、`lab-web` 三个 target，发布路径为 `pepgent/<target>`。从检出得到这个发布路径，属于 P15 的占位；按 `design-assumes-it-works`，先假定它能工作。

### 起草者自补的“多模板共用一个镜像时取按模板名排序的第一个”：本席同意

- **这是主路径，不是边缘情况。** DEP-02 登记的 soroi-komodo 和 Slurm 两个模板，body 都是 omp-agent（`D8-mvp-scope.md:360`；remote README:257），所以一个镜像对应多个模板正是主路径上会出现的情况。
- **对显示的实际影响很小。**
  - 视图里 `ImageRecord.resources` 是单个 `ResourceDefaults`（`lab-compute.ts:143-156`）。
  - 页面用到 `boundClusters` 和 `primaryCluster` 的地方，只有对 `clusterAvailability` 的逐项比对（`containers-view-model.ts:203-217`）。而 `clusterAvailability` 已列为第一版无来源字段（D12:621），投影为空，这两个字段在第一版不会渲染出任何标记。
  - 真正显示出来的只有 cpu、mem、gpu、disk、runtime 这几项。它们都是某个真实模板的事实，不是造数。
  - 正文已经把“只显示其中一个模板”写为代价，按名排序也给出了确定的选择。
- **不违反 D12-coverage:461。** 该条禁止的是“从数组第一项推断默认集群”。本行取的是一个模板自己的完整资源，不是从集合里推断出一个 Lab 级事实。

### F 流程范围：没有缩减

容器页不在 F17 S2 和 F31 的必经步骤里。本行补的是数据来源，没有删减任何东西。

### divergent

- 两个落选方案都更差：
  - 按 `identity.image` 的 digest 关联：需要读 registry v2 API，而第一版不读 tag 和 digest（D12-08、D8-16）。
  - 让 images 列出模板：依赖方向反了。
- 措辞上有一处小瑕疵：nodeBindingCount 一项里写的“`template` 属于这些模板”，实际字段是 `NodeDefinition.defaultEnvironment`（`protocol/lab/library.ts:30`）。语义明确，不影响主路径，只提请回写正文时改正。


## D38-02 v2：赞成（ClaudeHighD38v2，2026-11-01T21:22:35.794Z）



# D38-02 v2 — ClaudeHigh 席选票（ClaudeHighD38v2）

**票：赞成（approve）。** 分类同意“串联”，缺失设计：是。

本实例从空白历史出发，只读以下源头：
- Pepgent main：`gh api repos/Pepgent/Pepgent/tarball/main`，解到 `/tmp/d38v2-ch/pep`；
- PM main：`gh api repos/Pepgent/PM/tarball/main`，解到 `/tmp/d38v2-ch/pm`；
- 议程正文：PM#57。

没有读 git 历史或 session。

## 一、v1 反例已清零（steady）

v1 反例（`/tmp/D38-claude-high-counter-02.md`）指出，“节点合入”有三个入口，而 v1 只收了一个。逐项核对 v2 正文：

1. **三个入口全部入表。** v2 的节点合入族为 `library.merge`、`library.apply`、`agentTemplate.saveVersion`。
2. **入口只有这三个。** 在 Lab 库默认分支上产生提交的写入点只有 `server/lab/library.ts` 的私有 `merge()`，即 `push origin HEAD:refs/heads/<branch>`。它的调用方只有：
   - `case 'library.apply'`，在 `merge()` 返回 `{kind:'applied', ...merged}` 处调用；
   - `case 'library.merge'`。

   `agentTemplate.saveVersion` 目前在 `operations.ts` 中归入 `notSupported`，契约由 D12-10（`D12-lab-wire.md:436`，“= library.merge 该模板的路径”）和 D7-11（“saveVersion … 等于 library.merge 对应 `.omp/agents/<id>`；合入路径含 nodes 与 `.omp/agents/**`”）规定，所以它也是合入入口。

   其他写库或拉库的命令都不在 Lab 库默认分支上产生 Lab 自己的合入：
   - `library.sync` 只提交到会话私有 conv 分支，不 push；
   - `library.stage` 只写 `library_staging`；
   - `repo.sync` 的结果是 `{kind:'synced', head}`，只把远端已有的头读进来，不是 Lab 合入。

   D7-02 的“节点合入”因此正好对应这三个命令，不多也不少。
3. **W-09 与 W-10 的契约闭合。** 规则仍是“kind 取命令名”。W-09 写的值集合等于 W-10 做穷尽映射的集合，原反例第 6 点（W-09 写出 `library.apply` 后，W-10 的 switch 无法处理）已经不存在。
4. **F29 S2 主路径打通。** nodes 页的流程是 `library.stage` → `library.apply` → 写 `kind='library.apply'` 的 activity 行。这一行进入 `home.activity` 后，投影为 data/database/dataset；`settings.repoActivity` 也取三个值的行。

## 二、新增的 `dataset` 入口与 `home` 失效：没有引入主路径问题（steady）

- **`dataset` 是合法取值，不需要额外载荷。** `HomeDialogId` 为 `'report'|'results'|'dataset'|'sources'|'milestone'`（`client/contracts/lab-home.ts:16`）。`HomeEvent.action` 只有 `{label, dialog}`（`:76`）。原型中 `category:'data'`、`glyph:'database'`、`dialog:'dataset'` 成对出现（`client/services/lab-fixture/home.ts` 的 `dataset-updated` 事件）。
- **`home` 失效能闭合。**
  - D12-17 的 `library` 频道在“库默认分支、`.omp/agents` 变化”时发出（`D12-lab-wire.md:611`），三个合入命令都会触发它。
  - 现有 `LIBRARY_PAGES.home` 为 `false`（`client/services/lab/invalidation.ts:29-32`）。改成 `true` 是单个布尔值，`invalidates()` 的 `case 'library'` 分支不用改。
  - `settings` 原本就在 `library` 频道的失效集合里，所以 `repoActivity` 也会刷新。
- **成员与结论事件不需要改。** D12-17 的 `catalog` 频道已覆盖“成员、邀请”和“讨论头（…结论）”，失效集合含 `home` 和 `settings`（`CATALOG_PAGES` 中 `home`、`settings` 都为 `true`）。正文“不变”的判断成立。
- **落库字段齐全。** `activity` 表（`server/lab/schema.ts`）有 `actor_id`、`project_id`（可为 null）、`kind`、`text`、`at`，可以承载 v2 规定的 `actor`、`project`（Panel 会话为 null）和 `text`（paths）。

## 三、白名单成立

- **W-09：** 写 activity 行、`home.activity`、`settings.repoActivity`，范围都在 `apps/web/src/server/lab/**` 内（D16-09）。
- **W-10：**
  - `client/services/lab/invalidation.ts` 属于 `apps/web/src/client/**`（D20-01）；
  - 投影在 `features/lab-home/model/**` 中（D20-01 的 model 列表含 home）；
  - 标题 copy 在 `renderer/locales/lab-home-copy.ts` 中（D20-01）；
  - 不新增弹窗，不改 `ui/**`（D20-02）。
- **wire 形状不变。** D12 只改 `kind` 注释和 D12-17 的 `library` 行，由归档回写。
- 闸门 A 和闸门 B 第三节都已复核同意（`evidence/gates/pepgent28-web06-gate-a.md:51-58`、`-gate-b.md:53-59`），与本席核对的结果一致。

## 四、divergent：没有更简明的主路径

- **读取时从 git log 投影合入：** 这和 D7-02“activity 记节点合入”相矛盾，也会把 `repo.sync` 读进来的外部推送混进来，冒充 Lab 自有事件。不如 v2。
- **三个命令统一写成 `library.merge`：** 同一份词表会出现两套命名规则，正文已经列为落选。
- **新增合入专属弹窗：** 违反 D20-02 和 U59。

v2 已经是改动最小、契约闭合的方案。

## 五、不构成反对的措辞提示（供归档回写参考）

“上述命令成功落库时，在同一事务写一行 activity”这句话对三个合入命令不准确：

- 这三个命令的事实是 git push，不是数据库事务；
- `library.merge` 和 `saveVersion` 本身没有数据库写入；
- 只有 `library.apply` 有清理 `library_staging` 的事务。

主路径上的含义仍然明确：push 成功后写一行。按 `design-assumes-it-works` 的要求，主路径不受影响，所以本条只作措辞提示，不作为反对理由。

