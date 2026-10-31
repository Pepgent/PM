# 导师（LeadMentor）对 D3–D6 的选票，第 1 轮

未列出的行都是“赞成”。反对行写出反例要点与导师提出的修改。

## D3

| ID | 票 | 反例与修改 |
| --- | --- | --- |
| D3-01 | 反对 | 反例：IaC 声明的 peer 已在 NetBird 管理面被撤销。修改：IaC 只是期望声明，NetBird 管理面是 peer 与 route 的运行时权威。许可证：客户端 BSD-3；服务端 AGPLv3，原样自托管须保留许可证与源码入口，修改版经网络提供时须履行源码义务 |
| D3-07 | 反对 | 反例：writer 断线后 process 仍在运行。修改：process 绑定有效 writer；writer 消失时关闭 process 通道 |
| D3-12 | 反对 | 反例：已排队的消息撤回后仍被投递；reader 可伪造 principal。修改：写方持有待投递消息与 message id，投递前可 update/cancel；principal 由 Lab 签发并经 Mux 验证 |
| D3-13 | 反对 | 反例：经 symlink 读出凭据。修改：只暴露能力目录；路径 canonicalize，拒绝 symlink 与 `..`；限制大小 |
| D3-19 | 反对 | 反例：他人抢注端点，或非 Lab 服务发 takeover。修改：注册绑定 writer/session 能力；POST 校验 Lab 服务凭据 |

## D4

| ID | 票 | 反例与修改 |
| --- | --- | --- |
| D4-03 | 反对 | 反例：新中心主机没有 `node_modules`，`Bun.build` 失败。修改：由 packager 按 lockfile 自动恢复依赖，不依赖人工 `bun install` |
| D4-05 | 反对 | 反例：大字符串 atom 撑爆环境变量。修改：调用请求写成 `soroi/call.json` 并经 copy-in 传入，环境变量只传路径 |
| D4-08 | 反对 | 反例：镜像里只有 `omp-rpc-mux`，执行 `pepgent-mux` 找不到命令；exec 形式不展开 `${REMOTE_MOUNT}`。修改：统一用 `omp-rpc-mux`，argv 使用已展开的绝对路径 |
| D4-09 | 反对 | 反例：远程旧版 omp 不支持新 hook。修改：release 带能力 manifest，boot 时校验 |
| D4-10 | 反对 | 反例：`MUX_TOKEN` 被 remote 持久化后被重放。修改：token 一次性、短时有效，日志脱敏 |
| D4-12 | 反对 | 反例：copy-in 先于 `ready`，copy-out 晚于进程退出，现写的嵌套顺序不成立。修改：agent identity ⊃ writer declaration ⊃ remote job/volume ⊃ body ⊃ process generation |
| D4-18 | 反对 | 反例：模板换镜像后误复用旧捕获；`central` 同理。修改：身份使用不可变的环境身份（镜像 digest、模板配置哈希、runtime/ABI） |
| D4-19 | 反对 | 反例：同一调用的两个输出被映射到不同模板。修改：checker 把键归并到调用，模板不同时报 `env_conflict` |

## D5

| ID | 票 | 反例与修改 |
| --- | --- | --- |
| D5-02 | 反对 | 反例：远程镜像烘焙了定制，更新后版本不一致。修改：镜像不烘焙定制，每次 copy-in；在干净 HOME 实测 extension、agent、skill、rule、settings 都能被发现 |
| D5-10 | 反对 | 同 D4-19 |
| D5-11 | 反对 | 反例：checker 读整个运行，绕过可见范围；并发时出现同名输出。修改：checker 使用 supervisor 给出的可见集；store 在提交时复核 |
| D5-12 | 反对 | 反例：worker 提交第一步后批次就被释放。修改：以 `report` 的 `soroi_return` 被接受为锚点；`purpose` 必填 |
| D5-16 | 反对 | 反例：会话停驻后插件不在，通知丢失。修改：Lab 后端订阅 store 并唤醒 session |
| D5-18 | 反对 | 反例：交回 `/etc/passwd` 或经 symlink 读到凭据。修改：限定输出根目录，路径 canonicalize，限制大小 |

## D6

| ID | 票 | 反例与修改 |
| --- | --- | --- |
| D6-03 | 反对 | 反例：`call_inherited` 无法用 `CallOrigin` 表达。修改：增加 `Inherited{sourceRun, sourceStep, sourcePosition, capture}` 变体并穷尽处理 |
| D6-04 | 反对 | 反例：响应丢失后重试造成重复提交。修改：带 `commitId` 的幂等提交 |
| D6-05 | 反对 | 反例：并发 worker A 提交后未消费集为空，运行被提前结束。修改：由 supervisor 持有在途权威，最后一次提交带 `mayClose` |
| D6-07 | 反对 | 反例：提交前 PUT 的对象成为孤儿；恶意 tar。修改：未提交的字节一律进 transfer，提交时 promote；tar 做安全检查；transfer 到期清理 |
| D6-12 | 反对 | 反例：一个 session 产生多个运行，只存 session id 无法区分。修改：Lab 业务库存 run id |
| D6-13 | 反对 | 反例：并发 worker 的根名各不相同，无法对齐。修改：允许显式根映射；按值身份对齐；多候选时返回 `Ambiguous` |
| D6-15 | 反对 | 反例：直接 `remote abort` 丢失远程 transcript。修改：有序停止（abort turn → 关 generation → 进程退出 → copy-out → 确认 → remove），只有超时才强制 |
| D6-18 | 反对 | 反例：受理时刻进入身份，重试后产生第二个身份。修改：使用稳定的 human-event id，时刻只作事实字段 |
| D6-21 | 反对 | 反例：bundle 是转写后的执行物，取不回原始源码。修改：同时保存入口 TS、source map、Git commit、构建 manifest |
| D6-22 | 反对 | 反例：只有 Store 和 Mux 时无法走通远程流程，空 store 也无法自举。修改：分 standalone 与完整 e2e 两个 profile；release artifact 外部导入 |
