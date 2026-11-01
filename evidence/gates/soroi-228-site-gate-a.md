# soroi-228-site 闸门 A：意图与公开契约判定

**结论：takeover 缺 `Human.site` 的契约缺口不成立；不改 ADT。整运行 abort 存在另一处违反既定提交/留痕契约的静态实现缺口，不得用 takeover 结论一并消项。**

判定席位：产品原始意图守护席 Argon（一次性闸门 A，同席承接，不增加票数）。任务对象：[soroi#228](https://github.com/Pepgent/soroi/issues/228) 的 site 上报及材料第五节整运行 abort 登记。本报告只判 A，不替代闸门 B，不联系工人、不写 GitHub、不提交、不改设计或代码、不运行测试。

路径简称：
- `S/`：`/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `P/`：`/Users/mouriya/Ext/code/pepgent/pepgent-pm/`
- `DEC/`：`P/evidence/decisions/`
- 材料：`P/evidence/gates/soroi-228-site.md`

证据标记：`(U)` 用户原话；`(D)` 已通过决策正文或设计现状；`(R)` 本席直接读取的源码事实；`[INFERENCE]` 静态控制流推论，未经本席 runtime 验证。材料中的工人运行报告仍为 `(A)`，本报告不把它升级为独立实测。

## 一、意图裁决

### I-1【定】不把既定行为的验证缺口改造成新公开字段

依据 `(U) U1`：Argon 守原始意图，代码与设计上的技术取舍归 leader；串联由领导小组协商。`(U) U20`：没有用户原话的意图裁决只能暂定，不能否决。原文见 `S/LEDGER.md:68,84`。

因此，本席确定的是**不可由工人推测或本席解释新增公开契约**这一边界，不宣称用户曾逐字规定 `Human` 不带 `site`。四变体形状、卷定位与批次汇入的具体依据是下列已通过决策 `(D)`，不是把技术选择伪装成 `(U)`：
- D6-03、D6-18：`DEC/D6-store-service.md:31,46,77-86`；
- D4-15：`DEC/D4-remote-exec.md:63`；
- D11-24，及其恢复效力 D16-02：`DEC/D11A-solo-ruling-review.md:40`、`DEC/D16-phaseB-review-restore.md:26`。

### I-2【定】保留既定全流程范围，但不增设逐步验收锁

依据 `(U) U2`“全流程任务，不要擅自收缩”、`U23`“能走通我说的所有流程”，以及 `U30–U32`“把东西开发好后再做e2e测试”、`U83`“验收并不需要每一步都验收”；原文见 `S/LEDGER.md:69,86,88,97`。

本席不以尚缺 takeover `/progress` 的端到端证据证明功能已通过，也不以此为其他工程加同步等待锁；整运行 abort 已规定的留痕不得因当前代码不提交而从设计删去。具体留痕合同来自 D6、D8，而不是从这些概括性 `(U)` 推导新事件或新接口。

### I-3【定】公开契约变更须走管理层，不以“机械补全”先实施

依据 `(U) U11`（缺失设计否决及重大决策参与边界）、`U12`（逐项 what/where/how/取舍）、`U14`（重大决策进 PM issue）、`U96`（反对 BLOCKED 错分类先入代码再回退），原文见 `S/LEDGER.md:77-80,110`；现行双闸门规则见 `S/AGENTS.md:58-60`、`S/.omp/skills/tern-worker/SKILL.md:51-58`。

此裁决不把所有缺陷修复升级成投票：**恢复已通过合同与新增/修改合同是两类事**。工程内既定合同的实现修复按 D10-08 办；要增删公开 ADT、生命周期或验收语义才转 P0。本报告也不替闸门 B 批准路径或席位。

## 二、A-1 至 A-4 逐项判定

| 项目 | 闸门 A 结论与具体处置 | 核实来源 |
| --- | --- | --- |
| **A-1：takeover 缺 `site` 是否是契约缺口** | **不成立，A 放行处置 a 的“不改契约、不改代码”部分，无需 P0。** `Human` 已有事件 transfer/position；步提交按本步 transfer 与该调用 position 读取已接受的卷，批次汇入不以 `Executed.site` 为唯一开关。只撤销“缺 site 导致不发布卷”的推论，不宣称 takeover `/progress` 已 runtime 通过。 | `(D)` D4-15 `DEC/D4-remote-exec.md:63`；D6-07/15/18 `DEC/D6-store-service.md:35,43,46`；D11-24 `DEC/D11A-solo-ruling-review.md:40`；设计 `S/design/store.md:39,47-50,131`、`S/design/intervention.md:30-32,68`；`(R)` `S/packages/store/src/store.ts:312-327,406-412`。边界意图 I-1（U1、U20）。 |
| **A-2：给 `Human` 新增 `site`** | **触及入站和持久化公开 ADT，处置 c 不获免票放行，若继续提出必须 P0 逐项投票。** 不能因为文件在 store 白名单内就免票；目前未发现增加这项重复定位事实的必要性。 | `(D)` D10-08/10 `DEC/D10-repo-delivery.md:20,22`；D6 四变体草图 `DEC/D6-store-service.md:82-86`；`(R)` `S/packages/store/src/contract.ts:41-51,136-142`。意图边界 I-3（U11、U12、U14、U96）。 |
| **A-3：D6:72 的 Site 注释** | **非合同冲突，不需要为此补设计或改 D6 已通过方案；处置 e 可限为无语义变化的文字对齐，A 免票放行。** 该注释只说 remote Executed 会汇入，未说只有它会汇入；D6-07/15、D11-24 已明确 Human/Aborted。若执行 e，仅在 `design/store.md` 的卷发布/批次段写明下述定位句，不新增字段，不改 PM 决策的历史投票记录。 | `(D)` `DEC/D6-store-service.md:35,43,72,98`、`DEC/D11A-solo-ruling-review.md:40`；`S/design/store.md:39,49,56,95,127,131`。文档职责 U1（`S/LEDGER.md:68`）；`DEC/D16-phaseB-review-restore.md:30`。 |
| **A-4：“已写下的批次”与被中止当前轮** | **既定承诺是保住已写出的正式批次文件，不新增“中止时必须额外生成一批”的要求；本义解释免票，扩展为强制末轮 flush 则属设计补充，必须 P0。** 不核实宿主 `turn_end` 也能作此有界判定：当前轮若已产出正式文件同样要保留；尚未产出则不能把未知事件语义当已实现或当缺 `site` 的证据。 | `(D)` D4-15 的 `.parquet.tmp → .parquet` 与读正式文件 `DEC/D4-remote-exec.md:63`；`S/design/store.md:122,126,131`、`S/design/intervention.md:32`；`(R)` 当前 producer 只在 `turn_end` 写批次、shutdown 关闭 writer，`S/packages/omp-soroi/src/eval/batches.ts:80-98`。I-1（U1、U20）禁止将未获原话支持的新 flush 义务定成用户本意。 |

处置 e 的允许文字是：**“`Human` 与 `Aborted` 发布本次步提交的 `transfer` 中该调用 `position` 已接受的卷，卷内正式 Parquet 批次同事务汇入 `agent_progress`；`HumanEvent.transfer/position` 与步/调用坐标一致。”** 不能写成“Human、Aborted 都按 `event.transfer` 定位”：`Aborted` 没有 HumanEvent。现文已经足够支持实现，因此 e 不是 a、b 或工程推进的前置条件；本任务只交裁决，不执行 e。

## 三、处置 a–e 的完整 A 分流及技术/串联意见

这里的“赞成/不赞成”是本席对材料候选的明确意见，不冒充已成立议案的正式选票，也不替代自动计票流程。

| 处置 | 本席意见 | 免票边界或 P0 事项 |
| --- | --- | --- |
| **a：不改代码，澄清 site 上报** | **赞成，但必须拆开“合同无缺口”与“runtime 未证实”。** | A 可放行；不能写“当前实现已经 e2e 正确”，也不能称现有 F16/F17 已专门覆盖 takeover `/progress`。`DEC/D8-mvp-scope.md:135-136` 的 F16④是正常完成，F17③是整运行 abort；两条不等于 takeover 查询证据。后续总线记录由指定事务方处理，本席不发言。 |
| **b：store 的 Human+批次本仓回归用例** | **赞成作为既定行为的局部回归，不改合同，A 可放行、不要求 P0。** | 用例只验证同 transfer/position 已上传正式批次随 Human 步提交进入 `/progress`；不得把本仓用例升级为新的跨组件验收锁。代码完成时点、执行阶段、W-06 承载与是否重入归 B；本席不指挥已不在岗工人，也不在此编写或运行测试。依据 I-2（U30–U32、U83）及 D16-10/13，`DEC/D16-phaseB-review-restore.md:34,37`。 |
| **c：Human 加 site，store 改用 site 选卷** | **不赞成当前候选，理由是既有定位足够，新增公开字段不能解决任何已证实的现路径缺口。** | 必须 P0，不能免票；这是技术反对意见，不行使没有直接 U 证据的产品否决。主路径反例：按现有 D6-18 及插件提交一个不带 site、但 event 与已接受卷坐标完全正确的 Human 请求；若新 site 必填，原来合法请求将被新入站 schema 拒绝，现生产方/消费方不能继续依旧合同交互。旧请求形状见 `S/packages/omp-soroi/src/eval/commit.ts:60-68`。 |
| **d：在 E2E-18/F17 新加 takeover 后 progress 判据** | **不以闸门直接批准；作为更完整覆盖的提案可以提交，但材料 d 明确修改既定验收语义。** | 必须 P0 逐项投票；不能借补测直接重写 F17 的 acceptance。已有 D6/intervention 行为不因 F17 未列而消失，但“行为已规定”也不授权单席更改已通过的 campaign 判据。依据 D10-08 `DEC/D10-repo-delivery.md:20`、F17 `DEC/D8-mvp-scope.md:136`、I-3（U11、U12、U14、U96）。 |
| **e：限于上节定位句的设计文字对齐** | **赞成作为可选编辑性澄清，不以它阻塞 a/b。** | A 可免票；由 Argon 文档职责处理，不交工程师改 `design/`；若实际把 Human/Aborted 改成依赖新 site，转 c/P0。PM 正文编辑与不可变历史边界由事务 owner 按已通过决策处理，本席不授权重写既有选票、评论或合并 PR。 |

## 四、范围外登记 G：整运行 abort

### G-A【既定合同判定】是公开生命周期/持久化留痕事项，但不是尚待设计的新功能

**`design/store.md:131` 不能改成“整运行 abort 不入库”来贴合现实现；已通过合同要求在 `run_aborted` 之前将相应正式步及已中止调用的事实落进父运行，远程已写正式批次随这一步汇入。**

决定性依据不只有 design 的一句话；材料没有充分展开的 **D8 F17③已经明确要求整运行 abort 时 store 写入 `call_aborted`、`run_aborted`**：`DEC/D8-mvp-scope.md:136`。结合：
1. D6-04：正式步全部调用结束，含中止，才一次提交；`DEC/D6-store-service.md:32`。
2. D6-05：eval 中止全部在途调用、得到结论，之后 store 写运行中止锚点；`DEC/D6-store-service.md:33`。
3. D6-15：中止调用的远程批次仍随这一步提交汇入，`Aborted` 保存 transcript；`DEC/D6-store-service.md:43,93-99`。
4. D6-07、D11-24：Aborted 发布该位置已接受卷；`DEC/D6-store-service.md:35`、`DEC/D11A-solo-ruling-review.md:40`。
5. D7-09 对整运行 abort 明确引用 D6-05、D6-15，没有排除留痕；`DEC/D7-lab-backend.md:69`。
6. `S/design/store.md:56,95,99-100,131` 与上述合同可同时成立：先完成内层正式步留痕，再写外层运行中止锚点；`:99` 未重复提交细节不是禁止提交的相反契约。

这是已通过合同的合读结论，不声称 `(U)` 曾逐字选择某个函数或 abort 算法。意图层【定】只采用 I-2 的 U2/U23：不得删去已定全流程范围；缺少更细的 U 原话不妨碍按已通过决策落实此合同，也不允许凭概括 U 另造状态模型。

### G-R【静态实现事实】确有一条与该合同不一致的控制流

本席从源头核实，不依赖材料对 PR 运行的转述：
- `S/packages/omp-soroi/src/index.ts:63-70`：整运行 abort 调用 `control.abortEvaluations` 与 `supervisor.abortWriters`。
- `S/packages/omp-soroi/src/eval/control.ts:54-58,96-99`：整运行中止触发普通 abort 信号，不走派生的 settle。
- `S/packages/omp-soroi/src/subagent/main/supervisor.ts:335-365`：普通取消使 capture reject；远程仍有序 park/copy-out/写回 transcript，但随后抛出，不产生可正式提交的 Aborted outcome。
- `S/packages/omp-soroi/src/eval/execute.ts:334-352`：只有 takeover/settle 获得相应替代/Aborted outcome；其余抛错变成 `failed`。
- `S/packages/omp-soroi/src/eval/index.ts:81-88,106-109`：存在 failed 就在正式提交前返回，再进入 cleanup。
- `S/packages/omp-soroi/src/eval/store.ts:240-246`：未提交的 transfer 在 close 中删除。
- `S/packages/omp-soroi/src/eval/supervisor.ts:78-101`：等 formal eval obligation 释放后，再请求 store abort。

**[INFERENCE]** 对上述整运行 abort 的远程 Agent 取消主路径，transcript 可回到中心，但步/Aborted 调用/批次未入库，随后 transfer 被删除、外层仅写 run_aborted；这违反 F17③与 D6-15。未运行此路径，本报告不声称现网实测失败，也不把“只保住 transcript”当满足全部合同。

### G-放行范围与席位归属

**A 结论：按既有 D6-04/05/07/15、D11-24、F17③恢复提交与留痕，是实现纠偏，不新增或改写公开合同，A 不要求重新 P0 投票。** 具体放行目标是：整运行中止的在途正式步收齐中止结论，将该步应有事实、Aborted 记录及已接受卷中的正式批次提交确认，再写 `run_aborted`；不改 schema、不另建上传/批次入库通路、不删 F17 已有判据。

代码承载归 **W-07 的 plugin 路径域 `packages/omp-soroi/**`**（包括根/worker 的 eval 中止与提交衔接），不是给 store 加 `Human.site`，也不是以 W-08 改 spec 代替修复；store 已有的 Aborted 分支 `S/packages/store/src/store.ts:401-404` 能发布卷并汇入批次。路径矩阵依据 `DEC/D16-phaseB-review-restore.md:33`。这里说的是职责席位，不断言原工人仍在岗，不构成唤醒/重派令；现岗位承载、阶段与相关程序归闸门 B。

**若提出的方案要豁免 abort 留痕、改变正式步提交边界、增改公开 ADT/状态、另造写入入口或改 F17 判据，则超出上述实现纠偏，A 不放行，必须 P0 逐项投票。** 产品/契约议案由总协调席、独立正反审查席、Argon、LeadMentor 四常设职能席参投，产品全景席按现行专项规则加入；若另含组织/派工制度变更，治理席按其范围参投，不能用治理票代替产品意图票（`S/AGENTS.md:14-27`）。

## 五、否决与交付边界

- **本轮不行使产品原意一票否决。** 无直接 `(U)` 逐字禁止 `Human.site` 或规定中止末轮 flush；技术冗余不冒充用户否决。c/d 的“不免票”是既有投票边界，不是本席预先代全体投反对票。证据门槛：U20，`S/LEDGER.md:84`；`S/AGENTS.md:29-35`。
- **不可混并消项：** a 可以澄清 site 缺口不成立，但不能顺带把 G 的 abort 留痕实现缺口标成不存在或已完成；G 的修复/验收承载由总协调及 B 按现行职责处理。
- **仅完成一次性闸门 A 报告。** 已通读 `AGENTS.md`、`LEDGER.md`、材料、`design/store.md` 与 `design/intervention.md`，并核对上列决策条目和源码；未运行测试、服务或跨组件验证，未查询/改写 Git、会话或 GitHub 历史，未联络工人、未提交。本报告只写本文件，源材料、设计与代码保持不动。
