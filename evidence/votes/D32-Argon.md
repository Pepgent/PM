# D32 选票：Argon

议程：Pepgent#24 LAB-08：子 agent 人类 IRC 的受信 reader 凭据注入与边界（[Pepgent/PM#51](https://github.com/Pepgent/PM/issues/51)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D32-01 v1：赞成（Argon-2，2026-11-01T18:01:30.470Z）——作废：该行已修订到 v3


**分类意见：** 串联

# D32（PM#51）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】子 agent 的人类 IRC 接管（`D8` F25）必须真实走通，由 `Pepgent/deploy` 向 `mux` 与 `lab-web` 注入独立于部署 bearer 的 `MUX_TRUSTED_READER_TOKEN`，Lab 后端仅在自身受信 reader 连接上使用并在启动 `dial` 时从子进程 `env` 剔除该变量，同时将 `MUX/README.md:117` 的隔离口径对齐 `D13-05`（“同一容器、同一用户，这不是沙箱”），完全符合用户原始意图。**
   - **依据：** `(U) #7bfe3696`（`DEC/D3-network-mux.md:66`、`SOR/design/subagent.md:22`、`SOR/design/intervention.md:57`：人在 GUI 经 IRC 接管 subagent，消息带可辨认 `human:<principal>` 来源，进入写方待投递表，可编辑/撤回）、`(U) U2` 与 `U23`（`LEDGER.md:69,86`：从设计到实现与 e2e 全流程走通，不擅自删减范围）、`(U) U30–U32` 与 `U83`（`LEDGER.md:88,97`：开发期各仓只做本仓检查，不设跨组件合入阻塞锁）；`(D)` `DEC/D2-components.md:57,60`（D2-20、D2-23）、`DEC/D3-network-mux.md:60,64,66`（D3-06、D3-10、D3-12）、`DEC/D7-lab-backend.md:64,69,79`（D7-04、D7-09、D7-19）、`DEC/D8-mvp-scope.md:144,238,329`（F25、MUX-05、LAB-08）、`DEC/D13-contract-gaps.md:48,71,87`（D13-05）、`evidence/gates/pepgent-24-gate-a.md`。
   - **边界：** 本行只更新 `DEC/D7-lab-backend.md`、`Pepgent/Pepgent`、`Pepgent/deploy` 与 `Pepgent/omp-rpc-mux/README.md:117`，`pepgent-soroi/design/*.md` 无需修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D32-01 v1** | 串联 | **approve（赞成）** | 完全采纳闸门 A 推荐的主案：`Pepgent/deploy`（W-04）向 `mux` 与 `lab-web` 注入独立于 `MUX_AUTH_TOKEN` 的 `MUX_TRUSTED_READER_TOKEN`（与 W-08 S1 F25/F16 已用变量名一致）；Lab 后端（W-09）仅在自身对 `/agents/{id}/reader` 的受信连接上使用该凭据发送 `mux_human_irc*` 帧，并在启动 `dial` 时从子进程环境中剔除该变量；`MUX/README.md:117`（W-01）对齐 `D13-05`“同一容器、同一用户，这不是沙箱”的既定边界。既打通了 F25 GUI 子 agent 人工接管主路径（消除 `not_supported`），又保持了 `D2-20`/`D7-19` 的同容器拓扑，不引入拆容器或同容器双 OS 用户沙箱等多余机制。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。


## D32-01 v2：赞成（Argon-2，2026-11-01T18:07:45.906Z）——作废：该行已修订到 v3


**分类意见：** 串联

# D32-01 v2（PM#51）产品原始意图守护席（Argon-2）重投选票

## 一、意图裁决

1. **【定】`D32-01 v2` 将每 Lab 独立的 Mux 受信 reader 凭据纳入 `D18-05`/`D7-19` 按 `labId` 选择的实例配置（单 Lab 部署以 `MUX_TRUSTED_READER_TOKEN` 注入，多 Lab 配置形状沿用 `D18-05` 占位），Lab 后端按 `labId` 取对应凭据建立 `/agents/{id}/reader` 受信连接，启动 `dial` 时只传 `D7-04` ③ 清单（含 `MUX_AUTH_TOKEN`）而不传受信 reader 凭据，并将 `MUX/README.md:117` 对齐 `D13-05`（“同一容器、同一用户，这不是沙箱”），同时满足多 Lab 独立实例隔离（`(U) bf96d256`、`d5277d47`）与子 agent 人类 IRC 真实接管（`(U) #7bfe3696`、`U2`、`U23`）。**
   - **依据：** `(U) #7bfe3696`（`DEC/D3-network-mux.md:66`、`SOR/design/subagent.md:22`、`SOR/design/intervention.md:57`）、`(U) bf96d256` 与 `d5277d47`（`DEC/D18-product-opus-contracts.md:11` D18-05）、`(U) U2`、`U23`、`U30–U32`、`U83`（`LEDGER.md:69,86,88,97`）；`(D)` `DEC/D2-components.md:57,60`、`DEC/D3-network-mux.md:60,64,66`、`DEC/D7-lab-backend.md:64,68-69,79`、`DEC/D8-mvp-scope.md:144,238,329`、`DEC/D13-contract-gaps.md:48,71,87`、`evidence/gates/pepgent-24-gate-a.md`。
   - **边界：** 本行只回写 `DEC/D7-lab-backend.md:64,79`，并在 `Pepgent/Pepgent`、`Pepgent/deploy`、`Pepgent/omp-rpc-mux/README.md:117` 各自白名单内承载，`pepgent-soroi/design/*.md` 无需修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D32-01 v2** | 串联 | **approve（赞成）** | v2 完整消除了 `LeadMentor` 与 `ClaudeHigh` 在 v1 指出的多 Lab 凭据粒度反例：明确 `Pepgent/deploy` 为每个 Lab 的 Mux 实例生成的受信 reader 凭据与该 Lab 的 Mux URL 同属按 `labId` 选择的实例配置（`MUX_TRUSTED_READER_TOKEN` 仅作为单 Lab 注入入口，多 Lab 供给形状沿用 `D18-05`/`D7-19` 占位），并补全了 `D7-04` ③ 传给 `dial` 的环境变量清单（含所属 Lab 的 `MUX_AUTH_TOKEN`，不含受信 reader 凭据）。既使多 Lab 下每个 Lab 的 F25 GUI 子 agent 人类 IRC 路径闭合，又严守 `D2-20`/`D7-19`/`D13-05` 同容器同用户边界与 `C1-3`/`U83` 本仓合入规则。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。


## D32-01 v3：赞成（Argon-2，2026-11-01T18:15:00.900Z）


**分类意见：** 串联

# D32-01 v3（PM#51）产品原始意图守护席（Argon-2）重投选票

## 一、意图裁决

1. **【定】`D32-01 v3` 保留 v2 按 `labId` 选择各 Lab 独立 Mux 受信 reader 凭据的设置，并将启动 `dial` 的环境明确写为“在继承的 Lab 容器环境之上设置 `MUX_GENERATION`、`MUX_TOKEN`、`SOROI_ROLE=Main` 与所属 Lab 的 `SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`，并从传给 `dial` 的环境中删除受信 reader 凭据；`D13-01` 的中心身份等其余既有启动输入照常沿继承链到达根 `omp`”，同时满足多 Lab 隔离（`(U) bf96d256`、`d5277d47`）、子 agent 人类 IRC 真实接管（`(U) #7bfe3696`、`U2`、`U23`）以及中心根 `Main` 身份传播链（`D13-01`）。**
   - **依据：** `(U) #7bfe3696`（`DEC/D3-network-mux.md:66`、`SOR/design/subagent.md:22`、`SOR/design/intervention.md:57`）、`(U) bf96d256` 与 `d5277d47`（`DEC/D18-product-opus-contracts.md:11` D18-05）、`(U) U2`、`U23`、`U30–U32`、`U83`（`LEDGER.md:69,86,88,97`）；`(D)` `DEC/D2-components.md:57,60`、`DEC/D3-network-mux.md:60,64,66`、`DEC/D7-lab-backend.md:64,68-69,79`、`DEC/D8-mvp-scope.md:144,238,329`、`DEC/D13-contract-gaps.md:44,48,71,87`、`evidence/gates/pepgent-24-gate-a.md`。
   - **边界：** 本行只回写 `DEC/D7-lab-backend.md:64,79`，并在 `Pepgent/Pepgent`、`Pepgent/deploy`、`Pepgent/omp-rpc-mux/README.md:117` 各自白名单内承载，`pepgent-soroi/design/*.md` 无需修改。

## 二、条目投票（串联 / 缺失设计补充）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D32-01 v3** | 串联 | **approve（赞成）** | v3 采纳 `ClaudeHigh` 与 `LeadMentor` 对 v2 的反例修订：去掉 v2 中易被读作封闭集合的“逐项为 / 逐项写全”，改为在继承的 Lab 容器环境之上设置 `MUX_GENERATION`、`MUX_TOKEN`、`SOROI_ROLE=Main` 与所属 Lab 的 `SOROI_STORE_URL`、`SOROI_MUX_URL`、`MUX_AUTH_TOKEN`，仅从传给 `dial` 的环境中删除受信 reader 凭据，确保 `D13-01` 的 `SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST` 及 `PATH`、`HOME`、`REMOTE_*` 照常沿继承链到达根 `omp`。v1 与 v2 的两处反例均已清零。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `串联`）。

