# Pepgent#51（Lab 前端读取文档同步）W-09 BLOCKED 初审：WEB-02 文档差量未送达且部分过时

- **issue：** [Pepgent/Pepgent#51](https://github.com/Pepgent/Pepgent/issues/51)。owner 依 D20-03 为 W-09（在席期间）。
- **BLOCKED：** [评论 6562489557](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6562489557)（W-09）。
- **相关 PR：** WEB-02 [PR#65](https://github.com/Pepgent/Pepgent/pull/65)（main `54d9e10`）；LAB-11a [PR#66](https://github.com/Pepgent/Pepgent/pull/66)（main `0416b3d`）；[PR#68](https://github.com/Pepgent/Pepgent/pull/68)（`Fixes #67`，main `1bf7683`）。
- **编制：** governance-desk 实例 `DeskPepgent51Blocked`（总协调席，与 Main 合计 1 票）。本文整理事实、给出初分类，并列出交两道闸门判定的问题。初分类不是裁决。
- **程序依据：** `SOR/AGENTS.md:60`（C2-2）：闸门 A 由 `Argon` 判定是否触及产品原始意图或公开契约；闸门 B 由 `ArgonGovernance` 判定是否越过席位路径白名单、是否破坏阶段门禁、是否属于必须投票的事项。两道闸门都确认不越界才可免投票放行，否则按 `P0` 立案。

来源标记：`(U)` 用户原话；`(D)` 文档或源码原文；`(R)` 本实例运行命令得到的输出；`(A)` agent 的说法，只作解释。工人评论与 PR 正文属于 `(A)`。本实例只读文件与源码（`git show <commit>:<path>`、`gh` 读 issue/PR），没有运行构建或测试。

路径简称：`SOR/` = `pepgent-soroi/`；`DEC/` = `pepgent-pm/evidence/decisions/`；`WEB/` = Pepgent 主仓 `pepgent/` 在 main `1bf7683` 的文件。

---

## 一、事实

### 1.1 规则与承载

| # | 事实 | 来源 |
|---|---|---|
| F1 | D20-03：`apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`、`docs/conventions/03-typescript-react-style.md` 在 W-09 在席期间归 W-09，W-09 按 D16-10 退役后归 W-10；`apps/web/src/renderer/README.md` 始终归 W-10。W-10 每次合入 WEB 切片 PR 时，把需要的段落原文写进 PR 正文并在承载 issue 下评论；W-09 在席时由 AreaMgrPepgent 送达 W-09，W-09 在该 issue 的 PR 中合入；全部差量合入前 issue 保持 open，最终只由一个 PR 关闭。 | (D) `DEC/D20-w10-path-boundary.md:33` |
| F2 | #51 正文第 2 条：“不把评论已写当成送达”；验收：直接替换旧段落，每项差量有 WEB PR 原文与本 issue 评论的对应关系。 | (D) #51 正文 |
| F3 | 片区经理前一次送达记录：D20-03 生命周期已实际送达 W-09；后续每项差量由 W-10 写入 PR body 并评论本 issue 后，再由片区经理实际送达 W-09。 | (A) [评论 6559750589](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6559750589) |

### 1.2 差量与 main 现状

| # | 事实 | 来源 |
|---|---|---|
| F4 | W-10 的 WEB-02 原差量：差量 1 替换 `apps/web/README.md` 第 43–51 行整段；差量 2 替换第 175–176 行一句；差量 3 替换 `01` 第 82 行一句；另有附带观察（`03` 第 63 行、`01` 第 61 行的 catalog `not_supported` 陈述）。 | (A) [评论 6562367617](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6562367617) |
| F5 | PR#65 正文只写“段落原文已写入 #51 的评论，由 W-09 合入”，正文本身未贴原文；PR#65 未改三份 W-09 文档，只改了 W-10 的 `renderer/README.md`。 | (R) `gh pr view 65` 正文第 96–97 行与文件列表 |
| F6 | PR#66（LAB-11a，`Fixes #22`）改了 README 第 45–48 行：删去括号清单 `(lab.catalog.read, the conversation reads, each unconnected page and command kind)`，改为 “Page and command kinds that are not connected yet answer `domain/not_supported` …”。末句 “Page snapshots remain browser fixtures, independently of real authentication; see the renderer entry.” 未动。 | (R) `git diff 54d9e10 1bf7683 -- apps/web/README.md` |
| F7 | PR#68（`Fixes #67`）修正了附带观察的两处（`01` 第 61 行、`03` 第 63 行），并顺带修正 README 第 110 行 “experiment approval is not connected yet”。 | (R) 同上 diff；PR#68 正文 Layer 1 |
| F8 | W-09 的 BLOCKED：未收到实际送达；要求送达以 main `1bf7683` 为底；差量 1 的括号清单已不符事实，但末句替换仍待送达；附带观察已由 #68 修正；差量 2、3 原文未变，仍待送达。 | (A) [评论 6562489557](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6562489557) |
| F9 | W-10 已在 #51 发修订：以 main `1bf7683` 为底，差量 1 改为只替换该段末句（原文 “Page snapshots remain browser fixtures, independently of real authentication; see the [renderer entry](src/renderer/README.md#entry).”），取代原差量 1；差量 2、3 以原评论为准；附带观察撤回。 | (A) [评论 6562616929](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6562616929) |
| F10 | main `1bf7683` 中：差量 1 修订版的原文在 README 第 48–50 行，与 F9 一致；差量 2 的原句 “The browser's fixture snapshots are not replaced by these backend APIs.” 现位于第 176–177 行（PR#66、#68 在其前净增 1 行，原差量写的是第 175–176 行），文字未变；差量 3 的原句在 `01` 第 82 行，文字未变。 | (R) `git show 1bf7683:apps/web/README.md \| grep -n fixture`；`git show 1bf7683:docs/conventions/01-repo-layout-and-layering.md` 第 82 行 |
| F11 | 差量所述行为与 main 源码一致：`_lab.tsx` 的 loader 调 `getLabBridge().readCatalog(null)`，并用 `getLabBridge().subscribe` 按 `invalidates` 让 loader 失效重读；`_lab.experiments.nodes.tsx` 的 loader 经 `getLabBridge().readPage(…, 'nodes', …)` 读页；`client/services/lab.ts#createLabBridge` 与 `client/services/lab/invalidation.ts#invalidates` 存在。 | (R) `git show 1bf7683:` 上述文件 |
| F12 | 差量描述的接缝语义来自已通过决策：D12-03 六个 server function，D12-17 `/api/lab/events` 的 `LabChange` 帧，D7-16/D7-17 前端接缝两阶段与 loader 读取。 | (D) `DEC/D12-lab-wire.md:35,49`；`DEC/D7-lab-backend.md:76-77` |

## 二、初分类

**机械补齐：跨席位文档差量未送达，部分已过时；不涉及契约变化。**

- 三份文档的写方、送达人、合入位置都已由 D20-03 与 #51 正文规定（F1、F2）。卡点只在“评论已写但未实际送达”（F3、F8）与“原差量 1 被 PR#66 改写而过时”（F6）。
- 过时部分已由 W-10 在 #51 修订（F9），修订后的原文与 main `1bf7683` 一致（F10）；附带观察已由 W-09 自有的 PR#68 修掉并撤回（F7、F9）。
- 差量描述的是已合入实现的现状（F11），语义出自已通过的 D12-03、D12-17、D7-16/17（F12）；不改 wire、权限、状态权威或生命周期，也不改 D20 的路径界限。

**补齐分工（建议）：**

| 谁 | 在哪里 | 补什么 |
|---|---|---|
| AreaMgrPepgent | W-09 的 tern 会话 | 以 main `1bf7683` 为底，实际送达三项现行差量：修订版差量 1（[6562616929](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6562616929)，README 第 48–50 行末句）；差量 2（[6562367617](https://github.com/Pepgent/Pepgent/issues/51#issuecomment-6562367617) 第 2 项，README 现第 176–177 行）；差量 3（同评论第 3 项，`01` 第 82 行）。说明原差量 1 与附带观察已作废。送达后在 #51 记录送达。 |
| W-09 | #51 的 PR（`apps/web/README.md`、`docs/conventions/01-repo-layout-and-layering.md`） | 收到送达后按三项原文直接替换；该 PR 只引用 #51，不关闭（#51 要等全部 WEB 切片差量合入后才由一个 PR 关闭）。 |
| W-10 | 无新动作 | 差量 1 修订已发（F9）。 |

**W-09 等待的对象：** AreaMgrPepgent 的实际送达，内容为上表三项。不等待投票、不等待 W-10 再修订。

**程序观察（交闸门 B）：** PR#65 正文未贴原文，只指向 #51 评论（F5），与 D20-03“写进 PR 正文”一句不完全一致。PR#65 已合入，正文不回写；原文以 #51 评论为准，最终关闭 PR 的正文逐项列出差量与对应 WEB PR。

## 三、交闸门 A 的问题（`Argon`）

- **A-1：** 三项现行差量（修订版差量 1、差量 2、差量 3）是否只描述已合入实现与 D12-03、D12-17、D7-16/17 已规定的接缝语义，不触及产品原始意图或公开契约？
- **A-2：** PR#66 把括号清单改为 “Page and command kinds that are not connected yet …”、PR#68 改 README 第 110 行审批 “Own” 的表述，是否只是让文档对齐已合入实现，没有改变契约？

## 四、交闸门 B 的问题（`ArgonGovernance`）

- **B-1：** 由 AreaMgrPepgent 送达、W-09 在 #51 的 PR 中修改 `apps/web/README.md` 与 `docs/conventions/01`，是否都在 D20-03 的写方与送达分工之内，不跨席位路径白名单？
- **B-2：** PR#66、#68 改 W-09 自有文档（`(A)` PR#66 的 worktree 名 `pepgent-lab-11a` 与 W-09 的 LAB 切片一致；#68 为 W-09 自有 #67），是否没有越过 D20-03 的写方界限？
- **B-3：** 本卡点是否不属于必须投票事项、不破坏阶段门禁，可作为机械补齐免投票放行？F5 的程序偏差是否只需记录、无须补救？

## 五、可选处置（只列出）

| 代号 | 处置 | 是否改契约 |
|---|---|---|
| a | 两闸门均不越界：免票放行；在 #51 写明上表分工与 W-09 等待对象；AreaMgrPepgent 按上表送达。 | 不改 |
| b | 任一闸门认定越界：按 P0 立案，议题为越界项。 | 视越界项而定 |
