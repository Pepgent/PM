# D11-A 旧 leader 单独裁决复核：分流表与在开发切片相关契约（附 F12 设计补充）

起草：leader 分身 D10Clone（Claude 族）。依据：D10-07（[PM#16](https://github.com/Pepgent/PM/issues/16)，`pepgent-pm/evidence/decisions/D10-repo-delivery.md`）规定 D11 两步：先对 51 行候选的去向投一票，再对“契约或范围”类逐条投票。本批 D11-A 完成第一步；第二步覆盖被正在开发的切片（LAB-04..12、WEB-*、DEP-03、IMG-04/05 补齐、STO-05）直接消费的契约行；其余契约行归下一批 D11-B。
另含一条非 LR 来源的设计补充 D11-F12（E2E-12 在开发中上报），不计入分流表的 51 行，按缺失设计规则独立表决。
事实底稿：`local://decisions/D11-facts-A.md`（FA，LR-01..25）、`local://decisions/D11-facts-B.md`（FB，LR-26..51），由两名只读取证者逐条读取评论原文、D2–D8 正文与各仓 main 代码写成。LR = `pepgent-pm/evidence/decisions/leader-solo-rulings.md`；D2…D8 = 同目录决策正文，行号为 2026-11-01 当前文本，并附决策或切片 ID。
讨论者：discuss:steady（D11Steady）、discuss:divergent（D11Divergent）；采纳与不采纳见文末。
本表只写主路径；失败分支不在设计内（`.claude/rules/design-assumes-it-works.md`）。

## 第一步：分流表（D11-T，整表一票）

| 去向 | LR 行 | 依据 |
| --- | --- | --- |
| **已由 D10 取代**（随 D10 失效） | LR-05、LR-09、LR-27、LR-31、LR-33、LR-41、LR-50 | D10-05 的 where 列明列 LR-05/09/27/31/33/41；LR-50 的切片级门禁与放权广播由 D10-00/05/08/09 取代 |
| **已由 D10 决定** | LR-39（D10-11）、LR-45（D10-12） | PM#16 |
| **已通过正文已规定** | LR-02、LR-03、LR-16、LR-26 | LR-02：D8 STO-02/03（D8:251–252）；LR-03：D8 REM-01/02/07（D8:306–307、311）；LR-16：D8-02/03（D8:73–74）与 DIST-02（D8:298）；LR-26：D4:61、D6-03（D6:31–32）、D6:160–168。D6、D4 接口草图与 D8 不一致之处按 D11-WB 替换 |
| **不形成新增产品契约：已通过契约内的私有实现** | LR-06、LR-14、LR-17、LR-20、LR-22、LR-23、LR-38、LR-40、LR-48 | 理由见 FA、FB 第 5 列。LR-06 只处理如何经 omp 原生扩展点装载 D2/D5 已定的 `soroi-main` 角色与既有内容（FA LR-06：根提示词 hook 与子进程包根装载尚未落地，由定制工程师按 D5 补齐），不借此新增或修改提示词内容（D10-08） |
| **不形成新增产品契约：已定的交付或证据流程** | LR-15、LR-25、LR-34、LR-46 | 源码 owner 修 notice、损坏发行物拒绝属于行为探针而非 hash 证据、截图归档 PM、文档随切片 PR；均在 D8-12、D8-14 与 GIT 规范内 |
| **契约或范围，本批表决** | LR-01、LR-04、LR-07（并入 LR-42 最终版）、LR-08、LR-11、LR-12、LR-13、LR-19、LR-24、LR-29、LR-30、LR-32、LR-42、LR-44、LR-47、LR-49；LR-51 去重剩余的“Lab 源快照只收 regular file”并入 LR-42 | 直接消费者含正在开发的 LAB、WEB、DEP、IMG、STO-05 切片（FA、FB 第 4 列） |
| **契约或范围，D11-B 表决** | LR-10、LR-18（与 LR-35、LR-36 并入最终版 LR-37）、LR-21、LR-28、LR-43 | 直接消费者主要是 SOR、remote、E2E；LAB-12、WEB-06 只读 D8 REM-07 已有的窄 `RunStatus`。按 D10-07，消费这些未追认契约的新切片先等对应条目，无关实现照常 |
| **LR-51 总项** | 去重后各差异归入 LR-37、LR-42、LR-43、LR-44、LR-47、LR-49 | FB LR-51 节逐组件比对 main 与正文；无公开镜像的私聊内容不可还原，不推测 |

## 第二步：本批契约条目

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D11-49 | **讨论的写权限（LR-49）** | D7-03（D7:63）四项权限；D2-15“一人一会话”；D7-04（D7:64）`conversation.owner`；D7-07 讨论读取；D8 LAB-04（D8:327）；[Pepgent#13 BLOCKED](https://github.com/Pepgent/Pepgent/issues/13#issuecomment-6554704678)；main `apps/web/src/server/lab/access.ts#statements` 无 `discussion`，也无公开 create/prompt 命令（FB LR-49 节） | Better Auth access control 增加语句 `discussion: [create, prompt]`，授予 owner、researcher、student，不授予 guest（guest 对讨论只读）。`discussion.prompt` 另要求该讨论的 `conversation.owner` 等于当前用户在目标 Lab 的成员身份（Better Auth `member.id`，D7-04 已定的归属口径）；同 Lab 其他成员可读，不能发 prompt。人类消息的 `principal` 取 `session.user.id`。角色权限由 Better Auth 判定，讨论归属由 Lab 的 `conversation` 表判定 | **选定：** 与 D2-15“一人一会话”一致，与 D10-12 的 guest 只读同一口径。**备选：** 只要求成员身份：guest 能开讨论并驱动根会话，属于 AG 第 1 条禁止的推断授权。**备选：** 同 Lab 任一成员可向别人的讨论发 prompt：一个根会话出现多个人类写方 | 技术 | 是：D7-03 权限表补充 |
| D11-47A | **生命周期游标（LR-47）** | D6-06（D6:34）、`/stream/lifecycle` 草图（D6:217）；STO-05（D8:254）；[soroi#190 BLOCKED](https://github.com/Pepgent/soroi/issues/190#issuecomment-6554749773)；main 未落地，仅本地在途 worktree `issue-190-durable-sse-ff0716f` 已编码（FB LR-47 节） | `cursor` 是十进制字符串，按提交顺序递增；`after` 续读取严格大于它的事件，缺省 `"0"`。store 在提交 `run_started`、`run_ended`、`run_aborted` 的同一事务里为它们分配游标并持久化在 `events` 表。已有数据的 store 首次升级时按 `(at, run_id, seq)` 一次性分配游标，这是首次发布顺序，不代表历史真实的跨运行提交顺序。流持续到订阅方断开 | **选定：** 游标与事件同一权威（events 表）。**备选：** 用时间戳作游标：同一时刻多个事件时续读顺序不确定 | 串联 | 是：D6-06 游标格式补充 |
| D11-47B | **单运行事件流的续读与结束（LR-47）** | D6-09（D6:37）、`/runs/{run}/stream` 草图（D6:216）；STO-05 | SSE 的 `id` 为十进制 `seq`，`event` 为事件 `kind`，`data` 为 `RunEvent`；`after` 续读取严格大于它的事件，缺省 0。运行已结束时，历史事件发完后结束流 | **选定：** 浏览器原生 SSE 续读语义直接可用。**备选：** 已结束运行的流保持打开：订阅方无从得知不会再有事件 | 串联 | 是：D6-09 wire 补充 |
| D11-47C | **事件携带的记录：每个事实只由一处携带（LR-47，修订）** | D6-09“连同它们引用的记录”（D6:37）；`RunEvent` 草图（D6:210–215）；D6-16 派生物化（D6:44）；在途实现 `store.ts:573–609` 把节点与边同时放进 `step_committed.records` 与各 `call_*` 事件 | 调用类事件（`call_started`…`human_handback`）携带 `call: GraphNode`（D6 已定）与该调用的入边 `edges`，是调用节点与其入边的唯一携带者。`step_committed` 携带本步新定义的根节点与名字。派生运行的 `run_started`（seq 1，D11-19）携带物化的继承调用、名字、新根与边，因为它们没有各自的调用事件。消费方按事件顺序插入，不需要按键合并 | **选定：** 一个事实一个携带者，契约面最小，贴近 D6 已通过的 `call: GraphNode`。**备选（LR-47 原文）：** `run_started`、`step_committed` 带完整 `records`，调用事件也带同一批节点与边，消费方按键 upsert：同一事实发两次、靠对账维持一致。**备选：** 事件不带记录，消费方回读 `graph`：违背 D6-09 原文 | 串联 | 是：D6-09 wire 补充 |
| D11-29A | **审批范围与角色授予（LR-29）** | D7-03（D7:63）、D7-06（D7:66）、D7-10（D7:70）；main `access.ts#LAB_ROLE_POLICY`；原型 `apps/web/src/client/services/lab-fixture/compute.ts:4596、4643、4690、4732` 的 `canApprove`：owner“运行、镜像构建、成员变更”，researcher“自己实验的运行”，student“需审批：运行、容器” | D7-03 的 `approve` 细化为 Better Auth 语句 `approval: [any, ownExperiments]`：owner 授予 `any`（含他人实验与自动化）；researcher 授予 `ownExperiments`；student、guest 无审批权。`startWithoutApproval` 授予 owner、researcher；`buildImages` 只授予 owner；`manageMembers` 只授予 owner | **选定：** 与原型各角色的 `canApprove` 文案一致，已在 main 落地。**备选：** 保持布尔 `approve`：researcher 要么能批所有人的实验，要么一个都不能批，与原型“自己实验的运行”不符 | 技术 | 是：D7-03 权限细化 |
| D11-29B | **“自己的实验”的判定** | D7-06 草稿 `origin.discussion`（D7:128）；D7-04 `conversation.owner`；D11-49 | 实验的创建者是草稿 `origin.discussion` 所属讨论的 `conversation.owner`；`ownExperiments` 判定为：审批人在目标 Lab 的 `member.id` 等于该 `conversation.owner`。不新增字段 | **选定：** 一人一会话下讨论 owner 即草稿创建者，与 D11-49 同一身份口径，不增加第二份创建者事实。**备选（LR-29 执行者提议）：** 草稿另存不可变 `user.id`：与 `conversation.owner` 形成两份创建者记录 | 技术 | 否 |
| D11-30 | **认证入口、注册与初始管理员（LR-30）** | D7-03（D7:63）、D7-02（D7:62）；D8 LAB-03（D8:326）“管理员账号由部署种子创建”；main `server/lab/auth.ts`、`seed.ts`、`app/start.ts#admitRequest`；deploy main `stacks/pepgent-central/compose.yaml` 的 `auth-seed`（FB LR-30 节） | `/sign-in` 与 `/api/auth/*` 是公开的认证入口；未登录访问 Lab 页面重定向到 `/sign-in`，未登录的 Lab 调用返回 401。不开放公开注册与自助建 Lab：成员经邀请加入（D7-03），初始管理员与首个 Lab 由部署的一次性 seed 创建；seed 完成后 Lab Web 才开始服务，Web 进程不做 seed。D7-03 已有的邮箱密码与 LAB-03 已有的部署种子不在本条重投 | **选定：** 与 D7-03“邀请即入口”一致，seed 与 Web 对业务库的先后明确。**备选：** 开放注册：任何人可建账号进入 Lab 面，D7-03 未授权。**备选：** Web 启动时自动 seed：Web 进程同时承担一次性初始化 | 技术 | 是：D7-03 认证入口细化 |
| D11-32 | **deploy 的 ResourceSync 来源（LR-32）** | D2-23（D2:60）；D8 DEP-01/02/03（D8:350–352）；deploy main `scripts/central.py`、`komodo/syncs/central.toml`（FB LR-32 节） | ResourceSync 与 Stack 都用 files-on-host：部署入口在中心主机上维护一份 `Pepgent/deploy` 的专用 clone，apply 前更新到 `origin/main`；Komodo Core 只读挂载它读取 ResourceSync 声明，Periphery 只读挂载同一 clone 读取 Stack 文件 | **选定：** 不需要额外凭据，与 D10-14“deploy 的 main 即活动声明”一致。**备选（未选）：** repo-backed ResourceSync：要给 Komodo 配 Git provider token，凭据来源未定 | 技术 | 否 |
| D11-08 | **GraphNode.Call 带 capture（LR-08）** | `GraphNode.Call` 草图（D6:175–179）；soroi main `packages/store/src/contract.ts:5–6、143–146`，插件 `src/eval/store.ts:158–162`（FA LR-08） | 已完成的 `GraphNode.Call` 带 `capture: Hash`，由 store 返回，消费方不自行推断。输出字段名可以是空字符串（单字段输出 `SINGLE_FIELD`，`design/store.md:70`）；atom 名仍非空 | **选定：** 消费方按 store 给的 capture 身份取值，单一来源。**备选：** 消费方从调用坐标推算 capture：第二份身份推导 | 串联 | 是：D6 wire 补充 |
| D11-11A | **Activity 中被中止的调用（LR-11）** | Activity 草图（D6:186–189）；soroi main `packages/store/src/contract.ts:188–193`、`store.ts:516–520` | Activity 视图中被中止的调用是独立变体 `AbortedCall`，不带 `body` | **选定：** 中止调用没有执行体，按 ADT 表达。**备选：** 带空 `body`：同一字段有两种含义 | 串联 | 是：D6 ADT 补充 |
| D11-11B | **检查器的 `pin_key` 错误（LR-11）** | D5 §3.4 `CheckError`（D5:260–274）、D5-11(8)（D5:86）；soroi main `packages/omp-soroi/src/eval/check-error.ts:12`、`check.ts:375` | `CheckError` 增加变体 `pin_key{ name }`：pins 指向根 atom 或非调用输出时返回，落实 D5-11(8) 已要求的拒绝 | **选定：** 已通过的拒绝需要可区分的结果。**备选：** 复用 `unknown_atom`：把“名字存在但不可钉住”报成名字不存在 | 串联 | 是：D5 ADT 补充 |
| D11-13A | **运行比较的结果类型（LR-13）** | `Pair` 草图（D6:202–207）；D6-13（D6:41）；soroi main `contract.ts:195–212`、`compare.ts:26–35、130–132` | `Pair` 增加 `SameValue`（两次运行的根值相同）与 `Aborted{ side }`；`SameCapture` 只用于已完成的调用；`Changed.fields` 每项为 `Both{a, b}`、`OnlyA{a}`、`OnlyB{b}` 之一 | **选定：** 根值与中止调用有明确变体，字段只出现在一侧时可表达。**备选：** 草图原样：根值相同与中止调用无处表达 | 串联 | 是：D6 ADT 补充 |
| D11-13B | **比较的根映射参数（LR-13）** | `/compare` 草图（D6:197）；soroi main `server.ts:63–75` | `map` 参数是一个 URL 编码的 JSON 数组，元素为 `[rootA, rootB]`，一一映射 | **选定：** 无歧义。**备选：** 草图的 `rootA:rootB,…`：atom 名含冒号或逗号时无法解析 | 串联 | 是：D6 wire 补充 |
| D11-19 | **派生运行的提交与物化（LR-19）** | D6-16（D6:44）、`DeriveCommit`（D6:130–132）；soroi main `contract.ts:161–166`、`store.ts:355–358、403–439`、`derive.ts:7`（FA LR-19） | `DeriveCommit` 必带一个 `EvalTransfer`（纯标量改动也开一个空 transfer），只晋升新根引用的字节。派生运行 R' 的 `run_started`（seq 1）是物化锚点：写入继承的调用与名字和新根，不写步、不发 `step_committed`；之后第一个正式步 C 才是 R' 的第一步。只继承带 capture 的已完成调用；P 里被中止的调用留在 P；受改动影响的输入在 R' 里重新成为未消费；不自动 stop | **选定：** 与 D6-07“未提交字节先进暂存区”同一路径，物化锚点明确。**备选：** 新根字节直接随请求体提交：第二条字节入口 | 串联 | 是：D6 wire 补充 |
| D11-24 | **volume 的内容与发布（LR-24）** | D6-07（D6:35）、volume 草图（D6:151–152）、Inherited 来历（D6:86）、D4:53；F18（D8:137）“`soroi/`、`in/`、`work/` 下的全部文件”；soroi main volume 实现（FA LR-24） | volume 清单的成员是 regular file，不表示符号链接与空目录。按调用来历发布：远程 `Executed` 发布同一 transfer、同一位置被接受的 volume；`Human`、`Aborted` 发布其位置已被接受的 volume；`Inherited` 按源坐标只读引用父运行的 volume，不复制；中心 `Executed`、`Adopted` 与没有被调用引用的暂存卷不发布。F18 判据中的“全部文件”按此读作“全部 regular 文件” | **选定：** volume 即远程调用产出的普通文件集合，继承不复制字节。**备选：** 继承时复制父 volume：同一内容两份，违背按内容寻址 | 串联 | 是：D6 volume 语义补充 |
| D11-12 | **模型网关的消费方配置（LR-12）** | D8-06（D8:77）；评论定义全部消费方的配置；本轮 main 只观察到 `compose/central-entrypoint.sh:10–12` 与 deploy compose 的 `PEPGENT_GATEWAY_TOKEN` 注入接缝，未读取各消费方 `models.yml`（FA LR-12） | 每个消费方的 `models.yml` 对网关 provider 写 `auth: none`，由 `PEPGENT_GATEWAY_TOKEN` 环境变量构造 `Authorization` 请求头；不再用 `apiKey` 指向环境变量。token 的拥有者与注入方式不变（D8-06） | **选定：** 避开 provider 发现缓存导致的模型名双前缀。**备选：** 保持 `apiKey`：发现缓存把 provider 前缀拼两次 | 技术 | 否 |
| D11-01 | **dial 报告的进程退出码（LR-01）** | D3 的 dial 与退出锚点（D3:56、59、61、69、100–130）；omp-rpc-mux main `src/dial.rs:394–395` | 被 dial 托管的 omp 正常退出时报告原退出码；因信号结束时报告 `128 + 信号编号`。连接 actor 的布局、队列容量与发送时限是 Mux 私有实现 | **选定：** POSIX shell 约定，消费方（LAB-04 写方、SOR 写方）不必区分两种退出形状。**备选：** 另设 `{signal}` 变体：消费方都要多处理一个变体，而 D3 只给数值 code | 串联 | 是：D3 wire 补充 |
| D11-04A | **central 镜像的 standin（LR-04）** | D8 IMG-05（D8:231）“加 `e2e/` 依赖与 standin 入口”；images main `Dockerfile:30–31` 无 standin（FA LR-04） | IMG-05 范围不变：central 镜像包含 `Pepgent/soroi` 默认分支的 `e2e/` 依赖与 standin 入口，构建时从该仓取得；由 images 工程师补齐 | **选定：** 撤销 LR-04 对已通过范围的缩减 | 实现 | 否 |
| D11-04B | **Komodo Build 流水线就位前的自有镜像构建（LR-04）** | D2-13（D2:50）选定 Komodo Build 构建业务镜像与 omp-agent 镜像；D8-16（D8:87）把容器页的 Komodo Build 流水线列入 D9 输入 | 修正 D2-13 的执行时点：在 Komodo Build 流水线进入实现之前，omp-agent、central、lab-web、remote-step 镜像用 `docker buildx` 构建并推送到 `pepgent-registry`（ENV-01）；流水线进入实现后，这些镜像改经 Komodo Build | **选定：** 开发与统一 e2e 不等待 D9 才定的流水线。**备选：** 先实现 Komodo Build 流水线：把 D8-16 已列为 D9 输入的工作提进 MVP | 技术 | 否 |
| D11-42 | **节点库源快照、依赖安装与节点 API 解析（LR-42，并入 LR-07 最终版与 LR-51 的 regular-file 子项）** | D4:47–49（依赖目录以 lockfile 为键、变化即失效）；D8 SOR-06（D8:272）；soroi main `bundle.ts#restoreLibrary`、`check.ts`、`node-builder.ts#NODE_API`；lab-library main `package.json` 的 optional peer（FB LR-42、LR-51 节） | 每次 eval 对 Lab 源（会话 worktree 中被 git 跟踪、以及未跟踪且未被忽略的 regular file，保留未提交改动）建一份私有快照，在快照内按 lockfile 冻结安装依赖；检查器与 `Bun.build` 读同一份快照；快照不跨 eval 复用。节点对 `omp-soroi` 公共构造器的导入解析到当前已加载的插件；lab-library 把 `omp-soroi` 声明为 optional peer，不要求手工 symlink | **选定：** 检查与构建读同一份源与依赖，未提交改动也纳入。**备选（D4:49 原文）：** 依赖目录按 lockfile 跨 eval 缓存：同一快照之外的依赖目录可能与检查所见不同。**备选（LR-07 早期）：** peer 加手工 symlink：每个 Lab 库都要额外的安装步骤 | 串联 | 是：D4 依赖恢复与节点项目约束的补充 |
| D11-44 | **节点源码可用的模块加载 API（LR-44）** | D4:47（不支持无法 bundle 的依赖）；soroi main `bundle.ts#checkClosure`；LAB-10（PR39）节点编辑与导出 | 节点源码从 `node:module`（或 `module`）只以静态具名导入使用 `isBuiltin` 与 `builtinModules`；模块加载器 API（`createRequire`、`Module`、`register`、`registerHooks`、`process.getBuiltinModule`）不在节点可用范围内。这是节点源码的支持边界，不是通用沙箱 | **选定：** bundle 闭包可静态确定。**备选：** 允许加载器 API：运行时动态加载的模块不进 bundle，版本身份不再覆盖实际执行的代码（BS:128） | 串联 | 是：D4 节点项目约束补充 |
| D11-WB | **通过条目回写已通过正文** | D4、D5、D6 接口草图；D7-03；D8-06、F18；`design/eval.md`、`design/store.md`；lab-library README | 本表通过后，秘书把每条通过的结论直接替换进对应正文：D6 草图（D11-08/11A/13A/13B/19/24/47A/47B/47C 与分流表中 LR-02 的 `RunGraph` Aborted）；D4（LR-03 终态，D11-42、D11-44）；D5 §3.4（D11-11B）；D3（D11-01）；D7-03（D11-29A、D11-30、D11-49）；D7-06（D11-29B）；D8-06（D11-12）；D8 F18（D11-24）；D2-13（D11-04B）；`design/eval.md` 与 lab-library README（D11-F12、D11-42、D11-44）。直接替换，不留更正记录 | **选定：** 正文是工程师读的依据，不留第二处说法（AG 第 3 条）。**备选：** 只在 issue 评论登记：工程师按旧正文施工 | 实现 | 否 |

## 非 LR 来源的设计补充

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D11-F12 | **正式入口创建 File 根 atom** | F12 第②条（D8:131）“`film` 是一个 `File` 根 atom”；`design/eval.md:159` 根 atom“只允许数字、字符串、布尔字面量”、:166 无魔法值；D6 `Value` 已含 file（D6:67）；`design/store.md:64` 根值与文件的身份为内容 SHA-256；D7-05 `lab_open_artifact` 拷入 `inputs/`；soroi main：`model.ts:27–29` 根语句只持 `Literal`，`check.ts:194–202、214–232` 只识别标量字面量且普通调用不收字面量参数，`execute.ts:128–133` 只按标量物化根，`node.ts:5–17` 已有 File 类型；lab-library `nodes/run_svm.ts:4` 等五个 `run_*` 参数为 `film: string`；[soroi#220 BLOCKED](https://github.com/Pepgent/soroi/issues/220#issuecomment-6554855746) | 根语句增加专用形状 `const <name> = file("<相对路径>")`。`file` 是 eval DSL 的内建形式，不从节点库解析，不产生调用或捕获；检查器在识别普通调用之前识别它，只允许作为单个标识符声明的初始化器。路径相对于根 omp 进程的 cwd（会话编写 worktree，D2-12、D7-04），讨论装载的产物经 `lab_open_artifact` 拷进 `inputs/`（D7-05）。eval 读取文件字节：值身份与 `Root.value.content` 是内容 SHA-256（`design/store.md:64`），`name` 取路径的 basename，`media` 按插件对节点产出 File 的同一规则得出，路径不进入身份。dry run 与正式运行都把这些字节放进本次 eval 的 EvalTransfer，本步调用消费同一个 File 值；正式提交时被根记录引用的字节转入对象目录，dry run 返回时删除 transfer、不提交事实。lab-library 中消费影像的 `run_*` 节点参数改为 `film: File`。F12 判据不变 | **选定：** 不缩减 F12；store 已能表达 file 根，只缺正式入口写法；数据文件从讨论装载进入实验是 Pepgent 的业务路径。**备选：** F12 改用派生 File 或字符串根：缩减验收。**备选：** `artifact("<id>")`：soroi 要认识 Pepgent 的 ArtifactId，违背 D7-20。**备选：** `file("sha256:…")`：刚装载、未进 store 的字节没有可引用的哈希。**备选：** 绕过 eval 直接 POST 根事实：store 外的第二条写入入口 | 串联（若 argon 认定 `design/eval.md:159` 的限制有 (U) 来源而主张意图，按 D1-17 交导师仲裁） | 是：eval 语句形状、检查器、根物化与 lab-library 节点签名 |

## 影响

| 条目 | 正在开发、直接消费 | 下游消费 | 已交付、需按决定修订 |
| --- | --- | --- | --- |
| D11-49 | LAB-04（[Pepgent#13](https://github.com/Pepgent/Pepgent/issues/13)） | LAB-05、LAB-11a、LAB-11b、WEB-02、WEB-04、WEB-07 | — |
| D11-47A/B/C | STO-05（[soroi#190](https://github.com/Pepgent/soroi/issues/190)）、LAB-06、LAB-07a、LAB-09 | WEB-02、WEB-03、WEB-05 | — |
| D11-29A/B | LAB-09、LAB-11b | LAB-06、WEB-04、WEB-05、WEB-06 | — |
| D11-30 | LAB-04..12 的认证入口 | WEB-01..07、IMG-04、DEP-03 | — |
| D11-32 | DEP-03 | IMG-04 | — |
| D11-08、D11-11A、D11-13A/B | STO-05、LAB-07a | WEB-03 | — |
| D11-11B | — | — | SOR-05 已落地 |
| D11-19 | STO-05、LAB-08 | LAB-10、WEB-03 | — |
| D11-24 | LAB-07b、LAB-08 | WEB-03 | — |
| D11-12 | LAB-04、IMG-04 | — | — |
| D11-01 | LAB-04 | SOR-09、SOR-18/20 | MUX 已落地 |
| D11-04A/B | IMG-04；IMG-05 范围补齐 | DEP-03 | — |
| D11-42、D11-44 | LAB-10（[PR39](https://github.com/Pepgent/Pepgent/pull/39)） | SOR-07、SOR-11/13/15/17a/17b/18/20 | SOR-06 已落地 |
| D11-F12 | E2E-12（[soroi#220](https://github.com/Pepgent/soroi/issues/220)） | — | SOR-02、SOR-05、CUS-03、LIB-01；`design/eval.md` |

## 对讨论者意见的处理

| 意见 | 来源 | 处理 |
| --- | --- | --- |
| LR-21 把私有 registry 写成 E2E 消费的 transcript 记录，应进契约 | Steady | 采纳：移入 D11-B |
| LR-06 理由须收窄，不借此改提示词内容 | Steady | 采纳 |
| 私有实现与流程分两类 | Steady | 采纳 |
| D8 裸行号漂移 | Steady | 采纳：全部改为“决策或切片 ID + 当前行号” |
| D11-47 拆三票；D11-11、D11-13、D11-04 各拆两票；D11-29 拆票 | Steady | 采纳 |
| D11-47C 同一事实发两次、靠 upsert 对账 | Divergent | 采纳：改为每个事实一处携带，原写法列为备选 |
| D11-29、D11-32 把功能列入 D9 无 D8-16 依据 | Steady、Divergent | 采纳：删去两处 D9 归类；逐成员开关不在 D7 也不在本条，原型字段由 D9 叶子分类（D8-15）自然覆盖；repo-backed 只作未选备选 |
| researcher 的 `ownExperiments` 可能是空权限，需原型依据 | Divergent | 查得原型 `canApprove` 文案：researcher“自己实验的运行”，保留 `ownExperiments` 并在 where 引用 |
| D11-29 与 D11-49 的身份口径矛盾 | Divergent | 采纳：D11-29B 改为以草稿所属讨论的 `conversation.owner` 判定，与 D11-49 同口径，不新增字段 |
| “权限只由 Better Auth 判定”不准 | Divergent | 采纳：角色由 Better Auth、归属由 `conversation` |
| D11-04B 实际修改 D2-13 | Divergent、Steady | 采纳：写明修正 D2-13 的执行时点 |
| standin 的构建输入来源 | Divergent | 采纳：D11-04A 写明取自 `Pepgent/soroi` 默认分支 |
| LR-01、LR-42、LR-44 被 LAB-04、LAB-10 直接消费，应在本批 | Divergent | 采纳：LR-01 只取主路径的退出码编码；LR-07 与 LR-51 regular-file 子项并入 LR-42 |
| D11-F12 不是 LR 行 | Steady、Divergent | 采纳：单列为非 LR 来源的设计补充 |
| D11-F12 缺 intrinsic 形状、值身份、name/media、dry run 字节去向 | Steady、Divergent | 采纳 |
| 补回写条款 | Divergent | 采纳：D11-WB |
| D11-30 补“调用 401” | Divergent | 采纳（Steady 认为可不写；这是未登录访问的既定响应，已被 WEB 客户端消费） |
| D11-47A 旧库迁移排序可归私有 | Divergent | 不采纳：消费方续读时看到的就是这一顺序，保留并写明它不代表历史真实顺序 |
| D11-30 去掉“关闭连接” | Divergent | 采纳：只保留“seed 完成后 Web 才服务” |
| 影响表补漏、区分直接与下游、已关闭切片不冒充在开发 | Steady | 采纳 |
