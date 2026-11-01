# D15-10④ 独立只读核验

核验对象：`soroi`、`PM`、`Pepgent/Pepgent`、`deploy`、`images`、`lab-library`、`remote`、`omp-rpc-mux` 八仓。

**证据口径：** 本报告只采用本轮对 Git、远端 Git、GitHub 当前对象和给定快照的实际读取结果。`*-exec.md` 只用于定位对象，不作为本报告证据。提交编号只作为 `git diff`/`git show` 的对象地址；不以编号相等、摘要或任何 hash/digest 校验替代内容证据。未运行测试、build、lint、业务 runtime/e2e；未运行 `git log`、`git reflog`，未读取 GitHub 编辑历史或 timeline。

## 1. 开始前 LEDGER C1–C5 与 R 表核对

开始前实际读取：

- `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/LEDGER.md`（当前全文，点名版本 `4455170` 的核对口径已在 D15 材料中给出）；
- `local://exec/d15/CONTRACT.md`；
- 八仓盘点、双核预审与 Pepgent worktree 裁决。

### C1–C5

| 条款 | 本轮核对记录 |
|---|---|
| C1-1 | 只核验 D15 对象终态和内容，不重新设计 `soroi`，不改 `omp` 宿主。 |
| C1-2 | 各仓分别向所属 Git/GitHub 源头读取；Pepgent/Pepgent 的 Git 操作只在 `/tmp/d15-verify-pepgent.G8TOeo/repo`，根 checkout 只按用户要求列五棵冻结树、`.git/worktrees` 和 `git worktree list`，未执行根 checkout Git 写操作。 |
| C1-3 | 未缩小 D15 范围；未编写/运行测试，未做跨组件 runtime；内容 `diff` 是本次治理核验，不是 hash 验证。 |
| C1-4 | 未连接 Slurm、Komodo、生产或 SOPS，未启动容器/VM。 |
| C2-1 | 以 D15 与双核九项裁决为判据；没有自行解冻冻结项。发现不符或来源缺口时报告，不补设计。 |
| C2-2 | 独立读取当前对象，没有把核验转给 Argon 或其他 agent。 |
| C2-3 | 未投票、未改票、未重开决策。 |
| C2-4 | 将会话前遗产、用户授权产物、Argon 段落和无关前端 15 个提交作为保护边界核对。 |
| C3-1 | 本轮为单主题、单核验者、只读核验，没有再派子任务。 |
| C3-2 | 不作为独立治理投票席，不替代双核。 |
| C3-3 | 不做设计/架构决策，不替代高阶审查。 |
| C3-4 | 未切换分支、未创建/移除 worktree；按要求对各仓执行 `git fetch origin main`，其余仅读 refs、diff、状态和目录。 |
| C3-5 | 未修改 skill、agent、harness 或规则。 |
| C4-1 | 未发 GitHub 评论、issue、PR 或普通进度消息；本文件是指定核验产出。 |
| C4-2 | 未联系任何 agent/会话，未在 PTY 启动 omp；报告使用中文。 |
| C4-3 | 实时状态向 Git、`ls-remote`、GitHub 当前 API 读取；快照仅作为取回时刻副本，不把执行者自述当状态源。 |
| C5-1 | 未读取禁止的旧 session `01a193fd`，未读 GitHub 编辑历史/timeline。 |
| C5-2 | 本表逐项记录 C1–C5；R 表如下逐项记录。 |
| C5-3 | 按内容段区分差集与保护名单；发现 soroi 冻结树 staged 数量与盘点记录不一致，列为实际不符而不是替其解释。 |
| C5-4 | 保持工程冻结，只做 D15-10④ 只读核验，不更新 LEDGER，不恢复工程。 |

### R1–R21

| 要求 | 本轮核对记录 |
|---|---|
| R1 | 不重做 10-31 转向调查，不从历史提交提取新版设计。 |
| R2 | 不修改 `design/`，不把 D10–D14 回写当作新设计。 |
| R3 | 不建仓、不迁仓、不替用户选 owner。 |
| R4 | 读取并保留双核定义和授权产物；未改写。 |
| R5 | 以已通过 D15 为判据，不重投票。 |
| R6 | 不代秘书归档、评论或修改台账状态。 |
| R7 | 不启动 watchdog、behavior analyst 或其他监督进程。 |
| R8 | 不恢复 tern 工程会话，不查额度，不改模型/扩展。 |
| R9 | 不切换主 checkout 分支；分支/worktree只读核对。 |
| R10 | 未读 `01a193fd`，将 `e519e5b` 30 份报告视为保护对象。 |
| R11 | 不改 U80 整理、U81–U82 段落或 LEDGER。 |
| R12 | 不操作隔离环境，不做探活/复测。 |
| R13 | 八个独立组件仓分别核验，不把组件合并成单仓范围。 |
| R14 | 不改 soroi 业务代码；只读取其 main、refs、issue、保护段和冻结树。 |
| R15 | 不写 Pepgent 业务；根 checkout 仅执行用户明确允许的目录列举和 `git worktree list`。 |
| R16 | 不运行统一 A0/F01–F31。 |
| R17 | 不进行 D9/F32 差距分析。 |
| R18 | 工程保持冻结；治理核验继续推进。 |
| R19 | 以 PM#23/D15 及双核裁决为已建立的输入，不把它们冒称为本轮 runtime 证据。 |
| R20 | 本轮只核验执行终态；不修改 LEDGER 的 `R20` 状态。当前 LEDGER 中 R20 仍是 `⏳`，不能由本报告替换。 |
| R21 | 不开展阶段 B 派工或双核合法性复核；当前 LEDGER 中 R21 仍是 `⏳`。 |

## 2. 核验计划与限制

**决定性问题：** D15-10③ 之后，八仓远端 `main` 内容、已解冻对象、issue 正文/状态/父子边及保护对象，是否符合会话前基线和双核裁决？任一当前对象与批准终态不符，该仓即不通过；冻结项必须保持其当前对象，不因“清理完成”而删除或重建。

**执行步骤：**

1. 各仓 `git fetch origin main`，再对盘点/裁决点名会话前对象运行 `git diff`；内容路径和文本 diff 是判据。
2. 用 GitHub 当前 API 读取 PR 状态、issue `state/state_reason`、父子边和 D15 作废评论；用 `git ls-remote`/本地 refs 读取分支存在与内容。
3. 对有 `prepublish` 文件的 issue，以 `gh api ... --jq .body` 和 `jq -r .body snapshot` 运行逐字 `diff`。
4. 读取保护内容、保留分支/树和冻结目录。Pepgent 五棵本地 worktree 及根 `.git/worktrees` 只列目录与 `git worktree list`。

**重要来源限制：** `prepublish/` 实际只包含 `Pepgent` 20 份、`PM` 3 份、`soroi` 28 份正文快照，没有 `images`、`deploy`、`lab-library`、`remote` 或 `mux` 的 prepublish body 文件。对需要正文恢复的 images/deploy 对象，本轮按盘点定位读取了主会话改写前的 session entry；`context/body.md` 不被冒称为会话前源文。session-entry 比对结果见第4.2节，未留下正文证据缺口。

## 3. 远端 main 内容核验：实际命令与输出

### 3.1 `Pepgent/soroi`

命令：

```sh
git fetch origin main
git diff --name-status f752546 FETCH_HEAD -- packages e2e package.json bun.lock design
git diff --exit-code f752546 FETCH_HEAD -- packages e2e package.json bun.lock design
```

实际输出：

```text
From https://github.com/Pepgent/soroi
 * branch            main       -> FETCH_HEAD
--- product paths diff baseline to fetched main ---
--- product content diff exit ---
exit=0
```

完整 `git diff --name-status f752546 FETCH_HEAD` 只有以下治理文件差异：

```text
A .omp/WATCHDOG-LeaderCompliance.md
A .omp/agents/argon-governance.md
M .omp/agents/argon.md
M .omp/agents/secretary.md
M .omp/skills/tern-worker/SKILL.md
M AGENTS.md
M LEDGER.md
```

这与 D15-08/Argon/LEDGER 保留范围相符；产品 `packages/e2e/package.json/bun.lock/design` 内容 diff 无输出。

### 3.2 `Pepgent/PM`

命令：

```sh
git fetch origin main
git diff --name-status 36f8489 FETCH_HEAD
git diff --name-status 36f8489 FETCH_HEAD -- evidence/decisions/D2-components.md evidence/decisions/D3-network-mux.md evidence/decisions/D4-remote-exec.md evidence/decisions/D5-plugins-eval.md evidence/decisions/D6-store-service.md evidence/decisions/D7-lab-backend.md evidence/decisions/D8-mvp-scope.md evidence/decisions/D8-slice-issues.md
git diff --name-status 91dd67e FETCH_HEAD -- evidence/decisions/D10-repo-delivery.md
git diff --name-status cb47daa FETCH_HEAD -- evidence/decisions/D11A-solo-ruling-review.md
```

实际输出摘要：

```text
From https://github.com/Pepgent/PM
 * branch            main       -> FETCH_HEAD
FETCH_HEAD=1d58523aaf8cd623fa327b84c2494732e6cc366d
status counts: 645 A
top-level path counts: 645 evidence
paths outside evidence: (无输出)
D2-D8 pre-session files: (无输出)
protected D10 archive vs current: (无输出)
protected D11A archive vs current: (无输出)
```

因此相对 `36f8489` 的差异全部是 `evidence/` 新增记录；分组计数为 `argon=12`、`decisions=16`、`inv=587`、`votes=30`，均属于盘点/决策/Argon/投票保护或保留范围。D2–D8 会话前文件、D10 原档案、D11A 原档案的内容 diff 均无输出。

### 3.3 `Pepgent/Pepgent`（仅 `/tmp` clone）

实际创建与读取：

```sh
tmp=$(mktemp -d /tmp/d15-verify-pepgent.XXXXXX)
gh repo clone Pepgent/Pepgent "$tmp/repo"
git fetch origin main
git diff --name-only 16fe1f2 FETCH_HEAD | wc -l
git diff --name-only 16fe1f2 9a6d455 | wc -l
git diff --stat 9a6d455 FETCH_HEAD
```

实际输出：

```text
Cloning into '/tmp/d15-verify-pepgent.G8TOeo/repo'...
/tmp/d15-verify-pepgent.G8TOeo/repo
From https://github.com/Pepgent/Pepgent
 * branch            main       -> FETCH_HEAD
FETCH_HEAD=d4a91fe14306a1fa852365f487c1af696c54dee7
candidate-to-current path count: 83
candidate-to-protected path count: 83
protected-last to current diff: (无输出)
```

盘点明确说明 `16fe1f2` 是会话前 main 候选而非已证精确起点；因此这里不把候选当作精确基线。内容上，当前候选差异的 83 个路径与 `16fe1f2..9a6d455` 保护内容路径一一对应，`9a6d455..FETCH_HEAD` 内容 diff 无输出；这与“只保留无关前端 15 个提交内容”的裁决相符。

### 3.4 其余五仓

各仓均执行以下同一形状的真实命令：

```sh
git fetch origin main
git diff --name-status <盘点会话前SHA> FETCH_HEAD
git diff --stat <盘点会话前SHA> FETCH_HEAD
```

实际返回：

| 仓库 | `git fetch` 的 `FETCH_HEAD` | 对点名基线的内容 diff |
|---|---|---|
| `deploy` | `e4f16ccb95a63bb97bdb3603da576122527b1913` | `git diff --name-status a5fecf1 FETCH_HEAD` 无输出；stat 无输出 |
| `images` | `f66e65562cc9392e376f35ee73a0fac643ffc8cf` | `git diff --name-status 41753eb FETCH_HEAD` 无输出；stat 无输出 |
| `lab-library` | `bf32cf2214db347972568744508d2e5fe2a30845` | `git diff --name-status 0a2da95 FETCH_HEAD` 无输出；stat 无输出 |
| `remote` | `1c2408d6258e4dfad26f4f3607ab641098efee43` | `git diff --name-status 1c2408d FETCH_HEAD` 无输出；stat 无输出 |
| `omp-rpc-mux` | `cd11f31d4e878948a1d84778b3c488154a1233d9` | `git diff --name-status 40a1a9c FETCH_HEAD` 无输出；stat 无输出 |

这些是内容 diff 结果；`FETCH_HEAD`/SHA 只用于定位比较端点。

## 4. issue 正文逐字核验

### 4.1 有 `prepublish` 快照的 51 个对象

实际使用的命令形状（每个 issue 都执行 `diff -u`，不是长度或摘要比较）：

```sh
diff -u \
  <(gh api repos/Pepgent/<repo>/issues/<N> --jq .body) \
  <(jq -r .body local://inv/d15/d10-rewrite-snapshot/prepublish/<repo>-<N>.json)
```

批量实际输出：

```text
PM:      compared=3  mismatches=0
Pepgent: compared=20 mismatches=0
soroi:   compared=28 mismatches=0
```

因此 `PM#13/#14/#15`、`Pepgent#9/#11/#13–#30`、soroi 盘点列出的 28 个旧 issue 的当前 body 与对应 `prepublish.body` 逐字相同。soroi 的 `#196/#203/#205` 在逐字恢复后当前为 `open/reopened`，body diff 仍为零。

### 4.2 没有 `prepublish` body 的仓：使用授权的会话前读取

`prepublish/` 实际没有 `images-*`、`deploy-*`、`lab-library-*`、`remote-*` 或 `omp-rpc-mux-*` 文件。对需要正文恢复的 images/deploy 对象，契约允许使用主会话 01a195a6 改写前的当前对象读取结果；本轮独立读取了盘点明确的 entry：

```text
deploy#1  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/239d6dfb
deploy#8  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/51a5995a
images#3  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/58fc37fd
images#6  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/9dbf7d46
```

实际 `gh api ... --jq .body` 与 session-entry 原文的 `diff -u` 结果：

```text
deploy#1: 正文字符内容逐行一致；仅 session read 渲染与命令输出的终止换行表示不同
deploy#8: diff 无输出
images#3: diff 无输出
images#6: diff 无输出
```

因此不再把缺少 `prepublish` 文件误报为正文证据缺口；上述四个 issue 的会话前正文核验已闭合。`lab-library#5`、`remote#14`、`mux#13` 在 D15-10③ 中没有正文恢复动作。

## 5. 各仓当前对象、解冻动作、保护与冻结核验

### 5.1 `Pepgent/soroi` — **通过**

**通过的对象检查：**

1. `main` 的产品路径相对 `f752546` 内容 diff 为空，只有第 3.1 节列出的治理/Argon/LEDGER 文件差异。
2. 当前 PR API 输出的关键行：

```text
PR281 closed/merged (revert PR)
PR269, PR270, PR271, PR278, PR279 closed/merged
PR272 closed, merged_at empty
PR280 closed, merged_at empty
PR260 open
PR266 open
```

这符合关闭未合并会话 PR、保留旧 PR260/266、合入 main 的 D15 动作。
3. 当前 issue API 输出：

```text
#196 open/reopened
#203 open/reopened
#205 open/reopened
#273 closed/not_planned
#274 closed/not_planned
#275 closed/not_planned
#276 closed/not_planned
#277 closed/not_planned
```

其余旧 issue 状态未被本轮误改。#196/#203/#205 的 PM#23 作废评论 ID 分别为 `6557445760`、`6557446256`、`6557446662`；#273–#277 的 PM#23 评论 ID 分别为 `6557447209`、`6557447640`、`6557448127`、`6557450857`、`6557451282`。
4. 父子边读取：soroi `#196/#203/#205/#273/#274/#275/#276/#277/parent` 均返回 `No parent issue found`/404。PM#21 当前 children 为空（PM 仓读取见 5.2）。
5. 本地/远端保护分支内容 diff 均无输出：

```text
git diff --name-status 789aa4b refs/remotes/origin/issue-196-mux-writer
git diff --name-status 72873a9 refs/remotes/origin/eng/install-check-224
# 两条均无输出
```

`issue-190-durable-sse` 本地旧 worktree 当前仍是 `HEAD=a43336c`，`git diff --name-status a43336c` 的实际路径为 5 个 tracked 修改：

```text
M packages/store/src/contract.ts
M packages/store/src/database.ts
M packages/store/src/records.ts
M packages/store/src/server.ts
M packages/store/src/store.ts
?? packages/store/src/streams.ts
```

这正是受保护 STO-05 原 patch 的五个 tracked 文件加一个未跟踪 `streams.ts`；远端同名新分支已不在 `git ls-remote --heads origin` 输出中。`issue-203-release-import` 的本地冻结树仍在，远端新 ref 不在输出中。
6. 28 个 soroi `prepublish` body 逐字比对为 `28/28`，无 mismatch。
7. 冻结 worktree 读取显示：`eng-e2e-home`、`eng-plugin-home`、`/tmp/pepgent-store-contract` 已不在注册列表；冻结的 `/tmp/pepgent-store-203` 仍有实际未跟踪文件：

```text
?? scripts/__pycache__/build-release.cpython-315.pyc
```

**冻结核验复核：`eng-store-home` 的 37→7 是 HEAD 基准前移造成的显示差异，不是 index 内容变化。**

盘点材料 `soroi.md` 的 S080–S116 记录了 37 个 staged 路径，且盘点时该树 HEAD 为 `4455170`。本轮第一次以当前 HEAD `8c48f5a` 直接运行 `git diff --cached`，得到 7 个路径；这把 index 与已经前移的共享 `main` HEAD 比较，不能直接和盘点记录比较。

按请求使用盘点时 HEAD 重新核验：

```sh
GIT_OPTIONAL_LOCKS=0 git -C /Users/mouriya/Ext/worktrees/eng-store-home rev-parse HEAD
GIT_OPTIONAL_LOCKS=0 git -C /Users/mouriya/Ext/worktrees/eng-store-home diff --cached --name-only 4455170
```

实际输出摘要：

```text
current HEAD:
8c48f5a29c030e39f95cad42486b3ec62fc202dd
cached diff against inventory HEAD: 37 paths
inventory S080-S116 paths: 37
symmetric path differences: (无输出)
```

37 个当前 index 路径与盘点 S080–S116 逐一相同；共享 `main` HEAD 从盘点时的 `4455170` 前进到 `8c48f5a`，因此相对当前 HEAD 显示为 7 个 staged 行。冻结项没有发现 index 内容变化，`eng-store-home` 仍应原地冻结。

### 5.2 `Pepgent/PM` — **通过**

1. main 内容：相对 `36f8489` 的全部 645 个差异均为 `evidence/` 新增，D2–D8 八份会话前文件 diff 无输出；D10 `91dd67e` 与 D11A `cb47daa` 保护档案 diff 无输出。
2. `e519e5b` 保护报告：

```text
git diff --name-status e519e5b FETCH_HEAD -- evidence/inv/s01a193fd
# 无输出
git ls-tree -r --name-only FETCH_HEAD evidence/inv/s01a193fd | wc -l
30
```

3. PR API 只有当前 D15 revert PR24，且为 `closed/merged`；没有 open PR 或非-main远端分支。
4. `PM#13/#14/#15` 当前均 `open`，三份 body 与 `prepublish` 快照 `3/3` 逐字相同。
5. 父子边实际读取：

```text
PM#8 children:
https://github.com/Pepgent/omp-rpc-mux/issues/3
https://github.com/Pepgent/omp-rpc-mux/issues/13
PM#21 children:
(空输出)
```

这证明新增 `PM#8→images#9` 及 PM#21 的六条新增边已移除，而旧 PM#8→mux#3/#13 保留。D15-10⑤ 的 PM#16–#22 暂停说明评论当前尚未出现；该动作属于秘书第⑤步，不把它倒计为本步④失败。

### 5.3 `Pepgent/Pepgent` — **通过（基线精确起点限制已注明）**

所有 Git 操作均在 `/tmp/d15-verify-pepgent.G8TOeo/repo`。

1. 盘点已明确 `16fe1f2` 不是会话前 main 的精确证据，只是候选；因此不把 `git diff 16fe1f2 FETCH_HEAD` 的 83 路径直接说成“回到精确起点”。实际内容核对为：`16fe1f2..FETCH_HEAD` 共 83 路径，`16fe1f2..9a6d455` 保护内容同为 83 路径，`git diff --stat 9a6d455 FETCH_HEAD` 无输出。当前 main 只保留无关前端会话保护内容。
2. PR API：PR42 `closed/merged`；PR39/PR40 仍为既有 `closed/merged` 记录，未编辑旧 PR。`feat/lab-10-library` 远端当前保留；`git diff --name-status fc89bcd refs/remotes/origin/feat/lab-10-library` 无输出。
3. 6 个会话新远端分支在 relevant `git ls-remote --heads origin` 中均不存在：`feat/web-01-async-snapshot`、`evidence/pr-40`、`feat/lab-root-sessions-eng3`、`feat/web-02-lab-wire`、`feat/lab-d12-producer`、`feat/web-02-lab-bridge`。
4. 20 个 Pepgent issue body 与 prepublish 快照逐字比较为 `20/20`、`mismatches=0`。当前 #9/#15 为 `open/reopened`；#41 为 `closed/not_planned`。#9/#15/#41 的 PM#23 评论实际存在，ID 分别为 `6557330511`、`6557330983`、`6557331799`。
5. `Pepgent#21/sub_issues` 为空；`Pepgent#41/parent` 返回 404/no parent。
6. 无关 15 个提交均可由当前 `/tmp` clone 的 `git show --no-patch` 读取；实际列出的对象为：

```text
978bc0e 2d46c1d 286f8cb 1038aee 21f4217 e44f068 b212fb6 a331057
f35103b f7a3313 a9756eb d110c7c e83c2f2 9a6d455 031d01c
```

当前内容相对最后保护树 `9a6d455` 无 diff，未发现无关提交内容被清理。
7. 按用户限定只读列目录与 worktree registry：五棵冻结树全部存在：

```text
/Users/mouriya/Ext/worktrees/eng-lab3-home
/Users/mouriya/Ext/worktrees/eng-web-home
/Users/mouriya/Ext/worktrees/eng-web-01
/Users/mouriya/Ext/worktrees/eng-web-02
/Users/mouriya/Ext/worktrees/eng-web-02b
```

`ls -la /Users/mouriya/Ext/code/pepgent/pepgent/.git/worktrees` 与 `git -C /Users/mouriya/Ext/code/pepgent/pepgent worktree list --porcelain` 均列出五个对应 registry 条目；根 checkout 也仍列为 `/Users/mouriya/Ext/code/pepgent/pepgent`。本核验没有对该根 checkout 执行 Git 写操作。

### 5.4 `Pepgent/deploy` — **通过**

**通过的部分：**

1. `git diff --name-status a5fecf1 FETCH_HEAD` 与 stat 均无输出；main 内容恢复。
2. PR9、PR10、PR12 均为既有 `closed/merged`；D15 PR15 为 `closed/merged`。远端 `issue-8-lab-auth-seed` 与 `56eaff7` 的内容 diff 无输出，证明远端分支恢复内容。
3. issue API：

```text
#1 open/reopened
#8 open/reopened
#11 closed/not_planned
#13 closed/not_planned
#14 closed/not_planned
```

作废评论存在：deploy#1 `6557143117`、#8 `6557143782`、#11 `6557146103`、#13 `6557146576`、#14 `6557147174`。`deploy#8/parent` 当前为 `https://github.com/Pepgent/images/issues/6`；`deploy#13/parent` 返回 404/no parent。跨仓边由 images/PM 唯一执行方处理，当前没有重复写边。
4. deploy-8、deploy-11 两棵冻结树都仍在，且各自保留未归因缓存：

```text
/Users/mouriya/Ext/worktrees/deploy-8/scripts/__pycache__/central.cpython-315.pyc
/Users/mouriya/Ext/worktrees/deploy-11/scripts/__pycache__/central.cpython-315.pyc
```

**D18 冻结判定复核：本地 `issue-8-lab-auth-seed` 保持 `4589a17` 是裁决 9 要求的“冻结如期未动”，不是不符。**

双核裁决 1 解冻的是远端与可达恢复动作；裁决 9 又明确规定含未归因 `.pyc` 的 `deploy-8` 本地目录原地冻结，远端新分支照常恢复。因此当前状态应解释为：

```text
remote issue-8-lab-auth-seed: 56eaff7，内容 diff 无输出
local deploy-8 / refs/heads/issue-8-lab-auth-seed: 4589a17，保持冻结
deploy-8/scripts/__pycache__/central.cpython-315.pyc: 保留
```

核验者没有写本地 ref、没有清理 deploy-8，也没有把冻结目录当成已恢复对象。

**正文来源复核：** `images`/`deploy` 的会话前正文来自主会话改写前读取，而不是 `prepublish/`。本轮按盘点定位重新读取：

```text
deploy#1: session entry 239d6dfb
deploy#8: session entry 51a5995a
```

将两 entry 的原文与当前 `gh api repos/Pepgent/deploy/issues/{1,8} --jq .body` 做 `diff -u`：deploy#8 无输出；deploy#1 只出现渲染/命令终止换行差异，正文字符内容逐行一致（当前 API body 与 session-rendered body 均为 1878 个字符），没有正文段落差异。该终止换行差异不被解释为 issue 内容改写。

deploy#1/#8 当前 `open/reopened`、#11/#13/#14 `closed/not_planned`、父子边和评论仍见前述实际输出；本仓当前对象通过。

### 5.5 `Pepgent/images` — **通过**

1. main 对 `41753eb` 的完整内容 diff 无输出；PR8 保留为既有 merged 记录，D15 PR11 为 `closed/merged`。
2. `issue-6-lab-web-live` 本地/远端均已恢复，实际 `git diff --name-status d40585f refs/remotes/origin/issue-6-lab-web-live` 无输出；既有 worktree 仍注册且 clean。旧 issue-1/5 分支内容没有变化。
3. issue API：`#6 open/reopened`、`#9 closed/not_planned`、`#10 closed/not_planned`；PM#23 作废评论 ID 为 #6 `6557076362`、#9 `6557078332`、#10 `6557078866`。
4. 图关系读取：`images#3/sub_issues` 只有 images#5、images#6；`images#6/parent` 为 images#3；deploy#8 当前 parent 也为 images#6。新增 images#3→deploy#8 已移除，原 images#6→deploy#8 保留。
5. 冻结/保护的 images 旧 worktree `/Users/mouriya/ext/worktrees/issue-6-lab-web-live-75a9ab7` 仍在，HEAD 内容 diff为空。
6. **正文来源复核：** `prepublish/` 没有 images#3/#6 文件；本轮改用盘点定位的主会话改写前读取：images#3 为 session entry `58fc37fd`，images#6 为 `9dbf7d46`。两份原文与当前 `gh api ... --jq .body` 的 `diff -u` 均无输出，正文逐字核验通过。context snapshot 只作定位，不再作为会话前正文来源。

### 5.6 `Pepgent/lab-library` — **通过**

1. main 对 `0a2da95` 的 `git diff --name-status/stat` 均无输出；PR6/PR9/PR11 保留为 merged 记录，D15 PR12 为 `closed/merged`。
2. issue API：`#5 open/reopened`；`#7/#8/#10 closed/not_planned`。四个 issue 的 PM#23 作废评论分别为 `6557001393`、`6557004089`、`6557004550`、`6557005113`。
3. `issue-8-file-input`、`issue-10-node-metadata` 在本地/远端 relevant refs 均不存在；会话新建 `library-8`、`library-10` worktree 不在 `git worktree list`。旧 `issue-5-bundle-guidance` 分支与 worktree 仍在，且 `git diff --name-status 83ebca0 refs/remotes/origin/issue-5-bundle-guidance` 无输出。
4. `issue5/7/8/10/parent` 当前均 404/no parent；无应恢复的新增边。D15 没有对 issue5 正文执行恢复动作，因此不把没有 prepublish body 当作一个伪差异。
5. D15 定稿点名的 PR6 对象冲突已按当前实际 merge 对象处理，main 内容 diff无输出；未发现旧 `83ebca0` 遗产被移除。

### 5.7 `Pepgent/remote` — **通过**

1. main 对 `1c2408d` 的内容 diff 无输出；没有本仓 main revert。
2. PR15 当前 `closed` 且 `merged_at` 为空；旧 PR2/8/9/10/12/13 均保留为起点前 merged 记录。
3. issue14 当前 `closed/not_planned`，PM#23 作废评论 ID `6556952653`；`remote#14/parent` 返回 404/no parent。issue14 本地/远端新分支和 worktree 均已移除；远端 `git ls-remote --heads origin` 只保留 main 与六个旧分支。
4. 六个旧分支逐一对各自盘点对象做 `git diff --name-status`，均无输出；根 checkout worktree 保留。没有 remote prepublish 正文恢复动作。

### 5.8 `Pepgent/omp-rpc-mux` — **通过**

1. main 对 `40a1a9c` 的内容 diff 无输出；D15 PR15 `closed/merged`；旧 PR14 记录保留为 merged。
2. `issue-13-mux-design` 本地/远端仍在，当前内容相对候选 base 的实际 diff 是保护的两份旧稿：`README.md` 与 `design/mux.md`；没有删除、强推或重建该冻结分支。旧 worktree 在第③步之前已不存在，当前 `git worktree list --porcelain` 仍只有根 checkout；本轮没有再次移除或重建。
3. issue13 当前 `open/reopened`，`issue13/parent` 仍为 `https://github.com/Pepgent/PM/issues/8`；原 PM8→mux13 保护边保留，子边为空。当前 body 与 context issue JSON `diff -u` 无输出；PM#23 相关评论 ID 为 `6556915231,6556918800`。
4. 没有本仓新建 issue、未合并 PR 或需要 not_planned 的额外对象。

## 6. 保护名单与冻结红线总核验

### 6.1 会话前遗产

- soroi：`issue-196-mux-writer`/`eng-install-check-224` 内容 diff 无输出；STO-05 旧 worktree 仍为 `a43336c` 加五个 tracked 修改和 `streams.ts`；冻结 store-203 cache仍在。
- PM：D2–D8 八个会话前文件对当前内容 diff 无输出；D10/D11A 原档案对当前内容 diff 无输出。
- Pepgent：`feat/lab-10-library` 相对 `fc89bcd` diff 无输出；旧 `feat/lab-root-sessions` worktree 仍在 root 只读 worktree list 中。
- deploy：远端 `issue-8-lab-auth-seed` 相对 `56eaff7` 内容 diff 无输出；本地 `deploy-8` 按裁决 9 原地冻结，含 `.pyc`，不属于不符。
- images：`issue-6-lab-web-live` 相对 `d40585f` diff 无输出，旧 worktree 保留。
- lab-library：`issue-5-bundle-guidance` 相对 `83ebca0` diff 无输出，旧 worktree 保留。
- remote：六个旧分支逐一内容 diff 无输出，根 worktree 保留。
- mux：`issue-13-mux-design` 冻结分支仍在，旧稿内容未被当作可清理对象。

### 6.2 `e519e5b`、`6c1faea`、Argon 族段落

- PM `e519e5b`：`evidence/inv/s01a193fd/` 当前 30 个文件，`git diff --name-status e519e5b FETCH_HEAD -- evidence/inv/s01a193fd` 无输出。
- soroi `6c1faea`：`.omp/agents/argon-governance.md` 从该保护对象到当前无 diff；`.omp/agents/argon.md` 只有双核裁决允许的背景三行替换，权限/边界主体仍在。当前实际 grep 输出保留：`anthropic/claude-opus-5-5:high`、`omp-peers`、AGENTS 第39行“用户明确要求独立分析时不设此前置，直接派中立取证。”、watchdog `enabled: true`。
- 当前 `tern-worker` 文件实际命中 `claude-opus-5-5:high`、`omp-peers` 和“严禁在 PTY 中另起 omp 查额度”；WATCHDOG 文件实际命中 `enabled: true`。

### 6.3 Pepgent 无关会话 15 个 SHA

在 `/tmp` clone 中逐一 `git show --no-patch --format='%h %s'` 成功读取：

```text
978bc0e 2d46c1d 286f8cb 1038aee 21f4217 e44f068 b212fb6 a331057
f35103b f7a3313 a9756eb d110c7c e83c2f2 9a6d455 031d01c
```

并以 `git diff --stat 9a6d455 FETCH_HEAD` 验证当前 main 与受保护内容树无内容差异；没有把提交编号相等当作唯一证据。

### 6.4 Pepgent 五棵 worktree 与根 registry

严格按用户要求只执行：

```sh
ls -ld /Users/mouriya/Ext/worktrees/eng-lab3-home /Users/mouriya/Ext/worktrees/eng-web-home /Users/mouriya/Ext/worktrees/eng-web-01 /Users/mouriya/Ext/worktrees/eng-web-02 /Users/mouriya/Ext/worktrees/eng-web-02b
ls -la /Users/mouriya/Ext/code/pepgent/pepgent/.git/worktrees
git -C /Users/mouriya/Ext/code/pepgent/pepgent worktree list --porcelain
```

实际观察：五个目录均存在；`.git/worktrees` 中均有 `eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b` 条目；`git worktree list --porcelain` 同时列出根 checkout、五棵冻结树、会话前 `feat-lab-10-library-12fb373` 与 `pepgent-lab-32`。未执行 `worktree remove`、文件删除、checkout、reset 或任何根 checkout 写操作。

## 7. 最终结论

追加复核已修正前述两个初步误判：soroi 的 staged 数量必须以盘点时 `4455170` 为比较端点；deploy-8 本地分支必须按裁决 9 保持冻结；images/deploy 正文应使用授权的 session entry，而不是缺失的 prepublish 文件。

| 仓库 | 结论 | 主要依据 |
|---|---|---|
| `soroi` | **通过** | main、issue、分支、28/28 正文、保护对象和冻结 worktree 均符合；`eng-store-home` 以盘点 HEAD 比较后 37 个 index 路径逐一相同。 |
| `PM` | **通过** | main 差异全部落在 evidence 保护/保留组；D2–D8、D10、D11A 内容恢复；3/3 body、PM8/PM21 边正确。 |
| `Pepgent/Pepgent` | **通过** | 精确会话前 main ref 本身在盘点中未证；允许的候选/保护集合核对无未授权内容；20/20 body、分支、issue、边和五棵冻结树正确。 |
| `deploy` | **通过** | main、远端旧分支、issue 状态/边和冻结 deploy-8 符合裁决；本地 `4589a17` 是裁决 9 要求的冻结状态；deploy#1/#8 session-entry 正文内容核验闭合。 |
| `images` | **通过** | main、分支、issue、边、旧 worktree 和 session-entry 正文逐字核验均符合。 |
| `lab-library` | **通过** | main、PR、issue state/reason、旧分支/旧树和新分支/新树清理符合；D15 没有本仓正文恢复动作。 |
| `remote` | **通过** | main 无内容差异；PR15 关闭未合并；issue14 not_planned、边/新分支/新树清理符合，旧六分支保留。 |
| `omp-rpc-mux` | **通过** | main 内容恢复；issue13 重开、PM8 父边保留；冻结 issue-13 分支仍在，旧 worktree 未被本轮再次动。 |

八仓当前对象核验全部通过。`R20`/`R21` 的 LEDGER 状态仍由秘书和双核流程负责，本报告不修改 LEDGER、不把对象核验冒称为 runtime 验收或阶段 B 完成。

报告路径：`local://exec/d15/VERIFY.md`。

## 8. 追加复核（收到 D15Clone_b978 指示后）

本节补核验并 supersede 初次报告中关于 soroi staged 数量、deploy 本地分支和 images/deploy 正文来源的初步判断；仍只读、未派 subagent、未联系 agent、未写任何仓库或 GitHub 对象。

### 8.1 soroi `eng-store-home`：以盘点时 HEAD 比较 index

盘点记录的该树 HEAD 是 `4455170`，而当前共享 `main` HEAD 已前进至 `8c48f5a`。直接对当前 HEAD 运行 `git diff --cached` 会把旧 index 与新 HEAD 比较，因此只显示 7 条；这不能用来判断冻结 index 是否改变。

实际命令：

```sh
GIT_OPTIONAL_LOCKS=0 git -C /Users/mouriya/Ext/worktrees/eng-store-home rev-parse HEAD
GIT_OPTIONAL_LOCKS=0 git -C /Users/mouriya/Ext/worktrees/eng-store-home diff --cached --name-only 4455170
```

另将当前 37 条路径与盘点材料 S080–S116 的 37 条路径排序后运行 `comm -3`。实际输出：

```text
current HEAD:
8c48f5a29c030e39f95cad42486b3ec62fc202dd
cached diff against inventory HEAD: 37 paths
inventory S080-S116 paths: 37
symmetric path differences: (无输出)
```

结论：index 内容与盘点时 37 条 staged 路径逐一相同；7 条是以已前移 HEAD 为比较端点的显示结果，不是冻结项被改动。soroi 结论修正为 **通过**。

### 8.2 deploy `issue-8-lab-auth-seed`：冻结状态符合裁决 9

重新读取双核裁决 9：含未归因 `.pyc` 的 `/Users/mouriya/Ext/worktrees/deploy-8` 本地目录必须原地冻结；远端新分支照常恢复。因此：

```text
remote issue-8-lab-auth-seed: 56eaff7，内容 diff 无输出
local deploy-8 / refs/heads/issue-8-lab-auth-seed: 4589a17，原地保留
deploy-8/scripts/__pycache__/central.cpython-315.pyc: 原地保留
```

这不是 D18 不符，而是“远端恢复 + 本地冻结”符合裁决 9。deploy 本地分支不应被核验者改写。

### 8.3 images/deploy 正文：改用主会话改写前读取的 session entry

按盘点材料定位并独立读取以下原文：

```text
deploy#1  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/239d6dfb
deploy#8  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/51a5995a
images#3  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/58fc37fd
images#6  -> session://01a195a6-e09a-7070-8423-a7910184b28a/entry/9dbf7d46
```

将这些 entry 中的原文与当前 `gh api repos/Pepgent/<repo>/issues/<N> --jq .body` 逐字 `diff -u`：

```text
deploy#1: 正文字符内容逐行一致；仅 session read 渲染/命令输出终止换行表示不同
deploy#8: diff 无输出
images#3: diff 无输出
images#6: diff 无输出
```

`deploy#1` 的 API body 与 session-rendered body 均为 1878 个字符；原始 diff 的唯一差异是末尾换行表现，不是正文段落或字符内容。由此，images 和 deploy 的正文证据均闭合，两个仓的结论均为 **通过**。

### 8.4 追加复核后的三项结论

```text
soroi: 通过
deploy: 通过
images: 通过
```

因此当前八仓结论均为 **通过**；`R20`/`R21` 的 LEDGER 状态仍未由本报告修改，且本报告不宣称业务 runtime、阶段 B 或秘书第⑤步完成。
