# 闸门 A 裁决：Pepgent#24（LAB-08 / PR#58）两项契约裁决请求

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#24](https://github.com/Pepgent/Pepgent/issues/24)（[PR#58](https://github.com/Pepgent/Pepgent/pull/58)，评论 `6561585140`），`PM/evidence/gates/pepgent-24.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U2`、`U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自收缩范围）、`(U) #7bfe3696`（转引自 `DEC/D3-network-mux.md:66` D3-12 与 `SOR/design/subagent.md:22`、`SOR/design/intervention.md:57`：人在 GUI 经 IRC 接管 subagent，消息带可辨认 `human:<principal>` 来源，先进写方待投递表，可编辑/撤回）、`(U) bf96d256` 与 `d5277d47`（转引自 `DEC/D18-product-opus-contracts.md:11` D18-05）。
  - `(D)` `SOR/design/intervention.md:11,51,57-59`、`SOR/design/subagent.md:22-23,50`、`DEC/D2-components.md:43,45,57,60`（D2-06、D2-08、D2-20、D2-23）、`DEC/D3-network-mux.md:60,64,66,73`（D3-06、D3-10、D3-12、D3-19）、`DEC/D5-plugins-eval.md:91,395`（D5-16 情形二）、`DEC/D7-lab-backend.md:64,69,75,79`（D7-04、D7-09、D7-15、D7-19）、`DEC/D8-mvp-scope.md:143-144,238,329`（F24 ①、F25、MUX-05、LAB-08）、`DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D13-contract-gaps.md:48,71,87`（D13-05）、`DEC/D19-sor13-control-contract.md:30`（D19-02）。

---

## 一、第一项：根会话停驻时的 `intervene.derive` 与 `run.abort`（`A1-1` 至 `A1-3`）

### 1.1 闸门 A 判定结论

- **是否越界：** **不越界（属 K1 既有决策澄清 + K3 单仓实现 + K2 注册前竞态，可免票放行处置 `a`）。**
- **可免票放行的具体处置（处置 `a`）：**
  - 按 `D2-06`（`DEC/D2-components.md:43`）、`D3-19`（`DEC/D3-network-mux.md:73`）与 `SOR/design/intervention.md:11` 既定契约执行：当 `intervene.derive` 或 `run.abort` 的目标运行根会话已停驻时，Lab 后端作为该根会话的写方，先在同一写方声明里启动新的一代进程（复用 `LabSessions` 既有开代路径，仅唤醒进程、不投递 `prompt`），等控制端点 `eval:<holder>` 注册可用后再路由 `derive` 或 `abort` 请求，并将结论原样返回。开代后端点注册前的等待方式与竞态映射属于单仓内部实现与主路径外竞态（`D19-02`），由 W-09 在既有错误变体内自定并在 `PR#58` 补齐实现。
- **意图裁决与否决：**
  - **【定】对已结束运行（其根会话已停驻）发起派生 `intervene.derive` 是主路径必达能力（`D8` F24 ①），必须由写方 Lab 后端先唤醒新一代再路由控制请求（`D2-06`、`D3-19`、`design/intervention.md:11`）；处置 `b`（直接拒绝返回 `revision_conflict`）违反 `(U) U2`、`U23` 全流程完整交付意图并与已通过设计直接冲突，若有人主张处置 `b` 本席予以否决。**

### 1.2 对 `A1-1` 至 `A1-3` 的逐问回答

- **A1-1：** **是。** `F1-3` 至 `F1-6`（`D2-06`、`D3-19`、`design/intervention.md:11`、`D5-16` 情形二）已毫无歧义地规定：“根会话已停驻时，Lab 后端作为写方先开新的一代，等端点注册后再路由。”`D7-09` 中“已停驻的会话没有在途 `soroi_eval`，读取时不唤醒”明确限定于**读取**（`writers`/`slots`），而“Mux 不替消费者唤醒停驻进程”正是因为唤醒职责归写方（Lab 后端）而不归 Mux。因此处置 `a` 完全是既有契约，不是新增决定。
- **A1-2：** **是。** 处置 `b`（直接拒绝）直接违反 `D2-06`、`D3-19` 与 `design/intervention.md:11`，并导致 `D8` F24 ①（“P 已结束时”派生出 `R'`）在主路径上不可达，违反 `(U) U2`、`U23`。
- **A1-3：** **是。** 唤醒根会话只为让 `eval:<holder>` 控制端点上线受理 `derive`/`abort`，Lab 后端在唤醒时不投递任何 `prompt`；`derive` 在 store 提交成功后，由在线的 `eval` 插件按 `D5-16` 情形二与 `design/intervention.md:51` 直接向持有 `R'` 的主会话投递带 `human:<by>` 的 IRC 开启新一轮。整条链路已由现有条文完整规定，不触及任何新产品意图。

---

## 二、第二项：子 agent 的 `human.irc`：受信 reader 凭据与同容器 omp 的隔离（`A2-1` 至 `A2-3`）

### 2.1 闸门 A 判定结论

- **是否越界：** **越界（触及跨仓凭据配置接口与部署前提契约，不可免票放行，必须立 P0 议案表决）。**
- **意图裁决与 `(U)` 依据：**
  1. **【定】子 agent 的人类 IRC 接管（`D8` F25）必须真实走通，严禁将 `not_supported`（处置 `d`）作为最终交付状态。**
     - **依据：** `(U) #7bfe3696`（`DEC/D3-network-mux.md:66`、`SOR/design/subagent.md:22`、`SOR/design/intervention.md:57`：人在 GUI 经 IRC 接管 subagent，消息带 `human:<principal>` 来源，进入写方待投递表，支持编辑与撤回）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减范围）。若将处置 `d` 作为终态交付，本席凭上述 `(U)` 依据行使一票否决（注：在 P0 议案表决期间，按 `D10-08` 暂时保留该分支等待 P0 裁决，待 P0 通过后合入实现，不属于终态收缩）。
  2. **【定】用户原始意图与已通过架构决策（`D2-20`、`D3-12`、`D7-19`、`D13-05`）均不要求在中心 `lab-web` 容器内对根 `omp` 做 OS 多用户沙箱或拆容器隔离；采用“同容器同用户 + 部署注入独立受信 reader 凭据 + Lab 启动 `dial` 时不向子进程 `env` 透传该凭据 + 修正 `MUX/README.md:117` 过严表述”（即完善后的处置 `c`）完全符合产品原始意图。**
     - **依据：**
       - `LEDGER.md` 中没有任何要求在中心容器内把 Lab 后端与根 `omp` 分拆 OS 用户或容器的 `(U)` 原话；
       - `D2-20`（`DEC/D2-components.md:57`）与 `D7-19`（`DEC/D7-lab-backend.md:79`）明文选定：“根会话与写方同在一个容器，Lab 才能直接在本机执行 dial”；
       - `D13-05`（`DEC/D13-contract-gaps.md:48,71,87`）已对中心容器内的凭据边界作出明确裁决：**“同一容器、同一用户，这不是沙箱”**，只要求不经子进程 `env` 把无关凭据直接传给子进程，而不改变同容器同用户的部署形态；
       - `D3-12`（`DEC/D3-network-mux.md:66`）规定“只有用 Lab 后端凭据建立的受信 reader 连接能发人类帧，mux 不信任任何自报 header”，其协议边界是区分**持有受信 reader 凭据的 Lab 后端连接**与**仅持部署 bearer（`MUX_AUTH_TOKEN`，如远程作业容器、普通 reader）或代 token（`MUX_TOKEN`）的连接**，而非要求 `lab-web` 容器内部做 OS 级进程沙箱。`MUX/README.md:117` 中“不得让任意 omp 通过挂载文件或进程检查读取它……不以过滤某个 env 名称替代凭据隔离”是 W-01 在组件 README 中自行添加的语句，不在任何已表决决策正文中，且与 `D2-20`/`D7-19`/`D13-05` 直接冲突。

### 2.2 对 `A2-1` 至 `A2-3` 及可选处置 `a–d` 的逐项回答

- **A2-1：** **`MUX/README.md:117` 的 OS 沙箱要求不属于 `D3-12` 的既定意图，处置 `c`（配合 `dial` 环境不透传受信 reader 凭据）不违背产品意图。**
  - 按 `D13-05` 先例（“同一容器、同一用户，这不是沙箱……凭据不再经环境传递”），Lab 后端与中心根 `omp` 同容器同 UID 是 `D2-20`/`D7-19` 的既定设计（况且 `lab.sqlite`、部署私钥与 `remote` home 本就在同一容器同一用户下）。只要：(1) 部署向 `mux`（`--trusted-reader-token-file`）与 `lab-web` 注入独立于 `MUX_AUTH_TOKEN` 的受信 reader 凭据；(2) Lab 后端建立 `/agents/{id}/reader` 连接发 `mux_human_irc*` 时出示该受信 reader 凭据；(3) Lab 后端启动 `omp-rpc-mux dial` 时只传 `D7-04` ③ 所需的环境变量与部署 bearer `MUX_AUTH_TOKEN`，不把受信 reader 凭据变量/文件路径传给 `dial` 子进程环境；(4) 同步修正 `MUX/README.md:117` 将隔离口径对齐 `D13-05`，即可完整满足 `D3-12` 与 `F25`。
- **A2-2：** **是，处置 `a`、`b`、`c` 均涉及跨仓契约或部署前提（`D10-08`），都必须经 P0 投票，不可免票放行。**
  - **处置 `a`（同容器分 OS 用户）：** 须 P0，但**不推荐**。需要改镜像（`W-03`）、改 `deploy`（`W-04`）、改 `Lab` 启动降权与跨 UID 的会话 worktree 卷 / omp session 卷属主权限，为 `D13-05` 已明确声明“不是沙箱”的同容器边界引入大量多余机制。
  - **处置 `b`（拆容器）：** 须 P0，且**本席反对**。直接推翻 `D2-20` 与 `D7-19`“根会话与写方同在一个容器，Lab 才能直接在本机执行 dial”的核心拓扑与共享卷划分。
  - **处置 `c`（同容器同用户边界 + 部署注入独立受信 reader 凭据 + `dial` 不透传该凭据 env + 对齐 `MUX/README.md:117`）：** **须 P0 投票，且本席推荐作为 P0 主案。** 之所以必须走 P0 投票，是因为当前 `Pepgent/deploy`（`W-04`）尚未向 `mux` 传入 `--trusted-reader-token-file`、也未向 `lab-web` 注入受信 reader 凭据（`F2-3`），`Pepgent`（`W-09`）与 `deploy`（`W-04`）及 `soroi` standalone/e2e（`W-08`）之间需要约定该凭据的注入环境变量/文件路径名，且需修正 `omp-rpc-mux`（`W-01`）的 `README.md:117`。
- **A2-3：** **是，维持 `not_supported`（处置 `d`）使 `D8` F25 在 GUI 路径上不可达，违反 `(U) U2`、`U23` 与 `(U) #7bfe3696`，不可作为最终交付（仅可在 P0 表决期间按 `D10-08` 暂留等待裁决）。**
