# Argon 对“文件即版本”与 `Bun.build` bundle 哈希版本身份的裁决

## 结论

**无冲突。** `design/eval.md:76`（及 `design/store.md:30`）中“文件即版本：节点函数的版本是它所在文件的内容哈希”仅出自 **`(A)` assistant 方案**，没有用户 `(U)` 原话要求“只对单个源文件取哈希、排除依赖”；leader 的技术裁决（节点版本身份 = 节点入口经 `Bun.build` 打包后 bundle 的内容哈希，远程直接运行该 bundle）与用户原意**无冲突**，且直接落实了用户要求处理依赖与 `package.json`、保证按身份复用准确性的 `(U)` 意图。

---

## 证据核查

### 1. “所在文件的内容哈希”属于 `(A)` 来源（`【暂定】`），无 `(U)` 原文绑定单文件哈希

- **(D)** `design/eval.md:76`：“文件即版本。节点函数的版本是它所在文件的内容哈希。节点文件不依赖 eval 里的任何东西，所以能单独算哈希，也能原样发到另一台机器上运行。”（同见 `design/store.md:30`）
- **(A)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/8419a73e`（05:44:44）首次由 assistant 提出把模块源码当作 `File`、以内容身份作版本；同 session `#1183fdaa`（06:29:33）由 assistant 表述为“节点文件的内容哈希”；同 session `#f8fbf9da`（06:28:44）assistant 自己补充“节点文件要么自包含，要么版本覆盖它引用的所有本地文件”。
- **(A)** `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/1c355d2e`（05:55:26）在用户追问依赖后，assistant 已指出单源文件哈希会漏掉 helper/依赖变化，并提议对 bundle 取哈希。
- 因此，在 `pepgent-pm/evidence/argon/pivot-baseline.md:81` 与 `argon/rulings-C.md:209,246` 中，“节点文件哈希版本公式”与“依赖具体采用 `Bun.build` 打包”均已列为 **`【暂定】`**（归技术项）。

### 2. 用户 `(U)` 原话要求节点是普通 TS 文件、必须处理依赖与 `package.json`，并支持准确复用

- **(U) 节点定义载体是普通 TS 文件（而非 preset）：**
  - `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/50f5cf06`（06:29:27）：“本来就是节点文件啊”
  - `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/e7747df0`（06:30:24）：“只不过，节点文件不再是preset了，就是个普通ts文件，而这个ts文件等同于丢到eval跑”
- **(U) 远程执行必须处理依赖与 `package.json`：**
  - `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/8d913d2f`（05:54:31）：“实际上，我想了一下，这东西没这么简单，为什么，你看起来好像是构建命令，而实际上，你还得处理依赖，并把它还原成ts文件，在目标环境执行”
  - `session://01a18e8a-ba9d-76af-acd2-8e12765ec3e4/entry/f4c96767`（06:35:10）：“然后还有一点是，package.json怎么办”
- **(U) Store 解决后期复用：**
  - `session://01a18e1f-5cf2-7281-bf9a-03d102b315ba/entry/64246eaf`（05:07:53）：“如果store不是session log，而是能落盘的状态管理，则直接解决后期复用，值怎么存储，捕获，前端连dsl都不要了”

---

## 裁决与分类说明

1. **意图裁决（`【定】` 约束边界）：**
   - 节点函数在编写与节点库中保持为**独立的普通 TS 文件**（`01a18e8a #50f5cf06, #e7747df0`；`01a18e1f #47b71e05`）；
   - 执行与版本身份必须覆盖依赖（含 `package.json` 解析出的依赖与本地相对 import），不得忽略依赖直接拿裸单文件充当远程可执行物（`01a18e8a #8d913d2f, #f4c96767`）。
2. **对 leader 技术裁决的审查结论（无冲突，赞成）：**
   - 以节点 TS 文件为入口经 `Bun.build` 打包成单文件 bundle，并用该 **bundle 的内容哈希**作为节点函数版本身份、远程直接运行该 bundle，既保留了“节点写在独立普通 TS 文件里”的编写形态，又把相对 import 与 `package.json` 依赖纳入版本身份和远程交付物，与用户 `(U)` 原意完全一致，无冲突。
