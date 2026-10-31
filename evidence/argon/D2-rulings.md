# argon 对 D2-04、D2-25 的意图裁决

在 D2 全表投票前，应 leader 要求作出；前提是“soroi 是独立 omp 定制、不含 fork”（U24）。

## D2-04 store 的归属与进程形态

- **【定 · 领域与组件归属】** store 的值与记录权威属于 soroi，归 `Pepgent/soroi` 同仓同版本交付，不另开非 soroi 的外部组件仓。
  - (U) `session://01a18dd4-e638-75ad-a5f3-f0537daf3896/entry/2d861491`：“所谓的捕获和记录，本质上只是omp里所需要的自定义插件罢了”
  - (U) `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`：“通常来说，以omp的视角来看，store天生是session log，但是，如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了”
  - (U) LEDGER U23：“对于soroi的最小功能合集，一定是一个完整的omp定制，并且能走通我说的所有流程，并且能作为pepgent的agent核心”
  - 对比：用户把 remote 明确划出 soroi 单独开仓（LEDGER U1；`01a18e3a #3afc3fb6, #b45cd22c`），把中心化 omp RPC 多路复用器划入“独立的网络层”（`01a18e3a #09e1cc92`），从未把 store 划出 soroi。
- **【定 · 不违背 U1/U13/C-1】** store 以伴随服务进程运行，不违背“soroi 是 omp 扩展组件、不修改 omp 宿主代码”。U1、U13 与 `01a18f4a #f488be08` 禁止的是修改 omp 宿主核心代码，或在 harness 外另搭调度、解释器控制面（`01a18dd4 #6b25e5f7, #28767d47`）。只增不改、纯被动的 DuckLake 单写方伴随进程两者都不是。
- **【暂定 · 进程拓扑】** 单写方作为伴随常驻进程（而非塞进单个 omp 会话进程）承载远程 copy-in / copy-out 的 HTTP 端点与 GUI 读取，源自 (A) `01a18e1f #99c65d16`，经 (U) `#bfd6975c` 拍板写进文档；无冲突的 (U) 原话。归技术面，赞成。

## D2-25 Pepgent/soroi 的交付范围与 U23

- **【定 · 符合 U23】** `Pepgent/soroi` 作为完整定制的发行仓，内含 omp 插件（omp-soroi-eval、omp-soroi-subagent）、`agents/`、`skills/`、`rules/`、设置覆盖，连同同仓的 store 伴随服务，以及一键拉起 store 与 Mux 的 compose，满足 (U) LEDGER U23。
- **【定 · Mux 独立成仓】** `Pepgent/omp-rpc-mux` 独立成仓，在 compose 中作为外部伴随组件引入，符合 (U) `01a18e3a #09e1cc92`：“应该是在独立的网络层中，有中心化的omp rpc多路复用器”。

## 结论

leader 的修改方案（store 服务收回 `Pepgent/soroi` 同仓同版本交付，`Pepgent/omp-rpc-mux` 保持独立成仓）在意图上无异议。
