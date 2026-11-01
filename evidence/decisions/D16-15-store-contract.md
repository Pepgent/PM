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
| D16-15 | **修订 D16-05 的过渡接法：由 soroi 派生一个不带 workspaces、可被 Pepgent 的 Vite/tsc 工具链消费的 store 契约包分支，Pepgent 以 git 依赖引用** | D16-05②；D10-10；D12-01（`from 'pepgent-store/contract'`，D12:64）；`packages/store/src/contract.ts`、`identity.ts`；`Pepgent/soroi` 根 `package.json` 的 `exports`；Pepgent#43 C5、C6；Pepgent `scripts/third-party-closure.mjs:99-109,146-151`、`scripts/generate-third-party-notices.mjs:362-381`；ClaudeHighD16b 复现 `local://decisions/D16-15-stress.md` | **背景：**<br>• **C5：** npm 的 pacote 在准备带 `workspaces` 的 git 依赖时，会执行完整的 `npm install`。`workspace:*` 是 npm 不支持的协议，安装必然失败。<br>• **C6：** `identity.ts` 依赖 `Bun.CryptoHasher`，导入时带 `.ts` 扩展名，在 Pepgent 的 Node/tsc 环境下无法运行。<br>**修订：**<br>① **W-06** 把 `contract.ts`、`identity.ts` 改为与运行时无关：哈希改用 `node:crypto` 的 `createHash`，导入不带 `.ts` 扩展名。已实测 6 个输入的 sha256 与原实现逐项一致，已持久化的捕获身份不受影响；store 的行为不变。<br>② **W-06** 新增 CI workflow `.github/workflows/store-contract.yml`，扩入 W-06 白名单，声明 `permissions: contents: write`。每次 `main` 有推送，就把 `contract.ts`、`identity.ts` 和一份最小 `package.json` 追加提交到 `Pepgent/soroi` 的 `store-contract` 分支。这份 `package.json`：<br>　• `name` 为 `pepgent-store`；<br>　• `version` 固定为 `0.0.0`。缺少 version 时，npm 无法跟进新 commit，也过不了 Pepgent 的许可证闭包；<br>　• `exports` 只有 `./contract`、`./identity`；<br>　• 依赖只有 `zod`；<br>　• 不含 `workspaces`，也不含安装类脚本。<br>该分支只由 CI 追加提交，不强推，不手改。<br>③ **W-09** 以 `git+https://github.com/Pepgent/soroi.git#store-contract` 引用，不钉版本，导入路径沿用 D12 的 `pepgent-store/contract`。契约更新后，用 `npm update pepgent-store` 跟进。<br>④ **W-09** 在 Pepgent 的 `scripts/third-party-closure.mjs` 与 `scripts/generate-third-party-notices.mjs` 中，把 `pepgent-store` 列为 Pepgent 组织的第一方包，免除许可证检查；这两个文件扩入 W-09 白名单。不另行给派生包授予许可证——那等于替私有代码选择许可证。<br>⑤ **W-06** 撤销 D16-05① 在根 `package.json` 中新增的两项 `exports` 与 `zod` 依赖，并重新生成 lockfile。D16-09 中 W-06 对根 `package.json` 的归属随之取消。<br>⑥ 仓 A 建立后，改由仓 A 产出契约包，`store-contract` 分支停用（D10-10 的长期方案）。<br>⑦ W-06 若已退役，按 D16-10 以原会话名、原会话目录重新进场，承接 ①②⑤ | **得到：**<br>• Pepgent 能用 npm 安装契约包、用 Vite/tsc 构建，并能跟进新 commit。对照组已复现：`GATE PASSED`，`npm update` 能前进到新 commit。<br>• 契约只有一个源头，即 `packages/store/src`；分支是派生产物，不构成第二源头（D10-10、D12-01）。<br>• 不必等待用户授权仓 A。<br>**放弃：**<br>• 多一个 CI workflow 和一个派生分支，契约更新要等 CI 推送，有延迟。<br>• 不支持纯 Node 直接加载 node_modules 中的 `.ts`。Vite/tsc 场景不受影响；阶段 C 若需要纯 Node 加载，届时另行处理。<br>**备选落选：**<br>• 由用户授权建立仓 A：只有用户能授权，不能让 LAB 切片等待。<br>• 改写所有 `workspace:*`：工作量大，结果也脆弱。<br>• 复制 schema：会形成第二源头。<br>• pnpm/yarn 子目录依赖、GitHub Packages、Release 压缩包、Vite alias、CI 编译出 JS：在 npm 约束下都不比本方案简单（ClaudeHighD16b 报告第三节） | 串联 | 是：D10-10 过渡期接法 |

## 重投四行（现行正文以 PM#25 为准）

- **D16-07：** argon 族由常驻 Argon 投设计/契约票，ArgonGovernance 不作为例行投票席；压力测试由独立 task:high 承担。
- **D16-09：** home worktree 用 `-b <会话名>-home` 或 `--detach` 都合规，但不得来回切换，也不承载提交。
- **D16-11：** 同席位同域的关联切片可以合并为一个 PR；开发期只做本仓编译、类型与基础检查。
- **D16-12：** 发车记录写入 `local://exec/phaseB/` 并由秘书归档，由 ArgonGovernance 事后检查，不再用 IRC 抄送 Argon。
