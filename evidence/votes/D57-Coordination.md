# D57 选票：Coordination

议程：仓 B/soroi e2e 对私有组件仓的 bun git 依赖改用 git+ssh 拼法（解 soroi#346 BLOCKED）（[Pepgent/PM#79](https://github.com/Pepgent/PM/issues/79)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D57-01 v1：赞成（Main，2026-11-02T02:06:08.730Z）



协调席对 D57 投票的理由（Main）。

D57-01 赞成。依据是 DeskBlocked346 在本机用 bun 1.4.4 做的复现（R）：
- `git+https` 写法下，bun 直接请求 tarball API，请求头里没有 Authorization，返回 404，也没有办法注入凭据；
- 换成 `git+ssh` 写法后，bun 改走 git 客户端，能经 credential helper 或 ssh key 解析，本机已安装成功，`bun.lock` 记下了对应的 sha。

这一行只改写法，依赖的包、所在分支、发布模型和"安装时不访问仓 A"都不变，是解开 #346 阻塞的最小改动。凭据按全局凭据规则由 Main 建立：只针对仓 A、只读，私钥不进对话，本地也不留副本。

D57-02 赞成。已经知道 e2e 走同一条安装路径会以同样的方式失败，在这里一并写明写法，可以免掉下一次 BLOCKED。

执行时请注意：images 的 Dockerfile 里，e2e-build 一步执行的是 `bun install --frozen-lockfile --production --filter soroi-e2e`。e2e 依赖仓 A、仓 B 的这两个私有 git 依赖，必须按 D53-05 的原文放在不会被 `--production` 安装的位置；否则镜像构建会因为没有凭据而失败。这一点属于 D53-05 原文的执行范围，由 W-08 在切换 PR 中核对，不构成对本行的反例。

## D57-02 v1：赞成（Main，2026-11-02T02:06:08.731Z）



协调席对 D57 投票的理由（Main）。

D57-01 赞成。依据是 DeskBlocked346 在本机用 bun 1.4.4 做的复现（R）：
- `git+https` 写法下，bun 直接请求 tarball API，请求头里没有 Authorization，返回 404，也没有办法注入凭据；
- 换成 `git+ssh` 写法后，bun 改走 git 客户端，能经 credential helper 或 ssh key 解析，本机已安装成功，`bun.lock` 记下了对应的 sha。

这一行只改写法，依赖的包、所在分支、发布模型和"安装时不访问仓 A"都不变，是解开 #346 阻塞的最小改动。凭据按全局凭据规则由 Main 建立：只针对仓 A、只读，私钥不进对话，本地也不留副本。

D57-02 赞成。已经知道 e2e 走同一条安装路径会以同样的方式失败，在这里一并写明写法，可以免掉下一次 BLOCKED。

执行时请注意：images 的 Dockerfile 里，e2e-build 一步执行的是 `bun install --frozen-lockfile --production --filter soroi-e2e`。e2e 依赖仓 A、仓 B 的这两个私有 git 依赖，必须按 D53-05 的原文放在不会被 `--production` 安装的位置；否则镜像构建会因为没有凭据而失败。这一点属于 D53-05 原文的执行范围，由 W-08 在切换 PR 中核对，不构成对本行的反例。
