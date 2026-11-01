# 闸门 A 裁决：images#13 BLOCKED（lab-web 构建取私有 git 依赖 `pepgent-store`）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/images#13](https://github.com/Pepgent/images/issues/13)（[评论 6562962112](https://github.com/Pepgent/images/issues/13#issuecomment-6562962112)），`PM/evidence/gates/images13-private-dep.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不收缩已合入业务实现）、`U30–U32`、`U83`、`U88`（`LEDGER.md:88,97,112,117`：按单仓职责与既有契约推进，不制造跨仓返工或多余阻塞）。
  - `(D)` `SOR/AGENTS.md:60,123,125`（C2-2、D10-08 单仓私有实现归工程师、规则只源于 `(U)` 与已通过决策正文）、`DEC/D2-components.md:48,50`（D2-11、D2-13）、`DEC/D8-mvp-scope.md:228`（IMG-05）、`DEC/D10-repo-delivery.md:20,22`（D10-08、D10-10）、`DEC/D11A-solo-ruling-review.md:44`（D11-04B）、`DEC/D16-15-store-contract.md:28`（D16-15）、`IMG/README.md:54,60-72,99`。

---

## 一、闸门 A 判定结论

- **是否越界：** **候选 ④ 不越界（属 K3 已通过契约 `D10-10`、`D16-15`、`D2-13`/`D11-04B` 内的 `Pepgent/images` 单仓构建实现，不触及产品原始意图或跨组件公开契约，免票放行候选 ④，无需立 P0 表决）。**
- **放行处置（候选 ④）：**
  1. 在 `Pepgent/images` 另开承载 issue（因 `images#13` 将 `Dockerfile` 结构改动列在范围外，`F8`），由 `W-03` 实现：调用者从已有的本地 `soroi` clone 将 `origin/store-contract` 导出为本地 git 仓库/bundle 作为命名 build context 传给 `lab-web` 构建；`Dockerfile` 的 `web-build` 阶段在 `npm ci` 前通过 `git config` 的 `url.<本地路径>.insteadOf` 将 `ssh://git@github.com/Pepgent/soroi.git` 与 `https://github.com/Pepgent/soroi.git` 改写到该本地上下文，使 `npm ci` 原样按 `package-lock.json` 锁定的 commit SHA 安装 `pepgent-store`；同步更新 `Pepgent/images/README.md`。
  2. 该承载 issue 合入后，`W-03` 在 `images#13` 按默认 build arg 从 `Pepgent/Pepgent` `origin/main` 重建并推送 `lab-web:latest`，完成 `images#13` 全部验收。
  3. **明确排除候选 ①、②、③：** 候选 ①（回退到 `d4a91fe` 丢弃 `#45` 起 20 个 Lab 提交）与候选 ③（改写 `D10-10`/`D16-15` 的依赖发布形式）均触及公开契约或验收语义（K4），严禁采用；候选 ② 将读取凭据传入构建过程，突破 `IMG/README.md:54,60` 既有边界，在候选 ④ 可行时无必要采用。

---

## 二、对 `A-1` 至 `A-3` 的逐问回答

- **A-1：** **是，候选 ④ 属于既有契约的直接执行，不触及产品原始意图或公开契约（K3）。**
  - `D10-10` 与 `D16-15`（`DEC/D16-15-store-contract.md:28`）规定 `Pepgent/Pepgent` 以 `git+https://github.com/Pepgent/soroi.git#store-contract` 引用 `store-contract` 分支并由 `package-lock.json` 记录实际 commit SHA。
  - 在候选 ④ 下，`Pepgent/Pepgent` 的 `package.json`、`package-lock.json` 与 `Pepgent/soroi` 的 `store-contract` 分支一字不改，`npm ci` 依然严格校验并安装 `package-lock.json` 中锁定的那个 `store-contract` commit（`F10`），仅把构建期 git 远端传输源通过 `git insteadOf` 指向由调用者从同一权威 `soroi` clone 导出的只读 build context。
  - 压力测试报告中的 N3（`F4`）属于未写入决策正文的 `(A)` 非阻断评论，按 `SOR/AGENTS.md:125` 不构成要求把 git 凭据注入容器的规则；候选 ④ 完全保持“拉取权限留在调用者既有 clone、不进入构建”（`F6`）与机主凭据规则（`F11`）。
- **A-2：** **是，认定候选 ① 与候选 ③ 均越界（K4），不能免票采用（且实质上反对采用）。**
  - 候选 ① 回退到 `d4a91fe` 会抹掉 `Pepgent#45`（`D16-15`）及之后已合入 `Pepgent` `main` 的 20 个 Lab 切片提交（`F9`），使 `lab-web:latest` 退回旧代码，直接违反 `(U) U2`、`U23` 与 `images#13` 从 `origin/main` 构建的验收要求。
  - 候选 ③ 改变 `pepgent-store` 的发布方式，直接违背已表决通过的 `D10-10` 与 `D16-15`（其取舍栏已明确排除 registry 包、Release 压缩包等备选方案，`F3`）。
- **A-3：** **不改变 `lab-web` 的部署前提，也不改变任何跨组件公开接口（K3）。**
  - `Pepgent/images` 的构建调用者本来就必须持有 `soroi` 与 `pepgent` 两个私有仓库的本地 clone（`central` 构建已从同一个 `soroi` clone 导出 `--build-context soroi=…`，`IMG/README.md:60-72`，`F6`）。从同一个 `soroi` clone 额外导出 `origin/store-contract` 作为 `lab-web` 构建的命名上下文，没有增加任何新的外部依赖、凭据或宿主前提。
  - 产出的 `lab-web:latest` 镜像对下游 `Pepgent/deploy`（`W-04`）和运行时容器的公开接口、环境变量与行为完全不变；远程 Komodo Build 流水线按 `D2-13` / `D11-04B` 本就归入 D9 尚未实现（`F5`），同步更新 `IMG/README.md` 即可保持文档与构建定义一致。
