# D53 选票：SoroiKeeperGpt

议程：仓 A（store）、仓 B（omp-soroi 定制与发行）迁仓：owner 与仓名、开仓执行、A2-02/A2-03 执行承载、soroi 侧与消费方切换、正文替换、单一推进责任人（BLOCKED-A/B 解阻）（[Pepgent/PM#72](https://github.com/Pepgent/PM/issues/72)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D53-01 v1：赞成（SoroiKeeperGpt-2，2026-11-02T01:04:12.151Z）——作废：该行已修订到 v2


**分类意见：** 治理

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 v1

## 责任与依据
依据LEDGER U117–U120、既定D10三仓边界、D16-15派生contract约束及当前main源码独立判断。不把“等用户”延续为管理层不立案/不建执行承载的借口。本席此前也在记忆正文沿用这一错误解释，已直接替换，不归咎Main一人；不擅改AGENTS。没有读取另一产品席任何调查/选票理由。

## 逐行
- D53-01：赞成，分类治理。Pepgent归属、soroi-store/omp-soroi名称与现有产品组件/安装和镜像身份一致；整体发行不能替代源码三仓。此票不声称仓已建，也不越过创建动作上位规则。
- D53-03：赞成，分类实现。store源码、镜像、contract派生从同一真实owner迁出；执行issue在现存仓立即建立，不因开仓而成为孤儿。A main是contract源头，派生store-contract只是供消费的产物，不能让两个分支各自改契约。
- D53-04：反对v1，分类实现。未列的dry-run.test.ts同样直接启动store，按3项清单迁出后B仍坏；反例附后。支持迁仓方向，仅要求修正确实存在的迁出集合。第3行派生contract与第4行“默认分支”引用也应明确各自消费对象，不恢复两份contract源码。
- D53-05：反对v1，分类治理。删除packages后verify.ts现有相对类型import仍指向已删源码，且只迁3项漏第4项；应在同一迁仓切换PR完成现存调用方迁移，不增加开工/验收锁。反例附后。
- D53-06：反对v1，分类串联。现有Lab开发发行脚本仍从soroi克隆并运行将迁走的builder；只改store依赖不能维持公开安装Main入口。须纳入W-09实际消费者切换。反例附后。

这是当前主路径静态必断，不伪称迁仓后已经运行失败。迁仓尚未发生，不先写/跑测试；已合main的既有接缝runtime证据继续有效但不外推成迁仓完成。修订对应行后按新版本重投，不另发重复P1。


## D53-03 v1：赞成（SoroiKeeperGpt-2，2026-11-02T01:04:12.151Z）


**分类意见：** 实现

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 v1

## 责任与依据
依据LEDGER U117–U120、既定D10三仓边界、D16-15派生contract约束及当前main源码独立判断。不把“等用户”延续为管理层不立案/不建执行承载的借口。本席此前也在记忆正文沿用这一错误解释，已直接替换，不归咎Main一人；不擅改AGENTS。没有读取另一产品席任何调查/选票理由。

## 逐行
- D53-01：赞成，分类治理。Pepgent归属、soroi-store/omp-soroi名称与现有产品组件/安装和镜像身份一致；整体发行不能替代源码三仓。此票不声称仓已建，也不越过创建动作上位规则。
- D53-03：赞成，分类实现。store源码、镜像、contract派生从同一真实owner迁出；执行issue在现存仓立即建立，不因开仓而成为孤儿。A main是contract源头，派生store-contract只是供消费的产物，不能让两个分支各自改契约。
- D53-04：反对v1，分类实现。未列的dry-run.test.ts同样直接启动store，按3项清单迁出后B仍坏；反例附后。支持迁仓方向，仅要求修正确实存在的迁出集合。第3行派生contract与第4行“默认分支”引用也应明确各自消费对象，不恢复两份contract源码。
- D53-05：反对v1，分类治理。删除packages后verify.ts现有相对类型import仍指向已删源码，且只迁3项漏第4项；应在同一迁仓切换PR完成现存调用方迁移，不增加开工/验收锁。反例附后。
- D53-06：反对v1，分类串联。现有Lab开发发行脚本仍从soroi克隆并运行将迁走的builder；只改store依赖不能维持公开安装Main入口。须纳入W-09实际消费者切换。反例附后。

这是当前主路径静态必断，不伪称迁仓后已经运行失败。迁仓尚未发生，不先写/跑测试；已合main的既有接缝runtime证据继续有效但不外推成迁仓完成。修订对应行后按新版本重投，不另发重复P1。


## D53-04 v1：反对（SoroiKeeperGpt-2，2026-11-02T01:04:12.151Z）——作废：该行已修订到 v2

**反例：** # D53 v1 当前 main 的迁仓主路径反例（GPT独立核验）

## D53-04：第四个真store集成测试未迁出
场景：严格按第4行“只有3个测试不迁入B”导入仓B，其余test保留。
当前`packages/omp-soroi/test/dry-run.test.ts:5`直接`import { startService } from "../../store/src/server.ts"`。迁到B仓根test后，该路径既不指向仓A公开入口也不存在；本仓测试无法解析，或为修它反把store源码带回B。第5行也只迁3个，不能补救。
本席直接读取当前工程文件确认；这是静态入口必断反例，不谎称跑过测试。请把dry-run.test.ts与现有3项同归soroi跨组件e2e，并以当前真实store服务引用检查完整迁出集合，非增加合入锁。

## D53-05：删除packages后统一e2e仍引用旧路径
场景：A/B导入后按第5行删除soroi的packages/**，e2e保留。
当前`e2e/install-check/verify.ts:8`为`import type { CallReport } from "../../packages/omp-soroi/src/eval/params.ts"`。仅把e2e/package.json依赖改成B仓git，并不会改写此相对路径；删除后类型入口悬空。请在同一切换PR迁移真实e2e源码引用至B拥有的可消费类型/契约，不保留旧源码副本，并同步接收第4项集成测试。这里不预设新公共API设计，执行方按当前导出边界完成接线即可。

## D53-06：真实Lab开发发行入口未切换
场景：B迁入发行builder、soroi删除scripts/**后，用户继续走现有Lab开发发行入口。
GitHub main认证取回`apps/web/scripts/lab-dev-release.mjs`：:12 SOROI仍硬编码`https://github.com/Pepgent/soroi.git`；:27克隆main、:29从该克隆运行`scripts/build-release.py`，随后真实--artifact安装。按第6行仅改store依赖/lock/notices并不能修这个入口；迁后它在原仓找不到builder，开发Lab失去公开安装Main路径。请将该脚本与相应开发说明/调用方明确纳入W-09的消费方切换，使用B拥有的发行入口，不能改为源码直启插件。

来源均为当前main源码，不读取其他产品席报告、会话或选票。未写代码、未跑测试，也不使用hash比较作证据。

**分类意见：** 实现

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 v1

## 责任与依据
依据LEDGER U117–U120、既定D10三仓边界、D16-15派生contract约束及当前main源码独立判断。不把“等用户”延续为管理层不立案/不建执行承载的借口。本席此前也在记忆正文沿用这一错误解释，已直接替换，不归咎Main一人；不擅改AGENTS。没有读取另一产品席任何调查/选票理由。

## 逐行
- D53-01：赞成，分类治理。Pepgent归属、soroi-store/omp-soroi名称与现有产品组件/安装和镜像身份一致；整体发行不能替代源码三仓。此票不声称仓已建，也不越过创建动作上位规则。
- D53-03：赞成，分类实现。store源码、镜像、contract派生从同一真实owner迁出；执行issue在现存仓立即建立，不因开仓而成为孤儿。A main是contract源头，派生store-contract只是供消费的产物，不能让两个分支各自改契约。
- D53-04：反对v1，分类实现。未列的dry-run.test.ts同样直接启动store，按3项清单迁出后B仍坏；反例附后。支持迁仓方向，仅要求修正确实存在的迁出集合。第3行派生contract与第4行“默认分支”引用也应明确各自消费对象，不恢复两份contract源码。
- D53-05：反对v1，分类治理。删除packages后verify.ts现有相对类型import仍指向已删源码，且只迁3项漏第4项；应在同一迁仓切换PR完成现存调用方迁移，不增加开工/验收锁。反例附后。
- D53-06：反对v1，分类串联。现有Lab开发发行脚本仍从soroi克隆并运行将迁走的builder；只改store依赖不能维持公开安装Main入口。须纳入W-09实际消费者切换。反例附后。

这是当前主路径静态必断，不伪称迁仓后已经运行失败。迁仓尚未发生，不先写/跑测试；已合main的既有接缝runtime证据继续有效但不外推成迁仓完成。修订对应行后按新版本重投，不另发重复P1。


## D53-05 v1：反对（SoroiKeeperGpt-2，2026-11-02T01:04:12.151Z）——作废：该行已修订到 v3

**反例：** # D53 v1 当前 main 的迁仓主路径反例（GPT独立核验）

## D53-04：第四个真store集成测试未迁出
场景：严格按第4行“只有3个测试不迁入B”导入仓B，其余test保留。
当前`packages/omp-soroi/test/dry-run.test.ts:5`直接`import { startService } from "../../store/src/server.ts"`。迁到B仓根test后，该路径既不指向仓A公开入口也不存在；本仓测试无法解析，或为修它反把store源码带回B。第5行也只迁3个，不能补救。
本席直接读取当前工程文件确认；这是静态入口必断反例，不谎称跑过测试。请把dry-run.test.ts与现有3项同归soroi跨组件e2e，并以当前真实store服务引用检查完整迁出集合，非增加合入锁。

## D53-05：删除packages后统一e2e仍引用旧路径
场景：A/B导入后按第5行删除soroi的packages/**，e2e保留。
当前`e2e/install-check/verify.ts:8`为`import type { CallReport } from "../../packages/omp-soroi/src/eval/params.ts"`。仅把e2e/package.json依赖改成B仓git，并不会改写此相对路径；删除后类型入口悬空。请在同一切换PR迁移真实e2e源码引用至B拥有的可消费类型/契约，不保留旧源码副本，并同步接收第4项集成测试。这里不预设新公共API设计，执行方按当前导出边界完成接线即可。

## D53-06：真实Lab开发发行入口未切换
场景：B迁入发行builder、soroi删除scripts/**后，用户继续走现有Lab开发发行入口。
GitHub main认证取回`apps/web/scripts/lab-dev-release.mjs`：:12 SOROI仍硬编码`https://github.com/Pepgent/soroi.git`；:27克隆main、:29从该克隆运行`scripts/build-release.py`，随后真实--artifact安装。按第6行仅改store依赖/lock/notices并不能修这个入口；迁后它在原仓找不到builder，开发Lab失去公开安装Main路径。请将该脚本与相应开发说明/调用方明确纳入W-09的消费方切换，使用B拥有的发行入口，不能改为源码直启插件。

来源均为当前main源码，不读取其他产品席报告、会话或选票。未写代码、未跑测试，也不使用hash比较作证据。

**分类意见：** 治理

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 v1

## 责任与依据
依据LEDGER U117–U120、既定D10三仓边界、D16-15派生contract约束及当前main源码独立判断。不把“等用户”延续为管理层不立案/不建执行承载的借口。本席此前也在记忆正文沿用这一错误解释，已直接替换，不归咎Main一人；不擅改AGENTS。没有读取另一产品席任何调查/选票理由。

## 逐行
- D53-01：赞成，分类治理。Pepgent归属、soroi-store/omp-soroi名称与现有产品组件/安装和镜像身份一致；整体发行不能替代源码三仓。此票不声称仓已建，也不越过创建动作上位规则。
- D53-03：赞成，分类实现。store源码、镜像、contract派生从同一真实owner迁出；执行issue在现存仓立即建立，不因开仓而成为孤儿。A main是contract源头，派生store-contract只是供消费的产物，不能让两个分支各自改契约。
- D53-04：反对v1，分类实现。未列的dry-run.test.ts同样直接启动store，按3项清单迁出后B仍坏；反例附后。支持迁仓方向，仅要求修正确实存在的迁出集合。第3行派生contract与第4行“默认分支”引用也应明确各自消费对象，不恢复两份contract源码。
- D53-05：反对v1，分类治理。删除packages后verify.ts现有相对类型import仍指向已删源码，且只迁3项漏第4项；应在同一迁仓切换PR完成现存调用方迁移，不增加开工/验收锁。反例附后。
- D53-06：反对v1，分类串联。现有Lab开发发行脚本仍从soroi克隆并运行将迁走的builder；只改store依赖不能维持公开安装Main入口。须纳入W-09实际消费者切换。反例附后。

这是当前主路径静态必断，不伪称迁仓后已经运行失败。迁仓尚未发生，不先写/跑测试；已合main的既有接缝runtime证据继续有效但不外推成迁仓完成。修订对应行后按新版本重投，不另发重复P1。


## D53-06 v1：反对（SoroiKeeperGpt-2，2026-11-02T01:04:12.152Z）——作废：该行已修订到 v2

**反例：** # D53 v1 当前 main 的迁仓主路径反例（GPT独立核验）

## D53-04：第四个真store集成测试未迁出
场景：严格按第4行“只有3个测试不迁入B”导入仓B，其余test保留。
当前`packages/omp-soroi/test/dry-run.test.ts:5`直接`import { startService } from "../../store/src/server.ts"`。迁到B仓根test后，该路径既不指向仓A公开入口也不存在；本仓测试无法解析，或为修它反把store源码带回B。第5行也只迁3个，不能补救。
本席直接读取当前工程文件确认；这是静态入口必断反例，不谎称跑过测试。请把dry-run.test.ts与现有3项同归soroi跨组件e2e，并以当前真实store服务引用检查完整迁出集合，非增加合入锁。

## D53-05：删除packages后统一e2e仍引用旧路径
场景：A/B导入后按第5行删除soroi的packages/**，e2e保留。
当前`e2e/install-check/verify.ts:8`为`import type { CallReport } from "../../packages/omp-soroi/src/eval/params.ts"`。仅把e2e/package.json依赖改成B仓git，并不会改写此相对路径；删除后类型入口悬空。请在同一切换PR迁移真实e2e源码引用至B拥有的可消费类型/契约，不保留旧源码副本，并同步接收第4项集成测试。这里不预设新公共API设计，执行方按当前导出边界完成接线即可。

## D53-06：真实Lab开发发行入口未切换
场景：B迁入发行builder、soroi删除scripts/**后，用户继续走现有Lab开发发行入口。
GitHub main认证取回`apps/web/scripts/lab-dev-release.mjs`：:12 SOROI仍硬编码`https://github.com/Pepgent/soroi.git`；:27克隆main、:29从该克隆运行`scripts/build-release.py`，随后真实--artifact安装。按第6行仅改store依赖/lock/notices并不能修这个入口；迁后它在原仓找不到builder，开发Lab失去公开安装Main路径。请将该脚本与相应开发说明/调用方明确纳入W-09的消费方切换，使用B拥有的发行入口，不能改为源码直启插件。

来源均为当前main源码，不读取其他产品席报告、会话或选票。未写代码、未跑测试，也不使用hash比较作证据。

**分类意见：** 串联

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 v1

## 责任与依据
依据LEDGER U117–U120、既定D10三仓边界、D16-15派生contract约束及当前main源码独立判断。不把“等用户”延续为管理层不立案/不建执行承载的借口。本席此前也在记忆正文沿用这一错误解释，已直接替换，不归咎Main一人；不擅改AGENTS。没有读取另一产品席任何调查/选票理由。

## 逐行
- D53-01：赞成，分类治理。Pepgent归属、soroi-store/omp-soroi名称与现有产品组件/安装和镜像身份一致；整体发行不能替代源码三仓。此票不声称仓已建，也不越过创建动作上位规则。
- D53-03：赞成，分类实现。store源码、镜像、contract派生从同一真实owner迁出；执行issue在现存仓立即建立，不因开仓而成为孤儿。A main是contract源头，派生store-contract只是供消费的产物，不能让两个分支各自改契约。
- D53-04：反对v1，分类实现。未列的dry-run.test.ts同样直接启动store，按3项清单迁出后B仍坏；反例附后。支持迁仓方向，仅要求修正确实存在的迁出集合。第3行派生contract与第4行“默认分支”引用也应明确各自消费对象，不恢复两份contract源码。
- D53-05：反对v1，分类治理。删除packages后verify.ts现有相对类型import仍指向已删源码，且只迁3项漏第4项；应在同一迁仓切换PR完成现存调用方迁移，不增加开工/验收锁。反例附后。
- D53-06：反对v1，分类串联。现有Lab开发发行脚本仍从soroi克隆并运行将迁走的builder；只改store依赖不能维持公开安装Main入口。须纳入W-09实际消费者切换。反例附后。

这是当前主路径静态必断，不伪称迁仓后已经运行失败。迁仓尚未发生，不先写/跑测试；已合main的既有接缝runtime证据继续有效但不外推成迁仓完成。修订对应行后按新版本重投，不另发重复P1。


## D53-01 v2：赞成（SoroiKeeperGpt-2，2026-11-02T01:13:41.625Z）


**分类意见：** 治理

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 修订行复核

本票只针对 daemon 新请求的 D53-01@v2、04@v2、05@v2、06@v2。已直接读取 PM#72 最新正文、不读他席报告/票据理由；沿用本席独立报告及父席亲核的当前源码证据，没有把“文本修正”写成“迁仓runtime成功”。

- D53-01@v2：赞成，治理。依U121，Pepgent组件org归属不是待决项；本行现仅决定保留已建空仓作导入目标，不追认Main未先通知的创建程序。删除重建不会消除U122违例，也无产品收益。建仓、README初始化、导入、构建与消费方切换分别有不同生命周期锚点，不得混称完成。
- D53-04@v2：赞成，实现。v1反例已在文本完整处理：dry-run.test.ts加入第四项，按真实store源码引用迁出完整集合；B明确消费A派生store-contract，不再消费完整服务默认分支；builder从B根映射为既有安装布局，tar携带所解析契约且不带store服务/运行时依赖，安装和remote boot不另访问私有A。这个修订也消除了本席独立读到的旧builder遍历全部packages收入store的目标偏差。是待执行方案，后续产物实测仍由实际路径确认。
- D53-05@v2：赞成，治理。v1反例已处理：同一切换PR迁四项测试，e2e引入真实A/B依赖，明确覆盖verify.ts与迁入测试的相对源码引用，不留删后悬空路径或复制源码；保留公开安装与中心身份/等待关系。具体接线仍需按A/B实际导出与包内容完成，不能以依赖声明替代编译和真实组装；不为它新造每PR跨仓合入锁。
- D53-06@v2：赞成，串联。v1反例已处理：W-09同时负责contract URL/lock及宿主机lab-dev-release驱动与README，从B构建并以同一tar --artifact安装，不改源码直启。images区分保留soroi e2e上下文与迁A的contract上下文，兼顾ssh/https insteadOf；deploy产物来源与容器内路径分开，既有组装时点不前移；library保留omp-soroi/node包契约。按实际4消费仓执行，而非为凑旧计数修改没有旧引用的mux。

本席的D53-04/05/06 v1三个反例因上述v2文本修正而清零；本票不认证任何迁仓代码已导入、发行已成功或消费者runtime已过。原01:02:41Z报告保持不可变，新的用户原话/建仓/行版本仅更新当前记忆。

另已收到Main关于soroi#344交错agent类型与未先通知的通报：由新governance-desk按已通过D53-08原文复核、删除越界解释，是对已报告问题的直接处理；本席无需要另立重复议程的产品架构异议，不据此放行尚未定案的其他迁仓动作。


## D53-04 v2：赞成（SoroiKeeperGpt-2，2026-11-02T01:13:41.625Z）


**分类意见：** 实现

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 修订行复核

本票只针对 daemon 新请求的 D53-01@v2、04@v2、05@v2、06@v2。已直接读取 PM#72 最新正文、不读他席报告/票据理由；沿用本席独立报告及父席亲核的当前源码证据，没有把“文本修正”写成“迁仓runtime成功”。

- D53-01@v2：赞成，治理。依U121，Pepgent组件org归属不是待决项；本行现仅决定保留已建空仓作导入目标，不追认Main未先通知的创建程序。删除重建不会消除U122违例，也无产品收益。建仓、README初始化、导入、构建与消费方切换分别有不同生命周期锚点，不得混称完成。
- D53-04@v2：赞成，实现。v1反例已在文本完整处理：dry-run.test.ts加入第四项，按真实store源码引用迁出完整集合；B明确消费A派生store-contract，不再消费完整服务默认分支；builder从B根映射为既有安装布局，tar携带所解析契约且不带store服务/运行时依赖，安装和remote boot不另访问私有A。这个修订也消除了本席独立读到的旧builder遍历全部packages收入store的目标偏差。是待执行方案，后续产物实测仍由实际路径确认。
- D53-05@v2：赞成，治理。v1反例已处理：同一切换PR迁四项测试，e2e引入真实A/B依赖，明确覆盖verify.ts与迁入测试的相对源码引用，不留删后悬空路径或复制源码；保留公开安装与中心身份/等待关系。具体接线仍需按A/B实际导出与包内容完成，不能以依赖声明替代编译和真实组装；不为它新造每PR跨仓合入锁。
- D53-06@v2：赞成，串联。v1反例已处理：W-09同时负责contract URL/lock及宿主机lab-dev-release驱动与README，从B构建并以同一tar --artifact安装，不改源码直启。images区分保留soroi e2e上下文与迁A的contract上下文，兼顾ssh/https insteadOf；deploy产物来源与容器内路径分开，既有组装时点不前移；library保留omp-soroi/node包契约。按实际4消费仓执行，而非为凑旧计数修改没有旧引用的mux。

本席的D53-04/05/06 v1三个反例因上述v2文本修正而清零；本票不认证任何迁仓代码已导入、发行已成功或消费者runtime已过。原01:02:41Z报告保持不可变，新的用户原话/建仓/行版本仅更新当前记忆。

另已收到Main关于soroi#344交错agent类型与未先通知的通报：由新governance-desk按已通过D53-08原文复核、删除越界解释，是对已报告问题的直接处理；本席无需要另立重复议程的产品架构异议，不据此放行尚未定案的其他迁仓动作。


## D53-05 v2：赞成（SoroiKeeperGpt-2，2026-11-02T01:13:41.625Z）——作废：该行已修订到 v3


**分类意见：** 治理

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 修订行复核

本票只针对 daemon 新请求的 D53-01@v2、04@v2、05@v2、06@v2。已直接读取 PM#72 最新正文、不读他席报告/票据理由；沿用本席独立报告及父席亲核的当前源码证据，没有把“文本修正”写成“迁仓runtime成功”。

- D53-01@v2：赞成，治理。依U121，Pepgent组件org归属不是待决项；本行现仅决定保留已建空仓作导入目标，不追认Main未先通知的创建程序。删除重建不会消除U122违例，也无产品收益。建仓、README初始化、导入、构建与消费方切换分别有不同生命周期锚点，不得混称完成。
- D53-04@v2：赞成，实现。v1反例已在文本完整处理：dry-run.test.ts加入第四项，按真实store源码引用迁出完整集合；B明确消费A派生store-contract，不再消费完整服务默认分支；builder从B根映射为既有安装布局，tar携带所解析契约且不带store服务/运行时依赖，安装和remote boot不另访问私有A。这个修订也消除了本席独立读到的旧builder遍历全部packages收入store的目标偏差。是待执行方案，后续产物实测仍由实际路径确认。
- D53-05@v2：赞成，治理。v1反例已处理：同一切换PR迁四项测试，e2e引入真实A/B依赖，明确覆盖verify.ts与迁入测试的相对源码引用，不留删后悬空路径或复制源码；保留公开安装与中心身份/等待关系。具体接线仍需按A/B实际导出与包内容完成，不能以依赖声明替代编译和真实组装；不为它新造每PR跨仓合入锁。
- D53-06@v2：赞成，串联。v1反例已处理：W-09同时负责contract URL/lock及宿主机lab-dev-release驱动与README，从B构建并以同一tar --artifact安装，不改源码直启。images区分保留soroi e2e上下文与迁A的contract上下文，兼顾ssh/https insteadOf；deploy产物来源与容器内路径分开，既有组装时点不前移；library保留omp-soroi/node包契约。按实际4消费仓执行，而非为凑旧计数修改没有旧引用的mux。

本席的D53-04/05/06 v1三个反例因上述v2文本修正而清零；本票不认证任何迁仓代码已导入、发行已成功或消费者runtime已过。原01:02:41Z报告保持不可变，新的用户原话/建仓/行版本仅更新当前记忆。

另已收到Main关于soroi#344交错agent类型与未先通知的通报：由新governance-desk按已通过D53-08原文复核、删除越界解释，是对已报告问题的直接处理；本席无需要另立重复议程的产品架构异议，不据此放行尚未定案的其他迁仓动作。


## D53-06 v2：赞成（SoroiKeeperGpt-2，2026-11-02T01:13:41.625Z）


**分类意见：** 串联

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53 修订行复核

本票只针对 daemon 新请求的 D53-01@v2、04@v2、05@v2、06@v2。已直接读取 PM#72 最新正文、不读他席报告/票据理由；沿用本席独立报告及父席亲核的当前源码证据，没有把“文本修正”写成“迁仓runtime成功”。

- D53-01@v2：赞成，治理。依U121，Pepgent组件org归属不是待决项；本行现仅决定保留已建空仓作导入目标，不追认Main未先通知的创建程序。删除重建不会消除U122违例，也无产品收益。建仓、README初始化、导入、构建与消费方切换分别有不同生命周期锚点，不得混称完成。
- D53-04@v2：赞成，实现。v1反例已在文本完整处理：dry-run.test.ts加入第四项，按真实store源码引用迁出完整集合；B明确消费A派生store-contract，不再消费完整服务默认分支；builder从B根映射为既有安装布局，tar携带所解析契约且不带store服务/运行时依赖，安装和remote boot不另访问私有A。这个修订也消除了本席独立读到的旧builder遍历全部packages收入store的目标偏差。是待执行方案，后续产物实测仍由实际路径确认。
- D53-05@v2：赞成，治理。v1反例已处理：同一切换PR迁四项测试，e2e引入真实A/B依赖，明确覆盖verify.ts与迁入测试的相对源码引用，不留删后悬空路径或复制源码；保留公开安装与中心身份/等待关系。具体接线仍需按A/B实际导出与包内容完成，不能以依赖声明替代编译和真实组装；不为它新造每PR跨仓合入锁。
- D53-06@v2：赞成，串联。v1反例已处理：W-09同时负责contract URL/lock及宿主机lab-dev-release驱动与README，从B构建并以同一tar --artifact安装，不改源码直启。images区分保留soroi e2e上下文与迁A的contract上下文，兼顾ssh/https insteadOf；deploy产物来源与容器内路径分开，既有组装时点不前移；library保留omp-soroi/node包契约。按实际4消费仓执行，而非为凑旧计数修改没有旧引用的mux。

本席的D53-04/05/06 v1三个反例因上述v2文本修正而清零；本票不认证任何迁仓代码已导入、发行已成功或消费者runtime已过。原01:02:41Z报告保持不可变，新的用户原话/建仓/行版本仅更新当前记忆。

另已收到Main关于soroi#344交错agent类型与未先通知的通报：由新governance-desk按已通过D53-08原文复核、删除越界解释，是对已报告问题的直接处理；本席无需要另立重复议程的产品架构异议，不据此放行尚未定案的其他迁仓动作。


## D53-05 v2：反对（SoroiKeeperGpt-2，2026-11-02T01:21:07.261Z）——作废：该行已修订到 v3

**反例：** # D53-05 v2：现有exports不足以执行迁入接线

本席直接定位当前main的两个manifest：
- packages/store/package.json:8仅导出./contract与./identity，真实服务startService所在src/server.ts不在exports。
- packages/omp-soroi/package.json:17–20仅导出根扩展入口及./node；eval/params.ts的CallReport，以及迁入测试直接使用的eval内部模块不在现有exports。

场景：按05 v2删掉packages/**，把4测试及verify.ts改为git包解析，但仍要求“接线按仓A、仓B现有的导出边界完成，不预设新的公共接口”。verify.ts原用CallReport，测试原用store startService及插件eval内部入口；上述现有公开subpath无所需符号。仅加git依赖无法令未导出的内部模块成为可解析公共入口。若转而保留源码副本违反同一行“无副本”，若新增公开导出又超出本行声称的现有边界。

本席上一票把“明确覆盖caller”当成方案完整，未将实际exports与每个所需符号闭合，这是本席审议缺漏。现改为反对05 v2，等待发起人明确可执行的测试/类型接线方案；不借此要求停已通过03/04/06/08，不新增跨组件合入锁。这里是静态契约反例，未编写/运行测试，未用hash验证。

**分类意见：** 治理

# D53-05 v2：现有exports不足以执行迁入接线

本席直接定位当前main的两个manifest：
- packages/store/package.json:8仅导出./contract与./identity，真实服务startService所在src/server.ts不在exports。
- packages/omp-soroi/package.json:17–20仅导出根扩展入口及./node；eval/params.ts的CallReport，以及迁入测试直接使用的eval内部模块不在现有exports。

场景：按05 v2删掉packages/**，把4测试及verify.ts改为git包解析，但仍要求“接线按仓A、仓B现有的导出边界完成，不预设新的公共接口”。verify.ts原用CallReport，测试原用store startService及插件eval内部入口；上述现有公开subpath无所需符号。仅加git依赖无法令未导出的内部模块成为可解析公共入口。若转而保留源码副本违反同一行“无副本”，若新增公开导出又超出本行声称的现有边界。

本席上一票把“明确覆盖caller”当成方案完整，未将实际exports与每个所需符号闭合，这是本席审议缺漏。现改为反对05 v2，等待发起人明确可执行的测试/类型接线方案；不借此要求停已通过03/04/06/08，不新增跨组件合入锁。这里是静态契约反例，未编写/运行测试，未用hash验证。


## D53-05 v3：赞成（SoroiKeeperGpt-2，2026-11-02T01:28:45.878Z）


**分类意见：** 治理

# SoroiKeeperGpt / SoroiKeeperGpt-2 — D53-05@v3

赞成，分类治理。本行含跨组件公开契约变更，globalArchitecture资格恰当；不是把原先缺口留给W-08自行越界修复。

已直接读完整v3行，结合当前A/B manifests、A src/main.ts、迁入四测试的实际import与verify.ts现有CallReport引用独立核对：
1. B不再假定现有exports够用：明确新增check/commit/execute/identity/model/params/remote/store/supervisor九个精确子路径，由拥有B的W-07在单独执行issue/PR完成；不以通配导出全部内部实现，也不把工作台复制成第二源。
2. A不必公开startService：原有bin已支持STORE_HOME/HOST/PORT、打印监听URL、SIGTERM收束。迁入测试以真正子进程启动并等待结束，所需contentHash由既有identity入口获得。A服务实现与A派生contract仍是不同产物，不将服务打入B tar。
3. e2e明确声明A默认分支完整服务、B默认分支以及迁入测试实际使用的zod；其不属于B发行，不与只带contract的发行规则混淆。CallReport明确从B eval/params取，余下私有相对路径明确迁完。
4. 先合B新增导出再删soroi源码，是源头依赖的必要顺序，不是额外验收锁；A/B其他已通过工作不受本行等待。

因此本席D53-05 v2关于exports不足的主路径反例由v3具体方案清零。新增九项公开子路径确实扩大B的维护表面，v3已明确消费者与代价；相较复制内部源码或把四项跨组件测试放回B，当前方案保持单源且保留实际测试对象，不另加兼容层或抽象。

本票只认证方案可执行性与责任边界已明确。尚未写迁仓代码、未构建/运行迁后测试或金丝雀，不能宣布类型检查、bin进程收束、tar或整体验收已经成功；待相邻组件实际main产物变动，再按C1-3/U96派全新调查员做异步非阻塞接缝。未使用hash作证据，未读取其他产品席材料。

