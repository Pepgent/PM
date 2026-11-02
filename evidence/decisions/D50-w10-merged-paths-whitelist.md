# D50：W-10 已合入的 10 个 vitest 测试与 lab-home barrel 正式纳入 D20-01 白名单（PR#75、PR#88 事后路径纠偏）（P2）——定稿

决策 issue：[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)。发起：Coordination（DeskW10E2eWhitelist）。本文件由议会 daemon 生成。

## 事实

初审材料：`local://decisions/w10-whitelist-gates.md`（DeskW10E2eWhitelist）。闸门 A 判定原文：`local://decisions/w10-whitelist-gate-a.md`（Argon-2：不触及产品原始意图与公开契约，无异议）；闸门 B 判定原文：`local://decisions/w10-whitelist-gate-b.md`，PM `evidence/gates/w10-whitelist-gate-b.md`（ArgonGovernance-2：不能按既有授权免表决，须表决；P2 成立；`domains: [governance]` 正确）。

**来由。** ArgonGovernance-2 全条款审计（PM `evidence/argon/full-audit-posthoc-prs-20261102.md:9-11,238-286`）在第 6 条事后路径检查中查出：W-10 已合入的 PR#75、PR#88 写了 D20-01 白名单之外的 11 个文件。两个 PR 都已合入，正文不回写，也不对它们补请事后闸门 B。本议程只决定这些文件今后归谁写。

**优先级（P2）。** 没有工人报 BLOCKED，W-10 的后续工作也不因此暂停，所以不是 D1-12 的 P0“关键路径工程 `BLOCKED` 解阻”。要改的是 PM 中 W-10 白名单条文（D20-01、D16-09 W-10 一行）与实际承载不一致之处，属 D1-12 的 P2“PM 错误路径清理”（`pepgent-soroi/AGENTS.md:26`）。

**白名单现状（PM `evidence/decisions/`）。**
- D20-01（`D20-w10-path-boundary.md:31`）对 `tests/vitest` 只授权 `apps/web/tests/vitest/lab-*-view-model.test.ts`，即“WEB-03..06 交付的投影单元测试，在代码写完后编写”；features 只授权 `features/lab-*/controller/**`、`model/**`，以及 D20-02 的 `ui/**` 数据绑定行。
- D16-09 W-10 一行（`D16-phaseB-review-restore.md:33`）照录同一清单，并把 `apps/web/tests/vitest/lab-return-path.test.ts` 明列为“不在范围内”。所以 vitest 授权是封闭清单，不是“lab 开头的测试都可写”。
- D39-01 v3 修订说明（`D39-pr75-replay-at-d35-01.md:48`）已确认“`lab-replay-at.test.ts` 不匹配”D20-01 的 glob；D39 选择不动该文件（`:49,54`），没有追认 PR#75 创建它。
- D42、D44、D45 均未授权 `features/lab-home/index.ts`。D45-01 的 index 授权只针对 `packages/ui/src/lab/index.ts` 中 ai-panel 的导出行（`D20-w10-path-boundary.md:31`）。

**已合入的域外文件（`gh api repos/Pepgent/Pepgent/pulls/{75,88}/files` 分页读全，2026-11-02 取得）。**
- PR#75（WEB-03，closes Pepgent#26）新增 `apps/web/tests/vitest/lab-replay-at.test.ts`（+33）。被测：`features/lab-experiment-detail/model/replay-at.ts`（W-10 `model/**`）。
- PR#88（WEB-07，closes Pepgent#29）新增 9 个测试：
  - `lab-agent-text.test.ts`：被测 `client/services/lab/agent-text.ts`；
  - `lab-artifact-href.test.ts`：被测 `client/services/lab/artifact-href.ts`；
  - `lab-command-dialog.test.ts`：被测 `client/services/lab/command-dialog.ts`；
  - `lab-flow-editor-save.test.ts`：被测 `features/lab-flow-editor/model/flow-editor-view-model.ts`；
  - `lab-handback.test.ts`：被测 `client/services/lab/handback.ts` 与 `features/lab-experiment-detail/model/experiment-detail-view-model.ts`；
  - `lab-invalidation.test.ts`：被测 `client/services/lab/invalidation.ts`；
  - `lab-page-search.test.ts`：被测 `client/services/lab/page-search.ts`；
  - `lab-panel-projection.test.ts`：被测 `client/services/lab/project-panel.ts`；
  - `lab-selection.test.ts`：被测 `client/services/lab/lab-selection.ts`。
  以上路径均以 `apps/web/tests/vitest/` 或 `apps/web/src/` 为前缀。被测代码全部在 W-10 白名单内（`apps/web/src/client/**`、`features/lab-*/model/**`），且与测试在同一 PR 中合入。
- PR#88 修改 `apps/web/src/renderer/features/lab-home/index.ts`（0/-1）：从 re-export 列表删去 `chartSeriesPaths`，随同 PR 对 `model/home-view-model.ts` 的改动。当前 main 上该文件只有对 `./ui/home-page.js` 与 `./model/home-view-model.js` 的 re-export。

**不在本议程。** PR#88 UI 行的视觉争点（另由 Argon 处理）；`apps/web/tests/e2e-lab/**`（E2E-20/21）已在 D16-09、D20-01 的 W-10 白名单内，不需表决（初审材料第二节）。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D50-01 v1 | PR#75、PR#88 已合入的 10 个 vitest 测试文件正式纳入 W-10 白名单 | D20-01（`D20-w10-path-boundary.md:31`）与 D16-09 W-10 一行（`D16-phaseB-review-restore.md:33`）的 `tests/vitest` 授权；`apps/web/tests/vitest/` 下 `lab-replay-at`、`lab-agent-text`、`lab-artifact-href`、`lab-command-dialog`、`lab-flow-editor-save`、`lab-handback`、`lab-invalidation`、`lab-page-search`、`lab-panel-projection`、`lab-selection` 十个 `.test.ts` | 在 W-10 的 `tests/vitest` 授权中，于 `apps/web/tests/vitest/lab-*-view-model.test.ts` 之后，按文件名逐个加入上述 10 个文件。<br>- 用途限定：只测 W-10 白名单内的代码（`apps/web/src/client/**`、`features/lab-*/{controller,model}/**`）；按 C1-3，在被测代码写完后编写。<br>- 加入的是这 10 个文件名，不是放宽 glob。`lab-return-path.test.ts` 与 `tests/node/lab-runtime.test.ts` 仍不在范围内。<br>- PR#75、PR#88 的正文不回写；本行即这两个 PR 中这些文件的路径归属依据。<br><br>本行通过后：<br>1. 秘书只在 `Pepgent/PM` 仓库活动文档 `evidence/decisions/D20-w10-path-boundary.md`（D20-01）与 `evidence/decisions/D16-phaseB-review-restore.md`（D16-09 W-10 一行）补入这 10 个文件名及用途限定；不改已关闭的 decision issue（PM#25、PM#30）正文，也不改 daemon 数据；<br>2. AreaMgrPepgent 把结论送达 W-10。 | **得到：** 已合入、测 W-10 自有代码的单元测试有了唯一写方，事后路径检查按文件名即可判定，不再有“既有授权是否覆盖”的歧义。<br>**代价：** W-10 白名单多 10 个具体文件名。<br>**落选：**<br>- (a) 视为既有授权的合理范围、不表决：D16-09 把 `lab-return-path.test.ts` 明列为不在范围内，D39 修订说明已确认 `lab-replay-at.test.ts` 不匹配，vitest 授权是封闭清单，不能靠解释扩张。<br>- (b) 把 glob 放宽为 `lab-*.test.ts`：会把明确排除的 `lab-return-path.test.ts` 与将来任意 lab 测试一并纳入，还得另写排除项；W-10 的实现切片 WEB-01..07（Pepgent#9、#21、#26、#27、#25、#28、#29）已全部关闭，没有新增测试的已知需要，逐名列入即可。<br>- (c) 把 10 个测试并入匹配 glob 的 `lab-*-view-model.test.ts` 或删除：多数被测的是 `client/services/lab/**`，不是 view-model；搬迁或删除只为迁就路径，会减少已有测试覆盖或制造无关改动。 | 治理 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD50）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D50-02 v1 | features/lab-home/index.ts 的导出行正式纳入 W-10 白名单 | D20-01（`D20-w10-path-boundary.md:31`）与 D16-09 W-10 一行（`D16-phaseB-review-restore.md:33`）；`apps/web/src/renderer/features/lab-home/index.ts` | 在 W-10 白名单 features 段加入 `apps/web/src/renderer/features/lab-home/index.ts`。<br>- 用途限定：只改它对 `./model/**`、`./ui/**` 的 re-export 列表，用来跟随 W-10 在同一 PR 中对 lab-home model/ui 导出的增删改名。不在该文件中加入逻辑、副作用或新的导出来源。<br>- 其他 `features/lab-*/index.ts` 不在本行范围内。<br>- PR#88 正文不回写；本行即 PR#88 中该文件的路径归属依据。<br><br>本行通过后：<br>1. 秘书只在 `Pepgent/PM` 仓库活动文档 `evidence/decisions/D20-w10-path-boundary.md`（D20-01）与 `evidence/decisions/D16-phaseB-review-restore.md`（D16-09 W-10 一行）补入该文件及用途限定；不改已关闭的 decision issue（PM#25、PM#30）正文，也不改 daemon 数据；<br>2. AreaMgrPepgent 把结论送达 W-10。 | **得到：** lab-home model 导出变化时，barrel 有唯一写方，不会出现 model 改了而 barrel 无人能改的死锁。<br>**代价：** W-10 白名单多 1 个文件。<br>**落选：**<br>- (a) 视为 `model/**` 的合理延伸、不表决：D20-01 只列 `controller/**`、`model/**`、`ui/**` 子目录，feature 根部文件不在任何一项内；D45 的 index 授权只针对 `packages/ui/src/lab/index.ts` 的指定导出行，不是任意同名 index.ts。<br>- (b) 一次授权全部 13 个 `features/lab-*/index.ts`：W-10 的实现切片已全部关闭，目前只有 lab-home 一处实际发生；没有已知需要，不预先扩大。 | 治理 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD50）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D50-Coordination.md`、`votes/D50-ClaudeHigh.md`、`votes/D50-Argon.md`、`votes/D50-LeadMentor.md`、`votes/D50-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。