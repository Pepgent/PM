# Pepgent PM

This is Pepgent's project-management repository. Major decisions and votes are managed in GitHub issues labeled `decision`; scheduling is tracked in GitHub Project #1.

Decision agendas, ballots, tallies, issue/Project updates and archiving are run by the council daemon in `tools/council/` (usage: [`tools/council/README.md`](tools/council/README.md)); its database is the source of truth until an agenda is archived here.

`evidence/` stores the reports supporting those decisions:

- `inv/` — investigation reports
- `argon/` — Argon’s intent baseline and rulings
- `decisions/` — final decision texts, archived by the council daemon
- `votes/` — ballots, archived by the council daemon
- `council/` — council daemon design, feasibility and end-to-end evidence, and the reviews it answered

Evidence markers: `(U)` user quotation, `(A)` agent statement, `(D)` document, `(R)` runtime output.
