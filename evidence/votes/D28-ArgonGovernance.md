# D28 选票：ArgonGovernance

议程：接缝金丝雀：中心身份注入无承载、Lab 锁定的 store 契约未跟进（[Pepgent/PM#47](https://github.com/Pepgent/PM/issues/47)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D28-01 v1：反对（ArgonGovernance-2，2026-11-01T17:34:52.165Z）——作废：该行已修订到 v2

**反例：** ### D28-01 v1 反例：`how` 第 3 点将跨组件容器 live 验收写进阶段 B 切片 issue，在 `deploy`（W-04）与 `soroi`（W-08）开发期交付路径上失效

- **触发场景：** 按 `D28-01 v1` 的 `how` 第 1–3 点，在 `Pepgent/deploy`（owner：`W-04`）和 `Pepgent/soroi`（owner：`W-08`）新开两个阶段 B 实现切片 issue，并在两个 issue 正文中都写入第 3 点验收条件：“在真实容器入口启动中心 Main，soroi 插件加载成功，eval 中心捕获使用注入的两值；缺任一值时加载失败的现状作为改前对照。”
- **失效位置与证据：**
  1. **`Pepgent/deploy`（W-04）单仓无法独立满足该跨组件验收：** `Pepgent/deploy` 仓库仅包含 `scripts/central.py`、`komodo/syncs/central.toml` 与 `stacks/pepgent-central/compose.yaml`（`D16-09` W-04 白名单），不含 `soroi` 插件、`release.tar`、`store` 或 `omp-rpc-mux`。若要求 `W-04` 在该切片 PR 中完成“真实容器入口启动中心 Main、soroi 插件加载成功、eval 中心捕获使用注入的两值”，`W-04` 必须在阶段 B 拉起跨仓库的完整中心容器栈与 `soroi`/`store` 运行时，直接重演 `D15` 前的开发期跨组件 live 验收锁。
  2. **`Pepgent/soroi`（W-08）违反 `D16-13` 与 `C1-3` 阶段边界：** `D16-13`（`PM/evidence/decisions/D16-phaseB-review-restore.md:37`）与 `D10-05`（`D16-01`、`D16-06②`）明文规定：“开发期各仓只做本仓检查，不设跨组件 live 锁。W-08、W-10 在阶段 B 只按 D16-10 的时点编写 spec 与 runbook，不执行跨组件测试……移出的跨组件验收义务：逐项写入承接的 E2E-*、A0、S1、S2 issue 正文”。用户原话 `U30–U32`（`LEDGER.md:88`）与 `U83`（`LEDGER.md:97`）亦明确禁止在开发期每个切片上设跨组件 e2e 验收锁。
- **可消除反例的最小修订：**
  保留 `how` 第 1、2、4 点新建两个承载 issue，仅将 `how` 第 3 点按 `D16-06②` / `D16-13` 拆分为：
  - **阶段 B 本仓检查：** `deploy` 切片只做本仓 `central.py` 摘要解析/配置哈希计算与 `compose.yaml` 变量渲染检查；`soroi` 切片只做 `compose.yaml` 必填插值声明与统一 e2e 启动入口的哈希计算/传参本仓检查，不在阶段 B 切片 PR 中启动跨组件容器栈；
  - **跨组件容器运行验证：** “在真实容器入口启动中心 Main，soroi 插件加载成功，eval 中心捕获使用注入的两值”作为跨组件验收义务写入阶段 C 的 `A0`（`soroi#235`）/ `S1`（`F01`）（并在两切片合入 `main` 后由产品全景席以 `U96` 异步非阻塞接缝金丝雀复核，不作为工人 PR 合入锁）。

**分类意见：** 治理

### D28-01 v1：反对（oppose，附可消除反例）

- **分类意见：** `治理`（涉及 `W-04` 与 `W-08` 席位切片派工承载及阶段 B 开发期验收门禁边界）。
- **理由：**
  1. **支持补齐承载：** 完全赞成 `D28-01` 的 `how` 第 1、2、4 点，为 `D13-02 ①`（`Pepgent/deploy`，归 `W-04`）与 `D13-02 ②`（`Pepgent/soroi` `compose.yaml` 与统一 e2e 启动入口，归 `W-08`）新建承载 issue，补齐 `D15→D16` 恢复链遗漏的中心身份注入生产方。
  2. **反对原因（阶段 B 跨组件验收门禁反例）：** `how` 第 3 点要求在两个开发期切片 issue 中都写入“在真实容器入口启动中心 Main，soroi 插件加载成功，eval 中心捕获使用注入的两值”作为验收条件。这使 `W-04`（仅拥有 `deploy` 仓）和 `W-08`（按 `D16-13` 在阶段 B 只写 spec/runbook、不跑跨组件测试）在阶段 B 交付切片 PR 时必须搭起跨组件容器栈运行 `soroi` 与 `eval`，违反 `U30–U32`、`U83`、`AGENTS.md` C1-3/第 127 行禁令及 `D16-06②`、`D16-13`。只要 `council revise` 将 `how` 第 3 点改为“阶段 B 两个切片只做本仓计算/插值/参数入口检查；真实容器入口启动中心 Main 与 eval 捕获验证归入阶段 C 的 `A0`/`F01` 及 `U96` 异步非阻塞接缝金丝雀（不作工人合入锁）”，本席立即改投赞成。

### D28-02 v1：赞成（approve）

- **分类意见：** `治理`（规定 `D16-15` 跨仓契约更新后的跟进 issue 派发规则与 `W-09` 席位职责分配）。
- **理由：**
  1. **权责与 `D16-09` 白名单严格对齐：** `D16-09` 已将 `Pepgent/Pepgent` 承载 `apps/web` 依赖的 package manifest 与 lockfile 划归 `W-09`（`pepgent-lab`）独写。`D28-02` 明确由 `W-09` 在 `soroi` 的 `store-contract` 分支推进后执行 `npm update pepgent-store` 并跑 `Pepgent` 本仓 `typecheck` 与测试，消除了 `D16-15`“契约更新后跟进”无具体 owner 与触发时点的治理空白。
  2. **遵守四级隔离与开发期本仓检查边界：** 不让 `W-06` 跨仓修改 `Pepgent` lockfile，也不在开发期增加跨组件 live 验收锁，立即为 `D23-01`（`soroi PR316`）补开 `Pepgent` 跟进 issue 即可消除当前版本漂移。


## D28-02 v1：赞成（ArgonGovernance-2，2026-11-01T17:34:52.165Z）


**分类意见：** 治理

### D28-01 v1：反对（oppose，附可消除反例）

- **分类意见：** `治理`（涉及 `W-04` 与 `W-08` 席位切片派工承载及阶段 B 开发期验收门禁边界）。
- **理由：**
  1. **支持补齐承载：** 完全赞成 `D28-01` 的 `how` 第 1、2、4 点，为 `D13-02 ①`（`Pepgent/deploy`，归 `W-04`）与 `D13-02 ②`（`Pepgent/soroi` `compose.yaml` 与统一 e2e 启动入口，归 `W-08`）新建承载 issue，补齐 `D15→D16` 恢复链遗漏的中心身份注入生产方。
  2. **反对原因（阶段 B 跨组件验收门禁反例）：** `how` 第 3 点要求在两个开发期切片 issue 中都写入“在真实容器入口启动中心 Main，soroi 插件加载成功，eval 中心捕获使用注入的两值”作为验收条件。这使 `W-04`（仅拥有 `deploy` 仓）和 `W-08`（按 `D16-13` 在阶段 B 只写 spec/runbook、不跑跨组件测试）在阶段 B 交付切片 PR 时必须搭起跨组件容器栈运行 `soroi` 与 `eval`，违反 `U30–U32`、`U83`、`AGENTS.md` C1-3/第 127 行禁令及 `D16-06②`、`D16-13`。只要 `council revise` 将 `how` 第 3 点改为“阶段 B 两个切片只做本仓计算/插值/参数入口检查；真实容器入口启动中心 Main 与 eval 捕获验证归入阶段 C 的 `A0`/`F01` 及 `U96` 异步非阻塞接缝金丝雀（不作工人合入锁）”，本席立即改投赞成。

### D28-02 v1：赞成（approve）

- **分类意见：** `治理`（规定 `D16-15` 跨仓契约更新后的跟进 issue 派发规则与 `W-09` 席位职责分配）。
- **理由：**
  1. **权责与 `D16-09` 白名单严格对齐：** `D16-09` 已将 `Pepgent/Pepgent` 承载 `apps/web` 依赖的 package manifest 与 lockfile 划归 `W-09`（`pepgent-lab`）独写。`D28-02` 明确由 `W-09` 在 `soroi` 的 `store-contract` 分支推进后执行 `npm update pepgent-store` 并跑 `Pepgent` 本仓 `typecheck` 与测试，消除了 `D16-15`“契约更新后跟进”无具体 owner 与触发时点的治理空白。
  2. **遵守四级隔离与开发期本仓检查边界：** 不让 `W-06` 跨仓修改 `Pepgent` lockfile，也不在开发期增加跨组件 live 验收锁，立即为 `D23-01`（`soroi PR316`）补开 `Pepgent` 跟进 issue 即可消除当前版本漂移。

