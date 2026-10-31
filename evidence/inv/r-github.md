# Pepgent GitHub organization inventory

## Scope and intent

- The requested target is the GitHub organization `Pepgent`. The delegated scope was to run `gh auth status`, the exact repository listing, and the exact organization Project listing, then report repositories, Projects, cheaply listable Project fields, and whether the PM repository exists; issues and pull requests were explicitly out of scope. **(A)** Citation: `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/7b738d1a.2`.
- The relevant user intent was: **“对于需要排期实现，我推荐你使用一个agent作为秘书，pepgent专门存在pm仓库和对应的github project。”** **(U)** Citation: `session://01a193fd-e992-76d2-8c29-060fe52cc094/entry/8544bdb8`.
- All findings below are from the active GitHub CLI account's live command output. No issues, pull requests, repository contents, Project items, or Git history were read. **(R)** Citation: the four commands listed in this report.

## Authentication

Command run:

```text
gh auth status
```

Observed authentication state:

- `github.com` is authenticated with `RiriAgent`; it is the active account, uses HTTPS for Git operations, and has `project`, `repo`, `admin:org`, and related administrative/user scopes shown by the CLI. **(R)** Citation: command `gh auth status`.
- `dt-activenetwork` is also configured on `github.com`, but is inactive; its displayed scopes are `gist`, `read:org`, `repo`, and `workflow`. **(R)** Citation: command `gh auth status`.
- `Mouriya-Emma` is also configured on `github.com`, but is inactive; its displayed scopes are `gist`, `read:org`, `repo`, and `workflow`. **(R)** Citation: command `gh auth status`.
- The CLI displayed masked token lines; token material is intentionally not reproduced here. **(R)** Citation: command `gh auth status`.

## Repositories

Command run exactly as requested:

```text
gh repo list Pepgent --limit 100 --json name,description,visibility,isArchived,updatedAt
```

The command returned **9 repositories**. Every returned repository had `isArchived: false`. **(R)** Citation: command `gh repo list Pepgent --limit 100 --json name,description,visibility,isArchived,updatedAt`.

| Name | Description | Visibility | Archived | Updated at (UTC) |
|---|---|---:|---:|---|
| `Pepgent` | *(empty)* | `PRIVATE` | `false` | `2026-10-31T21:31:10Z` |
| `soroi` | *(empty)* | `PRIVATE` | `false` | `2026-10-31T15:42:47Z` |
| `omp-soroi-subagent` | `omp plugin: soroi subagents as omp --mode rpc processes, lifecycle and IRC parity with built-in subagents` | `PRIVATE` | `false` | `2026-10-31T02:36:33Z` |
| `omp-soroi-eval` | `omp plugin: soroi eval tool, return tool and unconsumed-atom reminder` | `PRIVATE` | `false` | `2026-10-31T01:54:07Z` |
| `remote` | `Standalone remote runner: prebuilt templates on Komodo, Slurm and Kubernetes` | `PRIVATE` | `false` | `2026-10-30T23:39:32Z` |
| `oh-my-pi` | `⌥ Coding agent with the IDE wired in. Built by Stencil Labs.` | `PUBLIC` | `false` | `2026-10-30T23:12:51Z` |
| `iac` | `IaC for soroic Proxmox host, shared artifacts, and native NetBird VM/CT baselines` | `PRIVATE` | `false` | `2026-10-21T16:32:36Z` |
| `pepgent-doc` | *(empty)* | `PRIVATE` | `false` | `2026-09-19T08:26:44Z` |
| `PM` | *(empty)* | `PRIVATE` | `false` | `2026-09-11T08:00:42Z` |

The repository named `PM` is therefore present, private, and not archived in the organization metadata returned by the command. **(R)** Citation: command `gh repo list Pepgent --limit 100 --json name,description,visibility,isArchived,updatedAt`.

## GitHub Projects

Command run exactly as requested:

```text
gh project list --owner Pepgent
```

The command returned one visible Project:

| Number | Title | State | Project ID |
|---:|---|---|---|
| `1` | `PM` | `open` | `PVT_kwDOE4p_hs4BjKDX` |

**(R)** Citation: command `gh project list --owner Pepgent`.

### Project fields

Because the Project list contained Project `1`, its field definitions were listed with:

```text
gh project field-list 1 --owner Pepgent
```

Observed fields (the IDs below are the IDs printed by the CLI):

| Field name | GitHub field type | Field ID |
|---|---|---|
| `Title` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dPs` |
| `Assignees` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dPw` |
| `Status` | `ProjectV2SingleSelectField` | `PVTSSF_lADOE4p_hs4BjKDXzhh_dP0` |
| `Labels` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dP4` |
| `Linked pull requests` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQE` |
| `Milestone` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQI` |
| `Repository` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQQ` |
| `Reviewers` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQg` |
| `Parent issue` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQo` |
| `Sub-issues progress` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQ0` |
| `Created` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dQ8` |
| `Updated` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dRE` |
| `Closed` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_dRM` |
| `Team` | `ProjectV2SingleSelectField` | `PVTSSF_lADOE4p_hs4BjKDXzhh_oxA` |
| `Iteration` | `ProjectV2IterationField` | `PVTIF_lADOE4p_hs4BjKDXzhh_oxI` |
| `Quarter` | `ProjectV2IterationField` | `PVTIF_lADOE4p_hs4BjKDXzhh_oxU` |
| `Start date` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_oxc` |
| `Target date` | `ProjectV2Field` | `PVTF_lADOE4p_hs4BjKDXzhh_oxk` |

The field-list command returned **18 field definitions**. It listed field definitions only; no Project items were inspected. **(R)** Citation: command `gh project field-list 1 --owner Pepgent`.

## PM repository and Project determination

- A repository named `PM` exists under `Pepgent` (`PRIVATE`, not archived). **(R)** Citation: command `gh repo list Pepgent --limit 100 --json name,description,visibility,isArchived,updatedAt`.
- An open GitHub Project named `PM` exists under `Pepgent` (Project number `1`). **(R)** Citation: command `gh project list --owner Pepgent`.
- **Conclusion:** the requested dedicated PM repository and GitHub Project are both visibly present as `Pepgent/PM` metadata and Project `1` titled `PM`, matching the user's statement. This conclusion is limited to visible organization metadata; this inventory did not inspect repository contents, Project items, issues, pull requests, or workflow usage. **(R)** Citations: the three commands above.

## Scope boundary

- Read-only metadata commands executed: `gh auth status`, `gh repo list Pepgent --limit 100 --json name,description,visibility,isArchived,updatedAt`, `gh project list --owner Pepgent`, and `gh project field-list 1 --owner Pepgent`. **(R)** Citation: each command shown above.
- No GitHub issues or pull requests were read, as required. **(R)** Citation: command scope and absence of any issue/PR query.
- No Git history, repository files, Project items, or GitHub objects were read or changed. The report does not infer details that are not exposed by the listed metadata commands. **(R)** Citation: command scope.
