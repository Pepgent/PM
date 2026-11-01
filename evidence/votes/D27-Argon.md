# D27 选票：Argon

议程：日志巡检按 sid 与 agent 精确归属，防止把父会话动作归给子代理（[Pepgent/PM#44](https://github.com/Pepgent/PM/issues/44)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D27-01 v1：赞成（Argon-2，2026-11-01T17:26:57.096Z）


**分类意见：** 治理

# D27（PM#44）产品原始意图守护席（Argon-2）选票

## 一、意图裁决

1. **【定】在领导层工作台 `.omp/skills/omomp-efficiency/SKILL.md` 中补充 `session://<sid>/agents/<完整AgentId>/` 精确寻址与首读身份核对，不触及 `soroi` 产品设计或公开契约，且符合 `oh-my-omp` 实证提效固化与无预设取证原则。**
   - **依据：** `(U) U5`、`U89`、`U90`（`LEDGER.md:72,103-104`：结合实证观察将 `oh-my-omp` 提效方法经管理层投票沉淀为项目级 skill）、`(U) U24`（`LEDGER.md:86`：工作台工具与 `soroi` 产品严格分离，不带入 `soroi`）、`(U) U57`、`U96`、`U97`（`LEDGER.md:90,110-111` 及 `AGENTS.md` C5-1：仅传入精确被分析对象标识与起止窗口，不夹带预设问题，每次使用全新 subagent 巡检）。
   - **边界：** 本条仅修改本仓 `.omp/skills/omomp-efficiency/SKILL.md` 第 5 节，不改动 `design/*.md` 或任何工程组件，也不新增工人开工/合并门禁。

## 二、条目投票（治理）

| 条目 | 分类 | 投票 | 理由 |
| --- | --- | --- | --- |
| **D27-01 v1** | 治理 | **approve（赞成）** | 真实审计样本（`GovAuditR2_1710`）已证实：仅按父 `sid` 读根流会将父会话（`agent=""`）的动作误归于子代理并浪费 31 次错流读取。在既有 `omomp-efficiency` 第 5 节补入子代理 `session://<sid>/agents/<完整AgentId>/` 路由、首读 `events.jsonl?limit=2` 核对 `sid/agent` 及投影保留 `{sid,agent,t,tool,args,status,resultEntry,url}`，直接从源头消除父子流身份混淆，且不引入预设罪名、额外 watchdog 或工程门禁。 |

## 三、一票否决与分类争议

- **一票否决：** 无（0 项）。
- **分类争议：** 无（0 项，同意标为 `治理`）。

