# omomp 第一轮巡检与提效研究：正式方针表决草案

**状态：研究完成，全部方针待 U90 表决；未生效。**

本稿按用户指定覆盖六个工程席位及领导层最近两小时，提交 Main、ArgonGovernance 发起 Pepgent/PM 正式决策。本文不是工程开工前置，不授权修改业务代码、角色或 `.omp/skills/`，也不替代领导层正式计票。研究与草案编制为用户 U89/U90 对 omomp-optimizer 的专门授权；正式决策定稿与投票仍由 Main 按适用制度组织。

## 执行摘要

1. 六席目录中发现并结构化扫描 **30 个 JSONL**，包括主、子、孙进程，固定窗口内共 **826 次工具调用、31 个显式错误（3.75%）**。其中一个新发现文件在窗口内无记录，未混入分母。
2. 领导层覆盖 Main、Argon、ArgonGovernance、Secretary、Sentinel、LeadMentor、PhaseBClone_ffeb，统一含实际 IRC write 的口径共 **1,120 次请求、33 个 error（2.95%）**。其中 Main 为240请求/2 error，其他六席880/31。fork继承前缀已剔除。
3. 最强证据是：**同型参数错误被重复扇出、派发协议反复协商、长行裁剪后重复远程取回、独立读取串行与依赖操作错误并行并存、同一规则口径反转传遍四席。** 错误率不等于可避免开销率；真实类型/格式/模块问题及缺路径探索不能一律算工具误用。
4. 正式提请逐行表决4项：OMP1-01有界取证与来源传递；OMP1-02按依赖批处理；OMP1-03源头确认后一次交接；OMP1-04工具契约匹配。每项均有观察、原始证据、外部参照、内部原语、可替换方法与量化口径。
5. **不主张**减少必要独立审查、取消最终runtime、把驻留wait认作怠工、修改工程并发上限或另加检查签署。所有收益预测均与观测分开；本次没有实施性能优化，也没有声称已测得优化后的倍速。

## 一、背景、范围与方法

### 1. 固定观察窗口

以研究启动时刻冻结最近两小时：**2026-11-01 11:24:07.000Z—13:24:07.000Z**（本地20:24:07—22:24:07，UTC+09:00）。之后会话继续运行，不刷新窗口来扩大结论。

`session://` 的 until 包含书写单位，因此领导层查询另用 jq 限制 `.t <= "2026-11-01T13:24:07.000Z"`；worker实际末条均早于该上界，字符串比较的整秒/毫秒边界不影响本次计数。日志状态取本轮读取时返回值，按请求时间归窗；不冒充结果完成时刻也全在窗口内。

席位标签遵循用户指派时的六席清单；**不将该清单当作窗口结束或交付时的实时运行状态**。例如Main在13:23:59Z发出W-02退役命令，这是窗口内事实，不据此扩大为巡检新启动的W-03。

### 2. 调查所有权与源头

四名只读巡检员分别负责 library/remote、lab/plugin、退役store/mux、六个领导层子会话；omomp-optimizer负责Main、内部能力研究、外部资料和最终整合。没有联系工程席位，没有读取禁止会话01a193fd，没有查看Git仓库状态或新查GitHub issue/PR历史，没有改业务代码、现行规则或skill，没有运行测试。

- 工程事实源头：指定 `.workers/.../sessions/**/*.jsonl`；工具调用与结果按ID配对。
- 领导层事实源头：`session://01a195a6/.../events.jsonl`、有界timeline和精确entry。
- 引用GitHub链接只用于标识当时讨论对象；本报告不宣称它们是交付时的最新状态。
- Main的 [工具窗口](session://01a195a6/timeline?since=2026-11-01T112407Z&until=2026-11-01T132407Z&type=tools) 与下列四份分片材料可复查全部文件清单、错误清单和参数。

|证据附件|覆盖|
|---|---|
|[inspection-library-remote.md](local://argon/inspection-library-remote.md)|19个JSONL；library/remote主、子、孙进程|
|[inspection-lab-plugin.md](local://argon/inspection-lab-plugin.md)|5个JSONL；lab主及3子、plugin主|
|[inspection-retired.md](local://argon/inspection-retired.md)|6个JSONL；store/mux及子进程|
|[inspection-leadership.md](local://argon/inspection-leadership.md)|六个领导层子会话；fork去重及逐项entry|

### 3. 样本分母

工程按assistant toolCall块计数；退役分片使用唯一tool_execution_start ID，已核对与toolCall一致。一个bash命令链不拆成多请求，设备内部API不重复算外层调用。显式失败只取isError=true；正文HTTP404/超时但isError=false另列。

|席位|窗口内实际首末记录UTC|文件数|调用 / 显式错误|说明|
|---|---|---:|---:|---|
|W-05 library|12:59:17.805—13:24:03.291|15|219 / 10|含1条窗口内未返回wait；另1新文件窗口内0记录|
|W-02 remote|12:59:22.972—13:23:59.319|4|176 / 8|包含真实cargo fmt差异等，不全是协议问题|
|W-09 lab|13:19:14.110—13:24:05.752|4|65 / 3|三次均为缺路径类实际错误|
|W-07 plugin|13:23:04.314—13:24:03.438|1|10 / 0|约一分钟启动样本；有成功响应裁剪/重复抓取|
|W-06 store（退役）|12:59:15.164—13:19:14.004|2|176 / 7|类型、merge冲突、检查输入问题与协议错误分别标注|
|W-01 mux（退役）|12:59:20.333—13:22:57.123|4|180 / 3|另4次HTTP404及1次glob超时，均isError=false|
|**工程合计**||**30**|**826 / 31**|31/826=3.75%，不是“浪费率”|

领导层请求含普通call、dispatch及实际发送的IRC write，不把收消息、thinking或subresult算请求：

|会话|请求|ok / error / pending|
|---|---:|---:|
|Main|240|238 / 2 / 0|
|Argon|133|131 / 1 / 1|
|ArgonGovernance|278|265 / 13 / 0|
|Secretary|151|147 / 4 / 0|
|Sentinel|155|145 / 10 / 0|
|LeadMentor|0|0 / 0 / 0|
|PhaseBClone_ffeb|163|160 / 3 / 0|
|**合计**|**1,120**|**1,086 / 33 / 1**|

PhaseBClone以自身[派工entry d5e4ff65](session://01a195a6/agents/PhaseBClone_ffeb/entry/d5e4ff65) 12:10:01.603Z为起点，剔除之前继承Main的36个事件/14请求/1 error；其163请求=125非IRC+38 IRC。Main狭义普通call为197，不能直接与包含IRC/dispatch的分母混比。

### 4. 已有六份基线如何复用

已读取 `leadership-30m-audit.md`、`probe-leadership-now.md`、`probe-workers-now.md`、`workers-manager-trace.md`、`clone-and-manager-audit.md`、`pm-error-paths-audit.md`。它们用于定位候选和识别既有治理议题，不直接成为本轮统计分母。

尤其不沿用旧基线中的“四席尚未滚动”“导师缺席”、全间隔浪费、或仅凭watchdog称谓推断真正执行者等结论；本轮以固定窗原始调用为准。Rule20所涉业务派工/roster修订由其原owner处理，本报告不重开该组决策；OMP1-03仅补充本轮可量化的交接方法。已有另一研究稿 `omomp-optimization-round1.md` 不被本稿改写或冒充已通过方针。

## 二、五类模式检查结果

|角色定义的模式|本轮结论|证据及不能外推的部分|
|---|---|---|
|1. 并发不足/串行空等|独立读取有两波可合一；另有一次无结果watcher；未证明普遍空等|Main两条独立issue查询见E1；store watcher启动/监视/停止共3调用、23.335s，无业务结果。59次Main wait、其他领导73次wait不能换算成集群闲置；lab 51.37s后台安装期间继续工作，是正例|
|2. 工具选择/协议重试|明确阳性且跨层复现|Sentinel两批8次jq错误；Library三次task拒绝；Governance两次todo协议错；raw+JSON解析错在两席各一例。未展示行edit不等于stale标记；本轮没有据此宣称普遍旧标记冲突|
|3. 长上下文/无效I/O|plugin重复远程抓取、重复显示修复明确阳性；其余大量读取不直接定罪|E2。领导六席422次read/2,278,510返回字符不是无效token；Sentinel两次刷新得到相同1,304字符，但freshness职责使“可避免”未确认|
|4. GitHub/Git/worktree|独立查询串行、依赖Git错并行、raw格式重试明确阳性|E1/E4/E6；mux错误入口404转issue://成功；没有确认重复worktree重建或push循环；不能把正常fetch、限定路径提交归为浪费|
|5. 组织/验收仪式|同一口径反转跨四席传播、职责边界退回、材料缺失再审有证据|E3；Secretary并未索要逐步核账，退回源于消费中的两套职责口径。PR缺driver导致重审是真实材料不足，不能据此取消review或最终runtime|

## 三、源头证据与成本账

以下时间差均为**观测链路跨度**，不是已测得的可全部消除墙钟。额外请求数指工具调用，不等同模型API或GitHub API；同源跨席传播不合算为多件独立根因。

### E1：Main两条独立GitHub读取分两波执行

- [d162cc71](session://01a195a6/entry/d162cc71)，13:19:07.497Z：`gh issue view 203 -R Pepgent/soroi --json state,closedByPullRequestsReferences -q '.state, [.closedByPullRequestsReferences[].number]'`，durMs443，[结果1c2680d9](session://01a195a6/entry/1c2680d9)为CLOSED及关联PR列表。
- [9fa2deea](session://01a195a6/entry/9fa2deea)，13:19:09.904Z：相同字段读取issue190，durMs572，[结果d03180fc](session://01a195a6/entry/d03180fc)也成功。
- 第二条参数不消费第一条结果。**2条工具/2波可变为2条工具/1波**；不宣称省API。观测工具耗时和1.015s；若相同耗时并行，理想临界路径0.572s、差0.443s。两次开始相距2.407s不能全部算节省，尚未实际执行After对照。

### E2：plugin长行裁剪后重新抓取同一文档

文件P=`/Users/mouriya/Ext/code/pepgent/.workers/pepgent-plugin/sessions/2026-11-01T13-23-04-314Z_01a19747-23fa-7202-bf44-31bde9f138a0.jsonl`。

- P:17，13:23:33.698Z：`gh api repos/Pepgent/PM/contents/evidence/decisions/D16-phaseB-review-restore.md -H 'Accept: application/vnd.github.raw'`。
- P:19，13:23:34.007Z：成功但 `columnTruncated={maxColumn:768,unit:"bytes",artifactId:"3",lines:{first:25,last:89}}`。
- P:20，13:23:36.919Z：eval Python以subprocess重新执行相同gh api，再选D16-04/09/10/11/12行；P:22，13:23:37.352Z才显示所需内容。
- **可证1次额外远程重取**；两个结果间隔3.345s，不是可全额节省的网络时间。父研究者已独立投影回读原始6条记录。
- P:26/30/34三次结果仍长行裁剪，P:35以textwrap.wrap(300)重显示后P:37成功。首次显示后3次eval，前2次重显示仍失败于展示；首次至最终17.130s，不能全部归入浪费。对应lab已有artifact后raw两行恢复也说明“长行精确读”与“重抓全文”应区分。
- lab/GenSteady另把来源描述`PM evidence/...`拼到本地cwd，read不存在路径，0.011s失败；证据见lab附件案例4。说明跨代理传真实URI/共享路径的重要性，但因果归因为[INFERENCE]。

### E3：同一既有执行口径在四席反转两次

- Main [a3f8263f](session://01a195a6/entry/a3f8263f)，13:03:04Z向store/library/mux/remote发布“同域合PR、不逐片runtime”。
- Main [600b3c0b](session://01a195a6/entry/600b3c0b)，13:04:11.857Z：向分身要求起草并投D16-11a，另向四席撤回上一口径，要求恢复一片一PR/真实入口。
- Main [05b5958c](session://01a195a6/entry/05b5958c)，13:04:55.476Z：撤回D16-11a并向四席再撤回更正，明确承认“没有先核对LEDGER就另设了关卡”。
- 后两条entry原参数完整可见：**4撤回执行消息+4恢复消息+1起草指令+1撤回指令=10次根部反转请求**。两条反向指令相差43.619s；不当作全部停工。下游另有Library2纠正广播+1结论更正、Remote2分支撤回/恢复+2广播、store至少1失效todo、mux至少2失效导师传播；它们是同一根因，不再相加成“总节省”。
- W-05缺承载issue的首报[ c5c73d1f ](session://01a195a6/entry/c5c73d1f)13:07:46.857Z，Main直接解阻[c1f63a54](session://01a195a6/entry/c1f63a54)13:12:51.220Z，历时304.363s；其间仍做README，不是5分钟空等。
- Secretary13:22:01向Argon按D16-12抄送，被新职责退回，再向Main上报并修订记录，至少3次后续请求、90.689s历时；精确entry见领导附件案例6。秘书已写“不请求预审或核账”，不能改写成其主动加门。

### E4：只读派发及raw/JSON协议错误

Library日志L=`/Users/mouriya/Ext/code/pepgent/.workers/pepgent-library/sessions/2026-11-01T12-59-17-805Z_01a19731-5fad-7799-ba11-46a1a90f71b6.jsonl`。

- L:139，13:05:03.949Z，task SoroiImplCheck未明确isolated；结果L:141为多主题拒绝。
- L:144，13:05:57.199Z，拆4项仍不设isolated；L:148：`Not dispatched — a reminder, not a rule ... sharing this working directory without isolation`。
- L:149，13:06:45.872Z补isolated:false，L:151仍一项多主题；L:155，13:07:23.549Z明确3个独立只读问题、全部isolated:false，成功派发。
- **3次额外task尝试，139.600s跨度**；不等于hook耗时，不建议绕过hook。
- Governance调查派发也先未设isolated，后因`Concise factual report...`被报告长度guard拒，第三次改“写完整报告至local并回路径”成功；原文字没有N字上限，不能讹报为明确字数限制。见[33ab91e4](session://01a195a6/agents/ArgonGovernance/entry/33ab91e4)、[e6b25b38](session://01a195a6/agents/ArgonGovernance/entry/e6b25b38)、[d164a556](session://01a195a6/agents/ArgonGovernance/entry/d164a556)：**2次额外task尝试、59.165s跨度**。
- Library L:317–322：raw源码响应同时`--jq "."`，`invalid character '/' looking for beginning of value`；Remote R:39–44同型，raw Markdown再`--jq .`，`invalid character '#' looking for beginning of value`。各1次可避免错误尝试，不把后续真实模块加载失败也算格式误用。

### E5：Sentinel同一jq字段错误两度扇出四席；Governance猜todo语法

- [00a6a2ba](session://01a195a6/agents/Sentinel/entry/00a6a2ba)，13:04:32.166Z，同波四次read都写`{ts:timestamp,...}`；[1d766dea](session://01a195a6/agents/Sentinel/entry/1d766dea)原错 `Failed to execute JSON query: Error: undefined filter`。
- 13:04:42.762Z改`{ts:.timestamp,...}`四条成功；13:06:35.036Z在另一投影又写回`ts:timestamp`，四条再次同错，[ddae6b52](session://01a195a6/agents/Sentinel/entry/ddae6b52)；13:06:43.725Z再修正成功。
- **8次额外read；两批失败到修正请求10.596s/8.689s**；错误工具耗时合计仅37ms。不可将两个跨度当作全部墙钟浪费，也不能把四路并行误判成串行。
- Governance13:03:12用无Begin/End且混入MEASURE/COMPLETE的todo，[72f0e6da](session://01a195a6/agents/ArgonGovernance/entry/72f0e6da)：`Expected *** Begin Todo`；补包装后[5cdf8fb0](session://01a195a6/agents/ArgonGovernance/entry/5cdf8fb0)：`Invalid GOAL command or arguments`；读协议后13:04:36正确完成。**2次失败，84.047s跨度**。必要的协议read不是当然应删，目标是调用前阅读而非首次失败后猜补丁。

### E6：Remote有依赖Git操作同批执行，实际失败并重做

R=`/Users/mouriya/Ext/code/pepgent/.workers/pepgent-remote/sessions/2026-11-01T12-59-22-972Z_01a19731-73dc-7363-8511-784f19fccd35.jsonl`。

- R:241，13:09:29.424Z同条assistant并行三bash：`git add <5路径>`、`git commit -q -m ...`、`git status --short`，cwd均a2-01-remote-design；三次开始13:09:29.425Z。
- R:246，13:09:29.492Z commit返回`Changes not staged for commit ... no changes added to commit`；R:248先单独add，R:251再commit，R:253于13:09:33.960Z成功。
- **2次追加请求、4.536s起点至成功跨度**。原始调用/结果已由父研究者投影回读；不是根据命令关键词推断顺序问题。
- Governance也有刚写入归档文件即`pull --rebase`的[6a64d730](session://01a195a6/agents/ArgonGovernance/entry/6a64d730)，原错`cannot pull with rebase: You have unstaged changes`；调整为先限定路径提交再pull后成功。1次额外bash、16.363s跨度。没有据此设计新锁、补偿或worktree机制。

### 未进入正式方针的观察

- Main两次DONE受共享根工作树影响：[3713366b](session://01a195a6/entry/3713366b)说会留下未提交修改；[ac82f26f](session://01a195a6/entry/ac82f26f)对`DONE "Launch wave 1" "LEDGER.md" "chore: no-op"`报`scope ... staged nothing`。这是工具语义与行政任务生命周期的适配问题，不准为完成todo提交别人的工作或造空操作；本轮不设计新状态/绕过机制。
- store watcher启动、monitor、停止3调用/23.335s，不能证明有多轮轮询；没有足够依据制定新通知基础设施。
- Library PR [14](https://github.com/Pepgent/lab-library/pull/14)材料缺driver/命令/退出状态引发Gate4补证，9次可识别补证调用、143.367s至重审；这些不全可删。证据不足不被本报告“提效”豁免。

## 四、外部先进实践与内部原语

外部资料已通过web_search检索，并读取Anthropic三篇原文；只借用原则，不把其宣传数字当本集群收益。

|代号|一手资料|采用的具体原则|本地结合|
|---|---|---|---|
|A|[Anthropic：How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)，2025-06-13|明确任务边界；独立方向与工具并行；长结果落artifact回引用；多代理本身有成本；结局评估不逐步仪式化|tasks[]、显式isolated、local产物、同波独立read；不为短查询加代理|
|B|[Anthropic：Writing effective tools for agents](https://www.anthropic.com/research/writing-tools-for-agents)，2025-09-11|按工作流选工具；高信号响应；分页/过滤/范围；清晰参数和可操作错误；统计调用与错误|read ?q=、有界raw、对应topic、格式匹配；协议错误与真正工程错误分开|
|C|[Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)，2025-09-29|最小高信号上下文；轻量引用、按需取回；明确而不过度僵硬的指引；子代理压缩/分工|精确entry、session作用域artifact、共享local路径；不搬全文IRC、不新建权威副本|
|D（补充）|[OpenAI：A Practical Guide to Building AI Agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)|仅在有必要时增加多代理复杂度，manager统一整合|只作为检索旁证；不凭此取消当前角色或规定新的组织结构|

**内部已核实能力：**

1. `tool://read/json`、`tool://read/selectors`、`session://README`说明JSON投影、绝对窗口、entry和有界raw。源码 `omp-config/agent/extensions/session-urls/handler.ts:308–338`实现timeline/events过滤及entry；`window.ts:178–198`固定分页窗口；`events.ts:420–435`由配对结果生成status/resultChars/durMs。它们是从日志派生的读取视图，不是新的业务状态源头。
2. `isolation-nudge/index.ts:1–18`明确只读显式isolated:false不触发提醒；`task-split-check/index.ts:14–22,116–129`明确report-limit及长报告写文件。限制中既包含数字限额，也包含“concise”措辞；草案采用产物路径，而不是教人规避guard。
3. `tool-topics/index.ts:1–23`说明tool://只用于宿主内置工具，插件服务自己的xd://topic；`tool-topic-injection/index.ts:1–6`说明在main/sub上渐进注入，不需复制全工具手册。
4. `xd://eval/agents`的workpool/agent和`tool://eval/bridge`可做有界并发；当前多工具并行包装也实际用于本研究。研究完成时没有挂载`xd://github`，读取它返回No such tool；因此不把历史中可用的该设备写成普适必需入口。优先当前read资源或确需的gh API。
5. `omp-peers/README.zh-CN.md:17–35`明确peer工具属主会话、send只确认注入、不跟踪已读/完成。治理交接不能把投递当业务完成。
6. `omp-todo-more/src/git.ts:11–20,100–109`解释DONE dirty/scope语义以及共享父工作树子代理的例外；本研究不修改它。

环境事实：角色定义中 `/Users/mouriya/Ext/code/omomp/oh-my-omp` 本次两次定位均不存在；已读父目录确认实际存在omp-config、omp-todo-more、omp-peers等定制仓库。不猜替代核心源码路径；上述提案只依赖已挂载文档及实际存在源码，无须以恢复缺失目录作为完成前提。

## 五、正式方针：观察、替换方法与量化取舍

### OMP1-01：有界取证、复用已取回内容、传递真实来源

- **Observation：**六席30文件、826调用；明确阳性来自plugin 10调用中的同文档重取和多轮显示恢复，lab有长行raw恢复及错误来源寻址。E2是最强局部样本，不推广成全局读取浪费率。
- **Evidence：**E2给完整JSONL路径、物理行、参数、裁剪元数据及3.345s/17.130s跨度；原错误不是isError，而是columnTruncated成功结果。
- **External + Primitive：**B的范围/过滤、C的just-in-time引用，结合已有artifact、有界raw、events投影与精确entry。
- **Before → After：**`gh raw全文 → 截断 → eval重新gh raw`，改为`第一次结果的artifact → read artifact://3:raw:25-37`；跨代理用完整session作用域artifact或已写好的共享local路径。具体范围由实际目标决定，不照抄编号。JSONL先窄投影再entry，不在eval中subprocess读本地文件。
- **量化：**本案例远程抓取2→1，保留局部read；目标消除两次仍裁剪的重显示。工具/网络总数不混算；After尚未实施，墙钟收益未实测。
- **取舍：**稍多一次精确定位，换更少重复内容；必要初读全文、分页及无工具导师完整表格不受禁止。不添加缓存或另一套权威资料库。
- **Skill：**[skill-draft-wave2-bounded-evidence.md](local://argon/skill-draft-wave2-bounded-evidence.md)。

### OMP1-02：按真实依赖划波，独立读合批、依赖写保序

- **Observation：**Main240请求中识别一对独立查询两波；Remote176调用中观察到一次add/commit错并行并重做。不是普遍串行比例。
- **Evidence：**E1两个精确entry及durMs；E6同消息三个toolCall、未暂存错误与追加add/commit。
- **External + Primitive：**A的并行独立工作与避免同步瓶颈；task tasks[]、多工具并行、eval Promise.all。研究分片适用，不为两条短读增加代理。
- **Before → After：**两个`gh issue view`分两轮，改为同轮两个read或同一GraphQL aliases；相同`add`/`commit`分开并行，改同一cwd下`git add <明确路径> && git commit -m <实际信息>`，最后状态观察只在需要时做。保留既有每仓/路径域写入归属与并发上限。
- **量化：**E1两波→一波，API仍2；理想工具临界路径1.015s→0.572s，估算差0.443s，不是已测速度；E6目标消除2次追加调用及一次commit失败，不承诺消除全部4.536s。
- **取舍：**用简单依赖判断换正确并行，不新建调度器、锁、仲裁或固定扇出数。结束旧席位后才占用其名额，不因“并行”越过生命周期。
- **Skill：**[skill-draft-wave2-dependency-batch.md](local://argon/skill-draft-wave2-dependency-batch.md)。

### OMP1-03：源头确认后一次交接，已有用户规则不再降格重投

- **Observation：**Main与四个首波席位均记录相同110.95—110.98s口径翻转；Secretary/Argon也出现职责不一致退回。四席不是四个独立根因。
- **Evidence：**E3两个原始Main entry显示实际10个反转请求，且发起者明示核对不足；304.363s承载处理是历时，不证明全部等候。
- **External + Primitive：**A的清晰边界与artifact引用、C的最小高信号说明，结合既有issue/PR记录、Secretary职责、agent://短协调；peer_send不是完成回执。
- **Before → After：**`先广播→改解释→新投票→再撤回→四席再改计划`，改为`向现行规则owner确认适用→一次发出带源头的执行口径`。普通承载/状态由已确认owner在原对象闭合；真正范围/契约争议仍走现有裁决，新正式方针仍按U90投票。
- **量化：**目标下一同类交接不再产生本例10个自反转工具请求；下游撤回/恢复不再次累计。43.619s不是全额可省时间。职责路由目标避免案例中的3次退回处理，不对每条正常通知设审批。
- **取舍：**发出前完成已有职责内的源头核对，避免执行中反复改口；不加第二审核人、不要求每PR签署、不把本研究投票变成工程门禁。已经发错仍必须明确纠正，不能为省消息隐瞒。
- **Skill：**[skill-draft-wave2-source-handoff.md](local://argon/skill-draft-wave2-source-handoff.md)。

### OMP1-04：当前挂载与输入/输出格式匹配，示例复用替代猜语法

- **Observation：**Sentinel155请求中8次同型jq失败；Library3次task派发失败，Governance两次task拒绝和两次todo协议失败；raw+--jq在Library/Remote各一例。
- **Evidence：**E4/E5的实际参数与原报错；不把所有31/33显式错误转成可避免协议失败。
- **External + Primitive：**B的清晰schema与可操作错误、C的少量规范示例；tool://和xd://渐进topic、已有dispatch guard，不增加插件或hook。
- **Before → After：**`{ts:timestamp,...}`→`{ts:.timestamp,...}`并复用已成功字段投影；读取未知schema先一条结构再批量查询，而不是把同一未验证形状扇出。`raw --jq .`→raw纯文本（或真正JSON+投影）；只读task从第一次显式isolated:false，各item一个问题、长报告写local；todo直接使用Begin/End和三参数GOAL，不逐项猜补。
- **量化：**本例目标消除Sentinel8次同型失败、两席各1次raw格式失败；派发目标一次正确构造，不能保证语义切分hook永无误判。10.596s/8.689s、139.600s、59.165s等仅为历史链路跨度，不相加成总收益。必要协议read仍保留，只前移到相关首次调用之前。
- **取舍：**只读本次需要topic及一个规范例，不预读全手册、不绕过guard、不替工具改权威；主会话行政DONE适配问题留作已明确的待观察项。
- **Skill：**[skill-draft-wave2-tool-contract.md](local://argon/skill-draft-wave2-tool-contract.md)。

## 六、正式提效方针表决草案（U90）

分类按现行流程供领导层审定；这四项是新增的操作方法提案，不把用户直接指令本身拿来投票。每行独立表决，允许部分通过，不拖住无关工程。

|ID|what|where|how|取舍|分类|缺失部分或设计补充？|
|---|---|---|---|---|---|---|
|OMP1-01|有界取证、裁剪复用与真实来源传递|Main、Secretary、Sentinel、调查/核对任务；对应草案bounded-evidence|采用E2替换：read投影→entry；裁剪读已有artifact有界raw；跨代理给实际可解析来源；通过后接入批准角色的project skill|少一次重复抓取与显示重试；保留必要全文/分页和独立审查；不加缓存|技术|补充操作示例，不改业务契约|
|OMP1-02|按依赖组织批处理|多仓/多席读取；工程Git动作仅作为已有调用顺序范例；对应dependency-batch|独立读取同波，真正有依赖写操作顺序链；短查不用额外代理；沿用并发上限与生命周期|减少往返而不盲目并行；不建立新调度器，不增加审批|技术|补充调用方法，不改席位排期授权|
|OMP1-03|源头确认后一次交接|Main与既有Secretary/治理接口；对应source-handoff|已有规则适用结论先由owner确认后一次转达；普通状态在原issue/PR闭合；真正新方针仍U90，已有用户规则不重投|避免自我反转和中间人退回；不免除真正决策，不新增预审|串联|补充交接方法；与既有Rule20修订按owner合并而非重开|
|OMP1-04|工具入口与schema/格式匹配|当前omomp工具调用与只读派发；对应tool-contract|首次相关调用读当前topic，复用正确jq字段、显式isolated、raw/JSON择一、完整todo文档和已展示行edit|减少已观察的协议失败；保留必要topic成本，不改hook或绕过拒绝|技术|补充规范示例，不改变工具实现|

### 发起和落地边界

1. Main、ArgonGovernance以本稿和四份Skill草案发起正式投票，秘书按既有流程办理；本研究不自行开新repo/issue、不替投票席表态。若需映射正式Dn编号，由现有决策owner分配，保留OMP1行ID追溯。
2. 未通过前只保留local草案；通过后只落地通过的行及匹配Skill，并更新其实际适用角色，不把整份研究报告塞进每个system prompt。
3. 新方针/Skill真实消费验证尚未执行，不能称“Skill已上线且runtime通过”。通过后的落地owner应按实际omp入口验证批准方法，并保留行为结果；这不是对当前工程新增runtime门禁。
4. 不回写已发布历史票、评论或合并PR；文档落地时直接替换冲突的现行指导，检查全文语义，不追加多份自称权威入口。

## 七、交付证据与结论

本研究实际运行了：本地JSONL的read嵌入查询；session时间窗口/字段投影/entry取证；并行只读分片；已存在扩展源码读取；web_search与一手网页读取；对已取得数字进行时间差及比例运算。关键证据由父研究者独立回读plugin裁剪重取、Sentinel两次同错、Remote错误并行Git原调用/结果。所有产物实际写入local路径。

没有运行build、lint、测试或新性能基准；没有用hash验证作证；没有把旧报告、他席自述或模型上下文规模代替源头观察。四项After是**待投票的方法及量化目标，不是已经实现的性能结果**。第一轮研究交付完成，正式方针及Skill仍待U90表决；后续保持可达，不另行联系工程席位。