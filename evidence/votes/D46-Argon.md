# D46 选票：Argon

议程：LAB-13 剩余入口的契约补全：成员族 activity 写点、images 检出与 ImageDefinition 来源、成员在线与最后活跃、agent 模板布局与 YAML 依赖（解 Pepgent#80 BLOCKED F1–F4）（[Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D46-01 v1：赞成（Argon-2，2026-11-01T22:18:34.455Z）



# Argon（Argon-2）对 D46（Pepgent/PM#65）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-02 v1`、`D46-03 v1`、`D46-04 v1`、`D46-05 v1` 标注“缺失部分或设计补充：是”，`D46-01 v1`、`D46-06 v1` 标注“缺失部分或设计补充：否”。作为产品原始意图守护席，本席对六行均不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）、`AGENTS.md:123` 与 `SOR/.claude/rules/design-assumes-it-works.md` 确认全部六行完全符合用户原始设计意图（详见 `PM/evidence/gates/pepgent80-blocked-gate-a.md`，commit `8dcda1f`）：
  1. **不收缩第一版功能、不移入 D9：** 严守 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`，不把 `containers.images`、`settings.members[].online/lastActiveAt` 或 `settings.agentTemplates` 移入 D9，也不改 `protocol/lab/**` 与 wire 形状。
  2. **各事实归其唯一权威源（《权威源头与生命周期》）：**
     - 成员、角色、邀请归 Better Auth（`D7-03`），`member.invite/role/remove` 在 Better Auth 端点成功返回后写 `activity`（`D46-01 v1`）；
     - 镜像定义归拥有方 `Pepgent/images`（`W-03`）根部的机器可读清单 `images.json`，Lab 经部署注入的 `PEPGENT_LAB_IMAGES_HOME`/`PEPGENT_LAB_IMAGES_REMOTE` 维护 `images-checkout` 检出并只读导出 `ImageDefinition`（`D46-02 v1`、`D46-03 v1`，兑现 `D7-13` 与 P15）；
     - 成员在线与最后活跃归 Lab 自身观察到的 `GET /api/lab/events` 订阅与已认证调用时刻（`D46-04 v1`）；
     - 智能体模板对齐 omp 实际单文件定义 `.omp/agents/<id>.md`（`id` 取 frontmatter `name` 且与文件名主干一致），`saveVersion` 合入 `[.omp/agents/<id>.md]`，并恢复 `D16-09` 原授予 `W-09` 的 `apps/web/package.json` 与根 `package-lock.json` 白名单以引入成熟 YAML 解析库（`D46-05 v1`、`D46-06 v1`）。

---

## 二、对各行的逐项投票

- **`D46-01 v1`（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 `activity`；`member.quota`、`conclusion.confirm` 仍同事务）：`approve`（赞成）**
  - **理由：** 与 `D43-01 v1` 合入族同构，服从 Better Auth 对成员/角色/邀请的唯一权威（`D7-03`）及 `better-sqlite3` 同步事务边界，主路径保证“成员命令成功才有行”，不改 wire、不设失败分支。
- **`D46-02 v1`（`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 检出配置接口）：`approve`（赞成）**
  - **理由：** 与 `D21-01`、`D22-01` 同型，补齐 `deploy` 已挂载的 `images-checkout:/var/lib/pepgent/images` 卷与 Lab 后端之间的配置契约，写方与生命周期和 `deploy/README.md:135` 一致。
- **`D46-03 v1`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，Lab 只读清单与检出）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，避免 Lab 从多阶段 `Dockerfile` 与 `README` 散文中臆测发布目标与六类依赖，`name` 与 `D38-03` 关联键严格一致。
- **`D46-04 v1`（`settings.members[].online` 与 `lastActiveAt` 取 Lab 进程内观察到的事件订阅与已认证调用事实）：`approve`（赞成）**
  - **理由：** 以 Lab 真实观察到的连接与调用事实为准，避免用默认 24 小时才刷新的 Better Auth `session.updatedAt` 冒充最后活跃或在线状态，不改 wire、不加数据库迁移。
- **`D46-05 v1`（agent 模板 `.omp/agents/<id>.md` 单文件规范布局、`AgentTemplateWire` 字段映射与 `saveVersion` 合入路径）：`approve`（赞成）**
  - **理由：** 对齐 omp 实际单文件加载格式、`pepgent-lab-library/.omp/agents/*.md` 现状及 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 路径投影规则。
- **`D46-06 v1`（`LAB-13` 白名单增加 `apps/web/package.json` 与根 `package-lock.json` 用于新增 YAML 解析依赖）：`approve`（赞成）**
  - **理由：** 恢复 `D16-09` W-09 行原有 manifest/lockfile 权限以引入成熟开源 YAML 解析器（符合 `U13`、`U83`），确保 omp agent 定义 frontmatter 解析准确一致。


## D46-02 v1：赞成（Argon-2，2026-11-01T22:18:34.455Z）



# Argon（Argon-2）对 D46（Pepgent/PM#65）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-02 v1`、`D46-03 v1`、`D46-04 v1`、`D46-05 v1` 标注“缺失部分或设计补充：是”，`D46-01 v1`、`D46-06 v1` 标注“缺失部分或设计补充：否”。作为产品原始意图守护席，本席对六行均不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）、`AGENTS.md:123` 与 `SOR/.claude/rules/design-assumes-it-works.md` 确认全部六行完全符合用户原始设计意图（详见 `PM/evidence/gates/pepgent80-blocked-gate-a.md`，commit `8dcda1f`）：
  1. **不收缩第一版功能、不移入 D9：** 严守 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`，不把 `containers.images`、`settings.members[].online/lastActiveAt` 或 `settings.agentTemplates` 移入 D9，也不改 `protocol/lab/**` 与 wire 形状。
  2. **各事实归其唯一权威源（《权威源头与生命周期》）：**
     - 成员、角色、邀请归 Better Auth（`D7-03`），`member.invite/role/remove` 在 Better Auth 端点成功返回后写 `activity`（`D46-01 v1`）；
     - 镜像定义归拥有方 `Pepgent/images`（`W-03`）根部的机器可读清单 `images.json`，Lab 经部署注入的 `PEPGENT_LAB_IMAGES_HOME`/`PEPGENT_LAB_IMAGES_REMOTE` 维护 `images-checkout` 检出并只读导出 `ImageDefinition`（`D46-02 v1`、`D46-03 v1`，兑现 `D7-13` 与 P15）；
     - 成员在线与最后活跃归 Lab 自身观察到的 `GET /api/lab/events` 订阅与已认证调用时刻（`D46-04 v1`）；
     - 智能体模板对齐 omp 实际单文件定义 `.omp/agents/<id>.md`（`id` 取 frontmatter `name` 且与文件名主干一致），`saveVersion` 合入 `[.omp/agents/<id>.md]`，并恢复 `D16-09` 原授予 `W-09` 的 `apps/web/package.json` 与根 `package-lock.json` 白名单以引入成熟 YAML 解析库（`D46-05 v1`、`D46-06 v1`）。

---

## 二、对各行的逐项投票

- **`D46-01 v1`（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 `activity`；`member.quota`、`conclusion.confirm` 仍同事务）：`approve`（赞成）**
  - **理由：** 与 `D43-01 v1` 合入族同构，服从 Better Auth 对成员/角色/邀请的唯一权威（`D7-03`）及 `better-sqlite3` 同步事务边界，主路径保证“成员命令成功才有行”，不改 wire、不设失败分支。
- **`D46-02 v1`（`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 检出配置接口）：`approve`（赞成）**
  - **理由：** 与 `D21-01`、`D22-01` 同型，补齐 `deploy` 已挂载的 `images-checkout:/var/lib/pepgent/images` 卷与 Lab 后端之间的配置契约，写方与生命周期和 `deploy/README.md:135` 一致。
- **`D46-03 v1`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，Lab 只读清单与检出）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，避免 Lab 从多阶段 `Dockerfile` 与 `README` 散文中臆测发布目标与六类依赖，`name` 与 `D38-03` 关联键严格一致。
- **`D46-04 v1`（`settings.members[].online` 与 `lastActiveAt` 取 Lab 进程内观察到的事件订阅与已认证调用事实）：`approve`（赞成）**
  - **理由：** 以 Lab 真实观察到的连接与调用事实为准，避免用默认 24 小时才刷新的 Better Auth `session.updatedAt` 冒充最后活跃或在线状态，不改 wire、不加数据库迁移。
- **`D46-05 v1`（agent 模板 `.omp/agents/<id>.md` 单文件规范布局、`AgentTemplateWire` 字段映射与 `saveVersion` 合入路径）：`approve`（赞成）**
  - **理由：** 对齐 omp 实际单文件加载格式、`pepgent-lab-library/.omp/agents/*.md` 现状及 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 路径投影规则。
- **`D46-06 v1`（`LAB-13` 白名单增加 `apps/web/package.json` 与根 `package-lock.json` 用于新增 YAML 解析依赖）：`approve`（赞成）**
  - **理由：** 恢复 `D16-09` W-09 行原有 manifest/lockfile 权限以引入成熟开源 YAML 解析器（符合 `U13`、`U83`），确保 omp agent 定义 frontmatter 解析准确一致。


## D46-03 v1：赞成（Argon-2，2026-11-01T22:18:34.456Z）——作废：该行已修订到 v2



# Argon（Argon-2）对 D46（Pepgent/PM#65）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-02 v1`、`D46-03 v1`、`D46-04 v1`、`D46-05 v1` 标注“缺失部分或设计补充：是”，`D46-01 v1`、`D46-06 v1` 标注“缺失部分或设计补充：否”。作为产品原始意图守护席，本席对六行均不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）、`AGENTS.md:123` 与 `SOR/.claude/rules/design-assumes-it-works.md` 确认全部六行完全符合用户原始设计意图（详见 `PM/evidence/gates/pepgent80-blocked-gate-a.md`，commit `8dcda1f`）：
  1. **不收缩第一版功能、不移入 D9：** 严守 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`，不把 `containers.images`、`settings.members[].online/lastActiveAt` 或 `settings.agentTemplates` 移入 D9，也不改 `protocol/lab/**` 与 wire 形状。
  2. **各事实归其唯一权威源（《权威源头与生命周期》）：**
     - 成员、角色、邀请归 Better Auth（`D7-03`），`member.invite/role/remove` 在 Better Auth 端点成功返回后写 `activity`（`D46-01 v1`）；
     - 镜像定义归拥有方 `Pepgent/images`（`W-03`）根部的机器可读清单 `images.json`，Lab 经部署注入的 `PEPGENT_LAB_IMAGES_HOME`/`PEPGENT_LAB_IMAGES_REMOTE` 维护 `images-checkout` 检出并只读导出 `ImageDefinition`（`D46-02 v1`、`D46-03 v1`，兑现 `D7-13` 与 P15）；
     - 成员在线与最后活跃归 Lab 自身观察到的 `GET /api/lab/events` 订阅与已认证调用时刻（`D46-04 v1`）；
     - 智能体模板对齐 omp 实际单文件定义 `.omp/agents/<id>.md`（`id` 取 frontmatter `name` 且与文件名主干一致），`saveVersion` 合入 `[.omp/agents/<id>.md]`，并恢复 `D16-09` 原授予 `W-09` 的 `apps/web/package.json` 与根 `package-lock.json` 白名单以引入成熟 YAML 解析库（`D46-05 v1`、`D46-06 v1`）。

---

## 二、对各行的逐项投票

- **`D46-01 v1`（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 `activity`；`member.quota`、`conclusion.confirm` 仍同事务）：`approve`（赞成）**
  - **理由：** 与 `D43-01 v1` 合入族同构，服从 Better Auth 对成员/角色/邀请的唯一权威（`D7-03`）及 `better-sqlite3` 同步事务边界，主路径保证“成员命令成功才有行”，不改 wire、不设失败分支。
- **`D46-02 v1`（`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 检出配置接口）：`approve`（赞成）**
  - **理由：** 与 `D21-01`、`D22-01` 同型，补齐 `deploy` 已挂载的 `images-checkout:/var/lib/pepgent/images` 卷与 Lab 后端之间的配置契约，写方与生命周期和 `deploy/README.md:135` 一致。
- **`D46-03 v1`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，Lab 只读清单与检出）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，避免 Lab 从多阶段 `Dockerfile` 与 `README` 散文中臆测发布目标与六类依赖，`name` 与 `D38-03` 关联键严格一致。
- **`D46-04 v1`（`settings.members[].online` 与 `lastActiveAt` 取 Lab 进程内观察到的事件订阅与已认证调用事实）：`approve`（赞成）**
  - **理由：** 以 Lab 真实观察到的连接与调用事实为准，避免用默认 24 小时才刷新的 Better Auth `session.updatedAt` 冒充最后活跃或在线状态，不改 wire、不加数据库迁移。
- **`D46-05 v1`（agent 模板 `.omp/agents/<id>.md` 单文件规范布局、`AgentTemplateWire` 字段映射与 `saveVersion` 合入路径）：`approve`（赞成）**
  - **理由：** 对齐 omp 实际单文件加载格式、`pepgent-lab-library/.omp/agents/*.md` 现状及 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 路径投影规则。
- **`D46-06 v1`（`LAB-13` 白名单增加 `apps/web/package.json` 与根 `package-lock.json` 用于新增 YAML 解析依赖）：`approve`（赞成）**
  - **理由：** 恢复 `D16-09` W-09 行原有 manifest/lockfile 权限以引入成熟开源 YAML 解析器（符合 `U13`、`U83`），确保 omp agent 定义 frontmatter 解析准确一致。


## D46-04 v1：赞成（Argon-2，2026-11-01T22:18:34.456Z）



# Argon（Argon-2）对 D46（Pepgent/PM#65）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-02 v1`、`D46-03 v1`、`D46-04 v1`、`D46-05 v1` 标注“缺失部分或设计补充：是”，`D46-01 v1`、`D46-06 v1` 标注“缺失部分或设计补充：否”。作为产品原始意图守护席，本席对六行均不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）、`AGENTS.md:123` 与 `SOR/.claude/rules/design-assumes-it-works.md` 确认全部六行完全符合用户原始设计意图（详见 `PM/evidence/gates/pepgent80-blocked-gate-a.md`，commit `8dcda1f`）：
  1. **不收缩第一版功能、不移入 D9：** 严守 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`，不把 `containers.images`、`settings.members[].online/lastActiveAt` 或 `settings.agentTemplates` 移入 D9，也不改 `protocol/lab/**` 与 wire 形状。
  2. **各事实归其唯一权威源（《权威源头与生命周期》）：**
     - 成员、角色、邀请归 Better Auth（`D7-03`），`member.invite/role/remove` 在 Better Auth 端点成功返回后写 `activity`（`D46-01 v1`）；
     - 镜像定义归拥有方 `Pepgent/images`（`W-03`）根部的机器可读清单 `images.json`，Lab 经部署注入的 `PEPGENT_LAB_IMAGES_HOME`/`PEPGENT_LAB_IMAGES_REMOTE` 维护 `images-checkout` 检出并只读导出 `ImageDefinition`（`D46-02 v1`、`D46-03 v1`，兑现 `D7-13` 与 P15）；
     - 成员在线与最后活跃归 Lab 自身观察到的 `GET /api/lab/events` 订阅与已认证调用时刻（`D46-04 v1`）；
     - 智能体模板对齐 omp 实际单文件定义 `.omp/agents/<id>.md`（`id` 取 frontmatter `name` 且与文件名主干一致），`saveVersion` 合入 `[.omp/agents/<id>.md]`，并恢复 `D16-09` 原授予 `W-09` 的 `apps/web/package.json` 与根 `package-lock.json` 白名单以引入成熟 YAML 解析库（`D46-05 v1`、`D46-06 v1`）。

---

## 二、对各行的逐项投票

- **`D46-01 v1`（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 `activity`；`member.quota`、`conclusion.confirm` 仍同事务）：`approve`（赞成）**
  - **理由：** 与 `D43-01 v1` 合入族同构，服从 Better Auth 对成员/角色/邀请的唯一权威（`D7-03`）及 `better-sqlite3` 同步事务边界，主路径保证“成员命令成功才有行”，不改 wire、不设失败分支。
- **`D46-02 v1`（`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 检出配置接口）：`approve`（赞成）**
  - **理由：** 与 `D21-01`、`D22-01` 同型，补齐 `deploy` 已挂载的 `images-checkout:/var/lib/pepgent/images` 卷与 Lab 后端之间的配置契约，写方与生命周期和 `deploy/README.md:135` 一致。
- **`D46-03 v1`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，Lab 只读清单与检出）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，避免 Lab 从多阶段 `Dockerfile` 与 `README` 散文中臆测发布目标与六类依赖，`name` 与 `D38-03` 关联键严格一致。
- **`D46-04 v1`（`settings.members[].online` 与 `lastActiveAt` 取 Lab 进程内观察到的事件订阅与已认证调用事实）：`approve`（赞成）**
  - **理由：** 以 Lab 真实观察到的连接与调用事实为准，避免用默认 24 小时才刷新的 Better Auth `session.updatedAt` 冒充最后活跃或在线状态，不改 wire、不加数据库迁移。
- **`D46-05 v1`（agent 模板 `.omp/agents/<id>.md` 单文件规范布局、`AgentTemplateWire` 字段映射与 `saveVersion` 合入路径）：`approve`（赞成）**
  - **理由：** 对齐 omp 实际单文件加载格式、`pepgent-lab-library/.omp/agents/*.md` 现状及 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 路径投影规则。
- **`D46-06 v1`（`LAB-13` 白名单增加 `apps/web/package.json` 与根 `package-lock.json` 用于新增 YAML 解析依赖）：`approve`（赞成）**
  - **理由：** 恢复 `D16-09` W-09 行原有 manifest/lockfile 权限以引入成熟开源 YAML 解析器（符合 `U13`、`U83`），确保 omp agent 定义 frontmatter 解析准确一致。


## D46-05 v1：赞成（Argon-2，2026-11-01T22:18:34.456Z）



# Argon（Argon-2）对 D46（Pepgent/PM#65）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-02 v1`、`D46-03 v1`、`D46-04 v1`、`D46-05 v1` 标注“缺失部分或设计补充：是”，`D46-01 v1`、`D46-06 v1` 标注“缺失部分或设计补充：否”。作为产品原始意图守护席，本席对六行均不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）、`AGENTS.md:123` 与 `SOR/.claude/rules/design-assumes-it-works.md` 确认全部六行完全符合用户原始设计意图（详见 `PM/evidence/gates/pepgent80-blocked-gate-a.md`，commit `8dcda1f`）：
  1. **不收缩第一版功能、不移入 D9：** 严守 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`，不把 `containers.images`、`settings.members[].online/lastActiveAt` 或 `settings.agentTemplates` 移入 D9，也不改 `protocol/lab/**` 与 wire 形状。
  2. **各事实归其唯一权威源（《权威源头与生命周期》）：**
     - 成员、角色、邀请归 Better Auth（`D7-03`），`member.invite/role/remove` 在 Better Auth 端点成功返回后写 `activity`（`D46-01 v1`）；
     - 镜像定义归拥有方 `Pepgent/images`（`W-03`）根部的机器可读清单 `images.json`，Lab 经部署注入的 `PEPGENT_LAB_IMAGES_HOME`/`PEPGENT_LAB_IMAGES_REMOTE` 维护 `images-checkout` 检出并只读导出 `ImageDefinition`（`D46-02 v1`、`D46-03 v1`，兑现 `D7-13` 与 P15）；
     - 成员在线与最后活跃归 Lab 自身观察到的 `GET /api/lab/events` 订阅与已认证调用时刻（`D46-04 v1`）；
     - 智能体模板对齐 omp 实际单文件定义 `.omp/agents/<id>.md`（`id` 取 frontmatter `name` 且与文件名主干一致），`saveVersion` 合入 `[.omp/agents/<id>.md]`，并恢复 `D16-09` 原授予 `W-09` 的 `apps/web/package.json` 与根 `package-lock.json` 白名单以引入成熟 YAML 解析库（`D46-05 v1`、`D46-06 v1`）。

---

## 二、对各行的逐项投票

- **`D46-01 v1`（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 `activity`；`member.quota`、`conclusion.confirm` 仍同事务）：`approve`（赞成）**
  - **理由：** 与 `D43-01 v1` 合入族同构，服从 Better Auth 对成员/角色/邀请的唯一权威（`D7-03`）及 `better-sqlite3` 同步事务边界，主路径保证“成员命令成功才有行”，不改 wire、不设失败分支。
- **`D46-02 v1`（`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 检出配置接口）：`approve`（赞成）**
  - **理由：** 与 `D21-01`、`D22-01` 同型，补齐 `deploy` 已挂载的 `images-checkout:/var/lib/pepgent/images` 卷与 Lab 后端之间的配置契约，写方与生命周期和 `deploy/README.md:135` 一致。
- **`D46-03 v1`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，Lab 只读清单与检出）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，避免 Lab 从多阶段 `Dockerfile` 与 `README` 散文中臆测发布目标与六类依赖，`name` 与 `D38-03` 关联键严格一致。
- **`D46-04 v1`（`settings.members[].online` 与 `lastActiveAt` 取 Lab 进程内观察到的事件订阅与已认证调用事实）：`approve`（赞成）**
  - **理由：** 以 Lab 真实观察到的连接与调用事实为准，避免用默认 24 小时才刷新的 Better Auth `session.updatedAt` 冒充最后活跃或在线状态，不改 wire、不加数据库迁移。
- **`D46-05 v1`（agent 模板 `.omp/agents/<id>.md` 单文件规范布局、`AgentTemplateWire` 字段映射与 `saveVersion` 合入路径）：`approve`（赞成）**
  - **理由：** 对齐 omp 实际单文件加载格式、`pepgent-lab-library/.omp/agents/*.md` 现状及 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 路径投影规则。
- **`D46-06 v1`（`LAB-13` 白名单增加 `apps/web/package.json` 与根 `package-lock.json` 用于新增 YAML 解析依赖）：`approve`（赞成）**
  - **理由：** 恢复 `D16-09` W-09 行原有 manifest/lockfile 权限以引入成熟开源 YAML 解析器（符合 `U13`、`U83`），确保 omp agent 定义 frontmatter 解析准确一致。


## D46-06 v1：赞成（Argon-2，2026-11-01T22:18:34.456Z）——作废：该行已修订到 v2



# Argon（Argon-2）对 D46（Pepgent/PM#65）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-02 v1`、`D46-03 v1`、`D46-04 v1`、`D46-05 v1` 标注“缺失部分或设计补充：是”，`D46-01 v1`、`D46-06 v1` 标注“缺失部分或设计补充：否”。作为产品原始意图守护席，本席对六行均不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）、`AGENTS.md:123` 与 `SOR/.claude/rules/design-assumes-it-works.md` 确认全部六行完全符合用户原始设计意图（详见 `PM/evidence/gates/pepgent80-blocked-gate-a.md`，commit `8dcda1f`）：
  1. **不收缩第一版功能、不移入 D9：** 严守 `(U)` `U1`、`U2`、`U23` 与 `AGENTS.md:123`，不把 `containers.images`、`settings.members[].online/lastActiveAt` 或 `settings.agentTemplates` 移入 D9，也不改 `protocol/lab/**` 与 wire 形状。
  2. **各事实归其唯一权威源（《权威源头与生命周期》）：**
     - 成员、角色、邀请归 Better Auth（`D7-03`），`member.invite/role/remove` 在 Better Auth 端点成功返回后写 `activity`（`D46-01 v1`）；
     - 镜像定义归拥有方 `Pepgent/images`（`W-03`）根部的机器可读清单 `images.json`，Lab 经部署注入的 `PEPGENT_LAB_IMAGES_HOME`/`PEPGENT_LAB_IMAGES_REMOTE` 维护 `images-checkout` 检出并只读导出 `ImageDefinition`（`D46-02 v1`、`D46-03 v1`，兑现 `D7-13` 与 P15）；
     - 成员在线与最后活跃归 Lab 自身观察到的 `GET /api/lab/events` 订阅与已认证调用时刻（`D46-04 v1`）；
     - 智能体模板对齐 omp 实际单文件定义 `.omp/agents/<id>.md`（`id` 取 frontmatter `name` 且与文件名主干一致），`saveVersion` 合入 `[.omp/agents/<id>.md]`，并恢复 `D16-09` 原授予 `W-09` 的 `apps/web/package.json` 与根 `package-lock.json` 白名单以引入成熟 YAML 解析库（`D46-05 v1`、`D46-06 v1`）。

---

## 二、对各行的逐项投票

- **`D46-01 v1`（`member.invite/role/remove` 在 Better Auth 端点成功返回后单独写 `activity`；`member.quota`、`conclusion.confirm` 仍同事务）：`approve`（赞成）**
  - **理由：** 与 `D43-01 v1` 合入族同构，服从 Better Auth 对成员/角色/邀请的唯一权威（`D7-03`）及 `better-sqlite3` 同步事务边界，主路径保证“成员命令成功才有行”，不改 wire、不设失败分支。
- **`D46-02 v1`（`PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE` 检出配置接口）：`approve`（赞成）**
  - **理由：** 与 `D21-01`、`D22-01` 同型，补齐 `deploy` 已挂载的 `images-checkout:/var/lib/pepgent/images` 卷与 Lab 后端之间的配置契约，写方与生命周期和 `deploy/README.md:135` 一致。
- **`D46-03 v1`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，Lab 只读清单与检出）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，避免 Lab 从多阶段 `Dockerfile` 与 `README` 散文中臆测发布目标与六类依赖，`name` 与 `D38-03` 关联键严格一致。
- **`D46-04 v1`（`settings.members[].online` 与 `lastActiveAt` 取 Lab 进程内观察到的事件订阅与已认证调用事实）：`approve`（赞成）**
  - **理由：** 以 Lab 真实观察到的连接与调用事实为准，避免用默认 24 小时才刷新的 Better Auth `session.updatedAt` 冒充最后活跃或在线状态，不改 wire、不加数据库迁移。
- **`D46-05 v1`（agent 模板 `.omp/agents/<id>.md` 单文件规范布局、`AgentTemplateWire` 字段映射与 `saveVersion` 合入路径）：`approve`（赞成）**
  - **理由：** 对齐 omp 实际单文件加载格式、`pepgent-lab-library/.omp/agents/*.md` 现状及 `WEB-06` 已合入的 `project-settings.ts`/`settings-view-model.ts` 路径投影规则。
- **`D46-06 v1`（`LAB-13` 白名单增加 `apps/web/package.json` 与根 `package-lock.json` 用于新增 YAML 解析依赖）：`approve`（赞成）**
  - **理由：** 恢复 `D16-09` W-09 行原有 manifest/lockfile 权限以引入成熟开源 YAML 解析器（符合 `U13`、`U83`），确保 omp agent 定义 frontmatter 解析准确一致。


## D46-03 v2：赞成（Argon-2，2026-11-01T22:28:50.759Z）



# Argon（Argon-2）对 D46-03 v2、D46-06 v2（Pepgent/PM#65）的重投选票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-03 v2`（缺失部分或设计补充：是）与 `D46-06 v2`（缺失部分或设计补充：否）针对 `LeadMentor-2` 与 `ClaudeHighD46` 指出的两项问题作了精确修正，本席不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）与 `AGENTS.md:123` 确认两行修订完全符合用户原始设计意图：
  1. **`D46-03 v2`（`ImageDefinition.base` 定义为最近的已发布祖先）：** 将 `base` 明确定义为从 `target` 沿 `Dockerfile` 的 `FROM` 链向上遇到的第一个本身也是发布目标的 stage 的 `name`（`central` 经 `remote-client`、`lab-web` 经 `node-runtime`→`remote-client` 均为 `pepgent/omp-agent`；无已发布祖先时取链顶外部镜像引用原文如 `debian:stable-slim`），并写明链上跨过的内部 stage（`remote-client`、`node-runtime`）装入的工具与依赖照常按六类列入 `dependencies[]`，六类中 `base` 类指 `base` 字段所指镜像本身。彻底消除了“直接基础镜像”与多阶段内部 stage 构建事实之间的冲突。
  2. **`D46-06 v2`（`LAB-13` 白名单补齐 `THIRD_PARTY_NOTICES.txt`）：** 将 `D16-09` W-09 行原有的第三项 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`（仅由 `npm run generate:third-party-notices` 重新生成）一并补入 `LAB-13` 白名单，消除新增 YAML 依赖后 `@pepgent/web` `build` 中 `generate-third-party-notices --check` 失败的阻塞。

---

## 二、对修订条目的投票

- **`D46-03 v2`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，`base` 为最近的已发布祖先）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，`base` 与 `dependencies[]` 语义同 `Pepgent/images` 真实多阶段 `Dockerfile` 完全自洽，不改 wire。
- **`D46-06 v2`（`LAB-13` 白名单增加 `apps/web/package.json`、根 `package-lock.json` 与 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`）：`approve`（赞成）**
  - **理由：** 完整对齐 `D16-09` W-09 行原有的依赖 manifest、lockfile 与 `THIRD_PARTY_NOTICES` 范围，保证 `LAB-13` 引入 YAML 解析库后本仓 `build` 门禁一次通过。


## D46-06 v2：赞成（Argon-2，2026-11-01T22:28:50.759Z）



# Argon（Argon-2）对 D46-03 v2、D46-06 v2（Pepgent/PM#65）的重投选票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D46-03 v2`（缺失部分或设计补充：是）与 `D46-06 v2`（缺失部分或设计补充：否）针对 `LeadMentor-2` 与 `ClaudeHighD46` 指出的两项问题作了精确修正，本席不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U13`、`U23`、`U83`（`LEDGER.md:69,75,86,95,112`）与 `AGENTS.md:123` 确认两行修订完全符合用户原始设计意图：
  1. **`D46-03 v2`（`ImageDefinition.base` 定义为最近的已发布祖先）：** 将 `base` 明确定义为从 `target` 沿 `Dockerfile` 的 `FROM` 链向上遇到的第一个本身也是发布目标的 stage 的 `name`（`central` 经 `remote-client`、`lab-web` 经 `node-runtime`→`remote-client` 均为 `pepgent/omp-agent`；无已发布祖先时取链顶外部镜像引用原文如 `debian:stable-slim`），并写明链上跨过的内部 stage（`remote-client`、`node-runtime`）装入的工具与依赖照常按六类列入 `dependencies[]`，六类中 `base` 类指 `base` 字段所指镜像本身。彻底消除了“直接基础镜像”与多阶段内部 stage 构建事实之间的冲突。
  2. **`D46-06 v2`（`LAB-13` 白名单补齐 `THIRD_PARTY_NOTICES.txt`）：** 将 `D16-09` W-09 行原有的第三项 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`（仅由 `npm run generate:third-party-notices` 重新生成）一并补入 `LAB-13` 白名单，消除新增 YAML 依赖后 `@pepgent/web` `build` 中 `generate-third-party-notices --check` 失败的阻塞。

---

## 二、对修订条目的投票

- **`D46-03 v2`（`ImageDefinition` 权威源为 `Pepgent/images` 根部 `images.json`，`base` 为最近的已发布祖先）：`approve`（赞成）**
  - **理由：** 兑现 `D7-13`“定义、资源、作业各取拥有方”，`base` 与 `dependencies[]` 语义同 `Pepgent/images` 真实多阶段 `Dockerfile` 完全自洽，不改 wire。
- **`D46-06 v2`（`LAB-13` 白名单增加 `apps/web/package.json`、根 `package-lock.json` 与 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`）：`approve`（赞成）**
  - **理由：** 完整对齐 `D16-09` W-09 行原有的依赖 manifest、lockfile 与 `THIRD_PARTY_NOTICES` 范围，保证 `LAB-13` 引入 YAML 解析库后本仓 `build` 门禁一次通过。

