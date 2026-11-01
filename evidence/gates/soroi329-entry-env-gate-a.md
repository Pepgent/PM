# 闸门 A 裁决：soroi#329 BLOCKED（compose/README 中 stop/exec 的中心身份取值来源）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/soroi#329](https://github.com/Pepgent/soroi/issues/329)（[评论 6563265463](https://github.com/Pepgent/soroi/issues/329#issuecomment-6563265463)），`PM/evidence/gates/soroi329-entry-env.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通）、`U30–U32`、`U83`、`U88`（`LEDGER.md:88,97,112,117`：按单仓职责推进，不为无实质收益的事项跨席位返工或增设阻塞）。
  - `(D)` `SOR/AGENTS.md:60,123,125`（C2-2、派工承载文本不等于决策正文）、`DEC/D8-mvp-scope.md:296`（DIST-03）、`DEC/D13-contract-gaps.md:45,56`（D13-02）、`DEC/D16-phaseB-review-restore.md:33,37`（D16-09、D16-13）、`DEC/D28-seam-canary-central-identity-contract-follow.md:34`、`SORM/compose.yaml:9,33,47,57-58`、`SORM/compose/README.md:39,47`。

---

## 一、闸门 A 判定结论

- **是否越界：** **方向 `(c)`（处置 `ⓐ`）不越界（属 K1 既有决策 `D13-02` 与 `DIST-03` 的直接适用与澄清，不触及新产品意图或公开契约变更，免票放行处置 `ⓐ`，无需立 P0 表决）。**
- **放行处置（`ⓐ` / 方向 `(c)`）：**
  1. `W-07` 在 `#329`（`compose/README.md`，属 `W-07` 路径域 `F11`）中，将启动与重建之外的 6 条 `exec`、`stop` 命令（`F9`）改为按 `compose.yaml` 已声明的固定容器名（`pepgent-soroi-e2e-central`、`pepgent-soroi-e2e-mux`、`pepgent-soroi-e2e-store`）调用 `docker exec` / `docker stop`（与 `compose/README.md:39,47` 既有的 `docker attach` 写法一致，`F8`），不经 `compose.yaml` 插值，不触碰也不要求操作员提供中心身份两值。
  2. 协调席按初审材料第三节第 2 点修正自己编写的 `#329` 承载文本中“预期结果 2”与“验收 2”的文字；不新开 issue，不需要 `W-08` 进场。
  3. **排除方向 `(b)`（处置 `ⓒ`）与方向 `(a)`（处置 `ⓑ`）：** 方向 `(b)` 落盘 env 文件产生可被陈旧复用的第二注入源，违反 `D13-02`；方向 `(a)` 为不需要身份摘要的 `stop`/`exec` 召回 `W-08` 修改入口 CLI 属无谓返工。

---

## 二、对 `A-1` 至 `A-3` 的逐问回答

- **A-1：** **是，完全在 `D13-02` 之内，不触及任何公开契约或产品意图（K1）。**
  - `D13-02`（`DEC/D13-contract-gaps.md:45`）的核心契约是：`SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 由统一入口唯一计算并注入 `central` 容器，不设默认值、缓存或第二生产者。
  - 启动和重建统一走 `bun run --cwd e2e stack …`，而对已启动容器执行 `docker exec` / `docker stop` 直接按固定容器名操作，不读取 `compose.yaml`、不触发变量插值，既不需要操作员接触两值，又与 `compose/README.md:39,47` 现有按容器名 `docker attach` 的惯例完全一致。
- **A-2：** **是，仅是纠正承载 issue 文本对 `#327` 交付实现方式的错误假定，不改变 `D13-02` 或 `DIST-03` 的已决验收语义（K1）。**
  - `#329` 正文是协调席创建的承载文本（`F3`），其中“env 文件必须带有入口为当前 `central` 产生的那对值”并非来自 `D13-02` 或 `DIST-03`（`DEC/D8-mvp-scope.md:296`）的已表决决策正文，而是起草 `#329` 时未注意到 `#327`（`e2e/stack/stack.ts:89-91`，`F6`）仅在子进程内存中注入两值、不落盘 env 文件。按 `SOR/AGENTS.md:123,125`，修正承载文本中的这一错误假定不改变任何决策正文的验收语义。
- **A-3：** **是，方向 `(b)` 与 `D13-02`“唯一生产者与注入者”及 `#327`“不缓存”明确冲突。**
  - 初审材料第三节的反例完全成立：若将入口某次派生的两值写入磁盘 env 文件，当 `OMP_CONFIG_FILE` 或镜像变动后操作员直接用该文件执行 `docker compose --env-file … up`，容器将带着过期的身份摘要启动，破坏 `D13-02` 的唯一生产与注入权威以及 `.claude/rules/`“权威源头与生命周期”原则。
