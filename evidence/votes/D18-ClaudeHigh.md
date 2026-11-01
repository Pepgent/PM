# D18 选票：claude-high（独立空白历史审查席，1 票）

- 议案：[PM#28](https://github.com/Pepgent/PM/issues/28)，表决对象为发起人在 PM#28 评论 6559207850 中给出的“发起人正式提案”。
- 读过的源头：决策表 `local://decisions/D18-product-opus-contracts.md`；`pepgent-pm/evidence/decisions/` 下的 D4、D7、D8、D10、D12；`pepgent-pm/evidence/argon/D12-intent.md`；`pepgent-soroi/design/{soroi,store,eval,subagent,layers}.md`；`pepgent-remote` 的 `src/ops.rs`、`src/backend/komodo/mod.rs`、`src/backend/slurm/mod.rs`、`templates/komodo/soroi/compose.yaml`、`README.md`（本机检出，没有用 git 核对是否等于 `695a1a7`）；`pepgent/AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html`；`apps/web/src/client/contracts`。
- 用户原话：D18-05 引用的四条原话，以及 bf96d256 前后各一轮，我已逐条读原文（session `01a0d0f1…` 的 entry `93d9c89c`、`3872ca61`、`bf96d256`、`d46ffb76`、`ae0efeb7`、`9d5a800e`、`8f1c0321`、`4d388e7f`、`d5277d47`）。没有读 01a193fd。

## 汇总

| ID | 票 | 对象 |
| --- | --- | --- |
| D18-01 ① | 赞成 | Lab 业务目录与关系 |
| D18-01 ② | 赞成 | 仪器资源排程（附约束） |
| D18-01 ③ | **反对** | 算力运维与集群接入 |
| D18-01 ④ | 赞成 | 镜像开发构建 |
| D18-01 ⑤ | 赞成 | 讨论与成果治理（按一人一会话理解） |
| D18-01 ⑥ | 赞成 | 数据集索引、预览与导出 |
| D18-01 ⑦ | **反对** | 广义自动化触发源 |
| D18-01 ⑧ | 赞成 | 身份、授权与配额 |
| D18-01 ⑨ | 赞成 | 科研主页对象 |
| D18-01 ⑩ | 赞成 | 业务 AI 会话与动作协议 |
| D18-01 ⑪ | 赞成 | 函数到节点卡片的元数据映射 |
| D18-02 | 赞成 | how 列 ①②③（附范围补充） |
| D18-03 | **反对** | 方案 A |
| D18-04 | 赞成 | 方案 A |
| D18-05 | **反对** | 方案 A |

---

## D18-01：11 项逐项

**对整行的发散意见（不计入票）。** ①④⑥⑧⑩⑪ 的归属与首版范围，在 D7、D8-16、D12 中都已经表决。D18 再用另一张表把它们写一遍，就多了一处会漂移的来源；⑦ 已经和 D12-09 不一致，就是例子。建议 D18-01 只表决 D7/D8/D12 没有定过的部分，也就是 ② 的仪器排程归属、③ 的运维组件归属、⑥ 的导出、⑨ 的文献与阶段叙述；其余各项只写“按 D7-xx/D12-xx”，不再重写首版范围。

### ① 赞成
在 D7-02 中有对应的表：`project`、`draft.savedVersion`、`discussion_binding`、`experiment_ext`；负责人取 `conversation.owner`（D12:267）。
附注：`ExperimentExtWire` 没有标签字段（D12:155），前端契约也没有实验标签（`client/contracts` 中只有报告带 `tags`，`lab-home.ts:56`），`project` 也只有一个。所以“实验标签”“项目多标签”在 D12 线上没有来源。首版只能交付 D12 已有的字段；这两项要么按 D12:561 的规则判为无来源字段列入 D9，要么按 D10-08 另行表决补字段。不能凭本行把它们算作首版已定。

### ② 赞成（附约束）
排程和预约是 Lab 自有的业务事实，归 Lab 后端，列 D9，没有问题。
约束：设备本身由 remote 模板字段提供（P3）。D7-12 写明“模板的镜像、设备、挂载、资源取自 P3”，D12-06 的泳道也“按调用的模板经 `templates` 的设备（P3）归泳道”。Lab 后端只持有预约和冲突，不另建一份设备目录，否则设备会有两个来源。

### ③ 反对
**反例（权威冲突）。** 提案把作业的重启和销毁、集群接入向导归给“独立运维组件（不归 soroi、不归 remote）”。但单次作业的生命周期和模板目录，唯一权威是 remote：D2-09；D4 §2 写明“临时 volume、拷入拷出、作业生命周期、模板目录 → `Pepgent/remote`”；D7-12 写明“remote 是作业的唯一权威，Lab 不建作业表”。
如果运维组件绕过 remote，直接销毁 run R 的 Komodo Stack 或卷：
- remote 的 `runs/R.json` 里不会有 `aborted` 或 `removed`；
- 之后 `remote status R` 走 `komodo::services`/`inspect` 时找不到 Stack，按 README:241 “Inspect failures propagate” 只能报错；
- `remote remove R` 里的 `wait_terminal`（`komodo/mod.rs:41-52`）也拿不到终态；
- `remote runs` 会一直把 R 列为未结束。

接入向导同理：新增集群就是新增 remote 后端端点和模板，写的是 remote 的目录与凭据（D7-12：集群“即 remote 目录里的一个后端端点”）。由外部组件写入，就会出现第二个目录来源。
**修改建议。** 只读的作业列表、status、tail 仍经 remote，进首版。作业控制（restart、destroy、new_sandbox）和集群、模板登记，归 remote 的操作，由 Lab 门面调用，列 D9。只有集群健康、容量、交互 shell 这类 remote 不持有的事实，才归独立运维组件，列 D9。

### ④ 赞成
与 D2-13、D7-13、D8-16 一致。

### ⑤ 赞成（按一人一会话理解）
所引依据 D7-04、D11-49、F31 都是一人一会话。本票只赞成“讨论是该成员自己的 Lab 根会话，其他成员只读，成果治理是结论确认和报告”。“多人讨论”这几个字不能理解为多个成员共用一个会话：用户原话“multi_human: 裁掉：一人一会话”，D12-intent 基线 4（`D12-intent.md:59-61`）已定。建议归档时把这一项改名为“讨论（一人一会话）与成果治理”。

### ⑥ 赞成
与 D12:571 一致：实验产物的 role、verdict、契约无来源，列 D9。导出不在任何 F 流程中，列 D9 符合 D8-16。

### ⑦ 反对
**反例（与已表决契约冲突，构成收缩）。** 提案把 cron 列入 D9。但 D7-10 写明“trigger=event{…} 或 schedule{cron}；…schedule 用 croner”；D12-09（`D12-lab-wire.md:41`）和公开类型 `AutomationTrigger`（`D12:239-240` `{ kind: 'schedule'; cron: string }`）、`AutomationTriggerFact`（`D12:247` `schedule{at}`）都把定时触发列在第一版。照本行执行，第一版的公开类型就得删掉 `schedule` 变体，或者保留一个没有实现的变体。前者推翻 D12，属于 U2 禁止的擅自收缩；后者违反 D12-intent 基线 3 “不伪造”。
**修改建议。** 首版是生命周期事件（`run_started`、`run_ended`、`run_aborted`）加 cron 定时，以及手动运行，均按 D7-10、D12-09。列入 D9 的只有节点判据、设备 idle、构建事件、邮件，仪器事件按 D8-16 也在其中。

### ⑧ 赞成
与 D7-03 和 D8-16 的 P9、P11 一致。配额的设定值已经有字段（D7-03 的 GPU 配额扩展），只有用量为 `null`。

### ⑨ 赞成
与 D7-02 的 report、milestone、activity 一致；研究阶段叙述对应 D12:567（G10）。附注：“文献”在 D7、D12 中都没有权威源。除非它由报告的 `sources` 派生，否则应按 D12:561 的规则列 D9。

### ⑩ 赞成
与 D7-04、D7-05 一致。

### ⑪ 赞成
与 D10-11、D12-15 一致。设备由默认 env 对应的模板提供（P3），本项把“节点级设备”列 D9，与 ② 的约束不冲突。

---

## D18-02：赞成

① 与 D10-01A、D10-01B、D10-04 ① 一致：确定 owner 之前，在现仓的路径域开发；现仓 `packages/omp-soroi`、`packages/store` 仍然存在。②③ 与 D4-21、store.md:111、D12-15 一致。

**执行时必须一并覆盖的位置（非阻断，执行者按文档一致性规则也必须做）。** where 列只列了 soroi.md、store.md、eval.md。执行后，下列正文仍会说“`Pepgent/soroi` 单仓”，和新改的 soroi.md 互相矛盾：
- `subagent.md:11`、`:28`（“`Pepgent/soroi` 单仓的 `packages/omp-soroi`”）、`:151`（“`Pepgent/soroi` 的发行归档”）；
- `soroi.md:13-16` 的“位置”列，`:31` 的“仓根 compose 拉起同仓的 `pepgent-store`”；
- `eval.md:251`；
- `store.md:3` 的“随 soroi 定制同版本发布”：D10-03 规定发行 tar 不含 store 服务实现，这句也要按仓 A 独立发布来改。

② 的替换文字建议保留“不写对象目录”。store.md:11 原文把中心副本和对象目录分开写，D4-21 也明说“对象存储不写”。可写成：“dry run 只经传输暂存区收发字节（`POST`/`PUT`/`DELETE /transfers`），不写正式记录、中心副本与对象目录。”

---

## D18-03：反对方案 A

**反例 1（中止路径失去终态，`remove` 无法完成）。** 这条路径在主路径上：F17 ③“LabStandIn 对根端点发 `abort{run}`：远程 Program 的 `remote status` 为 `aborted`/`ended`，容器已停止”（D8:136）；F14 和 F16 要求“结束后 Stack 和卷都已删除”；D4:28 与 D4-12 第 3 条规定“调用方先 `abort` 再等终态、`remove`”。

- **Komodo。** `abort`（`komodo/mod.rs:360-386`）对正在运行的 body 执行 StopContainer，body 以非零码退出。copy-out 依赖 body 成功完成，所以永远不会启动。此时三个服务的状态是：copy_in 已退出（0），body 已退出（137），copy_out 只创建或根本不存在。
  - 现行代码走 `broken` 分支，返回 `Ended`（`komodo/mod.rs:284-291`），所以 `remove` 能完成。
  - 方案 A 删掉缺 copy-out 时返回 `Ended` 的分支后，`derive_status` 落到 `Running{started_at}`。`observe` 看到没有活动服务、Core 也不忙，就读 DeployStack；该 update 是 `Complete`，于是返回错误“deployment completed without an observable terminal execution state”（`komodo/mod.rs:57-80`）。`remove` 里的 `wait_terminal` 把这个错误向上传（`ops.rs:139`），Stack 和卷都不会被删除。
- **Slurm。** `abort` 执行 scancel，作业以 CANCELLED 结束，并且有 batch host。脚本在 body 处被杀，copy-out 那一行没有执行（`slurm/mod.rs:182`）。方案 A 规定“以 copy-out 步骤完成作为 `Ended` 依据”，这次作业就不能报 `Ended`。它也不能报 `EndedUnstarted`，因为那个变体只用于从未开始的作业（`slurm/mod.rs:201-209`）。D4 的终态集合里没有剩下的变体，`abort_status`、`remove`（`ops.rs:115`、`:152`）没有可以记录的终态。

所以方案 A 说的“契约不动，只改 remote”不成立：已经开始的作业被中止后，要么新增一个终态，这就是方案 B 的路子；要么允许它报 `Ended` 而不保证拷出，这就要改 D4 的措辞。

**反例 2（提案对现状的描述不准，Komodo 的改法在 compose 中写不出来）。**
- Slurm 脚本现在已经是“体结束后无论成败都执行 copy-out”：`set +e … body_status=$? … set -e; copy-out; exit "$body_status"`（`slurm/mod.rs:182`）。提案说要把两个后端都改成这样，Slurm 这一半是已有行为。
- 提案要求“Komodo 模板 copy-out 的依赖改为体结束（不要求成功）”。Compose Specification 中 `depends_on.condition` 只有 `service_started`、`service_healthy`、`service_completed_successfully` 三个取值（外部规范，未在本机运行验证），没有“体结束、不论成败”。这只能靠改体的命令或改 boot 的退出码来实现。改了之后还要处理一个问题：体被 abort 的 StopContainer 杀掉时依然以非零码退出，copy-out 仍然不会启动。

**修改建议（按“设计只写主路径”取最小方案）。**
1. D4:28、D4-07 第 3 步、D4-12 第 3 条、eval.md:118 的措辞改为：“`Ended` 是作业的执行终态。没有被 `abort` 的作业，到达 `Ended` 时拷出已经送达。被 `abort` 的作业也以 `Ended` 结束，但不保证拷出，发起中止的调用方不读暂存区（被中止的调用本来就记 `call_aborted`，D6-15）。”
2. remote 两个后端的终态推导保持现状。体自身失败、拷入失败属于失败分支，按 `design-assumes-it-works` 本轮不设计。
3. 如果要让 GUI 区分 failed 和 exited，这件事已经在 D12:572（G22）列入 D9，届时再按方案 B 新增变体。

这样 eval、Lab、remote 都不用改代码，只改契约正文。远程 Agent 的有序停止（store.md:131：先结束这一代，omp 正常退出，体以 0 退出，再拷出）走的是自然结束，仍然拿到“拷出已送达”的 `Ended`，F18 的复盘浏览不受影响。

---

## D18-04：赞成方案 A

原型的智能体模板页列出 Claude Code、Codex、Pi、OpenCode 四种 harness（`AI4S-Settings-Hi-Fi.dc.html:153`、`:191-196`、`:321`）。方案 A 把这一页限定为 `.omp/agents/` 中的 omp 定义，与 U13、U24、D4-09（Lab 库 `.omp/` 随每次远程启动拷入）一致。

**回答“D12-intent 现有文字是否已覆盖本页”：已经覆盖，但决策表引用的行号不对。** `D12-intent.md:152-162` 是基线 3（禁止假数据），不涉及 harness。真正覆盖本页的是：
- `D12-intent.md:53-58`：“禁止多 harness 枚举…`AgentTemplate.harness` 必须收窄为唯一字面量 `'omp'`，`id` 为 `.omp/agents/` 下的 omp agent 定义名”；
- `:114`：设置页第 13 行“智能体模板（`.omp/agents/`，`harness: 'omp'`）”；
- `:189-200`、`:264-266`：否决红线 V-4。

另外 D7-11 写明“智能体模板是 `.omp/agents/` 的 omp 定义：id=定义名、harness='omp'”，D7 的字段表 settings 行也写了 `harness='omp'`。所以本行只是重申已经定下的内容。归档时请把引用改为上面这些行。原型中模板的 `targets`、`models[].purpose`、来源为 repository 的条目，已经由 D12:577 列入 D9。

---

## D18-05：反对方案 A

**反例（意图：方案 A 恰好是用户当场否定过的读法；提案只引用了半句原话）。**

- **09-24 那一轮。** 用户说“实验室的抽象实际上是soroi多租户模式，而soroi多租户在早期直接用多实例解决”（`93d9c89c`）。助手随后给出的理解是“一个 Lab 就是一整套单租户部署，包括 pepgent web、hub、N 个 paseo daemon 和 soroi。pepgent 本身永远只服务一个 Lab…Lab 切换在应用外面”（`3872ca61`），这和方案 A 是同一个形状。
- **用户的纠正。** 用户的下一句就是 `bf96d256` 的全文：“**你错了，web对接soroi多租户啊**，我说的是多租户概念不侵入soroi，想什么啊”。决策表只引了后半句。
- **纠正后的模型。** 助手据此改为“pepgent web 是唯一承担多租户的层…按 labId 路由到对应 soroi 实例”，soroi 实例保持单租户（`d46ffb76`）。用户只在次要问题上追问了一句（`ae0efeb7`），没有再否定这个模型。
- **09-25 两句。** `4d388e7f` 说的是“部署全套**soroi下的东西**成独立的一份，包括km”，`d5277d47` 说“新增实验室等于部署，这个部分是个占位细节”。这两句都没有把 web（Lab 后端）放进每 Lab 一份的部署单元，和 09-24 纠正后的模型一致。
- **对照方案 A。** 方案 A 写的是“每新增一个 Lab 部署一整套（**Lab 后端**、store、Mux、Komodo 等）；Lab 后端内不做跨 Lab 隔离；organization 只承载本 Lab；侧栏‘切换 Lab’首版列 D9”。这正是用户用“你错了”否定过的“web 每 Lab 一份、应用外切换”。

**反例（与已表决的首版契约冲突，构成收缩）。** D12-03、D12-04 已定：`catalog.read{lab: LabId | null}`，目录包含“当前用户全部 Lab”，各带 `openRuns`（`D12-lab-wire.md:35-36`）。方案 A 把切换 Lab 列入 D9，就要从首版里拿掉这个已表决的读面，违反 U2。

**方案 B（维持 D7 现状）同样不符合原话。** D2-20、D7-19 只有一个 store、一个 Mux，`SOROI_STORE_URL`、`SOROI_MUX_URL` 也各只有一个。D12-04 用 `experiment_ext.lab_id` 把 store 中的运行归到各 Lab。这等于多个 Lab 共用一个 soroi 实例，违背“soroi多租户在早期直接用多实例解决”“部署全套soroi下的东西成独立的一份，包括km”。两个候选方案都不能通过。

**修改建议：方案 C（按纠正后的原话）。**
1. Lab 后端是唯一的多租户层。D7-01、D7-02、D7-03 保持不变：Better Auth organization 承载多个 Lab 及其成员、角色、邀请；目录和切换 Lab 按 D12-03、D12-04 进首版。
2. 每新增一个 Lab，就部署一套独立的 soroi 实例：store、Mux、Komodo（km）和 remote home，以及该 Lab 的中心 omp 会话卷与 worktree 卷。soroi 各组件里没有 Lab 字段。
3. Lab 后端按 `labId` 路由到该 Lab 实例的 store URL、Mux URL 和 remote home。D7-19 中单一的 `SOROI_STORE_URL`、`SOROI_MUX_URL` 改为按 Lab 配置。D12-04 的 `openRuns` 改为向各 Lab 实例的 store 分别查询，`experiment_ext.lab_id` 不再用来在同一个 store 里给运行分 Lab。
4. “新增实验室等于部署”的具体部署单元边界和供给方式，按用户原话作为占位，先假定能工作。
