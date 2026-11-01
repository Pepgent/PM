# 闸门 B 裁决：`Pepgent/deploy#24` W-04 `BLOCKED` 结果 3 受信 reader 所需的 Mux 发行配对（`deploy24-release-pairing-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/deploy24-release-pairing.md`
- **关联议题与 PR：** [Pepgent/deploy#24](https://github.com/Pepgent/deploy/issues/24)（评论 [`#issuecomment-6562074885`](https://github.com/Pepgent/deploy/issues/24#issuecomment-6562074885)）、[Pepgent/deploy#25](https://github.com/Pepgent/deploy/pull/25)、[Pepgent/omp-rpc-mux#19](https://github.com/Pepgent/omp-rpc-mux/issues/19)
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T19:20Z`

---

## 一、总局判定结论

**闸门 B 判定：采用候选 ③（源头 owner 发布：`W-01` 发布 `omp-rpc-mux` $\to$ `W-03` 重建 `images` $\to$ `W-04` 更新 `deploy` 引用并记录配对，S1 不冻结）【不越界】！**
- 候选 ③ 严格落在已通过决策 `D10-03`、`D2-13`、`D11-04B`、`D8`（`MUX-08 → IMG-01 → IMG-04/05 → DEP-01`）、`D16-09/10/13` 与 `D32-01 v3` 之内，属于既有契约依赖链下的下游制品刷新承载补齐（K1）；若闸门 A 亦确认候选 ③ 不越界，免投票直接按候选 ③ 开承载 issue 并按 `D16-10` 排期补入 `W-01`、`W-03`。
- 反之，候选 ①、②（让 `W-04` 跨仓构建推送 `omp-rpc-mux`）违反 `D10-03` 与 `D16-09` 白名单，候选 ④（修改 `deploy#24` 验收语义）属验收契约变更（K4），均属越界、严禁免票采用。

---

## 二、逐项判定（对应初审第五节 `B-1` ～ `B-4`）

### 1. `B-1`（席位互斥路径白名单与跨仓承载补齐）：**候选 ③ 不越界，候选 ①/② 越界**

- **依据：**
  - `D10-03`（`evidence/decisions/D10-repo-delivery.md:15`）明确规定：“Mux 以 `Pepgent/omp-rpc-mux` 镜像发布……**发行物由定制所在的仓产出，组装仓只消费构建产物**”；`D2-13` / `D11-04B` 规定 `omp-agent`、`central`、`lab-web` 由 `Pepgent/images` 构建推送；`D16-09` 规定 `W-01` 独占 `Pepgent/omp-rpc-mux`、`W-03` 独占 `Pepgent/images`、`W-04` 独占 `Pepgent/deploy`。
  - 候选 ① 与 ② 让 `W-04`（组装仓 `deploy`）越过 `D10-03` 与 `D16-09` 去构建推送上游 `omp-rpc-mux` 镜像，直接违反席位白名单与源头产出原则，严禁采用。
  - 候选 ③ 中：
    1. `W-01` 在 `Pepgent/omp-rpc-mux` 从已含 `89d7ba1`（受信 reader 参数）的 `origin/main`（`1406243`）构建并推送双架构 `pepgent/omp-rpc-mux:latest`，记录源 commit 与镜像 digest（履行 `MUX-08` 与 `D10-03`）；
    2. `W-03` 在 `Pepgent/images` 以默认 `MUX_IMAGE` 重建并推送 `omp-agent`、`central`、`lab-web` 三个含 `/omp-rpc-mux`（`dial`）的目标镜像，记录源 commit、基础 `MUX_IMAGE` digest 与产出 digest（履行 `IMG-01`/`IMG-04`/`IMG-05` 与 `D2-13`）；
    3. `W-04` 在 `Pepgent/deploy` 更新 `stacks/pepgent-central/slurm.toml` 的 `omp-agent` digest，并在 `PR#25` 补齐结果 3 的同源发行配对记录后合入。
  - 上述三步均严格在各自席位的 `D16-09` 全仓白名单内，不改变任何公开契约或职责边界；在 `Pepgent/omp-rpc-mux` 与 `Pepgent/images` 各开一个制品刷新承载 issue，属于 `D32-01` 实施中对既有 `MUX-08 → IMG-01 → IMG-04/05 → DEP-01` 依赖链的承载补齐，无需另行投票。

### 2. `B-2`（`D16-10` 4 席活跃上限与阶段门禁）：**不越界，按 `D16-10` 滚动补入**

- **依据：**
  - `D16-10`（`evidence/decisions/D16-phaseB-review-restore.md:34`）规定：“同时活跃的 `tern` 工程席位不超过 4 个；有席位释放名额后，从依赖已满足的等待席位中补入”。
  - 当前 `W-01`（尚有 `omp-rpc-mux#19` 待做）与 `W-03` 不在活跃 4 席内；由 `Main` 按 `D16-10` 在现有活跃席位释放名额后依序滚动补入 `W-01` $\to$ `W-03` 执行镜像重发与重建，在此期间 `W-04` 的 `deploy#24` 仅暂停依赖该镜像配对的结果 3（结果 1、2、4 已在 `PR#25` 就绪），符合 `D10-08` 与 `AGENTS.md:123`“只暂停依赖部分”的阶段门禁。

### 3. `B-3`（阶段 B 更新共享 `latest` 与问题 4 不冻结 S1）：**不越界，无需冻结 S1 或让 `W-08` 跟随重建**

- **依据：**
  - 依 `D16-13` 与 `C1-3`，阶段 B 各席位只做本仓检查、不执行 `S1` 或任何跨组件 live 验收（`S1` 统一在阶段 C 组装各仓默认分支最新构建产物后执行）；同时，镜像重发与重建之间的短暂中间态属于 `.claude/rules/design-assumes-it-works.md` 排除的切换竞态窗口。
  - 因此在阶段 B 由 `W-01`、`W-03` 依序更新本地 registry 中的 `omp-rpc-mux:latest` 与 `images` 镜像**不破坏 `D16-13` 阶段边界，无需设置 S1 冻结，也无需 `W-08` 在阶段 B 跟随重建**。

### 4. `B-4`（`deploy#24` 正文将组件 `README` 误标为 `D32-01 v3` 摘录的纠正）：**须在 `#24` 结论评论中澄清更正**

- **依据：**
  - 依 `AGENTS.md:125`（“规则只有两个来源：`(U)` 原话与已通过决策正文”），`Pepgent/omp-rpc-mux/README.md:73-79` 属于组件文档而非管理层决策正文，不能作为授权 `W-04` 跨仓构建推送 `omp-rpc-mux` 的依据。
  - 协调席在 [Pepgent/deploy#24](https://github.com/Pepgent/deploy/issues/24) 发布双闸门结论评论时，须明确指出正文中“更新共享 serve 属于部署者的职责”一句系派工时对 `omp-rpc-mux/README.md` 的误引（非 `D32-01 v3` 原文），实际发布职责严格按 `D10-03` 候选 ③（`W-01` 发布 `mux` $\to$ `W-03` 重建 `images` $\to$ `W-04` 消费并记录配对）执行。
