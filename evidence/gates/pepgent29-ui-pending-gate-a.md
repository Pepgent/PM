# 闸门 A（产品原始意图与公开契约）判定：Pepgent#29 / PR#88 中 D20-02 清单“待核实”UI 改动（QA1–QA5）

- **裁决席位：** `Argon`（实例 `Argon-2`，产品原始意图守护席）
- **关联对象：** [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)、[Pepgent/Pepgent#88](https://github.com/Pepgent/Pepgent/pull/88)（已合入）
- **输入初审材料：** `local://decisions/pepgent29-ui-pending.md`（`DeskPepgent29UiPending`）

---

## 一、总体判定结论

1. **QA1（`U3`、`U5`、`U7`：删除 `clusters-page.tsx` 与 `containers-page.tsx` 末尾纯 fixture 驱动的 `ActionDialog` 挂载点及对应 import）：【不越界 → 追认免票】（K1+K3）。**
2. **QA2（`U6`：删除 `containers-page.tsx` tab 上恒为 `false` 的 `{view.locked && … <ContainerIcon name="lock" />}`）：【不越界 → 追认免票】（K1+K3）。**
3. **QA3（`U11`：`settings-page.tsx:337` 将详情动作按钮的 `className` 条件从 `action.dialog === 'disconnect' || action.dialog === 'delete_template'` 收窄为 `action.dialog === 'disconnect'`）：【不越界 → 追认免票】（K1+K3），无需单开纠偏承载 issue/PR 还原。**
4. **QA4（是否需要以 P1 立案表决）：【不需要】。** 上述 5 行均属 `D20-02` 在移除 `LAB_SNAPSHOT` 无源演示状态与假动作接线时的连带清理，所有可达状态下渲染 DOM 与类名完全不变，不触及产品原始意图、跨组件公开契约或席位分工边界，全部免票追认放行。
5. **QA5（初审第二节归入 `(i)` 的 `U1`、`U2`、`U4`、`U8`、`U9`、`U10` 共 16 行是否有实际越界）：【无越界】。** 初审归入 `(i)` 的 16 行全部属于 `D20-02` 允许的真实数据取数、演示 id 替换（`'instr_edge'`）、reducer 动作接 `LabCommand` 及连带未用解构/import 清理，无需额外处置。

---

## 二、逐项详细依据（QA1–QA5）

### 1. QA1（`U3`、`U5`、`U7`：删除 `clusters` 与 `containers` 的 `ActionDialog` 挂载点及 import）——【追认免票】

- **依据：**
  - `(D)` `D8:343`（`pepgent-pm/evidence/decisions/D8-mvp-scope.md:343`）：`WEB-07` 验收要求“运行时不再引用 `LAB_SNAPSHOT`”。
  - `(D)` `D12-10`（`pepgent-pm/evidence/decisions/D12-lab-wire.md:42,453-455`）与 `D8:87,480-493`：集群页对话框（handshake/shell/restart/destroy/pull image/new sandbox）与容器页对话框（`build_push`、`run_prebuild`、`prebuild_check`）均无第一版后端来源与 `LabCommand`。
  - `(D)` `D20-02`（`pepgent-pm/evidence/decisions/D20-w10-path-boundary.md:32`）：允许 `W-10` 在 `features/lab-*/ui/**` 编写“把 reducer 动作接到 LabCommand（D7-17）；以及完成上述各项所需的最少 props 和条件渲染”。
- **判定理由：** `clusters-page.tsx` 与 `containers-page.tsx` 的 `ActionDialog` 其 `spec` 唯一来源是 `LAB_SNAPSHOT` 的 `dialogs` fixture。在 controller/model 按 `D8:343` 移除 `session.snapshot.*.dialogs` 及对应死状态后，页面末尾的 `{dialog && <ActionDialog .../>}` 已无合法数据源且在所有可达状态下恒不渲染。将其与未用 import 一并删除属于移除 `LAB_SNAPSHOT` 假对话框接线的直接连带结果，并未改变任何可达状态下的组件树或破坏 `(U)` `U1`、`U59` 的纯前端成果，故直接追认免票。

### 2. QA2（`U6`：删除 `containers-page.tsx` tab 上的 `view.locked` 锁图标分支）——【追认免票】

- **依据：**
  - `(D)` `D8:480-493` 与 `D46-03 v2`：容器构建与 prebuild 阶段在第一版无后端来源，生产投影中 `builds: []`、`prebuildStages: []`，`Prebuild` 演示面板已获准移除，`view.locked` 在生产数据下恒为 `false` 并已从 `containers-view-model.ts` 移除。
- **判定理由：** `{view.locked && (tab === 'tree' || tab === 'term') && <ContainerIcon name="lock" />}` 并非独立静态视觉元素，而是 `Prebuild` 假锁定状态的条件分支。随 `Prebuild` 演示与 `view.locked` 字段一并移除后，所有可达状态下的渲染结果完全相同，完全符合 `D20-02`“演示 id 与固定回复的替换……以及完成上述各项所需的最少 props 和条件渲染”，故直接追认免票。

### 3. QA3（`U11`：`settings-page.tsx:337` 去掉 `|| action.dialog === 'delete_template'`）——【追认免票（不开纠偏承载还原）】

- **依据：**
  - `(D)` `D12-10`（`pepgent-pm/evidence/decisions/D12-lab-wire.md:453-455`）与 `D46-05 v1`（`pepgent-pm/evidence/decisions/D46-pepgent80-blocked.md:32`）：Agent 模板在第一版的唯一写路径为会话工作树下的 `agentTemplate.writeFile`、`agentTemplate.removeFile` 与合入命令 `agentTemplate.saveVersion`，不存在 `delete_template` 命令；`settings-view-model.ts:786` 已将 `actionIds.agents` 收窄为 `['history']`，`use-settings-controller.ts:68` 中 `commandDialogId('delete_template')` 亦返回 `null`。
  - `(D)` `pr://Pepgent/Pepgent/88/diff/91` 第 199–210 行：同一 `<Button>` 同时移除了下方 `onClick` 中的假动作分支 `action.dialog === 'terminal'` 与上方 `className` 中的假动作分支 `action.dialog === 'delete_template'`。
- **判定理由：**
  1. 在 `actionIds.agents` 收窄为 `['history']` 后，`action.dialog` 在运行时绝不可能取值为 `'delete_template'`，该分支在所有可达状态下恒为 `false`，保留或删除对当前渲染 DOM、样式类名与视觉表现无任何影响（`'pepgent-lab-settings-danger'` 类名本身及 `action.dialog === 'disconnect'` 的危险样式判断完整保留，未篡改类名体系）。
  2. `PR#88` 已合入、`Pepgent#29` 已关闭；为一个第一版不存在对应命令、运行时恒为 `false` 的死分支专门新建纠偏 issue 与 PR 往返，既无任何运行时收益，也违背工程精简原则（删除死分支而非保留无源悬空分支）。若未来 D9 新增模板删除命令，届时在 `settings-view-model.ts`、`use-settings-controller.ts` 与 `settings-page.tsx` 接入该动作时一并挂回条件即可。因此判定**【追认免票】**，不开纠偏承载还原。

### 4. QA4 & QA5（立案表决与 `(i)` 类 16 行复核）

- **QA4：** `U3`、`U5`、`U6`、`U7`、`U11` 共 5 行全部【不越界】，无需以 P1 立案表决，亦无需新建纠偏 issue。
- **QA5：** 初审第二节归为 `(i)` 的 `U1`、`U2`、`U4`、`U8`、`U9`、`U10`（共 16 行）经核对 `pr://Pepgent/Pepgent/88` diff，全部属于 `D20-02` 范围内的正常接线与死引用清理，无任何一项越界。
