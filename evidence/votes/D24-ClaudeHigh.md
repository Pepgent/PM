# D24 选票：claude-high（独立空白历史高阶审查席）

审查对象：`local://decisions/D24-draft.md`，仅 D24-01。依据取自 `/tmp/govclone-pm/evidence/decisions/` 和 `/tmp/govclone-soroi`（已 `git pull`，HEAD `6fc3c95`）。来源 soroi#217 issuecomment-6559889645 未读，因为规则不允许查看 issue 历史，所以本票不核对该来源。

## 一、事实核对

| 草案事实 | 核对结果 | 依据 |
| --- | --- | --- |
| D5-16 情形二：eval 插件拿到 store 的提交结论后，向主会话投递带人类来源的 IRC，“principal 取自派生请求” | **属实**，与原文一致 | D5-plugins-eval.md:91 |
| 人类来源写作 `from = human:<principal>` | **属实** | D5:61；D3-12（D3-network-mux.md:66）；D3:80 `Principal = string // Lab 后端认证过的人`；代码 `subagent/main/human-irc.ts:15` 和 `supervisor.ts:501` |
| D19-01 中根端点的 derive 请求是 `{"method":"derive","parent","at","changes"}`，没有 principal | **属实** | D19:29；D5:312 和 D5:315 也一样 |
| `HumanHandback` 有 `by`；Lab 按 `conversation.owner` 授权，并用当前 UserId 填写 `by` | **属实** | D5:300；D12:43（D12-11）；D7-03 规定当前用户 id 既作 `principal`，也作 `HumanHandback.by`（D7-mentor-packet.md:11）；代码 `eval/endpoint.ts:25` 中 `by: z.string().min(1)` |
| 补充：principal 与 `by` 是同一种 id | **成立**。principal 就是 Lab 当前用户 id（D7-03），`by` 是 `UserId`（D12-02①）。两者同义，所以 `human:<by>` 与 D3-12 中 `human:<principal>` 的取值一致 | 同上 |
| 补充：落选方案“改取 `conversation.owner`”另有一处类型错误 | **成立，草案没有写出**。`conversation.owner` 与 `member.id` 比较（D12:42 D12-10、D12:514-515），所以它是 `MemberId`，不是 `UserId`。直接拿它当 principal，`human:` 后面会出现另一种 id。这进一步支持草案的选择 | D12:42、D12:514-515 |
| 代码现状：根端点还没有 derive | **属实**。`eval/endpoint.ts:28-34` 的 `RequestSchema` 没有 `derive` 分支，`eval/control.ts:7-12` 的 `RootControl` 只有 `writerSessions` 和 `abortRun`。仓内找不到 `"method":"derive"` 和 `derive(parent` | grep 结果为空 |
| where 中的“D12 中 derive 的线上调用（D12:605、615 一带）” | **不属实**。D12:600-620 是 WEB-02 的读取与介入时序，`605` 是 `participant MUX`，`615` 是 `event: change`，整段没有 derive。全文件只在 D12:425（GUI→Lab 的 `intervene.derive{run,at,changes}`）、D12:477 和 D12:515 提到 derive，都不是控制端点的线上写法。GUI 命令里不需要 `by`，`by` 由 Lab 自己填，所以 **D12 无需修改** | D12-lab-wire.md:425、477、515、600-620 |

## 二、投票

**D24-01：反对。** 我赞成方案的实质，只反对回写范围。where 中的回写清单补正后，我改投赞成。

### 理由

1. **实质正确（赞成部分）：** D5-16 的原文“principal 取自派生请求”是已通过的意图约束。D19-01 的 derive 请求没有带 principal，所以 SOR-15（D8:278）的 IRC 通知没有来源可填，这正是 BLOCKED 的原因。补 `by: UserId` 是最小的闭合办法：
   - 它与 `answer` 和 `takeover` 的 `HumanHandback.by` 同义、同源（D7-03）。
   - 端点不用再读 Lab 的会话归属，不会多出第二个权威。
   - store 的 `DeriveCommit`（D6:130）不变，主路径没有增加等待。
2. **回写范围不全，主路径会因此断裂（反对理由）：** D24 只要求回写 D19-01、D5:312 和 D12，而 D12 中并没有这种写法。仍以无 `by` 形状规定根端点 derive 请求的已通过正文还有这些，草案都没有列入：

| 位置 | 现文 |
| --- | --- |
| D3-network-mux.md:73（D3-19） | 根会话端点接受 `{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[]}` |
| D5-plugins-eval.md:315 | 线上请求体注释，与 :312 并列，草案只点了 :312 |
| D6-store-service.md:125-129 | `type Derive = { parent; at; changes }`，注释写明是“Lab 后端 → Mux → 控制端点”的请求，不是 store 的 `POST /runs/derive` |
| D6-store-service.md:299 | 时序 `LAB->>MUX: Derive{parent P, at InFlight{writerSession, slot}, ChangeInput}` |
| **D7-lab-backend.md:69（D7-09）** | Lab 把 `intervene.derive{run, at, changes}` “映射为根端点的 `{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[]}`”，这是 W-09 实现 Lab 派生的直接依据 |
| **D7-lab-backend.md:204** | 时序 `LAB->>MUX: POST /endpoints/eval:{root}/requests {"method":"derive","parent":run,"at":DeriveAt,"changes":changes}` |
| **D8-mvp-scope.md:276（SOR-13 切片契约）** | 根端点接受 `{"method":"derive","parent":RunId,"at":DeriveAt,"changes":Change[]}`，这是 W-07 的切片验收依据 |

### 反例（主路径，可按文件复现）

- **前提：**
  - W-07 按 D24 实现根端点的 `derive`，`by` 为必填。端点沿用 `eval/endpoint.ts:25`、`:28-34` 的 `z.strictObject` 写法。
  - W-09 按 D7-09（D7-lab-backend.md:69）和 D7:204 实现 `intervene.derive` 到根端点的映射。这两处 D24 没有要求回写。
- **过程：** F24（D8-mvp-scope.md:143；SOR-15，D8:278）中，GUI 在仍在运行的调用 C 处改参数，发出 `intervene.derive`。Lab 按 D7:69 发出 `{"method":"derive","parent":P,"at":{...},"changes":[...]}`，请求里没有 `by`。
- **结果：**
  - 根端点的 `RequestSchema.parse` 因缺少必填字段 `by` 拒绝请求（`endpoint.ts:51`），derive 没有执行，F24 失败。
  - 反过来，如果 W-07 以 D8:276 的 SOR-13 契约为准，不要求 `by`，D5-16 情形二又拿不到 principal，SOR-15 回到 soroi#217 的 BLOCKED。
- **结论：** 两条路都失败，根源是同一请求在 D24/D19 与 D3、D5:315、D6、D7、D8 中有两种互相矛盾的权威写法。

### 消除条件

把 D24-01 的 where 和回写指令改为：

- **删除：** “D12 中 derive 的线上调用（D12:605、615 一带）”。D12 无需修改，因为 D12:425 的 GUI 命令不带 `by`，由 Lab 填写。
- **D19-01（D19:29）：** 加入 `by`。
- **D3:73（D3-19）：** 加入 `by`。
- **D5:312 与 D5:315：** 签名加 `by: string`（或 `UserId`），线上请求体加 `"by":UserId`。
- **D6:125-129 与 D6:299：** `Derive` 加 `by`，时序中的 `Derive{...}` 同步修改。`DeriveCommit`（D6:130）和 `POST /runs/derive` 维持“不变”。
- **D7:69 与 D7:204：** 映射和时序都加上 `by`，并写明由 Lab 在按 D12:515 授权后填写当前 UserId。
- **D8:276：** SOR-13 行的 derive 写法加入 `by`。

以上改完、其余不变，我即改投赞成。

## 三、分类意见

- **意图：** 无争议。D5-16“principal 取自派生请求”已经是通过的意图约束，D24 照原文落实，没有改写。
- **技术：** 同意 `by: UserId`，与 `HumanHandback.by` 同名同义。同意 store 的 `POST /runs/derive` 和 `DeriveCommit` 不变。字段名的选择得当：principal 在 D3 中是 IRC 帧的字段名，控制端点一侧沿用 `by`，与 answer、takeover 一致。
- **串联：** 同意草案的分类“串联”，以及“缺失部分：D19-01 漏了 D5-16 要求的 principal”。串联面上的缺陷就是上面的反例：回写清单漏掉了 D3、D5:315、D6、D7、D8 五份正文中七处同一请求的写法，又错指了 D12。
- **实现：** 同意分工：W-07 在 `eval/endpoint.ts` 的 `RequestSchema` 加 `derive` 分支并解析 `by`，在 `RootControl` 加 derive；W-09 在 `apps/web/src/server/lab/**` 填写 `by`。代码中 `HandbackWire.by`（`endpoint.ts:25`）已经是现成写法，可以直接复用。
- **治理：** 计票规则（C2-3/U95，四席，≥3 赞成，有效反例清零）引用正确。回写由秘书直接替换正文，不留更正记录；七处须一次改齐，避免再出现同一线上请求有两种权威写法。

## 四、非阻断观察（不计入反例）

- **divergent 立场：** 还有一种做法是不传 `by`。根会话的人类消息写方本来就是 Lab（D3-12），Lab 收到 derive 成功回复 `{run}`（D19-02）后，可以自己以 `human:<当前 UserId>` 向根会话投递通知。但这要改写已通过的 D5-16 和 D5-mentor-packet.md:90 的裁定，比 D24 的改动大，所以本票不主张。

---

## 第 2 轮：对 v2 重投

审查对象是 `local://decisions/D24-draft.md` v2 的 D24-01 行（draft:21）。

### 逐项核对第 1 轮的消除条件

| 第 1 轮消除条件 | v2 是否满足 | v2 位置 |
| --- | --- | --- |
| 删除 D12:605、615 的引用；D12:425 的 `intervene.derive` 不变，`by` 由 Lab 填写 | **满足** | where 不再含 D12；how 写明“GUI 发给 Lab 的 `intervene.derive` 命令（D12:425，`by` 由 Lab 填写）”不变 |
| D19:29 | **满足** | where |
| D3:73（D3-19） | **满足** | where |
| D5:312 与 D5:315 | **满足** | where |
| D6:125-129 与 D6:299；`DeriveCommit`（D6:130）与 `POST /runs/derive` 不变 | **满足** | where 列出这两处；how 写明 `POST /runs/derive`、`DeriveCommit` 不变 |
| D7:69 与 D7:204；`by` 由 Lab 授权后填写 | **满足** | where 列出这两处；how 写明 Lab 按 `conversation.owner` 授权后填入当前 UserId。这与 D12:515“该运行的会话 owner”判定的是同一个人，D12-11 的写法也一样 |
| D8:276（SOR-13） | **满足** | where |
| 秘书一次改齐 | **满足** | how 写明“秘书一次性回写 where 中列出的九处正文” |

**范围复核：** 我在决策目录下用 `"method":"derive"|method.*derive` 重新检索了一遍，命中的只有 D19:29、D3:73、D5:315、D7:69、D7:204、D8:276。此外，D6:319 的 P6 占位只说“`derive` 与 `abort` 仍向根端点按运行寻址”，没有写请求形状，不需要改。D5:312 的签名和 D6:125-129 的 `Derive` 不含这串字面量，v2 已单独列出。`/tmp/govclone-soroi` 的 design 和代码里没有 derive 的线上写法。九处已经覆盖全部正文写法，同一请求不会再有第二种权威形状。

**how 语义：** 与 v1 相同，也就是第 1 轮已经赞成的那部分实质。v2 把 MemberId 的佐证写进了落选方案（D12:42、514-515），核对属实。

### 投票

**D24-01：赞成。**

第 1 轮的反例是“同一请求在 D24/D19 与 D3、D5:315、D6、D7、D8 中有两种互相矛盾的权威写法”。v2 把这几处全部列入回写，并删除了错指的 D12，反例已经消除。按 v2 回写之后：
- W-09 按 D7:69 和 D7:204 发出的请求带 `by`。
- W-07 按 D8:276 和 D24 解析 `by`，再以 `human:<by>` 投递 D5-16 情形二的 IRC。

F24 和 SOR-15 的主路径因此闭合。

### 分类意见

- **意图：** 无争议。D24 照 D5-16 原文“principal 取自派生请求”落实。
- **技术：** 同意 `by: UserId`，与 `HumanHandback.by` 同名同义（D7-03）。store 的 `POST /runs/derive`、`DeriveCommit` 和 GUI 的 `intervene.derive` 都不变。
- **串联：** 同意草案归为“串联”和“缺失部分”。回写清单已完整，没有剩余的串联缺陷。
- **实现：** 同意分工：W-07 在 `eval/endpoint.ts` 的 `RequestSchema` 加 `derive` 分支并解析 `by`，在 `RootControl` 加 derive；W-09 在 `apps/web/src/server/lab/**` 填写 `by`。
- **治理：** 计票规则引用正确，v1 的票已按 v2 作废重投。九处正文由秘书直接替换，不留更正记录。

第一部分的非阻断观察仍然有效，不计入反例。
