# D21 LeadMentor（GPT 族）选票

LeadMentor 无法读取 `local://`，本文件由 GovClone_55b0 按其 IRC 回复（reply-to 15bd34f796839d08）原文转录。

| ID | 票 | 理由 | 分类意见 |
|---|---|---|---|
| D21-01 | 赞成 | `/work` 是中心 Stack 已声明的会话 worktree 卷在容器内的挂载根路径，这个路径由 deploy 决定。deploy 以 `PEPGENT_LAB_WORKTREE_HOME=/work` 把它注入 Lab，Lab 再在此根下按 D7-04 管理各会话的 clone。这样分开了两段生命周期：部署决定卷和挂载路径，应用负责 clone 的创建、使用和删除。方案不新建卷，不复制路径状态，也不把 deploy 专属的挂载点硬编码进应用默认值。另开 issue、用非 draft PR 承载是合理的，因为它与 deploy#18 的原因和验收都不同。只做本仓检查，不扩大到阶段 C。 | 串联，终局确认。这是跨仓的部署到应用配置契约，不改变 D2-20 和 D7-04 的意图 |
