# omp-rpc-mux#20 BLOCKED 的闸门材料：无仓内改动的 registry 重发是否走 PR、真实 RPC 路径是否在验收边界内

- **issue：** [Pepgent/omp-rpc-mux#20](https://github.com/Pepgent/omp-rpc-mux/issues/20)，工人 W-01（`pepgent-omp-rpc-mux`）。#20 是 [deploy#24](https://github.com/Pepgent/deploy/issues/24) BLOCKED 经两道闸门免票放行后开出的承载，处置依据见本目录 `deploy24-release-pairing.md`、`-gate-a.md`、`-gate-b.md`。依赖链：#20 → [images#13](https://github.com/Pepgent/images/issues/13) → deploy#24 / [PR#25](https://github.com/Pepgent/deploy/pull/25)。
- **BLOCKED：** [评论 6562794532](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562794532)（2026-11-01T19:30:37Z）。验收结果：[评论 6562805022](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562805022)。停工说明：[评论 6562818706](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562818706)。
- **编制：** governance-desk 实例 `DeskMux20Blocked`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初分类和交两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：两道闸门都确认不越界才可免投票放行；任一闸门认定越界，按 P0 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论与派工 issue 正文属于 `(A)`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`
- `MUX/` = `Pepgent/omp-rpc-mux` `origin/main` `9829496`（PR#21 合入后）
- `RULE/` = `/Users/mouriya/.claude/rules/`（机主全局规则，所有 agent 进程均加载）

类别沿用 `deploy24-release-pairing.md`：K1 既有决策或规则已覆盖，只需澄清；K2 主路径外的失败或竞态；K3 已通过契约内的单仓私有实现；K4 公开契约缺口（含验收语义）。

---

## 一、工人提出的问题

W-01 已按 #20 构建、推送双架构镜像并跑完验收 1–4，请求两项裁定 (A)：

1. **Q1：** 只重新发布 registry、没有本仓 Git tree 改动，是否属于 `MUX/AGENTS.md:17` 的“改动”、必须开 PR？若必须，PR 应承载哪项实际仓内改动？W-01 不开空 PR，也不为凑 PR 加范围外文件。
2. **Q2：** 这次不改代码的重发，能否沿用受信 reader 实现 PR [#10](https://github.com/Pepgent/omp-rpc-mux/pull/10) 的真实 RPC 验证，只执行 #20 验收 1–4？还是要用新镜像再走一遍 `MUX/AGENTS.md:18` 的 serve/dial/真实 omp RPC 路径？若要，用哪个仓内 runtime 入口？

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | registry 中 `pepgent/omp-rpc-mux:latest` 的 index 含 `linux/amd64`、`linux/arm64`（另两项 `unknown/unknown` 为 attestation），`Docker-Content-Digest: sha256:98a5a1b216b45a4166348dbc3409e33c6fabb42debea51ff589f63bc1901f837`。 | (R) #20 验收 1、4 的 `curl` 命令，2026-11-02 本实例复跑 |
| F2 | W-01 从 `140624344b3e`（当时 `origin/main`，含 `89d7ba1`）构建；两平台 `serve --help` 列出 `--trusted-reader-token`/`MUX_TRUSTED_READER_TOKEN`、`--trusted-reader-token-file`/`MUX_TRUSTED_READER_TOKEN_FILE`，原有 `--listen`、`--auth-token`、`--token-file` 保留，exit 0；env 同时注入两份凭据启动 serve，5 秒后 `Running=true`，日志只有 `omp-rpc-mux listening on 0.0.0.0:8080`；测试容器已删并登记台账。 | (A) [验收评论 6562805022](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562805022)；digest 与 F1 一致 |
| F3 | #20 不改本仓 Git tree：“不在范围：serve/dial 代码、参数和协议”“README 受信 reader 隔离表述：#19”“二进制 archive”。发行身份写在“本 issue 评论”（结果 3、验收 4“读本 issue 的完成评论”）。约束：“本 issue 刷新的是构建产物，不运行跨组件测试”。 | (A) [#20 正文](https://github.com/Pepgent/omp-rpc-mux/issues/20)“范围边界”“预期结果”“约束”“验收标准” |
| F4 | `MUX/AGENTS.md:17`：“每项改动先有本仓库 issue，再开一个对应 PR；PR body 使用 GitHub closing keyword `Fixes #<issue-number>`，一个 PR 只关闭它对应的 issue。” `:19`：“实现状态、验证结果和阻塞写在 issue 或 PR 评论中”。 | (D) `MUX/AGENTS.md:17,19` |
| F5 | `MUX/AGENTS.md:18`：“只有实际走通用户入口（`serve`、`dial`、真实 omp RPC 写方与读方/控制端点）的 runtime 验证完成后，改动才算完成；静态检查或单独探活不能替代它。” | (D) `MUX/AGENTS.md:18` |
| F6 | 机主全局 issue/PR 规则：“Issue 承载问题、范围、原因、ownership、依赖和 blocker；PR 承载实现说明、closing keyword、证据、checks 和 review”；“先有真实 issue 才开 PR”；“Issue 主题争议、blocked/skipped/no-code 或 PR 明确作废时回 issue”。同文件“对于工作区”一节：“第二种情况是，被任何人委托处理一个issue，那么必须要有对应的pr。如果在main上，通过omp的wt工具自动创建一个worktree，并在里面工作”。 | (D) `RULE/git.rule.md:29,30,32,44-53` |
| F7 | 机主全局 runtime 规则：“凡被人、agent 或自动化消费的代码、配置、prompt、skill、脚本、CI、依赖或部署改动，未经实际 runtime 验证不得称完成……优先从真实用户入口或测试版本触发本次行为”。 | (D) `RULE/runtime-verification-required.rule.md:7,11` |
| F8 | MUX 发布切片的已决验收：MUX-08“发布：linux arm64/x64 与 macOS 的静态二进制；`serve` 容器镜像；compose 服务片段”，验收“镜像在本地仓库；`omp-rpc-mux serve` 容器可以访问”。 | (D) `DEC/D8-mvp-scope.md:241` |
| F9 | 开发期边界：C1-3“同仓/同域关联切片可合并提交 PR，只做本仓编译/类型/基础检查即可合入，不设工人开工锁或每 PR 合并锁”；“严禁要求每一步小切片都单独搭 runtime 验收仪式”“禁止把‘依赖切片已有跨组件 runtime 证据’设为下游开工条件”；D16-13“开发期各仓只做本仓检查，不设跨组件 live 锁”；D10-06 入口“实现切片另有该仓真实入口的局部运行观察……组装所需镜像……已存在”。 | (D) `SOR/AGENTS.md:45,128`；`DEC/D16-phaseB-review-restore.md:37`；`DEC/D10-repo-delivery.md:18` |
| F10 | 发行物归源头仓、身份只记录：D10-03“Mux 以 `Pepgent/omp-rpc-mux` 镜像发布……实际 commit、release 名与镜像引用写进 `Verdict.build`，只记录本次组装身份，不作通过证据”。 | (D) `DEC/D10-repo-delivery.md:15` |
| F11 | 构建源 `1406243` 之后，`origin/main` 前进到 `9829496`（合入 PR#21，承载 #19）。#19 范围只有 README 隔离表述，“不在范围：serve/dial 代码、参数和协议”。 | (R) `gh api repos/Pepgent/omp-rpc-mux/commits/main`；(D) `deploy24-release-pairing.md` F14 |
| F12 | 镜像内容：“镜像是非 root 的 scratch 镜像，只含本程序的 Linux musl 静态二进制，不含 omp”。仓内测试只有 `tests/transport.rs`。 | (D) `MUX/README.md`“容器与 Compose”节；(R) `gh api repos/Pepgent/omp-rpc-mux/contents/tests` |
| F13 | images#13 的依赖写法：“Depends on: omp-rpc-mux#20（`omp-rpc-mux:latest` 已重新发布，且其 serve 支持受信 reader）”。 | (A) [images#13 正文](https://github.com/Pepgent/images/issues/13)“依赖关系” |

## 三、初分类

**两项都是 K1：既有决策和规则已覆盖，只需澄清；不改 #20 的验收。**

### Q1：不开 PR，以 issue DONE 评论关闭

- `MUX/AGENTS.md:17` 把“改动”与“开一个对应 PR、body 用 `Fixes #N`”绑在一起（F4）。PR 的内容就是 Git diff；#20 的产物在 registry，不在 Git tree（F3），没有可让 PR 承载的 diff。按全局规则，PR 承载实现说明与证据（F6 第 29 行）；同一规则把 no-code 事项的讨论放回 issue（F6 第 32 行），`MUX/AGENTS.md:19` 也允许验证结果写在 issue 评论（F4）。#20 正文本身就把发行身份的记录处定为 issue 评论（F3），放行它的 deploy24 双闸门没有要求仓内改动。
- `RULE/git.rule.md:51`“被任何人委托处理一个issue，那么必须要有对应的pr”位于“对于工作区”一节，规定的是有改动时在哪个分支、worktree 提交（F6 第 44-53 行）。没有 Git 改动时，这条规定没有可适用的对象。
- **不采用的做法：** 为凑 PR 改 README 的发布者表述，或加发布记录文件。#20 范围边界没有列入，已通过决策也没有要求（D10-03 只要求记录身份，F10），这样做属于扩范围。
- **待闸门确认的边界点：** 上一条对 `git.rule.md:51` 的理解，是在澄清这条规则的适用对象，还是给机主规则开例外（`SOR/AGENTS.md:125` 禁止开例外）？若认定属于例外，这条规则就是用户规则，按 C2-4 直接执行，不进入表决。此时问题变成“PR 承载什么仓内改动”，这需要改 #20 的范围，属于 K4。

### Q2：真实 RPC 路径不在 #20 的验收边界内，验收 1–4 已覆盖

- `MUX/AGENTS.md:18` 约束的是本仓“改动”的完成条件（F5）。#20 没有代码改动（F3）。镜像里的 serve/dial 代码路径由 `89d7ba1` 引入，按该条规则应在其实现 PR#10 中走通（PR#10 已有真实 RPC 验证一说属 (A)，见 BLOCKED 评论）。构建源之后 `origin/main` 只合入了 README 改动（F11），镜像里的二进制没有新代码路径。
- 这次发布对应 MUX-08 发布切片，已决验收是“镜像在本地仓库；`omp-rpc-mux serve` 容器可以访问”（F8）。#20 验收 1（两平台 index）、2（两平台 `serve --help`）、3（以 deploy 采用的 env 形式启动，监听）、4（身份与读数一致）正对应这条验收（F1、F2）。全局 runtime 规则要求从真实入口跑通消费方式（F7）：镜像的消费方式就是 deploy 以 env 注入两份凭据运行 `serve`，验收 3 跑的正是这个形式，用的是 registry 里的实物。
- 用新镜像再走一遍 serve + dial + 真实 omp RPC，要在 scratch 镜像外另配 omp（F12）。这相当于给一个只刷新构建产物的切片单独加一次 runtime 验收，C1-3 与 `SOR/AGENTS.md:128` 都禁止这样做（F9）。新镜像与 dial 消费镜像配套运行，是阶段 C 统一组装（D10-06、D16-13）的范围。
- **待闸门确认的边界点：** MUX-08 的“serve 容器可以访问”，是否要求在监听日志之外再从容器外建立一次连接（例如未认证 reader 得到 HTTP 401）？若要求，就是给 #20 增加验收项，属于验收语义变化（K4）；初分类认为验收 3 已经满足这一条。

### 对下游的含义

images#13 的依赖条件写的是镜像状态：“已重新发布，且其 serve 支持受信 reader”（F13）。这一状态已由 F1（R）和 F2 观察到。Q1、Q2 只涉及 #20 的结案程序，不改变 registry 中的产物。C1-3 也禁止把上游的结案仪式设为下游开工条件（F9）。因此 images#13 的依赖已经满足，W-03 何时进场由 Main 按 D16-10 安排。

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** #20 以 issue DONE 评论结案、不开 PR，是否只是对 `MUX/AGENTS.md:17` 与机主 issue/PR 规则适用对象的澄清，不触及产品意图或公开契约？`git.rule.md:51` 按“有 Git 改动才适用”理解，是澄清还是例外？
- **A-2：** MUX-08 已决验收（F8）与 #20 验收 1–4 是否已经完整覆盖本次发布？`MUX/AGENTS.md:18` 的真实 RPC 路径留给代码改动和阶段 C 组装，不并入 #20，是否不改变任何已决验收语义？
- **A-3：** images#13 以 F1/F2 所示的已发布产物开工，不等 #20 结案，是否与 IMG-01 依赖 MUX-08（`DEC/D8-mvp-scope.md:224`）的意图一致？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 免票放行 Q1、Q2，是否越过 W-01 的 `D16-09` 白名单（omp-rpc-mux 全仓）或 D16-13 阶段边界？是否属于必须投票的事项（特别是 C2-4 下机主规则不得经表决跳过这一点）？
- **B-2：** images#13 在 #20 结案前开工，是否符合 D16-10 滚动补入与 C1-3“不以上游结案设下游开工锁”？
- **B-3：** #20 结案后，W-01 在 #20 没有遗留工作（#19 已由 PR#21 合入）。W-01 的退役或轮换按 D16-10 由 Main 处理，是否需要在结论中写明？

## 六、可选处置（只列出）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| ⓐ | Q1 不开 PR；Q2 不另走真实 RPC 路径。W-01 在 #20 写 DONE（引用验收评论与 digest）后关闭 issue。images#13 即可开工 | 不改 | 需两道闸门确认 `git.rule.md:51` 的理解属于澄清 |
| ⓑ | Q1 要求开 PR，同时给 #20 补一项仓内改动 | 改 #20 范围 | K4，需表决；承载什么改动没有决策依据 |
| ⓒ | Q2 要求用新镜像走 serve + dial + 真实 omp RPC | 改 #20 验收 | K4，需表决；与 C1-3、`SOR/AGENTS.md:128` 冲突 |

## 七、闸门判定后的程序

- 两道闸门都确认不越界：按 ⓐ 免票放行，在 #20 写结论与 W-01 的具体步骤，由 AreaMgrMux 送达 W-01。images#13 的开工由 Main 按 D16-10 安排 W-03 进场。
- 任一闸门认定越界：按 P0 用 `council propose --seat Coordination --as DeskMux20Blocked` 立案，notify 含 `Main`、`AreaMgrMux`。
- 闸门结论写入 `evidence/gates/mux20-release-gate-a.md`（Argon）、`evidence/gates/mux20-release-gate-b.md`（ArgonGovernance）。

## 八、处置

（待两道闸门判定后填写。）
