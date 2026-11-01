## 交付顺序与依据

依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L17-L18)；发行导入接入时点按 [D10-14](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L26)。

开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。

统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。

范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L359)：范围、依赖、验收与档位。
- [D2-18](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L55)：本切片继承的组件归属与行为契约。
- [D7-17](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L77)：本切片继承的组件归属与行为契约。

## 目标 / what

投影：集群、容器、接入向导、设置、首页

## 责任与范围

- 所属仓库：`Pepgent/Pepgent`。
- 切片 ID：`WEB-06`。
- 解锁：F17、F31。
- 档位 / tier：`low`。
- 按已通过的 D2–D8 与 D10-05/06 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

从本仓真实集群、容器、接入向导、设置与首页入口观察投影与渲染；外部 remote/Mux/store 在协议边界由本地桩承接，保留页面操作、截图与实际线数据，不冒称真实远程通过。

本节只验本仓真实入口的局部行为，记录实际命令、环境、输出和本仓可观察结果；不拉起其他 Pepgent 组件、不运行完整 compose、不执行 F 行。外部协议边界可用已通过协议的本地协议桩，证据必须标明协议桩观察，不冒称真实跨组件通过。类型检查、构建、mock/oracle 或文件存在不能替代本仓真实入口的运行观察。

## 统一 e2e 阶段承接的验收

统一阶段由 [Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) 承接本切片的跨组件验收；完整执行下列原义务及其 D8 矩阵相关流程，不缩减范围：

> 同上

此处引用中涉及的 hash/digest 仅为对象地址或协议字段，不是通过证据；以真实执行行为与权威下游结果判定。各承接 issue 的正文同时列明本来源和原义务。

## 依赖关系

仅保留编译、类型、构建或调用契约确实需要的代码/产物关系。以下跨组件运行条件只约束上述统一阶段，不阻塞开发；未被本仓构建实际消费的外部服务不要求启动。

- 代码/产物关联： [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（依赖切片的代码已合入其仓 `main` 即可开工；仅限实际需要的代码/产物，不要求上游 runtime 通过）。
- 代码/产物关联： [LAB-12](https://github.com/Pepgent/Pepgent/issues/11)（依赖切片的代码已合入其仓 `main` 即可开工；仅限实际需要的代码/产物，不要求上游 runtime 通过）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口与实际需要的代码/产物。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、本仓真实入口的命令/环境/输出；跨组件结果由上列统一阶段 issue 留证，不因等待统一验收保持实现 PR open。Web 本仓页面观察保留真实操作及截图。
