# 闸门 A 裁决：Pepgent#19（LAB-09）七项自动化契约裁决请求

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)（评论 `6561464709`），`PM/evidence/gates/pepgent-19.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（全流程从设计到实现与 e2e 走通，不擅自删减原型与设计范围）、`U96`（公开契约缺失设计事前表决）；`(U) bf96d256`（转引自 `DEC/D18-product-opus-contracts.md:11` D18-05：每个 Lab 一套独立的 soroi 实例，多租户概念不侵入 soroi）。`LEDGER.md` 中无专门针对自动化/cron 的其他用户原话（`G-9`）。
  - `(D)` `DEC/D6-store-service.md:34`（D6-06、D11-47A）、`DEC/D7-lab-backend.md:62-70,128-161,206-214`、`DEC/D8-mvp-scope.md:149-150,330`（F30 S2、F31 ⑥、LAB-09）、`DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D12-lab-wire.md:34,37,41-42,48,148,234-253,431-436,483-488,505-536`（含 D26）、`SOR/.claude/rules/design-assumes-it-works.md`。

---

## 一、总表：按子项的闸门 A 判定汇总

| 子项 | 主题 | 闸门 A 判定 | 结论与推荐处置 |
|---|---|---|---|
| **1a** | `lab` 与 `project{p}` 的事件匹配（及 1b ext 项目） | **不越界（仅需澄清，免票放行）** | `D7-10`/`D12-09`/`D18-05` 的直接含义：`lab` 匹配本 Lab 实例 store 上有 `experiment_ext` 的全部 Lab 实验运行，`project{p}` 匹配 `experiment_ext.project_id = p` 的运行（1b 已由 `D7-06` 覆盖并在 `LAB-06` 实现）。 |
| **1c** | `focused_project` 的服务端语义 | **越界（公开契约缺失设计，须 P0 投票）** | 公开 ADT `AutomationScope` 含 `{ kind: 'focused_project' }`（对应原型 A-04 `focus`），服务端缺对应事实定义。**支持处置 `a`**（取规则 `creator` 的 `member_profile.main_project_id`，无主项目时等同 `lab`）；**反对处置 `b`**（删变体、把原型 `focus` 移入 D9 属收缩范围，违背 `U2`/`U23`）与 **处置 `c`**。 |
| **2a** | 生命周期订阅起点与游标落库（含 2b 停机事件续读） | **越界（公开契约缺失设计，须 P0 投票）** | 在 `lab.sqlite` 新增游标持久化及规定首次订阅起点属于 `D10-08` 的持久化与生命周期契约。**支持处置 `2a-a` 方向**（在 `lab.sqlite` 按 Lab 实例持久化最后处理的 `cursor`，事件处理与推进游标同事务；2b 停机事件由游标续读自然覆盖）；**反对 `2a-b`**（用时间戳替代提交游标违反 `D6-06`/`D11-47A`）与 **`2a-c`**（每次重启从 `"0"` 重放重复触发非幂等开会话）。 |
| **2c** | 停机期间错过的定时点、重启与触发间竞态 | **不越界（主路径外恢复与竞态，免票放行）** | 按 `SOR/.claude/rules/design-assumes-it-works.md`（`G-7`），设计阶段只写主路径，停机错过的定时点与中途失败竞态由工程师自定并在 PR 写明。 |
| **2d** | `schedule{cron}` 的时区解释口径 | **建议随 P0 一并表决（补 `D12-09` 口径，不改 ADT）** | 不触及 `(U)` 原话冲突，但 **反对 `2d-c`**（改 `D12-09` ADT 新增时区字段）。因 2a 已须开 P0，建议将 `2d`（在 `2d-a` 容器进程时区与 `2d-b` UTC 之间择一明确）并入同一张 P0 议案，避免定时触发二次等待。 |
| **3a** | Automation 会话的 `conversation.owner`（含 3b 成员移除） | **越界（公开契约缺失设计，须 P0 投票）** | `conversation.owner` 决定后续对话、介入、中止与确认结论权限（`D12-10`），属 `D10-08` 权限与状态权威缺口。**支持处置 `a`**（取让会话开出的成员：需审批取批准者、手动运行取 `manual.by`、事件/定时无审批取规则 `creator`，与 `D26-01` 完全同构）。`3b` 成员移除属主路径外，免票不另裁决。 |
| **4a** | 首条 prompt 的投递通道与 `principal`（含 4b 审批路径） | **越界（公开契约缺失设计，须 P0 投票）** | 决定 transcript 中不可变的 `human:<principal>` 来源身份与开代路径。**支持处置 `a`**（统一经 `human_irc_queue` 投递填好步骤与触发事实的 `action` prompt，`principal` 取 3a 定下的会话 `owner` 对应的 `user.id`；4b 审批路径即批准人，与 `D26-01` 一致）。 |
| **5a** | `running → ok` 的结束锚点与 `endedAt` 来源 | **越界（公开契约缺失设计，须 P0 投票）** | `AutomationRunWire.state` 的 `running → ok` 缺少结束锚点与确认者定义，属 `D10-08` 状态权威与生命周期缺口。**支持处置 `a`**（首条 prompt 投递后该 Automation 会话第一次 settle 时同一次受理将运行改为 `ok`、写 `endedAt`、发 `automation`；不改 `D7-05` 封闭工具表）。 |
| **5b** | `running → failed` 的具体判定 | **不越界（主路径外失败分支，免票放行）** | 在 5a 定下 `ok` 结束锚点后，模型报错或异常退出进入 `failed` 属主路径之外的失败分支处理（`G-7`），由工程师自定并在 PR 写明。 |
| **5c** | 条件不满足时的运行状态 | **不越界（随 5a 处置 `a` 涵盖，不另立行）** | `D7-10` 已明文规定“conditions 由 Main 判断……dismiss 将 waiting 变 skipped”，不因原型静态文案而改动 `skipped` 的唯一产生源或新增 host tool；条件不满足时 Main 正常完成首轮回复并按 5a 进入 `ok`。 |
| **6a** | `automation.rule.delete` 遇到已有运行或会话时（含 6b 竞态） | **越界（公开契约缺失设计，须 P0 投票）** | 决定规则、历史运行与 Automation 会话（含 worktree）的生命周期，属 `D10-08` 缺口。**支持处置 `a`**（无运行时硬删返回 `Done`；已有运行时返回既有 `revision_conflict`，不删历史会话/运行、不加软删除列，跑过的规则用 `enabled: false` 停用，与 `D26-04..06` 完全一致）。`6b` 属竞态，免票由工程师自定。 |
| **7a / 7b / 7c** | 结论“写回关联讨论”的关联讨论定义、落点会话与无原讨论时的回退 | **不越界（既有 `D7-10` 与 `D8 F31 ⑥` 的直接含义，可免票澄清放行；若闸门 B 要求入表则支持处置 `a`）** | `D8` F31 ⑥（“A-01 的复盘写回原讨论”）、`D7-07`（`originated` 定义）与 `D7` 主路径时序图（`DEC/D7-lab-backend.md:207-213`：`host_tool_call lab_draft_conclusion → 结论写回关联讨论 → /api/lab/events {conversation, automation}`）已唯一确定：事件触发且触发运行的根 session 是 `Discussion` 会话时（`7a`），Lab 将 `lab_draft_conclusion` 生成的结论记在该原讨论会话下（`7b` 读法一 / 处置 `a`）；定时/手动触发或触发运行根会话不是 `Discussion`（无原讨论，`7c`）时，结论记在调用方 Automation 会话自身，工具输入签名不变。 |

---

## 二、对闸门 A 问题（`A1-1` 至 `A7-3`）的逐项回答

### 1. 第一项：scope 的服务端语义（`A1-1`、`A1-2`）

- **A1-1（`1a`）：是直接含义，不改变公开契约，免票放行。**
  - 按 `D18-05`（`(U) bf96d256`），每个 Lab 部署独立的 store 实例，生命周期流天然属于该 Lab 实例；按 `D7-06`（`DEC/D7-lab-backend.md:66`），属于本 Lab 实验的运行在 `run_started` 时写入 `experiment_ext`（含 `project_id`）。因此 `scope = lab` 匹配本 Lab 有 `experiment_ext` 的全部运行、`scope = project{p}` 匹配 `experiment_ext.project_id = p` 的运行，是 `D7-10`/`D12-09` 的唯一直接读法。
- **A1-2（`1c`）：属于 `D10-08` 缺失设计，必须 P0 投票；保留 `focused_project` 涉及用户全量交付意图（`U2`、`U23`）。**
  - 原型规则 A-04（`G-11`）使用了 `scope: focus`，`D12-09` 为此专门定义了公开变体 `{ kind: 'focused_project' }`。虽然 `LEDGER.md` 无单独谈论 `focused_project` 的 `(U)` 原话，但按 `(U) U2`、`U23` 不能通过删去公开 ADT 变体并将其打入 D9（处置 `b`）来规避实现。
  - **支持处置 `a`：** 在服务端将 `focused_project` 解释为规则 `creator` 的 `member_profile.main_project_id`（事件规则匹配该项目的运行，Automation 会话开出的运行其 `experiment_ext.project_id` 也取它；创建者无主项目时等同 `lab`），既复用既有持久化字段，又完整保留 `D12-09` ADT 与原型 A-04。

### 2. 第二项：事件游标、停机期间的触发与定时时区（`A2-1`、`A2-2`）

- **A2-1（`2a`）：属于持久化与生命周期的公开契约缺口，必须 P0 投票。**
  - 在 `lab.sqlite` 新增游标持久化表或列（补 `D7-02`/`D12-16`），以及规定首次订阅起点避免每次启动对历史事件重复开出 Automation 会话，属于 `D10-08` 明文规定的持久化格式与生命周期契约。
  - **支持 `2a-a` 方向：** 在 `lab.sqlite` 按 Lab 实例持久化生命周期游标，事件触发处理与推进游标在同一 SQLite 事务内完成。注：关于 `2a-a` 的首次订阅起点，因为规则只能在线经 `automation.rule.create` 创建（或空库启动时 store 尚无历史运行），只要 `labRuntime` 启动时若尚无游标记录则对流中事件边消费边推进落库游标（无匹配规则时仅推进游标），或仅对游标建立后的新事件触发，都不需要改动 `store` 契约去新增端点。**严禁采用 `2a-b`**（用时间戳与去重代替提交游标，直接违反 `D6-06`/`D11-47A`“事件与游标同一权威，时间戳不能替代提交游标”）与 **`2a-c`**。
- **A2-2（`2d`）：建议不改 ADT，随本次 P0 一并表决写清时区口径。**
  - **反对 `2d-c`**（向 `D12-09` 新增时区字段）。在 `2d-a`（按 Lab 容器进程时区解释，croner 默认行为）与 `2d-b`（一律按 UTC 解释，对齐 `D12-02`）之间择一写进 P0 议案即可，本席对 `2d-a` 或 `2d-b` 均不否决。

### 3. 第三项：Automation 会话的 owner（`A3-1`、`A3-2`）

- **A3-1（`3a`）：属于 `D10-08` 的权限与状态权威缺口，必须 P0 投票。**
- **A3-2：处置 `a` 与 `D26-01` 口径完全一致，支持处置 `a`。**
  - 需审批时由批准者使会话得以创建，手动运行时由 `manual.by` 发起，事件/定时无审批时由规则 `creator` 预设授权；将 `conversation.owner` 设为该起作用成员（处置 `a`），保证了批准者或手动运行人有权对所开的 Automation 会话继续发消息、介入槽位和确认结论，与 `D26-01` 以批准人为审批投递主体一脉相承。

### 4. 第四项：首条 prompt 的投递通道与 principal（`A4-1`、`A4-2`）

- **A4-1（`4a`）：属于公开契约缺口（transcript 不可变来源身份与会话开代路径），必须与 3a 一并 P0 投票。**
- **A4-2：处置 `a` 不构成冒充发言、不违背用户意图，支持处置 `a`。**
  - 规则的 `when/conditions/then` 本就是规则 `creator` 编写的自动化指令，且 `action` 文本内已显式包含触发事实（`AutomationTriggerFact`），会话 `origin` 也已明确标记为 `Automation{rule, automationRun}`。统一经 `human_irc_queue` 以第 3 项确定的会话 `owner` 对应的 `user.id` 投递（处置 `a`），既遵守了 `D7-04` 启动配方 ⑥ 的唯一开代投递机制，又在审批路径上与 `D26-01` 保持完全一致；反之，处置 `b`/`c` 另造绕过队列的无 principal 投递通道属于多余机制。

### 5. 第五项：`running → ok/failed` 的转换与 `endedAt` 的来源（`A5-1`、`A5-2`）

- **A5-1（`5a`）：属于状态权威与生命周期的公开契约缺口，必须 P0 投票；支持处置 `a`。**
  - 首条 prompt 投递后，该 Automation 会话第一次 settle（`session_settled` / `prompt_result.sessionSettled`）即代表本次自动化首轮执行完毕，在同一次受理中将 `automation_run.state` 由 `running` 置为 `ok`、写入 `endedAt` 并发布 `automation` 通知（处置 `a`），结束锚点清晰且无需改动 `D7-05` 封闭工具列表（反对处置 `b` 新增 host tool）。
- **A5-2（`5c`）：不要求条件不满足时进入 `skipped`，维持 `D7-10` 原文。**
  - `D7-10` 已表决确定“conditions 由 Main 判断……dismiss 将 waiting 变 skipped”。原型 fixture 的一条静态展示字符串不能推翻 `D7-10` 去新增工具或条件解析器；Main 判断条件不满足时说明原因并结束首轮，按 5a 处置 `a` 进入 `ok`，`skipped` 仍只由 `automation.dismiss` 产生。

### 6. 第六项：`automation.rule.delete` 遇到已有运行或会话时（`A6-1`）

- **A6-1（`6a`）：属于公开契约缺口，必须 P0 投票；处置 `a` 与 `D26` 完全一致，支持处置 `a`。**
  - 规则尚无任何 `automation_run` 时删除该行并返回 `Done`、发 `automation`；已有 `automation_run` 时返回既有领域失败 `revision_conflict`（不删历史运行与 Automation 会话/worktree，不新增软删除列或失败码，跑过的规则通过 `enabled: false` 停用），与 `D26-04..06` 对已投递/已绑定运行草稿拒绝删除的生命周期原则完全一致。

### 7. 第七项：结论“写回关联讨论”的落点（`A7-1`、`A7-2`、`A7-3`）

- **A7-1（`7a`）：由 `D8` F31 ⑥ 与 `D7-07` 直接回答，符合意图。**
  - `D8` F31 ⑥ 明文规定“A-01 的复盘**写回原讨论**”，`D7-07` 定义讨论的 `originated` 运行即为“store 运行记录的根 session 等于本会话”的运行。原型 A-01 文案中的“绑定的讨论”在正式架构决策 `D8` F31 ⑥ 中已落定为发起该运行的“原讨论”（由事件携带的根 session `holder` 唯一确定）。
- **A7-2（`7b`）：取读法一（即处置 `a`），属于 `D7-10` 与 `D8` F31 ⑥ 的直接含义。**
  - `D7` 主路径时序图（`DEC/D7-lab-backend.md:211-213`）已明确画出：`O->>LAB: host_tool_call lab_draft_conclusion` → `LAB->>DB: 结论写回关联讨论` → `LAB-->>UI: /api/lab/events {conversation, automation}`，且 `D12` 中只有 `Discussion` 会话头/页面展示 `conclusions`。因此，事件触发的 Automation 会话调用 `lab_draft_conclusion` 时，Lab 按 `ConversationOrigin.Automation` 找到触发运行的原讨论（当根会话为 `Discussion` 时），把 `conclusion.conversation_id` 记在该原讨论下（由原讨论 owner 确认，并发该讨论的 `conversation` 与 `catalog` 通知），正是 `D7-10` 主路径时序图的直接要求，工具输入签名不变。
- **A7-3（`7c`）：是直接含义。**
  - 定时触发、手动触发或触发运行的根会话不是 `Discussion` 时，不存在“原讨论”，`lab_draft_conclusion` 保持默认行为记在调用方 Automation 会话自身，`lab_publish_report` 照常按项目发布报告。
  - **闸门 A 对第 7 项的汇总意见：** `7a`、`7b`（读法一 / 处置 `a`）、`7c` 在闸门 A 看来均不越界，可免票作为澄清直接放行；若闸门 B 认为 `7b`/`7c` 需随本次 P0 议案一并写入 `D7-05`/`D7-10` 条文，本席同样支持以处置 `a` 入表。
