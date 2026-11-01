# 闸门 B 裁决：`Pepgent/soroi#329` `W-07 BLOCKED`（`soroi329-entry-env-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/soroi329-entry-env.md`
- **关联议题：** [Pepgent/soroi#329](https://github.com/Pepgent/soroi/issues/329)（评论 [`#issuecomment-6563265463`](https://github.com/Pepgent/soroi/issues/329#issuecomment-6563265463)）、[Pepgent/soroi#327](https://github.com/Pepgent/soroi/issues/327) / [PR#334](https://github.com/Pepgent/soroi/pull/334)（`69fdfc0`）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **把关复核源头：** 已全量复核 `LEDGER.md:1-140`、`AGENTS.md:1-129`（`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，依 G8 继续），并独立直读 `D16-phaseB-review-restore.md:33,37`（`D16-09`、`D16-13`）、`compose.yaml:9,33,47,57-58` 与 `compose/README.md:39,47,111-115,127-128,134-137`
- **判定时间：** `2026-11-01T20:18Z`

---

## 一、总局判定结论

1. **闸门 B（仅审组织、席位路径白名单、阶段门禁与投票程序边界，不替 `Argon` 裁决公开契约或验收语义）判定：**
   - **`B-1`（席位路径白名单与阶段 B 边界）与 `B-3`（片区经理送达）：不越界。**
   - **`B-2`（协调席修订承载 issue `#329` 预期结果 2 / 验收 2 的程序边界）：严格以已落盘的 `Argon` 闸门 A（`soroi329-entry-env-gate-a.md` `A-2`）确认为前置条件**——`AGENTS.md:123` 括号内的文本矛盾修正例外仅适用于 `ArgonGovernance` 对齐用户 `(U)` 指令，**不授权协调席自行改写已决验收语义**；鉴于 `Argon` 闸门 A 已在 `soroi329-entry-env-gate-a.md`（`A-1`/`A-2`）裁定该处不改变 `D13-02` 或 `DIST-03` 的已决验收语义、仅修正协调席自撰承载文本对 `#327` 交付形态的错误假定，双闸门（Gate A + Gate B）均已落盘确认处置 **ⓐ** 不越界，可按处置 **ⓐ** 免投票放行。

---

## 二、对第五节 `B-1` ～ `B-3` 的逐项判定（严格限定于闸门 B 职责）

### 1. `B-1`（席位路径白名单、`D16-13` 阶段边界）：**不越界**

- **依据：**
  - 经独立直读 `D16-phaseB-review-restore.md:33`（`D16-09`），`W-07`（`pepgent-plugin`）在 `soroi` 内的路径白名单包含 `compose/**`（含 `central-entrypoint.sh`、`startup.yml`、`README.md`），而 `e2e/**`、`compose.yaml`、`compose.full.yaml` 归 `W-08`。处置 ⓐ（方向 `c`）在仓库文件上的改动仅限 `compose/README.md:111-115,127-128,134-137` 的 6 条命令，完全落在 `W-07` 路径白名单内，且复用 `compose.yaml:9,33,47` 声明的 `container_name` 与 `compose/README.md:39,47` 既有写法。
  - 不触碰 `e2e/**` 或 `compose.yaml`，不需要 `W-08` 进场，不新开承载 issue，继续由既有 `soroi#329` 承载；阶段 B 仅做本仓静态检查（符合 `D16-phaseB-review-restore.md:37` `D16-13`）。
  - （注：方向 `a`/`b`/`c` 与 `D13-02`、`DIST-03` 公开契约的关系属第四节 `A-1`～`A-3` 闸门 A 职权，已由 `Argon-2` 在 `soroi329-entry-env-gate-a.md` 专责裁定，本席按 `.omp/agents/argon-governance.md:20-21` 不作越界代裁。）

### 2. `B-2`（协调席修订 `#329` 预期结果 2 与验收 2 的程序合规性）：**在闸门 A（`A-2`）已确认“不改变已决验收语义”的前提下不越界**

- **依据：**
  - `AGENTS.md:123` 明确禁止协调席单方新增或改变已通过决策的公开接口、部署前提或验收语义（同条括号内的文本矛盾修正例外仅针对 `ArgonGovernance` 对齐用户 `(U)` 指令，**不适用于协调席**）。
  - 是否改变 `D13-02` 或 `DIST-03` 的已决验收语义属第四节 `A-2`（`Argon` 闸门 A）专责判断：现 `Argon-2` 已在落盘的 `soroi329-entry-env-gate-a.md`（`A-2`）中裁定 `#329` 预期结果 2 与验收 2 并非来自 `D13-02` 或 `DIST-03` 决策正文，修订该承载文本不改变任何决策正文的验收语义。在此闸门 A 裁定前提下，协调席修正 `#329` 承载文本两处并发评论说明不违反 `AGENTS.md:123` 程序边界。

### 3. `B-3`（由 `AreaMgrSoroi` 按 `C4-2` 送达在席 `W-07`）：**完全符合**

- **依据：** `W-07` 当前在席推进 `#336`/`#337`，对已进场工人的后续解阻结论统一由片区经理 `AreaMgrSoroi` 用单向 peer 送达，符合 `C4-2`。
