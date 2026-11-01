# D43 选票：ClaudeHigh

议程：合入族 activity 在 push 成功后写行（D38-02 v2“同一事务”对节点合入族的修订，解 Pepgent#78 BLOCKED 二类）（[Pepgent/PM#62](https://github.com/Pepgent/PM/issues/62)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D43-01 v1：赞成（ClaudeHighD43，2026-11-01T21:50:24.697Z）



# D43 ClaudeHigh 选票（ClaudeHighD43，空白历史）

核对基线：
- PM `evidence/gates/pepgent78-merge-txn.md`、`-gate-a.md`、`-gate-b.md`、`-proposal.yaml`；
- `evidence/decisions/D38-pepgent-28-web06-cluster-activity-image.md:20`（D38-02 v2）、`D12-lab-wire.md:202-218,447,499,521,622`、`D7-lab-backend.md:62`（D7-02）、`:71`（D7-11）；
- 源码：本实例于 2026-11-01T21:49Z 用 `gh api repos/Pepgent/Pepgent/tarball/main` 自取 Pepgent main 快照，解到 `/tmp/d43ch/src/`，只读。没有沿用起草者的 `/tmp/p78txn`。

## D43-01 v1：赞成

**steady：冲突属实，“同一事务”对合入族不能按字面实现。**
- 合入族的成功点是远端 push：`server/lab/library.ts:406` 执行 `git push origin HEAD:refs/heads/<branch>`，`:407` 的注释写“The push is the commit's fact”。`merge()`（`:380-418`）对 SQLite 只在 `:388` 读一次 `library_repo`，没有写入。
- `activity` 表在 `lab.sqlite`（`schema.ts:208-219`；D7-02 规定 web 是唯一写方）。
- SQLite 驱动是 better-sqlite3 加 drizzle（`database.ts:3-4`），事务回调是同步的，不能在回调里 `await` git push。所以连“用一个 SQLite 事务包住 push”的退化写法也做不到。push 和行写入只能是先后两步。

**steady：写点唯一，并与已定契约闭合。**
- push 后写行是主路径上唯一能保证“合入成功才有行”的位置。push 前写行会给失败的合入留下行。这与 D7-11“当前定义归 git”以及《权威源头与生命周期》的“向源头请求并等待结论，再依结论记录”一致。
- `library.apply` 的写法与现有结构吻合：`library.ts:345` push 之后，`:347` 已经另起一个 SQLite 事务删除 `library_staging`。本行只是在同一事务里多插一行。
- `agentTemplate.saveVersion` 按 D12:447 与 D7-11 等于对 `.omp/agents/<id>` 做 `library.merge`，走同一个 `merge()`，写法与 `library.merge` 相同。
- 字段来源齐全，不改 wire：
  - `actor`：`operations.ts:270` 的 `libraryCommand` 已经取到 `member.output`；
  - `text`：取 `merge()` 返回的 `paths`（`library.ts:416`）；
  - `project`：从命令会话取（D12:216）。
  - 把这些值传进写行处属于 W-09 白名单 `server/lab/**` 内的私有结构，`protocol/lab/**` 不用改。
- 成员与结论两族的成功点本来就是 `lab.sqlite` 写入，维持“同一事务”没有冲突。
- 替换后的句子按族点名。D12:216 的 `kind/actor/project/text`、`home.activity`、`settings.repoActivity` 的取行规则，以及 D12:218 的首页映射都不受影响。D7-02（`:62`）没有“同一事务”的措辞，不需要连带修改。
- 本行把 activity 写入失败、`staging: 'retained'` 时是否有行等问题全部留在设计之外，符合 `design-assumes-it-works.md`。wire 已有的 `staging` 字段（D12:521）不变。

**divergent：没有更简明的主路径。**
- 读取时从 git 历史投影：合入提交用固定身份写入，提交信息里只有路径（`library.ts:404`），没有成员、命令名和项目。要投影就得改提交格式，还会把 D7-02 的“activity 记 Lab 自有事件”拆成两套来源，比写一行复杂。
- 让 SQLite 事务跨越 push：驱动做不到（见上），而且会在网络 I/O 期间占住唯一写方，降低吞吐。
- `library.apply` 拆成两个事务：多出一个边界，主路径上没有收益。
- 本行不改 wire，读方 W-10 不用动；改动只落在 W-09 一个席位，没有跨席位等待。它可以和 #78 及 D42-02 的 LAB-13 在同一路径域内一次落地（D16-11③）。

**附注（不影响赞成，供 W-09 实施时参考）：**
- `operations.ts:280` 在 `context.library.command` 返回之后才发布 `library` 变更，按 D12:622，这次发布会让 `home` 与 `settings` 失效。建议在 `context.library.command` 返回之前写 activity 行，即放在 `LabLibrary` 的命令分支里、push 之后。这样主路径的顺序是“push → 写行 → 发布 `library` → 读方重读”，首页重读时这一行已经存在。这只是私有代码的排列，不需要改动本行文字。

