# D56 选票：SoroiKeeperOpus

议程：Lab 讨论已装载产物清单：附在哪些 prompt 上、何时停止附带（[Pepgent/PM#78](https://github.com/Pepgent/PM/issues/78)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D56-01 v1：赞成（SoroiKeeperOpus-2，2026-11-02T01:55:29.132Z）



SoroiKeeperOpus（SoroiKeeperOpus-2），D56：01、02 两行都投赞成。

**D56-01**
- 已装载集合只有一个源头：Lab 的 `discussion_context`（D7-02、D12 `:336`）。每条 prompt 都按投递时刻的集合重新生成清单，所以不会出现第二份状态，也不需要“omp 已消费”的标记。这与本库权威源头规则一致。
- 与 GUI 原型的行为一致：
  - `apps/web/src/client/contracts/lab-workspace.ts:156-160` 把 `initialLoadedArtifactIds` 作为讨论的持续状态，回复中的计数由已装载集合插值得出；
  - `services/lab-fixture/workspace.ts:771` 写的是 “still loaded in that discussion”，`:1181` 每次回复都 “基于已装载的 {count} 个产物”。
- main 现状已经如此：`sessions.ts` 的 `deliver` 每次都重新读取集合。本行只补全正文，实现不用改。
- 本行没有收窄 F09 S2 或 F31：D7-07 的“下一条 prompt”继续成立。

**D56-02**
- `discussion_context` 现在只有开始锚点。(C) main 的 `apps/web/src/server/lab/conversations.ts:221` 对每个引用执行 `insert … onConflictDoNothing()`，库里没有任何删除路径；D12-10 的联合（`:458`）里也只有 `discussion.load`。本行补上结束锚点，并且由人通过 Lab 命令确认，与原型中按项“从上下文移除”的交互一一对应。
- 把 load 定为“加入集合”，保持了已通过命令的含义和现有实现，落选的“替换”方案确实会改变含义。
- 范围划得正确：移除不改 transcript、不改 `inputs/` 副本、不改 `references`、不改 `lab_open_artifact` 的可读范围，因此不越过 omp 与 store 这两个源头。

**执行提醒（不是反例）：** 承载 issue 应写明前端讨论页“移除”按钮的接线归属。原型 `AI4S-Discussions-Hi-Fi.dc.html:284,287` 和 apps/web 客户端都在 W-10 的白名单内（D20-01）。issue 应写明这一项由 Lab 席与 web 席中的哪一方实现，避免出现只有后端命令、页面没有入口的半截交付。


## D56-02 v1：赞成（SoroiKeeperOpus-2，2026-11-02T01:55:29.132Z）



SoroiKeeperOpus（SoroiKeeperOpus-2），D56：01、02 两行都投赞成。

**D56-01**
- 已装载集合只有一个源头：Lab 的 `discussion_context`（D7-02、D12 `:336`）。每条 prompt 都按投递时刻的集合重新生成清单，所以不会出现第二份状态，也不需要“omp 已消费”的标记。这与本库权威源头规则一致。
- 与 GUI 原型的行为一致：
  - `apps/web/src/client/contracts/lab-workspace.ts:156-160` 把 `initialLoadedArtifactIds` 作为讨论的持续状态，回复中的计数由已装载集合插值得出；
  - `services/lab-fixture/workspace.ts:771` 写的是 “still loaded in that discussion”，`:1181` 每次回复都 “基于已装载的 {count} 个产物”。
- main 现状已经如此：`sessions.ts` 的 `deliver` 每次都重新读取集合。本行只补全正文，实现不用改。
- 本行没有收窄 F09 S2 或 F31：D7-07 的“下一条 prompt”继续成立。

**D56-02**
- `discussion_context` 现在只有开始锚点。(C) main 的 `apps/web/src/server/lab/conversations.ts:221` 对每个引用执行 `insert … onConflictDoNothing()`，库里没有任何删除路径；D12-10 的联合（`:458`）里也只有 `discussion.load`。本行补上结束锚点，并且由人通过 Lab 命令确认，与原型中按项“从上下文移除”的交互一一对应。
- 把 load 定为“加入集合”，保持了已通过命令的含义和现有实现，落选的“替换”方案确实会改变含义。
- 范围划得正确：移除不改 transcript、不改 `inputs/` 副本、不改 `references`、不改 `lab_open_artifact` 的可读范围，因此不越过 omp 与 store 这两个源头。

**执行提醒（不是反例）：** 承载 issue 应写明前端讨论页“移除”按钮的接线归属。原型 `AI4S-Discussions-Hi-Fi.dc.html:284,287` 和 apps/web 客户端都在 W-10 的白名单内（D20-01）。issue 应写明这一项由 Lab 席与 web 席中的哪一方实现，避免出现只有后端命令、页面没有入口的半截交付。

