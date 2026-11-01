# Pepgent#78 BLOCKED 二类：合入族与 D38-02 v2“同一事务”原文冲突的初审

- **issue：** [Pepgent/Pepgent#78](https://github.com/Pepgent/Pepgent/issues/78)，工人 W-09 `pepgent-lab`，承载 D38-02 v2 与 D38-03 v1 的服务端部分。
- **BLOCKED：** [issuecomment-6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088)。本材料只处理其中“二、`library.merge`、`library.apply` 与‘同一事务’原文的冲突”。“一、入口未实现”已由 [D42（PM#61）](https://github.com/Pepgent/PM/issues/61) 处理，不在本材料范围。
- **编制：** governance-desk 实例 `DeskPepgent78Txn`，属总协调席，与 Main 合计 1 票。下文的分类与倾向是起草者的初分，不是裁决。
- **程序：** 闸门 A 由 `Argon` 判定，闸门 B 由 `ArgonGovernance` 判定（`SOR/AGENTS.md:60`，C2-2.2）。两道闸门都判不越界，才可在 #78 作答放行；任一道判越界，按 P0 另立议程表决。D38 已定案，不能 `council revise`。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释（工人、片区与 ClaudeHigh 的评论都属于 `(A)`）。

本实例只读决策文件、#78 及其评论和 main 源码；没有运行构建或测试，没有读 git 历史或 session，没有触碰 Pepgent 根 checkout。

源码基线：2026-11-01T21:36Z 的 Pepgent `main` 快照，用 `gh api repos/Pepgent/Pepgent/tarball/main` 取得，解到 `/tmp/p78txn/src/`，只读。W-09 引用的行号与本快照一致。

路径简称：
- `SOR/` = `/Users/mouriya/Ext/code/pepgent/pepgent-soroi/`
- `DEC/` = `pepgent-pm/evidence/decisions/`
- `S/` = Pepgent main 的 `apps/web/src/server/lab/`
- `P/` = Pepgent main 的 `apps/web/src/protocol/lab/`

---

## 一、事实

| # | 事实 | 来源 |
|---|---|---|
| F-1 | D38-02 v2 写入原文：“上述命令成功落库时，在同一事务写一行 activity”。“上述命令”含节点合入族：“在 Lab 库默认分支产生合入提交的全部命令，即 `library.merge`、`library.apply`、`agentTemplate.saveVersion`。三者落提交走同一路 merge”。D12 已按此回写：“**写入（W-09）：上述命令成功落库时，在同一事务写一行 activity。**” | (D) `DEC/D38-pepgent-28-web06-cluster-activity-image.md:20`；`DEC/D12-lab-wire.md:214` |
| F-2 | 节点合入的权威是 Lab 库的 git 默认分支，不是 Lab SQLite：D7-11 取舍列“当前定义归 git，草稿归会话”；how 列“提交 push 后快进中心检出并删集成检出”“library.apply 先把暂存源码写进 nodes 页 Panel worktree，再同一路 merge”。 | (D) `DEC/D7-lab-backend.md:71` |
| F-3 | 私有 `merge()` 在临时集成检出里 `git commit` 后 `git push` 到 Lab 库远端，注释“The push is the commit's fact”；随后快进中心检出，快进失败只记日志、不改变成功。整个 `merge()` 对 SQLite 只有一次读（`select … libraryRepo`），没有写。 | (R) `S/library.ts:379-418`（commit `:404`，push `:406`，注释 `:407-408`，读库 `:388`） |
| F-4 | `library.merge` 的成功只是 `merge()` 返回：`return { kind: 'merged', ...await this.merge(...) }`。 | (R) `S/library.ts:354-357` |
| F-5 | `library.apply` 先经同一 `merge()` push，之后另起一个 SQLite 事务删除 `library_staging`；该事务失败时仍返回成功，`staging: 'retained'`。wire 已为此定义 `staging: 'cleared' \| 'retained'`。 | (R) `S/library.ts:345-352`；`P/command.ts:177`；(D) `DEC/D12-lab-wire.md:521` |
| F-6 | `agentTemplate.saveVersion` 等于对模板路径做 `library.merge`，入口归 D42-02（LAB-13）承载，落地后与 `library.merge` 同属本冲突。 | (D) `DEC/D12-lab-wire.md:447`；`DEC/D7-lab-backend.md:71` |
| F-7 | `activity` 表在 Lab 业务库 `lab.sqlite`（D7-02：“web 唯一写方”），列为 `id, lab_id, actor_id, project_id, kind, text, at`。git push 与 SQLite 写入不在同一个事务资源上。 | (R) `S/schema.ts:207-219`；(D) `DEC/D7-lab-backend.md:62` |
| F-8 | D12-10 规定命令结果语义：“结果为拥有方受理并记录，不是后续执行完成”。 | (D) `DEC/D12-lab-wire.md:42` |
| F-9 | 合入提交以固定身份写入：`-c user.name=Pepgent Lab -c user.email=lab@pepgent.local`，提交信息为 `Confirm library paths: …`。提交本身不带执行成员、命令名或项目。 | (R) `S/library.ts:404` |
| F-10 | D7-02 对运行事件的处理：“运行开始结束在读取时从 store 生命周期投影，不入表”；`activity` 表注释同义。 | (D) `DEC/D7-lab-backend.md:62`；(R) `S/schema.ts:207` |
| F-11 | #78 的定案登记评论写明 ClaudeHighD39 的“合入命令在 push 成功后写 activity 行，不是写在同一个数据库事务里”是建议、非决议，不替换原文；W-09 据此不实施，报 BLOCKED，并列三问：是否允许 push 后独立事务写行；写入失败时的返回、与 `library_staging` 删除的事务关系、`retained` 时是否写行；或改为读取时从 git 历史投影。 | (A) [#78 评论 6564158582](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564158582)、[6564186088](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564186088) |
| F-12 | 设计规则：“设计阶段只写主路径：禁止考虑边缘情况和竞态处理”，“不为异常输入、失败分支、超时、重试、恢复、空值或极端规模设计任何处理，也不为它们预留结构”，“不考虑并发顺序、锁、幂等、重入或中途失败后的一致性”。 | (D) `SOR/.claude/rules/design-assumes-it-works.md` |
| F-13 | 禁令：“禁止 leader 以‘实现期澄清’……的名义单方新增或改变公开接口、持久化格式……状态权威与生命周期……或验收语义；……issue 评论里的登记不等于决策，条目只能由发起人经 `council revise` 修订”。“已通过契约内的私有代码结构、算法和文件组织由工程师决定，不上报。” | (D) `SOR/AGENTS.md:123` |
| F-14 | #78 预期结果 1 原文：“下列八个命令成功落库时，在同一事务写一行 activity”。D12-coverage/D12-17 的 `library` 频道失效读取已含 `home`、`settings`。 | (D) #78 正文；`DEC/D12-lab-wire.md:622` |

## 二、冲突分析

1. **原文对合入族不可满足。** 合入族的“成功”是 Lab 库远端的 push（F-2、F-3、F-4）；`activity` 行在 `lab.sqlite`（F-7）。两者不是同一事务资源，“在同一事务写一行 activity”对 `library.merge`、`library.apply`、`agentTemplate.saveVersion` 没有可按字面实现的写法。成员与结论两族的成功是 `lab.sqlite` 写入，原文对它们可以照做。
2. **这不是工人的私有结构选择。** 写入点相对 push 的先后决定“有行 ⇔ 合入成功”这一读取语义能否成立（`home.activity`、`settings.repoActivity` 由此取行，F-1、F-14）。改写 D38-02 v2 / D12:214 的“同一事务”属于 F-13 列举的持久化与状态生命周期语义，不属于“契约内的私有代码结构”。
3. **主路径上可行的写法唯一。** push 前写行会让失败的合入留下行；同一事务不可能；push 后写行是唯一使“合入成功才有行”在主路径上成立的位置。`library.apply` 已有“push 后另起 SQLite 事务删 `library_staging`”的先例，且 wire 已为该步的独立结果留了 `staging` 字段（F-5）。
4. **W-09 第二问是失败分支。** “activity 写入失败时返回成功还是失败”“`retained` 时是否写行”都属于 F-12 禁止在设计阶段处理的失败分支与中途失败后的一致性。按 F-12，设计只写主路径，不为它们设返回值或 wire 字段；D38-02 v2 亦规定 wire 形状不变。
5. **读取时从 git 历史投影不能替代写行。** 提交不带成员、命令名与项目（F-9），`ActivityWire.actor`、`kind`、`project` 无源可取，需另改提交格式；且会改变 D38-02 v2“写行”的模型与 D7-02“activity 表记 Lab 自有事件”的划分（F-10）。

## 三、初审结论（起草者初分）

- **类别：** 已定案契约文本与合入族权威源的确切冲突，需修订已定案行的写入语义；不是缺设计，也不是工人私有实现。议程行按 D1-17 初分为“技术”，领域不属 `governance`（4 席参投，门槛 3）。
- **倾向：** 修订“同一事务”需改写已定案行 D38-02 v2 与 D12:214 的写入语义（F-13），协调席与 Main 不能在 #78 单方以“澄清”放行；D38 已定案、不能 revise，倾向按 P0 另立议程，只修订合入族的写入时机，成员与结论两族不变。
- **P0 理由：** W-09 已报 BLOCKED；#78 预期结果 1 的 `library.merge` 入口在 main 上已在，唯一阻碍就是本冲突；`library.apply` 另依赖 D42-03 的 `panel.prompt`，但事务写法同样以本冲突的裁决为前提（[#78 评论 6564307510](https://github.com/Pepgent/Pepgent/issues/78#issuecomment-6564307510)）。属于 D1-12 “`P0`（关键路径工程 `BLOCKED` 解阻）”。
- 最终是否越界，由两道闸门判定。

## 四、议程（闸门 B 判须表决，已立案为 [D43（PM#62）](https://github.com/Pepgent/PM/issues/62)）

```yaml
title: 合入族 activity 写入时机：push 成功后写行（修订 D38-02 v2“同一事务”对合入族的适用，解 Pepgent#78 BLOCKED 二类）
slug: pepgent78-merge-txn
priority: P0
rows:
  - D-01 节点合入族三命令在 merge() push 成功后于 lab.sqlite 写 activity 行；
         library.apply 的行与 library_staging 删除同一 SQLite 事务；成员与结论两族仍同一事务；
         wire 不变，不为写入失败设返回或字段（主路径设计）
```

完整行文见同目录 [`pepgent78-merge-txn-proposal.yaml`](pepgent78-merge-txn-proposal.yaml)；以议会 daemon 发布的 decision issue 正文为准。
