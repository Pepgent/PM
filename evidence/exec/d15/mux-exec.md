# omp-rpc-mux：D15-10③ 实际执行记录

依据：[PM#23](https://github.com/Pepgent/PM/issues/23)、local://exec/d15/mux.md、CONTRACT.md第③步及PREREVIEW-argon.md/PREREVIEW-argon-governance.md裁决6、8。仅执行D01、D07；D03/D04/D08保持冻结。PR按此次明确指令不使用closing keyword，不关闭任何issue。未派subagent；第④步由独立核验者承担。

## 本步骤开始前LEDGER逐项核对

| 条款 | 核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |


### (R) 执行前 gh auth status

```text
{'text': "github.com\n  ✓ Logged in to github.com account RiriAgent (keyring)\n  - Active account: true\n  - Git operations protocol: https\n  - Token: ghp_************************************\n  - Token scopes: 'admin:enterprise', 'admin:gpg_key', 'admin:org', 'admin:org_hook', 'admin:public_key', 'admin:repo_hook', 'admin:ssh_signing_key', 'audit_log', 'codespace', 'copilot', 'delete:packages', 'delete_repo', 'gist', 'notifications', 'project', 'repo', 'user', 'workflow', 'write:discussion', 'write:network_configurations', 'write:packages'\n\n  ✓ Logged in to github.com account dt-activenetwork (keyring)\n  - Active account: false\n  - Git operations protocol: https\n  - Token: gho_************************************\n  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'\n\n  ✓ Logged in to github.com account Mouriya-Emma (keyring)\n  - Active account: false\n  - Git operations protocol: https\n  - Token: gho_************************************\n  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'\n", 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 828.1965829990804}}
```

### (R) 执行前本地refs

```text
{'text': '5affef95620263a835978886c855f8e66f2845d0\n5affef95620263a835978886c855f8e66f2845d0\n5affef95620263a835978886c855f8e66f2845d0\ne004fa191888019c00caad8de33deed113b7d38a\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 66.1148749999702}}
```

### (R) 执行前远端refs

```text
{'text': 'c68973b007f4868a94c4738ab2b702ddea504741\trefs/heads/issue-1-mux-vs1\ne004fa191888019c00caad8de33deed113b7d38a\trefs/heads/issue-13-mux-design\n8864a75e61402160e32f37010fa8e4e676cfddf9\trefs/heads/issue-3-readers\n89d7ba15e5938e6195c4e9f9ec24a5db3971815a\trefs/heads/issue-4-trusted-human\n5f0f23ffc43e4011be0b057d247e310c6bbf5245\trefs/heads/issue-5-presence\n81d34da62ae45bb7d604debf6c5ab6100082b23b\trefs/heads/issue-6-control-endpoints\n0b3484c93b5f9f5eefa5c6ef0ef4a0767a6e166a\trefs/heads/issue-7-file-capabilities\n5affef95620263a835978886c855f8e66f2845d0\trefs/heads/main\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 704.7595419995487}}
```

### (R) 执行前根checkout状态

```text
{'text': '(no output)', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 66.01395900174975}}
```

### (R) 执行前worktree

```text
{'text': 'worktree /Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux\nHEAD 5affef95620263a835978886c855f8e66f2845d0\nbranch refs/heads/main\n\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 55.714457999914885}}
```

### (R) 执行前open PR

```text
{'text': '[]\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 451.2743330001831}}
```

### (R) 执行前issue13当前对象（含原文与全部3评论）

```text
{'text': '{"body":"## 目标\\n\\n为 Lab、Soroi writer/reader 与 remote dial 的实现者提供本仓库已实现的架构、角色、帧和生命周期说明，新增 `design/mux.md`，并将 README 收敛为构建、启动与部署操作指南。文档只描述 Mux 能力，不把消费者集成或整个 Pepgent 流程视为已完成。\\n\\n## 上下文\\n\\n- **Repo**: `Pepgent/omp-rpc-mux`。\\n- **Design source**: [D3 定稿](https://github.com/Pepgent/PM/issues/3) 及其 [决策正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md)，[D8-09 的 TUI 根会话补充条款](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L80)；[Soroi 对应边界](https://github.com/Pepgent/soroi/blob/main/design/subagent.m…\n\n\n[Some lines truncated to 768 bytes. Use artifact://1298:raw:1-1 to read line 1 whole]', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 656.2473750002682, 'meta': {'limits': {'columnTruncated': {'maxColumn': 768, 'unit': 'bytes', 'artifactId': '1298', 'lines': {'first': 1, 'last': 1}}}}}}
```

## 2026-11-01T10:45:40.333123+00:00 — 仅刷新本仓origin/main，为新回退树取得远端基线

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
git fetch origin main
```

### (R) git fetch origin main

```text
{'text': 'From https://github.com/Pepgent/omp-rpc-mux\n * branch            main       -> FETCH_HEAD\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 821.778666999191}}
```

## 2026-11-01T10:45:41.168705+00:00 — 创建本步骤专用回退树；不复用冻结旧树

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
git worktree add -b d15/revert-mux-pr14 /tmp/d15-mux-revert origin/main
```

### (R) 创建授权回退worktree

```text
{'text': "Preparing worktree (new branch 'd15/revert-mux-pr14')\nHEAD is now at 5affef9 Merge pull request #14 from Pepgent/issue-13-mux-design\nwarning: worktree clone fell back to plain checkout: git worktree add: APFS clonefile unsupported on this volume (Cross-device link (os error 18)); /Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux/design -> /tmp/d15-mux-revert/design\n", 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 135.3679170012474}}
```

## 2026-11-01T10:45:58.004205+00:00 — D01：按已通过D15-06与双核裁决8撤销PR14合并，顺序1

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/tmp/d15-mux-revert`

```sh
git revert -m 1 5affef95620263a835978886c855f8e66f2845d0 --no-edit
```

### (R) 执行D01 merge revert

```text
{'text': '[d15/revert-mux-pr14 43db013] Revert "Merge pull request #14 from Pepgent/issue-13-mux-design"\n Date: Sun Nov 1 19:45:58 2026 +0900\n 2 files changed, 188 insertions(+), 288 deletions(-)\n delete mode 100644 design/mux.md\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 95.52570799738169}}
```

### (R) 回退提交与会话前基线逐内容diff

```text
{'text': '(no output)', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 36.6910419985652}}
```

### (R) 回退提交实际对象与范围

```text
{'text': 'commit 43db013f685f48a9e050232db6be9b54df84ace2\nAuthor:     RiriAgent <39219425+RiriAgent@users.noreply.github.com>\nAuthorDate: Sun Nov 1 19:45:58 2026 +0900\nCommit:     RiriAgent <39219425+RiriAgent@users.noreply.github.com>\nCommitDate: Sun Nov 1 19:45:58 2026 +0900\n\n    Revert "Merge pull request #14 from Pepgent/issue-13-mux-design"\n    \n    This reverts commit 5affef95620263a835978886c855f8e66f2845d0, reversing\n    changes made to 40a1a9cb203af01922533287bb3a134cff2a125b.\n\n README.md     | 220 +++++++++++++++++++++++++++++++++++++++++--------\n design/mux.md | 256 ----------------------------------------------------------\n 2 files changed, 188 insertions(+), 288 deletions(-)\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 36.20237499848008}}
```

## 2026-11-01T10:45:58.204550+00:00 — 发布回退提交供非draft PR交付，不写main或冻结ref

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/tmp/d15-mux-revert`

```sh
git push -u origin d15/revert-mux-pr14
```

### (R) push回退分支

```text
{'text': "remote: \nremote: Create a pull request for 'd15/revert-mux-pr14' on GitHub by visiting:        \nremote:      https://github.com/Pepgent/omp-rpc-mux/pull/new/d15/revert-mux-pr14        \nremote: \nTo https://github.com/Pepgent/omp-rpc-mux.git\n * [new branch]      d15/revert-mux-pr14 -> d15/revert-mux-pr14\nbranch 'd15/revert-mux-pr14' set up to track 'origin/d15/revert-mux-pr14'.\n\n\nWall time: 1.48 seconds", 'details': {'wallTimeNoticeEmitted': True, 'timeoutSeconds': 60, 'wallTimeMs': 1475.1847500018775}}
```

## 2026-11-01T10:46:43.227322+00:00 — 准备revert PR正文；只在/tmp保存临时输入

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/tmp`

```sh
write /tmp/d15-mux-revert-pr.md (PR正文临时输入)
```

### (R) 准备PR正文临时输入

```text
{'text': '[/tmp/d15-mux-revert-pr.md#5821]\nSuccessfully wrote 2066 bytes to /tmp/d15-mux-revert-pr.md', 'details': {'resolvedPath': '/tmp/d15-mux-revert-pr.md'}}
```

## 2026-11-01T10:46:43.246098+00:00 — 创建非draft revert PR，不设置closing keyword

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/tmp/d15-mux-revert`

```sh
gh pr create --repo Pepgent/omp-rpc-mux --base main --head d15/revert-mux-pr14 --title 按D15撤销Mux文档合并并保全冻结旧稿 --body-file /tmp/d15-mux-revert-pr.md
```

### (R) 创建D15 revert PR

```text
{'text': 'https://github.com/Pepgent/omp-rpc-mux/pull/15\n\n\nWall time: 2.56 seconds', 'details': {'wallTimeNoticeEmitted': True, 'timeoutSeconds': 60, 'wallTimeMs': 2557.8040409982204}}
```

### (R) PR15合并前当前完整字段（无timeline）

```text
{'text': '{"baseRefName":"main","baseRefOid":"5affef95620263a835978886c855f8e66f2845d0","body":"执行依据：[PM#23](https://github.com/Pepgent/PM/issues/23) 的 D15-03、D15-06、D15-10③，以及 Argon / ArgonGovernance 双核预审裁决 8。\\n\\n## 摘要\\n\\n撤销 [PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 的文档合并效果，使 main 的受版本控制内容恢复到会话前基线。仅恢复 README 并撤销 main 中新增的设计文档；不修改 Rust、依赖、CI 或部署配置。\\n\\n## 做了什么\\n\\n- 从 origin/main 新建回退工作树执行 `git revert -m 1 5affef95620263a835978886c855f8e66f2845d0 --no-edit`，产生提交 `43db013f685f48a9e050232db6be9b54df84ace2`；命令成功，2 files changed、188 insertions、288 deleti…\n\n\n[Some lines truncated to 768 bytes. Use artifact://1309:raw:1-1 to read line 1 whole]', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 594.8930000029504, 'meta': {'limits': {'columnTruncated': {'maxColumn': 768, 'unit': 'bytes', 'artifactId': '1309', 'lines': {'first': 1, 'last': 1}}}}}}
```

### (R) PR15完整当前响应（读取原捕获artifact，无重新请求）

```text
{'text': '{"baseRefName":"main","baseRefOid":"5affef95620263a835978886c855f8e66f2845d0","body":"执行依据：[PM#23](https://github.com/Pepgent/PM/issues/23) 的 D15-03、D15-06、D15-10③，以及 Argon / ArgonGovernance 双核预审裁决 8。\\n\\n## 摘要\\n\\n撤销 [PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 的文档合并效果，使 main 的受版本控制内容恢复到会话前基线。仅恢复 README 并撤销 main 中新增的设计文档；不修改 Rust、依赖、CI 或部署配置。\\n\\n## 做了什么\\n\\n- 从 origin/main 新建回退工作树执行 `git revert -m 1 5affef95620263a835978886c855f8e66f2845d0 --no-edit`，产生提交 `43db013f685f48a9e050232db6be9b54df84ace2`；命令成功，2 files changed、188 insertions、288 deletions。\\n- 实际运行 `git diff --exit-code 40a1a9cb203af01922533287bb3a134cff2a125b HEAD --`，结果为空、exit 0。这是逐内容比较，证明全部受版本控制内容已回到会话前状态，不是把 SHA 一致作为功能验证。\\n- 保留本地与远端 `issue-13-mux-design` 的 `e004fa1` 原地冻结，不删除、不强推、不使用，旧稿不会因 main 回退丢失；旧 worktree 处置继续冻结。\\n- 本 PR 不关闭任何 issue；[issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13) 将按 D15 重开，已有正文、父子边与评论不变。\\n\\n## 调整思路\\n\\n- 双核明确要求先撤销无效派工下的 main 合并，再在后续合法复核中处理旧稿与八行修正，不是重新设计裁决。\\n- 使用正常 revert 与 PR 合入，不重写 main 历史，不另行 revert 混合载体 e004fa1，避免重复撤销。\\n- 本次仅文档回退，无产品运行行为改动，未重跑测试、build 或跨组件运行；第④步由不同执行者独立核验。\\n- 按已批准派工，本 PR 只引用治理决策，不使用自动关闭 issue 的关键字，避免关闭必须保持 OPEN 的 issue13 或治理决策。\\n\\n## 增加\\n\\n- 恢复会话前 main README 架构与协议说明；原 MUX-01..08 实现不变。\\n\\n## 减少\\n\\n- 撤销 PR14 在 main 的文档迁移与新增 design/mux.md；分支旧稿及不可变 PR/评论不删除。\\n","closingIssuesReferences":[],"comments":[],"files":[{"path":"README.md","additions":188,"deletions":32,"changeType":"MODIFIED"},{"path":"design/mux.md","additions":0,"deletions":256,"changeType":"DELETED"}],"headRefName":"d15/revert-mux-pr14","headRefOid":"43db013f685f48a9e050232db6be9b54df84ace2","isDraft":false,"mergeStateStatus":"CLEAN","mergeable":"MERGEABLE","number":15,"reviews":[],"state":"OPEN","statusCheckRollup":[],"title":"按D15撤销Mux文档合并并保全冻结旧稿","url":"https://github.com/Pepgent/omp-rpc-mux/pull/15"}', 'details': {'totalLines': 1, 'rowPrefixes': False, 'displayContent': {'text': '{"baseRefName":"main","baseRefOid":"5affef95620263a835978886c855f8e66f2845d0","body":"执行依据：[PM#23](https://github.com/Pepgent/PM/issues/23) 的 D15-03、D15-06、D15-10③，以及 Argon / ArgonGovernance 双核预审裁决 8。\\n\\n## 摘要\\n\\n撤销 [PR14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 的文档合并效果，使 main 的受版本控制内容恢复到会话前基线。仅恢复 README 并撤销 main 中新增的设计文档；不修改 Rust、依赖、CI 或部署配置。\\n\\n## 做了什么\\n\\n- 从 origin/main 新建回退工作树执行 `git revert -m 1 5affef95620263a835978886c855f8e66f2845d0 --no-edit`，产生提交 `43db013f685f48a9e050232db6be9b54df84ace2`；命令成功，2 files changed、188 insertions、288 deletions。\\n- 实际运行 `git diff --exit-code 40a1a9cb203af01922533287bb3a134cff2a125b HEAD --`，结果为空、exit 0。这是逐内容比较，证明全部受版本控制内容已回到会话前状态，不是把 SHA 一致作为功能验证。\\n- 保留本地与远端 `issue-13-mux-design` 的 `e004fa1` 原地冻结，不删除、不强推、不使用，旧稿不会因 main 回退丢失；旧 worktree 处置继续冻结。\\n- 本 PR 不关闭任何 issue；[issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13) 将按 D15 重开，已有正文、父子边与评论不变。\\n\\n## 调整思路\\n\\n- 双核明确要求先撤销无效派工下的 main 合并，再在后续合法复核中处理旧稿与八行修正，不是重新设计裁决。\\n- 使用正常 revert 与 PR 合入，不重写 main 历史，不另行 revert 混合载体 e004fa1，避免重复撤销。\\n- 本次仅文档回退，无产品运行行为改动，未重跑测试、build 或跨组件运行；第④步由不同执行者独立核验。\\n- 按已批准派工，本 PR 只引用治理决策，不使用自动关闭 issue 的关键字，避免关闭必须保持 OPEN 的 issue13 或治理决策。\\n\\n## 增加\\n\\n- 恢复会话前 main README 架构与协议说明；原 MUX-01..08 实现不变。\\n\\n## 减少\\n\\n- 撤销 PR14 在 main 的文档迁移与新增 design/mux.md；分支旧稿及不可变 PR/评论不删除。\\n","closingIssuesReferences":[],"comments":[],"files":[{"path":"README.md","additions":188,"deletions":32,"changeType":"MODIFIED"},{"path":"design/mux.md","additions":0,"deletions":256,"changeType":"DELETED"}],"headRefName":"d15/revert-mux-pr14","headRefOid":"43db013f685f48a9e050232db6be9b54df84ace2","isDraft":false,"mergeStateStatus":"CLEAN","mergeable":"MERGEABLE","number":15,"reviews":[],"state":"OPEN","statusCheckRollup":[],"title":"按D15撤销Mux文档合并并保全冻结旧稿","url":"https://github.com/Pepgent/omp-rpc-mux/pull/15"}', 'startLine': 1, 'lineNumbers': [1]}, 'fileSize': 2725, 'raw': True, 'meta': {'source': {'type': 'internal', 'value': 'artifact://1309'}, 'pagedSource': True}, 'resolvedPath': '/Users/mouriya/.omp/agent/sessions/-Ext-code-pepgent-pepgent-soroi/2026-11-01T05-48-24-090Z_01a195a6-e09a-7070-8423-a7910184b28a/1309.bash.log'}}
```

## 2026-11-01T10:47:26.609086+00:00 — 按双核裁决8合入回退PR；非draft、无closing、MERGEABLE/CLEAN、无checks；不宣称独立第④步已完成

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/tmp/d15-mux-revert`

```sh
gh pr merge 15 -R Pepgent/omp-rpc-mux --merge --match-head-commit 43db013f685f48a9e050232db6be9b54df84ace2
```

### (R) 合入D15 revert PR15

```text
{'text': '(no output)\n\nWall time: 3.08 seconds', 'details': {'wallTimeNoticeEmitted': True, 'timeoutSeconds': 60, 'wallTimeMs': 3080.1527500003576}}
```

### (R) PR15实际合并结果

```text
{'text': '{"closingIssuesReferences":[],"mergeCommit":{"oid":"cd11f31d4e878948a1d84778b3c488154a1233d9"},"mergedAt":"2026-11-01T10:47:28Z","state":"MERGED","url":"https://github.com/Pepgent/omp-rpc-mux/pull/15"}\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 436.27674999833107}}
```

## 2026-11-01T10:47:40.983712+00:00 — 回退PR已合并，根checkout保持main并快进至远端已合并状态

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
git pull --ff-only origin main
```

### (R) 根main快进至PR15合并

```text
{'text': 'From https://github.com/Pepgent/omp-rpc-mux\n * branch            main       -> FETCH_HEAD\n   5affef9..cd11f31  main       -> origin/main\nUpdating 5affef9..cd11f31\nFast-forward\n README.md     | 220 +++++++++++++++++++++++++++++++++++++++++--------\n design/mux.md | 256 ----------------------------------------------------------\n 2 files changed, 188 insertions(+), 288 deletions(-)\n delete mode 100644 design/mux.md\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 60, 'wallTimeMs': 977.9078329987824}}
```

### (R) 执行前issue13完整捕获补读（不重新GET）

```text
{'text': '{"body":"## 目标\\n\\n为 Lab、Soroi writer/reader 与 remote dial 的实现者提供本仓库已实现的架构、角色、帧和生命周期说明，新增 `design/mux.md`，并将 README 收敛为构建、启动与部署操作指南。文档只描述 Mux 能力，不把消费者集成或整个 Pepgent 流程视为已完成。\\n\\n## 上下文\\n\\n- **Repo**: `Pepgent/omp-rpc-mux`。\\n- **Design source**: [D3 定稿](https://github.com/Pepgent/PM/issues/3) 及其 [决策正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md)，[D8-09 的 TUI 根会话补充条款](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L80)；[Soroi 对应边界](https://github.com/Pepgent/soroi/blob/main/design/subagent.md#L16-L24)。\\n- **Implementation baseline**: `40a1a9cb203af01922533287bb3a134cff2a125b`，已合并的 [reader](https://github.com/Pepgent/omp-rpc-mux/pull/8)、[presence](https://github.com/Pepgent/omp-rpc-mux/pull/9)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/pull/10)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/pull/11)、[files](https://github.com/Pepgent/omp-rpc-mux/pull/12) 均有真实运行证据。\\n- **Anchors**: 当前 README 同时承载操作说明和全部协议细节；仓库没有 `design/`。精确行为由 `src/protocol.rs`、`src/protocol/files.rs`、`src/dial.rs` 与 `src/serve/` 实现。\\n\\n## 问题\\n\\nD3 的通过后文档义务要求新建本仓库的 `design/mux.md`，覆盖 D3-02 至 D3-08、D3-13、D3-15、D3-19 及接口和主路径。功能已经落地，但这些契约仍散在 README 和实现 PR 中，消费者容易把历史设计草图、当前内层协议与下游集成状态混为一谈。\\n\\n现有 D3 时序草图还不能直接复制：当前 dial 先完成 process 连接再启动 child；内部 `mux_ready{maxFrameBytes}`、response 全量广播、TUI 根例外和文件能力拒绝边界都已有明确结论。缺少针对已实现行为的连贯设计说明是本问题的原因，而不是缺少另一套协议。\\n\\n## 责任与必要决策\\n\\n- **责任单元**: 本仓库的设计与使用文档。\\n- **受影响方**: Lab/Soroi 的 writer、reader、控制端点与文件客户端，以及 remote 的 dial 启动方；不要求同步改代码。\\n- **决策**: `design/mux.md` 描述架构、对象归属、生命周期、wire/API、背压与错误；README 保留 CLI/env、凭据注入、TLS/mesh、Compose 和发行操作。迁移协议内容，不在两处保留重复的帧/生命周期表，不另写历史对照或声明多处“权威入口”。\\n- **实现忠实度**: 采用当前代码已经兑现的 D3 契约。消费者约定（如 `eval:<session>`、`writers(runId)`、IRC 待投递表）明确标明由消费者拥有；Mux 不据此解释业务 body。旧草图的 `--config`、child/连接顺序和无条件“所有根会话都经 Mux”不作为当前命令或行为保留。\\n\\n## 预期结果\\n\\n- 结果1：读者能从设计文档还原 serve/dial 的边界、本机/远程同一传输、API/权限、writer 声明与 generation、reader、presence、human、endpoint 和文件请求的生命周期及故障影响范围；现有正确 README 契约没有遗漏。\\n- 结果2：设计明确三个易误用边界：原始 ready 后的内部 mux_ready 只给 serve 消费且无外部 writer ack；全部原始 stdout/response 广播而 prefix 只作关联；操作员 TUI 根自己是 writer、不经 Mux、无 generation/token/控制端点，其插件启动的子 agent 仍经 Mux，Lab 后端驱动的根则按普通 Mux writer 使用 dial。\\n- 结果3：README 可直接用于构建、凭据配置、CLI/env、启动与容器/发行操作，并正常链接设计文档；两份文档的内容分工一致，不重复协议表、不含未实现下游能力或部署现状的完成声明。\\n\\n## 范围边界\\n\\n- **不应残留**: 重复的帧/生命周期表、旧 `--config` 示例、原样复制且与实际连接顺序不同的 D3 草图、私有 response 路由的错误含义、把 TUI 根例外扩展到其子 agent 的说法。\\n- **不在范围**: Rust、配置、依赖、协议或运行行为改动；其他仓库的设计重写；Lab/Soroi/remote 业务集成、部署切换与发行；投票史、占位、状态台账和变更日志。\\n- 当前行为未变时复用上述 PR 的仍有效 runtime 证据；本纯文档变更不为凑证据重跑 build、测试或真实用户路径。若发现真正代码/设计矛盾，先明确事实和归属，不静默改代码来迎合文案。\\n\\n## 验收标准\\n\\n| # | Dimension | Check | Command | Env | Expect |\\n|---|---|---|---|---|---|\\n| 1 | function | 覆盖结果1/2：完整阅读设计与当前实现，对照 D3 必需部分、当前已定边界和 TUI 补充条款；不是字符串计数 | `cat design/mux.md src/protocol.rs src/protocol/files.rs`，并只读核对 `src/dial.rs` 与 `src/serve/` 的相关实现 | 本仓库文档分支、上述 baseline 实现 | 独立语义 review 能具体说明各对象的开始/结束、凭据/权限、raw 广播、内部 ready、TUI 例外与故障边界，无无据的业务完成声明 |\\n| 2 | integration | 覆盖结果1/3：完整阅读 README 与设计的内容分工，并核对已有正确含义的迁移 | `cat README.md design/mux.md` | 同一文档分支；D3/PM3、D8-09 和 Soroi 相关设计只读 | 原操作步骤仍完整；协议只保留一份；CLI/env/secret/平台说明与代码一致；没有遗漏或互相矛盾的指导 |\\n| 3 | integration | 覆盖结果3：本地相对 Markdown 链接目标存在 | `python3 -c \'from pathlib import Path; import re; docs=[Path(\\"README.md\\"),Path(\\"design/mux.md\\")]; missing=[(str(p),u) for p in docs for u in re.findall(r\\"\\\\]\\\\(([^)]+)\\\\)\\",p.read_text()) if not u.startswith((\\"http:\\",\\"https:\\",\\"#\\")) and not (p.parent/u.split(\\"#\\")[0]).exists()]; print(missing); assert not missing\'` | 仓库根目录 | 输出 `[]`，exit0；语义正确性仍由前两行完整阅读证明 |\\n\\n## 依赖关系\\n\\n- 关联 [D8 范围与实施依据](https://github.com/Pepgent/PM/issues/8)。本项承接已通过的设计文档义务，不修改已关闭的设计决定。\\n- Depends on: [reader](https://github.com/Pepgent/omp-rpc-mux/issues/3)、[presence](https://github.com/Pepgent/omp-rpc-mux/issues/5)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/issues/4)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/issues/6)、[files](https://github.com/Pepgent/omp-rpc-mux/issues/7)（均已合并且 runtime 验证完成）。\\n","comments":[{"id":"IC_kwDOVelF788AAAABhqP9Qg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED：主执行者已完整读过当前README、D3全文/PM3定稿、D8-09完整TUI补充及相关Soroi边界；steady/divergent与mentor均已核对方案。内容分工按含义迁移：CLI/env、凭据来源校验、TLS/mesh、Compose与跨平台发行操作留README；角色/API/帧、ready、生命周期、raw广播、human、presence、endpoint、文件能力、背压/故障进入design/mux.md。TUI根例外在设计前部明确并归因D8-09，消费者业务义务不写成已部署事实。D3旧时序不复制，按实际process先连后spawn、原始ready后内部mux_ready细化。AGENTS.md不改，因其已要求遵守D3，而D3本身明确要求新建此设计；不增加新的agent指令或多处权威声明。仅两份Markdown变更，复用PR8–12仍有效的运行证据。","createdAt":"2026-11-01T05:20:52Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6553861442","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhrx9PQ","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED — owner=pepgent-eng-rt。接手现有 issue-13-mux-design worktree 的两份文档，完整核对当前 main 实现、D3/D8-09 与 README 分工，沿用 issue 允许的既有真实 runtime 证据；只在出现实质行为变动或验收缺口时新增运行。核对后提交非 draft PR，Fixes #13，合并 main。","createdAt":"2026-11-01T09:21:02Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555467069","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhr5TOg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"DONE — owner=pepgent-eng-rt。[PR #14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 已合并（5affef9）。新增 design/mux.md，README 收敛为操作指南；接手时以 main 实现核对并修正 dial 拒绝原因集合、child 环境传递、files 响应形状、未声明 agent 的 files 404、FIFO 预算方向。验收 3 链接检查在合并前提交上输出 []、exit 0；代码无变化，沿用 PR8–12 运行证据。","createdAt":"2026-11-01T09:33:49Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555587386","viewerDidAuthor":true}],"number":13,"state":"CLOSED","stateReason":"COMPLETED","title":"补齐已实现的 Mux 架构与协议设计","url":"https://github.com/Pepgent/omp-rpc-mux/issues/13"}', 'details': {'totalLines': 1, 'rowPrefixes': False, 'displayContent': {'text': '{"body":"## 目标\\n\\n为 Lab、Soroi writer/reader 与 remote dial 的实现者提供本仓库已实现的架构、角色、帧和生命周期说明，新增 `design/mux.md`，并将 README 收敛为构建、启动与部署操作指南。文档只描述 Mux 能力，不把消费者集成或整个 Pepgent 流程视为已完成。\\n\\n## 上下文\\n\\n- **Repo**: `Pepgent/omp-rpc-mux`。\\n- **Design source**: [D3 定稿](https://github.com/Pepgent/PM/issues/3) 及其 [决策正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md)，[D8-09 的 TUI 根会话补充条款](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L80)；[Soroi 对应边界](https://github.com/Pepgent/soroi/blob/main/design/subagent.md#L16-L24)。\\n- **Implementation baseline**: `40a1a9cb203af01922533287bb3a134cff2a125b`，已合并的 [reader](https://github.com/Pepgent/omp-rpc-mux/pull/8)、[presence](https://github.com/Pepgent/omp-rpc-mux/pull/9)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/pull/10)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/pull/11)、[files](https://github.com/Pepgent/omp-rpc-mux/pull/12) 均有真实运行证据。\\n- **Anchors**: 当前 README 同时承载操作说明和全部协议细节；仓库没有 `design/`。精确行为由 `src/protocol.rs`、`src/protocol/files.rs`、`src/dial.rs` 与 `src/serve/` 实现。\\n\\n## 问题\\n\\nD3 的通过后文档义务要求新建本仓库的 `design/mux.md`，覆盖 D3-02 至 D3-08、D3-13、D3-15、D3-19 及接口和主路径。功能已经落地，但这些契约仍散在 README 和实现 PR 中，消费者容易把历史设计草图、当前内层协议与下游集成状态混为一谈。\\n\\n现有 D3 时序草图还不能直接复制：当前 dial 先完成 process 连接再启动 child；内部 `mux_ready{maxFrameBytes}`、response 全量广播、TUI 根例外和文件能力拒绝边界都已有明确结论。缺少针对已实现行为的连贯设计说明是本问题的原因，而不是缺少另一套协议。\\n\\n## 责任与必要决策\\n\\n- **责任单元**: 本仓库的设计与使用文档。\\n- **受影响方**: Lab/Soroi 的 writer、reader、控制端点与文件客户端，以及 remote 的 dial 启动方；不要求同步改代码。\\n- **决策**: `design/mux.md` 描述架构、对象归属、生命周期、wire/API、背压与错误；README 保留 CLI/env、凭据注入、TLS/mesh、Compose 和发行操作。迁移协议内容，不在两处保留重复的帧/生命周期表，不另写历史对照或声明多处“权威入口”。\\n- **实现忠实度**: 采用当前代码已经兑现的 D3 契约。消费者约定（如 `eval:<session>`、`writers(runId)`、IRC 待投递表）明确标明由消费者拥有；Mux 不据此解释业务 body。旧草图的 `--config`、child/连接顺序和无条件“所有根会话都经 Mux”不作为当前命令或行为保留。\\n\\n## 预期结果\\n\\n- 结果1：读者能从设计文档还原 serve/dial 的边界、本机/远程同一传输、API/权限、writer 声明与 generation、reader、presence、human、endpoint 和文件请求的生命周期及故障影响范围；现有正确 README 契约没有遗漏。\\n- 结果2：设计明确三个易误用边界：原始 ready 后的内部 mux_ready 只给 serve 消费且无外部 writer ack；全部原始 stdout/response 广播而 prefix 只作关联；操作员 TUI 根自己是 writer、不经 Mux、无 generation/token/控制端点，其插件启动的子 agent 仍经 Mux，Lab 后端驱动的根则按普通 Mux writer 使用 dial。\\n- 结果3：README 可直接用于构建、凭据配置、CLI/env、启动与容器/发行操作，并正常链接设计文档；两份文档的内容分工一致，不重复协议表、不含未实现下游能力或部署现状的完成声明。\\n\\n## 范围边界\\n\\n- **不应残留**: 重复的帧/生命周期表、旧 `--config` 示例、原样复制且与实际连接顺序不同的 D3 草图、私有 response 路由的错误含义、把 TUI 根例外扩展到其子 agent 的说法。\\n- **不在范围**: Rust、配置、依赖、协议或运行行为改动；其他仓库的设计重写；Lab/Soroi/remote 业务集成、部署切换与发行；投票史、占位、状态台账和变更日志。\\n- 当前行为未变时复用上述 PR 的仍有效 runtime 证据；本纯文档变更不为凑证据重跑 build、测试或真实用户路径。若发现真正代码/设计矛盾，先明确事实和归属，不静默改代码来迎合文案。\\n\\n## 验收标准\\n\\n| # | Dimension | Check | Command | Env | Expect |\\n|---|---|---|---|---|---|\\n| 1 | function | 覆盖结果1/2：完整阅读设计与当前实现，对照 D3 必需部分、当前已定边界和 TUI 补充条款；不是字符串计数 | `cat design/mux.md src/protocol.rs src/protocol/files.rs`，并只读核对 `src/dial.rs` 与 `src/serve/` 的相关实现 | 本仓库文档分支、上述 baseline 实现 | 独立语义 review 能具体说明各对象的开始/结束、凭据/权限、raw 广播、内部 ready、TUI 例外与故障边界，无无据的业务完成声明 |\\n| 2 | integration | 覆盖结果1/3：完整阅读 README 与设计的内容分工，并核对已有正确含义的迁移 | `cat README.md design/mux.md` | 同一文档分支；D3/PM3、D8-09 和 Soroi 相关设计只读 | 原操作步骤仍完整；协议只保留一份；CLI/env/secret/平台说明与代码一致；没有遗漏或互相矛盾的指导 |\\n| 3 | integration | 覆盖结果3：本地相对 Markdown 链接目标存在 | `python3 -c \'from pathlib import Path; import re; docs=[Path(\\"README.md\\"),Path(\\"design/mux.md\\")]; missing=[(str(p),u) for p in docs for u in re.findall(r\\"\\\\]\\\\(([^)]+)\\\\)\\",p.read_text()) if not u.startswith((\\"http:\\",\\"https:\\",\\"#\\")) and not (p.parent/u.split(\\"#\\")[0]).exists()]; print(missing); assert not missing\'` | 仓库根目录 | 输出 `[]`，exit0；语义正确性仍由前两行完整阅读证明 |\\n\\n## 依赖关系\\n\\n- 关联 [D8 范围与实施依据](https://github.com/Pepgent/PM/issues/8)。本项承接已通过的设计文档义务，不修改已关闭的设计决定。\\n- Depends on: [reader](https://github.com/Pepgent/omp-rpc-mux/issues/3)、[presence](https://github.com/Pepgent/omp-rpc-mux/issues/5)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/issues/4)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/issues/6)、[files](https://github.com/Pepgent/omp-rpc-mux/issues/7)（均已合并且 runtime 验证完成）。\\n","comments":[{"id":"IC_kwDOVelF788AAAABhqP9Qg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED：主执行者已完整读过当前README、D3全文/PM3定稿、D8-09完整TUI补充及相关Soroi边界；steady/divergent与mentor均已核对方案。内容分工按含义迁移：CLI/env、凭据来源校验、TLS/mesh、Compose与跨平台发行操作留README；角色/API/帧、ready、生命周期、raw广播、human、presence、endpoint、文件能力、背压/故障进入design/mux.md。TUI根例外在设计前部明确并归因D8-09，消费者业务义务不写成已部署事实。D3旧时序不复制，按实际process先连后spawn、原始ready后内部mux_ready细化。AGENTS.md不改，因其已要求遵守D3，而D3本身明确要求新建此设计；不增加新的agent指令或多处权威声明。仅两份Markdown变更，复用PR8–12仍有效的运行证据。","createdAt":"2026-11-01T05:20:52Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6553861442","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhrx9PQ","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED — owner=pepgent-eng-rt。接手现有 issue-13-mux-design worktree 的两份文档，完整核对当前 main 实现、D3/D8-09 与 README 分工，沿用 issue 允许的既有真实 runtime 证据；只在出现实质行为变动或验收缺口时新增运行。核对后提交非 draft PR，Fixes #13，合并 main。","createdAt":"2026-11-01T09:21:02Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555467069","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhr5TOg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"DONE — owner=pepgent-eng-rt。[PR #14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 已合并（5affef9）。新增 design/mux.md，README 收敛为操作指南；接手时以 main 实现核对并修正 dial 拒绝原因集合、child 环境传递、files 响应形状、未声明 agent 的 files 404、FIFO 预算方向。验收 3 链接检查在合并前提交上输出 []、exit 0；代码无变化，沿用 PR8–12 运行证据。","createdAt":"2026-11-01T09:33:49Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555587386","viewerDidAuthor":true}],"number":13,"state":"CLOSED","stateReason":"COMPLETED","title":"补齐已实现的 Mux 架构与协议设计","url":"https://github.com/Pepgent/omp-rpc-mux/issues/13"}', 'startLine': 1, 'lineNumbers': [1]}, 'fileSize': 9338, 'raw': True, 'meta': {'source': {'type': 'internal', 'value': 'artifact://1298'}, 'pagedSource': True}, 'resolvedPath': '/Users/mouriya/.omp/agent/sessions/-Ext-code-pepgent-pepgent-soroi/2026-11-01T05-48-24-090Z_01a195a6-e09a-7070-8423-a7910184b28a/1298.bash.log'}}
```

## 2026-11-01T10:47:41.982491+00:00 — D07：按双核裁决8恢复issue13为OPEN，不改正文、图边、旧评论

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
gh issue reopen 13 -R Pepgent/omp-rpc-mux
```

### (R) D07重开issue13

```text
{'text': '✓ Reopened issue Pepgent/omp-rpc-mux#13 (补齐已实现的 Mux 架构与协议设计)\n\n\nWall time: 1.44 seconds', 'details': {'wallTimeNoticeEmitted': True, 'timeoutSeconds': 30, 'wallTimeMs': 1442.5062080025673}}
```

## 2026-11-01T10:47:43.444839+00:00 — 按双核裁决6追加指定PM23作废说明，原评论保持不可变

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
gh issue comment 13 -R Pepgent/omp-rpc-mux --body <裁决6原文>
```

### (R) 裁决6作废说明评论

```text
{'text': 'error: command not found: 01a195a6\nhttps://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556915231\n\n\nWall time: 1.44 seconds', 'details': {'wallTimeNoticeEmitted': True, 'timeoutSeconds': 30, 'wallTimeMs': 1439.5832909978926}}
```

## 执行异常及不可变记录处置

上一条评论命令用双引号包裹含Markdown反引号的正文，shell将`01a195a6`误当命令替换，输出`error: command not found: 01a195a6`；gh仍发布评论6556915231。该评论正文缺少会话标识，不冒称严格完成裁决6。按已发评论不可变规则，不编辑或删除它；立即以shell单引号正确发布完整已批准原文。

实际出错命令：
```sh
gh issue comment 13 -R Pepgent/omp-rpc-mux --body "依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话 `01a195a6` 期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。"
```

## 2026-11-01T10:48:04.227013+00:00 — 保留出错评论不可变，以正确引用发布裁决6完整原文

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
gh issue comment 13 -R Pepgent/omp-rpc-mux --body '依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话 `01a195a6` 期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。'
```

### (R) 正确追加裁决6完整原文

```text
{'text': 'https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556918800\n\n\nWall time: 1.45 seconds', 'details': {'wallTimeNoticeEmitted': True, 'timeoutSeconds': 30, 'wallTimeMs': 1453.3539999984205}}
```

### (R) 重开与评论后issue13源头完整对象

```text
{'text': '{"body":"## 目标\\n\\n为 Lab、Soroi writer/reader 与 remote dial 的实现者提供本仓库已实现的架构、角色、帧和生命周期说明，新增 `design/mux.md`，并将 README 收敛为构建、启动与部署操作指南。文档只描述 Mux 能力，不把消费者集成或整个 Pepgent 流程视为已完成。\\n\\n## 上下文\\n\\n- **Repo**: `Pepgent/omp-rpc-mux`。\\n- **Design source**: [D3 定稿](https://github.com/Pepgent/PM/issues/3) 及其 [决策正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md)，[D8-09 的 TUI 根会话补充条款](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L80)；[Soroi 对应边界](https://github.com/Pepgent/soroi/blob/main/design/subagent.m…\n\n\n[Some lines truncated to 768 bytes. Use artifact://1322:raw:1-1 to read line 1 whole]', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 475.8412499986589, 'meta': {'limits': {'columnTruncated': {'maxColumn': 768, 'unit': 'bytes', 'artifactId': '1322', 'lines': {'first': 1, 'last': 1}}}}}}
```

## 2026-11-01T10:48:28.537319+00:00 — 移除本步骤自建且已合并的临时回退树，不涉及冻结旧worktree

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux`

```sh
git worktree remove /tmp/d15-mux-revert
```

### (R) 清理本步骤临时回退worktree

```text
{'text': '(no output)', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 79.28845800086856}}
```

### (R) 最终main与会话前全部受控内容比较

```text
{'text': '(no output)', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 40.17162499949336}}
```

### (R) 最终根checkout分支

```text
{'text': 'main\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 34.24641700088978}}
```

### (R) 最终本地main与冻结设计ref

```text
{'text': 'cd11f31d4e878948a1d84778b3c488154a1233d9\ne004fa191888019c00caad8de33deed113b7d38a\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 35.13416599854827}}
```

### (R) 最终远端main与冻结设计ref

```text
{'text': 'e004fa191888019c00caad8de33deed113b7d38a\trefs/heads/issue-13-mux-design\ncd11f31d4e878948a1d84778b3c488154a1233d9\trefs/heads/main\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 856.9118340015411}}
```

### (R) 最终根checkout未提交状态

```text
{'text': '(no output)', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 43.424042001366615}}
```

### (R) 最终注册worktree（冻结旧树仍不动）

```text
{'text': 'worktree /Users/mouriya/Ext/code/pepgent/pepgent-omp-rpc-mux\nHEAD cd11f31d4e878948a1d84778b3c488154a1233d9\nbranch refs/heads/main\n\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 10, 'wallTimeMs': 34.96712500229478}}
```

### (R) issue13父边保留PM8

```text
{'text': 'https://github.com/Pepgent/PM/issues/8\n', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 492.663708999753}}
```

### (R) issue13子边保持空

```text
{'text': '[]', 'details': {'wallTimeNoticeEmitted': False, 'timeoutSeconds': 30, 'wallTimeMs': 335.50133400037885}}
```

### (R) issue13最终完整对象（补读原捕获，无重新GET）

```text
{'text': '{"body":"## 目标\\n\\n为 Lab、Soroi writer/reader 与 remote dial 的实现者提供本仓库已实现的架构、角色、帧和生命周期说明，新增 `design/mux.md`，并将 README 收敛为构建、启动与部署操作指南。文档只描述 Mux 能力，不把消费者集成或整个 Pepgent 流程视为已完成。\\n\\n## 上下文\\n\\n- **Repo**: `Pepgent/omp-rpc-mux`。\\n- **Design source**: [D3 定稿](https://github.com/Pepgent/PM/issues/3) 及其 [决策正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md)，[D8-09 的 TUI 根会话补充条款](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L80)；[Soroi 对应边界](https://github.com/Pepgent/soroi/blob/main/design/subagent.md#L16-L24)。\\n- **Implementation baseline**: `40a1a9cb203af01922533287bb3a134cff2a125b`，已合并的 [reader](https://github.com/Pepgent/omp-rpc-mux/pull/8)、[presence](https://github.com/Pepgent/omp-rpc-mux/pull/9)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/pull/10)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/pull/11)、[files](https://github.com/Pepgent/omp-rpc-mux/pull/12) 均有真实运行证据。\\n- **Anchors**: 当前 README 同时承载操作说明和全部协议细节；仓库没有 `design/`。精确行为由 `src/protocol.rs`、`src/protocol/files.rs`、`src/dial.rs` 与 `src/serve/` 实现。\\n\\n## 问题\\n\\nD3 的通过后文档义务要求新建本仓库的 `design/mux.md`，覆盖 D3-02 至 D3-08、D3-13、D3-15、D3-19 及接口和主路径。功能已经落地，但这些契约仍散在 README 和实现 PR 中，消费者容易把历史设计草图、当前内层协议与下游集成状态混为一谈。\\n\\n现有 D3 时序草图还不能直接复制：当前 dial 先完成 process 连接再启动 child；内部 `mux_ready{maxFrameBytes}`、response 全量广播、TUI 根例外和文件能力拒绝边界都已有明确结论。缺少针对已实现行为的连贯设计说明是本问题的原因，而不是缺少另一套协议。\\n\\n## 责任与必要决策\\n\\n- **责任单元**: 本仓库的设计与使用文档。\\n- **受影响方**: Lab/Soroi 的 writer、reader、控制端点与文件客户端，以及 remote 的 dial 启动方；不要求同步改代码。\\n- **决策**: `design/mux.md` 描述架构、对象归属、生命周期、wire/API、背压与错误；README 保留 CLI/env、凭据注入、TLS/mesh、Compose 和发行操作。迁移协议内容，不在两处保留重复的帧/生命周期表，不另写历史对照或声明多处“权威入口”。\\n- **实现忠实度**: 采用当前代码已经兑现的 D3 契约。消费者约定（如 `eval:<session>`、`writers(runId)`、IRC 待投递表）明确标明由消费者拥有；Mux 不据此解释业务 body。旧草图的 `--config`、child/连接顺序和无条件“所有根会话都经 Mux”不作为当前命令或行为保留。\\n\\n## 预期结果\\n\\n- 结果1：读者能从设计文档还原 serve/dial 的边界、本机/远程同一传输、API/权限、writer 声明与 generation、reader、presence、human、endpoint 和文件请求的生命周期及故障影响范围；现有正确 README 契约没有遗漏。\\n- 结果2：设计明确三个易误用边界：原始 ready 后的内部 mux_ready 只给 serve 消费且无外部 writer ack；全部原始 stdout/response 广播而 prefix 只作关联；操作员 TUI 根自己是 writer、不经 Mux、无 generation/token/控制端点，其插件启动的子 agent 仍经 Mux，Lab 后端驱动的根则按普通 Mux writer 使用 dial。\\n- 结果3：README 可直接用于构建、凭据配置、CLI/env、启动与容器/发行操作，并正常链接设计文档；两份文档的内容分工一致，不重复协议表、不含未实现下游能力或部署现状的完成声明。\\n\\n## 范围边界\\n\\n- **不应残留**: 重复的帧/生命周期表、旧 `--config` 示例、原样复制且与实际连接顺序不同的 D3 草图、私有 response 路由的错误含义、把 TUI 根例外扩展到其子 agent 的说法。\\n- **不在范围**: Rust、配置、依赖、协议或运行行为改动；其他仓库的设计重写；Lab/Soroi/remote 业务集成、部署切换与发行；投票史、占位、状态台账和变更日志。\\n- 当前行为未变时复用上述 PR 的仍有效 runtime 证据；本纯文档变更不为凑证据重跑 build、测试或真实用户路径。若发现真正代码/设计矛盾，先明确事实和归属，不静默改代码来迎合文案。\\n\\n## 验收标准\\n\\n| # | Dimension | Check | Command | Env | Expect |\\n|---|---|---|---|---|---|\\n| 1 | function | 覆盖结果1/2：完整阅读设计与当前实现，对照 D3 必需部分、当前已定边界和 TUI 补充条款；不是字符串计数 | `cat design/mux.md src/protocol.rs src/protocol/files.rs`，并只读核对 `src/dial.rs` 与 `src/serve/` 的相关实现 | 本仓库文档分支、上述 baseline 实现 | 独立语义 review 能具体说明各对象的开始/结束、凭据/权限、raw 广播、内部 ready、TUI 例外与故障边界，无无据的业务完成声明 |\\n| 2 | integration | 覆盖结果1/3：完整阅读 README 与设计的内容分工，并核对已有正确含义的迁移 | `cat README.md design/mux.md` | 同一文档分支；D3/PM3、D8-09 和 Soroi 相关设计只读 | 原操作步骤仍完整；协议只保留一份；CLI/env/secret/平台说明与代码一致；没有遗漏或互相矛盾的指导 |\\n| 3 | integration | 覆盖结果3：本地相对 Markdown 链接目标存在 | `python3 -c \'from pathlib import Path; import re; docs=[Path(\\"README.md\\"),Path(\\"design/mux.md\\")]; missing=[(str(p),u) for p in docs for u in re.findall(r\\"\\\\]\\\\(([^)]+)\\\\)\\",p.read_text()) if not u.startswith((\\"http:\\",\\"https:\\",\\"#\\")) and not (p.parent/u.split(\\"#\\")[0]).exists()]; print(missing); assert not missing\'` | 仓库根目录 | 输出 `[]`，exit0；语义正确性仍由前两行完整阅读证明 |\\n\\n## 依赖关系\\n\\n- 关联 [D8 范围与实施依据](https://github.com/Pepgent/PM/issues/8)。本项承接已通过的设计文档义务，不修改已关闭的设计决定。\\n- Depends on: [reader](https://github.com/Pepgent/omp-rpc-mux/issues/3)、[presence](https://github.com/Pepgent/omp-rpc-mux/issues/5)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/issues/4)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/issues/6)、[files](https://github.com/Pepgent/omp-rpc-mux/issues/7)（均已合并且 runtime 验证完成）。\\n","comments":[{"id":"IC_kwDOVelF788AAAABhqP9Qg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED：主执行者已完整读过当前README、D3全文/PM3定稿、D8-09完整TUI补充及相关Soroi边界；steady/divergent与mentor均已核对方案。内容分工按含义迁移：CLI/env、凭据来源校验、TLS/mesh、Compose与跨平台发行操作留README；角色/API/帧、ready、生命周期、raw广播、human、presence、endpoint、文件能力、背压/故障进入design/mux.md。TUI根例外在设计前部明确并归因D8-09，消费者业务义务不写成已部署事实。D3旧时序不复制，按实际process先连后spawn、原始ready后内部mux_ready细化。AGENTS.md不改，因其已要求遵守D3，而D3本身明确要求新建此设计；不增加新的agent指令或多处权威声明。仅两份Markdown变更，复用PR8–12仍有效的运行证据。","createdAt":"2026-11-01T05:20:52Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6553861442","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhrx9PQ","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED — owner=pepgent-eng-rt。接手现有 issue-13-mux-design worktree 的两份文档，完整核对当前 main 实现、D3/D8-09 与 README 分工，沿用 issue 允许的既有真实 runtime 证据；只在出现实质行为变动或验收缺口时新增运行。核对后提交非 draft PR，Fixes #13，合并 main。","createdAt":"2026-11-01T09:21:02Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555467069","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhr5TOg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"DONE — owner=pepgent-eng-rt。[PR #14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 已合并（5affef9）。新增 design/mux.md，README 收敛为操作指南；接手时以 main 实现核对并修正 dial 拒绝原因集合、child 环境传递、files 响应形状、未声明 agent 的 files 404、FIFO 预算方向。验收 3 链接检查在合并前提交上输出 []、exit 0；代码无变化，沿用 PR8–12 运行证据。","createdAt":"2026-11-01T09:33:49Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555587386","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhtKWHw","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话  期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。","createdAt":"2026-11-01T10:47:44Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556915231","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhtKkEA","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话 `01a195a6` 期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。","createdAt":"2026-11-01T10:48:05Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556918800","viewerDidAuthor":true}],"number":13,"state":"OPEN","stateReason":"REOPENED","title":"补齐已实现的 Mux 架构与协议设计","url":"https://github.com/Pepgent/omp-rpc-mux/issues/13"}', 'details': {'totalLines': 1, 'rowPrefixes': False, 'displayContent': {'text': '{"body":"## 目标\\n\\n为 Lab、Soroi writer/reader 与 remote dial 的实现者提供本仓库已实现的架构、角色、帧和生命周期说明，新增 `design/mux.md`，并将 README 收敛为构建、启动与部署操作指南。文档只描述 Mux 能力，不把消费者集成或整个 Pepgent 流程视为已完成。\\n\\n## 上下文\\n\\n- **Repo**: `Pepgent/omp-rpc-mux`。\\n- **Design source**: [D3 定稿](https://github.com/Pepgent/PM/issues/3) 及其 [决策正文](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D3-network-mux.md)，[D8-09 的 TUI 根会话补充条款](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L80)；[Soroi 对应边界](https://github.com/Pepgent/soroi/blob/main/design/subagent.md#L16-L24)。\\n- **Implementation baseline**: `40a1a9cb203af01922533287bb3a134cff2a125b`，已合并的 [reader](https://github.com/Pepgent/omp-rpc-mux/pull/8)、[presence](https://github.com/Pepgent/omp-rpc-mux/pull/9)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/pull/10)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/pull/11)、[files](https://github.com/Pepgent/omp-rpc-mux/pull/12) 均有真实运行证据。\\n- **Anchors**: 当前 README 同时承载操作说明和全部协议细节；仓库没有 `design/`。精确行为由 `src/protocol.rs`、`src/protocol/files.rs`、`src/dial.rs` 与 `src/serve/` 实现。\\n\\n## 问题\\n\\nD3 的通过后文档义务要求新建本仓库的 `design/mux.md`，覆盖 D3-02 至 D3-08、D3-13、D3-15、D3-19 及接口和主路径。功能已经落地，但这些契约仍散在 README 和实现 PR 中，消费者容易把历史设计草图、当前内层协议与下游集成状态混为一谈。\\n\\n现有 D3 时序草图还不能直接复制：当前 dial 先完成 process 连接再启动 child；内部 `mux_ready{maxFrameBytes}`、response 全量广播、TUI 根例外和文件能力拒绝边界都已有明确结论。缺少针对已实现行为的连贯设计说明是本问题的原因，而不是缺少另一套协议。\\n\\n## 责任与必要决策\\n\\n- **责任单元**: 本仓库的设计与使用文档。\\n- **受影响方**: Lab/Soroi 的 writer、reader、控制端点与文件客户端，以及 remote 的 dial 启动方；不要求同步改代码。\\n- **决策**: `design/mux.md` 描述架构、对象归属、生命周期、wire/API、背压与错误；README 保留 CLI/env、凭据注入、TLS/mesh、Compose 和发行操作。迁移协议内容，不在两处保留重复的帧/生命周期表，不另写历史对照或声明多处“权威入口”。\\n- **实现忠实度**: 采用当前代码已经兑现的 D3 契约。消费者约定（如 `eval:<session>`、`writers(runId)`、IRC 待投递表）明确标明由消费者拥有；Mux 不据此解释业务 body。旧草图的 `--config`、child/连接顺序和无条件“所有根会话都经 Mux”不作为当前命令或行为保留。\\n\\n## 预期结果\\n\\n- 结果1：读者能从设计文档还原 serve/dial 的边界、本机/远程同一传输、API/权限、writer 声明与 generation、reader、presence、human、endpoint 和文件请求的生命周期及故障影响范围；现有正确 README 契约没有遗漏。\\n- 结果2：设计明确三个易误用边界：原始 ready 后的内部 mux_ready 只给 serve 消费且无外部 writer ack；全部原始 stdout/response 广播而 prefix 只作关联；操作员 TUI 根自己是 writer、不经 Mux、无 generation/token/控制端点，其插件启动的子 agent 仍经 Mux，Lab 后端驱动的根则按普通 Mux writer 使用 dial。\\n- 结果3：README 可直接用于构建、凭据配置、CLI/env、启动与容器/发行操作，并正常链接设计文档；两份文档的内容分工一致，不重复协议表、不含未实现下游能力或部署现状的完成声明。\\n\\n## 范围边界\\n\\n- **不应残留**: 重复的帧/生命周期表、旧 `--config` 示例、原样复制且与实际连接顺序不同的 D3 草图、私有 response 路由的错误含义、把 TUI 根例外扩展到其子 agent 的说法。\\n- **不在范围**: Rust、配置、依赖、协议或运行行为改动；其他仓库的设计重写；Lab/Soroi/remote 业务集成、部署切换与发行；投票史、占位、状态台账和变更日志。\\n- 当前行为未变时复用上述 PR 的仍有效 runtime 证据；本纯文档变更不为凑证据重跑 build、测试或真实用户路径。若发现真正代码/设计矛盾，先明确事实和归属，不静默改代码来迎合文案。\\n\\n## 验收标准\\n\\n| # | Dimension | Check | Command | Env | Expect |\\n|---|---|---|---|---|---|\\n| 1 | function | 覆盖结果1/2：完整阅读设计与当前实现，对照 D3 必需部分、当前已定边界和 TUI 补充条款；不是字符串计数 | `cat design/mux.md src/protocol.rs src/protocol/files.rs`，并只读核对 `src/dial.rs` 与 `src/serve/` 的相关实现 | 本仓库文档分支、上述 baseline 实现 | 独立语义 review 能具体说明各对象的开始/结束、凭据/权限、raw 广播、内部 ready、TUI 例外与故障边界，无无据的业务完成声明 |\\n| 2 | integration | 覆盖结果1/3：完整阅读 README 与设计的内容分工，并核对已有正确含义的迁移 | `cat README.md design/mux.md` | 同一文档分支；D3/PM3、D8-09 和 Soroi 相关设计只读 | 原操作步骤仍完整；协议只保留一份；CLI/env/secret/平台说明与代码一致；没有遗漏或互相矛盾的指导 |\\n| 3 | integration | 覆盖结果3：本地相对 Markdown 链接目标存在 | `python3 -c \'from pathlib import Path; import re; docs=[Path(\\"README.md\\"),Path(\\"design/mux.md\\")]; missing=[(str(p),u) for p in docs for u in re.findall(r\\"\\\\]\\\\(([^)]+)\\\\)\\",p.read_text()) if not u.startswith((\\"http:\\",\\"https:\\",\\"#\\")) and not (p.parent/u.split(\\"#\\")[0]).exists()]; print(missing); assert not missing\'` | 仓库根目录 | 输出 `[]`，exit0；语义正确性仍由前两行完整阅读证明 |\\n\\n## 依赖关系\\n\\n- 关联 [D8 范围与实施依据](https://github.com/Pepgent/PM/issues/8)。本项承接已通过的设计文档义务，不修改已关闭的设计决定。\\n- Depends on: [reader](https://github.com/Pepgent/omp-rpc-mux/issues/3)、[presence](https://github.com/Pepgent/omp-rpc-mux/issues/5)、[human IRC](https://github.com/Pepgent/omp-rpc-mux/issues/4)、[endpoints](https://github.com/Pepgent/omp-rpc-mux/issues/6)、[files](https://github.com/Pepgent/omp-rpc-mux/issues/7)（均已合并且 runtime 验证完成）。\\n","comments":[{"id":"IC_kwDOVelF788AAAABhqP9Qg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED：主执行者已完整读过当前README、D3全文/PM3定稿、D8-09完整TUI补充及相关Soroi边界；steady/divergent与mentor均已核对方案。内容分工按含义迁移：CLI/env、凭据来源校验、TLS/mesh、Compose与跨平台发行操作留README；角色/API/帧、ready、生命周期、raw广播、human、presence、endpoint、文件能力、背压/故障进入design/mux.md。TUI根例外在设计前部明确并归因D8-09，消费者业务义务不写成已部署事实。D3旧时序不复制，按实际process先连后spawn、原始ready后内部mux_ready细化。AGENTS.md不改，因其已要求遵守D3，而D3本身明确要求新建此设计；不增加新的agent指令或多处权威声明。仅两份Markdown变更，复用PR8–12仍有效的运行证据。","createdAt":"2026-11-01T05:20:52Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6553861442","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhrx9PQ","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"STARTED — owner=pepgent-eng-rt。接手现有 issue-13-mux-design worktree 的两份文档，完整核对当前 main 实现、D3/D8-09 与 README 分工，沿用 issue 允许的既有真实 runtime 证据；只在出现实质行为变动或验收缺口时新增运行。核对后提交非 draft PR，Fixes #13，合并 main。","createdAt":"2026-11-01T09:21:02Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555467069","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhr5TOg","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"DONE — owner=pepgent-eng-rt。[PR #14](https://github.com/Pepgent/omp-rpc-mux/pull/14) 已合并（5affef9）。新增 design/mux.md，README 收敛为操作指南；接手时以 main 实现核对并修正 dial 拒绝原因集合、child 环境传递、files 响应形状、未声明 agent 的 files 404、FIFO 预算方向。验收 3 链接检查在合并前提交上输出 []、exit 0；代码无变化，沿用 PR8–12 运行证据。","createdAt":"2026-11-01T09:33:49Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6555587386","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhtKWHw","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话  期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。","createdAt":"2026-11-01T10:47:44Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556915231","viewerDidAuthor":true},{"id":"IC_kwDOVelF788AAAABhtKkEA","author":{"login":"RiriAgent"},"authorAssociation":"MEMBER","body":"依 [Pepgent/PM#23](https://github.com/Pepgent/PM/issues/23)（D15），会话 `01a195a6` 期间在本 issue 下的私自裁决、合并与关闭动作已作废并回退，现恢复为会话前 OPEN 状态；既有评论作为不可变历史记录保留，不作执行依据。","createdAt":"2026-11-01T10:48:05Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556918800","viewerDidAuthor":true}],"number":13,"state":"OPEN","stateReason":"REOPENED","title":"补齐已实现的 Mux 架构与协议设计","url":"https://github.com/Pepgent/omp-rpc-mux/issues/13"}', 'startLine': 1, 'lineNumbers': [1]}, 'fileSize': 10545, 'raw': True, 'meta': {'source': {'type': 'internal', 'value': 'artifact://1322'}, 'pagedSource': True}, 'resolvedPath': '/Users/mouriya/.omp/agent/sessions/-Ext-code-pepgent-pepgent-soroi/2026-11-01T05-48-24-090Z_01a195a6-e09a-7070-8423-a7910184b28a/1322.bash.log'}}
```

## 最终结果与范围

- D01已执行：revert提交`43db013f685f48a9e050232db6be9b54df84ace2`通过[PR15](https://github.com/Pepgent/omp-rpc-mux/pull/15)合入main，merge=`cd11f31d4e878948a1d84778b3c488154a1233d9`。PR非draft、closingIssuesReferences为空，未关闭任何issue。
- 本地/远端main当前均为`cd11f31d4e878948a1d84778b3c488154a1233d9`，根checkout在main且clean。`git diff --exit-code 40a1a9cb203af01922533287bb3a134cff2a125b refs/heads/main --`空输出，命令成功，全部受版本控制文件内容与会话前一致；保留正常revert/merge历史而非重置SHA。
- D07已执行：[issue13](https://github.com/Pepgent/omp-rpc-mux/issues/13)为OPEN；标题/正文与执行前逐字比较相同，原3条评论逐条body相同；父PM8/空子列表保留。正确作废说明为[6556918800](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556918800)，与双核裁决6原文完全相同。
- 需披露的执行异常：[6556915231](https://github.com/Pepgent/omp-rpc-mux/issues/13#issuecomment-6556915231)因shell反引号命令替换缺失会话ID。该错误评论保留未改，随后另发正确原文；最终比对观察到新增2条评论，而不是声称只发了一条。
- D03/D04/D08继续冻结：本地/远端issue-13-mux-design仍为`e004fa191888019c00caad8de33deed113b7d38a`，未删除/强推/使用；旧worktree仍无注册，未恢复或清理；workers证据目录未触碰。
- 本步骤新建的/tmp/d15-mux-revert已在合并后移除，冻结旧树不受影响；回退分支已推送且提交已合main。
- 未运行测试/build/lint或产品runtime，未读禁止历史、未联系agent、未派subagent、未改LEDGER/其他仓；第④步独立核验仍由治理分身另派，不以本执行记录冒充独立核验。

## 2026-11-01T10:48:53.626937+00:00 — PR正文已发布且完整保存在报告命令中，清理本步骤临时输入

### 写操作前LEDGER逐项核对

| 条款 | 本次核对落实 |
|---|---|
| C1-1 | 仅撤文档合并，不改宿主或产品设计 |
| C1-2 | 仅mux独立仓，不碰Pepgent根checkout或其他仓 |
| C1-3 | 不缩范围，不写跑测试，不以hash作验证 |
| C1-4 | 不触环境或SOPS |
| C2-1 | 严格执行双核裁决6/8，不自行分类 |
| C2-2 | 双核已通过；不转嫁取证或联系agent |
| C2-3 | 不新增决定，按PM23既有表决执行 |
| C2-4 | 用户授权内容与旧稿保护，不重新表决 |
| C3-1 | 单仓锁定小切片，不再派工 |
| C3-2 | 治理委派不自计独立票 |
| C3-3 | 不作设计审查，不启动高阶席 |
| C3-4 | 仅授权回退worktree分支；不启动tern，不碰冻结分支 |
| C3-5 | 不改skill/agent/harness |
| C4-1 | 证据进revert PR及本报告；issue仅批准的重开/说明 |
| C4-2 | 中文，不发peer，不启动PTY omp |
| C4-3 | 状态取源头，记录是快照；不改LEDGER |
| C5-1 | 不读禁止旧session、不新增调查 |
| C5-2 | 本表逐项覆盖C及R，每次写操作前重新记录 |
| C5-3 | 仅D01/D07；D03/D04/D08冻结，不删旧稿载体 |
| C5-4 | 治理回退获准，工程冻结仍生效 |
| R1 | 不调查旧转向 |
| R2 | 不改设计基线 |
| R3 | 保持mux独立仓 |
| R4 | 双核已批准且不修改其定义 |
| R5 | 沿用PM23逐项通过结论 |
| R6 | 执行治理分身委派，后续归档交秘书 |
| R7 | 无新subagent或watchdog |
| R8 | 不重启tern或跨仓派工 |
| R9 | 根main不切走，回退在/tmp新树 |
| R10 | 不读01a193fd且保护U57报告 |
| R11 | 不改U80整理LEDGER |
| R12 | 不碰运行环境 |
| R13 | 仅撤会话文档merge，MUX01..08保留 |
| R14 | 不改soroi核心 |
| R15 | 不触Pepgent业务或无关前端 |
| R16 | 不跑统一A0/F |
| R17 | 不开展D9/F32 |
| R18 | 工程冻结保持 |
| R19 | D15已通过并获双核预审 |
| R20 | 只执行获准D01/D07并交命令输出 |
| R21 | 不宣告阶段B或恢复工程授权 |

工作目录：`/tmp`

```sh
delete /tmp/d15-mux-revert-pr.md (默认trash)
```

### (R) 清理本步骤临时PR正文

```text
delete (trash): all 1 done
ok     /tmp/d15-mux-revert-pr.md: moved to /Users/mouriya/.Trash/d15-mux-revert-pr.md
```
