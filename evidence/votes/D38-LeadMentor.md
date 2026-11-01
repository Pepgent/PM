# D38 选票：LeadMentor

议程：Pepgent#28 WEB-06：默认集群无源、首页 Lab 活动词表、镜像与模板的关联键（[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D38-01 v1：赞成（LeadMentor-2，2026-11-01T21:05:07.365Z）


**分类意见：** 串联

# D38 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/57
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D38-01 v1、D38-02 v1、D38-03 v1。

| 条目 | 票 | 分类 |
|---|---|---|
| D38-01 v1 | 赞成 | 串联 |
| D38-02 v1 | 赞成 | 串联 |
| D38-03 v1 | 赞成 | 串联 |

## D38-01：默认标记没有 Lab 级事实来源

D7-12 把集群定义为 remote 模板所指后端端点，D12 的 TemplateMetadata.resources 只有每模板自身的 primaryCluster/boundClusters，没有 Lab 的默认集群选择。不能把模板的 primaryCluster、任一排列首项或演示数据提升成 Lab 默认事实。null 表达未提供这一事实，比 false 所表达的“明确不是默认”精确。

D12 现行无来源字段表尚未列 isDefault，本行通过正式决策修改 D12/D8、加入 D9 输入，避免协调席借接口缺项擅自缩减。已读字段和两个实际消费者：client/contracts/lab-compute.ts:25-38，clusters-page.tsx:63、589-591；已有布尔条件在 null 时不显示标记，白名单内类型/投影调整足够，无需改 UI。集群身份、作业归组和既有可用读取不受此标记缺源牵连。本席未见默认标记属于已定必经流程的具体反例，支持此明确取舍，不扩大 remote 为 Lab 选择配置系统。

## D38-02：Lab 创建自己的活动事实，跨线使用同一命令词表

D7-02 已要求 Lab 持久化成员、结论确认、节点合入活动，同时明确运行开始/结束是从 store 读取的事实，不再写另一份运行活动记录。本行给 Lab 自有三族事件一个生产者、成功记录时点、actor/project/text，以及 home/settings 两个读面；复用正式命令名，不另造一套同义事件名，写方和投影方能够依同一词表消费。

已读 HomeEvent 的 category/glyph/action.dialog 必填类型。结论→experiments/literature/results，合入→data/database/sources，在原视图种类内给出确定映射；成员事件不伪装成实验或数据，仍存为 Lab 自有活动、出线，但首页不渲染。实验生命周期和里程碑继续按原源头投影，不在本行被移除。

接受成员事件第一版不显示在首页、CTA 仅打开既有本地弹窗而非跳转具体领域对象的明确成本。正文已明示而非暗中丢弃 target；不把通用本地弹窗宣称成已定位到特定结论或特定合入。具体活动创建仍须等其命令拥有方成功后记录，不以按钮点击、请求入队或就近的假事件充当完成。

## D38-03：按发布 repository 建立定义与模板的单向关联

D7-13 已要求从“用这个镜像的模板”计算节点绑定、资源和在跑作业，但没有给关联键。v1 明确 name 是发布 repository 路径，模板 OCI 引用去 digest、tag、registry 后与之精确相等；这定义的是本版 repository 级归组，不声称不同 tag/registry 的运行字节完全相同，也不以该字符串比较作为镜像运行成功证据。

对于正文主路径发布形态 registry:port/pepgent/omp-agent:tag，先在最后一个斜杠后移除 tag，再移除 registry 段，能保留 pepgent/omp-agent；规则不会把 registry 的端口当 tag。此为规则的静态推导，未执行 hash、镜像拉取或仓库验证。

支持 P15 从 images 检出导出自身发布路径的既有占位，不让 images 反向知道 remote 目录或维护模板清单；W-09 输出定义、W-10 消费关联，依赖方向正确。多模板时按 name 排序取首个模板的资源/挂载，并汇总 primaryCluster 去重，是正文公开的单值视图取舍，不宣称为全部模板配置。nodeBindingCount 数节点函数而不是模板数量；liveContainers 沿用 D7-12/13“正在跑”的原义，本行匹配模板给出镜像归属，不把正常结束或 removed 的历史作业据此重新定义成 live。JobWire.status/RemoteRunSummary.lifecycle 的既有状态来源不变。

## 核对与范围

先消费 digest #331，读取当前正式议程及完整初审材料，daemon row 源头确认三行均 v1；核对 D7-02/12/13、D12 TemplateMetadata/JobWire/ImageDefinition 与无来源字段表、现有 HomeEvent/ClusterRecord/ResourceDefaults 及默认标记消费者、remote 生命周期/状态精确类型。初审材料内其他 agent 的命令报告仍属其源头报告，本席未重跑或据此声称工程实现缺失已独立取证。

三行均有新的公开语义或范围取舍，并非要求重投用户直接指令。没有新反对反例、专责否决、额外同步验收锁或 D1-17 终局分类仲裁。其他不依赖本表的纯投影照常推进；通过后的契约、生产者、消费者与文档回写仍须真正落实。

未改工程代码/配置，未运行测试、构建、浏览器/UI 或 runtime，未使用 hash 验证。以上是静态契约和主路径审议，不宣称工程或整项议程已完成；发布归档交 daemon。


## D38-02 v1：赞成（LeadMentor-2，2026-11-01T21:05:07.365Z）——作废：该行已修订到 v2


**分类意见：** 串联

# D38 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/57
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D38-01 v1、D38-02 v1、D38-03 v1。

| 条目 | 票 | 分类 |
|---|---|---|
| D38-01 v1 | 赞成 | 串联 |
| D38-02 v1 | 赞成 | 串联 |
| D38-03 v1 | 赞成 | 串联 |

## D38-01：默认标记没有 Lab 级事实来源

D7-12 把集群定义为 remote 模板所指后端端点，D12 的 TemplateMetadata.resources 只有每模板自身的 primaryCluster/boundClusters，没有 Lab 的默认集群选择。不能把模板的 primaryCluster、任一排列首项或演示数据提升成 Lab 默认事实。null 表达未提供这一事实，比 false 所表达的“明确不是默认”精确。

D12 现行无来源字段表尚未列 isDefault，本行通过正式决策修改 D12/D8、加入 D9 输入，避免协调席借接口缺项擅自缩减。已读字段和两个实际消费者：client/contracts/lab-compute.ts:25-38，clusters-page.tsx:63、589-591；已有布尔条件在 null 时不显示标记，白名单内类型/投影调整足够，无需改 UI。集群身份、作业归组和既有可用读取不受此标记缺源牵连。本席未见默认标记属于已定必经流程的具体反例，支持此明确取舍，不扩大 remote 为 Lab 选择配置系统。

## D38-02：Lab 创建自己的活动事实，跨线使用同一命令词表

D7-02 已要求 Lab 持久化成员、结论确认、节点合入活动，同时明确运行开始/结束是从 store 读取的事实，不再写另一份运行活动记录。本行给 Lab 自有三族事件一个生产者、成功记录时点、actor/project/text，以及 home/settings 两个读面；复用正式命令名，不另造一套同义事件名，写方和投影方能够依同一词表消费。

已读 HomeEvent 的 category/glyph/action.dialog 必填类型。结论→experiments/literature/results，合入→data/database/sources，在原视图种类内给出确定映射；成员事件不伪装成实验或数据，仍存为 Lab 自有活动、出线，但首页不渲染。实验生命周期和里程碑继续按原源头投影，不在本行被移除。

接受成员事件第一版不显示在首页、CTA 仅打开既有本地弹窗而非跳转具体领域对象的明确成本。正文已明示而非暗中丢弃 target；不把通用本地弹窗宣称成已定位到特定结论或特定合入。具体活动创建仍须等其命令拥有方成功后记录，不以按钮点击、请求入队或就近的假事件充当完成。

## D38-03：按发布 repository 建立定义与模板的单向关联

D7-13 已要求从“用这个镜像的模板”计算节点绑定、资源和在跑作业，但没有给关联键。v1 明确 name 是发布 repository 路径，模板 OCI 引用去 digest、tag、registry 后与之精确相等；这定义的是本版 repository 级归组，不声称不同 tag/registry 的运行字节完全相同，也不以该字符串比较作为镜像运行成功证据。

对于正文主路径发布形态 registry:port/pepgent/omp-agent:tag，先在最后一个斜杠后移除 tag，再移除 registry 段，能保留 pepgent/omp-agent；规则不会把 registry 的端口当 tag。此为规则的静态推导，未执行 hash、镜像拉取或仓库验证。

支持 P15 从 images 检出导出自身发布路径的既有占位，不让 images 反向知道 remote 目录或维护模板清单；W-09 输出定义、W-10 消费关联，依赖方向正确。多模板时按 name 排序取首个模板的资源/挂载，并汇总 primaryCluster 去重，是正文公开的单值视图取舍，不宣称为全部模板配置。nodeBindingCount 数节点函数而不是模板数量；liveContainers 沿用 D7-12/13“正在跑”的原义，本行匹配模板给出镜像归属，不把正常结束或 removed 的历史作业据此重新定义成 live。JobWire.status/RemoteRunSummary.lifecycle 的既有状态来源不变。

## 核对与范围

先消费 digest #331，读取当前正式议程及完整初审材料，daemon row 源头确认三行均 v1；核对 D7-02/12/13、D12 TemplateMetadata/JobWire/ImageDefinition 与无来源字段表、现有 HomeEvent/ClusterRecord/ResourceDefaults 及默认标记消费者、remote 生命周期/状态精确类型。初审材料内其他 agent 的命令报告仍属其源头报告，本席未重跑或据此声称工程实现缺失已独立取证。

三行均有新的公开语义或范围取舍，并非要求重投用户直接指令。没有新反对反例、专责否决、额外同步验收锁或 D1-17 终局分类仲裁。其他不依赖本表的纯投影照常推进；通过后的契约、生产者、消费者与文档回写仍须真正落实。

未改工程代码/配置，未运行测试、构建、浏览器/UI 或 runtime，未使用 hash 验证。以上是静态契约和主路径审议，不宣称工程或整项议程已完成；发布归档交 daemon。


## D38-03 v1：赞成（LeadMentor-2，2026-11-01T21:05:07.365Z）


**分类意见：** 串联

# D38 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/57
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D38-01 v1、D38-02 v1、D38-03 v1。

| 条目 | 票 | 分类 |
|---|---|---|
| D38-01 v1 | 赞成 | 串联 |
| D38-02 v1 | 赞成 | 串联 |
| D38-03 v1 | 赞成 | 串联 |

## D38-01：默认标记没有 Lab 级事实来源

D7-12 把集群定义为 remote 模板所指后端端点，D12 的 TemplateMetadata.resources 只有每模板自身的 primaryCluster/boundClusters，没有 Lab 的默认集群选择。不能把模板的 primaryCluster、任一排列首项或演示数据提升成 Lab 默认事实。null 表达未提供这一事实，比 false 所表达的“明确不是默认”精确。

D12 现行无来源字段表尚未列 isDefault，本行通过正式决策修改 D12/D8、加入 D9 输入，避免协调席借接口缺项擅自缩减。已读字段和两个实际消费者：client/contracts/lab-compute.ts:25-38，clusters-page.tsx:63、589-591；已有布尔条件在 null 时不显示标记，白名单内类型/投影调整足够，无需改 UI。集群身份、作业归组和既有可用读取不受此标记缺源牵连。本席未见默认标记属于已定必经流程的具体反例，支持此明确取舍，不扩大 remote 为 Lab 选择配置系统。

## D38-02：Lab 创建自己的活动事实，跨线使用同一命令词表

D7-02 已要求 Lab 持久化成员、结论确认、节点合入活动，同时明确运行开始/结束是从 store 读取的事实，不再写另一份运行活动记录。本行给 Lab 自有三族事件一个生产者、成功记录时点、actor/project/text，以及 home/settings 两个读面；复用正式命令名，不另造一套同义事件名，写方和投影方能够依同一词表消费。

已读 HomeEvent 的 category/glyph/action.dialog 必填类型。结论→experiments/literature/results，合入→data/database/sources，在原视图种类内给出确定映射；成员事件不伪装成实验或数据，仍存为 Lab 自有活动、出线，但首页不渲染。实验生命周期和里程碑继续按原源头投影，不在本行被移除。

接受成员事件第一版不显示在首页、CTA 仅打开既有本地弹窗而非跳转具体领域对象的明确成本。正文已明示而非暗中丢弃 target；不把通用本地弹窗宣称成已定位到特定结论或特定合入。具体活动创建仍须等其命令拥有方成功后记录，不以按钮点击、请求入队或就近的假事件充当完成。

## D38-03：按发布 repository 建立定义与模板的单向关联

D7-13 已要求从“用这个镜像的模板”计算节点绑定、资源和在跑作业，但没有给关联键。v1 明确 name 是发布 repository 路径，模板 OCI 引用去 digest、tag、registry 后与之精确相等；这定义的是本版 repository 级归组，不声称不同 tag/registry 的运行字节完全相同，也不以该字符串比较作为镜像运行成功证据。

对于正文主路径发布形态 registry:port/pepgent/omp-agent:tag，先在最后一个斜杠后移除 tag，再移除 registry 段，能保留 pepgent/omp-agent；规则不会把 registry 的端口当 tag。此为规则的静态推导，未执行 hash、镜像拉取或仓库验证。

支持 P15 从 images 检出导出自身发布路径的既有占位，不让 images 反向知道 remote 目录或维护模板清单；W-09 输出定义、W-10 消费关联，依赖方向正确。多模板时按 name 排序取首个模板的资源/挂载，并汇总 primaryCluster 去重，是正文公开的单值视图取舍，不宣称为全部模板配置。nodeBindingCount 数节点函数而不是模板数量；liveContainers 沿用 D7-12/13“正在跑”的原义，本行匹配模板给出镜像归属，不把正常结束或 removed 的历史作业据此重新定义成 live。JobWire.status/RemoteRunSummary.lifecycle 的既有状态来源不变。

## 核对与范围

先消费 digest #331，读取当前正式议程及完整初审材料，daemon row 源头确认三行均 v1；核对 D7-02/12/13、D12 TemplateMetadata/JobWire/ImageDefinition 与无来源字段表、现有 HomeEvent/ClusterRecord/ResourceDefaults 及默认标记消费者、remote 生命周期/状态精确类型。初审材料内其他 agent 的命令报告仍属其源头报告，本席未重跑或据此声称工程实现缺失已独立取证。

三行均有新的公开语义或范围取舍，并非要求重投用户直接指令。没有新反对反例、专责否决、额外同步验收锁或 D1-17 终局分类仲裁。其他不依赖本表的纯投影照常推进；通过后的契约、生产者、消费者与文档回写仍须真正落实。

未改工程代码/配置，未运行测试、构建、浏览器/UI 或 runtime，未使用 hash 验证。以上是静态契约和主路径审议，不宣称工程或整项议程已完成；发布归档交 daemon。


## D38-02 v2：赞成（LeadMentor-2，2026-11-01T21:19:39.983Z）


**分类意见：** 串联

# D38-02 v2 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/57
席位：LeadMentor；在席实例：LeadMentor-2。
对象：仅 D38-02 v2。票：赞成。分类：串联。

## 独立理由

v2 把“节点合入”从只含 library.merge 扩全为 library.merge、library.apply、agentTemplate.saveVersion，kind 仍逐项使用实际入口命令名。已直接核对现有 protocol/lab/command.ts:74-75、110-112、152、174-179，三种入口均有正式命令和提交结果；D7-11 已规定 apply/saveVersion 走同一路 merge。成功入口均产生活动，settings.repoActivity 与首页均穷尽消费该族，避免 nodes 页的正式合入或智能体模板版本保存静默缺席。

v2 同时明确讨论项目、Panel 项目为 null、摘要取成功结果 paths，并在 D12-17 的 library 频道加入 home 失效；W-10 对应客户端集合也加 home。已读现行 D12-17 全行，library 原来没有 home；因此新增活动后首页重读是实际消费链闭合，不是仅增加数据库/线字段却仍展示旧首页。成员与结论依原 catalog 通道，不改 store 生命周期的归属。

合入族弹窗由 sources 改 dataset。已读既有 home fixture：sources 标题为“文献”，与节点合入不符；dataset 与既有 data/database 配对。接受本版借用数据集弹窗、没有专属合入详情或领域跳转的明确成本，但这不授权保留 fixture 的演示文件、论文或运行结果作为真实事实。当前只审查弹窗种类与入口契约，不宣称真实页面数据已经接好。

## 与旧票的关系

本席 v1 赞成理由未识别三个合入入口的遗漏、library 到 home 的失效缺口和 sources 的实际标题。v2 明确修正这些问题，旧票不能当作原方案链路已正确的证明；原投票记录不回写。成员事件只出线而不进入首页、结论事件映射及本地弹窗边界继续沿用正文，不另建通用活动框架或新 wire 形状。

先消费新请求 #357 并读取 daemon 当前行完整 what/where/how/tradeoff，核对上述直接来源。本次无反对反例、专责否决、终局分类仲裁或额外同步验收锁。D40 首投被 daemon 按优先队列拒绝，未记录；先处理本行后再续办 D40，不绕队列。

未改工程代码/配置，未运行测试、构建、UI/浏览器或runtime，未使用hash验证。本票不代表工程落实，发布归档交 daemon。

