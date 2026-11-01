# D18 重投（v2）：claude-high（独立空白历史审查席，1 票）

- 表决对象：`local://decisions/D18-product-opus-contracts.md` 中的“发起人正式提案 v2”，也就是 [PM#28 评论 6559342240](https://github.com/Pepgent/PM/issues/28#issuecomment-6559342240)。
- 只重投 D18-01、03、05。D18-02、04 的表决对象没有变，保留 v1 原票（赞成），见 `local://votes/D18-claude-high.md`，该文件未覆盖。
- 我对照 v1 选票里的每条反例，逐条回到源头文件核对是否已经消除，没有采信秘书或发起人的结论。

## 汇总

| ID | 票 | 对象 |
| --- | --- | --- |
| D18-01 ①–⑪ | 赞成（逐项均赞成） | v2 的 11 项归属表 |
| D18-03 | 赞成 | 方案 C（v2） |
| D18-05 | 赞成 | 方案 C（v2） |

## D18-01（v2）逐项

| 项 | 票 | 核对 |
| --- | --- | --- |
| ① | 赞成 | 实验标签、项目多标签已按 D12:155、561 列入 D9，首版字段以 D12 为准。v1 的附注已消除 |
| ② | 赞成 | 设备由 remote 模板 P3 提供，Lab 只持有预约和冲突，不另建设备目录，与 D7-12、D12-06 一致 |
| ③ | 赞成 | **v1 反例已消除。** 作业控制（restart、destroy、new_sandbox）和集群、模板登记都归 remote 的操作，由 Lab 门面调用。只有 remote 不持有的健康、容量、shell 归独立运维组件。不再存在绕过 remote 销毁作业或写目录的路径，作业与目录仍各只有一个权威（D2-09、D4 §2、D7-12） |
| ④ | 赞成 | 构建控制列 D9，与 D12-10、D8-16 一致；已定的读取面没有收缩 |
| ⑤ | 赞成 | 已改名为“讨论（一人一会话）”，其他成员只读，与 D7-04、D11-49、`D12-intent.md:59-61` 一致 |
| ⑥ | 赞成 | 与 D12:571、D8-16 一致 |
| ⑦ | 赞成 | **v1 反例已消除。** `schedule{cron}` 和手动运行回到首版，与 D7-10、D12-09（`D12-lab-wire.md:41`、`:239-240`、`:247-248`）的公开类型一致，没有收缩 |
| ⑧ | 赞成 | 与 D7-03、D8-16 一致 |
| ⑨ | 赞成 | “文献”的来源条件已写明，研究阶段叙述按 D12:567 列 D9 |
| ⑩ | 赞成 | 与 D7-04、D7-05 一致 |
| ⑪ | 赞成 | 与 D10-11、D12-15 一致；默认 env 对应模板的设备仍供首版使用，与 ② 不冲突 |

v2 在原则中写明“①④⑥⑧⑩⑪ 本表只确认归属，首版字段以 D7/D12 为准，不另立范围”。这也消除了我在 v1 提的整行发散意见（D18 与 D7/D12 形成两处会漂移的来源）。

## D18-03：赞成方案 C

**v1 的两个反例都已消除。**
- 方案 C 不改代码，被 abort 的已开始作业仍按 `komodo/mod.rs:284-291` 的 `broken` 分支和 `slurm/mod.rs:194-218` 的有 batch host 分支报 `Ended`。`remove` 里的 `wait_terminal`（`komodo/mod.rs:41-52`）和 `abort_status`（`ops.rs:115`、`:152`）都能拿到终态。F17 ③“`remote status` 为 aborted/ended，容器已停止”，以及 F14、F16 的“Stack 和卷都已删除”，都能在现有代码上成立。
- 方案 C 不再依赖 Compose 并不存在的 `depends_on` 条件。

**新条款下的主路径复核：**
- 自然结束的远程 Program：body 以 0 退出，copy-out 依赖 `service_completed_successfully` 照常执行，`Ended` 时拷出已送达。D4-07 第 3 步、D4-14 第 3 步，以及 eval.md:120 的读取路径都不受影响。
- 远程 Agent 被中止（store.md:131 的有序停止）：先结束这一代，omp 正常退出，体以 0 退出，再拷出。这条路径不调用 `remote abort`，属于“未被 abort”，仍然拿到“拷出已送达”的 `Ended`，F18 的复盘浏览不受影响。
- 远程 Program 被 `abort`：发起中止的 eval 记 `call_aborted`，不读暂存区，所以 `Ended` 不保证拷出也没有读取方会受影响。

**执行附注（不改表决对象）。** 措辞改动还要同步检查 D4 §4.1 `RemoteCall.copied` 的注释（“remote 已确认 Ended”）和 §5.1、§5.2 时序图里的“Ended（拷出已送达）”。这两处都只描述自然结束路径，与新措辞不矛盾，但回写时应按文档一致性规则逐处核对，确保读者不会把它们理解为适用于被 abort 的作业。

## D18-05：赞成方案 C

**v1 的两个反例都已消除。**
- **意图。** 方案 C 恢复的是用户纠正之后的模型：web 是唯一的多租户层，每个 Lab 一套 soroi 实例（`bf96d256` 全文、`d46ffb76`、`4d388e7f`、`d5277d47`，我已逐条读过原文）。它没有把 web 放进每 Lab 一份的部署单元，soroi 各组件里也没有 Lab 字段。
- **收缩。** 目录和切换 Lab 按 D12-03、D12-04 留在首版。

**新条款下的主路径复核：**
- **运行 id 不会撞。** RunId 由各 Lab 的 store 生成 ULID（store.md:34，D6:57），跨实例不会重复，所以 `experiment_ext` 继续以 RunId 为键（D7-06）不会冲突。
- **路由。** Lab 的读写入口都带 `lab`（D12-03 的 `catalog.read{lab}`、`page.read{lab,…}`），D12-17 的 `GET /api/lab/events` 也带 `?lab=`，所以 Lab 后端能按 `labId` 选中该 Lab 实例的 store、Mux 和 remote home。
- **根会话。** 根会话照 D7-04、D2-20 仍由 Lab 后端在本机执行 dial 启动，只是每个根会话的 env 换成所属 Lab 实例的 store URL、Mux URL 和 remote home。

**执行附注（不改表决对象）。** 第 3 条写的是“`experiment_ext.lab_id` 不再用于在同一 store 里给运行分 Lab”。建议回写 D7、D12 时写明：`lab_id` 仍然保留，用途改为“这个运行在哪个 Lab 实例的 store 里”的路由键；不要整列删除。否则只拿到 RunId 的入口（例如 D12-13 的 `GET /api/lab/volumes/{run}/…` 权限判定“该运行所属 Lab”，`D12-lab-wire.md:531`）就找不到要去哪个实例。
