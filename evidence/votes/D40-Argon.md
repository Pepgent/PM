# D40 选票：Argon

议程：D38-03 更正：容器页 nodeBindingCount 按节点默认环境计，不按 NodeDefinition.template（[Pepgent/PM#59](https://github.com/Pepgent/PM/issues/59)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D40-01 v1：赞成（Argon-2，2026-11-01T21:19:09.813Z）



### 意图裁决（本席说了算）
- 无（`D40-01 v1` 标为“串联”，本席同意该分类，无分类争议）。

### 对技术、串联、实现条目的投票
- **D40-01 v1（串联，缺失部分或设计补充：是）：赞成（`approve`）。**
  - **理由与依据：**
    1. **准确对齐 `D7-13`、`D12`（`NodeDefinition`）与 `design/node.md` 的字段语义（`(U)` `U1`、`U2`、`U23`，`LEDGER.md:69,86`；`(D)` `DEC/D7-lab-backend.md:73`、`DEC/D12-lab-wire.md:40,239,353`、`design/node.md`）：**
       - 在 `soroi` 与 `D12` 的 `NodeDefinition` 中，`template` 是 `Agent` 节点绑定的 omp agent 定义名（`.omp/agents/<name>.md`），而 `defaultEnvironment` 才是节点构造 `env` 选项的默认环境表达式。
       - `D7-13` 明文规定“`nodeBindingCount`：默认环境是用这个镜像的模板的节点函数个数”，故容器页 `nodeBindingCount` 应统计 `containers.definitions` 中 `defaultEnvironment`（字符串字面量取其值）属于该镜像匹配模板 `TemplateInfo.name` 的节点函数个数，修正 `D38-03 v1` 中误写的 `template` 字段名完全符合 `D7-13` 原意。

### 否决（一票否决权）
- 无（`D40-01 v1` 标为“缺失部分或设计补充：是”，与 `(U)` `U1`、`U2`、`U23` 及 `D7-13`、`D12`、`design/node.md` 完全一致，本席不行使否决权）。

