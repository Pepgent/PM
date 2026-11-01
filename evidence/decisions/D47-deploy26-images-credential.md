# D47：deploy#26 BLOCKED 解阻：Pepgent/images 只读凭据改为零人工的只读 deploy key（Lab 双变量接口不变）（P0）——定稿

决策 issue：[Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)。发起：Coordination（DeskDeploy26Blocked）。本文件由议会 daemon 生成。

## 事实

**来源**：W-04（deploy 席）在 [deploy#26 评论 6564907164](https://github.com/Pepgent/deploy/issues/26#issuecomment-6564907164) 报 BLOCKED；[PR#27](https://github.com/Pepgent/deploy/pull/27) open 未合入。初审全文：governance-desk `DeskDeploy26Blocked` 的 `local://decisions/deploy26-blocked.md`。

**决策正文（D）**
- F1 D46-02 v1：“对私有仓库 `Pepgent/images` 的只读凭据由 deploy 按既有的 Komodo Variables 注入路径提供给 Lab 容器的 git。这一项沿用 P15 占位，假定能工作。不让用户粘贴凭据，不进镜像。”D46-02 只给 Lab 后端 `PEPGENT_LAB_IMAGES_HOME`、`PEPGENT_LAB_IMAGES_REMOTE` 两个变量（`pepgent-pm/evidence/decisions/D46-pepgent80-blocked.md:29`）。
- F2 deploy#26 正文（承载 issue，非决策表）把远端收窄为带凭据的 HTTPS 单值，落选 (a) 另设 Lab 凭据变量（改跨单元接口）与 (b) git 全局凭据（作用到 Lab 库检出与会话工作树）。

**切片（R，`/Users/mouriya/Ext/worktrees/deploy-26`）**
- F3 `images_remote()` 只读 owner 文件 `pepgent-central/images-remote`，缺失或非 `https://<userinfo>@github.com/Pepgent/images(.git)` 即停止；在 `inject()` 上传任何 Variable 前调用（`scripts/central.py:208-219,233,238`）。compose 以 `${PEPGENT_CENTRAL_LAB_IMAGES_REMOTE:?…}` 必填插值（`stacks/pepgent-central/compose.yaml:95`）。因此 PR#27 在凭据就位前合入会使 `variables` 与 `apply` 失败。
- F4 `README.md:15`：“新建 RiriAgent token 又需要人工 GitHub sudo 认证”。

**既有凭据来源排查（A，只看文件名与权限，未读值）**
- F5 部署 owner 目录 `~/Ext/work/orbstack/pepgent-central/` 只有 `lab-admin.json`、`lab-auth-secret`、`mux-token`、`remote-api.json`、`slurm-jwt`，无 GitHub 凭据。
- F6 `~/.config/gh`：RiriAgent token 在 keyring（禁止提取），权限远超只读。`~/.config/github-automation/`：GitHub App，安装令牌 1 小时过期。`~/.ssh-manager/.env` 只有一个 SSH 主机 keypath；gopass 唯一条目与 GitHub 无关；Komodo GitProvider token 未注册（F4）。
- F7 fine-grained PAT 无创建 API，网页创建需 RiriAgent 会话与 sudo 再认证；Yab 未运行，`yab exec` 打开任何 URL 均 `could not open`，agent 无 RiriAgent 网页会话与 sudo 凭据。
- F8 RiriAgent 对 `Pepgent/images` 有 admin（`gh api repos/Pepgent/images` → `private: true`、`admin: true`），可经 REST `POST /repos/Pepgent/images/keys`（`read_only: true`）自助添加只读 deploy key，无需 sudo。
- F9 `lab-web` 镜像基于 Debian（`pepgent-images/Dockerfile:10,68`），装有 git，无 ssh 客户端（W-04 实测 `NO_SSH`）；Debian `openssh-client` 的 `/etc/ssh/ssh_config` 默认 `Include /etc/ssh/ssh_config.d/*.conf`。

**闸门（A）**
- 闸门 A（Argon-2，`local://decisions/deploy26-blocked-gate-a.md`）：候选①（fine-grained PAT 写成 HTTPS 单值）不越界；候选②（SSH deploy key，额外向 Lab 注入私钥/known_hosts 并加装 ssh 客户端）越界，破坏 D46-02 双变量契约；另主张 PR#27 在阶段 B 直接合入，真实 PAT 与验收 1–3 归阶段 C。
- 闸门 B（ArgonGovernance-2，`local://decisions/deploy26-blocked-gate-b.md`，归档 `pepgent-pm/evidence/gates/deploy26-blocked-gate-b.md`）：越界。候选①以“等待操作员 GitHub sudo 认证”为解除条件，违反 `U7`（“没有任何应该block的东西，你应该自行和ai们商量解决”）、`AGENTS.md:127`（禁止设等待用户的 blocker）并改变 `README.md:15` 的测试环境前提；须按 P0、`domains: [governance]` 立案，在零人工介入前提下表决可自力跑通的凭据/远端方案。

**本议程的取向**：本行采用 deploy key（零人工，F8），但不按闸门 A 否决的候选②形态向 Lab 增加变量：Lab 仍只收 D46-02 的两个变量，私钥与 ssh 主机别名配置作为 deploy 侧容器文件，只对一个别名主机生效。

## 决策项表

| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |
|---|---|---|---|---|---|---|---|---|
| D47-01 v2 | Pepgent/images 只读凭据改为只读 deploy key；PEPGENT_LAB_IMAGES_REMOTE 改为 ssh 主机别名远端；私钥与本 Stack 既有凭据同存部署 owner 目录，沿 LAB_ADMIN_CONFIG_FILE 先例按路径只读 bind 进 lab-web，不经 Komodo Variable 或 Stack environment；别名配置只对该远端生效；Lab 后端仍只收 D46-02 的两个变量 | Pepgent/deploy（W-04，沿用 PR#27 分支 issue-26-images-remote 修改）：`stacks/pepgent-central/compose.yaml` lab-web 的 environment、volumes、configs 与顶层 configs；`komodo/syncs/central.toml` 的 Stack environment；`scripts/central.py`（以核对私钥 owner 文件替换 `images_remote()`）；`README.md` 的“DEP-01 操作入口”与“服务、状态与凭据”两节；部署 owner 目录 `~/Ext/work/orbstack/pepgent-central/images-ssh-key`。`Pepgent/images` 仓库设置：Deploy keys（只读，由 RiriAgent 经 API 添加）。deploy#26 正文“凭据与远端是同一个交接点”“凭据来源”两节与验收 3–6 按本行替换。不改 Lab 后端（Pepgent#80/W-09）的变量集合 | - **凭据与持久源**：部署 owner 在本机生成 ed25519 密钥对，私钥存为 owner 文件 `~/Ext/work/orbstack/pepgent-central/images-ssh-key`（0600），与 `mux-token`、`lab-admin.json`、`remote-api.json` 等既有凭据位于同一个 0700 owner 目录（`deploy/README.md:29,70`；D8 DEP-01“凭据沿本地私有文件注入”，`PM/evidence/decisions/D8-mvp-scope.md:361`）。公钥由 RiriAgent 经 `POST /repos/Pepgent/images/keys`（`title: pepgent-central-lab-images`、`read_only: true`）注册为只读 deploy key。全程零人工，不经网页，不粘贴。<br>- **注入**：沿用本 Stack 的 `LAB_ADMIN_CONFIG_FILE` 先例（`compose.yaml:35-39`、`central.toml:31`），按路径挂载私钥，私钥本身不进 Komodo Variable、Stack environment 或 env 文件。<br>  - `central.toml` 的 environment 增加一行 `LAB_IMAGES_SSH_KEY_FILE=/Users/mouriya/Ext/work/orbstack/pepgent-central/images-ssh-key`，值是非机密的路径。<br>  - compose 在 lab-web 的 volumes 中增加一项 bind：`type: bind`，`source: ${LAB_IMAGES_SSH_KEY_FILE:?set owner-only images deploy key}`，`target: /run/secrets/pepgent-images-ssh-key`，`read_only: true`，`bind: { create_host_path: false }`。只挂进 lab-web。<br>  - `scripts/central.py variables` 只核对该 owner 文件存在且权限为 0600。它不生成该文件，文件缺失即停止，与 PR#27 现行规则同型。它不上传私钥，也不新增 Variable。输出与 `lab_auth_inputs` 同型：`{"images_deploy_key": "<路径>", "mode": "0600", "values": "not logged"}`。<br>- **别名配置**：compose 顶层 `configs` 以 `content` 内联两份非机密文件，只挂进 lab-web。<br>  - `/etc/ssh/ssh_config.d/pepgent-images.conf` 写入 `Host pepgent-images`、`HostName github.com`、`User git`、`IdentityFile /run/secrets/pepgent-images-ssh-key`、`IdentitiesOnly yes`、`UserKnownHostsFile /etc/ssh/pepgent-images.known_hosts`。<br>  - `/etc/ssh/pepgent-images.known_hosts` 写入 GitHub 在 `api.github.com/meta` 公布的 `github.com` SSH 主机公钥。<br>- **远端**：`PEPGENT_LAB_IMAGES_REMOTE: pepgent-images:Pepgent/images.git`，作为 compose 字面值，与 `PEPGENT_LAB_IMAGES_HOME` 同型。容器内 git 只凭这一个值即可非交互 clone。私钥只对别名主机 `pepgent-images` 生效，Lab 库检出与会话工作树的 git 调用不受影响，满足 deploy#26 落选 (b) 的范围理由。Lab 后端仍只解析两个变量，D46-02 接口不变。<br>- **验收替换**（deploy#26）：<br>  - 验收 2 不变：容器内只凭 `$PEPGENT_LAB_IMAGES_REMOTE` clone 出含 `Dockerfile`、`README.md` 的检出。前提是 `apply` 的 DeployStack 以 Complete/success 结束。<br>  - 验收 3 改为：`variables` 输出上述 owner 文件核对行，且不含值；`ListVariables` 中没有承载该私钥的 Variable；Stack environment 只有 `LAB_IMAGES_SSH_KEY_FILE` 路径。<br>  - 验收 4 改为：镜像不含 `/run/secrets/pepgent-images-ssh-key`；运行中的 lab-web 环境变量里没有私钥，即 `docker exec pepgent-central-lab-web sh -c 'env \| grep -c "PRIVATE KEY"'` 输出 0。<br>  - 验收 5 改为：仓库只含 `${LAB_IMAGES_SSH_KEY_FILE:?…}` 引用、owner 路径和非机密别名配置，没有私钥字面值。<br>  - 验收 6：README 列入新 owner 文件与路径变量。<br>- **轮换**：生成新密钥对，注册新 deploy key，覆盖同一 owner 文件（0600），走 `variables`/`preview`/`apply`（apply 重建 lab-web，挂入新文件），最后删除旧 deploy key。 | **得到**：零人工、agent 自力完成凭据签发与 deploy#26 全部验收，PR#27 不再阻塞。deploy key 只读、只对 `Pepgent/images` 有效、不过期。私钥与本 Stack 既有凭据同一个持久源、同一种 bind 挂载方式，不进 Komodo DB、env 文件、镜像或仓库。Lab 后端接口与 D46-02 一致，W-09 无需改动。<br>**代价**：D46-02 中“按既有的 Komodo Variables 注入路径”是沿用 P15 的占位。对这把多行私钥，本行改用本 Stack 另一条既有注入路径落实该占位，即 owner 文件只读 bind（`deploy/README.md:70`），Lab 接口不变。PR#27 的 `images_remote()`、`images-remote` owner 文件和 HTTPS 形态说明作废重写。compose 增加一项 bind 与两项 config，`central.toml` 增加一行路径变量。lab-web 镜像需要 ssh 客户端（第 02 行，images 席）。deploy#26 正文需按本行替换。<br>**落选**：<br>- v1 的 secret Variable 加 compose `secrets.environment`：本 Stack 运行 Komodo 2.3.4（`deploy/scripts/central.py:2`）。按 moghtech/komodo@v2.3.4 源码，Core 先对 Stack environment 做整串插值（`lib/interpolate/src/lib.rs:29-38`），periphery 写 env 文件时再经 `env_vars()`（`bin/periphery/src/stack/write.rs:107-108`）、`environment_vars_from_str`（`client/core/rs/src/entities/mod.rs:411-420`），由 `parse_key_value_list` 按 `\n` 逐行要求 `=` 或 `:`（`client/core/rs/src/parsers.rs:39-70`）。多行 OpenSSH 私钥的 base64 行不满足这一要求，整个 `pepgent-central` Stack 的 DeployStack 都会失败。<br>- 私钥 base64 成单行后经 Variable 注入，再在 lab-entrypoint 中解码：多一步编解码，私钥仍进 Komodo DB 与 env 文件，而且改动 lab-entrypoint 会改变中心配置身份。<br>- 顶层 compose `secrets.file`：效果同为 bind，但在本 Stack 既有的 service 级 bind 先例之外另立第二种写法。<br>- 私钥持久源改为 deploy 仓 SOPS 加 workflow 写 Variables：本 Stack 是本机 OrbStack 隔离 Core，不在 km 中（`~/Ext/work/orbstack/pepgent-komodo.md:3`）。D8 DEP-01 已定“凭据沿本地私有文件注入，不解密 SOPS”，C1-4（`U4`）禁止解密 SOPS。deploy 仓也没有 SOPS 与 workflow。若这样做，同一 Stack 会出现第二套持久源。此外，该路径同样要经过 Variable 与 Stack environment，会遇到上一条落选项的多行解析失败。<br>- fine-grained PAT（HTTPS 单值，闸门 A 判为不越界）：签发需要人工 GitHub sudo 认证（F4、F7），闸门 B 判其违反 `U7` 与 `AGENTS.md:127`。<br>- PR#27 先合入，凭据与验收 1–3 留到阶段 C（闸门 A 主张）：`images_remote()` 缺文件即停止，compose 必填插值缺值（F3），一合入就会让 `variables`、`apply` 以及经由它们的 `slurm.py` 失败；而且仍把人工 sudo 留作后续前提。<br>- GitHub App 安装令牌（F6）：1 小时过期。Lab 环境变量是部署时的静态值，需要另设刷新与每小时重部署机制；而且 App 归另一个工具所有。<br>- 宿主机镜像仓（宿主机 git/gh fetch 后挂入容器）：需要 compose 之外的宿主机动作，镜像新鲜度只到上次部署，与 D46-02“每次读 `containers` 前快进到远端默认分支”不符。<br>- 向 Lab 另给私钥变量或设置容器级 `GIT_SSH_COMMAND`：前者是 deploy#26 落选 (a)，会改变 D46-02 接口（即闸门 A 否决的候选②形态）；后者是落选 (b)，会作用到容器内全部 ssh 传输。<br>- 把 `Pepgent/images` 改为公开：会改变 org 私有仓库的可见性，泄露不可撤回，属于需要用户授权的事项。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD47v2）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |
| D47-02 v1 | Pepgent/images 的 lab-web 发布目标加装 openssh-client，供容器内 git 走第 01 行的 ssh 别名远端；镜像不带任何凭据 | Pepgent/images（W-03）`Dockerfile` 的 `lab-web` stage（`pepgent-images/Dockerfile:68` 起）；发布后 deploy 的 `pepgent-central` Stack 拉取新 `lab-web:latest` | - 在 `lab-web` stage 以 `apt-get install -y --no-install-recommends openssh-client` 加装 ssh 客户端，只加在 `lab-web` 目标，不改 `omp-agent`、`central`。<br>- 镜像不写入任何密钥、`ssh_config.d` 片段或 known_hosts；这些由 deploy 的 compose secret/config 在运行时挂入（第 01 行）。<br>- 验收：`docker run --rm --entrypoint sh <registry>/lab-web:latest -c 'command -v ssh && ls /etc/ssh/ssh_config.d'` exit 0；同一镜像 `printenv PEPGENT_LAB_IMAGES_REMOTE` 无输出。 | **得到**：第 01 行在容器内可用；改动只有一个包，作用限于 lab-web 目标。<br>**代价**：lab-web 镜像略增大；images 席多一项发布；deploy#26 验收 2 依赖该镜像先发布。<br>**落选**：由 deploy 在运行时安装 ssh（entrypoint/init 装包）——每次启动依赖外网包源、偏离镜像即运行环境的发布方式。 | 串联 | 是 | Coordination（Main）：赞成<br>ClaudeHigh（ClaudeHighD47）：赞成<br>Argon（Argon-2）：赞成<br>LeadMentor（LeadMentor-2）：赞成<br>ArgonGovernance（ArgonGovernance-2）：赞成 | **通过** 5/5（门槛 4） |

## 修订、仲裁与反例处置

- D47-01 v2（DeskD47Revise，2026-11-01T23:28:52.672Z）：修订人是 DeskD47Revise（Coordination 席派出的治理承接者，不另计票）。本次只修订 D47-01，已通过的 D47-02 不动。

**ClaudeHigh 反例：成立，本版修订。** 已在 moghtech/komodo@v2.3.4 源码核实，本 Stack 运行的正是这个版本（`deploy/scripts/central.py:2`）。私钥的失败链路如下：

- Core 对 Stack environment 做整串插值（`lib/interpolate/src/lib.rs:29-38`）。
- periphery 在 `write_stack_files_on_host` 中调用 `stack.config.env_vars()?`（`bin/periphery/src/stack/write.rs:92-108`）。
- 随后进入 `environment_vars_from_str`（`client/core/rs/src/entities/mod.rs:411-420`），再进入 `parse_key_value_list`。
- `parse_key_value_list` 按 `\n` 切分，每行都必须 `split_once(['=', ':'])`，否则报 `line {i} missing assignment character`（`client/core/rs/src/parsers.rs:39-70`）。

多行 OpenSSH 私钥的 base64 行过不了这一步，`pepgent-central` 整个 DeployStack 都会失败。

v2 改为沿用本 Stack 已有的 `LAB_ADMIN_CONFIG_FILE` 先例（`deploy/stacks/pepgent-central/compose.yaml:35-39`、`deploy/komodo/syncs/central.toml:31`）：

- Stack environment 只写非机密路径 `LAB_IMAGES_SSH_KEY_FILE`。
- lab-web 以 service 级只读 bind 挂入 `/run/secrets/pepgent-images-ssh-key`。
- 私钥不进 Komodo Variable、Stack environment 或 env 文件，因此不经过上述逐行解析。

ClaudeHigh 建议用顶层 `secrets.file`。v2 改用 service 级 bind，与既有先例写法一致；两者挂载效果相同。

**LeadMentor 反例：前提与源头不符，已另行用 `council rebut` 提交依据。** 要点如下：

- `pepgent-central` 跑在本机 OrbStack 的隔离 Core 上，不在 km 中，台账写明 no SOPS inputs（`~/Ext/work/orbstack/pepgent-komodo.md:3`）。
- D8 DEP-01 已规定“凭据沿本地私有文件注入 … 不解密 SOPS”（`PM/evidence/decisions/D8-mvp-scope.md:361`）。
- C1-4（`U4`）禁止解密 SOPS（`AGENTS.md:46`）。
- deploy 仓没有 SOPS，也没有 workflow。
- 本 Stack 的全部既有凭据都持久存放在 0700 的部署 owner 目录中（`deploy/README.md:29,70,108`）。

v2 的私钥持久源 `pepgent-central/images-ssh-key`（0600）与既有凭据一致。v2 在 how 中写明这一点，并在落选项中逐条列出 SOPS 路径的依据。

**不变项：**

- 只读 deploy key 由 RiriAgent 经 REST 自助注册，零人工。
- ssh 别名 `pepgent-images` 与内联 configs 不变。
- `PEPGENT_LAB_IMAGES_REMOTE: pepgent-images:Pepgent/images.git` 不变。
- Lab 后端只收 D46-02 的两个变量，W-09 无需改动。

验收 3–5 与轮换步骤已按新的注入方式改写。

- D47-01 v1：DeskD47Revise 反驳 LeadMentor 的反例：**反驳对象：** LeadMentor（LeadMentor-2）对 D47-01 v1 的反例《新服务凭据不能只以本机明文 owner 文件作为持久源》。

**反例的前提：** 凭据规则第 1 条“km 里的 app，凭据在它的 workload repo SOPS，由该 repo 的 workflow 写成 km Variables”适用于 `pepgent-central`。反例据此要求，新私钥不能以本机 owner 文件为持久源，除非有上位授权。

按源头事实，这个前提不成立，上位授权也已经存在。

1. **`pepgent-central` 不在 km 中。**
   - 适用范围：`personal-infra-routing` 只适用于 homelab-tf、pve-vctcn、homelab workload repo 及其上运行的 app（`~/.claude/rules/personal-infra-routing.rule.md:7`）。
   - km 已登记的 Core：只有 `cachyos`、`homelab`、`nekoringo`、`trading` 四个（`~/.claude/skills/km/bin/list.sh` 输出；`skills/km/SKILL.md:16-20`）。
   - `pepgent-central` 的 Core：Stack 跑在本机 OrbStack 上的隔离 Core `pepgent-komodo`（`deploy/README.md:15`；`deploy/komodo/syncs/central.toml:7`）。台账写明“Local OrbStack only. No homelab/production connections, credentials, or SOPS inputs.”（`~/Ext/work/orbstack/pepgent-komodo.md:3`）。
2. **已通过的决策规定了本 Stack 的凭据持久源是本地私有文件。**
   - D8 DEP-01：“隔离 Komodo 的 pepgent-central … 凭据沿本地私有文件注入 Variables，不解密 SOPS，先登记环境台账”（`PM/evidence/decisions/D8-mvp-scope.md:361`）。
   - D2-22：测试 Komodo 放在本机 OrbStack。原因是 homelab-tf 的标准路径需要 `sops -d`，违反凭据规则（`PM/evidence/decisions/D2-components.md:59`）。
   - `(U)` 来源的 C1-4：Komodo 测试在本机 OrbStack 隔离环境进行，严禁解密 SOPS（`pepgent-soroi/AGENTS.md:46`；`LEDGER.md:100` U4）。
   - D4-10 写的“workload repo SOPS 写成的 km Variables”针对的是生产模板部署（`PM/evidence/decisions/D4-remote-exec.md:58`）。README 把生产接入记为未完成的差距（`deploy/README.md:25`），它不是本隔离 Stack 的现行路径。
3. **使用方拥有者的现行 secret store 就是部署 owner 目录。**
   - 本 Stack 的全部既有凭据都在 `~/Ext/work/orbstack/pepgent-central/` 下，目录 0700、文件 0600，包括 `mux-token`、`mux-trusted-reader-token`、`lab-auth-secret`、`lab-admin.json`、`remote-api.json`、`slurm-jwt`（`deploy/README.md:29,70,108`；`~/Ext/work/orbstack/pepgent-central.md:9-14`）。
   - 其中 `remote-api.json` 由 `central.py` 向外部系统（Core）签发一次后写入 owner 文件（`deploy/scripts/central.py:129-149`），与本行“向 GitHub 注册 deploy key 后私钥存 owner 文件”是同一模式。
   - `Pepgent/deploy` 仓库里没有 SOPS 配置，也没有 workflow：main 根目录只有 `AGENTS.md`、`README.md`、`evidence`、`komodo`、`scripts`、`stacks`。
   - 把单这一把私钥改放到 SOPS，会在同一 Stack 里另立第二套持久源，并违反 D8 DEP-01 与 C1-4。

**结论：** 私钥持久保存为 `pepgent-central/images-ssh-key`（0600），与本 Stack 的既有凭据同源，符合凭据规则第 3 条“持久化到使用方拥有者的 secret store”和 D8 DEP-01。这份反例指出的上位契约冲突不存在。

另外说明：ClaudeHigh 的反例成立，即私钥不能经 Komodo Stack environment 注入。本行随后会修订为 v2，持久源保持不变，注入改为按路径挂载 owner 文件。


## 原票

各席原票见 `votes/D47-Coordination.md`、`votes/D47-ClaudeHigh.md`、`votes/D47-Argon.md`、`votes/D47-LeadMentor.md`、`votes/D47-ArgonGovernance.md`。门槛：资格席位数的 3/4 向上取整（4 席为 3，5 席为 4，6 席为 5）。