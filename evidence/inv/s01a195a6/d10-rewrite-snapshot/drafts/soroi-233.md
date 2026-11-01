## 交付顺序与依据

依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L17-L18)；发行导入接入时点按 [D10-14](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md#L26)。

开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。

统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。

范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。

## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L385)：范围、依赖、验收与档位。
- [D2-25](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L62)：本切片继承的组件归属与行为契约。

## 目标 / what

F16、F17（Agent 部分）的 spec

## 责任与范围

- 所属仓库：`Pepgent/soroi`。
- 切片 ID：`E2E-18`。
- 解锁：F16、F17。
- 档位 / tier：`low`。
- 按已通过的 D2–D8 与 D10-05/06 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

开发期编写本 issue 全部 spec、runbook 与 check 脚本并合入本仓 main；只做本仓代码检查，不要求开发期执行跨组件场景或生成 live Verdict。执行依赖只约束统一 e2e 阶段，不约束编写与提交。E2E-* 的开发期执行豁免不扩大到产品实现切片的本仓真实入口观察。

## 统一 e2e 阶段承接的验收

本 issue 是统一 e2e 阶段的 S1 F16–F17 Agent 执行项，同时承接开发期测试代码交付。原验收要求“通过”在该阶段按 D8 完整相关矩阵执行，不是只完成 spec 即产品通过；由测试者从真实入口采集权威下游结果，依 D8-11/12 归档。

开发代码已合入不等于本执行项通过；本 issue 在相应真实执行与证据归档完成前保持 open，不把原义务再移给未来 issue。

## 依赖关系

开发期无跨组件 live 前置；下列仅为统一阶段执行前置。

- 统一验收前置： [SOR-18](https://github.com/Pepgent/soroi/issues/222)（统一阶段运行所需的真实代码/产物与环境；不是开发期开工门禁）。
- 统一验收前置： [SOR-19](https://github.com/Pepgent/soroi/issues/229)（统一阶段运行所需的真实代码/产物与环境；不是开发期开工门禁）。
- 统一验收前置： [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（统一阶段运行所需的真实代码/产物与环境；不是开发期开工门禁）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口与实际需要的代码/产物。
- `PR`：附本 issue 的测试代码 PR 链接并标明仅交付代码；不以代码合入替代统一阶段执行或关闭本执行项。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：分别记录开发代码已合入与统一阶段已执行的事实；只有真实运行命令、原始结果、D8 Verdict 和 PM 归档齐备后才宣称本执行项通过。


## 承接来源与原验收义务

下列各项由本统一阶段执行项完整承接；原文为范围快照，不恢复开发期门禁。涉及 hash/digest 的值只用于对象寻址或组装身份，禁止以比对作为任何通过证据。多个承接项覆盖同一来源时，各自执行本阶段适用部分，合计覆盖全部原义务，不相互替代。

### 来源 [soroi#216](https://github.com/Pepgent/soroi/issues/216)

原义务原文：

> runner 进程消失；子 agent 仍可唤醒

### 来源 [soroi#222](https://github.com/Pepgent/soroi/issues/222)

原义务原文：

> 远程那一代能连回 Mux，并完成交回

### 来源 [soroi#228](https://github.com/Pepgent/soroi/issues/228)

原义务原文：

> 远程 Agent 中止后，transcript 回到中心。中止一个仍在排队的作业得到 `EndedUnstarted` 的分支由 E2E-17 在 Slurm 上验证

### 来源 [soroi#229](https://github.com/Pepgent/soroi/issues/229)

原义务原文：

> `soroi-batch/` 中只有已改名的文件
