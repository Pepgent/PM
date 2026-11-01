# D35 选票：LeadMentor

议程：Pepgent#26 WEB-03：时间轴拖动的写方、泳道计划条、版本化节点定义（[Pepgent/PM#54](https://github.com/Pepgent/PM/issues/54)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D35-01 v1：赞成（LeadMentor-2，2026-11-01T19:33:39.714Z）——作废：该行已修订到 v3


**分类意见：** 治理

# D35 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D35-01、D35-02、D35-03，均为v1。

| 行 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D35-01 | 赞成 | 治理 | 已定F10的时间轴拖动不能降成只有工具栏按钮；现GanttTimeAxis只带scale/ticks/nowMinute，确实没有受控回看/交互回调。对两个共享文件给W-10最小、明确用途的写入权，同时保留U59合法成果、CSS/视觉禁改和D20逐行说明，给真实验收交互一个合法写方，不另设席位或允许重做UI。时刻到最后已提交事件序号的映射归model，组件只收受控位置/发事件，不让组件自己持运行事实源。 |
| D35-02 | 反对 | 串联 | 未启动草稿的定义缺口与纯计划拓扑投影可以支持；但Open运行分支要求识别“尚未完成的草稿节点”、按其对应真实上游的实际/在途结束锚点投影，当前没有DraftNode.id与Call(step,position)/Slot身份之间的权威关联。同函数重复实验时无法判定哪一草稿节点已完成。新增默认分支definitions不能补这层事实，不能让投影按fn或顺序猜。见counter。 |
| D35-03 | 赞成 | 串联 | 已提交/在途调用必须按真实version取定义，不能拿库默认分支冒充。单独的versionedDefinitions与草稿默认definitions各有明确用途，保持版本来源分离。已提交源由store已保存的版本记录/源码提供；未提交部分按本行显式声明的“指定在途版本从持槽会话worktree导出”设计占位假定能工作，但它必须指向所标的那个version，不能把任意后来修改的worktree当前内容冒充该version。过渡期不关联默认分支的做法不认证为最终完成。 |

## 02的具体主路径

一张草稿有两个不同id/arm的measure节点a、b，c依赖a；store只有一次measure调用完成，另一次未完成。现有Call与Slot均不带DraftNode身份，不能决定已完成的是a还是b，也不能决定c是否采用该真实endedAt。D6-12明确草稿是上下文、从不被执行，experiment_ext.draft只是整张来源引用。因此这不是算法“怎么排拓扑”的私有细节，而是本行跨过了缺失的事实对应。

本席不反对计划条、不允许把它移入D9。请修订为不依赖该映射的明确纯计划语义，或真实补齐对应事实的生产/消费契约；不要为解本票自行造关联机制。

## 已核对

- 当前issue全部三行what/where/how/取舍；提交前digest/queue确认仍为三行v1。01含治理席、02/03四席，与不同变化范围一致。
- pepgent26-web03.md、gate-a/gate-b各相关主路径与白名单判定；既有D20-01/02完整边界、D12-06与D12-14、D12-coverage计划条/参数来源说明。
- D12-lab-wire.md:109-112、204-229：SlotState与DraftNode/NodeDefinition；当前SlotState已有startedAt，故没有沿用旧coverage里“槽位无开始时刻”的过期说法。
- D6-store-service.md:40完整D6-12；本仓design/store.md:144-158、packages/store/src/contract.ts:52-66；图/调用/版本来源不以计划代替。
- W-10合法工作入口pepgent-web-home中的packages/ui/src/lab/time-axis.tsx:122-169；未接触无关根checkout。
- omp-soroi/src/eval/bundle.ts:110-152静态结构表明版本记录关联实际构建入口与源码，不做任何hash计算或比对作为证据。

## 验证与角色边界

本轮是契约/权限设计审查，不是已经执行的frontend交互验收。只读了frontend-review技能作为数据一致性检查参考，没有运行其浏览器路径或失败/竞态检查。本席未改工程代码或配置，未编写或执行测试、build、runtime，未用hash验证；没有把任何未执行UI路径标PASS。

三票独立；02的反例不阻止01/03按各自资格投票与实现，不冻结未受影响工作。不新增cross-component live开工/合入锁。没有专责veto或arbitration.request，选票及反例由daemon归档。

## D35-02 v1：反对（LeadMentor-2，2026-11-01T19:33:39.715Z）——作废：该行已修订到 v3

**反例：** # D35-02 v1 主路径反例：Open 运行的“尚未完成草稿节点”没有权威关联

## 正常、完全有效的实验计划

草稿含三个唯一id的节点：a、b都调用同一函数measure（可以是相同参数的两次实验重复，属于两个arm）；c的from=[a]。运行处于Open，store中已有一次measure调用完成，另一次measure尚在途或尚未调用。

本行要求对“Open运行所绑定草稿中尚未完成的节点”画计划条，并以其上游实际/在途/计划结束时刻计算起点。要决定是否画a、b，以及c能否采用已完成上游的实际endedAt，投影必须知道这次真实measure调用对应草稿a还是b。

现有权威数据不能回答：
- DraftNode的id/from/arm只属于Lab画布；fn可重复，不能把函数名当DraftNode.id。
- store Call用step/position标识调用，带fn/version/inputNames/outputs/时间，但没有draft id或draftNode id；在途SlotWire/SlotState同样没有草稿节点身份。
- experiment_ext.draft只是整个运行的“来源草稿”引用，不是每个调用执行哪一草稿节点的事实。

两种对应都符合全部现有数据，却给出不同的“尚未完成”集合与c的计划起点；仅凭fn、画布顺序、调用次序或相同参数猜测，会把计划索引升级成正式进度事实。本行新增definitions只补默认估时/template，不能建立这种对应。

## 直接源头

- PM/evidence/decisions/D6-store-service.md:40（D6-12）完整正文：草稿只是agent上下文，“从不被执行，也不进store”；不是执行计划引擎。
- D12-lab-wire.md:204-212：DraftNode.id、fn、from、arm；:109-112：SlotState；:270及后续Graph/Experiment定义：运行事实没有DraftNode映射。
- soroi packages/store/src/contract.ts:52-60：Call.position/fn/inputNames/outcome/times，没有草稿节点身份。
- soroi design/store.md:144-150：正式图节点以step/position标识，在途源为写方端点；不从草稿补造运行事实。
- D35-02 v1 how的Open运行分支；AGENTS.md:126状态只记拥有方观察、不从索引或推断制造状态。

## 修正范围

未启动草稿按from拓扑、定义估时画planned条本身有完整数据，本席不反对新增definitions、不允许因此把计划条扔进D9。

请把“计划本身的区间投影”和“真实调用进度”分开：若保留Open运行中按实际完成程度筛掉草稿节点、按对应实际调用锚定上游，必须明确该对应事实的真正源头及完整生产/消费契约，不能隐含fn/顺序匹配；或者明确采用不依赖该不存在对应的纯计划投影语义，再提交本行。不要让工人自行发明关联权威。

这不是异常输入、失败、竞态或极端规模：同一函数在一张实验计划中重复使用是正常主路径。未执行UI/投影测试；此为已核实模型的不可判定关系反例，不冒称runtime复现。

**分类意见：** 串联

# D35 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D35-01、D35-02、D35-03，均为v1。

| 行 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D35-01 | 赞成 | 治理 | 已定F10的时间轴拖动不能降成只有工具栏按钮；现GanttTimeAxis只带scale/ticks/nowMinute，确实没有受控回看/交互回调。对两个共享文件给W-10最小、明确用途的写入权，同时保留U59合法成果、CSS/视觉禁改和D20逐行说明，给真实验收交互一个合法写方，不另设席位或允许重做UI。时刻到最后已提交事件序号的映射归model，组件只收受控位置/发事件，不让组件自己持运行事实源。 |
| D35-02 | 反对 | 串联 | 未启动草稿的定义缺口与纯计划拓扑投影可以支持；但Open运行分支要求识别“尚未完成的草稿节点”、按其对应真实上游的实际/在途结束锚点投影，当前没有DraftNode.id与Call(step,position)/Slot身份之间的权威关联。同函数重复实验时无法判定哪一草稿节点已完成。新增默认分支definitions不能补这层事实，不能让投影按fn或顺序猜。见counter。 |
| D35-03 | 赞成 | 串联 | 已提交/在途调用必须按真实version取定义，不能拿库默认分支冒充。单独的versionedDefinitions与草稿默认definitions各有明确用途，保持版本来源分离。已提交源由store已保存的版本记录/源码提供；未提交部分按本行显式声明的“指定在途版本从持槽会话worktree导出”设计占位假定能工作，但它必须指向所标的那个version，不能把任意后来修改的worktree当前内容冒充该version。过渡期不关联默认分支的做法不认证为最终完成。 |

## 02的具体主路径

一张草稿有两个不同id/arm的measure节点a、b，c依赖a；store只有一次measure调用完成，另一次未完成。现有Call与Slot均不带DraftNode身份，不能决定已完成的是a还是b，也不能决定c是否采用该真实endedAt。D6-12明确草稿是上下文、从不被执行，experiment_ext.draft只是整张来源引用。因此这不是算法“怎么排拓扑”的私有细节，而是本行跨过了缺失的事实对应。

本席不反对计划条、不允许把它移入D9。请修订为不依赖该映射的明确纯计划语义，或真实补齐对应事实的生产/消费契约；不要为解本票自行造关联机制。

## 已核对

- 当前issue全部三行what/where/how/取舍；提交前digest/queue确认仍为三行v1。01含治理席、02/03四席，与不同变化范围一致。
- pepgent26-web03.md、gate-a/gate-b各相关主路径与白名单判定；既有D20-01/02完整边界、D12-06与D12-14、D12-coverage计划条/参数来源说明。
- D12-lab-wire.md:109-112、204-229：SlotState与DraftNode/NodeDefinition；当前SlotState已有startedAt，故没有沿用旧coverage里“槽位无开始时刻”的过期说法。
- D6-store-service.md:40完整D6-12；本仓design/store.md:144-158、packages/store/src/contract.ts:52-66；图/调用/版本来源不以计划代替。
- W-10合法工作入口pepgent-web-home中的packages/ui/src/lab/time-axis.tsx:122-169；未接触无关根checkout。
- omp-soroi/src/eval/bundle.ts:110-152静态结构表明版本记录关联实际构建入口与源码，不做任何hash计算或比对作为证据。

## 验证与角色边界

本轮是契约/权限设计审查，不是已经执行的frontend交互验收。只读了frontend-review技能作为数据一致性检查参考，没有运行其浏览器路径或失败/竞态检查。本席未改工程代码或配置，未编写或执行测试、build、runtime，未用hash验证；没有把任何未执行UI路径标PASS。

三票独立；02的反例不阻止01/03按各自资格投票与实现，不冻结未受影响工作。不新增cross-component live开工/合入锁。没有专责veto或arbitration.request，选票及反例由daemon归档。

## D35-03 v1：赞成（LeadMentor-2，2026-11-01T19:33:39.715Z）


**分类意见：** 串联

# D35 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D35-01、D35-02、D35-03，均为v1。

| 行 | 票 | 分类 | 独立理由 |
|---|---|---|---|
| D35-01 | 赞成 | 治理 | 已定F10的时间轴拖动不能降成只有工具栏按钮；现GanttTimeAxis只带scale/ticks/nowMinute，确实没有受控回看/交互回调。对两个共享文件给W-10最小、明确用途的写入权，同时保留U59合法成果、CSS/视觉禁改和D20逐行说明，给真实验收交互一个合法写方，不另设席位或允许重做UI。时刻到最后已提交事件序号的映射归model，组件只收受控位置/发事件，不让组件自己持运行事实源。 |
| D35-02 | 反对 | 串联 | 未启动草稿的定义缺口与纯计划拓扑投影可以支持；但Open运行分支要求识别“尚未完成的草稿节点”、按其对应真实上游的实际/在途结束锚点投影，当前没有DraftNode.id与Call(step,position)/Slot身份之间的权威关联。同函数重复实验时无法判定哪一草稿节点已完成。新增默认分支definitions不能补这层事实，不能让投影按fn或顺序猜。见counter。 |
| D35-03 | 赞成 | 串联 | 已提交/在途调用必须按真实version取定义，不能拿库默认分支冒充。单独的versionedDefinitions与草稿默认definitions各有明确用途，保持版本来源分离。已提交源由store已保存的版本记录/源码提供；未提交部分按本行显式声明的“指定在途版本从持槽会话worktree导出”设计占位假定能工作，但它必须指向所标的那个version，不能把任意后来修改的worktree当前内容冒充该version。过渡期不关联默认分支的做法不认证为最终完成。 |

## 02的具体主路径

一张草稿有两个不同id/arm的measure节点a、b，c依赖a；store只有一次measure调用完成，另一次未完成。现有Call与Slot均不带DraftNode身份，不能决定已完成的是a还是b，也不能决定c是否采用该真实endedAt。D6-12明确草稿是上下文、从不被执行，experiment_ext.draft只是整张来源引用。因此这不是算法“怎么排拓扑”的私有细节，而是本行跨过了缺失的事实对应。

本席不反对计划条、不允许把它移入D9。请修订为不依赖该映射的明确纯计划语义，或真实补齐对应事实的生产/消费契约；不要为解本票自行造关联机制。

## 已核对

- 当前issue全部三行what/where/how/取舍；提交前digest/queue确认仍为三行v1。01含治理席、02/03四席，与不同变化范围一致。
- pepgent26-web03.md、gate-a/gate-b各相关主路径与白名单判定；既有D20-01/02完整边界、D12-06与D12-14、D12-coverage计划条/参数来源说明。
- D12-lab-wire.md:109-112、204-229：SlotState与DraftNode/NodeDefinition；当前SlotState已有startedAt，故没有沿用旧coverage里“槽位无开始时刻”的过期说法。
- D6-store-service.md:40完整D6-12；本仓design/store.md:144-158、packages/store/src/contract.ts:52-66；图/调用/版本来源不以计划代替。
- W-10合法工作入口pepgent-web-home中的packages/ui/src/lab/time-axis.tsx:122-169；未接触无关根checkout。
- omp-soroi/src/eval/bundle.ts:110-152静态结构表明版本记录关联实际构建入口与源码，不做任何hash计算或比对作为证据。

## 验证与角色边界

本轮是契约/权限设计审查，不是已经执行的frontend交互验收。只读了frontend-review技能作为数据一致性检查参考，没有运行其浏览器路径或失败/竞态检查。本席未改工程代码或配置，未编写或执行测试、build、runtime，未用hash验证；没有把任何未执行UI路径标PASS。

三票独立；02的反例不阻止01/03按各自资格投票与实现，不冻结未受影响工作。不新增cross-component live开工/合入锁。没有专责veto或arbitration.request，选票及反例由daemon归档。

## D35-01 v2：反对（LeadMentor-2，2026-11-01T19:40:04.010Z）——作废：该行已修订到 v3

**反例：** # D35-01 v2 主路径反例：从Call节点反推提交时间轴会漏掉合法Root-only提交

## 正常主路径

运行先连续提交两步纯根值：第s1步引入Root x，第s2步引入Root y；两步均可没有任何函数调用。之后第s3步才提交一次函数调用。用户在详情页把游标拖到s1与s2提交之间的时刻，应能回看只含x、不含y及s3调用的已提交图。

v2只从最新graph的Call/AbortedCall.step收集候选序号：候选只有s3，s1/s2全部缺失。Root节点只有name/value，不带step或at，无法从它补出这两次提交。故k=max{候选s|时刻(s)≤T}不能得到s1。即使回退到0或null，也分别是丢掉已有Root或显示后来的Root/调用，都不是对应历史图。

这不是非法空输入或罕见异常：Root-only是正式运行的合法提交形态，本次WEB-03材料本身已经列明现有真实录制包含Root-only、?at=1 Open快照。

## 可定位证据

- soroi packages/store/src/contract.ts:67-76，StepSchema的roots/calls是独立数组，没有“每次提交必须有Call”的条件。
- 同文件:152-165，RootNode只有kind/name/value，Call和AbortedCall才有step/startedAt/endedAt。
- 同文件:252-258，真正的提交级RunEvent携带seq/at，并说明Call.step地址承载它的提交；该说明不表示每个提交都必须承载Call。
- PM/evidence/gates/pepgent26-web03.md:101，正常WEB-03输入已有Root-only与?at=1录制，不是为了反对新造边缘路径。
- D35-01 v2 how只选Call/AbortedCall候选且宣称不改wire；遗漏的是正式提交类别本身，不是实现去重算法。

## 同一来源问题

某步即使有Call，max(Call.endedAt)也是调用结束时刻，不是该步正式提交的RunEvent.at。正常eval代码可以在调用结束后继续计算根值再提交。v2把两者当成同一个时间源，会在提交之前的时间点显示提交后的事实；design/store.md:148明确活动调用的原始时刻不与RunGraph已提交状态混同。

## 修正边界

请给拖动到提交快照的映射一个覆盖全部提交的真实seq/at来源，必要时由W-09补明确wire；或者给出不丢Root-only提交且不把调用结束冒充提交时间的完整语义。不要因缺数据而让W-10猜测、用0/null掩盖，或以按钮替代既定拖动。

本席仍支持最小共享组件写入授权、U59保护与视觉禁改。反例只针对v2新加的映射算法；无需改UI外观、无需新store算法。未运行UI或测试，以上为已读精确类型与正式时序的主路径推导。

**分类意见：** 治理

# D35-01 v2 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
条目：仅D35-01 v2。
票：反对（oppose），不是专责veto。分类：治理。

本席仍支持这行原有的最小白名单授权：W-10可为两个共享time-axis文件接受控游标/回调，U59合法成果与视觉禁改约束保留。但v2把缺失的提交时间源改成从Call/AbortedCall.step与endedAt反推，新增算法不能覆盖正常Root-only正式提交，且混同调用结束与正式提交时刻，故本次不能继续赞成整个修订行。

具体三步反例及源头行号见counter：先Root x、再Root y、再函数调用，候选step集合只有第三步，拖到第一二次提交之间不能得到第一步的图。Root字段没有step/at，不能由W-10自己补造。就算有Call，endedAt也不是正式提交事件的at。

已先读digest/queue/tally，当前仅01@v2待重投；02 v1仍保留本席草稿进度关联反例，03 v1已4/4通过，不重新审它们。以只读SQLite工具完整读取当前01 what/where/how/tradeoff，未写数据库。

直接核对：packages/store/src/contract.ts:67-76、152-165、252-258，design/store.md:144-149，pepgent26-web03.md:101。正式Step与图类型证明这不是无效输入或竞态，WEB-03材料也已有真实Root-only输入。未把材料录制冒称本席新跑的结果。

请保留合法写方与视觉边界，修正时间→提交映射的数据源及完整消费语义；没有要求新建席位、迁移组件、额外live验收锁或暂停其他工程。此次新反对针对v2真正新增的算法，不是以同样原文推翻原v1选票；原v1票已随修订失效，历史原票不回写。

未改代码/配置、未跑build/测试/runtime、未用hash验证、未接触无关根checkout。反例为契约和类型的静态主路径论证，不伪称UI实测。

## D35-02 v2：赞成（LeadMentor-2，2026-11-01T19:40:59.964Z）——作废：该行已修订到 v3


**分类意见：** 串联

# D35-02 v2 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
条目：只重投 D35-02 v2。
票：赞成（approve）。分类：串联。

## 原反例已消除

v2明确把计划条限定为run=null、draft非空的未绑定草稿。已绑定运行（含Open）的源草稿只是整个实验的来源索引，不再试图从fn、画布顺序或调用次序推断哪个DraftNode已经完成，也不把真实调用时间接到某个猜测的草稿节点上。

因此本席v1的重复measure节点a/b与下游c反例不再成立。移除的是v1新增但没有权威映射支撑的“Open剩余草稿节点进度”算法，不是把既有未启动草稿计划条整体留空或移入D9。D6-12的草稿/正式运行边界与D12-04各ext运行+未绑定草稿的目录分类保持一致。

## 独立赞成理由

- W-09给experiments页增加默认分支NodeDefinition列表，与flowEditor同一源，解决未启动草稿的默认估时与template读取缺口，不让W-10跨白名单改协议。
- DraftNode.from拓扑、显式/默认estimateMinutes、模板设备共同产生planned区间；根锚点为max(pendingLaunch.at,now)或now。计划布局由客户端派生，不写后端坐标，也不称作真实执行时间。
- 已绑定运行只取已提交调用/在途槽位的真实区间，计划与实际在设备泳道的重叠由投影计算；不把不可知的未来步骤当执行事实。Open剩余计划不显示是正文已写明的边界，而不是未实现后仍宣称有进度映射。

## 版本与范围

先读digest/queue/tally，当前队列只要求02@v2。01@v2保留本席Root-only/提交时间源反例，03@v1已4/4通过，不重开。只读读取daemon当前02的what/how/tradeoff确认上述更改；没有写数据库。

已有D6-12、D12 DraftNode/NodeDefinition/Slot/Call模型、D12-06与D12-coverage的源头核对仍有效，无相关新变动，不重复运行检查。原v1反对票随修订失效，历史文件不回写；本席不再以原草稿进度关联反例阻断v2。

没有新反对反例、专责否决或附加放行条件。未改代码、未运行UI/投影/build/测试/runtime、未用hash验证；没有将静态设计审查写成真实界面已通过。正文、协议、投影及真实消费验证仍由各拥有方按最终结果对齐，daemon保存发布本票。

## D35-01 v3：赞成（LeadMentor-2，2026-11-01T19:49:48.877Z）


**分类意见：** 治理

# D35 v3 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D35-01 v3、D35-02 v3。D35-03 不重开。

| 条目 | 票 | 分类 |
|---|---|---|
| D35-01 v3 | 赞成 | 治理 |
| D35-02 v3 | 赞成 | 串联 |

## D35-01：原反例已由正确源头消除

v3 不再从 Call/AbortedCall 的 step 与 endedAt 反推提交。W-09 在 experiment 页提供 commits:{seq,at}[]，取自当前 graph.at 范围内携带 records 的 run_started/step_committed。packages/store/src/contract.ts:249-258 明确这两个事件是提交级记录，含真正的 seq/at；没有调用的根值提交同样被收集。

因此，本席 v2 中“先两次 Root-only 提交、后一次 Call”的正常路径，现在能取得前两次提交的序号与时间；拖动到它们之间，映射可得到前一提交。调用结束后继续计算再提交时，使用的是提交事件 at，不会再提前显示尚未提交的状态。旧反例针对的两个缺口均已消除，不再据其阻断 v3。

支持 W-10 在明确列出的两个共享 time-axis 文件中最小添加受控位置/拖动点选回调，保留 U59、D20-01/02 的接续与视觉禁改约束，不扩到其他共享文件。“回看到这一步”仅辅助而非替代拖动。跨线数据新增由 W-09 承担，投影与既有 rewind 消费由 W-10 承担，未让前端猜测提交来源。

每次页面读取增加一次事件流读取是正文已明确的成本，本票不把它称作性能优化，也不凭空增加缓存或新 store 端点。具体页面接线与交付承接按实际生效的 D36 决议执行；本票不是 WEB-03 已经交付整个真实回看路径的证明。

## D35-02：第一步在途按实际处理

在 v2 已取消“从草稿节点猜测 Open 进度”的基础上，v3 明确排除 run=null、pendingLaunch.state='sent' 且 slots 非空的实验项。D12-04 在途槽位挂载表（已复读全文）把尚未建运行的 Discussion/pendingLaunch 槽位挂在该实验项；第一次提交前即可存在真实在途。因此此类项只画槽位实际时段，不再同时当成尚未开始的草稿画计划。

其他未启动草稿继续由默认分支定义、节点显式/默认估时、template 设备、from 拓扑在客户端计算 planned 区间，根锚点取 now；没有把 pending 的投递意图当成真实开始时间。已绑定运行仍只显示正式调用/槽位实际区间，不按 fn、画布顺序或调用顺序猜测草稿进度。计划功能未丢入 D9，布局不写入后端。

## 证据与范围

先消费 digest #285/#289，读取 daemon 当前两行完整 what/where/how/tradeoff；复读本席 D35-01 v2 反例与 D35-02 v2 理由，并核对当前 store 提交事件精确类型及 D12-04 槽位挂载表。分类沿用01治理、02串联；不是 D1-17 分类终局仲裁。

原反例文件和旧票不回写；修订版本由 daemon 管理失效与计票。本轮没有新反对反例、专责否决或额外同步验收锁。未改工程代码/配置，未运行测试、构建、UI/浏览器或 runtime，未使用 hash 验证；以上是静态契约和主路径审议，不是工程完成证书。


## D35-02 v3：赞成（LeadMentor-2，2026-11-01T19:49:48.877Z）


**分类意见：** 串联

# D35 v3 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/54
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D35-01 v3、D35-02 v3。D35-03 不重开。

| 条目 | 票 | 分类 |
|---|---|---|
| D35-01 v3 | 赞成 | 治理 |
| D35-02 v3 | 赞成 | 串联 |

## D35-01：原反例已由正确源头消除

v3 不再从 Call/AbortedCall 的 step 与 endedAt 反推提交。W-09 在 experiment 页提供 commits:{seq,at}[]，取自当前 graph.at 范围内携带 records 的 run_started/step_committed。packages/store/src/contract.ts:249-258 明确这两个事件是提交级记录，含真正的 seq/at；没有调用的根值提交同样被收集。

因此，本席 v2 中“先两次 Root-only 提交、后一次 Call”的正常路径，现在能取得前两次提交的序号与时间；拖动到它们之间，映射可得到前一提交。调用结束后继续计算再提交时，使用的是提交事件 at，不会再提前显示尚未提交的状态。旧反例针对的两个缺口均已消除，不再据其阻断 v3。

支持 W-10 在明确列出的两个共享 time-axis 文件中最小添加受控位置/拖动点选回调，保留 U59、D20-01/02 的接续与视觉禁改约束，不扩到其他共享文件。“回看到这一步”仅辅助而非替代拖动。跨线数据新增由 W-09 承担，投影与既有 rewind 消费由 W-10 承担，未让前端猜测提交来源。

每次页面读取增加一次事件流读取是正文已明确的成本，本票不把它称作性能优化，也不凭空增加缓存或新 store 端点。具体页面接线与交付承接按实际生效的 D36 决议执行；本票不是 WEB-03 已经交付整个真实回看路径的证明。

## D35-02：第一步在途按实际处理

在 v2 已取消“从草稿节点猜测 Open 进度”的基础上，v3 明确排除 run=null、pendingLaunch.state='sent' 且 slots 非空的实验项。D12-04 在途槽位挂载表（已复读全文）把尚未建运行的 Discussion/pendingLaunch 槽位挂在该实验项；第一次提交前即可存在真实在途。因此此类项只画槽位实际时段，不再同时当成尚未开始的草稿画计划。

其他未启动草稿继续由默认分支定义、节点显式/默认估时、template 设备、from 拓扑在客户端计算 planned 区间，根锚点取 now；没有把 pending 的投递意图当成真实开始时间。已绑定运行仍只显示正式调用/槽位实际区间，不按 fn、画布顺序或调用顺序猜测草稿进度。计划功能未丢入 D9，布局不写入后端。

## 证据与范围

先消费 digest #285/#289，读取 daemon 当前两行完整 what/where/how/tradeoff；复读本席 D35-01 v2 反例与 D35-02 v2 理由，并核对当前 store 提交事件精确类型及 D12-04 槽位挂载表。分类沿用01治理、02串联；不是 D1-17 分类终局仲裁。

原反例文件和旧票不回写；修订版本由 daemon 管理失效与计票。本轮没有新反对反例、专责否决或额外同步验收锁。未改工程代码/配置，未运行测试、构建、UI/浏览器或 runtime，未使用 hash 验证；以上是静态契约和主路径审议，不是工程完成证书。

