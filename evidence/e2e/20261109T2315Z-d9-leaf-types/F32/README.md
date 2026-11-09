# F32 / D9-01 — `LabSnapshot` leaf-type inventory

Reproduce (`<pepgent>` = a checkout of `Pepgent/Pepgent` at the commit recorded in
`leaf-types.md`):

```sh
cd evidence/e2e/20261109T2315Z-d9-leaf-types/F32/source
npm install
node leaf-types.mjs --pepgent <pepgent> --out-md ../leaf-types.md --out-json ../leaf-types.json
```

- `source/leaf-types.mjs` — TypeScript compiler API (`typescript/unstable/sync`)
  traversal of the 18 top-level fields of `LabSnapshot` (SNAP:24-58);
  emits one line per leaf field: `<leaf path>: <type>`.
- `leaf-types.md` — the generated inventory: coverage table over the 18 root
  fields plus every leaf grouped by root.
- `leaf-types.json` — machine-readable form (roots + leaves) for D9-02.
- `source/package.json` + `package-lock.json` — dependency of the script
  (`typescript`, the compiler API; matches the version Pepgent/Pepgent carries).

Observed run (2026-11-10): `Pepgent/Pepgent@93261b6376ecf10285892abd1b4d9d209d712113`, 18 top-level fields,
12,158 leaf lines; inventory is `leaf-types.md` in this directory.
