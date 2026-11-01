# CUS-02 意图审查结论：`packages/omp-soroi/skills/soroi-eval/SKILL.md`（及 `README.md` `## Skills`）

- **审查人：** `argon`（用户意图守护者）
- **审查对象：**
  - `/Users/mouriya/Ext/worktrees/cus-02-soroi-eval/packages/omp-soroi/skills/soroi-eval/SKILL.md`
  - `/Users/mouriya/Ext/worktrees/cus-02-soroi-eval/packages/omp-soroi/README.md`（`## Skills` 节）
- **总体裁决：** **PASS**（全部 8 个小节及 `README.md` `## Skills` 均 PASS；0 处 CHANGE，0 处 VETO）。

---

## 一、逐节审查结论（依 D1-16 标注 `【定】` `(U)` 依据与 `【暂定】` 技术契约）

| 章节 | 裁决 | 意图与契约核对说明（附 `(U)` 原文出处） |
| --- | --- | --- |
| **Frontmatter & `README.md` `## Skills`** | **PASS** | `name: soroi-eval` 与一行 `description` 符合 omp 原生/扩展包 skill 发现契约（`o-skills.md`）；与 `soroi-main.md`、`soroi-worker.md` 分工清晰（agent 定义给规则，skill 给完整推演示例）。 |
| **1. `## The loop`** | **PASS** | **【定】** 每次只读系统提醒里的未消费 atom、只写一小步消费，不一次写完整流程（**(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/4986c617`）；先 `dry_run`（不写 store）再以同一段 `code` 调 `formal`（无 `pins`、不重写合并）（**(U)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/433e07ba, #32b6f7fd`、`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`）；所有 atom 消费或 `stop` 后运行结束（**(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/46e29915`）。<br>**【暂定】** 提醒行格式 `@env` 与 `formal` 保持相同 `env` 参数符合已通过的 D5-08、D5-10、D5-13。 |
| **2. `## Worked example`** | **PASS** | **【定】** Step 1 展示字面量 `2200` 先绑具名根 atom `temp_2200c`（禁魔法值，**(U)** `01a18ed5 #276d1776`）、多输出对象当场解构重命名并 `stop(log_2200c)`（**(U)** `01a18ed5 #98d47f20`、`01a18e8a #e0de24df`）、`dry_run` 通过后原样提交 `formal`（**(U)** `01a18e8a #433e07ba`）；Step 2 展示一步内平铺三条无依赖调用自然并发，每个产出唯一语义名（**(U)** `01a18ed5 #b7357c72, #13abc2a1`、`01a18e8a #4da22ab4`）。<br>**【暂定】** `pins` 以输出 atom 名为键（从而区分同一函数 `score_model` 的两次调用）符合 D5-09。 |
| **3. `## Pins`** | **PASS** | **【定】** 明确 `dry_run` 用外部输入替身挡住真实设备/昂贵调用而不侵入代码、正式运行绝不带 `pins`、业务常量直接写为代码中的根 atom 而非 `pin`（**(U)** `01a18e8a #48078e3a, #18d55f0a, #a7f465d2`）。<br>**【暂定】** 对象返回须全字段钉住（禁止部分 pin）及 `dry_run` 中 `human(...)` 必须钉住符合 D5-09、D5-11、D5-14。 |
| **4. `## Env: run one call elsewhere`** | **PASS** | **【定】** 满足调用简单、模板预先构建（如 `"slurm-a100"`）、可在 Slurm 上 `dry_run` 试跑算法、步代码内不出现魔法值或对象字面量（**(U)** `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`、`01a18e8a #6431b7aa, #071be582, #68d36f55`、`01a18ed5 #13abc2a1, #276d1776`）。<br>**【暂定】** 以输出 atom 名为键在 `env` 参数中指定模板及 `env_conflict` 检查符合 D4-19、D5-10。 |
| **5. `## Stop`** | **PASS** | **【定】** 明确每个 atom 必须被消费，不需要的解构字段和最终末端结果用 `stop(atom)` 终结消费链（**(U)** `01a18dd4 #46e29915, #d01f7a32`）。<br>**【暂定】** worker 不 `stop` 交办要求产出的结果 atom、留给上游汇总符合 D5-07、D5-12。 |
| **6. `## Parallel work by workers`** | **PASS** | **【定】** 彻底不含 `omomp` / `fork`（**(U) `LEDGER.md` U24**）；支持多路并发消费并在全部完成后带来源与目的交给下游比较汇总（**(U)** `01a18dd4 #2c08aa6d`、`01a18ed5 #440c8605, #ea638181`、`01a18e8a #e0de24df`）。<br>**【暂定】** 通过 `soroi_task` 派生 `soroi-worker` 并必填一句 `purpose`、整批 `soroi_return` 后释放符合 `eval-writers-ruling.md`、D5-07、D5-12。 |
| **7. `## Mistakes and fixes`** | **PASS** | **【定】** 10 组正反对照逐一覆盖弱模型最易犯的错误（魔法值、未解构对象、部分解构、正式运行带 pin、合并/改写正式代码、`for`/`map`/数组/对象、一次写整条流水线、无语义变量名），照顾弱模型（**(U)** `01a18dd4 #eaf23bd2`、`01a18ed5 #4986c617, #b7357c72, #13abc2a1, #276d1776, #98d47f20`、`01a18e8a #433e07ba, #a7f465d2`）。 |
| **8. `## Checker errors`** | **PASS** | **【暂定】** 全部错误码（`statement_form`、`unknown_atom`、`duplicate_name`、`unknown_node`、`type_error`、`destructure_mismatch`、`partial_pin`/`pin_kind`、`env_key`/`env_conflict`/`unknown_template`、`unpinned_human_in_dry_run`）与 D5-11 及 D5 §3.4 完全一致。 |

---

## 二、修改与否决项

- **CHANGE：** 0 处
- **VETO：** 0 处
