# D32 选票：ClaudeHigh

议程：Pepgent#24 LAB-08：子 agent 人类 IRC 的受信 reader 凭据注入与边界（[Pepgent/PM#51](https://github.com/Pepgent/PM/issues/51)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D32-01 v1：赞成（ClaudeHighD32，2026-11-01T18:03:54.284Z）——作废：该行已修订到 v3



## ClaudeHigh（ClaudeHighD32）对 D32-01 v1 的选票：赞成

审阅时读了 PM#51 正文、`evidence/gates/pepgent-24{,-gate-a,-gate-b}.md`、D2-06/D2-20/D2-23、D3-06/D3-12、D7-04/D7-19、D13-05 原文，以及 `omp-rpc-mux/README.md:24-26,84-117`、`deploy/stacks/pepgent-central/{compose.yaml,lab-entrypoint.sh}`、`deploy/README.md:97-113`、PR#58 worktree 的 `apps/web/src/server/lab/{sessions.ts,runtime.ts,mux.ts}` 和 `soroi/e2e/s1/README.md:51,53`。

### steady（契约闭合）

1. **权威和注入路径都不变。** D7-19 凭据段已经写明“各 Lab Mux 的写方与读方凭据……由 `Pepgent/deploy` 按既定路径注入”，D3-06 也规定 mux 与它的读写方共用同一凭据来源。本行只把受信 reader 凭据补进这条已有路径，没有新增权威，也没有新增注入方。
2. **名字全部对得上。** Mux serve 接受 `MUX_TRUSTED_READER_TOKEN` 或 `--trusted-reader-token-file`，并要求它的值与部署 bearer 不同（`MUX/README.md:26`）。S1 F25/F16 用的也是这个名字，并且已经实现“传给 dial/omp 时去掉，只留给自己的受信 reader”（`SOR/e2e/s1/README.md:51,53`）。Lab 侧采用同一个名字后，三方只有一个名字。
3. **主路径能走通，不需要其他前提。**
   - 人类帧走的路：Lab 用受信凭据连 `/agents/{id}/reader`，Mux 把帧只转给 writer（`MUX/README.md:113,115`）。子 agent 的 writer 是根 omp 进程内的 supervisor，它用部署 bearer 建 writer 连接，不需要受信凭据（`subagent.md:50`、F2-5）。所以把受信凭据从 dial 环境中去掉，不影响根 omp 或子 agent 的任何功能。`MUX_AUTH_TOKEN` 照旧传给 dial（`sessions.ts:194`）。
   - 停驻、代未 ready 时人类帧也能转交（`MUX/README.md:115`），D3-07 的“声明跨越停驻”覆盖这种情况。
4. **D13-05 口径一致，deploy 已有同样做法。** `lab-entrypoint.sh:9,11` 已经在 `exec` 前 `unset` 了 `MUX_GENERATION`、`MUX_TOKEN` 和 remote 凭据。D13-05 的取舍栏写着“同一容器、同一用户，这不是沙箱”，收益只是“不经子进程环境传递”。本行把 `MUX/README.md:117` 的口径改成同样的说法，解决了组件文档与已表决拓扑（D2-20/D7-19）之间“部署方无法同时满足两者”的冲突。闸门材料 F2-4 已经证明，不改这段文字时，同 UID 拓扑无法满足它。
5. **承载齐全。** W-04 和 W-01 各开承载 issue，W-09 在 #24/PR#58 内实现，W-08 已经实现。闸门 B 的 B2-3 要求写明承载，本行已写；B2-2 的“只暂停依赖部分、不以 not_supported 关闭 #24”也已写入。合入不等 W-04 上线，符合 C1-3/U83，跨组件运行交给阶段 C 的 F25 验收。

### divergent（是否有更简的主路径）

- **备选 a（分 OS 用户）和 b（拆容器）**：都要为 D13-05 已声明“不是沙箱”的边界新增机制，b 还推翻 D2-20/D7-19 的拓扑，所以本行不选它们是对的。
- **让部署 bearer 也能发人类帧（彻底不要第二个凭据）**：会让持部署 bearer 的其他连接（远程作业、普通 reader）也能冒充人类来源，违背 D3-12 的区分对象。保留独立凭据是零新增机制的最小做法，Mux 已经实现了它（MUX-05）。
- **把人类帧改走根控制端点或 host tool**：要给 D3-19 的封闭请求联合加新方法，而且帧会经过根 omp 进程，信任面并不比现在小。不如本行简单。
- **代价写得如实。** 本行明确承认，同 UID 的根 omp 能读到 Lab 的初始环境，从而伪造 principal。这和 `lab.sqlite`（含 `human_irc_queue`）、部署私钥、remote home 本来就和根 omp 在同一 UID 下的现状属于同一类。闸门 A 已经依 `(U)` 判定这不违背意图。

### 不阻断的落地提示（不构成反例）

- **多 Lab 时凭据怎么配。** “每个 Lab 一个受信凭据”而 Lab 只读一个 `MUX_TRUSTED_READER_TOKEN`。这和现有单一 `MUX_AUTH_TOKEN` 处在同一个 D18-05/D7-19 占位里（“先假定能工作，不另定义配置形状”），单 Lab 部署的主路径不受影响。Argon 回写 D7-19 时，建议把受信凭据和 `MUX_AUTH_TOKEN` 放在同一处占位里说明。
- **D7-04 ③ 的 env 清单不全。** 这份清单现在本来就没列 `MUX_AUTH_TOKEN`，而 F2-5 表明根 omp 需要它。回写时建议在补的那句里同时写明“`MUX_AUTH_TOKEN` 传给 dial，`MUX_TRUSTED_READER_TOKEN` 不传”，让配方与实现（`sessions.ts:188-196`）逐项一致。


## D32-01 v1：反对（ClaudeHighD32，2026-11-01T18:04:55.181Z）——作废：该行已修订到 v3

**反例：** # D32-01 v1 反例：本行第 1 步与第 2 步对凭据粒度的规定互相矛盾，在 D18-05 的多 Lab 主路径上，第二个 Lab 的子 agent 人类 IRC 无法送达

## 冲突点

| 位置 | 原文 |
|---|---|
| D32-01 v1 how 第 1 步 | “为**每个 Lab 的 Mux 实例**生成一个与部署 bearer 不同的受信 reader 凭据，同一来源注入两处：`mux` 的 serve……与 `lab-web` 的环境变量 `MUX_TRUSTED_READER_TOKEN`” |
| D32-01 v1 how 第 2 步 | “Lab 后端**启动时读取 `MUX_TRUSTED_READER_TOKEN`**，只用于自己对 `/agents/{id}/reader` 的受信连接” |
| D7-19（`DEC/D7-lab-backend.md:79`） | “每新增一个 Lab，部署独立的 store、Mux……Lab 后端按 `labId` 选择该 Lab 实例的 store URL、Mux URL 与 remote home，**不以进程级单一** `SOROI_STORE_URL`、`SOROI_MUX_URL` **作为所有 Lab 的入口**”；凭据段写的是“**各 Lab Mux** 的写方与读方凭据……由 `Pepgent/deploy` 注入” |
| D18-05、D29-01 | 每个 Lab 一套 soroi 实例，各有独立的 Mux，agent 的所属 Lab 取它所在的 Mux 实例（`(U) bf96d256`、`d5277d47`） |
| D7-08（`DEC/D7-lab-backend.md:68`） | Lab 根据 D18-05、D29-01，到调用者所在 Lab 的那个 Mux 实例上连 `/agents/{id}/reader` |

## 复现（只按决策文本推演主路径）

1. 按 D18-05 部署两个 Lab：L1 和 L2，各有一个 Mux（M1、M2）。
2. 按本行第 1 步，deploy 给 M1、M2 各生成一个受信凭据 T1、T2（T1≠T2），并且“同一来源”注入 `lab-web`。但第 2 步规定 Lab 后端只读一个进程级变量 `MUX_TRUSTED_READER_TOKEN`，这个变量只能装下 T1 或 T2 中的一个。
3. L2 的成员在 GUI 里对 L2 的子 agent 发 `human.irc`。Lab 按 D7-08 到 M2 上用这个唯一的值建受信 reader。假设这个值是 T1：
   - M2 不接受 T1。按 `MUX/README.md:86`，这条连接要么得 401，要么被当作没有人类帧权限的普通 reader；
   - 按 `MUX/README.md:115`，人类帧随后被拒，“非法或无权帧……只终止发送它的 reader”。
4. 结果：L2 上的 F25（`DEC/D8-mvp-scope.md:144`）在 GUI 路径上走不通。这正是本行在“得到”里说要消除的 `not_supported` 终态。

如果改成给所有 Mux 注入同一个值，就违反了第 1 步“每个 Lab 生成一个”。所以只按本行文字执行，无论怎么注入都会有一处违反。

## 为什么 D7-19 的占位不能豁免

D7-19 留作占位的是“新增 Lab 的部署单元边界与供给方式”，并且写明“不另定义配置形状”。本行第 2 步却定下了一个配置形状：进程级单一 env。这个形状正是 D7-19 对 URL 明文禁止的“进程级单一入口”。所以这是本行新写进决策正文的冲突，不是占位里的不确定。顺带说明，现有实现中 `MUX_AUTH_TOKEN` 也是单一变量（`runtime.ts:30`），但那是代码现状，不是已表决的正文，不能作为先例。

## 最小修订建议（不改本行的主张）

- 第 2 步改为：“Lab 后端按 `labId` 选择该 Lab 的 Mux 受信 reader 凭据，与该 Lab 的 Mux URL 走同一配置来源（D7-19）；中心 Stack 单 Lab 部署以 `MUX_TRUSTED_READER_TOKEN` 注入；多 Lab 的配置形状沿用 D18-05 的占位”。
- 写回 D7-04 ③ 时，把 env 清单逐项写全：`MUX_AUTH_TOKEN` 传给 dial，受信 reader 凭据不传。现在的 D7-04 ③ 清单里没有 `MUX_AUTH_TOKEN`，而 F2-5 表明根 omp 需要它，PR#58 的 `sessions.ts:194` 也已经传了。

修订后，本席对本行的其余内容（注入路径、名字统一、dial 环境去掉凭据、`MUX/README.md:117` 对齐 D13-05、承载与合入）都会投赞成。理由见选票正文。


## ClaudeHigh（ClaudeHighD32）对 D32-01 v1 的选票：反对（附可复现反例，修订后可转赞成）

本席最初投了赞成，当时把多 Lab 下凭据粒度的问题当作不阻断的落地提示。投出后重新逐句对照了 D7-19 原文。本行第 2 步把“进程级单一 `MUX_TRUSTED_READER_TOKEN`”写进了决策正文，而第 1 步要求“每个 Lab 的 Mux 实例各一个凭据”，两步互相矛盾；进程级单一入口也正是 D7-19 对 URL 明文禁止的形状。这个问题不在 D18-05 的占位范围内，而是本行新引入的冲突，在多 Lab 主路径上会让 F25 走不通。因此改投反对，反例见 `--counter`。本席是独立审查席，改投依据是自己的复核，不是因为看到了 LeadMentor 的票。

审阅时读了 PM#51 正文、`evidence/gates/pepgent-24{,-gate-a,-gate-b}.md`、D2-06/D2-20/D2-23、D3-06/D3-12、D7-04/D7-08/D7-19、D13-05 原文，以及 `omp-rpc-mux/README.md:24-26,84-117`、`deploy/stacks/pepgent-central/{compose.yaml,lab-entrypoint.sh}`、`deploy/README.md:97-113`、PR#58 worktree 的 `apps/web/src/server/lab/{sessions.ts,runtime.ts,mux.ts}`，以及 `soroi/e2e/s1/README.md:51,53`。

### steady 立场：以下各项本席认可，修订后可投赞成

1. **权威与注入路径不变。** D7-19 凭据段已经规定“各 Lab Mux 的写方与读方凭据由 `Pepgent/deploy` 注入”，D3-06 规定读写方的凭据同源。本行只是把受信 reader 凭据补进这条已有路径。
2. **名字只有一个。** Mux serve 的 `MUX_TRUSTED_READER_TOKEN` 或 `--trusted-reader-token-file` 要求值与部署 bearer 不同（`MUX/README.md:26`）。S1 的 F25/F16 已经采用“从 dial/omp 环境中去掉、只留给受信 reader”的做法（`SOR/e2e/s1/README.md:51,53`）。
3. **主路径无需额外前提。** 子 agent 的 writer 是根 omp 内的 supervisor，它用部署 bearer 建立连接，不需要受信凭据（`subagent.md:50`、F2-5）。Mux 只把人类帧转给 writer，停驻期间也能转交（`MUX/README.md:113,115`）。因此 dial 的环境里去掉受信凭据，不影响任何功能。
4. **与 D13-05 和 deploy 现有做法一致。** `lab-entrypoint.sh:9,11` 已经在 exec 之前 unset 了代 token 和 remote 凭据。`MUX/README.md:117` 改写后与 D13-05 的“同一容器、同一用户，这不是沙箱”一致，消除了组件文档与 D2-20/D7-19 拓扑之间的冲突（闸门材料 F2-4）。
5. **承载与合入满足闸门 B 的要求。** B2-2、B2-3 两项都已满足，也符合 C1-3、U83。

### divergent 立场：没有更简的主案

- 备选 a（分 OS 用户）和 b（拆容器），都是为 D13-05 已经声明“不是沙箱”的边界额外加机制，落选是对的。
- 让部署 bearer 直接获得人类帧权限：远程作业和普通 reader 也持有部署 bearer，这样它们都能冒充人类，违反 D3-12 对二者的区分。
- 人类帧改走根控制端点或 host tool：需要扩展 D3-19 的封闭联合，而且仍要经过根 omp，信任面并没有缩小。
- 本行在“代价”里写明了同 UID 进程可以伪造 principal。这与 `lab.sqlite`（`human_irc_queue`）、部署私钥、remote home 的现状属于同一类，闸门 A 已依据 `(U)` 判定不违背意图。

### 反对的唯一理由与修订方向

见 `--counter`。第 2 步改为“按 `labId` 选择该 Lab 的 Mux 受信凭据，与该 Lab 的 Mux URL 走同一配置来源。单 Lab 部署以 `MUX_TRUSTED_READER_TOKEN` 注入；多 Lab 的配置形状沿用 D18-05 占位”。另外，回写 D7-04 ③ 时，把 env 清单逐项写全：`MUX_AUTH_TOKEN` 传给 dial，受信凭据不传。


## D32-01 v2：赞成（ClaudeHighD32b，2026-11-01T18:11:13.497Z）——作废：该行已修订到 v3



## ClaudeHigh（ClaudeHighD32b）对 D32-01 v2 的选票：赞成

本席是新派的空白历史实例，按 v2 原文独立复核。核对的材料如下：

- 行原文与 row_history、修订理由 `/tmp/d3201/why.md`；
- v1 的两份反例：ClaudeHighD32 的 `/tmp/claudehigh-d32-counter.md`，以及 ballot 104 中 LeadMentor-2 的反例；
- `evidence/gates/pepgent-24{,-gate-a,-gate-b}.md`；
- 决策正文：D7-04 ③（`DEC/D7-lab-backend.md:64`）、D7-08、D7-19 的多 Lab 段、凭据段与配置段（`:79`）、D13-05（`DEC/D13-contract-gaps.md:48`）、D18-05（`DEC/D18-product-opus-contracts.md:11`）、D3-12（`DEC/D3-network-mux.md:66`）；
- Mux 与 e2e 文档：`omp-rpc-mux/README.md:26,115,117`、`soroi/e2e/s1/README.md:51,53`；
- deploy：`deploy/stacks/pepgent-central/{compose.yaml,lab-entrypoint.sh}`；
- PR#58 worktree（`pepgent-lab-08`）中的 `apps/web/src/server/lab/sessions.ts:186-197`；
- `pepgent-images/Dockerfile:17-26`。

### v1 反例是否已消除（steady）

1. **凭据粒度两步一致。** 第 1 步按“每个 Lab 的 Mux 实例”生成凭据。第 2 步改为按 `labId` 从该 Lab 的实例配置取凭据，来源与该 Lab 的 Mux URL 相同。这与 D7-19 配置段“各 Lab 的 store URL、Mux URL、remote home……按 `labId` 选择”和凭据段“各 Lab Mux 的写方与读方凭据由 `Pepgent/deploy` 注入”逐字对应。
   - 在两 Lab 主路径上，L2 的受信 reader 用 T2 连接 M2。M2 serve 注入的是同源的 T2（`MUX/README.md:26` 只接受一个非空来源，并且要求它不同于 bearer），所以人类帧有权限，按 `MUX/README.md:115` 转给 writer。
   - v1 反例第 2–3 步依赖“只读一个进程级变量”，v2 已经没有这个前提，反例不再成立。LeadMentor 反例第 3–4 步的“同名 env 只有一个值”也随之消除。
2. **没有新写入进程级单一入口。** `MUX_TRUSTED_READER_TOKEN` 被明确限定为单 Lab 的注入入口，多 Lab 的配置形状沿用 D18-05/D7-19 的占位。这与 D7-19 对 `PEPGENT_LAB_WORKTREE_HOME=/work` 的处理一致：中心 Stack 单 Lab 用一个 env 注入，配置接口仍按 `labId` 选择。本行没有自定配置形状，也没有新增 secret 副本。
3. **dial 环境写全。** 清单补上了 `MUX_AUTH_TOKEN`，即所属 Lab Mux 的部署 bearer。soroi supervisor 为子 agent 建 writer 时要用它（F2-5），PR#58 `sessions.ts:194` 也已经传了。受信 reader 凭据明确不传。“后三项取所属 Lab 的配置”与 D7-19“根会话每代 dial 和 omp 继承的这两个环境变量，取所属 Lab 的配置”一致。
4. **其余部分与 v1 相同，本席认可。**
   - 权威与注入方不变，仍是 deploy 按 D7-19 既定路径注入，D3-06 规定同源。
   - 三方用同一个名字：Mux README:26、S1 README:51,53、Lab。
   - 子 agent 的 writer 是根 omp 内的 supervisor，它用部署 bearer 连接，不需要受信凭据，所以从 dial 环境中去掉受信凭据不影响任何功能。
   - `MUX/README.md:117` 对齐 D13-05“同一容器、同一用户，这不是沙箱”，消除了组件文档与 D2-20/D7-19 拓扑的冲突（闸门材料 F2-4，闸门 A 的 A2-1 判定不违背意图）。
   - 承载与合入满足闸门 B 的 B2-2、B2-3，以及 C1-3、U83：W-04、W-01 用 `council dispatch` 开承载，W-09 在 #24/PR#58 内实现，不以 `not_supported` 关闭 #24。

### divergent：是否有更简的主案

- 落选方案 a（分 OS 用户）与 b（拆容器）都是为 D13-05 已声明“不是沙箱”的边界加机制，b 还要推翻 D2-20/D7-19 的拓扑。不选它们是对的。
- **让部署 bearer 直接发人类帧，不设第二个凭据。** 远程作业和普通 reader 也持部署 bearer，这样做违背 D3-12 对两者的区分。
- **人类帧改走根控制端点或 host tool。** 需要扩展 D3-19 的封闭联合，帧仍要经过根 omp，信任面没有缩小。
- **Lab 自己当子 agent 的 writer。** 子 agent 的 writer 是 supervisor（D3-06、D3-10、D3-12），待投递表也归它。Lab 当 writer 会让待投递表出现第二个持有者。
- 本行在“代价”中写明了同 UID 进程能取得凭据并伪造 principal。这和 `lab.sqlite`（`human_irc_queue`）、部署私钥、remote home 属于同一类现状，闸门 A 已依据 `(U)` 判定可以接受。

### 不阻断的落地提示（不构成反例）

- **回写 D7-04 ③ 时说明 env 是叠加关系。** 建议写成“在 Lab 容器环境之上设置以下各项，并去掉受信 reader 凭据”，避免被读成 D13-05 那样的封闭集合。
  - 现行 D7-04 ③ 写的是“omp 继承同一份 env”，`MUX/README.md:117` 写的是“dial 会继承调用方环境”，PR#58 的实现也是 `{...process.env, …}`。因此“逐项写全”在既有语境里指 Lab 自己设置的各项，是叠加。
  - 如果实现者照 D13-05 的写法把它当成只含这六项的封闭集合，`PATH` 和 `REMOTE_HOME`、`REMOTE_MUX` 都会丢失，`/usr/local/bin/omp-rpc-mux` 也找不到（`pepgent-images/Dockerfile:24`）。
  - 这是回写措辞的问题，主案本身没有这个缺陷，所以不作反例。
- **单 Lab 实现必须真正删除该变量。** 中心 Stack 会把 `MUX_TRUSTED_READER_TOKEN` 注入 `lab-web` 进程环境，而 W-09 采用叠加写法，所以必须显式删除这个名字，不能只是不在叠加项里写它。第 2 步的“受信 reader 凭据不传”已经覆盖这一点。


## D32-01 v2：反对（ClaudeHighD32b，2026-11-01T18:12:14.457Z）——作废：该行已修订到 v3

**反例：** # D32-01 v2 反例：第 2 步写明 dial 环境“逐项为”六项，并要求 D7-04 ③ 按此“逐项写全”，与 D13-01 的 env 传播链冲突，根 Main 启动失败

## 冲突点

| 位置 | 原文 |
|---|---|
| D32-01 v2 how 第 2 步 | “启动 dial 时传给它的环境**逐项为**：`MUX_GENERATION={g}`、`MUX_TOKEN={t}`、`SOROI_ROLE=Main`、`SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`……；受信 reader 凭据不传。D7-04 ③ 的 env 清单**按此逐项写全**” |
| D13-01（`DEC/D13-contract-gaps.md:44`） | 部署给中心 agent 容器注入 `SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`；插件在 **Main 角色启动时**与 `SOROI_STORE_URL` 一起解析这两个**必填值**；“这两个值**沿现有 env 传播链到达根 omp**（Lab 后端、e2e standin 已透传，无需改动）” |
| D13-05（`DEC/D13-contract-gaps.md:48`） | 本行“得到”和第 3 步都说与 D13-05 口径一致。D13-05 对环境采用**封闭集合**的写法：“只得到插件内固定的集合：`PATH` = …，`BUN_BE_BUN=1`；不传 `HOME`” |
| `soroi/packages/omp-soroi/src/index.ts:39-42` | Main 角色在模块初始化时执行 `executionIdentity(process.env, packageRoot)` |
| `soroi/packages/omp-soroi/src/eval/identity.ts:63-69` | 缺少 `SOROI_CENTRAL_IMAGE_DIGEST` 时抛出 `… is required for the Main role` |
| `pepgent-images/Dockerfile:24`；deploy `compose.yaml` lab-web `environment` | `omp-rpc-mux` 位于 `/usr/local/bin`。根 omp 运行时还要用到 `PATH`、`HOME`、`REMOTE_HOME`、`REMOTE_MUX`，这几项都不在六项之内 |

## 复现（只按决策文本与现有源码推演主路径，单 Lab、无竞态）

1. deploy 按 D13-01 向 Lab 容器注入两个合法的中心身份。用户在 GUI 向根会话发第一条消息，Lab 按 D7-04 开第一代。
2. 实现者按本行第 2 步和回写后的 D7-04 ③ 实现，传给 dial 的环境恰好是这六项。本行用了“逐项为”“逐项写全”，又以 D13-05 的封闭集合为对齐口径，所以这是对文本的忠实读法，不是曲解。
3. omp 继承这份环境（D7-04 ③“omp 继承同一份 env”）。omp-soroi 以 Main 角色加载时，`executionIdentity` 读 `SOROI_CENTRAL_IMAGE_DIGEST`，读不到就抛错。插件加载失败，不注册 `eval:<session>` 端点，subagent supervisor 也不存在。
4. 第 3 步还没走到就会先断：环境里没有 `PATH`，Node 的 `spawn('omp-rpc-mux')` 只在默认的 `/usr/bin:/bin` 中查找，找不到 `/usr/local/bin/omp-rpc-mux`。
5. 结果：根会话起不来，也就没有子 agent。F25（`DEC/D8-mvp-scope.md:144`）的 GUI 路径和其他所有根会话功能一起失效。

## 两种读法都不成立

- **读成封闭集合：** 按上面的复现，主路径失效。
- **读成叠加（在继承的容器环境之上设置这六项）：** 现行 D7-04 ③、`MUX/README.md:117`“dial 会继承调用方环境”、PR#58 `sessions.ts:188-196` 都是这种读法。但这样“逐项写全”就与事实不符：D13-01 的两项身份、`PATH`、`HOME`、`REMOTE_*` 也是根 omp 的启动输入，清单并没有写全。决策正文会留下一句自称完整的错误清单，与 D13-01 的“沿现有 env 传播链”相矛盾。

所以无论按哪种读法执行，本行文字都有一处不成立。这个问题由 v2 新写入的“逐项写全”引起，不属于 D18-05 的占位，也不是边缘情况或竞态。

## 最小修订（不改主张、取舍与落选方案）

第 2 步改为：

> “启动 dial 时，在继承的 Lab 容器环境之上设置 `MUX_GENERATION={g}`、`MUX_TOKEN={t}`、`SOROI_ROLE=Main`，以及取所属 Lab 配置的 `SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`；并从传给 dial 的环境中删除受信 reader 凭据（单 Lab 部署即删除 `MUX_TRUSTED_READER_TOKEN`）。D13-01 的中心身份等其余既有启动输入照常沿继承链到达根 omp。”

D7-04 ③ 回写时用同样的叠加表述，去掉“逐项写全”。


## ClaudeHigh（ClaudeHighD32b）对 D32-01 v2 的选票：反对（附可复现反例，修订后可转赞成）

**改投说明：** 本实例首张选票投了赞成，当时已在“不阻断提示”里写出：第 2 步的 dial env 若被读成只含六项的封闭集合，会缺 `PATH`、`REMOTE_*`，`/usr/local/bin/omp-rpc-mux` 也找不到。本席当时依据现行 D7-04 ③ 的“omp 继承同一份 env”和 `MUX/README.md:117` 的“dial 会继承调用方环境”，判定这只是回写措辞问题。

投出后看到 tally 中 LeadMentor 的 v2 反例标题，于是自行核对了 D13-01 原文（`DEC/D13-contract-gaps.md:44`）和 `omp-soroi` 源码（`src/index.ts:39-42`、`src/eval/identity.ts:63-69`）。核对结论有两点：

- D13-01 是决策正文，它明确依赖“这两个值沿现有 env 传播链到达根 omp”。
- 本行用“逐项为”“逐项写全”把 D7-04 ③ 定为完整清单，又以 D13-05 的封闭集合写法作为对齐口径。

这样一来，问题不再只是措辞：决策正文之间出现了冲突，并且有一条按文本忠实实现就会失效的主路径。改投依据是本席自己核实的源码与正文，反例中的 `PATH` 和 `omp-rpc-mux` 查找失败一项是首票时就已写出的独立证据。

### steady：v1 反例已消除，其余部分认可

1. **凭据粒度两步一致。** 凭据按 `labId` 从该 Lab 的实例配置选取，来源与 Mux URL 相同，与 D7-19 的配置段、凭据段逐字对应。两 Lab 时 L2 用 T2 连 M2，人类帧有权限（`MUX/README.md:26,115`）。ClaudeHighD32 与 LeadMentor-2 的 v1 反例不再成立。
2. **没有新写入进程级单一入口。** `MUX_TRUSTED_READER_TOKEN` 被限定为单 Lab 的注入入口，与 D7-19 中 `PEPGENT_LAB_WORKTREE_HOME` 的处理同构。
3. **其余要点与 v1 一致。**
   - 权威和注入方不变。
   - 三方用同一个名字（Mux README:26、S1 README:51,53）。
   - 子 agent 的 writer 是 supervisor，它用部署 bearer 连接，不需要受信凭据。
   - `MUX/README.md:117` 对齐 D13-05，闸门 A 的 A2-1 认可这一点。
   - 承载与合入满足闸门 B 的 B2-2、B2-3，以及 C1-3、U83。

### divergent：没有更简的主案

- 落选方案 a（分 OS 用户）与 b（拆容器）是为“不是沙箱”的边界加机制，b 还要推翻 D2-20/D7-19。不选它们是对的。
- **让部署 bearer 直接发人类帧。** 违背 D3-12 对两类连接的区分。
- **人类帧改走根控制端点或 host tool。** 需要扩展 D3-19，帧仍要经过根 omp，信任面没有缩小。
- **Lab 当子 agent 的 writer。** 待投递表会出现第二个持有者，与 D3-06、D3-10、D3-12 冲突。

### 唯一的反对理由

详见 `--counter`。第 2 步新写入的“逐项为 / 逐项写全”有两种读法：

- 读成封闭的六项 env：根 Main 缺 D13-01 的两个必填中心身份，插件加载时抛错；缺 `PATH`，dial 也拉不起来。F25 和所有根会话都会失效。
- 读成叠加：清单并没有写全，与 D13-01 的“沿现有 env 传播链”相矛盾。

最小修订：把第 2 步改为“在继承的 Lab 容器环境之上设置这六项，并从传给 dial 的环境中删除受信 reader 凭据；D13-01 的中心身份等其余既有启动输入照常沿继承链到达”，D7-04 ③ 回写时用同样的表述。按此修订后，本席投赞成。


## D32-01 v3：赞成（ClaudeHighD32c，2026-11-01T18:17:24.460Z）


**分类意见：** 串联

## ClaudeHigh（ClaudeHighD32c）对 D32-01 v3 的选票：赞成

本席是新派的空白历史实例。`council queue --seat ClaudeHigh` 显示队首为 `D32 now — rows D32-01@v3`，`council tally D32` 显示行版本为 v3，资格席 5 个，门槛 4 票。本席从 daemon 的 `row` 表完整读取了 v3 的 what、where、how、tradeoff，以及 `/tmp/d3201v3/why.md`、v2 的两张反例（ClaudeHighD32b `/tmp/claudehigh-d32b-counter.md`；LeadMentor-2 ballot #111），并核对了以下材料：

- `evidence/gates/pepgent-24-gate-a.md`、`pepgent-24-gate-b.md`；
- 决策正文：D7-04 ③ 原文（`D7-lab-backend.md:64`）、D7-19 配置段与凭据段（`:79`）、D13-01、D13-02、D13-05（`D13-contract-gaps.md:44-48`）、D3-12（`D3-network-mux.md:66`）；
- `omp-rpc-mux/README.md:24-26,57-70,84-117`；
- `deploy/stacks/pepgent-central/{compose.yaml,lab-entrypoint.sh}`；
- PR#58 系列 worktree 中的 `apps/web/src/server/lab/sessions.ts:186-196`；
- `soroi/e2e/s1/README.md:51,53` 与 `f25.spec.ts:143-149`。

### steady：契约闭合

1. **v2 反例已消除。** v3 第 2 步写的是“在继承的 Lab 容器环境之上设置”六项，再从中“删除受信 reader 凭据”，不再有“逐项为”和“逐项写全”。按主路径推演：deploy 依 D13-01/02 向 `lab-web` 注入中心身份，`lab-entrypoint.sh` 用 `exec "$@"` 启动 Node，Node 的 `process.env` 含有这两个身份。Lab 按 `{...process.env, 六项}` 并删除受信凭据后启动 dial。README:70 写明 dial 的“其余环境继承调用方”，所以根 omp 能读到 `SOROI_CENTRAL_*`、`PATH`、`HOME`、`REMOTE_*`，`executionIdentity` 不会抛错，`/usr/local/bin/omp-rpc-mux` 也能找到。D7-04 ③ 的回写采用同样说法，正文里不再有一份自称完整却不完整的清单。
2. **v1 的多 Lab 反例没有回退。** 第 1、2 步仍按 `labId` 从同一实例配置取 Mux URL 和受信凭据。`MUX_TRUSTED_READER_TOKEN` 只作为单 Lab 的注入入口。D7-19 凭据段补的那句“各 Lab 的受信 reader 凭据……不进 dial/omp 的环境”覆盖所有 Lab，所以 Lab A 的 dial 也不会继承 Lab B 的受信凭据。
3. **凭据边界真实成立。** Mux serve 位于独立的 `pepgent-central-mux` 容器（`compose.yaml:65-70`），它的环境不会进入根 omp。根 omp 的环境不含受信凭据，因此本机 LocalChild 继承的环境也不含它。远程子 agent 的环境由模板给出。soroi 监管者作为子 agent 的 writer，只需要 `MUX_AUTH_TOKEN`（F2-5），人类帧由 Mux 转给它（README:113-115），用不到受信凭据。
4. **与 D13-02 不冲突。** 配置摘要只覆盖 entrypoint、command 和 files，`lab-web` 新增一个环境变量不改变中心身份。
5. **与已实现做法一致，名字只有一个。** S1 的 F25 已经做到 `delete process.env.MUX_TRUSTED_READER_TOKEN`，只保留给受信 reader 使用（`f25.spec.ts:149`）。Mux 接受同名环境变量或 file 形式，并要求值与部署 bearer 不同（README:26）。D3-12“只有用 Lab 后端凭据建立的受信 reader 连接能发人类帧”的文字不变，本行只是落实它。
6. **承载与门禁符合闸门 A/B 的要求。** 闸门 A 推荐的处置 c 的四个要素都已具备：独立注入、受信连接上出示凭据、dial 不透传、对齐 README:117。闸门 B 要求的 W-04/W-01 承载 issue、W-09 只做本仓检查、PR#58 待定案后合入、不以 `not_supported` 关闭 #24，也都写进了第 4 步。

### divergent：是否有更简的主路径

- **落选的 a（分 OS 用户）和 b（拆容器）：** 两者都是为 D13-05 已声明“不是沙箱”的边界添加机制，b 还会推翻 D2-20/D7-19 的拓扑，不选它们是对的。
- **让部署 bearer 直接发人类帧，或让 Lab 经根会话写方或 `eval:` 控制端点转交子 agent 的人类 IRC：** 前者违背 D3-12 对两类连接的区分。后者要改 D3-12 已表决的受信 reader 路径，并推翻 MUX-05 与 S1 已有的实现，并不更简单。
- **结论：** 本行的写法只新增一个由 deploy 注入的值，Lab 在启动 dial 时删去一个环境变量，没有新增机制，是零跨席等待的最小主路径。

### 不阻断的落地提示（不构成反例）

- W-09 实现“从传给 dial 的环境中删除”时，可以照 S1 的做法，在 Lab 进程启动时把受信凭据读进按 `labId` 选择的实例配置，再从自身的 `process.env` 中删除。这样 Lab 以后启动的任何子进程都不会继承它，和逐次在 spawn 时剔除的效果相同，两种写法都符合本行文字。
- 目前 `compose.yaml` 的 `lab-web` 还没有注入 `SOROI_CENTRAL_*`。这属于 D13-02 的 deploy 承载，不是本行引入的问题，v3 只要求这两个值照常沿继承链到达。

本次未修改代码或配置，未运行 build、测试或 runtime，未读取任何 secret。

