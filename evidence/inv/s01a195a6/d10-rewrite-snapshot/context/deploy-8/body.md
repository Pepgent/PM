## 必须先读

- Parent：[IMG-04 lab-web 镜像](https://github.com/Pepgent/images/issues/3)。本 child 承担 deploy 的认证输入与 seed/serving 生命周期，不实现应用认证。镜像侧 migrations 包装由 [images #6](https://github.com/Pepgent/images/issues/6) 交付。
- [LAB-03 已合并实现](https://github.com/Pepgent/Pepgent/pull/38)：官方 seed、登录、会话及重复初始化语义。
- [D7 Lab 后端](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D7-lab-backend.md)：D7-03、D7-19 的认证归属与安装顺序。
- 交付顺序依据：LEDGER U32（“引入过多的中间环节做e2e而不是把东西开发好后再做e2e测试是你一开始规划的就有问题”）与 Argon D10 意图裁决 1.1【定】：开发期只做本仓检查，跨组件 live 验收在全部组件开发完成后的统一 e2e 阶段执行。

## 目标与使用场景

部署现有独立 pepgent-central 时，管理员初始化使用真实生产镜像与既有 Lab 数据卷，在 Web serving 之前成功结束；部署重跑后仍使用同一持久身份。管理员私有 JSON 不暴露给长期 Web 服务。

## 上下文与问题

Repo：Pepgent/deploy。现有 central.py 的 RunSync→DeployStack 路径没有 LAB-03 所需的 auth inputs 或 seed lifecycle。直接换新镜像会因缺少 BETTER_AUTH_SECRET/URL 失败。仅增加 depends_on 不足以停止重部署前已运行的 Web，不能保证同一 SQLite 上 seed 与 serving 顺序执行。

实施前核对 scripts/central.py 的 inject/apply、stacks/pepgent-central/compose.yaml 与 lab-entrypoint.sh。应用 owner 的 apps/web/bin/pepgent-lab-seed.mjs 公开 CLI 使用同一 built server，并从 ../resources/lab/migrations 读取迁移；npm seed:lab-admin 只是无 hooks 的 Node 包装，生产镜像无需 npm。

## 责任与必要决策

- deploy 是消费者；账户、密码、组织、membership 和 seed 幂等行为由应用维护，部署不直接写 DB。镜像的迁移资源打包由 images #6 交付。
- stable auth secret 与管理员 JSON 首次在部署 owner 目录生成并保存（0700目录、0600文件），后续保留，不自动轮换、重置或提权；auth secret 经 secret Komodo Variable 注入，不解密 SOPS、不要求操作员粘贴密码。
- origin 固定为当前真实浏览器入口 http://127.0.0.1:59410。seed 与 Web 指向同一个既有 lab-db 卷及 PEPGENT_LAB_HOME，不新建/替换九个持久卷。
- 每次合法部署均通过 central.py：RunSync/读回→仅 StopStack services=[lab-web] 并等待 Complete→DeployStack。webhook、auto update 和 Sync deploy 保持关闭，不能另从无 stop 的路径重部署。
- one-shot auth-seed 使用镜像公共 Node bin、只读 owner-only JSON 和 auth secret/URL，restart=no，依赖 state-init 成功；Web 依赖 auth-seed 成功。长期 Web 不挂管理员 JSON，不获得管理员密码。seed 失败时不从旁路启动 Web，不使用 marker、锁、重试或 fallback。
- 继续在 Web 的同一 HOME 先安装真实 Soroi 发行，再 exec Node；不改写发行或工具注册业务。

## 预期结果

1. 新镜像可从同一持久 Lab 数据库初始化真实 owner；重复部署验证既有密码与 owner membership，不增加重复用户/组织/member，不重置既有身份。
2. 旧 Web 停止后 seed 才运行，seed 成功退出后新 Web 才启动；store、Mux 及 S1 的运行生命周期不变。
3. 管理员 JSON 只存在于 seed 输入挂载，Web 无该挂载或密码 env。

## 不应残留

不保留无认证启动示例、静态 secret、seed-installed marker、npm install/build-on-start、直接 DB 写入或手工 UI bootstrap。不得改动 S1、删除持久卷、扩展四角色业务或把 fixture 页面当成真实业务 catalog。

## 验收标准（本仓检查）

| # | Dimension | Check | Command / path | Env | Expect |
|---|---|---|---|---|---|
| 1 | environment | 结果1/2：部署终态与顺序 | `python3 scripts/central.py variables --release <owner真实tar>`；`preview/apply --branch <已push分支>` | 既有隔离 Core/central | service-scoped StopStack 与 DeployStack Complete/success；seed exit0，Web StartedAt 晚于 seed FinishedAt；store/mux ID与StartedAt不变 |
| 2 | environment | 结果1：重复 seed 与持久身份 | 同一入口第二次 apply；只读 DB 计数 | 同一 Lab volume、auth secret、bootstrap JSON | seed 重复成功，user/organization/member 计数与身份不变 |
| 3 | environment | 结果3：凭据最小暴露 | inspect seed/Web 的实际 mounts/env，仅输出字段存在性、UID/mode | 真实运行容器 | seed UID1000读600文件；Web没有seed JSON挂载或管理员密码env；无secret输出 |

## 统一 e2e 阶段承接的验收

真实浏览器路径——Yab `/sign-in` 邮箱密码登录→进入 Lab→刷新后 `/api/auth/get-session` 仍有效、无会话访问 Lab 被拒绝、重复部署后登录会话仍有效——属于跨组件（deploy + Pepgent + images）验收，不在开发期执行，由全部组件开发完成后的统一 e2e 阶段（S2）执行并留证，写回 parent [images #3](https://github.com/Pepgent/images/issues/3)。范围不缩减。

## 依赖关系

- Depends on: https://github.com/Pepgent/Pepgent/issues/12（已合并真实认证与public seed实现）。
- Depends on: https://github.com/Pepgent/images/issues/6（含迁移资源的镜像）。
