# 闸门 B 裁决：`Pepgent/images#13` `W-03 BLOCKED` `lab-web` 构建读取私有 git 依赖 `pepgent-store`（`images13-private-dep-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/images13-private-dep.md`
- **关联议题：** [Pepgent/images#13](https://github.com/Pepgent/images/issues/13)（评论 [`#issuecomment-6562962112`](https://github.com/Pepgent/images/issues/13#issuecomment-6562962112)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T20:01Z`

---

## 一、总局判定结论

1. **闸门 B（组织、席位路径白名单、阶段门禁与投票程序边界）判定：**
   - **候选 ④（调用者从既有 `soroi` clone 导出 `origin/store-contract` 作为命名构建上下文传入 `lab-web`，`Dockerfile` `web-build` 在 `npm ci` 前用 git `insteadOf` 改写到本地仓，`README.md` 同步更新，并在 `Pepgent/images` 新开承载 issue 供 `images#13` 依赖）：判定为【不越界（K3）】。**
   - **候选 ①（回退到 `d4a91fe` 丢弃 `#45` 后 20 个 commit）与候选 ③（修改 `D10-10`/`D16-15` 规定的 `pepgent-store` git 依赖形式）：判定为【越界（K4）】**，严禁免票采用。
2. **处置去向（正交双闸门前置约束，`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：**
   - 仅当已落盘的 `Argon` 闸门 A（`images13-private-dep-gate-a.md`）与本闸门 B **双双确认候选 ④ 不越界**时，方可按候选 ④ 免投票放行（在 `Pepgent/images` 新开承载 issue，在 `images#13` 评论写明结论与依赖关系，并经 images 片区经理送达 `W-03`）。
   - 若闸门 A 认定候选 ④ 改变部署前提或公开契约（越界），则严禁免票放行，必须立即按 `P0` 经议会 daemon 立案表决！

---

## 二、对第五节 `B-1` ～ `B-4` 的逐项判定

### 1. `B-1`（候选 ④ 的席位路径白名单与承载方式）：**属 `W-03` 单仓白名单内承载补齐，不越界**

- **依据：**
  - 依 `D16-09`（`evidence/decisions/D16-phaseB-review-restore.md:33`），`W-03`（`pepgent-images`）拥有 `Pepgent/images` 全仓白名单。候选 ④ 仅修改 `Pepgent/images` 仓内的 `Dockerfile`（`web-build` 阶段）与 `README.md`，与 `central` 镜像已采用的“由调用者从既有 `soroi` clone 导出构建上下文、拉取凭据不进入构建”完全同构，不触碰任何其他仓库或席位路径，也不改变 `D10-10`、`D16-15` 已通过的 `git+https://github.com/Pepgent/soroi.git#store-contract` 依赖契约。
  - 因 `images#13` 原正文将 `Dockerfile` 结构改动列在范围外，为候选 ④ 在 `Pepgent/images` 另开一个同席位承载 issue 并令 `images#13` 的 `lab-web` 部分依赖它，属于 `W-03` 席位内的标准 issue/PR 承载拆分，不属于跨席位派工或必须投票的事项。

### 2. `B-2`（由当前在席 `W-03` 连续承接新 issue，符合 `D16-10` 与 `D16-13`）：**完全符合**

- **依据：** `W-03` 当前已在席，由其在同一工作树/仓库连续完成新承载 issue 再收尾 `images#13`，不增加活跃 `tern` 席位数（符合 `D16-10` 上限 4 席），且只做 `Pepgent/images` 本仓构建与产物验证、不设跨组件 live 锁（符合 `D16-13` 与 `AGENTS.md` C1-3）。
- **状态观察边界（`AGENTS.md:126`）：** 初审 `F10` 在宿主 `/tmp/img13-probe` 的实验属宿主机制验证 `(R)`，容器内 `web-build` 阶段实际走通属于待 `W-03` 在新承载 PR 中执行的 runtime 验证（目前标为 `[INFERENCE]`，不预标为容器内已验证事实）。

### 3. `B-3`（确认不涉及 `W-06`、`W-09`）：**确认**

- **依据：** 候选 ④ 下 `Pepgent/Pepgent` 与 `Pepgent/soroi` 均无任何代码或 lockfile 改动，不需要向 `W-06` 或 `W-09` 派发任何工作。

### 4. `B-4`（`deploy#24` 结果 3 与 `PR#25` 顺序说明）：**合规**

- **依据：** 依 `D10-08` 与 `AGENTS.md:123`“只暂停依赖它的那部分工作”，`W-04` 在 `deploy` `PR#25` 中可先更新已发布的 `omp-agent`（及 `central`/`omp-rpc-mux`）引用，仅将依赖 `lab-web` 新镜像的引用与配对记录留待 `images#13` 完成后补齐。
