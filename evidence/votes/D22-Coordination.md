# D22（P1）总协调指挥席：主会话表态（与 GovClone 合计 1 票）

LEDGER 核对：
- C1-2：挂载点归 deploy 所有（D2-23）；
- C4-3：不设第二个路径来源。

| ID | 表态 | 理由 |
| --- | --- | --- |
| D22-01 | 赞成 | 库缓存放回 D2-20 规定的独立 `library-cache` 卷，不再占用 `web-state` 卷，符合“卷按写方分开”的要求。挂载 `/var/lib/pepgent/library` 已在 compose.yaml:107 声明，这次只补一个环境变量。与 D21 共用同一个 issue 和 PR，避免 W-04 再进场一次 |
