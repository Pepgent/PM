# D20（PM#30）：修订 D16-09，明确 W-10 前端路径域与 U59 无关前端会话的边界

起草：治理分身 GovClone_55b0。优先级 P0。

**v2 修订说明：** 采纳闸门 B（ArgonGovernanceSol）指出的三处完整性缺口：
- 路径全部写成完整路径或可执行 glob；
- 视觉层改为 W-10 一律不写，避免出现共享写方；
- 文档改由真实承载 issue 加片区经理送达来落实。

**v3 修订说明：** 采纳 LeadMentor 对 D20-01 的反例。原写法在与 U59 重叠的目录里没有写权交接，会形成共享写方。现改为按文件逐一划分：U59 会话改过的 7 个文件 W-10 一律不写，W-10 只拿到其余文件。

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
| D20-01 | **W-10 的数据层路径域（按文件逐一划分）** | D16-09 的 W-10 行 | W-10 的白名单在 `apps/web/src/client/**`、`apps/web/tests/e2e-lab/**` 和 A 组 5 个文件之外，**再加入且只加入**下面这些文件：<br>• `apps/web/src/renderer/composition/lab-app.tsx`<br>• `apps/web/src/renderer/application/lab-runtime.tsx`<br>• `apps/web/src/renderer/application/contracts/lab-session.tsx`<br>• `lab-automation/controller/use-automation-controller.ts`、`lab-automation/model/automation-view-model.ts`<br>• `lab-clusters/controller/use-clusters-controller.ts`、`lab-clusters/model/clusters-view-model.ts`<br>• `lab-connect-cluster/controller/use-connect-cluster-controller.ts`、`lab-connect-cluster/model/connect-cluster-view-model.ts`<br>• `lab-datasets/controller/use-datasets-controller.ts`、`lab-datasets/model/datasets-view-model.ts`<br>• `lab-discussions/controller/use-discussions-controller.ts`<br>• `lab-experiment-detail/controller/use-experiment-detail-controller.ts`<br>• `lab-experiments/controller/use-experiments-controller.ts`、`lab-experiments/model/experiments-view-model.ts`<br>• `lab-flow-editor/controller/use-flow-editor-controller.ts`<br>• `lab-home/controller/use-home-controller.ts`、`lab-home/model/home-view-model.ts`<br>• `lab-navigation/model/focus-model.ts`、`lab-navigation/model/navigation-model.ts`<br>• `lab-node-library/controller/use-node-library-controller.ts`、`lab-node-library/model/node-library-view-model.ts`<br>• `lab-settings/controller/use-settings-controller.ts`<br>（以上 `lab-*` 路径的前缀均为 `apps/web/src/renderer/features/`。）<br>**W-10 不写以下 7 个文件。** 它们是 U59 会话自己改过的，见 D15 盘点第二父差集第 553–572 行：<br>`lab-containers/controller/use-containers-controller.ts`、`lab-containers/model/containers-state.ts`、`lab-containers/model/containers-view-model.ts`、`lab-discussions/model/discussions-view-model.ts`、`lab-experiment-detail/model/experiment-detail-view-model.ts`、`lab-flow-editor/model/flow-editor-view-model.ts`、`lab-settings/model/settings-view-model.ts`。<br>`lab-sign-in`、`lab-localizer.ts`、`destination.ts`、`composer-mentions.tsx` 也不在范围内。<br>**主路径：** WEB-02..07 在 `lab-runtime.tsx`、`lab-session.tsx` 和 `client/**` 里把 D12 线数据接成 `useLabSession().snapshot`，再在上面列出的 controller/model 中切换数据源，并完成 WEB-07 的 id 放宽和 `AgentTemplate.harness` 收窄。这 7 个文件读取的输入形状（`session.snapshot` 与 `client/contracts` 类型）保持兼容。若某个切片必须改其中任何一个文件，W-10 先报 BLOCKED，由领导层另行决定，不得自行写入。<br>每个切片都从最新的 `origin/main` 新建 | **得到：** 每个文件只有一个写方，与 U59 会话不共写任何文件，WEB-02..07 也有确定的落点。<br>**放弃：** 只要触及那 7 个文件，就要另行上报。<br>**备选落选：**<br>• 按目录划入、靠 rebase 解决冲突（v2）：在同一文件上与 U59 共写，LeadMentor 已举反例。<br>• 设写权交接锚点：需要 U59 会话确认，但不得联系该会话（U59）。<br>• 留给 U59 会话：不能向它派活（U59）。<br>• 用“Lab 专用条目”这种模糊写法：不能作为白名单（闸门 B） | 治理 | 是：D16-09 漏划了前端投影实际所在的位置 |
| D20-02 | **视觉层 W-10 一律不写** | `apps/web/src/renderer/features/lab-*/ui/**`、`apps/web/src/renderer/styles/lab/**`、`apps/web/src/renderer/platform/web/astryx-theme/**` | 以上路径都不划给 W-10，W-10 一律不写，不存在共享写方。<br>可行性依据（[代码事实归档](https://github.com/Pepgent/PM/blob/main/evidence/inv/d20-code-facts.md)）：UI 只从 `useLabSession().snapshot` 与同 feature 的 controller/model 取数，没有任何 UI 文件直接引用 `LAB_SNAPSHOT` 或 services。因此 W-10 在 D20-01 路径内完成数据源切换后，只要 `snapshot` 与 view-model 的对外形状仍满足这些 UI 现有的读取方式，UI 不需要修改。<br>若某个切片必须新增 UI 可见的字段或改动 UI 结构，W-10 先写 issue 评论报 BLOCKED，由领导层另行决定，不得自行写入 | **得到：** 尊重 U1 的“另有 agent 制作纯前端”，保护该会话已合入的成果（C5-3.2）；每个文件只有一个写方。<br>**放弃：** 新增可见展示要另行上报。<br>**备选落选：** 允许 W-10 改 UI 中的接线行——会和 U59 会话成为共享写方（闸门 B） | 意图 | 是：U1、U59 与 D16-09 之间缺这条边界 |
| D20-03 | **文档单一 owner，并设真实承载与送达路径** | `apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`、`docs/conventions/03-typescript-react-style.md`（#43 C3 已划给 W-09）；`apps/web/src/renderer/README.md`（A 组已划给 W-10） | 三份文档只归 W-09。<br>秘书在 Pepgent 新建一个承载 issue，标题为“Lab 前端读取文档同步”，owner 为 W-09。<br>流程：<br>1. W-10 每次合入 WEB 切片 PR 时，把需要改的“Lab 前端读取”段落原文写进 PR 正文，并在该承载 issue 下评论 PR 链接；<br>2. 片区经理 AreaMgrPepgent 按 tern-worker skill 的“片区经理”一节，把该评论送达 W-09；<br>3. W-09 在该承载 issue 的 PR 中合入。<br>相关 WEB 文档差量全部合入之前，该承载 issue 保持 open；最终只由 W-09 的一个 PR 关闭它。<br>`renderer/README.md` 只归 W-10 | **得到：** 每个文件只有一个 owner；文档同步有承载 issue、触发点和送达人。<br>**放弃：** 文档会比代码晚一个 PR。<br>**备选落选：**<br>• 两席共写同一份文档：违反单一 owner 原则。<br>• 只写“下一个 PR 合入”：没有承载，也没有触发点（闸门 B） | 治理 | 否 |
