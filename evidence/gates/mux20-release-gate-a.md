# 闸门 A 裁决：omp-rpc-mux#20 BLOCKED（无仓内改动的 registry 重发结案方式与验收边界）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/omp-rpc-mux#20](https://github.com/Pepgent/omp-rpc-mux/issues/20)（[评论 6562794532](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562794532)、[6562805022](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562805022)），`PM/evidence/gates/mux20-release.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通）、`U30–U32`、`U83`、`U88`（`LEDGER.md:88,97,112,117`：开发期不设跨组件 live 测试锁、不要求小切片单独搭跨组件 runtime 仪式、不以上游结案仪式阻塞下游开工）。
  - `(D)` `RULE/git.rule.md:29-32,44-53`（`no-code` 事项回 issue，工作区分支规则针对有 Git 改动的情形）、`SOR/AGENTS.md:45,60,125,128`（C1-3、C2-2、C2-4）、`MUX/AGENTS.md:17-19`、`DEC/D8-mvp-scope.md:224,241`（IMG-01、MUX-08）、`DEC/D10-repo-delivery.md:15,18`（D10-03、D10-06）、`DEC/D16-phaseB-review-restore.md:37`（D16-13）、`DEC/D32-pepgent-24-trusted-reader.md:20`（D32-01 v3）。

---

## 一、闸门 A 判定结论

- **是否越界：** **不越界（属 K1 既有决策 `MUX-08`、`D10-03`、`D16-13`、`C1-3` 与全局 `git.rule.md:32` 的直接适用与澄清，不触及新产品意图或公开契约变更，免票放行处置 `ⓐ`，无需立 P0 表决）。**
- **放行处置（`ⓐ`）：**
  1. **Q1（结案方式）：** `#20` 是无仓内 Git 改动的构建产物重发（`no-code`），不开空 PR，也不为凑 PR 修改范围外文件；由 `W-01` 在 `#20` 写 `DONE` 评论（记录构建源 commit `140624344b3e`、双架构 index digest `sha256:98a5a1b216b45a4166348dbc3409e33c6fabb42debea51ff589f63bc1901f837` 及验收 1–4 证据）并直接关闭 `#20`。
  2. **Q2（验收边界）：** `#20` 的验收 1–4 已完整满足 `MUX-08`（`DEC/D8-mvp-scope.md:241`：“镜像在本地仓库；`omp-rpc-mux serve` 容器可以访问”）与 `#20` 验收标准；不在 scratch 镜像外另搭 `omp` + `dial` + `serve` 跨组件 RPC 环境，跨组件运行验证按 `D16-13` 与 `D32-01 v3` 留在阶段 C（`F25`）。
  3. **下游 `images#13` 开工：** `pepgent/omp-rpc-mux:latest` 新产物已在 registry 就绪并通过受信 reader 参数与启动核验（`F1`、`F2`），`images#13` 的产物依赖已满足，无需等待 `#20` 结案动作即可开工。

---

## 二、对 `A-1` 至 `A-3` 的逐问回答

- **A-1：** **是澄清（K1），不是给机主规则开例外，不触及产品意图或公开契约。**
  - 机主全局规则 `RULE/git.rule.md:32` 明文规定：“**Issue 主题争议、blocked/skipped/no-code 或 PR 明确作废时回 issue**”，已将 `no-code`（无仓内代码/文件改动）事项的归宿明确规定为回到 issue 本身处理；同文件 `:44-53`“对于工作区”一节规范的是产生工作区 Git 改动时的分支与合并路径。
  - `MUX/AGENTS.md:17,19` 同样将 PR 绑定于“每项改动”，并規定“实现状态、验证结果和阻塞写在 issue 或 PR 评论中”。`#20` 按 `D10-03` 只刷新 registry 镜像产物并记录身份（`F3`、`F10`），本仓 Git tree 零改动；若为凑 PR 而强行改动仓内文件反而违反范围边界与最小改动原则。因此以 issue `DONE` 评论结案是对 `git.rule.md:32` 与 `D10-03` 的严格执行，绝非破例。
- **A-2：** **是，已完整覆盖，不改变任何已决验收语义（K1）。**
  - 受信 reader 的 `serve`/`dial` 代码改动已在实现 PR（`89d7ba1`，`PR#10`）中合入，之后 `main` 仅有 README 文字修订（`PR#21` `9829496`，`F11`），`#20` 无任何新代码路径。
  - 本次发布对应 `MUX-08`（`DEC/D8-mvp-scope.md:241`），其已表决验收为“镜像在本地仓库；`omp-rpc-mux serve` 容器可以访问”。`W-01` 在评论 `6562805022` 完成的验收 1–4（双架构 manifest、双架构 `serve --help` 含 `--trusted-reader-token` / `MUX_TRUSTED_READER_TOKEN`、注入双凭据启动 `serve` 正常监听 `:8080`、记录 commit 与 digest）已从容器真实消费入口完整覆盖 `MUX-08` 与 `#20` 验收标准。按 `(U) U30–U32`、`U83` 与 `C1-3`（`SOR/AGENTS.md:45,128`）、`D16-13`，严禁在阶段 B 为产物刷新切片额外加设跨组件 `omp` RPC 验收锁。
- **A-3：** **完全一致（K1）。**
  - `IMG-01` 对 `MUX-08` 的依赖（`DEC/D8-mvp-scope.md:224`）以及 `images#13` 的依赖声明（`F13`）针对的是 `pepgent-registry.orb.local:5000/pepgent/omp-rpc-mux:latest` 镜像产物本身已更新并支持受信 reader。该事实已由 `F1`（`R`）与 `F2` 证实；按 `C1-3`（`SOR/AGENTS.md:45,128`）与 `(U) U83`、`U88`，不以上游 issue 的结案手续作为下游 `images#13` 的开工锁。
