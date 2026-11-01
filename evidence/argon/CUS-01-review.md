# CUS-01 意图审查结论：`soroi-main.md`、`soroi-worker.md`、`soroi-body.md`

- **审查人：** `argon`（用户意图守护者）
- **审查对象：** `/Users/mouriya/Ext/worktrees/cus-01-agent-defs/packages/omp-soroi/agents/{soroi-main,soroi-worker,soroi-body}.md`
- **总体裁决：** 三个文件全部 **PASS**（0 处 CHANGE，0 处 VETO）。

---

## 一、逐文件裁决

| 文件 | 裁决 | 意图核对结论 |
| --- | --- | --- |
| `packages/omp-soroi/agents/soroi-main.md` | **PASS** | 完整覆盖未消费 atom 提醒驱动的逐步 `soroi_eval` 消费、三语句语法与穷尽解构、禁止魔法值/loop/map/object/array、名字唯一且具语义、`dry_run`（含 `pins`）后原样提交 `formal`（无合并改写）、单步内独立调用并发与 `soroi_task` 派出 `soroi-worker` 中心批次并发（含 `purpose` 与整批 `soroi_return` 后释放）、`soroi_eval` 仅在中心主机运行且 `Agent` 体永不运行 `eval`、远程 `Agent` 单层限制、无任何 `omomp`/`fork` 概念、不硬编码 `model:`。 |
| `packages/omp-soroi/agents/soroi-worker.md` | **PASS** | 完整符合 `eval-writers-ruling.md`（及 D2-02/03/05、D5-06/07/12/13/14/19）：由 `soroi_task` 派出的中心 worker 在中心主机同一运行内按分配的 atom 逐步写 `soroi_eval`（遵守同样的三语句、无魔法值、穷尽解构、`dry_run → formal` 原样提交规则），停掉内部死胡同 atom、保留结果 atom 待整批释放，完成后仅通过唯一结果通道 `soroi_return` 交回摘要，可继续用 `soroi_task`（带 `purpose`）细分中心 worker，严守中心 `eval` 与单层远程边界，无 `omomp`/`fork`，不硬编码 `model:`。 |
| `packages/omp-soroi/agents/soroi-body.md` | **PASS** | 完整符合 `agent(...)` 节点函数体契约：输入文件按路径读取，输出文件落盘后按路径经唯一结果通道 `soroi_return` 交回（严格匹配 schema 字段，明确声明最后一条消息或 `yield` 不是结果、未调 `soroi_return` 即失败），明确无 `soroi_eval` 且永不运行 `eval`，在远程环境运行时严禁再开远程 agent（单层远程），无 `omomp`/`fork`，指令简短清晰照顾弱模型，不硬编码 `model:`。 |

---

## 二、十项意图检查点逐项核对（附 `(U)` 依据）

1. **逐步消费提醒中的 atom（PASS）：**
   - `soroi-main.md:8-11`、`soroi-worker.md:8-10,13` 明确以系统提醒中的未消费 atom 为唯一待办，每轮只写一步消费，不一次规划整条流程。
   - 依据：**(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/4986c617`、`session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/46e29915`。
2. **三语句、无魔法值、穷尽解构、名字唯一（PASS）：**
   - `soroi-main.md:13-24`、`soroi-worker.md:14-20` 明确限定根 atom 字面量、节点调用（对象返回当场穷尽解构并重命名、不用的字段 `stop`）、`stop` 三种语句；参数只准写 atom 名（以 `2200` → `const temp_2200c = 2200` 为例禁绝魔法值），禁 `loop`/`map`/`object`/`array`，名字在运行内唯一且带语义。
   - 依据：**(U)** `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/13abc2a1, #276d1776, #b7357c72, #98d47f20`、`session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/e0de24df`。
3. **dry run 后原样正式提交（PASS）：**
   - `soroi-main.md:26-31`、`soroi-worker.md:22-25` 明确先 `mode: "dry_run"`（真实运行但不写 store，可用 `pins` 挡住昂贵设备/agent），通过后用**同一段代码**调 `mode: "formal"`（无 `pins`、不合并多步、不重写；业务常量写为根 atom）。
   - 依据：**(U)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/433e07ba, #48078e3a, #68d36f55, #a7f465d2, #8854f464, #32b6f7fd`、`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`。
4. **Agent 体只经 `soroi_return` 交回（PASS）：**
   - `soroi-body.md:12-16`（及 `soroi-worker.md:31-33`）明确 `soroi_return` 是唯一结果通道，文件路径经文件字段交回，最后一条回复或 `yield` 不算结果，未调 `soroi_return` 即失败。
   - 依据：**(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a`、`session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/c1ef8567`。
5. **中心 worker 按 `eval-writers-ruling`（`soroi_task`、`purpose`、释放）（PASS）：**
   - `soroi-main.md:38-42`、`soroi-worker.md:5,7-10,27-36` 明确通过 `soroi_task` 派生 `soroi-worker`，多任务批次必填一句 `purpose`，整批全部调用 `soroi_return` 后释放并带 `purpose` 进入提醒，可再派生下游 worker 汇总。
   - 依据：**(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/2c08aa6d`、`session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/440c8605, #ea638181`、`session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/e0de24df` 及 `evidence/argon/eval-writers-ruling.md`。
6. **`eval` 只在中心、不嵌套（PASS）：**
   - `soroi-main.md:45`、`soroi-worker.md:39`、`soroi-body.md:19` 明确 `soroi_eval` 只在中心主机（`soroi-main` 与 `soroi-worker`）运行，`Agent` 体（`soroi-body`）没有 `soroi_eval` 且永不运行 `eval`。
   - 依据：**(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640`。
7. **远程只一层（PASS）：**
   - `soroi-main.md:36`、`soroi-worker.md:40`、`soroi-body.md:20` 均明确远程 `Agent` 体绝不能再启动另一个远程 agent。
   - 依据：**(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/3dbd0473`。
8. **无 `omomp` / `fork`（U24）（PASS）：**
   - 三个文件完全使用独立的 `soroi` 工具名（`soroi_eval`、`soroi_task`、`soroi_return`），零 `fork` / `fork_task` / `omomp` 词汇。
   - 依据：**(U) `LEDGER.md` U24**。
9. **照顾弱模型（PASS）：**
   - 句子短促直接、给出具体正例（`const temp_2200c = 2200`、`const { curve: curve_2200c, log: log_2200c } = anneal(film, temp_2200c)`、`stop(log_2200c)`），边界一条一事。
   - 依据：**(U)** `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/eaf23bd2`、`session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/13abc2a1`。
10. **不硬编码模型（PASS）：**
    - 三个文件的 YAML frontmatter 均只有 `name` 与 `description`，未硬编码 `model`。
    - 依据：**(U)** `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`。
