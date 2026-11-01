# Pepgent#43 W-09 BLOCKED 初审分类（治理分身 PhaseBClone_ffeb 会同双核）

来源：https://github.com/Pepgent/Pepgent/issues/43#issuecomment-6558582979

LEDGER（`28dcb24`）核对：
- C2-1、D15-12：主会话不分类，由治理分身会同双核初审。
- D16-01 修订后的 D10-08：领导层类别包括意图、范围、公开契约、权限、状态与生命周期、部署前提、验收语义。
- C1-3、C2-4（U83）：已写入的规则直接执行，不另设关卡。
- D16-09：路径白名单。

## 结论

五项都是为落实已通过契约（D12-01、D12-03）所需的机械补全，不新增也不改变公开契约、权限语义或验收范围，因此不需要三族表决。

处理方式：把 W-09 的 D16-09 白名单扩展到下列具体文件。W-10 以及其他席位都不写这些文件，不会形成共写。

| 项 | 涉及文件（扩入 W-09 白名单） | 分类理由 | 处理 |
| --- | --- | --- | --- |
| C1 | `apps/web/scripts/check-renderer-architecture.mjs` | D12-01 已规定 `protocol/lab/external/store.ts` 从 store contract 导入，并且不复制 schema。checker 的规则早于 D12，加一条窄例外是在落实已通过的契约 | 只允许 `src/protocol/lab/external/store.ts` 依赖 `soroi/contract` |
| C4 | `scripts/generate-third-party-notices.mjs` | soroi 是 Pepgent 组织的第一方私有依赖，不是第三方。给 soroi 补 license 字段等于替一个私有仓选定许可证，属于许可证选择，不在 D16 范围内；改在 notices 脚本里豁免，可以不碰这个选择 | 豁免 Pepgent 组织的第一方 git 依赖，soroi 的 `package.json` 不动 |
| G1 | `apps/web/scripts/generate-lab-external.mjs`；`apps/web/package.json` 中对应的 generate/check 脚本项 | 用于落实 D12-01“remote、omp 类型由 schema 生成”的构建期工具；`apps/web/package.json` 本来就在 W-09 白名单内 | 按 W-09 的三件套方案执行 |
| C2 | `apps/web/src/app/start.ts` | D12-03 的 server function 应进入已定义的 Lab 认证域；这一步只是登记，不改变权限语义 | W-09 改一次：改用 `rpc/lab.ts` 导出的 Lab server function 集合；之后新增函数只改白名单内的文件 |
| C3 | `apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`、`docs/conventions/03-typescript-react-style.md` | 文档随实现直接替换（GIT 规范“文档里不留遗留层”） | W-09 在同一次交付中替换 `not_supported` 的描述 |

## 复核

`x-open` 采用 `z.looseObject`，判别键必填。这是 W-09 在白名单内的私有实现，符合 rpc.md 中“Wire schema”一节，无需分类。
