# D17 压力测试报告（Claude 族独立空白历史 task:high，steady + divergent）

席位：`PhaseBClone_ffeb.ClaudeHighD17`。依据：U11、C3-3、C2-3.2。被测正文：`local://decisions/D17.md`（D17-01..15）。
本席未读 session、git 历史，也未读其他席位的 D17 选票。PM issue 只用 `gh issue view` 读取正文（PM#1、PM#25）；PM#25 评论未读，凡涉及评论的引用都标为“未核”。

PM#1 的行号有两套：`gh issue view` 默认输出带 12 行头部，D17-15 引用的行号与这一套一致（例如 body 第 7 行的 D1-01 对应输出第 19 行）。本报告引用 PM#1 时写 body 行号，并在括号里给出 D17 使用的输出行号。

---

## 0. 结论

| 结果 | 条目 |
| --- | --- |
| 赞成 | D17-01、02、04、05、06、07、08、09、10、11、12、13、14 |
| **反对** | **D17-03**（与本表执行段、AGENTS.md:42–43 冲突，会留下无人提交的改动）<br>**D17-15**（执行后 PM#1 仍与 C3-4、C1-3、C2-1 冲突；AGENTS.md:3 指定 D1 为身份详表的权威来源） |

两条反对都只需改一句话，修订文本见 §6。其余发现列为非阻断意见（§7）。

---

## 1. 对照 LEDGER 核对（`C1–C5`、`R1–R21`）

| 条款 | 与 D17 的关系 | 结论 |
| --- | --- | --- |
| C1-1 | D17-10 的 Skill 放在 pepgent-soroi 的 `.omp/skills/`，这是领导小组工作台，与 decision-vote、tern-worker 同处一地。内容涉及 fork、todo-more、peers，只能作为领导层工作方法，不得进入 omp-soroi 产品 | 符合；建议 D17-10 写明“只用于领导工作台，不属于 soroi 产品”（非阻断 N10） |
| C1-2 | 不涉及 | — |
| C1-3 | D17-11 与 C1-3 一致。但 D8-14 的“本仓真实入口检查不删减”（D8:85）、D10-05 的“验收只写本仓真实入口”（D10:17）、派工草案 P-4 的“把 (R) 写进 PR 正文”（phaseB-dispatch-draft:46）仍未被替换；D1-08 的“每条 e2e 路径一个测试者、在真实环境跑端到端”也还在 | D17-11 赞成，遗漏列为 N5；D1-08 并入 D17-15 的反例 |
| C1-4 | 不涉及 | — |
| C2-1 | D17-15 的 D1-13 只写“支撑与巡检角色”，没有列出 C2-1② 的两个独立职能部门（SoroiKeeperOpus/Gpt、OmompOptimizer）。这两个部门有权发起投票（U90、U93） | **D17-15 反例 C** |
| C2-2 | D17-14 对 ArgonGovernance 边界的写法正确。tern-worker/SKILL.md:42–43 仍写“argon 双核”，不在 D17 范围内 | N8 |
| C2-3 | D17 第 18–21 行的计票规则符合 C2-3.3；参与者符合 C2-3.2 | 符合 |
| C2-4 | D17 第 22 行写明不重新表决用户规则。但 D17-14 的 U11 部分、D17-15 的 U60–U62 部分本身就是用户指令 | 分类意见见选票；表决只覆盖措辞与范围 |
| C3-1 | D17-02 禁止限制报告长度，与 C3-1 一致 | 符合 |
| C3-2、C3-3 | D17-14 符合 | 符合 |
| C3-4 | D1-07 写着“一个 issue 一个”进程，并要求首步用 `wt`；D1-01 写着主会话“在 omp worktree 中工作”。D17-15 不处理这几处，而它引用的 R20-07 替换文本还保留了“omp worktree” | **D17-15 反例 A、B** |
| C3-5 | D17-01..10 正是 omomp-optimizer 正式方针的表决，D17-10 负责沉淀 Skill | 符合 |
| C4-1、C4-2 | D17-07 写明“accepted 只表示已投递”，符合；普通状态在原总线闭环，也符合 | 符合；措辞见 N3 |
| C4-3 | D17-13 和 D17-14 直接替换正文，评论不改，另发说明，符合。但改写事实性记录时不得把历史写错（N7） | 符合 |
| C5-1 | 本席未读 session | 符合 |
| C5-2 | D17-07 的“先由规则 owner 确认”可能把领导层自己对照源头的职责外包出去（N3） | 非阻断 |
| C5-3 | 不涉及 | — |
| C5-4 | D17 第 24 行与执行段都写明不阻塞席位 | 符合 |
| R4 | 与 D17-15 直接相关：D1 roster 仍不完整 | 反例 C |
| R5 | 与 D17-14 直接相关 | 符合 |
| R6 | 执行段由秘书和分身分工，符合；但与 D17-03 冲突 | 反例（D17-03） |
| R8 | D1-07 的“一个 issue 一个”违反一仓一进程 | 反例 A |
| R9 | D17-11、D17-13 符合，残留文本见 N5、N6 | 非阻断 |
| R11 | 不涉及 | — |
| R13–R15 | D17-12 已不影响已发车的四席，只约束 W-10、W-08 | 符合 |
| R21 | D17-11..15 是阶段 B 的 PM 正文清理 | 符合 |
| R1–R3、R7、R10、R12、R16–R20 | 不涉及 | — |

---

## 2. 压力测试 A：D17-11..15 的引用、行号，以及与 D16、D16-15 的冲突

### 2.1 行号核对（文件均在 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/`）

| D17 条目 | 引用 | 实际 | 结论 |
| --- | --- | --- | --- |
| D17-11 | D16 定稿 D16-11③ | `evidence/decisions/D16-phaseB-review-restore.md:35` 和 PM#25 body:20 的 ③ 已写成“同一席位同域关联切片可连续开发并在同一 PR 中用多个 `Closes #X` 合并提交”，不再有“一个切片对应一个 issue 和一个 PR” | **替换目标已不存在**，对 D16 文件是空操作；建议从 where 删去（N4） |
| D17-11 | D10:17（D10-05） | 现存“保留粒度、档位、issue/PR、tern 执行者”，同一格还有“验收只写本仓真实入口” | 对得上，但后半句漏改（N5） |
| D17-11 | D8:85（D8-14） | 现存“由独立 tern 工程进程完成，issue/PR 关联按既定流程…业务功能与本仓真实入口检查不删减” | 对得上，“本仓真实入口检查”漏改（N5） |
| D17-11 | D10 文件头 | D10:5“讨论者：discuss:steady（D10Steady）、discuss:divergent（D10Divergent）” | 对得上。但这是一条历史事实，审计 §2 R20-06.2 也把它列为历史标签（N7） |
| D17-12 | D16-10“滚动补入” | D16:34 与 PM#25 body:19 都写着“依次补入 W-09 lab → W-07 plugin → W-03 images → W-04 deploy” | 对得上 |
| D17-12 | 派工草案第 16、45 行 | `evidence/decisions/phaseB-dispatch-draft.md:16`（W-08 排在最后一波）、`:45`（P-3 固定队列，3 席） | 对得上 |
| D17-12 | `phaseB-review-governance.md` 第 152–154 行 | 文件实际在 **`evidence/argon/`**，不在 `evidence/decisions/`（审计 R20-03 表把目录写错了）；内容是 G-6“3–4 个…再启动下一波次” | 内容对得上；目录需写全；how 没写这三行如何替换（N9） |
| D17-12 | D10:30 | “第一批 W-06、W-05、W-01、W-02，滚动补齐十席” | 对得上 |
| D17-13 | governance 第 9、114、149–150 行 | `evidence/argon/phaseB-review-governance.md:9`（预审通过前冻结）、`:114`（7 条硬性预审，一票否决）、`:149–150`（G-5 双核签署） | 对得上 |
| D17-13 | 派工草案第 19、30、32、47 行 | `:19` 双核逐波核对、`:30` 每波附表、`:32` 启动前冻结、`:47` P-5 回写前置与双核确认 | 对得上；**漏了 `:46` P-4**：“实现后做本仓真实入口检查，并把 (R) 写进 PR 正文”（N6） |
| D17-13 | D16-12 备选列，讨论表第 60、65 行 | D16:36 与 PM#25 body:21 的备选列有三种关卡；D16:60“改为异步加退役复核”、D16:65“席位退役前做批量复核（方案 B）” | 对得上。漏了 D16:13“D16 通过即视为派工预审完成”、D16-12 标题、D16:43 与 D16:88 的“抄送双核”（后者与 D16-12 现行的“不再向 Argon 发送日常发车/退役 IRC 抄送”冲突）（N6） |
| D17-13 | PM#25 评论 | 未读 | 未核 |
| D17-14 | D16-07 定稿文本 | D16:31 仍写着“表决前经 discuss:steady、discuss:divergent 压力测试”和“Argon 与 ArgonGovernance 双核”；**PM#25 body:16 已改为现行口径**（依 AGENTS.md:50，由 ArgonGovernance 直接对齐，见 `evidence/votes/D16-15-claude-high.md:3`） | 对得上。PM 文件应与 PM#25 现行正文逐字同步，不另写第三种措辞（N4） |
| D17-14 | PM#25 计票摘要 | body:3“argon 族（Argon、ArgonGovernance）” | 对得上。这是计票事实，处理见 N7 |
| D17-14 | governance 第 18、78 行 | `:18` argon 族双核表决单位、`:78` decision-vote 双核收票 | 对得上 |
| D17-14 | 派工草案第 23 行 | “D16 经过 steady 与 divergent 压力测试” | 对得上（原文没有写 discuss:*） |
| D17-14 | D15 第 15、18、56 行 | `D15-private-decision-discard.md:15` argon 族双核、`:18` discuss 席压测、`:56` D15-13 要求 discuss 压测 | 对得上；`:18` 是事实记录（N7） |
| D17-14 | `D16-process.md` 规范性表述 | 没有写行号；实际在 `:16` | 建议写明 `:16` |
| D17-15 | PM#1 第 19、21、22、25–27、30、31 行 | 按 `gh issue view` 输出计行号，依次对应 D1-01、D1-03、D1-04、D1-07..09、D1-12、D1-13，对得上（body 行号为 7、9、10、13–15、18、19） | 对得上；第 21 行（D1-03）只出现在 where，how 里没有动作 |
| D17-15 | “启动命令统一引用 D16-00（…home worktree）” | D16-00（D16:24）只规定模型、`-e omp-peers`、不在 PTY 里另起 omp；home worktree 出自 D16-09（D16:33）与 C3-4.4 | 引用不全，home worktree 应引 D16-09（并入反例修订） |

### 2.2 与已通过的 D16、D16-15 是否冲突

- **D16-11：** 不冲突。D17-11 要改的句子在 D16 文件和 PM#25 中都已改好。
- **D16-10：** D17-12 的替换文本删掉了 D16-10 中“W-10…优先补入空出的名额”的优先级，这一优先级来自 D16:72 采纳 Divergent 意见“按依赖就绪优先分配名额”。两者实质方向一致，但 D17-12 应写明是否保留 W-10 优先（N9）。
- **D16-12：** 不冲突。D17-13 删去的落选关卡在 D16-12 中本来就被否决。
- **D16-07：** 不冲突。D17-14 与 PM#25 body:16 现行口径一致，只需同步文件。
- **D16-00：** D17-15 把 home worktree 归到 D16-00，属于引用错误，不是实质冲突。
- **D16-15：** D17 没有条目触及 D16-05 或 D16-15。D17-12 中“W-10 只等 protocol/lab 的真实上游合入”与 D16-03④、D16-15 的 store-contract 接法相容，因为 A2-12 已经包含该依赖。不冲突。

---

## 3. 压力测试 B：D17-01..09 合并后是否遗漏 OM、OMP1 的要点

| 来源 | 并入 | 遗漏的要点 | 影响 |
| --- | --- | --- | --- |
| OM-01 | D17-01 | 无。取舍写“修复后的完整链路尚未实测”，但已有运行观察：顶层 `omomp-optimizer` 带 `task` 与 spawns（`.omp/agents/omomp-optimizer.md:6-7`），OMP1 记录了它派出的四名只读巡检员（`local://argon/omomp-optimization-1.md:27`），四份 `local://argon/inspection-*.md` 都在 | 状态口径偏保守（N1） |
| OM-02 | D17-02 | 无 | — |
| OM-03 | D17-03 | “不把计划文书完成当业务 runtime 完成”未并入；“共享父工作树的 subagent 不自行提交”在并入时从 todo 的 DONE 语义扩成了一般禁令 | **反例（D17-03）** |
| OM-04 | D17-04 | “拒绝按错误类别修正”“新调用后使用新 tag，不凭记忆重用”只有隐含覆盖 | 可忽略 |
| OM-05、OMP1-01 | D17-05 | ① OMP1-01 取舍中写明“无工具导师的完整表格不受禁止”，D17-05 只写“对方可解析的路径或 URI”。LeadMentor 没有工具，给它路径等于没给。② OM-05 的“无需用 shell python/jq 抽取同一数据”、OMP1-01 的“不在 eval 中 subprocess 读本地文件”未并入 | N2 |
| OM-06 | D17-06 | “不在 eval 里拼 Bun.$ 或非 literal 命令绕过原生读取和 delete-guard”“返回 hasError 时先处理，不把错误正文当 JSON”未并入 | N2 |
| OM-07、OMP1-03 | D17-07 | ① OM-07 写的是“**已授权的**普通缺承载问题由秘书闭环”，D17-07 去掉了“已授权的”，于是秘书要自己判断什么算“普通”，与 D16-11 的“BLOCKED 由治理分身与双核初审分类”、secretary.md:29“不做设计判断”产生缝隙。② OMP1-03 的“已经发错仍必须明确纠正，不能为省消息隐瞒”未并入。③ OM-07 的“派工引用生效正文，不重述另建第二套规则”“不等‘收到’回执才推进独立工作”未并入。④ “先由规则 owner 确认”承接自 OMP1-03:198，但同稿 :200 又写“不加第二审核人”，D17-07 没有化解这一张力 | N3 |
| OM-08 | D17-08 | “不借此取消或变更合法的 watchdog 与监督配置”未并入 | N2 |
| OMP1-02 | D17-09 | 无（GraphQL aliases 属示例） | — |
| OMP1-04 | D17-02/03/04/05 | “首次相关调用前读当前 topic”只在 todo 与 JSON 两处写了，没有通用表述 | 可忽略（宿主已有 topic 机制） |
| OM-S1 | D17-10 | Skill 名称由 `omomp-high-efficiency` 改为 `omomp-efficiency`，可以接受。按 D1-14（PM#1 body:20），Skill 只在 pepgent-soroi 仓内生效；OM、OMP1 中多数样本是其他仓工程席位的错误（mux 的 `xd.github`、remote 的 add/commit 并行、library 的 task 派发），这些席位读不到该 Skill | N10 |

---

## 4. 压力测试 C：是否新增了未经授权的规则

| 位置 | 新增内容 | 是否授权 |
| --- | --- | --- |
| D17-03 | “与父会话共享工作树的 subagent 不自行提交” | **超出授权。** omp-todo-more 的语义只是这类 subagent 的 DONE 不替它提交（`/Users/mouriya/Ext/code/omomp/omp-todo-more/src/git.ts:17-20`），并不禁止它用路径限定的 git 自行提交。AGENTS.md:42 明文允许“带路径范围…只提交自己负责的文件，或不 commit、交给文件所有者”，AGENTS.md:43 要求“台账写入一律即时提交（路径限定）”。D17-03 收窄了这两条，与 D17.md:14 的“不改变…工程规则”自相矛盾 → 反例 |
| D17-07 | “先由规则 owner 确认” | 来源是 OMP1-03，不算凭空新增；但在没有限定条件时，读起来像发出前多一道审核（N3） |
| D17-02 | “并发写者各用独立 worktree，由单一集成人合并” | 授权。来自 OM-02，与 fork_task 的宿主约束一致；与 AGENTS.md:37 也不冲突，因为 AGENTS.md:37 已禁止并发写同一 checkout |
| D17-13 替换文本 | “只有 BLOCKED 才进入决策” | 在工程执行语境下成立；但若作为一般陈述写进 PM 正文，会与 U90、U93 的部门发起投票权及 Rule 20 冲突（N6） |
| D17-15 | D1-04“LeadMentor 是导师族唯一投票席”、D1-12 三族 | 授权（C2-1③、C2-3.3） |
| 其余条目 | — | 未发现新增规则 |

---

## 5. 两种立场的要点

**steady（保守，找更朴素的方案）：**
- D17-11 对 D16 是空操作，可以删掉一个目标，减少重复编辑已对齐的行。
- 被并入 D16 的输入草稿（`phaseB-dispatch-draft.md`、`phaseB-review-governance.md`）逐行打补丁容易漏行，本报告已发现 `:46` 漏改。替代做法是只改 worker 实际会点开的入口：在派工消息和 LEDGER 的引用中只指向 D16 现行正文，不再指向这两份文件。这是可选方案，与“直接替换正文”二选一，不阻断。
- D17-14 改 D16-07 时应逐字同步 PM#25 的现行文本，不另写措辞。

**divergent（换框架）：**
- D17-15 把 D1 当成“改几行”的修补，但 AGENTS.md:3 把 D1 定为身份、权限、沟通与上报详表的权威来源，而 D1 是 10-31 的旧制度。逐行修补会漏掉 D1-02“可按方面同时开多个实例”、D1-05“台账含纠错表、进度”（与 C4-3.4 冲突）、D1-07“一个 issue 一个”、D1-08“每条 e2e 路径一个”。替代框架是按 C2-1 的三元结构整表重写 D1 roster，并逐条对照 LEDGER，而不是只修审计点名的行。本席的反对票只要求补齐会造成主路径失效的几行，整表重写作为建议。
- D17-10 的 Skill 读者实际有两类：领导工作台与各仓工程席位。只装一处覆盖不到工程席位，应决定是否把工程侧要点写进派工消息模板（tern-worker）或各仓精简 AGENTS.md（D1-14、D1-20）。

---

## 6. 反例（反对票依据）与修订文本

### 反例一：D17-03 与本表执行段、AGENTS.md:42–43 冲突

- **场景：** D17 通过后，按执行段（`local://decisions/D17.md:52`），治理分身 `PhaseBClone_ffeb` 作为 fork 子代理，在与 Main 共享的 pepgent-soroi 工作树中写 `.omp/skills/omomp-efficiency/SKILL.md`，然后“路径限定提交并推送”。秘书在同一工作树按 AGENTS.md:43 即时提交 LEDGER 状态行（执行段第 51 行）。
- **证据：**
  - `local://decisions/D17.md:32`：“与父会话共享工作树的 subagent 不自行提交”；
  - `local://decisions/D17.md:50-52`：秘书和分身都要路径限定提交；
  - `AGENTS.md:42`：共享 checkout 上允许路径限定、只提交自己负责的文件；
  - `AGENTS.md:43`：“台账写入一律即时提交（路径限定）”；
  - `omp-todo-more/src/git.ts:17-20`：共享父工作树的 subagent 的 DONE 不欠提交。这是工具不替它提交，不是禁止它提交。
- **失效点：** D17-03 一旦作为 Skill 条文执行，分身和秘书就不得提交，SKILL.md 与 LEDGER 改动会成为共享工作树里无人提交的改动（OMP1 记录的 `3713366b`“会留下未提交修改”就是这种情形）。这与本表执行段直接矛盾，并收窄了 AGENTS.md:42。
- **修订：** 把“与父会话共享工作树的 subagent 不自行提交”改为：“与父会话共享工作树的 subagent，todo 的 DONE 不替它提交（工具语义）；它自己负责的路径按 AGENTS.md:42 用路径限定的 `git add <路径> && git commit` 提交并推送，或交文件所有者集成；不提交他人的改动。”

### 反例二：D17-15 执行后，PM#1 仍与现行制度冲突

AGENTS.md:3 写明“身份、权限、沟通渠道和上报路径的详表以 Pepgent/PM 的 D1 决策 issue 为准”，所以 D1 中残留的旧条款会直接成为派工依据。

- **A. D1-07、D1-08 的进程粒度与验收方式**
  - **场景：** 领导层按 D1 启动工程师或测试者。
  - **证据：** PM#1 body:13（D17 编号 25）D1-07 写“tern 中的独立 omp 进程，一个 issue 一个”，首步“用 omp 的 `wt` 工具切入该 issue 专属的 worktree”；body:14（D17 编号 26）D1-08 写“每条 e2e 路径一个…在真实环境跑端到端，把证据写成 PR 评论”。现行规则见 `LEDGER.md:57`（C3-4.1 一仓或一路径域一进程）、`LEDGER.md:60`（C3-4.4 切片 worktree 用 `git worktree add -b`，不用 `omp wt`）、`LEDGER.md:17`（C1-3 开发期不做每步 runtime 验收）；D16:33 设 10 个席位，D16:35 第⑥段规定 worktree 纪律。
  - **失效点：** D17-15 只替换启动命令和 `/usage` 前置，“一个 issue 一个”“`wt` 切入”“每条 e2e 路径一个、真实环境跑 e2e”原样保留。D17-15 的取舍“PM#1 与现行制度一致”不成立。
- **B. D1-01 的工作位置**
  - **证据：** PM#1 body:7（D17 编号 19）写“在 omp worktree 中工作”。D17-15 依据的审计 R20-07 给出的替换文本是“顶层 Main 会话及其 omp worktree”（`local://argon/pm-error-paths-audit.md:237`）。现行规则是 `LEDGER.md:60` C3-4.4“主会话停留在 pepgent-soroi 的 main 分支（U34）”。
  - **失效点：** 照 D17-15 加 R20-07 执行，结果仍与 C3-4.4、U34 冲突。
- **C. 遗漏两个独立职能部门**
  - **证据：** D17-15 的 how 写“D1-13 列出现行的支撑与巡检角色及其边界”；审计 R20-07 列出的角色是 ArgonGovernance、Secretary、Sentinel、BehaviorAnalyst、GovernanceInspector（`pm-error-paths-audit.md:244`）。`LEDGER.md:27-30` C2-1② 把 SoroiKeeperOpus、SoroiKeeperGpt、OmompOptimizer 定为领导层独立职能部门：不是下级，不参与例行投票，有权发起投票（U90、U93、U94）。
  - **失效点：** 按 D17-15 执行后，权威身份详表里没有这三个角色，也没有它们的发起投票权。若把它们写进“支撑”一栏，又与 U94“不是你的下级”的定性相反。
- **修订（在 D17-15 的 how 中补入）：**
  - ① D1-01 的 where 改为“顶层 Main 会话，停留在 pepgent-soroi 的 `main`（C3-4.4、U34）”，删去“omp worktree”与旧 session id；
  - ② D1-07 的 where 改为“负责某一仓或互斥路径域的独立 tern 席位（D16-09）”，删去“一个 issue 一个”和“用 `wt` 切入”，改为 D16-09 与 D16-11 第⑥段的 home worktree 和切片 worktree 纪律；
  - ③ D1-08 删去“每条 e2e 路径一个”和开发期真实环境跑 e2e，改为“按 D16-10、D16-13 的时点编写 spec，阶段 C 统一执行”；
  - ④ D1-13 另列独立职能部门 SoroiKeeperOpus、SoroiKeeperGpt、OmompOptimizer：顶层常驻，不是 ArgonGovernance 或 Main 的下级，不参与日常事务与例行投票，有权发起投票（C2-1②、U89–U94）；
  - ⑤ home worktree 改引 D16-09，不引 D16-00。

---

## 7. 非阻断意见

- **N1（D17-01）：** 取舍中的“完整链路尚未实测”应改为“已观察到一次：顶层 omomp-optimizer 派出四名巡检员并产出 OMP1（`omomp-optimization-1.md:27`、`inspection-*.md`）”。升级状态以拥有方的运行证据为准。
- **N2（D17-05、06、08）：** 补入三点：
  - 无工具的 LeadMentor 或 mentor 收到的是完整正文，不是路径（OMP1-01 取舍）；
  - 不在 eval 中用 subprocess 或 Bun.$、非 literal 命令绕过原生读取和 delete-guard；返回 hasError 时先处理（OM-05、OM-06）；
  - 不借 D17-08 取消或变更合法监督配置（OM-08）。
- **N3（D17-07）：**
  - 恢复限定词：“**已授权（已通过决策或 annexA 已列明承载）的**普通承载与状态问题，由负责写入的秘书在原 BLOCKED 评论下闭环”；
  - 把“先由规则 owner 确认”改为：“发出者先自行核对源头正文（(U) 原话、已通过决策的行号），带链接一次发出；只有正文本身存在歧义或矛盾时，才按职责交给 owner（LEDGER 矛盾交 ArgonGovernance 第 7 条，用户意图交 Argon 引 (U) 裁决，契约交表决）”。这样与 OMP1-03“不加第二审核人”、C5-2、C2-4“不甩锅给双核”一致；
  - 补“已发错的必须明确纠正”。
- **N4（D17-11、D17-14）：** D16-11③ 已经对齐，应从 D17-11 的 where 中删去。D16-07 的 PM 文件（D16:31）应逐字同步 PM#25 body:16 的现行文本，避免同一条目出现第三种措辞。
- **N5（D17-11）：** 把以下三处一并对齐到“本仓编译、类型与基础检查”（C1-3、D16-11④）：D8-14 的“本仓真实入口检查不删减”（D8:85）、D10-05 的“验收只写本仓真实入口”（D10:17）、派工草案 P-4（phaseB-dispatch-draft:46）。
- **N6（D17-13）：**
  - 补改 D16:13、D16-12 的标题与 how 中“即视为派工预审完成”，统一改为“最终派工授权”；
  - D16:43、D16:88 的“抄送双核”与 D16-12 现行正文冲突，一并替换；
  - 替换文本中的“只有 BLOCKED 才进入决策”限定为“工程执行事项只经 BLOCKED 进入决策”，不影响部门发起投票权与 Rule 20。
- **N7（D17-11、D17-14）：** D10:5 的讨论者、D15:18 的“本表经 steady/divergent 两份审查”、D16:5 的版本说明、D16-process:16、PM#25 计票摘要中 ArgonGovernance 的 14/14，都是对已发生事实的记录。可以删去，或改为不含现行指令的中性陈述，但不得改写成“由 task:high 审查”或“ArgonGovernance 未投票”。计票摘要建议保留事实，另注明“按现行规则 argon 族票以 Argon 为准，结果不变”。
- **N8（D17-14）：** `.omp/skills/tern-worker/SKILL.md:42` 写“argon 双核”参加三族表决，`:43` 写“设计档由 task:high 撰写、双核审查”，与 C2-3.3 不一致。这两处不在 PM，不属于 D17 范围；按 AGENTS.md:50 的注，可由 ArgonGovernance 依 C2-4 直接对齐，无需表决。
- **N9（D17-12）：** 写明 `evidence/argon/phaseB-review-governance.md:152–154` 改成什么（并发上限保留，删去“再启动下一波次”，改为“名额加自身依赖就绪”）。同时写明 D16-10 中 W-10 的优先补位是否保留。
- **N10（D17-10）：**
  - 写明 Skill 只用于领导工作台，不属于 omp-soroi 产品（C1-1）；
  - 写明“首次真实加载使用”的结果由谁记录、记在哪里（PM `evidence/`）；
  - 其他仓的工程席位读不到这份 Skill（D1-14）。如需覆盖，应走派工消息模板或各仓精简 AGENTS.md，另行决定。
- **N11（D17-15，divergent）：** 建议按 C2-1 整表核对 D1，而不只修点名的行。另有两处冲突：D1-02“可按方面同时开多个实例”与常驻单一 Argon 冲突；D1-05“台账含纠错表、进度”与 C4-3.4 冲突。
- **N12（全表）：** D17 第 16 行的 LEDGER 基准写作 `28dcb24`；本席核对的是工作树中的现行 LEDGER.md，没有用 git 核对该提交号。

---

## 8. 本席实际做了什么

- 读取：`local://decisions/D17.md`、`local://decisions/D16-15.md`、OM、OMP1、R20 审计全文；`LEDGER.md`、`AGENTS.md`、`.omp/skills/decision-vote/SKILL.md`、`.omp/agents/secretary.md`、`.omp/skills/tern-worker/SKILL.md`、`.omp/agents/omomp-optimizer.md` 的相关行；PM 中的 `D16-phaseB-review-restore.md`（含 :31、:34–36 的 raw 全文）、`phaseB-dispatch-draft.md` 全文，以及 `phaseB-review-governance.md`、`D10-repo-delivery.md`、`D8-mvp-scope.md`、`D15-private-decision-discard.md`、`D16-process.md` 的被引用行；`omp-todo-more/src/git.ts`。
- 命令：`gh issue view 1 -R Pepgent/PM`、`gh issue view 25 -R Pepgent/PM` 的正文（对 PM#25 正文做了 grep），以及用 `sed`、`grep` 读取上述行号。
- 未做：未读 session、git 历史、PM#25 评论，未读其他席位的 D17 选票；没有用 hash 作证据。

## 9. 修订后重投

治理分身修订了 `local://decisions/D17.md` 中 D17-03、12、13、15 四行（:32、:41、:42、:44），本席逐行复核：

- **D17-03：** 反例已消除。修订后写明“工具不替共享工作树的 subagent 提交，自有路径按 AGENTS.md:42 自行提交或交所有者集成”。
- **D17-12：** N9 已落实，路径写全为 `evidence/argon/`，并保留 W-10 的优先补位。
- **D17-13：** N6 的漏改行已补入 where，但新写入的 how 有一处说法不实。how 称所写口径“与现行 PM#25 中 D16-12 一致”，而 PM#25 body:21 的原文是“PR 正文写本仓**真实入口检查**的 (R)”，D17-13 写的是“**编译、类型与基础检查**的 (R)”。D17-13 的写法符合 C1-3 与 D16-11④，实质正确，但应改说为“替换 PM#25 D16-12 的该句”，并把 body:21 列为明确的替换目标。“只有 BLOCKED 才进入决策”仍未限定范围。以上两点都不阻断。
- **D17-15：** 反例 A、B、C 均已消除。

重投结果：四行均为赞成。D17 全表 15 项赞成、0 项反对，详见 `local://votes/D17-claude-high.md`。
