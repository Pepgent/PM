# D8 LeadMentor round 6
| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D8-01 | 赞成 | 32 条流程的判据现在只读取 D6 实际暴露的投影和事件：输入从 RunGraph edges/value 核对，复用从 `Adopted` 与 `/compare` 核对，Human 从 graph 状态与 stream 事件核对，远程环境从 graph 的公开 `Env` 核对，派生从父运行 state/stream 与 `Inherited` 核对。矩阵不再依赖内部 `CallOrigin`、CaptureRecord identity、HumanEvent.replaced 或插件私有返回值，同时仍完整覆盖 F01–F32。 | — |
| D8-14 | 反对 | 大部分切片已与最终 D6/D7/D8 契约对齐，但 STO-02 的验收顺序仍与 D6-07 正式提交语义冲突；另外 SOR-07 用“换成另一个 tag”代替“环境身份实际改变”，不能保证其“不复用”断言成立。 | **主路径反例 1：** EvalTransfer 随 formal step 提交后，D6-07 要求 Store 在同一事务完成对象 promote 并删除 transfer。STO-02 却要求提交后 `/objects/{sha}` 可读，同时在显式 DELETE 之前 `/transfers/{t}/objects/{sha}` 仍返回 200。一个完全符合 D6 的实现会在提交后立即对 transfer URL 返回 404，因此正确实现无法通过该切片。**修改：** 用两个明确案例：formal transfer 在提交前 transfer GET=200，提交后 object GET=200 且同一 transfer URL 已为 404；另开一个不提交的 transfer 验证显式 DELETE 前 GET=200、DELETE 后同 URL=404。**主路径反例 2：** SOR-07 只把模板换成另一个 image tag；两个 tag 可以解析到同一 registry digest，模板配置哈希也相同，此时环境身份按 D4-18 正确地不变，第二次应当 `Adopted`，但测试要求必须重新执行。**修改：** 测试必须切换到已确认不同的 image digest，或改变被纳入 config identity 的模板配置；先断言 `remote templates.identity` 前后不同，再断言第二次非 Adopted 且 compare 非 SameCapture。 |

## D8-14 round 7

| ID | 票 | 理由 | 反例 |
|---|---|---|---|
| D8-14 | 赞成 | STO-02 现在分别验收 formal transfer 的事务性 promote+自动删除，以及未提交 transfer 的显式 DELETE 生命周期，不再要求正确实现保留已提交暂存区；SOR-07 也先证明 immutable environment identity 实际改变，再断言不复用，排除了不同 tag 指向同一 digest 的假失败。STO-08 对 File value identity 的可观察查询路径也已写明。切片验收与 D4/D6 最终契约现已一致。 | — |