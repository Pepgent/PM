## D12-13 第 3 轮投票

**投票：赞成。**

本轮已经补齐第一、二轮指出的全部公开协议缺口。

### 1. 各路由已有明确的成功授权前提

当前权限列形成了完整的正向规则：

- `events`：
  - 调用者必须是指定 Lab 的成员。
- `agents/{id}/stream`、`agents/{id}/files*`：
  - 调用者必须是该 agent 所属 Lab 的成员。
- `artifacts/{id}`：
  - 调用者必须是产物所在会话所属 Lab 的成员。
- `volumes/{run}/...`：
  - 调用者必须是该运行 `experiment_ext.lab_id` 对应 Lab 的成员。
- `jobs/{run}/tail`：
  - 调用者必须是本中心任一 Lab 的成员。
  - 该范围与 D7-19 已确定的 remote home 不按 Lab 分区相符。
- `objects/{sha}`：
  - 调用者必须是本中心任一 Lab 的成员。
  - 该范围与 store 每中心一份、对象按内容寻址的归属模型相符。
- artifact upload：
  - `write` 且为会话 owner。

这已经足以让实现者确定每条路由何时可以成功，不再需要自行猜测 Lab、conversation、run 或 agent 的授权关系。

### 2. Panel 的列举范围与读取权限已经分开

新增说明明确：

- 同一 Lab 成员，包括 guest，可以读取该 Lab 全部会话；
- 读取权限不按角色或会话 owner 隐藏；
- `panels` 只列当前用户自己的 Panel 会话头，是页面的选择与呈现范围；
- 它不是一条禁止读取其他成员 Panel conversation 的权限规则。

这消除了我第二轮将“当前用户 Panel 列举范围”误读为“Panel conversation 只能由 owner 读取”的可能。当前规则也与 argon 基线一致。

### 3. agent 到 Lab 的归属链已经明确

归属关系现在有确定路径：

- 根 agent：
  ```text
  conversation.agent
  → conversation.lab
  ```
- 子 agent：
  ```text
  agentId
  → 槽位或 Mux 在线条目关联的运行
  → experiment_ext.lab_id
  ```

因此 agent stream 和 agent files 的成员检查有可追溯的权威来源，不需要根据请求路径、当前页面或客户端提交的 LabId 猜测。

### 4. conversation RPC 的读取授权也已统一

`lab.conversation.read` 与 `lab.conversation.models` 同样要求：

> 调用者是该会话所属 Lab 的成员。

HTTP agent/files 路由与 server function 不再采用两套互相冲突的会话可见性规则。

### 5. 原反例已经失效

第二轮反例中，Lab A 的成员拿到 Lab B 的 agent/run ID 后访问：

```text
GET /api/lab/agents/agent-b/stream
GET /api/lab/agents/agent-b/files?dir=.
GET /api/lab/volumes/run-b/.../files/result.txt
```

现在都会先沿 agent 或 run 的权威归属关系得到 Lab B，再检查调用者是否是 Lab B 成员。Lab A 的成员身份不能满足该成功授权前提。因此原反例已被直接消除。

对于中心级的 jobs 和 objects，公开读取范围则已明确是“本中心任一 Lab 成员”，这是 D7-19 和中心级 store/remote 生命周期的显式决定，不再是授权遗漏。

---

## 最终结论

**D12-13：赞成。**

**分类：同意“技术”。**

至此，我对 D12-01～D12-17 的最终票为：

> **17/17 全部赞成。**

D12 当前已经闭合以下关键部分：

- 权威外部形状的导入与生成；
- 13 页的完整参数与页面载荷；
- 完整的 48-kind 命令联合及逐 kind 结果、权限；
- 独立 conversation 读取；
- guest markRead 的 argon 权限裁决；
- 原始字节、artifact、agent files、volume files、SSE 与 tail 路由；
- 每条 HTTP 路由的成功授权前提；
- `LabChange` 联合与各切片失效；
- Panel 新建及会话头变化的失效闭环；
- D8-16/D9 第一版排除项；
- store、Mux、remote、omp 与 Lab 表之间的事实归属边界。