# D37 选票：Argon

议程：Pepgent#25 WEB-05：GUI 文件型交回字段的采集方式（自动化页与详情页）（[Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D37-01 v1：赞成（Argon-2，2026-11-01T20:33:37.049Z）——作废：该行已修订到 v2



### 意图裁决（本席说了算）
- 无（`D37-01 v1` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D37-01 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **完整兑现 `D12-02⑤`、`D12-11` 与 `D12-13` 的文件交回契约（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `DEC/D12-lab-wire.md:34,43,45,149-151,417,581`）：** 自动化页（`WEB-05`，`Pepgent#25`）与实验详情页（`WEB-07`，`Pepgent#29`）对 `awaiting_human.shape` 中的 `file` 字段统一生成 `DialogFieldFixture` 既有的 `kind: 'text'`（`mono: true`）接收 `ArtifactRef`（`store:<Hash>` 或 `discussion:<DiscussionArtifactId>`），提交时按 `ArtifactRefSchema` 解析构造 `GuiReturned { kind: 'file', artifact }` 填入 `intervene.answer` / `intervene.takeover` 的 `GuiHandback.fields`，使两页在主路径上行为一致且同時支持运行产物 `store:<Hash>` 与经 `D12-13` 上传得到的 `discussion:<id>`，规避了 `Automation` 会话无 `discussion.load`（`D12-10:536`）导致上下文候选为空的问题。
    2. **严守 `D20-01/02` UI 边界与 `D16-09` 路径所有权（`(U)` `U59`，`LEDGER.md:104`；`(D)` `DEC/D20-w10-path-boundary.md:31-32`、`DEC/D8-mvp-scope.md:339,341,348`）：** 复用 `ActionDialog` 既有 `text` 字段而不改动 `packages/ui/src/lab/action-dialog.tsx`、`protocol/lab/**` 或 `server/lab/**`，不扩白名单、不跨席位；自动化页在 `WEB-05` 交付、实验详情页随 `D36-02 v2` 在 `WEB-07` 交付，回写 `DEC/D8-mvp-scope.md:348` 清晰完整。

### 否决（一票否决权）
- 无（`D37-01 v1` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `D12`、`D20`、`D31`、`D36` 完全一致，本席不行使否决权）。


## D37-01 v2：赞成（Argon-2，2026-11-01T20:44:59.095Z）



### 意图裁决（本席说了算）
- 无（`D37-01 v2` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D37-01 v2（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **完整闭合 `D12-02⑤`、`D12-11`、`D12-13` 与 `P16` 文件交回的 GUI 主路径（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `DEC/D12-lab-wire.md:34,43,45,149-151,417,581,643`、`DEC/D8-mvp-scope.md:129,151,309`）：**
       - 在 `WEB-04`（`Pepgent#27`，数据集页）由 `datasets-view-model.ts` 在详情 `chain` 末尾为运行产物（`store:<content>`）与讨论产物（`discussion:<DiscussionArtifactId>`）各追加一项 `{ label: copy.columns.artifact, value: artifact.id, mono: true, page: ... }`，复用 `datasets-page.tsx:432-441` 既有等宽渲染，使交回人能在 GUI 上直接查看并复制 `ArtifactRef`。
       - 在 `WEB-07`（`Pepgent#29`，讨论页）给 `discussions-page.tsx:572` 既有 `AttachIcon` 按钮补 `onClick={controller.attach}` 调用 `LabBridge.uploadArtifact(conversation, name, 'raw', file)`（`D12-13`、`LAB-11a`、`F09`/`F31`），使新文件经讨论上传后进入数据集页并显示 `ArtifactRef`，配合 `P16`（`Lab` 将字节放入持有槽位会话可读位置）支持交回新文件。
       - 在 `WEB-05`（`Pepgent#25`，自动化页）与 `WEB-07`（`Pepgent#29`，实验详情页）由 model 对 `awaiting_human.shape` 的 `file` 字段统一生成 `DialogFieldFixture` 既有的 `kind: 'text'`（`mono: true`）接收 `ArtifactRef`，提交时按 `ArtifactRefSchema` 解析构造 `GuiReturned { kind: 'file', artifact }`，彻底消除 `ClaudeHigh` 在 v1 提出的 GUI 引用串来源反例。
    2. **严守 `D20-01/02` UI 边界与切片验收职责（`(U)` `U59`，`LEDGER.md:104`；`(D)` `DEC/D20-w10-path-boundary.md:31-32`、`DEC/D8-mvp-scope.md:338,339,341,348`）：** 不改 `protocol/lab/**`、`server/lab/**` 与 `packages/ui`，`ui/**` 仅在 `discussions-page.tsx:572` 加一处 `onClick`，完全落在 `D20-01/02` 允许范围内，承载切片划分（`WEB-04` 纯投影、`WEB-05` 自动化页交回、`WEB-07` 详情页交回与讨论页上传接线）准确清晰。

### 否决（一票否决权）
- 无（`D37-01 v2` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `D8`、`D12`、`D20`、`D31`、`D36` 完全一致，本席不行使否决权）。

