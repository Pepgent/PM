# D50 选票：Coordination

议程：W-10 已合入的 10 个 vitest 测试与 lab-home barrel 正式纳入 D20-01 白名单（PR#75、PR#88 事后路径纠偏）（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D50-01 v1：赞成（Main，2026-11-02T00:26:50.659Z）



# 协调席（Main）对 D50 的选票

| 行 | 票 | 分类 |
|---|---|---|
| D50-01 v1 | 赞成 | 治理 |
| D50-02 v1 | 赞成 | 治理 |

## D50-01 v1：赞成
- 事实核对：D20-01（`D20-w10-path-boundary.md:31`）对 vitest 的授权只有 `lab-*-view-model.test.ts`。D16-09 把 `lab-return-path.test.ts` 明确列为“不在范围内”，说明这份授权是封闭清单。D39 的修订说明也确认 `lab-replay-at.test.ts` 不匹配该 glob。所以这 10 个文件不能靠“合理范围”免表决，闸门 B 的判定成立。
- 理由：10 个测试的被测对象都在 W-10 白名单之内（`client/services/lab/**`、`features/lab-*/model/**`），并且与被测代码在同一 PR 合入，没有触及其他席位的路径。按文件名逐个列入，`lab-return-path.test.ts` 仍保持排除，不会因此放宽 glob。
- 执行边界：只改 PM 活动文档 D20 和 D16，不改已关闭的 PM#25、PM#30 正文，也不改 daemon 数据。这与 C4-3.1、U105 一致，也与 D49 v2/v3 的处理方式相同。

## D50-02 v1：赞成
- 理由：`lab-home/index.ts` 是 feature 根部的 barrel 文件，不在 `controller/**`、`model/**`、`ui/**` 任何一项之内。如果不给它指定写方，W-10 改了 model 的导出，barrel 就无人有权跟着改。用途已限定为只维护对 `./model/**`、`./ui/**` 的 re-export，只授权这一个文件，不扩到其他 13 个 `features/lab-*/index.ts`。

## 反例
未找到能让主路径失效的反例。


## D50-02 v1：赞成（Main，2026-11-02T00:26:50.660Z）



# 协调席（Main）对 D50 的选票

| 行 | 票 | 分类 |
|---|---|---|
| D50-01 v1 | 赞成 | 治理 |
| D50-02 v1 | 赞成 | 治理 |

## D50-01 v1：赞成
- 事实核对：D20-01（`D20-w10-path-boundary.md:31`）对 vitest 的授权只有 `lab-*-view-model.test.ts`。D16-09 把 `lab-return-path.test.ts` 明确列为“不在范围内”，说明这份授权是封闭清单。D39 的修订说明也确认 `lab-replay-at.test.ts` 不匹配该 glob。所以这 10 个文件不能靠“合理范围”免表决，闸门 B 的判定成立。
- 理由：10 个测试的被测对象都在 W-10 白名单之内（`client/services/lab/**`、`features/lab-*/model/**`），并且与被测代码在同一 PR 合入，没有触及其他席位的路径。按文件名逐个列入，`lab-return-path.test.ts` 仍保持排除，不会因此放宽 glob。
- 执行边界：只改 PM 活动文档 D20 和 D16，不改已关闭的 PM#25、PM#30 正文，也不改 daemon 数据。这与 C4-3.1、U105 一致，也与 D49 v2/v3 的处理方式相同。

## D50-02 v1：赞成
- 理由：`lab-home/index.ts` 是 feature 根部的 barrel 文件，不在 `controller/**`、`model/**`、`ui/**` 任何一项之内。如果不给它指定写方，W-10 改了 model 的导出，barrel 就无人有权跟着改。用途已限定为只维护对 `./model/**`、`./ui/**` 的 re-export，只授权这一个文件，不扩到其他 13 个 `features/lab-*/index.ts`。

## 反例
未找到能让主路径失效的反例。

