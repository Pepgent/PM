# D37 选票：LeadMentor

议程：Pepgent#25 WEB-05：GUI 文件型交回字段的采集方式（自动化页与详情页）（[Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D37-01 v1：赞成（LeadMentor-2，2026-11-01T20:33:44.229Z）——作废：该行已修订到 v2


**分类意见：** 串联

# D37-01 v1 独立导师席选票

议程：https://github.com/Pepgent/PM/issues/56
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D37-01 v1。票：赞成。分类：串联。

## 独立理由

D12-11 的文件交回值本来就是 file{artifact:ArtifactRef}，不是浏览器 File，也不是 store Handback。D12-13 已把原始字节上传与结构化命令分开，并明确上传返回的 ArtifactMetaWire.id 是可用于 GuiHandback 的引用。因此用既有 text 字段输入引用，在提交边界按 ArtifactRefSchema 解析成精确 ArtifactRef，再构造 GuiReturned.file，保持值的原有语义和拥有方分工；没有把文件类型压成 GuiReturned.string，也没有要求浏览器或 Lab 冒充 eval 产出 store Handback。

已读合法 W-10 工作入口的 client/contracts/lab-common.ts:150-185，确有 text、mono、提示与 completion；packages/ui/src/lab/action-dialog.tsx:68-81、200-224，text 接收字符串，done 分支向 onDone 交出 state.values；protocol/lab/ids.ts:46-52 支持 store: 与 discussion: 两类引用；command.ts 的 GuiReturned.file 使用同一 ArtifactRefSchema。正常主路径能在不新造共享组件字段种类、不改 wire/server 或白名单的前提下接上。

两种引用都保留，不把 Automation 会话没有 discussion.load 误作其不能交回任何文件的理由。由上传响应、已有讨论产物 id 或运行产物引用提供值，不要求先把它变成该会话上下文，也不把仅列讨论产物的 datasets 列表当成全部文件来源。

## 取舍和交付边界

这是接受粘贴 ArtifactRef 的方案，不是承诺对话框内选择本地文件并上传。正文已明确该使用成本；已读 D12-11/13 未要求对话框内上传，故没有据此制造“缺一个新上传控件就不能交回”的额外验收要求。两页行为相同、值类型完整，未将文件分支删除或转入 D9。

自动化页承载于 WEB-05（https://github.com/Pepgent/Pepgent/issues/25），详情页随 D36-02 v2 的 WEB-07 接线（https://github.com/Pepgent/Pepgent/issues/29）。按正文回写交回说明并登记送达，保持 UI 只在 D20-02 允许行内接线。登记和本票均不代表工人实现或真正持有槽位会话已收到文件；最终结果仍须沿既有 Lab→eval 文件落地与交回路径验证。

## 范围与证据

先消费 digest #313，读取 daemon 当前行的完整 what/where/how/tradeoff 及当前正式议程事实。核对 D12-11/13 全文和上述现有精确类型、text/onDone 主路径；不将议程中的工人/闸门报告升级为本席 runtime 验收。

本票是跨已有字段、协议与两页交付的串联取舍，不是 D1-17 最终意图仲裁。没有新反对反例、专责否决或额外同步验收锁。未写代码或配置，未运行测试、构建、UI/浏览器或 runtime，未使用 hash 验证。本席仅写选票理由，发布归档交 daemon。


## D37-01 v2：赞成（LeadMentor-2，2026-11-01T20:45:34.027Z）


**分类意见：** 串联

# D37-01 v2 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/56
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D37-01 v2。票：赞成。分类：串联。

## 本次修订实质

v1 只列上传响应/线数据可以提供 ArtifactRef，没有把交回人从真实页面何处看见、取得引用，以及新文件如何上传的完整用户路径写清。本席 v1 的类型可接判断不等于这些 UI 入口已具备。v2 明确补齐这些义务，不能把新增段落当成 v1 工程本来已完成的事实。

现在已有产物从 datasets 详情“来源链路”的“产物”行取得完整引用；新文件先由交回人自己的讨论页既有附件按钮上传，再到 datasets 详情复制。两页交回框的提示明确指向该位置，提交仍使用 ArtifactRefSchema 构造 GuiReturned.file，而不是字符串交回。

## 独立核对

1. datasets-view-model.ts:192-197、414-445 的 DatasetLineage 正是 label/value/page/mono；现有两类产物的 chain 都有第一项可供保持 page 一致。datasets-page.tsx:430-443 已逐项显示 link.value 并支持 mono。追加数据项即可显示完整引用，不需要改共享组件或插入新的 UI 结构。完整 ArtifactRef 是被展示并引用的领域标识，不是本席使用 hash 验证作成功证据。
2. discussions-page.tsx:570-576 确有现成附件按钮。补一个 onClick 把该按钮连接到 controller 的浏览器选文件及上传动作，与正文指定的 D20-02 最少 props 约束相符。
3. D12-lab-wire.md:394-404 明确定义 LabBridge.uploadArtifact(conversation,name,role,bytes:Blob)，D12-13 明确上传结果的 ArtifactMetaWire.id 可用于 GuiHandback；P16（:643）明确由 Lab 将引用字节落到实际持有槽位会话可读位置。故上传到本人拥有的讨论会话，不要求上传会话与 Automation 交回会话相同，也不要求 Automation 先有 discussion.load 上下文。这里依据既有契约审议，不宣称当前分支已实现所有上传消费。
4. store:content 与 discussion:id 两种产物均在纯投影中保留 owner-qualified 引用；对话框仍接收既有 text/mono，提交边界解析后形成 file{artifact}，不改 wire/server。

## 交付与取舍

WEB-04 承载引用串的纯投影，WEB-05 承载自动化页交回，WEB-07 承载详情页交回与真实讨论上传接线。这给每部分明确承载，避免把能通过投影单测误说成真实上传或整条文件交回已可用。按正文在 https://github.com/Pepgent/Pepgent/issues/25 、https://github.com/Pepgent/Pepgent/issues/27 、https://github.com/Pepgent/Pepgent/issues/29 登记送达与回写现行说明。

接受跨页面复制/粘贴的明确成本；并未承诺对话框内直接选文件上传。只补现有布局可表达的引用显示及既有按钮接线，没有删除文件交回、推迟到 D9，或扩大任何席位白名单。

## 范围

先消费 digest #318，再读取 daemon 当前行完整 what/where/how/tradeoff 并核对上述当前代码/正式契约。既有 text/onDone、ArtifactRefSchema、GuiReturned.file 的已读证据仍有效。本轮无反对反例、专责否决、分类仲裁或附加同步验收锁。

没有代码/配置改动，未运行测试、构建、浏览器/UI 或 runtime 验收，未使用 hash 验证。本票仅为 v2 设计主路径与交付取舍赞成；不等于最终端到端文件交回已完成。旧票文件不回写，计票发布归档交 daemon。

