# D4 远程执行决策表 · task:high 的选票（第 3 轮）

投票者：task:high（`Governance_e826.HighD4`，Claude 族）。

本轮对象：修订后 `evidence/decisions/D4-remote-exec.md` 中的 9 行，即 D4-02、05、07、09、13、14、15、18、21，以最新文本为准。

对照依据：
- 现行 `D6-store-service.md`：
  - D6-07 的暂存区 ADT `EvalTransfer` / `AgentGenerationTransfer`；
  - 接口草图 :134-147 的端点；
  - D6-21 的节点版本持久化；
  - D6-22 与 :150-153 的 `PUT /releases`；
- 第 1、2 轮选票（`votes/D4-high.md`、`votes/D4-high-r2.md`）；
- leader 裁决 A–E；`LEDGER.md` 的 U1–U24。

本轮没有咨询 discuss:*，也没有咨询其他导师。

| ID | 票 | 理由 | 修改建议（不影响本票） |
| --- | --- | --- | --- |
| D4-02 | 赞成 | 未提交的字节一律先进暂存区；正式提交时，store 在同一事务里原子转入对象目录；只有已经正式提交过的 bundle 才从 `/objects` 读。这样中心副本里不会出现没有被任何正式步引用的 bundle，dry run 什么也不进对象目录，守住了 U `#7ffcea0c`。与 D6-07、D6-21 的“随那一步提交转入”一致 | 无 |
| D4-05 | 赞成 | 每次 `soroi_eval` 开一个 `EvalTransfer`，这一步的所有远程调用按 `position` 分卷，最后的提交引用同一个 `t`。端点与 D6 接口草图 :138-142 一致。发行物由部署 init 作为 release 事实提交（D6-22 `PUT /releases`，同一事务把字节放入对象目录），回答了我第 2 轮提出的“谁把发行物存进 `/objects`” | D6 的 `PUT /releases` 写入的是整个 artifact 的字节。boot 程序和 runner 如果要作为单独的对象从 `/objects/{hash}` 拷入，请在 D4-05 或 D6-22 写一句：release 导入时，把它们和定制 tar 一样各自按内容哈希放进对象目录 |
| D4-07 | 赞成 | 拷出写入 `/transfers/{t}/volumes/{position}`，读取用 `/transfers/{t}/volumes/{position}/files/{path}`，与 D6 :141-142 逐字一致。正式运行在提交确认后才删除 `t`，dry run 等这一步所有结果取回后再删，暂存区的结束锚点明确。每个调用的结果取回后就 `remote remove`，作业在 volume 已经落进暂存区之后才结束，嵌套顺序正确 | 无 |
| D4-09 | 赞成 | soroi 定制 tar 改为 release 事实，经 `/objects` 拷入；Lab 库 `.omp/` 的 tar 经暂存区拷入；两份都按内容寻址。第 1 轮反例的修正保留，与 D4-05 第 3 步的分类一致 | 无 |
| D4-13 | 赞成 | 暂存区写成 ADT，两种来历各有开始者和结束锚点：<br>• `EvalTransfer`：在 dry run 返回或这一步提交确认时结束；<br>• `AgentGenerationTransfer`：由 subagent 模块开，transcript 写回确认后由它 DELETE。<br>两种都只用于传输，不是 transcript 的权威。与 D6-07 和 D6 :134-136 对齐 | 端点名请统一：本行写 `AgentGenerationTransfer` 的拷出“写到 `volumes/{generation}`”，D6 接口草图 :143-144 写的是单卷 `PUT /transfers/{t}/volume` 和 `GET /transfers/{t}/volume/files/{path}`。两边改成同一个写法（建议采用 D6 的单卷，因为一代只有一卷） |
| D4-14 | 赞成 | 读取路径改为 `/transfers/{t}/volumes/{position}/files/{path}`，与 D4-07、D6 一致。捕获的结束锚点仍是拷出到达 | 无 |
| D4-15 | 赞成 | 批次来源改为这一步暂存区 `t` 里该调用的 `volumes/{position}`，与 D4-05、D4-07 的分卷一致。汇入仍和这一步的提交在同一事务（D6-04） | D6-03、D6-04 现在把汇入目标写成 `agent_progress` 表。本行“表与列以 D6 为准”已经涵盖这一点，可以顺手写出表名 |
| D4-18 | 赞成 | 采纳了第 2 轮建议：`config` 哈希不含部署方注入的凭据变量，也不含每次运行注入的变量。`Agent` 体的身份另加 release 内容哈希与 Lab 库 `.omp/` tar 的哈希，改了 agent 定义、技能、规则或 soroi 发行版，就不会复用旧的 agent 结果。这与 D4-02、D4-18 环境身份是同一条“身份覆盖实际执行物”的规则（BS:128） | 无 |
| D4-21 | 赞成 | 暂存区要等这一步所有结果都取回后再删，与 D4-07 一致；对象存储不写，批次不汇入，捕获不写。满足 U `#68d36f55`、`#7ffcea0c` | 无 |

## 计票

本轮重投 9 行：**赞成 9 · 反对 0**。

其余 13 行沿用前几轮的赞成票。D4 全表 22 行的 task:high 票为赞成 22、反对 0。
