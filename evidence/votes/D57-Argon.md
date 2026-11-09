# D57 选票：Argon

议程：仓 B/soroi e2e 对私有组件仓的 bun git 依赖改用 git+ssh 拼法（解 soroi#346 BLOCKED）（[Pepgent/PM#79](https://github.com/Pepgent/PM/issues/79)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D57-01 v1：赞成（ArgonSol-2，2026-11-02T02:02:45.499Z）



# D57 v1：Argon / ArgonSol-2

D57-01@v1、D57-02@v1 均 approve。接受实现分类，不认领 design，不提出意图否决/分类争议。

当前队首由 council queue 确认，正文来源 https://github.com/Pepgent/PM/issues/79 。此前本席闸门 A 报告 /tmp/gate-a-blocked346.md 已区分 URL 契约变更与既有构建读取能力的凭据实现；新议程保持该边界。

## 意图裁决

(U) U1/U30–U32 的独立组件边界保留；U13 的 omp 定制定位不变。用户没有指定依赖必须用 https 或 ssh，因此选传输形式是普通实现/串联取舍，不把偏好冒称用户原意，也不因可行替换行使否决。凭据仍由使用方拥有者保存并注入，不流向对话/归档/安装现场。

## D57-01：普通赞成

- 精确替换已定依赖字面形式，不回写 D53 归档当原文从来如此；依赖名、contract/identity 导入和仓 A store-contract 派生分支都不变。
- builder 的已决产物边界不变：构建时携入最小契约，production install 和远程 boot 不访问私有仓 A，不给终端用户新增拉取私有仓的部署前提。
- CI 仅使用仓 A 只读授权，不扩大读写范围或改可见性，私钥只由仓 B workflow 拥有方保存/注入。其角色/仓级程序依据闸门 B，不由产品席本票单独授权 Main 操作。
- 工人沿自身 manifest/lockfile/workflow 域实现，使用本机已有 git 凭据，不把 token 写进 URL 或锁文件，不新增版本钉死。

## D57-02：普通赞成

- 把同类已知 Bun 私有依赖路径一次补到 soroi e2e，而不等 W-08 再触发同样 BLOCKED；仓 A 默认分支是集成测试所需真实服务，仓 B 默认分支提供插件，两者与仓 B 发行物的最小契约依赖分开。
- e2e 凭据来自其实际使用方，不以仓 B Actions secret 为隐式第二来源，不为不存在的 e2e Actions workflow 造 CI secret。
- 不改变 W-08 的路径归属、当前分仓布局或完整验收范围，不以传输替换新增跨组件同步验收锁。

## 证据与限度

采用议程/初审中的已报告真实 Bun 行为，不重复运行去质疑工人观察；本席没有运行安装、生成锁文件或执行 release。本票不认证 runtime 成功，也不将本次观测外推成所有未来 Bun 版本的恒定实现。无成立反例、无专责否决。


## D57-02 v1：赞成（ArgonSol-2，2026-11-02T02:02:45.500Z）



# D57 v1：Argon / ArgonSol-2

D57-01@v1、D57-02@v1 均 approve。接受实现分类，不认领 design，不提出意图否决/分类争议。

当前队首由 council queue 确认，正文来源 https://github.com/Pepgent/PM/issues/79 。此前本席闸门 A 报告 /tmp/gate-a-blocked346.md 已区分 URL 契约变更与既有构建读取能力的凭据实现；新议程保持该边界。

## 意图裁决

(U) U1/U30–U32 的独立组件边界保留；U13 的 omp 定制定位不变。用户没有指定依赖必须用 https 或 ssh，因此选传输形式是普通实现/串联取舍，不把偏好冒称用户原意，也不因可行替换行使否决。凭据仍由使用方拥有者保存并注入，不流向对话/归档/安装现场。

## D57-01：普通赞成

- 精确替换已定依赖字面形式，不回写 D53 归档当原文从来如此；依赖名、contract/identity 导入和仓 A store-contract 派生分支都不变。
- builder 的已决产物边界不变：构建时携入最小契约，production install 和远程 boot 不访问私有仓 A，不给终端用户新增拉取私有仓的部署前提。
- CI 仅使用仓 A 只读授权，不扩大读写范围或改可见性，私钥只由仓 B workflow 拥有方保存/注入。其角色/仓级程序依据闸门 B，不由产品席本票单独授权 Main 操作。
- 工人沿自身 manifest/lockfile/workflow 域实现，使用本机已有 git 凭据，不把 token 写进 URL 或锁文件，不新增版本钉死。

## D57-02：普通赞成

- 把同类已知 Bun 私有依赖路径一次补到 soroi e2e，而不等 W-08 再触发同样 BLOCKED；仓 A 默认分支是集成测试所需真实服务，仓 B 默认分支提供插件，两者与仓 B 发行物的最小契约依赖分开。
- e2e 凭据来自其实际使用方，不以仓 B Actions secret 为隐式第二来源，不为不存在的 e2e Actions workflow 造 CI secret。
- 不改变 W-08 的路径归属、当前分仓布局或完整验收范围，不以传输替换新增跨组件同步验收锁。

## 证据与限度

采用议程/初审中的已报告真实 Bun 行为，不重复运行去质疑工人观察；本席没有运行安装、生成锁文件或执行 release。本票不认证 runtime 成功，也不将本次观测外推成所有未来 Bun 版本的恒定实现。无成立反例、无专责否决。

