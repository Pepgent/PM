# Pepgent ENV-02 model gateway

## Resources and lifecycle

- Reuse the Mac's existing canonical `omp auth-broker serve`, managed by `~/Library/LaunchAgents/com.mouriya.omp-auth-broker.plist`, label `com.mouriya.omp-auth-broker`, with KeepAlive. It owns the existing Mac credential vault and listens only on `127.0.0.1:8765`. Start: `launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.mouriya.omp-auth-broker.plist` (only if absent); restart: `launchctl kickstart -k gui/$(id -u)/com.mouriya.omp-auth-broker`. Stop: `launchctl bootout gui/$(id -u)/com.mouriya.omp-auth-broker` only when all broker consumers agree. The pre-existing gateway on loopback port 4000 is not changed.
- Persistent Pepgent gateway: `pepgent-gateway/service.py` manages `start`, `stop`, and `status`, with an owner PID file, `nohup`, a new POSIX session, stdin `/dev/null`, and private `gateway.log`. Commands: `python3 ~/Ext/work/orbstack/pepgent-gateway/service.py start`, `.../service.py status`, `.../service.py stop`. Start is non-duplicating; stop verifies the PID still names this exact gateway command. This launchd-free detached process survives the current OMP session; manually start after Mac reboot. The existing broker remains launchd-owned. Mac `0.0.0.0:14000`, consumers use `http://host.orb.internal:14000`. HTTP is for the trusted local OrbStack environment; the wildcard listener is reachable on Mac interfaces and is not a public/TLS production endpoint. Bearer auth remains required; broker stays loopback-only.
- Private owner directory `~/Ext/work/orbstack/pepgent-gateway/` is mode 0700. `setup.py` creates one mode-0600 `token` for each of `central`, `lab-web`, `komodo-agent`, `slurm-agent`, `a0`. `clients.json` contains only token digests and exact three-model grants; raw token files never go in this document. Existing tokens are retained on repeated setup. Reload grants by rerunning setup; the running gateway rereads clients every ten seconds, so no restart or interruption of in-flight requests is needed.
- Each consumer owns `models.yml` and `config.yml`. Providers use `transport: pi-native`, the gateway URL, and `auth: none`; a command-resolved `Authorization` header constructs the gateway bearer from `PEPGENT_GATEWAY_TOKEN` only for requests. Do not register the gateway token as a provider `apiKey`: that would enable provider-native discovery against a multiplexed gateway catalog. Model order remains `opencode-go/deepseek-v4.1-flash`, `openai-codex/gpt-6-luna`, `anthropic/claude-haiku-5-5` (D8-06; leader approved the header form). Only gateway client tokens, never provider/broker credentials, are injected.
- Proof image `pepgent-registry.orb.local:5000/pepgent/env-02-omp:latest`: reusable upstream OMP-only local test image, built from `pepgent-gateway/image/Dockerfile`. No product code, credentials, config, ports or volumes are baked into it. Registry uses the existing `pepgent-registry-data` volume.
- Disposable Docker proof container `pepgent-gateway-env02`, default bridge, no ports/volumes/networks/database; only read-only central models/config mounts and central client token via stdin. Start via `docker run --rm ...` as recorded below; stop `docker stop pepgent-gateway-env02`; automatic removal after completion.
- Disposable A0 credential proof container `pepgent-gateway-env02-a0`: same upstream proof image and default bridge, no new port, volume, network, database or VM. Only `a0/models.yml` and `a0/config.yml` are mounted read-only, and its own gateway token is supplied privately via stdin. Start: `python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py docker a0`; stop: `docker stop pepgent-gateway-env02-a0`; `--rm` removes it at completion. This proves A0's model-credential route only, not the full installer/five-category A0 acceptance.
- Disposable cached-startup proof container `pepgent-gateway-env02-cache`: reuses the upstream proof image/default bridge; no new port, named volume/network, database or VM. Its fresh `/work/cache-home` and `models.db` live only inside that same container across three consecutive omp processes; no reset between starts. Only A0's two config files are mounted read-only, its client token arrives privately over stdin. Start: `python3 ~/Ext/work/orbstack/pepgent-gateway/cache-proof.py`; stop: `docker stop pepgent-gateway-env02-cache`; `--rm` removes the container after evidence is copied out by the driver.
- Disposable Komodo proof Stack `pepgent-gateway-env02-komodo`, Server `pepgent-test`, service/container `pepgent-gateway-env02-komodo`, default Compose network `pepgent-gateway-env02-komodo_default`, no ports/volumes/database. A bounded API-created proof, not a persistent app declaration. Token injection uses secret Komodo Variable `PEPGENT_ENV02_KOMODO_GATEWAY_TOKEN`; only its own models/config are read-only mounted. Deploy via Core `DeployStack`, stop/cleanup via scoped `DestroyStack` then `DeleteStack`. Secret Variable remains available to the persistent komodo-agent consumer.
- Slurm proof reuses `pepgent-slurm-test`, existing REST/JWT helper and registry trust. Reusable image `/var/lib/pepgent-apptainer/env02-omp.sif`; owner-only token `/home/pepgent/.config/pepgent-gateway/token` (pepgent:pepgent 0600), config alongside. Job is submitted through slurmrestd, uses `apptainer exec --containall --cleanenv`, and binds that one owner directory read-only to `/client`. Inside its isolated temporary filesystem it copies only models/config into a writable empty OMP agent directory; provider credentials are never copied. Its naturally ending job and output are isolated under the existing shared runs directory. No new VM/database/volume/network.

## Runtime evidence

Verified 2026-11-01. The first D8-06 model, **`opencode-go/deepseek-v4.1-flash`**, returned `ok` in all three places. Each run invoked upstream `omp/18.14.2`, installed from the unpinned npm package `@oh-my-pi/pi-coding-agent`. No product repository was changed.

### Setup and reproducible entry points

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/setup.py
python3 ~/Ext/work/orbstack/pepgent-gateway/service.py start
docker build -t pepgent-registry.orb.local:5000/pepgent/env-02-omp:latest \
  ~/Ext/work/orbstack/pepgent-gateway/image
docker push pepgent-registry.orb.local:5000/pepgent/env-02-omp:latest
```

Observed: initial four client configurations created; build finished and push succeeded. The pre-existing broker health returned `{"ok":true,"version":"18.14.1"}` at setup; the final gateway health returned `{"ok":true,"version":"18.14.2"}`. Gateway process PID `75918` remained alive between independent tool invocations and after all proof cleanup; `lsof` showed `TCP *:14000 (LISTEN)`. A0 was added subsequently through the same setup without replacing existing client tokens or grants. No image or token digest is used as runtime proof.

The retained `acceptance.py` is a repeatable local proof driver, not a product deployment definition. It captures tokens privately, constructs explicit runtime inputs, records output under `pepgent-gateway/evidence/`, and prints only nonsecret results. The model-call argv is identical in all three places:

```sh
omp -p "reply ok" --model opencode-go/deepseek-v4.1-flash \
  --no-session --no-title --no-extensions --no-skills --no-rules \
  --no-context-files --no-lsp --no-tools --max-time 180
```

#### Throwaway upstream OMP container

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py docker
```

The driver runs `docker run --rm --init --name pepgent-gateway-env02 -i`, injects only `PI_CODING_AGENT_DIR=/client`, mounts only central's two config files read-only, and sends central's gateway token through stdin to a non-tracing shell. That shell exports only `PEPGENT_GATEWAY_TOKEN` before `exec omp ...`. No host HOME, credential database, broker token, provider env, Docker socket, or product checkout is mounted.

```text
docker exit=0
omp/18.14.2
ok
```

Evidence: `pepgent-gateway/evidence/docker.log`. `--rm` deleted the container.

#### Komodo-deployed container

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py komodo
```

The driver reads the existing private API file in-process, resolves Server `pepgent-test` from live `ListServers`, and creates the bounded proof Stack. It creates/updates secret Variable `PEPGENT_ENV02_KOMODO_GATEWAY_TOKEN` from the komodo-agent token file without printing the value. Compose references `[[PEPGENT_ENV02_KOMODO_GATEWAY_TOKEN]]`, not a literal token. The only bind destinations are `/client/config.yml` and `/client/models.yml`. Deployment is executed by Core → Periphery, not by hand-run Docker.

```text
Core version=2.3.4 server=pepgent-test state=Ok
DeployStack status=Complete success=true update=6ae69157017c7f401f3d4a2e
image=pepgent-registry.orb.local:5000/pepgent/env-02-omp:latest
state=running project=pepgent-gateway-env02-komodo service=proof
pepgent-gateway-env02-komodo | omp/18.14.2
pepgent-gateway-env02-komodo | ok
pepgent-gateway-env02-komodo | completion_exit=0
```

The completion log was obtained through `GetStackLog`; selected direct container fields confirmed the same image/project/service and mount destinations. Evidence: `evidence/komodo.log`, `evidence/komodo.json`, and `komodo-proof.compose.yaml` (Variable reference only).

#### REST-submitted Slurm Apptainer job

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py slurm
```

The driver installs the slurm-agent token/config through the OrbStack management channel, with output suppressed. It pulls the exact registry image as `pepgent` using the existing HTTP registry policy:

```sh
apptainer pull /var/lib/pepgent-apptainer/env02-omp.sif \
  docker://pepgent-registry.orb.local:5000/pepgent/env-02-omp:latest
```

It captures JWT from the existing `pepgent-slurm/token.sh`, sends `POST /slurm/v0.0.44/job/submit`, and reads `/slurm/v0.0.44/job/65` to terminal completion. The submitted script uses `apptainer exec --containall --cleanenv --bind /home/pepgent/.config/pepgent-gateway:/client:ro`; only inside Apptainer does it read `/client/token` into `PEPGENT_GATEWAY_TOKEN`. The REST payload, scheduler environment and script contain no token values. The script is retained as `evidence/slurm-script.sh`.

```text
submitted REST job_id=65
job_state=["COMPLETED"]
exit_code.status=["SUCCESS"] return_code.number=0
omp/18.14.2
ok
```

Evidence: `evidence/slurm.json`, `evidence/slurm.log`; original job output `pepgent-slurm/runs/env02-1793495387/{stdout,stderr}.txt`. Apptainer converted SIF to its temporary sandbox because optional squashfuse/fuse2fs/gocryptfs helpers are absent; it completed and cleaned the sandbox. This run also updated the guest's injected models/config to the discovery-safe header form.

Guest permission readback:

```text
700 pepgent:pepgent /home/pepgent/.config/pepgent-gateway
600 pepgent:pepgent /home/pepgent/.config/pepgent-gateway/token
600 pepgent:pepgent /home/pepgent/.config/pepgent-gateway/models.yml
600 pepgent:pepgent /home/pepgent/.config/pepgent-gateway/config.yml
```

### Log sanitation and credential boundaries

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py scan
```

The driver executes `grep -E -c` against each full combined run log with this provider-prefix pattern:

```text
sk-[A-Za-z0-9_-]{8,}|sk-ant-|sk-or-v1-|oc-[A-Za-z0-9_-]{8,}|eyJ[A-Za-z0-9_-]{16,}\.
```

No matching lines are printed; grep's expected no-match exit status is 1 and count is 0:

```text
docker.log provider_token_prefix_matches=0
komodo.log provider_token_prefix_matches=0
slurm.log provider_token_prefix_matches=0
client_token_literals_in_logs=0
```

The driver separately compares the configured client-token literals against the selected logs without printing them. Mac `stat -f '%Lp %N'` returned `600` for the original four consumer token files and `clients.json`; the A0 mode and proof are recorded below. Prefix scans are supplementary sanitation checks, not proof that every possible unknown secret format is absent. The stronger boundary is the explicit client input set above: no provider/broker credentials are injected or mounted. Tokens remain owned by their respective consumers; only the Mac broker/gateway access provider credentials.

### Corrected local proof failures

- The first Komodo proof's completion already returned `ok`, but the driver sent Mongo's object-form `_id` to `GetUpdate` and received HTTP 422; Compose also interpolated `$status`, yielding an empty exit marker. The driver now extracts `_id.$oid` and escapes command dollars as `$$`. The original bounded Stack was destroyed/deleted, then the complete CreateStack → DeployStack → terminal Update → GetStackLog path was rerun successfully as shown above. Original nonsecret output: `evidence/komodo-first.log`.
- Slurm job `5` ended `FAILED`, return code 1: `SQLiteError: Database "/client/agent.db": unable to open database file`. The injected directory was read-only, while upstream OMP needs a writable empty local agent database even with gateway-only credentials. The final script uses `--containall` and a fresh writable temporary agent directory containing only copied models/config. The full REST submit → terminal job → Apptainer completion path was rerun as job `6` and passed. Failed output is retained in `evidence/slurm-first.log` and `evidence/slurm-first.json`; its original run directory is `pepgent-slurm/runs/env02-1793492067`.
- A new launchd definition initially failed before spawn with `EX_CONFIG` and no output files. It was booted out and removed; the documented launchd-free `nohup` lifecycle above is the actual running implementation. Existing launchd broker and gateway were not altered.

### Cleanup and retained resources

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py komodo cleanup
docker ps -a --filter name=pepgent-gateway-env02 --format '{{.Names}} {{.Status}}'
docker network ls --filter name=pepgent-gateway-env02 --format '{{.Name}}'
```

```text
DestroyStack status=Complete success=true update=6ae69183017c7f401f3d4a38
stack_present=false
[docker container filter: empty]
[docker network filter: empty]
```

The scoped Periphery working directory and temporary diagnostic scripts were removed. No new Docker volume or VM was created. All Slurm proof jobs have terminated. Retained reusable infrastructure: existing broker, Pepgent gateway process, five private client directories/grants (including A0), secret Komodo Variable, registry proof image, owner-only Slurm client configuration and SIF, and nonsecret evidence. No unrelated container, network, database or service was stopped.

### A0 独立 consumer 与部署注入

A0（D8 E2E-02）的凭据消费方名为 `a0`，与 `central` 等消费方隔离。配置路径：

- `~/Ext/work/orbstack/pepgent-gateway/a0/token`：独占 gateway client token，mode `0600`，不打印、不复用 central token。
- `~/Ext/work/orbstack/pepgent-gateway/a0/models.yml`：三 provider 均为 `transport: pi-native`，`baseUrl: http://host.orb.internal:14000`，`auth: none`；仅通过下文的 command-resolved `Authorization` header 读取 `PEPGENT_GATEWAY_TOKEN`，不设置 provider `apiKey`。
- `~/Ext/work/orbstack/pepgent-gateway/a0/config.yml`：默认候选与 enabledModels 顺序为 D8-06 的 `opencode-go/deepseek-v4.1-flash` → `openai-codex/gpt-6-luna` → `anthropic/claude-haiku-5-5`。
- `~/Ext/work/orbstack/pepgent-gateway/clients.json`：`a0` 项只有 `tokenSha256` 和这三个精确 model grants，不含 raw token。

部署注入由 A0 容器的部署/测试进程完成：先通过真实 A0 的空 HOME 门禁，再注入这两份配置（不要将 token 写入配置），私下读取 `a0/token`，仅向 A0 的 omp 进程导出 `PEPGENT_GATEWAY_TOKEN`。不要打印 env、将 token 放进命令行参数、镜像、fixture、Verdict、transcript 或 copy-out。测试驱动可沿本证明采用 stdin 输入：非 tracing shell 读取一行 token 后 export，再 exec omp；配置按文件只读挂载到可写的 agent 目录，并设置 `PI_CODING_AGENT_DIR`。不挂载 host HOME、provider 凭据、broker token 或本机 agent.db。token 不需要出现在 SOROI 地址或其它 URL 中。

2026-11-01，本轮执行：

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/setup.py
# 已运行 gateway 按文档每 10 秒热重载原子替换后的 clients.json；
# 等待一个完整重载周期，不重启或打断其他消费者。
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py docker a0
python3 ~/Ext/work/orbstack/pepgent-gateway/acceptance.py scan a0
```

setup 前后在进程内确认原四个 token 与 grants 保持不变，未输出值；`a0` 使用新建独占 token。等待 11 秒后，在新建且唯一命名的容器 `pepgent-gateway-env02-a0` 中真实调用首个模型：

```text
Configured five isolated clients; tokens and grants remain private.
existing_client_tokens_and_grants_preserved=true; a0_token_mode=600
docker exit=0
omp/18.14.2
ok
docker-a0.log provider_token_prefix_matches=0
client_token_literals_in_logs=0
```

`stat` 读回 `a0/` mode `0700`，token/models/config 各为 `0600`。证据文件为 `pepgent-gateway/evidence/docker-a0.log`；扫描仅针对本轮新日志，没有重跑原三处验证。真实补全证明同一个 gateway 已接受热重载后的 A0 grant；`service.py status` 仍返回原 PID `75918`，未新增 gateway 进程。`docker ps -a --filter name=pepgent-gateway-env02-a0` 返回空，证明一次性容器已由 `--rm` 删除。

本次只解除 A0 的 gateway consumer 前提，不代表真实发行 installer 与五类 PTY 安装验收已完成；该结果由 [A0 验收任务](https://github.com/Pepgent/soroi/issues/235) 的测试者继续消费。

### 缓存后的连续启动：provider discovery 与 gateway 鉴权分离

**根因取证。** [设置覆盖验收](https://github.com/Pepgent/soroi/issues/186#issuecomment-6551407239) 已报告 `opencode-go/opencode-go/deepseek-v4.1-flash` 与 `Unknown model`，本轮直接采用该失败事实，没有重跑来确认。只读查询原失败 HOME 的 `/tmp/soroi-cus04-69cfr0xo/home/.omp/agent/models.db`，只投影 provider/id，发现 `opencode-go:models-v3:…` 的 authoritative 缓存将三条记录都标为 provider `opencode-go`，而 id 分别为：

```text
anthropic/claude-haiku-5-5
openai-codex/gpt-6-luna
opencode-go/deepseek-v4.1-flash
```

进程内认证查询 gateway `/v1/models`，仅输出 id/api，确认 gateway 的多 provider 目录本来就返回上述 provider-qualified IDs。这个目录身份对 gateway 是正确的；错误发生在旧 consumer 配置把 gateway token 注册为 provider apiKey 后，OMP 内建 provider discovery 将 gateway URL 当作单一 provider 的 native endpoint。

源码边界：

- [`ModelRegistry.#collectBuiltInModelManagerOptions` / `#descriptorBaseUrl`](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/config/model-registry.ts) 将 provider override 的 URL 交给内建 discovery；`opencode-go` 使用 credential-scoped authoritative cache。显式 `models` 仅在 discovery/cache 后 overlay，不能禁止污染，所以没有用添加模型列表掩盖问题。
- [`isAuthenticated`](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/config/model-provider-discovery.ts) 排除 keyless sentinel；没有 provider key 时，不会启用需要认证的 OpenCode discovery。
- [`streamPiNative`](https://github.com/can1357/oh-my-pi/blob/main/packages/ai/src/providers/pi-native-client.ts) 用 `provider/id` 构造 wire modelId，因此错误缓存中的 qualified id 再次拼接就成为双前缀；其 header 合并允许在不注册 provider key 的情况下向 gateway 发送真正 bearer。

**当前统一配置。** 经 leader 批准，setup 对 `central`、`lab-web`、`komodo-agent`、`slurm-agent`、`a0` 都生成以下模式（其余两个 provider 同形）。保留原 provider IDs、gateway URL、pi-native transport、D8-06 顺序和 client grants：

```yaml
providers:
  opencode-go:
    transport: pi-native
    baseUrl: http://host.orb.internal:14000
    auth: none
    headers:
      Authorization: "!test -n \"$PEPGENT_GATEWAY_TOKEN\" && printf 'Bearer %s' \"$PEPGENT_GATEWAY_TOKEN\""
```

`auth: none` 只表示 consumer 本地不把 gateway bearer 当成 provider API key，不关闭 gateway 的认证。header command 先检查变量非空；命令失败/空输出按 OMP 的 command-secret 规则不产生派生 header，gateway 仍拒绝未认证请求。不通过 `--api-key` 或 provider credential env 注入这个 gateway token，不将 resolved header 写入日志。没有新代理、缓存过滤器、cache 删除/重建机制，也没有修改 OMP 宿主源码。

五份 consumer 配置由修改后的 `setup.py` 统一重新生成，进程内确认五个 token 与整个 grants 文件保持不变。Slurm guest 的 `/home/pepgent/.config/pepgent-gateway/models.yml` 也沿原注入路径更新，mode `0600`，不是仅修 Mac 副本。

**真实连续启动验收。**

```sh
python3 ~/Ext/work/orbstack/pepgent-gateway/cache-proof.py
```

新建的一次性容器使用 A0 独占 token；开始时 `/work/cache-home/.omp` 不存在。三个独立 omp 进程在同一容器、同一 HOME、同一个 `models.db` 上依次运行，均明确选 `opencode-go/deepseek-v4.1-flash` 并返回 `ok`。没有在两次启动之间删除或替换数据库，也没有换 fallback 模型：

```text
docker exit=0
clean_home=true; same_home_for_all_starts=/work/cache-home
omp/18.14.2
startup=1
ok
cache_rows=36; configured_provider_models=19; malformed_configured_provider_rows=0
startup=2
ok
cache_rows=36; configured_provider_models=19; malformed_configured_provider_rows=0
startup=3
ok
cache_rows=36; configured_provider_models=19; malformed_configured_provider_rows=0
three_real_completions=true; same_home_cache=true; configured_provider_cache_stable=true
provider_token_prefix_matches=0; client_token_literals_in_logs=0
```

三次 safe cache 投影相同：配置中三个 provider 的缓存模型仅有 19 个正常 `anthropic` bare IDs（包括 `claude-haiku-5-5`）；没有由 gateway token 触发的 OpenCode/Codex native-discovery cache rows，没有将其它 provider 的 qualified IDs 塞进 OpenCode 的记录。OpenCode 从原生 bundled catalog 解析 canonical bare ID，由真实三次补全证明可用。证据：`pepgent-gateway/evidence/cache-startups.log`、`cache-startups.json`。

对实际变更后的配置还重走了 Komodo 和 Slurm：本节上方的 Komodo Update `6ae69157017c7f401f3d4a2e` 完成并输出 `ok/exit0`，Slurm REST job `65` 为 `COMPLETED/SUCCESS/0` 并输出 `ok`。这验证 command-resolved header 在两种 runtime 中实际工作，不以配置可解析替代模型调用。新日志的 provider-prefix/client-token 扫描仍为零。Komodo 通过 `DestroyStack` / `DeleteStack` 清理；cache proof 的 `--rm` 自动删除；最终按 `name=pepgent-gateway-env02` 过滤的 Docker 容器和网络均为空，Periphery 的本轮目录也已移除。

本修正只解除 consumer 配置导致的缓存模型路由问题，不宣称 [设置覆盖任务](https://github.com/Pepgent/soroi/issues/186) 的完整成功 handback→idle→parked 或 [A0 五类验收](https://github.com/Pepgent/soroi/issues/235) 已通过。
