# 八仓 PR 路径白名单与契约边界事后检查

## 1. 审计结论与边界

审计者：`ArgonGovernance-2.AuditPostHocPrAndWhitelists`。取证截止锚点：本实例 `date -u` 输出 `2026-11-02T00:05:55Z`；各 GitHub 对象是本轮读取时刻的快照，不是永久合规认证。

**结论不是“八仓全绿”。**

1. **发现两项已合入、尚无有效路径授权的 W-10 越界：**
   - [Pepgent PR#75](https://github.com/Pepgent/Pepgent/pull/75) 新增 `apps/web/tests/vitest/lab-replay-at.test.ts`，不匹配 D20-01 的 `lab-*-view-model.test.ts`。
   - [Pepgent PR#88](https://github.com/Pepgent/Pepgent/pull/88) 改动九个同样不匹配该 glob 的测试文件，并修改未列入白名单的 `apps/web/src/renderer/features/lab-home/index.ts`。这不是 W-09/W-10 互抢 `protocol` 或 `server`，而是 W-10 跨出自身封闭路径域。D39 已明确承认前一种测试路径不在授权内，但相同遗漏在后续 PR 再次出现。
2. **没有发现本轮最近 PR 修改禁止的 CSS、主题目录，或 W-10 写 W-09 的协议/后端目录、W-09 写 W-10 前端目录。** 此结论来自文件清单，不等于“视觉效果已在浏览器验证”，也不覆盖未读到的外部会话工作。
3. **PR#88 的 UI 待核实项不能直接判成“毁坏视觉”。** 本轮亲读 diff 确认存在 JSX、`data-edge` 和 class 条件删除；[23:25:03Z 的实际 PR 评论](https://github.com/Pepgent/Pepgent/pull/88#issuecomment-6565460794) 明确记录是初审加 Argon 闸门 A 事后追认，不是 A/B 双闸门。Argon 判定这些是不可达演示分支清理、可达渲染不变。常规事后检查本来合法，不能仅凭没有“事后 Gate B”给全部常规 PR 增设审批锁；但该评论**没有处理本报告查出的测试路径和 barrel 文件越界**。
4. **soroi 的 W-06/W-07/W-08 最新样本没有发现新增跨域写入。** 根 lockfile、根 compose 文件与 CI workflow 的例外必须逐条使用对应授权，不能把它们都当成跨域；本轮已逐一核对。
5. **images/deploy 的最近契约敏感改动可追溯到合入前的双闸门/决策。** D46、D47、D48 不是互相替代的授权。deploy PR#27 的代码合入在 D47 v2 后，org 策略与 deploy key 实际启用走后续 D48；不能把“代码已合入”和“私有 clone 已成功”混为一谈。
6. **council 存在源头已确认的历史程序越界：** [PM#52](https://github.com/Pepgent/PM/issues/52) 当前正文明确记载两项公开接口/身份口径在 D33 表决前已随生产 daemon 上线。另一方面，[council PR#5](https://github.com/Pepgent/council/pull/5) 合并在 D33 定案之后，不能把它说成“未经 D33 即合并”。历史先上线与后来合规合并必须分别记录。
7. 指定命令返回 **79 个最近 PR：78 MERGED、1 CLOSED 未合并**；另补查全部 open 得到 **1 个 9 月遗产 PR**；再补 W-06 四个近期样本。共检查 **84 个不同 PR 对象的路径/状态**，不是只看标题或合入数量。八仓当前 open 总数为 1，仅 [Pepgent PR#4](https://github.com/Pepgent/Pepgent/pull/4)，不是本轮 W-09/W-10 的新 PR。

**管理责任归属：** 新的 W-10 路径越界由 Main 的派工/协调链负责承接纠偏，ArgonGovernance-2 负责第 6 条事后路径检查遗漏；AreaMgrPepgent 的具体责任仅限其实际承接的片区发现/上报范围，不把它当作设计或投票授权者。Argon 的产品意图裁决不能替代路径授权，不能因为它追认 UI 就把路径问题转嫁给 Argon。历史 D15 污染的管理责任按 PM#23 归原 Main 会话；council 先上线的管理责任追踪总协调/迁移启用链，现有 GitHub 证据不足以把某条启用命令归给具名底层工人。

### 审计方法与未声称的事项

本次只读 GitHub 当前 PR/issue 对象、当前决策正文、指定范围报告和 PR diff；只写本报告及指定 local 副本。没有修改工程代码、配置、issue、PR、分支或运行环境；没有联系无关前端会话；没有运行 git、测试、build、lint、产品探针或解密 SOPS。没有以 commit hash、镜像 digest 一致性作证据。

本报告的“路径内”是**文件路径与授权的比对结论**，不认证该 PR 每个算法、每个业务字段都正确。契约敏感项另做正文/时序核对；没有把 PR 作者自述的 runtime 结果升级成本实例独立实测。开发期也不因本报告要求每个常规切片补一轮跨组件验收。

决定性观察是：文件修改是否被当时已生效的白名单及用途限定覆盖；有 BLOCKED 的部分是否先完成 A/B 分类、必要时完成议会表决。职责依据为 `.omp/agents/argon-governance.md` 第 6、13、19、22 条和 AGENTS C1/C2/C3/C4/C5。用户原话 U112 要求不要把 LEDGER 变决策账本，U113 要求完整履行治理职责；本报告不向 LEDGER 添加进度、R 表或 D 摘要。两句原话本轮在 LEDGER 第 58–59 行读到。

## 2. 实时取证命令、完整性与来源

### 2.1 八仓原样执行的指定命令

本轮分别执行下列命令，全部 exit 0；认证为 RiriAgent（`gh auth status` 实测，不提取凭据）：

```sh
gh pr list --repo Pepgent/soroi --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/Pepgent --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/omp-rpc-mux --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/remote --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/lab-library --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/images --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/deploy --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
gh pr list --repo Pepgent/council --state all --limit 15 --json number,title,state,mergedAt,files,headRefName
```

原始运行捕获（只作为上述 gh 输出载体，不是另一个状态源）：soroi `artifact://6905`；Pepgent `artifact://6906`；mux `artifact://6907`；remote `artifact://6908`；library `artifact://6909`；images `artifact://6910`；deploy `artifact://6911`；council `artifact://6912`。本轮全部补读原始单行 JSON，未凭被截断的预览下结论。下文逐 PR 表是这些实时输出的可读投影，各 PR 链接可回到源头。

**修补两个会使形式检查漏案的采样缺口：**

- `--state all --limit 15` 不保证含有所有较老 open PR。因此另对八仓执行 `gh pr list --repo Pepgent/<repo> --state open --limit 100 --json number,title,headRefName`。八次结果如下：

| 仓库 | 本轮全部 open 查询输出 |
|---|---|
| soroi | `[]` |
| Pepgent | `[{"headRefName":"feat/oidc-authentication","number":4,"title":"feat(web): 以 Keycloak OIDC 登录取代静态访问令牌"}]` |
| omp-rpc-mux | `[]` |
| remote | `[]` |
| lab-library | `[]` |
| images | `[]` |
| deploy | `[]` |
| council | `[]` |

- `gh pr list` 的内嵌 `files` 对大 PR 返回了 100 个条目，PR#88 后面的测试和 packages/ui 文件会被漏掉。因此执行 `gh api --paginate repos/Pepgent/Pepgent/pulls/88/files --jq '.[] | .filename'` 取得完整分页。**只看指定命令的 files 预览会漏掉本报告最重要的九个测试路径。** 本报告不把该 API 的 100 条第一页当全量。

W-06 在 soroi 最近 15 个 PR 中没有出现。为满足“核 W-06”的目标，又执行：

```sh
gh pr list --repo Pepgent/soroi --state merged --limit 60 \
  --json number,title,mergedAt,files,headRefName \
  --jq '.[] | select(any(.files[]; .path | startswith("packages/store/"))) | {number,title,mergedAt,headRefName,files}'
```

从中取 D16 后的四项 #316/#294/#287/#286 单列核查；更早的跨目录遗产不倒套 D16 的席位规则。

### 2.2 本轮实际读取的授权源头

| 授权 | 源头与有效边界 |
|---|---|
| D16-09 | [PM#25](https://github.com/Pepgent/PM/issues/25)：W-01 mux、W-02 remote、W-03 images、W-04 deploy、W-05 library 各全仓；W-06 store、W-07 plugin、W-08 e2e 互斥；W-09 协议/后端，W-10 前端。每席独立分支与 PR。 |
| D16-15 | [PM#26](https://github.com/Pepgent/PM/issues/26)：W-06 扩入 `.github/workflows/store-contract.yml`；撤回原根包导出并重生成锁；契约包派生分支由 CI 维护。 |
| D20-01/02/03 | [PM#30](https://github.com/Pepgent/PM/issues/30)：路由、指定 bootstrap/application、model/controller/locales；测试限 `apps/web/tests/vitest/lab-*-view-model.test.ts`；UI 只接线，不写视觉 CSS/主题；共享文档按 W-09 在席/退役交接。A 组五文件本轮另读 [原放行评论](https://github.com/Pepgent/Pepgent/issues/9#issuecomment-6559372684)。 |
| D25-01 | [PM#42](https://github.com/Pepgent/PM/issues/42)：改自己合法文件路由的席位可在同一 PR 用既有工具链重新生成 `routeTree.gen.ts`；不授权对方手写路径。 |
| D35-01 v3 | [PM#54](https://github.com/Pepgent/PM/issues/54)：W-10 仅扩入 time-axis 两文件及受控位置/回调用途，禁止扩大到 packages/ui 其余文件。 |
| D39-01 v3 | [PM#58](https://github.com/Pepgent/PM/issues/58)：提交标记及其测试落已有 model/controller 和 `lab-experiment-detail-view-model.test.ts`；明确 `lab-replay-at.test.ts` 不匹配现有白名单，要扩须另投治理行。 |
| D45-01 | [PM#64](https://github.com/Pepgent/PM/issues/64)：AiPanel 两文件和 `packages/ui/src/lab/index.ts` 的指定类型导出行，封闭用途；`ai-panel.css` 不写；不改 wire/服务端。 |
| D46-06 v2 | [PM#65](https://github.com/Pepgent/PM/issues/65)：LAB-13 另加 web package.json、根 package-lock 和生成的 notices.txt，仅新增 agent frontmatter 的 YAML 依赖。D46-02/03 分别规定 images 双变量、images.json 的 owner 与消费边界。 |
| D47-01 v2 / 02 | [PM#66](https://github.com/Pepgent/PM/issues/66)：W-04 的指定四文件、owner 私钥只读 bind、ssh 单别名；Lab 仍只收两个变量；W-03 只在 lab-web 装 ssh，不进密钥。 |
| D48-01 v2 | [PM#67](https://github.com/Pepgent/PM/issues/67)：另行授权 org deploy-key 开关，单一 images 只读凭据角色。不能用 D47 的单仓 where 冒充 org 授权。 |
| D23 / D32 / D33 | [PM#33](https://github.com/Pepgent/PM/issues/33) 规定 store generation 类型与 W-06 写方；[PM#51](https://github.com/Pepgent/PM/issues/51) 规定 mux/deploy/Lab 的受信 reader 边界；[PM#52](https://github.com/Pepgent/PM/issues/52) 规定 council 接口、合入与整体切换边界。 |
| D15 历史污染 | [PM#23](https://github.com/Pepgent/PM/issues/23) 已点名历史无效合并、回退与遗产保护。不能把已回退的旧 PR 重报成当前新增越界，也不能因它仍显示 MERGED 就说污染仍在。 |

## 3. 八仓最近 PR 核查表

标记：**域内**仅指已核文件清单在路径授权内；**例外合法**为明确条件授权；**越界**有具体未授权路径；**历史无效/回退**按 D15 已有裁定分层，不作为本轮新发现。所有时间为 2026-11-01 UTC 的 `mergedAt`，除明确写未合并者。下列各行的路径事实来自 §2.1 对应仓 gh 实时输出。

### 3.1 Pepgent/soroi：最近 15 个及 W-06 补样

| PR / head 分支 | 合入时刻 | 实际修改域 | 席位及结论 |
|---|---|---|---|
| [#341](https://github.com/Pepgent/soroi/pull/341) `e2e/f07-negatives-250` | 21:33:59 | `e2e/s1/{agents-live.ts,agents.md,f07.spec.ts,live-f07.ts}` | W-08，域内。 |
| [#340](https://github.com/Pepgent/soroi/pull/340) `issue-336-337-role-purpose` | 20:30:59 | `packages/omp-soroi/{README,src,test}/**` | W-07，域内；role 与 purpose 修复沿已定 LaunchRecipe/reminder，未写 store。 |
| [#339](https://github.com/Pepgent/soroi/pull/339) `issue-329-compose-readme` | 20:24:18 | `compose/README.md` | W-07；D16-09 明文含 compose/**，不是 W-08。 |
| [#338](https://github.com/Pepgent/soroi/pull/338) `e2e-250-259-live-drivers` | 19:25:45 | `e2e/**`，驱动/录制/standin | W-08，域内；consumer 改动不是改 provider 代码。 |
| [#335](https://github.com/Pepgent/soroi/pull/335) `e2e-330-a0-identity` | 18:05:03 | `e2e/{install-check,pty}/**`、e2e README | W-08，域内。 |
| [#334](https://github.com/Pepgent/soroi/pull/334) `e2e-327-central-identity` | 17:55:09 | 根 `compose.yaml`、`e2e/**` | W-08；根 compose.yaml 明文归 W-08，例外合法。 |
| [#333](https://github.com/Pepgent/soroi/pull/333) `issue-332-readme-abort` | 17:54:51 | `packages/omp-soroi/README.md` | W-07，域内。 |
| [#331](https://github.com/Pepgent/soroi/pull/331) `issue-326-slot-agent-id` | 17:51:19 | `packages/omp-soroi/**` | W-07，域内。 |
| [#328](https://github.com/Pepgent/soroi/pull/328) `e2e-323-readme` | 17:44:29 | `e2e/s1/{README.md,f17.spec.ts}` | W-08，域内。 |
| [#325](https://github.com/Pepgent/soroi/pull/325) `issue-323-run-abort-commit` | 17:30:58 | `packages/omp-soroi/{src,test}/**` | W-07，域内；没有跨去 store 修复。 |
| [#324](https://github.com/Pepgent/soroi/pull/324) `e2e-227-231-233-specs` | 17:27:57 | `e2e/**` 加 `bun.lock` | W-08；同 PR 的 e2e/package.json 新依赖，lockfile 联动符合 D16-09，不是 W-07 独占根锁。 |
| [#320](https://github.com/Pepgent/soroi/pull/320) `issue-228-remote-agent-stop` | 16:28:55 | `packages/omp-soroi/**` | W-07，域内。 |
| [#319](https://github.com/Pepgent/soroi/pull/319) `issue-229-remote-batches` | 16:19:59 | `packages/omp-soroi/**` 加 `bun.lock` | W-07；同 PR package manifest 联动，例外合法。 |
| [#318](https://github.com/Pepgent/soroi/pull/318) `issue-222-remote-agent` | 16:14:17 | `packages/omp-soroi/**` | W-07，域内；消费 remote，未改 remote 仓。 |
| [#317](https://github.com/Pepgent/soroi/pull/317) `issue-217-derive` | 15:50:43 | `packages/omp-soroi/**` | W-07，域内。 |
| [#316](https://github.com/Pepgent/soroi/pull/316) `issue-315-generation-string`（补样） | 15:30:02 | `packages/store/src/contract.ts`、`packages/store/test/derive.test.ts` | W-06，D23-01/02 明确指定；没有临时让 W-07 代改。 |
| [#294](https://github.com/Pepgent/soroi/pull/294) `store-contract-d16-15`（补样） | 13:55:16 | store identity、store-contract workflow、根 package.json、bun.lock | W-06，D16-15 ①②⑤ 专项授权；不能机械以 workflow/根文件判越界。 |
| [#287](https://github.com/Pepgent/soroi/pull/287) `issue-190-durable-sse`（补样） | 13:16:04 | `packages/store/src/{contract,database,records,server,store,streams}.ts` | W-06，域内，接续 STO-05/STO-12。 |
| [#286](https://github.com/Pepgent/soroi/pull/286) `store-a2-10-contract-exports`（补样） | 13:09:00 | store contract/search 测试、根 package.json、bun.lock | W-06，当时 D16-05 的首个 A2-10 授权有效；后续 D16-15 改过渡方式不使该 PR 追溯变非法。 |

**本仓结论：** 在这 19 个近期样本中未见 W-06 写 plugin/e2e、W-07 写 store/e2e、W-08 写 store/plugin 源码。根文件必须按“compose/ 与 compose.yaml 不同”“manifest 同 PR 重生成锁”“workflow 专项授权”判断。管理责任为 Main 的席位派工链与 soroi 片区管理；没有本轮已证的新增路径越界可归责。

### 3.2 Pepgent/Pepgent：最近 15 个与全部 open

| PR / head 分支 | 合入时刻 | 实际修改域 | 席位及结论 |
|---|---|---|---|
| [#90](https://github.com/Pepgent/Pepgent/pull/90) `docs/w10-d20-03` | 23:45:32 | web README、renderer README、conventions 01/03 | W-10，D20-03 文档接续；#89 是其承载 issue，不是遗漏的 PR。 |
| [#88](https://github.com/Pepgent/Pepgent/pull/88) `feat/web-07-switch` | 23:13:05 | 路由、client、renderer、tests、AiPanel 三文件、文档；完整分页不止 100 文件 | W-10。没有写 server/protocol，没有 CSS 文件；**九测试加 home/index.ts 路径越界**，见 §4。UI 争点另按 §5 分层。 |
| [#87](https://github.com/Pepgent/Pepgent/pull/87) `issue-80-settings` | 22:54:00 | `server/lab/**`、web package.json、package-lock、notices.txt | W-09；D46-06 v2 的 YAML 依赖三文件明确覆盖，未改前端和 wire，例外合法。 |
| [#86](https://github.com/Pepgent/Pepgent/pull/86) `issue-80-d46` | 22:37:08 | `server/lab/**` | W-09，域内；D46-01/05 成员与模板命令。 |
| [#85](https://github.com/Pepgent/Pepgent/pull/85) `issue-83-lab14` | 22:31:00 | `server/lab/**` | W-09，D44 承载，域内。 |
| [#84](https://github.com/Pepgent/Pepgent/pull/84) `issue-78-activity` | 22:10:44 | `server/lab/**` | W-09，D42/D43 的 home、activity 与命令，域内；不把受阻四项尚待 D46 等同整个 PR 不得推进。 |
| [#82](https://github.com/Pepgent/Pepgent/pull/82) `issue-81-template-type` | 21:54:57 | `protocol/lab/library.ts` | W-09，D41-01 的模板类型修订；W-10 未代改 wire。 |
| [#79](https://github.com/Pepgent/Pepgent/pull/79) `feat/web-06-pages` | 21:36:21 | client、指定 model/controller/ui/locales、匹配 glob 的投影测试 | W-10，路径内；D38/D40 消费，不写 remote/backend。 |
| [#77](https://github.com/Pepgent/Pepgent/pull/77) `feat/web-05-nodes-automation` | 21:01:17 | client、automation/node-library 的授权 renderer 路径、匹配 glob 的测试 | W-10，路径内；D31/D37 消费。 |
| [#76](https://github.com/Pepgent/Pepgent/pull/76) `feat/web-04-workspace` | 20:57:19 | client、datasets/discussions renderer 路径、匹配 glob 的测试 | W-10，路径内；文件引用/上传的 D37 承载没有扩大 packages/ui。 |
| [#75](https://github.com/Pepgent/Pepgent/pull/75) `feat/web-03-experiments` | 20:54:41 | client、指定 renderer 路径、tests、time-axis 两文件 | W-10；time-axis 两文件符合 D35-01 v3，**lab-replay-at.test.ts 不在白名单**。 |
| [#74](https://github.com/Pepgent/Pepgent/pull/74) `issue-73-commits-definitions` | 20:08:03 | `protocol/lab/pages.ts`、`server/lab/{operations,store}.ts` | W-09，D35-01/02 的 provider 实现，域内。 |
| [#72](https://github.com/Pepgent/Pepgent/pull/72) `issue-71-versioned-definitions` | 19:54:27 | `protocol/lab/{library,pages}.ts`、`server/lab/{library,operations}.ts` | W-09，D35-03，域内；早于 D35 其他行最终定案不等于提前实现，该行先行通过。 |
| [#70](https://github.com/Pepgent/Pepgent/pull/70) `issue-51-web02-final` | 19:16:14 | `apps/web/README.md` | W-09 在席时承接 D20-03 文档差量，域内。 |
| [#69](https://github.com/Pepgent/Pepgent/pull/69) `issue-51-web02-docs` | 19:15:25 | web README、conventions 01 | 同上；不是 W-10 越去后端。 |
| [#4](https://github.com/Pepgent/Pepgent/pull/4) `feat/oidc-authentication`（全部 open 补查） | **OPEN，未合并** | auth/host、routes/client、docs、tests 等 52 文件；Created 2026-09-26T17:47:26Z | 9 月遗产、非本轮 D16 席位新 PR；不能因不匹配 W-09/10 就谴责现席，也不接管/联系该无关工作。其未来是否冲突须由其 owner 与管理层明确，当前没有合入事实。 |

**本仓结论：** 两席没有互抢协议/后端/投影的直接证据，但“没有写对方目录”不足以通过封闭白名单。PR#75、#88 的域外测试和 home barrel 已合入是真实缺口，管理层不能用测试有益、文件小、无 CSS、或 UI 已经 Argon 追认来豁免。

### 3.3 Pepgent/omp-rpc-mux：返回 11 个 PR

| PR / head 分支 | 合入时刻 | 文件域及授权结论 |
|---|---|---|
| [#21](https://github.com/Pepgent/omp-rpc-mux/pull/21) `issue-19-trusted-reader-boundary` | 19:32:12 | README 一行，D32-01 v3 明确要求 W-01 修改同 UID 非沙箱的凭据边界；不是单方放宽。 |
| [#18](https://github.com/Pepgent/omp-rpc-mux/pull/18) `issue-17-reader-not-ready` | 13:16:42 | design/mux.md 两行，补现有 ready/stdin reader 关闭行为，未改代码/线帧。 |
| [#16](https://github.com/Pepgent/omp-rpc-mux/pull/16) `issue-13-mux-design-restore` | 13:13:59 | README、design/mux.md；D16-08 明确的草稿恢复与完成，W-01 全仓。 |
| [#15](https://github.com/Pepgent/omp-rpc-mux/pull/15) `d15/revert-mux-pr14` | 10:47:28 | README、删除 design/mux.md；D15 回退，不按后来 W-01 常规 PR 判断。 |
| [#14](https://github.com/Pepgent/omp-rpc-mux/pull/14) `issue-13-mux-design` | 09:33:35 | README、design/mux.md；PM#23 D15-06 已裁无效，#15 回退。历史责任原 Main。 |
| [#12](https://github.com/Pepgent/omp-rpc-mux/pull/12) `issue-7-file-capabilities` | 05:02:11 | Cargo、src/dial/protocol/serve 及 README；会话前遗产，本仓域内，不能倒套 D16 席位。 |
| [#11](https://github.com/Pepgent/omp-rpc-mux/pull/11) `issue-6-control-endpoints` | 04:09:31 | src/serve、tests/transport、README；会话前遗产。 |
| [#10](https://github.com/Pepgent/omp-rpc-mux/pull/10) `issue-4-trusted-human` | 03:11:55 | src/main/protocol/serve、tests、README；会话前遗产。 |
| [#9](https://github.com/Pepgent/omp-rpc-mux/pull/9) `issue-5-presence` | 02:41:53 | Cargo、src/protocol/serve、README；会话前遗产。 |
| [#8](https://github.com/Pepgent/omp-rpc-mux/pull/8) `issue-3-readers` | 01:19:28 | Cargo、src/dial/protocol/serve、tests、README；会话前遗产。 |
| [#2](https://github.com/Pepgent/omp-rpc-mux/pull/2) `issue-1-mux-vs1` | 00:24:36 | Docker/CI/compose/Cargo/src/tests/README；会话前遗产。 |

**结论：** W-01 全仓边界内未见新跨仓写入；最新受信凭据说明有 D32 事前授权。历史 #14 的无效性质不因当前 MERGED 字段消失，但也不能漏读 #15、#16 而说仍未纠正。管理链 Main/AreaMgrMux，历史责任依 D15。

### 3.4 Pepgent/remote：返回 9 个 PR

| PR / head 分支 | 合入时刻或状态 | 文件域及授权结论 |
|---|---|---|
| [#19](https://github.com/Pepgent/remote/pull/19) `w02-remote-18-template-metadata` | 14:09:34 | README、design、src/identity/model/error/backend、示例模板；W-02 全仓。TemplateMetadata 消费既定 D12，目录声明留 remote；未到 Lab 造 provider 数据。 |
| [#17](https://github.com/Pepgent/remote/pull/17) `w02-remote-d11` | 13:21:02 | README/design、Slurm、identity/model/ops；D16 恢复后的 D11-10、43A/B，W-02 全仓。 |
| [#15](https://github.com/Pepgent/remote/pull/15) `issue-14-slurm-oci` | **CLOSED，mergedAt=null** | 与 #17 类似；PM#23 D15-06 的冻结/作废对象，没有合入事实，不把 closed 算 merged。 |
| [#13](https://github.com/Pepgent/remote/pull/13) `fix/terminal-before-remove-4` | 05:24:44 | README/design、Komodo/Slurm、model/ops；会话前遗产。 |
| [#12](https://github.com/Pepgent/remote/pull/12) `docs/remote-contract-11` | 04:22:45 | README、design/remote.md；会话前遗产。 |
| [#10](https://github.com/Pepgent/remote/pull/10) `feat/readonly-runs-5` | 04:03:09 | README/design、home/main/model/ops；会话前遗产。 |
| [#9](https://github.com/Pepgent/remote/pull/9) `feat/soroi-template-6` | 02:46:46 | README/design、templates/komodo/soroi/compose.yaml；会话前遗产。 |
| [#8](https://github.com/Pepgent/remote/pull/8) `feat/template-identity-3` | 02:29:46 | Cargo、README/design、src/backend/identity/home/model/ops；会话前遗产。 |
| [#2](https://github.com/Pepgent/remote/pull/2) `feat/slurm-backend` | 00:46:54 | README/design、src/backend/error/home/model/ops；会话前遗产。 |

**结论：** 未见 W-02 新增跨仓路径问题；#17 与 #19 有既定契约承载。#19 中 Komodo/真实 Lab 联调未覆盖是 PR 自述的后续集成范围，不因缺少它自动判为路径越界或新设合入锁。管理链 Main/remote 片区管理。

### 3.5 Pepgent/lab-library：返回 7 个 PR

| PR / head 分支 | 合入时刻 | 文件域及授权结论 |
|---|---|---|
| [#14](https://github.com/Pepgent/lab-library/pull/14) `issue-5-bundle-guidance` | 13:38:53 | README、13 个 nodes；W-05 全仓，D16-06/09、D11-F12、D12-15 已定的加载/File/group/估时承接。不是自造新 File 模型。 |
| [#12](https://github.com/Pepgent/lab-library/pull/12) `revert/d15-lablibrary` | 10:56:14 | README、nodes；D15 回退。 |
| [#11](https://github.com/Pepgent/lab-library/pull/11) `issue-10-node-metadata` | 09:35:57 | README、nodes；PM#23 点名的历史无效派工，#12 回退。 |
| [#9](https://github.com/Pepgent/lab-library/pull/9) `issue-8-file-input` | 09:29:18 | README、五个 run_*；同上。 |
| [#6](https://github.com/Pepgent/lab-library/pull/6) `issue-5-bundle-guidance` | 06:37:08 | README；同上。 |
| [#4](https://github.com/Pepgent/lab-library/pull/4) `issue-3-f07-agent-negatives` | 02:44:49 | `.omp/agents/{text_only,try_eval}.md`、README、nodes、workloads | 会话前合法节点库资产；不能因它含 `.omp/agents` 就误认领导层角色定义越权。 |
| [#2](https://github.com/Pepgent/lab-library/pull/2) `issue-1-e2e-node-library` | 00:43:24 | nodes、review agent、package/lock/README | 会话前遗产。 |

**结论：** W-05 的最近恢复 PR 路径与既定契约有依据，未见本轮新增越界；历史无效对象与对应回退、重做都存在。管理责任按 D15 归原 Main；现行 Main/library 片区管理不应把“合并过”误写为全部产品流程完成。

### 3.6 Pepgent/images：返回 8 个 PR

| PR / head 分支 | 合入时刻 | 文件域及授权结论 |
|---|---|---|
| [#19](https://github.com/Pepgent/images/pull/19) `issue-18-lab-web-openssh` | 23:35:02 | Dockerfile、README、images.json；D47-02 的 lab-web ssh + D46-03 清单维护。diff 只在 lab-web stage 装 openssh，未写密钥/config/known_hosts。 |
| [#17](https://github.com/Pepgent/images/pull/17) `issue-16-images-manifest` | 22:45:09 | README、根 images.json；D46-03 v2 指定 W-03 输出清单，不是 W-09 解析 Dockerfile 自造事实。 |
| [#15](https://github.com/Pepgent/images/pull/15) `issue-14-store-contract-context` | 21:27:31 | Dockerfile/web-build、README；images#13 的合入前 A/B 都通过，见 §6；没有改变依赖发布形式或去改 W-06/W-09。 |
| [#12](https://github.com/Pepgent/images/pull/12) `issue-6-lab-web-live` | 13:41:03 | Dockerfile、README；D16-09 接续合法遗产，seed migrations 与 central e2e/standin 打包。 |
| [#11](https://github.com/Pepgent/images/pull/11) `revert/d15-images-pr8` | 11:03:39 | Dockerfile、README；D15 回退。 |
| [#8](https://github.com/Pepgent/images/pull/8) `issue-6-lab-web-live` | 06:47:17 | Dockerfile、README；D15-04 历史无效合并，#11 回退。 |
| [#7](https://github.com/Pepgent/images/pull/7) `issue-5-lab-web-image` | 02:53:01 | Dockerfile、README、两张 evidence 图片；会话前遗产。 |
| [#2](https://github.com/Pepgent/images/pull/2) `issue-1-agent-central` | 00:44:21 | Dockerfile、README；会话前遗产。 |

**结论：** W-03 全仓路径内，最近敏感改动存在有效分工/双闸门或决策，不见新增未投公开契约合入。管理链 Main/AreaMgrImages；不是镜像中出现 openssh 就等于 images 越权持有 deploy key。

### 3.7 Pepgent/deploy：返回 13 个 PR

| PR / head 分支 | 合入时刻 | 文件域及授权结论 |
|---|---|---|
| [#27](https://github.com/Pepgent/deploy/pull/27) `issue-26-images-remote` | 23:48:56 | README、central.toml、central.py、central compose；D46-02、D47-01 v2 指定四文件，详见 §6。未加 Lab 第三个配置接口，也未让 deploy 变检出写方。 |
| [#25](https://github.com/Pepgent/deploy/pull/25) `issue-24-trusted-reader` | 22:15:02 | README、central.toml、central.py、compose、slurm.toml；D32-01 v3 同源受信 reader 注入，W-04 全仓。 |
| [#23](https://github.com/Pepgent/deploy/pull/23) `issue-22-central-identity` | 17:53:50 | README、central.toml、central.py、compose；D13-02 中心身份承载，W-04。身份字符串不作本报告验证。 |
| [#21](https://github.com/Pepgent/deploy/pull/21) `issue-20-lab-volume-env` | 15:13:42 | README、compose；D21/D22 的 worktree/library 根路径变量。 |
| [#19](https://github.com/Pepgent/deploy/pull/19) `issue-18-template-contract` | 14:56:56 | README、remote.toml、slurm.toml；D11-10 与 remote 的 TemplateMetadata 消费，不到 remote 源码造第二源。 |
| [#17](https://github.com/Pepgent/deploy/pull/17) `issue-8-lab-auth-seed` | 13:47:17 | README、central.toml、central.py、compose、entrypoint、release-init、release compose | D16-04/08 与 D14 artifact/初始化/发行导入承接，W-04 全仓。 |
| [#15](https://github.com/Pepgent/deploy/pull/15) `revert/d15-private-decisions` | 11:10:25 | 上述部署定义与 release 文件删除 | D15 回退，不能当作删产品范围的新越界。 |
| [#12](https://github.com/Pepgent/deploy/pull/12) `issue-11-central-identity` | 09:15:13 | README、central.toml、central.py、compose | D15-05 点名的单方拆分合入，#15 回退。 |
| [#10](https://github.com/Pepgent/deploy/pull/10) `issue-1-release-init` | 07:17:34 | README、release-init.ts、release.compose.yaml | D15-05 点名的单裁产物，#15 回退。 |
| [#9](https://github.com/Pepgent/deploy/pull/9) `issue-8-lab-auth-seed` | 06:50:51 | README、central.toml、central.py、compose | D15-04 历史无效合并，#15 回退。 |
| [#7](https://github.com/Pepgent/deploy/pull/7) `issue-6-slurm-consumers` | 04:32:52 | README、central.toml、slurm.py、compose/entrypoint/remote-home/slurm 配置 | 会话前遗产。 |
| [#5](https://github.com/Pepgent/deploy/pull/5) `issue-3-remote-catalog` | 04:16:10 | README、central.toml、central.py、compose/entrypoint/remote-home/remote.toml | 会话前遗产。 |
| [#4](https://github.com/Pepgent/deploy/pull/4) `issue-2-central-stack` | 04:07:43 | README、evidence 图片、central.toml、central.py、compose/entrypoint | 会话前遗产。 |

**结论：** W-04 全仓，当前 PR#27 没有把 A/B 未决的 org 设定偷塞进部署代码。其后 runtime 曾失败再恢复是另一层事实，不能用“PR 已合入”抹掉，亦不能把已解除的旧失败继续当 BLOCKED。管理链 Main/AreaMgrDeploy；旧单裁依 D15 归原 Main。

### 3.8 Pepgent/council：返回 1 个 PR

| PR / head 分支 | 合入时刻 | 文件域及授权结论 |
|---|---|---|
| [#5](https://github.com/Pepgent/council/pull/5) `feat/1-worker-bus` | 19:03:50 | 41 文件：daemon/CLI/domain/store/bus/hook/peers/render/github/config/tally、测试、bin、launchd、docs、package/lock、AGENTS | U109/U110 的独立专属 agent 全仓迁移；D33 的具体接口定案后合并。没有混入 soroi 产品或 PM 代码路径，但历史生产先启用问题见 §6.4。 |

**结论：** council 不在最初 D16 的十席矩阵内，不能把“没有 W-11”当成未经授权：U109/U110 明确新增独立仓与专属 agent。相反，也不能拿“全权掌管迁移方案”推导公开接口与生产启用永远免投；PM#52 已明确指出两项先上线违例。

## 4. 已证新增路径越界与管理责任

### F1：PR#75 新增的 replay 测试不在封闭白名单

**执行事实（R）：** 本轮 `gh pr list` 文件清单及 PR#75 当前对象都列出 `apps/web/tests/vitest/lab-replay-at.test.ts [ADDED] (+33 -0)`，合入时刻 `20:54:41Z`。

**授权事实：** [PM#30 D20-01](https://github.com/Pepgent/PM/issues/30) 只列 `apps/web/tests/vitest/lab-*-view-model.test.ts`。`lab-replay-at.test.ts` 不匹配该模式。[PM#58 D39-01 v3](https://github.com/Pepgent/PM/issues/58) 的落选列明确写：改该测试“要另以治理领域扩白名单”，最后选定不动该测试，把新测试放入匹配的 experiment-detail-view-model 文件。这消除了“也许任何 lab 测试本来都能写”的歧义。

**判定：已合入的路径越界。** D35 的 time-axis 专项授权没有扩大 vitest 命名范围。D39 对后续实现选择不改这个文件，也不是对 PR#75 初次创建该文件的追溯授权。D20 末尾“若希望……可以放宽 glob”的非阻断建议不是已通过的扩大条款。

**管理责任：** Main 的 W-10 派工/协调链承接修正；ArgonGovernance-2 对常规 PR 的路径事后检查应识别该项。D39 已出现同一具体白名单反例，仍未把历史创建缺口单列闭环，说明问题是检查覆盖，不是缺一个文字声明。不能直接谴责 W-10 或让 Argon 的意图席为治理路径负责。

### F2：PR#88 九个域外测试与一个域外 barrel

**执行事实（R）：** 对完整分页文件集运行下列只读筛选，exit 0，得到九项：

```sh
gh api --paginate repos/Pepgent/Pepgent/pulls/88/files \
  --jq '.[] | select(.filename | startswith("apps/web/tests/vitest/")) | select(.filename | test("^apps/web/tests/vitest/lab-.*-view-model\\.test\\.ts$") | not) | .filename'
```

```text
apps/web/tests/vitest/lab-agent-text.test.ts
apps/web/tests/vitest/lab-artifact-href.test.ts
apps/web/tests/vitest/lab-command-dialog.test.ts
apps/web/tests/vitest/lab-flow-editor-save.test.ts
apps/web/tests/vitest/lab-handback.test.ts
apps/web/tests/vitest/lab-invalidation.test.ts
apps/web/tests/vitest/lab-page-search.test.ts
apps/web/tests/vitest/lab-panel-projection.test.ts
apps/web/tests/vitest/lab-selection.test.ts
```

完整分页还列出 `apps/web/src/renderer/features/lab-home/index.ts`。本轮直读 API patch 的实际变化：

```diff
 export { LabHomePage } from './ui/home-page.js';
 export {
-  chartSeriesPaths,
   EXPERIMENT_STATUS_SEMANTIC,
   homeReducer,
   homeViewModel,
```

**授权事实：** D20 只授权 features 下 model/controller/UI 的限定路径，没有授权 features/lab-home 根部 barrel。A 组五文件是 `_lab.tsx`、bootstrap/lab-entry、bootstrap/renderer-services、platform/web/create-lab-services、renderer/README.md，不含 home/index.ts；D35、D45 的专项 index 授权是 `packages/ui/src/lab/index.ts` 指定 AiPanel 类型导出行，不是任意同名 index.ts。D39 明确保持 D20 白名单不变；D46/D47 不扩大 W-10 的测试/feature 根域。

**判定：已合入的路径越界，共十个路径。** 九个测试的实际功能可能正确，barrel 也只是删死导出，但这不自动创设权限。`lab-wire-*-view-model.test.ts` 则匹配已授权模式，本报告没有把所有新测试一概指控为越界。

**管理责任：** Main 的协调/派工链、ArgonGovernance-2 的事后路径检查。AreaMgrPepgent-23 实际送达的是 UI 21 行处置，不能声称那次送达已覆盖这十个路径；它不是有权扩白名单的主体。事实依据为 [实际送达 PR 评论](https://github.com/Pepgent/Pepgent/pull/88#issuecomment-6565460794)，正文只列 UI。

**建议的处理边界（本报告不执行）：** 由管理层为确实必要的路径缺口建真实承载，按既有程序选择在已授权路径内归并/迁移，或走治理领域白名单修订；保留测试意图与产品范围，不机械删除测试，不回写已合并 PR，也不要求八仓全部停工。不能用新的泛化解释或“其实算在 model”把封闭 glob 擅自放大。

## 5. U59 / D20-02 视觉边界：不能以文件名取代内容检查

### 5.1 已观察到的具体变化

本轮读 [PR#88](https://github.com/Pepgent/Pepgent/pull/88) 完整文件清单与 clusters/containers/settings/AiPanel API patch：

- clusters 删除尾部 ActionDialog JSX 和 import，删除 `data-edge={cluster.id === 'instr_edge'}`；保留 node-grid 的 className。
- containers 删除 fixture ActionDialog、`view.locked` 图标分支，以及 Prebuild/Terminal 演示函数；保留已有真实数据展示的接线。
- settings 将危险样式条件从 `disconnect || delete_template` 收窄为 `disconnect`，另移除 scratch/SettingsToggle 演示结构。
- AiPanel 改 caller-owned session/messages/model/send，移除定时假回复；完整清单中的 `packages/ui/src/lab/index.ts` 是 AiPanelActivity 导出。
- [PR#75](https://github.com/Pepgent/Pepgent/pull/75) 的 time-axis 两文件只加受控位置、pointer 回调与几何逆函数，PR 正文有逐行用途表。

因此“没有 .css 文件”本身不足以证明“没有 class/结构变动”。本轮明确检查了这些可能隐藏在 tsx 的变化，而不是做文件扩展名形式检查。

### 5.2 源头裁决与不能越过的界线

[PR 评论 6565460794](https://github.com/Pepgent/Pepgent/pull/88#issuecomment-6565460794)，API 返回 `created_at=2026-11-01T23:25:03Z`，明确写：

> “21 行已由治理承接初审，并经闸门 A（Argon，产品意图与公开契约）判定……全部不越界，追认免票，不立案，不开纠偏承载”。

评论逐条说明 ActionDialog/锁图标/danger 条件“越出 D20-02 字面边界，闸门 A 追认”，理由是移除 fixture 后恒不渲染或恒 false。对 `data-edge` 则按演示 id 替换处理。这与本轮读到的 PM `evidence/gates/pepgent29-ui-pending-gate-a.md` 内容相符。

**本报告裁定：**

- 不推翻产品意图席对“可达 UI 没有变化”的既有内容判断，不凭纯文本 JSX 删除断言视觉被破坏。
- 不把该评论标成“双闸门已通过”；它本身只说初审+A。
- 常规开发允许事后检查，不能把每一项代码清理都改成事前投票。只有实际触及新白名单、契约或已上报 BLOCKED，才按相应程序处理。
- 这次 UI 追认没有授权 §4 九测试及 feature barrel；这些路径问题仍然成立。
- 生产浏览器视觉与真实业务效果本实例没有验证，不能写成已实测无变化。

**CSS 文件的精确结论：** 最近 15 个 Pepgent PR 的完整已取文件清单没有 `renderer/styles/lab/**`、`renderer/platform/web/astryx-theme/**` 或 `packages/ui/src/lab/ai-panel.css`；未发现 W-09/W-10 修改这些禁止路径。该阴性结论是本次采样窗口的路径结论，不是对全部历史的永久担保。

## 6. 其他仓契约/双闸门穿透核对

### 6.1 images#13 → images#14 / PR#15：先有双闸门，再做本仓构建补全

[images#13 BLOCKED 评论](https://github.com/Pepgent/images/issues/13#issuecomment-6562962112) 于 `19:45:37Z` 报私有 store-contract 安装缺输入。[20:01:47Z 的处置评论](https://github.com/Pepgent/images/issues/13#issuecomment-6563145457) 明确列出 A（K3）、B（W-03 全仓、不派 W-06/W-09）均通过，采用候选④：调用者从既有 clone 导出 bare/bundle，构建内本地 insteadOf；不用 token/ssh secret，不改依赖发布形式，不回退 Pepgent 源。

[images PR#15](https://github.com/Pepgent/images/pull/15) 创建 `20:08:46Z`，合入 `21:27:31Z`，只改本仓 Dockerfile/README。这一顺序和实际路径能支持“本项没有未过双闸门便单方改跨仓契约”的结论。它不是借 full-repo 白名单去改 provider 的发布方式。

### 6.2 D46/D47 的 provider/consumer 分工没有被合并成一个席位

- [PM#65](https://github.com/Pepgent/PM/issues/65) D46-03 v2 于本轮源头显示 decided；images [PR#17](https://github.com/Pepgent/images/pull/17) `22:45:09Z` 才合入 images.json。Lab [PR#87](https://github.com/Pepgent/Pepgent/pull/87) `22:54:00Z` 只读清单，未去 images 仓修改定义，新增 YAML 依赖三文件有 D46-06 v2。
- [PM#66 D47-02](https://github.com/Pepgent/PM/issues/66) 指定 W-03 的 lab-web ssh 客户端，[images PR#19 diff](https://github.com/Pepgent/images/pull/19/files) 只有该 stage 的 openssh 安装、README 和清单 SDK 条目，没有密钥或 SSH 连接配置。
- W-04 的 [deploy PR#27 diff](https://github.com/Pepgent/deploy/pull/27/files) 在指定四文件设置两个 Lab 变量、单别名 ssh config、只读 owner key bind；Lab 后端仍是 images 检出的唯一写方，deploy 没有增设 clone 服务。

这不是“全仓所以随便改契约”：每个敏感责任交界都有相应已通过行。PM 当前决策正文不是每行通过时间日志；本报告只在能核对到先后和具体行时下结论，不用 issue 整体 updatedAt 冒充所有行同时生效。

### 6.3 deploy#26 / PR#27：D47 代码合入与 D48 org 启用、runtime 成功分开

[PM#66](https://github.com/Pepgent/PM/issues/66) 当前 D47-01 v2 5/5 通过，其正文列出合入前 A/B；[PM#67](https://github.com/Pepgent/PM/issues/67) 则说明原单仓授权不含 org 开关，org 变更另走 A/B + P0。deploy PR#27 `23:48:56Z` 合入后的四文件 patch 落 D47 where，不含任何 PATCH org 脚本。不能只因 D48 此时尚未定案就倒推这四个代码文件必须禁止合入。

本轮直接读取 PR#27 评论的时序与观察：

| 源头 | 时间 | 记录的事实及本报告采用的边界 |
|---|---|---|
| [第一轮部署评论](https://github.com/Pepgent/deploy/pull/27#issuecomment-6565765461) | 23:53:07Z | variables/preview/apply 已运行；lab-web 旧 installer 拒绝 --artifact；验收1失败、2待验，key 列表为空。不能说 PR 合入即部署成功。 |
| [重部署评论](https://github.com/Pepgent/deploy/pull/27#issuecomment-6565811578) | 23:57:34Z | 换官方新发行后 running=true/restarts=0、两个变量读回；clone 仍 Permission denied，key 尚未注册。仅 HTTP 探活，不是浏览器业务通过。 |
| [最终 clone 评论](https://github.com/Pepgent/deploy/pull/27#issuecomment-6565846253) | 00:00:56Z（11-02） | deploy key 注册后容器内 clone exit 0，含 Dockerfile/README/images.json。不得继续把已解除的 installer/key 失败写成当前 blocker。 |

这些是 **GitHub 上 owner 发布的运行记录**，不是本实例重跑 runtime。其先失败后恢复不证明代码越界，也不能被合入状态掩盖。本轮没有观察到 org 在 D48 定案前被擅自改动的证据；也不以 D48 issue 的最终状态取代精确执行 actor 取证。剩余业务 UI 仍按既定阶段 C 验收，不增设逐 PR 锁。

### 6.4 council：合法合并不抹掉生产先启用

[PM#52](https://github.com/Pepgent/PM/issues/52) 当前正文“生产现状”和 D33-01/02 明确记载：

- `council status post` 已收窄为 progress/note/alert；
- 送达 sender 已固定为 subagent council；
- 两者在表决前随生产 daemon 生效，正文定性为 AGENTS:123 的程序违例；
- 当时 `No deliveries` / `no workers registered` / `no hook installed`，不能据上线就说工人总线已实际接管；
- Gate B 要求 D33 定案前不得合入 PR#5、不得激活 worker/hook/ingress。

[council PR#5](https://github.com/Pepgent/council/pull/5) 的实际合入时间 `19:03:50Z` 晚于 PM#52 当前记录的 `18:58:44Z` 最终更新；PR [19:03:24Z 的修改评论](https://github.com/Pepgent/council/pull/5#issuecomment-6562480513) 逐项交代 D33-12 v3 的 per-ref readiness、空 needs 不自动 ready、跨 org 不自动 ready，并在合入前给出对应实现记录。因此不能报“PR#5 未过 D33 即合并”。

**结论：历史先启用接口的程序越界已获源头确认；PR 合并本身有后续通过行覆盖。** 后来的投票不使先启用变成“从未违规”。具体生产启用命令的 actor 本轮没有查 session，不归责某个工人；由 Main 的迁移启用管理链承担事实补齐与程序责任，ArgonGovernance 负责不把追认当合规历史。全新接口若再出现不能以 U110 全权实现替代必要治理决定。

## 7. 管理责任表与可执行处置

| 项 | 当前判定 | 管理责任人/职能 | 应做的管理动作；本报告未执行 |
|---|---|---|---|
| PR#75 域外测试 | **已证，未见有效路径授权** | Main 协调/派工链；ArgonGovernance-2 第6条事后路径检查 | 建真实纠偏承载；在授权域归并测试或按治理议案扩路径，不回写合并 PR，不删除产品义务。 |
| PR#88 九测试+home barrel | **已证，十路径** | 同上；Pepgent 片区负责实际发现/上报/送达，不当决策者 | 使用完整分页文件集处理，不用“UI全部追认”覆盖。 |
| PR#88 UI 21行 | **有内容争点与事后A追认；未证实实际视觉破坏** | Argon 产品意图席负责语义；Main/治理承接者登记送达；ArgonGovernance 只审路径程序 | 不谎称双闸门，不另造所有常规改动事前锁；与新增路径发现分开。 |
| soroi 三席 | 本轮样本路径合规，根文件条件例外合法 | Main/soroi 片区；ArgonGovernance持续事后检查 | 保持 provider 独占写方，未来授权缺口按源头处理；不因本轮样本授永久绿勾。 |
| images/deploy 最近敏感PR | 有合入前契约依据和分工；未见新增未经双闸门改契约合入 | Main、AreaMgrImages、AreaMgrDeploy；Argon A / ArgonGovernance B 各守职责 | 不把旧 runtime 失败继续写当前阻塞，不拿合入/探活当完整业务通过。 |
| council 生产先启用 | PM#52 已证历史程序违例；PR合并时已有D33覆盖 | Main 总协调/迁移启用链；ArgonGovernance程序监督 | 如需追具体执行者由本轮父审计协调独立源流取证；不要凭 PR author=RiriAgent 归责底层工人。 |
| D15 旧 PR | 已有明确无效、回退、恢复序列，不是本轮新案 | 原 Main 会话，依PM#23；现协调链保留证据 | 不误报 MERGED 旧PR为当前污染、不破坏合法遗产。 |
| Pepgent旧open PR#4 | 非本轮席位新作，无合入事实 | 其原owner；Main只处理真实边界冲突 | 不接管、不联系无关会话，不把9月遗产当W-10越界。 |

### 交付与证据完整性

- 已完成八仓指定最近 PR 查询、全部 open 补查、W-06 补样、PR#88 大文件集分页补全、关键 diff 和决策边界/时序核对。
- 本报告不声称 84 个 PR 全部业务逻辑正确；也不以标题、author 账号、合入数量、hash 对读或审阅者自评证明合规。
- 本报告提出的新增路径问题以 `gh` 文件清单、实际 patch、PM#30 与 PM#58 的明确授权语义互相交叉；不是孤立 grep 无命中推定有罪。
- 工程 runtime 没有由本实例运行，产品阶段 C 的完整验收不在此只读切片内；本报告本身不新增这些验收前置。
- 仅写入指定 PM 报告和 `local://argon/full-audit-posthoc-prs-20261102.md` 镜像。提交/推送和并入父审计由文件所有者/父实例集成；本实例不动其他 checkout 或 GitHub 状态。
