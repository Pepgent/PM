# Pepgent Slurm REST 测试环境

状态：已安装，Mac JWT REST 容器任务已完成；2026-11-01 leader 因 homelab-tf 标准部署需解密 SOPS 而改用 OrbStack。本条目记录资源分配与已取回的运行证据，不替代 `orb list` 或 Slurm 的运行状态。

## 资源与边界

- 机器 `pepgent-slurm-test`：Ubuntu 26.04.1 LTS、原生 arm64，限制 4 CPU / 4 GiB RAM / 24 GiB 磁盘；用途仅为 Pepgent/remote Slurm REST E2E。创建前 `orb list` 为空，无可复用 Linux machine。
- 机器使用 `--isolated`，仅将 `pepgent-slurm/runs` 挂载到 `/srv/pepgent-runs`；不共享整个 Mac home，不转发 SSH agent；机器内没有 Docker 服务。
- Slurm controller、compute daemon 与 REST daemon 位于同一机器。Slurm 包实际版本为 `25.11.2-1ubuntu2`，REST API 为 `v0.0.44`；安装入口不钉包版本。Ubuntu 将 `auth/jwt` 放在独立的 `slurm-wlm-jwt-plugin` 包，安装入口已包含该包。
- Mac 和 OrbStack guest/container 使用 `http://pepgent-slurm-test.orb.local:6820`；daemon 在机器内监听 `0.0.0.0:6820`，没有配置公网或 homelab 入口。分区名 `test`，节点名 `pepgent-slurm-test`，调度容量 4 CPU / 3000 MiB。
- 此目标使用 `ProctrackType=proctrack/linuxproc`、`TaskPlugin=task/none`，不强制 cgroup CPU/内存限制；它是功能性调度测试目标，不是多租户资源隔离或性能基准环境。
- OCI runtime 实际版本为 Apptainer `1.4.5`。用户 `pepgent` 拉取 `docker://alpine:latest` 到 `/var/lib/pepgent-apptainer/alpine.sif`；实际容器为 Alpine `3.24.3` / `aarch64`。SIF 与缓存保留在机器内。
- JWT 签名密钥仅由机器生成并保存于 `/var/lib/slurm/jwt_hs256.key`，owner `slurm:slurm`，mode `0400`；它没有挂载到 Mac。REST daemon 用户为独立的 `slurmrest`，不是 root 或 SlurmUser。Munge 作为内部 daemon 认证，REST 使用 JWT。
- 共享运行目录 `/srv/pepgent-runs` 对应 Mac `~/Ext/work/orbstack/pepgent-slurm/runs`。调用方按 run 子目录隔离。隔离 machine 将 Mac 侧目录显示为 guest root 所有；调用方创建的 run 子目录需允许用户 `pepgent` 写入，`smoke.py` 使用 mode `0777`。此权限只用于本地测试目录，不承载其他数据或凭据。
- 目录和缓存在机器重启后保留；删除机器会删除 machine 内部的密钥、服务状态和缓存，但不会删除 Mac 的 runs 目录。
- 本地测试不接入 homelab Komodo、NetBird、公网入口或生产 Slurm；不以 SSH 作为 Slurm 控制面。
- 一次性连通性容器 `pepgent-test-connectivity` 已完成并由 `--rm` 删除。它复用缓存 `python:alpine` 和默认 bridge，不创建卷、网络、数据库或端口；仅通过 stdin 接收测试 API/JWT 凭据，不落盘。

## 连接与凭据

REST 用户为 `pepgent`，请求同时发送 `X-SLURM-USER-NAME: pepgent` 和 `X-SLURM-USER-TOKEN`。

`pepgent-slurm/token.sh` 经 OrbStack 管理通道调用 machine 内的 `scontrol token username=pepgent`，只将客户端 JWT 输出到 stdout；调用方应捕获到进程内而不是打印。默认有效期 86400 秒，可通过 `SLURM_TOKEN_LIFESPAN` 指定更短时间。刷新调用同一 helper，不复制签名密钥，不使用 SSH。Slurm REST 没有 token 签发接口。

客户端可在自己的 shell 进程内捕获 token 后调用 curl，不要开启 shell tracing：

```sh
set +x
TOKEN=$(bash "$HOME/Ext/work/orbstack/pepgent-slurm/token.sh")
printf 'header = "X-SLURM-USER-NAME: pepgent"\nheader = "X-SLURM-USER-TOKEN: %s"\n' "$TOKEN" |
  curl --fail --silent --show-error --config - \
    http://pepgent-slurm-test.orb.local:6820/slurm/v0.0.44/ping
unset TOKEN
```

此集群没有 SlurmDBD；`/slurmdb/...` 不可用。任务状态从 controller `/slurm/v0.0.44/job/{id}` 读取，终态在默认 `MinJobAge=300` 秒后可以被清除，不提供长期 accounting 历史。

## 生命周期与复现

创建前先检查 `orb list`，不要重复创建同名 machine：

```sh
mkdir -p "$HOME/Ext/work/orbstack/pepgent-slurm/runs"
orb create --isolated --cpus 4 --memory 4G --disk 24G \
  --mount "$HOME/Ext/work/orbstack/pepgent-slurm/runs:/srv/pepgent-runs" \
  ubuntu pepgent-slurm-test
bash "$HOME/Ext/work/orbstack/pepgent-slurm/setup.sh"
```

现有 machine 的起停和状态：

```sh
orb start pepgent-slurm-test
orb -m pepgent-slurm-test -u root systemctl is-active munge slurmctld slurmd slurmrestd
orb -m pepgent-slurm-test -u root sinfo -Nel
# 先结束内层服务，再停止 machine：
orb -m pepgent-slurm-test -u root systemctl stop slurmrestd slurmd slurmctld munge
orb stop pepgent-slurm-test
```

只有本任务 owner 可清理本机测试数据，不停止无关 OrbStack 资源，不删除 JWT key 来模拟普通重启。需要轮换签名密钥时，停止 REST/controller 后在 machine 内替换密钥并保持 owner/mode，再重启；旧 JWT 随轮换失效。

## Runtime 证据

2026-11-01，持久化安装入口 `bash ~/Ext/work/orbstack/pepgent-slurm/setup.sh` 实际重跑成功：APT 返回 `0 upgraded, 0 newly installed, 0 to remove`，配置入口返回四行 `active`，`sinfo -Nel` 返回节点 `idle`、分区 `test*`、4 CPU / 3000 MiB。该入口没有重建 machine、重拉已有 SIF 或重置任务编号；随后执行下面的完整 REST 路径验证。

Mac 实际执行：

```sh
python3 "$HOME/Ext/work/orbstack/pepgent-slurm/smoke.py"
```

驱动从 token helper 取 JWT，经 REST ping、REST submit、REST job 终态回读，再从 Mac 的共享目录读取容器结果。安装入口重跑后的任务 `3` 返回 `job_state=["COMPLETED"]`，不含 `COMPLETING`，`exit_code.status=["SUCCESS"]`、`return_code.number=0`。容器产生：

```text
nonce=ad6a48d9070c460fb908d83ba6363c39
job_id=3
arch=aarch64
container_os=alpine-3.24.3
```

输出位置为 Mac `pepgent-slurm/runs/smoke-ad6a48d9070c460fb908d83ba6363c39/result.txt`，guest 对应 `/srv/pepgent-runs/smoke-ad6a48d9070c460fb908d83ba6363c39/result.txt`。这证明 JWT REST → Slurm 调度 → 非 root Apptainer OCI 容器 → 共享目录的完整路径，不是直接 shell 或 sbatch 替代验证。

跨环境驱动在 Mac、`pepgent-slurm-test` 内的 Python 和默认 bridge 的一次性 `python:alpine` 容器中分别执行真实认证请求。三处均从 `http://pepgent-slurm-test.orb.local:6820/slurm/v0.0.44/ping` 读到 `pinged=UP`、`responding=true`，并从 `http://pepgent-komodo-core.orb.local:9120/read` 读到 Server `pepgent-test`、ID `6ae673977f90ffe88487ae55`、`state=Ok`。Mac 另用真实 curl 调用两个端点成功；curl 通过 stdin `--config -` 读取认证头，凭据没有进入命令行参数。Komodo 的 Mac loopback 入口为 `http://127.0.0.1:59120`，详见 [Komodo 台账](pepgent-komodo.md)。

来源：[Slurm 25.11.2 JWT](https://slurm.schedmd.com/archive/slurm-25.11.2/jwt.html)、[Slurm REST API](https://slurm.schedmd.com/archive/slurm-25.11.2/rest_api.html)、[Apptainer exec](https://apptainer.org/docs/user/latest/cli/apptainer_exec.html)。
