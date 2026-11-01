# D8 leader 选票，第 4 轮（治理分身代表 leader 席）

| ID | 票 | 理由 |
| --- | --- | --- |
| D8-01 | 赞成 | F22 第二部分观察多 worker 批次屏障；F15 用 D6-07 正确路径；F02/F06/F11/F24/F31 对齐 D6、D7 最终文本 |
| D8-03 | 赞成 | A0 入网与注入顺序；release 导入按 D6 的 `PUT /releases/{version}` 一次事务 |
| D8-04 | 赞成 | 逐字对齐 D7-20 四条线 |
| D8-09 | 赞成 | leader 技术裁决：操作员在终端里起的 TUI 根 omp 自己就是写方，不经 Mux；它派出的 soroi subagent 仍由写方经 dial 走 Mux。这是 D3-08/D3-10 的补充条款：F20 的 Agent Hub kill 与 F21 的 `omp --resume` 是用户路径，只能在操作员 TUI 中发生 |
| D8-13 | 赞成 | VS1 由根 supervisor 显式 `POST /runs/{run}/end`，对齐 D6-05 |
| D8-14 | 赞成 | 切片对齐 D2–D7 与 PM#4、PM#5 的实现期澄清；新增 REM-07 承载 EndedUnstarted |
| D8-16 | 赞成 | P5 只读部分进 MVP，控制部分进 D9，与 D7-12 一致 |
