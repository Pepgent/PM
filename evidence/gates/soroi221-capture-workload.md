# soroi#250 中 F07 两个 capture 负例 BLOCKED 的闸门材料：workload 是否仍未发布、由谁承载

- **issue：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（F07/F19/F22 真实 S1 验收与自动驱动），工人 W-08（`pepgent-e2e`）。BLOCKED 见 [#250 评论 6562742874](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562742874)（2026-11-01T19:26:02Z）。该评论把卡点指回 [#221 评论 6552048831](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552048831)（2026-11-01T01:57:41Z）。
- **工人状态：** W-08 没有其他在做的切片，已暂时退场，不算 ALL_DONE。阶段 B 收尾前，这个卡点需要有人承载。
- **编制：** governance-desk 实例 `DeskSoroi221Workload`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初分类，并列出交两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：两道闸门都确认不越界，才可以免投票放行；任一闸门认定越界，按 P0 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论、派工 issue 正文和工程师的交付评论都属于 `(A)`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`
- `D15X/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/exec/d15/`
- `SORM/` = `Pepgent/soroi` `origin/main` `e9c524f`（2026-11-02 本实例 fetch）
- `LIBM/` = `Pepgent/lab-library` `main` `d0dd4a6`

类别沿用 `deploy24-release-pairing.md`：K1 既有决策或规则已覆盖，只需澄清；K2 主路径外的失败或竞态；K3 已通过契约内的单仓私有实现；K4 公开契约缺口（含验收语义）。

---

## 一、工人提出的问题

W-08 在 #250 合入 [PR#338](https://github.com/Pepgent/soroi/pull/338)：`e2e/s1/agents-live.ts` 已能驱动 F07 正例、F19 和 F22。它把 F07 的 `try_eval`、`text_only` 两个 capture 负例登记为 BLOCKED，理由是“要等 #221 的 owner 发布 workload”，并说明在此之前 F07 的 Verdict 一定失败 (A)。

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | #221 的原 BLOCKED（01:57:41Z）要求“library/SOR-11 owner 发布真实 capture workload 及精确 public invocation，使子 assignment 包含两个指定负例；测试方不加隐藏 flag、不临时改 review/template”。 | (A) [#221 评论 6552048831](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552048831) |
| F2 | 02:26:24Z，#221 记录了这项工作的承担方：lab-library 工程师新增 `try_eval`、`text_only` 两个 Agent 节点，在 #221 评论中发布 `[{kind, code, assignment}]` JSON，并把同一份 JSON 放进 lab-library 仓的文件。 | (A) [#221 评论 6552320362](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552320362) |
| F3 | 承载 issue 是 [lab-library#3](https://github.com/Pepgent/lab-library/issues/3)“提供 F07 Agent 角色闸门与无交回公开负例”，已于 02:44:51Z 以 COMPLETED 关闭。实现 PR 是 [lab-library PR#4](https://github.com/Pepgent/lab-library/pull/4)，02:44:49Z 合并，merge commit 为 `7db341c`。 | (R) `gh issue view 3 -R Pepgent/lab-library`、`gh pr view 4 -R Pepgent/lab-library` |
| F4 | 02:47:16Z，RiriAgent 在 #221 发布了公开 workload：评论里只有一个 `json` 代码块，含 `try_eval`、`text_only` 两条 `{kind, code, assignment}`，并给出路径 `workloads/f07-agent-negatives.json` 和 commit `7db341c`。评论写明这次只补上公开 workload 与 assignment 的缺口，“不宣称 F07 gate 通过”，最终判定在可持久的 child transcript 上进行。 | (A) [#221 评论 6552503070](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552503070) |
| F5 | `LIBM/` 上仍有 `workloads/f07-agent-negatives.json`、`nodes/try_eval.ts`、`nodes/text_only.ts`。workload 文件自 `1c76fab` 起没有改过。用 JSON 解析比较，该文件与 F4 评论中的 JSON 块完全相等（`equal True ['try_eval', 'text_only']`）。从 `7db341c` 到 main，两个节点只多了 `@group calc`、`@estimateMinutes 5` 两行 JSDoc，prompt 没有变化。 | (R) `gh api repos/Pepgent/lab-library/contents/...`、`commits?path=...`、`compare/7db341c...main`，以及 python 比较 |
| F6 | D15 lab-library 盘点把会话前的 issue3、PR4 及其正文和评论列入**保护**：“F07旧成果不回滚为本会话新增”。D15 回退的是 PR6、PR9、PR11，PR4 不在其中。`7db341c` 是受保护遗产 `83ebca0` 的祖先，在 `83ebca0` 之前。 | (D) `D15X/lablibrary.md:107,167`；`DEC/D15-private-decision-discard.md:44,49`；(R) `compare 83ebca0...7db341c` = `behind 3` |
| F7 | 当前 soroi 构造子 agent assignment 的方式是：在 prompt 后追加 `When done, call soroi_return with { value: string }; a file field takes the path of a file you wrote.`（单值时 `fields` 为 `value: <type>`）。这与 F4 中 `text_only` assignment 末尾的通用交回后缀格式一致。 | (D) `SORM/packages/omp-soroi/src/eval/agent-body.ts:16,28` |
| F8 | SOR-11 [#205](https://github.com/Pepgent/soroi/issues/205)（`spawnCapture` 与 host call 转发）已于 2026-11-01T14:05:51Z 以 COMPLETED 关闭，由 PR#279、PR#298 合入。 | (R) `gh issue view 205 -R Pepgent/soroi` |
| F9 | F07 consumer 会读取 #221 上 RiriAgent 发布的原始评论（要求 `html_url` 为 `soroi/issues/221#issuecomment-<id>`、`user.login == "RiriAgent"`），评论中必须恰好有一个 `json` 块，并按 kind 取出 `code` 与完整的 `assignment`。F4 评论满足这些格式要求。 | (D) `SORM/e2e/s1/f07.spec.ts:8-17`；`SORM/e2e/s1/agents.md:71` |
| F10 | 目前的 live producer 只采集 `review` 正例：`live-f07.ts` 注释为“Collect the real review capture only; absent owner-published negative workloads are not fabricated”；`agents-live.ts:9` 注释为“the two negative workloads await #221”。 | (D) `SORM/e2e/s1/live-f07.ts:49`、`SORM/e2e/s1/agents-live.ts:9` |
| F11 | 席位矩阵：W-05 `pepgent-library` 负责 lab-library 全仓；W-08 `pepgent-e2e` 负责 soroi 中的 `e2e/**`、`compose.yaml`、`compose.full.yaml`。W-08 按逐 spec 读法编写，在阶段 B 只编写、不执行跨组件测试。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09）、`:34`（D16-10）、`:37`（D16-13） |
| F12 | 已决切片：LIB-01“D8-07 的节点、`package.json` 与 lockfile、`.omp/agents/`”服务 F03、F06–F30；SOR-11 的验收为“`review` 完成捕获，并记录 transcript sessionId”；E2E-13 归 W-08 F07/19/22；F07 ②③ 是两个负例的验收语义。 | (D) `DEC/D8-mvp-scope.md:126,274,315,371` |
| F13 | #250 已有管理层裁定：F07/F19/F22 的自动场景驱动由 W-08 在阶段 B 编写（两道闸门判定不越界，免票澄清）。 | (A) [#250 评论 6562192468](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562192468) |

## 三、初分类

**K1：卡点已由既有发布解除，只需澄清；不改 F07 判据，不新开 workload 承载。**

- **workload 的发布已有归属，并已完成：** 发布义务按 F2 的承担方记录交给 lab-library 一侧，由 lab-library#3 / PR#4 交付（F3），在 #221 以 consumer 要求的格式发布（F4、F9）。这些产物至今仍在 lab-library main 上，与发布的 JSON 一致（F5）。它们属于 D15 保护的会话前遗产（F6）。按现行席位矩阵，lab-library 的 owner 是 W-05（F11）。
- **阻塞已解除：** W-08 在 #250 写“等 #221 的 owner 发布”时（19:26Z），发布已在 02:47Z 完成（F4）。F1 要求的两项“精确 public invocation”和实际 assignment 都已具备。SOR-11 也已关闭（F8），这一侧没有未完成的依赖。
- **剩余工作在 W-08 自己的路径域：** 缺的是 `e2e/s1/live-f07.ts` 采集 `forbidden`、`noReturn` 两个阶段，以及 `agents-live.ts:9` 的注释（F10）。这些都在 `e2e/**` 内（F11），属于 #250 已裁定的“W-08 阶段 B 编写自动驱动”范围（F13）。承载就是 #250 本身，不需要新 issue。W-05 不需要进场。
- **不采用的做法：**
  - 请 W-05 重新发布 workload，或另开 lab-library issue。已发布的产物满足 F1 与 F9，重做属于从零重做（`SOR/AGENTS.md:129`）。
  - 改用 report worker，或临时修改 review/template。这违反 F1 和 #250 的正文。
- **阶段 C 的风险，只登记，不设门：** F4 中的 assignment 取自 SOR-11 落地前的 `runSubprocess` 路径。consumer 要求实际的首条 native user message 与发布的 assignment 完全相同（F9）。当前 `agent-body.ts` 生成的后缀格式与发布值一致（F7），所以推定不会漂移，标为 `[INFERENCE]`。如果阶段 C 实测不一致，按具名 blocker 交 lab-library owner 重新发布。按 C1-3 与 `SOR/AGENTS.md:128`，这一风险不作为阶段 B 编写的前置条件。

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** 把 #221 评论 6552503070 及 lab-library `workloads/f07-agent-negatives.json` 认定为 F1 所要求的 owner 发布，从而解除 #250 的 F07 负例 BLOCKED，是否只是确认已有事实，不触及 F07 ②③ 的验收语义（F12）或 D5 的 capture 契约？
- **A-2：** 发布值由 `runSubprocess` 时期的真实 launch 提取（F4），现在的产品走 `spawnCapture`（F8）。把可能出现的 assignment 漂移留到阶段 C 实测，到时出现具名 blocker 再交 owner 重新发布，不在阶段 B 要求重新提取，这样处理是否符合 F07 的原意？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 免票放行后，剩余编写落在 W-08 的 `e2e/**`（F11），由 #250 承载（F13），不新开 issue，也不需要 W-05 进场。这是否越过 D16-09 白名单或 D16-13 阶段边界？是否属于必须投票的事项？
- **B-2：** W-08 已暂时退场，这项编写需要 W-08 重新进场。按 D16-10 滚动补入，由 Main 在空出的名额里安排，结论中这样写是否足够？片区经理（AreaMgrSoroi）负责送达。
- **B-3：** 阶段 C 的 assignment 漂移风险只登记、不设门（第三节）。这是否符合 C1-3 与 `SOR/AGENTS.md:128`，即不以上游的 runtime 证据作为下游编写条件？

## 六、可选处置（只列出）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| ⓐ | 认定卡点已由既有发布解除。在 #250 写明：workload 位于 #221 评论 6552503070 与 lab-library `7db341c`；剩余工作是 W-08 在 #250 内补齐 `live-f07.ts` 的两个负例阶段。在 #221 写明等待对象已交付、没有新的等待对象。W-08 由 Main 按 D16-10 安排重新进场，AreaMgrSoroi 送达 | 不改 | 需两道闸门确认 |
| ⓑ | 要求 W-05 按 `spawnCapture` 路径重新提取 assignment 后重新发布，再解除 BLOCKED | 不改契约；增加一次上游运行 | 在开发期给下游编写设置上游 runtime 前置，与 C1-3、`SOR/AGENTS.md:128` 冲突 |

## 七、闸门判定后的程序

- 两道闸门都确认不越界：按 ⓐ 免票放行，在 #250、#221 写结论。承载为 #250（W-08），由 AreaMgrSoroi 送达。W-08 何时重新进场，由 Main 按 D16-10 安排。
- 任一闸门认定越界：按 P0 用 `council propose --seat Coordination --as DeskSoroi221Workload` 立案，notify 含 `Main`、`AreaMgrSoroi`。
- 闸门结论写入 `evidence/gates/soroi221-capture-workload-gate-a.md`（Argon）和 `evidence/gates/soroi221-capture-workload-gate-b.md`（ArgonGovernance）。

## 八、处置

- **闸门 A（`Argon-2`）：** 不越界，K1，放行处置 ⓐ。阶段 B 不预跑跨组件 runtime，也不重新提取 assignment。见 `soroi221-capture-workload-gate-a.md`（PM `fd31bc5`）。
- **闸门 B（`ArgonGovernance-2`）：** 不越界，K1，支持处置 ⓐ。B-1 不需要投票；B-2 由 Main 按 D16-10 安排 W-08 重新进场，由 AreaMgrSoroi 按 C4-2 送达；B-3 中的漂移风险只登记，不设门。见 `soroi221-capture-workload-gate-b.md`（PM `cfbf46a`）。
- **结论：** 按 ⓐ 免票放行，不新开 issue。workload 已由 lab-library#3 / PR#4 交付。剩余编写由 [#250](https://github.com/Pepgent/soroi/issues/250) 承载，归 W-08；W-05 不需要进场。
- **结论评论：**
  - [#250 评论 6563281915](https://github.com/Pepgent/soroi/issues/250#issuecomment-6563281915)：写明 workload 所在位置，以及 `live-f07.ts` 两个负例阶段、`agents-live.ts:9` 注释这两项剩余编写。
  - [#221 评论 6563283616](https://github.com/Pepgent/soroi/issues/221#issuecomment-6563283616)：写明等待对象已交付、没有新的等待对象，评论 6552503070 必须保持原样。
- **后续由 Main 安排：** W-08 何时重新进场，由 Main 按 D16-10 安排；进场后由 AreaMgrSoroi 送达 #250 的结论。
