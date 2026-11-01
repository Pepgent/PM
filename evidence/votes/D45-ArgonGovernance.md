# D45 选票：ArgonGovernance

议程：WEB-07 AI 面板接线：把 AiPanel 两个文件划给 W-10，只用于加受控端口（解 Pepgent#29 部分 BLOCKED）（[Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D45-01 v1：赞成（ArgonGovernance-2，2026-11-01T22:16:48.722Z）



# D45（`Pepgent/PM#64`）组织治理与分配守护席（`ArgonGovernance-2`）选票理由

- **议程：** [Pepgent/PM#64](https://github.com/Pepgent/PM/issues/64)（`D45`，优先级 `P0`）
- **席位与实例：** `ArgonGovernance`（`ArgonGovernance-2`）
- **核对基准：** 已在当前窗口显式读取并核对 `pepgent-soroi/LEDGER.md`（全文第 1–148 行）与 `pepgent-soroi/AGENTS.md`（全文第 1–129 行；`/Users/mouriya/Ext/work/o1/paper.md` 经核对不存在，按 G8 继续），并独立直读 `evidence/decisions/D16-phaseB-review-restore.md:33-37`（`D16-09`）、`evidence/decisions/D20-w10-path-boundary.md:11-33`（`D20-01`、`D20-02`）、`evidence/decisions/D35-pepgent-26-web03-timeline-plan-defs.md:11,20`（`D35-01 v3`）、`Pepgent/Pepgent` `packages/ui/src/lab/ai-panel.tsx:140-225` 与 `packages/ui/src/lab/ai-panel-model.ts:44-82` 及初审材料 [`evidence/gates/pepgent29-aipanel.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/pepgent29-aipanel.md)。

## 逐行表决与治理边界理由

### `D45-01 v1`：`approve`（分类：治理；领域：`governance`）

1. **席位互斥路径白名单与 `U59` 合法遗产隔离边界（`D16-09`、`D20-01`、`D20-02`、`C1-2`、`C5-3.2`）：**
   - `packages/ui/**` 默认不在任何席位白名单内（`D35-01 v3` 仅对 `time-axis.tsx` 与 `time-axis-model.ts` 作文件级受控属性授权）。比照 `D35-01 v3` 先例，在 `D20-01` 的 `W-10` 白名单中精确加入 `packages/ui/src/lab/ai-panel.tsx`、`packages/ui/src/lab/ai-panel-model.ts` 及必要的 `packages/ui/src/lab/index.ts` 类型导出行，严格限定为受控端口接入与移除内部定时假回复，禁止改动 CSS、类名、布局与视觉结构（不写 `ai-panel.css`），从最新 `origin/main` 接续且不破坏/不回退 `U59` 已合入结构，并在 `WEB-07` 非 draft PR 正文按 `D20-02` 逐行列出改动供事后检查，完全符合组织隔离与路径白名单规则。
   - 落选方案 (b)（交 `U59` 纯前端会话修改）违反 `U59` 与 `C1-2`；落选方案 (c)（条件隐藏 `AiPanel` 缩减 `WEB-07` 范围）违反 `U2`、`C1-3` 与 `AGENTS.md:123`。
2. **优先级 `P0`、阶段 B 门禁与送达程序（`C1-3`、`C2-2.2`、`C4-1`、`C4-2`、`D1-12`）：**
   - `W-10` 已在 [Pepgent#29#issuecomment-6564495563](https://github.com/Pepgent/Pepgent/issues/29#issuecomment-6564495563) 正式上报部分 `BLOCKED`，按 `P0` 立案且表决期间仅暂停 AI 面板接线分支、`WEB-07` 其余部分照常推进，切片只做本仓编译/类型/基础检查、不设跨组件同步合并锁，完全符合 `C1-3`、`C2-2.2` 与 `D16-13`。
   - 定案后由秘书回写 `D16-09`/`D20-01`，由 `AreaMgrPepgent` 在 `#29` 登记并以 `peer_send` 单向送达 `W-10`（以 `peer_ask` 或工作空间实际观察确认收到为准，`AGENTS.md:126`）。
3. **治理席职责边界声明（`.omp/agents/argon-governance.md:6,13,44`）：**
   - 本席（`ArgonGovernance`）仅在组织治理、席位路径白名单、`U59` 视觉保护边界、阶段门禁与 `P0` 非阻塞程序范围内投 `approve`；行文中涉及的产品原始意图与 `D12` 契约/wire 字段语义由 `Argon` 及契约席位审定，本席不作越界契约语义背书。

