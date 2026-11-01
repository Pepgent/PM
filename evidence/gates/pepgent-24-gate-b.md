# Pepgent#24（LAB-08 / PR#58）：两项 BLOCKED 闸门 B 判定

判定席位：组织治理与分配守护席（`ArgonGovernance-2`）。

对象：[Pepgent/Pepgent#24（LAB-08）](https://github.com/Pepgent/Pepgent/issues/24)（交付 PR：[Pepgent/Pepgent#58](https://github.com/Pepgent/Pepgent/pull/58)，分支 `issue-24-lab-intervene`，base `issue-17-lab-catalog-events`）[评论 6561585140](https://github.com/Pepgent/Pepgent/issues/24#issuecomment-6561585140) 上报的两项 `BLOCKED`。输入材料为 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent-24.md`。

本判定仅审席位路径白名单、阶段门禁、跨席位派工与承载归属、是否属必须投票事项以及表决期过渡范围（`C2-2.2`、`D10-08`），不替 `Argon`（闸门 A）或投票席位裁决产品原始意图或优选具体技术方案。

---

## 一、第一项：根会话停驻时的 `intervene.derive` 与 `run.abort`（`B1-1` ～ `B1-2`）

- **是否越界与是否必须投票（`B1-1`）：**
  - 材料 `F1-3` 至 `F1-7` 给出已通过的 `D2-06`、`D3-19`、`design/intervention.md:11` 与 `D5-16` 原文：“根会话已停驻时，Lab 后端作为写方先开新的一代，等端点注册后再路由”；`D7-09` 的“不唤醒”仅约束读取 `writers`/`slots`。
  - **闸门 B 结论：** 若闸门 A（`Argon`）确认本项属 **K1（既有决策已覆盖，只需澄清）**，且开代等待细节与注册前 503 窗口属 **K3（`D10-08` 单仓内部实现）+ K2（`D19-02` 主路径外失败/竞态）**，则本项**不越界、不需要投票**。只需在 [Pepgent/Pepgent#24](https://github.com/Pepgent/Pepgent/issues/24) 评论写明 `D2-06`、`D3-19`、`design/intervention.md:11`、`D5-16` 出处，由 `AreaMgrPepgent-3` 送达 `W-09` 在 [PR#58](https://github.com/Pepgent/Pepgent/pull/58) 内直接补齐实现。
- **路径白名单与跨席位边界（`B1-2`）：**
  - 复用 `LabSessions` 现有开代路径仅修改 `W-09`（`pepgent-lab`）独占白名单内的 `apps/web/src/server/lab/**`（`D16-09`），**不跨仓、不触碰其他席位路径白名单或阶段门禁，不涉及其他席位派工**。

---

## 二、第二项：子 agent 的 `human.irc` 受信 reader 凭据与同容器 omp 隔离（`B2-1` ～ `B2-3`）

- **跨席位派工与必须投票界定（`B2-1`）：**
  - 材料 `F2-1` 至 `F2-9` 及可选处置 `a / b / c / d` 均改变 `D10-08` 规定的**部署前提、权限/信任边界或跨组件启动配方**（处置 `a` 改 `D7-04③`/`D7-19` 并跨 `W-09` Lab、`W-04` deploy 及 `W-03` images 容器用户；处置 `b` 改 `D2-20`/`D7-19` 容器拓扑；处置 `c` 改 `W-01` `MUX/README.md:117` 部署安全前提；处置 `d` 收缩 `F25` 主路径）。
  - **闸门 B 结论：本项越过单席白名单与单仓内部实现边界，必须立案进入 P0 表决！**
  - **参投席位与 `domains`：** 因本项直接涉及跨席位（`W-09`、`W-04` 及视方案涉及 `W-03` 或 `W-01`）职责边界与新承载派工，P0 议案行**必须标注 `domains: [governance]`**（由 4 产品/契约席 + `ArgonGovernance` 组织治理席共 5 席参投，门槛 4/5；若产品全景席认领 `product` 则按 daemon 规则计列）。
- **表决期“只暂停依赖部分”与合入前阻断范围（`B2-2`）：**
  - **只暂停依赖部分：** 表决期间，`W-09` 仅暂停“子 agent 的 `human.irc` 受信 reader 连接与凭据隔离改动”，而根会话 `human.irc`、第一项（经闸门 A/B 放行后的停驻根会话开代路由 `derive`/`abort`）及 `LAB-08` 其余命令均照常实现推进，**符合 `D10-08`“只暂停依赖部分”**。
  - **全路径合入前阻断：** 在本项 P0 议案表决通过前，**严禁将任何未经表决的第二项凭据隔离/受信 reader 改动写入待合入 PR，亦严禁将未决方案合入其 base 父分支 `issue-17-lab-catalog-events`（[PR#55](https://github.com/Pepgent/Pepgent/pull/55)）、`main` 或任何上游/集成分支**。
  - **关于 [PR#58](https://github.com/Pepgent/Pepgent/pull/58) 的合入衔接：**
    1. 本项表决**绝不阻塞父分支 [PR#55](https://github.com/Pepgent/Pepgent/pull/55)（`#17`/`#20`）的合入**；
    2. 对携带 `Fixes #24` 的 [PR#58](https://github.com/Pepgent/Pepgent/pull/58)：`W-09` 先在分支 `issue-24-lab-intervene` 补齐第一项实现；由于 `#24`（`LAB-08`）验收范围包含 `F25`（经 IRC 接管 subagent），若在第二项 P0 表决完成前提前合入 `PR#58` 会自动关闭 `#24` 并使 `F25` 留在 `not_supported`。因此，`PR#58` 应待本项 P0 议案定案并补齐 `W-09` 侧实现后再合入（或者若协调席决定先合入 `PR#58` 已完成部分，必须在合入前先为 `W-09` 新建承接第二项 Lab 侧实现的独立 issue，严禁无承载关闭 `#24` 收缩 `F25` 范围）。
- **跨仓承载（`W-04 deploy` 等）在议案中的明确要求（`B2-3`）：**
  - 鉴于 `DEP/README.md:97` 已明确将人工 IRC 排除在 `DEP-01` 完成结论外（`F2-3`），为防止重演 `D13-02`“契约通过但遗漏工程承载 issue”的缺口，**本项 P0 议案的 `Where` 与 `How` 栏必须明确写出各受影响席位的承载归属**（例如：定案后由协调席在 `Pepgent/deploy` 新建 `W-04` 承载 issue 负责 `stacks/pepgent-central` 的 `--trusted-reader-token*` / secret / user 注入；若选处置 `a` 涉及容器双用户则同步在 `Pepgent/images` 新建 `W-03` 承载 issue；`W-09` Lab 侧由 `Pepgent#24` 承载）。
  - 同时依 `C1-3` 与 `U83`，`W-09` 在 `Pepgent` 仓内的实现只做本仓检查，**不把 `W-04 deploy` 容器栈上线设为 `W-09` 代码合入的跨组件等待锁**（跨组件真实运行由阶段 C `F25` 统一验收）。
