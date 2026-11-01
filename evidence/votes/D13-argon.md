# D13 Argon 各轮选票原文

最终有效票：D13-01、D13-03 沿用第二轮；D13-05 以第四轮为准；D13-02、D13-04 以第五轮为准。五项均赞成，未行使否决。旧轮次原样保留，不作为现行契约。

## 第1轮原文

# D13 实现期跨组件契约缺口（批次）— Argon `(U)` 意图基线、逐条裁决、分类意见与选票

---

## 一、`(U)` 意图基线（引 `LEDGER.md` U 编号与逐字原文，并附 R1 归档的 10-31 会话 `(U)` 原文）

> **证据口径说明（依 `LEDGER.md` U20 / `AGENTS.md` D1-16）：**
> `LEDGER.md` 直接收录了 `U1`–`U61` 逐字原话，并在 **R1（出自 U1）** 中明确“从 2026-10-31 开始的 soroi 重大转向；设计主要在 10-31 的 session 里”（对应已归档于 `pepgent-pm/evidence/argon/pivot-baseline.md`、`rulings-C.md`、`inv/s-remote.md` 的 `(U)` 会话原话）。下表按六个主题列出 **`LEDGER.md` 的 U 编号与逐字原文**，并并列补充 R1 指向的 **10-31 会话 `(U)` entry 原文**；凡 `(U)` 原话未直接规定具体接口名或哈希格式的事项，一律显式标为 **`【暂定】`**。

### 1. 环境身份（Environment Identity）

- **`LEDGER.md` 直接原话：**
  - `LEDGER.md` 的 `U1`–`U61` 中**无**直接規定“环境身份 = 镜像 digest + 运行配置哈希”的逐字原话；相关总括要求见 **U1** 与 **U23**：
    - **(U) `LEDGER.md` U1**：
      > “我需要你自行调查，从昨天开始soroi的重大转向，大部分的设计都存在于昨天的session中，并且文档有很明显的核心议题遗漏……因为我已经在过去的零散对话中已经给出了正确的设计，并且当前的design大部分内容是正确的，只是都只做了半截。另外，对于如何把不成体系的东西串联起来，需要你和讨论者再加argon共同协商，并且不允许偏离我的本意，如何裁决本意由argon说了算。”
    - **(U) `LEDGER.md` U23**：
      > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心，并且最后能在这个基础上知道pepgent和soroi之间缺失的点，线，面”
- **R1 指向的 10-31 会话 `(U)` 原话（已归档于 `inv/s-remote.md`、`rulings-C.md`）：**
  - **(U) `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/c5030836`**：
    > “接下来是关于远程运行的东西，远程运行时实际上我想兼顾三种后端，komodo对应docker，slum对应实验室常见的集群，然后是标准k8s控制面，这会有多复杂，现在需要评估，然后在eval里要做成非常简单的调用，而不是当场决定非常麻烦的参数传递，对于容器或者pod模板是提前构建的。”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/6431b7aa`**：
    > “有一个问题，运行环境，在这里面怎么指定，我确实执行求值了，在哪求值，要传什么”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/071be582`**（对 assistant `004e04da` 提出“函数默认模板、单次调用覆盖、模板含镜像/集群/设备/挂载”的回应）：
    > “这里面别的我觉得都没问题，command我有很大的顾虑，因为command甚至可能需要dry run”
  - **(U) `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/8d913d2f` & `#f4c96767`**：
    > “实际上，我想了一下，这东西没这么简单，为什么，你看起来好像是构建命令，而实际上，你还得处理依赖，并把它还原成ts文件，在目标环境执行”
    > “然后还有一点是，package.json怎么办”
- **基线状态判定：**
  - 容器/环境模板预先构建、`eval` 调用保持简单、处理依赖并在目标环境还原执行：**`【定】`**。
  - 将捕获身份中的运行环境从可变模板名细化为不可变的 `{ image: ImageDigest, config: ContentHash }`（D4-18）及 `sha256:<64位小写hex>` 编码：无直接 `(U)` 原话规定具体字段与编码格式，属 D4 已通过的设计补充，在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突】`**。

### 2. 捕获复用（Capture Reuse）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U1**（保持原始设计意图，把控 soroi 核心基线）、**U23**（走通用户说过的所有流程）。
- **R1 指向的 10-31 会话 `(U)` 原话（已归档于 `pivot-baseline.md`、`rulings-C.md`）：**
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
  - 捕获身份公式中 `EnvIdentity` 的具体元组结构与切换前开发期旧数据不迁移：在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突】`**。

### 3. 部署注入与组件归属边界（Deployment Injection & Component Ownership）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U1**：
    > “对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好”
  - **(U) `LEDGER.md` U13**：
    > “对于实现，我允许你使用成熟的开源且协议友好的现成方案，而不是所有东西都自造，但是对于核心的ai harness，不能偏离以omp为核心，不修改omp的宿主代码”
  - **(U) `LEDGER.md` U24**：
    > “我需要你转交给argon，不要混淆soroi和omomp，soroi并不是完全基于omomp的，他提出的fork在soroi根本不应该存在，soroi是独立的omp定制”
- **R1 指向的 10-31 会话 `(U)` 原话（已归档于 `rulings-C.md`、`inv/s-remote.md`）：**
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/9c291fe2`**：
    > “首先，运行肯定是要对标主agent的，否则，omp的定制之类的不生效捕获无从谈起……只改连接方式变成远程连接，远程启动，是生是死全部遵照omp既有的生命周期，那么这个实现非常好做，只需要补充，部署，服务发现”
  - **(U) `session://01a18e3a-ce1a-72bf-9efc-189705cf936e/entry/3afc3fb6` & `#b45cd22c`**：
    > “然后还有一点，remote实际上是单独的程序” / “这是pepgent的仓库，这是独立程序，单独去开私有仓库”
- **基线状态判定：**
  - `remote` 独立于 `soroi`、中心执行不经过 `remote` 模板目录，远程与中心对标同一套独立的 `soroi` omp 定制：**`【定】`**。
  - 部署向中心容器注入 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 两个环境变量及其投影计算边界：无直接 `(U)` 原话指定变量名与投影细节，属落实 D4-18 的串联设计，标为 **`【暂定 · 与 (U) 无冲突】`**。

### 4. 远程/中心同一路径（Remote / Central Unified Path）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U23**：
    > “对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
- **R1 指向的 10-31 会话 `(U)` 原话（已归档于 `rulings-C.md`、`inv/s-remote.md`）：**
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/edbaf573`**：
    > “一种类jotai中间件他负责程序中非agent的部分的捕获，这次输入了什么，输出了什么，而因为他是中间件，所以可以处理非本机的文件捕获”
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a`**：
    > “而，agent的捕获，是纯粹的 自动以工具行为，就比如subagent在omp中必须调用yield返回给主agent信息。那么自定义工具，直接接受subagent给的文件路径，就等于捕获运行时产物，而这个类jotai的中间件，自己完成整个传输和管理部分。”
  - **(U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/5a37a640`**：
    > “你以为这样改就能了事？从store拷入运行环境都来了，eval禁止递归嵌套，eval永远只有中心主机能运行”
- **基线状态判定：**
  - `eval` 只在中心主机运行，本机与远程均由同一类 jotai 中间件统一捕获输入输出与文件，远程 `Agent` 对标中心主 agent 定制并通过唯一交回工具返回：**`【定】`**。
  - 中心与远程的 `EnvIdentity` 均采用 `{ kind, image: "sha256:...", config: "sha256:..." }` 同构编码进入同一捕获身份公式：在 `(U)` 层面标为 **`【暂定 · 与 (U) 无冲突】`**。

### 5. 不推导 / 不兜底与决策边界（No Deduction / No Fallback & Governance Boundary）

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
- **R1 指向的 10-31 会话 `(U)` 原话（已归档于 `rulings-C.md` C-5）：**
  - **(U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/49e6867a` & `01a18e1f #c1ef8567`**：
    > 唯一交回通道，严禁未调用工具时用最后一条回复兜底（C-5 `【定】`）。
  - **(U) `session://01a18ed5-5798-704f-aa9f-c28be4023631/entry/13abc2a1` & `#276d1776`**：
    > 禁止魔法值、禁止让弱模型靠猜拼名字。
- **基线状态判定：**
  - 跨组件契约缺口必须由领导小组按条目（what/where/how/取舍）表决，严禁 leader 单方拍板或下放给工程师靠猜/兜底推导（U11、U12、U26、U38、U39）：**`【定】`**。
  - 插件不从 Docker socket 或可变镜像标签推导中心身份，而是直接消费部署权威注入的不可变 digest：**`【暂定 · 符合权威源头规则与 (U) 不兜底精神】`**。

### 6. 开发顺序（Development Sequence）

- **`LEDGER.md` 直接原话：**
  - **(U) `LEDGER.md` U2**：
    > “这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩，并且要随时随地用agents.md主动维护好进度……你自己的session是领导人团队，而工程师，实现者，测试，则是tern中各自其他目录的完整agent，并且他们自己可以派生自己的subagent做实现。对于多面的任务，我推荐你fork自己作为分身专职处理，分身可以有效分担注意力。”
  - **(U) `LEDGER.md` U30**：
    > “我不知为何你要在最初把仓库合并成一个mono repo，导致一点点小改动要验收整个soroi，而过去了几个小时根本没做多少功能，所有的ai都在互相等待”
  - **(U) `LEDGER.md` U32**：
    > “agents.md的所有要求我看你是完全当个屁放了，引入过多的中间环节做e2e而不是把东西开发好后再做e2e测试是你一开始规划的就有问题，而合并仓库让e2e的成本变的巨高”
- **基线状态判定：**
  - 先完成各组件开发实现（本仓局部自测，不设开发期跨组件全栈 e2e 门禁），待全部组件开发完成后再统一组装执行全流程 e2e 测试（F01–F32 不收缩）：**`【定】`**（见 `argon/D10-intent.md` 裁决 1.1）。

---

## 二、对 D13-01、D13-02、D13-03 的逐条意图裁决与否决审查

| 条目 | 是否与 `(U)` 冲突 | 意图裁决状态（`【定】` / `【暂定】`） | 是否属于“缺失部分或设计补充” | 是否行使一票否决权 | 裁决理由与 `(U)` 依据 |
| --- | --- | --- | --- | --- | --- |
| **D13-01**<br>中心环境身份的注入接口 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（其中“不把中心登记成 remote 模板”符合 **U1【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** 用户在 `(U)` 中未指定中心容器环境身份的具体环境变量名（`SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`）及 `sha256:<64hex>` 编码，故该接口命名与编码在 `(U)` 意图层面标为 **【暂定】**。<br>2. **符合已有 `(U)` 边界：** 条目拒绝“把中心 Stack 登记成 remote 模板借 remote 算身份”，严格守住了 **(U) `LEDGER.md` U1**（“就像remote一样他本质上不属于soroi是独立存在”）与 **(U) `01a18e1f #5a37a640`**（“eval永远只有中心主机能运行”）；同时由领导小组表决补齐契约空白、不让工程师在 `SOR-07` 中自行猜写或用字面量 `"central"` 兜底，符合 **(U) U11、U12、U26、U38、U39**。<br>3. **不行使否决：** 该设计补充忠实落实了已通过决策 D4-18（`D4-remote-exec.md:64,80-83`），不偏离任何用户本意。 |
| **D13-02**<br>中心身份值由谁、按什么规则产生 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（其中开发期本仓局部验证、e2e 阶段统一组装符合 **U2、U30、U32【定】**） | 是（补） | **否（不行使否决）** | 1. **无 `(U)` 冲突：** 用户在 `(U)` 中未规定 `Pepgent/deploy`（`scripts/central.py` / `lab-web`）与 `Pepgent/soroi`（`compose.yaml` `central`）如何解析镜像 manifest digest 及对哪些容器运行配置做 sha256 投影，故具体产生规则标为 **【暂定】**。<br>2. **符合已有 `(U)` 边界：** 将投影的具体字段与规范化写法作为部署方私有实现（占位：假定可按上述范围取到稳定投影），符合设计只写主路径规则与 **(U) U26**（边界锁死后仓内私有实现交工程师）；将 `Pepgent/deploy` 归 `eng-ops`、`Pepgent/soroi` `compose.yaml` 归 `eng-e2e` 且开发期不设跨仓阻塞门禁，符合 **(U) U2、U30、U32**。<br>3. **不行使否决：** 镜像运行引用与注入 digest 同源解析、配置哈希排除凭据变量与自身变量及 release tar（定制身份已由 D4-18 第 3 点单独计入），逻辑闭合且无 `(U)` 冲突。 |
| **D13-03**<br>SOR-07 一次切换捕获身份公式 | **不冲突** | **【暂定 · 与 `(U)` 无冲突】**<br>（开发期不设中间态过渡符合 **U30、U32【定】**） | 否 | **不适用 / 否** | 1. **无 `(U)` 冲突：** 在 `SOR-07` 一个 PR 内同时把中心（D13-01）与远程（`remote templates` 的 `identity`）接入 `captureId`、不迁移开发期旧捕获、不保留旧公式，未违背任何 `(U)` 原话；因 `(U)` 未规定 PR 切分粒度，标为 **【暂定】**。<br>2. **符合已有 `(U)` 边界：** D8 的 `SOR-07`（`D8-mvp-scope.md:289`）本来就要求同时接入中心与远程环境身份，且当前处于 **(U) U32** 确立的“先把东西开发好再做 e2e 测试”的开发阶段，无需为开发期临时数据保留旧公式兼容层。 |

---

## 三、对每条分类（意图 / 技术 / 串联 / 实现）的意见

依据 `LEDGER.md` **U20** 与 `AGENTS.md` **D1-17**（“起草者先为每个决策项标注‘意图 / 技术 / 串联 / 实现’。‘属于意图还是技术’发生争议时，默认归为技术项；argon 若坚持归为意图，交导师仲裁”），我对 D13 三条分类的审查意见如下：

1. **`D13-01`：同意草稿标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** D4-18 已定下“中心容器镜像 digest + 运行配置哈希由部署注入给中心容器”的设计要求；D13-01 解决的是部署容器环境变量（`SOROI_CENTRAL_IMAGE_DIGEST`、`SOROI_CENTRAL_CONFIG_DIGEST`）与 `packages/omp-soroi` eval 模块之间的跨组件接线契约与编码格式（`sha256:<64位小写hex>`），没有直接 `(U)` 原话规定该接口形式，属于标准的跨组件**串联**补充。
2. **`D13-02`：同意草稿标为 `串联`（补），不主张改为 `意图`。**
   - **理由：** D13-02 划分了 `Pepgent/deploy`（`eng-ops`）与 `Pepgent/soroi` `compose.yaml`（`eng-e2e`）两处部署入口产生这两个环境变量的职责与纳入/排除范围，并将具体投影序列化定为部署方私有实现占位，属于跨仓库部署与运行时的**串联**补充，不涉及用户本意裁决。
3. **`D13-03`：同意草稿标为 `实现`（否），不主张改为 `意图`。**
   - **理由：** D4-18 与 D8 `SOR-07`（`D8-mvp-scope.md:289`）已明确規定 `SOR-07` 同时包含中心环境身份与远程 `remote templates.identity`；D13-03 仅确认在 `SOR-07` 单个 PR 中一次切换完成、不留非设计中间态和旧捕获兼容分支，属于纯工程**实现**切分。

---

## 四、Argon 族选票与理由（按条目投票，依 D1-12）

| ID | 草稿分类 | 缺失/补充 | Argon 投票 | 投票理由 |
| --- | --- | --- | --- | --- |
| **D13-01** | 串联 | 补 | **赞成** | 1. **补齐 D4-18 跨组件注入契约：** 明确定义了 `SOROI_CENTRAL_IMAGE_DIGEST` 与 `SOROI_CENTRAL_CONFIG_DIGEST` 两个必填环境变量，编码与 `pepgent-remote/src/model.rs:142-164` 的 `ContentDigest`（`sha256:<64位小写hex>`）完全一致，使 `execute.ts` 能构造与远程同构的 `EnvIdentity { kind: "central", image, config }`，同时保留 store `contract.ts:22-25` 中 `EnvSchema` 的 `{ kind: "central" }` 作为展示与溯源字段（对齐 D4-18 第 4 点）。<br>2. **守住权威源头与组件边界：** 插件只读取部署注入值，不挂载 Docker socket 自查，也不把中心容器伪装成 `remote` 模板（守住 `(U)` U1 与 D4-04、D4-17）。 |
| **D13-02** | 串联 | 补 | **赞成** | 1. **运行事实与身份同源：** 部署入口在部署前将镜像引用解析为 registry manifest digest，容器以 `<repo>@<digest>` 运行并将同一 digest 注入 `SOROI_CENTRAL_IMAGE_DIGEST`，从根源上消除了“标签漂移导致实际运行镜像与注入身份不一致”的可能。<br>2. **配置哈希边界清晰且遵守只写主路径规则：** 纳入影响执行的命令/入口、非凭据环境变量、挂载配置文件内容与挂载目标，明确排除凭据变量（遵守凭据规则与 D4-18）、排除两个身份变量自身（避免循环自指）、排除 `SOROI_RELEASE_TAR`（Agent 定制身份已由 D4-18 第 3 点单独计入），与 `pepgent-remote/src/backend/komodo/identity.rs:290-374` 的设计原则一致；将具体投影写法留作部署方私有实现占位，符合 `.claude/rules/design-assumes-it-works.md` 与 D10-08。 |
| **D13-03** | 实现 | 否 | **赞成** | 1. **一步到位无中间态：** `Pepgent/remote` 的 `REM-05`（`templates` 输出 `identity { image, config }`）已在 main 就绪，D13-01 定下后，`SOR-07` 的两项输入均已齐备；在一个 PR 内同时切换中心与远程的 `captureId` 环境身份参数，完全兑现 `D8-mvp-scope.md:289` 对 `SOR-07` 的定义。<br>2. **干净切换无死代码：** 开发期不迁移旧捕获、不保留旧字符串公式兜底，符合 clean cutover 与 `(U)` U32 / D10-00 的开发顺序。 |

## 第2轮原文

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

## 第3轮原文

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

## 第4轮原文

# D13 第四轮修订（D13-02、D13-05）— Argon 裁决与选票

`D13-01`、`D13-03`、`D13-04` 未改动，维持第三轮裁决与**赞成**票不变。对第四轮改写后的 `D13-02`、`D13-05` 复审裁决与选票如下：

| ID | 草稿分类 | 缺失/补充 | 是否与 `(U)` 冲突 / 意图裁决状态 | 是否行使否决 | Argon 投票 | 裁决与投票理由（附 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- |
| **D13-02**<br>中心身份值由谁、按什么规则产生 | 串联 | 补 | **不冲突**<br>**【暂定 · 与 `(U)` 无冲突】**<br>（开发期各入口自给、统一阶段组装符合 **U2、U30、U32【定】**） | **否** | **赞成** | 1. **分类与意图：** 同意标为 `串联`（补）。正面列举 `["soroi-central-config-v1", entrypoint, command, files]`（含入口脚本与 omp 配置文件）及 `image` 的 `<repo>@<digest>` 同源注入，与 `(U)` 无冲突，标为 **【暂定】**。<br>2. **排除发行 tar 的理由准确：** 现行 D4-02、D4-18 规定 `Program` 捕获身份为 `版本 + 输入身份 + 环境身份`（`Agent` 体另加定制身份），不在 `D13-02` 单侧将发行 tar 并入中心 `config` 哈希，保持了中心与远程（D4-04）捕获公式对称；将“runner 是否进入 `Program` 身份”单列于文末待决缺口而不阻塞 `SOR-07`，符合 D10-08。 |
| **D13-05**<br>中心节点 runner 的可见环境 | 技术 | 补 | **不冲突**<br>**【暂定 · 与 `(U)` 无冲突】**<br>（显式 `atom` 传参捕获符合 **`01a18dd4 #edbaf573, #f1ad9522`**、**`01a18ed5 #276d1776`【定】**；远程凭据由模板部署注入符合 **U1**、**`01a18e3a #c5030836`【定】**） | **否** | **赞成** | 1. **分类与意图：** 同意标为 `技术`（补）。<br>2. **闭合 D13-02 窄投影与 `runNode` 全部入口：** 覆盖 `execute.ts` `runNode` 的全部三个用途（元数据与默认 env 描述、本机 `Program` 执行、`Agent` 体的 prompt 渲染；`LocalChild` 子进程不受影响），将 `env` 固定为插件内常量 `PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin` 与 `BUN_BE_BUN=1`、不传 `HOME`，彻底消除了依赖生产方预演容器内 `PATH`/`HOME` 生效值的复杂度，且该固定 `PATH` 下的系统工具完全由 `SOROI_CENTRAL_IMAGE_DIGEST` 决定。<br>3. **节点契约与实事求是的收益边界：** 明确节点外部值一律经显式 `atom` 参数传入（符合 **(U) `01a18dd4 #edbaf573, #f1ad9522`** 与 **`01a18ed5 #276d1776`**），需要凭据的 `Program` 节点放远程模板由模板部署注入（符合 D4-10），并将安全表述精确限定为“凭据不再经 runner 环境传给节点进程（不是沙箱）”，严谨且无夸大。 |

**汇总：D13 全批次五条（`D13-01`..`D13-05`）Argon 族最终计票为 5 赞成 / 0 反对 / 0 否决。**

## 第5轮原文

# D13 第五轮修订（D13-02、D13-04）— Argon 裁决与选票

`D13-01`、`D13-03`、`D13-05` 未改动，维持前轮裁决与**赞成**票不变。对第五轮按导师反例修订后的 `D13-02`、`D13-04` 复审裁决与选票如下：

| ID | 草稿分类 | 缺失/补充 | 是否与 `(U)` 冲突 / 意图裁决状态 | 是否行使否决 | Argon 投票 | 裁决与投票理由（附 `(U)` 依据） |
| --- | --- | --- | --- | --- | --- | --- |
| **D13-02**<br>中心身份值由谁、按什么规则产生 | 串联 | 补 | **不冲突**<br>**【暂定 · 与 `(U)` 无冲突】** | **否** | **赞成** | 1. **逐字符确定性编码无歧义：** 明确内层文件摘要为 `sha256:<64位小写hex>`、按容器内路径 UTF-8 字节序排列，JSON 文本逐字符等同 ECMAScript `JSON.stringify`（无空白，只转义 `"`、`\` 与 U+0000–U+001F，`/` 与非 ASCII 原样 UTF-8），消除了 Python（`central.py`）与 JS/TS（e2e 入口）跨语言序列化的任何差异。<br>2. **字段集合核实完备：** 现状已核实两处中心容器声明均无 `working_dir`、`user`、`platform`、capabilities 等字段，配合 D13-05 闭合。 |
| **D13-04**<br>停驻会话 transcript 的持久引用 | 串联 | 补 | **不冲突**<br>**【暂定 · 与 `(U)` 无冲突】**<br>（不改 `omp` 宿主代码、transcript 归 `omp` 符合 **U13、`01a18e1f #678fe41a`【定】**） | **否** | **赞成** | 1. **基于实测数据收紧约束：** 实测唯一部署库 `pepgent-central-lab-db/lab.sqlite` 中 `conversation` 为 0 行（`LAB-04` 仍 OPEN），因此从迁移起所有 `session_id` 非空的行 `session_file` 均非空，无需为不存在的历史行留“可空无引用”缺口。<br>2. **主路径闭合：** 复用 `ensureLive()` 既有 `get_state`（`sessionFile` 必填），在 `open()` 插入与 `onIdentity` 更新两处同步写 `session_id` 与 `session_file`，停驻时只读 jsonl 不唤醒、不推导、不改 `omp` 宿主代码（U13、D7-07、D3-11）。 |

**汇总：D13 全批次五条（`D13-01`..`D13-05`）Argon 族最终计票为 5 赞成 / 0 反对 / 0 否决。**
