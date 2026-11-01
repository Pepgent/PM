# soroi#321（council 工人总线树）的闸门材料：未经操作员确认条文的分类初审

- **树根：** [Pepgent/soroi#321](https://github.com/Pepgent/soroi/issues/321)，正文写了契约 K1–K8 和必要决策 D1–D8；child 是 [Pepgent/council#1](https://github.com/Pepgent/council/issues/1)、[Pepgent/PM#41](https://github.com/Pepgent/PM/issues/41) 和 [Pepgent/soroi#322](https://github.com/Pepgent/soroi/issues/322)。
- **编制：** governance-desk 实例 `DeskCouncilTreeVote`（总协调席，与 Main 合计 1 票）。本文给出事实、逐行初分类和交两道闸门判定的问题。类别是起草者的初分，不是裁决。
- **程序：** 本议程不是工人 BLOCKED，按 Main 的 brief 先请两道闸门做分类初审：闸门 A（`Argon`）判定各行是否触及产品原始意图或公开契约、是否其实已有 `(U)` 依据；闸门 B（`ArgonGovernance`）判定分类、职能领域、优先级和程序边界（`SOR/AGENTS.md:60`、C2-2）。初审后用 `council propose --seat Coordination` 立案。
- **议案全文：** 起草稿 `/tmp/council-tree-draft.yaml`（14 行，每行含 what/where/how/取舍/分类/领域）。立案后以 daemon 发布的 PM decision issue 为准。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令的输出；`(A)` agent 的说法，只作解释。Main 的 brief 属于 `(A)`。本实例读了 #321 正文、council 仓的 README、`docs/design.md` 和 `src/`，以及 `SOR/AGENTS.md`；没有读 git 历史或 session。

路径简称：`SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`；`CNL/` = `/Users/mouriya/Ext/code/pepgent/pepgent-council/`（生产 daemon 的 checkout）。

## 一、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | 操作员的转达会话 `01a197b3` 已核实以下四条有操作员原话，不入表，由秘书登记为 U 条目：D2“用 webhook 而不轮询”；D5 核心一句“片区经理保留，改为事件触发的诊断角色”；D7“council 独立仓、专属 agent”；D8“整体切换，负责 agent 全权掌管实现和迁移方案”。按 C2-4，这些不另立表决。 | (A) Main brief；(D) `SOR/AGENTS.md:64`（C2-4） |
| F2 | 由转达会话起草、操作员没有确认的有：D1 与残留清单中“`status post` 收窄”；D3；D4；D5 细化（Main 新开实例，事件集合为 `worker.blocked`、`worker.unreachable`、`diagnosis.request`）；D6；K1–K8 的具体条文（含 K3“以 council 名义、第一行声明来源”）。 | (A) Main brief；(D) soroi#321 正文 |
| F3 | 生产 daemon 从 `CNL/` 运行，`repo: Pepgent/PM`，`webhook.hook: null`。该 checkout 在提交 `4c6fa23`，对应未合并的 [council PR#5](https://github.com/Pepgent/council/pull/5)。 | (R) `council daemon status`；(A) Main brief（提交号与 PR） |
| F4 | `council status post` 只接受 `progress\|note\|alert`，注释写明“Worker status comes only from GitHub (K1, D1)”。 | (D) `CNL/src/domain.ts:150-152`；`CNL/README.md:135-141`；(R) `council help` |
| F5 | 送达消息第一行是 `[council] Pepgent 议会 daemon 的<原因>（<ref>）。这是单向消息：peer 回复送不到 council，回应写在原 issue/PR，第一行用 STATUS 状态头。`，发送者身份是 omp-peers subagent `council`。 | (D) `CNL/src/bus.ts:89-95`；`CNL/src/daemon.ts:23` |
| F6 | 工人总线还没有被实际使用过：`council roster` → `no workers registered`，`council deliveries` → `No deliveries`，`council hook status` → `no hook installed`，launchd 中没有 `org.pepgent.council-ingress`，`~/.config/pepgent-council/` 不存在。 | (R) |
| F7 | 现行规则文本中没有引用 `council status post` 的地方；C4-1、C4-2 仍规定每仓常驻片区经理巡查、送达、写 `local://state/area-<仓>.md`。 | (R) `grep -rn "status post" SOR/.omp SOR/AGENTS.md SOR/LEDGER.md` 无结果；(D) `SOR/AGENTS.md:80-81` |
| F8 | “leader 不当契约来源”：公开接口、状态权威与生命周期、部署前提等的新增或改变须作为决策项投票。F4、F5 两项在表决前已随生产 daemon 部署。 | (D) `SOR/AGENTS.md:123`；F3–F5 |
| F9 | 优先级定义：P0 BLOCKED 解阻 / P1 产品全景接缝 / P2 PM 错误路径 / P3 omomp 工作流提效；组织制度、派工分配与工作流提效（`U90`）议案加组织治理守护席。 | (D) `SOR/AGENTS.md:23,26`；`SOR/LEDGER.md:118`（U90） |

## 二、逐行初分类

D4 与 K3 的通道条、D6 与 K7 的发布条内容相同，各合成一行，不重复表决。“有原话”的部分在相应行中写明不在表决范围。

| 行 | 内容 | 现状 | 分类 | 领域 | 理由 |
|---|---|---|---|---|---|
| 01 | `status post` 只收非工人席位的 progress/note/alert（残留清单） | **已上生产**（F3、F4） | 治理 | governance | 决定由谁记录工人状态，取消片区经理转录 |
| 02 | K3：以 council 名义送达，第一行声明来源和回应去处 | **已上生产**，0 次送达（F5、F6） | 串联 | governance | council 与工人之间的消息契约，改变 C4-2 中的送达者 |
| 03 | D1：工人状态源头是 GitHub 状态评论，council 只派生、不存可改写副本 | 已实现，未接通 | 治理 | governance | 状态权威；取消转录这一工作流 |
| 04 | D3：Mac 上的 cloudflared + homelab-tf cf-ingress | 未部署（F6） | 技术 | — | 单一组件的部署前提 |
| 05 | D4（含 K3 通道）：omp-peers socket，按 cwd 现查，不用 tern send | 已实现，0 次送达 | 串联 | governance | 送达渠道属于 C4-2 的通信边界 |
| 06 | D5 细化：三种事件触发，Main 每事件新开 area-manager 实例 | 现行仍常驻（F7） | 治理 | governance | 组织角色与派工 |
| 07 | D6/K7：发布仍在 PM，发布目标只从配置读取 | 生产 `repo: Pepgent/PM` | 串联 | governance | 决策记录的归处（C4-3） |
| 08 | K1：`STATUS` 状态头语法与 diagnosis | 未生效 | 串联 | governance | 工人报状态的工作方式 |
| 09 | K2：工人登记、cwd 唯一、开始与结束锚点由 Main 确认 | 已上线，0 登记 | 串联 | governance | 生命周期锚点与 Main 职责 |
| 10 | K3 回执：Delivered/Unreachable/Failed；Delivered ≠ 已处理 | 已上线，0 回执 | 串联 | governance | 取代 C4-2 中片区经理确认恢复 |
| 11 | K4：org webhook、HMAC、GUID 去重、投递日志恢复、独立 socket | 未安装（F6） | 技术 | — | webhook 协议细节；“用 webhook”有原话 |
| 12 | K5：事件路由与 `worker.ready` | 无输入 | 串联 | governance | Main 的唤醒集合（U104） |
| 13 | K6：`dispatch` 只接受已通过的行 | 已上线，未使用 | 串联 | governance | Main 的首次派活方式 |
| 14 | K8：CLI 面（hook/worker/roster/deliver/deliveries/dispatch） | 已上线 | 串联 | governance | 规则文本、Main 与承接者的操作面 |

- **优先级：P3。** 本议程是领导层的工作流提效（`U90`、`U104`；#321 背景：569 条非投票消息中 64% 是确定性搬运）。它不是工人 BLOCKED（P0），不是产品接缝纠偏（P1），也不是 PM 错误路径清理（P2；移除 PM 中的 council 副本由 PM#41 承载）。
- **`missingDesign` 一律为 false：** council 是领导层的工具，不属于 soroi `design/` 基线。Argon 若认为某行触及意图，可按 D1-17 争议。

## 三、闸门 A 的问题（交 `Argon`）

- **A-1：** 14 行中，是否有哪一行实际已有 `(U)` 原话依据（例如 U104、U105、U107 或 2026-11-02 的操作员指示），按 C2-4 应直接执行而不入表？请指出行号与 U 编号。
- **A-2：** 是否有哪一行与 `(U)` 原意冲突？重点是 05、10 与 U107（片区经理用 peer 主动巡查、纯单向），以及 06 与 D5 核心原话的关系。
- **A-3：** 各行是否触及 soroi 产品原始意图或 `design/` 基线，使 `missingDesign: false` 或“串联/技术/治理”的初分类不成立？

## 四、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 优先级 P3、各行分类、`domains: [governance]` 的标注（04、11 不标）是否成立？有无应认领 governance 而漏标的行？
- **B-2：** 01、02 在表决前已部署（F8）。逐行表决是否是正确的程序处置？未通过时由 council 负责 agent 在 PR#5 中撤回，这一处置是否越过 council 专属席位的边界（D7 原话：负责 agent 全权掌管实现）？
- **B-3：** 把 F1 的四条有原话的条文排除在表外，是否符合 C2-4？表中各行写明“某部分为原话、不在表决范围”的切分是否清楚，有没有借表决跳过原话的情形？

## 五、闸门结论与立案处置

- **闸门 A（`Argon-2`，`council-tree-gate-a.md`）：** 14 行都不与 `(U)` 冲突，没有否决；分类与 `missingDesign: false` 无异议。F1 的四条原话已登记为 `U108`–`U111`（`SOR/LEDGER.md:133-136`），议案改为直接引用。04、11（`U108`+`U110`）和 07（`U109`+`U110`+C4-3）可按 C2-4 剔除；若保留在表中供管理层过目（`U105`），须写明表决异步进行、不阻塞 council#1 的实现推进。06 补明诊断仍遵守 `U107`。
- **闸门 B（`ArgonGovernance-2`，`council-tree-gate-b.md`）：** P3 与分类成立；14 行都标 `governance`（含 04、11），由 5 个资格席表决。01、02 在表决前上线属于 `SOR/AGENTS.md:123` 程序违例，入表逐行表决是正确的补救。表决完成前不得合入 council PR#5，不得推进 soroi#322，不得调用 `worker enter`、`deliver`、`dispatch`、`hook install`、`ingress install`。原话切分符合 C2-4。
- **立案时采用的修订：** facts 改引 `U108`–`U111` 并写入两道闸门的结论；04、11 加 `domains: [governance]`；04、07、11 保留在表中，how 中写明“依 `U110` 表决异步进行，不阻塞 council#1 的实现推进”，激活入口和安装 hook 的时点以闸门 B 为准；06 的 how 补入 `U107`；06、07、11 中“不在表决范围”的原话改标 U 编号。
