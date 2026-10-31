# D6 store 服务决策表 · task:high 的第 3 轮选票

- **投票者：** task:high（Governance_e826.HighD6），代表 Claude 族的独立票。
- **对象：** `pepgent-pm/evidence/decisions/D6-store-service.md` 最新文本中的 D6-03、05、07、10、13、15、16、18、22。
- **依据：** 本表全文，以及 D5（`D5-plugins-eval.md` 的 D5-12、D5-14）。第 1、2 轮的依据不变。

| ID | 票 | 理由 | 修改建议 |
| --- | --- | --- | --- |
| D6-03 | 赞成 | 新增的 `releases` 表放在身份表里（版本、内容哈希、导入时刻），对象目录里的每一份字节都能追溯到一条已提交的记录。其余内容与第 2 轮赞成的文本一致：`agent_progress` 的分工，以及四个来历变体各用唯一标签。 | — |
| D6-05 | **反对** | 结束要“supervisor 无活动写方”和“store 无未消费 atom”两方确认，这个方向成立，第 2 轮按这个方向投了赞成。定稿的机制把确认挂在一个 `StepCommit.mayEnd: boolean` 上，并规定“只有根会话的 eval 插件……才为 true”“它发出的最后一次提交带 `mayEnd`”。这样一来，结束只能搭在根会话自己的提交上。<br>**场景：** 汇总转交给另一个分身完成（`eval.md:162`“要交给别的分身汇总时”；D5-12“转交就是释放后再派一个 worker”）。根 agent 用 `soroi_task` 派出一个汇总 worker。这个 worker 在自己的会话里写 `const report_2200c = summarize(curve_svm, curve_gp); stop(report_2200c)` 并提交。这次提交之后，运行里已没有未消费的 atom，也没有活动的写方。<br>**在哪里失效：** 这次提交来自 worker 会话，不是根会话的插件，不能带 `mayEnd`。根 agent 已经没有要写的步，所以不会再有根会话的提交。store 就永远等不到 `mayEnd`：运行一直停在 `Open`，生命周期流不推 `run_ended`，D7 的自动化 A-01（`D7-lab-backend.md:250-251`，“已结束时起草复盘”）不会触发。根会话也会被“至多一个未结束的运行”卡住，开不了下一次实验。 | 结束确认不再搭在根会话的步提交上，按下面修改我改投赞成：<br>• 增加 `POST /runs/{run}/end`，由根会话的 eval 插件（supervisor）调用。它确认没有活动的正式 eval、也没有未释放的批次后，就发这个请求，不管最后一步是谁写的。<br>• store 在这个请求的事务里用未消费集合再确认一次，为空才写 `run_ended`，返回 `{ ended: boolean, seq }`。<br>• supervisor 得知某个写方的步已提交、批次已释放（D5-12）时，就做一次这个判断。<br>• 也可以保留 `mayEnd`，但它不能只写在根会话自己发出的提交上。<br>• 同时建议把布尔值改成 sum type，与本表其余部分一致，例如 `end: { kind: 'Continue' } \| { kind: 'MayEnd' }`。 |
| D6-07 | 赞成 | 暂存区改成了 ADT：`EvalTransfer` 和 `AgentGenerationTransfer` 各有自己的拥有方和结束锚点，一种暂存区不承担两种生命周期，与 D4-13 对齐。不在 eval 调用里的远程 agent 唤醒（人经 IRC 唤醒）也有地方拷入拷出 transcript，而且不进 store。对象目录里只有已提交记录引用的字节，release 导入本身是一次提交（D6-22），这条规则仍然成立。 | — |
| D6-10 | 赞成 | 运行图只投影已提交的事实，`CallStatus` 里没有“运行中”。按原始时刻回看的需求，由明确标为“回溯重建”的 `activity` 时间线满足。两种语义分开，第 2 轮的建议（`Running` 不进按序号的投影）已采纳。 | — |
| D6-13 | 赞成 | 候选不唯一时，只按值身份、继承来源或显式映射消歧，否则返回 `Ambiguous`。不再用提交顺序配对，因为书写顺序不是跨运行的身份。我第 1 轮的反例（`temp_2200c` 和 `temp_2300c`）在这个规则下候选唯一，能对上。 | — |
| D6-15 | 赞成 | 第 2 轮的修改 ① ② 都已落实：被中止调用的批次照样汇入 `agent_progress`；`Aborted` 结果和 `HumanEvent.replaced` 都带被中止 agent 的 transcript session id。复盘时能查到被替代的 agent 做了什么，符合 `#8e0a7e8f` 和 RC:262。 | — |
| D6-16 | 赞成 | 第 2 轮的修改 (b) 已落实：派生执行期间，持有会话算 P 的活动写方，不给 `mayEnd`；把在途那一步落进 P 的提交也不带 `mayEnd`。所以 P 不会先被写成 `run_ended`，它唯一的结局是随派生写下 `run_aborted`。 | 如果 D6-05 按我的修改改用 `POST /runs/{run}/end`，本行的表述相应改为：“派生期间 supervisor 不发结束确认”。 |
| D6-18 | 赞成 | 身份只用插件提交前已有的字段：transfer id、调用位置、principal、交回内容、`replaced`。run id 和步序号由 store 在提交时填入，只作事实字段。一个 `EvalTransfer` 对应一步，步内每个调用位置唯一，所以同一次介入身份稳定，不同介入身份必然不同。草图注释与行内文字已经一致。 | — |
| D6-22 | 赞成 | `PUT /releases/{version}` 本身就是一次 store 提交：在同一个事务里校验哈希、写 `releases` 记录、把字节放进对象目录。这没有破坏 D6-07“对象目录只放已提交记录引用的字节”。init 是 compose 里的步骤，部署时一次 compose 就能让空的 store 工作，与 D2-25 的调和成立。standalone 与完整 e2e 两个 profile 的划分不变。 | — |

## 计票

赞成 8 · 反对 1（D6-05）。

D6-05 的反对票附了场景、证据、在哪里失效，以及能让我改投赞成的修改。D6-16 的赞成与 D6-05 的修改相容：D6-05 改为单独的结束确认后，D6-16 只需相应改一句表述。

## 第 4 轮

本轮重投 D6-05 与 D6-16 的最新文本。

| ID | 票 | 理由 | 修改建议 |
| --- | --- | --- | --- |
| D6-05 | 赞成 | 第 3 轮要求的修改已落实。<br>• 结束改由根会话的 supervisor 调用 `POST /runs/{run}/end`，不论最后一步由哪个会话提交。<br>• store 在这个请求的事务里确认未消费集合为空，返回 sum type `Ended{seq} \| NotEmpty{unconsumed}`；不为空时什么也不写。<br>• 步提交本身从不写 `run_ended`。<br>两个权威各自确认：在途状态（有没有活动写方、有没有未释放的批次）归 supervisor，已提交的未消费集合归 store，谁也不替对方判断。第 3 轮的反例是汇总交给 worker、worker 提交了最后一步；这时 supervisor 确认没有活动写方后调用 end，运行能正常结束，生命周期流推出 `run_ended`，A-01 会触发。`mayEnd` 写进了“被否的初稿”。 | — |
| D6-16 | 赞成 | 已同步为“派生期间 supervisor 不发 P 的结束请求”，与 D6-05 一致。步提交不再写 `run_ended`，所以把在途那一步落进 P 的那次提交也不会结束 P。P 唯一的结局是随派生写下的 `run_aborted`。 | — |

第 4 轮计票：赞成 2 · 反对 0。

计入第 4 轮后，D6 的 22 行在我这里都是赞成：第 1 轮赞成且后来没再改的行，加上第 2、3、4 轮重投后改投赞成的行。
