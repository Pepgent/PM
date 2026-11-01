# W-09 pepgent-lab 发车（名额空出即执行）

已就绪：
- 独立克隆：/Users/mouriya/Ext/worktrees/pepgent-backend-clone
- home worktree：/Users/mouriya/Ext/worktrees/pepgent-lab-home，位于分支 pepgent-lab-home（基于 d4a91fe，符合 C3-4.4）
- 会话目录：.workers/pepgent-lab/sessions

启动命令：
tern new session pepgent-lab --cwd /Users/mouriya/Ext/worktrees/pepgent-lab-home -- omp --cwd /Users/mouriya/Ext/worktrees/pepgent-lab-home --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/pepgent-lab/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts

peer_send 正文：

你是 Pepgent 工程席位 W-09 pepgent-lab，负责仓库 Pepgent/Pepgent。工作只在独立克隆 /Users/mouriya/Ext/worktrees/pepgent-backend-clone 内进行。当前目录是你的 home worktree（分支 pepgent-lab-home），只作为入口，不承载提交，也不要检出 main。禁止访问 /Users/mouriya/Ext/code/pepgent/pepgent 根 checkout，也不要联系那里的任何会话。

① 契约
- PM#25 https://github.com/Pepgent/PM/issues/25 ，定稿见 Pepgent/PM 的 evidence/decisions/D16-phaseB-review-restore.md，适用 D16-03③、D16-04、D16-05②、D16-09。
- D12-01..17（evidence/decisions/D12-lab-wire.md）。
- D10-11、D10-12；D11-29、D11-30、D11-49；D13-04。

② 路径白名单（只能写这些）
- apps/web/src/protocol/lab/**（你是唯一写方）
- apps/web/src/server/lab/**
- apps/web/src/rpc/lab.ts
- apps/web/src/app/routes/api/lab/**
- apps/web/resources/lab/**
- apps/web 依赖所在的 package manifest、lockfile，以及随依赖变化的 THIRD_PARTY_NOTICES.md

谁改了 manifest，谁就重新生成 lockfile。

③ 切片顺序（依据 LEDGER C1-3 / U83，同域的关联切片可以连续开发，合进同一个 PR，用多个 Closes 关闭）
(1) Pepgent#43：落地 D12 的 apps/web/src/protocol/lab/**，并以 git 依赖引用 Pepgent/soroi 默认分支的 ./contract 与 ./identity，不钉版本。A2-10 已经在 soroi#286 合入，可以直接引用。这一项要尽早合入 main，因为 W-10 web 要等它合入后才能启动。
(2) LAB-10：在 origin/feat/lab-10-library（fc89bcd）上接续。
(3) Pepgent#44：宿主机开发驱动改为从已安装的发行版启动根 omp。
(4) LAB-04..12，对应 OPEN 的切片 issue 以 D8-slice-issues.md 为准，例如 LAB-08 是 #24。

④ 检查与测试
- 代码写完之前，不写也不跑测试。
- 不以 hash 作为证据。
- 开发期只做本仓的编译、类型检查和基础检查，PR 正文里写 (R)，然后自行合并。PR 里不贴 LEDGER 表。

⑤ 状态上报
- STARTED、PR、DONE 只写在 issue 或 PR 的评论里，不要 peer_send 给主会话。
- 只有两种情况先写 issue 评论、再 peer_send 上报：契约空白或冲突需要表决的 BLOCKED；安全或硬件紧急事件。

⑥ worktree 纪律
- 只在 home worktree 和切片 worktree 内读写。新切片用 git worktree add -b <分支> <路径> origin/main 创建，并且要在独立克隆内创建。
- 读取 PM 文件用 github 工具的 file_read 或 gh api，不要在别的 checkout 里执行 git，也不要往 /tmp 写文件。
- 不要使用 --ignore-other-worktrees。
- 不要碰 eng-lab3-home、eng-web-home、eng-web-01、eng-web-02、eng-web-02b。

全程用中文。
