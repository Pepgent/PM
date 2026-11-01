# D44 选票：ClaudeHigh

议程：Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的承载切片 LAB-14（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D44-01 v1：赞成（ClaudeHighD44，2026-11-01T21:56:17.105Z）——作废：该行已修订到 v2



# D44 ClaudeHigh 选票（ClaudeHighD44，空白历史，steady + divergent 双立场）

依据（本实例自取）：
- Pepgent main 源码：`gh api repos/Pepgent/Pepgent/tarball/main`，解到 `/tmp/chd44/src`，只读。
- soroi main 源码：`gh api repos/Pepgent/soroi/tarball/main`，解到 `/tmp/chd44/soroi`，只读。
- PM 决策正文：`pepgent-pm/evidence/decisions/` 下的 D7、D8、D12、D16。
- 没有看 git、session，也没有看 issue/PR 历史。

## 共同核对（三行都适用）

1. **确实没有已有切片承载这些入口。**
   - `server/lab/operations.ts:259-265`：`flowEditor`、`datasets`、`connectCluster` 三页（连同已归 LAB-13 的三页）都落到 `notSupported`。
   - `operations.ts:543-569`：26 个命令落到 `notSupported`。减去 D42 的 7 个，剩下的正好是本议程的 19 个，逐个核对一致。
   - D8 §4.2 的 LAB-01..LAB-13（`D8-mvp-scope.md:321-335`）没有一行写这些入口：
     - LAB-11b 只写 `draft.save`、`experiment.start/approve`；
     - LAB-11a 只写 `discussion.load` 与附件；
     - LAB-12 只写 `page:'clusters'`；
     - LAB-13 只写 D42 的 3 页和 7 个命令。
   - 对整个 `apps/web/src` grep `notSupported(`：除了“未配置 mux”这类部署分支，剩下的就是这两处 switch。LAB-13 加 LAB-14 之后，`readPage` 和 `runCommand` 不再有返回 `not_supported` 的第一版变体。
2. **F 流程主路径没有遗漏。**
   - F09 S2、F12 S2、F31 ⑥ 要求 `datasets`（`D8:128,131,150`），F27 S2 要求 `flowEditor`（`:146`），都由第 1 行承载。
   - F27 的草稿从哪里来：由 `lab_*` host tool 写入（`tools.ts:176` `insert(draft)`，LAB-05）。编辑器读取归 LAB-14，保存归 LAB-11b。整条路闭合。
   - F01–F32 中没有一行逐字使用这 19 个命令。它们都是 D12-10 的第一版命令（`D12-lab-wire.md:42,543-566`），不在 D12-10 的 D9 排除清单里，也不在 D8-16 清单（`D8:87`）里。按 `AGENTS.md:123`，不能把它们移入 D9。D42-02 已经按同样依据承载过 `member.*`。
3. **白名单与 wire 成立。**
   - D16-09 的 W-09 行包含 `apps/web/src/server/lab/**`。
   - wire 已经齐全：
     - 页面参数见 `protocol/lab/pages.ts:74,77,81`，页面形状见 `:165,185-194,199`；
     - 19 个命令的变体与结果见 `command.ts:56,63-73,80-83,92,98,120-127,137-168,187-188`；
     - 所需的表都已在 `schema.ts` 里：`project.archived`、`conversation.discussion_name/project_id/archived`、`experiment_ext.name/project_id`、`discussion_binding`、`milestone`、`deploy_key.public_key/private_key_path`、`library_repo.remote_url/branch`。
   - `valueRuns` 用到的 `ValueUsageSchema` 已经由 `pepgent-store/contract` 导出，`protocol/lab/external/store.ts` 也已重导出。`StoreClient` 只需在 `server/lab/store.ts` 里加一个读方法，不碰 `protocol/lab/**`。

## D44-01 赞成

- **steady：**
  - 三页形状与 D12-05/06/08 逐字一致；
  - `connectCluster{templates}` 复用 LAB-12 已有的 `readTemplates`；
  - `panels` 复用 `operations.ts:29-51`；
  - `palette` 取库默认分支，与 `experiments.definitions` 同源（LAB-10）；
  - `contexts`、`references`、`artifacts` 来自 LAB-05、LAB-11a 已写入的表；
  - `volumes` 复用 `StoreClient.volume`；
  - `valueRuns` 用的是 store 的 `GET /values/{hash}/runs`，该路由已在 soroi main 上，有 `packages/store/README.md:48,171` 和 `test/search.test.ts:68` 为证。
- **不阻断的修正，建议秘书写 D8 行和 issue 正文时一并处理：**
  - (i) 依赖列漏了 **STO-08**。LAB-05、07a、10、11a、12、13 的传递依赖都不含它，而 `valueRuns` 直接调用它的路由。它已经在 soroi main 上，不构成等待。
  - (ii) “`artifacts[].role/verdict/contract` 取精确空值”放错了层。线上的 `datasets.artifacts` 是 `ArtifactMetaWire[]`，只有讨论产物，`role` 是必填枚举，有来源（`rows.ts:206-216`，`D12-coverage.md:316` 类 A），而且根本没有 verdict 和 contract 字段。D9 的那一项写明“（实验产物）”，是 WEB-04 投影层的视图字段（`D12-lab-wire.md:641`）。服务端对此不需要任何动作；照字面实现会被类型检查拒绝，所以不会让主路径断，但正文应改为“服务端无动作，空值在 WEB-04 投影”。
  - (iii) 材料把“第一版无来源字段”引作 `D12:625,636,640`，实际行号是 `:641,645`。
- **divergent：**
  - 不存在更短的路。并入 LAB-13 会扩大已表决的 P0 范围，拖长 #78 解阻；重开 LAB-11a、11b、12 会改写已结案记录；交给 W-10 会越过白名单。
  - 页面读取在代码和数据上都不依赖 LAB-13。之所以排在它后面，只是因为同一席串行，不构成锁。

## D44-02 赞成

- **steady：** 逐项核对过权限和语义。
  - 权限与 `D12:545,547-549` 一致。
  - 语义与 D7-14（`D7:74`）一致：merge 改归属，archive 改状态；Lab 生成并持有私钥，界面只示公钥，rotate 重新生成。
  - `lab.update{lab,name,glyph,description}` 写 Better Auth organization 和 `lab_profile`。
  - `agentTemplate.writeFile/removeFile` 写的是 `conversation.worktree`（`schema.ts:54`）下的 `.omp/agents/**`。它属于 Lab 自己的文件系统，与 D7-11、D12-10 一致，不需要越出 `server/lab/**`。
  - 它对 LAB-13 的依赖是数据前提：Panel 会话由 `panel.prompt` 新建。这不是编译依赖，与材料“不是开工锁”的表述一致。
- **divergent：** 不按命令拆 issue，同席同域（U83）。没有 F 流程逐字使用这些命令，但 D12-10 已把它们定为第一版命令。

## D44-03 赞成

- **steady：**
  - 权限与 `D12:552,555,559,566` 一致。
  - `discussion.rename/move/archive` 对应 `conversation.discussion_name/discussion_project_id/discussion_archived`；`move` 的 `project` 可为 null，与 `schema.ts:44` 一致。
  - `experiment.update{run,name,project}` 对应 `experiment_ext.name/project_id`。
  - `discussion.bind` 写 `discussion_binding`，即 D7-07 的 `bound`。
  - `panel.model` 可以复用 `sessions.ts:435` 的 `hold`。这条路径在会话停驻时先开一代，再在同一代上发 `set_model`，与 D7-15 一致。
  - `milestone` 表已在。
- **divergent：** 与第 2 行同属 LAB-14，不另开切片是对的。

三行均无主路径失效反例，全部赞成。


## D44-02 v1：赞成（ClaudeHighD44，2026-11-01T21:56:17.105Z）



# D44 ClaudeHigh 选票（ClaudeHighD44，空白历史，steady + divergent 双立场）

依据（本实例自取）：
- Pepgent main 源码：`gh api repos/Pepgent/Pepgent/tarball/main`，解到 `/tmp/chd44/src`，只读。
- soroi main 源码：`gh api repos/Pepgent/soroi/tarball/main`，解到 `/tmp/chd44/soroi`，只读。
- PM 决策正文：`pepgent-pm/evidence/decisions/` 下的 D7、D8、D12、D16。
- 没有看 git、session，也没有看 issue/PR 历史。

## 共同核对（三行都适用）

1. **确实没有已有切片承载这些入口。**
   - `server/lab/operations.ts:259-265`：`flowEditor`、`datasets`、`connectCluster` 三页（连同已归 LAB-13 的三页）都落到 `notSupported`。
   - `operations.ts:543-569`：26 个命令落到 `notSupported`。减去 D42 的 7 个，剩下的正好是本议程的 19 个，逐个核对一致。
   - D8 §4.2 的 LAB-01..LAB-13（`D8-mvp-scope.md:321-335`）没有一行写这些入口：
     - LAB-11b 只写 `draft.save`、`experiment.start/approve`；
     - LAB-11a 只写 `discussion.load` 与附件；
     - LAB-12 只写 `page:'clusters'`；
     - LAB-13 只写 D42 的 3 页和 7 个命令。
   - 对整个 `apps/web/src` grep `notSupported(`：除了“未配置 mux”这类部署分支，剩下的就是这两处 switch。LAB-13 加 LAB-14 之后，`readPage` 和 `runCommand` 不再有返回 `not_supported` 的第一版变体。
2. **F 流程主路径没有遗漏。**
   - F09 S2、F12 S2、F31 ⑥ 要求 `datasets`（`D8:128,131,150`），F27 S2 要求 `flowEditor`（`:146`），都由第 1 行承载。
   - F27 的草稿从哪里来：由 `lab_*` host tool 写入（`tools.ts:176` `insert(draft)`，LAB-05）。编辑器读取归 LAB-14，保存归 LAB-11b。整条路闭合。
   - F01–F32 中没有一行逐字使用这 19 个命令。它们都是 D12-10 的第一版命令（`D12-lab-wire.md:42,543-566`），不在 D12-10 的 D9 排除清单里，也不在 D8-16 清单（`D8:87`）里。按 `AGENTS.md:123`，不能把它们移入 D9。D42-02 已经按同样依据承载过 `member.*`。
3. **白名单与 wire 成立。**
   - D16-09 的 W-09 行包含 `apps/web/src/server/lab/**`。
   - wire 已经齐全：
     - 页面参数见 `protocol/lab/pages.ts:74,77,81`，页面形状见 `:165,185-194,199`；
     - 19 个命令的变体与结果见 `command.ts:56,63-73,80-83,92,98,120-127,137-168,187-188`；
     - 所需的表都已在 `schema.ts` 里：`project.archived`、`conversation.discussion_name/project_id/archived`、`experiment_ext.name/project_id`、`discussion_binding`、`milestone`、`deploy_key.public_key/private_key_path`、`library_repo.remote_url/branch`。
   - `valueRuns` 用到的 `ValueUsageSchema` 已经由 `pepgent-store/contract` 导出，`protocol/lab/external/store.ts` 也已重导出。`StoreClient` 只需在 `server/lab/store.ts` 里加一个读方法，不碰 `protocol/lab/**`。

## D44-01 赞成

- **steady：**
  - 三页形状与 D12-05/06/08 逐字一致；
  - `connectCluster{templates}` 复用 LAB-12 已有的 `readTemplates`；
  - `panels` 复用 `operations.ts:29-51`；
  - `palette` 取库默认分支，与 `experiments.definitions` 同源（LAB-10）；
  - `contexts`、`references`、`artifacts` 来自 LAB-05、LAB-11a 已写入的表；
  - `volumes` 复用 `StoreClient.volume`；
  - `valueRuns` 用的是 store 的 `GET /values/{hash}/runs`，该路由已在 soroi main 上，有 `packages/store/README.md:48,171` 和 `test/search.test.ts:68` 为证。
- **不阻断的修正，建议秘书写 D8 行和 issue 正文时一并处理：**
  - (i) 依赖列漏了 **STO-08**。LAB-05、07a、10、11a、12、13 的传递依赖都不含它，而 `valueRuns` 直接调用它的路由。它已经在 soroi main 上，不构成等待。
  - (ii) “`artifacts[].role/verdict/contract` 取精确空值”放错了层。线上的 `datasets.artifacts` 是 `ArtifactMetaWire[]`，只有讨论产物，`role` 是必填枚举，有来源（`rows.ts:206-216`，`D12-coverage.md:316` 类 A），而且根本没有 verdict 和 contract 字段。D9 的那一项写明“（实验产物）”，是 WEB-04 投影层的视图字段（`D12-lab-wire.md:641`）。服务端对此不需要任何动作；照字面实现会被类型检查拒绝，所以不会让主路径断，但正文应改为“服务端无动作，空值在 WEB-04 投影”。
  - (iii) 材料把“第一版无来源字段”引作 `D12:625,636,640`，实际行号是 `:641,645`。
- **divergent：**
  - 不存在更短的路。并入 LAB-13 会扩大已表决的 P0 范围，拖长 #78 解阻；重开 LAB-11a、11b、12 会改写已结案记录；交给 W-10 会越过白名单。
  - 页面读取在代码和数据上都不依赖 LAB-13。之所以排在它后面，只是因为同一席串行，不构成锁。

## D44-02 赞成

- **steady：** 逐项核对过权限和语义。
  - 权限与 `D12:545,547-549` 一致。
  - 语义与 D7-14（`D7:74`）一致：merge 改归属，archive 改状态；Lab 生成并持有私钥，界面只示公钥，rotate 重新生成。
  - `lab.update{lab,name,glyph,description}` 写 Better Auth organization 和 `lab_profile`。
  - `agentTemplate.writeFile/removeFile` 写的是 `conversation.worktree`（`schema.ts:54`）下的 `.omp/agents/**`。它属于 Lab 自己的文件系统，与 D7-11、D12-10 一致，不需要越出 `server/lab/**`。
  - 它对 LAB-13 的依赖是数据前提：Panel 会话由 `panel.prompt` 新建。这不是编译依赖，与材料“不是开工锁”的表述一致。
- **divergent：** 不按命令拆 issue，同席同域（U83）。没有 F 流程逐字使用这些命令，但 D12-10 已把它们定为第一版命令。

## D44-03 赞成

- **steady：**
  - 权限与 `D12:552,555,559,566` 一致。
  - `discussion.rename/move/archive` 对应 `conversation.discussion_name/discussion_project_id/discussion_archived`；`move` 的 `project` 可为 null，与 `schema.ts:44` 一致。
  - `experiment.update{run,name,project}` 对应 `experiment_ext.name/project_id`。
  - `discussion.bind` 写 `discussion_binding`，即 D7-07 的 `bound`。
  - `panel.model` 可以复用 `sessions.ts:435` 的 `hold`。这条路径在会话停驻时先开一代，再在同一代上发 `set_model`，与 D7-15 一致。
  - `milestone` 表已在。
- **divergent：** 与第 2 行同属 LAB-14，不另开切片是对的。

三行均无主路径失效反例，全部赞成。


## D44-03 v1：赞成（ClaudeHighD44，2026-11-01T21:56:17.105Z）



# D44 ClaudeHigh 选票（ClaudeHighD44，空白历史，steady + divergent 双立场）

依据（本实例自取）：
- Pepgent main 源码：`gh api repos/Pepgent/Pepgent/tarball/main`，解到 `/tmp/chd44/src`，只读。
- soroi main 源码：`gh api repos/Pepgent/soroi/tarball/main`，解到 `/tmp/chd44/soroi`，只读。
- PM 决策正文：`pepgent-pm/evidence/decisions/` 下的 D7、D8、D12、D16。
- 没有看 git、session，也没有看 issue/PR 历史。

## 共同核对（三行都适用）

1. **确实没有已有切片承载这些入口。**
   - `server/lab/operations.ts:259-265`：`flowEditor`、`datasets`、`connectCluster` 三页（连同已归 LAB-13 的三页）都落到 `notSupported`。
   - `operations.ts:543-569`：26 个命令落到 `notSupported`。减去 D42 的 7 个，剩下的正好是本议程的 19 个，逐个核对一致。
   - D8 §4.2 的 LAB-01..LAB-13（`D8-mvp-scope.md:321-335`）没有一行写这些入口：
     - LAB-11b 只写 `draft.save`、`experiment.start/approve`；
     - LAB-11a 只写 `discussion.load` 与附件；
     - LAB-12 只写 `page:'clusters'`；
     - LAB-13 只写 D42 的 3 页和 7 个命令。
   - 对整个 `apps/web/src` grep `notSupported(`：除了“未配置 mux”这类部署分支，剩下的就是这两处 switch。LAB-13 加 LAB-14 之后，`readPage` 和 `runCommand` 不再有返回 `not_supported` 的第一版变体。
2. **F 流程主路径没有遗漏。**
   - F09 S2、F12 S2、F31 ⑥ 要求 `datasets`（`D8:128,131,150`），F27 S2 要求 `flowEditor`（`:146`），都由第 1 行承载。
   - F27 的草稿从哪里来：由 `lab_*` host tool 写入（`tools.ts:176` `insert(draft)`，LAB-05）。编辑器读取归 LAB-14，保存归 LAB-11b。整条路闭合。
   - F01–F32 中没有一行逐字使用这 19 个命令。它们都是 D12-10 的第一版命令（`D12-lab-wire.md:42,543-566`），不在 D12-10 的 D9 排除清单里，也不在 D8-16 清单（`D8:87`）里。按 `AGENTS.md:123`，不能把它们移入 D9。D42-02 已经按同样依据承载过 `member.*`。
3. **白名单与 wire 成立。**
   - D16-09 的 W-09 行包含 `apps/web/src/server/lab/**`。
   - wire 已经齐全：
     - 页面参数见 `protocol/lab/pages.ts:74,77,81`，页面形状见 `:165,185-194,199`；
     - 19 个命令的变体与结果见 `command.ts:56,63-73,80-83,92,98,120-127,137-168,187-188`；
     - 所需的表都已在 `schema.ts` 里：`project.archived`、`conversation.discussion_name/project_id/archived`、`experiment_ext.name/project_id`、`discussion_binding`、`milestone`、`deploy_key.public_key/private_key_path`、`library_repo.remote_url/branch`。
   - `valueRuns` 用到的 `ValueUsageSchema` 已经由 `pepgent-store/contract` 导出，`protocol/lab/external/store.ts` 也已重导出。`StoreClient` 只需在 `server/lab/store.ts` 里加一个读方法，不碰 `protocol/lab/**`。

## D44-01 赞成

- **steady：**
  - 三页形状与 D12-05/06/08 逐字一致；
  - `connectCluster{templates}` 复用 LAB-12 已有的 `readTemplates`；
  - `panels` 复用 `operations.ts:29-51`；
  - `palette` 取库默认分支，与 `experiments.definitions` 同源（LAB-10）；
  - `contexts`、`references`、`artifacts` 来自 LAB-05、LAB-11a 已写入的表；
  - `volumes` 复用 `StoreClient.volume`；
  - `valueRuns` 用的是 store 的 `GET /values/{hash}/runs`，该路由已在 soroi main 上，有 `packages/store/README.md:48,171` 和 `test/search.test.ts:68` 为证。
- **不阻断的修正，建议秘书写 D8 行和 issue 正文时一并处理：**
  - (i) 依赖列漏了 **STO-08**。LAB-05、07a、10、11a、12、13 的传递依赖都不含它，而 `valueRuns` 直接调用它的路由。它已经在 soroi main 上，不构成等待。
  - (ii) “`artifacts[].role/verdict/contract` 取精确空值”放错了层。线上的 `datasets.artifacts` 是 `ArtifactMetaWire[]`，只有讨论产物，`role` 是必填枚举，有来源（`rows.ts:206-216`，`D12-coverage.md:316` 类 A），而且根本没有 verdict 和 contract 字段。D9 的那一项写明“（实验产物）”，是 WEB-04 投影层的视图字段（`D12-lab-wire.md:641`）。服务端对此不需要任何动作；照字面实现会被类型检查拒绝，所以不会让主路径断，但正文应改为“服务端无动作，空值在 WEB-04 投影”。
  - (iii) 材料把“第一版无来源字段”引作 `D12:625,636,640`，实际行号是 `:641,645`。
- **divergent：**
  - 不存在更短的路。并入 LAB-13 会扩大已表决的 P0 范围，拖长 #78 解阻；重开 LAB-11a、11b、12 会改写已结案记录；交给 W-10 会越过白名单。
  - 页面读取在代码和数据上都不依赖 LAB-13。之所以排在它后面，只是因为同一席串行，不构成锁。

## D44-02 赞成

- **steady：** 逐项核对过权限和语义。
  - 权限与 `D12:545,547-549` 一致。
  - 语义与 D7-14（`D7:74`）一致：merge 改归属，archive 改状态；Lab 生成并持有私钥，界面只示公钥，rotate 重新生成。
  - `lab.update{lab,name,glyph,description}` 写 Better Auth organization 和 `lab_profile`。
  - `agentTemplate.writeFile/removeFile` 写的是 `conversation.worktree`（`schema.ts:54`）下的 `.omp/agents/**`。它属于 Lab 自己的文件系统，与 D7-11、D12-10 一致，不需要越出 `server/lab/**`。
  - 它对 LAB-13 的依赖是数据前提：Panel 会话由 `panel.prompt` 新建。这不是编译依赖，与材料“不是开工锁”的表述一致。
- **divergent：** 不按命令拆 issue，同席同域（U83）。没有 F 流程逐字使用这些命令，但 D12-10 已把它们定为第一版命令。

## D44-03 赞成

- **steady：**
  - 权限与 `D12:552,555,559,566` 一致。
  - `discussion.rename/move/archive` 对应 `conversation.discussion_name/discussion_project_id/discussion_archived`；`move` 的 `project` 可为 null，与 `schema.ts:44` 一致。
  - `experiment.update{run,name,project}` 对应 `experiment_ext.name/project_id`。
  - `discussion.bind` 写 `discussion_binding`，即 D7-07 的 `bound`。
  - `panel.model` 可以复用 `sessions.ts:435` 的 `hold`。这条路径在会话停驻时先开一代，再在同一代上发 `set_model`，与 D7-15 一致。
  - `milestone` 表已在。
- **divergent：** 与第 2 行同属 LAB-14，不另开切片是对的。

三行均无主路径失效反例，全部赞成。


## D44-01 v2：赞成（ClaudeHighD44v2，2026-11-01T22:01:23.222Z）



# D44-01 v2 ClaudeHigh 选票（ClaudeHighD44v2，空白历史，steady + divergent）

依据（本实例自取，只读）：
- Pepgent main：重新执行 `gh api repos/Pepgent/Pepgent/tarball/main`，解到 `/tmp/chd44v2/src`。`protocol/lab/pages.ts`、`rows.ts` 与旧解包一致。
- soroi main 的 store 路由：已解包的 `/tmp/chd44/soroi/packages/store`。
- PM 决策正文：`pepgent-pm/evidence/decisions/D12-lab-wire.md`、`D8-mvp-scope.md`。
- 没有看 git、session，也没有看 issue/PR 历史。

## D44-01 v2 赞成

### steady

1. **反例已消除。**
   - `datasets.artifacts` 是 `z.array(ArtifactMetaWireSchema)`（`pages.ts:186`）。
   - `ArtifactMetaWire.role` 是必填的 `ArtifactRoleSchema` 枚举。这个类型没有 `verdict` 和 `contract` 字段（`rows.ts:192-216`）。
   - `artifact_meta.role` 列为 `notNull`（`schema.ts:130`），由上传路由经 `ArtifactRoleSchema.safeParse` 写入（`http.ts:177`）。
   - D12“第一版无来源字段”的表头是“视图字段（web/client/contracts）”。该行限定的是“（实验产物）”（`D12-lab-wire.md:630-634,641`）。
   - v2 写的是：服务端原样返回真实 `role`，不置空、不丢行，空值只在 WEB-04 投影。这与 wire 和 D12 两层分工一致，照字面实现能通过类型检查。
2. **“原样返回”可以直接实现。**
   - `server/lab/tools.ts:102` 已有 `artifactMetaWire(row, worktree)`。`name` 和 `size` 取自快照文件，与 D12-16 一致。
   - `conversations.ts:74-76` 已用这个函数产出会话详情的 `artifacts`。datasets 页按 Lab 内会话取 `artifact_meta` 行，复用同一个函数即可，不需要新形状。
3. **STO-08 依赖补得对，且不构成等待。**
   - `valueRuns` 用 `GET /values/{hash}/runs`，这条路由归 STO-08（`D8-mvp-scope.md:254`）。
   - soroi main 上已有该路由：见 `packages/store/README.md:48` 和 `test/search.test.ts:67-71`。
   - `server/lab/store.ts` 目前只有 `volume`、`commits` 等方法。要加的读方法在 `server/lab/**` 内，没有越出 W-09 白名单。
4. **行号已更正为 `:641,645`，与 D12 正文核对一致。**
   - `:641` 是实验产物的 `role/verdict/contract`。
   - `:645` 是 `connectCluster` 的安装日志、注册令牌和连接测试结果，归 P7。
5. **其余部分与 v1 一致，仍然成立。**
   - 三页现在都落到 `notSupported`（`operations.ts:259-265`）。
   - 形状与 D12-05/06/08 一致：`pages.ts:165,185-194,199`，`D12-lab-wire.md:387,392-395,399`。
   - `palette` 与 `experiments.definitions` 同取 `context.library.read(lab)`（`operations.ts:63-68`）。
   - `panels` 复用 `operations.ts:29-51`。
   - 不改 `protocol/lab/**`。

### divergent

- 我没有找到更短的主路径。
  - 三页读取不在代码或数据上依赖 LAB-13，排在 LAB-13 之后，只是因为同一席位按顺序做，不是锁。
  - 并入 LAB-13，会扩大 D42 已表决的 P0 范围。
  - 重开已关闭的切片，会改写已结案的记录。
  - 交给 W-10，会越过 D16-09 白名单。
- v2 没有新增机制，也没有放宽枚举或加 wire 字段，只是把错放到服务端的规则退回投影层。这是最小的修正。

没有主路径失效反例，赞成。

