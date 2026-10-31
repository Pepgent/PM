# D1 组织决策表 · task:high 的选票

投票者：task:high（HighVoter）。依据：`AGENTS.md` U1–U19 / R1–R45；能力调查 `local://inv/o-sentinel.md`、`o-tern-peers.md`、`o-task-settings.md`、`o-todo-tool.md`、`o-placement.md`、`o-skills.md`、`.omp/agents/argon.md`。
本票未咨询 discuss:*（U11 不允许 task:high 以下参与决策），也没有另开 mentor，以免 LeadMentor 之外的导师间接影响计票。

| ID | 票 | 理由 | 修改建议 |
| --- | --- | --- | --- |
| D1-01 | 反对 | ①“代码和技术取舍的最终决定”与 U12“对于决策，遵照正常的民主投票”冲突：技术类条目若由 leader 最终拍板，投票就形同虚设。U1“在代码和设计上的取舍是你自己做”是在划分 leader 与 argon 的权力（argon 只裁意图），并不意味着可以绕过 U11/U12 的集体决策。②漏了 U1 / R15“在隔离的环境中指挥”。其余部分（编排、只有主会话能做 peer 操作、不读历史 session〔R17〕、不写产品代码〔U2〕）都成立。 | how 改为：“编排全部工作；代码与技术取舍由 leader 提出并负责，argon 不以意图为由裁决技术；属于重大决策的（设计、组件归属、跨仓库契约、串联）按 D1-12 投票，leader 只有一票；单个仓库内的实现细节由 leader 或其指派的工程师直接决定；在 omp worktree 隔离环境中工作（R15）；投票；执行 peer_*；不读历史 session，不写产品代码。” |
| D1-02 | 赞成 | 与 U1、U11 逐项对应：裁决本意、对缺失部分与设计补充一票否决、改错误文档（R12）、不写代码、可用 mid 及以下 subagent；与 `.omp/agents/argon.md` 的 `spawns: task:mid, task:low, task:free` 一致。 | ①U1 原话是“argon 可以 fork 出来多个”。how 应写明多实例由谁开：argon 自己 `fork_task`（是否可用尚未实测），或由 leader 按方面另开 argon 实例。②多个 argon 实例合计一票（并入 D1-12）。③argon 能否改文档取决于 D1-15：目前自定义 agent 的 edit 被 todo 门禁拦截（o-todo-tool.md）。 |
| D1-03 | 赞成 | U11 只允许 leader、分身、task:high、argon、导师参与设计。discuss:steady 为 gpt-5.6-sol:medium，discuss:divergent 为 opus-5-5:medium，都低于 task:high 的 opus-5-5:high（o-task-settings.md），排除它们是对 U11 的稳妥读法；U1 要求的“讨论者”角色仍保留。 | ①divergent 立场优先交给全新的 task:high：分身继承 leader 的上下文，难以提出真正不同的框架。②写明 task:high 本身也不得把设计判断转交 discuss:* 或 task:mid 及以下；这些只能取证。task:high 的默认角色提示会建议找 discuss:*，需要在派活时明确禁止。 |
| D1-04 | 赞成 | U11 明列“导师”；mentor:default 是 gpt-5.6-sol:high，属于预定义模型（U17）。 | 写明只有 LeadMentor 投票计票；其他 agent 各自的 mentor 不投票。投票时要把完整的决策表正文发给导师，因为它只看得到 leader 给的内容。 |
| D1-05 | 赞成 | U2 推荐用秘书排期，U14 要求杂事委托 subagent；秘书只记录、不投票、不做设计判断，符合 U11。模型 gpt-6-1-sol:high 就是 task:mid 的预定义模型（U17）。 | 秘书目前无法编辑文件（E8），依赖 D1-15 修复；修好前由 task:low 代办，这一点应写进 how。计票时机械执行 D1-12 的规则：多数票、平票、argon 否决。 |
| D1-06 | 赞成 | U1“历史 session 只允许 subagent 调查”，U3“mid 以下用量几乎无穷”，U11 不允许它们做设计判断；这份分工已经实际运行（o-*.md 的 U/A/D/R 标注）。 | 可以把 task:free 加为低风险探测的取证者，但其结论必须经 task:low 或更高层级复核后才能作为决策依据。 |
| D1-07 | 反对 | 进程模型与 U2 完全一致，启动命令也已实测（R23）。问题在“默认模型”：默认是 anthropic/claude-opus-5-5:high（o-task-settings.md 的 modelRoles.default），与 leader、task:high 共用 Claude 额度。U15 明确提醒“gpt 的上限几乎无限，而 claude 并不是”，并要求用 PTY 中的 omp /usage 查可用量。多个长时间运行的工程师进程都用 Opus，会耗尽 U11 规定只能由 task:high 级别承担的设计与决策所需的额度。 | how 改为：“启动前在 PTY 中运行 omp `/usage` 查额度；用 `--model` 显式指定预定义模型（U17），默认用 GPT 系的预定义选择器，例如 task:mid 的 `openai-codex/gpt-6-1-sol:high`；只有额度宽裕且确有必要时才用 Claude。”另外：新会话要防止 autoResume 接到旧对话（用 `/new` 或使用持久的专用 `--session-dir`，不放 /tmp）；在仓库里按 issue → PR 工作，遵守该仓库的 AGENTS.md。 |
| D1-08 | 赞成 | U2 列出“测试”是 tern 中的独立 agent；实现与测试分离，符合 runtime 验证规则。 | ①模型选择沿用 D1-07 修正后的规则。②“每条 e2e 路径一个”改为“按 e2e 路径或组件、按需启动”，避免空占进程。③证据写成 PR comment，由实现者按 writing-pr 并入 PR body。 |
| D1-09 | 赞成 | U4 推荐在 homelab-tf 起 VM 搭测试环境；按 iac-projects skill 和 IaC 归属规则操作是正确路径。 | 模型选择沿用 D1-07。在 homelab-tf 内按该仓库的 AGENTS.md 和 issue → PR 流程声明 VM 后再 apply；凭据走该仓库已有的 SOPS 注入路径。 |
| D1-10 | 赞成 | U3 要求用外部哨兵观察 session log。o-sentinel.md 已实测：subagent 可以实时读取 `session://`，peer_* 只有主会话能用，所以 peer 操作由 leader 代办；哨兵只上报、不做决策，边界清楚。 | “循环读”改为有界观察窗口：按 o-sentinel.md §8 的方式，每次派发观察若干轮，把游标交还 leader 后再派发下一窗口，不挂无界轮询。上报的分类措辞照 §8.4，静默不能等同于卡死。与 D1-13 提到的“sentinel 自定义角色”统一：二选一，不要两处表述不同。 |
| D1-11 | 赞成 | 与 o-tern-peers.md 实测的语义一致：peer_send 派活并唤醒对方，回复是对方另发一条 peer_send，peer_ask 只问对方已知的情况，不回复无需回复的消息以免互相唤醒。固定的状态集合便于秘书和哨兵跟踪。 | ①增加 QUESTION 状态，或写明“需要 leader 或 argon 澄清范围、契约、意图”时用 BLOCKED 加问题。②查进度优先用哨兵读 session log，peer_ask 留到确有需要时用（它会消耗对方的模型额度）。③leader 重启（D1-15）或 `/new` 之后要重新 peer_list，并把新的会话 id 告诉各工程师。 |
| D1-12 | 反对 | 主体符合 U11、U12、U14。但有两处缺口会让“正常的民主投票”失真：①只把 leader 的分身并成一票，没有处理 argon 的多个 fork（D1-02 允许多实例）和多个 task:high 实例，同一身份可能叠票。②没有写谁来判定某个条目属于“缺失部分与设计补充”（否决权适用范围）。分类列只有意图、技术、串联、实现，范围不明会引起争议。 | how 补充：①“每个投票身份一票：leader 及其分身合计一票；argon 及其所有 fork 合计一票；task:high 不论开几个实例合计一票；导师只有 LeadMentor 一票。”②“起草人在条目上标注是否属于缺失部分或设计补充；argon 可以对任何条目主张否决，但必须附 (U) 证据说明该条目属于缺失部分或设计补充，秘书据此记为 argon 否决。”③（建议）写明重大决策的门槛，与 D1-01 修正后的表述一致。 |
| D1-13 | 赞成 | U15 允许在本仓库做 project 级定制。o-placement.md 表明 task-agent 只取最近的 `.omp/agents`：在 pepgent-soroi 下启动的会话能看到这些定义，其他仓库看不到，正好对应“工程师用默认 agent 与 task:*”。 | 删掉或改写“以及之后的 sentinel”，与 D1-10 的 task:low 哨兵统一。新角色名不要与用户级定义（task:*、mentor:default）同名，否则 project 定义会覆盖用户定义。 |
| D1-14 | 赞成 | U5 要求 project 级 skill。o-skills.md 表明 native skill 只在仓库根以内向上查找，所以“各仓库各放一份”是唯一不需要额外配置的 project 级方案；用户级 `~/.omp/agent/skills` 不是 project 级。 | 补上 U5 的后半句：skill 固化后要观察效果，把使用中暴露的问题直接改进 skill 正文。不要在多个仓库里放同一方法的副本：面向工程师的 skill 本来就随仓库而不同；确实需要通用的，再单独提一个决策项。 |
| D1-15 | 赞成 | U19 明确授权修正 omomp 的硬编码。改的是插件 omp-todo-more，不是 omp 宿主代码（U13）。o-todo-tool.md 查明根因：edit 门禁对所有子 agent 生效，而 todo 只给 task:* 四个名字恢复。按“拿到 edit 的子 agent 都恢复 todo”修正，就让门禁范围和恢复范围一致。 | ①写明由谁实施：在 omomp 的 omp-todo-more 源码仓库修改（leader 不写代码，交给 task:mid），提交并推送后更新已安装的插件，不钉版本。②验证按 omp-maintenance 规则做 PTY e2e：新派一个 secretary 子 agent，确认工具列表里有 todo，提交 Todo 后 edit 成功；task:mid 仍然正常；mentor、discuss 这类没有 edit 的角色不受影响。③harness restart 选在没有子 agent 运行时，重启后重新 peer_list。 |

## 计票

赞成 12 · 反对 3（D1-01、D1-07、D1-12）
