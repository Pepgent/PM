import json,re
from pathlib import Path
ROOT=Path('/tmp/d10-rewrite')
repos=['soroi','Pepgent','deploy','images','omp-rpc-mux','remote','lab-library','PM']
issues={(r,x['number']):x for r in repos for x in json.loads((ROOT/f'{r}.json').read_text())}
BASE='https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D10-repo-delivery.md'
def url(key):return f'https://github.com/Pepgent/{key[0]}/issues/{key[1]}'
def link(key,label=None):return f'[{label or key[0]+"#"+str(key[1])}]({url(key)})'
A0=('soroi',235);S2=('Pepgent',30);SERVER=('Pepgent',23)
DECISION=f'依据：[D10 决策结果](https://github.com/Pepgent/PM/issues/16)、[D10-05 / D10-06]({BASE}#L17-L18)；发行导入接入时点按 [D10-14]({BASE}#L26)。\n\n开发期先完成各组件实现与本仓检查，不执行跨组件 e2e。依赖切片的代码已合入其仓 `main` 即可开工；只对编译、类型、构建或调用契约确实需要先存在的代码/产物保留依赖，不等待前置切片的 runtime 通过、live issue 关闭或波次验收。\n\n统一阶段入口为全部实现代码与 E2E-* 的 spec、runbook、check 脚本已合入各自仓 `main`，实现切片已有本仓真实入口的局部运行观察，镜像、release tar、ENV/DEP 环境声明已具备；E2E-* 只豁免开发期执行。执行顺序：A0 → S1（F01–F30）→ E2E-21 server-function 核对 → S2（F08–F31）→ D9（F32）。入口看代码、产物和局部观察事实，不看 issue/Project 状态。\n\n范围不减，D8-01 至 D8-12 的真实入口与归档要求保留；commit、release 名、镜像引用只记录组装身份，hash/digest 比对不得作为通过证据。'
COMMON='本节只验本仓真实入口的局部行为，记录实际命令、环境、输出和本仓可观察结果；不拉起其他 Pepgent 组件、不运行完整 compose、不执行 F 行。外部协议边界可用已通过协议的本地协议桩，证据必须标明协议桩观察，不冒称真实跨组件通过。类型检查、构建、mock/oracle 或文件存在不能替代本仓真实入口的运行观察。'
# Local observations restate existing implementation responsibilities; no new domain contract.
local={
('soroi',190):'启动本仓真实 store HTTP 服务，在本地写入运行事实，订阅 `/runs/{run}/stream?after` 与 `/stream/lifecycle?after`，保存实际 SSE 原文，观察续订不重不漏；run seq 与 lifecycle opaque cursor 分别按各自契约消费。',
('soroi',203):'启动本仓真实 store（或本仓镜像），直接从 HTTP 入口提交协议规定的完整发行 artifact，观察返回 ReleaseRecord、`GET /releases` 的记录以及引用对象可读取；不运行 deploy init。协议拒绝输入不产生发行记录的行为保留，用 HTTP 结论与存储记录证明，不以 hash/digest 比对作证据。',
('soroi',196):'经本仓公开插件入口启动真实上游 omp 并派发子 agent，外部 Mux 协议用本地协议桩承接，观察写方声明、开代、dial 调用与停驻/唤醒的关代、开代调用顺序及实际子进程生命周期；不启动真实 Pepgent Mux/store。',
('soroi',205):'从本仓已安装插件的真实 omp 工具入口调用 capture，观察真实子进程 host-call 转发、成功交回的工具结果与实际 transcript sessionId；外部服务只在协议边界由本地桩承接，不执行真实节点库 F07。',
('soroi',207):'从本仓人类 IRC 的公开入口提交、编辑、撤回消息并推进真实会话步边界，观察本仓待投递表与实际投递结果：编辑后内容被投递，撤回项不投递；Mux 边界可用协议桩。',
('soroi',209):'从本仓实际 eval/控制入口启动会话与 Human 调用，读取本仓端点提供的 writers/slots，并经 answer 观察槽位结束；Mux 注册/路由由协议桩承接，不用真实 Mux。',
('soroi',211):'经本仓实际 omp 工具入口观察角色可用工具、worker 写步调用、批次交回/释放与提醒可见性，保留未释放时根 supervisor 不发 `/end` 的外发请求观察；外部 store/Mux 使用协议桩，不执行 F19/F22。',
('soroi',214):'经本仓真实远程 Program/boot 入口运行本地 Program，remote/store 边界用协议桩承接，观察 call.json 与 RunRequest、终态后取回结果/提交/remove 的调用顺序；EndedUnstarted 路径不读暂存区。不得启动 Komodo/Slurm 或其他 Pepgent 组件。',
('soroi',215):'经本仓公开 eval 入口观察中心部署注入值和 remote templates.identity 响应进入环境身份的消费路径；remote/store 边界用协议桩，不改变身份契约，不以计算或比对 hash/digest 作为验收证据。真实换模板后的复用行为在统一阶段观察。',
('soroi',216):'从本仓实际 abort 入口中止本地真实 Program runner，观察 runner 进程结束；经同一本仓插件入口观察子会话当前轮中止且之后仍可接收唤醒请求，外部 Mux/store 由协议桩承接。',
('soroi',217):'从本仓实际 derive 控制入口观察 InFlight 先落成 Committed、请求 store、执行派生运行第一步和 IRC 通知的顺序；store/Mux 由本地协议桩承接，不执行真实 F24。',
('soroi',222):'经本仓 launchRemote/boot agent 真实入口，观察定制 tar 与 transcript 的拷入/拷出请求、agent 分支启动及交回处理；remote/Mux/store 由协议桩承接，不启动远程后端。',
('soroi',223):'从本仓实际 eval dry-run 入口运行本地 Program 并观察实际返回值；remote/store 边界由协议桩承接，调用返回时发出 DELETE /transfers/{t}，不提交步骤、不上传对象；不运行 Komodo。',
('soroi',224):'开发期完成五类 A0 探针代码并合入 main；A0 可提前作为定制/发行仓本仓检查执行：只使用该仓发行 tar、干净上游 omp 与模型网关，实际观察五类内容生效，不启动 store、Mux 或完整 compose。该次本仓观察不替代统一阶段重跑 A0，也不要求 PR 等到统一阶段才合入。',
('soroi',228):'从本仓实际 abort 与 dry-run 入口，外部 remote/Mux/store 用协议桩承接，观察 Program abort→终态→remove、Agent 停止/回收 transcript 的调用顺序，以及 dry-run 无提交/无对象上传；真实远程与 Slurm 结果归统一阶段。',
('soroi',229):'运行本仓真实 RemoteChild Parquet 写入入口，在本地目录观察 `soroi-batch/` 只向读方公开已改名文件，读取已写 Parquet 行并核对已定 agent_progress schema；不启动远程/Mux/store。',
('Pepgent',9):'启动本仓 Web host，经真实页面 loader/异步 readSnapshot 入口观察 13 个 controller 不改动且页面照常渲染，保留页面操作与截图；不装配 soroi/store/Mux/remote。',
('Pepgent',11):'启动本仓真实 Lab host，经已认证 Lab 读取入口与 tail SSE 观察 jobs 模板/状态、日志尾部、compute 重读与 Removed 不再开 tail；remote/Mux 边界由本地协议桩提供已定响应，证据不冒称真实远程作业。',
('Pepgent',13):'从本仓真实 discussion.create/discussion.prompt 或 server-function 入口驱动 LabSessions，Mux/omp 边界用本地协议桩承接，观察实际写方、开代、dial、ready、get_state、set_host_tools、prompt 与停驻唤醒的协议调用；根 human_irc_queue 在 Lab 本进程观察。',
('Pepgent',14):'启动本仓真实 Lab host，以协议桩提供 store 生命周期流，经实际订阅入口观察 run_started 后 lab.sqlite 的 experiment_ext 和 R-0xx 编号分配；不运行真实 store。',
('Pepgent',15):'从本仓真实节点库导出与 library.stage/apply 入口操作本地实际库 checkout，观察静态导出与源码一致、stage/apply 的本仓数据库状态与实际 commit/快进结果；store usage 只在协议边界由本地桩提供，不要求真实 store 联调。权限和导出契约按已通过 D10-11/12，不在本项另定设计。',
('Pepgent',16):'从本仓实际 lab_open_artifact/lab_save_artifact host-tool 入口操作真实会话 worktree，外部 store 用协议桩承接；观察 inputs 的实际文件字节与读取行为、artifacts 不可变快照和 artifact_meta 记录，save 不写 store。不以 hash 比对作通过证据。',
('Pepgent',17):'启动本仓真实 Lab host，store/Mux 边界用协议桩提供已定事实，经真实 catalog/page/event/object 入口观察返回线数据和 run 频道推送；不运行真实 store/Mux。',
('Pepgent',18):'从本仓真实 draft.save/experiment.start/experiment.approve 入口观察 lab.sqlite 的 draft、pending_launch、experiment_ext.draft；以协议桩承接会话与生命周期流，确认免审批时 sent、草稿 prompt 发出、收到 run_started 后绑定并删除 pending_launch；不运行真实 store/Mux。',
('Pepgent',19):'从本仓实际自动化规则/定时/审批入口观察 automation_run 写入和 waiting 批准后的会话启动请求；外部 store/Mux/omp 以协议桩承接，不把桩响应当真实运行。',
('Pepgent',20):'启动本仓真实 Lab host，经 page.read、agents stream/files 入口观察实际线数据的在途槽位和 SSE 转发；外部控制端点/Mux 由本地协议桩承接。',
('Pepgent',21):'启动本仓真实 Web host，在本仓页面操作 loader/LabBridge/subscribe/send/watchAgent，观察收到本仓事件后实际失效并重读；store/Mux 等外部边界用本地协议桩，保留页面操作及截图。',
('Pepgent',22):'从本仓真实 discussion transcript/load/附件入口操作实际本地会话记录与 worktree，观察只读停驻 transcript 不发唤醒请求、discussion.load 写入 discussion_context；外部 store/Mux 以协议桩承接，不启动其他组件。',
('Pepgent',24):'从本仓真实 intervene.takeover/answer/derive、run.abort、human.irc 命令入口发出操作，外部拥有方由本地协议桩承接，观察请求路由及本仓只在拥有方返回后报告结论；不运行真实 store/Mux/soroi。',
('Pepgent',25):'从本仓真实节点库与自动化页面/投影入口观察源码一致的线数据映射与渲染；使用本仓运行记录或明确标注的协议输入覆盖相关变体，不为产生输入启动其他 Pepgent 组件；保留页面操作、截图与投影结果。',
('Pepgent',26):'从本仓真实实验页面/投影入口观察 RunGraph 到 ExperimentFlowFixture、时间轴/比较/派生/workspace 映射；保留已要求的 Aborted（无 version/body/env、outputs=[]）投影覆盖。本仓可消费已有真实录制，不等待新跨组件录制产生；完整新录制核对在统一阶段完成。',
('Pepgent',27):'从本仓真实讨论、数据集与流程编辑器页面/投影入口观察映射、状态与渲染；可用本仓记录或标明来源的协议输入，不启动其他 Pepgent 组件；保留页面操作、截图与投影结果。',
('Pepgent',28):'从本仓真实集群、容器、接入向导、设置与首页入口观察投影与渲染；外部 remote/Mux/store 在协议边界由本地桩承接，保留页面操作、截图与实际线数据，不冒称真实远程通过。',
('Pepgent',29):'启动本仓构建好的真实 Web host，浏览器走完本仓 13 个页面，观察阶段 B 的 id、AgentTemplate、LabBridge 与后端数据路径切换，运行时不引用 LAB_SNAPSHOT；外部服务只用协议桩，不装配完整 Stack。真实跨组件数据逐页核对由 S2 承接。',
}
receivers={
('soroi',190):[('soroi',220),('soroi',259)],('soroi',203):[('soroi',182),S2],('soroi',196):[('soroi',250),('soroi',226)],('soroi',205):[('soroi',250)],('soroi',207):[('soroi',227)],('soroi',209):[('soroi',227)],('soroi',211):[('soroi',250)],('soroi',214):[('soroi',231),('soroi',232)],('soroi',215):[('soroi',231),('soroi',232)],('soroi',216):[('soroi',227),('soroi',231),('soroi',233)],('soroi',217):[('soroi',227)],('soroi',222):[('soroi',233)],('soroi',223):[('soroi',231),('soroi',232)],('soroi',224):[A0],('soroi',228):[('soroi',233),('soroi',232),('soroi',231)],('soroi',229):[('soroi',233)],
}
for key in local:
 if key[0]=='Pepgent':receivers[key]=[S2]+([SERVER] if key[1] in [13,14,17] else [])
E2E={('soroi',219):'S1 F05',('soroi',220):'S1 F06、F09–F13',('soroi',226):'S1 F20–F21',('soroi',227):'S1 F08、F23–F25',('soroi',231):'S1 F14、F17 Program 与 F18',('soroi',232):'S1 F15、Slurm tail 与排队取消 EndedUnstarted',('soroi',233):'S1 F16–F17 Agent',S2:'S2 F08–F13、F17、F18、F23–F31（完整浏览器路径）',SERVER:'S1 后、S2 前的 server-function 核对'}
live={('soroi',182):'S1 / E2E-10 / F01',('soroi',245):'S1 / E2E-11a / F02–F04',('soroi',250):'S1 / E2E-13 / F07、F19、F22',('soroi',259):'S1 / E2E-19 / F26–F30',A0:'A0 / E2E-02 / 五类 PTY 安装验收'}
drafts={};obligations=[]
def section(body,heading):
 m=re.search(r'^## '+re.escape(heading)+r'\n(.*?)(?=^## |\Z)',body,re.M|re.S)
 return m.group(1).strip() if m else ''
def swap(body,heading,text):
 return re.sub(r'^## '+re.escape(heading)+r'\n.*?(?=^## |\Z)',lambda m:'## '+heading+'\n\n'+text+'\n\n',body,flags=re.M|re.S)
def base(body):
 body=re.sub(r'^- \[D8 §4\.1 波次与并行顺序\].*\n','',body,flags=re.M)
 body=re.sub(r'^- 波次 / wave：.*\n','',body,flags=re.M)
 body=body.replace('（前置切片须已有 runtime 验收证据，才能开工）','（依赖切片的代码已合入其仓 `main` 即可开工；仅限实际需要的代码/产物，不要求上游 runtime 通过）')
 body=body.replace('注明执行者、工作入口、上游 runtime 证据链接。','注明执行者、工作入口与实际需要的代码/产物。')
 body=body.replace('按已通过的 D2–D8 实施','按已通过的 D2–D8 与 D10-05/06 实施')
 return '## 交付顺序与依据\n\n'+DECISION+'\n\n'+body
for key,obs in local.items():
 x=issues[key];old=section(x['body'],'验收 / acceptance').split('\n\n验收执行与记录遵循')[0]
 b=base(x['body'])
 b=swap(b,'验收 / acceptance',obs+'\n\n'+COMMON)
 dest=receivers[key]
 text='统一阶段由 '+ '、'.join(link(k) for k in dest)+' 承接本切片的跨组件验收；完整执行下列原义务及其 D8 矩阵相关流程，不缩减范围：\n\n> '+old.replace('\n','\n> ')+'\n\n此处引用中涉及的 hash/digest 仅为对象地址或协议字段，不是通过证据；以真实执行行为与权威下游结果判定。各承接 issue 的正文同时列明本来源和原义务。'
 b=b.replace('## 依赖关系\n','## 统一 e2e 阶段承接的验收\n\n'+text+'\n\n## 依赖关系\n\n仅保留编译、类型、构建或调用契约确实需要的代码/产物关系。以下跨组件运行条件只约束上述统一阶段，不阻塞开发；未被本仓构建实际消费的外部服务不要求启动。\n')
 b=b.replace('- Depends on:','- 代码/产物关联：')
 b=re.sub(r'^- `DONE`：.*$', '- `DONE`：附合并提交或 PR、本仓真实入口的命令/环境/输出；跨组件结果由上列统一阶段 issue 留证，不因等待统一验收保持实现 PR open。Web 本仓页面观察保留真实操作及截图。',b,flags=re.M)
 if not (key[0]=='Pepgent' and key[1] in [9,21,25,26,27,28,29]):b=b.replace('Web 本仓页面观察保留真实操作及截图。','')
 drafts[key]=b
 for d in dest:obligations.append((key,d,old))
for key,flow in E2E.items():
 b=base(issues[key]['body'])
 b=b.replace('VS2 的 server function 层核对（D8-13）','统一 e2e 阶段 S1 之后、S2 之前的 server-function 层核对（D10-06）').replace('解锁：VS2。','统一阶段执行项：E2E-21。')
 original=section(issues[key]['body'],'验收 / acceptance').split('\n\n验收执行与记录遵循')[0]
 dev='开发期编写本 issue 全部 spec、runbook 与 check 脚本并合入本仓 main；只做本仓代码检查，不要求开发期执行跨组件场景或生成 live Verdict。执行依赖只约束统一 e2e 阶段，不约束编写与提交。E2E-* 的开发期执行豁免不扩大到产品实现切片的本仓真实入口观察。'
 b=swap(b,'验收 / acceptance',dev)
 dep=section(b,'依赖关系')
 dep=re.sub(r'（依赖切片的代码已合入其仓 `main` 即可开工；仅限实际需要的代码/产物，不要求上游 runtime 通过）','（统一阶段运行所需的真实代码/产物与环境；不是开发期开工门禁）',dep)
 b=swap(b,'依赖关系','开发期无跨组件 live 前置；下列仅为统一阶段执行前置。\n\n'+dep.replace('Depends on:','统一验收前置：'))
 exec_text=f'本 issue 是统一 e2e 阶段的 {flow} 执行项，同时承接开发期测试代码交付。原验收要求“{original}”在该阶段按 D8 完整相关矩阵执行，不是只完成 spec 即产品通过；由测试者从真实入口采集权威下游结果，依 D8-11/12 归档。\n\n'
 if key==SERVER:exec_text+='完整路径：真实 Better Auth 会话 → discussion.create/discussion.prompt → Lab 写方 dial 根会话 → store 运行 → 生命周期流写 experiment_ext → lab.page.read{experiment} 返回 Ended 的 RunGraph → /api/lab/events 推送 run 变更。不作为开发期垂直波次；在 S1 完成后、S2 浏览器验收前核对。\n\n'
 if key==S2:exec_text+=f'统一 S2 组装时，由 deploy 工程师落实 [DEP-03]({url(("deploy",1))}) 的活动接入：真实 store /releases 已合入、带 boot 的完整 tar 已产出后，才把 release-init 与“init 完成后 Web 才服务”依赖接入活动 Stack。开发期代码以非活动方式合入 deploy main；PR 不为等待接入而保持 open。此接入是统一阶段的前置，不是实现门禁。\n\n'
 exec_text+='开发代码已合入不等于本执行项通过；本 issue 在相应真实执行与证据归档完成前保持 open，不把原义务再移给未来 issue。'
 if key==S2:exec_text+='浏览器路径必须登录、操作、提交、刷新及页面/接口/DB/下游核对并留截图；单接口、首页探活和容器存活不代替。'
 b=b.replace('## 依赖关系\n','## 统一 e2e 阶段承接的验收\n\n'+exec_text+'\n\n## 依赖关系\n')
 b=re.sub(r'^- `DONE`：.*$','- `DONE`：分别记录开发代码已合入与统一阶段已执行的事实；只有真实运行命令、原始结果、D8 Verdict 和 PM 归档齐备后才宣称本执行项通过。',b,flags=re.M)
 b=b.replace('- `PR`：附本 issue 对应 PR 链接；一个 PR 关闭一个 issue，正文使用 closing keyword。','- `PR`：附本 issue 的测试代码 PR 链接并标明仅交付代码；不以代码合入替代统一阶段执行或关闭本执行项。')
 drafts[key]=b
for key,flow in live.items():
 b=issues[key]['body']
 # Replace obsolete scheduling justifications rather than append contradictory instructions.
 if key==('soroi',182):
  b=b.replace('Leader 于本轮派工确认 E2E-01 可以先交付，E2E-10 真实运行独立跟踪；依赖齐备后由同一测试者执行。','本 issue 按 D10-05/06 在全部组件开发完成后的统一 S1 阶段执行；不再作为任何实现切片的前置。')
  b=b.replace('以上是已定产品能力，不是待讨论的设计结论；各切片实际 issue 创建后补链接。本任务由当前独立测试者继承，不能二次延期验证。',f'统一执行前置代码/产物：SOR-02 {link(("soroi",193))}、SOR-03 {link(("soroi",201))}、STO-05 {link(("soroi",190))}、DIST-01 {link(("soroi",199))}、A0 {link(A0)}。这些只约束统一阶段执行，不是开发期开工门禁；本执行项保留完整验证义务。')
 if key==('soroi',245):
  b=b.replace('Leader 已批准实现代码先合入，由同一独立测试者在依赖到位后执行本 issue，不能二次延期。','按 D10-05/06，驱动/spec 开发期合入，独立测试者仅在全部组件开发完成后的统一 S1 执行本 issue；本项不是任何实现切片的前置，完整义务不再延期。')
 if key==('soroi',250):
  b=b.replace('代码侧已获准先交真实 reader 和完整 evidence consumer；当前 SOR-11/12、MUX-04 与 F07 精确负例 workload 尚未全部发布。','开发期交付真实 reader、完整 evidence consumer 与自动驱动代码；统一阶段执行需要 SOR-11/12、MUX-04 与 F07 精确负例 workload。')
  b=b.replace('独立测试者负责补齐自动场景驱动，在真实用户协议上采集并验收','开发期由 e2e 工程师补齐自动场景驱动并合入 main；统一阶段由独立测试者在真实用户协议上采集并验收')
 if key==('soroi',259):
  b=b.replace('- 范围分阶段依据：leader 已授权 E2E-19 的 source PR 只关闭代码实现项；合并前必须由具名 live issue 接住全部原 S1 结果及 checkpoint，不得以 oracle 或 native reader-only 验证宣称 D8 产品通过。本 issue 是该完整承接项，不是缩减版或再次延期的容器。','- 范围与时点依据：D10-05/06；E2E-19 代码及 automatic driver 开发期合入，本 issue 在统一 S1 承接全部原 S1 结果及 checkpoint；不得以 oracle 或 native reader-only 宣称产品通过。')
  b=b.replace('该 runtime 后置条件须有证据后才能执行对应 live 验收。','统一 S1 在运行中采集该后置条件的真实证据；不要求在开发期另行 live 验收。')
  b=b.replace('本 issue 的代码 PR 只关闭本 issue；一个 PR 不得同时关闭 E2E-19。','开发期 automatic driver PR 关联本 issue 并交付代码，不以代码合入关闭本统一执行项；一个 PR 不得同时关闭 E2E-19。')
  b=b.replace('本 issue 的独立 S1 测试者，负责 automatic driver、真实执行、五行判定和 PM 证据归档','开发期 e2e 工程师负责 automatic driver 代码；本 issue 的独立 S1 测试者在统一阶段负责真实执行、五行判定和 PM 证据归档')
 if key==A0:
  b=b.replace('- 按 [leader 排期与写入权裁决](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553136037)，本 issue 与 DIST-02/PR260 共用一次完整真实 A0，由测试者独占运行写入权；verifier owner 保持 PR260 open，直至取得该次完整证据。目前尚无完整 A0 pass。','- 按 D10-05/06，DIST-02/verifier 与本 issue 的驱动代码在开发期完成并合入；实现 PR 不为等待统一 A0 保持 open。本 issue 由测试者在统一阶段首先执行完整 A0；开发期可在定制仓独立运行 A0 本仓检查，但不能替代本次统一阶段执行。')
  b=b.replace('- 五类 verifier：[PR260](https://github.com/Pepgent/soroi/pull/260) 当前仍 open；[owner 记录](https://github.com/Pepgent/soroi/pull/260#issuecomment-6553105958)只证明实际 CI tar 已完成无模型/token 的 installer→prepare smoke，不证明五类 A0。剩余义务是本 issue 与其共用的完整真实运行，而非等待一个尚不存在的 installer CLI。','- 五类 verifier 的代码来源为 [PR260](https://github.com/Pepgent/soroi/pull/260)；[既有 installer→prepare 观察](https://github.com/Pepgent/soroi/pull/260#issuecomment-6553105958)不证明完整五类 A0。代码合入后，本 issue 在统一阶段使用当次正式发行完整执行，不要求 verifier PR 等待本执行项。')
  b=b.replace('本次驱动接线以 `test/235-a0-public-launcher` 为工作入口。','驱动接线由本仓 e2e/pty 代码承担，统一执行使用已合入 main 的驱动与当次发行。')
  b=re.sub(r'^- 实际发行来自 .*$', '- 统一阶段使用当时默认分支产出的正式 CI tar，由 campaign 记录实际来源、release 名与获取路径；不固定旧 campaign 的 CI run、source 或本机 tar 路径。身份仅定位工件，不作为通过证据。',b,flags=re.M)
  b=b.replace('不另拆代码阶段与 live 阶段；只有完整 runtime 通过及清理、归档到位才能关闭，不能再次延期。','驱动与探针代码开发期合入；本统一执行项只有完整 runtime 通过及清理、归档到位才能关闭，不能再次延期。')
  b=b.replace('独立测试者拥有 `e2e/pty/*`、campaign 配置、真实 A0 执行、凭据消费、证据脱敏与最终清理；','开发期 e2e 工程师负责 `e2e/pty/*` 驱动代码；独立测试者在统一阶段负责 campaign 配置、真实 A0 执行、凭据消费、证据脱敏与最终清理；')
 b=b.replace('## 依赖关系与当前限制','## 统一验收前置与代码/产物').replace('## 依赖关系与范围边界','## 统一验收前置与范围边界').replace('## 依赖关系','## 统一验收前置').replace('## 已具备的环境与依赖','## 统一阶段使用的环境与产物')
 head=f'## 统一 e2e 阶段工作项\n\n{DECISION}\n\n本 issue 本身就是 {flow} 的统一执行承接项：{link(key)}。本项及其 full A0/live 证据不再是任何实现切片的开发前置；开发期完成 driver/spec/runbook 并合入 main，测试者只在统一阶段执行。原结果、checkpoint、真实入口和证据归档义务全部保留。统一阶段 A0 由 {link(A0)} 执行，S1 由各 E2E-* / 本项执行，随后 {link(SERVER)}，再由 {link(S2)} 完成 S2。\n\n'
 drafts[key]=head+b
for n in [13,14,15]:
 key=('PM',n);b=base(issues[key]['body'])
 b=re.sub(r'（依赖切片的代码已合入其仓 `main` 即可开工；仅限实际需要的代码/产物，不要求上游 runtime 通过）','（清单/工具编写仅需实际代码产物；最终 D9 消费统一阶段的真实证据）',b)
 b=b.replace('- Depends on:','- 输入关联：')
 b=b.replace('## 依赖关系\n','## 统一 e2e 阶段承接的验收\n\nD9 的输入清单与工具可开发期编写；最终分类、录制值比对与 F32 报告按 D10-06 在 A0、S1、E2E-21、S2 真实执行之后完成，不把 D9 或跨组件 live 作为实现切片门禁。S1 各 E2E-*（含 '+', '.join(link(k) for k in live if k!=A0)+'）和 A0 '+link(A0)+'、S2 '+link(S2)+' 的完整原始证据均按 D8-12 保留。D9-03 '+link(('PM',15))+' 收齐 F01–F31 全部分段 Verdict 后交 F32 表决，范围不减。\n\n## 依赖关系\n')
 b=re.sub(r'^- `DONE`：.*$','- `DONE`：附本仓清单/分类/报告的实际产物和复核证据；最终 D9 必须引用统一阶段的真实录制与 Verdict，D9-03 还需表决通过。',b,flags=re.M)
 # PM doc/report tasks do not run cross-component runtime as their own acceptance.
 old=section(b,'验收 / acceptance').split('\n\n验收执行与记录遵循')[0]
 b=swap(b,'验收 / acceptance',old+'\n\n本仓消费已归档证据与类型源码，观察清单、逐叶分类/值比对、报告和所需复核/表决结果；不在本仓另起组件或重复执行跨组件验收。hash/digest 不作通过证据。')
 drafts[key]=b
# Bidirectional exact source obligations; closed examples remain untouched, but their obligations are carried by open receivers.
for key,x in issues.items():
 if key in drafts:continue
 if key==('deploy',1):dest=[S2]
 elif key==('images',3):dest=[A0,S2]
 else:continue
 for d in dest:
  original=section(x['body'],'统一 e2e 阶段承接的验收') or section(x['body'],'验收 / acceptance').split('\n\n验收执行与记录遵循')[0]
  obligations.append((key,d,original))
obligations.extend([
 (('images',6),A0,'IMG-04 原验收中的跨组件部分——真实部署入口 `bun /release/install.ts --home /home/agent` 后 exec Node、浏览器真实登录与刷新保持会话、无会话拒绝、同容器 omp 工具清单含 `soroi_eval`/`soroi_task` 并可调用——不在开发期执行，由全部组件开发完成后的统一 e2e 阶段（A0 与 S2）执行并留证。范围不缩减；parent #3 在该阶段验证后关闭。'),
 (('images',6),S2,'IMG-04 原验收中的跨组件部分——真实部署入口 `bun /release/install.ts --home /home/agent` 后 exec Node、浏览器真实登录与刷新保持会话、无会话拒绝、同容器 omp 工具清单含 `soroi_eval`/`soroi_task` 并可调用——不在开发期执行，由全部组件开发完成后的统一 e2e 阶段（A0 与 S2）执行并留证。范围不缩减；parent #3 在该阶段验证后关闭。'),
 (('deploy',8),S2,'真实浏览器路径——Yab `/sign-in` 邮箱密码登录→进入 Lab→刷新后 `/api/auth/get-session` 仍有效、无会话访问 Lab 被拒绝、重复部署后登录会话仍有效——属于跨组件（deploy + Pepgent + images）验收，不在开发期执行，由全部组件开发完成后的统一 e2e 阶段（S2）执行并留证，写回 parent [images #3](https://github.com/Pepgent/images/issues/3)。范围不缩减。'),
])
for d in list(drafts):
 rows=[(s,old) for s,receiver,old in obligations if receiver==d]
 if not rows:continue
 text='\n\n## 承接来源与原验收义务\n\n下列各项由本统一阶段执行项完整承接；原文为范围快照，不恢复开发期门禁。涉及 hash/digest 的值只用于对象寻址或组装身份，禁止以比对作为任何通过证据。多个承接项覆盖同一来源时，各自执行本阶段适用部分，合计覆盖全部原义务，不相互替代。\n\n'
 for s,old in rows:
  text+=f'### 来源 {link(s)}\n\n原义务原文：\n\n> '+old.replace('\n','\n> ')+'\n\n'
  if old=='同上':
   text+='本处“同上”对应 [D8 WEB-03–06 原始行](https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L356-L359)，沿用的验收全文为：纯函数投影的单元测试，输入是真实录制的线数据；录制中含 `Aborted` 变体的调用（不带 `version`、`body`、`env`，`outputs = []`），投影出被中止的节点（PM#5 第 2 项）。统一阶段按各自页面责任范围核对真实录制、投影与下游结果，不仅检查渲染。\n\n'
 drafts[d]+=text
(ROOT/'drafts').mkdir(exist_ok=True)
manifest=[]
for key,b in drafts.items():
 b=b.replace('https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L','https://github.com/Pepgent/PM/blob/91dd67e059a14e85195ee67ba741a2ba67fde03e/evidence/decisions/D8-mvp-scope.md#L')
 p=ROOT/'drafts'/f'{key[0]}-{key[1]}.md';p.write_text(b.rstrip()+'\n')
 manifest.append({'repo':key[0],'number':key[1],'url':url(key),'path':str(p),'receivers':[url(d) for d in receivers.get(key,[])],'kind':'live' if key in live else 'e2e' if key in E2E else 'D9' if key[0]=='PM' else 'implementation'})
(ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(ROOT/'obligations.json').write_text(json.dumps([{'source':url(s),'receiver':url(d),'original':o} for s,d,o in obligations],ensure_ascii=False,indent=2))
print(json.dumps({'draft_count':len(drafts),'obligation_transfers':len(obligations),'by_repo':{r:sum(k[0]==r for k in drafts) for r in repos}},ensure_ascii=False))
