# D8 soroi MVP：验收定义与实现计划（第 3 轮修订复核）— Argon 意图裁决与重投选票

- **对象：** `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-mvp-scope.md`（对照 `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D8-r1-responses.md`“第 2 轮”）
- **复核范围：** `D8-03`、`D8-06`、`D8-07`、`D8-09`（含验收矩阵 `F03` 及切片 `ENV-02`、`E2E-02`；其余 12 行未改动，维持赞成票）
- **投票席位：** `argon`（Gemini 族一票，依 U20 / D1-12、D1-16、D1-17）
- **计票汇总：**
  - **本轮改动行重投：4 赞成 / 0 反对 / 0 否决**（`D8-03`、`D8-06`、`D8-07`、`D8-09` 全部赞成）
  - **全表累计（D8-01 至 D8-16）：16 赞成 / 0 反对 / 0 否决**

---

## 一、改动行（D8-03、D8-06、D8-07、D8-09）意图裁决与重投表

| ID | 本轮修订内容摘要 | 起草分类 | 缺失/补充? | Argon 意图裁决（附 `(U)` 依据） | Argon 重投票 | 裁决与投票理由 |
| --- | --- | --- | --- | --- | --- | --- |
| **D8-03** | A0 新起的 `IMG-01` 容器加入 `pepgent-soroi-e2e` 网络，顺序固定为：(a) 检查 `ls -A $HOME` 为空、无 `~/.omp` → (b) 注入与 `central` 相同的 env、`models.yml` 及 A0 专属 client token → (c) 运行 `installer` → (d) 执行五类 PTY 探针 | 技术 | 是：U23 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U13、U23、U24** 与 `01a18e1f #9c291fe2` | **赞成** | 先在未注入状态下确认 `$HOME` 完全为空（排除 `omomp` 与宿主机残留），再注入网内连接配置与 client token 并运行 `installer`，保证 A0 五项真实运行探针（含 `soroi_eval` dry run 与 `soroi_task` 派 worker）既干净又可达 `store`、`Mux` 与 `auth-gateway`。 |
| **D8-06** | `auth-gateway` 的消费方列表增加 A0 使用的临时 `IMG-01` 容器（对应 `ENV-02` 的 `--clients` 文件为其单独准备一个 client token） | 技术 | 是 | **【定 · 符合原意】** 遵守凭据规则与 `D4-10`；【暂定】A0 容器独立 client token 分配 | **赞成** | 保持“一个消费方一个 client token、provider 凭据不进镜像或发行 tar”的隔离边界，同时让 A0 容器具备真实模型补全能力。 |
| **D8-07** | `slow_step` 将标记写到 `central` 容器内固定绝对路径 `/var/tmp/soroi-e2e/markers/<label>`（与 runner 临时 `cwd` 无关）；矩阵 `F03` 在 ① 断言 9 个违规段无标记，在 ② 断言合法步两条 `slow_step` 标记均存在（阳性对照） | 实现 | 否 | **【定 · 符合原意】** 依据 **(U)** `01a18ed5 #440c8605, #b7357c72, #13abc2a1, #276d1776, #98d47f20`（`FC:84`） | **赞成** | 消除了 runner 临时目录导致标记路径错位的假阴性漏洞，并通过 `F03 ②` 阳性对照证明探针本身真实有效。 |
| **D8-09** | 同步写明 A0 容器加入 `pepgent-soroi-e2e` 网络并按“先检查 HOME 为空 → 再注入 env 与凭据 → 安装 → 探针”顺序执行（同步更新 `E2E-02` 依赖 `ENV-02`） | 技术 | 是 | **【定 · 符合原意】** 依据 **(U) `LEDGER.md` U23、U24** 与 `01a18f4a #f488be08` | **赞成** | 与 `D8-03`、`D8-06`、`ENV-02`、`E2E-02` 完全闭合。 |

---

## 二、一票否决审查

- **否决结论：0 项否决（无否决）。** 本轮修订全部符合 `(U)` 用户原意，不行使否决权。
