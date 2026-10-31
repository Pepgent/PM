# D4 远程执行的闭合契约 — Argon 意图裁决、选票与否决清单

- **议题：** D4 远程执行的闭合契约：远程 Program、远程 Agent、运行环境模板（`pepgent-pm/evidence/decisions/D4-remote-exec.md`，共 22 条：`D4-01`–`D4-22`）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **总体计票结果：**
  - **意图裁决：** 3 条含意图分类的条目（`D4-09`、`D4-16`、`D4-21`）全部裁定为 **【定 · 符合用户原意】**；另对 `D4-02`（bundle 哈希版本）与 `D4-20`（不单设运行级 `env` 覆盖）确认属于 **【暂定 · 无 `(U)` 冲突的技术/串联取舍】**。
  - **一票否决：** **0 条**（无条目在设计方向上违背 `(U)` 用户原话）。
  - **逐条投票（22 条）：** **19 赞成，3 反对（`D4-05`、`D4-08`、`D4-15`）**。3 张反对票均针对与 D6-07、D3-04/D3-13 的跨表接口失配及 dry run / 步提交前的传输端点失效，已逐条附上具体反例（场景、证据、失效位置）与能赢得赞成的修改文案。

---

## 一、意图裁决（Argon 权限 1 · 附 `(U)` 原文）

### 1. `D4-09`（分类：意图 + 技术）：远程 `Agent` 每次启动随拷入加载与中心主 agent 同一份 soroi omp 定制，隔离宿主 `~/.omp` 与 `omomp`，不考虑两侧 omp 二进制版本一致
- **裁决状态：【定 · 符合用户原意】**
- **依据 `(U)` 原文：**
  1. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`（2026-10-31 04:12:48）：
     > “首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起……只改连接方式变成远程连接，远程启动，是生是死全部遵照omp既有的生命周期，那么这个实现非常好做，只需要补充，部署，服务发现”
  2. **(U)** `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`（2026-10-31 09:12:17）：
     > “不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯”
  3. **(U) LEDGER U23**：
     > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
  4. **(U) LEDGER U24**：
     > “不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
- **裁决说明：**
  - **意图面：** 远程 `Agent` 加载的定制必须与中心主 agent 的 soroi 定制对标，且严格隔离本机 `~/.omp` 与 `omomp` 的插件/定义，不要求中心与远程 omp 可执行文件版本一致。
  - **技术面：** 将 `Pepgent/soroi` 定制打成内容寻址的 `customization.tar` 随 copy-in 解包到 `HOME=<mount>/soroi/home`，使发版无需重建全部远程环境镜像，技术面投**赞成**（注：按 leader 裁决 A，定制 tar 内为合并后的单包 `packages/omp-soroi`）。

### 2. `D4-16`（分类：意图 + 技术）：`eval` 只在中心主机运行且禁止递归嵌套；远程 `Agent` 只有一层，不能再开远程 `Agent`；不含 `omomp` 的 `fork`
- **裁决状态：【定 · 符合用户原意】**
- **依据 `(U)` 原文：**
  1. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640`（2026-10-31 08:25:02）：
     > “你以为这样改就能了事？从store拷入运行环境都来了，eval禁止递归嵌套，eval永远只有中心主机能运行”
  2. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/3dbd0473`（2026-10-31 08:27:31）：
     > “到底为什么要ducklake，是为了远程的agent准备的，你到底写的什么鸡巴东西，远程agent爱怎么执行怎么执行，但是不允许再接着开远程agent”
  3. **(U) LEDGER U24**：
     > “不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
- **裁决说明：**
  - **意图面：** 完全落实“eval 仅在中心主机运行、禁止递归嵌套”“远程 agent 不允许再接着开远程 agent”以及 U24 删除 `fork` 分身的要求。
  - **技术面：** 通过 `SOROI_ROLE = Main | LocalChild | RemoteChild` 与启动配方 `writesEval` 在结构上保证 `Agent` 体会话无 `soroi_eval`、`RemoteChild` 无 `soroi_task`，而中心并发 worker 可正常写 `eval` 并调用 `Agent` 节点（对齐 D2-02、D5-06、D5-07），技术面投**赞成**。

### 3. `D4-21`（分类：意图）：`dry run` 里的远程调用真实执行（未钉住部分），结果从头到尾不进 store
- **裁决状态：【定 · 符合用户原意】**
- **依据 `(U)` 原文：**
  1. **(U)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/68d36f55`（2026-10-31 06:47:05）：
     > “然后dry run确实有模拟到什么程度的问题，在slum里试跑某种算法非常正常”
  2. **(U)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/32b6f7fd`（2026-10-31 08:54:56）：
     > “dry run根本没有store，eval里一个atom什么时候叫成功运行还需要store？”
  3. **(U)** `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`（2026-10-31 08:30:15）：
     > “eval里所有的正式远程运行才需要进入store，任何非正式运行从头到尾都不进store，否则为什么叫非正式？”
- **裁决说明：** `dry run` 照常在远程环境（如 Slurm）运行未 pin 的调用，拷回暂存区仅供中间件解析返回给 AI，调用返回即删除暂存区，批次不汇入、捕获不入中心副本；远程 `Agent` 的 transcript 归宿主 omp 的 session 目录管理而不属 store。完全符合用户原意，投**赞成**。

### 4. 附：起草者提请核对的两项 `【暂定】` 边界确认
- **`D4-02`（节点函数版本 = `Bun.build` bundle 的内容哈希）：【暂定 · 与 `(U)` 无冲突】**
  - 已在 `pepgent-pm/evidence/argon/version-ruling.md` 裁决：`design/eval.md:76`“文件即版本”仅出自 `(A)` `01a18e8a #8419a73e, #1183fdaa`，无 `(U)` 原话要求排除依赖算单文件哈希；对 bundle 取哈希直接服务于 `(U)` `01a18e8a #8d913d2f, #f4c96767`（处理依赖与 `package.json`）及 `01a18e1f #64246eaf`（按身份准确复用）。
- **`D4-20`（运行级 `env` 覆盖不另设机制）：【暂定 · 与 `(U)` 无冲突】**
  - 历史会话中“三层覆盖（含整个运行覆盖）”出自 `(A)` `01a18e8a #004e04da`，用户在 `(U)` `#071be582` 仅概括回答“这里面别的我觉得都没问题，command我有很大的顾虑”，且同会话落成的 `design/eval.md:79` 与 `design/layers.md:10` 均只保留“函数默认环境 + 单次调用更换”。因此不单设运行级覆盖机制不违背用户原意，归技术项投票。

---

## 二、对全部 22 个条目的逐条投票（Argon 权限 4）

| ID | 起草分类 | 补 | Argon 投票 | 理由 / 反例与修改要求 |
| --- | --- | --- | --- | --- |
| **D4-01** | 技术 | 缺 | **赞成** | 落实 `(U)` `01a18e8a #8d913d2f, #f4c96767` 对远程 `Program` 处理依赖与还原 TS 闭包执行的要求，对齐 leader 裁决 E 与 D2-10（注：按 leader 裁决 A，模块位于 `Pepgent/soroi` 的 `packages/omp-soroi`）。 |
| **D4-02** | 串联 | 补 | **赞成** | 对齐 leader 裁决 E、`argon/version-ruling.md`、D2-12 与 D6-21，保证改相对 import 或升级依赖后版本身份随之改变，避免按旧身份错误复用。 |
| **D4-03** | 技术 | 缺 | **赞成** | 直接回答 `(U)` `01a18e8a #f4c96767`“package.json 怎么办”，将 JS/TS 包依赖留在中心节点项目打包解析，将二进制/Python/CUDA/驱动归入预构建模板镜像（`(U)` `01a18e3a #c5030836`）。 |
| **D4-04** | 串联 | 补 | **赞成** | 中心与远程共用 `Site`/`Placement` ADT、runner bundle、节点 bundle 与 `result.json` 回收路径，满足 `(U)` `01a18dd4 #edbaf573` 统一中间件捕获与 `layers.md:20`。 |
| **D4-05** | 串联 | 缺 | **反对** | **反例见第三节 R-1：** `inputs` 固定走 `/objects/{hash}`、`output` 走 `PUT /volumes/{run}/{step}/{call}` 在 `dry_run` 及步提交前失效，且与 D6-07 的 `/transfers/{t}` 暂存区契约不一致。按 R-1 修改后改投赞成。 |
| **D4-06** | 实现 | 缺 | **赞成** | 标量按位置原样传、`File` 映射为容器卷内可读路径 `{ kind: "file", path: "<mount>/in/<hash>" }`，节点函数无需感知执行位置，满足 `layers.md:12` 与 `(U)` `01a18e3a #09e1cc92`。 |
| **D4-07** | 串联 | 缺 | **赞成** | 拷出整个 volume 到 store 暂存区、中间件执行 `toOutputs`、正式运行随步提交入库而 `dry run` 返回即删暂存区并 `remote remove`，完整落实 `(U)` `01a18e3a #09e1cc92` 与 `01a18e1f #7ffcea0c`。 |
| **D4-08** | 技术 | 补 | **反对** | **反例见第三节 R-2：** `agent` 分支调用 `pepgent-mux dial --batch-dir soroi-batch` 与 D3-04 / D3-13 的 `dial --root ${REMOTE_MOUNT} --expose soroi-batch [--expose work]` 参数契约不一致，会导致 `dial` 参数失败且读方无法经 Mux 读取远程文件。按 R-2 修改后改投赞成。 |
| **D4-09** | 意图 + 技术 | 缺 | **赞成** | **【意图确认 · 定】** 见第一节裁决 1；每次启动随 copy-in 拷入中心安装的同一份 `Pepgent/soroi` 定制 tar 解到 `HOME=<mount>/soroi/home`，满足 `(U)` `01a18e1f #9c291fe2`、`01a18f4a #f488be08`、U23、U24。 |
| **D4-10** | 技术 | 补 | **赞成** | 长期凭据由模板部署拥有方注入，不入定制 tar 与 `RunRequest.env`（避免落入 `runs/<run>.json`），符合凭据规则与 `subagent.md:128`（注：单次启动环境参数同步包含 D3-04 的 `MUX_GENERATION`）。 |
| **D4-11** | 串联 | 缺 | **赞成** | 远程与本机 subagent 均经 `pepgent-mux dial` 连入中心 Mux，原样转发 omp RPC JSONL，满足 `(U)` `01a18e3a #09e1cc92`、`01a18e1f #9c291fe2` 与 leader 裁决 D（连接路径参数按条文声明以 D3 为准）。 |
| **D4-12** | 串联 | 缺 | **赞成** | 明确区分 `AgentRegistry` 的四态身份权威与 `remote` 的单次作业生命周期权威，停驻即结束远程作业并拷回释放资源，唤醒死 session 时再开新 generation 与新作业，符合 `(U)` `01a18e1f #678fe41a, #9c291fe2`。 |
| **D4-13** | 技术 | 缺 | **赞成** | 明确远程 `Agent` 的 transcript 与 blob“唤醒时打成 `agent.tar` 拷入 → 运行中以 `<mount>/soroi/agent/` 为唯一写权威 → 拷出后写回中心 `<主 session>/`”，闭环解决冷复活与 `history://` 读取（`(U)` `01a18e1f #678fe41a, #8e0a7e8f`）。 |
| **D4-14** | 串联 | 缺 | **赞成** | 交回工具作为唯一结果通道在中心收下 `{ 字段, 路径 }`，随后停驻远程进程、等 volume 拷出到达暂存区后解析 `work/` 下文件完成捕获，落实 `(U)` `01a18dd4 #49e6867a` 与 C-5。 |
| **D4-15** | 技术 | 补 | **反对** | **反例见第三节 R-3：** 条文写“`pepgent-mux dial --batch-dir` 监视这个目录，经多路复用器推送给读方（D3）”，与 D3-13 及 D6-P5 已定稿的“不推送 Parquet 字节，由 `dial --root ${REMOTE_MOUNT} --expose soroi-batch` 响应 `mux_list_files` / `mux_read_file` 拉取”直接冲突。按 R-3 修改后改投赞成。 |
| **D4-16** | 意图 + 技术 | — | **赞成** | **【意图确认 · 定】** 见第一节裁决 2；由 `SOROI_ROLE` 与 `writesEval` 从结构上保证单层远程与 `eval` 仅中心运行、禁止递归嵌套（`(U)` `01a18e1f #5a37a640, #3dbd0473`、U24）。 |
| **D4-17** | 技术 | 缺 | **赞成** | 以 `Pepgent/remote` 的模板目录作为唯一服务发现权威，不另建第二份机器清单，满足 `(U)` `01a18e1f #9c291fe2` 与 D2-11、D3-14。 |
| **D4-18** | 技术 | 补 | **赞成** | `生效 env = 覆盖 ?? 默认 ?? central` 纳入捕获身份，并在捕获记录中保存模板名与 `remoteRun` 来源，满足 `eval.md:79`、`store.md:16,31` 与 `layers.md:22`。 |
| **D4-19** | 技术 | 补 | **赞成** | 在 `soroi_eval` 工具参数中以产出 atom 名为键覆盖 `env`，不破坏步内三语句、无对象字面量、无魔法值的硬约束（`(U)` `01a18e3a #c5030836`、`01a18ed5 #13abc2a1, #276d1776`），并与 D5-10 完全一致。 |
| **D4-20** | 技术 | 补 | **赞成** | 见第一节确认 4；单次调用覆盖 + 函数默认已覆盖主路径需求，派生运行改环境由派生记录承载，无需额外维护跨步运行级覆盖状态。 |
| **D4-21** | 意图 | — | **赞成** | **【意图确认 · 定】** 见第一节裁决 3；完全符合 `(U)` `01a18e8a #68d36f55, #32b6f7fd` 与 `01a18e1f #7ffcea0c`。 |
| **D4-22** | 串联 | 补 | **赞成** | 满足 `(U)` U23 与 U24：远程执行的 soroi 侧能力随 `Pepgent/soroi` 定制整体打包安装，脱离上层业务也可独立走通全部流程，并可作为 Pepgent 的 agent 核心被调用（注：按 leader 裁决 A，两插件合并为单仓 `packages/omp-soroi`，store 为同仓 `packages/store`）。 |

---

## 三、反对票具体反例与能赢得赞成的修改（依 D1-12）

### R-1：针对 `D4-05`（及关联的第 2 节第 34 行、4.3、4.6、5.1、5.2）的反对票
1. **失效场景与证据（具体反例）：**
   - **场景 A（首次 `dry_run` 在 Slurm 试跑远程节点）：** 新会话尚未提交任何正式步，AI 调用 `soroi_eval({ mode: "dry_run", env: { curve_2200c: "slurm-a100" }, code: ... })` 试跑一个刚编写或修改的远程节点函数（`(U)` `01a18e8a #68d36f55`：“在slum里试跑某种算法非常正常”）。
     - 按 D6-05，store 中的运行记录 `run` 在第一次**正式步提交**（`POST /runs/steps`）时才创建；按 D6-04，正式步的序号 `step`（`seq`）也是在该步全部调用完成、拷出结束后一次提交给 store 时才分配。因此在发起 `remote run` 的时刻，无论是 `dry_run` 还是正式步执行中，**根本不存在已分配的 `{run}/{step}` 路径参数**，`output: HttpPutTar /volumes/{run}/{step}/{call}` 无法构造。
     - 若按 `D4-05` 及 `5.1`（第 200 行：“`E->>S: bundle 写入对象存储（按哈希）`”）在 `dry_run` 阶段就把未正式运行的节点 bundle 或 `dry_run` 临时输入文件写入中心副本的永久对象目录 `/objects/{hash}`，则非正式运行直接污染了中心 store，违背 **(U)** `01a18e1f #7ffcea0c`（“eval里所有的正式远程运行才需要进入store，任何非正式运行从头到尾都不进store”）、**(U)** `01a18e8a #32b6f7fd`（“dry run根本没有store”）以及 **D2-04**（“dry run 的远程 copy-in 与 copy-out 只经暂存区，从头到尾不进中心副本”）。
   - **场景 B（与 D6-07 服务端点失配）：** 在 `D6-store-service.md`（D6-07，第 35、110–120 行）中，store 服务（`Pepgent/soroi` 的 `packages/store`）定义的传输暂存区端点是 `POST /transfers` → `PUT/GET /transfers/{t}/objects/{sha256}` 与 copy-out 目标 `PUT /transfers/{t}/volume`；而 `/volumes/{run}/{step}/{position}` 在 D6 中仅是正式步提交之后的只读 `GET` 端点，没有 `PUT /volumes/{run}/{step}/{call}`。
2. **能赢得赞成的修改：**
   - 将 `D4-05` 的 `how`（并同步更新第 2 节第 34 行、4.3、4.6、5.1、5.2）改为与 **D6-07** 对齐：
     - 每次远程调用前，中间件先调用 store 服务 `POST /transfers` 创建传输暂存区 `t`；
     - `inputs`：已在中心副本里的对象用 `HttpGet` `GET /objects/{hash}`；尚未进中心副本的字节（如 `dry_run` 的节点 bundle、尚未提交的本机产出文件）先 `PUT /transfers/{t}/objects/{hash}`，远程用 `HttpGet` `GET /transfers/{t}/objects/{hash}` 拉取；
     - `output`：`HttpPutTar` 到 `PUT /transfers/{t}/volume`（`dry_run` 返回时 `DELETE /transfers/{t}`；正式运行在 `POST /runs/steps` 同一事务中把被引用的产出文件与 `soroi-batch/` 汇入中心副本后删除暂存区）；
     - 第 2 节第 34 行中的 `Pepgent/store` 同步按 leader 裁决 A 与 D2-04 改为 `Pepgent/soroi` 单仓的 `packages/store`。

### R-2：针对 `D4-08`（及关联的 4.7）的反对票
1. **失效场景与证据（具体反例）：**
   - **场景：** 远程 `Agent` 启动时，`boot.js` 执行 `D4-08` 规定的 `pepgent-mux dial --batch-dir soroi-batch -- omp --mode rpc --session …`。
   - **失效原因：** 在 `D3-network-mux.md`（D3-04、D3-13，第 58、67 行）中，`pepgent-mux dial` 的命令行契约是 `--root ${REMOTE_MOUNT} --expose soroi-batch [--expose work] -- omp --mode rpc …`（配合 `--mux`、`--agent`、`--generation`、`--token`），并不存在 `--batch-dir` 参数；且若不传 `--root ${REMOTE_MOUNT} --expose soroi-batch --expose work`，读方按 D3-13 调用 `GET /agents/{id}/files?dir=soroi-batch`（或按 `layers.md:23` 读取 `<mount>/work/` 下仍在写入的产物文件）将被 `dial` 拒绝。
2. **能赢得赞成的修改：**
   - 将 `D4-08` 中 `agent` 分支的命令改为：`exec pepgent-mux dial --root ${REMOTE_MOUNT} --expose soroi-batch --expose work -- omp --mode rpc --session …`（环境变量包含 D3-04 规定的 `SOROI_SUBAGENT_ID`、`SOROI_SUBAGENT_PARENT`、`MUX_GENERATION`、`MUX_TOKEN` 及 remote 注入的 `REMOTE_MUX`、`REMOTE_RUN`、`REMOTE_MOUNT`），去掉 `--batch-dir soroi-batch`。

### R-3：针对 `D4-15`（及关联的 4.7、5.2 第 232 行）的反对票
1. **失效场景与证据（具体反例）：**
   - **场景：** 远程 `Agent` 运行过程中，中心读方（Lab 后端 / GUI）读取远程运行中的进度与批次。
   - **失效原因：** `D4-15` 写“`pepgent-mux dial --batch-dir` 监视这个目录，经多路复用器推送给读方（D3）”，4.7 写“`--batch-dir` 推送 `mux_batch` 帧”。但 **D3-13**（`D3-network-mux.md:67`）与 **D6-P5**（`D6-store-service.md:229`）已明确否决由 `dial` 主动推送 `mux_batch` 二进制帧，改为：读方收到 RPC 事件后，调用 Mux 的 `GET /agents/{id}/files?dir=soroi-batch` 与 `GET /agents/{id}/files/{path}`，由 Mux 转成 `mux_list_files` 和 `mux_read_file` 从 `dial --root ${REMOTE_MOUNT} --expose soroi-batch --expose work` 拉取已改名的 Parquet 批次文件。两边帧协议不一致会导致运行中批次进度不可见。
2. **能赢得赞成的修改：**
   - 保留 `D4-15` 中远程角色在 `<mount>/soroi-batch/` 先写临时名再改名写出 Parquet 批次、正式运行在步提交同一事务内 `INSERT … SELECT * FROM read_parquet(…)` 汇入、`dry run` 不汇入的设计；
   - 将运行中读方的可见机制改为对齐 D3-13 与 D6-P5：由 `pepgent-mux dial --root ${REMOTE_MOUNT} --expose soroi-batch --expose work` 开放白名单目录只读访问（`soroi-batch` 只列已完成改名的文件），读方根据 RPC 事件经 Mux 的 `GET /agents/{id}/files?dir=soroi-batch` 与 `GET /agents/{id}/files/{path}`（`mux_list_files` / `mux_read_file`）拉取已改名的 Parquet 批次（同步删去 4.7 的“`--batch-dir` 推送 `mux_batch` 帧”并更新 5.2 第 232 行说明）。

---

## 四、一票否决（Argon 权限 2）

- **无（0 条）。** 全部“缺失部分（缺）”与“设计补充（补）”条目在意图方向上均符合 `(U)` 用户原话；上述 `D4-05`、`D4-08`、`D4-15` 的问题属于跨表接口与端点契约失配，已通过第三节附具体反例与修改方案的反对票处理，无需行使意图一票否决。
