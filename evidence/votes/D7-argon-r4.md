# D7 Pepgent Lab 业务后端决策表 — Argon 第 4 轮选票（D7-12、D7-13、D7-18 重投）

- **决策文档：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-lab-backend.md`（第 4 轮修订版）
- **反例回应表：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-r1-responses.md`（“第 4 轮”第 24 项）
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **重投范围：** 本轮按导师对 D8-16 的反例及 leader 裁决修订的 **3 个条目**：`D7-12`、`D7-13`、`D7-18`（其余 18 个条目维持第 1–3 轮赞成票）。
- **本轮计票结果：**
  - **3 条修订行：3 赞成 / 0 反对 / 0 否决**
  - **全表 21 行总计：21 赞成 / 0 反对 / 0 否决**

---

## 一、本轮 3 条修订行的意图裁决与一票否决审查（依 D1-16 严格区分 `【定】` 与 `【暂定】`）

- **意图面裁决：`【定 · 符合用户原意（P5 只读部分进第一版是走通 F17 与 F31 第 4 步的必需条件，严守 U2 与 U23；P5 控制部分及 P4/P6/P7 列入 D9 符合 U1 与 U23）】` + `【暂定 · 支持只读 remote runs 与 SSE /api/lab/jobs/{run}/tail 接口设计】`**
- **依据 `(U)` 原文：**
  1. **(U) `LEDGER.md` U2**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`，2026-11-01 07:18:38）：
     > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
  2. **(U) `LEDGER.md` U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
  3. **(U) `LEDGER.md` U1**（`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`，2026-11-01 07:14:14）：
     > “对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
  4. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`、`#e3692177`（2026-10-31 03:54–04:03）：
     > 保留 AI4S 原型业务层（含算力页实时观察远程作业状态与容器 stdout 尾部，对应 `flow-catalog.md` F17 与 F31 第 4 步）。
  5. **(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`、`#09e1cc92`、`#3afc3fb6`（2026-10-31）与 `session://01a18efe-a680-7642-aff1-6f468cf2935e/entry/9e2d37a1`：
     > `remote` 是独立程序，容器与临时 volume 随单次 `eval` 调用自动创建、拷回后即删，无重放。
- **裁决说明：**
  1. **【定】** 在 `flow-catalog.md` 的 F17 与 F31 第 4 步中，远程运行的既包括连入 Mux 的 `Agent` 节点，也包括不连入 Mux 的远程 `Program` 节点，且算力页（`Sandbox Clusters`）需要在实验运行期间展示正在运行的远程作业状态与容器 stdout 尾部。若把 P5 的“只读列出作业”也一并推迟，算力页将无法列出远程 `Program` 作业并对它们调用 `remote status` / `remote tail`，从而导致 F17 与 F31 第 4 步无法完整走通（违反 **U2**“不要擅自收缩”与 **U23**“走通我说的所有流程”）。因此，把 P5 拆分为**只读部分（进第一版）**与**控制部分（`restart`、`destroy`、`new_sandbox`，仍留 D9）**，既 100% 闭合了 F17 与 F31 第 4 步的用户流程，又不给 `remote` 增加超出 D2-09 边界的集群控制面，且严守 `remote` 作为作业唯一权威源（Lab 不自建第二份作业表）。
  2. **【暂定】** 由 `Pepgent/remote` 新增只读 `remote runs`（直接读取其既有的 `runs/<run>.json` 记录摘要），Lab 在 `clusters` 页与 `containers` 页 `liveContainers` 中读取并结合 `remote status <run>`，经只读 SSE `GET /api/lab/jobs/{run}/tail` 推送 `remote tail <run>`；`LabCommand` 仍不暴露无执行方的控制命令。
- **一票否决审查：** **0 项否决（无否决）。**

---

## 二、3 条修订行逐条选票表

| ID | what | 起草分类 | 缺失/补充? | Argon 意图判定 | 第 4 轮投票 | 裁决与投票理由（核对第 4 轮修订与 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- |
| **D7-12** | 集群页与接入向导落到 `remote`（P5 只读部分进第一版，控制部分与 P4/P6/P7 列入 D9） | 串联 | 是 | **【定 · 符合原意】** 落实 **(U)** U1、U2、U23、`01a18e1f #e3692177`、`01a18e3a #09e1cc92, #3afc3fb6`（闭合 F17 与 F31 第 4 步）；【暂定】`remote runs` 只读摘要 | **赞成** | 由 `Pepgent/remote` 提供只读 `remote runs` 列出自身 `runs/<run>.json` 作业记录摘要，配合 `remote status <run>`、`remote tail <run>` 与 Mux 在线列表，使算力页能完整展示远程 `Program` 与 `Agent` 作业状态及日志尾部，同时保持 `remote` 为唯一作业权威（Lab 不建作业表）；`restart`、`destroy`、`new_sandbox` 等控制部分与 P4、P6、P7 仍列入 D9。 |
| **D7-13** | 容器（镜像）页落到 `Pepgent/images`、Komodo Build 与 `remote` 模板 | 串联 | 是 | 【定】容器模板提前构建、复用成熟方案（**(U)** `01a18e3a #c5030836`、U13、`01a18e1f #e3692177`）；【暂定】`liveContainers` 取自 `remote runs` | **赞成** | 容器页 `liveContainers` 直接从 `remote runs` 与 `remote status` 读取正在使用该镜像模板运行的作业（与 D7-12 同源），不再留空；预构建检查与终端（P6）仍列入 D9。 |
| **D7-18** | Lab 后端的对外接口（补入只读 SSE `/api/lab/jobs/{run}/tail`） | 技术 | 否 | 【定】闭合 F17 与 F31 第 4 步算力页日志尾部观察（**(U)** U2、U23、`01a18e1f #e3692177`）；【暂定】SSE 路由与 `LabCommand` 边界 | **赞成** | `lab.page.read` 的 `clusters` 线数据带 `jobs`（`remote runs` + `remote status`），新增只读 SSE `GET /api/lab/jobs/{run}/tail` 转发 `remote tail <run>`，频道 `compute` 在作业变化时通知重读；P4、P5 控制部分、P6、P7 仍不进入 `LabCommand` 联合。 |
