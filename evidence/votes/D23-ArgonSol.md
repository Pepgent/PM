# D23：产品原始意图守护席 Argon 选票

表决对象：`local://decisions/D23-draft.md` 的 D23-01、D23-02。

## SOR-18 闸门 A 结论

1. **agentDef 展开：不触及产品意图，也不新增公开契约；可机械补全。** D4 的 `CallRequest.agent.agentDef` 已定义为发行包或 Lab 库中的 agent 定义名，D4-09 已规定远程 HOME 与 project `.omp/` 都能发现。W-07 在解包后调用 omp 包已有的 `discoverAgents(cwd, home)`，并展开为中心 `#argv` 同义的 model/thinking/tools/system prompt 参数，属于 `packages/omp-soroi` 内部实现；D11-28 的七字段 wire 不变。
2. **prompt 通道：不触及意图或新公开契约；按已通过正文实现。** D4-11 已规定 prompt/IRC/host tool/host URI 经 Mux RPC 照旧，D4 §5.2 明确在远程进程 ready 后由中心 supervisor 发 `prompt`。boot 不把 `call.prompt` 当 CLI 初始消息，不需要新决策。
3. **generation 类型：触及跨组件公开契约，必须走 D23。** D3、D4 与 Mux 的权威类型是 string/UUID，D6/store 却解析 number；这是同一 generation 的契约冲突，不能机械选择。

## 意图与分类审查

- D23 不改变用户要求的产品形态，只恢复 Mux 代号在 Mux、soroi、store 三方之间的同一身份；符合 `(U) U2`、`U23` 的完整流程交付。
- D23-01 同意分类“串联”。
- D23-02 同意分类“治理”。

## 逐条选票

| ID | 分类 | Argon 票 | 否决 | 理由 |
| --- | --- | --- | --- | --- |
| **D23-01** | **串联** | **赞成** | 否 | generation 的创建和维护方是 Mux。D3 §4 已定义 `Generation = string`，D4 的 `AgentGenerationTransfer` 使用同一类型，实际 Mux 以 UUID 签发，soroi 也按 string 解析。store 只保存来历，不应把该身份转换成整数或另造映射。把 D6:141 和 `TransferSchema` 改为非空 string，恢复唯一权威并使远程非 eval 唤醒的 `POST /transfers` 能按同一值解析。 |
| **D23-02** | **治理** | **赞成** | 否 | `packages/store/**` 继续由 W-06 唯一写入；W-06 在有空位时用原会话名重新进场，以独立 issue 和非 draft PR 完成一行 schema 修复及本仓检查。W-07 按已定 string 契约继续 SOR-18，不等待 store 合入，符合开发期异步、无跨组件同步锁和 `(U) U30`、`U83`、`U84` 的反设卡要求；也避免临时授权 W-07 越过 store 路径域形成第二写方。 |

## 汇总

- D23-01：赞成。
- D23-02：赞成。
- 意图否决：0。
- 分类争议：0。
