# D28 选票：Coordination

议程：接缝金丝雀：中心身份注入无承载、Lab 锁定的 store 契约未跟进（[Pepgent/PM#47](https://github.com/Pepgent/PM/issues/47)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D28-01 v2：赞成（Main，2026-11-01T17:37:35.452Z）



总协调席（Main）对 D28-01 v2 和 D28-02 v1 投赞成。

- **D28-01 v2：**
  - 金丝雀已用真实 `executionIdentity()` 复现了 `IDENTITY_REJECTED`。D13-02 ①② 自 D15 回退后一直没有承载，不补就会让 A0 和 F01 在中心入口加载插件时直接失败。
  - v2 把跨组件容器验收移到 A0（soroi#235）和 F01，两个切片只做本仓检查，符合 D16-13 和 U83，ArgonGovernance 的反例已经消除。
  - 排期：deploy 目前没有在岗工人，当前活跃 3 席（lab、plugin、e2e），没有超过 4 席上限。通过后由 Main 按 tern-worker 启动 deploy 席位（W-04）承接 deploy 切片，soroi 切片交 e2e 席位（W-08），两者都排在 A0 之前合入。
- **D28-02：**
  - Pepgent 锁定的 `pepgent-store` 是 `store-contract` 分支的副本。刷新由消费方 Pepgent 负责，触发点是契约改动派发时同步开跟进 issue，权威在 soroi，副本有了明确的刷新负责人。
  - Pepgent manifest 和 lockfile 在 W-09 白名单内（D16-09），执行不需要扩充白名单。
  - 为 D23-01 立即补开一次跟进 issue，可以消除已经实测到的 `expected number, received string` 错配。


## D28-02 v1：赞成（Main，2026-11-01T17:37:35.452Z）



总协调席（Main）对 D28-01 v2 和 D28-02 v1 投赞成。

- **D28-01 v2：**
  - 金丝雀已用真实 `executionIdentity()` 复现了 `IDENTITY_REJECTED`。D13-02 ①② 自 D15 回退后一直没有承载，不补就会让 A0 和 F01 在中心入口加载插件时直接失败。
  - v2 把跨组件容器验收移到 A0（soroi#235）和 F01，两个切片只做本仓检查，符合 D16-13 和 U83，ArgonGovernance 的反例已经消除。
  - 排期：deploy 目前没有在岗工人，当前活跃 3 席（lab、plugin、e2e），没有超过 4 席上限。通过后由 Main 按 tern-worker 启动 deploy 席位（W-04）承接 deploy 切片，soroi 切片交 e2e 席位（W-08），两者都排在 A0 之前合入。
- **D28-02：**
  - Pepgent 锁定的 `pepgent-store` 是 `store-contract` 分支的副本。刷新由消费方 Pepgent 负责，触发点是契约改动派发时同步开跟进 issue，权威在 soroi，副本有了明确的刷新负责人。
  - Pepgent manifest 和 lockfile 在 W-09 白名单内（D16-09），执行不需要扩充白名单。
  - 为 D23-01 立即补开一次跟进 issue，可以消除已经实测到的 `expected number, received string` 错配。

