# D45 选票：ClaudeHigh

议程：WEB-07 AI 面板接线：把 AiPanel 两个文件划给 W-10，只用于加受控端口（解 Pepgent#29 部分 BLOCKED）（[Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D45-01 v1：赞成（ClaudeHighD45，2026-11-01T22:18:28.081Z）



# D45-01 v1 · ClaudeHigh 选票（实例 ClaudeHighD45，空白历史）

**票：赞成（approve）。** 没有主路径失效的反例。

## 读过的源头

- 议案与材料：PM `evidence/gates/pepgent29-aipanel.md`、`pepgent29-aipanel-proposal.yaml`、`pepgent29-aipanel-gate-a.md`、`pepgent29-aipanel-gate-b.md`。
- 决策正文：`DEC/D20-w10-path-boundary.md:12-13,31-32`；`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:11,20`；`DEC/D12-lab-wire.md:174,413-419,461-462,513-514,554-555`；`DEC/D12-coverage.md:19,33-34,143-147,606`；`DEC/D8-mvp-scope.md:343`；`PM/evidence/exec/d15/pepgent.md:533-616`。
- 源码：用 `gh api repos/Pepgent/Pepgent/tarball/main` 取 Pepgent main 源码包，解压到 `/tmp/claudehigh-d45/`。读了 `packages/ui/src/lab/ai-panel.tsx`（全文 472 行）、`ai-panel-model.ts`（全文 82 行）和 `index.ts:14-26`；对 `AiPanelConversation|AiPanelProps|AiConversationFixture|ai-panel|resetKey|reply` 做了全仓 grep。

## steady：契约闭合与 U59 / 视觉层

1. **与 U59 和视觉层保护不冲突。**
   - D15 盘点（`d15/pepgent.md:533-616`）列出 U59 会话的第二父差集。`packages/ui/src/lab` 下属于这次授权的只有 `index.ts`（:608）和 `ai-panel.css`（:601）在差集内；`ai-panel.tsx`、`ai-panel-model.ts` 不在差集内，属于会话前就有的遗产。
   - 议案明写 `ai-panel.css` 不写，`packages/ui/src/styles.css:5` 的 import 也不动。
   - `index.ts` 虽在 U59 差集内，但只在新增导出类型时补列名。D20 Q1【定】（`D20:12`）规定“不表示它改过的文件永久不得再改”，这与 D35-01 v3 处理 `time-axis.tsx`（同样在 U59 差集 :613）的方式一致。
   - 改名按 (ii) 处理：`ai-panel.tsx:324-360` 的 `rename` 分支和 `.pepgent-lab-ai-panel-session-name` Button 都保留，只是没有回调时不进入编辑态。这是条件渲染，没有删除 U59 的结构，满足 C5-3.2 的“不删除、不回退”。
2. **用途清单已经闭合 10 页 AI 面板的主路径。** 我把组件每一处内部 state 和外部契约逐一对照：
   - `session`/`names`/新建会话 `-1`（`:149-150,187-194,413-422`）对应“会话受控 + `onSessionChange`”，数据源是 `panels`（D12-coverage:143）；新建会话对应 `panel.prompt` 的存在即复用（D12:554）。
   - `sentMessages` + `session===0 && seed`（`:156,461-466`）对应“messages 受控”。`AiPanelMessage` 的 assistant `blocks[changes]` 已经能承载 `attachments[kind=changes]`（D12-coverage:146），不需要新增类型。
   - `send()` 和快捷 prompt（`:196-225`）对应 `onSend(text)`，再到 `panel.prompt`（D12:461）。
   - `modelId`（`:154,292-295`）对应 `onModelChange(id)` 和受控当前模型，再到 `panel.model{conversation, provider, modelId}`（D12:462）。id 到 provider/modelId 的映射放在 controller，属于 W-10 已有路径。
   - `thinking` 与 `replyTimer`（`:157-171,202-211,460,467`）对应“删除定时假回复 + 流式文字输入位”，数据源是 `watchAgent`（D12:419）。进行中的状态由流式输入位驱动，`ChatMessageList isStreaming` 和 thinking 行沿用现有结构。
   - `reply` 删除后，全仓的消费者只有 W-10 白名单内的 10 个 controller、`apps/web/src/client/contracts/lab-*.ts` 和 `apps/web/tests/vitest/*`。`packages/ui` 内没有测试或其他文件引用 `AiPanelConversation`；`change-rows.tsx` 只引用 `ChangeRow` 类型，不受影响。删除这个字段不会让白名单外的文件编译断开。
   - 剩下的 `attach` IconButton（`:254-260`，本来就没有 onClick）、`onAction`（已有 prop）和 `copy` 都是 D12-coverage:33 AI-K 集合中的 K 类，不属于 WEB-07“数据都来自后端”的范围，所以不需要列入用途。
3. **路径互斥与依赖顺序没有问题。** wire、protocol、server 不改；`panel.prompt` 归 LAB-13（D42-03），`panel.model` 归 LAB-14（D44-03）。页面侧 `features/lab-*/{controller,model,ui}/**` 和 `apps/web/src/client/**` 已在 D20-01 的 W-10 白名单内。新放开的只有两个文件和 `index.ts` 中受条件限定的导出行，不与任何其他席位的路径重叠，也没有跨席位等待。

## divergent：有没有更小、更简明的方案

- **授权面已经最小。** 行为在 `ai-panel.tsx`，props 类型在 `ai-panel-model.ts`，只开放其中一个文件都接不上；`index.ts` 也只在有新增导出类型时才动。
- **半受控方案不更小。** 半受控指 controller 把真实 messages 塞进 `seed`，再用 `resetKey` 重挂载来清空本地 `sentMessages`。这个方案仍要改同样两个文件，才能加 `onSend` 并删掉定时器，所以授权面相同。它还要依赖 `seed` 只在 `session===0` 显示（`:461`）和 `resetKey` 重挂载这类 hack，与议案已经否掉的“只在 controller 侧换 seed”属于同一类。议案的全受控写法更直接。
- **不应扩大到 `packages/ui/src/lab/**` 的类级授权。** 扩大授权虽然能少开几次 P0，但违反 D35-01 v3 写明的“不扩大到其余文件”，也会扩大 U59 遗产暴露面。本议程不是做这类授权的场合。
- **结论：** 没有比本行更小的授权方案，也没有能消除串行等待的替代主路径。

## 给执行的非阻断提示（不构成反对）

改名按 (ii) 处理后，`ai-panel.tsx:351-352` 的 `tooltip={copy.rename}` 和 `label={`${currentName} · ${copy.rename}`}` 在没有回调时会变成一个点了没反应的“重命名”提示。闸门 A 的原文（`gate-a.md:36`）是“不显示误导性的‘重命名’提示”。建议 W-10 在“最少 props 和条件渲染”范围内，没有回调时不传这两个改名文案。这不改类名、样式和布局，并在 PR 正文按 D20-02 逐行列出。这一点不影响主路径。

