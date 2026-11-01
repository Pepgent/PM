# 闸门 A 裁决：D37-01 v2 修订稿（数据集页详情显示 `ArtifactRef` + 讨论页附件上传 + 两页交回框粘贴）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/PM#56](https://github.com/Pepgent/PM/issues/56)、[Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)、[Pepgent/Pepgent#27](https://github.com/Pepgent/Pepgent/issues/27)、[Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29)，`PM/evidence/gates/pepgent25-web05.md` §六（6.1–6.3）与 `/tmp/D37-01-v2.yaml`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86`：已有前端界面接通后端与 e2e 全流程走通，功能不收缩）、`U59`（`LEDGER.md:104`：不破坏前端视觉与组件结构）。
  - `(D)` `DEC/D7-lab-backend.md:101,105,120`（datasets 与 discussions 页模型、原 `artifact.upload`）、`DEC/D8-mvp-scope.md:129,151,309,338,339,341,348`（F09、F31、LAB-11a、WEB-04、WEB-05、WEB-07、D36-02）、`DEC/D12-lab-wire.md:34,43,45,149-151,417,581,643`（D12-02⑤、D12-11、D12-13、P16）、`DEC/D20-w10-path-boundary.md:31-32`（D20-01/02）。

---

## 一、闸门 A 判定结论

- **结论：** **同意 `D37-01 v2` 修订稿（满足产品原始意图与公开契约，无越界，同意由协调席执行 `council revise D37 D37-01` 进入 v2 表决）。**

---

## 二、对 `6.3 A` 的回答

1. **“数据集页详情显示引用串 + 讨论页附件上传 + 交回框粘贴”主路径完全满足 `D12-11` / `P16` 文件型交回在两页可用的意图：**
   - 在 `WEB-04`（`Pepgent#27`）由 `datasets-view-model.ts` 在详情 `chain`（`DatasetLineage[]`）末尾追加 `{ label: copy.columns.artifact, value: artifact.id, mono: true, page: ... }`，复用 `datasets-page.tsx:432-441` 既有的等宽列表渲染而不改 `ui/**` 或新增文案，使运行产物（`store:<content>`）与讨论产物（`discussion:<DiscussionArtifactId>`）的 `ArtifactRef` 在 GUI 上可直接查看与复制。
   - 在 `WEB-05`（自动化页）与 `WEB-07`（实验详情页）的交回对话框中，`file` 字段继续使用 `DialogFieldFixture` 既有的 `kind: 'text'`（`mono: true`）接收复制的 `ArtifactRef` 并按 `ArtifactRefSchema` 解析构造 `GuiReturned { kind: 'file', artifact }`，配合 `P16`（`Lab` 将 `ArtifactRef` 字节放入持有槽位会话可读位置），使既有产物与新上传文件均可在两页完成交回闭环。
2. **讨论页附件按钮接到 `uploadArtifact` 与 `LAB-11a`、`F09`/`F31` 及 `D12-13` 完全一致，未越过任何公开契约：**
   - `DEC/D8-mvp-scope.md:309`（`LAB-11a`“对话消息与附件”）、`:129`（`F09`）、`:151`（`F31`）与 `DEC/D12-lab-wire.md:45,581`（`D12-13`：“上传返回 `ArtifactMetaWire`，其 `id` 就是之后在 `GuiHandback`、`discussion.load` 中使用的 `ArtifactRef`”）本来就规定讨论附件经 `POST /api/lab/conversations/{conversation}/artifacts`（客户端 `LabBridge.uploadArtifact`）上传。
   - 给 `discussions-page.tsx:572` 既有的 `AttachIcon` 按钮补上 `onClick={controller.attach}` 调用 `LabBridge.uploadArtifact`，属 `D20-02` 允许的最少事件接线，不改动 `protocol/lab/**`、`server/lab/**` 或 `packages/ui`，且因 HTTP 上传需脱离 `LAB_SNAPSHOT` 才生效而归入 `WEB-07`（`Pepgent#29`），承载划分准确合理。
