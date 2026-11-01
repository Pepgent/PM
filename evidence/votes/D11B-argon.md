# D11-B（旧 leader 单独裁决复核第二批：soroi 与 remote 侧契约）Argon 选票与意图审查

- **投票人：** Argon（`D10Clone_a555.ArgonD10`，Gemini 族一票，依 D1-12、D1-16、D1-17）
- **被投文件：** `local://decisions/D11B.md`（覆盖 `D11-37`、`D11-21`、`D11-10`、`D11-28`、`D11-43A`、`D11-43B`、`D11-WB2`）
- **事实底稿：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/inv/D11-facts-A.md`、`D11-facts-B.md`
- **基线依据：** `pepgent-soroi/LEDGER.md`（U1–U61）、`pepgent-soroi/AGENTS.md`、`pepgent-pm/evidence/argon/D10-intent.md`、`rulings-C.md`、`flow-catalog.md`

---

## 一、逐条选票表

| ID | 票 | 理由（引 (U)） | 反例 | 分类意见 |
| --- | --- | --- | --- | --- |
| D11-37 | **赞成** | **【设计补充审查通过，不行使否决】** 未消费提醒在 omp 主循环每次构造模型调用候选时经公开扩展点 `addBeforeModelCall` 与会话公开 `obfuscator` 注入（不改 omp 宿主代码，符合 `(U) U13`），每次注入写一条 `customType = "soroi.unconsumed-reminder"`、数据为 `{ text }` 的 transcript 条目（可见集为空时不注入也不写条目），以 omp `SessionManager` 的 transcript 顺序对应紧随其后的第一条 assistant 回复，删去原 LR-37 在 transcript 权威之外重复维护的 `phase`/`processGeneration`/`ordinal` 全局时钟；D5-13 的现算、行格式与可见范围不变，F22⑤ 保留至少一个主 agent 可见的未消费 atom 供⑥探针核对。完全符合 `(U) 01a18ed5 #4986c617`（未消费提醒推动逐步写程序）、`(U) 01a18ed5 #ea638181` 与 `(U) 01a18e8a #e0de24df`（批次释放后一起进入提醒）及 `(U) U13`、`U23`。 | — | 同意标“技术”（是：D5-13 注入点与 transcript 记录补充） |
| D11-21 | **赞成** | **【本意核查：不与 `(U)` 冲突】** 根监管者内部义务登记、释放与请求结束不作为对外公开的 transcript 契约；F22⑨ 原文（D8:141）本身即设计为可证伪的 store 下游事实断言（先交回的 worker 将产出全部 `stop` 使 store 内已提交未消费集为空，但最后一个 worker 交回前 store stream 中无 `run_ended`、其步仍提交进同一 `Open` 运行、批次释放后 `/end` 得 `Ended{seq}`），F22⑦ 由读方帧与 `D11-37` 提醒条目判定。不把插件私有状态表变成仅供测试消费的公开 wire，完全符合 `(U) 01a18dd4 #46e29915`、`#d01f7a32`、`(U) 01a18ed5 #ea638181` 及 D8-11。 | — | 同意标“串联”（否） |
| D11-10 | **赞成** | Slurm 模板的 body 镜像与步骤镜像均写 OCI 镜像引用（tag 或 digest 均可），废除无 registry digest 的裸 SIF 路径，作业脚本以 `docker://<引用>` 交 Apptainer 原样运行，`templates` 的 `identity.image` 统一在读取模板目录时经 `Registry::resolve` 解析为 registry digest。既消除了原 LR-10 强制手写 digest 导致的“钉死版本”及与 D8 `REM-05`（换 tag 验证 `identity.image` 变化）的冲突，又使 Komodo、Slurm、k8s 三后端在身份解析与执行两侧完全一致，符合 `(U) 01a18e3a #c5030836, #93b7f0b4, #d5414f59`（三后端统一抽象）与 `(U) 01a18e8a #071be582`（不可变运行环境身份，D4-18）。 | — | 同意标“技术”（否） |
| D11-28 | **赞成** | **【设计补充审查通过，不行使否决】** 远程 `Agent` 的 `call.json` 删除无消费方的 `capture` 字段；捕获身份仅由权威方（中心 `eval` 中间件）依 D4-18 计算并随正式步提交进中心 `store`，`boot.js` 与 `RemoteChild`（只写 D4-15 四列批次）不计算或校验捕获身份。符合 `(U) 01a18e1f #8e0a7e8f`、`#5a37a640`（`eval` 仅在中心主机运行，远程运行结束后回集中副本）与单一权威源头原则。 | — | 同意标“串联”（是：D4 `CallRequest` 修订） |
| D11-43A | **赞成** | `remote remove` 在所有后端均只等待作业到达终态（`Ended` 或 `EndedUnstarted`）后清理并记 `removed`，不隐式取消作业（取消统一走 `abort`），将 Slurm 后端的 `remove` 与已通过的 D4:28、D6-15、D8 `REM-02`/`REM-07` 对齐，消除原 LR-43 同名操作在不同后端副作用不同的分裂，符合 `(U) 01a18e3a #c5030836, #93b7f0b4`（三后端共享统一抽象）。 | — | 同意标“技术”（否） |
| D11-43B | **赞成** | 将原 LR-43 中“Komodo 启动失败明确报错”归为失败分支、不进入公开设计契约（remote 报错写法归其私有实现），`EndedUnstarted` 严格维持 D8 `REM-07`“排队后被取消、从未开始”的定义不扩展。符合 `(U) 01a18dd4 #eaea6240` 与 `.claude/rules/design-assumes-it-works.md`（设计阶段只写主路径）。 | — | 同意标“技术”（否） |
| D11-WB2 | **赞成** | 本表通过后直接替换 PM（D4、D5、D8 对应条款）、`pepgent-soroi`（`design/eval.md`、`design/store.md`，含补改 D11-A 遗留的 `design/store.md:191` compare `map` 为 URL 编码 JSON 数组）与 `pepgent-remote/design/remote.md` 正文，不留更正记录，符合 `AGENTS.md` 第 3 条与文档直接替换规则。 | — | 同意标“实现”（否） |

---

## 二、对四项特别核对要求的专项结论

1. **`D11-21` 选择“生命周期记录不成为公开契约、F22⑨ 按 store 事实判定”是否与 `(U)` 冲突：**
   - **不冲突。** 用户 `(U)` 原话从未要求将根监管者内部 `Obligation` 状态表写入 transcript 作为公开契约；D8 F22⑨ 已通过的判据本身就是通过“先交回 worker 将产出全部 `stop` 使 store 未消费集为空，但最后一个 worker 交回前 store stream 无 `run_ended`、其步仍提交进同一 `Open` 运行、批次释放后 `/end` 得 `Ended{seq}`”来直接证伪提前结束。以权威下游 store 事实（加读方帧与 `D11-37` 提醒条目）判定完全充分。
2. **`D11-10` 允许模板写 tag、不再用 SIF：**
   - **完全符合 `(U)` 与通用规则。** 允许模板写 OCI tag 或 digest 并统一由 `Registry::resolve` 解析 `identity.image` 的 registry digest，既遵守了《实现时不钉版本号》规则，又恢复了 D8 `REM-05`（换 tag 检验 `identity.image` 变化）与 D4-18（不可变镜像 digest 身份）的自洽，且三后端一致。
3. **`D11-43B` 把 Komodo 启动失败作为失败分支不进设计：**
   - **完全符合 `(U) 01a18dd4 #eaea6240` 与设计只写主路径规则**，同时守住了 D8 `REM-07` 中 `EndedUnstarted` 的边界。
4. **`D11-37`、`D11-28` 两条“缺失部分或设计补充：是”的否决权审查（依 `U11`、`D1-16`）：**
   - `D11-37`（`addBeforeModelCall` 注入点与 `{ text }` transcript 提醒条目）与 `D11-28`（远程 `Agent` 的 `call.json` 不带无消费方的 `capture` 字段）均符合 `(U)` 用户原意，**审查通过，不行使一票否决权（否决 0 项）**。

---

## 三、三类结论汇总

1. **意图审查与否决权核查（Argon 说了算）：**
   - 全表 7 项均符合 `(U)` 用户原意；对 `D11-37`、`D11-28` 两项设计补充**不行使否决权（否决 0 项）**。
2. **对各条目的投票：**
   - `D11-37`、`D11-21`、`D11-10`、`D11-28`、`D11-43A`、`D11-43B`、`D11-WB2`（共 7 项）：**全部投赞成（反对 0 项）**。
3. **分类争议：**
   - **0 项**（同意全表分类，无需提请导师仲裁）。
