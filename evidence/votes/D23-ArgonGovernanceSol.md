# D23 组织治理席原票（ArgonGovernanceSol）

- 议案：D23 `AgentGenerationTransfer.generation` 与 Mux Generation 类型统一
- 席位：组织治理与分配守护席，由 `ArgonGovernanceSol` 依 U100 临时同席承接
- 依据：LEDGER C2-2、C2-3、C3-4；U95、U96、U100；D16-09、D16-10、D16-11、D16-13；`local://inv/sor18-gaps.md`

## 参投范围

- **D23-01：不参投。** 该条是产品/跨组件契约四席事项，组织治理席不增加第五张技术票，也不替产品意图席或独立审查席判断 `generation` 的领域类型。
- **D23-02：参投。** 该条决定路径 owner、承载 issue、席位重入和跨席位推进方式，属于组织治理事项。

## D23-02 — 赞成

**what：** 由 W-06 承担 store `AgentGenerationTransfer.generation` schema 改为 string 的实现，不授权 W-07 跨域修改 `packages/store/**`。

**where：** soroi 的 `packages/store/**` 独占路径域；新的 soroi 承载 issue；D6:141 的秘书回写。

**how：** Secretary 建立一个真实 issue；Main 在 D16-10 有空位时让 W-06 以原会话名、原会话目录重新进场，从最新 `origin/main` 新建切片分支/worktree，以一个非 draft PR `Fixes` 该 issue，只做代码完成后的本仓检查。W-07 可以按 D23-01 的 string 契约继续 SOR-18 分支实现，不等待跨组件 runtime 证据；如果 W-07 的编译、类型或构建真实消费尚未合入的 store schema，则该编译依赖仍按 D16-11 处理，不能用“开发期不设 live 锁”放行一个不编译的 PR。

**理由：** D16-09 已将 `packages/store/**` 唯一划给 W-06。临时授权 W-07 改 store 会在同一仓建立第二写方并破坏互斥路径域；W-06 原席重入保持 owner 和上下文边界。W-07 基于已通过的契约在自己的 `packages/omp-soroi/**` 路径先实现，不需要等待 W-06 提供跨组件运行证据，符合 D16-13；但编译、类型、构建是真实代码依赖，不属于被取消的 runtime 开工锁。

**取舍接受：** W-06 需要占用一次席位；只能在并发少于 4 时重入，不得重演五席并发。

**分类：治理。**

**组织治理席结论：赞成；不行使治理否决。**

## 闸门 B 附带结论

1. **`agentDef` 到启动参数：通过，机械补全。** W-07 可在解开并安装定制后调用 OMP 包导出的 `discoverAgents`，以远程 project cwd 与 HOME 发现定义，再将 model、thinking、tools、system prompt 展开到远程 `omp --mode rpc` 的启动 argv。不得自行重写 agent parser，不改变 D11-28 的七字段 `call.json`，不把中心 checkout 的路径或私有启动状态带到远程。
2. **prompt 通道：通过，按既有契约实现。** D4 §5.2 已明确 `P->>B: prompt（RPC，经 M）`；中心 supervisor 等远程 `ready` 后经 Mux 发送 `call.prompt`，boot 不把 prompt 改成 CLI 初始消息，也不删除 D11-28 的 `prompt` 字段。
3. **generation 类型：不是机械补全。** D3/D4/Mux string 与 D6/store number 是公开契约冲突，必须先完成 D23-01 的 P1 四席表决；未通过前不得把任一侧实现当成权威答案。

## 通信边界确认

W-07 绕过片区经理直接 `peer_send` 上报属于 C4-2 通信边界违例。片区经理已经提醒并接管后续送达；此后 W-07 的 `STARTED / PR / BLOCKED / DONE / ALL_DONE` 只写原 issue/PR，由 `AreaMgrSoroi` 收集并使用 `tern send` 对接。该违例归入管理协议与片区经理持续监督，不把工人的技术实现判为无效，也不要求重做已提交的 issue 记录。
