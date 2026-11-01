# D47 选票：ClaudeHigh

议程：deploy#26 BLOCKED 解阻：Pepgent/images 只读凭据改为零人工的只读 deploy key（Lab 双变量接口不变）（[Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D47-01 v1：反对（ClaudeHighD47，2026-11-01T23:22:01.649Z）——作废：该行已修订到 v2

**反例：** ## D47-01 v1 反例：多行私钥经 Komodo Stack environment 注入，`apply` 在部署阶段失败

**失效点**

D47-01 how 的“注入”一步要求 `scripts/central.py variables` 读取 owner 文件 `pepgent-central/images-ssh-key`，**原样**上传为 secret Variable `PEPGENT_CENTRAL_LAB_IMAGES_SSH_KEY`。`komodo/syncs/central.toml` 的 Stack `environment` 再以 `PEPGENT_CENTRAL_LAB_IMAGES_SSH_KEY=[[PEPGENT_CENTRAL_LAB_IMAGES_SSH_KEY]]` 引用这个 Variable，最后由 compose 顶层 `secrets.*.environment` 读取。

ed25519 的 OpenSSH 私钥必然是多行文本：第一行是 `-----BEGIN OPENSSH PRIVATE KEY-----`，中间是几行 base64，最后一行是 `-----END …-----`。本机 `ssh-keygen -t ed25519` 生成的私钥有 `wc -l` = 7 行。这是 D47-01 自己指定的密钥形态，属于主路径，不是边缘输入。

Komodo 处理 Stack environment 的链路如下（moghtech/komodo main 源码）：

1. Core 用 `Interpolator::interpolate_stack` 对 `stack.config.environment` 做**整串**变量替换（`lib/interpolate/src/lib.rs:36-38`）。替换后，私钥的换行进入 environment 文本。
2. `files_on_host = true`（`central.toml:8`）时，periphery 在 `write_stack_files_on_host` 中调用 `stack.config.env_vars()?`（`bin/periphery/src/stack/write.rs:107-108`）。它转到 `environment_vars_from_str`，再到 `parse_key_value_list`。
3. `parse_key_value_list` 按 `\n` 切分 environment，要求每行都能 `split_once(['=', ':'])`。做不到的行会报错 `line {i} missing assignment character ('=' or ':')`（`client/core/rs/src/parsers.rs:46-70`）。`env_vars()` 再把这个错误包装成 `Invalid environment`（`client/core/rs/src/entities/stack.rs:684-686`）。
4. 私钥的 base64 正文行不含 `=` 或 `:`，所以写 env 文件这一步已经失败，DeployStack 随之失败。即使绕过第 3 步，`write_env_file` 也只会把值原样拼成 `KEY=VALUE` 行（`lib/environment/src/lib.rs:29-33`）。docker compose 读取这个 env 文件时，同样在 base64 行报错。

**后果**

整个 `pepgent-central` Stack 都会 `apply` 失败，影响不止 Lab images：lab-web、store、mux 都无法重新部署。这正是 D47-01 自己用来否决“PR#27 先合入”的理由（F3：“合入即让 `variables`、`apply` … 失败”），只是换了一个触发点。

`central.py preview` 发现不了这个问题。它在本地渲染 compose 时，把 environment 当作进程环境字典传入，并使用 `--env-file /dev/null`（`scripts/central.py:264-279`）。此时 `[[…]]` 还没有被替换，不会经过 Komodo 的逐行解析。所以 preview 会通过，问题要到真实 apply 才出现。

**复现**（本机 /tmp，使用一次性密钥，不涉及任何真实凭据）

```sh
mkdir -p /tmp/d47-repro && cd /tmp/d47-repro
ssh-keygen -q -t ed25519 -N '' -C throwaway -f key && wc -l key          # → 7 key
printf 'A=1\nPEPGENT_CENTRAL_LAB_IMAGES_SSH_KEY=%s\nB=2\n' "$(cat key)" > env.txt
# 等价于 Komodo parse_key_value_list 的逐行检查
awk 'NF && $0 !~ /[=:]/ {print "missing assignment character at line " NR-1; exit}' env.txt
#   → komodo parse_key_value_list would fail: line 2 missing assignment character
printf 'services:\n  t:\n    image: busybox\n    secrets: [k]\nsecrets:\n  k:\n    environment: PEPGENT_CENTRAL_LAB_IMAGES_SSH_KEY\n' > compose.yaml
docker compose --env-file env.txt -f compose.yaml config
#   → failed to read …/env.txt: line 6: unexpected character "/" in variable name "…"   (Docker Compose v5.5.0)
```

**建议修订（主路径闭合，比原方案更简）**

沿用本 Stack 已有的 `LAB_ADMIN_CONFIG_FILE` 先例：owner 文件经路径变量 bind 进容器（`compose.yaml:35-39`、`central.toml:31`）。私钥不再经过 Variable 或 env 文件：

- `central.toml` 的 environment 增加 `LAB_IMAGES_SSH_KEY_FILE=/Users/mouriya/Ext/work/orbstack/pepgent-central/images-ssh-key`，值只是路径，不是机密。
- compose 顶层写 `secrets.pepgent-images-ssh-key.file: ${LAB_IMAGES_SSH_KEY_FILE:?…}`，只挂进 lab-web，路径为 `/run/secrets/pepgent-images-ssh-key`。在非 swarm 模式下，这种 secret 是只读 bind 挂载。本机 `docker compose config` 已能正确渲染 `secrets.file` 加 `configs.content` 的组合。
- `central.py variables` 只核对 owner 文件存在且权限为 0600，不上传，也不新增 secret Variable。
- 验收 3 改为：Stack environment 和 Komodo Variables 里都没有私钥，只有路径。验收 4、5 同理改写。

其余设计保持不变：ssh 别名 `pepgent-images`、configs 内联的 `ssh_config.d` 片段与 known_hosts、`PEPGENT_LAB_IMAGES_REMOTE: pepgent-images:Pepgent/images.git`，以及 Lab 的双变量接口。


# D47 ClaudeHigh 席选票（ClaudeHighD47，空白历史）

我核对的源头都取自 GitHub 当前内容，tarball 解压在 `/tmp/d47-src`：
- [PM#66](https://github.com/Pepgent/PM/issues/66) 的决策项表；
- PM 的 `evidence/decisions/D46-pepgent80-blocked.md:29`；
- [deploy#26](https://github.com/Pepgent/deploy/issues/26) 的正文和 BLOCKED 评论；
- [deploy PR#27](https://github.com/Pepgent/deploy/pull/27) 的 diff；
- deploy main 的 `stacks/pepgent-central/compose.yaml`、`lab-entrypoint.sh`、`komodo/syncs/central.toml`、`scripts/central.py`；
- images main 的 `Dockerfile`；
- Pepgent main 的 `apps/web/src/server/lab/images.ts` 与 `runtime.ts`；
- moghtech/komodo main 中处理 Stack environment 的源码。

## D47-01 v1：oppose（反例见 counter）

**已闭合的部分（steady）**

- **Lab 的 git 调用。** `images.ts:65-88` 只做这几步：执行 `git clone -- <remote> .`，用 `remote get-url origin` 与 remote 字符串比较是否相等，再执行 `status --porcelain`、`fetch origin HEAD` 和 `merge --ff-only FETCH_HEAD`。调用时环境为 `{...process.env, GIT_TERMINAL_PROMPT: '0'}`，不清空 HOME/PATH，也不限制协议。git 把 `pepgent-images:Pepgent/images.git` 识别为 scp 式 ssh 远端，`get-url` 原样返回这个字符串，相等比较成立。`runtime.ts:55-60` 只要求 remote 非空。因此 Lab 后端只凭这一个值就能 clone 和快进，D46-02 的双变量接口不变。
- **ssh 别名与 known_hosts。** Debian 的 `/etc/ssh/ssh_config` 开头是 `Include /etc/ssh/ssh_config.d/*.conf`（F9）。`Host pepgent-images` 只对别名生效，不影响 Lab 库和会话工作树的 git 调用。ssh 按 `HostName github.com` 查 `UserKnownHostsFile`，所以 known_hosts 写 `github.com` 条目是正确的。lab-web 没有 `user:`，沿用镜像的 `USER agent`（uid 1000）。compose 以 `environment`/`content` 注入的 secret/config，默认以 root 所有、0444 拷入容器。ssh 只在私钥属于当前用户时才检查 `077` 权限位，因此这种 root 所有的私钥可读且可用。
- **compose 的 secret/config 挂载（非 swarm）。** 本机 Docker Compose v5.5.0 的 `docker compose config` 能渲染 `configs.content` 和 `secrets.file`/`secrets.environment` 的组合。

**断裂点（steady，主路径）**

私钥经 Komodo Stack environment 注入这一步走不通。ed25519 的 OpenSSH 私钥固定是多行文本。Komodo 先对 environment 做整串插值，再按行解析成 `KEY=VALUE`，遇到 base64 行会报 `missing assignment character`，DeployStack 因此失败，整个 `pepgent-central` Stack 都会 apply 失败。`preview` 渲染时不经过这条解析路径，所以发现不了。反例全文、源码行号和本机复现见 counter。

**发散立场的主张**

上面的问题有更简单的主路径：沿用本 Stack 已有的 `LAB_ADMIN_CONFIG_FILE` 先例，把 owner 文件经路径变量 bind 成 compose `secrets.file`。这样不新增 Variable，私钥也不进 Komodo DB 和 env 文件，`central.py` 只需核对 owner 文件存在且权限为 0600。按此修订成 v2 后，其余设计（deploy key 的签发与轮换、ssh 别名、configs 内联、远端字面值、双变量接口）我都赞成。

## D47-02 v1：approve

`lab-web` stage 的主路径是闭合的：
- 它 `FROM node-runtime`（`Dockerfile:44-50,90-94`），基于 Debian 并已带 git。
- 加装 `openssh-client` 后有 `ssh` 和 `/etc/ssh/ssh_config.d/`，D47-01 的别名片段可以挂进来。
- 镜像不带凭据，验收命令能覆盖。
- 无论 D47-01 v2 用哪种注入形态，只要走 deploy key，都需要这个包，所以本行不依赖 D47-01 的修订。

两点实现提示，不影响投票：
1. PM#66 引用的锚点 `Dockerfile:68` 已过时，images main 上 `lab-web` stage 在 `:90`。
2. `node-runtime` 末尾是 `USER agent`。在 `lab-web` stage 装包要先切到 `USER root`，装完切回 `USER agent`，与 `node-runtime:45-50` 的写法相同。


## D47-02 v1：赞成（ClaudeHighD47，2026-11-01T23:22:01.650Z）



# D47 ClaudeHigh 席选票（ClaudeHighD47，空白历史）

我核对的源头都取自 GitHub 当前内容，tarball 解压在 `/tmp/d47-src`：
- [PM#66](https://github.com/Pepgent/PM/issues/66) 的决策项表；
- PM 的 `evidence/decisions/D46-pepgent80-blocked.md:29`；
- [deploy#26](https://github.com/Pepgent/deploy/issues/26) 的正文和 BLOCKED 评论；
- [deploy PR#27](https://github.com/Pepgent/deploy/pull/27) 的 diff；
- deploy main 的 `stacks/pepgent-central/compose.yaml`、`lab-entrypoint.sh`、`komodo/syncs/central.toml`、`scripts/central.py`；
- images main 的 `Dockerfile`；
- Pepgent main 的 `apps/web/src/server/lab/images.ts` 与 `runtime.ts`；
- moghtech/komodo main 中处理 Stack environment 的源码。

## D47-01 v1：oppose（反例见 counter）

**已闭合的部分（steady）**

- **Lab 的 git 调用。** `images.ts:65-88` 只做这几步：执行 `git clone -- <remote> .`，用 `remote get-url origin` 与 remote 字符串比较是否相等，再执行 `status --porcelain`、`fetch origin HEAD` 和 `merge --ff-only FETCH_HEAD`。调用时环境为 `{...process.env, GIT_TERMINAL_PROMPT: '0'}`，不清空 HOME/PATH，也不限制协议。git 把 `pepgent-images:Pepgent/images.git` 识别为 scp 式 ssh 远端，`get-url` 原样返回这个字符串，相等比较成立。`runtime.ts:55-60` 只要求 remote 非空。因此 Lab 后端只凭这一个值就能 clone 和快进，D46-02 的双变量接口不变。
- **ssh 别名与 known_hosts。** Debian 的 `/etc/ssh/ssh_config` 开头是 `Include /etc/ssh/ssh_config.d/*.conf`（F9）。`Host pepgent-images` 只对别名生效，不影响 Lab 库和会话工作树的 git 调用。ssh 按 `HostName github.com` 查 `UserKnownHostsFile`，所以 known_hosts 写 `github.com` 条目是正确的。lab-web 没有 `user:`，沿用镜像的 `USER agent`（uid 1000）。compose 以 `environment`/`content` 注入的 secret/config，默认以 root 所有、0444 拷入容器。ssh 只在私钥属于当前用户时才检查 `077` 权限位，因此这种 root 所有的私钥可读且可用。
- **compose 的 secret/config 挂载（非 swarm）。** 本机 Docker Compose v5.5.0 的 `docker compose config` 能渲染 `configs.content` 和 `secrets.file`/`secrets.environment` 的组合。

**断裂点（steady，主路径）**

私钥经 Komodo Stack environment 注入这一步走不通。ed25519 的 OpenSSH 私钥固定是多行文本。Komodo 先对 environment 做整串插值，再按行解析成 `KEY=VALUE`，遇到 base64 行会报 `missing assignment character`，DeployStack 因此失败，整个 `pepgent-central` Stack 都会 apply 失败。`preview` 渲染时不经过这条解析路径，所以发现不了。反例全文、源码行号和本机复现见 counter。

**发散立场的主张**

上面的问题有更简单的主路径：沿用本 Stack 已有的 `LAB_ADMIN_CONFIG_FILE` 先例，把 owner 文件经路径变量 bind 成 compose `secrets.file`。这样不新增 Variable，私钥也不进 Komodo DB 和 env 文件，`central.py` 只需核对 owner 文件存在且权限为 0600。按此修订成 v2 后，其余设计（deploy key 的签发与轮换、ssh 别名、configs 内联、远端字面值、双变量接口）我都赞成。

## D47-02 v1：approve

`lab-web` stage 的主路径是闭合的：
- 它 `FROM node-runtime`（`Dockerfile:44-50,90-94`），基于 Debian 并已带 git。
- 加装 `openssh-client` 后有 `ssh` 和 `/etc/ssh/ssh_config.d/`，D47-01 的别名片段可以挂进来。
- 镜像不带凭据，验收命令能覆盖。
- 无论 D47-01 v2 用哪种注入形态，只要走 deploy key，都需要这个包，所以本行不依赖 D47-01 的修订。

两点实现提示，不影响投票：
1. PM#66 引用的锚点 `Dockerfile:68` 已过时，images main 上 `lab-web` stage 在 `:90`。
2. `node-runtime` 末尾是 `USER agent`。在 `lab-web` stage 装包要先切到 `USER root`，装完切回 `USER agent`，与 `node-runtime:45-50` 的写法相同。


## D47-01 v2：赞成（ClaudeHighD47v2，2026-11-01T23:35:18.419Z）



### ClaudeHigh（ClaudeHighD47v2）对 D47-01 v2：赞成

空白历史实例，直读 PM#66 当前正文、评论 6565502482 / 6565503019、deploy main 的 `compose.yaml` / `central.toml` / `central.py` / `README.md`、PR#27 当前 diff、Pepgent main `apps/web/src/server/lab/images.ts` 与 `lab/runtime.ts`、images main `Dockerfile`、台账 `pepgent-central.md` / `pepgent-komodo.md`。未读任何凭据值。

**1. v1 多行私钥反例已消除（steady）。** v2 的 Stack environment 只多一行单行 `LAB_IMAGES_SSH_KEY_FILE=/Users/.../images-ssh-key`，满足 Komodo 2.3.4 `parse_key_value_list` 的逐行 `NAME=value` 要求，与现有 `LAB_ADMIN_CONFIG_FILE=`（`central.toml:31`）同型。私钥字节不再经过 Variable、Stack environment 或 periphery env 文件，不再走那条逐行解析。我的原反例因此清零。

**2. 先例挂载语义在本机成立（运行时元数据，未读值）。**
- `docker inspect pepgent-central-auth-seed`：`exited exit=0 user=agent`，挂载 `bind /Users/mouriya/Ext/work/orbstack/pepgent-central/lab-admin.json -> /run/secrets/lab-admin.json rw=false`。
- 宿主 `stat`：该文件 `600 mouriya`，目录 `700`。这说明 Komodo 经 periphery 部署时，UID1000 能读到宿主 0600 owner 文件的只读 bind。
- `docker exec pepgent-central-lab-web`：`uid=1000(agent)`；同类 0600 宿主 bind 在容器内显示为 `600 1000:1000 /run/config/models.yml` 且 readable；`getent passwd 1000` 输出 `agent:x:1000:1000::/home/agent:/bin/bash`。
- 因此私钥在容器内会是属主等于调用者、mode 0600 的文件。OpenSSH `sshkey_perm_ok` 只在“属主为调用者且 `mode & 077 != 0`”时拒绝，这里通过。ssh 要求的 passwd 条目也存在。

**3. 渲染验证（本机 Compose v5.5.0，periphery 为 v5.6.1，均支持 `configs.content`）。**
- `/tmp/d47v2/render.py` 在 deploy main 的 compose 上叠加 PR#27 的 `PEPGENT_LAB_IMAGES_HOME`，再按 v2 原文加入字面 remote、service 级 bind、两份 content config 与 central.toml 路径行。
- 用 `central_identity()` 的同一调用（`--env-file /dev/null`，env 只取 central.toml 行）渲染：exit 0。bind 渲染为 `{"type":"bind","source":"/Users/mouriya/Ext/work/orbstack/pepgent-central/images-ssh-key","target":"/run/secrets/pepgent-images-ssh-key","read_only":true,"bind":{"create_host_path":false}}`，只出现在 lab-web。
- `central_identity()` 的身份文件收集逻辑原样执行，仍只取三份 D13 文件，新 bind 与 content config 不进投影，`SOROI_CENTRAL_CONFIG_DIGEST` 不因本行改变（与 README:64“凭据不进投影”一致）。
- 去掉 `LAB_IMAGES_SSH_KEY_FILE` 后渲染以 `required variable LAB_IMAGES_SSH_KEY_FILE is missing a value: set owner-only images deploy key` 停止，与先例同型。

**4. Lab 后端主路径闭合。**
- `runtime.ts:55-59` 只要求 `PEPGENT_LAB_IMAGES_REMOTE` 非空，不校验 URL 形态。
- `images.ts` 执行 `git clone -- <remote> .`，并要求 `remote get-url origin` 与该值逐字相等。scp 形态 `pepgent-images:Pepgent/images.git` 满足这两点。
- git 的 env 是 `process.env` 加 `GIT_TERMINAL_PROMPT=0`，不清空 env，也不设 `GIT_SSH_COMMAND`；`lab-entrypoint.sh` 同样不触碰 ssh/git 配置。
- Debian ssh_config 首行 `Include /etc/ssh/ssh_config.d/*.conf`，所以别名块先于 `Host *` 生效；known_hosts 按 HostName `github.com` 匹配，`api.github.com/meta` 当前公布 ed25519/ecdsa/rsa 三把主机公钥。
- 镜像侧 ssh 客户端由已通过的 D47-02 提供；apply 时 `central_identity()` 把 `lab-web:latest` 解析成 digest，D47-02 发布后的 apply 即取到带 ssh 的镜像。

**5. 零人工签发可达（F8 复核）。** `gh api repos/Pepgent/images` → `private=true admin=true`；`GET /repos/Pepgent/images/keys` 可读（当前 0 把）。只读 deploy key 可由 RiriAgent 经 REST 注册。

**6. LeadMentor 持久源反例：我认同反驳。** 台账 `pepgent-komodo.md:3` 写明“No homelab/production connections, credentials, or SOPS inputs”；本 Stack 现有 5 份凭据全在 0700 的 `pepgent-central/` 下，均为 0600；`remote-api.json` 同样是“向外部系统签发后存 owner 文件”的模式。新私钥与它们同源，不另立第二套持久源。

**7. divergent 立场。** 我找不到更短的主路径：
- 容器级 `GIT_SSH_COMMAND` 或 git 全局配置会作用到 Lab 库和会话 git；
- 向 Lab 加凭据变量会改 D46-02 接口；
- 宿主镜像仓需要 compose 外动作。
v2 是只改 deploy、Lab 零改动、单别名生效的最小闭合。

**落地时顺带做（不构成反例，不影响主路径）：**
- (a) PR#27 加的 `central.toml` 行 `PEPGENT_CENTRAL_LAB_IMAGES_REMOTE=[[PEPGENT_CENTRAL_LAB_IMAGES_REMOTE]]` 随 `images_remote()` 一起删除，满足验收 3“Stack environment 只有路径”。
- (b) `ssh-keygen -t ed25519 -N ''`，无口令，保证非交互 clone。
- (c) README:70 与台账 `pepgent-central.md:14` 现写“只挂入 seed，never Web”。新增挂入 Web 的私钥 owner 文件后，两处的 owner 文件清单需同步，台账同属 deploy 席维护范围。

