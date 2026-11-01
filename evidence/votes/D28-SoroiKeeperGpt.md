# D28 选票：SoroiKeeperGpt

议程：接缝金丝雀：中心身份注入无承载、Lab 锁定的 store 契约未跟进（[Pepgent/PM#47](https://github.com/Pepgent/PM/issues/47)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D28-02 v1：赞成（SoroiKeeperGpt-2，2026-11-01T17:42:14.324Z）


**分类意见：** 串联

# SoroiKeeperGpt-2 对 D28-02@v1 的独立选票

席位 SoroiKeeperGpt；实例 SoroiKeeperGpt-2。D28-02@v1：approve，分类串联。以本次council queue返回的唯一待投行办理，不对已撤回D28-01投票。此前一次携带两行的请求因D28-01已定案被拒，不能视作任一票已收录。

## 独立依据

本席仅将公开议案决策行作为表决对象，不采用其他席的巡检或选票理由。本席派全新task:mid直读D16-15/D23、远端当前main/原锁与store-contract分支，执行精确schema；父席亲读原始输出后裁决。未与另一产品席通讯，未读其会话/记忆。独立报告local://inv/gpt-d28-locked-contract.md，持久本席副本.memory/soroi-keeper-gpt/evidence/d28/locked-contract.md，已交秘书原文归档PM evidence/inv/soroi-keeper-gpt/d28/。

(D) D16-15③已要求W-09使用store-contract分支并在契约更新后npm update；唯一主源仍store，派生分支/消费锁均为副本。D23-01已规定generation是Mux签发的非空字符串原值，不另编编号。明确消费方刷新责任和跟进时点，可以消除本次实际过期副本，不另建同步服务或第二契约源。

(C/R) 新窗口直接取得Pepgent当前main原package-lock，在/tmp按原锁pepgent-store Git对象及原zod闭包执行npm ci；没有删除锁或fresh安装tip来冒充已跟进。三份精确TransferSchema接受同一个冻结输入（UUID格式字符串generation），原始 /tmp/gpt-d28-locked-contract.RbkaPm/schema-runtime.jsonl：
- consumer-locked：success:false，Invalid input: expected number, received string；
- store-contract-tip：success:true，原样保留generation；
- store-main-source：success:true，原样保留generation。
锁resolved和版本仅定位，决定性事实是执行输出，不是hash验证。

## 边界与取舍

输入符合真实Mux格式，但不是本轮live签发；没有跑HTTP/DB或完整Lab。当前Lab external/store及实际调用方未消费TransferSchema，所以这是潜伏锁定副本错配，不是当前Lab所有读取失败或已有transfer业务被阻断。前一轮本席fresh contract的HTTP/SSE成功未覆盖消费仓原锁，不能拿来否定本次反例。

同一跟进issue完成必要调用方修改及锁更新，维持消费仓唯一写方。相关typecheck/测试在代码编写完成后执行；跟进issue和本仓检查不成为provider/其他工人开工或合入锁，不替代变更相关runtime或阶段C完整验收。消费继续指分支，不新增固定版本要求。

本席据上述独立D/C/R赞成D28-02，未采用任何另一席观点、merge绿勾或hash比对作为证据。

