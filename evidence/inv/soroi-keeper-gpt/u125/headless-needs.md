# 无人值守工人需求入口：只读取证

## 0. 范围、方法与证据标记

本报告供父席独立判断；不提出方案、不裁决规则冲突、不立案、不投票、不新增规则。

- **U**：LEDGER 已收录的用户引文；明确保留转述来源。
- **D**：当前规则、README、skill 的文本现状，不等于已核实某项议会决议已经通过。
- **C**：当前源码的静态实现事实，不代表部署版本或 runtime 路径已经验证。
- **R**：本轮实际命令输出；本轮只有只读进程观察，没有行为探针。
- **[INFERENCE]**：由上述证据作出的有限推论；与源头事实分开。

调查计划与决定性问题：实际工人启动参数和控制通道是什么；需求冲突的既有承接链由谁创建、办理、送达、确认；该链是否有证据能结束一个已挂起的人类 ask。先读 AGENTS、tern-worker、area-manager 与代表性工程仓规则，用 find 定位 council 实现，再读相应源码；以源码调用点和只读 ps 输出作为决定性观察。不假设存在 TTY 就有人值守，不假设启动 argv 能决定有无人类接收者。当前没有 task 工具，按本席规则未派导师。

已读范围：当前工作台 `AGENTS.md`、`LEDGER.md` 相关引文、`.omp/skills/tern-worker/SKILL.md`、`.omp/agents/area-manager.md`；工程规则取 council/deploy/images/lab-library 四仓；council 当前 checkout 的 README、源码及设计文档开头的来源说明。用 find 搜索工作台脚本和 `.omp` 的启动声明。只查看两个已知 `.workers` 目录的目录项，没有读取其中任何会话文件正文。未读任何 session/history、Git 历史、GitHub issue/PR 历史、另一产品席的记忆/会话/报告/选票；未调用工人 peer、未向管理层发消息、未运行测试/build/check。

路径基准：

- `W/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `C/` = `/Users/mouriya/Ext/code/pepgent/pepgent-council/`
- 其他工程规则使用其绝对路径。

## 1. 用户引文：既有 U124/U125 与本轮最新通知

| 标记 | 已读源头 | 引文及来源性质 |
|---|---|---|
| U | `W/LEDGER.md:53`，U107 | “这是区域管理主动巡查工人，而不是工人给区域管理报告，这是纯单向通信”。同条还要求 area-manager 使用 peer，读 sessionlog 只是实地考察备选。 |
| U | `W/LEDGER.md:70`，U124 | “工人存在违规的调用askuser工具而不是询问区域经理，管理层从未有人发现，区域经理从未进行巡检”。 |
| U | `W/LEDGER.md:71`，U125 | “用peer处理而不是改变工作流程是重大失职，重大问题绕过管理决议是严重问题”。 |
| U（转述已收录） | `W/LEDGER.md:72`，U126 | “工人再一次对外ask，所有管理层都没意识到这本质上是无头会话，如何处理无头会话的工人的需求，而所有的管理层现在还无动于衷”。LEDGER 同行注明：用户对 ArgonGovernance 席所说，由 ArgonGovernanceSol-1 全席通报转述，并附截图路径。本轮未读取原会话或截图。 |
| U（转述已收录） | `W/LEDGER.md:73`，U127 | “你绕过管理层广播私自起草？”；同行注明用户对 ArgonGovernance 席所说、由 ArgonGovernanceSol-1 全席通报转述。 |

**截至本轮读取，最新通知中的“无头会话”引文已出现在 LEDGER 的 U126，不是未入账通知。** 这与已读 U124/U125 分列，不把转述升级为本人直接核读原始对话。父席补充强调“用户缺席、无人值守的需求接收端”，本报告据此区分 CLI 模式与接收者事实；不拿 TTY 或 argv 反驳用户的无人值守观察。

## 2. 问题一：实际启动和无人值守是两个不同层面的事实

### 2.1 规则声明（D）

1. `W/AGENTS.md:71-75`：工程师、实现者、测试者是 tern 内完整、独立的 omp 操作系统进程；使用独占 `.workers/<名字>/sessions` 和 omp-peers 扩展。
2. `W/.omp/skills/tern-worker/SKILL.md:24-35`：声明的启动命令为：

   ```sh
   tern new session pepgent-<名字> --cwd <home> -- \
     omp --cwd <home> --model anthropic/claude-opus-5-5:high \
       --session-dir /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions \
       -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
   ```

3. 同 skill `:40-42`：首次派活必须交代区域经理身份、工人无法回复它，以及“**用户不在线不能提问**”。这是接收端可用性的明确工作声明，不取决于终端是否存在。
4. 同 skill `:8,12-14,48`：首次派活之后由片区经理巡查和单向送达；工人状态写 issue/PR，不经 peer 向片区经理或管理层汇报。

### 2.2 实际进程命令（R）

只读观察命令 A：

```sh
ps -axo pid,ppid,tty,command | grep -F -- '/Users/mouriya/Ext/code/pepgent/.workers/pepgent-council/sessions' | grep -v -F -- 'grep'
```

实际输出：

```text
4768 5330 ttys010 omp --cwd /Users/mouriya/Ext/worktrees/pepgent-council-home --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/pepgent-council/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
```

只读观察命令 B：

```sh
ps -axo pid,ppid,tty,command | grep -F -- '/Users/mouriya/Ext/code/pepgent/.workers/pepgent-store2/sessions' | grep -v -F -- 'grep'
```

实际输出：

```text
69436 5330 ttys047 omp --cwd /Users/mouriya/Ext/worktrees/pepgent-store-home --model anthropic/claude-opus-5-5:high --session-dir /Users/mouriya/Ext/code/pepgent/.workers/pepgent-store2/sessions -e /Users/mouriya/.omp/plugins/node_modules/omp-peers/index.ts
```

父进程观察命令：

```sh
ps -p 5330 -o pid,ppid,tty,command
```

实际输出：

```text
PID PPID TTY COMMAND
5330 1 ? /Applications/Tern.app/Contents/MacOS/tern daemon --socket /Users/mouriya/Library/Application Support/Tern/daemon.sock --handoff /Users/mouriya/Library/Application Support/Tern/daemon.state.handoff
```

**能证明的事实：** 本轮这两个工人是由 Tern daemon 承载的不同 omp 进程，具有各自 cwd、独占 session-dir、规定模型与 omp-peers 扩展。它们关联 TTY。当前显示的命令行没有 `--headless` 参数。

**不能把上述事实解释成：** 有人类看守 TTY、有人类会回答 ask、工人可以向人类提问，或用户关于无人值守的观察有待 argv 证明。这里“无头/无人值守接收端”的用户观察由 U126 提供，CLI 启动形式由 R 提供，二者并不互相否定。未由两个样本推断全部工人的实时启动状态。

启动声明查找边界：find 在工作台 `.omp` 中定位到 tern-worker 模板，`scripts/` 的 find 未返回启动器命中；限定 glob 未找到 `.workers` 一级/二级的 `.sh`、`config*`、`settings*` 或所查 `.json` 声明文件。两个已知 `.workers/pepgent-council`、`.workers/pepgent-store2` 的目录读取仅显示 sessions 项及其文件名；未读取 sessions。未据此声称其他位置绝无启动声明。实际 argv 的证据来自 ps，而不是会话日志。

## 3. 问题二：需求、意图与验收冲突的现有入口、拥有方和送达确认

### 3.1 工作台与片区经理文本（D）

| 环节 | 当前文字 | 源头 |
|---|---|---|
| 工程师触发条件 | 原始意图、范围、缺失补充、跨组件公开契约、持久化格式、权限、状态权威/生命周期、部署前提、验收语义必须标 BLOCKED；期间做不依赖部分 | tern-worker `:49`；`W/AGENTS.md:123` |
| 工程记录入口 | 工人把 BLOCKED 写在原 issue/PR，说明卡点、等待对象；无可继续切片而停下时注明“已停工等待” | tern-worker `:48`；`W/AGENTS.md:80-81` |
| 发现与上报 | 片区经理主动巡查，发现 BLOCKED 后报 Main；经理不分类、不解释用户意图、不裁决 | area-manager `:16-26,31-33`；tern-worker `:16,20` |
| 初审承接 | Main 为事项新开 governance-desk | area-manager `:23`；`W/AGENTS.md:69,80` |
| 产品/程序把关 | Argon 闸门 A 处理意图/公开契约边界；ArgonGovernance 闸门 B 处理席位、阶段和投票程序边界；任一触及相应边界，按规则进入投票 | `W/AGENTS.md:58-60`；tern-worker `:51-59` |
| 分类争议 | 意图/技术分类争议交 LeadMentor 终局仲裁 | `W/AGENTS.md:33-35` |
| 实际送达 | 片区经理通过 peer_send 单向送达裁决、前置就绪、新承载或唤醒 | area-manager `:21-23,42`；`W/AGENTS.md:81` |
| 收到/恢复确认 | “已投递”不是已收到；片区经理用 peer_ask 或工作空间新变化确认恢复 | area-manager `:21,42`；tern-worker `:14`；`W/AGENTS.md:81` |

代表性工程规则也把阻塞/状态放在 issue/PR：

- `/Users/mouriya/Ext/code/pepgent/pepgent-deploy/AGENTS.md:20-22`。
- `/Users/mouriya/Ext/code/pepgent/pepgent-images/AGENTS.md:17-19`。
- `/Users/mouriya/Ext/code/pepgent/pepgent-lab-library/AGENTS.md:20-22`。
- `C/AGENTS.md:7-11`：契约变动先在树根 [Pepgent/soroi#321](https://github.com/Pepgent/soroi/issues/321) 评论提出，领导层定稿再改；soroi 规则/角色/skill 归工作台 Main；daemon 只保存自身创建的议程、登记、回执等，不把工人的会话 ID 或外部 issue 状态变为自己的源头。

### 3.2 council 现有文字与代码入口（D/C）

- **D，`C/README.md:101-118`**：工人在 issue/PR 评论第一行写 `STATUS BLOCKED worker=<W-id> [needs=…]`，第二行起自由正文；BLOCKED 派生 `worker.blocked` 并唤醒 Main。非 STATUS 评论不进入状态处理。
- **C，`C/src/domain.ts:350-374`**：`parseStatusHead` 实现该边界解析；BLOCKED 构造 `needs: IssueRef[]`。
- **C，`C/src/bus.ts:308-329`**：已登记且 active 的 worker 状态被记录，派生到 `Main` 的 `worker.blocked`，`wake: true`。这里的接收地址是 Main，不是片区经理。
- **D，`C/README.md:120-135`**：Main/治理承接者用 `council deliver` 送达；daemon 按登记的 cwd 当场查 omp 会话；Delivered 仅指消息进会话，后续处理看工人状态评论。工人不能 peer 回复 council，回应仍写原 issue/PR。
- **C，`C/src/bus.ts:91-96,210-230`**：结论消息明确为单向，收件会话按 cwd 查询，再 `peers.irc` 注入，存送达回执；不会把 accepted 当成“问题已经处理”。
- **C，`C/src/domain.ts:200-225`**：Worker/Registration 与 Delivery/Receipt 是明确分开的对象；Receipt 的 delivered 注释明确“injected into the session, not handled”。
- **C，`C/src/peers.ts:82-115`**：现查会话并发送 `kind: "irc"`；返回 accepted 的 recipient 只是 idle/busy。

### 3.3 不裁决、只并列的文字冲突

1. **U124 的“而不是询问区域经理”** 与 **U107、AGENTS C4、tern-worker 和 area-manager 中“工人不向片区经理汇报/不联系/无法回复，片区经理主动单向巡查与送达”** 必须并列保留。源头分别见 `W/LEDGER.md:53,70`、`W/AGENTS.md:80-81`、tern-worker `:12,42,48`、area-manager `:13,21,33`。本报告不自行把“询问”解释成上报、旁路问答或新通道，也不替管理层裁定如何统一。
2. **工作台文本的“片区经理发现、送达并确认恢复”** 与 **当前 council README/源码的“webhook 唤醒 Main、daemon 直接送达工人、工人状态评论体现后续处理”** 是不同的现有入口声明。未读正式迁移决议正文，不判哪套优先或哪条已经失效，也不以代码已存在倒推流程已经正式切换。
3. **U125 明确把重大流程问题放在管理决议范围**；本报告只列已有事实，不把再次 peer 投递当作对该指令的完成，也不向治理设计越界。

## 4. 问题三：人类 ask 与产品 Human atom/control 的可证边界

### 4.1 人类 ask：本轮可直接引用的精确接口说明（D）

`xd://ask:1-3`：

> Opens a full-screen dialog that puts your questions to the user and blocks until they answer.

该设备 schema 是 `questions`、候选 `options`、`brief` 等人类提问表单，见 `xd://ask:12-112`。这证明本轮可见 ask 工具面向用户界面并等待回答，不能把“可调用”当成“用户在线”。U124 中的 `askuser` 是用户引文的工具称呼；本轮没有读出事工人会话，不据此认定该调用在日志中的具体工具名一定就是本设备 ask。

### 4.2 council 代码中的对象（C）

- WorkerStatus：`C/src/domain.ts:188-198`；登记与送达回执：`:200-225`；状态头解析：`:350-374`。
- council 的 `control` 命中是 **CLI/watch/health 的控制 socket**，精确定义在 `C/src/config.ts:6-11`；`C/src/daemon.ts:94-128` 实现 `/cmd`、`/watch`。这不是产品 Human atom/control 的证据。
- `C/src/peers.ts:106-115` 的工人送达是 IRC 消息，不是回答人类 ask 的接口。

### 4.3 明确未定位的部分与范围限制

在本轮限定的 council `src/` 与 README 中，以 find 先定位行为，再用不区分大小写的 `Human|askuser|human atom|HumanAtom|control|ask` 搜索，未定位到产品 Human atom、Human/control ADT 或人类 ask 与产品 Human atom/control 之间的适配/完成接口。返回的 `ask` 还包含普通英文动词和 task 字符串，`control` 还包含 AbortController/ReadableStream controller，不能据名称相似拼接领域对象。

工作台 `W/AGENTS.md:43` 明确 soroi 产品不基于 omomp、不得把 peers/tern 等带入 soroi 产品设计；这能说明工作台通信原语与产品设计有边界，**不能替代 Human atom/control 的具体产品定义**。

**本轮没有读取产品 Human atom/control 的源码/设计，也没有定位到二者精确区分的完整源码链。** 因此只报告已定位的人类 ask 接口和 council 的工人状态/消息对象；不声称产品没有 Human/control，不声称生产缺少其处理能力，不把工作台 ask 问题自动认定为产品 Human/control 的缺陷。

## 5. 问题四：最小现有等待结束入口与证据缺口

这里严格分开“工程业务等待”与“已经挂起的人类 ask 调用”。

| 对象 | 能定位的既有入口 | 到何处为止有证据 | 尚无本轮实据的部分 |
|---|---|---|---|
| 等意图/契约/范围裁决的工程业务等待 | 原 issue/PR 写无 needs 的 `STATUS BLOCKED worker=<W-id>`；代码唤醒 Main；Main 办理后 `council deliver --worker <W-id> --ref <owner/repo#n> --text @/tmp/结论.md` | `C/README.md:109-110,123-134`；`C/src/bus.ts:127-130,210-230,308-329`；`C/src/daemon.ts:84-87` 将 deliver 路由到 bus。能证明结论注入并保存回执的实现存在。 | 不证明本次真实 BLOCKED 已被办理，不证明实际部署版本已走过该链，也不证明收件工人已经恢复。 |
| 等 org 内 issue/PR 依赖完成 | BLOCKED 的 needs 全部完成且本 issue/PR 未有更新状态，readyCheck 生成就绪并送达 | `C/src/domain.ts:192-198`；`C/src/bus.ts:335-369`。自动就绪只针对非空且属于 webhook org 的 needs。 | 不是意图裁决；不会为无 needs 的需求冲突自动生成答案。 |
| 原等待被新状态取代 | 同一 worker、同一 issue/PR 的较新状态使原 readyCheck 不再有效 | `C/src/store.ts:386-395`；`C/src/bus.ts:359-366`；其他 issue/PR 上状态不结束此等待。 | 这是就绪派生的状态有效性，不是用户答案，也不代表业务问题已解决。 |
| 按工作台现行文字等裁决的工人 | 片区经理单向送达结论/“继续”，再观察恢复 | area-manager `:21-23,42`；`W/AGENTS.md:81`。规则写明送达与恢复确认者。 | 未运行该路径，不判断它与 council 迁移文字如何正式统一。 |
| 已经挂起的人类 ask 调用 | 本轮仅定位到其“向用户弹全屏问答并等待”的工具契约 | `xd://ask:1-3`；council 可见送达实现只发送 IRC 字符串和存回执。 | **没有本轮证据表明 council deliver、片区经理 peer_send 或新的 STATUS 评论会回答、取消或结束一个已挂起 ask 的等待。** 未读宿主 ask 实现、未做 runtime，不把缺实据写成“不可能”或生产缺陷。 |

一个源码细节：`C/src/bus.ts:210-230` 的手工 deliver 存 Delivery/Receipt；它不在该方法中把 BLOCKED 改成 DONE，也不写 `ready_at`。自动 needs 完成路径才在 `:361` 写 `ready_at`。因此“已结论送达”“已就绪”“已恢复”“ask 已返回”在当前可见证据中不能混为一项完成事实。

## 6. 交付边界

- 本轮产物只有本报告，没有工程文件、规则、skill、agent、配置或 Git 改动。
- 没有新队列、定时器、fallback、timeout、工具封禁或治理流程设计。
- 没有启动/重启任何工人或服务，没有调用 ask，没有向工人 peer 投递，没有投票。
- ps 仅是既有进程的只读观察；源码阅读仅证明当前 checkout 实现存在，**没有 runtime 通过声明**。
- 待父席独立判断的是规则冲突、正式通知和议会归属；本报告不代替其决定。
