# D15-10② 各仓差集表、保护段落表与执行契约 — 常驻 `Argon` 预审结论与 9 项专项裁决

> **合规与权威声明（依 `LEDGER.md` `4455170` C1–C5、R1–R21、U1–U82 及 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23) D15 定稿）：**
> 1. 本预审裁决由常驻 `Argon`（`agent://Argon`）在完整审阅 `local://exec/d15/PREREVIEW.md`、`local://exec/d15/CONTRACT.md` 及 8 份单仓只读盘点包（`soroi.md`、`pm.md`、`pepgent.md`、`deploy.md`、`images.md`、`lablibrary.md`、`remote.md`、`mux.md`）后作出，与常驻 `ArgonGovernance`（`agent://ArgonGovernance`）共同构成 `argon` 族双核预审结论。
> 2. **本步骤 `LEDGER.md`（`4455170`）逐项核对记录（依 `U68–U69` / `C5-2`）：**
>    - **`C1-1..C1-4`：** 核实 8 份盘点均严守组件边界，`Pepgent/Pepgent` 仅在 `/tmp` 新克隆只读操作、未碰根 checkout 与无关会话（`U59`），未写/跑测试，未将 SHA 当作功能验证证据，未触碰环境或 SOPS；
>    - **`C2-1..C2-4`：** 核实盘点中暴露的 9 项边界与冲突均上报双核裁决、执行者未私自拍板，用户直接授权产物（`U57`、`U60–U62`、`U74–U82`）与会话前遗产均按内容段列入保护表；
>    - **`C3-1..C3-5`、`C4-1..C4-3`、`C5-1..C5-4`：** 核实每仓一名只读 `task:mid`、每份报告开头均附完整的 `C1–C5` 与 `R1–R21` 逐项核对表，未读 `01a193fd`，未遍历未授权历史，工程继续保持冻结；
>    - **`R1–R21`：** `R19` 已完成（PM#23），当前处于 `R20` 的 `D15-10②` 双核预审环节，双核均通过后即进入 `D15-10③` 回退执行与 `D15-10④` 独立核验。

---

## 一、总体预审结论 `【通过（附下述 9 项裁决与执行指令）】`

1. **`local://exec/d15/CONTRACT.md` 执行契约：预审【通过】**（按第二节对 9 项事项的裁决落入第③步执行）。
2. **8 份单仓盘点包（`soroi.md`、`pm.md`、`pepgent.md`、`deploy.md`、`images.md`、`lablibrary.md`、`remote.md`、`mux.md`）：预审【通过】**（各表会话前状态、差集、保护段落及逆序 revert 编号清晰完备；其中待双核裁决的冻结项按第二节逐项解冻或维持冻结）。

---

## 二、对 `PREREVIEW.md` 所列 9 项事项的逐项裁决（每条附 `(U)` 与 `LEDGER` 依据）

### 裁决 1：`D15-02(a)` 读取范围——`.workers/<名>/sessions` 中 `tern` 工程师会话记录是否算“`01a195a6` 的子 agent 记录”？
- **裁决结论：【采纳，纳入 `D15-02(a)` 授权读取范围】`【定】`。**
- **`(U)` 与 `LEDGER.md` 依据：**
  - 依据 **`(U)` `U1`**（*“对于历史session的调查永远只允许subagent调查”*）、**`U2`**（*“把某个subagent视作工具去操控tern，创建完全独立的全功能omp 进程和会话……你自己的session是领导人团队，而工程师，实现者，测试，则是tern中各自其他目录的完整agent”*）、**`U70`**（*“任何因为你私自决策的改动必须全部丢弃重做”*）及 `D15-01④`、`D15-12②`：
  - `.workers/<名>/sessions` 中的 7 个 `tern` 工程会话均系主会话 `01a195a6` 在 `05:48:24Z` 之后启动并派活的下属执行会话（非禁读的 `01a193fd`）。由只读 `task:mid` 子代理读取其中的工具调用回执（`git push` 的 `old..new`、修改前 `read` 原文、`worktree add -b` 回执），完全符合 `U1` 与 `D15-02(a)`，且是精确还原会话前遗产与确认会话新建对象的直接证据。
- **据此解冻并纳入第③步执行的条目：**
  1. **`soroi.md`：** 解冻 `S023`（恢复本地与远端 `issue-196-mux-writer` 至 `789aa4bc4898e7cccfdb44bfd7126182d4b38dae`）、`S024`（恢复本地与远端 `eng/install-check-224` 至 `72873a969019fc4b942822c4b8b86f953e5cec28`）、`S025`（恢复本地 `issue-190-durable-sse` 至 `a43336c3b436430c609b246aaad77db479ae6255` 并按 `store/4.bash-original.log` 与 `1ae41ae8` 逐文件恢复会话前 5 修改 + 1 未跟踪 `streams.ts` 补丁）、`S026`（删除本轮新发布的远端 `origin/issue-190-durable-sse`）、`S065–S079` & `S117`（丢弃 `eng-e2e-home` 15 个会话新建脏文件并移除 `eng-e2e-home` worktree）、`S118`（移除 `eng-plugin-home` worktree）、`S121`（移除 `/tmp/pepgent-store-contract` worktree）。
  2. **`pm.md`：** 解冻 `D01 / R01`（`eedda7d` 已由 `T` 确证系 `eng-lab3` 在无效派工下提交，作为 PM 逆序 revert 第 1 项执行）。
  3. **`pepgent.md`：** 解冻 `[W-L]`/`[W-W]` 支撑的分支与 worktree 项——恢复远端 `feat/lab-10-library` 至 `fc89bcd0c562cb205e25f627985580e92cfa1e12`；移除会话新建 worktree `eng-lab3-home`、`eng-web-home`、`eng-web-01`、`eng-web-02`、`eng-web-02b`；删除会话新建分支 `feat/web-01-async-snapshot`、`evidence/pr-40`、`feat/lab-root-sessions-eng3`、`feat/web-02-lab-wire`、`feat/lab-d12-producer` 及 `feat/web-02-lab-bridge`（`[W-W]` `#c7f67984/#d34448ce` 已确证 `feat/web-02-lab-bridge` 与 `eng-web-02b` 系 `eng-web` 在 `X-54` `WEB-02` 派工链下于 `08:33Z` 新建的准备分支，归因明确，一并解冻清理）。
  4. **`deploy.md`：** 解冻 `D18`（恢复本地与远端 `issue-8-lab-auth-seed` 至 `56eaff7eb3ff26c144a926d0c2b46e948b1e92d3`）、`D19` & `D21`（移除 `deploy-1` worktree 并删除本地与远端 `issue-1-release-init` 分支）、以及 `D20` 中的**远端分支 `origin/issue-11-central-identity` 删除**（本地 `deploy-11` 见裁决 9）。
  5. **`images.md`：** 解冻 `D03` & `D04`（`W` 记录 `#f2d6fbbd/#653bc4fd` 与 `#4c6e2add` 已确证 `64114c6` 中 README 第 113 行 SIF 改写与第 133/135 行改写均系 `eng-ops` 在 `X-30` 私自派工下同次编辑提交，且 `old..new` 确证会话前分支 tip 为 `d40585f37f437184f26cc8bf5d97c6f6c6f6c687f14a`；恢复本地与远端 `issue-6-lab-web-live` 至 `d40585f`）。
  6. **`lablibrary.md`：** 解冻 `D08–D11`（移除会话新建 `library-8`、`library-10` worktree，删除本地与远端 `issue-8-file-input`、`issue-10-node-metadata` 分支）。
  7. **`remote.md`：** 确认 `Δ01–Δ12` 全部可执行（关闭 `PR15`、以 `not_planned` 关闭 `remote#14`、移除 `issue-14-slurm-oci-d2a2e42` worktree、删除本地与远端 `issue-14-slurm-oci` 分支）。

---

### 裁决 2：`Pepgent PR39`（`6275a0a`）、`PR40`（`cbcd943`）与无关前端会话保护 merge（`a331057`、`031d01c`）的重叠处置
- **事实核定：**
  - `pepgent.md` 第 61 行与附录已查明：无关前端会话的 13 个非 merge 功能提交（`978bc0e..9a6d455`）与 `PR40`（`cbcd943`，6 个文件）**0 文件重叠**，与 `PR39`（`6275a0a`，19 个文件）仅在 `THIRD_PARTY_NOTICES.md` 和 `package-lock.json` 两个文件上有交集（其余 17 个 `apps/web/src/server/lab/*`、`protocol/lab/*`、`rpc/lab.ts` 业务文件与无关前端 **0 重叠**）。
  - 所谓“`a331057`、`031d01c` 相对第一父与 PR39/PR40 重叠 19/6 个文件”，是因为 `a331057` 与 `031d01c` 本身就是无关前端会话执行 `Merge origin/main` 把 `PR39` 和 `PR40` 从 `origin/main` 合进本地的同步 merge commit，其相对第一父的 diff 就是 `PR39`/`PR40` 自身！
- **裁决结论：【解冻 `pepgent.md` 的 `D02`（revert `PR40` `cbcd943`）与 `D03`（revert `PR39` `6275a0a`），按逆序执行单父 revert，严禁因同步 merge 放弃回退】`【定】`。**
- **`(U)` 依据与执行规则：**
  - 依据 **`U70`（“任何因为你私自决策的改动必须全部丢弃重做”）** 与 **`U59` / `C1-2` / `C5-3`**（保护无关前端会话改动）：
  - 在 `/tmp` 新克隆中，对单父 squash 提交按逆序执行：
    1. **顺序 1：** `git revert cbcd94334aa8cc3187ecb9eb8bc5ffbed9b4e055`（与无关前端 13 个功能提交无任何文件交集）；
    2. **顺序 2：** `git revert 6275a0a2ca3c0ec99f2a82241f42ddcd651d5cc9`（若 `package-lock.json` 或 `THIRD_PARTY_NOTICES.md` 出现冲突，保留无关前端会话在 `978bc0e..9a6d455` 中引入的依赖/notices 内容、仅撤回 `6275a0a` 引入的变更；若某处冲突无法机械分离，仅就该冲突文件报 `BLOCKED` 交双核核对 diff，绝不允许预设整单跳过 `PR39`/`PR40` 的回退）。
  - 同时，远端 `feat/lab-10-library` 恢复至会话前 `fc89bcd`（保留会话前合法遗产），且 `D01`（不对 `main` 做强推重置）继续保持只用 revert PR 合入 `main`。

---

### 裁决 3：`images PR8`（merge `207f11a`）含会话前 `d40585f` 与会话内 `64114c6`，是整体 revert merge 还是只撤 `64114c6`？
- **裁决结论：【解冻 `images.md` `D01`，对 `207f11a` 执行整体 `git revert -m 1 207f11ad8ad8a6c5b662f7f99419c1fc323a0c07`（使 `main` 恢复到会话前 `41753eb`），同时按 `D04` 将 `issue-6-lab-web-live` 分支恢复到 `d40585f` 保全会话前遗产】`【定】`。**
- **`(U)` 与 `D15` 依据：**
  - 在 `05:48:24Z` 会话前，`images` `main` 是 `41753eb`，`d40585f` 位于未合并的 `issue-6-lab-web-live` 分支上；将 `PR8` 合并入 `main` 并关闭 `images#6` 是主会话在 `X-32`/`X-35`/`X-38`/`X-39` 私自篡改验收标准与父子边后驱动的私自合并结果。
  - 按 `D15-03`、`D15-04`（与 `deploy PR9` 完全同一规则）：在 `main` 上 revert merge `207f11a -m 1` 使 `main` 回到会话前 `41753eb`；在 `issue-6-lab-web-live` 分支（及既有 worktree）上恢复到 `d40585f`，使会话前遗产 `d40585f` 完整保留在原分支上。

---

### 裁决 4：`lab-library PR6` 的 merge SHA 更正（定稿写 `34c887d`，实际对象为 `f622bcf3b8043597cd1d60433bfde66ef4487498`）
- **裁决结论：【确认以 GitHub `PR6` 实际 `mergeCommit` 字段 `f622bcf3b8043597cd1d60433bfde66ef4487498` 为准，解冻 `lablibrary.md` `D03`】`【定】`。**
- **执行方式：** 在 `lab-library` `main` 上按逆序（顺序 1：revert `PR11` `4cbb9f3 -m 1` $\to$ 顺序 2：revert `PR9` `8d291af -m 1` $\to$ 顺序 3：revert `PR6` `f622bcf -m 1`）经 revert PR 合入，使 `main` 精确恢复到会话前 `0a2da95`，同时 `issue-5-bundle-guidance` 分支与旧 worktree 保持在 `83ebca0` 原地不动。

---

### 裁决 5：`pepgent-soroi/AGENTS.md` 第 39 行末句“用户明确要求独立分析时不设此前置，直接派中立取证。”的归属
- **裁决结论：【解冻 `soroi.md` `S013`，归入 `D15-08(1)` / `D15-01②` 保留范围（不移除），并在 `D15-11③` 随 `AGENTS.md` 全文由双核最终复核】`【定】`。**
- **`(U)` 依据：** 该句直接对应 **`(U)` `U43–U44`**（*“老子说独立的subagent，你找mentor？？”*）与 **`U57`**，且与 `LEDGER.md`（`U80` 版）**`C5-1.2`** 及 `AGENTS.md` 第 54 行完全一致，不得删除。

---

### 裁决 6：重开的会话前 issue 下是否补一条引用 `PM#23` 的作废说明评论？
- **裁决结论：【采纳】`【定】`。**
- **执行规则：** 在全部 11 个被本会话关闭而需重开的会话前 issue（`soroi#196/#203/#205`、`Pepgent#9/#15`、`deploy#1/#8`、`images#6`、`lab-library#5`、`omp-rpc-mux#13`）重开时，各补一条评论：
  > “依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话 `01a195a6` 期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。”

---

### 裁决 7：会话中新建、已以 `completed` 关闭的 issue 是否按 `D15-03` 改为 `not_planned` 并评论引用 `PM#23`？
- **裁决结论：【是，必须全部改为 `not_planned` 并追加引用 `PM#23` 的作废评论】`【定】`。**
- **执行规则：** 对会话中新建但当前处于 `closed (completed)` 的 5 个 issue（`soroi#274`、`deploy#11`、`lab-library#7`、`lab-library#8`、`lab-library#10`），通过 GitHub API 将 `state_reason` 更新为 `not_planned`（并保持 `state: "closed"`），同时与其余 10 个当前 `OPEN` 的会话新建 issue（`soroi#273/#275/#276/#277`、`Pepgent#41`、`deploy#13/#14`、`images#9/#10`、`remote#14`）一样，追加评论引用 `[Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)` 说明按 D15 作废关闭。

---

### 裁决 8：`omp-rpc-mux` 的 `issue-13-mux-design` 分支与会话前草稿处置
- **裁决结论：【维持 `D03`/`D04`/`D08` 对 `issue-13-mux-design` 分支与旧 worktree 的原地冻结，同时立即执行 `D01`（revert `PR14` merge `5affef9 -m 1`）与 `D07`（重开 `omp-rpc-mux#13`）】`【定】`。**
- **理由与衔接：**
  - 依 `D15-06`（v5）已通过正文，`mux` 在第③步先执行 `git revert -m 1 5affef9`（使 `main` 恢复到会话前 `40a1a9c`）并重开 `issue#13`；
  - `issue-13-mux-design` 分支（`e004fa1`）在第③步保持原地冻结（不删除、不强推），待阶段 B（`D15-11③/④`）双核复核后，直接使用 `mux.md` 已从 `W1`（`40dc69a4`、`9dcdb1e5`）完整提取出的 92 行 `README.md` 与 256 行 `design/mux.md` 接手前原文还原会话前草稿、剔除会话内替换的 8 行。

---

### 裁决 9：未归因脏改动维持冻结 & 跨仓父子边唯一执行方指定
1. **确认维持原地冻结 `BLOCKED` 的未归因项（严禁盲目删除或提交）：**
   - `soroi` `eng-store-home`（`S080–S116`、`S119`，因 `07:18:52Z` `switch --ignore-other-worktrees main` 留下的旧 index 差异，严禁从该目录提交或删除文件；`STO-05` 遗产在 `issue-190-durable-sse-ff0716f` 按裁决 1 正常恢复）；
   - 三处未归因 `.pyc` 缓存及所在新树目录（`/tmp/pepgent-store-203` 的 `S120/S122`、`deploy-8` 的 `D23`、`deploy-11` 的 `D22/D24`——注：`origin/issue-11-central-identity` 与 `origin/issue-203-release-import` 远端分支照常删除，仅本地目录暂保留不动）；
   - GitHub Project #1 的自动状态项（`deploy.md` `D25–D27`、`images.md` `D15–D17`）及无会话改动归因的旧保留分支（`pepgent.md` `D40–D48`、`lablibrary.md` `D12–D15`）保持不动。
2. **跨仓父子边（Sub-issue Edges）的唯一执行方（避免双仓重复写 API）：**
   - `images#3 → deploy#8` 移除并恢复 `images#6 → deploy#8`：**仅由 `images` 执行者执行**；
   - `Pepgent#21 → Pepgent#41` 移除：**仅由 `Pepgent` 执行者执行**；
   - `PM#8 → images#9` 与 `PM#21 → soroi#276/#277, remote#14, images#10, deploy#13`（共 6 条边）移除：**仅由 `PM` 执行者执行**（各子仓执行者只负责以 `not_planned` 关闭各自子 issue 并评论引用 `PM#23`）。
