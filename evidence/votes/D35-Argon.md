# D35 选票：Argon

议程：Pepgent#26 WEB-03：时间轴拖动的写方、泳道计划条、版本化节点定义（[Pepgent/PM#54](https://github.com/Pepgent/PM/issues/54)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D35-01 v1：赞成（Argon-2，2026-11-01T19:33:46.390Z）——作废：该行已修订到 v3



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v1`、`D35-02 v1`、`D35-03 v1` 均标 `缺失部分或设计补充? = 是`，三项主案完全采纳本席在 `evidence/gates/pepgent26-web03-gate-a.md`（PM `003c75e`）中的闸门 A 裁定，符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v1`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) LEDGER.md U2`（全流程不收缩）及 `(U) LEDGER.md U59`（`D20` Q1【定】：只保护不破坏、不回滚 `U59` 会话已合入成果，不表示其改过的文件永久不得再改），`F10` S2 的“拖动时间轴”不能收缩为仅按钮触发；将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划入 `W-10` 白名单且严格限定为只增加受控游标位置与拖动/点选回调 prop、不改 CSS 与视觉外观，既守住 `U1/U59` 视觉隔离边界，又保证 `F10` S2 真实可达。
  2. **`D35-02 v1`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c` 与 `(U) LEDGER.md U2`，实验页泳道图的草稿计划时段与跨实验设备冲突投影（`D7:96`、`D12-06`、`D12-coverage.md:163`）是已定功能，不得移入 D9；在 `LabPageWire['experiments']` 补入 `definitions: NodeDefinition[]` 并按 `DraftNode.from` 拓扑顺序从页面计划锚点累加时长，消除了草稿节点缺默认 `estimateMinutes` 与 `template` 设备映射的线协议缺口，且遵守后端不存布局坐标的边界。
  3. **`D35-03 v1`【定：符合用户原意】：** 依 `(U) 01a18e1f #64246eaf`（状态取自真实运行权威源，不拿当前状态冒充执行事实），在 `LabPageWire['experiment']` 增加 `versionedDefinitions: { version: Version; definition: NodeDefinition }[]`（已提交版本取自 store `GET /versions/{version}`，未提交在途版本取自持槽会话 worktree），消除了 `D12-06` 与 `D12-14` 的正文冲突。

#### 二、逐项投票
- **`D35-01 v1`（治理）：赞成（approve）** — 见上文第 1 项裁决；唯一写方明确，且逐行变更披露约束与 `D20-02` 一致。
- **`D35-02 v1`（串联）：赞成（approve）** — 见上文第 2 项裁决；补齐 `LabPageWire['experiments'].definitions` 与计划起点拓扑累加规则，保持 `D7:96`、`D12-06` 功能完整。
- **`D35-03 v1`（串联）：赞成（approve）** — 见上文第 3 项裁决；使 `D12-06` 与 `D12-14` 按 `version` 关联节点定义的要求在服务端与线协议上闭环，同时允许 `W-10` 过渡期先按不造数原则合入。


## D35-02 v1：赞成（Argon-2，2026-11-01T19:33:46.391Z）——作废：该行已修订到 v3



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v1`、`D35-02 v1`、`D35-03 v1` 均标 `缺失部分或设计补充? = 是`，三项主案完全采纳本席在 `evidence/gates/pepgent26-web03-gate-a.md`（PM `003c75e`）中的闸门 A 裁定，符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v1`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) LEDGER.md U2`（全流程不收缩）及 `(U) LEDGER.md U59`（`D20` Q1【定】：只保护不破坏、不回滚 `U59` 会话已合入成果，不表示其改过的文件永久不得再改），`F10` S2 的“拖动时间轴”不能收缩为仅按钮触发；将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划入 `W-10` 白名单且严格限定为只增加受控游标位置与拖动/点选回调 prop、不改 CSS 与视觉外观，既守住 `U1/U59` 视觉隔离边界，又保证 `F10` S2 真实可达。
  2. **`D35-02 v1`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c` 与 `(U) LEDGER.md U2`，实验页泳道图的草稿计划时段与跨实验设备冲突投影（`D7:96`、`D12-06`、`D12-coverage.md:163`）是已定功能，不得移入 D9；在 `LabPageWire['experiments']` 补入 `definitions: NodeDefinition[]` 并按 `DraftNode.from` 拓扑顺序从页面计划锚点累加时长，消除了草稿节点缺默认 `estimateMinutes` 与 `template` 设备映射的线协议缺口，且遵守后端不存布局坐标的边界。
  3. **`D35-03 v1`【定：符合用户原意】：** 依 `(U) 01a18e1f #64246eaf`（状态取自真实运行权威源，不拿当前状态冒充执行事实），在 `LabPageWire['experiment']` 增加 `versionedDefinitions: { version: Version; definition: NodeDefinition }[]`（已提交版本取自 store `GET /versions/{version}`，未提交在途版本取自持槽会话 worktree），消除了 `D12-06` 与 `D12-14` 的正文冲突。

#### 二、逐项投票
- **`D35-01 v1`（治理）：赞成（approve）** — 见上文第 1 项裁决；唯一写方明确，且逐行变更披露约束与 `D20-02` 一致。
- **`D35-02 v1`（串联）：赞成（approve）** — 见上文第 2 项裁决；补齐 `LabPageWire['experiments'].definitions` 与计划起点拓扑累加规则，保持 `D7:96`、`D12-06` 功能完整。
- **`D35-03 v1`（串联）：赞成（approve）** — 见上文第 3 项裁决；使 `D12-06` 与 `D12-14` 按 `version` 关联节点定义的要求在服务端与线协议上闭环，同时允许 `W-10` 过渡期先按不造数原则合入。


## D35-03 v1：赞成（Argon-2，2026-11-01T19:33:46.391Z）



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v1`、`D35-02 v1`、`D35-03 v1` 均标 `缺失部分或设计补充? = 是`，三项主案完全采纳本席在 `evidence/gates/pepgent26-web03-gate-a.md`（PM `003c75e`）中的闸门 A 裁定，符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v1`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) LEDGER.md U2`（全流程不收缩）及 `(U) LEDGER.md U59`（`D20` Q1【定】：只保护不破坏、不回滚 `U59` 会话已合入成果，不表示其改过的文件永久不得再改），`F10` S2 的“拖动时间轴”不能收缩为仅按钮触发；将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划入 `W-10` 白名单且严格限定为只增加受控游标位置与拖动/点选回调 prop、不改 CSS 与视觉外观，既守住 `U1/U59` 视觉隔离边界，又保证 `F10` S2 真实可达。
  2. **`D35-02 v1`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c` 与 `(U) LEDGER.md U2`，实验页泳道图的草稿计划时段与跨实验设备冲突投影（`D7:96`、`D12-06`、`D12-coverage.md:163`）是已定功能，不得移入 D9；在 `LabPageWire['experiments']` 补入 `definitions: NodeDefinition[]` 并按 `DraftNode.from` 拓扑顺序从页面计划锚点累加时长，消除了草稿节点缺默认 `estimateMinutes` 与 `template` 设备映射的线协议缺口，且遵守后端不存布局坐标的边界。
  3. **`D35-03 v1`【定：符合用户原意】：** 依 `(U) 01a18e1f #64246eaf`（状态取自真实运行权威源，不拿当前状态冒充执行事实），在 `LabPageWire['experiment']` 增加 `versionedDefinitions: { version: Version; definition: NodeDefinition }[]`（已提交版本取自 store `GET /versions/{version}`，未提交在途版本取自持槽会话 worktree），消除了 `D12-06` 与 `D12-14` 的正文冲突。

#### 二、逐项投票
- **`D35-01 v1`（治理）：赞成（approve）** — 见上文第 1 项裁决；唯一写方明确，且逐行变更披露约束与 `D20-02` 一致。
- **`D35-02 v1`（串联）：赞成（approve）** — 见上文第 2 项裁决；补齐 `LabPageWire['experiments'].definitions` 与计划起点拓扑累加规则，保持 `D7:96`、`D12-06` 功能完整。
- **`D35-03 v1`（串联）：赞成（approve）** — 见上文第 3 项裁决；使 `D12-06` 与 `D12-14` 按 `version` 关联节点定义的要求在服务端与线协议上闭环，同时允许 `W-10` 过渡期先按不造数原则合入。


## D35-01 v2：赞成（Argon-2，2026-11-01T19:39:25.195Z）——作废：该行已修订到 v3



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）—— `D35-01 v2`、`D35-02 v2` 重投

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v2` 与 `D35-02 v2` 均标 `缺失部分或设计补充? = 是`，两项修订在消解 `ClaudeHigh` 与 `LeadMentor` 主路径反例的同时，完全符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v2`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) LEDGER.md U2` 与 `U59`（`D20` Q1【定】），将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划给 `W-10`（仅限增加受控游标位置与拖动/点选回调 prop，不改 CSS 与视觉外观），并明确由 model 依据最新 `ExperimentWire.graph` 中 `Call` / `AbortedCall` 节点的 `step`（即承载该节点的提交级事件序号 `seq`）与步内最大 `endedAt` 计算 `k = max{ s | 时刻(s) ≤ T }`（最新提交处或之后取 `at = null`），无需改动线协议即可在主路径走通 `F10` S2。
  2. **`D35-02 v2`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c`（草稿只是给 agent 的上下文，从不被执行，也不进 store，`D6-12`）与 `(U) 01a18e1f #64246eaf`（不靠推断伪造运行进度事实），草稿 `DraftNode.id` 与正式运行 `Call(step, position)` / 在途 `Slot` 之间不存在逐节点映射权威。`v2` 明确计划条针对未绑定运行的草稿实验项（`ExperimentWire.run === null && draft !== null`）按 `DraftNode.from` 拓扑顺序与 `max(pendingLaunch.at, now)` / `now` 锚点累加 `DraftNode.estimateMinutes ?? NodeDefinition.estimateMinutes` 绘出 `planned` 区间，而已开始运行的实验项只画已提交调用与在途槽位的真实时段，既完整保留 `D7:96`、`D12-06`、`D12-coverage.md:163` 的泳道计划条与冲突计算功能（不移入 D9），又严守 `D6-12` 草稿与正式运行的不混同边界。

#### 二、逐项投票
- **`D35-01 v2`（治理）：赞成（approve）** — 见上文第 1 项裁决；清零 `ClaudeHigh` 反例，映射数据全部在线上已有 `ExperimentWire.graph` 内闭合。
- **`D35-02 v2`（串联）：赞成（approve）** — 见上文第 2 项裁决；清零 `LeadMentor` 反例，补齐 `LabPageWire['experiments'].definitions` 与未绑定运行草稿的纯计划拓扑投影规则。


## D35-02 v2：赞成（Argon-2，2026-11-01T19:39:25.195Z）——作废：该行已修订到 v3



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）—— `D35-01 v2`、`D35-02 v2` 重投

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v2` 与 `D35-02 v2` 均标 `缺失部分或设计补充? = 是`，两项修订在消解 `ClaudeHigh` 与 `LeadMentor` 主路径反例的同时，完全符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v2`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) LEDGER.md U2` 与 `U59`（`D20` Q1【定】），将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划给 `W-10`（仅限增加受控游标位置与拖动/点选回调 prop，不改 CSS 与视觉外观），并明确由 model 依据最新 `ExperimentWire.graph` 中 `Call` / `AbortedCall` 节点的 `step`（即承载该节点的提交级事件序号 `seq`）与步内最大 `endedAt` 计算 `k = max{ s | 时刻(s) ≤ T }`（最新提交处或之后取 `at = null`），无需改动线协议即可在主路径走通 `F10` S2。
  2. **`D35-02 v2`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c`（草稿只是给 agent 的上下文，从不被执行，也不进 store，`D6-12`）与 `(U) 01a18e1f #64246eaf`（不靠推断伪造运行进度事实），草稿 `DraftNode.id` 与正式运行 `Call(step, position)` / 在途 `Slot` 之间不存在逐节点映射权威。`v2` 明确计划条针对未绑定运行的草稿实验项（`ExperimentWire.run === null && draft !== null`）按 `DraftNode.from` 拓扑顺序与 `max(pendingLaunch.at, now)` / `now` 锚点累加 `DraftNode.estimateMinutes ?? NodeDefinition.estimateMinutes` 绘出 `planned` 区间，而已开始运行的实验项只画已提交调用与在途槽位的真实时段，既完整保留 `D7:96`、`D12-06`、`D12-coverage.md:163` 的泳道计划条与冲突计算功能（不移入 D9），又严守 `D6-12` 草稿与正式运行的不混同边界。

#### 二、逐项投票
- **`D35-01 v2`（治理）：赞成（approve）** — 见上文第 1 项裁决；清零 `ClaudeHigh` 反例，映射数据全部在线上已有 `ExperimentWire.graph` 内闭合。
- **`D35-02 v2`（串联）：赞成（approve）** — 见上文第 2 项裁决；清零 `LeadMentor` 反例，补齐 `LabPageWire['experiments'].definitions` 与未绑定运行草稿的纯计划拓扑投影规则。


## D35-01 v3：赞成（Argon-2，2026-11-01T19:49:42.355Z）



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）—— `D35-01 v3`、`D35-02 v3` 重投

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v3` 与 `D35-02 v3` 均标 `缺失部分或设计补充? = 是`，两项修订在分别消解 `LeadMentor` 与 `ClaudeHigh` 的 v2 主路径反例的同时，完全符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v3`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) 01a18e1f #64246eaf`（状态取自真实运行权威源）、`(U) LEDGER.md U2` 与 `U59`（`D20` Q1【定】），在保留将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划给 `W-10`（仅限受控游标位置与拖动/点选回调 prop，不改 CSS 与视觉外观）的同时，由 `W-09` 在 `LabPageWire['experiment']` 增加 `commits: { seq: Seq; at: Instant }[]`（服务端从 `GET /runs/{run}/stream?after=0` 收集到当前 `graph.at` 为止的全部提交级事件 `run_started`/`step_committed` 的真实 `(seq, at)`，草稿为 `[]`），再由 `W-10` model 以 `k = max{ seq ∈ commits | at(seq) ≤ T }` 映射游标时刻。这既覆盖合法的 Root-only 正式提交，又严格区分步正式提交时刻 `RunEvent.at` 与调用结束时刻 `Call.endedAt`（`design/store.md:95,148-149`），使 `F10` S2 在所有合法提交形态下完整可达。
  2. **`D35-02 v3`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c`（`D6-12` 草稿与正式运行边界）与 `(U) 01a18e1f #64246eaf`，按 `D6-05`（`design/store.md:94`：运行在第一次正式步提交时才创建）和 `D12-04` 在途槽位挂载表（`DEC/D12-lab-wire.md:56`：无运行、有 `pendingLaunch` 时在途槽位挂在该实验项 `ExperimentWire.slots`），满足 `pendingLaunch.state === 'sent' && slots.length > 0` 的实验项已进入第一正式步执行。`v3` 将计划条精确限定于尚未开始执行的未绑定草稿（`run === null && draft !== null` 且不满足 `pendingLaunch.state === 'sent' && slots.length > 0`），根锚点取 `now`，而第一正式步在途的实验项与已绑定运行一样只画实际时段，彻底消除了首步在途期间“自己与自己冲突”或“计划与在途重复绘制”的缺陷，完整守住 `D7:96`、`D12-06` 功能。

#### 二、逐项投票
- **`D35-01 v3`（治理）：赞成（approve）** — 见上文第 1 项裁决；清零 `LeadMentor` v2 反例（Root-only 提交与真实提交时刻 `at`），且不改 store 契约。
- **`D35-02 v3`（串联）：赞成（approve）** — 见上文第 2 项裁决；清零 `ClaudeHigh` v2 反例（首步在途、`run === null` 窗口判据），保持 `LeadMentor` v1 反例已清零状态。


## D35-02 v3：赞成（Argon-2，2026-11-01T19:49:42.355Z）



### 选票：Argon（产品原始意图守护席，实例 `Argon-2`）—— `D35-01 v3`、`D35-02 v3` 重投

#### 一、本意裁决与一票否决核查
- **无一票否决：** `D35-01 v3` 与 `D35-02 v3` 均标 `缺失部分或设计补充? = 是`，两项修订在分别消解 `LeadMentor` 与 `ClaudeHigh` 的 v2 主路径反例的同时，完全符合 `(U)` 用户原话与已通过基线，不行使一票否决。
- **本意裁决【定】：**
  1. **`D35-01 v3`【定：符合用户原意】：** 依 `(U) 01a18e1f #9ff9d2be`（历史时间轴回看）、`(U) 01a18e1f #64246eaf`（状态取自真实运行权威源）、`(U) LEDGER.md U2` 与 `U59`（`D20` Q1【定】），在保留将 `packages/ui/src/lab/time-axis.tsx` 与 `time-axis-model.ts` 划给 `W-10`（仅限受控游标位置与拖动/点选回调 prop，不改 CSS 与视觉外观）的同时，由 `W-09` 在 `LabPageWire['experiment']` 增加 `commits: { seq: Seq; at: Instant }[]`（服务端从 `GET /runs/{run}/stream?after=0` 收集到当前 `graph.at` 为止的全部提交级事件 `run_started`/`step_committed` 的真实 `(seq, at)`，草稿为 `[]`），再由 `W-10` model 以 `k = max{ seq ∈ commits | at(seq) ≤ T }` 映射游标时刻。这既覆盖合法的 Root-only 正式提交，又严格区分步正式提交时刻 `RunEvent.at` 与调用结束时刻 `Call.endedAt`（`design/store.md:95,148-149`），使 `F10` S2 在所有合法提交形态下完整可达。
  2. **`D35-02 v3`【定：符合用户原意】：** 依 `(U) 01a18e8a #32b6f7fd`、`01a18e1f #7ffcea0c`（`D6-12` 草稿与正式运行边界）与 `(U) 01a18e1f #64246eaf`，按 `D6-05`（`design/store.md:94`：运行在第一次正式步提交时才创建）和 `D12-04` 在途槽位挂载表（`DEC/D12-lab-wire.md:56`：无运行、有 `pendingLaunch` 时在途槽位挂在该实验项 `ExperimentWire.slots`），满足 `pendingLaunch.state === 'sent' && slots.length > 0` 的实验项已进入第一正式步执行。`v3` 将计划条精确限定于尚未开始执行的未绑定草稿（`run === null && draft !== null` 且不满足 `pendingLaunch.state === 'sent' && slots.length > 0`），根锚点取 `now`，而第一正式步在途的实验项与已绑定运行一样只画实际时段，彻底消除了首步在途期间“自己与自己冲突”或“计划与在途重复绘制”的缺陷，完整守住 `D7:96`、`D12-06` 功能。

#### 二、逐项投票
- **`D35-01 v3`（治理）：赞成（approve）** — 见上文第 1 项裁决；清零 `LeadMentor` v2 反例（Root-only 提交与真实提交时刻 `at`），且不改 store 契约。
- **`D35-02 v3`（串联）：赞成（approve）** — 见上文第 2 项裁决；清零 `ClaudeHigh` v2 反例（首步在途、`run === null` 窗口判据），保持 `LeadMentor` v1 反例已清零状态。

