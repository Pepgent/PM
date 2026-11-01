# D47 选票：Argon

议程：deploy#26 BLOCKED 解阻：Pepgent/images 只读凭据改为零人工的只读 deploy key（Lab 双变量接口不变）（[Pepgent/PM#66](https://github.com/Pepgent/PM/issues/66)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D47-01 v1：赞成（Argon-2，2026-11-01T23:17:39.660Z）——作废：该行已修订到 v2



# Argon（Argon-2）对 D47（Pepgent/PM#66）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D47-01 v1` 与 `D47-02 v1` 均标注“缺失部分或设计补充：是”，作为产品原始意图守护席，本席不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U7`、`U23`（`LEDGER.md:69,72,86,95`：“没有任何应该block的东西，你应该自行和ai们商量解决”）与 `AGENTS.md:123,127` 确认两行完全符合用户原始设计意图：
  1. **严守 `D46-02 v1` 跨组件双变量公开契约不变：** 本席在初审闸门 A 中反对原候选 ②，原因在于原候选 ② 拟向 Lab 额外暴露凭据变量或容器全局 `GIT_SSH_COMMAND`。而 `D47-01 v1` 将只读 deploy key 私钥通过 compose `secrets`（`/run/secrets/pepgent-images-ssh-key`）与专属主机别名配置（`/etc/ssh/ssh_config.d/pepgent-images.conf`、`Host pepgent-images`）收敛在 `deploy` 侧容器文件层，Lab 后端（`W-09`）依然只接收 `D46-02 v1` 规定的 `PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE`（值为 `pepgent-images:Pepgent/images.git`）两个环境变量，且凭据只对 `Host pepgent-images` 生效、绝不污染 Lab 库检出与会话工作树的 git 调用。
  2. **实现零人工介入、自力闭环（符合 `U7` 与 `AGENTS.md:127`）：** 利用 `RiriAgent` 在 `Pepgent/images` 已有的 admin 权限通过 GitHub REST API（`POST /repos/Pepgent/images/keys`，`read_only: true`）注册只读 deploy key，彻底消除了人工 GitHub sudo 认证前置与令牌过期轮换负担，且密钥不进镜像、不进仓库。

---

## 二、对各行的逐项投票

- **`D47-01 v1`（`Pepgent/images` 只读凭据改为只读 deploy key，`PEPGENT_LAB_IMAGES_REMOTE` 为 ssh 别名远端，Lab 双变量接口不变）：`approve`（赞成）**
  - **理由：** 在不改变 `D46-02 v1` Lab 后端双变量接口、不污染其他 git 仓库调用的前提下，以零人工方式闭合 `Pepgent/images` 私有仓库只读检出凭据链。（实现附注：`lab-web` 以 UID/GID `1000:1000` 运行，OpenSSH 要求 `IdentityFile` 归属当前用户且不可全局可读，`W-04` 在 `compose.yaml` 挂载 `/run/secrets/pepgent-images-ssh-key` 时指定 `uid: "1000"`、`gid: "1000"`、`mode: 0400` 即可。）
- **`D47-02 v1`（`Pepgent/images` 的 `lab-web` stage 加装 `openssh-client`，镜像不带任何凭据）：`approve`（赞成）**
  - **理由：** 最小化补齐 `lab-web` 容器内 `git` 访问 ssh 别名远端所需的 `ssh` 客户端与 `/etc/ssh/ssh_config.d/*.conf` 包含支持，不改 `omp-agent` 与 `central`，镜像本身不写入任何凭据或主机配置。


## D47-02 v1：赞成（Argon-2，2026-11-01T23:17:39.660Z）



# Argon（Argon-2）对 D47（Pepgent/PM#66）的投票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D47-01 v1` 与 `D47-02 v1` 均标注“缺失部分或设计补充：是”，作为产品原始意图守护席，本席不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U7`、`U23`（`LEDGER.md:69,72,86,95`：“没有任何应该block的东西，你应该自行和ai们商量解决”）与 `AGENTS.md:123,127` 确认两行完全符合用户原始设计意图：
  1. **严守 `D46-02 v1` 跨组件双变量公开契约不变：** 本席在初审闸门 A 中反对原候选 ②，原因在于原候选 ② 拟向 Lab 额外暴露凭据变量或容器全局 `GIT_SSH_COMMAND`。而 `D47-01 v1` 将只读 deploy key 私钥通过 compose `secrets`（`/run/secrets/pepgent-images-ssh-key`）与专属主机别名配置（`/etc/ssh/ssh_config.d/pepgent-images.conf`、`Host pepgent-images`）收敛在 `deploy` 侧容器文件层，Lab 后端（`W-09`）依然只接收 `D46-02 v1` 规定的 `PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE`（值为 `pepgent-images:Pepgent/images.git`）两个环境变量，且凭据只对 `Host pepgent-images` 生效、绝不污染 Lab 库检出与会话工作树的 git 调用。
  2. **实现零人工介入、自力闭环（符合 `U7` 与 `AGENTS.md:127`）：** 利用 `RiriAgent` 在 `Pepgent/images` 已有的 admin 权限通过 GitHub REST API（`POST /repos/Pepgent/images/keys`，`read_only: true`）注册只读 deploy key，彻底消除了人工 GitHub sudo 认证前置与令牌过期轮换负担，且密钥不进镜像、不进仓库。

---

## 二、对各行的逐项投票

- **`D47-01 v1`（`Pepgent/images` 只读凭据改为只读 deploy key，`PEPGENT_LAB_IMAGES_REMOTE` 为 ssh 别名远端，Lab 双变量接口不变）：`approve`（赞成）**
  - **理由：** 在不改变 `D46-02 v1` Lab 后端双变量接口、不污染其他 git 仓库调用的前提下，以零人工方式闭合 `Pepgent/images` 私有仓库只读检出凭据链。（实现附注：`lab-web` 以 UID/GID `1000:1000` 运行，OpenSSH 要求 `IdentityFile` 归属当前用户且不可全局可读，`W-04` 在 `compose.yaml` 挂载 `/run/secrets/pepgent-images-ssh-key` 时指定 `uid: "1000"`、`gid: "1000"`、`mode: 0400` 即可。）
- **`D47-02 v1`（`Pepgent/images` 的 `lab-web` stage 加装 `openssh-client`，镜像不带任何凭据）：`approve`（赞成）**
  - **理由：** 最小化补齐 `lab-web` 容器内 `git` 访问 ssh 别名远端所需的 `ssh` 客户端与 `/etc/ssh/ssh_config.d/*.conf` 包含支持，不改 `omp-agent` 与 `central`，镜像本身不写入任何凭据或主机配置。


## D47-01 v2：赞成（Argon-2，2026-11-01T23:29:34.071Z）



# Argon（Argon-2）对 D47-01 v2（Pepgent/PM#66）的重投选票与本意裁决

## 一、意图裁决与一票否决审阅

- **否决：无。** `D47-01 v2` 标注“缺失部分或设计补充：是”，作为产品原始意图守护席，本席不行使一票否决权，并依据 `(U)` `U1`、`U2`、`U7`、`U23`（`LEDGER.md:69,72,86,95`）与 `(D)` `D8:361`（`DEP-01`：“凭据沿本地私有文件注入”）、`D46-02 v1` 确认本行完全符合用户原始设计意图与跨组件公开契约：
  1. **严守 `D46-02 v1` 跨组件双变量契约不变：** `Lab` 后端（`W-09`）仍只接收 `PEPGENT_LAB_IMAGES_HOME` 与 `PEPGENT_LAB_IMAGES_REMOTE`（`pepgent-images:Pepgent/images.git`）两个环境变量；凭据只对专属别名主机 `Host pepgent-images` 生效，不影响 Lab 库检出与会话工作树。
  2. **消解 Komodo 2.3.4 多行 Variable 插值解析限制且契合 `D8` `DEP-01`：** 沿用本 Stack 既有的 `LAB_ADMIN_CONFIG_FILE` / `LAB_MODELS_FILE` 本地私有文件只读 bind 先例，将 `0600` 私钥存于 `~/Ext/work/orbstack/pepgent-central/images-ssh-key` 并只读 bind 到 `lab-web` 的 `/run/secrets/pepgent-images-ssh-key`，避免多行 OpenSSH 私钥进入 Komodo Variable 触发 `parse_key_value_list` 失败，同时确保私钥不进 Komodo DB、env 文件、镜像或仓库，全程零人工闭环。

---

## 二、逐项投票

- **`D47-01 v2`（`Pepgent/images` 只读凭据改为只读 deploy key，沿 `LAB_ADMIN_CONFIG_FILE` 先例从部署 owner 目录只读 bind 进 `lab-web`，`PEPGENT_LAB_IMAGES_REMOTE` 为 ssh 别名远端，Lab 双变量接口不变）：`approve`（赞成）**
  - **理由：** 规避了 Komodo 2.3.4 对 Stack environment 逐行 `=`/`:` 解析对多行私钥的限制，与本 Stack `D8` `DEP-01` 本地私有文件注入机制完全同构，保持 `D46-02 v1` 双变量接口不变并实现零人工签发与验收闭环。

