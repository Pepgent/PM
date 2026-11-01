# https://github.com/Pepgent/Pepgent/issues/30 E2E-20 第二段浏览器 runbook 与核对

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L387)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。
- [D7-20](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L80)：本切片继承的组件归属与行为契约。
- [D7-04](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L64)：本切片继承的组件归属与行为契约。

## 目标 / what

第二段的 runbook 与 check：F08–F13、F17、F18、F23–F31（D8-10）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`E2E-20`。
- 解锁：S2、F31。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过（EP6）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-07](https://github.com/Pepgent/Pepgent/issues/29)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DEP-01](https://github.com/Pepgent/deploy/issues/2)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DEP-02](https://github.com/Pepgent/deploy/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/29 WEB-07 阶段 B 全页面真实数据切换

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L360)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-11](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L71)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。

## 目标 / what

阶段 B 一次落地：放宽 id、把剧情字面量改成数据事实、`AgentTemplate.id` 改为 omp agent 定义名、`AgentTemplate.harness` 收窄为字面量 `'omp'`（D7:71、77）、运行时不再引用 `LAB_SNAPSHOT`；经 Main 与 UI 负责人协调（D7:77）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-07`。
- 解锁：S2。
- 档位 / tier：`mid`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

构建好的 host 在浏览器中走完 13 个页面，数据都来自后端（SMOKE:22-54）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-03](https://github.com/Pepgent/Pepgent/issues/26)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [WEB-04](https://github.com/Pepgent/Pepgent/issues/27)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [WEB-05](https://github.com/Pepgent/Pepgent/issues/25)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [WEB-06](https://github.com/Pepgent/Pepgent/issues/28)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/28 WEB-06 算力及其余页面投影

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L359)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。

## 目标 / what

投影：集群、容器、接入向导、设置、首页

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-06`。
- 解锁：F17、F31。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

同上

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-12](https://github.com/Pepgent/Pepgent/issues/11)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/27 WEB-04 讨论、数据集与编辑器投影

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L357)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。

## 目标 / what

投影：讨论、数据集、流程编辑器

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-04`。
- 解锁：F09、F12、F27。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

同上

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-11a](https://github.com/Pepgent/Pepgent/issues/22)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-11b](https://github.com/Pepgent/Pepgent/issues/18)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/26 WEB-03 实验图、时间轴与比较投影

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L356)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。

## 目标 / what

投影：catalog、实验列表、实验详情（`RunGraph` 到 `ExperimentFlowFixture`，含时间轴、对比、派生导航、runner workspace）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-03`。
- 解锁：F08、F10、F13、F18、F23–F26。
- 档位 / tier：`mid`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

纯函数投影的单元测试，输入是真实录制的线数据；录制中含 `Aborted` 变体的调用（不带 `version`、`body`、`env`，`outputs = []`），投影出被中止的节点（PM#5 第 2 项）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-07b](https://github.com/Pepgent/Pepgent/issues/20)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/25 WEB-05 节点库与自动化投影

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L358)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。

## 目标 / what

投影：节点库、自动化

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-05`。
- 解锁：F28–F30。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

同上

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-09](https://github.com/Pepgent/Pepgent/issues/19)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-10](https://github.com/Pepgent/Pepgent/issues/15)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/24 LAB-08 介入、中止与人类 IRC 命令

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L348)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L69)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

命令：`intervene.takeover`、`intervene.answer`、`intervene.derive`，`run.abort`，`human.irc`（D7:69）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-08`。
- 解锁：F08、F23–F25。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

每条命令的结论都由拥有方返回

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-07b](https://github.com/Pepgent/Pepgent/issues/20)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-15](https://github.com/Pepgent/soroi/issues/217)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [SOR-16](https://github.com/Pepgent/soroi/issues/207)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/23 E2E-21 VS2 server function 垂直集成

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L388)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。
- [D7-20](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L80)：本切片继承的组件归属与行为契约。
- [D7-04](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L64)：本切片继承的组件归属与行为契约。

## 目标 / what

VS2 的 server function 层核对（D8-13）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`E2E-21`。
- 解锁：VS2。
- 档位 / tier：`low`。
- 波次 / wave：`VS2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DEP-01](https://github.com/Pepgent/deploy/issues/2)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DEP-03](https://github.com/Pepgent/deploy/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/22 LAB-11a 讨论读取、附件与装载

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L351)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-07](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L67)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

讨论的读取与装载：停驻会话的 transcript 读取（P2）、`discussion.load`、附件（D7:67）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-11a`。
- 解锁：F09、F31。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

读停驻会话不会唤醒它；`discussion.load` 写入 `discussion_context`

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-05](https://github.com/Pepgent/Pepgent/issues/16)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/21 WEB-02 真实 LabBridge 与线协议

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L355)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。

## 目标 / what

阶段 B 的基础：`src/protocol/lab`、新的 `LabBridge`、`subscribe`、`send`、`watchAgent`（D7:77、117-123）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-02`。
- 解锁：S2。
- 档位 / tier：`mid`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

页面 loader 读取线数据，事件使它失效后重读

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [WEB-01](https://github.com/Pepgent/Pepgent/issues/9)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/20 LAB-07b 在途叠加层与 Agent 流

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L347)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-08](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L68)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

读取侧：在途叠加层（`writers` 与 `slots`）、`/api/lab/agents/{id}/stream`、files（D7:68）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-07b`。
- 解锁：F08、F17、F26。
- 档位 / tier：`mid`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

页面线数据中带有在途槽位，SSE 转发读方帧

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-03](https://github.com/Pepgent/omp-rpc-mux/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-06](https://github.com/Pepgent/omp-rpc-mux/issues/6)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/19 LAB-09 自动化、定时与审批

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L349)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-10](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L70)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

自动化：事件触发、`croner` 定时、审批门禁（D7:70）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-09`。
- 解锁：F30。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

A-01 规则写入 `automation_run`；`waiting` 状态的运行批准后才开会话

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/18 LAB-11b 草稿、启动与审批状态

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L352)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-06](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L66)：本切片继承的组件归属与行为契约。
- [D6-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L40)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

草稿与启动：`draft.save`、`experiment.start`、`experiment.approve`；启动意图与审批状态记在 `pending_launch`，运行绑定记在 `experiment_ext.draft`，不往草稿写 `launched`（D7:66、161-162；D6:40）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-11b`。
- 解锁：F27、F31。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

草稿只在 `lab.sqlite`，不进 store；免审批时 `pending_launch` 为 `sent`、会话收到含草稿的 prompt；`run_started` 后 `experiment_ext.draft` 指向该草稿，`pending_launch` 已删除

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/17 LAB-07a catalog、运行图与事件读取

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L346)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-08](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L68)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

读取侧：catalog 与实验页的线数据（`RunGraph`）、`/api/lab/events`、对象代理（D7:68）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-07a`。
- 解锁：F26。
- 档位 / tier：`low`。
- 波次 / wave：`VS2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

运行变更时推送 `run` 频道

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/16 LAB-05 Lab artifact host tools

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L344)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-05](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L65)：本切片继承的组件归属与行为契约。
- [D7-07](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L67)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

`lab_*` host tools（D7:65、216-221）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-05`。
- 解锁：F09、F31。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

`lab_open_artifact` 把产物拷进本会话 worktree 的 `inputs/`，字节与 store 对象哈希一致；`lab_save_artifact` 在 worktree 里生成不可变快照 `artifacts/<hash>/<文件名>` 并登记 `artifact_meta`，不写 store（D7:65、67、219）

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-04](https://github.com/Pepgent/soroi/issues/188)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/15 LAB-10 节点库导出、stage 与 apply

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L350)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-11](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L71)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

节点库：从 TS 导出定义（D7 P1）、`library.stage` 与 `library.apply`（commit 后快进）、usage（D7:71）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-10`。
- 解锁：F24、F28、F29。
- 档位 / tier：`mid`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

导出与源码一致；apply 生成 commit

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-02](https://github.com/Pepgent/Pepgent/issues/10)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-11](https://github.com/Pepgent/soroi/issues/202)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [LIB-01](https://github.com/Pepgent/lab-library/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/14 LAB-06 store 生命周期与实验索引

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L345)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-06](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L66)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

store 客户端；订阅生命周期流，写 `experiment_ext`；实验状态的投影（D7:66）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-06`。
- 解锁：F30、F31。
- 档位 / tier：`low`。
- 波次 / wave：`VS2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

收到 `run_started` 后分配 `R-0xx` 编号

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-02](https://github.com/Pepgent/Pepgent/issues/10)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [STO-05](https://github.com/Pepgent/soroi/issues/190)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/13 LAB-04 LabSessions 与讨论 prompt

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L343)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D3-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md#L66)：本切片继承的组件归属与行为契约。
- [D7-04](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L64)：本切片继承的组件归属与行为契约。
- [D7-09](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L69)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

`LabSessions`：写方、开代、dial、`ready`、`get_state`、`set_host_tools`；根会话的 `human_irc_queue`（根会话的写方就是 Lab，不经 Mux 转发，D3:66）；`discussion.create` 与 `discussion.prompt`（D7:64、69）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-04`。
- 解锁：F25、F31。
- 档位 / tier：`mid`。
- 波次 / wave：`VS2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

一条 prompt 到达根会话，会话停驻后能唤醒

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [LAB-02](https://github.com/Pepgent/Pepgent/issues/10)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-03](https://github.com/Pepgent/omp-rpc-mux/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/11 LAB-12 算力作业只读状态与 tail SSE

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L353)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L72)：本切片继承的组件归属与行为契约。
- [D7-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L78)：本切片继承的组件归属与行为契约。
- [D2-14](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L51)：本切片继承的组件归属与行为契约。

## 目标 / what

算力页的只读读取（D7-12、D7-18；D8-16）：`lab.page.read{lab, page:'clusters'}` 返回 `templates`、`jobs: {run: RemoteRunSummary; status: RunStatus}[]`、`presence`；日志尾部另由只读 SSE `GET /api/lab/jobs/{run}/tail` 提供（`remote tail` 快照，有订阅者时定期取）。有订阅者时定期调用 `remote runs`、`remote status`，变化经 `/api/lab/events` 的 `compute` 频道通知重读；作业最新事实为 `Removed` 时不开 tail 流（D7:72、78、145-146）。第一版无命令

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`LAB-12`。
- 解锁：F17、F31。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

一个运行中的远程作业出现在页面线数据里，带模板与状态；tail SSE 推送它的日志尾部；作业结束后 `compute` 通知触发重读、状态更新；排队中被取消的作业显示终态 `EndedUnstarted`（PM#4）；`remove` 之后不再开 tail 流

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [REM-05](https://github.com/Pepgent/remote/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-06](https://github.com/Pepgent/remote/issues/5)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-07](https://github.com/Pepgent/remote/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [REM-02](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/9 WEB-01 阶段 A 异步 snapshot

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L354)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D7-16](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L76)：本切片继承的组件归属与行为契约。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。

## 目标 / what

阶段 A：`readSnapshot` 改为异步，loader 构造服务（D7:76）

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-01`。
- 解锁：S2。
- 档位 / tier：`low`。
- 波次 / wave：`W6`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

13 个 controller 没有改动，页面照常渲染

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- 无前置切片。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/Pepgent/issues/3 用 Keycloak OIDC 登录取代 web 静态访问令牌（认证部分）

## 目标

用外部 OIDC 提供商（Keycloak）登录取代 web 宿主的静态本地访问令牌：实现 [auth-oidc-lab-authorization.md](https://github.com/Pepgent/Pepgent/blob/main/docs/design/auth-oidc-lab-authorization.md) M1 中的认证部分（D2、D3、D4、D6 的解析与 realm 准入、D10、D11），并删除 `pepgent_web_token` / `PEPGENT_API_TOKEN`。

## 上下文

- **Repo**: `Pepgent/Pepgent`
- **Design doc / source**: `docs/design/auth-oidc-lab-authorization.md` §4.1 D2–D4、D6、D10、D11，§4.3，附录 A M1；操作员请求（2026-09-27）：「把oauth的部分实现了，iac有可用的keycloak能随便用」，范围确认为「仅认证」，paseo 子进程环境「只放系统变量」。
- **Conventions**: `docs/conventions/09-web-runtime-boundary.md`、`05-testing-tiers.md`

## 问题

当前 web 宿主把一个进程级静态 token 作为 HttpOnly cookie 发给任何能打开根页的客户端（`apps/web/src/server/transport/trust.ts#isTrustedRequest`、`apps/web/src/app/start.ts`）。它不是用户身份：没有登录、没有用户、没有到期，也无法接入 Keycloak 的组属性授权。设计已决定由 Start 应用内的 BFF 完成 Authorization Code + PKCE，浏览器只持不透明会话 cookie；但 paseo daemon 子进程继承宿主完整 `process.env`，引入 client secret 之前必须先改为显式白名单（09 的 MUST NOT）。

## 预期结果

- 结果 1：未登录的浏览器打开 pepgent 后被带到 Keycloak 登录页；登录后回到应用，浏览器只有 HttpOnly 会话 cookie，JS 可读存储中没有 OIDC token。
- 结果 2：`pepgent_access` 中没有有效 grant 且没有 `operator` client role 的账号得到 403 页面，不建立会话；只有 `ro` grant 或只有 `operator` 的账号被接纳。
- 结果 3：access token 在打开 SSE 时由服务器按时刷新；Keycloak 撤销用户的全部 grant 后，下一次刷新结束会话，SSE 收到 `session-expired`，浏览器回到登录。
- 结果 4：`/auth/logout` 结束本地会话与 Keycloak 会话，旧 cookie 之后得 401；宿主重启后旧 cookie 得 401 并重新登录。
- 结果 5：他人完成的回调 URL 在另一个浏览器重放得 400，不建立会话（login CSRF）。
- 结果 6：paseo daemon 及其启动的 agent 的环境中没有 `PEPGENT_*`（含 client secret）和其他非系统变量。
- 结果 7：缺少任一 OIDC 配置时生产宿主与 `vite dev` 在监听前失败并列出缺失项。

## 约束

- 不做 Lab 授权执行（`PEPGENT_DEFAULT_LAB` 下的只读/读写、T2 `operator`），留待后续。
- 不托管用户信息：会话只在进程内存（D3）。
- 生产 `moat` realm 的 `pepgent` client 按附录 B 由 pve-vctcn IaC 声明，不在本 issue 内；本 issue 用临时 realm 验证。

## 验收标准

| # | Dimension | Check | Command | Env | Expect |
|---|-----------|-------|---------|-----|--------|
| 1 | integration | 覆盖结果 1：真实浏览器登录 | `agent-browser open http://127.0.0.1:3100/` → Keycloak 登录 → 回到 app；`agent-browser cookies get --json`；`agent-browser eval 'document.cookie'` | 构建后宿主 + keycloak.237575.xyz 临时 realm | URL 先到 Keycloak auth 端点、后回 `/new`；只有 `pepgent_session`（httpOnly, SameSite=Lax）；`document.cookie` 为空 |
| 2 | integration | 覆盖结果 2：准入 | 分别以无 grant、仅 `alpha:ro`、仅 `operator` 用户登录 | 同上 | 403 页面且无会话 cookie / 进入应用 / 进入应用 |
| 3 | integration | 覆盖结果 3：刷新与撤销 | 登录后保持页面空闲，读 Keycloak Admin `GET /users/{id}/sessions` 的 `lastAccess`；再 `DELETE /users/{id}/groups/{g}` | 同上，access token 60 s | `lastAccess` 无用户请求而前进；删组后 30 s 内浏览器经 `/auth/login` 回到 403 页 |
| 4 | integration | 覆盖结果 4：登出与重启 | `/auth/logout` 后以旧 cookie `GET /api/host/events`；重启宿主后观察浏览器网络 | 同上 | 401 `unauthenticated`；重启后 EventSource 401 → `/auth/login` → `/auth/callback` → 回到原路径 |
| 5 | function | 覆盖结果 5：回调重放 | built-host node 测试：不带登录 cookie 请求回调 URL | fake OIDC provider | 400，无 `pepgent_session` |
| 6 | environment | 覆盖结果 6：子进程环境 | `ps eww -p <daemon 子进程>`，宿主环境含哨兵 `E2E_SENTINEL_FORBIDDEN_API_KEY` | macOS 构建后宿主 | 变量名集合无 `PEPGENT_*`、无哨兵 |
| 7 | function | 覆盖结果 7：配置缺失 | 不带 OIDC 变量启动 `node bin/pepgent-web.mjs` | 本地 | 非零退出，日志列出四个变量名，未监听 |

## 依赖关系

- Blocks: 后续 Lab 授权执行（附录 A M1 的剩余部分）。



