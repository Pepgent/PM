# Pepgent#17 W-09 请求 LAB-08/09/11a/12 叠加在 07a/07b 分支上开发：闸门 B 判定

判定席位：组织治理与分配守护席（`ArgonGovernance-2`）。

对象：[Pepgent/Pepgent#17 评论 6561296393](https://github.com/Pepgent/Pepgent/issues/17#issuecomment-6561296393) 中 W-09 请求将 `LAB-08`（[#24](https://github.com/Pepgent/Pepgent/issues/24)）、`LAB-09`（[#19](https://github.com/Pepgent/Pepgent/issues/19)）、`LAB-11a`（[#22](https://github.com/Pepgent/Pepgent/issues/22)）、`LAB-12`（[#11](https://github.com/Pepgent/Pepgent/issues/11)）叠加在未合入的 `issue-17-lab-catalog-events`（PR #55）分支上开发。输入材料为 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent-17-stacking.md`。

本判定仅审席位路径域、阶段门禁、排期影响与投票程序边界，不替 `Argon`（闸门 A）裁决产品原始意图或公开契约，也不预判 [#20 评论 6561107115](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115) 的四项契约问题。

---

## 一、总体结论

**闸门 B 结论：不越界，采用材料处置 a 免票放行（须闸门 A 同样确认无越界），但必须对 L-1 作明确修正：只放行“独立叠加分支/PR（base 先设为 `issue-17-lab-catalog-events`，待 PR #55 合法合入 `main` 后 rebase 到 `main`、改 base 为 `main` 各自合入）”，不采用处置 c（禁止把 `LAB-08/09/11a/12` 捆绑并入 PR #55 同一交付）。**

---

## 二、对 B-1 至 B-5 的逐项判定

### 1. B-1：四片叠加是否已由 `D16-11③` 与 `#18` 第〇项闸门 B 结论覆盖，可免票放行？

- **结论：已覆盖，不越界，免票放行。**
- **依据：**
  - `LAB-08`、`LAB-09`、`LAB-11a`、`LAB-12` 与 `LAB-07a/07b` 均属同一席位 W-09（`pepgent-lab`）的同一互斥路径白名单（`DEC/D16-phaseB-review-restore.md:33`，D16-09）。
  - `D16-11③`（`DEC/D16-phaseB-review-restore.md:35`）与 `SOR/AGENTS.md:45`（C1-3）明文允许同一仓、同一互斥路径域内的关联切片按真实编译/类型/调用依赖连续实现。
  - 四片复用 `WT07a/apps/web/src/server/lab/events.ts` 的 `LabEvents`（及 `LAB-08` 依赖 `LAB-07b`）属于同席位内部的真实代码依赖。正如 `GATE/pepgent-18-gate-b.md` 第一节第〇行与 3.1 节已确立的判准：`D8` 依赖列不是禁止同域内部模块复用的穷尽名单，实际内部 import 依赖记入对应 issue/PR 即可，不构成对 `D8` 切片范围或派工分配的修改，无需另立 P0 投票。

### 2. B-2：L-1 的两种落地方式是否都在许可内？处置 c 是否违反反设卡与排期规则？

- **结论：仅放行处置 a（独立叠加分支，PR #55 合入后 rebase 到 `main` 各自合入）；排除处置 c（不得将四片并入 PR #55 的同一交付）。**
- **依据：**
  1. **不得绕过上游未决项先行向 `main` 合入（`SOR/AGENTS.md:60` C2-2.2、`SOR/LEDGER.md:22,110` U96）：** 在 PR #55 满足自身全部合入前提（含 #20 的双闸门/P0 结论）并合入 `main` 之前，任何包含 `07a/07b` 差量的叠加 PR 严禁以 `main` 为 base 直接合入。
  2. **不得把四片捆绑进 PR #55 拖延 W-10 上游（`DEC/D16-phaseB-review-restore.md:34` D16-10、`SOR/LEDGER.md:88,97` U30–U32/U83）：** `WEB-02` 依赖 `LAB-07a`、`WEB-03` 依赖 `LAB-07b`，`D16-10` 明确规定 W-10 在真实上游合入后优先补入。若按处置 c 把 `LAB-08/09/11a/12` 并入 PR #55 同一交付，会将 PR #55 的合入条件人为扩大到四片全部完成及各自跨仓前置（如 `LAB-12` 的 `REM-*`/`MUX-04`）就绪之后，构成跨席位捆绑设卡。因此必须保持 PR #55 与后续叠加 PR 的交付解耦。

### 3. B-3：`D25-01` 通过后，`LAB-11a`、`LAB-12` 的路由与 `routeTree.gen.ts` 按 L-3 处理是否还有白名单问题？

- **结论：无遗留白名单问题，L-3 直接适用已通过的 `D25-01`。**
- **依据：** `D25-01 v1`（[PM#42](https://github.com/Pepgent/PM/issues/42)，`PM/evidence/decisions/D25-pepgent-17-routetree.md`）已获五席 5/5 全票通过并归档，其事实栏 F10 已点名覆盖 `LAB-11a` 的上传路由与 `LAB-12` 的 jobs tail 路由。W-09 在各自新增/修改 `apps/web/src/app/routes/api/lab/**` 路由的 PR 中，用既有工具链重新生成并提交 `apps/web/src/app/routeTree.gen.ts`（禁止手改；与 PR #55 或其他叠加 PR 冲突时 rebase 后重新生成；不放开任何其他白名单外文件），完全符合 `D25-01` 授权。

### 4. B-4：L-7 是否与 F-6、F-7 一致（只给叠加许可与限定，不另设等待条件）？

- **结论：完全一致，L-7 成立。**
- **依据：** `SOR/AGENTS.md:45,127-128`（C1-3、工作方式禁令）与 `DEC/D10-repo-delivery.md:20`（D10-08）禁止增设开工锁，遇到未决空白“只暂停依赖部分”。本判定解除 W-09 对“能否在 `issue-17-lab-catalog-events` 上叠加开发”的程序顾虑，不强制所有代码必须叠加，更不设额外审批、跨组件 runtime 或逐片验收锁。

### 5. B-5：四片叠加是否与 `D16-10`“W-10 在真实上游合入后优先补入”冲突？

- **结论：按修正后的 L-1（采用处置 a、排除处置 c）执行，完全不冲突。**
- **依据：** 叠加分支在 `issue-17-lab-catalog-events` 之上向后派生，不向 PR #55 反向塞入新切片代码或额外阻塞条件；PR #55 一旦完成 #20 裁决与本仓检查即可先行合入 `main`，立即满足 `WEB-02/03` 的真实上游条件，不会推迟 W-10 的补入时点。

---

## 三、经闸门 B 确认与修正后的放行限定（L-1 至 L-7）

1. **L-1（修正后保留——独立叠加、不先行合入上游、不捆绑进 PR #55）：** 叠加分支从 `issue-17-lab-catalog-events` 派生，叠加期间 PR 的 base 设为 `issue-17-lab-catalog-events`；在 PR #55 合法合入 `main` 之前，任何叠加 PR 不得以 `main` 为目标合入。PR #55 合入 `main` 后，叠加分支 rebase 到 `origin/main`、将 PR base 改为 `main`，经本仓编译/类型/基础检查通过后合入。**禁止采用处置 c 将 `LAB-08/09/11a/12` 并入 PR #55 同一 PR，以免拖延 W-10 上游合入。**
2. **L-2（原样保留——不夹带待表决语义）：** 叠加开发不授予对 [#20 四项](https://github.com/Pepgent/Pepgent/issues/20#issuecomment-6561107115)或 [#18 第三、四项（D26，PM#43）](https://github.com/Pepgent/PM/issues/43)的裁决权；工人在 #20 上的暂行处理不得在新切片中当作既定公开契约扩展或固化，依赖未决语义的局部代码在对应裁决/表决通过前暂停，其余部分照常推进。
3. **L-3（原样保留——`routeTree.gen.ts` 严格按已通过的 `D25-01` 执行）：** 凡在自身白名单内增删改 `apps/web/src/app/routes/api/lab/**` 路由的 PR，在同一 PR 中用既有工具链重新生成并提交 `apps/web/src/app/routeTree.gen.ts`；禁止手改；rebase 冲突时重新生成；不放开任何其他白名单外文件。
4. **L-4（原样保留——事件通知不省略）：** 各切片改变 `D12-17` 所列事实时必须发布对应频道事件（`automation`、`conversation`、`compute`、`catalog` 等），不得借叠加或拆分省略既有通知义务。
5. **L-5（原样保留——不改切片表与跨仓依赖）：** 不修改 `D8` 依赖列，对 `07a/07b` 的实际内部模块复用记在各切片 issue/PR；`LAB-08` 对 `SOR-13/15/16`、`LAB-12` 对 `REM-*/MUX-04` 的跨仓依赖仍按 `D8:203` 以对应仓 `main` 已合入代码为准，叠加不豁免跨仓真实依赖。
6. **L-6（原样保留——单席位、单路径域）：** 叠加分支与 PR 仅由 W-09 在自身独立克隆与白名单内读写，严禁与 W-10 或其他席位共分支、共 PR。
7. **L-7（原样保留——不增设开工或验收锁）：** 本放行允许 W-09 立即在 `issue-17-lab-catalog-events` 上叠加开展 `LAB-08/09/11a/12` 中不依赖未决语义的工作，也可在 `main` 上开展不依赖 `LabEvents` 的工作；开发期只做本仓检查，不设跨组件 runtime 锁。
