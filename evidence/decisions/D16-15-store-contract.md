# D16 修正轮：D16-07、09、11、12 按现行正文重投，并新增 D16-15

起草：阶段 B 治理分身 `PhaseBClone_ffeb`。

## 依据

- **D16-07、09、11、12 重投：** 按 AGENTS.md:50，条目正文改动后旧票失效。ArgonGovernance 在计票后改写了 PM#25 中这四行的正文（现行正文以 PM#25 为准），所以四行按现行正文重投。四行的改动都是放宽，各席位当前的做法同时符合新旧两版正文，投票期间不停工。
- **新增 D16-15：** W-09 在 Pepgent#43 报 BLOCKED，提出 C5、C6 两项（https://github.com/Pepgent/Pepgent/issues/43#issuecomment-6558599546 ），证明 D16-05② 的过渡接法在 Pepgent 的 npm 下无法安装。D15 取证中的 X-95（npm consumer 报 `EUNSUPPORTEDPROTOCOL`）现象相同，可作佐证。

## 表决规则与 LEDGER 核对

按现行 AGENTS.md D1-12：
- Claude 族：主会话、本分身、独立 task:high，三者全部赞成才计赞成；
- argon 族：常驻 Argon；
- 导师：一票。

按现行 D16-07，压力测试改由独立空白历史 task:high 承担。

LEDGER 核对（`28dcb24`）：
- C2-1、C2-3：跨组件公开契约的接法由三族表决；
- C1-1、C1-2：不改 omp 宿主，契约唯一源头在 store；
- C5-4：投票期间各席位照常推进。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D16-15 | **store 派生不带 workspaces 的契约包分支，供 Pepgent 的 Vite/tsc 工具链及仓 B 以 git 依赖消费；源头按 D53 迁入仓 A** | D16-05②；D10-10；D12-01（`from 'pepgent-store/contract'`，D12:64）；`packages/store/src/contract.ts`、`identity.ts`；`Pepgent/soroi` 根 `package.json` 的 `exports`；Pepgent#43 C5、C6；Pepgent `scripts/third-party-closure.mjs:99-109,146-151`、`scripts/generate-third-party-notices.mjs:362-381`；ClaudeHighD16b 复现 `local://decisions/D16-15-stress.md` | **背景：**<br>• **C5：** npm 的 pacote 在准备带 `workspaces` 的 git 依赖时，会执行完整的 `npm install`。`workspace:*` 是 npm 不支持的协议，安装必然失败。<br>• **C6：** `identity.ts` 依赖 `Bun.CryptoHasher`，导入时带 `.ts` 扩展名，在 Pepgent 的 Node/tsc 环境下无法运行。<br>**修订：**<br>① **W-06** 把 `contract.ts`、`identity.ts` 改为与运行时无关：哈希改用 `node:crypto` 的 `createHash`，导入不带 `.ts` 扩展名。已实测 6 个输入的 sha256 与原实现逐项一致，已持久化的捕获身份不受影响；store 的行为不变。<br>② **W-06** 新增 CI workflow `.github/workflows/store-contract.yml`，扩入 W-06 白名单，声明 `permissions: contents: write`。导入前每次 soroi `main` 有推送，把 `contract.ts`、`identity.ts` 和一份最小 `package.json` 追加提交到 soroi 的 `store-contract` 分支；D53-03 v1 由 A2-02 把源码及 workflow 移入仓 A 后，改从仓根 `src/contract.ts`、`src/identity.ts` 派生仓 A 的 `store-contract` 分支。这份 `package.json`：<br>　• `name` 为 `pepgent-store`；<br>　• `version` 固定为 `0.0.0`。缺少 version 时，npm 无法跟进新 commit，也过不了 Pepgent 的许可证闭包；<br>　• `exports` 只有 `./contract`、`./identity`；<br>　• 依赖只有 `zod`；<br>　• 不含 `workspaces`，也不含安装类脚本。<br>该分支只由 CI 追加提交，不强推，不手改。<br>③ **W-09** 在仓 A 分支产出前仍消费 soroi 的派生分支；按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-06 v2 切换为 `git+https://github.com/Pepgent/soroi-store.git#store-contract`，重新生成 package-lock.json，使声明与 resolved 都指向仓 A，不钉版本；导入路径与包名仍为 `pepgent-store/contract`、`pepgent-store`。仓 B 亦按 D53-04 v2 消费仓 A 的同一最小契约包。**刷新负责人与时机（D28-02）：** Pepgent 锁定的 `pepgent-store` 是 `store-contract` 分支的副本，由消费方 Pepgent 负责刷新。凡改动 store `contract.ts` 或 `identity.ts` 的决策或切片，派发时同时在 `Pepgent/Pepgent` 开跟进 issue，依赖源码拥有仓的对应 issue 并引用所依据的决策；按 D53-06 v2 切换后依赖仓 A 的 issue。源码侧合入、对应仓的 `store-contract` 分支推进后，由 Pepgent 的 Lab 席位执行 `npm update pepgent-store`、提交 lockfile，并跑 Lab 的 typecheck 与测试；契约变更需要 Lab 代码改动时在同一 issue 内完成。为已合入的 [soroi PR#316](https://github.com/Pepgent/soroi/pull/316)（D23-01，`generation` 改为非空字符串）立即在 Pepgent 开跟进 issue，把锁定从 `8a23e21` 更新到 `store-contract` 当前 tip。该负责人与时机补充同 D16-15 一同生效。<br>④ **W-09** 在 Pepgent 的 `scripts/third-party-closure.mjs` 与 `scripts/generate-third-party-notices.mjs` 中，把 `pepgent-store` 列为 Pepgent 组织的第一方包，免除许可证检查；这两个文件扩入 W-09 白名单。不另行给派生包授予许可证——那等于替私有代码选择许可证。<br>⑤ **W-06** 撤销 D16-05① 在根 `package.json` 中新增的两项 `exports` 与 `zod` 依赖，并重新生成 lockfile。D16-09 中 W-06 对根 `package.json` 的归属随之取消。<br>⑥ **源头迁移与消费切换（[D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-03 v1、04 v2、05 v3、06 v2）：** [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345) 把 contract/identity 的唯一源码及派生 workflow 移到仓 A，派生规则沿用②；快照后只在仓 A 写 store。仓 B 与 Pepgent 均消费仓 A 的 store-contract，不消费仓 A 默认分支的服务依赖；仓 B 的发行 tar 携带构建时解析到的契约包，不带 store 服务与运行时依赖。Pepgent 的契约刷新由消费方 Lab 席位负责，跟进 issue 改为依赖仓 A 的 issue；D28-02 的刷新行为不变。soroi 切换完成后，soroi 的旧 store-contract 分支不再追加、保留不删，不是停用仓 A 的分支。<br>⑦ W-06 若已退役，按 D16-10 以原会话名、原会话目录重新进场，承接 ①②⑤ | **得到：**<br>• Pepgent 能用 npm 安装契约包、用 Vite/tsc 构建，并能跟进新 commit。对照组已复现：`GATE PASSED`，`npm update` 能前进到新 commit。<br>• 契约只有一个源码源头：导入前为 soroi 的 `packages/store/src`，D53-03 v1 导入快照后为仓 A 的仓根 `src/contract.ts`、`src/identity.ts`；store-contract 分支是对应源码的派生产物，不构成第二源头（D10-10、D12-01）。<br>• 两仓已存在并按 D53 留存，U121 已明确组件仓的 org；迁仓按真实执行 issue 推进，不等待用户选择。<br>**放弃：**<br>• 多一个 CI workflow 和一个派生分支，契约更新要等 CI 推送，有延迟。<br>• 不支持纯 Node 直接加载 node_modules 中的 `.ts`。Vite/tsc 场景不受影响；阶段 C 若需要纯 Node 加载，届时另行处理。<br>**备选落选：**<br>• 改写所有 `workspace:*`：工作量大，结果也脆弱。<br>• 复制 schema：会形成第二源头。<br>• pnpm/yarn 子目录依赖、GitHub Packages、Release 压缩包、Vite alias、CI 编译出 JS：在 npm 约束下都不比本方案简单（ClaudeHighD16b 报告第三节） | 串联 | 是：D10-10 过渡期接法 |

## 重投四行（现行正文以 PM#25 为准）

- **D16-07：** argon 族由常驻 Argon 投设计/契约票，ArgonGovernance 不作为例行投票席；压力测试由独立 task:high 承担。
- **D16-09：** home worktree 用 `-b <会话名>-home` 或 `--detach` 都合规，但不得来回切换，也不承载提交。
- **D16-11：** 同席位同域的关联切片可以合并为一个 PR；开发期只做本仓编译、类型与基础检查。
- **D16-12：** 发车记录写入 `local://exec/phaseB/` 并由秘书归档，由 ArgonGovernance 事后检查，不再用 IRC 抄送 Argon。
