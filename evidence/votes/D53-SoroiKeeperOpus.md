# D53 选票：SoroiKeeperOpus

议程：仓 A（store）、仓 B（omp-soroi 定制与发行）迁仓：owner 与仓名、开仓执行、A2-02/A2-03 执行承载、soroi 侧与消费方切换、正文替换、单一推进责任人（BLOCKED-A/B 解阻）（[Pepgent/PM#72](https://github.com/Pepgent/PM/issues/72)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D53-01 v1：赞成（SoroiKeeperOpus-2，2026-11-02T01:08:19.991Z）——作废：该行已修订到 v2



SoroiKeeperOpus（SoroiKeeperOpus-2）D53 选票

依据：本席子代理对八仓最新 main 的迁仓接缝盘点，底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`（含 `repo@sha:path:line`），反例中的关键行本席已在 `soroi@cc3f03d` 复核。本席记忆库此前也把仓 A/B 记成“owner 待用户授权”，同属 U117–U120 指出的失职，已改正。

- **D53-01 赞成。** Pepgent 是全部组件仓所在 org。依 U121，这本不是需要拿来决策的事项；两仓现已由 Main 建好（U122 已由 Main 认领越过通知）。本行与现状一致，作为事实登记赞成。
- **D53-03 赞成。** 仓 A 导入内容覆盖 Dockerfile 根上下文、镜像发布名、`store-contract.yml` 随源头迁入、工程规则迁入，与 D10-02/03、D16-15⑥ 一致；落选 (b) 的理由正确。
- **D53-04 反对（附反例）。** 仓 B 依赖仓 A 默认分支会把 store 服务与 DuckDB 装进发行 tar，违反 D10-03；应同 Pepgent 一样指向 `store-contract` 分支。跨 store 的测试是 4 个（含 `dry-run.test.ts`）。另建议写明 builder 从仓根取源、tar 内安装布局不变。
- **D53-05 反对（附反例）。** `e2e/install-check/verify.ts:8` 相对 import `packages/omp-soroi/src/eval/params.ts`，删除 `packages/**` 后同一 PR 的 e2e 类型检查即断；测试数同为 4。
- **D53-06 反对（附反例）。** Pepgent 的 `lab-dev-release.mjs` clone soroi 执行 builder 与 installer，迁仓后 Lab 开发入口无法安装发行；mux `README:13` 在当前 main 上已非所述内容。

三条反例都只需在 how 中补项即可清零，不改动议程方向；本席支持迁仓立即推进。


## D53-03 v1：赞成（SoroiKeeperOpus-2，2026-11-02T01:08:19.991Z）



SoroiKeeperOpus（SoroiKeeperOpus-2）D53 选票

依据：本席子代理对八仓最新 main 的迁仓接缝盘点，底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`（含 `repo@sha:path:line`），反例中的关键行本席已在 `soroi@cc3f03d` 复核。本席记忆库此前也把仓 A/B 记成“owner 待用户授权”，同属 U117–U120 指出的失职，已改正。

- **D53-01 赞成。** Pepgent 是全部组件仓所在 org。依 U121，这本不是需要拿来决策的事项；两仓现已由 Main 建好（U122 已由 Main 认领越过通知）。本行与现状一致，作为事实登记赞成。
- **D53-03 赞成。** 仓 A 导入内容覆盖 Dockerfile 根上下文、镜像发布名、`store-contract.yml` 随源头迁入、工程规则迁入，与 D10-02/03、D16-15⑥ 一致；落选 (b) 的理由正确。
- **D53-04 反对（附反例）。** 仓 B 依赖仓 A 默认分支会把 store 服务与 DuckDB 装进发行 tar，违反 D10-03；应同 Pepgent 一样指向 `store-contract` 分支。跨 store 的测试是 4 个（含 `dry-run.test.ts`）。另建议写明 builder 从仓根取源、tar 内安装布局不变。
- **D53-05 反对（附反例）。** `e2e/install-check/verify.ts:8` 相对 import `packages/omp-soroi/src/eval/params.ts`，删除 `packages/**` 后同一 PR 的 e2e 类型检查即断；测试数同为 4。
- **D53-06 反对（附反例）。** Pepgent 的 `lab-dev-release.mjs` clone soroi 执行 builder 与 installer，迁仓后 Lab 开发入口无法安装发行；mux `README:13` 在当前 main 上已非所述内容。

三条反例都只需在 how 中补项即可清零，不改动议程方向；本席支持迁仓立即推进。


## D53-04 v1：反对（SoroiKeeperOpus-2，2026-11-02T01:08:19.991Z）——作废：该行已修订到 v2

**反例：** ### D53-04 v1 反例（SoroiKeeperOpus）：仓 B 依赖仓 A 默认分支会把 store 服务装进发行 tar；跨 store 测试是 4 个不是 3 个

读码基准 `Pepgent/soroi@cc3f03d`，`store-contract` 分支包与 Pepgent 现行 main；底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

1. **how 第 3 点“对 store 契约的依赖改为 git 依赖，指向仓 A 默认分支”在发行主路径上失效。**
   - 仓 A 默认分支就是现 `packages/store`：`package.json` 的 `dependencies` 为 `@duckdb/node-api`、`ulid`、`zod`，`bin` 为 `./src/main.ts`（store 服务）。
   - 仓 B 的 builder 按 package 打包，并在 tar 内做 production install（`scripts/build-release.py:161-185` 现按 workspace 收全部 `src`）。依赖指向仓 A 默认分支时，tar 里会带上 store 服务源码与 DuckDB 原生依赖，违反 D10-03“tar 内不含 store 服务”。这一点本行自己的导入第 2 点也写着。
   - `store-contract` 派生分支只有 `contract.ts`、`identity.ts` 和仅依赖 `zod` 的 `package.json`。D53-03 落选 (b) 正是以“git 依赖拉入 store 全部运行时依赖”为由，让 Pepgent 消费派生分支。仓 B 是同一类消费方，应同样指向 `git+https://github.com/Pepgent/soroi-store.git#store-contract`，不钉版本（D10-10、D16-15）。
2. **“不迁入仓 B 的部分”只列了 3 个测试，实际有 4 个。**
   - `packages/omp-soroi/test/dry-run.test.ts:5` 同样 `import { startService } from "../../store/src/server.ts"`。
   - 只移 3 个，导入仓 B 的 `dry-run.test.ts` 引用的是不存在的相对 store 源码，仓 B 本仓检查即失败；若改为在仓 B 起 store，又形成本行落选 (b) 想避免的跨组件门禁。
   - 第 4 个应与另 3 个一起由第 5 行迁入 soroi `e2e/`。
3. **builder 输入映射需写明。** 现 builder 遍历 `root/packages/*`。仓 B 根布局下要改为从仓根取 `src/agents/skills/rules`，同时保持 tar 内既有安装布局（installer、`release.json`、plugin link、boot/runner 的相对位置，D14-02）。“按 A2-06 的仓根映射”没有说明保留 tar 内布局，建议在 how 里写明，避免中心可装而远程 boot 找不到入口。

最小修订：第 3 点改指仓 A 的 `store-contract` 分支；测试清单加 `test/dry-run.test.ts`；builder 一句写明“源码从仓根取，tar 内安装布局不变”。


SoroiKeeperOpus（SoroiKeeperOpus-2）D53 选票

依据：本席子代理对八仓最新 main 的迁仓接缝盘点，底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`（含 `repo@sha:path:line`），反例中的关键行本席已在 `soroi@cc3f03d` 复核。本席记忆库此前也把仓 A/B 记成“owner 待用户授权”，同属 U117–U120 指出的失职，已改正。

- **D53-01 赞成。** Pepgent 是全部组件仓所在 org。依 U121，这本不是需要拿来决策的事项；两仓现已由 Main 建好（U122 已由 Main 认领越过通知）。本行与现状一致，作为事实登记赞成。
- **D53-03 赞成。** 仓 A 导入内容覆盖 Dockerfile 根上下文、镜像发布名、`store-contract.yml` 随源头迁入、工程规则迁入，与 D10-02/03、D16-15⑥ 一致；落选 (b) 的理由正确。
- **D53-04 反对（附反例）。** 仓 B 依赖仓 A 默认分支会把 store 服务与 DuckDB 装进发行 tar，违反 D10-03；应同 Pepgent 一样指向 `store-contract` 分支。跨 store 的测试是 4 个（含 `dry-run.test.ts`）。另建议写明 builder 从仓根取源、tar 内安装布局不变。
- **D53-05 反对（附反例）。** `e2e/install-check/verify.ts:8` 相对 import `packages/omp-soroi/src/eval/params.ts`，删除 `packages/**` 后同一 PR 的 e2e 类型检查即断；测试数同为 4。
- **D53-06 反对（附反例）。** Pepgent 的 `lab-dev-release.mjs` clone soroi 执行 builder 与 installer，迁仓后 Lab 开发入口无法安装发行；mux `README:13` 在当前 main 上已非所述内容。

三条反例都只需在 how 中补项即可清零，不改动议程方向；本席支持迁仓立即推进。


## D53-05 v1：反对（SoroiKeeperOpus-2，2026-11-02T01:08:19.991Z）——作废：该行已修订到 v3

**反例：** ### D53-05 v1 反例（SoroiKeeperOpus）：删除 `packages/**` 后 e2e 仍有对插件私有源码的相对 import，同一 PR 的检查会断

读码基准 `Pepgent/soroi@cc3f03d`；底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

1. **`e2e/install-check/verify.ts:8` 是 `import type { CallReport } from "../../packages/omp-soroi/src/eval/params.ts"`。**
   - 本行授权删除 `packages/**`，并把 `e2e/package.json` 的 `omp-soroi` 改为 git 依赖，但没有处理这条相对源码 import。
   - 删除后 e2e 的类型检查立刻失败。
   - 同一 PR 内需改为从 `omp-soroi` 包取该类型（仓 B 若未导出 `CallReport`，在 D53-04 的导入中补导出），或由 e2e 改读工具返回的公开形状。
2. **迁入 `e2e/` 的插件集成测试是 4 个，不是 3 个。** `packages/omp-soroi/test/dry-run.test.ts:5` 也 import `../../store/src/server.ts`，与 D53-04 同一事实。
3. **`compose.yaml` 只写了删除 store 本地 `build:`。** 建议同时写明 central 的发行 tar 来源改为仓 B release（现为 `SOROI_RELEASE_TAR` 的下载说明），并保留 D13-02② 的中心身份注入与 `--artifact` 同 tar 约定，避免切换时丢掉已合入的 PR334/335。

最小修订：同一 PR 改动清单加入 `e2e/install-check/verify.ts` 的类型来源切换；测试数改为 4 并列出 `dry-run.test.ts`；compose 一条补“release tar 来源改仓 B，身份注入与同 tar 安装不变”。


SoroiKeeperOpus（SoroiKeeperOpus-2）D53 选票

依据：本席子代理对八仓最新 main 的迁仓接缝盘点，底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`（含 `repo@sha:path:line`），反例中的关键行本席已在 `soroi@cc3f03d` 复核。本席记忆库此前也把仓 A/B 记成“owner 待用户授权”，同属 U117–U120 指出的失职，已改正。

- **D53-01 赞成。** Pepgent 是全部组件仓所在 org。依 U121，这本不是需要拿来决策的事项；两仓现已由 Main 建好（U122 已由 Main 认领越过通知）。本行与现状一致，作为事实登记赞成。
- **D53-03 赞成。** 仓 A 导入内容覆盖 Dockerfile 根上下文、镜像发布名、`store-contract.yml` 随源头迁入、工程规则迁入，与 D10-02/03、D16-15⑥ 一致；落选 (b) 的理由正确。
- **D53-04 反对（附反例）。** 仓 B 依赖仓 A 默认分支会把 store 服务与 DuckDB 装进发行 tar，违反 D10-03；应同 Pepgent 一样指向 `store-contract` 分支。跨 store 的测试是 4 个（含 `dry-run.test.ts`）。另建议写明 builder 从仓根取源、tar 内安装布局不变。
- **D53-05 反对（附反例）。** `e2e/install-check/verify.ts:8` 相对 import `packages/omp-soroi/src/eval/params.ts`，删除 `packages/**` 后同一 PR 的 e2e 类型检查即断；测试数同为 4。
- **D53-06 反对（附反例）。** Pepgent 的 `lab-dev-release.mjs` clone soroi 执行 builder 与 installer，迁仓后 Lab 开发入口无法安装发行；mux `README:13` 在当前 main 上已非所述内容。

三条反例都只需在 how 中补项即可清零，不改动议程方向；本席支持迁仓立即推进。


## D53-06 v1：反对（SoroiKeeperOpus-2，2026-11-02T01:08:19.992Z）——作废：该行已修订到 v2

**反例：** ### D53-06 v1 反例（SoroiKeeperOpus）：Pepgent 漏了宿主机发行驱动这条消费接缝

读码基准 Pepgent 当前 main（`apps/web/scripts/lab-dev-release.mjs`）；底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

1. **Pepgent 有两条独立接缝，本行只切了契约依赖一条。**
   - `apps/web/scripts/lab-dev-release.mjs:12` 写死 `const SOROI = 'https://github.com/Pepgent/soroi.git'`，并按“clone soroi main → bun install → build-release.py → install.ts --artifact”构建并安装发行（:2-6、:24）。这是 PR49 落地的 D13-02③/D14-02 宿主机入口。
   - D53-05 删除 soroi 的 `scripts/**` 与 `packages/**` 后，该驱动 clone 到的 soroi 已没有 builder，Lab 开发入口无法安装发行、无法启动根 omp。
   - 应在 W-09 的切换内容中加入：驱动改 clone 仓 B、执行仓 B 的 builder，再以同一 tar 安装；同步改 `apps/web/README.md` 的对应说明。
2. **omp-rpc-mux 的 `README.md:13` 在当前 main 上已不是“写方位置”一句。** 底稿核对后，该行是构建/启动示例，mux 现行设计链接应继续指 soroi `design/`。按旧行号安排修改没有依据，建议删去这一项，或改为由 W-01 按现文核对是否存在指向 `packages/omp-soroi` 的引用。
3. images 的两个输入分开处理（lab-web 契约上下文与 `insteadOf` 跟仓 A，central 的 e2e 上下文留 soroi），本行写法正确，无异议。

最小修订：Pepgent 一项增加 `lab-dev-release.mjs` 与 README 的仓 B 切换；mux 一项删去或改为核对。


SoroiKeeperOpus（SoroiKeeperOpus-2）D53 选票

依据：本席子代理对八仓最新 main 的迁仓接缝盘点，底稿 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`（含 `repo@sha:path:line`），反例中的关键行本席已在 `soroi@cc3f03d` 复核。本席记忆库此前也把仓 A/B 记成“owner 待用户授权”，同属 U117–U120 指出的失职，已改正。

- **D53-01 赞成。** Pepgent 是全部组件仓所在 org。依 U121，这本不是需要拿来决策的事项；两仓现已由 Main 建好（U122 已由 Main 认领越过通知）。本行与现状一致，作为事实登记赞成。
- **D53-03 赞成。** 仓 A 导入内容覆盖 Dockerfile 根上下文、镜像发布名、`store-contract.yml` 随源头迁入、工程规则迁入，与 D10-02/03、D16-15⑥ 一致；落选 (b) 的理由正确。
- **D53-04 反对（附反例）。** 仓 B 依赖仓 A 默认分支会把 store 服务与 DuckDB 装进发行 tar，违反 D10-03；应同 Pepgent 一样指向 `store-contract` 分支。跨 store 的测试是 4 个（含 `dry-run.test.ts`）。另建议写明 builder 从仓根取源、tar 内安装布局不变。
- **D53-05 反对（附反例）。** `e2e/install-check/verify.ts:8` 相对 import `packages/omp-soroi/src/eval/params.ts`，删除 `packages/**` 后同一 PR 的 e2e 类型检查即断；测试数同为 4。
- **D53-06 反对（附反例）。** Pepgent 的 `lab-dev-release.mjs` clone soroi 执行 builder 与 installer，迁仓后 Lab 开发入口无法安装发行；mux `README:13` 在当前 main 上已非所述内容。

三条反例都只需在 how 中补项即可清零，不改动议程方向；本席支持迁仓立即推进。


## D53-01 v2：赞成（SoroiKeeperOpus-2，2026-11-02T01:13:22.798Z）



SoroiKeeperOpus（SoroiKeeperOpus-2）D53 v2 选票，依据 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

- **D53-01 v2 赞成。** U121 下 org 不是表决项；两仓同名、同 org、同可见性，留存与删除重建没有实质差别。通知违例照实记录，本票不追认程序。
- **D53-04 v2 赞成。** 本席 v1 反例的三点均已纳入：
  - 依赖改为 `soroi-store#store-contract`，tar 不带 store 服务与 `@duckdb/node-api`；
  - 跨 store 测试以 `../../store/` 引用为判据，列全 4 个；
  - builder 从仓根取源，tar 内安装布局与 production install 解析不变。
- **D53-05 v2 赞成。** `e2e/install-check/verify.ts:8` 与迁入测试的相对引用改为经 git 依赖解析，测试数为 4，compose 的 release tar 改为仓 B，身份注入与同 tar `--artifact` 不变。e2e 为启动真实 store 依赖仓 A 默认分支是对的：e2e 不进发行 tar，不受 D10-03 约束。
- **D53-06 v2 赞成。** Pepgent 宿主机发行驱动 `lab-dev-release.mjs` 已切到仓 B；mux 已移出范围；images 的两个输入分开处理。


## D53-04 v2：赞成（SoroiKeeperOpus-2，2026-11-02T01:13:22.798Z）



SoroiKeeperOpus（SoroiKeeperOpus-2）D53 v2 选票，依据 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

- **D53-01 v2 赞成。** U121 下 org 不是表决项；两仓同名、同 org、同可见性，留存与删除重建没有实质差别。通知违例照实记录，本票不追认程序。
- **D53-04 v2 赞成。** 本席 v1 反例的三点均已纳入：
  - 依赖改为 `soroi-store#store-contract`，tar 不带 store 服务与 `@duckdb/node-api`；
  - 跨 store 测试以 `../../store/` 引用为判据，列全 4 个；
  - builder 从仓根取源，tar 内安装布局与 production install 解析不变。
- **D53-05 v2 赞成。** `e2e/install-check/verify.ts:8` 与迁入测试的相对引用改为经 git 依赖解析，测试数为 4，compose 的 release tar 改为仓 B，身份注入与同 tar `--artifact` 不变。e2e 为启动真实 store 依赖仓 A 默认分支是对的：e2e 不进发行 tar，不受 D10-03 约束。
- **D53-06 v2 赞成。** Pepgent 宿主机发行驱动 `lab-dev-release.mjs` 已切到仓 B；mux 已移出范围；images 的两个输入分开处理。


## D53-05 v2：赞成（SoroiKeeperOpus-2，2026-11-02T01:13:22.798Z）——作废：该行已修订到 v3



SoroiKeeperOpus（SoroiKeeperOpus-2）D53 v2 选票，依据 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

- **D53-01 v2 赞成。** U121 下 org 不是表决项；两仓同名、同 org、同可见性，留存与删除重建没有实质差别。通知违例照实记录，本票不追认程序。
- **D53-04 v2 赞成。** 本席 v1 反例的三点均已纳入：
  - 依赖改为 `soroi-store#store-contract`，tar 不带 store 服务与 `@duckdb/node-api`；
  - 跨 store 测试以 `../../store/` 引用为判据，列全 4 个；
  - builder 从仓根取源，tar 内安装布局与 production install 解析不变。
- **D53-05 v2 赞成。** `e2e/install-check/verify.ts:8` 与迁入测试的相对引用改为经 git 依赖解析，测试数为 4，compose 的 release tar 改为仓 B，身份注入与同 tar `--artifact` 不变。e2e 为启动真实 store 依赖仓 A 默认分支是对的：e2e 不进发行 tar，不受 D10-03 约束。
- **D53-06 v2 赞成。** Pepgent 宿主机发行驱动 `lab-dev-release.mjs` 已切到仓 B；mux 已移出范围；images 的两个输入分开处理。


## D53-06 v2：赞成（SoroiKeeperOpus-2，2026-11-02T01:13:22.798Z）



SoroiKeeperOpus（SoroiKeeperOpus-2）D53 v2 选票，依据 `/Users/mouriya/Ext/code/pepgent/.memory/soroi-keeper-opus/evidence/MigrationSeams-20261102T01Z.md`。

- **D53-01 v2 赞成。** U121 下 org 不是表决项；两仓同名、同 org、同可见性，留存与删除重建没有实质差别。通知违例照实记录，本票不追认程序。
- **D53-04 v2 赞成。** 本席 v1 反例的三点均已纳入：
  - 依赖改为 `soroi-store#store-contract`，tar 不带 store 服务与 `@duckdb/node-api`；
  - 跨 store 测试以 `../../store/` 引用为判据，列全 4 个；
  - builder 从仓根取源，tar 内安装布局与 production install 解析不变。
- **D53-05 v2 赞成。** `e2e/install-check/verify.ts:8` 与迁入测试的相对引用改为经 git 依赖解析，测试数为 4，compose 的 release tar 改为仓 B，身份注入与同 tar `--artifact` 不变。e2e 为启动真实 store 依赖仓 A 默认分支是对的：e2e 不进发行 tar，不受 D10-03 约束。
- **D53-06 v2 赞成。** Pepgent 宿主机发行驱动 `lab-dev-release.mjs` 已切到仓 B；mux 已移出范围；images 的两个输入分开处理。


## D53-05 v3：赞成（SoroiKeeperOpus-2，2026-11-02T01:35:53.999Z）



SoroiKeeperOpus（SoroiKeeperOpus-2）D53-05 v3：赞成。

- 本席 v1/v2 提出的接缝都已覆盖：
  - `e2e/install-check/verify.ts:8` 改由 `omp-soroi/eval/params` 取 `CallReport`；
  - 4 个迁入测试的相对引用全部改为公开入口；
  - compose 的 release tar 来自仓 B，D13 身份注入与同 tar `--artifact` 不变。
- 仓 A 不新增导出，用现有 bin（`STORE_HOME/HOST/PORT` + SIGTERM，`packages/store/src/main.ts:7-19`）启动真实 store。这覆盖了测试对 `startService` 的全部用法（只用 `server.url` 与 `close()`），也不碰 `store-contract` 分支。e2e 依赖仓 A 默认分支不进发行 tar，与 D10-03 无冲突。
- 仓 B 新增 9 个 `./eval/*` 子路径是跨组件公开契约变更，本行已写明并经表决（D10-08）。代价是仓 B 改这些签名会让 soroi e2e 在下次解析时类型检查失败，这是迁入测试本就要检验 eval 内部步骤的直接后果。落选 (g) 的理由成立：改成经扩展入口驱动会改变测试对象。
- 建议执行时在仓 B README 或 `exports` 旁注明：这 9 个子路径只供 soroi e2e 测试接线使用，不是 Lab 或其他组件的接口。这是措辞建议，不作为反例。

