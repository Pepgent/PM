# D23 选票：claude-high 席（Claude 族独立空白历史审查席）

- **席位：** claude-high，按 LEDGER C2-3（U95）独立计 1 票，不与 Main 及其分身合并计票。
- **审查对象：** `local://decisions/D23-draft.md` 中的 D23-01 和 D23-02；取证材料为 `local://inv/sor18-gaps.md` 的 Q3。
- **方式：** 全程只读。所有引用都是本次直接读取 `/tmp/govclone-pm`、`/tmp/govclone-soroi`、`/tmp/govclone-mux` 副本得到的 `path:line`。只审主路径，没有查 git、session 或 issue/PR 历史。

## 一、草案事实核对（全部属实）

| 草案事实 | 核对结果 | 本次读取的证据 |
| --- | --- | --- |
| D3 §4 规定 `type Generation = string`，`mux_generation`、`mux_attached`、`mux_exited` 三帧使用它 | 属实 | `PM/evidence/decisions/D3-network-mux.md:79`；`:103-105`。草案写的 `:101-105` 包含 `WriterDown` 的类型头，范围正确 |
| D4 中 `AgentGenerationTransfer.generation: Generation` | 属实 | `PM/evidence/decisions/D4-remote-exec.md:95-97`，字段在 `:97` |
| D4-11、D4-12、D4-13 和 §5.2 都把该字段指向 `mux_open_generation` 签发的那一代 | 属实 | `D4-remote-exec.md:59`（第 1 步写 `mux_open_generation`，收到 `mux_generation { generation, token }`）；`:60`（第 5 步写“代 id 在 remote run 前由 mux_open_generation 分配”）；`:61`（eval 之外的唤醒对应 `AgentGenerationTransfer { agent, generation }`）；`:312`（先 `mux_open_generation`，再开 `AgentGenerationTransfer`） |
| D6 接口草图在 `:141` 写成 `generation: number`，D6-07 本身没写类型，store 自行生成的是 TransferId | 属实 | `PM/evidence/decisions/D6-store-service.md:141`；`:35` 只写了 `AgentGenerationTransfer{agent,generation}`，没写类型；`:138` 是 `TransferId // store 生成并持有` |
| 全部已通过的决策中，只有 D6:141 把 generation 写成 number | 属实（补充核对） | 在 `PM/evidence/decisions/` 中检索 `generation\s*:`：D3、D4、D12（`D12-lab-wire.md:84` 中 `Generation = string`）都是 `Generation`，只有 `D6:141` 是 `number` |
| Mux 签发 UUID，帧字段类型为 `Uuid` | 属实 | `MUX/src/serve/router.rs:538` 调用 `Uuid::new_v4()`，`:540-544` 作为 `WriterFrame::Generation` 发出；`MUX/src/protocol.rs:69-79` 中 `generation: Uuid`，经 serde 序列化为 JSON 字符串 |
| Soroi 写方把 generation 解析为字符串 | 属实 | `SOR/packages/omp-soroi/src/subagent/main/mux-writer.ts:19-21` 为 `generation: z.string()`；`:14` 中 `ProcessRef.generation: string` |
| store 把 generation 解析为非负安全整数，`POST /transfers` 走这个 schema | 属实 | `SOR/packages/store/src/contract.ts:8`（`PositionSchema`）；`:87`；`SOR/packages/store/src/server.ts:144-146`。另外 `SOR/packages/store/src/transfers.ts:20-22` 读回时也走 `TransferSchema.parse` |
| D16-09 中 `packages/store/**` 只归 W-06；D16-13 规定开发期不设跨组件锁 | 属实 | `PM/evidence/decisions/D16-phaseB-review-restore.md:33`（W-06 只写 `packages/store/**`；W-07 只写 `packages/omp-soroi/**` 等路径）；`:37`（开发期各仓只做本仓检查，不设跨组件 live 锁） |

**结论：** 冲突确实存在，而且只有一处：D6:141 与 store 实现 `contract.ts:87`，对比 D3、D4、D12 和 Mux 的实现。主路径上的失效点是：非 eval 唤醒时，subagent 模块把 Mux 签发的 UUID 字符串作为 `generation` 发到 `POST /transfers`，在 `server.ts:145` 被 `parse(TransferSchema)` 拒绝，暂存区建不起来。取证材料也写明这是契约层面的不一致，生产调用链还没有实现（`supervisor.ts:252,346` 目前拒绝 remote），所以不算已实测到的 HTTP 失败。这个说法准确。

## 二、逐条投票

### D23-01：AgentGenerationTransfer.generation 的类型改为 Mux 的 Generation（string）

- **投票：赞成。**
- **分类意见：同意分类为「串联」。** 这一条的作用是让 D6 与 D3、D4 以及三方代码在同一个字段上保持一致，不涉及意图或技术选型。草案标注“缺失/补充：是”也正确，因为 D6 草图本身写错了。
- **理由：**
  1. **源头唯一。** generation 由 Mux 创建，并在 `mux_generation` 帧中签发，见 `router.rs:538-544`。按 D4-12（`D4:60`），它的生命周期由 Mux 签发开始，到 `mux_exited` 结束。store 只是持有这个值的副本，它的类型应当跟随源头。D3:79、D4:97、D12:84 和 `mux-writer.ts:19` 都已经是 string，D6:141 写成 `number` 是唯一的偏离。
  2. **改动最小且不引入新机制。** D3、D4、Mux 和 soroi 写方都不用动。store 只需把 `contract.ts:87` 的 `generation` 改成非空字符串（同文件 `:5` 已有 `NameSchema`）。`transfers.ts:13-17` 原样写入 `kind.json`，`:56-64` 的单卷路径不用 generation 作编号，因此 store 内部没有别处依赖它是整数。
  3. **落选的备选方案确实更差。** 让 Mux 改发整数，等于改动源头并违背 D3 §4。由中心做映射或另编代号，会让同一代多出一个权威，形成多一份副本，与“权威源头”规则相冲突。
  4. **选“非空字符串”而不是 UUID 正则是对的。** D3 只承诺 `Generation = string`，没有承诺 UUID 格式。store 只保存、不解释这个值，不应额外收紧。
- **非阻断提示（不构成反例，属于 W-06 同一 PR 内的实现细节）：** store 测试 `SOR/packages/store/test/derive.test.ts:238` 用 `{ kind: "AgentGenerationTransfer", agent: "agent", generation: 0 }` 构造 `TransferKind`。schema 改成字符串后，这一行在类型检查时会报错，W-06 必须在同一个 PR 中改成字符串字面量。该文件在 `packages/store/**` 内，属于 W-06 的路径域，不会造成越界。

### D23-02：store 侧的承载与写方

- **投票：赞成。**
- **分类意见：同意分类为「治理」。** 这一条处理的是写方归属、派工和回写，不改变契约内容。计票时加入 ArgonGovernance，共五席、需 4 票赞成，合理。
- **理由：**
  1. **写方唯一。** D16-09（`D16:33`）规定 `packages/store/**` 只归 W-06，W-07 只写 `packages/omp-soroi/**` 等路径。由 W-06 以原会话名重新进场，与 D16-10（`D16:34`）中 W-10 重新进场的先例一致。临时授权 W-07 修改 store，会让同一路径出现两个写方，所以那个备选方案理应落选。
  2. **“W-07 不必等”在编译和类型层面确实成立，不违反 D16-11 第 ③ 段。** D16-11（`D16:35`）只要求在“编译、类型、构建或调用契约上的真实依赖”上等待。我核对了 W-07 现有的 `POST /transfers` 写法：`SOR/packages/omp-soroi/src/eval/store.ts:127-128` 直接 `JSON.stringify({ kind: "EvalTransfer", evalCall })`，没有对 `pepgent-store/contract` 的 `TransferKind` 做类型绑定。W-07 按同样写法发送 `{ kind: "AgentGenerationTransfer", agent, generation: <string> }`，本仓的类型检查不受 store 侧尚未合入的修改影响。至于运行时 store 会拒绝字符串 generation，那是跨组件的 live 行为。按 D16-13（`D16:37`），这要到阶段 C、所有切片合入后统一验收，开发期不设锁。因此这里没有真实的编译依赖，也就不构成串行等待。
  3. **D6 回写由秘书执行，与 D23-01 的 how 一致，只有 `D6:141` 一处需要改。** 补充核对显示，`SOR/design/store.md:107-112,173` 和 `SOR/packages/store/README.md:25,30-31` 都没有写 generation 的类型，不需要连带回写，也不会留下互相矛盾的文本。
  4. **承载链完整。** 先建真实 issue（owner 为 W-06），再开非 draft PR，用 `Fixes` 关联 issue，只做本仓检查。这符合 issue→PR 路由规则，也符合 D16-11 第 ④ 段对开发期检查口径的要求。
- **非阻断提示：** W-06 的 PR 需要连同上文 D23-01 提到的 `derive.test.ts:238` 一起修改，否则本仓类型检查无法通过。秘书建 issue 时最好在正文里注明这一行，方便 W-06 一次改全。这是执行细节，不影响本条成立。

## 三、汇总

| ID | 投票 | 分类意见 | 反例 |
| --- | --- | --- | --- |
| D23-01 | 赞成 | 串联（同意） | 无 |
| D23-02 | 赞成 | 治理（同意） | 无 |
