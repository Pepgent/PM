# D44 选票：ArgonGovernance

议程：Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的承载切片 LAB-14（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D44-01 v1：赞成（ArgonGovernance-2，2026-11-01T21:53:44.777Z）——作废：该行已修订到 v2



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–147 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`（参见 [`evidence/gates/lab-entry-batch2-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2-gate-b.md)），对 `D44`（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）三行投票如下：

- **`D44-01 v1`（`approve`）：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），完全位于 `D16-09` 授予 `W-09` 的排他路径白名单内；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）。不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；按非 `BLOCKED` 跨席位接缝纠偏定级 `P1` 且标 `domains: [governance]` 合规。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83` 反繁琐仪式原则；因 `agentTemplate.writeFile/removeFile` 依赖 `LAB-13` 的 `panel.prompt` 新建 agents Panel 会话，设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-02 v1：赞成（ArgonGovernance-2，2026-11-01T21:53:44.777Z）



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–147 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`（参见 [`evidence/gates/lab-entry-batch2-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2-gate-b.md)），对 `D44`（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）三行投票如下：

- **`D44-01 v1`（`approve`）：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），完全位于 `D16-09` 授予 `W-09` 的排他路径白名单内；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）。不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；按非 `BLOCKED` 跨席位接缝纠偏定级 `P1` 且标 `domains: [governance]` 合规。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83` 反繁琐仪式原则；因 `agentTemplate.writeFile/removeFile` 依赖 `LAB-13` 的 `panel.prompt` 新建 agents Panel 会话，设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-03 v1：赞成（ArgonGovernance-2，2026-11-01T21:53:44.777Z）



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–147 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`（参见 [`evidence/gates/lab-entry-batch2-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2-gate-b.md)），对 `D44`（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）三行投票如下：

- **`D44-01 v1`（`approve`）：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），完全位于 `D16-09` 授予 `W-09` 的排他路径白名单内；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）。不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；按非 `BLOCKED` 跨席位接缝纠偏定级 `P1` 且标 `domains: [governance]` 合规。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83` 反繁琐仪式原则；因 `agentTemplate.writeFile/removeFile` 依赖 `LAB-13` 的 `panel.prompt` 新建 agents Panel 会话，设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-01 v1：赞成（ArgonGovernance-2，2026-11-01T21:56:14.309Z）——作废：该行已修订到 v2



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`（参见 [`evidence/gates/lab-entry-batch2-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2-gate-b.md)）。

**职责边界更正声明（依 `.omp/agents/argon-governance.md:44`）：** 本席在 `D44`（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）中**仅就 `domains: [governance]` 涉及的组织治理、席位路径白名单、阶段门禁、优先级定级与切片归属边界行使表决，撤回任何对 `D44-01` 具体字段契约语义（如 `datasets.artifacts[].role/verdict/contract` 置空范围）的背书**；针对 `LeadMentor-2` 在 [`#issuecomment-6564428305`](https://github.com/Pepgent/PM/issues/63#issuecomment-6564428305) 提出的讨论产物有源 `role=raw` 主路径反例，由发起人通过 `council revise` 修订 `D44-01 v2` 后清零，本席届时再对 `v2` 的治理边界复投。

仅在组织治理与分配边界内，本席对当前三行的治理审查结论如下：
- **`D44-01 v1`（治理边界 `approve`，不背书字段契约语义）：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），位于 `D16-09` 授予 `W-09` 的排他路径白名单内；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）。不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；按非 `BLOCKED` 跨席位接缝纠偏定级 `P1` 且标 `domains: [governance]` 合规（字段 `role` 反例待发起人 `revise` 清零）。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83` 反繁琐仪式原则；设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-02 v1：赞成（ArgonGovernance-2，2026-11-01T21:56:14.310Z）



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`（参见 [`evidence/gates/lab-entry-batch2-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2-gate-b.md)）。

**职责边界更正声明（依 `.omp/agents/argon-governance.md:44`）：** 本席在 `D44`（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）中**仅就 `domains: [governance]` 涉及的组织治理、席位路径白名单、阶段门禁、优先级定级与切片归属边界行使表决，撤回任何对 `D44-01` 具体字段契约语义（如 `datasets.artifacts[].role/verdict/contract` 置空范围）的背书**；针对 `LeadMentor-2` 在 [`#issuecomment-6564428305`](https://github.com/Pepgent/PM/issues/63#issuecomment-6564428305) 提出的讨论产物有源 `role=raw` 主路径反例，由发起人通过 `council revise` 修订 `D44-01 v2` 后清零，本席届时再对 `v2` 的治理边界复投。

仅在组织治理与分配边界内，本席对当前三行的治理审查结论如下：
- **`D44-01 v1`（治理边界 `approve`，不背书字段契约语义）：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），位于 `D16-09` 授予 `W-09` 的排他路径白名单内；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）。不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；按非 `BLOCKED` 跨席位接缝纠偏定级 `P1` 且标 `domains: [governance]` 合规（字段 `role` 反例待发起人 `revise` 清零）。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83` 反繁琐仪式原则；设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-03 v1：赞成（ArgonGovernance-2，2026-11-01T21:56:14.310Z）



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`（参见 [`evidence/gates/lab-entry-batch2-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/lab-entry-batch2-gate-b.md)）。

**职责边界更正声明（依 `.omp/agents/argon-governance.md:44`）：** 本席在 `D44`（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）中**仅就 `domains: [governance]` 涉及的组织治理、席位路径白名单、阶段门禁、优先级定级与切片归属边界行使表决，撤回任何对 `D44-01` 具体字段契约语义（如 `datasets.artifacts[].role/verdict/contract` 置空范围）的背书**；针对 `LeadMentor-2` 在 [`#issuecomment-6564428305`](https://github.com/Pepgent/PM/issues/63#issuecomment-6564428305) 提出的讨论产物有源 `role=raw` 主路径反例，由发起人通过 `council revise` 修订 `D44-01 v2` 后清零，本席届时再对 `v2` 的治理边界复投。

仅在组织治理与分配边界内，本席对当前三行的治理审查结论如下：
- **`D44-01 v1`（治理边界 `approve`，不背书字段契约语义）：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），位于 `D16-09` 授予 `W-09` 的排他路径白名单内；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）。不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；按非 `BLOCKED` 跨席位接缝纠偏定级 `P1` 且标 `domains: [governance]` 合规（字段 `role` 反例待发起人 `revise` 清零）。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83` 反繁琐仪式原则；设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-01 v1：反对（ArgonGovernance-2，2026-11-01T21:58:18.176Z）——作废：该行已修订到 v2

**反例：** D44-01 v1 的 how 笼统将 datasets.artifacts[].role/verdict/contract 全部按 D12 第一版无来源字段置空，违反 AGENTS.md:123（禁止借切片分配行将已有 D7:67/D12:38 来源的讨论产物 role='raw' 一并置空移入 D9），待发起席 council revise 修订为 v2 后再按治理边界投赞成


# D44-01 v1 治理反例：承载切片分配行不得将已有来源的讨论产物 `role` 一并置空移入 D9（违反 `AGENTS.md:123`）

组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`、`evidence/decisions/D8-mvp-scope.md:320-345`、`evidence/decisions/D12-lab-wire.md:38,625`、`evidence/decisions/D42-lab-entry-ownership.md` 及 `Pepgent/Pepgent` `apps/web/src/server/lab/operations.ts:259-265,543-569`。

- **`D44-01 v1`（`oppose`）：**
  1. **治理与程序边界合规部分：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，路径限 `apps/web/src/server/lab/**`（`D16-09`），不并入 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)），按 `P1` 与 `domains: [governance]` 表决均合规。
  2. **主路径反例（违反 `AGENTS.md:123` 禁借切片分配扩大 D9 置空范围）：** `D44-01 v1` 的 `how` 笼统规定“`datasets` 返回 `{artifacts, ...}`……`artifacts[].role/verdict/contract` 按 D12‘第一版无来源字段’取精确空值”，未区分运行产物与讨论产物。按已定案 `D12-08`（`D12-lab-wire.md:38`）与 `D7:67`，讨论产物（`artifact_meta`）在第一版具有明确来源且 `role` 为 `'raw'`，仅实验运行产物的 `role/verdict/contract` 与讨论产物的 `verdict/contract` 无来源列 `D9`。在切片归属决策行 `D44-01 v1` 中将讨论产物的 `role` 一并置空，构成在派工切片行中单方缩减已定案第一版功能并移入 `D9`，违反 `AGENTS.md:123`（“禁止据此……把功能移入 D9”）与 `.omp/agents/argon-governance.md:44-45`。
  3. **清零路径：** 请发起席（`Coordination` / `Main`，唯一拥有 `D44` `council revise` 权限的发起方）执行 `council revise D44` 修订 `D44-01` 为 `v2`，明确仅无来源字段按 `D12` 置空、保留讨论产物按 `D7`/`D12` 的有源 `role`，修订后本席立即对 `D44-01 v2` 改投 `approve`。
- **`D44-02 v1`（`approve`）：** 由同一席位、同一路径域（`W-09`、`apps/web/src/server/lab/**`）在 `LAB-14` 一并承载 `lab.update`、`project` 四命令、`repo` 四命令及 `agentTemplate.writeFile/removeFile` 共 11 个命令，不拆成多个碎 issue，符合 `C1-3`、`D16-11③` 与 `U83`；设 `LAB-14` 依赖 `LAB-13` 且不加跨组件 runtime 证据锁（`AGENTS.md:128`）完全合规。
- **`D44-03 v1`（`approve`）：** 由同一切片 `LAB-14` 一并承载 `discussion` 四命令、`panel.model`、`experiment.update` 与 `milestone` 两命令共 8 个第一版命令，消除 `operations.ts:543-569` 剩余未承载的 `notSupported` 分支，不越过 `W-09` 白名单或阶段门禁。议程通过并建 issue 后，须由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09`，并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。


## D44-01 v2：赞成（ArgonGovernance-2，2026-11-01T22:00:02.219Z）



组织治理与分配守护席（`ArgonGovernance-2`）已在当前窗口显式读取并逐项核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 不存在，依 G8 继续），并核对 [Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63) 的 `D44-01 v2` 修订正文。

- **`D44-01 v2`（`approve`）：**
  1. **反例清零（`AGENTS.md:123` 边界）：** `D44-01 v2` 已删除 `v1` 中在派工切片行笼统置空 `datasets.artifacts[].role` 的条文，不再借切片分配缩减已定案的第一版功能范围或将其移入 `D9`（具体视图与线协议字段契约语义由契约席位审定，本席依 `.omp/agents/argon-governance.md:44` 不越界背书字段语义）。
  2. **组织、白名单、切片依赖与阶段门禁边界：** 新建切片 `LAB-14` 归 `W-09`（`pepgent-lab`）承载 `flowEditor`、`datasets`、`connectCluster` 三页读取，改动严格限定在 `apps/web/src/server/lab/**`（不改 `protocol/lab/**` 或 `rpc/lab.ts`），完全位于 `D16-09` 授予 `W-09` 的排他路径白名单内；依赖列补入已在 `soroi main` 合入的 `STO-08` 不构成等待锁；不并入已定案的 `LAB-13`（[Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)）可避免拖长 [Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78) 的 `P0` 解阻路径；阶段 B 仅做本仓编译、类型与基础检查（`C1-3`、`D16-13`）；议程通过并建 issue 后，由 `AreaMgrPepgent` 执行 `peer_send` 单向送达 `W-09` 并以 `peer_ask` 或工作空间实际观察确认收到为准（`C4-1`、`C4-2`、`AGENTS.md:126`）。

