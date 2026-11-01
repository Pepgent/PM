# D30 选票：ClaudeHigh

议程：Pepgent#19 LAB-09：自动化的聚焦范围、事件游标、定时时区、会话 owner 与首条投递、结束锚点与规则删除（AU-1 至 AU-7）（[Pepgent/PM#49](https://github.com/Pepgent/PM/issues/49)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D30-01 v1：赞成（ClaudeHighD30，2026-11-01T17:54:29.086Z）



# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-02 v1：赞成（ClaudeHighD30，2026-11-01T17:54:29.087Z）



# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-03 v1：反对（ClaudeHighD30，2026-11-01T17:54:29.087Z）——作废：该行已修订到 v2

**反例：** **反例（D30-03 v1，主路径：原型 A-04“每周一 09:00”定时摘要）**

1. 行文的主案与“得到”第 2 点之间有矛盾。主案写“不新增规则字段、配置接口或部署变量，容器时区沿用部署现状”，“得到”写“部署在本地时区的中心，规则‘每周一 09:00’就是当地 09:00”。在唯一的中心部署上，后一句不成立。
2. 部署现状（D）：`pepgent-deploy/stacks/pepgent-central/compose.yaml:57-125` 的 `lab-web` 服务没有设置 `TZ`，也没有挂载 `/etc/localtime`；`pepgent-deploy/komodo/syncs/central.toml` 同样没有 TZ。在 `pepgent-deploy` 与 `pepgent-images` 中检索 `TZ|timezone|tzdata|localtime`，只命中 `scripts/slurm.py` 里的 `datetime.timezone`。
3. 运行观察（R，2026-11-02 本机执行，只读）：
   ```
   $ date                                  → Mon Nov  2 02:52:58 JST 2026
   $ docker exec pepgent-central-lab-web sh -c 'date; echo TZ=$TZ; ls -l /etc/localtime; node -e "console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)"'
     → Sun Nov  1 17:52:58 UTC 2026 / TZ= / /etc/localtime -> /usr/share/zoneinfo/Etc/UTC / UTC
   $ docker image inspect …/pepgent/lab-web:latest --format '{{json .Config.Env}}'
     → ["PATH=…","HOME=/home/agent","HOST=0.0.0.0","PORT=3000"]   （镜像不带 TZ）
   ```
4. 失效路径：中心主机在 JST，Lab 容器在 UTC。按本行的规定，croner 不传时区，A-04 的 `cron 0 9 * * 1` 在周一 09:00 UTC 触发，也就是当地 18:00。`schedule{at}` 记为 `…T09:00:00Z`，浏览器按本地时间呈现为 18:00。规则作者写的 `when` 文本是“每周一 09:00”（`WT07/client/services/lab-fixture/workspace.ts:138`），实际运行时刻与它对不上。本行用来淘汰 2d-b（UTC）的理由，正是它在现有部署上表现出来的行为。
5. 契约层面：本行把公开字段 `schedule{cron}` 的解释交给 Lab 镜像基底的 `/etc/localtime`。没有任何仓库或决策拥有这项状态，它的权威源头悬空。D10-08 把部署前提列为必须表决的事项，本行却写“不改 `Pepgent/deploy`”，把这项前提隐去了。

**清零方式（任选其一，由发起人修订）：**
- (a) 改为 2d-b：明确 `cron` 一律按 UTC 解释，与 D12-02 一致，与现有部署的实际行为相同；“得到”和“代价”按实际情况重写（A-04 的 09:00 是 UTC 09:00）。
- (b) 保留 2d-a，同时把“Lab 容器时区由 `Pepgent/deploy` 的 compose `TZ` 声明、取中心所在时区”写成本行的部署前提。这一项越过 W-09 白名单，需要按 gate-b.md:46 为该行标注 `domains: [governance]`。


# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-04 v1：赞成（ClaudeHighD30，2026-11-01T17:54:29.087Z）



# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-05 v1：赞成（ClaudeHighD30，2026-11-01T17:54:29.087Z）



# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-06 v1：赞成（ClaudeHighD30，2026-11-01T17:54:29.087Z）



# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-07 v1：赞成（ClaudeHighD30，2026-11-01T17:54:29.087Z）



# ClaudeHigh（实例 ClaudeHighD30）对 D30 v1 的逐行审阅

本席为空白历史独立审查席，只读文件与源码。读过的材料：PM#49 正文；`evidence/gates/pepgent-19.md`、`-gate-a.md`、`-gate-b.md`；`DEC/D7-lab-backend.md:62-70,124-161,164-214`；`DEC/D12-lab-wire.md:34,41-42,234-253,497-536`；`WT07/server/lab/{sessions.ts,experiments.ts,schema.ts}`；`WT07/client/services/lab-fixture/workspace.ts`；`pepgent-deploy/stacks/pepgent-central/compose.yaml`。另外只读观察了中心 Lab 容器的时区。每行都从 steady（契约闭合）和 divergent（是否有更简明的主路径）两个立场检验。

## D30-01 赞成
- **steady：** `member_profile.main_project_id` 已存在，可空，外键指向 project（`schema.ts:33`）；`automation_rule.created_by` 是 member id（`schema.ts:248`），能直接连到 member_profile。现在 Automation 会话开出的运行，ext 项目在 `scopeKind === 'project'` 时取规则的项目，其余为 `null`（`experiments.ts:66-71`）。本行只是给这个分支补上 `focused_project → 创建者当前主项目`，改动在 W-09 白名单内，ADT 与线形状都不变。“每次读当前值、不另存副本”符合单一权威。
- **divergent：** 落选 c 会让页面状态进入持久化。删去 variant 则违背 U2/U23（gate-a.md:16）。本案最简。
- **附注（不构成反例）：** 定时规则的 prompt 只含规则步骤与触发事实（D7-10），不含 scope 解析出的项目。A-04 一类“项目摘要”要靠 Main 从步骤文本中知道是哪个项目，这一点 `project{p}` 同样如此，是 D7-10 既有的口径，不在本行引入。

## D30-02 赞成
- **steady：** 游标与 `automation_run` 写入在同一 SQLite 事务中推进，与 D6-06“事件与游标同一权威”同构。`after=<落库游标>` 只用到 store 既有的接口（D6:34），不跨 W-06。空库首启时没有规则，从 `"0"` 读起只会推进游标，F2-6 的重复触发因此消失。“规则只经 `automation.rule.create` 在运行中建立”在现有代码中成立：规则的写入本身就是 LAB-09 的内容（gate 材料 G-10），seed 不建规则。
- **divergent：** 2a-b 用时间戳去重，违反 D6-06。新增“流尾”读取要改 store。本案不新增 store 接口，是最小的持久化。
- **附注（实现提示，不构成反例）：** 本行保留 LAB-06 的 `followLifecycle`，于是同一 store 上有两个独立消费者。`run_started` 规则在匹配 `project{p}` 或 `lab` 时依赖 ext。工程师可以在自动化处理器内先调用幂等的 `nameStartedRun`（`experiments.ts:24`）再匹配，这不改变本行的契约。

## D30-03 反对（反例见 counter）
在唯一的中心部署上，Lab 容器的时区是 UTC，主机在 JST。本行“不改部署、沿用现状”的规定实际得到 UTC 语义，这推翻了本行用来淘汰 2d-b 的“当地 09:00”收益：A-04 会在当地 18:00 触发。同时，公开字段的解释口径落在一个没有拥有者的镜像状态上。可以改为明确 UTC，或补上由 deploy 声明 TZ 的部署前提，任选其一即可清零。

## D30-04 赞成
- **steady：** `ConversationRow.owner` 必填（D7:128、146）。三条路径各有确定的成员，都在一次受理中已知：approve 的操作者、`manual.by`、`created_by`。权限表不变（D12:505-519），与 D26-01“审批人为主体”同一口径。
- **对条文重叠的读法（请工程师照此实现）：** “手动运行”加上“规则含审批步”时（原型 A-03 含 `approval` 步，`workspace.ts:123`；D7-10“手动运行同路径”），第 1、2 两点会同时命中。本席按本行“落选”第 2 条的结构（“有审批取批准者、其余……”）以及第 3 点显式写出的“且规则无审批步”来读：**需审批优先，owner 取批准者；第 2 点指不需审批的手动运行**。这样读与 D30-05 的“审批路径 principal 即批准者”闭合，不构成主路径断裂。
- **divergent：** 落选 b、c 都会让实际开出会话的人无法写自己的会话。本案没有更简明的替代。
- **附注：** D12-10 没有专门对 Automation 会话发 prompt 的命令。owner 实际作用于 `human.irc`、介入、派生、中止、`experiment.update` 与 `conclusion.confirm`。“继续对话”一说以现有命令为限，本行也写明“权限表本身不变”。

## D30-05 赞成
- **steady：** 现有实现只在队列有消息时开一代，投递格式为 `human:${principal}\n\n${body}`（`sessions.ts:1-5,320-333`）。经队列投递是唯一不需要新开代路径的做法。`human_irc_queue.principal` 外键指向 `user.id`，owner 的 member 经 Better Auth 映射到 user.id，形状闭合。principal 取自 D30-04，按本席上面的读法，与 D26-01 一致。
- **divergent：** 落选 b、c 都要新增一种无 principal 的开代与投递通道，属于多余机制。

## D30-06 赞成
- **steady：** Lab 已经观察 `prompt_result.sessionSettled` 与 `session_settled`，并据此停驻（`sessions.ts:254-264`）。“首条投递后第一次 settle”在现有观察点上唯一可判定，不改 D7-05 的封闭工具表。`skipped` 仍只由 dismiss 产生，与 D7-10 原文一致。`endedAt` 只有这一个来源。
- **divergent：** 新增 host tool 会改 D7-05；以进程退出为准则无法区分停驻。本案最简。代价是 `ok` 只表示首轮完成，行内已如实写明。

## D30-07 赞成
- **steady：** `revision_conflict` 是既有的领域失败（D12:532、534），先例是 D26 LC-3、LC-6 与 #18 restart。无运行的规则在外键上也不会有 Automation 会话，因为 conversation 的 `(automation_run_id, automation_rule_id)` 指向 run，可以安全硬删。命令形状与权限不变。
- **divergent：** 软删除要改表，级联删除会删掉会话与结论的归属。“停用而不删除”沿用已有的 `enabled`，是最少机制的做法。


## D30-03 v2：赞成（ClaudeHighD30b，2026-11-01T17:58:15.841Z）



**D30-03 v2：赞成（ClaudeHigh，实例 ClaudeHighD30b，空白历史）**

**v1 反例是否清零：** v2 正是 `/tmp/D30-ClaudeHigh-ce-03.md` 给出的清零方式 (a)：`cron` 一律按 UTC 解释，创建 croner 任务时显式传 UTC。v1 的两处失效都已消除。一是“得到”与部署事实矛盾：v2 的“得到”第 3 点写明与实测 UTC 的 `lab-web` 行为相同，“代价”按实情写成 A-04 在 JST 实验室是当地 18:00。二是解释口径落在无人拥有的 `/etc/localtime` 上：v2 由本行拥有口径，不依赖容器时区。

**steady（契约闭合、字段一致、白名单）：**
- 与 D12-02 ② 一致（`DEC/D12-lab-wire.md:34`，`Instant` 是 ISO 8601 UTC）：触发时刻与 `schedule{at}` 的 `…Z` 串是同一个 UTC 时刻，`cron` 与触发事实对得上，不需要换算。
- ADT 不变：`AutomationTrigger.schedule{cron: string}`（`DEC/D12-lab-wire.md:252`）不加字段，符合闸门 A 对 2d-c 的反对（`gate-a.md:19,46`）。闸门 A 对 2d-a、2d-b 都不否决。
- 部署前提不变：不依赖容器 TZ，也不改 `Pepgent/deploy`。闸门 B 的 B2-2 只把“新增 TZ 部署前提（2d-a）”和“改 ADT（2d-c）”列为越界（`gate-b.md:19,34`），2d-b 两者都不涉及，仍在 W-09 `server/lab/**` 白名单内，`domains: []` 正确。
- 与 D7-10“schedule 用 croner”（`DEC/D7-lab-backend.md:70`）一致：只规定已选库的一个调用参数（croner 的 `timezone` 选项），不换库，也不另起调度机制。
- 与已通过的各行互不依赖：AU-4 到 AU-6 只用到 `schedule{at}` 这一触发事实的存在，不依赖它的时区。议程事实第 6 条写明 AU-3 不以其他行为条件。
- 原型范围（U2/U23）：A-04 没有删减。规则作者要当地 09:00，可以写 `0 0 * * 1`（JST）；`when` 步骤仍是作者自写的文本（D12-09），文案不受约束。LAB-09 的验收语义针对的是 A-01 事件规则（`D8-mvp-scope.md:330`，G-1），这一行不触及。

**divergent（有没有更简、零等待的主路径）：** 三个落选项都比本案多一项依赖：容器时区没有权威源头；deploy 声明 `TZ` 要跨席位、标 governance 再审一轮；新增时区字段要改 ADT。只有本案不需要任何其他席位或仓库配合，W-09 拿到结论即可引入 croner 并实现定时触发，没有串行等待。我没有找到更简明的主路径。

**不阻塞的备注（不构成反例）：** where 栏与事实 F6 引的 `DEC/D12-lab-wire.md:41,241`，第 241 行在当前文件中是 `AgentTemplateWire.drafts`；`schedule{cron}` 的类型在第 252 行。建议归档时更正行号，不影响本行语义。

