# D20（PM#30）：修订 D16-09，明确 W-10 前端路径域与 U59 无关前端会话的边界

起草：治理分身 GovClone_55b0。优先级 P0。

**v4 修订说明：** v3 被 claude-high 对三条全部投反对，反例见 `local://votes/D20-claude-high.md`：
- WEB-03/04/06/07 无法绕开 UI；
- 被排除的 7 个文件正是 D7:52、D7-17 点名要改的位置；
- 漏列了测试、文案、页面路由；
- 文档 owner 在 W-09 退役后会悬空。

本版依据 ArgonSol 的两项意图裁定【定】（见 `local://votes/D20-argon.md`）重写：
- **Q1：** C5-3.2 与 U59 只保护“不破坏、不回滚 U59 会话已合入的合法成果”，不表示它改过的文件永久不得再改。
- **Q2：** `features/lab-*/ui/**` 中的数据绑定行由 W-10 写；CSS、主题、类名、布局、视觉层级、组件结构以及与本次无关的文案，一律不碰。

v1–v3 的票作废，五席全部重投。

## 依据

- **来源：** Pepgent#9 的 BLOCKED B 组：https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559285723 。A 组 5 个文件已放行（issuecomment-6559372684），本表在 D20-01 中放宽其用途约束。
- **意图依据：** U1“已有 agent 在制作纯前端”、U2“全流程不收缩”、U59“不得联系无关 agent”、C5-3.2“严禁破坏或回滚其成果”；以及 U7、U30、U32、U83、U84（不制造无解的 block 和互等）。
- **契约依据：** D7:52、D7:76、D7:95、D7:104、D7-16、D7-17（“页面改动：各页本地 reducer 的动作改为命令”“每个页面路由的 loader 调用 readPage”）；D12:563、568（不得造数，缺失字段在投影中留空）。
- **代码事实：** [代码事实归档](https://github.com/Pepgent/PM/blob/main/evidence/inv/d20-code-facts.md)（PM `evidence/inv/d20-code-facts.md`），以及 claude-high 选票中的逐行反例。
- **U59 会话自有改动范围：** D15 盘点 [D15盘点](https://github.com/Pepgent/PM/blob/main/evidence/exec/d15/pepgent.md) 第二父差集，第 533–617 行。

**计票：** 依 LEDGER C2-3（U95），五席投票，即总协调席（Main+GovClone）、claude-high、Argon（意图否决）、ArgonGovernance（治理否决）、LeadMentor。至少 4 席赞成、无专责否决、有效反例清零即为通过。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D20-01 | **W-10 的数据层、路由、文案与测试路径域** | D16-09 中 W-10 一行 | W-10 白名单在 `apps/web/src/client/**`、`apps/web/tests/e2e-lab/**` 之外，再加入以下路径。下列 `features/`、`locales/`、`tests/vitest/` 路径均以 `apps/web/src/renderer/` 或 `apps/web/` 为前缀。<br>• `apps/web/src/app/routes/_lab.tsx` 与 13 个页面路由 `apps/web/src/app/routes/_lab.*.tsx`，用于 D7-17 的 loader 调用 readPage。<br>• A 组 5 个文件。原来“只做 snapshot loader”的用途约束取消，按 WEB-02..07 的需要加 `send`、`subscribe` 等调用。<br>• `renderer/composition/lab-app.tsx`、`renderer/application/lab-runtime.tsx`、`renderer/application/contracts/lab-session.tsx`。<br>• `features/lab-{automation,clusters,connect-cluster,containers,datasets,discussions,experiment-detail,experiments,flow-editor,home,node-library,settings}/controller/**`。<br>• `features/lab-{automation,clusters,connect-cluster,containers,datasets,discussions,experiment-detail,experiments,flow-editor,home,navigation,node-library,settings}/model/**`。<br>• `renderer/locales/lab-{automation,clusters,connect-cluster,containers,datasets,discussions,experiment-detail,experiments,flow-editor,home,node-library,settings,shell}-copy.ts`，用于 D7:95、D7:104 的文案迁移。<br>• `apps/web/tests/vitest/lab-*-view-model.test.ts`，即 WEB-03..06 交付的投影单元测试，在代码写完后编写。<br>不在范围内的：`lab-sign-in` 全部内容、`lab-sign-in-copy.ts`、`tests/vitest/lab-return-path.test.ts`、`application/contracts` 中除 `lab-session.tsx` 以外的文件。`tests/node/lab-runtime.test.ts` 测的是 server 侧（W-09，#15 C8），也不在范围内。<br>**保护约束（Argon Q1【定】）：** U59 会话改过的 7 个 controller/model 文件同样归 W-10 写，前提是：从最新 `origin/main` 接续；只改数据来源、类型、演示字面量与空值处理；不删除、不回退、不覆盖 U59 已合入的结构与合法语义 | **得到：** WEB-01..07 的全部非视觉落点都有唯一的系统内写方，D7、D12 点名要改的位置都能改到。<br>**放弃：** 与 U59 会话可能在同一文件上发生合并冲突，按 rebase 处理；本系统无法约束外部会话。<br>**备选落选：**<br>• 排除 7 个文件（v3）：会挡住 D7:52、D7-17 要求的修改（claude-high 反例）。<br>• 交给 U59 会话：不能联系它（U59） | 治理 | 是：D16-09 漏划了前端投影的实际落点 |
| D20-02 | **UI 只接数据绑定，视觉层不碰** | `features/lab-*/ui/**`；`renderer/styles/lab/**`；`renderer/platform/web/astryx-theme/**` | 依 Argon Q2【定】(a)：<br>• `features/lab-*/ui/**` 中以下行由 W-10 写：真实数据取数；D12:568 规定留空字段的空值展示；演示 id 与固定回复的替换（如 `experiments-page.tsx:109` 的 `'R-022'`、`connect-cluster-page.tsx:698` 的 `'atlas'`）；把 reducer 动作接到 LabCommand（D7-17）；以及完成上述各项所需的最少 props 和条件渲染。<br>• 不改 CSS、主题、类名、布局、视觉层级、组件结构以及与本次无关的文案。<br>• `renderer/styles/lab/**`、`renderer/platform/web/astryx-theme/**` 一律不写。<br>• 每个 PR 的正文逐文件列出 UI 中改动的行及其用途，供事后检查 | **得到：** 尊重 U1“另有 agent 制作纯前端”的分工，只接数据，不碰视觉；U2 的完整业务不收缩；不会出现无人可写的死锁。<br>**放弃：** W-10 要在 U59 的 UI 文件里做最少的接线改动。<br>**备选落选：**<br>• W-10 一律不写 UI（v3）：WEB-03/04/06/07 无人能写，会制造无解的 block（claude-high 反例；U7、U30）。<br>• 交给用户决定：Argon 已依 (U) 裁定，不需要 | 意图 | 是：U1、U59 与 D16-09 之间缺这条边界 |
| D20-03 | **文档 owner 与生命周期交接** | `apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`、`docs/conventions/03-typescript-react-style.md`；`apps/web/src/renderer/README.md` | W-09 在席期间，三份文档归 W-09；W-09 按 D16-10 退役后，归 W-10。<br>秘书在 Pepgent 新建承载 issue「Lab 前端读取文档同步」：<br>• W-10 每次合入 WEB 切片 PR 时，把需要的段落原文写进 PR 正文，并在承载 issue 下评论。<br>• W-09 在席时，由 AreaMgrPepgent 送达 W-09，W-09 在该 issue 的 PR 中合入。<br>• W-09 退役后，W-10 直接在自己的 PR 中修改这三份文档。<br>• 全部文档差量合入前，该 issue 保持 open，最终只由一个 PR 关闭。<br>`renderer/README.md` 始终归 W-10 | **得到：** 任一时刻每份文档只有一个 owner；W-09 退役后不会悬空，也不必让 W-09 空占名额等待。<br>**放弃：** 文档 owner 中途会换一次。<br>**备选落选：**<br>• 永久归 W-09（v3）：W-09 退役后无人执行（claude-high 反例）。<br>• 两席共写：违反单一 owner 原则 | 治理 | 否 |
