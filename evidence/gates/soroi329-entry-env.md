# soroi#329 BLOCKED 的闸门材料：README 中 stop/exec 的中心身份取值来源

- **issue：** [Pepgent/soroi#329](https://github.com/Pepgent/soroi/issues/329)（compose/README 按 #327 的必填中心身份插值更新输入与启动方式），工人 W-07（`pepgent-plugin`）。BLOCKED 见 [#329 评论 6563265463](https://github.com/Pepgent/soroi/issues/329#issuecomment-6563265463)（2026-11-01T20:12:04Z）。
- **工人状态：** 不受影响的部分已推送到切片分支 `issue-329-compose-readme`（`a641d2a`，比 main `e9c524f` 多 1 个提交，只改 `compose/README.md`），裁决送达前不开 PR。W-07 同时在推进 [#336](https://github.com/Pepgent/soroi/issues/336)、[#337](https://github.com/Pepgent/soroi/issues/337)，没有停工。
- **编制：** governance-desk 实例 `DeskSoroi329Blocked`（总协调席，与 Main 合计 1 票）。本文整理事实，给出初分类，并列出交两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：两道闸门都确认不越界，才可以免投票放行；任一闸门认定越界，按 P0 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论、派工 issue 正文（含 #327、#329 正文）和 PR 正文都属于 `(A)`。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`
- `SORM/` = `Pepgent/soroi` `main` `e9c524f`（本实例用 `gh api …/contents/<path>?ref=e9c524f07c31` 读取）
- `BR/` = `Pepgent/soroi` 分支 `issue-329-compose-readme` `a641d2a`

类别沿用前例：K1 既有决策或规则已覆盖，只需澄清；K2 主路径外的失败或竞态；K3 已通过契约内的单仓私有实现；K4 公开契约缺口（含验收语义）。

---

## 一、工人提出的问题

#329 预期结果 2 要求 README 中仍直接调用 `docker compose` 的操作（`exec`、`stop` 等）“写明 env 文件必须带有入口为当前 `central` 产生的那对值”，验收 2 要用这样的 env 文件逐条执行 `stop`；同一正文的“不应残留”又禁止“指导操作员手算、手填或复制这两个值”。#327 交付的入口不把这对值交给操作员，所以两条无法同时满足 (A)。W-07 列出三个方向、不自行选择 (A)：

- (a) W-08 在 `e2e/**` 让入口也代理 `stop`、`exec` 等动作，由入口注入同一对值；
- (b) 入口把派生值写进一个由入口生成的 env 文件，README 让 `stop`/`exec` 用这个文件；
- (c) README 改用不经 Compose 插值的 `docker stop` / `docker exec pepgent-soroi-e2e-central …`，同时修订 #329 预期结果 2 与验收 2 的写法。

## 二、事实

| # | 事实 | 来源 |
|---|---|---|
| F1 | D13-02 的生产方 ②：“`Pepgent/soroi` `compose.yaml` 的 `central`（eng-e2e）：两个变量以必填插值声明，由统一 e2e 入口按同一规则提供”；image 段：“e2e 入口消费本次构建记录里的 digest”；取舍：“部署入口是这一对派生值的唯一生产者与注入者”。D13-02 没有规定 stop、exec 等非启动操作如何取值，也没有规定入口必须提供哪些子命令。 | (D) `DEC/D13-contract-gaps.md:45` |
| F2 | D13 对工程派发：`pepgent-eng-e2e`“`compose.yaml` 的 `central` 声明两变量；统一 e2e 入口……按 D13-02 提供两值”。 | (D) `DEC/D13-contract-gaps.md:56` |
| F3 | D28：D28-01 v2 已撤回；协调席按 D13-02、D16-04 直接补承载 soroi#327（W-08，② standalone）与 soroi#329（W-07，compose README 消费 #327），不另设投票。#329 正文是协调席写的承载文本，不是决策正文。 | (D) `DEC/D28-seam-canary-central-identity-contract-follow.md:34`；`SOR/LEDGER.md:71` |
| F4 | #327 正文“不应残留：在入口或 compose 中为两个身份变量设默认值、回退值或缓存值”；“不在范围：`compose/**`（含 `compose/README.md`），属于 W-07 的路径域”。 | (A) [soroi#327](https://github.com/Pepgent/soroi/issues/327) 正文 |
| F5 | #327 由 [PR#334](https://github.com/Pepgent/soroi/pull/334) 合入（merge `69fdfc0`，2026-11-01T17:55:09Z），改动文件为 `compose.yaml`、`e2e/README.md`、`e2e/package.json`、`e2e/stack/{central-identity,smoke,stack}.ts`。PR 正文交接 W-07：README“应改为经 `bun run --cwd e2e stack up` 启动”，没有提到 stop、exec。 | (R) `gh pr view 334 -R Pepgent/soroi`；(A) PR#334 正文 |
| F6 | 入口只有三个动作：`type Action = "config" \| "up" \| "projection"`；`--` 之后的参数只交给 `up`。两值只写进本次子进程环境：`const env = { ...process.env, CENTRAL_IMAGE: image.ref, SOROI_CENTRAL_IMAGE_DIGEST: image.digest, SOROI_CENTRAL_CONFIG_DIGEST: configDigest(projection) }`，入口不写文件。 | (D) `SORM/e2e/stack/stack.ts:9,18,35,89-91` |
| F7 | `compose.yaml` 的 `central` 以 `${SOROI_CENTRAL_IMAGE_DIGEST:?…}`、`${SOROI_CENTRAL_CONFIG_DIGEST:?…}` 声明两值，所以对 `compose.yaml` 的任何 `docker compose` 命令（含 `stop`、`exec`、`ps`）在插值阶段就要求两值。W-07 在切片 worktree 实测 `docker compose -f compose.yaml ps` exit 1，报两个变量缺值。 | (D) `SORM/compose.yaml:57-58`；(A) BLOCKED 事实 3 |
| F8 | 三个服务都有固定容器名：`pepgent-soroi-e2e-store`、`pepgent-soroi-e2e-mux`、`pepgent-soroi-e2e-central`。README 现行写法已用 `docker attach --sig-proxy=false pepgent-soroi-e2e-central` 按容器名直接操作 central。 | (D) `SORM/compose.yaml:9,33,47`；`SORM/compose/README.md:39,47` |
| F9 | README 中仍直接调用 `docker compose`、且不是启动或重建的命令共 6 条：full 模式验证段的 `exec central remote templates`、`exec central cat …`（`:111-115`），base 的 `stop central`、`stop mux store`（`:127-128`），full 的同两条 `stop`（`:134-137`）。 | (D) `SORM/compose/README.md:111-115,126-137` |
| F10 | `BR/` 已把 Inputs 表、镜像说明、base/full 启动与模式切换改成入口写法，并写明“The central identity pair is not part of that env file: the unified e2e entry derives it for each invocation”；验证段与 Stop 段仍是 main 的原文。 | (R) `gh api repos/Pepgent/soroi/compare/e9c524f…a641d2a` |
| F11 | 席位路径域：W-07 写 `compose/**`（含 `README.md`）；W-08 写 `e2e/**`、`compose.yaml`、`compose.full.yaml`。开发期各仓只做本仓检查。 | (D) `DEC/D16-phaseB-review-restore.md:33`（D16-09）、`:37`（D16-13） |
| F12 | 对应的 D8 行：DIST-03“standalone compose 定义：store、mux、central”，本仓检查为“compose 定义解析及本仓入口检查”；IMG-05 是 central 镜像。两行都没有规定 stop、exec 的写法。 | (D) `DEC/D8-mvp-scope.md:228,296` |

## 三、初分类

**K1：已通过契约内的写法选择，不是契约缺口。** D13-02 只规定两值由入口产生和注入、不得有第二个生产者（F1）；没有规定入口的子命令集合，也没有规定 stop、exec 怎样写（F1、F12）。冲突只出在协调席自己写的承载正文 #329（F3）：预期结果 2 假定“env 文件里带入口产生的值”是可得的，而 #327 的实际交付（F6）与 #327 自身的“不得缓存”（F4）都不提供这种文件。修正的是这段承载文本，不是 D13-02。

三个方向对照 D13-02：

- **(c) 推荐。** `docker stop <容器名>`、`docker exec <容器名> …` 不读 compose 文件，也就不经插值（F7、F8）；它们作用于入口在 `up` 时已注入两值的运行中容器，操作员既不产生、也不注入、也不复制两值，入口仍是唯一生产者与注入者（F1）。改动只在 `compose/README.md`，属 W-07 路径域（F11）；README 已按容器名 `attach`，写法不新造约定（F8）。代价是修订 #329 预期结果 2 和验收 2 的写法。
- **(a) 可行，但不必要。** 入口代理 stop、exec 同样满足 D13-02；但要改 W-08 已合入的入口，需要 W-08 重新进场开新承载，而 stop、exec 根本不需要身份值，只是为了通过插值才被迫重算一次。
- **(b) 不采用。** 入口生成的 env 文件就是两值的落盘副本，违反 #327“不应残留……缓存值”（F4）。反例：生成文件后改了 `OMP_CONFIG_FILE` 指向的内容，操作员再直接 `docker compose --env-file <生成的文件> … up`，central 会带着旧的 config digest 启动，出现入口之外的第二条注入路径，违背 D13-02“唯一生产者与注入者”（F1）。

**处置 (c) 的具体内容（供闸门判定）：**

1. W-07 在 #329 内把 F9 的 6 条命令改成按容器名操作：
   - full 验证段：`docker exec pepgent-soroi-e2e-central remote templates`、`docker exec pepgent-soroi-e2e-central cat /srv/pepgent-runs/<completed-job-directory>/result.txt`；
   - Stop 段：先 `docker stop pepgent-soroi-e2e-central`，再 `docker stop pepgent-soroi-e2e-mux pepgent-soroi-e2e-store`。base 与 full 用同一组命令，因为 stop 不依赖 compose 文件。
   - README 写明：启动和重建只经入口；其余操作按固定容器名进行，不需要也不提供两值；README 中除 `bun run --cwd e2e stack …` 之外不残留任何直接对 `compose.yaml` 的 `docker compose` 命令。
2. 协调席修订 #329 正文：
   - 预期结果 2 后半句改为“启动、重建之外的操作（`exec`、`stop`）按 `compose.yaml` 声明的固定容器名用 `docker exec`、`docker stop` 进行，不经 Compose 插值，不需要也不提供两值”；
   - 验收 2 改为两项检查：README 中除入口调用外不存在直接对 `compose.yaml` 的 `docker compose` 命令；README 的每条 `docker stop`/`docker exec` 使用的容器名与 `compose.yaml` 的 `container_name` 一致。
   - 正文其余部分不变。#329 的“不应残留”条款不变，原评论保持原样。
3. 不新开 issue，不需要 W-08 进场，不改 `e2e/**`、`compose.yaml`。

## 四、闸门 A 的问题（交 `Argon`）

- **A-1：** D13-02 只规定两值由入口唯一产生和注入（F1）。README 的 stop、exec 改为按容器名操作，不经插值、不触碰两值，这是否完全在 D13-02 之内，不触及任何公开契约或产品意图？
- **A-2：** #329 预期结果 2 和验收 2 是协调席的承载文本（F3）。按第三节第 2 点修订它们，是否只是纠正承载文本对 #327 实际交付的错误假定，而不改变 D13-02 或 DIST-03 的验收语义（F12）？
- **A-3：** (b) 落盘 env 文件与 D13-02“唯一生产者与注入者”、#327“不缓存”是否冲突（第三节反例）？

## 五、闸门 B 的问题（交 `ArgonGovernance`）

- **B-1：** 处置 (c) 的全部改动在 W-07 的 `compose/**`（F11），由 #329 承载，不新开 issue，W-08 不进场。是否越过 D16-09 白名单或 D16-13 阶段边界？是否属于必须投票的事项？
- **B-2：** 由协调席（本实例）直接修订自己写的 #329 正文中预期结果 2 和验收 2 两处，并发评论说明依据与修订内容。按 `SOR/AGENTS.md:123`，承载 issue 正文的修订不等于决策；这里不新增或改变公开接口、权限或验收语义。这样做是否合规？
- **B-3：** 结论由 AreaMgrSoroi 按 C4-2 送达 W-07（W-07 在席），这样写是否足够？

## 六、可选处置（只列出）

| 代号 | 处置 | 是否改契约 | 需要注意的地方 |
|---|---|---|---|
| ⓐ | 方向 (c)：W-07 在 #329 把 6 条命令改为按容器名的 `docker stop`/`docker exec`；协调席修订 #329 预期结果 2 与验收 2；不新开 issue，W-08 不进场 | 不改 | 需两道闸门确认；#329 正文修订由协调席做 |
| ⓑ | 方向 (a)：新开 W-08 承载，让入口代理 `stop`、`exec`；#329 等该承载合入后再改 6 条命令 | 不改 D13-02；改入口 CLI | 需要 W-08 重新进场；stop/exec 本不需要身份值，只为过插值而重算 |
| ⓒ | 方向 (b)：入口生成 env 文件 | 与 #327“不缓存”、D13-02“唯一注入者”冲突 | 第三节反例；不建议 |

## 七、闸门判定后的程序

- 两道闸门都确认不越界：按 ⓐ 免票放行。协调席修订 #329 正文两处，并在 #329 写结论评论（采用哪个方向、谁在哪里改）。由 AreaMgrSoroi 送达 W-07。
- 任一闸门认定越界：按 P0 用 `council propose --seat Coordination --as DeskSoroi329Blocked` 立案，notify 含 `Main`、`AreaMgrSoroi`。
- 闸门结论写入 `evidence/gates/soroi329-entry-env-gate-a.md`（Argon）和 `evidence/gates/soroi329-entry-env-gate-b.md`（ArgonGovernance）。

## 八、处置

- **闸门 A（`Argon-2`）：** 不越界，K1，放行处置 ⓐ（方向 c）；(b) 与 D13-02 冲突，(a) 是不必要的跨席位返工。见 `soroi329-entry-env-gate-a.md`（PM `55ea029`）。
- **闸门 B（`ArgonGovernance-2`）：** 不越界。B-1 改动只在 W-07 的 `compose/**`，不需要投票；B-2 在闸门 A 确认不改验收语义的前提下，协调席可以修订 #329 正文两处；B-3 由 AreaMgrSoroi 按 C4-2 送达。见 `soroi329-entry-env-gate-b.md`（PM `8f8a838`）。
- **结论：** 按 ⓐ 免票放行，不新开 issue，W-08 不进场。
- **已执行：**
  - #329 正文已修订两处：预期结果 2 的后半句、验收 2。正文其余部分不变。
  - [#329 评论 6563373431](https://github.com/Pepgent/soroi/issues/329#issuecomment-6563373431) 写明采用方向 (c)，以及由谁在哪里改：W-07 在 `issue-329-compose-readme` 上把 6 条命令改为按容器名的 `docker exec`/`docker stop`，`a641d2a` 不需要返工。
- **送达：** 由 AreaMgrSoroi 按 C4-2 送达 W-07（在席）。
