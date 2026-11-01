# D21 投票：claude-high（独立空白历史审查席）

- **投票人：** claude-high（`GovClone_55b0.ClaudeHighD21`），依 U95 独立计 1 票
- **审查对象：** `local://decisions/D21-draft.md` 唯一条目 D21-01
- **立场：** steady 与 divergent 合并执行；只看主路径

## D21-01 Lab 会话 worktree 根路径由部署注入

**票：赞成**

**分类意见：** 串联。同意草案的分类。这一项把 Pepgent 已经消费的配置名，接到 deploy 已有的挂载点上，属于跨仓接缝闭合，不改产品意图，也不改技术选型。

### 逐条事实核对

| 草案陈述 | 核对结果 | 证据 |
| --- | --- | --- |
| D2-20 规定会话 worktree 卷挂进 Lab 后端容器 | 属实 | `/tmp/govclone-pm/evidence/decisions/D2-components.md:57`：“中心检出缓存卷和会话 worktree 卷都挂进 Lab 后端容器”；持久载体一栏写明写方是该会话的 omp 和人，Lab 负责创建和删除 |
| D7-04 规定每个会话在卷上克隆独立 clone，并记入 `conversation.worktree` | 属实 | `/tmp/govclone-pm/evidence/decisions/D7-lab-backend.md:64` |
| D7:79 规定写方与生命周期 | 属实但不完整 | `D7-lab-backend.md:79`（D7-19）除了写方，还写了“**环境变量：** `SOROI_STORE_URL`、`SOROI_MUX_URL`，以及上述各卷的挂载路径”。也就是说，“卷挂载路径由 env 交给 Lab”这类接口 D7-19 早已定下，原来缺的只是变量名和值的语义（见建议 2） |
| Stack 定义归 `Pepgent/deploy`（D2-23） | 属实 | `D2-components.md:60` |
| `runtime.ts:48` 的内容 | 属实 | 在 `Pepgent/Pepgent` 的 `origin/main`（`dbc1120`，PR#48 的 `380e057` 是它的祖先）上执行 `git show`，第 48 行是 `worktreeHome: resolve(environment.PEPGENT_LAB_WORKTREE_HOME ?? join(webRoot, 'lab-worktrees'))`；`operations.ts:181` 用它来 `createConversationClone` |
| `apps/web/README.md:205` 有对应说明 | 属实 | 第 205–206 行：clone 放在 `PEPGENT_LAB_WORKTREE_HOME` 之下，默认是 `<PEPGENT_WEB_ROOT>/lab-worktrees` |
| compose `:108` 把 `session-worktrees` 挂到 `/work`，`:170` 写了卷名 | 属实 | `/tmp/govclone-deploy/stacks/pepgent-central/compose.yaml:108`、`:170`；deploy 的 `origin/main` 是 `c0b56f3`，工作树干净 |
| deploy `README.md:109` 的卷表写明 `/work` | 属实 | `/tmp/govclone-deploy/README.md:109` |
| 目前没有注入该变量 | 属实 | 在 compose 的 lab-web environment（`:85-101`）中检索不到 `PEPGENT_LAB_WORKTREE_HOME` |
| “Lab 会落到**镜像内**的默认路径 `lab-worktrees`” | **有误，但不影响结论** | `runtime.ts:37` 的 `webRoot = PEPGENT_WEB_ROOT ?? $HOME/.pepgent`；compose `:89` 注入的是 `PEPGENT_WEB_ROOT=/var/lib/pepgent/web`，`:105` 把它挂成 `web-state` 卷。所以 clone 实际落在 **`web-state` 卷**的 `/var/lib/pepgent/web/lab-worktrees` 上，并不在镜像层里。按 deploy `README.md:105`，`web-state` 是“既有 Web/Paseo 持久状态”。“不在会话卷上”这一点成立 |

### 理由

1. **主路径闭合。** Pepgent 已经按 `PEPGENT_LAB_WORKTREE_HOME` 读取根路径（`runtime.ts:48`），deploy 已经把 `session-worktrees` 挂到 `/work`（`compose.yaml:108`），state-init 也已经把该卷的属主改成 1000（`compose.yaml:9-11,19`）。补上一行 `PEPGENT_LAB_WORKTREE_HOME=/work` 后，`discussion.create` 建出的 clone 就落在 D2-20 指定的持久卷上，并与 deploy `README.md:109` 的卷表一致。不新增卷，也不新增路径来源。
2. **事实更正后，决策反而更有必要。** 现状并不只是“落在镜像层、重建时丢失”，而是会话 clone 写进了 `web-state` 卷。这个卷属于既有 Web/Paseo 状态（README:105），会话 worktree 就和别的写方共用一个载体，违反 D7-19 的“卷按写方分开，与 D2-20 的持久载体一一对应”（D7:79）。注入之后，这个错位被消除。
3. **落选备选的理由成立。** 如果把应用默认值改成 `/work`，就是把 deploy 拥有的挂载点（D2-23）写死进应用。合并进 #18 则会把两件原因和验收都不同的事绑在一起。
4. **找不到主路径失效反例。** 承载方式（新 issue、非 draft PR、`Fixes`）和回写方式都能走通，所以不投反对票。

### 不阻断的建议（不影响本票）

1. **更正草案事实 (R) 第 13 行：** 把“镜像内的默认路径 `lab-worktrees`”改为“`PEPGENT_WEB_ROOT` 下的 `lab-worktrees`，即 `web-state` 卷上的 `/var/lib/pepgent/web/lab-worktrees`（`runtime.ts:37,48`；`compose.yaml:89,105`）”。“得到”一栏也可以补一句：会话 worktree 不再与 Web/Paseo 状态共用卷。
2. **回写位置：** D7-19（D7:79）已经有“环境变量：……以及上述各卷的挂载路径”这一处。变量名和值的语义应写进 D7-19 的环境变量列表，D7-04 只引用它，避免同一接口在两段各写一遍。草案“缺失部分”一栏也宜改为“D7-19 只写了卷挂载路径以 env 传入，缺少会话 worktree 卷的变量名”。
3. **同类缺口（divergent，U83–U84）：** `runtime.ts:45` 的 `PEPGENT_LAB_LIBRARY_HOME` 也没有注入，默认会落到 `/var/lib/pepgent/web/lab-library`，也就是 `web-state` 卷。而 deploy 已经把 `library-cache` 挂在 `/var/lib/pepgent/library`（`compose.yaml:107`；README:108），这个卷现在没有被 Lab 用到。它和 D21-01 是同一个域、同一个 Stack、同一种修法（加一行 env）。建议闸门 B 评估是否在同一个 deploy PR 中顺带注入 `PEPGENT_LAB_LIBRARY_HOME=/var/lib/pepgent/library`，或者另立一个窄条目。这件事不在 D21-01 的范围内，因此不构成反对 D21-01 的反例。
