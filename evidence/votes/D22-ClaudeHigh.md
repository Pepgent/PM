# D22 投票：claude-high（独立空白历史审查席）

- **投票人：** claude-high（`GovClone_55b0.ClaudeHighD21`），依 U95 独立计 1 票。
- **审查对象：** `local://decisions/D22-draft.md` 的唯一条目 D22-01。
- **立场：** steady 与 divergent 合并执行，只看主路径。

## D22-01 Lab 中心检出缓存根路径由部署注入

**票：赞成**

**分类意见：** 串联。这一项把 Pepgent 已在消费的配置名，接到 deploy 已有的挂载点上，属于跨仓接缝闭合，不改意图，也不改技术选型。同意草案的分类。

### 逐条事实核对

| 草案陈述 | 核对结果 | 证据 |
| --- | --- | --- |
| D2-20 规定中心检出缓存卷挂进 Lab 后端容器 | 属实 | `/tmp/govclone-pm/evidence/decisions/D2-components.md:57`：“中心检出缓存卷和会话 worktree 卷都挂进 Lab 后端容器”；载体是可重建的近处副本，写方是 Lab 后端 |
| D7-19 写明集成检出放在该卷上；环境变量含“上述各卷的挂载路径”，但没有给出变量名 | 属实（出处需细化） | `D7-lab-backend.md:79`。“干净集成检出也放在这个卷上”出自 D7-19；D7-11（D7:71）只定义了 merge 操作本身。草案标注成“（D7-11）”，见建议 2 |
| `runtime.ts:45` 的内容 | 属实 | Pepgent `origin/main`（`dbc1120`）`git show` 第 45 行为 `cacheHome: resolve(environment.PEPGENT_LAB_LIBRARY_HOME ?? join(webRoot, 'lab-library'))`；`apps/web/README.md:159-160` 有对应说明 |
| compose `:107` 把 `library-cache` 卷挂到 `/var/lib/pepgent/library`；environment `:85-101` 没有注入该变量 | 属实 | `/tmp/govclone-deploy/stacks/pepgent-central/compose.yaml:107`、`:85-101`；deploy `origin/main` 为 `c0b56f3` |
| 当前库缓存落在 `web-state` 上的 `/var/lib/pepgent/web/lab-library`，`library-cache` 闲置 | 属实 | `runtime.ts:37` 中 `webRoot = PEPGENT_WEB_ROOT`；`compose.yaml:89` 设 `PEPGENT_WEB_ROOT=/var/lib/pepgent/web`，`:105` 挂 `web-state`；`library.ts:110-114` 在 `cacheHome` 下 `clone` |
| `PEPGENT_LAB_HOME` 已注入，对应 `lab-db` | 属实 | `compose.yaml:90`、`:104` |
| deploy README 卷表的 `library-cache` 行 | 属实 | `/tmp/govclone-deploy/README.md:108`：`/var/lib/pepgent/library`，写方为 Lab 后端，可重建 |

### 理由

1. **主路径闭合。** 注入 `PEPGENT_LAB_LIBRARY_HOME=/var/lib/pepgent/library` 之后：
   - 中心检出由 `library.ts:110-114` 在 `cacheHome` 下 `mkdir` 并 `clone`，于是落到 `library-cache` 卷上；
   - 该卷已由 state-init 交给 1000 属主（`compose.yaml:9-11`、`:18`）；
   - 落点与 D2-20、D7-19 的“卷按写方分开”以及 deploy README:108 一致，`web-state` 不再混放 Lab 库缓存；
   - 缓存本来就可以重建，所以切换根路径后，Lab 按 `library.ts:110-114` 在新根下重新 clone 即可，主路径不需要迁移步骤。
2. **与 D21 同 issue、同 PR 合理。** 两项的原因和验收相同（Lab 卷挂载路径未注入），改的是同一 Stack 的同一段 environment，符合 U83–U84 合并同域碎切片的要求。D21-01 写的是“deploy 新建 issue”，D22 只给这个 issue 定了名字并扩大了范围，D21 的决策行不受影响。
3. **回写位置正确。** 两个变量都写进 D7-19 的环境变量列表，D7-04 只做引用，同一接口不会在两处各写一遍。
4. **落选备选的理由成立。** 把默认值写成 `/var/lib/pepgent/library`，等于把 deploy 拥有的挂载点（D2-23）写死进应用。
5. **没有找到主路径失效反例**，因此不投反对票。

### 不阻断的建议（不影响本票）

1. **集成检出位置与实现不一致，属于 Pepgent 侧的既有缺口，不由本条引起。** D22-01 的 how 写道：“Lab 按 D7-11 在这个根下维护库检出**和临时集成检出**”。这与 D7-19（D7:79）的设计一致，但 Pepgent `origin/main` 的 `apps/web/src/server/lab/library.ts:331` 是 `mkdtemp('/tmp/pepgent-library-merge-')`：集成检出在容器自身的 `/tmp`，不在 `cacheHome` 下。所以 deploy 注入变量之后，只有中心检出会落到卷上。这不影响 `library.merge` 的主路径：集成检出只临时存在，`library.ts:362` 会在用完后删除它。
   - 建议秘书回写 D7-19 时，把这句当作对 Lab 的要求来写；
   - 另开 Pepgent issue，让 `library.ts:331` 改为在 `cacheHome` 下创建集成检出；
   - deploy PR 的验收不要声称集成检出已经落卷。
2. **出处标注：** (D) 第一条中“`library.merge` 的干净集成检出也放在这个卷上（D7-11）”宜改为“（D7-19，D7:79；操作见 D7-11）”。
