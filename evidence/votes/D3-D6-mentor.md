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
# D3 后续轮次

## 第 2 轮（按修订行重投）

第 2 轮重投 `D3-01`、`D3-04`、`D3-05`、`D3-06`、`D3-09`、`D3-12`、`D3-13`、`D3-14`、`D3-15`、`D3-16`、`D3-17`、`D3-19`。其中 `D3-12` 仍反对，其余 11 行赞成；第 1 轮已赞成且未改动的行维持赞成。

| ID | 票 | 理由 / 反例与修改 |
| --- | --- | --- |
| D3-01 | 赞成 | 已明确 IaC 声明只是期望，NetBird 管理面是 peer 与 route 的运行时权威，并补充官方构件与许可证义务。 |
| D3-04 | 赞成 | 已收窄为 dial 的拉起、持有 stdio、出站连接和按行转发，远程模板入口交由 D4-08，删除 Attach/Accept 的第二套约定。 |
| D3-05 | 赞成 | 已区分 RPC/mux 的 text 消息与文件字节的 binary 消息，文件响应可经 mux 原样转发。 |
| D3-06 | 赞成 | 已补充由部署 mux 的一方注入凭据，兼容 Pepgent 环境和 soroi 独立 compose；读方的人类 IRC 帧只转给写方。 |
| D3-09 | 赞成 | 实现位置已迁入 `Pepgent/soroi` 的 `packages/omp-soroi`，`#launch` 的步骤数已改为六步。 |
| D3-12 | 反对 | 反例：根 agent 的待投递表没有明确持有方，根会话的人类消息进入队列后，谁负责 `edit`、`withdraw`、`deliver` 不可确定，待投递状态没有唯一权威。修改：明确根 agent 的写方是 Lab 后端，子 agent 的写方是父进程的 subagent supervisor，并让两者实现同一套待投递契约。 |
| D3-13 | 赞成 | 已改为只拉取，按 `--expose` 声明能力目录读取已完成改名的批次；mux 原样搬运 binary，不推送 `mux_batch`。 |
| D3-14 | 赞成 | 可启动模板的判据统一引用 D4-17，不再建立第二份模板登记或识别规则。 |
| D3-15 | 赞成 | 已按写方声明和进程代分别建模，停驻 agent 保留写方声明，快照与事件流的生命周期一致。 |
| D3-16 | 赞成 | 已明确 Program 即使位于带 mux 二进制的约定镜像中也不调用 dial，仍只经独立网络层访问 store。 |
| D3-17 | 赞成 | agent 镜像只含 omp 与 `omp-rpc-mux`，soroi 定制和 `.omp/` 每次启动随 copy-in 带入，不再产生镜像内的第二份定制。 |
| D3-19 | 赞成 | 端点按写 eval 会话的 session id 命名，并绑定写方声明与进程代；停驻时由写方先开新代再注册，根端点负责回答 `writers(runId)`。 |

## 第 3 轮（按最新修订行重投）

重投 `D3-04`、`D3-12`，两行均赞成。`D3-04` 已补齐远程入口的 `--expose soroi-batch [--expose <产物目录>]`；`D3-12` 已收口为写方契约：根 agent 的待投递表由 Lab 后端持有，子 agent 的待投递表由父进程的 subagent supervisor 持有，两者统一实现 `enqueue / edit / withdraw / deliver`，投递后进入 transcript 成为不可变事实。

| ID | 票 | 理由 / 反例与修改 |
| --- | --- | --- |
| D3-04 | 赞成 | `boot.js` 在 `SOROI_CALL=agent` 时 exec 带 `--expose soroi-batch [--expose <产物目录>]` 的 dial，和 D3-13 的能力目录闭合。 |
| D3-12 | 赞成 | 根与子 agent 的待投递表均有唯一写方持有者；根以带 `human:<principal>` 来源的普通 prompt 投递，子 agent 经内置 IRC bus 投递，投递前可编辑或撤回，已回应第 2 轮“根表无主”的反例。 |

## 第 4 轮（按最新修订行重投）

重投 `D3-10`，赞成。Lab 后端作为根会话唯一写方，可在 `ready` 后按 D3-06 经写方通道注册 Pepgent 的 host tools，工具清单由 D7 负责，不改变 D3 的边界。

| ID | 票 | 理由 / 反例与修改 |
| --- | --- | --- |
| D3-10 | 赞成 | 新增的 `set_host_tools` 注册与写方权限、D3-09 的启动顺序一致；根会话由 Lab 后端持有写方，host 工具清单交 D7，路径和归属均闭合。 |

## D3 导师最终计票

第 1 轮反对 5 行（D3-01、D3-07、D3-12、D3-13、D3-19）；第 2 轮对 12 个修订行投出 11 赞成、1 反对（D3-12）；第 3 轮对 D3-04、D3-12 投出 2 赞成；第 4 轮对 D3-10 投出 1 赞成。至此 D3-01 至 D3-19 全部为导师赞成，无否决。
# D6 后续轮次

## 第 2 轮（按导师第 1 轮反例与修订重投）

第 2 轮重投 `D6-03`、`D6-04`、`D6-05`、`D6-07`、`D6-08`、`D6-10`、`D6-12`、`D6-13`、`D6-14`、`D6-15`、`D6-16`、`D6-17`、`D6-18`、`D6-21`、`D6-22`。其中 `D6-03`、`D6-04`、`D6-07`、`D6-08`、`D6-12`、`D6-14`、`D6-15`、`D6-16`、`D6-17`、`D6-18`、`D6-21`、`D6-22` 赞成；`D6-05`、`D6-10`、`D6-13` 仍反对：

| ID | 票 | 反例与修改 |
| --- | --- | --- |
| D6-05 | 反对 | 反例：并发 worker 中，一个 worker 提交后未消费集合暂时为空，运行被提前结束。修改：运行结束须由 supervisor 确认没有活动写方、store 确认没有未消费 atom，不能把结束确认绑定到某一个 worker 的步提交。 |
| D6-10 | 反对 | 反例：只按提交序号投影无法回答按原始时刻回看的运行活动，运行开始锚点与活动时间线的语义会冲突。修改：拆成按提交序号投影的运行图与按调用原始时刻重建的活动时间线。 |
| D6-13 | 反对 | 反例：两侧候选数量相同也可能不是同一调用，按顺序配对会错配。修改：只有值身份、继承来源或显式映射能唯一消歧时才配对，否则返回 `Ambiguous`。 |

## 第 3 轮（按第 2 轮主路径反例修订重投）

第 3 轮重投 `D6-03`、`D6-05`、`D6-07`、`D6-10`、`D6-13`、`D6-15`、`D6-16`、`D6-18`、`D6-22`，9 行全部赞成。`D6-05` 已将结束确认从步提交移到根会话 supervisor 的单独结束请求，并由 store 在请求事务中核对未消费集合；`D6-10` 已拆分运行图与活动时间线；`D6-13` 已禁止按提交顺序配对并在无法唯一消歧时返回 `Ambiguous`。其余修订行已回应前两轮反例，导师均赞成。

## 第 4 轮（按第 3 轮主路径反例修订重投）

第 4 轮重投 `D6-05`、`D6-16`，两行均赞成。`D6-05` 的独立 `POST /runs/{run}/end` 与双权威确认已覆盖最后一步由 worker 提交的场景；`D6-16` 已明确派生期间 supervisor 不发送父运行的结束确认，父运行随后由派生事务写入 `run_aborted`。

## D6 导师最终计票

第 1 轮反对 10 行（`D6-03`、`D6-04`、`D6-05`、`D6-07`、`D6-12`、`D6-13`、`D6-15`、`D6-18`、`D6-21`、`D6-22`）；第 2 轮对 15 个修订行投出 12 赞成、3 反对（`D6-05`、`D6-10`、`D6-13`）；第 3 轮对 9 个修订行投出 9 赞成；第 4 轮对 `D6-05`、`D6-16` 投出 2 赞成。至此 D6-01 至 D6-22 全部为导师赞成，无否决。
