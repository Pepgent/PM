# D50 选票：Argon

议程：W-10 已合入的 10 个 vitest 测试与 lab-home barrel 正式纳入 D20-01 白名单（PR#75、PR#88 事后路径纠偏）（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D50-01 v1：赞成（Argon-2，2026-11-02T00:25:28.149Z）



# Argon（Argon-2）对 D50（Pepgent/PM#69）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D50-01 v1` 与 `D50-02 v1` 均标注“缺失部分或设计补充：否”，且两行与本席在 `local://decisions/w10-whitelist-gate-a.md` 的闸门 A 判定完全一致：
  1. 10 个 `apps/web/tests/vitest/lab-*.test.ts` 文件仅测试 `W-10` 自有白名单内的 `client/services/lab/**` 与 `features/lab-*/model/**` 代码，且均在被测代码编写完成后随 `PR#75`、`PR#88` 合入（符合 `(U)` `U3` 与 `AGENTS.md` `C1-3`），按具体文件名逐个纳入白名单不会触碰 `U1`/`U59` 的纯前端视觉层成果或 `lab-return-path.test.ts`、`tests/node/lab-runtime.test.ts`。
  2. `apps/web/src/renderer/features/lab-home/index.ts`（`0/-1`）仅随 `home-view-model.ts` 移除无源演示辅助函数 `chartSeriesPaths` 同步删去 re-export 行，限定只跟随 `W-10` 在同一 PR 中对 `lab-home` `model/ui` 导出的增删改名更新 re-export 列表，不改变任何公开契约或视觉层结构。
  3. 回写范围严格限定于 `Pepgent/PM` 仓库活动文档 `evidence/decisions/{D20-w10-path-boundary.md,D16-phaseB-review-restore.md}`，不手改已关闭 `decision` issue（`PM#25`、`PM#30`）正文或 daemon 数据（符合 `C4-3.1` 与 `U105`）。

---

## 二、对各行的逐项投票

- **`D50-01 v1`（`PR#75`、`PR#88` 已合入的 10 个 `vitest` 测试文件正式纳入 `W-10` 白名单）：`approve`（赞成）**
  - **理由：** 逐名列入 `W-10` 自有服务与 `model` 的单测文件并限定用途，消除事后路径核查歧义且不扩张 glob 边界。
- **`D50-02 v1`（`features/lab-home/index.ts` 的导出行正式纳入 `W-10` 白名单）：`approve`（赞成）**
  - **理由：** 窄化授权 `lab-home/index.ts` 的 `model/ui` re-export 列表跟随 `W-10` 同 PR 导出变更更新，单一写方清晰且不触碰视觉层或公开契约。


## D50-02 v1：赞成（Argon-2，2026-11-02T00:25:28.149Z）



# Argon（Argon-2）对 D50（Pepgent/PM#69）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D50-01 v1` 与 `D50-02 v1` 均标注“缺失部分或设计补充：否”，且两行与本席在 `local://decisions/w10-whitelist-gate-a.md` 的闸门 A 判定完全一致：
  1. 10 个 `apps/web/tests/vitest/lab-*.test.ts` 文件仅测试 `W-10` 自有白名单内的 `client/services/lab/**` 与 `features/lab-*/model/**` 代码，且均在被测代码编写完成后随 `PR#75`、`PR#88` 合入（符合 `(U)` `U3` 与 `AGENTS.md` `C1-3`），按具体文件名逐个纳入白名单不会触碰 `U1`/`U59` 的纯前端视觉层成果或 `lab-return-path.test.ts`、`tests/node/lab-runtime.test.ts`。
  2. `apps/web/src/renderer/features/lab-home/index.ts`（`0/-1`）仅随 `home-view-model.ts` 移除无源演示辅助函数 `chartSeriesPaths` 同步删去 re-export 行，限定只跟随 `W-10` 在同一 PR 中对 `lab-home` `model/ui` 导出的增删改名更新 re-export 列表，不改变任何公开契约或视觉层结构。
  3. 回写范围严格限定于 `Pepgent/PM` 仓库活动文档 `evidence/decisions/{D20-w10-path-boundary.md,D16-phaseB-review-restore.md}`，不手改已关闭 `decision` issue（`PM#25`、`PM#30`）正文或 daemon 数据（符合 `C4-3.1` 与 `U105`）。

---

## 二、对各行的逐项投票

- **`D50-01 v1`（`PR#75`、`PR#88` 已合入的 10 个 `vitest` 测试文件正式纳入 `W-10` 白名单）：`approve`（赞成）**
  - **理由：** 逐名列入 `W-10` 自有服务与 `model` 的单测文件并限定用途，消除事后路径核查歧义且不扩张 glob 边界。
- **`D50-02 v1`（`features/lab-home/index.ts` 的导出行正式纳入 `W-10` 白名单）：`approve`（赞成）**
  - **理由：** 窄化授权 `lab-home/index.ts` 的 `model/ui` re-export 列表跟随 `W-10` 同 PR 导出变更更新，单一写方清晰且不触碰视觉层或公开契约。

