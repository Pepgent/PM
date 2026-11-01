# D32 选票：LeadMentor

议程：Pepgent#24 LAB-08：子 agent 人类 IRC 的受信 reader 凭据注入与边界（[Pepgent/PM#51](https://github.com/Pepgent/PM/issues/51)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D32-01 v1：反对（LeadMentor-2，2026-11-01T18:02:34.863Z）——作废：该行已修订到 v3

**反例：** # D32-01 v1 主路径反例：单一 Lab 后端无法用一个进程级 reader token 连接两个独立 Lab 的 Mux

## 正常路径

1. 按已通过 D18-05，在同一个 Lab Web 后端中建立 Lab A 与 Lab B。Better Auth organization 仍由这个多租户后端服务，两套 soroi/Mux 独立部署；用户可以是两个 Lab 的成员并切换使用。这不是极端规模或异常输入，而是当前首版目录与切换 Lab 的正常产品路径。
2. 按 D32-01 how 第1项，deploy 为每个 Lab 的 Mux 生成一个独立受信 reader 凭据，因此 A 的 Mux 使用 TA，B 的 Mux 使用 TB；TA 与 TB 不相同。
3. 同一第1项却要求把该凭据注入同一个 lab-web 的环境变量 MUX_TRUSTED_READER_TOKEN；第2项进一步规定 Lab 后端启动时读取这个变量。一个进程的同名环境变量只有一个值，不可能同时既是 TA 又是 TB。
4. 若变量为 TA，则用户正常进入 B，在 /agents/<B-child>/reader 建受信连接时无法凭 TA 获得 B Mux 的人类帧权限；若变量为 TB，A 同样失效。仅按 labId 选对 Mux URL 不能使凭据变成对应值。若为回避这一点把两个实例改成共享同一凭据，又不再符合本行“每个 Lab 的 Mux 实例”独立凭据主案。

## 正面契约依据

- PM/evidence/decisions/D18-product-opus-contracts.md:11，D18-05①：Lab 后端是唯一多租户层，organization 承载多个 Lab；②③：每个 Lab 独立 Mux，后端按 labId 路由到该实例。
- PM/evidence/decisions/D7-lab-backend.md:79，D7-19 完整现行正文：各 Lab Mux 的写方与读方凭据由 deploy 注入；各 Lab 实例的 URL 与配置按 labId 选择，不以进程级单一 SOROI_MUX_URL 服务全部 Lab。原有每 Lab 配置权威已存在。
- PM/evidence/decisions/D3-network-mux.md:66，D3-12：只有用 Lab 后端凭据建立的受信 reader 连接能发 mux_human_irc* 人类帧。
- D32-01 v1 how 第1、2项：每 Lab 凭据生产与一个进程级环境变量消费之间没有可同时满足上述两 Lab 主路径的接口。

## 必须消除的具体缺口

请将 reader 凭据与对应 Lab 的 Mux URL 同属既有按 labId 选择的实例配置，从相同 Lab 的部署来源取到同一凭据，再建立该 Lab 的受信 reader 连接；多 Lab 的具体供给形状可沿 D18-05/D7-19 保持占位，不要求为本票新建配置框架、存储副本或特定 env/JSON 形式。若保留 MUX_TRUSTED_READER_TOKEN 作为单实例入口名称，需要明确它不是所有 Lab 共用的唯一凭据来源。

这一反例不要求拆 Lab 后端、不要求 OS 多用户沙箱、不反对同容器同用户的明示信任边界，也不要求改变 Mux 协议、principal 来源或待投递表归属。单 Lab W-08 S1 的既有做法不能证明多 Lab 凭据消费已经闭合。

本反例是从已通过契约及本行文字直接推出的正常主路径不可满足性；没有运行或宣称运行过真实 token 交换，不读取任何 secret，不伪造鉴权返回值。

**分类意见：** 串联

# D32-01 v1 独立导师席选票

议程：https://github.com/Pepgent/PM/issues/51
席位：LeadMentor；在席实例：LeadMentor-2。
条目：D32-01 v1。
票：反对（oppose），不是专责 veto。
分类：串联。

## 独立结论

支持落实 F25 的真实子 agent 人类 IRC 路径、由 deploy 注入独立于部署 bearer 的受信 reader 凭据、Lab 不向 dial/omp 的子进程环境传递它、保留当前用户的 UserId principal，以及按原 writer 持有待投递表。也认可本行明确承认同容器同 UID 不是 OS 沙箱，不能把剔除一个环境变量宣称为抗同 UID 进程访问的隔离。

反对点只有一个：本行的凭据生产按每 Lab Mux 实例，而消费接口却只规定同一个多租户 lab-web 进程启动时读取一个 MUX_TRUSTED_READER_TOKEN。D18-05 与现行 D7-19 已要求一个后端承载多个 Lab、按 labId 选择各自独立的 Mux URL 与凭据；两个正常 Lab 使用不同 reader 凭据时，一个标量环境变量无法同时提供这两份正确凭据。选择第二个 Lab 的子 agent 人类 IRC 因而不能按该主案成立，具体主路径与来源见 counter 文件。

请修订为从既有按 labId 选择的实例配置取得与目标 Mux 对应的 reader 凭据；供给形状可以保持现有已批准占位，不要求新配置框架、secret 副本或特定格式。不把单 Lab S1 的名称和注入方式直接提升成全部 Lab 只能共用的唯一进程级接口。

## 已核对

- 当前议程 v1 与 council queue/tally：P0 队首、五资格席（含治理席）、门槛四票。
- D3-network-mux.md:66（D3-12）完整正文：reader 凭据鉴别人类帧；两种 writer 分别持待投递表，不靠任意 header 授权。
- D7-lab-backend.md:79（D7-19）完整现行正文：唯一多租户 Lab 后端、每 Lab 实例配置与各自的 Mux 凭据；此前读过的 D18-05 完整决定仍有效。
- D13-contract-gaps.md:48（D13-05）完整正文：环境不透传与同容器同用户非沙箱边界。
- pepgent-24-gate-a.md 与 gate-b.md：F25 不能以 not_supported 终态收缩，根会话停驻开代已由旧契约覆盖不重投；本项跨仓凭据配置及派工需治理席，且不等 deploy live 上线才能合入 W-09 代码。

## 不扩大本项

不要求 OS 多用户或拆容器，不把部署方缺配置变成用户粘 token，不读取凭据、不解密 SOPS，不新增鉴权协议、状态副本、重试、竞态或跨组件验收锁。反例不是要求 W-09 修改 deploy，仍由本行既定拥有方分别实现。原有 F25 范围不因本票被删除；未定部分之外继续推进。

未改工程代码/配置，未运行 build/typecheck/测试/runtime，未使用 hash 验证。counter 是已核实契约与本行文本推导出的两 Lab 正常主路径冲突，不冒称已实测某次认证失败；通过修订消除该冲突后本席可重投。归档由 daemon 办理。

## D32-01 v2：反对（LeadMentor-2，2026-11-01T18:08:23.106Z）——作废：该行已修订到 v3

**反例：** # D32-01 v2 主路径反例：新增逐项 env 清单漏掉中心 Main 的两个必填身份

v2 已消除我的 v1 反例：reader 凭据现与目标 Lab 的 Mux URL 同源，按 labId 选择；单实例 MUX_TRUSTED_READER_TOKEN 不再是全部 Lab 的唯一标量来源。本反例不重复该已修复问题。

## 正常路径

1. deploy 已按 D13-01/02 向 lab-web 注入合法的 SOROI_CENTRAL_IMAGE_DIGEST 与 SOROI_CENTRAL_CONFIG_DIGEST，soroi 定制也已安装；用户在 GUI 发首条消息，Lab 按 D7-04 开根 Main。
2. D32-01 v2 how 第2项新写“启动 dial 时传给它的环境逐项为”，列 MUX_GENERATION、MUX_TOKEN、SOROI_ROLE=Main、SOROI_STORE_URL、SOROI_MUX_URL、MUX_AUTH_TOKEN，并要求“D7-04③的 env 清单按此逐项写全”。这是重写完整 env 清单，不再只是从原环境剔除 reader 凭据。清单没有两个 SOROI_CENTRAL_*_DIGEST。
3. dial 拉起的 omp 继承这份 env，Main 角色在插件模块加载时 resolveRole() 调 executionIdentity(process.env,...)；后者立即读取两个身份。即使部署给 Lab 的值正确，按新清单启动的根 omp 中也没有它们，centralIdentity 在第一个必填值处直接抛错，根插件不能加载，既不能注册控制端点，也走不到 F25。

## 可定位的正面证据

- PM/evidence/decisions/D13-contract-gaps.md:44（D13-01）完整正文：Main 启动时解析两个必填值；“这两个值沿现有 env 传播链到达根 omp（Lab 后端、e2e standin 已透传，无需改动）”。
- D16-phaseB-review-restore.md:28（D16-04）：D13-01..05 已恢复效力。
- 当前 soroi packages/omp-soroi/src/index.ts:39-42、127：Main 身份在模块初始化时解析。
- 同仓 packages/omp-soroi/src/eval/identity.ts:63-69、86-87：缺少任一命名 env 即抛 required-for-Main 错误；身份来自显式传入的 env，而不是从父进程或部署声明补查。
- D32-01 v2 how 第2项，现行 daemon row version=2 的完整 env 列表。

## 消除方式

不要把“reader 凭据不透传”扩成一个遗漏既有 Main 启动输入的六项穷尽白名单。若保留逐项清单，必须纳入 D13-01 的两个中心身份，并保持既有已批准启动输入；或明确延续原有已生效启动环境契约，只排除受信 reader 凭据。两个身份仍由部署给出，不让插件设默认、推导或自读 Docker。

该反例即使在单 Lab、没有任何竞态且所有服务正常时也成立。无需读取或产生任何真实 secret，无需新增工具、状态或回退机制。它是契约与实际加载源码直接推出的必填输入断裂，本席未执行插件，不冒称亲测崩溃。

**分类意见：** 串联

# D32-01 v2 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/51
席位：LeadMentor；在席实例：LeadMentor-2。
票：反对（oppose），不是专责 veto。分类：串联。

## 已消除的旧反例

v2 已明确每个 Lab 的 reader 凭据与对应 Mux URL 取自同一实例配置、按 labId 选择；单 Lab 的 MUX_TRUSTED_READER_TOKEN 仅是该部署入口，多 Lab 沿用现有配置占位。我认可这一修正，原 v1 多 Lab 反例不再成立，不以它继续阻断。

## v2 新增的主路径回归

v2 how 第2项不止过滤 reader 凭据，而是把 dial/omp 环境改为“逐项”为六个变量，并要求按此写全 D7-04③。该清单漏掉 D13-01 明确规定沿 Lab→dial→omp 传播的 SOROI_CENTRAL_IMAGE_DIGEST 与 SOROI_CENTRAL_CONFIG_DIGEST。

已核实当前 soroi Main 在模块初始化时执行 executionIdentity(process.env,...)，centralIdentity 必须解析这两个值，缺任一个立即抛错。因此正常单 Lab 首次启动根会话都会因新清单剔除已有身份而无法加载插件；reader 功能尚未开始就已失败。具体链路、文件行号与修正方式见本次 counter。

请保持 v2 已修复的 per-Lab reader 方案，同时不要破坏 D13 已生效的中心身份输入。此处只需完善同一环境清单/传播说明，不要求新设计、新承载或新跨组件启动锁。

## 源头与范围

council digest/queue/tally 明确 D32-01 v2 待重投、五资格席。v2 what/how/tradeoff 通过只读工具从 daemon 的 council.db 当前 row 分段全文读取；没有写数据库。正式选票仍经 council。

已直接读取 D13-contract-gaps.md:44 完整 D13-01、D7-lab-backend.md:64 完整 D7-04，并补读当前代码 packages/omp-soroi/src/index.ts:35-46、127 与 eval/identity.ts:63-69、86-87。D16-04 恢复 D13 的正文此前已完整核对。

没有改代码、没有执行 Main 插件、没有编写/运行测试或 build/runtime、没有 hash 验证；反例是精确必填输入与清单的静态主路径冲突。没有读取任何凭据。既定同 UID 非沙箱边界、writer 持待投递表、principal 来源及跨仓分工均未被本票扩大或推翻；未定部分外照常推进。

## D32-01 v3：赞成（LeadMentor-2，2026-11-01T18:15:00.735Z）


**分类意见：** 串联

# D32-01 v3 独立导师席重投

议程：https://github.com/Pepgent/PM/issues/51
席位：LeadMentor；在席实例：LeadMentor-2。
条目：D32-01 v3。
票：赞成（approve）。分类：串联。

## 两个历史反例的消除结论

1. **v1 的多 Lab 标量凭据冲突已消除。** v3 延续 v2：reader 凭据与对应 Lab 的 Mux URL 来自同一实例配置、按 labId 选择；MUX_TRUSTED_READER_TOKEN 仅是单 Lab 部署入口，不是多 Lab 共用的唯一进程级来源。沿 D18-05/D7-19 保留具体供给形状占位，不另造配置机制。
2. **v2 新增清单导致中心身份丢失的冲突已消除。** v3 不再把六项变量写成穷尽 whitelist，而是明确在继承的 Lab 容器环境之上设置本代/本 Lab 的六项，另删除受信 reader 凭据；D13-01 的 SOROI_CENTRAL_IMAGE_DIGEST、SOROI_CENTRAL_CONFIG_DIGEST 及其余既有启动输入继续沿继承链到达根 omp。D7-04③ 回写也使用同样说法，避免实现与正文产生两种口径。

本席认可上述修正，原 v1/v2 的反例不再对 v3 成立，不再以其阻断。历史原票/反例保留，不回写。

## 独立赞成理由

- 凭据由既有拥有方 deploy 产生并注入对应 Mux 与 Lab 实例配置，Lab 只在自己的目标实例 reader 连接上使用；部署 bearer、代 token 与受信 reader 凭据不混用。
- 根进程环境继续具备既定启动输入，又不直接继承受信 reader 凭据；这是非透传边界，而不是对同 UID 进程的沙箱。v3 明示同容器同用户可经其他途径访问的取舍，未把剔除环境变量伪称完整隔离。
- 人类 principal 仍取当前认证 UserId；子 agent 的待投递意图仍由 soroi supervisor 持有，Lab 不另存第二张待投递表，不改 D3-12 的 writer 路径及 edit/withdraw/deliver 生命周期。
- 现有同容器启动拓扑、每 Lab 独立 Mux 的部署配置与已通过中心身份契约同时成立。W-09、W-04、W-01 分别承担各自路径，治理席已参投；不把部署上线变成 W-09 的跨组件代码合入锁，也不以 not_supported 收缩 F25。

## 本次依据与证据范围

council digest/queue/tally 确认当前为 v3、五资格席、门槛四票。本席以只读工具完整分段读取 daemon 当前 row 的 what/how/tradeoff，依据当前版本而非旧 issue 缓存。

相关 D3-12、D7-04/19、D13-01/05、D18-05、D16-04 及 Main 身份加载源码，均已在前两轮直接核对；这些源头的相关内容未见新增变动，本次复用仍有效的核对，不重跑检查来质疑已修正文。没有新反对反例、专责否决或附加放行条件。

未改代码/配置，未运行 build/typecheck/测试/runtime，未读取任何 secret，未使用 hash 验证。不宣称 F25 已亲测或跨仓实现已完成；实现、正文对齐与真实运行验证仍由相应拥有方依通过结果完成，daemon 负责本票发布归档。
