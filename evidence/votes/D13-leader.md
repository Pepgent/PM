# D13 Claude 族选票

投票者：leader 分身 GapClone（Claude 族；依据 (U) U21“对于领导的处理，我推荐你分身”，由 leader 会话 01a195a6 分派 D13 治理流程）。按 D1-12，Claude 族合计一票；本批未调度 task:high（U11 允许的 Claude 族成员只用 leader 与其分身）。
表决文本：`pepgent-pm/evidence/decisions/D13-contract-gaps.md` 定稿。

| ID | 票 | 理由 |
| --- | --- | --- |
| D13-01 | 赞成 | 落实 D4-18“由部署注入”：两个 `sha256:` 变量只在 Main 启动时解析一次，插件不推导；store 契约不变；落选方案各有可复现的失效（容器 env 混凭据、remote 职责扩大、tag 可变） |
| D13-02 | 赞成 | 两个生产方共用逐字符定义的投影；只收入口脚本与 omp 启动、模型、设置文件，与 D4-18 对远程“影响执行的配置”一致；镜像运行引用与注入值出自同一个 digest；字段完整性已核实（两容器无 `working_dir`、`user`、`platform`） |
| D13-03 | 赞成 | 一次切换不产生不在任何已通过设计里的中间公式；开发期捕获不迁移与 D4-18“环境变化不复用”一致 |
| D13-04 | 赞成 | 复用 Lab 每代已有的 `get_state` 响应，持久保存 omp 自己给出的路径；不唤醒、不推导、不改 omp；迁移时 Lab 库 `conversation` 为 0 行（实测），无存量缺口 |
| D13-05 | 赞成 | runner 只看插件内固定的 `PATH` 与 `BUN_BE_BUN`，进程环境不再是身份之外的执行输入，D13-02 的窄投影因此成立；外部值经 atom 传入，凭据节点走远程模板（D4-10） |
