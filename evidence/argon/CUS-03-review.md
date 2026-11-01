# CUS-03 意图审查结论：`packages/omp-soroi/rules/*.md`（及 `README.md` `## Rules`、`package.json`）

- **审查人：** `argon`（用户意图守护者）
- **审查对象（工作树 `/Users/mouriya/Ext/worktrees/cus-03-rules`）：**
  1. `packages/omp-soroi/rules/soroi-three-statements.md`
  2. `packages/omp-soroi/rules/soroi-no-magic-values.md`
  3. `packages/omp-soroi/rules/soroi-exhaustive-destructure.md`
  4. `packages/omp-soroi/rules/soroi-consume-every-atom.md`
  5. `packages/omp-soroi/rules/soroi-formal-unchanged.md`
  6. `packages/omp-soroi/README.md`（第 13 行安装说明及第 53–64 行 `## Rules` 节）与 `packages/omp-soroi/package.json`（`files` 包含 `"rules"`）
- **总体裁决：** 全部 **PASS**（0 处 CHANGE，0 处 VETO）。

---

## 一、逐文件意图审查表（依 D1-16 标注 `【定】` `(U)` 依据与 `【暂定】` 技术契约）

| 文件 | 裁决 | 意图与契约核对说明（附 `(U)` 原文出处） |
| --- | --- | --- |
| `rules/soroi-three-statements.md` | **PASS** | **【定】** 严格限定一步只允许根 atom 字面量、节点调用、以及 `stop` 三种语句；明确禁止 `let`、`if`、`for`、`while`、`map`、`return`、函数、对象或数组字面量、算术表达式与类型注解；多路处理在一步内平铺写多条调用并发执行，多轮迭代靠下一步消费推进（`draft_1` → `draft_2`）（**(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/13abc2a1, #b7357c72`、`session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/e0de24df`）。<br>**【暂定】** 违反时报 `statement_form` 与 D5-11 / D5 §3.4 完全对齐。 |
| `rules/soroi-no-magic-values.md` | **PASS** | **【定】** 严格规定调用参数只能写 atom 名字，绝不允许在调用括号内写字面量（如 `2200`、`"svm"`）或嵌套调用，必须先定义为具名根 atom（如 `const temp_2200c = 2200`）再传名，且变量名须反映其业务含义而非 `x`/`arg1`，照顾弱模型（**(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/276d1776, #13abc2a1`）。<br>**【暂定】** 违反时报 `statement_form` 与 D5-11 完全对齐。 |
| `rules/soroi-exhaustive-destructure.md` | **PASS** | **【定】** 落实“固定 atom 不允许嵌套成 object/array，接受返回值是对象时展开”与“TS 多返回值必须返回对象、生成的结构从一开始就不能同名”（**(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/440c8605, #98d47f20, #b7357c72`）。<br>**【暂定】** 强制当场穷尽解构每个字段并以 `field: new_name` 重命名（禁止简写 `{ curve, log }`、禁止整体绑定到单个变量、单值返回不解构、无用字段解构后 `stop`）及对应检查错误 `destructure_mismatch` / `statement_form` 符合 `(A) 01a18ed5 #aec42802` + `(U) 01a18e8a #e0de24df` 及 D5-11。 |
| `rules/soroi-consume-every-atom.md` | **PASS** | **【定】** 严格落实“每个 atom 必须被消费，消费只有两种可能：在已正式运行的一步中作为参数传给节点调用，或 `stop(atom)`；`dry_run` 不写 store 也不消费任何 atom；所有末端 atom 均被消费前运行不能结束”（**(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/46e29915, #d01f7a32`、`session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/32b6f7fd`、`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`），且如实说明未消费 atom 不由检查器报错而是保留在提醒中。<br>**【暂定】** worker 保留交办要求产出的结果 atom 供上游消费符合 `eval-writers-ruling.md`、D5-07、D5-12。 |
| `rules/soroi-formal-unchanged.md` | **PASS** | **【定】** 严格落实“先 `dry_run`（不写 store，可用 `pins` 挡住昂贵或有副作用调用），通过后以一字不差的同一段 `code` 提交 `formal`（无 `pins`，严禁合并多步、改写、重排或增删语句）；同时不搞‘锁定上一次的 eval’（因此如实写明检查器不比较上次 dry run，改写后的代码会被当成未经测试的新代码直接运行）”（**(U)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/433e07ba, #48078e3a, #a7f465d2, #8854f464, #32b6f7fd`、`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`）。<br>**【暂定】** `formal` 保持相同 `env` 且由参数 schema 拒绝 `pins` 符合 D5-08、D5-10。 |
| `README.md`（`## Rules` 与安装说明）及 `package.json` | **PASS** | **【定】** 满足 **U23**（完整的独立 omp 定制包，包含 `rules/`）与 **U24**（零 `omomp` / `fork` 依赖）；**【暂定 / 技术】** 五条规则均设 `alwaysApply: true` 且不加 `agents` 过滤，确保弱模型无需按需读取即可在每个 soroi 会话系统提示中获得完整语法与消费纪律。 |

---

## 二、修改与否决项

- **CHANGE：** 0 处
- **VETO：** 0 处
