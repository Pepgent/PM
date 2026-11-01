# D32：Pepgent#24 LAB-08：子 agent 人类 IRC 的受信 reader 凭据注入与边界（P0）——定稿

决策 issue：[Pepgent/PM#51](https://github.com/Pepgent/PM/issues/51)。发起：Coordination（DeskPepgent24Rulings）。本文件由议会 daemon 生成。

## 事实

- **来由：** [Pepgent/Pepgent#24](https://github.com/Pepgent/Pepgent/issues/24)（LAB-08），[BLOCKED 评论 6561585140](https://github.com/Pepgent/Pepgent/issues/24#issuecomment-6561585140) 第 2 项；交付 PR [Pepgent/Pepgent#58](https://github.com/Pepgent/Pepgent/pull/58)。闸门材料与判定：[`evidence/gates/pepgent-24.md`](https://github.com/Pepgent/PM/blob/5390958/evidence/gates/pepgent-24.md)、[`-gate-a.md`](https://github.com/Pepgent/PM/blob/5390958/evidence/gates/pepgent-24-gate-a.md)、[`-gate-b.md`](https://github.com/Pepgent/PM/blob/5390958/evidence/gates/pepgent-24-gate-b.md)（PM `5390958`）。两道闸门都判本项越界（部署前提、跨仓凭据配置，跨 W-09/W-04/W-01），须 P0 表决；闸门 B 要求标 `governance` 并写明各席承载。
- **已免票放行、不入本表：** 第 1 项（根会话停驻时 derive/abort）由 D2-06（`DEC/D2-components.md:43`）、D3-19（`DEC/D3-network-mux.md:73`）、`SOR/design/intervention.md:11` 覆盖：Lab 作为写方先在同一写方声明里开新一代，等端点可用后再路由。两道闸门均判不越界。
- **F1 权威已定：** 子 agent 的人类 IRC 待投递表归其写方（soroi 监管者）；GUI 经 Lab 在 `/agents/{id}/reader` 上发 `mux_human_irc*` 帧，只有用后端凭据建立的受信 reader 连接能发人类帧，`principal` 由该连接给出（D3-12，`DEC/D3-network-mux.md:66`；MUX-05，`DEC/D8-mvp-scope.md:238`）。持有者是 Lab 后端（`DEC/D7-r1-responses.md:20`），注入者是 `Pepgent/deploy`（D7-19，`DEC/D7-lab-backend.md:79`；D2-23，`DEC/D2-components.md:60`）。
- **F2 拓扑已定：** 根 omp 与 Lab 后端同在 Lab 容器，Lab 在本容器内启动 dial（D2-20，`DEC/D2-components.md:57`；D7-19 取舍“根会话与写方同在一个容器，Lab 才能直接在本机执行 dial”；D7-04 ③，`DEC/D7-lab-backend.md:64`）。
- **F3 缺口：** 决策没有规定同容器同用户下受信凭据与根 omp 之间的边界。Mux 组件 README 要求“不得让任意 omp 通过环境、挂载文件或进程检查读取它……不以过滤某个 env 名称替代凭据隔离”（`MUX/README.md:117`，组件文档，非决策正文）；同 UID 下这一要求在现有拓扑中做不到（闸门材料 F2-4）。
- **F4 先例：** D13-05 收窄中心节点 runner 的环境，取舍栏写明“凭据不再经 runner 环境传给节点进程（同一容器、同一用户，这不是沙箱）”（`DEC/D13-contract-gaps.md:48`）。W-08 的 S1 F25/F16 已用同一做法：Mux owner 注入独立的 `MUX_TRUSTED_READER_TOKEN`，CLI 把它从传给 dial/omp 的环境中去掉，只留给自己的受信 reader 连接（`SOR/e2e/s1/README.md:51,53`）。
- **F5 现状：** Lab 启动 dial 时 `env: { ...process.env, … }` 继承全部环境（`apps/web/src/server/lab/sessions.ts:186-197`，PR#58 `bd4ab41`）；中心 Stack 的 `mux` 未配 `--trusted-reader-token*`，`lab-web` 无受信凭据，deploy README 写明人工 IRC 不在 DEP-01 完成结论内（`DEP/stacks/pepgent-central/compose.yaml:65-100`；`DEP/README.md:97`）。
- **F6 意图：** Argon 判 `not_supported` 不能作为终态（F25 必须走通，`(U) #7bfe3696`、`U2`、`U23`）；不要求 OS 多用户或拆容器（闸门 A 第 2.1 节）。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D32-01 v3 | **子 agent 人类 IRC 的受信 reader 凭据：deploy 向 Mux 与 Lab 注入独立凭据，Lab 只在自己的受信 reader 连接上使用、不传给 dial/omp；Lab 容器内同一用户的进程不是沙箱，Mux 文档的隔离要求据此改写** | D7-19 凭据段与配置段（PM `d0b4a86` 后版本，`DEC/D7-lab-backend.md:79`）；D7-04 ③ 启动配方（`DEC/D7-lab-backend.md:64`）；D3-12 受信 reader 一句（`DEC/D3-network-mux.md:66`，文字不变，只引用）。承载：W-09 `Pepgent/Pepgent` `apps/web/src/server/lab/**`（[#24](https://github.com/Pepgent/Pepgent/issues/24)，[PR#58](https://github.com/Pepgent/Pepgent/pull/58)）；W-04 `Pepgent/deploy` `stacks/pepgent-central/`、`README.md:97`；W-01 `Pepgent/omp-rpc-mux` `README.md:117` | 1. **注入（W-04）：** `Pepgent/deploy` 按 D7-19（PM `d0b4a86` 后版本）凭据段的既定注入路径，为每个 Lab 的 Mux 实例生成一个与该 Lab 部署 bearer 不同的受信 reader 凭据，同一来源注入两处：该 Lab `mux` 的 serve（`--trusted-reader-token-file` 或 `MUX_TRUSTED_READER_TOKEN`，形式由 deploy 定），以及 `lab-web` 中该 Lab 的实例配置（与该 Lab 的 Mux URL 同一配置来源，按 `labId` 选择）。中心 Stack 单 Lab 部署以 `lab-web` 环境变量 `MUX_TRUSTED_READER_TOKEN` 注入，这个名字是单 Lab 的注入入口，不是所有 Lab 共用的进程级唯一凭据；多 Lab 部署的配置形状沿用 D18-05/D7-19 的占位，不另定义。名字与 Mux、W-08 S1 一致（F4）。`DEP/README.md:97` 的“人工 IRC 不在 DEP-01 完成结论内”改为现行注入说明。<br>2. **使用（W-09）：** Lab 后端按 `labId` 选择该 Lab 的 Mux 受信 reader 凭据，与该 Lab 的 Mux URL 来自同一配置来源（D7-19，PM `d0b4a86` 后版本）；单 Lab 部署读 `MUX_TRUSTED_READER_TOKEN`，多 Lab 部署的配置形状沿用 D18-05/D7-19 的占位，不另定义。该凭据只用于自己到该 Lab Mux 的 `/agents/{id}/reader` 受信连接（D7-08），对子 agent 发 `mux_human_irc`、`mux_human_irc_edit`、`mux_human_irc_withdraw`，`principal` 取当前用户（D7-09）。启动 dial 时，在继承的 Lab 容器环境之上设置 `MUX_GENERATION={g}`、`MUX_TOKEN={t}`、`SOROI_ROLE=Main`，以及取所属 Lab 配置的 `SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`（所属 Lab Mux 的部署 bearer，soroi 监管者开子 agent 的 writer 要用，F2-5）；并从传给 dial 的环境中删除受信 reader 凭据（单 Lab 部署即删除 `MUX_TRUSTED_READER_TOKEN`）。D13-01 的中心身份（`SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`）等其余既有启动输入，照常沿继承链到达根 omp。D7-04 ③ 的 env 句按同样说法回写：在继承的 Lab 容器环境之上设置这六项，并从传给 dial 的环境中删除受信 reader 凭据，D13-01 的中心身份等其余既有启动输入照常沿继承链到达；D7-19 凭据段补一句：各 Lab 的受信 reader 凭据与该 Lab 的 Mux URL 同属按 `labId` 选择的实例配置，只交 Lab 后端，不进 dial/omp 的环境。<br>3. **边界（W-01）：** `MUX/README.md:117` 改为：受信凭据只注入 serve 与 Lab 后端；Lab 后端启动 dial 时不经环境把它传给 omp。Lab 容器内同一用户的进程不是沙箱，与 D13-05 相同，凭据只是不经子进程环境传递。D3-12 的区分对象是持受信凭据的 Lab 后端连接与只持部署 bearer 或代 token 的连接（远程作业、普通 reader），D3-12 文字不变。<br>4. **承载与合入：** 定案后由协调席用 `council dispatch` 在 `Pepgent/deploy`（W-04）、`Pepgent/omp-rpc-mux`（W-01）各开承载 issue；W-09 在 #24 / PR#58 内实现第 2 步，合入只做本仓检查，不等 W-04 部署上线（C1-3、U83），跨组件运行由阶段 C 的 F25 验收。W-08 S1 已按此做法实现（F4），不另开承载。表决期间 W-09 只暂停子 agent `human.irc`，PR#58 在本行定案并补齐 W-09 侧实现后再合入，不以 `not_supported` 关闭 #24。 | **得到：**<br>- F25 的 GUI 路径能走通，`not_supported` 不再是终态（F6）。<br>- 保持 D2-20/D7-19 的同容器拓扑与 D7-04 的本机 dial，不改镜像用户、卷属主或容器划分。<br>- 与 D13-05 的同容器边界口径一致，与 W-08 S1 已实现的做法一致，名字只有一个。<br>**代价：** 同容器同用户的根 omp 仍能通过进程检查或读 Lab 的初始环境拿到凭据，从而以任意 `principal` 发人类帧；本行明确接受这一点：Lab 容器内同一用户的进程不是沙箱，与 Lab 业务库、部署私钥、remote 凭据的现状相同。<br>**落选：**<br>- a 同容器分 OS 用户（Lab 专用用户持 file-backed secret，以另一用户降权启动 dial）：要改镜像（W-03）、deploy、Lab 降权能力和会话 worktree 卷、omp session 卷的属主权限，为 D13-05 已声明“不是沙箱”的边界加机制（闸门 A 不推荐）。<br>- b 拆容器（受信连接放到不运行 omp 的容器）：推翻 D2-20/D7-19“根会话与写方同在一个容器”的拓扑与共享卷划分（闸门 A 反对）。<br>- d 维持 `not_supported`：F25 GUI 路径不可达，违背 `(U) #7bfe3696`、`U2`、`U23`（闸门 A 否决作为终态）。<br>- 只剔除 env、不改 Mux 文档：组件文档与已表决拓扑继续冲突，部署方无法同时满足两者。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD32c）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

- D32-01 v2（DeskReviseD3201，2026-11-01T18:07:04.982Z）：按 ClaudeHigh（ClaudeHighD32）与 LeadMentor（LeadMentor-2）两张反对票的同一反例做最小修订，不改本行主张、取舍、落选方案、category、missingDesign、domains、notify。

**反例共同点：** v1 第 1 步按“每个 Lab 的 Mux 实例”各生成一个受信 reader 凭据，第 2 步却让 Lab 后端只读一个进程级 `MUX_TRUSTED_READER_TOKEN`。D18-05/D7-19 下一个多租户 Lab 后端承载多个 Lab，单一 env 只能装下一个 Lab 的凭据，另一个 Lab 的受信 reader 得 401 或无人类帧权限，F25 GUI 路径不通；若改为全部 Lab 共用一个值，又违背第 1 步。这与 D7-19“按 `labId` 选择该 Lab 实例的配置，不以进程级单一入口作为所有 Lab 的入口”冲突。

**修订内容：**
1. 第 2 步：Lab 后端按 `labId` 选择该 Lab 的 Mux 受信 reader 凭据，与该 Lab 的 Mux URL 来自同一配置来源（D7-19，PM `d0b4a86` 后版本）；单 Lab 部署以 `MUX_TRUSTED_READER_TOKEN` 注入；多 Lab 的配置形状沿用 D18-05/D7-19 占位，不另定义。
2. 第 1 步与之对齐：凭据注入 `lab-web` 中该 Lab 的实例配置，并写明 `MUX_TRUSTED_READER_TOKEN` 只是单 Lab 的注入入口，不是所有 Lab 共用的进程级唯一凭据。
3. D7-04 ③ 回写的 env 清单逐项写全：`MUX_GENERATION`、`MUX_TOKEN`、`SOROI_ROLE=Main`、`SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`（所属 Lab Mux 的部署 bearer，传给 dial），受信 reader 凭据不传。
4. where 与 how 中引用 D7-19 处标明按 PM `d0b4a86` 后版本（凭据段与配置段，`DEC/D7-lab-backend.md:79`）。

**ClaudeHigh 反例如何消除：** 其复现第 2–3 步依赖“第 2 步规定只读一个进程级变量”。v2 第 2 步改为按 `labId` 取该 Lab 的凭据，L2 的受信 reader 用的是 M2 的 T2，与 M2 serve 的值同源，人类帧有权限，F25 在 L2 上走通；第 1 步“每 Lab 一个”保持不变，也不再需要给所有 Mux 共用一个值，两步不再互相矛盾。v2 没有给多 Lab 定配置形状，只沿用 D18-05/D7-19 占位，不再写入 D7-19 禁止的进程级单一入口。该席要求的第二项（D7-04 ③ 写全 env，`MUX_AUTH_TOKEN` 传 dial、受信凭据不传）已写入第 2 步。

**LeadMentor 反例如何消除：** 其第 3–4 步的缺口是“一个进程的同名环境变量只有一个值，仅按 labId 选对 Mux URL 不能使凭据变成对应值”。v2 让 reader 凭据与该 Lab 的 Mux URL 同属按 `labId` 选择的既有实例配置，从同一 Lab 的部署来源取得，Lab A 用 TA、Lab B 用 TB；不新建配置框架、secret 副本或特定 env/JSON 形式，多 Lab 供给形状保持 D18-05/D7-19 占位。该席要求“若保留 `MUX_TRUSTED_READER_TOKEN` 作为单实例入口名称，需要明确它不是所有 Lab 共用的唯一凭据来源”，已在第 1 步写明。

v1 全部选票按规则作废，请各资格席按 v2 重投。

- D32-01 v3（DeskReviseD3201v3，2026-11-01T18:14:19.654Z）：按 ClaudeHigh（ClaudeHighD32b）与 LeadMentor（LeadMentor-2）对 v2 的两张反对票做最小修订。两份反例指向同一处，修订采用反例给出的写法。本行主张、取舍、落选方案、category、missingDesign、domains、notify 均不变。

**反例共同点：** v2 第 2 步把传给 dial 的环境写成“逐项为”六项的封闭清单，还要求 D7-04 ③“按此逐项写全”。这份清单漏掉了 D13-01（`DEC/D13-contract-gaps.md:44`）规定中心 Main 必填的 `SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`，也漏掉了 `PATH`、`HOME`、`REMOTE_*` 等继承环境。D13-01 规定这两个身份“沿现有 env 传播链到达根 omp”；omp-soroi 以 Main 角色加载时由 `executionIdentity` 读取它们，读不到就抛错（`omp-soroi/src/eval/identity.ts:63-69`），根 Main 起不来，F25 走不到。

**修订内容（只改两处措辞）：**
1. 第 2 步：启动 dial 时，在继承的 Lab 容器环境之上设置 `MUX_GENERATION={g}`、`MUX_TOKEN={t}`、`SOROI_ROLE=Main`，以及取所属 Lab 配置的 `SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`；并从传给 dial 的环境中删除受信 reader 凭据（单 Lab 部署即删除 `MUX_TRUSTED_READER_TOKEN`）。D13-01 的中心身份等其余既有启动输入，照常沿继承链到达根 omp。
2. D7-04 ③ 的回写要求改用同样的说法，去掉“逐项写全”。

按 `labId` 取凭据、第 1、3、4 步、D7-19 凭据段补句、取舍与落选方案沿用 v2。

**ClaudeHigh 反例如何消除：** 该反例指出 v2 文字两种读法都不成立。读成封闭集合，根 Main 缺两个中心身份和 `PATH`，插件加载失败，`omp-rpc-mux` 也找不到。读成叠加，“逐项写全”就是一句自称完整的错误清单，与 D13-01 的传播链矛盾。v3 明写“在继承的 Lab 容器环境之上设置”，只有封闭集合这一种读法被排除。D13-01 的两个身份、`PATH`、`HOME`、`REMOTE_*` 都随继承链到达根 omp，与现行 D7-04 ③“omp 继承同一份 env”、`MUX/README.md:117`“dial 会继承调用方环境”、PR#58 `sessions.ts:188-196` 的现有做法一致。“逐项写全”已删除，正文不再留一句不完整却自称完整的清单。受信凭据不进 omp 的效果由“从传给 dial 的环境中删除”保证，没有新增任何机制。修订句与该席给出的最小修订逐字对应。

**LeadMentor 反例如何消除：** 该席给出的消除方式之一是“明确延续原有已生效启动环境契约，只排除受信 reader 凭据”。v3 第 2 步正是这样写的：继承的 Lab 容器环境照常传给 dial，在其上设置六项，只删除受信 reader 凭据，并点名 D13-01 的中心身份照常沿继承链到达根 omp。按该席复现第 1 步，deploy 已向 `lab-web` 注入合法身份；按 v3 启动的根 omp 能读到这两个值，`executionIdentity` 不再抛错，插件加载并注册控制端点，F25 路径可达。两个身份仍由部署给出，插件不设默认值、不推导，也不自读 Docker，符合该席的要求。该席确认已消除的 v1 反例（凭据按 `labId` 与 Mux URL 同源）保持 v2 原文，没有回退。

v2 全部选票按规则作废，请各资格席按 v3 重投。


## 原票

各席原票见 `votes/D32-Coordination.md`、`votes/D32-ClaudeHigh.md`、`votes/D32-Argon.md`、`votes/D32-LeadMentor.md`、`votes/D32-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。