# 阶段 B 滚动发车与退役记录

本记录供 ArgonGovernance 事后检查，由秘书归档到 PM 的 `evidence/exec/phaseB/`。

## 退役

| 席位 | 退役依据（源头） | 命令 |
| --- | --- | --- |
| W-06 pepgent-store | `gh issue view`：soroi#282、#190、#203 已 CLOSED（PR #286、#287） | `tern kill session pepgent-store` |
| W-01 pepgent-mux | `gh issue list -R Pepgent/omp-rpc-mux --state open` 返回 0（PR #16、#18 已合入） | `tern kill session pepgent-mux` |
| W-05 pepgent-library | `gh issue list -R Pepgent/lab-library --state open` 返回 0（lab-library#14 合入，关闭 #5、#13） | `tern kill session pepgent-library` |
| W-02 pepgent-remote | `gh issue list -R Pepgent/remote --state open` 返回 0（remote#17 已合入） | `tern kill session pepgent-remote` |
| W-03 pepgent-images | `gh issue list -R Pepgent/images --state open` 返回 0（images#12 合入，关闭 #6 与 #3） | `tern kill session pepgent-images` |

## 发车

所有席位都按 D16-00、D16-09 的参数启动：Opus 5.5 high，带 omp-peers 和 `--session-dir`。home 用 `-b` 建成命名分支。

| 席位 | tern id | peer | home（基点） | 首个切片 |
| --- | --- | --- | --- | --- |
| W-04 pepgent-deploy | 663671231479811 | 01a19756-6aae | pepgent-deploy-home（deploy e4f16cc） | deploy#16（A2-07），然后 #8（在新路径 pepgent-deploy-issue8 上接续 56eaff7）、#1 |
| W-08 pepgent-e2e | 663739950956547 | 01a19758-9781 | pepgent-e2e-home（soroi 8a764ea） | soroi#285（A2-08），接着 DIST-02 #224（接续 PR260 的 e2e 部分）、A0 #235（接续 PR266）、已合入组件的 E2E spec |
| W-09 pepgent-lab | 663117180698627 | 01a19743-a0be | pepgent-lab-home，独立克隆 pepgent-backend-clone（d4a91fe） | Pepgent#43 |
| W-07 pepgent-plugin | 663228849848323 | 01a19747-23fa | pepgent-plugin-home（soroi 5a1089f） | soroi#283 |
| W-03 pepgent-images | 663263209586691 | 01a19748-1206 | pepgent-images-home（images f66e655） | images#6（issue-6-lab-web-live，d40585f），接着做 #3 |

## LEDGER 核对

| 条款 | 核对结果 |
| --- | --- |
| C1-2 | 每个域一个席位；Pepgent 使用独立克隆 |
| C1-3 | 同域切片可以合进同一个 PR；只做本仓检查；W-08 按被测代码已合入的时点编写 spec，阶段 B 不执行跨组件测试 |
| C3-4 | 切片 worktree 用 `-b` 建；不检出 main |
| D16-10 | 在跑席位：lab、plugin、deploy、e2e，共 4 个，已满额；store、mux、remote、library、images 已退役 |

## 待补入

- Pepgent#43 合入后，W-10 web 优先补入。
