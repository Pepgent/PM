# D22（PM#31）：Lab 库检出缓存根路径的部署配置接口（P1）

- **PM issue：** https://github.com/Pepgent/PM/issues/31（Issue ID `I_kwDOUWWZ0c8AAAABbnnhmA`）
- **起草：** 治理分身 GovClone_55b0。
- **来源：** claude-high 在给 D21 投票时附带的非阻断发现（`local://votes/D21-claude-high.md`），其性质与 D21 相同：一个跨仓公开配置契约缺少名字。
- **计票：** 依 LEDGER C2-3（U95），由产品/契约四席计票，至少 3 席赞成即通过，有效反例须清零。

## 事实

- **(D)** D2-20 与 D7-19（D7:79）规定，中心检出缓存卷挂进 Lab 后端容器。该卷是可重建的近处副本，写方是 Lab 后端，`library.merge` 的干净集成检出也放在这个卷上（D7-11）。D7-19 规定的环境变量为 `SOROI_STORE_URL`、`SOROI_MUX_URL`，以及“上述各卷的挂载路径”，但没有给出变量名。
- **(R)** Pepgent `origin/main` 的 `apps/web/src/server/lab/runtime.ts:45` 写作 `cacheHome: resolve(environment.PEPGENT_LAB_LIBRARY_HOME ?? join(webRoot, 'lab-library'))`。
- **(R)** deploy `origin/main` 的 `stacks/pepgent-central/compose.yaml:107` 已把 `library-cache` 卷挂到 `/var/lib/pepgent/library`，但 Lab 服务的 environment（:85-101）没有注入 `PEPGENT_LAB_LIBRARY_HOME`。因此当前库缓存落在 `web-state` 卷上的 `/var/lib/pepgent/web/lab-library`，`library-cache` 卷闲置，违反了“卷按写方分开”。
- **(R)** 同一段 environment 已注入 `PEPGENT_LAB_HOME: /var/lib/pepgent/lab`，对应 `lab-db` 卷，不在本条范围内。

## 决策表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D22-01 | **Lab 中心检出缓存根路径由部署注入** | D7-19 环境变量列表；deploy `stacks/pepgent-central/compose.yaml` Lab 服务的 environment；deploy `README.md` 卷表 | • `PEPGENT_LAB_LIBRARY_HOME` 是部署交给 Lab 后端的配置接口，值为中心检出缓存卷在 Lab 容器内的挂载根路径。Lab 按 D7-11 在这个根下维护库检出和临时集成检出。<br>• deploy 在中心 Stack 的 Lab 服务上注入 `PEPGENT_LAB_LIBRARY_HOME=/var/lib/pepgent/library`，对应已有的 `library-cache` 挂载。<br>• 不新建卷，不另设路径源，卷的权威、写方和生命周期不变。<br>• **承载：** 与 D21-01 共用同一个 deploy issue，即“Lab 卷挂载路径环境变量注入”，由同一个非 draft PR `Fixes`。<br>• **回写：** 秘书在 D7-19 的环境变量列表中写明 `PEPGENT_LAB_LIBRARY_HOME`，以及 D21 的 `PEPGENT_LAB_WORKTREE_HOME`（D7-04 处只引用） | **得到：** 库缓存落在 D2-20 规定的独立卷上，接口有了已通过的正文，同一次部署改动就能补齐。<br>**放弃：** deploy 的 Lab 服务多一行 env。<br>**备选落选：**<br>• 把应用默认值改成 `/var/lib/pepgent/library`：等于在应用里写死 deploy 的挂载点（D2-23）。<br>• 另开 deploy issue：原因和验收都与 D21 相同，都是 Lab 卷挂载路径未注入，拆开只会多一次进场 | 串联 | 是：D7-19 缺少变量名 | **claude-high：赞成；Argon：赞成；LeadMentor：赞成；协调席/Main：待补投** | **通过：3/4 赞成（协调席待 Main 补投，已达门槛）；无否决；无有效反例。** |

## 归档结果

- **D22-01：通过。** 三席赞成（3/4），协调席待 Main 补投但已达门槛；无 Argon 否决、无有效反例。
- **闸门 B：** 已批准 D21-01 与 D22-01 共用同一个 deploy 实现 issue；本次机械归档不创建 deploy/Pepgent 实现 issue。
- **原票：** `evidence/votes/D22-ClaudeHigh.md`、`D22-ArgonSol.md`、`D22-LeadMentor.md`；每个文件保留对应原票及理由。协调席/Main 未列入本次用户指定的三票归档。
