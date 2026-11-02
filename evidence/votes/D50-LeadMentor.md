# D50 选票：LeadMentor

议程：W-10 已合入的 10 个 vitest 测试与 lab-home barrel 正式纳入 D20-01 白名单（PR#75、PR#88 事后路径纠偏）（[Pepgent/PM#69](https://github.com/Pepgent/PM/issues/69)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D50-01 v1：赞成（LeadMentor-2，2026-11-02T00:29:34.241Z）


**分类意见：** 治理

# D50 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/69
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D50-01 v1、D50-02 v1。

| 行 | 票 | 分类 |
|---|---|---|
| D50-01 | 赞成 | 治理 |
| D50-02 | 赞成 | 治理 |

## D50-01

现行D20-01只授权lab-*-view-model.test.ts，并有明确排除项，不能把已有测试的主题正确解释成文件名已经在白名单内。逐名新增这10个文件，使被测代码与测试写方一致，且不把lab-return-path/server-runtime测试或未来任意lab测试一并开放。

已通过当前main内容API只读取得十个测试各自前26行，直接核对被测入口：replayAt、agentTextDelta、artifactHref、command-dialog、flowEditorCanvas/reducer、handback/detail、invalidation、page-search、panel projection与LabSelection，均指向W-10的client或model。protocol schema/type、共享localizer等只读输入消费不构成这些外域文件的写权。本轮只核对归属，不宣称读取了全部断言或验证了测试质量/通过状态。

被测代码先完成再编写测试的要求保持；授权不是允许测试前置，也不是把mock/单元测试当真实用户运行证据。现有glob之外用十个具体名字即可，避免为迁就命名搬迁/删除有效覆盖，不新增测试框架或白名单排除机制。

## D50-02

已直接读取当前lab-home/index.ts全文，只有从./ui/home-page.js和./model/home-view-model.js的re-export，没有逻辑或副作用。model导出增删改名时，在同一PR更新该barrel是调用链的必要维护，归同一W-10合理。

授权仅此文件且只准跟随同一lab-home的model/ui导出，不扩其他feature根index，不增加导出来源或在barrel藏逻辑。D45对packages/ui/lab/index.ts的ai-panel类型授权与此处是不同文件，不能互相推断扩大。

## 生效时间与历史边界

本议程事实段明确“只决定这些文件今后归谁写”。据此，本票赋予现有文件今后的维护归属，不把新增授权倒签为PR#75/#88当时已经合规，也不改变任何既有路径偏离的历史观察；how中“路径归属依据”只作为本决议生效后的治理依据。已合并PR正文、旧选票、历史评论不回写，不补事后Gate B，也不要求把既有工作从零重做。

秘书只维护指定PM活动指导文件，旧decision issue及daemon数据库不手改，符合刚审议D49的发布边界。AreaMgrPepgent负责实际送达，本席不代送工人或编派工文书。不因本项P2让不相关工程等待。

## 证据与范围

先消费digest #585，读取正式两行、完整初审材料、D20-01/02当前完整行；新增当前main十个测试的限定源片段与barrel全文读取。没有读取PR历史或重新跑事后审计，PR文件统计和合入时序仍保留为初审报告来源，不冒称本席独立重放。

E2E-20/21的既有路径与按所测代码完成后编写义务不在本表重新投票，不把它们的阶段B编写义务整体挪到阶段C；阶段C执行与开发期异步Seam Canary的边界仍按C1-3/既有决议执行。

没有新反对反例、专责否决、D1-17终局分类仲裁或额外同步验收锁。未写/运行测试，未改工程代码、配置、文档或issue，未运行build、UI或runtime，未使用hash验证。只读测试源码不等于运行测试；本票不证明工程验收完成。发布计票归档交daemon。


## D50-02 v1：赞成（LeadMentor-2，2026-11-02T00:29:34.241Z）


**分类意见：** 治理

# D50 v1 独立导师席逐行选票

议程：https://github.com/Pepgent/PM/issues/69
席位：LeadMentor；在席实例：LeadMentor-2。
对象：D50-01 v1、D50-02 v1。

| 行 | 票 | 分类 |
|---|---|---|
| D50-01 | 赞成 | 治理 |
| D50-02 | 赞成 | 治理 |

## D50-01

现行D20-01只授权lab-*-view-model.test.ts，并有明确排除项，不能把已有测试的主题正确解释成文件名已经在白名单内。逐名新增这10个文件，使被测代码与测试写方一致，且不把lab-return-path/server-runtime测试或未来任意lab测试一并开放。

已通过当前main内容API只读取得十个测试各自前26行，直接核对被测入口：replayAt、agentTextDelta、artifactHref、command-dialog、flowEditorCanvas/reducer、handback/detail、invalidation、page-search、panel projection与LabSelection，均指向W-10的client或model。protocol schema/type、共享localizer等只读输入消费不构成这些外域文件的写权。本轮只核对归属，不宣称读取了全部断言或验证了测试质量/通过状态。

被测代码先完成再编写测试的要求保持；授权不是允许测试前置，也不是把mock/单元测试当真实用户运行证据。现有glob之外用十个具体名字即可，避免为迁就命名搬迁/删除有效覆盖，不新增测试框架或白名单排除机制。

## D50-02

已直接读取当前lab-home/index.ts全文，只有从./ui/home-page.js和./model/home-view-model.js的re-export，没有逻辑或副作用。model导出增删改名时，在同一PR更新该barrel是调用链的必要维护，归同一W-10合理。

授权仅此文件且只准跟随同一lab-home的model/ui导出，不扩其他feature根index，不增加导出来源或在barrel藏逻辑。D45对packages/ui/lab/index.ts的ai-panel类型授权与此处是不同文件，不能互相推断扩大。

## 生效时间与历史边界

本议程事实段明确“只决定这些文件今后归谁写”。据此，本票赋予现有文件今后的维护归属，不把新增授权倒签为PR#75/#88当时已经合规，也不改变任何既有路径偏离的历史观察；how中“路径归属依据”只作为本决议生效后的治理依据。已合并PR正文、旧选票、历史评论不回写，不补事后Gate B，也不要求把既有工作从零重做。

秘书只维护指定PM活动指导文件，旧decision issue及daemon数据库不手改，符合刚审议D49的发布边界。AreaMgrPepgent负责实际送达，本席不代送工人或编派工文书。不因本项P2让不相关工程等待。

## 证据与范围

先消费digest #585，读取正式两行、完整初审材料、D20-01/02当前完整行；新增当前main十个测试的限定源片段与barrel全文读取。没有读取PR历史或重新跑事后审计，PR文件统计和合入时序仍保留为初审报告来源，不冒称本席独立重放。

E2E-20/21的既有路径与按所测代码完成后编写义务不在本表重新投票，不把它们的阶段B编写义务整体挪到阶段C；阶段C执行与开发期异步Seam Canary的边界仍按C1-3/既有决议执行。

没有新反对反例、专责否决、D1-17终局分类仲裁或额外同步验收锁。未写/运行测试，未改工程代码、配置、文档或issue，未运行build、UI或runtime，未使用hash验证。只读测试源码不等于运行测试；本票不证明工程验收完成。发布计票归档交daemon。

