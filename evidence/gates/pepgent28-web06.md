# Pepgent#28（WEB-06）20:47Z BLOCKED 的闸门材料：集群身份、首页活动词表、镜像与模板的关联键

- **issue：** [Pepgent/Pepgent#28](https://github.com/Pepgent/Pepgent/issues/28)，工人 W-10，切片 WEB-06“投影：集群、容器、接入向导、设置、首页”（`DEC/D8-mvp-scope.md:359`）。STARTED 见 [issuecomment-6563499025](https://github.com/Pepgent/Pepgent/issues/28#issuecomment-6563499025)：当前阶段只读盘点，尚无代码与 PR。
- **评论：** [issuecomment-6563665330](https://github.com/Pepgent/Pepgent/issues/28#issuecomment-6563665330)，标题“BLOCKED（部分）：WEB-06 有三处公共契约缺口，W-10 只列候选，不自选”，共 G1–G3 三项。
- **编制：** governance-desk 实例 `DeskPepgent28Blocked`（总协调席，与 Main 合计 1 票）。下文类别是起草者的初分，不是裁决。
- **程序：** 闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项（`SOR/AGENTS.md:60`，C2-2）。两道闸门都确认不越界的项，在 #28 按正文作答，不立案；任一闸门认定越界的项，并入一张 P0 议案立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读决策文件与源码，没有运行构建或测试，没有读 git 历史或 session，没有触碰 `Pepgent/Pepgent` 根 checkout（U59）。

源码基线：用 `gh api repos/Pepgent/<repo>/tarball/<main>` 取得各仓 main 快照，解到 `/tmp/desk28/`，只读。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`；`GATES/` = `PM/evidence/gates/`
- `W/` = `Pepgent/Pepgent` main 的 `apps/web/src/`；`P/` = `W/protocol/lab/`；`C/` = `W/client/contracts/`
- `RM/` = `Pepgent/remote` main 根目录；`IMG/` = `Pepgent/images` main 根目录

类别（与 `GATES/pepgent25-web05.md` 相同）：
- **K1 既有决策已覆盖**：引用正文作答即可，属澄清。
- **K2 主路径外的失败或竞态**：`SOR/.claude/rules/design-assumes-it-works.md`，设计只写主路径。
- **K3 已通过契约内的私有实现**：D10-08；`SOR/AGENTS.md:123`，由工程师决定。
- **K4 缺契约**：意图、范围、D9 分类、跨仓公开契约或验收语义缺口，须表决（D10-08）。

---

## 一、共同依据

| # | 事实 | 来源 |
|---|---|---|
| F-1 | D7-12：“**集群：** 即 remote 目录里的一个后端端点：Komodo Core、slurmrestd 或 k8s context……Lab 按后端把 `remote templates` 归组，模板的镜像、设备、挂载、资源取自 P3。” 作业列表读 `remote runs` 摘要（run id、模板、所属后端、最新生命周期事实）。 | (D) `DEC/D7-lab-backend.md:72` |
| F-2 | D7 占位 P3：“remote 的 `templates` 能返回模板的**后端端点**、镜像、设备、挂载和资源默认值”。P4 后端健康与容量第一版不实现，列 D9。 | (D) `DEC/D7-lab-backend.md:223-224` |
| F-3 | D12 的 P3 展开为 `TemplateMetadata`：`image: string`；`resources.boundClusters: string[]`、`primaryCluster: string \| null` 等；`TemplateWire = TemplateInfo & { metadata }`。`clusters` 页 = `{templates, jobs, presence, panels}`，`connectCluster` = `{templates}`。 | (D) `DEC/D12-lab-wire.md:344-351,382-383,640` |
| F-4 | remote（模板与作业的唯一权威）对这两个字段的定义：README “`resources.boundClusters`, `primaryCluster` \| the template's single backend endpoint: Komodo `core`, Slurm `api`, k8s `context`”；`model.rs` 字段注释“The template's backend endpoint: Komodo Core address, Slurm API or k8s context.”；`identity.rs` 由模板的 `core`/`api`/`context` 取 `endpoint`，写 `bound_clusters: vec![endpoint]`、`primary_cluster: Some(endpoint)`。Pepgent 侧的 `remote schema` 快照带同一描述。 | (D) `RM/README.md:235`；`RM/src/model.rs:360-364`；`RM/src/identity.rs:163-173,215-216`；`W/../resources/lab/external-schema/remote.schema.json:996-997` |
| F-5 | 生成的 wire：`TemplateInfo = {backend, description, identity, metadata, mount, name}`；`RemoteRunSummary = {backend, lifecycle, run, template}`。 | (D) `P/external/remote.ts:65-73,110-115` |
| F-6 | 视图契约：`ClusterRecord = {id, name, kind, health, isDefault: boolean, endpoint: string, …}`；`ClusterId` 目前是演示 id 的联合 `'atlas' \| 'theerem' \| 'euclid' \| 'instr_edge'`；接入向导 `existingClusters[]{clusterId, kind, health, nodeCount, endpoint, gpu}`、`clusterChoices[]{clusterId, kind, detail}`。`client/**` 在 W-10 白名单内（D20-01）。 | (D) `C/lab-compute.ts:7,25-38,124-127`；`DEC/D20-w10-path-boundary.md:31` |
| F-7 | D12 覆盖审计把 `clusters[].id/name/kind/isDefault/endpoint` 与 `existingClusters`、`clusterChoices` 的标识分为 U（P3），并注“不能用 backend enum 当 endpoint”；`containers[].clusterId` 为“P3，run.template 关联后端端点”。 | (D) `DEC/D12-coverage.md:389,394,430,432` |
| F-8 | D12 处理原则：“D2–D7 没有任何权威源、且 F 流程走不到的，按 D8-16 的规则列入 D9 输入（见‘第一版无来源字段’），投影留空，不造数”。“第一版无来源字段”表列了 `clusters.clusters[].health/load/gpu/cpu/nodeCount/handshakeAge` 等，**没有** `clusters[].isDefault`，也没有集群友好名。`SOR/AGENTS.md:123`：接口表缺项不构成授权，禁止据此把功能移入 D9。 | (D) `DEC/D12-lab-wire.md:27,614-631`；`SOR/AGENTS.md:123` |
| F-9 | `ActivityWire = { id; lab; actor; project; kind: string; text; at }  // 只记 Lab 自己产生的事件（D7-02）`；Pepgent main 的 zod 同形，`kind: z.string()`。 | (D) `DEC/D12-lab-wire.md:199-200`；`P/rows.ts:290-300` |
| F-10 | D7-02：“activity 只记成员、结论确认、节点合入等 Lab 自有事件；运行开始结束在读取时从 store 生命周期投影，不入表。” | (D) `DEC/D7-lab-backend.md:62` |
| F-11 | Pepgent main 的 Lab 后端定义了 `activity` 表（`kind: text`），但 `W/server/lab/**` 中没有任何写入 activity 行的代码。 | (R) `W/server/lab/schema.ts:207-218`；`grep -rn activity W/server/lab/*.ts \| grep -c insert` → `0` |
| F-12 | 首页视图：`HomeEvent{ id, project?, category: 'experiments'\|'data'\|'milestones', glyph: 'database'\|'literature'\|'milestone', date…, title, text, action:{label, dialog: 'report'\|'results'\|'dataset'\|'sources'\|'milestone'} }`。覆盖审计：`events[].category/glyph` 为 C“按 activity.kind / milestone 事实种类映射”，`events[].title` 为 C“用 activity.kind 的 copy 标题或 milestone.title”，`events[].action` 为 K“renderer 按事件种类选 CTA 和本地弹窗”；`events[].id/project` 可“由 milestone.id/project 生成”。 | (D) `C/lab-home.ts:13,16,63-76`；`DEC/D12-coverage.md:125-130` |
| F-13 | D12-10 中 Lab 自有的、与 F-10 三类事件对应的命令：`member.invite/role/quota/remove`、`conclusion.confirm`、`library.merge`。 | (D) `P/command.ts:58-62,84,112` |
| F-14 | D7-13：“**绑定与资源：** 资源默认值……是模板字段，经 remote 模板写入”；“**`nodeBindingCount`：** 默认环境是用这个镜像的模板的节点函数个数”；“**`liveContainers`：** 用这个镜像的模板正在跑的作业”。没有写怎样判断“模板用这个镜像”。 | (D) `DEC/D7-lab-backend.md:73` |
| F-15 | D12：`ImageDefinition = { name; path; base; dependencies; files }  // P15`，P15“Lab 能从 images 检出读出每个镜像的 `ImageDefinition`”，没有规定 `name` 取什么；`containers = {images, templates, jobs, definitions, panels}`，D12-08“definitions 统计绑定数；构建记录与标签按 D8-16 不进第一版”。 | (D) `DEC/D12-lab-wire.md:40,353-357,384,642` |
| F-16 | `TemplateMetadata.image` 是“Body image reference as the template writes it”，即 OCI 引用原文（Slurm `image`、Komodo `services.body.image` 环境展开后、k8s Job 容器镜像），可带 tag 或 `@sha256:` digest，含 registry 主机。images 仓库以 `pepgent-registry.orb.local:5000/pepgent/<目标>:latest` 推送 `omp-agent`、`central`、`lab-web`，README 说明异地 builder 可指向别的发布仓库。Pepgent main 中没有 P15 导出的实现（`grep ImageDefinition W/server` 无结果）。 | (D) `RM/src/model.rs:340-342`；`RM/README.md:98,232`；`IMG/README.md:52,58,73,90`；(R) grep 无命中 |
| F-17 | 覆盖审计对镜像的关联：`images[].resources.*` 为“P3 Tpl.metadata.resources 对应字段”、`images[].liveContainers[].tag` 为“P3 模板使用镜像引用”、`images[].tag/digest` 为“按 repository 对应镜像”——都预设了镜像到模板的对应，但没给规则。G26（`nodeBindingCount`）原为 GAP，D12-08 以 `definitions` 补源，仍依赖同一对应。 | (D) `DEC/D12-coverage.md:441,445,450,460,588` |

---

## 二、逐项初审

### G1 集群身份与端点（集群页、接入向导）

**工人提出的候选（A）：** (A) 按 `backend` 分组、名称写“后端类别”、endpoint/health/容量为 null；(B) 由 remote 或协议拥有方补端点身份与模板关联，此前集群行为空；(C) 以模板 `boundClusters/primaryCluster` 去重作为集群行。工人认为这两个字段“只表达绑定或偏好，不表达端点可达性”。

**G1-a 集群行的身份、端点、类别与作业归组 —— 初分类 K1。**
- 端点身份已在 wire 上。remote 是模板的唯一权威，它把 `boundClusters`、`primaryCluster` 定义为“模板唯一的后端端点”（F-4），这正是 D7-12 的“集群即后端端点”和 D7 P3 的“返回模板的后端端点”（F-1、F-2）。工人对这两个字段的理解与权威方原文不符。“端点可达性”是健康，属 P4，第一版本来就列 D9（F-2、F-8）。
- 按正文作答（即候选 C，并改正其理由）：集群行 = 本页 `templates` 的 `metadata.resources.primaryCluster` 去重；`id`、`endpoint` 取该端点串；`kind` 取这些模板的 `backend`；作业按 `job.run.template` 找到模板，再按该模板的 `primaryCluster` 归组（F-5、F-7 的“run.template 关联后端端点”）；接入向导的 `existingClusters`、`clusterChoices` 用同一组端点。`ClusterId` 从演示联合改为端点串属 `C/**` 内的私有类型，归 W-10（F-6）。
- 候选 (A) 把三个后端类别当集群，与 D7-12、F-7 的“不能用 backend enum 当 endpoint”冲突；(B) 不需要，权威方已经给出。

- **A：** 以 `primaryCluster` 端点去重作为集群行、以模板的 `backend` 作类别、作业经模板归组，是否就是 D7-12 与 P3 的原意，不改任何公开契约？
- **B：** 改动只在 W-10 的 `client/**` 与 D20-01/02 允许的路径内，不改 `protocol/lab/**`、不涉及 remote，是否不立案？

**G1-b `name` 与 `isDefault` —— 初分类：`name` 为 K3，`isDefault` 为 K4。**
- `name`：没有友好名的来源（F-7 写“友好名依 P3”，而 D12 展开的 P3 不含友好名，F-3）。用端点串本身显示，是已有事实的呈现方式，属 K3。
- `isDefault`：D12 展开的 P3 与 remote 都没有“默认集群”这一事实（F-3、F-4）；它不在 D12“第一版无来源字段”表中（F-8）。按 D12:27 它应列入 D9 输入、投影留空，但写进该表与 D8 §5.4 是改已通过正文、把一项移入 D9，按 `SOR/AGENTS.md:123` 不能由协调席或工人单定。投影写 `false` 等于宣称“不是默认”，属造数。
- 候选主案（如需立案）：`clusters[].isDefault` 列入 D12“第一版无来源字段”（缺“默认集群选择”，P3 未含），视图字段改为可空并投影 `null`；回写 D12 该表与 D8 §5.4。

- **A：** `isDefault` 无源、列 D9、投影 `null`，是否违背集群页的产品意图？这是否属缺失设计须表决？
- **B：** 把一项视图字段补入 D9 清单（改 D12、D8 正文），是否属必须投票事项？表决前 W-10 只把 `isDefault` 留空待定、其余集群投影照常，是否合规？

### G2 首页活动 `ActivityWire.kind` 的词表

**工人提出的候选（A）：** (A) 治理给出 kind 词表及每个 kind 的类别与关联目标；(B) 确认首页只展示通用活动，不分类，不生成业务入口。

**G2-a 实验与里程碑事件 —— 初分类 K1。**
- D7-02 规定运行开始、结束“在读取时从 store 生命周期投影，不入表”（F-10），它们不经 `ActivityWire`，来源是始终可读的目录（覆盖审计的合法输入：目录加当前页）；里程碑事件来自 `MilestoneWire`（F-12）。这两类事件的 `category` 分别是 `experiments`、`milestones`，由事实种类直接确定，不依赖 `kind` 词表。照常交付。

- **A：** 首页“实验”类事件取目录中运行的开始、结束，“里程碑”类取 `MilestoneWire`，是否符合 D7-02 与 F-12 的意图？
- **B：** 是否不立案？

**G2-b Lab 自有活动行的 `kind` 词表、类别与入口 —— 初分类 K4。**
- `ActivityWire.kind` 在 D12 中是开放 `string`（F-9）；D7-02 只列了事件族“成员、结论确认、节点合入等”，没有给出取值（F-10）；main 上也还没有任何写入方（F-11）。`kind` 的取值由写方 W-09（`server/lab/**`）产生、由读方 W-10 映射，是跨两席的 wire 语义，属 D10-08 的“wire、ADT”。
- 工人的 (B) 也不是现成答案：`HomeEvent.category` 与 `action` 都是必填（F-12），“不分类”要么改视图结构（D20-02 禁止），要么另定一个映射，仍是同一个缺口。
- 候选主案方向（待立案时定稿）：`kind` 取产生该事件的 Lab 命令名（D12-10 已有的封闭集合，F-13），限于 D7-02 的三族：`member.invite`、`member.role`、`member.remove`、`conclusion.confirm`、`library.merge`；同时给出每个取值到 `category/glyph/action.dialog` 的映射。不增加 wire 字段，只把 `kind` 的取值写进 D12 注释与 D7-02。

- **A：** Lab 自有活动在首页如何分类、是否给入口，是否属未定的产品语义，须表决？
- **B：** 词表跨 W-09（写方）与 W-10（读方），是否属必须投票事项？表决前 W-10 只暂停“Lab 自有活动行的分类与入口”，实验、里程碑事件及首页其余部分照常，是否合规？

### G3 镜像定义与模板镜像引用的关联键（容器页）

**工人提出的候选（A）：** (A) 确认 `images.name` 就是 OCI repository，再规定引用规则（是否含 tag、registry 前缀怎么处理）；(B) 由 images 的导出契约直接写明它与模板的关系。

**初分类：K4（缺契约）。**
- D7-13 要求按“用这个镜像的模板”计算绑定数、资源和在跑作业（F-14），覆盖审计也预设了这层对应（F-17），但没有任何正文规定对应规则。`ImageDefinition.name` 的取值 P15 未定（F-15），`TemplateMetadata.image` 是带 registry 主机、可带 tag 或 digest 的原文引用（F-16），两边要比较，须先定“`name` 是什么”和“引用怎样归一”。
- 这条规则约束 P15 导出方（W-09 读 images 检出）、images 仓库（W-03）的命名、W-10 的投影三方，是跨仓公开契约。工人自选任何一种都属于自定契约。
- 候选主案方向（待立案时定稿）：`ImageDefinition.name` 为该镜像发布时的 OCI repository 路径，不含 registry 主机与 tag（例如 `pepgent/omp-agent`）；模板用这个镜像，当且仅当 `TemplateMetadata.image` 去掉 registry 主机（首段含 `.` 或 `:`，或为 `localhost`）及 `:tag`、`@digest` 后与 `name` 相等。P15 导出按此填 `name`，W-10 按此匹配；不改 wire 形状，回写 D12 的 `ImageDefinition` 注释与 D7-13。

- **A：** 镜像与模板的对应规则是否属未定的公开契约，须表决？
- **B：** 是否属必须投票事项？表决前 W-10 只暂停容器页依赖这层对应的部分（`nodeBindingCount`、`resources`、模板挂载、`liveContainers`），容器定义、依赖、文件、Panel 头照常，是否合规？

---

## 三、不受阻塞、照常交付的部分

工人列出的部分（A）与本材料无冲突，照常在 WEB-06 交付：设置页全部投影；首页除 Lab 自有活动分类以外的部分（含 G2-a 的实验与里程碑事件）；容器页的定义、依赖、文件、Panel 头；集群页的作业、tail 文本快照、在线 agent 叠加，以及 G1-a 的集群行与归组。无来源字段按 D12“第一版无来源字段”取精确空表示（F-8）。

工人另说明 home、settings、containers、connectCluster 的服务端读取目前返回 `not_supported`，需 W-09 实现（A）。这不阻塞 WEB-06 的纯投影，也不是本 BLOCKED 的一项，不在本材料裁定范围。

---

## 四、闸门判定后的程序

- 闸门结论写入 `GATES/pepgent28-web06-gate-a.md`（Argon）与 `GATES/pepgent28-web06-gate-b.md`（ArgonGovernance）。
- A、B 都确认不越界的项，在 #28 写结论评论并引用正文原文，由 Pepgent 片区经理（`AreaMgrPepgent`）送达 W-10。
- 任一闸门认定越界的项，合为一张 P0 议案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`），由本实例用 `council propose --seat Coordination --as DeskPepgent28Blocked` 立案。
