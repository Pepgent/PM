# D11-A（旧 leader 单独裁决复核第一批 + F12 设计补充）Argon 选票与意图审查

- **投票人：** Argon（`D10Clone_a555.ArgonD10`，Gemini 族一票，依 D1-12、D1-16、D1-17）
- **被投文件：** `local://decisions/D11A.md`
- **事实底稿：** `local://decisions/D11-facts-A.md`、`local://decisions/D11-facts-B.md`
- **基线依据：** `pepgent-soroi/LEDGER.md`（U1–U61）、`pepgent-soroi/AGENTS.md`、`pepgent-pm/evidence/argon/D10-intent.md`、`rulings-C.md`、`flow-catalog.md`、`pepgent-pm/evidence/inv/s-eval.md`

---

## 一、逐条选票表

| ID | 票 | 理由（引 (U)） | 反例 | 分类意见 |
| --- | --- | --- | --- | --- |
| D11-T | **赞成** | 分流表完整覆盖 `leader-solo-rulings.md` 全部 51 行（含 `LR-51` 逐组件比对 `main` 与 D2–D8 正文补入的差异），无一遗漏：已由 D10 取代 7 行、已由 D10 决定 2 行、已通过正文已规定 4 行（草图差异由 `D11-WB` 对齐）、已通过契约内私有实现 9 行（`LR-06` 严格限定为原生扩展点装载既有角色，不改提示词内容，符合 `D10-08`）、已定交付/证据流程 4 行、本批表决 16 行（含 `LR-07` 与 `LR-51` regular-file 子项并入 `LR-42`）、`D11-B` 表决 8 行（`LR-10/18/21/28/35/36/37/43`）。完全满足 `D10-07` 与 `D10-intent.md` 否决红线 `V-4`，符合 `(U) U38`、`U11`、`U12`、`U14`、`U20`。 | — | 同意分流表整体定性 |
| D11-49 | **赞成** | **【设计补充审查通过，不行使否决】** Better Auth 增加 `discussion: [create, prompt]` 授予 `owner`、`researcher`、`student`，`guest` 只读；`discussion.prompt` 要求讨论的 `conversation.owner` 等于当前用户在目标 Lab 的 `member.id`，同 Lab 其他成员只读，`principal` 取 `session.user.id`。严格落实讨论“一人一会话”（`(U) 01a192a2 #ed4570ad`，D2-15、D7-04）与根会话单写方边界，防止推断放开 `guest` 写权限，符合 `(U) U1`、`U11`、`U12`、`U23`、`U38`。 | — | 同意标“技术”（是：D7-03 权限表补充） |
| D11-47A | **赞成** | **【设计补充审查通过，不行使否决】** 生命周期流 `cursor` 为十进制递增字符串，`after` 严格大于（缺省 `"0"`），在 `run_started`/`run_ended`/`run_aborted` 同一提交事务分配并持久化于 `events` 表；旧库升级按 `(at, run_id, seq)` 一次性分配并写明仅代表首次发布顺序。保持 `events` 表为唯一权威，支撑运行事件订阅（F30），符合 `(U) 01a18e1f #9ff9d2be`、`U23`。 | — | 同意标“串联”（是：D6-06 游标格式补充） |
| D11-47B | **赞成** | **【设计补充审查通过，不行使否决】** 单运行事件流 SSE 的 `id` 为十进制 `seq`、`event` 为 `kind`、`data` 为 `RunEvent`，`after` 严格大于（缺省 0），运行已结束时发完历史事件即结束流，支撑 GUI 实时订阅与时间轴（F10、F26），符合 `(U) 01a18e1f #9ff9d2be`、`U23`。 | — | 同意标“串联”（是：D6-09 wire 补充） |
| D11-47C | **赞成** | **【设计补充审查通过，不行使否决】** 修订 LR-47：每个事实只由一处事件携带（调用类事件携带 `call: GraphNode` 与入边 `edges`；`step_committed` 携带本步新定义的根节点与名字；派生运行 `run_started` seq 1 携带物化的继承调用、名字、新根与边），消费方按序插入，消除原 LR-47 同一事实双发与消费方 upsert 对账，符合 D6-09 与 `(U) U23`。 | — | 同意标“串联”（是：D6-09 wire 补充） |
| D11-29A | **赞成** | **【设计补充审查通过，不行使否决】** 将 D7-03 的 `approve` 细化为 `approval: [any, ownExperiments]`（`owner` 为 `any`，`researcher` 为 `ownExperiments`，`student`/`guest` 无），`startWithoutApproval` 授予 `owner`/`researcher`，`buildImages` 与 `manageMembers` 仅授予 `owner`，并删去原 LR-29 无依据的 D9 归类。与 AI4S 原型（`(U) 01a18e1f #e3692177` 保留业务层形态）各角色的 `canApprove` 完全对齐，且不擅自收缩范围（`(U) U2`、`U23`）。 | — | 同意标“技术”（是：D7-03 权限细化） |
| D11-29B | **赞成** | 实验创建者取草稿 `origin.discussion` 所属讨论的 `conversation.owner`，`ownExperiments` 判定审批人在目标 Lab 的 `member.id` 等于该 `conversation.owner`，与 D2-15“一人一会话”（`(U) 01a192a2 #ed4570ad`）及 `D11-49` 同一身份口径，不建第二份创建者记录。 | — | 同意标“技术”（否） |
| D11-30 | **赞成** | **【设计补充审查通过，不行使否决】** `/sign-in` 与 `/api/auth/*` 为公开认证入口，未登录访问页面重定向 `/sign-in`、调用返回 401；不开放公开注册与自助建 Lab，初始管理员与首个 Lab 由部署一次性 seed 创建，seed 完成后 Lab Web 才开始服务，Web 进程不自动 seed。符合 D7-03、D8 LAB-03 与生命周期先后边界（`(U) U2`、`U23`）。 | — | 同意标“技术”（是：D7-03 认证入口细化） |
| D11-32 | **赞成** | ResourceSync 与 Stack 均采用 `files-on-host`（中心主机维护 `Pepgent/deploy` 专用 clone，apply 前更新到 `origin/main`，Core 与 Periphery 只读挂载），并删去原 LR-32 将 `repo-backed` 塞入 D9 的无依据归类，符合 D2-23、D10-14 与 `(U) U2`、`U23`。 | — | 同意标“技术”（否） |
| D11-08 | **赞成** | **【设计补充审查通过，不行使否决】** 已完成的 `GraphNode.Call` 携带 `capture: Hash`（由 store 权威返回，消费方不自行推算），单字段输出允许空字符串 `""`（`SINGLE_FIELD`），atom 名仍非空，符合 `(U) 01a18e1f #64246eaf`（store 落盘管理值与捕获复用）与 D6。 | — | 同意标“串联”（是：D6 wire 补充） |
| D11-11A | **赞成** | **【设计补充审查通过，不行使否决】** Activity 视图中被中止的调用为独立变体 `AbortedCall`（不带 `body`），与 `RunGraph` 的 `AbortedCall`（D8 STO-03）一致，符合 ADT 精确建模与 `(U) U23`。 | — | 同意标“串联”（是：D6 ADT 补充） |
| D11-11B | **赞成** | **【设计补充审查通过，不行使否决】** `CheckError` 增加 `pin_key{ name }` 变体，当 `pins` 指向根 atom 或非调用输出时返回，精确落实 D5-09、D5-11(8) 与 `(U) 01a18e8a #48078e3a`（dry run 外部钉住节点调用返回值）。 | — | 同意标“串联”（是：D5 ADT 补充） |
| D11-13A | **赞成** | **【设计补充审查通过，不行使否决】** `/compare` 的 `Pair` 增加 `SameValue`（根值相同）与 `Aborted{ side }`，`SameCapture` 仅用于已完成调用，`Changed.fields` 每项为 `Both{a,b}` / `OnlyA{a}` / `OnlyB{b}`，完整支撑跨运行逐项比较（F13，`(U) 01a18e8a #4da22ab4`）。 | — | 同意标“串联”（是：D6 ADT 补充） |
| D11-13B | **赞成** | **【设计补充审查通过，不行使否决】** `/compare` 的 `map` 参数定为 URL 编码的 JSON 数组 `[rootA, rootB][]`，消除分隔符歧义，支撑 F13（`(U) 01a18e8a #4da22ab4`）。 | — | 同意标“串联”（是：D6 wire 补充） |
| D11-19 | **赞成** | **【设计补充审查通过，不行使否决】** `DeriveCommit` 必带 `EvalTransfer`（纯标量改动也开空 transfer），只晋升新根引用字节；派生运行 R' 的 `run_started`（seq 1）作为物化锚点写入继承的已完成调用、名字与新根（不写步、不发 `step_committed`），第一个正式步 C 为 R' 第一步；P 中被中止调用留在 P，受影响输入在 R' 重新未消费，不自动 stop。完全契合 `(U) 01a18e1f #a0d22b8a`（改参数或函数体派生新运行永远是正式运行）、`(U) 01a18efe #9e2d37a1`（无重放，按身份复用上游）与 D6-07、D6-16。 | — | 同意标“串联”（是：D6 wire 补充） |
| D11-24 | **赞成** | **【设计补充审查通过，不行使否决】** volume 清单成员限定为 regular file（不含符号链接与空目录）；远程 `Executed`、`Human`、`Aborted` 发布对应位置已接受的 volume，`Inherited` 按源坐标只读引用父运行 volume（不复制），中心 `Executed`、`Adopted` 与未引用暂存卷不发布，F18 判据读作“全部 regular 文件”。符合 `(U) 01a18e3a #09e1cc92`（远程临时 volume 结束后拷回浏览，F18）与按内容寻址原则。 | — | 同意标“串联”（是：D6 volume 语义补充） |
| D11-12 | **赞成** | 各消费方 `models.yml` 对网关 provider 写 `auth: none`，由 `PEPGENT_GATEWAY_TOKEN` 环境变量构造 `Authorization` 请求头，token 拥有者与注入方式不变（D8-06），消除 provider 发现缓存导致的模型名双前缀，符合 `(U) U13`、`U23`。 | — | 同意标“技术”（否） |
| D11-01 | **赞成** | **【设计补充审查通过，不行使否决】** 被 `dial` 托管的 `omp` 正常退出报原退出码，因信号结束报 `128 + 信号编号`；连接 actor 布局、队列容量与发送时限归 Mux 私有实现。符合 D3 退出锚点与 `(U) 01a18e3a #09e1cc92`。 | — | 同意标“串联”（是：D3 wire 补充） |
| D11-04A | **赞成** | 恢复 D8 `IMG-05` 已通过的完整范围：`central` 镜像包含 `Pepgent/soroi` 默认分支的 `e2e/` 依赖与 `standin` 入口，撤销 LR-04 的擅自缩减，符合 `(U) U2`（“不要擅自收缩”）。 | — | 同意标“实现”（否） |
| D11-04B | **赞成** | 修正 D2-13 执行时点：在 D8-16 列入 D9 输入的容器页 Komodo Build 流水线实现前，`omp-agent`、`central`、`lab-web`、`remote-step` 镜像用 `docker buildx` 构建并推送到 `pepgent-registry`（ENV-01），使开发与统一 e2e 不受 D9 项阻塞，符合 `(U) U2`、`U23`。 | — | 同意标“技术”（否） |
| D11-42 | **赞成** | **【设计补充审查通过，不行使否决】** 每次 eval 对会话 worktree 中 tracked 及 untracked/non-ignored 的 regular file（保留未提交改动）建私有快照并按 lockfile 冻结安装依赖，检查器与 `Bun.build` 读同一快照且不跨 eval 复用；节点对 `omp-soroi` 公共构造器的导入解析到当前已加载插件，`lab-library` 将 `omp-soroi` 声明为 optional peer、免手工 symlink。符合 `(U) 01a18e8a #8d913d2f`、`#f4c96767`（处理依赖并在目标环境还原执行）、`(U) 01a18e1f #47b71e05`（节点库直接 import 后传参）与 D7-04/D7-11。 | — | 同意标“串联”（是：D4 依赖恢复与节点项目约束的补充） |
| D11-44 | **赞成** | **【设计补充审查通过，不行使否决】** 节点源码从 `node:module` / `module` 只以静态具名导入使用 `isBuiltin` 与 `builtinModules`，模块加载器 API（`createRequire`、`Module`、`register`、`registerHooks`、`process.getBuiltinModule`）不在节点可用范围内，确保 bundle 闭包静态确定、版本哈希覆盖实际执行代码，符合 `(U) 01a18e8a #8d913d2f` 与 D4-01。 | — | 同意标“串联”（是：D4 节点项目约束补充） |
| D11-WB | **赞成** | 本表通过后由秘书将通过结论直接替换进 D2、D3、D4、D5、D6、D7、D8 对应位置及 `design/eval.md`、`design/store.md`、`lab-library/README.md`，不留更正记录，符合 `AGENTS.md` 第 3 条与文档直接替换规则。 | — | 同意标“实现”（否） |
| D11-F12 | **赞成** | **【设计补充审查通过，不行使否决】** 根语句增加内建形式 `const <name> = file("<相对路径>")`（仅允许作为单标识符根声明的初始化器，普通节点调用仍严禁字面量魔法值），路径相对根 omp 进程 cwd（会话 worktree，衔接 D7-05 `lab_open_artifact` 拷入 `inputs/`），值身份为文件字节 SHA-256，经 `EvalTransfer` 暂存并在正式提交时转入对象目录（dry run 删除 transfer），`lab-library` 的 `run_*` 节点 `film` 参数改为 `File`，F12 判据不缩减。完全符合 `(U) 01a18ed5 #276d1776`（禁止调用处传魔法值，永远只有具名 atom）、`(U) 01a18ed5 #440c8605` 与 `(U) 01a18e8a #e0de24df`（atom 为标量或单个 `File`）、`(U) 01a18e8a #cab573e1`（一值多分支消费）及 `(U) U2`、`U23`（不擅自收缩 F12 与 F31）。 | — | 同意标“串联”（是：eval 语句形状、检查器、根物化与 lab-library 节点签名补充；**不主张改标“意图”，无需导师仲裁**，理由见下节第 3 点） |

---

## 二、对四项特别核对要求的专项结论

1. **`D11-T` 分流表是否满足 `D10-intent.md` 的 `V-4`（每一行都经领导小组复核）：**
   - **完全满足，未触发 `V-4`。** `leader-solo-rulings.md` 共 51 行（`LR-01` 至 `LR-51`），`D11-T` 对全部 51 行逐一定位了去向（7 行已由 D10 取代、2 行已由 D10-11/12 决定、4 行已通过正文已规定、9 行属已通过契约内私有实现、4 行属已定交付/证据流程、16 行及 `LR-51` regular-file 子项在本批 `D11-A` 逐条表决、8 行归 `D11-B` 逐条表决），没有任何一行被跳过或免审。

2. **对“缺失部分或设计补充：是”条目的否决权审查（依 `U11`、`D1-16`）：**
   - 本表标为“缺失部分或设计补充：是”的条目共 **17 项**：`D11-49`、`D11-47A`、`D11-47B`、`D11-47C`、`D11-29A`、`D11-30`、`D11-08`、`D11-11A`、`D11-11B`、`D11-13A`、`D11-13B`、`D11-19`、`D11-24`、`D11-01`、`D11-42`、`D11-44`、`D11-F12`。
   - 经逐条对照 `(U)` 用户原话（`LEDGER.md` U1–U61 及历史会话 `(U)` 记录），上述 17 项均与用户本意一致，**全部审查通过，0 项行使否决权**。

3. **`D11-F12` 中 `design/eval.md:159` 与 `:166` 的 `(U)` 来源核查及分类意见（依 `D1-16`、`D1-17`）：**
   - **`design/eval.md:166`“没有魔法值”有明确 `(U)` 来源：** 出自 `(U) session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/276d1776`（“如果考虑语法检查，实际上还有一个限制，是禁止任何魔法值，永远只有atom，就比如说，我现在跑到一半，我要临时补一个2200度的回火模拟，那这2200直接传进去吗”）。其本意是**调用节点函数时参数只能传已命名的 atom 标识符，不能在节点调用参数里直接传字面量魔法值**，而必须先定义为具名根 atom。
   - **`design/eval.md:159`“（只允许数字、字符串、布尔字面量）”无排斥 `File` 根 atom 的 `(U)` 来源：** 用户在 `(U) 01a18ed5 #440c8605` 与 `(U) 01a18e8a #e0de24df` 中确定的是 atom 为扁平标量或单个 `File`（`Atomic = number | string | boolean | File`）；`:159` 括号里仅列标量字面量是 `(A) 01a18ed5 #60620364` 归纳三语句时漏写了 `File` 根 atom 的初始化语法，导致与 `design/store.md:64`（根值与文件身份）、D6 `Value`（含 `file`）、D7-07（讨论产物变成运行根 `File` 输入）及 D8 F12 第②条脱节。
   - **结论与分类意见：** `D11-F12` 用 `const <name> = file("<相对路径>")` 作为根 atom 定义的专用内建形式（同时保持节点函数调用参数禁字面量魔法值），既严守了 `#276d1776`“无魔法值、先绑定具名根 atom 再传参”的 `(U)` 本意，又补齐了 `File` 根 atom 的语法入口。因为 `:159` 的仅标量限制并非 `(U)` 原话，且本条本质是把 `eval.md`、检查器、`EvalTransfer`、`store` 与 `lab-library` 串联闭合的设计补充，**我同意起草者将 `D11-F12` 标为“串联”（设计补充：是），不主张改归“意图”，无需交导师仲裁（D1-17）**。

4. **与 `(U) U2`“不要擅自收缩”的关系：**
   - 本表删去了 `LR-29`（逐成员开关）与 `LR-32`（`repo-backed` ResourceSync）中旧 leader 越权添加的两处 D9 归类（不在已通过的 D8-16 清单内，原型叶子字段由 D8-15 / D9 机械叶子分类自然覆盖）；
   - `D11-04A` 撤销了 `LR-04` 对 `IMG-05` 中 `e2e/` 依赖与 `standin` 入口的缩减；
   - `D11-F12` 拒绝了将 F12 降级为派生 `File` 或字符串根的缩减方案。
   - 以上处理严格贯彻了 `(U) U2`（“不要擅自收缩”）与 `(U) U23`（“能走通我说的所有流程”）。

---

## 三、三类结论汇总

1. **意图审查与否决权核查（Argon 说了算）：**
   - `D11-T` 与全部 23 条具体条目均无违背 `(U)` 用户原意之处；对 17 项“缺失部分或设计补充：是”的条目**不行使否决权（否决 0 项）**。
2. **对分流表与各条目的投票：**
   - `D11-T`、`D11-49`、`D11-47A`、`D11-47B`、`D11-47C`、`D11-29A`、`D11-29B`、`D11-30`、`D11-32`、`D11-08`、`D11-11A`、`D11-11B`、`D11-13A`、`D11-13B`、`D11-19`、`D11-24`、`D11-12`、`D11-01`、`D11-04A`、`D11-04B`、`D11-42`、`D11-44`、`D11-WB`、`D11-F12`（共 24 项）：**全部投赞成（反对 0 项）**。
3. **分类争议：**
   - **0 项**（同意 `D11-F12` 标为“串联”，无需导师仲裁）。
