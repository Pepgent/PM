# D15 流程记录（D15Clone，leader 分身）

每一步开始前读 LEDGER.md 全文并逐项对照；此处记录每步对照的条目与结论。

## 步骤 0：接受任务、读规则
- 读：LEDGER.md 全文（U1–U73、R1–R83、E1–E32、进度）、skill://decision-vote、D14 决策与选票格式。
- 对照：U11/U12/U14（决策只由领导小组、逐条表决、PM issue）；U20/D1-12/16/17（族计票、argon 引 U、分类仲裁）；U21（分身处理领导事务）；U25（能用 low/free 则用）；U1、U50、U57（历史会话只由 subagent 调查，不预设问题）；U62–U73、R76–R83、E32。
- 冲突：无。决定 Claude 族由本分身投票（D13/D14 先例，未调度 task:high，任务明令不调度）。
## 步骤 1：导师前审调查方法（流程偏差，已作废）
- 动作：派 D15Mentor 审阅调查方法，并据其意见写了带 9 类事件清单与分类字段的取证规范，第一批 22 名取证者按它开工。
- 对照：AGENTS.md 第 39 行与 E3——用户要求的独立分析不设导师前审、不自拟问题清单。主会话 IRC 转告用户要求“只能由独立 subagent 分析……不给它们预设任何问题或嫌疑”。本步与之冲突。
- 纠正：第一批 22 名取证者全部取消；已产出的 T08 草稿与规范文件丢弃到废纸篓；导师前审意见不作任何依据。导师族投票改由新起的导师实例担任。

## 步骤 2：argon 席位
- 对照：U1、U11、U64、U65（argon 须参与）；D1-16。
- 动作：主会话先告知席位为常驻 agent://Argon，后告知其被取消、席位由我安排；我起的 D15Argon、D15Argon-2 均在未产出文件时取消，因常驻 Argon 仍在运行并已发布基线（local://argon/D15-intent.md），保持单一 argon 席位为常驻 Argon。

## 步骤 3：中性取证派发
- 对照：U1（历史会话只由 subagent 调查）、U42/U47/U49/U50/U53/U57（独立、无预设、不代读）、U-Argon-1（取证不转嫁 argon）、U25、E5；主会话更正：其凭记忆写的私自决定清单作废，不作输入、线索或核对基准。
- 动作：22 名 task:mid（R01–R12 时间切片，S1–S4 分身与子 agent，G1–G6 仓库对象侧），isolated:false 只读；任务只含用户原话三项：每个决定或指令、有无 argon 与领导小组参与、造成的具体改动。报告写 local://inv/d15/。
- 主会话曾按其理解停止本分身，22 名取证者在 2.8 秒内被取消、无产物；常驻 Argon 裁定 U72 不含 D15 分身后，原样重派 22 名（R01-2…G6-3）。

## 步骤 4：常驻 Argon 第二份裁决与行为分析
- 对照：Argon 第二份裁决（主会话转交原文）6 条硬约束——表决前禁止工程/仓库变动；取证由本分身自派、不转嫁 Argon；每步附 LEDGER 对照；表按 D15-intent 六项裁决与 V-1..V-7 起草；不设导师前审；Argon 全程把关。另对照 U29/R62（behavior-analyst）。
- 动作：加派 behavior-analyst（BehaviorMain）对主会话做中性行为分析，报告写 local://inv/d15/BehaviorMain.md，不写 PM、不提交。
- 冲突：无。本分身此后只写 local:// 草稿与表决材料，不改任何仓库文件、issue 或 PR；PM issue 与归档由秘书在表决阶段执行。

## 步骤 5：取证完成与事实索引
- 对照：U57（至少 20 个 task:mid 独立分析——22 名完成，另 behavior-analyst 1 名）、U50（不带问题）、U68–U69、R80；Argon 第二份裁决第 2 条（取证不转嫁 Argon）。
- 结果：R01–R12、S1–S4、G1–G6、BehaviorMain 共 23 份报告写入 local://inv/d15/。
- 动作：派 task:mid Index 仅做跨报告去重合并为事实索引（不判断对错、不提处置），供起草 D15 表；起草时逐行回到原报告核对。
- 另：常驻 Argon 告知新增 argon 族实例 ArgonGovernance（用户 U77–U78），D15 表须同时交 Argon 与 ArgonGovernance，合为 argon 族一票。

## 步骤 6：起草 D15 表
- 对照：LEDGER 已依 U80 重构（`bdaa278`、`80b0267`），起草前通读新版全文（C1–C5、R1–R21、U1–U80）；对照表写在 `local://decisions/D15.md` 开头。旧 GapClone 遗留的 `local://decisions/D15.md` 三条草稿已整体替换。
- 依据：INDEX 主表、表决内活动表与对象表；Argon `D15-intent.md` (a)–(f)、V-1..V-7；ArgonGovernance `D15-governance-baseline.md` M-1..M-4、VG-1..VG-8。
- 结果：D15-00（用户指令，不投票）至 D15-14。随 U80 调整：LEDGER 不再回退 `e2663c1`（旧 E 表已删，规则入 C1-3）；AGENTS.md、secretary.md、watchdog 现行文本以 ArgonGovernance 依 U80 对齐的版本为准，由 argon 族在 D15-08 审定。

## 步骤 7：讨论者审查
- 对照：系统要求重大决策同时咨询 discuss:steady 与 discuss:divergent；C3-3。
- 动作：两位讨论者只读审查 `local://decisions/D15.md` 全文，对照 INDEX 与原报告找反例。
- 结果：steady（有条件；反对 D15-03、D15-05、D15-08、D15-10、D15-11）与 divergent（有条件；反对 D15-02、D15-05 及 D15-04②④）。主要采纳：49 个旧正文来源核实为 `/tmp/d10-rewrite/prepublish/*.json`（51 份，含完整 body），已复制到 `local://inv/d15/d10-rewrite-snapshot/`；改为“先按仓得出会话前状态、减保护名单、差集逐项归因”的方法（新 D15-02）；每仓从新到旧 revert（新 D15-03）；补重开 7 个被会话合并关闭的会话前 issue 与 Pepgent#9；不把来源不明与会话前 worktree 列入删除；mux 草稿改为保留分支 `issue-13-mux-design`；拉取远端产生的合并提交 `7ec91a8`、`59cdff1` 不单独 revert；保护名单显式化（含 U57 的 `e519e5b`、Pepgent 15 个显式 SHA）；D15-08 引用 watchdog 用户原话 entry `f1522aca`、`b43e08ed`、`3ec9c0d3` 并请 Argon 复核 (d)⑤，去掉“赞成票即视为审定”；D15-11④ 收窄为决策、契约、派工、路径域、验收正文与回写表决，私有实现按 C2-1 由工程师自决；D15-13 改分类为串联并加入主会话逐条表态与讨论者压力测试；新增附录 A 覆盖 X-01…X-124。未采纳：读取 GitHub 编辑历史（仓库规则未授权，改为 BLOCKED 交领导小组）。

## 步骤 8：三族投票
- 对照：C2-3（族计票，Claude 族须主会话与分身都赞成；argon 族双核均赞成；导师一票；反对附反例）；C5-1（导师前审已作废，导师族投票改由新起导师实例）。
- 动作：表全文发 Argon、ArgonGovernance、新导师 LeadMentorD15；请主会话逐条表态；本分身投 Claude 族本席票。
- 结果：Claude 族（主会话、本分身、独立空白历史 task:high ClaudeHighD15）、argon 族（Argon、ArgonGovernance）、导师（LeadMentorD15）对 D15-01…D15-14 全部赞成；经三轮修改（v3、v4、v5，见 `D15-rounds.md`）。D15-13 分类经导师终局仲裁为意图。

## 步骤 9：归档与台账
- 对照：C2-3（PM issue 计票）、C4-3（定稿与证据归档 PM；台账直接替换）、U14、R19、D15-14。
- 动作：派秘书开 PM D15 decision issue、归档全部材料、替换 LEDGER R19 与决策索引中 D15 的状态。本分身不执行任何丢弃、回退或派工。
- 结果：PM [#23](https://github.com/Pepgent/PM/issues/23) 关闭；PM `0909dbf`；LEDGER `4455170`（R19、D15 索引）。

## 步骤 10：D15-10② 只读盘点
- 对照：LEDGER `4455170` C1–C5、R18–R21（R19 🏗、R20 待执行、R21 ⏳）；D15-10、D15-02、D15-12②（解释权属 argon 族）；主会话转达执行方为本分身（C5-4.1）。
- 动作：写执行契约 `local://exec/d15/CONTRACT.md`；派 8 名只读 task:mid（soroi、pm、pepgent、deploy、images、lablibrary、remote、mux），产出 `local://exec/d15/<仓>.md`。ClaudeHighD15 第 1、2 条非阻断意见写入契约作为提议，标明以双核预审结论为准。预审通过前不做写操作。
- 结果：8 份盘点齐（`local://exec/d15/`），汇总与 9 项需双核裁决事项在 `PREREVIEW.md`。已交 Argon；ArgonGovernance 因 gemini-4-argon 配额耗尽（10:35:24Z 重置），重置后唤醒提交。不改换 argon 族模型（C2-2）。

## 步骤 11：双核预审结论与 D15-10③ 派发
- 对照：LEDGER `4455170` C2-2（双核）、C2-1（解释权）、C3-4（一仓一进程）、C5-3、C5-4；D15-10③；OS 看门狗内存压力（主会话转达：一次只派一名）与 ArgonGovernance 并发上限（每波最多 2–3 名）——取更严者，一次一名。
- 结果：Argon `PREREVIEW-argon.md`、ArgonGovernance `PREREVIEW-argon-governance.md` 均【通过】，9 项裁决一致（PM 归档 `evidence/argon/D15-10-prereview-*.md`）。
- 动作：按 mux → remote → lab-library → images → deploy → PM → Pepgent → soroi 顺序，逐个唤醒原盘点执行者执行本仓回退（同一执行者，契约要求），每仓完成并 wait 接应后再启下一仓；D15-08(2)(3) 文本替换由 soroi 执行者按 `D15-08-replacements.md` 执行；跨仓父子边由父方仓库执行者执行。
- 结果（D15-10③）：8 仓执行产出 `local://exec/d15/<仓>-exec.md`。revert PR：mux [PR15](https://github.com/Pepgent/omp-rpc-mux/pull/15)、lab-library [PR12](https://github.com/Pepgent/lab-library/pull/12)、images [PR11](https://github.com/Pepgent/images/pull/11)、deploy [PR15](https://github.com/Pepgent/deploy/pull/15)、PM [PR24](https://github.com/Pepgent/PM/pull/24)、Pepgent [PR42](https://github.com/Pepgent/Pepgent/pull/42)、soroi [PR281](https://github.com/Pepgent/soroi/pull/281)；remote main 本就在会话前位置。Pepgent 五棵注册在禁触根 `.git` 下的 worktree 经双核裁决（`RULING-pepgent-worktrees.md`）原地冻结、永不使用。其余冻结项按预审裁决不动。

## 步骤 12：D15-10④ 独立核验
- 对照：LEDGER C1–C5、R20；D15-10④；OS 看门狗内存约束（一次一个）。
- 动作：派一名 task:low 只读核验者，逐仓核对 main 内容与会话前基线、issue 正文与快照、保护名单与冻结项未动。
- 结果：`local://exec/d15/VERIFY.md`。首轮 soroi、deploy、images 不通过；补核验确认：soroi `eng-store-home` index 与盘点 37 条一致（差异来自 HEAD 前移）；deploy 本地 `deploy-8` 为裁决 9 规定的冻结如期未动；images#3/#6、deploy#1/#8 正文与会话记录中改写前原文逐字一致。最终 8 仓全部通过。

## 步骤 13：D15-10⑤ 台账与归档
- 对照：LEDGER C4-3、R4、R8、R9、R18–R21；D15-07、D15-14。
- 动作：派秘书归档 D15-10 全部材料到 PM、在 PM#23 登记执行结果、按 C4-3 直接替换 LEDGER 状态行。
