# D20（PM#30）独立审查席 claude-high 选票

- 席位：claude-high，空白历史独立审查席，依 U95 计 1 票。
- 审查对象：`local://decisions/D20-draft.md` **v3** 现行正文。D20-01 按 v3 的逐文件划分投票。
- 读过的源头：
  - D16-09 原文：`/tmp/govclone-pm/evidence/decisions/D16-phaseB-review-restore.md:33`
  - D7-16、D7-17：`D7-lab-backend.md:76-77`，以及 D7 的事实表 `:46-52` 和字段表 `:95、:104`
  - D8 WEB 行：`D8-mvp-scope.md:335-341`
  - D12 的“第一版无来源字段”：`D12-lab-wire.md:561-579`
  - LEDGER C5-3.2：`LEDGER.md:83`
  - Pepgent#9、#21、#25、#26、#27、#28、#29、#43
  - Pepgent 只读克隆 `/Users/mouriya/Ext/worktrees/pepgent-web-clone` 的源码和测试
- 文中行号都取自上述克隆。只读，没有改任何仓库。

## 总表

| ID | 票 | 分类意见 | 一句话理由 |
| --- | --- | --- | --- |
| D20-01 | **反对** | 不同意“治理”。核心是 C5-3.2 的保护范围怎么解释，属于**意图**（Argon 闸门 A）；路径补全部分是**串联** | 被排除的 7 个文件里，有 D7:52 点名必须改的剧情字面量和 harness 映射。WEB-03、04、06、07 的主路径一定会撞上排除清单。白名单还漏了测试、copy 和页面路由 |
| D20-02 | **反对** | 同意“意图” | “UI 不需要改”这个前提，与 D12 的“投影留空、不得造数”冲突，也与 D7-17 写明的“页面改动”冲突；UI 里还写死了剧情字面量。BLOCKED 出口必定触发，而 U59 规定不能联系 UI 负责人，后续无人能写 |
| D20-03 | **反对** | 同意“治理” | 承载 issue 必须保持 open，直到最后一个 WEB 差量合入；但按 D16-10，W-09 在最后一个 LAB 切片合入后就会被 kill。第 3 步落在一个已结束的会话上 |

---

## D20-01：W-10 数据层路径域（v3 逐文件）

### steady（契约闭合）反例

**反例 1：WEB-03 的实验详情页拿真实 run id 必然得到 null。**
- 失效位置：`apps/web/src/renderer/features/lab-experiment-detail/model/experiment-detail-view-model.ts:107`，原文是 `return runId === 'R-022' || runId === 'R-021' || runId === 'R-018' ? (flows[runId] ?? null) : null;`。
- 调用方：`experiment-detail-page.tsx:33-36` 用它选出 `flow`。
- 失效过程：
  1. W-10 按 D20-01 把 `snapshot.experimentFlows` 切换为 D12 投影，键是 store 真实的 RunId。
  2. `detailFlow` 只认三个故事线 id，对真实 run 一律返回 null。
  3. 实验详情页无数据，F10、F23–F26 的主路径断裂。
- 冲突点：
  - 这正是 D7:52 点名的“view model 里写死的故事线 id”之一（D7 记为 `:106`），D7-17 要求“6 处 view model 的剧情字面量改成数据事实”，WEB-07 要求“把剧情字面量改成数据事实”。
  - 该文件在 v3 的排除清单里。
  - 草案的主路径声称“这 7 个文件读取的输入形状保持兼容”。形状确实兼容，但行为失效。

**反例 2：WEB-07 的 harness 收窄在类型检查阶段就会失败。**
- 失效过程：
  1. W-10 在白名单内的 `client/contracts/lab-compute.ts:196` 把 `harness` 收窄为 `'omp'`。这是草案主路径明文要求完成的。
  2. `lab-settings/model/settings-view-model.ts:21-26` 中的 `HARNESS` 只有 `claude`、`codex`、`pi`、`opencode` 四个键。
  3. `:409-411`、`:522`、`:611` 的 `HARNESS[a.harness]` 因此报 TS 错误。
  4. web typecheck 失败，PR 不满足 C1-3 的“本仓编译、类型检查”，无法合入。
- 冲突点：该文件在排除清单里。草案自己的主路径（收窄 harness）与“这 7 个文件输入形状保持兼容”互相矛盾，因为收窄改变的正是该文件读取的 `client/contracts` 类型。

**反例 3：WEB-06 的容器页一打开就崩溃。**
- 失效位置：`lab-containers/model/containers-view-model.ts:150-152`，原文是 `image.builds[0]!.tag` 和 `const build = image.builds[buildIndex]!`。
- 失效过程：
  1. D12:574 把 `containers.images[].builds` 列为第一版无来源字段，规定“线上不出现，投影留空”，并且“原型里的演示值不得作为数据”（D12:563）。
  2. 投影给出 `builds = []` 后，`builds[0]!.tag` 在运行时抛出 TypeError，容器页崩溃。
- 同类问题：
  - `containers-state.ts:93` 的初始值 `imageId: 'xrd'`；
  - `containers-view-model.ts:230、278、288、322` 写死的 `'xrd'` 和 `'instr-edge-dryrun'`（即 D7:52 的 213、271）；
  - `flow-editor-view-model.ts:90、302、330` 用字面量 `'N-07'` 判定判据节点（即 D7:52 的 300，D7-17 要求改成“判据节点这种节点角色”）。
- 这些文件全部在排除清单里。

**反例 4：WEB-04 讨论页无法删除固定回复，也无法接上真实回复。**
- 失效位置：`lab-discussions/model/discussions-view-model.ts:123-124、185-195`。`aiReplies: true` 加上 `reply_arrived` 构成模拟 AI 回复的 reducer。
- 冲突点：
  - D7-17 要求“删掉固定回复”，并把“各页本地 reducer 的动作改为命令”，这里对应 `discussion.prompt`。
  - D12-08 规定讨论正文只经 `conversation.read` 读取。
  - 这些改动必须写该文件，而它在排除清单里。F09 的主路径因此断裂。

**反例 5：白名单漏掉了这些 issue 实际需要的非 UI 路径。**

| 路径 | 为什么 W-10 必须写 | 依据 |
| --- | --- | --- |
| `apps/web/tests/vitest/**` | WEB-03..06 的开发期交付本身就是“纯函数投影的单元测试，输入是真实录制的线数据”。仓内没有与源码同目录的测试（`src/**/*.test.ts` 为 0），`tsconfig.tests.json:9` 只收录 `tests/vitest/**`。现有 12 个 `lab-*-view-model.test.ts` 直接调用 model 函数；model 签名一变，typecheck 就失败 | D8:337-340；#26 正文 |
| `apps/web/tests/node/lab-runtime.test.ts` | D20-01 已把 `lab-runtime.tsx` 划给 W-10，改它就会让这份测试失败 | `tsconfig.node-tests.json` |
| `apps/web/src/renderer/locales/lab-*-copy.ts` | D7-17 写明“文案来自 renderer 的 copy 目录”。字段表 D7:104 要求“向导文案移到 renderer 的 copy”（WEB-06 接入向导），D7:95 写明 home 的“quote/dialogs/prompts 是 renderer 文案”。这 14 个文件不在 U59 差集里，也没有任何 owner | D7:77、95、104 |
| `apps/web/src/app/routes/_lab.*.tsx`（13 个页面路由，含 `_lab.settings.$tab.tsx`） | D7-17 原文是“每个页面路由的 `loader` 调用 `readPage`”；WEB-02 的验收是“页面 loader 读取线数据，事件使它失效后重读”。A 组只放行了 `_lab.tsx` | D7:77；#21 |
| A 组的附带约束 | A 组放行时限定“只做 Lab snapshot 的 loader 与异步读取接线”。但 WEB-02 要在 `create-lab-services.ts` 和 `renderer-services.ts` 中加入 `send`、`subscribe`、`watchAgent`，D20-01 没有为 WEB-02..07 放宽这条约束 | Pepgent#9 issuecomment-6559372684 |
| 风险项（非阻断）：`application/contracts/destination.ts` | `LabPage` 只带 `runId`（`destination.ts:52-53`）。D12-05 的 `experiment{ref: run\|draft, at, compare, workspace}`、`experiments{from, until}`、`flowEditor{draft}` 如果要从地址栏进入 loader，就必须改这个文件 | D12-05 |

### divergent（更简明的主路径）

v3 用“排除 7 个文件，触及就报 BLOCKED”的办法求得单一写方，但这个 BLOCKED 是**必定**会触发的（反例 1 到 4），只是把本 P0 该做的决定推迟成下一个 P0。而且排除清单实际上也挡不住 U59 会话去写其余 20 个文件：外部会话不受本系统的白名单约束。所以“与 U59 不共写任何文件”是一个本系统无法兑现的保证。

本系统能兑现的约束只有两条：一是本系统内这些文件只有 W-10 一个席位写；二是 C5-3.2 的原文红线“严禁破坏或回滚”。C5-3.2 并没有说“已改过的文件以后不得再改”。D7-17 是 05:48:24Z 之前的合法基线，它本身就写明阶段 B 要改这些 view model 的剧情字面量、改各页 reducer，并且“与 UI 负责人经 Main 协调后一次落地”。

建议直接表决：
1. 这 27 个 controller/model 文件全部划给 W-10。
2. 对 U59 改过的 7 个文件附加约束：只改数据来源、类型和剧情字面量，不删除、不回退 U59 已合入的结构与语义；每个切片从最新的 `origin/main` 建立。
3. 一并补入上表中的 tests、locales 和页面路由，并放宽 A 组的附带约束。

这样做的前提是 Argon 在本 P0 中裁定“C5-3.2 保护的是不破坏、不回滚，而不是不再修改”。所以本条分类应为**意图**，不是“治理”。

---

## D20-02：视觉层 W-10 一律不写

### 对重点核对项 1 的结论：前提不成立

草案的前提是：只改 application、controller、model，UI 就能切到 D12 线数据。这对 WEB-02（接缝）、WEB-05（节点库和自动化页的 UI 只经 controller 取数）大体成立。对 WEB-03、04、06、07 不成立，反例如下。

**反例 1：UI 直接读取 D12 规定“投影留空”的视图字段（WEB-06，F17、F31）。**
- 涉及字段：
  - `clusters-page.tsx` 在 `:75-101`、`:129-134`、`:470`、`:511`、`:586-587`、`:659-663` 直接读 `ClusterFixture.health/gpu/cpu/nodeCount/handshakeAge`（类型见 `client/contracts/lab-compute.ts:29-38`，都不可为空）；
  - `home-page.tsx:591-608` 读 `clusters.health` 和 `row.loadPercent/health`；
  - `connect-cluster-page.tsx:147-178` 读 `health/nodeCount/gpu`。
- D12:568 把 `home.clusters.*` 和 `clusters.clusters[].health/load/gpu/cpu/nodeCount/handshakeAge` 列为无来源字段：“线上不出现，投影留空”，并且“不得造数”（D12:563、V-2）。
- 两种做法都走不通：
  - 如果投影留空，视图类型就要改成可空，`copy.health[row.health]` 和 `row.gpu.total` 会在 UI 文件里报类型错误，UI 必须修改；
  - 如果不改 UI，就只能编造 `'ok'` 或 0，直接违反 D12。

**反例 2：UI 里写死了剧情字面量（WEB-07 要求改成数据事实）。**
- `experiments-page.tsx:109`：“新建”按钮固定链接到 `{ kind: 'flow_editor', runId: 'R-022' }`。切到真实数据后，`readPage('flowEditor', {draft:'R-022'})` 指向一个不存在的草稿，13 页走查（SMOKE:22-54）中实验页的主操作失效。
- `connect-cluster-page.tsx:698`：`dispatch({ kind: 'choose', path: 'node', cluster: 'atlas' })` 写死了集群 `atlas`。

**反例 3：UI 读取的 model 输出形状必须变。**
- `containers-page.tsx:270` 读 `view.build.tag`。按 D20-01 反例 3，`builds = []` 时 `view.build` 只能改为可空，这一行就需要修改。
- `settings-page.tsx:432` 使用 `HARNESS[agent.harness]`。harness 收窄为 `'omp'` 后，这一行依赖 `HARNESS` 中有没有 `omp` 键。

**反例 4：已通过的契约本身就预期 UI 要改。**
- D7-17 写明“**页面改动**：各页本地 reducer 的动作改为命令”，并且“与 UI 负责人经 Main 协调后一次落地”。
- WEB-07（#29）的目标原文是“经 Main 与 UI 负责人协调”。
- U59 禁止联系那个会话，所以“协调”这条路径不存在。草案的出口是“W-10 报 BLOCKED，由领导层另行决定”，但领导层到时可选的只有两条：让 W-10 写，或者无人能写。这个决定是可以现在就做的；推迟只会在 WEB-06、WEB-07 上**必然**卡住。

### divergent

建议本 P0 直接确定 UI 层的最小数据绑定写权：
- 只针对上面点名的行：无来源字段改为空值渲染、剧情字面量改为数据、`view.build` 可空、harness 显示。
- `styles/lab/**`、`astryx-theme/**`、`packages/ui/src/lab/**` 维持 W-10 一律不写。
- 约束同 C5-3.2：不改样式、类名与布局结构，不回退 U59 已合入的内容。

另一种做法：如果 Argon 认为 U1 的“纯前端”涵盖 `ui/**` 的每一行，就应当把“D12 无来源字段在 UI 上怎样呈现”作为意图问题提交给用户，而不是让 W-10 在切片中途报 BLOCKED。

分类：同意**意图**。

---

## D20-03：文档单一 owner 与送达路径

### steady 反例：承载 issue 比 W-09 活得久

- 依据：D16-10 原文是“一个席位的实现切片全部合入 `main` 后，立即对它执行 `tern kill session`”。
- 依赖顺序：WEB-03..06 依赖 W-09 的 LAB-07b、09、10、11a、11b、12（#26、#27、#25、#28），WEB-07 又依赖 WEB-03..06。所以最后一份 WEB 文档差量（WEB-07 的 PR）**必然**晚于 W-09 最后一个 LAB 切片合入。
- 两种读法都失效：
  - **(a) 承载 issue 不算 W-09 的实现切片：** W-09 在最后一个 LAB 切片合入后即被 kill。D20-03 的第 2 步（片区经理送达 W-09）和第 3 步（W-09 合入）落在已结束的会话上，承载 issue 永远无法关闭。
  - **(b) 承载 issue 算 W-09 的实现切片：** W-09 要从最后一个 LAB 切片一直空等到 WEB-07 合入，期间占用 G-6 的 4 个并发名额之一，违反 U83、U84 和 D16-10 的滚动补入意图。
- 次要问题：#43 C3 的原文是“随真实 catalog 接入，**在同一次交付中**直接替换”，这是一次性放行，并没有把这三份文档永久划给 W-09。D20-03 把它当成永久 owner 的依据并不成立。

### divergent

以生命周期为锚，单一 owner 依次交接。D16-09 已有同类先例：“迁仓后 … 改归 W-08”。
- W-09 存活期间，三份文档归 W-09。W-10 把段落原文写进 WEB PR 正文；W-09 在下一个 LAB PR 中顺带合入，不需要单独的承载 issue。
- W-09 被 kill 时，这三份文档改归 W-10。之后的 WEB 差量由 W-10 在自己的切片 PR 中同次替换。

这样任何时刻都只有一个 owner，不需要长期 open 的承载 issue，也不需要片区经理来回转送，W-09 也不会空占名额。

分类：同意**治理**。

---

## 有效反例清零条件

- **D20-01：** 两条路都可以。
  - 路线一：这 7 个文件里与 WEB 相关的数据部分（`experiment-detail-view-model.ts:107`、`settings-view-model.ts:21-26/409-411/522/611`、`containers-view-model.ts:150-152/230/278/288/322`、`containers-state.ts:93`、`flow-editor-view-model.ts:90/302/330`、`discussions-view-model.ts:123-124/185-195`）给出写方，并按 divergent 方案经 Argon 裁定 C5-3.2 的范围；
  - 路线二：明确把这些切片宣告为不可完成，并经用户批准缩小范围（U2 不允许擅自收缩）。
  - 两条路都要补入 `tests/vitest/**`、`tests/node/lab-runtime.test.ts`、`renderer/locales/lab-*-copy.ts`、`app/routes/_lab.*.tsx`，并放宽 A 组的附带约束。
- **D20-02：** 对 D12:568 的无来源字段和 UI 中的剧情字面量（`experiments-page.tsx:109`、`connect-cluster-page.tsx:698`）给出写方；或者由 Argon 判定为意图问题提交用户。不能用“到时 BLOCKED”代替。
- **D20-03：** 写明 W-09 退役时文档 owner 交给 W-10，或者写明另一个与 W-09 生命周期相容的锚点。

---

# 第 2 轮（对 v4 重投）

- 审查对象：`local://decisions/D20-draft.md` **v4** 现行正文。意图前提采用 ArgonSol 的 Q1、Q2【定】。
- 按 v4 说明，v1–v3 的票作废；第 1 轮仅作为反例出处保留。

## 第 1 轮反例的处理情况

| 第 1 轮反例 | v4 的处理 | 是否清零 |
| --- | --- | --- |
| D20-01 反例 1–4：被排除的 7 个文件挡住 D7:52、D7-17 要求的修改 | 27 个 controller/model 文件全部归 W-10。7 个 U59 文件的约束为：只改数据来源、类型、演示字面量和空值处理；不删除、不回退、不覆盖。逐处核对：`experiment-detail-view-model.ts:107` 属演示字面量；`settings-view-model.ts:21-26` 的 `HARNESS` 属类型；`containers-view-model.ts:150-152` 属空值处理；`containers-state.ts:93`、`flow-editor-view-model.ts:90/302/330` 属演示字面量；`discussions-view-model.ts:123-124/185-195` 的固定回复属数据来源。全部落在许可范围内 | 是 |
| D20-01 反例 5：漏了页面路由、copy、vitest 测试，A 组约束未放宽 | 补入了 `_lab.tsx`、`_lab.*.tsx`（克隆中正好 13 个页面路由）、13 个 `lab-*-copy.ts`（不含 sign-in）、`tests/vitest/lab-*-view-model.test.ts`，A 组的用途约束也已取消 | 是 |
| D20-01 反例 5 中的 `tests/node/lab-runtime.test.ts` | v4 不纳入，理由成立。我核对了该文件第 9–12 行，它只 import `src/server/lab/{auth-schema,database,schema,runtime}.js`，测的是 W-09 的 server 侧，和 renderer 的 `lab-runtime.tsx` 无关。**这是我第 1 轮的误判，撤回** | 撤回 |
| D20-02 反例 1–4：UI 必须改 | 依 Argon Q2【定】，W-10 写 UI 中的数据绑定行，范围列明了 D12:568 的空值展示、`'R-022'`、`'atlas'`、reducer 动作接到 LabCommand、所需的最少 props 和条件渲染；视觉层不碰；PR 正文逐行列出改动，供事后检查 | 是 |
| D20-03：文档 owner 在 W-09 退役后悬空 | W-09 在席时归 W-09，按 D16-10 退役后归 W-10，退役后由 W-10 在自己的 PR 中直接修改 | 是 |

## 逐条投票

| ID | 票 | 分类意见 | 理由 |
| --- | --- | --- | --- |
| D20-01 | **赞成** | 同意“治理”。意图部分已由 Argon Q1【定】解决，剩下的是路径域划分 | **steady：** WEB-02..07 每个非视觉落点都能找到写方。我逐项核对了 issue 范围，结果如下：WEB-02 的 loader、失效重读和 `send`/`subscribe` 落在 `_lab*.tsx`、A 组文件和 `lab-session.tsx`；WEB-03..06 的投影落在 `client/**`，数据切换落在 27 个 controller/model，交付的单元测试落在 `tests/vitest`；WEB-07 的 id 放宽和 harness 收窄落在 `client/contracts` 与 `settings-view-model`，演示字面量落在 model、UI 数据绑定行和 copy。没有发现会因权限或路径断裂的主路径。**divergent：** 整个 W-10 域只有一个系统内写方，没有跨席位锁，也没有互等，已经是最简方案 |
| D20-02 | **赞成** | 同意“意图” | **steady：** 第 1 轮列出的 UI 反例都落入 Q2(a) 的许可范围。克隆中 `lab-*/ui/**` 共 16 个文件，`lab-sign-in/ui` 也落在这个 glob 内，但 D20-01 把 sign-in 排除在外；只要 WEB 切片不触及登录，这不影响主路径。**divergent：** 由 PR 正文逐行留证、事后检查，不设同步门禁，符合 U83、U84 |
| D20-03 | **赞成** | 同意“治理” | **steady：** owner 交接以 D16-10 的退役为锚，任一时刻只有一个 owner，承载 issue 不会因 W-09 退役而无人处理。**divergent：** 与第 1 轮的替代方案等价。承载 issue 加片区经理送达只在 W-09 在席期间使用，成本可以接受 |

## 不阻断的执行提示（不是反对理由）

1. **测试命名：** `tests/vitest/lab-*-view-model.test.ts` 这个 glob 限定了文件名，而 vitest 只收录 `tests/vitest/**/*.test.ts`（`vitest.config.ts:5`）。WEB-03 交付的是 `client/services/lab/project-*.ts` 投影的单元测试，输入是真实录制的线数据。这类测试要么写成 `lab-<页面>-view-model.test.ts`，要么把录制数据内联在测试文件里。主路径可以走通。如果希望命名直接、录制数据单独存放，可以把 glob 放宽为 `apps/web/tests/vitest/lab-**`（不含 `lab-return-path.test.ts`）。
2. **`destination.ts` 的风险（沿用第 1 轮）：** `LabPage` 目前只带 `runId`（`destination.ts:52-53`）。D12-05 的 `at`、`compare`、`workspace`、`from/until`、`flowEditor{draft}` 如果由 controller 发起 `readPage` 并持有为页面内状态，就不用改这个文件。如果实现时要让它们出现在地址栏，就需要另走 BLOCKED 初审。这属于工程师私有实现的选择，不阻断。

**本轮结论：D20-01、D20-02、D20-03 均投赞成；三条都没有剩余的有效反例。**
