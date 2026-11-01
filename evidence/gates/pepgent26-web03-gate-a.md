# 闸门 A 裁决：Pepgent#26（WEB-03）Q1–Q3 与六项工人自定处理

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#26](https://github.com/Pepgent/Pepgent/issues/26)（[评论 6562604645](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6562604645)），`PM/evidence/gates/pepgent26-web03.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`（`LEDGER.md:69`：已有 agent 制作纯前端）、`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程不收缩）、`U59`（`LEDGER.md:104`：不联系无关前端会话、不破坏其成果）；历史会话 `01a18e1f #9ff9d2be`（历史时间轴回看）、`01a18e1f #64246eaf`（状态取自真实运行权威源，不造数）、`01a18e8a #32b6f7fd` 与 `01a18e1f #7ffcea0c`（草稿与正式运行边界）。
  - `(D)` `SOR/AGENTS.md:60,123`（C2-2、禁止据缺某项把功能移入 D9）、`SOR/design/store.md:27,147,158`、`DEC/D7-lab-backend.md:77,96-97`（D7-17、页面表）、`DEC/D8-mvp-scope.md:129,337`（F10、WEB-03）、`DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D12-lab-wire.md:27,35-38,46,204-229,351-353,597-616`（D12-03..06、D12-14、无来源字段表）、`DEC/D12-coverage.md:163,190,196-199,611`、`DEC/D20-w10-path-boundary.md:12-13,31-32`（D20 Q1/Q2【定】、D20-01/02）。

---

## 一、总体判定汇总

| 编号 | 事项 | 闸门 A 分类 | 是否越界 / 是否立案 | 核心结论 |
|---|---|---|---|---|
| **Q1** | 详情页补回看、对比、派生导航、runner workspace 与交回入口 | **K1** | **不越界，不立案** | 数据驱动的工具栏动作、`DialogSpecFixture`、`artifactsAndSignals` 行与传入 `ActionDialog` 既有 `onDone` prop 均属 `D20-02` 允许的数据绑定与最少 props，不触及视觉层级或组件结构 |
| **Q2** | 被中止节点（`AbortedCall`）的状态与色调 | **K1** | **不越界，不立案** | 独立 `FlowNodeStatus = 'aborted'` + `model/**` 中映射既有 `DagCardTone` + `locales` 状态文案 + 图例无颜色圆点，满足 `WEB-03`（`D8:337`）与 `D12:27,607` 不造数，且严守 `D20-02` 不改 CSS |
| **Q3** | `F10` S2“拖动时间轴回看”与 `packages/ui/src/lab/time-axis.tsx` 归属 | **K4** | **越界，须立 P0 表决** | “拖动时间轴”是 `F10` S2（`D8:129`）明文验收语义，不能仅用按钮替代（`U2`）；需修订 `D20-01` 将 `packages/ui/src/lab/time-axis.tsx`（仅限受控游标交互属性，不改视觉样式）划入 `W-10` 白名单 |
| **①** | 实验列表时间窗默认值（以 `now` 为中心本地当天 4 小时，不跨日） | **K3 + K2** | **不越界，不立案** | `D12-05` 规定时间窗由客户端给出；默认 4 小时窗口属客户端实现选择，跨日属主路径外情形 |
| **②** | 泳道计划条留空并移入 D9 | **K4** | **越界，须立 P0 表决** | **严禁移入 D9**（`D7:96`、`D12-06`、`D12-coverage.md:163` 已定为投影计算 `C`，不在 `D12:597-616` 无来源表中）。且 `LabPageWire.experiments`（`D12:351`）漏带了 `definitions: NodeDefinition[]`（导致草稿节点无从关联默认 `estimateMinutes` 与 `template` 设备泳道），须并入 P0 补齐 `experiments.definitions` 与拓扑计划起点锚点规则 |
| **③** | 在途与已提交节点按 `version` 关联 `NodeDefinition` | 过渡 **K1**；缺口 **K4** | **过渡不越界；wire 缺口须立 P0 表决** | 过渡期不拿默认分支 `NodeDefinition` 冒充历史/在途版本符合 `D12-14` 与不造数（K1）；但 `D12-06`（`:353` 无版本 `definitions`）与 `D12-14`（`:46` 按 `version` 关联）正文冲突，须立 P0 补齐版本化定义线数据 |
| **④** | 详情页 `$runId` loader 按目录判定 `run / draft` | **K3 + K2** | **不越界，不立案** | 符合 `D12-05`、`D12-06`，两类不透明 id 碰撞属主路径外情形 |
| **⑤** | 切换 Lab 写入 Better Auth `activeOrganization` | 自定方案 **K4**（驳回）；既有契约 **K1** | **驳回自定方案；按 `D12-03` 客户端传参不立案** | 工人自定写服务端 Better Auth 会话既改变状态权威与生命周期（`D10-08`），又与 `D12-03`“null 取首 Lab”及 `server/lab/catalog.ts:47`（不读 `activeOrganizationId`）冲突。驳回后按 `D12-03`/`D12-04` 由客户端持有 `selectedLabId: LabId \| null` 传给 `readCatalog(selectedLabId)`，属 K1 无需立案 |
| **⑥** | 投影单测使用现有真实录制，`AbortedCall`/`derivedFrom` 录制随 `#30` 补测 | **K1** | **不越界，不立案** | 投影代码本切片必须实现 `AbortedCall` 与 `derivedFrom`；跨组件录制输入留在 `#30`（`F24`）符合 `D16-06`/`D16-13` |

---

## 二、对 §二（Q1–Q3）的逐项裁定

### Q1：详情页补回看、对比、派生导航、runner workspace 与交回的入口
- **A 答复：** **不触及 `D20-02` 的“视觉层级、组件结构”意图（属 K1，不越界）。**
  - 依 `D20-02`（`DEC/D20-w10-path-boundary.md:32`），`W-10` 在 `features/lab-*/ui/**` 中负责“真实数据取数……把 reducer 动作接到 LabCommand（D7-17）；以及完成上述各项所需的最少 props 和条件渲染”。
  - `experiment-detail-page.tsx:122-129,209-215` 的工具栏与 `ActionDialog` 本就是由 `view.toolbar` 和 `controller.dialog` 数据驱动；`UI/action-dialog.tsx:203-220` 已定义可选 `onDone` 属性，在调用处传入 `onDone` 不修改 `packages/ui`；Runner Workspace 文件清单放入已有的 `node.detail.artifactsAndSignals` 行。三者均不改动 CSS、类名、布局或组件结构，新增文案写在 `locales/lab-experiment-detail-copy.ts`，并在 PR 正文按 `D20-02` 逐行列出 UI 改动即可。

### Q2：被中止节点的状态色
- **A 答复：** **满足 `WEB-03`（`G-4`）且不触及 `D20-02`“视觉层级”意图（属 K1，不越界，无需立案）。**
  - `SOR/design/store.md:147` 与 `WEB-03`（`DEC/D8-mvp-scope.md:337`）要求保留 `AbortedCall` 独立变体并投影出被中止的节点，未规定专属 CSS 颜色；`DEC/D12-lab-wire.md:27,607` 与 `DEC/D12-coverage.md:190` 明确禁止借用无来源判据状态 `failed_verdict` 或 `flagged` 冒充被中止。
  - 在 `FlowNodeStatus`（`client/**`）定义独立的 `'aborted'`、在 `model/experiment-detail-view-model.ts` 的 `NODE_TONE` 中映射到已有 `DagCardTone`（`'error'`）、在 `locales/lab-experiment-detail-copy.ts` 增加状态文案，而图例与状态标签保持无颜色圆点、靠文案区分，完全落在 `D20-01` 白名单与 `D20-02`“最少 props 和条件渲染”之内，无需修改 `renderer/styles/lab/**`。

### Q3：`F10` 要求的“拖动时间轴回看”
- **A 答复：** **是验收语义，不能仅用“回看到这一步”按钮代替（属 K4，越界，须立 P0 表决）。**
  - `(U) 01a18e1f #9ff9d2be`、`U2`（全流程不收缩）及已表决的 `DEC/D8-mvp-scope.md:129`（`F10` S2：“实验详情页拖动时间轴，看到与 `at=k` 一致的节点集合”）、`PM/evidence/argon/flow-catalog.md:194`（“人类用户在 GUI 实验详情页拖动时间轴滑块”）明确将时间轴游标拖动/点选回看定为 S2 验收行为。工具栏“回看到这一步”动作可作为辅助入口保留，但不能替代时间轴本身的交互。
  - 依 `D20` Q1【定】（`DEC/D20-w10-path-boundary.md:12`：`U59` 与 `C5-3.2` 只保护不破坏、不回滚 `U59` 已合入成果，不表示其改过的文件永久不得再改），应通过 P0 议案修订 `D20-01`，将 `packages/ui/src/lab/time-axis.tsx`（及必要的 `packages/ui/src/lab/time-axis-model.ts`）划给 `W-10`，仅限为 `GanttTimeAxis` / `GanttNowChip` 补入时间轴回看游标的受控位置与拖动/点选回调 prop，严禁改动其 CSS、类名、布局与视觉外观。

---

## 三、对 §三（`A-②`、`A-③`、`A-⑤`、`A-①④⑥`）的逐项裁定

### `A-②`：泳道计划条是否属于 `D12-06`、`D7:96` 已定的页面功能，不能由工人自定留空、移入 D9？
- **裁定：** **是，属 K4，严禁由工人自定留空或移入 D9，必须并入 P0 议案补齐。**
  1. **范围与意图依据：** `DEC/D7-lab-backend.md:96`、`DEC/D12-lab-wire.md:38`（`D12-06`：“计划时段取草稿节点估时（缺省用节点定义的 `estimateMinutes`）；冲突由投影算出”）与 `DEC/D12-coverage.md:163`（列为 `C`：“以页面计划锚点累计 `DraftNode.estimateMinutes`；只标 `planned`，不冒充实际执行”）均已明确草稿计划条是 `/experiments` 泳道图的必达功能，不在 `D12:597-616`“第一版无来源字段（列入 D9 输入）”之中（`D7:96` 列入 D9 的是“仪器排期仲裁”，而非计划条展示与投影冲突计算）。按 `SOR/AGENTS.md:123` 与 `D10-08`，工人不得自行将其移入 D9。
  2. **同时发现的线协议缺口（须在同张 P0 议案一并补齐）：** `DraftNode`（`DEC/D12-lab-wire.md:204-212`）只存 `fn: FnName` 与 `estimateMinutes: number | null`，不存 `template`；节点的默认 `estimateMinutes` 与 `template: TemplateName | null`（用于关联 `templates[].metadata.devices` 归入设备泳道）均在 `NodeDefinition`（`:221-229`）中。但 `D12-06` 的 `LabPageWire['experiments']`（`:351`）只写了 `{ templates: TemplateWire[]; panels: ConversationWire[] }`，漏带了 `definitions: NodeDefinition[]`（对比 `:353` `experiment`、`:354` `flowEditor` 均带了节点定义）。
  3. **P0 议案应规定的主案：**
     - 在 `LabPageWire['experiments']`（及 `server/lab/operations.ts#readExperiments`）补入 `definitions: NodeDefinition[]`（直接复用 `context.library.read(lab)` 的 `library.output.nodes`）；
     - 规定客户端 `projectExperimentsPage` 的计划条投影规则：对每个草稿（未启动草稿，或 `Open` 运行绑定的草稿中尚未完成的节点），草稿节点通过 `fn` 关联 `definitions` 取 `template`（映射到 `templates` 的设备泳道）及默认 `estimateMinutes`（`duration = node.estimateMinutes ?? definition.estimateMinutes`，`≤ 0` 不画条）；计划起点按 `DraftNode.from` 拓扑顺序累加（未启动草稿的根起点取 `pendingLaunch.at` 与 `window.now` 的较晚者，无 `pendingLaunch` 取 `window.now`；已绑定 `Open` 运行的未完成草稿节点取其上游实际/在途/计划结束时刻与 `window.now` 的较晚者），产出 `kind: 'planned'` 的区间并参与同设备跨实验重叠冲突（`kind: 'conflict'`）判定。

### `A-③`：`D12-06` 的 `definitions` 与 `D12-14` 的“按 `version` 关联”冲突，是否需要表决补齐线协议？
- **裁定：** **是，过渡做法属 K1（不阻塞当前投影实现），但线协议缺口属 K4，须立 P0 表决补齐。**
  1. **过渡期（K1）：** 在线协议补齐前，草稿节点引用库默认分支，照常使用 `experiment.definitions`；已提交调用（`Call`）从 `GraphEdge` 与 `Root.value`/`Call.outputs` 解出实际传入的参数值，在途槽位（`SlotWire`）从 `SlotState.inputs` 解出实际传入的输入 atom 名，不拿无版本键的默认分支 `NodeDefinition` 冒充历史或在途 `version` 的默认参数，符合 `D12-14` 与 `D12:27` 不造数原则。
  2. **线协议缺口（K4）：** `D12-14`（`DEC/D12-lab-wire.md:46`）明定“投影按 `version` 关联节点定义，不用当前库默认分支代替”，而 `D12-06`（`:353`）的 `experiment.definitions: NodeDefinition[]` 无版本键且服务端只读默认分支，两条正文直接矛盾。需在 P0 议案中修订 `D12-06`（例如在 `LabPageWire['experiment']` 增加按运行图中 `Call.version` 与在途 `SlotState.version` 解析的版本化定义列表 `versionedDefinitions: { version: Version; definition: NodeDefinition }[]`：已提交版本由服务端从 store `GET /versions/{version}` 的 `entry` 对象或 `commit` 静态导出，尚未提交的在途版本从所属会话 `worktree` 静态导出；`definitions` 保留给草稿默认分支使用）。

### `A-⑤`：把“所选 Lab”改为随登录会话保留、多标签页共享，是否触及产品意图或状态权威？
- **裁定：** **触及状态权威与生命周期（工人自定方案属 K4 越界，予以驳回）；按既有 `D12-03`/`D12-04` 在客户端持有 `selectedLabId` 传参属 K1（无需立案）。**
  1. **为何驳回工人自定方案：**
     - `D12-03`（`DEC/D12-lab-wire.md:35`）已明文规定：`catalog.read{lab:LabId或null}（null 取当前用户首 Lab）`、`page.read{lab,page,params}`；服务端 `WT/apps/web/src/server/lab/catalog.ts:47`（归 `W-09`）也严格按此实现了 `const lab = input.lab ?? LabIdSchema.parse(organizations[0]?.id)`，根本不读取 Better Auth 会话的 `activeOrganizationId`。
     - 原型契约 `WT/apps/web/src/renderer/application/lab-runtime.tsx:14-16` 同样写明：“the selected lab and projects in focus start from the fixture defaults on every page load”。
     - 工人自定把页面级“所选 Lab”改为写入 Better Auth 会话 `activeOrganization`，不仅越权改变了 `D10-08` 规定的“状态权威与生命周期”，而且在 `_lab.tsx:59` 传 `readCatalog(null)` 时服务端仍只会返回 `organizations[0]`，导致切换 Lab 在服务端读取上根本不生效。
  2. **既有契约做法（K1，免票直接执行）：**
     - 按 `D12-03`、`D12-04` 与 `lab-runtime.tsx:14-16`，当前所选 `labId: LabId | null` 由客户端/renderer 持有（页面初次加载为 `null`，`_lab.tsx` loader 调 `readCatalog(null)` 得到首 Lab `catalog.lab`；用户在界面调用 `selectLab(nextLabId)` 时更新客户端所持 `selectedLabId`，并使 router 失效，令 `_lab.tsx` loader 以 `readCatalog(selectedLabId)` 重读、各子路由以新 `catalog.lab` 重读 `readPage`、SSE 重新订阅 `subscribe(catalog.lab)`）。这完全在 `D20-01` 的 `W-10` 白名单（`_lab.tsx`、`lab-runtime.tsx`、`client/**`）内，无需改动服务端或立案表决。

### `A-①④⑥`：是否同意初分类（①④ 属 K3，⑥ 属 K1）？
- **裁定：** **完全同意。** ①（客户端默认 4 小时当天时间窗）、④（`$runId` loader 按目录判定 `run` 与未绑定 `draft`）、⑥（投影代码本切片完整实现 `AbortedCall` 与 `derivedFrom`，跨组件录制输入在 `#30` `F24` 补测）均未越过既有决策正文，不立案。
