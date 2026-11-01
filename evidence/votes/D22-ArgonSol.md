# D22：产品原始意图守护席 Argon 选票

表决对象：`local://decisions/D22-draft.md` 的 D22-01。

## 闸门 A 与分类审查

- **闸门 A：触及跨仓公开配置契约，但不改变产品原始意图。** `PEPGENT_LAB_LIBRARY_HOME` 由 deploy 注入、Pepgent Lab 消费，精确名字和值语义需要管理层定案；D22 正是为此建立的窄 P1 条目。
- **意图裁决【定】：与 `(U) U2` 的完整交付和 `(U) U23` 的全流程走通要求一致。** 本条只是让 D2-20、D7-11、D7-19 已定的中心检出缓存真正落在独立卷上，不改变 Lab 库、会话或 soroi 的产品形态。
- **分类：同意“串联”。** 它连接 `Pepgent/Pepgent` 的 Lab 运行时与 `Pepgent/deploy` 的卷挂载声明。
- **缺失部分或设计补充：是。** 已通过正文规定了缓存卷及其用途，但此前没有规定 deploy 用哪个配置名把容器内挂载根路径交给 Lab。

## 逐条选票

| ID | 分类 | Argon 票 | 否决 | 理由 |
| --- | --- | --- | --- | --- |
| **D22-01** | **串联** | **赞成** | 否 | D2-20、D7-19 已规定中心检出缓存使用独立 `library-cache` 卷，写方是 Lab，属于可重建近处副本；D7-11 又规定默认分支检出和 `library.merge` 的干净集成检出都在该缓存根下。deploy 已将卷挂到 `/var/lib/pepgent/library`，把 `PEPGENT_LAB_LIBRARY_HOME` 定义为该卷在 Lab 容器内的根路径并注入此值，能消除当前错误落入 `web-state/lab-library` 的第二路径。没有新建卷、第二配置源或新状态权威，卷的写方、派生来源和可重建生命周期均不变。D21 与 D22 同属 Lab 卷挂载根路径注入，改动同一 deploy 服务、同一根因，共用一个 deploy issue 和一个非 draft PR 合理，不违反一 PR 关闭一 issue。 |

## 汇总

- D22-01：赞成。
- 意图否决：0。
- 分类争议：0。
