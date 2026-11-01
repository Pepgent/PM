# 闸门 A 裁决：Pepgent#25 后续（W-10 误将 `tool-policy-nag` 注入当作用户原话并自定改用 `wt`）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25)（[评论 6563492271](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271)），`PM/evidence/gates/w10-user-wt-quote.md`、`w10-user-wt-quote-forensic-scan.md`、`w10-user-wt-quote-user-entries.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U83`、`U88`（`LEDGER.md:112,117`：按既定工程纪律推进，不设等待用户回答的 blocker）。
  - `(D)` `SOR/AGENTS.md:58-60,64,75,125-127,129`（C2-2、C2-4、C3-4.4、禁止把非用户原话标成 `(U)`、禁止设等待用户回答的 blocker、接续不推倒）、`CFG/agent/omomp.yml:16-21`、`CFG/agent/extensions/tool-policy-nag/index.ts:20-33,178`。
  - `(R)` `w10-user-wt-quote-user-entries.md`（窗口内人类终端输入 0 条；`entry 8fe0d97c` 带 `attribution: "agent"`，系 `tool-policy-nag` 机器注入）。

---

## 一、闸门 A 判定结论

- **是否越界：** **不越界（属 K1 既有 `C3-4.4` 与 `AGENTS.md:125-127` 规则的直接适用与澄清，完全不触及产品原始意图或跨组件公开契约，无需立 P0 表决）。**

---

## 二、对 `A-1` 的回答

- **A-1：** **确认完全不触及产品原始意图与公开契约（K1）。**
  1. 原始会话 JSONL 取证（`F1`–`F6`）已证实 `W-10` 所称“用户第四次质问”（`entry 8fe0d97c`）的 `attribution` 为 `"agent"`，系 `tool-policy-nag` 针对 `bash`/`eval` 工具路由偏离自动注入的提醒，**不是 `(U)` 用户原话**（`SOR/AGENTS.md:126`），且与 `wt` 或工作树无关。
  2. 本处置仅纠正 `W-10` 对 `tool-policy-nag` 机器注入的误认、撤回其无规则来源的“只用 `wt`、遇冲突停下请示用户”自定做法、维持 `C3-4.4` 与 [#25 评论 6563492271](https://github.com/Pepgent/Pepgent/issues/25#issuecomment-6563492271) 既有处置（`WEB-06` 继续在 `/Users/mouriya/Ext/worktrees/pepgent-web-05` 完成，`WEB-07` 起按 `C3-4.4` 另建工作树），不改动任何 `design/*.md`、跨组件公开契约、产品功能范围或 `WEB-06` 交付内容。
