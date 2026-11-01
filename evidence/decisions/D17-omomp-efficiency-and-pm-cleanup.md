# D17：omomp 提效方针与 PM 错误路径清理

起草：阶段 B 治理分身 `PhaseBClone_ffeb`。依据：U89–U90（omomp-optimizer 的正式方针须经投票）、ArgonGovernance 第 20 条（PM 错误路径删除与修改须经投票）。本决策优先级高，但不阻塞在跑的席位。

## 输入

| 简称 | 来源 |
| --- | --- |
| OM | ArgonGovernance.OmompOptimizer 第一轮报告，含 OM-01..08、OM-S1：`local://argon/omomp-optimization-round1.md`（PM `evidence/argon/omomp-optimization-round1.md`，`b358815`） |
| OMP1 | 顶层 OmompOptimizer 正式表决稿，含 OMP1-01..04：`local://argon/omomp-optimization-1.md`；第二波索引：`omomp-optimization-wave2.md` |
| Skill 草案 | `local://argon/skill-draft-omomp-efficiency.md`，以及 `skill-draft-wave2-{bounded-evidence,dependency-batch,source-handoff,tool-contract}.md` |
| R20 | PM 错误路径审计：`local://argon/pm-error-paths-audit.md`（R20-01..10，§6 拆为五项） |

OM 与 OMP1 中重叠的条目合并为一行，来源列写全，便于追溯。D17-01..10 是工作方法，不改变业务契约、宿主或工程规则；D17-11..15 是对已通过 PM 正文的修正。

## 表决规则与 LEDGER 核对（`28dcb24`）

- 依 C2-3.3 与 AGENTS D1-12，按三族计票：
  - Claude 族：主会话、本分身、独立 task:high；task:high 兼做 steady/divergent 两个视角的压力测试。
  - argon 族：常驻 Argon 一票。
  - 导师：LeadMentor。
- C2-4：已写入 LEDGER 的用户规则（C1-3、C5-4 等）直接执行。D17-11..15 只把 PM 正文改到与这些规则一致，不重新表决用户规则本身。
- C4-3：直接替换现行正文。已发出的评论和原票不回写，另发一条说明，指出现行权威。
- C5-4：表决期间在跑的席位照常推进。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D17-01 | **有自带巡检的角色按真实 custom role 派发** | OM-01 | 有 task 权限的上层直接用 `agent:"omomp-optimizer"` 派发，不再用 task:mid 加“扮演”提示词代替。不改 task-mid 权限，不借 eval/fork 绕过 spawn 策略 | 角色与权限一致，巡检结构得以恢复；修复后的完整链路尚未实测 | 串联 | 否 |
| D17-02 | **task 派发一次写全** | OM-02；OMP1-04（派发部分） | 每项显式写 `agent`；只读研究项写 `isolated:false`；一项一个主题；共享 context 与 task 不写“简洁/≤N 行”之类的长度限制；长报告写入 `local://` 后返回路径。并发写者各用独立 worktree，由单一集成人合并 | 减少隔离和报告长度两类拒绝；语义拆分检查仍可能提醒，不保证零重试 | 实现 | 否 |
| D17-03 | **todo 用 DSL 一次写对** | OM-03；OMP1-04（todo 部分）；`AGENTS.md:42`；`omp-todo-more/src/git.ts:17-20` | 首次使用 todo 前先读 `xd://todo/protocol`。整份文档放在 `*** Begin Todo` 与 `*** End Todo` 之间；INIT/GOAL 用三个字符串，ADD 的时长写整数分钟。DONE 只提交自己负责的路径。与父会话共享工作树的 subagent 调用 DONE 时，工具不会替它提交；它自己负责的路径按 `AGENTS.md:42` 执行 `git add <路径> && git commit` 并推送，或交给文件所有者集成 | 不必反复猜语法，也不新增计划仪式；现行提交规则不变 | 实现 | 否 |
| D17-04 | **只编辑完整读过的最新快照** | OM-04 | 用 non-raw read 取得 header；长行被截断时，再用 `:raw:N-M` 读出完整目标行，然后以紧范围 PUT 修改；移动内容用 CUT/PUT 寄存器，不手抄 | 多一次必要的补读，避免盲改；不把 hash 当证据 | 实现 | 否 |
| D17-05 | **有界取证：先确认字段形状，复用已取回的内容，传递真实来源** | OM-05；OMP1-01；OMP1-04（jq/raw 部分） | 读 JSON 先取 `?limit=2` 确认字段，字段写 `ts:.timestamp`；按时间窗定位 error，再读 resultEntry；fork 以 `session_init` 为界；未进索引的 worker 直接读原始 JSONL。结果被截断时读已有 artifact 的有界 raw，不重新抓全文。跨代理交接用对方可解析的路径或 URI。raw 正文不加 `--jq` | 消除已观察到的同类扇出错误和重复远程抓取；必要的全文与分页不受限制，不加缓存 | 技术 | 否 |
| D17-06 | **按设备协议调用，GitHub 优先用原生读取入口** | OM-06 | `xd://` 设备通过 `write` 调用，不发明 `xd.github(...)` 这类函数；读 issue/PR 用 `issue://`、`pr://`；读文件优先用当前挂载的 read 资源或 `xd://github` 的 `file_read`，未挂载时才用 `gh api`。写操作仍走已授权 owner 的既有路径，账号用 RiriAgent | 参数更准、上下文更完整；不声称设备总比 gh 快 | 实现 | 否 |
| D17-07 | **先向源头确认，再一次交接；普通缺口在原总线闭环** | OM-07；OMP1-03 | 某条已有规则是否适用，先由规则 owner 确认，再带源头链接一次发出，不再出现广播、撤回、再恢复的往返。普通承载与状态问题由负责写入的秘书在原 BLOCKED 评论下闭环。真正的契约争议仍走表决；已写入 LEDGER 的用户规则不重投。`peer_send` 的 accepted 只表示已投递 | 去掉自我反转和中间人跳转；不免除真正的决策，也不新增预审 | 串联 | 否 |
| D17-08 | **等待与归因按真实生命周期统计** | OM-08 | `durMs` 不当作浪费；idle 不当作缺席；watchdog 的指控不当作执行事实。task 结果自动交付；长命令用 `exec_command` 并挂一次 monitor，不轮询 | 不夸大提效成果，保留正当等待 | 实现 | 否 |
| D17-09 | **按真实依赖划分批次** | OMP1-02 | 互不依赖的读取放在同一轮并行；有依赖的写操作串成一条，例如 `git add <路径> && git commit`；短查询不另派代理；沿用现有并发上限和席位生命周期 | 减少往返，避免错误并行；不新建调度器 | 技术 | 否 |
| D17-10 | **安装一个 project 级 Skill，内容只收已通过的行** | OM-S1；Skill 草案（含 wave2 的四份） | D17-01..09 中通过的行，以 Before/After 和真实工具模板的形式合并写入 `.omp/skills/omomp-efficiency/SKILL.md`，包括触发条件与权限边界；路径限定提交后推送。首次被真实加载使用时记录结果；没有运行证据前只标“已建立” | 一份复用文档替代反复口头教学，不新增规则来源 | 实现 | 否 |
| D17-11 | **切片粒度：issue 作为索引，同域切片可以合并为一个 PR** | R20-01、R20-09（D10-05 部分）、R20-10；D16 定稿 D16-11③、D10:17、D8:85（D8-14） | 把各处“一个切片对应一个 issue 和一个 PR”统一替换为：“切片 issue 作为范围、依赖与状态的索引；同一仓或同一互斥路径域内的关联切片，由所属席位连续实现，可以在同一个 PR 中用多个 `Closes #X` 合并提交；只有编译、类型、构建或调用契约上的真实依赖才需要等待；不要求每个切片单独开 PR，也不要求单独做 runtime 验收。”D8-14 中“由独立 tern 工程进程完成”改为“由负责该仓或互斥路径域的独立 tern 席位连续完成”，并写明 VS1、VS2、W1–W7 只是映射 ID，不是波次。D10 文件头中把 medium `discuss:*` 当作现行讨论机制的读法一并删去 | 正文与 C1-3（U83）一致；最终统一验收不变 | 串联 | 否 |
| D17-12 | **席位按“空出名额 + 自身依赖就绪”滚动启动，取消固定队列** | R20-02、R20-09（D10:30）；D16-10；PM `evidence/decisions/phaseB-dispatch-draft.md` 第 16、45 行；PM `evidence/argon/phaseB-review-governance.md` 第 152–154 行 | D16-10 的“滚动补入”改为：“同时活跃的席位仍不超过 4 个。任何席位释放名额后，立即从等待中的席位里挑一个自身依赖已满足的启动，不按固定顺序等待无关席位。W-10 在 `protocol/lab` 的真实上游合入后，优先补入下一个空出的名额。W-08 按逐 spec 读法编写，不固定排在最后。”D10:30 和派工草案中的固定队列，按同样口径替换 | 关键路径不再被无关席位拖住；内存上限不变；保留 W-10 的优先补位 | 串联 | 否 |
| D17-13 | **删除派工预审、签署、回写前置、退役复核等已废除关卡的现行表述** | R20-03、R20-04；PM `evidence/argon/phaseB-review-governance.md` 第 9、114、149–150 行；PM `evidence/decisions/phaseB-dispatch-draft.md` 第 19、30、32、46、47 行；D16 定稿第 13 行（“派工预审完成”）、第 43 行与第 88 行（“抄送双核”）、D16-12 的备选列，以及讨论表第 60、65 行；PM#25 正文 | 把上述文本替换为与现行 PM#25 中 D16-12 一致的口径：“D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置；发车记录写入文件并归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核；G-1..G-7 是执行契约和事后检查清单，不是启动前的签署门禁；合并异步，PR 正文写本仓编译、类型与基础检查的 (R)（C1-3）；只有 BLOCKED 才进入决策。”D16-12 的备选列删去三种已落选的关卡方案。PM#25 中已发出的评论不改，另发一条说明：“评论中的方案 B 和退役复核只是被否决的历史” | 与 C5-4（U83、U84）和 C1-3 一致；worker 读到的只剩一套规则 | 串联 | 否 |
| D17-14 | **投票席位与压力测试改按现行 LEDGER 表述** | R20-05、R20-06；D16-07 定稿文本、PM#25 计票摘要；`phaseB-review-governance.md` 第 18、78 行；`phaseB-dispatch-draft.md` 第 23 行；D15 定稿第 15、18、56 行；`D16-process.md` 中的规范性表述 | 统一改为：“argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票。ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席。压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策。”历史选票、讨论者报告与评论保持原样，另附 supersession 说明 | 与 C2-3.3、U11、U84 一致 | 串联 | 否 |
| D17-15 | **D1 组织契约（PM#1）改为现行 roster、进程粒度与启动命令** | R20-07、R20-08；PM#1 正文（按 `gh issue view` 输出行）第 19、21、22、25–27、30、31 行；LEDGER C2-1②、C3-4.1、C3-4.4、C1-3；D16-09、D16-10、D16-13 | 逐条改动：<br>• **D1-01**：删去具体的旧 session id，改写为角色名；主会话停在 `pepgent-soroi` 的 `main`（C3-4.4、U34），不写“在 omp worktree 中工作”。<br>• **D1-04**：写明顶层常驻 LeadMentor 是导师族唯一的投票席。<br>• **D1-07**：工程进程改为一仓或一互斥路径域一个 tern 席位（C3-4.1、D16-09），删去“一个 issue 一个进程”和首步用 `wt` 的说法。启动命令的模型与扩展引用 D16-00，home worktree 与切片 worktree 引用 D16-09。删去 PTY `/usage` 前置。<br>• **D1-08**：测试代码按 D16-10 的逐 spec 时点编写；跨组件 e2e 只在阶段 C 执行（D16-13、C1-3）；删去“每条 e2e 路径一个进程”。<br>• **D1-09**：启动命令与 D1-07 一致。<br>• **D1-12**：改为 Claude 族、Argon、LeadMentor 三族。<br>• **D1-13**：列出现行的支撑与巡检角色及其边界，并另列 C2-1② 的独立职能部门 SoroiKeeperOpus、SoroiKeeperGpt、OmompOptimizer，以及它们按 U90、U93、U94 发起投票的权利。<br>已发评论不改，另发 supersession 说明 | PM#1 与现行制度一致，不留旧的进程粒度、主会话位置和验收方式 | 串联 | 否 |

## 执行（通过后并行进行，不阻塞席位）

- **秘书：**
  - 开 PM decision issue，并归档定稿、原票与流程记录；
  - 执行通过的 D17-11..15 正文替换和 supersession 说明，涉及的 PM 文件路径限定提交；
  - 按 C4-3 替换 LEDGER 中对应的状态行。
- **治理分身：** 写入 `.omp/skills/omomp-efficiency/SKILL.md`，内容只收通过的 D17-01..09，路径限定提交并推送。
- **执行说明（表决期间 ClaudeHighD17 提的非阻断意见，按 C2-4 直接对齐 LEDGER C1-3，不涉及新规则）：**
  - 执行 D17-13 时，PM#25 正文第 21 行 D16-12 的“PR 正文写本仓真实入口检查的 (R)”一并替换为“PR 正文写本仓编译、类型与基础检查的 (R)”。
  - 执行 D17-11 时，D8:85（D8-14）、D10:17（D10-05）中的“本仓真实入口检查”同样改为“本仓编译、类型与基础检查”。
  - D17-13 所说“只有 BLOCKED 才进入决策”，指的是工程执行事项；独立职能部门的发起投票权和第 20 条修正不受影响。
