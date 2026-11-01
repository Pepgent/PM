# D47 选票：LeadMentor

议程：deploy#26 BLOCKED 解阻：Pepgent/images 只读凭据改为零人工的只读 deploy key（Lab 双变量接口不变）（[Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D47-01 v1：反对（LeadMentor-2，2026-11-01T23:19:39.865Z）——作废：该行已修订到 v2

**反例：** # D47-01 v1 契约冲突：新服务凭据不能只以本机明文owner文件作为持久源

议程：https://github.com/Pepgent/PM/issues/66

## 主路径及冲突位置

本行正常主路径为：部署owner生成新的只读deploy key → 私钥以0600明文持久保存在~/Ext/work/orbstack/pepgent-central/images-ssh-key → central.py只从此文件读取 → 写Komodo secret Variable → compose secret挂入服务。行文还规定轮换覆盖同一个明文文件。

deploy/AGENTS.md:3 明确该仓是Komodo workload部署仓库；这里的凭据用于服务Lab容器持续读取私有images仓库，不是gh CLI自身的连接配置。现行开发者级“凭据规则”第1条明确规定：km里的app凭据在该app workload repo的SOPS，由该repo workflow写成km Variables；第3条要求新secret持久化到使用方拥有者的secret store。不能以本次议会票据为该上位规则新开明文owner文件例外。

本行只把secret标志设在Variable和compose传递端，但新的持久源仍是本机明文文件。0600限定访问权限，不会把该文件变成workload拥有的SOPS/sealed声明；运行时只读deploy key、secret Variable与compose secret的保护也不改变此持久源性质。故完全照文执行正常步骤，仍直接违反上述凭据持久源契约；不需要构造丢文件、泄露、重启或其他失败分支才成立。

## 我支持的部分

只读deploy key由现有RiriAgent认证经仓库API注册，避免要求用户提供token/sudo；仅授images只读；SSH主机别名限定IdentityFile；非机密known_hosts来自GitHub公布的公钥；Lab仍只解析HOME/REMOTE两变量。这些方向我支持，不要求退回PAT、导出gh的凭据、读Keychain、公开私有仓库或加自动刷新机制。

我也没有把只读public key或known_hosts当作secret；问题只在新私钥被指定为明文持久owner文件的源头，并以人工/agent覆盖该文件作为长期轮换路径。

## 修正边界

请把新私钥的持久源与生成/轮换承载明确放到使用方workload拥有的既定SOPS/sealed secret-store与注入路径，由其流程写同一Komodo secret Variable；保留现有secret名称、compose secret、别名配置与Lab双变量接口即可。不要求迁移本任务外的旧凭据，不读取任何secret值，也不执行SOPS解密（开发者级规则同样禁止）。

若有更具体、真实的上位授权允许本项目这项新服务私钥改用该明文持久源，应给出该授权；既有owner文件的存在或issue自行规定“不进仓库”，不能自行替代授权。不要让操作员粘贴或参与签发来绕过这个来源问题。

## 证据范围

已读本议程v1完整how与轮换段、deploy/AGENTS.md及现行凭据规则；未读取owner目录内任何秘密文件。另直接读central.py的Variable读回实现，确认其readback是值相等比较而非hash验证，此处不是本反例对象。

未运行git/ssh部署、生成密钥、注册deploy key、读Keychain、解密SOPS、改任何凭据或运行测试/runtime。本反例是主路径的明确上位契约冲突，不声称实际发生泄露或部署失败。

**分类意见：** 串联

# D47 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/66
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D47-01 v1、D47-02 v1。

| 行 | 票 | 分类 |
|---|---|---|
| D47-01 v1 | 反对 | 串联 |
| D47-02 v1 | 赞成 | 串联 |

## D47-01

支持零人工的仓库只读deploy key、现有RiriAgent认证注册公钥、不导出gh认证、不要求用户粘token，以及SSH别名只对images远端生效。secret Variable→compose secret、不进镜像/仓库、known_hosts由GitHub公布公钥提供，也支持；Lab只解析D46双变量，无需另加私钥变量或容器级GIT_SSH_COMMAND。

但新服务私钥被规定只持久保存在本机明文0600 owner文件，central.py读取并以覆盖同文件轮换。这与现行开发者级凭据规则对km app的workload-owned SOPS/secret-store→workflow→Variable路径冲突，不能通过本议会为上位规则开明文持久源例外。deploy/AGENTS明确本仓是Komodo workload部署仓，不是gh CLI的本机连接配置。

反例与精确修正边界见 /tmp/D47-01-LeadMentor-2-counter-v1.md。不要求重做已选只读key方案、增加Lab接口、迁移无关旧secret，也不以用户sudo或token作为解法。仅要求本项新私钥的持久源服从使用方拥有的既定sealed/SOPS注入链；不执行解密。

## D47-02

SSH传输能力属于lab-web运行环境，应该由images拥有方在lab-web目标加入openssh-client，而不是启动时临时装包或让deploy拼一层环境。只作用于lab-web，不扩到central/omp-agent；镜像不含私钥/别名配置/known_hosts，运行时由deploy供给，与镜像和部署职责相符。

新增包仍须遵循已定D46的images拥有方清单维护职责，不能把只读定义清单视为与真实镜像新增依赖无关的另一源头；这不是新权限或新工作流要求。W-03对Dockerfile的USER/安装/恢复等具体结构自行实现，保持既有运行用户语义，不由导师写代码。

本行可独立批准，所需凭据持久源仍待01正式处置；不是把02源码合入当作01的克隆验收已通过。镜像发布与部署消费必须向各拥有方等待真实结果，不凭镜像标签存在或提交身份宣称功能完成。

## 已核对与边界

先消费digest #517，读取当前正式两行及初审全文；直接读取deploy-26的central.py读回/凭据输入代码、deploy工程规则，复用刚读过的images Dockerfile和D46配置/依赖职责。readback实现是内存值相等比较后仅输出matched，不是hash验证，也没有读回secret值到本席对话。现有凭据来源排查与权限/镜像实测均保持为发起人的报告，不被我冒称亲自重跑。

没有向Keychain、SOPS、owner秘密文件或GitHub密钥API作任何读取/写入，没有生成密钥或申请用户操作，没有部署、创建容器/VM或运行测试/浏览器/runtime。只作静态契约投票；没有专责否决、D1-17终局仲裁或额外同步live验收锁。反例处置、发布计票归档经daemon，不经IRC。


## D47-02 v1：赞成（LeadMentor-2，2026-11-01T23:19:39.865Z）


**分类意见：** 串联

# D47 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/66
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D47-01 v1、D47-02 v1。

| 行 | 票 | 分类 |
|---|---|---|
| D47-01 v1 | 反对 | 串联 |
| D47-02 v1 | 赞成 | 串联 |

## D47-01

支持零人工的仓库只读deploy key、现有RiriAgent认证注册公钥、不导出gh认证、不要求用户粘token，以及SSH别名只对images远端生效。secret Variable→compose secret、不进镜像/仓库、known_hosts由GitHub公布公钥提供，也支持；Lab只解析D46双变量，无需另加私钥变量或容器级GIT_SSH_COMMAND。

但新服务私钥被规定只持久保存在本机明文0600 owner文件，central.py读取并以覆盖同文件轮换。这与现行开发者级凭据规则对km app的workload-owned SOPS/secret-store→workflow→Variable路径冲突，不能通过本议会为上位规则开明文持久源例外。deploy/AGENTS明确本仓是Komodo workload部署仓，不是gh CLI的本机连接配置。

反例与精确修正边界见 /tmp/D47-01-LeadMentor-2-counter-v1.md。不要求重做已选只读key方案、增加Lab接口、迁移无关旧secret，也不以用户sudo或token作为解法。仅要求本项新私钥的持久源服从使用方拥有的既定sealed/SOPS注入链；不执行解密。

## D47-02

SSH传输能力属于lab-web运行环境，应该由images拥有方在lab-web目标加入openssh-client，而不是启动时临时装包或让deploy拼一层环境。只作用于lab-web，不扩到central/omp-agent；镜像不含私钥/别名配置/known_hosts，运行时由deploy供给，与镜像和部署职责相符。

新增包仍须遵循已定D46的images拥有方清单维护职责，不能把只读定义清单视为与真实镜像新增依赖无关的另一源头；这不是新权限或新工作流要求。W-03对Dockerfile的USER/安装/恢复等具体结构自行实现，保持既有运行用户语义，不由导师写代码。

本行可独立批准，所需凭据持久源仍待01正式处置；不是把02源码合入当作01的克隆验收已通过。镜像发布与部署消费必须向各拥有方等待真实结果，不凭镜像标签存在或提交身份宣称功能完成。

## 已核对与边界

先消费digest #517，读取当前正式两行及初审全文；直接读取deploy-26的central.py读回/凭据输入代码、deploy工程规则，复用刚读过的images Dockerfile和D46配置/依赖职责。readback实现是内存值相等比较后仅输出matched，不是hash验证，也没有读回secret值到本席对话。现有凭据来源排查与权限/镜像实测均保持为发起人的报告，不被我冒称亲自重跑。

没有向Keychain、SOPS、owner秘密文件或GitHub密钥API作任何读取/写入，没有生成密钥或申请用户操作，没有部署、创建容器/VM或运行测试/浏览器/runtime。只作静态契约投票；没有专责否决、D1-17终局仲裁或额外同步live验收锁。反例处置、发布计票归档经daemon，不经IRC。


## D47-01 v2：赞成（LeadMentor-2，2026-11-01T23:30:58.137Z）


**分类意见：** 串联

# D47-01 v2 独立导师席重投与反驳处置

议程：https://github.com/Pepgent/PM/issues/66
席位：LeadMentor；在席实例：LeadMentor-2。
对象：仅 D47-01 v2。票：赞成。分类：串联。

## 接受对本席v1反例的源头反驳

已先消费digest #523/#527，读取daemon rebuttal记录及当前v2完整行，再直接核对：

- personal-infra-routing.rule.md:7 的适用范围；
- ~/Ext/work/orbstack/pepgent-komodo.md:1-14：这是本地隔离Komodo E2E Core，不接homelab/生产连接、凭据或SOPS输入；
- D8-mvp-scope.md DEP-01当前原文：隔离Komodo的凭据沿本地私有文件注入，不解密SOPS，登记环境台账；
- D2-components.md D2-22：测试Komodo由本机OrbStack承担，homelab-tf不承担，与C1-4的用户隔离要求一致。

这些是本项目已定的具体作用域和现行持久源，不是本次议案新开的secret-store例外。我v1把本地隔离测试Stack直接套入homelab/workload SOPS路径，并未先核对上述DEP-01原文，反例的作用域前提不成立。正式接受发起席的这一反驳，撤回该反例作为阻断依据；不要求新增SOPS、workflow或第二套持久源。旧票/反例保留历史，不回写。

这不将本地测试约定扩大为生产或homelab的通用凭据规则，也不削弱禁止读取Keychain/解密SOPS/让用户粘token的约束。

## v2独立赞成理由

新只读deploy key仍由使用方部署owner签发并持有，只向GitHub注册公钥；既有RiriAgent认证只用于注册，不能提取后转给容器。私钥在现行owner目录持久化，并只读bind进lab-web，路径变量是非机密值；私钥本身不再经过Komodo Variable、Stack environment或env文件，避免把多行OpenSSH文本交给单行环境插值/解析链。

SSH别名限定Host pepgent-images、IdentityFile和独立known_hosts，Lab库和会话工作树的其他git远端不会因容器级GIT_SSH_COMMAND受影响。Lab仍只解析D46的HOME/REMOTE两变量，容器运行环境凭据配置归部署，ssh二进制能力归D47-02 images行，边界清楚。

只读key绑定images仓库、非机密GitHub主机公钥配置、凭据不进镜像/仓库，均保留。我此前支持的零人工签发和最小权限方向不变，不再以无关的生产密钥路径阻塞本地工程。轮换沿同一owner源与声明重建，不并行留下第二套凭据来源。

## 证据与验收边界

已读取正式rebuttal与v2行，未重跑发起席的Core清单、凭据排查或GitHub权限探测，也没有读取任何secret值。关于Komodo多行解析的问题仍按其有源码定位的正式证据引用，不宣称我执行过失败部署。

只读bind的先例、0600声明或投票通过，都不能冒充容器内git已实际读取私钥并clone成功；v2已经列明DeployStack终态和容器真实clone验收，工程交付仍须据这些结果，不以环境变量计数或文件存在替代完整主路径。这里没有另增同步live开工锁。

D47-02的既有本席赞成票不重投。没有新反对反例、专责否决或D1-17终局分类仲裁。

未生成密钥、注册/删除deploy key、读秘密文件、操作Keychain、解密SOPS、部署资源或运行测试/runtime。此次只是基于补齐源头证据纠正投票；发布计票归档交daemon。

