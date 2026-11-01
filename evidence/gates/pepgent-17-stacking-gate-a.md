# Pepgent#17 W-09 请求（LAB-08/09/11a/12 叠加在 07a/07b 分支上开发）：闸门 A 判定

## 结论

**不越界，可免票放行（适用材料处置 a，保留 L-1 至 L-7 全部限定，并按 A-2 补强未决语义耦合边界）。**

同一席位（W-09）在同一互斥路径域内将 LAB-08/09/11a/12 叠加在未合入的 07a/07b 分支（`issue-17-lab-catalog-events`）上开发，以复用该分支上的 `LabEvents` 与 07b 代码，属于已通过契约内的工程分支组织与实现顺序，不新增或修改任何 HTTP/SSE 路径、公开 wire、持久化格式、ADT、权限或命令语义。具体分支/PR 落地方式（处置 a 独立叠加 PR 还是处置 c 并入 #55）、跨席位排期影响及白名单程序边界由闸门 B 判定；仅当 A、B 双闸门对同一处置均通过时方可免票放行。程序依据为 `(U) U96`（`SOR/LEDGER.md:110`）与 `(D)` `SOR/AGENTS.md:60`。

对象：[Pepgent/Pepgent#17 评论 6561296393](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6561296393)；关联切片：[LAB-08 (#24)](https://github.com/Pepgent/Pepgent/issues/24)、[LAB-09 (#19)](https://github.com/Pepgent/Pepgent/issues/19)、[LAB-11a (#22)](https://github.com/Pepgent/Pepgent/issues/22)、[LAB-12 (#11)](https://github.com/Pepgent/Pepgent/issues/11)。本次只写本判定文件，不提交、不写 GitHub、不联系工人。

## 一、意图裁决

| 裁决 | 用户原文与出处 | 本次适用边界 |
| --- | --- | --- |
| **定：原始设计意图与工程分支组织分开** | `(U) U1`：“他的核心边界是维持好我的原始设计意图……而在代码和设计上的取舍是你自己做。” `SOR/LEDGER.md:68` | 同席位在哪个分支上复用既有模块属于工程实现组织，不构成新增产品设计；不改 `design/*.md`。 |
| **定：不为每个切片增设互等锁，也不因局部未决冻结整席** | `(U) U30–U32`：“所有的ai都在互相等待”“把东西开发好后再做e2e测试”；`SOR/LEDGER.md:88`。`(U) U83`：“验收并不需要每一步都验收”；`SOR/LEDGER.md:97` | 允许 W-09 连续实现同域关联切片、复用 `LabEvents`，无需干等 #55 合入 `main` 才能写代码；同时不把叠加许可变成“必须捆绑”或“所有切片必须等全部未决项”的新锁。 |
| **定：既定公开通知义务不可省略，未决契约不可借叠加先行合入** | `(U) U2`、`U23`（全流程功能不收缩，`SOR/LEDGER.md:69,86`）；`(U) U96`（防错分类先写进代码再回退，`SOR/LEDGER.md:110`） | 各片在 D12-17 下的事件通知必须完整实现；#20 四项与 #18 第三、四项（D26）中尚未定案的语义不得借叠加分支当作既定契约固化合入。 |

## 二、A-1 至 A-3 逐项判定

### A-1：叠加开发是否触及产品原始意图或公开契约

**不触及，闸门 A 免票放行。**
- `(D)` `DEC/D10-repo-delivery.md:17,20` 与 `DEC/D16-phaseB-review-restore.md:35`（D16-11③）已规定同仓/同域关联切片可由所属席位连续实现；`GATE/pepgent-18-gate-a.md:7,53` 已对同席位复用 `LabEvents` 作出免产品契约票的相同判定。
- `(D)` `DEC/D25-pepgent-17-routetree.md`（PM#42）已表决通过：W-09 在新增或修改 `apps/web/src/app/routes/api/lab/**` 路由的 PR 中用既有工具链重新生成并提交 `apps/web/src/app/routeTree.gen.ts`，已覆盖 LAB-11a（附件上传路由）与 LAB-12（jobs tail 路由）。

### A-2：四片与 #20 四项（S-3）、#18 第三/四项（P-4 / D26）的契约耦合边界及 L-2 充分性

**L-2 的“依赖未决语义的部分暂停、其余照常，不把 #20 暂行兜底扩展为既定契约依赖”充分且必要；具体耦合点逐片界定如下（补入 L-2 执行说明）：**

1. **LAB-08（[#24](https://github.com/Pepgent/Pepgent/issues/24)，介入命令与 `human.irc`）：**
   - `intervene.takeover`、`intervene.answer` 按 `conversation` 与 `writerSession` 寻址并按 `conversation.owner` 授权（`(D)` `DEC/D19-sor13-control-contract.md:33`、`DEC/D12-lab-wire.md:422-423,512`），`intervene.derive`、`run.abort` 按运行寻址（由 store 运行记录取根会话 `holder`），四者**均不经过子 agent 的所属 Lab（S-3 ①），也与 S-3 ②（Discussion 无运行无 pending 的目录挂载）无关**，可照常实现。
   - **耦合子项：** ① `human.irc` 的目标为 soroi 子 agent 时（`(D)` `DEC/D7-lab-backend.md:69`、`DEC/D12-lab-wire.md:426,512`），若需判定该子 agent 所属 Lab，则与 S-3 ① 直接耦合；② 若命令对控制端点失败的错误映射依赖 S-3 ③，则该映射子项与 S-3 ③ 耦合。这两处耦合子项须待 #20 裁决/表决结论，不得把 S-3 的暂行 `not_found`/`persistence_unavailable` 当成已完成契约交付；目标是根会话（Lab 会话）的 `human.irc` 及上述四条控制端点命令主路径不受 S-3 ① 阻塞。
2. **LAB-11a（[#22](https://github.com/Pepgent/Pepgent/issues/22)，停驻会话 transcript 读取、`discussion.load`、附件）：**
   - `(D)` `DEC/D12-lab-wire.md:559` 规定的 `conversation` 频道既有触发源（`message_end`、附件、结论正文、装载上下文、已读、人类消息队列变化、Panel 会话头改变）与 S-3 ④（无运行槽位变化的推送源与频道）相互独立，可照常实现。
   - **耦合子项：** 若讨论读取涉及 S-3 ②（Discussion 无运行无 pending 时的槽位挂载）、S-3 ④（无运行槽位变化推送），或涉及 #18 第三、四项（[D26 / PM#43](https://github.com/Pepgent/PM/issues/43)，草稿与 `pending_launch` 生命周期），须按对应已生效裁决/决议实现，不得把 `not_supported` 临时占位当作最终契约。
3. **LAB-09（[#19](https://github.com/Pepgent/Pepgent/issues/19)，自动化）与 LAB-12（[#11](https://github.com/Pepgent/Pepgent/issues/11)，算力页只读读取与 jobs tail）：**
   - LAB-09 的事件触发、定时、审批门禁及 `automation` 频道与 S-3、P-4 均无契约耦合。
   - LAB-12 的 `remote templates`/`runs`/`status`/`tail` 及 `compute` 频道主路径与 P-4 无关；仅当算力页展示 Mux 在线子 agent 需按所属 Lab 归属时，该子项与 S-3 ① 耦合，按 #20 结论处理。

### A-3：L-4（事件通知不省略）是否完整表达 D12-17 要求

**是，完整且必要。**
- `(D)` `DEC/D12-lab-wire.md:555-562`（D12-17）明确规定了 `catalog`、`run`、`conversation`、`automation`、`library`、`compute` 六个频道的触发条件与失效读取范围：LAB-09 改变 `automation_rule`/`automation_run` 必须发 `automation`（若开启会话改变目录事实则同发对应频道）；LAB-11a 改变附件、装载上下文、已读、消息结束等必须发 `conversation`；LAB-12 在有订阅者定期发现 remote 作业列表/状态变化或 Mux 在线变化时必须发 `compute`；LAB-08 的人类消息队列变化发 `conversation`、运行/槽位变化按 D12-17 发 `run`/`catalog`。
- 既然允许叠加在 07a/07b 分支上直接复用 `LabEvents`，任何切片均不得再以“事件模块未合入”为由省略 D12-17 规定的通知。

## 三、对限定 L-1 至 L-7 及候选处置的结论

- **限定 L-1 至 L-7：** 全部保留，并将上文 A-2 的逐片耦合边界并入 L-2。
- **候选处置：** 放行处置 a（在 `issue-17-lab-catalog-events` 上叠加开发，遵守 L-1 至 L-7）；关于处置 a（独立叠加 PR，待 #55 合入后改 base 为 `main`）与处置 c（并入 #55 同一交付）的工程排期与锁边界取舍，由闸门 B 按 D16-10/11③ 裁定，本席提示不得因选择 c 把 #55 的合入前提不当扩大为冻结下游 W-10 的锁。
- **一票否决与分类争议：** 0 项。
