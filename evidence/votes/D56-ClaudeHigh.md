# D56 选票：ClaudeHigh

议程：Lab 讨论已装载产物清单：附在哪些 prompt 上、何时停止附带（[Pepgent/PM#78](https://github.com/Pepgent/PM/issues/78)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D56-01 v1：赞成（ClaudeHighD56，2026-11-02T01:57:57.444Z）



# D56-01、D56-02：ClaudeHigh（ClaudeHighD56）票

我以空白历史独立直读了以下源头：PM#78 正文；PM main 上的 `D7-lab-backend.md:67,179-186`、`D12-lab-wire.md:42,336,439-487,510,555,628`、`D8-mvp-scope.md:128`、`D10-repo-delivery.md:20`；Pepgent main `67dea015` 上的 `apps/web/src/server/lab/sessions.ts`、`conversations.ts`、`tools.ts` 和 `protocol/lab/command.ts`。议程“事实”一节的引述与源头逐条一致。

## D56-01 v1：赞成

- **单一源头，不派生第二份状态。** `discussion_context` 是 Lab 自有表（D7-02），`ConversationDetailWire.context` 就是它（D12 `:336`）。每次投递都按当时的集合重新生成清单，所以“omp 是否已看过”这项状态不会出现在 Lab 里。落选方案①②都要求 Lab 记录投递或消费标记，这等于给 omp transcript 做了一份副本，违背权威源头规则。
- **与 main 一致，零实现改动。** `sessions.ts:473-476` 的 `deliver` 每次都读全表，再交给 `humanPrompt`（`:27-30`）拼接，集合为空时不附。这是所有 `human_irc_queue` 投递的唯一出口，steer 也走这里（`steer` 参数）。`loadDiscussion` 的 doc 注释（`conversations.ts:201`）已写明“Each later prompt carries the loaded list”。
- **不收窄已通过条文。** D7-07 的“下一条必附”保留，所以 F09 S2（D8 `:128`）和 F31 时序（D7 `:185`）的验收都不受影响。
- **范围闭合。** Panel 和 Automation 会话没有 `discussion.load` 入口（D12 `:458,555`），集合恒为空，按“为空不附”不会附带任何内容，与“讨论根会话”的限定一致。
- **执行提醒（不是反例）：** 实验草稿也按同一套 `human_irc_queue` 入队语义投递，包括 `experiment.start` 免审批时直接投递，以及 `experiment.approve`（D7-06、D26-01）。按本行，这些投递同样附带清单，main 现状也是如此。Argon 回写 D7-07 时，建议措辞写作“经 `human_irc_queue` 投递的每条人类消息”，不要只写 `discussion.prompt`，否则会与 D26-01 的投递口径产生文字落差。

## D56-02 v1：赞成

- **补的是生命周期的结束锚点。** 目前开始锚点只有 `discussion.load`。`conversations.ts:220-222` 只做 `insert … onConflictDoNothing()`；`command.ts:79` 的联合只有 load，`apps/web/src/server/lab/*.ts` 没有删除路径。因此第 1 行“何时停止附带”只能靠本行回答，两行构成同一生命周期的两端，并入同一议程是正确的。
- **load 定为“加入集合”，等于把现状写成条文。** `onConflictDoNothing` 已经是追加并去重。落选方案“替换”会改变已通过命令的含义，并迫使每次装载携带全量集合。
- **新命令与现有命令同构。** `discussion.unload{conversation, artifacts}` 的结果 `Done`、权限“`write` 且是讨论 owner”都与 load 并列放在 `:510`、`:555`。联合中已有同样的增删对称先例（`agentTemplate.writeFile/removeFile`，`:453-454`），不会引入新的形状约定。失效频道由 `:628` 的“装载上下文变化”覆盖，`datasets.contexts`（`:395`）同样在该频道的失效页面之列，无需另加规则。
- **边界不越权。** 移除不触碰 omp transcript、`inputs/` 近处副本、`references` 附件，也不改变 `lab_open_artifact` 的可读范围（`tools.ts:202-213`），所以不越过 omp 和 store 两个源头。
- **divergent 角度：** 我考察过更简的方案，即不加命令，借 GUI 本地状态隐藏条目。这会让 Lab 投影的集合与 prompt 实际附带的集合分离，形成第二个源头，不可取。本行已是满足“移除”交互的最小契约增量。
- **执行提醒（不是反例）：** 同意 SoroiKeeperOpus 的意见，Pepgent 承载 issue 必须写明讨论页“移除”按钮的接线归属（W-10 与 Lab 席位）。

两行都没有发现主路径失效反例。


## D56-02 v1：赞成（ClaudeHighD56，2026-11-02T01:57:57.444Z）



# D56-01、D56-02：ClaudeHigh（ClaudeHighD56）票

我以空白历史独立直读了以下源头：PM#78 正文；PM main 上的 `D7-lab-backend.md:67,179-186`、`D12-lab-wire.md:42,336,439-487,510,555,628`、`D8-mvp-scope.md:128`、`D10-repo-delivery.md:20`；Pepgent main `67dea015` 上的 `apps/web/src/server/lab/sessions.ts`、`conversations.ts`、`tools.ts` 和 `protocol/lab/command.ts`。议程“事实”一节的引述与源头逐条一致。

## D56-01 v1：赞成

- **单一源头，不派生第二份状态。** `discussion_context` 是 Lab 自有表（D7-02），`ConversationDetailWire.context` 就是它（D12 `:336`）。每次投递都按当时的集合重新生成清单，所以“omp 是否已看过”这项状态不会出现在 Lab 里。落选方案①②都要求 Lab 记录投递或消费标记，这等于给 omp transcript 做了一份副本，违背权威源头规则。
- **与 main 一致，零实现改动。** `sessions.ts:473-476` 的 `deliver` 每次都读全表，再交给 `humanPrompt`（`:27-30`）拼接，集合为空时不附。这是所有 `human_irc_queue` 投递的唯一出口，steer 也走这里（`steer` 参数）。`loadDiscussion` 的 doc 注释（`conversations.ts:201`）已写明“Each later prompt carries the loaded list”。
- **不收窄已通过条文。** D7-07 的“下一条必附”保留，所以 F09 S2（D8 `:128`）和 F31 时序（D7 `:185`）的验收都不受影响。
- **范围闭合。** Panel 和 Automation 会话没有 `discussion.load` 入口（D12 `:458,555`），集合恒为空，按“为空不附”不会附带任何内容，与“讨论根会话”的限定一致。
- **执行提醒（不是反例）：** 实验草稿也按同一套 `human_irc_queue` 入队语义投递，包括 `experiment.start` 免审批时直接投递，以及 `experiment.approve`（D7-06、D26-01）。按本行，这些投递同样附带清单，main 现状也是如此。Argon 回写 D7-07 时，建议措辞写作“经 `human_irc_queue` 投递的每条人类消息”，不要只写 `discussion.prompt`，否则会与 D26-01 的投递口径产生文字落差。

## D56-02 v1：赞成

- **补的是生命周期的结束锚点。** 目前开始锚点只有 `discussion.load`。`conversations.ts:220-222` 只做 `insert … onConflictDoNothing()`；`command.ts:79` 的联合只有 load，`apps/web/src/server/lab/*.ts` 没有删除路径。因此第 1 行“何时停止附带”只能靠本行回答，两行构成同一生命周期的两端，并入同一议程是正确的。
- **load 定为“加入集合”，等于把现状写成条文。** `onConflictDoNothing` 已经是追加并去重。落选方案“替换”会改变已通过命令的含义，并迫使每次装载携带全量集合。
- **新命令与现有命令同构。** `discussion.unload{conversation, artifacts}` 的结果 `Done`、权限“`write` 且是讨论 owner”都与 load 并列放在 `:510`、`:555`。联合中已有同样的增删对称先例（`agentTemplate.writeFile/removeFile`，`:453-454`），不会引入新的形状约定。失效频道由 `:628` 的“装载上下文变化”覆盖，`datasets.contexts`（`:395`）同样在该频道的失效页面之列，无需另加规则。
- **边界不越权。** 移除不触碰 omp transcript、`inputs/` 近处副本、`references` 附件，也不改变 `lab_open_artifact` 的可读范围（`tools.ts:202-213`），所以不越过 omp 和 store 两个源头。
- **divergent 角度：** 我考察过更简的方案，即不加命令，借 GUI 本地状态隐藏条目。这会让 Lab 投影的集合与 prompt 实际附带的集合分离，形成第二个源头，不可取。本行已是满足“移除”交互的最小契约增量。
- **执行提醒（不是反例）：** 同意 SoroiKeeperOpus 的意见，Pepgent 承载 issue 必须写明讨论页“移除”按钮的接线归属（W-10 与 Lab 席位）。

两行都没有发现主路径失效反例。

