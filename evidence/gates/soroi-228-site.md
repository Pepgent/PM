# soroi#228（SOR-20）W-07 上报的契约缺口：takeover 后被中止远程 Agent 的批次与 `Human` 来历缺 `site`

- **issue：** [Pepgent/soroi#228](https://github.com/Pepgent/soroi/issues/228)（SOR-20，CLOSED），工人 W-07（`pepgent-plugin`）。
- **上报位置：** [DONE 评论 6560685311](https://github.com/Pepgent/soroi/issues/228#issuecomment-6560685311) 倒数第二点；[PR #320](https://github.com/Pepgent/soroi/pull/320)（MERGED，squash `5aba5d3`）正文“未验证与风险”第 2 点。工人标注为“[推断，未运行]”，请求管理层路由；不是正式 `BLOCKED`，SOR-20 已合入并关闭。
- **编制：** governance-desk 初审实例（总协调席，与 Main 合计 1 票）。本文只整理事实，为两道闸门列出待判问题和可选处置，不下结论，也不构成裁决。
- **程序依据：** 依 `AGENTS.md:60`（C2-2）与 `.omp/agents/governance-desk.md:20`，闸门 A 由 `Argon` 判定（是否触及产品原始意图或公开契约），闸门 B 由 `ArgonGovernance` 判定（是否越过路径白名单、是否破坏阶段门禁、是否属于必须投票的事项）。两道闸门都确认不越界，才可免投票处置；任一闸门认定越界，就按 P0 起草决策表立案投票。常驻席位暂未在岗，按 Main 的安排，两道闸门由 Main 另派一次性实例判定。

来源标记：`(U)` 用户原话；`(D)` 文档原文（决策正文、`design/`、仓内 README）；`(R)` 本实例运行命令或直读源码得到的事实；`(A)` agent 的说法，只作解释。工人的评论与 PR 正文属于 `(A)`，其中引用的运行输出未经本实例重跑。按指派，本实例只读代码，没有运行测试，也没有运行任何服务。凡是由读代码推出、没有运行确认的结论，另标 `[INFERENCE]`。

路径简称：
- `SOROI/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`，本实例读取时 `HEAD` 与 `origin/main` 同为 `05ae761`（R：`git rev-parse origin/main HEAD`）。
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`

---

## 一、事实

### 1.1 工人的说法

| # | 事实 | 来源 |
|---|---|---|
| F1 | 工人认为：store `OriginSchema` 的 `Human` 变体没有 `site`，因此 takeover 后被中止远程 Agent 的 `soroi-batch/` 不会随步汇入 `agent_progress`，而 `design/intervention.md` 第 3 步要求汇入。工人还认为这需要改 store 契约，超出插件范围。 | (A) 评论 6560685311 |
| F2 | PR #320 的推理链：`src/eval/commit.ts` 只给 `Executed` 来历写 `site: {kind:"remote", transfer}`；`Human` 变体没有 `site`，所以“store 不会发布该位置的卷”。 | (A) PR #320“未验证与风险”第 2 点 |
| F3 | PR #320 的 S2（takeover）证据只列出事件序列与转录，包括 `call_aborted`、`human_handback`，以及 transfer 已清空。没有查询 `GET /runs/{run}/progress`。 | (A) PR #320 Layer 4 的 S2 段 |

### 1.2 契约与设计原文

| # | 事实 | 来源 |
|---|---|---|
| F4 | `design/intervention.md` 写明 takeover 第 3 步：“被中止远程 `Agent` 已写下的批次同样随步汇入 `agent_progress`”。“写进 store 的东西”表中，在途改值一行也写有“若有远程 `Agent` 批次则汇入 `agent_progress`”。 | (D) `SOROI/design/intervention.md:32`、`:68` |
| F5 | `design/store.md` 中来历的四个变体是 `Executed { capture, site }`、`Adopted`、`Human { capture, event }`、`Inherited`。设计本身就只给 `Executed` 配了 `site`，`Human` 一直不带 `site`。同文 `:131` 规定，被人类介入中止的远程 Agent，其批次“照样随这一步汇入 `agent_progress`”。 | (D) `SOROI/design/store.md:47-50`、`:131` |
| F6 | D4-15 规定批次的定位方式：“正式步的同一事务从该调用 `volumes/{position}` 读四列并汇入 agent_progress”。也就是按 transfer 内的调用位置定位，不按 `site`。 | (D) `DEC/D4-remote-exec.md:63` |
| F7 | D6-15 规定：“被中止的调用同样留下复盘线索：它的远程批次照样随这一步提交汇入 `agent_progress`”。 | (D) `DEC/D6-store-service.md:43` |
| F8 | D6 写入草图对 `Site` 的注释是“远程：同事务把暂存区里的批次汇入 agent_progress”。这句注释只出现在 `Executed` 的 `site` 上。工人的推理（F2）可能来自这里。`[INFERENCE]` | (D) `DEC/D6-store-service.md:72` |
| F9 | D6-18 规定，`Human` 捕获的身份取 transfer id 与调用位置等字段。也就是说，`HumanEvent` 本身就带 `transfer` 和 `position`。 | (D) `DEC/D6-store-service.md:46` |
| F10 | D11-24（volume 的发布）规定：“按调用来历发布：远程 `Executed` 发布同一 transfer、同一位置被接受的 volume；`Human`、`Aborted` 发布其位置已被接受的 volume”。D16-02 已恢复 D11-24 的效力。 | (D) `DEC/D11A-solo-ruling-review.md:40`；`DEC/D16-phaseB-review-restore.md:26` |
| F11 | D19（SOR-13 控制端点）只规定 `takeover` 请求体的形状（`{"method":"takeover","handback":HumanHandback}`）及其成功回复 `null`。D24 只给 `derive` 请求补 `by: UserId`，并说明 `takeover` 的 `HumanHandback` 已有 `by`。两者都不涉及批次汇入或 `Human` 来历的 `site`。 | (D) `DEC/D19-sor13-control-contract.md:29-30`；`DEC/D24-derive-principal.md:13`、`:19` |

### 1.3 store 实现（W-06 路径域）

| # | 事实 | 来源 |
|---|---|---|
| F12 | 入站契约中，`OriginSchema` 的 `Human` 变体是 `{kind, capture, event}`，没有 `site`；`HumanEventSchema` 带 `transfer: IdSchema` 和 `position`。持久化的 `StoredOriginSchema` 中，`Human` 也只有 `event`。 | (R) `SOROI/packages/store/src/contract.ts:41-45`、`:46-51`、`:136-142` |
| F13 | 步提交中，`commitVolume(position, requirement)` 读取该 transfer 中 `{kind:"call", position}` 的卷清单。凡匹配 `soroi-batch/<name>.parquet` 的成员，都会在同一事务里经 `importAgentProgress` 汇入 `agent_progress`，然后写入 `volumes` 行。 | (R) `SOROI/packages/store/src/store.ts:312-327` |
| F14 | 按来历分派时，`Executed`+`remote` 调用 `commitVolume(position, "required")`，`Aborted` 调用 `commitVolume(position, "optional")`。`Human` 先校验 `event.transfer === step.transfer` 且 `event.position === call.position`，再调用 `commitVolume(call.position, "optional")`，然后写 `call_started`；若有 `replaced`，再写 `call_aborted`，最后写 `human_handback`。 | (R) `SOROI/packages/store/src/store.ts:386-412` |
| F15 | store README 写明：“Human and Aborted calls retain an uploaded volume when present, preserving the replaced/cancelled remote Agent's work directory”；“remote Executed batches are included, as are returned Aborted/Human replacement volumes”。 | (D) `SOROI/packages/store/README.md:109`、`:130` |
| F16 | store 测试中没有“`Human` 来历 + 该位置带 `soroi-batch/*.parquet` 卷”的用例。`progress.test.ts` 中没有 `Human` 或 `Aborted`；`store.test.ts:81`、`:176` 的 `Human` 用例不上传卷。 | (R) 在 `SOROI/packages/store/test` 中 grep `Human`、`Aborted`、`soroi-batch` |

### 1.4 插件实现（W-07 路径域）

| # | 事实 | 来源 |
|---|---|---|
| F17 | 远程 Agent 作业的 copy-out 目标是 `transfers/{transfer}/volumes/{target.site.position}`，即本次 eval 的 transfer、该调用的位置。 | (R) `SOROI/packages/omp-soroi/src/subagent/main/remote-agent.ts:124-127` |
| F18 | `invokeRemoteAgent` 把 `site: { mount, transfer: store.transfer, position, … }` 交给 supervisor；`store` 就是本次 eval 的会话 `s`（`index.ts:61`、`:73-74`）。 | (R) `SOROI/packages/omp-soroi/src/eval/execute.ts:503-515`；`SOROI/packages/omp-soroi/src/eval/index.ts:61`、`:73-74` |
| F19 | takeover 时，supervisor 的 `abortCapture` 让捕获以 `aborted` 结束，并复用 `#parkRemote`：等本轮 settle、停驻、等作业结束，再写回转录。`aborted` 结果携带作业。 | (R) `SOROI/packages/omp-soroi/src/subagent/main/supervisor.ts:274-279`、`:371-389` |
| F20 | 被 takeover 的槽位改走 `humanOutcome`，记录 `replaced = { fn, version, inputs, transcript }`。 | (R) `SOROI/packages/omp-soroi/src/eval/execute.ts:341-344` |
| F21 | `formalRecords(outcome, s.transfer)` 中，`human` 分支生成的是 `{kind:"Human", capture, event: { transfer, position, … }}`。这里的 `transfer` 与 `position` 就是本步的 transfer 和该调用的位置，正是远程作业 copy-out 的那个卷槽（F17、F18）。 | (R) `SOROI/packages/omp-soroi/src/eval/commit.ts:60-68`；`SOROI/packages/omp-soroi/src/eval/index.ts:84` |
| F22 | 正式提交后才执行 `remote.removeAll()`。PR S2 的时序是 copy-out 204（16:24:46.528Z）早于调用结束（16:24:46.541Z），remove（16:24:46.683Z）晚于提交。 | (R) `SOROI/packages/omp-soroi/src/eval/index.ts:106-110`；(A) PR #320 Layer 3 表 |
| F23 | RemoteChild 每次 `turn_end` 时，把本轮新增的 transcript 条目写成一个批次文件。被中止的那一轮是否触发 `turn_end` 并写出批次，取决于 omp 宿主的事件语义，本实例没有核实。 | (R) `SOROI/packages/omp-soroi/src/eval/batches.ts:91-97` |

### 1.5 由上述事实得到的读码结论（`[INFERENCE]`，未运行）

- **C1：** 在 store 契约与实现中，`Human` 来历定位卷不靠 `site`，靠的是 `HumanEvent.transfer` 加调用 `position`（F9、F12、F14）。D11-24 已规定 `Human` 发布其位置上已被接受的 volume（F10），store 实现与 README 一致（F14、F15）。
- **C2：** 插件把 takeover 前远程作业的卷写进本步 transfer 的同一位置（F17、F18），并在提交前完成 copy-out（F19、F22）；`Human` 的 `event.transfer/position` 指向同一卷槽（F21）。所以按读码推断，被 takeover 的远程 Agent 已写出的 `soroi-batch/*.parquet` 会在该步提交时汇入 `agent_progress`。
- **C3：** 因此，工人上报的缺口，即“`Human` 缺 `site` → store 不发布该位置的卷 → 批次不汇入”，在已通过契约（D4-15、D6-15、D11-24）和当前 soroi main 的代码里都找不到依据。PR #320 风险段中“store 不会发布该位置的卷”的说法，与 `store.ts:406-412` 和 README:109 相反。
- **C4：** 尚无 runtime 证据确认 C2。S2 没有查 `/progress`（F3），store 没有 `Human`+批次的测试（F16），被中止那一轮是否产生批次也未核实（F23）。按 D16-13，跨组件运行验证在阶段 C 统一进行。

### 1.6 席位与路径域

| # | 事实 | 来源 |
|---|---|---|
| F24 | D16-09：W-06 `pepgent-store` 在 soroi 内只写 `packages/store/**`，另加根 `package.json` 中的两项 `exports` 与 `zod` 依赖；W-07 `pepgent-plugin` 在 soroi 内只写 `packages/omp-soroi/**` 等。 | (D) `DEC/D16-phaseB-review-restore.md:33` |
| F25 | `OriginSchema` 位于 `packages/store/src/contract.ts`，按 D16-05 由根包导出给 Lab（`Pepgent/Pepgent`）消费。它是跨组件公开契约，属 W-06 路径域。 | (D) `DEC/D16-phaseB-review-restore.md:29`；(R) F12 |
| F26 | `design/*.md` 由常驻 Argon 回写（D16-06）。 | (D) `DEC/D16-phaseB-review-restore.md:79`（反例回应“`design/*.md` 回写由常驻 Argon 执行”） |
| F27 | SOR-20 的验收是“远程 Agent 中止后，transcript 回到中心”，承接统一验收的是 F04、F17（E2E-16 #231、E2E-18 #233）。F16 ④ 要求“提交后 `/runs/{run}/progress` 返回来自这些批次的行”，针对的是正常完成的远程 Agent；F17 ③ 针对整运行 `abort`，没有专门检查 takeover 后的 `/progress`。 | (D) `DEC/D8-mvp-scope.md:284`、`:135`、`:136` |
| F28 | 开发期各仓只做本仓检查，不设跨组件 live 锁，阶段 C 统一验收；代码编写完成前禁止编写和运行测试。 | (D) `DEC/D16-phaseB-review-restore.md:37`（D16-13）；`AGENTS.md:45`（C1-3）；(U) U83 `LEDGER.md:97` |
| F29 | 接口或权限表缺少某项，不构成授权；leader 不当契约来源。 | (D) `AGENTS.md:122` |

---

## 二、闸门 A 的问题（交 `Argon`）

- **A-1：** 按 C1–C3，D4-15、D6-15、D11-24 与 `design/store.md:47-50`、`:131`、`design/intervention.md:32` 已经共同规定：takeover 后被中止远程 Agent 的批次，按 `HumanEvent.transfer` 加 `position` 定位并随步汇入，`Human` 不需要 `site`。是否认定这项缺口在契约层面不成立？请引用 `(U)` 或已通过的决策正文。
- **A-2：** 若采纳工人原意，给 `Human` 来历加 `site`（处置 c），就会改变 `OriginSchema` 和 `StoredOriginSchema` 这两个公开 ADT（F12、F25），并与 `design/store.md:49` 的四变体写法和 D11-24 的发布规则重叠。这是否属于必须表决的公开契约变更？
- **A-3：** D6:72 中 `Site` 的注释（F8）只在 `Executed` 上提到“批次汇入”，读者可能因此误以为汇入依赖 `site`。这是否构成需要 Argon 回写 `design/` 或由秘书改写 PM 正文的文本歧义？还是 D11-24 已经足够，不需要处理？
- **A-4：** F23 提到，被中止那一轮是否写出批次，取决于 omp 宿主的 `turn_end` 语义。D6-15 中“已写下的批次”是否只指已经落盘的批次文件，从而不对被中止的那一轮提出额外要求？

## 三、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 路径域：若闸门 A 认定缺口不成立，处置 a、b 都不改契约。处置 b 只写 `packages/store/test/**`，在 W-06 白名单内（F24），是否算白名单内的日常工程事项，适用事后检查、不需事前投票？W-06 当前是否在岗、是否已退役，应向 `tern ls` 和滚动执行记录核实，本实例没有查询。
- **B-2：** 处置 c 要求 W-06 改 `packages/store/src/contract.ts` 与 `store.ts`，W-07 同时改 `packages/omp-soroi/src/eval/commit.ts`，并波及 Lab 侧 `pepgent-store/contract` 的消费方（F25）。这是否属于跨席位、跨组件的契约变更，必须按 P0 立案？
- **B-3：** 阶段门禁：SOR-20 已合入并关闭（F27）。若闸门 A 认定缺口不成立，是否只需把结论写回 #228，不重开 issue，也不新建切片？若要在阶段 B 补一条 store 测试（处置 b），是否符合 D16-13 “开发期只做本仓检查”和 C1-3 “代码完成后才写测试”（F28）？还是应把验证留到阶段 C 的 E2E-18/F17，避免另设验收仪式（`AGENTS.md:127`）？
- **B-4：** 处置 d 要在 E2E-18 的判据中增加“takeover 后 `/progress` 有被中止 Agent 的行”。这会改变 D8 F17 的验收语义（F27），按 D10-08 和 `AGENTS.md:122`，是否属于必须表决的“验收语义”事项？
- **B-5：** 送达：结论应由 soroi 片区经理送达 W-07（上报方），是否也要送达 W-06（store 路径域 owner）？还是仅在缺口成立、需要改动时才送达 W-06？

## 四、可选处置（只列出，不推荐）

| 代号 | 处置 | 是否改契约、切片或验收 | 涉及路径与席位 | 需要注意的地方 |
|---|---|---|---|---|
| a | 认定缺口在契约与实现层面不成立（C1–C3），把结论与依据（D4-15、D6-15、D11-24、`store.ts:406-412`）写回 #228，由片区经理送达 W-07。不改代码。runtime 确认交给阶段 C 的 F16、F17 统一验收。 | 不改 | 无代码改动 | C2 仍是 `[INFERENCE]`，在阶段 C 之前没有 runtime 证据（C4） |
| b | 同 a，另由 W-06 在 `packages/store/test/**` 补一条用例：`Human` 来历加该位置的 `soroi-batch/*.parquet` 卷，提交后 `/progress` 有行。 | 不改契约 | W-06 白名单内 | 须由 B-1、B-3 判定是否允许在阶段 B 补测试，以及 W-06 是否在岗 |
| c | 按工人原意，给 `Human` 来历加 `site`（入站与持久化两套 schema），插件填写，store 按 `site` 选卷。 | 改公开 ADT | W-06 的 `contract.ts`、`store.ts`；W-07 的 `commit.ts`；Lab 消费方 | 与 D11-24 和 `HumanEvent.transfer/position` 重复表达同一事实；若被认定为契约变更，须按 P0 立案投票（A-2、B-2） |
| d | 在 E2E-18（#233）的 F17 判据中增加 takeover 后 `/progress` 的检查。 | 改验收语义 | W-08 spec | 须由 B-4 判定是否必须表决 |
| e | 由 Argon 澄清 D6:72 的 `Site` 注释，或在 `design/store.md` 中写明 `Human`、`Aborted` 按 `event.transfer`/`position` 选卷。 | 文本对齐，是否改契约由 A-3 判定 | `design/`（Argon）或 PM 正文（秘书） | 只解决可读性，不影响代码 |

---

## 五、同一主题下不在本次 brief 范围内的事项（只登记）

**整运行 `abort` 时，被中止远程 Agent 的批次去向。** 工人上报的是 takeover 路径。读码与 PR 证据显示，整运行 `abort` 是另一条路径，有一处可能的契约与实现不一致，本实例不下结论：

| # | 事实 | 来源 |
|---|---|---|
| G1 | `design/store.md:131` 写明，远程 Agent “被人类介入中止**或随运行中止时**……它已写下的批次照样随这一步汇入 `agent_progress`”。D6-15 也写明“被中止的调用同样……随这一步提交汇入”。 | (D) `SOROI/design/store.md:131`；`DEC/D6-store-service.md:43` |
| G2 | 中止锚点的正文只要求“先中止全部在途调用并得到结论，再由 store 写 `run_aborted`”，没有规定整运行 `abort` 时被中止的步是否提交。派生（InFlight）路径则明确先把该步连同 `Aborted` 记录提交进父运行。 | (D) `SOROI/design/store.md:99`；`DEC/D6-store-service.md:33`、`:44` |
| G3 | PR #320 的 S1、S3（整运行 `abort`）中，被中止的这一步没有提交，事件只有 `run_aborted`，transfer 已清空。工具结果为“正式运行有调用失败，没有写 store”。 | (A) PR #320 Layer 4 的 S1、S3 段 |
| G4 | 插件中，只要有调用 `failed` 就不提交（`index.ts:83`），随后 `finally` 关闭 eval 会话（`index.ts:106-110`）。因此整运行 `abort` 时，被中止远程 Agent 的批次不会进入 `agent_progress`。`[INFERENCE]` | (R) `SOROI/packages/omp-soroi/src/eval/index.ts:83`、`:106-110` |

如需处理，由 Main 另派一个承接者实例。待判问题是：G1 中“随运行中止时……随这一步汇入”是否要求整运行 `abort` 时把被中止的步（含 `Aborted` 记录）提交后再写 `run_aborted`，这是闸门 A 的事项；如果是，G3、G4 的现状就是实现缺口，归 W-07 路径域。

## 六、两道闸门判定后的程序

- 闸门 A、B 都确认不越界（例如处置 a 或 b）时，免投票处置。结论写回 [soroi#228](https://github.com/Pepgent/soroi/issues/228)，再由 soroi 片区经理送达 W-07，必要时也送达 W-06。
- 任一闸门认定越界（例如处置 c、d）时，由新的 governance-desk 实例按 P0 起草决策表（`ID | what | where | how | 取舍 | 分类`），写入 `local://decisions/`，交议会立案。参投席位与门槛按 `AGENTS.md:22-27`（D1-12）。
- 闸门结论建议写在本文件末尾的“闸门 A 结论”“闸门 B 结论”两节，保证下一个空白实例只读本文件就能接续。
