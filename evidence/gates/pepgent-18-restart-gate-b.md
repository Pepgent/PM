# Pepgent#18（LAB-11b）新契约空白“已绑定运行的草稿能否再次 experiment.start”：闸门 B 判定

判定席位：组织治理与分配守护席（`ArgonGovernance-2`）。

对象：[Pepgent/Pepgent#18](https://github.com/Pepgent/Pepgent/issues/18) [评论 6561364444](https://github.com/Pepgent/Pepgent/issues/18#issuecomment-6561364444) 末节上报的新空白：草稿已有 `experiment_ext.draft` 指向它（即已绑定为某次运行的来源草稿）时，对其调用 `experiment.start{draft}` 的处理。输入材料为 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent-18-restart.md`。

本判定仅代表**闸门 B（席位路径白名单、阶段门禁与投票程序边界）**通道的结论，不替 `Argon`（闸门 A）裁决产品原始意图或公开契约；**依 `SOR/AGENTS.md:60`（C2-2.2），在闸门 A（`pepgent-18-restart-gate-a.md`）明确确认无越界前，不得单凭本文件向工人下达最终免票放行指令。** 本实例不提交、不联系工人、不在 GitHub 发言。

---

## 一、总体结论

1. **对处置 a（作为既有契约澄清，已绑定草稿再次 `experiment.start` 返回既有 `revision_conflict`，草稿、`pending_launch` 与 `catalog` 不变）：闸门 B 侧判定不越界（待闸门 A 同样确认属既有契约澄清后，方可双闸门合一免票放行）。**
2. **对处置 b（A 若认定属未定义公开生命周期缺口，立 P0 主案拒绝再启动）或处置 c（允许同一草稿再次启动并修改 `D12-04` 目录组成与 `D26` 来源草稿语义）：必须进入 P0 投票**；参投席位为**产品/契约常设 4 席（`Coordination`、`ClaudeHigh`、`Argon`、`LeadMentor`），通过门槛为至少 3/4（3 席）赞成**、无成立专责否决且无未清零反例。
3. **过渡行为（B-3）：** 双闸门结论送达或 P0 定案前，W-09 仅将 `LAB/operations.ts:389-396` 中 `bound` 分支的 `experiment.start` 暂留为 `not_supported`、其余已通过分支照常实现，符合 `DEC/D10-repo-delivery.md:20`（D10-08）“只暂停依赖部分”。

---

## 二、对 B-1 至 B-3 的逐项判定与 `path:line` 依据

### 1. B-1：若闸门 A 认定只需澄清，按读法甲（处置 a）落实是否越过 W-09 白名单、阶段门禁或属必须投票事项？

- **结论：B 侧确认不越过路径白名单、不破坏阶段门禁；在闸门 A 确认“一份草稿至多启动一次实验”已由既有决策确定（无需新增生命周期契约）的前提下，不属于必须另行投票事项。**
- **逐项依据：**
  1. **席位路径白名单（不越界）：**
     - 代码改动仅涉及 `WT11b/apps/web/src/server/lab/operations.ts:308-320,389-396`（将 `bound` 分支的返回从 `not_supported` 改为 `revision_conflict`），完全位于 `DEC/D16-phaseB-review-restore.md:33`（D16-09）授予 W-09 独写的 `apps/web/src/server/lab/**` 路径白名单内。
     - `DEC/D12-lab-wire.md:522-534` 生命周期状态表的字面补列属已通过契约文档的同步维护（由秘书/治理承接者执行，`DEC/D16-phaseB-review-restore.md:30` D16-06①），不涉及其他工程席位路径域。
  2. **公开契约与必须投票边界（与处置 c 严格区分）：**
     - 既有已通过条文：`DEC/D7-lab-backend.md:66`（D7-06：“一实验一 store 运行；启动前为草稿”）、`DEC/D6-store-service.md:40`（D6-12：草稿是“尚未开始的实验画布”，开始运行后以 `run id` 作为实验索引）、`DEC/D12-lab-wire.md:36,265-266,522-534`（目录只为未绑定草稿出草稿项，`pendingLaunch` 只挂在草稿项上，见 `WT11b/apps/web/src/server/lab/catalog.ts:142-153`），以及已 4/4 通过归档的 `DEC/D26-pepgent-18-draft-lifecycle.md:11,38,68,71`（投递后草稿即固定为该次实验的来源草稿，修改计划只能另起草稿，拒绝写入统一返回既有领域失败码 `revision_conflict`，见 `WT11b/apps/web/src/protocol/errors.ts:37-46,80-91`）。
     - 若闸门 A（A-1、A-2）确认上述已通过条文已排除“已绑定运行的来源草稿再次 `experiment.start`”，则处置 a 不新增命令、不改 `ExperimentWire`/`DraftWire`/`PendingLaunchWire` 形状、不新增失败码、不改 `lab.sqlite` schema（`WT11b/apps/web/src/server/lab/schema.ts:106-117`），仅按 `D26-03/06` 同形返回 `revision_conflict`，在程序上不触发 `DEC/D10-repo-delivery.md:20`（D10-08）与 `SOR/AGENTS.md:122-123` 的必须投票条件。
     - 反之，**处置 c（允许已绑定草稿再次启动）** 必然要求修改 `DEC/D12-lab-wire.md:36` 的目录组成规则与 `DEC/D26-pepgent-18-draft-lifecycle.md:11` 的来源草稿唯一定位语义，直接触及 `D10-08` 的公开 wire 与生命周期类别，绝不可免票放行；同样，若闸门 A（A-3）认定现有条文未排除再启动、属于公开生命周期缺口（读法乙 / 处置 b），也必须依 `SOR/AGENTS.md:60`（C2-2.2）转入 P0 表决。
  3. **阶段门禁（不越界）：**
     - 处置 a 在开发期仅做本仓编译/类型/基础检查，不引入跨组件 runtime 验收锁或额外审批等待锁，符合 `DEC/D16-phaseB-review-restore.md:35,37`（D16-11③、D16-13）与 `SOR/AGENTS.md:45,127`（C1-3）。

### 2. B-2：若须进入 P0（处置 b 或 c），参投席位与通过门槛是什么？

- **结论：由 4 个常设产品/契约职能席位参投，通过门槛为 $\ge 3/4$（至少 3 席赞成）。**
- **依据：**
  - 本项仅定夺草稿在 `bound` 状态下对 `experiment.start` 的业务生命周期响应（及处置 c 下的 `D12-04` 目录 wire 组成），**不涉及**组织制度、席位路径白名单重划、切片归属调整、工作流提效（`U90`）或 PM 错误路径清理（`.omp/agents/argon-governance.md:39` 第 20 条）。
  - 依 `SOR/AGENTS.md:22,27`（D1-12 / C2-3）与 `.omp/skills/decision-vote/SKILL.md:27-37`：属产品、架构与跨组件契约议案，参投席位为 **① 总协调指挥席（`Coordination`，1 票）、② 独立正反审查席（`ClaudeHigh`，1 票）、③ 产品原始意图席（`Argon`，1 票 + 凭 `(U)` 享原始意图/缺失设计一票否决权）、④ 独立导师仲裁席（`LeadMentor`，1 票 + 分类争议终局仲裁权）** 共 4 席（组织治理席 `ArgonGovernance` 不例行参投纯单仓/业务契约行，见 `.omp/agents/argon-governance.md:26` 第 11 条）。
  - 通过条件：4 席投齐后，无成立的 `Argon` 专责否决、无未清零的有效反例，且赞成票 $\ge \lceil 3/4 \times 4 \rceil = 3$ 票即通过。

### 3. B-3：表决或双闸门会合期间，W-09 仅将 `bound` 分支留在 `not_supported`、其余照常实现，是否符合“只暂停依赖部分”？

- **结论：完全符合。**
- **依据：** `WT11b/apps/web/src/server/lab/operations.ts:308-320,389-396` 将草稿状态划分为 `free`、`awaiting_approval`、`sent`、`bound` 四分支，仅在尚未获双闸门确认的 `bound` 分支上对 `experiment.start` 返回 `not_supported`，其余已获双闸门放行及 `D26`（[PM#43](https://github.com/Pepgent/PM/issues/43)）表决通过的保存、丢弃、首次启动与审批路径均正常运作，严格遵循 `DEC/D10-repo-delivery.md:20`（D10-08）“只暂停依赖部分”与 `SOR/AGENTS.md:127-128` 反设卡规则。
