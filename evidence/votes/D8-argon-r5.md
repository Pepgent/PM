# D8 soroi MVP：验收定义与实现计划（第 5 轮：第 4 轮反例修订复核）— Argon 意图裁决与重投选票

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md`（对照 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-r1-responses.md`“第 4 轮”）
- **复核范围：** `D8-01`（含矩阵 `F06`、`F11`、`F15 ①`、`F17 ①`、`F22 ⑨`、`F23`）、`D8-09`（D3 补充条款定稿）、`D8-14`（含切片 `STO-02`、`STO-03`、`STO-04`、`SOR-02`、`SOR-03`、`SOR-08`、`SOR-12`、`SOR-20`、`MUX-03`、`WEB-03`、`REM-06`、`LAB-12`；其余 13 行未改动，维持赞成票）
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **计票汇总：**
  - **本轮重投行（D8-01、D8-09、D8-14）：3 赞成 / 0 反对 / 0 否决**
  - **全表累计（D8-01 至 D8-16）：16 赞成 / 0 反对 / 0 否决**

---

## 一、本轮重投行（D8-01、D8-09、D8-14）意图裁决与重投表

| ID | 本轮修订内容摘要 | 起草分类 | 缺失/补充? | Argon 意图裁决（附 `(U)` 依据） | Argon 重投票 | 裁决与投票理由 |
| --- | --- | --- | --- | --- | --- | --- |
| **D8-01** | 验收矩阵修订：<br>• `F06`：输入按 `RunGraph.edges[].to.input` 位置核对 atom 值，不直接读 capture 身份，组件改 `STO-02`；<br>• `F11`：以 stream `call_adopted`、来历 `Adopted` 及 `/compare?a=A&b=B` 中 `SameCapture` 判定按身份复用，不直接读 capture 身份；<br>• `F17 ①`：删除读 `/captures/{id}` 404，改为 A 在途期间运行 B 同一调用真实执行（`call_started`/`call_ended`，非 `call_adopted`）、都提交后 `/compare` 为 `SameCapture`；<br>• `F23`：以 `RunGraph` 状态 `Human` 加 stream 同位置 `call_aborted`、`human_handback` 判定替代，不再读未暴露的 `event.replaced`；<br>• `F22 ⑨`：新增 2-worker 小批次可证伪判据（先交回者 `stop` 使已提交未消费为空，断言最后一人交回前无 `run_ended`、仍提交进同一 `Open` 运行、批次释放后 `/end` 得 `Ended{seq}`）；<br>• `F15 ①`：注明 `t`、`position` 取自 `runs/<run>.json` 的 `RunRequest.output` | 意图 | 是：U23 | **【定 · 符合原意】**<br>依据 **(U) `LEDGER.md` U2、U23**，以及：<br>• `F06`：`01a18dd4 #003efe9e, #edbaf573, #ec8da5cc, #946fc403`；<br>• `F11`：`01a18e1f #64246eaf`、`01a18e8a #071be582`；<br>• `F17 ①`：`01a18e1f #bfd6975c`（认可 `#fecb24a3` 运行中未汇入不可供其他运行复用）；<br>• `F22 ⑨`：`01a18dd4 #46e29915`、`01a18e1f #63f31453`；<br>• `F23`：`01a18e1f #ba5ad307, #d1baf561`<br>（具体 `RunGraph.edges`、`/compare` `SameCapture` 字段归 `【暂定】` 技术契约） | **赞成** | 全部判据改为只依赖 D6 公开读取接口可观察的下游事实；特别是 `F17 ①` 通过并发运行 B 真实执行（非 `call_adopted`）且提交后 `/compare` 为 `SameCapture`，比原 404 探针更直接地验证了用户要求的“运行中尚未汇入中心副本的结果不可被其他运行复用”；`F22 ⑨` 通过先交回 worker 全部 `stop` 构造出可证伪的空未消费状态，严格检验批次屏障阻止提前 `/end`。 |
| **D8-09** | D3 补充条款定稿：操作员在终端直接启动的 TUI 根 `omp` 自己就是它的写方，不经 Mux；它没有代，环境无 `MUX_GENERATION`、`MUX_TOKEN`，不注册 `eval:<session>` 控制端点，持有的运行不经 Lab 介入；它启动的 soroi 子 agent 仍由插件作为写方经 `dial` 进入 Mux；`D2-08` 以本条款为修订，A0 探针根会话同样适用 | 技术 | 是 | **【定 · 符合原意】**<br>依据 **(U)** `01a18f4a #f488be08`、`01a18e1f #678fe41a, #2dbf970b`、`01a18e3a #09e1cc92` 与 **U23** | **赞成** | 明确定稿 TUI 直启根会话不注册 `eval:<session>` 控制端点（Lab 介入本来只针对 Lab 作为写方经 Mux 启动的会话），同时保持所有 soroi 子 agent 一律经写方 `dial` 进 Mux，彻底消除 `SOR-13` 实现歧义与 `D2-08`/`D3` 表述冲突。 |
| **D8-14** | 切片修订（仍为 108 个切片）：<br>• `STO-02`、`STO-04`、`SOR-02`：将 PM#5 第 1 项最小 transfer 闭环（`POST /transfers`、对象 PUT、提交转入、`DELETE`）并入 `VS1` 的 `STO-02` 与 `SOR-02`，`STO-04` 收窄为远程 volume tar 与 volume 读取；<br>• `SOR-03`、`SOR-08`、`SOR-12`：批次相关判据从 `VS1`/`W1` 移至 `W2` 的 `SOR-12`；<br>• `STO-03`、`WEB-03`：吸收 PM#5 第 2 项 `RunGraph` 的 `Aborted` 独立变体；<br>• `LAB-12`、`REM-06`、`SOR-20`：补齐显式依赖与排队中止验收归属 | 实现 | 否 | **【定 · 符合原意】**<br>依据 **(U) `LEDGER.md` U2、U11、U25、U26**（PM#5 最小 transfer 闭环与 `Aborted` 变体归 `【暂定】` 技术契约） | **赞成** | 修复了 `VS1` 缺少最小 `EvalTransfer` 闭环以及 `SOR-03`/`SOR-08` 验收跨波次依赖 `W2` 批次功能的问题，使 `VS1 → VS2 → W1 → W2` 每波次独立可验收。 |

---

## 二、一票否决审查

- **否决结论：0 项否决（无否决）。** 本轮全部修订均符合 `(U)` 用户原话意图，无任何擅自收缩或偏离，不行使一票否决权。
