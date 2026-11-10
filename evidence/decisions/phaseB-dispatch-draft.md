# 阶段 B 一仓一进程恢复派工方案（主会话起草，并入 D16 表决）

起草依据：
- ArgonGovernance 与 Argon 的统一裁定：派工方案并入 D16，由主会话立即起草。
- `local://argon/phaseB-review-governance.md` 第三节（冻结对象处置）与第四节（席位矩阵 W-01..W-10、执行契约与事后检查清单 G-1..G-7）。
- `local://argon/phaseB-review-argon.md`。

本方案只定派工的结构，不改动任何席位的路径域和首发任务；这两项以 ArgonGovernance 的 G-1 矩阵原文为准，在此不复述。

## 一、用户原话与 AGENTS.md C1–C5 实质核对

| 条款 / 要求 | 核对 |
| --- | --- |
| C1-1 | 席位只实现 soroi 定制与独立组件，不改 omp 宿主，不引入 omomp 的 fork、tern、watchdog 等设计 |
| C1-2 | W-01..W-05 各占一个独立仓；仓 A `Pepgent/soroi-store`、仓 B `Pepgent/omp-soroi` 已存在并按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) 留存；W-06 经 [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345) 导入 store，W-07 经 [A2-03 / soroi#346](https://github.com/Pepgent/soroi/issues/346) 导入定制与发行，快照后各自唯一写源为目标仓；W-08 按 D53-05 v3 承载 soroi 的 e2e、根文件与 compose 切换；W-09、W-10 在两份独立克隆中工作，不碰 Pepgent 根 checkout，也不联系无关会话 |
| C1-3 | 开发期各仓只做本仓编译、类型与基础检查，不设跨组件 live 门禁；代码写完之前不写、不跑测试；hash 比对不作证据。W-08 按 D16-10 逐 spec 读法编写，所测代码全部合入后按自身依赖就绪与空闲名额滚动启动，不固定排在最后 |
| C1-4 | 测试只用 OrbStack 隔离环境，不碰生产，不解密 SOPS |
| C2-1 | 主会话不单裁 BLOCKED 和分类；Main 每项用 task 新开空白治理承接者，会同 Argon、ArgonGovernance 依 D15-12 与现行正交双闸门初审；需表决的契约空白经 council 按独立职能席位逐条表决 |
| C2-2 | D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置；G-1..G-7 是执行契约和事后检查清单，不是启动前签署门禁。ArgonGovernance 按现行领域资格参投并享治理一票否决，不再排除为“非例行投票席” |
| C2-3 | 按 `pepgent-soroi/AGENTS.md` D1-12 与 LEDGER U95 的职能席位和专责权重执行；Main 与空白 task 治理承接者合计一席，claude-high、Argon、LeadMentor 各一席，组织治理议案加 ArgonGovernance，独立部门按议案资格参投；立案、收票、计票、发布与归档由 council daemon 完成 |
| C2-4 | 席位命令按 U61、U62 固定，不另立表决 |
| C3-1、C3-2 | 席位内部 subagent 由工程师自己派生；Main 对每项治理事务用 task 新开空白治理承接者，不复用分身或旧巡检员 |
| C3-3 | 压力测试由独立空白历史 task:high 承担 steady 和 divergent 两个视角，禁止 medium 模型 `discuss:*` 参与设计或决策；已发生的审查记录保留 |
| C3-4 | 一仓（一路径域）一进程；模型固定为 Opus 5.5 high，保留 omp-peers；不跨仓混派，不共用分支；用 `git worktree add -b <分支> <路径> origin/main`；主会话停在 soroi main |
| C3-5 | 本方案不修改 skill 或 agent 定义 |
| C4-1 | 工人将 STARTED/PR/BLOCKED/DONE/ALL_DONE 与依赖变化写原 issue/PR；每仓具名片区经理以 peer_ask 主动巡查、亲查工作空间，普通进度写 local://state/area-*.md，异常报 Main；秘书汇总，哨兵独立扫描异常 |
| C4-2 | Main 保留首次 peer_send 派活；之后由片区经理 peer_ask/peer_send 单向巡查、送达和观察恢复。工人不 peer_send 管理层或片区经理；不用 tern send 代替实际送达；只有 peer 不可达或答复与工作空间不符时才用 capture/JSONL 备选取证；全程中文 |
| C4-3 | 发车与非决策事实按拥有方观察归档 PM；LEDGER 仅存用户原话，不写要求状态、阶段主线或决策索引；需求排期在各仓 Issues/Project #1，决策发布与归档在 PM decision issue/council |
| C5-1 | 不读 `01a193fd`；工程师会话目录用新名字，旧 `.workers/eng-*` 作为 D15 证据原样保留 |
| C5-2 | 领导层每步实质核对 AGENTS.md C1–C5、LEDGER 用户原话与原任务/决策；发车记录归档供 ArgonGovernance 事后检查，不用 IRC 抄送双核，不要求每波签署或工程师 PR 贴长表 |
| C5-3 | 第三节所列 9 个冻结目录永久不用；mux 草稿按第三节第 1 条还原 8 行 |
| C5-4 | D16 通过即为最终派工授权，当回合发车；回写并行，不作为前置，不另设双核预审或签署门禁 |
| 迁仓执行（C1-2、U121） | Pepgent 组件仓的 org 为 Pepgent，不是决策项；两仓按 D53-01 v2 留存，Main 按 D53-02 v3 初始化 main，导入与切换按 D53-03..06 的真实承载推进，不因回写等待 |
| 持续约束（C4-3.3） | 命令参数仅证明该次启动输入，不认证一仓一进程、总线与分支纪律永久合规；窗口观察及违例由独立巡检写入 PM evidence/argon/ 与 Issues，不写 LEDGER、不永久绿勾 |
| 回退重做（C5-3） | 各席按 D15/D16 合法重做被回退切片，不破坏合法遗产 |
| 统一验收（C1-5） | 阶段 C 全流程及阶段 D/F32 义务在原 issue 与 Project 中承接，不因派工完成而升级 |
| 派工记录（C4-3） | 本方案只作已通过派工契约的消费文档，非实时要求状态表；每次进退场以拥有方报告与具体记录为准 |

## 二、决策项（交 PhaseBClone 并入 D16）

| ID | what | where | how | 取舍 | 分类 |
| --- | --- | --- | --- | --- | --- |
| P-1 | 席位矩阵 | 10 个 tern 席位 | 原样采用 phaseB-review-governance 第四节 G-1 的 W-01..W-10：会话名、`--cwd`、互斥写入路径域、承接的遗产与首发任务均照录。每个席位的 PM 契约行号由 D16 定稿后填入派工消息 | 得到：路径不重叠，与 C1-2、C3-4 一致。放弃：soroi 三个域在迁仓前共用一个仓，靠路径白名单约束 | 串联 |
| P-2 | 启动命令 | 每个席位 | `tern new session <会话名> --cwd <G-1 cwd> -- omp --cwd <G-1 cwd> --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<会话名>/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts`。W-09、W-10 启动前，先按 G-3 用 `gh repo clone` 建两份独立克隆 | 得到：U61、U62、G-2 逐字满足 | 实现 |
| P-3 | 依赖就绪滚动启动与并发 | 主机内存；D16-10 | 同时活跃的席位仍不超过 4 个。席位实现切片全部合入 main 后立即 `tern kill session`，保留会话目录。任何席位释放名额后，立即从等待中的席位里挑一个自身依赖已满足的启动，不按固定顺序等待无关席位。W-10 在 `protocol/lab` 的真实上游合入后，优先补入下一个空出的名额。W-08 按逐 spec 读法编写，不固定排在最后；每份 spec 所测代码全部合入后才编写，阶段 B 不执行跨组件测试 | 得到：内存可控，下游席位不读未合入的协议，不等待无关席位。放弃：4 席并发时内存余量比 3 席小 | 串联 |
| P-4 | 派工消息 | 每个席位的首条 peer_send | 按 D16-11 写六段：①生效 PM 决策 issue 链接与行号；②路径白名单与 lockfile 规则；③切片 issue 作为范围、依赖与状态索引，同仓或同域关联切片可在同一 PR 用多个 `Closes #X` 合并，只等待真实编译、类型、构建或调用契约依赖，不要求每切片独立 PR/runtime；④代码写完前不写、不跑测试，不以 hash 作证据，PR 写本仓编译、类型与基础检查的 (R)；⑤工人状态写原 issue/PR，每仓片区经理按 C4-1、C4-2 用 peer_ask 主动巡查并亲查工作空间、peer_send 送达后观察恢复，BLOCKED 由 Main 新开空白 task 治理承接者会同双核初审；⑥按 D16-09 执行 home/切片 worktree 纪律。主会话不单裁、不代片区经理常规对接工人 | 得到：契约按源文档消费，Main 首次派活保留，合并异步 | 串联 |
| P-5 | 发车与事后检查 | 主会话、ArgonGovernance、秘书 | D16 通过即为最终派工授权，当回合按 D16-10 发车；design、PM、issue 回写并行，不作为前置。具体 tern 命令、peer_send 全文与当步 AGENTS.md/用户原话实质核对记录写入文件归档，由 ArgonGovernance 事后检查，不用 IRC 抄送双核；G-1..G-7 不是启动签署门禁。合并异步，PR 写本仓编译、类型与基础检查的 (R)；工程执行事项只有 BLOCKED 才进入决策，不设退役前同步复核；独立部门发起权不受影响。LEDGER 不承载状态或决策索引 | 得到：有实质核对与持久记录，不新增预审、签署、回写前置或退役复核 | 串联 |
| P-6 | 冻结对象 | 第三节所列 9 个目录、mux 冻结分支 | 照录 phaseB-review-governance 第三节：9 个目录永久不用；W-04 在新路径 `pepgent-deploy-issue8` 接续；W-01 先还原 mux 草稿的 8 行，新 PR 合入后再删除旧分支 | 得到：D15 保护名单不受损 | 实现 |
| P-7 | 阶段边界 | W-01..W-10 全部完成后 | 所有切片和 E2E spec 合入 main 后，进入阶段 C 统一组装验收（A0 → S1 F01–F30 → E2E-21 → S2 F08–F31），再进入阶段 D（D9/F32）；验收与测试席位另行派工，不在本方案内 | 得到：开发期与验收期分离（C1-3、G-7） | 串联 |

## 三、迁仓执行承载

- U121 明确 Pepgent 组件仓的 org 为 Pepgent，不是决策项。仓 A `Pepgent/soroi-store`、仓 B `Pepgent/omp-soroi` 已存在、private，按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-01 v2 留存。W-06 经 [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345)、W-07 经 [A2-03 / soroi#346](https://github.com/Pepgent/soroi/issues/346) 承载导入，不设合入锁；W-08 的 soroi 切换和四个消费仓切换按 D53-05 v3、06 v2 的真实依赖推进，Main 以 [迁仓总 issue soroi#344](https://github.com/Pepgent/soroi/issues/344) 推进到完成标准。PM 与 design 回写分别由秘书、Argon 按 D53-07 v3 办理，与工程并行，不代表导入已合入或迁仓已完成。
