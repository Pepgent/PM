# `D47-01 v2` 执行阻塞（`Pepgent` 组织级 `deploy_keys_enabled_for_repositories=false`）—— 闸门 B（组织治理与分配守护席 `ArgonGovernance-2`）事前把关裁决

- **审查席位：** `ArgonGovernance-2`（组织治理与分配守护席，`.omp/agents/argon-governance.md` §6、§11、§13、§20–22，`AGENTS.md` C2-2.2、D1-12）
- **对应初审文档：** `local://decisions/org-deploy-keys.md`（`DeskOrgDeployKeys`）
- **关联议题与决策：** [`Pepgent/PM#66`](https://github.com/Pepgent/PM/issues/66)（`D47-01 v2`）、[`Pepgent/deploy#26`](https://github.com/Pepgent/deploy/issues/26)、[`Pepgent/deploy#27`](https://github.com/Pepgent/deploy/pull/27)
- **源头核对依据：**
  1. `LEDGER.md` 全文（含 `R1–R21`、`D47`、`(U)` `U7`、`U23`、`R3`）与 `AGENTS.md` 全文（第 1–129 行，含 `C2-2.2`、`C3-4`、`AGENTS.md:123,127`）；
  2. GitHub API 实时源头核实（`RiriAgent`）：
     - `gh api orgs/Pepgent`：`{"login":"Pepgent","deploy_keys_enabled_for_repositories":false,"created_at":"2026-09-11T07:13:25Z","updated_at":"2026-09-11T07:16:20Z"}`（新建组织默认值为 `false`）；
     - `gh api repos/Pepgent/images`：`{"full_name":"Pepgent/images","private":true,"permissions":{"admin":true,"maintain":true,"pull":true,"push":true,"triage":true}}`；
     - `RiriAgent` 具备 `Pepgent` 组织 `admin`（owner）角色与 `admin:org` token scope。

---

## 一、闸门 B 逐问裁决（仅审组织范围、路径/设置白名单、反人工阻塞与投票程序边界）

### 1. 对 `QB1` 的判定：`B1`（打开 `orgs/Pepgent` 的 `deploy_keys_enabled_for_repositories=true`）属于 **② 必须投票的事项（按 `priority: P0`、`domains: [governance]` 立案表决）**

1. **为什么不属于 ①“只有用户能授权的事项（`AGENTS.md:127`）”：**
   - 系统规则 `GIT规范` 与 `LEDGER.md:17`（`R3`）、`AGENTS.md:127` 明确界定：日常 git/gh 操作使用 `RiriAgent`；仅当需要**切换 `Mouriya-Emma` 个人账号**或**新建仓库/fork 且用户未指定 owner** 时才需用户选择或确认。
   - `RiriAgent` 本身已是 `Pepgent` 组织的 owner（具备 `admin:org` 权限），`deploy_keys_enabled_for_repositories: false` 仅系 GitHub 新建组织时的默认出厂开关（`2026-09-11T07:13:25Z`），开启该开关不新建或转移仓库 owner、不改变私有仓库可见性、不切换个人账号，且只允许 org admin 为仓库注册 deploy key（本身不向任何外部主体授予访问权）。
   - 依 `(U)` `U7`（`LEDGER.md:103`：“我现在去睡觉了，你不要来问我任何问题，没有任何应该block的东西，你应该自行和ai们商量解决。”）与 `AGENTS.md:127`（“禁止设‘等待用户回答’一类的 blocker”），将 `RiriAgent` 可自力执行的组织设置调整设为“等待用户授权”的 blocker 直接违反 `U7` 与 `AGENTS.md:127`。
2. **为什么不属于 ③“可免票直接放行”，而属于 ②“必须投票的事项（`P0` + `domains: [governance]`）”：**
   - `D47-01 v2`（`PM#66`）已表决通过的 `where` 列仅写明：`` `Pepgent/images` 仓库设置：Deploy keys（只读，由 RiriAgent 经 API 添加）``，并未包含 `Pepgent` 组织级设置（`PATCH /orgs/Pepgent` `deploy_keys_enabled_for_repositories=true`，该开关作用于 `Pepgent` 组织下全部 14 个仓库）。
   - 依 `AGENTS.md:60`（`C2-2.2`）与 `AGENTS.md:123`（“禁止 leader 以‘实现期澄清’‘leader 裁决、不重投’的名义单方新增或改变……权限……或部署前提；这些按决策规则作为决策项投票”），将单仓设置扩展为修改 `orgs/Pepgent` 组织级策略跨越了 `D47-01 v2` 已表决的 `where` 白名单边界。
   - 因此，闸门 B 判定 **`B1` 越过 `D47-01 v2` 单仓 `where` 白名单，不可免票直接调用 `PATCH /orgs/Pepgent`，必须按 `priority: P0`、`domains: [governance]` 发起议会投票**，在决策项 `where` 与 `how` 中明确写清：授权 `RiriAgent` 执行 `PATCH /orgs/Pepgent -f deploy_keys_enabled_for_repositories=true`，并设立组织治理护栏——**仅允许在 `Pepgent/images` 注册 `D47-01 v2` 规定的单把只读 deploy key（`read_only: true`），严禁在 `Pepgent` 其余 13 个仓库注册任何 deploy key 或在 `Pepgent/images` 注册可写 deploy key**。

### 2. 对 `QB2` 的判定：`B2–B6` 中**不存在**可免票采用的路径

- **`B2`（将公钥注册为 `RiriAgent` 个人账号 SSH key `POST /user/keys`）：严禁采用。** 该方式赋予密钥对 `RiriAgent` 名下及所属组织全部 14 个 `Pepgent` 仓库的**读写权限**，严重破坏 `D47-01 v2` 的“单仓只读”边界与 `C3-4` 仓库隔离边界。
- **`B3`（GitHub App 1 小时安装令牌）：不可行且越界。** 属 `D47-01` 已否决落选项。
- **`B4`（fine-grained PAT）与 `B5`（新建机器账号）：严禁采用。** 均需人工网页/sudo/人机校验，已由 `deploy26-blocked-gate-b.md` 依 `U7` 与 `AGENTS.md:127` 判定违例。
- **`B6`（转移 `Pepgent/images` 仓库 owner）：严禁采用。** 改变仓库 owner 属系统规则 `GIT规范` 与 `AGENTS.md:127` 明确列明的需用户授权事项，且破坏全部下游引用。

---

## 二、闸门 B 结论汇总

1. **结论：越界（须按 `P0` 立案投票，严禁免票直接修改 `orgs/Pepgent` 设置，也严禁设为等待用户的 blocker）。**
2. **QB1：** `B1` 属于 **② 必须投票的事项**（按 `priority: P0`、`domains: [governance]` 立案表决授权 `RiriAgent` 开启 `orgs/Pepgent` 的 `deploy_keys_enabled_for_repositories=true`，并严格限定仅在 `Pepgent/images` 注册 `D47-01 v2` 的只读 deploy key、禁止在其他 13 个仓库注册 deploy key）。
3. **QB2：** `B2–B6` 均无免票可用路径。
4. **治理职责边界声明：** 关于 `B1` 是否触及产品原始意图或公开契约（`QA1`、`QA2`），由产品原始意图席 `Argon`（闸门 A）独立裁定。
