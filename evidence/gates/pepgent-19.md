# Pepgent#19（LAB-09）BLOCKED 的闸门材料：七项自动化契约裁决请求

- **issue：** [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)，工人 W-09（tern 会话 `pepgent-lab`）。分支 `issue-19-lab-automation`，从 `issue-17-lab-catalog-events`（#17/#20 的交付分支，[PR#55](https://github.com/Pepgent/Pepgent/pull/55)）派生，单独开 PR、base 设为该分支。
- **BLOCKED：** [评论 6561464709](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6561464709) 中的七项“请裁决”。工人写明：这七项定下之前，事件触发、定时触发、手动运行、approve 时开会话、结束判定和规则删除都不实现，`croner` 依赖等第 2 项定下后再引入；已能唯一确定的部分照常实现。
- **编制：** governance-desk 实例 `DeskPepgent19Rulings`（总协调席，与 Main 合计 1 票）。本文整理事实，并在每项末尾给出承接者的**初审分类**（已由既有决策覆盖、只需澄清 / 主路径之外的失败或竞态处理、隐含的内部实现 / 公开契约缺口）。初审分类只是送审意见，不是裁决；能否免票放行由两道闸门判定。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界的项（或子项）才可免票放行；任一闸门认定越界的，合为一张 P0 议案立案投票。
- **七项分别判定，结论互不替代。** 同一项内若初审拆成子项，请按子项分别给结论。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论属于 `(A)`。本实例只读文件与源码，没有运行构建、类型检查、测试或跨组件程序，没有读 git 历史或 session。W-09 的 LAB-09 切片 worktree 未在 `pepgent-lab-home` 的 `git worktree list` 中找到 (R)，代码事实取自它的派生基线 `WT07/`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`（`AGENTS.md`、`LEDGER.md`、`design/`）
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`；`DEC/` = `PM/evidence/decisions/`；`GATE/` = `PM/evidence/gates/`
- `WT07/` = `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/apps/web/src/`（分支 `issue-17-lab-catalog-events`，LAB-09 分支由此派生）

---

## 〇、七项共用的事实

| # | 事实 | 来源 |
|---|---|---|
| G-1 | LAB-09 切片：“自动化：事件触发、`croner` 定时、审批门禁（D7:70）”，依赖 LAB-04、LAB-06，F 流程 F30，验收“A-01 规则写入 `automation_run`；`waiting` 状态的运行批准后才开会话”。 | (D) `DEC/D8-mvp-scope.md:330` |
| G-2 | F30 S2：“规则 A-01 命中，生成一条 `automation_run`，开出 origin 为 `Automation` 的会话，结论写回关联讨论。设为‘需批准’的规则停在 `waiting`，在浏览器中点击批准后才开会话”。F31 ⑥：“运行结束后……A-01 的复盘写回原讨论”。 | (D) `DEC/D8-mvp-scope.md:149,150` |
| G-3 | D7-10 全文要点：规则与线形状以 D12-09 为准；`event` 订阅 store lifecycle 并记游标，`schedule` 用 croner；`then` 含 approval 时停 `waiting`，`action` 是填好步骤与触发事实的 prompt，批准后才开 Main Automation 根会话；conditions 由 Main 判断，agent 步由 Main 用模板派子 agent；**结论或报告写回关联讨论**；dismiss 将 waiting 变 skipped；手动运行同路径；运行记 event/schedule/manual 触发事实、`endedAt`，经 `conversation.automation_run_id` 连会话；approval 权限按 D11-29A。 | (D) `DEC/D7-lab-backend.md:70` |
| G-4 | D12-09 与类型：`AutomationScope = lab \| focused_project \| project{project}`；`AutomationTriggerFact = event{run,event,at} \| schedule{at} \| manual{by,at}`；`AutomationRunWire.state = waiting{action} \| running \| ok \| failed \| skipped`，`endedAt: Instant \| null`，`conversation: ConversationId \| null`。 | (D) `DEC/D12-lab-wire.md:41,234-252` |
| G-5 | 主路径时序（F31）：`run_ended` → `automation_run（规则 A-01 命中）` → 写方声明、dial 新会话（origin Automation）→ `prompt（起草复盘）` → `host_tool_call lab_draft_conclusion` → `结论写回关联讨论` → 发 `conversation`、`automation`。 | (D) `DEC/D7-lab-backend.md:206-213` |
| G-6 | D10-08：意图、范围、缺失设计、跨仓公开契约（HTTP/SSE/WS/RPC、wire、持久化、ADT、权限、状态权威与生命周期）、部署前提、验收语义回领导层投票；已通过契约内单仓私有结构/算法/文件组织、**已选库调用**由工程师决定；遇空白在 issue 标 BLOCKED，只暂停依赖部分。 | (D) `DEC/D10-repo-delivery.md:20` |
| G-7 | 设计阶段只写主路径，不为失败分支、超时、重试、恢复与竞态设计处理。接口或权限表缺少某项不构成授权。 | (D) `SOR/.claude/rules/design-assumes-it-works.md`；`SOR/AGENTS.md:123` |
| G-8 | D18-05（方案 C）：每个 Lab 部署一套独立的 soroi 实例（store、Mux……），Lab 后端按 `labId` 路由到该 Lab 实例的 store URL；soroi 各组件没有 Lab 字段。用户原话：“web对接soroi多租户啊，我说的是多租户概念不侵入soroi”。 | (D) `DEC/D18-product-opus-contracts.md:11`；(U) `bf96d256`（转引自 D18-05） |
| G-9 | `LEDGER.md` 的 `(U)` 索引中没有涉及自动化、定时或 cron 的用户原话。 | (R) 在 `SOR/LEDGER.md` 检索“自动化/automation/定时/cron”只命中 D26 决策索引行与 U83 中的“自动”无关词 |
| G-10 | 工人自述已依契约确定、直接实现的部分：`automation` 页读取、`rule.create/update`（`lab:write`，creator 取当前 `member.id`）、`dismiss`（waiting→skipped 并写 `endedAt`）、approve/dismiss 权限、`automation` 频道通知、waiting 的 `action` 无损呈现规则步骤和触发事实。 | (A) 评论 6561464709 |
| G-11 | 原型规则 A-01：“实验结束后起草复盘”，scope `all`，条件“它至少绑定了一个讨论”，动作“以结论草稿的形式发到绑定的讨论”；运行样例“R-018 的复盘草稿已发到 S-042”“已跳过：R-015 没有绑定讨论”。A-04“每周实验室摘要”：scope `focus`，`cron 0 9 * * 1`（“每周一 09:00”）。原型规则对话框只有 new_rule、edit_rule、approve、dismiss。 | (D) `WT07/client/services/lab-fixture/workspace.ts:25-61,128-138,279-285`；`WT07/client/contracts/lab-workspace.ts:21`；(R) 在 `WT07/client` 检索与规则相关的 delete/删除无命中 |

---

## 一、scope 的服务端语义

### 1.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F1-1 | 工人的问题：D12 只给了三个枚举，没有规定事件触发时怎样用 scope 匹配触发运行（`experiment_ext.lab_id`/`project_id`）；`focused_project` 按 D12-05/D7-16 是页面状态，服务端没有这个事实，事件规则和定时规则在该 scope 下都没法匹配；D7-06 要求 Automation 运行取“规则名与范围”作 ext 的项目，`focused_project` 时填什么未规定。 | (A) 评论 6561464709 第 1 项 |
| F1-2 | D12-05：聚焦项目、选中行仍是页面状态（D7-16），不进页面参数。D12 覆盖表：`focusProjectIds[]` 是“当前聚焦项目的页面状态”；规则 scope 投影为 `lab→all、focused_project→focus、project→project`。 | (D) `DEC/D12-lab-wire.md:37`；`DEC/D12-coverage.md:156,291` |
| F1-3 | 成员档案只有一个 `mainProject`；覆盖表 G37 记“mainProject 不等于完整关注关系”，项目关注关系列为缺口。 | (D) `DEC/D12-lab-wire.md:139-141`；`DEC/D12-coverage.md:538,599` |
| F1-4 | 运行归属：D18-05 下每个 Lab 有自己的 store，生命周期流按 Lab 实例订阅（G-8）；运行的项目在 `experiment_ext.project_id`，由 `run_started` 处理写入（D7-06）。根 session 不是 Lab 会话的运行“不是 Lab 实验”，不建 ext。 | (D) `DEC/D18-product-opus-contracts.md:11`；`DEC/D7-lab-backend.md:66`；`WT07/server/lab/experiments.ts:28-30` |
| F1-5 | D7-06：“Panel 取 scope，Automation 取规则名与范围”。LAB-06 已合入的实现：Automation 会话开出的运行，名称取规则名，项目在 scope 为 `project` 时取该项目，否则为 `null`。 | (D) `DEC/D7-lab-backend.md:66`；`WT07/server/lab/experiments.ts:66-71` |
| F1-6 | 定时触发没有触发运行，scope 不参与“是否触发”的判断；`schedule` 规则只在到点时生成一条运行（G-3、G-4）。原型 A-04 是 `focus` scope 的定时规则（G-11）。 | (D) `DEC/D7-lab-backend.md:70`；`DEC/D12-lab-wire.md:239-242`；(D) G-11 |

### 1.2 初审分类（送审意见）

- **1a `lab` 与 `project{p}` 的事件匹配：已由既有决策覆盖，只需澄清。** “作用范围是全 Lab / 单个项目”的直接含义是：`lab` 匹配该 Lab 实例 store 上、属于本 Lab 实验（有 `experiment_ext`）的全部运行；`project{p}` 只匹配 `experiment_ext.project_id = p` 的运行（F1-4）。ext 项目由 D7-06 写入，规则只读它，不新增字段。
- **1b Automation 运行的 ext 项目（`lab`/`project`）：已由 D7-06 覆盖，LAB-06 已按此实现**（F1-5），不需裁决。
- **1c `focused_project` 的服务端语义：公开契约缺口。** 公开 ADT 已有这个 variant，但服务端没有它对应的事实（F1-2、F1-3）；选择任一含义都在定义一个公开 variant 的语义，或删去它（改 ADT、改原型覆盖范围）。

### 1.3 闸门 A 的问题（交 `Argon`）

- **A1-1：** 1a 的读法是否就是 D7-10/D12-09“作用范围”的直接含义，不改变公开契约？
- **A1-2：** 1c 是否属于缺失设计（D10-08 ADT/语义）？原型 A-04（G-11）显示 `focus` 用于定时摘要，是否涉及用户意图？`(U)` 索引中没有相关原话（G-9）。

### 1.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B1-1：** 若 1a、1b 不越界，由 W-09 在本域实现是否不需要投票？
- **B1-2：** 1c 表决期间 W-09 对 `focused_project` 规则不触发（规则可建可读）、其余 scope 照常实现，是否符合“只暂停依赖部分”？

### 1.5 可选处置（1c）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | `focused_project` 在服务端取**规则创建者**的 `member_profile.main_project_id`：事件规则匹配该项目的运行，Automation 运行的 ext 项目也取它；创建者没有主项目时等同 `lab`。 | 补 D12-09 语义；复用既有字段 | G37 说主项目不等于完整关注关系（F1-3） |
| b | 删去 `focused_project`，原型 `focus` 列入 D9。 | 改 D12 ADT 与覆盖表 | 收窄原型覆盖 |
| c | 创建与更新时由客户端把页面聚焦项目解析为 `project{p}` 写入，服务端不存 `focused_project`。 | 改 D12-09 输入语义 | 页面状态进入持久化 |

---

## 二、事件游标、停机期间的触发与定时时区

### 2.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F2-1 | 工人的问题：D7-10 要求“记游标”，LAB-06 的 lifecycle 跟随只在内存记游标，重启后从 `0` 重放；自动化照此会对规则建立之前的历史事件触发（`automation_rule` 没有 `created_at`），重启后也会重复触发；持久化游标要新增表或列（D10-08 的持久化格式）；停机期间错过的事件与定时触发是否补发、cron 按哪个时区解释都没规定。 | (A) 评论 6561464709 第 2 项 |
| F2-2 | store 侧：cursor 按提交顺序递增，`after` 缺省 `"0"`，只读严格大于它的事件；cursor 与事件在同一事务持久化在 store；“事件与游标同一权威，时间戳不能替代提交游标”。 | (D) `DEC/D6-store-service.md:34`（D6-06、D11-47A）；`SOR/design/store.md:101` |
| F2-3 | Lab 侧：D7-10 只写“event 订阅 store lifecycle 并**记游标**”，没有写游标存在哪里。D7-02 的 Lab 表清单（含 D12-16 补列）没有游标表或列。 | (D) `DEC/D7-lab-backend.md:62,70`；`DEC/D12-lab-wire.md:48` |
| F2-4 | LAB-06 已合入的 `followLifecycle`：`let cursor = '0'`，内存推进，注释“A fresh runtime starts from "0" and replays idempotently”；它的副作用（写 ext、发通知）对重放幂等。 | (D) `WT07/server/lab/experiments.ts:144-156` |
| F2-5 | `automation_rule` 没有 `created_at` 列；`automation_run` 有 `created_at`、`ended_at`；`trigger` 存 `AutomationTriggerFact` JSON（含 `run`、`event`、`at`）。 | (D) `WT07/server/lab/schema.ts:234-279`；`DEC/D12-lab-wire.md:246-251` |
| F2-6 | 自动化的触发会写 `automation_run` 并开会话，不是幂等副作用：从 `"0"` 订阅时，每条历史事件都会对当前每条匹配的事件规则生成一条运行并开一个 Automation 会话。这在**首次启动**和**每次重启**都会发生，属于主路径上的行为。 | 推论 `[INFERENCE]`，依据 F2-2、F2-4、G-3 |
| F2-7 | 每个 Lab 有自己的 store（G-8），因此一条生命周期订阅对应一个 Lab 实例，游标按 Lab 实例各一份。 | (D) `DEC/D18-product-opus-contracts.md:11`；推论 `[INFERENCE]` |
| F2-8 | 时区：D12-02 规定线上的时刻是 ISO 8601 UTC 字符串；`schedule{cron}` 只是字符串，没有时区字段。croner 是 D7 选定的库（“schedule 用 croner”），不传时区时按进程所在时区解释。原型 A-04 的文案是“每周一 09:00”，`cron 0 9 * * 1`（G-11）。 | (D) `DEC/D12-lab-wire.md:34,241`；`DEC/D7-lab-backend.md:70`；croner 行为为库的公开文档 `[INFERENCE]`，本实例未运行验证 |
| F2-9 | 停机期间的事件：store 持久化全部事件（F2-2），若 Lab 从停机前的游标续读，停机期间的事件自然送达，不需要另设补发机制。停机期间错过的定时点属于恢复处理（G-7）。 | (D) F2-2；`SOR/.claude/rules/design-assumes-it-works.md`；推论 `[INFERENCE]` |

### 2.2 初审分类（送审意见）

- **2a 订阅起点与游标落库：公开契约缺口。** “记游标”已定，但“从哪里开始”决定了主路径上规则对哪些事件触发（F2-6），游标落库要在 D7-02 的 Lab 表清单中新增表或列（F2-3），属于 D10-08 的持久化与生命周期。
- **2b 停机期间的事件补发：由 2a 推出，不单独裁决。** 2a 一旦规定从落库游标续读，停机期间的事件按 store 持久化顺序送达（F2-9）。
- **2c 停机期间错过的定时点、重启与触发之间的竞态（例如写了运行但未推进游标）：主路径之外的失败、恢复与竞态处理，由工程师自定**（G-7）。
- **2d cron 的时区：公开契约缺口（语义）。** 公开字段的解释口径，用户可见；若定为“进程所在时区”，还隐含一个部署前提（容器时区）。另一种看法是它只是已选库 croner 的调用参数（G-6 “已选库调用由工程师决定”），请闸门判定。

### 2.3 闸门 A 的问题（交 `Argon`）

- **A2-1：** 2a 是否属于持久化与生命周期的公开契约缺口？“规则只对它生效之后的事件触发”是否触及意图（G-9：无 `(U)` 原话）？
- **A2-2：** 2d 是公开语义（需表决），还是已选库调用（工程师自定）？

### 2.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B2-1：** 2c 由 W-09 自定并在 PR 写明，是否不需要投票？
- **B2-2：** 2a 表决期间 W-09 不实现事件触发、不引入 croner（工人自述），而其余部分照常推进，是否符合“只暂停依赖部分”？2d 是否值得与 2a 一起入 P0，以免定时触发再等一轮？

### 2.5 可选处置

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| 2a-a | Lab 在 `lab.sqlite` 新增按 Lab 实例的生命周期游标（每个 Lab 一行，记最后处理的 cursor）；Lab 实例第一次订阅时从当时的流尾开始（不处理此前的历史事件），之后从落库游标续读；一条事件的处理与推进游标在同一事务。 | 补 D7-02 表清单与 D7-10 | 取“流尾”需要一个读法：store 当前只有 `after` 续读（F2-2），没有“当前最大 cursor”读取 |
| 2a-b | 不新增游标表：`automation_rule` 增 `created_at`，事件只对 `at` 晚于规则创建时刻的运行触发；重启后从 `"0"` 重放，用 `automation_run.trigger` 中的 `(rule, run, event)` 去重。 | 补 D12-16 列；违背 D6-06“时间戳不能替代提交游标” | 每次启动全量重放 |
| 2a-c | 维持内存游标、从 `"0"` 开始。 | 不改 | F2-6：每次启动对历史事件重复触发 |
| 2d-a | cron 按 Lab 容器进程的时区解释（croner 默认，不传时区参数）；部署可用 `TZ` 设置。 | 补 D12-09 语义；隐含部署前提 | 时区随部署而变 |
| 2d-b | cron 一律按 UTC 解释，与 D12-02 的 `Instant` 口径一致。 | 补 D12-09 语义 | 原型“每周一 09:00”在非 UTC 时区的实验室会偏移 |
| 2d-c | 规则增加时区字段。 | 改 D12-09 ADT | 新字段 |

---

## 三、Automation 会话的 owner

### 3.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F3-1 | 工人的问题：`conversation.owner` 必填，可取规则 creator、审批人、手动运行人；owner 决定之后谁能写这个会话（D12-10）；取 creator 时，creator 被移除成员资格后会话无人可写。 | (A) 评论 6561464709 第 3 项 |
| F3-2 | `ConversationRow.owner: MemberId` 必填；`LabSessions.open(origin, owner)` 需要 owner。实现中 `owner_id` 非空，注释“Historical membership identity survives Better Auth removing that membership”。 | (D) `DEC/D7-lab-backend.md:128-129,145-146`；`WT07/server/lab/schema.ts:40-41` |
| F3-3 | owner 决定的权限：会话写（prompt、`human.irc`）、`intervene.takeover/answer`、`intervene.derive`、`run.abort`、`experiment.update` 都要求操作者是该会话或该运行的会话 owner；`conclusion.confirm` 要求是结论所在会话的 owner。 | (D) `DEC/D12-lab-wire.md:42,505-516`；`DEC/D7-lab-backend.md:63,69` |
| F3-4 | owner 还决定 `approval: ownExperiments` 的口径：实验审批看草稿所属讨论的 owner（D11-29B）；自动化审批看“触发运行的 owner”。Automation 会话里开出的运行，其“运行的会话 owner”就是该会话的 owner。 | (D) `DEC/D7-lab-backend.md:66,70`；`DEC/D12-lab-wire.md:512-519` |
| F3-5 | 三种开会话的路径各有一个确定的成员：事件/定时且无审批 → 只有规则 `creator`；需审批 → 批准者（审批命令的操作者）；手动运行 → `manual.by`。 | (D) `DEC/D12-lab-wire.md:245-249`；`DEC/D7-lab-backend.md:70` |
| F3-6 | 成员被移除后其会话无人可写，是所有会话共有的情形（讨论 owner 同样如此），属于主路径之外的成员变更。 | (D) `WT07/server/lab/schema.ts:40`；`SOR/.claude/rules/design-assumes-it-works.md`；推论 `[INFERENCE]` |

### 3.2 初审分类（送审意见）

- **3a owner 取谁：公开契约缺口**（权限、状态权威，F3-3、F3-4）。
- **3b creator 被移除后无人可写：主路径之外的成员变更，不在本项设计**（F3-6），不单独裁决。

### 3.3 闸门 A 的问题（交 `Argon`）

- **A3-1：** 3a 是否属于 D10-08 的权限与状态权威缺口，需表决？
- **A3-2：** 若取“开会话那一刻起作用的成员”（处置 a），与 D26-01 审批投递以审批人为 principal 的口径是否一致？

### 3.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B3-1：** 3a 需表决时，表决期间 W-09 不开 Automation 会话、规则与运行记录照常实现，是否符合“只暂停依赖部分”？

### 3.5 可选处置

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | owner 取让会话开出来的那名成员：需审批时为批准者，手动运行为 `manual.by`，事件或定时且无审批时为规则 `creator`。 | 补 D7-10/D12-09 | 同一规则的会话 owner 因路径而异 |
| b | owner 一律取规则 `creator`。 | 补 D7-10/D12-09 | 批准者与手动运行人无法继续对话、交回槽位或确认会话内结论 |
| c | owner 一律取批准者；无审批时取 creator。 | 补 D7-10/D12-09 | 手动运行人无权写自己发起的会话 |

---

## 四、首条 prompt 的投递通道与 principal

### 4.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F4-1 | 工人的问题：现有投递只经 `human_irc_queue`（principal 外键指向 `user.id`，投递正文为 `human:<principal>`），事件和定时触发没有人；D7 接口草图是 `LabSessions.prompt(c, text)` 直接发；请裁定直接发（不带 human principal）还是经队列（principal 取谁），审批路径是否比照 D26-01 以审批人为 principal。 | (A) 评论 6561464709 第 4 项 |
| F4-2 | D7-04 启动配方 ⑥：“用户消息先进 Lab 的人类 IRC 待投递表（D7-09），会话空闲或到达步边界时以 `prompt` 投递”。D7-09：投递正文带 `human:<principal>` 来源，投递后成为 transcript 里不可变的事实。D7-03：人类消息 principal 取 `session.user.id`。 | (D) `DEC/D7-lab-backend.md:63,64,69` |
| F4-3 | D7 接口草图：`LabSessions.prompt(c: ConversationId, text: string)`，注释“已停驻时先开新的一代”；D12-10：`discussion.create` 写行返 id，首 prompt 才起根；`discussion/panel.prompt` 入 `human_irc_queue` 即返回。 | (D) `DEC/D7-lab-backend.md:145-148`；`DEC/D12-lab-wire.md:42` |
| F4-4 | D26-01：`experiment.approve` 以审批人的 `session.user.id` 为 principal，按既定 `human_irc_queue` 入队语义投递当前草稿。 | (D) `DEC/D7-lab-backend.md:66`；`DEC/D12-lab-wire.md:526` |
| F4-5 | D7-10/D12-09：`waiting.action` 是“用步骤与触发事实填好的 prompt 文本”；规则步骤与触发事实一起写进 Automation 会话的 prompt。 | (D) `DEC/D7-lab-backend.md:70`；`DEC/D12-lab-wire.md:41` |
| F4-6 | 实现：`human_irc_queue.principal` 外键指向 `user.id`；投递为 `human:${principal}\n\n${body}`。会话只在队列有消息时开一代，“A generation opens when a queued human message needs delivery”。 | (D) `WT07/server/lab/schema.ts:171-177`；`WT07/server/lab/sessions.ts:1-5,320-323` |

### 4.2 初审分类（送审意见）

- **4a 通道与 principal：公开契约缺口。** 投递正文的 `human:<principal>` 写进 transcript、成为不可变事实（F4-2），是 omp 看到的消息来源，也是 GUI 呈现的发言人；选通道就是选这条消息在 transcript 中的来源身份。它与第三项的 owner 互相牵连，建议同表相邻两行表决。
- **4b 审批路径：** 若 4a 取“经队列、principal 为开会话的成员”，审批路径即比照 D26-01（F4-4），不另立一行。

### 4.3 闸门 A 的问题（交 `Argon`）

- **A4-1：** 4a 是否属于公开契约缺口（transcript 来源身份、principal 语义）？
- **A4-2：** 以规则 creator 的身份投递事件/定时触发的 prompt（处置 a），是否把“机器触发”冒充成“creator 发言”，触及意图？还是因为 prompt 正文就是 creator 写的规则步骤，归给 creator 恰当？

### 4.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B4-1：** 4a 与第三项是否合入同一张议案？

### 4.5 可选处置

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 经 `human_irc_queue` 按既定入队语义投递 `action`（无审批时为同样填好的 prompt），principal 取第三项定下的会话 owner 对应的 `user.id`；审批路径即审批人（比照 D26-01）。 | 补 D7-10 | 事件/定时触发以 creator 名义出现在 transcript |
| b | Lab 不经队列，直接以 RPC `prompt` 投递，正文不带 `human:` 来源（D7 草图 `prompt(c, text)`）；审批路径同样直接投递。 | 补 D7-04/D7-10：新增一种非人类投递 | 与 D26-01 审批口径不一致；需要不依赖队列的开代路径 |
| c | 审批与手动经队列（principal 为操作者），事件/定时直接投递。 | 补 D7-10 | 两种通道并存 |

---

## 五、running → ok/failed 的转换与 `endedAt` 的来源

### 5.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F5-1 | 工人的问题：契约没有给出成败的判定来源，会话一轮结束、某个 host tool 报告、进程退出都可能是。 | (A) 评论 6561464709 第 5 项 |
| F5-2 | 状态与时刻：`running → ok \| failed` 的来源没有任何条文；已定的转换只有 `waiting → running`（批准）与 `waiting → skipped`（dismiss）；`endedAt` 是“结束时刻”。 | (D) `DEC/D7-lab-backend.md:70,140-142`；`DEC/D12-lab-wire.md:41,250-252` |
| F5-3 | Lab 可观察的会话事实：RPC 流的 `prompt_result`（带 `sessionSettled`）、`session_settled`、`turn_end`、`message_end`；Lab 在会话 settle 且无排队消息时停驻该代（D7-04 “一轮结束后关闭 stdin”）。 | (D) `DEC/D7-lab-backend.md:64`；`WT07/server/lab/sessions.ts:1-5,255-266,335-344` |
| F5-4 | Lab host tools 中没有报告自动化结果的工具（D7-05 的封闭列表）。 | (D) `DEC/D7-lab-backend.md:65,154-161` |
| F5-5 | conditions 由 Main 判断（G-3）；原型中条件不满足的运行显示为“已跳过”（G-11），而 D7-10 只让 dismiss 产生 `skipped`。 | (D) `DEC/D7-lab-backend.md:70`；G-11 |
| F5-6 | `failed` 的产生（模型错误、会话异常退出、工具失败）属于失败分支（G-7）。 | (D) `SOR/.claude/rules/design-assumes-it-works.md`；推论 `[INFERENCE]` |

### 5.2 初审分类（送审意见）

- **5a `running → ok` 的来源与 `endedAt`：公开契约缺口**（状态权威与生命周期，D10-08）。公开 ADT 已有 `ok`，但它的结束锚点与确认者没有定义。
- **5b `running → failed` 的具体判定：主路径之外的失败处理，由工程师自定**（F5-6），前提是 5a 已定下 `ok` 的锚点。
- **5c 条件不满足时的状态：** 随 5a 一起说明，不另立行（主案下条件不满足的运行同样以 `ok` 结束，`skipped` 仍只由 dismiss 产生）。

### 5.3 闸门 A 的问题（交 `Argon`）

- **A5-1：** 5a 是否属于状态权威与生命周期的公开契约缺口？
- **A5-2：** 5c 中原型“已跳过：R-015 没有绑定讨论”（G-11）是否要求条件不满足时进入 `skipped`，从而改 D7-10“dismiss 将 waiting 变 skipped”的单一来源？

### 5.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B5-1：** 5b 由 W-09 自定并在 PR 写明，是否不需要投票？

### 5.5 可选处置（5a）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 首条 prompt 投递后，该 Automation 会话第一次 settle（Lab 已观察的 `session_settled`/`prompt_result.sessionSettled`）时，运行在同一次受理中由 `running` 变为 `ok`，`endedAt` 取该时刻，发 `automation`；此后对该会话的续写不再改变运行。`failed` 的判定由工程师按失败分支处理。 | 补 D7-10 | 条件不满足也是 `ok`（5c） |
| b | 新增 host tool（例如报告 `ok \| failed \| skipped`），由 Main 在结束前调用。 | 改 D7-05 封闭列表 | 新增工具；Main 未调用时不结束 |
| c | 以该代进程退出为结束。 | 补 D7-10 | 进程退出也发生在停驻时，不区分成败 |

---

## 六、`automation.rule.delete` 遇到已有运行或会话时

### 6.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F6-1 | 工人的问题：`automation_run.rule_id` 和 Automation 会话的外键都指向规则；拒绝删除意味着跑过的规则永远删不掉；级联删除会删掉会话；软删除需要加列。 | (A) 评论 6561464709 第 6 项 |
| F6-2 | 公开契约：命令 `automation.rule.delete{id}`，结果 `Done`，权限 `write`；没有删除语义。 | (D) `DEC/D12-lab-wire.md:433,485,518` |
| F6-3 | 外键：`automation_run.rule_id → automation_rule.id`；`conversation.(automation_rule_id, lab_id) → automation_rule`，`(automation_run_id, automation_rule_id) → automation_run`。公开类型中 `AutomationRunWire.rule` 与 `ConversationOrigin.Automation.rule` 均为必填。 | (D) `WT07/server/lab/schema.ts:48-61,265-276`；`DEC/D12-lab-wire.md:148,250` |
| F6-4 | 会话删除会删除其 worktree（D7-04）；Automation 会话可能开出过运行，ext 与 store 运行的根 session 指向它（D7-06）。 | (D) `DEC/D7-lab-backend.md:64,66` |
| F6-5 | 已有先例：D26 对草稿与启动意图的删除，用“已投递则返回既有 `revision_conflict`、不新增状态字段或失败码”。 | (D) `DEC/D12-lab-wire.md:522-536` |
| F6-6 | 规则有 `enabled`，停用规则不必删除（G-4）。原型规则对话框中没有删除入口（G-11）。 | (D) `DEC/D12-lab-wire.md:243`；G-11 |

### 6.2 初审分类（送审意见）

- **6a 删除语义：公开契约缺口**（持久化、状态权威与生命周期）。三种做法都改变会话、运行记录或表结构的生命周期（F6-1、F6-3、F6-4）。
- **6b 删除与触发同时发生：竞态，由工程师自定**（G-7）。

### 6.3 闸门 A 的问题（交 `Argon`）

- **A6-1：** 6a 是否属于公开契约缺口？处置 a 比照 D26 的口径，是否与 D26 一致？

### 6.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B6-1：** 表决期间 W-09 只实现“无运行的规则可删”还是整条 delete 暂停，哪一种符合“只暂停依赖部分”？

### 6.5 可选处置

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 规则没有任何运行时删除该行，返回 `Done`、发 `automation`；已有运行时返回既有领域失败 `revision_conflict`，规则不变，不新增字段或失败码；跑过的规则用 `enabled:false` 停用。 | 补 D12-10 | 跑过的规则永远留在列表中 |
| b | 级联：删除规则、它的全部运行与 Automation 会话（含 worktree）。 | 补 D12-10 | 删掉会话 transcript 引用、会话内结论，以及由它开出的实验的会话归属 |
| c | 软删除：规则加删除时刻列，读取时隐藏，运行与会话保留。 | 改 D7-02/D12-16 表结构 | 新增列 |

---

## 七、结论“写回关联讨论”的落点

### 7.1 事实

| # | 事实 | 来源 |
|---|---|---|
| F7-1 | 工人的问题：`lab_draft_conclusion` 不带目标会话，结论只会写在 Automation 会话本身；事件触发时是否以触发运行的根讨论作为关联讨论；定时触发没有关联讨论又该怎样处理。 | (A) 评论 6561464709 第 7 项 |
| F7-2 | D7-10：“结论或报告写回关联讨论”；F30 S2：“结论写回关联讨论”；**F31 ⑥：“A-01 的复盘写回原讨论”**；主路径时序：`lab_draft_conclusion` → `结论写回关联讨论`。 | (D) `DEC/D7-lab-backend.md:70,211-212`；`DEC/D8-mvp-scope.md:149,150` |
| F7-3 | “原讨论”的定义：讨论的 `originated` 运行是“这个讨论的会话里开出的运行（store 运行记录的根 session 等于本会话）”；生命周期事件带 `holder`（根 session）。 | (D) `DEC/D7-lab-backend.md:67`；`DEC/D6-store-service.md:34`；`SOR/design/store.md:101` |
| F7-4 | `lab_draft_conclusion{text, evidence, pendingRun?}` “建待确认结论”；实现以调用会话为 `conclusion.conversation_id`。`conclusion.confirm` 由结论所在会话的 owner 执行；讨论头的 `conclusions` 列出该讨论会话的结论。 | (D) `DEC/D7-lab-backend.md:65,157`；`WT07/server/lab/tools.ts:130-141`；`DEC/D12-lab-wire.md:507` |
| F7-5 | 报告由 `lab_publish_report` 写，带 `project`，归首页与报告列表，不挂讨论（G-3 “结论或报告”）。 | (D) `DEC/D7-lab-backend.md:65`；`DEC/D12-lab-wire.md:48` |
| F7-6 | 定时与手动触发没有触发运行（G-4 的 `schedule{at}`、`manual{by,at}`），因此没有“原讨论”。 | (D) `DEC/D12-lab-wire.md:246-249` |

### 7.2 初审分类（送审意见）

- **7a 事件触发时的关联讨论：已由既有决策覆盖，只需澄清。** F31 ⑥ 写明“写回原讨论”，原讨论就是触发运行的根 session 所在的 Discussion 会话（F7-3），由事件的 `holder` 唯一确定。
- **7b 结论行落在哪个会话：** 有两种读法，请闸门判定：
  - 读法一（澄清）：“写回关联讨论”的直接含义就是结论记在该讨论下（出现在讨论头的 `conclusions`、由讨论 owner 确认），由 Lab 在 Automation 会话调用 `lab_draft_conclusion` 时按 origin 找到原讨论写入，工具输入不变，是 F7-2 的直接实现；
  - 读法二（缺口）：`lab_draft_conclusion` 的语义是“在调用会话建结论”（F7-4），按 origin 改写落点改变了 host tool 的公开语义与 `conclusion.confirm` 的确认者。
- **7c 定时/手动触发、或触发运行的根会话不是 Discussion 时：** 没有原讨论（F7-6），结论留在 Automation 会话本身（工具的现有语义），报告照常发布（F7-5）。请闸门判定这是直接含义，还是需要表决的缺口。

### 7.3 闸门 A 的问题（交 `Argon`）

- **A7-1：** 7a 是否由 F31 ⑥ 直接回答？原型写的是“绑定的讨论”（G-11），而 D7-07 的 `bound` 是人工绑定的运行，与 `originated` 不同；“原讨论”取 `originated` 是否符合意图？
- **A7-2：** 7b 取读法一还是读法二？
- **A7-3：** 7c 是否为直接含义？

### 7.4 闸门 B 的问题（交 `ArgonGovernance`）

- **B7-1：** 7a、7b（读法一）、7c 若不越界，由 W-09 在 `server/lab/**` 内实现是否不需要投票？

### 7.5 可选处置（7b、7c 若需表决）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| a | 事件触发的 Automation 会话调用 `lab_draft_conclusion` 时，Lab 把结论记在触发运行的原讨论会话下（发该讨论的 `conversation` 与 `catalog`），由讨论 owner 确认；没有原讨论时记在 Automation 会话本身。工具输入不变。 | 补 D7-05/D7-10 落点 | 结论的会话与调用会话不同 |
| b | `lab_draft_conclusion` 增加可选目标讨论参数，由 Main 指定原讨论或绑定的讨论。 | 改 D7-05/D12-16 工具输入 | 新增参数；Main 需知道讨论 id |
| c | 结论一律留在 Automation 会话，讨论页通过运行关系展示。 | 改 D7-10、F31 ⑥ 的验收语义 | 与“写回原讨论”不符 |

---

## 八、闸门判定后的程序

- 七项（及子项）分别判定。A 与 B 都确认不越界的，按机械补全放行，结论写回 #19，由 Pepgent 片区经理送达 W-09。
- 任一闸门认定越界的，合为一张 P0 议案（每行一个主案，备选写进取舍栏，`notify` 含 `AreaMgrPepgent`），由本实例用 `council propose --seat Coordination` 立案；排队、收票、计票与归档由议会 daemon 完成（`SOR/AGENTS.md:24-27`）。
- 闸门结论写入 `GATE/pepgent-19-gate-a.md`（Argon）、`GATE/pepgent-19-gate-b.md`（ArgonGovernance）。
