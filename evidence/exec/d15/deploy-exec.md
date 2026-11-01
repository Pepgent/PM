# Pepgent/deploy D15-10③ 执行证据

依据：[PM#23](https://github.com/Pepgent/PM/issues/23)，deploy.md 与双核PREREVIEW裁决1/6/7/9。派发者明确授权写操作与结束对比。不新立设计、不联系其他agent、不派子代理。

## 开始前逐项核对

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

## 执行边界

- 父子边由images/PM唯一执行，本人不写边API。
- deploy-8/deploy-11目录及未归因pyc保持原地冻结；只恢复远端issue-8 ref，暂不改本地已检出ref/文件，避免逆向index差异或触碰冻结目录。本地D18未执行部分保留BLOCKED。
- Project对象不手改。
- 三次merge按26a0c8a→c29e216→35d309f逆序revert，经非draft PR合main，不用closing keyword关闭issue。
- 仅验证本次治理入口Git/GitHub结果，不执行产品部署/测试。
- 首次准备工具调用因动态bash命令被delete-guard拒绝，未执行；改用逐字literal命令，不绕过删除保护。

## 写前核对：创建D15专用回退工作树

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git worktree add -b revert/d15-private-decisions /tmp/d15-deploy-01a195a6 main
```

### (R) 实际回执

```text
Preparing worktree (new branch 'revert/d15-private-decisions')
HEAD is now at 26a0c8a Merge pull request #12 from Pepgent/issue-11-central-identity
warning: worktree clone fell back to plain checkout: git worktree add: APFS clonefile unsupported on this volume (Cross-device link (os error 18)); /Users/mouriya/Ext/code/pepgent/pepgent-deploy/stacks -> /tmp/d15-deploy-01a195a6/stacks

```

## 写前核对：逆序revert第1项PR12

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git revert --no-edit -m 1 26a0c8ac318db996f1d207010288fe01994c9c80
```

### (R) 实际回执

```text
[revert/d15-private-decisions 4150223] Revert "Merge pull request #12 from Pepgent/issue-11-central-identity"
 Date: Sun Nov 1 20:08:58 2026 +0900
 4 files changed, 4 insertions(+), 151 deletions(-)

```

## 写前核对：逆序revert第2项PR10

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git revert --no-edit -m 1 c29e216399f23ad85934f1889bfc84237c510f13
```

### (R) 实际回执

```text
[revert/d15-private-decisions a71a096] Revert "Merge pull request #10 from Pepgent/issue-1-release-init"
 Date: Sun Nov 1 20:08:58 2026 +0900
 3 files changed, 2 insertions(+), 129 deletions(-)
 delete mode 100644 stacks/pepgent-central/release-init.ts
 delete mode 100644 stacks/pepgent-central/release.compose.yaml

```

## 写前核对：逆序revert第3项PR9

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git revert --no-edit -m 1 35d309f852239ef7e985e73fdac5f7135accdb55
```

### (R) 实际回执

```text
[revert/d15-private-decisions f9cf0c0] Revert "Merge pull request #9 from Pepgent/issue-8-lab-auth-seed"
 Date: Sun Nov 1 20:08:58 2026 +0900
 4 files changed, 8 insertions(+), 90 deletions(-)

```

## 合PR前内容对比

命令：`git diff --exit-code a5fecf1d0ee3d2f216afaffa730a10d833180a6d HEAD`（与后续stat以&&连接，stat已运行表示前项exit0）。

### (R) 实际回执

```text
 README.md                                   |  54 +--------
 komodo/syncs/central.toml                   |  10 +-
 scripts/central.py                          | 169 +---------------------------
 stacks/pepgent-central/compose.yaml         |  30 +----
 stacks/pepgent-central/release-init.ts      |  85 --------------
 stacks/pepgent-central/release.compose.yaml |  30 -----
 6 files changed, 11 insertions(+), 367 deletions(-)

```

## 写前核对：准备原文与评论及PR正文文件

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
按session原文逐行提取写入 /tmp/d15-deploy-01a195a6-issue1.md、issue8.md、reopen-comment.md、close-comment.md、pr.md；不改原session或仓库文件
```

### (R) 实际回执

```text
[/tmp/d15-deploy-01a195a6-issue1.md#35BC]
Successfully wrote 2833 bytes to /tmp/d15-deploy-01a195a6-issue1.md
```

### (R) 实际回执

```text
[/tmp/d15-deploy-01a195a6-issue8.md#0873]
Successfully wrote 5160 bytes to /tmp/d15-deploy-01a195a6-issue8.md
```

### (R) 实际回执

```text
[/tmp/d15-deploy-01a195a6-reopen-comment.md#8A3E]
Successfully wrote 278 bytes to /tmp/d15-deploy-01a195a6-reopen-comment.md
```

### (R) 实际回执

```text
[/tmp/d15-deploy-01a195a6-close-comment.md#B33F]
Successfully wrote 378 bytes to /tmp/d15-deploy-01a195a6-close-comment.md
```

### (R) 实际回执

```text
[/tmp/d15-deploy-01a195a6-pr.md#8828]
Successfully wrote 2306 bytes to /tmp/d15-deploy-01a195a6-pr.md
```

## 写前核对：推送三个revert提交

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git push -u origin revert/d15-private-decisions
```

### (R) 实际回执

```text
remote: 
remote: Create a pull request for 'revert/d15-private-decisions' on GitHub by visiting:        
remote:      https://github.com/Pepgent/deploy/pull/new/revert/d15-private-decisions        
remote: 
To https://github.com/Pepgent/deploy.git
 * [new branch]      revert/d15-private-decisions -> revert/d15-private-decisions
branch 'revert/d15-private-decisions' set up to track 'origin/revert/d15-private-decisions'.


Wall time: 1.64 seconds
```

## 写前核对：创建不关闭issue的正式回退PR

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh pr create --repo Pepgent/deploy --base main --head revert/d15-private-decisions --title '按 D15 撤销会话内三次私自合并' --body-file /tmp/d15-deploy-01a195a6-pr.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/pull/15


Wall time: 3.41 seconds
```

## 合并前PR完整当前字段

命令：`gh pr view 15 --repo Pepgent/deploy --json number,url,state,isDraft,baseRefName,baseRefOid,headRefName,headRefOid,body,closingIssuesReferences,mergeable,mergeStateStatus,commits,comments,reviews`

### (R) 实际回执

```text
{"baseRefName":"main","baseRefOid":"26a0c8ac318db996f1d207010288fe01994c9c80","body":"## 摘要\n\n依据 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23) 已通过的 D15 与常驻 Argon、ArgonGovernance 双核预审，撤销会话 `01a195a6` 在 deploy main 的三次合并。本 PR 仅执行治理回退，不关闭任何 issue；这是 D15 执行契约对普通 closing-keyword 流程的明确例外。\n\n## 实现说明\n\n按提交时间从新到旧执行三个 `git revert --no-edit -m 1`：PR12 (`26a0c8a`) → PR10 (`c29e216`) → PR9 (`35d309f`)；没有改写 main 历史，也没有重复 revert 其子提交。会话前 seed `dded751`/`56eaff7` 保留在既有分支，不能因撤本次 merge 删除旧分支或旧 worktree。\n\n## 变更…


[Some lines truncated to 768 bytes. Use artifact://1466:raw:1-1 to read line 1 whole]
```

## 写前核对：合入正式回退PR15

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh pr merge 15 --repo Pepgent/deploy --merge --match-head-commit f9cf0c0ec8d78b40b114be7c52b7059e2fccae63
```

### (R) 实际回执

```text
(no output)

Wall time: 3.17 seconds
```

## 写前核对：同步本仓main到已合回退结果

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git pull --ff-only origin main
```

### (R) 实际回执

```text
From https://github.com/Pepgent/deploy
 * branch            main       -> FETCH_HEAD
   26a0c8a..e4f16cc  main       -> origin/main
Updating 26a0c8a..e4f16cc
Fast-forward
 README.md                                   |  54 +--------
 komodo/syncs/central.toml                   |  10 +-
 scripts/central.py                          | 169 +---------------------------
 stacks/pepgent-central/compose.yaml         |  30 +----
 stacks/pepgent-central/release-init.ts      |  85 --------------
 stacks/pepgent-central/release.compose.yaml |  30 -----
 6 files changed, 11 insertions(+), 367 deletions(-)
 delete mode 100644 stacks/pepgent-central/release-init.ts
 delete mode 100644 stacks/pepgent-central/release.compose.yaml


Wall time: 1.01 seconds
```

## 写前核对：恢复deploy1会话前正文

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue edit 1 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-issue1.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/1


Wall time: 2.04 seconds
```

## 写前核对：重开会话前deploy1

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue reopen 1 --repo Pepgent/deploy
```

### (R) 实际回执

```text
✓ Reopened issue Pepgent/deploy#1 (DEP-03 中心 store 发行初始化)


Wall time: 1.39 seconds
```

## 写前核对：给deploy1追加裁决作废说明

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue comment 1 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-reopen-comment.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/1#issuecomment-6557143117


Wall time: 1.26 seconds
```

## 写前核对：恢复deploy8会话前正文

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue edit 8 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-issue8.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/8


Wall time: 1.41 seconds
```

## 写前核对：重开会话前deploy8

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue reopen 8 --repo Pepgent/deploy
```

### (R) 实际回执

```text
✓ Reopened issue Pepgent/deploy#8 (在 Web serving 前初始化 Lab 管理员并隔离 bootstrap 输入)


Wall time: 1.37 seconds
```

## 写前核对：给deploy8追加裁决作废说明

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue comment 8 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-reopen-comment.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/8#issuecomment-6557143782


Wall time: 1.41 seconds
```

## 写前核对：改deploy11关闭原因为not_planned

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh api --method PATCH repos/Pepgent/deploy/issues/11 -f state=closed -f state_reason=not_planned --jq '{number,state,state_reason,html_url}'
```

### (R) 实际回执

```text
{"html_url":"https://github.com/Pepgent/deploy/issues/11","number":11,"state":"closed","state_reason":"not_planned"}


Wall time: 1.42 seconds
```

## 写前核对：给deploy11追加D15作废说明

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue comment 11 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-close-comment.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/11#issuecomment-6557146103


Wall time: 1.24 seconds
```

## 写前核对：以not planned关闭deploy13

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue close 13 --repo Pepgent/deploy --reason 'not planned'
```

### (R) 实际回执

```text
✓ Closed issue Pepgent/deploy#13 (soroi-slurm 模板的 body 与 step 镜像改为 OCI 引用)


Wall time: 1.36 seconds
```

## 写前核对：给deploy13追加D15作废说明

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue comment 13 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-close-comment.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/13#issuecomment-6557146576


Wall time: 1.32 seconds
```

## 写前核对：以not planned关闭deploy14

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue close 14 --repo Pepgent/deploy --reason 'not planned'
```

### (R) 实际回执

```text
✓ Closed issue Pepgent/deploy#14 (向安装器传入中心入口实际使用的发行 artifact)


Wall time: 1.74 seconds
```

## 写前核对：给deploy14追加D15作废说明

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
gh issue comment 14 --repo Pepgent/deploy --body-file /tmp/d15-deploy-01a195a6-close-comment.md
```

### (R) 实际回执

```text
https://github.com/Pepgent/deploy/issues/14#issuecomment-6557147174


Wall time: 1.50 seconds
```

## 写前核对：恢复会话前远端seed分支

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git push --force-with-lease=refs/heads/issue-8-lab-auth-seed:4589a1702010bbda60bd642b65b5463a10bcc126 origin 56eaff7eb3ff26c144a926d0c2b46e948b1e92d3:refs/heads/issue-8-lab-auth-seed
```

### (R) 实际回执

```text
To https://github.com/Pepgent/deploy.git
 + 4589a17...56eaff7 56eaff7eb3ff26c144a926d0c2b46e948b1e92d3 -> issue-8-lab-auth-seed (forced update)


Wall time: 1.56 seconds
```

## 写前核对：删除会话新建远端release分支

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git push origin --delete issue-1-release-init
```

### (R) 实际回执

```text
To https://github.com/Pepgent/deploy.git
 - [deleted]         issue-1-release-init


Wall time: 1.31 seconds
```

## 写前核对：删除会话新建远端identity分支

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git push origin --delete issue-11-central-identity
```

### (R) 实际回执

```text
To https://github.com/Pepgent/deploy.git
 - [deleted]         issue-11-central-identity


Wall time: 1.35 seconds
```

## 写前核对：移除会话新建且clean的deploy1工作树

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git worktree remove /Users/mouriya/Ext/worktrees/deploy-1
```

### (R) 实际回执

```text
(no output)
```

## 写前核对：删除会话新建本地release分支

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git branch -d issue-1-release-init
```

### (R) 实际回执

```text
Deleted branch issue-1-release-init (was 925864a).

```

## 结束内容/PR/ref核对（本次明确要求的治理验证）

```sh
git diff --exit-code a5fecf1d0ee3d2f216afaffa730a10d833180a6d main && printf MAIN_CONTENT_EQUALS_PRESESSION\n
git branch --show-current
git --no-optional-locks status --porcelain=v1
git ls-remote --heads origin
gh pr view 15 --repo Pepgent/deploy --json url,state,mergedAt,mergeCommit,closingIssuesReferences,isDraft
```

### (R) 实际回执

```text
MAIN_CONTENT_EQUALS_PRESESSION
main
1db43d3b1e1b1488f51aecf99db4c1b5fcf2bcd7	refs/heads/issue-2-central-stack
ab077aa412216cc2f13bf20fe2fb93ef3b67e466	refs/heads/issue-3-remote-catalog
05f44745ecd65e9ced466634392222acc262d09e	refs/heads/issue-6-slurm-consumers
56eaff7eb3ff26c144a926d0c2b46e948b1e92d3	refs/heads/issue-8-lab-auth-seed
e4f16ccb95a63bb97bdb3603da576122527b1913	refs/heads/main
f9cf0c0ec8d78b40b114be7c52b7059e2fccae63	refs/heads/revert/d15-private-decisions
{"closingIssuesReferences":[],"isDraft":false,"mergeCommit":{"oid":"e4f16ccb95a63bb97bdb3603da576122527b1913"},"mergedAt":"2026-11-01T11:10:25Z","state":"MERGED","url":"https://github.com/Pepgent/deploy/pull/15"}


Wall time: 1.50 seconds
```

## 结束issue1原文精确读回

真实GET body与session原文提取的payload逐字符比较，且检查open。命令：`gh api repos/Pepgent/deploy/issues/1 | python3 -c <json.load + pathlib读取原文payload + body相等/open断言>`；payload路径 `/tmp/d15-deploy-01a195a6-issue1.md`，来源239d6dfb第11–50行。

### (R) 实际回执

```text
{"number": 1, "state": "open", "body_equals_original_visible_text": true, "lines": 40}

```

## 结束issue8原文精确读回

真实GET body与session原文提取的payload逐字符比较，且检查open。命令同上一项，issue=8、payload=`/tmp/d15-deploy-01a195a6-issue8.md`，来源51a5995a第11–58行。

### (R) 实际回执

```text
{"number": 8, "state": "open", "body_equals_original_visible_text": true, "lines": 48}

```

## 结束新issue处置、委托边与冻结树只读观察

实际GET issues列表筛选1/8/11/13/14的state/state_reason；GraphQL读取8/13 parent；`git worktree list --porcelain`；两个冻结树各执行`git --no-optional-locks status --short --untracked-files=all`。不执行写边或Project API。

### (R) 实际回执

```text
{"number":14,"state":"closed","state_reason":"not_planned"}
{"number":13,"state":"closed","state_reason":"not_planned"}
{"number":11,"state":"closed","state_reason":"not_planned"}
{"number":8,"state":"open","state_reason":"reopened"}
{"number":1,"state":"open","state_reason":"reopened"}
{"number":8,"parent":{"url":"https://github.com/Pepgent/images/issues/6"}}
{"number":13,"parent":{"url":"https://github.com/Pepgent/PM/issues/21"}}
worktree /Users/mouriya/Ext/code/pepgent/pepgent-deploy
HEAD e4f16ccb95a63bb97bdb3603da576122527b1913
branch refs/heads/main

worktree /tmp/d15-deploy-01a195a6
HEAD f9cf0c0ec8d78b40b114be7c52b7059e2fccae63
branch refs/heads/revert/d15-private-decisions

worktree /Users/mouriya/Ext/worktrees/deploy-11
HEAD b4be605ed62fa6930872a656e9d2b0a8ecfb2da5
branch refs/heads/issue-11-central-identity

worktree /Users/mouriya/Ext/worktrees/deploy-8
HEAD 4589a1702010bbda60bd642b65b5463a10bcc126
branch refs/heads/issue-8-lab-auth-seed

?? scripts/__pycache__/central.cpython-315.pyc
?? scripts/__pycache__/central.cpython-315.pyc


Wall time: 1.50 seconds
```

## 写前核对：移除已合入的临时回退工作树

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git worktree remove /tmp/d15-deploy-01a195a6
```

### (R) 实际回执

```text
(no output)
```

## 写前核对：删除已合入的临时本地回退分支

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
git branch -d revert/d15-private-decisions
```

### (R) 实际回执

```text
Deleted branch revert/d15-private-decisions (was f9cf0c0).

```

## 恢复原文备查（从原session可见正文逐行提取，无新编正文）

### deploy1

```markdown
## 必须先读

- 决策树根：[D8 MVP 验收定义与实现计划](https://github.com/Pepgent/PM/issues/8)。
- [D8 §4.2 切片表](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L219-L391)；[本切片原始行](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L368)：范围、依赖、验收与档位。
- [D8 §4.1 波次与并行顺序](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L182-L202)：排期与集成顺序。
- [D6-22](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D6-store-service.md#L50)：本切片继承的组件归属与行为契约。
- [D2-20](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L57)：本切片继承的组件归属与行为契约。
- [D2-23](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D2-components.md#L60)：本切片继承的组件归属与行为契约。

## 目标 / what

`pepgent-central` 的 store 就绪后，init 以 `PUT /releases/{version}` 提交发行 artifact（D6:50、155-158）

## 责任与范围

- 所属仓库：`Pepgent/deploy`。
- 切片 ID：`DEP-03`。
- 解锁：S2。
- 档位 / tier：`low`。
- 波次 / wave：`VS2`。
- 按已通过的 D2–D8 实施；不在本 issue 重议跨仓库设计，不扩大或缩小该行范围。

## 验收 / acceptance

`GET /releases` 有这条 `ReleaseRecord`，它引用的对象都能 `GET /objects/<哈希>`

验收执行与记录遵循 [D8-11 / D8-12](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L82-L83) 及 [§3 验收矩阵](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L102-L151)。完整相关 runtime 路径与权威方下游结果必须留证；只写定义、类型检查、构建或容器存活不代表完成。不得将 hash 验证作为证据；原行涉及哈希的身份/内容契约保持不变，须用真实运行行为与下游结果证明验收。

## 依赖关系

- Depends on: [STO-12](https://github.com/Pepgent/soroi/issues/203)（前置切片须已有 runtime 验收证据，才能开工）。
- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。

## 执行与异步状态

- 状态只在本 issue 评论中更新：`STARTED` / `PR` / `BLOCKED` / `DONE`，每次附证据。
- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。
- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。
- `BLOCKED`：写清具体阻塞、负责方与已观察到的输出。
- `DONE`：附合并提交或 PR、实际 runtime 的命令/环境/输出及下游最终结果；证据按 D8-12 归档。Web 用户路径必须附真实浏览器操作和截图。
```

### deploy8

```markdown
## 必须先读

- Parent：[lab-web 真实认证与运行时安装集成](https://github.com/Pepgent/images/issues/6)。本 child 承担 deploy 的认证输入与 seed/serving 生命周期，不实现应用认证。
- [LAB-03 已合并实现](https://github.com/Pepgent/Pepgent/pull/38)：官方 seed、登录、会话及重复初始化语义。
- [D7 Lab 后端](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md)：D7-03、D7-19 的认证归属与安装顺序。

## 目标与使用场景

部署现有独立 pepgent-central 时，管理员初始化使用真实生产镜像与既有 Lab 数据卷，在 Web serving 之前成功结束；用户可以在既有 loopback origin 登录，部署重跑后仍使用同一持久身份与会话。管理员私有 JSON 不暴露给长期 Web 服务。

## 上下文与问题

Repo：Pepgent/deploy。现有 central.py 的 RunSync→DeployStack 路径没有 LAB-03 所需的 auth inputs 或 seed lifecycle。当前 Web 仍是无认证旧产物；直接换新镜像会因缺少 BETTER_AUTH_SECRET/URL 失败。仅增加 depends_on 不足以停止重部署前已运行的 Web，不能保证同一 SQLite 上 seed 与 serving 顺序执行。

实施前核对 scripts/central.py 的 inject/apply、stacks/pepgent-central/compose.yaml 与 lab-entrypoint.sh。应用 owner 的 apps/web/bin/pepgent-lab-seed.mjs 公开 CLI 使用同一 built server，并从 ../resources/lab/migrations 读取迁移；npm seed:lab-admin 只是无 hooks 的 Node 包装，生产镜像无需 npm。

## 责任与必要决策

- deploy 是消费者；账户、密码、组织、membership 和 seed 幂等行为由应用维护，部署不直接写 DB。镜像的迁移资源打包由 parent 的 images 实现交付。
- stable auth secret 与管理员 JSON 首次在部署 owner 目录生成并保存（0700目录、0600文件），后续保留，不自动轮换、重置或提权；auth secret 经 secret Komodo Variable 注入，不解密 SOPS、不要求操作员粘贴密码。
- origin 固定为当前真实浏览器入口 http://127.0.0.1:59410。seed 与 Web 指向同一个既有 lab-db 卷及 PEPGENT_LAB_HOME，不新建/替换九个持久卷。
- 每次合法部署均通过 central.py：RunSync/读回→仅 StopStack services=[lab-web] 并等待 Complete→DeployStack。webhook、auto update 和 Sync deploy 保持关闭，不能另从无 stop 的路径重部署。
- one-shot auth-seed 使用镜像公共 Node bin、只读 owner-only JSON 和 auth secret/URL，restart=no，依赖 state-init 成功；Web 依赖 auth-seed 成功。长期 Web 不挂管理员 JSON，不获得管理员密码。seed 失败时不从旁路启动 Web，不使用 marker、锁、重试或 fallback。
- 继续在 Web 的同一 HOME 先安装真实 Soroi 发行，再 exec Node；不改写发行或工具注册业务。

## 预期结果

1. 新镜像可从同一持久 Lab 数据库初始化真实 owner；重复部署验证既有密码与 owner membership，不增加重复用户/组织/member，不重置既有身份。
2. 旧 Web 停止后 seed 才运行，seed 成功退出后新 Web 才启动；store、Mux 及 S1 的运行生命周期不变。
3. 实际浏览器邮箱/密码登录后刷新仍有会话；无会话访问 Lab 被拒绝；管理员 JSON 只存在于 seed 输入挂载，Web 无该挂载或密码 env。

## 不应残留

不保留无认证启动示例、静态 secret、seed-installed marker、npm install/build-on-start、直接 DB 写入或手工 UI bootstrap。不得改动 S1、删除持久卷、扩展四角色业务或把 fixture 页面当成真实业务 catalog。

## 验收标准

| # | Dimension | Check | Command / path | Env | Expect |
|---|---|---|---|---|---|
| 1 | environment | 结果1/2：部署真实终态与顺序 | `python3 scripts/central.py variables --release <owner真实tar>`；`preview/apply --branch <已push分支>` | 既有隔离 Core/central | service-scoped StopStack 与 DeployStack Complete/success；seed exit0，Web StartedAt 晚于 seed FinishedAt；store/mux ID与StartedAt不变 |
| 2 | integration | 结果1：重复 seed 与持久身份 | 同一入口第二次 apply，随后真实浏览器刷新并读取 `/api/auth/get-session`；只读 DB 计数 | 同一 Lab volume、auth secret、bootstrap JSON | seed重复成功，原 user/organization/member身份不变，登录session仍有效 |
| 3 | integration | 结果3：真实用户路径 | Yab `/sign-in`→邮箱密码提交→Lab→刷新；另走无会话入口 | 精确origin 127.0.0.1:59410 | 正式session JSON有效，匿名Lab重定向/401，截图无凭据 |
| 4 | environment | 结果3：凭据最小暴露 | inspect seed/Web 的实际 mounts/env，仅输出字段存在性、UID/mode | 真实运行容器 | seed UID1000读600文件；Web没有seed JSON挂载或管理员密码env；无secret输出 |

## 依赖关系

- Depends on: https://github.com/Pepgent/Pepgent/issues/12（已合并真实认证与public seed实现）。
- Parent images live child 提供含实际迁移资源的 published image，并承担安装后 eval/task 的真实工具验收；本 child 不以 seed/登录替代工具验收。
```

## 写前核对：清理临时正文payload文件

重新读取当前LEDGER全文，逐项核对：

- C1-1：不提取设计、不改宿主。
- C1-2：仅deploy仓，不碰Pepgent根。
- C1-3：仅治理回退，不跑产品测试、不以SHA为功能证据。
- C1-4：不触碰生产或SOPS。
- C2-1：严格已通过D15与双核裁决。
- C2-2：不转嫁调查或联系双核。
- C2-3：不新立决策。
- C2-4：保留用户授权产物。
- C3-1：单仓有界任务。
- C3-2：非独立投票。
- C3-3：不替代高阶复核。
- C3-4：不启工程进程、只治理worktree。
- C3-5：不改skill角色。
- C4-1：只已授权PR/issue写入。
- C4-2：中文、不联系agent、不启PTY omp。
- C4-3：状态向Git/GitHub读回、日志供归档。
- C5-1：仅获准来源、不读禁读会话。
- C5-2：写前逐项核对。
- C5-3：逆序revert、保护旧分支和未知文件。
- C5-4：工程冻结保持、治理继续。
- R1：不重开设计调查。
- R2：不改design。
- R3：不迁仓。
- R4：不改双核定义。
- R5：依据PM#23。
- R6：执行本仓不代秘书。
- R7：不派子代理。
- R8：不恢复tern。
- R9：临时revert树、结束main。
- R10：不读01a193fd。
- R11：不改LEDGER。
- R12：不操作环境。
- R13：保护deploy旧成果。
- R14：不碰soroi代码。
- R15：不碰Pepgent业务。
- R16：不执行统一e2e。
- R17：不冒充D9。
- R18：保持冻结。
- R19：已读双核通过。
- R20：执行本仓可达回退、冻结项不动。
- R21：双核复核仍未开始。

实际命令：
```sh
delete tool（默认trash）：/tmp/d15-deploy-01a195a6-issue1.md、issue8.md、reopen-comment.md、close-comment.md、pr.md；上述原文已收入本报告供独立核验
```

### (R) 临时payload清理回执

`delete (trash): all 5 done`：issue1.md、issue8.md、reopen-comment.md、close-comment.md、pr.md 五个 `/tmp/d15-deploy-01a195a6-*` 文件均移入系统Trash；未永久删除。临时回退worktree移除成功，本地临时revert分支删除成功。正式回退PR的远端分支保留为授权执行证据，不属于原私自决策差集。

## 结果总表

| 范围 | 本次实际结果 |
|---|---|
| D01–D08：三次main merge及其子提交净内容 | 按PR12→PR10→PR9逆序生成4150223、a71a096、f9cf0c0，经[PR15](https://github.com/Pepgent/deploy/pull/15)合入；main=`e4f16ccb95a63bb97bdb3603da576122527b1913`。完整内容diff相对会话前a5fecf1为零。 |
| D09/D10：旧[deploy#1](https://github.com/Pepgent/deploy/issues/1) | 原文恢复，GET逐字符等于来源payload，40行；OPEN。追加[6557143117](https://github.com/Pepgent/deploy/issues/1#issuecomment-6557143117)。 |
| D11/D12：旧[deploy#8](https://github.com/Pepgent/deploy/issues/8) | 原文恢复，GET逐字符等于来源payload，48行；OPEN。追加[6557143782](https://github.com/Pepgent/deploy/issues/8#issuecomment-6557143782)。 |
| D13：旧父边 | 只读确认images执行者已恢复images#6→deploy#8；本人未调用写边API。 |
| D14：[deploy#11](https://github.com/Pepgent/deploy/issues/11) | closed/not_planned；追加[6557146103](https://github.com/Pepgent/deploy/issues/11#issuecomment-6557146103)。 |
| D15：[deploy#13](https://github.com/Pepgent/deploy/issues/13) | closed/not_planned；追加[6557146576](https://github.com/Pepgent/deploy/issues/13#issuecomment-6557146576)。 |
| D16：PM#21→deploy#13父边 | 不写。最后GET仍指向PM#21；裁决9指定PM执行者唯一移除，待该执行者完成，不在本仓冒领完成。 |
| D17：[deploy#14](https://github.com/Pepgent/deploy/issues/14) | closed/not_planned；追加[6557147174](https://github.com/Pepgent/deploy/issues/14#issuecomment-6557147174)。 |
| D18远端旧seed ref | 已通过精确force-with-lease恢复到56eaff7eb3ff26c144a926d0c2b46e948b1e92d3；dded751/56eaff7遗产在原远端分支保留。 |
| D18本地旧seed ref与deploy-8目录 | **BLOCKED/未改**：本地仍4589a17，原文件与pyc保持冻结。裁决9与派发明确本地目录原地不动，未擅自reset文件，也未只移动已检出ref而制造反向index差异。若要求本地ref也立即恢复，需要补充允许的冻结目录处理边界；本报告不将远端恢复冒称本地也恢复。 |
| D19/D21：release新分支/新树 | 远端issue-1删除，deploy-1 clean树移除，本地issue-1删除，均有实际回执。 |
| D20远端identity新分支 | 已删除origin/issue-11-central-identity。 |
| D20本地identity分支、D22/D24目录/pyc | **BLOCKED/未改**：本地分支与deploy-11保持b4be605，未知pyc保留。 |
| D23旧树未知pyc | **BLOCKED/未改**，不以缓存扩展名推定可删。 |
| D25–D27 Project项 | **冻结/不手改**；重开/关闭issue可能触发GitHub自动化，不能把自动变化冒称本执行者手动恢复。 |
| 保护对象 | 旧issue-2/3/6远端ref未动；旧seed远端恢复，两个冻结本地树保留；没有改旧评论、已合PR正文或历史提交，没有碰其他仓、会话目录、环境或SOPS。 |
| 结束分支/提交 | deploy根保持main，当前已合/已推；未留未合入main的本次回退改动，临时工作树与本地回退分支已清理。 |

## 验证与未完成边界

实际完成的是本次明确要求的Git/GitHub治理入口验证：真实git revert→push→PR→merge→main读回、真实issue edit/reopen/close/comment→GET正文与state读回、远端ref恢复/删除→ls-remote读回。`git diff --exit-code a5fecf1... main`没有差异并打印MAIN_CONTENT_EQUALS_PRESESSION；这比较的是完整文件内容，而不是用SHA一致性冒充功能验证。

原正文比对的实际命令如下（临时payload现已清理，等价原文完整收在上文，可供独立核验者从原session重取）：

```sh
gh api repos/Pepgent/deploy/issues/1 | python3 -c 'import json,sys,pathlib; x=json.load(sys.stdin); expected=pathlib.Path("/tmp/d15-deploy-01a195a6-issue1.md").read_text(); exact=x["body"]==expected; print(json.dumps({"number":x["number"],"state":x["state"],"body_equals_original_visible_text":exact,"lines":len(x["body"].splitlines())})); sys.exit(0 if exact and x["state"]=="open" else 1)'
gh api repos/Pepgent/deploy/issues/8 | python3 -c 'import json,sys,pathlib; x=json.load(sys.stdin); expected=pathlib.Path("/tmp/d15-deploy-01a195a6-issue8.md").read_text(); exact=x["body"]==expected; print(json.dumps({"number":x["number"],"state":x["state"],"body_equals_original_visible_text":exact,"lines":len(x["body"].splitlines())})); sys.exit(0 if exact and x["state"]=="open" else 1)'
```

输出分别为`{"number":1,"state":"open","body_equals_original_visible_text":true,"lines":40}`和`{"number":8,"state":"open","body_equals_original_visible_text":true,"lines":48}`（工具原始空格版输出见上方回执）。session的issue渲染不能独立证明原始API字符串的尾随换行，本次恢复与比对的是完整可见正文及统一末尾换行，不宣称取得了未保存的编辑历史字节。

**不宣称整个D15完成**：本地D18/20、D22–27冻结按上表保留；跨仓PM父边由唯一执行者处理；产品runtime未运行，本次无部署授权；D15-10④独立核验及⑤秘书归档/LEDGER替换仍由派发者按契约接续。没有联系其他agent或派子代理。
