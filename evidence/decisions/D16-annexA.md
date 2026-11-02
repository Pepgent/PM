# D16 附件 A：按仓 issue 改写与正文回写盘点（只读草稿）

## U69：本次逐项核对记录

先读 `pepgent-soroi/LEDGER.md` 全文及 `AGENTS.md`，再取源；以下核对仅覆盖本次盘点，不宣告阶段 B、工程恢复或 D16 表决完成。(D：LEDGER:9–96；AGENTS:5、26–42)

| 核对项 | 本次执行边界与核对结论 |
|---|---|
| C1 | 保留独立 omp 定制、多仓归属、本仓检查与最终 A0/F01–F32 范围；只摘开发期开工串行锁与 live 子 issue 指向，不裁掉业务功能；不碰 Pepgent 根 checkout、生产、SOPS、测试。(D：LEDGER:13–18) |
| C2 | 附件为取证，不投票、不裁决 D10–D14 效力、不授权秘书执行；由父会话交领导层与双核审议。(D：LEDGER:20–33) |
| C3 | 单主题只读盘点；无工程进程、跨仓实现或共享分支写入；无 task 工具，记录计划后直接取证，未另派工程师。(D：LEDGER:35–45) |
| C4 | 全程中文；当前状态取 GitHub，决策要求取当前文件；local 仅作草稿副本，不代替 PM 定稿；不写 issue/PR、不发常规状态给工程师。(D：LEDGER:47–55) |
| C5 | 已按 C1–C5、R1–R21 逐项核对；不查 session、git 历史、issue 编辑历史或 01a193fd；不改合法遗产、不恢复冻结工程。(D：LEDGER:57–69) |
| R1 | 不重查历史设计或 session；只取指定当前决策文件。(D：LEDGER:76) |
| R2 | 盘点 design 回写缺口，不改设计。(D：LEDGER:77) |
| R3 | 按各独立仓列清单；U121 明确 Pepgent 组件仓的 org 为 Pepgent，仓 A Pepgent/soroi-store、仓 B Pepgent/omp-soroi 已存在并按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) 留存，执行承载见 A2-02/A2-03。(D：LEDGER:78；迁仓执行依据：D53) |
| R4 | 双核审议由父会话负责，本附件不替代。(D：LEDGER:79) |
| R5 | 不计票、不建 decision issue。(D：LEDGER:80) |
| R6 | 本次为父分身委派的附件取证，不包揽秘书执行。(D：LEDGER:81) |
| R7 | 无设计裁定或业务实现派工。(D：LEDGER:82) |
| R8 | 不启动 tern，不触碰无关会话。(D：LEDGER:83) |
| R9 | 不操作分支、worktree、提交或 PR。(D：LEDGER:84) |
| R10 | 不读 01a193fd，也不重做行为分析。(D：LEDGER:85) |
| R11 | 只读 LEDGER，不更新台账。(D：LEDGER:86) |
| R12 | 不创建、连接或改变测试环境。(D：LEDGER:87) |
| R13 | 外围仓只读 GitHub issue；无实现或验证。(D：LEDGER:88) |
| R14 | soroi 只读决策与设计，未改产品。(D：LEDGER:89) |
| R15 | Pepgent 只读远端 issue，未触碰根 checkout。(D：LEDGER:90) |
| R16 | 只记录统一 e2e 归属，不执行任何测试、不缩减范围。(D：LEDGER:91) |
| R17 | 不提前做 D9 或点线面裁决。(D：LEDGER:92) |
| R18 | 不重启冻结工程，治理取证继续。(D：LEDGER:93) |
| R19 | 不改 D15 决议与选票。(D：LEDGER:94) |
| R20 | 当前正文只作源头快照；不执行或反推 D15 回退过程。(D：LEDGER:95) |
| R21 | 本附件只供阶段 B/D16 审议；不等同双核复核或恢复派工通过。(D：LEDGER:96) |

## 口径、来源与取回方式

- `(R)` = 本次 `gh` 命令取得的**当前**状态/正文；`(D)` = 本次读取的当前文件原文。文档里转述过去的 `(R)`，在本附件仍只当 `(D)`，不冒充本次运行结果。
- GitHub 使用已登录的 RiriAgent；`gh auth status` 显示 Active account 为 true。(R)
- 七仓均执行：`gh issue list --repo Pepgent/<仓名> --state open --limit 1000 --json number,title,url,body,state`；另执行 `gh issue view 182 --repo Pepgent/soroi --json number,title,url,state,body,closedAt`。均仅取当前正文，无评论、编辑事件或历史查询。(R)
- 原始命令捕获：soroi `artifact://1798`；Pepgent `artifact://1799`；deploy `artifact://1800`；images `artifact://1802`；lab-library `artifact://1803`；omp-rpc-mux `artifact://1801`；soroi #182 单独 view 为 `artifact://1805`。remote list 返回 `[]`。(R)
- 本次七仓 OPEN 总数分别是 soroi 28、Pepgent 21、deploy 2、images 2、lab-library 1、remote 0、omp-rpc-mux 1。以 `D8-slice-issues.md:9–118` 的链接映射筛选，表 A1 命中 46 个 issue；不是以标题或旧 Project 状态猜 OPEN。映射中的 `LAB-05=#16`、`LAB-06=#14`，与当前 issue 标题一致。(D；R)
- 决策文件路径基目录：`/Users/mouriya/Ext/code/pepgent/pepgent-pm/evidence/decisions/`（下称 `PM/decisions/`）；设计基目录为 `pepgent-soroi/design/`。下列所有行号来自本次当前文件，不沿用旧决策中的漂移裸行号。
- `D10-repo-delivery.md:17` 的 D10-05 要求撤开发期门禁、保留统一验收；:18 D10-06 规定 A0→S1→E2E-21→S2→D9；:26 D10-14 区分 DEP-03 开发合入与统一阶段活动 Stack 接入。**本附件不把这些运行前置、最终验收或本仓检查本身列成删除项。**(D)

## 表 A1：D10-05 正文切换

每行是一个当前 OPEN 的 D8 映射 issue。引文逐字取自当前正文；`<br>` 只作表内换行。`STARTED` 行中的“上游 runtime 证据链接”是同一开工锁的执行要求，只撤该条件，不撤执行者/工作入口登记。依赖链接与业务契约可以保留，待 D16 通过后按 D10-05 将 runtime 开工条件换成代码/产物条件；此处不是整段删除授权。(D：D10:17；R)

### Pepgent/soroi

| Issue | 切片 ID（D8 映射） | 需移除的开发期门禁原文/指向 | 来源 |
|---|---|---|---|
| [#182](https://github.com/Pepgent/soroi/issues/182) | E2E-10 | **无需改写**（仅就本表限定的两类门禁；#182 的统一阶段重标见下表） | (R：当前正文；D：D8 映射) |
| [#190](https://github.com/Pepgent/soroi/issues/190) | STO-05 | “- Depends on: [STO-02](https://github.com/Pepgent/soroi/issues/180)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#196](https://github.com/Pepgent/soroi/issues/196) | SOR-09 | “- Depends on: [SOR-01](https://github.com/Pepgent/soroi/issues/178)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-02](https://github.com/Pepgent/omp-rpc-mux/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#203](https://github.com/Pepgent/soroi/issues/203) | STO-12 | “- Depends on: [STO-01](https://github.com/Pepgent/soroi/issues/180)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#205](https://github.com/Pepgent/soroi/issues/205) | SOR-11 | “- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-10](https://github.com/Pepgent/soroi/issues/197)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#207](https://github.com/Pepgent/soroi/issues/207) | SOR-16 | “- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-05](https://github.com/Pepgent/omp-rpc-mux/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#209](https://github.com/Pepgent/soroi/issues/209) | SOR-13 | “- Depends on: [SOR-02](https://github.com/Pepgent/soroi/issues/193)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-11](https://github.com/Pepgent/soroi/issues/205)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-06](https://github.com/Pepgent/omp-rpc-mux/issues/6)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#211](https://github.com/Pepgent/soroi/issues/211) | SOR-12 | “- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-03](https://github.com/Pepgent/soroi/issues/201)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-08](https://github.com/Pepgent/soroi/issues/204)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#214](https://github.com/Pepgent/soroi/issues/214) | SOR-17a | “- Depends on: [SOR-06](https://github.com/Pepgent/soroi/issues/212)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-04](https://github.com/Pepgent/soroi/issues/188)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-05](https://github.com/Pepgent/remote/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-07](https://github.com/Pepgent/remote/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#215](https://github.com/Pepgent/soroi/issues/215) | SOR-07 | “- Depends on: [SOR-06](https://github.com/Pepgent/soroi/issues/212)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-05](https://github.com/Pepgent/remote/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#216](https://github.com/Pepgent/soroi/issues/216) | SOR-14 | “- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#217](https://github.com/Pepgent/soroi/issues/217) | SOR-15 | “- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-09](https://github.com/Pepgent/soroi/issues/192)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#219](https://github.com/Pepgent/soroi/issues/219) | E2E-11b | “- Depends on: [E2E-11a](https://github.com/Pepgent/soroi/issues/213)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-11](https://github.com/Pepgent/soroi/issues/205)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#220](https://github.com/Pepgent/soroi/issues/220) | E2E-12 | “- Depends on: [SOR-06](https://github.com/Pepgent/soroi/issues/212)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-05](https://github.com/Pepgent/soroi/issues/190)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-06](https://github.com/Pepgent/soroi/issues/189)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-07](https://github.com/Pepgent/soroi/issues/194)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-08](https://github.com/Pepgent/soroi/issues/191)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-11](https://github.com/Pepgent/soroi/issues/202)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#222](https://github.com/Pepgent/soroi/issues/222) | SOR-18 | “- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-11](https://github.com/Pepgent/soroi/issues/205)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#223](https://github.com/Pepgent/soroi/issues/223) | SOR-17b | “- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#224](https://github.com/Pepgent/soroi/issues/224) | DIST-02 | “- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [CUS-01](https://github.com/Pepgent/soroi/issues/183)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [CUS-02](https://github.com/Pepgent/soroi/issues/198)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [CUS-03](https://github.com/Pepgent/soroi/issues/206)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [CUS-04](https://github.com/Pepgent/soroi/issues/186)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [IMG-01](https://github.com/Pepgent/images/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [E2E-02](https://github.com/Pepgent/soroi/issues/218)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#226](https://github.com/Pepgent/soroi/issues/226) | E2E-14 | “- Depends on: [E2E-02](https://github.com/Pepgent/soroi/issues/218)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-09](https://github.com/Pepgent/soroi/issues/196)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [CUS-04](https://github.com/Pepgent/soroi/issues/186)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#227](https://github.com/Pepgent/soroi/issues/227) | E2E-15 | “- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-14](https://github.com/Pepgent/soroi/issues/216)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-15](https://github.com/Pepgent/soroi/issues/217)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-16](https://github.com/Pepgent/soroi/issues/207)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-05](https://github.com/Pepgent/omp-rpc-mux/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-06](https://github.com/Pepgent/omp-rpc-mux/issues/6)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#228](https://github.com/Pepgent/soroi/issues/228) | SOR-20 | “- Depends on: [SOR-14](https://github.com/Pepgent/soroi/issues/216)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-18](https://github.com/Pepgent/soroi/issues/222)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#229](https://github.com/Pepgent/soroi/issues/229) | SOR-19 | “- Depends on: [SOR-18](https://github.com/Pepgent/soroi/issues/222)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-10](https://github.com/Pepgent/soroi/issues/200)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#231](https://github.com/Pepgent/soroi/issues/231) | E2E-16 | “- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-20](https://github.com/Pepgent/soroi/issues/228)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DIST-04](https://github.com/Pepgent/soroi/issues/225)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-07](https://github.com/Pepgent/soroi/issues/194)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#232](https://github.com/Pepgent/soroi/issues/232) | E2E-17 | “- Depends on: [REM-01](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-02](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-03](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-17a](https://github.com/Pepgent/soroi/issues/214)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-17b](https://github.com/Pepgent/soroi/issues/223)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DIST-04](https://github.com/Pepgent/soroi/issues/225)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [ENV-04](https://github.com/Pepgent/PM/issues/12)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#233](https://github.com/Pepgent/soroi/issues/233) | E2E-18 | “- Depends on: [SOR-18](https://github.com/Pepgent/soroi/issues/222)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-19](https://github.com/Pepgent/soroi/issues/229)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |

### Pepgent/Pepgent

| Issue | 切片 ID（D8 映射） | 需移除的开发期门禁原文/指向 | 来源 |
|---|---|---|---|
| [#9](https://github.com/Pepgent/Pepgent/issues/9) | WEB-01 | “- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#11](https://github.com/Pepgent/Pepgent/issues/11) | LAB-12 | “- Depends on: [REM-05](https://github.com/Pepgent/remote/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-06](https://github.com/Pepgent/remote/issues/5)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-07](https://github.com/Pepgent/remote/issues/4)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [REM-02](https://github.com/Pepgent/remote/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#13](https://github.com/Pepgent/Pepgent/issues/13) | LAB-04 | “- Depends on: [LAB-02](https://github.com/Pepgent/Pepgent/issues/10)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-03](https://github.com/Pepgent/omp-rpc-mux/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#14](https://github.com/Pepgent/Pepgent/issues/14) | LAB-06 | “- Depends on: [LAB-02](https://github.com/Pepgent/Pepgent/issues/10)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-05](https://github.com/Pepgent/soroi/issues/190)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#15](https://github.com/Pepgent/Pepgent/issues/15) | LAB-10 | “- Depends on: [LAB-02](https://github.com/Pepgent/Pepgent/issues/10)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-11](https://github.com/Pepgent/soroi/issues/202)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LIB-01](https://github.com/Pepgent/lab-library/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#16](https://github.com/Pepgent/Pepgent/issues/16) | LAB-05 | “- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [STO-04](https://github.com/Pepgent/soroi/issues/188)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#17](https://github.com/Pepgent/Pepgent/issues/17) | LAB-07a | “- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-04](https://github.com/Pepgent/omp-rpc-mux/issues/5)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#18](https://github.com/Pepgent/Pepgent/issues/18) | LAB-11b | “- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#19](https://github.com/Pepgent/Pepgent/issues/19) | LAB-09 | “- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#20](https://github.com/Pepgent/Pepgent/issues/20) | LAB-07b | “- Depends on: [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-03](https://github.com/Pepgent/omp-rpc-mux/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-06](https://github.com/Pepgent/omp-rpc-mux/issues/6)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [MUX-07](https://github.com/Pepgent/omp-rpc-mux/issues/7)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#21](https://github.com/Pepgent/Pepgent/issues/21) | WEB-02 | “- Depends on: [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [WEB-01](https://github.com/Pepgent/Pepgent/issues/9)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#22](https://github.com/Pepgent/Pepgent/issues/22) | LAB-11a | “- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-05](https://github.com/Pepgent/Pepgent/issues/16)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#23](https://github.com/Pepgent/Pepgent/issues/23) | E2E-21 | “- Depends on: [LAB-04](https://github.com/Pepgent/Pepgent/issues/13)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-06](https://github.com/Pepgent/Pepgent/issues/14)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-07a](https://github.com/Pepgent/Pepgent/issues/17)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DEP-01](https://github.com/Pepgent/deploy/issues/2)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DEP-03](https://github.com/Pepgent/deploy/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#24](https://github.com/Pepgent/Pepgent/issues/24) | LAB-08 | “- Depends on: [LAB-07b](https://github.com/Pepgent/Pepgent/issues/20)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-13](https://github.com/Pepgent/soroi/issues/209)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-15](https://github.com/Pepgent/soroi/issues/217)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [SOR-16](https://github.com/Pepgent/soroi/issues/207)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#25](https://github.com/Pepgent/Pepgent/issues/25) | WEB-05 | “- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-09](https://github.com/Pepgent/Pepgent/issues/19)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-10](https://github.com/Pepgent/Pepgent/issues/15)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#26](https://github.com/Pepgent/Pepgent/issues/26) | WEB-03 | “- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-07b](https://github.com/Pepgent/Pepgent/issues/20)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#27](https://github.com/Pepgent/Pepgent/issues/27) | WEB-04 | “- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-11a](https://github.com/Pepgent/Pepgent/issues/22)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-11b](https://github.com/Pepgent/Pepgent/issues/18)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#28](https://github.com/Pepgent/Pepgent/issues/28) | WEB-06 | “- Depends on: [WEB-02](https://github.com/Pepgent/Pepgent/issues/21)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-12](https://github.com/Pepgent/Pepgent/issues/11)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#29](https://github.com/Pepgent/Pepgent/issues/29) | WEB-07 | “- Depends on: [WEB-03](https://github.com/Pepgent/Pepgent/issues/26)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [WEB-04](https://github.com/Pepgent/Pepgent/issues/27)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [WEB-05](https://github.com/Pepgent/Pepgent/issues/25)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [WEB-06](https://github.com/Pepgent/Pepgent/issues/28)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |
| [#30](https://github.com/Pepgent/Pepgent/issues/30) | E2E-20 | “- Depends on: [WEB-07](https://github.com/Pepgent/Pepgent/issues/29)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DEP-01](https://github.com/Pepgent/deploy/issues/2)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DEP-02](https://github.com/Pepgent/deploy/issues/3)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |

### Pepgent/deploy

| Issue | 切片 ID（D8 映射） | 需移除的开发期门禁原文/指向 | 来源 |
|---|---|---|---|
| [#1](https://github.com/Pepgent/deploy/issues/1) | DEP-03 | “- Depends on: [STO-12](https://github.com/Pepgent/soroi/issues/203)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- `STARTED`：注明执行者、工作入口、上游 runtime 证据链接。” | (R：当前正文；D：D8 映射) |

### Pepgent/images

| Issue | 切片 ID（D8 映射） | 需移除的开发期门禁原文/指向 | 来源 |
|---|---|---|---|
| [#3](https://github.com/Pepgent/images/issues/3) | IMG-04 | “- Depends on: [IMG-01](https://github.com/Pepgent/images/issues/1)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [LAB-01](https://github.com/Pepgent/Pepgent/issues/8)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“- Depends on: [DIST-01](https://github.com/Pepgent/soroi/issues/199)（前置切片须已有 runtime 验收证据，才能开工）。”<br>“认证及安装后工具清单由具名 live 集成 child 收口。”<br>“两个 child 串行：先发布镜像，再以 LAB-03 和 DIST-01 的真实产物验证部署。”<br>“[live 集成 child](https://github.com/Pepgent/images/issues/6)”<br>“实现与 runtime 证据放对应 child 的 PR，非代码集成结论放 live child。” | (R：当前正文；D：D8 映射) |

### Pepgent/lab-library

当前唯一 OPEN 为 [#5](https://github.com/Pepgent/lab-library/issues/5)，D8 的 LIB-01 映射到 #1，不在 OPEN 返回中。因此本仓 A1 为 **0 条**，不据此要求重开。(R；D：D8-slice-issues.md:20–27、69–76)

### Pepgent/remote

当前 OPEN 返回为空。因此本仓 A1 为 **0 条**，不据此要求重开。(R；D：D8-slice-issues.md:20–27、69–76)

### Pepgent/omp-rpc-mux

当前唯一 OPEN 为 [#13](https://github.com/Pepgent/omp-rpc-mux/issues/13)，D8 的 MUX-01–08 映射到 #1/3/4/5/6/7，均不在 OPEN 返回中。因此本仓 A1 为 **0 条**，不据此要求重开。(R；D：D8-slice-issues.md:20–27、69–76)

### D10-05 点名 live issue 的当前状态（独立列示，不与 A1 重复计数）

| Issue | 当前状态 | 当前范围/正文事实 | 来源 |
|---|---|---|---|
| [soroi#182](https://github.com/Pepgent/soroi/issues/182) | OPEN；closedAt=null | E2E-10；真实 S1 F01，A0 同发行前置，要求运行后归档。没有 A1 的 runtime 开工串行锁。 | (R：view 182 与 list) |
| [soroi#245](https://github.com/Pepgent/soroi/issues/245) | OPEN | 承接 E2E-11a/#213 的 F02–F04 live；仍写旧 phase/ordinal 提醒契约。 | (R：list 当前正文) |
| [soroi#250](https://github.com/Pepgent/soroi/issues/250) | OPEN | 承接 E2E-13/#221 的 F07/F19/F22 live 与自动驱动。 | (R：list 当前正文) |
| [soroi#259](https://github.com/Pepgent/soroi/issues/259) | OPEN | 承接 E2E-19/#208 的 F26–F30 S1 automatic driver/live。 | (R：list 当前正文) |

D10-05 要将上述 live 正文改为“统一 e2e 阶段工作项”并关联承接项，**不是关闭、删除或缩减 F 流程**。#235 A0 也仍 OPEN 且不在 D8 映射内；其正文引用 #259。images #6 与 deploy #8 仍 OPEN 且不在 D8 映射内，正文仍为开发期 live child/认证部署生命周期描述；D10-05 把二者列为需核对措辞的先例，本附件不据当前正文宣称它们已经完成该切换。(D：D10:17；R：七仓 list)

## 表 A2：明确要求新建、重开或挂父子边的 issue

严格只录**正文明确的 issue 操作**。不把“修改已交付实现”“影响”“新增字段/文件”解释成自动新建或重开 issue；旧评论、已合并 PR 不在改写范围。(D：D10:16–19；D11A:55–72；D11B:18–27；D11C:20–25；D12:617–629；D13:50–58；D14:32–42)

| 编号 | 目标仓 | 明确动作与切片范围 | 来源条目与本次行号 | 当前可执行边界 |
|---|---|---|---|---|
| A2-01 | Pepgent/remote | **秘书开 issue**，由 remote 工程师随实现对齐 `design/remote.md`：remove 只等待终态、Slurm body/step 的 OCI 引用与目录时 digest 解析、EndedUnstarted 的既定含义；涉及 REM-01、REM-02、REM-05、REM-07。源定位为 remote 设计 :50、97、109、119–123、122、129、141。 | (D：D11B-solo-ruling-review.md:12、14–16，D11-10、D11-43A/B、D11-WB2；影响 :24、26) | 当前 remote OPEN=[]。(R) 本文只列授权要求，不创建、不指定新号。 |
| A2-02 | 仓 A `Pepgent/soroi-store`；执行 issue 建在 `Pepgent/soroi` | **仓 A 迁仓执行：** [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345) 为 [迁仓总 issue soroi#344](https://github.com/Pepgent/soroi/issues/344) 的子 issue，W-06 以导入时 soroi main 的 packages/store 快照向仓 A main 开导入 PR；仓根布局、Dockerfile、镜像、工程规则和 store-contract 派生 workflow 按 D53-03 v1。快照后 store 唯一写源为仓 A；不再按 STO 转移/条件重建办理，已关闭项不动。 | [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-03 v1、07 v3 | 现在（阶段 B）执行，只做仓 A 本仓检查即合入，不设开工锁或每 PR 合入锁；Main 依 D53-02 v3 建 main 作为导入 PR 的 base。 |
| A2-03 | 仓 B `Pepgent/omp-soroi`；执行 issue 建在 `Pepgent/soroi` | **仓 B 迁仓执行：** [A2-03 / soroi#346](https://github.com/Pepgent/soroi/issues/346) 为 [迁仓总 issue soroi#344](https://github.com/Pepgent/soroi/issues/344) 的子 issue，W-07 导入定制与发行，根文件与 builder 按 D53-04 v2，消费仓 A store-contract；快照后插件与发行唯一写源为仓 B。4 个引用 store 源码的测试由 D53-05 v3 的 [soroi 切换 / #347](https://github.com/Pepgent/soroi/issues/347) 迁入 e2e，DIST-02 与 E2E 留 soroi；不再条件重建已关闭 SOR/CUS issue。 | [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-04 v2、05 v3、07 v3 | 现在（阶段 B）执行，只做仓 B 本仓检查即合入，不设合入锁；A2-03 合入后，W-07 经 [soroi 切换 / #347](https://github.com/Pepgent/soroi/issues/347) 的“[仓 B 测试接线导出 / #348](https://github.com/Pepgent/soroi/issues/348)”子 issue，在仓 B 另开只改 exports 的 PR。 |
| A2-04 | Pepgent/PM | D10-07 明确“新 PM decision issue D11”；范围是 LR 51 行分流与契约逐条审议，**不是实现切片或新的父子树**。D11-A/B/C 文件已分别指向 [PM#17](https://github.com/Pepgent/PM/issues/17)、[PM#21](https://github.com/Pepgent/PM/issues/21)、[PM#22](https://github.com/Pepgent/PM/issues/22)。 | (D：D10:19 D10-07；D11A:3、D11B:3、D11C:3) | 记录源中的明确新建要求，已有链接不是本次重建授权；本次未另查 PM issue 当前状态。 |
| A2-05 | Pepgent/soroi | **由 D16-04 新增（不是盘点所得）**：秘书新建一个 issue，承载 D14-02 的安装器改动，正文引用已关闭的 DIST-01 [#199](https://github.com/Pepgent/soroi/issues/199) 与 D14-02。范围：`scripts/install.ts --artifact` 写出 `release.json`；`compose/central-entrypoint.sh` 传入 `--artifact`；插件开发说明随实现一并修改。owner 为 W-07，须先于 SOR-07（#215）合入。 | (D：D14-release-identity.md:29–30、34–37；D16-04) | D16 通过后才可执行。 |
| A2-06 | Pepgent/soroi | **由 D16-04 新增**：秘书新建 issue，承载 PR260（soroi#260）中 `scripts/build-release.py` 的改动，按 D10-02 仓 B 新布局重写；正文引用 #260 与 D10-04④。owner 为 W-07。 | (D：D10-repo-delivery.md:16 D10-04④；D16-04) | D16 通过后执行 |
| A2-07 | Pepgent/deploy | **由 D16-04 新增**：秘书新建 issue，内容为中心 Stack 的 `lab-entrypoint.sh` 调用安装器时传入 `--artifact /release/soroi.tar`；正文引用 D14-02。owner 为 W-04，排在 A2-05 合入之后。 | (D：D14-release-identity.md:39；D16-04) | D16 通过后执行 |
| A2-08 | Pepgent/soroi | **由 D16-04 新增**：秘书新建 issue，内容为 A0 campaign 及 DIST-01、CUS-04 启动脚本的安装器 argv 加 `--artifact`，所有中心 Main 入口从已安装发行启动；正文引用 D14-02。owner 为 W-08。 | (D：D14-release-identity.md:40；D16-04) | D16 通过后执行 |
| A2-09 | Pepgent/Pepgent | **由 D16-04 新增**：秘书新建 issue，内容为宿主机开发驱动从已安装发行启动根 omp；正文引用 D14-02。owner 为 W-09。 | (D：D14-release-identity.md:41；D16-04) | D16 通过后执行 |
| A2-10 | Pepgent/soroi | **由 D16-05 新增：** 秘书新建一个 issue，由 W-06 在同一个 PR 中完成，作为该席位的第一个切片。内容如下：<br>• 在 `packages/store/src/contract.ts` 中实现并导出 `RunComparisonSchema`、`ValueUsageSchema`、`ActivitySchema`；<br>• 在根 `package.json` 新增 `exports`：`./contract`、`./identity`；<br>• 补 `zod` 依赖；<br>• 重新生成 `bun.lock`。 | (D：D12-lab-wire.md:33；D10-10；D16-05①) | D16 通过后执行 |
| A2-12 | Pepgent/Pepgent | **由 D16-03、D16-05 新增：** 秘书新建一个 issue，在 A2-10 合入后进行。内容如下：<br>• 落地 D12 的 `apps/web/src/protocol/lab/**`；<br>• 在依赖文件中以 git 依赖引用 `Pepgent/soroi` 默认分支的 store 契约。<br>owner 为 W-09，作为该席位的第一个切片；合入后 W-10 才能启动。 | (D：D12-01、D12:33；D16-03④；D16-05②) | D16 通过后执行 |

**迁仓执行的父子边按 D53 办理：** A2-02、A2-03 均挂在 soroi#344 下，soroi 切换及其“[仓 B 测试接线导出 / #348](https://github.com/Pepgent/soroi/issues/348)”子项按 D53-05 v3。其余 D10–D14 的原始盘点不自动授权重开或新建；尤其 D14:36 指向已关闭的 DIST-01/#199，不能据“安装器加参数”自行重开。D10-05 移出的验收义务仍写入对应 E2E/A0/S1/S2 正文，不添造新号。

## 表 A3：正文回写目标及当前含有情况

“未含/部分/已一致”只表示当前文字，不证明 D15 的历史执行过程。D11-47C 的规则**不纳入有效回写内容**，其携带与继承事件部分全部按 D11-C1/C2 汇总。当前设计中既有的相同句子，不据此认定为 D15 遗漏回退。(D：D11C:16–18)

| 编号 | 目标文档 | 定位 | 回写内容 | 来源条目 | 当前文件观察（均为 D） |
|---|---|---|---|---|---|
| A3-01 | PM D2-components.md | D2-13（当前:50） | Komodo Build 就位前 docker buildx 构建/推送，之后再切换 | (D：D11-WB；D11-04B（D11A:44、47）) | (D) 未含；当前仍直接规定用 Komodo Build，未写过渡时点。 |
| A3-02 | PM D3-network-mux.md | dial/退出帧（当前:100–111、127–130） | 正常退出原 code；信号退出 128+信号编号 | (D：D11-WB；D11-01（D11A:42、47）) | (D) 未含编码约定；当前帧仅 code:number。 |
| A3-03 | PM D4-remote-exec.md | 框架/终态、D4-07、D4-12 | Ended/EndedUnstarted 区分、先终态后 remove，按 LR-03 对齐 | (D：D11-WB（D11A:15、47）；D11-WB2（D11B:14–16）) | (D) 部分：当前 D4-07、D4-12 仍用 ended 未展开 EndedUnstarted；D8 REM-02/07 已展开。 |
| A3-04 | PM D4-remote-exec.md | D4-03（当前:49），节点项目/依赖恢复 | 每次 eval 私有 regular-file 源快照，检查与构建同源，不跨 eval 缓存；构造器由已加载插件解析 | (D：D11-WB；D11-42（D11A:45、47）) | (D) 未含；当前:49 仍以 lockfile 哈希为键复用依赖目录。 |
| A3-05 | PM D4-remote-exec.md | D4-01、D4-03 的可 bundle 边界 | node:module/module 只用静态具名 isBuiltin/builtinModules，排除加载器 API | (D：D11-WB；D11-44（D11A:46–47）) | (D) 未含此具体 API 边界；当前只有不能 bundle 的一般约束。 |
| A3-06 | PM D4-remote-exec.md | D4-18（当前:64） | Slurm 同其他后端在读取模板目录时解析 OCI 引用的 registry digest | (D：D11-WB2；D11-10（D11B:12、16）) | (D) 未含；当前 Slurm 配置例仍写集群镜像路径，未定目录时解析。 |
| A3-07 | PM D4-remote-exec.md | CallRequest.agent（当前:120–129）；D4-08、D4-15 | 移除 capture 字段；boot/RemoteChild 不生成校验持久化中心捕获身份 | (D：D11-WB2；D11-28（D11B:13、16）) | (D) 未含；当前:128 仍有 readonly capture:CaptureId；四列批次已写在 D4-15。 |
| A3-08 | PM D5-plugins-eval.md | §3.4 CheckError（当前:260–274） | 加 pin_key{name} | (D：D11-WB；D11-11B（D11A:36、47）) | (D) 未含；联合从 destructure_mismatch 直接到 partial_pin。design/eval.md:209 已有 pin_key 是另一当前事实。 |
| A3-09 | PM D5-plugins-eval.md | D5-13（当前:88），提醒说明 | addBeforeModelCall，obfuscator，transcript customType 与仅 {text}，候选而非实际派发证明 | (D：D11-WB2；D11-37（D11B:10、16）) | (D) 未含；当前仍 context 钩子/每次请求模型前。 |
| A3-10 | PM D5-plugins-eval.md | §3.6 SlotState（当前:295–297） | running/awaiting_human 加 startedAt、version；running 加 inputs | (D：D12:46 D12-14；:622 回写行) | (D) 未含；当前两变体缺对应字段。 |
| A3-11 | PM D6-store-service.md | GraphNode/RunGraph（当前:172–184） | Call.capture、空输出字段名；独立 AbortedCall，无 version/body/env、outputs=[] | (D：D11-WB；LR-02、D11-08（D11A:15、34、47）) | (D) 未含修订形状；当前仅 Root/Call，Call 不带 capture，Aborted 仍在 CallStatus。 |
| A3-12 | PM D6-store-service.md | Activity（当前:186–190） | 被中止调用独立 AbortedCall、不带 body | (D：D11-WB；D11-11A（D11A:35、47）) | (D) 未含；当前所有 interval 必带 body。 |
| A3-13 | PM D6-store-service.md | Pair（当前:202–207） | SameValue、Aborted{side}；Changed.fields 的 Both/OnlyA/OnlyB | (D：D11-WB；D11-13A（D11A:37、47）) | (D) 未含；当前 SameCapture/Changed/OnlyA/OnlyB/Ambiguous，字段固定 a+b。 |
| A3-14 | PM D6-store-service.md | D6-13 与 /compare 草图（当前:41、197） | map 为 URL 编码 JSON 数组 [rootA,rootB][] | (D：D11-WB；D11-13B（D11A:38、47）) | (D) 未含；仍 map={rootA}:{rootB},…。 |
| A3-15 | PM D6-store-service.md | D6-16、DeriveCommit（当前:44、130–132） | 必带 EvalTransfer、run_started(seq1) 物化、无 step_committed；继承完成调用/停止；事件依 C2 | (D：D11-WB；D11-19（D11A:39、47）；D11-C2（D11C:17–18）) | (D) 未完整含；DeriveCommit 无 transfer，D6-16 未写物化提交标记序列。 |
| A3-16 | PM D6-store-service.md | D6-07 与 volume 接口（当前:35、151–152） | regular file 集合；Executed/Human/Aborted/Inherited 各自发布规则 | (D：D11-WB；D11-24（D11A:40、47）) | (D) 未含具体按来历发布规则；当前接口仅 files 清单。 |
| A3-17 | PM D6-store-service.md | D6-06、lifecycle 草图（当前:34、217） | 十进制提交序 cursor、after 默认0、持久化/一次性发布顺序、流至断开 | (D：D11-WB；D11-47A（D11A:27、47）) | (D) 部分：已有 cursor:string 与 after；未含格式、分配锚点及迁移顺序。 |
| A3-18 | PM D6-store-service.md | D6-09、run stream 草图（当前:37、216） | SSE id=十进制 seq、event=kind、data=RunEvent，after 严格大于，结束运行发完历史即结束 | (D：D11-WB；D11-47B（D11A:28、47）) | (D) 部分：已有 after 与 data:RunEvent；缺 id/event 编码及流结束规则。 |
| A3-19 | PM D6-store-service.md | D6-04、D6-09、RunEvent（当前:32、37、210–215） | 提交级 records{nodes,edges} 唯一携带；调用标记 {kind,seq,at,step,position}；提交级先于标记及停止 | (D：D11-WB3；D11-C1（D11C:16、18），取代 D11-47C) | (D) 未含；当前调用事件仍带 call:GraphNode，提交事件无 records。 |
| A3-20 | PM D6-store-service.md | D6-10（当前:38） | at=k 在提交级事件整体生效；activity 来自调用记录起止时刻 | (D：D11-WB3；D11-C1（D11C:16、18）) | (D) 未含修订；当前活动时间来源仍写随步提交的事件字段。 |
| A3-21 | PM D6-store-service.md | 中止/介入时序图（当前:274） | step_committed(records)→call_started→call_aborted→human_handback | (D：D11-WB3（D11C:18；原文旧定位 D6:294）) | (D) 未含；当前仍 call_aborted、human_handback、step_committed。 |
| A3-22 | PM D7-lab-backend.md | D7-03（当前:63） | approval any/ownExperiments 与角色、discussion create/prompt 与 owner；公开认证入口、无自助注册建 Lab、先 seed 后服务 | (D：D11-WB；D11-29A/30/49（D11A:26、30、32、47）) | (D) 未完整含；当前仍四项权限和布尔 approve，未写新权限联合与全部入口规则。 |
| A3-23 | PM D7-lab-backend.md | D7-06（当前:66） | 自己的实验按草稿所属讨论 conversation.owner 与 member.id 判定 | (D：D11-WB；D11-29B（D11A:31、47）) | (D) 未含该判定；当前仍由有 approve 的成员批准。 |
| A3-24 | PM D7-lab-backend.md | F31 时序图（当前:266） | 提交级事件先，再调用标记与 human_handback | (D：D11-WB3（D11C:18；原文旧定位 D7:203）) | (D) 未含；仍 call_aborted、human_handback、step_committed。 |
| A3-25 | PM D7-lab-backend.md | D7-05/10/11/18、settings 字段行、接口草图（当前:65、70–71、78、106、116–185、214–221） | 线契约指向 D12；增加 conversation read/models；上传走 D12 HTTP；settings 无参；三个 host tools 输入扩充、自动化规则/模板编辑按 D12 | (D：D12:621 回写行；D12-03/05/09/10/13/16) | (D) 未完整含；当前仍旧三 server functions、settings{tab}、旧 host tool 输入、其余页同理，未指向 D12。 |
| A3-26 | PM D8-mvp-scope.md | D8-06（当前:77） | provider auth:none，PEPGENT_GATEWAY_TOKEN 构造 Authorization，不再 apiKey env | (D：D11-WB；D11-12（D11A:41、47）) | (D) 未含；当前仍 apiKey 指向 token 的环境变量名。 |
| A3-27 | PM D8-mvp-scope.md | F18（当前:137） | 全部文件明确为全部 regular 文件 | (D：D11-WB；D11-24（D11A:40、47）) | (D) 未含 regular 限定，仍 soroi/in/work 下全部文件。 |
| A3-28 | PM D8-mvp-scope.md | EP7、F02⑤、F08、F22④⑤⑥⑦、F23、SOR-08（当前:100、121、127、141–142；SOR-08 行） | 提醒候选构造时记录；{text}/transcript 顺序；F22 派批前保留一个主 agent 可见 atom | (D：D11-WB2；D11-37（D11B:10、16）) | (D) 未含候选/保留 atom 修订；当前仍请求模型之前措辞，EP7 为追加自定义条目的占位。 |
| A3-29 | PM D8-mvp-scope.md | F22⑦⑨（当前:141） | 只用读方帧、提醒与 store 事实；不读取 soroi.eval-lifecycle | (D：D11-WB2；D11-21（D11B:11、16）) | (D) 已有相应 store 终态判据、未要求读取 lifecycle 自定义条目；⑦提醒措辞仍须与 D11-37 一起改。不是全表“均未含”。 |
| A3-30 | PM D8-mvp-scope.md | IMG-03、ENV-04、REM-01/05、F15、DIST-04、DEP-02（当前:245、238、322/326、134、316、366） | Slurm OCI 引用代替独立 SIF；body/step 交 Apptainer，身份按目录时解析 | (D：D11-WB2；D11-10（D11B:12、16）) | (D) 未完整含；IMG-03:245 与 ENV-04:238 明确仍 SIF；其余行多为泛化接口，需依该条核对而不是全删。 |
| A3-31 | PM D8-mvp-scope.md | REM-02、REM-07、SOR-20（当前 REM/SOR 表相应 ID） | 核对先 abort 再等待终态/remove；remove 不取消 | (D：D11-WB2；D11-43A（D11B:14、16）) | (D) 已一致：REM-02/07 写先终态后 remove；SOR-20 写 abort 后等终态再 remove；一致处不改。 |
| A3-32 | PM D8-mvp-scope.md | F10、F11、F23、F24、F26（当前:129–130、142–143、145） | 核对提交级携带和转变标记；F24 保留 call_inherited | (D：D11-WB3（D11C:18）) | (D) 现有 F 行未要求每条调用标记带节点，F24② 已要求 call_inherited；与 C1/C2 无上述冲突，一致处不改。 |
| A3-33 | PM D8-mvp-scope.md | §5.4（当前:474–484） | 加入 D12 第一版无来源字段清单（D12:559–577） | (D：D12:624 回写行) | (D) 未含；当前§5.4仅四类结论与不允许不下结论，未列 D12 的字段清单。 |
| A3-34 | soroi design/eval.md | 根 atom 写法/检查（当前:159、202） | file("相对路径") DSL、File 根字节去向与值身份 | (D：D11-WB；D11-F12（D11A:47、53）) | (D) 未含；当前仍只允许数字/字符串/布尔字面量。 |
| A3-35 | soroi design/eval.md | 节点版本与依赖（当前:88–89） | 私有 regular-file 快照、同源检查构建、host 构造器；静态 module API 边界 | (D：D11-WB；D11-42/44（D11A:45–47）) | (D) 未含；仍 lockfile 派生缓存，未写具体加载器边界。 |
| A3-36 | soroi design/eval.md | 远程 call.json/boot 描述（当前:108–116） | Agent call.json 不带 capture；中心负责捕获身份 | (D：D11-WB2；D11-28（D11B:13、16）) | (D) 部分：当前未列 capture 字段，也没有完整 Agent 请求形状与明确不带 capture 的职责说明。 |
| A3-37 | soroi design/eval.md | 流程图、未消费提醒（当前:9、222） | 公开 addBeforeModelCall、obfuscator、仅{text}、transcript顺序 | (D：D11-WB2；D11-37（D11B:10、16）) | (D) 未含；仍 context 钩子。 |
| A3-38 | soroi design/store.md | “提醒记录的说法”（源未给具体节/行） | D11-37 的提醒记录语义，不能误归 store 持久记录 | (D：D11-WB2（D11B:16）) | (D) 当前全文未见提醒记录专段；**BLOCKED-C：源条目缺精确落点，不能由盘点者选择新章节/新增正文设计**。 |
| A3-39 | soroi design/store.md | /compare 正文与接口总览（当前:151 及总览 compare 行） | URL 编码 JSON 数组根映射 | (D：D11-WB2；D11-13B（D11B:16；D11A:38）) | (D) 未含；两处仍 map={rootA}:{rootB},…。 |
| A3-40 | soroi design/store.md | events 表、生命周期、时间轴、SSE（当前:40、94–99、133–140、149） | C1/C2 提交级 records、标记形状/顺序、物化序列、回看锚点与 activity 来自调用记录 | (D：D11-WB3（D11C:16–18）；D11-WB 的概括目标) | (D) 未含具体携带形状/顺序；:138 仍“调用事件携带”的原始时刻。 |
| A3-41 | PM D4-remote-exec.md | D4-02 Program 公式；同表 D4-18 的对应 Program 公式 | Program 加发行身份；Agent 原公式保持 | (D：D14-01（D14:28；明确“修订 D4-02”）) | (D) 未含；当前 D4-02:48 与 D4-18:64 仍版本+输入+环境，不含 Program 发行身份。 |
| A3-42 | soroi design/eval.md；design/store.md | eval:93 捕获身份段；store:67 Program、:68 Agent | Program=节点版本+输入+环境+发行；Agent 延续同发行加 Lab .omp 身份 | (D：D14-01（D14:28）) | (D) 未含 Program 修订；store:67 仍三项，eval:93 只给 Agent 另加定制身份；Agent 已有发行身份不需重复加。 |
| A3-43 | PM D7-lab-backend.md | D7-02（当前:62）及自有记录草图（当前:187–202） | 补 D12-16 的创建/更新时间、来源/报告/自动化字段与 conversation_read，discussion_context 外键按 ArtifactRef 修订 | (D：D12-16（D12:48，明确修订 D7-02）) | (D) 未完整含；当前 D7-02 表清单无 conversation_read，草图无所列创建/更新时间与来源字段。 |

### A3 边界补充（不计入上述限定目标的条数）

以下源有明确文档动作，但目标不属于题定的 PM D2–D8 / soroi `design/*.md`，因此单独列出而不漏记；不据此扩展本次修改授权。

| 目标 | 来源与当前观察 |
|---|---|
| `Pepgent/lab-library/README.md` | D11-WB（D11A:47，D11-F12/42/44）及 D12:47、627（D12-15，JSDoc `@group`/`@estimateMinutes`）。当前 README:13、20–23、36 仍需手工 symlink，:51–55 run_* 参数仍为 string，未列 JSDoc 两项；:42 已有静态 TS AST/显式返回注解约定。是**部分既有内容，不是全部未含**。(D：当前 README 全文) |
| `Pepgent/remote/design/remote.md` | D11-WB2（D11B:16）的工程师文档动作已列 A2-01；本次未扩展读取该仓设计文件，不声称当前已回写。(D) |
| soroi 插件开发说明（当前 `packages/omp-soroi/README.md`） | D13-05 与影响行（D13:48、54）要求写两变量和固定 runner 环境契约；D14:36 要改为先打包安装再运行 eval。当前 README:5–19 仍直接 plugin link/-e 源包、:89 仅 SOROI_STORE_URL，未写两中心身份变量、固定 PATH/BUN_BE_BUN 且不传 HOME、`--artifact`/`release.json` 的安装路径；:101–107 的私有快照与 loader 边界已存在。(D：当前 README 全文) |
| PM D10-repo-delivery.md | D12:623 要修改 D10-10 与 D10:63，让 Pepgent/Pepgent 也用仓 A contract git 依赖；当前 D10:22 只列仓 B，:63 仍是未采纳该建议。因题定 A3 是 PM D2–D8，单列此项不计 A3。(D) |
| Pepgent LAB/WEB 切片 issue | D12:629 要秘书评论“契约以 D12 为准”并列切片对应行；这是**评论动作，不是新建/重开/挂边或 A3 文档正文**。该行把 #14 写 LAB-05、#16 写 LAB-06，与 D8-slice-issues:81–82、当前两 issue 正文相反；“#21 WEB-02 至 #29 WEB-07”也不应按连续号误覆盖其他 LAB 项，应按 D8 的逐切片链接选择。另 D12:3 仍引用 D11-47C，属决策源本身的待修订点，不拿它压过 C1/C2。(D；R) |

D13 当前正文没有明确要求秘书回写 PM D2–D8 或 soroi `design/*.md`；本附件没有自行把 D13 的实现动作转换为新的文档回写目标。D14-02/03 只指定安装器/调用入口/开发说明及切换实现；A3 对 PM/设计的明确目标来自 D14-01，不把所有消费者再增设为新文档动作。(D：D13:44–58；D14:28–42)

## 迁仓执行与回写定位边界

1. **A2-02：** [A2-02 / soroi#345](https://github.com/Pepgent/soroi/issues/345) 由 W-06 按 [D53 / PM#72](https://github.com/Pepgent/PM/issues/72) D53-03 v1 执行，目标仓为 Pepgent/soroi-store。
2. **A2-03：** [A2-03 / soroi#346](https://github.com/Pepgent/soroi/issues/346) 由 W-07 按 D53-04 v2 执行，目标仓为 Pepgent/omp-soroi；[soroi 切换 / #347](https://github.com/Pepgent/soroi/issues/347)按 D53-05 v3 依赖对应导入与[仓 B 测试接线导出 / #348](https://github.com/Pepgent/soroi/issues/348)。U121 已明确 org 归属，两仓按 D53-01 v2 留存，不再等待用户选择或条件重建。
3. **BLOCKED-C（A3-38）：** D11-WB2 的 `design/store.md`“提醒记录”目标缺精确落点，当前全文无该段。源条目与目标文件均已取得；缺的是领导层确定的回写位置，不是联网/凭据故障。不自行新增章节。(D：D11B:16；当前 design/store.md 全文)

**读取失败/不可取得的 issue 正文：0。** 七仓 list 与点名 #182 view 均返回结果；未访问禁触 checkout、git 历史、issue 编辑历史、session，未执行实现、测试、hash 验证、issue 写入、评论、提交或 push。唯一写入是本附件。(R：上述命令返回；本次操作范围)

## 条数

- **A1：46 个当前 OPEN D8 映射 issue**：soroi 24、Pepgent 20、deploy 1、images 1、lab-library/remote/omp-rpc-mux 各 0。其中 45 个有开工锁/其 STARTED 执行要求，1 个（soroi#182）就这两类门禁无需改写；images#3 另有开发期 live 子 issue 指向。表内逐字开工锁/STARTED 引文共 174 行，不把功能验收或本仓检查算删除项。另附 **4 个点名 live issue 状态**，#182 与 A1 重叠，不重复计数。(R；D：D8 映射)
- **A2：4 条所列 issue 操作要求**：remote 新建 1、A2-02/A2-03 迁仓执行 2、D10-07 的 PM D11 决策新建要求 1。A2-02/A2-03 的真实父子边按 D53 挂入总 issue；其余原始盘点不表示现在应重开、新建已有 D11 或扩大挂接范围。
- **A3：43 条限定目标回写/一致性核对项**，按“目标文档/定位/来源”归组，非去重文件数；范围外明确动作另附 5 行，不计入 A3。不是 43 个新 issue。(D)
- **迁仓执行边界：** A2-02/A2-03 按 D53 执行，不再保留两项目标仓授权阻塞；其余历史取证范围与定位记录不因本次迁仓回写重做。历史盘点的数据读取失败为 0，不代表本次迁仓或回写已经完成。
