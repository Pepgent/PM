# 闸门 A 裁决：soroi#250 中 F07 两个 capture 负例 BLOCKED（既有 workload 发布确认与驱动补齐）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/soroi#250](https://github.com/Pepgent/soroi/issues/250)（[评论 6562742874](https://github.com/Pepgent/soroi/issues/250#issuecomment-6562742874)）、[Pepgent/soroi#221](https://github.com/Pepgent/soroi/issues/221)（[评论 6552503070](https://github.com/Pepgent/soroi/issues/221#issuecomment-6552503070)），`PM/evidence/gates/soroi221-capture-workload.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，验收标准不缩减）、`U30–U32`、`U83`、`U88`（`LEDGER.md:88,97,112,117`：开发期不设跨组件 runtime 前置锁，不丢弃已有合法成果从零重做）。
  - `(D)` `SOR/AGENTS.md:45,60,128-129`（C1-3、C2-2、禁止从零重做）、`DEC/D5-plugins-eval.md`（capture 契约）、`DEC/D8-mvp-scope.md:126,274,315,371`（F07 ②③、SOR-11、LIB-01、E2E-13）、`DEC/D15-private-decision-discard.md:44,49` 与 `D15X/lablibrary.md:107,167`（保护 `lab-library#3` / `PR#4` `7db341c`）、`DEC/D16-phaseB-review-restore.md:33,34,37`（D16-09、D16-10、D16-13）。

---

## 一、闸门 A 判定结论

- **是否越界：** **不越界（属 K1 既有受保护成果与已通过决策 `D8`、`D15`、`D16-09/13`、`C1-3` 的直接确认与适用，不触及新产品意图或公开契约变更，免票放行处置 `ⓐ`，无需立 P0 表决）。**
- **放行处置（`ⓐ`）：**
  1. **确认既有 workload 发布已解除阻塞：** `Pepgent/lab-library#3` / `PR#4`（`7db341c`，受 `D15` 明文保护，`F3`、`F6`）已交付 `nodes/try_eval.ts`、`nodes/text_only.ts` 与 `workloads/f07-agent-negatives.json`，并在 `soroi#221` 评论 `6552503070` 发布了与 `lab-library` `main` 完全一致的公开 JSON（`F4`、`F5`、`F9`），且 `SOR-11`（`soroi#205`）已合入关闭（`F8`）。`#250` 所称“等待 `#221` owner 发布 workload”的阻塞早已解除，无需 `W-05` 重复发布（`SOR/AGENTS.md:129`）。
  2. **剩余工作归属：** 由 `W-08` 在 `#250`（`e2e/**` 白名单，`D16-09`）内补齐 `e2e/s1/live-f07.ts` 对 `forbidden`（`try_eval`）与 `noReturn`（`text_only`）两个负例阶段的自动驱动代码及 `e2e/s1/agents-live.ts` 的対応注释（`F10`、`F13`）。
  3. **阶段 B / C 边界：** 阶段 B 只补齐 `e2e/s1/live-f07.ts` 驱动代码并做本仓静态检查，不在阶段 B 为核对 `spawnCapture` 下 assignment 字符串而在跨组件环境预跑 runtime（`C1-3`、`D16-13`）；若阶段 C 统一运行 `S1` 时实测出现 assignment 漂移，届时按具名 blocker 交 `W-05` 刷新。

---

## 二、对 `A-1`、`A-2` 的逐问回答

- **A-1：** **是，仅是确认已有事实（K1），不触及 `F07` ②③ 的验收语义或 `D5` 的 capture 契约。**
  - `lab-library#3` / `PR#4`（`7db341c`）及 `#221` 评论 `6552503070` 是 `D15` 盘点明文列为“保护：F07旧成果不回滚”的既有交付（`F6`）；其 `try_eval`、`text_only` 节点定义与 `workloads/f07-agent-negatives.json` 至今在 `Pepgent/lab-library` `main` 上保持一致（`F5`），且完全符合 `e2e/s1/f07.spec.ts:8-17` 对 `#221` 评论 JSON 块的消费要求（`F9`）。
  - 确认该发布有效并要求 `W-08` 在 `live-f07.ts` 中补齐两个负例的自动采集阶段，正是为了在阶段 C 完整执行 `F07` ②（子 `Agent` 调 `soroi_eval` 被拒）与 `F07` ③（子 `Agent` 不调 `soroi_return` 报错且不写捕获记录），守住 `(U) U2` 全流程不收缩与 `D5` capture 契约。
- **A-2：** **完全符合 `F07` 原意与开发期阶段门禁规则（K1）。**
  - 当前 `packages/omp-soroi/src/eval/agent-body.ts:16,28` 生成的交回说明后缀与 `#221` 评论 `6552503070` 中发布的 assignment 格式一致（`F7`）。
  - 按 `(U) U30–U32`、`U83`、`U88` 及 `C1-3`（`SOR/AGENTS.md:45,128`：“禁止把‘依赖切片已有跨组件 runtime 证据’设为下游开工条件”）、`D16-13`（阶段 B 不运行跨组件 live 测试），严禁在阶段 B 为 `W-08` 编写 `live-f07.ts` 驱动增设一次上游 runtime 重提锁（排除处置 `ⓑ`）。将潜在漂移留在阶段 C 真实运行 `S1` 时检验，符合阶段 B / C 职责划分。
