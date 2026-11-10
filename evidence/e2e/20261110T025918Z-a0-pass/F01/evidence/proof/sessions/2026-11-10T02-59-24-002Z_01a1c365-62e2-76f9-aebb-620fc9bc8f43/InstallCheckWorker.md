install-check-complete

**Verdict: installation is functional.** No files edited (work tree still clean), no `soroi_eval` calls made. No result atoms produced — this was a read-only probe.

## Workspace `/tmp/soroi-a0/work`
- `package.json`: `soroi-install-check-library`, `"type": "module"`, dep `decimal.js: latest`.
- `bun.lock`: lockfileVersion 2 → `decimal.js@10.6.0` (sha512 `YpgQiITW…`).
- `node_modules/decimal.js@10.6.0` present; version matches the lockfile exactly.
- `nodes/install_check_double.ts`: imports `program` from `omp-soroi/node` + `decimal.js`, returns `input * 2`.
- `.gitignore` = `node_modules/`; `git status --porcelain` empty at commit `d4b5848`.

## Runtime
- `bun 1.4.4` at `/usr/local/bin/bun` — works.
- `node` binary **absent** (bun-only host). Not a defect: the soroi runner and node bundles target bun (`target: "bun"`).

## Dependency smoke test
- `new Decimal(21).mul(2)` → `42` via bun. decimal.js loads and computes correctly.

## `omp-soroi` plugin
- Installed at `/home/agent/.omp/plugins/node_modules/omp-soroi` (v0.1.0); `exports` contains `"./node": "./src/eval/node.ts"`; importing it yields `typeof program === "function"`.
- A bare `bun build` / dynamic import of `omp-soroi/node` **from the work dir fails** ("Cannot find module") — this is *by design*, not a broken install: `node-builder.ts` aliases the specifier through a Bun `onResolve` plugin to `NODE_API`, and `check.ts` maps it via tsconfig `paths`.
- Reproducing the harness's exact bundle config (`packages: "bundle"` + the `soroi-node-api` onResolve/onLoad plugin) on `nodes/install_check_double.ts` **succeeds**: 61,629-byte ESM bundle, containing both the soroi node API and the bundled decimal.js. Probe output dir removed afterwards.

## Notes
- Nothing requires `bun install`; node module resolution only needs to run inside the harness bundler.
- Scratch probe wrote only to `/tmp/soroi-install-probe-out` (deleted); the repository was never modified.