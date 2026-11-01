# D20 前端路径域代码事实

> 取证基线：`origin/main`（已先执行 `git -C /Users/mouriya/Ext/worktrees/pepgent-web-clone fetch -q origin`）。以下行号均来自该基线；未修改克隆仓库。`client/contracts/*` 的 `import type` 只证明 UI 依赖领域类型，不等于 UI 在该文件中直接读取快照。

## 1. `renderer/application/contracts/` 中与 Lab 相关的文件

按题目给出的判断依据（`LabSnapshot`、`LAB_SNAPSHOT`、`client/contracts`、`client/services/lab` 或 Lab 类型）逐文件核对后，命中如下：

### 1.1 实际承载 Lab 快照/本地化数据契约的文件

- `apps/web/src/renderer/application/contracts/lab-session.tsx`
  - 这是快照进入 renderer 共享状态的契约：注释明确说 `LabSnapshot` 由 PepgentBridge 的 lab namespace 每页读取一次：`apps/web/src/renderer/application/contracts/lab-session.tsx:10-11`。
  - 导入 Lab 领域类型和 `LabSnapshot`：`apps/web/src/renderer/application/contracts/lab-session.tsx:15-18`。
  - `LabServices.snapshot` 与 `LabSession.snapshot` 均为 `LabSnapshot`：`apps/web/src/renderer/application/contracts/lab-session.tsx:33-45`。
  - 结论：这是 `LabSnapshot` 的 application contract；它本身不导入 `LAB_SNAPSHOT` 实例，也不导入 `client/services/lab`。

- `apps/web/src/renderer/application/contracts/lab-localizer.ts`
  - 导入 `LabLocale`、`LabString`、`ProjectId` 以及 Lab 文本解析/本地化函数：`apps/web/src/renderer/application/contracts/lab-localizer.ts:1-2`。
  - `LabLocalizer` 暴露 `string` 和递归 `resolve`，供 fixture/view-model 文本解析：`apps/web/src/renderer/application/contracts/lab-localizer.ts:9-22`。
  - 结论：这是 Lab 类型/文本读取辅助契约，但不读取 `LabSnapshot` 实例。

### 1.2 按“引用 `client/contracts` 或 Lab 类型”字面命中的其它文件

- `apps/web/src/renderer/application/contracts/destination.ts`
  - 定义 Lab 路由类型 `LabSettingsTab` 和 `LabPage`：`apps/web/src/renderer/application/contracts/destination.ts:30-62`。
  - 结论：命中“Lab 类型”，但它是路径编解码/路由契约，不读取 Lab 数据、`LabSnapshot` 或 `LAB_SNAPSHOT`。

- `apps/web/src/renderer/application/contracts/composer-mentions.tsx`
  - 引用了 `client/contracts/runtime.js` 的 `InvocableSkillEntry`：`apps/web/src/renderer/application/contracts/composer-mentions.tsx:3-5`。
  - 结论：按“引用 `client/contracts`”的宽匹配会命中，但该类型属于 composer skills，不是 Lab 数据；文件没有 Lab 类型、`LabSnapshot`、`LAB_SNAPSHOT` 或 `client/services/lab`。

### 1.3 未命中的明确项

- `apps/web/src/renderer/application/contracts/` 下没有 `LAB_SNAPSHOT` 引用：`git grep -n 'LAB_SNAPSHOT' origin/main -- apps/web/src/renderer/application/contracts` 无结果。
- `apps/web/src/renderer/application/contracts/` 下没有 `client/services/lab`（或 `services/lab`）引用：`git grep -n -E 'client/services/lab|services/lab' origin/main -- apps/web/src/renderer/application/contracts` 无结果。

### 1.4 `renderer/application/lab-runtime.tsx` 导入的模块

`apps/web/src/renderer/application/lab-runtime.tsx` 的 import 模块完整清单：

- `react`：`useCallback`、`useMemo`、`useState`、`ReactNode`，`apps/web/src/renderer/application/lab-runtime.tsx:1`。
- `../../client/contracts/lab-common.js`：`LabId`、`ProjectId`，`apps/web/src/renderer/application/lab-runtime.tsx:2`。
- `./contracts/destination.js`：`LabPage`，`apps/web/src/renderer/application/lab-runtime.tsx:3`。
- `./contracts/navigation-port.js`：`useDestination`，`apps/web/src/renderer/application/lab-runtime.tsx:4`。
- `./contracts/lab-session.js`：`LabSessionProvider`、`LabPreferences`、`LabServices`、`LabSession`，`apps/web/src/renderer/application/lab-runtime.tsx:5-10`。

运行时数据边界：`LabRuntime` 从 `services` 取 `snapshot` 并以它初始化 selected lab/focused projects：`apps/web/src/renderer/application/lab-runtime.tsx:18-22`；随后把 `snapshot` 放入 `LabSession`：`apps/web/src/renderer/application/lab-runtime.tsx:33-38`。平台服务把 `bridge.lab.readSnapshot()` 组装成 `LabServices.snapshot`：`apps/web/src/renderer/platform/web/create-lab-services.ts:40-48`。

## 2. `apps/web/src/renderer/features/lab-*/ui/**` 每个文件的数据来源

先给全局结论：这 16 个 UI 文件中没有文件直接 import `LAB_SNAPSHOT`、`LabSnapshot`、`client/services/lab` 或 `lab-runtime`。UI 侧的共享快照入口是 `useLabSession()`（其类型/快照契约见 `apps/web/src/renderer/application/contracts/lab-session.tsx:41-65`）。其中：

- 纯 controller 页面通过同 feature 的 `use…Controller()` 取得 `state/view/copy`；controller 再调用 `useLabSession()` 并把 `session.snapshot` 交给同 feature 的 view-model（例如 automation controller：`apps/web/src/renderer/features/lab-automation/controller/use-automation-controller.ts:25-38`）。
- 部分页面/嵌套 UI 直接从 `useLabSession()` 的 `session.snapshot` 读取字段；这不是直接读取 `LAB_SNAPSHOT`，而是通过 `lab-session` hook 读取 runtime 注入的 session。
- 下面的 `client/contracts/*` 标注均为 UI 中的类型 import；若同一行另列 controller/model，运行时数据仍按后者取得。

### 2.1 逐文件结论

1. **`apps/web/src/renderer/features/lab-automation/ui/automation-page.tsx`**
   - 结论：`AutomationId` 是 `client/contracts/*` 的类型引用，但页面数据只经同 feature controller/model 取得；不直接读取 `LAB_SNAPSHOT`、`LabSnapshot`、`client/services/lab` 或 `lab-runtime`。
   - 决定性 imports：`client/contracts/lab-workspace.js` 类型 `AutomationId`：`apps/web/src/renderer/features/lab-automation/ui/automation-page.tsx:18`；Lab session/chrome hook：`:19`；同 feature controller：`:22`；同 feature view-model 的语义/行类型：`:23`。
   - 取数使用：页面调用 `useLabSession()` 和 `useAutomationController()`，从 `controller.state/view/copy` 渲染：`apps/web/src/renderer/features/lab-automation/ui/automation-page.tsx:26-33`。其中 session 在 UI 这里只用于 locale/chrome（`:30-31`），领域列表/详情来自 controller。

2. **`apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx`**
   - 结论：直接 import `client/contracts/lab-compute.js` 的若干类型，但仅作为表格/对话框类型；实际数据来自 `useClustersController()` 返回的 `view/fixture/copy`，并由同 feature model 常量辅助渲染。UI 不直接读取快照/服务。
   - 决定性 imports：`client/contracts/lab-compute.js` 类型：`apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx:19-24`；controller：`:25`；model：`:26`。
   - 取数使用：controller 解构发生在 `apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx:36-50`，页面从 `view`、`copy`、`fixture` 等 controller 字段渲染（例如 `view.cluster/view.selected`：`:51-54`）。controller 的 fixture 源自 `useLabSession().snapshot.clusters`：`apps/web/src/renderer/features/lab-clusters/controller/use-clusters-controller.ts:16-25`。

3. **`apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx`**
   - 结论：直接 import `client/contracts/lab-compute.js` 的 `ConnectClusterFixture`、`WizardPath` 类型；页面实际通过同 feature `useConnectClusterController()` 的 `state/view/fixture/copy` 取数，并用 `lab-session` hook 做导航/外壳。没有直接引用快照实例或服务。
   - 决定性 imports：`client/contracts/lab-compute.js` 类型：`apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx:18-21`；`useLabFrameChrome/useLabNavigation/useLabSession`：`:22-26`；controller：`:28-31`；view-model：`:32-39`。
   - 取数使用：页面建立 session/navigation/controller 并从 controller 解构：`apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx:42-49`；后续 `Chooser`、`Wizard` 等子组件均通过 `controller` props 取得数据（`:60`、`:113-115`、`:121-122`、`:317-318`）。controller 的 fixture 来自 `session.snapshot.connectCluster`：`apps/web/src/renderer/features/lab-connect-cluster/controller/use-connect-cluster-controller.ts:30-37`。

4. **`apps/web/src/renderer/features/lab-containers/ui/containers-page.tsx`**
   - 结论：没有 `client/contracts/*`、`LabSnapshot` 或服务 import；领域数据只通过同 feature `useContainersController()` 的 `state/view/copy/dispatch`，同 feature model 只提供语义常量和 state 类型。`useLabSession()` 在 UI 只提供 shell/chrome/navigation 所需的共享状态。
   - 决定性 imports：Lab session hooks：`apps/web/src/renderer/features/lab-containers/ui/containers-page.tsx:19-23`；controller：`:25-28`；model/state：`:29-30`。
   - 取数使用：controller 在页面中先于 session 取得并解构：`apps/web/src/renderer/features/lab-containers/ui/containers-page.tsx:61-68`；子区块均以 `controller` props 传递（`:104`、`:313-322`）。controller 读取 session snapshot 并生成 view：`apps/web/src/renderer/features/lab-containers/controller/use-containers-controller.ts:21-28`。

5. **`apps/web/src/renderer/features/lab-datasets/ui/datasets-page.tsx`**
   - 结论：没有直接 import `client/contracts/*`、`LabSnapshot`、`client/services/lab`；数据来自同 feature controller 的 `state/view/copy`，view-model import 仅提供行/详情类型、语义和转换函数。session hook 负责 locale/chrome。
   - 决定性 imports：Lab session hooks：`apps/web/src/renderer/features/lab-datasets/ui/datasets-page.tsx:21`；controller：`:24`；view-model：`:25-31`。
   - 取数使用：`useDatasetsController()` 与 `controller.state/view/copy`：`apps/web/src/renderer/features/lab-datasets/ui/datasets-page.tsx:34-40`；`view.sources/view.facets` 等均从 controller view 渲染：`:78-120`。controller 将 `session.snapshot` 交给 `datasetsViewModel`：`apps/web/src/renderer/features/lab-datasets/controller/use-datasets-controller.ts:28-35`。

6. **`apps/web/src/renderer/features/lab-discussions/ui/discussion-icons.tsx`**
   - 结论：这是纯 SVG 图标工厂，不读取 Lab 数据；唯一输入是 SVG `props`，没有 controller、model、`client/contracts`、services 或 Lab session import。
   - 决定性 import/props：仅 import `SVGProps`：`apps/web/src/renderer/features/lab-discussions/ui/discussion-icons.tsx:1`；工厂接收并展开 `props`：`:8-19`；导出的图标常量只是静态 path：`:27-32`。

7. **`apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx`**
   - 结论：混合来源。讨论主列表/线程状态来自同 feature `useDiscussionsController()` 和 `discussions-view-model`；此外三个嵌套 UI 组件直接通过 `useLabSession()` 读取 `session.snapshot.members/discussions` 的当前用户信息。`DiscussionId`、`FilePreview` 是 `client/contracts/*` 类型引用，不是直接快照读取。
   - 决定性 imports：`client/contracts/lab-common.js`、`client/contracts/lab-workspace.js` 类型：`apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx:21-22`；session/navigation/chrome：`:23-24`；controller：`:27`；view-model：`:28-34`。
   - controller/model 入口：页面调用 session 与 `useDiscussionsController`：`apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx:49-57`，并把 controller 放进 `PageContext`：`:59-69`。
   - 直接 session snapshot 读取：用户成员显示在 `:395-397`、`:408-409`、`:937-939`。因此该文件不能归为“完全只经 controller/model”；它是“controller/model 主数据 + session hook 直接读取少量 snapshot 字段”。

8. **`apps/web/src/renderer/features/lab-experiment-detail/ui/experiment-detail-page.tsx`**
   - 结论：混合来源。路由页先用 `useLabSession()` 的 `session.snapshot.experimentFlows` 调同 feature model 的 `detailFlow` 选出 `flow`，再把 `flow` 作为 props 交给同 feature controller；其余详情 view/state 来自 controller。`ExperimentFlowFixture` 是 `client/contracts/*` 类型 import。
   - 决定性 imports：`client/contracts/lab-experiments.js` 类型：`apps/web/src/renderer/features/lab-experiment-detail/ui/experiment-detail-page.tsx:19`；session hooks：`:20`；controller：`:26-29`；view-model：`:30`。
   - 直接 session snapshot → model：`apps/web/src/renderer/features/lab-experiment-detail/ui/experiment-detail-page.tsx:33-36`；controller 接收 `flow` 并提供其余 view/state：`:57-64`。因此是“session hook 直接取快照字段 + controller/model”，不是 UI 直接 import `LAB_SNAPSHOT`。

9. **`apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx`**
   - 结论：没有 `client/contracts/*`、`LabSnapshot` 或 service import；实验列表/筛选/AI 数据全部经同 feature `useExperimentsController()` 的 `state/view/filters/conversation/models`，model import 只提供展示语义和行类型。session hook 只用于偏好、导航和 chrome。
   - 决定性 imports：Lab session hooks：`apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx:21`；controller：`:24`；view-model：`:25`。
   - 取数使用：页面调用 session/navigation/controller 并解构 controller：`apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx:33-43`；表格筛选和 rows 使用 controller 字段（如 `controller.filters`：`:67-76`）。controller 内部从 `useLabSession()` 快照构造 view：`apps/web/src/renderer/features/lab-experiments/controller/use-experiments-controller.ts:12-19`。

10. **`apps/web/src/renderer/features/lab-flow-editor/ui/flow-editor-page.tsx`**
    - 结论：混合来源。页面直接经 `useLabSession()` 读取 `snapshot.flowEditor` 和 `snapshot.projects`，再结合同 feature controller/model 的编辑状态、候选行和本地化 view；不直接 import `LabSnapshot` 或 `LAB_SNAPSHOT`。
    - 决定性 imports：session hooks：`apps/web/src/renderer/features/lab-flow-editor/ui/flow-editor-page.tsx:25`；controller：`:28`；view-model：`:29`。
    - 直接 session snapshot 读取：`apps/web/src/renderer/features/lab-flow-editor/ui/flow-editor-page.tsx:31-43`（尤其 `:40-41`）；编辑器其余数据由 `controller` 解构和传给子组件：`:34-35`、`:67-75`、`:280-286`。controller 也从 session snapshot 取 `flowEditor` 并构造 view：`apps/web/src/renderer/features/lab-flow-editor/controller/use-flow-editor-controller.ts:29-35`。

11. **`apps/web/src/renderer/features/lab-home/ui/home-page.tsx`**
    - 结论：混合来源。`HomeReport` 是 `client/contracts/*` 的类型引用；页面直接经 `useLabSession()` 读取 projects/home 字段，同时主 feed/overview 等 view/state 来自同 feature controller/model。
    - 决定性 imports：`client/contracts/lab-home.js` 类型：`apps/web/src/renderer/features/lab-home/ui/home-page.tsx:21`；session hooks：`:22`；`LabLocalizer` 类型：`:23`；controller：`:26`；view-model：`:27-34`。
    - 直接 session snapshot 读取：project lookup `:51-53`，更新时间 `:91`，quote `:205`，overview 的 progress/clusters `:540-543`。controller 入口和主 view：`apps/web/src/renderer/features/lab-home/ui/home-page.tsx:40-50`、`:72-82`；controller 本身把 snapshot 传入 `homeViewModel`：`apps/web/src/renderer/features/lab-home/controller/use-home-controller.ts:25-32`。

12. **`apps/web/src/renderer/features/lab-navigation/ui/lab-menu.tsx`**
    - 结论：不经过 feature controller；直接通过 `useLabSession()` 读取 account/members/projects/labs/current lab，再把 projects 交给同 feature 的 `focusPickerRows` model。`labLocalizer` 只负责字符串解析，`onClose` 是 props。
    - 决定性 imports：session/navigation：`apps/web/src/renderer/features/lab-navigation/ui/lab-menu.tsx:5`；localizer：`:6`；同 feature model：`:8`。
    - 直接 session snapshot 读取：member/projects 派生 rows `:18-25`，account `:34-36`，lab/account 元数据 `:41-50`，lab 列表 `:101-115`。因此该文件是“session hook + model helper”，不是“controller/view-model hook”。

13. **`apps/web/src/renderer/features/lab-navigation/ui/lab-navigation.tsx`**
    - 结论：不经过 feature controller；通过 `useLabSession()` 读取当前 lab/account/projects，再通过同 feature `labNavigationModel` 生成导航项；`LabPage` 只是 application route 类型，`LabMenu` 是子 UI。
    - 决定性 imports：session/navigation：`apps/web/src/renderer/features/lab-navigation/ui/lab-navigation.tsx:6`；localizer：`:7`；`LabPage` 路由类型：`:8`；navigation model 和子菜单：`:10-11`。
    - 直接 session snapshot 读取：成员及 focus project lookup `:21-33`，当前用户显示 `:69-76`。导航 model 调用在 `:22-28`，所以数据路径是“session hook + navigation model”，无 Lab controller。

14. **`apps/web/src/renderer/features/lab-node-library/ui/node-library-page.tsx`**
    - 结论：没有 `client/contracts/*`、`LabSnapshot` 或 service import；UI 直接从 `useLabSession()` 只取 `preferences` 作为 shell/chrome，节点库领域数据来自同 feature `useNodeLibraryController()` 的 `state/view/copy/dispatch`，view-model import 提供语义和视图类型。
    - 决定性 imports：session hooks：`apps/web/src/renderer/features/lab-node-library/ui/node-library-page.tsx:23`；controller：`:26`；view-model：`:27-31`。
    - 取数使用：session 只解构 preferences：`apps/web/src/renderer/features/lab-node-library/ui/node-library-page.tsx:73-80`；AI、列表、impact 等均从 controller：`:97-103`、`:147`、`:295`、`:318-319`、`:447-457`。controller 内部用 snapshot 生成 node-library view：`apps/web/src/renderer/features/lab-node-library/controller/use-node-library-controller.ts:26-40`。

15. **`apps/web/src/renderer/features/lab-settings/ui/settings-page.tsx`**
    - 结论：没有 `client/contracts/*`、`LabSnapshot` 或 service import；`LabSettingsTab` 是 route 类型。settings 页面数据只经同 feature `useSettingsController(tab)` 的 `state/view/copy/shell` 和 model view 类型取得；`useLabNavigation/useLabFrameChrome` 只负责壳层。
    - 决定性 imports：route 类型：`apps/web/src/renderer/features/lab-settings/ui/settings-page.tsx:20`；session chrome/navigation：`:21`；controller：`:22-25`；view-model：`:26-34`。
    - 取数使用：controller 解构和 chrome 构造：`apps/web/src/renderer/features/lab-settings/ui/settings-page.tsx:36-40`；详情、编辑器、表格子组件均通过 `controller` props：`:76`、`:83`、`:139`、`:164`、`:190-198`、`:232-237`。controller 内部才以 `session.snapshot` 调 `settingsViewModel`：`apps/web/src/renderer/features/lab-settings/controller/use-settings-controller.ts:39-54`。

16. **`apps/web/src/renderer/features/lab-sign-in/ui/lab-sign-in-page.tsx`**
    - 结论：这是唯一直接从 `services` props 取数/执行动作的 UI 文件；它不使用 Lab session、controller 或 view-model 数据 hook。`LabSignInCredentials` 是 `client/contracts/lab-auth.js` 类型，`LabSignInServices` 是同 feature model 中的 service contract。
    - 决定性 imports：`client/contracts/lab-auth.js` 类型：`apps/web/src/renderer/features/lab-sign-in/ui/lab-sign-in-page.tsx:3`；return path 类型：`:4`；同 feature service contract：`:6`。
    - services props 与直接调用：props 在 `apps/web/src/renderer/features/lab-sign-in/ui/lab-sign-in-page.tsx:13`，读取 locale `:14`，调用 `services.signIn(credentials)` `:19-24`，成功后调用 `services.navigate(returnTo)` `:24-27`。因此它属于“直接经 services prop 取数据/提交”，不是 controller/model view-model 路径。

## 3. 全仓 `LAB_SNAPSHOT` 引用（排除 tests）

在 `origin/main` 全仓搜索 `LAB_SNAPSHOT`，排除 `tests`/测试文件后，只有以下 3 处：

1. **定义**：`apps/web/src/client/services/lab-fixture/index.ts:10` — `export const LAB_SNAPSHOT: LabSnapshot = {`。
2. **导入**：`apps/web/src/client/services/lab.ts:2` — `import { LAB_SNAPSHOT } from './lab-fixture/index.js';`。
3. **桥接返回**：`apps/web/src/client/services/lab.ts:13` — `return { readSnapshot: () => LAB_SNAPSHOT };`。

这与 renderer 入口的链路一致：`createLabServices` 在 `apps/web/src/renderer/platform/web/create-lab-services.ts:45-48` 调 `bridge.lab.readSnapshot()`；`LabRuntime` 在 `apps/web/src/renderer/application/lab-runtime.tsx:18-22` 接收 `services.snapshot`，并在 `:33-38` 发布到 `LabSession`。因此 UI 文件中看到的是 `useLabSession().snapshot` 或 controller/model 派生值，而不是 UI 直接引用 `LAB_SNAPSHOT`。
