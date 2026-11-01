# D8 soroi MVP：验收定义与实现计划（第 6 轮：第 5 轮 D6 读取接口全表对齐复核）— Argon 意图裁决与重投选票

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md`（对照 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-r1-responses.md`“第 5 轮”）
- **复核范围：** `D8-01`（含矩阵 `F06`、`F07 ③`、`F08`、`F11`、`F12 ②`、`F14`、`F15 ②`、`F22 ⑨`、`F24 ①②`）、`D8-14`（含切片 `STO-02`、`SOR-07`、`SOR-12`、`E2E-16`；其余 14 行未改动，维持赞成票）
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **计票汇总：**
  - **本轮重投行（D8-01、D8-14）：2 赞成 / 0 反对 / 0 否决**
  - **全表累计（D8-01 至 D8-16）：16 赞成 / 0 反对 / 0 否决**

---

## 一、本轮重投行（D8-01、D8-14）意图裁决与重投表

| ID | 本轮修订内容摘要 | 起草分类 | 缺失/补充? | Argon 意图裁决（附 `(U)` 依据） | Argon 重投票 | 裁决与投票理由 |
| --- | --- | --- | --- | --- | --- | --- |
| **D8-01** | 全表清理 D6 读取接口之外的内部字段，全部改用公开可读事实：<br>• `F14`、`F15 ②`：用 `RunGraph` 节点 `env: {kind:"remote", template, remoteRun}` 核对模板与远端 run id；“换镜像后不再复用”由 `SOR-07` 以真实执行及 `/compare` 非 `SameCapture` 验收；<br>• `F08`：以 `RunGraph` 状态 `Human`、`body:"Human"` 及 stream 有 `human_handback`、无 `call_aborted` 判定主动 `human()` 捕获（替代 `replaced` 为空）；<br>• `F11`：明确 `RunGraph` 中 `CallStatus` 为 `Adopted`；<br>• `F24 ①②`：直接观察 P 的 stream 有无 `run_aborted` 与 P 的 `graph.state`（`Aborted` vs `Ended`），以及 R' 的 `RunGraph` 状态 `Inherited{sourceRun = P, sourceStep, sourcePosition}`；<br>• `F07 ③`：不调交回工具时 `CallReport.outcome = "failed"`，步不提交、stream 最大 `seq` 不变、graph 无该调用节点；<br>• `F12 ②`：`film` 为 `File` 根 atom，`hash` 取 `Root.value.content` 查 `GET /values/{hash}/runs`；<br>• `F06`：写明 `/versions/{version}` 的 `bundle` 经 `/objects/{bundle}` 取回后 sha256 等于 `version`；<br>• `F22 ⑨`：写明最后一个 worker 也全部 `stop` | 意图 | 是：U23 | **【定 · 符合原意】**<br>依据 **(U) `LEDGER.md` U2、U23**，以及：<br>• `F06`：`01a18dd4 #003efe9e, #edbaf573, #ec8da5cc`；<br>• `F07 ③`：`01a18dd4 #49e6867a`、`01a18e1f #c1ef8567`；<br>• `F08`：`01a18e1f #d1baf561`；<br>• `F11`：`01a18e1f #64246eaf`、`01a18e8a #071be582`；<br>• `F12 ②`：`01a18e1f #d6cf9b35`；<br>• `F14`/`F15 ②`：`01a18e3a #c5030836, #09e1cc92`、`01a18e8a #8d913d2f, #68d36f55`；<br>• `F22 ⑨`：`01a18dd4 #46e29915`、`01a18e1f #63f31453`；<br>• `F24 ①②`：`01a18e1f #ba5ad307, #a0d22b8a`<br>（具体 D6 `RunGraph`/`RunEvent` 字段归 `【暂定】` 技术契约） | **赞成** | 彻底消除了测试脚本读取插件/store 内部未暴露字段（如 `CallOrigin`、`HumanEvent.replaced`、`CaptureRecord` 环境身份、`parentAborted`）的断层，同时完整保留甚至强化了每条用户流程的下游行为验证。 |
| **D8-14** | 切片修订（仍为 108 个切片）：<br>• `STO-02`：最小 transfer 闭环补入 `GET /transfers/{t}/objects/{sha256}`，验收写明 `DELETE` 前同一 URL 返回 200、后返回 404；<br>• `SOR-07`：验收写为换镜像 tag 后同输入再次正式运行，stream 为 `call_started`/`call_ended`（非 `call_adopted`）、graph 状态非 `Adopted`、`/compare` 非 `SameCapture`；<br>• `SOR-12`：依赖补上 `SOR-03`、`SOR-08`；<br>• `E2E-16`：依赖补上 `STO-07` | 实现 | 否 | **【定 · 符合原意】**<br>依据 **(U) `LEDGER.md` U2、U11、U25、U26** | **赞成** | `STO-02` 的 transfer 删除断言在同一 URL 上先 200 后 404，杜绝假阳性；`SOR-07` 用可观察的“不复用 + `/compare` 非 `SameCapture`”验证环境身份变化；DAG 依赖完整闭合。 |

---

## 二、一票否决审查

- **否决结论：0 项否决（无否决）。** 本轮全部修订均符合 `(U)` 用户原话意图，无擅自收缩或偏离，不行使一票否决权。

---

## D8-14 第 7 轮

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md` 中 `D8-14` 对应的 `STO-02`、`SOR-07`（及编辑性对齐的 `STO-08`），对照 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-r1-responses.md`“第 6 轮”
- **计票汇总：** **本轮重投（D8-14）：1 赞成 / 0 反对 / 0 否决**（全表 `D8-01`–`D8-16` 累计：16 赞成 / 0 反对 / 0 否决）

| ID | 第 7 轮修订内容摘要 | 起草分类 | 缺失/补充? | Argon 意图裁决（附 `(U)` 依据） | Argon 重投票 | 裁决与投票理由 |
| --- | --- | --- | --- | --- | --- | --- |
| **D8-14** | 采纳导师两条反例（切片数仍为 108，依赖不变）：<br>• `STO-02` 验收拆为两种情形：① 正式提交的 `EvalTransfer`：提交前 `GET /transfers/{t}/objects/{sha}` 返回 200，步提交后 `GET /objects/{sha}` 返回 200 且同一 transfer URL 返回 404（提交事务内转入对象目录并删除暂存区，D6-07）；② 另开一个从不提交的 transfer：显式 `DELETE` 之前同一 URL 返回 200，之后返回 404；<br>• `SOR-07` 验收：把模板换到一个已确认 digest 不同的镜像（或改动计入 `config` 身份的模板配置），先断言 `remote templates` 返回的 `identity` 前后不同，再断言第二次正式运行在 stream 中是 `call_started`/`call_ended`（非 `call_adopted`）、graph 状态非 `Adopted`、`/compare` 非 `SameCapture`；<br>• `STO-08`（编辑性）：写明 `File` 值的身份就是内容哈希，验收加上以 `Root.value.content` 查询 `/values/{hash}/runs` | 实现 | 否 | **【定 · 符合原意】**<br>依据 **(U) `LEDGER.md` U2、U11、U25、U26**，以及 `01a18e1f #64246eaf, #7ffcea0c`、`01a18e8a #071be582, #32b6f7fd` | **赞成** | `STO-02` 区分了正式提交事务自动清理暂存区与未提交显式 `DELETE` 清理暂存区两条主路径，与 `D6-07` 完全一致；`SOR-07` 先验证 `remote templates.identity` 实质变化再断言不复用，排除了仅改 tag 但镜像 digest 未变带来的歧义。 |

- **否决审查：** **0 项否决（无否决）。**
