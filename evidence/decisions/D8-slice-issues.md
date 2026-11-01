# D8 切片 → 实现 issue

来源：[D8 决策](https://github.com/Pepgent/PM/issues/8)、[D8 §4 实现计划](https://github.com/Pepgent/PM/blob/main/evidence/decisions/D8-mvp-scope.md#4-实现计划)、[D16（PM#25）](https://github.com/Pepgent/PM/issues/25) D16-01/06/09/10。

109 个切片的实现 issue 映射；LAB-13 按 [D42](https://github.com/Pepgent/PM/issues/61)新增为 [Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80)。不据本表推断当前代码或运行状态。依赖链接与业务范围保留；开发期依赖为代码合入 main，跨组件义务由统一 E2E/A0/S1/S2 正文承接，不缩减。

归属按代码路径：ENV/D9 在 PM；soroi `e2e/**`（含 DIST-02/#224）归 W-08；`apps/web/tests/e2e-lab/**` 的 E2E-20/21 归 W-10（所测代码全部合入后编写，阶段 B 不执行）。其余席位完整路径按 D16-09。表中的 VS1/VS2/W1–W7 仅原切片标识，不再是波次、排期或 runtime 开工门禁；W-08/W-10 为 D16 的实际执行席。Project 列仅建单时记录，当前状态向 [Project #1](https://github.com/orgs/Pepgent/projects/1) 查询。

| Slice | Repo | Issue | 建单方式 | Tier | 执行席或原切片标识 | 建单时 Project Status |
| --- | --- | --- | --- | --- | --- | --- |
| ENV-01 | `Pepgent/PM` | [Pepgent/PM#9](https://github.com/Pepgent/PM/issues/9) | 新建 | low | VS1 | Todo |
| ENV-02 | `Pepgent/PM` | [Pepgent/PM#10](https://github.com/Pepgent/PM/issues/10) | 新建 | mid | VS1 | Todo |
| ENV-03 | `Pepgent/PM` | [Pepgent/PM#11](https://github.com/Pepgent/PM/issues/11) | 新建 | low | W4 | Todo |
| ENV-04 | `Pepgent/PM` | [Pepgent/PM#12](https://github.com/Pepgent/PM/issues/12) | 新建 | low | W5 | Todo |
| IMG-01 | `Pepgent/images` | [Pepgent/images#1](https://github.com/Pepgent/images/issues/1) | 复用已有 | low | VS1 | Done |
| IMG-02 | `Pepgent/images` | [Pepgent/images#4](https://github.com/Pepgent/images/issues/4) | 新建 | low | W4 | Todo |
| IMG-03 | `Pepgent/images` | [Pepgent/images#1](https://github.com/Pepgent/images/issues/1) | 复用已有 | low | W5 | Done |
| IMG-04 | `Pepgent/images` | [Pepgent/images#3](https://github.com/Pepgent/images/issues/3) | 新建 | low | VS2 | Todo |
| IMG-05 | `Pepgent/images` | [Pepgent/images#1](https://github.com/Pepgent/images/issues/1) | 复用已有 | low | VS1 | Done |
| MUX-01 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#1](https://github.com/Pepgent/omp-rpc-mux/issues/1) | 复用已有 | mid | VS1 | Done |
| MUX-02 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#1](https://github.com/Pepgent/omp-rpc-mux/issues/1) | 复用已有 | mid | VS1 | Done |
| MUX-03 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#3](https://github.com/Pepgent/omp-rpc-mux/issues/3) | 复用已有 | low | VS2 | In progress |
| MUX-04 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#5](https://github.com/Pepgent/omp-rpc-mux/issues/5) | 新建 | low | VS2 | Todo |
| MUX-05 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#4](https://github.com/Pepgent/omp-rpc-mux/issues/4) | 新建 | low | W2 | Todo |
| MUX-06 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#6](https://github.com/Pepgent/omp-rpc-mux/issues/6) | 新建 | mid | W3 | Todo |
| MUX-07 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#7](https://github.com/Pepgent/omp-rpc-mux/issues/7) | 新建 | low | W4 | Todo |
| MUX-08 | `Pepgent/omp-rpc-mux` | [Pepgent/omp-rpc-mux#1](https://github.com/Pepgent/omp-rpc-mux/issues/1) | 复用已有 | low | VS1 | Done |
| STO-01 | `Pepgent/soroi` | [Pepgent/soroi#180](https://github.com/Pepgent/soroi/issues/180) | 复用已有 | low | VS1 | Done |
| STO-02 | `Pepgent/soroi` | [Pepgent/soroi#180](https://github.com/Pepgent/soroi/issues/180) | 复用已有 | mid | VS1 | Done |
| STO-03 | `Pepgent/soroi` | [Pepgent/soroi#180](https://github.com/Pepgent/soroi/issues/180) | 复用已有 | mid | VS1 | Done |
| STO-04 | `Pepgent/soroi` | [Pepgent/soroi#188](https://github.com/Pepgent/soroi/issues/188) | 新建 | mid | W1 | Todo |
| STO-05 | `Pepgent/soroi` | [Pepgent/soroi#190](https://github.com/Pepgent/soroi/issues/190) | 新建 | low | VS2 | Todo |
| STO-06 | `Pepgent/soroi` | [Pepgent/soroi#189](https://github.com/Pepgent/soroi/issues/189) | 新建 | low | W1 | Todo |
| STO-07 | `Pepgent/soroi` | [Pepgent/soroi#194](https://github.com/Pepgent/soroi/issues/194) | 新建 | mid | W1 | Todo |
| STO-08 | `Pepgent/soroi` | [Pepgent/soroi#191](https://github.com/Pepgent/soroi/issues/191) | 新建 | low | W1 | Todo |
| STO-09 | `Pepgent/soroi` | [Pepgent/soroi#192](https://github.com/Pepgent/soroi/issues/192) | 新建 | mid | W3 | Todo |
| STO-10 | `Pepgent/soroi` | [Pepgent/soroi#200](https://github.com/Pepgent/soroi/issues/200) | 新建 | low | W4 | Todo |
| STO-11 | `Pepgent/soroi` | [Pepgent/soroi#202](https://github.com/Pepgent/soroi/issues/202) | 新建 | low | W1 | Todo |
| STO-12 | `Pepgent/soroi` | [Pepgent/soroi#203](https://github.com/Pepgent/soroi/issues/203) | 新建 | low | VS1 | Todo |
| SOR-01 | `Pepgent/soroi` | [Pepgent/soroi#178](https://github.com/Pepgent/soroi/issues/178) | 复用已有 | low | VS1 | Done |
| SOR-02 | `Pepgent/soroi` | [Pepgent/soroi#193](https://github.com/Pepgent/soroi/issues/193) | 新建 | mid | VS1 | Todo |
| SOR-03 | `Pepgent/soroi` | [Pepgent/soroi#201](https://github.com/Pepgent/soroi/issues/201) | 新建 | mid | VS1 | Todo |
| SOR-04 | `Pepgent/soroi` | [Pepgent/soroi#185](https://github.com/Pepgent/soroi/issues/185) | 复用已有 | low | W1 | Todo |
| SOR-05 | `Pepgent/soroi` | [Pepgent/soroi#195](https://github.com/Pepgent/soroi/issues/195) | 新建 | mid | W1 | Todo |
| SOR-06 | `Pepgent/soroi` | [Pepgent/soroi#212](https://github.com/Pepgent/soroi/issues/212) | 新建 | mid | W1 | Todo |
| SOR-07 | `Pepgent/soroi` | [Pepgent/soroi#215](https://github.com/Pepgent/soroi/issues/215) | 新建 | low | W4 | Todo |
| SOR-08 | `Pepgent/soroi` | [Pepgent/soroi#204](https://github.com/Pepgent/soroi/issues/204) | 新建 | low | W1 | Todo |
| SOR-09 | `Pepgent/soroi` | [Pepgent/soroi#196](https://github.com/Pepgent/soroi/issues/196) | 新建 | mid | W2 | Todo |
| SOR-10 | `Pepgent/soroi` | [Pepgent/soroi#197](https://github.com/Pepgent/soroi/issues/197) | 新建 | low | W2 | Todo |
| SOR-11 | `Pepgent/soroi` | [Pepgent/soroi#205](https://github.com/Pepgent/soroi/issues/205) | 新建 | mid | W2 | Todo |
| SOR-12 | `Pepgent/soroi` | [Pepgent/soroi#211](https://github.com/Pepgent/soroi/issues/211) | 新建 | mid | W2 | Todo |
| SOR-13 | `Pepgent/soroi` | [Pepgent/soroi#209](https://github.com/Pepgent/soroi/issues/209) | 新建 | mid | W3 | Todo |
| SOR-14 | `Pepgent/soroi` | [Pepgent/soroi#216](https://github.com/Pepgent/soroi/issues/216) | 新建 | low | W3 | Todo |
| SOR-15 | `Pepgent/soroi` | [Pepgent/soroi#217](https://github.com/Pepgent/soroi/issues/217) | 新建 | mid | W3 | Todo |
| SOR-16 | `Pepgent/soroi` | [Pepgent/soroi#207](https://github.com/Pepgent/soroi/issues/207) | 新建 | low | W2 | Todo |
| SOR-17a | `Pepgent/soroi` | [Pepgent/soroi#214](https://github.com/Pepgent/soroi/issues/214) | 新建 | mid | W4 | Todo |
| SOR-17b | `Pepgent/soroi` | [Pepgent/soroi#223](https://github.com/Pepgent/soroi/issues/223) | 新建 | low | W4 | Todo |
| SOR-18 | `Pepgent/soroi` | [Pepgent/soroi#222](https://github.com/Pepgent/soroi/issues/222) | 新建 | mid | W4 | Todo |
| SOR-19 | `Pepgent/soroi` | [Pepgent/soroi#229](https://github.com/Pepgent/soroi/issues/229) | 新建 | low | W4 | Todo |
| SOR-20 | `Pepgent/soroi` | [Pepgent/soroi#228](https://github.com/Pepgent/soroi/issues/228) | 新建 | low | W4 | Todo |
| CUS-01 | `Pepgent/soroi` | [Pepgent/soroi#183](https://github.com/Pepgent/soroi/issues/183) | 复用已有 | high | W1 | Todo |
| CUS-02 | `Pepgent/soroi` | [Pepgent/soroi#198](https://github.com/Pepgent/soroi/issues/198) | 新建 | high | W1 | Todo |
| CUS-03 | `Pepgent/soroi` | [Pepgent/soroi#206](https://github.com/Pepgent/soroi/issues/206) | 新建 | high | W1 | Todo |
| CUS-04 | `Pepgent/soroi` | [Pepgent/soroi#186](https://github.com/Pepgent/soroi/issues/186) | 复用已有 | low | W1 | Todo |
| DIST-01 | `Pepgent/soroi` | [Pepgent/soroi#199](https://github.com/Pepgent/soroi/issues/199) | 新建 | mid | VS1 | Todo |
| DIST-02 | `Pepgent/soroi` | [Pepgent/soroi#224](https://github.com/Pepgent/soroi/issues/224) | 新建 | low | **W-08**（e2e/install-check/**；不随仓B迁移） | Todo |
| DIST-03 | `Pepgent/soroi` | [Pepgent/soroi#210](https://github.com/Pepgent/soroi/issues/210) | 新建 | low | VS1 | Todo |
| DIST-04 | `Pepgent/soroi` | [Pepgent/soroi#225](https://github.com/Pepgent/soroi/issues/225) | 新建 | low | W4 | Todo |
| REM-01 | `Pepgent/remote` | [Pepgent/remote#1](https://github.com/Pepgent/remote/issues/1) | 复用已有 | mid | W5 | Todo |
| REM-02 | `Pepgent/remote` | [Pepgent/remote#1](https://github.com/Pepgent/remote/issues/1) | 复用已有 | low | W5 | Todo |
| REM-03 | `Pepgent/remote` | [Pepgent/remote#1](https://github.com/Pepgent/remote/issues/1) | 复用已有 | low | W5 | Todo |
| REM-04 | `Pepgent/remote` | [Pepgent/remote#6](https://github.com/Pepgent/remote/issues/6) | 新建 | low | W4 | Todo |
| REM-05 | `Pepgent/remote` | [Pepgent/remote#3](https://github.com/Pepgent/remote/issues/3) | 新建 | low | W4 | Todo |
| REM-07 | `Pepgent/remote` | [Pepgent/remote#4](https://github.com/Pepgent/remote/issues/4) | 新建 | low | W4 | Todo |
| REM-06 | `Pepgent/remote` | [Pepgent/remote#5](https://github.com/Pepgent/remote/issues/5) | 新建 | low | W6 | Todo |
| LIB-01 | `Pepgent/lab-library` | [Pepgent/lab-library#1](https://github.com/Pepgent/lab-library/issues/1) | 复用已有 | low | W1 | Done |
| LAB-01 | `Pepgent/Pepgent` | [Pepgent/Pepgent#8](https://github.com/Pepgent/Pepgent/issues/8) | 新建 | low | VS2 | Todo |
| LAB-02 | `Pepgent/Pepgent` | [Pepgent/Pepgent#10](https://github.com/Pepgent/Pepgent/issues/10) | 新建 | low | VS2 | Todo |
| LAB-03 | `Pepgent/Pepgent` | [Pepgent/Pepgent#12](https://github.com/Pepgent/Pepgent/issues/12) | 新建 | low | VS2 | Todo |
| LAB-04 | `Pepgent/Pepgent` | [Pepgent/Pepgent#13](https://github.com/Pepgent/Pepgent/issues/13) | 新建 | mid | VS2 | Todo |
| LAB-05 | `Pepgent/Pepgent` | [Pepgent/Pepgent#16](https://github.com/Pepgent/Pepgent/issues/16) | 新建 | low | W6 | Todo |
| LAB-06 | `Pepgent/Pepgent` | [Pepgent/Pepgent#14](https://github.com/Pepgent/Pepgent/issues/14) | 新建 | low | VS2 | Todo |
| LAB-07a | `Pepgent/Pepgent` | [Pepgent/Pepgent#17](https://github.com/Pepgent/Pepgent/issues/17) | 新建 | low | VS2 | Todo |
| LAB-07b | `Pepgent/Pepgent` | [Pepgent/Pepgent#20](https://github.com/Pepgent/Pepgent/issues/20) | 新建 | mid | W6 | Todo |
| LAB-08 | `Pepgent/Pepgent` | [Pepgent/Pepgent#24](https://github.com/Pepgent/Pepgent/issues/24) | 新建 | low | W6 | Todo |
| LAB-09 | `Pepgent/Pepgent` | [Pepgent/Pepgent#19](https://github.com/Pepgent/Pepgent/issues/19) | 新建 | low | W6 | Todo |
| LAB-10 | `Pepgent/Pepgent` | [Pepgent/Pepgent#15](https://github.com/Pepgent/Pepgent/issues/15) | 新建 | mid | W6 | Todo |
| LAB-11a | `Pepgent/Pepgent` | [Pepgent/Pepgent#22](https://github.com/Pepgent/Pepgent/issues/22) | 新建 | low | W6 | Todo |
| LAB-11b | `Pepgent/Pepgent` | [Pepgent/Pepgent#18](https://github.com/Pepgent/Pepgent/issues/18) | 新建 | low | W6 | Todo |
| LAB-12 | `Pepgent/Pepgent` | [Pepgent/Pepgent#11](https://github.com/Pepgent/Pepgent/issues/11) | 新建 | low | W6 | Todo |
| LAB-13 | `Pepgent/Pepgent` | [Pepgent/Pepgent#80](https://github.com/Pepgent/Pepgent/issues/80) | 按 D42 新建 | 未指定 | **W-09**；依赖 LAB-04、LAB-07a、LAB-10、LAB-12；解锁 F29、F31 | 取回时未登记 |
| WEB-01 | `Pepgent/Pepgent` | [Pepgent/Pepgent#9](https://github.com/Pepgent/Pepgent/issues/9) | 新建 | low | W6 | Todo |
| WEB-02 | `Pepgent/Pepgent` | [Pepgent/Pepgent#21](https://github.com/Pepgent/Pepgent/issues/21) | 新建 | mid | W6 | Todo |
| WEB-03 | `Pepgent/Pepgent` | [Pepgent/Pepgent#26](https://github.com/Pepgent/Pepgent/issues/26) | 新建 | mid | W6 | Todo |
| WEB-04 | `Pepgent/Pepgent` | [Pepgent/Pepgent#27](https://github.com/Pepgent/Pepgent/issues/27) | 新建 | low | W6 | Todo |
| WEB-05 | `Pepgent/Pepgent` | [Pepgent/Pepgent#25](https://github.com/Pepgent/Pepgent/issues/25) | 新建 | low | W6 | Todo |
| WEB-06 | `Pepgent/Pepgent` | [Pepgent/Pepgent#28](https://github.com/Pepgent/Pepgent/issues/28) | 新建 | low | W6 | Todo |
| WEB-07 | `Pepgent/Pepgent` | [Pepgent/Pepgent#29](https://github.com/Pepgent/Pepgent/issues/29) | 新建 | mid | W6 | Todo |
| DEP-01 | `Pepgent/deploy` | [Pepgent/deploy#2](https://github.com/Pepgent/deploy/issues/2) | 新建 | low | VS2 | Todo |
| DEP-02 | `Pepgent/deploy` | [Pepgent/deploy#3](https://github.com/Pepgent/deploy/issues/3) | 新建 | low | W4 | Todo |
| DEP-03 | `Pepgent/deploy` | [Pepgent/deploy#1](https://github.com/Pepgent/deploy/issues/1) | 新建 | low | VS2 | Todo |
| E2E-01 | `Pepgent/soroi` | [Pepgent/soroi#181](https://github.com/Pepgent/soroi/issues/181) | 复用已有 | mid | VS1 | Done |
| E2E-02 | `Pepgent/soroi` | [Pepgent/soroi#218](https://github.com/Pepgent/soroi/issues/218) | 新建 | low | W1 | Todo |
| E2E-10 | `Pepgent/soroi` | [Pepgent/soroi#182](https://github.com/Pepgent/soroi/issues/182) | 复用已有 | low | VS1 | Todo |
| E2E-11a | `Pepgent/soroi` | [Pepgent/soroi#213](https://github.com/Pepgent/soroi/issues/213) | 新建 | low | W1 | Todo |
| E2E-11b | `Pepgent/soroi` | [Pepgent/soroi#219](https://github.com/Pepgent/soroi/issues/219) | 新建 | low | W2 | Todo |
| E2E-12 | `Pepgent/soroi` | [Pepgent/soroi#220](https://github.com/Pepgent/soroi/issues/220) | 新建 | low | W1 | Todo |
| E2E-13 | `Pepgent/soroi` | [Pepgent/soroi#221](https://github.com/Pepgent/soroi/issues/221) | 新建 | low | W2 | Todo |
| E2E-14 | `Pepgent/soroi` | [Pepgent/soroi#226](https://github.com/Pepgent/soroi/issues/226) | 新建 | low | W2 | Todo |
| E2E-15 | `Pepgent/soroi` | [Pepgent/soroi#227](https://github.com/Pepgent/soroi/issues/227) | 新建 | low | W3 | Todo |
| E2E-16 | `Pepgent/soroi` | [Pepgent/soroi#231](https://github.com/Pepgent/soroi/issues/231) | 新建 | low | W4 | Todo |
| E2E-17 | `Pepgent/soroi` | [Pepgent/soroi#232](https://github.com/Pepgent/soroi/issues/232) | 新建 | low | W5 | Todo |
| E2E-18 | `Pepgent/soroi` | [Pepgent/soroi#233](https://github.com/Pepgent/soroi/issues/233) | 新建 | low | W4 | Todo |
| E2E-19 | `Pepgent/soroi` | [Pepgent/soroi#208](https://github.com/Pepgent/soroi/issues/208) | 新建 | low | W3 | Todo |
| E2E-20 | `Pepgent/Pepgent` | [Pepgent/Pepgent#30](https://github.com/Pepgent/Pepgent/issues/30) | 新建 | low | **W-10**（apps/web/tests/e2e-lab/**） | Todo |
| E2E-21 | `Pepgent/Pepgent` | [Pepgent/Pepgent#23](https://github.com/Pepgent/Pepgent/issues/23) | 新建 | low | **W-10**（apps/web/tests/e2e-lab/**） | Todo |
| D9-01 | `Pepgent/PM` | [Pepgent/PM#13](https://github.com/Pepgent/PM/issues/13) | 新建 | free | W7 | Todo |
| D9-02 | `Pepgent/PM` | [Pepgent/PM#14](https://github.com/Pepgent/PM/issues/14) | 新建 | low | W7 | Todo |
| D9-03 | `Pepgent/PM` | [Pepgent/PM#15](https://github.com/Pepgent/PM/issues/15) | 新建 | high | W7 | Todo |

## 执行状态约定

工程师、测试者、操作员只在各自实现 issue/PR 评论中写 STARTED / PR / BLOCKED / DONE 并附事实。开发期开工条件是依赖切片代码已合入其仓 main，不再要求上游跨组件 runtime；本仓真实入口检查保留。E2E spec/runbook 在其所测全部代码合入后编写，统一阶段才执行；issue/Project/本映射不替代运行结论。
