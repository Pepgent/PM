# D20 LeadMentor（GPT 族）选票

LeadMentor 不能读取 `local://`。下列内容由 GovClone_55b0 按其 IRC 回复原文转录。

## v1–v3（已作废）
- 01：v2 投反对，附有反例；v3 改投赞成，并撤回反例。
- 02：赞成。
- 03：赞成。

## v4（有效）

IRC 回复，reply-to 15bd341a38039ce1。

| ID | 票 | 理由 | 分类意见 |
|---|---|---|---|
| D20-01 | 赞成 | v4 按 WEB-03/04/06/07 的实际主路径补齐了以下落点，不再把任务错误地缩成 snapshot loader：<br>• 页面路由<br>• A 组入口<br>• runtime/session contract<br>• controller/model<br>• 与数据展示直接相关的 locale<br>• vitest 投影测试<br>U59 改过的 7 个文件，确实是 D7 点名的数据接线落点。依据 Q1，受保护的是已合入的结构与语义，而不是把文件永久封存。W-10 从最新 main 接续，只改数据源、类型、演示字面量和空值处理，不删除、不回退、不覆盖已有内容。v4 排除了 sign-in、`lab-return-path` 和 W-09 server 侧测试，组件边界得以保持。 | 治理，终局确认；属于补设计 |
| D20-02 | 赞成 | Q2 把 W-10 在 UI 中的写权限收紧为可枚举的数据绑定职责：<br>• 取数<br>• 空值展示<br>• 演示 id 替换<br>• reducer 改接 LabCommand<br>• 为上述改动所需的最少 props 和条件渲染<br>视觉层明确排除。PR 逐文件列出改动行，为审查提供直接证据。 | 意图，终局仲裁；属于补设计 |
| D20-03 | 赞成 | 文档 owner 的生命周期已明确：W-09 在席时由 W-09 单独写入；W-09 按 D16-10 退役后，转给 W-10，不会悬空。承载 issue 一直 open，最后由一个 PR 关闭。`renderer/README.md` 始终归 W-10。 | 治理，终局确认 |
