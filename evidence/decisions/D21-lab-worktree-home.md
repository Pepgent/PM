# D21（PM#32）：Lab 会话 worktree 根路径的部署配置接口（P1）

- **PM issue：** https://github.com/Pepgent/PM/issues/32（Issue ID `I_kwDOUWWZ0c8AAAABbnniIA`）
- **起草：** 治理分身 GovClone_55b0。
- **来源：** Pepgent#13 issuecomment-6559550779。LAB-04 已在 PR#48（`380e057`）合入，新增 `PEPGENT_LAB_WORKTREE_HOME`。
- **闸门 A（ArgonSol）：** 不改变产品意图，但这是跨仓的公开配置契约（deploy 注入，Pepgent 消费），需要一个窄决策项定案。
- **闸门 B（ArgonGovernanceSol）：** 通过；与 deploy#18 分开承载，由同一个 W-04 在 #18 合入后接着做。
- **计票：** LEDGER C2-3（U95）规定的产品/契约四席，即总协调席、claude-high、Argon、LeadMentor，至少 3 席赞成即通过；有效反例必须清零。

## 事实

- **(D)** D2-20（D2:57）规定，会话 worktree 卷挂进 Lab 后端容器；D7-04（D7:64）规定，Lab 在该卷上为每个会话克隆独立 clone，并记录到 `conversation.worktree`；D7:79 规定写方与生命周期；Stack 定义归 `Pepgent/deploy`（D2-23）。
- **(R)** Pepgent `origin/main` 的 `apps/web/src/server/lab/runtime.ts:48` 为 `worktreeHome: resolve(environment.PEPGENT_LAB_WORKTREE_HOME ?? join(webRoot, 'lab-worktrees'))`，`apps/web/README.md:205` 有对应说明。
- **(R)** deploy `origin/main` 的 `stacks/pepgent-central/compose.yaml:108` 已把 Lab 容器的 `session-worktrees` 卷挂到 `/work`，卷名为 `pepgent-central-session-worktrees`（:170）；`README.md:109` 的卷表也记录了这一点。但 compose 没有注入该变量，Lab 便取默认值 `PEPGENT_WEB_ROOT/lab-worktrees`。compose:89、:105 把 `PEPGENT_WEB_ROOT` 设为 `/var/lib/pepgent/web`，这个目录在 `web-state` 卷上，结果会话 worktree 与 Web 状态共用一个卷，违反 D7-19（D7:79）“卷按写方分开”。此处的更正采纳了 claude-high 的核对，不改动决策行。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D21-01 | **Lab 会话 worktree 根路径由部署注入** | D7-04 会话 worktree 段；deploy `stacks/pepgent-central/compose.yaml` 中 Lab 服务的 environment；deploy `README.md` 卷表 | • `PEPGENT_LAB_WORKTREE_HOME` 是部署给 Lab 后端的配置接口，值为会话 worktree 卷在 Lab 容器内的挂载根路径。<br>• Lab 在此根下按 D7-04 创建和删除各会话的 clone。<br>• deploy 在中心 Stack 的 Lab 服务上注入 `PEPGENT_LAB_WORKTREE_HOME=/work`，即已有挂载 `session-worktrees:/work`。<br>• 卷的权威、写方、生命周期和 D2-20、D7-04 的语义都不变；不新建卷，不增加第二个路径来源。<br>• **承载：** deploy 新建 issue，W-04 在 #18 合入后从最新 `origin/main` 开新分支，提交一个非 draft PR 并写 `Fixes`；只做本仓声明检查和基础检查，不提前进入阶段 C。<br>• **回写：** 秘书在 D7-04 段补上变量名和值的语义 | **得到：** 会话 worktree 真正落在 D2-20 的持久卷上；接口名和值的语义有了已通过正文。<br>**放弃：** 在 deploy 的 Lab 服务里多一行 env。<br>**备选落选：**<br>• 把 Lab 的默认值改成 `/work`：会把部署路径写死在应用里，而挂载点归 deploy 所有（D2-23）。<br>• 并入 #18：两者原因和验收都不同（闸门 B） | 串联 | 是：D7-04 缺少 Lab 获取卷根路径的接口 | **总协调席：赞成；claude-high：赞成；Argon：赞成；LeadMentor：赞成** | **通过：4/4 赞成；无否决；无有效反例。** |

## 归档结果

- **D21-01：通过。** 四席全部赞成（4/4），无 Argon 否决、无有效反例。
- **闸门 B：** 已批准 D21-01 与 D22-01 共用同一个 deploy 实现 issue；本次机械归档不创建 deploy/Pepgent 实现 issue。
- **原票：** `evidence/votes/D21-Coordination.md`、`D21-ClaudeHigh.md`、`D21-ArgonSol.md`、`D21-LeadMentor.md`；每个文件保留对应原票及理由。
