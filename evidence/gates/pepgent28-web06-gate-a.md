# 闸门 A 裁决：Pepgent#28（WEB-06）集群身份、首页活动词表、镜像与模板关联键（G1-a、G1-b、G2-a、G2-b、G3）

- **裁决席位：** 产品原始意图守护席 `Argon`（实例 `Argon-2`）
- **对应议题与材料：** [Pepgent/Pepgent#28](https://github.com/Pepgent/Pepgent/issues/28)（[评论 6563665330](https://github.com/Pepgent/Pepgent/issues/28#issuecomment-6563665330)），`PM/evidence/gates/pepgent28-web06.md`
- **裁决依据：**
  - `(U)` `SOR/LEDGER.md`：`U1`、`U2`、`U23`（`LEDGER.md:69,86`：已有前端界面接通后端与 e2e 全流程走通，功能不收缩）、`U59`（`LEDGER.md:104`：不破坏前端视觉与组件结构）、`U83`、`U88`（`LEDGER.md:112,117`：按切片职责推进，只暂停有契约缺口的部分）。
  - `(D)` `SOR/AGENTS.md:60,123`（C2-2、D10-08、禁止未经表决把功能移入 D9）、`DEC/D7-lab-backend.md:62,72,73,223-224`（D7-02、D7-12、D7-13、P3/P4）、`DEC/D8-mvp-scope.md:135-137,359`（F15–F17、WEB-06）、`DEC/D10-repo-delivery.md:20`（D10-08）、`DEC/D12-lab-wire.md:27,40,199-200,344-357,382-384,614-631,640,642`（D12-08、ActivityWire、TemplateMetadata、ImageDefinition、第一版无来源字段表、P3/P15）、`DEC/D12-coverage.md:125-130,389,394,430,432,441,445,450,460,588`、`DEC/D20-w10-path-boundary.md:31-32`（D20-01/02）、`RM/README.md:235`、`RM/src/model.rs:360-364`。

---

## 一、总体判定汇总

| 编号 | 事项 | 闸门 A 分类 | 是否越界 / 是否立案 | 核心结论 |
|---|---|---|---|---|
| **G1-a** | 集群行的身份、端点、类别与作业归组（集群页、接入向导） | **K1** | **不越界，不立案** | 同意初分类 K1（采用候选 C 并修正理由）：以 `templates[].metadata.resources.primaryCluster` 端点串去重作为集群行（`id` 与 `endpoint` 取该端点串，`kind` 取模板 `backend`），作业按 `job.run.template` 查模板 `primaryCluster` 归组，接入向导复用同一组端点，完全符合 `D7-12` 与 `P3` 原意 |
| **G1-b** | 集群 `name` 与 `isDefault` | `name`: **K3**<br>`isDefault`: **K4** | `name`: **不立案**<br>`isDefault`: **越界，须立 P0 表决** | `name` 直接呈现端点串属 K3；`D2–D7` 与 `remote`（`P3`）均无全局“默认集群”概念（各模板自带后端端点），将 `clusters.clusters[].isDefault` 补入 D12“第一版无来源字段”表与 D8 §5.4（类型改 `boolean \| null`，投影 `null`）不违背集群页产品意图，但按 `AGENTS.md:123` 增补 D9 清单须立 P0 表决 |
| **G2-a** | 首页“实验”与“里程碑”类事件 | **K1** | **不越界，不立案** | 同意初分类 K1：首页 `experiments` 类事件按 `D7-02` 从目录中运行的开始/结束生命周期投影、`milestones` 类事件从 `MilestoneWire` 投影，不经过 `ActivityWire.kind`，在 `WEB-06` 照常交付 |
| **G2-b** | Lab 自有活动行 `ActivityWire.kind` 的词表、类别与入口映射 | **K4** | **越界，须立 P0 表决** | `ActivityWire.kind` 的封闭取值（对应 `D7-02` 成员、结论确认、节点合入三族命令）及其到首页 `HomeEvent`（`category`/`glyph`/`action.dialog`）的映射横跨写方 `W-09` 与读方 `W-10`，属未定跨席契约，须立 P0 表决；表决前 `W-10` 按 `D10-08` 只暂停 Lab 自有活动行映射 |
| **G3** | 镜像定义 `ImageDefinition.name` 与模板镜像引用 `TemplateMetadata.image` 的关联键（容器页） | **K4** | **越界，须立 P0 表决** | `ImageDefinition.name`（`P15`）的取值规则及与 `TemplateMetadata.image`（`P3`）的去 registry 主机与 `:tag`/`@digest` 归一匹配规则横跨 `W-03`（`images`）、`W-09`（`P15` 导出）与 `W-10`（`WEB-06` 容器页投影），属未定公开契约，须立 P0 表决；表决前 `W-10` 只暂停依赖该关联键的字段 |

---

## 二、对材料中各“A：”问题的逐项回答

### G1-a — A：以 `primaryCluster` 端点去重作为集群行、以模板的 `backend` 作类别、作业经模板归组，是否就是 D7-12 与 P3 的原意，不改任何公开契约？
- **答复：** **是，完全是 `D7-12` 与 `P3` 的原意，不改任何公开契约（属 K1，不越界，无需立案）。**
  - `DEC/D7-lab-backend.md:72`（`D7-12`）明文规定“**集群：** 即 remote 目录里的一个后端端点：Komodo Core、slurmrestd 或 k8s context……Lab 按后端把 `remote templates` 归组”，且 `remote` 权威定义 `resources.boundClusters` / `primaryCluster` 即为“the template's single backend endpoint: Komodo `core`, Slurm `api`, k8s `context`”（`RM/README.md:235`、`RM/src/model.rs:360-364`）。
  - 因此，以 `templates[].metadata.resources.primaryCluster` 去重生成集群行（`id` 与 `endpoint` 取该端点串，`kind` 取模板 `backend`）、作业按 `job.run.template` 关联模板的 `primaryCluster` 归组（`DEC/D12-coverage.md:430`）、接入向导 `existingClusters` 与 `clusterChoices` 使用同一组端点，并将 `C/lab-compute.ts` 中的私有类型 `ClusterId` 改为 `string`，完全落在既有契约与 `D20-01` 白名单内。排除把 `backend` 枚举当端点的候选 (A) 及无需新字段的候选 (B)。

### G1-b — A：`isDefault` 无源、列 D9、投影 `null`，是否违背集群页的产品意图？这是否属缺失设计须表决？
- **答复：** **不违背集群页的产品意图；但把 `clusters.clusters[].isDefault` 补入 D12“第一版无来源字段”表与 D8 §5.4 属于对已通过正文的 D9 分类增补，须按 K4 并入 P0 议案表决（`name` 用端点串显示属 K3，不立案）。**
  - 在 `D7-12`、`F15`–`F17`（`DEC/D8-mvp-scope.md:135-137`）与 `remote`（`P3`）中，每个模板直接绑定其所属后端端点（`primaryCluster`），节点函数绑定模板（`defaultEnv: TemplateName`），系统不存在实验室全局“默认集群”概念。
  - 将 `ClusterRecord.isDefault` 改为 `boolean | null` 并投影 `null`（`clusters-page.tsx:63,589` 的 `{row.isDefault && ...}` 在 `null` 时自然不渲染默认标签，无需改 `ui/**`），遵循 `DEC/D12-lab-wire.md:27`“投影留空，不造数”而不伪造 `false`；依 `SOR/AGENTS.md:123`，将该字段补入 `DEC/D12-lab-wire.md:629` 与 `DEC/D8-mvp-scope.md` §5.4 须经 P0 表决。

### G2-a — A：首页“实验”类事件取目录中运行的开始、结束，“里程碑”类取 `MilestoneWire`，是否符合 D7-02 与 F-12 的意图？
- **答复：** **完全符合（属 K1，不越界，无需立案）。**
  - `DEC/D7-lab-backend.md:62`（`D7-02`）明文规定“运行开始结束在读取时从 store 生命周期投影，不入表”，`DEC/D12-coverage.md:125-130` 亦明确首页事件由目录中运行的生命周期事件（`category: 'experiments'`）、`MilestoneWire`（`category: 'milestones'`）与 `ActivityWire` 共同组成。前两类不依赖 `ActivityWire.kind` 词表，在 `WEB-06` 照常交付。

### G2-b — A：Lab 自有活动在首页如何分类、是否给入口，是否属未定的产品语义，须表决？
- **答复：** **是，属未定的跨席位公开契约（K4），须并入 P0 议案表决。**
  - `DEC/D7-lab-backend.md:62`（`D7-02`）规定 `activity` 表记录“成员、结论确认、节点合入等 Lab 自有事件”，但 `ActivityWire.kind` 在 `DEC/D12-lab-wire.md:199` 仅为开放 `string`，既未规定写方（`W-09` `server/lab/**`）写入的封闭词表，也未规定读方（`W-10` `WEB-06`）如何将其映射到首页必填的 `HomeEvent.category`、`glyph` 与 `action.dialog`。
  - 同意初审材料提出的候选主案方向：`ActivityWire.kind` 取触发该事件的 `D12-10` 命令名封闭集合（如 `member.invite`、`member.role`、`member.quota`、`member.remove`、`conclusion.confirm`、`library.merge`），并在 P0 行中明确每个取值由 `W-09` 在相应命令落库时写入及由 `W-10` 到 `HomeEvent`（`category`/`glyph`/`action.dialog`）的确定性映射。表决前 `W-10` 按 `D10-08` 只暂停 `ActivityWire` 行的分类映射，首页其余部分照常交付。

### G3 — A：镜像与模板的对应规则是否属未定的公开契约，须表决？
- **答复：** **是，属未定的跨仓/跨席位公开契约（K4），须并入 P0 议案表决。**
  - `DEC/D7-lab-backend.md:73`（`D7-13`）与 `DEC/D12-lab-wire.md:40,353-357,384,642`（`D12-08`、`P15`）要求按“用这个镜像的模板”统计容器页的 `nodeBindingCount`、资源默认值、挂载与 `liveContainers`，但现有正文未规定 `ImageDefinition.name`（`P15`）的取值格式以及如何与带 registry 主机和 `:tag`/`@digest` 的 `TemplateMetadata.image`（`P3`）匹配。
  - 同意初审材料提出的候选主案方向：规定 `ImageDefinition.name` 为镜像发布时的 OCI repository 路径（不含 registry 主机、`:tag` 与 `@digest`，如 `pepgent/omp-agent`），当且仅当 `TemplateMetadata.image` 去掉首段 registry 主机（含 `.`、`:` 或为 `localhost`）及末尾 `:tag`、`@digest` 后与 `ImageDefinition.name` 相等时判定该模板使用该镜像。表决前 `W-10` 按 `D10-08` 只暂停容器页依赖该关联键的字段，容器定义、依赖、文件与 Panel 头照常交付。

---

## 三、D38-02 v2（及 D38-03 v2）修订稿闸门 A 复核

- **复核结论：** **同意 `D38-02 v2`（及 `D38-03 v2`）修订稿，三处差异完全符合 `D7-02`、`D7-11`、`D7-13`、`D12-10` 与 `D12-17` 的产品原意，不触及任何新的意图或公开契约问题，同意进入 v2 重投。**
- **逐项依据：**
  1. **节点合入族补齐 `library.merge`、`library.apply`、`agentTemplate.saveVersion` 三个命令名：** 按 `DEC/D7-lab-backend.md:71`（`D7-11`）与 `DEC/D12-lab-wire.md:42,547-557`（`D12-10`），这三条命令均在 Lab 库默认分支产生合入提交（返回 `{ commit, paths }`），将三者一并纳入 `D7-02`“节点合入”族并由 `settings.repoActivity` 完整返回，消除了 `F29 S2`（`nodes` 页 `library.apply`）与智能体模板保存版本不写 `activity` 的遗漏。
  2. **`D12-17` 失效表 `library` 频道补 `home`：** 节点合入写入 `activity` 后改变 `home.activity`，在 `library` 频道失效读取集合中加入 `home`（`client/services/lab/invalidation.ts`，属 `D20-01` 白名单）使首页即时重读，与 `D12-17` 失效语义完全一致。
  3. **合入事件入口弹窗由 `sources` 改为 `dataset`：** 原型 `client/services/lab-fixture/home.ts:121-131` 中 `category: 'data'`、`glyph: 'database'` 本就与 `dialog: 'dataset'` 成对（`sources` 对应 `literature`），不新增弹窗、不改 `ui/**`，符合 `D20-02` 与 `U59`。
  4. **附注（`D38-03 v2`）：** 将 `nodeBindingCount` 引用的字段名由 `NodeDefinition.template` 修正为 `D7-13` 默认环境字段 `NodeDefinition.defaultEnvironment`，符合 `D7-13` 原意。
