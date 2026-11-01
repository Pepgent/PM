## 必须先读

- Parent：[IMG-04 完整交付](https://github.com/Pepgent/images/issues/3)，完整验收不由基础镜像合并代替。
- [D7-03、D7-19](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md#L63)：认证 owner 与部署安装顺序。
- [D8-03、IMG-04](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#L74)：安装后扩展工具探针与完整容器验收。
- 交付顺序依据：LEDGER U32（“引入过多的中间环节做e2e而不是把东西开发好后再做e2e测试是你一开始规划的就有问题”）与 Argon D10 意图裁决 1.1【定】：开发期只做本仓检查，跨组件 live 验收在全部组件开发完成后的统一 e2e 阶段执行。

## 目标与使用场景

让 lab-web 镜像具备真实部署所需的包装：保留应用 seed bin 读取的 `apps/web/resources/lab/migrations`，支持“先 seed 退出、installer 成功后 exec Node”的启动顺序，不复制认证、安装器或工具注册逻辑。

## 上下文与问题

基础镜像由 https://github.com/Pepgent/images/issues/5 交付；[LAB-03](https://github.com/Pepgent/Pepgent/issues/12) 已由 https://github.com/Pepgent/Pepgent/pull/38 合并，交付 Better Auth、`/api/auth/*` 和 public seed CLI。应用 seed bin 读取 `apps/web/resources/lab/migrations`，现有镜像尚未保留该目录；包装修复归本 child。认证输入与先 seed 后 serving 的部署生命周期归 https://github.com/Pepgent/deploy/issues/8 。真实 Soroi 发行由 [DIST-01](https://github.com/Pepgent/soroi/issues/199) 维护。禁止新增假认证、假发行物或本地工具注册实现。

## 责任与必要决策

本 child 只负责 images 的构建/运行包装。

继承根裁决：源码仅从 origin/main 的干净 checkout 导出已提交文件，构建上下文不包含 `.git`、本机 node_modules/dist 或未跟踪 `.env`。镜像不烘焙用户定制、目录或凭据；部署方在同一 HOME 上先执行 installer 再 exec Node。

## 预期结果

1. 以 LAB-03 合并后的真实 Web 产物重建 lab-web，镜像内保留 migrations 目录，不带个人定制或静态凭据。
2. 在本机用该镜像运行 public seed CLI，seed 成功写入本地 lab.sqlite 后退出；随后同一 HOME 启动 Node 并监听。

## 验收标准

| # | Dimension | Check | Command / path | Env | Expect |
|---|---|---|---|---|---|
| 1 | build | 结果1：镜像包装 | 从干净 origin/main 导出源码构建 lab-web；在容器内列出 migrations 目录 | 本机构建 | 目录存在；镜像无凭据 |
| 2 | runtime | 结果2：seed 后启动 | 本机运行镜像：执行 seed CLI（本地临时 secret）→ 退出码 0 → exec `node /opt/pepgent/apps/web/bin/pepgent-web.mjs`，请求 `/api/auth/get-session` | 本机容器，本地临时 HOME | seed 成功；Node 监听；auth 端点返回 Better Auth 响应；保留命令与输出进 PR |

## 统一 e2e 阶段承接的验收

IMG-04 原验收中的跨组件部分——真实部署入口 `bun /release/install.ts --home /home/agent` 后 exec Node、浏览器真实登录与刷新保持会话、无会话拒绝、同容器 omp 工具清单含 `soroi_eval`/`soroi_task` 并可调用——不在开发期执行，由全部组件开发完成后的统一 e2e 阶段（A0 与 S2）执行并留证。范围不缩减；parent #3 在该阶段验证后关闭。

## 依赖关系

Depends on: https://github.com/Pepgent/images/issues/5（已发布可运行镜像）；https://github.com/Pepgent/Pepgent/issues/12（真实认证与 seed CLI）。
