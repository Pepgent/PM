# D12 计票轮次与反例处理

## 第 1 轮（17 条全表）

| 族 | 结果 |
| --- | --- |
| Claude（LabWireClone） | 17 赞成（`votes/D12-claude.md`） |
| argon | 17 赞成，0 否决；裁定 D12-12 的 guest 已读不属 V-6 禁止的写入、D12-10 的 `project.*` 不与原意冲突、D12-15 符合基线 2 与 V-3（`votes/D12-argon.md`） |
| 导师 | 10 赞成，7 反对（D12-02、08、09、10、12、13、17），附具体反例（`votes/D12-mentor-r1.md`） |

## 导师反例的处理

| 条目 | 反例 | 处理 |
| --- | --- | --- |
| D12-02 | `Record<never, never>` 不拒绝多余字段，旧 `{tab}` 能传给无参的 settings | 采纳，改条目：`NoParams = Record<string, never>`，运行时 `z.object({}).strict()` |
| D12-08 | 页面 `selected` 内嵌 `ConversationDetailWire`，与 `lab.conversation.read` 形成同一会话详情的两个读取位置 | 采纳，改条目：讨论页只给 `selected: ConversationId`，详情只经 `lab.conversation.read` |
| D12-09 | 公开类型保留 `instrument` 触发，与 D8-16 把 P8 移出第一版冲突 | 采纳，改条目：触发联合只留 `event`、`schedule`，`instrument` 列入 D9 |
| D12-10 | 命令以 `*` 和命令族描述，联合与权限不完整 | 部分反驳、部分采纳：完整联合与逐 `kind` 结果映射已在“命令与结果”一节（导师材料只含决策表摘要）；为使每个 `kind` 恰有一条权限规则，新增逐命令权限表，条目文字改为指向该表 |
| D12-12 | guest 持久化 `readAt` 与 V-6 冲突；分类应为串联 | 反驳实质部分：V-6 是 argon 的意图红线，argon 已依 (U) 裁定个人阅读位置不属于其禁止的领域写入（D1-16 由 argon 裁决意图）。采纳分类意见：改为“串联” |
| D12-13 | 上传与两个代理路由缺方法、参数、响应与媒体类型 | 采纳，改条目：新增“HTTP 路由”表，逐路由写明方法、参数、请求体、响应、媒体类型与权限 |
| D12-17 | `LabChange` 未定义；Panel 会话头变化的失效没有闭合 | 反驳第一点：`LabChange` 在“事件”一节原样列出（D7:130-132 的联合）。采纳第二点：发起 `panel.prompt` 的页面在命令返回后失效自身；Panel 会话头改变时发 `conversation{id}`，`panels` 含该 id 的页面重读；失效表同步 |

## 第 2 轮（重投 D12-02、08、09、10、12、13、17）

| 族 | 结果 |
| --- | --- |
| Claude | 7 赞成（`votes/D12-claude-r2.md`） |
| argon | 7 赞成；V-1 至 V-6 未触发（`votes/D12-argon-r2.md`） |
| 导师 | 6 赞成；D12-13 反对，新反例：读取与流路由缺成功授权前提，跨 Lab 用户可凭 agent/run id 读取另一 Lab 的流、文件与卷（`votes/D12-mentor-r2.md`） |

处理：采纳。“HTTP 路由”表逐路由写明成功授权前提，表下新增“读取范围与归属”：同一 Lab 成员（含 guest）可读该 Lab 全部会话，`panels` 只是页面选择范围；根 agent 归属 `conversation.lab`，子 agent 与卷文件归属所在运行的 `experiment_ext.lab_id`；`jobs` 与 `objects` 为本中心任一 Lab 成员（D7-19）。

## 第 3 轮（重投 D12-13）

| 族 | 结果 |
| --- | --- |
| Claude | 赞成 |
| argon | 赞成；并依 (U)（`01a18e1f #2dbf970b`、`01a192a2 #ed4570ad`）认定同 Lab 成员可读他人 Panel 会话不与原意冲突 |
| 导师 | 赞成 |

## 结果

D12-01 至 D12-17 全部通过：三族各 17/17 赞成，0 否决。导师的全部反例均已以修改条目或证据反驳处理。
