# 阶段 B 一仓一进程恢复派工方案（主会话起草，并入 D16 表决）

起草依据：
- ArgonGovernance 与 Argon 的统一裁定：派工方案并入 D16，由主会话立即起草。
- `local://argon/phaseB-review-governance.md` 第三节（冻结对象处置）与第四节（席位矩阵 W-01..W-10、预审标准 G-1..G-7）。
- `local://argon/phaseB-review-argon.md`。

本方案只定派工的结构，不改动任何席位的路径域和首发任务；这两项以 ArgonGovernance 的 G-1 矩阵原文为准，在此不复述。

## 一、本步 LEDGER（`8bfd70c`）逐项核对

| 条款 / 要求 | 核对 |
| --- | --- |
| C1-1 | 席位只实现 soroi 定制与独立组件，不改 omp 宿主，不引入 omomp 的 fork、tern、watchdog 等设计 |
| C1-2 | W-01..W-05 各占一个独立仓；仓 A `Pepgent/soroi-store`、仓 B `Pepgent/omp-soroi` 已存在并按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) 留存；W-06 经 [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345) 导入 store，W-07 经 [A2-03 / soroi#346](https://github.com/Pepgent/soroi/issues/346) 导入定制与发行，快照后各自唯一写源为目标仓；W-08 按 D53-05 v3 承载 soroi 的 e2e、根文件与 compose 切换；W-09、W-10 在两份独立克隆中工作，不碰 Pepgent 根 checkout，也不联系无关会话 |
| C1-3 | 开发期各仓只做本仓检查，不设跨组件 live 门禁；代码写完之前不写、不跑测试；hash 比对不作证据。W-08 排在最后一波，等实现代码合入后才编写 E2E spec |
| C1-4 | 测试只用 OrbStack 隔离环境，不碰生产，不解密 SOPS |
| C2-1 | 主会话不裁决 BLOCKED 和分类，这两项按 D15-12 交治理分身与双核；契约空白交三族表决 |
| C2-2 | 双核对 D16 逐条表决，即同时完成派工方案预审；每个波次启动前，双核再核对具体命令 |
| C2-3 | 本方案作为 D16 决策项，三族逐条表决，Claude 族包含独立 task:high |
| C2-4 | 席位命令按 U61、U62 固定，不另立表决 |
| C3-1、C3-2 | 席位内部的 subagent 由工程师自己派生；治理事务交给分身 |
| C3-3 | D16 经过 steady 与 divergent 压力测试 |
| C3-4 | 一仓（一路径域）一进程；模型固定为 Opus 5.5 high，保留 omp-peers；不跨仓混派，不共用分支；用 `git worktree add -b <分支> <路径> origin/main`；主会话停在 soroi main |
| C3-5 | 本方案不修改 skill 或 agent 定义 |
| C4-1 | 常规状态只写 issue 或 PR 评论，不用 peer_send 发给 Main；秘书汇总，哨兵扫描异常 |
| C4-2 | peer_send 只用于首次派活、需要表决的 BLOCKED、紧急事件；全程中文；不在 PTY 里另起 omp |
| C4-3 | 派工命令与核对表归档到 PM，LEDGER 只替换状态行 |
| C5-1 | 不读 `01a193fd`；工程师会话目录用新名字，旧 `.workers/eng-*` 作为 D15 证据原样保留 |
| C5-2 | 每个波次附本表的波次版 |
| C5-3 | 第三节所列 9 个冻结目录永久不用；mux 草稿按第三节第 1 条还原 8 行 |
| C5-4 | 进入第三节的启动程序前，工程冻结继续有效 |
| 迁仓执行（C1-2、U121） | Pepgent 组件仓的 org 为 Pepgent，不是决策项；两仓按 D53-01 v2 留存，Main 按 D53-02 v3 初始化 main，导入与切换按 D53-03..06 的真实承载推进，不因回写等待 |
| R8、R9 | 保持 🏗。启动参数输出只证明该席位的命令符合 G-2，不足以证明一仓一进程、异步总线与分支纪律已经执行；要等拥有方提供完整的真实运行证据（各席位的 issue/PR 总线记录、分支与 worktree 纪律），才能分别升级为 ✅（C4-3） |
| R13–R15 | 由各席位合法重做被回退的切片 |
| R16、R17 | 阶段 C、D，不在本方案范围 |
| R21 | 🔄，本方案是 R21 的派工部分 |

## 二、决策项（交 PhaseBClone 并入 D16）

| ID | what | where | how | 取舍 | 分类 |
| --- | --- | --- | --- | --- | --- |
| P-1 | 席位矩阵 | 10 个 tern 席位 | 原样采用 phaseB-review-governance 第四节 G-1 的 W-01..W-10：会话名、`--cwd`、互斥写入路径域、承接的遗产与首发任务均照录。每个席位的 PM 契约行号由 D16 定稿后填入派工消息 | 得到：路径不重叠，与 C1-2、C3-4 一致。放弃：soroi 三个域在迁仓前共用一个仓，靠路径白名单约束 | 串联 |
| P-2 | 启动命令 | 每个席位 | `tern new session <会话名> --cwd <G-1 cwd> -- omp --cwd <G-1 cwd> --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<会话名>/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts`。W-09、W-10 启动前，先按 G-3 用 `gh repo clone` 建两份独立克隆 | 得到：U61、U62、G-2 逐字满足 | 实现 |
| P-3 | 波次与并发 | 主机内存 | 同时活跃的席位不超过 3 个（G-6，OS 看门狗 01a1943c 已报内存 warn）。按下面的队列滚动启动：一个席位的任务全部合入 main 后，立即 `tern kill session` 该席位（保留会话目录），再启动队列中的下一个。第 1 波：W-09 lab（先落地 `src/protocol/lab/**`）、W-07 plugin、W-06 store，这三席是依赖链最长和下游消费的起点。队列：W-01 mux → W-02 remote → W-05 library → W-03 images → W-04 deploy → W-10 web（启动条件：W-09 的协议已合入 Pepgent main，这是路径域唯一写方的约束，不是 live 门禁）→ W-08 e2e（启动条件：W-06、W-07、W-09 的实现已合入，满足 C1-3 关于代码写完前不写测试的规定） | 得到：内存可控，下游席位不读未合入的协议。放弃：总工期变长 | 串联 |
| P-4 | 派工消息 | 每个席位的首条 peer_send | 按 G-4 写四段：①唯一生效的 PM 决策 issue 链接与行号；②路径白名单；③代码写完前不写、不跑测试，不以 hash 作证据，实现后做本仓真实入口检查，并把 (R) 写进 PR 正文；④常规状态只写 issue 或 PR，只有需要表决的 BLOCKED 或紧急事件才先写 issue 再 peer_send。另加一句：BLOCKED 由治理分身与双核初审分类，主会话不当场裁决（D15-12） | 得到：契约以源文档为准，主会话不充当总线 | 串联 |
| P-5 | 每波启动程序 | 主会话、双核 | 前置条件：D16 通过，且秘书已完成 D16 规定的 design、issue 正文回写。之后每启动一个席位（或一个波次），主会话把具体的 tern 命令、peer_send 全文和当步 LEDGER 核对表一并发给双核，双核核对确认后执行；执行后用 `tern ls` 和会话的启动参数核验 G-2，作为 (R) 写进 PM | 得到：每一步都有 LEDGER 核对与双核确认（G-5、U69） | 串联 |
| P-6 | 冻结对象 | 第三节所列 9 个目录、mux 冻结分支 | 照录 phaseB-review-governance 第三节：9 个目录永久不用；W-04 在新路径 `pepgent-deploy-issue8` 接续；W-01 先还原 mux 草稿的 8 行，新 PR 合入后再删除旧分支 | 得到：D15 保护名单不受损 | 实现 |
| P-7 | 阶段边界 | W-01..W-10 全部完成后 | 所有切片和 E2E spec 合入 main 后，进入阶段 C 统一组装验收（A0 → S1 F01–F30 → E2E-21 → S2 F08–F31），再进入阶段 D（D9/F32）；验收与测试席位另行派工，不在本方案内 | 得到：开发期与验收期分离（C1-3、G-7） | 串联 |

## 三、迁仓执行承载

- U121 明确 Pepgent 组件仓的 org 为 Pepgent，不是决策项。仓 A `Pepgent/soroi-store`、仓 B `Pepgent/omp-soroi` 已存在、private，按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-01 v2 留存。W-06 经 [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345)、W-07 经 [A2-03 / soroi#346](https://github.com/Pepgent/soroi/issues/346) 现在于阶段 B 执行导入，不设合入锁；W-08 的 soroi 切换和四个消费仓切换按 D53-05 v3、06 v2 的真实依赖推进，Main 以 [迁仓总 issue soroi#344](https://github.com/Pepgent/soroi/issues/344) 推进到完成标准。PM 与 design 回写分别由秘书、Argon 按 D53-07 v3 办理，与工程并行，不代表导入已合入或迁仓已完成。
