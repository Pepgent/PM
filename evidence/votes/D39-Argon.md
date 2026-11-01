# D39 选票：Argon

议程：PR#75 回看映射 replay-at.ts 与 D35-01 v3 的符合性及同刻/亚像素提交的处置（[Pepgent/PM#58](https://github.com/Pepgent/PM/issues/58)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D39-01 v1：赞成（Argon-2，2026-11-01T21:15:34.788Z）——作废：该行已修订到 v3



### 意图裁决（本席说了算）
- 无（`D39-01 v1` 标为“技术”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D39-01 v1（技术，缺失部分或设计补充：否）：赞成（`approve`）。**
  - **理由与依据：**
    1. **`replay-at.ts` 完全符合 `D35-01 v3` 与 `design/store.md:94,137` 的提交级事件语义（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `design/store.md:94,137`、`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`）：**
       - 非派生运行在首次 `POST /runs/steps`（带 `open: { session }`）的同一事务内同时写入 `run_started(seq=1)` 与 `step_committed(seq=2)`，按 `design/store.md:137`“一次提交的记录在其提交级事件（`step_committed`，或派生运行 `seq = 1` 的 `run_started`）的序号处整体生效”，其提交级事件本来就是 `seq = 2`（从不存在独立的空图已提交状态）；而派生运行的 `seq = 1`（`POST /runs/derive` 物化锚点）与后续 `step_committed` 处于不同事务、不同时刻，`at(1) < at(首次 step_committed)`，可由 `max` 精确落到 `seq = 1`。因此，`D35-01 v3` 公式与 `replay-at.ts` 用 `max` 跳过非派生运行的同事务 `seq = 1` 恰恰忠于 `store.md:94,137` 原意。
    2. **亚像素间隔（`< 1px`）属主路径外的极端分辨率边缘情况（`(D)` `SOR/.claude/rules/design-assumes-it-works.md`、`DEC/D8-mvp-scope.md:129,341`）：**
       - `D35-01 v3` 取舍列已限定“F10 S2 在主路径上可达”，且保留了工具栏“回看到这一步”作为辅助入口；依 `design-assumes-it-works.md` 不为极端规模/分辨率边缘情况改动连续时间轴公式或另加吸附/步进交互，`WEB-07`（`Pepgent#29`）只需按既定契约将 `onCursor` 接到 `readPage('experiment', {at})`。

### 否决（一票否决权）
- 无（`D39-01 v1` 标为“缺失部分或设计补充：否”，且与用户原始意图及 `design/store.md`、`D35-01 v3` 完全一致，本席不行使否决权）。


## D39-01 v2：赞成（Argon-2，2026-11-01T21:29:50.357Z）——作废：该行已修订到 v3



### 意图裁决（本席说了算）
- 无（`D39-01 v2` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D39-01 v2（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **兼顾 `design/store.md:94,137` 同事务合并语义与 `F10 S2` 拖动可达性（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `design/store.md:94,137`、`DEC/D8-mvp-scope.md:129,341`、`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`）：**
       - 对同一 `minute` 的事件合并为一个标记并取最大 `seq`，使非派生运行首次 `POST /runs/steps` 同事务写入的 `run_started(seq=1)` 与 `step_committed(seq=2)` 按 `design/store.md:137` 落到提交级生效事件 `seq = 2`；
       - 对不同时刻的提交标记按 `μ_i = max(minute_i, μ_{i-1} + 4 / pixelsPerMinute)`（与同页 `timedCardBoxes` 的 `gap: 4` 对齐）保证每个提交标记在时间轴上至少占据 `4px` 的拖动区间，使快速连续提交（含无节点卡片的只有根值提交）在 `3.2 px/min` 下仍能直接通过拖动时间轴游标指定，完整清零 `LeadMentor` 与 `ClaudeHigh` 在 v1 提出的反例。
    2. **严守 `D20-01/02` 与 `D35-01 v3` 边界（`(U)` `U59`，`LEDGER.md:104`；`(D)` `DEC/D20-w10-path-boundary.md:31-32`）：** 只改 `W-10` 白名单内的 `replay-at.ts`、`experiment-detail-view-model.ts` 与对应单测，由 `WEB-07`（`Pepgent#29`）随 `onCursor` 接线一并落地，不改 `packages/ui`、`commits` wire 或席位白名单。

### 否决（一票否决权）
- 无（`D39-01 v2` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `design/store.md`、`D8`、`D20`、`D35` 完全一致，本席不行使否决权）。


## D39-01 v3：赞成（Argon-2，2026-11-01T21:43:15.702Z）



### 意图裁决（本席说了算）
- 无（`D39-01 v3` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D39-01 v3（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **精确对齐 `design/store.md:94,137` 提交级事件语义与 `F10 S2` 拖动可达性（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `design/store.md:94,137`、`DEC/D8-mvp-scope.md:129,341`、`DEC/D35-pepgent-26-web03-timeline-plan-defs.md:20`）：**
       - 仅对 `derivedFrom === null`（非派生运行）不单列首次 `POST /runs/steps` 同事务写入的 `seq = 1`（`run_started`），使该次提交按 `design/store.md:137` 在 `seq = 2`（`step_committed`）生效；而对派生运行的 `seq = 1`（物化锚点）及任意两次独立的 `step_committed`（含同刻毫秒提交、只有根值的提交）均按 `seq` 各自生成标记，并按 `μ_i = max(minute_i, μ_{i-1} + 4 / pixelsPerMinute)` 保证至少 `4px` 的拖动区间，完整清零 `LeadMentor` 对 v2 的同刻不同提交反例。
    2. **严守 `D20-01/02` 白名单与已合入基线（`(U)` `U59`，`LEDGER.md:104`；`(D)` `DEC/D20-w10-path-boundary.md:31-32`）：** 在 `model/commit-markers.ts` 新增纯函数生成 `{ seq, minute: μ }` 后交由 `controller` 传入既有 `replayAt`，单测写入符合 `D20-01` 白名单 glob 的 `lab-experiment-detail-view-model.test.ts`，不改动 `PR#75` 已合入的 `replay-at.ts` 与 `lab-replay-at.test.ts`，完整清零 `ClaudeHigh` 对 v2 的白名单反例。

### 否决（一票否决权）
- 无（`D39-01 v3` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `design/store.md`、`D8`、`D20`、`D35` 完全一致，本席不行使否决权）。

