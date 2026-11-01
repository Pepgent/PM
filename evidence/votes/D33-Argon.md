# D33 选票：Argon

议程：council 工人总线树（soroi#321）未经操作员确认的条文逐行表决（[Pepgent/PM#52](https://github.com/Pepgent/PM/issues/52)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D33-01 v1：赞成（Argon-2，2026-11-01T18:39:00.379Z）


**分类意见：** 治理

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-02 v1：赞成（Argon-2，2026-11-01T18:39:00.379Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-03 v1：赞成（Argon-2，2026-11-01T18:39:00.379Z）


**分类意见：** 治理

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-04 v1：赞成（Argon-2，2026-11-01T18:39:00.379Z）


**分类意见：** 技术

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-05 v1：赞成（Argon-2，2026-11-01T18:39:00.379Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-06 v1：赞成（Argon-2，2026-11-01T18:39:00.380Z）


**分类意见：** 治理

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-07 v1：赞成（Argon-2，2026-11-01T18:39:00.385Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-08 v1：赞成（Argon-2，2026-11-01T18:39:00.385Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-09 v1：赞成（Argon-2，2026-11-01T18:39:00.385Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-10 v1：赞成（Argon-2，2026-11-01T18:39:00.385Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-11 v1：赞成（Argon-2，2026-11-01T18:39:00.386Z）


**分类意见：** 技术

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-12 v1：赞成（Argon-2，2026-11-01T18:39:00.386Z）——作废：该行已修订到 v3


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-13 v1：赞成（Argon-2，2026-11-01T18:39:00.386Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-14 v1：赞成（Argon-2，2026-11-01T18:39:00.386Z）


**分类意见：** 串联

# D33（PM#52）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】`council` 工人总线树（`soroi#321`，`D33-01` 至 `D33-14`）不触及 `pepgent-soroi/design/*.md` 产品设计基线，且其对工人状态权威、GitHub webhook 接收、`omp-peers` 单向送达、事件触发的 `area-manager` 空白 `task` 诊断及整体切换规则的具体条文，与用户关于组织治理提效的原话（`U61`、`U90`、`U97`、`U103–U105`、`U107–U111`）完全一致。**
   - **依据：** `(U) U61`（工人加载 `omp-peers`）、`(U) U90`（工作流提效正式方针进入投票）、`(U) U97`（每次用全新 subagent 巡检）、`(U) U103`（治理事务改为新开 `task` 从空白上下文开始）、`(U) U104`（主控不当消息总线，常规状态写进 issue、按批次读、不每条消息都唤醒）、`(U) U105`（议会 daemon 方案交给管理层过目）、`(U) U107`（使用 `peer` 纯单向巡查并亲自查看工作空间，`session://` 日志仅作备选）、`(U) U108–U111`（`LEDGER.md:133-136`：用 GitHub hook、开设独立 `Pepgent/council` 仓与专属 agent、由专属 agent 全权掌管实现和迁移方案并在实现后整体迁移、片区经理保留并改为事件触发的诊断角色）；`(D)` `SOR/AGENTS.md:22-27,57,60,64,80-83,123`、`evidence/gates/council-tree-gate-a.md`。
   - **边界：** 全部 14 行均属管理层与工程编排工具契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（治理 / 串联 / 技术）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-01 v1** | 治理 | **approve（赞成）** | 将 `council status post` 收窄为非工人席位的 `progress/note/alert`，取消片区经理转录工人状态的第二份副本，与 `D33-03`（D1）及 `U104`、`U108` 单一源头原则一致。 |
| **D33-02 v1** | 串联 | **approve（赞成）** | 以 `council` 名义向工人发送单向消息并在首行写明回应去处（原 issue/PR 首行 `STATUS` 状态头），守住 `U107` 纯单向通信边界。 |
| **D33-03 v1（D1）** | 治理 | **approve（赞成）** | 明确工人在 GitHub issue/PR 上的状态评论是工人状态的唯一源头，`council` 仅从 webhook 派生事件而不存人工可改写副本，符合 `<generic-rules>` 权威源头原则与 `U104`、`U108`。 |
| **D33-04 v1（D3）** | 技术 | **approve（赞成）** | 采用本机 `cloudflared`（`org.pepgent.council-ingress`）对接 `webhook.sock` 与 `homelab-tf#600` 声明的 `council-hook.237575.xyz`，无需开放 TCP 端口，且已写明依 `U110` 异步表决不阻塞 `council#1` 实现。 |
| **D33-05 v1（D4/K3）** | 串联 | **approve（赞成）** | 沿用 `C4-2` 与 `U107` 要求的 `omp-peers` 本机 socket `irc` 单向投递（禁用 `tern send`），按登记 `cwd` 实时查找会话，不受 `/new` 或 resume 变更会话 ID 影响。 |
| **D33-06 v1（D5）** | 治理 | **approve（赞成）** | 落实 `U111`（片区经理改为事件触发的诊断角色）、`U103` 与 `U97`：Main 在收到 `worker.blocked`、`worker.unreachable`、`diagnosis.request` 时每次用 `task` 新开空白 `area-manager` 实例，且 `how` 已补明诊断时继续遵守 `U107`（用 `peer` 单向巡查并亲自查看工作空间，`session://` 仅作备选）。 |
| **D33-07 v1（D6/K7）** | 串联 | **approve（赞成）** | 代码迁入 `Pepgent/council`（`U109`），决策 issue、Project #1 与 `evidence/` 继续发布在 `Pepgent/PM`（保持 `C4-3` 与编号连续），发布目标从配置读取且依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-08 v1（K1）** | 串联 | **approve（赞成）** | 规定确定性的 `STATUS <kind> worker=<W-id> [needs=...]` 首行语法，程序可唯一解析，语法错误或未知工人转 `diagnosis.request`，消除关键字猜测。 |
| **D33-09 v1（K2）** | 串联 | **approve（赞成）** | 工人生命周期起止锚点（`enter/dispatch` 与核实 `ALL_DONE` 后的 `retire`）均由 Main 确认，以 `cwd` 实路径为唯一活动键，替代广播点名。 |
| **D33-10 v1（K3）** | 串联 | **approve（赞成）** | 每次送达记录 `Delivered / Unreachable / Failed` 回执，不可达或失败自动触发 `worker.unreachable` 唤醒 Main，取代人工搬运确认。 |
| **D33-11 v1（K4）** | 技术 | **approve（赞成）** | 在 `Pepgent` org 级挂 webhook（`U108`），使用 HMAC-SHA256 验签、`X-GitHub-Delivery` 去重、投递日志恢复与独立 `webhook.sock`，且已写明依 `U110` 不阻塞 `council#1` 实现。 |
| **D33-12 v1（K5）** | 串联 | **approve（赞成）** | 常规 `started/pr/done` 仅进 digest，仅 `blocked/all_done/unreachable/diagnosis.request` 唤醒 Main，依赖全部完成自动发 `worker.ready`，严格落实 `U104`“主控按批次读、不每条消息都唤醒”。 |
| **D33-13 v1（K6）** | 串联 | **approve（赞成）** | `council dispatch` 强制只接受已定案议程中已通过的行，一步完成开 issue、登记工人与单向送达，从程序上保障 `AGENTS.md:125`“派活指向已通过的决策正文”。 |
| **D33-14 v1（K8）** | 串联 | **approve（赞成）** | 明确 `hook`、`worker`、`roster`、`deliver`、`deliveries`、`dispatch` 的 CLI 契约面，供 `soroi#322` 在 D8 整体切换时统一接入规则文本。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意各行 `治理 / 串联 / 技术` 分类）。


## D33-12 v2：赞成（Argon-2，2026-11-01T18:49:04.294Z）——作废：该行已修订到 v3


**分类意见：** 串联

# D33-12 v2（PM#52）产品原始意图守护席（Argon-2）重投选票

## 一、意图裁决

1. **【定】`D33-12 v2` 将 `worker.ready` 的等待取消条件从“工人全局最新状态”收窄为“该工人在同一 `BLOCKED` 所在 issue/PR 上的后续状态评论”，并在收到 `BLOCKED` 时一次性核查 `needs`、将跨 org 依赖交由 `Main` 跟进，既落实了 `U104`（主控按批次读、依赖就绪自动送达），又保障工人在某一切片 `BLOCKED` 后切换并行推进其他不依赖切片时不丢失原等待（符合 `U83`、`U88` 不阻塞推进的意图）。**
   - **依据：** `(U) U83`、`U88`（`LEDGER.md:111,116`：局部阻塞不冻结其余可推进工作）、`(U) U104`（`LEDGER.md:130`：主控不当消息总线，常规状态写进 issue、按批次读）、`(U) U108`、`U110`（`LEDGER.md:133,135`：用 GitHub hook、由专属 agent 全权掌管实现）。
   - **边界：** 属管理层与工程编排事件总线契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-12 v2（K5）** | 串联 | **approve（赞成）** | v2 消除了 v1 的三处反例：① 按 `(worker, BLOCKED 所在 issue/PR)` 判定等待状态，使工人按 `tern-worker` 规范在 `BLOCKED` 期间转做其他 issue 并报 `STARTED/PR` 时不会冲掉原 `BLOCKED` 的 `worker.ready` 自动唤醒；② 收到 `BLOCKED` 时做一次性 `needs` 现查，覆盖依赖在 `BLOCKED` 评论前已关闭的窗口；③ 跨 org `needs` 明确不走 `Pepgent` org webhook 自动就绪、交由被 `worker.blocked` 唤醒的 `Main` 处理，无需重开 `D33-08` 语法。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。


## D33-12 v3：赞成（Argon-2，2026-11-01T18:53:54.232Z）


**分类意见：** 串联

# D33-12 v3（PM#52）产品原始意图守护席（Argon-2）重投选票

## 一、意图裁决

1. **【定】`D33-12 v3` 在 v2 基础上明确“只有带 `needs`（`needs.length > 0`）的 `BLOCKED` 做现查与关闭检查，不带 `needs` 的 `BLOCKED` 不生成 `worker.ready`、由被 `worker.blocked` 唤醒的 `Main` 在闸门 A/B 放行后经 `council deliver` 送达裁决”，防止因空集恒真而绕过 `C2-2` 两道事前闸门（`U96` 第 2 项），完全符合用户原始意图。**
   - **依据：** `(U) U83`、`U88`（`LEDGER.md:111,116`）、`(U) U96`（`LEDGER.md:124` 第 2 项：`BLOCKED` 须先过事前双闸门，防止错误分类先写进代码再回退）、`(U) U104`（`LEDGER.md:130`：主控按批次读、依赖就绪自动送达）、`(U) U108`、`U110`（`LEDGER.md:133,135`）。
   - **边界：** 属管理层与工程编排事件总线契约（`missingDesign: false`），不涉及 `pepgent-soroi/design/*.md` 修改。

## 二、条目投票（串联）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D33-12 v3（K5）** | 串联 | **approve（赞成）** | v3 采纳 `ClaudeHigh` 对 v2 的反例修订：保留 v2 按 `(worker, BLOCKED 所在 issue/PR)` 判定及跨 org `needs` 交 `Main` 跟进，并加上 `needs.length > 0` 守卫——仅对带 `needs` 的依赖等待型 `BLOCKED` 执行一次性现查与关闭触发检查；不带 `needs` 的契约/意图裁决型 `BLOCKED` 不生成 `worker.ready`，避免 `[].every(Boolean) === true` 将等待闸门 A/B 裁决的工人立即错误放行。v1 与 v2 反例均已彻底消除。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。

