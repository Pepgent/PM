# D11-C（运行事件的记录携带者与派生的 `call_inherited`）Argon 选票与意图审查

- **投票人：** Argon（`D10Clone_a555.ArgonD10`，Gemini 族一票，依 D1-12、D1-16、D1-17）
- **被投文件：** `local://decisions/D11C.md`（覆盖 `D11-C1`、`D11-C2`、`D11-WB3`）
- **基线依据：** `pepgent-soroi/LEDGER.md`（U1–U61）、`pepgent-soroi/AGENTS.md`、`pepgent-pm/evidence/argon/D10-intent.md`、`rulings-C.md`、`flow-catalog.md`

---

## 一、逐条选票表

| ID | 票 | 理由（引 (U)） | 反例 | 分类意见 |
| --- | --- | --- | --- | --- |
| D11-C1 | **赞成** | **【设计补充审查通过，不行使否决】** 一次正式提交是 store 产生记录的原子单位（`design/store.md:40`，D6-04）。将一次提交的节点与入边统一收归提交级事件（普通步为 `step_committed.records`，派生物化为 `run_started.records`）唯一携带，而将六种调用类事件（`call_started`、`call_ended`、`call_adopted`、`call_aborted`、`human_handback`、`call_inherited`）定为纯转变标记 `{ kind, seq, at, step, position }`（同一提交内提交级事件序号最小，`graph?at=k` 在提交级事件序号处整体生效，`activity` 从调用记录的 `startedAt`/`endedAt` 重建）。这样既消除了 `D11-47C` 下同一调用因产生多条调用事件（如 `started`+`ended` 或 `started`+`aborted`+`handback`）而重复携带同一 `GraphNode`/`edges` 的冲突，又完整保留了 F10、F11、F17、F23、F24、F26 所需的转变种类序列与历史时间轴回看能力，符合 `(U) 01a18e1f #9ff9d2be`（事件表驱动历史时间轴）、`(U) 01a18efe #9e2d37a1`（无重放）、`(U) 01a18e1f #d1baf561`（人类介入改值）、`(U) 01a18e1f #64246eaf`（按身份复用）及 `(U) U2`、`U23`。 | — | 同意标“串联”（是：D6-09、D6-10 与 `RunEvent` 修订） |
| D11-C2 | **赞成** | 派生运行 R' 的物化提交依次写 `run_started`（seq 1，携带 `records`）→ 每个继承调用一条 `call_inherited` 标记 → 每条继承停止一条 `atom_stopped`（同一提交内序号连续，仍不写步、不发 `step_committed`）。在 `D11-C1` 将调用事件定为纯转变标记后，发出 `call_inherited` 标记不会造成记录重复携带，且使 D6-16、D6-20、D8 F24② 与 `main` 派生实现完全一致，不缩减 F24 判据，符合 `(U) 01a18e1f #a0d22b8a`（改参数或函数体派生新运行永远是正式运行）与 `(U) U2`、`U23`。 | — | 同意标“串联”（否） |
| D11-WB3 | **赞成** | 本表通过后由秘书直接替换 D6-04、D6-09 与 `RunEvent` 草图、D6-10、D6-16、D6:294 与 D7:203 时序图及 `design/store.md:40、94–99、133–140、149` 正文，并核对 D8 F10、F11、F23、F24、F26，不留更正记录，符合 `AGENTS.md` 第 3 条与文档直接替换规则。 | — | 同意标“实现”（否） |

---

## 二、三类结论汇总

1. **意图审查与否决权核查（Argon 说了算）：**
   - `D11-C1`、`D11-C2`、`D11-WB3` 均符合 `(U)` 用户原意；对标为“缺失部分或设计补充：是”的 `D11-C1` **审查通过，不行使一票否决权（否决 0 项）**。
2. **对各条目的投票：**
   - `D11-C1`、`D11-C2`、`D11-WB3`（共 3 项）：**全部投赞成（反对 0 项）**。
3. **分类争议：**
   - **0 项**（同意全表分类，无需提请导师仲裁）。
