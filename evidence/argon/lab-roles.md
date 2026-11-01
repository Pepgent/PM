# Pepgent Lab 角色权限矩阵裁决（D7-03 / LAB-03：`MemberRole` × 四项权限）

- **目标：** 为 `D7-03`（`Pepgent/PM#7`）与 `LAB-03`（`Pepgent/Pepgent#12`）提供 `owner | researcher | student | guest` × `startWithoutApproval | approve | buildImages | manageMembers` 共 16 格的 `grant` / `deny` 矩阵、`(U)` / `(D)` 证据链，以及 **【定】** 与 **【暂定】** 划分。
- **裁决人：** `argon`（用户意图守护者，依 `LEDGER.md` U1、U11、U20 及 `D1-16`）。

---

## 一、16 格角色权限矩阵总表

| 角色 (`MemberRole`) | `startWithoutApproval`<br>（免审批启动实验，`D7-06`） | `approve`<br>（批准待审批实验启动与自动化动作，`D7-06`/`D7-10`/`D7-14`） | `buildImages`<br>（构建与推送容器镜像，`D7-13`） | `manageMembers`<br>（邀请、改角色、改配额、移出成员，`D7-14`） |
| --- | --- | --- | --- | --- |
| **`owner`**（负责人） | **`grant` (`true`)** · **【定】** | **`grant` (`true`)** · **【定】** | **`grant` (`true`)** · **【定】** | **`grant` (`true`)** · **【定】** |
| **`researcher`**（研究员） | **`grant` (`true`)** · **【定】** | **`grant` (`true`)** · **【定（本实验）/ 暂定（全 Lab 单布尔折叠）】** | **`deny` (`false`) 或 `grant` (`true`)** · **【暂定（交 leader 定技术默认）】** | **`deny` (`false`)** · **【定】** |
| **`student`**（学生） | **`deny` (`false`)** · **【定】** | **`deny` (`false`)** · **【定】** | **`deny` (`false`)** · **【定】** | **`deny` (`false`)** · **【定】** |
| **`guest`**（访客） | **`deny` (`false`)** · **【定】** | **`deny` (`false`)** · **【定】** | **`deny` (`false`)** · **【定】** | **`deny` (`false`)** · **【定】** |

### 【定】与【暂定】分布汇总

1. **【定】（14 格完全定 + 1 格核心定）：**
   - **`owner` 全部 4 格：** `(owner, startWithoutApproval) = grant`、`(owner, approve) = grant`、`(owner, buildImages) = grant`、`(owner, manageMembers) = grant`。
   - **`researcher` 的 2 格完全定：** `(researcher, startWithoutApproval) = grant`、`(researcher, manageMembers) = deny`。
   - **`researcher` 的 1 格核心定 + 布尔粒度暂定：** `(researcher, approve) = grant`——用户设计的原型明确赋予 `Researcher`“运行并审批自己的实验”（`Run and approve own experiments` / `Can approve: Runs in own experiments`），因此在四动作布尔模型下赋予 `grant` 为 **【定】**；但 `D7-03` 将原型的“审批自己的实验（`Runs in own experiments`）”与 `Owner` 的“审批运行、镜像构建、成员变更（`Runs, image builds, member changes`）”合并为同一个全 Lab 级布尔动作 `approve`（不再区分是否本人实验或自动化规则），这一单布尔粒度折叠属 **【暂定】** 技术简化，由 leader 确认。
   - **`student` 全部 4 格：** `(student, startWithoutApproval) = deny`、`(student, approve) = deny`、`(student, buildImages) = deny`、`(student, manageMembers) = deny`。
   - **`guest` 全部 4 格：** `(guest, startWithoutApproval) = deny`、`(guest, approve) = deny`、`(guest, buildImages) = deny`、`(guest, manageMembers) = deny`。
2. **【暂定】（1 格完全暂定，交 leader 作为技术默认值拍板）：**
   - **`(researcher, buildImages)`：** 原型将权限开关设计为按成员个体切换（`it.id === 'jd' || it.id === 'lw'`），导致同为 `Researcher` 的两名成员在原型与 fixture 中取值相反：李伟（`lw`，`role: 'researcher'`）为 `buildImages: true`（`grant`），加藤（`mk`，`role: 'researcher'`）为 `buildImages: false`（`deny`），而角色定义文案仅写 `"Run and approve own experiments"`。`D7-03` 将权限改为纯按角色（`MemberRole`）由 Better Auth access control 判定、不在 Lab 表做逐人覆盖后，`(researcher, buildImages)` 在原型中无唯一角色级结论，亦无 `(U)` 原话单独裁定，故标为 **【暂定】**，交由 leader 指定技术默认值（建议技术默认见第三节）。

---

## 二、证据基线：`(U)` 用户原话与 `(D)` 原型/契约证据

### 2.1 `(U)` 用户原话证据（确立用户亲自设计的 AI4S 原型为 Lab 业务层意图基线）

历史会话全量检索（含 `01a18e1f`、`01a192a2`、`01a193fd`、`01a0e289`）确认：用户未在聊天文本中逐字背诵 16 格布尔值，但明确声明 `AI4S-prototype`（源自 `pepgent-doc` 中的 `AI4S实验室平台原型.zip`）是其本人设计的业务层，并在 `ask` 决策中明确拒绝删除原型成员角色页、废除旧仓库冲突设计文档：

1. **(U) 原型即用户设计的业务层** — `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e818d410`（`2026-10-30T18:54:42.565Z`）：
   > “全面阅读这个原型，这是soroi的业务层，所以先了解业务就知道我为什么会做这种设计了”
2. **(U) 转向后保留原型 App 层业务设计** — `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/e3692177`（`2026-10-30T19:03:59.544Z`）：
   > “大体上来说，我认为虽说动了核心设计，但是app层的业务好像几乎不用动，只是因为反转以后，体验更好了”
3. **(U) 按 `AI4S-prototype` 实现 Pepgent 前端与业务面** — `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/1951b981`（`2026-10-31T15:45:13.251Z`）：
   > “如果要按AI4S-prototype这个原型来实现，在现在的基础上，现在有了基本的ai ui，你要怎么实现”
4. **(U) 明确保留原型 `Owner/Researcher/Student/Guest` 成员角色页、作废旧业务仓设计文档** — `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/ed4570ad`（`ask` 调用 `#d5a684d3` → 结果 `#ed4570ad`，`2026-10-31T16:03:19.920Z`）：
   - Assistant 在 `conflict_features` 提问的 `brief.where` 中点名指出：
     > `成员页的 Owner/Researcher/Student/Guest、配额、邀请（AI4S-Settings-Hi-Fi.dc.html:161-173,299-305）违反 N19/N24……`
     并提供选项“裁掉冲突部分……成员页、配额审批……全删”。
   - 用户明确拒绝删除原型成员角色页，直接输入自定义回答：
     > `"本仓库所有的设计文档均不做数，都是遗留垃圾，应该删除"`
5. **(U) 授权按原型落地类型化契约与 fixture** — `session://01a192a2-8358-7559-bf46-e3ed6e387d73/entry/9df25cb1`（`2026-10-31T17:43:44.765Z`）：
   > “去实现吧，这个实现可以用task high来做”

### 2.2 `(D)` 原型（`pepgent-doc` / `AI4S-prototype`）与前端契约（`lab-compute.ts` / `compute.ts`）证据

1. **四个角色的定义与权限边界说明（`Change role` 弹窗 `DL.role`）：**
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S Settings Hi-Fi.dc.html:215,221`
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html:303,309`
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab-fixture/compute.ts:6476-6497`
   ```js
   const ROLES = [['owner', L('Owner', '负责人')], ['res', L('Researcher', '研究员')], ['stu', L('Student', '学生')], ['guest', L('Guest', '访客')]];
   // DL.role:
   {
     owner: L('Everything, including members and billing', '全部权限，包括成员与费用'),
     res:   L('Run and approve own experiments', '运行并审批自己的实验'),
     stu:   L('Runs need approval', '运行需要审批'),
     guest: L('Read-only', '只读')
   }
   ```
2. **成员列表、详情面板 `Access`、权限开关 `Permissions` 与权限矩阵面板 `PV.members`：**
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent-doc/AI4S Settings Hi-Fi.dc.html:151-162`
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/AI4S-Settings-Hi-Fi.dc.html:165-176,222-225,254-257`
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/contracts/lab-compute.ts:179-189`
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent/apps/web/src/client/services/lab-fixture/compute.ts:4576-4777,6105-6112`
   - 原型三项开关与 `Can approve` 列的定义：
     ```js
     // AI4S-Settings-Hi-Fi.dc.html:174 & :254
     detExtra: (it) => [{ t: L('Permissions', '权限开关'), toggles: [
       tg(it.id + 'run', L('Start runs without approval', '无需审批即可启动运行'), '', it.id !== 'sc'),
       tg(it.id + 'img', L('Build container images', '构建容器镜像'), '', it.id === 'jd' || it.id === 'lw'),
       tg(it.id + 'mem', L('Manage members', '管理成员'), '', it.id === 'jd')
     ] }]
     ```
     ```js
     // AI4S-Settings-Hi-Fi.dc.html:222-225
     const MEMX = {
       jd: { role: L('Owner', '负责人'), ..., appr: L('Runs, image builds, member changes', '运行、镜像构建、成员变更'), ... },
       lw: { role: L('Researcher', '研究员'), ..., appr: L('Runs in own experiments', '自己实验的运行'), ... },
       mk: { role: L('Researcher', '研究员'), ..., appr: L('Runs in own experiments', '自己实验的运行'), ... },
       sc: { role: L('Student', '学生'), ..., appr: L('Needs approval: runs, containers', '需审批：运行、容器'), ... }
     };
     ```
   - 待接受邀请中的 `Guest` 定义（`AI4S-Settings-Hi-Fi.dc.html:176`，`compute.ts:6106-6111`）：
     ```js
     { a: 'r.ito@partner-lab.org', b: L('Guest · read-only on Phase Transitions', '访客 · 相变研究只读'), c: L('Sent Sep 24', '9月24日发送'), act: L('Resend', '重新发送') }
     ```
3. **自动化与实验审批流（`approve` 动作的消费处）：**
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent/AI4S-prototype/AI4S-Automation-Hi-Fi.dc.html:143-147,161-163,193`：副标题写明 `"anything irreversible waits for a person"` / `"不可逆的操作会停下来等人确认"`；规则 `A-03` 的动作为 `[L('Start the next draft in the queue', '启动队列中的下一个草稿'), '', L('Needs approval', '需人工确认')]`，运行记录含 `['wait', 'Apr 23', 'Ready to start R-022 on XRD-700', ..., L('Approve & start', '确认并启动')]`。
   - `(D)` `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D7-lab-backend.md:63,66,70,74`：
     - `D7-03`：四项权限由 Better Auth access control 定义：`startWithoutApproval`（启动实验不经审批，D7-06）、`approve`（批准待审批的实验启动与自动化动作，对应原型 `MemberSettings.canApprove`，D7-06、D7-10）、`buildImages`、`manageMembers`。
     - `D7-14`：成员的 `canApprove` 来自 `approve` 权限（D7-03）。

---

## 三、逐格裁决与证据明细（16 Cells）

| # | 角色 (`MemberRole`) | 动作 (`Action`) | 裁决值 | 定 / 暂定 | 依据（`(U)` + `(D)`） |
| --- | --- | --- | --- | --- | --- |
| 1 | `owner` | `startWithoutApproval` | **`grant` (`true`)** | **【定】** | **(U)** `01a18e1f #e818d410, #e3692177`、`01a192a2 #1951b981, #ed4570ad, #9df25cb1`；**(D)** `AI4S-Settings-Hi-Fi.dc.html:174,254,309`（`Owner: "Everything, including members and billing"`；`jd` 的 `Start runs without approval` 默认 `true`），`compute.ts:4598`（`startWithoutApproval: true`）。 |
| 2 | `owner` | `approve` | **`grant` (`true`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:167,222,309`（`jd` 的 `Can approve` 为 `"Runs, image builds, member changes"` / `"运行、镜像构建、成员变更"`），`compute.ts:4596,4612-4614`。 |
| 3 | `owner` | `buildImages` | **`grant` (`true`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:174,254,309`（`jd` 的 `Build container images` 默认 `true`），`compute.ts:4599`（`buildImages: true`）。 |
| 4 | `owner` | `manageMembers` | **`grant` (`true`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:174,254,309`（`Owner: "Everything, including members and billing"` / `"全部权限，包括成员与费用"`；`jd` 的 `Manage members` 默认 `true`），`compute.ts:4600`（`manageMembers: true`）。 |
| 5 | `researcher` | `startWithoutApproval` | **`grant` (`true`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:174,254,309`（`Researcher: "Run and approve own experiments"` / `"运行并审批自己的实验"`，与 `Student: "Runs need approval"` 直接对照；两名 `Researcher` 成员 `lw`、`mk` 的 `Start runs without approval` 均为 `true`），`compute.ts:4645,4692`。 |
| 6 | `researcher` | `approve` | **`grant` (`true`)** | **【定（本实验审批）/ 暂定（单布尔折叠）】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:169,223,224,309`（`Researcher` 角色定义为 `"Run and approve own experiments"`，`lw` 与 `mk` 在权限矩阵中的 `Can approve` 均为 `"Runs in own experiments"` / `"自己实验的运行"`），`compute.ts:4643,4660,4690,6485`。在 `D7-03`/`D7-14` 的四权限模型中，`canApprove` 由 `approve` 投影，若设为 `deny` 则直接违背原型对 `Researcher`“运行并审批自己的实验”的定义并使 `lw`/`mk` 丧失 `canApprove`。至于 `D7-03` 不区分“本人实验 vs 全 Lab 实验/自动化”而直接折叠为单一布尔值 `approve: true`，该粒度简化属 **【暂定】**（技术默认交 leader 确认）。 |
| 7 | `researcher` | `buildImages` | **【暂定】**（交 leader 定技术默认：`grant` 或 `deny`） | **【暂定】** | **无 `(U)` 裁决，且 `(D)` 内部两样本冲突：** 在 `AI4S-Settings-Hi-Fi.dc.html:174,254` 与 `compute.ts:4646,4693` 中，原型按成员 ID（`it.id === 'jd' \| it.id === 'lw'`）赋予开关初值，同为 `researcher` 角色的 `lw`（李伟）为 `buildImages: true`，而 `mk`（加藤）为 `buildImages: false`；`DL.role`（`:309`）的 `Researcher` 说明 `"Run and approve own experiments"` 未提及构建镜像，`Owner` 的 `Can approve`（`:167`）则写了 `"Runs, image builds, member changes"`。因 `D7-03` 取消逐人开关、改为纯按 `MemberRole` 判定，此格标为 **【暂定】**，交由 leader 定夺技术默认值：<br>• **若选 `grant` (`true`)：** 保持研究员（如负责仪器节点的 `lw`）可直接在容器页执行 `image.build`（`D7-13`）而无需事事依赖 `owner`；<br>• **若选 `deny` (`false`)：** 对齐 `mk` 与 `Owner` 对镜像构建的集中把控，只允许 `owner` 构建镜像。 |
| 8 | `researcher` | `manageMembers` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:174,254,309`（仅 `Owner` 含 `"members and billing"`，`lw` 与 `mk` 的 `Manage members` 均为 `false`），`compute.ts:4647,4694`。 |
| 9 | `student` | `startWithoutApproval` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:173,174,225,254,309`（`Student: "Runs need approval"` / `"运行需要审批"`；博士生 `sc` 详情明确写 `Needs approval for: "Starting runs, binding containers"` / `"启动运行、绑定容器"`，开关 `it.id !== 'sc'` 为 `false`），`compute.ts:4734,4748-4749,6490`。 |
| 10 | `student` | `approve` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:173,225,309`（`sc` 的 `Can approve` 列显示 `"Needs approval: runs, containers"` / `"需审批：运行、容器"`，详情显示 `Mentor: "J. Doe"`，其角色定位是被审批对象而非审批人），`compute.ts:4732,4748-4753`。 |
| 11 | `student` | `buildImages` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:173,174,254`（`sc` 的 `Build container images` 为 `false`，且 `Needs approval for: "Starting runs, binding containers"`），`compute.ts:4735`。 |
| 12 | `student` | `manageMembers` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:174,254,309`（`sc` 的 `Manage members` 为 `false`），`compute.ts:4736`。 |
| 13 | `guest` | `startWithoutApproval` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** `AI4S-Settings-Hi-Fi.dc.html:176,309`、`pepgent-doc/AI4S Settings Hi-Fi.dc.html:162,221`、`compute.ts:6108-6109,6493-6496`（`Guest` 在 `Change role` 中明确定义为 `"Read-only"` / `"只读"`，在 `Pending invitations` 中定义为 `"Guest · read-only on Phase Transitions"` / `"访客 · 相变研究只读"`；只读身份禁止发起或免审批启动运行）。 |
| 14 | `guest` | `approve` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** 同上（`Guest` 为 `"Read-only"` / `"只读"`，禁止执行任何运行或自动化审批动作）。 |
| 15 | `guest` | `buildImages` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** 同上（`Guest` 为 `"Read-only"` / `"只读"`，禁止构建或推送容器镜像）。 |
| 16 | `guest` | `manageMembers` | **`deny` (`false`)** | **【定】** | **(U)** 同上；**(D)** 同上（`Guest` 为 `"Read-only"` / `"只读"`，禁止管理实验室成员）。 |

---

## 四、Argon 三类交付结论（依角色规范）

1. **意图裁决（Argon 权限 1）：**
   - **【定】** 用户在 `(U)` `01a18e1f #e818d410, #e3692177` 与 `01a192a2 #1951b981, #ed4570ad, #9df25cb1` 中明确确立 `AI4S-prototype`（含 `AI4S-Settings-Hi-Fi.dc.html` 的四角色模型）为 Pepgent Lab 业务层设计意图，并废除旧仓库冲突设计文档。据此：
     - `owner` 四项权限全开（`grant, grant, grant, grant`）为 **【定】**；
     - `student` 四项权限全关（`deny, deny, deny, deny`）为 **【定】**；
     - `guest` 作为只读角色（`Read-only`）四项权限全关（`deny, deny, deny, deny`）为 **【定】**；
     - `researcher` 的 `startWithoutApproval = grant`、`manageMembers = deny`，以及具备实验运行审批权（`approve = grant`）为 **【定】**。
   - **【暂定】**
     - `(researcher, buildImages)`：因原型按成员个体赋初值（`lw = true`、`mk = false`），在 `D7-03` 纯角色级权限模型下无唯一意图结论，标为 **【暂定】**，交由 leader 作为技术默认值拍板。
     - `(researcher, approve)` 的作用范围折叠：原型为 `"Runs in own experiments"`，`D7-03` 折叠为无范围区分的单布尔 `approve: true`，该简化属 **【暂定】** 技术设计，交由 leader 确认。
2. **对技术、串联、实现条目的投票（Argon 权限 4）：**
   - 对 `D7-03`、`D7-06`、`D7-10`、`D7-13`、`D7-14` 维持 **赞成**；对 leader 在 `(researcher, buildImages)` 上选定 `grant` 或 `deny` 任一技术默认值均无意图异议。
3. **否决（Argon 权限 2）：**
   - **0 项否决**（无违背 `(U)` 原话的条目，不行使一票否决权）。
