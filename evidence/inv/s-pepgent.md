# Pepgent 产品、组件归属与纯前端契约调查

## 范围、证据分级与阅读边界

- 本报告调查 2026-10-28..2026-11-01 的产品意图，重点是 `pepgent/pepgent` 中正在进行的 AI4S 纯前端工作，以及其他目录中对完整 Pepgent 与 soroi 边界的直接讨论。没有改仓库、运行测试、查看 git 历史或读取 GitHub issue/PR 历史。
- **(U)** 用户原话或 `ask` 工具记录的用户答案，作为意图证据；**(A)** assistant/agent 的方案、解释或完成声明，只作为其当时的理解/声称；**(D)** 当前工作树文档文本。本报告另明确标出少量当前源码/注释文本，仍归在 (D) 的工作树静态文本证据中，绝不当作 runtime；**(R)** 实际观察的命令/runtime 输出。本次没有启动产品，故没有新增产品 runtime 验证证据。
- 时间戳以下均采用 session timeline 显示的本地时间。session 元数据的 `modified` 可能仅因迁移而更新，不能当作该日存在新的用户决定。例：`01a0cd75-5140-7422-b855-c2ffcf4258be` 虽有 10-31 修改时间，其 10-28..11-01 用户时间过滤返回 0 条；不把 9 月的工作当成本次新设计。（A/会话索引与过滤结果：`session://01a0cd75-5140-7422-b855-c2ffcf4258be/timeline?type=user&since=2026-10-28&until=2026-11-01`）

### 核心 session 索引

| 简称 | Session / cwd | 本报告使用的内容 |
|---|---|---|
| **PRODUCT** | `01a193fd-e992-76d2-8c29-060fe52cc094`，`pepgent-soroi`，11-01 | 用户明确区分完整 Pepgent、soroi、独立组件、纯前端及尚待规划部分 |
| **UI** | `01a192a2-8358-7559-bf46-e3ed6e387d73`，`pepgent/pepgent`，11-01 | 原型落地、ask 答案、组件/数据契约、主题、实现声明、后续间距纠正 |
| **PIVOT** | `01a18e1f-5cf2-7281-bf9a-03d102b315ba`，`redesign-bf9de1c`，10-31 | soroi 改为 omp 内部插件；业务原型；GUI 读写、记录与 store |
| **REMOTE** | `01a18e3a-ce1a-72bf-9efc-189705cf936e`，`redesign-bf9de1c`，10-31 | remote 独立程序、三后端和网络层边界 |
| **MOVE** | `01a19232-1c44-73ee-a77a-1ea7281a935e`，`pepgent-soroi`，10-31..11-01 | 原型最终归入 `pepgent` 业务仓库 |

## 1. Product intent

### 1.1 完整 Pepgent 不是 soroi 的同义词

**最强、最新的直接用户证据**（U，PRODUCT，11-01 07:14:14，entry `57d9d58b`；完整入口 `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/57d9d58b`）：

> 对于soroi的的业务，在pepgent/pepgent目录，并且已有agent在制作纯前端，目前soroi的设计对于完整的pepgent是不够的，另外，soroi本身相当于只是omp的扩展组件，离真正的pepgent还很远，对于pepgent下的组件归属，就像remote一样他本质上不属于soroi是独立存在，后续对于缺失的组件，形态，功能，如何规划，必须由你和argon共同考虑好，argon可以fork出来多个，用于专注于不同方面的考虑，对于subagent的使用。务必，根据业务和架构面的不同各司其职并且以自己的视角和边界思考。而不是由某一个agent带歪。

由这段原话能确定的边界是：

1. **业务应用在 `pepgent/pepgent`**，已有独立前端工作；不是要求把 GUI、所有后端和部署职责都塞进 soroi。（U，同上）
2. **soroi 只是 omp 扩展组件，现有设计不足以组成完整 Pepgent。** 不能用“完成 soroi 插件”替换“完成 Pepgent 产品”。（U，同上）
3. **remote 是 Pepgent 下独立组件，不本质隶属 soroi。** 被 soroi 调用或出现在其组成表中，不等于拥有关系。（U，同上）
4. **缺失组件的形态、功能、归属仍需规划。** 用户没有把这些全数判给 soroi，也没有给出完整新后端架构；本报告不代做该设计。（U，同上）

用户还要求的是完整交付，而非只交纯前端或几个插件：

> 这是一个从设计，到补充，到开仓，到实现，到e2e测试的全流程任务，不要擅自收缩

（U，PRODUCT，11-01 07:18:38，entry `8544bdb8`，`session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`。）

### 1.2 产品的业务面是 AI4S 实验室平台

- 用户将原型直接称为业务层：**“全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了”**。（U，PIVOT，10-31 03:54:42，`e818d410`）随后最新 PRODUCT 原话把这个业务层明确放回完整 Pepgent 语境，不能把早期“soroi 的业务层”解释成所有组件都归 soroi。
- 用户说：**“大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”**。（U，PIVOT，10-31 04:03:59，`e3692177`）因此 pivot 改的是 harness/执行与捕获模型，不是取消实验室产品。
- 原型的现有页面覆盖首页、讨论、数据集、全部实验、实验详情、流程编辑器、节点库、Sandbox 集群、接入集群、容器设置、自动化、设置（成员/项目/代码库/智能体模板），以及 Lab 导航、AI 面板和通用操作表单。（D，`/Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/README.md:1-3,19-36`）这些说明产品表面需要的能力，**不证明每项后端已存在，也不独立证明每个原型行为都是最终业务决定**。
- 原型最终归业务仓库：用户先说 **“把AI4S-prototype 移动到pepgent目录”**，后纠正 **“我说的是pepgent那个repo”**。（U，MOVE，11-01 00:36:26 `39b999ab`；00:36:37 `fa43ba92`）当前业务仓库 README 把 `AI4S-prototype/` 列为不参与 build 的静态高保真原型。（D，`/Users/mouriya/Ext/code/pepgent/pepgent/README.md:21`）

### 1.3 soroi 提供的是底层 AI-as-function、捕获和可观察性

用户的核心表述：

> 首先，soroi的核心宗旨不变，是一种把ai当作函数去运行的概念，一个程序中，有纯粹的程序组成，也有agent组成，所以agent只是一种特殊的函数

（U，PIVOT，10-31 02:39:59，`003efe9e`。）

> 而，eval启动的是omp自己的subagent，所谓的捕获和记录，本质上只是omp里所需要的自定义插件罢了，你想过这一点吗

（U，PIVOT，10-31 02:33:44，`2d861491`。）

> 所以，你会发现，soroi原本所有的工作，在omp的视角会变的非常非常非常简单，就是做几个插件

（U，PIVOT，10-31 02:44:01，`db50b20f`。）

当前 soroi 概述同样写：AI4S 实验室平台是建在 soroi 上的应用，读它的记录和图，**不属于 soroi**；soroi 宿主为自有 omp fork，不在 harness 外另搭控制面。（D，`/Users/mouriya/Ext/code/pepgent/pepgent-soroi/design/soroi.md:3-17`）但其表格将 remote 列为“执行层”，应只读作组成/依赖关系；最新直接用户原话已明确 remote 独立。（U，PRODUCT `57d9d58b`；D，同上 `:16`。）

## 2. Component table — exists / missing / owner

“存在”在下表分为**当前仓库文档/静态接口存在**、**assistant 声称已实现**、**仅有要求/未接入**。本调查没有重新运行任何组件；不把文档的 implemented 字样升级为本次 runtime 结论。Owner 一栏区分仓库位置/职责与尚未确定的产品部署 owner。

| 组件 / 责任 | 当前存在或缺失状态 | 已知归属 / owner / 边界 | 证据 |
|---|---|---|---|
| **Pepgent 业务 Web / AI4S 前端** | 新 `_lab` 页面和 typed fixture 工作已做；assistant 声称 17 个页面路由已实现。后续用户指出绝大多数边距有问题，正在进行统一间距工作，不能沿用“UI 已全部完成”作为最终验收结论。 | `pepgent/pepgent` 的 `apps/web`、`packages/ui`；业务应用不等于 soroi。 | U PRODUCT `57d9d58b`；A UI 06:31:23 `52ae67c6`；U UI 06:59:38 `9f1a314e`；D `pepgent/apps/web/src/renderer/README.md:31-39` |
| **现有 Web server / RPC / SSE / Node runtime** | 业务仓库已经保留 server functions、SSE、Node runtime，不能说 Pepgent 完全没有 backend。**但是新 Lab 业务没有接它的真实业务能力**。 | 和 React UI 同在 TanStack Start `apps/web` 单进程；server seam 接 Paseo，renderer 经注入的 `PepgentBridge` 接入。 | D `pepgent/README.md:3-8,14-17,31-32`；D `pepgent/AGENTS.md:3`；A UI `38f81923`“不接任何后端”及 `52ae67c6`“没有做的” |
| **Lab 业务 backend/API**（实验/节点库/流程/数据集/自动化/集群/成员/项目等） | 这些业务在新页面中的数据是 fixture，动作是本地状态。**尚无本调查证据证明完整新业务 API 已实现或已定契约**；不可把旧 server 的存在当作此层完成。 | 应服务完整 Pepgent；具体独立服务还是现有 web runtime、接口和 owner 尚待领导层/Argon规划。 | U PRODUCT `57d9d58b`明确现有设计不足、缺失组件待规划；U UI ask result `ed4570ad`“不存在端到端，仅ui”；D `pepgent/apps/web/src/client/services/lab.ts:4-13`（源码文本） |
| **soroi 引擎 / eval / 捕获 / atom** | 新设计存在；`omp-soroi-eval` 独立插件已有文档化实现。不是完整 Pepgent，亦不能把当前插件当作完整新 soroi 主路径已打通。 | soroi 是 omp 扩展组件；引擎负责捕获/追踪，宿主提供 eval/交回工具/提醒。实现仓库为 `pepgent-omp-soroi-eval`。 | U PIVOT `003efe9e`,`2d861491`,`db50b20f`；U PRODUCT `57d9d58b`；D `soroi/design/soroi.md:7-17`；D `pepgent-omp-soroi-eval/README.md:3-10,103-110` |
| **soroi 自有 subagent 插件** | 已有独立 `omp --mode rpc` 子进程插件文档；eval 插件目前仍记载 Agent body 用 omp built-in subagent，故两插件存在不等于已经互接。 | `pepgent-omp-soroi-subagent`；生命周期/IRC 归 omp 现有机制；不得因它属于 soroi 系列就把产品所有 agent UI 也算完成。 | D `pepgent-omp-soroi-subagent/README.md:1-3,15-21,44-51,73-77`；D `pepgent-omp-soroi-eval/README.md:103-110`；U 用户要求不改 omp 核心、只能插件，session `01a18f4a-a79c-77de-b951-7efecf85ac21` 09:12:17 `f488be08` |
| **omp fork / harness** | 用户已要求在 Pepgent fork 最新 omp；当前 soroi 文档以它作宿主。**fork 存在不等于新 soroi 的所有整合已实现**。 | Pepgent 自有 omp fork，宿主边界独立于业务 GUI。 | U session `01a18f15-ee16-71bb-ae90-ba76d6d37225` 10-31 08:12:37 `ae015a40`“在pepgent fork一份最新的omp”；D `soroi/design/soroi.md:7` |
| **remote 跨平台远程任务执行程序** | 当前 README 标 Komodo implemented；Slurm/K8s 未实现。初期只实现 Komodo 是用户明确范围，不是遗漏抽象的许可。 | **独立 Pepgent 程序，不本质属于 soroi**；自身负责 template catalog 和 run lifecycle；调用方指定工作卷回传目标。 | U REMOTE 05:00:31 `5d27138c`、05:01:28 `3afc3fb6`、05:52:11 `b45cd22c`、08:05:09 `2366ef30`；U PRODUCT `57d9d58b`；D `pepgent-remote/README.md:3-10,14-24,94-96` |
| **Komodo / Docker、Slurm、Kubernetes 执行后端** | remote 的三后端抽象要求已定；Komodo 为当前实现，Slurm/K8s 暂不实现。业务 UI 的“多集群、接入向导、容器管理”仍为 fixture，不等于三个真实后端接入。 | 三种后端完全分离实现，共享抽象与中间层；Komodo 对接 Docker。 | U REMOTE 04:15:49 `c5030836`、08:05:09 `2366ef30`、08:06:03 `56d362ca`；D `pepgent-remote/README.md:6-10`；A UI `38f81923`,`52ae67c6` |
| **独立网络层 / omp RPC 多路复用器 / 部署和发现** | 用户要求网络层独立、中心化 mux；remote 文档有 mux 配置及注入，但**配置地址不是 mux 实现或运行证据**。本调查不能确认新 RPC mux/服务发现完整组件已存在。 | 用户明确属于独立网络层；不能擅自等同现有 Paseo hub relay，或塞进 remote 的执行后端。具体新实现 owner 未定。 | U REMOTE 04:53:33 `09e1cc92`；U PIVOT 04:12:48 `9c291fe2`；D `pepgent-remote/README.md:55-58,109-114` |
| **现有 hub / hub-client / Paseo daemon** | 当前业务仓库存在自托管 relay 控制面和 vendored Paseo。新 Lab 前端未接真实会话；用户认为旧 AI 不可用。不能因此删除其存在事实，也不能当作新的 omp RPC 网络层已完成。 | `apps/hub` 单 HTTP+WebSocket listener，内存 presence、只读 env registry；`apps/web/src/server/paseo/hub-client` 为 web 侧接线；Paseo 保持 vendored。 | D `pepgent/AGENTS.md:3`；D `pepgent/README.md:3-17`；U UI ask result `cec515af`“现有的ai应该完全用不了”；A UI `38f81923`保留旧代码但不接入新界面 |
| **store / 运行记录 / 产物 / 图 / 历史检索** | 设计要求持久记录、产物溯源、按运行查询/比较和 GUI 订阅；eval 插件文档已有本机 DuckLake catalog/Parquet/objects。其当前 env 仍为 central，**远程捕获/回传与产品展示整合尚不能据此称完成**。 | soroi 捕获/记录引擎职责；运行中本机落盘，结束后回集中副本，不能另造“所有远程并发写中央库”模型。业务应用如何存自己的项目/成员等不由 store 这一项自动回答。 | U PIVOT 05:07:53 `64246eaf`、05:25:49 `9ff9d2be`、05:35:38 `8e0a7e8f`；D `soroi/design/layers.md:16-43`；D `pepgent-omp-soroi-eval/README.md:86-110` |
| **人类介入 backend / GUI 写入** | 用户明确 GUI 可写，且属于新的正式运行/派生运行；eval 插件 README 明确 `human` body 目前未提供。纯前端的“应用/撤回”只是 reducer 操作，非真实介入。 | soroi 单独的人类介入层；完整 Pepgent GUI 要调用它；具体业务传输契约仍需补齐。 | U PIVOT 05:16:25 `ba5ad307`、05:18:56 `d1baf561`、08:32:02 `a0d22b8a`；D `soroi/design/soroi.md:15`；D `soroi/design/layers.md:60-65`；D `pepgent-omp-soroi-eval/README.md:110`；A UI `38f81923` |
| **auth / OIDC / Lab authorization / 成员权限** | 新 UI 明确不做登录授权，账号 J. Doe 和成员设置为 fixture。当前 request cookie 只是 loopback local-access protection，**不是用户认证**。没有证据可把 Keycloak/OIDC 的旧设计直接恢复成 pivot 后的新契约。 | 产品需要怎样的身份/成员/角色归属尚未在本次接受的新合同中落实；不能算 soroi 内部职责。 | A UI `38f81923`账号与不在范围内表；D `pepgent/apps/web/src/server/transport/trust.ts:1-6`（注释文本）；U UI `ed4570ad`宣布业务仓旧设计文档作废；D 原型 `README.md:32` |
| **业务持久化 / metadata / fixture 操作存储** | 新 Lab 业务 fixture 只读、动作不写存储。只有语言/侧栏/右栏 UI 偏好进浏览器存储。真实项目、实验、讨论等业务写库契约未建立在这轮工作中。 | 前端偏好归浏览器；本地页面 domain 状态按页生命周期；完整业务数据源/存储 owner 待新 backend 设计。 | A UI `38f81923`,`27ef769e`；D `pepgent/apps/web/src/client/services/lab.ts:4-13`；D `pepgent/apps/web/src/renderer/application/contracts/lab-session.tsx:1-12`；D `pepgent/apps/web/src/renderer/platform/web/create-lab-services.ts:26-48`（均为源码/注释静态文本） |
| **基础设施 / Komodo 部署** | 当前 IaC 文档管理 `soroic` PVE、VM/CT/NAT，业务 guest 目前仅 `apps/komodo`；这证明已有部署声明，不证明完整 Pepgent app 已部署。 | 独立 `pepgent-iac`；部署/主机职责不能由 soroi 插件包吸收。 | D `pepgent-iac/README.md:3-5,28-44,99-108` |
| **项目管理 / 排期** | 用户说 Pepgent 已有 PM 仓库和对应 GitHub Project；本报告不访问 GitHub 历史、不独立确认其当前资源清单。 | Pepgent 项目级，不是 soroi 的运行时引擎；用户建议秘书 agent 维护排期。 | U PRODUCT 07:18:38 `8544bdb8` |

**路径说明：** 表中 `pepgent/...`、`soroi/...`、`pepgent-remote/...`、`pepgent-iac/...` 等均相对于 `/Users/mouriya/Ext/code/pepgent/`；`soroi` 对应实际目录 `pepgent-soroi`。表内未使用任何 GitHub 历史作为依据。

## 3. Frontend contract assumptions

### 3.1 用户真正接受的范围，以及拒绝了什么

1. 用户起始请求是：**“如果要按AI4S-prototype这个原型来实现，在现在的基础上，现在有了基本的ai ui，你要怎么实现”**。（U，UI，00:45:13，`1951b981`）
2. assistant 最初试图依照旧设计问 soroi `ConfigGet/Check`、Lab env、Proposal、Keycloak 等问题，用户明确收缩**这轮前端实现**为：
   - `first_slice: "不存在端到端，仅ui"`
   - `multi_human: 裁掉：一人一会话`
   - `conflict_features: "本仓库所有的设计文档均不做数，都是遗留垃圾，应该删除"`
   - `extra_ai_panels: "所有的设计都是遗留垃圾"`
   - `visual: "所有的设计都是遗留垃圾"`

   （U，UI，ask 结果 `ed4570ad`，`session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad:187-194`。）
3. 后续用户选择：**“保留代码结构类，作废 04 的视觉与 Draft 规则”**、**“挂进应用路由，数据用类型化 fixture”**，并授权删除旧设计。（U，UI，ask 结果 `1b65d9a8:91-95`。）因此不能把“没有 backend 只能放 Draft Storybook”当作本轮边界。
4. 用户选择旧功能 **“先不动，等页面做完再议”**；对是否沿用真实讨论线程回答 **“现有的ai应该完全用不了”**。（U，UI，ask 结果 `cec515af:66-69`。）assistant 据此采用整页 fixture，保留旧路由和代码而不接到新页面。（A，UI 01:28:01 `38f81923`。）
5. 用户又问组件规划、主题做法和 AI 专用 UI 库：**“你要怎么规划组件”**（02:07:58 `f5c0445a`）、**“然后，原型实际上是有主题的，只不过没有对应的设置，你要如何做主题，而不是满大街都是css常量”**（02:17:30 `74441705`）、**“你应该拍个subagent研究一下这个ui库，这个ui库据说是针对ai量身定做的”**（02:31:19 `e12c06f3`）。（U，UI。）
6. 在 assistant 给出更新后的 Astryx 组合/独立 ai4s 主题方案 `01f010fe` 后，用户说：**“去实现吧，这个实现可以用task high来做”**。（U，UI 02:43:44 `9df25cb1`。）这是授权实施此前讨论方案，**不是用户亲自制定了每个 TypeScript 类型，也不是证明未来 backend 已同意这些数据形状**。

**关键范围区别：** UI session 的“仅 UI”是前端这轮工作的明确验收边界；PRODUCT session 随后要求的完整 Pepgent 全流程任务并没有因此变成永久 UI-only。（U，UI `ed4570ad`；U，PRODUCT `57d9d58b`,`8544bdb8`。）

### 3.2 实际采用的前端数据合同：同步快照，不是网络 API

assistant 的组件/服务方案如下（A，UI 02:09:35 `27ef769e`）：

```text
client/services/lab-fixture（唯一 LabSnapshot 故事线）
→ PepgentBridge.lab
→ platform/web/create-lab-services（窄端口）
→ feature controller（snapshot → ViewModel；本页 reducer）
→ feature view
→ @pepgent/ui 共享组件
```

其约定：fixture 一份，保证各页 R-021 等编号一致；view 只接收 ViewModel；服务/端口是未来替换位置；页面动作不写回 fixture 服务；共享组件只收数据和 callback，不直接请求服务。（A，同上。）

当前工作树存在以下静态接口证据：

```ts
export interface LabBridge {
  readSnapshot(): LabSnapshot;
}

export function createLabBridge(): LabBridge {
  return { readSnapshot: () => LAB_SNAPSHOT };
}
```

（D，源码文本，`/Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab.ts:1-14`。）

`createLabServices` 在构造时立即读取 `snapshot: bridge.lab.readSnapshot()`；偏好另有 read/write port。（D，源码文本，`/Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/renderer/platform/web/create-lab-services.ts:40-52`。）

**这能证明什么：** 前端当前依赖的是**同步、页级读取、只读 aggregate snapshot**。**不能证明什么：** 它没有规定 HTTP endpoint、异步加载/订阅协议、auth identity、mutation/request/result、长期任务、持久化或者分层 backend 的真实接口。因此“以后只替换服务，页面不改”目前是 assistant 的设计目标/假设，而不是已与真实 backend 验证的事实。（A，UI `27ef769e`,`52ae67c6`；D，以上源码。）

### 3.3 `LabSnapshot` 假定完整后端最终能供应的业务数据面

当前聚合快照含以下字段（D，源码类型文本，`/Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-snapshot.ts:24-58`）：

| 数据面 | snapshot 字段 | 本轮含义 |
|---|---|---|
| Lab / 账号 / 成员 / 项目 | `labs`, `account`, `members`, `projects` | fixture，不是认证与成员管理 API |
| AI 模型 | `aiModels` | fixture 选择项，不是可用 provider/model 发现 |
| 实验列表 / 首页 | `experiments`, `home`, `experimentsPage` | 跨页统一故事线 |
| 实验图 / 草稿编辑 / 节点定义 | `experimentFlows`, `flowEditor`, `nodeLibrary` | 图、节点和页面状态的 UI 数据；不是 store/middleware 的已验证 wire model |
| 自动化 / 数据集 / 讨论 | `automation`, `datasets`, `discussions` | 规则、来源链路、线程等外观 fixture；不执行真实规则、不存真实讨论 |
| 算力 / 接入 / 容器 | `clusters`, `connectCluster`, `containers` | UI 向导和模拟操作，不等于真实部署 |
| 设置 | `settings` | 成员、项目、仓库、agent 模板页 UI；不证明下游创建/变更已发生 |

当前契约注释写的是每页读一次、fixture 永不修改；selected Lab / focused projects 仅页生命周期，刷新回默认；语言/侧栏/右栏偏好归浏览器持久化。（D，源码注释，`pepgent/apps/web/src/renderer/application/contracts/lab-session.tsx:1-12`。）

### 3.4 动作、AI、身份、页面状态的明确假设

| 方面 | 本轮具体约定 | 证据 |
|---|---|---|
| 页面操作 | 应用、撤回、拖拽、开关、表单确认只变当前页面 reducer；刷新恢复，不调 server function，不写业务存储 | A UI `38f81923`；D `client/services/lab.ts:4-13` |
| AI 右栏 | fixture 消息，固定回复/模拟思考；不接真实 Composer 提交、tool calls 或模型执行 | A UI `38f81923`,`27ef769e`,`52ae67c6` |
| 讨论 | 一人一会话，UI 中为用户 + AI；不做邀请/多人参与者 | U UI `ed4570ad`；A UI `52ae67c6` |
| 身份 | J. Doe 是 fixture；退出登录按原型显示、不执行；没有把 loopback token 当 user auth | A UI `38f81923`；D `server/transport/trust.ts:1-6` |
| 实验详情 | 按 run id 的 fixture 状态显示 draft/running/ended；去掉原型顶部模式切换 | A UI `38f81923`,`52ae67c6` |
| 旧 AI 会话 | 旧 `_app`、`/new` 等不变；新 `_lab` 不接入 | U UI `cec515af`；A UI `38f81923`,`52ae67c6` |
| 可导航 app | `/` → `/home`，Lab 真实路由；不只放 Storybook | U UI `1b65d9a8`；D renderer `README.md:31-39` |
| 主题 | 独立 `ai4s` light 主题；原型视觉进主题源，旧 `_app` 保持 `pepgent` 主题 | A UI `01f010fe`,`52ae67c6`；D renderer `README.md:128-130` |

### 3.5 明确不应继承的旧 backend 契约

UI 最初 `ask` 的选项中提过以下旧设计：ConfigGet 是 daemon/Komodo 端点唯一来源；Lab env 取 daemon 集合 ∩ presence；`Check` 做应用前验证；Proposal 四态；会话键 `(labId, sub, 种类, Scope)`；lab-gateway；Keycloak/角色/配额限制。（A，UI ask call `d5a684d3`，或包含它全文的 result `ed4570ad:5-185`。）

这些是 assistant 从**随后被用户作废的业务仓设计**带入的问题背景，**不是这轮用户接受的新 backend 合同**。尤其不能为方便连接前端，恢复 `ConfigGet/Check/preset daemon` 旧模型，或借 fixture 类型为它补壳。（U，UI `ed4570ad:189-194`；U，PIVOT `28767d47`：eval/custom package 取代外部控制面及 preset 流转。）

### 3.6 仍有效的底层业务约束，并非 fixture 就能满足

- GUI 要能读取运行图、实时更新、草稿、记录、产物进度、来源、比较与历史时间轴。（D，`soroi/design/layers.md:16-43`；U PIVOT `9ff9d2be`“历史时间轴是个极为重要的功能”。）
- 用户曾提可从运行记录另输出 DSL 给 GUI，但随后说持久状态管理可以让 **“前端连dsl都不要了”**。（U，PIVOT 04:02:49 `47b71e05`；05:07:53 `64246eaf`。）因此不能把“必须有独立 workflow DSL”视为产品集成先决条件。
- GUI 写入不只 AI：**“不，写方不一定只有ai，可以是人在gui写，写了以后通知ai改变了，但是值已经进去了”**；其余原话将它解释为新实例、新参数、旧函数体，之后又明确人类接入产生新 atom。（U，PIVOT 05:16:25 `ba5ad307`、05:18:56 `d1baf561`。）它不同于当前 UI reducer 修改，也不是把远端正在运行的函数随意原地覆盖。
- 自动化需要运行开始/结束可被外部看到，由外部据此启动新程序。（D，`soroi/design/layers.md:67-69`。）本轮自动化页面不证明事件发布与消费组件已存在。

## 4. 完成声明、观察与后续纠正

- assistant 在 UI session 06:31:23 宣称已完成全部原型 UI、推送 main，数据均 typed fixture；自报静态检查、158 tests、全构建、17 页浏览器交互和独立核验。**这些是历史 assistant 的完成/验证声明，本调查没有重跑，不将其升格为新的 R。**（A，UI `52ae67c6`。）
- 用户随后直接观察：**“绝大多数边距都有问题，这是一个高密度信息设计，但是不代表没有边距，对于边距，安全距离，应该好好规划，有统一的系统，需要全面评估，并在各种不同的尺寸的浏览器下检查，改完以后原型要同步”**。（U，UI 06:59:38 `9f1a314e`。）用户的观察优先于先前 assistant “全部完成”的说法。
- assistant 随后开始新的统一边距、安全距离体系工作：多视口审计、设计体系、修改 app、同步 `.dc.html` 与 `CLAUDE.md`。（A，UI 07:00:09 `22bf5cbe`。）这属于正在继续的 frontend work；不应把它和“后端已接通”混为一谈。

## 5. Open questions（证据留下的真实缺口，不是向用户追问）

1. **完整 Pepgent 的业务后端/API 是哪些组件、归谁？** 最新用户明确要求补齐而未给出全部划分；现有 web runtime、soroi 插件、remote、网络层、持久记录之间的完整集成还不能从 fixture 推导。（U PRODUCT `57d9d58b`；D `client/services/lab.ts:4-13`。）
2. **现有 Paseo hub 与新 omp RPC mux 的关系是什么？** 两者都涉及 relay，但用户要求的独立 omp RPC 网络层并没有被本报告证明等同现有 hub。remote 的 mux 字符串只是消费配置；部署、发现、只读观察、人工接管等边界仍待归属。（U REMOTE `09e1cc92`；U PIVOT `9c291fe2`,`2dbf970b`；D `pepgent/AGENTS.md:3`；D remote `README.md:55-58`。）
3. **新用户身份、Lab authorization、成员/角色/邀请合同是什么？** 原型含页面，UI 范围排除真实 auth；旧设计被废，loopback cookie 非用户认证。不能据此自封 Keycloak、某角色表或某服务为新权威。（U UI `ed4570ad`；A UI `38f81923`；D `trust.ts:1-6`。）
4. **业务元数据和 soroi store 的边界是什么？** 捕获值/运行/产物已有引擎设计，但 Lab、项目、成员、讨论、自动化定义、环境配置等长期业务对象的 source of truth 未被当前 fixture 合同回答。（U PRODUCT `57d9d58b`；D `layers.md:26-43`；D `lab-snapshot.ts:24-58`。）
5. **真实数据如何接上同步 `readSnapshot()`？** 需要由真实后端决定读、订阅、mutation、正式运行状态以及端到端副作用合同；本轮的“替换 service 页面不改”仅为目标，尚无跨组件 runtime 证据。（A UI `27ef769e`,`52ae67c6`；D `lab.ts:8-13`；D `create-lab-services.ts:45-48`。）
6. **eval、自有 subagent、remote、store、人类介入能否形成完整主路径？** 插件 README 直接显示 eval 仍用 built-in subagent、central 环境、无 human body；这些是明确集成缺口，不宜按“各 repo 已存在”宣告完成。（D `pepgent-omp-soroi-eval/README.md:103-110`。）
7. **预定义函数库、版本/影响展示和自动化事件由哪一层对产品提供？** 用户保留持久函数/import 的用途，而不是旧 preset 语言；当前需求文档写了能力，但不构成已实现 API。（U PIVOT `47b71e05`；D `layers.md:45-52,67-69`。）
8. **旧功能最终删还是保留？** workhub、模块页、会话协作、旧会话界面等仍按用户“先不动”而未裁决；不能擅自清掉，也不能纳入新 Lab 已完成功能。（U UI `cec515af:68`；A UI `52ae67c6`。）
9. **最新 spacing 工作是否完成？** 本报告读取到的用户最新明确反馈仍要求全量间距与多视口检查并同步原型；没有把正在进行的整改预先写成通过。（U UI `9f1a314e`；A UI `22bf5cbe`。）

## 6. 给集成者的最短结论

- **(U)** Pepgent 是完整 AI4S 产品，soroi 只是 omp 扩展组件；remote 明确独立。最新原话是边界，不是文档表格能推翻的。
- **(U/A/D)** 正在做的是可导航的纯前端 Lab UI：同一份 typed fixture、同步 snapshot、局部 reducer、模拟 AI、浏览器偏好。用户明确这轮“仅 UI”，并否定业务仓旧设计；这不等于用户放弃完整产品后端。
- **(D)** 现有业务仓确实有 server/RPC/SSE/Paseo/hub；独立 eval/subagent/remote 也有实现文档。但新业务 API/auth/持久化/网络 mux/远程捕获/介入等端到端整合不能由这些零件的存在推定。
- **(U)** 用户随后要求的是从设计补齐到开仓、实现和 e2e 的全流程；缺失组件由领导人/Argon按业务与架构补齐，本报告不替他们做核心设计。
