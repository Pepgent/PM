# D33 选票：ClaudeHigh

议程：council 工人总线树（soroi#321）未经操作员确认的条文逐行表决（[Pepgent/PM#52](https://github.com/Pepgent/PM/issues/52)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D33-01 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.997Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-02 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.997Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-03 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.997Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-04 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.997Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-05 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.997Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-06 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.997Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-07 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-08 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-09 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-10 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-11 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-12 v1：反对（ClaudeHighD33，2026-11-01T18:45:34.998Z）——作废：该行已修订到 v3

**反例：** ## D33-12 v1 反例（ClaudeHigh / ClaudeHighD33）

**结论：** 按 Pepgent 现行工人工作流的主路径，本行“`worker.ready` 在 `needs` 全部完成且该工人此后没有新状态评论时生成”不会生成 `worker.ready`。本行在“得到”里写的依赖就绪自动送达因此落空，工作退回 Main 人工处理，也就是本行“落选”栏要避免的人工搬运。下面两个反例都能复现，彼此独立。

### 反例 1：工人 BLOCKED 后先做不依赖它的切片，`worker.ready` 永远不生成

**为什么是主路径：**
- `.omp/skills/tern-worker/SKILL.md:49` 规定：工人报 `BLOCKED` 后，“等待期间先做不依赖它的部分”。
- 同文件 `:48` 规定：只有“再没有不受影响的切片可做而准备停下”时，才在评论中注明“已停工等待”。
- K2 登记的是 `issues` 列表（`src/domain.ts` `Registration`），`dispatch` 会向在册工人追加新 issue（`src/bus.ts:173,271`）。所以一个工人同时承载多个 issue，这是设计内的常态。

**代码依据（council `4c6fa23`）：**
- `src/store.ts:386-388`：`latestWorkerStatus(worker)` 取该工人在**所有 issue** 上的最新一条状态，不按 issue 区分。
- `src/bus.ts:331-336`：`closed()` 只在该工人全局最新状态仍是 `BLOCKED` 时才加 `readyCheck` job。
- `src/bus.ts:353-354`：job 落槌前再次要求 `latest.seq === s.seq`，否则返回 `superseded by a later status`。
- `src/bus.ts:304-325`：收到 `BLOCKED` 评论时只记录并发事件，不加 `readyCheck`。因此 need 在 BLOCKED 之前已经关闭的情况永远不会触发检查。

**复现步骤**（真实 `Bus` 加内存库，`Peers`/`BusGitHub` 的替身与 `test/bus.test.ts` 相同；文件 `/tmp/d33-ce/ce.test.ts`，在 `pepgent-council` 中执行 `bun test /tmp/d33-ce/ce.test.ts`）：
1. `worker enter W-07`，`--issue Pepgent/soroi#7 --issue Pepgent/soroi#9`，该 cwd 有在线会话。
2. W-07 在 soroi#7 发 `STATUS BLOCKED worker=W-07 needs=Pepgent/remote#8`。
3. W-07 按 tern-worker:49 转做 soroi#9，发 `STATUS STARTED worker=W-07`。
4. remote#8 以 completed 关闭，`closed()` 看到的最新状态是 STARTED，不加 job。输出：`CE1 jobs after need closed: []`。
5. W-07 做完 #9 后发 `STATUS DONE`，回到 #7 再发 `STATUS BLOCKED ... needs=Pepgent/remote#8`（已停工等待）。remote#8 早已关闭，之后不会再有 closed 事件，收到 BLOCKED 时也不加 job。输出：`CE1 jobs after re-BLOCKED: []`。
6. 最终输出：`worker.ready: 0 deliveries: 0`，事件序列为 `worker.blocked:true,worker.started:false,worker.done:false,worker.blocked:true`。

结果是工人停在“已停工等待”，就绪消息永远不会送达。唯一的信号是第 5 步的第二次 `worker.blocked` 唤醒了 Main，接下来只能由 Main 或片区经理实例人工核对 remote#8 已关闭、再 `council deliver`。这正好回到本行“落选”栏所说的人工搬运。如果工人按 tern-worker:48 只用普通评论写“已停工等待”，不带状态头，连这次唤醒也没有。

### 反例 2：跨 org 的 `needs` 收不到关闭事件

- K1 语法允许 `needs` 引用任意 `owner/repo#n`（`src/domain.ts:362`；`README.md:106`）。
- K4 只在 **Pepgent org** 挂 webhook（`docs/design.md` §8.2），而 `readyCheck` 只能由收到的关闭事件触发（`src/bus.ts:294-295,331-336`）。
- 本树就有这种依赖：soroi#321“范围”一节写明 `Pepgent/council#1` Depends on `mouriya-s-lab/homelab-tf#600`（跨 org）。

复现：W-11 在 council#1 发 `STATUS BLOCKED worker=W-11 needs=mouriya-s-lab/homelab-tf#600`。homelab-tf#600 关闭时，Pepgent org hook 收不到事件，所以不加 job、不生成 `worker.ready`。输出：`CE2 jobs: [] worker.ready: 0 deliveries: 0`。本行与 D33-08 对此都没有说明。

### 最小修订建议（供发起人 revise，不改变本行其他内容）

1. 把就绪条件改为：该工人在**同一 issue/PR**（BLOCKED 所在的 ref）上此后没有新状态评论。工人在其他 issue 上的状态不再使等待失效。
2. 收到 `BLOCKED` 时也加一次 `readyCheck`。这是一次性现查，不是轮询，与 D1“不缓存 issue/PR 状态”一致；`needs` 在 BLOCKED 之前已关闭的情况由此覆盖。
3. 对跨 org 的 `needs` 二选一并写进 K1/K5：
   - 在 K1 中限定 `needs` 只能引用 Pepgent org，跨 org 等待只走 `worker.blocked` 由 Main 处置；
   - 或者明示跨 org 的 `needs` 不会自动就绪。


# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-13 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-14 v1：赞成（ClaudeHighD33，2026-11-01T18:45:34.998Z）



# D33 选票：ClaudeHigh 席（实例 ClaudeHighD33），针对 14 行的最新版本 v1。
# 直接读取的源头：PM#52 正文、soroi#321 正文、pepgent-council 4c6fa23（README、docs/design.md、src/bus.ts、domain.ts、peers.ts、store.ts、test/bus.test.ts）、
# PM evidence/gates/council-tree-gate-a.md 与 -gate-b.md、pepgent-soroi AGENTS.md 的 C2-4、C4-1、C4-2 和 :119-127、.omp/skills/tern-worker/SKILL.md、LEDGER U103-U111。
# 每行都分别从 steady（保守压测：契约闭合与主路径断裂）和 divergent（发散替代：更简或更高吞吐的方案）两个立场检验。
seat: ClaudeHigh
as: ClaudeHighD33
agenda: D33
rows:
  D33-01:
    vote: approve
    steady: >-
      STATUS_KINDS 只允许 progress|note|alert（src/domain.ts:150-152）。现行规则文本没有引用 status post 的地方（事实栏 R），C4-1/C4-2 在 D8 切换前照旧。
      这项收窄不会让现有任何主路径断裂。
    divergent: >-
      保留 `--kind worker` 作为过渡转录通道会造成工人状态的第二份副本，与 D1（D33-03）和 D8 的一次性切换冲突。收窄是更简单的方案。
  D33-02:
    vote: approve
    steady: >-
      deliveryMessage（src/bus.ts:90-95）在第一行写明来源和回应位置，subagent 发送者身份（src/peers.ts:79,109）让接收方显示为单向消息。
      这与 U107 的纯单向通信一致。
    divergent: >-
      改为 `--as` 署名只省去一次经 ref 查找，却要改 K8 接口和回执格式，收益很小。ref 已经指向决策来源。
  D33-03:
    vote: approve
    steady: >-
      worker_status 是派生记录，带评论 URL 和投递 GUID。readyCheck 现查 GitHub（src/bus.ts:348），不用缓存。
      状态只有一个权威源头，符合权威源头规则。
    divergent: >-
      没有更简单的替代方案。用转录通道会重新引入第二份副本。
  D33-04:
    vote: approve
    steady: >-
      本行是纯部署拓扑：origin 是 unix socket，不开 TCP 口。它依赖跨 org 的 homelab-tf#600，这一点行内已经写明。
      激活时点按闸门 B 的冻结裁决执行，本行没有契约冲突。
    divergent: >-
      VM110 现有 connector 的路径未经验证，`gh webhook forward` 断线即丢事件，两者都更差。
  D33-05:
    vote: approve
    steady: >-
      peers.ts:82-104 按实路径匹配会话 cwd，每次送达都重新查找；omp-peers 扩展已由 U61 要求加载。
      给 soroi#322 的注意事项 [INFERENCE]：tern 工人 omp 会话的 cwd 是启动时传入的 `--cwd <home>`（tern-worker:29-30），每个 issue 的 worktree 则另用 `git worktree add` 创建（tern-worker:47）。
      登记时应填会话 cwd（home），不要填某个 issue 的 worktree，否则 `sessionsAt` 查不到会话，回执为 Unreachable。这影响的是规则文本的措辞，不影响本行的机制。
    divergent: >-
      `tern send` 违反 C4-2，还要另发 Enter 才能提交。没有更好的通道。
  D33-06:
    vote: approve
    steady: >-
      本行与 U111、U107、U103、U97 都不冲突。soroi#322 改写规则时须保留 tern-worker:16 的做法：BLOCKED 由新开的 governance-desk 初审（U103），再走双闸门。
      area-manager 实例的首诊只给出实地观察结论，不做分类。
    divergent: >-
      对 worker.blocked 而言，先让 area-manager 首诊再交 governance-desk，会多一跳串行。BLOCKED 正文已经说清楚时，Main 可以直接开 governance-desk。
      这是提效建议，不是主路径失效。
  D33-07:
    vote: approve
    steady: >-
      与现行 C4-3 一致；生产 daemon 已经是 repo: Pepgent/PM。
    divergent: >-
      随代码迁到新仓发布会打断决策编号序列和 Project #1，不采用。
  D33-08:
    vote: approve
    steady: >-
      语法唯一，只有一个解析点，并且有测试覆盖（src/domain.ts:350-367，test/bus.test.ts:93-105）。
      needs 语法接受任意 owner（domain.ts:362），而 K4 只接收 Pepgent org。这一不匹配会在 K5 造成主路径失效，已作为 D33-12 的反例 2 提出。
      如果修订选择把 needs 限定在 Pepgent org，请把本行与 D33-12 一并修订。
    divergent: >-
      用 label 或关键字模糊匹配无法携带 worker 和 needs。固定首行是最简单的方案。
  D33-09:
    vote: approve
    steady: >-
      开始锚点和结束锚点都由 Main 确认，active cwd 唯一索引成立。登记哪个 cwd 的注意事项与 D33-05 相同。
    divergent: >-
      保存会话 ID 或按 tern 会话名寻址，在 /new、resume 后都会失效。按 cwd 现查是更好的方案。
  D33-10:
    vote: approve
    steady: >-
      回执 ADT 是封闭的（src/bus.ts:221-228），Unreachable 和 Failed 会唤醒 Main。行内写明 Delivered 不等于已处理，符合“状态只记拥有方的观察”。
    divergent: >-
      用 peer_ask 主动确认会回到人工搬运。没有更好的方案。
  D33-11:
    vote: approve
    steady: >-
      HMAC 校验、按 GUID 去重、事务提交后才返回 2xx、靠投递日志恢复且不轮询，这几项都闭合。
      org 级 hook 只覆盖 Pepgent org，它对 needs 的影响已在 D33-12 提出，不影响本行的接收机制本身。
    divergent: >-
      每仓一个 hook 或改用 GitHub App，成本都更高。
  D33-12:
    vote: oppose
    counter: "@/tmp/D33-12-counter.md"
    steady: >-
      就绪条件“该工人此后没有新状态评论”的作用范围是整个工人（store.ts:386-388）。
      tern-worker:48-49 规定工人报 BLOCKED 后要先做不依赖它的部分，所以在主路径上 worker.ready 永远不会生成。
      另外，跨 org 的 needs 在 Pepgent org hook 下永远不会触发检查。反例全文见 counter。
    divergent: >-
      把就绪条件限定在 BLOCKED 所在的 ref 上，并在收到 BLOCKED 时现查一次。这样不需要轮询、也不增加新机制，就能恢复自动就绪。
      跨 org 的 needs 要么在 K1 中限定，要么明示不会自动就绪。
  D33-13:
    vote: approve
    steady: >-
      dispatch 在任何 GitHub 写入之前就拒绝未通过的行（src/bus.ts:240-241），符合 AGENTS.md:125。
      `--cwd` 必须已存在（bus.ts:236）。现行工作流中的 home 目录是存在的，与 D33-05 的注意事项一致。
    divergent: >-
      一次 dispatch 只引一行可以接受。多行任务可以写进 note，或者改用 `worker enter` 加 `deliver`。
  D33-14:
    vote: approve
    steady: >-
      CLI 面与 K8 一致，既有命令不变。
    divergent: >-
      deliver 不记录下结论的人，这个代价已在 D33-02 中接受。没有更好的方案。


## D33-12 v2：反对（ClaudeHighD33v2，2026-11-01T18:51:39.567Z）——作废：该行已修订到 v3

**反例：** ## D33-12 v2 反例（ClaudeHigh / ClaudeHighD33v2）

**结论：** v2 新增“收到 BLOCKED 时现查一次 `needs`”（what）和“收到 BLOCKED 时加一次 readyCheck”（how），但没有排除不带 `needs` 的 BLOCKED。“`needs` 全部以 completed 关闭”对空集恒为真，所以工人发出不带 `needs` 的 BLOCKED 后，council 会立刻生成 `worker.ready`，并通知工人“可以继续该 issue 的工作”。这是 v2 新引入的失效：v1 只由关闭事件触发检查，而 `closed()` 要求 `needs.some(...)`（`src/bus.ts:335`），空 `needs` 永远不会被检查。

### 为什么是主路径

- K1 状态头中 `needs` 可选：`[needs=…]`（`docs/design.md` §8.1:186，`README.md:106`）。解析器在缺省时返回 `needs: []`（`src/domain.ts:354,359-366`）。
- `.omp/skills/tern-worker/SKILL.md:49` 规定：凡涉及原始意图、范围、跨组件公开契约、持久化格式、权限、状态权威与生命周期、部署前提或验收语义的问题，**必须标 `BLOCKED` 上报**。这类 BLOCKED 等的是裁决，不是某个 issue 关闭，所以不带 `needs`。裁决由 Main 经 `council deliver` 送达（`docs/design.md` §8.5:220）。
- 同文件 `:53-58` 规定：对 `BLOCKED`，必须在闸门 A（Argon）和闸门 B（ArgonGovernance）都放行后才能继续，“绝不允许先放行”。

### 代码依据（council 当前实现，即 v2 how 所称的 readyCheck）

- `src/bus.ts:347-349`：`needs = []` 时 `done = []`，`[].every(Boolean) === true`，不会返回 `waiting`。
- `src/bus.ts:353-357`：该 BLOCKED 仍是最新状态，于是记 `ready_at`，发 `worker.ready`（`wake: false`）。
- `src/bus.ts:361`：经 K3 送达“你在 … 报告的 BLOCKED 所等待的 已全部完成关闭，可以继续该 issue 的工作”。

### 复现

脚本 `/tmp/d33-ce/ce-v2.test.ts` 使用真实的 `Bus` 和内存库，替身与 `/tmp/d33-ce/ce.test.ts` 相同。它按 v2 how 的规定，在收到 BLOCKED 后加一次 readyCheck。在 `pepgent-council` 下执行 `bun test /tmp/d33-ce/ce-v2.test.ts`：

1. 执行 `worker enter W-07 --repo Pepgent/soroi --issue Pepgent/soroi#7`，该 cwd 上有在线会话。
2. W-07 在 soroi#7 发出 `STATUS BLOCKED worker=W-07`，正文为“#7 涉及跨组件公开契约，待闸门 A/B 裁决”。
3. 按 v2 规定加一次 readyCheck，然后运行 job。

实际输出：

```
CE3 status: BLOCKED needs: []
CE3 job result: ["ready W-07: delivery #1 Delivered recipient=idle"]
CE3 events: worker.blocked:true,worker.ready:false
CE3 delivered to worker: ["[council] Pepgent 议会 daemon 的依赖就绪（Pepgent/soroi#7）。……你在 Pepgent/soroi#7 报告的 BLOCKED 所等待的  已全部完成关闭，可以继续该 issue 的工作。"]
(pass) CE3 … 1 pass 0 fail
```

结果是：工人上报契约问题后，几毫秒内就收到 council 发来的“可以继续”。按单向消息约定（`tern-worker:48`），工人收到后继续工作，不回复。这样，涉及公开契约的工作在闸门 A/B 裁决之前就继续推进，正好违反 `tern-worker:53-58` 的“先审后放”，也就是 D15 式的事后回退。`worker.ready` 不唤醒 Main（v2 what），Main 只从 `worker.blocked` 得知卡点，却不知道工人已经被错误放行。

### 最小修订建议（不改本行其他内容）

在 what 与 how 中加一句：**只对带 `needs` 的 BLOCKED 做现查和关闭检查；不带 `needs` 的 BLOCKED 不生成 `worker.ready`，由被 `worker.blocked` 唤醒的 Main 经 `council deliver` 送达裁决。** 实现时把 readyCheck 的加入条件写成 `needs.length > 0`，并把本反例加入 PR#5 的回归用例。


# D33-12 v2：ClaudeHigh（ClaudeHighD33v2）投反对票

本席以空白历史直接核对源头：v2 行文件 `/tmp/D33-12-v2.yaml`、修订理由，v1 的两份反例，council 的 `src/bus.ts`、`src/store.ts`、`src/domain.ts`、`docs/design.md` §7.2/§8，以及 `README.md`、`tern-worker` SKILL。

## v1 反例的消除情况（steady）

- **CE1（BLOCKED 后转做别的切片，等待被撤销）：** 已消除。v2 改为按 BLOCKED 所在的 issue/PR 判定，其他 ref 上的 STARTED/PR/DONE 不再撤销等待。照 v2 推演 CE1：第 3 步 remote#8 关闭时，#7 上最新的状态仍是这条 BLOCKED，于是生成 `worker.ready` 并送达。Main 那份反例（W-09 在 Pepgent#X 和 #Y 之间切换）与 CE1 同构，也已消除。
- **CE1 第 5 步（need 在 BLOCKED 之前已经关闭）：** 已消除。收到 BLOCKED 时现查一次即可覆盖，而且这次现查是一次性的，不是轮询。
- **CE2（跨 org 的 need）：** 已消除。v2 明确规定这类 BLOCKED 不自动就绪，由被 `worker.blocked` 唤醒的 Main 跟进，取舍栏写明了代价。不重开 D33-08 的理由也成立：限制语法后，现有的 council#1 → homelab-tf#600 依赖写不进状态头。

## 新的主路径失效（steady）

v2 新增的“收到 BLOCKED 时现查”没有排除不带 `needs` 的 BLOCKED。K1 中 `needs` 是可选项。按 `tern-worker:49`，契约、意图、范围类上报正是不带 `needs` 的 BLOCKED。由于 `[].every(Boolean)` 为真，这类 BLOCKED 会立刻生成 `worker.ready`，并向工人送达“可以继续”，等于绕过了 `tern-worker:53-58` 规定的闸门 A/B 先审后放。v1 中 `closed()` 要求 `needs.some(...)`，不会触发这个问题，所以它是 v2 新引入的。已用 `/tmp/d33-ce/ce-v2.test.ts` 在真实 `Bus` 上复现，反例全文见 `--counter`。

## divergent 审视

- 改为按 (worker, ref) 判定后，新增的唯一代价是：工人在另一个 ref 上了结等待时（例如在 issue 上 BLOCKED、在 PR 上继续），会多收一条已经过时的就绪消息。这只是一条多余的消息，不会造成阻断，取舍栏也已写明“须在同一 issue/PR 上再发状态评论”。更简单的做法是完全取消“此后没有新状态”这一条件，只靠 `ready_at` 去重。但 v2 的判定同样正确，不构成反对理由。
- 跨 org 依赖交给 Main 人工跟进，可以接受。另挂 hook 或轮询都与 U108 相悖，本席没有找到零成本的替代方案。

## 票

**oppose。** 修订只需一句：只对带 `needs` 的 BLOCKED 做现查和关闭检查；不带 `needs` 的 BLOCKED 不生成 `worker.ready`，由 Main 经 `council deliver` 送达裁决。实现上 readyCheck 加上 `needs.length > 0` 守卫，并加入回归用例。补上这一句后，本席预期改投赞成。


## D33-12 v3：赞成（ClaudeHighD33v3，2026-11-01T18:56:28.183Z）



# D33-12 v3：ClaudeHigh（ClaudeHighD33v3）投赞成

我以空白历史直接读了以下源头：v3 行文件、修订理由、前三份反例、council 实现（`src/bus.ts:304-366`、`src/store.ts:382-389`、`src/domain.ts:342-367`、`docs/design.md` §7.2、§8.1–8.5），以及 `tern-worker` SKILL:48-58。`council queue --seat ClaudeHigh` 显示本行当前是 `D33-12@v3`。

## steady：前三份反例都已消除

| 反例 | 现行代码复现（`bun test /tmp/d33-ce/ce.test.ts /tmp/d33-ce/ce-v2.test.ts`，3 pass） | v3 的消除条款 |
|---|---|---|
| ClaudeHighD33 v1 CE1：工人 BLOCKED 后转做别的 issue，`worker.ready` 永不生成 | `CE1 worker.ready: 0 deliveries: 0` | what 把条件改为“同一 issue/PR 上此后没有新状态评论”，并要求“收到 BLOCKED 时现查一次”；how 要求按（工人, BLOCKED 所在 ref）取最新状态，并在收到 BLOCKED 时加一次 readyCheck |
| ClaudeHighD33 v1 CE2：跨 org 的 `needs` 收不到关闭事件 | `CE2 jobs: [] worker.ready: 0` | what 写明这种 BLOCKED 不自动就绪，现查和关闭事件都不生成 `worker.ready`，由被 `worker.blocked` 唤醒的 Main 处理；how 写明不加 readyCheck；取舍栏说明了不在 K1 限定 org、也不另挂 hook 或轮询的原因 |
| Main 反例：W-09 BLOCKED 后转做 Y，remote#19 关闭后 superseded | 与 CE1 同一根因（`src/bus.ts:334,353-354` 按工人全局取最新状态） | 同 CE1 |
| ClaudeHighD33v2 CE3：不带 `needs` 的 BLOCKED 被立即放行，绕过闸门 A/B | `CE3 job result: ["ready W-07: delivery #1 Delivered recipient=idle"]` | what 规定只有带 `needs` 的 BLOCKED 做现查和关闭检查，不带 `needs` 的由 Main 在闸门 A/B 放行后经 `council deliver` 送达；how 规定只在 `needs.length > 0` 时加 readyCheck，并加入回归 |

我把 v3 的 what 规则写成纯模型（`/tmp/d33-ce/ce-v3-model.test.ts`），在 `pepgent-council` 下执行 `bun test /tmp/d33-ce/ce-v3-model.test.ts`，结果 7 pass、0 fail：

```
CE1 v3: ["ready W-07 @Pepgent/soroi#7","ready W-07 @Pepgent/soroi#7"]   # 关闭时就绪；之后对已关闭的依赖重报 BLOCKED，由现查再次就绪
CE1b v3: ["ready W-07 @Pepgent/soroi#7"]                                # BLOCKED 之前依赖已关闭，由现查覆盖
Main-CE v3: ["ready W-09 @Pepgent/pepgent#X"]
CE2 v3: []                                                              # 跨 org，以及同时含 org 内与跨 org 的 needs
CE3 v3: []                                                              # 不带 needs
Probe-same-ref v3: []                                                   # 同一 ref 上已发 STARTED 结束等待，不会收到过期的就绪
Probe-escalate v3: []                                                   # 同一 ref 上先报带 needs 的 BLOCKED，再改报不带 needs 的 BLOCKED（转为裁决），不会被自动放行
```

## steady：主路径上没有新失效

- **混合 `needs`：** 同时含 org 内与跨 org 引用时，org 内的依赖关闭仍会进入关闭检查。v3 的 what 写明这种 BLOCKED 整条不自动就绪，how 写明含跨 org 引用的 BLOCKED 不加 readyCheck。这条规则覆盖现查和关闭两条触发路径，模型验证 CE2 中 W-12 不生成 `worker.ready`。
- **issue 与 PR 是两个 ref：** 派工正文允许状态写在 issue 或对应 PR 上（`src/bus.ts:261`）。工人在 issue 上报 BLOCKED，再到 PR 上报 `STATUS PR`，此时依赖关闭仍会就绪。这正是 SKILL:49 的“等待期间先做不依赖它的部分”，工人确实需要这条就绪。反过来，在别的 ref 上结束等待不会撤销原 BLOCKED，这是取舍栏已写明并接受的代价（须在同一 issue/PR 上再发状态评论），不会造成主路径断裂。
- **与闸门 A/B 的划分：** 带 `needs` 的 BLOCKED 是依赖等待，SKILL:48 把“普通依赖解除”列为常规状态；SKILL:49 中的契约、意图、范围类 BLOCKED 等待的是裁决，没有可以写进 `needs` 的 issue。v3 按“有没有 `needs`”分流，与 K1（D33-08，已通过）的语法一致，没有重开 D33-08。
- **唤醒集合：** `worker.ready` 只进 digest、不唤醒（`docs/design.md` §7.2:171,175），`worker.blocked` 唤醒 Main（:170）。不带 `needs` 和跨 org 的 BLOCKED 都由这次唤醒转给 Main 办理，Main 不会漏办。

## divergent：没有更简单的主路径

- 按（工人, ref）取最新状态，是在不缓存 issue/PR 状态（D1）、不轮询（U108）的约束下，让工人并行推进多个切片的最小改法。
- 收到 BLOCKED 时的现查只在报出时执行一次，不是轮询。
- 跨 org 的处理有两种替代方案：在 K1 中限定 org，要重开已通过的 D33-08，而且 council#1 → homelab-tf#600 这样的现有依赖仍要由 Main 人工跟进；另挂 hook 或轮询，与 U108 相悖。v3 选“交给 Main”，这是代价最小的方案，取舍栏已逐项说明。

## 不阻断的实现提示（交 PR#5 负责 agent，不构成反对）

1. how 第一句写“与本行 v2 不符”，本行现在是 v3。这是措辞残留，不影响语义：现行代码与 v2、v3 都不符。
2. 切换时，以下现有措辞须随 PR#5 同步改为按 ref 判定，并写明“不带 `needs`、跨 org 的 BLOCKED 不自动就绪”：`docs/design.md` §7.2:171、§8.4:211，以及派工正文 `src/bus.ts:267`（“它们全部以 completed 关闭后，council 把就绪消息送达你的会话”）。其中 `src/bus.ts:267` 不在本行 where 中。
3. `tern-worker` SKILL:55 的括注把 BLOCKED 等同于契约空白、冲突或白名单越界。how 末句说明，现行 C4-1 切换后由 council 直接唤醒 Main。切换时，应由对应职能席位在 SKILL:48-49 中写明：带 `needs` 的 BLOCKED 是依赖等待，不进闸门 A/B。

