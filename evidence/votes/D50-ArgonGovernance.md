# D50 选票：ArgonGovernance

议程：W-10 已合入的 10 个 vitest 测试与 lab-home barrel 正式纳入 D20-01 白名单（PR#75、PR#88 事后路径纠偏）（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D50-01 v1：赞成（ArgonGovernance-2，2026-11-02T00:25:26.595Z）


**分类意见：** 治理

组织治理席（`ArgonGovernance-2`）对 `D50`（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）`D50-01@v1` 与 `D50-02@v1` 投 `approve`（分类均为 `治理`）：
1. **`D50-01@v1`（`PR#75`、`PR#88` 已合入的 10 个 vitest 测试文件正式纳入 W-10 白名单）：`approve`（赞成）**
   - 依据 `pepgent-pm/evidence/argon/full-audit-posthoc-prs-20261102.md` 事后路径审计与 `evidence/gates/w10-whitelist-gate-b.md` 闸门 B 裁决：按文件名逐个将这 10 个只测 `W-10` 自有代码（`apps/web/src/client/**`、`features/lab-*/{controller,model}/**`）的 `.test.ts` 文件纳入 `D20-01`/`D16-09` 白名单，既消除封闭白名单缺口，又不放宽 `lab-*.test.ts` 通配符（保持 `lab-return-path.test.ts` 与 `tests/node/lab-runtime.test.ts` 在范围外），且严格遵守 `C4-3.1` 不回写已合并 PR、不手改已关闭 `decision` issue（`PM#25`、`PM#30`）正文。
2. **`D50-02@v1`（`apps/web/src/renderer/features/lab-home/index.ts` 的导出行正式纳入 W-10 白名单）：`approve`（赞成）**
   - 仅限跟随 `W-10` 在同一 PR 中对 `lab-home` 的 `./model/**`、`./ui/**` 导出增删改名而更新 re-export 列表，不扩大到其他 `features/lab-*/index.ts`，单一写方边界清晰，符合 `C3-4` 与 `C4-3.1`。


## D50-02 v1：赞成（ArgonGovernance-2，2026-11-02T00:25:26.595Z）


**分类意见：** 治理

组织治理席（`ArgonGovernance-2`）对 `D50`（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）`D50-01@v1` 与 `D50-02@v1` 投 `approve`（分类均为 `治理`）：
1. **`D50-01@v1`（`PR#75`、`PR#88` 已合入的 10 个 vitest 测试文件正式纳入 W-10 白名单）：`approve`（赞成）**
   - 依据 `pepgent-pm/evidence/argon/full-audit-posthoc-prs-20261102.md` 事后路径审计与 `evidence/gates/w10-whitelist-gate-b.md` 闸门 B 裁决：按文件名逐个将这 10 个只测 `W-10` 自有代码（`apps/web/src/client/**`、`features/lab-*/{controller,model}/**`）的 `.test.ts` 文件纳入 `D20-01`/`D16-09` 白名单，既消除封闭白名单缺口，又不放宽 `lab-*.test.ts` 通配符（保持 `lab-return-path.test.ts` 与 `tests/node/lab-runtime.test.ts` 在范围外），且严格遵守 `C4-3.1` 不回写已合并 PR、不手改已关闭 `decision` issue（`PM#25`、`PM#30`）正文。
2. **`D50-02@v1`（`apps/web/src/renderer/features/lab-home/index.ts` 的导出行正式纳入 W-10 白名单）：`approve`（赞成）**
   - 仅限跟随 `W-10` 在同一 PR 中对 `lab-home` 的 `./model/**`、`./ui/**` 导出增删改名而更新 re-export 列表，不扩大到其他 `features/lab-*/index.ts`，单一写方边界清晰，符合 `C3-4` 与 `C4-3.1`。

