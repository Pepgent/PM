# W-10 会话窗口独立全量取证报告

## 0. 结论先行

本报告是对 `pepgent-web` 会话目录的独立只读扫描，不是对 W-10 自报的复述。

在本窗口内确认了两项高可信流程违例：

1. **20:01:12Z 用 `discuss:steady` 与 `discuss:divergent`（低于 `task:high`）审查 WEB-05 契约/裁定稿。** `AGENTS.md` C3-3 明确禁止用低于 `task:high` 的 `discuss:*` 顶替独立高阶审查席。
2. **20:07:40Z–20:35Z 在 `pepgent-web-home` 上进行 WEB-05 写代码、写测试和检查。** `AGENTS.md` C3-4.4 要求实际开发在 home 之外的切片 worktree，home 不承载代码提交；主会话随后才用 stash + `git worktree add` 迁出。迁移后的修复动作不抹掉迁移前已发生的 home 开发事实。

另有一项需要按规则口径处理的顺序问题：WEB-05 的 Automation 子切片在自己的生产代码完成后即写测并运行检查，但此时同一共享 home 中的 Node 子切片仍在写生产代码。若“代码完成后才能测”按整个 WEB-05 共享切片解释，这是跨子切片的顺序违例；若按每个独立投影子切片解释，则每个子切片自身的生产→测试顺序均满足。本报告不把它伪装成“全窗口清洁”，而将其单列为边界未闭合项。

未确认以下两类违例：

- **没有发现 W-10 使用 `peer_send` 或 `peer_ask` 联系片区经理/管理层。** 日志中的 `write agent://...` 是父子/兄弟 agent handoff，不能错误归类为 `peer_send`。
- **没有发现把 hash/摘要校验写成验收证据。** 20:31:35Z 的恢复包操作确实读取了 `git rev-parse HEAD` 并生成 binary diff/reverse-apply 检查，但扫描到的 issue/PR 交付说明没有以该结果作为验收证明；本报告也不把任何 hash、commit 摘要或 reverse-apply 输出当作证据。20:58:33Z 读取 `HashSchema` 是为 D37 `ArtifactRef` 形状取证，不是 hash 验证。

截至报告快照 `2026-11-01T21:00:10.467Z`：

- W-03（WEB-03）已经有非 draft PR 合入并发 DONE；最终 W-04 分支上的全量检查随后观察到 29 个测试文件、228 个用例通过。
- W-04（WEB-04）已经有非 draft PR 合入并发 DONE；其修复后的 typecheck、Vitest 与 changed-file lint 均有原始输出。
- W-06（WEB-06）代码已在 `feat/web-06-pages` 提交并推送；typecheck、Vitest（33 files / 258 tests）、架构检查、locale hygiene、Biome 和 build 均通过，但截至快照尚未看到 PR、合入或 DONE。
- W-05（WEB-05）最初节点库/自动化投影已提交并推送；D37 文件型交回追加代码在快照时已完成编辑但尚未提交。快照末端仅看到架构检查、locale hygiene、Biome 的最终检查输出，尚未看到本次 D37 追加的最终 typecheck、Vitest、build、PR 或 DONE。
- W-07 尚未开始；阶段 C 的真实用户路径/浏览器 E2E 仍未开始。不能把本窗口的 typecheck、lint、build、Vitest 或 issue/PR 状态当成完整 runtime 验收。

---

## 1. 范围、来源与方法

### 1.1 时间窗

- 请求窗口：`2026-11-01T20:00:00Z` 至今。
- 本报告的可复现快照终点：`2026-11-01T21:00:10.467Z`。
- 会话仍可能在快照终点后继续；终点之后的事件不被倒灌进本报告。该边界是为了避免把实时追加事件误归入已完成的独立扫描。

### 1.2 扫描源

按用户指定目录扫描：

`/Users/mouriya/Ext/code/pepgent/.workers/pepgent-web/sessions`

目录快照统计：

- 全部文件：343。
- JSONL 事件流：73。
- 窗口内有顶层 `timestamp` 事件的 JSONL 流：36。
- 窗口内事件：4,445 条。
- 窗口内 assistant tool call：1,352 个。
- 原始 `toolResult.isError == true`：39 个。
- 另对 117 个 Markdown 工件、79 个 bash/log 工件和锁文件做了目录盘点，并用 `git worktree`、`discuss:`、`vitest`、`hash`、`home worktree`、`BLOCKED` 等高风险词交叉检查；行为归因以 JSONL 顶层事件为准，Markdown 中的当事人自报只作 `(A)` 辅助，不覆盖 `(R)` 原始工具输出。

窗口活动的主根流为：

- `2026-11-01T18-05-52-395Z_01a1984a-0d8b-745e-bb6b-5560f2f602e5.jsonl`

另一个较早根流 `2026-11-01T14-26-22-878Z_01a19781-1a1e-77f8-b03d-05bb2c6a9682.jsonl` 的顶层事件在本窗口前已结束，未计入窗口活动；其存在仍纳入目录盘点。

### 1.3 规则基准

本报告使用仓库中的：

- `AGENTS.md`：
  - C1-3：代码完成前不得写/跑测试；开发期不以每步 runtime 验收设锁；禁止把 hash 校验当证据。
  - C3-3：`task:high` 独立正反审查；禁止低于 `task:high` 的 `discuss:*` 顶替。
  - C3-4.4：工程实际开发在切片 worktree；home 不承载代码提交。
  - C4-1/C4-2：issue/PR 及片区经理是状态与送达路径；工人不得以 `peer_send` 作为常规管理通道。
  - C4-3：状态以拥有方源头为准，不能把本地副本、投递或自评当成完成。
  - 工作方法与禁令：每项发现区分 `(U)`、`(A)`、`(D)`、`(R)`，不把 leader/派工说明私自升级为新契约。
- `LEDGER.md`：
  - D20（W-10 路径域与 UI 绑定边界）。
  - D25（路由生成物规则）。
  - D35（WEB-03 的 W-09 wire/W-10 投影与时间轴承载分工）。
  - R13–R16（阶段 B 开发进行中，阶段 C 统一真实验收未开始）。

### 1.4 证据标记

- `(D)`：仓库规则/台账正文。
- `(R)`：JSONL 顶层时间戳、tool call、tool result 或命令输出。
- `(A)`：agent 自报、mentor 输出或 issue/PR 自述；只能解释，不能替代执行事实。
- `(I)`：基于 `(D)` 与 `(R)` 的分析；报告明确标出，不伪装成原始事实。

---

## 2. 窗口时间线

### 2.1 20:00–20:07：WEB-05 裁定稿与低阶 discuss 审查

- `20:01:12.015Z`，根流启动一个 `task`，子项明确为 `agent: discuss:steady` 与 `agent: discuss:divergent`，目标是审查 `local://web05-brief.md` 的公共契约、D31 渲染归属、节点库展示等裁定。(R: 根 JSONL)
- `20:03Z–20:05Z`，两名 discuss 子流返回反例和替代方案；随后 W-10 将结果吸收进 `local/web05-brief.md`。(R/A: 根 JSONL、`Web05Steady.md`、`Web05Divergent.md`、`local/web05-brief.md`)
- `20:06:57.582Z`，W-10 在 #25 发布 WEB-05 BLOCKED；该动作本身符合公共契约缺口要回原 issue 的方向。(R)

### 2.2 20:07–20:30：WEB-05 在 home 写入、测试与集成检查

- `20:07:40.203Z`，W-10 向 `Web05Nodes`、`Web05Automation` 派发实现，两个任务均 `isolated:false`，工作目录写死为 `/Users/mouriya/Ext/worktrees/pepgent-web-home`，并明确“不切换分支、不提交、不推送”。(R: 根 JSONL)
- `20:09:13Z–20:23:34Z`，两个子流在 home 写入 production contracts、projectors、fixture、model、controller、UI 和 locale。(R: `Web05Automation.jsonl`、`Web05Nodes.jsonl`)
- Automation 子切片：production 最后一次关键 edit 在 `20:11:08.493Z`；随后 `20:11:34.091Z` 写测试、`20:12:31.981Z` 运行 tsc/Vitest。(R)
- Node 子切片：production 最后一次关键 edit 在 `20:23:34.001Z`；随后 `20:24:30.698Z` 写测试、`20:26:11.275Z` 运行 tsc/Vitest。(R)
- `20:30:01.052Z–20:30:06.590Z`，根流在 home 运行整套 WEB-05 检查；原始输出显示 typecheck、Vitest（30 个文件 / 221 个用例）、架构检查、locale hygiene、Biome 和 build 均成功。(R: 根 JSONL toolResult)
- `20:31:29.306Z` 的第一次 recovery-bundle eval 被工具 guard 拒绝；`20:31:35.232Z` 第二次成功生成 `/tmp/web05-recovery`，输出包含 HEAD、branch、untracked 列表、binary diff 和 reverse-apply 结果。该包不是 issue/PR 的验收证据，本报告不采用其 hash/patch 结果。(R)

### 2.3 20:25–20:35：迁移 BLOCKED 后的纠正

- `20:25:35.234Z`，W-10 发布迁移 BLOCKED，明确引用 C3-4.4 与运行时 `wt` 规则的字面冲突；内容写明 home 当时承载未提交的 WEB-05 生产和测试改动。(R: `/tmp/web05-blocked-migration.md`、根 JSONL)
- `20:32:21.294Z`，W-10 读取治理结论；原始输出明确判定两条规则不冲突，应按 C3-4.4 用 stash + `git worktree add` 迁出。(R)
- `20:35:21.185Z–20:35:27.013Z`，W-10 在 home stash，切回 home 分支，在 clone 建立 WEB-05 切片 worktree，再把 stash pop 到切片。(R)
- `20:35:35.258Z–20:35:45.162Z`，W-10 在切片 stage、commit、push，并回 issue 报告迁移完成；home status 的检查输出显示其后不再承载该批未提交改动。(R)

### 2.4 20:37–20:54：WEB-05 handback 与 WEB-03

- `20:37:35.532Z`，D31 handback 子切片在 `/Users/mouriya/Ext/worktrees/pepgent-web-05` 启动；先读治理结论，再写 model/controller/copy，`20:40:53.652Z` 曾有一次 Biome 语法错误，随后修复。
- `20:41:46.038Z`，handback 的 Vitest、lint、typecheck 通过；`20:42:43Z–20:42:47Z` stage、commit、push。(R)
- `20:37:47.226Z`，W-03 切片 worktree 创建并合并 origin/main；`20:40:25Z` 派发计划条/版本定义；`20:42:23Z` production 完成，`20:43:09Z` 写测试，`20:43:41Z` 运行 typecheck、Biome、Vitest。(R)
- `20:44:47Z–20:45:04Z`，W-03 计划条提交并 push；`20:45:04.252Z` 派发时间轴子切片。(R)
- `20:46:27Z–20:48:49Z`，时间轴 production 代码完成；`20:49:10Z–20:50:08Z` 写回归测试；`20:50:26Z` 首次全检查，其中 UI 测试因环境 setup/实现修正失败；`20:50:42Z–20:50:51Z` 修正测试；`20:50:54Z` 重新 build 并运行编译产物轴回归，`20:51:15Z` changed-file lint 通过。(R)
- `20:52:18.973Z`，时间轴子切片自报简报 D 通过；此自报只算 `(A)`。(A/R: `Web03TimeAxis.jsonl`)
- `20:53:13Z`，W-03 时间轴 stage/commit/push；`20:54:24Z` 修正 PR 正文；`20:54:39Z` 合并 PR；`20:54:50Z` 在 #26 发 DONE。(R)

### 2.5 20:47–21:00：WEB-06、WEB-04 与快照终点

- `20:47:02.396Z`，W-10 发布 WEB-06 BLOCKED；`20:47:33.861Z` 在 W-05 切片创建 `feat/web-06-pages`。(R)
- `20:48:09Z–20:51:29Z`，Settings/Home/Containers 三个子切片在同一 W-05 slice（`isolated:false`）完成 production；各自随后才写测试/运行检查。(R: `Web06Settings.jsonl`、`Web06Home.jsonl`、`Web06Containers.jsonl`)
- WEB-06 初始 typecheck/test 发现 settings/home/container 测试的 nullable、brand 和 fixture 迁移问题；之后子切片补齐测试输入，最终 `20:58:18.688Z–20:58:24.293Z` full typecheck、Vitest（33 个文件 / 258 个用例）、架构、locale、Biome 全部通过；`20:58:26Z–20:58:33Z` build 通过。(R)
- `20:58:37.890Z–20:58:44.065Z`，WEB-06 提交并 push；截至快照尚未创建 PR、合并或发 DONE。(R)
- `20:55:29Z–20:56:23Z`，WEB-04 D37 数据集产物引用行先触发一次 `copy is not defined` 的 Vitest/typecheck 失败；`20:56:13Z` 修正测试 copy 后，`20:56:19Z–20:56:23Z` 重跑得到 typecheck 通过、Vitest 29/228 通过、changed-file lint 通过。(R)
- `20:56:34Z–20:57:27Z`，WEB-04 stage/commit/push、创建并合并非 draft PR、在 #27 发 DONE。(R)
- `20:57:36Z–20:57:59Z`，W-10 将 WEB-05 branch 切到已合并主线，解决 merge conflicts，typecheck 通过并提交；随后继续处理 D37 文件型交回。(R)
- `20:58:11.715Z`，W-10 将 D37 文件型交回交给 `Web05Handback`，明确其只改 model/controller/copy，不改 UI。(R)
- `21:00:03.154Z`，Web05Handback 自报 D37 文件型交回实现完成但未提交；`21:00:07.404Z–21:00:10.467Z` 只观察到架构、locale、Biome 结束并通过，未观察到本轮追加的最终 typecheck、Vitest、build、PR 或 DONE。(R/A)

---

## 3. 规则判定

### F-01：低于 task:high 的 discuss 审查公共契约 —— 已确认违例（高）

**规则：** `AGENTS.md` C3-3 要求独立正反审查使用 `claude-high/task:high`，明确禁止用低于 `task:high` 的 `discuss:steady` / `discuss:divergent` 顶替。

**事实：** `20:01:12.015Z` 的 task 参数中明确出现：

- `agent: discuss:steady`，名称 `Web05Steady`；
- `agent: discuss:divergent`，名称 `Web05Divergent`；
- 任务目标是审查 WEB-05 的裁定稿、公共契约缺口、D31 渲染归属和 F28 展示方式。

这不是普通实现细节，而是契约/裁定稿审查。日志没有显示将该审查升级为 `task:high` 独立席位。两份输出内容质量不改变席位等级违例事实。

**判定：** `(R)+(D)` 确认违例。后续把意见吸收到 brief、再由 task:mid 实现，不能追溯修复审查席位错误。

### F-02：在 home worktree 直接开发 —— 已确认违例（高）

**规则：** `AGENTS.md` C3-4.4 要求工程师实际在切片 worktree 开发；home 不承载代码提交。W-10 初始派工也明确“用 `git worktree add` 建切片工作树，不在 home 上开发”。

**事实：**

- `20:07:40.203Z` 的 dispatch 将两个写入 agent 指向 `/Users/mouriya/Ext/worktrees/pepgent-web-home`，且 `isolated:false`。
- `20:09:13Z–20:23:34Z` 的 edit/write 直接写入 home 路径。
- `20:12:31Z`、`20:26:11Z` 的子切片测试，以及 `20:30:01Z` 根流全量检查也在 home 路径运行。
- `20:25:35Z` W-10 自己发布迁移 BLOCKED，正文承认 home 当时承载 WEB-05 未提交生产/测试改动。
- `20:35:21Z–20:35:27Z` 才执行 stash + worktree add + stash pop 迁出。

**判定：** `(R)+(D)` 确认 home 开发违例。后续迁移、home 清理和提交到切片是纠正，不是豁免。

### F-03：共享切片内跨子切片测试顺序 —— 需按规则解释闭环（中高）

**事实序列：**

- Automation 自身 production 最后 edit：`20:11:08Z`；写测试：`20:11:34Z–20:12:26Z`；运行检查：`20:12:31Z`。
- Node production 仍在 `20:12:03Z`、`20:14:25Z`、`20:17:43Z`、`20:18:54Z`、`20:20:41Z`、`20:23:11Z` 持续写入；最后 production edit：`20:23:34Z`；其测试在 `20:24:30Z` 后才开始。

**判定：**

- 若 C1-3 的“代码写完后才能写/跑测试”按每个独立投影子切片解释，Automation 和 Node 各自满足自身顺序。
- 若按整个 WEB-05 共享工作树解释，Automation 在兄弟 production 尚未完成时写测并运行测试，不能称为全局顺序合规。

日志中没有形成一个由规则 owner 明确写出的“同仓关联切片可以彼此并发测试”的例外。因此本项至少是未闭合的流程风险；报告不把 WEB-05 标作“全窗口测试顺序完全合规”。

### F-04：hash/摘要操作的证据边界 —— 未确认 hash 证据违例

**事实：**

- `20:31:29.306Z` recovery eval 被 guard 拒绝。
- `20:31:35.232Z` 第二次 eval 成功生成 `/tmp/web05-recovery`，读取 `git rev-parse HEAD`，保存 binary diff，并输出 reverse-apply 检查结果。
- 该结果在扫描到的 BLOCKED、STARTED、PR、DONE 文本中未被当成 runtime/验收证明。
- `20:58:33.617Z` handback 读取 `HashSchema`，原因是 D37 的 ArtifactRef 输入格式；没有看到 hash 计算/比对作为完成证据。

**判定：** 本报告不采用这些 hash、摘要或 reverse-apply 信息作为证据；当前没有 `(R)` 证明 W-10 把它们写成验收证据。恢复包是应标注为“辅助迁移工件”的副作用，不得升级为合规证明。

### F-05：状态与剩余工作 —— 已观察，不能提前标完成

截至快照：

- W-03/W-04 有 PR 合入和 issue DONE，但这些是代码切片完成，不是阶段 C 用户流程完成。
- W-06 只有分支 push 和本地检查，todo 仍 pending，尚无 PR/DONE。
- W-05 D37 文件型 handback 已编辑，未提交；最终 typecheck/Vitest/build 尚未在快照内出现。
- W-07、阶段 C、阶段 D 未开始。

这与 `LEDGER.md` R13–R16 的阶段 B/阶段 C 状态一致；不要把自报“完成”、push、PR 或本仓检查升级为统一 E2E 完成。

### F-06：并行 shared writer —— 观察到风险，未单独定性为违例

WEB-05 的两个子 agent、WEB-06 的三个子 agent 和部分共享 contract 均以 `isolated:false` 在同一 worktree 工作。日志显示它们通过 `agent://` 传递 shared-file 范围，并在若干次 typecheck 后同步 nullable/brand/test 输入问题；没有观察到未解决的 merge conflict 留在 WEB-05/WEB-06 最终检查中。

`AGENTS.md` 允许通过明确路径 allowlist 处理 shared checkout，因此本项不能仅凭 `isolated:false` 判为违例；但它直接造成了跨子切片诊断互相阻断，证明该做法不是“完全隔离”。

---

## 4. 正向合规观察

1. **每个实现子切片自身大体遵守 production→tests：** Web05Automation、Web05Nodes、Web03Plan、Web03TimeAxis、Web06 Settings/Home/Containers、WEB-04 D37 均能观察到生产 edit 先于本切片测试 write/run。WEB-04 在第一次失败后确实修正测试并于 `20:56:19Z` 重跑通过。
2. **没有观察到 `peer_send`/`peer_ask`：** 对全部窗口 JSONL 的 assistant tool call 做了精确名称筛选，结果为零。W-10 使用了多次 `write agent://...` 进行父子/兄弟 handoff；不能把它们冒充成 peer_send 违例。
3. **BLOCKED 大多回原 issue：** WEB-05 迁移和 WEB-06 契约缺口都在原 issue 上发布 BLOCKED；不是把本地 brief 或 issue comment 伪装成新的已通过决策。
4. **修正后的本仓检查有原始输出：** W-05 初始代码、W-03、W-04、W-06 都有至少一轮真实 typecheck/Vitest/lint/架构/locale/build 输出；失败后可见修复与重跑。它们仍不替代阶段 C 浏览器/真实用户路径。
5. **PR 非 draft 与 issue 关联：** W-03、W-04 的日志显示创建非 draft PR、正文包含 closing keyword、合入后再发 DONE；W-06/W-05 尚未冒充已完成。

---

## 5. 失败、修复与未决项清单

### 已修复或被后续检查覆盖

- WEB-05 Automation：初始 slot schema 输入错误、共享 fixture/Node 变更造成的 typecheck 诊断，之后修正并在初始整合检查中通过。
- WEB-05 Node：品牌类型与 nullable selected 测试诊断，之后修正并通过目标测试。
- WEB-05 handback：一次 Biome `satisfies never` 语法错误，随后修正并通过当时的 full checks。
- WEB-06 Home：初始 30 个 type diagnostics 与 1 个 wire test 失败，之后修正；最后 full W-06 检查为 33 files/258 tests 通过。
- WEB-06 Settings：一次投影测试期望错误，之后在最终全量检查覆盖前修正。
- WEB-03 time-axis：首次全量测试后修正 UI test setup，并运行编译产物回归；随后主线包含该改动的 WEB-04 分支全量 Vitest 29/228 通过。
- WEB-04 D37：`copy is not defined` 导致首次 Vitest/typecheck 失败，修正为 `LAB_DATASETS_COPY.en` 后重跑通过。
- W-03/W-05 branch 合并时的 conflict 已被解析，合并后 W-05 typecheck 通过；但 W-05 D37 handback 在快照末端仍未完成最终提交/全量检查。

### 快照时仍未完成

1. W-05 D37 文件型 handback：最终 typecheck、Vitest、build、commit/push、PR、merge、DONE。
2. W-06：PR、merge、DONE，以及后续与 W-07 页面接线的交接。
3. W-07 页面真实接线。
4. 阶段 C A0 + F01–F31 真实用户路径、浏览器操作、DB/下游副作用核对。
5. 阶段 D F32 点线面差距分析。

---

## 6. 最终判定

- **窗口不合规项：** F-01（低阶 discuss 代替 high 审查）、F-02（home 直接开发）。两项均有直接 JSONL tool-call 证据，不能用后续迁移/提交抹除。
- **需裁定项：** F-03（共享 WEB-05 内 Automation 测试与 Node production 并行）。在没有明确“跨子切片例外”的情况下，不应把整个 WEB-05 标成顺序完全合规。
- **未确认违例：** F-04 hash 证据。只记录了恢复工件和 ArtifactRef schema 读取，未看到其被写成验收证据；本报告明确排除 hash 作为证据。
- **正向结论：** W-10 后续迁出 home、issue BLOCKED/STARTED/DONE 路径、无 peer_send/peer_ask、production→各自测试顺序、失败后修复重跑，大部分有原始输出支撑。
- **交付状态：** W-03/W-04 代码切片已合入；W-06 已完成本仓检查并推送但未 PR；W-05 D37 handback 在本快照尚未收口；统一真实 E2E 尚未开始。

本报告没有对仓库、Git、GitHub、会话源目录或 W-10 工作树做任何写操作；唯一写入为本报告文件 `/tmp/forensic-w10-scan.md`。
