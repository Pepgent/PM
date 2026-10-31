# D4 远程执行的闭合契约 — Argon 第 2 轮选票（D4-argon-r2）

- **议题：** D4 远程执行的闭合契约：远程 Program、远程 Agent、运行环境模板（`pepgent-pm/evidence/decisions/D4-remote-exec.md`，第 2 轮修订稿）
- **投票席位：** `argon`（Gemini 族一票，依 D1-12、D1-16、D1-17）
- **重投范围：** 第 1 轮后修改的 19 个条目（`D4-02`、`03`、`05`、`06`、`07`、`08`、`09`、`10`、`11`、`12`、`13`、`15`、`16`、`17`、`18`、`19`、`20`、`21`、`22`）；未改动的 `D4-01`、`D4-04`、`D4-14` 维持第 1 轮**赞成**。
- **第 2 轮计票结果：**
  - **重投 19 条：19 赞成 / 0 反对**（第 1 轮 Argon 反对的 `D4-05`、`D4-08`、`D4-15` 均已按反例完整修正，全部改投**赞成**）。
  - **全表 22 条总计：22 赞成 / 0 反对 / 0 否决。**
  - **对 §8 不修改回应的核准：** 完全赞同 §8 对导师在 `D4-09`（以 `(U)` `01a18f4a #f488be08`“不考虑两侧版本一致，乃至不考虑版本问题”驳回版本能力校验）与 `D4-10`（设计阶段只写主路径，且 `MUX_TOKEN` 仅本代有效）的反驳。

---

## 一、意图裁决复核（Argon 权限 1）

- **`D4-09`（分类：意图 + 技术）：【定 · 符合用户原意】**
  - 修订后同时拷入 `Pepgent/soroi` 定制 tar（解到 `HOME=<mount>/soroi/home`）与中心会话 cwd 下 Lab 库的 `.omp/` 定制 tar（解到 `<mount>/work/.omp/`），使远程 `Agent` 在用户级与 project 级加载的定制均与中心主 agent 逐字节相同，同时隔离宿主 `~/.omp` 与 `omomp`、不校验两侧 omp 二进制版本。完全符合 `(U)` `01a18e1f #9c291fe2`、`(U)` `01a18f4a #f488be08`、`(U)` LEDGER U23、U24。
- **`D4-16`（分类：意图 + 技术）：【定 · 符合用户原意】**
  - 归属更新为 `packages/omp-soroi`（leader 裁决 A），结构上保证 `eval` 只在中心运行且禁止递归嵌套、远程 `Agent` 单层且不注册 `soroi_task`、不含 `omomp` 的 `fork`。完全符合 `(U)` `01a18e1f #5a37a640, #3dbd0473`、`(U)` LEDGER U24。
- **`D4-21`（分类：意图）：【定 · 符合用户原意】**
  - `dry run` 远程调用真实执行未 pin 部分，经 `/transfers/{t}` 暂存区回收结果并在调用返回时 `DELETE /transfers/{t}`，批次不汇入、捕获不写、对象存储不写。完全符合 `(U)` `01a18e8a #68d36f55, #32b6f7fd`、`(U)` `01a18e1f #7ffcea0c`。

---

## 二、第 2 轮逐条重投（19 条修改项）

| ID | 起草分类 | 补 | Argon 第 2 轮投票 | 理由（附 `(U)` 与跨表核对） |
| --- | --- | --- | --- | --- |
| **D4-02** | 串联 | 补 | **赞成** | 已明确区分 bundle 字节去向：正式运行首次提交时存 `PUT /objects/{hash}`（D6-21），`dry run` 仅放入 `/transfers/{t}` 暂存区、不写对象存储，严守 `(U)` `01a18e1f #7ffcea0c` 与 `01a18e8a #32b6f7fd`。 |
| **D4-03** | 技术 | 缺 | **赞成** | 打包器在 `Bun.build` 前按 Lab 库 lockfile 自动恢复依赖（以 lockfile 哈希作派生缓存键），消除人工 `bun install` 前提，落实 `(U)` `01a18e8a #f4c96767`。 |
| **D4-05** | 串联 | 缺 | **赞成**（由反对改赞成） | 已按第 1 轮反例 R-1 与导师意见完整修正：每次远程调用先 `POST /transfers` 取 `t`，调用请求写成 `soroi/call.json` 拷入，未入中心副本的字节走 `PUT/GET /transfers/{t}/objects/{hash}`，拷出走 `PUT /transfers/{t}/volume`，彻底解决 `dry_run` 与步提交前无 `{run}/{step}`、污染 `/objects` 及大字符串撑爆环境变量问题，与 D6-07 完全闭合。 |
| **D4-06** | 实现 | 缺 | **赞成** | 入参放入 `soroi/call.json`，`File` 按 D4-05 第 3 步拷入 `<mount>/in/<hash>` 并展开为绝对路径，满足 `layers.md:12` 与 `(U)` `01a18e3a #09e1cc92`。 |
| **D4-07** | 串联 | 缺 | **赞成** | 拷出统一至 `PUT /transfers/{t}/volume`，以 `remote status -> ended` 为到达确认锚点，经 `GET /transfers/{t}/files/{path}` 读取产出，正式提交同事务转正删暂存区、`dry run` 返回时 `DELETE /transfers/{t}`，与 D6-07 完全对齐。 |
| **D4-08** | 技术 | 补 | **赞成**（由反对改赞成） | 已按第 1 轮反例 R-2 与导师意见修正：程序名统一为 `omp-rpc-mux`，子进程以展开后的绝对路径直接 exec，`agent` 分支执行 `omp-rpc-mux dial --root <mount> --expose soroi-batch --expose work -- omp --mode rpc …`，删去 `--batch-dir`，与 D3-04、D3-13 完全对齐。 |
| **D4-09** | 意图 + 技术 | 缺 | **赞成** | **【意图确认 · 定】** 同时拷入 D2-25 的 soroi 定制 tar 与 Lab 库的 `.omp/` 定制 tar，保证用户级与 project 级定制与中心主 agent 逐字节一致（`(U)` `01a18e1f #9c291fe2`、`01a18f4a #f488be08`、U23、U24）；赞同 §8 对导师版本校验反例的驳回。 |
| **D4-10** | 技术 | 补 | **赞成** | `RunRequest.env` 启动参数已补齐 `MUX_GENERATION` 并写明由 Mux 在 `mux_generation` 帧签发，与 D3 §4、D3-07 一致；赞同 §8 对导师反例的主路径回应。 |
| **D4-11** | 串联 | 缺 | **赞成** | 写方连接、开代、拨入 URL 参数（含 `generation`、`token`、`host`、`run`）与本机 subagent 的 `omp-rpc-mux dial` 启动已与 D3 §4、D3-07、D3-08 及 leader 裁决 D 逐字对齐。 |
| **D4-12** | 串联 | 缺 | **赞成** | 嵌套顺序已按实际开始/结束锚点修正为 `agent 身份 ⊃ 写方声明 ⊃ remote 作业与 volume ⊃ 体 ⊃ 进程代`，符合生命周期规则与 `(U)` `01a18e1f #678fe41a, #9c291fe2`。 |
| **D4-13** | 技术 | 缺 | **赞成** | transcript 与 blob 经暂存区 `t` 拷入拷出，并明确 `eval` 调用内由中间件开暂存区、`eval` 调用外唤醒由 subagent 模块自行 `POST /transfers` 并在写回后 `DELETE`，闭环无缺口。 |
| **D4-15** | 技术 | 补 | **赞成**（由反对改赞成） | 已按第 1 轮反例 R-3 修正：归属改为 `packages/omp-soroi` eval 模块的 `RemoteChild` 角色，运行中读方按 RPC 事件经 `GET /agents/{id}/files?dir=soroi-batch` 与 `GET /agents/{id}/files/{path}` 从 `dial --root <mount> --expose soroi-batch` 按需拉取已改名的 Parquet 批次，不推送，正式步同事务 `read_parquet` 汇入，与 D3-13、D6-07、D6-P5 完全一致。 |
| **D4-16** | 意图 + 技术 | — | **赞成** | **【意图确认 · 定】** 归属更新为 `packages/omp-soroi`（裁决 A），结构保证单层远程与中心 `eval`（`(U)` `01a18e1f #5a37a640, #3dbd0473`、U24）。 |
| **D4-17** | 技术 | 缺 | **赞成** | 服务发现统一引用 D4-08 模板约定与 `remote templates` 单一权威，与 D2-11、D3-14 对齐。 |
| **D4-18** | 技术 | 补 | **赞成** | 捕获身份中的运行环境改为不可变的 `EnvIdentity`（镜像 digest + 影响执行的模板配置哈希，由 `remote templates` 返回或中心容器部署注入），捕获记录另存模板名与 `remoteRun` 供展示溯源，彻底避免换镜像后误复用旧结果。 |
| **D4-19** | 技术 | 补 | **赞成** | 检查器将产出 atom 名键归并到调用，同一调用被赋予不同模板时以 `env_conflict` 拒绝，与 D5-10、D5-11 完全闭合。 |
| **D4-20** | 技术 | 补 | **赞成** | 已对齐 leader 裁决 C 与 D6-16：派生运行不按已存步重跑，新写的步各自带 D4-19 覆盖。 |
| **D4-21** | 意图 | — | **赞成** | **【意图确认 · 定】** 依托修正后的 D4-05 `/transfers/{t}` 暂存区完整实现“dry run 远程真跑、不写对象存储与中心副本”（`(U)` `01a18e8a #68d36f55, #32b6f7fd`、`01a18e1f #7ffcea0c`）。 |
| **D4-22** | 串联 | 补 | **赞成** | 已对齐 leader 裁决 A 与 D2-25：单仓 `Pepgent/soroi` 内含单插件包 `packages/omp-soroi` 与 `packages/store`，满足 `(U)` U23、U24。 |

---

## 三、一票否决（Argon 权限 2）

- **0 条（无否决）。**
