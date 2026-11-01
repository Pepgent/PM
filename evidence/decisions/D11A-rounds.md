# D11-A 起草、审查与计票记录

| 阶段 | 事件 | 处理 |
| --- | --- | --- |
| 取证 | 两名只读取证者（task:mid）逐条读取 LR-01..51 的评论原文、D2–D8 正文与各仓 main 代码，写成 D11-facts-A.md、D11-facts-B.md | 作为分流与条目的事实依据 |
| 追加 | leader 主会话追加：LR-49（LAB-04 BLOCKED）、LR-47（STO-05 BLOCKED）及所有涉及在开发切片的 LR 行组成一批，优先于拆仓出结论 | 本批范围按此确定 |
| 追加 | leader 主会话追加：E2E-12 上报 F12 File 根 atom 的设计冲突（soroi#220） | 单列为非 LR 来源的设计补充 D11-F12 |
| 审查 | discuss:steady、discuss:divergent 审查第 1 版 | 第 2 版吸收的意见与不采纳理由见决策表文末；主要修改：LR-21 移入 D11-B；LR-01、LR-42、LR-44 提前到本批；D11-47、D11-11、D11-13、D11-04、D11-29 拆票；D11-47C 改为每个事实一处携带；删去两处无 D8-16 依据的 D9 归类；D11-29B 改用 `conversation.owner` 判定；D11-04B 写明修正 D2-13 执行时点；补 D11-WB 回写条款；D11-F12 补 DSL 内建形式、值身份、name/media、dry run 字节去向 |
| 计票 | 三族对第 2 版 24 个投票项投票 | Claude 族 24/24 赞成；argon 24/24 赞成，无否决，无分类争议；导师 24/24 赞成，无反例 |
| 分类 | argon 核对 D11-F12：`design/eval.md:166` 无魔法值有 (U) 来源（会话 01a18ed5 #276d1776），:159“只允许数字、字符串、布尔”无排斥 File 的 (U) 来源，用户在 01a18ed5 #440c8605、01a18e8a #e0de24df 确定 `Atomic = number \| string \| boolean \| File`；同意“串联” | 导师亦给出仲裁意见：维持“串联” |
