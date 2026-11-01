# 管理层决策队列

按现行 LEDGER C2-3.3 / U96：P0 → P1 → P2 → P3，同级按 issue 号 FIFO。正式表决对象、原票和反例回应在 PM issue；本文件只是排序副本，不代表工程状态。U98 片区经理模式及 U100 临时岗位是用户直接指令，不进入表决等待。

## 待表决

本轮已收提案均已取得结论，没有待秘书计票的决策。D24 v2已4/4通过并关闭，九处正文已统一回写；实际工程实现、送达及统一验收由各自拥有方确认，不以文书结案替代。

## 已结案、执行与文书边界

| 决策 | 已登记结论与原票 | 文书回写和承载 |
|---|---|---|
| [D24 / PM#34](https://github.com/Pepgent/PM/issues/34)（P0） | v2四席4/4，0意图否决、0分类争议，独立审查首轮反例已由v2消除、第二轮改赞成；v1不计；CLOSED、Project Done；[定稿及各轮原票5fd29cf](https://github.com/Pepgent/PM/commit/5fd29cf) | [九处正文已回写6beff82](https://github.com/Pepgent/PM/commit/6beff82)，根请求统一必填by；store POST/runs/derive、DeriveCommit和GUI intervene.derive不变，D12未动。[原BLOCKED已登记结论](https://github.com/Pepgent/soroi/issues/217#issuecomment-6560041051)，已回GovClone_2dcf，由AreaMgrSoroi/AreaMgrPepgent送W07/W09；尚无本项实际送达证据，不把评论当收到。 |
| [D23 / PM#33](https://github.com/Pepgent/PM/issues/33)（P0） | 01四席4/4、02五席5/5，0否决、无有效反例；CLOSED、Project Done；[五票、定稿与取证a5a0c5e](https://github.com/Pepgent/PM/commit/a5a0c5e) | D6:141已回写string；[soroi#315](https://github.com/Pepgent/soroi/issues/315)已由[PR#316](https://github.com/Pepgent/soroi/pull/316)合入关闭，Main提供合并提交5ad9b4b与W06退役事实；W07仍只写自己的域，不等待跨组件live验收。 |
| [D20 / PM#30](https://github.com/Pepgent/PM/issues/30)（P0） | v4 三项逐条5/5赞成，0专责否决、有效反例清零；v1–v3不计入，历史票保留；CLOSED、Project Done | 五席原票及D16-09/11、D7/D8前端边界直接替换：[PM 5621469](https://github.com/Pepgent/PM/commit/5621469)。[文档承载 Pepgent#51](https://github.com/Pepgent/Pepgent/issues/51)已建，W09在席owner为W09、退役后W10；renderer README始终W10。[经理已实际送达](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6559750589)。W10重新进场仍由Main按LAB-07a、并发和滚动源安排，不由秘书启停。 |
| [D22 / PM#31](https://github.com/Pepgent/PM/issues/31)（P1） | D22-01四席赞成/四席，无否决/有效反例；CLOSED、Project Done；[定稿及前三席原票 bd2d4fa](https://github.com/Pepgent/PM/commit/bd2d4fa)，[协调席原票已补登](https://github.com/Pepgent/PM/issues/31#issuecomment-6559817971)，归档为 `evidence/votes/D22-Coordination.md` | 与D21共用[deploy#20](https://github.com/Pepgent/deploy/issues/20)。D7-19变量名及容器内挂载根语义、D7-04引用已[回写8a8ec77](https://github.com/Pepgent/PM/commit/8a8ec77)。应用临时检出偏差另由[Pepgent#52](https://github.com/Pepgent/Pepgent/issues/52)承载，不把部署注入当该偏差已修复。 |
| [D21 / PM#32](https://github.com/Pepgent/PM/issues/32)（P1） | D21-01四席赞成/四席，无否决/有效反例；CLOSED、Project Done；[定稿及原票 bd2d4fa](https://github.com/Pepgent/PM/commit/bd2d4fa) | [deploy#20](https://github.com/Pepgent/deploy/issues/20)两个变量独立验收，已由[PR#21](https://github.com/Pepgent/deploy/pull/21)合入关闭；Main提供W04第三次退役事实，AreaMgrDeploy2 capture确认席位不存在。只记录本仓交付，不冒称阶段C或真实卷路径已验证。 |
| [D19 / PM#29](https://github.com/Pepgent/PM/issues/29) | v3五项逐条4/4赞成，0否决、无分类争议，原反例已消除；[定稿与四席各轮票 e550378](https://github.com/Pepgent/PM/commit/e550378)，CLOSED、Project Done | PM六份正文已[回写1fc4428](https://github.com/Pepgent/PM/commit/1fc4428)，design归Argon；[#209原帖解除](https://github.com/Pepgent/soroi/issues/209#issuecomment-6559476265)，[工人已实际STARTED消费](https://github.com/Pepgent/soroi/issues/209#issuecomment-6559532128)。不代表工程或统一验收完成。 |
| [D18 / PM#28](https://github.com/Pepgent/PM/issues/28) | v2五项逐条5/5赞成，01的11子项全部赞成，02/04沿用原票，03/05只计C；[定稿03a913e](https://github.com/Pepgent/PM/commit/03a913e)，[全部v2原票82eb525](https://github.com/Pepgent/PM/commit/82eb525)，CLOSED、Project Done | 各实现/正文owner继续落地；D19控制端点回写不是D18多Lab等全部技术正文已落地的证据。 |

## 参投可用性与对接

- 带read的常驻导师 LeadMentorSeat 接替旧无工具实例，只计一导师席；导师原票转录明确标来源，不将秘书当投票者。
- 原Argon/ArgonGovernance的429为已发生的提供方故障，Main依U100已以ArgonSol/ArgonGovernanceSol同职能顶岗；各职能只计一票，不与旧实例叠票。
- 工人对接与实际送达归对应repo专门片区经理。秘书只维护issue/PR记录与档案，不peer工人，不以评论已写代替实际收到，不自行扩大路径或设计范围。
- 不读取或转发 SoroiKeeperGpt 的独立调查材料给Opus。已发出的票评和历史评论保持不可变；后续按拥有方新稿、新票与实际结果直接替换本文件相应状态。
- Main于15:28:14Z重启后，GovClone_55b0的fork快照失效，已由新fork的GovClone_2dcf接替；沿用既有决策issue与原票，不因分身更换重复立案或加票。
