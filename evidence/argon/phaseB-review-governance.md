# 阶段 B（`D15-11③ / R21`）常驻 `ArgonGovernance` 合法性复核与一仓一进程工程执行契约、事后检查清单

> **复核机构：** 常驻领导层职能与 Agent 工作分配意图守护者 `ArgonGovernance`（`agent://ArgonGovernance`），与常驻产品与设计意图守护者 `Argon`（`agent://Argon`）按正交职责共同构成阶段 B 双核复核。
> **本步骤 `LEDGER.md`（`8bfd70c`）逐项核对记录（依 `U68–U69` / `C5-2`）：**
> - **`C1-1..C1-4`（产品定位、组件独立、全流程阶段门禁与隔离环境）：** 已核对。复核严格守住“`soroi` 独立于 `omomp`、不改 `omp` 宿主”“组件独立成仓 + `store`（仓 A）/ `omp-soroi`（仓 B）拆仓边界”“开发期完成各组件实现与本仓检查后再统一执行 `A0 + F01–F31` 与 `D9/F32`”“不触碰 `Pepgent/Pepgent` 根 checkout 与无关前端会话（`U59`）”。
> - **`C2-1..C2-4`（领导小组宪制、双核守护、三族反例优先民主与用户直接授权）：** 已核对。D10–D14 与 D11-A/B/C 的历史程序瑕疵在阶段 B 经双核按正交职责复核，修订后的重要事项交由治理分身组织三族表决：Claude 族含 Main、分身与独立空白历史 task:high；argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票。ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席。
> - **`C3-1..C3-5`（四级上下文物理隔离梯度與一仓一进程铁律）：** 已核对。本报告第四节制定了严格互斥的 **10 席独立 `tern` 工程进程拓扑与物理路径域矩阵**，彻底根除跨仓混派（原 `eng-ops` 混派三仓、`eng-rt` 混派两仓）与同仓共分支/越界写（原 `eng-lab3` 与 `eng-web` 共写 `protocol/lab` 与同一分支）。
> - **`C4-1..C4-3`（异步契约总线、受限通信信道与唯一权威源）：** 已核对。常规工程状态只写 GitHub issue/PR 评论，严禁直报 `Main`；本报告同时落盘 `local://argon/phaseB-review-governance.md` 与 `pepgent-pm/evidence/argon/phaseB-review-governance.md`。
> - **`C5-1..C5-4`（独立监督、越权改动回退完成与工程冻结边界）：** 已核对。`D15-10③/④/⑤` 已完成 8 仓回退与独立核验（`VERIFY.md`、`PM` `bc849b0`、`LEDGER.md` `8bfd70c`）；D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置。发车记录写入文件并归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核。
> - **`R1–R21`：** 当前推进 `R21`（阶段 B 双核复核与恢复工程执行契约）。

---

## 一、`D10–D14` 与 `D11-A/B/C`（[PM#16–#22](https://github.com/Pepgent/PM/issues/16)）逐条治理与分工合法性复核

### 1.1 总程序瑕疵认定与治愈路径（依 `U65–U69`、`U82`、`C2-1`、`C2-3`、`D15-01`、`D15-11③/④`）
- **程序瑕疵（`VG-3` / `VG-4`）：** `D10`（[PM#16](https://github.com/Pepgent/PM/issues/16)）、`D11-A`（[PM#17](https://github.com/Pepgent/PM/issues/17)）、`D13`（[PM#18](https://github.com/Pepgent/PM/issues/18)）、`D12`（[PM#19](https://github.com/Pepgent/PM/issues/19)）、`D14`（[PM#20](https://github.com/Pepgent/PM/issues/20)）、`D11-B`（[PM#21](https://github.com/Pepgent/PM/issues/21)）、`D11-C`（[PM#22](https://github.com/Pepgent/PM/issues/22)）均由 `01a195a6` 分身在未启动顶层常驻 `Argon`/`ArgonGovernance`、未调度独立空白历史 `task:high` 参与 Claude 族计票、未执行每步 `LEDGER.md` 核对的情况下产生。
- **治愈路径 `【定】`：** 阶段 B 治理分身合并本报告与常驻 Argon 的产品意图复核报告，在 Pepgent/PM 发起综合复核与重做决策 issue，提交 Claude 族（Main、治理分身、独立空白历史 task:high）、argon 族（常驻 Argon 一票）、导师族（顶层常驻 LeadMentor 一票）逐条表决。ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席。通过后由常驻 Argon 回写 design/，秘书回写 PM 文档与 issue；回写与工程发车并行，不作为前置。

### 1.2 `D10`（交付顺序、仓库划分、组装契约与派工边界，`evidence/decisions/D10-repo-delivery.md`）逐行复核

| 条目 | `ArgonGovernance` 复核结论 | 依据与必须执行的修订（写入阶段 B 决策表） |
|---|---|---|
| **D10-00** | **【通过】`【定】`** | 完全符合 `(U)` `U2`、`U30`、`U32` 与 `C1-3`：先完成全部组件实现与本仓检查，再统一组装执行 `A0 + F01–F31`，最后执行 `D9`（`F32`），最终验收范围不缩减。 |
| **D10-01A / 01B / 02 / 03 / 10** | **【通过】`【定】`** | 符合 `(U)` `U1`、`U30`、`U32` 与 `C1-2`：仓 A（`store`）、仓 B（`omp-soroi` 定制与发行）、`Pepgent/soroi`（设计、领导工作台与统一 e2e）三仓边界清晰；新仓 owner 待用户从 5 个候选中授权，迁出前在 `Pepgent/soroi` 内按严格互斥路径域开发；`contract.ts` 与 `identity.ts` 唯一权威归仓 A。 |
| **D10-04** | **【修订后通过】`【定】`** | **必须修订过期盘点引用：** 删除对旧 `06:17Z INV` 的过期描述，更新为 **D15-10 回退并经 `VERIFY.md` 核验通过后的当前会话前遗产基线**：<br>① `STO-05` 遗产在 `/Users/mouriya/ext/worktrees/issue-190-durable-sse-ff0716f`（`a43336c` + 5 个 tracked 修改 + 1 个 untracked `streams.ts`）；<br>② `SOR-09` 遗产在分支 `issue-196-mux-writer`（`789aa4b`）及对应旧 worktree；<br>③ `soroi#260`（`eng/install-check-224`，`72873a9`）与 `soroi#266`（`test/235-a0-public-launcher`，`cf4a47f`）保持会话前 OPEN PR 状态。 |
| **D10-05** | **【修订后通过】`【定】`** | **必须执行两项关键修订（依 `U65–U70`、`C1-3`、`C5-3`）：**<br>① **彻底删除违规先例引用：** 删除 `D10-05` `where` 列中“先例：leader 主会话已按本条方向改写的 `images#6`、`images#3`、`deploy#8`”（该私自改写已被 `D15-04` 作废回退）；<br>② **严格限定 issue 改写边界：** 撤销 D8 开发期跨组件门禁时，**只允许移除“前置切片须已有跨组件 runtime 验收证据才能开工”的串行等待锁与单独增设的开发期 live 子 issue**（将跨组件 live 组装统一归入阶段 C 的 `A0 + S1 + E2E-21 + S2`），**严禁删减任何切片原本负责的真实业务功能实现或本仓真实入口检查要求**！所有对 OPEN D8 切片 issue 正文的修订，必须在阶段 B 决策表通过后由秘书统一按审定模板更新，严禁主会话或工程师私自改写 issue 正文。 |
| **D10-06** | **【通过】`【定】`** | 统一 e2e 阶段入口（全部实现切片与 `E2E-*` spec/runbook 代码已合入各自 `main`，且具备本仓真实入口局部观察）与执行次序（`A0 → S1 (F01–F30) → E2E-21 → S2 (F08–F31) → D9 (F32)`）符合 `C1-3`。 |
| **D10-07** | **【通过】** | 两步复核机制合理，其产物 `D11-A/B/C` 在本阶段 B 同步完成三族重投确认。 |
| **D10-08** | **【修订后通过】`【定】`** | **必须补入 `D15-12` 与 `U81–U82` 铁律：** 明确写明主会话（`Main`）对工程师上报的 `BLOCKED` **拥有零单方分类权、零单方拍板权**（严禁主会话自行判定某事属于“单仓私有实现”或“技术澄清免投票”）；所有 `BLOCKED` 必须由治理分身会同常驻 `Argon`、`ArgonGovernance` 对照 `LEDGER.md` 初审分类，凡涉及意图、范围、公开契约、权限、状态与生命周期、部署前提或验收语义的，一律起草决策项经三族（含独立空白历史 `task:high`）逐条表决后回写 issue。 |
| **D10-09** | **【强化修订后通过】`【定】`** | **必须按本报告第四节固化《10 席独立 `tern` 工程进程与互斥路径域矩阵》（依 `U59–U62`、`C1-2`、`C3-4`、`D15-11⑤`）：**<br>① **一仓（或一互斥路径域）一独立 `tern` 进程：** `omp-rpc-mux`、`remote`、`images`、`deploy`、`lab-library` 各 1 名独立进程（严禁复用旧 `eng-ops` 或 `eng-rt` 跨仓混派！）；`Pepgent/soroi` 内设 `pepgent-store`（仅 `packages/store/**`）、`pepgent-plugin`（仅 `packages/omp-soroi/**` 与发行脚本/设置）、`pepgent-e2e`（仅 `e2e/**` 与 `compose*.yaml`）3 名互斥路径域进程；`Pepgent/Pepgent` 内设 `pepgent-lab`（后端与 `src/protocol/lab/**` 唯一写方）与 `pepgent-web`（前端 `src/client/**` 与 `tests/e2e-lab/**`，只读消费 `origin/main` 上的 `src/protocol/lab/**`）2 名互斥路径域进程；<br>② **严禁共写共享契约目录或共推同一分支/PR；**<br>③ **`Pepgent/Pepgent` 物理隔离铁律（`U59`、`C1-2`）：** `pepgent-lab` 与 `pepgent-web` 必须在 `/Users/mouriya/Ext/worktrees/` 下各自独立的 Git 克隆仓库中运行和创建分支 worktree，**严禁访问 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout 或其 `.git` 目录，严禁复用已被冻结废弃的 5 棵本地 worktree**。 |
| **D10-11 / 12 / 13 / 14** | **【治理边界通过】** | 权责归属与阶段切分（如 `D10-12` 显式 `editLibrary` 权限禁止 guest 写库、`D10-14` `DEP-03` 开发期合入声明而统一 e2e 阶段接入活动 Stack）符合 `AGENTS.md` 第 1、6 条及 `C1-3`；具体产品契约细节以常驻 `Argon` 复核结论为准。 |

### 1.3 `D11-A`（[PM#17](https://github.com/Pepgent/PM/issues/17)）、`D11-B`（[PM#21](https://github.com/Pepgent/PM/issues/21)）、`D11-C`（[PM#22](https://github.com/Pepgent/PM/issues/22)）逐项治理复核

1. **分流表 `D11-T` 与契约条款总体结论：【通过（附 `D11-47C` 被 `D11-C1/C2` 取代的合并回写约束）】`【定】`**。
   - **关键衔接修正（防止回写冲突）：**
     - `D11-A` 中的 **`D11-47C`**（由各调用事件携带 `call: GraphNode` 与 `edges`）已在 `D11-C` 中被 **`D11-C1`**（一次提交的节点与入边仅由提交级事件 `step_committed` / 派生 `run_started` 在 `records: { nodes, edges }` 中携带一次，六种调用事件仅为轻量转变标记 `{ kind, seq, at, step, position }`）与 **`D11-C2`**（派生物化提交发 `call_inherited` 标记）正式取代！
     - 因此，在阶段 B 综合决策表中，**废止 `D11-47C`，直接以 `D11-C1` 与 `D11-C2` 作为 `D6-04 / D6-09 / D6-10 / D6-16` 及 `design/store.md` 的唯一有效回写条款**。
2. **回写与建 issue 执行纪律（针对 `D11-WB`、`D11-WB2`、`D11-WB3`）：**
   - 在阶段 B 决策表经三族（含独立空白历史 `task:high`）表决通过前，严禁提前回写 `design/` 或 `PM` 的 `D2–D8` 文档；
   - 表决通过后，`Pepgent/PM`（`D2–D8`）与 `Pepgent/soroi`（`design/*.md`）的正文替换由**秘书（`secretary`）**在受控单仓提交中一次性完成；
   - 涉及各工程组件仓（`Pepgent/remote`、`Pepgent/images`、`Pepgent/deploy`、`Pepgent/lab-library`、`Pepgent/soroi`、`Pepgent/Pepgent`）的切片 issue 重开/新建与父子边挂载，必须在阶段 B 决策表内逐个列明目标仓与切片范围，经三族表决通过后由秘书统一建号/更新，严禁主会话私自建 issue。

### 1.4 `D12`（`Pepgent` Lab 公开线契约，`evidence/decisions/D12-lab-wire.md`，[PM#19](https://github.com/Pepgent/PM/issues/19)）治理与路径域复核

1. **治理与接口边界结论：【修订后通过】`【定】`**（产品字段与 `(U)` 意图核对以常驻 `Argon` 复核结论为准）。
2. **必须写入阶段 B 决策表的两项治理修正：**
   - **修正 1（对齐 `D11-C1/C2`）：** `D12` 引言及 `D12-04` 中引用的 `D11-47C` 统一更新为 `D11-C1 / D11-C2`（`RunEvent` 的 `records` 在提交级事件携带，调用级事件为 `{ kind, seq, at, step, position }` 转变标记）。
   - **修正 2（封堵 `src/protocol/lab/**` 共写与共分支漏洞，依 `C3-4.3` 与 `paper.md` §4.2）：**
     - 明确规定 `Pepgent/Pepgent` 中的共享线协议目录 `apps/web/src/protocol/lab/**` **唯一写入 owner 为后端工程师 `pepgent-lab`**；
     - **交付次序强制解耦：** 先由 `pepgent-lab` 在其独立分支与独立 PR 中完成 `apps/web/src/protocol/lab/**`（及 `LAB-10` / `LAB-04` 对应契约导出）并合入 `Pepgent/Pepgent` 的 `main`；前端工程师 `pepgent-web` 随后从 `origin/main` 拉取已合入的 `src/protocol/lab/**`，在其完全互斥的路径域（`apps/web/src/client/**`、`apps/web/tests/e2e-lab/**`）与独立分支上开发 `WEB-01..07`。**严禁 `pepgent-lab` 与 `pepgent-web` 同时修改 `src/protocol/lab/**`，严禁二者共用同一分支或同一 PR！**

### 1.5 `D13`（跨组件契约缺口，[PM#18](https://github.com/Pepgent/PM/issues/18)）与 `D14`（Program 捕获纳入发行身份，[PM#20](https://github.com/Pepgent/PM/issues/20)）治理复核

1. **`D13-01..05` 与 `D14-01..03` 复核结论：【通过】`【定】`**。
   - **治理与生命周期评估：**
     - `D13-01..03`（部署注入 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST`，Main 启动时一次解析，SOR-07 单 PR 同时切换中心与远程环境身份）、`D13-04`（`conversation.session_file` 记录每代 `get_state.sessionFile`，停驻时只读 jsonl 不唤醒）、`D13-05`（中心节点 runner 仅传固定 `PATH` 与 `BUN_BE_BUN=1`，不继承中心容器凭据 env）均严格遵循 `AGENTS.md` 权威源头与生命周期公理；
     - `D14-01..03`（`install.ts --artifact <path>` 写出 `release.json`，`Program` 与 `Agent` 捕获身份统一纳入 release artifact SHA-256，并与 `SOR-07` 在同一次切换中落地；运行前置依赖 `DIST-01` 的 `--artifact` 参数先合入 `main`）消除了 runner/`boot.js`/`runNode` 升级时的错误捕获复用漏洞。
   - **派工衔接要求：** 在 `Pepgent/soroi` 的仓 B（`pepgent-plugin`）派工序列中，必须将 `DIST-01`（`soroi#199` 安装器 `--artifact` 改动）排在 `SOR-07`（`soroi#215` 捕获身份切换）之前串行执行。

---

## 二、`pepgent-soroi` 设计文档（`design/*.md`）与治理文件复核

### 2.1 `design/*.md`（`soroi.md`、`layers.md`、`store.md`、`eval.md`、`subagent.md`、`intervention.md`）
- **现状：** 经 `D15-10③`（[PR#281](https://github.com/Pepgent/soroi/pull/281)，`8c48f5a`）回退与 `D15-10④`（`VERIFY.md`）核验，6 份设计文档当前处于会话前 `f752546` 干净基线（0 diff）。
- **复核结论 `【定】`：**
  1. 会话前 `f752546` 的 6 份设计文档完全符合 `C1-1`（以 `omp` 为核心、不改宿主、独立于 `omomp`、无 `fork`）；
  2. 待阶段 B 决策表（含修订后的 `D10`、`D11-A/B/C`、`D12`、`D13`、`D14`）经三族表决通过后，由秘书将获批的设计补充项（`D10-01A/02/03/10`、`D11-WB/WB2/WB3`［以 `D11-C1/C2` 为准］、`D12-14`、`D13-01..05`、`D14-01..02`）一次性直接替换入 `design/soroi.md`、`design/store.md`、`design/eval.md`、`design/subagent.md`、`design/intervention.md`，不留历史对照或更正记录。

### 2.2 `AGENTS.md`、`.omp/skills/*`、`.omp/agents/*`、`.omp/WATCHDOG-*.md` 逐文件复核

| 文件路径 | 复核结论 | 核对详情与必要微调（纳入阶段 B 决策表） |
|---|---|---|
| [`AGENTS.md`](AGENTS.md) | **【通过（仅第 40 行示例命令补齐 2 个参数）】`【定】`** | ① 第 5、13、58 行（`U80` 双核计票与 `LEDGER.md` 必查入口）、第 39 行末句（`U43–U44`/`U57` 独立分析不设导师前置）、第 46–56 行（`U58` 七条工作方式禁令）全部合规保留；<br>② **唯一微调项（第 40 行）：** 当前第 40 行 `tern new session` 示例漏写了 `--model anthropic/claude-opus-5-5:high`（`U62`）与 `--session-dir /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions`。须在阶段 B 将第 40 行与 `.omp/skills/tern-worker/SKILL.md:17-20` 完全对齐，消除文档间不一致。 |
| [`.omp/skills/tern-worker/SKILL.md`](.omp/skills/tern-worker/SKILL.md) | **【工程执行契约】`【定】`** | 一仓（或一互斥路径域）一进程、`anthropic/claude-opus-5-5:high`、保留 `omp-peers`、禁 PTY 起 `omp`、常规状态只写 issue/PR、主会话对 BLOCKED 零单方分类权；D16 通过即为最终派工授权，不另设双核预审、签署、回写前置或退役复核。 |
| [`.omp/skills/decision-vote/SKILL.md`](.omp/skills/decision-vote/SKILL.md) | **【对齐现行三族规则】`【定】`** | Claude 族由 Main、负责该决策的治理分身、独立空白历史 task:high 逐条独立投票，族内全赞成计一票；argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票。ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席。压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策。 |
| [`.omp/WATCHDOG-LeaderCompliance.md`](.omp/WATCHDOG-LeaderCompliance.md) | **【治理事后检查】`【定】`** | 按 C1–C5、D16-12 巡检：D16 通过即为最终派工授权，当回合发车；G-1..G-7 是执行契约和事后检查清单，不是启动前签署门禁。 |
| [`.omp/WATCHDOG-LowTierScope.md`](.omp/WATCHDOG-LowTierScope.md) | **【完全通过】`【定】`** | 默认 `enabled: false`（符合 `U27–U28` 无罪推定与低成本监控原则）。 |
| [`.omp/agents/argon-governance.md`](.omp/agents/argon-governance.md) | **【完全通过】`【定】`** | 保持 `6c1faea` 受保护原文不变。 |
| [`.omp/agents/argon.md`](.omp/agents/argon.md) | **【完全通过】`【定】`** | 已在 `8c48f5a` 恢复第 13–15 行准确背景描述，权限与边界完整。 |
| [`.omp/agents/secretary.md`](.omp/agents/secretary.md) | **【对齐现行计票职责】`【定】`** | 计票说明与 decision-vote 一致：Claude 族含独立空白历史 task:high；argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票；ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席。秘书只记录，不投票、不做设计判断。 |
| [`.omp/agents/behavior-analyst.md`](.omp/agents/behavior-analyst.md) & [`sentinel.md`](.omp/agents/sentinel.md) | **【完全通过】`【定】`** | 无罪推定行为分析与有界窗口异常扫描边界清晰。 |

---

## 三、D15 遗留冻结对象的阶段 B 最终处置方案（`D15-11③`）

针对 `LEDGER.md`（`8bfd70c`）`R20` 中记录的全部待阶段 B 处理的冻结对象，作出如下终局处置裁决 `【定】`：

1. **`Pepgent/omp-rpc-mux` — 冻结分支 `issue-13-mux-design`（`e004fa1`）与会话前两份未提交草稿的拆分恢复：**
   - **证据基础：** `local://exec/d15/mux.md` 已从 `session://01a1962e/entry/40dc69a4`（`README.md` 接手前完整 92 行）和 `session://01a1962e/entry/9dcdb1e5`（`design/mux.md` 接手前完整 256 行）100% 逐字提取出 `05:48:24Z` 会话前草稿原文，并精确定位了 `01a195a6` 期间工程师在 `4d7c1068` 与 `f89f4408` 中替换的 8 行（`README.md` 第 38、59 行；`design/mux.md` 第 3、140、148、214、227、242 行）。
   - **执行动作：** 在阶段 B 启动专属 `pepgent-mux` 工程师处理 [omp-rpc-mux#13](https://github.com/Pepgent/omp-rpc-mux/issues/13) 时，先在基于 `origin/main`（`cd11f31` / `40a1a9c` 内容）新建的分支工作树中，将 `e004fa1` 的 `README.md` 与 `design/mux.md` 还原上述 8 行会话前原文（恢复为 100% 纯净的会话前草稿状态），在此基础上按已通过的 `D3`、`D8-09`、`D11-01` 契约完成检查并提交新 PR；新 PR 合入后删除旧冻结分支 `issue-13-mux-design`。
2. **9 个本地冻结 Worktree 目录的终局处置——【永久冻结废弃（Permanently Decommissioned），严禁触碰或复用】`【定】`：**
   - 下列 9 个本地目录因挂接在禁触碰的 `/Users/mouriya/Ext/code/pepgent/pepgent/.git` 下（`U59`、`C1-2`）或含未归因 `.pyc` / 旧共享 `main` 反向 index，**正式裁定为永久废弃冻结区（不执行 `git worktree remove`、不从中提交或恢复任何文件、严禁任何阶段 B 工程师进入或复用）**：
     1) `/Users/mouriya/Ext/worktrees/eng-store-home`
     2) `/tmp/pepgent-store-203`
     3) `/Users/mouriya/Ext/worktrees/deploy-8`（注：远端 `origin/issue-8-lab-auth-seed` 已恢复至会话前遗产 `56eaff7`；阶段 B `pepgent-deploy` 工程师使用全新路径 `/Users/mouriya/Ext/worktrees/pepgent-deploy-issue8` 检出 `origin/issue-8-lab-auth-seed` 接续，绝不触碰旧 `deploy-8` 目录）
     4) `/Users/mouriya/Ext/worktrees/deploy-11`
     5) `/Users/mouriya/Ext/worktrees/eng-lab3-home`
     6) `/Users/mouriya/Ext/worktrees/eng-web-home`
     7) `/Users/mouriya/Ext/worktrees/eng-web-01`
     8) `/Users/mouriya/Ext/worktrees/eng-web-02`
     9) `/Users/mouriya/Ext/worktrees/eng-web-02b`
3. **各仓旧保留分支与 GitHub Project v2 字段：**
   - 各仓无本会话改动归因的会话前旧分支（`Pepgent` 的 `RiriAgent/*`、`docs/*`、`feat/lab-authentication` 等 9 个分支；`lab-library` 的 `e2e`、`issue-1`、`issue-3`；`deploy` 的 `issue-1`、`issue-2`、`issue-6`；`remote` 的 6 个旧分支；`mux` 的 6 个旧分支；`images` 的 `issue-1`、`issue-5`）作为历史已合并记录原地保留，不删除、不改写；
   - GitHub Project #1 看板字段随后续合法 issue/PR 生命周期自然流转，不作追溯性手工回写。

---

## 四、一仓一进程（`Opus 5.5 high`）工程执行契约与事后检查清单（`D16-09..13`）

D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置。G-1..G-7 是执行契约和事后检查清单，不是启动前的签署门禁。发车记录写入文件并归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核。合并异步，PR 正文写本仓编译、类型与基础检查的 (R)（C1-3）；工程执行事项只有 BLOCKED 才进入决策，独立职能部门的发起投票权和第 20 条修正不受影响。

### 标准 `G-1`：10 席独立 `tern` 工程进程与互斥路径域矩阵（严禁跨仓混派与路径重叠）

全集群工程实现严格划分为以下 **10 个独立 `tern` 工程席位**（每个席位使用独立的 `tern` 会话名、独立的 `.workers/<名>/sessions` 目录、独立的分支与 PR）：

| 席位编号 | `tern` 会话名 | 负责仓库与 `--cwd`（工作台根目录） | 严格互斥的写入路径域 | 承接的会话前合法遗产与首发任务 |
|---|---|---|---|---|
| **W-01** | `pepgent-mux` | `/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux` | `Pepgent/omp-rpc-mux` 全仓 | 从 `W1` 原文恢复 `mux#13` 两份草稿（还原 8 行）并完成 `mux#13` PR |
| **W-02** | `pepgent-remote` | `/Users/mouriya/Ext/code/pepgent/pepgent-remote` | `Pepgent/remote` 全仓 | 依阶段 B 通过后的 `D11-10`、`D11-43A` 实现 Slurm OCI 引用与 `remove` 等待终态 |
| **W-03** | `pepgent-images` | `/Users/mouriya/Ext/code/pepgent/pepgent-images` | `Pepgent/images` 全仓 | 接续既有 worktree `issue-6-lab-web-live-75a9ab7`（`d40585f`），及 `IMG-03`/`IMG-04`/`IMG-05` |
| **W-04** | `pepgent-deploy` | `/Users/mouriya/Ext/code/pepgent/pepgent-deploy` | `Pepgent/deploy` 全仓（禁触碰旧 `deploy-8`/`deploy-11` 目录） | 在新路径检出 `origin/issue-8-lab-auth-seed`（`56eaff7`）接续 `deploy#8`，及 `DEP-01/02/03`、`D13-02`、`D14-02` |
| **W-05** | `pepgent-library` | `/Users/mouriya/Ext/code/pepgent/pepgent-lab-library` | `Pepgent/lab-library` 全仓 | 接续既有 worktree `issue-5-bundle-guidance-600bf93`（`83ebca0`，`PR#6`），及 `D11-F12`/`D11-42`/`D11-44`/`D12-15` |
| **W-06** | `pepgent-store` | `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`（迁仓前仓 A 域） | 仅 `packages/store/**` | 接续既有 worktree `issue-190-durable-sse-ff0716f`（`a43336c` + 6 文件原补丁，按 `D11-47A/B` 与 `D11-C1/C2` 完成 `STO-05`），及 `STO-12`（`soroi#203`，`D10-13`） |
| **W-07** | `pepgent-plugin` | `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`（迁仓前仓 B 域） | 仅 `packages/omp-soroi/**`、`scripts/**`、`.omp/settings/soroi.yml`、`.github/workflows/release.yml` | 接续 `SOR-09`（`issue-196-mux-writer`，`789aa4b`），依次推进 `DIST-01`（`D14-02`）$\to$ `SOR-07`（`D13-01/03/05` + `D14-01/03`）、`SOR-08`（`D11-37`）、`SOR-11..20` |
| **W-08** | `pepgent-e2e` | `/Users/mouriya/Ext/code/pepgent/pepgent-soroi`（组装与测试域） | 仅 `e2e/**`、`compose.yaml`、`compose.full.yaml` | 接续 `soroi#260`（`e2e/install-check/**`）、`soroi#266`（`cf4a47f`），编写 `E2E-*` spec 与 runbook（开发期只合入测试代码与本仓检查，不执行跨组件 live 门禁） |
| **W-09** | `pepgent-lab` | **独立克隆** `/Users/mouriya/Ext/worktrees/pepgent-backend-clone`（严禁触碰 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout！） | 仅 `apps/web/src/protocol/lab/**`（**唯一写方**）、`apps/web/src/server/lab/**`、`apps/web/src/rpc/lab.ts`、`apps/web/src/app/routes/api/lab/**`、`apps/web/resources/lab/**` | 先落地 `D12` 的 `src/protocol/lab/**` 与接续 `origin/feat/lab-10-library`（`fc89bcd`，按 `D10-11/12` 与 `D12-03/07/15` 完成 `LAB-10`），再推进 `LAB-04..12`（含 `D11-29/30/49`、`D13-04`） |
| **W-10** | `pepgent-web` | **独立克隆** `/Users/mouriya/Ext/worktrees/pepgent-web-clone`（严禁触碰 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout！） | 仅 `apps/web/src/client/**`、`apps/web/tests/e2e-lab/**`（**严禁写 `src/protocol/lab/**`，只读消费 `origin/main` 已合入的协议**） | 待 `pepgent-lab` 将 `src/protocol/lab/**` 合入 `origin/main` 后，基于 `origin/main` 推进 `WEB-01..07`（`Pepgent#9, #21, #23, #25–#29`） |

### 标准 `G-2`：启动命令、模型与扩展强制核验（依 `U60–U62`、`C3-4.2`）
- 每个 `tern` 会话必须使用：
  `--model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts`；
- 严禁省略 `-e .../omp-peers/index.ts`，严禁在 PTY 中另起 `omp` 查额度或状态。

### 标准 `G-3`：`Pepgent/Pepgent` 根工作区绝对物理隔离（依 `U59`、`C1-2`、`RULING-pepgent-worktrees.md`）
- 在启动 `pepgent-lab`（`W-09`）与 `pepgent-web`（`W-10`）前，必须使用 `gh repo clone Pepgent/Pepgent /Users/mouriya/Ext/worktrees/pepgent-backend-clone` 与 `/Users/mouriya/Ext/worktrees/pepgent-web-clone` 建立两份与 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 `.git` **完全无共享对象库、无共享 worktree 注册表**的独立克隆；
- 两名工程师后续创建分支 worktree 时，一律在各自独立克隆下创建，**0 次访问 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout，0 次触碰 5 棵已冻结废弃的旧 worktree**。

### 标准 `G-4`：派工消息与异步总线契约强制条款（依 `C1-3`、`C4-1`、`D15-12`）
- 每条发往 `tern` 工程师的初始 `peer_send` 派工消息必须明确包含：
  1) 唯一生效的 PM 决策 issue 链接与行号（禁止口头转述契约替代源文档）；
  2) 严格互斥的允许修改路径白名单（越界修改即违规）；
  3) “代码编写完成前禁止写/跑测试，禁止以 hash 比对作为证据；本仓实现完成后，PR 正文写本仓编译、类型与基础检查的 (R)（C1-3）；合并异步，不要求每切片独立 runtime 验收”；
  4) “常规状态（`STARTED / PR / DONE`）只写 GitHub issue/PR 评论，**严禁 `peer_send` 给 `Main`**；仅当遇到契约空白/冲突需领导小组表决的 `BLOCKED` 或安全/硬件紧急事件时，先写 issue 评论再 `peer_send` 上报”。

### 标准 `G-5`：领导层实质核对与发车记录归档（依 `U68–U69`、`C5-2`、`D16-12`）
- 领导层每步实质对照 LEDGER C1–C5、R1–R21；D16 通过即当回合发车，具体命令、peer_send 全文与核对记录写入文件并归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核。G-1..G-7 不构成启动前签署门禁；不要求逐波预审或工程师 PR 贴台账长表；不设退役前同步复核。

### 标准 `G-6`：宿主机内存水位与自身依赖就绪滚动启动
- 同时活跃的席位仍不超过 4 个；席位实现切片全部合入 main 后立即 `tern kill session`，保留会话目录。
- 任何席位释放名额后，立即从等待中的席位里挑一个自身依赖已满足的启动，不按固定顺序等待无关席位。W-10 在 `protocol/lab` 的真实上游合入后，优先补入下一个空出的名额。W-08 按逐 spec 读法编写，不固定排在最后，所测代码全部合入后才编写，阶段 B 不执行跨组件测试。

### 标准 `G-7`：开发期完成后的统一组装验收门禁（依 `U2`、`U23`、`U30`、`U32`、`C1-3`）
- 各组件开发期只做本仓检查，不设跨组件 live e2e 阻塞锁；
- 待 `W-01..W-10` 全部实现切片与 `E2E-*` 测试代码均合入各自仓库 `main` 后，进入阶段 C，由测试者在统一组装环境中按 `A0 → S1 (F01–F30) → E2E-21 → S2 (F08–F31)` 跑通全部 32 项真实端到端流程，随后进入阶段 D 完成 `D9`（`F32`）点线面差距分析与三族表决。
