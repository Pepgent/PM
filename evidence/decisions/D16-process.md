# D16（阶段 B：D15-11③④ 双核复核转 PM 决策）流程记录

执行者：阶段 B 治理分身 `PhaseBClone_ffeb`，由主会话派出，依据 D15-11、R21。

## 步骤 1：开始前 LEDGER（`8bfd70c`）逐项核对

| 条款 / 要求 | 核对结果 |
| --- | --- |
| C1-1…C1-4 | 本分身只做治理起草与收票，不触及产品实现、仓库拓扑、测试环境与 SOPS |
| C2-1 | 复核结论由 Argon、ArgonGovernance 作出；本分身不单方裁定意图、范围、契约或分类，只起草决策项并组织表决 |
| C2-2 | 双核按正交职责各写复核；本分身不请 argon 族代查主会话违规 |
| C2-3 | 逐条表决；Claude 族＝主会话＋本分身＋独立空白历史 task:high，族内全赞成；argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票；ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席；反对附反例；分类争议交导师终局仲裁（D1-17） |
| C2-4 | 用户直接授权事项不另立表决跳过 |
| C3-1 | subagent 一次一名（OS 看门狗内存约束） |
| C3-2 | 本分身即 fork_task 分身，与主会话合计 Claude 族一票 |
| C3-3 | 压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策 |
| C3-4 | 不启动、不恢复 tern 工程师；一仓一进程派工方案不在本分身范围 |
| C3-5 | skill、agent 修订经领导小组与双核审定后才落盘 |
| C4-1 | 常规状态写 PM issue；不向双核发无实质回执 |
| C4-2 | 中文；不在 PTY 另起 omp |
| C4-3 | local 只放草稿；定稿、原票、流程记录归档 PM `evidence/`；LEDGER 只直接替换 R21 与决策索引状态行 |
| C5-1 | 不读历史 session（含 `01a193fd`） |
| C5-2 | 本表即逐项核对；以后每步附核对 |
| C5-3 | 不破坏会话前遗产与保护名单 |
| C5-4 | D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置；发车记录归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核；G-1..G-7 是执行契约和事后检查清单，不是启动前签署门禁；工程执行事项只有 BLOCKED 才进入决策，独立职能部门发起投票权和第 20 条修正不受影响 |
| R1–R18 | 本步不改变其状态 |
| R19 | 🏗（PM#23） |
| R20 | 🏗（八仓核验通过） |
| R21 | ⏳→🔄，本分身推进 |

## 步骤 2：编号确认

秘书 `SecNumberB` 只读查询了 PM 当前的 23 个 issue 和 `evidence/decisions/` 下的 32 个文件，结果是 D1–D15 均已占用，没有 D16。本决策使用 D16。秘书另报了一项不一致：D5、D6 的 issue 标题对应 #6、#5，与 LEDGER 决策索引中的链接互换。

## 步骤 3：双核复核到齐

Argon 的复核写在 `phaseB-review-argon.md`，ArgonGovernance 的复核写在 `phaseB-review-governance.md`，两份都已归档到 PM `evidence/argon/`。主会话的派工方案（`phaseB-dispatch-draft.md`，附 LEDGER 核对）依双核口径并入 D16。

## 步骤 4：盘点与起草

由一名 task:mid 只读产出 annexA，内容为 A1、A2、A3 三张表及 BLOCKED-A/B/C。在此基础上起草 D16 v1。

## 步骤 5：压力测试与修订

- **steady → v2**：25 条意见，采纳 24 条。未采纳的一条是 D5/D6 链接方向，issue 当前标题证明原链接互换。
- **divergent → v3**：新增 D16-00 用户指令、合并异步、lockfile 规则、`compose/**` 归属、DIST-02 归 W-08、`--artifact` 五个入口、A2-05..A2-12。

## 步骤 6：三族表决（并行收票，修改行只重投受影响的行）

| 轮次 | 反例或否决 | 修订 |
| --- | --- | --- |
| 主会话 v2 | D16-09：根 checkout 作 `--cwd` | home worktree |
| ClaudeHighD16 v3 | D16-01、06、08、10 | E2E-20/21 归 W-10；`design/` 回写交 Argon；mux 以 `e004fa1` 为底；W-10 的 e2e-lab 时点 |
| 导师 v3 | D16-10、13：逐 spec 读法 | 由 Argon 依 U1 作本意裁决，取代该反例 |
| Argon v2 | 依 (U) U83、U84【定】否决 D16-01、04、05、06、09、10、12 中的阻挠条款 | D16-05 改为单个 PR；D16-06 与发车并行；D16-10 改为 4 席并发、逐 spec；D16-12 通过即发车 |
| 主会话 v3 | D16-12 的三道同步关卡（附用户原话） | 并入上一行的 Argon 修订 |
| 主会话 v4 | D16-11、12：PR 正文贴 LEDGER 长表（watchdog:21） | 删去该要求 |
| ClaudeHighD16 v4 | D16-10：W-10 退役后 E2E-20/21 无人编写 | 加入 W-10 重新进场规则 |

**结果：** Claude 族（主会话、PhaseBClone_ffeb、ClaudeHighD16）、argon 族（Argon、ArgonGovernance）、导师（LeadMentorD16）各 14/14 赞成。D16-00 为用户指令，不投票。

## 步骤 7：执行

- **主会话**：按 D16-12 发车第 1 批，即 W-06、W-05、W-01、W-02。
- **Argon**：回写 `design/*.md`。
- **秘书四路并行**：SecD16Close 负责归档、计票、关闭 PM#25 与 LEDGER；SecD16PMDocs 负责 PM 文档；SecD16SoroiIssues 负责 soroi issue；SecD16OtherIssues 负责其余各仓 issue。

各步 LEDGER 核对：C2-1 不由主会话裁定，C2-3 三族逐条，C3-3 含独立 task:high，C4-1 与 C4-3 归档 PM，C5-4 通过即发车。
