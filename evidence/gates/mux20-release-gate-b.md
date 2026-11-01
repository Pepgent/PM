# 闸门 B 裁决：`omp-rpc-mux#20` `BLOCKED` 无仓内改动的 registry 重发结案与验收边界（`mux20-release-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/mux20-release.md`
- **关联议题：** [Pepgent/omp-rpc-mux#20](https://github.com/Pepgent/omp-rpc-mux/issues/20)（评论 [`#issuecomment-6562794532`](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562794532)、[`#issuecomment-6562805022`](https://github.com/Pepgent/omp-rpc-mux/issues/20#issuecomment-6562805022)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **判定时间：** `2026-11-01T19:39Z`

---

## 一、总局判定结论

1. **闸门 B（组织、席位路径白名单、阶段门禁与投票程序边界）判定：** **【不越界（K1）】**。
2. **处置去向（正交双闸门前置约束，`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：**
   - 仅当已落盘的 `Argon` 闸门 A（`mux20-release-gate-a.md`）与本闸门 B **双双确认不越界**时，方可按初审处置 **ⓐ** 免投票放行（`Q1` 不开空/凑数 PR，以 `#20` issue `DONE` 评论附验收输出与镜像 digest 关闭；`Q2` 不另加跨组件真实 omp RPC 验收仪式，以 `#20` 验收 1–4 结案；`images#13` 依赖已满足，由 `Main` 按 `D16-10` 轮换 `W-01` 并补入 `W-03`）。
   - 若闸门 A 认定任一项触及产品原始意图或已决验收语义（越界），则严禁免票放行，必须立即按 `P0` 经议会 daemon 立案表决。

---

## 二、对第五节 `B-1` ～ `B-3` 的逐项判定

### 1. `B-1`（席位白名单、`D16-13` 阶段边界与 `C2-4` 机主规则适用边界）：**不越界，无需立案表决**

- **`D16-09` 席位边界与 `C2-4` / `git.rule.md` 适用对象：**
  - `omp-rpc-mux#20` 是 `deploy#24` 双闸门按 `D10-03` 放行后派给 `W-01`（`pepgent-omp-rpc-mux`）的纯构建产物重发任务（基于已合入 `origin/main` 的 `140624344b3e` 重新构建并推送双架构镜像 `pepgent/omp-rpc-mux:latest`，无任何仓内源码或文档改动）。
  - 机主全局规则 `git.rule.md` 在“GitHub issue / PR routing rule”中明文规定：“`Issue 主题争议、blocked/skipped/no-code 或 PR 明确作废时回 issue`”，而“工作区”一节的分支/PR 规定针对的是产生 Git 改动的任务。`#20` 属于无 Git tree diff 的 `no-code` 制品重发议题，在 `#20` 评论登记并以 `DONE` 关闭是直接执行 `git.rule.md` 的 `no-code 回 issue` 条款与 `MUX/AGENTS.md:19`，绝非给机主规则开例外；反之，为凑 PR 而强行修改 `#20` 范围外的仓内文件才违反范围边界与反设卡原则（`U88`）。
- **`D16-13`、`C1-3` 阶段门禁与 `AGENTS.md:126` 状态观察边界：**
  - `AGENTS.md` C1-3（`U30`、`U32`、`U83`、`U88`）与 `D16-13` 明确规定开发期只做本仓检查，严禁为无代码改动的制品刷新切片额外部署跨组件 `serve + dial + 真实 omp RPC` 验收仪式（该跨组件组装留给阶段 C 统一验收 `D10-06`/`D16-13`）。
  - 严格区分证据来源（`AGENTS.md:126`“状态只记拥有方的观察”）：`F1`（双架构 manifest index 与 `sha256:98a5a1b216b45a4166348dbc3409e33c6fabb42debea51ff589f63bc1901f837`）已由 `DeskMux20Blocked` 复跑 `curl` 观察 `(R)`，而 `F2`（评论 `6562805022` 中的双平台 `serve --help` 与容器启动日志）目前属工人自报 `(A)`，在本文件及台账中仅标为工人自报（未由管理层独立复跑验收），由 `AreaMgrMux` 在送达/巡查 `#20` 闭环时按职责核对，不把 `(A)` 直接升格为管理层已验证状态。

### 2. `B-2`（`images#13` 在 `#20` 结案前开工是否符合 `D16-10` 与 `C1-3`）：**完全符合**

- **依据：** `images#13` 的前置镜像引用与双架构 index（`F1`）已由 `(R)` 在 registry 观察到，且 `AGENTS.md` C1-3 明确禁止把上游切片的结案评论仪式或跨组件验收设为下游开工锁，故 `images#13` 可按 `D16-10` 安排开工（不等于将 `#20` 的 `(A)` 自报直接标为管理层已验证）。

### 3. `B-3`（在结论中写明 `#20` 结案后 `W-01` 按 `D16-10` 退役/轮换）：**应当写明**

- **依据：** `#19` 已由 `PR#21` 合入 `main`，`#20` 写完 `DONE` 评论并关闭后，`W-01`（`pepgent-omp-rpc-mux`）在本轮已无剩余开放切片。为遵守 `D16-10` 同时活跃 `tern` 席位上限（4 席）并及时滚动补入 `W-03`（`pepgent-images` 执行 `images#13`），应在结论中明确：待 `AreaMgrMux` 送达并确认 `W-01` 完成 `#20` `DONE` 闭环后，由 `Main` 按 `D16-10` 正常退役/轮换 `W-01` 席位、释放活跃名额安排 `W-03` 进场。
