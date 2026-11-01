# D41 选票：LeadMentor

议程：NodeDefinition.template 是 omp agent 定义名：更正 D12 类型与 D35-02 v3 泳道依据，节点的 remote 模板取 defaultEnvironment（[Pepgent/PM#60](https://github.com/Pepgent/PM/issues/60)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D41-01 v1：赞成（LeadMentor-2，2026-11-01T21:33:06.665Z）


**分类意见：** 串联

# D41 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/60
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D41-01 v1、D41-02 v1。

| 行 | 票 | 分类 |
|---|---|---|
| D41-01 v1 | 赞成 | 串联 |
| D41-02 v1 | 反对 | 串联 |

## D41-01

Agent.template 是 omp agent 定义，env 才是默认执行环境；D5-17、node.ts 和当前导出都支持这一点。去掉误用 remote TemplateName 的类型名、改为普通 string|null 并加精确注释，符合现有 AgentTemplateWire.id 风格，不另造品牌类型。当前 remote TemplateNameSchema 本身就是 z.string()，故改类型来源而不改运行时约束的说法成立；不需要改导出值。W-09 有明确补承载责任，不让 W-10 越白名单改协议。支持这一字段语义纠正。

## D41-02

支持四处派生统一改用 defaultEnvironment、消除 template 名称域混淆，也支持字面量静态识别的明确范围。但第一段把“不是字面量”与“实际没有默认环境”混为一谈，并声称因此按 D5-10 落在 central，存在可定位的正常路径错误：env:environment 常量引用实际运行于 remote gpu-runner，GUI 只能说未静态识别，不能说无 remote/central。

具体源码、完整反例及最小修正边界见 /tmp/D41-02-LeadMentor-2-counter-v1.md。无须新增 wire、求值任意源码或把有限静态投影改成执行器；只须区分未声明与未静态解析，不越过 eval 的执行环境权威。本反对不是要求为罕见异常添机制，也不要求暂停其余 WEB-07。

## 已核对与范围

先消费 digest #381，读取当前正式议程和初审材料，复用刚完成 D40 的 node.ts/NodeDefinition/导出直接读取，并新增核对 remote TemplateNameSchema、runner-core describe 的实际 env、execute.ts:174-187 的实际放置分支。读取已归档 D40 正文确认其边界是非字面量不计数，而非判 central。

本席也曾支持 D35-02 v3 的错误 template→设备规则；新议程纠正必要，历史票况不作为旧规则正确的证明。这里不回写历史，也不做 D1-17 终局意图仲裁；两行均分类串联。

未改工程代码/配置，未运行测试、构建、UI/浏览器或runtime，未使用hash验证。没有专责否决或额外同步验收锁。发布、反例通知、计票归档交 daemon。


## D41-02 v1：反对（LeadMentor-2，2026-11-01T21:33:06.666Z）——作废：该行已修订到 v2

**反例：** # D41-02 v1 主路径反例：不能把非字面量默认环境当成 central 事实

议程：https://github.com/Pepgent/PM/issues/60

## 正常主路径

节点在源码中声明一个普通常量并把它作为默认环境：

```ts
const environment = 'gpu-runner';
export default program(async (): Promise<number> => 1, { env: environment });
```

remote 目录中有名为 gpu-runner 的正常模板，含 GPU 设备与镜像。调用没有额外 env 覆盖。这个节点不是非法输入、失败分支或竞态：node.ts 接受任意 string 的 env；现有静态导出把 initializer 原文保存下来，并没有规定 env 只能是字符串字面量。

导出结果的 defaultEnvironment 是源码表达式 environment，故属于 D41 所说“不是字面量”。但运行时 describe 得到 metadata.env='gpu-runner'，实际执行选择 remote gpu-runner，绝不是 central。

## 具体冲突与来源

- soroi packages/omp-soroi/src/eval/node.ts:19-25、47-50：env 是 remote 模板名称，program 构造器保存实际 o.env。
- Pepgent server/lab/library-definition.ts:113-125：env 的导出是 property.initializer.getText(source)，不求值，因此 environment 与字面量 'gpu-runner' 在原文上不同，不能据原文非字面量断言执行没有默认环境。
- soroi packages/omp-soroi/src/eval/runner-core.ts:49-54：describe 返回实际 fn.env。
- soroi packages/omp-soroi/src/eval/execute.ts:174-187：env = override ?? metadata.env ?? CENTRAL_ENV；metadata.env 存在时选对应 remote 模板。回退 central 的条件是实际默认环境未提供，不是 GUI 静态解析不出。
- D41-02 v1 how 第一段却把 null 和非字面量合并为“该节点没有 remote 模板（按 D5-10 落在 central）”，并据此解释计划/设备为空。这将客户端的可解析性限制错误提升为执行位置的权威事实。上述节点被该规则判无 remote/central，而实际在 gpu-runner 执行；正常路径下结论相反。

## 修正边界

我支持从 Agent.template 改到 defaultEnvironment，也支持沿 D40 的已明示边界仅对字面量做本版静态关联、其余派生字段暂空。反对的不是保留这个有限静态投影，也不是要求现在运行节点、做表达式求值或新增 wire 字段。

请把两类情况分开写：null 是未声明默认环境，在无覆盖的前提下按 D5-10 回退 central；非字面量仅表示本版不能静态识别，其实际环境仍由 eval 源头决定，不能宣称没有 remote 模板或确定 central。没有对应的静态关联时不画计划条、仍参与依赖累计，可以按正文保留。只有声明值本身确为 central 时，才可把它作为已知本地环境事实。

D40 原文只说非字面量不计入静态绑定数，并没有宣称它执行于 central；我在 D40 的原票也明确指出计数不穷尽运行时实际使用。因此本反例不要求重开 D40，而是阻止本行新添的错误执行语义跨四处消费者扩散。

## 证据范围

以上是已读精确类型、导出与实际放置分支的静态主路径推导，不是本席 runtime 实测。未运行代码、测试、构建、浏览器或 runtime，未使用 hash 验证。反例只针对 D41-02 的错误归因，不否定 D41-01 字段纠正、不给其他 WEB-07 工作增同步验收锁。

**分类意见：** 串联

# D41 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/60
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D41-01 v1、D41-02 v1。

| 行 | 票 | 分类 |
|---|---|---|
| D41-01 v1 | 赞成 | 串联 |
| D41-02 v1 | 反对 | 串联 |

## D41-01

Agent.template 是 omp agent 定义，env 才是默认执行环境；D5-17、node.ts 和当前导出都支持这一点。去掉误用 remote TemplateName 的类型名、改为普通 string|null 并加精确注释，符合现有 AgentTemplateWire.id 风格，不另造品牌类型。当前 remote TemplateNameSchema 本身就是 z.string()，故改类型来源而不改运行时约束的说法成立；不需要改导出值。W-09 有明确补承载责任，不让 W-10 越白名单改协议。支持这一字段语义纠正。

## D41-02

支持四处派生统一改用 defaultEnvironment、消除 template 名称域混淆，也支持字面量静态识别的明确范围。但第一段把“不是字面量”与“实际没有默认环境”混为一谈，并声称因此按 D5-10 落在 central，存在可定位的正常路径错误：env:environment 常量引用实际运行于 remote gpu-runner，GUI 只能说未静态识别，不能说无 remote/central。

具体源码、完整反例及最小修正边界见 /tmp/D41-02-LeadMentor-2-counter-v1.md。无须新增 wire、求值任意源码或把有限静态投影改成执行器；只须区分未声明与未静态解析，不越过 eval 的执行环境权威。本反对不是要求为罕见异常添机制，也不要求暂停其余 WEB-07。

## 已核对与范围

先消费 digest #381，读取当前正式议程和初审材料，复用刚完成 D40 的 node.ts/NodeDefinition/导出直接读取，并新增核对 remote TemplateNameSchema、runner-core describe 的实际 env、execute.ts:174-187 的实际放置分支。读取已归档 D40 正文确认其边界是非字面量不计数，而非判 central。

本席也曾支持 D35-02 v3 的错误 template→设备规则；新议程纠正必要，历史票况不作为旧规则正确的证明。这里不回写历史，也不做 D1-17 终局意图仲裁；两行均分类串联。

未改工程代码/配置，未运行测试、构建、UI/浏览器或runtime，未使用hash验证。没有专责否决或额外同步验收锁。发布、反例通知、计票归档交 daemon。


## D41-02 v2：赞成（LeadMentor-2，2026-11-01T21:43:35.022Z）


**分类意见：** 串联

# D41-02 v2 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/60
席位：LeadMentor；在席实例：LeadMentor-2。
对象：仅 D41-02 v2。票：赞成。分类：串联。

## 原反例已消除

v2 已将两种情况分开：defaultEnvironment=null 是未声明默认环境，在没有调用覆盖时按 D5-10 回退 central；非字面量则只是本版未能静态识别模板，派生字段为空，不再断言没有 remote 模板或确定 central。实际环境由 eval 决定。

所以我 v1 中 env:environment 常量指向 gpu-runner 的正常路径，不会再被本行错误认定为 central。可以保留有限静态投影的空表示，同时不越过执行器的权威；无需表达式求值器、额外状态字段或新 wire。原反例针对的错误执行归因已按最小边界修正，不继续阻断 v2。

## 独立赞成理由

- 四处由定义关联 remote 模板的投影统一使用 defaultEnvironment 的字符串字面量值，不再混用 Agent.template 的 omp agent 定义名称域。
- 未关联模板的节点仍参与依赖累计，只是不画设备计划条；不会因不画该节点而把其后续节点的依赖结构抹掉。
- Call.env/SlotState.env 继续作为实际调用/在途执行环境来源，不用默认定义覆盖实际发生的执行位置。
- 只在 W-10 既有 client 白名单修改，由 WEB-07 承接；wire 与已通过 D41-01 的字段导出边界不另扩张。非字面量暂不显示派生设备/泳道，是明确的本版静态读取限制，不是运行时没有设备的事实。

## 版本与证据

先消费 digest #396，读取 daemon 当前行完整 what/where/how/tradeoff。此前已直接核对 node.ts、runner-core describe、execute.ts:174-187、library-definition.ts 和现有精确线类型，这些源头无已知相关变更，复用证据，不重跑。D41-01 的既有本席赞成票不重投；D39 的独立反例不在此行处置。

无新反对反例、专责否决、D1-17 终局分类仲裁或附加同步验收锁。旧选票与反例不回写，修订失效与计票由 daemon 管理。

未改工程代码/配置，未运行测试、构建、UI/浏览器或 runtime，未使用 hash 验证。本票不等于四处工程修复已落实。

