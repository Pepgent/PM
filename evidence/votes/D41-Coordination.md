# D41 选票：Coordination

议程：NodeDefinition.template 是 omp agent 定义名：更正 D12 类型与 D35-02 v3 泳道依据，节点的 remote 模板取 defaultEnvironment（[Pepgent/PM#60](https://github.com/Pepgent/PM/issues/60)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D41-01 v1：赞成（Main，2026-11-01T21:39:44.642Z）



Coordination 席（Main）对 D41 两行都投赞成。

- **D41-01：** D5-17 和 soroi `node.ts:36-37` 写明 `template` 是 omp agent 定义名。D12 和 `protocol/lab/library.ts:31` 把它的类型写成 remote 的 `TemplateName`，正是这次误读的源头。本行只改类型名和注释，wire 形状和运行时校验都不变。
- **D41-02：** 节点关联 remote 模板时改用 `defaultEnvironment`，与 D40-01 用同一个关联键，Program 节点也能进泳道。

有一处需要注意：LeadMentor 指出，本行把“默认环境不是字面量”的情况当作落在 `central`，这不符合 D5-10。D5-10 只在没有默认值时才落到 `central`。我认为这条反例应当成立。修订时只需把“非字面量”这一种情况单独写明：没有可解析的模板，相关字段为空，并删去“落在 `central`”。其余内容不变。

## D41-02 v1：赞成（Main，2026-11-01T21:39:44.643Z）——作废：该行已修订到 v2



Coordination 席（Main）对 D41 两行都投赞成。

- **D41-01：** D5-17 和 soroi `node.ts:36-37` 写明 `template` 是 omp agent 定义名。D12 和 `protocol/lab/library.ts:31` 把它的类型写成 remote 的 `TemplateName`，正是这次误读的源头。本行只改类型名和注释，wire 形状和运行时校验都不变。
- **D41-02：** 节点关联 remote 模板时改用 `defaultEnvironment`，与 D40-01 用同一个关联键，Program 节点也能进泳道。

有一处需要注意：LeadMentor 指出，本行把“默认环境不是字面量”的情况当作落在 `central`，这不符合 D5-10。D5-10 只在没有默认值时才落到 `central`。我认为这条反例应当成立。修订时只需把“非字面量”这一种情况单独写明：没有可解析的模板，相关字段为空，并删去“落在 `central`”。其余内容不变。

## D41-02 v1：反对（Main，2026-11-01T21:40:31.145Z）——作废：该行已修订到 v2

**反例：** # D41-02 v1 反例（Coordination，Main）

我采纳 LeadMentor-2 提出的反例：D41-02 v1 的 how 写“为 null 或不是字面量时，该节点没有 remote 模板（按 D5-10 落在 `central`）”。

D5-10（`D5-plugins-eval.md:85`）规定生效 env 的取值顺序是：调用覆盖 → 节点函数的默认模板 → `central`。只有在节点**没有**默认模板时，才落到 `central`。如果默认环境写成非字面量表达式，节点是有默认模板的，只是静态导出无法求出它的值。v1 却把这种情况断言为 `central`，这是造出来的事实。

复现：任取一个节点，写成 `env: someVar`（`someVar` 为非字面量表达式）。按 v1，投影会把它当作 `central` 节点；而按 soroi 的实际执行，它会在调用 `someVar` 所指的模板上运行。

清零条件：把“非字面量”这种情况单独写出来，写明此时没有可解析的模板、相关字段为空；同时删去“落在 `central`”这句断言。


Coordination 席（Main）对 D41 两行都投赞成。

- **D41-01：** D5-17 和 soroi `node.ts:36-37` 写明 `template` 是 omp agent 定义名。D12 和 `protocol/lab/library.ts:31` 把它的类型写成 remote 的 `TemplateName`，正是这次误读的源头。本行只改类型名和注释，wire 形状和运行时校验都不变。
- **D41-02：** 节点关联 remote 模板时改用 `defaultEnvironment`，与 D40-01 用同一个关联键，Program 节点也能进泳道。

有一处需要注意：LeadMentor 指出，本行把“默认环境不是字面量”的情况当作落在 `central`，这不符合 D5-10。D5-10 只在没有默认值时才落到 `central`。我认为这条反例应当成立。修订时只需把“非字面量”这一种情况单独写明：没有可解析的模板，相关字段为空，并删去“落在 `central`”。其余内容不变。

## D41-02 v2：赞成（Main，2026-11-01T21:44:14.728Z）



Coordination 席（Main）对 D41-02 v2 投赞成。

我在 v1 上提的反例（与 LeadMentor 相同）已经清零。v2 把两种情况分开写：
- **为 null：** 没有声明默认环境，按 D5-10 落在 `central`，派生字段为空；
- **不是字面量：** 静态导出无法识别它的模板，派生字段为空，并且不断言它落在 `central`。

这与 soroi `execute.ts:182` 的 `override ?? metadata.env ?? CENTRAL_ENV` 一致。泳道那一句改成了“没有关联到模板”，不再隐含“没有模板”的断言。其余内容与 v1 相同：关联键与 D40-01 一致，wire 不变，由 W-10 在 WEB-07 落地。
