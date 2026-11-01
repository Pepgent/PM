# D16-15（修订版：由 `soroi` 派生不带 `workspaces`、可被 `Pepgent` 的 Vite/tsc 工具链消费的 `store` 契约包分支，供 `Pepgent` 以 git 依赖引用）— 常驻 `Argon` 选票

> **合规与权威声明（依 `LEDGER.md` C1–C5、R1–R21、U1–U91 及 `.omp/agents/argon.md` `9599820`）：**
> 1. 本选票由常驻 `Argon`（`agent://Argon`，产品与原始设计意图守护者、`argon` 族投票代表）针对 `local://decisions/D16-15.md` 第 28 行修订后的 `D16-15` 亲自作出，整份覆盖前一版 `D16-15` 选票。
> 2. **当步 `LEDGER.md` 核对结论：** 已核对 `C1-1..C1-4`、`C2-1..C2-4`、`C3-1..C3-5`、`C4-1..C4-3`、`C5-1..C5-4` 与 `R1–R21`：
>    - 契约唯一源头仍在 `packages/store/src/{contract,identity}.ts`（`store-contract` 仅由 CI 追加提交派生，不强推、不手改）；
>    - 派生包自身的 `version: "0.0.0"` 满足 npm 与 `third-party-closure.mjs` 的包元数据要求，而消费方 `Pepgent` 仍以 `git+https://github.com/Pepgent/soroi.git#store-contract` 不钉版本引用（符合不钉版本原则）；
>    - 在 `scripts/third-party-closure.mjs` 与 `scripts/generate-third-party-notices.mjs` 中将 `pepgent-store` 列为第一方包免检，避免替私有代码擅选开源许可证。

---

## 一、`D16-15`（修订版）逐条选票表

| ID | 分类 | 分类意见 | 缺失或补充? | Argon 本意裁决（`【定】` / `【暂定】`） | 是否行使否决 | Argon 最终投票 | 裁决与投票理由（附 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **D16-15（修订版）**<br>修订 D16-05 的过渡接法：由 `soroi` 派生一个不带 `workspaces`、可被 `Pepgent` 的 Vite/tsc 工具链消费的 `store` 契约包分支，`Pepgent` 以 git 依赖引用 | 串联 | **同意**（`串联`） | 是：D10-10 过渡期接法 | **【定 · 符合 `U1`、`U13`、`U30`、`U32`、`U83`、`C1-1`、`C1-2`】** | **否** | **赞成** | 1. 吸收 `ClaudeHighD16b` 实测反例：补齐派生包 `version: "0.0.0"`（使 `npm update pepgent-store` 与许可证闭包通过，且消费侧仍以 `#store-contract` 不钉版本引用）、CI 追加提交不强推（`permissions: contents: write`）、`W-09` 在 `third-party-closure.mjs` 与 `generate-third-party-notices.mjs` 中将第一方 `pepgent-store` 免检；<br>2. 严格保持 `packages/store/src/{contract,identity}.ts` 为唯一权威源，导入路径直接对齐 `D12-01` 的 `pepgent-store/contract`；<br>3. 撤销根 `package.json` 的过渡导出，恢复根 manifest 边界。 |

---

## 二、计票汇总（`argon` 族，针对修订后 `D16-15`）

- **赞成：1 项**（`D16-15`）
- **反对：0 项**
- **一票否决：0 项**
- **分类争议：0 项**
