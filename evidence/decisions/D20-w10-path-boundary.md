# D20：修订 D16-09，明确 W-10 前端路径域与 U59 无关前端会话的边界

起草：治理分身 GovClone_55b0，优先级 P0。

## 依据

- **来源：** Pepgent#9 的 BLOCKED（https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559285723 ），初审在 issuecomment-6559305664。
- **准备清单：** `local://decisions/W10-whitelist-prep.md`。
- **闸门 A（临时 Argon 席 ArgonSol）：** B 组“触及原始意图边界”，依据为 U1“已有 agent 在制作纯前端”、U59“该 agent 与本任务无关”、C5-3.2“保护其合法前端成果”。B 组必须按 P0 表决。Argon 本身不否决“只接 props、不改结构样式”的窄方案。
- **本表不包含：** A 组 5 个文件，即 WEB-01 的前端接缝。这部分在闸门 A 已通过，待闸门 B 确认后按机械补全放行。

**计票规则：** 依 LEDGER C2-3（U95），本议案涉及派工、路径域划分和意图边界，由 5 席投票：总协调席（Main+GovClone）、claude-high、Argon（意图否决）、ArgonGovernance（治理否决）、LeadMentor。至少 4 席赞成、无专责否决、有效反例已清零，即为通过。

**重叠核对来源：** U59 会话自己的改动，取 D15 盘点 `local://exec/d15/pepgent.md` 中 `16fe1f2→a331057` 第二父差集（第 533–617 行）。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D20-01 | **W-10 的数据层路径域** | D16-09 中 W-10 一行；`apps/web/src/renderer/composition/lab-app.tsx`；`renderer/application/lab-runtime.tsx`，以及 Lab 读取所需的 `renderer/application/contracts` 中 Lab 专用条目；`renderer/features/lab-*/controller/**`、`renderer/features/lab-*/model/**` | 把上列路径加入 W-10 白名单，供 WEB-02..07 把数据源从 `LAB_SNAPSHOT` 切换到 D12 线数据，并做 WEB-07 的 id 放宽和 `AgentTemplate.harness` 收窄。<br>其中 6 个目录与 U59 会话已合入的改动重叠：`lab-containers` 的 controller 与 model、`lab-discussions/model`、`lab-experiment-detail/model`、`lab-flow-editor/model`、`lab-settings/model`。对这些目录的约束：<br>• 每个切片都从最新的 `origin/main` 建立；<br>• 只改数据来源与类型；<br>• 不回退、不覆盖 U59 已合入的内容（C5-3.2）。 | **得到：** WEB-02..07 有了落点，W-10 不再被白名单卡住。**放弃：** 与 U59 会话可能在同一文件上发生合并冲突，按 rebase 处理。**备选落选：** 把 controller、model 也留给 U59 会话——但它与本任务无关，不能派活（U59），WEB 切片因此无人可做 | 串联 | 是：D16-09 漏划了前端投影的实际落点 |
| D20-02 | **视觉层仍属 U59 会话，W-10 只改接线行** | `renderer/features/lab-*/ui/**`、`renderer/styles/lab/**`、`renderer/platform/web/astryx-theme/**` | 以上路径不划给 W-10。W-10 在 `ui/**` 中只能改取 props 或数据的接线行，即把 view-model 或 controller 的新数据传进组件；不改组件结构、标记、样式、主题和文案，也不新增或删除视觉元素。`styles/lab/**` 和 `astryx-theme/**` 一律不改 | **得到：** 尊重 U1 中另一位 agent 制作纯前端的分工，保护其已合入成果（C5-3.2）；数据接入又有路可走。**放弃：** 如果某个页面必须改结构才能展示真实数据，就要另行上报，不能由 W-10 顺手修改。**备选落选：** 把 `ui/**` 整体划给 W-10——会覆盖受保护的前端工作域，Argon 判定触及意图 | 意图 | 是：U1、U59 与 D16-09 之间缺这条边界 |
| D20-03 | **文档单一 owner** | `apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`、`docs/conventions/03-typescript-react-style.md`（#43 C3 已划给 W-09）；`apps/web/src/renderer/README.md` | 三份文档仍只归 W-09。W-10 需要改的“Lab 前端读取”段落，把原文写在自己 PR 的正文里，由 W-09 在下一个 PR 中合入。`renderer/README.md` 归 W-10，随 A 组一起放行 | **得到：** 每个文件只有一个 owner，与 D16-09 原则一致。**放弃：** 文档更新会比代码晚一个 PR。**备选落选：** 两席共写同一份文档——违反单一 owner 原则 | 实现 | 否 |
