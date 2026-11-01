# images#13 BLOCKED 的闸门材料：lab-web 构建取不到私有依赖 `pepgent-store`

- **issue：** [Pepgent/images#13](https://github.com/Pepgent/images/issues/13)，工人 W-03（`pepgent-images`）。链条：images#13 → [deploy#24](https://github.com/Pepgent/deploy/issues/24) / [PR#25](https://github.com/Pepgent/deploy/pull/25) 结果 3。
- **BLOCKED：** [评论 6562962112](https://github.com/Pepgent/images/issues/13#issuecomment-6562962112)（2026-11-01T19:45:37Z）。只阻塞 `lab-web`；`omp-agent`、`central` 已重建推送，验收 1、2 见 [评论 6562970791](https://github.com/Pepgent/images/issues/13#issuecomment-6562970791)。
- **编制：** governance-desk 实例 `DeskImages13Blocked`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初分类和交两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过席位路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界才可免投票放行；任一闸门认定越界，按 P0 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论、派工 issue 正文和压力测试报告都属于 `(A)`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`
- `IMG/` = `Pepgent/images` `origin/main` `fede9d9`
- `PGT/` = `Pepgent/Pepgent` `origin/main` `05756a56adc6c40dcf54e67f3fc1c1c7637fff3c`（用 `gh api` 按提交读取，未碰根 checkout）

类别：
- **K1** 既有决策已覆盖，只需澄清
- **K2** 主路径外的失败或竞态（`SOR/.claude/rules/design-assumes-it-works.md`）
- **K3** 已通过契约内的单仓私有实现（D10-08）
- **K4** 公开契约缺口（跨仓公开契约、权限、状态权威与生命周期、部署前提、验收语义等）

---

## 一、工人提出的问题

W-03 按 README 导出 Pepgent `origin/main` 构建 `--target lab-web`，`web-build` 阶段的 `npm ci` 以 exit 128 失败：npm 执行 `git ls-remote ssh://git@github.com/Pepgent/soroi.git`，镜像里没有 `ssh`，也读不到远端 (A)。W-03 列出三个候选，不自行选择 (A)：

1. 用 Pepgent `d4a91fe`（现行 lab-web 的源）重建，只换 dial。
2. images 改 Dockerfile，用 BuildKit secret 或 ssh 转发，让 `web-build` 临时取得 soroi 读权限。
3. 由 Pepgent 或 soroi 把 `pepgent-store` 改成构建能取得的发布物，例如 registry 包或 vendored 源。

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | Pepgent `apps/web/package.json:52` 的依赖写法是 `"pepgent-store": "git+https://github.com/Pepgent/soroi.git#store-contract"`；根 `package-lock.json:14343-14349` 的 `node_modules/pepgent-store` 是 `version 0.0.0`，`resolved` 为 `git+ssh://git@github.com/Pepgent/soroi.git#ceaaf06436bf264650b0a38ec40239bcf0789ea5`，依赖只有 `zod`。整个 lockfile 只有这一条 git 依赖。 | (R) `gh api repos/Pepgent/Pepgent/contents/{apps/web/package.json,package-lock.json}?ref=05756a5…` 后 grep |
| F2 | `Pepgent/soroi` 是私有仓。`store-contract` 分支只有 2 个 commit，根 commit `8a23e21` 没有父提交；tip 等于 `ceaaf06`，树里只有 `contract.ts`、`identity.ts`、`package.json`。 | (R) `gh api repos/Pepgent/soroi --jq .private` → `true`；`gh api repos/Pepgent/soroi/commits?sha=store-contract`；`gh api …/git/trees/ceaaf06…`；`compare ceaaf06...store-contract` → `identical` |
| F3 | **git 依赖是已通过契约：** D10-10 规定 Pepgent/Pepgent 以 git 依赖引用 store 契约的权威仓，不钉版本，lockfile 记录实际 commit。D16-15③ 规定 W-09 用 `git+https://github.com/Pepgent/soroi.git#store-contract` 引用；②规定该分支只由 CI 追加提交，不强推；⑥规定仓 A 建立后改由仓 A 产出。备选落选栏写明 GitHub Packages、Release 压缩包、CI 编译出 JS 在 npm 约束下都不比本方案简单。 | (D) `DEC/D10-repo-delivery.md:22`（D10-10）；`DEC/D16-15-store-contract.md:28`（D16-15） |
| F4 | D16-15 正文没有规定在容器或镜像构建中如何取得这个私有 git 依赖。压力测试报告非阻断意见 N3 写过：“凡是在容器或 CI 里对 Pepgent 执行 `npm ci` 的地方，都需要能读取 `Pepgent/soroi` 的 git 凭据……按凭据规则由使用方注入”，但这一条没有写进决策正文。 | (D) `DEC/D16-15-store-contract.md:28`；(A) `DEC/D16-15-stress.md:102` |
| F5 | **镜像构建归 images：** D2-13 / D11-04B：Komodo Build 流水线实现前，lab-web 等镜像用 `docker buildx` 构建并推送到 `pepgent-registry`；定义归 images 仓。D2-11：omp-agent 镜像不含凭据。 | (D) `DEC/D2-components.md:48,50`；`DEC/D11A-solo-ruling-review.md:44` |
| F6 | **images 的凭据边界（组件文档，W-03 路径，不是决策正文）：** README“构建与发布”：“不得通过挂载个人目录、复制 npm 凭据或跳过许可证检查来让构建通过。`soroi` 与 `pepgent` 都是私有仓库，下列命令从调用者已有的 clone 读取 `origin/main`，拉取权限由该 clone 的既有 Git 连接提供，不进入构建”。Komodo Build 段：“源码检出、导出和私有仓库连接由构建拥有方提供”。central 已经按这个方式从调用者的 soroi clone `git archive` 导出，作为 `--build-context soroi=…` 传入。 | (D) `IMG/README.md:54,60-72,99` |
| F7 | `web-build` 把 `--build-context pepgent=` 复制到 `/src`，然后直接执行 `npm ci && npm run build && npm prune …`。构建里没有 soroi 的任何输入。 | (D) `IMG/Dockerfile:52-79` |
| F8 | images#13 的范围边界把“Dockerfile 的结构改动”列为不在范围；“不应残留”包括 registry 中带旧 dial 的 `lab-web:latest`；约束写明源上下文从已提交的 `origin/main` 导出，凭据不进镜像、日志或评论。 | (A) images#13 正文 |
| F9 | 现行 `lab-web:latest` 的源是 Pepgent `d4a91fe`。从 `d4a91fe` 到 `05756a5` 共 20 个 commit，第一个就是 `06e6480`（Pepgent#45，D16-15 接入）。 | (A) BLOCKED 评论；(R) `gh api repos/Pepgent/Pepgent/compare/d4a91fe...05756a56` → `ahead_by 20`，首个 `06e6480` |
| F10 | **不需要凭据的取法可行（机制实测）：** 在 `/tmp/img13-probe` 用本地 bare 仓模拟 `store-contract`。`npm install` 写出的 lockfile 与 F1 形式相同（`git+ssh://git@github.com/Pepgent/soroi.git#<sha>`）。之后禁用 ssh（`GIT_SSH_COMMAND=/usr/bin/false`），每次用全新的 npm cache：① 不设 git 改写时 `npm ci` 以 exit 128 失败，复现了 BLOCKED；② 在 git 全局配置里设 `url."file:///…/soroi.git".insteadOf = ssh://git@github.com/Pepgent/soroi.git`（https 同理）后，`npm ci` exit 0，lockfile 未改，装上的就是该 commit 的包。实测在宿主 npm 11.20.0 上进行，没有在 `web-build` 容器内跑；容器内同样可行属推断 [INFERENCE]。 | (R) `/tmp/img13-probe` 中的 `npm install`、两次 `npm ci` 输出与退出码 |
| F11 | **凭据规则：** 凭据由使用它的一方的拥有者保存和注入，不让操作员粘 token；已有既定注入路径时不另造。 | 机主全局规则“凭据规则”（system 规则，非 LEDGER U 编号） |

## 三、初分类

**主体：K3（已通过契约内的 images 单仓构建实现），需要另开 images 承载 issue。三个工人候选都不取，改用候选 ④。**

- **契约没有缺口：** “Pepgent 以 git 依赖引用私有 soroi 的 `store-contract` 分支”是 D10-10、D16-15 已通过的契约（F3）。lockfile 解析成 `git+ssh` 是 npm 对 GitHub 依赖的规范化（F10 中 `npm install` 在 https 写法下同样写出 `git+ssh`），不是 W-09 的缺陷；而且私有仓即使走 https，没有凭据也一样取不到。
- **缺的是 images 构建这一侧的输入：** `web-build` 只收到 Pepgent 的导出，没有收到它锁定的 soroi 依赖（F7）。README 已经规定了私有源怎么进构建：由调用者用已有 clone 导出，拉取权限不进入构建（F6），central 正是这么做的。lab-web 构建要的依赖同样出自调用者的 soroi clone，补上这个输入是在既有边界内完成 images 自己的构建定义。
- **候选 ④（推荐）：** W-03 在 images 中：
  1. 调用者从已有 soroi clone 取 `origin/store-contract`，导出为 git bundle（或 bare 仓），作为新的命名上下文传给 `lab-web` 构建（名字由 W-03 定）。该分支只含派生的三个契约文件（F2），不带 soroi 其余源码。
  2. `web-build` 在 `npm ci` 之前用 git `url.<本地路径>.insteadOf` 把 `ssh://git@github.com/Pepgent/soroi.git`、`https://github.com/Pepgent/soroi.git` 改写到这份本地仓；lockfile 不改，`npm ci` 仍按锁定的 commit 安装（F10）。
  3. README“lab-web 源码与构建”和 Komodo Build 段补上这项导出和上下文。
  
  凭据始终留在调用者的 clone，不进入构建、镜像层、build arg、日志或评论，不需要任何人粘 token（F6、F11）。Pepgent 仍取 `origin/main`，符合 images#13 的约束与“不应残留”（F8）。
- **为什么不取工人候选：**
  - ① 回到 `d4a91fe` 就丢掉 #45 之后的 20 个 commit（F9），偏离 README 的“取 `origin/main`”和 images#13 的约束，属于改变 images#13 的验收语义（K4）。
  - ② 让读权限以 BuildKit secret 或 ssh 转发进入构建，改的是 README“拉取权限不进入构建”这条边界（F6）。凭据规则（F11）本身不排斥由构建拥有方注入，但在既有边界下已有不需要凭据的 ④，就不必另开凭据进入构建的路径。
  - ③ 改变 D10-10、D16-15 规定的依赖形式（F3），属 K4，要表决；D16-15 的备选栏已经评估并放弃了 registry 包和 Release 压缩包等形式。
- **为什么要另开承载：** images#13 把 Dockerfile 结构改动列在范围外（F8），④ 要改 `web-build` 阶段和 README，因此要在 images 另开一个 issue 和对应 PR。images#13 的 lab-web 部分依赖这个新 issue，合入后 W-03 再按默认 build arg 重建 lab-web，完成 images#13 的验收 1–3。

**需闸门确认的边界点：**
- ④ 给 lab-web 构建加了一个必需输入。远程 Komodo Build 流水线归 D9，还没有实现（F5）；README 已写明私有仓库连接由构建拥有方提供（F6）。请判定这算 images 构建定义的私有实现，还是 lab-web 的“部署前提”变化（后者属 K4）。
- D16-15 压力测试 N3 的“按凭据规则由使用方注入”（F4）是 agent 意见，没有进入决策正文。请确认采用 ④ 不需要先把 N3 当作规则处理。

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** D10-10、D16-15 规定的 git 依赖形式和来源分支在 ④ 下完全不变（F3、F10）。④ 是否属于既有契约的直接执行，不触及产品原始意图或公开契约？
- **A-2：** 候选 ① 回到 `d4a91fe`、放弃 #45 之后的 Lab 改动（F9），候选 ③ 改依赖形式（F3）。是否认定二者都触及公开契约或验收语义，不能免票采用？
- **A-3：** ④ 给 lab-web 构建新增一个导出上下文。它是否改变 lab-web 的部署前提或任何跨组件公开接口？Komodo Build 流水线归 D9，尚未实现（F5、F6）。

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** ④ 的全部改动都在 images 全仓（W-03 白名单，`DEC/D16-phaseB-review-restore.md:33` D16-09）：`Dockerfile` 的 `web-build` 阶段和 README。为此在 images 新开一个承载 issue，images#13 的 lab-web 部分改为依赖它。这算既有 W-03 席位内的承载补齐，还是必须投票的跨席位派工？
- **B-2：** W-03 当前在席，正等待 images#13 的裁定。由 W-03 接着做新 issue，不补入其他席位，是否符合 D16-10 的同时活跃上限和 D16-13 的开发期边界（只做本仓检查，不设跨组件 live 锁）？
- **B-3：** ④ 的处置不涉及 W-06、W-09，Pepgent 与 soroi 都不需要改动。确认不需要向这两个席位派任何工作。
- **B-4：** deploy#24 结果 3 继续等 images#13 的 lab-web。W-04 在 PR#25 是否可以先用已发布的 omp-agent digest 更新本仓引用、等 lab-web 发布后再补配对记录？这只是顺序说明，不新增要求。

## 六、可选处置（只列出）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| ④ | images 另开 issue：调用者从已有 soroi clone 导出 `store-contract` 为 git bundle 作命名上下文，`web-build` 在 `npm ci` 前用 git `insteadOf` 改写到本地仓，README 同步；合入后 W-03 按默认 build arg 从 Pepgent `origin/main` 重建 lab-web，完成 images#13 | 不改 | W-03 在白名单内；凭据不进构建；需新开 images issue |
| ① | 用 Pepgent `d4a91fe` 重建 lab-web | 改 images#13 验收语义 | 丢掉 #45 之后 20 个 commit；需表决（K4） |
| ② | BuildKit secret 或 ssh 转发，让读权限进入构建 | 改 images 的凭据边界 | 需另开凭据注入路径；④ 可行时无必要 |
| ③ | 改 `pepgent-store` 的发布形式（registry 包、vendored 源等） | 改 D10-10 / D16-15 | 需表决（K4）；W-06、W-09 都要返工 |

## 七、闸门判定后的程序

- 两道闸门都确认 ④ 不越界：免票放行。在 images 新开承载 issue，在 images#13 写结论和等待对象；由 images 片区经理送达 W-03。
- 任一闸门认定越界：按 P0 用 `council propose --seat Coordination --as DeskImages13Blocked` 立案，notify 含 `Main` 和 images 片区经理。
- 闸门结论分别写入 `evidence/gates/images13-private-dep-gate-a.md`（Argon）和 `evidence/gates/images13-private-dep-gate-b.md`（ArgonGovernance）。
