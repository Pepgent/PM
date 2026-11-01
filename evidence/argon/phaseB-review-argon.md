# 阶段 B（`D15-11③` / `R21`）常驻 `Argon` 产品与设计意图复核报告

> **合规与权威声明（依 `LEDGER.md` `8bfd70c` C1–C5、R1–R21、U1–U82 及 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23) `D15-11③`）：**
> 1. 本报告由常驻 `Argon`（`agent://Argon`，产品与设计意图守护者）在 `D15-10` 全部完成并经 8 仓独立核验通过（`PM bc849b0`）后作成，与常驻 `ArgonGovernance`（`agent://ArgonGovernance`，领导层职能与 Agent 工作分配意图守护者）共同构成阶段 B 双核复核结论。
> 2. **本步骤 `LEDGER.md`（`8bfd70c`）逐项核对记录（依 `U68–U69` / `C5-2`）：**
>    - 已逐条核对 `C1-1..C1-4`（`soroi` 独立定制、多仓边界、禁碰 `Pepgent` 根 checkout、先完成组件开发后统一 e2e、代码完成前禁测、禁将 hash 作证据、隔离测试环境）、`C2-1..C2-4`（领导小组审议、双核常驻、三族反例优先民主、用户直接授权禁跳过）、`C3-1..C3-5`（四级上下文隔离梯度、一仓一进程、`Opus 5.5 high` + `omp-peers`、调度独立 `task:high` 与 `steady`/`divergent` 压力测试）、`C4-1..C4-3`（异步总线、禁 PTY 另起 `omp`、台账去噪）、`C5-1..C5-4`（无预设独立取证、每步核对台账、私自改动回退与遗产保护、工程冻结与治理推进）；
>    - 已逐条核对 `R1–R21`：当前 `R20` 已完成 8 仓执行与独立核验，本报告执行 `R21`（`D15-11③`）的产品与设计意图复核；在阶段 B 新决策（D16）经三族表决通过且恢复派工方案经双核预审前，工程冻结继续保持（`C5-4.1`）。
> 3. 每条意图复核结论均引用 `(U)` 原文（`LEDGER.md` U 编号或 `pepgent-pm/evidence/` 已归档的 10-31/11-01 原始会话 entry），具备直接 `(U)` 原文支撑的标为 **`【定】`**，在 `(U)` 框架下闭合跨组件接缝或确定具体编码/布局的标为 **`【暂定 · 与 (U) 无冲突】`**。

---

## 一、对 `D10–D14` 与 `D11-A/B/C`（`PM#16–#22`）的逐项产品与设计意图复核

### 1. `D10`（[PM#16](https://github.com/Pepgent/PM/issues/16)，`D10-repo-delivery.md`，15 行 / 19 个投票子项）

| 条目 | 产品与设计意图复核结论 | `(U)` 与 `LEDGER` 依据及阶段 B 修正/激活条件 |
| --- | --- | --- |
| **D10-00**<br>先完成全部组件实现，再统一 e2e | **【复核通过 · 定】** | 符合 **`(U)` `U2`、`U23`、`U30`、`U32`**（`C1-3`）：砍掉开发期切片级/波次级跨组件 e2e 门禁，各组件先完成实现与本仓检查，全部到位后统一组装执行 `A0 → S1 (F01–F30) → E2E-21 → S2 (F08–F31) → D9 (F32)`，最终验收范围绝不缩减。 |
| **D10-01A / 01B / 02 / 03 / 04 / 10**<br>三仓边界、布局、组装契约、代码承接与 store 契约归属 | **【复核通过 · 定（拆仓与独立组件本意） / 暂定（三仓切分与布局）】** | 1. 废止 `Pepgent/soroi` 大一统 monorepo，拆为仓 A（`store` 服务）、仓 B（`omp-soroi` 定制与发行）、`Pepgent/soroi`（设计、工作台与统一 e2e），符合 **`(U)` `U1`、`U2`、`U23`、`U30`、`U32`**（`C1-1`、`C1-2`）。<br>2. 新仓 A/B 的 owner 待用户从 5 个候选中选定（`C1-2`）；迁出前在 `Pepgent/soroi` 内按明确互斥路径域（`packages/store` vs `packages/omp-soroi` 及发行脚本 vs `e2e/`）由各自专职 `tern` 工程师开发。<br>3. **【阶段 B 补充项（纳入 D16 表决）】**：针对新仓 A 建立前 `Pepgent/Pepgent` 如何按 `D10-10`/`D12-01` 引用 `pepgent-store/contract` 的过渡方式，须在阶段 B 决策（D16）中正式表决授权“迁仓前在 `Pepgent/soroi` 根 `package.json` 导出 `./contract` 与 `./identity` 并补齐 `RunComparisonSchema`、`ValueUsageSchema`、`ActivitySchema`”，严禁未经表决私自改根包（原 `X-81` 私自合入的 `PR#278` 已按 D15 回退，经 D16 正式表决后再由 `eng-store` 合法重做）。 |
| **D10-05 / D10-06**<br>撤销 D8 开发期门禁、改写 OPEN 切片 issue 正文与统一 e2e 阶段 | **【复核通过（需剔除已作废先例引用） · 定】** | 1. 撤销 `D8-13`/`D8-14` 开发期跨组件启动锁、将跨组件验收义务完整移入统一 e2e 阶段（`A0`、`S1`、`E2E-21`、`S2`、`D9`），符合 **`(U)` `U2`、`U23`、`U30`、`U32`**（`C1-3`）。<br>2. **【阶段 B 修正点】**：原 `D10-05` `where` 列曾引用 `01a195a6` 主会话事前私自改写的 `images#6/#3`、`deploy#8` 作为“先例”，那些私自改写已按 D15 全部回退。阶段 B 激活 `D10-05` 时，删去“主会话已改写先例”字样，由阶段 B 决策（D16）正式授权秘书对全部 OPEN 的 D8 切片 issue（49 个 + `images#6/#3`、`deploy#8/#1`）统一执行正文切换并回写 `D8-mvp-scope.md` 与 `D8-slice-issues.md`。 |
| **D10-07**<br>旧 leader 单独裁决两步复核 | **【复核通过（明确适用边界） · 定】** | 两步复核机制符合 **`(U)` `U11`、`U12`、`U38`**（`C2-1`）。明确边界：“已合并实现不因复核自动回滚”仅适用于 `05:48:24Z` 前（`01a193fd` 期间）已合并的合法遗产（`C5-3.2`），不适用于已被 D15 回退的 `01a195a6` 私自改动（`C5-3.1`）。 |
| **D10-08**<br>领导小组与工程师决定权边界 | **【复核通过（叠加 `D15-12`） · 定】** | 符合 **`(U)` `U1`、`U11`、`U12`、`U20`、`U38`、`U39`**（`C2-1`），并叠加 [PM#23](https://github.com/Pepgent/PM/issues/23) `D15-12`：工程师上报 `BLOCKED` 时，主会话拥有零单方分类权（含判断“是否属于单仓私有实现”也必须交治理分身与 `Argon` + `ArgonGovernance` 双核初审）。 |
| **D10-09**<br>派发方式（一仓或一互斥路径域一常驻 `tern` 工程师） | **【复核通过（严格执行分列，禁止合并 owner） · 定】** | 符合 **`(U)` `U1`、`U2`、`U26`、`U30`、`U61`、`U62`、`U77`**（`C3-4`）。严格按 `D10-09` 原文将 `omp-rpc-mux`、`remote`、`images`、`deploy`、`lab-library`、`Pepgent` LAB 后端、`Pepgent` WEB 投影、仓 A（`packages/store`）、仓 B（`packages/omp-soroi`）、`Pepgent/soroi` `e2e/` 分列为独立专职 `tern` 进程（共 10 个独立路径域/仓库），**严禁重演 `01a195a6` 将 `images/deploy/lab-library` 混派给同一 `eng-ops` 或将 `remote/mux` 混派给同一 `eng-rt` 的违规行为（`C3-4.3`、`VG-3`）**！ |
| **D10-11 (a)(b)(c)**<br>LR-39（`LAB-10` 节点库） | **【复核通过 · 定（a/b） / 暂定（c）】** | (a) 草稿引用归 `LAB-11b`、(b) P1 产物契约（role/判据）按 `D8-16` 列入 D9 输入、(c) TS AST 静态导出不执行节点代码，符合 **`(U)` `U1`、`U23`** 与 `D7-11`、`D8-16`。 |
| **D10-12**<br>LR-45（Lab 节点库写权限 `editLibrary`） | **【复核通过 · 定】** | `D7-03` 增加 `editLibrary` 授予 `owner/researcher/student`、不授予 `guest`（`guest` 只读），符合 **`(U)` `01a18e1f #e818d410`、`01a192a2 #ed4570ad`** 原型四角色与 `AGENTS.md` 第 50 行禁令。 |
| **D10-13 / D10-14**<br>`PUT /releases/{version}` 协议与 `DEP-03` 接入时点 | **【复核通过 · 暂定（与 `(U)` 无冲突）】** | 单 PUT 请求头 `X-Content-SHA256`、同版本同内容幂等、store 独占拆解校验，以及 `DEP-03` 开发期非活动合入、统一 e2e 阶段接入活动 Stack，符合 **`(U)` `U23`、`U30`、`U32`**。 |

---

### 2. `D11-A`（[PM#17](https://github.com/Pepgent/PM/issues/17)）、`D11-B`（[PM#21](https://github.com/Pepgent/PM/issues/21)）、`D11-C`（[PM#22](https://github.com/Pepgent/PM/issues/22)）（共 34 个投票子项）

| 批次与条目 | 产品与设计意图复核结论 | `(U)` 与 `LEDGER` 依据及替代关系说明 |
| --- | --- | --- |
| **D11-A（除 `D11-47C` 外的 23 项）**<br>`D11-T`、`D11-49`、`D11-47A/B`、`D11-29A/B`、`D11-30`、`D11-32`、`D11-08`、`D11-11A/B`、`D11-13A/B`、`D11-19`、`D11-24`、`D11-12`、`D11-01`、`D11-04A/B`、`D11-42`、`D11-44`、`D11-WB`、`D11-F12` | **【复核通过 · 定 / 暂定（与 `(U)` 无冲突）】** | 1. **`D11-49`、`D11-29A/B`、`D11-30`：** 讨论写权限 `discussion: [create, prompt]`（`guest` 只读，一人一会话 `conversation.owner`）、审批范围 `approval: [any, ownExperiments]`、公开登录 `/sign-in` 与部署一次性 seed 先于 Web 服务，符合 **`(U)` `01a18e1f #e818d410`、`01a192a2 #ed4570ad`**。<br>2. **`D11-47A/B`、`D11-08`、`D11-11A/B`、`D11-13A/B`、`D11-19`、`D11-24`：** 生命周期十进制游标、单运行流续读与结束、`GraphNode.Call` 带 `capture`、`AbortedCall` 与 `pin_key`、比较结果 `SameValue`/`Aborted` 与 JSON 数组 `map`、派生提交必带 `EvalTransfer` 与 `run_started`（seq 1）物化锚点、volume 清单为 regular file 且继承只读引用不复制，符合 **`(U)` `01a18dd4 #f1ad9522`、`01a18e1f #64246eaf`、`01a18efe #9e2d37a1`**（不可变值、按身份复用、无重放）及《权威源头与生命周期》《Functional ADT programming preference》。<br>3. **`D11-32`、`D11-12`、`D11-01`、`D11-04A/B`、`D11-42`、`D11-44`：** files-on-host ResourceSync、模型网关 `auth: none` + `PEPGENT_GATEWAY_TOKEN`、dial 退出码 `128 + signal`、`IMG-05` standin 保留与 `docker buildx` 先行、每次 eval 建 Lab 源私有快照并按 lockfile 冻结安装依赖、节点源码模块加载静态闭包边界，符合 **`(U)` `U1`、`U2`、`U23`、`01a18e8a #8d913d2f`**。<br>4. **`D11-F12`：** 根语句增加内建形式 `const <name> = file("<相对路径>")`，正式运行字节经 `EvalTransfer` 晋升为 store 对象、dry run 返回后删除暂存区，符合 **`(U)` `01a18e1f #7ffcea0c`、`01a18e8a #32b6f7fd`**（dry run 不进 store，正式运行进 store）与 `F12`。 |
| **D11-47C（已被 `D11-C1/C2` 取代）** vs **D11-C（`D11-C1`、`D11-C2`、`D11-WB3`）** | **【废止 `D11-47C`，复核通过 `D11-C1`、`D11-C2`、`D11-WB3` · 暂定（与 `(U)` 无冲突）】** | `D11-47C` 让多条调用事件重复携带同一最终节点并删去 `call_inherited`，与一次调用多事件及 `F24②` 冲突；**`D11-C1`、`D11-C2`** 规定节点与入边由提交级事件（`step_committed` 或派生 `run_started` seq 1）在 `records: { nodes, edges }` 中唯一携带，六种调用类事件只作 `{ kind, seq, at, step, position }` 转变标记，派生物化提交依次写 `run_started` $\to$ `call_inherited` 标记 $\to$ `atom_stopped`，既满足“每个事实只由一处携带”，又保持 `F24②` 与已有派生实现一致。 |
| **D11-B（全部 7 项）**<br>`D11-37`、`D11-21`、`D11-10`、`D11-28`、`D11-43A`、`D11-43B`、`D11-WB2` | **【复核通过 · 定 / 暂定（与 `(U)` 无冲突）】** | 1. **`D11-37`：** 未消费提醒接入公开扩展点 `addBeforeModelCall`（不改 `omp` 宿主，符合 **`(U)` `U13`、`01a18f4a #f488be08`**），并写 `soroi.unconsumed-reminder`（数据 `{ text }`，按 transcript 顺序关联）。<br>2. **`D11-21`：** 根监管者内部生命周期条目不成为公开契约，`F22⑨` 直接以 store 权威事实判定，符合《权威源头与生命周期》。<br>3. **`D11-10`、`D11-28`、`D11-43A/B`：** Slurm 模板 body/step 镜像统一写 OCI 引用并经 `Registry::resolve` 解析；远程 `Agent` `call.json` 不携带 `capture`（捕获身份由中心 eval 计算提交）；`remove` 只等终态清理不取消作业（取消走 `abort`），启动失败属失败分支不进设计，符合 **`(U)` `01a18e3a #c5030836`、`01a18e1f #5a37a640`** 与 `.claude/rules/design-assumes-it-works.md`。 |

---

### 3. `D12`（[PM#19](https://github.com/Pepgent/PM/issues/19)，`D12-lab-wire.md`，17 个条目 `D12-01..D12-17`）

- **复核结论：【全部 17 项（`D12-01..D12-17`）复核通过 · 定（意图约束） / 暂定（具体 TypeScript Wire 类型与路由）】。**
- **`(U)` 依据与两处衔接说明：**
  1. 完整覆盖 13 个页面与目录（`LabCatalogWire`、`LabPageParams`、`LabPageWire`）、49 个命令与结果（`LabCommand`、`LabCommandResult`）、HTTP 字节/上传与只读代理路由、SSE 事件与流帧形，消灭一切 `/* … */` 与“其余页面同理”省略号，保留前端 `client/contracts/lab-*.ts` 18 个顶层视图契约作为投影终点与 D9 基准，后端无权威来源字段绝不造数而按 `D8-16` 列入 D9 输入，`AgentTemplate.harness` 唯一为 `'omp'`，草稿只在 `lab.sqlite` 不进 store，`guest` 只读（个人阅读位置 `conversation_read` 除外），`student` 启动经审批——100% 符合 `pepgent-pm/evidence/argon/D12-intent.md` 的基线 1–6 与否决红线 `V-1..V-6`（依据 **`(U)` `U1`、`U2`、`U13`、`U23`、`01a18e1f #e818d410/#e3692177/#64246eaf/#7ffcea0c`、`01a192a2 #1951b981/#ed4570ad/#cec515af`**）。
  2. **衔接说明 1：** `D12-lab-wire.md` 第 3 行对 `D11-47C` 的引用在阶段 B 激活时顺延指向 `D11-C1`（目录、页面与会话读取不重复携带同一条记录的原则完全不变）。
  3. **衔接说明 2：** `D12-01` 中 `Pepgent/Pepgent` 在仓 A 迁出前对 `pepgent-store/contract` 的 git 依赖引用，与上文 `D10-10` 补充项一并纳入阶段 B 决策（D16）正式表决。

---

### 4. `D13`（[PM#18](https://github.com/Pepgent/PM/issues/18)，`D13-01..05`）与 `D14`（[PM#20](https://github.com/Pepgent/PM/issues/20)，`D14-01..03`）

- **复核结论：【`D13-01..05` 全部 5 项与 `D14-01..03` 全部 3 项复核通过 · 定（捕获复用、不重放、完整定制、不改宿主） / 暂定（具体环境变量名、投影公式与 `release.json` 格式）】。**
- **`(U)` 依据：**
  - `D13-01/02/03/05` 与 `D14-01/02/03` 将中心环境身份（`SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`）、中心节点 runner 固定环境（常量 `PATH` + `BUN_BE_BUN=1`）以及整个 `soroi` release artifact 内容哈希（`ReleaseRecord.content`，经 `install.ts --artifact <path>` 写入 `release.json`）在 `SOR-07` 同一次切换中纳入 `Program` 与 `Agent` 捕获身份，彻底消除 runner/`runNode`/`toOutputs`/`boot.js` 升级时的错误复用（false hit），并规定所有运行 `eval` 的中心 `Main` 入口一律从已安装发行启动，完全符合 **`(U)` `U1`、`U13`、`U23`、`U24`、`01a18dd4 #edbaf573`、`01a18e1f #64246eaf`、`01a18efe #9e2d37a1`**（见 `pepgent-pm/evidence/argon/D13-intent.md` 与 `D14-intent.md`）。
  - `D13-04` 在 `Pepgent` Lab 表 `conversation` 新增 `session_file` 列保存每代 `get_state.sessionFile` 原样路径供停驻时无唤醒只读 jsonl，符合 **`(U)` `U13`、`01a18e1f #678fe41a`、`01a18f4a #f488be08`**。

---

## 二、对当前 `design/`、`AGENTS.md`、`.omp/skills/`、`.omp/agents/`、`.omp/WATCHDOG-*.md` 的复核结论

| 对象路径 | 当前状态（`soroi 8c48f5a`） | 常驻 `Argon` 复核结论与阶段 B 处理要求 |
| --- | --- | --- |
| **`design/soroi.md`<br>`design/eval.md`<br>`design/store.md`<br>`design/subagent.md`<br>`design/intervention.md`<br>`design/layers.md`** | 已在 `8c48f5a` 恢复至 `05:48:24Z` 会话前基线（`f752546`） | **【当前基线复核通过 · 定】** 10-31 转向核心设计（不可变 `atom`、无重放、正式运行进 store 而 dry run 不进、单层远程、独立于 `omomp` 且无 `fork`、`soroi_return` 唯一交回、`omp-rpc-mux` 单写多读与控制端点介入）完整正确。<br>**【阶段 B 回写要求】**：待阶段 B 决策（D16）经三族表决正式恢复 `D10–D14` 及 `D11-A/B/C` 效力后，由秘书按 `D11-WB`/`D11-WB2`/`D11-WB3`、`D12`、`D13`、`D14` 将受影响的契约补充一次性直接替换回写进 `design/soroi.md`、`design/eval.md`、`design/store.md`、`design/intervention.md`（不留删除线或变更记录）。 |
| **`AGENTS.md`** | `8c48f5a`（58 行，含第 13 行双核计票、第 39 行独立分析不设导师前置、第 46–57 行七条工作方式禁令） | **【复核通过（附 1 处命令参数同步）】** 全文符合 `LEDGER.md` `C1–C5` 与 `U1–U82`（第 39 行末句对应 `U43–U44`、`U57` 与 `C5-1.2`，确认保留）。<br>**【微调同步项】**：第 40 行示例命令 `tern new session <名字> ...` 应在阶段 B 同步补上 `--model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions`，使之与 `LEDGER.md` `C3-4.2`（`U62`）及 `.omp/skills/tern-worker/SKILL.md` 100% 语义一致。 |
| **`.omp/skills/tern-worker/SKILL.md`<br>`.omp/skills/decision-vote/SKILL.md`** | `tern-worker` 已在 `8c48f5a` 替换为双核定稿；`decision-vote` 为 `f752546` 基线 | 1. **`tern-worker/SKILL.md`：【复核通过】**（已含双核预审、一仓一进程、`anthropic/claude-opus-5-5:high`、`omp-peers`、禁 PTY 查额度、代码完成前禁测、禁 hash 作证据、`D15-12` 零单方分类权）。<br>2. **`decision-vote/SKILL.md`：【复核通过（附 1 处对齐更新）】**：第 25–26 行收票表应同步更新写明 Claude 族由 `leader` + 分身 + 独立空白历史 `task:high` 共同构成（表决前经 `steady`/`divergent` 压力测试，依 `D15-13` / `U11` / `U82` / `C3-3`），`argon` 族由常驻 `Argon` + `ArgonGovernance` 双核共同构成（依 `C2-2`）。 |
| **`.omp/agents/argon.md`<br>`.omp/agents/argon-governance.md`<br>`.omp/agents/secretary.md`<br>`.omp/agents/behavior-analyst.md`<br>`.omp/agents/sentinel.md`** | `8c48f5a` 现行文本 | **【全部 5 份角色定义复核通过】** 职责正交、模型配置符合 `U1`、`U17`、`U77–U80`，无需修改。 |
| **`.omp/WATCHDOG-LeaderCompliance.md`<br>`.omp/WATCHDOG-LowTierScope.md`** | `8c48f5a` 现行文本 | **【全部 2 份 Watchdog 定义复核通过】** `LeaderCompliance`（`enabled: true`）持续监督主会话遵守 `AGENTS.md` 与 `LEDGER.md` `C1–C5`；`LowTierScope`（`enabled: false`）按 `U27–U29` 默认关闭、按需对 `task:low/free` 临时开启，无需修改。 |

---

## 三、对 D15 遗留冻结项的阶段 B 处置结论（供 `PhaseBClone` 纳入阶段 B 决策表 D16）

1. **`omp-rpc-mux` 的 `issue-13-mux-design` 分支与会话前草稿还原：**
   - **处置方案 `【定】`：** `mux.md` 已从 `W1`（`session://01a1962e/entry/40dc69a4` 与 `#9dcdb1e5`）完整提取出会话接手前的 92 行 `README.md` 与 256 行 `design/mux.md` 逐字原文及被 `W2` 替换的 8 行明细。在阶段 B 决策（D16）通过后，由专职 `omp-rpc-mux` 工程师在独立工作树中将这 8 行还原为 `W1` 会话前草稿原文，再对照 `omp-rpc-mux` 代码核实后重新按 `omp-rpc-mux#13` 提 PR 合并。
2. **新仓 A 建立前 `Pepgent/soroi` 根包导出 `contract`/`identity` 的过渡方案：**
   - **处置方案 `【暂定 · 纳入 D16 正式表决】`：** 在用户选定新仓 A（`soroi-store`）owner 之前，由 D16 正式立项表决：在 `Pepgent/soroi` 根 `package.json` 导出 `./contract` 与 `./identity`（指向 `./packages/store/src/contract.ts` 与 `./identity.ts`）、补 `zod` 依赖，并在 `contract.ts` 中导出 `RunComparisonSchema`、`ValueUsageSchema`、`ActivitySchema`，供 `Pepgent/Pepgent` 按 `D10-10`/`D12-01` 以 git 依赖引用。
3. **其余冻结本地目录与 `Pepgent` 物理隔离方案：**
   - **`Pepgent/Pepgent` 五棵本地冻结树（`eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b`）：** 永久冻结禁用，绝不触碰 `/Users/mouriya/Ext/code/pepgent/pepgent/.git`。阶段 B 启动 `Pepgent` 专职后端工程师（`eng-lab`）与专职前端投影工程师（`eng-web`）时，先在 `/Users/mouriya/Ext/worktrees/pepgent-repo-base` 从 GitHub `Pepgent/Pepgent` 独立 `git clone` 一份与 `/Users/mouriya/Ext/code/pepgent/pepgent` 根 checkout 完全隔离的基准仓，两位工程师的所有分支 worktree 一律从该独立基准仓创建，**从物理上彻底斩断与无关前端根 checkout `.git` 的任何共享（`U59`、`C1-2`）**！
   - **`soroi` 的 `eng-store-home`、`/tmp/pepgent-store-203` 与 `deploy` 的 `deploy-8`/`deploy-11` 未归因 `.pyc`：** `eng-store-home`、`/tmp/pepgent-store-203`、`deploy-11` 三个会话内目录保持永久冻结禁用，阶段 B 工程师使用全新的干净工作树路径；`deploy-8` 既有工作树保留 `56eaff7` 代码供 `deploy` 工程师接续 `deploy#8`，其未跟踪 `.pyc` 不入 git index。

---

## 四、进入阶段 B 决策（D16）与恢复工程派工的路线图

请主会话派阶段 B 治理分身 `PhaseBClone` 将以下事项整理为 **D16 决策表**（经 `discuss:steady`、`discuss:divergent` 压力测试后，交 Claude 族含 `Main`+`PhaseBClone`+独立空白历史 `task:high`、`argon` 双核 `Argon`+`ArgonGovernance`、导师 `LeadMentor` 三族逐条投票）：
1. **D16-01：** 正式恢复经双核复核通过的 `D10`（含修正 `D10-05` 先例措辞与 `D10-07` 边界）、`D11-A`（除 `D11-47C` 外 23 项）、`D11-B`（7 项）、`D11-C`（3 项，取代 `D11-47C`）、`D12`（17 项，引用顺延至 `D11-C1`）、`D13`（5 项）、`D14`（3 项）效力；
2. **D16-02：** 正式表决新仓 A 建立前 `Pepgent/soroi` 根 `package.json` 导出 `./contract` 与 `./identity` 及补齐 3 个 schema 的过渡契约；
3. **D16-03：** 授权秘书一次性执行 `D10-05` 的 OPEN 切片 issue 正文切换、`D8` 与 `D2–D7` 正文回写、`design/*.md` 四份文档回写、以及 `AGENTS.md` 第 40 行与 `decision-vote/SKILL.md` 第 25–26 行的对齐更新，并在 `PM#16–#22` 发布效力恢复评论；
4. **D16-04：** 明确 `omp-rpc-mux` `issue-13-mux-design` 会话前草稿按 `W1` 原文还原方案及 `Pepgent/Pepgent` 独立基准克隆（物理隔离根 `.git`）方案；
5. **D16-05：** 审定严格遵守 `C3-4`“一仓（或一互斥路径域）一独立 `tern` 进程（`anthropic/claude-opus-5-5:high` + `omp-peers`）”的工程恢复名册与各进程派工契约（严禁跨仓混派、严禁跨角色共分支）。
