# D11-B 旧 leader 单独裁决复核：第二批（soroi、remote 侧契约）

起草：leader 分身 D10Clone（Claude 族）。依据：D10-07（[PM#16](https://github.com/Pepgent/PM/issues/16)）与 D11-A 分流表（[PM#17](https://github.com/Pepgent/PM/issues/17)，`pepgent-pm/evidence/decisions/D11A-solo-ruling-review.md`）把 LR-10、LR-18（与 LR-35、LR-36 并入最终版 LR-37）、LR-21、LR-28、LR-43 列为“契约或范围，D11-B 表决”。本批逐条表决这五组。
事实底稿：`pepgent-pm/evidence/inv/D11-facts-A.md`（FA）、`D11-facts-B.md`（FB）。D2…D8 = `pepgent-pm/evidence/decisions/` 下的决策正文（D10、D11-A 回写后的当前文本），行号附决策或切片 ID。讨论者：discuss:steady（D11BSteady）、discuss:divergent（D11BDivergent），采纳与不采纳见文末。本表只写主路径。

## 条目

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? |
| --- | --- | --- | --- | --- | --- | --- |
| D11-37 | **未消费提醒的注入点与记录（LR-37 最终版；取代 LR-18、LR-35、LR-36 的历史版本）** | D5-13（D5:88）“`context` 钩子…每次请求模型前”；EP7（D8:100）；F02⑤（D8:121）、F08（D8:127）、F22④⑥⑦（D8:141）、F23（D8:142）；SOR-08（D8:274）；soroi main `packages/omp-soroi/src/eval/reminder.ts`（`REMINDER_CUSTOM_TYPE`、`ReminderEntry`、`globalThis.soroiReminderClock`、`installReminder`、`injectReminder`）；E2E 消费者 `e2e/s1/reminders.ts:32–53`、`f22.spec.ts:13–26、125–129`、`wire.ts:43`、`local-smoke.ts:48–57`、`e2e/s1/README.md:20` 仍按旧 `before_provider_request/requestOrdinal` | 提醒在 omp 主循环每次构造模型调用候选时注入，接入点是公开扩展点 `addBeforeModelCall`（不改宿主，U13），提醒文本经会话公开的 `obfuscator` 处理后注入。每次注入另写一条 transcript 自定义条目，`customType = "soroi.unconsumed-reminder"`，数据为 `{ text }`，`text` 与注入候选 context 的最终文本相同；可见集为空时不注入也不写条目。条目与模型调用的对应关系由 transcript 顺序给出：条目之后的第一条 assistant 条目就是该候选的回复。条目证明该候选在 hook 返回前已注入同一文本，不证明 provider 收到请求。D5-13 的计算方式（每次现算、不缓存）、行格式与可见范围不变。F02⑤、F08、F22④⑥⑦、F23 的“请求模型之前……记下的提醒条目”读作“该候选构造时写下的提醒条目”。F22⑤ 的场景里，主 agent 在派出这批 worker 前保留至少一个自己可见的未消费 atom，使⑥的探针候选有提醒条目可查。注入时复制消息、清理临时 provider 负载等是插件私有实现 | **选定：** 公开主循环扩展点；记录与注入同一文本；顺序以 transcript（omp SessionManager 是权威）为准。**备选（LR-37 原版）：** 数据另带 `phase`（只有一个取值）、`processGeneration` 与 `ordinal`，插件用全局时钟维护序号：在 transcript 顺序之外再维护一份顺序，进程换代后又不可比。**备选（LR-18 原版）：** `before_provider_request` 与 `requestOrdinal`：插件观察不到真实发送，证据含义超出所能证明。**备选（D5-13 原文）：** 通用 `context` 钩子：注入位置与主调用候选不一一对应 | 技术 | 是：D5-13 注入点与 transcript 记录补充 |
| D11-21 | **根会话的 eval 生命周期记录不成为公开契约（LR-21）** | D6-05（D6:33）；F22⑦⑨（D8:141）；SOR-03（D8:269）、SOR-12（D8:278）；soroi main `supervisor.ts:8–12、49、59、72` 写 `soroi.eval-lifecycle` 条目；E2E 消费者 `e2e/s1/lifecycle.ts`、`f22.spec.ts:147–150`、`agent-smoke.ts` | 根监管者对义务的登记、释放与请求结束仍是插件内部事实；它写不写 transcript 条目、写成什么形状由插件决定，不对外承诺。F22⑨ 按 D8 原文以 store 的事实判定：最后一个 worker 交回前 stream 中没有 `run_ended`；它的步提交进同一个 `Open` 运行；批次释放后 `/end` 得到 `Ended{seq}`。F22⑦ 以读方帧与 D11-37 的提醒条目判定。E2E 不读取 `soroi.eval-lifecycle` 条目 | **选定：** F22⑨ 的场景本就为可证伪而设计（先交回的 worker 把产出全部 `stop`，若监管者提前请求结束，store 会在最后一步前写 `run_ended`），store 事实已足以判定；不为测试新增一份跨组件记录。**备选（LR-21 原版）：** 把三种条目作为公开记录，F22 以它们为证据：只有测试消费的 wire，且对⑨不增加证明力 | 串联 | 否 |
| D11-10 | **Slurm 模板的镜像引用（LR-10）** | D4-18 环境身份“解析后的镜像 digest”（D4:66）；IMG-03（D8:229）“拉成 SIF，路径写进模板”；ENV-04（D8:221）；REM-01（D8:311）、REM-05（D8:315）“换镜像 tag 后，`image` identity 随之改变”；F15（D8:134）；DIST-04（D8:305）、DEP-02（D8:356）；remote main `src/model.rs:190–206` 只接受 `docker://…@sha256:`，`src/identity.rs:58–98` 的 `Registry::resolve` 已用于 Komodo、k8s，`slurm_identity`（`identity.rs:114–128`）未接入；Slurm 作业以 Apptainer 执行 body 镜像与步骤镜像（`slurm/mod.rs:168`）；`pepgent-remote/design/remote.md:97、109、122` | Slurm 模板的 body 镜像与步骤镜像都写 OCI 镜像引用（tag 或 digest 均可），不再使用独立 SIF 路径。作业脚本把模板里的引用以 `docker://<引用>` 原样交给 Apptainer 拉取运行，与 Komodo 按 compose 里的引用部署相同。`templates` 的 `identity.image` 按 D4-18 在读取模板目录时经 `Registry::resolve` 解析为 registry digest，Slurm 与 Komodo、k8s 用同一解析。IMG-03 改为：IMG-01、IMG-02 推送到 `pepgent-registry`，以 `pepgent` 用户执行 `apptainer exec docker://<引用> omp --version` 与 `remote --help`；ENV-04 的模板写 OCI 引用 | **选定：** 三个后端在身份与执行两侧做法一致；配置可写 tag，不必在模板里手工维护 digest（REM-05 的验收本就以换 tag 为前提）。**备选（LR-10 原版）：** 只接受 digest 引用、拒绝 tag：每次重建镜像都要手改模板，且与 REM-05 的验收前提不符。**备选：** Slurm 运行时先把 tag 解析为 digest 再执行：只防 tag 在两次调用之间被改写，属于主路径之外。**备选（D8 IMG-03 原文）：** 裸 SIF 路径：没有 registry digest，D4-18 的身份无从得出 | 技术 | 否 |
| D11-28 | **远程 Agent 调用请求不带 `capture`（LR-28）** | D4 `CallRequest` 草图（D4:113–130，字段在 :128）；D4-08 boot 职责（D4:56）；D4-15 RemoteChild 四列批次（D4:63）；D4-18 中心计算身份（D4:66）；D6-03（D6:31）；`design/eval.md:110–116`、`design/store.md:68、122–127`；SOR-17a/18 未落地（FB LR-28） | 远程 `Agent` 的 `call.json` 不携带 `capture`。捕获身份由中心 eval 中间件依 D4-18 计算，随正式步的中心提交进入 store；boot 只按调用配方启动远程 agent，`RemoteChild` 只产生 D4-15 的四列运行中批次，二者都不创建、校验或持久化捕获身份。`CallRequest.agent` 为 `{ kind, session, customization, library, state, agentDef, prompt }` | **选定：** 捕获身份留在它的权威计算与提交方（中心 eval）。**备选：** 保留 `capture`：已通过的远程职责（D4-08、D4-15）没有为它定义用途，只增加 `call.json` 与身份计算的耦合 | 串联 | 是：D4 `CallRequest` 修订 |
| D11-43A | **`remove` 不取消作业（LR-43）** | D4 框架（D4:28）“`remote remove` 先等到 `Ended` 或 `EndedUnstarted`……Komodo 与 Slurm 使用同一规则”；D6-15（D6:43）；REM-02（D8:312）、REM-07（D8:316）；SOR-20（D8:287）；remote main `src/ops.rs:149–158` 对 Slurm 先取消再等待；`pepgent-remote/design/remote.md:50、119–123、141` | `remove` 只等待作业到达终态（`Ended` 或 `EndedUnstarted`）后清理并记 `removed`，对所有后端都不取消作业；取消只经 `abort`。调用方中止在途作业时先 `abort`，再 `remove`（D6-15、SOR-20 已是如此）。Slurm 后端的 `remove` 与 remote 设计文档按此对齐 | **选定：** 落实已通过的 D4:28、D8 REM-02/07：同一操作在各后端语义一致。**备选（LR-43 原版）：** Slurm 的 `remove` 先取消、Komodo 的 `remove` 自然等待：同名操作两种副作用，调用方要按后端区分 | 技术 | 否 |
| D11-43B | **LR-43 中“Komodo 启动失败明确报错”的去向** | FB LR-43；`EndedUnstarted` 的含义已由 REM-07（D8:316）规定为“排队后被取消、从未开始”；`pepgent-remote/design/remote.md:129` | 启动失败属于失败分支，不进设计（`.claude/rules/design-assumes-it-works.md`）；`EndedUnstarted` 的含义以 D8 REM-07 为准，不扩展。remote 现有的报错写法是其私有实现 | **选定：** 不为失败分支新增公开分类。**备选：** 把“Komodo 启动失败报错”写成公开契约：在设计阶段为失败分支定义行为 | 技术 | 否 |
| D11-WB2 | **回写正文** | 见 how | 本表通过后直接替换正文，不留更正记录。**PM（秘书）：** D11-37 → D5-13（D5:88）、EP7（D8:100）、F02⑤、F08、F22④⑤⑥⑦、F23、SOR-08；D11-21 → F22⑦⑨ 措辞（判据只引 store 事实、读方帧与提醒条目）；D11-10 → D4-18（D4:66，Slurm 与其他后端同样在读取目录时解析）、IMG-03、ENV-04、REM-01、REM-05、F15、DIST-04、DEP-02；D11-28 → D4 `CallRequest` 与 D4-08、D4-15 的职责说明；D11-43A → 核对 D4:28、D6-15、REM-02、REM-07、SOR-20 已一致，只在不一致处改。**pepgent-soroi（秘书，路径限定提交）：** `design/eval.md` 中远程 agent `call.json` 的形状与提醒注入点；`design/store.md` 中提醒记录的说法；另补 D11-A 遗留的 `design/store.md:191` compare `map` 旧格式（应为 D11-13B 的 URL 编码 JSON 数组）。**remote 仓：** `pepgent-remote/design/remote.md:50、97、109、119–123、122、129、141` 由 remote 工程师随实现修改，秘书开 issue | **选定：** 正文是工程师读的依据，决策与各仓设计文档不留第二处说法。**备选：** 只在 issue 评论登记 | 实现 | 否 |

## 影响

| 条目 | 直接消费 | 下游或统一验收 | 需修改的已有实现 |
| --- | --- | --- | --- |
| D11-37 | SOR-08、SOR-12、SOR-13、SOR-15、E2E-11a、E2E-13、E2E-15 | DIST-02、E2E-20 | 插件 `reminder.ts`：条目数据改为 `{ text }`，去掉 `phase`、`processGeneration`、`ordinal` 与全局时钟（仓 B 工程师）；E2E `reminders.ts`、`f22.spec.ts`、`wire.ts`、`local-smoke.ts`、`e2e/s1/README.md`：按 transcript 顺序绑定条目，F22⑤ 场景保留一个可见 atom（e2e 工程师） |
| D11-21 | SOR-03、SOR-12、E2E-13 | — | E2E：删除 `lifecycle.ts` 及 `f22.spec.ts:147–150`、`agent-smoke.ts` 中对 lifecycle 条目的依赖，F22⑨ 改按 store 事实判定（e2e 工程师）。插件可保留或删除内部条目（仓 B 工程师自定） |
| D11-10 | REM-01、REM-05、IMG-03、ENV-04、DIST-04、DEP-02、SOR-07、SOR-17a/17b/18/20、E2E-17 | F15、LAB-12、WEB-06、E2E-20 | remote：`SlurmImage` 接受 OCI 引用，`slurm_identity` 接入 `Registry::resolve`，作业脚本把引用交给 Apptainer，步骤镜像同样处理（remote 工程师）；images：IMG-03 不再产出 SIF（images 工程师）；deploy：`soroi-slurm` 模板写 OCI 引用（deploy 工程师） |
| D11-28 | SOR-17a、SOR-18、SOR-19 | E2E-16/17/18 | 尚未落地，按新形状实现（仓 B 工程师） |
| D11-43A | REM-02、REM-07、SOR-17a、SOR-20、E2E-16/17/18 | LAB-12、WEB-06、E2E-20 | remote `src/ops.rs:149–158` 的 Slurm 分支不再取消（remote 工程师） |
| D11-43B | — | — | 无 |

## 对讨论者意见的处理

| 意见 | 来源 | 处理 |
| --- | --- | --- |
| D11-37 证据句说过头，应收窄为“候选在 hook 返回前已注入” | Steady | 采纳 |
| D11-37 删去单值 `phase` 与 `processGeneration`、`ordinal`，以 transcript 顺序为准 | Divergent | 采纳：数据只留 `{ text }`，原版列为备选 |
| F22⑥ 探针时根会话可见集可能为空、没有条目 | Divergent | 采纳：F22⑤ 场景保留一个主 agent 可见的未消费 atom |
| D11-37 补 F08、F23、EP7 与 E2E 其余旧 schema 文件 | Steady、Divergent | 采纳 |
| D11-21 的备选是稻草人；F22⑨ 以 store 事实即可判定，生命周期条目不必公开 | Divergent | 采纳：改为“不成为公开契约”，E2E 改按 store 事实 |
| D11-21 保留为公开记录 | Steady | 不采纳：F22⑨ 的判据在 D8 原文中全部来自 store，条目对⑨不增加证明力；Steady 的保留理由是“顺序证明需要它”，但该顺序由 store 的 `run_ended` 出现位置给出 |
| D11-10 Slurm 当前并未接入解析器，草稿措辞失实 | Steady | 采纳：写明 `slurm_identity` 未接入，需要接入 |
| D11-10 运行时先解析 digest 再执行应删，与 Komodo 一致地原样执行 | Divergent | 采纳；Steady 主张身份与执行同源，所防的是 tag 在两次调用之间被改写，属主路径之外 |
| D11-10 步骤镜像同样处理，IMG-03 验收命令一并改 | Divergent | 采纳 |
| D11-28 “远端找不到用途”应写成“已通过职责没有定义用途” | Steady | 采纳 |
| D11-43 是落实 D4:28，补引；LR-43 的 Komodo 启动失败须交代去向 | Steady、Divergent | 采纳：拆为 D11-43A、D11-43B，后者作为失败分支不进设计 |
| 行号漂移、影响表与回写清单补全，含 remote 设计文档 | Steady、Divergent | 采纳 |
| D11-A 遗留：`design/store.md:191` compare `map` 仍是旧格式 | Divergent | 采纳：并入 D11-WB2 |
