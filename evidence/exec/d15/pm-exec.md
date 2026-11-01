# Pepgent/PM：D15-10③ 执行证据

依据：[PM#23](https://github.com/Pepgent/PM/issues/23)、pm.md、执行契约③、双核裁决1/9。eedda7d已解冻。PM执行者唯一负责六条父边和七条决策暂停评论。

计划：逐操作LEDGER核对→/tmp隔离worktree执行10次逆序revert→逐文件内容比较→恢复3正文/移6边/发7评论→以PR合main→实际读回。决定性问题：指定撤销对象是否恢复会话前内容且保护段未动？用文本内容与实际API终态证明，不用hash校验。范围外：业务工程、设计重做、其它仓修改、环境/测试、台账。无代理派发/联系，无log/reflog/timeline读取。

已重新读取现行LEDGER和双核批准。main较盘点前进至87b0ceb，新增两份预审归档及leadership-30m-audit.md一并保护。当前账号GET/user为RiriAgent；main/跟踪/远端均87b0ceb，tracked差异为空，open PR为空。两次eval桥调用被delete-guard整体拒绝（动态命令不被接受），均未执行；改用逐条字面命令。

## 逐操作写前核对及(R)

### 写前核对 01：开始执行：准备/tmp载体

2026-11-01T11:16:40.890212+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

### 写前核对 02：创建revert PR隔离分支/worktree；根main不切换

2026-11-01T11:16:40.898635+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
git worktree add -b d15-revert-pm /tmp/d15-pm-execution/worktree origin/main
```

```json
{
  "text": "Preparing worktree (new branch 'd15-revert-pm')\nHEAD is now at 87b0ceb docs(argon): add W1-W10 30-minute leadership activity audit\nwarning: worktree clone fell back to plain checkout: git worktree add: APFS clonefile unsupported on this volume (Cross-device link (os error 18)); /Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence -> /tmp/d15-pm-execution/worktree/evidence\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 347.8014580011368
  }
}
```

### 写前核对 03：R01：revert eedda7d，双核已解冻LAB04归档

2026-11-01T11:17:00.196314+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit eedda7d
```

```json
{
  "text": "[d15-revert-pm f254d2b] Revert \"evidence(LAB-04): root session lifecycle runtime drivers and outputs\"\n Date: Sun Nov 1 20:17:00 2026 +0900\n 23 files changed, 8360 deletions(-)\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/boundary.jsonl\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/evidence.json\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/stdout.log\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/boundary.jsonl\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/evidence.json\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/stdout.log\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/auth-lazy-driver.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/concurrent-first-driver.mjs\n delete mode 100755 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-failure-fixture.mjs\n delete mode 100755 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-fixture.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/failure-driver.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-failure-fixture.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-fixture.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-failure-fixture.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-persistence-fixture.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-step-fixture.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/persistence-driver.mjs\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/boundary.jsonl\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/evidence.json\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/stdout.log\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/boundary.jsonl\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/evidence.json\n delete mode 100644 evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/stdout.log\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 505.681292001158
  }
}
```

### 写前核对 04：R02：revert 3beaff4，仅D6/D7回写

2026-11-01T11:17:00.711837+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit 3beaff4
```

```json
{
  "text": "[d15-revert-pm d1d4b4e] Revert \"docs: apply D11-C event carriers and derived markers\"\n Date: Sun Nov 1 20:17:00 2026 +0900\n 2 files changed, 10 insertions(+), 11 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 78.03749999776483
  }
}
```

### 写前核对 05：R03：revert b61be5a，D8行锚回写

2026-11-01T11:17:00.799334+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit b61be5a
```

```json
{
  "text": "[d15-revert-pm 22392e6] Revert \"evidence: refresh D8 references to D4 line anchors and decision IDs\"\n Date: Sun Nov 1 20:17:00 2026 +0900\n 1 file changed, 15 insertions(+), 15 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 64.28725000098348
  }
}
```

### 写前核对 06：R04：revert 6d2da5a，D8回写

2026-11-01T11:17:00.872727+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit 6d2da5a
```

```json
{
  "text": "[d15-revert-pm 7552572] Revert \"docs: write back D11-B reminder and OCI acceptance scope\"\n Date: Sun Nov 1 20:17:00 2026 +0900\n 1 file changed, 13 insertions(+), 13 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 63.263374999165535
  }
}
```

### 写前核对 07：R05：revert 262cab4；D10原档案保留，仅撤D12后加句

2026-11-01T11:17:00.944850+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit 262cab4
```

```json
{
  "text": "[d15-revert-pm 92d2b6b] Revert \"docs: back-write D12 Lab wire contract into D8 and D10\"\n Date: Sun Nov 1 20:17:01 2026 +0900\n 2 files changed, 12 insertions(+), 13 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 62.524583000689745
  }
}
```

### 写前核对 08：R06：revert 589aa0c；D11A原档案保留，仅撤后改行锚

2026-11-01T11:17:01.015220+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit 589aa0c
```

```json
{
  "text": "[d15-revert-pm 04541e1] Revert \"docs: write back D11-B remote and reminder contracts\"\n Date: Sun Nov 1 20:17:01 2026 +0900\n 3 files changed, 8 insertions(+), 7 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 64.8230000026524
  }
}
```

### 写前核对 09：R07：revert ec07387，D5/D7回写

2026-11-01T11:17:01.088954+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit ec07387
```

```json
{
  "text": "[d15-revert-pm 2c88d83] Revert \"docs: back-write D12 Lab wire contract into D5 and D7\"\n Date: Sun Nov 1 20:17:01 2026 +0900\n 2 files changed, 119 insertions(+), 58 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 62.562708001583815
  }
}
```

### 写前核对 10：R08：revert 4e1eb44，D6草图回写后续修改

2026-11-01T11:17:01.161411+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit 4e1eb44
```

```json
{
  "text": "[d15-revert-pm f5ca87c] Revert \"docs: keep store sketch within approved wire details\"\n Date: Sun Nov 1 20:17:01 2026 +0900\n 1 file changed, 5 insertions(+), 3 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 62.31708299741149
  }
}
```

### 写前核对 11：R09：revert b336254，D2–D8回写

2026-11-01T11:17:01.233115+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit b336254
```

```json
{
  "text": "[d15-revert-pm 9c92982] Revert \"docs: write back approved D10 and D11-A decisions\"\n Date: Sun Nov 1 20:17:01 2026 +0900\n 7 files changed, 78 insertions(+), 115 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 69.01966599747539
  }
}
```

### 写前核对 12：R10：revert cd5bff0，最后撤D8两正文的阶段重写

2026-11-01T11:17:01.311190+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git revert --no-edit cd5bff0
```

```json
{
  "text": "[d15-revert-pm b3456ca] Revert \"docs: align D8 with unified e2e gating\"\n Date: Sun Nov 1 20:17:01 2026 +0900\n 2 files changed, 293 insertions(+), 283 deletions(-)\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 62.77641699835658
  }
}
```

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git diff --exit-code <基线/档案原提交> HEAD -- <8旧文档、D10、D11A分别比较>；git diff --exit-code 87b0ceb HEAD -- <排除批准33文件的全部其它路径>；git ls-tree -r --name-only HEAD -- evidence/e2e/20261101T1000Z-lab04-sessions （完整实际命令见本工具调用）
```

```json
{
  "text": "(no output)",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 209.289416000247
  }
}
```

内容观察：上述diff均退出0且无输出：8旧文档分别等于36f8489；D10等于91dd67e原档案；D11A等于cb47daa原档案；除此10文档和23个LAB04文件之外，87b0ceb中全部保护文件未变。LAB04路径ls-tree为空，23新文件已从candidate树撤除。非hash校验。

(R) 大JSON在tool.bash显示层被截断导致解析失败（artifact1517），未产生写操作；改以字面命令`gh api repos/Pepgent/PM/issues?state=all&per_page=100`直接捕获stdout到内存，exit0、JSON成功解析。保护issue正文/状态/标签精确副本已取回：[23, 22, 21, 20, 19, 18, 17, 16, 8]。只用于本次结束逐字比较，不落仓库。

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api repos/Pepgent/PM/issues/8/sub_issues --jq "[.[]|{number,id,repository_url}]" && gh api repos/Pepgent/PM/issues/21/sub_issues --jq "[.[]|{number,id,repository_url}]"
```

```json
{
  "text": "[{\"id\":6141547927,\"number\":3,\"repository_url\":\"https://api.github.com/repos/Pepgent/omp-rpc-mux\"},{\"id\":6143574408,\"number\":13,\"repository_url\":\"https://api.github.com/repos/Pepgent/omp-rpc-mux\"},{\"id\":6144501354,\"number\":9,\"repository_url\":\"https://api.github.com/repos/Pepgent/images\"}]\n[{\"id\":6144754129,\"number\":276,\"repository_url\":\"https://api.github.com/repos/Pepgent/soroi\"},{\"id\":6144754867,\"number\":277,\"repository_url\":\"https://api.github.com/repos/Pepgent/soroi\"},{\"id\":6144755477,\"number\":14,\"repository_url\":\"https://api.github.com/repos/Pepgent/remote\"},{\"id\":6144756105,\"number\":10,\"repository_url\":\"https://api.github.com/repos/Pepgent/images\"},{\"id\":6144756767,\"number\":13,\"repository_url\":\"https://api.github.com/repos/Pepgent/deploy\"}]\n\n\nWall time: 1.21 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1214.7069999985397
  }
}
```

### 写前核对 13：准备3份原样正文body-file及暂停评论body-file

2026-11-01T11:18:49.642661+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) /tmp/d15-pm-execution/中3个PM-N-original.md逐字来自prepublish/PM-N.json的body，pause.md为授权固定一句。

### 写前核对 14：恢复PM13正文，只写body

2026-11-01T11:18:49.657573+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue edit 13 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/PM-13-original.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/13\n\n\nWall time: 1.50 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1504.4743750020862
  }
}
```

### 写前核对 15：恢复PM14正文，只写body

2026-11-01T11:18:51.170872+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue edit 14 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/PM-14-original.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/14\n\n\nWall time: 1.24 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1244.6258330009878
  }
}
```

### 写前核对 16：恢复PM15正文，只写body

2026-11-01T11:18:52.431417+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue edit 15 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/PM-15-original.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/15\n\n\nWall time: 1.46 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1457.9085419997573
  }
}
```

### 写前核对 17：移除PM8→images9，仅子边ID6144501354，保留两条mux旧边

2026-11-01T11:19:14.653810+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api --method DELETE repos/Pepgent/PM/issues/8/sub_issue -F sub_issue_id=6144501354 --jq "{number,sub_issues_summary}"
```

```json
{
  "text": "{\"number\":8,\"sub_issues_summary\":{\"completed\":2,\"percent_completed\":66,\"total\":3}}\n\n\nWall time: 1.07 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1065.393624998629
  }
}
```

### 写前核对 18：移除PM21→soroi276，唯一PM父边执行者

2026-11-01T11:19:15.732541+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api --method DELETE repos/Pepgent/PM/issues/21/sub_issue -F sub_issue_id=6144754129 --jq "{number,sub_issues_summary}"
```

```json
{
  "text": "{\"number\":21,\"sub_issues_summary\":{\"completed\":3,\"percent_completed\":60,\"total\":5}}\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 937.1767500005662
  }
}
```

### 写前核对 19：移除PM21→soroi277

2026-11-01T11:19:16.686758+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api --method DELETE repos/Pepgent/PM/issues/21/sub_issue -F sub_issue_id=6144754867 --jq "{number,sub_issues_summary}"
```

```json
{
  "text": "{\"number\":21,\"sub_issues_summary\":{\"completed\":3,\"percent_completed\":60,\"total\":5}}\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 877.6602079980075
  }
}
```

### 写前核对 20：移除PM21→remote14

2026-11-01T11:19:17.586148+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api --method DELETE repos/Pepgent/PM/issues/21/sub_issue -F sub_issue_id=6144755477 --jq "{number,sub_issues_summary}"
```

```json
{
  "text": "{\"number\":21,\"sub_issues_summary\":{\"completed\":3,\"percent_completed\":60,\"total\":5}}\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 807.4055830016732
  }
}
```

### 写前核对 21：移除PM21→images10

2026-11-01T11:19:18.408176+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api --method DELETE repos/Pepgent/PM/issues/21/sub_issue -F sub_issue_id=6144756105 --jq "{number,sub_issues_summary}"
```

```json
{
  "text": "{\"number\":21,\"sub_issues_summary\":{\"completed\":2,\"percent_completed\":100,\"total\":2}}\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 856.9465410001576
  }
}
```

### 写前核对 22：移除PM21→deploy13

2026-11-01T11:19:19.278795+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh api --method DELETE repos/Pepgent/PM/issues/21/sub_issue -F sub_issue_id=6144756767 --jq "{number,sub_issues_summary}"
```

```json
{
  "text": "{\"number\":21,\"sub_issues_summary\":{\"completed\":0,\"percent_completed\":0,\"total\":0}}\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 859.9053329974413
  }
}
```

### 写前核对 23：PM16新发授权暂停说明，不编辑旧评论

2026-11-01T11:19:20.159871+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 16 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/16#issuecomment-6557232372\n\n\nWall time: 1.14 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1136.1097500026226
  }
}
```

### 写前核对 24：PM17新发授权暂停说明

2026-11-01T11:19:21.321912+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 17 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/17#issuecomment-6557232643\n\n\nWall time: 1.83 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1829.0258750021458
  }
}
```

### 写前核对 25：PM18新发授权暂停说明

2026-11-01T11:19:23.170859+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 18 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/18#issuecomment-6557232968\n\n\nWall time: 1.84 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1842.833124998957
  }
}
```

### 写前核对 26：PM19新发授权暂停说明

2026-11-01T11:19:25.037966+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 19 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/19#issuecomment-6557233230\n\n\nWall time: 1.14 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1135.10075000301
  }
}
```

### 写前核对 27：PM20新发授权暂停说明

2026-11-01T11:19:26.190840+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 20 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/20#issuecomment-6557233483\n\n\nWall time: 1.58 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1575.9170409999788
  }
}
```

### 写前核对 28：PM21新发授权暂停说明

2026-11-01T11:19:27.784749+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 21 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/21#issuecomment-6557233711\n\n\nWall time: 1.25 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1248.2845840007067
  }
}
```

### 写前核对 29：PM22新发授权暂停说明

2026-11-01T11:19:29.055798+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh issue comment 22 --repo Pepgent/PM --body-file /tmp/d15-pm-execution/pause.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/issues/22#issuecomment-6557233979\n\n\nWall time: 1.87 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1873.4903340004385
  }
}
```

## GitHub实际读回（PR发布前）

命令：`gh api repos/Pepgent/PM/issues?state=all&per_page=100`、`gh api repos/Pepgent/PM/issues/8/sub_issues`、`gh api repos/Pepgent/PM/issues/21/sub_issues`、`gh api --paginate repos/Pepgent/PM/issues/comments?since=2026-11-01T05:48:24Z&per_page=100`，均exit0，JSON直接在内存解析。逐字比较为字符串内容比较，无hash校验。

```json
{
  "issue_bodies": [
    {
      "issue": 13,
      "body_exact": true,
      "state": "open",
      "characters": 1512
    },
    {
      "issue": 14,
      "body_exact": true,
      "state": "open",
      "characters": 1550
    },
    {
      "issue": 15,
      "body_exact": true,
      "state": "open",
      "characters": 3026
    }
  ],
  "protected_issue_fields": [
    {
      "issue": 23,
      "protected_fields_unchanged": true
    },
    {
      "issue": 22,
      "protected_fields_unchanged": true
    },
    {
      "issue": 21,
      "protected_fields_unchanged": true
    },
    {
      "issue": 20,
      "protected_fields_unchanged": true
    },
    {
      "issue": 19,
      "protected_fields_unchanged": true
    },
    {
      "issue": 18,
      "protected_fields_unchanged": true
    },
    {
      "issue": 17,
      "protected_fields_unchanged": true
    },
    {
      "issue": 16,
      "protected_fields_unchanged": true
    },
    {
      "issue": 8,
      "protected_fields_unchanged": true
    }
  ],
  "PM8_edges": [
    [
      "https://api.github.com/repos/Pepgent/omp-rpc-mux",
      3
    ],
    [
      "https://api.github.com/repos/Pepgent/omp-rpc-mux",
      13
    ]
  ],
  "PM21_edges": [],
  "new_pause_comments": [
    {
      "id": 6557232372,
      "html_url": "https://github.com/Pepgent/PM/issues/16#issuecomment-6557232372",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    },
    {
      "id": 6557232643,
      "html_url": "https://github.com/Pepgent/PM/issues/17#issuecomment-6557232643",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    },
    {
      "id": 6557232968,
      "html_url": "https://github.com/Pepgent/PM/issues/18#issuecomment-6557232968",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    },
    {
      "id": 6557233230,
      "html_url": "https://github.com/Pepgent/PM/issues/19#issuecomment-6557233230",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    },
    {
      "id": 6557233483,
      "html_url": "https://github.com/Pepgent/PM/issues/20#issuecomment-6557233483",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    },
    {
      "id": 6557233711,
      "html_url": "https://github.com/Pepgent/PM/issues/21#issuecomment-6557233711",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    },
    {
      "id": 6557233979,
      "html_url": "https://github.com/Pepgent/PM/issues/22#issuecomment-6557233979",
      "body": "效力按 D15（https://github.com/Pepgent/PM/issues/23）暂停，待常驻 Argon 与 ArgonGovernance 复核"
    }
  ],
  "original_comments_still_present": 48,
  "original_comment_timestamps_unchanged": true
}
```

前述candidate内容核对的完整实际命令（对应已记录exit0/无输出，不重跑已通过检查）：

```bash
git diff --exit-code 36f8489 HEAD -- evidence/decisions/D2-components.md evidence/decisions/D3-network-mux.md evidence/decisions/D4-remote-exec.md evidence/decisions/D5-plugins-eval.md evidence/decisions/D6-store-service.md evidence/decisions/D7-lab-backend.md evidence/decisions/D8-mvp-scope.md evidence/decisions/D8-slice-issues.md && git diff --exit-code 91dd67e HEAD -- evidence/decisions/D10-repo-delivery.md && git diff --exit-code cb47daa HEAD -- evidence/decisions/D11A-solo-ruling-review.md && git diff --exit-code 87b0ceb HEAD -- . ":(exclude)evidence/decisions/D2-components.md" ":(exclude)evidence/decisions/D3-network-mux.md" ":(exclude)evidence/decisions/D4-remote-exec.md" ":(exclude)evidence/decisions/D5-plugins-eval.md" ":(exclude)evidence/decisions/D6-store-service.md" ":(exclude)evidence/decisions/D7-lab-backend.md" ":(exclude)evidence/decisions/D8-mvp-scope.md" ":(exclude)evidence/decisions/D8-slice-issues.md" ":(exclude)evidence/decisions/D10-repo-delivery.md" ":(exclude)evidence/decisions/D11A-solo-ruling-review.md" ":(exclude)evidence/e2e/20261101T1000Z-lab04-sessions/**" && git ls-tree -r --name-only HEAD -- evidence/e2e/20261101T1000Z-lab04-sessions
```

### 写前核对 30：准备revert PR完整正文文件；明确不自动关闭PM23

2026-11-01T11:20:53.217438+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) 已生成/tmp/d15-pm-execution/pr-body.md，中文实现/四层适用性与实际内容/API证据齐全；首段关联PM23但依执行指令无closing keyword。

### 写前核对 31：普通push本次revert分支，不force、不改main历史

2026-11-01T11:20:53.232649+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
git push -u origin d15-revert-pm
```

```json
{
  "text": "remote: \nremote: Create a pull request for 'd15-revert-pm' on GitHub by visiting:        \nremote:      https://github.com/Pepgent/PM/pull/new/d15-revert-pm        \nremote: \nTo https://github.com/Pepgent/PM.git\n * [new branch]      d15-revert-pm -> d15-revert-pm\nbranch 'd15-revert-pm' set up to track 'origin/d15-revert-pm'.\n\n\nWall time: 2.02 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 2015.6112499982119
  }
}
```

### 写前核对 32：创建非draft revert PR；不自动关闭PM23

2026-11-01T11:20:55.265616+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/tmp/d15-pm-execution/worktree`

```bash
gh pr create --repo Pepgent/PM --base main --head d15-revert-pm --title "D15：回退PM私自回写并保留治理档案" --body-file /tmp/d15-pm-execution/pr-body.md
```

```json
{
  "text": "https://github.com/Pepgent/PM/pull/24\n\n\nWall time: 2.49 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 2492.576874997467
  }
}
```

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh pr view 24 --repo Pepgent/PM --json number,url,state,isDraft,mergeable,reviewDecision,headRefOid,baseRefOid,statusCheckRollup,closingIssuesReferences && gh api --paginate repos/Pepgent/PM/pulls/24/files --jq ".[] | [.status,.filename] | @tsv"
```

```json
{
  "text": "{\"baseRefOid\":\"87b0cebfa20e42c6bef74e513c27e91851995c41\",\"closingIssuesReferences\":[],\"headRefOid\":\"b3456ca2a52f96f5a77b9699f704fcba89aeeddd\",\"isDraft\":false,\"mergeable\":\"MERGEABLE\",\"number\":24,\"reviewDecision\":\"\",\"state\":\"OPEN\",\"statusCheckRollup\":[],\"url\":\"https://github.com/Pepgent/PM/pull/24\"}\nmodified\tevidence/decisions/D10-repo-delivery.md\nmodified\tevidence/decisions/D11A-solo-ruling-review.md\nmodified\tevidence/decisions/D2-components.md\nmodified\tevidence/decisions/D3-network-mux.md\nmodified\tevidence/decisions/D4-remote-exec.md\nmodified\tevidence/decisions/D5-plugins-eval.md\nmodified\tevidence/decisions/D6-store-service.md\nmodified\tevidence/decisions/D7-lab-backend.md\nmodified\tevidence/decisions/D8-mvp-scope.md\nmodified\tevidence/decisions/D8-slice-issues.md\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/boundary.jsonl\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/evidence.json\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/stdout.log\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/boundary.jsonl\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/evidence.json\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/stdout.log\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/auth-lazy-driver.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/concurrent-first-driver.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-failure-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/failure-driver.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-failure-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-failure-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-persistence-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-step-fixture.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/persistence-driver.mjs\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/boundary.jsonl\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/evidence.json\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/stdout.log\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/boundary.jsonl\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/evidence.json\nremoved\tevidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/stdout.log\n\n\nWall time: 1.74 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1743.4708340018988
  }
}
```

(R) `gh api repos/Pepgent/PM/pulls/24`、`gh api --paginate repos/Pepgent/PM/pulls/24/files`均exit0。PR正文与body-file逐字相等、非draft、base=main/head=d15-revert-pm；33个实际PR文件=10修改+23删除，无其它文件。已按批准契约核对身份/范围/保护内容与证据，不另行派review agent。无自动关闭关联是本次明确执行指令。

### 写前核对 33：合并PM revert PR24；保留十个revert提交，普通merge，不重写main

2026-11-01T11:21:19.056952+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh pr merge 24 --repo Pepgent/PM --merge --match-head-commit b3456ca2b05a090d19289c4fa4a8f820f8b5fd79
```

```json
{
  "text": "GraphQL: Head branch was modified. Review and try the merge again. (mergePullRequest)\n\n\nWall time: 1.81 seconds\n\nCommand exited with code 1",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1807.5909590013325,
    "exitCode": 1
  },
  "hasError": true
}
```

失败及纠正：首次merge命令的--match-head-commit完整地址录入错误（不是源头返回的head），GitHub保护性拒绝`Head branch was modified`，exit1；该请求未合并或修改main。用当前PR字段重新取回完整head后仅重试合并，不重跑已通过的内容/API检查。

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh pr view 24 --repo Pepgent/PM --json state,headRefOid,baseRefOid,mergeable,isDraft,closingIssuesReferences
```

```json
{
  "text": "{\"baseRefOid\":\"87b0cebfa20e42c6bef74e513c27e91851995c41\",\"closingIssuesReferences\":[],\"headRefOid\":\"b3456ca2a52f96f5a77b9699f704fcba89aeeddd\",\"isDraft\":false,\"mergeable\":\"MERGEABLE\",\"state\":\"OPEN\"}\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 577.0420830026269
  }
}
```

### 写前核对 34：按当前PR真实head重新合并PR24；纠正上次完整地址录入错误

2026-11-01T11:21:35.978010+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh pr merge 24 --repo Pepgent/PM --merge --match-head-commit b3456ca2a52f96f5a77b9699f704fcba89aeeddd
```

```json
{
  "text": "(no output)\n\nWall time: 2.98 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 2981.1879170015454
  }
}
```

### 写前核对 35：普通拉取已合并main到PM根checkout；只ff-only，不reset/force

2026-11-01T11:21:38.980068+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
git pull --ff-only origin main
```

```json
{
  "text": "ok 33 files +515 -8840\n[raw output: artifact://1552]\n\n\nWall time: 1.09 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1085.0683329999447
  }
}
```

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
gh pr view 24 --repo Pepgent/PM --json number,url,state,mergedAt,mergeCommit,headRefOid,baseRefOid,closingIssuesReferences && git rev-parse HEAD refs/heads/main refs/remotes/origin/main && git ls-remote origin refs/heads/main && git symbolic-ref --short HEAD && git diff --exit-code d15-revert-pm main && git diff --name-status && git diff --cached --name-status
```

```json
{
  "text": "{\"baseRefOid\":\"87b0cebfa20e42c6bef74e513c27e91851995c41\",\"closingIssuesReferences\":[],\"headRefOid\":\"b3456ca2a52f96f5a77b9699f704fcba89aeeddd\",\"mergeCommit\":{\"oid\":\"00866df14a3d629580ac8900b90fb418ee09c10b\"},\"mergedAt\":\"2026-11-01T11:21:37Z\",\"number\":24,\"state\":\"MERGED\",\"url\":\"https://github.com/Pepgent/PM/pull/24\"}\n00866df14a3d629580ac8900b90fb418ee09c10b\n00866df14a3d629580ac8900b90fb418ee09c10b\n00866df14a3d629580ac8900b90fb418ee09c10b\n00866df14a3d629580ac8900b90fb418ee09c10b\trefs/heads/main\nmain\n\n\nWall time: 1.51 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1512.9498750008643
  }
}
```

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
git diff --exit-code 36f8489 main -- evidence/decisions/D2-components.md evidence/decisions/D3-network-mux.md evidence/decisions/D4-remote-exec.md evidence/decisions/D5-plugins-eval.md evidence/decisions/D6-store-service.md evidence/decisions/D7-lab-backend.md evidence/decisions/D8-mvp-scope.md evidence/decisions/D8-slice-issues.md && git diff --exit-code 91dd67e main -- evidence/decisions/D10-repo-delivery.md && git diff --exit-code cb47daa main -- evidence/decisions/D11A-solo-ruling-review.md && git diff --exit-code 87b0ceb main -- . ":(exclude)evidence/decisions/D2-components.md" ":(exclude)evidence/decisions/D3-network-mux.md" ":(exclude)evidence/decisions/D4-remote-exec.md" ":(exclude)evidence/decisions/D5-plugins-eval.md" ":(exclude)evidence/decisions/D6-store-service.md" ":(exclude)evidence/decisions/D7-lab-backend.md" ":(exclude)evidence/decisions/D8-mvp-scope.md" ":(exclude)evidence/decisions/D8-slice-issues.md" ":(exclude)evidence/decisions/D10-repo-delivery.md" ":(exclude)evidence/decisions/D11A-solo-ruling-review.md" ":(exclude)evidence/e2e/20261101T1000Z-lab04-sessions/**" && git ls-tree -r --name-only main -- evidence/e2e/20261101T1000Z-lab04-sessions
```

```json
{
  "text": "(no output)",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 190.58741699904203
  }
}
```

### 写前核对 36：移除本次新建/tmp执行worktree；只清理本执行者载体

2026-11-01T11:22:21.004394+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
git worktree remove /tmp/d15-pm-execution/worktree
```

```json
{
  "text": "(no output)",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 172.0628339983523
  }
}
```

### 写前核对 37：删除已合并的本次执行本地分支；不动main/历史

2026-11-01T11:22:21.186652+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
git branch -d d15-revert-pm
```

```json
{
  "text": "Deleted branch d15-revert-pm (was b3456ca).\n",
  "details": {
    "wallTimeNoticeEmitted": false,
    "timeoutSeconds": 60,
    "wallTimeMs": 46.591083001345396
  }
}
```

### 写前核对 38：删除已合并的本次执行远端分支；不涉及会话前分支

2026-11-01T11:22:21.243225+00:00，重新读取当前LEDGER全文，逐项核对：

|条款|本操作核对|
|---|---|
|C1-1|通过：不改产品/宿主，不从历史提取设计。|
|C1-2|通过：仅PM，不碰Pepgent根checkout/无关会话。|
|C1-3|通过：不收缩，不开发/写跑测试/跨组件e2e，不用hash校验。|
|C1-4|通过：不操作环境/生产/SOPS。|
|C2-1|通过：只执行双核批准，不自行解释分类。|
|C2-2|通过：自己执行，不转嫁双核。|
|C2-3|通过：原档案/票保留且效力暂停，不新投票。|
|C2-4|通过：用户/argon产物保护。|
|C3-1|通过：单仓明确任务，不另派代理。|
|C3-2|通过：受治理分身委派，不自认独立席。|
|C3-3|通过：不替high/双核复核。|
|C3-4|通过：单仓隔离worktree，根main，不启tern。|
|C3-5|通过：不改skill/agent/harness。|
|C4-1|通过：证据在PR/授权评论，不私聊。|
|C4-2|通过：中文，不联系agent，不PTY起omp。|
|C4-3|通过：Git/GitHub当前对象为源头。|
|C5-1|通过：不读禁会话/未授权历史，不导师前审。|
|C5-2|通过：本操作前逐项核对并记录。|
|C5-3|通过：只撤批准对象，保护遗产/原票。|
|C5-4|通过：只治理清理，工程冻结。|
|R1|通过：保护旧调查/基线。|
|R2|通过：只撤PM回写，不重设计。|
|R3|通过：不建迁仓/选owner。|
|R4|通过：保护双核规范/基线。|
|R5|通过：PM23已通过，PR不关闭它。|
|R6|通过：仅本分片，台账留秘书。|
|R7|通过：不启监督进程。|
|R8|通过：不恢复tern/查额度。|
|R9|通过：RiriAgent，根main，证据入PR。|
|R10|通过：保护e519e5b/30报告，不读禁session。|
|R11|通过：不改LEDGER/U80整理。|
|R12|通过：不动env/旧证据。|
|R13|通过：只PM父边，不接管其它仓。|
|R14|通过：不动soroi代码/分支。|
|R15|通过：只撤PM的LAB04归档，旧LAB10保留。|
|R16|通过：不跑统一验收。|
|R17|通过：3个D9 issue恢复快照body，范围不减。|
|R18|通过：工程保持冻结。|
|R19|通过：D15档案/票/issue保护。|
|R20|通过：执行获准逆序revert与正文/边恢复。|
|R21|通过：不恢复派工，后续独立核验另行负责。|

(R) cwd=`/Users/mouriya/Ext/code/pepgent/pepgent-pm`

```bash
git push origin --delete d15-revert-pm
```

```json
{
  "text": "To https://github.com/Pepgent/PM.git\n - [deleted]         d15-revert-pm\n\n\nWall time: 1.55 seconds",
  "details": {
    "wallTimeNoticeEmitted": true,
    "timeoutSeconds": 60,
    "wallTimeMs": 1551.2236250005662
  }
}
```

## 最终逐文件结论（已合入main，不是候选分支推断）

[回退PR24](https://github.com/Pepgent/PM/pull/24)已于2026-11-01T11:21:37Z合并；merge=`00866df14a3d629580ac8900b90fb418ee09c10b`。根checkout、本地main、origin/main跟踪及直接ls-remote远端main均为该对象；当前符号分支main，tracked未暂存/暂存差异均为空。对合并后main重新执行完整内容比较，exit0且无输出；candidate与main的树内容比较也无差异。

|被撤影响文件|合并后内容结论|实际比较源|
|---|---|---|
|`evidence/decisions/D2-components.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D3-network-mux.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D4-remote-exec.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D5-plugins-eval.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D6-store-service.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D7-lab-backend.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D8-mvp-scope.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D8-slice-issues.md`|已逐字回到会话前内容|`git diff --exit-code 36f8489 main -- <该路径>`包含于完整成功命令|
|`evidence/decisions/D10-repo-delivery.md`|原始档案保留，后加D12消费句已撤|`git diff --exit-code 91dd67e main -- <该路径>`无输出|
|`evidence/decisions/D11A-solo-ruling-review.md`|原始档案保留，后改行锚已撤|`git diff --exit-code cb47daa main -- <该路径>`无输出|

下列23文件均为eedda7d本会话新增；回退后main对象树该LAB04前缀为空，恢复为会话前不存在。文件逐名来自PR实际files字段，合并后main与已核对candidate内容相同：

|文件|合并后状态|
|---|---|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/boundary.jsonl`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/evidence.json`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/auth-lazy/stdout.log`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/boundary.jsonl`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/evidence.json`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/concurrent-first/stdout.log`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/auth-lazy-driver.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/concurrent-first-driver.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-failure-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/dial-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/failure-driver.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-failure-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/mux-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-failure-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-persistence-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/omp-step-fixture.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/drivers/persistence-driver.mjs`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/boundary.jsonl`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/evidence.json`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/failure/stdout.log`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/boundary.jsonl`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/evidence.json`|会话前不存在；现已撤除|
|`evidence/e2e/20261101T1000Z-lab04-sessions/LAB-04/persistence/stdout.log`|会话前不存在；现已撤除|

### 保护提交与文件

|保留提交|实际保护结论|
|---|---|
|[`e519e5b`](https://github.com/Pepgent/PM/commit/e519e5b)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`91dd67e`](https://github.com/Pepgent/PM/commit/91dd67e)|档案原文分别对91dd67e/cb47daa比较成功；仅撤后来回写，不撤原归档提交|
|[`cb47daa`](https://github.com/Pepgent/PM/commit/cb47daa)|档案原文分别对91dd67e/cb47daa比较成功；仅撤后来回写，不撤原归档提交|
|[`95bb071`](https://github.com/Pepgent/PM/commit/95bb071)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`904017b`](https://github.com/Pepgent/PM/commit/904017b)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`6001098`](https://github.com/Pepgent/PM/commit/6001098)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`d43f047`](https://github.com/Pepgent/PM/commit/d43f047)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`95bd75a`](https://github.com/Pepgent/PM/commit/95bd75a)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`37e6c73`](https://github.com/Pepgent/PM/commit/37e6c73)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`f88748d`](https://github.com/Pepgent/PM/commit/f88748d)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`dc7893c`](https://github.com/Pepgent/PM/commit/dc7893c)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`d56a08c`](https://github.com/Pepgent/PM/commit/d56a08c)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`42dc973`](https://github.com/Pepgent/PM/commit/42dc973)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`1a344ef`](https://github.com/Pepgent/PM/commit/1a344ef)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`760c419`](https://github.com/Pepgent/PM/commit/760c419)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`3618e3c`](https://github.com/Pepgent/PM/commit/3618e3c)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|
|[`0909dbf`](https://github.com/Pepgent/PM/commit/0909dbf)|未成为revert目标；全部相关受保护文件在87b0ceb→main的非批准路径内容比较中未动|

另外，本步开始前新增的`evidence/argon/D15-10-prereview-argon.md`、`D15-10-prereview-argon-governance.md`、`leadership-30m-audit.md`全部未动；旧env、LAB10、30调查报告、其它原票/基线亦属于非目标路径内容比较的保护范围。未使用摘要/hash比较代替文本差异。main历史通过普通merge新增十次revert及merge，没有reset/rebase/force。

### issue/图/评论终态

- [PM13](https://github.com/Pepgent/PM/issues/13)、[PM14](https://github.com/Pepgent/PM/issues/14)、[PM15](https://github.com/Pepgent/PM/issues/15)：真实GET.body分别与prepublish JSON.body逐字符相等，1512/1550/3026字符，均OPEN。正文恢复后未再次写这些对象。
- 六条批准的PM父边已移除，PM8真实GET仅旧mux3/mux13，PM21真实GET为空。未改旧边、未代其它仓关闭子issue，Project未手动修改。
- 七条暂停评论的URL、内容及所属issue已逐条真实读回。PM8及PM16–23的保护字段（原body/title/state/state_reason/labels）与执行开始快照逐项相等；原48评论仍在、created_at与updated_at相等。
- PR closingIssuesReferences为空，符合本次“不用revert PR关闭PM23”的明确指令。

### 收尾与责任边界

本次新增的/tmp worktree已通过git worktree remove移除，本地与远端d15-revert-pm执行分支均在合并后删除，根checkout一直留main。/tmp下仅留本次body-file载体用于复现；没有留下未提交实现。

PM执行范围：10/10逆序revert经PR合main、3/3正文恢复、6/6新增边移除、7/7暂停说明发布；当前本仓BLOCKED=0。没有启动任何业务服务、测试或工程进程。以上是第③步执行者的实际结果核对，不替代第④步不同执行者的独立核验；不宣布其它仓R20或R21完成，不更新LEDGER。
