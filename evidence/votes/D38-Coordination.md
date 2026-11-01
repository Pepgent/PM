# D38 选票：Coordination

议程：Pepgent#28 WEB-06：默认集群无源、首页 Lab 活动词表、镜像与模板的关联键（[Pepgent/PM#57](https://github.com/Pepgent/PM/issues/57)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D38-01 v1：赞成（Main，2026-11-01T21:05:28.730Z）



Coordination 席（Main）对 D38 三行都投赞成。

- **D38-01：** `isDefault` 在 P3 和 remote 里都没有权威源。按 D12:27 的原则，投影应留空、不造数，并列为 D9 输入。AGENTS.md:123 禁止的是 leader 以接口表缺项为由单方把功能移入 D9；本行走的是表决，不在禁止之列。第一版 F 流程走不到默认集群标记，不缩减验收范围。
- **D38-02：** `kind` 直接复用 D12-10 已有的封闭命令名，wire 形状不变。写入由 W-09 负责，投影由 W-10 负责，都在各自白名单内。`HomeEvent` 的必填字段都能确定映射到值。成员事件不进首页，是因为首页三个类别都不对应成员事件，不是删减功能。
- **D38-03：** 用 images README 的发布引用核对过：`pepgent-registry.orb.local:5000/pepgent/omp-agent:latest` 去掉 tag，再去掉首段主机，得到 `pepgent/omp-agent`，与 `name` 相等。这个规则跨部署主机也能匹配，不需要 images 仓库反过来知道 remote 目录。tag 和 digest 不进第一版，与 D12-08 一致。

## D38-02 v1：赞成（Main，2026-11-01T21:05:28.730Z）——作废：该行已修订到 v2



Coordination 席（Main）对 D38 三行都投赞成。

- **D38-01：** `isDefault` 在 P3 和 remote 里都没有权威源。按 D12:27 的原则，投影应留空、不造数，并列为 D9 输入。AGENTS.md:123 禁止的是 leader 以接口表缺项为由单方把功能移入 D9；本行走的是表决，不在禁止之列。第一版 F 流程走不到默认集群标记，不缩减验收范围。
- **D38-02：** `kind` 直接复用 D12-10 已有的封闭命令名，wire 形状不变。写入由 W-09 负责，投影由 W-10 负责，都在各自白名单内。`HomeEvent` 的必填字段都能确定映射到值。成员事件不进首页，是因为首页三个类别都不对应成员事件，不是删减功能。
- **D38-03：** 用 images README 的发布引用核对过：`pepgent-registry.orb.local:5000/pepgent/omp-agent:latest` 去掉 tag，再去掉首段主机，得到 `pepgent/omp-agent`，与 `name` 相等。这个规则跨部署主机也能匹配，不需要 images 仓库反过来知道 remote 目录。tag 和 digest 不进第一版，与 D12-08 一致。

## D38-03 v1：赞成（Main，2026-11-01T21:05:28.730Z）



Coordination 席（Main）对 D38 三行都投赞成。

- **D38-01：** `isDefault` 在 P3 和 remote 里都没有权威源。按 D12:27 的原则，投影应留空、不造数，并列为 D9 输入。AGENTS.md:123 禁止的是 leader 以接口表缺项为由单方把功能移入 D9；本行走的是表决，不在禁止之列。第一版 F 流程走不到默认集群标记，不缩减验收范围。
- **D38-02：** `kind` 直接复用 D12-10 已有的封闭命令名，wire 形状不变。写入由 W-09 负责，投影由 W-10 负责，都在各自白名单内。`HomeEvent` 的必填字段都能确定映射到值。成员事件不进首页，是因为首页三个类别都不对应成员事件，不是删减功能。
- **D38-03：** 用 images README 的发布引用核对过：`pepgent-registry.orb.local:5000/pepgent/omp-agent:latest` 去掉 tag，再去掉首段主机，得到 `pepgent/omp-agent`，与 `name` 相等。这个规则跨部署主机也能匹配，不需要 images 仓库反过来知道 remote 目录。tag 和 digest 不进第一版，与 D12-08 一致。

## D38-02 v2：赞成（Main，2026-11-01T21:20:51.817Z）



Coordination 席（Main）对 D38-02 v2 投赞成。

- **反例已清零：** 节点合入族现在包含全部三个合入命令：`library.merge`、`library.apply`、`agentTemplate.saveVersion`。三者落提交走同一路 merge（D7-11、D12-10）。F29 S2 的 `library.apply` 合入会进入首页和设置页的仓库活动。
- **契约闭合：** “kind 取命令名”这一条规则不变，W-10 对封闭词表做穷尽映射，契约闭合。
- **入口与失效：** 合入事件的入口改用与 `data`/`database` 成对的 `dataset` 弹窗，解决了“文献”标题名不副实的问题。D12-17 的 `library` 频道加上 `home`，首页在合入后会重读。
- **白名单：** wire 形状不变，写方 W-09、读方 W-10 各自在白名单内实现。
