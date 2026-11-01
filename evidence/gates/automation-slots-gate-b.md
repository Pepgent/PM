# Automation 会话头无读取携带：闸门 B 判定

判定席位：组织治理与分配守护席（`ArgonGovernance-2`）。

对象：`D29`（[Pepgent/PM#48](https://github.com/Pepgent/PM/issues/48)）`ClaudeHigh` 选票附注第 4 条指出的“Automation 来源 `ConversationWire` 在现行线上无任何读取携带、导致其无运行在途槽位与 `conversation{id}` 失效无读方承接”缺口。输入材料为 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/automation-slots.md`。

本判定仅审席位路径白名单、阶段门禁、承载归属、表决期过渡是否符合 `D10-08`“只暂停依赖部分”以及 P0 立案程序（`C2-2.2`），不替 `Argon`（闸门 A）或投票席位预设产品原始意图或优选具体 wire 方案（处置 a–e）。

---

## 一、是否属必须投票事项（`C2-2.2` / `D10-08`）

- 材料第三节所列全部可选处置（`a` 在 `LabPageWire.automation` 新增 `conversations: ConversationWire[]` 并补 `D12-17` 失效表、`b` 将 `AutomationRunWire.conversation` 改为 `ConversationWire | null` 并补失效表、`c` 在 `LabCatalogWire` 新增列表、`d` 改 `panels` 定义、`e` 改 `D12-04`/`D29-02`/`D29-04` 挂载表）均修改 `D12` 公开 wire 契约或频道失效表。
- 依 `D10-08` 与 `AGENTS.md` 第 123 条（“leader 不当契约来源”），除非闸门 A（`Argon`）指出既有已通过条文在不改动任何公开类型与失效表的前提下已原生携带 Automation `ConversationWire`，否则**任何新增或修改公开 wire 字段、挂载规则或失效表的方案均属必须投票事项，严禁免票单方写入代码或合入**。

---

## 二、对闸门 B 问题（`B-1` 至 `B-3`）的逐项裁定

### 1. `B-1`：参投席位、`domains`、承载 issue（`#20` / `#19` / `#25`）与 `W-09` / `W-10` 分工

- **参投席位与 `domains`：**
  - 只要议案行仅裁定 `D12` 公开 wire 结构与 `D12-17` 失效规则，且后端与前端实现分别落在 `W-09` 与 `W-10` 既有白名单（`D16-09`、`D20-01/02`）内、不修改跨席位路径白名单或派工制度，即属**纯产品/契约行**，由 **4 席（`Coordination`、`ClaudeHigh`、`Argon`、`LeadMentor`，门槛 3/4）** 参投，不加 `domains: [governance]`。
  - 仅当议案行要求变更 `D16-09`/`D20` 路径白名单或跨席位派工规则时，才标注 `domains: [governance]`（5 席参投）。
- **`W-09` 与 `W-10` 路径分工与承载 issue 归属：**
  - **`W-09`（`pepgent-lab`）后端与协议侧（`apps/web/src/protocol/lab/**`、`apps/web/src/server/lab/**`）：** 归入 **`LAB-09`（[Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19)）** 承载（若表决通过时 [Pepgent/Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20) 所在的 [PR#55](https://github.com/Pepgent/Pepgent/pull/55) 尚未合入，同属 `W-09` 的 `#20` 顺带实现 `protocol/lab` 与 `server/lab` 亦在 `W-09` 同一白名单内，但**严禁将本缺口设为 `#20` / [PR#55](https://github.com/Pepgent/Pepgent/pull/55) 的合并前置锁**；主承载记在负责自动化页与自动化运行的 `#19 LAB-09`）。
  - **`W-10`（`pepgent-web`）前端投影侧（`apps/web/src/client/**` 等）：** 归入 **`WEB-05`（[Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)，“投影：节点库、自动化”，`F28–F30`）** 承载，完全位于 `D16-09`/`D20-01` 授予 `W-10` 的既有前端路径域内，无需新增 issue 或改动白名单。

### 2. `B-2`：表决期门禁（“只暂停依赖部分”）与是否等待 `D30`

- **表决期门禁与全路径合入前阻断：**
  - 表决期间严格执行 `D10-08`“只暂停依赖部分”：
    1. **不阻塞 [PR#55](https://github.com/Pepgent/Pepgent/pull/55)（`#17` / `#20`）：** `W-09` 在 `issue-17-lab-catalog-events`（[PR#55](https://github.com/Pepgent/Pepgent/pull/55)）中已完成的目录、事件流及 `D29` Discussion/Panel/Experiment 在途槽位叠加层不依赖本缺口，照常推进合入，**严禁因本缺口卡住 [PR#55](https://github.com/Pepgent/Pepgent/pull/55)（`C1-3`、`U83`）**；
    2. **`LAB-09`（`#19`）只暂停依赖部分：** `W-09` 在 `issue-19-lab-automation` 中仅暂停“Automation 来源 `ConversationWire` 及其无运行槽位的读取携带与对应频道失效扩展”，其余已获放行或已定案部分照常开发；
    3. **全路径合入前阻断：** 在本项 P0 议案表决通过前，**严禁将未经表决的 Automation `ConversationWire` 读取携带/失效改动写入待合入 PR，或合入其父分支 `issue-17-lab-catalog-events`（[PR#55](https://github.com/Pepgent/Pepgent/pull/55)）、`main` 及任何上游/集成分支**。
- **是否需要等 `D30` 定案再立案：**
  - **不需要等待 `D30`（[Pepgent/PM#49](https://github.com/Pepgent/PM/issues/49)）定案即可直接立案。** 本缺口源自已生效的 `D12-04`/`D19-05②` 与已 4/4 通过归档的 `D29-02`/`D29-04`，与 `D30-01..07` 的七项自动化业务规则正交。待闸门 A（`automation-slots-gate-a.md`）落盘后，应立即由 `DeskAutomationSlots`（`--seat Coordination`）向议会 daemon 提交 `council propose` 入 P0 队列，由 daemon 按确定性队列紧接 `D30` 处理，避免人为串行等待（`U83`、`U88`）。

### 3. `B-3`：是否单独立一张 P0 议案（不并入 `D30`）

- **必须单独立一张新的 P0 议案（预计为 `D31`），严禁并入或改写正在表决中的 `D30`（[Pepgent/PM#49](https://github.com/Pepgent/PM/issues/49)）。**
- 原因：`D30` 当前已获 3 席投票、`ClaudeHigh` 正在参投中；若向 `D30` 强行塞入新行或触发修订，会干扰即将结案的 `D30` 计票并拖慢 `LAB-09` 的解阻。单独立 P0 议案交议会 daemon 自动排队最为干净高效。
