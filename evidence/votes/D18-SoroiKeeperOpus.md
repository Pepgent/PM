## SoroiKeeperOpus（发起人、产品全景参投席）：表决对象澄清与原票

以下“发起人正式提案”为各条唯一表决对象：赞成即赞成本节方案；D18-01 按 11 项逐项表决。


### D18-01：11 项逐项归属

原则：soroi 只是 omp 扩展组件（U1），以下全部不进 soroi 内核；“首版”指本轮 A0+F01–F31 必须真实走通，“D9”指首版页面保留、无源字段诚实留空、列入 F32 差距分析（D8-16、D12:561-579）。

| 项 | 归属 | 首版范围 | 依据 |
|---|---|---|---|
| ① Lab 业务目录与关系（实验名称/负责人/标签、草稿版本、讨论绑定、项目多标签） | Lab 后端（`lab.sqlite`） | 首版 | D7-03、D12 13 页 wire |
| ② 仪器资源排程（设备目录、机位预留、冲突、设备 idle） | Lab 后端 | D9 | D8:87 已列仪器事件入 D9 |
| ③ 算力运维与集群接入 | 只读作业列表/status/tail：Lab 经 remote，首版；集群健康/容量/重启/销毁/shell/接入向导：独立运维组件（不归 soroi、不归 remote），D9 | 只读首版，其余 D9 | D7:72,103-105；D8:87（只读 status/tail 必须进首版） |
| ④ 镜像开发构建 | `Pepgent/images` + Komodo Build；Lab 只做门面 | D9 | D2:50；D7:36-40；D8:87 |
| ⑤ 多人讨论与成果治理 | Lab 后端（讨论 = Lab 根会话，经 Mux 与 host tools） | 首版 | D7-04、D7:65-67、F31 |
| ⑥ 数据集索引、预览与导出 | Lab 后端读 store 事实（来源、被引用、产物字节）+ 业务库标签 | 索引/预览/来源首版；role/verdict/契约语义与 ZIP/RO-Crate 导出 D9 | layers 远程捕获/记录；D12:567-571 |
| ⑦ 广义自动化触发源 | Lab 自动化引擎 | 生命周期触发（F30）首版；节点判据、设备 idle、构建、cron、邮件 D9 | layers 运行事件；D8:87 |
| ⑧ 身份、授权与配额 | Lab 后端（Better Auth organization，唯一权限源） | 认证与四角色首版；GPU 小时真实用量、邀请邮件 D9 | D7:63；D8:87 |
| ⑨ 科研主页对象（报告、文献、里程碑、阶段叙述） | Lab 后端 | 由真实运行/讨论派生的部分首版；研究阶段叙述 D9 | D12:569-570 |
| ⑩ 业务 AI 会话与动作协议 | Lab 后端（根会话 + `lab_*` host tools；实验提案只建草稿） | 首版 | D7:65-67；D12:48 |
| ⑪ 函数到科研节点卡片的元数据映射 | Lab 后端从 Lab 库 TS 静态导出（签名、默认 env、JSDoc `@group`/`@estimateMinutes`） | 签名/参数/返回/默认 env/分组/估时首版；设备、判据、产物契约 D9 | D10:23；lab-library PR14 |

### D18-02
按表中 how 列①②③执行（由 Argon 回写 design 正文）。

### D18-03：推荐方案 A（维持 D4）
remote 两个后端改为：体结束后无论成败都执行 copy-out；`Ended` 只在 copy-out 已送达后报告。Komodo 模板 copy-out 的依赖改为体结束（不要求成功），`derive_status` 不再在缺 copy-out 时返回 `Ended`；Slurm 以 copy-out 步骤完成作为 `Ended` 依据。eval 中间件与 D4 契约不变；体的退出结果仍按 D12 列入 D9。理由：契约已表决，改动只落在 remote 一个组件；失败运行的工作目录照样回收，复盘可浏览（F18）；符合用户“创建临时的volume，然后全自动的把文件拷回来”（`01a18e3a/#09e1cc92`）。

### D18-04：推荐方案 A
智能体模板页限定为编辑 Lab 库 `.omp/agents/` 中的 omp agent 定义；Claude Code/Codex/Pi/OpenCode 等其他 harness 字段不出线。理由：U13、U24，远程 Agent 携带同一 soroi 发行与 Lab `.omp/`（layers:11）。

### D18-05：推荐方案 A
每新增一个 Lab 部署一整套（Lab 后端、store、Mux、Komodo 等）；单个部署内的 Better Auth organization 只承载本 Lab 的成员、角色与邀请，部署 seed 创建该 Lab。D7-01/02/19 中隐含“单后端承载多个 Lab”的部分按此修订；侧栏“切换 Lab”首版列 D9。理由：用户原话“新增实验室的时候，等于部署全套soroi下的东西成独立的一份，包括km”，之后无撤回；多租户概念不侵入 soroi。

## 原票（SoroiKeeperOpus）

| ID | 票 | 对象 |
|---|---|---|
| D18-01 | 赞成 | 上表 ①–⑪ 逐项归属与首版范围 |
| D18-02 | 赞成 | how 列 ①②③ |
| D18-03 | 赞成 | 方案 A |
| D18-04 | 赞成 | 方案 A |
| D18-05 | 赞成 | 方案 A |

