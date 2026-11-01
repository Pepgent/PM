# D24 LeadMentor（GPT 族）选票

本文件由 GovClone_55b0 按 IRC 原文转录。

## v1（已作废）
D24-01 赞成（reply-to 15bd3a8d6a839d96）。

## v2（有效，reply-to 15bd3b2fbe039db6）

| ID | 票 | 理由 | 分类意见 |
|---|---|---|---|
| D24-01 | 赞成 | v2 给 derive 请求补上了 `by: UserId`，并且一次同步了 D19、D3、D5、D6、D7、D8 中所有已通过但仍用旧形状的契约和验收入口。这样就消除了两条主路径失败：一是 W-09 按旧正文漏发 `by`，被按新 schema 严格校验的 W-07 拒绝；二是 W-07 按旧验收不解析 `by`，导致 D5-16 无法生成人类来源。Lab 收到 GUI 的 `intervene.derive`（不变）后，用当前 UserId 填 `by`；eval 提交成功后，以 `human:<by>` 投递 IRC。store 的 `POST /runs/derive` 与 `DeriveCommit` 不需要承担这个字段。`conversation.owner` 是 MemberId，不是 UserId，所以不能替代 `by`。由 W-09 产生 `by`，W-07 解析，秘书同步九处正文，权威和职责链完整。 | 串联，终局确认 |
