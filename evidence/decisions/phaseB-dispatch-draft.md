# 阶段 B 一仓一进程恢复派工方案（主会话起草，并入 D16 表决）

起草依据：
- ArgonGovernance 与 Argon 的统一裁定：派工方案并入 D16，由主会话立即起草。
- `local://argon/phaseB-review-governance.md` 第三节（冻结对象处置）与第四节（席位矩阵 W-01..W-10、执行契约与事后检查清单 G-1..G-7）。
- `local://argon/phaseB-review-argon.md`。

本方案只定派工的结构，不改动任何席位的路径域和首发任务；这两项以 ArgonGovernance 的 G-1 矩阵原文为准，在此不复述。

## 一、本步 LEDGER（`8bfd70c`）逐项核对

| 条款 / 要求 | 核对 |
| --- | --- |
| C1-1 | 席位只实现 soroi 定制与独立组件，不改 omp 宿主，不引入 omomp 的 fork、tern、watchdog 等设计 |
| C1-2 | W-01..W-05 各占一个独立仓；soroi 在新仓 owner 授权前，分 W-06（`packages/store/**`）、W-07（插件、脚本、发行）、W-08（`e2e/**`、compose）三个互斥路径域；W-09、W-10 在两份独立克隆中工作，不碰 Pepgent 根 checkout，也不联系无关会话 |
| C1-3 | 开发期各仓只做本仓编译、类型与基础检查，不设跨组件 live 门禁；代码写完之前不写、不跑测试；hash 比对不作证据。W-08 按 D16-10 逐 spec 读法编写，所测代码全部合入后按自身依赖就绪与空闲名额滚动启动，不固定排在最后 |
| C1-4 | 测试只用 OrbStack 隔离环境，不碰生产，不解密 SOPS |
| C2-1 | 主会话不裁决 BLOCKED 和分类，这两项按 D15-12 交治理分身与双核；契约空白交三族表决 |
| C2-2 | D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置；G-1..G-7 是执行契约和事后检查清单，不是启动前的签署门禁；ArgonGovernance 负责治理巡检、BLOCKED 初审和第 20 条修正提议，不作为例行投票席 |
| C2-3 | 本方案作为 D16 决策项三族逐条表决；Claude 族包含独立空白历史 task:high，argon 族由常驻 Argon 投一票，导师族由顶层常驻 LeadMentor 投一票 |
| C2-4 | 席位命令按 U61、U62 固定，不另立表决 |
| C3-1、C3-2 | 席位内部的 subagent 由工程师自己派生；治理事务交给分身 |
| C3-3 | 压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策；已发生的审查记录保留 |
| C3-4 | 一仓（一路径域）一进程；模型固定为 Opus 5.5 high，保留 omp-peers；不跨仓混派，不共用分支；用 `git worktree add -b <分支> <路径> origin/main`；主会话停在 soroi main |
| C3-5 | 本方案不修改 skill 或 agent 定义 |
| C4-1 | 常规状态只写 issue 或 PR 评论，不用 peer_send 发给 Main；秘书汇总，哨兵扫描异常 |
| C4-2 | peer_send 只用于首次派活、需要表决的 BLOCKED、紧急事件；全程中文；不在 PTY 里另起 omp |
| C4-3 | 派工命令与核对表归档到 PM，LEDGER 只替换状态行 |
| C5-1 | 不读 `01a193fd`；工程师会话目录用新名字，旧 `.workers/eng-*` 作为 D15 证据原样保留 |
| C5-2 | 领导层每步实质核对 C1–C5 与 R1–R21，将发车记录写入文件并归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核，不要求每波签署或工程师 PR 贴长表 |
| C5-3 | 第三节所列 9 个冻结目录永久不用；mux 草稿按第三节第 1 条还原 8 行 |
| C5-4 | D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置，不另设双核预审或签署门禁 |
| R3 | 新仓 owner 仍未授权（只有用户能授权，不阻塞），迁仓前按互斥路径域开发 |
| R8、R9 | 保持 🏗。启动参数输出只证明该席位的命令符合 G-2，不足以证明一仓一进程、异步总线与分支纪律已经执行；要等拥有方提供完整的真实运行证据（各席位的 issue/PR 总线记录、分支与 worktree 纪律），才能分别升级为 ✅（C4-3） |
| R13–R15 | 由各席位合法重做被回退的切片 |
| R16、R17 | 阶段 C、D，不在本方案范围 |
| R21 | 🔄，本方案是 R21 的派工部分 |

## 二、决策项（交 PhaseBClone 并入 D16）

| ID | what | where | how | 取舍 | 分类 |
| --- | --- | --- | --- | --- | --- |
| P-1 | 席位矩阵 | 10 个 tern 席位 | 原样采用 phaseB-review-governance 第四节 G-1 的 W-01..W-10：会话名、`--cwd`、互斥写入路径域、承接的遗产与首发任务均照录。每个席位的 PM 契约行号由 D16 定稿后填入派工消息 | 得到：路径不重叠，与 C1-2、C3-4 一致。放弃：soroi 三个域在迁仓前共用一个仓，靠路径白名单约束 | 串联 |
| P-2 | 启动命令 | 每个席位 | `tern new session <会话名> --cwd <G-1 cwd> -- omp --cwd <G-1 cwd> --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<会话名>/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts`。W-09、W-10 启动前，先按 G-3 用 `gh repo clone` 建两份独立克隆 | 得到：U61、U62、G-2 逐字满足 | 实现 |
| P-3 | 依赖就绪滚动启动与并发 | 主机内存；D16-10 | 同时活跃的席位仍不超过 4 个。席位实现切片全部合入 main 后立即 `tern kill session`，保留会话目录。任何席位释放名额后，立即从等待中的席位里挑一个自身依赖已满足的启动，不按固定顺序等待无关席位。W-10 在 `protocol/lab` 的真实上游合入后，优先补入下一个空出的名额。W-08 按逐 spec 读法编写，不固定排在最后；每份 spec 所测代码全部合入后才编写，阶段 B 不执行跨组件测试 | 得到：内存可控，下游席位不读未合入的协议，不等待无关席位。放弃：4 席并发时内存余量比 3 席小 | 串联 |
| P-4 | 派工消息 | 每个席位的首条 peer_send | 按 D16-11 写六段：①唯一生效的 PM 决策 issue 链接与行号；②路径白名单与 lockfile 规则；③切片 issue 作为范围、依赖与状态索引，同仓或同域关联切片由所属席位连续实现，可在同一 PR 用多个 `Closes #X` 合并提交，只等待编译、类型、构建或调用契约真实依赖，不要求每切片单独 PR 或 runtime 验收；④代码写完前不写、不跑测试，不以 hash 作证据，PR 正文写本仓编译、类型与基础检查的 (R)；⑤常规状态只写 issue 或 PR，只有需要表决的 BLOCKED 或紧急事件才先写 issue 再 peer_send；⑥按 D16-09 执行 home/切片 worktree 纪律。BLOCKED 由治理分身与双核初审分类，主会话不当场裁决（D15-12） | 得到：契约以源文档为准，主会话不充当总线，合并异步 | 串联 |
| P-5 | 发车与事后检查 | 主会话、ArgonGovernance、秘书 | D16 通过即为最终派工授权，当回合按 D16-10 发车；design、PM、issue 回写并行，不作为前置。具体 tern 命令、peer_send 全文与当步 LEDGER 实质核对记录写入文件并归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核；G-1..G-7 是执行契约和事后检查清单，不是启动前的签署门禁。合并异步，PR 正文写本仓编译、类型与基础检查的 (R)（C1-3）；工程执行事项只有 BLOCKED 才进入决策，不设退役前同步复核；独立职能部门发起投票权和第 20 条修正不受影响 | 得到：每步实质核对 LEDGER，不增加预审、签署、回写前置或退役复核 | 串联 |
| P-6 | 冻结对象 | 第三节所列 9 个目录、mux 冻结分支 | 照录 phaseB-review-governance 第三节：9 个目录永久不用；W-04 在新路径 `pepgent-deploy-issue8` 接续；W-01 先还原 mux 草稿的 8 行，新 PR 合入后再删除旧分支 | 得到：D15 保护名单不受损 | 实现 |
| P-7 | 阶段边界 | W-01..W-10 全部完成后 | 所有切片和 E2E spec 合入 main 后，进入阶段 C 统一组装验收（A0 → S1 F01–F30 → E2E-21 → S2 F08–F31），再进入阶段 D（D9/F32）；验收与测试席位另行派工，不在本方案内 | 得到：开发期与验收期分离（C1-3、G-7） | 串联 |

## 三、未决（只有用户能授权，不阻塞）

- 新仓 A（store）、B（omp-soroi）的 owner，候选为 RiriAgent、Mouriya-Emma、moat-lab、mouriya-s-lab、Pepgent。获授权后，W-06、W-07 的迁仓另行决策。
