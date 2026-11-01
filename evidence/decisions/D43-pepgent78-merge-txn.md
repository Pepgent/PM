# D43：合入族 activity 在 push 成功后写行（D38-02 v2“同一事务”对节点合入族的修订，解 Pepgent#78 BLOCKED 二类）（P0）——定稿

决策 issue：[Pepgent/PM#62](https://github.com/Pepgent/PM/issues/62)。发起：Coordination（DeskPepgent78Txn）。本文件由议会 daemon 生成。

## 事实

初审材料：[`evidence/gates/pepgent78-merge-txn.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent78-merge-txn.md)。闸门 A 与闸门 B 的判定：同目录下 `pepgent78-merge-txn-gate-a.md`、`pepgent78-merge-txn-gate-b.md`。

**P0 依据。** W-09 已在 [Pepgent#78 评论 6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) 报 BLOCKED，其“二”指出 `library.merge`、`library.apply` 与“同一事务”原文冲突，[评论 6564307510](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564307510) 维持 BLOCKED。D1-12 规定：“`P0`（关键路径工程 `BLOCKED` 解阻）”。第一类（入口未实现）已由 [D42（PM#61）](https://github.com/Pepgent/PM/issues/61) 处理，不在本议程。

**决策正文（D）。**
- D38-02 v2 写入原文：“上述命令成功落库时，在同一事务写一行 activity”；节点合入族为“在 Lab 库默认分支产生合入提交的全部命令，即 `library.merge`、`library.apply`、`agentTemplate.saveVersion`。三者落提交走同一路 merge”（`DEC/D38-pepgent-28-web06-cluster-activity-image.md:20`）。D12 已回写同句（`DEC/D12-lab-wire.md:214`）。
- D7-11 取舍：“当前定义归 git，草稿归会话”；how：“提交 push 后快进中心检出”“library.apply 先把暂存源码写进 nodes 页 Panel worktree，再同一路 merge”（`DEC/D7-lab-backend.md:71`）。
- D7-02：`activity` 在 Lab 业务库 `lab.sqlite`，“web 唯一写方”；“运行开始结束在读取时从 store 生命周期投影，不入表”（`DEC/D7-lab-backend.md:62`）。
- D12-10：“结果为拥有方受理并记录，不是后续执行完成”（`DEC/D12-lab-wire.md:42`）；`library.apply` 结果带 `staging: 'cleared' | 'retained'`（`:521`）；`agentTemplate.saveVersion` = `library.merge` 该模板路径（`:447`）。

**源码（R，Pepgent main 2026-11-01T21:36Z 快照）。**
- 私有 `merge()` 在集成检出 `git commit`、`git push` 到 Lab 库远端，注释“The push is the commit's fact”；对 SQLite 只读 `library_repo` 一次，没有写（`apps/web/src/server/lab/library.ts:379-418`，commit `:404`，push `:406`）。
- `library.merge` 的成功即 `merge()` 返回（`library.ts:354-357`）。
- `library.apply` 经同一 `merge()` push（`:345`）后，另起 SQLite 事务删 `library_staging`，失败仍返回成功、`staging: 'retained'`（`:346-352`）。
- 合入提交以固定身份 `Pepgent Lab <lab@pepgent.local>` 写入，提交不带成员、命令名或项目（`:404`）。
- `activity` 表列为 `id, lab_id, actor_id, project_id, kind, text, at`（`schema.ts:207-219`）。

**冲突。** 合入族的成功是 Lab 库远端的 push，activity 行在 `lab.sqlite`，两者不是同一事务资源；“同一事务”对合入族三命令不可按字面实现。成员与结论两族的成功是 `lab.sqlite` 写入，原文可照做。

**设计规则（D）。** `pepgent-soroi/.claude/rules/design-assumes-it-works.md`：“设计阶段只写主路径：禁止考虑边缘情况和竞态处理”；“不为异常输入、失败分支、超时、重试、恢复……设计任何处理，也不为它们预留结构”；“不考虑……中途失败后的一致性”。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D43-01 v1 | 节点合入族（`library.merge`、`library.apply`、`agentTemplate.saveVersion`）的 activity 行在合入 push 成功后写入 `lab.sqlite`，不与 push 同一事务；成员与结论两族维持同一事务 | D38-02 v2 写入段与 D12“Lab 自有活动的读取与首页投影”写入句（`DEC/D12-lab-wire.md:214`）；`apps/web/src/server/lab/**`（W-09，`library.ts` 的 `library.merge`、`library.apply` 分支及 LAB-13 的 `agentTemplate.saveVersion`） | D38-02 v2 / D12:214 的写入句改为：<br><br>> **写入（W-09）：** 成员与结论确认两族命令成功落库时，在同一事务写一行 activity。节点合入族三命令的成功是合入提交 push 到 Lab 库默认分支（D7-11）；W-09 在 push 成功之后于 `lab.sqlite` 写一行 activity：<br>> - `library.merge`、`agentTemplate.saveVersion`：push 成功后，单独一个 SQLite 事务写该行；<br>> - `library.apply`：push 成功后，该行与删除所选 `library_staging` 行在同一个 SQLite 事务。<br><br>`kind`、`actor`、`project`、`text` 的取值，`home.activity`、`settings.repoActivity` 的取行，首页投影与失效，均按 D38-02 v2 原文不变。wire 形状不变，`protocol/lab/**` 不改。<br><br>本行只写主路径（`design-assumes-it-works.md`）：不为 activity 写入失败另设返回值、错误码或 wire 字段，不设补写、重试或对账。<br><br>本行通过后：秘书按本行替换 D12:214 写入句；AreaMgrPepgent 在 #78 登记并送达 W-09，W-09 照本行实施 `library.merge`、`library.apply`（后者另依 D42-03 的 `panel.prompt`），`agentTemplate.saveVersion` 随 D42-02 的 LAB-13 入口落地后照本行写行。 | **得到：** 合入族在主路径上“合入成功才有行”，`home.activity` 与 `settings.repoActivity` 照 D38-02 v2 取行；写点与 D7-11“当前定义归 git”的权威一致；`library.apply` 沿用现有“push 后一个 SQLite 事务清 staging”的位置，只多插一行；不改 wire，不改读方 W-10。<br>**代价：** 合入族的“提交已落地”与“activity 有行”不再原子；D38-02 v2 对成员、结论两族与合入族的写入表述不再一句统一。<br>**落选：**<br>- (a) 维持“同一事务”原文：git push 与 SQLite 不是同一事务资源，合入族无法实现；<br>- (b) push 前先写行：失败的合入会留下行，违背“合入成功才有行”；<br>- (c) 读取时从 Lab 库 git 历史投影合入活动：提交不带成员、命令名、项目（`library.ts:404`），`actor`、`kind`、`project` 无源，需改提交格式，并改变 D38-02 v2“写行”的模型与 D7-02 activity 表的划分；<br>- (d) 为 activity 写入失败规定返回失败、增加结果字段或补写机制：属失败分支设计，违反 `design-assumes-it-works.md`，且增加字段违反 D38-02 v2“wire 形状不变”；<br>- (e) `library.apply` 的行与 staging 删除分两个事务：多一个事务边界，没有换来主路径上的差别。 | 技术 | 否 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD43）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成 | **通过** 4/4（门槛 3） |

## 修订、仲裁与反例处置

无。

## 原票

各席原票见 `votes/D43-Coordination.md`、`votes/D43-ClaudeHigh.md`、`votes/D43-Argon.md`、`votes/D43-LeadMentor.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。