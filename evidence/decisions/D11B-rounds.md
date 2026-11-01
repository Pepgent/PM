# D11-B 起草、审查与计票记录

| 阶段 | 事件 | 处理 |
| --- | --- | --- |
| 来源 | D11-A 分流表（PM#17）把 LR-10、LR-18/35/36/37、LR-21、LR-28、LR-43 列为 D11-B；leader 主会话要求按 D11-A 同一流程完成 | 事实依据沿用 D11-facts-A/B，并补读 remote 的 `model.rs`、`identity.rs`、插件 `supervisor.ts` 与 D4、D5、D8 当前正文 |
| 审查 | discuss:steady、discuss:divergent 审查第 1 版 | 第 2 版主要修改：D11-37 证据句收窄，条目数据只留 `{ text }`、顺序以 transcript 为准，F22⑤ 场景保留一个可见 atom；D11-21 改为“生命周期记录不成为公开契约”，F22⑨ 按 store 事实判定（Steady 主张保留，未采纳，理由见决策表）；D11-10 写明 Slurm 需新接入 `Registry::resolve`，执行侧原样交给 Apptainer，步骤镜像同样处理；D11-28 依据措辞收窄；D11-43 拆为 43A（remove 不取消，落实 D4:28）与 43B（Komodo 启动失败作为失败分支不进设计）；行号、影响表与回写清单补全，含 remote 设计文档与 D11-A 遗留的 compare `map` 旧格式 |
| 计票 | 三族对第 2 版 7 个投票项投票 | Claude 族 7/7 赞成；argon 7/7 赞成，无否决，无分类争议；导师 7/7 赞成，无反例 |
