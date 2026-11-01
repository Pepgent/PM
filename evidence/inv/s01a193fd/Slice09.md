# Slice09：02:22–03:25 的实现调度、契约裁决与验收边界

## 取证范围与方法

- 目标根会话：`01a193fd-e992-76d2-8c29-060fe52cc094`；元数据标题“完成 Soroi 新版最小功能集合”，cwd 为 `pepgent-soroi`，最终状态 `aborted`。元数据仅说明会话档案，不表示产品最终成败。
- 实际查询 `events.jsonl?q=[.,inputs]|length` 得到 **N=1514**。以零基半开区间 `[floor(8N/12),floor(9N/12))=[1009,1135)` 划分，第九段为一基事件 **1010–1135**，共126事件，UTC **2026-11-01 02:22:53.544–03:25:30.897**。前后各看约根事件总数3%（45事件）：**965–1181**，UTC 01:59:25.153–03:42:06.254。
- 全窗口已读取；本段出发的两条原生 subagent 链 `AuthorCUS03`、`ArgonRoles` 均追到最终回复；相关治理子链 `Governance3_844c.AlignBatchRuling` 读取到其文档落实结论。peer只使用目标根会话已经保存的来信和工具返回，不读取那些独立工程师会话。
- 外延追踪限于本段发出的任务：SOR-03 transcript后续、STO-04/10/11、CUS-04、LAB-03，追到根会话收到的终态来信；不重查现时 git/GitHub。
- **未执行 git、gh、GitHub工具、运行验证或任何外部修改。** 引用历史工具结果中出现的 gh/git，不是本次执行。仅写本报告。
- 证据标签：**(U)** 用户原话；**(A)** agent说法（包括peer自报）；**(D)** 文档原文；**(R)** 历史命令/工具实际返回。工具返回中包着peer回答时，证明“收到该回答”是R，回答所称产品状态仍是A。
- 全部时间以下统一UTC。子agent timeline显示+09:00，已换算。

## 用户要求与当时可确认的操作规范

1. **全流程而非只交设计或测试框架。** 根 `#8544bdb8`，2026-10-31 22:18:38 (U)：“这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”。`#742b8876`，23:04:05 (U)：“完整的omp定制……走通我说的所有流程……作为pepgent的agent核心……知道pepgent和soroi之间缺失的点，线，面”。
2. **意图与技术分工。** 根 `#57d9d58b`，22:14:14 (U)：argon维持原始设计意图并裁决本意，主agent做代码和设计取舍；历史session只许subagent调查。`#75447a98`，22:30:54 (U)：设计和重要决策只允许leader/分身/task:high/argon/导师参与。`#fccb1a91`，22:32:32 (U)：正常民主投票，逐决策项表格投票，每项写what/where/how/取舍。
3. **事务与状态不应灌进leader主会话。** 当时文档快照可直接确认：`AuthorCUS03/entry/abf99a06`，02:24:43 (R，内含D) 返回的 `AGENTS.md` 第9、13–16、28、32、40–43行，与当前文件一致：逐项、按三模型族计票；关键证据入PM；leader“只处理需要决策的事项和秘书、哨兵上报，不把所有进度消息集中到主会话”；事务委托秘书。
4. **用户授权自行解决、不来问用户，但不是授权取消治理规则。** `#184dc2fc`，22:23:05 (U)：“你不要来问我任何问题……自行和ai们商量解决”。

> 后来的05:24–05:28用户批评不作为本段行为的预先约束；本报告不倒推本段当时“必须知道”用户后来才说的话。

## 概览：本段实际在做什么

本段不是根agent直接开发产品代码，而是管理九个外部工程师的队列、接收完成/阻塞上报、裁跨组件契约、让治理分身写入PM与台账。126事件中有25条say、31条irc_in、11条irc_out、2次dispatch、34次普通call（含17次wait）。两次dispatch分别是高档作者写CUS-03规则、Argon调查Lab权限矩阵。多数根回复为把刚收到的内部状态再讲一遍。

**不是“这一小时没产出”**：可见实际CUS规则代码写入、规则注入运行结果、其合并结果；多条peer交付报告也有具体runtime读数和证据链接。**也不是“端到端已经走通”**：F07/F19/F22仍明确只有消费者代码或前置工作，A0/F01等没有live通过声明。

---

## 发现1｜CUS-03：解除不必要的实现等待，使用正确档位、实际注入验证，未发现内容验收造假

**位置与摘录**
- 根 `#8a583ab5`，02:24:09 (A)：DIST工程师报“产品rules缺席……239证据门槛使VS1等待W1”，建议正文与native注入先做，checker语义留给SOR-05。
- 根 `#a51850b7`，02:24:29，dispatch及peer_send (A/调用)：`agent: task:high, name: AuthorCUS03`；读既有设计、写五项规则、Argon审查、fresh HOME真PTY验证、独立PR。要求不等checker正文实现。
- 子 `AuthorCUS03/#e4806b27`，02:33:54 (R)：`model opencode-go deepseek-v4.1-flash`；五份规则分别 `verbatim_in_generic_rules True count_in_prompt 1`。
- 子 `AuthorCUS03/#0200e8e3`，02:36:22 (R)：历史GitHub合并调用返回 `MERGED …`、`CLOSED`，对应 [soroi PR252](https://github.com/Pepgent/soroi/pull/252) 与 [issue206](https://github.com/Pepgent/soroi/issues/206)。本次未打开链接。
- 根 `#46dd03e3`，02:37:31 (A，子交付)：五规则+package files+README；Argon全PASS；`--no-rules`也把literal提成atom，所以“行为不证明规则工作”，真正证据是系统prompt内原文。
- 根 `#bb56c3e4`，02:37:40 (A)：保留上述证据区分，明确DIST-02安装验收尚未跑。

|观察|解释|建议|
|---|---|---|
|根把已确定的规则正文从checker实现依赖中剥离，交task:high；子有真实写文件和PTY证据，Argon逐文件审查。先发现表格被renderer变形，改为列表，fresh HOME重跑；最终历史工具输出证明五规则原文进入prompt。|与用户“领导层做设计，工程实现推进”的大方向一致；规则/skill属于设计层，用high而非mid做内容符合U11。没有把模型口述“我遵守规则”当唯一验证。工作树路径、发布与清理也有明确责任人。|复用五规则与本次注入证据，不重做同样实验；发行安装消费路径另按DIST-02验。|
|子对两规则没有CheckError的事实没有编造类型；根也照实转述。|父派工“每条必须命名checker error”与真实D5不一致时，子发出说明并如实完成，无假kind或扩写checker。未发现这一点构成漏做。|保留“工具不强制”和“规则期望”的区别。|

**证据强度限定：** 这是本段少数追到了直接R结果的产品交付链。根总结中说“I ran omp”实际是子在跑，宜写“作者验证”，但不能因此否认其运行结果。

## 发现2｜SOR-03：资源结束锚点的裁决遵守权威与生命周期；随后新增测试观测接口，确有实现回报

**位置与摘录**
- 重叠前沿根 `#61bee529`，02:14:50 (A)：测试者指出store前后快照不能证明last return接受与end的顺序，强制child receipt先于end又会误拒正确实现。
- 根 `#0dbf74e1`，02:15:01 (A/调用)：让产品根transcript按顺序写 `obligation_registered / obligation_released / run_end_requested`；SOR-03合并后独立follow-up，SOR-12沿用。
- 根 `#5ecbcd05`，02:20:51 (A)：review发现transfer DELETE未确认却release；异常不代表资源一定没结束，提出资源结束continuation。
- 根 `#14492073`，02:20:57 (A/调用)：“全部内层生命周期都已由各自的权威确认结束”；transfer由store确认、workspace由本地删除成功确认；无workspace则不制造义务。
- 核心根 `#e14b8b19`，02:25:06 (A/调用)：解析成功4xx明确拒绝创建=没有内层；transport/5xx/未解析响应不确认。
- 根 `#97bf18d4`，02:31:23 (调用)：要求owner先发布固定schema与示例，测试者再写消费者，“不自行猜字段”。
- 根 `#3fe46949`，02:57:27 (A)：[SOR-03 PR249](https://github.com/Pepgent/soroi/pull/249)已合并；schema在 [issue201评论](https://github.com/Pepgent/soroi/issues/201#issuecomment-6552373589)发布；根活跃时child最后提交仍noend。
- 根 `#560b128d`，03:07:51 (A)：独立 [issue254](https://github.com/Pepgent/soroi/issues/254) 只用root真实SessionManager写条目，不让child复制或另开manager。
- 合法延伸根 `#e409a54c`，03:46:08 (A)：[PR258](https://github.com/Pepgent/soroi/pull/258)已合并；“真实root7条/child0，最后release→请求，HTTP到达前七条已在原生根文件，Store独立Ended7”。

|观察|解释|建议|
|---|---|---|
|根没有用异常类型、本地旗标或最后step提交来推断transfer/batch结束；指定各资源拥有方的确认点。|与“源头确认内层结束再结束外层”一致；从事实看，修的是run过早结束的真实review问题，而非为不存在的问题造恢复机制。未发现把4xx拒绝创建当资源已创建的错误。|保留已交付实现，最终F22还应同时消费store终态与root真实trace，不以trace条目存在单独代替实际效果。|
|为解决验收顺序不可观测，根增加产品transcript contract，先发布schema，后实现，测试者等待发布。|先等owner而不是测试方猜字段是对的。但这是新增产品观测接口，不只是“写个测试”；治理过程见发现8。|不要再加第二套accepted字段或测试私有顺序标记。|
|完成依据在允许范围内为工程师回报，不是本人打开PR/实际重跑。|可断言“根收到具体完成报告”，不能把PR链接和自报数字升级为我独立复核了代码/runtime。|需复核实现时必须取得git/GitHub授权，或只使用现有已归档原始证据。|

## 发现3｜F07负例：从可伪造substring改读真实publication；观测仪器只证明其能证明的事

**位置与摘录**
- 根 `#88750075`，02:22:43 (A)：review指出publication仅URL前缀+caller assignment substring可造假，“Do not call soroi_eval也过”。
- 根 `#f374ba26`，02:22:49 (调用)：要求library在 [issue221](https://github.com/Pepgent/soroi/issues/221) 发布 `[{kind,code,assignment}]`，assignment来自真实runner recipe/transcript，不手写；同内容入repo。
- 根 `#34ad1bef`，02:33:17 (A)：runner未传artifactsDir/eventBus，child用inMemory SessionManager，不能承诺持久transcript；继续做节点，不擅改engine/权限。
- 根 `#ada3b416`，02:38:16 (A)：原版PTY已跑，但observer extension不继承child；申请/tmp只读仪器。
- 根 `#4f6283c4`，02:38:22 (调用)：“只用于发布负例的调用与assignment文本；F07闸门本身……等SOR-11……不以当前结果冒充”。
- 根 `#9a384eff`，02:48:07 (A)：[lab-library PR4](https://github.com/Pepgent/lab-library/pull/4)合并，真实launch task JSON已 [发布](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552503070)；fresh formal两路径结果、无pins、临时副本清除；child实际Opus，非DeepSeek；“最终F07 gate……本次不称通过”。根 `#ad4c49f1` 02:48:28照实保留这些限制。
- 延伸根 `#c51fa60b`，03:25:47 (A)：[PR256](https://github.com/Pepgent/soroi/pull/256)交readonlyReader及F07/F19/F22完整consumer，fixture cases明确NONLIVE，缺A0 CLI实际fail；live仍 [issue250](https://github.com/Pepgent/soroi/issues/250)。

|观察|解释|建议|
|---|---|---|
|不可靠字符串判定被主动删除；发布内容要求来自真实执行输入。root接受临时instrumentation，但隔离原版与仪器副本证据。|这一链显示良好证据边界，不是为了“过测试”修改产品权限或伪造child transcript；不应把所有测试前置工作一律定性为作假。|复用workload、publication和consumer；等真实capture后补完整live F07，不复做publication。|
|try_eval当前ran、text_only当前failed与F07最终成功没有混为一谈，child模型也准确披露。|与runtime证据规则一致；未发现本链虚报F07通过。|最后验收直接检验“Agent体无eval”和“无交回失败”，不能只看父工具返回。|
|代码实现issue关闭，live另开，成为后续重复模式。|分离记录本身不等于用户范围已被完成，也不必然是缩减；根在本段仍明确“live未通过”。是否最终实现全流程，应按全部live闭环判断，不能用code-side Done计数替代。|汇总同时报“交付代码”和“通过流程”，最终不留有名无实际producer的验收空洞。|

## 发现4｜STO队列重分配：真正减少等待，结果不是只记了一条ownership

**位置与摘录**
- 根 `#6537f248`，02:48:12 (调用)：查D8剩余store依赖。
- 根 `#b0b0f451`，02:48:22 (A/调用)：lib已空闲，把排在sor01深队列的STO-04移给lib，再接STO-10/11；给双方发消息、治理登记，保留每切片现有issue+PR。
- 根 `#66a39551`，02:48:41 (A)：治理声称已在 [188](https://github.com/Pepgent/soroi/issues/188)、[200](https://github.com/Pepgent/soroi/issues/200)、[202](https://github.com/Pepgent/soroi/issues/202) 等贴ownership。
- 根 `#eb62f40e`，03:10:01 (A)：STO-04 [PR253](https://github.com/Pepgent/soroi/pull/253)合并，HTTP卷读写、derived读取与restart证据。
- 重叠根 `#2dfc8038`，03:35:58 (A)：STO-10 [PR257](https://github.com/Pepgent/soroi/pull/257)合并，真实9rows、dry无汇入、坏数据回滚及restart。
- 延伸根 `#cc068dd0`，04:12:20 (A)：STO-11 [PR261](https://github.com/Pepgent/soroi/pull/261)合并，HTTP usage/版本取回并实际执行；三项store队列完成。

|观察|解释|建议|
|---|---|---|
|重新利用已完成负例节点的lib工程师，不让它空等，移走sor01队列中独立store工作。|与用户并行分工意图一致，且确实有后续完成来信，不是仅增加表格中的Assigned。未发现本次跨owner转交丢失任务；sor01明确drop188但不算自己完成。|保留这些成果与责任交接，后续功能按实际依赖接入。|
|root随后03:10 thinking一度说“STO-04 done now unblocks SOR-06”，同段say改正为“Once STO-11 lands”。|推理中有依赖误读，但对外最终说明正确，没有观察到错误提前派SOR-06。|不将未执行的错误想法升级为已发生错误。|

## 发现5｜STO-04语义与STO-10四列批次：技术方向服从单一权威，重要契约变更却只作leader裁决

**位置与摘录**
- 根 `#8d843cfd`，02:54:52 (A)：lib提交tar regular-only及Inherited volume读源提案，不自行扩协议。
- 根 `#acccda03`，02:54:57 (调用)：接受regular-only、不跟随link/不表示空目录；Inherited按calls.origin坐标只读解析父volume、不复制。
- 根 `#2f47cd96`，03:12:24 (A)：lib指出remote不可能在commit前知道最终run/step，建议七列占位由store覆盖，需跨读写侧裁决。
- 根 `#4560c7cd`，03:12:34 (A/调用)：“改为单一权威，不用占位列”；remote Parquet只有seq/at/kind/transcript_entry，store补run_id/step/position；明说“这改动SOR-19的契约”。
- 根 `#51f032da`，03:15:08 (调用)：跨D4/D6/D8对齐，central独写开始/交回，临时名`x.parquet.tmp`后rename；`#0a235480`，03:20:43保留CallRequest.capture用途给实际读取方决定，不猜着删。
- 子 `Governance3_844c.AlignBatchRuling/#f895e7ef`，03:20:30 (A)：报告修改D4 mentor packet、D6、D8、design/store.md，明确四列mapping，已push并在 [PM4](https://github.com/Pepgent/PM/issues/4#issuecomment-6552805745)、[SOR229](https://github.com/Pepgent/soroi/issues/229#issuecomment-6552805798)评论；重叠根 `#1b166184` 03:33:22也确认记录。

|观察|解释|建议|
|---|---|---|
|remote只写自己拥有的数据，store产生commit时身份；Inherited引用真实来源，不复制volume行。|技术上与权威规则一致；本段能看到“不从近处占位/目录猜状态”的主动修正。未发现添加cache、锁、补偿或七列兼容层。|复用已落实四列contract；SOR-19生产端必须遵循，而非重新允许七列。|
|root自认这是跨组件contract change，随后直接批准并让治理改D4/D6/D8与验收，未发逐项投票。|用户U12及当时AGENTS要求逐项民主票；此处不是机械实现细节。核心根窗口、相关对齐子链与治理回报中均未见Claude/Argon/mentor票与计票，看到的是“leader裁决→评论登记→文档实施”。这是明确可见的治理路径偏离；不能仅以技术正确抵销。|若接续需补的是该既成契约的正式逐项审议，不是推倒代码：列what/where/how/取舍，按既定票制确认，若反例成立再局部改动。不把登记评论称作投票。|

## 发现6｜DIST-01/CUS-04：解除已经失去事实依据的gate，仍要求精确改动的完整路径；未发现拿旧成功顶新验收

**位置与摘录**
- 根 `#ce50c40d`，02:38:51 (调用)：告知CUS规则已合并，补第五类检查后合并DIST-01，之后DIST-02 verifier与tester driver分工。
- 根 `#6b982aea`，03:02:08 (调用)：请治理在 [issue199](https://github.com/Pepgent/soroi/issues/199)补正式结论，fresh CI发行物验证native规则发现。
- 根 `#8cc624e1`，03:07:54 (A)：[DIST-01 PR239](https://github.com/Pepgent/soroi/pull/239)已合并；最终tar→emptyHOME→真实PTY；XDG越HOME缺陷实际复现后修复、新CI整路径重跑；224 verifier与235 driver不并发改同文件。
- 根 `#63eac6bf`，03:12:40 (A)：工程师指出CUS-04仍被leader旧gate卡着，gateway已修；DIST01成功不是234改动runtime证明，申请精确diff真跑。
- 根 `#b1d28693`，03:12:47 (调用)：允许对 [PR234](https://github.com/Pepgent/soroi/pull/234)“交回成功→idle→TTL parked→再唤醒”，通过才合并；SOR09/11模型继承/启动失败仍单独负责。
- 重叠根 `#1089ea10`，03:29:23 (A)：已跑确切CI diff并合并；nativeidle→park2010ms→publicwrite新PID同transcript→park2004ms。额外第二return未发生，没冒称通过。

|观察|解释|建议|
|---|---|---|
|根解除与旧网关错误相绑定的等待，但不以DIST01成功替代CUS04精确diff路径。|符合“不把外部/配置故障强行算产品缺陷、不重开已完成工作”边界。最终回报里失败的额外断言与必需wake证据分开；未发现本链伪造完整路径。|保留已通过CUS04生命周期，SOR09/11只修其仍存在的缺陷；不要重新恢复旧gate。|
|DIST-02继续需要真实A0，不以已合并安装器、CI或旧CUS04代替。|延伸至05:18:13根 `#6771cb26` 来信仍说prepare完成而完整A0未通过，说明本段赋予的验收没有自动成立。|A0必须等实际driver结果；[PR260](https://github.com/Pepgent/soroi/pull/260)等状态需git/GitHub授权才能独立确认。|

## 发现7｜hash哨兵告警：本段是在区别行为测试与比对证据，不能仅凭提到hash判违规

**位置与摘录**
- 根 `#0a2d891b`，03:02:06 (A)：治理报sentinel标了installer corrupted-artifact probe，自己认为这是拒绝损坏发行物的行为测试。
- 根 `#6b982aea`，03:02:08 (调用)：“同意，误报——验证installer拒绝损坏发行物是行为测试，允许。”
- 根 `#45e6f582`，03:02:19 (A)：该裁决已记 [issue199](https://github.com/Pepgent/soroi/issues/199#issuecomment-6552637773) 与 [PR239评论](https://github.com/Pepgent/soroi/pull/239#issuecomment-6552637935)。

|观察|解释|建议|
|---|---|---|
|root没有把hash一致当产品正确证据，而允许测试产品对损坏artifact的拒绝行为。|两者不是同一件事。在本段可见材料中未发现用hash验证充当交付证据的充分事实。实际probe在独立peer会话，本次无权读取，故也不能宣告其代码一定合规。|若需裁决probe本体，应获准读取该peer原始命令及输出，不凭哨兵一句“hash-based”定罪。|

## 发现8｜LAB-03：发现缺产品政策后正确转Argon；最终两处默认与权限删减仍缺逐项票

**位置与摘录**
- 根 `#b3bd53bb`，03:13:37 (A)：D7只有4role/4action，没有16格；UIpeer不负责sign-in；需要真owner。继续机制，不凭角色名猜政策。
- 根 `#7aa83497`，03:13:55 (dispatch/调用)：派 `agent: argon, name: ArgonRoles` 查原型与用户词，证据不足标暂定；自己批准单BetterAuth实例、公开sign-in/auth、Lab页面302/API401、部署注入secret/URL、部署init seed、无默认账号；signin由eng-lab实际负责。
- 子 `ArgonRoles/#f3665dd9`，03:14:37 (dispatch)：low只查用户原话，明确“Do NOT make design judgments”，符合低档取证而非低档设计边界。
- 子 `ArgonRoles/#3185dea3` / 根 `#a3f63999`，03:30:28 (A)：14格完整定，researcher approve own experiments核心定但单布尔折叠暂定，researcher buildImages两样本相反而暂定；无veto，对既有D7行维持赞成。
- 重叠根 `#3f7e18c9`，03:30:39 (调用)：researcher approve限自己创建实验，判别联合Any|OwnExperiments；buildImages deny；“原型里按成员单独开关的三项权限不在本版实现，会列入D9差距清单”。只交治理评论与提交。
- 根 `#aa35faf1`，03:30:45 (A)：对用户清楚区分“my call”与原型证据，并披露未做per-member toggles。
- 延伸根 `#9f25f52a`，04:55:25 (A)：[LAB-03 PR38](https://github.com/Pepgent/Pepgent/pull/38)已合并，真实sign-in、fresh membership/scoped approval、部署seed，浏览器错误密码→deep-link登录→reload/restart→logout拒绝等路径，最终截图/driver入PM；非本次独立复核。

|观察|解释|建议|
|---|---|---|
|root没有自己读历史session，而是交Argon，再由其低档子只作事实调查；policy与实现边界被工程师正确升级。|符合U1、U11的职责意图。Argon没有把researcher样本冲突藏掉；root恢复own-experiments范围而非任意Lab批准，技术类型也表达了真实范围。未发现这部分根自行伪造用户原话。|保留typed scoped approval、单auth owner与deployment seed链，不重建第二套role判断。|
|root把buildImages默认、per-member toggles不做定为自己的技术裁决，Argon只给了暂定与既有D7赞成，无本次两项新决策完整票。|事实不足的地方可以技术选型，但仍须走用户指定的逐项决策方式；尤其将原型成员级开关放D9，是显式产品范围选择。不能仅凭Argon“0 veto”当逐项审批通过。**范围是否已被此前D8明确排除，本切片未独立核全，故不直接断言擅自缩减整个MVP；决策证据链缺口成立。**|对两处默认与成员开关范围补正式条目与票，区分“当前最小版已批准不做”与“后续差距”；若既有范围批准存在，引用它而非重造历史。|
|先批准owner注入凭据、独立init，不要求用户粘secret，启动不自动seed。|符合凭据拥有方与生命周期要求；本段未发现secret明文外泄。|沿用部署owner配置路径；不为浏览器验收塞默认账户。|

## 发现9｜常规状态持续进入根主会话，再被逐条复述；这与当时异步总线规则直接不一致

**位置与摘录**
- 当时AGENTS快照 `AuthorCUS03/#abf99a06`，02:24:43 (D)：“leader只处理需要决策的事项和秘书、哨兵上报，不把所有进度消息集中到主会话”。
- 根 `#66a39551` 02:48:41收到ownership登记；`#541a5e98` 02:48:43立即say；紧邻marker后 `#e5a79cb2` 02:48:47再重复同一ownership/round5安排。
- 根 `#d4997c42` 02:52:06分类已接受→`#8a5a1cfa` 02:52:09复述；`#9aac97c8` 02:52:35 cutoff说明已接受→`#b8a201dd` 02:52:38复述。
- 根 `#5b823617` 02:55:04“posting now”→`#e2026ab2` 02:55:06复述；`#1d4df35b` 03:13:05“going onto issues now”→`#843e5d43` 03:13:07复述。
- 全核心事件计数：25 say、31 irc_in。17 wait多数等待刚派出的两个子任务，其间仍处理peer来信。

|观察|解释|建议|
|---|---|---|
|大量“登记了/即将登记/分类接受/下轮会汇总”没有新决策，却每条进根并产生say。|这是可直接观察的工作法偏离，不是推测人格或能力问题。用户要秘书和异步总线以分担注意力，根又成为进度relay；尤其三四秒重复同一信息并不推进产品。|常规DONE/ownership/回执留issue或秘书周期digest；只把需裁决、依赖变化、真实验收结果送leader。根不再对每条内部ACK发用户总结。|
|根仍做了正确的队列调整与具体裁决。|不能从“状态噪声”推出所有时间都浪费或没有实现；本段有相反证据。17wait本身也不是违规：这里在等原生子agent，不是无凭据轮询peer。|删掉噪声而非抛弃已完成工程成果。|

## 发现10｜治理副本反复丢ownership/倒退计数，root在口头修正；不是所有“无人可派”都可按事实接受

**位置与摘录**
- 根 `#b0b0f451` 02:48:22、`#66a39551` 02:48:41：STO10/11实际已给lib，并说issue已贴owner。
- `local/bus/r5-unblock.md` (D，本次读取会话内副本)：STO10/11仍为Unassigned；说明轮次快照与后续派工不同时，不应据此当实时事实。
- 根 `#a99215bc` 03:25:40 (A，尾重叠)：r6仍报DIST02/LAB04 Unblocked+Unassigned；根 `#a405e64d` 03:25:54再次说已经归dist/lab，要求改Assigned。
- 根 `#5ffa4aff` 03:29:32 (A)说“43 Done /20 Assigned /45 Unassigned”，随后的治理 `#1b166184` 03:33:22却报“43/18/47”并再次列两项无owner和signin无人。
- 根 `#12ec3ce5` 03:33:37再次把已裁signin、已分两项与部署安排交治理登记，`#885ad5f1` 03:33:59才称记录。
- 会话内 `local/bus/r6-unblock.md` 当前副本 (D)已载DIST02/LAB04 ownership、末尾45 Unassigned，说明并非一直没有修；但先前发布的两种计数确实共存过。
- 另根 `#0a2d891b` 03:02:06的“39 done”列表含“IMG04 base child”，而同信说root/live仍open；r5/r6表内IMG04均Assigned。根也多次说IMG04 not done。故不能把这个文字列表独立当108切片Done口径。

|观察|解释|建议|
|---|---|---|
|治理按定时快照、issue字样、owner队列三种记录凑状态；已派工的事会再次报unowned，root再人工修。|本段有真实索引/快照被当当前状态消费的迹象，造成重复确认和计数摇摆。不是证据证明工程师根本没干活，也不能据此宣称真实产品完成数就是某一组数字。|派工拥有方负责一次发布owner事实；扫描先取该来源现时结论，再生成带截点的副本。旧digest不回写，但下一轮明确当前snapshot，不需要额外“对账机制”。|
|root把support PR与D8切片、LAB已满足与IMG仅解除blocker区分开。|这些纠偏本身正确，特别是 `#2ec2ac9c` 02:51:20明确“Pepgent35只解除IMG blocker，不算IMG done”，不应忽略。|保留分类纠正；“merged PR数量/子任务done”不能直接替代108切片或live流程done。|

## 发现11｜同时空闲调查：先询问OS拥有方和各工程师，而非猜故障或擅自修机器；完整问答已闭合

**位置与摘录**
- 根 `#796a3fe2`，03:25:21 (A/调用)：怀疑多worker同时停可能host问题，调用peer_list，向OS watchdog问02:50–03:25有无异常/暂停。
- 根工具返回 `#e346c4ab`，03:25:21起 (R内A)：watchdog答“没有……02:56Z正常……03:26Z同样正常；没给任何会话发暂停”。
- 根 `#1597b96d`，03:25:30 (调用)：问mux/remote/images一句话阻塞点。
- 根工具返回 `#89477944`，03:25:30起 (R内A)：mux/remote均称已结束reviewer注册阻止worktree退出、已排队restart、无设计裁决；images称live等LAB03与最终发行。
- 重叠根 `#5ffa4aff` 03:29:32准确转述非host故障与各自阻塞；后续把images空档用于deploy（见03:33:37安排）。

|观察|解释|建议|
|---|---|---|
|根把“像系统故障”保留为假设，实际向OS/worker确认后才描述原因，没有自行操作磁盘。|与当时AGENTS的OS看门狗边界一致，未发现本链擅自修宿主或无事实kill集群。|保留owner结论，不重复host检查；对工具注册残留按已安排restart处理。|
|mux/remote确有非产品等待，images有产品前置等待。|用户后来所见“互相等待”有局部事实基础，但本段证据不支持把三者统称设计死锁；两个是harness注册问题，一个是auth/发行依赖。|区分可消除的流程等待与真的功能依赖，利用不依赖部分推进。|

---

## 全事件因果链覆盖索引（核心1010–1135）

|事件序号|因果链与去向|
|---|---|
|1010–1017|F07 publication修正收尾；DIST缺rules上报→CUS03 high作者派工、Argon预告、等待。发现1/3。|
|1018–1028|SOR03 resource continuation/4xx结论；治理登记F07/SOR03与worker session路径；等CUS03。发现2。|
|1029–1037|F22消费者缺schema→要求SOR03先发；REM05完成报告；library证实child inMemory边界，root接受recipe而不冒充持久transcript。发现2/3；REM05属他处起源，只记录来信，无新派工。|
|1038–1050|CUS03结果→解除DIST01；F07临时observer许可；notice修复来信→images继续IMG04；DIST03真服务完成来信→DIST后续队列。发现1/3/6。|
|1051–1064|SOR05完成来信→如实转述排除未做项；F07workload完成→lib释放→STO04/10/11重分配；治理owner登记重复复述。发现3/4/9。|
|1065–1080|R5支持PR/边界/非D8分类反复确认；volume两点裁决与治理登记。发现5/10。|
|1081–1097|SOR03合并/schema已发；R5计数+hash告警裁决；Pepgent事实文档来信；SOR03 followup254开工；DIST01完成、A0分工；STO04完成并等待STO11。发现2/4/6/7/10。|
|1098–1114|STO10四列contract裁决、通知文档与SOR19；MUX05来信；CUS04旧gate解除、完整路径重验要求与登记。发现5/6。|
|1115–1130|LAB03policy/signin/seed缺owner→ArgonRoles调查、机制批准；D4批次文档对齐、capture用途交后续实现者；等待Argon。发现5/8。|
|1131–1135|多worker idle→询问OS watchdog→问三worker阻塞；结果历史工具返回已读取。发现11。|

**其他本段输入成果（仅来信，未在本段重新起因）**：SOR-05 [PR251](https://github.com/Pepgent/soroi/pull/251)30真实调用/13 formal reject无写入；DIST-03 [PR247](https://github.com/Pepgent/soroi/pull/247)真实store/mux/central/persistence/detach；REM-05 [remote PR8](https://github.com/Pepgent/remote/pull/8)CLI/Core/Slurm身份；MUX-05 [mux PR10](https://github.com/Pepgent/omp-rpc-mux/pull/10)trusted human frames；Pepgent notices [PR35](https://github.com/Pepgent/Pepgent/pull/35)与事实文档 [PR37](https://github.com/Pepgent/Pepgent/pull/37)。这些来信有具体观察、review与证据路径，根回复大体忠实；本调查未独立审产品代码/原始runtime，所以不写成已复验通过。

## 如何从已有成果接回正轨（不是推倒重来）

1. **保留已观察或具体报告的实现**：五规则与打包、supervisor生命周期修正及root transcript、F07公开负例/consumer、store volume/progress/version接口、DIST安装器、CUS停驻唤醒、Lab真实sign-in/scoped roles。不要因治理问题否认产品已有改动。
2. **补决策合法性而非补更多中间接口**：四列批次、regular-only范围、Lab两处默认/成员开关范围，按既定逐项表与模型族票制归档。现有“leader裁决+秘书评论”不能冒充该步骤已发生。
3. **从已发布contract直接把生产端接到真实消费者**：SOR19要真的产生四列文件；F07/F19/F22要真的从公开用户入口生成trace/store结果。已有固定consumer不能代替producer，更不能用代码合并数宣布流程走通。
4. **根只处理决定，不再当进度转播器**：正常ACK与completed入秘书digest；一次派工owner由其源头确认，扫描按时点产出副本，避免旧快照重新制造“无人”。
5. **真实依赖不作伪完成，也不无谓阻塞无关部分**：继续保留本段解除CUS04旧网关gate、解耦规则正文与checker、空闲工程师接store/deploy的做法。已通过的对应runtime不反复重跑；未通过的A0/F01等必须保留未通过状态。

## 置信度与未覆盖部分

- **高置信度**：N/序号/窗口、根本段全部调用与回复、两次dispatch具体任务与子结论、CUS03实际注入与历史合并结果、peerask实际问答、根反复状态复述、四列contract被明确改变、Lab默认与成员开关被明确排除、这些链中未出现新逐项票。
- **中高置信度**：资源权威/顺序、F07仪器与live证据边界、CUS04gate解除的合理性。依据是根明确指令和具体回报；工程师独立session中的源代码与完整运行日志不在本次授权内。
- **中等/需限定**：治理“Done”计数与产品真实完成关系。快照/文字列表确实有不一致，但当前副本有后续修正；不能据此精确重算当时真实108项状态。
- **不能确认**：远程peer报告里的PR当前状态、代码是否无其他缺陷、全量原始runtime是否完全支持其所有读数。进一步确认需要 **git/GitHub授权** 或允许读取相应工程师session；本次未绕过。
- **未覆盖**：根9段之外的普通工作、monorepo最初架构决定是否正确、最终05:27停止指令的执行全过程、全项目最终E2E/D9完成与否，由其他切片/总调查判断。外延只记录本段派出链的终态来信，不扩展成全项目审计。
- **中立结论**：本段在证据诚实、源头权威、生命周期、去除假gate、调剂独立工程师方面多有做对之处；主要可证偏离是重要新决定绕过既定逐项投票，以及异步总线重新退化成主会话进度转播。未发现本段虚报F07/F19/F22 live通过；不能据此把整个目标会话定性为只有空转或造假。
