# F01：A0 真实发行五类安装验收（2026-11-10，PASS）

**结论：PASS。** 本目录是 [Pepgent/soroi#235](https://github.com/Pepgent/soroi/issues/235) 验收第 1 行（结果 1–4）那一次真实运行的原始证据，用于满足结果 4「同一 release 的 D8 A0 Verdict、raw PTY、root/child transcript、原始来源及复现命令归档并 push 到 PM」。本 README 是归档时写的说明，不是运行产物；其余文件都是从运行目录逐字节复制来的。

## 运行身份

| 项 | 值 |
|---|---|
| 发行 | 仓 B `Pepgent/omp-soroi` Release workflow，CI run [42741430236](https://github.com/Pepgent/omp-soroi/actions/runs/42741430236)，manifest version `dc7d05d4b219a12a191078fac5604658682fe103` |
| 发行 tar | `soroi-c85c66c6cc01e07c41637c7ae3fe3436ad5183203c9379fb9d3b405b8d6fbc76.tar`（`build.release`；身份只用于定位工件，不作哈希验证证据） |
| 驱动 | `Pepgent/soroi@7d83c5d57d296986cf7dc233b19f5462511e937d` 的 `e2e/pty/a0-install.sh` |
| IMG-01 | `pepgent-registry.orb.local:5000/pepgent/omp-agent@sha256:ee23be181f1d06376796a99ea4369a892fd70978b67ddde69c717441832d69c1` |
| omp / 模型 | `18.15.0` / `opencode-go/deepseek-v4.1-flash` |
| 网络与共享服务 | 现有 `pepgent-soroi-e2e` 网络、store、mux；未重启，也不属于本次清理对象 |
| 时间 | Verdict `startedAt 2026-11-10T02:59:23.472Z`，`endedAt 2026-11-10T03:00:57.060Z` |
| ghc 记录 | `20261110T025918Z-cd78a1`（`ghc-record/`），rows `[1]`，completion `exited 0`，issueRev `2026-11-10T02:51:12Z` |

## 复现命令

在 soroi checkout 中运行：

```sh
bun campaign/emit-campaign.ts | e2e/pty/a0-install.sh /dev/stdin
```

`campaign/emit-campaign.ts` 是这次实际用的 campaign 生成器。驱动没有 mux bearer 的文件字段，而产品要求 child 环境里必须有 `MUX_AUTH_TOKEN`（`omp-soroi@dc7d05d src/subagent/main/mux-writer.ts:78-87`）。所以生成器在运行时从 owner 文件读取 bearer，经进程管道交给驱动：bearer 不落盘、不进 argv、不进证据。这个缺口另行跟踪，修复后应改用文件字段。gateway token 走驱动既有的 `gatewayTokenFile` 字段。

## 结果

两份 Verdict（`evidence/verdict.json` 为驱动 root，`evidence/proof/verdict.json` 为 DIST-02 verifier）的 `result.kind` 都是 `pass`，`deviations` 为空。

| assertion | 观察 | 来源 |
|---|---|---|
| `extension` | 工具 `soroi_eval`、`soroi_task`；dry_run、无 pins/env；CallReport `outcome:ran`、`env:central`、`install_output:"42"` | root transcript 第 12–14 行 |
| `agent` | 发现 `soroi-worker.md`，root/child 模型均为 `opencode-go/deepseek-v4.1-flash`，spawn generation 与 child 观察一致，`soroi_return` 被接受 | child transcript 第 4 行 |
| `skill` | `skill://soroi-eval` 返回已安装的 `SKILL.md`，8688 字符 | root transcript 第 8–10 行 |
| `rule` | 五个 rule 文件都是 `alwaysApply`，全文在 system prompt 中 | root transcript 第 5 行 |
| `settings` | parent `pragmatic/yolo/2000`，child `none/yolo/2000` | child transcript 第 4 行 |
| `a0-driver-cleanup` | `[]` 对 `[]` | `evidence/cleanup.json` |

`evidence/cleanup.json` 为 `{"container":"pepgent-a0-f66aa45d-120d-4014-a0ff-e62f137319b8","errors":[]}`。驱动台账在 `03:00:57.052Z` 记录 `absent-confirmed`。

## 目录

- `evidence/`：运行目录 `/tmp/pepgent-dispatch/Rec235A0/evidence-a0-2/` 的完整复制（Verdict、`pty/a0.txt` 原始 PTY、`proof/sessions/` 原生 root/child transcript、prepared/recipe/verified-registration/library-setup、check.yml、central-config-projection.json、cleanup.json；`evidence/README.md` 是驱动自己写出的文件）。
- `campaign/emit-campaign.ts`：campaign 生成器（只含路径与参数，不含凭据值）。
- `ghc-record/`：`ghc ev run` 的记录（`record.json`、`stdout.txt`、`stderr.txt`）。
- `empty-directories.tar`：git 不保存空目录，这个容器只保存两个空目录 `evidence/store/` 与 `evidence/proof/sessions/2026-11-10T02-59-24-002Z_01a1c365-62e2-76f9-aebb-620fc9bc8f43/InstallCheckWorker/`，在本目录 `tar -xf empty-directories.tar` 即可还原。

## 凭据扫描

push 前做过两项扫描：

- 用 `grep -rlF -f` 对本目录全部文件比对 mux bearer 与 A0 gateway token 两个 owner 文件的字面值，无匹配。
- 对私钥 PEM 头、`gh[pousr]_`/`github_pat_`、`sk-`、Slack、AWS access key、长 Bearer 字面量做模式扫描，无匹配。

这只是有界的字面量扫描，不能保证文件中没有任何秘密。

## 范围

本次运行只覆盖 #235 的第 1 行。第 2 行（结果 5：两个中心入口的身份注入与捕获复用）不在本目录。
