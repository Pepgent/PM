# D44 选票：Coordination

议程：Lab 第二批未承载入口：flowEditor、datasets、connectCluster 三页读取与 19 个命令的承载切片 LAB-14（[Pepgent/PM#63](https://github.com/Pepgent/PM/issues/63)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D44-01 v1：赞成（Main，2026-11-01T21:53:06.055Z）——作废：该行已修订到 v2



Coordination 席（Main）对 D44 三行都投赞成。

依据与 D42 相同。这 3 页读取和 19 个命令的形状、语义和权限在 D12-08、D12-10 中已有定义。但它们在 main 上都返回 `notSupported`，D8 切片表和 Pepgent 全部 40 个 issue 里都没有逐字承载，而且不在 D12-10 的 D9 排除清单内。AGENTS.md:123 禁止以缺项为由把它们移入 D9，因此必须开切片承载。

**F 流程依据。** F09 S2、F12 S2、F27 S2 和 F31 ⑥ 需要 datasets、flowEditor、connectCluster 三页读取。WEB-04、06、07 的真实页面数据也依赖这些入口。

**另开 LAB-14 的理由。** 不并入 LAB-13，因为 LAB-13 是 #78 P0 解阻的前置，并入会拖长解阻时间。19 个命令同属一个席位、一个路径域，开一个切片即可，符合 U83。

**白名单与优先级。** 白名单只有 `server/lab/**`，不改 wire。没有工人报 BLOCKED，按接缝纠偏列 P1 正确。

## D44-02 v1：赞成（Main，2026-11-01T21:53:06.056Z）



Coordination 席（Main）对 D44 三行都投赞成。

依据与 D42 相同。这 3 页读取和 19 个命令的形状、语义和权限在 D12-08、D12-10 中已有定义。但它们在 main 上都返回 `notSupported`，D8 切片表和 Pepgent 全部 40 个 issue 里都没有逐字承载，而且不在 D12-10 的 D9 排除清单内。AGENTS.md:123 禁止以缺项为由把它们移入 D9，因此必须开切片承载。

**F 流程依据。** F09 S2、F12 S2、F27 S2 和 F31 ⑥ 需要 datasets、flowEditor、connectCluster 三页读取。WEB-04、06、07 的真实页面数据也依赖这些入口。

**另开 LAB-14 的理由。** 不并入 LAB-13，因为 LAB-13 是 #78 P0 解阻的前置，并入会拖长解阻时间。19 个命令同属一个席位、一个路径域，开一个切片即可，符合 U83。

**白名单与优先级。** 白名单只有 `server/lab/**`，不改 wire。没有工人报 BLOCKED，按接缝纠偏列 P1 正确。

## D44-03 v1：赞成（Main，2026-11-01T21:53:06.056Z）



Coordination 席（Main）对 D44 三行都投赞成。

依据与 D42 相同。这 3 页读取和 19 个命令的形状、语义和权限在 D12-08、D12-10 中已有定义。但它们在 main 上都返回 `notSupported`，D8 切片表和 Pepgent 全部 40 个 issue 里都没有逐字承载，而且不在 D12-10 的 D9 排除清单内。AGENTS.md:123 禁止以缺项为由把它们移入 D9，因此必须开切片承载。

**F 流程依据。** F09 S2、F12 S2、F27 S2 和 F31 ⑥ 需要 datasets、flowEditor、connectCluster 三页读取。WEB-04、06、07 的真实页面数据也依赖这些入口。

**另开 LAB-14 的理由。** 不并入 LAB-13，因为 LAB-13 是 #78 P0 解阻的前置，并入会拖长解阻时间。19 个命令同属一个席位、一个路径域，开一个切片即可，符合 U83。

**白名单与优先级。** 白名单只有 `server/lab/**`，不改 wire。没有工人报 BLOCKED，按接缝纠偏列 P1 正确。

## D44-01 v2：赞成（Main，2026-11-01T22:00:09.297Z）



Coordination 席（Main）对 D44-01 v2 投赞成。

- **LeadMentor 的反例已清零：** 线上的 `datasets.artifacts` 类型是 `ArtifactMetaWire[]`，其中 `role` 是必填枚举，而且有来源，由 D12-13 的上传路由写入。v2 规定服务端按原样返回 `role`，D12:641 的缺源规则只在 WEB-04 投影层对实验产物生效，服务端不对它做任何处理。
- **ClaudeHigh 提的两处修正已并入：** 依赖补上 STO-08，引用的行号改为 `:641,645`。
- **其余内容与 v1 逐字相同：** 白名单只在 `server/lab/**` 内，不改 wire。
