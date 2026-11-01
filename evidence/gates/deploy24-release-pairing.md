# deploy#24 BLOCKED 的闸门材料：受信 reader 所需的 Mux 发行配对

- **issue：** [Pepgent/deploy#24](https://github.com/Pepgent/deploy/issues/24)，工人 W-04（`pepgent-deploy`）。交付 PR：[Pepgent/deploy#25](https://github.com/Pepgent/deploy/pull/25)（OPEN，`Fixes #24`，分支 `issue-24-trusted-reader`）。
- **BLOCKED：** [评论 6562074885](https://github.com/Pepgent/deploy/issues/24#issuecomment-6562074885)（2026-11-01T18:28:26Z）。只阻塞结果 3；结果 1、2、4 已在 PR#25 实现并附本仓检查。
- **编制：** governance-desk 实例 `DeskDeploy24Blocked`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初分类与待两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过席位路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界才可免投票放行；任一闸门认定越界，按 P0 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论、PR 正文与派工 issue 正文属于 `(A)`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`
- `MUX/` = `Pepgent/omp-rpc-mux` `origin/main` `1406243`
- `IMG/` = `Pepgent/images` `origin/main` `fede9d9`
- `DEP/` = `Pepgent/deploy` `origin/main` `2d93b9e`
- `SORM/` = `Pepgent/soroi` `origin/main`

类别：
- **K1** 既有决策已覆盖，只需澄清
- **K2** 主路径外的失败或竞态（`SOR/.claude/rules/design-assumes-it-works.md`）
- **K3** 已通过契约内的单仓私有实现（`DEC/D10-repo-delivery.md:20`，D10-08）
- **K4** 公开契约缺口（D10-08 表决类别：跨仓公开契约、权限、状态权威与生命周期、部署前提、验收语义等）

---

## 一、工人提出的问题

结果 3 要求：Stack 声明消费的 `MUX_IMAGE`，其 serve 接受所选形式的受信 reader 输入，并记录它与 `lab-web` 中 dial 同一发行的依据（deploy#24 验收 3）。工人请求四项裁决 (A)：

1. 采用哪个候选：① mux 先行（W-04 构建推送 `omp-rpc-mux:latest`，W-03 再按默认 build arg 重建）；② dial 先行（W-04 按 digest 推 mux、不动 `latest`，W-03 用非默认 `--build-arg MUX_IMAGE=<digest>` 重建，之后再移 `latest`）；③ 源头 owner 发布（W-01 发布 mux，W-03 发布 images，W-04 只在两者完成后更新 Slurm 引用、核对配对）。
2. mux 由哪个席位发布。
3. W-03 的重建范围是否包括 omp-agent、central、lab-web。
4. 切换窗口内 S1 冻结，还是由 W-08 跟随重建。

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | 现行 registry 中 `pepgent/omp-rpc-mux` 只有 `latest` 一个 tag；其 `serve --help` 只列 `--listen`、`--auth-token [env: MUX_AUTH_TOKEN]`、`--token-file [env: MUX_AUTH_TOKEN_FILE=]`，没有受信 reader 输入。 | (R) `docker run --rm pepgent-registry.orb.local:5000/pepgent/omp-rpc-mux:latest serve --help`；`curl …/v2/pepgent/omp-rpc-mux/tags/list` → `{"tags":["latest"]}` |
| F2 | Mux 源码 `origin/main` 已提供 `--trusted-reader-token`/`MUX_TRUSTED_READER_TOKEN` 与 `--trusted-reader-token-file`/`MUX_TRUSTED_READER_TOKEN_FILE`。引入 commit `89d7ba1`（“Add trusted reader human IRC routing”）。 | (D) `MUX/src/main.rs:39-48` |
| F3 | PR#25 的 serve 输入形式为 env `MUX_TRUSTED_READER_TOKEN`（D32-01 第 1 步把形式交 deploy 定）；旧镜像忽略该 env、照常启动但不授予人类帧权限。 | (A) PR#25 正文；(D) `DEC/D32-pepgent-24-trusted-reader.md:20` 第 1 步 |
| F4 | **发行物归源头仓：** D10-03“store 以仓 A 镜像发布，Mux 以 `Pepgent/omp-rpc-mux` 镜像发布……组装取各仓默认分支当时的构建产物；实际 commit、release 名与镜像引用写进 `Verdict.build`，只记录本次组装身份，不作通过证据”；取舍“**发行物由定制所在的仓产出，组装仓只消费构建产物**”。 | (D) `DEC/D10-repo-delivery.md:15`（D10-03） |
| F5 | **Mux 镜像发布是 MUX 切片：** MUX-08“发布：linux arm64/x64 与 macOS 的静态二进制；`serve` 容器镜像；compose 服务片段”，验收“镜像在本地仓库”。 | (D) `DEC/D8-mvp-scope.md:241`；承载 `Pepgent/omp-rpc-mux#1`（`DEC/D8-slice-issues.md:27`，Done） |
| F6 | **业务镜像归 images 仓：** D2-13 / D11-04B：Komodo Build 流水线实现前，omp-agent、central、lab-web、remote-step 用 `docker buildx` 构建并推送到 `pepgent-registry`。 | (D) `DEC/D2-components.md:50`；`DEC/D11A-solo-ruling-review.md:44` |
| F7 | **依赖顺序：** IMG-01（omp-agent：上游 omp、omp-rpc-mux、bun）依赖 MUX-08；IMG-04（lab-web）、IMG-05（central）依赖 IMG-01；DEP-01 依赖“IMG-04、STO-12、MUX-08 的产物契约”，开发期只做“本仓声明解析与入口检查，不把完整 Stack 部署当开发门禁”。 | (D) `DEC/D8-mvp-scope.md:224,227,228,347` |
| F8 | **席位白名单：** W-01 = omp-rpc-mux 全仓；W-03 = images 全仓；W-04 = deploy 全仓；W-08 = soroi `e2e/**`、`compose.yaml`、`compose.full.yaml`。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09） |
| F9 | **阶段边界：** 开发期各仓只做本仓检查，不设跨组件 live 锁；W-08、W-10 在阶段 B 只编写 spec 与 runbook，不执行跨组件测试；S1 在阶段 C 统一组装后执行。LEDGER 记当前为阶段 B，R16（阶段 C）未开始。 | (D) `DEC/D16-phaseB-review-restore.md:37`（D16-13）；`DEC/D10-repo-delivery.md:18`（D10-06 入口：组装所需镜像已存在）；`SOR/LEDGER.md:30,35,44` |
| F10 | images 的 `Dockerfile` 以 build arg `MUX_IMAGE`（默认 `…/omp-rpc-mux:latest`）作为 `/omp-rpc-mux` 来源，复制进 `omp-agent` 阶段；`central`、`lab-web` 都从 `omp-agent`（经 `remote-client`）派生。README：“`MUX_IMAGE`、`REMOTE_IMAGE` 两个 build arg 分别指定提供 `/omp-rpc-mux` 与 `/usr/local/bin/remote` 的发布镜像……本仓不重新实现或构建这两个项目”。 | (D) `IMG/Dockerfile:2,5,24`；`IMG/README.md`“镜像目标”节 |
| F11 | dial 的实际消费方：lab-web（`DEP/komodo/syncs/central.toml:24`）、远程 Komodo 模板 body `SOROI_IMAGE=…/omp-agent:latest`（`:57`）、Slurm 模板 body `omp-agent@sha256:3e9e97…`（`DEP/stacks/pepgent-central/slurm.toml:9,36`）、S1 central（`SORM/compose.yaml:46`）。S1 serve 同样消费共享 `omp-rpc-mux:latest`（`SORM/compose.yaml:32`）。 | (D) 各行所列路径 |
| F12 | Mux 组件 README（W-01 路径，非决策正文）：“serve/dial 必须来自同一配套发行，不混用旧内部协议”；容器节写“本机 registry 可用作 `MUX_IMAGE` 的发布目标……构建并推送两个 Linux 架构”，“镜像 tag 本身不是协议配套证明；更新共享 serve 前，部署者先确认实际消费环境里的 dial 来自同一发行”。 | (D) `MUX/README.md:59,73-79` |
| F13 | deploy#24 正文“决策”节把 F12 的“更新共享 serve 属于部署者的职责”列在“摘自 D32-01 v3 第 1 步”之下；D32-01 v3 正文（第 1–4 步与取舍栏）没有关于 Mux 镜像发布、发行配对或镜像重建的任何文字。 | (A) deploy#24 正文；(D) `DEC/D32-pepgent-24-trusted-reader.md:20` |
| F14 | D32-01 第 4 步只为 W-04、W-01 规定承载 issue：W-01 承载为 [omp-rpc-mux#19](https://github.com/Pepgent/omp-rpc-mux/issues/19)，范围只有 README 隔离表述，“不在范围：serve/dial 代码、参数和协议”。images 仓无 OPEN issue（#1–#10 全部 CLOSED）。 | (D) `DEC/D32-pepgent-24-trusted-reader.md:20`；(R) `gh issue list -R Pepgent/images --state all`；`issue://Pepgent/omp-rpc-mux/19` |

## 三、初分类

**主体：K1（既有决策已覆盖，只需澄清），落在候选 ③。**

- **谁发布 mux（问题 2）：** D10-03 规定 Mux 以 `Pepgent/omp-rpc-mux` 镜像发布，发行物由源头仓产出、组装仓只消费（F4）；MUX-08 把 serve 镜像列为 MUX 切片的发布物（F5）；该仓全仓属 W-01（F8）。因此发布者是 W-01。Mux README 容器节“部署者可构建并推送”与“部署者先确认 dial 同发行”（F12）是组件文档，不是决策正文；deploy#24 把它当作 D32 摘录（F13）属派工文字误引，不构成 W-04 发布 mux 的授权。候选 ①②都让 deploy 构建上游发行物，与 D10-03 取舍栏冲突。
- **重建范围（问题 3）：** D2-13/D11-04B 规定 omp-agent、central、lab-web 由 images 仓构建推送（F6），三者都从 `omp-agent` 阶段取 `/omp-rpc-mux`（F10），故三者都需重建；remote-step 不含 dial，不在范围。按 F7 的依赖顺序 MUX-08 → IMG-01 → IMG-04/05，images 在 mux 发布之后以默认 build arg 构建即取得同一发行，不需要非默认 build arg。
- **顺序与配对记录（问题 1）：** 顺序由 F7 的切片依赖给出：W-01 发布 → W-03 重建 → W-04 更新本仓引用（Slurm digest）并补结果 3 的记录。配对记录的形式属 D10-03“写入实际 commit 与镜像引用，只记身份、不作通过证据”的范围；工人提出的逐字节 `cmp` 属 W-04 本仓私有做法（K3），不作为跨组件通过证据。
- **S1 窗口（问题 4）：** K2 且被阶段边界排除。阶段 B 不执行 S1 或任何跨组件 live 测试（F9），因此“新 serve 配旧 dial”的窗口在阶段 B 没有消费者；S1 在阶段 C 组装时取各仓默认分支当时的构建产物（F4）。切换中间态属竞态，按设计规则不作设计。无需冻结，也无需 W-08 跟随重建。

**不属 K4 的理由：** 不改变任何公开接口、协议、凭据或部署前提；受信 reader 参数已在 Mux `origin/main`（F2），D32-01 已定其使用。所缺的是“已合入的源头代码尚未按既定发布路径重新发布”，承载缺失（F14），不是契约缺失。

**需闸门确认的边界点：**
- 结果 3 要求在开发期就由 registry 中的已发布镜像证明（deploy#24 验收 3），而 DEP-01 开发期只依赖上游“产物契约”（F7）。重新发布上游镜像不是跨组件 live 测试，但它让 W-01、W-03 为 deploy 的验收在阶段 B 动作，是否构成跨席位派工需闸门 B 判定。
- 若认定“开发期不应要求已发布镜像”，则结果 3 的验收语义要改为对照 Mux `origin/main` 产物契约、镜像重发推到阶段 C 组装——这是验收语义变化，属 K4。

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** D10-03（发行物由源头仓产出、组装仓只消费）与 MUX-08、D2-13/D11-04B 是否已完整回答“谁发布 mux 与 images”，使候选 ③ 成为既有契约的直接执行、不触及新的产品意图或公开契约？
- **A-2：** Mux README:73-79 的“部署者可构建推送 / 部署者先确认 dial 同发行”与 D10-03 的取舍是否冲突？若冲突，以 D10-03 为准是否无需改任何决策正文？
- **A-3：** 结果 3 在阶段 B 用已发布镜像验收（deploy#24 验收 3），与 DEP-01“产物契约”依赖及 D16-13 的开发期边界是否一致；还是说本项实际触及验收语义，需表决？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 按候选 ③，W-01 在 omp-rpc-mux（全仓白名单）从 `origin/main` 构建推送 serve 镜像，W-03 在 images（全仓白名单）重建 omp-agent、central、lab-web，W-04 在 deploy 更新 Slurm 引用并补结果 3 记录。每步都在各自白名单内。为此在 omp-rpc-mux、images 各开一个承载 issue（mux 也可并入 #19，但 #19 范围排除 serve 代码与协议），是否属必须投票的跨席位派工，还是既有切片依赖（F7）下的承载补齐？
- **B-2：** W-03 当前无 OPEN 承载、可能已按 D16-10 退役；W-01 的 #19 排队未进场。为发布重新补入 W-01、W-03 是否符合 D16-10“滚动补入、同时活跃不超过 4”，是否破坏阶段门禁？
- **B-3：** 阶段 B 移动共享 `latest`（S1 serve 与 central 都消费）是否破坏 D16-13 阶段边界；问题 4 不设 S1 冻结、不让 W-08 跟随重建是否成立？
- **B-4：** deploy#24 把组件 README 文字列为“摘自 D32-01 v3 第 1 步”（F13）。这一派工误引是否需要在 #24 结论中更正（不改 issue 正文的既有事实，仅在结论评论中指出出处）？

## 六、可选处置（只列出）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| ③ | 源头 owner 发布：W-01 从 `origin/main` 构建推送双架构 `omp-rpc-mux:latest`，记录源 commit 与 digest；随后 W-03 以默认 build arg 重建并推送 omp-agent、central、lab-web；W-04 更新 `slurm.toml` 的 omp-agent digest，在 PR#25 补结果 3 的身份记录后合入。S1 不冻结（阶段 B 不运行） | 不改 | 需在 mux、images 开承载；W-01、W-03 需补入 |
| ① | mux 先行，由 W-04 构建推送 mux | 与 D10-03“组装仓只消费”冲突 | W-04 越出 deploy 白名单 |
| ② | dial 先行，W-04 按 digest 推 mux，W-03 非默认 build arg | 同 ① | 同 ① |
| ④ | 结果 3 改为对照 Mux `origin/main` 产物契约，PR#25 先合入，镜像重发推到阶段 C 组装 | 改 deploy#24 验收语义 | 需表决（K4） |

## 七、闸门判定后的程序

- 两道闸门都确认不越界：按 ③ 免票放行，在 omp-rpc-mux、images 各开承载 issue，在 deploy#24 写结论与等待对象，由片区经理送达 W-04；W-01、W-03 进场由 Main 按 D16-10 安排。
- 任一闸门认定越界：按 P0 用 `council propose --seat Coordination` 立案，notify 含 `Main`、`AreaMgrDeploy`。
- 闸门结论写入 `evidence/gates/deploy24-release-pairing-gate-a.md`（Argon）、`evidence/gates/deploy24-release-pairing-gate-b.md`（ArgonGovernance）。
