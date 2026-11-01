## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L368)：范围、依赖、验收与档位。
- [D6-22](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L50)：本切片继承的组件归属与行为契约。
- [D2-20](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L57)：本切片继承的组件归属与行为契约。
- [D2-23](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L60)：本切片继承的组件归属与行为契约。
- 交付顺序依据：LEDGER U32（“引入过多的中间环节做e2e而不是把东西开发好后再做e2e测试是你一开始规划的就有问题”）与 Argon D10 意图裁决 1.1【定】：开发期只做本仓检查，跨组件 live 验收在全部组件开发完成后的统一 e2e 阶段执行。

## 目标 / what

`pepgent-central` 的 store 就绪后，init 以 `PUT /releases/{version}` 提交发行 artifact（D6:50、155-158）

## 责任与范围

- 所属仓库：`Pepgent/deploy`。
- 切片 ID：`DEP-03`。
- 解锁：S2。
- 档位 / tier：`low`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance（本仓检查）

按 D6 已通过的 releases 协议实现 init：在本机运行本仓真实 init 脚本，指向一个按该协议实现的本地协议桩，观察并留证——store 就绪后才提交；单个 `PUT /releases/{version}` 携带完整发行 artifact，请求路径、方法与请求体符合协议，没有独立的 objects 上传；桩返回失败时 init 以非零退出且不报告成功。证据写明这是协议桩观察，不当作真实 store 验收。

## 统一 e2e 阶段承接的验收

D8 原验收——真实 `pepgent-central` store 上 `GET /releases` 有这条 `ReleaseRecord`，它引用的对象都能 `GET /objects/<哈希>`——在全部组件开发完成后的统一 e2e 阶段（S2）以真实 store 执行并留证，范围不减。不得将 hash 验证作为证据，须用真实运行行为与下游结果证明。

## 依赖关系

- Depends on: [STO-12](https://github.com/Pepgent/soroi/issues/203)（releases 协议由已通过设计给出；开发期不等待其实现）。
- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（发行 artifact 形态）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者与工作入口。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、本仓检查的命令/环境/输出。

