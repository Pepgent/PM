# D10 rewrite issue-context capture report

Captured from GitHub REST with the existing `gh` authentication. Capture time is recorded in `capture-summary.json` and each `availability.json`. No issue, comment, repository, or code was modified. No hash was computed or used as evidence.

## Capture scope and counts

The supplied inventory rows have no `state` field. I therefore used the inventory rows as the requested OPEN scope and checked the REST `state` after capture.

| Inventory | Rows | REST-open rows |
|---|---:|---:|
| `soroi.json` | 28 | 28 |
| `Pepgent.json` | 21 | 21 |
| `deploy.json` | 1 | 1 |
| `images.json` | 1 | 1 |
| `PM.json` | 3 | 3 |
| `omp-rpc-mux.json` | 1 | 1 |
| **Total** | **55** | **55** |

The 55 inventory URLs are unique. There are **57 unique context directories** because the four requested examples add `images#6` and `deploy#8`; `images#3` and `deploy#1` overlap inventory rows.

Each context directory is `/tmp/d10-rewrite/context/<repo>-<number>/` and contains:

- `issue.json`: full REST `GET /repos/<owner>/<repo>/issues/<number>` response, including the REST body and metadata fields.
- `comments/page-001.json` (and any later pages if present): every page from the paginated REST comments endpoint.
- `timeline/page-001.json` (and any later pages if present): every page from the paginated REST timeline endpoint.
- `parent.json` or `parent.error.json`: REST parent lookup result.
- `sub_issues/page-001.json` (and any later pages if present): REST sub-issue listing pages.
- `availability.json`: endpoint statuses, page/item counts, REST state, and API-unavailable records.

Aggregate capture totals:

- 57/57 issue metadata responses succeeded and contain a body field.
- 84 comments were captured from 22 contexts; all 57 comment endpoint calls returned HTTP 200. Every issue fit in page 1 (`per_page=100`).
- 369 timeline events were captured from 57 contexts; all 57 timeline endpoint calls returned HTTP 200. Every issue fit in page 1 (`per_page=100`).
- All 57 sub-issue endpoint calls returned HTTP 200 and fit in page 1. Only `images#3` had sub-issues: `images#5`, `images#6`, and `deploy#8`.
- Three parent relationships were available: `images#6 -> images#3`, `deploy#8 -> images#3`, and `omp-rpc-mux#13 -> PM#8`.

## Requested examples

`examples.json` indexes all four examples. Each has full REST metadata in `issue.json` and an exact body copy in `body.md`:

- [`images#6`](https://github.com/Pepgent/images/issues/6): `/tmp/d10-rewrite/context/images-6/`
- [`images#3`](https://github.com/Pepgent/images/issues/3): `/tmp/d10-rewrite/context/images-3/`
- [`deploy#8`](https://github.com/Pepgent/deploy/issues/8): `/tmp/d10-rewrite/context/deploy-8/`
- [`deploy#1`](https://github.com/Pepgent/deploy/issues/1): `/tmp/d10-rewrite/context/deploy-1/`

REST state for the examples was: `images#6=closed`, `images#3=open`, `deploy#8=closed`, `deploy#1=open`. The two closed examples were captured because they were explicitly requested.

## API-unavailable fields/resources

The REST issue metadata itself had no missing standard fields across the 57 responses; the union of returned keys is recorded by the capture and includes `body`, `parent_issue_url`, and `sub_issues_summary`.

The only endpoint-level unavailability was the parent lookup:

- `GET /repos/<owner>/<repo>/issues/<number>/parent` returned **404 `No parent issue found` for 54/57 contexts**. The raw failures are retained as each context's `parent.error.json`; this is an unavailable relationship endpoint result, not a substituted parent value.
- Parent lookup succeeded for the three relationships listed above.
- No issue metadata, comments, timeline, or sub-issue-list endpoint failed.
- `context/api-unavailable-summary.json` records the aggregate: 54 parent 404s and no other endpoint failure. The two closed example states are state observations, not API-unavailable fields.

## Comments reviewed for D10 rewrite constraints

`comments-all.jsonl` and `comments-all.md` are flattened views generated only from the captured REST comment pages. The following are current constraints visible in those comments. They are recorded as obligations/observations, not design decisions.

### 1. Pending scope obligations that must not be dropped

- **F01 remains a real live obligation, not a fixture/code substitute.** The current owner comment on [soroi#182](https://github.com/Pepgent/soroi/issues/182#issuecomment-6554754935) says: “本轮仅核对并补齐 E2E-10 的 spec/runbook/check 代码与本仓不依赖 live 组件的检查；不执行真实 S1，不把夹具结果当 F01 通过。…真实执行义务保留到统一 e2e 阶段。” The prior execution comment also retains the same-release full A0 prerequisite and the real central/mux/store evidence path: [soroi#182 comment](https://github.com/Pepgent/soroi/issues/182#issuecomment-6553667131).
- **F05 has the same two-phase obligation.** [soroi#219](https://github.com/Pepgent/soroi/issues/219#issuecomment-6554764899) states: “按 D10-05/06 … 交付 F05 spec/runbook 与不依赖 live 组件的本仓检查，真实 F05 留到统一阶段”，and explicitly says “不重写产品、不新增运行门禁.” A rewrite must retain the later real-store/graph/file-observation obligation.
- **The shared A0 remains a full live obligation, but the old PR260 gate is historical, not a new blocker.** The captured [soroi#235 comment](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553278368) records that `#235` and DIST-02 share one complete real A0, with tester write authority and verifier ownership separated. It says installer/prepare smoke and typecheck are not full A0; the real run must produce the non-empty Program `21→42` CallReport, named worker handback, five native evidence classes, cleanup/resource disappearance, and PM raw-archive evidence. Older captured comments about waiting on PR260 remain in the raw history, but the current D10-05/06 ruling supersedes that gate; do not carry PR260 as a current blocker. Preserve the full live obligations, and do not substitute source install, fake fallback, marker, or hash verification.
- **The images parent retains cross-component closure obligations.** The `images#6` example comment says its merged child evidence does not replace the parent’s authentication/installer/browser/tool obligations: [images#6 comment](https://github.com/Pepgent/images/issues/6#issuecomment-6554599994) says `images#3` “保持open，发行安装/浏览器/工具及部署会话统一e2e义务未提前宣称完成.” The parent’s own scope and full-close statement are in [images#3](https://github.com/Pepgent/images/issues/3).
- **D10-14 release-init has a required deferred integration step.** The current D10 comment on [deploy#1](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554714166) says development release-init may merge into `deploy` main without entering the active Stack, but unified e2e must later connect it only after `/releases` and a complete boot-bearing artifact exist, with Web starting only after init. The comment explicitly says the local implementation is not a claim that real-store import or Web ordering has been verified.
- **The D10-11/12 obligations are now governed by the approved ruling, not old single-owner comments.** [Pepgent#15](https://github.com/Pepgent/Pepgent/issues/15#issuecomment-6554714168) says the D10 ruling is the current validity source. It keeps `draftReferences(fnName)` with LAB-11b, keeps role/criteria as D9 input, keeps the AST export/stage/apply contract, and adds the Better Auth `editLibrary` write permission boundary. The comment also states that the ruling does not imply code completion, PR review, merge, or runtime success.
- **STO-05’s public SSE/persistence contract is not silently settled by D10-13.** [soroi#190](https://github.com/Pepgent/soroi/issues/190#issuecomment-6554749773) records a BLOCKED state for LR-47 (lifecycle cursor persistence, old-schema migration order, and public wire schemas), and says D10-13 only resolves releases, not LR-47. That pending contract review is distinct from the release-init decision.

### 2. Body edits and ownership/concurrency signals

REST does not expose an edit lock. The captured comments do show issue-body edits or pending body corrections that should be reconciled before any rewrite replaces current prose:

- On [soroi#235](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553278368), author `RiriAgent` explicitly wrote: “已直接替换 body 的过时依赖与 setup 指导”. The same comment restates the shared-A0 scope, the tester’s `e2e/pty/*` write authority, and the rule that the issue/PR remain open until the full live result. This is evidence that the body has already been actively maintained, not a reason to discard its current obligations.
- On [deploy#8](https://github.com/Pepgent/deploy/issues/8#issuecomment-6554589839), author `RiriAgent` recorded owner `pepgent-eng-ops` and wrote: “已请求修正真实 issue 图与正文，跨组件义务不由本仓检查冒充完成.” The parent relation was also being corrected in that comment. Treat this as a pending body/relationship reconciliation signal when using the example; do not infer that a child’s local result removed the parent’s live scope.

No REST field or captured comment establishes an exclusive current edit lock. The safe fact is that these body-maintenance activities were recorded and their owner/remaining-obligation statements must remain visible to the rewrite owner.

### 3. Special code-versus-live separation

The comments consistently separate development-stage code/local checks from the later unified live phase:

- [soroi#182](https://github.com/Pepgent/soroi/issues/182#issuecomment-6554754935): “不执行真实 S1，不把夹具结果当 F01 通过.”
- [soroi#219](https://github.com/Pepgent/soroi/issues/219#issuecomment-6554764899): “真实 F05 留到统一阶段” and “不重写产品、不新增运行门禁.”
- [soroi#190](https://github.com/Pepgent/soroi/issues/190#issuecomment-6554745940): “开发期只做本仓检查，不把跨组件 live 证据作为开工门禁；完整 F01–F32 仍由统一组装阶段负责.”
- [soroi#196](https://github.com/Pepgent/soroi/issues/196#issuecomment-6554746976): “按已通过 D10-05，本仓检查不以跨组件 runtime 为开发门禁，不运行 compose 或 F01–F32.”
- [images#6](https://github.com/Pepgent/images/issues/6#issuecomment-6554521128): the child records a local-only check boundary and says not to close the issue or parent with local packaging/seed output before the ruling; its later DONE comment still leaves the parent’s unified installer/browser/tool/session obligations open ([comment](https://github.com/Pepgent/images/issues/6#issuecomment-6554599994)).
- [deploy#1](https://github.com/Pepgent/deploy/issues/1#issuecomment-6554681051): the protocol-stub result proves only the client path; it must not be presented as real S2 store import, and the release-init must not be connected to the active Stack before unified e2e.
- The shared-A0 comment on [soroi#235](https://github.com/Pepgent/soroi/issues/235#issuecomment-6553278368) is the important special case: it says the two owners share one **real** A0 and “不再切出一个 code-side/live split.” That means code-side checks may not be promoted to live pass, but the shared live campaign also must not be split into a fake code-only substitute.

These observations preserve the current two-phase boundary without choosing how the rewrite should be phrased.

## Files for the parent rewrite work

- `/tmp/d10-rewrite/context/capture-summary.json`: machine-readable counts and per-context result summary.
- `/tmp/d10-rewrite/context/api-unavailable-summary.json`: aggregate unavailable endpoint records.
- `/tmp/d10-rewrite/context/hierarchy-summary.json`: parent/sub-issue availability summary.
- `/tmp/d10-rewrite/context/examples.json`: requested example index.
- `/tmp/d10-rewrite/context/comments-all.jsonl` and `comments-all.md`: captured comment review views.
- `/tmp/d10-rewrite/context/<repo>-<number>/`: raw REST artifacts for every inventory issue and requested example.
- `/tmp/d10-rewrite/capture_contexts.py`: read-only collector used for this capture.
