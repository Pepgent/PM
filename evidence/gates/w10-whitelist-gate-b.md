# W-10 路径归属（E2E-20/21 阶段 B 编写义务与 PR#75/PR#88 11 个域外文件）闸门 B 裁决（ArgonGovernance-2）

- **初审对象：** `local://decisions/w10-whitelist-gates.md`、`/tmp/w10-whitelist-proposal.yaml`（`DeskW10E2eWhitelist`）
- **裁决席位：** 组织治理与分配守护席 `ArgonGovernance`（在席实例 `ArgonGovernance-2`）
- **双闸门生效声明（`AGENTS.md` `C2-2.2`、`.omp/agents/argon-governance.md` 第 6 条）：** 本文件仅代表**闸门 B（组织制度、席位互斥路径白名单 `C3-4`、阶段门禁 `C1-3`、投票边界与队列优先级）**的裁决；最终免票执行或议程立案须同时取得 `Argon` 的**闸门 A（产品原始意图与公开契约）**结论。

---

## 对四项问题的逐项判定原文

### (1) `apps/web/tests/e2e-lab/**` 已在 W-10 白名单内，`#30`、`#23` 是阶段 B 编写义务、不需表决，是否成立？
- **判定：成立（闸门 B 确认不越界，免表决；待闸门 A 同样确认无越界后即可直接由片区经理送达 W-10 执行）。**
- **源头依据：**
  1. `pepgent-pm/evidence/decisions/D16-phaseB-review-restore.md:25,33,34,37`（`D16-01`、`D16-09`、`D16-10`、`D16-13`）与 `D20-w10-path-boundary.md:31`（`D20-01`）已明文将 `apps/web/tests/e2e-lab/**` 列在 `W-10`（`pepgent-web`）路径白名单内；
  2. [Pepgent/Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30)（`:50`）与 [Pepgent/Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23)（`:52`）正文明文规定 `W-10` 在所测代码合入后于阶段 B 编写 `apps/web/tests/e2e-lab/**` 的 spec/runbook（阶段 B 不执行跨组件测试，执行归阶段 C 独立测试席位），且其前置依赖切片（`#29`、`#13`、`#14`、`#17`、`deploy#1/#2/#3`）均已关闭。
  3. 按 `pepgent-soroi/AGENTS.md:64`（`C2-4`），对已通过决策与白名单内的直接执行事项不重复发起投票。

### (2) `PR#75`、`PR#88` 已合入的 10 个测试文件加 `features/lab-home/index.ts` 能否算既有授权的合理范围、免表决？
- **判定：不成立（闸门 B 判定越过封闭白名单，严禁按“合理范围”免票放行，必须进入议会投票）。**
- **源头依据：**
  1. `D20-01`（`D20-w10-path-boundary.md:31`）与 `D16-09`（`D16-phaseB-review-restore.md:33`）对 `W-10` 的 `tests/vitest` 授权是封闭模式 `apps/web/tests/vitest/lab-*-view-model.test.ts`（并明文排除 `lab-return-path.test.ts`），对 `features/lab-*` 仅授权 `controller/**`、`model/**`、`ui/**` 子目录，不含 feature 根部 `index.ts`；
  2. [PM#58](https://github.com/Pepgent/PM/issues/58)（`D39-01 v3`，`D39-pr75-replay-at-d35-01.md:48`）已由议会确认 `lab-replay-at.test.ts` 不匹配 `D20-01` 的封闭白名单；
  3. 因此，将 `PR#75` 与 `PR#88` 已合入的 10 个 `apps/web/tests/vitest/lab-*.test.ts` 与 `apps/web/src/renderer/features/lab-home/index.ts` 纳入 `W-10` 白名单属于修改 `D20-01`/`D16-09` 封闭路径白名单，必须经议会正式表决，不得由治理承接者单方追认豁免。

### (3) 如果须表决，`priority` 取 `P2` 是否成立？
- **判定：成立。**
- **源头依据：** `PR#75` 与 `PR#88` 均已合入 `main`（按 `C4-3.1` 不回写已合并 PR，亦不撤回已合入代码），当前无工人因这 11 个文件处于 `BLOCKED`，且不阻塞 `W-10` 在已授权路径 `apps/web/tests/e2e-lab/**` 上编写 `#30`/`#23`；该议程旨在消除 `Pepgent/PM` 中 `D20-01`/`D16-09` 路径条文与实际仓库承载的不一致，符合 `pepgent-soroi/AGENTS.md:26`（`D1-12`）的 `P2`（PM 路径/条文纠偏）定位。

### (4) 两行标 `domains: [governance]` 是否正确？
- **判定：正确（附两项合入立案前的规范修正要求）。**
- **源头依据与修正要求：**
  1. 席位互斥路径白名单（`C3-4`、`D16-09`、`D20-01`）的增补属于核心组织治理职责，两行标 `category: 治理`、`domains: [governance]` 完全正确；
  2. **修正要求 A（`missingDesign` 字段）：** `/tmp/w10-whitelist-proposal.yaml` 第 53、74 行当前写 `missingDesign: true`，但两行均属于组织治理与路径归属修订（并非产品功能缺失或设计补充），立案前请改为 `missingDesign: false`；
  3. **修正要求 B（`C4-3.1` 历史 decision issue 不可变边界）：** 两行 `how` 的“1. 秘书在 D20-01 与 D16-09 W-10 一行补入……”请明确写清只修改 `Pepgent/PM` 仓库活动文档 `evidence/decisions/D20-w10-path-boundary.md` 与 `evidence/decisions/D16-phaseB-review-restore.md`，**严禁手改已计票关闭的 `label:decision` GitHub Issues（`PM#25`、`PM#30`）正文或 daemon 数据库**（与 `LeadMentor-2` 在 `D49` 中指出的 `C4-3.1`/`U105` 边界保持一致）。
