# 阶段 B 第 1 批发车记录（D16 / PM#25，按 D16-12 抄送双核）

## LEDGER 核对（`8bfd70c`）

`git pull --ff-only` 的结果为 `Already up to date.`。

| 条款或要求 | 核对结果 |
| --- | --- |
| C1-2 | 一仓一席，共四个独立仓 |
| C1-3 | 先实现，后写测试；不设 live 门禁 |
| C2-1 | 主会话不裁定 BLOCKED |
| C3-4.2 | 模型为 Opus 5.5 high，带 omp-peers |
| C3-4.4、R9 | 切片 worktree 一律用 `-b … origin/main` 建立。home worktree 按 D16-09 定稿用 `--detach`，不检出 main，也不承载提交 |
| C4-1 | 常规状态只走 issue/PR |
| C5-4 | D16 已通过，按 D16-12 解除冻结 |
| R8、R9 | 状态 🏗 |
| R21 | 由秘书按 D16-14 替换 |

## 执行的命令与 (R)

| 席位 | home worktree | tern session id | peer 会话 |
| --- | --- | --- | --- |
| W-06 pepgent-store | `git -C …/pepgent-soroi worktree add --detach /Users/mouriya/Ext/worktrees/pepgent-store-home origin/main` → detached HEAD 8bfd70c | 662588899721219 | 01a19731-555c（pid 8051） |
| W-05 pepgent-library | `git -C …/pepgent-lab-library worktree add --detach …/pepgent-library-home origin/main` → bf32cf2 | 662593194688515 | 01a19731-5fad（pid 8072） |
| W-01 pepgent-mux | `git -C …/pepgent-omp-rpc-mux worktree add --detach …/pepgent-mux-home origin/main` → cd11f31 | 662597489655811 | 01a19731-698d（pid 8108） |
| W-02 pepgent-remote | `git -C …/pepgent-remote worktree add --detach …/pepgent-remote-home origin/main` → 1c2408d | 662606079590403 | 01a19731-73dc（pid 8164） |

每个席位的启动命令都是：`tern new session pepgent-<S> --cwd /Users/mouriya/Ext/worktrees/pepgent-<S>-home -- omp --cwd <同上> --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/pepgent-<S>/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts`。

四条首发 `peer_send` 都按 D16-11 的六段格式书写，内容与 `local://exec/phaseB/wave1.md` 第三节一致。W-06 的 A2-10、W-02 的 A2-01 在秘书建好 issue 之前，先以 PM#25 的行号为依据。

## 待记事实

watchdog LeaderCompliance 指出，home worktree 使用 `--detach`，与 AGENTS.md 和 C3-4.4 中 `-b` 的字面写法不一致。

本次按已通过的 D16-09 定稿执行。D16-09 的取舍栏写明 home 为 detached；双核投了赞成，主会话在第 3 轮选票中也已把这一点列为非阻断意见。四棵 home 都不检出 main，也不承载任何提交；所有切片分支都用 `-b` 建立。

主会话不另行改动已通过的定稿。
