install-check-complete

Read-only installation check of `/tmp/soroi-a0/work` (no files edited, no `soroi_eval` called):

- **Layout**: `package.json` (`soroi-install-check-library`, `type: module`, dep `decimal.js: latest`), `bun.lock` (lockfileVersion 2, pins `decimal.js@10.6.0` with sha512), `node_modules/decimal.js`, `nodes/install_check_double.ts`, clean git tree at `1406d33 Initialize installation probe library`.
- **Node file**: `nodes/install_check_double.ts` imports `program` from `omp-soroi/node` and `Decimal` from `decimal.js`; body returns `new Decimal(input).mul(2).toNumber()`. Parses/builds (`bun build --no-bundle` OK).
- **Dependency**: installed `decimal.js` reports version `10.6.0`, matching the lockfile entry. Runtime smoke test passed: `0.1 + 0.2 = "0.3"` and `21 * 2 = 42`.
- **Observation, not a fault**: `omp-soroi/node` is not resolvable from the work dir (`ERR_MODULE_NOT_FOUND`, no `omp-soroi` install on disk; `omp` is the binary at `/usr/local/bin/omp`). Expected — the central host supplies that API to node calls at call time — but resolution could only be proven by an actual `soroi_eval` node call, which this read-only assignment forbids.

Verdict: installation is consistent and functional for the local library dependency; no result atoms produced or left unconsumed.