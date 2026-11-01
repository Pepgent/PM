# 闸门 A 裁决：Pepgent#80（LAB-13）W-09 BLOCKED（F1–F4）与 R-01..R-06 草案

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)（[BLOCKED 评论 6564508875](https://github.com/Pepgent/Pepgent/issues/80#issuecomment-6564508875)）、[Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)（[评论 6564511081](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564511081)），`PM/evidence/gates/pepgent80-blocked.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86,95`：已有前端界面接通后端与 e2e 全流程走通，不要擅自收缩）。
  - `(D)` `SOR/AGENTS.md:60,123`（C2-2、禁止单方修改已定语义或把第一版功能移入 D9）、`SOR/.claude/rules/design-assumes-it-works.md`、`DEC/D7-lab-backend.md:63,71,73,106`（D7-03、D7-11、D7-13、settings 字段表）、`DEC/D12-lab-wire.md:216,267-272,369-375,400,452,630-659`（`ActivityWire`、`AgentTemplateWire`、`ImageDefinition`、`MemberStatusWire`、P15）、`DEC/D12-coverage.md:446,452,462,465-466,496`、`DEC/D16-phaseB-review-restore.md:33`（D16-09 W-09 白名单）、`DEC/D21-lab-worktree-home.md`、`DEC/D22-lab-library-home.md:19`、`DEC/D38-pepgent28-web06-default-activity-image.md`、`DEC/D42-lab-entry-ownership.md:40-41`、`DEC/D43-pepgent78-merge-txn.md:32`。

---

## 一、逐项闸门 A 判定总表

| 事项 | 闸门 A 判定 | 处理通道 | 结论摘要 |
|---|---|---|---|
| **F1：`member.invite/role/remove` 的 `activity` 写入时机（`R-01`）** | **符合权威源头原则；因修订 `D38-02 v2`/`D43-01 v1` 已定案写入句，须走 P0 表决** | **P0 立案（`R-01`）** | 成员、角色、邀请的唯一权威是 Better Auth（`D7-03`），其三个异步端点不包整体事务且 `better-sqlite3` 同步事务不接受异步回调。与 `D43-01 v1` 合入族同构，等 Better Auth 端点成功返回后以单独一个 SQLite 事务写 `activity`（`member.quota` 与 `conclusion.confirm` 仍同事务），不改 wire、不设失败分支，`R-01` 在意图上完全成立。 |
| **F2（检出配置）：`images` 检出配置接口（`R-02`）** | **触及跨组件部署配置契约（P15 具体化），须走 P0 表决** | **P0 立案（`R-02`）** | 沿用 `D21-01`/`D22-01` 先例，由 `deploy` 注入 `PEPGENT_LAB_IMAGES_HOME=/var/lib/pepgent/images` 与 `PEPGENT_LAB_IMAGES_REMOTE`，Lab 作为 `images-checkout` 卷写方在读 `containers` 前快进到远端默认分支（建议写明：未配置 `PEPGENT_LAB_IMAGES_REMOTE` 时直接读 `PEPGENT_LAB_IMAGES_HOME` 下的既有检出，兼容本仓单测）。`R-02` 在意图上完全成立。 |
| **F2（定义来源与字段语义）：`ImageDefinition` 的权威源与字段规则（`R-03`）** | **触及跨组件权威源与公开字段语义（P15 具体化），须走 P0 表决** | **P0 立案（`R-03`）** | 按 `D7-13`“定义、资源、作业各取拥有方”，由 `Pepgent/images`（`W-03`）在仓库根部提供机器可读清单 `images.json`（每个发布目标一项，列出 `name`/`target`/`path`/`base`/`dependencies`/`files`），Lab 只读清单并从检出读取 `files[].size/contents`（文本取全文、二进制取 `null`），不解析 `Dockerfile`、不移入 D9。`R-03` 在意图上完全成立。 |
| **F3：`settings.members[].lastActiveAt` 与 `online` 的权威源（`R-04`）** | **触及公开 wire 字段的权威源与判定规则，须走 P0 表决** | **P0 立案（`R-04`）** | 严禁把两字段移入 D9 或用 24 小时刷新的 Better Auth `session.updatedAt` 冒充。以 Lab 进程内自身观察到的事实为准：`online` = 该成员当前在本 Lab 持有至少一个 `GET /api/lab/events` 订阅；`lastActiveAt` = 自 Lab 进程启动以来最近一次接纳该成员对本 Lab 的已认证调用（含 RPC/HTTP 与 events 准入）的时刻，无则 `null`。`R-04` 在意图上完全成立。 |
| **F4（D7-11 原文部分）：`id=定义名`、`harness='omp'`、文件与 `models` 取源码/frontmatter** | **不越界（K1，既有 `D7-11` 明文）** | **可直接引 `D7-11` 原文在 `#80` 作答（并作为 `R-05` 前提）** | `D7-11`（`DEC/D7-lab-backend.md:71`）已逐字写明：“智能体模板是 `.omp/agents/` 的 omp 定义：id=定义名、harness='omp'、版本取容器 omp；文件和 models 取源码/frontmatter”，可直接引原文作答。 |
| **F4（布局与映射）：`.omp/agents/<id>.md` 单文件规范布局、字段映射与 `saveVersion` 合入路径（`R-05`）** | **触及 `D7-11`/`D12:452`/`D42-02` 路径原文更正与公开字段映射规则，须走 P0 表决** | **P0 立案（`R-05`）** | 对齐 omp 真实单文件定义格式与 `pepgent-lab-library/.omp/agents/*.md` 现状：规范布局为 `.omp/agents/<id>.md`（文件名主干等于 frontmatter `name`），明确 `description`/`models`/`files`/`lastCommit`/`drafts` 取值规则，并将 `saveVersion` 合入路径及 `D7-11`/`D12:452`/`D42-02` 中的 `.omp/agents/<id>` 统一更正为 `.omp/agents/<id>.md`。`R-05` 在意图上完全成立。 |
| **F4（YAML 白名单）：`LAB-13` 放开 `apps/web/package.json` 与根 `package-lock.json`（`R-06`）** | **不触及产品原始意图或公开契约（K3/治理白名单）** | **随 P0 议程 `R-06` 表决（归闸门 B 治理域）** | `D16-09` 原已将 `apps/web` 的 `package.json` 与根 `package-lock.json` 划入 `W-09` 白名单，恢复该白名单仅用于声明 YAML 解析依赖以准确解析 omp frontmatter，`R-06` 在意图上完全成立。 |

---

## 二、对第六节 `R-01..R-06` 草案的详细审阅与防反例加固建议

1. **`R-01`（F1 成员族 `activity` 写入时机）：意图成立。**
   - 与 `D43-01 v1` 节点合入族完全同构：Better Auth 是 `organization/member/invitation` 的唯一权威源（`D7-03`），Lab 在 `createInvitation`、`updateMemberRole`、`removeMember` 端点成功返回后以单独一个 SQLite 事务写 `activity` 行（在端点返回后直接写或经 Better Auth `after*` 钩子写均属 `W-09` 契约内私有代码结构），而写 Lab 自有表的 `member.quota` 与 `conclusion.confirm` 仍保持同一 SQLite 事务。
2. **`R-02` 与 `R-03`（F2 `containers` 页与 P15 具体化）：意图成立，建议在 `R-02`/`R-03` `how` 中写清两点细节以防反例：**
   - **检出配置兼容本仓单测（`R-02`）：** `PEPGENT_LAB_IMAGES_HOME` 默认值同 `PEPGENT_LAB_LIBRARY_HOME` 惯例取 `join(webRoot, 'lab-images')`，deploy 注入 `/var/lib/pepgent/images`；当配置了 `PEPGENT_LAB_IMAGES_REMOTE` 时，Lab 在读取前克隆/快进到远端默认分支；未配置 `PEPGENT_LAB_IMAGES_REMOTE` 时，直接读取 `PEPGENT_LAB_IMAGES_HOME` 下的既有检出（使 `W-09` 本仓 `test:node` 无需外网或真实私有仓凭据即可验证）。
   - **`ImageDefinition` 字段与 `project-containers.ts` 对齐（`R-03`）：** `images.json` 中每个发布目标的 `name` 为不含 registry host、tag、digest 的 OCI repository 路径（如 `pepgent/omp-agent`、`pepgent/central`、`pepgent/lab-web`，与 `D38-03` `normalizeImageReference` 一致）；`files` 在 `images.json` 中列出相对检出根的文件路径（如 `"Dockerfile"`），由 Lab 从检出实读字节数填 `size`、UTF-8 文本填 `contents`（非 UTF-8 二进制填 `null`）。
3. **`R-04`（F3 `settings.members[].lastActiveAt` 与 `online`）：意图成立。**
   - 以 Lab 进程自身观察到的权威事实为准：`online` 为该成员当前在本 Lab 是否持有至少一个活跃 `GET /api/lab/events` 订阅；`lastActiveAt` 为自 Lab 进程启动以来 Lab 最近一次接纳该成员针对本 Lab 的已认证请求（包括対象 Lab 的 RPC 操作、HTTP 路由与 `admitLabEvents`）的时刻，尚无记录则为 `null`。
4. **`R-05` 与 `R-06`（F4 智能体模板单文件布局、字段映射与 YAML 依赖白名单）：意图成立，且与 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 完全咬合：**
   - `files` 返回 `[{ path: '.omp/agents/<id>.md', contents }]`（以仓库根相对路径 `.omp/agents/<id>.md` 表示，既匹配 `server/lab/library.ts:43` 的 `AGENT_PATH`，又匹配前端 `project-settings.ts:55-65` 与 `settings-view-model.ts:357` 的 `/\/agents?\//` 分类规则）。
   - frontmatter 中 `description` 映射为字符串（缺省 `""`）；单数 `model`（字符串、逗号分隔串或字符串数组）规整为去空后的 `models: string[]`（缺省 `[]`）；`lastCommit` 取默认分支上最近一次触及 `.omp/agents/<id>.md` 的提交 `{ commit, sequence, at }`（若单文件无独立提交则退回默认分支 HEAD）；`drafts` 取本 Lab 各会话 worktree 中相对默认分支在 `.omp/agents/<id>.md` 上有未合入改动的 `{ conversation, paths: ['.omp/agents/<id>.md'] }[]`。
   - `agentTemplate.saveVersion{conversation, id}` 对该 Panel 会话（`origin = Panel{page:'settings', scope:'agent:<id>'}` 或操作者拥有的对应 Panel 会话）的 `[.omp/agents/<id>.md]` 执行 `library.merge`。
