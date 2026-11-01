# Pepgent LAB-11b：闸门 B 判定

判定席位：组织治理与分配守护席（ArgonGovernance），本轮一次性实例。

对象：[Pepgent/Pepgent#18（LAB-11b）](https://github.com/Pepgent/Pepgent/issues/18)。输入为 `GATE/pepgent-18.md` 的第〇项、空白 1–4 与范围外登记；对照既有 [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17) 的 A/B 报告。只判席位路径域、阶段门禁、必须投票的程序类别与合表边界，不替闸门 A 裁产品意图，不选定尚未表决的产品生命周期。

## 一、逐项结论

| 项 | 明确结论与具体处置 | 程序边界 |
| --- | --- | --- |
| 〇：复用 StoreClient / LabEvents 的顺序依赖 | **复用同席位、同路径域的既有模块不越界，不因 D8 依赖列未列 LAB-07a 就另行投票；可按处置 a，在上游合法合入 main 后接续，本席不强迫复制实现，也不要求扩写 D8 的固定依赖。** 同域连续实现的处置 c 亦获 B 许可，但不是所有切片必须捆绑的新增规则。 | 叠加分支不取得绕过上游未决授权或本仓检查的权力；不能把依赖链整包提前合入 main。是否确需 store 前置读取由 A 判定，B 不替其新增该要求。 |
| 1：启动 prompt 正文格式 | **对仅在 W-09 的 Lab 实现内完整传递既定草稿内容、沿用原有投递通道、且不新增消费者约定或 agent 行为规则的处置，B 不越界，可放行给工程师决定文本/Markdown/无损 JSON 的私有渲染。** | 此处不裁“全文”的产品含义或 draft.id 是否必需；A 若认定为缺失设计、公开契约或定制 agent/skill/rule 内容，必须 P0，不得借 B 的路径许可免票。 |
| 2：审批路径 principal | **沿用现行 human_irc_queue，在批准后入队时填写实际审批者的当前 session.user.id，相关代码留在 W-09 域内，B 不越界，可放行。** | 这是对材料处置 a 的 B 许可，适用现行“principal 是当前用户”条文的产品解释仍须 A 确认；改以讨论 owner 冒代操作者，或另建带新来源语义的投递路径，不在此许可内，按 P0 处理。 |
| 3：draft.discard 归属与生命周期 | **既定 draft.discard 由 W-09 在 LAB-11b 承载可按现有 D10/D12 机械落实，不需要为命令已存在这件事重投；但让它兼作撤回 pending、规定 sent/已绑定运行时的删除或隐藏等公开生命周期选择，必须 P0，不能凭文件在白名单内免票落地。** | 当前不把 D8 的未枚举项当成新功能或新席位；如正式改变切片范围/依赖/完成判据或改派其他承载者，则另列组织分配条目，五席表决。 |
| 4：draft.save 状态矩阵 | **无 pending 且未绑定草稿的既定保存行为可继续实现；awaiting_approval、sent、已绑定运行下的可保存性及审批投递版本属于同一组公开生命周期/审批语义的待定项，必须 P0，与第三项合表逐行表决。** | 既有 savedVersion 与无 base-version 的请求形状不授权新增乐观并发机制；版本快照、额外持久化或 wire 字段本身即属须表决的变更，本报告不选定任何状态方案。 |

以上均为具体处置的 **B 判定**，不是 A 结论、投票结果、代码完成证明或总放行。任何免票处置必须由 A 对同一处置也确认无越界；任一闸门认定越界即转 P0，不能先写入合入后补票（`SOR/AGENTS.md:58-60`；`SOR/.omp/skills/tern-worker/SKILL.md:51-58`；U96 `SOR/LEDGER.md:110`）。

## 二、证据与适用规则

路径简称：

- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`。
- `PM/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`。
- `DEC/` = `PM/evidence/decisions/`；`GATE/` = `PM/evidence/gates/`。
- `WT11b/` = `/Users/mouriya/Ext/worktrees/pepgent-lab-11b/`。
- `WT07a/` = `/Users/mouriya/Ext/worktrees/pepgent-lab-07a/`。

`(U)` 为用户原话；`(D)` 为本轮直接读取的文档/源码；`(A)` 为材料转述的 agent 观察。源码静态读取不冒充 runtime，工作树快照不冒充远端 main 的当前状态。

| 决定性依据 | 本轮直接核对的内容 | 来源 |
| --- | --- | --- |
| 席位边界 | W-09 独写 protocol/lab、server/lab、rpc/lab、api/lab 等列明路径；W-10 只读消费协议；各席不得共分支、共 PR，不得写无关根 checkout | (D) `DEC/D16-phaseB-review-restore.md:28,33`；`SOR/AGENTS.md:71-75` |
| 同域连续开发 | 切片是范围、依赖、状态索引；同仓/同域关联切片可以连续实现、合并交付；只有编译、类型、构建或调用上的真实依赖才等待，不要求每片独立 PR | (D) `DEC/D10-repo-delivery.md:17`；`DEC/D16-phaseB-review-restore.md:35` |
| 必须投票事项 | 公开 wire、持久化、ADT、权限、状态权威与生命周期、范围、缺失设计、验收语义、定制 agent/skill/rule 内容不能由 leader 单裁；现契约内私有结构/算法/文件组织由工程师决定；遇空白只暂停依赖部分 | (D) `DEC/D10-repo-delivery.md:20`；`SOR/AGENTS.md:122,124` |
| 依赖与下游 | LAB-11b 原依赖 LAB-04/06；WEB-02 依赖 LAB-07a/WEB-01，WEB-04 另依赖 LAB-11a/11b；W-10 在真实 protocol 上游合入后优先补入下个空名额 | (D) `DEC/D8-mvp-scope.md:203,333,336-338`；`DEC/D16-phaseB-review-restore.md:34` |
| 阶段纪律 | 开发期不设每切片跨组件 runtime/审批锁；代码未写完不写不跑测试；阶段 C 统一全流程验收；U96 异步接缝金丝雀不成为工人合入锁 | (D) `SOR/AGENTS.md:45-47,127`；`DEC/D16-phaseB-review-restore.md:34-37`；(U) U30–U32、U83、U96 `SOR/LEDGER.md:88,97,110` |
| 草稿与命令已有归属 | draft 表、DraftCanvas 与草稿引用归 LAB-11b；D12 完整命令联合包含 draft.save/discard、experiment.start/approve，并列逐命令结果与权限 | (D) `DEC/D10-repo-delivery.md:23`；`DEC/D12-lab-wire.md:39,42,418-421,470-473,511-512` |
| 生命周期现有锚点 | pending 是意图，sent 后遇非派生 run_started 才绑定并删除；PendingLaunchWire 不含版本；ExperimentWire 保留运行的来源草稿 | (D) `DEC/D7-lab-backend.md:66,130-133`；`DEC/D12-lab-wire.md:152-156,265-268` |
| 投票席位 | 产品/契约四席；组织、派工、PM 错误路径清理另加治理席；逐行投票、有效反例消除且至少 3/4 多数、无专责否决 | (D) `SOR/AGENTS.md:9,22-27`；(U) U11/U12/U95/U96 `SOR/LEDGER.md:77-78,109-110` |

本轮已读 `SOR/LEDGER.md` 与 `SOR/AGENTS.md` 全文，并补读 LEDGER 截断长行。角色指定的 `/Users/mouriya/Ext/work/o1/paper.md` 不存在；直接查看该目录及限定路径查找后没有取得文件，不将 article.md、draft.md 或其他文章冒认为它。本轮程序分类有上述直接适用条文，不以缺失论文补造规则。

## 三、第〇项：顺序依赖的具体判断

### 3.1 先分开三个不同问题

1. **功能是否要求读取 store：由 A 裁。** D7-06 的运行/意图分工是已通过契约（`DEC/D7-lab-backend.md:66`）；B 不从“同刻至多一未结束”自行推出 Lab 必须新增 start/approve 前置读取，更不在这里决定不可达错误码、重试或事务安排。若 A 认定无需该读取，StoreClient 依赖随之消失；catalog 通知依赖仍在（`DEC/D12-lab-wire.md:557`）。
2. **采用既有模块是否产生真实代码依赖：是，但不是固定的新产品依赖。** 本轮直接读到 `WT07a/.../server/lab/store.ts:36,62-64` 的 StoreClient/runs()、`events.ts:8,29-30` 的 LabEvents/publish() 及 `runtime.ts:8,13,63-68,119-126` 的接入；WT11b 的 server/lab 目录尚无这两个模块，命令仍集中返回 notSupported（`WT11b/.../server/lab/operations.ts:247-264`）。选择调用它们后，缺少模块就是实际的编译/调用依赖；选择何种共享文件组织本身仍属工程师自主范围，不把该选择升级成所有后续实现都必须等待 LAB-07a 的契约。
3. **D8 依赖列不是禁止同域复用的穷尽名单。** D8:203 与 D16:35 已允许按真实代码依赖连续实现；实际依赖可记入工程 issue/PR，不必为每个内部 import 重投切片表。若提出正式把 LAB-07a/07b 变为 LAB-11b 无条件、长期的交付前置，或改变下游依赖/完成判据，那才是需 P0 的范围/派工修订，不能由本报告直接新增。

以上 `.../server/lab/` 均为 `apps/web/src/server/lab/`；此处源码只证明两个本地工作树的依赖形状，不证明远端合入状态。

### 3.2 对五种处置的 B 答复

| 处置 | B 判定与处置边界 |
| --- | --- |
| a：先合法合入上游，再从 main 接续 | **可放行，作为不复制实现的接续路径。** 只等待实际调用所需模块及其合法交付，不再要求上游跨组件 runtime 或阶段 C 证据。等待不扩大成 W-09 整席停工；可以继续原有 LAB-07a/07b 或其他不依赖本次未决契约的代码。 |
| b：叠加到 07a 提交 | **可以有同席位叠加开发关系，不能把“叠加”当作先合入上游的许可。** 若以 main 为合并目标且差量包含上游内容，必须先满足上游各自的授权与本仓检查，不能挟带仍需表决的 routeTree.gen.ts，亦不能绕过已确定的 07a/07b 交付范围；若只以 07a 分支为目标，则属于同域连续整合，与 c 的程序性质相同，不构成独立解阻。 |
| c：07a/07b/11b 同一自身分支、同一交付 | **同域关联交付本身可放行，不必改 D8。** 仍由 W-09 独立分支/PR 实现原范围，不让 W-10 共写。其代价是 WEB-02 的真实上游更晚合入，但 D16-10 未承诺每片必须先独立合入，故不是当然违例；不得由管理层将 c 固化为 W-10 等全部后端或全部未决事项的开工锁，也不强迫原本能独立交付的代码捆绑。 |
| d：在 main 基线上实现所需共享能力 | **在现契约、现 W-09 路径内的私有代码组织无需另投票，但不命令工人复制一套实现。** 不复制外部权威 schema，不建立与真实 events 消费者脱节的第二发布源，不省略 catalog；具体如何提取/共用与整合由工程师决定。若为了独立合入而必须改公开通道、权限、切片范围或使用白名单外路径，则该变化另走双闸门/P0。 |
| e：A 认定无需 store 前置读取 | **按 A 的结论缩小真实依赖面，再执行 a/c 或合规的内部组织；不能顺带删除既有 catalog 通知义务。** |

依据：`DEC/D16-phaseB-review-restore.md:33-37`；`DEC/D10-repo-delivery.md:17,20`；`DEC/D12-lab-wire.md:557`；`GATE/pepgent-17-gate-b.md:9-10,78-91`。

**对上游未决项不作状态猜测。** 既有 gate-b 明确路由文件需 P0（`GATE/pepgent-17-gate-b.md:9,46-55`）；本判定不撤销该分类，也不声称它现已通过或仍未立案。材料所记剔除生成文件后的 typecheck 失败按工人报告接受，不重跑以质疑它（`GATE/pepgent-18.md:55`）。MUX/SOR issue CLOSED 不替代 main 合入证据，本轮不据此宣告 07b 上游齐备（同材料 `:56`）。上述运行时点不改变“同域复用无需新增表决、上游授权不能由叠加绕过”的分类。

**能推进的部分不是可伪称完整交付的部分。** 四条命令改变草稿/pending 时均须 catalog 通知，不能说 save 不依赖通知而省略它合入；但现有 schema 消费、权限接线、无 pending/未绑定草稿的保存核心等不依赖争议状态结论的代码，可按 A 已确认的既有契约继续写，不能以等待事件模块为由把整席冻结，也不以未接通通知的局部代码宣告整命令完成（`DEC/D10-repo-delivery.md:20`；`DEC/D12-lab-wire.md:511-512,557`）。

## 四、空白 1 与 2：有限放行，不越权解释 A

### 4.1 prompt 正文

- `DEC/D7-lab-backend.md:66` 与 `DEC/D8-mvp-scope.md:333` 已要求草稿作为 prompt 上下文；`DEC/D12-lab-wire.md:184-203` 给出 DraftCanvas。单次业务数据的渲染不因消费者是 LLM 就自动成为一份新的 agent/rule/skill。文件留在 `server/lab/**`，没有路径或阶段上的新增授权需求。
- **B 放行的仅是既定内容的私有呈现**，不替 A 确认何谓“全文”、是否必须带 draft.id、某种模板是否漏语义。A 认定内容要求已明确、无新增公开承诺后，W-09 自选渲染，不需要管理层替其规定 JSON 或 Markdown。
- 若反过来要求新的固定 prompt 协议、要求 agent 按模板解释/回报 id，或修改 soroi/Lab 项目级 agent/skill/rule，则须 P0；“定制 agent/skill/rule 内容”明确在 D10-08 之列，不因不改 TypeScript wire 而免票（`DEC/D10-repo-delivery.md:20`）。角色/技能/规则文件也不能因 W-09 有业务命令权限就自动取得写权（`SOR/.omp/skills/tern-worker/SKILL.md:59`）。
- 在该处暂停依赖尚未确定的正文规则是合法的，但不冻结不消费该规则的保存/读取等实现；若 A 已确认私有呈现，则这一个暂停理由即解除，不等另开格式票。

### 4.2 principal

- 现条文明确“人类消息 principal 与 HumanHandback.by 取 session.user.id”“principal 是当前用户”（`DEC/D7-lab-backend.md:63,69`）；`HumanIrcQueueWire.principal` 为 UserId（`DEC/D12-lab-wire.md:181`）。源码也区分 member 与 user：`WT11b/.../operations.ts:23-46`；既有投递正文直接带该 principal：`sessions.ts:295-301`。
- **处置 a 无组织或路径空白**：授权仍按 D12 的 approval 权限，身份来源仍取实际调用者 UserId；不因此给审批者增授 discussion.prompt 或其他命令权限（`DEC/D12-lab-wire.md:505,511-512`）。A 负责判断这些人类消息条文是否覆盖本启动 prompt；B 不以 D24 的类比替 A 下意图结论。
- 材料处置 b 改写消息实际来源，或 c 另建具有新来源语义的投递路径，若要采用须先 P0 产品/契约四席表决；不能仅凭 MemberId 可映射 UserId 就擅自切换身份。D24 自身也明确将授权归属与实际发起人来源分开（`DEC/D24-derive-principal.md:13,19`）。
- 差异不涉及的免审批 start 与本人的审批路径不因“他人批准的来源未决”一并停工；仍须满足第〇项实际代码依赖和其他未决契约，不能把本项 B 通过当成整个 start/approve 已解阻。

以上源码简称均相对 `apps/web/src/server/lab/`。

## 五、空白 3 与 4：草稿/启动意图生命周期合表

### 5.1 discard 的已有承载与新选择分开

**既定命令不是新增功能。** D8:333 的“草稿与启动”列出三个命令，但没有写“穷尽且排除 D12 补充”；D12 是已通过的完整命令联合，明确规定 discard、结果与权限（`DEC/D12-lab-wire.md:42,419,471,511`），D10-11(a) 明确 draft 表与 DraftCanvas 归 LAB-11b（`DEC/D10-repo-delivery.md:23`）。因此把该已批准的草稿命令放回原草稿 owner，不增加席位或功能，不更改路径矩阵，可机械承载；不能仅因旧索引没列名字就再造“谁负责草稿”的票。秘书对应说明只是索引佐证，不是本次授权来源。

**承载不等于状态方案获授权。** D7-06 只给出 sent 在 run_started 后绑定/删除的锚点，D12 的 discard 形状与 write 权限没有决定它是否同时撤回启动意图、是否删除运行来源草稿或仅隐藏（`DEC/D7-lab-backend.md:66`；`DEC/D12-lab-wire.md:155,265,419,511`）。这些会改变可供 GUI/agent 消费的事实和意图结束时机，落入 D10-08“状态权威与生命周期”，必须 P0；不在 B 中选“拒绝”“取消”或新字段。`WT11b/.../schema.ts:96-116` 的 pending/draft 外键与 `experiments.ts:37-48` 的绑定删除代码进一步说明这些记录实际相连，但外键不是决定产品生命周期的授权者。

若另提“discard 改派另一切片/席位”或正式改变已通过的范围、依赖、完成判据，须为该真实变化另列组织分配行；**机械补列已批准命令的索引**与**改变范围**不是一回事。没有证据证明前者改变承诺时，不把所有文档补列都升级成投票。

### 5.2 save 的版本形状与状态语义分开

- 现有 `draft.save{draft,canvas}`、返回 savedVersion、DraftWire.savedVersion 可按现形状消费，不新增 base version、CAS、锁或恢复机制（`DEC/D12-lab-wire.md:154,418,470`）。B 不借“单调修订号”自行制定对外未承诺的精确计数算法；其是否已由现契约充分确定由 A 判断，内部计数写法留给工人。
- **保存与投递哪版是正常用户主路径的生命周期选择，不是可以靠字段缺省替代的私有算法。** pending 只指向 draft，不含版本（`DEC/D7-lab-backend.md:130-133`；`DEC/D12-lab-wire.md:155`）；现形状不表示已经选定“审批永远取最新”，也不表示允许任意阶段编辑。对 awaiting/sent/已绑定下的行为及审批版本的确定，需 P0，不由 B 写一个默认矩阵。
- 若选择 start 时快照，新增持久化或 wire 字段直接属于 D10-08 的必投类别；不允许以“只是内部 schema.ts、在白名单内”免票。已绑定来源草稿是否只读/可改同样是公开事实的含义，交 A 审其意图并在生命周期行表决（`DEC/D12-lab-wire.md:265`）。
- 无 pending、未绑定草稿的既定保存实现不必等整张状态表；不得为单独交付它新增公开“只支持某状态”的临时 ADT、删掉其余命令或把本切片提前标完整（`DEC/D10-repo-delivery.md:20`；`SOR/AGENTS.md:122,125,127`）。

### 5.3 合表与逐行投票边界

**建议将第三、四项需要新增确定的部分放进同一个 P0 议案，逐行而非整包表决**，因为它们共同定义 draft/pending_launch 的同一生命周期，分别选方案会出现“save 规定冻结到撤回、discard 却没有该撤回语义”的主路径互相依赖；此处只是说明合表理由，不选定任何冻结或撤回方案。

| 表内事项 | 纳入方式与参投类别 |
| --- | --- |
| discard 是否同时终结 pending、sent 后的可用行为、运行来源草稿如何保留 | 作为明确的生命周期决策行；产品/契约四席，具体内容先由 A 守意图边界，B 不代拟状态值。 |
| save 在 awaiting/sent/已绑定状态的行为、approve 投递哪个版本 | 与 discard 放在同表，用独立行写明依赖和取舍；产品/契约四席；不得用一票批准整张含糊矩阵。 |
| 若选择版本快照等需要持久化/wire 改动 | 在同表明确字段与完整生产/消费方回写范围；是产品/契约行，不能藏在实现备注。 |
| 空白 1 或 2 经 A 确认也须补公开契约 | 可并入同一 LAB-11b P0 表的独立行以减少轮次；不与生命周期行捆绑成一票，不让其余已获双闸门通过的机械实现一起等待。 |
| 第〇项正式改变切片依赖，或第三项确实改派 owner/范围/完成判据 | 如真正提出，单独标组织/派工行，五席含治理席表决；无此变更就不造该行。 |
| 上游 routeTree.gen.ts 授权 | **不并入本次草稿生命周期的通过包。** 沿既有上游白名单事项独立处理；可同批进入议会，但不能靠本表通过宣告上游文件也获授权，反之也不把它设为所有不受影响代码的停工条件。 |

依据：`SOR/AGENTS.md:9,22-27,60`；`DEC/D10-repo-delivery.md:20`；`GATE/pepgent-17-gate-b.md:9,63,91`。四席行至少三席赞成，五席行至少四席赞成，均须有效反例消除且无有效专责否决；若同一不可拆分的决策行同时涉及契约与真实派工变更，按五席行处理，不能借产品四席表决替代治理席。合表不是创造新票权或追溯重投历史原票。

## 六、范围外登记与执行边界

- 材料列出的 revision_conflict、同事务写 pending/queue、错误映射等只是工人实现说法，**本报告不为其新增或变更公开失败语义背书**，也不为它们起草异常、竞态或恢复设计（`GATE/pepgent-18.md:249`；`SOR/.claude/rules/design-assumes-it-works.md:1-7`）。
- LAB-10 草稿引用已有 D10-11(a)/D12-07 归属；本次不重新划工、不改 LAB-10 交付、不凭 operations.ts 已有同名函数宣布该接缝完成（`DEC/D10-repo-delivery.md:23`；`DEC/D12-lab-wire.md:39`；`GATE/pepgent-18.md:251`）。
- D12 v3 回写、切片旧行号漂移、WEB-04 的交互影响仅维持材料登记，不转化成额外开工审批、索引修订票或本次实现任务（`GATE/pepgent-18.md:250,252-253`）。后续 lifecycle 若通过，相关生产者/消费者与契约正文须按实际受影响范围一并对齐，不能把回写未完成当成所有无关工程的停工令。
- 本轮只新增本文件，不联系工人、不在 GitHub 发言、不提交，不启用定时唤醒或巡检；没有读取 git、历史 session 或 GitHub issue/PR 历史，没有运行 build、typecheck、测试、探针或 hash 验证。
- 后续由主会话/新治理承接者整合 A/B 对同一处置的结论：免票项完成双闸门后按现行议题/文件流程记录，由 Pepgent 片区经理实际送达；须投票项按 P0 进入现行议会程序。本报告不是正式选票，也不自行发起投票或用 IRC 收票（U103/U105/U107 `SOR/LEDGER.md:116,118`；`SOR/AGENTS.md:60,80-81`）。
