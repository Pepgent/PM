# D20（PM#30）：修订 D16-09，明确 W-10 前端路径域与 U59 无关前端会话的边界

起草：治理分身 GovClone_55b0。优先级 P0。

**v2 修订说明：** 采纳闸门 B（ArgonGovernanceSol）指出的三处完整性缺口：
- 路径全部写成完整路径或可执行 glob；
- 视觉层改为 W-10 一律不写，避免出现共享写方；
- 文档改由真实承载 issue 加片区经理送达来落实。

## 依据

- **来源：** Pepgent#9 的 BLOCKED B 组：https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559285723 。A 组 5 个文件已经两道闸门放行（issuecomment-6559372684），不在本表范围内。
- **闸门 A（ArgonSol）：** B 组触及原始意图边界，即 U1“已有 agent 在制作纯前端”、U59“该 agent 与本任务无关”、C5-3.2“保护其合法前端成果”，必须按 P0 表决。
- **闸门 B（ArgonGovernanceSol）：** B 组要重划 D16-09 中各路径的 owner，并与 W-09 文档分工、U59 边界相交，必须按 P0 表决。
- **代码事实：** 见 [代码事实归档](https://github.com/Pepgent/PM/blob/main/evidence/inv/d20-code-facts.md)，核对对象为 Pepgent `origin/main`，由新派的只读 task:low 取证。
  - `lab-*/ui/**` 下 16 个文件都没有直接 import `LAB_SNAPSHOT`、`LabSnapshot`、`client/services/lab` 或 `lab-runtime`。
  - UI 只通过两种方式取数：同一 feature 的 `controller`/`model`，或 `useLabSession().snapshot`。后者的契约在 `renderer/application/contracts/lab-session.tsx:41-65`，由 `renderer/application/lab-runtime.tsx:18-22、33-38` 把 `services.snapshot` 发布出去。
  - 全仓（不含 tests）引用 `LAB_SNAPSHOT` 的地方只有 `client/services/lab-fixture/index.ts:10`、`client/services/lab.ts:2、13`，都在 W-10 已有的 `client/**` 白名单内。
- **U59 会话自有改动的范围：** 取 D15 盘点 [D15盘点](https://github.com/Pepgent/PM/blob/main/evidence/exec/d15/pepgent.md) 中 `16fe1f2→a331057` 的第二父差集（第 533–617 行）。

**计票：** 依 LEDGER C2-3（U95），本议案涉及派工、路径域与意图边界，由五席投票：总协调席（Main 加 GovClone）、claude-high、Argon（意图否决）、ArgonGovernance（治理否决）、LeadMentor。至少 4 席赞成、无专责否决、有效反例全部清零，即为通过。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D20-01 | **W-10 的数据层路径域（逐项列出）** | D16-09 的 W-10 行 | W-10 白名单在 `apps/web/src/client/**`、`apps/web/tests/e2e-lab/**` 和 A 组 5 个文件之外，再加入以下路径，只限这些路径：<br>• `apps/web/src/renderer/composition/lab-app.tsx`<br>• `apps/web/src/renderer/application/lab-runtime.tsx`<br>• `apps/web/src/renderer/application/contracts/lab-session.tsx`<br>• `apps/web/src/renderer/features/lab-{automation,clusters,connect-cluster,containers,datasets,discussions,experiment-detail,experiments,flow-editor,home,node-library,settings}/controller/**`<br>• `apps/web/src/renderer/features/lab-{automation,clusters,connect-cluster,containers,datasets,discussions,experiment-detail,experiments,flow-editor,home,navigation,node-library,settings}/model/**`<br>用途：WEB-02..07 把 `useLabSession().snapshot` 与各 controller/model 的数据源，从 `LAB_SNAPSHOT` 切换为 D12 线数据，并完成 WEB-07 的 id 放宽和 `AgentTemplate.harness` 收窄。<br>`lab-sign-in`、`lab-localizer.ts`、`destination.ts`、`composer-mentions.tsx` 不在范围内。<br>以下 6 个目录与 U59 会话已合入的改动重叠：`lab-containers` 的 controller 与 model、`lab-discussions/model`、`lab-experiment-detail/model`、`lab-flow-editor/model`、`lab-settings/model`。W-10 在这 6 处的约束：<br>• 每个切片都从最新 `origin/main` 建立；<br>• 只改数据来源与类型；<br>• 不回退、不覆盖 U59 已合入的内容（C5-3.2） | **得到：** WEB-02..07 有了确定的落点，每条路径只有一个写方。<br>**放弃：** 在上述 6 个目录里，可能与 U59 会话在同一文件上产生合并冲突，按 rebase 处理。<br>**备选落选：**<br>• 把 controller/model 留给 U59 会话：它与本任务无关，不能向它派活（U59），WEB 切片就无人可做。<br>• 用“Lab 专用条目”这种模糊写法：不能作为白名单（闸门 B） | 治理 | 是：D16-09 漏划了前端投影实际所在的位置 |
| D20-02 | **视觉层 W-10 一律不写** | `apps/web/src/renderer/features/lab-*/ui/**`、`apps/web/src/renderer/styles/lab/**`、`apps/web/src/renderer/platform/web/astryx-theme/**` | 以上路径都不划给 W-10，W-10 一律不写，不存在共享写方。<br>可行性依据（[代码事实归档](https://github.com/Pepgent/PM/blob/main/evidence/inv/d20-code-facts.md)）：UI 只从 `useLabSession().snapshot` 与同 feature 的 controller/model 取数，没有任何 UI 文件直接引用 `LAB_SNAPSHOT` 或 services。因此 W-10 在 D20-01 路径内完成数据源切换后，只要 `snapshot` 与 view-model 的对外形状仍满足这些 UI 现有的读取方式，UI 不需要修改。<br>若某个切片必须新增 UI 可见的字段或改动 UI 结构，W-10 先写 issue 评论报 BLOCKED，由领导层另行决定，不得自行写入 | **得到：** 尊重 U1 的“另有 agent 制作纯前端”，保护该会话已合入的成果（C5-3.2）；每个文件只有一个写方。<br>**放弃：** 新增可见展示要另行上报。<br>**备选落选：** 允许 W-10 改 UI 中的接线行——会和 U59 会话成为共享写方（闸门 B） | 意图 | 是：U1、U59 与 D16-09 之间缺这条边界 |
| D20-03 | **文档单一 owner，并设真实承载与送达路径** | `apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`、`docs/conventions/03-typescript-react-style.md`（#43 C3 已划给 W-09）；`apps/web/src/renderer/README.md`（A 组已划给 W-10） | 三份文档只归 W-09。<br>秘书在 Pepgent 新建一个承载 issue，标题为“Lab 前端读取文档同步”，owner 为 W-09。<br>流程：<br>1. W-10 每次合入 WEB 切片 PR 时，把需要改的“Lab 前端读取”段落原文写进 PR 正文，并在该承载 issue 下评论 PR 链接；<br>2. 片区经理 AreaMgrPepgent 按 tern-worker skill 的“片区经理”一节，把该评论送达 W-09；<br>3. W-09 在该承载 issue 的 PR 中合入。<br>相关 WEB 文档差量全部合入之前，该承载 issue 保持 open；最终只由 W-09 的一个 PR 关闭它。<br>`renderer/README.md` 只归 W-10 | **得到：** 每个文件只有一个 owner；文档同步有承载 issue、触发点和送达人。<br>**放弃：** 文档会比代码晚一个 PR。<br>**备选落选：**<br>• 两席共写同一份文档：违反单一 owner 原则。<br>• 只写“下一个 PR 合入”：没有承载，也没有触发点（闸门 B） | 治理 | 否 |
