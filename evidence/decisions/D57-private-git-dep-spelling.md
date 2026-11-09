# D57：仓 B/soroi e2e 对私有组件仓的 bun git 依赖改用 git+ssh 拼法（解 soroi#346 BLOCKED）（P0）——定稿

决策 issue：[Pepgent/PM#79](https://github.com/Pepgent/PM/issues/79)。发起：Coordination（DeskBlocked346）。本文件由议会 daemon 生成。

## 事实

承接：DeskBlocked346（governance-desk，Coordination 席）。初审 BLOCKED [Pepgent/soroi#346](https://github.com/Pepgent/soroi/issues/346)（A2-03，W-07 `pepgent-plugin`），初审结论另以评论写在 #346。本议程每一行都是待表决的提案。

**卡点（工人原文）**
- [#346 第 1 条 BLOCKED](https://github.com/Pepgent/soroi/issues/346#issuecomment-6567046563)：仓 A、仓 B 均 PRIVATE，仓 B workflow 默认 `GITHUB_TOKEN` 读不到仓 A。
- [#346 第 2 条 BLOCKED](https://github.com/Pepgent/soroi/issues/346#issuecomment-6567159234)（以此为准）：bun 1.4.4 对 `git+https://github.com/Pepgent/soroi-store.git#store-contract` 请求 `api.github.com/…/tarball/store-contract` 得 404，生成不了 `bun.lock`；W-07 已停工。导入 PR [Pepgent/omp-soroi#1](https://github.com/Pepgent/omp-soroi/pull/1) 已开出。

**契约正文（D）**
- PM#72 D53-04 v2 导入内容第 3 条：依赖字面写定为 `git+https://github.com/Pepgent/soroi-store.git#store-contract`，不钉版本；第 2、4 条：仓 B release workflow 构建 tar，tar 携带构建时解析到的契约包，安装与远程 boot 不在安装时访问仓 A。
- PM#72 D53-05 v3：soroi `e2e/package.json` 加仓 A 默认分支、仓 B 默认分支的 git 依赖（未写拼法），均不钉版本；e2e 用 bun 安装。
- D10-08（D10:20）：跨仓公开依赖路径变更须表决；D53 已定案，不能 `council revise`，故另立本议程。

**复现（R，2026-11-02，本机 bun 1.4.4，`/tmp/blocked346-probe`）**
1. `git+https://github.com/…` 拼法：bun 不调用 git，直接请求 GitHub tarball API。设 `GITHUB_TOKEN` 或 `GITHUB_ACCESS_TOKEN` 后 `--verbose` 请求头仍无 `Authorization`，结果仍 404。bun 对这种拼法没有可注入的认证途径。
2. `git+ssh://git@github.com/Pepgent/soroi-store.git#store-contract`：bun 调用 git 客户端，`GIT_TRACE` 显示先 `git fetch https://github.com/Pepgent/soroi-store.git`（走 git 配置与 credential helper，本机 `gh auth git-credential` 成功，装出 `contract.ts`、`identity.ts`、`package.json`；`bun.lock` 记 `pepgent-store@git+ssh://git@github.com/Pepgent/soroi-store.git#<sha>`），无 https 凭据时回退 `git fetch ssh://git@github.com/…`，无凭据时干净失败、不挂起。

**C2-2 双闸门（2026-11-02）**
- 闸门 A（Argon，ArgonSol-2）：改依赖拼法“越公开契约边界，需新立 P0；不是产品意图否决”。D53-04 v2 第 3 项明写 `git+https`，改为 `git+ssh` 是已定跨仓依赖接口的替换，不能解释成原行已写另一拼法；D53-05 的 e2e 两个私有依赖应在同一议程列明传输形式与各自读凭据。须保留的已决边界：仓 B 只从仓 A `store-contract` 派生分支取最小契约包；e2e 的真实 store 来自仓 A 默认分支；不钉版本；不把私有仓读取推迟到中心安装或远程 boot。
- 闸门 B（ArgonGovernance，ArgonGovernanceSol-1）：改依赖拼法越界，须另立 P0，不得回写 D53 旧行；路径分工不变（仓 B manifest、lockfile、workflow 归 W-07，soroi e2e 依赖归 W-08）；D53-05 未写死拼法，这两项属统一补充，不是推翻旧行。
- 仓 B CI 读仓 A 的只读凭据：两道闸门都判不越界。闸门 A：属 D53-04 既有构建读取能力的凭据实现，限仓 A、只读，不授写权限、不扩到其他仓、不改可见性，私钥不进 tar、日志、对话，不给安装现场或远程 agent。闸门 B：不属 D53-02 所列删除、改名、转移、可见性变更，不另设投票；推进与管理侧操作由 Main 承担，不转给工程席位或用户；仓 B 的 secret 不作 soroi e2e 的隐式凭据源。

**凭据（不表决，按全局凭据规则执行）**
- 全局规则“凭据由使用它的一方的拥有者保存和注入”：仓 B workflow 读仓 A 的凭据，使用方是仓 B，拥有方是以 RiriAgent 管理两仓、并为 D53-08 推进责任人的 Main。现无可复用来源（工人 R：`gh secret list --org Pepgent` 为空）。Main 建仓 A 只读 deploy key（`gh repo deploy-key add --repo Pepgent/soroi-store`，不勾写权限），私钥写入仓 B Actions secret（`gh secret set --repo Pepgent/omp-soroi`），不经对话、不留本地副本。不是用户事项（U114，AGENTS.md:127）。
- 本机开发与 soroi e2e 用各自使用方已有的 git 凭据，不新建 secret，不借用仓 B 的 secret。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D57-01 v1 | D53-04 第 3 条仓 B 对仓 A 契约包的依赖拼法由 `git+https://github.com/Pepgent/soroi-store.git#store-contract` 改为 `git+ssh://git@github.com/Pepgent/soroi-store.git#store-contract`；仓 B 中执行 `bun install` 的 workflow 用仓 B secret 中的仓 A 只读 deploy key 解析 | PM#72 D53-04 v2 导入内容第 3 条；D16-15（`D16-15-store-contract.md:28`）；D10-08（D10:20）；Pepgent/soroi#346；Pepgent/omp-soroi 分支 `a2-03-plugin-import` 的 `package.json`、`bun.lock`、release workflow；soroi `.github/workflows/release.yml:19`（现 `bun install` 一步） | - 仓 B `package.json` 的 `dependencies["pepgent-store"]` 写 `git+ssh://git@github.com/Pepgent/soroi-store.git#store-contract`，不钉版本。依赖名 `pepgent-store` 与 `pepgent-store/contract`、`pepgent-store/identity` 导入不变；仍是仓 A 派生的最小契约包（D53-03、D16-15）。<br>- W-07 在本机用已有 git 凭据（bun 先走 https + credential helper）生成 `bun.lock` 并提交。<br>- 仓 B 中执行 `bun install` 的每个 workflow 在安装前把 Actions secret 中的仓 A 只读 deploy key 载入 ssh-agent，再 `bun install --frozen-lockfile`；bun 的 https 尝试无凭据即失败，回退 ssh 用该 key 拉取。workflow 文件归 W-07（D16-09）。<br>- deploy key 与 secret 由 Main 按全局凭据规则建立（见事实节；两道闸门均判不越界），本行不表决凭据归属与形态。<br>- D53-04 其余内容不变：tar 携带构建时解析到的契约包，production install 不访问仓 A（D14-02）。<br>- #346 正文结果 4 与验收标准 3 的期望值由 Main（该 issue 作者）按本行替换为新拼法；已关闭的 PM#72 与 D53 归档不改，以本议程为后续记录。 | **得到：** 仓 B 可生成 lockfile、release run 可产出 artifact；依赖仍指向同一个契约分支，只换拼法，不改包、不改发布模型；本机零新凭据，CI 只多一个只读、只覆盖仓 A 的 key。<br>**代价：** 依赖拼法与 Pepgent（npm，`git+https`）不同；仓 B workflow 多一步载入 key；deploy key 由 Main 维护轮换。<br>**落选：**<br>- (a) 保持 `git+https` 拼法并给 bun 注入 token：bun 1.4.4 对该拼法不发 Authorization（R1），不成立。<br>- (b) 仓 A 发布到 GitHub Packages：包名要加 scope、依赖从 git 改为 registry，牵动 D16-15 与全部消费方，改动面远大于换拼法。<br>- (c) 仓 A 改为公开：改变安全边界，属 D53-02 须经议会的仓级动作，且为一项依赖放开整仓源码。<br>- (d) 在 `package.json` URL 里嵌 token：凭据进清单与 lockfile，违反全局凭据规则。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh：未投<br>Argon（ArgonSol-2）：赞成<br>LeadMentor：未投<br>SoroiKeeperOpus（SoroiKeeperOpus-2）：赞成<br>SoroiKeeperGpt：未投 | **撤回**（Main：不是放弃本行：用户直接拍板（pepgent-soroi LEDGER.md U134，Pepgent/soroi@9c94e9e），本行按 v1 原文生效，依 AGENTS.md C2-4 直接执行、不再表决。daemon 没有"用户拍板"结果类型，只能以撤回结束表决；执行承载见 PM 决策 issue 评论。） |
| D57-02 v1 | 统一补充 D53-05：soroi `e2e/package.json` 对仓 A、仓 B 默认分支的 git 依赖（D53-05 未写拼法）采用 `git+ssh` 拼法：`git+ssh://git@github.com/Pepgent/soroi-store.git` 与 `git+ssh://git@github.com/Pepgent/omp-soroi.git` | PM#72 D53-05 v3“同一 PR 内的改动”中 `e2e/package.json` 一段；soroi `e2e/package.json`；本议程第 1 行复现 R1、R2 | - W-08 在 D53-05 的 soroi 切换 PR 中按上述拼法写这两个依赖，均不钉版本；路径归属不变（`e2e/**` 归 W-08）。<br>- 读凭据：e2e 在 W-08 所在本机安装与运行，bun 走 git 客户端，用该使用方已有的 git 凭据（https credential helper）生成 `bun.lock`、安装两仓；不借用仓 B 的 Actions secret。soroi 无运行 e2e 安装的 Actions workflow（现仅 `release.yml`、`store-contract.yml`，均随 D53-05 删除），不新建 CI 凭据。<br>- D53-05 其余内容不变；本行是对未写明拼法处的补充，不推翻 D53-05。 | **得到：** W-08 切换时不会因同一 bun 限制再报 BLOCKED；两个私有依赖解析路径与仓 B 一致。<br>**代价：** e2e 依赖拼法与 Pepgent 消费方不同。<br>**落选：**<br>- (a) 不写拼法、留待 W-08 遇到再报：已知同一路径会失败（R1），等于预约下一次 BLOCKED。<br>- (b) 用 `git+https`：同 R1，不可安装。 | 实现 | 否 | Coordination（Main）：赞成<br>ClaudeHigh：未投<br>Argon（ArgonSol-2）：赞成<br>LeadMentor：未投<br>SoroiKeeperOpus（SoroiKeeperOpus-2）：赞成<br>SoroiKeeperGpt：未投 | **撤回**（Main：不是放弃本行：用户直接拍板（pepgent-soroi LEDGER.md U134，Pepgent/soroi@9c94e9e），本行按 v1 原文生效，依 AGENTS.md C2-4 直接执行、不再表决。daemon 没有"用户拍板"结果类型，只能以撤回结束表决；执行承载见 PM 决策 issue 评论。） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D57-Coordination.md`、`votes/D57-Argon.md`、`votes/D57-SoroiKeeperOpus.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。