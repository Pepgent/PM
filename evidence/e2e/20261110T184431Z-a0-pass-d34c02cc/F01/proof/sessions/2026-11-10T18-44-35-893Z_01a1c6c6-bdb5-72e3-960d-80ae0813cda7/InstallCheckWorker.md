install-check-complete

Read-only inspection of `/tmp/soroi-a0/work` (no edits, no soroi_eval):
- `nodes/install_check_double.ts` exists: `program(async (input: number) => new Decimal(input).mul(2).toNumber())`, importing `program` from `omp-soroi/node` and `Decimal` from `decimal.js`.
- `package.json`: private ESM package `soroi-install-check-library` with dependency `decimal.js`.
- `bun.lock` present; `node_modules/` contains only `decimal.js` (i.e. `omp-soroi` is supplied by the runtime, not installed locally).
- Repo has an initialized `.git` and no other source files.