# D16-15 第 1 轮：ClaudeHighD16b 选票（原文本）

本文件是治理分身依据 ClaudeHighD16b 第 1 轮的交付回复整理的转录。原选票文件已被第 2 轮覆盖，第 1 轮的完整复现记录见 `local://decisions/D16-15-stress.md`。

**D16-15：反对。** 方向正确：由 CI 从唯一源头派生一个不带 workspaces 的分支，是 npm 约束下最简单的接法。问题出在 ② 规定的最小 `package.json` 字段，照原文实现会有两条主路径失败。两条都已在 `/tmp/d16-15-stress.30hJ/` 复现，并有对照组。

**反例 A：Pepgent 生产构建失败。**
- 场景：W-09 按 ③ 把 `pepgent-store` 写进 `apps/web` 的 dependencies，然后运行 `npm --workspace @pepgent/web run build`。这一步是 `node bin/pepgent-web.mjs` 的前提（`apps/web/bin/pepgent-web.mjs:1`）。
- 机制：Vite 把这个 `.ts` 包打进服务端 bundle。最小 `package.json` 没有 `version`，`scripts/third-party-closure.mjs:146-151` 便不把它收入许可证闭包，随后 `:99-109` 报错 `server bundles packages outside the shipped closure: pepgent-store`。
- 复现：用 Pepgent 原脚本搭建的最小环境 `repro/` 报出上述错误；对照组 `repro2/` 只补了 version，结果为 `GATE PASSED`。
- 补上 version 后还有一道门禁：`generate-third-party-notices.mjs:362-381` 要求白名单内的 SPDX 许可证和 LICENSE 文件，而 soroi 是私有仓，没有 LICENSE。这一点只读了代码，没有单独运行。

**反例 B：CI 推送新契约后，Pepgent 无法跟进。**
- `npm update` 报告已是最新，lockfile 仍停在旧 commit。
- 重新执行 `npm install …#store-contract` 时报 `npm error Invalid Version:`（见 `c2/`）。
- 对照组 `c3/` 写了固定 `version`，`npm update` 正常前进到新 commit。

**失效位置：** ② 规定的最小 `package.json`；取舍栏中“Pepgent 能在 npm 和 Node 下安装、运行”这一项；③ 中“不钉版本”所要求的跟进能力。

**修改建议（改后转为赞成）：** ② 加固定 `version`，例如 `0.0.0`；同时写明许可证门禁如何放行，倾向于在 Pepgent 侧把 `pepgent-store` 列为第一方包免检。

**实测通过、不构成反例的项：**
- 哈希：`node:crypto` 与 `Bun.CryptoHasher` 在 6 个输入上逐项相同。
- 安装：不含 workspaces、也不含安装类脚本时，pacote 会跳过 prepare（`pacote/lib/git.js:159-172`），按分支名可以安装成功。
- 导入路径：`pepgent-store/contract` 与 D12:64 一致。
- 构建与运行：TS 7 在 Bundler 解析下通过；vite dev 与 build 都能运行。
- ④ 撤销根 exports：撤销后没有剩余的消费者。
- CI：需要显式声明 `permissions: contents: write`。实际推送未测，这一项是推断。

**非阻断意见：**
- “Node 可运行”说法偏强，建议改成“Vite/tsc 工具链可消费”。纯 Node 加载 node_modules 中的 `.ts` 会报 `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`，对应 `tests/node/lab-runtime.test.ts:12`。
- 分支只追加提交，不强推。
- 在私有仓里执行 `npm ci` 需要读凭据，这个问题是 D16-05 本来就有的。
- zod 目前能正常去重。
- D16-09 中的 `THIRD_PARTY_NOTICES.md` 为笔误，实际文件是 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`。

**分类：** 串联；属于“是：D10-10 过渡期接法”，按技术项处理。
