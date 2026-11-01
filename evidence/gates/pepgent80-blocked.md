# Pepgent#80 BLOCKED（F1–F4）初审

- **issue：** [Pepgent/Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)（LAB-13，工人 W-09 `pepgent-lab`，承载 D42-01/02/03 v1）。
- **BLOCKED：** [#80 评论 6564508875](https://github.com/Pepgent/Pepgent/issues/80#issuecomment-6564508875)，共 F1–F4 四项。#78 对应的剩余阻塞见 [#78 评论 6564511081](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564511081)，它们全部引用这四项，没有独立的新问题。
- **编制：** governance-desk 实例 `DeskPepgent80Blocked`，属总协调席，与 Main 合计 1 票。下文的分类、倾向和议程草案是起草者的初分，不是裁决。
- **程序：** 按 C2-2.2（`SOR/AGENTS.md:60`），闸门 A 由 `Argon` 判定，闸门 B 由 `ArgonGovernance` 判定。两道闸门都判不越界的项，在 #80 作答并免票放行；任一道判越界的项，按 P0 立案表决。表决期间只暂停受阻的分支，W-09 已声明的其余入口（`panel.prompt`、`conclusion.confirm`、`member.quota`、`home` 页读取）照常推进。

来源标记：`(U)` 用户原话；`(D)` 文档原文；`(R)` 本实例读源码或运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。

本实例只读决策文件、#80 与 #78 的评论，以及各仓 `main` 的源码快照。没有运行构建或测试，没有读 git 历史或 session，没有触碰 Pepgent 根 checkout。

源码基线：2026-11-01T22:07Z 各仓 `main` 快照，用 `gh api repos/Pepgent/<repo>/tarball/main` 取得，解到 `/tmp/p80blk/`，只读。依赖源码用 `npm pack` 取得，版本与 `apps/web/package.json` 一致（`better-auth@1.7.14`、`better-sqlite3@13.0.3`）。

路径简称：
- `SOR/` = `pepgent-soroi/`
- `DEC/` = `pepgent-pm/evidence/decisions/`
- `S/` = Pepgent main 的 `apps/web/src/server/lab/`
- `BA/` = `better-auth@1.7.14` 包的 `dist/plugins/organization/routes/`

---

## 一、各项共用的约束

| # | 事实 | 来源 |
|---|---|---|
| C-1 | 禁令原文：“禁止 leader 以‘实现期澄清’……的名义单方新增或改变公开接口、持久化格式、ADT variant、权限、状态权威与生命周期、功能范围、部署前提或验收语义；……issue 评论里的登记不等于决策”；“已通过契约内的私有代码结构、算法和文件组织由工程师决定，不上报”；“接口或权限表缺少某项不构成授权：禁止据此放开权限……或把功能移入 D9”。 | (D) `SOR/AGENTS.md:123` |
| C-2 | D42-01 v1：LAB-13 “路径白名单只有 `apps/web/src/server/lab/**`……不改 `protocol/lab/**`、`rpc/lab.ts`，不改 wire 形状”；第一版无来源字段“按 D12‘第一版无来源字段’一节取精确空值”；落选项 (d)“列入 D9：违反 AGENTS.md:123，且 D12-08 已把这三页定为第一版读取”。 | (D) `DEC/D42-lab-entry-ownership.md:40` |
| C-3 | 设计规则：“设计阶段只写主路径：禁止考虑边缘情况和竞态处理”；“不知道怎么做、依赖尚未确认的部分，先写成占位符并假定它能工作”。 | (D) `SOR/.claude/rules/design-assumes-it-works.md` |

---

## 二、F1：`member.invite`、`member.role`、`member.remove` 的 activity 与“同一事务”

### 事实

| # | 事实 | 来源 |
|---|---|---|
| F1-1 | 现行写入句（D43-01 v1 回写）：“成员与结论确认两族命令成功落库时，在同一事务写一行 activity。” | (D) `DEC/D12-lab-wire.md:216`；`DEC/D43-pepgent78-merge-txn.md:32` |
| F1-2 | D7-03：“organization/member/invitation 是 Lab、成员、角色、邀请唯一权威”。D42-02 v1：“`member.*` 由 Better Auth organization/member/invitation 作唯一权威（D7-03）”。 | (D) `DEC/D7-lab-backend.md:63`；`DEC/D42-lab-entry-ownership.md:41` |
| F1-3 | Better Auth 的三个端点在各自内部经 adapter 逐条 `await` 写库：`createInvitation` 在 `adapter.createInvitation`（`crud-invites.mjs:224`）后调用 `afterCreateInvitation`（`:239`）再 `ctx.json`（`:244`）；`removeMember` 在 `adapter.deleteMember`（`crud-members.mjs:218`）后调用 `afterRemoveMember`（`:224`）；`updateMemberRole` 在 `adapter.updateMember`（`:361`）后调用 `afterUpdateMemberRole`（`:363`）。三者都不包整体事务。 | (R) `BA/crud-invites.mjs`、`BA/crud-members.mjs` |
| F1-4 | Lab 以 `drizzleAdapter(db, { provider: 'sqlite', schema })` 接 Better Auth，未开 transaction 选项。 | (R) `S/auth.ts:19` |
| F1-5 | better-sqlite3 的事务函数遇到返回 Promise 的回调即抛错：`throw new TypeError('Transaction function cannot return a promise')`。 | (R) `better-sqlite3@13.0.3/lib/methods/transaction.js:66-67` |
| F1-6 | `member.quota` 写 Lab 自有的 `member_profile`，与 activity 可同一 SQLite 事务（D7-03：“Lab 表仅以 Better Auth 主键扩展……GPU 配额”）。 | (D) `DEC/D7-lab-backend.md:63`；(R) `S/schema.ts:28` |

### 分析

1. 三条命令的“成功落库”发生在 Better Auth 端点内部，Lab 拿不到它的事务边界（F1-3、F1-4），better-sqlite3 也不接受异步事务回调（F1-5）。因此 F1-1 原文对这三条命令无法按字面实现；对 `member.quota` 与 `conclusion.confirm` 可以照做。
2. 这与 D43 处理的合入族是同一型冲突：权威源（Better Auth，F1-2）先给结论，Lab 再记录。主路径上能让“成员事件成功才有行”成立的写点只有“端点成功返回之后”。
3. 改写 F1-1 已定案的写入句，属于 C-1 列举的持久化与状态生命周期语义，协调席不能在 #80 以澄清放行。
4. 写点放在端点返回后由 Lab 自己写，还是放在 Better Auth 的 `after*` 钩子里，属于契约内的私有代码结构（C-1），由 W-09 决定，不进决策。

### 初分

- 类别：已定案写入语义的修订；技术；不属 governance 领域。
- 倾向：P0 立案（议程行 R-01）。

---

## 三、F2：`containers` 页与 P15 `ImageDefinition` 导出

### 事实

| # | 事实 | 来源 |
|---|---|---|
| F2-1 | P15 占位原文：“Lab 能从 images 检出读出每个镜像的 `ImageDefinition`（D7-13）；`name` 导出发布的 OCI repository 路径……假定能工作”。D7-13：“P15 从 images 检出读出依赖、文件、层”。 | (D) `DEC/D12-lab-wire.md:659`；`DEC/D7-lab-backend.md:73` |
| F2-2 | `ImageDefinition = { name; path; base; dependencies: { name; version; kind: 'base' \| 'sdk' \| 'python_package' \| 'internal_library' \| 'files' \| 'runtime_config' }[]; files: { path; size; contents: string \| null }[] }`；`containers.images: ImageDefinition[]`。`path`、`base`、六类 `kind` 与 `files` 的语义和取值规则在 D7、D12 中都没有定义。 | (D) `DEC/D12-lab-wire.md:369-373,400` |
| F2-3 | Lab 运行时配置只有 `PEPGENT_LAB_HOME`、`PEPGENT_LAB_LIBRARY_HOME`、`PEPGENT_LAB_WORKTREE_HOME`、`SOROI_STORE_URL`、`SOROI_MUX_URL` 等，没有 images 检出路径、远端或凭据。 | (R) `S/runtime.ts:23-60` |
| F2-4 | deploy 给 Lab 容器挂了 `images-checkout:/var/lib/pepgent/images`，但没有对应的环境变量。卷表写明：写方“Lab 后端”，生命周期“images 仓库的独立可重建检出，不是 Lab 库的第二份缓存”。 | (R) deploy `stacks/pepgent-central/compose.yaml:113,175`；deploy `README.md:135` |
| F2-5 | 先例：Lab 库检出缓存根路径以 `PEPGENT_LAB_LIBRARY_HOME` 作为“部署交给 Lab 后端的配置接口”，经 D22-01 表决；会话 worktree 根路径经 D21-01 表决。 | (D) `DEC/D22-lab-library-home.md:19`；`DEC/D21-lab-worktree-home.md` |
| F2-6 | `Pepgent/images` 是私有仓库，只有根 `Dockerfile` 与 README。Dockerfile 含 `mux`、`remote`、`bun`、`node`、`omp-agent`、`remote-client`、`e2e-build`、`central`、`node-runtime`、`web-build`、`lab-web` 共 11 个 stage。README 写明发布目标只有 `omp-agent`、`central`、`lab-web` 三个，`remote-client` 是“内部 stage……不单独发布”；发布的 repository 路径只出现在 build/push 示例里。仓库里没有逐镜像的机器可读清单。 | (R) images `Dockerfile:5-8,10,30,33,40,44,52,90`；images `README.md:26-32,56-73`；`gh api repos/Pepgent/images --jq .private` = `true` |
| F2-7 | 视图覆盖审计：`images[].base` ← “P15 ImageDefinition.base”；`dependencies[].name/version/kind` ← “P15 ImageDefinition.dependencies 对应字段”；目录树与文件 ← “P15 files[].path”；`files[].size` ← “P15 files[].size”。审计时这些字段都依赖 P15 占位，没有给出取值规则。 | (D) `DEC/D12-coverage.md:446,452,462,465,466` |

### 分析

1. **检出配置（F2-3、F2-4、F2-5）：** 有卷没有配置接口。按 D21、D22 的先例，部署交给 Lab 的路径配置接口要经表决。images 仓库是私有仓库（F2-6），远端地址和只读凭据由谁注入，同样是部署前提（C-1）。
2. **定义映射（F2-2、F2-6、F2-7）：** “一个 `ImageDefinition` 对应什么”没有机器可读的权威源。从 11 个 stage 中挑出 3 个发布目标，只能读 README 的散文；`path`、`base`、六类依赖与 `files` 的取值规则没有任何定义。由 W-09 自行从 Dockerfile 推导，就是 leader 或工人新增公开字段语义（C-1）。`images` 是必填数组，也不能用 `[]` 表示“未知”。
3. **P15 占位的边界：** 按 C-3，占位在设计阶段假定能工作。现在实现已经走到这里，占位需要具体定义。C-2 与 C-1 又排除了把它列入 D9。
4. 镜像定义的事实归 images 仓库（D2-11、D2-13，images `README.md:1-5`），由 W-03 负责。让 images 仓库以机器可读的形式给出这些事实、Lab 只读，与 D7-13 “定义、资源、作业各取拥有方”一致。这会给 W-03 增加一项跨组件交付。

### 初分

- 类别：部署配置接口，加上公开字段语义与跨组件权威源的缺失设计；串联；领域可能涉及 `globalArchitecture`（跨组件接口），由对应席位决定是否 `claim`。
- 倾向：P0 立案（议程行 R-02 检出配置，R-03 定义来源与字段语义）。

---

## 四、F3：`settings.members[].lastActiveAt`、`online`

### 事实

| # | 事实 | 来源 |
|---|---|---|
| F3-1 | `MemberStatusWire = { member; grants; lastActiveAt: Instant \| null; online: boolean; gpuHoursUsed: number \| null }`，只有 `gpuHoursUsed` 注明“P9：无来源时 null”。 | (D) `DEC/D12-lab-wire.md:374-375` |
| F3-2 | “第一版无来源字段”表含 `settings.members[].gpuHours.used`，不含 `lastActiveAt`、`online`。D7 settings 行的来源只写“Better Auth 成员/角色/邀请/授权”。 | (D) `DEC/D12-lab-wire.md:630-649`；`DEC/D7-lab-backend.md:106` |
| F3-3 | 视图覆盖审计：`members[].lastActive, members[].presence` 为 C 类，“Page.settings.members[].lastActiveAt 格式化，online 映 online/offline”，没有给出取值来源。 | (D) `DEC/D12-coverage.md:496` |
| F3-4 | Better Auth 的 session 只有 `createdAt/updatedAt/expiresAt`。`updatedAt` 只在距上次刷新超过 `updateAge` 时才更新，默认 86400 秒。 | (R) `S/auth-schema.ts:21-41`；`better-auth@1.7.14/dist/context/create-context.mjs:147`、`dist/api/routes/session.mjs:179-180` |
| F3-5 | Lab 已有逐 Lab 的事件订阅：`GET /api/lab/events` 经 `admitLabEvents` 判定成员身份后订阅 `LabEvents`。判定在 `S/http.ts:57-64`，路由只转发。 | (R) `S/http.ts:57-64`；`apps/web/src/app/routes/api/lab/events.ts:10-27`；`S/events.ts:13` |

### 分析

1. `online` 是非空布尔，返回 `false` 就是在声称“离线”，不是精确空值；`lastActiveAt` 虽可空，但它不在无来源表里，返回 `null` 就是把它擅自列入无来源。按 C-1、C-2，两者都不能移入 D9，也不能改 wire。
2. Better Auth session 的 `updatedAt` 默认至多一天刷新一次（F3-4），以它作“最后活跃”、以“存在未过期 session”作“在线”，都会让字段名和实际含义不符。
3. Lab 本身是成员一切 Lab 调用的接收方。“是否持有 events 订阅”和“最近一次被接纳的调用时刻”都是 Lab 自己观察到的事实（F3-5）。选哪个权威源、按什么规则判定，是新增状态权威，需要表决（C-1）。

### 初分

- 类别：公开字段缺权威源与判定规则；技术；不属 governance 领域。
- 倾向：P0 立案（议程行 R-04）。

---

## 五、F4：`agentTemplate.saveVersion` 与 `settings.agentTemplates`

### 事实

| # | 事实 | 来源 |
|---|---|---|
| F4-1 | D7-11 原文：“智能体模板是 `.omp/agents/` 的 omp 定义：id=定义名、harness='omp'、版本取容器 omp；文件和 models 取源码/frontmatter。……saveVersion{conversation,id} 等于 library.merge 对应 `.omp/agents/<id>`；合入路径含 nodes 与 `.omp/agents/**`”。 | (D) `DEC/D7-lab-backend.md:71` |
| F4-2 | `AgentTemplateWire = { id; harness: 'omp'; description; models: string[] /* models 取自 frontmatter */; files: { path; contents }[] /* 默认分支（中心检出）上的文件 */; lastCommit: { commit; sequence; at }; drafts: { conversation; paths }[] }`；命令 `agentTemplate.saveVersion{conversation, id}` 注释“= library.merge 该模板的路径（D7:71）”。D42-02 v1 写作“对该 Panel 会话 `.omp/agents/<id>` 路径做 `library.merge`”。 | (D) `DEC/D12-lab-wire.md:267-272,452`；`DEC/D42-lab-entry-ownership.md:41` |
| F4-3 | Lab 库现有三个定义都是 `.omp/agents/` 顶层的单个 `.md` 文件，文件名主干等于 frontmatter `name`（`review`、`text_only`、`try_eval`），frontmatter 都没有 `model` 字段。 | (R) lab-library `.omp/agents/review.md:1-5`、`text_only.md:1-4`、`try_eval.md:1-4` |
| F4-4 | omp 的 agent 定义格式：`.omp/agents/` 下单个 `*.md`、不递归；定义名取 frontmatter `name`；模型字段是单数 `model`，可为字符串、逗号串或 YAML 列表。 | (A) W-09 引 `oh-my-pi/packages/coding-agent/src/task/discovery.ts:53-63`、`src/discovery/helpers.ts:185-208,315-321,393-398`，本实例未复核 |
| F4-5 | `apps/web` 的 dependencies 里没有 YAML 解析库（`yaml` 只以传递依赖出现在根 lockfile，`license: ISC`）。D16-09 的 W-09 行本已包含“承载 `apps/web` 依赖的 package manifest、lockfile”，但 D42-01 v1 把 LAB-13 收窄为“路径白名单只有 `apps/web/src/server/lab/**`”。 | (R) Pepgent `apps/web/package.json` dependencies；`package-lock.json:17746-17751`；(D) `DEC/D16-phaseB-review-restore.md:33`；`DEC/D42-lab-entry-ownership.md:40` |

### 分析

1. **已有原文的部分：** `id` 取定义名，`harness='omp'`，文件和 `models` 取源码与 frontmatter，均已由 D7-11 写定（F4-1），可以引原文作答。
2. **原文与 omp 格式不一致的部分：** D7-11、D12:452 和 D42-02 都写 `.omp/agents/<id>`，而 omp 的定义是 `<文件>.md` 单文件（F4-3、F4-4）。把它读成 `.omp/agents/<id>.md`，同时要规定文件名主干等于定义名，`files[]` 只含这一个文件，`model` 怎样规整为 `models: string[]`，`lastCommit` 与 `drafts` 按哪个路径取。这些规定决定 saveVersion 合入哪些路径，也决定 wire 里各字段的含义，属于 C-1 的公开语义，不是工人的私有结构。
3. **YAML 依赖：** 用哪个解析库是私有实现，但改 `apps/web/package.json` 和 lockfile 超出 D42-01 v1 写定的白名单（F4-5、C-2）。是否放宽 LAB-13 白名单属于派工路径问题，交闸门 B 判定。自己手写一个 frontmatter 子集解析器，可能和 omp 的解读不一致，omp 才是这份格式的拥有方。

### 初分

- 类别：F4 的布局与字段映射属于公开语义的缺失设计（串联）；YAML 依赖属于切片白名单（治理）。
- 倾向：F4 中 D7-11 已写定的部分在 #80 引原文作答，其余 P0 立案（议程行 R-05 布局与映射，R-06 白名单）。

---

## 六、议程（两道闸门判须表决，P0）

闸门 A（`pepgent80-blocked-gate-a.md`）：F4 中“id=定义名、harness='omp'、文件和 models 取源码/frontmatter”引 D7-11 原文在 #80 作答；其余各项须 P0 表决，R-01..R-06 在意图上成立。闸门 B（`pepgent80-blocked-gate-b.md`）：各项均须 P0 表决；R-02（向 W-04 派工）、R-03（重派已退役的 W-03）、R-06（放宽 LAB-13 白名单）标 `domains: [governance]`。

| 行 | 来自 | what | 类别 | 领域 |
|---|---|---|---|---|
| R-01 | F1 | `member.invite/role/remove` 在 Better Auth 端点成功返回后，以单独一个 SQLite 事务写 activity；`member.quota`、`conclusion.confirm` 仍同一事务；wire 不变，不设失败分支 | 技术 | — |
| R-02 | F2 | images 检出配置接口：deploy 注入 `PEPGENT_LAB_IMAGES_HOME=/var/lib/pepgent/images` 与远端 `PEPGENT_LAB_IMAGES_REMOTE`；Lab 后端作为检出写方，读 `containers` 前把检出快进到远端默认分支；只读凭据由 deploy 按既有注入路径提供（P15 占位） | 串联 | `governance` |
| R-03 | F2 | `ImageDefinition` 的来源是 images 仓库根部的机器可读清单 `images.json`（W-03 交付），每个发布目标一项，列出 `name/target/path/base/dependencies/files`；Lab 只读清单和检出，`files` 的 `size/contents` 取自检出，不解析 Dockerfile | 串联 | `governance`；SoroiKeeper 可认领 `globalArchitecture` |
| R-04 | F3 | `online` = 该成员当前在本 Lab 持有至少一个 `GET /api/lab/events` 订阅；`lastActiveAt` = 自 Lab 进程启动以来，Lab 最近一次接纳该成员对本 Lab 的已认证调用的时刻，无则 `null`；两者都是 Lab 进程内事实，不落库，不改 wire | 技术 | — |
| R-05 | F4 | 模板规范布局为 `.omp/agents/<id>.md` 单文件，文件名主干等于定义名；`description/models/files/lastCommit/drafts` 的取值规则；saveVersion 合入路径为 `[.omp/agents/<id>.md]`；D7-11、D12:452、D42-02 的 `.omp/agents/<id>` 一并替换 | 串联 | — |
| R-06 | F4 | LAB-13 白名单在 `apps/web/src/server/lab/**` 之外增加 `apps/web/package.json` 与根 `package-lock.json`，只用于新增 YAML 解析依赖 | 治理 | `governance` |

完整行文见同目录的 [`pepgent80-blocked-proposal.yaml`](pepgent80-blocked-proposal.yaml)，以议会 daemon 发布的 decision issue 正文为准。
