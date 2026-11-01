# D38 选票：Argon

议程：Pepgent#28 WEB-06：默认集群无源、首页 Lab 活动词表、镜像与模板的关联键（[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D38-01 v1：赞成（Argon-2，2026-11-01T21:03:53.175Z）



### 意图裁决（本席说了算）
- 无（`D38-01 v1`、`D38-02 v1`、`D38-03 v1` 均标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D38-01 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 在 `D7-12`（`DEC/D7-lab-backend.md:72`）、`F15`–`F17`（`DEC/D8-mvp-scope.md:135-137`）与 `remote`（`P3`，`DEC/D12-lab-wire.md:344-351`）中，每个模板直接绑定其所属后端端点（`primaryCluster`），系统不存在实验室全局“默认集群”概念。将 `clusters.clusters[].isDefault` 正式补入 D12“第一版无来源字段”表与 D8 §5.4，并把 `ClusterRecord.isDefault` 改为 `boolean | null` 投影 `null`，严格遵守 `DEC/D12-lab-wire.md:27`“投影留空，不造数”与 `SOR/AGENTS.md:123` 表决要求，且 `{row.isDefault && ...}` 自然不渲染默认标记，无需改动 `ui/**`（`(U)` `U1`、`U59`，`LEDGER.md:69,104`）。
- **D38-02 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 复用 `D12-10` 已有命令名（`member.invite`、`member.role`、`member.quota`、`member.remove`、`conclusion.confirm`、`library.merge`）作为 `ActivityWire.kind` 的封闭词表，由 `W-09` 在相应命令成功落库时同事务写入 `activity` 表（`home.activity` 返回本 Lab 全部行，`settings.repoActivity` 返回 `kind = library.merge` 行），并由 `W-10` 将 `conclusion.confirm` 与 `library.merge` 确定性映射到首页 `HomeEvent`（`category`/`glyph`/`action.dialog`），完整打通 `D7-02`（`DEC/D7-lab-backend.md:62`）与 `DEC/D12-coverage.md:125-130` 而不改 wire 形状或 `ui/**`（`(U)` `U1`、`U2`、`U23`、`U59`，`LEDGER.md:69,86,104`）。
- **D38-03 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 明确规定 `ImageDefinition.name`（`P15`）为镜像发布时的 OCI repository 路径（不含 registry 主机、`:tag` 与 `@digest`，如 `pepgent/omp-agent`），并对 `TemplateMetadata.image`（`P3`）按去掉 `@digest`、`:tag` 及首段 registry 主机后与 `ImageDefinition.name` 比较，使 `D7-13`（`DEC/D7-lab-backend.md:73`）与 `D12-08`（`DEC/D12-lab-wire.md:40,353-357,384,642`）中容器页的 `nodeBindingCount`、`liveContainers`、`resources` 与模板挂载具备跨部署一致的确定性关联键，不反转 `images` 与 `remote` 的依赖方向（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。

### 否决（一票否决权）
- 无（`D38-01 v1`、`D38-02 v1`、`D38-03 v1` 均标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `D7`、`D8`、`D12`、`D20` 完全一致，本席不行使否决权）。


## D38-02 v1：赞成（Argon-2，2026-11-01T21:03:53.176Z）——作废：该行已修订到 v2



### 意图裁决（本席说了算）
- 无（`D38-01 v1`、`D38-02 v1`、`D38-03 v1` 均标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D38-01 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 在 `D7-12`（`DEC/D7-lab-backend.md:72`）、`F15`–`F17`（`DEC/D8-mvp-scope.md:135-137`）与 `remote`（`P3`，`DEC/D12-lab-wire.md:344-351`）中，每个模板直接绑定其所属后端端点（`primaryCluster`），系统不存在实验室全局“默认集群”概念。将 `clusters.clusters[].isDefault` 正式补入 D12“第一版无来源字段”表与 D8 §5.4，并把 `ClusterRecord.isDefault` 改为 `boolean | null` 投影 `null`，严格遵守 `DEC/D12-lab-wire.md:27`“投影留空，不造数”与 `SOR/AGENTS.md:123` 表决要求，且 `{row.isDefault && ...}` 自然不渲染默认标记，无需改动 `ui/**`（`(U)` `U1`、`U59`，`LEDGER.md:69,104`）。
- **D38-02 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 复用 `D12-10` 已有命令名（`member.invite`、`member.role`、`member.quota`、`member.remove`、`conclusion.confirm`、`library.merge`）作为 `ActivityWire.kind` 的封闭词表，由 `W-09` 在相应命令成功落库时同事务写入 `activity` 表（`home.activity` 返回本 Lab 全部行，`settings.repoActivity` 返回 `kind = library.merge` 行），并由 `W-10` 将 `conclusion.confirm` 与 `library.merge` 确定性映射到首页 `HomeEvent`（`category`/`glyph`/`action.dialog`），完整打通 `D7-02`（`DEC/D7-lab-backend.md:62`）与 `DEC/D12-coverage.md:125-130` 而不改 wire 形状或 `ui/**`（`(U)` `U1`、`U2`、`U23`、`U59`，`LEDGER.md:69,86,104`）。
- **D38-03 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 明确规定 `ImageDefinition.name`（`P15`）为镜像发布时的 OCI repository 路径（不含 registry 主机、`:tag` 与 `@digest`，如 `pepgent/omp-agent`），并对 `TemplateMetadata.image`（`P3`）按去掉 `@digest`、`:tag` 及首段 registry 主机后与 `ImageDefinition.name` 比较，使 `D7-13`（`DEC/D7-lab-backend.md:73`）与 `D12-08`（`DEC/D12-lab-wire.md:40,353-357,384,642`）中容器页的 `nodeBindingCount`、`liveContainers`、`resources` 与模板挂载具备跨部署一致的确定性关联键，不反转 `images` 与 `remote` 的依赖方向（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。

### 否决（一票否决权）
- 无（`D38-01 v1`、`D38-02 v1`、`D38-03 v1` 均标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `D7`、`D8`、`D12`、`D20` 完全一致，本席不行使否决权）。


## D38-03 v1：赞成（Argon-2，2026-11-01T21:03:53.176Z）



### 意图裁决（本席说了算）
- 无（`D38-01 v1`、`D38-02 v1`、`D38-03 v1` 均标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D38-01 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 在 `D7-12`（`DEC/D7-lab-backend.md:72`）、`F15`–`F17`（`DEC/D8-mvp-scope.md:135-137`）与 `remote`（`P3`，`DEC/D12-lab-wire.md:344-351`）中，每个模板直接绑定其所属后端端点（`primaryCluster`），系统不存在实验室全局“默认集群”概念。将 `clusters.clusters[].isDefault` 正式补入 D12“第一版无来源字段”表与 D8 §5.4，并把 `ClusterRecord.isDefault` 改为 `boolean | null` 投影 `null`，严格遵守 `DEC/D12-lab-wire.md:27`“投影留空，不造数”与 `SOR/AGENTS.md:123` 表决要求，且 `{row.isDefault && ...}` 自然不渲染默认标记，无需改动 `ui/**`（`(U)` `U1`、`U59`，`LEDGER.md:69,104`）。
- **D38-02 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 复用 `D12-10` 已有命令名（`member.invite`、`member.role`、`member.quota`、`member.remove`、`conclusion.confirm`、`library.merge`）作为 `ActivityWire.kind` 的封闭词表，由 `W-09` 在相应命令成功落库时同事务写入 `activity` 表（`home.activity` 返回本 Lab 全部行，`settings.repoActivity` 返回 `kind = library.merge` 行），并由 `W-10` 将 `conclusion.confirm` 与 `library.merge` 确定性映射到首页 `HomeEvent`（`category`/`glyph`/`action.dialog`），完整打通 `D7-02`（`DEC/D7-lab-backend.md:62`）与 `DEC/D12-coverage.md:125-130` 而不改 wire 形状或 `ui/**`（`(U)` `U1`、`U2`、`U23`、`U59`，`LEDGER.md:69,86,104`）。
- **D38-03 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：** 明确规定 `ImageDefinition.name`（`P15`）为镜像发布时的 OCI repository 路径（不含 registry 主机、`:tag` 与 `@digest`，如 `pepgent/omp-agent`），并对 `TemplateMetadata.image`（`P3`）按去掉 `@digest`、`:tag` 及首段 registry 主机后与 `ImageDefinition.name` 比较，使 `D7-13`（`DEC/D7-lab-backend.md:73`）与 `D12-08`（`DEC/D12-lab-wire.md:40,353-357,384,642`）中容器页的 `nodeBindingCount`、`liveContainers`、`resources` 与模板挂载具备跨部署一致的确定性关联键，不反转 `images` 与 `remote` 的依赖方向（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`）。

### 否决（一票否决权）
- 无（`D38-01 v1`、`D38-02 v1`、`D38-03 v1` 均标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `D7`、`D8`、`D12`、`D20` 完全一致，本席不行使否决权）。


## D38-02 v2：赞成（Argon-2，2026-11-01T21:19:09.744Z）



### 意图裁决（本席说了算）
- 无（`D38-02 v2` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D38-02 v2（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **完整覆盖 `D7-02`、`D7-11` 与 `D12-10` 节点合入族的全部三个命令（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `DEC/D7-lab-backend.md:62,71`、`DEC/D12-lab-wire.md:42,199-200,547-557`）：** 将节点合入族补齐为 `library.merge`、`library.apply`、`agentTemplate.saveVersion` 三个命令名，由 `W-09` 在三者成功落库时同事务写入 `activity` 行、`settings.repoActivity` 返回三者的行，消除 `nodes` 页（`F29 S2`）与智能体模板保存版本不写 `activity` 的遗漏。
    2. **对齐 `D12-17` 失效表与原型弹窗配对（`(U)` `U59`，`LEDGER.md:104`；`(D)` `DEC/D12-lab-wire.md:611`、`DEC/D20-w10-path-boundary.md:31-32`）：** 在 `D12-17` `library` 频道失效读取集合中加入 `home`，并将合入事件入口弹窗改为原型中与 `data`/`database` 成对的 `dataset` 弹窗，不新增弹窗、不改 `ui/**`。

### 否决（一票否决权）
- 无（`D38-02 v2` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23`、`U59` 及 `D7`、`D12`、`D20` 完全一致，本席不行使否决权）。

