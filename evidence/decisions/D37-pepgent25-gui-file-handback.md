# D37：Pepgent#25 WEB-05：GUI 文件型交回字段的采集方式（自动化页与详情页）（P0）——定稿

决策 issue：[Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)。发起：Coordination（DeskPepgent25Blocked）。本文件由议会 daemon 生成。

## 事实

初审材料：[pepgent25-web05.md](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent25-web05.md) Q3；闸门判定：[gate-a](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent25-web05-gate-a.md)（PM `821dfba`）、[gate-b](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent25-web05-gate-b.md)（PM `8f7b3da`）。路径简称 `DEC/` = `Pepgent/PM` 的 `evidence/decisions/`。

- **起因：** W-10 在 [Pepgent#25 issuecomment-6563204849](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563204849) 报 BLOCKED（部分）。同批其余三项（自动化页按候选 (d) 渲染、承载在 WEB-05、多槽位依次交回）两道闸门均判不越界，已在 #25 作答。本议案只处理两道闸门都判 K4 的一项：文件型 shape 的交回。
- **正文只定了数据，没有定 GUI 如何采集（D）：**
  - D12-11：`GuiHandback = { fields: Record<string, GuiReturned> }`，`GuiReturned` 为数值、字符串、布尔或 `file{artifact: ArtifactRef}`（`DEC/D12-lab-wire.md:43`）。
  - D12-13：上传改为 `POST /api/lab/conversations/{conversation}/artifacts?name=&role=`，返回 `ArtifactMetaWire`，“其 `id` 就是之后在 `GuiHandback`、`discussion.load` 中使用的 `ArtifactRef`”（`DEC/D12-lab-wire.md:45,581`）。`ArtifactRef` = `store:<Hash>` 或 `discussion:<DiscussionArtifactId>`（`:149-151`）。
  - P16：Lab 把 `ArtifactRef` 的字节放进持有槽位会话可读的位置（`:643`）。
  - 交回入口的做法：“工具栏动作与数据驱动的 `DialogSpecFixture`，调用处传入 `ActionDialog` 已有的 `onDone`”（D36-02 v2 回写 `DEC/D8-mvp-scope.md:348`）；自动化页按同样做法用运行行已有动作按钮位（#25 结论）。
- **代码现状（R，W-10 工作入口只读）：** `DialogFieldFixture` 的 kind 为 `text/area/segmented/choice/multi/toggle/info/code`，没有文件字段（`apps/web/src/client/contracts/lab-common.ts:157-185`）。`ActionDialog` 在 `packages/ui/src/lab/action-dialog.tsx`，不在任何席位白名单（D20-01、D35-01 只放开 `time-axis*`）。automation 页 wire 没有产物列表；datasets 页 `artifacts: ArtifactMetaWire[]` 只含讨论产物（`id: DiscussionArtifactRef`）（`DEC/D12-lab-wire.md:183,376`）。
- **闸门：** A 判 K4，须表决并把自动化页（WEB-05）与详情页（WEB-07）合为一行；指出 Automation 会话没有 `discussion.load`（`DEC/D12-lab-wire.md:536` 仅限讨论 owner），其上下文为空。B 判 K4，须 P0；不改 D16-09/D20 白名单时 4 席参投、不加 `governance`；表决前 W-10 只暂停文件型分支，number/string/boolean 照常交付，未经表决的文件型方案不写入待合入 PR 或 `main`。
- **范围：** 只写主路径（`SOR/.claude/rules/design-assumes-it-works.md`）。没有 F 流程逐字要求 GUI 文件型交回（F08 S2 在详情页，F30 不含交回，`DEC/D8-mvp-scope.md:127,149`）；本项补的是 D12-11 已允许的值在 GUI 上的入口，不缩减范围。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D37-01 v2 | GUI 交回的文件型字段用对话框已有的 `text` 字段接收 `ArtifactRef`；引用串在数据集页详情显示，新文件经讨论页已有的附件按钮上传；自动化页与实验详情页做法一致 | 下列 `features/` 路径均以 `apps/web/src/renderer/` 为前缀。<br>- 交回对话框：自动化页 `features/lab-automation/{model,controller}/**`（WEB-05，Pepgent/Pepgent#25）；详情页 `features/lab-experiment-detail/{model,controller}/**`（WEB-07，Pepgent/Pepgent#29）<br>- 引用串显示：数据集页 `features/lab-datasets/model/datasets-view-model.ts` 的详情 `chain`（WEB-04，Pepgent/Pepgent#27）<br>- 上传入口：讨论页 `features/lab-discussions/controller/**`，以及 `features/lab-discussions/ui/discussions-page.tsx:572` 的 `AttachIcon` 按钮（WEB-07，Pepgent/Pepgent#29）<br>- `apps/web/src/client/**`；`DEC/D8-mvp-scope.md` 的 WEB-04、WEB-07 两行与 :348 的“交回”条 | - **交回对话框（同 v1）：** 两页由 model 按 `awaiting_human.shape` 生成交回 `DialogSpecFixture`。字段类型为 file 时，生成已有的 `kind: 'text'` 字段（`mono: true`），提示文案说明接受 `store:<Hash>` 或 `discussion:<DiscussionArtifactId>`，并指明可从数据集页详情“来源链路”的“产物”行复制。提交时按 `ArtifactRefSchema` 把该字段解析为 `ArtifactRef`，组成 `GuiReturned { kind: 'file', artifact }`，与其余字段一起放进 `intervene.answer` / `intervene.takeover` 的 `GuiHandback.fields`。<br>- **引用串在哪里看到（WEB-04）：** D12-02⑤ 规定 `ArtifactRef` 与原型 `ArtifactId`（`${string}:${string}`，`client/contracts/lab-workspace.ts:50,59`）同形，所以 datasets 投影里每个 `DatasetArtifact.id` 就是该产物的 `ArtifactRef`：讨论产物取 `ArtifactMetaWire.id`，运行产物取其值哈希 `content`（datasets wire 的 `objectSizes` / `valueRuns`），写成 `store:<content>`。数据集页 model 在详情 `chain`（`DatasetLineage[]`）末尾为两种产物各加一项：`label` 用已有文案 `copy.columns.artifact`（“产物”），`value` 为 `artifact.id`，`mono: true`，`page` 与该产物第一项相同。UI 已按数组逐项渲染 `chain`，`mono` 为真时用等宽样式（`datasets-page.tsx:432-441`），所以 `ui/**` 不改，也不新增文案。<br>- **新文件从哪里上传（WEB-07）：** 讨论页输入框已有的 `AttachIcon` 按钮（`discussions-page.tsx:572`）补上 `onClick={controller.attach}`。controller 以程序化的 `input type=file` 打开浏览器文件选择（不渲染新元素），然后调用 `LabBridge.uploadArtifact(当前讨论会话, 文件名, 'raw', 文件)`。这是 D12-13 的上传路由，即 D7 原 `artifact.upload` 命令改走 HTTP 后的形态。上传产生的讨论产物进入 datasets 页 `artifacts`，再按上一条显示引用串。P16 由 Lab 把字节放进持有槽位会话可读的位置，因此交回人上传到自己作为 owner 的讨论会话即可。<br>- **主路径：** 交回人如果已有产物，就在数据集页打开它，从详情“来源链路”的“产物”行复制引用串；如果要交新文件，先在自己的讨论里点附件上传，再到数据集页复制。然后到自动化页或详情页点交回，把引用串粘贴进去并提交。<br>- **改动边界：** 不改 `protocol/lab/**`、`server/lab/**` 与 `packages/ui`，不改 D16-09/D20 白名单。`ui/**` 只在 `discussions-page.tsx:572` 加一处 `onClick`，属于 D20-02 的“完成上述各项所需的最少 props”。<br>- **承载切片：** 自动化页交回在 WEB-05 交付。数据集页引用串是纯投影，在 WEB-04 交付，由 WEB-04 的投影单元测试验收。详情页交回和讨论页上传接线在 WEB-07 交付：上传是真实的 HTTP 写，运行时脱离 `LAB_SNAPSHOT` 后才生效；D36-02 v2 也把正文未写明归属的页面动作接线放在 WEB-07。<br>- **回写：** `DEC/D8-mvp-scope.md:348` 的“交回”条补“文件型字段用 `text` 字段接收 `ArtifactRef`，自动化页同样适用；引用串见数据集页详情的‘产物’行”；WEB-04 行补“数据集页详情的来源链路显示产物的 `ArtifactRef`”；WEB-07 行补“讨论页附件按钮接 `uploadArtifact`”。通过后由 AreaMgrPepgent 在 #25、#27、#29 登记并送达 W-10。 | **得到：**<br>- D12-11 允许的文件型交回在两页主路径上可用：引用串在数据集页详情可以看到、可以复制，新文件经讨论页上传后也出现在那里。两页做法一致。<br>- 不改 wire、`packages/ui` 与白名单；`ui/**` 只改一处 `onClick`，W-10 在 D20-01/02 内即可完成，不跨席位。<br>- 引用来源与 D12-13“上传返回的 `id` 就是 `GuiHandback` 中使用的 `ArtifactRef`”、D12-02⑤“`ArtifactRef` 与原型 `${string}:${string}` 同形”一致。<br>**代价：** 交回人要在数据集页复制引用串，再回到交回框粘贴，不能在对话框里直接选文件上传。<br>**落选：**<br>- `choice` 列出候选（ClaudeHigh 清零条件 (b)）：交回对话框要另读 datasets 页，候选是整个 Lab 的产物，需要另定排序和标签；交新文件时仍然需要上传入口，所以上传接线省不掉。<br>- `choice` 列出该会话的上下文产物：Automation 会话没有 `discussion.load`，上下文为空，自动化页没有候选（gate-a）。<br>- 给 `DialogFieldFixture` 加 file 种类、在 `ActionDialog` 内上传：要改 `packages/ui/src/lab/action-dialog.tsx`，不在任何席位白名单，须修订 D20 并新增组件结构。<br>- 给 automation 页 wire 增加产物列表：改 W-09 的 `protocol/lab/**`，跨席位，仍需选择控件，且不覆盖详情页。<br>- 把讨论页上传接线放在 WEB-04：WEB-04 的关闭条件是纯函数投影单元测试（D8:338），上传要到 WEB-07 切换运行时后才生效。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD37v2）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

- D37-01 v2（DeskD37Revise，2026-11-01T20:44:35.942Z）：**修订理由（D37-01 v1 → v2，Coordination／DeskD37Revise）**

ClaudeHigh 的反例经源码核实成立（`Pepgent/Pepgent` main，经 `gh api` 按提交读取），详见 PM `evidence/gates/pepgent25-web05.md` §6.1：
- `renderer/**` 中没有任何代码调用 `uploadArtifact`。该方法只在 `client/services/lab.ts:105` 实现、在 `protocol/lab/pages.ts:265` 声明。
- 讨论页 `discussions-page.tsx:572` 的 `AttachIcon` 按钮没有 `onClick`。
- `client/**`、`renderer/**` 中没有引用 `ArtifactRef` 的地方；数据集页详情的 `chain` 不显示产物 id。

v2 按清零条件 (a) 修订：
- 保留 v1 的 `text` 字段。
- 数据集页详情 `chain` 末尾加一项 mono 行，显示 `artifact.id`。按 D12-02⑤，这个 id 就是 `ArtifactRef`。只改 model，承载在 WEB-04（#27）。
- 讨论页已有的 `AttachIcon` 补上 `onClick`，接到 `uploadArtifact`（当前讨论会话），承载在 WEB-07（#29）。
- 交回框的提示文案指向数据集页详情的“产物”行。

由此形成完整主路径：上传或选中已有产物 → 在数据集页复制引用串 → 粘贴到交回框。

v2 不改 wire、`packages/ui` 和白名单，`ui/**` 只加一处 `onClick`。新增的承载与 UI 行经两道闸门复核：
- gate-a：`evidence/gates/pepgent25-web05-d37v2-gate-a.md`
- gate-b：`evidence/gates/pepgent25-web05-d37v2-gate-b.md`

v1 的旧票作废，请资格席重投。


## 原票

各席原票见 `votes/D37-Coordination.md`、`votes/D37-ClaudeHigh.md`、`votes/D37-Argon.md`、`votes/D37-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。