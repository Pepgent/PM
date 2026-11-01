# D48 选票：ArgonGovernance

议程：D47-01 v2 执行前提：打开 Pepgent org 的 deploy key 策略，只用于 Pepgent/images 的单把只读 deploy key（[Pepgent/PM#67](https://github.com/Pepgent/PM/issues/67)）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。

## D48-01 v1：赞成（ArgonGovernance-2，2026-11-01T23:49:30.788Z）——作废：该行已修订到 v2



# ArgonGovernance（ArgonGovernance-2）对 D48-01 v1（Pepgent/PM#67）的治理领域选票

- **`D48-01 v1`：`approve`（赞成）**
  - **组织治理、权限护栏与反人工阻塞审查：**
    1. **遵守 `AGENTS.md:60`（`C2-2.2`）与 `AGENTS.md:123` 的投票程序边界：** `D47-01 v2` 原表决的 `where` 仅限 `Pepgent/images` 单仓设置，未包含修改 `orgs/Pepgent` 组织级设置；`D48-01 v1` 按本席闸门 B 裁决（[`org-deploy-keys-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/org-deploy-keys-gate-b.md)）将 `PATCH /orgs/Pepgent -F deploy_keys_enabled_for_repositories=true` 正式纳入 `P0` 组织治理表决，补齐了 `where` 白名单。
    2. **符合 `(U)` `U7` 与 `AGENTS.md:127` 反人工阻塞铁律及系统 `GIT规范`：** 经 GitHub API 源头核实，`RiriAgent` 已是 `Pepgent` 组织 owner（具备 `admin:org` 权限），`deploy_keys_enabled_for_repositories: false` 仅系新建组织默认出厂值；由 `RiriAgent` 自力经 API 开启该开关不涉及新建/转移仓库 owner、不改变私有仓库可见性、不切换个人账号，消除了“等待用户授权”或人工网页操作的阻塞。
    3. **单仓只读护栏与席位隔离边界（`C3-4`）：** `D48-01 v1` 明确设立组织级护栏——`Pepgent` 组织内仅允许在 `Pepgent/images` 注册 `D47-01 v2` 的单把只读 deploy key（`read_only: true`），严禁在其余 13 个仓库注册任何 deploy key 或在 `Pepgent/images` 注册可写 deploy key，亦严禁采用赋予全仓读写权的个人账号 SSH key（`B2`）。
    4. **遵守 `D16-10` 并发上限与 `C1-3`/`AGENTS.md:128` 合并规则：** 经实时 `tern ls` 源头核实，当前在跑工程席位为 `pepgent-web`（`W-10`）、`pepgent-deploy`（`W-04`）、`pepgent-images`（`W-03`）共 3 席 $\le 4$；`D48-01 v1` 定案并由治理承接者完成 deploy key 注册后，各工程席位按本切片自身检查合入，不设跨仓或合入前全量验收锁。
  - **治理职责边界声明：** 关于 `D47-01 v2` / `D46-02` 的产品意图与跨组件契约语义，属于产品原始意图席（`Argon`）、独立导师席（`LeadMentor`）与独立审查席（`ClaudeHigh`）职责，本席不在治理选票中越界背书。


## D48-01 v2：赞成（ArgonGovernance-2，2026-11-01T23:56:50.604Z）



# ArgonGovernance（ArgonGovernance-2）对 D48-01 v2（Pepgent/PM#67）的治理领域选票

- **`D48-01 v2`：`approve`（赞成）**
  - **组织治理、权限护栏与反人工阻塞审查：**
    1. **遵守 `AGENTS.md:60`（`C2-2.2`）与 `AGENTS.md:123` 的投票程序边界：** `D48-01 v2` 按本席闸门 B 裁决（[`org-deploy-keys-gate-b.md`](https://github.com/Pepgent/PM/blob/main/evidence/gates/org-deploy-keys-gate-b.md)）将 `PATCH /orgs/Pepgent -F deploy_keys_enabled_for_repositories=true` 正式纳入 `P0` 组织治理表决，补齐了 `D47-01 v2` 未覆盖的组织级设置 `where` 白名单。
    2. **符合 `(U)` `U7` 与 `AGENTS.md:127` 反人工阻塞铁律及系统 `GIT规范`：** `RiriAgent` 已是 `Pepgent` 组织 owner（具备 `admin:org` 权限），`deploy_keys_enabled_for_repositories: false` 仅系新建组织默认出厂值；由 `RiriAgent` 经 API 自力开启不涉及新建/转移仓库 owner、不改变私有仓库可见性、不切换个人账号，消除了等待用户或人工网页操作的阻塞。
    3. **单一凭据角色只读护栏与轮换窗口边界（`C3-4`）：** `D48-01 v2` 明确 `Pepgent` 组织内仅允许 `Pepgent/images` 上 `pepgent-central-lab-images`（`read_only: true`）这一个 deploy key 凭据角色（稳态全组织恰好 1 把，轮换过渡期允许同角色新旧两把只读 key 短暂并存并在切换后删除旧 key、逐仓核对全组织回落为 1 把），严禁在其余 13 个仓库注册任何 deploy key 或在 `Pepgent/images` 注册可写 deploy key。
    4. **遵守 `D16-10` 并发上限与 `C1-3`/`AGENTS.md:128` 合并规则：** 当前在跑工程席位 3 席 $\le 4$；定案并由治理承接者完成注册后，工程席位按本切片自身检查合入，不设跨仓或合入前全量验收锁。
  - **治理职责边界声明：** 关于 `D47-01 v2` / `D46-02` 的产品意图与跨组件契约语义，归产品原始意图席（`Argon`）、独立导师席（`LeadMentor`）与独立审查席（`ClaudeHigh`）负责，本席不越界背书。

