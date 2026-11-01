# D16 逐条压力测试报告

## 总结结论

**结论：不同意按当前文本直接进入表决；D16 至少有 10 处会让主路径实际失效或使已恢复的决策正文彼此冲突。**

最严重的问题集中在五处：

1. **D16-05 采用了 D12 的新结论，却没有同步修订 D10-10 和 D10 第 63 行，导致同一次恢复同时生效两套相反规则。**
2. **D16-06 没有覆盖 annexA 的 3 项 BLOCKED，也没有覆盖 D10-05 点名的 live issue 全量改写；其列举的回写来源与 annexA 本身还不一致。**
3. **D16-09 的路径矩阵不是闭合矩阵：根 `package.json`、`bun.lock`、根 `README.md`、`compose/central-entrypoint.sh`、Pepgent 的依赖 manifest/lockfile 均没有稳定 owner；D16-05 所需 Pepgent git 依赖甚至没有任何席位有权写入。**
4. **D16-10 将 W-08 放到最后本身可以符合 C1-3，但 D16-01 又原样恢复 D10-05、D10-09 中“开发期编写 / 立即开工”的相反文字，形成同一决策内部冲突；W-08 启动条件还只列了 W-06、W-07、W-09，而不是全部实现席位。**
5. **D16-14 所称 D5/D6 链接“更正”方向完全反了：当前 LEDGER 已经是 D5→#5、D6→#6，D16 会把正确链接改错。**

以下逐条列出。

---

## D16-01：恢复 D10，并修订 D10-04、04、07、08、09

### 发现 1：D10-04 的“修订”只更新遗产快照，没有把原 D10-04 的完整迁移契约重新闭合

**分类：主路径失效反例**

D16-01 只明确重写了 STO-05、SOR-09、PR260、PR266 的当前遗产位置：

- `local://decisions/D16.md:17`

但原 D10-04 不只是这四个对象；它还有以下继续生效的动作：

- 建仓时迁入仓 B 的根发行文件；
- 迁出后从 `Pepgent/soroi` 删除已迁出路径；
- 同一 PR 周期更新 `lab-library`、`images`、`omp-soroi/package.json` 等外部引用；
- 转移未关闭的 STO、SOR、CUS、DIST issue；
- 更新 `D8-slice-issues` 映射。

证据：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:16`

D16-01 写的是“以下五行修订后恢复”，但修订后的 D10-04 没有说明：

- 原 ①②⑤⑥⑦⑧ 是否保持；
- 原 ④ 的 PR260 拆分规则是否仍保持，还是仅把它视为一个 OPEN 遗产；
- annexA 中 owner 未授权的 issue 转移 BLOCKED 如何与 D10-04⑦结合。

**具体反例：**

W-06、W-07 在迁仓前完成实现，之后用户授权创建仓 A/B。执行者只按 D16-01 明列的四个遗产对象接续，却没有被 D16-01 的修订文本明确要求执行 D10-04⑤⑥⑦。结果：

- 旧仓代码没有删除；
- 外部 README / dependency 没有改；
- OPEN issue 没有迁移；
- 新旧仓同时继续表现成源头。

这违反 C1-2 的独立仓边界：

- `LEDGER.md:16`

**应如何解决：**

D16-01 应明确写成：

> D10-04 仅替换 where 中的 INV 引用及 how 的③④遗产位置；①②⑤⑥⑦⑧原文继续有效。

并同时写清 D10-04⑦在 owner 未授权期间保持 BLOCKED，不算 D16-06 已完成。

---

### 发现 2：D10-05 的修订范围被错误缩成 annexA 表 A1，漏掉 D10-05 明确点名的 live issue 和映射重写

**分类：主路径失效反例**

D16-01 规定：

> issue 正文改写只由秘书在 D16 通过后按 annexA 表 A1 执行。

证据：

- `local://decisions/D16.md:17`

但原 D10-05 的执行范围包括：

- 4 个点名 live issue：soroi#182、#245、#250、#259；
- 其他同类 live issue；
- images#6、images#3、deploy#8 的重新核对；
- 把移出的跨组件义务逐项归入 E2E/A0/S1/S2 issue；
- D8 §4.1、§4.2、D8-13、D8-14 和相关切片行的正文重写；
- PM 映射更新。

证据：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:17`

而 annexA 明确说明，表 A1 只有 46 个 D8 映射 issue；4 个点名 live issue被“独立列示”，并不属于 A1 的执行表：

- `local://decisions/D16-annexA.md:128-137`
- `local://decisions/D16-annexA.md:224-227`

**具体反例：**

秘书严格按 D16-01 与 D16-06 的“A1”执行：

- soroi#245、#250、#259 仍保留旧开发期 live 定位；
- images#6 和 deploy#8 未按恢复后的 D10-05 重新改成统一阶段工作项；
- 被移出的跨组件义务没有逐项进入承接 E2E/A0/S1/S2 issue。

随后工程师读取这些仍生效的 issue，继续把它们当开发期 live 工作或依赖，D10-05 想删除的门禁重新出现。

**应如何解决：**

D16-01 与 D16-06 必须把执行范围写成：

- annexA 表 A1；
- annexA “D10-05 点名 live issue 当前状态”中的 #182/#245/#250/#259；
- images#6、images#3、deploy#8；
- 对应承接 E2E/A0/S1/S2 issue 的义务写入；
- D8 正文与映射同步替换。

不能把“按 A1”当成 D10-05 全量执行范围。

---

### 发现 3：D10-05 对“删除”与“改写”的表述不一致

**分类：主路径失效反例**

D16-01 说：

> 只移除“前置切片须已有跨组件 runtime 验收证据才能开工”的串行等待锁与开发期 live 子 issue。

- `local://decisions/D16.md:17`

D16-06 又说：

> 只删去……门禁语句与 live 子 issue 引用，其余正文不动。

- `local://decisions/D16.md:22`

但原 D10-05 不是简单删除依赖句，而是把：

> 前置切片须已有 runtime 验收证据

改成：

> 依赖切片的代码已合入其仓 `main` 即可开工

并要求把移出的验收义务转移到统一阶段承接项，而不是删掉：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:17`
- `local://decisions/D16-annexA.md:48`

**具体反例：**

如果秘书照“只删”执行，一条依赖既不再说明 runtime 门禁，也没有替换成代码/产物前置；依赖关系本身被语义掏空。随后工程师无法从 issue 判断真正的编译或产物前置。

**应如何解决：**

把“只删去”改成 annexA 的准确口径：

> 保留依赖链接及业务契约；把 runtime 开工条件替换为代码/产物条件；移出的 live 义务写入统一验收承接项。

---

### 发现 4：D16-01 没有修订 D10-10，却由 D16-05 和 D12-01改变了 D10-10 的消费者集合

**分类：主路径失效反例**

D16-01 声明 D10-10“按现行正文恢复效力”：

- `local://decisions/D16.md:17`

现行 D10-10 只规定仓 B 消费 store 契约：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:22`

现行 D10 的讨论结论还明确“不采纳 Lab 引用 store 契约包”：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:63`

但 D12-01 已经改变了该结论，规定 Pepgent/Pepgent 也直接依赖契约包：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:33`

而 D12 自己明确要求通过后修订 D10-10 和 D10 第 63 行：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:617-624`

D16-05也采用了这个新结论：

- `local://decisions/D16.md:21`

但 D16-06 的回写表没有把 D10 本身列为必须修订对象：

- `local://decisions/D16.md:22`

annexA 已经直接指出此缺口：

- `local://decisions/D16-annexA.md:211`

**具体反例：**

D16 通过后：

- 工程师读 D10-10：只有仓 B 使用契约依赖；
- 工程师读 D10 第 63 行：Lab 不该引入该依赖；
- 工程师读 D12-01 和 D16-05：Lab 必须引入。

同一批恢复后的有效决策对同一依赖给出相反结论。

**应如何解决：**

D16-01 必须把 D10-10 列入“修订后恢复”，并明确：

- 仓 B 和 Pepgent/Pepgent 都通过权威包消费 contract；
- D10 第 63 行“不采纳”改为已由 D12-01补充并取代；
- D16-06 必须实际回写 D10 文件。

---

## D16-02：恢复 D11-A/B/C，废止 D11-47C

### 发现 1：恢复集合和替代关系本身闭合，未发现主路径阻断

**分类：非阻断建议**

D16-02 正确地：

- 只恢复 D11-A 中除 47C 外的 23 项；
- 恢复 D11-B 7 项；
- 恢复 D11-C 3 项；
- 把 D6/design 的回写唯一指向 C1/C2；
- 让 WB3承担 47C 被替代后的回写。

证据：

- `local://decisions/D16.md:18`
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D11C-run-event-carrier.md:16-18`
- `local://argon/phaseB-review-governance.md:34-43`

建议只做一个文字强化：

> D11-WB 原文中所有 D11-47C 回写说明均失效，不能与 WB3并行执行。

因为 D11-WB 当前正文仍直接列出 D11-47C：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D11A-solo-ruling-review.md:47`

虽然 D16-02 已经能推导出替代关系，但秘书执行时最好不要再依赖推导。

---

## D16-03：恢复 D12，对齐 D11-C，并固定协议目录唯一写方

### 发现 1：只替换 D11-47C 的编号还不够，D12-04 的“同一原则”表述已过度泛化

**分类：非阻断建议**

D16-03 要把 D12 引言和 D12-04 中的 D11-47C 改成 C1/C2：

- `local://decisions/D16.md:19`

但 D12-04 当前说：

> 目录与页面、会话读取不重复携带同一条记录，与 D11-47C“每个事实只由一处携带”同一原则。

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:36`

D11-C1 后来主动收窄了结论：唯一携带的是“节点与入边在事件实例层”，并不建立“所有页面/目录事实都只能出现一次”的普遍公理：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D11C-run-event-carrier.md:16`
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D11C-run-event-carrier.md:31-35`

建议回写时不要机械地把“D11-47C”替换为“D11-C1/C2”，而应把 D12-04 改成其本地明确规则：

> 目录、页面、会话读取按本条规定避免重复携带；该规则独立于 RunEvent 的节点/入边携带规则。

否则 D11-C1 会被误读为全系统去重原则。

---

### 发现 2：唯一写方顺序正确，但它依赖 D16-09 把相关 package manifest/lockfile 分配出去；当前矩阵没有做到

**分类：主路径失效反例**

D16-03 正确把 `apps/web/src/protocol/lab/**` 唯一写方给 W-09，并要求 W-10 在协议合入后只读消费：

- `local://decisions/D16.md:19`
- `local://argon/phaseB-review-governance.md:45-52`

但是 D12-01 还要求 `apps/web` 建立 store git 依赖：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:33`

D16-09 的 W-09 路径不包含 Pepgent 的 package manifest 或 lockfile：

- `local://decisions/D16.md:25`

因此 W-09 可以写协议文件，却没有权限加入让协议文件可解析的依赖。详见 D16-09。

---

## D16-04：恢复 D13/D14，并规定 DIST-01 先于 SOR-07

### 发现 1：执行顺序正确，但 DIST-01 当前没有可执行 issue 生命周期

**分类：主路径失效反例**

D16-04 要求 W-07 先执行 DIST-01（soroi#199），再执行 SOR-07：

- `local://decisions/D16.md:20`

D14 也明确要求 DIST-01 先落地安装器 `--artifact` 和 `release.json`：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D14-release-identity.md:29-30`
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D14-release-identity.md:34-37`

但 annexA 明确记录：

- soroi#199 不在当前 OPEN issue 列表中；
- 没有源条目授权秘书重开它；
- 不能仅凭“安装器要加参数”自行决定重开。

证据：

- `local://decisions/D16-annexA.md:139-150`

**具体反例：**

W-07 按 issue→PR 规则准备执行首项 DIST-01，但 #199 已关闭，D16-06 又没有授权重开或新建替代 issue。于是：

- 要么 W-07 无 issue 直接改代码，违反工程流程；
- 要么跳过 DIST-01 直接做 SOR-07，违反 D16-04/D14-03；
- 要么当场 BLOCKED，第一波主路径停止。

**应如何解决：**

D16-04 或 D16-06 必须明确二选一：

1. 重开 soroi#199；或
2. 新建一个专门承载 D14-02 的 DIST-01 接续 issue，并引用旧 #199。

不能把 issue 生命周期留给工程师自行决定，因为这属于 D10-08/D15-12 的管理范围。

---

### 发现 2：DIST-01 需要修改 `compose/central-entrypoint.sh`，但 W-07 路径白名单不含 `compose/**`

**分类：主路径失效反例**

D14 派工影响明确要求插件 owner 修改：

- `scripts/install.ts`；
- `compose/central-entrypoint.sh`；
- 插件开发说明。

证据：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D14-release-identity.md:34-37`

但 D16-09 给 W-07 的路径只有：

- `packages/omp-soroi/**`
- `scripts/**`
- `.omp/settings/soroi.yml`
- `.github/workflows/release.yml`

证据：

- `local://decisions/D16.md:25`

`compose/central-entrypoint.sh` 不属于 W-07，也不属于 W-08 的 `compose.yaml` / `compose.full.yaml`。

**具体反例：**

DIST-01 的安装器写出 `release.json`，但 standalone 入口仍未传 `--artifact /release/soroi.tar`。插件随后要求读取 `release.json`，standalone 主路径启动失败。

**应如何解决：**

必须在 D16-09 中把 `compose/central-entrypoint.sh` 明确给 W-07，或者给 W-08；以 D14 的 owner 划分，给 W-07更一致。

---

## D16-05：迁仓前由 soroi 根包导出 store 契约

### 发现 1：与 D10 第 63 行存在直接冲突，D16 没有完成源正文修订

**分类：主路径失效反例**

D16-05规定 Pepgent/Pepgent 引用 store 契约：

- `local://decisions/D16.md:21`

D10 第 63 行仍明确写：

> Pepgent Lab 后端引用 store 契约包——不采纳。

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:63`

D12 已经说明此前“不采纳”的理由只是“当时不在本表”，并正式作出新的设计补充：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:33`

而且 D12 明确要求回写 D10-10 与第 63 行：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:617-624`

D16-05在决策层面可以取代旧结论，但 D16-01 又说 D10-10 现行正文原样恢复，D16-06 也没把 D10 文件列入回写。这造成有效正文冲突，而不是单纯历史意见。

**应如何解决：**

D16-05必须同时授权：

- 修订 D10-10；
- 直接替换 D10 第 63 行；
- 更新 D10 中 Pepgent/Pepgent 的消费者说明。

---

### 发现 2：实际 store contract 目前只有类型，没有 D16-05点名的三个 schema；该实现工作是必要的，不应被描述成仅“根包导出”

**分类：非阻断建议**

D16-05要求补：

- `RunComparisonSchema`
- `ValueUsageSchema`
- `ActivitySchema`

- `local://decisions/D16.md:21`

当前代码只有相应类型，没有这三个 schema：

- `packages/store/src/contract.ts:188-193`
- `packages/store/src/contract.ts:204-217`

因此本条不仅是修改根 `package.json` / `bun.lock`，也确实涉及 `packages/store/src/contract.ts` 的领域 schema 实现。W-06有该路径权限，所以不构成路径阻断，但派工消息必须把这部分列为实际任务，不能把 D16-05缩写成“根导出”。

---

### 发现 3：Pepgent/Pepgent 侧建立 git 依赖没有 owner

**分类：主路径失效反例**

D16-05不仅要求 soroi 根包导出，还要求 Pepgent/Pepgent：

> 以 git 依赖引用 Pepgent/soroi 默认分支。

- `local://decisions/D16.md:21`

但 D16-09：

- W-06 只得到 soroi 根 `package.json` / `bun.lock` 的这一处临时权限；
- W-09 只写 Lab 源码目录；
- W-10 只写前端源码与 e2e-lab。

没有任何席位拥有 Pepgent/Pepgent 的 package manifest 和 lockfile：

- `local://decisions/D16.md:25`

**具体反例：**

W-06完成根导出，W-09在 `protocol/lab/external/store.ts` 写入：

```ts
from 'pepgent-store/contract'
```

但 Pepgent 的依赖文件没人有权修改，安装后模块不可解析，W-09无法完成本仓检查。

**应如何解决：**

把 Pepgent 的具体依赖文件列入 W-09 路径域，至少包括实际承载 `apps/web` 依赖的 `package.json` 和对应 lockfile；如果是仓根 lockfile，也必须明确仅 W-09 为这项依赖修改它。

---

## D16-06：秘书一次性回写正文与 issue

### 发现 1：没有覆盖 annexA 的 3 项 BLOCKED；其中两项会反过来阻塞 D16-12 的工程启动

**分类：主路径失效反例**

annexA 明确有 3 项 BLOCKED：

1. 仓 A owner / 最终仓名未授权；
2. 仓 B owner / 最终仓名未授权；
3. `design/store.md` 的提醒记录没有精确回写落点。

证据：

- `local://decisions/D16-annexA.md:216-220`
- `local://decisions/D16-annexA.md:229`

D16-06只泛化说：

> 遇到取不到原文或表中没有的对象，标 BLOCKED。

- `local://decisions/D16.md:22`

但三项实际情况都不符合这个描述：

- A/B 是表中已有对象，但缺用户授权；
- C 是原文和文件都取得了，只缺领导层确定落点。

更严重的是，D16-12规定 D16-06“已完成”后才能启动：

- `local://decisions/D16.md:28`

D16 又说仓 A/B owner“不阻塞本表”：

- `local://decisions/D16.md:34`

**具体反例：**

D16通过后，秘书执行 A2-02/A2-03时因 owner 未授权标 BLOCKED。此时：

- 若 D16-06算未完成，D16-12禁止启动任何席位，owner 实际上阻塞工程；
- 若 D16-06算已完成，则 D10-04的 issue 迁移未完成，却被当成完整回写完成。

两种解释都和 D16 自己的宣称冲突。

**应如何解决：**

D16-06必须显式逐项决定：

- BLOCKED-A/B：在 owner 授权前跳过条件性迁移，不阻塞迁仓前工程；授权后另走迁仓决策。
- BLOCKED-C：在 D16 中直接确定 `design/store.md` 的具体落点，或从 D11-WB2 回写范围中删除这一目标并说明无需新增正文。
- D16-12 的前置条件应改为“D16-06 中所有当前可执行项完成；明确延期的 A/B 不算未完成”。

---

### 发现 2：步骤①声称按 A3执行，却列入 A3没有的 D13-01..05 和 D14-02

**分类：主路径失效反例**

D16-06要求：

> 按 annexA 表 A3 把……D13-01..05、D14-01..02直接替换进 PM D2–D8 与 design 文档。

- `local://decisions/D16.md:22`

但 annexA 明确结论是：

- D13 当前正文没有明确要求秘书回写 PM D2–D8 或 soroi design；
- D14 的 PM/design 明确目标来自 D14-01；
- D14-02/03只指定安装器、调用入口和开发说明。

证据：

- `local://decisions/D16-annexA.md:214`

因此“按 A3”与后面的条目列表互相矛盾。

**具体反例：**

秘书试图把 D13-01..05“直接替换”进 design 文档，却没有 A3 行告诉它目标章节和替换范围。它只能：

- 自行选择章节，越过领导层决定设计位置；或
- 标 BLOCKED；
- 或跳过，导致 D16-06未按字面完成。

**应如何解决：**

删掉步骤①中的 D13-01..05和 D14-02；对应文档动作应按源决定：

- D13-05 的插件开发说明由 W-07更新；
- D13-01..04按实现 issue执行；
- D14-01回写 PM D4 与 `design/eval.md` / `design/store.md`；
- D14-02由 W-07及各入口 owner实现，不冒充 design 回写。

---

### 发现 3：步骤①只点名 D12-14，但 A3包含大量 D12-01、03、05、09、10、13、16等回写

**分类：主路径失效反例**

D16-06 的来源列表写的是“D12-14”：

- `local://decisions/D16.md:22`

但 D12 的明确回写动作包括：

- D5 §3.6；
- D7 的接口草图与表结构；
- D8 §5.4；
- D10-10与第 63 行；
- Pepgent 代码；
- Lab/WEB issue评论。

证据：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:617-629`

annexA 的 A3也列出了多项 D12来源，例如：

- D5 SlotState；
- D7 wire/host tools/表字段；
- D8无来源字段清单。

证据：

- `local://decisions/D16-annexA.md:167`
- `local://decisions/D16-annexA.md:182`
- `local://decisions/D16-annexA.md:190`
- `local://decisions/D16-annexA.md:200`

**应如何解决：**

不要写“D12-14”；应写：

> 按 A3中所有 D12来源项执行 D5/D7/D8回写，并额外按 D12:623修订 D10-10及 D10:63。

---

### 发现 4：D10-05 live issue 的执行范围缺失

**分类：主路径失效反例**

D16-06步骤②只引用 A1：

- `local://decisions/D16.md:22`

但 A1不包含完整 live issue集合：

- `local://decisions/D16-annexA.md:128-137`

该问题与 D16-01发现 2相同，必须在 D16-06执行条款中修复，否则仅修 D16-01仍不能给秘书完整清单。

---

### 发现 5：D12要求的 Lab/WEB issue评论没有纳入 D16-06

**分类：非阻断建议**

D12通过后明确要求在 LAB/WEB 切片 issue评论契约行对应关系：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:629`
- `local://decisions/D16-annexA.md:212`

D16-06只要求在 PM#16–#22发恢复评论：

- `local://decisions/D16.md:22`

这不会使代码主路径必然失败，因为派工消息可直接引用 PM 决策，但它遗漏了源文档明确要求的同步动作。建议把它加入秘书清单，并采用 annexA纠正后的逐切片映射，不要沿用 D12:629错误的连续编号口径。

---

## D16-07：对齐三份治理文本

### 发现 1：对 `secretary.md` 的修改与 AR 的复核结论存在未解决冲突

**分类：主路径失效反例**

D16-07要修改：

- AGENTS.md；
- decision-vote skill；
- secretary.md。

- `local://decisions/D16.md:23`

GR 确实说 secretary 第 19 行“可顺手同步”：

- `local://argon/phaseB-review-governance.md:83`

但 AR 的正文明确说五份角色定义：

> 全部复核通过，无需修改。

其中包括 secretary：

- `local://argon/phaseB-review-argon.md:66`

AR 的阶段 B 路线图也只授权对齐：

- AGENTS 第 40 行；
- decision-vote 第 25–26行。

没有列 secretary：

- `local://argon/phaseB-review-argon.md:85-89`

**具体反例：**

D16-07宣称“三处均经双核审定”，但现有双核文本对 secretary 是否应改并不一致。若直接表决，D16等于代替双核解决了双核分歧，和其“原样采用复核结论”的定位不符。

**应如何解决：**

在 D16-07中明确记录：

- AR §二原“无需修改”对 secretary 计票文本的结论，由 GR §2.2 的具体同步要求修订；
- 双核需在 D16投票时明确共同赞成该修订。

否则应暂时只改 AGENTS 和 decision-vote。

---

### 发现 2：AGENTS 命令漏掉 tern-worker 现有的显式 session 目录创建动作

**分类：非阻断建议**

D16-07只替换一行 `tern new session ... --session-dir ...`：

- `local://decisions/D16.md:23`

tern-worker skill 在启动命令前还有：

```sh
mkdir -p /Users/mouriya/Ext/code/pepgent/.workers/<名字>/sessions
```

- `.omp/skills/tern-worker/SKILL.md:15-20`

如果 `omp --session-dir` 会自行建立目录，则没有主路径问题；如果不会，AGENTS示例仍不是完整可运行命令。由于 D16宣称“与 skill 一致”，建议同步写成两步，或明确目录由启动程序创建。

---

## D16-08：D15冻结对象终局处置

### 发现 1：deploy-8 的处置采用 GR，和 AR §三.3的原处置建议相反；D16虽然给了终局答案，但应显式记录双核差异

**分类：非阻断建议**

AR 原报告说：

> deploy-8既有工作树保留 56eaff7供 deploy 工程师接续。

- `local://argon/phaseB-review-argon.md:79`

GR 后来裁定：

> deploy-8永久冻结，W-04在新路径检出远端遗产接续。

- `local://argon/phaseB-review-governance.md:95-105`
- `local://argon/phaseB-review-governance.md:125`

D16-08采用 GR：

- `local://decisions/D16.md:24`

这一路径本身更符合 U59/隔离要求，也与 GR 的治理职责一致，因此没有主路径缺口。但 D16标题说它对照 AR+GR作终局处置，最好在取舍中明确：

> AR §三.3关于复用 deploy-8 的建议由 GR §三的永久冻结裁决取代。

否则后续读者会看到两个同时声称有效的双核结论。

---

### 发现 2：mux恢复和旧分支删除顺序与 D15保护边界一致，未发现阻断

**分类：非阻断建议**

D16-08先基于新 worktree恢复会话前草稿，再完成新 PR，最后删除旧冻结分支：

- `local://decisions/D16.md:24`

这保留了 D15的会话前合法遗产边界：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D15-private-decision-discard.md:44`
- `LEDGER.md:64-66`

该部分可保留。

---

## D16-09：席位矩阵、启动命令和 Pepgent隔离

### 发现 1：根 `package.json` / `bun.lock` 的长期 owner有重叠和缺口

**分类：主路径失效反例**

D16-09把：

- W-06限定为 `packages/store/**`，另加 D16-05根包导出；
- W-07限定为插件、scripts、settings、release workflow；
- W-08限定为 e2e和两份 compose yaml。

- `local://decisions/D16.md:25`

但 D10-02明确规定迁仓和发行布局涉及：

- 根 `package.json`
- `bun.lock`
- 根 `README.md`

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:14`

当前根 `package.json` 的 workspace/check 本来同时覆盖 packages：

- `package.json:1-11`

**具体反例：**

D16-05期间 W-06修改根 package/lock。随后 W-07推进仓 B发行，必须改变根 workspace/dependency/发行构建输入，却无权改根文件；或者 W-07越界修改，与 W-06产生共享路径。

**应如何解决：**

矩阵必须按生命周期分配根文件：

- 迁仓前 D16-05 的 root export改动：W-06；
- 仓 B发行相关 root package/lock/README改动：W-07；
- 如果两者会同时发生，必须串行，而不是让两个活跃席位都拥有根文件。

不能只写“W-06临时加这一处”而不分配后续 owner。

---

### 发现 2：根 `README.md` 完全无人负责

**分类：主路径失效反例**

D10-02把根 README列为迁出布局的一部分：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:14`

当前 README仍把仓库描述成同时包含插件和 store：

- `README.md:1-3`
- `README.md:18-22`

D16-09没有任何席位拥有根 README：

- `local://decisions/D16.md:25`

**具体反例：**

实现和迁仓完成后，README仍指导：

- 构建 monorepo发行；
- tar包含 `packages/*`；
- store与插件同仓消费。

这与恢复后的 D10-01A/B、D10-02直接冲突。

**应如何解决：**

把根 README明确给 W-07或迁仓秘书；按“文档随实现”原则，给 W-07最自然。

---

### 发现 3：`compose/central-entrypoint.sh` 无 owner，D14-02无法完成

**分类：主路径失效反例**

见 D16-04发现 2：

- D14要求修改 `/compose/central-entrypoint.sh`：`D14-release-identity.md:36`
- D16矩阵没有任何席位拥有 `compose/**` 脚本：`local://decisions/D16.md:25`

必须补入 W-07或 W-08。

---

### 发现 4：Pepgent/Pepgent 的 package manifest和 lockfile无 owner，D16-05无法落地

**分类：主路径失效反例**

D12-01和 D16-05要求 `apps/web` 引入 git依赖：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D12-lab-wire.md:33`
- `local://decisions/D16.md:21`

W-09/W-10均无 package manifest/lockfile权限：

- `local://decisions/D16.md:25`

必须把具体依赖文件给 W-09，并说明 W-10只消费，不再修改。

---

### 发现 5：W-09/W-10 的路径写法不一致，可能把 `apps/web` 前缀丢失

**分类：非阻断建议**

W-09写成：

- `apps/web/src/protocol/lab/**`
- 随后是 `src/server/lab/**`
- `src/rpc/lab.ts`
- `src/app/routes/api/lab/**`
- `resources/lab/**`

- `local://decisions/D16.md:25`

GR G-1也沿用了该缩写：

- `local://argon/phaseB-review-governance.md:130-131`

但当前 D13/D12源路径都以 `apps/web/...` 为基准，例如：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D13-contract-gaps.md:34-36`

建议在矩阵中把每一个路径写成完整 repo-relative路径，避免工程师把 `src/server/lab/**`理解成仓根 `src/`。

---

### 发现 6：W-09/W-10 的两个独立 clone方案与 GR一致，可保留

**分类：非阻断建议**

D16明确拒绝共享基准 clone，采用两个完全独立 clone：

- `local://decisions/D16.md:25`

这与 GR G-3完全一致：

- `local://argon/phaseB-review-governance.md:138-140`

也直接满足 LEDGER C1-2的 Pepgent根 checkout禁触要求：

- `LEDGER.md:16`

该部分无阻断。

---

## D16-10：波次与并发，W-08最后启动

### 发现 1：把 W-08放最后可符合 C1-3，但 D16没有同步修订 D10-05、D10-09和 D10“立即开工”段落，导致恢复文本自相矛盾

**分类：主路径失效反例**

D16-10把 W-08放在队列最后：

- `local://decisions/D16.md:26`

理由是代码完成前不写测试：

- `LEDGER.md:17`

这一调度本身是对 C1-3的合理执行。

但 D16-01同时原样恢复：

- D10-05：“E2E-* spec与 runbook在开发期编写”；
- D10-09：“`e2e/` 一名，开发期编写 E2E-* spec与 runbook”；
- D10的派工影响：“`Pepgent/soroi` e2e立即开工”。

证据：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:17`
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:21`
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D10-repo-delivery.md:28-32`

**具体反例：**

工程调度者读 D16-10，W-08最后；W-08工程师读恢复后的 D10-09和派工影响，看到“开发期编写”和“立即开工”。两者都属于恢复后有效正文，却给出相反启动时点。

**应如何解决：**

D16-01必须把 D10-05、D10-09以及“对工程派发的直接影响”一起修订为：

> E2E spec仍属于开发阶段产物，但仅在全部被测实现代码完成后，由 W-08编写；跨组件执行仍留在阶段 C。

这样既保留“spec在阶段 C前已合入”的 D10-06入口，也符合 C1-3禁令。

---

### 发现 2：W-08启动条件只列 W-06、W-07、W-09，不足以表达“代码编写完成前不写测试”

**分类：主路径失效反例**

D16-10明列：

> W-08启动条件：W-06、W-07、W-09实现已合入。

- `local://decisions/D16.md:26`

但 W-08承接的是全组件 E2E-* spec/runbook，不只测试 store/plugin/Lab。D11-B影响表清楚列出 E2E对 remote、images、deploy、Mux等组件的消费：

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D11B-solo-ruling-review.md:20-27`

GR G-7要求的是：

> W-01..W-10全部实现切片与 E2E-*测试代码合入后进入阶段 C。

- `local://argon/phaseB-review-governance.md:156-158`

虽然当前队列把 W-08排在最后，正常滚动时其他席位确实先完成，但“启动条件”本身只列三个席位。日后只要队列调整、某席位被跳过或阻塞，条件文字就允许 W-08在被测实现未完成时启动。

**应如何解决：**

把条件改成：

> W-01..W-07、W-09、W-10的相关实现切片全部合入各自 `main` 后启动 W-08。

如果 W-10的 e2e-lab spec也属于测试代码，则应进一步明确：

- W-10先完成实现代码；
- 测试代码何时写；
- 是否把 `apps/web/tests/e2e-lab/**` 从 W-10拆给后段测试代码席位。

---

### 发现 3：D16-10没有说明 W-10内的 `apps/web/tests/e2e-lab/**` 也受“代码完成前不写测试”约束

**分类：主路径失效反例**

W-10同时拥有：

- `apps/web/src/client/**`
- `apps/web/tests/e2e-lab/**`

- `local://decisions/D16.md:25`

D16-10只对 W-08写了延迟条件，没有对 W-10内部“先实现、后写测试”的阶段边界作规定：

- `local://decisions/D16.md:26`

**具体反例：**

W-10启动后同时开始 client实现与 e2e-lab spec，直接违反：

- `LEDGER.md:17`
- `.omp/skills/tern-worker/SKILL.md:33`

**应如何解决：**

在 W-10任务顺序中明确：

1. 先完成 WEB实现代码；
2. 实现完成后再编写 `tests/e2e-lab/**`；
3. 开发期不执行跨组件 live测试。

或者把该测试路径移交到统一的后段测试代码席位。

---

## D16-11：派工消息

### 发现 1：四段核心内容符合 GR G-4，未发现直接冲突

**分类：非阻断建议**

D16-11覆盖了：

- PM权威链接；
- 路径白名单；
- 禁止代码完成前写/跑测试和 hash证据；
- 常规状态走 issue/PR；
- BLOCKED由治理分身与双核初审。

证据：

- `local://decisions/D16.md:27`
- `local://argon/phaseB-review-governance.md:142-147`

这部分与 LEDGER C1-3、C4-1、C4-2和 D15-12一致：

- `LEDGER.md:17`
- `LEDGER.md:49-50`
- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D15-private-decision-discard.md:55`

---

### 发现 2：派工消息仍应包含实际切片顺序与 issue，而不能只给决策链接和路径

**分类：非阻断建议**

tern-worker skill要求派工消息：

- 按依赖顺序列出切片；
- 每切片一个 issue + PR；
- 在 issue写 owner、当前任务和真实前置。

证据：

- `.omp/skills/tern-worker/SKILL.md:28-34`

D16-11只列四段，没有明确要求实际任务/issue清单：

- `local://decisions/D16.md:27`

这可在每波具体 `peer_send` 预审阶段补齐，不一定要改成新的决策条目；但 D16-12的双核预审清单应把“切片/issue序列完整”列为检查项。

---

## D16-12：每波启动程序

### 发现 1：遗漏了 D15-11和 GR G-5要求的“合并前”LEDGER核对

**分类：主路径失效反例**

D16-12只要求每次启动前把：

- tern命令；
- peer_send全文；
- LEDGER核对表

交双核确认：

- `local://decisions/D16.md:28`

但 GR G-5标题和要求是：

> 每次派工与合并前的 LEDGER逐项核对表。

- `local://argon/phaseB-review-governance.md:149-150`

D15-11④同样明确：

> 派工与合并前附 C1–C5核对。

- `/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/D15-private-decision-discard.md:54`

**具体反例：**

席位启动时路径和任务合法；开发过程中发生新的 BLOCKED裁决或路径变化；PR准备合并时没有再次核对 LEDGER和最新决定，仍按启动时旧契约合并。D16-12却会把程序视为完成。

**应如何解决：**

D16-12增加第二个生命周期锚点：

> 每个切片 PR合并前，工程师/拥有方提交当步 C1–C5、R1–R21核对；双核按 D15-11④/G-5确认后方可合并。

启动预审不能替代合并预审。

---

### 发现 2：前置条件“D16-06已完成”与 D16-06的三项 BLOCKED没有闭合

**分类：主路径失效反例**

证据组合：

- D16-12前置条件：`local://decisions/D16.md:28`
- annexA三项 BLOCKED：`local://decisions/D16-annexA.md:216-220`
- owner“不阻塞本表”：`local://decisions/D16.md:34`

必须按 D16-06发现 1修订成“当前可执行回写完成，明确延期项除外”，否则阶段 B不能合法发车。

---

### 发现 3：对 R8/R9保持 🏗的处理正确

**分类：非阻断建议**

D16-12不把启动参数核验冒充成一仓一进程和总线纪律的完整运行证据：

- `local://decisions/D16.md:28`

这符合 LEDGER对 🏗/✅的区分：

- `LEDGER.md:5`
- `LEDGER.md:54`
- `LEDGER.md:83-84`

可保留。

---

## D16-13：开发期与验收期边界

### 发现 1：阶段 C顺序与 C1-3、GR G-7一致，未发现主路径阻断

**分类：非阻断建议**

D16-13规定：

- 所有实现切片与 E2E spec先合入；
- 阶段 C执行 A0 → S1 → E2E-21 → S2；
- 阶段 D执行 D9/F32；
- 验收执行席位另派。

- `local://decisions/D16.md:29`

这与 LEDGER阶段主线一致：

- `LEDGER.md:106-111`

也与 GR G-7一致：

- `local://argon/phaseB-review-governance.md:156-158`

该条本身可保留。

---

### 发现 2：应明确 W-08/W-10在阶段 B只“编写测试代码”，不承担测试执行

**分类：非阻断建议**

D16-13最后说验收与测试席位另行派工：

- `local://decisions/D16.md:29`

但 W-08名为 `pepgent-e2e`，W-10又拥有 `tests/e2e-lab/**`，容易被误解为它们可在阶段 B执行跨组件测试：

- `local://decisions/D16.md:25`

建议在 D16-13增加一句：

> W-08/W-10在阶段 B仅编写相应 spec/runbook；跨组件执行只由阶段 C另派测试者完成。

这也能帮助消解 D10-05/D10-09的旧措辞。

---

## D16-14：归档与台账

### 发现 1：D5/D6链接“更正”方向完全错误，会破坏当前正确索引

**分类：主路径失效反例**

D16-14说：

> 更正决策索引中 D5、D6链接互换的错误（D5对应 #6，D6对应 #5）。

- `local://decisions/D16.md:30`

但当前 LEDGER 已经正确写成：

- D5 Eval → PM#5
- D6 Store → PM#6

证据：

- `LEDGER.md:113-118`

决策编号与 issue编号本身也对应：

- D5是 Eval；
- D6是 Store。

**具体反例：**

秘书照 D16-14执行后，D5链接到 Store issue，D6链接到 Eval issue；工程师按决策索引取契约时会进入错误权威正文。

**应如何解决：**

删除这项“更正”。除非另有本次实际取回的 PM事实证明链接不同，但现有文件证据显示不应交换。

---

### 发现 2：D16-14没有说明如何记录 D16-06的延期 BLOCKED状态

**分类：非阻断建议**

D16-14只更新：

- R21；
- D10–D14、D16索引状态。

- `local://decisions/D16.md:30`

若 BLOCKED-A/B被明确延期，R3仍应保持 🔄，这与当前 LEDGER一致：

- `LEDGER.md:78`

建议 D16-14明确：

- D16通过和迁仓前工程恢复不意味着仓 A/B已建立；
- R3继续 🔄；
- R21是否能标 🏗或✅要依据实际回写、派工预审和运行证据，不因决策通过自动升级。

---

# AR/GR 要求但 D16遗漏的复核结论汇总

以下不是单条措辞问题，而是双核要求写入或执行、D16当前没有完整纳入的事项。

## 1. 合并前 LEDGER预审

**遗漏；主路径阻断。**

- GR：`local://argon/phaseB-review-governance.md:149-150`
- D15：`D15-private-decision-discard.md:54`
- D16只写启动前：`local://decisions/D16.md:28`

必须补进 D16-12。

---

## 2. D12对 D10-10和 D10第 63行的回写

**遗漏；主路径阻断。**

- D12要求：`D12-lab-wire.md:623`
- annexA已指出：`local://decisions/D16-annexA.md:211`
- D16-01原样恢复 D10-10：`local://decisions/D16.md:17`
- D16-05采用相反结论：`local://decisions/D16.md:21`

必须补进 D16-01、D16-05、D16-06。

---

## 3. D10-05点名 live issue 的完整改写

**遗漏；主路径阻断。**

- D10原范围：`D10-repo-delivery.md:17`
- annexA单独列示：`local://decisions/D16-annexA.md:128-137`
- D16只写 A1：`local://decisions/D16.md:17,22`

必须扩充秘书执行清单。

---

## 4. D12的 Lab/WEB issue契约同步评论

**遗漏；非阻断但应补。**

- D12：`D12-lab-wire.md:629`
- annexA：`local://decisions/D16-annexA.md:212`

---

## 5. D13/D14对应开发说明和入口文件修改

**矩阵遗漏；主路径阻断。**

- D13-05插件开发说明：`D13-contract-gaps.md:48,54`
- D14-02入口与开发说明：`D14-release-identity.md:29,36`
- D16矩阵没有根 README / `compose/central-entrypoint.sh` owner：`local://decisions/D16.md:25`

---

# 表决前必须回答并写回 D16 的具体问题

1. **D10-04的修订究竟只替换③④的遗产位置，还是废弃原①②⑤⑥⑦⑧？**  
   当前文本必须明确“保留哪些原文”。

2. **D10-05的执行清单是否包含 soroi#182/#245/#250/#259、images#6/#3、deploy#8以及承接 E2E/A0/S1/S2 issue？**  
   若包含，不能再只写 annexA A1。

3. **D10-10及 D10第 63行是否由 D12-01/D16-05明确修订？**  
   必须回答“是”，并列入秘书回写。

4. **BLOCKED-A/B在 owner未授权时是否明确延期、且不阻塞迁仓前 W-06/W-07启动？**  
   D16-12前置条件必须与答案一致。

5. **BLOCKED-C 的 `design/store.md`提醒记录到底写到哪里，还是确认无需新增该段？**  
   不能再交秘书自行选位置。

6. **DIST-01由哪个 OPEN issue承载？**  
   是重开 soroi#199，还是新建接续 issue。

7. **谁拥有以下未分配路径：**
   - soroi 根 `package.json`
   - soroi `bun.lock`
   - soroi 根 `README.md`
   - `compose/central-entrypoint.sh`
   - Pepgent/Pepgent中添加 store git依赖所需的 package manifest和 lockfile

8. **W-08的启动条件是不是“所有被测实现席位完成”，而不是只完成 W-06/W-07/W-09？**

9. **W-10何时可以写 `apps/web/tests/e2e-lab/**`？**  
   必须明确在 WEB实现代码完成之后。

10. **每个 PR合并前是否重新提交 LEDGER核对并交双核确认？**  
    GR和 D15要求是“是”，D16-12必须补上。

11. **是否删除 D16-14中错误的 D5→#6、D6→#5交换？**  
    当前 LEDGER的 D5→#5、D6→#6已经正确。

在上述主路径失效项修正前，D16不宜进入逐条计票。