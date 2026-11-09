# D58：E2E-20 的 S2 runbook/check 集合按 §3 矩阵写 F14、不写 F11（Pepgent#30 BLOCKED）（P0）——定稿

决策 issue：[Pepgent/PM#80](https://github.com/Pepgent/PM/issues/80)。发起：Coordination（DeskBlocked30）。本文件由议会 daemon 生成。

## 事实

**来源：** W-10 在 [Pepgent/Pepgent#30 评论 6567076265](https://github.com/Pepgent/Pepgent/issues/30#issuecomment-6567076265) 报告 BLOCKED：E2E-20 的 S2 流程集合在 D8 中有两处写法冲突，请求在“写 F14 / 写 F11 / 两者都写”中裁定。初审材料见 `local://decisions/blocked-30.md`。C2-2 两道闸门的判定如下：闸门 A（ArgonSol-2，`local://decisions/blocked-30-gate-a.md`）认为产品结果应保留 F14 的 S2、不给 F11 新增 S2，但“F08–13”换成“F08–10、12–14”会改变照文执行的 runbook/check 集合，与 D40 的先例相同，不能作为免票笔误放行，须走最小 P0 表决。闸门 B（ArgonGovernanceSol-1，`local://decisions/blocked-30-gate-b.md`）判定路径、阶段门禁和更正程序都不越界。闸门 A 判定越界，所以按 C2-2 立本议程。

**事实（`DEC/` = `pepgent-pm/evidence/decisions/`）：**
- (D) D8-01：“MVP 指 §3 矩阵 32 行全部通过……F01–F30：按矩阵标的段验收”（`DEC/D8-mvp-scope.md:72`）。
- (D) D8-02：“§3 矩阵为每行标出段”；第二段位于 `apps/web/tests/e2e-lab/`（`:73`）。D8-10：`e2e-lab/` 中“每个流程一份 runbook……和一份事后核对脚本”（`:81`）。§3 驱动约定：“第二段的 runbook 在 `Pepgent/Pepgent` 的 `apps/web/tests/e2e-lab/`”（`:114`）。
- (D) §3 F11：段列只有 `S1`，环境列只有 `L`，驱动列只有 `s1/f11.spec.ts`，判据中没有 S2 子句（`:130`）。
- (D) §3 F14：段列为 `S1、S2`，环境列为 `K、PK`；S2 判据是“实验详情页上该节点显示模板与 remote run”，驱动列含 `e2e-lab/F14.md`（`:133`）。
- (D) §3 F18：判据以“F14 那次调用 remote remove 后”开头，S2 判据为“runner workspace 列出并预览这些文件”（`:137`）。
- (D) §3 段列含 S2 的流程共 17 个：F08–F10、F12–F14、F17、F18、F23–F31（`:127-150`）。
- (D) E2E-20 切片行：“W-10 apps/web/tests/e2e-lab 的S2 runbook/check：F08–13、17/18、23–31”，依赖含 DEP-02（`:382`）。按字面也是 17 个流程，与 §3 相比只是用 F11 换掉了 F14。DEP-02 解锁“F14–F18、F31”（`:362`）；F11 只用 L 环境。
- (D) E2E-16 是 W-08 在 soroi `e2e/` 下写的 F14/17/18 S1 spec（`:378`）。§4.2 中没有其他切片承担 `e2e-lab/F14.md`。`apps/web/tests/e2e-lab/**` 归 W-10（`DEC/D50-w10-merged-paths-whitelist.md:34`；`DEC/D20-w10-path-boundary.md:31`）。
- (D) #30 正文“目标 / what”写“F08–F13、F17、F18、F23–F31（D8-10）”；“本切片原始行”的链接指向 `D8-mvp-scope.md#L387`，而该行实际位于 `:382`。
- (D) D40 先例：已通过行的更正如果改变照文实现的结果，不在回写时单方改正，须另立议程表决（`DEC/D40-d38-03-nodebinding-default-env.md:7`）。
- (U) U2：“不要擅自收缩”；U23：“能走通我说的所有流程”（`pepgent-soroi/LEDGER.md:4,21`）。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D58-01 v1 | E2E-20 的 S2 runbook/check 集合定为 §3 矩阵中标了 S2 的 17 个流程 F08–F10、F12–F14、F17、F18、F23–F31，取代 D8 切片行 E2E-20 中的“F08–13”写法：编写 F14 的 S2 runbook/check，不编写 F11 的 S2 runbook/check | D8 §4.2 E2E-20 切片行（`DEC/D8-mvp-scope.md:382`）回写；Pepgent/Pepgent#30 正文的“目标 / what”与“本切片原始行”链接；W-10 的 `apps/web/tests/e2e-lab/F14.md` 与对应 check（D8-10 的命名方式） | 1. E2E-20 的流程清单改为“F08–10、12–14、17/18、23–31”，其余字段（依赖、解锁、验收、档位、统一验收前置）都不变。<br>2. F14 的 S2 runbook/check 按 §3 F14 行（`:133`）的 S2 判据（实验详情页上该节点显示模板与 remote run，PK 环境）和 D8-10 的三处核对编写，不增加也不删减判据。F18 的 S2 以这次调用为前置（`:137`）。<br>3. 不为 F11 新增 S2 判据或 runbook。§3 的 F11、F14 两行原文不变；W-08 的 E2E-16（soroi S1 spec）不变。<br>4. 编写时点仍按 D16-10：F14 runbook 所测的代码全部合入各自 main 之后才写；完整 F 流程在统一阶段执行。<br>5. 本行通过后，Coordination 明确委托 Secretary 按本行正文回写 `DEC/D8-mvp-scope.md:382` 的流程清单，并替换 #30 正文“目标 / what”中的清单和漂移的源行链接（L387 改为 E2E-20 实际所在行）；已发评论和历史选票不改。W-10 的其余 runbook/check 照常推进，不受本行影响。 | **得到：** E2E-20 与 D8-01、D8-02、§3 矩阵一致。D8-01 要求的 F14 S2 有了唯一编写人；F18 的 S2 前置调用有了着落；工人的卡点解除；没有新增或删除任何验收义务。<br>**代价：** 改动已通过的 D8 切片行中的一项流程清单，并需要回写 PM 文档与 #30 正文。<br>**落选方案：** ① 按切片行写 F11、不写 F14：F14 的 S2 没有驱动，F18 的 S2 缺少前置，D8-01 规定的验收被收缩，违反 U2。② F11 与 F14 都写：要为 F11 新造 §3 中不存在的 S2 判据，扩大了验收语义，没有任何 (U) 或已通过的决策授权。③ 不表决、在回写时直接改：会改变照文执行的集合，D40 先例（`DEC/D40-d38-03-nodebinding-default-env.md:7`）与闸门 A 都判定不可这样做。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh：未投<br>Argon（ArgonSol-2）：赞成<br>LeadMentor：未投 | **撤回**（Main：不是放弃本行：用户直接拍板（pepgent-soroi LEDGER.md U134，Pepgent/soroi@9c94e9e），本行按 v1 原文生效，依 AGENTS.md C2-4 直接执行、不再表决。daemon 没有"用户拍板"结果类型，只能以撤回结束表决；执行承载见 PM 决策 issue 评论。） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D58-Coordination.md`、`votes/D58-Argon.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。