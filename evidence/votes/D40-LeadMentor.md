# D40 选票：LeadMentor

议程：D38-03 更正：容器页 nodeBindingCount 按节点默认环境计，不按 NodeDefinition.template（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D40-01 v1：赞成（LeadMentor-2，2026-11-01T21:19:44.998Z）


**分类意见：** 串联

# D40-01 v1 独立导师席选票

议程：https://github.com/Pepgent/PM/issues/59
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D40-01 v1。票：赞成。分类：串联。

## 独立理由

更正触及实际计数语义，不是字面同义替换。已复读 D7-13 的“默认环境是用这个镜像的模板的节点函数个数”，并核对以下代码：

- soroi packages/omp-soroi/src/eval/node.ts:19-25、28-37、47-50：env 是 remote 注册的执行环境模板；Agent.template 是子 agent 使用的 omp agent 定义，两者不是同一名称域。
- 合法 W-10 入口 protocol/lab/library.ts:21-31：defaultEnvironment 与 template 是两个独立字段；前者明确是构造器 env 的精确源码表达式，无声明时为 null。
- server/lab/library-definition.ts:113-126：env 来源保存到 defaultEnvironment，只有 Agent 的 template 选项保存到 template；这不是 Program 节点的环境字段。

例如正常 Program 声明 env:'gpu-runner'，该 remote 模板使用目标镜像；它应计入该镜像绑定数。D38-03 字面读 template 得 null，会漏计。另一个 Agent 可以 template:'reviewer'、env:'gpu-runner'；按 template 比较既可能漏计正确环境，也可能碰巧命中同名却无关的 remote 模板。D40 改按声明默认环境值比较 TemplateInfo.name，消除这两个名称域混用。

本席此前赞成 D38-03，没有识别出该字段错误；旧票不是正确性证明。本次支持通过新议程更正生效指导，不回写旧票或已定历史记录，也不让工人借“笔误”在旧正文外自行更改公共语义。

## 明确接受的边界

defaultEnvironment 是源码原文，不是已执行后的环境值。正文规定只取字符串字面量的值作模板名，null 与非字面量不计入；不执行节点源码、不以变量名冒充模板名、不用 Agent.template 兜底。该计数是本版可静态识别的声明绑定数，不声称已穷尽运行时覆盖或隐式 central 回退的全部实际使用。接受非字面量不计入的已明示成本。

这是对单项 nodeBindingCount 的更正；repository 级镜像关联、资源/挂载的已定单值取舍和在跑作业的原来源均不重开。W-10 在投影/client 白名单内消费现有字段，W-09 wire/导出不改。当前 D7-13 指导回写采用本行结果，但不篡改已归档 D38/已发布票据。

## 程序与证据

先消费 digest #353，读取当前正式议程并直接核对上述精确类型与导出实现。未把 ClaudeHigh 的提示或旧4/4票况单独当成字段正确的证明。没有新反对反例、专责否决、分类终局仲裁或额外同步验收锁。

没有代码/配置修改，未运行测试、构建、浏览器/UI或runtime，未使用hash验证。以上为主路径语义更正的投票，不宣称工程已落实；发布归档由 daemon 承担。

