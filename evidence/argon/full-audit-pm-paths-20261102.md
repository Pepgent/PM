# Pepgent/PM 错误路径与过时条文穿透核查（2026-11-02）

## 结论

**需要发起 P2 清理提案。** 不是因为旧文件出现过“三族”或 issue 已关闭，而是当前仍被引用的规范性正文继续指向已删除的 LEDGER 要求/决策表、旧计票/发布主体、错误文件扩展名及已被替代的凭据路径。D41–D48 的多项回写已经完成，不能把这些已修内容重复列为缺陷。

**未发现应因“任务已废止”而直接关闭的 PM open issue。** 实时 open 列表只有 [#13 D9-01](https://github.com/Pepgent/PM/issues/13)、[#14 D9-02](https://github.com/Pepgent/PM/issues/14)、[#15 D9-03](https://github.com/Pepgent/PM/issues/15)；三者仍承载 F32。应清理它们的旧波次/过宽开工锁措辞，保留任务与最终真实证据要求，不能为了清理而关闭 D9。

本报告只提出清理范围和逐项依据，不代替领导层设计或发起议程。未修改任何代码、配置、issue、决策、选票或评论。报告文件由父代理集成提交；本子代理未执行 git 操作。

## 1. 范围、方法与证据界限

- 核查本机 PM 的 README、evidence/decisions/ 全目录清单；逐项读取 D7、D8、D12、D16、D20 的相关执行正文，D41–D48 的事实/决策/反例说明，并交叉读取 D10、D16-15、D17、D28、D8-slice-issues 及派工草案。
- 实时 GitHub 读取：PM open 全列表、closed 全列表（limit 200），open 三项完整正文，D1、D10、D16、D17、D20、D46–D48 的目标段落，以及 council 清理与探针 issue。查询窗口截至实际时钟输出 **2026-11-02T00:06:08Z**；文件和远端此后可能继续变化，本报告是该窗口取回的副本，不声称永久状态。
- 依据是 LEDGER.md 的 (U) 原话，尤其 U95、U96、U103–U113。文件原文说明当前落盘内容，实时 gh/issue 读取说明源对象状态；未用提交标识、摘要或 hash 对读证明任何行为。
- 未调查会话历史、未运行工程测试或 runtime smoke。这里的实测是 GitHub 状态查询和文件内容读取，不是对产品实现的验收。未因决策 issue 关闭而推断工程或凭据部署完成。
- 当前无 task 工具，按工人递归上限规则未启动 mentor；调查计划先记录，再开展只读核查。

### 可复现的实时查询

~~~sh
gh issue list --repo Pepgent/PM --state open --limit 200 --json number,title,url,updatedAt
gh issue list --repo Pepgent/PM --state closed --limit 200 --json number,title,url,closedAt --jq '.[] | "#\(.number) \(.closedAt) \(.title) \(.url)"'
gh issue view 1 --repo Pepgent/PM --json body,url
gh issue view 25 --repo Pepgent/PM --json body,url
gh issue view 27 --repo Pepgent/PM --json body,url
gh issue view 65 --repo Pepgent/PM --json body,url
gh issue view 66 --repo Pepgent/PM --json body,url
gh issue view 67 --repo Pepgent/PM --json body,url
~~~

open 实测返回：

~~~text
13  D9-01 18 个字段的叶子类型清单  2026-11-01T11:18:50Z
14  D9-02 叶子来源分类与录制值比对  2026-11-01T11:18:51Z
15  D9-03 点线面缺口报告与表决      2026-11-01T11:18:53Z
~~~

closed 实测包括 D41–D48 对应的 [PM#60](https://github.com/Pepgent/PM/issues/60)、[#61](https://github.com/Pepgent/PM/issues/61)、[#62](https://github.com/Pepgent/PM/issues/62)、[#63](https://github.com/Pepgent/PM/issues/63)、[#64](https://github.com/Pepgent/PM/issues/64)、[#65](https://github.com/Pepgent/PM/issues/65)、[#66](https://github.com/Pepgent/PM/issues/66)、[#67](https://github.com/Pepgent/PM/issues/67)。最新 D48 close 时间为 2026-11-01T23:56:58Z。只把这当议程状态，不当工程完成证据。

## 2. 可以直接形成 P2 清理行的确认项

以下路径除另有说明均相对 /Users/mouriya/Ext/code/pepgent/pepgent-pm/。每项包含原文位置、最新依据与清理边界；这是范围建议，最终 what/where/how 与执行主体由有权席位决定。

### P2-01：LEDGER 要求表/决策索引的“复活指令”仍在活动正文

**观察：**

- evidence/decisions/D16-phaseB-review-restore.md:36（D16-12）仍要求记录“LEDGER C1–C5、R1–R21”的逐步核对，并在状态口径提到 R8、R9。
- 同文件 :38（D16-14）仍命令替换“R21 状态行”“决策索引中 D10–D14、D16 的状态”“决策索引中 D5、D6 的链接”，末尾还要求 R3 保持进行中。
- 实时 [PM#25](https://github.com/Pepgent/PM/issues/25) 正文 D16-12/14 仍有相同要求，D16-14 甚至仍含“派工预审”。不是仅本地文件漂移。
- 实时 [PM#1](https://github.com/Pepgent/PM/issues/1) 的 D1-05 仍让秘书替换 LEDGER 状态与链接；D1-20 写“LEDGER 只保留核心条款、要求表、当前阶段主线与有效 (U)”；D1-21 的 where 仍为“LEDGER.md 状态列”并定义 R1–R21 的状态。
- evidence/decisions/D17-omomp-efficiency-and-pm-cleanup.md:51 与 [PM#27](https://github.com/Pepgent/PM/issues/27) 执行段仍要求“按 C4-3 替换 LEDGER 中对应的状态行”。

**源头：** (U112)“为什么把LEDGER.md 变成了决策垃圾账本？GitHubissue呢？”及“谁允许保留## 一、要求分解与完成状态（R1–R21）？”（soroi/LEDGER.md:58）；(U105) 议题、投票与 issue 写入交 daemon。当前 soroi/LEDGER.md 本身已只存 U 引文，已无上述 R/D 表。

**清理边界：** 去掉所有恢复或维护 LEDGER R/D 状态的规范性命令；保留对用户原话 U 的实质核对，需求/决策状态回归 GitHub/Project/council。不能只删 LEDGER 现表而留下再次创建它的命令。D1-21 关于持续性约束不得永久绿勾的语义仍有效，应迁正记录位置而不是删除这项保护。

### P2-02：被废除的“按家族计票”仍以现在时操作命令存在

**观察：**

- evidence/decisions/D10-repo-delivery.md:19–20，D10-07 写“三族对整张分流表投一票”“三族表决”；D10-08 写“回领导层三族投票”及 BLOCKED 后“三族表决”。D16 已声明这些决策恢复效力，不能把持续引用的决定权边界一律视为无效旧稿。
- evidence/decisions/D17-omomp-efficiency-and-pm-cleanup.md:43–44，D17-14 仍命令统一成“argon 族由常驻 Argon 投一票……ArgonGovernance……不作为例行投票席”；D17-15 仍命令 D1-12“改为 Claude 族、Argon、LeadMentor 三族”。实时 [PM#27](https://github.com/Pepgent/PM/issues/27) 的这两条 how 保留相同命令。
- evidence/decisions/phaseB-dispatch-draft.md:19–20 仍在操作核对行称治理席不参例行票、Claude 族包含独立 task:high，并要求三族表决。它是草案，不可拿来替代定稿；应避免继续从该草案取派工规则。

**源头：** (U95)“按家族投票是遗留设计”；实时 [PM#1 D1-12](https://github.com/Pepgent/PM/issues/1) 已改为职能席位且审查席与协调席分开；soroi/AGENTS.md:13–27 与角色第 22 条是同一规则。

**清理边界：** 明确替代仍在指令未来执行的族计票要求，保留历史原票与“当时三族通过”的事实。不能重新按新制度伪造历史票，也不能把 PM#25 已有“历史三族票数不是现行制度”的说明当作对所有其他旧 how 的自动改写。

### P2-03：议会自动化上线后，D1 仍把决策维护、计票交给秘书

**观察：** 实时 [PM#1](https://github.com/Pepgent/PM/issues/1) D1-05：“维护 PM 决策 issue、原票归档”；D1-12 how 末句：“秘书保存原票并逐项计票”。D1-10/11/18 还保留 leader/秘书定期唤起哨兵、peer 仅主会话可用等旧通信描述。

**源头：** (U105)“所有的投票和议题管理均交给程序自动处理，issue写入同样也交由程序实现”；(U107) area-manager 用 peer 主动单向巡查工人。PM/README.md:5 已写议程、选票、计票与归档由 Pepgent/council daemon 承担。

**清理边界：** 决策议程、票与发布由 daemon；秘书保留非决策排期、证据整理职责；常规工人对接由片区经理。不是取消秘书或关闭既有角色。

### P2-04：D16 派工正文仍给片区经理错误通信路径

**观察：** evidence/decisions/D16-phaseB-review-restore.md:35，D16-11⑤ 命令片区经理结合 tern capture/session JSONL 收状态、把 BLOCKED 交“治理分身”，并“再用 tern send 送达处置结果与唤醒工人”。

**源头：** (U103) 治理事务用新开空白 task，不再 fork_task；(U107)“.omp/agents/area-manager.md 应该使用peer……只有实地考察的备选方案才需要阅读sessionlog”“纯单向通信”（soroi/LEDGER.md:51,53）。现行 AGENTS.md C4-1/2 要求 peer_ask/peer_send，日志是备选，不用 tern send 粘输入框替代。

**清理边界：** 修正该派工模板的实际传输方法及治理承接生命周期，不把“分身”一词每次历史提及都认定为 fork 行为。未据该文件断言当前片区经理实际正在违规，实际执行由其他审计负责。

### P2-05：D47 已禁止私钥进 Variables，D7/D12 回写仍要求旧凭据路径

**观察：**

- evidence/decisions/D7-lab-backend.md:79（D7-19 凭据段）仍写私有 images 只读凭据“按既有 Komodo Variables 注入路径提供给 Lab 容器的 git”。
- evidence/decisions/D12-lab-wire.md:662（P15）有同样措辞。
- evidence/decisions/D46-pepgent80-blocked.md:29（D46-02）是被 D47 覆盖的旧表述；它本身作为当时定案记录可留，但不能继续把它当最新注入指令。

**源头：** 实时 [PM#66 D47-01 v2](https://github.com/Pepgent/PM/issues/66) 明确“私钥……按路径只读 bind 进 lab-web，不经 Komodo Variable 或 Stack environment”；[PM#67 D48-01 v2](https://github.com/Pepgent/PM/issues/67) 只增加 org 开关前提并保留 Lab 双变量接口，未恢复旧注入路径。D47 文档 :41–54 记录多行私钥过不了 environment 逐行解析的具体反例。

**清理边界：** 把 D7-19、D12 P15 的活动部署说明对齐 D47-01 v2，保留 PEPGENT_LAB_IMAGES_HOME/REMOTE 两变量、owner 私钥文件与只读 bind，不复活已落选的 HTTPS 带凭据单值或私钥 Variable。不因提案文字清理而宣称 key 已注册、部署已恢复；这些须向 GitHub/deploy 运行源头另取实证。

### P2-06：W-09 notices 白名单的错误扩展名未全面修复

**观察：** evidence/decisions/D16-phaseB-review-restore.md:33（W-09）与实时 [PM#25 D16-09](https://github.com/Pepgent/PM/issues/25) 仍写 THIRD_PARTY_NOTICES.md，没有完整实际路径。

**源头：** [PM#65 D46-06 v2](https://github.com/Pepgent/PM/issues/65) 的精确路径是 apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt；D46 文档 :58–63 明确指出原 .md 错误，且生成脚本校验会消费该 .txt。D8-mvp-scope.md:335 已对 LAB-13 正确回写 .txt，说明问题是其他入口未同步，不是 D46 没定案。

**清理边界：** 修正 D16 活动白名单路径为该 .txt 并保持只能随依赖变化由既有脚本生成的约束；不要给全仓许可证文件无限权限。

### P2-07：D16 总矩阵未完整吸收已通过的 time-axis 授权

**观察：** D20-w10-path-boundary.md:31 已含 D35-01 v3 授权的 packages/ui/src/lab/time-axis.tsx、time-axis-model.ts，也含 D45 的 AiPanel 专项。但 D16-phaseB-review-restore.md:33 的完整 W-10 清单只补了 AiPanel，未列这两个 time-axis 文件；同一行仍称路径“一律完整列明”。

**源头：** [PM#54 D35](https://github.com/Pepgent/PM/issues/54) 的已通过 time-axis 授权；[PM#64 D45](https://github.com/Pepgent/PM/issues/64) 事实段明确确认 D20/D35 已把 time-axis 两文件划给 W-10；D20 当前原文 :31 提供精确用途限制。

**清理边界：** D16 回写应准确吸收已有两文件授权及用途，不新增 packages/ui 通用写权。D20 本身不能再列为“仍完全禁止 time-axis/AiPanel”的缺陷；它已修。

### P2-08：store-contract 过渡路径在旧入口中仍会指回已撤销的根导出

**观察：** D16-phaseB-review-restore.md:29（D16-05）仍要求根 package.json 增加 ./contract、./identity 和 zod；:33 的 W-06 白名单仍给这两项根导出归属。D12-lab-wire.md:33、:82 与 D7-lab-backend.md:80 仍引导仓 A 建立前按 D16-05 从 soroi 根导出接入。

**源头：** 已关闭 [PM#26 D16-15](https://github.com/Pepgent/PM/issues/26) 对应的当前 D16-15-store-contract.md:28 明确：由 CI 产出 store-contract 派生分支；Pepgent 引用 git+https://github.com/Pepgent/soroi.git#store-contract；⑤撤销 D16-05 根 exports/zod 并取消 W-06 对根 package.json 的该归属。后续 [PM#47 D28-02](https://github.com/Pepgent/PM/issues/47) 又明确消费方负责刷新，已回写 D16-15。

**清理边界：** 活动接入说明引用已通过的派生分支路径和刷新负责方，不重新发明包、复制 schema 或恢复已被证明不可安装的根 workspaces 依赖。不改 schema 的实际权威归属。

### P2-09：三个 open D9 issue 的任务有效，但波次与开工条件文字过时

**观察：** 实时 [PM#13](https://github.com/Pepgent/PM/issues/13)、[#14](https://github.com/Pepgent/PM/issues/14)、[#15](https://github.com/Pepgent/PM/issues/15) 全部写“波次 / wave：W7”，必须先读仍叫“§4.1 波次与并行顺序”，依赖项后统一套“前置切片须已有 runtime 验收证据，才能开工”，STARTED 还要求上游 runtime 链接。它们的旧 L389/L390/L391“原始行”硬锚随新增 LAB 行已漂移：当前 D8 的对应位置已进入分组数量表，不能继续当精确切片定位。

**源头：** [PM#27 D17-11/12](https://github.com/Pepgent/PM/issues/27) 已废除固定波次/每切片独立验收锁；D8-mvp-scope.md:182–207 已改成统一 e2e 执行顺序与真实代码依赖；D8-slice-issues.md:7 明确 W1–W7 只是历史映射 ID，不是排期；(U83)“验收并不需要每一步都验收”。

**重要限定：** D9-02 的录制值比对、D9-03 的最终报告本来就需要阶段 C 真实输出，特别是 #15“收齐 F01–F31 分段证据”不能删除；#13 类型叶子枚举的准备工作则不能仅因通用模板而强加同等 runtime 前置。需按每项实际输入替换通用模板，不取消最终验收、不提前伪造 D9 完成、不直接关闭三项。

### P2-10：LEDGER 的旧 C/R 定位与行号造成错误入口，D20 仍在引用不存在的 C2-3

**观察：** D7-lab-backend.md:25–28 等用户引文仍带 LEDGER:11–15、126–128、61–63 等旧行号；D8-mvp-scope.md:45–46、72、83 仍引用 R31、R60、R54–R57、R49；D20-w10-path-boundary.md:25 与实时 [PM#30](https://github.com/Pepgent/PM/issues/30) 把计票源写成“LEDGER C2-3（U95）”；[PM#1](https://github.com/Pepgent/PM/issues/1) 与 [PM#25](https://github.com/Pepgent/PM/issues/25) 多处仍有 LEDGER C 类定位。

**源头：** (U112) 要求 LEDGER 退出状态/决策账本；本次读取的 soroi/LEDGER.md 只有 U 原话，C1–C5 与投票细则在 AGENTS.md，现已无 C2-3/R 表。D20 的五席数字本身正确，错误的是引用位置，不得顺手改它的合法计票含义。

**清理边界：** 用户原话以 U 编号引用；规范细则指向真正存在的 AGENTS 章节与相应决策。保留有效原话，不要求把所有历史调查中的数字行号一律改写。

## 3. 次级候选：需避免扩大问题或误删有效保护

1. **非阻塞金丝雀与“阶段 B 不执行跨组件测试”缺少显式区分。** D8-13、D16-10/13 及 D1-08 仍有全称式禁令；(U96) 明确授权产品全景部门与 W-08 对已合入相邻组件运行异步非阻塞接缝金丝雀，[PM#47 D28](https://github.com/Pepgent/PM/issues/47) 就是该路径的实证产物。可在 P2 中消除读者把“工人不做同步逐步 e2e”误读为“任何后台 canary 都禁止”的歧义，不能反向要求每 PR 必跑 canary，不能借此提前编写未完成代码的测试。
2. **验收措辞中的 hash 残留。** D8-mvp-scope.md:217 ENV-03 仍以“tar 的 sha256 一致”为验收条件，:128 F09 与 :325 LAB-05 仍有“字节与对象哈希一致”。当前明确指令禁止 hash 验证作任何证据；实时 [PM#13–15](https://github.com/Pepgent/PM/issues/13) 的统一验收段也已写“不得将 hash 验证作为证据”。这需要作为验收表述清理候选交有权席位确定替换的真实行为观察；不能删除产品本身的内容寻址或 capture 身份契约。本报告没有执行或采纳这些 hash 比对。
3. **已完成迁移的本地依赖缓存残留。** 实时 [PM#41](https://github.com/Pepgent/PM/issues/41) CLOSED，正文预期 PM checkout 连 tools/council/ 目录也不存在；本次 read 却看到 tools/council/node_modules/（.bin、@types、@typescript、bun-types、undici-types、typescript）。未见同层源码、README、launchd 文件；这是 checkout 物理目录清理未完全吻合已关闭 issue 的观察，不足以认定存在第二套运行中的 council。未检查跟踪状态、未删除缓存、未重开 issue；由原清理 owner 在既有范围核对是否要清理，不应凭目录名先扩展成架构迁移失败。

## 4. 已修复或属于历史的项目：不重复立案

| 核查点 | 本次实际观察 | 对照源头与裁定 |
|---|---|---|
| D41 节点 template 类型/泳道 | D12:254–255 为 string/null agent 定义名；:59/:63 已按 defaultEnvironment 区分 null 与非字面量 | [D41 / PM#60](https://github.com/Pepgent/PM/issues/60)。已回写，不再报“仍用 template 找 remote 模板” |
| D42、D44 服务端承载 | D8:335–336 与 D8-slice-issues:91–92 已新增 LAB-13/#80、LAB-14/#83，后者含 STO-08；D8 中 LAB-13 精确 notices 路径已修 | [PM#61](https://github.com/Pepgent/PM/issues/61)、[PM#63](https://github.com/Pepgent/PM/issues/63)。承载已登记，不等于实现已完成 |
| D43/D46 activity 写点 | D12:214–218 已分别写 member.quota/conclusion 同事务、Better Auth 三命令返回后独立事务、合入 push 成功后写行 | [PM#62](https://github.com/Pepgent/PM/issues/62)、[PM#65](https://github.com/Pepgent/PM/issues/65)。不可再报“D12 全部命令仍同一事务” |
| D45 AiPanel 路径 | D20:31、D16:33 都已有 ai-panel.tsx、ai-panel-model.ts 及受限 index.ts 导出授权 | [PM#64](https://github.com/Pepgent/PM/issues/64)。已修，不把 packages/ui 整域禁令误套到已授权文件 |
| D46 agent 模板文件路径 | D7:71、D12:267–272/:455 及 D42:41 已写顶层 .omp/agents/<id>.md、单文件、非递归、saveVersion 精确 paths | [PM#65 D46-05](https://github.com/Pepgent/PM/issues/65)。不再报缺 .md 的旧问题 |
| D46 images 清单/成员状态 | D7:73、:106，D12:370–377 与 P15 已有 images.json、最近已发布祖先、Lab 自己观察 online/lastActiveAt | [PM#65](https://github.com/Pepgent/PM/issues/65)。这些定义已回写，只有凭据注入的旧句另见 P2-05 |
| D48 稳态一把与轮换两把 | 定稿是 v2，明确稳态恰好一把，同角色轮换窗口允许旧新两把 | [PM#67](https://github.com/Pepgent/PM/issues/67)。v1 反例已处理，不能重复报告它仍冲突 |
| 历史“三族通过”与旧评论 | D11*-rounds、D15-process、既有 votes、D17 历史计票摘要记载当时过程 | D16-07 明确保留历史，PM#25 也注明历史三族票不是现行制度。只清理未来执行指令，不重写历史 |
| 已关闭探针 | closed 列表中的 PM#35–40、#45 均已关闭；#45 正文明确 D9xx 是测试实例、“不构成任何决策” | [PM#45](https://github.com/Pepgent/PM/issues/45)。未残留 open 探针，无需用 P2 再关闭 |

## 5. P2 提案与交付建议

- **建议发起 P2，优先覆盖 P2-01–10。** 涉及 PM 错误路径清理与组织治理，应由 ArgonGovernance 依角色第 20 条直接 council propose --seat ArgonGovernance；按 P0→P1→P2→P3 队列准入，标明治理领域并参加治理席审查。不经 IRC 收票，不让 Main 单方排序，也不阻塞当前白名单内工程。
- **不对 U112/U105/U107 本身重投。** 它们是必须直接执行的用户指令；P2 管理的是对 PM 发布材料/活动说明的具体清理范围与落点，不能用投票保留与 U 相反的旧规则。
- **不要把“正文直接替换”错误用于不可变记录。** U105 后 daemon 生成的 issue/定稿经 council 的既有发布与修订路径处理，不能手改 DB 或正文绕程序；旧原票、已发评论和历史事实不回写。是否对归档正文采用新提案显式取代还是更新活动回写文件，应由父代理按 council 现有契约决定，不在本审计中发明额外机制。
- **开放 D9 三项保留。** 精确修正引用锚、W7 身份与真实输入依赖；D9-02/03 的阶段 C 数据、全部 verdict 与最终表决仍须满足。没有证据证明它们已交付，不能关闭。
- **不扩大到工程修复。** D47/D48 的 key 注册、镜像发布、deploy 合并或 Lab 运行是否恢复不属于这份文字清理验收；由对应拥有方取运行证据。

## 6. 本次交付与剩余工作

本报告交付两份内容一致的副本：

- /Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/argon/full-audit-pm-paths-20261102.md
- local://argon/full-audit-pm-paths-20261102.md

已完成的是只读核查与清理范围报告，不是 P2 已发起或已执行。剩余的提案设计、投票、daemon 发布、关联文档替换与报告提交由父代理/有权席位承接。没有把上述未执行动作标成完成，也没有把报告写入当作旧条款已修复。
