# D10 rewrite context-capture plan

## Decisive question
Can the supplied inventory issue set be captured from GitHub REST without losing paginated comments, timeline events, or issue hierarchy, and can the resulting comments expose current rewrite constraints?

## Approach
1. Derive the issue set from the six non-empty inventories (repository/number/title/URL) and treat each inventory row as the requested open-issue scope because the inventory schema contains no state field.
2. For each issue, save the full `/issues/{number}` REST response, every paginated `/comments` and `/timeline` page, and both `/parent` and `/sub_issues` responses when the API exposes them; record HTTP/API-unavailable outcomes rather than substituting inventory data.
3. Save the four requested example issues (`images#6`, `images#3`, `deploy#8`, `deploy#1`) with issue metadata/body and the same relationship/comment/timeline captures needed to understand examples; mark their example role explicitly.
4. Review captured comments for pending scope obligations, concurrent body-edit ownership, and code-versus-live separation. Report exact links and short quotes only; do not decide or apply design.

## Cheapest decisive observations
- Inventory URLs/numbers establish the exact 55 issue scope.
- REST endpoint status and saved JSON establish which fields/resources are available.
- Comment bodies and links establish current constraints and concurrent ownership.

## Out of scope
No issue edits, issue comments, PR checks/reviews, code changes, tests, design decisions, or hash verification.

## Assumptions (not yet observed)
- The inventory rows are the intended OPEN set; they carry no state field, so this is an inventory contract rather than an independently re-derived state query.
- GitHub CLI credentials and REST access are available through the existing local auth path.
- GitHub REST parent/sub-issue endpoints may return 404 where no hierarchy or endpoint support exists; those outcomes will be recorded as API-unavailable rather than treated as evidence of no relationship.
