# D3 独立网络层与中心化 omp RPC 多路复用器 — Argon 第 2 轮选票（修订行重投）

- **决策文档：** `pepgent-pm/evidence/decisions/D3-network-mux.md`（第 2 轮修订版 `#8142`）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **重投范围：** 本轮按 `task:high` 与导师（`LeadMentor`）第 1 轮反例修订的 **12 行**：`D3-01`、`D3-04`、`D3-05`、`D3-06`、`D3-09`、`D3-12`、`D3-13`、`D3-14`、`D3-15`、`D3-16`、`D3-17`、`D3-19`（其余 7 行 `D3-02`、`D3-03`、`D3-07`、`D3-08`、`D3-10`、`D3-11`、`D3-18` 在第 1 轮已全票通过且本轮未改动，维持第 1 轮赞成票）。
- **本轮计票结果：** **12 条修订行全部赞成（12 赞成 / 0 反对 / 0 否决）**；全表 19 行累计 **19 赞成 / 0 反对 / 0 否决**。

---

## 一、本轮修订的意图与一票否决审查

1. **`D3-12`（人工接管 IRC 的排队、撤回与编辑）：【定 · 符合用户原意】**
   - 本轮删去了“第一版指发送前的草稿”及原占位 `P4`，改为由写方插件持有待投递表（键为 `msg`），在 agent 空闲或到达下一个步边界时再以 `from = "human:<principal>"` 调用 omp 内置 `IrcBus.send`；投递前通过 `mux_human_irc_edit{msg, body}` 与 `mux_human_irc_withdraw{msg}` 直接修改写方待投递表，投递后不可变并归入 omp transcript。
   - **依据 `(U)` 原文：**
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7bfe3696`：“而实际上做人工接管也是可以的，因为omp的subagent语义里一切都是irc，所以irc可以知道来源是主agent，而irc可以是一条普通的user prompt，所以可以派对，乃至被人类编辑”
     - **(U) LEDGER U2**：“这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩”
     - **(U) LEDGER U13** 与 `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`：不修改 omp 宿主核心代码，在插件写方层实现投递前排队、编辑与撤回。
2. **`D3-17`（agent 镜像不烘焙定制，每次启动随 copy-in 带入）：【定 · 符合用户原意】**
   - 明确 agent 镜像只含 `omp` 与 `omp-rpc-mux`，soroi 定制与 Lab 库的 `.omp/` 按 D2-11、D4-09 每次启动随 copy-in 带入，确保远程每一代加载的定制与中心主 agent 逐字节一致。
   - **依据 `(U)` 原文：**
     - **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`：“首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起”
     - **(U) LEDGER U23、U24**。
3. **一票否决审查（针对本轮 11 条标为“缺失/补充 = 是”的修订行）：**
   - **0 否决（不行使一票否决权）。** 全部修订均增强了状态权威唯一性、跨表（D2/D4/D5/D6）一致性与用户原意完整性，无任何违背 `(U)` 原话之处。

---

## 二、第 2 轮修订行逐条投票表（12 行）

| ID | 分类 | 缺失/补充 | Argon 第 2 轮投票 | 理由（核对本轮修订与 `(U)` 依据） |
| --- | --- | --- | --- | --- |
| **D3-01** | 技术 | 是 | **赞成** | 补明 `Pepgent/iac` 声明为期望、NetBird 管理面为 live peer/route 运行时权威，并写清 AGPLv3 原样自托管与修改版网络提供义务，符合 `(U)` `01a18e3a #09e1cc92, #d5414f59` 与 U13。 |
| **D3-04** | 技术 | 是 | **赞成** | 收窄为只定义 `dial` 的四项职责，远程模板 body 形态统一交由 D4-08（`boot.js` 在 `SOROI_CALL=agent` 时 exec `dial`）规定，删去已废止的 `Attach/Accept` 措辞，符合 `(U)` `01a18e3a #09e1cc92` 与 `01a18f4a #f488be08`。 |
| **D3-05** | 技术 | 是 | **赞成** | 明确 omp JSONL 行与 `mux_*` 帧各占一条 text 消息，唯独紧跟 `mux_file` 的文件字节用一条 binary 消息并由 Mux 原样转成 HTTP 响应体，与 §4 及 D3-13 完全自洽。 |
| **D3-06** | 串联 | 是 | **赞成** | 凭据注入兼容 `Pepgent/deploy` 与 `Pepgent/soroi` 发行仓 compose 独立运行两种场景，并补明读方允许发 `mux_human_irc*` 控制帧（转交写方、不进 stdin），满足 `(U)` `01a18e1f #2dbf970b` 与 LEDGER U23。 |
| **D3-09** | 实现 | 否 | **赞成** | `where` 对齐裁决 A（`Pepgent/soroi` 的 `packages/omp-soroi` subagent 模块），`#launch` 修正为六步，符合 U13。 |
| **D3-12** | 技术 | 是 | **赞成** | **【定：落实 U `#7bfe3696` 与 U2】** 受信 Lab 后端 reader 连接给出 `principal`，写方插件持有投递前待投递表（支持 `mux_human_irc_edit` / `mux_human_irc_withdraw`），到步边界再调内置 `IrcBus.send`，不缩水、不改 omp 宿主代码。 |
| **D3-13** | 技术 | 是 | **赞成** | 明确只用拉取（无 `--batch-dir`/`mux_batch`）、`dial` 只开放 `--expose` 能力目录且只列已原子改名的批次文件，字节经 binary 消息按需原样转出，符合 C-3（`(U)` `01a18e1f #8e0a7e8f, #bfd6975c, #63f31453`）。 |
| **D3-14** | 串联 | 是 | **赞成** | 远程可启动模板的识别判据统一引用 D4-17（遵守 D4-08 约定的模板），消除第二套判据，符合 `(U)` `01a18e1f #9c291fe2`。 |
| **D3-15** | 技术 | 是 | **赞成** | 按 D3-07 的两层生命周期锚点（写方声明 ①–⑦ 包裹进程代 ④–⑤）定义 `Presence` 与四类 `PresenceEvent`，停驻期间快照与事件流完全一致，符合 `(U)` `01a18e1f #678fe41a, #2dbf970b`。 |
| **D3-16** | 串联 | 是 | **赞成** | 修正取舍措辞，明确 `Program` 体即使处于带 `omp-rpc-mux` 的 D4-08 约定镜像中也不调用 `dial`，只经独立网络层访问 store，符合 `(U)` `01a18e3a #09e1cc92`。 |
| **D3-17** | 串联 | 是 | **赞成** | 明确 agent 镜像只含 `omp` 与 `omp-rpc-mux`，soroi 定制与 `.omp/` 按 D2-11、D4-09 每次启动随 copy-in 带入（P3 同步更新），符合 `(U)` `01a18e1f #9c291fe2` 与 LEDGER U23、U24。 |
| **D3-19** | 串联 | 是 | **赞成** | 每个写 eval 的会话注册 `WS /endpoints/eval:<session id>` 并出示 `MUX_GENERATION` 与 `MUX_TOKEN` 绑定写方声明与进程代，根端点回答 `writers(runId)`，停驻时由写方先开新一代再路由，解决了并发 worker 撞名与停驻唤醒问题，符合 `(U)` `01a18e1f #d1baf561, #a0d22b8a, #678fe41a`。 |

---

## 三、第 3 轮重投（针对 `D3-04`、`D3-12` 最新修订 `#35A9`）

- **决策文档版本：** `pepgent-pm/evidence/decisions/D3-network-mux.md`（`#35A9`）
- **重投范围：** `D3-04`（补明 `--expose soroi-batch [--expose <产物目录>]`）、`D3-12`（改为写方契约 `HumanIrcOp` ADT `enqueue / edit / withdraw / deliver`，统一根 agent 写方 Lab 后端与子 agent 写方父进程 `subagent supervisor`）
- **第 3 轮计票结果：** **2 赞成 / 0 反对 / 0 否决**（全表 19 行累计 **19 赞成 / 0 反对 / 0 否决**）。

| ID | 分类 | 缺失/补充 | Argon 第 3 轮投票 | 理由（核对 `#35A9` 最新修订与 `(U)` 依据） |
| --- | --- | --- | --- | --- |
| **D3-04** | 技术 | 是 | **赞成** | 远程 `boot.js` 在 `SOROI_CALL=agent` 时 exec `omp-rpc-mux dial --root ${REMOTE_MOUNT} --expose soroi-batch [--expose <产物目录>] -- omp --mode rpc …`，与 `D3-13` 的 `--expose` 能力目录完全闭合，符合 `(U)` `01a18e3a #09e1cc92` 与 `01a18f4a #f488be08`。 |
| **D3-12** | 技术 | 是 | **赞成** | **【定：落实 U `#7bfe3696` 与 U2、U13】** 将待投递协议收口为写方契约（`HumanIrcOp` ADT：`enqueue / edit / withdraw / deliver`）：根 agent 的待投递表由其写方 Lab 后端持有并投递为带 `human:<principal>` 来源的普通 prompt，子 agent 的待投递表由其写方父进程 `subagent supervisor` 持有并在空闲或步边界以 `from = "human:<principal>"` 调用内置 `IrcBus.send` 投递；投递前 `edit`/`withdraw` 直接改写方唯一权威表，投递后归入 omp transcript 不可变，GUI 无需区分根与子，不缩水、不改 omp 宿主代码。 |

---

## 四、第 4 轮重投（针对 `D3-10` 最新修订）

- **重投范围：** `D3-10`（补明“作为写方，它可以像 subagent supervisor 一样用 `set_host_tools` 注册 Pepgent 自己的 host 工具（工具由 D7 定，按 D3-06 只有写方能发）”）
- **第 4 轮计票结果：** **1 赞成 / 0 反对 / 0 否决**（全表 19 行累计 **19 赞成 / 0 反对 / 0 否决**）。

| ID | 分类 | 缺失/补充 | Argon 第 4 轮投票 | 理由（核对最新修订与 `(U)` 依据） |
| --- | --- | --- | --- | --- |
| **D3-10** | 串联 | 是 | **赞成** | **【定：符合 U1、U13、U23】** Lab 后端作为根会话的唯一写方，通过上游 `omp --mode rpc` 原生公开的 `set_host_tools`（按 D3-06 仅写方可发）向根会话注册 Pepgent 业务侧专属的 host 工具（由 D7 定义），既满足 **(U) LEDGER U23**“作为pepgent的agent核心被调用”，又保持 **(U) LEDGER U1** 中 `soroi` 定制与 `Pepgent` 上层业务组件的清晰边界（不把业务层工具塞进 `soroi` 定制本身），且不修改 `omp` 宿主代码（**U13**）。 |
