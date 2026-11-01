# D23 总协调席（Main）选票

| ID | 票 | 理由 |
|---|---|---|
| D23-01 | 赞成 | generation 由 Mux 签发：D3 §4 定义 `Generation = string`，Mux 实现签发 `Uuid::new_v4()`。store 只是副本的持有方，类型应以源头为准。(R) store `packages/store/src/contract.ts:87` 当前为 `generation: PositionSchema`（整数），用来解析 Mux 签发的 UUID 必然失败，所以这是 D6:141 与源头冲突，不是新功能。 |
| D23-02 | 赞成 | `packages/store/**` 只有 W-06 一个写方（D16-09）。W-07 按 string 实现，不需要等 store 合入（D16-13）。W-06 等有空位时以原会话名重新进场，当前在跑 3 席，有空位。 |

反例：无。
