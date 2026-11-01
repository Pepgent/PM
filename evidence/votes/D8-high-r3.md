# D8 soroi MVP 验收定义与实现计划 · task:high 第 3 轮选票

投票者：task:high（Governance2_880f.D8High），Claude 族的独立票。
对象：修订后的 `pepgent-pm/evidence/decisions/D8-mvp-scope.md` 中需要重投的 D8-03、D8-06、D8-07、D8-09。修订与反例的对照见 `D8-r1-responses.md` 的“第 2 轮”。

核对方法：读了这四行修订后的全文，以及与它们联动的矩阵行和切片：
- 矩阵 F03（D8:122）；
- 切片 ENV-02（D8:234）、E2E-02（D8:373）、DIST-02（D8:313）。

逐项与第 2 轮选票（`D8-high-r2.md`）的反例和改投条件比对。

## 逐行投票

| ID | 票 | 理由 | 反例/修改 |
| --- | --- | --- | --- |
| D8-03 | 赞成 | 第 2 轮的反例已按改投条件修订：A0 容器加入 `pepgent-soroi-e2e` 网络，顺序固定为 (a) 检查 HOME 为空 → (b) 注入与 `central` 相同的 env、`models.yml` 和自己的 client token → (c) 运行 installer → (d) 探针（D8:74）。<br>• A0 探针中要模型跑一轮的 ①②④ 项，现在有凭据可用；<br>• W2 之后 `soroi_task` 要经 dial 连 Mux，现在也连得上；<br>• (a) 排在注入之前，证明“不依赖本机 omomp”的干净 HOME 检查仍然成立。<br>E2E-02 的验收写明“(a) 在注入之前通过”，并依赖 ENV-02（D8:373），这个顺序有切片负责落地。 | — |
| D8-06 | 赞成 | 消费方加上了 A0 用的临时 IMG-01 容器，由 A0 脚本注入 env（D8:77）。ENV-02 的 `--clients` 文件里另为它准备一个 token（D8:234）。仍然是一个消费方一个 token，provider 凭据只留在本机 broker，与《凭据规则》和 D4-10 一致。 | — |
| D8-07 | 赞成 | `slow_step` 的标记改写到 `central` 容器里的绝对路径 `/var/tmp/soroi-e2e/markers/<label>`，与 runner 的 cwd 无关（D8:78）。F03 现在：<br>• ① 在同一个目录里判定 9 个违规段的标记都不存在；<br>• ② 加了阳性对照：合法那一步两条 `slow_step` 的标记都存在（D8:122）。<br>标记的写入位置和判定位置一致，探针是否有效也由阳性对照证明。即使实现先执行再检查，F03 ① 也会失败，第 2 轮的反例已消除。<br>`label_<段号>` 作为根 atom 传入，没有违反“禁止魔法值”。 | — |
| D8-09 | 赞成 | where 写明：A0 容器加入 `pepgent-soroi-e2e` 网络，先检查 HOME 为空，再注入 env 与凭据（D8:80）。这与 D8-03、E2E-02 一致。F20、F21 仍在 `central` 里运行；PTY 的用途包括 F20 的 `proc://<id>/kill` | — |

## 计票

本轮赞成 4，反对 0。

加上前两轮已经定下的票，task:high 对 D8-01 至 D8-16 全部赞成：
- D8-02、D8-04、D8-05、D8-10、D8-11、D8-12、D8-15、D8-16 在第 1 轮赞成；
- D8-01、D8-08、D8-13、D8-14 在第 2 轮赞成；
- D8-03、D8-06、D8-07、D8-09 在本轮赞成。
