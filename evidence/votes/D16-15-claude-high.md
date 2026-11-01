# D16-15 选票：Claude 族独立空白历史 task:high（ClaudeHighD16b）

依据：U11、U82、C3-3、现行 D16-07。只对 D16-15 投票；D16-07、09、11、12 依 AGENTS.md:50 不重投。
被投正文：修订后的 `local://decisions/D16-15.md:28`。压力测试见 `local://decisions/D16-15-stress.md`。

| ID | 票 | 分类意见 | 反例 | 非阻断意见 |
| --- | --- | --- | --- | --- |
| D16-15 | **赞成** | 串联、技术项；“缺失部分：是（D10-10 过渡期接法）”成立 | 无。上一轮的两个反例都已由修订版消除：<br>• **反例 A（许可证闭包门禁）：** ② 固定 `version: "0.0.0"` 后，闭包覆盖校验已实测通过（`/tmp/d16-15-stress.30hJ/repro2/` 输出 `GATE PASSED`）；④ 把 `generate-third-party-notices.mjs:362-381` 的许可证检查改为对第一方包免检，并把该文件扩入 W-09 白名单。已核对构建链中的另一个脚本 `scripts/check-third-party-notices.mjs`：它只比对客户端 `THIRD_PARTY_LICENSES.txt` 的字节，不检查各包的许可证，不需要改。<br>• **反例 B（契约更新跟不上）：** 带固定 version 后，`npm update -w @pepgent/web pepgent-store` 能前进到新 commit（`/tmp/d16-15-stress.30hJ/c3/`）。③ 写明的跟进方式与实测一致 | 1. ④ 真正需要改的是通知生成器的逐包许可证循环。`third-party-closure.mjs` 在有 version 时已能通过覆盖校验，在其中加第一方标识只是为了与生成器保持口径一致，实现时不要让该包从闭包里消失，否则覆盖校验（`:99-109`）会重新拦截。<br>2. 第一方免检后，`npm run generate:third-party-notices` 需要重新生成 `apps/web/resources/licenses/npm/THIRD_PARTY_NOTICES.txt`（属于 W-09 白名单中随依赖变化的通知文件；D16-09 里写的 `THIRD_PARTY_NOTICES.md` 文件名不对，建议秘书回写时一并更正）。<br>3. 私有仓在容器里执行 `npm ci` 需要注入读取 soroi 的凭据（D16-05 已有此问题，不是本条新引入）。<br>4. zod 去重正常（4.6.7 满足 `^4.5.4`），将来主版本分叉时再考虑改为 peerDependency。<br>5. 修订版“放弃”栏已写明纯 Node 直接加载 node_modules 中 `.ts` 的需求留到阶段 C；阶段 C 首个触发点是 `test:node`（`tests/node/lab-runtime.test.ts:12`） |
