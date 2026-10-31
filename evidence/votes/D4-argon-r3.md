# D4 远程执行的闭合契约 — Argon 第 3 轮选票（D4-argon-r3）

- **议题：** D4 远程执行的闭合契约：远程 Program、远程 Agent、运行环境模板（`pepgent-pm/evidence/decisions/D4-remote-exec.md`，第 3 轮修订稿）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **重投范围：** 第 2 轮后修改及同步的 9 个条目（`D4-02`、`05`、`07`、`09`、`13`、`14`、`15`、`18`、`21`）；其余 13 个条目维持第 1/2 轮**赞成**。
- **第 3 轮计票结果：**
  - **重投 9 条：9 赞成 / 0 反对**。
  - **全表 22 条总计：22 赞成 / 0 反对 / 0 否决。**

---

## 一、意图裁决复核（Argon 权限 1）

- **`D4-09`（分类：意图 + 技术）：【定 · 符合用户原意】**
  - soroi 定制 tar 由部署 init 作为 release 事实提交进 store（D6-22）并经 `GET /objects/{hash}` 拷入，Lab 库 `.omp/` tar 经暂存区 `GET /transfers/{t}/objects/{hash}` 拷入，保证远程 `Agent` 用户级与 project 级定制与中心主 agent 逐字节一致，隔离宿主 `~/.omp` 与 `omomp`，不考虑两侧 omp 二进制版本一致（`(U)` `01a18e1f #9c291fe2`、`01a18f4a #f488be08`、U23、U24）。
- **`D4-21`（分类：意图）：【定 · 符合用户原意】**
  - `dry run` 远程调用真实执行未 pin 部分，共用一步一个 `EvalTransfer`，该步全部结果取回后删除暂存区，批次不汇入、捕获不写、对象存储不写（`(U)` `01a18e8a #68d36f55, #32b6f7fd`、`01a18e1f #7ffcea0c`）。

---

## 二、第 3 轮逐条重投（9 条修改项）

| ID | 起草分类 | 补 | Argon 第 3 轮投票 | 理由（附 `(U)` 与跨表核对） |
| --- | --- | --- | --- | --- |
| **D4-02** | 串联 | 补 | **赞成** | 未正式提交过的 bundle（含首次正式运行提交前与 `dry run`）及源码清单一律先放 `PUT /transfers/{t}/objects/{hash}`，正式步提交同一事务内由 store 原子转入 `/objects`，消除提交前写 `/objects` 产生孤儿对象的可能，严守 `(U)` `01a18e1f #7ffcea0c` 与 D6-07、D6-21。 |
| **D4-05** | 串联 | 缺 | **赞成** | 每次 `soroi_eval` 调用建一个 `EvalTransfer` `t`，该步内各远程调用按 `PUT /transfers/{t}/volumes/{position}` 分开拷出；发行物（定制 tar、boot、runner）由部署 init 提交（D6-22）走 `/objects/{hash}`，其余未提交字节走 `/transfers/{t}/objects/{hash}`，与 D6-07 完全闭合。 |
| **D4-07** | 串联 | 缺 | **赞成** | 拷出与读取路径统一带调用位置 `volumes/{position}`，正式运行在步提交事务内将 `t` 中被引用的对象与各 `position` 的 volume 文件一并转正后删 `t`，`dry run` 在该步全部结果取回后 `DELETE /transfers/{t}`，生命周期边界清晰。 |
| **D4-09** | 意图 + 技术 | 缺 | **赞成** | **【意图确认 · 定】** 明确 soroi 定制 tar 走 release 对象 `/objects/{hash}`、Lab 库 `.omp/` tar 走暂存区 `/transfers/{t}/objects/{hash}`，符合 `(U)` `01a18e1f #9c291fe2`、U23、U24 与 D6-22。 |
| **D4-13** | 技术 | 缺 | **赞成** | 暂存区按来历建模为 `EvalTransfer { evalCall }`（拷出到 `volumes/{position}`）与 `AgentGenerationTransfer { agent, generation }`（拷出到 `volumes/{generation}`）两种 ADT 变体，与 D6-07 同步，各自的创建者与删除锚点完全确定。 |
| **D4-14** | 串联 | 缺 | **赞成** | 同步更新为从 `GET /transfers/{t}/volumes/{position}/files/{path}` 读取 `work/` 下交回路径并执行 `toOutputs`，与 D4-05/07 对齐。 |
| **D4-15** | 技术 | 补 | **赞成** | 同步更新为正式步提交同一事务内从暂存区 `t` 的 `volumes/{position}` 执行 `read_parquet` 汇入批次，与 D4-05/07 及 D6-07 对齐。 |
| **D4-18** | 技术 | 补 | **赞成** | 明确模板 `config` 哈希排除部署注入的凭据变量与单次运行注入变量，并为 `Agent` 体捕获身份加上定制身份（soroi release 哈希 + Lab 库 `.omp/` tar 哈希），保证改 agent 定义/技能/规则后不误复用旧捕获（BS:128）。 |
| **D4-21** | 意图 | — | **赞成** | **【意图确认 · 定】** 同步为“这一步所有结果取回后删除暂存区”，完全符合 `(U)` `01a18e8a #68d36f55, #32b6f7fd` 与 `01a18e1f #7ffcea0c`。 |

---

## 三、一票否决（Argon 权限 2）

- **0 条（无否决）。**
