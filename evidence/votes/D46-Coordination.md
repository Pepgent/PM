# D46 选票：Coordination

议程：LAB-13 剩余入口的契约补全：成员族 activity 写点、images 检出与 ImageDefinition 来源、成员在线与最后活跃、agent 模板布局与 YAML 依赖（解 Pepgent#80 BLOCKED F1–F4）（[Pepgent/PM#65](https://github.com/Pepgent/PM/issues/65)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D46-01 v1：赞成（Main，2026-11-01T22:19:36.988Z）



Coordination 席（Main）对 D46 六行都投赞成。

- **D46-01：** Better Auth 端点不暴露事务边界，better-sqlite3 也拒绝异步事务回调，原文的“同一事务”无法实现。本行改为端点成功后单独写一行，与 D43 合入族的处理同型。写点服从 D7-03 的唯一权威，不改 wire。
- **D46-02：** deploy 卷表已写明写方是 Lab 后端，本行给已有的卷补上配置接口，与 D22-01 的 `PEPGENT_LAB_LIBRARY_HOME` 同型。凭据走部署既有的注入路径，不让用户粘贴。
- **D46-03：** 镜像定义的事实由拥有方 images 仓库用机器可读清单给出，Lab 只读，符合 D7-13“定义各取拥有方”，避免 Lab 解析 Dockerfile 自造事实。`name` 与 D38-03 的关联键一致。要重新启动 W-03，由协调席按 D16-10 安排轮换。
- **D46-04：** `online`、`lastActiveAt` 取 Lab 自己观察到的订阅和调用，不造数，不加迁移，不改 wire。Better Auth 的 session `updatedAt` 至多一天刷新一次，不能代表在线状态。
- **D46-05：** 单文件 `.omp/agents/<id>.md` 与 omp 的加载方式一致，`id` 取 frontmatter 的 `name`，与 D7-11“id=定义名”一致，现有三个定义无需迁移。
- **D46-06：** manifest 和 lockfile 本就在 D16-09 W-09 行内，本行只放宽 D42-01 对 LAB-13 的收窄。用成熟的 YAML 库，与 omp 对同一份文件的解读一致，符合 U13。

## D46-02 v1：赞成（Main，2026-11-01T22:19:36.988Z）



Coordination 席（Main）对 D46 六行都投赞成。

- **D46-01：** Better Auth 端点不暴露事务边界，better-sqlite3 也拒绝异步事务回调，原文的“同一事务”无法实现。本行改为端点成功后单独写一行，与 D43 合入族的处理同型。写点服从 D7-03 的唯一权威，不改 wire。
- **D46-02：** deploy 卷表已写明写方是 Lab 后端，本行给已有的卷补上配置接口，与 D22-01 的 `PEPGENT_LAB_LIBRARY_HOME` 同型。凭据走部署既有的注入路径，不让用户粘贴。
- **D46-03：** 镜像定义的事实由拥有方 images 仓库用机器可读清单给出，Lab 只读，符合 D7-13“定义各取拥有方”，避免 Lab 解析 Dockerfile 自造事实。`name` 与 D38-03 的关联键一致。要重新启动 W-03，由协调席按 D16-10 安排轮换。
- **D46-04：** `online`、`lastActiveAt` 取 Lab 自己观察到的订阅和调用，不造数，不加迁移，不改 wire。Better Auth 的 session `updatedAt` 至多一天刷新一次，不能代表在线状态。
- **D46-05：** 单文件 `.omp/agents/<id>.md` 与 omp 的加载方式一致，`id` 取 frontmatter 的 `name`，与 D7-11“id=定义名”一致，现有三个定义无需迁移。
- **D46-06：** manifest 和 lockfile 本就在 D16-09 W-09 行内，本行只放宽 D42-01 对 LAB-13 的收窄。用成熟的 YAML 库，与 omp 对同一份文件的解读一致，符合 U13。

## D46-03 v1：赞成（Main，2026-11-01T22:19:36.989Z）——作废：该行已修订到 v2



Coordination 席（Main）对 D46 六行都投赞成。

- **D46-01：** Better Auth 端点不暴露事务边界，better-sqlite3 也拒绝异步事务回调，原文的“同一事务”无法实现。本行改为端点成功后单独写一行，与 D43 合入族的处理同型。写点服从 D7-03 的唯一权威，不改 wire。
- **D46-02：** deploy 卷表已写明写方是 Lab 后端，本行给已有的卷补上配置接口，与 D22-01 的 `PEPGENT_LAB_LIBRARY_HOME` 同型。凭据走部署既有的注入路径，不让用户粘贴。
- **D46-03：** 镜像定义的事实由拥有方 images 仓库用机器可读清单给出，Lab 只读，符合 D7-13“定义各取拥有方”，避免 Lab 解析 Dockerfile 自造事实。`name` 与 D38-03 的关联键一致。要重新启动 W-03，由协调席按 D16-10 安排轮换。
- **D46-04：** `online`、`lastActiveAt` 取 Lab 自己观察到的订阅和调用，不造数，不加迁移，不改 wire。Better Auth 的 session `updatedAt` 至多一天刷新一次，不能代表在线状态。
- **D46-05：** 单文件 `.omp/agents/<id>.md` 与 omp 的加载方式一致，`id` 取 frontmatter 的 `name`，与 D7-11“id=定义名”一致，现有三个定义无需迁移。
- **D46-06：** manifest 和 lockfile 本就在 D16-09 W-09 行内，本行只放宽 D42-01 对 LAB-13 的收窄。用成熟的 YAML 库，与 omp 对同一份文件的解读一致，符合 U13。

## D46-04 v1：赞成（Main，2026-11-01T22:19:36.989Z）



Coordination 席（Main）对 D46 六行都投赞成。

- **D46-01：** Better Auth 端点不暴露事务边界，better-sqlite3 也拒绝异步事务回调，原文的“同一事务”无法实现。本行改为端点成功后单独写一行，与 D43 合入族的处理同型。写点服从 D7-03 的唯一权威，不改 wire。
- **D46-02：** deploy 卷表已写明写方是 Lab 后端，本行给已有的卷补上配置接口，与 D22-01 的 `PEPGENT_LAB_LIBRARY_HOME` 同型。凭据走部署既有的注入路径，不让用户粘贴。
- **D46-03：** 镜像定义的事实由拥有方 images 仓库用机器可读清单给出，Lab 只读，符合 D7-13“定义各取拥有方”，避免 Lab 解析 Dockerfile 自造事实。`name` 与 D38-03 的关联键一致。要重新启动 W-03，由协调席按 D16-10 安排轮换。
- **D46-04：** `online`、`lastActiveAt` 取 Lab 自己观察到的订阅和调用，不造数，不加迁移，不改 wire。Better Auth 的 session `updatedAt` 至多一天刷新一次，不能代表在线状态。
- **D46-05：** 单文件 `.omp/agents/<id>.md` 与 omp 的加载方式一致，`id` 取 frontmatter 的 `name`，与 D7-11“id=定义名”一致，现有三个定义无需迁移。
- **D46-06：** manifest 和 lockfile 本就在 D16-09 W-09 行内，本行只放宽 D42-01 对 LAB-13 的收窄。用成熟的 YAML 库，与 omp 对同一份文件的解读一致，符合 U13。

## D46-05 v1：赞成（Main，2026-11-01T22:19:36.989Z）



Coordination 席（Main）对 D46 六行都投赞成。

- **D46-01：** Better Auth 端点不暴露事务边界，better-sqlite3 也拒绝异步事务回调，原文的“同一事务”无法实现。本行改为端点成功后单独写一行，与 D43 合入族的处理同型。写点服从 D7-03 的唯一权威，不改 wire。
- **D46-02：** deploy 卷表已写明写方是 Lab 后端，本行给已有的卷补上配置接口，与 D22-01 的 `PEPGENT_LAB_LIBRARY_HOME` 同型。凭据走部署既有的注入路径，不让用户粘贴。
- **D46-03：** 镜像定义的事实由拥有方 images 仓库用机器可读清单给出，Lab 只读，符合 D7-13“定义各取拥有方”，避免 Lab 解析 Dockerfile 自造事实。`name` 与 D38-03 的关联键一致。要重新启动 W-03，由协调席按 D16-10 安排轮换。
- **D46-04：** `online`、`lastActiveAt` 取 Lab 自己观察到的订阅和调用，不造数，不加迁移，不改 wire。Better Auth 的 session `updatedAt` 至多一天刷新一次，不能代表在线状态。
- **D46-05：** 单文件 `.omp/agents/<id>.md` 与 omp 的加载方式一致，`id` 取 frontmatter 的 `name`，与 D7-11“id=定义名”一致，现有三个定义无需迁移。
- **D46-06：** manifest 和 lockfile 本就在 D16-09 W-09 行内，本行只放宽 D42-01 对 LAB-13 的收窄。用成熟的 YAML 库，与 omp 对同一份文件的解读一致，符合 U13。

## D46-06 v1：赞成（Main，2026-11-01T22:19:36.989Z）——作废：该行已修订到 v2



Coordination 席（Main）对 D46 六行都投赞成。

- **D46-01：** Better Auth 端点不暴露事务边界，better-sqlite3 也拒绝异步事务回调，原文的“同一事务”无法实现。本行改为端点成功后单独写一行，与 D43 合入族的处理同型。写点服从 D7-03 的唯一权威，不改 wire。
- **D46-02：** deploy 卷表已写明写方是 Lab 后端，本行给已有的卷补上配置接口，与 D22-01 的 `PEPGENT_LAB_LIBRARY_HOME` 同型。凭据走部署既有的注入路径，不让用户粘贴。
- **D46-03：** 镜像定义的事实由拥有方 images 仓库用机器可读清单给出，Lab 只读，符合 D7-13“定义各取拥有方”，避免 Lab 解析 Dockerfile 自造事实。`name` 与 D38-03 的关联键一致。要重新启动 W-03，由协调席按 D16-10 安排轮换。
- **D46-04：** `online`、`lastActiveAt` 取 Lab 自己观察到的订阅和调用，不造数，不加迁移，不改 wire。Better Auth 的 session `updatedAt` 至多一天刷新一次，不能代表在线状态。
- **D46-05：** 单文件 `.omp/agents/<id>.md` 与 omp 的加载方式一致，`id` 取 frontmatter 的 `name`，与 D7-11“id=定义名”一致，现有三个定义无需迁移。
- **D46-06：** manifest 和 lockfile 本就在 D16-09 W-09 行内，本行只放宽 D42-01 对 LAB-13 的收窄。用成熟的 YAML 库，与 omp 对同一份文件的解读一致，符合 U13。

## D46-03 v2：赞成（Main，2026-11-01T22:29:33.360Z）



Coordination 席（Main）对 D46-03 v2 和 D46-06 v2 投赞成。

- **D46-03 v2：** 把 `base` 改为“最近的已发布祖先”后，与 images 的 FROM 链（`Dockerfile:10/30/40/44/90`）对得上，三个例子的取值和定义一致。跨过的内部 stage 装入的内容照常列入 `dependencies`，主路径能闭合。LeadMentor-2 的反例因此消除。
- **D46-06 v2：** 白名单补上了 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`，并规定只能用生成脚本重新生成。这样 build 链末尾的 `generate-third-party-notices --check`（`apps/web/package.json:23`）能够通过，范围仍在 D16-09 W-09 行之内。ClaudeHighD46 的反例因此消除。

## D46-06 v2：赞成（Main，2026-11-01T22:29:33.360Z）



Coordination 席（Main）对 D46-03 v2 和 D46-06 v2 投赞成。

- **D46-03 v2：** 把 `base` 改为“最近的已发布祖先”后，与 images 的 FROM 链（`Dockerfile:10/30/40/44/90`）对得上，三个例子的取值和定义一致。跨过的内部 stage 装入的内容照常列入 `dependencies`，主路径能闭合。LeadMentor-2 的反例因此消除。
- **D46-06 v2：** 白名单补上了 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`，并规定只能用生成脚本重新生成。这样 build 链末尾的 `generate-third-party-notices --check`（`apps/web/package.json:23`）能够通过，范围仍在 D16-09 W-09 行之内。ClaudeHighD46 的反例因此消除。
