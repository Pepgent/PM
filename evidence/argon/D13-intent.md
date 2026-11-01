# D13 Argon 意图基线与逐条裁决原文

第二轮完整基线与 D13-01..04 裁决、第三轮 D13-05 基线与补充裁决原文如下；最终有效裁决见 evidence/votes/D13-argon.md 第四、第五轮。历史选票中的旧字段不得替代现行 PM 决策项表。

## 第二轮完整原文

# D13 实现期跨组件契约缺口（D13-01..D13-04）— Argon `(U)` 意图基线、逐条裁决、分类意见与选票

> **合规声明（依 `LEDGER.md` U20 / `AGENTS.md` D1-12、D1-16、D1-17）：**
> 1. 每条意图基线、本意裁决与否决审查均引用 **`(U)` 用户原话**（标注 `pepgent-soroi/LEDGER.md` 的 `U` 编号，或 `LEDGER.md` R1 指向并归档于 `pepgent-pm/evidence/` 的历史会话 `session://<sid>/entry/<entry>`）。
> 2. 凡有直接 `(U)` 原话支撑的标为 **`【定】`**；凡 `(U)` 原话未直接规定具体环境变量名、投影 JSON 格式、PR 切分粒度或 SQLite 列名的事项，一律标为 **`【暂定】`**，不用作一票否决依据。
> 3. 本报告完整覆盖改写后的 `D13-01`、`D13-02`、`D13-03` 及新增的 `D13-04`，可直接由秘书归档为 `pepgent-pm/evidence/argon/D13-intent.md` 与 `pepgent-pm/evidence/votes/D13-argon.md`。

---

## 一、`(U)` 意图基线（覆盖 D13-01..D13-04 全部七个相关主题）

### 1. 环境身份（Environment Identity，关联 D13-01..03）

- **`LEDGER.md` 直接原话：**
  - `LEDGER.md` 的 `U1`–`U61` 中**无**直接规定“环境身份 = 镜像 digest + 运行配置哈希”的逐字原话；总括依据见 **U1** 与 **U23**：
    - **(U) `LEDGER.md` U1**：
      > “我需要你自行调查，从昨天开始soroi的重大转向，大部分的设计都存在于昨天的session中，并且文档有很明显的核心议题遗漏……因为我已经在过去的零散对话中已经给出了正确的设计，并且当前的design大部分内容是正确的，只是都只做了半截。另外，对于如何把不成体系的东西串联起来，需要你和讨论者再加argon共同协商，并且不允许偏离我的本意，如何裁决本意由argon说了算。”
    - **(U) `LEDGER.md` U23**：
      > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
- **R1 指向的 10-31 会话 `(U)` 原话（归档于 `inv/s-remote.md`、`rulings-C.md`）：**
  - **(U) `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`**：
    > “接下来是关于远程运行的东西，远程运行时实际上我想兼顾三种后端，komodo对应docker，slum对应实验室常见的集群，然后是标准k8s控制面，这会有多复杂，现在需要评估，然后在eval里要做成非常简单的调用，而不是当场决定非常麻烦的参数传递，对于容器或者pod模板是提前构建的。”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/6431b7aa`**：
    > “有一个问题，运行环境，在这里面怎么指定，我确实执行求值了，在哪求值，要传什么”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/071be582`**（回应 assistant `004e04da` 提出的“函数默认模板、单次调用覆盖、模板包含镜像/集群/设备/挂载”）：
    > “这里面别的我觉得都没问题，command我有很大的顾虑，因为command甚至可能需要dry run”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/8d913d2f` & `#f4c96767`**：
    > “实际上，我想了一下，这东西没这么简单，为什么，你看起来好像是构建命令，而实际上，你还得处理依赖，并把它还原成ts文件，在目标环境执行”
    > “然后还有一点是，package.json怎么办”
- **基线状态判定：**
  - 运行环境模板预先构建、`eval` 调用保持简单、处理依赖并在目标环境还原执行：**`【定】`**。
  - 将捕获身份中的运行环境细化为不可变的 `{ image: ImageDigest, config: ContentHash }`（D4-18）及 `sha256:<64位小写hex>` 编码：无直接 `(U)` 原话规定具体字段与编码格式，在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突】`**。

### 2. 捕获复用（Capture Reuse，关联 D13-01..03）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U1**（把控 soroi 核心基线）、**U23**（走通所有流程）。
- **R1 指向的 10-31 会话 `(U)` 原话（归档于 `pivot-baseline.md`、`rulings-C.md`）：**
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/f1ad9522`**（及 `#ca258d0d`、`01a18e8a #cab573e1`）：
    > 每个中间结果是纯函数式不可变定量（`atom` / `Pure<T>`），必须被消费（捕获或停止）；一个参数可被多处分支消费，每次消费派生新的值。
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`**：
    > Store 是能落盘的状态管理，直接解决后期复用、值存储与捕获，前端连 DSL 都不要了。
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/7ffcea0c`**：
    > “eval里所有的正式远程运行才需要进入store，任何非正式运行从头到尾都不进store，否则为什么叫非正式？”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/32b6f7fd`**：
    > “dry run根本没有store，eval里一个atom什么时候叫成功运行还需要store？”
  - **(U) `session://01a18efe-a680-7642-aff1-6f468cf2935e/entry/9e2d37a1` & `01a18e8a #21495b13`**：
    > “没有重放，这是意淫的东西” / “跑你妈同一份脚本，从来就没有重放”
- **基线状态判定：**
  - 只有正式运行写入 store 并按捕获身份确定性复用，`dry run` 从头到尾不写 store，严禁脚本重放：**`【定】`**。
  - `EnvIdentity` 在插件侧的确定性编码结构以及切换前开发期旧数据不迁移：在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突】`**。

### 3. 部署注入与组件独立归属（Deployment Injection & Component Ownership，关联 D13-01、D13-02）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U1**：
    > “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
  - **(U) `LEDGER.md` U13**：
    > “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  - **(U) `LEDGER.md` U24**：
    > “我需要你转交给argon，不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
- **R1 指向的 10-31 会话 `(U)` 原话（归档于 `rulings-C.md`、`inv/s-remote.md`）：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`**：
    > “首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起……只改连接方式变成远程连接，远程启动，是生是死全部遵照omp既有的生命周期，那么这个实现非常好做，只需要补充，部署，服务发现”
  - **(U) `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6` & `#b45cd22c`**：
    > “然后还有一点，remote实际上是单独的程序” / “这是pepgent的仓库，这是独立程序，单独去开私有仓库”
- **基线状态判定：**
  - `remote` 是独立于 `soroi` 的程序，不把中心 Stack 塞进 `remote` 模板目录或扩大 `remote` 职责去算中心 Stack 身份：**`【定】`**。
  - 部署向中心容器注入 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 及 `["soroi-central-config-v1", entrypoint, command, files]` 投影规则：无直接 `(U)` 原话规定变量名与投影公式，标为 **`【暂定 · 与 (U) 无冲突】`**。

### 4. 远程/中心同一路径（Remote / Central Unified Path，关联 D13-01、D13-03）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U23**：
    > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
- **R1 指向的 10-31 会话 `(U)` 原话（归档于 `rulings-C.md`、`inv/s-remote.md`）：**
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/edbaf573`**：
    > “一种类jotai中间件他负责程序中非agent的部分的捕获，这次输入了什么，输出了什么，而因为他是中间件，所以可以处理非本机的文件捕获”
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a`**：
    > “而，agent的捕获，是纯粹的 自动以工具行为，就比如subagent在omp中必须调用yield返回给主agent信息。那么自定义工具，直接接受subagent给的文件路径，就等于捕获运行时产物，而这个类jotai的中间件，自己完成整个传输和管理部分。”
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640`**：
    > “你以为这样改就能了事？从store拷入运行环境都来了，eval禁止递归嵌套，eval永远只有中心主机能运行”
- **基线状态判定：**
  - `eval` 只在中心主机运行，本机与远程均经同一中间件捕获输入输出与文件：**`【定】`**。
  - 中心与远程的 `EnvIdentity` 采用同构编码（`sha256:<64位小写hex>`）并在 `SOR-07` 中同时接入同一捕获身份公式：标为 **`【暂定 · 与 (U) 无冲突】`**。

### 5. 不推导 / 不兜底与决策边界（No Deduction / No Fallback，关联 D13-01..04）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U11**：
    > “对于缺失的部分，设计的补充，argon拥有一票否决权，并且所有的设计，和重要决策，不允许使用task high以下的模型参与，只能是你，你的分身，task high，argon，导师。”
  - **(U) `LEDGER.md` U12**：
    > “对于决策，遵照正常的民主投票，但是投票的对象并不是方案本身，而是所有的决策项的表格中的条目，每一个条目需要写明what where how，取舍”
  - **(U) `LEDGER.md` U20**：
    > “argon 的裁决必须引用 (U) 原文，没有 (U) 证据的裁决只能算"暂定"，不能行使否决。分类有争议时，默认归为技术项，或者交给 mentor 仲裁。”
  - **(U) `LEDGER.md` U26**：
    > “在任务足够清晰，设计足够可靠，决策项足够小，任务不是很庞大的时候，task low和task free都十分可靠”
  - **(U) `LEDGER.md` U38**：
    > “你这死妈废物就这么喜欢把权力拿在自己手里，你也配？”
  - **(U) `LEDGER.md` U39**：
    > “你这死妈畜生拿劣质借口妄想取消领导层？”
  - **(U) `LEDGER.md` U56**：
    > “这个agent不要偏离我的指挥的原意”
- **R1 指向的 10-31 会话 `(U)` 原话（归档于 `rulings-C.md` C-5）：**
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a` & `01a18e1f #c1ef8567`**：
    > 唯一交回通道，严禁未调用工具时用最后一条回复兜底（C-5 `【定】`）。
- **基线状态判定：**
  - 契约缺口必须回领导小组按条目表决，不让实现工程师靠猜或兜底（U11、U12、U26、U38、U39）：**`【定】`**。
  - 插件不从容器 `process.env`（混有凭据）或 Docker tag 推导中心身份，Lab 不靠扫描目录或按文件名拼接推导 omp 的私有 transcript 路径：**`【暂定 · 符合权威源头规则与 (U) 不兜底精神】`**。

### 6. 开发顺序（Development Sequence，关联 D13-02、D13-03）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U2**：
    > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩，并且要随时随地用agents.md主动维护好进度……你自己的session是领导人团队，而工程师，实现者，测试，则是tern中各自其他目录的完整agent，并且他们自己可以派生自己的subagent做实现。”
  - **(U) `LEDGER.md` U30**：
    > “我不知为何你要在最初把仓库合并成一个mono repo，导致一点点小改动要验收整个soroi，而过去了几个小时根本没做多少功能，所有的ai都在互相等待”
  - **(U) `LEDGER.md` U32**：
    > “agents.md的所有要求我看你是完全当个屁放了，引入过多的中间环节做e2e而不是把东西开发好后再做e2e测试是你一开始规划的就有问题，而合并仓库让e2e的成本变的巨高”
- **基线状态判定：**
  - 先完成各组件开发实现（本仓局部检查），全部组件开发完成后再统一组装执行全流程 e2e 测试（F01–F32 不收缩）：**`【定】`**。

### 7. 停驻会话 transcript 与讨论一人一会话、宿主不改代码（关联 D13-04）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U13**：
    > “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  - **(U) `LEDGER.md` U23**：
    > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
- **R1 指向的 10-31 / 11-01 会话 `(U)` 原话（归档于 `inv/s-subagent.md`、`inv/s-pepgent.md`、`votes/D7-argon.md`）：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/678fe41a`**（2026-10-31 04:39:09，`inv/s-subagent.md:45-46`、`pivot-baseline.md` PB-07）：
    > “这两种方法都是要对核心机制大改，pi实际上有一个问题所以我不想用他，pi是纯无状态应用，他没有omp用来挂接到agent上的状态管理，而soroi的工作流程肉眼可见的可能会唤醒一个早就死掉的session”
  - **(U) `session://01a18f4a-a79c-77de-b951-7efecf85ac21/entry/f488be08`**（2026-10-31 09:12:17，`rulings-C.md:29-30`）：
    > “不可以改omp核心，必须只能是插件，生命周期和irc全方位对标omp内置subagent，不考虑两侧版本一致，乃至不考虑版本问题，只考虑rpc模式能正常通讯”
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/2dbf970b`**（2026-10-31 04:40:40，`rulings-C.md:165-166`）：
    > “而还有一个问题是，如果重新实现subagent，那么对于gui来说可见任意的agent更好做了，因为本来就是rpc启动的，而rpc实际上本来就要额外做只读层面的多路复用”
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410` & `#e3692177`**（2026-10-31 03:54:42 / 04:03:59，`votes/D7-argon.md:23-25`）：
    > “全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了” / “大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”
  - **(U) `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`**（2026-11-01，`inv/s-pepgent.md:97,102`）：
    > `multi_human: 裁掉：一人一会话`
- **基线状态判定：**
  - 核心 AI harness 必须以 `omp` 为核心且**不修改 `omp` 宿主代码**（**U13**、`01a18f4a #f488be08`），会话状态与历史归 `omp` 自身管理（`01a18e1f #678fe41a`），业务层讨论为一人一会话且对 GUI 可见（`01a192a2 #ed4570ad`、`01a18e1f #2dbf970b`）：**`【定】`**。
  - Lab 在 `conversation` 表中新增 `session_file` 列保存 `get_state.sessionFile` 原样路径供停驻时无唤醒只读 jsonl：无直接 `(U)` 原话规定该表结构列名，属落实 D7-07、P2 与 D3-11 的串联补充，在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突】`**。

---

## 二、对改写后 D13-01..D13-04 的逐条意图裁决与否决审查

| 条目 | 是否与 `(U)` 冲突 | 意图裁决状态（`【定】` / `【暂定】`） | 缺失部分或设计补充? | 是否行使一票否决权 | 裁决理由与 `(U)` 依据 |
| --- | --- | --- | --- | --- | --- |
| **D13-01**<br>中心环境身份的注入接口 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（其中不扩充 `remote` 职责、不把中心登记为 `remote` 模板符合 **U1【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** `(U)` 未指定 `SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST` 的变量名与 `sha256:<64位小写hex>` 编码，故接口细节标为 **【暂定】**。<br>2. **守住 `(U)` 边界：** 拒绝让 `remote` 新增“算任意 Stack 身份”或把中心登记成 `remote` 模板，守住 **(U) `LEDGER.md` U1**（`remote` 独立于 `soroi`）与 **(U) `01a18e1f #5a37a640`**（`eval` 只在中心运行）；拒绝让插件在容器内自算 `config`（容器 `env` 混有凭据），守住凭据与权威源头边界。 |
| **D13-02**<br>中心身份值由谁、按什么规则产生 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（其中开发期各入口自给、统一阶段组装符合 **U2、U30、U32【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** `(U)` 未规定 `["soroi-central-config-v1", entrypoint, command, files]` 的具体投影格式，故该投影公式标为 **【暂定】**。<br>2. **守住 `(U)` 边界：** 明确统一投影规则使 `Pepgent/deploy`、`Pepgent/soroi` compose 与宿主机/A0 启动入口算出同一语义的 `config` digest，避免工程师各猜一套（符合 **(U) U11、U12、U26**）；声明中保持写镜像 tag、部署时解析为 `<repo>@<digest>` 运行并注入，遵守不钉版本号规则与权威同源。 |
| **D13-03**<br>SOR-07 一次切换捕获身份公式 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（开发期不设中间态符合 **U30、U32【定】**） | 否 | **不适用 / 否** | 1. **无 `(U)` 冲突：** 在 `SOR-07` 单 PR 内同时接入中心身份与远程 `remote templates` 身份、插件侧对 `{ kind, image, config }` 做确定性编码、不迁移开发期旧捕获，与 `(U)` 无任何冲突，标为 **【暂定】**。<br>2. **符合 D8 与开发顺序：** 完整落实 `D8-mvp-scope.md:289` 的 `SOR-07` 范围，符合 **(U) U32** 开发期直推实现的节奏。 |
| **D13-04**<br>停驻会话 transcript 的持久引用 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（不改 `omp` 宿主代码、transcript 归 `omp` 符合 **U13、`01a18e1f #678fe41a`【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** `(U)` 未直接规定 `conversation.session_file` 列名，标为 **【暂定】**。<br>2. **守住 `(U)` 边界：** 直接复用 `omp --mode rpc` 既有的 `get_state.sessionFile` 返回值作为持久化外部索引，既避免了“要求 `omp` 新增无唤醒路径解析接口”（严守 **(U) `LEDGER.md` U13** 与 **`01a18f4a #f488be08`**“不修改 omp 的宿主代码”），又避免了复制 transcript 内容或靠猜 `omp` 私有目录布局推导路径（严守 **(U) `01a18e1f #678fe41a`** 会话状态管理归 `omp`），完整闭合 D7-07、P2 与 D3-11。 |

---

## 三、对每条分类（意图 / 技术 / 串联 / 实现）的意见

依据 `LEDGER.md` **U20** 与 `AGENTS.md` **D1-17**，我对改写后四条分类的审查意见如下：

1. **`D13-01`（草稿：串联 / 补）：同意标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** 定义部署容器环境变量与插件 Main 启动配置之间的跨组件注入接口与类型边界，属落实 D4-18 的跨组件串联补充。
2. **`D13-02`（草稿：串联 / 补）：同意标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** 规定 `Pepgent/deploy`、`Pepgent/soroi` compose 及各 Main 启动入口产生 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 的统一投影公式与生产职责，属跨组件串联补充。
3. **`D13-03`（草稿：实现 / 否）：同意标为 `实现`（否），不主张改为 `意图`。**
   - **理由：** 落实 D4-18 与 D8 `SOR-07` 已定的范围，在插件内一次性切换捕获身份公式并定义插件侧确定性编码，不涉及新意图裁决。
4. **`D13-04`（草稿：串联 / 补）：同意标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** 将 `omp` RPC `get_state` 在线返回的 `sessionFile` 索引持久化到 `Pepgent/Pepgent` 的 `conversation.session_file` 列，以兑现 D7-07 / P2 / D3-11“停驻会话不唤醒读 transcript jsonl”，属于 `omp` 宿主与 Lab 后端之间的串联补充。

---

## 四、Argon 族选票与理由（按条目投票，依 D1-12）

| ID | 草稿分类 | 缺失/补充 | Argon 投票 | 投票理由 |
| --- | --- | --- | --- | --- |
| **D13-01** | 串联 | 补 | **赞成** | 1. **解析时机与角色边界清晰：** 将 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 放在插件启动处（与 `SOROI_STORE_URL` 同处）一次解析并显式传入 `eval`，不在每次调用路径上重复读 `process.env`；用独立的带 `sha256:` 前缀 digest 类型表示，不与 store 不带前缀的 `HashSchema`（`contract.ts:3`）混用；`LocalChild`、`RemoteChild` 的 `installChild` 不读取、不要求这两个变量（注：后续 `SOR-12` 接入 `writesEval: true` 的中心 worker 时，与 `SOROI_STORE_URL` 同处读取即可，且 `supervisor.ts:605-613` 已透传 `process.env`）。<br>2. **落选理由扎实：** 容器 `env` 混有 `BETTER_AUTH_SECRET`、`MUX_AUTH_TOKEN`、gateway token 等凭据，插件在容器内无法区分凭据与普通配置；借 `remote` 算中心 Stack 则违背 `remote` 职责边界（D2-09、D4-04、D4-17）。由部署注入是唯一干净路径。 |
| **D13-02** | 串联 | 补 | **赞成** | 1. **统一可审计的正面投影公式：** 定下 `["soroi-central-config-v1", entrypoint, command, files]` 的无空白 UTF-8 JSON `sha256` 公式，正面只纳入容器 `entrypoint`、`command`（插值后 argv）以及中心 `omp` 实际加载的 `/run/config/models.yml`、`/run/config/config.yml` 内容哈希，排除了 `BETTER_AUTH_URL`、`PORT`、`remote.toml` 等无关字段及凭据，既保证 `Pepgent/deploy` 与 `Pepgent/soroi` 算出一致身份，又避免无关配置改动导致中心捕获全量失效。<br>2. **生产方与 Komodo 接线完整：** 明确了 `central.py apply` 在 `DeployStack` 前解析 `LAB_WEB_IMAGE` 为 `<repo>@<digest>` 写入普通 Komodo Variable（四个共用服务同源切换为 digest 运行）并注入两个身份 Variable，同时覆盖了 `compose.yaml` `central` 及 A0 / DIST-01 / 宿主机驱动等全部 Main 启动入口。 |
| **D13-03** | 实现 | 否 | **赞成** | 1. **闭合插件侧确定性编码与单 PR 切换：** 明确中心与远程 `EnvIdentity` 的 `kind`、`image`、`config` 均以确定性结构进入插件捕获身份公式，store 侧继续将其视为不透明的 64 位 hex 键（`contract.ts` 无需改动），且不绑定拆仓前后的仓库名。<br>2. **无中间态与死代码：** 在 `SOR-07` 一个 PR 内同时切换中心与远程环境身份，开发期旧捕获不迁移、不保留旧公式兜底，符合 clean cutover 与 D10-00。 |
| **D13-04** | 串联 | 补 | **赞成** | 1. **严守权威源头与“不唤醒、不推导、不改 omp 核心”：** 在 `eng-lab3` 现有的 `sessions.ts:84,224,251-253` 中，`ensureLive()` 启动一代后本就会调用 `get_state` 获取 `sessionId`；同处将 `get_state` 原样返回的 `sessionFile` 写入 `conversation.session_file`（保持 `session_id` 与 `session_file` 同空同非空），使 `LAB-11a` 在会话停驻及 Lab 重启后都能直接按该索引读取 jsonl，不唤醒停驻进程（守住 D3-11、D7-07），不扫描或猜写 `omp` 内部路径，也不修改 `omp` 宿主代码（守住 U13）。<br>2. **记录性质明确：** `session_file` 只是指向 `omp` 所拥有 transcript 文件的持久索引，不复制消息内容，transcript 的唯一权威仍是 `omp`。 |

## 第三轮补充原文

# D13 第三轮修订（D13-02、D13-04 改写与新增 D13-05）— Argon 补充 `(U)` 基线、逐条裁决、分类意见与选票

> **说明：** `D13-01`、`D13-03` 未改动，维持第二轮裁决与**赞成**票不变。下文给出新增 **D13-05 的 `(U)` 意图基线**，以及改写后 **D13-02、D13-04、D13-05** 的完整意图裁决、否决审查、分类意见与选票段落（并附 D13-01..D13-05 全表汇总，供秘书直接合并归档至 `pepgent-pm/evidence/argon/D13-intent.md` 与 `pepgent-pm/evidence/votes/D13-argon.md`）。

---

## 一、新增 D13-05 的 `(U)` 意图基线（补入报告第一节第 8 项）

### 8. 本机 `Program` runner 的可见环境与显式输入捕获、凭据隔离（关联 D13-05、D13-02）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U1**（保持原始设计意图，把控 soroi 核心基线）、**U23**（走通用户说过的所有流程）。
- **R1 指向的 10-31 会话 `(U)` 原话（归档于 `pivot-baseline.md`、`rulings-C.md`、`inv/s-remote.md`）：**
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/edbaf573`**（`inv/s-remote.md:34-36`）：
    > “一种类jotai中间件他负责程序中非agent的部分的捕获，这次输入了什么，输出了什么，而因为他是中间件，所以可以处理非本机的文件捕获”
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/f1ad9522`** & **`01a18e1f #64246eaf`**（`pivot-baseline.md` PB-04、PB-08）：
    > 程序中只有定量没有变量，每个中间结果是不可变 `atom`，Store 按捕获身份确定性复用。
  - **(U) `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/276d1776`** & **`#13abc2a1`**（`pivot-baseline.md` PB-04）：
    > 节点函数调用的参数只能是显式命名的 `atom`，禁止魔法值与隐式传参。
- **基线状态判定：**
  - `Program` 节点的输入输出由中间件完整捕获、外部业务输入必须经显式 `atom` 参数传入（从而进入捕获身份 `inputs`）、不能靠偷读未计入捕获身份的宿主进程环境变量隐式传参：**`【定】`**。
  - 将 `execute.ts` 的 `runNode` 传给本机 `Program` runner 的 `env` 从 `{ ...process.env, BUN_BE_BUN: "1" }` 收窄为固定集合 `{ PATH, HOME, BUN_BE_BUN: "1" }`（既隔离中心容器的 `BETTER_AUTH_SECRET`、`MUX_AUTH_TOKEN`、gateway token 等凭据，又与 D13-02 的配置窄投影严密闭合）：无直接 `(U)` 原话规定这 3 个环境变量白名单，属技术补充，在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突，符合显式 atom 捕获与凭据隔离本意】`**。

---

## 二、对 D13-02、D13-04、D13-05 的逐条意图裁决与否决审查（替换/补入报告第二节）

| 条目 | 是否与 `(U)` 冲突 | 意图裁决状态（`【定】` / `【暂定】`） | 缺失部分或设计补充? | 是否行使一票否决权 | 裁决理由与 `(U)` 依据 |
| --- | --- | --- | --- | --- | --- |
| **D13-02**<br>中心身份值由谁、按什么规则产生 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（开发期各入口自给、统一阶段组装符合 **U2、U30、U32【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** `(U)` 未规定 `["soroi-central-config-v1", entrypoint, command, files]` 的具体投影格式，标为 **【暂定】**。<br>2. **补齐入口脚本与 image 来源：** 将容器入口脚本（deploy 的 `/run/config/lab-entrypoint.sh`，standalone 的 `/run/config/central-entrypoint.sh` 与 `/run/config/startup.yml`）同 `/run/config/models.yml`、`/run/config/config.yml` 一起纳入 `files` 哈希，并将 `image` 统一表述为“入口取得本次实际运行镜像的 digest 引用 `<repo>@<digest>`，容器以它运行，同一 digest 注入 `SOROI_CENTRAL_IMAGE_DIGEST`”，配合 D13-05 收窄本机 `Program` 可见环境，使影响中心执行的全部容器级输入均被 `image` + `config` 覆盖，且声明继续写 tag 不钉版本，完全符合 **(U) U11、U12、U26** 与工程规则。 |
| **D13-04**<br>停驻会话 transcript 的持久引用 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（不改 `omp` 宿主代码、transcript 归 `omp` 符合 **U13、`01a18e1f #678fe41a`【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** `(U)` 未规定 `conversation.session_file` 的可空性或两处写入回调细节，标为 **【暂定】**。<br>2. **守住 `(U)` 边界并贴合现码：** 复用 `sessions.ts:84` `ensureLive()` 已有的那一次 `get_state` 调用（将 `ompState` 中 `sessionFile` 改为必填），在新会话 `open()` 插入行（`:251-253`）与已有会话开新一代 `onIdentity` 更新（`:222-224`）两处同步写入 `sessionId` 与 `sessionFile`，迁移只加可空列、不回填旧行，且明确拒绝改由 Lab 自定 `--session <file>` 写会话头或改 `omp` 宿主代码（守住 **(U) U13** 与 **`01a18e1f #678fe41a`**）。 |
| **D13-05**<br>本机 Program runner 的可见环境 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（`Program` 输入由中间件经显式 `atom` 捕获符合 **`01a18dd4 #edbaf573, #f1ad9522`【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** `(U)` 未直接指定 `runNode` 子进程的环境变量白名单 `{ PATH, HOME, BUN_BE_BUN: "1" }`，标为 **【暂定】**。<br>2. **符合显式捕获与凭据隔离：** 停止向本机 `Program` runner 透传中心容器的 `process.env`，既防止 `Program` 节点代码读取未计入捕获身份的部署环境变量造成错误复用（**(U) `01a18dd4 #edbaf573`、`01a18e1f #64246eaf`**），又防止中心容器内的 `BETTER_AUTH_SECRET`、`MUX_AUTH_TOKEN`、gateway token 暴露给节点代码（对齐 D4-10 与凭据规则），且不影响经 `LocalChild` 启动的本机 `Agent` 体。 |

---

## 三、对 D13-02、D13-04、D13-05 分类的意见（替换/补入报告第三节）

依据 `LEDGER.md` **U20** 与 `AGENTS.md` **D1-17**，我对这三条分类的审查意见如下：

1. **`D13-02`（草稿：串联 / 补）：同意标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** 规定 `Pepgent/deploy`、`Pepgent/soroi` compose 及各 Main 启动入口产生 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 的统一投影公式（含入口脚本与 omp 配置文件）及生产职责，属跨组件串联补充。
2. **`D13-04`（草稿：串联 / 补）：同意标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** 将 `omp` RPC `get_state` 返回的 `sessionFile` 索引在 `ensureLive()` 的两处写路径持久化到 `Pepgent/Pepgent` 的 `conversation.session_file` 可空列，供 `LAB-11a` 停驻会话无唤醒读取 jsonl，属 `omp` 宿主与 Lab 后端之间的串联补充。
3. **`D13-05`（草稿：技术 / 补）：同意标为 `技术`（补），不主张改为 `意图`。**
   - **理由：** 收窄 `packages/omp-soroi` 内 `execute.ts` `runNode` 传给本机 `Program` runner 子进程的环境变量集合，用以闭合 D13-02 的配置窄投影并隔离中心凭据，属于插件执行器边界上的技术补充。

---

## 四、D13-01..D13-05 全表选票与理由（供秘书归档 `evidence/votes/D13-argon.md`）

| ID | 草稿分类 | 缺失/补充 | Argon 意图裁决 | Argon 投票 | 投票理由 |
| --- | --- | --- | --- | --- | --- |
| **D13-01** | 串联 | 补 | 【暂定 · 与 `(U)` 无冲突】 | **赞成** | 沿用第二轮赞成票：在 Main 启动处（与 `SOROI_STORE_URL` 同处）一次解析 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST`（独立 `sha256:<64位小写hex>` 类型，不混用 store `HashSchema`），`LocalChild`/`RemoteChild` 不读取不要求，插件只消费不推导，守住 `remote` 独立边界（U1、D4-18）。 |
| **D13-02** | 串联 | 补 | 【暂定 · 与 `(U)` 无冲突】 | **赞成** | 1. **补齐入口脚本哈希，闭合配置投影：** 将容器入口脚本（deploy `/run/config/lab-entrypoint.sh`，standalone `/run/config/central-entrypoint.sh` 与 `/run/config/startup.yml`）与 `/run/config/models.yml`、`/run/config/config.yml` 一并纳入 `files` 字典序数组，覆盖了决定 `PATH`、`HOME` 及 omp 启动参数（`lab-entrypoint.sh:6-23`、`central-entrypoint.sh:5-23`）的全部挂载配置字节。<br>2. **image 来源与生产方清晰：** 统一表述为入口取得本次实际运行镜像的 `<repo>@<digest>` 引用（deploy 解析声明中的 tag，e2e 消费构建记录 digest），容器运行与 `SOROI_CENTRAL_IMAGE_DIGEST` 注入同源，且声明不钉版本号。 |
| **D13-03** | 实现 | 否 | 【暂定 · 与 `(U)` 无冲突】 | **赞成** | 沿用第二轮赞成票：`SOR-07` 单 PR 同时切换中心与远程 `EnvIdentity`（`kind`、`image`、`config` 确定性编码），store 仍视作不透明 64 位 hex 键，开发期旧捕获不迁移、不保留旧公式（U32、D10-00）。 |
| **D13-04** | 串联 | 补 | 【暂定 · 与 `(U)` 无冲突】 | **赞成** | 1. **精确贴合 `sessions.ts` 现有生命周期：** `ensureLive()`（`sessions.ts:77-95`）每开一代本就调用一次 `get_state`；将 `ompState` 的 `sessionFile` 改为必填，并在新会话 `open()` 插入（`:251-253`）与已有会话 `onIdentity` 更新（`:222-224`）两处同步写入可空列 `conversation.session_file`，零额外 RPC 往返，迁移只加列不回填，主路径干净闭合。<br>2. **严守权威源头与宿主边界：** Lab 与根 `omp` 同容器、同 `omp-sessions` 卷，停驻时直接按 `session_file` 读 jsonl，不唤醒（D3-11、D7-07）、不猜路径、不改 `omp` 宿主代码（U13），也不让 Lab 越界自写 `omp` 会话文件头。 |
| **D13-05** | 技术 | 补 | 【暂定 · 与 `(U)` 无冲突】 | **赞成** | 1. **消除隐式环境输入，闭合 D13-02 窄投影：** 将 `execute.ts:258-259` `runNode` 的 `env` 收窄为固定集合 `{ PATH, HOME, BUN_BE_BUN: "1" }`（其中 `PATH` 与 `HOME` 由镜像和入口脚本决定，已纳入 D13-02 的 `image` 与 `files` 身份），使容器 `process.env` 中未纳入身份的变量不再成为本机 `Program` 的隐藏输入，外部参数一律经显式 `atom` 传入（符合 `01a18dd4 #edbaf573, #f1ad9522`）。<br>2. **隔离中心凭据并对齐远程语义：** 阻止中心容器的 `BETTER_AUTH_SECRET`、`MUX_AUTH_TOKEN`、`PEPGENT_GATEWAY_TOKEN` 暴露给本机 `Program` 节点代码（符合凭据规则与 D4-10），本机 `Agent` 体仍经 `LocalChild` 正常运行不受影响。 |
