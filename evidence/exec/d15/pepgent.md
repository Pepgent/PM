# Pepgent/Pepgent — D15-10② 只读预审盘点

## LEDGER `4455170` 逐项核对

本文件是执行契约允许写入的唯一产出；只执行第②步，不执行回退。

| 条款 | 本步核对 |
|---|---|
| C1-1 | 不改 omp/soroi，不从旧历史设计功能。 |
| C1-2 | 仅 Pepgent/Pepgent；根 checkout 不访问、不联系无关会话；对象在 `/tmp/d15-pepgent-b978` 新克隆读取，既有 worktree 仅只读状态。 |
| C1-3 | 不写代码、不编写或运行测试、不缩最终验收；SHA 仅定位对象，非 hash 验证。 |
| C1-4 | 不接触生产、OrbStack 或 SOPS。 |
| C2-1 | 不自定回退政策；有重叠/来源缺失标冻结 BLOCKED，交双核预审。 |
| C2-2 | 不把取证交给 argon；本执行者独立产出三表供双核预审。 |
| C2-3 | 本步不投票、不另做设计决策。 |
| C2-4 | 执行已通过 D15 与用户保护红线，不改直接授权产物。 |
| C3-1 | 本任务是锁定契约的一仓只读盘点。 |
| C3-2 | 本执行者不自称独立治理投票席。 |
| C3-3 | 不参与设计，不越权启动新审查流程。 |
| C3-4 | 一仓一执行者；不启动 tern，不改任何分支或 worktree。 |
| C3-5 | 不改 skill/角色定义。 |
| C4-1 | 不修改 issue/PR，不发评论；产出通过任务返回，由派发者送预审。 |
| C4-2 | 中文；不联系 agent/会话，不在 PTY 启动 omp。 |
| C4-3 | 当前状态读 git/gh；local 仅预审草稿，不改台账、无额外变更记录。 |
| C5-1 | 只读授权的 01a195a6 及其子记录，不读 01a193fd；不联系导师或其他 agent。 |
| C5-2 | 本表逐项对照 C1–C5、R1–R21。 |
| C5-3 | 区分会话产物与会话前遗产、无关 15 提交；按内容段保护。 |
| C5-4 | 工程冻结持续；只推进本步治理盘点，不启动工程。 |
| R1 | 不重开设计转向调查。 |
| R2 | 不改 design 或 D10–D14 回写。 |
| R3 | 不改多仓边界或建新仓。 |
| R4 | 双核产物保护；不代双核取证。 |
| R5 | 不替代已通过表决；只提交预审草稿。 |
| R6 | 本任务由治理分身派发；本执行者不改秘书职责。 |
| R7 | 不派其他 agent；不改监督定义。 |
| R8 | 不恢复 tern、不联系无关会话。 |
| R9 | 不改分支、PR 或异步总线对象。 |
| R10 | 不读旧会话；保护 U57 报告。 |
| R11 | 保护 U80 整理与后续修正。 |
| R12 | 不动隔离测试环境。 |
| R13 | 不操作其他组件仓。 |
| R14 | 不改 soroi 核心。 |
| R15 | 精确盘点 PR39/40、相关 issue/分支/worktree；本步不回退。 |
| R16 | 不跑统一 e2e，不改变其范围。 |
| R17 | 不提前做 D9/F32。 |
| R18 | 维持工程冻结；不把只读盘点称工程完成。 |
| R19 | 以已通过 D15（PM#23）与归档契约为依据。 |
| R20 | 本文件仅第②步；第③步需预审后另派；保护名单不得动。 |
| R21 | 不恢复派工、不代替双核合法性复核。 |

## 取证计划与边界

决定性问题：当前 Pepgent 对象减去 05:48:24Z 会话前状态及 D15-01 保护内容后，哪些动作已具备合法来源，哪些须冻结？先读契约、D15、LEDGER、INDEX，再取 gh 当前对象、/tmp 新克隆的点名 commit 与差集、既有 worktree 的只读状态，最后以三表与完整命令输出交预审。最便宜的决定性观察是 PR39/40 的实际文件集与 15 个保护提交点名父子 SHA 的 `git diff --name-only` 交集，以及会话 push/创建记录与 prepublish 正文。不会运行 git log/reflog、遍历提交历史、读取 GitHub 编辑历史或 timeline；不触碰根 checkout，不执行任何回退动作。

未观察到的会话前状态不推断成空；缺失来源或归因即冻结 BLOCKED。`.workers` 工程师会话来源单独标注，是否纳入 D15-02(a) 由双核裁决。本任务没有 `task` 工具，且契约禁止联系 agent，未启动导师咨询。

## 本步结论与计数

- 三张对象表：**会话前状态50条；差集48条；保护段落48条**（均不计表头，不把一行内的多个受保护内容段展开计数）。
- 差集表中 **冻结 BLOCKED 14条**：远端main精确起点1条、两次revert2条、Bridge分支及其worktree2条、其他9个无法重建会话前ref的对象9条。
- **PR39与PR40均不能进入第③步直接revert**：两者与15个保护提交中的merge确有同文件交集。`a331057`相对第1父对PR39/40分别重叠12/5个文件；`031d01c`相对第1父重叠19/6个；相对第2父对PR39还各重叠notices与package-lock两个文件。即便剔除“导入main”的大部分文件，仍不能声称无重叠。D15-03要求有重叠即冻结，不在本步自行按hunk拆分或豁免merge。
- 本步未执行revert、改issue正文/状态、移边、删/恢复分支、删除worktree、提交、push或评论。唯一写入是本产出与获准的`/tmp/d15-pepgent-b978`新克隆（含获取点名孤立对象的fetch）。没有访问原Pepgent根checkout；旧worktree只取只读status、HEAD、stat。
- `.workers`补充记录可将分支“新建”与继承的`fc89bcd`分离；但其是否算D15-02(a)，本报告只标来源，不行使解释权。双核若不接纳[W]来源，相关“恢复/删除/移除”行必须冻结而非照表直接执行。

## 来源与证据分层

1. **契约与决议**：`local://exec/d15/CONTRACT.md`全文；`pepgent-pm/evidence/decisions/D15-private-decision-discard.md`全文（44–51长行补读）；当前LEDGER全文及其长行；`local://inv/d15/INDEX.md`里Pepgent的3.1–3.7对象行；G3全文与G6对应目录段。LEDGER核对以执行契约点名的`4455170`为口径；本步没有用对象标识一致性当验证证据。
2. **当前对象**：RiriAgent `gh auth status`；`gh api repos/Pepgent/Pepgent/pulls/{39,40}`当前PR字段；`gh api .../issues?state=all&per_page=100`当前issue字段；21/sub_issues与41/parent当前真实图边；新克隆`git ls-remote --heads origin`与当前refs；点名对象的`git show -s`（只读取已命名对象及其直接parent字段，没有遍历history）。当前17个远端heads输出保存在附录。
3. **会话记录（正式(a)）**：`session://01a195a6/agents/StateInventory/entry/2a1983c8`；`session://01a195a6/entry/52fa711a`（06:32新建home的实际回执）；`session://01a195a6/entry/9441aa0c`（07:02四个home创建调用）；`session://01a195a6/agents/D10Rewrite/entry/0ef427dc`（07:14:36开始、49条PATCH实际回执，其中本仓20条）。这些记录中出现原根路径是**读取会话内原命令文本**，不是本执行者对该路径执行命令。
4. **快照**：逐个读取20份`prepublish/Pepgent-N.json`的原body/state/title/时间；逐个读同N的`context/.../parent.error.json`与`sub_issues/page-001.json`。20项均为原OPEN、无parent、子边=[]。body来源是已通过D15认可的07:14改写前快照，不以当前正文倒推。`publish.py`与执行回执证明是仅body PATCH且发布前无介入body修改；脚本仅阅读，未运行。
5. **[W] 额外来源，待双核解释认可**：
   - [W-W] `/Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions/2026-11-01T07-02-22-163Z_01a195ea-98d3-7705-a11d-4410af95c259.jsonl`
   - [W-L] `/Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions/2026-11-01T06-33-00-828Z_01a195cf-b89c-734a-bff3-e2364caf3799.jsonl`
   - 仅读取了与本仓ref/worktree创建、push、BRIDGE范围有关的已存记录；没有向其发送消息或恢复进程。表中`#entry`是这两份jsonl的id，不是新的GitHub事件。没有读取这些工程师的git log结果；读取的工具调用文字即便含原来的log命令，本轮也未执行它们。
6. **只读worktree状态**：命令为`git --no-optional-locks -C <7个点名worktree> status --short --branch`、`git -C <worktree> rev-parse HEAD`、`stat -f 'birth=%SB' ...`。7棵树均无dirty输出；仅两个会话前树与五个会话新树。未执行worktree add/remove/prune或checkout/switch。

不读取GitHub编辑历史、timeline或events API。G3旧报告含此类来源的原有调查事实，不代表本轮重跑；本轮需要的关闭来源以PR/issue当前字段、快照及会话回执交叉支持。不读session 01a193fd，不从当前commit日期推定ref创建。

## 表一：05:48:24Z会话前状态

`[W]`表示上面的补充工程师记录；精确起点取不到时明确写未知，不拿取样时刻代替会话起点。其他9个ref只证明当前对象较早，不证明会话前ref；差集表另列冻结。

| ID | 对象 | 会话前状态 | 来源 / 当前核对 |
|---|---|---|---|
| B01 | 远端 main | 05:48:24Z 精确 ref 未证；候选 `16fe1f2`，不得当作已证基线 | PR39 当前 base=`16fe1f2`；S#52fa711a 在06:32从 origin/main 建树也为该位置；这两项均不足单独证明05:48 ref。当前 `031d01c`。缺少会话起点 push old..new / 当时 ref 回执。 |
| B02 | 受保护根 checkout 的本地 main | 05:48 精确 ref 未直接取证；候选 `5a1229b`，不访问根 checkout | 当前对象 `978bc0e` 的 parent=`5a1229b`（03:25:34Z）；StateInventory#2a1983c8 在06:17见本地 main=`978bc0e`。仅作为候选，禁止据此重置。 |
| B03 | feat/lab-10-library | `fc89bcd0c562cb205e25f627985580e92cfa1e12`，会话前已存在 | StateInventory#2a1983c8 06:17 HEAD；[W-L] #a703b1d7 06:43 push `fc89bcd..7046c52`；fc89bcd 对象日期05:11:07Z；PR39创建05:25:09Z |
| B04 | feat/web-01-async-snapshot | 会话新建；会话前不存在 | [W-W] #815deb4c 07:04 new branch；#6305ad92 07:13远端 [new branch] |
| B05 | evidence/pr-40 | 会话新建；会话前不存在 | X-61；[W-W] #3437334a 07:20远端 [new branch]；该commit无parent，只含截图 |
| B06 | feat/lab-root-sessions-eng3 | 会话新建；不是既有 `feat/lab-root-sessions` | X-29；[W-L] #764e21a2 08:05远端 [new branch]；#3eeafbb5 明确只对该会话分支改写 c445a22→695daea |
| B07 | feat/web-02-lab-wire | 会话新建；会话前不存在 | X-54/80/82/84；[W-W] #e9e48c49 07:58 new branch；基点 cbcd943 |
| B08 | feat/lab-d12-producer | 会话新建；会话前不存在 | X-82/84；[W-L] #11695aba 08:31远端 [new branch]；父83b480a |
| B09 | feat/web-02-lab-bridge | [W-W] 证明会话新建；独立分支的 leader 直接归因仍缺 | INDEX 3.6 标未找到独立Bridge分支指令；[W-W] #c7f67984/#d34448ce 08:33创建；#bb96331e 08:34远端[new branch]。是否足以归X-54交双核，不自裁 |
| B10 | [Issue #9](https://github.com/Pepgent/Pepgent/issues/9) | OPEN；原正文 1608 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-9.json` 的 body/state；同快照 `context/Pepgent-9/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B11 | [Issue #11](https://github.com/Pepgent/Pepgent/issues/11) | OPEN；原正文 2498 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-11.json` 的 body/state；同快照 `context/Pepgent-11/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B12 | [Issue #13](https://github.com/Pepgent/Pepgent/issues/13) | OPEN；原正文 2128 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-13.json` 的 body/state；同快照 `context/Pepgent-13/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B13 | [Issue #14](https://github.com/Pepgent/Pepgent/issues/14) | OPEN；原正文 1701 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-14.json` 的 body/state；同快照 `context/Pepgent-14/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B14 | [Issue #15](https://github.com/Pepgent/Pepgent/issues/15) | OPEN；原正文 1824 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-15.json` 的 body/state；同快照 `context/Pepgent-15/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B15 | [Issue #16](https://github.com/Pepgent/Pepgent/issues/16) | OPEN；原正文 1934 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-16.json` 的 body/state；同快照 `context/Pepgent-16/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B16 | [Issue #17](https://github.com/Pepgent/Pepgent/issues/17) | OPEN；原正文 1698 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-17.json` 的 body/state；同快照 `context/Pepgent-17/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B17 | [Issue #18](https://github.com/Pepgent/Pepgent/issues/18) | OPEN；原正文 2025 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-18.json` 的 body/state；同快照 `context/Pepgent-18/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B18 | [Issue #19](https://github.com/Pepgent/Pepgent/issues/19) | OPEN；原正文 1696 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-19.json` 的 body/state；同快照 `context/Pepgent-19/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B19 | [Issue #20](https://github.com/Pepgent/Pepgent/issues/20) | OPEN；原正文 1923 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-20.json` 的 body/state；同快照 `context/Pepgent-20/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B20 | [Issue #21](https://github.com/Pepgent/Pepgent/issues/21) | OPEN；原正文 1728 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-21.json` 的 body/state；同快照 `context/Pepgent-21/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B21 | [Issue #22](https://github.com/Pepgent/Pepgent/issues/22) | OPEN；原正文 1732 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-22.json` 的 body/state；同快照 `context/Pepgent-22/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B22 | [Issue #23](https://github.com/Pepgent/Pepgent/issues/23) | OPEN；原正文 2047 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-23.json` 的 body/state；同快照 `context/Pepgent-23/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B23 | [Issue #24](https://github.com/Pepgent/Pepgent/issues/24) | OPEN；原正文 1921 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-24.json` 的 body/state；同快照 `context/Pepgent-24/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B24 | [Issue #25](https://github.com/Pepgent/Pepgent/issues/25) | OPEN；原正文 1728 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-25.json` 的 body/state；同快照 `context/Pepgent-25/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B25 | [Issue #26](https://github.com/Pepgent/Pepgent/issues/26) | OPEN；原正文 1831 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-26.json` 的 body/state；同快照 `context/Pepgent-26/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B26 | [Issue #27](https://github.com/Pepgent/Pepgent/issues/27) | OPEN；原正文 1739 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-27.json` 的 body/state；同快照 `context/Pepgent-27/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B27 | [Issue #28](https://github.com/Pepgent/Pepgent/issues/28) | OPEN；原正文 1640 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-28.json` 的 body/state；同快照 `context/Pepgent-28/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B28 | [Issue #29](https://github.com/Pepgent/Pepgent/issues/29) | OPEN；原正文 2123 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-29.json` 的 body/state；同快照 `context/Pepgent-29/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B29 | [Issue #30](https://github.com/Pepgent/Pepgent/issues/30) | OPEN；原正文 1878 字符；原父边无、子边空 | `local://inv/d15/d10-rewrite-snapshot/prepublish/Pepgent-30.json` 的 body/state；同快照 `context/Pepgent-30/parent.error.json` 为404 No parent、`sub_issues/page-001.json=[]`。D15现状第34行认可改写前正文为会话前版本；S/agents/D10Rewrite#0ef427dc逐项PATCH回执。 |
| B30 | [PR39](https://github.com/Pepgent/Pepgent/pull/39) | 会话前已存在且OPEN；合法分支内容到 fc89bcd | 当前PR created_at=05:25:09Z，merged_at=07:17:16Z；完整会话前PR body不具备，但已合并PR不可修改，不拟恢复其body |
| B31 | [PR40](https://github.com/Pepgent/Pepgent/pull/40) | 会话前不存在 | 当前PR created_at=07:19:15Z；merged_at=07:25:52Z |
| B32 | [Issue41](https://github.com/Pepgent/Pepgent/issues/41) | 会话前不存在 | 当前created_at=09:12:07Z；[W-W] #4f92448a 在08:12创建。保留两种时钟，不自行校正 |
| B33 | [21→41父子边](https://github.com/Pepgent/Pepgent/issues/21) | 不存在（41尚未创建）；21原子边=[] | context/Pepgent-21/sub_issues/page-001.json；gh GET当前21/sub_issues返回41，41/parent返回21 |
| B34 | worktree `/Users/mouriya/Ext/worktrees/eng-lab3-home` | 会话新建 | S#52fa711a实际创建；X-28/29；本次仅status/rev-parse/stat：HEAD=695daea，feat/lab-root-sessions-eng3，工作区clean；birth=06:32:54Z。ahead/behind只描述本地跟踪副本。 |
| B35 | worktree `/Users/mouriya/Ext/worktrees/eng-web-home` | 会话新建 | S#9441aa0c 创建命令；INDEX/G6实际创建记录；X-49/54；本次仅status/rev-parse/stat：HEAD=16fe1f2，detached，工作区clean；birth=07:02:07Z。ahead/behind只描述本地跟踪副本。 |
| B36 | worktree `/Users/mouriya/Ext/worktrees/eng-web-01` | 会话新建 | [W-W] #815deb4c 创建回执；X-54；本次仅status/rev-parse/stat：HEAD=cbcd943，detached，工作区clean；birth=07:04:22Z。ahead/behind只描述本地跟踪副本。 |
| B37 | worktree `/Users/mouriya/Ext/worktrees/eng-web-02` | 会话新建 | [W-W] #e9e48c49 创建回执；X-54/80；本次仅status/rev-parse/stat：HEAD=4177b05，feat/web-02-lab-wire，工作区clean；birth=07:58:41Z。ahead/behind只描述本地跟踪副本。 |
| B38 | worktree `/Users/mouriya/Ext/worktrees/eng-web-02b` | 会话新建；独立分支归因待双核 | [W-W] #c7f67984/#d34448ce 创建；INDEX未找到独立指令；本次仅status/rev-parse/stat：HEAD=d0e6679，feat/web-02-lab-bridge，工作区clean；birth=08:33:07Z。ahead/behind只描述本地跟踪副本。 |
| B39 | worktree `/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373` | 会话前已存在，保护 | 只读stat出生04:12:18Z；StateInventory#2a1983c8 初期已存在且fc89bcd；本次仅status/rev-parse/stat：HEAD=fc89bcd，feat/lab-10-library，工作区clean；birth=04:12:18Z。ahead/behind只描述本地跟踪副本。 |
| B40 | worktree `/Users/mouriya/Ext/worktrees/pepgent-lab-32` | 会话前已存在，保护 | 只读stat出生00:59:18Z；StateInventory#2a1983c8 初期已存在且16fe1f2；本次仅status/rev-parse/stat：HEAD=16fe1f2，feat/lab-root-sessions，工作区clean；birth=00:59:18Z。ahead/behind只描述本地跟踪副本。 |
| B41 | 本地遗产 `feat/lab-root-sessions` | `16fe1f2`，不等于会话新建 eng3分支 | StateInventory#2a1983c8初期记录及本次 pepgent-lab-32 只读HEAD；远端当前17heads没有该ref，不据此删除本地遗产。 |
| B42 | 其他当前ref `RiriAgent/feat-ai4s-lab-platform` | 当前 `fb40ee8`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B43 | 其他当前ref `RiriAgent/sealion` | 当前 `4ca9d3a`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B44 | 其他当前ref `docs/c4-design-tree` | 当前 `fb418fb`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B45 | 其他当前ref `docs/lab-backend` | 当前 `82e6198`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B46 | 其他当前ref `feat/lab-authentication` | 当前 `330aeff`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B47 | 其他当前ref `feat/lab-database` | 当前 `7dc277c`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B48 | 其他当前ref `feat/lab-runtime` | 当前 `ea80839`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B49 | 其他当前ref `feat/oidc-authentication` | 当前 `2102b2e`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |
| B50 | 其他当前ref `fix/platform-notices` | 当前 `7e2370b`；commit早于会话；精确会话前ref未取证 | 当前ls-remote与for-each-ref对象字段；INDEX无本会话改动归因。不从commit日期推断分支创建时间，不纳入待删除差集，保护现状。 |

## 表二：现状 − 会话前 − 保护名单

这里只列拟动作，**不构成第③步执行授权**。同仓main revert按commit时间从新到旧编号：1=07:25:52Z PR40、2=07:17:16Z PR39；二者都是单parent squash，不应误用`-m 1`。无关会话两条merge自身不revert。分支动作只指远端ref，旧根checkout的本地refs不得经旁路修改；会话内4个PR39分支修复不在main重复revert。

| ID | 对象 | 现状 | 会话前状态 | INDEX归因 | D15行 | 拟执行动作 / 冻结缺口 |
|---|---|---|---|---|---|---|
| D01 | 远端main精确会话前ref | 031d01c；根本地main未访问 | 候选16fe1f2；缺05:48 ref直接回执 | X-29/54只归因功能合并；main本地同步不另归因 | D15-06 / D15-02/03 | 冻结 BLOCKED：只冻结任何按候选基线重置/整体回退的动作；缺会话起点main ref记录。main不允许强推。已知两PR差集另列。 |
| D02 | [PR40 squash cbcd943](https://github.com/Pepgent/Pepgent/pull/40) | 07:25:52Z已合main；6文件 | 功能未合main | X-54、X-61 | D15-05④ | revert顺序1；冻结 BLOCKED：与保护merge a331057/031d01c文件重叠，D15-03禁止直接执行；不得以普通13个提交不重叠绕过。 |
| D03 | [PR39 squash 6275a0a](https://github.com/Pepgent/Pepgent/pull/39) | 07:17:16Z已合main；19文件 | 会话前PR/分支fc89bcd须保留；main尚未有该PR合并 | X-29、X-55 | D15-06 | revert顺序2；冻结 BLOCKED：保护merge同文件重叠；且完整squash包含会话前PR内容，须保持fc89bcd遗产，不把会话内4修复再在main单独revert。 |
| D04 | [Issue9正文](https://github.com/Pepgent/Pepgent/issues/9) | 2620字符，含“交付顺序与依据”D10改写；CLOSED | prepublish/Pepgent-9.json 原body 1608字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。状态重开另列。 |
| D05 | [Issue11正文](https://github.com/Pepgent/Pepgent/issues/11) | 3634字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-11.json 原body 2498字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D06 | [Issue13正文](https://github.com/Pepgent/Pepgent/issues/13) | 3334字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-13.json 原body 2128字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D07 | [Issue14正文](https://github.com/Pepgent/Pepgent/issues/14) | 2803字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-14.json 原body 1701字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D08 | [Issue15正文](https://github.com/Pepgent/Pepgent/issues/15) | 2952字符，含“交付顺序与依据”D10改写；CLOSED | prepublish/Pepgent-15.json 原body 1824字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。状态重开另列。 |
| D09 | [Issue16正文](https://github.com/Pepgent/Pepgent/issues/16) | 3039字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-16.json 原body 1934字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D10 | [Issue17正文](https://github.com/Pepgent/Pepgent/issues/17) | 2793字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-17.json 原body 1698字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D11 | [Issue18正文](https://github.com/Pepgent/Pepgent/issues/18) | 3163字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-18.json 原body 2025字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D12 | [Issue19正文](https://github.com/Pepgent/Pepgent/issues/19) | 2722字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-19.json 原body 1696字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D13 | [Issue20正文](https://github.com/Pepgent/Pepgent/issues/20) | 2998字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-20.json 原body 1923字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D14 | [Issue21正文](https://github.com/Pepgent/Pepgent/issues/21) | 2796字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-21.json 原body 1728字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D15 | [Issue22正文](https://github.com/Pepgent/Pepgent/issues/22) | 2813字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-22.json 原body 1732字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D16 | [Issue23正文](https://github.com/Pepgent/Pepgent/issues/23) | 3573字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-23.json 原body 2047字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D17 | [Issue24正文](https://github.com/Pepgent/Pepgent/issues/24) | 3031字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-24.json 原body 1921字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D18 | [Issue25正文](https://github.com/Pepgent/Pepgent/issues/25) | 2803字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-25.json 原body 1728字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D19 | [Issue26正文](https://github.com/Pepgent/Pepgent/issues/26) | 2945字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-26.json 原body 1831字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D20 | [Issue27正文](https://github.com/Pepgent/Pepgent/issues/27) | 2801字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-27.json 原body 1739字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D21 | [Issue28正文](https://github.com/Pepgent/Pepgent/issues/28) | 2681字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-28.json 原body 1640字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D22 | [Issue29正文](https://github.com/Pepgent/Pepgent/issues/29) | 3269字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-29.json 原body 2123字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D23 | [Issue30正文](https://github.com/Pepgent/Pepgent/issues/30) | 7614字符，含“交付顺序与依据”D10改写；OPEN | prepublish/Pepgent-30.json 原body 1878字符 | X-50 | D15-04（M-2） | 预审后恢复该快照的完整body，不改已发评论；当前title与原快照相同，不拟改title。保持OPEN。 |
| D24 | [Issue9状态](https://github.com/Pepgent/Pepgent/issues/9) | CLOSED/completed；closed_at07:25:53Z | OPEN | X-54、X-61；X-50仅正文 | D15-05④ | 预审后重开；不改PR40 body/评论。秘书是否加D15作废说明按双核意见执行。 |
| D25 | [Issue15状态](https://github.com/Pepgent/Pepgent/issues/15) | CLOSED/completed；closed_at07:17:18Z | OPEN | X-29、X-55；X-50仅正文 | D15-06 | 预审后重开；不改PR39 body/评论。 |
| D26 | [Issue41对象](https://github.com/Pepgent/Pepgent/issues/41) | OPEN；共享schema/producer/reason/lab:write正文 | 会话前不存在 | X-80、X-82、X-84 | D15-05⑤ | 预审后以not planned关闭，并评论引用[PM#23](https://github.com/Pepgent/PM/issues/23)；不把关闭父项21列入动作。 |
| D27 | [Issue21→41边](https://github.com/Pepgent/Pepgent/issues/21) | GET 21/sub_issues=[41]；41/parent=21 | 21子边=[]；41不存在 | X-80、X-82、X-84 | D15-05⑤ | 预审后移除真实父子边；不改其他图边或Project字段。 |
| D28 | ref `feat/lab-10-library` | 5609e09 | `fc89bcd0c562cb205e25f627985580e92cfa1e12`，会话前已存在 | X-29、X-55 | D15-06 | 恢复远端分支到 fc89bcd（仅非main允许force-with-lease）；已有遗产worktree本地fc89bcd不动。会话内4提交7046c52/e88987a/ef57d03/5609e09随ref恢复移出；9个改动路径见附录。 |
| D29 | ref `feat/web-01-async-snapshot` | 2705199 | 会话新建；会话前不存在 | X-29/54；X-80/82/84见B表 | D15-05④/⑤ | 预审认可[W]来源后删除该会话新建远端分支；不追删不可达commit对象、不改根checkout本地refs。 |
| D30 | ref `evidence/pr-40` | 1246470 | 会话新建；会话前不存在 | X-61 | D15-05④/⑤ | 预审认可[W]来源后删除该会话新建远端分支；不追删不可达commit对象、不改根checkout本地refs。 |
| D31 | ref `feat/lab-root-sessions-eng3` | 695daea | 会话新建；不是既有 `feat/lab-root-sessions` | X-29/54；X-80/82/84见B表 | D15-06 | 预审认可[W]来源后删除该会话新建远端分支；不追删不可达commit对象、不改根checkout本地refs。 |
| D32 | ref `feat/web-02-lab-wire` | 4177b05 | 会话新建；会话前不存在 | X-29/54；X-80/82/84见B表 | D15-05④/⑤ | 预审认可[W]来源后删除该会话新建远端分支；不追删不可达commit对象、不改根checkout本地refs。 |
| D33 | ref `feat/lab-d12-producer` | 0ae89ef | 会话新建；会话前不存在 | X-29/54；X-80/82/84见B表 | D15-05④/⑤ | 预审认可[W]来源后删除该会话新建远端分支；不追删不可达commit对象、不改根checkout本地refs。 |
| D34 | ref `feat/web-02-lab-bridge` | d0e6679 | [W-W] 证明会话新建；独立分支的 leader 直接归因仍缺 | 未找到独立Bridge指令；任务X-54 | D15-05④/⑤ | 冻结 BLOCKED：虽[W-W]已证新建及具体作者，但INDEX缺独立Bridge分支指令的归因，且[W]读取解释尚待双核；本执行者不单方以X-54宽任务补足。 |
| D35 | worktree `/Users/mouriya/Ext/worktrees/eng-lab3-home` | clean；feat/lab-root-sessions-eng3；HEAD=695daea | 会话新建 | X-28/29 | D15-06（会话新建工作树） | 预审通过后只移除此会话新建worktree；内层资源先结束，原 `.workers/*/sessions` 不在树内且必须保留。不得调用原根checkout做清理。 |
| D36 | worktree `/Users/mouriya/Ext/worktrees/eng-web-home` | clean；detached；HEAD=16fe1f2 | 会话新建 | X-49/54/80 | D15-06（会话新建工作树） | 预审通过后只移除此会话新建worktree；内层资源先结束，原 `.workers/*/sessions` 不在树内且必须保留。不得调用原根checkout做清理。 |
| D37 | worktree `/Users/mouriya/Ext/worktrees/eng-web-01` | clean；detached；HEAD=cbcd943 | 会话新建 | X-49/54/80 | D15-06（会话新建工作树） | 预审通过后只移除此会话新建worktree；内层资源先结束，原 `.workers/*/sessions` 不在树内且必须保留。不得调用原根checkout做清理。 |
| D38 | worktree `/Users/mouriya/Ext/worktrees/eng-web-02` | clean；feat/web-02-lab-wire；HEAD=4177b05 | 会话新建 | X-49/54/80 | D15-06（会话新建工作树） | 预审通过后只移除此会话新建worktree；内层资源先结束，原 `.workers/*/sessions` 不在树内且必须保留。不得调用原根checkout做清理。 |
| D39 | worktree `/Users/mouriya/Ext/worktrees/eng-web-02b` | clean；feat/web-02-lab-bridge；HEAD=d0e6679 | 会话新建；独立分支归因待双核 | 未找到独立Bridge指令；任务X-54 | D15-06（会话新建工作树） | 冻结 BLOCKED：随Bridge归因待双核；不移除。 |
| D40 | 其他当前ref `RiriAgent/feat-ai4s-lab-platform` | fb40ee8 | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D41 | 其他当前ref `RiriAgent/sealion` | 4ca9d3a | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D42 | 其他当前ref `docs/c4-design-tree` | fb418fb | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D43 | 其他当前ref `docs/lab-backend` | 82e6198 | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D44 | 其他当前ref `feat/lab-authentication` | 330aeff | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D45 | 其他当前ref `feat/lab-database` | 7dc277c | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D46 | 其他当前ref `feat/lab-runtime` | ea80839 | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D47 | 其他当前ref `feat/oidc-authentication` | 2102b2e | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |
| D48 | 其他当前ref `fix/platform-notices` | 7e2370b | 会话前精确ref位置/是否已存在未获准源头记录 | 未找到 | D15-06 / D15-02 | 冻结 BLOCKED：无会话改动归因、缺会话前ref记录；不删除、不恢复、不把commit早于05:48当成分支已存在证据。 |

## 表三：保护段落表

保护单位是内容段而非整个同名文件。无关15个SHA逐一列出。`fc89bcd`遗产必须留在会话前分支/worktree；它不使同一文件里的会话修复获保护。跨仓用户直接命令与argon段落列为**不得越界触碰**的保护约束，不冒充本仓已核验其完整提交或作者。

| ID | 对象 | 保护范围（内容段） | 标记 | 依据 |
|---|---|---|---|---|
| P01 | [978bc0e](https://github.com/Pepgent/Pepgent/commit/978bc0e) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=4文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P02 | [2d46c1d](https://github.com/Pepgent/Pepgent/commit/2d46c1d) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=6文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P03 | [286f8cb](https://github.com/Pepgent/Pepgent/commit/286f8cb) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=1文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P04 | [1038aee](https://github.com/Pepgent/Pepgent/commit/1038aee) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=5文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P05 | [21f4217](https://github.com/Pepgent/Pepgent/commit/21f4217) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=1文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P06 | [e44f068](https://github.com/Pepgent/Pepgent/commit/e44f068) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=9文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P07 | [b212fb6](https://github.com/Pepgent/Pepgent/commit/b212fb6) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=5文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P08 | [a331057](https://github.com/Pepgent/Pepgent/commit/a331057) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=73文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P09 | [f35103b](https://github.com/Pepgent/Pepgent/commit/f35103b) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=15文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P10 | [f7a3313](https://github.com/Pepgent/Pepgent/commit/f7a3313) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=2文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P11 | [a9756eb](https://github.com/Pepgent/Pepgent/commit/a9756eb) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=2文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P12 | [d110c7c](https://github.com/Pepgent/Pepgent/commit/d110c7c) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=5文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P13 | [e83c2f2](https://github.com/Pepgent/Pepgent/commit/e83c2f2) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=1文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P14 | [9a6d455](https://github.com/Pepgent/Pepgent/commit/9a6d455) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=6文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P15 | [031d01c](https://github.com/Pepgent/Pepgent/commit/031d01c) | 该无关会话提交的全部内容；merge包括冲突整合段；不revert或重写 | 保护 | D15-01③、C1-2/C5-3；G3§4.3/INDEX3.2；本次点名父子diff=25文件（第1父）；两merge另读第2父差集，绝不将它们从15个名单中剔除。 |
| P16 | fc89bcd（feat/lab-10-library） | 会话前分支全部内容；会话内7046c52起的9路径修改不因此整文件保护 | 保护 | D15-01①；push fc89bcd..7046c52；05:11:07Z对象；原PR39与遗产worktree均保留 |
| P17 | 16fe1f2及会话前LAB-01/02/03 | 既有认证/数据库/runtime主体；不因PR39/40 touched同文件而整文件删回旧版 | 保护 | D15-01①与R15；PR39 base及本次对象内容；main起点精确ref仍另标缺口 |
| P18 | [PR39](https://github.com/Pepgent/Pepgent/pull/39) | 会话前PR存在本身、已合并PR当前body及已发评论保持不可变 | 保护 | D15-01① / D15-03；只拟新增revert PR，不改旧PR |
| P19 | [PR40](https://github.com/Pepgent/Pepgent/pull/40) | 已合并PR body和已发评论不可变（不是把其代码归为合法遗产） | 保护 | D15-03；截图分支可按决议删除，旧PR文字不回写 |
| P20 | 本仓59条既有评论（INDEX3.3逐条索引） | 全部已发评论原文不可变；决策同步评论的效力说明由秘书另发，不编辑删除 | 保护 | D15-03/07；G3§5给59条链接。数量沿用原取证，未把它冒充本次重枚举结果 |
| P21 | /Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373 | 整个会话前worktree及当前未改内容，HEAD=fc89bcd | 保护 | D15-01①；本次只读状态clean、出生早于05:48；不得移除 |
| P22 | /Users/mouriya/Ext/worktrees/pepgent-lab-32 | 整个会话前worktree及当前未改内容，HEAD=16fe1f2 | 保护 | D15-01①；本次只读状态clean、出生早于05:48；不得移除 |
| P23 | 本地 feat/lab-root-sessions | 既有本地ref=16fe1f2，与新建feat/lab-root-sessions-eng3区分 | 保护 | StateInventory初期记录与本次pepgent-lab-32只读；不因远端缺失删除 |
| P24 | 远端 `RiriAgent/feat-ai4s-lab-platform` | 保持当前ref fb40ee8 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P25 | 远端 `RiriAgent/sealion` | 保持当前ref 4ca9d3a 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P26 | 远端 `docs/c4-design-tree` | 保持当前ref fb418fb 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P27 | 远端 `docs/lab-backend` | 保持当前ref 82e6198 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P28 | 远端 `feat/lab-authentication` | 保持当前ref 330aeff 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P29 | 远端 `feat/lab-database` | 保持当前ref 7dc277c 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P30 | 远端 `feat/lab-runtime` | 保持当前ref ea80839 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P31 | 远端 `feat/oidc-authentication` | 保持当前ref 2102b2e 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P32 | 远端 `fix/platform-notices` | 保持当前ref 7e2370b 与内容；不把日期早推断为ref出生证明 | 保护 | INDEX无会话改动归因；D15-02 无归因不得删除。此为保全现状，不宣称已证明完整会话前ref。 |
| P33 | /Users/mouriya/Ext/code/pepgent/.workers/eng-lab3/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P34 | /Users/mouriya/Ext/code/pepgent/.workers/eng-web/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P35 | /Users/mouriya/Ext/code/pepgent/.workers/eng-ops/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P36 | /Users/mouriya/Ext/code/pepgent/.workers/eng-store/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P37 | /Users/mouriya/Ext/code/pepgent/.workers/eng-plugin/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P38 | /Users/mouriya/Ext/code/pepgent/.workers/eng-e2e/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P39 | /Users/mouriya/Ext/code/pepgent/.workers/eng-rt/sessions | 会话目录及全部后代原样保留；不随home/worktree清理 | 保护 | D15-01④；INDEX3.7。除lab3/web的本轮相关记录外，其余目录未另读内容，不越仓核验 |
| P40 | PM e519e5b | U57的30份报告全部内容 | 保护 | D15-01②；不读被禁旧session本体；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P41 | soroi 6c1faea | U77–U78直接授权的双核agent定义 | 保护 | D15-01②；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P42 | soroi bdaa278 | U80整理LEDGER及AGENTS/secretary/watchdog的argon段落 | 保护 | D15-01②；不是同文件全部leader内容保护；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P43 | soroi 80b0267 | R编号与C3-3对齐段落 | 保护 | D15-01②；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P44 | soroi b521200 | U81–U82用户原话与对应段落 | 保护 | D15-01②；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P45 | PM 37e6c73 / f88748d / dc7893c | 常驻argon基线、规范与VG-4修订对应内容段 | 保护 | D15-01②；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P46 | pepgent-pm/evidence/argon/D15-08-replacements.md | ArgonGovernance替换文本原样保留 | 保护 | D15-01②与D15-08；秘书执行范围，本仓不改；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P47 | 秘书逐字原话记录 / 原样归档argon产物 | 这些被授权内容段保留；非这些段不因此获保护 | 保护 | D15-01②；本仓未见对应git写入；不在本仓伪造提交归属；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |
| P48 | D10–D14、D11-A/B/C决策档案/选票/PM issue | 记录保留，效力暂停；不是工程回写代码保护 | 保护 | D15-01/07；本仓不编辑PM对象；这是跨仓保护边界引用，实际逐段核验由所属仓执行者承担，本报告不声称已重验。 |

## PR39/PR40与保护15提交的同文件核对（D15-03特别检查）

取PR实际main落地差集，而非拿PR head与当前main混比：

```sh
# 全部命令cwd=/tmp/d15-pepgent-b978
# 直接对象parents来自 git show -s，不是git历史遍历
# PR39实际squash：19个文件
 git diff --name-only 16fe1f2 6275a0a
# PR40实际squash：6个文件
 git diff --name-only 6275a0a cbcd943
```

无关提交以各自明确的第1父与该SHA比较；对两条merge额外比较第2父，避免把导入main和无关修改揉成一个含糊集合。下面每条均实际执行了 `git diff --name-only <左SHA> <右SHA>`：

- `5a1229b → 978bc0e`（P1）：4文件；与PR39重叠0、PR40重叠0。
- `978bc0e → 2d46c1d`（P1）：6文件；与PR39重叠0、PR40重叠0。
- `2d46c1d → 286f8cb`（P1）：1文件；与PR39重叠0、PR40重叠0。
- `286f8cb → 1038aee`（P1）：5文件；与PR39重叠0、PR40重叠0。
- `1038aee → 21f4217`（P1）：1文件；与PR39重叠0、PR40重叠0。
- `21f4217 → e44f068`（P1）：9文件；与PR39重叠0、PR40重叠0。
- `e44f068 → b212fb6`（P1）：5文件；与PR39重叠0、PR40重叠0。
- `b212fb6 → a331057`（P1）：73文件；与PR39重叠12、PR40重叠5。
  - PR39交集：`apps/web/README.md`；`apps/web/package.json`；`apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`；`apps/web/src/app/start.ts`；`apps/web/src/server/lab/access.ts`；`apps/web/src/server/lab/runtime.ts`；`apps/web/tests/node/lab-auth.test.ts`；`apps/web/tests/node/lab-runtime.test.ts`；`docs/conventions/01-repo-layout-and-layering.md`；`package-lock.json`；`scripts/generate-third-party-notices.mjs`；`scripts/generate-third-party-notices.test.mjs`。
  - PR40交集：`apps/web/src/app/routes/_lab.tsx`；`apps/web/src/client/services/lab.ts`；`apps/web/src/renderer/README.md`；`apps/web/src/renderer/bootstrap/renderer-services.ts`；`apps/web/src/renderer/platform/web/create-lab-services.ts`。
- `16fe1f2 → a331057`（P2）：83文件；与PR39重叠2、PR40重叠0。
  - PR39交集：`apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`；`package-lock.json`。
- `a331057 → f35103b`（P1）：15文件；与PR39重叠0、PR40重叠0。
- `f35103b → f7a3313`（P1）：2文件；与PR39重叠0、PR40重叠0。
- `f7a3313 → a9756eb`（P1）：2文件；与PR39重叠0、PR40重叠0。
- `a9756eb → d110c7c`（P1）：5文件；与PR39重叠0、PR40重叠0。
- `d110c7c → e83c2f2`（P1）：1文件；与PR39重叠0、PR40重叠0。
- `e83c2f2 → 9a6d455`（P1）：6文件；与PR39重叠0、PR40重叠0。
- `9a6d455 → 031d01c`（P1）：25文件；与PR39重叠19、PR40重叠6。
  - PR39交集：`apps/web/README.md`；`apps/web/package.json`；`apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`；`apps/web/src/app/start.ts`；`apps/web/src/protocol/lab/library-store.ts`；`apps/web/src/protocol/lab/library.ts`；`apps/web/src/rpc/lab.ts`；`apps/web/src/server/lab/access.ts`；`apps/web/src/server/lab/library-definition.ts`；`apps/web/src/server/lab/library-operations.ts`；`apps/web/src/server/lab/library.ts`；`apps/web/src/server/lab/runtime.ts`；`apps/web/tests/node/lab-auth.test.ts`；`apps/web/tests/node/lab-library-definition.test.ts`；`apps/web/tests/node/lab-runtime.test.ts`；`docs/conventions/01-repo-layout-and-layering.md`；`package-lock.json`；`scripts/generate-third-party-notices.mjs`；`scripts/generate-third-party-notices.test.mjs`。
  - PR40交集：`apps/web/src/app/routes/_lab.tsx`；`apps/web/src/client/services/lab.ts`；`apps/web/src/renderer/README.md`；`apps/web/src/renderer/bootstrap/lab-entry.tsx`；`apps/web/src/renderer/bootstrap/renderer-services.ts`；`apps/web/src/renderer/platform/web/create-lab-services.ts`。
- `cbcd943 → 031d01c`（P2）：83文件；与PR39重叠2、PR40重叠0。
  - PR39交集：`apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`；`package-lock.json`。

**观察与解释严格分开：** 13个单parent无关提交的文件集与两PR均不交；两条merge的交集非空，且第2父差集里notices/package-lock也交。前者不能证明两次revert安全，更不能把保护的merge从名单去掉。这里只证明触发D15-03的“同文件重叠”冻结条件，不声称已验证某个hunk必然冲突或必然无冲突；没有执行试revert、merge试验、测试或hash验证。

### 实际PR文件集

PR39：
```
apps/web/README.md
apps/web/package.json
apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt
apps/web/src/app/start.ts
apps/web/src/protocol/lab/library-store.ts
apps/web/src/protocol/lab/library.ts
apps/web/src/rpc/lab.ts
apps/web/src/server/lab/access.ts
apps/web/src/server/lab/library-definition.ts
apps/web/src/server/lab/library-operations.ts
apps/web/src/server/lab/library.ts
apps/web/src/server/lab/runtime.ts
apps/web/tests/node/lab-auth.test.ts
apps/web/tests/node/lab-library-definition.test.ts
apps/web/tests/node/lab-runtime.test.ts
docs/conventions/01-repo-layout-and-layering.md
package-lock.json
scripts/generate-third-party-notices.mjs
scripts/generate-third-party-notices.test.mjs
```

PR40：
```
apps/web/src/app/routes/_lab.tsx
apps/web/src/client/services/lab.ts
apps/web/src/renderer/README.md
apps/web/src/renderer/bootstrap/lab-entry.tsx
apps/web/src/renderer/bootstrap/renderer-services.ts
apps/web/src/renderer/platform/web/create-lab-services.ts
```

### 继承遗产与会话修复的边界

`git diff --name-only fc89bcd 5609e09`实际输出9个路径（会话内4次修复的累计差集），分支恢复仅撤这些会话段；不删除fc89bcd整棵树：

```
apps/web/README.md
apps/web/src/protocol/lab/library.ts
apps/web/src/server/lab/access.ts
apps/web/src/server/lab/library-definition.ts
apps/web/src/server/lab/library-operations.ts
apps/web/src/server/lab/library.ts
apps/web/tests/node/lab-auth.test.ts
apps/web/tests/node/lab-library-definition.test.ts
docs/conventions/01-repo-layout-and-layering.md
```

已读单个对象显示链条 `fc89bcd → 7046c52 → e88987a → ef57d03 → 5609e09`；这是这5个点名对象的直接parent字段，不是用git log提取。fc89bcd的05:11对象日期、05:25已存在的PR39、06:17会话初期工作树回执与06:43`fc89bcd..7046c52`push输出共同支持该遗产边界。

## 待双核裁决 / 缺口清单

1. **两PR实质冻结**：是否以及如何在保护15提交内容、尤其merge冲突整合段的前提下处置，须由双核/治理分身按D15-12决定；本执行者不创造“merge不算保护”“自动hunk保留”等例外。
2. **main起点**：当前PR base与06:32的origin/main都为16fe1f2，但缺05:48精确远端ref回执；根本地main候选5a1229b只来自第1个无关commit的parent。二者不得混同。不能据任一候选reset main；即使补齐起点，两PR同文件冻结仍独立成立。
3. **Bridge归因**：[W-W]证明新建branch/worktree与其作者，但INDEX保留“未找到独立Bridge分支指令”。现有X-54总任务是否足以归因，且[W]是否属于D15-02(a)，交双核；两对象当前冻结，不能因名字匹配直接删。
4. **其他9个ref**：缺会话前ref位置及本会话变更归因，因此逐个冻结原位；不从其commit日期造会话前创建时间。它们不阻止其余具备来源的issue正文等对象提交预审。
5. **[W]依据的动作**：lab-10恢复位置、新建web/evidence/lab-root/producer分支及3棵WEB树的来源分别标[W]；若双核不采纳该来源，这些动作不得执行，须保留冻结直至有被认可来源。当前50/48/48与14冻结是**本预审包**的计数，不预先替双核结论计票。
6. **评论 / Project**：本次不把bot Project状态当独立leader决策，不列无根据的手动Project回退。旧59评论和合并PR body保持不动；D15-07同步暂停说明由秘书按相关issue另发。是否在重开issue额外发作废说明沿契约非阻断意见处理，本执行者未发任何评论。
7. **无新增本仓main evidence对象**：[W-L]末段出现`73053a40`写archive命令，已继续读其cwd与实际结果：cwd为PM，产物`eedda7d`，属于D15-06的PM对象，**不是**Pepgent第三次main写入，不越仓纳入本仓差集。

## 采集命令与完整文件差集输出

GitHub身份检查观察到Active account为RiriAgent；未切换账号。clone命令与实际输出：

```text
gh repo clone Pepgent/Pepgent /tmp/d15-pepgent-b978 -- --no-checkout
Cloning into '/tmp/d15-pepgent-b978'...
```

全部Git对象操作在新克隆。孤立但被决议/评论点名的`c445a22`初次`git show`因新clone不含不可达对象退出128；随后只获取该完整SHA：

```text
git fetch origin c445a22725055f6cdf9b4a7089152e2ac87221bf
From https://github.com/Pepgent/Pepgent
 * branch c445a22725055f6cdf9b4a7089152e2ac87221bf -> FETCH_HEAD
```

该对象parent为6275a0a；当前eng3分支695daea的parent为031d01c。未把孤立c445a22当已合main或独立新ref删除对象。

其他采集限制：首次动态拼接bash命令被delete-guard拒绝、未运行，改为明确literal点名命令；JSON一次63KB单行读被工具截断，已改为逐个20份prepublish读完整body；大型merge diff输出被工具折叠，已从lossless `artifact://1206`恢复完整输出后计算交集，未以截断文件集下结论；某次查询的jq `.id`拼写错误已修正；尝试读取当前commit中的`.claude/rules/design-assumes-it-works.md`返回该路径不存在，规则来源是任务注入，不据此忽略。没有把这些工具失败隐瞒成成功。

### 当前refs与点名对象metadata（实际输出）

```
fb40ee88193b6660072040b401cefb92e0a25b82	refs/heads/RiriAgent/feat-ai4s-lab-platform
4ca9d3ac50a1e709da521ecaad320b1a1d49710a	refs/heads/RiriAgent/sealion
fb418fb4d9c9ff03d151f571162b6eef8f0b9233	refs/heads/docs/c4-design-tree
82e61982fe094518e56d11bb4f2f049210fa3eb0	refs/heads/docs/lab-backend
12464701c02b8d50d32bad7f0fbf0cd13c5e7edd	refs/heads/evidence/pr-40
5609e091e38ab3219d7935eb86fabc327f361bc5	refs/heads/feat/lab-10-library
330aeff1deb65b5646381bc59ff52f6f62331f3d	refs/heads/feat/lab-authentication
0ae89efa082128d06187623780788831744592e1	refs/heads/feat/lab-d12-producer
7dc277cd557808fe1c9bee02fd5368e6a8ee3cef	refs/heads/feat/lab-database
695daea49f0c4aa981c89fa98af4b0ad3bd0ec15	refs/heads/feat/lab-root-sessions-eng3
ea80839611343664d596396a5bc52d0b5fda591d	refs/heads/feat/lab-runtime
2102b2ea604ad4f966253ecbce5b14be63094669	refs/heads/feat/oidc-authentication
2705199d15ea276e1a0a81ca189b3890852aaca0	refs/heads/feat/web-01-async-snapshot
d0e6679e24b167c86be34ec70969730f8323f40e	refs/heads/feat/web-02-lab-bridge
4177b0523d6eafab4636910e9549a536ac4b8186	refs/heads/feat/web-02-lab-wire
7e2370bcdc385140b663c203a06a7326a12b707e	refs/heads/fix/platform-notices
031d01c4f8ff5b0d8736ab9be4daaf9298d3ea08	refs/heads/main
978bc0e1a990f0c586d6e24cb24d99d960bad6c5|5a1229b65d034ab50e1f5a5e10fbcec67b453385|2026-11-01T15:05:39+09:00|2026-11-01T15:05:39+09:00|fix(lab): aside tab gap follows the new track wrapper
7046c521fefff4beb99e9b179909be54af3d7033|fc89bcd0c562cb205e25f627985580e92cfa1e12|2026-11-01T15:43:51+09:00|2026-11-01T15:43:51+09:00|fix(lab): preserve variadic and aliased node signatures
e88987ac954c450f62fff5a8aa967e92d32df0b3|7046c521fefff4beb99e9b179909be54af3d7033|2026-11-01T15:50:39+09:00|2026-11-01T15:50:39+09:00|fix(lab): label destructured inputs by argument position
ef57d037be18c65275f86e33a30f724e4cb337a7|e88987ac954c450f62fff5a8aa967e92d32df0b3|2026-11-01T15:54:41+09:00|2026-11-01T15:54:41+09:00|fix(lab): preserve required defaulted argument positions
5609e091e38ab3219d7935eb86fabc327f361bc5|ef57d037be18c65275f86e33a30f724e4cb337a7|2026-11-01T16:09:10+09:00|2026-11-01T16:09:10+09:00|fix(lab): align library exports and write grants with D10
6275a0a2ca3c0ec99f2a82241f42ddcd651d5cc9|16fe1f2d2ab06ec852da5b18345a8797a91a4710|2026-11-01T16:17:16+09:00|2026-11-01T16:17:16+09:00|feat(lab): 实现 D10 节点库静态导出与确认写入
cbcd94334aa8cc3187ecb9eb8bc5ffbed9b4e055|6275a0a2ca3c0ec99f2a82241f42ddcd651d5cc9|2026-11-01T16:25:52+09:00|2026-11-01T16:25:52+09:00|feat(web): 通过 loader 异步构造 Lab 服务 (#40)
2705199d15ea276e1a0a81ca189b3890852aaca0|16fe1f2d2ab06ec852da5b18345a8797a91a4710|2026-11-01T16:13:17+09:00|2026-11-01T16:13:17+09:00|feat(web): 通过 loader 异步构造 Lab 服务
12464701c02b8d50d32bad7f0fbf0cd13c5e7edd||2026-11-01T16:20:40+09:00|2026-11-01T16:20:40+09:00|docs(evidence): 保存 WEB-01 浏览器首页截图
16fe1f2d2ab06ec852da5b18345a8797a91a4710|85b66aecc6e6c969c0312f21ffdd73bf64b2a45c|2026-11-01T13:54:32+09:00|2026-11-01T13:54:32+09:00|feat(web): 落地 Lab 组织认证与真实登录
fc89bcd0c562cb205e25f627985580e92cfa1e12|a16390a0fa3f9582f0c689388cddc940f3cb5745|2026-11-01T14:11:07+09:00|2026-11-01T14:11:07+09:00|fix(lab): display sequences only for default-history ancestors
a3310574aef19ba4250df3bbd484583afee6814e|b212fb69b7ab3e1c87fe841eb8bf28277d921ae5 16fe1f2d2ab06ec852da5b18345a8797a91a4710|2026-11-01T16:00:26+09:00|2026-11-01T16:00:26+09:00|Merge remote-tracking branch 'origin/main'
031d01c4f8ff5b0d8736ab9be4daaf9298d3ea08|9a6d455cf86fb8be11f671c188114f67ad676e4c cbcd94334aa8cc3187ecb9eb8bc5ffbed9b4e055|2026-11-01T17:09:34+09:00|2026-11-01T17:09:34+09:00|Merge remote-tracking branch 'origin/main'

```

### 15个提交的点名父子文件差集（完整lossless输出）

下面每个`DIFF A B Pn`段对应一条实际命令`git diff --name-only A B`。

```text

DIFF 5a1229b 978bc0e P1
apps/web/src/renderer/platform/web/astryx-theme/ai4s.css
apps/web/src/renderer/platform/web/astryx-theme/ai4s.js
apps/web/src/renderer/platform/web/astryx-theme/ai4sTheme.ts
packages/ui/src/lab/lab.css

DIFF 978bc0e 2d46c1d P1
AI4S-prototype/AI4S-Automation-Hi-Fi.dc.html
AI4S-prototype/AI4S-Datasets-Hi-Fi.dc.html
apps/web/src/renderer/features/lab-automation/ui/automation-page.tsx
apps/web/src/renderer/features/lab-datasets/ui/datasets-page.tsx
apps/web/src/renderer/features/lab-navigation/ui/lab-navigation.tsx
apps/web/src/renderer/styles/lab/lab-navigation.css

DIFF 2d46c1d 286f8cb P1
AI4S-prototype/AI4S-Node-Library-Hi-Fi.dc.html

DIFF 286f8cb 1038aee P1
AI4S-prototype/AI4S-Experiment-Flow-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiments-Hi-Fi.dc.html
AI4S-prototype/AI4S-Flow-Editor-Hi-Fi.dc.html
AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html
AI4S-prototype/CLAUDE.md

DIFF 1038aee 21f4217 P1
AI4S-prototype/AI4S-Flow-Editor-Hi-Fi.dc.html

DIFF 21f4217 e44f068 P1
AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html
AI4S-prototype/CLAUDE.md
apps/web/src/renderer/platform/web/astryx-theme/ai4s.css
apps/web/src/renderer/platform/web/astryx-theme/ai4s.js
apps/web/src/renderer/platform/web/astryx-theme/ai4sTheme.ts
docs/conventions/04-css-and-design-system.md
packages/ui/src/lab/aside-tabs.tsx
scripts/check-design-tokens.mjs
scripts/check-design-tokens.test.mjs

DIFF e44f068 b212fb6 P1
AI4S-prototype/AI4S-Automation-Hi-Fi.dc.html
AI4S-prototype/AI4S-Connect-Cluster-Hi-Fi.dc.html
AI4S-prototype/AI4S-Datasets-Hi-Fi.dc.html
AI4S-prototype/AI4S-Sandbox-Clusters-Hi-Fi.dc.html
AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html

DIFF b212fb6 a331057 P1
AGENTS.md
NOTICE
README.md
apps/web/README.md
apps/web/auth-schema.config.ts
apps/web/bin/pepgent-lab-seed.mjs
apps/web/drizzle.config.ts
apps/web/package.json
apps/web/renderer-architecture.json
apps/web/resources/lab/migrations/0000_lab.sql
apps/web/resources/lab/migrations/meta/0000_snapshot.json
apps/web/resources/lab/migrations/meta/_journal.json
apps/web/resources/licenses/npm/BROCLI_LICENSE.txt
apps/web/resources/licenses/npm/DRIZZLE_ORM_LICENSE.txt
apps/web/resources/licenses/npm/FSEVENTS_LICENSE.txt
apps/web/resources/licenses/npm/LUKEED_MIT_LICENSE.txt
apps/web/resources/licenses/npm/MIT_SPDX_LICENSE.txt
apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt
apps/web/src/app/routeTree.gen.ts
apps/web/src/app/routes/_lab.tsx
apps/web/src/app/routes/api/auth/$.ts
apps/web/src/app/routes/sign-in.tsx
apps/web/src/app/server.ts
apps/web/src/app/start.ts
apps/web/src/client/contracts/lab-auth.ts
apps/web/src/client/services/lab-auth.ts
apps/web/src/client/services/lab.ts
apps/web/src/client/services/pepgent-services.ts
apps/web/src/protocol/errors.ts
apps/web/src/protocol/lab/auth.ts
apps/web/src/protocol/routes.ts
apps/web/src/renderer/README.md
apps/web/src/renderer/application/contracts/destination.ts
apps/web/src/renderer/bootstrap/lab-sign-in-entry.tsx
apps/web/src/renderer/bootstrap/renderer-services.ts
apps/web/src/renderer/composition/lab-sign-in-app.tsx
apps/web/src/renderer/features/lab-sign-in/index.ts
apps/web/src/renderer/features/lab-sign-in/model/sign-in-contracts.ts
apps/web/src/renderer/features/lab-sign-in/ui/lab-sign-in-page.tsx
apps/web/src/renderer/locales/lab-sign-in-copy.ts
apps/web/src/renderer/platform/web/create-lab-services.ts
apps/web/src/renderer/platform/web/create-lab-sign-in-services.ts
apps/web/src/server/host.ts
apps/web/src/server/lab/access.ts
apps/web/src/server/lab/auth-configuration.ts
apps/web/src/server/lab/auth-schema.ts
apps/web/src/server/lab/auth.ts
apps/web/src/server/lab/database.ts
apps/web/src/server/lab/organization.ts
apps/web/src/server/lab/runtime.ts
apps/web/src/server/lab/schema.ts
apps/web/src/server/lab/seed.ts
apps/web/src/server/operations/run.ts
apps/web/src/server/runtime-host.ts
apps/web/src/server/transport/trust.ts
apps/web/tests/node/host-boundaries.test.ts
apps/web/tests/node/lab-auth.test.ts
apps/web/tests/node/lab-runtime.test.ts
apps/web/tests/smoke.md
apps/web/tests/vitest/lab-return-path.test.ts
apps/web/vite-lab-migrations.ts
apps/web/vite-server-runtime.ts
apps/web/vite.config.ts
docs/astryx-surface-file-inventory.md
docs/astryx-surface-file-inventory.paths
docs/conventions/01-repo-layout-and-layering.md
docs/conventions/03-typescript-react-style.md
docs/conventions/05-testing-tiers.md
docs/conventions/06-toolchain-and-gates.md
package-lock.json
scripts/generate-third-party-notices.mjs
scripts/generate-third-party-notices.test.mjs
scripts/third-party-closure.mjs

DIFF 16fe1f2 a331057 P2
AI4S-prototype/AI-Panel.dc.html
AI4S-prototype/AI4S-Automation-Hi-Fi.dc.html
AI4S-prototype/AI4S-Connect-Cluster-Hi-Fi.dc.html
AI4S-prototype/AI4S-Container-Settings-Hi-Fi.dc.html
AI4S-prototype/AI4S-Datasets-Hi-Fi.dc.html
AI4S-prototype/AI4S-Discussions-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiment-Flow-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiments-Hi-Fi.dc.html
AI4S-prototype/AI4S-Flow-Editor-Hi-Fi.dc.html
AI4S-prototype/AI4S-Lab-Home-Hi-Fi.dc.html
AI4S-prototype/AI4S-Lab-Prototype.dc.html
AI4S-prototype/AI4S-Node-Library-Hi-Fi.dc.html
AI4S-prototype/AI4S-Sandbox-Clusters-Hi-Fi.dc.html
AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html
AI4S-prototype/Action-Dialog.dc.html
AI4S-prototype/CLAUDE.md
AI4S-prototype/Lab-Sidebar.dc.html
AI4S-prototype/lab-space.css
apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt
apps/web/src/renderer/features/lab-automation/ui/automation-page.tsx
apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx
apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx
apps/web/src/renderer/features/lab-containers/controller/use-containers-controller.ts
apps/web/src/renderer/features/lab-containers/model/containers-state.ts
apps/web/src/renderer/features/lab-containers/model/containers-view-model.ts
apps/web/src/renderer/features/lab-containers/ui/containers-page.tsx
apps/web/src/renderer/features/lab-datasets/ui/datasets-page.tsx
apps/web/src/renderer/features/lab-discussions/model/discussions-view-model.ts
apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx
apps/web/src/renderer/features/lab-experiment-detail/model/experiment-detail-view-model.ts
apps/web/src/renderer/features/lab-experiment-detail/ui/experiment-detail-page.tsx
apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx
apps/web/src/renderer/features/lab-flow-editor/model/flow-editor-view-model.ts
apps/web/src/renderer/features/lab-flow-editor/ui/flow-editor-page.tsx
apps/web/src/renderer/features/lab-home/ui/home-page.tsx
apps/web/src/renderer/features/lab-navigation/ui/lab-navigation.tsx
apps/web/src/renderer/features/lab-node-library/ui/node-library-page.tsx
apps/web/src/renderer/features/lab-settings/model/settings-view-model.ts
apps/web/src/renderer/features/lab-settings/ui/settings-page.tsx
apps/web/src/renderer/platform/web/astryx-theme/ai4s.css
apps/web/src/renderer/platform/web/astryx-theme/ai4s.js
apps/web/src/renderer/platform/web/astryx-theme/ai4sTheme.ts
apps/web/src/renderer/styles/lab/lab-automation.css
apps/web/src/renderer/styles/lab/lab-clusters.css
apps/web/src/renderer/styles/lab/lab-connect-cluster.css
apps/web/src/renderer/styles/lab/lab-containers.css
apps/web/src/renderer/styles/lab/lab-datasets.css
apps/web/src/renderer/styles/lab/lab-discussions.css
apps/web/src/renderer/styles/lab/lab-experiment-detail.css
apps/web/src/renderer/styles/lab/lab-experiments.css
apps/web/src/renderer/styles/lab/lab-flow-editor.css
apps/web/src/renderer/styles/lab/lab-home.css
apps/web/src/renderer/styles/lab/lab-navigation.css
apps/web/src/renderer/styles/lab/lab-node-library.css
apps/web/src/renderer/styles/lab/lab-settings.css
apps/web/src/renderer/styles/lab/lab-shell.css
apps/web/src/renderer/styles/lab/lab-tokens.css
apps/web/tests/vitest/lab-containers-view-model.test.ts
apps/web/tests/vitest/lab-discussions-view-model.test.ts
apps/web/tests/vitest/lab-experiment-detail-view-model.test.ts
apps/web/tests/vitest/lab-flow-editor-view-model.test.ts
docs/conventions/04-css-and-design-system.md
docs/conventions/06-toolchain-and-gates.md
package-lock.json
package.json
packages/ui/src/lab/action-dialog.css
packages/ui/src/lab/action-dialog.tsx
packages/ui/src/lab/ai-panel.css
packages/ui/src/lab/aside-tabs.tsx
packages/ui/src/lab/change-rows.css
packages/ui/src/lab/dag-canvas-model.ts
packages/ui/src/lab/dag-canvas.css
packages/ui/src/lab/dense-table.css
packages/ui/src/lab/dense-table.tsx
packages/ui/src/lab/index.ts
packages/ui/src/lab/lab-page-frame.tsx
packages/ui/src/lab/lab.css
packages/ui/src/lab/page-toolbar.tsx
packages/ui/src/lab/time-axis.css
packages/ui/src/lab/time-axis.tsx
scripts/check-design-tokens.mjs
scripts/check-design-tokens.test.mjs
scripts/generate-lab-space-css.mjs

DIFF a331057 f35103b P1
AI4S-prototype/AI4S-Automation-Hi-Fi.dc.html
AI4S-prototype/AI4S-Connect-Cluster-Hi-Fi.dc.html
AI4S-prototype/AI4S-Container-Settings-Hi-Fi.dc.html
AI4S-prototype/AI4S-Datasets-Hi-Fi.dc.html
AI4S-prototype/AI4S-Discussions-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiment-Flow-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiments-Hi-Fi.dc.html
AI4S-prototype/AI4S-Flow-Editor-Hi-Fi.dc.html
AI4S-prototype/AI4S-Lab-Home-Hi-Fi.dc.html
AI4S-prototype/AI4S-Node-Library-Hi-Fi.dc.html
AI4S-prototype/AI4S-Sandbox-Clusters-Hi-Fi.dc.html
AI4S-prototype/CLAUDE.md
docs/conventions/04-css-and-design-system.md
scripts/check-design-tokens.mjs
scripts/check-design-tokens.test.mjs

DIFF f35103b f7a3313 P1
AI4S-prototype/AI4S-Experiment-Flow-Hi-Fi.dc.html
AI4S-prototype/AI4S-Sandbox-Clusters-Hi-Fi.dc.html

DIFF f7a3313 a9756eb P1
AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html
apps/web/src/renderer/styles/lab/lab-navigation.css

DIFF a9756eb d110c7c P1
AI4S-prototype/AI4S-Datasets-Hi-Fi.dc.html
AI4S-prototype/CLAUDE.md
docs/conventions/04-css-and-design-system.md
scripts/check-design-tokens.mjs
scripts/check-design-tokens.test.mjs

DIFF d110c7c e83c2f2 P1
apps/web/src/renderer/styles/lab/lab-navigation.css

DIFF e83c2f2 9a6d455 P1
AI4S-prototype/AI4S-Discussions-Hi-Fi.dc.html
AI4S-prototype/CLAUDE.md
AI4S-prototype/Lab-Sidebar.dc.html
docs/conventions/04-css-and-design-system.md
scripts/check-design-tokens.mjs
scripts/check-design-tokens.test.mjs

DIFF 9a6d455 031d01c P1
apps/web/README.md
apps/web/package.json
apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt
apps/web/src/app/routes/_lab.tsx
apps/web/src/app/start.ts
apps/web/src/client/services/lab.ts
apps/web/src/protocol/lab/library-store.ts
apps/web/src/protocol/lab/library.ts
apps/web/src/renderer/README.md
apps/web/src/renderer/bootstrap/lab-entry.tsx
apps/web/src/renderer/bootstrap/renderer-services.ts
apps/web/src/renderer/platform/web/create-lab-services.ts
apps/web/src/rpc/lab.ts
apps/web/src/server/lab/access.ts
apps/web/src/server/lab/library-definition.ts
apps/web/src/server/lab/library-operations.ts
apps/web/src/server/lab/library.ts
apps/web/src/server/lab/runtime.ts
apps/web/tests/node/lab-auth.test.ts
apps/web/tests/node/lab-library-definition.test.ts
apps/web/tests/node/lab-runtime.test.ts
docs/conventions/01-repo-layout-and-layering.md
package-lock.json
scripts/generate-third-party-notices.mjs
scripts/generate-third-party-notices.test.mjs

DIFF cbcd943 031d01c P2
AI4S-prototype/AI-Panel.dc.html
AI4S-prototype/AI4S-Automation-Hi-Fi.dc.html
AI4S-prototype/AI4S-Connect-Cluster-Hi-Fi.dc.html
AI4S-prototype/AI4S-Container-Settings-Hi-Fi.dc.html
AI4S-prototype/AI4S-Datasets-Hi-Fi.dc.html
AI4S-prototype/AI4S-Discussions-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiment-Flow-Hi-Fi.dc.html
AI4S-prototype/AI4S-Experiments-Hi-Fi.dc.html
AI4S-prototype/AI4S-Flow-Editor-Hi-Fi.dc.html
AI4S-prototype/AI4S-Lab-Home-Hi-Fi.dc.html
AI4S-prototype/AI4S-Lab-Prototype.dc.html
AI4S-prototype/AI4S-Node-Library-Hi-Fi.dc.html
AI4S-prototype/AI4S-Sandbox-Clusters-Hi-Fi.dc.html
AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html
AI4S-prototype/Action-Dialog.dc.html
AI4S-prototype/CLAUDE.md
AI4S-prototype/Lab-Sidebar.dc.html
AI4S-prototype/lab-space.css
apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt
apps/web/src/renderer/features/lab-automation/ui/automation-page.tsx
apps/web/src/renderer/features/lab-clusters/ui/clusters-page.tsx
apps/web/src/renderer/features/lab-connect-cluster/ui/connect-cluster-page.tsx
apps/web/src/renderer/features/lab-containers/controller/use-containers-controller.ts
apps/web/src/renderer/features/lab-containers/model/containers-state.ts
apps/web/src/renderer/features/lab-containers/model/containers-view-model.ts
apps/web/src/renderer/features/lab-containers/ui/containers-page.tsx
apps/web/src/renderer/features/lab-datasets/ui/datasets-page.tsx
apps/web/src/renderer/features/lab-discussions/model/discussions-view-model.ts
apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx
apps/web/src/renderer/features/lab-experiment-detail/model/experiment-detail-view-model.ts
apps/web/src/renderer/features/lab-experiment-detail/ui/experiment-detail-page.tsx
apps/web/src/renderer/features/lab-experiments/ui/experiments-page.tsx
apps/web/src/renderer/features/lab-flow-editor/model/flow-editor-view-model.ts
apps/web/src/renderer/features/lab-flow-editor/ui/flow-editor-page.tsx
apps/web/src/renderer/features/lab-home/ui/home-page.tsx
apps/web/src/renderer/features/lab-navigation/ui/lab-navigation.tsx
apps/web/src/renderer/features/lab-node-library/ui/node-library-page.tsx
apps/web/src/renderer/features/lab-settings/model/settings-view-model.ts
apps/web/src/renderer/features/lab-settings/ui/settings-page.tsx
apps/web/src/renderer/platform/web/astryx-theme/ai4s.css
apps/web/src/renderer/platform/web/astryx-theme/ai4s.js
apps/web/src/renderer/platform/web/astryx-theme/ai4sTheme.ts
apps/web/src/renderer/styles/lab/lab-automation.css
apps/web/src/renderer/styles/lab/lab-clusters.css
apps/web/src/renderer/styles/lab/lab-connect-cluster.css
apps/web/src/renderer/styles/lab/lab-containers.css
apps/web/src/renderer/styles/lab/lab-datasets.css
apps/web/src/renderer/styles/lab/lab-discussions.css
apps/web/src/renderer/styles/lab/lab-experiment-detail.css
apps/web/src/renderer/styles/lab/lab-experiments.css
apps/web/src/renderer/styles/lab/lab-flow-editor.css
apps/web/src/renderer/styles/lab/lab-home.css
apps/web/src/renderer/styles/lab/lab-navigation.css
apps/web/src/renderer/styles/lab/lab-node-library.css
apps/web/src/renderer/styles/lab/lab-settings.css
apps/web/src/renderer/styles/lab/lab-shell.css
apps/web/src/renderer/styles/lab/lab-tokens.css
apps/web/tests/vitest/lab-containers-view-model.test.ts
apps/web/tests/vitest/lab-discussions-view-model.test.ts
apps/web/tests/vitest/lab-experiment-detail-view-model.test.ts
apps/web/tests/vitest/lab-flow-editor-view-model.test.ts
docs/conventions/04-css-and-design-system.md
docs/conventions/06-toolchain-and-gates.md
package-lock.json
package.json
packages/ui/src/lab/action-dialog.css
packages/ui/src/lab/action-dialog.tsx
packages/ui/src/lab/ai-panel.css
packages/ui/src/lab/aside-tabs.tsx
packages/ui/src/lab/change-rows.css
packages/ui/src/lab/dag-canvas-model.ts
packages/ui/src/lab/dag-canvas.css
packages/ui/src/lab/dense-table.css
packages/ui/src/lab/dense-table.tsx
packages/ui/src/lab/index.ts
packages/ui/src/lab/lab-page-frame.tsx
packages/ui/src/lab/lab.css
packages/ui/src/lab/page-toolbar.tsx
packages/ui/src/lab/time-axis.css
packages/ui/src/lab/time-axis.tsx
scripts/check-design-tokens.mjs
scripts/check-design-tokens.test.mjs
scripts/generate-lab-space-css.mjs
```

## 交付边界

本步交付为**只读预审资料**，不是“回退已完成”或“保护名单已经过运行回退验证”。未编写或运行测试/build/lint/runtime；本任务没有业务代码改动，核验是所要求的对象只读取证与同文件比较，不以hash验证替代。未联系任何agent/会话、未运行git log/reflog、未读被禁止的旧session、未读取GitHub编辑历史或timeline。后续由派发者将本包交Argon与ArgonGovernance预审；第③步以及独立核验均未在本轮执行。
