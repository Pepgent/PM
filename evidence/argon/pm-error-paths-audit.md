# Rule 20 PM 错误路径审计

## 0. 审计范围与结论

本审计是只读审计，目标是按 Rule 20 找出 PM 决策正文、阶段 B 派工材料和 PM#1/#16/#25 中仍会把错误路径暴露给工程师或治理代理的具体条款，并给出逐项替换或删除动作。

审计直接读取了：

- `pepgent-pm/evidence/decisions/` 下的 D16、D10、D8、D2、D16 派工/流程/附件材料；
- `pepgent-pm/evidence/argon/phaseB-review-governance.md`；
- 当前 `pepgent-soroi/LEDGER.md` 的 C1–C5、R5、R8–R11、R13–R21、U83–U88；
- 当前 [Pepgent/PM#1](https://github.com/Pepgent/PM/issues/1)、[Pepgent/PM#16](https://github.com/Pepgent/PM/issues/16)、[Pepgent/PM#25](https://github.com/Pepgent/PM/issues/25)（含评论）。

用户点名的两个路径不存在于当前 PM 工作树：

- `evidence/decisions/D1-organization.md` 不存在；D1 的当前可读源头是 [PM#1](https://github.com/Pepgent/PM/issues/1) 正文及其归档评论。
- `evidence/decisions/D8-scope-and-verification.md` 不存在；当前对应文件是 `D8-mvp-scope.md`，切片映射是 `D8-slice-issues.md`（来源均指向 [PM#8](https://github.com/Pepgent/PM/issues/8)）。

### 结论

当前仍有四类需要发起 PM 删除/修改投票的**有效错误路径**：

1. D16/D10/D8 仍保留“一个切片一个 PR”的可误读，以及固定席位队列；这会把 C1-3 允许的同域连续开发重新变成串行微 PR 和批次屏障。
2. `phaseB-review-governance.md` 与 `phaseB-dispatch-draft.md` 仍写着双核逐波预审、签署后才能启动、回写完成后才能发车、退役前批量复核；这些内容与 D16 v4 的最终路径、C5-4、U83/U84 相冲突。
3. D16-07、PM#25 和 D15/D16 派工材料仍把 `ArgonGovernance` 写成 argon 族的例行投票席，并把 `discuss:steady/divergent` 写成设计表决前的流程；这与当前 U11/U86、LEDGER C2-1/C2-2/C3-3 及 `argon-governance.md` Rules 6、11、13、16 不一致。
4. PM#1 的 D1 roster、工程进程命令和导师席位仍是旧制度：旧 Main session id、缺少顶层常驻 `LeadMentor`、把治理支持角色混入投票族、以及旧的 GPT/PTY `/usage` 启动方式。

下文把**当前规范性文字**与**不可变历史证据**分开。历史评论和原票不能回写；它们的处理动作是新增明确的“历史、非现行规则”说明，并保证工程师只从现行正文取契约。

---

## 1. 权威基准（用于判断冲突）

| 权威源 | 行 | 对本审计的决定性内容 |
|---|---:|---|
| `pepgent-soroi/LEDGER.md` | 17 | C1-3：同仓/同域关联切片可合并开发和合并提交 PR；禁止拆成十几个微型串行 PR；禁止每步独立 runtime 验收；代码完成前禁止编写/运行测试；hash 不作证据。 |
| `pepgent-soroi/LEDGER.md` | 22–32 | C2-1：真正重要的设计/契约事项才进三方投票；`ArgonGovernance` 是治理、效率、巡检和 Rule 20 修正角色，不是例行投票核心。第三方是必须在顶层常驻的 `LeadMentor`。 |
| `pepgent-soroi/LEDGER.md` | 33–38 | C2-2：`Argon` 代表意图/设计投票；`ArgonGovernance` 负责巡检、IRC 边界、BLOCKED 初审和管理层/工人问责，不以投票为主要核心职责。 |
| `pepgent-soroi/LEDGER.md` | 78 | C5-2：领导层须实质检查台账，但禁止把几十行台账机械贴到每条命令或每个 PR，不能用形式主义耗时。 |
| `pepgent-soroi/LEDGER.md` | 82–84 | C5-4：D16 三族通过即解除冻结并当回合发车；不得等待秘书回写、每波二次预审或退役批量复核。 |
| `pepgent-soroi/LEDGER.md` | 94–101 | R5/R9/R11：禁止低于 `task:high` 的 `discuss:*` 参与设计/决策；已废除每波二次预审、每 PR 长表、每次合并/退役同步审批和一切片一 PR 逐步验收。 |
| `pepgent-soroi/LEDGER.md` | 170–175 | U83–U88：优化管理层效率，撤掉阻挠实施的验收步骤，检查领导缺席和实际执行，不得层层设卡。 |
| `.omp/agents/argon-governance.md` | 18–33 | Rules 6、11、13、16、18–20：效率和事后检查优先；不以参与投票为主要职责；不承接其他 agent 的调查/意图判断；非本职责 IRC 立即退回；Rule 20 是发起 PM 错误路径删除/修改投票，不是例行审批。 |
| [PM#1](https://github.com/Pepgent/PM/issues/1) | 21 | D1-03 已经给出正确方向：不用中等 effort 的 `discuss:*`，设计讨论由分身和 `task:high` 承担。此行可作为替换其它文档的基准，不应被 D16-07 重新推翻。 |

---

## 2. 必须发起修改/删除投票的有效条款

### R20-01：一切片一 PR 的 wording 与逐切片进程暗含串行仪式

**冲突类型：** C1-3 / U83/U84；直接影响所有工程席位。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D16-phaseB-review-restore.md:35` | [PM#25](https://github.com/Pepgent/PM/issues/25) | `按依赖顺序列出的切片 issue 清单，一个切片对应一个 issue 和一个 PR`。 |
| `evidence/decisions/D8-mvp-scope.md:85` | [PM#8](https://github.com/Pepgent/PM/issues/8) | `每切片是一仓一块可观察结果，由独立 tern 工程进程完成，issue/PR 关联按既定流程`。虽然后文说“不强加每步独立 runtime 仪式”，前半句仍可被读成一切片一进程、一 PR。 |
| `evidence/decisions/D10-repo-delivery.md:17` | [PM#16](https://github.com/Pepgent/PM/issues/16) | D10-05 写成 `保留粒度、档位、issue/PR、tern 执行者`，但没有把“同域切片可合并 PR、不得每切片独立 runtime”写成唯一解释。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):32 | [PM#25](https://github.com/Pepgent/PM/issues/25) | D16-11 的同一句 `一个切片对应一个 issue 和一个 PR` 被复制到 issue 正文，工程师可直接把它当成派工硬契约。 |

**需要的精确替换：**

将上述“一个切片对应一个 issue 和一个 PR”替换为：

> `切片 issue 继续作为范围、依赖与状态索引；同仓或同一互斥路径域的关联切片由所属 tern 席位连续实现，并可在同一个 PR 中合并提交。只有编译、类型、构建或调用契约所需的真实技术依赖才形成等待；不得要求每切片一个独立 PR、独立 runtime 验收或串行盖章。`

将 D8-14 的完整 how 口径替换为：

> `每个切片保留所属仓/路径域、可观察结果和 issue 索引，交由所属席位的独立 tern 进程连续完成；业务功能与必要的本仓真实入口检查保留，跨组件 runtime 统一到阶段 C。`

**不要删除的部分：** issue 作为索引、本仓必要检查和最终统一 A0/S1/E2E-21/S2/D9 不与 C1-3 冲突；只删除“一切片一 PR/一切片一 runtime 仪式”的强制读法。

---

### R20-02：固定 Wave 2 队列阻止技术依赖就绪的席位滚动进入

**冲突类型：** U83/U84、C1-3、C5-4；直接阻塞 W-09、W-07、W-03、W-04、W-10、W-08。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D16-phaseB-review-restore.md:34` | [PM#25](https://github.com/Pepgent/PM/issues/25) | `滚动补入：依次补入 W-09 lab → W-07 plugin → W-03 images → W-04 deploy`；`W-10` 要等 W-09 的首个 PR 合入后才启动；W-08 没有作为可按依赖就绪补入的席位写入。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):31 | [PM#25](https://github.com/Pepgent/PM/issues/25) | 同一固定顺序被复制到 issue 正文。 |
| `evidence/decisions/phaseB-dispatch-draft.md:16` | [PM#25](https://github.com/Pepgent/PM/issues/25) | C1-3 写成 `W-08 排在最后一波，等实现代码合入后才编写 E2E spec`。这把 W-08 变成固定末席，而不是按所测代码就绪逐 spec 编写。 |
| `evidence/decisions/phaseB-dispatch-draft.md:45` | [PM#25](https://github.com/Pepgent/PM/issues/25) | P-3 固定三席、固定第 1 波和完整队列：`W-09 → W-07 → W-06`，再 `W-01 → W-02 → W-05 → W-03 → W-04 → W-10 → W-08`；一个席位全部合入后才 kill 再启动下一个。 |
| `evidence/decisions/phaseB-review-governance.md:152–154` | [PM#25](https://github.com/Pepgent/PM/issues/25) | G-6 的并发上限本身合理，但“按依赖关系分波次、完成后再启动下一波”在当前文本中没有“任一 slot + 自身技术依赖就绪即可滚动”的保护语句，容易恢复固定批次。 |

**具体失效路径：** W-09 协议只依赖 A2-10/自身契约就绪时，若 W-03 或 W-04 先释放名额，固定 `W-09 → W-07 → W-03 → W-04` 仍要求等待前席；W-10 即使唯一协议依赖已满足，也会等待无关席位；W-08 被保留到全部实现后，最后阶段只剩单席。该判断是基于条款顺序的 `[INFERENCE]`，但 `D16Divergent.md:180–201` 已经把 W-10 队列过晚及 W-08 后段单席的具体失效路径写成审查事实。

**需要的精确替换：**

将 D16-10 的“滚动补入”及 P-3 整行替换为：

> `同时活跃席位仍受 G-6 的内存上限约束；任一席位释放出 slot 后，立即从所有等待席位中选择自身编译/类型/构建/调用契约依赖已经满足者启动，不按固定 Wave 2 顺序等待无关席位。W-09、W-07、W-03、W-04、W-08 均按各自依赖就绪滚动进入；W-10 只等待 protocol/lab 的真实上游合入与空闲 slot，不等待无关席位。W-08 可在其所测代码合入后编写对应 spec/runbook，开发期不执行跨组件测试；不得把 W-08 固定为最后一波。`

保留的真实依赖：W-10 只读消费 W-09 已合入的 `protocol/lab/**`；某一 spec 仍须等待它所测代码全部合入。删除的是“无关席位的固定队列屏障”，不是技术依赖。

---

### R20-03：双核逐波预审、签署和回写完成前启动门禁仍在治理源文件中

**冲突类型：** C5-4/U83/U84；并违反 Rules 6、11、13、16 对 `ArgonGovernance` 职能边界的要求。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/phaseB-review-governance.md:9` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 在阶段 B 决策表通过、正文回写且派工方案经双核预审前，`工程冻结继续有效，严禁提前启动任何 tern`。 |
| `evidence/decisions/phaseB-review-governance.md:114` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 恢复派工方案 `必须逐项满足 7 条硬性预审标准`，任一不满足即 `由 ArgonGovernance 一票否决`。 |
| `evidence/decisions/phaseB-review-governance.md:149–150` | [PM#25](https://github.com/Pepgent/PM/issues/25) | G-5 要求每启动一个波次附 C1–C5/R1–R21 全表，交 `Argon` 与 `ArgonGovernance` `双核签署预审通过后` 才能调用 `tern new session` 和 `peer_send`。 |
| `evidence/decisions/phaseB-dispatch-draft.md:19` | [PM#25](https://github.com/Pepgent/PM/issues/25) | C2-2：`双核对 D16 逐条表决，即同时完成派工方案预审；每个波次启动前，双核再核对具体命令`。 |
| `evidence/decisions/phaseB-dispatch-draft.md:30` | [PM#25](https://github.com/Pepgent/PM/issues/25) | C5-2：`每个波次附本表的波次版`。 |
| `evidence/decisions/phaseB-dispatch-draft.md:32` | [PM#25](https://github.com/Pepgent/PM/issues/25) | C5-4：`进入第三节的启动程序前，工程冻结继续有效`。 |
| `evidence/decisions/phaseB-dispatch-draft.md:47` | [PM#25](https://github.com/Pepgent/PM/issues/25) | P-5 以“秘书已完成 D16 回写”为前置，每启动一个席位/波次都交双核核对确认后执行，并用 `tern ls` 作 PM 证据。 |
| `evidence/decisions/D16-phaseB-review-restore.md:13` | [PM#25](https://github.com/Pepgent/PM/issues/25) | `D16 通过即视为派工预审完成`，仍保留“派工预审”作为易被恢复成独立门禁的概念。 |

**需要的精确替换：**

1. `phaseB-review-governance.md:9`、`phaseB-dispatch-draft.md:32`：

   > `D16 三族表决通过即解除工程冻结并当回合启动已满足自身技术依赖的席位；PM/design/issue 回写与双核抄送并行，不是发车前置。`

2. `phaseB-review-governance.md:114`：删除“7 条硬性预审标准”“任一条由 ArgonGovernance 一票否决”；改为：

   > `G-1..G-7 是已通过的工程执行契约和事后检查清单，不构成启动前签署门禁；不满足时按 issue/PR 的 BLOCKED 或 Rule 20 的 PM 修正投票处理，不由 ArgonGovernance 例行否决工程发车。`

3. `phaseB-review-governance.md:149–150`、`phaseB-dispatch-draft.md:19,47`：删除“每波双核签署/确认后才能启动”“秘书回写完成才可启动”“tern ls 作为启动证据”的同步门禁，改为：

   > `主会话在发车后按 C5-2 实质核对并可异步抄送双核；双核不签署、不等待、不阻塞 tern 启动。常规状态留在 issue/PR，只有需要真正决策的 BLOCKED 或安全/硬件紧急事件才上报。`

4. `D16-phaseB-review-restore.md:13`：将 `D16 通过即视为派工预审完成` 替换为：

   > `D16 通过即为最终派工授权；D16-09 至 D16-11 不再另设双核预审或逐波确认。`

---

### R20-04：退役前批量复核、每 PR 合并前双核确认的落选文本仍可见

**冲突类型：** U83/U84、C5-4；虽标为“备选落选”，仍在 worker-facing 决策正文中重复出现。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D16-phaseB-review-restore.md:36` | [PM#25](https://github.com/Pepgent/PM/issues/25) | D16-12 的“备选落选”仍写：`每次派工前双核预审、记录 tern ls 结果、退役前批量复核`，以及 `每个 PR 合并前由双核确认`。 |
| `evidence/decisions/D16-phaseB-review-restore.md:60` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 讨论处理表写成“合并前核对……改为异步加退役复核”。 |
| `evidence/decisions/D16-phaseB-review-restore.md:65` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 讨论处理表写成“合并改为异步（方案 A），席位退役前做批量复核（方案 B）”。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):33 | [PM#25](https://github.com/Pepgent/PM/issues/25) | D16-12 的 issue 正文也复制了上述两个落选方案。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):69,74 | [PM#25](https://github.com/Pepgent/PM/issues/25) | 评论保留“异步加退役复核”“方案 B”的历史处理。评论不可回写。 |

**需要的精确删除/替换：**

- 从当前决策正文 `D16-phaseB-review-restore.md:36`、`:60`、`:65` 及可编辑的 PM#25 正文中删除“退役前批量复核”“每 PR 合并前双核确认”“每次派工前双核预审”这三类落选方案；不要用删除线保留旧路径。
- D16-12 只保留：`D16 通过即发车；合并异步；BLOCKED 才进入决策；哨兵发现异常后交相应治理处理；不设退役前同步复核。`
- PM#25 评论 :69、:74 是已发出的不可变记录，不删除、不改写；在 issue 当前正文或新评论添加一行明确声明：`评论中的方案 B/退役复核仅为已否决历史，不是当前执行契约；当前权威为 D16-12 修订后的异步合并。`

---

### R20-05：ArgonGovernance 被错误写成 argon 族例行投票席

**冲突类型：** U84；`argon-governance.md` Rules 6、11、13、16、20；LEDGER C2-1/C2-2。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D16-phaseB-review-restore.md:31` | [PM#25](https://github.com/Pepgent/PM/issues/25) | D16-07 要求 decision-vote 第 26 行写成：`常驻 agent://Argon 与 agent://ArgonGovernance 双核；双核逐条投票，全赞成才算赞成`。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):15 | [PM#25](https://github.com/Pepgent/PM/issues/25) | 计票摘要把 argon 族写成 `Argon、ArgonGovernance`，并称两者各 14/14 投票。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):28 | [PM#25](https://github.com/Pepgent/PM/issues/25) | D16-07 的 issue 正文重复“Argon 与 ArgonGovernance 双核逐条投票”。 |
| `evidence/argon/phaseB-review-governance.md:18` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 治愈路径把 `argon 族（Argon + ArgonGovernance 双核）`列为三族正式逐条表决单位。 |
| `evidence/argon/phaseB-review-governance.md:78` | [PM#25](https://github.com/Pepgent/PM/issues/25) | decision-vote 复核要求 argon 族由两个常驻角色逐条投票，双核全赞成才算一票。 |
| `evidence/decisions/D15-private-decision-discard.md:15` | [PM#23](https://github.com/Pepgent/PM/issues/23) | C2-2 简写为“argon 族双核……argon 族只裁决与投票”。 |
| [PM#25](https://github.com/Pepgent/PM/issues/25):45–48 | [PM#25](https://github.com/Pepgent/PM/issues/25) | 评论把 Argon 与 ArgonGovernance 的 14/14 逐条票当作 argon 族票。评论不可回写。 |

**需要的精确替换：**

将 D16-07、PM#25 正文和 `phaseB-review-governance.md:18,78` 的 argon 族句子替换为：

> `argon 族的正式投票席由顶层常驻 Argon 代表一票；顶层常驻 LeadMentor 是第三方导师族一票。ArgonGovernance 不作为每个决策项的例行投票人，不签署每波派工，不以一票否决阻塞工程。ArgonGovernance 负责领导层效率/在席/IRC/工人管理巡检、BLOCKED 的治理初审以及依 Rule 20 发起 PM 错误路径删除或修改投票；真正需要表决的事项仍通过 PM 决策 issue 进入适用的三族表决。`

同时把 PM#25 计票摘要的 `argon 族（Argon、ArgonGovernance）各 14/14` 删除，改记为：

> `ArgonGovernance 的治理审查/Rule 20 纠偏不计作例行 argon 族票；Argon 的正式意图票按三族规则计票。`

**不应误删：** `ArgonGovernance` 对 BLOCKED 初审、违规/异常事后处理和 Rule 20 投票发起的权限；删除的是“所有条目例行投票/预审签署/一票否决”这条越界职责。

---

### R20-06：`discuss:steady/divergent` medium 模型仍被写成重大决策压力测试流程

**冲突类型：** U11、U86、D1-03、LEDGER C3-3/R5；这是模型层级和导师席位的治理错误。

#### 6.1 当前规范性文字，必须替换

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D16-phaseB-review-restore.md:5` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 版本说明称先吸收 `discuss:steady`、`discuss:divergent` 压测意见。 |
| `evidence/decisions/D16-phaseB-review-restore.md:31` | [PM#25](https://github.com/Pepgent/PM/issues/25) | D16-07 明定三席表决前经 `discuss:steady、discuss:divergent` 压力测试。 |
| `evidence/decisions/phaseB-dispatch-draft.md:23` | [PM#25](https://github.com/Pepgent/PM/issues/25) | C3-3 写成 `D16 经过 steady 与 divergent 压力测试`。 |
| `evidence/decisions/D15-private-decision-discard.md:18` | [PM#23](https://github.com/Pepgent/PM/issues/23) | C3-2/C3-3 将 `discuss` 席列为压力测试角色。 |
| `evidence/decisions/D15-private-decision-discard.md:56` | [PM#23](https://github.com/Pepgent/PM/issues/23) | D15-13 要求所有重大设计/决策同时经 `discuss:steady、discuss:divergent` 压测。 |
| `evidence/decisions/D16-process.md:16` | [PM#25](https://github.com/Pepgent/PM/issues/25) | 流程记录把“表决前交 discuss:steady、discuss:divergent”列为本步核对。 |

**需要的精确替换：**

将所有上述规范性句子替换为：

> `设计压力测试由独立空白历史 claude-high（task:high）承担 steady/divergent 两种立场；禁止使用低于 task:high 的 discuss:* medium 模型参与设计、重要决策或投票。LeadMentor 作为顶层常驻导师席参与适用的正式决策。`

D1-03 在 [PM#1](https://github.com/Pepgent/PM/issues/1):21 已写 `不用 discuss:*（中等 effort，低于 task:high）`，应保留并作为唯一现行口径，不要让 D16-07 重新加入 medium 流程。

#### 6.2 仅历史/归档标签，不能当作现行指令

下列行有 `discuss:*` 或 `Steady/Divergent`，但它们是已发生的审查记录/来源元数据，不是工程派工契约：

- `evidence/decisions/D10-repo-delivery.md:5`，PM#16；
- `evidence/decisions/D10-rounds.md:5`，PM#16；
- `evidence/decisions/D11A-solo-ruling-review.md:6`，PM#17；
- `evidence/decisions/D11B-solo-ruling-review.md:4`，PM#21；
- `evidence/decisions/D11C-run-event-carrier.md:3`，PM#22；
- `evidence/decisions/D13-contract-gaps.md:5`，PM#18；
- `evidence/decisions/D14-release-identity.md:6`，PM#20；
- `evidence/decisions/D12-lab-wire.md:3` 的 `D12Steady/D12Divergent` 名称；
- `evidence/decisions/D16-process.md:45–46` 的历史“steady → v2 / divergent → v3”记录；
- PM#16 评论 :93–95、PM#1 评论 :125、:153、PM#25 评论中的各轮反例来源。

这些不可变或历史条目不应被伪装成当前规则。对当前可编辑正文，删除“表决前必须交 medium discuss”的动作；对已发 issue 评论/原票，不回写，新增 supersession 说明并让工程师只点击现行 D1/D16 正文。

---

### R20-07：PM#1 的领导 roster 仍是旧会话/旧职责模型

**冲突类型：** U86/U87、LEDGER C2-1/C2-2；这会让工程师不知道谁是正式席位、谁只是治理支持角色。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| [PM#1](https://github.com/Pepgent/PM/issues/1):19 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-01 把 leader 写成具体旧 session `01a193fd`。 |
| [PM#1](https://github.com/Pepgent/PM/issues/1):22 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-04 只写 `mentor:default（LeadMentor）`，没有要求顶层常驻、不得缺席。 |
| [PM#1](https://github.com/Pepgent/PM/issues/1):30 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-12 把 `argon 族（argon 及其全部实例）`作为投票族，且没有区分 ArgonGovernance 的非投票治理职责；导师只写泛化的 LeadMentor。 |
| [PM#1](https://github.com/Pepgent/PM/issues/1):31 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-13 只列 `argon、secretary、sentinel，以及之后的 sentinel 等`，遗漏顶层常驻 `LeadMentor`、`ArgonGovernance`、`BehaviorAnalyst`、`GovernanceInspector` 等现行角色及其边界。 |

**需要的精确替换：**

1. D1-01 的 where 改为 `顶层 Main 会话及其 omp worktree`，删除具体旧 session id；session id 只能作为运行记录，不是组织制度。
2. D1-04 改为：

   > `顶层常驻 LeadMentor（mentor:default）是导师族唯一正式投票席、分类争议终局仲裁与长调查计划审阅者；必须在顶层领导小组在席，不能由临时 mentor 或工程师代替。`

3. D1-12 改为：

   > `Claude 族：Main、治理分身、独立空白历史 task:high 合计一票；argon 族：常驻 Argon 一票；导师族：顶层常驻 LeadMentor 一票。ArgonGovernance、Secretary、Sentinel、BehaviorAnalyst、GovernanceInspector 是治理/支撑/巡检角色，不因其职责自动加入每项投票。`

4. D1-13 改为现行支持角色清单，并明确 `ArgonGovernance` 的 Rule 6/11/13/16/18–20 边界；删除“以及之后的 sentinel 等”这种开放式、无法判断权威 roster 的文字。

---

### R20-08：PM#1 的工程/测试/基础设施启动命令仍与 U62 相反（相邻的组织错误）

**冲突类型：** U60–U62、C3-4；虽不属于四个主分类中的“投票门”，但它是同一份 D1 组织契约中仍会误导 tern 的可执行旧路径。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| [PM#1](https://github.com/Pepgent/PM/issues/1):25 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-07 使用 `openai-codex/gpt-6-1-sol:high`，并要求 PTY `/usage`，首步用 `wt`。 |
| [PM#1](https://github.com/Pepgent/PM/issues/1):26 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-08 继承同一旧模型/PTY 命令，并按“每条 e2e 路径一个”配置测试者。 |
| [PM#1](https://github.com/Pepgent/PM/issues/1):27 | [PM#1](https://github.com/Pepgent/PM/issues/1) | D1-09 继承旧模型/PTY 命令。 |

**需要的精确替换：**

将 D1-07/08/09 的启动命令和模型统一改为 D16-00 已直接规定的形式：使用 `anthropic/claude-opus-5-5:high`、保留 `omp-peers` 扩展、使用席位的 home worktree/独立 session 目录；删除 PTY 中另起 omp `/usage` 的前置。测试席位按所测代码和依赖就绪按需启动，不按每条 e2e 路径预留并发席位，不把测试者启动变成每切片 runtime 验收门。

---

### R20-09：D10 的派工摘要仍可能把旧 issue/PR 粒度和固定第一批传播给工程师

**冲突类型：** C1-3/C5-4；D10 当前主体大部分已与 D16 对齐，但以下行应直接替换，避免工程师只读 D10 时得到第二套派工契约。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D10-repo-delivery.md:5` | [PM#16](https://github.com/Pepgent/PM/issues/16) | 顶部把 `discuss:steady`、`discuss:divergent` 写成讨论者。 |
| `evidence/decisions/D10-repo-delivery.md:17` | [PM#16](https://github.com/Pepgent/PM/issues/16) | D10-05 只说保留 `issue/PR` 粒度，没有明文禁止一切片一 PR/每步 runtime 仪式。 |
| `evidence/decisions/D10-repo-delivery.md:30` | [PM#16](https://github.com/Pepgent/PM/issues/16) | “第一批 W-06、W-05、W-01、W-02，滚动补齐十席”是固定启动列表，未写 slot+依赖就绪原则。 |
| [PM#16](https://github.com/Pepgent/PM/issues/16):29–33 | [PM#16](https://github.com/Pepgent/PM/issues/16) | D10-05/D10-09/直接影响摘要由 issue/PR、W-08/W-10 时点组成，实际权威应明确只有 D16-10 的 readiness-based 滚动规则。 |

**需要的精确替换：**

- `D10-repo-delivery.md:5`：删除 medium `discuss:*` 作为当前讨论者的读法，改为 `ClaudeHighD16/claude-high（task:high）` 的审查职责；历史 D10Steady/D10Divergent 名称留在不可变记录中。
- `D10-05` 相关句子改为 R20-01 的 issue 索引/同域 PR 口径。
- `D10:30` 改为：`启动与滚动补入均以 D16-10 的 slot + 各席位技术依赖就绪为准；第一批只是已授权的当前启动事实，不构成后续席位固定等待顺序。`

**不列为错误的 D10 条款：** D10-00 的“先组件实现、后统一 e2e”、D10-06 的统一 A0→S1→E2E-21→S2→D9、D10-08 对真正跨组件契约/BLOCKED 的领导层决策边界均与 C1-3 一致，不应被本审计扩大删除。

---

### R20-10：D8-14 的当前正文还没有完全切换到席位级连续开发口径

**冲突类型：** C1-3；PM#8 当前决策正文。

| 文件路径与行 | Issue | 观察到的条款 |
|---|---|---|
| `evidence/decisions/D8-mvp-scope.md:84–85` | [PM#8](https://github.com/Pepgent/PM/issues/8) | D8-13 正确地禁止 VS1/VS2/W1–W7 runtime 开工门禁；D8-14 仍写 `每切片……由独立 tern 工程进程完成，issue/PR 关联按既定流程`，容易与当前一席连续处理多个同域切片冲突。 |
| `evidence/decisions/D8-slice-issues.md:5–7,120–122` | [PM#8](https://github.com/Pepgent/PM/issues/8) | 当前映射已正确说明 VS1/VS2/W1–W7 只是旧切片标识、不是波次/排期/runtime 门禁，且依赖是代码合入 main；这些行无需删除。 |
| `evidence/inv/s01a195a6/d10-rewrite-snapshot/D8-original.md:84–85` | [PM#8](https://github.com/Pepgent/PM/issues/8) | 归档旧稿明确写过“每个切片开一个 issue，并配一个 PR 关闭它”“每个切片有一条可单独观察的验收”。这是历史快照，不能当作当前规则。 |

**需要的精确替换：**

- 将 D8-14 的“由独立 tern 工程进程完成”改为“由负责该仓/互斥路径域的独立 tern 席位连续完成”；
- 将 issue/PR 句改为 R20-01 的口径；
- 明确 `VS1/VS2/W1–W7` 只保留为映射 ID，不是启动波次或验收闸门。

**历史快照处理：** `D8-original.md` 是 D15 取证/重写输入，不能回写成新版本；应在任何 worker-facing 索引旁明确“仅历史快照，现行以 D8-mvp-scope.md/D10/D16 为准”，不要让工程师直接按旧稿派工。

---

## 3. PM issue 逐项处理清单

### PM#1（D1）

- 正文 :19：删除具体旧 Main session id，改角色名。
- 正文 :21：保留“不用 discuss:*”这一正确限制；补 `claude-high/task:high` 和顶层 `LeadMentor` 的现行席位描述。
- 正文 :22：补顶层常驻 LeadMentor、不可缺席和唯一导师投票席。
- 正文 :25–27：用 D16-00 的 Opus/omp-peers/home-worktree 启动命令替换旧 GPT、PTY `/usage`、每路径固定测试席位。
- 正文 :30：ArgonGovernance 从例行 argon 投票族中移出；正式 argon 票由常驻 Argon 代表；补 LeadMentor 顶层常驻。
- 正文 :31：更新支持/巡检角色清单及边界。
- 评论 :125、:153 等包含 `discuss:*` medium 的原票理由：评论不可变；新增 supersession 说明，不把它们作为现行制度。

### PM#16（D10）

- 决策表 :17、:30 及当前 D10 文件对应行：改为 R20-01 的席位连续开发/按依赖就绪滚动口径。
- 文件 :5：当前头部不要把 medium `discuss:*` 写成现行讨论机制。
- 评论 :93–95 明写“本轮不调度 task:high”并引用 discuss 中等模型：这是与 U11 相冲的历史票，评论不可变；新增说明该轮程序瑕疵已由 D16-00/D16-07 取代，现行重大决策必须有独立空白历史 `task:high`，且不得使用 medium `discuss:*`。
- D10-07 的旧单独裁决复核本身不是工程席位的每 PR 退役门禁；保留决策审议范围，但必须在 how 中注明不阻塞不消费该条目的其它实现。

### PM#25（D16）

- 正文 :15：删除“Argon、ArgonGovernance 各 14/14 作为 argon 族例行票”的表达，改 R20-05。
- 正文 :22：D10 恢复项中所有 issue/PR 粒度、固定顺序与写回前置均按 R20-01/R20-02/R20-03 直接替换。
- 正文 :28：删除 D16-07 的 medium discuss 和 ArgonGovernance 双核例行投票文字。
- 正文 :31：改为按 slot+技术依赖就绪滚动，不把 W-09/W-07/W-03/W-04/W-10/W-08 固定排队。
- 正文 :32：删除一切片一 PR 的强制句，改同域连续开发口径。
- 正文 :33：删除“每次派工前双核预审、每 PR 合并前确认、退役前批量复核”的落选块；保留当前异步合并路径。
- 评论 :45–48、:69、:74：不可变；新增一条当前权威说明，明确它们只是被否决历史，不是发车/合并/退役门禁。

---

## 4. 已审但不应误删的条款

以下内容经过目标扫描，当前没有发现 Rule 20 所列错误路径，或已经明确写成了正确的非门禁语义：

1. `evidence/decisions/D2-components.md`：当前 D2 主要定义状态权威、组件归属和生命周期；未发现“一切片一 PR”、Wave 2 固定队列、双核逐波预审或 medium discuss 现行派工条款。D2-25 的两段验收是产品最终验收分段，不是每切片 runtime 门禁。
2. `evidence/decisions/D8-mvp-scope.md:84`：D8-13 已写统一 A0→S1→E2E-21→S2→D9，并明确开发期不执行跨组件 e2e；不要把最终统一验收删除。
3. `evidence/decisions/D8-slice-issues.md:5–7,120–122`：已经明确 VS1/VS2/W1–W7 不是波次/排期/runtime 门禁，依赖改为代码合入 main；保留这些澄清。
4. `evidence/decisions/D10-repo-delivery.md:20–21`：D10-08 的 BLOCKED 初审和 D10-09 的路径白名单/互斥写入是边界契约，不等同每 PR 审批；只需删除“每波二次预审”的旧传播，不要删除真正的契约/权限/生命周期决策边界。
5. `evidence/decisions/D16-phaseB-review-restore.md:36` 的当前 how 前半段（D16 通过当回合发车、回写并行、合并异步）符合 U83/U84；需要删除的是同一行中仍可见的落选 gate 方案。
6. `evidence/decisions/D16-phaseB-review-restore.md:37` 与 D10-06 的阶段 C 统一验收是最终验收边界，不是 Wave 2 启动前置；保留。

---

## 5. 历史材料与不可变记录的处理原则

- `D16Steady.md`、`D16Divergent.md`、`D16-process.md`、`D16-annexA.md` 中关于旧门禁、固定队列、退役复核和 medium discuss 的部分大多是压力测试、取证或迁移清单，不是当前 worker 契约。例如 `D16Divergent.md:44–72` 明确描述了每 PR 双核确认导致等待，以及方案 B 退役复核；`D16Divergent.md:180–203` 明确记录 W-10 排队过晚和 W-08 两种读法。这些可作为本审计的证据，但不应成为派工消息的引用源。
- 已发出的 PM issue 评论/原票（PM#1、PM#16、PM#25）不可回写。不要删除历史票；在可编辑 issue 正文或新评论中用一句现行权威声明覆盖解释：`仅当前 D1/D10/D16 正文及 LEDGER C1–C5 生效；评论中的旧 roster、medium discuss、双核预审、退役复核均为历史记录，不是执行契约。`
- `D16-annexA.md:54–77` 引用的“前置切片须已有 runtime 验收证据”是要被移除的 issue 原文清单，不是继续施加该门禁；迁移执行完后，worker-facing 链接必须指向已改写的 issue，不要直接把 A1 引文当作新派工说明。
- 本审计没有运行 build、lint、测试或 runtime；也没有把 commit/hash/digest 比对当作任何证据。所有结论均来自当前文档和 issue 正文/评论的文本观察；将固定队列会导致某个具体 worker 等待无关席位的部分已标注 `[INFERENCE]`，并以 D16Divergent 的同类主路径反例作为旁证。

## 6. Rule 20 建议的投票拆分

为避免再造串行治理门，可以拆为以下独立、可快速表决的 PM 修改项：

1. **D16/D10/D8 粒度修正：** 一 issue 继续做索引；同域切片允许同一 PR 连续实现；删除每切片 runtime 仪式。
2. **D16 派工修正：** slot + 技术依赖就绪即滚动，删除固定 Wave 2 顺序和 W-08 固定末席。
3. **双核边界修正：** 删除逐波预审、签署、回写前置、退役前批量复核；双核只异步观察/处理真正 BLOCKED 和异常。
4. **投票/roster 修正：** ArgonGovernance 回到 Rule 6/11/13/16/18–20 的治理巡检与 Rule 20 PM 修正职责；Argon 代表 argon 族正式票；LeadMentor 顶层常驻；禁止 medium `discuss:*`，由 `claude-high`/独立 `task:high` 承担压力测试。
5. **D1 组织契约修正：** 删除旧 session id、旧 GPT/PTY 启动命令，统一引用 D16-00 的现行工程进程契约。

这些投票项互相独立；工程发车不应等待它们逐项完成。当前阶段应先由 Rule 20 对直接阻塞项（2、3、4）发起修改，再由秘书把 worker-facing 链接切到新的唯一正文。
