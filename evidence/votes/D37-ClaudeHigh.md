# D37 选票：ClaudeHigh

议程：Pepgent#25 WEB-05：GUI 文件型交回字段的采集方式（自动化页与详情页）（[Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D37-01 v1：反对（ClaudeHighD37，2026-11-01T20:38:51.614Z）——作废：该行已修订到 v2

**反例：** **反例（D37-01 v1，主路径失效）：交回人在 GUI 上拿不到任何可以粘贴的 `ArtifactRef` 串，文件型交回在两页主路径上都走不通。**

源码基线：`Pepgent/Pepgent` main `69067d871937fe816652082daa9fd836a4e4683e`（经 `gh api repos/Pepgent/Pepgent/tarball/<sha>` 取得）。以下路径都相对 `apps/web/src/`。

复现步骤（只走主路径，不涉及边缘情况）：
1. 自动化页或详情页上有一个 `awaiting_human` 槽位，其 shape 含 file 字段。owner 点运行行的交回按钮。按 D37-01，对话框给出 `kind: 'text'`、`mono: true` 的字段，提示“接受 `store:<Hash>` 或 `discussion:<DiscussionArtifactId>`”。
2. 交回人需要一个引用串。D37-01 “how”第 3 条列出三个来源，并写明“不新增入口”。下面逐一在 GUI 上核对：
   - **D12-13 上传返回的 `ArtifactMetaWire.id`：** `LabBridge.uploadArtifact` 只在 `client/services/lab.ts:105` 实现、在 `protocol/lab/pages.ts:265` 声明，`renderer/**` 下没有任何调用（`grep -rn uploadArtifact renderer` 无结果）。自动化页、详情页都没有上传入口，D37-01 也不新增。Lab 页面中唯一的文件按钮是讨论页输入框的 `AttachIcon` 按钮（`renderer/features/lab-discussions/ui/discussions-page.tsx:572`），它没有 `onClick`，也没有任何切片负责接线：D8 的 WEB-04、WEB-07 两行都没写，LAB-11a 的“附件”只指后端。上传接口按会话划分（`POST /api/lab/conversations/{conversation}/artifacts`，要求 `write` 权限且调用者是该会话的 owner，`DEC/D12-lab-wire.md:581`），GUI 里没有任何地方会触发它。
   - **datasets 页 `artifacts[].id`：** 数据集页的产物表只有 type、artifact（名称）、owner、origin、role、verdict、used、size、time 九列，不显示产物 id（`renderer/features/lab-datasets/ui/datasets-page.tsx:239-324` 的 `artifactColumns`）。行提示拼接的是名称、所属与来源、来源说明、项目、容器与镜像（`model/datasets-view-model.ts:280-287`），同样没有 id。页面上以 mono 显示的 `row.id` 是分组列中所属运行或讨论的 id（`datasets-page.tsx:334-335`，`DatasetGroup`）；引用区的 `ref.id` 是讨论 id（`:464`）。这两个都不是 `ArtifactRef`。
   - **运行产物 `store:<Hash>`：** `renderer/features/lab-{experiment-detail,automation,discussions,datasets}` 中没有任何地方渲染 hash、`store:` 或 `discussion:`。`grep -rni 'hash\|store:\|discussion:'` 只命中讨论 id 和讨论记录类型。`client/**`、`renderer/**` 里也没有任何代码引用 `ArtifactRef`（`grep -rln ArtifactRef client renderer` 无结果）。`StoreArtifactRefSchema` 只出现在 `protocol/lab/ids.ts:46-49`。
3. 结论：交回人面对的文本框只接受引用串，而 13 个 Lab 页面没有一处能让他看到、复制或生成这个串。行中“得到”一栏写的“D12-11 允许的文件型交回在两页主路径上可用”在 GUI 上不成立。代价一栏写“交回人要粘贴引用串”，前提是这个串拿得到，但正文没有给出任何能拿到它的 GUI 位置。三个“来源”都是 wire 层的事实（`DEC/D12-lab-wire.md:183,376,581`），GUI 上看不到。

这不是边缘情况。file 型 shape 只有这一条主路径，而它依赖的是一个确定、可以核对的设计选择：“不新增入口”，同时三个来源都不在 GUI 上显示。这不是待定的占位符，所以不适用 `design-assumes-it-works.md` 中“假定能工作”的规则。

**清零条件（修订行中写明下面任意一种即可）：**
- (a) 保留 `text` 字段，同时在行中写明 GUI 上的引用串从哪里来，而且只用现有元素。例如：在数据集页详情现有的 mono 文本位（`chain` 中 `DatasetLineage` 的 `mono: true` 行）显示该产物的 `ArtifactRef`，这属于 D20-02 的“真实数据取数”。如果需要人上传新文件，就把讨论页现有的 `AttachIcon` 按钮（`discussions-page.tsx:572`）接到 `uploadArtifact(当前讨论会话)`，这属于“最少 props 与条件渲染”。完整路径是：上传后产物出现在数据集页，人复制引用串，再粘贴到交回框。P16 允许跨会话引用（Lab 会把字节放到持有槽位的会话可读的位置），所以上传到交回人自己的讨论会话即可。
- (b) 改用 `choice` 列出候选，交回人不必接触引用串。候选例如：对话框读取数据集页中的讨论产物，再加上由 `objectSizes`/`valueRuns` 的 `content` 构成的 `store:<Hash>`。


**ClaudeHigh（ClaudeHighD37，空白历史）对 D37-01 v1 投反对票，附有效反例。**

核对范围：`council queue --seat ClaudeHigh` 显示 D37-01@v1；PM#56 正文；`GATES/pepgent25-web05{,-gate-a,-gate-b}.md`；`DEC/D12-lab-wire.md`（D12-02⑤、D12-11、D12-13、HTTP 路由表、P16）、`DEC/D8-mvp-scope.md`（WEB-03..07、F30、LAB-11a）；源码以 `Pepgent/Pepgent` main `69067d8` 为准，经 `gh api` 按提交读取。

**steady 立场（契约闭合）：**
- 数据面闭合。text 字段经 `ArtifactRefSchema` 解析，组成 `GuiReturned{kind:'file', artifact}`，与 D12-11、P16 一致；不改 wire、`packages/ui` 和白名单，路径落在 D20-01/02 之内。这部分我没有异议。
- 交回人在 GUI 上拿不到引用串，主路径断开。行中列的三个“来源”（D12-13 上传返回 id、datasets `artifacts[].id`、运行产物 `store:<Hash>`）都只是 wire 层事实。main 上没有任何 renderer 调用 `uploadArtifact`；自动化页和详情页没有上传入口，本行又写了“不新增入口”；讨论页的 `AttachIcon` 按钮没有 `onClick`，也没有切片负责接线；13 个 Lab 页面都不显示 `ArtifactRef`、hash、`store:` 或 `discussion:`。因此对话框只能接受一个用户在界面上看不到的串，“得到”栏的“两页主路径上可用”不成立。反例的文件与行号见 counter。
- 上传接口按会话划分（`POST /api/lab/conversations/{conversation}/artifacts`，要求调用者是该会话 owner）。自动化页交回对应的是 Automation 会话，详情页交回对应的是持有运行的讨论会话。两页都没有入口触发向任何会话上传。P16 允许跨会话引用，所以只要在交回人自己的讨论会话里有一个上传入口就够用，但本行没有写这个入口。

**divergent 立场（更简明的主路径）：**
- 不必改 `packages/ui` 或 wire，只用现有元素就能补通。做法一：数据集页详情现有的 mono 文本位显示 `ArtifactRef`，属于“真实数据取数”。做法二：把讨论页现有的 `AttachIcon` 接到 `uploadArtifact(当前讨论会话)`，属于“最少 props”。这样形成一条完整路径：上传 → 数据集页看到引用串 → 粘贴交回。另一种选择是用 `choice` 直接列出候选，交回人不需要接触引用串。两者都在 W-10 的 D20 域内，可以合在同一行修订，不需要另开议程。
- 两页合为一行、只暂停文件型分支，这两点我赞成。修订后补上 GUI 中引用串的来源，我会转为赞成。

**票：** D37-01 = oppose（反例见 counter；按清零条件 (a) 或 (b) 修订后可转赞成）。


## D37-01 v2：赞成（ClaudeHighD37v2，2026-11-01T20:50:46.505Z）



**ClaudeHigh 席（实例 `ClaudeHighD37v2`，空白历史）对 D37-01 v2：赞成。**

源码基线：`Pepgent/Pepgent` main（与 v1 反例同一提交），通过 `gh api …/tarball` 取到 `/tmp` 后只读核对。下文路径相对 `apps/web/src/`，`DEC/` 指 `pepgent-pm/evidence/decisions/`。

### 一、v1 反例已清零（满足清零条件 (a)）
v1 反例有三处缺口，v2 逐一补上：
1. **GUI 上看不到 `ArtifactRef`。** v2 在数据集页详情 `chain` 末尾加一项 mono 行，显示 `artifact.id`。依据：`DatasetLineage{label,value,page,mono}`（`renderer/features/lab-datasets/model/datasets-view-model.ts:192-197`）；`chain` 逐项渲染，`mono` 为真时加等宽类（`ui/datasets-page.tsx:432-441`）。这个 id 就是 `ArtifactRef`：
   - D12-02⑤ 规定 `ArtifactRef = store:<sha256> | discussion:<id>`，“与原型 `${string}:${string}` 同形”（`DEC/D12-lab-wire.md:34`）；
   - 原型 `DatasetArtifact.id: ArtifactId = \`${string}:${string}\``（`client/contracts/lab-workspace.ts:50,59`）；
   - 讨论产物 `ArtifactMetaWire.id` 的类型是 `DiscussionArtifactRefSchema`（`protocol/lab/rows.ts:207`）；
   - 运行产物取 datasets wire 中 `objectSizes`/`valueRuns` 的 `content: HashSchema`（`protocol/lab/pages.ts:189-190`），写成 `store:<content>`，与 `StoreArtifactRefSchema` 一致（`protocol/lab/ids.ts:46-49`）。
   - `copy.columns.artifact` 是已有文案（`renderer/locales/lab-datasets-copy.ts:25,91`），和 `chain` 中已有的 label 不重名，`key={link.label}` 不会冲突。
2. **`uploadArtifact` 没有任何调用方。** v2 把讨论页 `AttachIcon` 按钮接到 `uploadArtifact`。依据：
   - 该按钮目前确实没有 `onClick`（`renderer/features/lab-discussions/ui/discussions-page.tsx:572`）；同文件其他 `IconButton` 都带 `onClick`，所以只需补这一项 prop。
   - `LabBridge.uploadArtifact(conversation, name, role, bytes)` 的签名与 v2 写法一致（`protocol/lab/pages.ts:265`）。
   - 服务端 `uploadArtifact` 要求 `lab:write` 且调用者是该会话 owner，返回 `artifactMetaWire`（`server/lab/http.ts:166-193`）。v2 写明“上传到交回人自己作为 owner 的讨论会话”，与此一致。
   - D12-13 写明返回的 `id` 就是 `GuiHandback` 使用的 `ArtifactRef`（`DEC/D12-lab-wire.md:45`）。
3. **client/renderer 没有解析 `ArtifactRef` 的代码。** v2 规定提交时按 `ArtifactRefSchema`（`protocol/lab/ids.ts:50`）解析，组成 `GuiReturned{kind:'file',artifact}`。这与 D12-11 一致（`DEC/D12-lab-wire.md:43`）。

### 二、主路径完整（steady 立场）
- **获取引用串，有两种情况：**
  - 已有产物：数据集页选中该产物，在详情“来源链路”末尾的“产物”行看到引用串。
  - 新文件：在自己的讨论里点附件，经 `POST /api/lab/conversations/{c}/artifacts` 落为 `artifact_meta`。datasets wire 的 `artifacts: ArtifactMetaWire[]`（`protocol/lab/pages.ts:186`）带上这条产物，再在数据集页详情显示。
- **交回：** 在自动化页或详情页打开交回对话框，`kind:'text'`、`mono` 字段（`client/contracts/lab-common.ts:154`，`hint` 来自 `DialogFieldBase`，见 :149）接收引用串。提交后按 `ArtifactRefSchema` 解析，组成 `GuiHandback` 发出，再由 P16 把字节放到持有槽位会话可读的位置（`DEC/D12-lab-wire.md:643`）。
- **依赖的占位：** `server/lab/operations.ts:261` 的 `datasets` 页读当前仍是 `notSupported`。它属于 WEB-04 依赖的 LAB 切片，按 `design-assumes-it-works.md` 假定能工作，不影响本行。

### 三、承载切片与白名单成立
- **路径白名单：** `features/lab-{datasets,discussions,automation,experiment-detail}/{controller,model}/**` 与对应的 `locales/lab-*-copy.ts` 都在 D20-01 白名单内（`DEC/D20-w10-path-boundary.md:31`）。`discussions-page.tsx:572` 只加一个 `onClick`，属于 D20-02 的“把动作接线所需的最少 props”（同文件 :32）。不改 `protocol/lab/**`、`server/lab/**`、`packages/ui`。
- **切片：**
  - WEB-04 的“产物”行是纯投影，用纯函数单元测试验收（`DEC/D8-mvp-scope.md:338`，“同上”）。
  - 详情页交回与讨论页上传接线放在 WEB-07（D8:341；D36-02 v2 先例见 D8:348）。上传是真实 HTTP 写，要等运行时脱离 `LAB_SNAPSHOT` 后才生效，因此不归 WEB-04。划分正确。

### 四、divergent 立场
- **`choice` 列候选（条件 (b)）：** 仍然需要上传入口，还要另外设计候选来源、排序和标签，没有更短的主路径。
- **对话框内上传：** 要改 `packages/ui/src/lab/action-dialog.tsx`，越出 D20。
- **automation wire 加产物列表：** 跨到 W-09，而且不覆盖详情页。

v2 的落选理由逐条成立。在 D20 边界内，我没有找到更简明、且不跨席位的方案。

### 五、非阻断提示（不构成反例，供 W-10 实施与 PR 披露）
“产物”行由 `LabAnchor` 渲染，是真实的 `<a href>`，样式为 `display:block`（`ui/datasets-page.tsx:434-440`；`renderer/styles/lab/lab-datasets.css` 的 `.pepgent-lab-datasets-chain-link`）。v2 让它的 `page` 跟随第一项，所以：
- 普通左键单击或双击会先触发 `onActivate`，跳到实验页或讨论页（`packages/ui/src/lab/lab-anchor.tsx` 的 `onClick`）；
- 直接拖动会变成拖链接；
- 右键“复制链接地址”得到的是 href，不是引用串。

可行的复制方式：按住 Alt/Option 拖选。此时 `onClick` 遇到 `altKey` 会直接返回，不跳转。也可以从上方 label 行的空白处开始拖选。

主路径因此**可以完成，不算失效**，只是操作门槛偏高。建议：
- 交回框的 `hint` 文案（在 `locales/lab-{automation,experiment-detail}-copy.ts` 白名单内）写明“按住 Alt/Option 拖选复制”；
- 提交时先对输入做 `trim`，再用 `ArtifactRefSchema` 解析；
- e2e 按这条路径实测复制和粘贴。

