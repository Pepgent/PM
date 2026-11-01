# https://github.com/Pepgent/PM/issues/15 D9-03 点线面缺口报告与表决

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L391)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

点、线、面的归类与报告，交表决

## 责任与范围

- 所属仓库：`Pepgent/PM`。
- 切片 ID：`D9-03`。
- 解锁：F32。
- 档位 / tier：`high`。
- 波次 / wave：`W7`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

§5 的规则逐条执行；报告表决通过

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [D9-02](https://github.com/Pepgent/PM/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-01](https://github.com/Pepgent/soroi/issues/181)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-02](https://github.com/Pepgent/soroi/issues/218)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-10](https://github.com/Pepgent/soroi/issues/182)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-11a](https://github.com/Pepgent/soroi/issues/213)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-11b](https://github.com/Pepgent/soroi/issues/219)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-12](https://github.com/Pepgent/soroi/issues/220)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-13](https://github.com/Pepgent/soroi/issues/221)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-14](https://github.com/Pepgent/soroi/issues/226)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-15](https://github.com/Pepgent/soroi/issues/227)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-16](https://github.com/Pepgent/soroi/issues/231)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-17](https://github.com/Pepgent/soroi/issues/232)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-18](https://github.com/Pepgent/soroi/issues/233)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-19](https://github.com/Pepgent/soroi/issues/208)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-20](https://github.com/Pepgent/Pepgent/issues/30)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-21](https://github.com/Pepgent/Pepgent/issues/23)（前置切片须已有 runtime 验收证据，才能开工）。
- 全部 verdict：按 [D8 §3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151) 收齐 F01–F31 的全部分段证据，不能仅以实现 issue 关闭替代。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/PM/issues/14 D9-02 叶子来源分类与录制值比对

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L390)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

来源分类与线数据比对：对每个叶子标出 §5.2 的来源类别，并给出投影源码位置与录制值

## 责任与范围

- 所属仓库：`Pepgent/PM`。
- 切片 ID：`D9-02`。
- 解锁：F32。
- 档位 / tier：`low`。
- 波次 / wave：`W7`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

每个叶子都有类别和证据路径

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [D9-01](https://github.com/Pepgent/PM/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [E2E-20](https://github.com/Pepgent/Pepgent/issues/30)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



# https://github.com/Pepgent/PM/issues/13 D9-01 18 个字段的叶子类型清单

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L389)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

叶子字段清单：用 TS 编译器 API 遍历 `client/contracts/lab-*.ts` 中 18 个字段的类型，得到每个叶子的路径与类型

## 责任与范围

- 所属仓库：`Pepgent/PM`。
- 切片 ID：`D9-01`。
- 解锁：F32。
- 档位 / tier：`free`。
- 波次 / wave：`W7`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

清单覆盖 SNAP:24-58 的 18 个字段，由 low 复核

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [WEB-07](https://github.com/Pepgent/Pepgent/issues/29)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。



