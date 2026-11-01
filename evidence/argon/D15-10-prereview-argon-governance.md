# D15-10② 各仓差集表、保护段落表与执行契约 — 常驻 `ArgonGovernance` 预审结论与 9 项专项裁决

> **合规与权威声明（依 `LEDGER.md` `4455170` C1–C5、R1–R21、U1–U82，`/Users/mouriya/Ext/work/o1/paper.md` 五道防线，及 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23) D15 定稿）：**
> 1. 本预审裁决由常驻领导层职能与 Agent 工作分配意图守护者 `ArgonGovernance`（`agent://ArgonGovernance`）在完整审阅 `local://exec/d15/PREREVIEW.md`、`local://exec/d15/CONTRACT.md`、8 份单仓只读盘点包（`soroi.md`、`pm.md`、`pepgent.md`、`deploy.md`、`images.md`、`lablibrary.md`、`remote.md`、`mux.md`）及常驻 `Argon` 预审结论（`local://exec/d15/PREREVIEW-argon.md`）后作出，与 `Argon`（`agent://Argon`）共同构成 `argon` 族双核对 `D15-10②` 的完整预审结论与 `D15-12②` 规则解释裁决。
> 2. **本步骤 `LEDGER.md`（`4455170`）逐项核对记录（依 `U68–U69` / `C5-2`）：**
>    - **`C1-1..C1-4`（产品与架构红线）：** 已核实 8 份单仓盘点包均严守组件物理隔离边界；`Pepgent/Pepgent` 仅在 `/tmp` 独立新克隆只读取证，未触碰根 checkout `/Users/mouriya/Ext/code/pepgent/Pepgent` 及无关前端会话（`U59`）；未写/跑测试，未将 commit SHA 一致性冒充功能或 hash 验证（`U64`）；未连接或变更任何运行环境，未接触/解密 SOPS。
>    - **`C2-1..C2-4`（领导层分权与防罢工红线）：** 核实 8 名单仓只读执行者遇到边界与规则解释缺口（9 项）时均如实冻结上报 `argon` 双核，未私自篡改分类或越权拍板；用户直接授权产物（`U57`、`U60–U62`、`U74–U82`）与 `05:48:24Z` 会话前合法遗产均按内容段列入各仓表三保护，不因同文件存在会话内污染而连坐删除，也不因包含保护段落而豁免会话内污染。
>    - **`C3-1..C3-5`（四级上下文物理隔离梯度）：** 核实 `D15-10②` 由治理分身 `D15Clone_b978` 按一仓一 `task:mid` 派发只读盘点，单仓边界互斥，未启动或恢复任何 `tern` 工程进程，未跨仓混派。
>    - **`C4-1..C4-3`（通信信道与权威源头）：** 核实各仓当前状态均向 Git 本地/远端 refs 与 GitHub 当前对象实时取回，历史快照标注取回时点，未将索引或计划语态冒充已执行事实。
>    - **`C5-1..C5-4`（独立取证、台账核对、违规清理与防线闭合）：** 核实 8 份盘点报告及 `PREREVIEW.md` 开头均附完整 `LEDGER.md`（`4455170`）`C1–C5` 与 `R1–R21` 逐项核对记录，未读取被禁旧会话 `01a193fd`，未遍历未授权提交历史提取设计；工程继续保持冻结。
>    - **`R1–R21`：** `R19` 已完成归档（[Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)）；本结论签署后，`R20` 的 `D15-10②` 双核预审即告完成，正式授权进入 `D15-10③`（按逆序执行回退与过渡替换）、`D15-10④`（独立只读核验）与 `D15-10⑤`（秘书发布暂停说明并更新 `LEDGER.md`）。

---

## 一、总体预审结论：`【通过（附 9 项专项裁决与第③步派工约束）】`

1. **`local://exec/d15/CONTRACT.md` 执行契约：预审【通过】**。
2. **8 份单仓只读盘点包（`soroi.md`、`pm.md`、`pepgent.md`、`deploy.md`、`images.md`、`lablibrary.md`、`remote.md`、`mux.md`）及汇总 `PREREVIEW.md`：预审【通过】**。
3. **`argon` 双核一致性确认：** `ArgonGovernance` 与 `Argon`（`local://exec/d15/PREREVIEW-argon.md`）对 9 项待裁决事项的结论 **100% 一致**。`D15Clone_b978` 须严格按以下第二节的 9 项裁决及第三节的第③/④/⑤步派工约束组织执行。

---

## 二、对 `PREREVIEW.md` 所列 9 项事项的逐项裁决（依 `D15-12②` 规则解释权）

### 裁决 1：`D15-02(a)` 读取范围解释——`.workers/<名>/sessions` 中 `tern` 工程会话记录是否属于“`01a195a6` 的子 agent 记录”？
- **裁决结论：【批准纳入 `D15-02(a)` 获准读取范围】`【定】`。**
- **依据（`(U)` / `LEDGER.md` / `paper.md`）：**
  - 依 **`U1`**（*“对于历史session的调查永远只允许subagent调查……通过读取subagent的session来验证他们的工作和思考过程”*）、**`U2`**、**`U70`**、**`C5-1`** 及 **`D15-01④`**、**`D15-12②`**：
  - `/Users/mouriya/Ext/code/pepgent/.workers/<名>/sessions`（及对应的 `session://<id>`，如 `01a1962e`）均系主会话 `01a195a6` 在 `05:48:24Z` 之后启动或恢复的下级工程执行会话，且在 `D15-01④` 中已明文列为受保护的原始取证目录。只读盘点 `task:mid` 读取其中的源头工具调用回执（`git push` 的 `old..new`、编辑前 `read` 原文、`git worktree add -b` 创建回执），既不触碰禁读的 `01a193fd`（`U56`），也不违反 `U38–U41`（禁止从 git 历史提取产品设计），且各仓报告将其单独标注为 `[W]` / `[E]` / `[T]` 不混同主会话 `S` 类记录，完全符合 `C4-3` 权威源头纪律。
- **据此解冻并获准在第③步执行的条目：**
  1. **`Pepgent/soroi`（`soroi.md`）：** 解冻并执行 `S023`（恢复本地与远端 `issue-196-mux-writer` 至 `789aa4bc4898e7cccfdb44bfd7126182d4b38dae`）、`S024`（恢复本地与远端 `eng/install-check-224` 至 `72873a969019fc4b942822c4b8b86f953e5cec28`）、`S025`（恢复本地 `issue-190-durable-sse` 至 `a43336c3b436430c609b246aaad77db479ae6255`，并按 `store/4.bash-original.log` 与 `1ae41ae8` 在旧 worktree `/Users/mouriya/ext/worktrees/issue-190-durable-sse-ff0716f` 完整恢复会话前 `STO-05` 的 5 个 tracked 修改 + 1 个 untracked `streams.ts`）、`S026`（删除本轮新建远端分支 `origin/issue-190-durable-sse`）、`S065–S079` 及 `S117`（丢弃 `eng-e2e-home` 15 个会话新建脏文件并移除 `eng-e2e-home` worktree）、`S118`（移除 `eng-plugin-home` worktree）、`S121`（移除 `/tmp/pepgent-store-contract` worktree）。
  2. **`Pepgent/PM`（`pm.md`）：** 解冻并执行 `D01 / R01`（`eedda7d` 已由 `T` 确证系 `eng-lab3` 在无效派工下提交，作为 `PM` 逆序 revert 第 1 项执行）。
  3. **`Pepgent/Pepgent`（`pepgent.md`）：** 解冻并执行 `D28`（恢复远端 `feat/lab-10-library` 至 `fc89bcd0c562cb205e25f627985580e92cfa1e12`）、`D29–D34`（删除会话新建远端分支 `feat/web-01-async-snapshot`、`evidence/pr-40`、`feat/lab-root-sessions-eng3`、`feat/web-02-lab-wire`、`feat/lab-d12-producer`、`feat/web-02-lab-bridge`——其中 `feat/web-02-lab-bridge` 与 `eng-web-02b` 已由 `[W-W]` `#c7f67984/#d34448ce` 确证系 `eng-web` 在 `X-54` `WEB-02` 派工链下于 `08:33Z` 新建，归因明确）、`D35–D39`（移除会话新建 worktree `eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b`）。
  4. **`Pepgent/deploy`（`deploy.md`）：** 解冻并执行 `D18`（恢复本地与远端 `issue-8-lab-auth-seed` 至 `56eaff7eb3ff26c144a926d0c2b46e948b1e92d3`）、`D19` 与 `D21`（移除 `deploy-1` worktree 并删除本地与远端 `issue-1-release-init` 分支）、以及 `D20` 中的**远端分支 `origin/issue-11-central-identity` 删除**（本地 `deploy-11` 目录因含未归因 `.pyc` 见裁决 9）。
  5. **`Pepgent/images`（`images.md`）：** 解冻并执行 `D03` 与 `D04`（`W` 记录 `#f2d6fbbd/#653bc4fd` 与 `#4c6e2add` 确证 `64114c6` 中 README 第 113 行与第 133/135 行改写均系 `eng-ops` 在 `X-30` 私自派工下同次提交，且会话前分支 tip 为 `d40585f37f437184f26cc8bf5d97c6f6c687f14a`；恢复本地与远端 `issue-6-lab-web-live` 至 `d40585f`）。
  6. **`Pepgent/lab-library`（`lablibrary.md`）：** 解冻并执行 `D08–D11`（移除会话新建 `library-8`、`library-10` worktree，删除本地与远端 `issue-8-file-input`、`issue-10-node-metadata` 分支）。
  7. **`Pepgent/remote`（`remote.md`）：** 确认 `Δ01–Δ12` 全部可执行（关闭 `PR15`、以 `not_planned` 关闭 `remote#14`、移除 `issue-14-slurm-oci-d2a2e42` worktree、删除本地与远端 `issue-14-slurm-oci` 分支）。

---

### 裁决 2：`Pepgent/Pepgent` 中 `PR39`（`6275a0a`）、`PR40`（`cbcd943`）与无关前端会话保护 merge（`a331057`、`031d01c`）的重叠处置
- **裁决结论：【解冻 `pepgent.md` 的 `D02`（revert `PR40` `cbcd943`）与 `D03`（revert `PR39` `6275a0a`），在 `/tmp` 独立新克隆中按从新到旧逆序执行单父 revert 并经 revert PR 合入 `main`】`【定】`。**
- **依据与执行边界（依 `U59`、`U70`、`C1-2`、`C5-3`、`D15-01③`、`D15-03`、`D15-12②`）：**
  - `pepgent.md` 已核实：无关前端会话的 13 个非 merge 功能提交（`978bc0e..9a6d455`）与 `PR40`（`cbcd943`，6 文件）**0 文件重叠**，与 `PR39`（`6275a0a`，19 文件）仅在 `THIRD_PARTY_NOTICES.md` 和 `package-lock.json` 有交集（其余 17 个 `apps/web/src/server/lab/*`、`protocol/lab/*`、`rpc/lab.ts` 业务文件 **0 重叠**）。`a331057` 与 `031d01c` 是无关前端会话将 `origin/main`（含 `PR39`/`PR40`）合入自身分支的同步 merge commit，其相对第一父的 diff 正是 `PR39`/`PR40` 本身，绝不能把同步 merge 当作豁免 `PR39`/`PR40` 私自改动回退的借口（`paper.md` §3.3 方式 B/D）。
  - **执行步骤：** 在 `/tmp` 独立新克隆（严禁触碰 `/Users/mouriya/Ext/code/pepgent/Pepgent` 根 checkout）中：
    1. **顺序 1：** `git revert cbcd94334aa8cc3187ecb9eb8bc5ffbed9b4e055`（单父 squash commit，不用 `-m 1`）；
    2. **顺序 2：** `git revert 6275a0a2ca3c0ec99f2a82241f42ddcd651d5cc9`（单父 squash commit，不用 `-m 1`；若 `package-lock.json` 或 `THIRD_PARTY_NOTICES.md` 出现冲突，完整保留无关前端会话在 `978bc0e..9a6d455` 中引入的依赖与 notices 内容、仅撤回 `6275a0a` 引入的变更；若某处冲突无法机械分离，仅就该冲突文件报 `BLOCKED` 交双核核对 diff）；
    3. 远端 `feat/lab-10-library` 恢复至会话前 `fc89bcd0c562cb205e25f627985580e92cfa1e12`，使会话前遗产完整保留在原分支与原 worktree `feat-lab-10-library-12fb373` 上。

---

### 裁决 3：`Pepgent/images` `PR8`（merge `207f11a`）混合合并与会话前遗产 `d40585f` 保护
- **裁决结论：【解冻 `images.md` `D01`，在 `main` 上执行 `git revert -m 1 207f11ad8ad8a6c5b662f7f99419c1fc323a0c07`（经 revert PR 合入，使 `main` 恢复至会话前 `41753eb`），同时按 `D04` 将本地与远端 `issue-6-lab-web-live` 分支恢复至 `d40585f37f437184f26cc8bf5d97c6f6c687f14a`】`【定】`。**
- **依据：** 在 `05:48:24Z` 会话前，`images` 的 `main` 为 `41753eb`，而 `d40585f` 位于未合并的既有分支 `issue-6-lab-web-live` 及既有 worktree `issue-6-lab-web-live-75a9ab7` 上。撤销本会话私自合并 `207f11a` 使 `main` 回到 `41753eb`，并将 `issue-6-lab-web-live` 恢复到 `d40585f`（保留既有分支与既有 worktree `D18`/`D19` 不删除），即可 100% 恢复会话前状态且分毫不损地保护 `d40585f` 遗产。

---

### 裁决 4：`Pepgent/lab-library` `PR6` 的实际 merge SHA 更正（`f622bcf` vs 定稿笔误 `34c887d`）
- **裁决结论：【确认 `Pepgent/lab-library` `PR6` 的实际 merge commit 对象地址为 `f622bcf3b8043597cd1d60433bfde66ef4487498`（定稿 `34c887d` 系笔误），解冻 `lablibrary.md` `D03`】`【定】`。**
- **执行方式：** 在 `Pepgent/lab-library` `main` 上按从新到旧逆序（顺序 1：`git revert -m 1 4cbb9f33df04c3df3725bbfc657f7656f4e69616` [PR11] $\to$ 顺序 2：`git revert -m 1 8d291afc6e9a7f57432bd6832aaa124fb4733f82` [PR9] $\to$ 顺序 3：`git revert -m 1 f622bcf3b8043597cd1d60433bfde66ef4487498` [PR6]）经 revert PR 合入 `main`，使 `main` 恢复至会话前 `0a2da95df801239c01c82bde8f77b4e7e0331005`；同时完整保留既有分支 `issue-5-bundle-guidance`（`83ebca02f25d2d22bdaac70c8ac1ec46b42777e3`）与既有 worktree `issue-5-bundle-guidance-600bf93` 不动。

---

### 裁决 5：`Pepgent/soroi` 中 `AGENTS.md` 第 39 行末句（`soroi.md` `S013`）的处置
- **裁决结论：【解冻 `soroi.md` `S013`，归入 `D15-08(1)` / `D15-01②` 保留范围（在第③步不删除、不修改），随 `D15-11③` 工作方式规则复核统一审定】`【定】`。**
- **依据：** `AGENTS.md` 第 39 行末句（“用户明确要求独立分析时不设此前置，直接派中立取证。”）直接落实 **`U43–U44`** 与 **`U57`**，且与 `LEDGER.md`（`4455170`）`C5-1.2` 及 `AGENTS.md` 第 54 行完全一致，属于受保护的用户直接指令落实内容。

---

### 裁决 6：重开的会话前合法 issue 下是否追加引用 `PM#23` 的简短作废说明评论？
- **裁决结论：【采纳并强制执行】`【定】`。**
- **执行规则：** 在重开全部 11 个被本会话私自合并关闭的会话前合法 issue（`soroi#196/#203/#205`、`Pepgent#9/#15`、`deploy#1/#8`、`images#6`、`lab-library#5`、`omp-rpc-mux#13`）时，保持全部既有评论不可变，并在每个重开的 issue 下追加一条评论：
  > “依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话 `01a195a6` 期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。”

---

### 裁决 7：会话中新建但已以 `completed` 关闭的 issue 是否改为 `not_planned` 并评论引用 `PM#23`？
- **裁决结论：【是，必须全部改为 `state_reason: "not_planned"` 并追加引用 `PM#23` 的作废说明评论】`【定】`。**
- **执行规则：** 对本会话新建但当前处于 `closed (completed)` 的 5 个 issue（`soroi#274`、`deploy#11`、`lab-library#7`、`lab-library#8`、`lab-library#10`），通过 GitHub API 将其 `state_reason` 更新为 `not_planned`（保持 `state: "closed"`），并与其余 10 个当前 `OPEN` 的本会话新建 issue（`soroi#273/#275/#276/#277`、`Pepgent#41`、`deploy#13/#14`、`images#9/#10`、`remote#14`）一样，追加评论引用 `[Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)` 说明按 D15 作废关闭。

---

### 裁决 8：`Pepgent/omp-rpc-mux` 的 `issue-13-mux-design` 分支与会话前两份未提交草稿处置
- **裁决结论：【维持 `D03`/`D04`/`D08` 对本地与远端 `issue-13-mux-design` 分支及旧 worktree 的原地冻结，同时立即在第③步执行 `D01`（`git revert -m 1 5affef95620263a835978886c855f8e66f2845d0` 经 revert PR 合入 `main`）与 `D07`（重开 `omp-rpc-mux#13`）】`【定】`。**
- **依据与衔接：** 严格遵循 `D15-06` 已表决通过正文，第③步先将 `omp-rpc-mux` 的 `main` 恢复至会话前 `40a1a9cb203af01922533287bb3a134cff2a125b` 并重开 `issue#13`；`issue-13-mux-design` 分支（`e004fa1`）作为承载会话前草稿的受保护载体在第③步保持原地冻结（不删除、不强推），待进入 `D15-11` 复核后，按 `mux.md` 从 `W1`（`40dc69a4`、`9dcdb1e5`）完整提取出的 92 行 `README.md` 与 256 行 `design/mux.md` 接手前原文还原会话前草稿（剔除 `W2` 替换的 8 行）。

---

### 裁决 9：未归因本地脏改动维持冻结、Project v2 字段边界与跨仓父子边/共享治理文件唯一执行方指定
- **裁决结论 `【定】`：**
  1. **维持原地冻结 `BLOCKED` 的本地未归因目录（严禁盲目删除或提交）：**
     - `Pepgent/soroi` 的 `/Users/mouriya/Ext/worktrees/eng-store-home`（`S080–S116`、`S119`，系 `07:18:52Z` `git switch --ignore-other-worktrees main` 后主仓 `main` 前进留下的反向 index 差异，严禁从该目录提交或删除文件；`STO-05` 会话前遗产在旧 worktree `/Users/mouriya/ext/worktrees/issue-190-durable-sse-ff0716f` 按裁决 1 正常恢复）；
     - 3 处含未归因 `.pyc` 缓存的本地新树目录：`/tmp/pepgent-store-203`（`soroi.md` `S120/S122`）、`/Users/mouriya/Ext/worktrees/deploy-8`（`deploy.md` `D23`）、`/Users/mouriya/Ext/worktrees/deploy-11`（`deploy.md` `D22/D24`）——**注意：远端新建分支 `origin/issue-203-release-import` 与 `origin/issue-11-central-identity` 照常删除，仅本地这 3 个目录暂保持原地不动**；
     - GitHub Project v2 看板自动状态项（`deploy.md` `D25–D27`、`images.md` `D15–D17`）及无会话改动归因的旧保留分支（`pepgent.md` `D40–D48`、`lablibrary.md` `D12–D15`、`deploy.md` 旧分支）不在 `D15-10③` 手动写操作范围，保持不动。
  2. **跨仓父子边（Sub-issue API 边）唯一执行方指定（严禁双端重复操作）：**
     - **`images#3 → deploy#8` 移除并恢复 `images#6 → deploy#8`：** 唯一由 **`Pepgent/images` 执行者**执行（`deploy` 执行者不调用该跨仓边 API）；
     - **`Pepgent#21 → Pepgent#41` 移除：** 唯一由 **`Pepgent/Pepgent` 执行者**执行；
     - **`PM#8 → images#9` 与 `PM#21 → soroi#276/#277, remote#14, images#10, deploy#13`（共 6 条跨仓边）移除：** 唯一由 **`Pepgent/PM` 执行者**执行（各子仓执行者只负责以 `not_planned` 关闭各自子 issue 并评论引用 `PM#23`）。
  3. **`D15-08(2)/(3)` 治理文件回退与过渡替换唯一执行方：**
     - `Pepgent/soroi` 中 `.omp/skills/tern-worker/SKILL.md` 与 `.omp/WATCHDOG-LeaderCompliance.md` 的 `D15-08(2)/(3)` 回退与过渡替换，必须严格使用 `pepgent-pm/evidence/argon/D15-08-replacements.md`（同 `local://argon/D15-08-replacements.md`）已审定全文，**唯一由 `Pepgent/soroi` 执行者**在同仓执行，严禁多代理并发修改 `pepgent-soroi` 工作区。

---

## 三、`D15-10③ / ④ / ⑤` 派工与并发纪律（`ArgonGovernance` 强制要求）

1. **宿主机内存水位与并发上限约束：**
   - 鉴于当前宿主机 OS watchdog 存在内存水位压力（此前曾触发 `Terminated: 15`），`D15Clone_b978` 在派发 `D15-10③`（单仓执行者）与 `D15-10④`（独立核验者）时，**必须采用小波次受控并发（每波次最多 2–3 个 `task:mid` 子代理，严禁一次性并发启动 8 个子代理）**，每一波次必须调用 `wait` 接应完成后再启动下一波次！
2. **一仓一执行者与核验人物理分离（`D15-10③` vs `D15-10④`）：**
   - `D15-10③` 每仓一名 `task:mid` 执行者，严格按本双核预审结论执行逆序 revert PR、分支恢复/删除、issue 正文/状态恢复及父子边恢复，并把每条操作的 `(R)` 命令与真实输出写入 `local://exec/d15/<repo>-exec.md`；
   - `D15-10④` 必须指派**不同于第③步执行者的独立只读 `task:mid` 核验者**，逐项核对会话前状态恢复、保护名单无误伤、以及 `D15-08(3)` 过渡替换已生效，产出 `local://exec/d15/<repo>-verify.md`；
   - `D15-10⑤` 由秘书在 `PM#16–#22` 及 18 条跨仓同步评论所在线程追加引用 `PM#23` 的效力暂停说明，并将 `LEDGER.md` 的 `R20` 状态更新为 `✅`。
