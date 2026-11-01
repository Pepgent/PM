# D24：根端点 derive 请求补 `by`（P0，解除 soroi#217 的 BLOCKED）——v2 定稿

起草：治理分身 GovClone_55b0，同时也是D19起草者。决策issue：[PM#34](https://github.com/Pepgent/PM/issues/34)。

**v2与计票：** claude-high对v1提出回写清单不完整、D12引用位置错误的具体反例；发起人已在v2逐条承认并修改，独立审查席第2轮确认消除。v1票作废，仅计v2重投：协调席、claude-high、ArgonSol、导师均赞成，**4/4通过，无意图否决、无剩余有效反例、无分类争议**。依LEDGER C2-3（U95），本案为产品/契约四席，门槛至少3席赞成且有效反例清零。

**来源：** W-07在[SOR-15部分BLOCKED](https://github.com/Pepgent/soroi/issues/217#issuecomment-6559889645)上报派生通知缺少principal。

## 事实

- D5-16情形二规定：eval插件拿到store提交结论后，向拥有运行的主会话投递带人类来源的IRC，principal取自派生请求。人类来源写为 `from = human:<principal>`（D5:61、D3-12）。
- D19-01原先漏写这项来源；本案补齐Lab→根端点的请求字段，不改变store派生提交或GUI→Lab命令。
- 同属D19-01的answer和takeover所带 `HumanHandback` 已有 `by`。Lab按 `conversation.owner` 授权，并用当前UserId填写来源（D7-03、D12-11）。owner为MemberId，不能拿它替代UserId。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D24-01 | **derive 请求补 `by: UserId`** | 根端点derive请求全部正文：D19:29（D19-01）、D3:73、D5:312、D5:315、D6:125-129、D6:299、D7:69（D7-09）、D7:204、D8:276（SOR-13）；`packages/omp-soroi`根端点；`apps/web/src/server/lab/**`的Mux调用 | 根请求为 `{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[],"by":UserId}`。`by`与 `HumanHandback.by` 同义（D7-03：principal与by都是Lab当前UserId）；Lab按conversation.owner授权后，填入发起派生的当前UserId。eval插件在派生提交成功后，以 `from = human:<by>` 投递D5-16情形二IRC。**保持不变：** store的 `POST /runs/derive`、`DeriveCommit`，以及GUI发给Lab的 `intervene.derive`（D12:425，by由Lab填写）。W-07解析并使用by，W-09在发出请求时填写by。秘书一次性回写where列出的九处正文，统一带by。 | **得到：** D5-16来源约束可实现，与answer/takeover同义，同一请求只有一种形状。**代价：** wire多一个字段。**不选：** 改取conversation.owner；这会改写D5-16、迫使端点反读Lab归属而增加权威，而且owner为MemberId、不是UserId（D12:42、514-515）。 | 串联 | 是：D19-01漏了D5-16要求的principal | 协调席：赞成；claude-high第2轮：赞成；ArgonSol v2：赞成、否决0；导师v2：赞成 | **4/4通过；原反例已消除** |

## 原票与反例回应

原票全文及各轮历史保留在 `evidence/votes/D24-{Coordination,ClaudeHigh,ArgonSol,LeadMentor}.md`，逐席刊载在本决策issue；只计v2。Main与GovClone合计一协调票，导师票由GovClone按IRC转录，秘书不代投。

claude-high第1轮反例：若W-07按新wire必填by，而W-09继续按旧D7发送无by请求，将被严格解析拒绝；若W-07按旧D8验收不解析by，则D5-16再次没有来源。发起人v2补齐九处、删除错误的D12修改要求；原审查席第2轮逐项核对后改赞成，ArgonSol与导师重投确认。D12的GUI命令、store的DeriveCommit和POST接口均不修改。

本案只建立批准契约及文书回写，不等于业务实现、实际送达或阶段C统一运行验证完成。后续实际送达分别由AreaMgrSoroi负责W-07、AreaMgrPepgent负责W-09。
