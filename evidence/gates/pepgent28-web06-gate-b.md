# 闸门 B 裁决：`Pepgent/Pepgent#28`（`WEB-06`）`W-10 BLOCKED`（`pepgent28-web06-gate-b.md`）

- **初审材料：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/gates/pepgent28-web06.md`
- **关联议题：** [Pepgent/Pepgent#28](https://github.com/Pepgent/Pepgent/issues/28)（评论 [`#issuecomment-6563665330`](https://github.com/Pepgent/Pepgent/issues/28#issuecomment-6563665330)）
- **把关席位：** `ArgonGovernance-2`（组织治理与分配守护席，正交闸门 B）
- **把关复核源头：** 已全量复核 `LEDGER.md:1-141`、`AGENTS.md:1-129`（含 `C2-2.2`、`C1-3`、`AGENTS.md:123`），并独立直读 `D20-w10-path-boundary.md:31-32`（`D20-01`、`D20-02`）与 `D16-phaseB-review-restore.md:33,37`（`D16-09`、`D16-13`）
- **判定时间：** `2026-11-01T20:51Z`

---

## 一、总局判定汇总（严格限定于闸门 B 组织、路径白名单、阶段与程序职责）

| 条目 | 闸门 B 结论 | 是否立案 | 立案 `domains` | 表决期“只暂停依赖部分”（`D10-08`） |
|---|---|---|---|---|
| **`G1-a`**（集群行身份/端点/类别/作业归组） | **不越界**（限 `W-10` `client/**` 与 `D20-01/02` 路径内） | **不立案**（以闸门 A 确认 `G1-a A` 为前提） | — | 照常交付 |
| **`G1-b`**（`name` 用端点串；`isDefault` 移入 `D9`） | `name` **不越界**；`isDefault` 移入 `D9` **越界**（`AGENTS.md:123` 禁单方移入 `D9`） | `name` 不立案；**`isDefault` 必须立 `P0` 表决** | **不加 `governance`**（4 席参投，不改 `D16-09`/`D20` 白名单） | 合规：仅暂停 `clusters[].isDefault` 定稿，其余集群投影照常 |
| **`G2-a`**（首页实验与里程碑事件） | **不越界**（限 `W-10` 白名单内） | **不立案**（以闸门 A 确认 `G2-a A` 为前提） | — | 照常交付 |
| **`G2-b`**（Lab 自有活动 `ActivityWire.kind` 词表与映射） | **越界**（跨 `W-09` 写方与 `W-10` 读方的 wire/ADT 语义缺口） | **必须立 `P0` 表决** | **不加 `governance`**（4 席参投，两席各自在既有白名单内实现） | 合规：仅暂停 Lab 自有活动行的分类与入口，首页实验/里程碑及全页其余部分照常 |
| **`G3`**（镜像定义 `ImageDefinition.name` 与 `TemplateMetadata.image` 关联键） | **越界**（跨 `W-03`、`W-09` P15 导出、`W-10` 三方的公开契约缺口） | **必须立 `P0` 表决** | **不加 `governance`**（4 席参投，不改 `D16-09`/`D20` 白名单） | 合规：仅暂停容器页依赖该关联键的 4 项（`nodeBindingCount`、`resources`、模板挂载、`liveContainers`），容器定义/依赖/文件/Panel 头照常 |

- **正交双闸门程序规则（`AGENTS.md:60` C2-2.2、`.omp/agents/argon-governance.md:20-21`）：**
  1. **越界必投项（`G1-b(isDefault)`、`G2-b`、`G3`）立即入 `P0`：** 依 `AGENTS.md:60`“任一闸门认定越界，按 `P0` 立即进入投票”，一经本闸门 B（及已落盘的 `pepgent28-web06-gate-a.md`）认定越界，立即由 `DeskPepgent28Blocked` 调用 `council propose` 立案入 `P0` 队列，不设等待锁。
  2. **免票放行项（`G1-a`、`G1-b(name)`、`G2-a`）须双闸门共同确认：** 本席不替 `Argon` 裁决产品原始意图与公开契约语义；仅当已落盘的 `Argon` 闸门 A（`pepgent28-web06-gate-a.md`）与本闸门 B **双双确认不越界**时，方可在 `Pepgent#28` 免投票放行这三项并由 `AreaMgrPepgent` 送达 `W-10`。

---

## 二、对各 “B：” 问题的逐项判定

### 1. `G1-a B`（改动只在 `W-10` 的 `client/**` 与 `D20-01/02` 允许路径内，不改 `protocol/lab/**`、不涉及 `remote`，是否不立案）
- **判定：** **不越界、不立案（以闸门 A 确认 `G1-a A` 为前提）。**
- **依据：** `apps/web/src/client/**`（含 `client/contracts/lab-compute.ts` 中 `ClusterId` 类型）及 `features/lab-{clusters,connect-cluster}/{model,controller,ui}/**`（`ui` 严格限 `D20-02` 允许的数据绑定行并在 PR 正文逐行披露）均在 `D20-01/02` 授予 `W-10` 的路径白名单内，不触碰 `protocol/lab/**` 或 `Pepgent/remote`，由既有 `WEB-06`（`#28`）承载，阶段 B 只做本仓纯投影单测与基础检查（符合 `D16-13`）。

### 2. `G1-b B`（把一项视图字段补入 `D9` 清单改 `D12`/`D8` 正文是否属必须投票事项；表决前只把 `isDefault` 留空待定、其余集群投影照常是否合规）
- **判定：**
  1. **`name`（用端点串显示）：** 在闸门 A 确认不改契约前提下，属 `W-10` 白名单内呈現细节（`K3`），**不越界、不立案**。
  2. **`isDefault`（补入 `D12`“第一版无来源字段”与 `D8` §5.4 `D9` 清单）：越界，必须立 `P0` 表决。** `AGENTS.md:123` 明文规定：“接口或权限表缺少某项不构成授权：禁止据此放开权限……或把功能移入 D9”；将 `clusters[].isDefault` 移入 `D9` 并改写 `D12`、`D8` 正文必须经议会表决，严禁协调席或工人单方决定。该行不修改 `D16-09`/`D20` 路径白名单，**不加 `domains: [governance]`（4 席参投）**。
  3. **表决期“只暂停依赖部分”：** 按 `D10-08` 与 `C1-3`（`U83` 反设卡），表决前 `W-10` 仅暂停 `clusters[].isDefault` 一项的最终定稿，其余集群投影照常交付，**完全合规**（严禁在 `P0` 通过前将未经表决的 `isDefault` 改动合入 `main`）。

### 3. `G2-a B`（首页实验与里程碑事件是否不立案）
- **判定：** **不越界、不立案（以闸门 A 确认 `G2-a A` 为前提）。**
- **依据：** 实验事件与里程碑事件的投影全部落在 `W-10` 白名单（`client/**`、`features/lab-home/{model,controller,ui}/**`）内，不跨席位、不改 `protocol/lab/**`，由 `WEB-06`（`#28`）承载。

### 4. `G2-b B`（`ActivityWire.kind` 词表跨 `W-09` 写方与 `W-10` 读方是否属必须投票事项；表决前只暂停 Lab 自有活动行的分类与入口是否合规）
- **判定：** **越界，必须立 `P0` 表决；不加 `domains: [governance]`（4 席参投）；表决期“只暂停依赖部分”完全合规。**
- **依据：** `ActivityWire.kind` 的封闭词表与首页分类/入口映射同时约束 `W-09`（`server/lab/**` 写方）与 `W-10`（读方），属 `D10-08` 与 `AGENTS.md:123` 规定的跨席位 wire/ADT 契约缺口（`K4`），必须立 `P0` 表决。因 `W-09` 与 `W-10` 各自在既有 `D16-09`/`D20` 白名单内实现、不修改白名单，故**不加 `domains: [governance]`**。表决前按 `D10-08` `W-10` 仅暂停“Lab 自有 `ActivityWire` 行的分类与入口”，实验事件、里程碑事件及首页其余部分照常交付，**完全合规**。

### 5. `G3 B`（镜像与模板关联键是否属必须投票事项；表决前只暂停容器页依赖该对应的部分是否合规）
- **判定：** **越界，必须立 `P0` 表决；不加 `domains: [governance]`（4 席参投）；表决期“只暂停依赖部分”完全合规。**
- **依据：** `ImageDefinition.name` 取值与 `TemplateMetadata.image` 归一匹配规则横跨 `W-03`（`Pepgent/images`）、`W-09`（`P15` 导出）与 `W-10`（容器页投影）三方，属跨仓公开契约缺口（`K4`），按 `C2-2.2`、`D10-08`、`AGENTS.md:123` 必须立 `P0` 表决；不改 `D16-09`/`D20` 白名单，故**不加 `domains: [governance]`**。表决前按 `D10-08` `W-10` 仅暂停容器页依赖该关联键的 4 项（`nodeBindingCount`、`resources`、模板挂载、`liveContainers`），容器定义、依赖、文件、Panel 头照常交付，**完全合规**。

---

## 三、`D38-02 v2`（及 `D38-03 v2` 告知项）修订复核判定（`DeskD38Revise`，`2026-11-01T21:16Z`）

- **复核对象：** `/tmp/desk38r/D38-02-v2-gate-request.md`、`/tmp/desk38r/D38-02-v2.yaml`（对应 `Pepgent/PM#57` `D38-02 v2`）。
- **闸门 B 结论：** **合规；仍在 `W-09` 与 `W-10` 既有路径白名单内，不改 `D16-09`/`D20` 白名单与切片归属，维持 4 席参投（不加 `domains: [governance]`）。**
  1. **`W-09` 写方路径边界：** 节点合入族扩展为 `library.merge`、`library.apply`、`agentTemplate.saveVersion` 三个命令并在 `settings.repoActivity` 过滤三者，代码改动仍限 `apps/web/src/server/lab/**`，完全在 `D16-09` 授予 `W-09` 的白名单内。
  2. **`W-10` 读方与失效表路径边界：** `D12-17` `library` 频道失效读取加 `home` 由 `W-10` 在 `apps/web/src/client/services/lab/invalidation.ts` 实现（属 `D20-01` `apps/web/src/client/**` 白名单）；合入事件入口弹窗由既有 `sources` 改为既有 `dataset` 弹窗，仅改 `features/lab-home/model/**`（及 `client/**`）投影映射，不新增弹窗、不触碰 `ui/**` 组件结构，完全在 `D20-01/02` 白名单内，仍由 `WEB-06`（`Pepgent#28`）承载。
  3. **`D38-03` 后续修订路由核对（`D40`，`Pepgent/PM#59`）：** 因 `D38-03 v1` 已定案（daemon 拒绝 `revise`），`DeskD38Revise` 将 `nodeBindingCount` 匹配字段由 `NodeDefinition.template` 改为 `NodeDefinition.defaultEnvironment` 以新议程 `D40`（`Pepgent/PM#59`，单行 `D40-01`）立案表决而非私下回写已定决策，且改动不超出 `W-10` 白名单与 `WEB-06` 切片归属，符合议会程序，仍为 4 席参投（不加 `domains: [governance]`）。
