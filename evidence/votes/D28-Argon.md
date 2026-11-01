# D28 选票：Argon

议程：接缝金丝雀：中心身份注入无承载、Lab 锁定的 store 契约未跟进（[Pepgent/PM#47](https://github.com/Pepgent/PM/issues/47)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D28-01 v1：赞成（Argon-2，2026-11-01T17:33:40.710Z）——作废：该行已修订到 v2


**分类意见：** 串联

# D28（PM#47）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】接缝金丝雀实测发现的中心环境身份（`SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`）容器入口漏注入与 `Pepgent` 锁定 `store-contract` 副本滞后于 `D23-01`，属于已定全流程范围（`A0`、`F01–F31`）与跨组件契约咬合的真实缺口，立即补齐承载与副本刷新责任符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现再到 e2e 全流程走通，不擅自收缩）、`(U) U93`、`U95`、`U96`（`LEDGER.md:107,109-110` 及 `AGENTS.md` C1-3：产品全景席运行异步非阻塞跨组件接缝金丝雀，发现跨仓协议/配置错配立即发起 `P1` 投票纠偏，防止错配潜伏到阶段 C 集中爆发）；`(D)` `design/store.md:66`、`design/eval.md:93,248`、`PM/evidence/decisions/D13-contract-gaps.md:44-45`（D13-01/02）、`PM/evidence/decisions/D16-15-store-contract.md:28`。
   - **边界：** 两项均不改动 `design/*.md`（`design/store.md:66` 与 `design/eval.md:93,248` 已写明中心运行容器从部署获得自身镜像 digest 与配置哈希），不向插件内塞默认值，也不增设开发期阻塞锁。

## 二、条目投票（串联）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D28-01 v1** | 串联 | **approve（赞成）** | 金丝雀实测证实 `deploy` 的 `lab-web` 与 `soroi` 的 `compose.yaml` `central` 均未注入 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST`，导致 `Main` 角色在模块加载时即抛 `IDENTITY_REJECTED`（因 D15 回退 `deploy PR12` 后，D16 恢复 D13 时漏建了 D13-02 ①② 的承载 issue）。按已通过的 D13-02 正文在 `Pepgent/deploy` 与 `Pepgent/soroi` 分别新建承载 issue 并在 `A0`/`F01` 前完成，不重开已关联被回退 PR 的 `deploy#11`，也不在插件内伪造默认身份，完全符合 D13-01/02 与 `design/eval.md:93`。 |
| **D28-02 v1** | 串联 | **approve（赞成）** | `Pepgent` 根 `package-lock.json` 中的 `pepgent-store` 是 `soroi#store-contract` 权威分支的近处锁定副本；此前 D16-15 未写明由谁、何时刷新，导致 D23-01（`generation` 改为非空字符串）合入后 `Pepgent` 仍停在旧 commit `8a23e21`（实测构造 `AgentGenerationTransfer` 报类型错误）。明确由消费方 `Pepgent` 的 Lab 席位在每次 `store` 契约变更推进 `store-contract` 后跟进 `npm update pepgent-store` 并立即为 D23-01 开跟进 issue，消除了跨仓 schema 漂移隐患。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意均标为 `串联`）。


## D28-02 v1：赞成（Argon-2，2026-11-01T17:33:40.710Z）


**分类意见：** 串联

# D28（PM#47）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】接缝金丝雀实测发现的中心环境身份（`SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`）容器入口漏注入与 `Pepgent` 锁定 `store-contract` 副本滞后于 `D23-01`，属于已定全流程范围（`A0`、`F01–F31`）与跨组件契约咬合的真实缺口，立即补齐承载与副本刷新责任符合用户原始意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现再到 e2e 全流程走通，不擅自收缩）、`(U) U93`、`U95`、`U96`（`LEDGER.md:107,109-110` 及 `AGENTS.md` C1-3：产品全景席运行异步非阻塞跨组件接缝金丝雀，发现跨仓协议/配置错配立即发起 `P1` 投票纠偏，防止错配潜伏到阶段 C 集中爆发）；`(D)` `design/store.md:66`、`design/eval.md:93,248`、`PM/evidence/decisions/D13-contract-gaps.md:44-45`（D13-01/02）、`PM/evidence/decisions/D16-15-store-contract.md:28`。
   - **边界：** 两项均不改动 `design/*.md`（`design/store.md:66` 与 `design/eval.md:93,248` 已写明中心运行容器从部署获得自身镜像 digest 与配置哈希），不向插件内塞默认值，也不增设开发期阻塞锁。

## 二、条目投票（串联）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D28-01 v1** | 串联 | **approve（赞成）** | 金丝雀实测证实 `deploy` 的 `lab-web` 与 `soroi` 的 `compose.yaml` `central` 均未注入 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST`，导致 `Main` 角色在模块加载时即抛 `IDENTITY_REJECTED`（因 D15 回退 `deploy PR12` 后，D16 恢复 D13 时漏建了 D13-02 ①② 的承载 issue）。按已通过的 D13-02 正文在 `Pepgent/deploy` 与 `Pepgent/soroi` 分别新建承载 issue 并在 `A0`/`F01` 前完成，不重开已关联被回退 PR 的 `deploy#11`，也不在插件内伪造默认身份，完全符合 D13-01/02 与 `design/eval.md:93`。 |
| **D28-02 v1** | 串联 | **approve（赞成）** | `Pepgent` 根 `package-lock.json` 中的 `pepgent-store` 是 `soroi#store-contract` 权威分支的近处锁定副本；此前 D16-15 未写明由谁、何时刷新，导致 D23-01（`generation` 改为非空字符串）合入后 `Pepgent` 仍停在旧 commit `8a23e21`（实测构造 `AgentGenerationTransfer` 报类型错误）。明确由消费方 `Pepgent` 的 Lab 席位在每次 `store` 契约变更推进 `store-contract` 后跟进 `npm update pepgent-store` 并立即为 D23-01 开跟进 issue，消除了跨仓 schema 漂移隐患。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意均标为 `串联`）。


## D28-01 v2：赞成（Argon-2，2026-11-01T17:37:33.312Z）


**分类意见：** 串联

# D28-01 v2（PM#47）产品原始意图守护席（Argon-2）重投选票

## 一、意图裁决

1. **【定】为 `D13-02 ①②` 重建 `deploy` 与 `soroi` 承载 issue，并将验收拆分为阶段 B 本仓检查与阶段 C（`A0`/`F01`）跨组件容器验收（加合并后 `U96` 异步接缝金丝雀复核），同时满足中心身份真实注入（`U2`、`U23`、`D13-01/02`）与开发期不设跨组件 e2e 阻塞锁（`U30–U32`、`U83`、`U96`、`D16-13`）两项用户意图。**
   - **依据：** `(U) U2`、`U23`（`LEDGER.md:69,86`：从设计到实现再到 e2e 全流程走通）、`(U) U30–U32` 与 `U83`（`LEDGER.md:88,97`：开发期各仓只做本仓检查，禁止在每个开发切片上设跨组件 e2e 验收锁）、`(U) U96`（`LEDGER.md:110`：产品全景席异步非阻塞接缝金丝雀复核）；`(D)` `design/store.md:66`、`design/eval.md:93,248`、`PM/evidence/decisions/D13-contract-gaps.md:44-45`、`PM/evidence/decisions/D16-phaseB-review-restore.md:28,37`。

## 二、条目投票（串联）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D28-01 v2** | 串联 | **approve（赞成）** | v2 采纳了 `ArgonGovernance` 对 v1 `how` 第 3 点的反例修订：保留新建 `Pepgent/deploy`（D13-02 ①）与 `Pepgent/soroi`（D13-02 ②）两个承载 issue 且在 `A0`/`F01` 前合入，同时按 `D16-13` 将切片 PR 验收限定为本仓计算/插值/渲染检查，把真实容器入口启动中心 `Main` 与 `eval` 捕获验证归入阶段 C 的 `A0`（`soroi#235`）与 `S1 F01` 承接 issue（并在合入后由产品全景席做 `U96` 异步接缝金丝雀复核）。既补齐了 `D15→D16` 恢复链遗漏的中心身份注入承载，又严守开发期不设跨组件 live 阻塞锁的铁律。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。

