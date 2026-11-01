# D15 去重事实索引

## 已读报告与口径

| 报告（23份） | 原文件行数 | 读取情况 |
|---|---|---|
| [R01](R01.md) | 229 | 已全文读取，含分页尾部及截断长行 |
| [R02](R02.md) | 185 | 已全文读取，含分页尾部及截断长行 |
| [R03](R03.md) | 279 | 已全文读取，含分页尾部及截断长行 |
| [R04](R04.md) | 234 | 已全文读取，含分页尾部及截断长行 |
| [R05](R05.md) | 285 | 已全文读取，含分页尾部及截断长行 |
| [R06](R06.md) | 213 | 已全文读取，含分页尾部及截断长行 |
| [R07](R07.md) | 130 | 已全文读取，含分页尾部及截断长行 |
| [R08](R08.md) | 174 | 已全文读取，含分页尾部及截断长行 |
| [R09](R09.md) | 168 | 已全文读取，含分页尾部及截断长行 |
| [R10](R10.md) | 312 | 已全文读取，含分页尾部及截断长行 |
| [R11](R11.md) | 185 | 已全文读取，含分页尾部及截断长行 |
| [R12](R12.md) | 137 | 已全文读取，含分页尾部及截断长行 |
| [S1](S1.md) | 331 | 已全文读取，含分页尾部及截断长行 |
| [S2](S2.md) | 177 | 已全文读取，含分页尾部及截断长行 |
| [S3](S3.md) | 228 | 已全文读取，含分页尾部及截断长行 |
| [S4](S4.md) | 316 | 已全文读取，含分页尾部及截断长行 |
| [G1](G1.md) | 359 | 已全文读取，含分页尾部及截断长行 |
| [G2](G2.md) | 350 | 已全文读取，含分页尾部及截断长行 |
| [G3](G3.md) | 280 | 已全文读取，含分页尾部及截断长行 |
| [G4](G4.md) | 397 | 已全文读取，含分页尾部及截断长行 |
| [G5](G5.md) | 349 | 已全文读取，含分页尾部及截断长行 |
| [G6](G6.md) | 348 | 已全文读取，含分页尾部及截断长行 |
| [BehaviorMain](BehaviorMain.md) | 146 | 已全文读取，含分页尾部及截断长行 |

合计 **5812 行**。先 glob 列出23份报告，逐份全文读取；超过300行的报告分页读到文件尾，单行截断另读raw。行数以本次读取的报告文件显示EOF为准。

本索引仅整理这23份报告中的事实、原话要点、归因及未确认边界；不判断决定正确性、程序有效性或处置方式，不采纳报告的建议或行为评价为结论。没有联系任何agent，没有另读session历史，没有另做gh/git核对；下称“当前”均是各报告列明的取样快照，不是本索引写入时另取的实时状态。报告中的实际工具回执、对象作者自述、草稿/计划和最终票分别保留。提交标识只作对象地址，不作为校验证据。

- **Main**：会话 `01a195a6-e09a-7070-8423-a7910184b28a` 的leader。`Main#ID`展开为 `session://01a195a6-e09a-7070-8423-a7910184b28a/entry/ID`；`Agent#ID`展开为同根 `/agents/<Agent>/entry/ID`。调用entry和结果entry是同一动作的两个锚点，不重复计为两次决定。
- **时间**：均为2026-11-01 UTC；主表按报告所列session动作首次时间排序，范围表示同一决定的形成/覆盖或多次尝试，不表示持续有效。git、REST、Events时钟不一致时不人为校正；各来源值另列。通过时刻无独立精确值时，流程表列最后原票/计票/归档/公开时间，不把issue关闭当作投票发生瞬间。
- **参与**：“已有上位票”“本次具体动作先行参与”“要求将来参与”是三种不同事实。未见/未找到仅限报告范围。讨论者、调查员、秘书、watchdog不计三族票。分身Argon角色实例与后起常驻Argon不合并身份。
- **去重**：同一原始指令的跨报告描述合为一行；同一政策草稿→咨询→写入记形成链；后续撤回/改路线另列。正式D10、D11-A/B/C、D12、D13、D14内部起草、原票、计票、归档、回写、同步只列第二表，主表只记流程外的启动、工程安排、直接对象操作或方法选择。
- **对象**：同一路径/同一URL/同一ref一行，重复来源合并；真实父子边、Project/标签关联、commit、PR、文件和会话分开。评论关联派工时只表示任务范围，不冒称Main逐字指示。源报告只给文件数/缩写而未给名称的集合保留为缺口，不造路径。

## 一、表决流程之外的决定或指令（去重主表）

| 序号 | UTC时间 | actor | 决定或指令（含原文要点） | 受令者 | 形成前Argon/领导小组参与（报告事实） | 后续正式表决是否涉及同内容 | 具体对象及报告所见状态 | 证据来源：报告+entry/命令 |
|---|---|---|---|---|---|---|---|---|
| X-01 | 05:50:02 | Main | 定只读、中立、按时间位置切片；本人不读旧会话，调查员自行读 LEDGER；先请 mentor 检查方法。 | InvMentor/调查员 | InvMentor 后返回；无 Argon/三族票 | 未见后续专项表决 | 方法 brief；无仓库写入 | R01:35–38；S4:76–77；Main#201aa739/#c4a0ff7a |
| X-02 | 05:50:34 | Main | 方案由24人/先12片演为26人（12+14）；问 mentor 切片、中立、git/GH授权、矛盾裁决；计划稳健/发散审接续。 | InvMentor | mentor 实际给重叠、因果链、禁git/GH、不能人数裁矛盾等意见；无 Argon/正式票 | 未见专项表决 | InvMentor 成功；两个独立综合员建议本窗口未见落实 | R01:36–38,67–74；S4:76–81；Main#c4a0ff7a/#5a3ea1fc |
| X-03 | 05:52:13 | Main | 纠正 mentor 把(R)当 rules：仍指运行输出；思考可读D1当前正文，实际调查员边界仍禁git/GH。 | 调查员 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | 本窗口主调用无实际D1/GH读取；只是取舍/意图 | R01:38；Main#9fd15590 |
| X-04 | 05:52:13–05:57:12 | Main | 扩27名mid（12片+15横切），证据分层/正确与错误均记/无发现写无；首派因共享checkout拒绝；重发显式isolated:false又因≤15行拒绝；最终取消字数限、完整local报告、3%重叠，27名实际启动。 | Slice01–12、15个Lens | 有前述mentor方法输入；无Argon/三族票 | 未见 | 27主报告+3附件；失败两批不计额外调查员 | R01:39–41,65–74；BehaviorMain:23；Main#9fd15590/#a77fe1f0/#ef23a027 |
| X-05 | 05:57:17–06:11:09 | Main | 等现存调查员，报告到一个读一个，长文分页/补读附录，不自己读旧会话；按新用户指令先读报告、综合、写AGENTS、提交再接续；把commit解释为非“看git”。 | 自己/调查员 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | 27主报告有read；2附件有独立read；LensUserIntent-inputs未见单独read；06:11标收集done | R01:42–46,72–74；Main#95d37bf9/#01b33df3/#be8c0aad/#08fb5bc2/#3c8e0051 |
| X-06 | 06:03:19 | Main | 以“effectively standing in as the stand-in for that role”理解自身接管位置。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见任命/专项票 | 仅自我定位，无对应文档或正式任命对象 | R01:45；Main#3fd72a1c |
| X-07 | 06:11:09–06:15:14 | Main | 起草17条后收7机制禁令：公开接口/持久化/ADT/权限/权威生命周期/范围/部署/验收变动送票，正文变旧票失效；私有结构算法归工程师；权限表缺项不授权。 | AGENTS使用者 | SteadyReview/DivergentReview于06:14给意见；无本项Argon/三族票 | D10-08后来涉及决定权（见V10）；未见对这次AGENTS逐条追投 | bans-draft.md；AGENTS.md；[d23d997](https://github.com/Pepgent/soroi/commit/d23d997)已提交push | R01:47,56,82,90,93；R02:35–36；Main#bd387164/#1d02057a/#b3708514 |
| X-08 | 06:11:09–06:15:14 | Main | 禁leader当消息总线：普通DONE/进度/依赖解除留issue/PR；peer只派活、领导BLOCKED、安全紧急；派工者记owner/task/前置，不以私下记忆或周期人工治理timer为总线。 | 工程师/秘书/leader | 两讨论者促收窄timer与秘书前置；无Argon/三族票 | D10-09后来涉及状态通道；未见专项追投 | AGENTS第2条；tern-worker对应文本；[d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | R01:57,83–84；R02:37,50–52；Main#bd387164/#b3708514/#125d3f59 |
| X-09 | 06:11:09–06:15:14 | Main | 用户原话/通过正文作业务依据；skill/brief/LEDGER/导师解释不加规则或开上层例外；先替换冲突活动文本再派工，历史票/评论/调查原样保留。 | 规则文本消费者 | 两讨论者参与咨询；无Argon/三族票 | 未见这条专项表决 | AGENTS第3条；四文件[d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | R01:61,89–92,94–97；R02:38；Main#b3708514 |
| X-10 | 06:11:09–06:15:14 | Main | 状态按拥有方观察，分main合入/局部runtime/完整用户流程；queued/投递/广播/CI/fixture/Done数不等于用户流程；副本不当当前状态；拥有方确认修复后撤旧门禁。 | 秘书/工程师 | 讨论者建议；无Argon/三族票 | 未见专项票 | AGENTS第4条；秘书✅定义同步；[d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | R01:58,85–86,95,97；R02:39,53；Main#b3708514/#68973982 |
| X-11 | 06:11:09–06:15:14 | Main | 不问工具可查事项、不伪“等用户”；新仓owner等真实用户授权保持未决且不挡无关工作；独立分析不前置mentor/罪名或自我检讨。 | leader/调查员 | 讨论者指出owner例外；无Argon/三族票 | D10保留owner选择；非本条专项追投 | AGENTS第5条及原mentor行例外；[d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | R01:60,87–88；R02:35,40；Main#b3708514 |
| X-12 | 06:11:09–06:15:14 | Main | 开发期只在组件实现后本仓检查，撤跨组件runtime开工/live issue门禁；最终F01–32+D9保留；不把monorepo批评等于唯一拆仓拓扑；撤掉拟加A0先于全部F行及全面禁review等过渡措辞。 | 工程师/计划审稿者 | Divergent反对借禁令撤既投review；无Argon/三族票 | 后D10-00/05/06正式表决同主题（V10） | AGENTS第6条；早期草稿17条中的过宽部分未入最终；[d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | R01:59,85,100–118；R02:41；Main#1d02057a/#b3708514 |
| X-13 | 06:11:09–06:15:14 | Main | 接续而非推倒：先盘点分支/dirty/PR/进度，再架构/重派；不因全流程未过说近零，不因kill/接管/拆仓重做全部。 | leader/工程师 | 两讨论者输入；无Argon/三族票 | D10-04后来涉及迁移保全；未见此文本专项票 | AGENTS第7条；[d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | R01:98；R02:42；Main#b3708514 |
| X-14 | 06:11:09–06:12:04 | Main | 把禁令+正式A–G计划送steady/divergent只读审；不跑git/GH，可读旧local state-after-kill和D10-intent；计划归档、修活动文本、秘书补录、盘点、D10、复核、重派。 | SteadyReview/DivergentReview | 两讨论者实际返回；未见Argon/正式三族票 | D10等后续各有表决；本计划本身未见票 | 两审稿结果；不是A–G均已执行 | R01:48–50,100–118；Main#a7fb5b07 |
| X-15 | 06:12:09–06:12:25 | Main | 归档不等审稿，亲自复制30份调查材料到PM；D10-intent不动，路径限定调查目录add/commit/push main。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见专项票 | PM evidence/inv/s01a193fd/30文件；[e519e5b](https://github.com/Pepgent/PM/commit/e519e5b)，+10135/-0，远端存在 | R01:51–53,153–201；G2:146；Main#a48bb52c/#93337308/#d56bd37e |
| X-16 | 06:14:38–06:15:28 | Main | 同步tern-worker验收/上报/公开契约投票规则、去定期分身调度；秘书✅需执行证据，文档/issue/commit最多🏗；argon背景换现有多仓、design主路径完成、U引用改LEDGER；哨兵仅有界异常读session。 | skill/secretary/argon定义消费者 | 受讨论者建议，具体定义由Main编辑；未见Argon本人审批或三族票 | 未见专项追投 | 三活动文件与AGENTS共同[d23d997](https://github.com/Pepgent/soroi/commit/d23d997)；sentinel typo未见实际修复 | R01:61–63；R02:46–55；G1:39–43；Main#125d3f59/#68973982/#700bff27 |
| X-17 | 06:15:36–06:15:37 | Main | 仅提交AGENTS、tern-worker、secretary、argon四文件并push main；todo格式失败后重试。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见专项票 | soroi [d23d997](https://github.com/Pepgent/soroi/commit/d23d997)远端存在；4 modified文件 | R02:55,118–140；Main#143f17d5/#8c370f91 |
| X-18 | 06:17:12 | Main | 按“自由发挥”读取当前git/worktree/PR，不读历史；派StateInventory只读盘全部D8切片main/dirty/openPR/仅issue、每条取样命令时间，不测试不改对象。 | StateInventory | worker另询InventoryMentor；无Argon/三族票 | 未见专项票 | local state/inventory.md；108切片/66任一产物/42仅issue，非完成数 | R02:57–77；S4:87,96；Main#56229b68 |
| X-19 | 06:17:12 | Main | 秘书只改LEDGER：归档报告取旧原话、补U40–58，修U16来源/U20逗号“既”、新增R73，替E23–29过宽自评；不刷新R2/R7/R49/R51等进度。 | LedgerCatchUp | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见专项票 | LEDGER [1e73444](https://github.com/Pepgent/soroi/commit/1e73444) 06:20:31已push，+115/-21 | R02:65–71；S4:88；Main#56229b68；LedgerCatchUp#23355546/#b35f3b37 |
| X-20 | 06:17:38 | StateInventory | StateInventory先问InventoryMentor方法；采current-main tree而非单凭merged PR、四列独立交叉、未知不当无产物；只读盘点。 | StateInventory.InventoryMentor/自身 | 有mentor方法咨询，无Argon/三族票 | 未见专项票 | inventory后修稿；108切片统计仍非功能完成 | S4:29,87,96；InventoryMentor#eeb6ad4d/#8f76d5c3；StateInventory#7be375e1/#ab5d61b5 |
| X-21 | 06:28:30–06:29:19 | Main | 因Pepgent checkout并发变化查peer，初将AI4S认作原前端；拟避其根checkout、工程师origin/main worktree，并peer_ask前端范围/PR39/ahead是否推。 | 无关01a192a2 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | peer_ask Aborted:Cancelled，无回答；是否送达未独立确认；身份被用户纠正 | R02:78–82；Main#0ff3d2d6/#f1262420 |
| X-22 | 06:28:36–06:29:58 | Main | 读既有Argon D10意图稿，倾向拆仓但承认需投票；soroi等D10，独立仓先恢复；拟clone治理，C2刷新等盘点。 | 自己/后续治理分身 | 有既有Argon文档输入，非新票/实时咨询；无本窗口三族计票 | D10后正式通过（V10） | 只读D10-intent；todo新增D10/独立仓/C2待办；未在06:30前派成D10 | R02:80,84,91–96；Main#bf89f829/#5c920fb3/#c9083d13 |
| X-23 | 06:29:04–06:30:24 | Main | 派工程前先查额度；PTY起omp --no-session，/usage输入取消；06:29:45 kill成功；06:30:24重试也error。 | 临时PTY omp | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | session_id=1启动后kill exit143；无usage结果、未证明第二进程成功；未见扩展卸载 | R02:81,88–90；R03:39–45；Main#7eb4e5ba/#e708b2f0/#c99f6a86/#08c08481 |
| X-24 | 06:29:45–06:31:34 | Main | 用户纠正后不再联系无关agent、不动其checkout；工程师从origin/main独立worktree；以后不为状态起omp。 | 自己/工程师 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | D10-09后来涉及独立树；未见具体沟通承诺专项票 | todo与公开回复；06:32:51仍有对该根fetch/worktree管理调用（不是源码提交） | R02:88–96；R03:67–73,95–101；Main#1edf4a58/#c9083d13/#e46ef74c |
| X-25 | 06:30:22–06:32:34 | Main | D10交leader clone治理、本人派工程；先定“先开发后统一e2e”免投、比较拆/不拆只撤门禁、V1分类交mentor、两讨论者/三族/秘书；不task:high、owner待用户；两次prefix失败后shake:true成功。 | D10Clone_c51c/95ff/a555 | 此为要求未来参与；D10内后来有ArgonD10/导师/双讨论者 | D10-00后改为需投意图项；19子项通过V10 | c51c/95ff无自身执行；a555实际运行；未建仓迁码 | R03:21–37,75–81；S1:30–38,70–78；Main#e21651fb/#4ab36c7b/#87fea02f |
| X-26 | 06:31:09–06:31:15 | Main | 删tern-worker PTY omp→/usage额度步骤，重编号；保留GPT/Claude额度说明及peers worker启动。 | skill消费者 | 直接用户纠正后Main执行；未见专项Argon/三族票 | 未见 | [1e07f9c](https://github.com/Pepgent/soroi/commit/1e07f9c)已提交push；非卸载扩展 | R03:47–65；G1:54–56；Main#07ffd36e/#3025e4de/#7a580ef5 |
| X-27 | 06:32:02 | Main | 派LedgerC2全面替换过时工程状态，依据当前盘点、补三条用户纠正，旧证据与当前状态分开。 | LedgerC2 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见专项票 | LEDGER [2e9ab60](https://github.com/Pepgent/soroi/commit/2e9ab60) 06:40:30已push；U59–61、R74/75、E30/31；E6随后另改 | R03:83–91；S4:89；Main#4ab36c7b |
| X-28 | 06:32:46–06:33:02 | Main | 新身份eng-lab3/ops避免继承旧错误上下文；Lab建detached eng-lab3-home；ops用deploy根；建workers目录，以GPT6.1 high+peers起两个tern会话。 | eng-lab3/eng-ops | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | D10-09后来有常驻owner机制；未见每仓合owner/入口专项票 | 两个真实session及home/workers目录；后来均Opus重启及08:36停止 | R03:93–101；G6:67–73,245；Main#52fa711a/#57be69b8/#2fb41e5f/#1960fc55 |
| X-29 | 06:33:30 | Main | Lab owner负责LAB后端及初始WEB：先PR39再LAB04→05→06→07a→09→11a→11b→07b→08→12，WEB01→02→03..06→07；PR4不动；每切片issue/PR/Fixes合main；本仓真实观察可本地桩、不跨组件live；公开空白BLOCKED。 | eng-lab3 | 引用D7/D8；未见此详细排期/本地桩边界新票；D10尚在草稿 | D10-05/09、11/12后涉及同主题；非逐个排期票 | PR39后合；LAB04在途分支；WEB后拆owner；详对象表 | R03:103–114；G3:A；Main#91ae9b8b |
| X-30 | 06:33:30 | Main | ops一人管library/images/deploy：PR6→images6开PR合并/初令child齐关parent3→deploy8→DEP03；STO12未齐用本地桩不等；每项issue/PR，本仓镜像/compose观察，最终统一验收。 | eng-ops | 受此前discuss建议，未见此多仓/次序新票；D10尚草拟 | D10-05/09/13/14后涉及；未见一人三仓专项票 | library PR6合；images PR8/deploy PR9/10合；parent3关闭句06:38改覆盖 | R03:116–129；G4:C01；G5:D01；G6:67–73；Main#7b5986f6 |
| X-31 | 06:33:34–06:33:38 | Main | 新出现无关会话不联系；独立仓派工todo标done，等治理/秘书。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | 仅排程状态；不代表工程功能完成 | R03:131–137；Main#c1d7e855/#faeaff6f |
| X-32 | 06:38:20 | Main | 把images6从真实部署/登录/同容器工具集成改seed/migrations包装、本机seed→Node/BetterAuth响应；原live义务移A0+S2，改title/依赖/关闭验收。 | images issue6/eng-ops | 已读旧Argon基线1.1；未见对新child正文先行新Argon/三族票 | D10-05后来列其先例、重投通过V10 | images6 body/title已改，06:47:19 CLOSED；README[64114c6](https://github.com/Pepgent/images/commit/64114c6)、PR8合；不是全量IMG04通过 | R03:139–160；G5:D02；Main#9dbf7d46/#e6ef9427/#1d9cb600 |
| X-33 | 06:38:48 | Main | images3改Build→Pack→E2E→Close、去波次/前置runtime开工句；parent等完整统一e2e，不随child合关闭。 | images issue3 | 同上旧Argon基线；未见具体正文先行三族票 | D10-05后来先例（V10） | images3现OPEN、统一义务保留；临时img正文文件随后删 | R03:162–170；G5:D02–03；Main#5962838e/#d2cc6786 |
| X-34 | 06:38:48 | Main | LR39/45纳D10/紧接复核表，按三族票进PM，秘书同步LAB10，单列结果。 | D10Clone_a555 | 明确送正式流程；不是当场追认 | D10-11(a–d)/12后通过V10 | 治理追加；07:00:45 LAB10同步评论6554714168 | R03:172–178；Main#584128f4/#2337fa7d |
| X-35 | 06:38:57 | Main | 按新images6开PR Fixes6，parent3保持open；Lab PR39暂停合并，先修AST rest等私有缺陷，再做不依赖LAB10的LAB04。 | eng-ops/eng-lab3 | images仍旧基线；LAB公共契约等待三族 | D10-11/12后解除PR39契约阻塞；D10-05涉及images | Delivered；PR39实际07:17:16才合；PR8 06:47:17合 | R03:168,180–184；G5:D03；Main#a1330292/#97b87770 |
| X-36 | 06:41:16 | Main | 因认为无U/通过决策来源，命秘书直接删E6“代码完成前不编写/运行测试”句，改U32组件实现后本仓检查/全齐统一e2e；补images改文、工程开工、PR状态。 | LedgerC2 | 这是Main规则来源判断；未见交Argon/导师/三族裁决 | 未见此E6替换专项票 | LEDGER [e2663c1](https://github.com/Pepgent/soroi/commit/e2663c1) 06:42:58 push；+17/-15 | R03:186–198；S4:90–94；G1:S1；Main#600b4091；LedgerC2#b743caaa/#bdd5252c |
| X-37 | 06:43:12 | Main | 台账刷新todo标完成，继续等D10。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | 只是台账任务done，非工程/治理全完成 | R03:200–204；Main#fa245715 |
| X-38 | 06:46:09–06:46:11 | Main | deploy8真实subissue从images6移images3，先DELETE再POST，非仅Parent文字。 | GitHub父子关系 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | D10-05后涉及统一改文范式；报告未见这条具体边单独投票 | 当前images6无child，images3含images5/6和deploy8；边事件06:46:10/13 | R04:23–32；G4:C02；G5:D04；Main#5656e900/#0b3e456f |
| X-39 | 06:46:31–06:46:36 | Main | deploy8保留Core stop→seed→Web/重复seed身份计数/mount-env三本仓验收；浏览器与重部署会话移S2；Parent同步images3；放行images PR8 Fixes6合并。 | deploy8/eng-ops | 引用旧Argon意图1.1；具体三项切分未见先行三族票 | D10-05后同主题通过V10 | deploy8 CLOSED；README[419a286](https://github.com/Pepgent/deploy/commit/419a286)；images PR8/deploy PR9相继合 | R04:34–45；G4:C03；Main#5780e620/#97455d8e/#9293a065 |
| X-40 | 06:46:43 | Main | D10-05须加入秘书逐个改所有OPEN live/前置runtime门禁issue；跨组件义务带原文迁统一阶段；images6/3/deploy8作已改先例。 | D10Clone_a555 | 请求纳正在投表；随后ArgonD10/导师重投此行 | D10-05正式通过V10 | 07:02:45另派D10Rewrite，49正文+两D8文件；非本刻全量已改 | R04:47–52；S1:75；G5:D05；Main#c6a1c93a |
| X-41 | 06:51:43–06:51:49 | Main | deploy1撤STO12前置runtime/波次VS2，改真实init→D6协议桩本仓验收，真实GET移S2；初稿加“对象先上传”；工程师同类冲突先做可达部分，issue BLOCKED一句peer。 | deploy1/eng-ops | 旧Argon基线输入，具体验收Main直接写；无先行专项票 | D10-05/13后相关主题V10；错误句06:55被替换 | deploy1正文已改，现CLOSED；PR10合；初稿文字非现行为 | R04:54–65；G4:C04；Main#e4de9c6f/#7f8d866f/#ceeb4fb0 |
| X-42 | 06:52:08 | Main | 把releases头名/媒体/version/响应/失败建议送D10串联项，store203为owner、deploy1消费；等票先做无争议生命周期/文件消费。 | D10Clone/eng-ops | 请求正式三族，非本刻直接定wire | D10-13后通过；失败/缺boot设计未纳该条V10 | 两issue 07:00:45同步；release-init实现[925864a](https://github.com/Pepgent/deploy/commit/925864a) | R04:67–72；G4:C05；Main#9012dace/#023200bb |
| X-43 | 06:53:53 | Main | “本项目所有工程师一律”原生git worktree add -b origin/main，不等omp wt，称明确覆盖。 | 所有工程师/eng-ops | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | D10-09后有origin/main工作树一般规则；未逐字列wt覆盖句 | deploy-1/issue-1-release-init 06:54:04创建；后各树采用 | R04:74–79；G4:C06；Main#53f832d4 |
| X-44 | 06:53:53 | Main | DEP03暂把实现/桩证据放PR不合并、不进活动Compose、不feature flag/假tar/跳boot；将活动声明风险交小组决定接入时间/owner。 | eng-ops/D10Clone | 自称临时处置非裁决，随后正式票 | D10-14改成非活动代码可合main、统一阶段激活V10 | 临时hold后被07:03指令替换；release.compose.yaml非活动 | R04:81–86；G4:C06；Main#53f832d4/#e1e726b2 |
| X-45 | 06:55:04–06:55:11 | Main | 承认验收对象上传句自己写错，改“单PUT完整artifact，无独立objects上传”并通知。 | deploy1/eng-ops | 工程师指出；Main依既有D6直接改，无新票 | D10-13后写同内容V10 | 当前deploy1保留纠正句，初错误文字已替 | R04:88–93；G4:C04；Main#8ca4afc2/#4ada24bb/#eb7d44ff |
| X-46 | 06:55:11 | Main | 重复PUT同version同artifact语义、init不复制parser、store独占组件解析、外层流式协议字段，合并wire项计票。 | D10Clone | 明确送三族重投 | D10-13修订后通过V10 | 最终同内容返回既有Record；store/deploy同步评论及代码 | R04:95–99；S1:77；Main#3c30ca49 |
| X-47 | 06:59:56 | Main | 在建切片LR整批优先（39/45/49及LAB/WEB/DEP/IMG），先出结果可先关批再拆仓；Lab暂不新增discussion权限，继续内部transport/lifecycle。 | D10Clone/eng-lab3 | 要求正式复核，未当场增权限 | D11-A含LR49、D10已决39/45；V11A | LAB13/15等同步；LAB04仍OPEN | R04:101–106；R05:270–271；Main#f31a65c4/#4783c7e9 |
| X-48 | 07:02:02–07:03:55 | Main | 接受D10；owner只许用户选择，列五owner并建议Pepgent；建仓前store/plugin旧仓不停工，不自行建A/B。 | 用户/工程师 | D10-01B/04保留用户owner选择；推荐由Main提出 | 未见用户答复/实际建仓 | 五owner公开询问；新仓/迁移未发生（报告截点） | R05:39–40,52；G1:S3；Main#2de271a7/#7ae6edb3 |
| X-49 | 07:02:07–07:02:21 | Main | 从origin/main建store/plugin/e2e/web四detached home及workers sessions，以GPT6.1 high+peers起四tern owner。 | 四工程师 | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D10-09已通过；未见逐路径/命名专项票 | 四home/workers真实创建；对应四session后Opus重启并停 | R05:41–43；G6:246；Main#9441aa0c/#2f272901/#89bcdc5a |
| X-50 | 07:02:45 | Main | D10Rewrite按D10-05/06/14切换8仓OPEN D8/live正文；移原文义务、不缩范围、四先例跳过；必要两D8文提交，不关issue/合PR/改代码。 | D10Rewrite | 已有D10三族政策票；具体秘书dispatch未另投 | D10-05/06/14为先行依据V10 | 49正文PATCH 07:14:41–54；[cd5bff0](https://github.com/Pepgent/PM/commit/cd5bff0) 07:12:31；07:16:43接受回报done | R05:44,98–196；S4:98–130；Main#94a1041b/#8495c26a/#296ddb94 |
| X-51 | 07:03:33 | Main | store owner先接STO05旧6文件patch、再STO12/releases、再OPEN STO；旧仓路径继续、后迁；contract/identity属公开，空白BLOCKED。 | eng-store | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D6/D8/D10-01B/04/10/13为既有依据 | PR271合；SSE [c1d7e53](https://github.com/Pepgent/soroi/commit/c1d7e53) WIP；后另派exports；详G1 | R05:45；G1:S3；Main#c181860c第1封/#396ddaa5 |
| X-52 | 07:03:33 | Main | plugin管omp-soroi/builder/installer/settings/workflow，续SOR09→DIST02/PR260/266→SOR07/11..20；PR260 install-check归e2e，build-release归plugin；定制内容设计上报。 | eng-plugin | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D10-02/03/04/08/10为依据 | PR269/279合，PR260/280未合；不是剩余切片全完成 | R05:46；G1:S3；Main#c181860c第2封/#b0a8d3c6 |
| X-53 | 07:03:33 | Main | e2e owner交E2E10/11b/12/14..18 spec/runbook，接install-check、写Pepgent20/21 spec；live245/250/259不执行；可不依赖live的fixture/类型本仓检查。 | eng-e2e | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D10-05/06/09为依据 | PR270合、PR272OPEN、F20/21 dirty；统一F未执行 | R05:47；G1:S3；Main#c181860c第3封/#92841762 |
| X-54 | 07:03:33 | Main | WEB从lab3拆给eng-web，client/protocol域，按WEB01→02→03..06→07；已定wire先实现不等后端，协调须BLOCKED不私联peer；lab3只server/RPC。 | eng-web/eng-lab3 | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D10-09有路径域；具体顺序未另票 | PR40合；WEB02/41与相关分支未合 | R05:48–49；G3:D；Main#824f3da4/#c5df80b1 |
| X-55 | 07:03:33 | Main | 转达D10-11/12：PR39按新AST/权限规则修改后合并；草稿并入归LAB11b，guest不授editLibrary；LR49未决先不增权限。 | eng-lab3 | 已有D10三族票；不是单方新权限 | D10-11/12已通过V10 | PR39 07:17:16合；后D12是新follow-up，不是旧PR含新协议 | R05:49；G3:B；Main#c5df80b1 |
| X-56 | 07:03:38 | Main | 按D10-13/14推进非活动release-init实现并合main，不因等待接入挂PR；统一e2e齐后激活。 | eng-ops | 已有正式D10三族票 | D10-14已通过V10 | [925864a](https://github.com/Pepgent/deploy/commit/925864a)及PR10 07:17:34合；活动compose无此overlay接入 | R05:50；G4:C06；Main#3c04e7e5 |
| X-57 | 07:04:53 | Main | STO05 LR47公开cursor/首次顺序/RunEvent/GraphRecords来源缺口并入LR49的D11优先批，秘书同步190；工程师不自造schema。 | D10Clone/eng-store | 要求正式三族处理 | D11-47A/B/C通过V11A，47C后被C1替 | 190同步；SSE在途[c1d7e53](https://github.com/Pepgent/soroi/commit/c1d7e53)；不是本刻批准 | R05:53；G1:S5；Main#f11dd537/#ad31227d |
| X-58 | 07:09:10 | Main | 精确版本“.”/“..”PUT前拒绝定为D10-08单仓私有实现，“不需要表决”；写issue说明、合非活动overlay。 | eng-ops | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 08:32交旧D15复核；无完成正式票（旧D15见V15旧） | release-init.ts拒绝逻辑已入[925864a](https://github.com/Pepgent/deploy/commit/925864a)/PR10/main；6554797010明确leader确认 | R05:54,198–233；G4:C07；Main#c3b5c973/#0effbd2b |
| X-59 | 07:12:55 | Main | 另派LabWireClone组织D12全部catalog/page参数/13页/command input-output/events，argon基线、双讨论、三族、秘书；不写实现、不task:high；通知WEB与Lab只做已定内部，不推断wire。 | LabWireClone/eng-web/eng-lab3 | 要求未来全流程；后来实际有ArgonD12/ArgonD12Vote/导师 | D12-01..17三轮后通过V12 | D12档案/PM19/五同步评论；实现多项仍OPEN | R05:55–57；S2:34；Main#8377eda2/#0746cdcd/#e8cbb310/#b1ab11fd |
| X-60 | 07:16:22 | Main | F12 film:File与eval标量/run_* string冲突作独立设计补充送D10Clone，Argon可否决；正式入口/对齐交票，同步220并通知plugin/ops；期间严格判据、继续其他spec。 | D10Clone/eng-e2e | 要求正式投；不是已选择file() | D11-F12通过V11A | eval设计[9b808c1](https://github.com/Pepgent/soroi/commit/9b808c1)、library8/PR9后落地；不等于F12 live通过 | R06:20–36；Main#6fcb33c8 |
| X-61 | 07:20:18 | Main | 图床/SOPS不走，改同仓evidence/pr-40截图专支不合main，用固定提交blob嵌图、检查敏感内容后正常流程合PR40；后续WEB PR同样。 | eng-web | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 旧D15拟追认/扩通用，取消前无正式结果 | evidence/pr-40及[1246470](https://github.com/Pepgent/Pepgent/commit/1246470)单图提交，PR40正文更新/07:25:52合；不在实现PR文件中 | R06:55–72；G3:F；Main#1321585c（G3引#49873e3b） |
| X-62 | 07:21:34 | Main | 派GapClone专职D13实现期契约缺口，初为EnvIdentity注入生产/编码；主路径、argon基线、双讨论/导师/三族/秘书；后续缺口同批；F12留D10Clone。 | GapClone_e2d7 | 要求未来全流程；后来有D13Argon等实际参加 | D13五条通过V13 | PM18/95bb071/来源同步；非本刻定环境变量名 | R06:74–89；S3:32；Main#5e25fb36/#e525ab1e |
| X-63 | 07:21:34 | Main | plugin仅暂停SOR07接口依赖部分，继续SOR11；e2e接PR260 verifier pid→ProcessRef消费迁移，不让plugin代改。 | eng-plugin/eng-e2e | 已有相关决策原票；具体派工/路径/排期未见另行取票 | SOR07后D13/D14；ProcessRef ownership沿D10-04 | 215/260仍OPEN；无证据该消费迁移已交付 | R06:91–105；Main#5e25fb36 |
| X-64 | 07:27:15 | Main | File根需要新实现issue/派工，先等D10Clone最终报告，不立即派。 | 自己 | 等待既有治理结果；无本条另票 | D11-F12后已有结果 | 仅thinking+wait；library8 07:47:39后创建，不是此时派成 | R06:107–109；Main#44b03bd8 |
| X-65 | 07:29:27 | Main | LAB11a停驻transcript无持久sessionFile，列get_state外部引用/既有resolver候选，禁跨重启cache/扫名猜路径；作为持久化与权威项追加D13。 | GapClone/eng-lab3 | 要求正式三族，未在此选session_file列 | D13-04通过V13 | 会话列/解析要求正式同步；LAB04分支有后续代码，issue22仍OPEN | R06:111–119；R07:65–71；Main#5a8af869 |
| X-66 | 07:29:27 | Main | 转达D11-A LR49已通过，discussion create/prompt授三非guest角色、prompt仅owner；等秘书评论后实现。 | eng-lab3 | 已有三族原票，cb47daa早于通知 | D11-49已通过V11A | 6555009251同步；LAB04仍OPEN，非通知即完工 | R06:121–127；Main#5a8af869 |
| X-67 | 07:39:56 | Main | D12必须补完整LabCommandResult/逐命令success shape，回答create row/id、prompt入队/终态歧义，同步LAB04且与LR49/47C一致；工程师继续内部、不发SQL row作wire，无需回复。 | LabWireClone/eng-lab3 | 送正在进行的正式流程，非当场定返回类型 | D12-10最终通过V12 | 6555236053同步；LAB04实现分支，不是公开RPC已完成 | R07:27–61；S2:D12-10；Main#bd3059d9/#4107d05c/#2fa76485 |
| X-68 | 07:50:14 | Main | 派ops实现D13-01/02：apply前同源解析镜像/config、普通Variables、改central.py/toml/environment，新deploy issue/PR，本仓preview计算观察，排当前后。 | eng-ops | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D13已通过V13 | deploy11/PR12合；[01b0fb4](https://github.com/Pepgent/deploy/commit/01b0fb4)/b4be605；非真实活动容器更新证明 | R08:20；G4:C09；Main#936cea02 |
| X-69 | 07:50:14 | Main | soroi根compose.yaml/full归e2e，两个身份变量必填、驱动/宿主入口提供值，开新issue/PR渲染观察。 | eng-e2e | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D13-02已通过；具体compose owner未另票 | 报告未定位独立新issue/PR，不能宣称交付 | R08:21；Main#c3297b75 |
| X-70 | 07:50:14 | Main | plugin SOR07按D13接中心/远程identity与固定runner env，同PR；发行/A0/DIST/CUS launcher值归plugin，compose/e2e归e2e、deploy归ops；追加D11-F12 file()入计划。 | eng-plugin | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D13与D11-F12已通过；路径拆分未另票 | 215仍OPEN；File DSL未见已交付证据 | R08:22–24；Main#afe1590f |
| X-71 | 07:50:19 | Main | 刚把runner缺口记not blocking/下次变动前解决，继而决定现在D14表决（D13改环境且SOR近期改runner），不是等待以后。 | GapClone | 要求argon基线、双讨论、导师分类/三族；方案由后续票形成 | D14三条通过V14 | [6001098](https://github.com/Pepgent/PM/commit/6001098)/PM20；导师原只要求下次runner变化前解决，非当次先做 | R08:25–27；S3:34；Main#f39607ee/#724b7af6 |
| X-72 | 07:51:50 | Main | 复用D10Clone完成D11-B，流程同A、回写/同步；明确49正文及两D8已由别秘书做，不重复。 | D10Clone_a555 | 要求后续正式流程 | D11-B七项通过V11B | [d43f047](https://github.com/Pepgent/PM/commit/d43f047)/589aa0c/f73aa44/6d2da5a；不重复49PATCH | R08:35；S1:83–84；Main#688917d1 |
| X-73 | 07:51:50 | Main | ops接library8五run_* File+README、images9 standin，排当前后，二项顺序工程师定。 | eng-ops | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D11-F12/04A已有票V11A | library PR9已合/8及7闭；images9仍OPEN | R08:36–38；G6:82–88；G5:D07；Main#1818f976 |
| X-74 | 07:58:07 | Main | D12分身直接回写D5/D7/D8/D10及soroi设计，替旧文不留更正层、各仓限定commit/push，不做代码。 | LabWireClone | D12正式通过后派执行；未另票 | D12原票V12 | [ec07387](https://github.com/Pepgent/PM/commit/ec07387)/262cab4/f56e0d1已push，08:00后落地 | R08:47；S2:35,100–106；Main#7aa12067 |
| X-75 | 07:58:07 | Main | Lab按D12迁统一library读/命令、删cache/unavailable、staged definition/reason、节点元数据/lab:write/补schema；原令“PR39修改后合并”；create/prompt及LAB公开wire依D12。 | eng-lab3 | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D12已通过V12 | PR39其实07:17已合；08:03接受改follow-up，后合共享41方案；未完成原子合入 | R08:48,165–167；R09:45；Main#b1c18b8b |
| X-76 | 07:58:07 | Main | WEB从WEB02实现D12 protocol/投影，P3/P14–19按占位继续；plugin开273补slots startedAt/version/inputs；ops库README元数据各自issue/PR。 | eng-web/eng-plugin/eng-ops | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D12-14/15等已通过V12 | WEB21/41OPEN；soroi273OPEN；library10/PR11闭合 | R08:49–52；Main#0001de9a/#ad0e50cc/#d1e2583e |
| X-77 | 08:02:09 | Main | 接受D14，plugin新开installer issue --artifact/release.json/standalone argv、先包安装再运行、先合main；SOR07同PR接D13/D14，SOR17a用新公式。 | eng-plugin | D14实际三族票；owner/先后具体派发未另票 | D14-01/02/03已通过V14 | 275/PR280OPEN；[8ebb43c](https://github.com/Pepgent/soroi/commit/8ebb43c)在分支，未合main；215/214无本窗交付证据 | R09:34–37；G1:S8；Main#e1c4e1cc |
| X-78 | 08:02:09 | Main | ops lab-entrypoint加--artifact等installer合；e2e A0 argv/中心Main改installed release；Lab宿主driver改installed release等前置。 | eng-ops/eng-e2e/eng-lab3 | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D14-02已通过V14 | deploy14OPEN且脚本未改；A0无交付证据；Lab纠正原已installed非本指令造成切换 | R09:38–40；G4:C11；Main#7e7e7b04/#a8ecd6d8/#dca4bc27/#87b55d3f |
| X-79 | 08:03:06–08:08:03 | Main | 协调D12/D11回写：D10Clone先避D5/7/8/10；LabWire先提交D5/7；08:04释放D5/7并修旧D7行锚，08:08释放其余；要求不改意义。 | D10Clone/LabWireClone | 既有D12/B决定；路径/提交次序未另票 | 无新增契约票 | [ec07387](https://github.com/Pepgent/PM/commit/ec07387)/589aa0c/262cab4/6d2da5a；D11A DraftRow锚194→128 | R09:42–43,46,49；S1:85–86；S2:36；Main#25f30919/#eea21d85/#75d6125d/#42f1990c |
| X-80 | 08:03:41 | Main | WEB02先交protocol types/parser PR（LabCommand/result/权限/page/catalog），可不含Bridge，先合main再通知LAB04；Lab不造平行schema；PR39已合不回写，先安排LAB04后独立follow-up。 | eng-web/eng-lab3 | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D12为契约；先后/拆PR未另票 | 41新子issue；协议仍未合；后独立follow-up路线08:05被共享分支替换 | R09:44–45；G3:J；Main#e3aac365/#3e7a5d5e |
| X-81 | 08:05:25 | Main | 仓A前store优先在soroi根加./contract、./identity exports与zod runtime；Activity/RunComparison/ValueUsage补store-owned Zod schemas，称语义不变；新issue一个PR通知WEB、root package归store。 | eng-store | D12-01仓A Git原则有票；具体旧monorepo根临时出口未见新Argon/三族票 | 旧D15讨论npm替代但未正式完成；非本根出口专项批准 | 274/PR278合；[1832bda](https://github.com/Pepgent/soroi/commit/1832bda)/452c385；Bun证据未覆盖npm | R09:47,89–105；G1:S9；Main#2288e1f2（G1引#aa7ad0c9） |
| X-82 | 08:05:25–08:05:26 | Main | 为producer编译贯通，lab3 server/lab+必要rpc直接推WEB feat/web-02-lab-wire，同PR原子合main；各改路径域，follow-up并此PR。 | eng-lab3/eng-web | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D12字段既有票；共分支/原子PR方案未另票 | 41包含配套producer；实际[0ae89ef](https://github.com/Pepgent/Pepgent/commit/0ae89ef)独立分支，未进共享；不能报合入成功 | R09:48；G3:K；Main#ae3da90c/#31f3c6bc |
| X-83 | 08:10:35 | Main | D13不等D14：PR12仅digest注入按现有证据合；D14另PR等installer main，最初仍说deploy11。工程师随后指出issue closing冲突，改新原子14，Main无后续反驳指令。 | eng-ops | D13/D14技术有票，拆分/现证据放行未见另票 | 未见对这条处置专项票 | PR12改title/body合并闭11；14OPEN；D13原代码先于此指令存在 | R09:50–51,128–142；G4:C12；Main#fd516929/#4d529ed0 |
| X-84 | 08:15:36 | Main | 同意41含producer/reason migration/lab:write，删“不改后端权限/DB”；仍排Bridge/LAB04；公布真实schema SHA、lab3见SHA再切，reason先WEB基线迁移、LAB04后rebase。 | eng-web/eng-lab3 | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D12-10/16已有票；正文范围/迁移次序未另票 | 41正文确替；[0ae89ef](https://github.com/Pepgent/Pepgent/commit/0ae89ef)/71a5145后续分支，仍OPEN | R10:33–51；G3:L；Main#8f6b2e40/#87c83bab |
| X-85 | 08:16:33–08:17:08 | Main | 两个小Rust仓remote/mux交一eng-rt；新workers目录/GPT6.1 high tern；先remote14 OCI/remove及design，后接mux13旧2dirty文提交PR合；显式worktree，本仓cargo/binary观察。 | eng-rt | D11-B产品有票；D10-09将两个组件分列；未见合一owner专项票 | 未见owner合并专项表决 | remote15OPEN未合、mux14已合仅文档；workers与remote树存在后停 | R10:91–116；G6:98–118；Main#7246f182/#78a00299 |
| X-86 | 08:16:34 | Main | D8→D4过期行号改D4-18(D4:66)并查相关，限定提交push后结束。 | D10Clone | 文本定位维护，无本项Argon/三族新票 | 无新契约票 | [b61be5a](https://github.com/Pepgent/PM/commit/b61be5a) 08:17:06，18处锚/ID，main已push | R10:53–62；S1:87；Main#d90e9488 |
| X-87 | 08:16:34 | Main | 按D11-B派plugin276提醒只{text}/hook及CallRequest不带capture；e2e277改F22/reminders/wire等删lifecycle；ops images10 OCI与deploy13 OCI，顺序自定。 | eng-plugin/eng-e2e/eng-ops | 已有相关决策原票；具体派工/路径/排期未见另行取票 | D11-B七项已通过V11B | 四issue目前OPEN、未见对应完成；remote另项见后行 | R10:64–89；Main#141a84bb/#5858132d/#e0f3f6da |
| X-88 | 08:17:35 | Main | LedgerC3只改LEDGER，核PR合并，记D10–14/A/B、49改文、owner未决、七GPT名册；决策/issue/STARTED不等完成；正文替换。 | LedgerC3 | 登记已有票；具体文案未另票 | 无专项票 | [6997ecf](https://github.com/Pepgent/soroi/commit/6997ecf) +92/-55；push拒后普通merge59cdff1成功，非force | R10:118–130；S4:136–137；Main#4750d582/#ab233287 |
| X-89 | 08:17:35–08:17:37 | Main | 本轮不设可选异常哨兵、不清理parked分身、等一次性秘书；没有周期摘要启动。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | thinking+wait；没有kill闲置subagent对象 | R10:132–139；Main#4750d582/#ececc990 |
| X-90 | 08:23:35 | Main | store D11-47C重复call/edges及F24继承冲突送熟悉背景D10Clone作D11-C，要求同步190/回写D6/D8/store；等票保留patch继续47A/B取消关闭。 | D10Clone/eng-store | 要求新正式三族，非Main现场定义payload | D11-C1/C2/WB3 08:30:10通过V11C | [95bd75a](https://github.com/Pepgent/PM/commit/95bd75a)/3beaff4/e0b14cc/7ec91a8；SSE patch仍WIP | R10:141–171；Main#48085889/#f01429d1 |
| X-91 | 08:26:08 | Main | 再向用户列五owner建议Pepgent，候选soroi-store/omp-soroi；选前现仓继续、不暂停；公开七工程与D11-C待投、F未开始。 | 用户/工程师 | D10保留用户选择；推荐/状态发言非新票 | 未见用户选owner/建仓 | owner未决；不是移仓已做；七GPT是此时快照 | R10:173–181；Main#9453017d |
| X-92 | 08:27:13–08:27:24 | Main | 按用户Opus5.5 high纠正，只改tern-worker不改subagent定义；模型命令及文案改后commit/push。 | skill使用者 | 直接用户08:26:51指令；无另Argon/三族票 | 未见专项票 | [f7a66b9](https://github.com/Pepgent/soroi/commit/f7a66b9) +2/-2，main push | R10:183–197；G1:S12；Main#833aebbd/#42c92d55/#2be21cd4/#067ba75c |
| X-93 | 08:27:29–08:30:23 | Main | 选kill/relaunch --restore而非运行中/model：先lab3后六名；store/e2e/rt命名冲突串行补起；rt找不到session改真实worktree/完整jsonl；发继续/问Model。 | 七tern工程师 | 用户指定模型；kill/restore操作选择未另票 | 未见专项票 | 七人自报Opus，六答08:30后；启动含:high但Model自报不证明effort；后来08:36全停 | R10:199–222；R11:27–28；Main#ad2c809f/#4e2901d9/#99d13ddb/#91e5ab0e及六Model entry |
| X-94 | 08:30:27 | Main | 待D11-C最终报告，秘书一次更新名册GPT→Opus/决策；未立即派。 | 自己 | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 未见 | thinking+wait，真正下派08:38:32 | R11:29；Main#718502e3 |
| X-95 | 08:30:37 | Main | store新优先项：仓A前给npm可安装同源contract，“做法由你定，例如subtree split”；不复制源码、隔离npm consumer实测、开issue回依赖写法；通知WEB不绕过。 | eng-store/eng-web | 报告所读动作前未见本项 Argon 输入/三族票；不是全历史不存在的断言 | 08:32:35撤回交旧D15；旧D15未完整票 | 消息已送并唤醒store；未证实新分支/产物已做，不能据撤回断言零改动 | R11:30–36；G1:S9；Main#1f30153d/#225a3c9c |
| X-96 | 08:32:35–08:32:39 | Main | 撤npm同源产物指令，定为跨仓消费方式需小组；结论前不做、继续原切片；GapClone新D15审npm、截图分支与dot分类追认/修正；通知WEB改走D15。 | eng-store/GapClone/eng-web | 要求正式后续；旧D15有Argon/讨论意见但无导师/完整计票 | 旧D15未完成见V15旧 | GapClone local旧D15草稿；无公开D15 issue/归档；08:36取消 | R11:32–35；S3:35,89–121；Main#d009f020/#09befa57/#2e0901c5 |
| X-97 | 08:33:02–08:33:22 | Main | 查Argon票文件，对外承诺今后一切BLOCKED含私有分类交分身表决、Argon每次参与；自述四issue由D10-05后续涉及。 | 用户/自己 | 此流程承诺无新三族票；既有D票另有原文 | 未见该承诺专项票 | 未在此时改规则；不是所有历史动作已过会的证明 | R11:42；Main#1493b236/#f5975ae8 |
| X-98 | 08:36:45–08:37:23 | Main | 按用户立即停止命令取消旧GapClone并kill七tern；两嵌套kill因非自己spawn失败，改发立即停止文本；再取消GapClone，最后stop文本error；todo工程恢复blocked。 | GapClone/七工程师/D13Argon/D13Steady | 直接用户停止命令；未另票 | 未见 | tern ls无pepgent-*；D13Argon根08:37:23仍running，自身08:37:38才明确停；未回滚代码 | R11:44–49；S3:36–37,115–121；Main#d74253b7/#15d22b22/#63e87e04/#4c027931/#90cc0db3 |
| X-99 | 08:37:09–08:44:47 | Main | 凭记忆列七组“应作废/破坏范围”、08:42 brief作为(A)线索，并对外说合并代码/issue需重做；此处只记发言/候选输入，非事实损害清单。 | 用户/D15Clone | 未有独立取证或D15票；后被撤回 | 未见D15结果 | 08:45:32明确连线索用途作废；没有执行回滚 | R11:47,60,65,69–91；Main#62e95c69/#efd0daa0/#4232ae5f |
| X-100 | 08:38:32 | Main | LedgerU62补12句U62–73、R76–83/E32、名册Opus后全停，R71/72指新E32，范围交D15；只改LEDGER提交push，不代设计。 | LedgerU62 | 用户原话记录；具体文字未事前Argon/三族审 | 无专项票 | [d51835f](https://github.com/Pepgent/soroi/commit/d51835f) 08:41:27 +79/-17，push；未表示丢弃/重做已执行 | R11:55,108–115；S4:138；Main#92d705d0/#f124d77c |
| X-101 | 08:38:58–08:40:05 | Main | 用户要watchdog后先研究advisor但未写cfg；后改omomp WATCHDOG-LeaderCompliance，target main/every1/window/Luna:max/read-grep-glob/steer/启用；自拟证据不足PASS等提示，提交失败后重试push。 | watchdog消费者 | 用户直接要求监视；配置/提示未见Argon/三族审 | 未见专项票 | 32行文件[53e790c](https://github.com/Pepgent/soroi/commit/53e790c)；write显示active；12通知，不能据配置说每步均审 | R11:56–58；S4:180–215；Main#f2e0a47e/#0a3a7988/#74c5ccc2 |
| X-102 | 08:42:51 | Main | 等U补录后fork新D15Clone_b978：独立核实、Argon基线、逐条处置what/where/how/owner顺序、讨论/导师/三族/秘书；每步全文LEDGER；只票与归档，不回滚/重做/恢复。 | D15Clone_b978 | 要求未来参与，未有本刻D15票 | 报告截点无D15正式结果 | 新clone已spawn，内候选输入随后撤销；与旧GapClone D15不是同一任务 | R11:60–61；Main#efd0daa0/#a87b4aa2 |
| X-103 | 08:44:30 | Main | 启动常驻Argon审计全会话/派mid写leader-audit，做唯一D15 Argon席、裁决投票否决并保持可寻址；通知D15不另起Argon。 | Argon/D15Clone | 用户直接追问后派；新Argon尚未批准历史动作 | 无已完成D15票 | Argon实际spawn；目标leader-audit报告未产；后拒绝代查；席位数次安排变动 | R11:62–64；S4:144；Main#0376a57e/#b5d57227/#d6f079b7 |
| X-104 | 08:45:32–08:45:38 | Main | 撤凭记忆清单/破坏范围及基于它的取证/草稿，不准作输入/线索/核对基准；D15/Argon须独立中立分片只读当前记录对象；公开承诺不再说损害范围、不改动。 | D15Clone/Argon/用户 | 根据用户质疑Main纠正；未见事前Argon/三族票 | 未见 | 两消息成功；不是调查已完成或既有对象已回退 | R12:22–24；R11:91；Main#046aee50/#eaf868b6 |
| X-105 | 08:46:01–08:46:11 | Main | 尝试补至少20只读mid、isolated:false/不限长、PM取证路径、D15统一派Argon不另派/报告齐后先交Argon；发送aborted；随后决定不补发，将是否继续交用户。 | D15Clone/用户 | 未见事前Argon/三族裁决 | 未见 | 未发成不能当有效brief；当刻未kill；随后又有新消息 | R12:25–26；Main#45175e8b/#6b5e1fc4/#e55942a3 |
| X-106 | 08:46:27–08:47:12 | Argon | 先4主题调查含特定动作/提交；认为预设后kill4，改4中立时间片+1对象调查（736 rendered各184），两轮均未完整交付。 | Argon调查子agent | 常驻Argon自己组织；非三族投票 | 未见 | 九调查任务后全取消，少量local计划文件；不能作已完成审计 | S4:33–43,146–149；Argon#6e75f9b5/#7518b43e |
| X-107 | 08:46:34–08:46:38 | Main | 把带E32/破坏范围判断的watchdog blocker原文转D15/Argon并称“不是指令”；随后称不推决定给用户、不再下分析结论，等报告/Argon/PM票。 | D15Clone/Argon/用户 | Argon仅收件，未先给方法裁决；无三族票 | 未见 | 两转发成功；08:48撤回；未来gate不是已发生投票 | R12:27–28；S4:175；Main#295bc8a6/#90ca47f9 |
| X-108 | 08:48:10–08:48:14 | Main | 撤刚转watchdog原文，不准定分析问题/范围/结论，不再发分析内容，只等至少20独立报告。 | D15Clone/Argon | 无本项事前Argon/三族确认 | 未见 | 撤回两消息成功；不等于此前已送内容没发生 | R12:29；S4:176；Main#826bad7c/#1d4c5b24 |
| X-109 | 08:49:29–08:49:39 | Main | Argon cancelled通知后不自己恢复，撤唯一常驻席位安排，交D15按AGENTS自行安排Argon。 | D15Clone | 当刻无活跃Argon同意/三族票；取消者不明 | 无完成D15票 | 席位指令成功；后Argon自身继续运行，不能说此后一直缺席 | R12:30,53；Main#3fcba54a/#3762ebae/#0c28ba65 |
| X-110 | 08:50:17–08:50:29 | Main | 拒watchdog停D15，把治理与工程分开，自释R82只停旧clone/七工程师、新D15不含，若停先改R83；保留运行。 | 自己/用户 | 尚未请求本题Argon裁决；无三族票 | 后Argon裁决U72不含D15（非事前票） | 无kill；为规则解释/运行选择，不是D15表决完成 | R12:31；Main#2e865ee1 |
| X-111 | 08:50:25 | Argon | 按直接用户消息拒绝替Main调查，kill NeutralSlice1–4及RepoGithub五任务；不产原代查报告。 | 自身调查子agent | Argon收到直接用户两消息；非三族票 | 未见 | 五kill成功；调查无完成审计 | S4:157–160；Argon#517ce78a/#0972f2c8/#943ecff4 |
| X-112 | 08:50:34–08:51:10 | Main | 按watchdog全文读AGENTS/LEDGER，重申D15继续且独立分析无mentor前审/候选罪名；查proc后说Argon在席，D15先Argon后讨论/mentor/Claude逐票PM归档，尚无PM票。 | D15Clone/用户 | Main适用性自判在前；要求未来三族；后到Argon也要求不前审 | 未完成D15票 | 流程消息成功；报告不据Main“全读”自述证明逐行完整核对 | R12:32–34；Main#748084cf/#bbbfab5d/#ab058ac9 |
| X-113 | 08:51:21–08:51:24 | Main | U72是否含D15正式问Argon，承诺含就停、不含不干预；裁决前不联系D15/不发其他动作。 | Argon | 确有向Argon请求；当刻无回复/三族票 | 后08:56:06裁决不含 | 请求已成功；随后08:52:37先kill（下行） | R12:35；Main#a3402549/#0e2b2e9f |
| X-114 | 08:52:37–08:52:47 | Main | 未等Argon答复即停D15顶层，保留Argon；再问何时/如何重启，称全部22子agent也停并承诺裁决前不重启。 | D15Clone/Argon | 停前无Argon本题裁决/三族票 | 后Argon要求继续（非D15三族结果） | proc确认D15 cancelled、Argon running；22后代全停只是自述，本R12未逐个核 | R12:36–37；Main#eb664d82/#f9805c07/#da44e7bc/#e12cf729 |
| X-115 | 08:52:50–08:53:04 | Main | 把D15审查/执行、Standing Argon audit等全blocked，宣称无可推进事、停止未完成提醒；公开不变动不联系。 | 自己 | Main等待安排，无Argon同意“无事可做” | 未见 | todo16/20 done、0open/4blocked；不是外部状态证明 | R12:38–40；Main#e64c983a/#3264c77d/#f725fc53 |
| X-116 | 08:55:03–08:56:06 | Argon | 写D15-intent与制裁书；拒代查；提出S1/S2与七否决，S3冻结Main工程指挥/issuePR/合并；裁决U72不含治理D15，要求独立取证、秘书归档。此处仅记录裁决内容存在。 | Main/D15Clone/秘书 | 常驻Argon据直接用户原话裁决；非D15三族表决 | 报告截点无D15正式票 | local与PM D15-intent224行；后[37e6c73](https://github.com/Pepgent/PM/commit/37e6c73)归档；各对象因果未由Argon已取消调查全量证明 | S4:160–167；R12:54–59；Argon#4a4875b3/#760dafc6；Main#8965f994 |
| X-117 | 08:56:17–08:56:19 | Main | 向cancelled同名D15发消息从中断处恢复全流程，重新常驻Argon席、禁向其代查，按intent起草送裁决投票。 | D15Clone_b978 | 已有Argon第一裁决要求继续；无D15完整票 | 未完成D15票 | 消息成功；proc同名新running与旧cancelled并列，恢复已发生 | R12:41；Main#ea0edda5/#8f9208cd/#9bc957b1 |
| X-118 | 08:56:58 | Main | Archive秘书PM只归档Argon现成D15-intent；LEDGER从U74录两转述原话注明Main未见entry，增E33、替R81–83/S3；只两文件不设计。 | ArchiveD15Intent | PM归档有Argon明确要求；具体U编号/E33/替R未见三族票 | 未完成D15票 | PM[37e6c73](https://github.com/Pepgent/PM/commit/37e6c73) 08:57:53已push；LEDGER各报告快照先无差异后dirty未提交，见缺口表 | R12:42,64–102；S4:217–233；Main#8fe46f7b/#5351a05d |
| X-119 | 08:56:58–08:59:59 | Main | 向Argon发接收裁决/恢复/秘书进展/席位/LEDGER摘要且“无需回复”，接受工程冻结；watchdog指常规回执后承认改走PM/LEDGER、不再直报。 | Argon | 有Argon裁决背景；回执不是Argon逐项核可/三族票 | 未见专项票 | 消息已送；末更正为承诺，无新工程恢复 | R12:43,47；BehaviorMain:105–109；S4:211–213；Main#8fe46f7b.2/#ed027a8f.2/#ac9ab154/#6b697c17 |
| X-120 | 08:57:07–08:57:40 | Main | 多次拒watchdog再停D15，按Argon带U裁决区分治理/工程，保持D15运行不来回停复，工程冻结。 | 用户/自己 | 有两份Argon裁决；仍无D15三族PM结果 | 无D15正式通过 | 无新kill或工程师恢复工具；不能由承诺推未来全程 | R12:44,48；Main#596378e9/#a51a61a3 |
| X-121 | 08:57:10 | Argon | 第二裁决要求D15立即继续、表决前仅归档/只读取证/筹备、只写local、D15自己派中性mid与behavior、逐步LEDGER核对、无导师前审、正式三族与Argon在线；原文还写新D15/独立task:high席。 | Main/D15Clone | 常驻Argon裁决；非三族计票 | 未完成D15票 | 原裁决消息存在；Main转发落实有差异（下行） | R12:45–46,60；S4:162,169；Argon#3ab38f03；Main#52ef21c3 |
| X-122 | 08:57:35 | Main | 浓缩转第二裁决给D15；不另起新clone而复用恢复者；以本轮无task:high许可为由Claude族由Main/分身担任，向Argon明示，不按独立high原文落实。 | D15Clone/Argon | 已有Argon原裁决；未见Argon对这两个具体落实选择回复同意 | 无D15完成票 | 消息成功；取证输出限制local/inv/d15/*.md；不是已批准席位替代事实 | R12:45–47；Main#ed027a8f/#dc5b3355 |
| X-123 | 08:58:11–08:58:22 | Argon | 第三句直接用户消息后发督办：确认被中断22报告、秘书补U74–76/E33、Main亲履Claude逐项态度、报整改；秘书追加U76并确认基线不并改。 | Main/ArchiveD15Intent | Argon收到直接用户话；无D15三族结果 | 无 | R12截点无Main响应；S4更晚见秘书读直接entry/dirty，非最终提交 | R12:61；S4:163–165,231–233；Argon#f5d23b35/#95a2fb90 |
| X-124 | 08:59前后（精确时间本报告未列） | Main | 纠正秘书provenance：先读Argon transcript，只有原始用户entry可录U；E33只留可核Main动作，不凭转述定范围。 | ArchiveD15Intent | watchdog提示后Main更正；未见D15票 | 无 | 09:00:05读Argon history/09:00:17提用户events；09:00:36LEDGER dirty未提交 | BehaviorMain:99–103；S4:212,232–233；Main#14105b42/#980409aa |

## 二、表决流程内活动汇总

| 流程 | 决策/活动 | decision issue | 通过/计票/公开时间（逐源） | Argon席位及其他实际投票者 | 讨论/反例/最终计票 | 文件、评论、commit等直接产物 | 报告指出的流程外动作或边界 | 证据来源 |
|---|---|---|---|---|---|---|---|---|
| V10 | D10：19子项；起草、两讨论、反例修改、逐条计票 | https://github.com/Pepgent/PM/issues/16 | 最后Argon回复06:56:47；06:58:50分身按已通过派秘书；git06:59:14；公开创建07:00:05/关闭07:00:59 | D10Clone_a555.ArgonD10（06:48:26新派，与08:44常驻Argon不同）；Claude=D10Clone；导师LeadMentorD10 | D10-00最初免投后改意图投；导师首反02/06/11(c)，修订重投；05/13因Main追加改稿重投；19项最终各3/3 | 91dd67e六文件；PM16原票6554709566；LAB15/DEP1/STO203同步；D10/D11A后b336254/4e1eb44、9b808c1；D10Rewrite另做cd5bff0及49正文 | Main事前images/deploy正文/边、临时hold/wt指令见X-32, X-33, X-38, X-39, X-41, X-43；D10-05票涉及范式，不证明每条边/逐字正文先获票 | S1:66–118,185–217,302–310；R04:108–135；G2:45,65,146–152 |
| V11A | D11-A：24项（全51行分流、契约条目、File根） | https://github.com/Pepgent/PM/issues/17 | Argon07:26:09；07:27:05按通过派秘书；git07:28:46；公开07:32:28/关闭07:32:39 | 同一D10Clone_a555.ArgonD10；Claude=D10Clone；导师同LeadMentorD10 | 两mid事实+steady/divergent；D11-47C最终当时3/3，后来C1取代；D11-F12串联分类；24项三族赞成无否决 | cb47daa七文件；12工程同步评论；新images9；b336254七D文+4e1eb44草图收窄；soroi9b808c1；library8；旧A正文保留，后新评论6555582864记取代 | 正文回写曾具体化未通过side/records编码，4e1eb44删；定位维护589aa0c只改DraftRow引文；Main后派owner/顺序见X-73 | S1:120–151,191–203；R06:20–32；G2:46,66,149–152 |
| V11B | D11-B：7项（提醒、lifecycle、OCI、capture、remove、WB2） | https://github.com/Pepgent/PM/issues/21 | Argon08:01:15；08:02:11按全通过派秘书；git08:03:19；session创建08:06:35；REST创建09:06:36/关闭09:14:34 | 复用D10Clone_a555.ArgonD10；Claude=D10Clone；导师同LeadMentorD10 | steady/divergent审第1版，修第2版；7项各3/3、0否决/分类争议 | d43f047五文件；589aa0c(D4/D5/D11A锚)、f73aa44(eval/store)、6d2da5a(D8)；五实现issue276/277/remote14/images10/deploy13，11同步；PM21五子边 | D12文件占用协调、D8行锚整理见X-79、X-86；Main把remote/mux合owner见X-85 | S1:153–169,196–200,309；R10:64–116；G2:50,93–97,128–132 |
| V11C | D11-C：C1/C2/WB3，替D11-47C携带规则 | https://github.com/Pepgent/PM/issues/22 | Argon08:29:34；08:30:10计票并派秘书；Main08:30:15收到；git08:30:48；session创建08:32:08；REST创建09:32:10/关闭09:33:44 | 复用D10Clone_a555.ArgonD10；Claude=D10Clone；导师同LeadMentorD10 | 两讨论者实际反例；3项各3/3；秘书初未见导师原票，导师重发原文后归档 | 95bd75a五文件；3beaff4 D6/D7；e0b14cc store设计经7ec91a8 push；PM17取代评论；190/14/17/21/26/220/259同步 | Main把冲突交表并继续47A/B见X-90；SSE c1d7e53仍WIP，归档不等于代码对齐 | S1:171–183,201–203,310；R10:141–171；R11:117–128；G2:51,98–101 |
| V12 | D12：17项Lab公开wire，13页/最终48命令等 | https://github.com/Pepgent/PM/issues/19 | 07:53:03分身宣布最终17/17；git07:54:58；公开07:55:46/关闭07:56:56；五来源同步07:57:09–10 | 基线=LabWireClone_5d6b.ArgonD12；投票=LabWireClone_5d6b.ArgonD12Vote（新实例）；Claude=LabWireClone；导师MentorD12Vote | steady/divergent各两轮+Coverage(537行快照)；导师首反7条、第二轮仅13反、第三轮13通过；guest已读/项目写/Panel读范围有Argon专项票；最终各17/17 | 904017b十文件；PM19七评论/五实现同步；ec07387 D5/D7、262cab4 D8/D10、f56e0d1 intervention正文 | 初稿写入早于分身实际读基线；Coverage未重审629行定稿；mentor-r2档实际第三轮，第二轮完整票留session；Main协议先行/root exports/共分支另列X-80/X-81/X-82 | S2全文；R07:77–97；R08:72–77；G2:48,80–86；G3:E/I–L |
| V13 | D13：5项注入/编码/身份切换/session_file/runner环境 | https://github.com/Pepgent/PM/issues/18 | 07:44:46–55 Claude票及填计票；git07:46:41；公开07:47:18/关闭07:49:08；来源同步07:49:08–10 | GapClone_e2d7.D13Argon（基线与五轮票）；Claude=GapClone；导师D13Mentor | steady四轮/divergent三轮；导师首反02/04，编码补全/当时本机conversation=0回应后重投；Argon第五轮最终5赞成无否决 | 95bb071五文件；PM18九原票/反例评论，三来源同步；后D14仅另加PM18评论不倒改D13 | “配置投影私有”、HOME/PATH中间稿后被替；runner/release缺口转D14；旧数据0行只当时本机观察；Main部署/compose owner见X-68/X-69 | S3:39–67,125–191；S4:151–169；R08:58–64 |
| V14 | D14：3项整发行身份/installer artifact/同次切换 | https://github.com/Pepgent/PM/issues/20 | 导师07:57:43；07:57:56 Claude计票；git07:58:46；公开创建07:59:24；session关闭/同步08:01附近；REST关闭09:01:07（event09:01:08） | 复用GapClone_e2d7.D13Argon两轮；Claude=GapClone；导师同D13Mentor | runner-only初稿被steady反例推翻为整发行，Argon重投；导师终局D14-01技术/补；最终3项各3/3 | 6001098五文件；PM20五评论；PM18追加+215/199/214/deploy11/A0五同步；未直接实现installer | Main安装器先合与D13部署先合/D14后续的具体工程拆分见X-77/X-83；尚未完成installer合入 | S3:69–87,138–191；R09:55–67；G2:49,87–92 |
| V15旧 | 旧GapClone D15拟案/咨询（未完整表决） | 未创建decision issue | 08:34:25草稿；08:34:53交三审；08:36:45/08:37:20取消 | 复用GapClone.D13Argon；steady/divergent；未派导师/秘书、未Claude最终计票 | 拟store subtree分支、证据分支追认通用化、dot分类追认；steady反对dot私有分类、divergent仅追认PR40不长期替代凭据修复；末接受改分类停在thinking | 仅local/decisions/D15.md；无store分支/公开归档/完整票证据 | 对应X-96；不能与新D15Clone_b978或后37e6c73混为一次完成 | S3:89–121,159,207–218；R11:33–36 |

## 三、对象表

各对象一行；状态只来自所引报告。表内“V…”定位第二表的表决内活动，X定位第一表；“未找到对应指令”按报告所见保留，不因同账号、同仓或相邻时间补造指令。旧对象仅因本轮有内容/关联/合入/使用状态变化而列，纯被点名且未观察变化者明确标注。未具名文件集合不伪装为已逐文件枚举。


### 3.1 Issue与PR（正文、新建、状态变化）

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| [PM issue13](https://github.com/Pepgent/PM/issues/13) | OPEN（报告快照） | X-50；V10 | G2/S4 |
| [PM issue14](https://github.com/Pepgent/PM/issues/14) | OPEN（报告快照） | X-50；V10 | G2/S4 |
| [PM issue15](https://github.com/Pepgent/PM/issues/15) | OPEN（报告快照） | X-50；V10 | G2/S4 |
| [PM issue16](https://github.com/Pepgent/PM/issues/16) | CLOSED | V10（表决内活动；主表为启动/协调指令） | G1/G2/G3/G5/G6/S1/S4 |
| [PM issue17](https://github.com/Pepgent/PM/issues/17) | CLOSED | V11A（表决内活动；主表为启动/协调指令） | G1/G2/G3/G5/G6/S1 |
| [PM issue18](https://github.com/Pepgent/PM/issues/18) | CLOSED | V13（表决内活动；主表为启动/协调指令） | G1/G2/G3/S3 |
| [PM issue19](https://github.com/Pepgent/PM/issues/19) | CLOSED | V12（表决内活动；主表为启动/协调指令） | G1/G2/G3/G6/S2 |
| [PM issue20](https://github.com/Pepgent/PM/issues/20) | CLOSED | V14（表决内活动；主表为启动/协调指令） | G1/G2/S3 |
| [PM issue21](https://github.com/Pepgent/PM/issues/21) | CLOSED | V11B（表决内活动；主表为启动/协调指令） | G1/G2/G4/G5/G6/S1 |
| [PM issue22](https://github.com/Pepgent/PM/issues/22) | CLOSED | V11C（表决内活动；主表为启动/协调指令） | G1/G2/G3/S1 |
| [PM issue8](https://github.com/Pepgent/PM/issues/8) | 旧D8 issue，新增images9子边；报告未在变更正文十项内列本项 | V11A：新增images9父边；逐边Main指令未找到 | G2/G5 |
| [Pepgent issue11](https://github.com/Pepgent/Pepgent/issues/11) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue13](https://github.com/Pepgent/Pepgent/issues/13) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue14](https://github.com/Pepgent/Pepgent/issues/14) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue15](https://github.com/Pepgent/Pepgent/issues/15) | CLOSED | X-50 | G3/S4 |
| [Pepgent issue16](https://github.com/Pepgent/Pepgent/issues/16) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue17](https://github.com/Pepgent/Pepgent/issues/17) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue18](https://github.com/Pepgent/Pepgent/issues/18) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue19](https://github.com/Pepgent/Pepgent/issues/19) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue20](https://github.com/Pepgent/Pepgent/issues/20) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue21](https://github.com/Pepgent/Pepgent/issues/21) | OPEN（报告快照） | X-50 | G3/S3/S4 |
| [Pepgent issue22](https://github.com/Pepgent/Pepgent/issues/22) | OPEN（报告快照） | X-50 | G3/S3/S4 |
| [Pepgent issue23](https://github.com/Pepgent/Pepgent/issues/23) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue24](https://github.com/Pepgent/Pepgent/issues/24) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue25](https://github.com/Pepgent/Pepgent/issues/25) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue26](https://github.com/Pepgent/Pepgent/issues/26) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue27](https://github.com/Pepgent/Pepgent/issues/27) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue28](https://github.com/Pepgent/Pepgent/issues/28) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue29](https://github.com/Pepgent/Pepgent/issues/29) | OPEN（报告快照） | X-50 | G3/S4 |
| [Pepgent issue30](https://github.com/Pepgent/Pepgent/issues/30) | OPEN（报告快照） | X-50 | G3/G5/S4 |
| [Pepgent issue41](https://github.com/Pepgent/Pepgent/issues/41) | OPEN（报告快照） | X-80、X-82、X-84 | G3 |
| [Pepgent issue9](https://github.com/Pepgent/Pepgent/issues/9) | CLOSED | X-50 | G3/S4 |
| [Pepgent PR39](https://github.com/Pepgent/Pepgent/pull/39) | MERGED | X-29、X-55；V10 | G3/S2 |
| [Pepgent PR40](https://github.com/Pepgent/Pepgent/pull/40) | MERGED | X-54、X-61 | G3/S3 |
| [deploy issue1](https://github.com/Pepgent/deploy/issues/1) | CLOSED | X-41、X-58；V10 | G4/S3/S4 |
| [deploy issue11](https://github.com/Pepgent/deploy/issues/11) | CLOSED | X-68、X-83 | G4 |
| [deploy issue13](https://github.com/Pepgent/deploy/issues/13) | OPEN（报告快照） | X-87；V11B | G2/G4/S1 |
| [deploy issue14](https://github.com/Pepgent/deploy/issues/14) | OPEN（报告快照） | X-83（新issue由工程师修正路由） | G4 |
| [deploy issue8](https://github.com/Pepgent/deploy/issues/8) | CLOSED | X-38、X-39 | G4/G5/S4 |
| [deploy PR10](https://github.com/Pepgent/deploy/pull/10) | MERGED | X-56、X-58 | G4 |
| [deploy PR12](https://github.com/Pepgent/deploy/pull/12) | MERGED | X-68、X-83 | G4 |
| [deploy PR9](https://github.com/Pepgent/deploy/pull/9) | MERGED | X-30、X-39 | G4/G5 |
| [images issue10](https://github.com/Pepgent/images/issues/10) | OPEN（报告快照） | X-87；V11B | G2/G5/S1 |
| [images issue3](https://github.com/Pepgent/images/issues/3) | OPEN（报告快照） | X-33；V10/V11A | G4/G5/S4 |
| [images issue6](https://github.com/Pepgent/images/issues/6) | CLOSED | X-32、X-35、X-38 | G5/S4 |
| [images issue9](https://github.com/Pepgent/images/issues/9) | OPEN（报告快照） | X-73；V11A | G2/G5/S1 |
| [images PR8](https://github.com/Pepgent/images/pull/8) | MERGED | X-32、X-35、X-38 | G5 |
| [lab-library issue10](https://github.com/Pepgent/lab-library/issues/10) | CLOSED | X-76；V12 | G6 |
| [lab-library issue5](https://github.com/Pepgent/lab-library/issues/5) | CLOSED | X-30 | G6 |
| [lab-library issue7](https://github.com/Pepgent/lab-library/issues/7) | CLOSED | 未找到Main新建issue7的专门指令；契约V10-11(c)，后来PR9一并满足 | G6 |
| [lab-library issue8](https://github.com/Pepgent/lab-library/issues/8) | CLOSED | X-73；V10/V11A | G6/S1 |
| [lab-library PR11](https://github.com/Pepgent/lab-library/pull/11) | MERGED | X-76；V12 | G6 |
| [lab-library PR6](https://github.com/Pepgent/lab-library/pull/6) | MERGED | X-30 | G6 |
| [lab-library PR9](https://github.com/Pepgent/lab-library/pull/9) | MERGED | X-73；V10/V11A | G6 |
| [omp-rpc-mux issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13) | CLOSED | X-85 | G6 |
| [omp-rpc-mux PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) | MERGED | X-85 | G6 |
| [remote issue14](https://github.com/Pepgent/remote/issues/14) | OPEN（报告快照） | X-85；V11B | G2/G6/S1 |
| [remote PR15](https://github.com/Pepgent/remote/pull/15) | OPEN（报告快照） | X-85；V11B | G6 |
| [soroi issue182](https://github.com/Pepgent/soroi/issues/182) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue190](https://github.com/Pepgent/soroi/issues/190) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue196](https://github.com/Pepgent/soroi/issues/196) | CLOSED | X-52 | G1/S4 |
| [soroi issue199](https://github.com/Pepgent/soroi/issues/199) | CLOSED | X-77；V14（旧关闭项仅新增同步） | G1 |
| [soroi issue203](https://github.com/Pepgent/soroi/issues/203) | CLOSED | X-50 | G1/S4 |
| [soroi issue205](https://github.com/Pepgent/soroi/issues/205) | CLOSED | X-50 | G1/S4 |
| [soroi issue207](https://github.com/Pepgent/soroi/issues/207) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue209](https://github.com/Pepgent/soroi/issues/209) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue211](https://github.com/Pepgent/soroi/issues/211) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue214](https://github.com/Pepgent/soroi/issues/214) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue215](https://github.com/Pepgent/soroi/issues/215) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue216](https://github.com/Pepgent/soroi/issues/216) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue217](https://github.com/Pepgent/soroi/issues/217) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue219](https://github.com/Pepgent/soroi/issues/219) | PR270曾自动关闭；07:23:11重开；当前OPEN | X-53 | G1/S4 |
| [soroi issue220](https://github.com/Pepgent/soroi/issues/220) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue222](https://github.com/Pepgent/soroi/issues/222) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue223](https://github.com/Pepgent/soroi/issues/223) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue224](https://github.com/Pepgent/soroi/issues/224) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue226](https://github.com/Pepgent/soroi/issues/226) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue227](https://github.com/Pepgent/soroi/issues/227) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue228](https://github.com/Pepgent/soroi/issues/228) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue229](https://github.com/Pepgent/soroi/issues/229) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue231](https://github.com/Pepgent/soroi/issues/231) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue232](https://github.com/Pepgent/soroi/issues/232) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue233](https://github.com/Pepgent/soroi/issues/233) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue235](https://github.com/Pepgent/soroi/issues/235) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue245](https://github.com/Pepgent/soroi/issues/245) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue250](https://github.com/Pepgent/soroi/issues/250) | OPEN（报告快照） | X-50 | G1/G5/S4 |
| [soroi issue259](https://github.com/Pepgent/soroi/issues/259) | OPEN（报告快照） | X-50 | G1/S4 |
| [soroi issue273](https://github.com/Pepgent/soroi/issues/273) | OPEN（报告快照） | X-76 | G1 |
| [soroi issue274](https://github.com/Pepgent/soroi/issues/274) | CLOSED | X-81 | G1 |
| [soroi issue275](https://github.com/Pepgent/soroi/issues/275) | OPEN（报告快照） | X-77 | G1 |
| [soroi issue276](https://github.com/Pepgent/soroi/issues/276) | OPEN（报告快照） | X-87 | G1/G2/S1 |
| [soroi issue277](https://github.com/Pepgent/soroi/issues/277) | OPEN（报告快照） | X-87 | G1/G2/S1 |
| [soroi PR260](https://github.com/Pepgent/soroi/pull/260) | OPEN（报告快照） | X-52、X-63 | G1/S1 |
| [soroi PR266](https://github.com/Pepgent/soroi/pull/266) | OPEN；起点前创建/更新，本轮只引用未观察变化 | X-53（仅派工引用，未观察本轮对象变化） | G1/S1 |
| [soroi PR269](https://github.com/Pepgent/soroi/pull/269) | MERGED | X-52 | G1 |
| [soroi PR270](https://github.com/Pepgent/soroi/pull/270) | MERGED | X-53 | G1 |
| [soroi PR271](https://github.com/Pepgent/soroi/pull/271) | MERGED | X-51；V10 | G1 |
| [soroi PR272](https://github.com/Pepgent/soroi/pull/272) | OPEN（报告快照） | X-53 | G1 |
| [soroi PR278](https://github.com/Pepgent/soroi/pull/278) | MERGED | X-81 | G1/S3 |
| [soroi PR279](https://github.com/Pepgent/soroi/pull/279) | MERGED | X-52 | G1 |
| [soroi PR280](https://github.com/Pepgent/soroi/pull/280) | OPEN（报告快照） | X-77 | G1 |

### 3.2 Commit对象

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| [soroi commit d23d997](https://github.com/Pepgent/soroi/commit/d23d997) | git提交06:15:36Z；AGENTS.md + tern-worker/secretary/argon，4 文件 +23/-11；main可达（G1快照） | X-07、X-16 | G1 §3 |
| [soroi commit 1e73444](https://github.com/Pepgent/soroi/commit/1e73444) | git提交06:20:31Z；LEDGER 补用户原话/纠正自评，+115/-21；main可达（G1快照） | X-19 | G1 §3 |
| [soroi commit 1e07f9c](https://github.com/Pepgent/soroi/commit/1e07f9c) | git提交06:31:14Z；tern-worker 删除 PTY `/usage` 配额探测；main可达（G1快照） | X-26 | G1 §3 |
| [soroi commit 2e9ab60](https://github.com/Pepgent/soroi/commit/2e9ab60) | git提交06:40:30Z；LEDGER 按当前盘点刷新，+155/-151；main可达（G1快照） | X-27 | G1 §3 |
| [soroi commit e2663c1](https://github.com/Pepgent/soroi/commit/e2663c1) | git提交06:42:58Z；LEDGER E6/e2e 顺序及恢复工程，+17/-15；main可达（G1快照） | X-36 | G1 §3 |
| [soroi commit 8cfd7e6](https://github.com/Pepgent/soroi/commit/8cfd7e6) | git提交07:04:27Z；SOR09 8 文件 MuxWriter/Generation 重基提交；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit f8807bd](https://github.com/Pepgent/soroi/commit/f8807bd) | git提交07:07:20Z；只改 design/subagent.md，恢复实现归属，抵消继承分支越入设计的净改动；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit e5ad62d](https://github.com/Pepgent/soroi/commit/e5ad62d) | git提交07:10:45Z；F05 spec/runbook/local smoke，6 文件 +44/-7；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 10d73cf](https://github.com/Pepgent/soroi/commit/10d73cf) | git提交07:11:45Z；merge PR270；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 44ffa3f](https://github.com/Pepgent/soroi/commit/44ffa3f) | git提交07:12:00Z；store 完整 releases 导入/查询/持久化，6 文件 +156/-2；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 6a4b0b7](https://github.com/Pepgent/soroi/commit/6a4b0b7) | git提交07:13:57Z；merge PR269；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 1b834c9](https://github.com/Pepgent/soroi/commit/1b834c9) | git提交07:16:08Z；origin/main 合入 eng/install-check-224；未合分支可达 | X-51、X-52、X-53 | G1 §3 |
| [soroi commit d2c68e2](https://github.com/Pepgent/soroi/commit/d2c68e2) | git提交07:17:49Z；merge PR271；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit c9e676d](https://github.com/Pepgent/soroi/commit/c9e676d) | git提交07:23:54Z；F06/F09–F13 spec，14 文件 +410/-7；未合分支可达 | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 97b83ce](https://github.com/Pepgent/soroi/commit/97b83ce) | git提交07:30:51Z；上述 spec 的 session/candidate/remote-home 关联修正，5 文件；未合分支可达 | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 9b808c1](https://github.com/Pepgent/soroi/commit/9b808c1) | git提交07:48:27Z；design/eval.md File 根/source snapshot；main可达（G1快照） | V11A | G1 §3 |
| [soroi commit bb08c40](https://github.com/Pepgent/soroi/commit/bb08c40) | git提交07:48:36Z；spawnCapture/host forwarding/typed handback，11 文件 +361/-127；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit e3e81b7](https://github.com/Pepgent/soroi/commit/e3e81b7) | git提交08:01:29Z；mux-writer/supervisor 拆开 capture failure 与 cleanup conclusion；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit 5b0ebd8](https://github.com/Pepgent/soroi/commit/5b0ebd8) | git提交08:05:43Z；supervisor abort command failure 与 resource cleanup 分开；main可达（G1快照） | 未找到对应指令 | G1 §3 |
| [soroi commit f73aa44](https://github.com/Pepgent/soroi/commit/f73aa44) | git提交08:05:47Z；design/eval.md/store.md 提醒 text 与 compare 格式；main可达（G1快照） | V11B | G1 §3 |
| [soroi commit f56e0d1](https://github.com/Pepgent/soroi/commit/f56e0d1) | git提交08:07:50Z；design/intervention.md GUI handback、slots 实际调用元数据；main可达（G1快照） | V12 | G1 §3 |
| [soroi commit 1832bda](https://github.com/Pepgent/soroi/commit/1832bda) | git提交08:09:36Z；根 package.json/bun.lock/contract.ts/contract.test.ts exports、zod 与 3 schema；main可达（G1快照） | X-81 | G1 §3 |
| [soroi commit 452c385](https://github.com/Pepgent/soroi/commit/452c385) | git提交08:14:28Z；packages/store/README.md Git 消费/解析边界，+12；main可达（G1快照） | X-81 | G1 §3 |
| [soroi commit d4c516d](https://github.com/Pepgent/soroi/commit/d4c516d) | git提交08:19:04Z；merge PR278；main可达（G1快照） | X-81 | G1 §3 |
| [soroi commit 6997ecf](https://github.com/Pepgent/soroi/commit/6997ecf) | git提交08:24:58Z；LEDGER D10–D14 与工程名册；main可达（G1快照） | X-88 | G1 §3 |
| [soroi commit 59cdff1](https://github.com/Pepgent/soroi/commit/59cdff1) | git提交08:25:09Z；main 与远端合并，非独立功能实现；main可达（G1快照） | X-88 | G1 §3 |
| [soroi commit f7a66b9](https://github.com/Pepgent/soroi/commit/f7a66b9) | git提交08:27:22Z；tern-worker 改 Opus5.5 high，+2/-2；main可达（G1快照） | X-92 | G1 §3 |
| [soroi commit 9c3753c](https://github.com/Pepgent/soroi/commit/9c3753c) | git提交08:27:44Z；merge PR279；main可达（G1快照） | X-51、X-52、X-53 | G1 §3 |
| [soroi commit c1d7e53](https://github.com/Pepgent/soroi/commit/c1d7e53) | git提交08:29:40Z；store lifecycle cursor/SSE 6 文件 +359/-52，**WIP 未开 PR、未合并**；未合分支可达 | X-51、X-52、X-53、V11A、V11C | G1 §3 |
| [soroi commit e0b14cc](https://github.com/Pepgent/soroi/commit/e0b14cc) | git提交08:32:08Z；design/store.md 提交级 records 事件语义，+6/-5；main可达（G1快照） | V11C | G1 §3 |
| [soroi commit 7ec91a8](https://github.com/Pepgent/soroi/commit/7ec91a8) | git提交08:32:20Z；main 合远端后推送；main可达（G1快照） | V11C | G1 §3 |
| [soroi commit 53e790c](https://github.com/Pepgent/soroi/commit/53e790c) | git提交08:40:03Z；新 watchdog 文件，32 行；main可达（G1快照） | X-101 | G1 §3 |
| [soroi commit d51835f](https://github.com/Pepgent/soroi/commit/d51835f) | git提交08:41:27Z；LEDGER U62–U73/R76–R83/E32、停止名册；main可达（G1快照） | X-100 | G1 §3 |
| [PM commit e519e5b](https://github.com/Pepgent/PM/commit/e519e5b) | 06:12:23Z；30调查文件；main/远端对象已取回（G2） | X-15 | G2 §5 |
| [PM commit 91dd67e](https://github.com/Pepgent/PM/commit/91dd67e) | 06:59:14Z；D10六归档；main/远端对象已取回（G2） | V10 | G2 §5 |
| [PM commit cd5bff0](https://github.com/Pepgent/PM/commit/cd5bff0) | 07:12:31Z；D8两文；main/远端对象已取回（G2） | X-50；V10 | G2 §5 |
| [PM commit cb47daa](https://github.com/Pepgent/PM/commit/cb47daa) | 07:28:46Z；D11A七文件；main/远端对象已取回（G2） | V11A | G2 §5 |
| [PM commit 95bb071](https://github.com/Pepgent/PM/commit/95bb071) | 07:46:41Z；D13五文件；main/远端对象已取回（G2） | V13 | G2 §5 |
| [PM commit b336254](https://github.com/Pepgent/PM/commit/b336254) | 07:48:27Z；D2–D8回写；main/远端对象已取回（G2） | V10/V11A | G2 §5 |
| [PM commit 4e1eb44](https://github.com/Pepgent/PM/commit/4e1eb44) | 07:49:57Z；D6草图收窄；main/远端对象已取回（G2） | V10/V11A | G2 §5 |
| [PM commit 904017b](https://github.com/Pepgent/PM/commit/904017b) | 07:54:58Z；D12十归档；main/远端对象已取回（G2） | V12 | G2 §5 |
| [PM commit 6001098](https://github.com/Pepgent/PM/commit/6001098) | 07:58:46Z；D14五归档；main/远端对象已取回（G2） | V14 | G2 §5 |
| [PM commit d43f047](https://github.com/Pepgent/PM/commit/d43f047) | 08:03:19Z；D11B五归档；main/远端对象已取回（G2） | V11B | G2 §5 |
| [PM commit ec07387](https://github.com/Pepgent/PM/commit/ec07387) | 08:04:13Z；D12 D5/D7回写；main/远端对象已取回（G2） | V12；X-79 | G2 §5 |
| [PM commit 589aa0c](https://github.com/Pepgent/PM/commit/589aa0c) | 08:05:47Z；D4/D5/D11A锚；main/远端对象已取回（G2） | V11B；X-79 | G2 §5 |
| [PM commit 262cab4](https://github.com/Pepgent/PM/commit/262cab4) | 08:07:46Z；D12 D8/D10回写；main/远端对象已取回（G2） | V12 | G2 §5 |
| [PM commit 6d2da5a](https://github.com/Pepgent/PM/commit/6d2da5a) | 08:12:44Z；D11B D8回写；main/远端对象已取回（G2） | V11B | G2 §5 |
| [PM commit b61be5a](https://github.com/Pepgent/PM/commit/b61be5a) | 08:17:06Z；D8→D4锚18处；main/远端对象已取回（G2） | X-86 | G2 §5 |
| [PM commit 95bd75a](https://github.com/Pepgent/PM/commit/95bd75a) | 08:30:48Z；D11C五归档；main/远端对象已取回（G2） | V11C | G2 §5 |
| [PM commit 3beaff4](https://github.com/Pepgent/PM/commit/3beaff4) | 08:32:08Z；D6/D7 C回写；main/远端对象已取回（G2） | V11C | G2 §5 |
| [PM commit eedda7d](https://github.com/Pepgent/PM/commit/eedda7d) | 08:35:37Z；LAB04 23证据文件；main/远端对象已取回（G2） | 未找到对应此23文件归档的专门指令；工程任务X-29 | G2 §5 |
| [PM commit 37e6c73](https://github.com/Pepgent/PM/commit/37e6c73) | 08:57:53Z；常驻Argon D15-intent224行；main/远端对象已取回（G2） | X-118 | G2 §5 |
| [Pepgent commit 7046c52](https://github.com/Pepgent/Pepgent/commit/7046c521fefff4beb99e9b179909be54af3d7033) | git/API commit时间06:43:51Z；PR39 rest tuple及alias→Promise修复；A下工程师review评论6554546782/6554615009 | X-29；X-55；具体AST修法未找到Main逐项指令 | G3 §4.2/4.3 |
| [Pepgent commit e88987a](https://github.com/Pepgent/Pepgent/commit/e88987ac954c450f62fff5a8aa967e92d32df0b3) | git/API commit时间06:50:39Z；解构参数位置标签；comment6554633928；A，未找到leader逐修法指令 | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit ef57d03](https://github.com/Pepgent/Pepgent/commit/ef57d037be18c65275f86e33a30f724e4cb337a7) | git/API commit时间06:54:41Z；前置默认参数required位置/undefined；comment6554666600；A下私有修复 | X-29；X-55；具体AST修法未找到Main逐项指令 | G3 §4.2/4.3 |
| [Pepgent commit 5609e09](https://github.com/Pepgent/Pepgent/commit/5609e091e38ab3219d7935eb86fabc327f361bc5) | git/API commit时间07:09:10Z；D10 strict parser/plain nodes/editLibrary；B；feat/lab-10-library当前head | X-29；X-55；具体AST修法未找到Main逐项指令 | G3 §4.2/4.3 |
| [Pepgent commit 2705199](https://github.com/Pepgent/Pepgent/commit/2705199d15ea276e1a0a81ca189b3890852aaca0) | git/API commit时间07:13:17Z；WEB01异步snapshot/loader；D；feat/web-01-async-snapshot当前head | X-54；X-61 | G3 §4.2/4.3 |
| [Pepgent commit 6275a0a](https://github.com/Pepgent/Pepgent/commit/6275a0a2ca3c0ec99f2a82241f42ddcd651d5cc9) | git/API commit时间07:17:16Z；PR39 main squash；B | X-29；X-55；具体AST修法未找到Main逐项指令 | G3 §4.2/4.3 |
| [Pepgent commit 1246470](https://github.com/Pepgent/Pepgent/commit/12464701c02b8d50d32bad7f0fbf0cd13c5e7edd) | git/API commit时间07:20:40Z；evidence/pr-40当前head；`files`仅web-01-home.jpg；F | X-61 | G3 §4.2/4.3 |
| [Pepgent commit cbcd943](https://github.com/Pepgent/Pepgent/commit/cbcd94334aa8cc3187ecb9eb8bc5ffbed9b4e055) | git/API commit时间07:25:52Z；PR40 main squash；D/F | X-54；X-61 | G3 §4.2/4.3 |
| [Pepgent commit c445a22](https://github.com/Pepgent/Pepgent/commit/c445a22725055f6cdf9b4a7089152e2ac87221bf) | git/API commit时间08:05:27Z；issue13 comment6555349211提及旧LAB04实现；API仍可读，但不在当前heads去重列表；A/G/H/E的接续。不能只看当前refs漏掉此对象；旧引用API可读、不在当前heads去重列表 | X-29；V11A/V12/V13 | G3 §4.2/4.3 |
| [Pepgent commit 83b480a](https://github.com/Pepgent/Pepgent/commit/83b480a227c3c013300c4891516db5d81ba6d341) | git/API commit时间08:28:14Z；external remote/omp generator与精确parser，6文件；J/E；41 comment6555541696明确不冒充Lab schemas已交齐；未合main分支对象 | X-80；V12 | G3 §4.2/4.3 |
| [Pepgent commit 0ae89ef](https://github.com/Pepgent/Pepgent/commit/0ae89efa082128d06187623780788831744592e1) | git/API commit时间08:30:59Z；10文件：README、reason SQL/meta/journal、access、library-definition/operations/library/schema、auth test；K/L。feat/lab-d12-producer，尚未在shared wire branch；未合main分支对象 | X-82、X-84 | G3 §4.2/4.3 |
| [Pepgent commit 71a5145](https://github.com/Pepgent/Pepgent/commit/71a514533527cfd3d6c4ff45704c8c33b4fc096b) | git/API commit时间08:31:49Z；15个Lab schema文件，删除library-store手抄副本；J/E；未合main分支对象 | X-80；V12 | G3 §4.2/4.3 |
| [Pepgent commit 695daea](https://github.com/Pepgent/Pepgent/commit/695daea49f0c4aa981c89fa98af4b0ad3bd0ec15) | git/API commit时间08:32:23Z；feat/lab-root-sessions-eng3当前head；13文件：README、session-reference SQL/meta/journal、access/discussion-operations/library/mux-writer/runtime/schema/sessions与tests；A/G/H/E；未合main分支对象 | X-29；V11A/V12/V13 | G3 §4.2/4.3 |
| [Pepgent commit 4177b05](https://github.com/Pepgent/Pepgent/commit/4177b0523d6eafab4636910e9549a536ac4b8186) | git/API commit时间08:33:29Z；command/pages泛型相关parse映射；feat/web-02-lab-wire当前head；J/E；未合main分支对象 | X-80；V12 | G3 §4.2/4.3 |
| [Pepgent commit d0e6679](https://github.com/Pepgent/Pepgent/commit/d0e6679e24b167c86be34ec70969730f8323f40e) | git/API commit时间08:34:40Z；feat/web-02-lab-bridge当前head；client/api/call、services/lab-invalidation、services/lab；D/E。comment6555596871称准备分支未production接线、不可合并；未找到leader指令该具体独立Bridge分支；未合main分支对象 | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 978bc0e](https://github.com/Pepgent/Pepgent/commit/978bc0e1a990f0c586d6e24cb24d99d960bad6c5) | git/API commit时间06:05:39Z；aside tab gap/new wrapper | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 2d46c1d](https://github.com/Pepgent/Pepgent/commit/2d46c1d41721252af5edd6bdd42ad1446d1a76fa) | git/API commit时间06:19:36Z；automation/dataset tracks、menu viewport | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 286f8cb](https://github.com/Pepgent/Pepgent/commit/286f8cbff5a23902bbcd90000c456f3524c90871) | git/API commit时间06:22:29Z；prototype node header inset | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 1038aee](https://github.com/Pepgent/Pepgent/commit/1038aeec49c0cdb0ed4acc51431b1618b50acc1f) | git/API commit时间06:32:22Z；prototype table min-width/inset | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 21f4217](https://github.com/Pepgent/Pepgent/commit/21f4217b1bafbe30ddf03a1853caf41c110bb866) | git/API commit时间06:35:45Z；flow-editor 12px row inset | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit e44f068](https://github.com/Pepgent/Pepgent/commit/e44f068e307bdc5a4f9f70c77608c64ee2369e8c) | git/API commit时间06:50:12Z；prototype width static gate/tab classes | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit b212fb6](https://github.com/Pepgent/Pepgent/commit/b212fb69b7ab3e1c87fe841eb8bf28277d921ae5) | git/API commit时间06:58:28Z；prototype table tracks | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit a331057](https://github.com/Pepgent/Pepgent/commit/a3310574aef19ba4250df3bbd484583afee6814e) | git/API commit时间07:00:26Z；Merge origin/main，notices/conventions冲突 | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit f35103b](https://github.com/Pepgent/Pepgent/commit/f35103bc7d15be71df2feeeeb4b0c32348a857ff) | git/API commit时间07:22:28Z；clipping cell linebox/node refs inset | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit f7a3313](https://github.com/Pepgent/Pepgent/commit/f7a331391fe79cf8d03a0ed1445348e8c9f742e5) | git/API commit时间07:25:08Z；mono clipping linebox | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit a9756eb](https://github.com/Pepgent/Pepgent/commit/a9756ebc2e1076c29d4d3cdc6981827415fdec7b) | git/API commit时间07:37:32Z；native popover cap/prototype tab gap | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit d110c7c](https://github.com/Pepgent/Pepgent/commit/d110c7ca9418a848c370466f0b110b744ce4fdff) | git/API commit时间07:47:22Z；table min-width border term | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit e83c2f2](https://github.com/Pepgent/Pepgent/commit/e83c2f27e829bdfad1426b57c4c3370e9ac09af7) | git/API commit时间07:49:02Z；Lab menu native-popover文档例外 | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 9a6d455](https://github.com/Pepgent/Pepgent/commit/9a6d455cf86fb8be11f671c188114f67ad676e4c) | git/API commit时间08:04:11Z；serif title linebox/lint threshold | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [Pepgent commit 031d01c](https://github.com/Pepgent/Pepgent/commit/031d01c4f8ff5b0d8736ab9be4daaf9298d3ea08) | git/API commit时间08:09:34Z；Merge origin/main；main当前head | 未找到对应指令（G3同期prototype/UI/merge清单） | G3 §4.2/4.3 |
| [deploy commit 419a286](https://github.com/Pepgent/deploy/commit/419a286) | git 06:48:51Z；README本仓/统一S2分界；main可达 | X-39 | G4 §4.1 |
| [deploy commit 4589a17](https://github.com/Pepgent/deploy/commit/4589a17) | git 06:49:29Z；README串行部署/restart边界；具体文字未找到Main指令；main可达 | X-30（仅任务；具体选择未找到对应指令） | G4 §4.1 |
| [deploy commit 35d309f](https://github.com/Pepgent/deploy/commit/35d309f) | git 06:50:51Z；merge PR9；含起点前seed成果；main可达 | X-30 | G4 §4.1 |
| [deploy commit 925864a](https://github.com/Pepgent/deploy/commit/925864a) | git 07:13:07Z；release-init/overlay/README；main可达 | X-56、X-58 | G4 §4.1 |
| [deploy commit c29e216](https://github.com/Pepgent/deploy/commit/c29e216) | git 07:17:34Z；merge PR10；main可达 | X-56 | G4 §4.1 |
| [deploy commit 01b0fb4](https://github.com/Pepgent/deploy/commit/01b0fb4) | git 08:00:24Z；身份生产注入；初preview也写派生值；main可达 | X-68；preview私有选择未找到具体Main指令 | G4 §4.1 |
| [deploy commit b4be605](https://github.com/Pepgent/deploy/commit/b4be605) | git 08:08:04Z；preview改report-only，apply发布保留；main可达 | X-68；具体preview修正未找到Main指令 | G4 §4.1 |
| [deploy commit 26a0c8a](https://github.com/Pepgent/deploy/commit/26a0c8a) | git 08:15:12Z；merge PR12；REST合并09:15:13；main可达 | X-83 | G4 §4.1 |
| [images commit 64114c6](https://github.com/Pepgent/images/commit/64114c6) | 06:43:17；README包装验收/统一义务；另SIF段变化未找到专门Main指令 | X-32 | G5/G6 |
| [images commit 207f11a](https://github.com/Pepgent/images/commit/207f11a) | 06:47:17；merge PR8；main；含起点前Dockerfile迁移 | X-30 | G5/G6 |
| [lab-library commit 5c2ddcb](https://github.com/Pepgent/lab-library/commit/5c2ddcb) | 08时段（G6未列精确秒）；File节点/README，PR9/main | X-73；V11A | G5/G6 |
| [lab-library commit 8d291af](https://github.com/Pepgent/lab-library/commit/8d291af) | REST合并09:29:18；git源约早一小时；merge PR9/main | X-73 | G5/G6 |
| [lab-library commit beb07a9](https://github.com/Pepgent/lab-library/commit/beb07a9) | G6未列精确秒；README与13节点元数据，PR11/main；group/全0由owner自选 | X-76；具体分组/估时未找到Main指令 | G5/G6 |
| [lab-library commit 4cbb9f3](https://github.com/Pepgent/lab-library/commit/4cbb9f3) | git08:35:57；REST09:35:57；merge PR11/main | X-76 | G5/G6 |
| [omp-rpc-mux commit e004fa1](https://github.com/Pepgent/omp-rpc-mux/commit/e004fa1) | G6未列精确秒；README/design文档；PR14/main | X-85 | G5/G6 |
| [omp-rpc-mux commit 5affef9](https://github.com/Pepgent/omp-rpc-mux/commit/5affef9) | REST09:33:35；merge PR14/main | X-85 | G5/G6 |
| [remote commit 5e61f47](https://github.com/Pepgent/remote/commit/5e61f47) | G6未列精确秒；六文件OCI/remove；PR15 OPEN分支，未入main | X-85；V11B | G5/G6 |
| [soroi commit 8ebb43c](https://github.com/Pepgent/soroi/commit/8ebb43c) | git08:31:13Z；installer/central-entrypoint/3 README；PR280 OPEN分支，未入main | X-77 | G1 §3；R09 §5.3 |

### 3.3 评论对象

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| [PM issues/16 评论 6554709566](https://github.com/Pepgent/PM/issues/16#issuecomment-6554709566) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:00:15 | V10（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/16 评论 6555147816](https://github.com/Pepgent/PM/issues/16#issuecomment-6555147816) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:49:14 | V10（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/16 评论 6555157332](https://github.com/Pepgent/PM/issues/16#issuecomment-6555157332) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:50:20 | V10（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2 |
| [PM issues/17 评论 6555005097](https://github.com/Pepgent/PM/issues/17#issuecomment-6555005097) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:32:38 | V11A（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/17 评论 6555147809](https://github.com/Pepgent/PM/issues/17#issuecomment-6555147809) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:49:14 | V11A（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/17 评论 6555157295](https://github.com/Pepgent/PM/issues/17#issuecomment-6555157295) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:50:20 | V11A（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/17 评论 6555582864](https://github.com/Pepgent/PM/issues/17#issuecomment-6555582864) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:19 | V11A（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/18 评论 6555137690](https://github.com/Pepgent/PM/issues/18#issuecomment-6555137690) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:05 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555137904](https://github.com/Pepgent/PM/issues/18#issuecomment-6555137904) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:06 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555138095](https://github.com/Pepgent/PM/issues/18#issuecomment-6555138095) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:08 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555138270](https://github.com/Pepgent/PM/issues/18#issuecomment-6555138270) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:09 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555138530](https://github.com/Pepgent/PM/issues/18#issuecomment-6555138530) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:11 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555138704](https://github.com/Pepgent/PM/issues/18#issuecomment-6555138704) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:12 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555138875](https://github.com/Pepgent/PM/issues/18#issuecomment-6555138875) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:13 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555139017](https://github.com/Pepgent/PM/issues/18#issuecomment-6555139017) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:14 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555139249](https://github.com/Pepgent/PM/issues/18#issuecomment-6555139249) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:48:16 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/18 评论 6555272769](https://github.com/Pepgent/PM/issues/18#issuecomment-6555272769) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:01:07 | V13（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/19 评论 6555223977](https://github.com/Pepgent/PM/issues/19#issuecomment-6555223977) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:55:54 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/19 评论 6555223991](https://github.com/Pepgent/PM/issues/19#issuecomment-6555223991) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:55:54 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/19 评论 6555224179](https://github.com/Pepgent/PM/issues/19#issuecomment-6555224179) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:55:55 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/19 评论 6555224369](https://github.com/Pepgent/PM/issues/19#issuecomment-6555224369) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:55:56 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/19 评论 6555224545](https://github.com/Pepgent/PM/issues/19#issuecomment-6555224545) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:55:58 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/19 评论 6555224771](https://github.com/Pepgent/PM/issues/19#issuecomment-6555224771) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:55:59 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/19 评论 6555224961](https://github.com/Pepgent/PM/issues/19#issuecomment-6555224961) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:56:00 | V12（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S2 |
| [PM issues/20 评论 6555261723](https://github.com/Pepgent/PM/issues/20#issuecomment-6555261723) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:59:59 | V14（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/20 评论 6555261965](https://github.com/Pepgent/PM/issues/20#issuecomment-6555261965) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:00:00 | V14（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/20 评论 6555262182](https://github.com/Pepgent/PM/issues/20#issuecomment-6555262182) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:00:02 | V14（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/20 评论 6555262423](https://github.com/Pepgent/PM/issues/20#issuecomment-6555262423) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:00:03 | V14（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/20 评论 6555262688](https://github.com/Pepgent/PM/issues/20#issuecomment-6555262688) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:00:05 | V14（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S3 |
| [PM issues/21 评论 6555325536](https://github.com/Pepgent/PM/issues/21#issuecomment-6555325536) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:06:37 | V11B（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/21 评论 6555325698](https://github.com/Pepgent/PM/issues/21#issuecomment-6555325698) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:06:38 | V11B（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/21 评论 6555325814](https://github.com/Pepgent/PM/issues/21#issuecomment-6555325814) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:06:39 | V11B（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/G5/S1 |
| [PM issues/21 评论 6555325968](https://github.com/Pepgent/PM/issues/21#issuecomment-6555325968) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:06:40 | V11B（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/21 评论 6555403524](https://github.com/Pepgent/PM/issues/21#issuecomment-6555403524) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:14:33 | V11B（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/22 评论 6555577655](https://github.com/Pepgent/PM/issues/22#issuecomment-6555577655) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:32:42 | V11C（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/22 评论 6555577908](https://github.com/Pepgent/PM/issues/22#issuecomment-6555577908) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:32:44 | V11C（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [PM issues/22 评论 6555586372](https://github.com/Pepgent/PM/issues/22#issuecomment-6555586372) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:42 | V11C（表决内活动；主表为启动/协调指令）；具体逐字评论指令未找到时仅关联任务/同步流程 | G2/S1 |
| [Pepgent issues/13 评论 6554692597](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6554692597) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:58:15 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/13 评论 6554704678](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6554704678) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:59:41 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/13 评论 6555009251](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6555009251) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:07 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/13 评论 6555065945](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6555065945) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:39:42 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/13 评论 6555147218](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6555147218) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:49:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S3 |
| [Pepgent issues/13 评论 6555236053](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6555236053) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:57:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S2 |
| [Pepgent issues/13 评论 6555349211](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6555349211) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:09:03 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/14 评论 6555010013](https://github.com/Pepgent/Pepgent/issues/14#issuecomment-6555010013) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:12 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/14 评论 6555583493](https://github.com/Pepgent/Pepgent/issues/14#issuecomment-6555583493) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:23 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/15 评论 6554495646](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6554495646) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:34:54 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/15 评论 6554523653](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6554523653) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:38:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/15 评论 6554714168](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6554714168) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:00:45 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/15 评论 6554869286](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6554869286) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:17:38 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/15 评论 6555009843](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6555009843) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:11 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/15 评论 6555236034](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6555236034) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:57:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S2 |
| [Pepgent issues/17 评论 6555010412](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6555010412) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:15 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/17 评论 6555236012](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6555236012) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:57:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S2 |
| [Pepgent issues/17 评论 6555583688](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6555583688) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:24 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/18 评论 6555011240](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6555011240) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:21 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/19 评论 6555011030](https://github.com/Pepgent/Pepgent/issues/19#issuecomment-6555011030) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:19 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/20 评论 6555010665](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6555010665) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:17 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/20 评论 6555236039](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6555236039) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:57:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S2 |
| [Pepgent issues/21 评论 6554819439](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6554819439) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:12:12/07:12:55 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S2 |
| [Pepgent issues/21 评论 6555235996](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555235996) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:57:09 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S2 |
| [Pepgent issues/21 评论 6555259064](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555259064) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:59:41 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/21 评论 6555309747](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555309747) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:05:00 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/21 评论 6555384799](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555384799) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:12:39 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/21 评论 6555450789](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555450789) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:19:19 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/21 评论 6555513282](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555513282) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:25:22 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/21 评论 6555556962](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555556962) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:30:20 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S3 |
| [Pepgent issues/21 评论 6555583881](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555583881) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:25 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/21 评论 6555596871](https://github.com/Pepgent/Pepgent/issues/21#issuecomment-6555596871) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:34:54 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/22 评论 6554974055](https://github.com/Pepgent/Pepgent/issues/22#issuecomment-6554974055) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:29:08 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/22 评论 6555147032](https://github.com/Pepgent/Pepgent/issues/22#issuecomment-6555147032) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:49:09 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S3 |
| [Pepgent issues/24 评论 6555010833](https://github.com/Pepgent/Pepgent/issues/24#issuecomment-6555010833) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:18 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/26 评论 6555584060](https://github.com/Pepgent/Pepgent/issues/26#issuecomment-6555584060) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:27 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3/S1 |
| [Pepgent issues/41 评论 6555384553](https://github.com/Pepgent/Pepgent/issues/41#issuecomment-6555384553) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:12:37 | X-80、X-82、X-84；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/41 评论 6555428080](https://github.com/Pepgent/Pepgent/issues/41#issuecomment-6555428080) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:17:02 | X-80、X-82、X-84；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/41 评论 6555460770](https://github.com/Pepgent/Pepgent/issues/41#issuecomment-6555460770) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:20:21 | X-80、X-82、X-84；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/41 评论 6555541696](https://github.com/Pepgent/Pepgent/issues/41#issuecomment-6555541696) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:28:36 | X-80、X-82、X-84；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/41 评论 6555565945](https://github.com/Pepgent/Pepgent/issues/41#issuecomment-6555565945) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:31:21 | X-80、X-82、X-84；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/41 评论 6555571476](https://github.com/Pepgent/Pepgent/issues/41#issuecomment-6555571476) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:32:00 | X-80、X-82、X-84；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/9 评论 6554750362](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6554750362) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:04:47 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/9 评论 6554889595](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6554889595) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:19:52 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent issues/9 评论 6555030918](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6555030918) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:35:41 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554523865](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554523865) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:38:12 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554525460](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554525460) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:38:22 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554546782](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554546782) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:40:54 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554615009](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554615009) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:49:11 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554633928](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554633928) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:51:30 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554666600](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554666600) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:55:20 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554685386](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554685386) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:57:25 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554688658](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554688658) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:57:47 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554800687](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554800687) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:10:12 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554845228](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554845228) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:15:01 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/39 评论 6554863842](https://github.com/Pepgent/Pepgent/pull/39#issuecomment-6554863842) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:17:03 | X-29、X-55；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/40 评论 6554889826](https://github.com/Pepgent/Pepgent/pull/40#issuecomment-6554889826) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:19:54 | X-54、X-61；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/40 评论 6554905366](https://github.com/Pepgent/Pepgent/pull/40#issuecomment-6554905366) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:21:36 | X-54、X-61；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [Pepgent pull/40 评论 6554943426](https://github.com/Pepgent/Pepgent/pull/40#issuecomment-6554943426) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:25:49 | X-54、X-61；具体逐字评论指令未找到时仅关联任务/同步流程 | G3 |
| [deploy issues/1 评论 6554639579](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554639579) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:52:09 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/1 评论 6554681051](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554681051) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:56:55 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/1 评论 6554714166](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554714166) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:00:45 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4/S1 |
| [deploy issues/1 评论 6554797010](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554797010) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:09:51 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/1 评论 6554863471](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554863471) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:17:01 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/1 评论 6554875459](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554875459) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:18:19 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/1 评论 6555011547](https://github.com/Pepgent/deploy/issues/1#issuecomment-6555011547) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:23 | X-41、X-58；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G4/S1 |
| [deploy issues/11 评论 6555237900](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555237900) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:57:21 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/11 评论 6555273732](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555273732) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:01:13 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4/S3 |
| [deploy issues/11 评论 6555337051](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555337051) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:07:49 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/11 评论 6555419268](https://github.com/Pepgent/deploy/issues/11#issuecomment-6555419268) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:16:09 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/14 评论 6555604475](https://github.com/Pepgent/deploy/issues/14#issuecomment-6555604475) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:35:46 | X-83（新issue由工程师修正路由）；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/8 评论 6554589839](https://github.com/Pepgent/deploy/issues/8#issuecomment-6554589839) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:46:09 | X-38、X-39；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy issues/8 评论 6554631896](https://github.com/Pepgent/deploy/issues/8#issuecomment-6554631896) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:51:15 | X-38、X-39；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy pull/10 评论 6554867233](https://github.com/Pepgent/deploy/pull/10#issuecomment-6554867233) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:17:24 | X-56、X-58；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy pull/12 评论 6555361800](https://github.com/Pepgent/deploy/pull/12#issuecomment-6555361800) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:10:20 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy pull/12 评论 6555406386](https://github.com/Pepgent/deploy/pull/12#issuecomment-6555406386) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:14:51 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy pull/12 评论 6555408666](https://github.com/Pepgent/deploy/pull/12#issuecomment-6555408666) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:15:05 | X-68、X-83；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [deploy pull/9 评论 6554627398](https://github.com/Pepgent/deploy/pull/9#issuecomment-6554627398) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:50:44 | X-30、X-39；具体逐字评论指令未找到时仅关联任务/同步流程 | G4 |
| [images issues/3 评论 6555011783](https://github.com/Pepgent/images/issues/3#issuecomment-6555011783) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:24 | X-33；V10/V11A；具体逐字评论指令未找到时仅关联任务/同步流程 | G5/S1 |
| [images issues/6 评论 6554521128](https://github.com/Pepgent/images/issues/6#issuecomment-6554521128) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:37:53 | X-32、X-35、X-38；具体逐字评论指令未找到时仅关联任务/同步流程 | G5 |
| [images issues/6 评论 6554599994](https://github.com/Pepgent/images/issues/6#issuecomment-6554599994) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:47:21 | X-32、X-35、X-38；具体逐字评论指令未找到时仅关联任务/同步流程 | G5 |
| [images pull/8 评论 6554578276](https://github.com/Pepgent/images/pull/8#issuecomment-6554578276) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:44:46 | X-32、X-35、X-38；具体逐字评论指令未找到时仅关联任务/同步流程 | G5 |
| [images pull/8 评论 6554599116](https://github.com/Pepgent/images/pull/8#issuecomment-6554599116) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 06:47:15 | X-32、X-35、X-38；具体逐字评论指令未找到时仅关联任务/同步流程 | G5 |
| [lab-library issues/10 评论 6555572734](https://github.com/Pepgent/lab-library/issues/10#issuecomment-6555572734) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-76；V12；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [lab-library issues/10 评论 6555608423](https://github.com/Pepgent/lab-library/issues/10#issuecomment-6555608423) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-76；V12；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [lab-library issues/8 评论 6555449857](https://github.com/Pepgent/lab-library/issues/8#issuecomment-6555449857) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-73；V10/V11A；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [lab-library issues/8 评论 6555521177](https://github.com/Pepgent/lab-library/issues/8#issuecomment-6555521177) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-73；V10/V11A；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [lab-library issues/8 评论 6555550702](https://github.com/Pepgent/lab-library/issues/8#issuecomment-6555550702) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-73；V10/V11A；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [lab-library pull/9 评论 6555547168](https://github.com/Pepgent/lab-library/pull/9#issuecomment-6555547168) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-73；V10/V11A；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [omp-rpc-mux issues/13 评论 6555467069](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555467069) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-85；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [omp-rpc-mux issues/13 评论 6555587386](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555587386) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-85；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [remote pull/15 评论 6555564569](https://github.com/Pepgent/remote/pull/15#issuecomment-6555564569) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验 | X-85；V11B；具体逐字评论指令未找到时仅关联任务/同步流程 | G6 |
| [soroi issues/182 评论 6554754935](https://github.com/Pepgent/soroi/issues/182#issuecomment-6554754935) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:05:18 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/182 评论 6554761600](https://github.com/Pepgent/soroi/issues/182#issuecomment-6554761600) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:06:03 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/190 评论 6554745940](https://github.com/Pepgent/soroi/issues/190#issuecomment-6554745940) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:04:18 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/190 评论 6554749773](https://github.com/Pepgent/soroi/issues/190#issuecomment-6554749773) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:04:44 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/190 评论 6555009470](https://github.com/Pepgent/soroi/issues/190#issuecomment-6555009470) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:09 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/190 评论 6555491023](https://github.com/Pepgent/soroi/issues/190#issuecomment-6555491023) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:23:19 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/190 评论 6555531639](https://github.com/Pepgent/soroi/issues/190#issuecomment-6555531639) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:27:28 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/190 评论 6555552271](https://github.com/Pepgent/soroi/issues/190#issuecomment-6555552271) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:29:49 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/190 评论 6555583256](https://github.com/Pepgent/soroi/issues/190#issuecomment-6555583256) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:21 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/196 评论 6554746976](https://github.com/Pepgent/soroi/issues/196#issuecomment-6554746976) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:04:25 | X-52；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/196 评论 6554790108](https://github.com/Pepgent/soroi/issues/196#issuecomment-6554790108) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:09:08 | X-52；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/196 评论 6554839316](https://github.com/Pepgent/soroi/issues/196#issuecomment-6554839316) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:14:22 | X-52；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/199 评论 6555273331](https://github.com/Pepgent/soroi/issues/199#issuecomment-6555273331) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:01:11 | X-77；V14（旧关闭项仅新增同步）；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S3 |
| [soroi issues/203 评论 6554714136](https://github.com/Pepgent/soroi/issues/203#issuecomment-6554714136) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:00:45 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/203 评论 6554756493](https://github.com/Pepgent/soroi/issues/203#issuecomment-6554756493) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:05:28 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/203 评论 6554830438](https://github.com/Pepgent/soroi/issues/203#issuecomment-6554830438) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:13:23 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/203 评论 6554875246](https://github.com/Pepgent/soroi/issues/203#issuecomment-6554875246) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:18:18 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/205 评论 6554908672](https://github.com/Pepgent/soroi/issues/205#issuecomment-6554908672) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:21:58 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/205 评论 6555481792](https://github.com/Pepgent/soroi/issues/205#issuecomment-6555481792) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:22:28 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/211 评论 6555369430](https://github.com/Pepgent/soroi/issues/211#issuecomment-6555369430) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:06 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/214 评论 6555273540](https://github.com/Pepgent/soroi/issues/214#issuecomment-6555273540) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:01:12 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S3 |
| [soroi issues/214 评论 6555369824](https://github.com/Pepgent/soroi/issues/214#issuecomment-6555369824) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:08 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/215 评论 6554889468](https://github.com/Pepgent/soroi/issues/215#issuecomment-6554889468) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:19:51 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/215 评论 6554899875](https://github.com/Pepgent/soroi/issues/215#issuecomment-6554899875) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:21:00 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/215 评论 6555146892](https://github.com/Pepgent/soroi/issues/215#issuecomment-6555146892) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:49:08 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S3 |
| [soroi issues/215 评论 6555273100](https://github.com/Pepgent/soroi/issues/215#issuecomment-6555273100) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:01:09 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S3 |
| [soroi issues/215 评论 6555369643](https://github.com/Pepgent/soroi/issues/215#issuecomment-6555369643) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:07 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/219 评论 6554764899](https://github.com/Pepgent/soroi/issues/219#issuecomment-6554764899) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:06:24 | X-53；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/219 评论 6554808206](https://github.com/Pepgent/soroi/issues/219#issuecomment-6554808206) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:11:00 | X-53；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/219 评论 6554815658](https://github.com/Pepgent/soroi/issues/219#issuecomment-6554815658) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:11:47 | X-53；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/219 评论 6554919728](https://github.com/Pepgent/soroi/issues/219#issuecomment-6554919728) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:23:10 | X-53；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/220 评论 6554824918](https://github.com/Pepgent/soroi/issues/220#issuecomment-6554824918) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:12:47 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/220 评论 6554855746](https://github.com/Pepgent/soroi/issues/220#issuecomment-6554855746) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:16:09 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/220 评论 6554939546](https://github.com/Pepgent/soroi/issues/220#issuecomment-6554939546) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:25:23 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/220 评论 6555009684](https://github.com/Pepgent/soroi/issues/220#issuecomment-6555009684) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:33:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/220 评论 6555584347](https://github.com/Pepgent/soroi/issues/220#issuecomment-6555584347) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:28 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/222 评论 6555370003](https://github.com/Pepgent/soroi/issues/222#issuecomment-6555370003) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:09 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/224 评论 6554845672](https://github.com/Pepgent/soroi/issues/224#issuecomment-6554845672) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:15:04 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/224 评论 6554887844](https://github.com/Pepgent/soroi/issues/224#issuecomment-6554887844) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:19:40 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/226 评论 6554997232](https://github.com/Pepgent/soroi/issues/226#issuecomment-6554997232) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:31:42 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/228 评论 6555370444](https://github.com/Pepgent/soroi/issues/228#issuecomment-6555370444) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:11 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/229 评论 6555370178](https://github.com/Pepgent/soroi/issues/229#issuecomment-6555370178) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:10 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/231 评论 6555370915](https://github.com/Pepgent/soroi/issues/231#issuecomment-6555370915) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:14 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/232 评论 6555371117](https://github.com/Pepgent/soroi/issues/232#issuecomment-6555371117) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:15 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/233 评论 6555371326](https://github.com/Pepgent/soroi/issues/233#issuecomment-6555371326) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:17 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/235 评论 6555273925](https://github.com/Pepgent/soroi/issues/235#issuecomment-6555273925) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:01:14 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S3 |
| [soroi issues/235 评论 6555604680](https://github.com/Pepgent/soroi/issues/235#issuecomment-6555604680) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:35:48 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/245 评论 6555370620](https://github.com/Pepgent/soroi/issues/245#issuecomment-6555370620) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:12 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/250 评论 6555370786](https://github.com/Pepgent/soroi/issues/250#issuecomment-6555370786) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:13 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/259 评论 6555584587](https://github.com/Pepgent/soroi/issues/259#issuecomment-6555584587) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:33:30 | X-50；具体逐字评论指令未找到时仅关联任务/同步流程 | G1/S1 |
| [soroi issues/274 评论 6555331828](https://github.com/Pepgent/soroi/issues/274#issuecomment-6555331828) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:07:17 | X-81；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/274 评论 6555415022](https://github.com/Pepgent/soroi/issues/274#issuecomment-6555415022) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:15:43 | X-81；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/274 评论 6555451072](https://github.com/Pepgent/soroi/issues/274#issuecomment-6555451072) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:19:21 | X-81；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/275 评论 6555377443](https://github.com/Pepgent/soroi/issues/275#issuecomment-6555377443) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:11:54 | X-77；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi issues/275 评论 6555553953](https://github.com/Pepgent/soroi/issues/275#issuecomment-6555553953) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:30:00 | X-77；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/260 评论 6554845880](https://github.com/Pepgent/soroi/pull/260#issuecomment-6554845880) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:15:05 | X-52、X-63；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/260 评论 6554885336](https://github.com/Pepgent/soroi/pull/260#issuecomment-6554885336) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:19:23 | X-52、X-63；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/269 评论 6554835168](https://github.com/Pepgent/soroi/pull/269#issuecomment-6554835168) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:13:23 | X-52；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/269 评论 6555044337](https://github.com/Pepgent/soroi/pull/269#issuecomment-6555044337) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:37:12 | X-52；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/271 评论 6554852202](https://github.com/Pepgent/soroi/pull/271#issuecomment-6554852202) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:15:47 | X-51；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/271 评论 6554870585](https://github.com/Pepgent/soroi/pull/271#issuecomment-6554870585) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:17:46 | X-51；V10；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/272 评论 6554966864](https://github.com/Pepgent/soroi/pull/272#issuecomment-6554966864) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:28:21 | X-53；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/272 评论 6554983530](https://github.com/Pepgent/soroi/pull/272#issuecomment-6554983530) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 07:30:10 | X-53；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/278 评论 6555447901](https://github.com/Pepgent/soroi/pull/278#issuecomment-6555447901) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:19:01 | X-81；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |
| [soroi pull/279 评论 6555533726](https://github.com/Pepgent/soroi/pull/279#issuecomment-6555533726) | 评论：报告取回时存在；新增对象；正文/运行声明未由本索引复验；原报告列UTC 09:27:42 | X-52；具体逐字评论指令未找到时仅关联任务/同步流程 | G1 |

### 3.4 仓库文件与未提交文件

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| `pepgent-pm/evidence/inv/s01a193fd/LensArtifacts.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensClaims-todo-probe.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensClaims.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensContext.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensDecisions.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensDocContent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensEffort.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensEndState.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensPeers.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensRedirections.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensRightTrack.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensRole.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensRules.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensSubagents.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensToolFailures.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensUserIntent-inputs.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/LensUserIntent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice01.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice02.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice03.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice04.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice05.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice06.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice07.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice08-evidence-clarifications.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice08.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice09.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice10.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice11.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/s01a193fd/Slice12.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-15 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/argon/D10-intent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D10-repo-delivery.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D10-rounds.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D10-leader.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D10-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D10-mentor.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D8-mvp-scope.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D8-slice-issues.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D11A-rounds.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D11A-solo-ruling-review.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/D11-facts-A.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/inv/D11-facts-B.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11A-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11A-leader.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11A-mentor.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11A | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/argon/D13-intent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V13 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D13-contract-gaps.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V13 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D13-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V13 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D13-leader.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V13 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D13-mentor.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V13 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D2-components.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D3-network-mux.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D4-remote-exec.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D5-plugins-eval.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D6-store-service.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D7-lab-backend.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V10/V11A/V11B/V11C/V12（对应多次正文回写） | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/argon/D12-intent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D12-coverage.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D12-lab-wire.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D12-rounds.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D12-argon-r2.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D12-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D12-claude-r2.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D12-claude.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D12-mentor-r1.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D12-mentor-r2.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V12 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/argon/D14-intent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V14 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D14-release-identity.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V14 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D14-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V14 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D14-leader.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V14 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D14-mentor.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V14 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D11B-rounds.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11B | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D11B-solo-ruling-review.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11B | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11B-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11B | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11B-leader.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11B | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11B-mentor.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11B | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D11C-rounds.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11C | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/decisions/D11C-run-event-carrier.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11C | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11C-argon.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11C | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11C-leader.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11C | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/votes/D11C-mentor.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | V11C | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/boundary.jsonl` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/evidence.json` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/stdout.log` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/boundary.jsonl` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/evidence.json` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/stdout.log` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/auth-lazy-driver.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/concurrent-first-driver.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-failure-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/failure-driver.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-failure-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-failure-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-persistence-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-step-fixture.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/persistence-driver.mjs` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/boundary.jsonl` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/evidence.json` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/stdout.log` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/boundary.jsonl` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/evidence.json` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/stdout.log` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | 未找到这23文件PM归档的专门指令；工程任务X-29 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-pm/evidence/argon/D15-intent.md` | 仓库文件：报告取回main/远端已归档或已替换；多次提交按同一路径去重 | X-118 | G2 §6（F1–F19完整文件集合）；S1/S2/S3/S4 |
| `pepgent-soroi/AGENTS.md` | 报告列为提交中变更；是否main/未合以对应PR/commit行区分 | X-07、X-16；skill后X-26/X-92 | G1/G3/G4/G5/G6 |
| `pepgent-soroi/.omp/skills/tern-worker/SKILL.md` | 报告列为提交中变更；是否main/未合以对应PR/commit行区分 | X-07、X-16；skill后X-26/X-92 | G1/G3/G4/G5/G6 |
| `pepgent-soroi/.omp/agents/secretary.md` | 报告列为提交中变更；是否main/未合以对应PR/commit行区分 | X-07、X-16；skill后X-26/X-92 | G1/G3/G4/G5/G6 |
| `pepgent-soroi/.omp/agents/argon.md` | 报告列为提交中变更；是否main/未合以对应PR/commit行区分 | X-07、X-16；skill后X-26/X-92 | G1/G3/G4/G5/G6 |
| `pepgent-soroi/LEDGER.md` | main最新d51835f；S4后快照有未提交补录（与R12更早无差异快照并列） | X-19、X-27、X-36、X-88、X-100、X-118 | R02/R03/R10/R11/R12；S4 |
| `pepgent-soroi/.omp/WATCHDOG-LeaderCompliance.md` | main已新增32行；G6 eng-store-home快照index显示D，不据此归因删除 | X-101 | G1/S4/G6 |
| `pepgent-soroi/design/eval.md` | 正文已回写；分别见9b808c1/f73aa44/f56e0d1/e0b14cc | V11A/V11B/V11C/V12 | S1/S2；G1 |
| `pepgent-soroi/design/store.md` | 正文已回写；分别见9b808c1/f73aa44/f56e0d1/e0b14cc | V11A/V11B/V11C/V12 | S1/S2；G1 |
| `pepgent-soroi/design/intervention.md` | 正文已回写；分别见9b808c1/f73aa44/f56e0d1/e0b14cc | V11A/V11B/V11C/V12 | S1/S2；G1 |
| `pepgent-soroi/package.json` | PR278已合；SSE WIP还改contract；G6 staged状态不等根main变化 | X-81；X-51 | G1；R09 |
| `pepgent-soroi/bun.lock` | PR278已合；SSE WIP还改contract；G6 staged状态不等根main变化 | X-81；X-51 | G1；R09 |
| `pepgent-soroi/packages/store/README.md` | PR278已合；SSE WIP还改contract；G6 staged状态不等根main变化 | X-81；X-51 | G1；R09 |
| `pepgent-soroi/packages/store/src/contract.ts` | PR278已合；SSE WIP还改contract；G6 staged状态不等根main变化 | X-81；X-51 | G1；R09 |
| `pepgent-soroi/packages/store/test/contract.test.ts` | PR278已合；SSE WIP还改contract；G6 staged状态不等根main变化 | X-81；X-51 | G1；R09 |
| `pepgent-soroi/packages/store/src/server.ts` | SSE c1d7e53 WIP分支；G1部分只列basename，完整路径依其store范围；未合main | X-51；X-57；X-90 | R10:261；G1:150,179；G6:217–220 |
| `pepgent-soroi/packages/store/src/store.ts` | SSE c1d7e53 WIP分支；G1部分只列basename，完整路径依其store范围；未合main | X-51；X-57；X-90 | R10:261；G1:150,179；G6:217–220 |
| `pepgent-soroi/packages/store/src/releases.ts` | G6 eng-store-home staged列表为D；PR271主线有发行导入成果，两个快照不互推作者/时刻 | X-51；V10 | G6:218–222；G1 PR271 |
| `pepgent-soroi/packages/store/test/releases.test.ts` | G6 eng-store-home staged列表为D；PR271主线有发行导入成果，两个快照不互推作者/时刻 | X-51；V10 | G6:218–222；G1 PR271 |
| `pepgent-soroi/scripts/install.ts` | PR280五文件包含installer/entrypoint/3README；报告没有给第3个README完整路径，未补造 | X-77 | R09:109–113；G1 |
| `pepgent-soroi/compose/central-entrypoint.sh` | PR280五文件包含installer/entrypoint/3README；报告没有给第3个README完整路径，未补造 | X-77 | R09:109–113；G1 |
| `pepgent-soroi/README.md` | PR280五文件包含installer/entrypoint/3README；报告没有给第3个README完整路径，未补造 | X-77 | R09:109–113；G1 |
| `pepgent-soroi/packages/omp-soroi/README.md` | PR280五文件包含installer/entrypoint/3README；报告没有给第3个README完整路径，未补造 | X-77 | R09:109–113；G1 |
| `pepgent-soroi/design/subagent.md` | f8807bd仅恢复实现归属/抵消继承越入设计净变化；PR269净设计diff移除 | X-52 | G1:127–128 |
| `pepgent-soroi/e2e/README.md` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/package.json` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/README.md` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/session.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/standin/sse.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/f20.sh` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/f20.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/f21.sh` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/f21.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/lifecycle-check.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/lifecycle.md` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/lifecycle.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/local-smoke.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/owned-root.sh` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/pty/snapshot.ts` | eng-e2e-home/eng-e2e-226 dirty：前5 tracked M，其余??；未提交/未PR；作者/精确创建时刻报告未逐文件确认 | X-53 | G1 §7；G6 §5.1 |
| `pepgent-soroi/e2e/s1/README.md` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/e2e/s1/f05.spec.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/e2e/s1/local-smoke.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/e2e/s1/scenario.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/contract.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/eval/agent-body.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/eval/index.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/index.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/child/capture.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/main/agent-session.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/main/index.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/main/mux-writer.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/main/rpc-process.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/main/supervisor.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/protocol.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/packages/omp-soroi/src/subagent/visibility.ts` | G6 eng-store-home staged快照含M/D/A；不据status单独认定作者、创建时刻或业务回退已执行 | 未找到对应这些staged变动的具体指令；任务范围X-51/X-52/X-53 | G6:188–223 |
| `pepgent-soroi/compose.yaml` | 已派D13必填变量修改；未定位新issue/PR/交付，不写已改 | X-69 | R08:21 |
| `pepgent-soroi/compose.full.yaml` | 已派D13必填变量修改；未定位新issue/PR/交付，不写已改 | X-69 | R08:21 |
| `Pepgent/Pepgent/apps/web/src/server/lab/discussion-operations.ts` | LAB04 c445a22/695daea未合main分支；公开RPC未完成 | X-29；V11A/V12/V13 | R07:110–123；G3 |
| `Pepgent/Pepgent/apps/web/src/server/lab/schema.ts` | LAB04 c445a22/695daea未合main分支；公开RPC未完成 | X-29；V11A/V12/V13 | R07:110–123；G3 |
| `Pepgent/Pepgent/apps/web/resources/lab/migrations/0001_conversation-session-reference.sql` | LAB04 c445a22/695daea未合main分支；公开RPC未完成 | X-29；V11A/V12/V13 | R07:110–123；G3 |
| `Pepgent/Pepgent/apps/web/src/server/lab/access.ts` | 0ae89ef producer独立分支未入共享；runtime未执行 | X-82、X-84 | R10:51；G3:143 |
| `Pepgent/Pepgent/apps/web/src/server/lab/library-definition.ts` | 0ae89ef producer独立分支未入共享；runtime未执行 | X-82、X-84 | R10:51；G3:143 |
| `Pepgent/Pepgent/apps/web/src/server/lab/library-operations.ts` | 0ae89ef producer独立分支未入共享；runtime未执行 | X-82、X-84 | R10:51；G3:143 |
| `Pepgent/Pepgent/apps/web/src/server/lab/library.ts` | 0ae89ef producer独立分支未入共享；runtime未执行 | X-82、X-84 | R10:51；G3:143 |
| `Pepgent/Pepgent/apps/web/README.md` | PR39部分已main；后D12迁移仍分支，library-store副本删除见71a5145；原报告部分路径为shorthand，按明确apps/web/src域列 | X-29、X-80；V10/V12 | G3:123–125,144；R09:48 |
| `Pepgent/Pepgent/web-01-home.jpg` | evidence/pr-40截图-only分支1246470；不合main | X-61 | R06；G3 |
| `Pepgent/Pepgent/src/app/routes/_lab.tsx` | PR40实现六文件之一，main已合；完整路径如报告未列不补充 | X-54 | G3:125；R06:155 |
| `Pepgent/Pepgent/src/client/services/lab.ts` | PR40实现六文件之一，main已合；完整路径如报告未列不补充 | X-54 | G3:125；R06:155 |
| `pepgent-deploy/README.md` | main最终六tracked路径；overlay非活动，seed部分起点前实现 | X-30、X-68、X-58 | G4 §4.2 |
| `pepgent-deploy/komodo/syncs/central.toml` | main最终六tracked路径；overlay非活动，seed部分起点前实现 | X-30、X-68、X-58 | G4 §4.2 |
| `pepgent-deploy/scripts/central.py` | main最终六tracked路径；overlay非活动，seed部分起点前实现 | X-30、X-68、X-58 | G4 §4.2 |
| `pepgent-deploy/stacks/pepgent-central/compose.yaml` | main最终六tracked路径；overlay非活动，seed部分起点前实现 | X-30、X-68、X-58 | G4 §4.2 |
| `pepgent-deploy/stacks/pepgent-central/release-init.ts` | main最终六tracked路径；overlay非活动，seed部分起点前实现 | X-30、X-68、X-58 | G4 §4.2 |
| `pepgent-deploy/stacks/pepgent-central/release.compose.yaml` | main最终六tracked路径；overlay非活动，seed部分起点前实现 | X-30、X-68、X-58 | G4 §4.2 |
| `pepgent-images/Dockerfile` | PR8/main：Dockerfile改动源起点前d40585f；本轮README64114c6，额外SIF段具体指令未找到 | X-30、X-32 | G5 §2.4 |
| `pepgent-images/README.md` | PR8/main：Dockerfile改动源起点前d40585f；本轮README64114c6，额外SIF段具体指令未找到 | X-30、X-32 | G5 §2.4 |
| `pepgent-lab-library/README.md` | PR6/9/11 main文档；PR6实际README补丁起点前 | X-30、X-73、X-76 | G6 §4 |
| `pepgent-lab-library/nodes/run_gp.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/run_knn.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/run_lr.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/run_rf.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/run_svm.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/anneal.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/ask_human.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/calc.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/compare_scores.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/review.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/slow_step.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/text_only.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-lab-library/nodes/try_eval.ts` | 五run节点File与13节点JSDoc已随PR9/11合；分组/全0为owner决定；本索引未复验运行 | X-73、X-76 | G6:86–96；R08:158–159 |
| `pepgent-remote/README.md` | 5e61f47/PR15 OPEN，仅分支未main | X-85；V11B | G6:103 |
| `pepgent-remote/design/remote.md` | 5e61f47/PR15 OPEN，仅分支未main | X-85；V11B | G6:103 |
| `pepgent-remote/src/backend/slurm/mod.rs` | 5e61f47/PR15 OPEN，仅分支未main | X-85；V11B | G6:103 |
| `pepgent-remote/src/identity.rs` | 5e61f47/PR15 OPEN，仅分支未main | X-85；V11B | G6:103 |
| `pepgent-remote/src/model.rs` | 5e61f47/PR15 OPEN，仅分支未main | X-85；V11B | G6:103 |
| `pepgent-remote/src/ops.rs` | 5e61f47/PR15 OPEN，仅分支未main | X-85；V11B | G6:103 |
| `pepgent-omp-rpc-mux/README.md` | e004fa1/PR14已main；旧草稿接续，只有文档无Rust代码 | X-85 | G6:114–118 |
| `pepgent-omp-rpc-mux/design/mux.md` | e004fa1/PR14已main；旧草稿接续，只有文档无Rust代码 | X-85 | G6:114–118 |
| `soroi SSE WIP：database（R10/G1仅列basename，完整路径未给）` | c1d7e53六文件范围之一；WIP未合 | X-51；V11A/V11C | R10:261；G1:150 |
| `soroi SSE WIP：records（R10/G1仅列basename，完整路径未给）` | c1d7e53六文件范围之一；WIP未合 | X-51；V11A/V11C | R10:261；G1:150 |
| `soroi SSE WIP：streams（R10/G1仅列basename，完整路径未给）` | c1d7e53六文件范围之一；WIP未合 | X-51；V11A/V11C | R10:261；G1:150 |
| `deploy：lab-entrypoint.sh（报告未列完整路径）` | D14调用方未改；当前仅--home；deploy14 OPEN | X-78 | G4:145,239 |
| `Pepgent PR40：renderer README（报告缩写，未补全路径）` | PR40六实现文件之一，main已合 | X-54 | G3:125；R06:155 |
| `Pepgent PR40：bootstrap/lab-entry（报告缩写，未补全路径）` | PR40六实现文件之一，main已合 | X-54 | G3:125；R06:155 |
| `Pepgent PR40：renderer-services（报告缩写，未补全路径）` | PR40六实现文件之一，main已合 | X-54 | G3:125；R06:155 |
| `Pepgent PR40：platform/web/create-lab-services（报告缩写，未补全路径）` | PR40六实现文件之一，main已合 | X-54 | G3:125；R06:155 |
| `Pepgent apps/web：rpc/lab（G3文件表缩写）` | PR39/D12后续迁移涉及；library-store副本删除见71a5145；不补未列完整路径 | X-29；V10/V12 | G3:123–125,144 |
| `Pepgent apps/web：protocol/library（G3文件表缩写）` | PR39/D12后续迁移涉及；library-store副本删除见71a5145；不补未列完整路径 | X-29；V10/V12 | G3:123–125,144 |
| `Pepgent apps/web：protocol/library-store（G3文件表缩写）` | PR39/D12后续迁移涉及；library-store副本删除见71a5145；不补未列完整路径 | X-29；V10/V12 | G3:123–125,144 |
| `/Users/mouriya/Ext/worktrees/deploy-8/scripts/__pycache__/central.cpython-315.pyc` | 未跟踪文件；未读二进制；创建者/时间未确认 | 未找到对应指令 | G4:264 |
| `/Users/mouriya/Ext/worktrees/deploy-11/scripts/__pycache__/central.cpython-315.pyc` | 未跟踪文件；未读二进制；创建者/时间未确认 | 未找到对应指令 | G4:264 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/README.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/README.zh-CN.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/check.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/delete-guard-classify.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/delete-guard-eval.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/delete-guard-tool.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/delete-guard-windows.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/omp-config-update.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/session-urls-filter.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/session-urls-scanner.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/session-urls-window.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/tool-calls.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/tool-policy-nag-pty.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/watchdog-paths.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/windows-guard-steps.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m/ci/windows-guard.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/README.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/README.zh-CN.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/check.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/delete-guard-classify.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/delete-guard-eval.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/delete-guard-tool.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/delete-guard-windows.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/omp-config-update.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/session-urls-filter.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/session-urls-scanner.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/session-urls-window.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/tool-calls.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/tool-policy-nag-pty.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/watchdog-paths.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/windows-guard-steps.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m/ci/windows-guard.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/README.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/README.zh-CN.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/check.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/delete-guard-classify.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/delete-guard-eval.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/delete-guard-tool.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/delete-guard-windows.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/omp-config-update.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/session-urls-filter.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/session-urls-scanner.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/session-urls-window.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/tool-calls.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/tool-policy-nag-pty.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/watchdog-paths.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/windows-guard-steps.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m/ci/windows-guard.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/README.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/README.zh-CN.md` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/check.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/delete-guard-classify.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/delete-guard-eval.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/delete-guard-tool.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/delete-guard-windows.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/omp-config-update.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/session-urls-filter.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/session-urls-scanner.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/session-urls-window.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/tool-calls.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/tool-policy-nag-pty.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/watchdog-paths.test.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/windows-guard-steps.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m/ci/windows-guard.ts` | G6 status为未暂存D；owner/产生时间未确认，不认定本会话造成 | 未找到对应指令 | G6:229–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/biome.jsonc` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/knip.json` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/patches/@astryxdesign+cli+0.5.2.patch` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/patches/@astryxdesign+core+0.5.2.patch` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/patches/@opencode-ai+sdk+1.14.46.patch` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/patches/README.md` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m/tsconfig.base.json` | G6 status为未暂存D；路径版本串照报告对象名原样，不是本次实现选版 | 未找到对应指令 | G6:235–239 |
| `Pepgent producer：0001_library-staging-reason.sql（报告未列完整路径）` | 0ae89ef producer独立分支未入共享；runtime未执行 | X-82、X-84 | R10:51；G3:143 |
| `soroi install-check：verify.ts（报告用目录域+basename定位）` | 迁移pid→ProcessRef指令；PR260 OPEN；报告没有交付完成证据（该路径由R06 verify.ts/install-check归属定位） | X-63 | R06:95–101 |
| 报告只给数量/缩写、未给完整逐文件名的集合 | 包括G1部分6/8/11文件commit、G3 PR39的19文件及schema/generated/migration meta/journal集合、PR280第三README等；不得补造路径 | 未找到逐文件对应指令；已能定位commit/PR与任务行；见C-36 | G1/G3；R09 |

### 3.5 真实父子边、Project与标签关联

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| 图关系 `images6 → deploy8` | 06:46:09 DELETE；当前不存在 | X-38 | G4:C02；G5 §2.3 |
| 图关系 `images3 → deploy8` | 06:46:11 POST；当前存在，child已CLOSED | X-38 | G4:C02；G5 §2.3 |
| 图关系 `PM8 → images9` | 07:35:51新增；当前存在，images9 OPEN | V11A；逐边Main指令未找到 | G2 §4.2；G5 §2.3 |
| 图关系 `Pepgent21 → Pepgent41` | REST09:12:26真实父子边新增；当前存在，41 OPEN | X-80 | G3 §3.2/§6 |
| 图关系 `PM21 → soroi276` | REST09:11:02–06新增；当前存在，child OPEN | V11B；秘书合同建实现项，逐边Main指令未找到 | G2 §4.2 |
| 图关系 `PM21 → soroi277` | REST09:11:02–06新增；当前存在，child OPEN | V11B；秘书合同建实现项，逐边Main指令未找到 | G2 §4.2 |
| 图关系 `PM21 → remote14` | REST09:11:02–06新增；当前存在，child OPEN | V11B；秘书合同建实现项，逐边Main指令未找到 | G2 §4.2 |
| 图关系 `PM21 → images10` | REST09:11:02–06新增；当前存在，child OPEN | V11B；秘书合同建实现项，逐边Main指令未找到 | G2 §4.2 |
| 图关系 `PM21 → deploy13` | REST09:11:02–06新增；当前存在，child OPEN | V11B；秘书合同建实现项，逐边Main指令未找到 | G2 §4.2 |
| [PM16](https://github.com/Pepgent/PM/issues/16) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V10 | G2 §4.1 |
| [PM16](https://github.com/Pepgent/PM/issues/16) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V10 | G2 §4.1（含逐item ID/事件时间） |
| [PM17](https://github.com/Pepgent/PM/issues/17) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V11A | G2 §4.1 |
| [PM17](https://github.com/Pepgent/PM/issues/17) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V11A | G2 §4.1（含逐item ID/事件时间） |
| [PM18](https://github.com/Pepgent/PM/issues/18) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V13 | G2 §4.1 |
| [PM18](https://github.com/Pepgent/PM/issues/18) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V13 | G2 §4.1（含逐item ID/事件时间） |
| [PM19](https://github.com/Pepgent/PM/issues/19) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V12 | G2 §4.1 |
| [PM19](https://github.com/Pepgent/PM/issues/19) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V12 | G2 §4.1（含逐item ID/事件时间） |
| [PM20](https://github.com/Pepgent/PM/issues/20) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V14 | G2 §4.1 |
| [PM20](https://github.com/Pepgent/PM/issues/20) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V14 | G2 §4.1（含逐item ID/事件时间） |
| [PM21](https://github.com/Pepgent/PM/issues/21) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V11B | G2 §4.1 |
| [PM21](https://github.com/Pepgent/PM/issues/21) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V11B | G2 §4.1（含逐item ID/事件时间） |
| [PM22](https://github.com/Pepgent/PM/issues/22) 的 `decision` 标签关联 | 本轮新增关联；不据labels API推断标签定义本轮新建 | V11C | G2 §4.1 |
| [PM22](https://github.com/Pepgent/PM/issues/22) 的 Project1 item | 本轮新增成员并关闭后Done；对象记录状态非产品验收 | V11C | G2 §4.1（含逐item ID/事件时间） |
| [PM13](https://github.com/Pepgent/PM/issues/13) 的组织 Project item | Todo；本轮未改字段；未找到Main逐事件手工改Status指令 | X-50 | G2/G3/G4/G5 |
| [PM14](https://github.com/Pepgent/PM/issues/14) 的组织 Project item | Todo；本轮未改字段；未找到Main逐事件手工改Status指令 | X-50 | G2/G3/G4/G5 |
| [PM15](https://github.com/Pepgent/PM/issues/15) 的组织 Project item | Todo；本轮未改字段；未找到Main逐事件手工改Status指令 | X-50 | G2/G3/G4/G5 |
| [Pepgent9](https://github.com/Pepgent/Pepgent/issues/9) 的组织 Project item | Done；开PR/关闭相关bot事件；未找到Main逐事件手工改Status指令 | X-54 | G2/G3/G4/G5 |
| [Pepgent15](https://github.com/Pepgent/Pepgent/issues/15) 的组织 Project item | Done；关闭相关bot事件；未找到Main逐事件手工改Status指令 | X-29 | G2/G3/G4/G5 |
| [Pepgent41](https://github.com/Pepgent/Pepgent/issues/41) 的组织 Project item | 新增Todo；bot入Project；未找到Main逐事件手工改Status指令 | X-80 | G2/G3/G4/G5 |
| [deploy1](https://github.com/Pepgent/deploy/issues/1) 的组织 Project item | Done；PR10关闭相关bot事件；未找到Main逐事件手工改Status指令 | X-30 | G2/G3/G4/G5 |
| [deploy8](https://github.com/Pepgent/deploy/issues/8) 的组织 Project item | Done；PR9关闭相关bot事件；未找到Main逐事件手工改Status指令 | X-30 | G2/G3/G4/G5 |
| [deploy13](https://github.com/Pepgent/deploy/issues/13) 的组织 Project item | 新增Todo；未找到Main逐事件手工改Status指令 | V11B | G2/G3/G4/G5 |
| [images6](https://github.com/Pepgent/images/issues/6) 的组织 Project item | Done；PR8相关bot事件；未找到Main逐事件手工改Status指令 | X-30 | G2/G3/G4/G5 |
| [images9](https://github.com/Pepgent/images/issues/9) 的组织 Project item | 新增Todo；未找到Main逐事件手工改Status指令 | V11A | G2/G3/G4/G5 |
| [images10](https://github.com/Pepgent/images/issues/10) 的组织 Project item | 新增Todo；未找到Main逐事件手工改Status指令 | V11B | G2/G3/G4/G5 |

### 3.6 分支与主线ref

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| `Pepgent/soroi refs/heads/eng/e2e-182` | 07:05:06创建；e2663c1，无新实现，核已有代码后跳过 | X-53 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-203-release-import` | 07:05:17创建；local快进d2c68e2，remote保留44ffa3f | X-51 | G1 §4 |
| `Pepgent/soroi refs/heads/eng/e2e-219` | 07:06:03创建；e5ad62d，本地/远端存在 | X-53 | G1 §4 |
| `Pepgent/soroi refs/heads/eng/e2e-220` | 07:11:49创建；97b83ce，PR272 OPEN | X-53 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-215-environment-identity` | 07:19:51创建后切去205；d2c68e2，未见发布ref | X-52；V13 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-205-spawn-capture` | 07:21:57创建；5b0ebd8，PR279合，分支保留 | X-52 | G1 §4 |
| `Pepgent/soroi refs/heads/eng/e2e-226` | 07:31:41创建；d2c68e2、dirty未提交 | X-53 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-store-contract-exports` | 08:05:45创建；452c385，PR278合分支保留 | X-81 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-275-artifact-install-identity` | 08:28:07创建；8ebb43c，PR280 OPEN | X-77 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-196-mux-writer` | 既有分支本轮重基8cfd7e6/修f8807bd，local快进6a4b0b7，remote保留f8807bd | X-52 | G1 §4 |
| `Pepgent/soroi refs/heads/issue-190-durable-sse` | 既有分支旧patch保留，c1d7e53已push，WIP未PR | X-51 | G1 §4 |
| `Pepgent/soroi refs/heads/eng/install-check-224` | 既有分支同步main成1b834c9，07:19:22 push；PR260 OPEN | X-52、X-53 | G1 §4 |
| `Pepgent/Pepgent refs/heads/feat/lab-10-library` | 5609e09，PR39已合；除有reflog明确时刻者，不以tip时间当创建时间 | X-54、X-29 | G3/G4/G5/G6 refs表 |
| `Pepgent/Pepgent refs/heads/feat/web-01-async-snapshot` | 2705199，PR40已合；除有reflog明确时刻者，不以tip时间当创建时间 | X-54、X-29 | G3/G4/G5/G6 refs表 |
| `Pepgent/Pepgent refs/heads/evidence/pr-40` | 1246470单图，不合main；除有reflog明确时刻者，不以tip时间当创建时间 | X-61 | G3/G4/G5/G6 refs表 |
| `Pepgent/Pepgent refs/heads/feat/lab-root-sessions-eng3` | 695daea未合；除有reflog明确时刻者，不以tip时间当创建时间 | X-54、X-29 | G3/G4/G5/G6 refs表 |
| `Pepgent/Pepgent refs/heads/feat/web-02-lab-wire` | 4177b05未合；除有reflog明确时刻者，不以tip时间当创建时间 | X-54、X-29 | G3/G4/G5/G6 refs表 |
| `Pepgent/Pepgent refs/heads/feat/lab-d12-producer` | 0ae89ef未入shared未合；除有reflog明确时刻者，不以tip时间当创建时间 | X-54、X-29 | G3/G4/G5/G6 refs表 |
| `Pepgent/Pepgent refs/heads/feat/web-02-lab-bridge` | d0e6679准备分支未接生产，不可合；除有reflog明确时刻者，不以tip时间当创建时间 | 未找到独立Bridge分支的具体指令；任务X-54 | G3/G4/G5/G6 refs表 |
| `Pepgent/deploy refs/heads/issue-1-release-init` | 06:54:04创建，925864a，合main后保留；除有reflog明确时刻者，不以tip时间当创建时间 | X-30、X-68 | G3/G4/G5/G6 refs表 |
| `Pepgent/deploy refs/heads/issue-11-central-identity` | 07:56:14创建，b4be605，合main后保留；除有reflog明确时刻者，不以tip时间当创建时间 | X-30、X-68 | G3/G4/G5/G6 refs表 |
| `Pepgent/deploy refs/heads/issue-8-lab-auth-seed` | 既有分支本轮新增两README commit，4589a17；合后保留；除有reflog明确时刻者，不以tip时间当创建时间 | X-30、X-68 | G3/G4/G5/G6 refs表 |
| `Pepgent/images refs/heads/issue-6-lab-web-live` | 既有分支本轮64114c6、已push，PR8合后保留；除有reflog明确时刻者，不以tip时间当创建时间 | X-30 | G3/G4/G5/G6 refs表 |
| `Pepgent/lab-library refs/heads/issue-8-file-input` | PR9分支，已合main；除有reflog明确时刻者，不以tip时间当创建时间 | X-73、X-76 | G3/G4/G5/G6 refs表 |
| `Pepgent/lab-library refs/heads/issue-10-node-metadata` | PR11分支，已合main；除有reflog明确时刻者，不以tip时间当创建时间 | X-73、X-76 | G3/G4/G5/G6 refs表 |
| `Pepgent/remote refs/heads/issue-14-slurm-oci` | 5e61f47，PR15 OPEN，local/origin同名分支；除有reflog明确时刻者，不以tip时间当创建时间 | X-85 | G3/G4/G5/G6 refs表 |
| `Pepgent/omp-rpc-mux refs/heads/issue-13-mux-design` | 旧dirty文档分支接续后PR14已合；当前worktree list不含旧树；除有reflog明确时刻者，不以tip时间当创建时间 | X-85 | G3/G4/G5/G6 refs表 |
| `Pepgent/soroi main / origin/main（各自状态如报告）` | 报告取样main=d51835f；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/PM main / origin/main（各自状态如报告）` | 报告取样main=37e6c73；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/Pepgent main / origin/main（各自状态如报告）` | 报告取样main=031d01c；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/deploy main / origin/main（各自状态如报告）` | 报告取样main=26a0c8a；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/images main / origin/main（各自状态如报告）` | 报告取样main=207f11a；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/lab-library main / origin/main（各自状态如报告）` | 报告取样main=4cbb9f3；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/remote main / origin/main（各自状态如报告）` | 报告取样main=1c2408d（新PR未合）；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |
| `Pepgent/omp-rpc-mux main / origin/main（各自状态如报告）` | 报告取样main=5affef9；origin/main仅本地跟踪副本，不自动证明取样时远端同步 | 见该仓逐commit/PR行；不是一条Main逐字指令 | G1–G6 |

### 3.7 Worktree、工作目录及session目录

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| `/Users/mouriya/Ext/worktrees/deploy-1` | birth 06:54:04Z（stat元数据，非指令时刻）；issue-1-release-init...origin/issue-1-release-init；clean；birth S#91792790的DEP-03任务；S#e1e726b2，06:53:53Z明确用git worktree add而不等wt，临时保持PR不合并；S#97347527，06:54:53Z工程师回报“已…建deploy-1”Z（stat元数据）；自身无.git，分支/status N/A | X-43；X-30 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/deploy-11` | birth 07:56:14Z（stat元数据，非指令时刻）；issue-11-central-identity...origin/issue-11-central-identity；?? scripts/__pycache__/；birth S#40858ec9，07:50:14Z派D13-02中心identity注入；S#9c307be8，08:02:09Z派deploy issue11 installer --artifact；S#045b27e0，08:10:35Z要求PR12只保留D13、D14另PRZ（stat元数据）；自身无.git，分支/status N/A | X-68 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-e2e-home` | birth 07:02:07Z（stat元数据，非指令时刻）；eng/e2e-226...origin/main [behind 17]；dirty E2E（明细下表） | X-53 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-lab3-home` | birth 06:32:54Z（stat元数据，非指令时刻）；feat/lab-root-sessions-eng3...origin/main [ahead 1]；clean；birth S#4b171c8a→结果#52fa711a，06:32:54Z创建home（detached16fe1f2，APFS clone）；S#f29e3dcb→结果#57be69b8，06:32:58Z mkdir；#4cc3b570/#3d4b02ad启动；#91792790派工Z（stat元数据）；自身无.git，分支/status N/A | X-29 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-plugin-home` | birth 07:02:07Z（stat元数据，非指令时刻）；issue-275-artifact-install-identity...origin/issue-275-artifact-install-identity；clean | X-52 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-store-home` | birth 07:02:07Z（stat元数据，非指令时刻）；main...origin/main；staged dirty（明细下表）；birth S#9441aa0c，07:02:07Z四条worktree add；S#2f272901，07:02:14Z mkdir；S#89bcdc5a启动；S#c181860c，07:03:33Z四份brief，WEB从lab3拆出Z（stat元数据）；自身无.git，分支/status N/A | X-51 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-web-01` | birth 07:04:22Z（stat元数据，非指令时刻）；HEAD (no branch)；clean；birth S#c181860c派WEB-01..07；目录分支为detachedZ（stat元数据）；自身无.git，分支/status N/A | X-54；X-80 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-web-02` | birth 07:58:41Z（stat元数据，非指令时刻）；feat/web-02-lab-wire...origin/feat/web-02-lab-wire；clean；birth S#3e1bb5ff，08:03:41Z schema-first；S#aa7ad0c9，08:05:25Z让lab3 producer直接推同一feat/web-02-lab-wire；S#46184283，08:15:36Z扩issue41范围Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-web-02b` | birth 08:33:07Z（stat元数据，非指令时刻）；feat/web-02-lab-bridge...origin/feat/web-02-lab-bridge；clean；birth S#c181860c的WEB-02任务；S#3e1bb5ff明确首PR只含schema、不含LabBridgeZ（stat元数据）；自身无.git，分支/status N/A | X-54；X-80 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/eng-web-home` | birth 07:02:07Z（stat元数据，非指令时刻）；HEAD (no branch)；clean | X-54；X-80 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/issue-14-slurm-oci-d2a2e42` | birth 08:17:48Z（stat元数据，非指令时刻）；issue-14-slurm-oci...origin/issue-14-slurm-oci；clean；birth S#ec6e29a2（08:16:36Z mkdir）、#93cd8614启动、#c8c4497f/#7246f182派remote14；S#8756f1f8（08:29:39Z）恢复命令明确使用该worktree路径Z（stat元数据）；自身无.git，分支/status N/A | X-85 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/library-10` | birth 08:30:26Z（stat元数据，非指令时刻）；issue-10-node-metadata...origin/issue-10-node-metadata；clean；birth S#f9f270af（07:58:07Z）派元数据；issue10 STARTED明确工作入口library-10Z（stat元数据）；自身无.git，分支/status N/A | X-76 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/library-8` | birth 08:19:20Z（stat元数据，非指令时刻）；issue-8-file-input...origin/issue-8-file-input；clean；birth S#193ba4c0（07:51:50Z）派issue8；对象owner=eng-opsZ（stat元数据）；自身无.git，分支/status N/A | X-73 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade` | birth 07:27:34Z（stat元数据，非指令时刻）；N/A；N/A，内有m/ checkout；birth 根events 05:46:24–10:02Z精确字符串查询无命中；已列真实路径与statusZ（stat元数据）；自身无.git，分支/status N/A | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb` | birth 07:25:46Z（stat元数据，非指令时刻）；N/A；N/A，内有m/ checkout | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1` | birth 07:24:56Z（stat元数据，非指令时刻）；N/A；N/A，内有m/ checkout | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c` | birth 06:55:44Z（stat元数据，非指令时刻）；N/A；N/A，内有m/ checkout | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/tf620c8462` | birth 07:25:02Z（stat元数据，非指令时刻）；N/A；N/A，内有m/ checkout | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e` | birth 07:02:14Z（stat元数据，非指令时刻）；N/A；无.git | X-53 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3` | birth 06:32:58Z（stat元数据，非指令时刻）；N/A；无.git；birth S#4b171c8a→结果#52fa711a，06:32:54Z创建home（detached16fe1f2，APFS clone）；S#f29e3dcb→结果#57be69b8，06:32:58Z mkdir；#4cc3b570/#3d4b02ad启动；#91792790派工Z（stat元数据）；自身无.git，分支/status N/A | X-29 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops` | birth 06:32:58Z（stat元数据，非指令时刻）；N/A；无.git；birth S#4b171c8a→结果#52fa711a，06:32:54Z创建home（detached16fe1f2，APFS clone）；S#f29e3dcb→结果#57be69b8，06:32:58Z mkdir；#4cc3b570/#3d4b02ad启动；#91792790派工Z（stat元数据）；自身无.git，分支/status N/A | X-30 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin` | birth 07:02:14Z（stat元数据，非指令时刻）；N/A；无.git | X-52 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-rt` | birth 08:16:36Z（stat元数据，非指令时刻）；N/A；无.git；birth S#ec6e29a2（08:16:36Z mkdir）、#93cd8614启动、#c8c4497f/#7246f182派remote14；S#8756f1f8（08:29:39Z）恢复命令明确使用该worktree路径Z（stat元数据）；自身无.git，分支/status N/A | X-85 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store` | birth 07:02:14Z（stat元数据，非指令时刻）；N/A；无.git | X-51 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web` | birth 07:02:14Z（stat元数据，非指令时刻）；N/A；无.git | X-54；X-80 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/t9c99fbade/m` | birth 2026-09-06T11:48:18ZZ（stat元数据，非指令时刻）；main...origin/main；下列ci删除列表 | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/td6f2e23eb/m` | birth 2026-09-06T11:48:18ZZ（stat元数据，非指令时刻）；main...origin/main；同列表 | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/td9707c5b1/m` | birth 2026-09-06T11:48:18ZZ（stat元数据，非指令时刻）；main...origin/main；同列表 | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/tf620c8462/m` | birth 2026-09-06T11:48:18ZZ（stat元数据，非指令时刻）；main...origin/main；同列表 | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/tf1cbc382c/m` | birth 2026-09-22T15:54:28ZZ（stat元数据，非指令时刻）；main...origin/main [ahead 40, behind 4]；下列7个删除路径 | 未找到对应指令（G6精确路径查询无命中） | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions` | birth 06:32:58Z（stat元数据）；自身无.git，分支/status N/A | X-29 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions` | birth 06:32:58Z（stat元数据）；自身无.git，分支/status N/A | X-30 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions` | birth 07:02:14Z（stat元数据）；自身无.git，分支/status N/A | X-53 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions` | birth 07:02:14Z（stat元数据）；自身无.git，分支/status N/A | X-52 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions` | birth 07:02:14Z（stat元数据）；自身无.git，分支/status N/A | X-51 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions` | birth 07:02:14Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-rt/sessions` | birth 08:16:36Z（stat元数据）；自身无.git，分支/status N/A | X-85 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d` | birth 07:03:36Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b` | birth 07:03:36Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259` | birth 07:03:36Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799` | birth 06:33:33Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac` | birth 06:33:40Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-rt/sessions/2026-11-01T08-16-40-984Z_01a1962e-a218-766a-bfd2-4e6408b33c51` | birth 08:18:00Z（stat元数据）；自身无.git，分支/status N/A | X-85；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4` | birth 07:03:40Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/CaptureConsumerVerify` | birth 07:22:24Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/D13InjectionFacts` | birth 08:28:00Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/LibraryFacts` | birth 07:13:05Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/LifecycleVerify` | birth 08:24:48Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/NativePtyFacts` | birth 07:27:36Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/ReviewCaptures` | birth 07:23:23Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/ReviewF05` | birth 07:09:06Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/ReviewLifecycle` | birth 08:24:57Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/local` | birth 07:06:58Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/local/task-log` | birth 07:06:58Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions/2026-11-01T07-02-22-332Z_01a195ea-997c-7088-aede-701b11b4b73d/local/inv` | birth 07:08:09Z（stat元数据）；自身无.git，分支/status N/A | X-53；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/D12LibraryFixture` | birth 08:18:41Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab04AuthAdapt` | birth 08:01:38Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab04CoreReview` | birth 07:45:31Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab04Fixture` | birth 07:29:08Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab04WireFacts` | birth 06:44:45Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab10ConversionReview` | birth 06:55:53Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab10D10Review` | birth 07:11:55Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab10FinalReview` | birth 06:52:00Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab10FixedReview` | birth 06:46:43Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/Lab10Review` | birth 06:36:20Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/local` | birth 06:36:06Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799/local/task-log` | birth 06:36:06Z（stat元数据）；自身无.git，分支/status N/A | X-29；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/DeploySeedReview` | birth 06:48:36Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/IdentityReview` | birth 08:02:06Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/ImagesReview` | birth 06:42:36Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/LibraryFileReview` | birth 08:27:39Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/LibraryMetadataReview` | birth 08:35:19Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/LibraryReview` | birth 06:35:25Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/ReleaseReview` | birth 07:07:08Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/SyncFreshness` | birth 08:02:39Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/local` | birth 06:39:11Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions/2026-11-01T06-33-03-016Z_01a195cf-c128-724a-a38a-0d374edd16ac/local/task-log` | birth 06:39:11Z（stat元数据）；自身无.git，分支/status N/A | X-30；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/CollectPluginContracts` | birth 07:10:36Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/RecordD12SlotIssue` | birth 08:01:07Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/RecordD14InstallIssue` | birth 08:05:27Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/ReviewCapture205` | birth 07:49:54Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/ReviewInstall275` | birth 08:35:56Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/ReviewMux269` | birth 07:09:29Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/VerifyCaptureRuntime` | birth 07:44:56Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/local` | birth 07:06:32Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions/2026-11-01T07-02-22-120Z_01a195ea-98a8-725d-8693-a0e215b8dd2b/local/task-log` | birth 07:06:32Z（stat元数据）；自身无.git，分支/status N/A | X-52；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/ArchiveDocs` | birth 07:05:55Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/ContractReview` | birth 08:16:12Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/ReleaseAudit` | birth 07:10:18Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/ReleasePRReview` | birth 07:15:43Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/StreamLifetime` | birth 07:06:22Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/local` | birth 07:06:20Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions/2026-11-01T07-02-22-126Z_01a195ea-98ae-721a-addf-9e9f4b0ac0b4/local/task-log` | birth 07:06:20Z（stat元数据）；自身无.git，分支/status N/A | X-51；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/BrowserProbe` | birth 07:07:42Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/OmpSchemaProbe` | birth 08:03:38Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/RemoteSchemaProbe` | birth 08:00:41Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/StoreSourceProbe` | birth 07:59:44Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/Web01MergedAcceptance` | birth 07:27:29Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/Web01Review` | birth 07:22:40Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/ZodSchemaProbe` | birth 08:00:19Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/local` | birth 07:06:26Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259/local/task-log` | birth 07:06:26Z（stat元数据）；自身无.git，分支/status N/A | X-54；X-80；后代目录只关联worker任务，逐名创建指令未找到 | G6 §5/§6 |
| `/Users/mouriya/Ext/worktrees/deploy-8` | issue-8-lab-auth-seed；既有树，4589a17；?? scripts/__pycache__/central.cpython-315.pyc；非本轮新建 | X-30 | G1/G4/G5/G6 |
| `/Users/mouriya/ext/worktrees/issue-6-lab-web-live-75a9ab7` | issue-6-lab-web-live；既有树，64114c6，clean；非本轮新建 | X-30 | G1/G4/G5/G6 |
| `/Users/mouriya/Ext/worktrees/issue-190-durable-sse-ff0716f` | issue-190-durable-sse；c1d7e53，clean；旧patch已进WIP提交 | X-51 | G1/G4/G5/G6 |
| `/Users/mouriya/Ext/worktrees/issue-13-mux-design-1689316` | issue-13-mux-design；被指接旧dirty文；当前不在G6 mux worktree list，不据此推稿件丢失 | X-85 | G1/G4/G5/G6 |

### 3.8 tern/PTY会话与报告枚举的agent节点

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| `pepgent-eng-lab3` / `session 01a195cf-b89c-734a-bff3-e2364caf3799` | 06:33:00Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-29、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `pepgent-eng-ops` / `session 01a195cf-c128-724a-a38a-0d374edd16ac` | 06:33:02Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-30、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `pepgent-eng-store` / `session 01a195ea-98ae-721a-addf-9e9f4b0ac0b4` | 07:02:21Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-51、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `pepgent-eng-plugin` / `session 01a195ea-98a8-725d-8693-a0e215b8dd2b` | 07:02:21Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-52、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `pepgent-eng-e2e` / `session 01a195ea-997c-7088-aede-701b11b4b73d` | 07:02:21Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-53、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `pepgent-eng-web` / `session 01a195ea-98d3-7705-a11d-4410af95c259` | 07:02:21Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-54、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `pepgent-eng-rt` / `session 01a1962e-a218-766a-bfd2-4e6408b33c51` | 08:16:40Z初始GPT启动；08:27–30 kill/restore为Opus；08:36:45 kill成功、tern列表不再有pepgent-*；:high只有启动参数证据 | X-85、X-93、X-98 | R03/R05/R10/R11；G6 §5.4 |
| `PTY session_id=1, title=usage check` | 06:29:04起；/usage取消；06:29:45 SIGTERM exit143；06:30:24重试error，未证实第二成功进程 | X-23 | R02/R03 |
| [D10Clone_c51c](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_c51c/timeline) | 派发失败，只有继承前缀/任务输入，无自身执行 | X-25 | S1 |
| [D10Clone_95ff](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_95ff/timeline) | 派发失败，无自身执行 | X-25 | S1 |
| [D10Clone_a555](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555/timeline) | 实际执行D10/A/B/C，08:34:22最后汇报、08:41:22 dispose | X-25；V10/V11A/B/C | S1 |
| [LabWireClone_5d6b](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b/timeline) | D12与正文回写完成；非实现/runtime | X-59；V12 | S2 |
| [GapClone_e2d7](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/GapClone_e2d7/timeline) | D13/D14完成，旧D15取消；08:37:20 dispose | X-62；V13/V14/V15旧 | S3 |
| [D15Clone_b978](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D15Clone_b978/timeline) | 08:42:51起，08:52:37顶层cancel，08:56恢复running；报告截点无正式D15结果 | X-102、X-114、X-117 | R11/R12 |
| [Argon](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon/timeline) | 08:44:30起，旧cancel通知后实际有裁决与督办；拒代查 | X-103 | S4 |
| [ArchiveD15Intent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/ArchiveD15Intent/timeline) | PM基线已push；09:00:36 LEDGER dirty未提交 | X-118 | S4 |
| [InvMentor](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/InvMentor/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-02 | S4 §1/§3 |
| [SteadyReview](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/SteadyReview/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-14 | S4 §1/§3 |
| [DivergentReview](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/DivergentReview/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-14 | S4 §1/§3 |
| [StateInventory](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/StateInventory/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-18 | S4 §1/§3 |
| [LedgerCatchUp](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LedgerCatchUp/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-19 | S4 §1/§3 |
| [LedgerC2](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LedgerC2/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-27 | S4 §1/§3 |
| [D10Rewrite](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Rewrite/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-50 | S4 §1/§3 |
| [LedgerC3](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LedgerC3/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-88 | S4 §1/§3 |
| [LedgerU62](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LedgerU62/timeline) | 报告列为已执行/有产物；具体产物/状态见对应主表和commit行 | X-100 | S4 §1/§3 |
| [D10Clone_a555.D10Steady](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D10Steady/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D10Divergent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D10Divergent/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.ArgonD10](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.ArgonD10/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.LeadMentorD10](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.LeadMentorD10/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.SecD10Archive](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.SecD10Archive/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.LRTriageA](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.LRTriageA/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.LRTriageB](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.LRTriageB/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D11Steady](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D11Steady/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D11Divergent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D11Divergent/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.SecD11AArchive](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.SecD11AArchive/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.SecWriteBack](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.SecWriteBack/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D11BSteady](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D11BSteady/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D11BDivergent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D11BDivergent/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.SecD11B](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.SecD11B/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D11CSteady](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D11CSteady/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.D11CDivergent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.D11CDivergent/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Clone_a555.SecD11C](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Clone_a555.SecD11C/timeline) | 报告列举的实际子agent，工作/票/归档如V10/V11A/V11B/V11C；不把继承前缀当自身执行 | V10/V11A/V11B/V11C | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.ArgonD12](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.ArgonD12/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.D12Steady](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.D12Steady/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.D12Divergent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.D12Divergent/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.D12Coverage](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.D12Coverage/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.ArgonD12Vote](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.ArgonD12Vote/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.MentorD12Vote](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.MentorD12Vote/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [LabWireClone_5d6b.SecD12Archive](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LabWireClone_5d6b.SecD12Archive/timeline) | 报告列举的实际子agent，工作/票/归档如V12；不把继承前缀当自身执行 | V12 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [GapClone_e2d7.D13Argon](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/GapClone_e2d7.D13Argon/timeline) | 复用D13/D14/旧D15；08:37:38明确停止，08:44:38 dispose；与常驻Argon不同实例 | V13/V14/V15旧 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [GapClone_e2d7.D13Steady](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/GapClone_e2d7.D13Steady/timeline) | 报告列举的实际子agent，工作/票/归档如V13/V14/V15旧；不把继承前缀当自身执行 | V13/V14/V15旧 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [GapClone_e2d7.D13Divergent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/GapClone_e2d7.D13Divergent/timeline) | 报告列举的实际子agent，工作/票/归档如V13/V14/V15旧；不把继承前缀当自身执行 | V13/V14/V15旧 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [GapClone_e2d7.D13Mentor](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/GapClone_e2d7.D13Mentor/timeline) | 报告列举的实际子agent，工作/票/归档如V13/V14/V15旧；不把继承前缀当自身执行 | V13/V14/V15旧 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [GapClone_e2d7.D13Secretary](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/GapClone_e2d7.D13Secretary/timeline) | 报告列举的实际子agent，工作/票/归档如V13/V14/V15旧；不把继承前缀当自身执行 | V13/V14/V15旧 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [StateInventory.InventoryMentor](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/StateInventory.InventoryMentor/timeline) | 报告列举的实际子agent，工作/票/归档如X-124；不把继承前缀当自身执行 | X-20 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Rewrite.D8DocCutover](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Rewrite.D8DocCutover/timeline) | 报告列举的实际子agent，工作/票/归档如V10；X-49；不把继承前缀当自身执行 | V10；X-50 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Rewrite.CaptureIssueContexts](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Rewrite.CaptureIssueContexts/timeline) | 报告列举的实际子agent，工作/票/归档如V10；X-49；不把继承前缀当自身执行 | V10；X-50 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [D10Rewrite.ReviewBodyConsistency](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/D10Rewrite.ReviewBodyConsistency/timeline) | 报告列举的实际子agent，工作/票/归档如V10；X-49；不把继承前缀当自身执行 | V10；X-50 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.InvSessionEarly](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.InvSessionEarly/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.InvSessionDispatch](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.InvSessionDispatch/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.InvDocsSkills](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.InvDocsSkills/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.InvGithubObjects](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.InvGithubObjects/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.NeutralSlice1](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.NeutralSlice1/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.NeutralSlice2](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.NeutralSlice2/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.NeutralSlice3](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.NeutralSlice3/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.NeutralSlice4](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.NeutralSlice4/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Argon.NeutralRepoGithub](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Argon.NeutralRepoGithub/timeline) | 调查子任务，首4个08:47:11取消、次5个08:50:25取消；无完成全程审计 | X-106、X-111 | S1 §1.3 / S2 §1 / S3 §1 / S4 §1.2 |
| [Slice01](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice01/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice02](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice02/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice03](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice03/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice04](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice04/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice05](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice05/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice06](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice06/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice07](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice07/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice08](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice08/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice09](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice09/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice10](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice10/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice11](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice11/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [Slice12](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/Slice12/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensUserIntent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensUserIntent/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensEndState](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensEndState/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensArtifacts](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensArtifacts/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensSubagents](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensSubagents/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensPeers](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensPeers/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensRules](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensRules/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensRedirections](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensRedirections/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensClaims](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensClaims/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensToolFailures](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensToolFailures/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensDecisions](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensDecisions/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensRole](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensRole/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensContext](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensContext/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensDocContent](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensDocContent/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensRightTrack](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensRightTrack/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |
| [LensEffort](session://01a195a6-e09a-7070-8423-a7910184b28a/agents/LensEffort/timeline) | 05:57:12成功批次之一；报告返回completed；只作旧会话取证、本索引未打开旧会话 | X-04 | R01 §4；S4排除集合 |

### 3.9 local草稿、基线与临时材料

| 对象 | 报告所见变化/当前状态 | 对应主表序号或未找到对应指令（表决内V） | 报告来源 |
|---|---|---|---|
| `local://bans-draft.md` | 17条草稿5256bytes；后7机制入AGENTS，不将草稿当通过决策 | X-07 | R01:157–160 |
| `local://review-diverge.md` | DivergentReview只读审阅产物 | X-14 | S4:79 |
| `local://state/inventory.md` | StateInventory只读盘点快照 | X-18 | R02/S4 |
| `local://decisions/D10.md` | 当时治理local草稿/票/基线；最终归档按V10；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V10 | S1/S2/S3 |
| `local://decisions/D10-vote-claude.md` | 当时治理local草稿/票/基线；最终归档按V10；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V10 | S1/S2/S3 |
| `local://decisions/D13.md` | 当时治理local草稿/票/基线；最终归档按V13；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V13 | S1/S2/S3 |
| `local://votes/D13-leader.md` | 当时治理local草稿/票/基线；最终归档按V13；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V13 | S1/S2/S3 |
| `local://decisions/D14.md` | 当时治理local草稿/票/基线；最终归档按V14；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V14 | S1/S2/S3 |
| `local://votes/D14-leader.md` | 当时治理local草稿/票/基线；最终归档按V14；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V14 | S1/S2/S3 |
| `local://decisions/D12.md` | 当时治理local草稿/票/基线；最终归档按V12；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V12 | S1/S2/S3 |
| `local://votes/D12-claude.md` | 当时治理local草稿/票/基线；最终归档按V12；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V12 | S1/S2/S3 |
| `local://argon/D12-intent.md` | 当时治理local草稿/票/基线；最终归档按V12；共享local路径可能后来被覆盖，不据当前文件重建旧稿 | V12 | S1/S2/S3 |
| `GapClone_e2d7 local/decisions/D15.md（旧D15）` | 08:34:25写9463bytes，08:34:40修；未正式完成；准确旧版本取G/entry/075f2706，不与新D15混用 | X-96；V15旧 | S3:95–103,159 |
| `local://argon/D15-intent.md` | Argon08:55:03写；PM对应原样224行归档 | X-116 | S4:160；R12 |
| `/tmp/img6-body.md` | Main写新正文，06:38:59已删 | X-32 | R03/R04；S3/S4 |
| `/tmp/img3-body.md` | Main写新正文，06:38:59已删 | X-33 | R03/R04；S3/S4 |
| `/tmp/dep8-body.md` | 编辑deploy8用临时正文；当前是否仍存在未确认 | X-39 | R03/R04；S3/S4 |
| `/tmp/dep1-body.md` | 编辑deploy1与纠正用临时正文；当前是否仍存在未确认 | X-41 | R03/R04；S3/S4 |
| `/tmp/d10-rewrite/` | context抓取/正文生成/发布材料；报告未列每个临时文件 | X-50 | R03/R04；S3/S4 |
| `/tmp/d13-secretary/` | D13/D14秘书临时正文材料；非实现 | V13/V14 | R03/R04；S3/S4 |

## 四、冲突与缺口表（逐项照列，不裁决）

| 编号 | 报告定位 | 差异/未覆盖项 | 报告原有事实与限定 |
|---|---|---|---|
| C-01 | R01:7；R12:5；S4:68；G1:9 | 调查截点不同 | R01末可见08:59:59.936/#6b697c17；R12末08:58:11/#b7c07c8e（1460 entries）；S4 Main至08:59:56、秘书至09:00:26；G1调查中1459→1486 entries。各自为取样副本，不拼成同一末条。 |
| C-02 | R09:10；R10:14–19；G1:11；G2:11；G4:16–26；G5:10；G6:11 | session/git/REST/Events时间 | PR278：git/Events08:19:04，REST09:19:04；PR280 opened Events08:34:51、REST09:34:51；deploy PR12 git08:15:12、Events08:15:13、REST09:15:13。报告未查明原因，原值并列。 |
| C-03 | S1:279–282；G2:49–51；S3:191 | D11B/C与D14时间 | D11B session创建08:06:35/REST09:06:36；D11C session08:32:08/REST09:32:10；D14秘书同步约08:01、REST09:01；不自行加减一小时。 |
| C-04 | G3:245,250；G5:71；G2:49 | 秒级时间差 | Pepgent15 closed_at07:17:18、closed事件07:17:19；Pepgent9 closed_at07:25:53、事件07:25:55；images6 closed_at06:47:19、事件06:47:21；PM20 closedAt09:01:07、event09:01:08。 |
| C-05 | R01:27,52；BehaviorMain:51–55 | 反馈的来源/entry不同 | R01把06:12:15反馈#8d5767b5列agent-attributed，明确非自行认定操作员原话；BehaviorMain把#8d5767b3标(U)并称用户提示。此处照列两种归因，不裁定。 |
| C-06 | R09:47；G1:93–99；R11:30–36；BehaviorMain:72–76 | 根exports与npm指令的描述粒度 | R09/G1区分08:05根exports/schema与08:30 npm同源产物例举subtree；BehaviorMain:74写“#aa7ad0c9指示…增加./contract并通过subtree提供npm contract”。R11原指令是“做法由你定，例如…”，而后自述缩为直接指示subtree。 |
| C-07 | R08:10,48,165–167；R09:45；G3:65,120 | PR39派工前提 | 07:58要求“PR39修改后合并”，对象已07:17:16合；08:03工程师纠正后改follow-up，再改41共享原子迁移。旧PR既有合并不证明D12迁移完成。 |
| C-08 | R09:40,166 | 宿主driver派工前提 | Main要求从源码改installed；工程师08:03:34纠正原已installed，所跑external OMP protocolstub不是releaseproof；报告无新切换改动证据。 |
| C-09 | R12:86–102；S4:217–233；BehaviorMain:99–103 | LEDGER补录落地截点 | R12查询LEDGER最新d51835f，status/diff空；S4更晚08:59:54见编辑成功、09:00:36为 M LEDGER.md未提交；BehaviorMain截至末无秘书完成结果。保留先后快照，不称两文件均提交完成。 |
| C-10 | G1:181,278；G6:147,188–223 | 不同checkout状态 | G1 canonical main clean、eng-store旧SSE分支clean；G6 eng-store-home/main有大批staged M/D/A。地点/取样不同，报告未给这批staged变动的作者与产生时间；不把它当已执行回退。 |
| C-11 | S2:167；G2:48 | D12命令数量 | S2：“argon两轮说49个；分身、导师与最终联合为48个”；当前D12:388–435连续48 variant。只记录口径差。 |
| C-12 | S2:165–166；R07:90 | D12导师材料/归档轮次 | 首轮给导师是完整决策表摘要而非629行类型全文；mentor-r2.md正文实第三轮；rounds第二轮仍引同名文件，第二轮完整原票在MentorD12Vote#f08cc228，六归档票文件未保存该轮全文。 |
| C-13 | S2:45,55,164；R08:77 | D12基线/覆盖审计的时点 | Argon产基线07:20:34/答07:21:03；初稿写07:21:11；分身实际读基线07:21:19。Coverage审537行快照/51 GAP，报告未见对629行定稿独立重跑覆盖；完成汇报“baseline before drafting”与实际读取时点分别保留。 |
| C-14 | R11:44–49,170；S3:10–11,115–121 | 停止范围/取消权限 | 七tern kill成功且列表无pepgent-*；嵌套D13Argon/Steady kill正文无权限，改文本stop；根08:37:23见Argon running，自身08:37:38明确停。第二次GapClone stop文字error，不称文字已交付。 |
| C-15 | R12:36–37,120；S4排除范围 | D15 22子任务状态 | R12直接proc只确认顶层D15 cancelled/Argon running；“全部22个子agent也停了”是Main/后续来信描述。R12/S4按排除边界未逐个读取新D15内部，不把它补成已逐项核实。 |
| C-16 | R12:30,53；S4:149 | Argon cancelled通知与后续 | 08:49:25旧subresult cancelled/no output；Argon自身后仍有工作、基线、裁决。取消者及具体恢复路径R12未查，不按旧通知推定此后缺席。 |
| C-17 | S1:64,315；S2:10,14；S3:10；S4:167；R12:54–62 | Argon实例/裁决与票据 | D10/A/B/C ArgonD10、D12基线ArgonD12/票ArgonD12Vote、D13/D14 D13Argon与08:44常驻Argon为不同节点；前七批档案有原票，后常驻Argon制裁否定事后免丢弃。后者是裁决内容；不据名称同一化，也不裁票据效力。 |
| C-18 | R12:45–47；S4:169 | D15席位/新分身落实差异 | Argon第二裁决写新D15、独立task:high正式投票；Main复用恢复的D15，并称本轮无high许可，改Claude族Main/分身。未见Argon对两个落实选择再同意；外部harness许可事实非本索引另查。 |
| C-19 | R01:72–74 | 最初30报告阅读证据 | 27主报告有read、Slice08澄清和LensClaims附件有read；归档LensUserIntent-inputs.md存在但本窗口未见root单独read。不把“supplements全读”自述当30份逐字已独立确认。 |
| C-20 | R02:82；R03:69–71 | 取消与配置 | 无关peer_ask取消无回答，不能仅凭取消证实是否送达；没有卸载扩展是Main自述，skill diff和后续peers启动相容，但未穷尽用户配置。 |
| C-21 | R04:234；R07:97；G2:55 | 精确通过时间的覆盖 | 部分报告仅有最终票/归档、issue创建关闭，不给每张票独立UTC。流程表保留最终回复、宣布计票、git归档、公开时间，未用关闭时刻冒充每项精确投票瞬间。 |
| C-22 | R10:217–222；R11:27；BehaviorMain:78–82 | 模型与effort | 七人系统Model自报Opus；后六答在08:30:03–23；:high是启动命令参数，Model回复未含thinking level，不能提升为高effort独立运行确认。并行kill/new先后原因是Main解释，未有独立进程trace。 |
| C-23 | G2:35,163,332 | PM LAB04证据归档归因 | eedda7d/23文件存在；只有LAB后端任务与本仓证据要求，未找到Main专门命令08:35:37提交这23文件，不能同账号推agent身份。目录名20261101T1000Z不是执行时间证据。 |
| C-24 | G3:149–169,278；G4:131–136；G5:132,313；G6:87,95 | 具体选择未找到Main指令 | 同期15 prototype/UI/merge提交；deploy preview先写后撤派生值；images README额外SIF段；library stat评分实现、13节点group/估时全0；独立Bridge准备分支。分别保留任务范围/未找到具体指令，不自动归Main。 |
| C-25 | G1:251,356；G4:46–57；G5:112–132；G6:71,114–118 | 继承成果与本轮合入 | SOR09 AuthorDate04:56:43、images d40585f05:05:27、deploy dded75105:18/56eaff705:27、library README83ebca005:20及mux旧稿早于起点；PR266更新早于起点。被接续/合入不等于本轮从零编写。 |
| C-26 | R08:21,174；R06:99–101；G4:239–240；G5:275,290 | 明确未交付/未定位 | standalone compose独立新issue/PR未定位；PR260 ProcessRef消费迁移未确认；deploy lab-entrypoint参数与Slurm模板尚无本轮commit；images9/10无新实现PR；PR272/280、remote15OPEN；SSEWIP、WEB41未原子合入。 |
| C-27 | G2:333；G3:263；G4:327–328；G5:70–73 | Project/父边与指令 | 部分父边由秘书合同落地，Main无逐边指令；bot Project状态事件不是Main手工决定；D10Rewrite明确未改Project；部分来源只历史读回未另查当前。 |
| C-28 | G1:358；G2:335；G3:27,279；G4:396；G5:166 | 枚举边界 | 当前API/Events/reflog不能证明已删除分支/评论、不可达对象、不可见settings/audit log从未存在；未扫描全磁盘不可达tree/blob或管理员审计；不把空列表当绝对历史不存在。 |
| C-29 | G6:124,155–159,229–239,340–348 | 目录/时间元数据与归因 | 25顶层路径含5隔离根、m/克隆birth保留旧日期；早先TZ=UTC stat硬写Z不作为UTC证据，最终用birth epoch转换；五t…根记录精确查询无命中，未读owner/独立session；后代目录名不证明任务或测试完成。 |
| C-30 | G6:168–223,237–239；G1:276 | dirty文件边界 | status只证当前路径/index状态，未确认每个文件作者/产生时间；未跟踪pyc未读二进制。未据大批M/D/A推损害或回退。 |
| C-31 | R11:149–155；S3:214–218；G1:99 | npm产物与无输出 | 当前无store/contract/npm前缀ref与本轮未见subtree分支，不证明任何过去/别名/本地副作用不存在；npm指令撤回也不证明期间零改动；PR278 Bun消费证据不覆盖npm。 |
| C-32 | R11:80–91；R12:22–24；BehaviorMain:63–76 | 撤回自述与独立证据 | Main08:37/42/44自认候选表08:45:32被撤为无会话分析支持，不准作输入。BehaviorMain部分判断引用后来自认；本索引不采其判断/建议，不据自认填对象因果，引用它的工具锚点与晚段纠正事实。 |
| C-33 | S4:198–215；R12:31–48 | watchdog通知地位 | 12通知是扩展/agent-attributed，不当用户亲笔或三族一票；其停D15要求与Argon继续裁决并存。Main多次选Argon、曾先kill再恢复为记录动作，不在此裁冲突规则。 |
| C-34 | S4:151–169；R12:59；G2:336 | Argon调查/裁决的覆盖 | 九调查子任务取消，无完整逐对象审计；制裁书有直接用户来源和裁决，但其中49issue/PR因果断言不由本索引提升为独立事实。D15未有PM issue/完整三族结果。 |
| C-35 | R01–R12；S1–S4；G1–G6；BehaviorMain:7 | runtime/独立会话覆盖 | 各取证报告未运行产品runtime；对象作者的命令/截图/局部观察是原交付记录，不是本索引重跑。未读禁止旧会话、未联系agent；多数未打开七tern工程会话内部或业务DB/部署。完整F01–32/D9未获通过证据。 |
| C-36 | G1提交stat；G3:123–125,142–147；R09:109–113 | 逐文件命名缺口 | 若报告只说PR39 19文件、某commit 6/11/15文件、PR280三README、SQL/meta/journal或仅basename，源报告未逐一列完整路径；本索引只列给出的明确路径/原缩写，不从数量造文件名，未具名集合在此保留。 |
| C-37 | R11:161–164；R12:104–113；G2:36 | D15公开对象/终态覆盖 | 报告检索PM最高22、D15搜索空，仅37e6c73 intent归档；不据搜索空否定内部草稿/未发布票。报告截点之后新产物与本次23报告以外内部取证不在索引中。 |
| C-38 | R03:216–219；S1:98,316 | 免投指令与最终D10 | 根派发“先开发后统一e2e不作为待投”，分身受讨论意见改D10-00为意图票；最终三族原票存在。初指令与最终投票各记，不把一端覆盖另一端。 |
| C-39 | R03:127；R04:81–86；R09:45–51,167 | 计划覆盖关系 | 最初child齐关images3后改统一e2e才关；DEP03 PR先hold后改非活动先合；library独立follow-up后改共享原子；D14原deploy11后工程师改新14。索引保留形成/覆盖时刻，不把冲突路线同时写成当前要求。 |

## 覆盖边界

23份报告全部纳入上述主表、流程表、对象表及缺口表。对象清单包含报告已明确定位的PR、commit、分支/ref、issue正文与新建、父子关系、评论、仓库文件、worktree/工作目录与tern/agent会话；源报告未给完整名称或未确认的部分不补事实。BehaviorMain的建议、评价和处置判断不纳入结论，仅保留其实际动作锚点、晚段纠正事实与同其他报告的描述差异。没有据当前OPEN/CLOSED、归档、PR合并、Model自报或目录名推定runtime、完整验收或治理结果。
