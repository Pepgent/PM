# D23：AgentGenerationTransfer.generation 与 Mux Generation 的类型统一（P0：soroi#222 BLOCKED 解阻）

**起草：** 治理分身 GovClone_55b0。

**来源：** W-07 的 [SOR-18 BLOCKED 第3点](https://github.com/Pepgent/soroi/issues/222#issuecomment-6559418096)。[PM#33](https://github.com/Pepgent/PM/issues/33) 按 P0 立案；取证见 [`evidence/inv/sor18-gaps.md`](https://github.com/Pepgent/PM/blob/main/evidence/inv/sor18-gaps.md) Q3。

**计票：** 按 LEDGER C2-3（U95）属于产品/契约四席，至少 3 席赞成即通过，有效反例必须清零。D23-02 涉及派工，另加 ArgonGovernance，共五席，至少 4 席赞成。

## 事实

- **(D)** Mux 的 generation 类型为字符串：D3 §4（D3:79）定义 `type Generation = string; // mux 为一次进程分配`，并在 `mux_generation`、`mux_attached`、`mux_exited` 三个帧中使用（D3:101-105）。
- **(D)** D4 同样使用这个类型：D4:94-97 中 `Transfer.AgentGenerationTransfer.generation: Generation`。D4-11（D4:59）、D4-12（D4:60）、D4-13（D4:61）和 D4 §5.2（D4:312）都把它指向 Mux `mux_open_generation` 分配的那一代。
- **(D)** D6 与上述定义冲突：D6 接口草图 D6:141 写成 `{ kind: 'AgentGenerationTransfer'; agent: string; generation: number }`，注释是“非 eval 场景的远程 agent 一代”，所指正是同一个 Mux generation。D6-07（D6:35）本身没有写类型。store 自己生成的是 TransferId（D6:138），不是这个字段。
- **(R)** Mux 签发的是 UUID：`omp-rpc-mux` `src/serve/router.rs:533-544` 签发 `Uuid::new_v4()`，`src/protocol.rs:68-79` 中帧字段为 `generation: Uuid`。soroi 的 `mux-writer.ts:18-21` 按 `z.string()` 解析。
- **(R)** store 按整数解析：store `packages/store/src/contract.ts:87` 为 `generation: PositionSchema`（`z.number().int().nonnegative().safe()`），`server.ts:144-146` 对 `POST /transfers` 的请求体执行 `parse(TransferSchema)`。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D23-01 | **AgentGenerationTransfer.generation 的类型改为 Mux 的 Generation（string）** | D6 接口草图 D6:141；store `packages/store/src/contract.ts` 的 `TransferSchema` | • `AgentGenerationTransfer.generation` 的类型是 D3 §4 的 `Generation`（string），值为 Mux 在 `mux_generation` 帧中签发的原值，store 只保存，不做转换。<br>• D6:141 改为 `generation: string // D3 §4 Generation`。<br>• store 的 schema 中该字段改为非空字符串。<br>• D3、D4 与 Mux 实现都不改。 | **得到：** 类型以 generation 的源头 Mux 为准，D3、D4、D6 和三方代码一致；非 eval 唤醒能建立暂存区。<br>**放弃：** store 的 schema 要改一行。<br>**备选落选：**<br>• Mux 改为发整数：违背 D3 §4，而且源头不归 store。<br>• 中心另做映射或另编代号：多出一个权威，也多一份副本。 | 串联 | 是：D6 与 D3、D4 冲突 | 协调席、claude-high、ArgonSol、导师各赞成；治理席不参投此行 | **4/4通过；无意图否决、无有效反例** |
| D23-02 | **store 侧的承载与写方** | soroi `packages/store/**`（W-06 路径域，D16-09） | • 秘书在 soroi 新建 issue「AgentGenerationTransfer.generation 改为 string（D23-01）」，owner 为 W-06。<br>• 由 Main 在出现空位时让 W-06 以原会话名重新进场，提交一个非 draft PR 写 `Fixes`，只做本仓检查。<br>• W-07 不必等这个修正合入，按 D23-01 的 string 实现 SOR-18 的非 eval 唤醒（D16-13：开发期不设跨组件锁；真实编译/类型/构建依赖仍按D16-11）。<br>• 秘书把 D6:141 回写为 string。 | **得到：** 写方仍是唯一的 W-06，W-07 不用等。<br>**放弃：** W-06 要再进场一次。<br>**备选落选：** 临时授权 W-07 改 store：这会让 `packages/store/**` 有两个写方。 | 治理 | 否 | 协调席、claude-high、ArgonSol、ArgonGovernanceSol、导师各赞成 | **5/5通过；无意图/治理否决、无有效反例** |

## 原票与执行提示

- 四个产品/契约席与组织治理席原文分别归档为 `evidence/votes/D23-{Coordination,ClaudeHigh,ArgonSol,ArgonGovernanceSol,LeadMentor}.md`，每席只计一票；导师票由GovClone按IRC转录，秘书未替席位投票。
- claude-high的非阻断提示：`packages/store/test/derive.test.ts:238` 的 `generation: 0` 需在W-06同一个PR中改成字符串；它属于既定store路径域，不另增决策。
- 原治理票中的“P1”保留为原文；本案依发起人明确指令以P0立案，原票不被篡改。
- 决策通过、文书回写与本仓实现不代替阶段C真实跨组件运行验收；取证静态源码冲突不是已实测HTTP失败。
- 实现承载：[soroi#315](https://github.com/Pepgent/soroi/issues/315)，owner W-06；已交Main按空位安排原席重入，秘书不启停工人。`contract.ts`和`derive.test.ts`在一个非draft PR中修改并用Fixes关联。
