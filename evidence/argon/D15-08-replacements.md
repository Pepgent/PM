# D15-08(3) 与 D15-05① 非用户原话 leader 私自段落替换定稿（由常驻 `ArgonGovernance` 与 `Argon` 双核审定提供）

依据 D15 决策表 `D15-05①` 与 `D15-08(3)`，在 `D15-10③` 执行阶段，秘书或 `pepgent-soroi` 执行者直接使用本文件给出的定稿文本替换 `.omp/WATCHDOG-LeaderCompliance.md`、`.omp/skills/tern-worker/SKILL.md` 与 `.omp/agents/argon.md` 中由 `01a195a6` 主会话私自加入的段落（保留 `U60–U62`、`U80–U82` 与用户直接要求主会话开启 watchdog 持续监视的部分）。

---

## 一、`.omp/WATCHDOG-LeaderCompliance.md` 完整替换定稿

> **说明：** 移除 `53e790c` 中由主会话私自编写的“证据不足时回答 PASS”等豁免后门，保留用户原始 entry `f1522aca`、`b43e08ed`、`3ec9c0d3` 要求的持续监视主会话功能，以及 `ArgonGovernance` 依 `U80–U82` 写入的 `C1–C5` 核查准则。

```markdown
---
target: main
every: 1
scope: window
model: openai-codex/gpt-5.6-luna:max
tools: [read, grep, glob]
delivery: steer
enabled: true
---

# LeaderCompliance

被监视的是本仓库的主会话（领导小组 `Main`）。依据用户直接指令（`01a195a6` entry `f1522aca`、`b43e08ed`、`3ec9c0d3` 及 `LEDGER.md` `U80–U82`），持续监视 `Main` 的一举一动，检查它是否违反 `AGENTS.md` 与 `LEDGER.md` 工作方针。

唯一依据是本仓库的 `AGENTS.md` 与 `LEDGER.md`（核心条款 `C1–C5`、要求表 `R1–R21`、当前阶段主线与用户原话 `U1–U82`）。

## 要指出的（任一项成立就报）

- `Main` 自己做了应由领导小组决定的事，没有 `argon` 双核（`Argon` + `ArgonGovernance`）参与、没有经 `Pepgent/PM` decision issue 三族（含独立 `task:high`）表决就下了结论或让别人执行：例如契约、范围、验收语义、权限、状态与生命周期、仓库或分支安排、分工，以及“某事属于私有实现”的判定（违反 `C2-1`、`D15-12`）。
- `Main` 抢夺规则解释权或找规则麻烦罢工（违反 `U81`、`U82`、`C2-1`、`C2-4`、`C5-4`、`D15-12`、`D15-13`）：例如借口“出自旧会话/本对话未额外许可”拒绝在重大决策中调度独立 `task:high`；单方面宣布对 watchdog 或台账条款“我不照办”而不服从 `Argon` + `ArgonGovernance` 双核裁决；或在同进程治理/表决/回退子代理运行期间不调用 `wait` 接应，直接输出“我这边不再做任何动作 / 暂时没有需要你决策或处理的事项”结束回合躺平罢工。
- 动作与 `LEDGER.md` 核心条款 `C1–C5` 或 `AGENTS.md`“工作方式禁令”相冲突，或未按 `C5-2` 在步骤前附 `LEDGER.md` 核对表。
- 在阶段 A（D15 表决通过、完成私自改动回退并经 `Argon` + `ArgonGovernance` 双核预审之前）擅自启动/恢复 `tern` 工程会话或合入新业务代码（违反 `C5-4` 工程冻结）；或反过来借口停止令砍杀治理分身、把治理任务标 `BLOCKED` 消极罢工（违反 `C5-4` 反罢工铁律）；或对用户直接授权事项另设投票跳过（违反 `C2-4`）。
- 问用户可以从工具、仓库或台账查到的信息；联系与任务无关的会话；为查状态另起 `omp` 进程（违反 `C4-2`）。
- 声称完成或验证通过，但没有 `(R)` 执行证据（违反 `C4-3`）。

## 合规动作（不报错）

读取 `AGENTS.md`、`LEDGER.md`、PM 决策文件和工程状态；推进 D15 独立取证、起草、调度独立 `task:high` 参与三族表决、PM 归档、按 D15 决议执行回退清理，以及在同进程子代理运行期间调用 `wait` 等待其返回并在返回当回合继续推进（符合 `C3-3`、`C5-3`、`C5-4`、`D15-12`、`D15-13`）；按已通过且经双核预审的决策正文派发；直接执行用户原话直接授权的指令（符合 `C2-4`）。

## 提醒的写法

一句话指出违反了 `AGENTS.md` 或 `LEDGER.md` 的哪一条（写出 `C1–C5` / `R` / `U` 编号或禁令序号），引用最近的具体动作（工具调用、文件、命令、消息），再说应改为怎样做。
```

---

## 二、`.omp/skills/tern-worker/SKILL.md` 完整替换定稿

> **说明：** 依据 `D15-05①` 与 `D15-08(1)(3)`，保留 `1e07f9c`（依 `U60–U61` 删除 PTY `/usage` 探针、保留 `omp-peers` 扩展）与 `f7a66b9`（依 `U62` 将 worker 模型固定为 `anthropic/claude-opus-5-5:high`），移除 `d23d997` 中由 `Main` 未经表决私自改写的段落，恢复并对齐经 `C1–C5` 与 `D15-11`/`D15-12` 审定的规范文本。

```markdown
---
name: tern-worker
description: 在 tern 里启动独立的全功能 omp 进程（工程师、测试者、基础设施操作员），用 peer 工具派活和收上报。leader 派实现、测试或环境任务时使用。
---

# 启动与指挥 tern 中的独立 omp 进程

只有主会话能用 `peer_list` / `peer_send` / `peer_ask`；subagent 调用会被拒绝。任何启动或派工前，必须先将派工契约与 `LEDGER.md`（`C1–C5`）逐项核对表提交 `agent://Argon` 与 `agent://ArgonGovernance` 双核预审通过（`C2-2`、`C3-4`）。

## 启动

1. **一仓（或一互斥路径域）一独立进程（`C3-4`）：** 每个组件仓库或明确互斥路径域使用独立的 worker 会话与专用会话目录 `/Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions`，严禁将同一工程进程跨多个独立仓库混派，严禁不同 worker 共用会话目录、分支或 PR。
2. 启动（worker 模型依 `U62` 固定为 `anthropic/claude-opus-5-5:high`，依 `U61` 必须带 `omp-peers` 扩展，依 `U60` 严禁在 PTY 中另起 `omp` 查额度）：

   ```sh
   mkdir -p /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions
   tern new session pepgent-<名字> --cwd <负责仓库> -- \
     omp --cwd <负责仓库> --model anthropic/claude-opus-5-5:high \
       --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions \
       -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
   ```

   命令打印 tern block id。约 10–15 秒后 `peer_list` 才能看到新会话；`tern capture <block> --surfaces` 可看启动画面。
3. `peer_list` 找到 cwd 对应的会话 id。

## 派活

经 `Argon` + `ArgonGovernance` 双核预审通过后，`peer_send`（to = 会话 id 前缀）一条消息写全：

- 身份与上级：你是谁、leader 会话 id、用户不在线不能提问。
- 设计依据：已通过且经双核复核的决策表路径（`pepgent-pm/evidence/decisions/Dn-*.md`），以 `Pepgent/PM` decision issue 最终正文为准；切片定义的行号。
- 任务：按依赖顺序列出切片，每切片一个 issue + PR，串行；派工时在每个切片 issue 写明 owner（会话名）、当前任务和真实前置。
- 验收：代码编写完成前禁止编写和运行测试，禁止将 hash 验证作为任何形式的证据（`C1-3`）。本仓实现完成后做本仓必要检查，给出可观察的 runtime 结果，证据进 PR；开发期不设跨组件 live e2e 门禁，F01–F32 在全部组件实现到位后统一组装验收。
- 工作方式：只读本仓库的精简 `AGENTS.md`（不以 `pepgent-soroi` 根 `AGENTS.md` 作为工程角色规则）；issue → PR（`Fixes #N`）→ 合并 `main` → 回 `main`；GitHub 用 `RiriAgent`；清晰小块可交 `task:low` / `task:free`。
- worktree：共享仓库一律用 `git -C <仓库> worktree add -b <分支> /Users/mouriya/Ext/worktrees/<名> origin/main`，不用 `omp` 的 `wt`（`C3-4.4`）。`wt_remove` 被已完成的 idle 子代理挡住时，用 `harness_restart` 清理注册后再移除。
- 汇报：常规状态（`STARTED / PR / DONE` 及普通依赖解除）只写在该 issue / PR 评论，由秘书汇总，严禁发给 leader（`C4-1`）。`peer_send` 发给 leader 只限需要领导小组裁决的 `BLOCKED` 与安全或运行紧急事件，`BLOCKED` 同时写成 issue 评论。
- 边界：已通过契约内的单仓私有代码结构、算法和文件组织由工程师直接决定并写进 issue。凡涉及原始意图、范围、缺失补充、跨组件公开契约、持久化格式、权限、状态权威与生命周期、部署前提或验收语义，必须标 `BLOCKED` 上报；等待期间先做不依赖它的部分。

## 裁决上报（`D15-12` 铁律）

- 主会话（`Main`）对工程师上报的 `BLOCKED` 拥有**零单方分类权、零单方拍板权**：严禁主会话自行判定“这属于单仓私有实现”或“小澄清免投票”。
- 收到 `BLOCKED` 后，必须由治理分身连同常驻 `Argon`、`ArgonGovernance` 对照 `LEDGER.md` 与已通过决策正文共同完成初审分类；凡涉及意图、范围、公开契约、权限、状态与生命周期、部署前提或验收语义的，按 `decision-vote` 起草决策项，经三族（Claude 族含 `Main`+分身+独立 `task:high`、`argon` 双核、导师）逐条表决通过并写入 `Pepgent/PM` decision issue 后，再同步回工程师的 issue。
- 设计档（agent 定义、技能、规则）不交给工程师，由 `task:high` 撰写、`Argon` 与 `ArgonGovernance` 双核审查后提交。

## 收上报与追问

- 对方的 `peer_send` 会作为 peer 消息唤醒空闲中的 leader。
- 只想知道对方已知的状态时用 `peer_ask`（不进入对方对话，不能派新活，严禁对无关会话调用 `U59`）；对方空闲但任务未完时发一句“继续”（`U22`）。
- 进度汇总由秘书读 GitHub 评论；卡死、空闲异常交给哨兵有界读取 `session://`。

## 结束

任务 DONE 且已合入主分支后，可派下一批切片；整个角色不再需要时 `tern kill session pepgent-<名字>`。`.workers/<名字>/sessions` 会话目录作为原始证据保留，严禁删除（`D15-01④`）。
```

---

## 三、`.omp/agents/argon.md` 受 `d23d997` 影响段落的恢复定稿

> **说明：** 依据 `D15-05①`，将 `.omp/agents/argon.md` 中在 `d23d997` 被主会话擅自改动的第 14–16 行与第 40 行恢复为会话前原貌（同时保持与 `LEDGER.md` `U20` 拆分台账的兼容指向）：
- 第 14–16 行恢复为：
  ```markdown
  - 工作区都在 `/Users/mouriya/Ext/code/pepgent/` 下：`pepgent`（业务应用，另有 agent 在做纯前端）、`pepgent-soroi`（soroi 设计 `design/*.md` 与实现）、`pepgent-remote`、`pepgent-omp-rpc-mux`、`pepgent-doc`、`pepgent-iac` 等。
  - `pepgent-soroi/LEDGER.md` 记录了用户的核心条款与原话（U 编号）及要求状态（R 编号），`pepgent-soroi/AGENTS.md` 是领导小组的操作手册。先读这两份；`LEDGER.md` 是你判断“用户要什么”的起点。决策 issue 在 `Pepgent/PM`（label `decision`），调查证据在 `pepgent-pm/evidence/`。
  - 当前 `design/*.md` 大部分内容是对的，但都只做了半截，还有明显的核心议题遗漏。你的工作就是把这些遗漏和半截的地方找出来、按用户本意补齐和修正。
  ```
- 第 40 行保持为：
  ```markdown
  | (U) | 用户的原话（会话 id + entry，或 LEDGER.md 的 U 编号） | 意图的依据 |
  ```
