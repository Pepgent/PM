# D56 discussion context 事实核验

## 0. 范围、方法与证据性质

本报告只回答当前实现及已通过 D7/D12 正文已规定什么，不给架构、命令设计、权限新增或选票意见。议案为 [PM#78](https://github.com/Pepgent/PM/issues/78)，本席未读取其链接的其他产品席调查，也未读取、联系 SoroiKeeperOpus 的会话、记忆、报告或选票。

源码取自 GitHub `Pepgent/Pepgent` 当前 `main`，PM 条文取自 `Pepgent/PM` 当前 `main` 的指定两份设计正文。先通过 GitHub `file_read` 读取 `sessions.ts`，再创建下述仅含当前 main 的浅克隆进行路径定位和有界读取；没有读取 Git/会话历史、无关前端 root worktree，也没有修改工程源文件。

```sh
git clone --depth 1 --single-branch --branch main https://github.com/Pepgent/Pepgent.git /tmp/gpt-d56-pepgent-main
git clone --depth 1 --single-branch --branch main https://github.com/Pepgent/PM.git /tmp/gpt-d56-pm-main
```

**取证计划及其执行：** 决定性问题是持久 context 集合的 mutation caller、queue→prompt 的真实投递点及客户端按钮的真实命令是否一致。先 `find` 定位未知 schema/协议/client/删除实现，再读具体范围，并用 `discussionContext|discussion_context`、`humanIrcQueue|humanPrompt`、prompt send site、delete caller 的交叉搜索确认覆盖。最低成本的决定性观察是 `deliver` 发送前的数据库读取；其余调用链用于排除只凭同名搜索作结论。最初对其他写源、Panel/Automation、UI 删除的假设均以下文源码观察替代。本席没有 `task` 工具，未另派 mentor。

**全部结论均为静态源码/设计正文核验，未做 runtime 验证。** 未运行测试、build、lint、check，也未连接数据库、浏览器、omp、Mux、store 等 live runtime。报告里的 `main` URL 是可定位源码的链接，不是对未来 main 不变的承诺；不以 hash 验证作任何证据。

下文 Pepgent 代码路径均相对 `Pepgent/Pepgent` 仓库根目录。

## 1. 先给事实结论

1. `context` 是 Lab 持久表 `discussion_context` 中按会话记录的 `ArtifactRef` 集合。当前业务源码的加入写点只有 `loadDiscussion`，实现是 additive insert，不是替换集合；没有找到业务成员删除 caller，也没有 context 外键级联删除。不是仅凭没有 `discussion.unload` 这个名字判断，详见 §2。
2. 当前 main 的 **每一次 `human_irc_queue` → 根会话 `prompt` 投递**，包括 `steer`，都在 `deliver` 内读取该会话此刻的 context，并经 `humanPrompt` 包装。不是入队时冻结，也不是仅首条附加；成功投递删除的是 queue 行，不是 context 行，详见 §3。
3. Panel 和 Automation 确实进入同一个根会话 queue/deliver/humanPrompt；投递函数不判 origin。但现有 `discussion.load` 明确只接受 `Discussion`，不能据共用投递函数推成三类来源都有公开 context 装载命令。
4. 客户端有读取持久 context 并显示 loaded 列表的路径，也有“移除”按钮 JSX，但 `canUnload` 固定为 `false`，这些按钮无 `onClick`，没有真正移除命令。picker 只发送 `discussion.load`，而且阻止取消已持久 loaded 的项。其显示列表还会过滤无法在当前 artifact 目录中解析的引用，不能等同服务器 context 的无条件完整呈现，详见 §4。
5. `lab_open_artifact` 当前可读范围不是以 context 为 allowlist。它按 `ArtifactRef` 读取本会话配置的 store 对象，或本 Lab 任一会话的讨论快照；随后生成本会话 `inputs/` 副本和 `references` 工具附件。集合成员、历史引用附件、字节副本是不同对象，详见 §5。
6. D7 原文是“下一条 prompt 前附上这些产物的清单”；D12 已定引用身份、持久列、load、权限和失效通知。**不能把当前代码的每条投影、或“只一次”“投后清空”，反推成人类已明确选定的频率/清空意图。** 也不能把新提案的 unload 当作已通过命令，详见 §6。

## 2. context 的源头、schema、身份、授权、加入与删除

### 2.1 唯一持久位置与源头

- [`apps/web/src/server/lab/database.ts:17-27`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/database.ts#L17-L27)：runtime 打开 `<home>/lab.sqlite`，使用 Drizzle schema，启用外键并执行迁移。
- [`apps/web/src/server/lab/schema.ts:140-144`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/schema.ts#L140-L144)：`discussion_context` 只有 `conversation_id` 与 `artifact_id` 两个非空文本列，联合主键为二者；`conversation_id` 引用 `conversation.id`，`artifact_id` 存 owner-qualified `ArtifactRef`，没有指向 `artifact_meta` 的外键。没有每条 prompt 的消费标记、到期字段或 inputs 路径字段。
- [`apps/web/src/server/lab/conversations.ts:89-90`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/conversations.ts#L89-L90)：conversation detail 的 `context` 直接从该表读取，按引用排序并解析为 `ArtifactRef`；不是从 transcript、references 附件或客户端 selection 重建。
- 已通过 [`PM/evidence/decisions/D7-lab-backend.md:62`](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L62) 明定 Lab 的 `lab.sqlite`、web 唯一写方；同列说明 context 的 ArtifactRef 列与移除 artifact_meta 外键。这里“唯一写方”指 Lab/web 是该状态的拥有方，不能误写成 store 或 omp 持有 context。

### 2.2 ArtifactRef 的身份

[`apps/web/src/protocol/lab/ids.ts:42-52`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/ids.ts#L42-L52) 定义：

- `store:<Hash>` 是 store 对象引用；
- `discussion:<DiscussionArtifactId>` 是讨论产物引用，尾部对应 `artifact_meta.id`；
- 二者是 `ArtifactRefSchema` 联合。引用本身不是内容正文、文件路径、会话成员 id 或 Mux agent id。

讨论产物表的快照/来源字段见 [`schema.ts:124-138`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/schema.ts#L124-L138)，wire 加 `discussion:` 前缀见 [`tools.ts:101-114`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L101-L114)。

### 2.3 load 的真实授权与加入语义

实际命令是 [`protocol/lab/command.ts:76-83`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/command.ts#L76-L83) 的 `discussion.load{conversation,artifacts:ArtifactRef[]}`，结果为 `Done`（同文件 [`153-159`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/command.ts#L153-L159)）；dispatch 到 `loadDiscussion` 见 [`operations.ts:686-691`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L686-L691)。

[`conversations.ts:203-224`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/conversations.ts#L203-L224) 完整行为：

1. 目标必须存在且 `originKind === 'Discussion'`。
2. 解析目标 Lab，取得当前已登录调用者及其该 Lab 成员身份。
3. Better Auth 判定 `lab:write`，并要求该成员是目标 conversation owner。
4. 对每个 `discussion:` 引用，join `artifact_meta` 与其产生会话，验证该产物属于同一个 Lab；**不要求来自目标讨论自身**。
5. `store:` 引用在此函数中不走讨论产物查询，也不请求 store 验证存在性。
6. 对传入每项执行 `insert(discussionContext)...onConflictDoNothing()`，旧成员不移除；因此传入子集不是替换，空数组也不清空。
7. 发布 `conversation{id}` 后返回 `done`；本函数不发 prompt、不读取产物字节、不拷贝 inputs。

授权身份的出处不是推测：[`caller.ts:79-87`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/caller.ts#L79-L87) 从 Better Auth 当前 session 与目标 Lab 成员取得 `member`/`user`；[`caller.ts:101-120`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/caller.ts#L101-L120) 分别做权限与 `conversation.ownerId === member` 判定。角色声明 [`access.ts:28-65`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/access.ts#L28-L65) 中 owner/researcher/student 的 write 为 grant，guest 为 deny。

### 2.4 删除 caller 核验：当前没有 context 成员退出业务路径

这是有边界的源码结论，非对 live DB 内容的声明。核验了：

- 全仓 `discussionContext|discussion_context` 引用：运行时代码只有 `schema.ts`、`conversations.ts`、`sessions.ts`、`datasets.ts`；协议是 `catalog.ts`；其余是迁移及 schema 快照。`conversations.ts` 只有上面的 insert，`sessions.ts` 和 `datasets.ts` 是读取。
- `server/lab` 的 delete 调用、raw `DELETE FROM`、`onDelete`：未见删除 discussionContext 的操作，也未见可借删除 conversation 结束成员关系的业务 caller。已观察的 queue delete 不作用于 context。
- 完整 [`LabCommandSchema command.ts:55-128`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/command.ts#L55-L128) 及完整 [`operations.ts:679-755`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L679-L755) dispatch，没有 context 删除命令/分支。
- `discussion.archive` 只是更新 `discussionArchived: true`，不删 conversation 或 context，见 [`discussions.ts:48-60`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/discussions.ts#L48-L60)。
- 当前迁移 SQL 的 context 外键是 `ON DELETE no action`，不是 cascade，见 [`resources/lab/migrations/0001_lyrical_squirrel_girl.sql:10-19`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/resources/lab/migrations/0001_lyrical_squirrel_girl.sql#L10-L19)。其中 `DROP TABLE discussion_context` 是先复制全部成员、再重建表的 schema 迁移，不是用户卸载产物 caller。

故精确结论是：**当前 main 业务路径中，只观察到 context 集合的持久加入与读取，没有观察到成员删除/清空 caller；也不存在 context 外键级联替代该业务操作。** 不把“没有某个名字”当作唯一证据，不主张外部手工 SQL 不可能改表。

## 3. human_irc_queue → omp 的投递链，以及 Panel/Automation

### 3.1 每次投递点读取当前集合，steer 同一路

- [`schema.ts:170-177`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/schema.ts#L170-L177)：queue 行保存 conversation、msg、principal、body、queuedAt，**没有 context 快照**。
- [`sessions.ts:216-236`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/sessions.ts#L216-L236)：`head()` 取当前会话队头；`drive()` 空闲或工作中的步边界均调用同一 `deliver(live,head,live.inFlight>0)`。
- [`sessions.ts:473-479`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/sessions.ts#L473-L479)：`deliver` 在发 RPC 前查询该 conversation 当前全部 context，随后 `humanPrompt(head.principal,context,head.body)`；steer 只增加 `streamingBehavior:'steer'`，不绕开查询或 envelope。RPC 返回后删 queue 行，不删 context。
- [`sessions.ts:21-29`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/sessions.ts#L21-L29)：envelope 为 `human:<principal>`，非空 context 再加 `Loaded context:` 及逐项 `- <ArtifactRef>`，最后加 body；空 context 不加列表段。这里投影的是引用清单，不是产物字节。
- [`sessions.ts:518-532`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/sessions.ts#L518-L532)：`LabSessions.session/kick` 按 conversation id 创建/唤醒同一 RootSession 类，没有 origin 分支。重启待投递同样 kick，见 [`558-562`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/sessions.ts#L558-L562)。

对当前 `server/lab` 全部 prompt 发送点的搜索只找到 `sessions.ts:476` 这一处；`deliver` caller 是 `drive:236`。因此，上述判断覆盖的是**当前 Lab 自有 queue 向根 omp 的投递**，不泛化为 omp 所有内部消息或子 agent 自有队列。

### 3.2 已观察到的全部 queue 入队业务来源

| 来源 | 入队与投递证据 | principal/body 的事实 |
| --- | --- | --- |
| `discussion.prompt` | [`operations.ts:428-445`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L428-L445)，共用 enqueue helper [`400-406`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L400-L406) | 当前认证 user；命令 text；要求 Discussion、discussion:prompt、owner |
| 根 agent 的 `human.irc` enqueue/edit/withdraw | [`intervene.ts:181-204`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/intervene.ts#L181-L204)，根/子分流 [`235-246`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/intervene.ts#L235-L246) | enqueue 取当前调用者 user 与 body；edit 改尚未投递的 body；withdraw 删除 queue 行 |
| `experiment.start` 可直接 sent；`experiment.approve` | 入队内容与 kick [`operations.ts:547-562`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L547-L562)；caller [`595-600`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L595-L600)、[`623-630`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L623-L630) | 草稿所属 discussion，读取当前 canvas 生成 prompt；发起/批准者 user |
| `panel.prompt` | [`operations.ts:461-498`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/operations.ts#L461-L498) | 操作者自己本页本 scope 的 Panel，必要时创建；调用相同 enqueueHuman 与 sessions.kick |
| Automation 首条 prompt | [`automation.ts:162-190`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/automation.ts#L162-L190) | 新建 `originKind:'Automation'` 会话；opening.principal/opening.prompt 入相同表并 kick |

根 `human.irc` 以 `conversation.agentId` 命中根会话，不限制其 origin；子 agent 未走此表，而是经 Mux 的 `mux_human_irc*` 帧交给子 agent 队列，见 [`intervene.ts:222-246`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/intervene.ts#L222-L246)。不能把子 agent 路径也算作已经调用 `humanPrompt`。

### 3.3 来源差异写在什么地方

- 持久 origin 是 `Discussion|Panel|Automation`，并有各自字段与约束，见 [`schema.ts:37-70`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/schema.ts#L37-L70)。出线 ADT 见 [`protocol/lab/rows.ts:94-107`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/rows.ts#L94-L107)。
- 各入口的创建、权限、principal/body 不同，但 queue 与 deliver 共用。
- `deliver` 的实际查询没有 `originKind==='Discussion'` 条件；与此相对，`loadDiscussion:205` 有该条件。因此当前公开业务写入只能给 Discussion 加 context；不能因共用查询就声称 Panel/Automation 已有同样的 context 装载入口，也不能声称它们绕开 `humanPrompt`。

## 4. 实际协议文件、讨论 client 入口、当前清单与移除按钮

### 4.1 不是假定存在 conversation.ts

当前 `src/protocol/lab/` 实际文件为 `ids.ts/library.ts/pages.ts/rows.ts/auth.ts/catalog.ts/command.ts/events.ts` 和 `external/`。**没有 `src/protocol/lab/conversation.ts`。** 会话详情实际 schema 是 [`apps/web/src/protocol/lab/catalog.ts:78-108`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/catalog.ts#L78-L108)，其中 `ConversationDetailWireSchema.context` 是 `ArtifactRef[]`，与 `attachments`、`artifacts`、`ircQueue` 并列，不能混成一个对象。

### 4.2 真实路由与读取

- 具体讨论路由 [`app/routes/_lab.discussions.$discussionId.tsx:7-24`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/app/routes/_lab.discussions.%24discussionId.tsx#L7-L24) 并行读取 `readPage('discussion',{conversation})` 与 `readConversation`，经 `LabPageEntry` 挂载。
- 列表入口 [`app/routes/_lab.discussions.index.tsx:6-19`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/app/routes/_lab.discussions.index.tsx#L6-L19) 先读 discussions，随后读取 selected 会话详情。
- 页面组件 [`renderer/features/lab-discussions/ui/discussions-page.tsx:53-61`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L53-L61) 使用 `useDiscussionsController(data)`。
- 浏览器 bridge 实际调用 `labConversationRead` 并解析 `ConversationDetailWireSchema`，发送命令调用 `labCommand`，见 [`client/services/lab.ts:92-104`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/client/services/lab.ts#L92-L104)。

### 4.3 当前清单存在，但显示有解析范围

[`client/services/lab/project-discussions.ts:143-165`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/client/services/lab/project-discussions.ts#L143-L165) 将 `selectedDetail.context` 放入 `initialLoadedArtifactIds`；可显示 artifact 元信息来自该选中会话自身 artifacts，加目录中 store File 输出。

[`discussions-view-model.ts:356-360,423-426`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/model/discussions-view-model.ts#L356-L426) 对 loaded id 查 `fixture.artifacts`，查不到就过滤，不造占位项。所以服务端返回的是完整 context 引用数组，**UI 的 view.loaded 并非对所有合法引用保证逐项可见**。例如 load 允许同 Lab 另一会话的讨论产物，而这里 artifact 元信息投影不包含其他会话所有讨论产物。此项是源码范围比较，不是浏览器实测。

Composer chips 见 [`discussions-page.tsx:550-579`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L550-L579)；侧栏 loaded 列表见 [`741-781`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L741-L781)。

### 4.4 “移除”没有实际命令，picker 也不是替换集合

- [`discussions-view-model.ts:568-575`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/model/discussions-view-model.ts#L568-L575) 固定 `canUnload:false`。
- chip 的 × JSX 在 `view.canUnload &&` 内，而且没有 `onClick`，见 [`discussions-page.tsx:562-571`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L562-L571)。侧栏“移除”同样 gated 且无 handler，见 [`769-777`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L769-L777)。所以不能把存在按钮文案说成当前可用卸载功能。
- picker 的选项点击发 `toggle_pick`，应用发 `apply_picker`，见 [`discussions-page.tsx:1067-1103`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/ui/discussions-page.tsx#L1067-L1103)。controller 的 `toggle_pick` 明确阻止改变已在 `initialLoadedArtifactIds` 中的项，见 [`controller/use-discussions-controller.ts:121-139`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/controller/use-discussions-controller.ts#L121-L139)。
- picker/apply 和单项 load 的真实命令均为 `discussion.load`，见同文件 [`109-119`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/controller/use-discussions-controller.ts#L109-L119)。reducer 的局部 `selection.filter(...)` 只是未提交 picker 选择，不能视为从 DB 删除，见 [`model/discussions-view-model.ts:146-162`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/model/discussions-view-model.ts#L146-L162)。
- `attach` 入口只 `uploadArtifact`，没有自动调用 `discussion.load`，见 [`controller/use-discussions-controller.ts:152-162`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/renderer/features/lab-discussions/controller/use-discussions-controller.ts#L152-L162)。上传产物、选择 context 是独立操作。

### 4.5 当前失效路径

load 写完发布 `conversation{id}`（§2.3）。客户端 [`client/services/lab/invalidation.ts:19-22,62-86`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/client/services/lab/invalidation.ts#L19-L86) 把 conversation 变更映射为同会话 conversation read、discussion/discussions/datasets 等读取失效。这里是对当前代码和 D12 表的一致性观察，不声称已经跑浏览器证明重读结果。

## 5. lab_open_artifact、context、references、inputs 分别是什么

### 5.1 当前 open 工具可读范围（仅列已证明的实现）

[`tools.ts:202-212`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L202-L212) 的 `lab_open_artifact` 输入只有 `artifact:ArtifactRef`，调用 `artifactBytes`，成功后写本会话 inputs、附加 references、发布 conversation 通知并返回路径。

`artifactBytes` 的两个实际分支见 [`tools.ts:126-155`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L126-L155)：

- `store:`：请求传入 `source.storeUrl` 的 `objects/<引用内容标识>`；此函数不查 context、不要求该对象出现在本讨论绑定运行或目录图中。
- `discussion:`：按 artifact id join 产生会话，并要求 `conversation.labId === source.lab`；读取产生会话 worktree 的 `snapshot`。没有要求产物来自调用者本会话，也没有查询 discussion_context。

`HostToolContext` 从调用会话提供 lab/store 配置，工具 dispatch 只校验工具名和输入后执行，见 [`tools.ts:22-33`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L22-L33)、[`272-277`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L272-L277)。这仅说明现有读取边界，不提出任何应新增的限制，也不宣称实测过可读对象或跨 Lab 请求。

### 5.2 四种对象与其已观察到的生命周期动作

| 对象 | 存在哪里、如何开始 | 现有行为与其他对象的区别 |
| --- | --- | --- |
| context 成员关系 | `discussion_context(conversation_id,artifact_id)`；由人调用 load 插入 | 是该会话当前被装载的引用集合；prompt 读此表；无业务删除 caller。不是字节缓存，也不是工具读取历史 |
| discussion artifact 本体 | 产生会话 worktree `artifacts/...` 不可变快照，`artifact_meta` 指向它 | `saveSnapshot` 写快照/元数据，`artifactMetaWire` 出线引用；不写 context。见 [`tools.ts:78-114`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L78-L114)、[`214-226`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L214-L226) |
| references 附件 | `conversation_attachment`；成功 open 后 `attach(...,'references',{artifacts:[ref]})` | 带 conversation/toolCallId，表示该工具调用附加的引用；open 不把它加入 context。schema 见 [`schema.ts:146-155`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/schema.ts#L146-L155)，wire 见 [`rows.ts:235-249`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/protocol/lab/rows.ts#L235-L249)，写入见 [`tools.ts:117-123,206-210`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L117-L123) |
| inputs 字节副本 | open 成功后写调用会话 worktree：store 分支 `inputs/store/...`，discussion 分支 `inputs/discussion/<id>/<name>` | 是引用源字节的近处副本；返回工作树相对路径。`writeOnce` 遇已有文件不再写；不成为 context/原产物的源头。目标生成见 [`tools.ts:135-155`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L135-L155)，写入见 [`67-74`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L67-L74)、[`206-211`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/tools.ts#L206-L211) |

独立读取也可交叉证明：[`datasets.ts:72-84`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/server/lab/datasets.ts#L72-L84) 分别查询 context 表与 references 附件表；[`client/services/lab/project-discussions.ts:74-82`](https://github.com/Pepgent/Pepgent/blob/main/apps/web/src/client/services/lab/project-discussions.ts#L74-L82) 按 assistant toolCallId 将 references 附件投影到消息，不拿它当当前 loaded 集合。

因此只可报告现有的分离：load 不等于 open；open 不等于 load；references 不等于当前 context；inputs 不等于不可变快照的拥有源。当前没有 unload 行为，不能凭空描述它将删除哪些其他对象。

## 6. 已通过 D7/D12 与本次待补的边界

| 主题 | 已通过原文/契约 | 本次源码观察，及不能推出的意思 |
| --- | --- | --- |
| context 源头与持久 schema | [D7:62 / D7-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L62)：Lab sqlite、web 单写；[D12:48 / D12-16](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L48)：artifact_id 存 ArtifactRef，去掉 artifact_meta 外键 | 对应 §2。不能改称 omp transcript 或 inputs 是 context 权威 |
| 装载后附清单 | [D7:67 / D7-07](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L67) 原文：“人选中的产物 id 记入 discussion_context；下一条 prompt 前附上这些产物的清单，agent 用 lab_open_artifact 读取。” | 当前代码每次 queue deliver 都附当前持久集合。原文的“下一条”明确了装载之后的下一次投递，但没有写成“仅下一条然后清空”，也没有在此原文逐一列举后续每条、steer、各入口。不得将任一种扩展读法冒充用户已明示意图 |
| 引用身份与 detail | [D12:34 / D12-02](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L34)：store/discussion 属主限定引用；[D12:330-338](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L330-L338)：detail 中 context/attachments/artifacts/ircQueue 分列 | 对应实际 ids.ts/catalog.ts，不是假定的 conversation.ts |
| load 与 prompt 命令 | [D12:456-466](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L456-L466)：明确列 discussion.prompt、discussion.load、bind/rename/move/archive、panel.prompt、human.irc；[D12:42](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L42)：prompt 入 queue 即返回，后续回复走 conversation | 当前 load 是 additive 实现。这里没有 unload 命令；不能把新的成员退出操作说成既有已通过接口，也不能由“入队返回”推论在入队时冻结 context |
| 权限 | [D12:544-559](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L544-L559)：load 是 write 且讨论 owner；discussion.prompt 是 discussion:prompt 且 owner；Panel、human.irc 有各自条目 | §2/§3 核实当前 caller。报告不为新命令提出权限方案 |
| 失效 | [D12:628](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D12-lab-wire.md#L628)：装载上下文变化属于 conversation 频道，失效对应会话 read 与相关页面/datasets | 当前 load 确实发该频道；不因此假定新命令已经实现 |
| artifact 读取与副本 | [D7:65 / D7-05](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L65)：open 拷 store 对象或讨论快照到 inputs，inputs 只是近处副本；[D7:67](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L67)：工具记录形成 references，快照是讨论产物权威 | 当前 open 没有 context allowlist 判断。不能把 context 当作已定权限围栏，也不能因拟议 unload 就推断删除原产物/附件/inputs 的既定意图 |

**可供父席作判断的事实边界只有：** 当前逐次投影实现已经存在；已有持久集合没有业务成员退出路径；UI 的移除 JSX 不可用；D7/D12 给出了上述已定文字与接口，但未定义 `discussion.unload`。频率应否进一步明文、是否增加成员退出操作及其契约属于父席审议，不在本报告中裁定。

## 7. 完成范围与验证缺口

已完成本次要求的静态事实核验及单一报告；未改工程、未立案、未投票。源码结论覆盖当前读取到的 main 调用链与指定设计正文，不是运行环境、数据库现存行或 UI 可操作性的运行证明。**明确未做 runtime 验证；按本次只读授权，没有剩余需本席执行的测试、build/check 或 live runtime 操作。**
