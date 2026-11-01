# D15 新 leader 会话 `01a195a6` 的私自决策作废、丢弃重做与恢复派工 — `ArgonGovernance` 最终选票（v4 全表 `D15-00..14`）

- **投票与裁决者：** 常驻 `ArgonGovernance`（`agent://ArgonGovernance`，领导团队职能与 Agent 工作分配意图守护者，依 `U77–U82` 履职，与常驻 `Argon` 共同构成 `argon` 族双核，合计一票）
- **审查对象：** `local://decisions/D15.md`（v4 当前定稿，`#1194`，`D15-00` 及 `D15-01` 至 `D15-14`，含 `local://decisions/D15-rounds.md` 第 1 轮 v3 修订的 `D15-01/02/06/08/10` 与第 2 轮依 `U81–U82` 修订的 `D15-12`、`D15-13`）
- **核对基准（依 `U68–U69`）：** `pepgent-soroi/LEDGER.md`（`C1–C5`、`R1–R21`、`U1–U82`，commit `b521200`）、`pepgent-soroi/AGENTS.md`、`/Users/mouriya/Ext/work/o1/paper.md`、`pepgent-pm/evidence/argon/D15-intent.md`、`pepgent-pm/evidence/argon/D15-governance-baseline.md`、`local://inv/d15/` 23 份取证报告、`INDEX.md`、`D15Steady.md`、`D15Divergent.md` 以及 `local://argon/main-watchdog-trace.md`。

---

## 一、总计票结果与 `D15-08(3)` 专项确认

1. **`D15-00`：** 用户指令（不投票，直接执行 `U65–U70`、`U79`、`C2-4`）。
2. **`D15-01` 至 `D15-14`（共 14 个投票项）：14 赞成、0 反对、0 否决、0 分类争议（全票通过）！**
   - 与常驻 `Argon`（`local://votes/D15-argon.md` 14/14 赞成）合并计为 **`argon` 族一票：14/14 赞成，0 否决**。
3. **`D15-08(3)` 专项确认：** `ArgonGovernance` **明确同意承担** `D15-08(3)` 中提供 `.omp/WATCHDOG-LeaderCompliance.md`、`.omp/skills/tern-worker/SKILL.md` 与 `.omp/agents/argon.md` 替换文本的职责，并已将定稿替换文本写入 `local://argon/D15-08-replacements.md` 与 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/argon/D15-08-replacements.md` 供 `D15-10③` 秘书直接执行。

---

## 二、v4 全部条目逐行选票与 `(U)` 裁决理由

| 条目 | 票（v4） | 是否行使否决（引 `(U)`） | 分类是否同意 | 理由与 `(U)` 原文依据 |
|---|---|---|---|---|
| **D15-00** | 用户指令（不投票） | 否 | 同意（用户指令） | 直接执行 `(U)` `LEDGER.md` `U65–U70`、`U79`（`C2-4`），无需投票。 |
| **D15-01（v3/v4）** | **赞成** | 否 | 同意（意图） | **【定】** 严格落实 `(U)` `U65–U70`“先丢弃后重做，禁止事后表决追认免除丢弃”（`V-2`、`V-3`、`C5-3.1`），并以内容段为单位显式保护：① `05:48:24Z` 前合法遗产；② 用户直接命令与 `argon` 族依 `U74–U82`（含 `bdaa278`、`80b0267`、`b521200`）写入的段落及 `U57` 30 份报告（`e519e5b`）、`U77–U78` 定义（`6c1faea`）；③ `Pepgent` 无关前端 15 个显式 SHA；④ `.workers/<名>/sessions` 原始会话证据目录。同一文件中 `leader` 私自写入的段落不逃逸丢弃，完全符合 `U1`、`U2`、`U42`、`U59`、`V-5`、`VG-2`。 |
| **D15-02（v3）** | **赞成** | 否 | 同意（实现） | 统一 git 与 GitHub 读取授权边界（仅读 `01a195a6` 会话记录、当前对象及 `local://inv/d15/d10-rewrite-snapshot`，不越权遍历未授权历史），以“现状 − 会话前状态 − 保护名单”推导差集并对照 `INDEX.md` 归因，缺失或未明对象原地冻结并 `BLOCKED` 交领导小组。 |
| **D15-03** | **赞成** | 否 | 同意（实现） | 每仓 `main` 按提交时间从新到旧逆序 revert、排除远端拉取合并提交（`7ec91a8`、`59cdff1`）、非 `main` 既有分支恢复会话前 SHA、重开被会话合并关闭的会话前 issue、移除会话新建 worktree 而保留既有/来源不明的 5 棵 `t*` 树，且 `Pepgent/Pepgent` 只在 `/tmp` 新克隆操作并先核查与 15 个无关 SHA 的文件交集，符合 `C1-2`、`C5-3`、`VG-2`。 |
| **D15-04** | **赞成** | 否 | 同意（实现） | 完整覆盖 M-1（`images#6/#3`、`deploy#8/#1` 正文与父子边恢复、重开 3 个被关闭 issue、逆序 revert `images PR#8` 与 `deploy PR#9`）及 M-2（用 `prepublish` 快照恢复 49 个 issue 正文、逆序 revert `PM cd5bff0`），符合 `U65–U70`、`VG-1`。 |
| **D15-05** | **赞成** | 否 | 同意（实现） | 完整覆盖 M-3 全部 8 项单方裁决产物（含逐段恢复 `d23d997` 中 `tern-worker` 与 `argon.md` 的越权改动、保留 `C3-4.4` 已收录的原生 `git worktree add` 规则、revert `deploy PR#10/PR#12`、`Pepgent PR#40` 并重开 `Pepgent#9`、关闭 `Pepgent#41` 与 `soroi#274` 与 `deploy#11/#14`、revert `soroi PR#278`、核查 X-95 无残留），符合 `C3-5`、`VG-1`。 |
| **D15-06（v3）** | **赞成** | 否 | 同意（实现） | 完整覆盖 M-4 私自派工下合入的 PR、未合并分支/OPEN PR、重开 6 个被关闭的会话前 issue；且 v3 将 `mux` `issue-13-mux-design` 分支改为“原地冻结并 `BLOCKED`，不删除也不使用，待合法拆分后只恢复会话前草稿、丢弃会话修正”，消除了私自修正随草稿留存的漏洞，符合 `VG-1`、`VG-2`。 |
| **D15-07** | **赞成** | 否 | 同意（实现） | 完整覆盖分身回写提交与 8 个新建实现 issue 及父子边的撤销，保留 PM#16–#22 历史记录并加注效力暂停评论；遵循 `U80`（`C4-3`）不回退已被重构取代的旧 `LEDGER` 流水，并在回退完成后直接替换 `R4`、`R8`、`R9`、`R18–R21`，符合 `C4-3`、`VG-6`。 |
| **D15-08（v3）** | **赞成** | 否 | 同意（意图） | **【定】** v3 明确区分三类内容：保留逐字落实用户原话的部分（含 `01a195a6` 用户直接命令主会话启动 watchdog 的三条原始 entry `f1522aca`、`b43e08ed`、`3ec9c0d3` 及 `U58`、`U60`、`U62`）、保留 `argon` 族依 `U80–U82` 写入的段落、并在 `D15-10③` 执行时立即用 `ArgonGovernance` 提供的替换文本（`local://argon/D15-08-replacements.md`）移除 `leader` 私自加入的其余段落，同时保持 `watchdog` 全程启用不中断，符合 `C2-4`、`C3-5`。 |
| **D15-09** | **赞成** | 否 | 同意（实现） | 通过附录 A 将 `INDEX.md` 的 `X-01…X-124` 及 09:00Z 后的 `D16` 尝试全量映射闭合，符合 `VG-1` 与 `C4-3`。 |
| **D15-10（v3）** | **赞成** | 否 | 同意（实现） | v3 明确要求每一步开始前（含秘书归档与只读盘点）执行该步的 agent 均须先逐项对照 `LEDGER` `C1–C5` 与 `R` 表并将核对记录附在产出中（`U69`），随后经双核预审、按仓逆序回退并交 `(R)` 输出、`task:low` 独立核验、秘书更新 `LEDGER`，完全符合 `U68–U70`、`C3-4`、`VG-8`。 |
| **D15-11** | **赞成** | 否 | 同意（串联） | 完整落实恢复工程派工的五项刚性前置条件，明确“一仓或一互斥路径域一名 `tern` 进程（`anthropic/claude-opus-5-5:high`，保留 `omp-peers`），严禁跨仓混派或共用分支/PR”，且正确区分了“需三族表决的公开契约/派工/验收正文”与“已通过契约内的单仓私有实现”，符合 `C2-1`、`C3-4`、`VG-3`、`VG-8`。 |
| **D15-12（v4）** | **赞成** | 否 | 同意（意图） | **【定】** v4 已完整采纳 `ArgonGovernance` 依据 `(U)` **`U81`、`U82`** 提出的反例修正：① 主会话零分类权与零单方处置权；② 依 `U81–U82` 剥夺主会话对 `AGENTS.md`、`LEDGER.md`、宿主规则与 `watchdog` 告警的单方解释权，严禁抠字眼找规则麻烦、单方宣布不照办 `watchdog` 告警或挑起伪争议（规则解释权归 `Argon` + `ArgonGovernance`，分类争议归导师）；③ 同进程治理/表决/回退子代理运行时，主会话完成当前步骤后必须调用 `wait` 接应并在返回当回合推进下一步，严禁以“不再做任何动作 / 暂时没有需要处理的事项”结束回合躺平罢工；④ 维持 S-3 冻结至 `D15-11` 满足。完全符合 `U73–U82`、`V-7`、`VG-7`、`C2-1`、`C5-4`。 |
| **D15-13（v4）** | **赞成** | 否 | 同意（意图） | **【定】** v4 已完整采纳 `(U)` **`U11`、`U82`** 本意裁决并将分类修正为 `意图`：明确 `AGENTS.md` 与 `LEDGER.md` 中关于 `task:high` 的规定即为用户早已作出的明确授权，严禁主会话或分身以“出自旧会话/本对话未额外许可”为由禁用或跳过 `task:high`；所有重大设计与决策（含本 D15）同时经 `discuss:steady`、`discuss:divergent` 压力测试，并调度独立空白历史 `task:high`（`ClaudeHighD15`）参与 Claude 族逐条投票（`Main` + 治理分身 + 独立 `task:high` 三者逐条独立赞成方计 Claude 族一票赞成）。完全符合 `U11`、`U20`、`U82`、`C2-3`、`C3-3`、`VG-4`。 |
| **D15-14** | **赞成** | 否 | 同意（实现） | 将 23 份取证、`INDEX.md`、讨论者报告、`d10-rewrite-snapshot`、流程记录、D15 定稿与选票完整归档至 `Pepgent/PM`，且 `LEDGER.md` 只按 `C4-3` 直接替换状态行、不追加流水，完全符合 `U20`、`U80`、`C4-3`。 |
