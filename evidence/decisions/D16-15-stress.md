# D16-15 压力测试报告（Claude 族独立空白历史 task:high：ClaudeHighD16b）

席位：`PhaseBClone_ffeb.ClaudeHighD16b`，依据 U11、U82、C3-3、现行 D16-07，一人承担 steady 与 divergent 两种视角。
范围：按父代理的范围修正，本轮只测 D16-15。D16-07、09、11、12 不重投（AGENTS.md:50：ArgonGovernance 为消除矛盾所做的改动不使旧票失效）。
被测正文：`local://decisions/D16-15.md:28`。
实验目录：`/tmp/d16-15-stress.30hJ/`（只在 /tmp 操作，未改任何仓库）。
工具版本：npm 11.20.0、node v26.12.1、bun 1.4.4、TypeScript 7.0.2、vite 8.3.5。Pepgent 声明 `npm@11.19.0`、`typescript ^7.0.2`、`vite ^8.2.2`（Pepgent `main` 的 `package.json`、`apps/web/package.json`）。

## 一、LEDGER 核对（C1–C5、R1–R21，只列与 D16-15 相关的条款）

| 条款 | 结论 | 依据 |
| --- | --- | --- |
| C1-1 不改 omp 宿主 | 符合 | 只改 `packages/store/src` 与一个 CI workflow |
| C1-2 组件独立归属，契约唯一源头 | 符合 | 分支内容由 CI 从 `packages/store/src` 派生，不形成第二个源头；不合并仓库 |
| C1-3 开发期只做本仓编译、类型与基础检查 | **相关，见反例 A** | Pepgent 的编译入口 `npm --workspace @pepgent/web run build` 自带许可证闭包门禁，会被 D16-15 的最小 `package.json` 卡住 |
| C2-1、C2-3 跨组件公开契约三族表决，反对票附反例 | 符合 | 本条是跨仓契约接法，需要表决；本票的反对附可复现反例 |
| C3-3 steady/divergent 由 task:high 承担 | 符合 | 本席位就是 task:high |
| C3-4 一仓一进程 | 符合 | W-06 只写 soroi，W-09 只写 Pepgent；⑥ 让 W-06 按 D16-10 以原会话名重新进场 |
| C4-1 BLOCKED 先写 issue 再表决 | 符合 | W-09 已在 Pepgent#43 评论 6558599546 写 BLOCKED |
| C4-3 local 只放草稿 | 符合 | 定稿后由秘书归档到 PM |
| C5-3 遗产保护 | 符合 | 不触碰受保护提交 |
| C5-4 投票期间照常推进 | 符合 | W-09 继续写 protocol/lab 中不依赖安装的部分 |
| R3 仓 A/B 待授权 | 不变 | ⑤ 写明仓 A 建立后分支停用 |
| R8、R14 W-06 已退役 | 受影响 | ⑥ 重新进场，R14 的“W-06 已退役”需按实际状态替换 |
| R15 W-09 卡在 #43 | 本条的目的就是解除这一卡点 | — |
| R16 阶段 C 统一组装 | **相关，见反例 A** | 组装需要 Pepgent 的生产构建 |

## 二、稳健视角：主路径逐项实测

| # | 检查项 | 结果 | 证据 |
| --- | --- | --- | --- |
| S1 | `node:crypto` 与 `Bun.CryptoHasher` 的 sha256 是否一致（已持久化的身份会不会变） | **一致** | `/tmp/d16-15-stress.30hJ/h.mjs` 用 6 个输入测试：空串、ASCII、含非 ASCII 字符的 `valueIdentity` 形 JSON、`outputIdentity` 形 JSON、原始字节、UTF-8 编码字节。Bun 下 `CryptoHasher` 与 `node:crypto` 的输出逐项相同（`true`），Node 下的输出也与之逐字相同。`contentHash` 的输入只有 `string \| Uint8Array`（`packages/store/src/identity.ts:3-5`），两者都按 UTF-8 编码字符串 |
| S2 | 不带 workspaces 的 git 依赖是否跳过 pacote 的 prepare | **跳过** | 本机 npm 自带的 `pacote/lib/git.js:159-172`：`!mani.workspaces` 且没有 `postinstall/build/preinstall/install/prepack/prepare` 脚本时直接 return。实测 `npm install pepgent-store@git+file://…/src#store-contract` 结果为 `added 2 packages` |
| S3 | npm 能否按分支名安装 | **能** | 同上，`package.json` 写入 `"pepgent-store": "git+file:///…/src#store-contract"`，lockfile 记录的是 commit：`resolved: …#4d4f6e7…` |
| S4 | D12 的导入路径与包名是否匹配 | **匹配** | D12:64 写的是 `from 'pepgent-store/contract'`，与包名 `pepgent-store`、`exports["./contract"]` 一致。另外注意：soroi 根包名是 `soroi`（根 `package.json:2`），所以 D16-05② 原接法只能导入 `soroi/contract`，与 D12 不一致；D16-15 改名后修正了这一点 |
| S5 | 去掉 `.ts` 扩展名后，Pepgent 的 tsc 能否通过 | **通过** | 照 Pepgent 的 `tsconfig.base.json` 配置（`moduleResolution: Bundler`、`strict`、`isolatedModules`、`types:["node"]`）用 TS 7.0.2 检查一个同时导入 `pepgent-store/contract` 与 `pepgent-store/identity` 的入口，结果 `TSC_OK` |
| S6 | Pepgent 实际的 Node 运行路径（vite dev SSR，以及 vite build 后执行 `node bin/pepgent-web.mjs`） | **能运行** | Vite 不把入口为 `.ts` 的包 externalize，会把它打进 bundle。`vite build --ssr` 的产物用 node 运行输出 `vite-ssr run: function 88c4…`；`createServer().ssrLoadModule` 输出相同结果。产物第 2 行为 `// ../../node_modules/pepgent-store/contract.ts`，说明已内联 |
| S7 | 纯 Node 直接加载 | **失败** | `node native.mjs` 报 `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING: Stripping types is currently unsupported for files under node_modules`。影响范围见非阻断意见 N1 |
| S8 | CI 推送分支的权限 | **可行（未实际推送，属推断）** | `gh api repos/Pepgent/soroi/actions/permissions/workflow` 返回 `default_workflow_permissions: read`，所以 workflow 必须显式声明 `permissions: contents: write`（同仓的 push 事件可以这样提升权限）[INFERENCE：依 GitHub 文档，未实测推送]。仓库是私有的 Free 计划，rulesets API 返回 403，不存在会拦截推送的分支保护。Actions 已启用，`ubuntu-latest` 上 Release 近 3 次运行均成功 |
| S9 | 去掉根 `exports` 后有没有剩余消费者（④） | **没有** | 仓内没有 `soroi/contract` 或 `soroi/identity` 的导入；omp-soroi 经 workspace 导入的是 `pepgent-store/…`，不受影响 |
| S10 | **Pepgent 的生产构建门禁** | **失败 → 反例 A** | 见下 |
| S11 | **契约更新后 Pepgent 能否跟进** | **失败 → 反例 B** | 见下 |

### 反例 A：按 D16-15② 的最小 `package.json`，Pepgent 的生产构建必然失败

- **场景：** W-09 按 ③ 把 `pepgent-store` 写进 `apps/web` 的 `dependencies`，然后执行 Pepgent 的编译入口 `npm --workspace @pepgent/web run build`。这一步也是 C1-3 允许的“本仓编译”，并且是 `node bin/pepgent-web.mjs` 运行的前提：`apps/web/bin/pepgent-web.mjs:1` 加载的是 `../dist/server/server.js`。该 `build` 脚本是 `vite build && … check-third-party-notices.mjs && generate-third-party-notices.mjs --check`（Pepgent `apps/web/package.json` 的 scripts.build）。
- **机制：**
  1. `vite-bundled-packages.js` 把服务端 bundle 里出现的 `node_modules/<pkg>` 都记入 `dist/server/bundled-npm-packages.json`。由于 S6 所述的内联，`pepgent-store` 会被记入。
  2. `scripts/third-party-closure.mjs:146-151` 用 `npm ls` 收集闭包时只收录带 `version` 字符串的包。D16-15② 规定的最小 `package.json` 只有包名、`exports` 和 `zod`，没有 `version`，所以 `npm ls` 里这个节点没有 version，不会进入闭包。
  3. `third-party-closure.mjs:99-109` 检查 bundle 记录是否被闭包覆盖，不被覆盖就抛错。
  4. 即使补上 `version`，`generate-third-party-notices.mjs:362-367` 还要求 SPDX 许可证元数据，`:369-374` 要求许可证在白名单（`:43-57`，其中没有 `UNLICENSED`），`:376-381` 要求包内有 LICENSE、COPYING 或 NOTICE 文件，或者有上游许可证覆盖。soroi 是私有仓，根目录没有 LICENSE 文件。
- **复现：** `/tmp/d16-15-stress.30hJ/repro/`。这是一个最小 npm workspace（`pepgent` + `@pepgent/web`）：原样复制 Pepgent `main` 的 `scripts/third-party-closure.mjs`、`scripts/npm-spawn.mjs`、`apps/web/vite-bundled-packages.js`，`vite build` 出服务端产物后，再用 `gate.mjs` 按生成器的调用方式执行闭包收集与覆盖校验：
  ```
  server record: ["pepgent-store"]
  lockfile closure: zod@4.6.7
  Error: server bundles packages outside the shipped closure: pepgent-store — declare the dependency in the web production tree or pepgent.rendererBundledDependencies
  ```
  对照组 `/tmp/d16-15-stress.30hJ/repro2/` 只在分支的 `package.json` 中加了 `"version":"0.0.0"`，同一门禁的输出变为 `lockfile closure: pepgent-store@0.0.0, zod@4.6.7` / `GATE PASSED`。许可证这一关（第 4 点）没有单独运行，依据是上面引用的生成器代码行。
- **条目失效位置：** ②“这份 `package.json` 的包名为 `pepgent-store`，`exports` 有 … 两项，依赖只有 `zod`”，以及取舍栏中“Pepgent 能在 npm 和 Node 下安装、运行 store 契约”。

### 反例 B：没有 `version` 字段，CI 推送新契约后 Pepgent 跟不上

- **场景：** 契约在 `main` 上改动后，CI 往 `store-contract` 推了一个新 commit。W-09 或 W-10 要让 Pepgent 用上新契约。取舍栏写明“契约改动合入 `main` 后，要等 CI 推送到分支，Pepgent 才能看到”，可见这条更新路径属于本条的主路径。
- **复现：** `/tmp/d16-15-stress.30hJ/c2/`，workspace 结构与 Pepgent 一致，分支提交不带 `version`：
  ```
  --- first install (versionless c1)   added 3 packages
  (分支前进到 c2)
  --- npm update                       up to date            lock 仍为 #81b0a7d（c1）
  --- npm install -w @pepgent/web pepgent-store@git+file://…#store-contract
  npm error Invalid Version:
  ```
  对照组 `/tmp/d16-15-stress.30hJ/c3/` 的提交带 `"version":"0.0.0"`（版本号保持不变）：`npm update` 输出 `changed 1 package`，lock 前进到 `#8f36857`（c2）。
- **条目失效位置：** ② 的最小 `package.json`，以及 ③“不钉版本”所要求的跟进能力。

### 修正建议（改完即可转为赞成）

1. ② 的最小 `package.json` 加一个固定的 `version`（例如 `0.0.0`）。lockfile 记录的是 commit，版本号固定不变也不会妨碍更新，反例 B 的对照组已证实这一点。
2. 许可证门禁需要写明由谁、用什么方式放行，二选一：
   - (a) 给派生包声明一个白名单内的 SPDX 许可证，并附 LICENSE 文件。这相当于给私有的 soroi 代码授权，是 owner 层面的决定。
   - (b) 在 Pepgent 的 `scripts/third-party-closure.mjs` 中把 `pepgent-store` 视为第一方包，与 `WORKSPACE_PREFIXES`（`:13-17`）同性质，闭包覆盖校验与通知生成都免检。这个文件不在 D16-09 的 W-09 白名单内，要在本条中把它扩入 W-09 白名单。
   - 本席倾向 (b)：pepgent-store 本来就是同一组织的第一方契约，(b) 不涉及许可证授权的决定。
3. 顺带修正：D16-09 中 W-09 白名单写的“随依赖变化的 `THIRD_PARTY_NOTICES.md`”，实际文件是 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`（`generate-third-party-notices.mjs:21`）。

## 三、发散视角：有没有更简单的替代

| 备选 | 结论 | 理由 |
| --- | --- | --- |
| pnpm 或 yarn 的 git 子目录依赖（`#path:/packages/store`） | 不可行 | Pepgent 锁定 `packageManager: npm@11.19.0`，npm 不支持 git 子目录 |
| 直接引用 `packages/store` 包 | 不可行 | 同上；而且它依赖 `@duckdb/node-api`，会把原生依赖带进 Pepgent |
| GitHub Packages 发布 `@pepgent/store` | 更复杂 | 要换成 scoped 包名，D12:64 的导入路径跟着变；要配 `.npmrc` 令牌；每次发布都要升版本。另外 `@pepgent/` 前缀只在闭包收集时豁免，覆盖校验照样拦截 |
| Release 资产的 tarball URL | 更差 | 替换资产后 lockfile 的 integrity 对不上，`npm ci` 失败；私有资产还要鉴权 |
| 跨仓 PR 把派生文件提交进 Pepgent | 更差 | 需要 PAT，而且仓内多一份副本 |
| Vite alias 指向本机的 soroi 检出 | 不可行 | 容器和 CI 无法复现 |
| CI 在分支里产出编译好的 `.js` 与 `.d.ts` | 可选增强，不是更简单 | 能解决 S7（纯 Node 加载），但要多一套 emit 配置；只有出现纯 Node 消费者时才值得做 |

结论：D16-15 的结构（CI 从唯一源头派生一个不带 workspaces 的分支）是现有约束下最简单的方案。失效的是 ② 中最小 `package.json` 的字段，以及没有写明许可证门禁的放行方，不是方向本身。

## 四、非阻断意见

- **N1（S7）：** 标题中“Node 可运行”的说法过强。实际能用的是 Pepgent 的 Vite（dev 与 build）和 tsc。纯 Node 直接加载会报 `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`。Pepgent 的 `test:node` 先用 tsc 编译，再执行 `node --test dist-web-tests/...`，而 `tests/node/lab-runtime.test.ts:12` 导入了 `src/server/lab/runtime.js`。一旦 runtime 按 D12-01 在运行时导入 store 的 schema，阶段 C 跑这组测试就会触发。建议把措辞改成“Pepgent 的 Vite/tsc 工具链可消费”，或者在出现纯 Node 消费者时采用上表的编译增强。
- **N2：** CI 对分支应只追加 commit、不强推，否则 Pepgent lockfile 中旧的 commit 可能取不到 [INFERENCE]。
- **N3：** soroi 是私有仓，凡是在容器或 CI 里对 Pepgent 执行 `npm ci` 的地方，都需要能读取 `Pepgent/soroi` 的 git 凭据。D16-05 的原接法也有这个问题，不是本条新引入的，按凭据规则由使用方注入。
- **N4：** zod 写成 `latest`，当前解析为 4.6.7，与 Pepgent 的 `zod ^4.5.4` 去重后只有一份。将来如果主版本分叉，可以改为 peerDependency。
- **N5：** workflow 需要显式写 `permissions: contents: write`（S8）。
- **N6：** 分类“串联”、缺失部分“是：D10-10 过渡期接法”都成立。本条属于技术项，不涉及意图裁决。

## 五、已验证与未验证

- **已在 /tmp 实测：** S1–S7、S9，以及反例 A 的闭包覆盖门禁（含对照组）、反例 B（含对照组）。
- **只依据代码引用：** 反例 A 第 4 点的许可证门禁。
- **未实测：** S8 的实际推送；git+https 访问私有仓的路径（推断与 git+file 走同一个 pacote git fetcher）。

## 六、对修订版（`local://decisions/D16-15.md:28`）的复核

- **反例 A：** 已消除。② 固定 `version: "0.0.0"` 后，闭包覆盖校验通过（`repro2/` 输出 `GATE PASSED`）。④ 让通知生成器对第一方包免除许可证检查，相关两个文件已扩入 W-09 白名单。构建链中的 `scripts/check-third-party-notices.mjs` 只比对客户端 `THIRD_PARTY_LICENSES.txt` 的字节，不需要改。
- **反例 B：** 已消除。带固定 version 后 `npm update` 能前进到新 commit（`c3/`），与 ③ 写明的跟进方式一致。
- **N1、N2、N5：** 已写入修订版。N1 对应标题改写和“放弃”栏，N2 对应“只追加提交、不强推”，N5 对应 `contents: write`。
- **结论：** 改投赞成，见 `local://votes/D16-15-claude-high.md`。
