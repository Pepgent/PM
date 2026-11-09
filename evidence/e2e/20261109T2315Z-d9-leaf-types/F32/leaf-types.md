# D9-01 leaf-type inventory — `LabSnapshot` (SNAP:24-58)

- generated: 2026-11-09T23:49:57.590Z
- tool: `evidence/e2e/20261109T2315Z-d9-leaf-types/F32/source/leaf-types.mjs` (typescript 7.0.2, `typescript/unstable/sync`)
- source: `Pepgent/Pepgent@93261b6376ecf10285892abd1b4d9d209d712113` `apps/web/src/client/contracts/lab-snapshot.ts`
- top-level fields: 18
- leaf fields: 12158

Path notation: `.` property, `[]` array element, `[k]` index-signature value,
`[kind=x]` discriminated-union member, `*` the primitive members of a union that also
has object members.

Markers after a leaf type:
- `(optional)`: the property is declared with `?`, or its type union includes `undefined`.
- `(nullable)`: the value may be `null` (its type union includes `null`). The type text of a nullable leaf keeps `| null`.
- `(nullable parent)`: an ancestor's type union includes `null`, so this leaf is absent when that ancestor is null. It applies to every descendant of the nullable ancestor, not only its children.

## Coverage — 18 root fields (SNAP:24-58)

| # | field | root type | leaves |
| --- | --- | --- | --- |
| 1 | `labs` | `readonly LabSummary[]` | 10 |
| 2 | `account` | `LabAccount` | 9 |
| 3 | `members` | `readonly MemberSummary[]` | 6 |
| 4 | `projects` | `readonly ProjectSummary[]` | 5 |
| 5 | `experiments` | `readonly ExperimentSummary[]` | 26 |
| 6 | `aiModels` | `readonly AiModelFixture[]` | 4 |
| 7 | `home` | `LabHomeFixture` | 844 |
| 8 | `experimentsPage` | `ExperimentsPageFixture` | 67 |
| 9 | `experimentFlows` | `Readonly<Partial<Record<string, ExperimentFlowFixture>>>` | 2665 |
| 10 | `flowEditor` | `FlowEditorFixture` | 252 |
| 11 | `nodeLibrary` | `NodeLibraryFixture` | 158 |
| 12 | `automation` | `AutomationFixture` | 345 |
| 13 | `datasets` | `DatasetsFixture` | 565 |
| 14 | `discussions` | `DiscussionsFixture` | 1109 |
| 15 | `clusters` | `ClustersFixture` | 938 |
| 16 | `connectCluster` | `ConnectClusterFixture` | 1043 |
| 17 | `containers` | `ContainersFixture` | 606 |
| 18 | `settings` | `SettingsFixture` | 3506 |

## Leaves

### `labs` — readonly LabSummary[]

> Switchable labs; the first is selected when the page loads.

```
labs[].id: string
labs[].glyph: LabGlyph | null  (nullable)
labs[].name*: string
labs[].name[LabText].en: string
labs[].name[LabText].zh-CN: string
labs[].activity.en: string
labs[].activity.zh-CN: string
labs[].description*: string | null  (nullable)
labs[].description[LabText].en: string  (nullable parent)
labs[].description[LabText].zh-CN: string  (nullable parent)
```

### `account` — LabAccount

```
account.memberId: string
account.displayName*: string  // "Prof. J. Doe".
account.displayName[LabText].en: string
account.displayName[LabText].zh-CN: string
account.email: string
account.role.en: string
account.role.zh-CN: string
account.labMembers.en: string
account.labMembers.zh-CN: string
```

### `members` — readonly MemberSummary[]

```
members[].id: string
members[].name*: string
members[].name[LabText].en: string
members[].name[LabText].zh-CN: string
members[].initials: string | null  (nullable)
members[].avatarTone: AvatarTone | null  (nullable)
```

### `projects` — readonly ProjectSummary[]

```
projects[].id: string
projects[].name*: string
projects[].name[LabText].en: string
projects[].name[LabText].zh-CN: string
projects[].itemCount: number  // Item count shown in the focus picker.
```

### `experiments` — readonly ExperimentSummary[]

> The experiment catalog every page lists from.

```
experiments[].id: string
experiments[].name*: string
experiments[].name[LabText].en: string
experiments[].name[LabText].zh-CN: string
experiments[].owner: string
experiments[].status: ExperimentStatus
experiments[].project: string
experiments[].where*: string  // "instr-edge · 10 nodes".
experiments[].where[LabText].en: string
experiments[].where[LabText].zh-CN: string
experiments[].progress.done: number
experiments[].progress.total: number
experiments[].nodeTotal: number | undefined  (optional)  // Total node count when no bar is shown but the size is known.
experiments[].now*: string  // "UV-Vis waiting on XRD-700 · ~1h 05m left".
experiments[].now[LabText].en: string
experiments[].now[LabText].zh-CN: string
experiments[].nowSignal: LabSignal | undefined  (optional)
experiments[].discussion.id: string
experiments[].discussion.label*: string
experiments[].discussion.label[LabText].en: string
experiments[].discussion.label[LabText].zh-CN: string
experiments[].discussion.more.en: string
experiments[].discussion.more.zh-CN: string
experiments[].updated.en: string
experiments[].updated.zh-CN: string
experiments[].recency: number  // Recency rank, 1 = most recent.
```

### `aiModels` — readonly AiModelFixture[]

> Model choices of every AI panel.

```
aiModels[].id: string
aiModels[].name: string
aiModels[].meta.en: string
aiModels[].meta.zh-CN: string
```

### `home` — LabHomeFixture

> `/home`

```
home.ai.sessions[].name*: string
home.ai.sessions[].name[LabText].en: string
home.ai.sessions[].name[LabText].zh-CN: string
home.ai.sessions[].meta*: string
home.ai.sessions[].meta[LabText].en: string
home.ai.sessions[].meta[LabText].zh-CN: string
home.ai.seed[][kind="user"].kind: "user"
home.ai.seed[][kind="user"].text*: string
home.ai.seed[][kind="user"].text[LabText].en: string
home.ai.seed[][kind="user"].text[LabText].zh-CN: string
home.ai.seed[][kind="assistant"].kind: "assistant"
home.ai.seed[][kind="assistant"].text*: string
home.ai.seed[][kind="assistant"].text[LabText].en: string
home.ai.seed[][kind="assistant"].text[LabText].zh-CN: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
home.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
home.ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
home.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
home.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
home.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
home.ai.prompts[]*: string
home.ai.prompts[][LabText].en: string
home.ai.prompts[][LabText].zh-CN: string
home.ai.reply.en: string
home.ai.reply.zh-CN: string
home.ai.placeholder.en: string
home.ai.placeholder.zh-CN: string
home.ai.subtitle.en: string
home.ai.subtitle.zh-CN: string
home.ai.scope.label.en: string
home.ai.scope.label.zh-CN: string
home.ai.scope.value*: string
home.ai.scope.value[LabText].en: string
home.ai.scope.value[LabText].zh-CN: string
home.dialogs.dataset.id: string
home.dialogs.dataset.title*: string
home.dialogs.dataset.title[LabText].en: string
home.dialogs.dataset.title[LabText].zh-CN: string
home.dialogs.dataset.subtitle*: string  (optional)
home.dialogs.dataset.subtitle[LabText].en: string
home.dialogs.dataset.subtitle[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="text"].key: string
home.dialogs.dataset.fields[][kind="text"].label*: string
home.dialogs.dataset.fields[][kind="text"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="text"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="text"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="text"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="text"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="text"].kind: "text"
home.dialogs.dataset.fields[][kind="text"].placeholder*: string  (optional)
home.dialogs.dataset.fields[][kind="text"].placeholder[LabText].en: string
home.dialogs.dataset.fields[][kind="text"].placeholder[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="text"].value*: string  (optional)
home.dialogs.dataset.fields[][kind="text"].value[LabText].en: string
home.dialogs.dataset.fields[][kind="text"].value[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="text"].mono: boolean | undefined  (optional)
home.dialogs.dataset.fields[][kind="area"].key: string
home.dialogs.dataset.fields[][kind="area"].label*: string
home.dialogs.dataset.fields[][kind="area"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="area"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="area"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="area"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="area"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="area"].kind: "area"
home.dialogs.dataset.fields[][kind="area"].placeholder*: string  (optional)
home.dialogs.dataset.fields[][kind="area"].placeholder[LabText].en: string
home.dialogs.dataset.fields[][kind="area"].placeholder[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="area"].value*: string  (optional)
home.dialogs.dataset.fields[][kind="area"].value[LabText].en: string
home.dialogs.dataset.fields[][kind="area"].value[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="area"].mono: boolean | undefined  (optional)
home.dialogs.dataset.fields[][kind="area"].rows: number | undefined  (optional)
home.dialogs.dataset.fields[][kind="segmented"].key: string
home.dialogs.dataset.fields[][kind="segmented"].label*: string
home.dialogs.dataset.fields[][kind="segmented"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="segmented"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="segmented"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="segmented"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="segmented"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="segmented"].kind: "segmented"
home.dialogs.dataset.fields[][kind="segmented"].options[].id: string
home.dialogs.dataset.fields[][kind="segmented"].options[].label*: string
home.dialogs.dataset.fields[][kind="segmented"].options[].label[LabText].en: string
home.dialogs.dataset.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="segmented"].options[].meta*: string  (optional)
home.dialogs.dataset.fields[][kind="segmented"].options[].meta[LabText].en: string
home.dialogs.dataset.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="segmented"].value: string | undefined  (optional)
home.dialogs.dataset.fields[][kind="choice"].key: string
home.dialogs.dataset.fields[][kind="choice"].label*: string
home.dialogs.dataset.fields[][kind="choice"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="choice"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="choice"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="choice"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="choice"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="choice"].kind: "choice"
home.dialogs.dataset.fields[][kind="choice"].options[].id: string
home.dialogs.dataset.fields[][kind="choice"].options[].label*: string
home.dialogs.dataset.fields[][kind="choice"].options[].label[LabText].en: string
home.dialogs.dataset.fields[][kind="choice"].options[].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="choice"].options[].meta*: string  (optional)
home.dialogs.dataset.fields[][kind="choice"].options[].meta[LabText].en: string
home.dialogs.dataset.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="choice"].value: string | undefined  (optional)
home.dialogs.dataset.fields[][kind="multi"].key: string
home.dialogs.dataset.fields[][kind="multi"].label*: string
home.dialogs.dataset.fields[][kind="multi"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="multi"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="multi"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="multi"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="multi"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="multi"].kind: "multi"
home.dialogs.dataset.fields[][kind="multi"].options[].id: string
home.dialogs.dataset.fields[][kind="multi"].options[].label*: string
home.dialogs.dataset.fields[][kind="multi"].options[].label[LabText].en: string
home.dialogs.dataset.fields[][kind="multi"].options[].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="multi"].options[].meta*: string  (optional)
home.dialogs.dataset.fields[][kind="multi"].options[].meta[LabText].en: string
home.dialogs.dataset.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="multi"].value[]: string
home.dialogs.dataset.fields[][kind="toggle"].key: string
home.dialogs.dataset.fields[][kind="toggle"].label*: string
home.dialogs.dataset.fields[][kind="toggle"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="toggle"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="toggle"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="toggle"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="toggle"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="toggle"].kind: "toggle"
home.dialogs.dataset.fields[][kind="toggle"].onText*: string
home.dialogs.dataset.fields[][kind="toggle"].onText[LabText].en: string
home.dialogs.dataset.fields[][kind="toggle"].onText[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="toggle"].value: boolean | undefined  (optional)
home.dialogs.dataset.fields[][kind="info"].key: string
home.dialogs.dataset.fields[][kind="info"].label*: string
home.dialogs.dataset.fields[][kind="info"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="info"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="info"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="info"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="info"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="info"].kind: "info"
home.dialogs.dataset.fields[][kind="info"].text*: string
home.dialogs.dataset.fields[][kind="info"].text[LabText].en: string
home.dialogs.dataset.fields[][kind="info"].text[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="info"].mono: boolean | undefined  (optional)
home.dialogs.dataset.fields[][kind="code"].key: string
home.dialogs.dataset.fields[][kind="code"].label*: string
home.dialogs.dataset.fields[][kind="code"].label[LabText].en: string
home.dialogs.dataset.fields[][kind="code"].label[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="code"].hint*: string  (optional)
home.dialogs.dataset.fields[][kind="code"].hint[LabText].en: string
home.dialogs.dataset.fields[][kind="code"].hint[LabText].zh-CN: string
home.dialogs.dataset.fields[][kind="code"].kind: "code"
home.dialogs.dataset.fields[][kind="code"].code: string
home.dialogs.dataset.warning.tone: "danger" | "neutral"
home.dialogs.dataset.warning.text*: string
home.dialogs.dataset.warning.text[LabText].en: string
home.dialogs.dataset.warning.text[LabText].zh-CN: string
home.dialogs.dataset.tone: "danger" | "default" | undefined  (optional)
home.dialogs.dataset.confirmLabel*: string  (optional)
home.dialogs.dataset.confirmLabel[LabText].en: string
home.dialogs.dataset.confirmLabel[LabText].zh-CN: string
home.dialogs.dataset.hasCancel: boolean | undefined  (optional)
home.dialogs.dataset.completion[kind="done"].kind: "done"
home.dialogs.dataset.completion[kind="done"].title*: string  (optional)
home.dialogs.dataset.completion[kind="done"].title[LabText].en: string
home.dialogs.dataset.completion[kind="done"].title[LabText].zh-CN: string
home.dialogs.dataset.completion[kind="done"].detail*: string  (optional)
home.dialogs.dataset.completion[kind="done"].detail[LabText].en: string
home.dialogs.dataset.completion[kind="done"].detail[LabText].zh-CN: string
home.dialogs.dataset.completion[kind="close"].kind: "close"
home.dialogs.dataset.size: "lg" | "md" | "xl" | undefined  (optional)
home.dialogs.dataset.labelColumn: "aligned" | "none" | undefined  (optional)
home.dialogs.milestone.id: string
home.dialogs.milestone.title*: string
home.dialogs.milestone.title[LabText].en: string
home.dialogs.milestone.title[LabText].zh-CN: string
home.dialogs.milestone.subtitle*: string  (optional)
home.dialogs.milestone.subtitle[LabText].en: string
home.dialogs.milestone.subtitle[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="text"].key: string
home.dialogs.milestone.fields[][kind="text"].label*: string
home.dialogs.milestone.fields[][kind="text"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="text"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="text"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="text"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="text"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="text"].kind: "text"
home.dialogs.milestone.fields[][kind="text"].placeholder*: string  (optional)
home.dialogs.milestone.fields[][kind="text"].placeholder[LabText].en: string
home.dialogs.milestone.fields[][kind="text"].placeholder[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="text"].value*: string  (optional)
home.dialogs.milestone.fields[][kind="text"].value[LabText].en: string
home.dialogs.milestone.fields[][kind="text"].value[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="text"].mono: boolean | undefined  (optional)
home.dialogs.milestone.fields[][kind="area"].key: string
home.dialogs.milestone.fields[][kind="area"].label*: string
home.dialogs.milestone.fields[][kind="area"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="area"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="area"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="area"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="area"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="area"].kind: "area"
home.dialogs.milestone.fields[][kind="area"].placeholder*: string  (optional)
home.dialogs.milestone.fields[][kind="area"].placeholder[LabText].en: string
home.dialogs.milestone.fields[][kind="area"].placeholder[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="area"].value*: string  (optional)
home.dialogs.milestone.fields[][kind="area"].value[LabText].en: string
home.dialogs.milestone.fields[][kind="area"].value[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="area"].mono: boolean | undefined  (optional)
home.dialogs.milestone.fields[][kind="area"].rows: number | undefined  (optional)
home.dialogs.milestone.fields[][kind="segmented"].key: string
home.dialogs.milestone.fields[][kind="segmented"].label*: string
home.dialogs.milestone.fields[][kind="segmented"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="segmented"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="segmented"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="segmented"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="segmented"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="segmented"].kind: "segmented"
home.dialogs.milestone.fields[][kind="segmented"].options[].id: string
home.dialogs.milestone.fields[][kind="segmented"].options[].label*: string
home.dialogs.milestone.fields[][kind="segmented"].options[].label[LabText].en: string
home.dialogs.milestone.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="segmented"].options[].meta*: string  (optional)
home.dialogs.milestone.fields[][kind="segmented"].options[].meta[LabText].en: string
home.dialogs.milestone.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="segmented"].value: string | undefined  (optional)
home.dialogs.milestone.fields[][kind="choice"].key: string
home.dialogs.milestone.fields[][kind="choice"].label*: string
home.dialogs.milestone.fields[][kind="choice"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="choice"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="choice"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="choice"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="choice"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="choice"].kind: "choice"
home.dialogs.milestone.fields[][kind="choice"].options[].id: string
home.dialogs.milestone.fields[][kind="choice"].options[].label*: string
home.dialogs.milestone.fields[][kind="choice"].options[].label[LabText].en: string
home.dialogs.milestone.fields[][kind="choice"].options[].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="choice"].options[].meta*: string  (optional)
home.dialogs.milestone.fields[][kind="choice"].options[].meta[LabText].en: string
home.dialogs.milestone.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="choice"].value: string | undefined  (optional)
home.dialogs.milestone.fields[][kind="multi"].key: string
home.dialogs.milestone.fields[][kind="multi"].label*: string
home.dialogs.milestone.fields[][kind="multi"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="multi"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="multi"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="multi"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="multi"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="multi"].kind: "multi"
home.dialogs.milestone.fields[][kind="multi"].options[].id: string
home.dialogs.milestone.fields[][kind="multi"].options[].label*: string
home.dialogs.milestone.fields[][kind="multi"].options[].label[LabText].en: string
home.dialogs.milestone.fields[][kind="multi"].options[].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="multi"].options[].meta*: string  (optional)
home.dialogs.milestone.fields[][kind="multi"].options[].meta[LabText].en: string
home.dialogs.milestone.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="multi"].value[]: string
home.dialogs.milestone.fields[][kind="toggle"].key: string
home.dialogs.milestone.fields[][kind="toggle"].label*: string
home.dialogs.milestone.fields[][kind="toggle"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="toggle"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="toggle"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="toggle"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="toggle"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="toggle"].kind: "toggle"
home.dialogs.milestone.fields[][kind="toggle"].onText*: string
home.dialogs.milestone.fields[][kind="toggle"].onText[LabText].en: string
home.dialogs.milestone.fields[][kind="toggle"].onText[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="toggle"].value: boolean | undefined  (optional)
home.dialogs.milestone.fields[][kind="info"].key: string
home.dialogs.milestone.fields[][kind="info"].label*: string
home.dialogs.milestone.fields[][kind="info"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="info"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="info"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="info"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="info"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="info"].kind: "info"
home.dialogs.milestone.fields[][kind="info"].text*: string
home.dialogs.milestone.fields[][kind="info"].text[LabText].en: string
home.dialogs.milestone.fields[][kind="info"].text[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="info"].mono: boolean | undefined  (optional)
home.dialogs.milestone.fields[][kind="code"].key: string
home.dialogs.milestone.fields[][kind="code"].label*: string
home.dialogs.milestone.fields[][kind="code"].label[LabText].en: string
home.dialogs.milestone.fields[][kind="code"].label[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="code"].hint*: string  (optional)
home.dialogs.milestone.fields[][kind="code"].hint[LabText].en: string
home.dialogs.milestone.fields[][kind="code"].hint[LabText].zh-CN: string
home.dialogs.milestone.fields[][kind="code"].kind: "code"
home.dialogs.milestone.fields[][kind="code"].code: string
home.dialogs.milestone.warning.tone: "danger" | "neutral"
home.dialogs.milestone.warning.text*: string
home.dialogs.milestone.warning.text[LabText].en: string
home.dialogs.milestone.warning.text[LabText].zh-CN: string
home.dialogs.milestone.tone: "danger" | "default" | undefined  (optional)
home.dialogs.milestone.confirmLabel*: string  (optional)
home.dialogs.milestone.confirmLabel[LabText].en: string
home.dialogs.milestone.confirmLabel[LabText].zh-CN: string
home.dialogs.milestone.hasCancel: boolean | undefined  (optional)
home.dialogs.milestone.completion[kind="done"].kind: "done"
home.dialogs.milestone.completion[kind="done"].title*: string  (optional)
home.dialogs.milestone.completion[kind="done"].title[LabText].en: string
home.dialogs.milestone.completion[kind="done"].title[LabText].zh-CN: string
home.dialogs.milestone.completion[kind="done"].detail*: string  (optional)
home.dialogs.milestone.completion[kind="done"].detail[LabText].en: string
home.dialogs.milestone.completion[kind="done"].detail[LabText].zh-CN: string
home.dialogs.milestone.completion[kind="close"].kind: "close"
home.dialogs.milestone.size: "lg" | "md" | "xl" | undefined  (optional)
home.dialogs.milestone.labelColumn: "aligned" | "none" | undefined  (optional)
home.dialogs.report.id: string
home.dialogs.report.title*: string
home.dialogs.report.title[LabText].en: string
home.dialogs.report.title[LabText].zh-CN: string
home.dialogs.report.subtitle*: string  (optional)
home.dialogs.report.subtitle[LabText].en: string
home.dialogs.report.subtitle[LabText].zh-CN: string
home.dialogs.report.fields[][kind="text"].key: string
home.dialogs.report.fields[][kind="text"].label*: string
home.dialogs.report.fields[][kind="text"].label[LabText].en: string
home.dialogs.report.fields[][kind="text"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="text"].hint*: string  (optional)
home.dialogs.report.fields[][kind="text"].hint[LabText].en: string
home.dialogs.report.fields[][kind="text"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="text"].kind: "text"
home.dialogs.report.fields[][kind="text"].placeholder*: string  (optional)
home.dialogs.report.fields[][kind="text"].placeholder[LabText].en: string
home.dialogs.report.fields[][kind="text"].placeholder[LabText].zh-CN: string
home.dialogs.report.fields[][kind="text"].value*: string  (optional)
home.dialogs.report.fields[][kind="text"].value[LabText].en: string
home.dialogs.report.fields[][kind="text"].value[LabText].zh-CN: string
home.dialogs.report.fields[][kind="text"].mono: boolean | undefined  (optional)
home.dialogs.report.fields[][kind="area"].key: string
home.dialogs.report.fields[][kind="area"].label*: string
home.dialogs.report.fields[][kind="area"].label[LabText].en: string
home.dialogs.report.fields[][kind="area"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="area"].hint*: string  (optional)
home.dialogs.report.fields[][kind="area"].hint[LabText].en: string
home.dialogs.report.fields[][kind="area"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="area"].kind: "area"
home.dialogs.report.fields[][kind="area"].placeholder*: string  (optional)
home.dialogs.report.fields[][kind="area"].placeholder[LabText].en: string
home.dialogs.report.fields[][kind="area"].placeholder[LabText].zh-CN: string
home.dialogs.report.fields[][kind="area"].value*: string  (optional)
home.dialogs.report.fields[][kind="area"].value[LabText].en: string
home.dialogs.report.fields[][kind="area"].value[LabText].zh-CN: string
home.dialogs.report.fields[][kind="area"].mono: boolean | undefined  (optional)
home.dialogs.report.fields[][kind="area"].rows: number | undefined  (optional)
home.dialogs.report.fields[][kind="segmented"].key: string
home.dialogs.report.fields[][kind="segmented"].label*: string
home.dialogs.report.fields[][kind="segmented"].label[LabText].en: string
home.dialogs.report.fields[][kind="segmented"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="segmented"].hint*: string  (optional)
home.dialogs.report.fields[][kind="segmented"].hint[LabText].en: string
home.dialogs.report.fields[][kind="segmented"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="segmented"].kind: "segmented"
home.dialogs.report.fields[][kind="segmented"].options[].id: string
home.dialogs.report.fields[][kind="segmented"].options[].label*: string
home.dialogs.report.fields[][kind="segmented"].options[].label[LabText].en: string
home.dialogs.report.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="segmented"].options[].meta*: string  (optional)
home.dialogs.report.fields[][kind="segmented"].options[].meta[LabText].en: string
home.dialogs.report.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
home.dialogs.report.fields[][kind="segmented"].value: string | undefined  (optional)
home.dialogs.report.fields[][kind="choice"].key: string
home.dialogs.report.fields[][kind="choice"].label*: string
home.dialogs.report.fields[][kind="choice"].label[LabText].en: string
home.dialogs.report.fields[][kind="choice"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="choice"].hint*: string  (optional)
home.dialogs.report.fields[][kind="choice"].hint[LabText].en: string
home.dialogs.report.fields[][kind="choice"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="choice"].kind: "choice"
home.dialogs.report.fields[][kind="choice"].options[].id: string
home.dialogs.report.fields[][kind="choice"].options[].label*: string
home.dialogs.report.fields[][kind="choice"].options[].label[LabText].en: string
home.dialogs.report.fields[][kind="choice"].options[].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="choice"].options[].meta*: string  (optional)
home.dialogs.report.fields[][kind="choice"].options[].meta[LabText].en: string
home.dialogs.report.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
home.dialogs.report.fields[][kind="choice"].value: string | undefined  (optional)
home.dialogs.report.fields[][kind="multi"].key: string
home.dialogs.report.fields[][kind="multi"].label*: string
home.dialogs.report.fields[][kind="multi"].label[LabText].en: string
home.dialogs.report.fields[][kind="multi"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="multi"].hint*: string  (optional)
home.dialogs.report.fields[][kind="multi"].hint[LabText].en: string
home.dialogs.report.fields[][kind="multi"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="multi"].kind: "multi"
home.dialogs.report.fields[][kind="multi"].options[].id: string
home.dialogs.report.fields[][kind="multi"].options[].label*: string
home.dialogs.report.fields[][kind="multi"].options[].label[LabText].en: string
home.dialogs.report.fields[][kind="multi"].options[].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="multi"].options[].meta*: string  (optional)
home.dialogs.report.fields[][kind="multi"].options[].meta[LabText].en: string
home.dialogs.report.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
home.dialogs.report.fields[][kind="multi"].value[]: string
home.dialogs.report.fields[][kind="toggle"].key: string
home.dialogs.report.fields[][kind="toggle"].label*: string
home.dialogs.report.fields[][kind="toggle"].label[LabText].en: string
home.dialogs.report.fields[][kind="toggle"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="toggle"].hint*: string  (optional)
home.dialogs.report.fields[][kind="toggle"].hint[LabText].en: string
home.dialogs.report.fields[][kind="toggle"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="toggle"].kind: "toggle"
home.dialogs.report.fields[][kind="toggle"].onText*: string
home.dialogs.report.fields[][kind="toggle"].onText[LabText].en: string
home.dialogs.report.fields[][kind="toggle"].onText[LabText].zh-CN: string
home.dialogs.report.fields[][kind="toggle"].value: boolean | undefined  (optional)
home.dialogs.report.fields[][kind="info"].key: string
home.dialogs.report.fields[][kind="info"].label*: string
home.dialogs.report.fields[][kind="info"].label[LabText].en: string
home.dialogs.report.fields[][kind="info"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="info"].hint*: string  (optional)
home.dialogs.report.fields[][kind="info"].hint[LabText].en: string
home.dialogs.report.fields[][kind="info"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="info"].kind: "info"
home.dialogs.report.fields[][kind="info"].text*: string
home.dialogs.report.fields[][kind="info"].text[LabText].en: string
home.dialogs.report.fields[][kind="info"].text[LabText].zh-CN: string
home.dialogs.report.fields[][kind="info"].mono: boolean | undefined  (optional)
home.dialogs.report.fields[][kind="code"].key: string
home.dialogs.report.fields[][kind="code"].label*: string
home.dialogs.report.fields[][kind="code"].label[LabText].en: string
home.dialogs.report.fields[][kind="code"].label[LabText].zh-CN: string
home.dialogs.report.fields[][kind="code"].hint*: string  (optional)
home.dialogs.report.fields[][kind="code"].hint[LabText].en: string
home.dialogs.report.fields[][kind="code"].hint[LabText].zh-CN: string
home.dialogs.report.fields[][kind="code"].kind: "code"
home.dialogs.report.fields[][kind="code"].code: string
home.dialogs.report.warning.tone: "danger" | "neutral"
home.dialogs.report.warning.text*: string
home.dialogs.report.warning.text[LabText].en: string
home.dialogs.report.warning.text[LabText].zh-CN: string
home.dialogs.report.tone: "danger" | "default" | undefined  (optional)
home.dialogs.report.confirmLabel*: string  (optional)
home.dialogs.report.confirmLabel[LabText].en: string
home.dialogs.report.confirmLabel[LabText].zh-CN: string
home.dialogs.report.hasCancel: boolean | undefined  (optional)
home.dialogs.report.completion[kind="done"].kind: "done"
home.dialogs.report.completion[kind="done"].title*: string  (optional)
home.dialogs.report.completion[kind="done"].title[LabText].en: string
home.dialogs.report.completion[kind="done"].title[LabText].zh-CN: string
home.dialogs.report.completion[kind="done"].detail*: string  (optional)
home.dialogs.report.completion[kind="done"].detail[LabText].en: string
home.dialogs.report.completion[kind="done"].detail[LabText].zh-CN: string
home.dialogs.report.completion[kind="close"].kind: "close"
home.dialogs.report.size: "lg" | "md" | "xl" | undefined  (optional)
home.dialogs.report.labelColumn: "aligned" | "none" | undefined  (optional)
home.dialogs.results.id: string
home.dialogs.results.title*: string
home.dialogs.results.title[LabText].en: string
home.dialogs.results.title[LabText].zh-CN: string
home.dialogs.results.subtitle*: string  (optional)
home.dialogs.results.subtitle[LabText].en: string
home.dialogs.results.subtitle[LabText].zh-CN: string
home.dialogs.results.fields[][kind="text"].key: string
home.dialogs.results.fields[][kind="text"].label*: string
home.dialogs.results.fields[][kind="text"].label[LabText].en: string
home.dialogs.results.fields[][kind="text"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="text"].hint*: string  (optional)
home.dialogs.results.fields[][kind="text"].hint[LabText].en: string
home.dialogs.results.fields[][kind="text"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="text"].kind: "text"
home.dialogs.results.fields[][kind="text"].placeholder*: string  (optional)
home.dialogs.results.fields[][kind="text"].placeholder[LabText].en: string
home.dialogs.results.fields[][kind="text"].placeholder[LabText].zh-CN: string
home.dialogs.results.fields[][kind="text"].value*: string  (optional)
home.dialogs.results.fields[][kind="text"].value[LabText].en: string
home.dialogs.results.fields[][kind="text"].value[LabText].zh-CN: string
home.dialogs.results.fields[][kind="text"].mono: boolean | undefined  (optional)
home.dialogs.results.fields[][kind="area"].key: string
home.dialogs.results.fields[][kind="area"].label*: string
home.dialogs.results.fields[][kind="area"].label[LabText].en: string
home.dialogs.results.fields[][kind="area"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="area"].hint*: string  (optional)
home.dialogs.results.fields[][kind="area"].hint[LabText].en: string
home.dialogs.results.fields[][kind="area"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="area"].kind: "area"
home.dialogs.results.fields[][kind="area"].placeholder*: string  (optional)
home.dialogs.results.fields[][kind="area"].placeholder[LabText].en: string
home.dialogs.results.fields[][kind="area"].placeholder[LabText].zh-CN: string
home.dialogs.results.fields[][kind="area"].value*: string  (optional)
home.dialogs.results.fields[][kind="area"].value[LabText].en: string
home.dialogs.results.fields[][kind="area"].value[LabText].zh-CN: string
home.dialogs.results.fields[][kind="area"].mono: boolean | undefined  (optional)
home.dialogs.results.fields[][kind="area"].rows: number | undefined  (optional)
home.dialogs.results.fields[][kind="segmented"].key: string
home.dialogs.results.fields[][kind="segmented"].label*: string
home.dialogs.results.fields[][kind="segmented"].label[LabText].en: string
home.dialogs.results.fields[][kind="segmented"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="segmented"].hint*: string  (optional)
home.dialogs.results.fields[][kind="segmented"].hint[LabText].en: string
home.dialogs.results.fields[][kind="segmented"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="segmented"].kind: "segmented"
home.dialogs.results.fields[][kind="segmented"].options[].id: string
home.dialogs.results.fields[][kind="segmented"].options[].label*: string
home.dialogs.results.fields[][kind="segmented"].options[].label[LabText].en: string
home.dialogs.results.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="segmented"].options[].meta*: string  (optional)
home.dialogs.results.fields[][kind="segmented"].options[].meta[LabText].en: string
home.dialogs.results.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
home.dialogs.results.fields[][kind="segmented"].value: string | undefined  (optional)
home.dialogs.results.fields[][kind="choice"].key: string
home.dialogs.results.fields[][kind="choice"].label*: string
home.dialogs.results.fields[][kind="choice"].label[LabText].en: string
home.dialogs.results.fields[][kind="choice"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="choice"].hint*: string  (optional)
home.dialogs.results.fields[][kind="choice"].hint[LabText].en: string
home.dialogs.results.fields[][kind="choice"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="choice"].kind: "choice"
home.dialogs.results.fields[][kind="choice"].options[].id: string
home.dialogs.results.fields[][kind="choice"].options[].label*: string
home.dialogs.results.fields[][kind="choice"].options[].label[LabText].en: string
home.dialogs.results.fields[][kind="choice"].options[].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="choice"].options[].meta*: string  (optional)
home.dialogs.results.fields[][kind="choice"].options[].meta[LabText].en: string
home.dialogs.results.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
home.dialogs.results.fields[][kind="choice"].value: string | undefined  (optional)
home.dialogs.results.fields[][kind="multi"].key: string
home.dialogs.results.fields[][kind="multi"].label*: string
home.dialogs.results.fields[][kind="multi"].label[LabText].en: string
home.dialogs.results.fields[][kind="multi"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="multi"].hint*: string  (optional)
home.dialogs.results.fields[][kind="multi"].hint[LabText].en: string
home.dialogs.results.fields[][kind="multi"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="multi"].kind: "multi"
home.dialogs.results.fields[][kind="multi"].options[].id: string
home.dialogs.results.fields[][kind="multi"].options[].label*: string
home.dialogs.results.fields[][kind="multi"].options[].label[LabText].en: string
home.dialogs.results.fields[][kind="multi"].options[].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="multi"].options[].meta*: string  (optional)
home.dialogs.results.fields[][kind="multi"].options[].meta[LabText].en: string
home.dialogs.results.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
home.dialogs.results.fields[][kind="multi"].value[]: string
home.dialogs.results.fields[][kind="toggle"].key: string
home.dialogs.results.fields[][kind="toggle"].label*: string
home.dialogs.results.fields[][kind="toggle"].label[LabText].en: string
home.dialogs.results.fields[][kind="toggle"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="toggle"].hint*: string  (optional)
home.dialogs.results.fields[][kind="toggle"].hint[LabText].en: string
home.dialogs.results.fields[][kind="toggle"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="toggle"].kind: "toggle"
home.dialogs.results.fields[][kind="toggle"].onText*: string
home.dialogs.results.fields[][kind="toggle"].onText[LabText].en: string
home.dialogs.results.fields[][kind="toggle"].onText[LabText].zh-CN: string
home.dialogs.results.fields[][kind="toggle"].value: boolean | undefined  (optional)
home.dialogs.results.fields[][kind="info"].key: string
home.dialogs.results.fields[][kind="info"].label*: string
home.dialogs.results.fields[][kind="info"].label[LabText].en: string
home.dialogs.results.fields[][kind="info"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="info"].hint*: string  (optional)
home.dialogs.results.fields[][kind="info"].hint[LabText].en: string
home.dialogs.results.fields[][kind="info"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="info"].kind: "info"
home.dialogs.results.fields[][kind="info"].text*: string
home.dialogs.results.fields[][kind="info"].text[LabText].en: string
home.dialogs.results.fields[][kind="info"].text[LabText].zh-CN: string
home.dialogs.results.fields[][kind="info"].mono: boolean | undefined  (optional)
home.dialogs.results.fields[][kind="code"].key: string
home.dialogs.results.fields[][kind="code"].label*: string
home.dialogs.results.fields[][kind="code"].label[LabText].en: string
home.dialogs.results.fields[][kind="code"].label[LabText].zh-CN: string
home.dialogs.results.fields[][kind="code"].hint*: string  (optional)
home.dialogs.results.fields[][kind="code"].hint[LabText].en: string
home.dialogs.results.fields[][kind="code"].hint[LabText].zh-CN: string
home.dialogs.results.fields[][kind="code"].kind: "code"
home.dialogs.results.fields[][kind="code"].code: string
home.dialogs.results.warning.tone: "danger" | "neutral"
home.dialogs.results.warning.text*: string
home.dialogs.results.warning.text[LabText].en: string
home.dialogs.results.warning.text[LabText].zh-CN: string
home.dialogs.results.tone: "danger" | "default" | undefined  (optional)
home.dialogs.results.confirmLabel*: string  (optional)
home.dialogs.results.confirmLabel[LabText].en: string
home.dialogs.results.confirmLabel[LabText].zh-CN: string
home.dialogs.results.hasCancel: boolean | undefined  (optional)
home.dialogs.results.completion[kind="done"].kind: "done"
home.dialogs.results.completion[kind="done"].title*: string  (optional)
home.dialogs.results.completion[kind="done"].title[LabText].en: string
home.dialogs.results.completion[kind="done"].title[LabText].zh-CN: string
home.dialogs.results.completion[kind="done"].detail*: string  (optional)
home.dialogs.results.completion[kind="done"].detail[LabText].en: string
home.dialogs.results.completion[kind="done"].detail[LabText].zh-CN: string
home.dialogs.results.completion[kind="close"].kind: "close"
home.dialogs.results.size: "lg" | "md" | "xl" | undefined  (optional)
home.dialogs.results.labelColumn: "aligned" | "none" | undefined  (optional)
home.dialogs.sources.id: string
home.dialogs.sources.title*: string
home.dialogs.sources.title[LabText].en: string
home.dialogs.sources.title[LabText].zh-CN: string
home.dialogs.sources.subtitle*: string  (optional)
home.dialogs.sources.subtitle[LabText].en: string
home.dialogs.sources.subtitle[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="text"].key: string
home.dialogs.sources.fields[][kind="text"].label*: string
home.dialogs.sources.fields[][kind="text"].label[LabText].en: string
home.dialogs.sources.fields[][kind="text"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="text"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="text"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="text"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="text"].kind: "text"
home.dialogs.sources.fields[][kind="text"].placeholder*: string  (optional)
home.dialogs.sources.fields[][kind="text"].placeholder[LabText].en: string
home.dialogs.sources.fields[][kind="text"].placeholder[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="text"].value*: string  (optional)
home.dialogs.sources.fields[][kind="text"].value[LabText].en: string
home.dialogs.sources.fields[][kind="text"].value[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="text"].mono: boolean | undefined  (optional)
home.dialogs.sources.fields[][kind="area"].key: string
home.dialogs.sources.fields[][kind="area"].label*: string
home.dialogs.sources.fields[][kind="area"].label[LabText].en: string
home.dialogs.sources.fields[][kind="area"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="area"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="area"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="area"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="area"].kind: "area"
home.dialogs.sources.fields[][kind="area"].placeholder*: string  (optional)
home.dialogs.sources.fields[][kind="area"].placeholder[LabText].en: string
home.dialogs.sources.fields[][kind="area"].placeholder[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="area"].value*: string  (optional)
home.dialogs.sources.fields[][kind="area"].value[LabText].en: string
home.dialogs.sources.fields[][kind="area"].value[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="area"].mono: boolean | undefined  (optional)
home.dialogs.sources.fields[][kind="area"].rows: number | undefined  (optional)
home.dialogs.sources.fields[][kind="segmented"].key: string
home.dialogs.sources.fields[][kind="segmented"].label*: string
home.dialogs.sources.fields[][kind="segmented"].label[LabText].en: string
home.dialogs.sources.fields[][kind="segmented"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="segmented"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="segmented"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="segmented"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="segmented"].kind: "segmented"
home.dialogs.sources.fields[][kind="segmented"].options[].id: string
home.dialogs.sources.fields[][kind="segmented"].options[].label*: string
home.dialogs.sources.fields[][kind="segmented"].options[].label[LabText].en: string
home.dialogs.sources.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="segmented"].options[].meta*: string  (optional)
home.dialogs.sources.fields[][kind="segmented"].options[].meta[LabText].en: string
home.dialogs.sources.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="segmented"].value: string | undefined  (optional)
home.dialogs.sources.fields[][kind="choice"].key: string
home.dialogs.sources.fields[][kind="choice"].label*: string
home.dialogs.sources.fields[][kind="choice"].label[LabText].en: string
home.dialogs.sources.fields[][kind="choice"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="choice"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="choice"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="choice"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="choice"].kind: "choice"
home.dialogs.sources.fields[][kind="choice"].options[].id: string
home.dialogs.sources.fields[][kind="choice"].options[].label*: string
home.dialogs.sources.fields[][kind="choice"].options[].label[LabText].en: string
home.dialogs.sources.fields[][kind="choice"].options[].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="choice"].options[].meta*: string  (optional)
home.dialogs.sources.fields[][kind="choice"].options[].meta[LabText].en: string
home.dialogs.sources.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="choice"].value: string | undefined  (optional)
home.dialogs.sources.fields[][kind="multi"].key: string
home.dialogs.sources.fields[][kind="multi"].label*: string
home.dialogs.sources.fields[][kind="multi"].label[LabText].en: string
home.dialogs.sources.fields[][kind="multi"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="multi"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="multi"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="multi"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="multi"].kind: "multi"
home.dialogs.sources.fields[][kind="multi"].options[].id: string
home.dialogs.sources.fields[][kind="multi"].options[].label*: string
home.dialogs.sources.fields[][kind="multi"].options[].label[LabText].en: string
home.dialogs.sources.fields[][kind="multi"].options[].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="multi"].options[].meta*: string  (optional)
home.dialogs.sources.fields[][kind="multi"].options[].meta[LabText].en: string
home.dialogs.sources.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="multi"].value[]: string
home.dialogs.sources.fields[][kind="toggle"].key: string
home.dialogs.sources.fields[][kind="toggle"].label*: string
home.dialogs.sources.fields[][kind="toggle"].label[LabText].en: string
home.dialogs.sources.fields[][kind="toggle"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="toggle"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="toggle"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="toggle"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="toggle"].kind: "toggle"
home.dialogs.sources.fields[][kind="toggle"].onText*: string
home.dialogs.sources.fields[][kind="toggle"].onText[LabText].en: string
home.dialogs.sources.fields[][kind="toggle"].onText[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="toggle"].value: boolean | undefined  (optional)
home.dialogs.sources.fields[][kind="info"].key: string
home.dialogs.sources.fields[][kind="info"].label*: string
home.dialogs.sources.fields[][kind="info"].label[LabText].en: string
home.dialogs.sources.fields[][kind="info"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="info"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="info"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="info"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="info"].kind: "info"
home.dialogs.sources.fields[][kind="info"].text*: string
home.dialogs.sources.fields[][kind="info"].text[LabText].en: string
home.dialogs.sources.fields[][kind="info"].text[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="info"].mono: boolean | undefined  (optional)
home.dialogs.sources.fields[][kind="code"].key: string
home.dialogs.sources.fields[][kind="code"].label*: string
home.dialogs.sources.fields[][kind="code"].label[LabText].en: string
home.dialogs.sources.fields[][kind="code"].label[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="code"].hint*: string  (optional)
home.dialogs.sources.fields[][kind="code"].hint[LabText].en: string
home.dialogs.sources.fields[][kind="code"].hint[LabText].zh-CN: string
home.dialogs.sources.fields[][kind="code"].kind: "code"
home.dialogs.sources.fields[][kind="code"].code: string
home.dialogs.sources.warning.tone: "danger" | "neutral"
home.dialogs.sources.warning.text*: string
home.dialogs.sources.warning.text[LabText].en: string
home.dialogs.sources.warning.text[LabText].zh-CN: string
home.dialogs.sources.tone: "danger" | "default" | undefined  (optional)
home.dialogs.sources.confirmLabel*: string  (optional)
home.dialogs.sources.confirmLabel[LabText].en: string
home.dialogs.sources.confirmLabel[LabText].zh-CN: string
home.dialogs.sources.hasCancel: boolean | undefined  (optional)
home.dialogs.sources.completion[kind="done"].kind: "done"
home.dialogs.sources.completion[kind="done"].title*: string  (optional)
home.dialogs.sources.completion[kind="done"].title[LabText].en: string
home.dialogs.sources.completion[kind="done"].title[LabText].zh-CN: string
home.dialogs.sources.completion[kind="done"].detail*: string  (optional)
home.dialogs.sources.completion[kind="done"].detail[LabText].en: string
home.dialogs.sources.completion[kind="done"].detail[LabText].zh-CN: string
home.dialogs.sources.completion[kind="close"].kind: "close"
home.dialogs.sources.size: "lg" | "md" | "xl" | undefined  (optional)
home.dialogs.sources.labelColumn: "aligned" | "none" | undefined  (optional)
home.updated.en: string  (nullable parent)
home.updated.zh-CN: string  (nullable parent)
home.reportsThisWeek: number
home.reports[].id: string  // The report's opaque identity.
home.reports[].project: string
home.reports[].date.en: string
home.reports[].date.zh-CN: string
home.reports[].dateShort.en: string
home.reports[].dateShort.zh-CN: string
home.reports[].time: string
home.reports[].title*: string
home.reports[].title[LabText].en: string
home.reports[].title[LabText].zh-CN: string
home.reports[].paragraphs[]*: string
home.reports[].paragraphs[][LabText].en: string
home.reports[].paragraphs[][LabText].zh-CN: string
home.reports[].equation.after: number  (nullable parent)
home.reports[].equation.tex: string  (nullable parent)
home.reports[].equation.number: string  (nullable parent)
home.reports[].model*: string | null  (nullable)
home.reports[].model[LabText].en: string  (nullable parent)
home.reports[].model[LabText].zh-CN: string  (nullable parent)
home.reports[].sourceCount: number
home.reports[].tags[]*: string
home.reports[].tags[][LabText].en: string
home.reports[].tags[][LabText].zh-CN: string
home.reports[].moreTagCount: number
home.reports[].figure[kind="chart"].kind: "chart"  (nullable parent)
home.reports[].figure[kind="chart"].label*: string | null  (nullable) (nullable parent)
home.reports[].figure[kind="chart"].label[LabText].en: string  (nullable parent)
home.reports[].figure[kind="chart"].label[LabText].zh-CN: string  (nullable parent)
home.reports[].figure[kind="chart"].caption*: string | null  (nullable) (nullable parent)
home.reports[].figure[kind="chart"].caption[LabText].en: string  (nullable parent)
home.reports[].figure[kind="chart"].caption[LabText].zh-CN: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.title.en: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.title.zh-CN: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.xLabel.en: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.xLabel.zh-CN: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.yLabel.en: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.yLabel.zh-CN: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.seed: number  (nullable parent)
home.reports[].figure[kind="chart"].chart.series[].name.en: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.series[].name.zh-CN: string  (nullable parent)
home.reports[].figure[kind="chart"].chart.series[].floor: number  (nullable parent)  // Error model of one curve, sampled by the page: x = (i/140)^1.25 · 100000 for i = 0…140; e = 0.95·exp(−x/decay) + floor·(1 + 2.2·exp(−x/22000))·(1 + noise·(rnd − 0.5)); y = log10(min(e, 1)), plotted on 10⁰…10⁻⁴. `rnd` is the shared Park–Miller generator seeded with `HomeChart.seed`, consumed series by series.
home.reports[].figure[kind="chart"].chart.series[].decay: number  (nullable parent)
home.reports[].figure[kind="chart"].chart.series[].noise: number  (nullable parent)
home.reports[].figure[kind="image"].kind: "image"  (nullable parent)
home.reports[].figure[kind="image"].label*: string | null  (nullable) (nullable parent)
home.reports[].figure[kind="image"].label[LabText].en: string  (nullable parent)
home.reports[].figure[kind="image"].label[LabText].zh-CN: string  (nullable parent)
home.reports[].figure[kind="image"].caption*: string | null  (nullable) (nullable parent)
home.reports[].figure[kind="image"].caption[LabText].en: string  (nullable parent)
home.reports[].figure[kind="image"].caption[LabText].zh-CN: string  (nullable parent)
home.reports[].figure[kind="image"].placeholder: string  (nullable parent)
home.reports[].layout: "compact" | "full"  // `full` = the feature card with figure beside the text; `compact` = one-paragraph card with a thumbnail.
home.events[].id: string
home.events[].project: string | undefined  (optional)  // Absent = lab-wide (e.g. a milestone).
home.events[].category: "data" | "experiments" | "milestones"
home.events[].glyph: HomeEventGlyph
home.events[].date.en: string
home.events[].date.zh-CN: string
home.events[].dateShort.en: string
home.events[].dateShort.zh-CN: string
home.events[].time: string
home.events[].title*: string | null  (nullable)
home.events[].title[LabText].en: string  (nullable parent)
home.events[].title[LabText].zh-CN: string  (nullable parent)
home.events[].text*: string | null  (nullable)
home.events[].text[LabText].en: string  (nullable parent)
home.events[].text[LabText].zh-CN: string  (nullable parent)
home.events[].action.label.en: string  (nullable parent)
home.events[].action.label.zh-CN: string  (nullable parent)
home.events[].action.dialog: HomeDialogId  (nullable parent)
home.progress.percent: number | null  (nullable)
home.progress.phase*: string | null  (nullable)
home.progress.phase[LabText].en: string  (nullable parent)
home.progress.phase[LabText].zh-CN: string  (nullable parent)
home.progress.milestones.done: number
home.progress.milestones.total: number
home.progress.next*: string | null  (nullable)
home.progress.next[LabText].en: string  (nullable parent)
home.progress.next[LabText].zh-CN: string  (nullable parent)
home.progress.estimate.en: string  (nullable parent)
home.progress.estimate.zh-CN: string  (nullable parent)
home.progress.detail*: string | null  (nullable)
home.progress.detail[LabText].en: string  (nullable parent)
home.progress.detail[LabText].zh-CN: string  (nullable parent)
home.clusters.health*: string | null  (nullable)
home.clusters.health[LabText].en: string  (nullable parent)
home.clusters.health[LabText].zh-CN: string  (nullable parent)
home.clusters.healthDetail*: string | null  (nullable)
home.clusters.healthDetail[LabText].en: string  (nullable parent)
home.clusters.healthDetail[LabText].zh-CN: string  (nullable parent)
home.clusters.rows[].name: string
home.clusters.rows[].usage*: string
home.clusters.rows[].usage[LabText].en: string
home.clusters.rows[].usage[LabText].zh-CN: string
home.clusters.rows[].loadPercent: number
home.clusters.rows[].health: "degraded" | "ok"
home.clusters.rows[].detail.en: string
home.clusters.rows[].detail.zh-CN: string
home.discussions[].id: string
home.discussions[].name*: string
home.discussions[].name[LabText].en: string
home.discussions[].name[LabText].zh-CN: string
home.discussions[].project: string
home.discussions[].activity*: string | null  (nullable)
home.discussions[].activity[LabText].en: string  (nullable parent)
home.discussions[].activity[LabText].zh-CN: string  (nullable parent)
home.discussions[].activitySignal: LabSignal | undefined  (optional)
home.discussions[].experiments: string  // "R-021 · R-022 · R-018"
home.quote.en: string
home.quote.zh-CN: string
```

### `experimentsPage` — ExperimentsPageFixture

> `/experiments`

```
experimentsPage.ai.sessions[].name*: string
experimentsPage.ai.sessions[].name[LabText].en: string
experimentsPage.ai.sessions[].name[LabText].zh-CN: string
experimentsPage.ai.sessions[].meta*: string
experimentsPage.ai.sessions[].meta[LabText].en: string
experimentsPage.ai.sessions[].meta[LabText].zh-CN: string
experimentsPage.ai.seed[][kind="user"].kind: "user"
experimentsPage.ai.seed[][kind="user"].text*: string
experimentsPage.ai.seed[][kind="user"].text[LabText].en: string
experimentsPage.ai.seed[][kind="user"].text[LabText].zh-CN: string
experimentsPage.ai.seed[][kind="assistant"].kind: "assistant"
experimentsPage.ai.seed[][kind="assistant"].text*: string
experimentsPage.ai.seed[][kind="assistant"].text[LabText].en: string
experimentsPage.ai.seed[][kind="assistant"].text[LabText].zh-CN: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
experimentsPage.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
experimentsPage.ai.prompts[]*: string
experimentsPage.ai.prompts[][LabText].en: string
experimentsPage.ai.prompts[][LabText].zh-CN: string
experimentsPage.ai.reply.en: string
experimentsPage.ai.reply.zh-CN: string
experimentsPage.ai.placeholder.en: string
experimentsPage.ai.placeholder.zh-CN: string
experimentsPage.ai.subtitle.en: string
experimentsPage.ai.subtitle.zh-CN: string
experimentsPage.ai.scope.label.en: string
experimentsPage.ai.scope.label.zh-CN: string
experimentsPage.ai.scope.value*: string
experimentsPage.ai.scope.value[LabText].en: string
experimentsPage.ai.scope.value[LabText].zh-CN: string
experimentsPage.experimentIds[]: string
experimentsPage.focusProjectIds[]: string
experimentsPage.window.start.hour: number
experimentsPage.window.start.minute: number
experimentsPage.window.end.hour: number
experimentsPage.window.end.minute: number
experimentsPage.window.now.hour: number
experimentsPage.window.now.minute: number
experimentsPage.window.tickMinutes: number
experimentsPage.lanes[].device*: string
experimentsPage.lanes[].device[LabText].en: string
experimentsPage.lanes[].device[LabText].zh-CN: string
experimentsPage.lanes[].description*: string
experimentsPage.lanes[].description[LabText].en: string
experimentsPage.lanes[].description[LabText].zh-CN: string
experimentsPage.lanes[].slots[].startMinute: number  // Relative to window.start; x = startMinute / window duration, width = (endMinute-startMinute) / duration.
experimentsPage.lanes[].slots[].endMinute: number
experimentsPage.lanes[].slots[].runId: string
experimentsPage.lanes[].slots[].nodeLabel: string
experimentsPage.lanes[].slots[].kind: "conflict" | "done" | "other" | "planned" | "running" | "waiting"
experimentsPage.lanes[].slots[].tooltip*: string
experimentsPage.lanes[].slots[].tooltip[LabText].en: string
experimentsPage.lanes[].slots[].tooltip[LabText].zh-CN: string
experimentsPage.lanes[].slots[].zone[kind="single"].kind: "single"
experimentsPage.lanes[].slots[].zone[kind="two_zone"].kind: "two_zone"
experimentsPage.lanes[].slots[].zone[kind="two_zone"].index: 0 | 1
```

### `experimentFlows` — Readonly<Partial<Record<string, ExperimentFlowFixture>>>

> `/experiments/$runId` — the runs that have a flow; the mode follows the run.

```
experimentFlows[string][mode="draft"].ai.sessions[].name*: string
experimentFlows[string][mode="draft"].ai.sessions[].name[LabText].en: string
experimentFlows[string][mode="draft"].ai.sessions[].name[LabText].zh-CN: string
experimentFlows[string][mode="draft"].ai.sessions[].meta*: string
experimentFlows[string][mode="draft"].ai.sessions[].meta[LabText].en: string
experimentFlows[string][mode="draft"].ai.sessions[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="user"].kind: "user"
experimentFlows[string][mode="draft"].ai.seed[][kind="user"].text*: string
experimentFlows[string][mode="draft"].ai.seed[][kind="user"].text[LabText].en: string
experimentFlows[string][mode="draft"].ai.seed[][kind="user"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].kind: "assistant"
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].text*: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].text[LabText].en: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
experimentFlows[string][mode="draft"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
experimentFlows[string][mode="draft"].ai.prompts[]*: string
experimentFlows[string][mode="draft"].ai.prompts[][LabText].en: string
experimentFlows[string][mode="draft"].ai.prompts[][LabText].zh-CN: string
experimentFlows[string][mode="draft"].ai.reply.en: string
experimentFlows[string][mode="draft"].ai.reply.zh-CN: string
experimentFlows[string][mode="draft"].ai.placeholder.en: string
experimentFlows[string][mode="draft"].ai.placeholder.zh-CN: string
experimentFlows[string][mode="draft"].ai.subtitle.en: string
experimentFlows[string][mode="draft"].ai.subtitle.zh-CN: string
experimentFlows[string][mode="draft"].ai.scope.label.en: string
experimentFlows[string][mode="draft"].ai.scope.label.zh-CN: string
experimentFlows[string][mode="draft"].ai.scope.value*: string
experimentFlows[string][mode="draft"].ai.scope.value[LabText].en: string
experimentFlows[string][mode="draft"].ai.scope.value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].runId: string
experimentFlows[string][mode="draft"].title*: string
experimentFlows[string][mode="draft"].title[LabText].en: string
experimentFlows[string][mode="draft"].title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].description*: string
experimentFlows[string][mode="draft"].description[LabText].en: string
experimentFlows[string][mode="draft"].description[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].instanceId: string
experimentFlows[string][mode="draft"].nodes[].nodeId: string
experimentFlows[string][mode="draft"].nodes[].libraryId: string  // The library function the node calls.
experimentFlows[string][mode="draft"].nodes[].name*: string
experimentFlows[string][mode="draft"].nodes[].name[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].name[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].device*: string  // Empty when the node's execution site is unknown (an aborted call, a human slot).
experimentFlows[string][mode="draft"].nodes[].device[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].device[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].lane: number  // y = top + lane * laneHeight.
experimentFlows[string][mode="draft"].nodes[].dependencyColumn: number  // Draft x = padding + dependencyColumn * columnWidth.
experimentFlows[string][mode="draft"].nodes[].from[]: string
experimentFlows[string][mode="draft"].nodes[].origin: "ai_suggestion" | "plan"
experimentFlows[string][mode="draft"].nodes[].status: FlowNodeStatus
experimentFlows[string][mode="draft"].nodes[].timing[kind="interval"].kind: "interval"
experimentFlows[string][mode="draft"].nodes[].timing[kind="interval"].startMinute: number
experimentFlows[string][mode="draft"].nodes[].timing[kind="interval"].endMinute: number
experimentFlows[string][mode="draft"].nodes[].timing[kind="estimate"].kind: "estimate"
experimentFlows[string][mode="draft"].nodes[].timing[kind="estimate"].durationMinutes: number | null  (nullable)
experimentFlows[string][mode="draft"].nodes[].tableVerdict.text*: string
experimentFlows[string][mode="draft"].nodes[].tableVerdict.text[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].tableVerdict.text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].tableVerdict.signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].label*: string
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].label[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].value*: string
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].value[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].format: "literal" | "text"
experimentFlows[string][mode="draft"].nodes[].detail.parameters[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].label*: string
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].label[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].value*: string
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].value[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].format: "literal" | "text"
experimentFlows[string][mode="draft"].nodes[].detail.artifactsAndSignals[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].label*: string
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].label[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].value*: string
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].value[LabText].en: string
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].format: "literal" | "text"
experimentFlows[string][mode="draft"].nodes[].detail.verdict[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="draft"].arms[].lane: number
experimentFlows[string][mode="draft"].arms[].label*: string
experimentFlows[string][mode="draft"].arms[].label[LabText].en: string
experimentFlows[string][mode="draft"].arms[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].columns[]*: string
experimentFlows[string][mode="draft"].columns[][LabText].en: string
experimentFlows[string][mode="draft"].columns[][LabText].zh-CN: string
experimentFlows[string][mode="draft"].artifactContracts[].libraryId: string
experimentFlows[string][mode="draft"].artifactContracts[].files[]: string
experimentFlows[string][mode="draft"].selectedInstanceId: string | null  (nullable)  // Null when the flow has no node.
experimentFlows[string][mode="draft"].derivedFrom.run: string  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="input"].kind: "input"  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="input"].position: number  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="input"].name: string  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="input"].value: string  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="version"].kind: "version"  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="version"].fn: string  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="version"].from: string  (nullable parent)
experimentFlows[string][mode="draft"].derivedFrom.changes[][kind="version"].to: string  (nullable parent)
experimentFlows[string][mode="draft"].rewoundTo: number | null  (nullable)  // The graph shown is the one at this event sequence (`at`), not the latest.
experimentFlows[string][mode="draft"].comparison.a: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.b: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="same"].kind: "same"  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="same"].subject: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="changed"].kind: "changed"  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="changed"].subject: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="changed"].fields[].field: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="changed"].fields[].a: string | null  (nullable) (nullable parent)  // Display text of each side's value; null when the field is absent on that side.
experimentFlows[string][mode="draft"].comparison.pairs[][kind="changed"].fields[].b: string | null  (nullable) (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="aborted"].kind: "aborted"  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="aborted"].subject: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="aborted"].side: "a" | "b" | "both"  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind∈"only_a"|"only_b"].kind: "only_a" | "only_b"  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind∈"only_a"|"only_b"].subject: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="ambiguous"].kind: "ambiguous"  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="ambiguous"].subject: string  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="ambiguous"].a: number  (nullable parent)
experimentFlows[string][mode="draft"].comparison.pairs[][kind="ambiguous"].b: number  (nullable parent)
experimentFlows[string][mode="draft"].workspace.step: number  (nullable parent)
experimentFlows[string][mode="draft"].workspace.position: number  (nullable parent)
experimentFlows[string][mode="draft"].workspace.files[].path: string  (nullable parent)
experimentFlows[string][mode="draft"].workspace.files[].size: number  (nullable parent)
experimentFlows[string][mode="draft"].workspace.files[].content: string  (nullable parent)
experimentFlows[string][mode="draft"].mode: "draft"
experimentFlows[string][mode="draft"].estimatedMinutes: number | null  (nullable)  // Critical-path sum of the node estimates; null when a node has none.
experimentFlows[string][mode="draft"].dialogs.discard.id: string
experimentFlows[string][mode="draft"].dialogs.discard.title*: string
experimentFlows[string][mode="draft"].dialogs.discard.title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.subtitle*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.subtitle[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].text*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].key: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].label*: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="draft"].dialogs.discard.fields[][kind="code"].code: string
experimentFlows[string][mode="draft"].dialogs.discard.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="draft"].dialogs.discard.warning.text*: string
experimentFlows[string][mode="draft"].dialogs.discard.warning.text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.confirmLabel*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.confirmLabel[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].kind: "done"
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.discard.completion[kind="close"].kind: "close"
experimentFlows[string][mode="draft"].dialogs.discard.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.discard.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.id: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.title*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.subtitle*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.subtitle[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].text*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].key: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].label*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.fields[][kind="code"].code: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.warning.text*: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.warning.text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.confirmLabel*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.confirmLabel[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].kind: "done"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.edit_parameters.completion[kind="close"].kind: "close"
experimentFlows[string][mode="draft"].dialogs.edit_parameters.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.edit_parameters.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.id: string
experimentFlows[string][mode="draft"].dialogs.keep.title*: string
experimentFlows[string][mode="draft"].dialogs.keep.title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.subtitle*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.subtitle[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].text*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].key: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].label*: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="draft"].dialogs.keep.fields[][kind="code"].code: string
experimentFlows[string][mode="draft"].dialogs.keep.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="draft"].dialogs.keep.warning.text*: string
experimentFlows[string][mode="draft"].dialogs.keep.warning.text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.confirmLabel*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.confirmLabel[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].kind: "done"
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.keep.completion[kind="close"].kind: "close"
experimentFlows[string][mode="draft"].dialogs.keep.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.keep.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.id: string
experimentFlows[string][mode="draft"].dialogs.remove.title*: string
experimentFlows[string][mode="draft"].dialogs.remove.title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.subtitle*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.subtitle[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].text*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].key: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].label*: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="draft"].dialogs.remove.fields[][kind="code"].code: string
experimentFlows[string][mode="draft"].dialogs.remove.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="draft"].dialogs.remove.warning.text*: string
experimentFlows[string][mode="draft"].dialogs.remove.warning.text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.confirmLabel*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.confirmLabel[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].kind: "done"
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.remove.completion[kind="close"].kind: "close"
experimentFlows[string][mode="draft"].dialogs.remove.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.remove.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.id: string
experimentFlows[string][mode="draft"].dialogs.start.title*: string
experimentFlows[string][mode="draft"].dialogs.start.title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.subtitle*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.subtitle[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].text*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].key: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].label*: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="draft"].dialogs.start.fields[][kind="code"].code: string
experimentFlows[string][mode="draft"].dialogs.start.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="draft"].dialogs.start.warning.text*: string
experimentFlows[string][mode="draft"].dialogs.start.warning.text[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.confirmLabel*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.confirmLabel[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].kind: "done"
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="draft"].dialogs.start.completion[kind="close"].kind: "close"
experimentFlows[string][mode="draft"].dialogs.start.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="draft"].dialogs.start.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="running"].ai.sessions[].name*: string
experimentFlows[string][mode="running"].ai.sessions[].name[LabText].en: string
experimentFlows[string][mode="running"].ai.sessions[].name[LabText].zh-CN: string
experimentFlows[string][mode="running"].ai.sessions[].meta*: string
experimentFlows[string][mode="running"].ai.sessions[].meta[LabText].en: string
experimentFlows[string][mode="running"].ai.sessions[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="user"].kind: "user"
experimentFlows[string][mode="running"].ai.seed[][kind="user"].text*: string
experimentFlows[string][mode="running"].ai.seed[][kind="user"].text[LabText].en: string
experimentFlows[string][mode="running"].ai.seed[][kind="user"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].kind: "assistant"
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].text*: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].text[LabText].en: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
experimentFlows[string][mode="running"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
experimentFlows[string][mode="running"].ai.prompts[]*: string
experimentFlows[string][mode="running"].ai.prompts[][LabText].en: string
experimentFlows[string][mode="running"].ai.prompts[][LabText].zh-CN: string
experimentFlows[string][mode="running"].ai.reply.en: string
experimentFlows[string][mode="running"].ai.reply.zh-CN: string
experimentFlows[string][mode="running"].ai.placeholder.en: string
experimentFlows[string][mode="running"].ai.placeholder.zh-CN: string
experimentFlows[string][mode="running"].ai.subtitle.en: string
experimentFlows[string][mode="running"].ai.subtitle.zh-CN: string
experimentFlows[string][mode="running"].ai.scope.label.en: string
experimentFlows[string][mode="running"].ai.scope.label.zh-CN: string
experimentFlows[string][mode="running"].ai.scope.value*: string
experimentFlows[string][mode="running"].ai.scope.value[LabText].en: string
experimentFlows[string][mode="running"].ai.scope.value[LabText].zh-CN: string
experimentFlows[string][mode="running"].runId: string
experimentFlows[string][mode="running"].title*: string
experimentFlows[string][mode="running"].title[LabText].en: string
experimentFlows[string][mode="running"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].description*: string
experimentFlows[string][mode="running"].description[LabText].en: string
experimentFlows[string][mode="running"].description[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].instanceId: string
experimentFlows[string][mode="running"].nodes[].nodeId: string
experimentFlows[string][mode="running"].nodes[].libraryId: string  // The library function the node calls.
experimentFlows[string][mode="running"].nodes[].name*: string
experimentFlows[string][mode="running"].nodes[].name[LabText].en: string
experimentFlows[string][mode="running"].nodes[].name[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].device*: string  // Empty when the node's execution site is unknown (an aborted call, a human slot).
experimentFlows[string][mode="running"].nodes[].device[LabText].en: string
experimentFlows[string][mode="running"].nodes[].device[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].lane: number  // y = top + lane * laneHeight.
experimentFlows[string][mode="running"].nodes[].dependencyColumn: number  // Draft x = padding + dependencyColumn * columnWidth.
experimentFlows[string][mode="running"].nodes[].from[]: string
experimentFlows[string][mode="running"].nodes[].origin: "ai_suggestion" | "plan"
experimentFlows[string][mode="running"].nodes[].status: FlowNodeStatus
experimentFlows[string][mode="running"].nodes[].timing[kind="interval"].kind: "interval"
experimentFlows[string][mode="running"].nodes[].timing[kind="interval"].startMinute: number
experimentFlows[string][mode="running"].nodes[].timing[kind="interval"].endMinute: number
experimentFlows[string][mode="running"].nodes[].timing[kind="estimate"].kind: "estimate"
experimentFlows[string][mode="running"].nodes[].timing[kind="estimate"].durationMinutes: number | null  (nullable)
experimentFlows[string][mode="running"].nodes[].tableVerdict.text*: string
experimentFlows[string][mode="running"].nodes[].tableVerdict.text[LabText].en: string
experimentFlows[string][mode="running"].nodes[].tableVerdict.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].tableVerdict.signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="running"].nodes[].detail.parameters[].label*: string
experimentFlows[string][mode="running"].nodes[].detail.parameters[].label[LabText].en: string
experimentFlows[string][mode="running"].nodes[].detail.parameters[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].detail.parameters[].value*: string
experimentFlows[string][mode="running"].nodes[].detail.parameters[].value[LabText].en: string
experimentFlows[string][mode="running"].nodes[].detail.parameters[].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].detail.parameters[].format: "literal" | "text"
experimentFlows[string][mode="running"].nodes[].detail.parameters[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].label*: string
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].label[LabText].en: string
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].value*: string
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].value[LabText].en: string
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].format: "literal" | "text"
experimentFlows[string][mode="running"].nodes[].detail.artifactsAndSignals[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="running"].nodes[].detail.verdict[].label*: string
experimentFlows[string][mode="running"].nodes[].detail.verdict[].label[LabText].en: string
experimentFlows[string][mode="running"].nodes[].detail.verdict[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].detail.verdict[].value*: string
experimentFlows[string][mode="running"].nodes[].detail.verdict[].value[LabText].en: string
experimentFlows[string][mode="running"].nodes[].detail.verdict[].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].nodes[].detail.verdict[].format: "literal" | "text"
experimentFlows[string][mode="running"].nodes[].detail.verdict[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="running"].arms[].lane: number
experimentFlows[string][mode="running"].arms[].label*: string
experimentFlows[string][mode="running"].arms[].label[LabText].en: string
experimentFlows[string][mode="running"].arms[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].columns[]*: string
experimentFlows[string][mode="running"].columns[][LabText].en: string
experimentFlows[string][mode="running"].columns[][LabText].zh-CN: string
experimentFlows[string][mode="running"].artifactContracts[].libraryId: string
experimentFlows[string][mode="running"].artifactContracts[].files[]: string
experimentFlows[string][mode="running"].selectedInstanceId: string | null  (nullable)  // Null when the flow has no node.
experimentFlows[string][mode="running"].derivedFrom.run: string  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="input"].kind: "input"  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="input"].position: number  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="input"].name: string  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="input"].value: string  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="version"].kind: "version"  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="version"].fn: string  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="version"].from: string  (nullable parent)
experimentFlows[string][mode="running"].derivedFrom.changes[][kind="version"].to: string  (nullable parent)
experimentFlows[string][mode="running"].rewoundTo: number | null  (nullable)  // The graph shown is the one at this event sequence (`at`), not the latest.
experimentFlows[string][mode="running"].comparison.a: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.b: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="same"].kind: "same"  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="same"].subject: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="changed"].kind: "changed"  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="changed"].subject: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="changed"].fields[].field: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="changed"].fields[].a: string | null  (nullable) (nullable parent)  // Display text of each side's value; null when the field is absent on that side.
experimentFlows[string][mode="running"].comparison.pairs[][kind="changed"].fields[].b: string | null  (nullable) (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="aborted"].kind: "aborted"  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="aborted"].subject: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="aborted"].side: "a" | "b" | "both"  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind∈"only_a"|"only_b"].kind: "only_a" | "only_b"  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind∈"only_a"|"only_b"].subject: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="ambiguous"].kind: "ambiguous"  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="ambiguous"].subject: string  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="ambiguous"].a: number  (nullable parent)
experimentFlows[string][mode="running"].comparison.pairs[][kind="ambiguous"].b: number  (nullable parent)
experimentFlows[string][mode="running"].workspace.step: number  (nullable parent)
experimentFlows[string][mode="running"].workspace.position: number  (nullable parent)
experimentFlows[string][mode="running"].workspace.files[].path: string  (nullable parent)
experimentFlows[string][mode="running"].workspace.files[].size: number  (nullable parent)
experimentFlows[string][mode="running"].workspace.files[].content: string  (nullable parent)
experimentFlows[string][mode="running"].mode: "running"
experimentFlows[string][mode="running"].commits[].seq: any
experimentFlows[string][mode="running"].commits[].minute: number
experimentFlows[string][mode="running"].axisSpan.lastStartMinute: number
experimentFlows[string][mode="running"].axisSpan.endMinute: number
experimentFlows[string][mode="running"].clockStart.hour: number
experimentFlows[string][mode="running"].clockStart.minute: number
experimentFlows[string][mode="running"].now.hour: number
experimentFlows[string][mode="running"].now.minute: number
experimentFlows[string][mode="running"].remainingMinutes: number | null  (nullable)  // Unknown: calls not yet committed cannot be known (D12, G47).
experimentFlows[string][mode="running"].slots[].instanceId: string
experimentFlows[string][mode="running"].slots[].writerSession: any
experimentFlows[string][mode="running"].slots[].slot: string
experimentFlows[string][mode="running"].slots[].fn: string
experimentFlows[string][mode="running"].slots[].state[kind="awaiting_human"].kind: "awaiting_human"
experimentFlows[string][mode="running"].slots[].state[kind="awaiting_human"].request: string
experimentFlows[string][mode="running"].slots[].state[kind="awaiting_human"].shape[kind="single"].kind: "single"
experimentFlows[string][mode="running"].slots[].state[kind="awaiting_human"].shape[kind="single"].type: "boolean" | "file" | "number" | "string"
experimentFlows[string][mode="running"].slots[].state[kind="awaiting_human"].shape[kind="record"].kind: "record"
experimentFlows[string][mode="running"].slots[].state[kind="awaiting_human"].shape[kind="record"].fields[string]: "boolean" | "file" | "number" | "string"
experimentFlows[string][mode="running"].slots[].state[kind="running"].kind: "running"
experimentFlows[string][mode="running"].slots[].state[kind="running"].body: "Agent" | "Program"
experimentFlows[string][mode="running"].slots[].state[kind="running"].agentId: string | null  (nullable)
experimentFlows[string][mode="running"].dialogs.conflict.id: string
experimentFlows[string][mode="running"].dialogs.conflict.title*: string
experimentFlows[string][mode="running"].dialogs.conflict.title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.subtitle*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.subtitle[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].text*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].key: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].label*: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="running"].dialogs.conflict.fields[][kind="code"].code: string
experimentFlows[string][mode="running"].dialogs.conflict.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="running"].dialogs.conflict.warning.text*: string
experimentFlows[string][mode="running"].dialogs.conflict.warning.text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.confirmLabel*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.confirmLabel[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].kind: "done"
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.conflict.completion[kind="close"].kind: "close"
experimentFlows[string][mode="running"].dialogs.conflict.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.conflict.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.id: string
experimentFlows[string][mode="running"].dialogs.intervene.title*: string
experimentFlows[string][mode="running"].dialogs.intervene.title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.subtitle*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.subtitle[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].text*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].key: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].label*: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="running"].dialogs.intervene.fields[][kind="code"].code: string
experimentFlows[string][mode="running"].dialogs.intervene.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="running"].dialogs.intervene.warning.text*: string
experimentFlows[string][mode="running"].dialogs.intervene.warning.text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.confirmLabel*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.confirmLabel[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].kind: "done"
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.intervene.completion[kind="close"].kind: "close"
experimentFlows[string][mode="running"].dialogs.intervene.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.intervene.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.id: string
experimentFlows[string][mode="running"].dialogs.logs.title*: string
experimentFlows[string][mode="running"].dialogs.logs.title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.subtitle*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.subtitle[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].text*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].key: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].label*: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="running"].dialogs.logs.fields[][kind="code"].code: string
experimentFlows[string][mode="running"].dialogs.logs.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="running"].dialogs.logs.warning.text*: string
experimentFlows[string][mode="running"].dialogs.logs.warning.text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.confirmLabel*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.confirmLabel[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].kind: "done"
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.logs.completion[kind="close"].kind: "close"
experimentFlows[string][mode="running"].dialogs.logs.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.logs.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.id: string
experimentFlows[string][mode="running"].dialogs.pause.title*: string
experimentFlows[string][mode="running"].dialogs.pause.title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.subtitle*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.subtitle[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].text*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].key: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].label*: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="running"].dialogs.pause.fields[][kind="code"].code: string
experimentFlows[string][mode="running"].dialogs.pause.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="running"].dialogs.pause.warning.text*: string
experimentFlows[string][mode="running"].dialogs.pause.warning.text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.confirmLabel*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.confirmLabel[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].kind: "done"
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.pause.completion[kind="close"].kind: "close"
experimentFlows[string][mode="running"].dialogs.pause.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.pause.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.id: string
experimentFlows[string][mode="running"].dialogs.truncate.title*: string
experimentFlows[string][mode="running"].dialogs.truncate.title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.subtitle*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.subtitle[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].text*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].key: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].label*: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="running"].dialogs.truncate.fields[][kind="code"].code: string
experimentFlows[string][mode="running"].dialogs.truncate.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="running"].dialogs.truncate.warning.text*: string
experimentFlows[string][mode="running"].dialogs.truncate.warning.text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.confirmLabel*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.confirmLabel[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].kind: "done"
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.truncate.completion[kind="close"].kind: "close"
experimentFlows[string][mode="running"].dialogs.truncate.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.truncate.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.id: string
experimentFlows[string][mode="running"].dialogs.waiting.title*: string
experimentFlows[string][mode="running"].dialogs.waiting.title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.subtitle*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.subtitle[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].text*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].key: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].label*: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="running"].dialogs.waiting.fields[][kind="code"].code: string
experimentFlows[string][mode="running"].dialogs.waiting.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="running"].dialogs.waiting.warning.text*: string
experimentFlows[string][mode="running"].dialogs.waiting.warning.text[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.confirmLabel*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.confirmLabel[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].kind: "done"
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="running"].dialogs.waiting.completion[kind="close"].kind: "close"
experimentFlows[string][mode="running"].dialogs.waiting.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="running"].dialogs.waiting.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="ended"].ai.sessions[].name*: string
experimentFlows[string][mode="ended"].ai.sessions[].name[LabText].en: string
experimentFlows[string][mode="ended"].ai.sessions[].name[LabText].zh-CN: string
experimentFlows[string][mode="ended"].ai.sessions[].meta*: string
experimentFlows[string][mode="ended"].ai.sessions[].meta[LabText].en: string
experimentFlows[string][mode="ended"].ai.sessions[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="user"].kind: "user"
experimentFlows[string][mode="ended"].ai.seed[][kind="user"].text*: string
experimentFlows[string][mode="ended"].ai.seed[][kind="user"].text[LabText].en: string
experimentFlows[string][mode="ended"].ai.seed[][kind="user"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].kind: "assistant"
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].text*: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].text[LabText].en: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
experimentFlows[string][mode="ended"].ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
experimentFlows[string][mode="ended"].ai.prompts[]*: string
experimentFlows[string][mode="ended"].ai.prompts[][LabText].en: string
experimentFlows[string][mode="ended"].ai.prompts[][LabText].zh-CN: string
experimentFlows[string][mode="ended"].ai.reply.en: string
experimentFlows[string][mode="ended"].ai.reply.zh-CN: string
experimentFlows[string][mode="ended"].ai.placeholder.en: string
experimentFlows[string][mode="ended"].ai.placeholder.zh-CN: string
experimentFlows[string][mode="ended"].ai.subtitle.en: string
experimentFlows[string][mode="ended"].ai.subtitle.zh-CN: string
experimentFlows[string][mode="ended"].ai.scope.label.en: string
experimentFlows[string][mode="ended"].ai.scope.label.zh-CN: string
experimentFlows[string][mode="ended"].ai.scope.value*: string
experimentFlows[string][mode="ended"].ai.scope.value[LabText].en: string
experimentFlows[string][mode="ended"].ai.scope.value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].runId: string
experimentFlows[string][mode="ended"].title*: string
experimentFlows[string][mode="ended"].title[LabText].en: string
experimentFlows[string][mode="ended"].title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].description*: string
experimentFlows[string][mode="ended"].description[LabText].en: string
experimentFlows[string][mode="ended"].description[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].instanceId: string
experimentFlows[string][mode="ended"].nodes[].nodeId: string
experimentFlows[string][mode="ended"].nodes[].libraryId: string  // The library function the node calls.
experimentFlows[string][mode="ended"].nodes[].name*: string
experimentFlows[string][mode="ended"].nodes[].name[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].name[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].device*: string  // Empty when the node's execution site is unknown (an aborted call, a human slot).
experimentFlows[string][mode="ended"].nodes[].device[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].device[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].lane: number  // y = top + lane * laneHeight.
experimentFlows[string][mode="ended"].nodes[].dependencyColumn: number  // Draft x = padding + dependencyColumn * columnWidth.
experimentFlows[string][mode="ended"].nodes[].from[]: string
experimentFlows[string][mode="ended"].nodes[].origin: "ai_suggestion" | "plan"
experimentFlows[string][mode="ended"].nodes[].status: FlowNodeStatus
experimentFlows[string][mode="ended"].nodes[].timing[kind="interval"].kind: "interval"
experimentFlows[string][mode="ended"].nodes[].timing[kind="interval"].startMinute: number
experimentFlows[string][mode="ended"].nodes[].timing[kind="interval"].endMinute: number
experimentFlows[string][mode="ended"].nodes[].timing[kind="estimate"].kind: "estimate"
experimentFlows[string][mode="ended"].nodes[].timing[kind="estimate"].durationMinutes: number | null  (nullable)
experimentFlows[string][mode="ended"].nodes[].tableVerdict.text*: string
experimentFlows[string][mode="ended"].nodes[].tableVerdict.text[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].tableVerdict.text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].tableVerdict.signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].label*: string
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].label[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].value*: string
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].value[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].format: "literal" | "text"
experimentFlows[string][mode="ended"].nodes[].detail.parameters[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].label*: string
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].label[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].value*: string
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].value[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].format: "literal" | "text"
experimentFlows[string][mode="ended"].nodes[].detail.artifactsAndSignals[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].label*: string
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].label[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].value*: string
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].value[LabText].en: string
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].format: "literal" | "text"
experimentFlows[string][mode="ended"].nodes[].detail.verdict[].signal: LabSignal | undefined  (optional)
experimentFlows[string][mode="ended"].arms[].lane: number
experimentFlows[string][mode="ended"].arms[].label*: string
experimentFlows[string][mode="ended"].arms[].label[LabText].en: string
experimentFlows[string][mode="ended"].arms[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].columns[]*: string
experimentFlows[string][mode="ended"].columns[][LabText].en: string
experimentFlows[string][mode="ended"].columns[][LabText].zh-CN: string
experimentFlows[string][mode="ended"].artifactContracts[].libraryId: string
experimentFlows[string][mode="ended"].artifactContracts[].files[]: string
experimentFlows[string][mode="ended"].selectedInstanceId: string | null  (nullable)  // Null when the flow has no node.
experimentFlows[string][mode="ended"].derivedFrom.run: string  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="input"].kind: "input"  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="input"].position: number  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="input"].name: string  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="input"].value: string  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="version"].kind: "version"  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="version"].fn: string  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="version"].from: string  (nullable parent)
experimentFlows[string][mode="ended"].derivedFrom.changes[][kind="version"].to: string  (nullable parent)
experimentFlows[string][mode="ended"].rewoundTo: number | null  (nullable)  // The graph shown is the one at this event sequence (`at`), not the latest.
experimentFlows[string][mode="ended"].comparison.a: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.b: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="same"].kind: "same"  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="same"].subject: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="changed"].kind: "changed"  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="changed"].subject: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="changed"].fields[].field: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="changed"].fields[].a: string | null  (nullable) (nullable parent)  // Display text of each side's value; null when the field is absent on that side.
experimentFlows[string][mode="ended"].comparison.pairs[][kind="changed"].fields[].b: string | null  (nullable) (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="aborted"].kind: "aborted"  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="aborted"].subject: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="aborted"].side: "a" | "b" | "both"  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind∈"only_a"|"only_b"].kind: "only_a" | "only_b"  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind∈"only_a"|"only_b"].subject: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="ambiguous"].kind: "ambiguous"  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="ambiguous"].subject: string  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="ambiguous"].a: number  (nullable parent)
experimentFlows[string][mode="ended"].comparison.pairs[][kind="ambiguous"].b: number  (nullable parent)
experimentFlows[string][mode="ended"].workspace.step: number  (nullable parent)
experimentFlows[string][mode="ended"].workspace.position: number  (nullable parent)
experimentFlows[string][mode="ended"].workspace.files[].path: string  (nullable parent)
experimentFlows[string][mode="ended"].workspace.files[].size: number  (nullable parent)
experimentFlows[string][mode="ended"].workspace.files[].content: string  (nullable parent)
experimentFlows[string][mode="ended"].mode: "ended"
experimentFlows[string][mode="ended"].commits[].seq: any
experimentFlows[string][mode="ended"].commits[].minute: number
experimentFlows[string][mode="ended"].axisSpan.lastStartMinute: number
experimentFlows[string][mode="ended"].axisSpan.endMinute: number
experimentFlows[string][mode="ended"].clockStart.hour: number
experimentFlows[string][mode="ended"].clockStart.minute: number
experimentFlows[string][mode="ended"].retro.endedLabel*: string
experimentFlows[string][mode="ended"].retro.endedLabel[LabText].en: string
experimentFlows[string][mode="ended"].retro.endedLabel[LabText].zh-CN: string
experimentFlows[string][mode="ended"].retro.finishKind: "aborted" | "natural"
experimentFlows[string][mode="ended"].retro.verdict*: string | null  (nullable)  // No source for verdicts in the first version (D12).
experimentFlows[string][mode="ended"].retro.verdict[LabText].en: string  (nullable parent)
experimentFlows[string][mode="ended"].retro.verdict[LabText].zh-CN: string  (nullable parent)
experimentFlows[string][mode="ended"].retro.totalMinutes: number | null  (nullable)  // Whole-run facts, not derived from the displayed excerpt of the timeline/contracts.
experimentFlows[string][mode="ended"].retro.artifactCount: number
experimentFlows[string][mode="ended"].retro.failedVerdictCount: number | null  (nullable)
experimentFlows[string][mode="ended"].retro.interventionCount: number  // Committed human calls.
experimentFlows[string][mode="ended"].dialogs.artifacts.id: string
experimentFlows[string][mode="ended"].dialogs.artifacts.title*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.subtitle*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.subtitle[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].text*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].key: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].label*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="ended"].dialogs.artifacts.fields[][kind="code"].code: string
experimentFlows[string][mode="ended"].dialogs.artifacts.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="ended"].dialogs.artifacts.warning.text*: string
experimentFlows[string][mode="ended"].dialogs.artifacts.warning.text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.confirmLabel*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.confirmLabel[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].kind: "done"
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.artifacts.completion[kind="close"].kind: "close"
experimentFlows[string][mode="ended"].dialogs.artifacts.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.artifacts.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.id: string
experimentFlows[string][mode="ended"].dialogs.cite.title*: string
experimentFlows[string][mode="ended"].dialogs.cite.title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.subtitle*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.subtitle[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].text*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].key: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].label*: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="ended"].dialogs.cite.fields[][kind="code"].code: string
experimentFlows[string][mode="ended"].dialogs.cite.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="ended"].dialogs.cite.warning.text*: string
experimentFlows[string][mode="ended"].dialogs.cite.warning.text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.confirmLabel*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.confirmLabel[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].kind: "done"
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.cite.completion[kind="close"].kind: "close"
experimentFlows[string][mode="ended"].dialogs.cite.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.cite.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.id: string
experimentFlows[string][mode="ended"].dialogs.export.title*: string
experimentFlows[string][mode="ended"].dialogs.export.title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.subtitle*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.subtitle[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].text*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].key: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].label*: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="ended"].dialogs.export.fields[][kind="code"].code: string
experimentFlows[string][mode="ended"].dialogs.export.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="ended"].dialogs.export.warning.text*: string
experimentFlows[string][mode="ended"].dialogs.export.warning.text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.confirmLabel*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.confirmLabel[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].kind: "done"
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.export.completion[kind="close"].kind: "close"
experimentFlows[string][mode="ended"].dialogs.export.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.export.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.id: string
experimentFlows[string][mode="ended"].dialogs.follow_up.title*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.subtitle*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.subtitle[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].text*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].key: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].label*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="ended"].dialogs.follow_up.fields[][kind="code"].code: string
experimentFlows[string][mode="ended"].dialogs.follow_up.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="ended"].dialogs.follow_up.warning.text*: string
experimentFlows[string][mode="ended"].dialogs.follow_up.warning.text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.confirmLabel*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.confirmLabel[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].kind: "done"
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.follow_up.completion[kind="close"].kind: "close"
experimentFlows[string][mode="ended"].dialogs.follow_up.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.follow_up.labelColumn: "aligned" | "none" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.id: string
experimentFlows[string][mode="ended"].dialogs.retro_report.title*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.subtitle*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.subtitle[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.subtitle[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].kind: "text"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="text"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].kind: "area"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].placeholder*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].placeholder[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].placeholder[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].value*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].value[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].value[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="area"].rows: number | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].kind: "segmented"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="segmented"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].kind: "choice"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="choice"].value: string | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].kind: "multi"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].id: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].meta*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].meta[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="multi"].value[]: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].kind: "toggle"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].onText*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].onText[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].onText[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="toggle"].value: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].kind: "info"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].text*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="info"].mono: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].key: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].label*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].label[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].label[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].hint*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].hint[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].hint[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].kind: "code"
experimentFlows[string][mode="ended"].dialogs.retro_report.fields[][kind="code"].code: string
experimentFlows[string][mode="ended"].dialogs.retro_report.warning.tone: "danger" | "neutral"
experimentFlows[string][mode="ended"].dialogs.retro_report.warning.text*: string
experimentFlows[string][mode="ended"].dialogs.retro_report.warning.text[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.warning.text[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.tone: "danger" | "default" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.confirmLabel*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.confirmLabel[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.confirmLabel[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.hasCancel: boolean | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].kind: "done"
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].title*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].title[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].title[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].detail*: string  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].detail[LabText].en: string
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="done"].detail[LabText].zh-CN: string
experimentFlows[string][mode="ended"].dialogs.retro_report.completion[kind="close"].kind: "close"
experimentFlows[string][mode="ended"].dialogs.retro_report.size: "lg" | "md" | "xl" | undefined  (optional)
experimentFlows[string][mode="ended"].dialogs.retro_report.labelColumn: "aligned" | "none" | undefined  (optional)
```

### `flowEditor` — FlowEditorFixture

> `/experiments/$runId/edit`

```
flowEditor.ai.sessions[].name*: string
flowEditor.ai.sessions[].name[LabText].en: string
flowEditor.ai.sessions[].name[LabText].zh-CN: string
flowEditor.ai.sessions[].meta*: string
flowEditor.ai.sessions[].meta[LabText].en: string
flowEditor.ai.sessions[].meta[LabText].zh-CN: string
flowEditor.ai.seed[][kind="user"].kind: "user"
flowEditor.ai.seed[][kind="user"].text*: string
flowEditor.ai.seed[][kind="user"].text[LabText].en: string
flowEditor.ai.seed[][kind="user"].text[LabText].zh-CN: string
flowEditor.ai.seed[][kind="assistant"].kind: "assistant"
flowEditor.ai.seed[][kind="assistant"].text*: string
flowEditor.ai.seed[][kind="assistant"].text[LabText].en: string
flowEditor.ai.seed[][kind="assistant"].text[LabText].zh-CN: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
flowEditor.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
flowEditor.ai.prompts[]*: string
flowEditor.ai.prompts[][LabText].en: string
flowEditor.ai.prompts[][LabText].zh-CN: string
flowEditor.ai.reply.en: string
flowEditor.ai.reply.zh-CN: string
flowEditor.ai.placeholder.en: string
flowEditor.ai.placeholder.zh-CN: string
flowEditor.ai.subtitle.en: string
flowEditor.ai.subtitle.zh-CN: string
flowEditor.ai.scope.label.en: string
flowEditor.ai.scope.label.zh-CN: string
flowEditor.ai.scope.value*: string
flowEditor.ai.scope.value[LabText].en: string
flowEditor.ai.scope.value[LabText].zh-CN: string
flowEditor.dialogs.save.id: string
flowEditor.dialogs.save.title*: string
flowEditor.dialogs.save.title[LabText].en: string
flowEditor.dialogs.save.title[LabText].zh-CN: string
flowEditor.dialogs.save.subtitle*: string  (optional)
flowEditor.dialogs.save.subtitle[LabText].en: string
flowEditor.dialogs.save.subtitle[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="text"].key: string
flowEditor.dialogs.save.fields[][kind="text"].label*: string
flowEditor.dialogs.save.fields[][kind="text"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="text"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="text"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="text"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="text"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="text"].kind: "text"
flowEditor.dialogs.save.fields[][kind="text"].placeholder*: string  (optional)
flowEditor.dialogs.save.fields[][kind="text"].placeholder[LabText].en: string
flowEditor.dialogs.save.fields[][kind="text"].placeholder[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="text"].value*: string  (optional)
flowEditor.dialogs.save.fields[][kind="text"].value[LabText].en: string
flowEditor.dialogs.save.fields[][kind="text"].value[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="text"].mono: boolean | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="area"].key: string
flowEditor.dialogs.save.fields[][kind="area"].label*: string
flowEditor.dialogs.save.fields[][kind="area"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="area"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="area"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="area"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="area"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="area"].kind: "area"
flowEditor.dialogs.save.fields[][kind="area"].placeholder*: string  (optional)
flowEditor.dialogs.save.fields[][kind="area"].placeholder[LabText].en: string
flowEditor.dialogs.save.fields[][kind="area"].placeholder[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="area"].value*: string  (optional)
flowEditor.dialogs.save.fields[][kind="area"].value[LabText].en: string
flowEditor.dialogs.save.fields[][kind="area"].value[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="area"].mono: boolean | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="area"].rows: number | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="segmented"].key: string
flowEditor.dialogs.save.fields[][kind="segmented"].label*: string
flowEditor.dialogs.save.fields[][kind="segmented"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="segmented"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="segmented"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="segmented"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="segmented"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="segmented"].kind: "segmented"
flowEditor.dialogs.save.fields[][kind="segmented"].options[].id: string
flowEditor.dialogs.save.fields[][kind="segmented"].options[].label*: string
flowEditor.dialogs.save.fields[][kind="segmented"].options[].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="segmented"].options[].meta*: string  (optional)
flowEditor.dialogs.save.fields[][kind="segmented"].options[].meta[LabText].en: string
flowEditor.dialogs.save.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="segmented"].value: string | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="choice"].key: string
flowEditor.dialogs.save.fields[][kind="choice"].label*: string
flowEditor.dialogs.save.fields[][kind="choice"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="choice"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="choice"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="choice"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="choice"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="choice"].kind: "choice"
flowEditor.dialogs.save.fields[][kind="choice"].options[].id: string
flowEditor.dialogs.save.fields[][kind="choice"].options[].label*: string
flowEditor.dialogs.save.fields[][kind="choice"].options[].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="choice"].options[].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="choice"].options[].meta*: string  (optional)
flowEditor.dialogs.save.fields[][kind="choice"].options[].meta[LabText].en: string
flowEditor.dialogs.save.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="choice"].value: string | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="multi"].key: string
flowEditor.dialogs.save.fields[][kind="multi"].label*: string
flowEditor.dialogs.save.fields[][kind="multi"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="multi"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="multi"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="multi"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="multi"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="multi"].kind: "multi"
flowEditor.dialogs.save.fields[][kind="multi"].options[].id: string
flowEditor.dialogs.save.fields[][kind="multi"].options[].label*: string
flowEditor.dialogs.save.fields[][kind="multi"].options[].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="multi"].options[].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="multi"].options[].meta*: string  (optional)
flowEditor.dialogs.save.fields[][kind="multi"].options[].meta[LabText].en: string
flowEditor.dialogs.save.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="multi"].value[]: string
flowEditor.dialogs.save.fields[][kind="toggle"].key: string
flowEditor.dialogs.save.fields[][kind="toggle"].label*: string
flowEditor.dialogs.save.fields[][kind="toggle"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="toggle"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="toggle"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="toggle"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="toggle"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="toggle"].kind: "toggle"
flowEditor.dialogs.save.fields[][kind="toggle"].onText*: string
flowEditor.dialogs.save.fields[][kind="toggle"].onText[LabText].en: string
flowEditor.dialogs.save.fields[][kind="toggle"].onText[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="toggle"].value: boolean | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="info"].key: string
flowEditor.dialogs.save.fields[][kind="info"].label*: string
flowEditor.dialogs.save.fields[][kind="info"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="info"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="info"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="info"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="info"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="info"].kind: "info"
flowEditor.dialogs.save.fields[][kind="info"].text*: string
flowEditor.dialogs.save.fields[][kind="info"].text[LabText].en: string
flowEditor.dialogs.save.fields[][kind="info"].text[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="info"].mono: boolean | undefined  (optional)
flowEditor.dialogs.save.fields[][kind="code"].key: string
flowEditor.dialogs.save.fields[][kind="code"].label*: string
flowEditor.dialogs.save.fields[][kind="code"].label[LabText].en: string
flowEditor.dialogs.save.fields[][kind="code"].label[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="code"].hint*: string  (optional)
flowEditor.dialogs.save.fields[][kind="code"].hint[LabText].en: string
flowEditor.dialogs.save.fields[][kind="code"].hint[LabText].zh-CN: string
flowEditor.dialogs.save.fields[][kind="code"].kind: "code"
flowEditor.dialogs.save.fields[][kind="code"].code: string
flowEditor.dialogs.save.warning.tone: "danger" | "neutral"
flowEditor.dialogs.save.warning.text*: string
flowEditor.dialogs.save.warning.text[LabText].en: string
flowEditor.dialogs.save.warning.text[LabText].zh-CN: string
flowEditor.dialogs.save.tone: "danger" | "default" | undefined  (optional)
flowEditor.dialogs.save.confirmLabel*: string  (optional)
flowEditor.dialogs.save.confirmLabel[LabText].en: string
flowEditor.dialogs.save.confirmLabel[LabText].zh-CN: string
flowEditor.dialogs.save.hasCancel: boolean | undefined  (optional)
flowEditor.dialogs.save.completion[kind="done"].kind: "done"
flowEditor.dialogs.save.completion[kind="done"].title*: string  (optional)
flowEditor.dialogs.save.completion[kind="done"].title[LabText].en: string
flowEditor.dialogs.save.completion[kind="done"].title[LabText].zh-CN: string
flowEditor.dialogs.save.completion[kind="done"].detail*: string  (optional)
flowEditor.dialogs.save.completion[kind="done"].detail[LabText].en: string
flowEditor.dialogs.save.completion[kind="done"].detail[LabText].zh-CN: string
flowEditor.dialogs.save.completion[kind="close"].kind: "close"
flowEditor.dialogs.save.size: "lg" | "md" | "xl" | undefined  (optional)
flowEditor.dialogs.save.labelColumn: "aligned" | "none" | undefined  (optional)
flowEditor.runId: string
flowEditor.projectId: string
flowEditor.title*: string
flowEditor.title[LabText].en: string
flowEditor.title[LabText].zh-CN: string
flowEditor.origin.discussionId: string
flowEditor.origin.retroRunId: string | null  (nullable)
flowEditor.origin.description*: string
flowEditor.origin.description[LabText].en: string
flowEditor.origin.description[LabText].zh-CN: string
flowEditor.palette[][group∈"char"|"dev"].id: string
flowEditor.palette[][group∈"char"|"dev"].name*: string
flowEditor.palette[][group∈"char"|"dev"].name[LabText].en: string
flowEditor.palette[][group∈"char"|"dev"].name[LabText].zh-CN: string
flowEditor.palette[][group∈"char"|"dev"].device*: string
flowEditor.palette[][group∈"char"|"dev"].device[LabText].en: string
flowEditor.palette[][group∈"char"|"dev"].device[LabText].zh-CN: string
flowEditor.palette[][group∈"char"|"dev"].durationMinutes: number
flowEditor.palette[][group∈"char"|"dev"].availability[kind="ok"].kind: "ok"
flowEditor.palette[][group∈"char"|"dev"].availability[kind="busy"].kind: "busy"
flowEditor.palette[][group∈"char"|"dev"].availability[kind="busy"].runId: string
flowEditor.palette[][group∈"char"|"dev"].availability[kind="queued"].kind: "queued"
flowEditor.palette[][group∈"char"|"dev"].availability[kind="queued"].runId: string
flowEditor.palette[][group∈"char"|"dev"].parameters[].label*: string
flowEditor.palette[][group∈"char"|"dev"].parameters[].label[LabText].en: string
flowEditor.palette[][group∈"char"|"dev"].parameters[].label[LabText].zh-CN: string
flowEditor.palette[][group∈"char"|"dev"].parameters[].value*: string
flowEditor.palette[][group∈"char"|"dev"].parameters[].value[LabText].en: string
flowEditor.palette[][group∈"char"|"dev"].parameters[].value[LabText].zh-CN: string
flowEditor.palette[][group∈"char"|"dev"].output: string
flowEditor.palette[][group∈"char"|"dev"].group: "char" | "dev"
flowEditor.palette[][group="calc"].id: string
flowEditor.palette[][group="calc"].name*: string
flowEditor.palette[][group="calc"].name[LabText].en: string
flowEditor.palette[][group="calc"].name[LabText].zh-CN: string
flowEditor.palette[][group="calc"].device*: string
flowEditor.palette[][group="calc"].device[LabText].en: string
flowEditor.palette[][group="calc"].device[LabText].zh-CN: string
flowEditor.palette[][group="calc"].durationMinutes: number
flowEditor.palette[][group="calc"].availability[kind="ok"].kind: "ok"
flowEditor.palette[][group="calc"].availability[kind="busy"].kind: "busy"
flowEditor.palette[][group="calc"].availability[kind="busy"].runId: string
flowEditor.palette[][group="calc"].availability[kind="queued"].kind: "queued"
flowEditor.palette[][group="calc"].availability[kind="queued"].runId: string
flowEditor.palette[][group="calc"].parameters[].label*: string
flowEditor.palette[][group="calc"].parameters[].label[LabText].en: string
flowEditor.palette[][group="calc"].parameters[].label[LabText].zh-CN: string
flowEditor.palette[][group="calc"].parameters[].value*: string
flowEditor.palette[][group="calc"].parameters[].value[LabText].en: string
flowEditor.palette[][group="calc"].parameters[].value[LabText].zh-CN: string
flowEditor.palette[][group="calc"].output: string
flowEditor.palette[][group="calc"].group: "calc"
flowEditor.palette[][group="calc"].computeCluster: string
flowEditor.nodes[].instanceId: string
flowEditor.nodes[].libraryId: string
flowEditor.nodes[].column: number  // x = column * columnWidth + padding; y = top + lane * laneHeight.
flowEditor.nodes[].lane: number
flowEditor.nodes[].from[]: string
flowEditor.nodes[].parameterOverrides[].parameterIndex: number
flowEditor.nodes[].parameterOverrides[].value*: string
flowEditor.nodes[].parameterOverrides[].value[LabText].en: string
flowEditor.nodes[].parameterOverrides[].value[LabText].zh-CN: string
flowEditor.columns[].index: number
flowEditor.columns[].name*: string
flowEditor.columns[].name[LabText].en: string
flowEditor.columns[].name[LabText].zh-CN: string
flowEditor.selectedInstanceId: string | null  (nullable)
flowEditor.suggestedLibraryIds[]: string
flowEditor.savedLabel*: string
flowEditor.savedLabel[LabText].en: string
flowEditor.savedLabel[LabText].zh-CN: string
flowEditor.savedVersion: number
flowEditor.launch: "awaiting_approval" | "bound" | "none" | "sent"
```

### `nodeLibrary` — NodeLibraryFixture

> `/experiments/nodes`

```
nodeLibrary.ai.sessions[].name*: string
nodeLibrary.ai.sessions[].name[LabText].en: string
nodeLibrary.ai.sessions[].name[LabText].zh-CN: string
nodeLibrary.ai.sessions[].meta*: string
nodeLibrary.ai.sessions[].meta[LabText].en: string
nodeLibrary.ai.sessions[].meta[LabText].zh-CN: string
nodeLibrary.ai.seed[][kind="user"].kind: "user"
nodeLibrary.ai.seed[][kind="user"].text*: string
nodeLibrary.ai.seed[][kind="user"].text[LabText].en: string
nodeLibrary.ai.seed[][kind="user"].text[LabText].zh-CN: string
nodeLibrary.ai.seed[][kind="assistant"].kind: "assistant"
nodeLibrary.ai.seed[][kind="assistant"].text*: string
nodeLibrary.ai.seed[][kind="assistant"].text[LabText].en: string
nodeLibrary.ai.seed[][kind="assistant"].text[LabText].zh-CN: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
nodeLibrary.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
nodeLibrary.ai.prompts[]*: string
nodeLibrary.ai.prompts[][LabText].en: string
nodeLibrary.ai.prompts[][LabText].zh-CN: string
nodeLibrary.ai.reply.en: string
nodeLibrary.ai.reply.zh-CN: string
nodeLibrary.ai.placeholder.en: string
nodeLibrary.ai.placeholder.zh-CN: string
nodeLibrary.ai.subtitle.en: string
nodeLibrary.ai.subtitle.zh-CN: string
nodeLibrary.ai.scope.label.en: string
nodeLibrary.ai.scope.label.zh-CN: string
nodeLibrary.ai.scope.value*: string
nodeLibrary.ai.scope.value[LabText].en: string
nodeLibrary.ai.scope.value[LabText].zh-CN: string
nodeLibrary.definitions[].id: string
nodeLibrary.definitions[].group: NodeGroup
nodeLibrary.definitions[].name*: string
nodeLibrary.definitions[].name[LabText].en: string
nodeLibrary.definitions[].name[LabText].zh-CN: string
nodeLibrary.definitions[].device*: string | null  (nullable)
nodeLibrary.definitions[].device[LabText].en: string  (nullable parent)
nodeLibrary.definitions[].device[LabText].zh-CN: string  (nullable parent)
nodeLibrary.definitions[].usageCount: number  // Sum of usage calls, not the number of referenced runs.
nodeLibrary.definitions[].duration*: string
nodeLibrary.definitions[].duration[LabText].en: string
nodeLibrary.definitions[].duration[LabText].zh-CN: string
nodeLibrary.definitions[].image: string | null  (nullable)
nodeLibrary.definitions[].cluster: string | null  (nullable)
nodeLibrary.definitions[].devicePath: string | null  (nullable)
nodeLibrary.definitions[].mounts[].path: string
nodeLibrary.definitions[].mounts[].access: "device" | "ro" | "rw"
nodeLibrary.definitions[].inputs[]*: string
nodeLibrary.definitions[].inputs[][LabText].en: string
nodeLibrary.definitions[].inputs[][LabText].zh-CN: string
nodeLibrary.definitions[].parameters[].label*: string
nodeLibrary.definitions[].parameters[].label[LabText].en: string
nodeLibrary.definitions[].parameters[].label[LabText].zh-CN: string
nodeLibrary.definitions[].parameters[].value*: string | null  (nullable)
nodeLibrary.definitions[].parameters[].value[LabText].en: string  (nullable parent)
nodeLibrary.definitions[].parameters[].value[LabText].zh-CN: string  (nullable parent)
nodeLibrary.definitions[].parameters[].type: string
nodeLibrary.definitions[].parameters[].optional: boolean
nodeLibrary.definitions[].signature: string
nodeLibrary.definitions[].returns: string
nodeLibrary.definitions[].fields[].name: string
nodeLibrary.definitions[].fields[].type: string
nodeLibrary.definitions[].body.kind: "Agent" | "Human" | "Program"
nodeLibrary.definitions[].body.source: string
nodeLibrary.definitions[].defaultEnvironment: string | null  (nullable)
nodeLibrary.definitions[].template: string | null  (nullable)
nodeLibrary.definitions[].path: string
nodeLibrary.definitions[].artifactContract[].file: string
nodeLibrary.definitions[].artifactContract[].requirement: "required"
nodeLibrary.definitions[].criteria[]*: string
nodeLibrary.definitions[].criteria[][LabText].en: string
nodeLibrary.definitions[].criteria[][LabText].zh-CN: string
nodeLibrary.selectedDefinitionId: string | null  (nullable)
nodeLibrary.library.commit: string
nodeLibrary.library.sequence: number
nodeLibrary.editScope[]: string
nodeLibrary.stagedChanges[].nodeId: string
nodeLibrary.stagedChanges[].changes[][kind="add"].section: "container" | "contract" | "criteria" | "params" | "signature"
nodeLibrary.stagedChanges[].changes[][kind="add"].key*: string
nodeLibrary.stagedChanges[].changes[][kind="add"].key[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="add"].key[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="add"].why*: string
nodeLibrary.stagedChanges[].changes[][kind="add"].why[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="add"].why[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="add"].kind: "add"
nodeLibrary.stagedChanges[].changes[][kind="add"].new*: string
nodeLibrary.stagedChanges[].changes[][kind="add"].new[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="add"].new[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="change"].section: "container" | "contract" | "criteria" | "params" | "signature"
nodeLibrary.stagedChanges[].changes[][kind="change"].key*: string
nodeLibrary.stagedChanges[].changes[][kind="change"].key[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="change"].key[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="change"].why*: string
nodeLibrary.stagedChanges[].changes[][kind="change"].why[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="change"].why[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="change"].kind: "change"
nodeLibrary.stagedChanges[].changes[][kind="change"].old*: string
nodeLibrary.stagedChanges[].changes[][kind="change"].old[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="change"].old[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="change"].new*: string
nodeLibrary.stagedChanges[].changes[][kind="change"].new[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="change"].new[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].section: "container" | "contract" | "criteria" | "params" | "signature"
nodeLibrary.stagedChanges[].changes[][kind="remove"].key*: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].key[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].key[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].why*: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].why[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].why[LabText].zh-CN: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].kind: "remove"
nodeLibrary.stagedChanges[].changes[][kind="remove"].old*: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].old[LabText].en: string
nodeLibrary.stagedChanges[].changes[][kind="remove"].old[LabText].zh-CN: string
nodeLibrary.experimentReferences[][kind="catalog_run"].fn: string
nodeLibrary.experimentReferences[][kind="catalog_run"].name*: string | null  (nullable)
nodeLibrary.experimentReferences[][kind="catalog_run"].name[LabText].en: string  (nullable parent)
nodeLibrary.experimentReferences[][kind="catalog_run"].name[LabText].zh-CN: string  (nullable parent)
nodeLibrary.experimentReferences[][kind="catalog_run"].status: ExperimentStatus
nodeLibrary.experimentReferences[][kind="catalog_run"].stateText*: string
nodeLibrary.experimentReferences[][kind="catalog_run"].stateText[LabText].en: string
nodeLibrary.experimentReferences[][kind="catalog_run"].stateText[LabText].zh-CN: string
nodeLibrary.experimentReferences[][kind="catalog_run"].description*: string
nodeLibrary.experimentReferences[][kind="catalog_run"].description[LabText].en: string
nodeLibrary.experimentReferences[][kind="catalog_run"].description[LabText].zh-CN: string
nodeLibrary.experimentReferences[][kind="catalog_run"].kind: "catalog_run"
nodeLibrary.experimentReferences[][kind="catalog_run"].runId: string
nodeLibrary.experimentReferences[][kind="catalog_run"].calls: number
nodeLibrary.experimentReferences[][kind="catalog_run"].versions[]: string
nodeLibrary.experimentReferences[][kind="page_draft"].fn: string
nodeLibrary.experimentReferences[][kind="page_draft"].name*: string | null  (nullable)
nodeLibrary.experimentReferences[][kind="page_draft"].name[LabText].en: string  (nullable parent)
nodeLibrary.experimentReferences[][kind="page_draft"].name[LabText].zh-CN: string  (nullable parent)
nodeLibrary.experimentReferences[][kind="page_draft"].status: ExperimentStatus
nodeLibrary.experimentReferences[][kind="page_draft"].stateText*: string
nodeLibrary.experimentReferences[][kind="page_draft"].stateText[LabText].en: string
nodeLibrary.experimentReferences[][kind="page_draft"].stateText[LabText].zh-CN: string
nodeLibrary.experimentReferences[][kind="page_draft"].description*: string
nodeLibrary.experimentReferences[][kind="page_draft"].description[LabText].en: string
nodeLibrary.experimentReferences[][kind="page_draft"].description[LabText].zh-CN: string
nodeLibrary.experimentReferences[][kind="page_draft"].kind: "page_draft"
nodeLibrary.experimentReferences[][kind="page_draft"].runId: string
nodeLibrary.impacts[].condition.scoped[]: string
nodeLibrary.impacts[].condition.hasLiveChanges[]: string
nodeLibrary.impacts[].condition.hasNoLiveChanges[]: string
nodeLibrary.impacts[].message*: string
nodeLibrary.impacts[].message[LabText].en: string
nodeLibrary.impacts[].message[LabText].zh-CN: string
```

### `automation` — AutomationFixture

> `/automation`

```
automation.manualRun.kind: "running"
automation.manualRun.time*: string
automation.manualRun.time[LabText].en: string
automation.manualRun.time[LabText].zh-CN: string
automation.manualRun.text*: string
automation.manualRun.text[LabText].en: string
automation.manualRun.text[LabText].zh-CN: string
automation.manualRun.sourceMemberId: string
automation.manualRun.duration: string
automation.ai.sessions[].name*: string
automation.ai.sessions[].name[LabText].en: string
automation.ai.sessions[].name[LabText].zh-CN: string
automation.ai.sessions[].meta*: string
automation.ai.sessions[].meta[LabText].en: string
automation.ai.sessions[].meta[LabText].zh-CN: string
automation.ai.seed[][kind="user"].kind: "user"
automation.ai.seed[][kind="user"].text*: string
automation.ai.seed[][kind="user"].text[LabText].en: string
automation.ai.seed[][kind="user"].text[LabText].zh-CN: string
automation.ai.seed[][kind="assistant"].kind: "assistant"
automation.ai.seed[][kind="assistant"].text*: string
automation.ai.seed[][kind="assistant"].text[LabText].en: string
automation.ai.seed[][kind="assistant"].text[LabText].zh-CN: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
automation.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
automation.ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
automation.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
automation.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
automation.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
automation.ai.prompts[]*: string
automation.ai.prompts[][LabText].en: string
automation.ai.prompts[][LabText].zh-CN: string
automation.ai.reply.en: string
automation.ai.reply.zh-CN: string
automation.ai.placeholder.en: string
automation.ai.placeholder.zh-CN: string
automation.ai.subtitle.en: string
automation.ai.subtitle.zh-CN: string
automation.ai.scope.label.en: string
automation.ai.scope.label.zh-CN: string
automation.ai.scope.value*: string
automation.ai.scope.value[LabText].en: string
automation.ai.scope.value[LabText].zh-CN: string
automation.dialogs.new_rule.id: string
automation.dialogs.new_rule.title*: string
automation.dialogs.new_rule.title[LabText].en: string
automation.dialogs.new_rule.title[LabText].zh-CN: string
automation.dialogs.new_rule.subtitle*: string  (optional)
automation.dialogs.new_rule.subtitle[LabText].en: string
automation.dialogs.new_rule.subtitle[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="text"].key: string
automation.dialogs.new_rule.fields[][kind="text"].label*: string
automation.dialogs.new_rule.fields[][kind="text"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="text"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="text"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="text"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="text"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="text"].kind: "text"
automation.dialogs.new_rule.fields[][kind="text"].placeholder*: string  (optional)
automation.dialogs.new_rule.fields[][kind="text"].placeholder[LabText].en: string
automation.dialogs.new_rule.fields[][kind="text"].placeholder[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="text"].value*: string  (optional)
automation.dialogs.new_rule.fields[][kind="text"].value[LabText].en: string
automation.dialogs.new_rule.fields[][kind="text"].value[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="text"].mono: boolean | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="area"].key: string
automation.dialogs.new_rule.fields[][kind="area"].label*: string
automation.dialogs.new_rule.fields[][kind="area"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="area"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="area"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="area"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="area"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="area"].kind: "area"
automation.dialogs.new_rule.fields[][kind="area"].placeholder*: string  (optional)
automation.dialogs.new_rule.fields[][kind="area"].placeholder[LabText].en: string
automation.dialogs.new_rule.fields[][kind="area"].placeholder[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="area"].value*: string  (optional)
automation.dialogs.new_rule.fields[][kind="area"].value[LabText].en: string
automation.dialogs.new_rule.fields[][kind="area"].value[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="area"].mono: boolean | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="area"].rows: number | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="segmented"].key: string
automation.dialogs.new_rule.fields[][kind="segmented"].label*: string
automation.dialogs.new_rule.fields[][kind="segmented"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="segmented"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="segmented"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="segmented"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="segmented"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="segmented"].kind: "segmented"
automation.dialogs.new_rule.fields[][kind="segmented"].options[].id: string
automation.dialogs.new_rule.fields[][kind="segmented"].options[].label*: string
automation.dialogs.new_rule.fields[][kind="segmented"].options[].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="segmented"].options[].meta*: string  (optional)
automation.dialogs.new_rule.fields[][kind="segmented"].options[].meta[LabText].en: string
automation.dialogs.new_rule.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="segmented"].value: string | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="choice"].key: string
automation.dialogs.new_rule.fields[][kind="choice"].label*: string
automation.dialogs.new_rule.fields[][kind="choice"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="choice"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="choice"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="choice"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="choice"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="choice"].kind: "choice"
automation.dialogs.new_rule.fields[][kind="choice"].options[].id: string
automation.dialogs.new_rule.fields[][kind="choice"].options[].label*: string
automation.dialogs.new_rule.fields[][kind="choice"].options[].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="choice"].options[].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="choice"].options[].meta*: string  (optional)
automation.dialogs.new_rule.fields[][kind="choice"].options[].meta[LabText].en: string
automation.dialogs.new_rule.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="choice"].value: string | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="multi"].key: string
automation.dialogs.new_rule.fields[][kind="multi"].label*: string
automation.dialogs.new_rule.fields[][kind="multi"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="multi"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="multi"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="multi"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="multi"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="multi"].kind: "multi"
automation.dialogs.new_rule.fields[][kind="multi"].options[].id: string
automation.dialogs.new_rule.fields[][kind="multi"].options[].label*: string
automation.dialogs.new_rule.fields[][kind="multi"].options[].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="multi"].options[].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="multi"].options[].meta*: string  (optional)
automation.dialogs.new_rule.fields[][kind="multi"].options[].meta[LabText].en: string
automation.dialogs.new_rule.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="multi"].value[]: string
automation.dialogs.new_rule.fields[][kind="toggle"].key: string
automation.dialogs.new_rule.fields[][kind="toggle"].label*: string
automation.dialogs.new_rule.fields[][kind="toggle"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="toggle"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="toggle"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="toggle"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="toggle"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="toggle"].kind: "toggle"
automation.dialogs.new_rule.fields[][kind="toggle"].onText*: string
automation.dialogs.new_rule.fields[][kind="toggle"].onText[LabText].en: string
automation.dialogs.new_rule.fields[][kind="toggle"].onText[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="toggle"].value: boolean | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="info"].key: string
automation.dialogs.new_rule.fields[][kind="info"].label*: string
automation.dialogs.new_rule.fields[][kind="info"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="info"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="info"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="info"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="info"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="info"].kind: "info"
automation.dialogs.new_rule.fields[][kind="info"].text*: string
automation.dialogs.new_rule.fields[][kind="info"].text[LabText].en: string
automation.dialogs.new_rule.fields[][kind="info"].text[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="info"].mono: boolean | undefined  (optional)
automation.dialogs.new_rule.fields[][kind="code"].key: string
automation.dialogs.new_rule.fields[][kind="code"].label*: string
automation.dialogs.new_rule.fields[][kind="code"].label[LabText].en: string
automation.dialogs.new_rule.fields[][kind="code"].label[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="code"].hint*: string  (optional)
automation.dialogs.new_rule.fields[][kind="code"].hint[LabText].en: string
automation.dialogs.new_rule.fields[][kind="code"].hint[LabText].zh-CN: string
automation.dialogs.new_rule.fields[][kind="code"].kind: "code"
automation.dialogs.new_rule.fields[][kind="code"].code: string
automation.dialogs.new_rule.warning.tone: "danger" | "neutral"
automation.dialogs.new_rule.warning.text*: string
automation.dialogs.new_rule.warning.text[LabText].en: string
automation.dialogs.new_rule.warning.text[LabText].zh-CN: string
automation.dialogs.new_rule.tone: "danger" | "default" | undefined  (optional)
automation.dialogs.new_rule.confirmLabel*: string  (optional)
automation.dialogs.new_rule.confirmLabel[LabText].en: string
automation.dialogs.new_rule.confirmLabel[LabText].zh-CN: string
automation.dialogs.new_rule.hasCancel: boolean | undefined  (optional)
automation.dialogs.new_rule.completion[kind="done"].kind: "done"
automation.dialogs.new_rule.completion[kind="done"].title*: string  (optional)
automation.dialogs.new_rule.completion[kind="done"].title[LabText].en: string
automation.dialogs.new_rule.completion[kind="done"].title[LabText].zh-CN: string
automation.dialogs.new_rule.completion[kind="done"].detail*: string  (optional)
automation.dialogs.new_rule.completion[kind="done"].detail[LabText].en: string
automation.dialogs.new_rule.completion[kind="done"].detail[LabText].zh-CN: string
automation.dialogs.new_rule.completion[kind="close"].kind: "close"
automation.dialogs.new_rule.size: "lg" | "md" | "xl" | undefined  (optional)
automation.dialogs.new_rule.labelColumn: "aligned" | "none" | undefined  (optional)
automation.selectedId: string | null  (nullable)
automation.rules[].id: string
automation.rules[].name*: string
automation.rules[].name[LabText].en: string
automation.rules[].name[LabText].zh-CN: string
automation.rules[].triggerKind: "event" | "instrument" | "schedule"
automation.rules[].trigger*: string
automation.rules[].trigger[LabText].en: string
automation.rules[].trigger[LabText].zh-CN: string
automation.rules[].triggerValue: string
automation.rules[].effect*: string
automation.rules[].effect[LabText].en: string
automation.rules[].effect[LabText].zh-CN: string
automation.rules[].enabled: boolean
automation.rules[].scope[kind="all"].kind: "all"
automation.rules[].scope[kind="focus"].kind: "focus"
automation.rules[].scope[kind="project"].kind: "project"
automation.rules[].scope[kind="project"].projectId: string
automation.rules[].creatorId: string
automation.rules[].historicalRunCount: number  // Historical total, independent of the visible sample runs. Add local manual runs for table count.
automation.rules[].when[].text*: string
automation.rules[].when[].text[LabText].en: string
automation.rules[].when[].text[LabText].zh-CN: string
automation.rules[].when[].detail: string
automation.rules[].when[].actor[kind="automatic"].kind: "automatic"
automation.rules[].when[].actor[kind="agent"].kind: "agent"
automation.rules[].when[].actor[kind="agent"].name*: string
automation.rules[].when[].actor[kind="agent"].name[LabText].en: string
automation.rules[].when[].actor[kind="agent"].name[LabText].zh-CN: string
automation.rules[].when[].actor[kind="approval"].kind: "approval"
automation.rules[].conditions[].text*: string
automation.rules[].conditions[].text[LabText].en: string
automation.rules[].conditions[].text[LabText].zh-CN: string
automation.rules[].conditions[].detail: string
automation.rules[].conditions[].actor[kind="automatic"].kind: "automatic"
automation.rules[].conditions[].actor[kind="agent"].kind: "agent"
automation.rules[].conditions[].actor[kind="agent"].name*: string
automation.rules[].conditions[].actor[kind="agent"].name[LabText].en: string
automation.rules[].conditions[].actor[kind="agent"].name[LabText].zh-CN: string
automation.rules[].conditions[].actor[kind="approval"].kind: "approval"
automation.rules[].then[].text*: string
automation.rules[].then[].text[LabText].en: string
automation.rules[].then[].text[LabText].zh-CN: string
automation.rules[].then[].detail: string
automation.rules[].then[].actor[kind="automatic"].kind: "automatic"
automation.rules[].then[].actor[kind="agent"].kind: "agent"
automation.rules[].then[].actor[kind="agent"].name*: string
automation.rules[].then[].actor[kind="agent"].name[LabText].en: string
automation.rules[].then[].actor[kind="agent"].name[LabText].zh-CN: string
automation.rules[].then[].actor[kind="approval"].kind: "approval"
automation.runs[][kind="waiting"].id: string
automation.runs[][kind="waiting"].automationId: string
automation.runs[][kind="waiting"].time*: string
automation.runs[][kind="waiting"].time[LabText].en: string
automation.runs[][kind="waiting"].time[LabText].zh-CN: string
automation.runs[][kind="waiting"].text*: string
automation.runs[][kind="waiting"].text[LabText].en: string
automation.runs[][kind="waiting"].text[LabText].zh-CN: string
automation.runs[][kind="waiting"].source*: string
automation.runs[][kind="waiting"].source[LabText].en: string
automation.runs[][kind="waiting"].source[LabText].zh-CN: string
automation.runs[][kind="waiting"].duration*: string | null  (nullable)
automation.runs[][kind="waiting"].duration[LabText].en: string  (nullable parent)
automation.runs[][kind="waiting"].duration[LabText].zh-CN: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.id: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.id.__@$brand@478.ConversationId: true  (nullable parent)
automation.runs[][kind="waiting"].conversation.rule: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.rule.__@$brand@478.AutomationRuleId: true  (nullable parent)
automation.runs[][kind="waiting"].conversation.automationRun: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.automationRun.__@$brand@478.AutomationRunId: true  (nullable parent)
automation.runs[][kind="waiting"].conversation.owner: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.ownerName: string | null  (nullable) (nullable parent)
automation.runs[][kind="waiting"].conversation.agent: string | null  (nullable) (nullable parent)
automation.runs[][kind="waiting"].conversation.agent.__@$brand@478.AgentId: true  (nullable parent)
automation.runs[][kind="waiting"].conversation.session: any  (nullable parent)
automation.runs[][kind="waiting"].conversation.createdAt*: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.createdAt[LabText].en: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.createdAt[LabText].zh-CN: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.canHandBack: boolean  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].slot: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].fn: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].kind: "running"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].body: "Agent" | "Program"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].env: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].agentId: string  (optional) (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].agentId.__@$brand@478.AgentId: true  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].remoteRun: string | undefined  (optional) (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].startedAt: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"].inputs[]: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="running"][string]: any  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].kind: "awaiting_human"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].request: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].inputs[]: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].shape[kind="single"].kind: "single"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].shape[kind="single"].type: "boolean" | "file" | "number" | "string"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].shape[kind="record"].kind: "record"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].shape[kind="record"].fields[string]: "boolean" | "file" | "number" | "string"  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"].startedAt: string  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[].state[kind="awaiting_human"][string]: any  (nullable parent)
automation.runs[][kind="waiting"].conversation.slots[][string]: any  (nullable parent)
automation.runs[][kind="waiting"].conversation.experiments[]: string  (nullable parent)
automation.runs[][kind="waiting"].kind: "waiting"
automation.runs[][kind="waiting"].prompt*: string
automation.runs[][kind="waiting"].prompt[LabText].en: string
automation.runs[][kind="waiting"].prompt[LabText].zh-CN: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].id: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].automationId: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].time*: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].time[LabText].en: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].time[LabText].zh-CN: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].text*: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].text[LabText].en: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].text[LabText].zh-CN: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].source*: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].source[LabText].en: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].source[LabText].zh-CN: string
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].duration*: string | null  (nullable)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].duration[LabText].en: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].duration[LabText].zh-CN: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.id: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.id.__@$brand@478.ConversationId: true  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.rule: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.rule.__@$brand@478.AutomationRuleId: true  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.automationRun: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.automationRun.__@$brand@478.AutomationRunId: true  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.owner: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.ownerName: string | null  (nullable) (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.agent: string | null  (nullable) (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.agent.__@$brand@478.AgentId: true  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.session: any  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.createdAt*: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.createdAt[LabText].en: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.createdAt[LabText].zh-CN: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.canHandBack: boolean  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].slot: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].fn: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].kind: "running"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].body: "Agent" | "Program"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].env: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].agentId: string  (optional) (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].agentId.__@$brand@478.AgentId: true  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].remoteRun: string | undefined  (optional) (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].startedAt: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"].inputs[]: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="running"][string]: any  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].kind: "awaiting_human"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].request: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].inputs[]: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].shape[kind="single"].kind: "single"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].shape[kind="single"].type: "boolean" | "file" | "number" | "string"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].shape[kind="record"].kind: "record"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].shape[kind="record"].fields[string]: "boolean" | "file" | "number" | "string"  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"].startedAt: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[].state[kind="awaiting_human"][string]: any  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.slots[][string]: any  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].conversation.experiments[]: string  (nullable parent)
automation.runs[][kind∈"failed"|"ok"|"running"|"skipped"].kind: "failed" | "ok" | "running" | "skipped"
```

### `datasets` — DatasetsFixture

> `/datasets`

```
datasets.ai.sessions[].name*: string
datasets.ai.sessions[].name[LabText].en: string
datasets.ai.sessions[].name[LabText].zh-CN: string
datasets.ai.sessions[].meta*: string
datasets.ai.sessions[].meta[LabText].en: string
datasets.ai.sessions[].meta[LabText].zh-CN: string
datasets.ai.seed[][kind="user"].kind: "user"
datasets.ai.seed[][kind="user"].text*: string
datasets.ai.seed[][kind="user"].text[LabText].en: string
datasets.ai.seed[][kind="user"].text[LabText].zh-CN: string
datasets.ai.seed[][kind="assistant"].kind: "assistant"
datasets.ai.seed[][kind="assistant"].text*: string
datasets.ai.seed[][kind="assistant"].text[LabText].en: string
datasets.ai.seed[][kind="assistant"].text[LabText].zh-CN: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
datasets.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
datasets.ai.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
datasets.ai.prompts[]*: string
datasets.ai.prompts[][LabText].en: string
datasets.ai.prompts[][LabText].zh-CN: string
datasets.ai.reply.en: string
datasets.ai.reply.zh-CN: string
datasets.ai.placeholder.en: string
datasets.ai.placeholder.zh-CN: string
datasets.ai.subtitle.en: string
datasets.ai.subtitle.zh-CN: string
datasets.ai.scope.label.en: string
datasets.ai.scope.label.zh-CN: string
datasets.ai.scope.value*: string
datasets.ai.scope.value[LabText].en: string
datasets.ai.scope.value[LabText].zh-CN: string
datasets.dialogs.download.id: string
datasets.dialogs.download.title*: string
datasets.dialogs.download.title[LabText].en: string
datasets.dialogs.download.title[LabText].zh-CN: string
datasets.dialogs.download.subtitle*: string  (optional)
datasets.dialogs.download.subtitle[LabText].en: string
datasets.dialogs.download.subtitle[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="text"].key: string
datasets.dialogs.download.fields[][kind="text"].label*: string
datasets.dialogs.download.fields[][kind="text"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="text"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="text"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="text"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="text"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="text"].kind: "text"
datasets.dialogs.download.fields[][kind="text"].placeholder*: string  (optional)
datasets.dialogs.download.fields[][kind="text"].placeholder[LabText].en: string
datasets.dialogs.download.fields[][kind="text"].placeholder[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="text"].value*: string  (optional)
datasets.dialogs.download.fields[][kind="text"].value[LabText].en: string
datasets.dialogs.download.fields[][kind="text"].value[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="text"].mono: boolean | undefined  (optional)
datasets.dialogs.download.fields[][kind="area"].key: string
datasets.dialogs.download.fields[][kind="area"].label*: string
datasets.dialogs.download.fields[][kind="area"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="area"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="area"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="area"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="area"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="area"].kind: "area"
datasets.dialogs.download.fields[][kind="area"].placeholder*: string  (optional)
datasets.dialogs.download.fields[][kind="area"].placeholder[LabText].en: string
datasets.dialogs.download.fields[][kind="area"].placeholder[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="area"].value*: string  (optional)
datasets.dialogs.download.fields[][kind="area"].value[LabText].en: string
datasets.dialogs.download.fields[][kind="area"].value[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="area"].mono: boolean | undefined  (optional)
datasets.dialogs.download.fields[][kind="area"].rows: number | undefined  (optional)
datasets.dialogs.download.fields[][kind="segmented"].key: string
datasets.dialogs.download.fields[][kind="segmented"].label*: string
datasets.dialogs.download.fields[][kind="segmented"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="segmented"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="segmented"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="segmented"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="segmented"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="segmented"].kind: "segmented"
datasets.dialogs.download.fields[][kind="segmented"].options[].id: string
datasets.dialogs.download.fields[][kind="segmented"].options[].label*: string
datasets.dialogs.download.fields[][kind="segmented"].options[].label[LabText].en: string
datasets.dialogs.download.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="segmented"].options[].meta*: string  (optional)
datasets.dialogs.download.fields[][kind="segmented"].options[].meta[LabText].en: string
datasets.dialogs.download.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="segmented"].value: string | undefined  (optional)
datasets.dialogs.download.fields[][kind="choice"].key: string
datasets.dialogs.download.fields[][kind="choice"].label*: string
datasets.dialogs.download.fields[][kind="choice"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="choice"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="choice"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="choice"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="choice"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="choice"].kind: "choice"
datasets.dialogs.download.fields[][kind="choice"].options[].id: string
datasets.dialogs.download.fields[][kind="choice"].options[].label*: string
datasets.dialogs.download.fields[][kind="choice"].options[].label[LabText].en: string
datasets.dialogs.download.fields[][kind="choice"].options[].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="choice"].options[].meta*: string  (optional)
datasets.dialogs.download.fields[][kind="choice"].options[].meta[LabText].en: string
datasets.dialogs.download.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="choice"].value: string | undefined  (optional)
datasets.dialogs.download.fields[][kind="multi"].key: string
datasets.dialogs.download.fields[][kind="multi"].label*: string
datasets.dialogs.download.fields[][kind="multi"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="multi"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="multi"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="multi"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="multi"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="multi"].kind: "multi"
datasets.dialogs.download.fields[][kind="multi"].options[].id: string
datasets.dialogs.download.fields[][kind="multi"].options[].label*: string
datasets.dialogs.download.fields[][kind="multi"].options[].label[LabText].en: string
datasets.dialogs.download.fields[][kind="multi"].options[].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="multi"].options[].meta*: string  (optional)
datasets.dialogs.download.fields[][kind="multi"].options[].meta[LabText].en: string
datasets.dialogs.download.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="multi"].value[]: string
datasets.dialogs.download.fields[][kind="toggle"].key: string
datasets.dialogs.download.fields[][kind="toggle"].label*: string
datasets.dialogs.download.fields[][kind="toggle"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="toggle"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="toggle"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="toggle"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="toggle"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="toggle"].kind: "toggle"
datasets.dialogs.download.fields[][kind="toggle"].onText*: string
datasets.dialogs.download.fields[][kind="toggle"].onText[LabText].en: string
datasets.dialogs.download.fields[][kind="toggle"].onText[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="toggle"].value: boolean | undefined  (optional)
datasets.dialogs.download.fields[][kind="info"].key: string
datasets.dialogs.download.fields[][kind="info"].label*: string
datasets.dialogs.download.fields[][kind="info"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="info"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="info"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="info"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="info"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="info"].kind: "info"
datasets.dialogs.download.fields[][kind="info"].text*: string
datasets.dialogs.download.fields[][kind="info"].text[LabText].en: string
datasets.dialogs.download.fields[][kind="info"].text[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="info"].mono: boolean | undefined  (optional)
datasets.dialogs.download.fields[][kind="code"].key: string
datasets.dialogs.download.fields[][kind="code"].label*: string
datasets.dialogs.download.fields[][kind="code"].label[LabText].en: string
datasets.dialogs.download.fields[][kind="code"].label[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="code"].hint*: string  (optional)
datasets.dialogs.download.fields[][kind="code"].hint[LabText].en: string
datasets.dialogs.download.fields[][kind="code"].hint[LabText].zh-CN: string
datasets.dialogs.download.fields[][kind="code"].kind: "code"
datasets.dialogs.download.fields[][kind="code"].code: string
datasets.dialogs.download.warning.tone: "danger" | "neutral"
datasets.dialogs.download.warning.text*: string
datasets.dialogs.download.warning.text[LabText].en: string
datasets.dialogs.download.warning.text[LabText].zh-CN: string
datasets.dialogs.download.tone: "danger" | "default" | undefined  (optional)
datasets.dialogs.download.confirmLabel*: string  (optional)
datasets.dialogs.download.confirmLabel[LabText].en: string
datasets.dialogs.download.confirmLabel[LabText].zh-CN: string
datasets.dialogs.download.hasCancel: boolean | undefined  (optional)
datasets.dialogs.download.completion[kind="done"].kind: "done"
datasets.dialogs.download.completion[kind="done"].title*: string  (optional)
datasets.dialogs.download.completion[kind="done"].title[LabText].en: string
datasets.dialogs.download.completion[kind="done"].title[LabText].zh-CN: string
datasets.dialogs.download.completion[kind="done"].detail*: string  (optional)
datasets.dialogs.download.completion[kind="done"].detail[LabText].en: string
datasets.dialogs.download.completion[kind="done"].detail[LabText].zh-CN: string
datasets.dialogs.download.completion[kind="close"].kind: "close"
datasets.dialogs.download.size: "lg" | "md" | "xl" | undefined  (optional)
datasets.dialogs.download.labelColumn: "aligned" | "none" | undefined  (optional)
datasets.dialogs.export.id: string
datasets.dialogs.export.title*: string
datasets.dialogs.export.title[LabText].en: string
datasets.dialogs.export.title[LabText].zh-CN: string
datasets.dialogs.export.subtitle*: string  (optional)
datasets.dialogs.export.subtitle[LabText].en: string
datasets.dialogs.export.subtitle[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="text"].key: string
datasets.dialogs.export.fields[][kind="text"].label*: string
datasets.dialogs.export.fields[][kind="text"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="text"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="text"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="text"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="text"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="text"].kind: "text"
datasets.dialogs.export.fields[][kind="text"].placeholder*: string  (optional)
datasets.dialogs.export.fields[][kind="text"].placeholder[LabText].en: string
datasets.dialogs.export.fields[][kind="text"].placeholder[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="text"].value*: string  (optional)
datasets.dialogs.export.fields[][kind="text"].value[LabText].en: string
datasets.dialogs.export.fields[][kind="text"].value[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="text"].mono: boolean | undefined  (optional)
datasets.dialogs.export.fields[][kind="area"].key: string
datasets.dialogs.export.fields[][kind="area"].label*: string
datasets.dialogs.export.fields[][kind="area"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="area"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="area"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="area"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="area"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="area"].kind: "area"
datasets.dialogs.export.fields[][kind="area"].placeholder*: string  (optional)
datasets.dialogs.export.fields[][kind="area"].placeholder[LabText].en: string
datasets.dialogs.export.fields[][kind="area"].placeholder[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="area"].value*: string  (optional)
datasets.dialogs.export.fields[][kind="area"].value[LabText].en: string
datasets.dialogs.export.fields[][kind="area"].value[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="area"].mono: boolean | undefined  (optional)
datasets.dialogs.export.fields[][kind="area"].rows: number | undefined  (optional)
datasets.dialogs.export.fields[][kind="segmented"].key: string
datasets.dialogs.export.fields[][kind="segmented"].label*: string
datasets.dialogs.export.fields[][kind="segmented"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="segmented"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="segmented"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="segmented"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="segmented"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="segmented"].kind: "segmented"
datasets.dialogs.export.fields[][kind="segmented"].options[].id: string
datasets.dialogs.export.fields[][kind="segmented"].options[].label*: string
datasets.dialogs.export.fields[][kind="segmented"].options[].label[LabText].en: string
datasets.dialogs.export.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="segmented"].options[].meta*: string  (optional)
datasets.dialogs.export.fields[][kind="segmented"].options[].meta[LabText].en: string
datasets.dialogs.export.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="segmented"].value: string | undefined  (optional)
datasets.dialogs.export.fields[][kind="choice"].key: string
datasets.dialogs.export.fields[][kind="choice"].label*: string
datasets.dialogs.export.fields[][kind="choice"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="choice"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="choice"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="choice"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="choice"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="choice"].kind: "choice"
datasets.dialogs.export.fields[][kind="choice"].options[].id: string
datasets.dialogs.export.fields[][kind="choice"].options[].label*: string
datasets.dialogs.export.fields[][kind="choice"].options[].label[LabText].en: string
datasets.dialogs.export.fields[][kind="choice"].options[].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="choice"].options[].meta*: string  (optional)
datasets.dialogs.export.fields[][kind="choice"].options[].meta[LabText].en: string
datasets.dialogs.export.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="choice"].value: string | undefined  (optional)
datasets.dialogs.export.fields[][kind="multi"].key: string
datasets.dialogs.export.fields[][kind="multi"].label*: string
datasets.dialogs.export.fields[][kind="multi"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="multi"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="multi"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="multi"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="multi"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="multi"].kind: "multi"
datasets.dialogs.export.fields[][kind="multi"].options[].id: string
datasets.dialogs.export.fields[][kind="multi"].options[].label*: string
datasets.dialogs.export.fields[][kind="multi"].options[].label[LabText].en: string
datasets.dialogs.export.fields[][kind="multi"].options[].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="multi"].options[].meta*: string  (optional)
datasets.dialogs.export.fields[][kind="multi"].options[].meta[LabText].en: string
datasets.dialogs.export.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="multi"].value[]: string
datasets.dialogs.export.fields[][kind="toggle"].key: string
datasets.dialogs.export.fields[][kind="toggle"].label*: string
datasets.dialogs.export.fields[][kind="toggle"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="toggle"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="toggle"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="toggle"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="toggle"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="toggle"].kind: "toggle"
datasets.dialogs.export.fields[][kind="toggle"].onText*: string
datasets.dialogs.export.fields[][kind="toggle"].onText[LabText].en: string
datasets.dialogs.export.fields[][kind="toggle"].onText[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="toggle"].value: boolean | undefined  (optional)
datasets.dialogs.export.fields[][kind="info"].key: string
datasets.dialogs.export.fields[][kind="info"].label*: string
datasets.dialogs.export.fields[][kind="info"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="info"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="info"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="info"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="info"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="info"].kind: "info"
datasets.dialogs.export.fields[][kind="info"].text*: string
datasets.dialogs.export.fields[][kind="info"].text[LabText].en: string
datasets.dialogs.export.fields[][kind="info"].text[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="info"].mono: boolean | undefined  (optional)
datasets.dialogs.export.fields[][kind="code"].key: string
datasets.dialogs.export.fields[][kind="code"].label*: string
datasets.dialogs.export.fields[][kind="code"].label[LabText].en: string
datasets.dialogs.export.fields[][kind="code"].label[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="code"].hint*: string  (optional)
datasets.dialogs.export.fields[][kind="code"].hint[LabText].en: string
datasets.dialogs.export.fields[][kind="code"].hint[LabText].zh-CN: string
datasets.dialogs.export.fields[][kind="code"].kind: "code"
datasets.dialogs.export.fields[][kind="code"].code: string
datasets.dialogs.export.warning.tone: "danger" | "neutral"
datasets.dialogs.export.warning.text*: string
datasets.dialogs.export.warning.text[LabText].en: string
datasets.dialogs.export.warning.text[LabText].zh-CN: string
datasets.dialogs.export.tone: "danger" | "default" | undefined  (optional)
datasets.dialogs.export.confirmLabel*: string  (optional)
datasets.dialogs.export.confirmLabel[LabText].en: string
datasets.dialogs.export.confirmLabel[LabText].zh-CN: string
datasets.dialogs.export.hasCancel: boolean | undefined  (optional)
datasets.dialogs.export.completion[kind="done"].kind: "done"
datasets.dialogs.export.completion[kind="done"].title*: string  (optional)
datasets.dialogs.export.completion[kind="done"].title[LabText].en: string
datasets.dialogs.export.completion[kind="done"].title[LabText].zh-CN: string
datasets.dialogs.export.completion[kind="done"].detail*: string  (optional)
datasets.dialogs.export.completion[kind="done"].detail[LabText].en: string
datasets.dialogs.export.completion[kind="done"].detail[LabText].zh-CN: string
datasets.dialogs.export.completion[kind="close"].kind: "close"
datasets.dialogs.export.size: "lg" | "md" | "xl" | undefined  (optional)
datasets.dialogs.export.labelColumn: "aligned" | "none" | undefined  (optional)
datasets.dialogs.load.id: string
datasets.dialogs.load.title*: string
datasets.dialogs.load.title[LabText].en: string
datasets.dialogs.load.title[LabText].zh-CN: string
datasets.dialogs.load.subtitle*: string  (optional)
datasets.dialogs.load.subtitle[LabText].en: string
datasets.dialogs.load.subtitle[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="text"].key: string
datasets.dialogs.load.fields[][kind="text"].label*: string
datasets.dialogs.load.fields[][kind="text"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="text"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="text"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="text"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="text"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="text"].kind: "text"
datasets.dialogs.load.fields[][kind="text"].placeholder*: string  (optional)
datasets.dialogs.load.fields[][kind="text"].placeholder[LabText].en: string
datasets.dialogs.load.fields[][kind="text"].placeholder[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="text"].value*: string  (optional)
datasets.dialogs.load.fields[][kind="text"].value[LabText].en: string
datasets.dialogs.load.fields[][kind="text"].value[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="text"].mono: boolean | undefined  (optional)
datasets.dialogs.load.fields[][kind="area"].key: string
datasets.dialogs.load.fields[][kind="area"].label*: string
datasets.dialogs.load.fields[][kind="area"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="area"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="area"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="area"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="area"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="area"].kind: "area"
datasets.dialogs.load.fields[][kind="area"].placeholder*: string  (optional)
datasets.dialogs.load.fields[][kind="area"].placeholder[LabText].en: string
datasets.dialogs.load.fields[][kind="area"].placeholder[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="area"].value*: string  (optional)
datasets.dialogs.load.fields[][kind="area"].value[LabText].en: string
datasets.dialogs.load.fields[][kind="area"].value[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="area"].mono: boolean | undefined  (optional)
datasets.dialogs.load.fields[][kind="area"].rows: number | undefined  (optional)
datasets.dialogs.load.fields[][kind="segmented"].key: string
datasets.dialogs.load.fields[][kind="segmented"].label*: string
datasets.dialogs.load.fields[][kind="segmented"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="segmented"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="segmented"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="segmented"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="segmented"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="segmented"].kind: "segmented"
datasets.dialogs.load.fields[][kind="segmented"].options[].id: string
datasets.dialogs.load.fields[][kind="segmented"].options[].label*: string
datasets.dialogs.load.fields[][kind="segmented"].options[].label[LabText].en: string
datasets.dialogs.load.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="segmented"].options[].meta*: string  (optional)
datasets.dialogs.load.fields[][kind="segmented"].options[].meta[LabText].en: string
datasets.dialogs.load.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="segmented"].value: string | undefined  (optional)
datasets.dialogs.load.fields[][kind="choice"].key: string
datasets.dialogs.load.fields[][kind="choice"].label*: string
datasets.dialogs.load.fields[][kind="choice"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="choice"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="choice"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="choice"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="choice"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="choice"].kind: "choice"
datasets.dialogs.load.fields[][kind="choice"].options[].id: string
datasets.dialogs.load.fields[][kind="choice"].options[].label*: string
datasets.dialogs.load.fields[][kind="choice"].options[].label[LabText].en: string
datasets.dialogs.load.fields[][kind="choice"].options[].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="choice"].options[].meta*: string  (optional)
datasets.dialogs.load.fields[][kind="choice"].options[].meta[LabText].en: string
datasets.dialogs.load.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="choice"].value: string | undefined  (optional)
datasets.dialogs.load.fields[][kind="multi"].key: string
datasets.dialogs.load.fields[][kind="multi"].label*: string
datasets.dialogs.load.fields[][kind="multi"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="multi"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="multi"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="multi"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="multi"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="multi"].kind: "multi"
datasets.dialogs.load.fields[][kind="multi"].options[].id: string
datasets.dialogs.load.fields[][kind="multi"].options[].label*: string
datasets.dialogs.load.fields[][kind="multi"].options[].label[LabText].en: string
datasets.dialogs.load.fields[][kind="multi"].options[].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="multi"].options[].meta*: string  (optional)
datasets.dialogs.load.fields[][kind="multi"].options[].meta[LabText].en: string
datasets.dialogs.load.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="multi"].value[]: string
datasets.dialogs.load.fields[][kind="toggle"].key: string
datasets.dialogs.load.fields[][kind="toggle"].label*: string
datasets.dialogs.load.fields[][kind="toggle"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="toggle"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="toggle"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="toggle"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="toggle"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="toggle"].kind: "toggle"
datasets.dialogs.load.fields[][kind="toggle"].onText*: string
datasets.dialogs.load.fields[][kind="toggle"].onText[LabText].en: string
datasets.dialogs.load.fields[][kind="toggle"].onText[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="toggle"].value: boolean | undefined  (optional)
datasets.dialogs.load.fields[][kind="info"].key: string
datasets.dialogs.load.fields[][kind="info"].label*: string
datasets.dialogs.load.fields[][kind="info"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="info"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="info"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="info"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="info"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="info"].kind: "info"
datasets.dialogs.load.fields[][kind="info"].text*: string
datasets.dialogs.load.fields[][kind="info"].text[LabText].en: string
datasets.dialogs.load.fields[][kind="info"].text[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="info"].mono: boolean | undefined  (optional)
datasets.dialogs.load.fields[][kind="code"].key: string
datasets.dialogs.load.fields[][kind="code"].label*: string
datasets.dialogs.load.fields[][kind="code"].label[LabText].en: string
datasets.dialogs.load.fields[][kind="code"].label[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="code"].hint*: string  (optional)
datasets.dialogs.load.fields[][kind="code"].hint[LabText].en: string
datasets.dialogs.load.fields[][kind="code"].hint[LabText].zh-CN: string
datasets.dialogs.load.fields[][kind="code"].kind: "code"
datasets.dialogs.load.fields[][kind="code"].code: string
datasets.dialogs.load.warning.tone: "danger" | "neutral"
datasets.dialogs.load.warning.text*: string
datasets.dialogs.load.warning.text[LabText].en: string
datasets.dialogs.load.warning.text[LabText].zh-CN: string
datasets.dialogs.load.tone: "danger" | "default" | undefined  (optional)
datasets.dialogs.load.confirmLabel*: string  (optional)
datasets.dialogs.load.confirmLabel[LabText].en: string
datasets.dialogs.load.confirmLabel[LabText].zh-CN: string
datasets.dialogs.load.hasCancel: boolean | undefined  (optional)
datasets.dialogs.load.completion[kind="done"].kind: "done"
datasets.dialogs.load.completion[kind="done"].title*: string  (optional)
datasets.dialogs.load.completion[kind="done"].title[LabText].en: string
datasets.dialogs.load.completion[kind="done"].title[LabText].zh-CN: string
datasets.dialogs.load.completion[kind="done"].detail*: string  (optional)
datasets.dialogs.load.completion[kind="done"].detail[LabText].en: string
datasets.dialogs.load.completion[kind="done"].detail[LabText].zh-CN: string
datasets.dialogs.load.completion[kind="close"].kind: "close"
datasets.dialogs.load.size: "lg" | "md" | "xl" | undefined  (optional)
datasets.dialogs.load.labelColumn: "aligned" | "none" | undefined  (optional)
datasets.artifacts[][kind="experiment"].id: `${string}:${string}`
datasets.artifacts[][kind="experiment"].path: string  // Experiment path, or stable semantic output path where the prototype supplies only a display title.
datasets.artifacts[][kind="experiment"].name*: string
datasets.artifacts[][kind="experiment"].name[LabText].en: string
datasets.artifacts[][kind="experiment"].name[LabText].zh-CN: string
datasets.artifacts[][kind="experiment"].extension: ArtifactExtension | null  (nullable)
datasets.artifacts[][kind="experiment"].role: ArtifactRole | null  (nullable)
datasets.artifacts[][kind="experiment"].size: string | null  (nullable)
datasets.artifacts[][kind="experiment"].time*: string
datasets.artifacts[][kind="experiment"].time[LabText].en: string
datasets.artifacts[][kind="experiment"].time[LabText].zh-CN: string
datasets.artifacts[][kind="experiment"].projectId: string
datasets.artifacts[][kind="experiment"].verdict: ArtifactVerdict
datasets.artifacts[][kind="experiment"].preview[kind="table"].kind: "table"  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].columns[]*: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].columns[][LabText].en: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].columns[][LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].rows[][]*: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].rows[][][LabText].en: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].rows[][][LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].highlightedRow: number | undefined  (optional) (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].note*: string  (optional) (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].note[LabText].en: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="table"].note[LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="image"].kind: "image"  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="image"].aspect[0]: number  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="image"].aspect[1]: number  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="image"].dimensions*: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="image"].dimensions[LabText].en: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="image"].dimensions[LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="text"].kind: "text"  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="text"].text*: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="text"].text[LabText].en: string  (nullable parent)
datasets.artifacts[][kind="experiment"].preview[kind="text"].text[LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="experiment"].references[][kind="context"].kind: "context"
datasets.artifacts[][kind="experiment"].references[][kind="context"].discussionId: string
datasets.artifacts[][kind="experiment"].references[][kind="evidence"].kind: "evidence"
datasets.artifacts[][kind="experiment"].references[][kind="evidence"].discussionId: string
datasets.artifacts[][kind="experiment"].references[][kind="evidence"].outputId: `${string}:${string}`
datasets.artifacts[][kind="experiment"].kind: "experiment"
datasets.artifacts[][kind="experiment"].runId: string
datasets.artifacts[][kind="experiment"].lineage.node*: string
datasets.artifacts[][kind="experiment"].lineage.node[LabText].en: string
datasets.artifacts[][kind="experiment"].lineage.node[LabText].zh-CN: string
datasets.artifacts[][kind="experiment"].lineage.container*: string
datasets.artifacts[][kind="experiment"].lineage.container[LabText].en: string
datasets.artifacts[][kind="experiment"].lineage.container[LabText].zh-CN: string
datasets.artifacts[][kind="experiment"].lineage.image: string
datasets.artifacts[][kind="experiment"].contract[kind="none"].kind: "none"
datasets.artifacts[][kind="experiment"].contract[kind="checked"].kind: "checked"
datasets.artifacts[][kind="experiment"].contract[kind="checked"].requiredPath: "pass"
datasets.artifacts[][kind="experiment"].contract[kind="checked"].schema[kind="valid"].kind: "valid"
datasets.artifacts[][kind="experiment"].contract[kind="checked"].schema[kind="column_claim"].kind: "column_claim"
datasets.artifacts[][kind="experiment"].contract[kind="checked"].schema[kind="column_claim"].columns: number
datasets.artifacts[][kind="discussion"].id: `${string}:${string}`
datasets.artifacts[][kind="discussion"].path: string  // Experiment path, or stable semantic output path where the prototype supplies only a display title.
datasets.artifacts[][kind="discussion"].name*: string
datasets.artifacts[][kind="discussion"].name[LabText].en: string
datasets.artifacts[][kind="discussion"].name[LabText].zh-CN: string
datasets.artifacts[][kind="discussion"].extension: ArtifactExtension | null  (nullable)
datasets.artifacts[][kind="discussion"].role: ArtifactRole | null  (nullable)
datasets.artifacts[][kind="discussion"].size: string | null  (nullable)
datasets.artifacts[][kind="discussion"].time*: string
datasets.artifacts[][kind="discussion"].time[LabText].en: string
datasets.artifacts[][kind="discussion"].time[LabText].zh-CN: string
datasets.artifacts[][kind="discussion"].projectId: string
datasets.artifacts[][kind="discussion"].verdict: ArtifactVerdict
datasets.artifacts[][kind="discussion"].preview[kind="table"].kind: "table"  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].columns[]*: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].columns[][LabText].en: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].columns[][LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].rows[][]*: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].rows[][][LabText].en: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].rows[][][LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].highlightedRow: number | undefined  (optional) (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].note*: string  (optional) (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].note[LabText].en: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="table"].note[LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="image"].kind: "image"  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="image"].aspect[0]: number  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="image"].aspect[1]: number  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="image"].dimensions*: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="image"].dimensions[LabText].en: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="image"].dimensions[LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="text"].kind: "text"  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="text"].text*: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="text"].text[LabText].en: string  (nullable parent)
datasets.artifacts[][kind="discussion"].preview[kind="text"].text[LabText].zh-CN: string  (nullable parent)
datasets.artifacts[][kind="discussion"].references[][kind="context"].kind: "context"
datasets.artifacts[][kind="discussion"].references[][kind="context"].discussionId: string
datasets.artifacts[][kind="discussion"].references[][kind="evidence"].kind: "evidence"
datasets.artifacts[][kind="discussion"].references[][kind="evidence"].discussionId: string
datasets.artifacts[][kind="discussion"].references[][kind="evidence"].outputId: `${string}:${string}`
datasets.artifacts[][kind="discussion"].kind: "discussion"
datasets.artifacts[][kind="discussion"].discussionId: string
datasets.artifacts[][kind="discussion"].origin*: string
datasets.artifacts[][kind="discussion"].origin[LabText].en: string
datasets.artifacts[][kind="discussion"].origin[LabText].zh-CN: string
datasets.groupOrder.experiments[]: string
datasets.groupOrder.discussions[]: string
datasets.facets.experimentRoles[]: ArtifactRole
datasets.facets.discussionRoles[]: ArtifactRole
datasets.facets.experiments[]: string
datasets.facets.discussions[]: string
datasets.facets.verdicts[]: "fail" | "pass" | "pending"
datasets.facets.extensions[]: ArtifactExtension
datasets.discussionLabels[].discussionId: string
datasets.discussionLabels[].name*: string
datasets.discussionLabels[].name[LabText].en: string
datasets.discussionLabels[].name[LabText].zh-CN: string
```

### `discussions` — DiscussionsFixture

> `/discussions`, `/discussions/$discussionId`

```
discussions.saveConclusion.discussionId: string
discussions.saveConclusion.messageId: string
discussions.saveConclusion.conclusion[kind="confirmed"].kind: "confirmed"
discussions.saveConclusion.conclusion[kind="confirmed"].time*: string
discussions.saveConclusion.conclusion[kind="confirmed"].time[LabText].en: string
discussions.saveConclusion.conclusion[kind="confirmed"].time[LabText].zh-CN: string
discussions.saveConclusion.conclusion[kind="confirmed"].text*: string
discussions.saveConclusion.conclusion[kind="confirmed"].text[LabText].en: string
discussions.saveConclusion.conclusion[kind="confirmed"].text[LabText].zh-CN: string
discussions.saveConclusion.conclusion[kind="confirmed"].evidence*: string
discussions.saveConclusion.conclusion[kind="confirmed"].evidence[LabText].en: string
discussions.saveConclusion.conclusion[kind="confirmed"].evidence[LabText].zh-CN: string
discussions.saveConclusion.conclusion[kind="pending"].kind: "pending"
discussions.saveConclusion.conclusion[kind="pending"].pendingRunId: string | null  (nullable)
discussions.saveConclusion.conclusion[kind="pending"].time*: string
discussions.saveConclusion.conclusion[kind="pending"].time[LabText].en: string
discussions.saveConclusion.conclusion[kind="pending"].time[LabText].zh-CN: string
discussions.saveConclusion.conclusion[kind="pending"].text*: string
discussions.saveConclusion.conclusion[kind="pending"].text[LabText].en: string
discussions.saveConclusion.conclusion[kind="pending"].text[LabText].zh-CN: string
discussions.saveConclusion.conclusion[kind="pending"].evidence*: string
discussions.saveConclusion.conclusion[kind="pending"].evidence[LabText].en: string
discussions.saveConclusion.conclusion[kind="pending"].evidence[LabText].zh-CN: string
discussions.replyTemplate*: string  // Count token is interpolated from loaded context, not stored as a second count.
discussions.replyTemplate[LabText].en: string
discussions.replyTemplate[LabText].zh-CN: string
discussions.dialogs.archive.id: string
discussions.dialogs.archive.title*: string
discussions.dialogs.archive.title[LabText].en: string
discussions.dialogs.archive.title[LabText].zh-CN: string
discussions.dialogs.archive.subtitle*: string  (optional)
discussions.dialogs.archive.subtitle[LabText].en: string
discussions.dialogs.archive.subtitle[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="text"].key: string
discussions.dialogs.archive.fields[][kind="text"].label*: string
discussions.dialogs.archive.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="text"].kind: "text"
discussions.dialogs.archive.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.archive.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.archive.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.archive.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.archive.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.archive.fields[][kind="area"].key: string
discussions.dialogs.archive.fields[][kind="area"].label*: string
discussions.dialogs.archive.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="area"].kind: "area"
discussions.dialogs.archive.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.archive.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.archive.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.archive.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.archive.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.archive.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.archive.fields[][kind="segmented"].key: string
discussions.dialogs.archive.fields[][kind="segmented"].label*: string
discussions.dialogs.archive.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.archive.fields[][kind="segmented"].options[].id: string
discussions.dialogs.archive.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.archive.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.archive.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.archive.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.archive.fields[][kind="choice"].key: string
discussions.dialogs.archive.fields[][kind="choice"].label*: string
discussions.dialogs.archive.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="choice"].kind: "choice"
discussions.dialogs.archive.fields[][kind="choice"].options[].id: string
discussions.dialogs.archive.fields[][kind="choice"].options[].label*: string
discussions.dialogs.archive.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.archive.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.archive.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.archive.fields[][kind="multi"].key: string
discussions.dialogs.archive.fields[][kind="multi"].label*: string
discussions.dialogs.archive.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="multi"].kind: "multi"
discussions.dialogs.archive.fields[][kind="multi"].options[].id: string
discussions.dialogs.archive.fields[][kind="multi"].options[].label*: string
discussions.dialogs.archive.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.archive.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.archive.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="multi"].value[]: string
discussions.dialogs.archive.fields[][kind="toggle"].key: string
discussions.dialogs.archive.fields[][kind="toggle"].label*: string
discussions.dialogs.archive.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.archive.fields[][kind="toggle"].onText*: string
discussions.dialogs.archive.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.archive.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.archive.fields[][kind="info"].key: string
discussions.dialogs.archive.fields[][kind="info"].label*: string
discussions.dialogs.archive.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="info"].kind: "info"
discussions.dialogs.archive.fields[][kind="info"].text*: string
discussions.dialogs.archive.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.archive.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.archive.fields[][kind="code"].key: string
discussions.dialogs.archive.fields[][kind="code"].label*: string
discussions.dialogs.archive.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.archive.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.archive.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.archive.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.archive.fields[][kind="code"].kind: "code"
discussions.dialogs.archive.fields[][kind="code"].code: string
discussions.dialogs.archive.warning.tone: "danger" | "neutral"
discussions.dialogs.archive.warning.text*: string
discussions.dialogs.archive.warning.text[LabText].en: string
discussions.dialogs.archive.warning.text[LabText].zh-CN: string
discussions.dialogs.archive.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.archive.confirmLabel*: string  (optional)
discussions.dialogs.archive.confirmLabel[LabText].en: string
discussions.dialogs.archive.confirmLabel[LabText].zh-CN: string
discussions.dialogs.archive.hasCancel: boolean | undefined  (optional)
discussions.dialogs.archive.completion[kind="done"].kind: "done"
discussions.dialogs.archive.completion[kind="done"].title*: string  (optional)
discussions.dialogs.archive.completion[kind="done"].title[LabText].en: string
discussions.dialogs.archive.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.archive.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.archive.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.archive.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.archive.completion[kind="close"].kind: "close"
discussions.dialogs.archive.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.archive.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.dialogs.download.id: string
discussions.dialogs.download.title*: string
discussions.dialogs.download.title[LabText].en: string
discussions.dialogs.download.title[LabText].zh-CN: string
discussions.dialogs.download.subtitle*: string  (optional)
discussions.dialogs.download.subtitle[LabText].en: string
discussions.dialogs.download.subtitle[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="text"].key: string
discussions.dialogs.download.fields[][kind="text"].label*: string
discussions.dialogs.download.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="text"].kind: "text"
discussions.dialogs.download.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.download.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.download.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.download.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.download.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.download.fields[][kind="area"].key: string
discussions.dialogs.download.fields[][kind="area"].label*: string
discussions.dialogs.download.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="area"].kind: "area"
discussions.dialogs.download.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.download.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.download.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.download.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.download.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.download.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.download.fields[][kind="segmented"].key: string
discussions.dialogs.download.fields[][kind="segmented"].label*: string
discussions.dialogs.download.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.download.fields[][kind="segmented"].options[].id: string
discussions.dialogs.download.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.download.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.download.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.download.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.download.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.download.fields[][kind="choice"].key: string
discussions.dialogs.download.fields[][kind="choice"].label*: string
discussions.dialogs.download.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="choice"].kind: "choice"
discussions.dialogs.download.fields[][kind="choice"].options[].id: string
discussions.dialogs.download.fields[][kind="choice"].options[].label*: string
discussions.dialogs.download.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.download.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.download.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.download.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.download.fields[][kind="multi"].key: string
discussions.dialogs.download.fields[][kind="multi"].label*: string
discussions.dialogs.download.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="multi"].kind: "multi"
discussions.dialogs.download.fields[][kind="multi"].options[].id: string
discussions.dialogs.download.fields[][kind="multi"].options[].label*: string
discussions.dialogs.download.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.download.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.download.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.download.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="multi"].value[]: string
discussions.dialogs.download.fields[][kind="toggle"].key: string
discussions.dialogs.download.fields[][kind="toggle"].label*: string
discussions.dialogs.download.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.download.fields[][kind="toggle"].onText*: string
discussions.dialogs.download.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.download.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.download.fields[][kind="info"].key: string
discussions.dialogs.download.fields[][kind="info"].label*: string
discussions.dialogs.download.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="info"].kind: "info"
discussions.dialogs.download.fields[][kind="info"].text*: string
discussions.dialogs.download.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.download.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.download.fields[][kind="code"].key: string
discussions.dialogs.download.fields[][kind="code"].label*: string
discussions.dialogs.download.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.download.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.download.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.download.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.download.fields[][kind="code"].kind: "code"
discussions.dialogs.download.fields[][kind="code"].code: string
discussions.dialogs.download.warning.tone: "danger" | "neutral"
discussions.dialogs.download.warning.text*: string
discussions.dialogs.download.warning.text[LabText].en: string
discussions.dialogs.download.warning.text[LabText].zh-CN: string
discussions.dialogs.download.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.download.confirmLabel*: string  (optional)
discussions.dialogs.download.confirmLabel[LabText].en: string
discussions.dialogs.download.confirmLabel[LabText].zh-CN: string
discussions.dialogs.download.hasCancel: boolean | undefined  (optional)
discussions.dialogs.download.completion[kind="done"].kind: "done"
discussions.dialogs.download.completion[kind="done"].title*: string  (optional)
discussions.dialogs.download.completion[kind="done"].title[LabText].en: string
discussions.dialogs.download.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.download.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.download.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.download.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.download.completion[kind="close"].kind: "close"
discussions.dialogs.download.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.download.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.dialogs.export.id: string
discussions.dialogs.export.title*: string
discussions.dialogs.export.title[LabText].en: string
discussions.dialogs.export.title[LabText].zh-CN: string
discussions.dialogs.export.subtitle*: string  (optional)
discussions.dialogs.export.subtitle[LabText].en: string
discussions.dialogs.export.subtitle[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="text"].key: string
discussions.dialogs.export.fields[][kind="text"].label*: string
discussions.dialogs.export.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="text"].kind: "text"
discussions.dialogs.export.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.export.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.export.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.export.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.export.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.export.fields[][kind="area"].key: string
discussions.dialogs.export.fields[][kind="area"].label*: string
discussions.dialogs.export.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="area"].kind: "area"
discussions.dialogs.export.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.export.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.export.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.export.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.export.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.export.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.export.fields[][kind="segmented"].key: string
discussions.dialogs.export.fields[][kind="segmented"].label*: string
discussions.dialogs.export.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.export.fields[][kind="segmented"].options[].id: string
discussions.dialogs.export.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.export.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.export.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.export.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.export.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.export.fields[][kind="choice"].key: string
discussions.dialogs.export.fields[][kind="choice"].label*: string
discussions.dialogs.export.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="choice"].kind: "choice"
discussions.dialogs.export.fields[][kind="choice"].options[].id: string
discussions.dialogs.export.fields[][kind="choice"].options[].label*: string
discussions.dialogs.export.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.export.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.export.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.export.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.export.fields[][kind="multi"].key: string
discussions.dialogs.export.fields[][kind="multi"].label*: string
discussions.dialogs.export.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="multi"].kind: "multi"
discussions.dialogs.export.fields[][kind="multi"].options[].id: string
discussions.dialogs.export.fields[][kind="multi"].options[].label*: string
discussions.dialogs.export.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.export.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.export.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.export.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="multi"].value[]: string
discussions.dialogs.export.fields[][kind="toggle"].key: string
discussions.dialogs.export.fields[][kind="toggle"].label*: string
discussions.dialogs.export.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.export.fields[][kind="toggle"].onText*: string
discussions.dialogs.export.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.export.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.export.fields[][kind="info"].key: string
discussions.dialogs.export.fields[][kind="info"].label*: string
discussions.dialogs.export.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="info"].kind: "info"
discussions.dialogs.export.fields[][kind="info"].text*: string
discussions.dialogs.export.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.export.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.export.fields[][kind="code"].key: string
discussions.dialogs.export.fields[][kind="code"].label*: string
discussions.dialogs.export.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.export.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.export.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.export.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.export.fields[][kind="code"].kind: "code"
discussions.dialogs.export.fields[][kind="code"].code: string
discussions.dialogs.export.warning.tone: "danger" | "neutral"
discussions.dialogs.export.warning.text*: string
discussions.dialogs.export.warning.text[LabText].en: string
discussions.dialogs.export.warning.text[LabText].zh-CN: string
discussions.dialogs.export.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.export.confirmLabel*: string  (optional)
discussions.dialogs.export.confirmLabel[LabText].en: string
discussions.dialogs.export.confirmLabel[LabText].zh-CN: string
discussions.dialogs.export.hasCancel: boolean | undefined  (optional)
discussions.dialogs.export.completion[kind="done"].kind: "done"
discussions.dialogs.export.completion[kind="done"].title*: string  (optional)
discussions.dialogs.export.completion[kind="done"].title[LabText].en: string
discussions.dialogs.export.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.export.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.export.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.export.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.export.completion[kind="close"].kind: "close"
discussions.dialogs.export.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.export.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.dialogs.move.id: string
discussions.dialogs.move.title*: string
discussions.dialogs.move.title[LabText].en: string
discussions.dialogs.move.title[LabText].zh-CN: string
discussions.dialogs.move.subtitle*: string  (optional)
discussions.dialogs.move.subtitle[LabText].en: string
discussions.dialogs.move.subtitle[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="text"].key: string
discussions.dialogs.move.fields[][kind="text"].label*: string
discussions.dialogs.move.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="text"].kind: "text"
discussions.dialogs.move.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.move.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.move.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.move.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.move.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.move.fields[][kind="area"].key: string
discussions.dialogs.move.fields[][kind="area"].label*: string
discussions.dialogs.move.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="area"].kind: "area"
discussions.dialogs.move.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.move.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.move.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.move.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.move.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.move.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.move.fields[][kind="segmented"].key: string
discussions.dialogs.move.fields[][kind="segmented"].label*: string
discussions.dialogs.move.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.move.fields[][kind="segmented"].options[].id: string
discussions.dialogs.move.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.move.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.move.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.move.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.move.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.move.fields[][kind="choice"].key: string
discussions.dialogs.move.fields[][kind="choice"].label*: string
discussions.dialogs.move.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="choice"].kind: "choice"
discussions.dialogs.move.fields[][kind="choice"].options[].id: string
discussions.dialogs.move.fields[][kind="choice"].options[].label*: string
discussions.dialogs.move.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.move.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.move.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.move.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.move.fields[][kind="multi"].key: string
discussions.dialogs.move.fields[][kind="multi"].label*: string
discussions.dialogs.move.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="multi"].kind: "multi"
discussions.dialogs.move.fields[][kind="multi"].options[].id: string
discussions.dialogs.move.fields[][kind="multi"].options[].label*: string
discussions.dialogs.move.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.move.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.move.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.move.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="multi"].value[]: string
discussions.dialogs.move.fields[][kind="toggle"].key: string
discussions.dialogs.move.fields[][kind="toggle"].label*: string
discussions.dialogs.move.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.move.fields[][kind="toggle"].onText*: string
discussions.dialogs.move.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.move.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.move.fields[][kind="info"].key: string
discussions.dialogs.move.fields[][kind="info"].label*: string
discussions.dialogs.move.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="info"].kind: "info"
discussions.dialogs.move.fields[][kind="info"].text*: string
discussions.dialogs.move.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.move.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.move.fields[][kind="code"].key: string
discussions.dialogs.move.fields[][kind="code"].label*: string
discussions.dialogs.move.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.move.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.move.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.move.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.move.fields[][kind="code"].kind: "code"
discussions.dialogs.move.fields[][kind="code"].code: string
discussions.dialogs.move.warning.tone: "danger" | "neutral"
discussions.dialogs.move.warning.text*: string
discussions.dialogs.move.warning.text[LabText].en: string
discussions.dialogs.move.warning.text[LabText].zh-CN: string
discussions.dialogs.move.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.move.confirmLabel*: string  (optional)
discussions.dialogs.move.confirmLabel[LabText].en: string
discussions.dialogs.move.confirmLabel[LabText].zh-CN: string
discussions.dialogs.move.hasCancel: boolean | undefined  (optional)
discussions.dialogs.move.completion[kind="done"].kind: "done"
discussions.dialogs.move.completion[kind="done"].title*: string  (optional)
discussions.dialogs.move.completion[kind="done"].title[LabText].en: string
discussions.dialogs.move.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.move.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.move.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.move.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.move.completion[kind="close"].kind: "close"
discussions.dialogs.move.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.move.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.dialogs.new_discussion.id: string
discussions.dialogs.new_discussion.title*: string
discussions.dialogs.new_discussion.title[LabText].en: string
discussions.dialogs.new_discussion.title[LabText].zh-CN: string
discussions.dialogs.new_discussion.subtitle*: string  (optional)
discussions.dialogs.new_discussion.subtitle[LabText].en: string
discussions.dialogs.new_discussion.subtitle[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="text"].key: string
discussions.dialogs.new_discussion.fields[][kind="text"].label*: string
discussions.dialogs.new_discussion.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="text"].kind: "text"
discussions.dialogs.new_discussion.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="area"].key: string
discussions.dialogs.new_discussion.fields[][kind="area"].label*: string
discussions.dialogs.new_discussion.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="area"].kind: "area"
discussions.dialogs.new_discussion.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="segmented"].key: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].label*: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].id: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="choice"].key: string
discussions.dialogs.new_discussion.fields[][kind="choice"].label*: string
discussions.dialogs.new_discussion.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="choice"].kind: "choice"
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].id: string
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].label*: string
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="multi"].key: string
discussions.dialogs.new_discussion.fields[][kind="multi"].label*: string
discussions.dialogs.new_discussion.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="multi"].kind: "multi"
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].id: string
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].label*: string
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="multi"].value[]: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].key: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].label*: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.new_discussion.fields[][kind="toggle"].onText*: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="info"].key: string
discussions.dialogs.new_discussion.fields[][kind="info"].label*: string
discussions.dialogs.new_discussion.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="info"].kind: "info"
discussions.dialogs.new_discussion.fields[][kind="info"].text*: string
discussions.dialogs.new_discussion.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.new_discussion.fields[][kind="code"].key: string
discussions.dialogs.new_discussion.fields[][kind="code"].label*: string
discussions.dialogs.new_discussion.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.new_discussion.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.new_discussion.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.new_discussion.fields[][kind="code"].kind: "code"
discussions.dialogs.new_discussion.fields[][kind="code"].code: string
discussions.dialogs.new_discussion.warning.tone: "danger" | "neutral"
discussions.dialogs.new_discussion.warning.text*: string
discussions.dialogs.new_discussion.warning.text[LabText].en: string
discussions.dialogs.new_discussion.warning.text[LabText].zh-CN: string
discussions.dialogs.new_discussion.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.new_discussion.confirmLabel*: string  (optional)
discussions.dialogs.new_discussion.confirmLabel[LabText].en: string
discussions.dialogs.new_discussion.confirmLabel[LabText].zh-CN: string
discussions.dialogs.new_discussion.hasCancel: boolean | undefined  (optional)
discussions.dialogs.new_discussion.completion[kind="done"].kind: "done"
discussions.dialogs.new_discussion.completion[kind="done"].title*: string  (optional)
discussions.dialogs.new_discussion.completion[kind="done"].title[LabText].en: string
discussions.dialogs.new_discussion.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.new_discussion.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.new_discussion.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.new_discussion.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.new_discussion.completion[kind="close"].kind: "close"
discussions.dialogs.new_discussion.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.new_discussion.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.dialogs.rename.id: string
discussions.dialogs.rename.title*: string
discussions.dialogs.rename.title[LabText].en: string
discussions.dialogs.rename.title[LabText].zh-CN: string
discussions.dialogs.rename.subtitle*: string  (optional)
discussions.dialogs.rename.subtitle[LabText].en: string
discussions.dialogs.rename.subtitle[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="text"].key: string
discussions.dialogs.rename.fields[][kind="text"].label*: string
discussions.dialogs.rename.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="text"].kind: "text"
discussions.dialogs.rename.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.rename.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.rename.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.rename.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.rename.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.rename.fields[][kind="area"].key: string
discussions.dialogs.rename.fields[][kind="area"].label*: string
discussions.dialogs.rename.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="area"].kind: "area"
discussions.dialogs.rename.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.rename.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.rename.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.rename.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.rename.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.rename.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.rename.fields[][kind="segmented"].key: string
discussions.dialogs.rename.fields[][kind="segmented"].label*: string
discussions.dialogs.rename.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.rename.fields[][kind="segmented"].options[].id: string
discussions.dialogs.rename.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.rename.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.rename.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.rename.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.rename.fields[][kind="choice"].key: string
discussions.dialogs.rename.fields[][kind="choice"].label*: string
discussions.dialogs.rename.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="choice"].kind: "choice"
discussions.dialogs.rename.fields[][kind="choice"].options[].id: string
discussions.dialogs.rename.fields[][kind="choice"].options[].label*: string
discussions.dialogs.rename.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.rename.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.rename.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.rename.fields[][kind="multi"].key: string
discussions.dialogs.rename.fields[][kind="multi"].label*: string
discussions.dialogs.rename.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="multi"].kind: "multi"
discussions.dialogs.rename.fields[][kind="multi"].options[].id: string
discussions.dialogs.rename.fields[][kind="multi"].options[].label*: string
discussions.dialogs.rename.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.rename.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.rename.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="multi"].value[]: string
discussions.dialogs.rename.fields[][kind="toggle"].key: string
discussions.dialogs.rename.fields[][kind="toggle"].label*: string
discussions.dialogs.rename.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.rename.fields[][kind="toggle"].onText*: string
discussions.dialogs.rename.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.rename.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.rename.fields[][kind="info"].key: string
discussions.dialogs.rename.fields[][kind="info"].label*: string
discussions.dialogs.rename.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="info"].kind: "info"
discussions.dialogs.rename.fields[][kind="info"].text*: string
discussions.dialogs.rename.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.rename.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.rename.fields[][kind="code"].key: string
discussions.dialogs.rename.fields[][kind="code"].label*: string
discussions.dialogs.rename.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.rename.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.rename.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.rename.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.rename.fields[][kind="code"].kind: "code"
discussions.dialogs.rename.fields[][kind="code"].code: string
discussions.dialogs.rename.warning.tone: "danger" | "neutral"
discussions.dialogs.rename.warning.text*: string
discussions.dialogs.rename.warning.text[LabText].en: string
discussions.dialogs.rename.warning.text[LabText].zh-CN: string
discussions.dialogs.rename.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.rename.confirmLabel*: string  (optional)
discussions.dialogs.rename.confirmLabel[LabText].en: string
discussions.dialogs.rename.confirmLabel[LabText].zh-CN: string
discussions.dialogs.rename.hasCancel: boolean | undefined  (optional)
discussions.dialogs.rename.completion[kind="done"].kind: "done"
discussions.dialogs.rename.completion[kind="done"].title*: string  (optional)
discussions.dialogs.rename.completion[kind="done"].title[LabText].en: string
discussions.dialogs.rename.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.rename.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.rename.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.rename.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.rename.completion[kind="close"].kind: "close"
discussions.dialogs.rename.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.rename.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.dialogs.why_nodes.id: string
discussions.dialogs.why_nodes.title*: string
discussions.dialogs.why_nodes.title[LabText].en: string
discussions.dialogs.why_nodes.title[LabText].zh-CN: string
discussions.dialogs.why_nodes.subtitle*: string  (optional)
discussions.dialogs.why_nodes.subtitle[LabText].en: string
discussions.dialogs.why_nodes.subtitle[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="text"].key: string
discussions.dialogs.why_nodes.fields[][kind="text"].label*: string
discussions.dialogs.why_nodes.fields[][kind="text"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="text"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="text"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="text"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="text"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="text"].kind: "text"
discussions.dialogs.why_nodes.fields[][kind="text"].placeholder*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="text"].placeholder[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="text"].placeholder[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="text"].value*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="text"].value[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="text"].value[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="text"].mono: boolean | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="area"].key: string
discussions.dialogs.why_nodes.fields[][kind="area"].label*: string
discussions.dialogs.why_nodes.fields[][kind="area"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="area"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="area"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="area"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="area"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="area"].kind: "area"
discussions.dialogs.why_nodes.fields[][kind="area"].placeholder*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="area"].placeholder[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="area"].placeholder[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="area"].value*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="area"].value[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="area"].value[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="area"].mono: boolean | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="area"].rows: number | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="segmented"].key: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].label*: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="segmented"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].kind: "segmented"
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].id: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].label*: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].meta*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].meta[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="segmented"].value: string | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="choice"].key: string
discussions.dialogs.why_nodes.fields[][kind="choice"].label*: string
discussions.dialogs.why_nodes.fields[][kind="choice"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="choice"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="choice"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="choice"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="choice"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="choice"].kind: "choice"
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].id: string
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].label*: string
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].meta*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].meta[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="choice"].value: string | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="multi"].key: string
discussions.dialogs.why_nodes.fields[][kind="multi"].label*: string
discussions.dialogs.why_nodes.fields[][kind="multi"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="multi"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="multi"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="multi"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="multi"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="multi"].kind: "multi"
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].id: string
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].label*: string
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].meta*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].meta[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="multi"].value[]: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].key: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].label*: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="toggle"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].kind: "toggle"
discussions.dialogs.why_nodes.fields[][kind="toggle"].onText*: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].onText[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].onText[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="toggle"].value: boolean | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="info"].key: string
discussions.dialogs.why_nodes.fields[][kind="info"].label*: string
discussions.dialogs.why_nodes.fields[][kind="info"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="info"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="info"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="info"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="info"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="info"].kind: "info"
discussions.dialogs.why_nodes.fields[][kind="info"].text*: string
discussions.dialogs.why_nodes.fields[][kind="info"].text[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="info"].text[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="info"].mono: boolean | undefined  (optional)
discussions.dialogs.why_nodes.fields[][kind="code"].key: string
discussions.dialogs.why_nodes.fields[][kind="code"].label*: string
discussions.dialogs.why_nodes.fields[][kind="code"].label[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="code"].label[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="code"].hint*: string  (optional)
discussions.dialogs.why_nodes.fields[][kind="code"].hint[LabText].en: string
discussions.dialogs.why_nodes.fields[][kind="code"].hint[LabText].zh-CN: string
discussions.dialogs.why_nodes.fields[][kind="code"].kind: "code"
discussions.dialogs.why_nodes.fields[][kind="code"].code: string
discussions.dialogs.why_nodes.warning.tone: "danger" | "neutral"
discussions.dialogs.why_nodes.warning.text*: string
discussions.dialogs.why_nodes.warning.text[LabText].en: string
discussions.dialogs.why_nodes.warning.text[LabText].zh-CN: string
discussions.dialogs.why_nodes.tone: "danger" | "default" | undefined  (optional)
discussions.dialogs.why_nodes.confirmLabel*: string  (optional)
discussions.dialogs.why_nodes.confirmLabel[LabText].en: string
discussions.dialogs.why_nodes.confirmLabel[LabText].zh-CN: string
discussions.dialogs.why_nodes.hasCancel: boolean | undefined  (optional)
discussions.dialogs.why_nodes.completion[kind="done"].kind: "done"
discussions.dialogs.why_nodes.completion[kind="done"].title*: string  (optional)
discussions.dialogs.why_nodes.completion[kind="done"].title[LabText].en: string
discussions.dialogs.why_nodes.completion[kind="done"].title[LabText].zh-CN: string
discussions.dialogs.why_nodes.completion[kind="done"].detail*: string  (optional)
discussions.dialogs.why_nodes.completion[kind="done"].detail[LabText].en: string
discussions.dialogs.why_nodes.completion[kind="done"].detail[LabText].zh-CN: string
discussions.dialogs.why_nodes.completion[kind="close"].kind: "close"
discussions.dialogs.why_nodes.size: "lg" | "md" | "xl" | undefined  (optional)
discussions.dialogs.why_nodes.labelColumn: "aligned" | "none" | undefined  (optional)
discussions.userId: string
discussions.discussions[].id: string
discussions.discussions[].name*: string
discussions.discussions[].name[LabText].en: string
discussions.discussions[].name[LabText].zh-CN: string
discussions.discussions[].projectId: string
discussions.discussions[].experiments[].runId: string
discussions.discussions[].experiments[].relation: "bound" | "originated"
discussions.discussions[].time*: string
discussions.discussions[].time[LabText].en: string
discussions.discussions[].time[LabText].zh-CN: string
discussions.discussions[].last*: string
discussions.discussions[].last[LabText].en: string
discussions.discussions[].last[LabText].zh-CN: string
discussions.discussions[].unread: boolean
discussions.discussions[].started*: string
discussions.discussions[].started[LabText].en: string
discussions.discussions[].started[LabText].zh-CN: string
discussions.discussions[].messages[][kind="user"].id: string
discussions.discussions[].messages[][kind="user"].time: string
discussions.discussions[].messages[][kind="user"].text*: string
discussions.discussions[].messages[][kind="user"].text[LabText].en: string
discussions.discussions[].messages[][kind="user"].text[LabText].zh-CN: string
discussions.discussions[].messages[][kind="user"].day*: string  (optional)
discussions.discussions[].messages[][kind="user"].day[LabText].en: string
discussions.discussions[].messages[][kind="user"].day[LabText].zh-CN: string
discussions.discussions[].messages[][kind="user"].references[]: `${string}:${string}`
discussions.discussions[].messages[][kind="user"].kind: "user"
discussions.discussions[].messages[][kind="ai"].id: string
discussions.discussions[].messages[][kind="ai"].time: string
discussions.discussions[].messages[][kind="ai"].text*: string
discussions.discussions[].messages[][kind="ai"].text[LabText].en: string
discussions.discussions[].messages[][kind="ai"].text[LabText].zh-CN: string
discussions.discussions[].messages[][kind="ai"].day*: string  (optional)
discussions.discussions[].messages[][kind="ai"].day[LabText].en: string
discussions.discussions[].messages[][kind="ai"].day[LabText].zh-CN: string
discussions.discussions[].messages[][kind="ai"].references[]: `${string}:${string}`
discussions.discussions[].messages[][kind="ai"].kind: "ai"
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].kind: "plan"
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.runId: string | null  (nullable)
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.title*: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.title[LabText].en: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.title[LabText].zh-CN: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.meta*: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.meta[LabText].en: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.meta[LabText].zh-CN: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.steps[].text*: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.steps[].text[LabText].en: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.steps[].text[LabText].zh-CN: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="plan"].plan.steps[].node: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].kind: "conclusion"
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.conclusionId: string  (optional)  // Present when the attachment resolves to an authoritative conclusion.
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.conclusionId.__@$brand@478.ConclusionId: true
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.text*: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.text[LabText].en: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.text[LabText].zh-CN: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.confidence: "medium" | null  (nullable)
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.evidence*: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.evidence[LabText].en: string
discussions.discussions[].messages[][kind="ai"].attachments[][kind="conclusion"].draft.evidence[LabText].zh-CN: string
discussions.discussions[].conclusions[][kind="confirmed"].kind: "confirmed"
discussions.discussions[].conclusions[][kind="confirmed"].time*: string
discussions.discussions[].conclusions[][kind="confirmed"].time[LabText].en: string
discussions.discussions[].conclusions[][kind="confirmed"].time[LabText].zh-CN: string
discussions.discussions[].conclusions[][kind="confirmed"].text*: string
discussions.discussions[].conclusions[][kind="confirmed"].text[LabText].en: string
discussions.discussions[].conclusions[][kind="confirmed"].text[LabText].zh-CN: string
discussions.discussions[].conclusions[][kind="confirmed"].evidence*: string
discussions.discussions[].conclusions[][kind="confirmed"].evidence[LabText].en: string
discussions.discussions[].conclusions[][kind="confirmed"].evidence[LabText].zh-CN: string
discussions.discussions[].conclusions[][kind="pending"].kind: "pending"
discussions.discussions[].conclusions[][kind="pending"].pendingRunId: string | null  (nullable)
discussions.discussions[].conclusions[][kind="pending"].time*: string
discussions.discussions[].conclusions[][kind="pending"].time[LabText].en: string
discussions.discussions[].conclusions[][kind="pending"].time[LabText].zh-CN: string
discussions.discussions[].conclusions[][kind="pending"].text*: string
discussions.discussions[].conclusions[][kind="pending"].text[LabText].en: string
discussions.discussions[].conclusions[][kind="pending"].text[LabText].zh-CN: string
discussions.discussions[].conclusions[][kind="pending"].evidence*: string
discussions.discussions[].conclusions[][kind="pending"].evidence[LabText].en: string
discussions.discussions[].conclusions[][kind="pending"].evidence[LabText].zh-CN: string
discussions.artifacts[].id: `${string}:${string}`
discussions.artifacts[].runId: string
discussions.artifacts[].path: string
discussions.artifacts[].node: string
discussions.artifacts[].size: string
discussions.filePreviews[].path: string
discussions.filePreviews[].preview[kind="table"].kind: "table"
discussions.filePreviews[].preview[kind="table"].columns[]*: string
discussions.filePreviews[].preview[kind="table"].columns[][LabText].en: string
discussions.filePreviews[].preview[kind="table"].columns[][LabText].zh-CN: string
discussions.filePreviews[].preview[kind="table"].rows[][]*: string
discussions.filePreviews[].preview[kind="table"].rows[][][LabText].en: string
discussions.filePreviews[].preview[kind="table"].rows[][][LabText].zh-CN: string
discussions.filePreviews[].preview[kind="table"].highlightedRow: number | undefined  (optional)
discussions.filePreviews[].preview[kind="table"].note*: string  (optional)
discussions.filePreviews[].preview[kind="table"].note[LabText].en: string
discussions.filePreviews[].preview[kind="table"].note[LabText].zh-CN: string
discussions.filePreviews[].preview[kind="image"].kind: "image"
discussions.filePreviews[].preview[kind="image"].aspect[0]: number
discussions.filePreviews[].preview[kind="image"].aspect[1]: number
discussions.filePreviews[].preview[kind="image"].dimensions*: string
discussions.filePreviews[].preview[kind="image"].dimensions[LabText].en: string
discussions.filePreviews[].preview[kind="image"].dimensions[LabText].zh-CN: string
discussions.filePreviews[].preview[kind="text"].kind: "text"
discussions.filePreviews[].preview[kind="text"].text*: string
discussions.filePreviews[].preview[kind="text"].text[LabText].en: string
discussions.filePreviews[].preview[kind="text"].text[LabText].zh-CN: string
discussions.experimentProgress[].runId: string
discussions.experimentProgress[].detail*: string
discussions.experimentProgress[].detail[LabText].en: string
discussions.experimentProgress[].detail[LabText].zh-CN: string
discussions.experimentProgress[].progress[kind="none"].kind: "none"
discussions.experimentProgress[].progress[kind="measured"].kind: "measured"
discussions.experimentProgress[].progress[kind="measured"].done: number
discussions.experimentProgress[].progress[kind="measured"].total: number
discussions.initialLoadedArtifactIds[]: `${string}:${string}`
```

### `clusters` — ClustersFixture

> `/compute/clusters`

```
clusters.conversations[string].sessions[].name*: string
clusters.conversations[string].sessions[].name[LabText].en: string
clusters.conversations[string].sessions[].name[LabText].zh-CN: string
clusters.conversations[string].sessions[].meta*: string
clusters.conversations[string].sessions[].meta[LabText].en: string
clusters.conversations[string].sessions[].meta[LabText].zh-CN: string
clusters.conversations[string].seed[][kind="user"].kind: "user"
clusters.conversations[string].seed[][kind="user"].text*: string
clusters.conversations[string].seed[][kind="user"].text[LabText].en: string
clusters.conversations[string].seed[][kind="user"].text[LabText].zh-CN: string
clusters.conversations[string].seed[][kind="assistant"].kind: "assistant"
clusters.conversations[string].seed[][kind="assistant"].text*: string
clusters.conversations[string].seed[][kind="assistant"].text[LabText].en: string
clusters.conversations[string].seed[][kind="assistant"].text[LabText].zh-CN: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
clusters.conversations[string].seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
clusters.conversations[string].prompts[]*: string
clusters.conversations[string].prompts[][LabText].en: string
clusters.conversations[string].prompts[][LabText].zh-CN: string
clusters.conversations[string].reply.en: string
clusters.conversations[string].reply.zh-CN: string
clusters.conversations[string].placeholder.en: string
clusters.conversations[string].placeholder.zh-CN: string
clusters.conversations[string].subtitle.en: string
clusters.conversations[string].subtitle.zh-CN: string
clusters.conversations[string].scope.label.en: string
clusters.conversations[string].scope.label.zh-CN: string
clusters.conversations[string].scope.value*: string
clusters.conversations[string].scope.value[LabText].en: string
clusters.conversations[string].scope.value[LabText].zh-CN: string
clusters.dialogs.destroy.id: string
clusters.dialogs.destroy.title*: string
clusters.dialogs.destroy.title[LabText].en: string
clusters.dialogs.destroy.title[LabText].zh-CN: string
clusters.dialogs.destroy.subtitle*: string  (optional)
clusters.dialogs.destroy.subtitle[LabText].en: string
clusters.dialogs.destroy.subtitle[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="text"].key: string
clusters.dialogs.destroy.fields[][kind="text"].label*: string
clusters.dialogs.destroy.fields[][kind="text"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="text"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="text"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="text"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="text"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="text"].kind: "text"
clusters.dialogs.destroy.fields[][kind="text"].placeholder*: string  (optional)
clusters.dialogs.destroy.fields[][kind="text"].placeholder[LabText].en: string
clusters.dialogs.destroy.fields[][kind="text"].placeholder[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="text"].value*: string  (optional)
clusters.dialogs.destroy.fields[][kind="text"].value[LabText].en: string
clusters.dialogs.destroy.fields[][kind="text"].value[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="text"].mono: boolean | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="area"].key: string
clusters.dialogs.destroy.fields[][kind="area"].label*: string
clusters.dialogs.destroy.fields[][kind="area"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="area"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="area"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="area"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="area"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="area"].kind: "area"
clusters.dialogs.destroy.fields[][kind="area"].placeholder*: string  (optional)
clusters.dialogs.destroy.fields[][kind="area"].placeholder[LabText].en: string
clusters.dialogs.destroy.fields[][kind="area"].placeholder[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="area"].value*: string  (optional)
clusters.dialogs.destroy.fields[][kind="area"].value[LabText].en: string
clusters.dialogs.destroy.fields[][kind="area"].value[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="area"].mono: boolean | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="area"].rows: number | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="segmented"].key: string
clusters.dialogs.destroy.fields[][kind="segmented"].label*: string
clusters.dialogs.destroy.fields[][kind="segmented"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="segmented"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="segmented"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="segmented"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="segmented"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="segmented"].kind: "segmented"
clusters.dialogs.destroy.fields[][kind="segmented"].options[].id: string
clusters.dialogs.destroy.fields[][kind="segmented"].options[].label*: string
clusters.dialogs.destroy.fields[][kind="segmented"].options[].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="segmented"].options[].meta*: string  (optional)
clusters.dialogs.destroy.fields[][kind="segmented"].options[].meta[LabText].en: string
clusters.dialogs.destroy.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="segmented"].value: string | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="choice"].key: string
clusters.dialogs.destroy.fields[][kind="choice"].label*: string
clusters.dialogs.destroy.fields[][kind="choice"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="choice"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="choice"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="choice"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="choice"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="choice"].kind: "choice"
clusters.dialogs.destroy.fields[][kind="choice"].options[].id: string
clusters.dialogs.destroy.fields[][kind="choice"].options[].label*: string
clusters.dialogs.destroy.fields[][kind="choice"].options[].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="choice"].options[].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="choice"].options[].meta*: string  (optional)
clusters.dialogs.destroy.fields[][kind="choice"].options[].meta[LabText].en: string
clusters.dialogs.destroy.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="choice"].value: string | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="multi"].key: string
clusters.dialogs.destroy.fields[][kind="multi"].label*: string
clusters.dialogs.destroy.fields[][kind="multi"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="multi"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="multi"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="multi"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="multi"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="multi"].kind: "multi"
clusters.dialogs.destroy.fields[][kind="multi"].options[].id: string
clusters.dialogs.destroy.fields[][kind="multi"].options[].label*: string
clusters.dialogs.destroy.fields[][kind="multi"].options[].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="multi"].options[].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="multi"].options[].meta*: string  (optional)
clusters.dialogs.destroy.fields[][kind="multi"].options[].meta[LabText].en: string
clusters.dialogs.destroy.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="multi"].value[]: string
clusters.dialogs.destroy.fields[][kind="toggle"].key: string
clusters.dialogs.destroy.fields[][kind="toggle"].label*: string
clusters.dialogs.destroy.fields[][kind="toggle"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="toggle"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="toggle"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="toggle"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="toggle"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="toggle"].kind: "toggle"
clusters.dialogs.destroy.fields[][kind="toggle"].onText*: string
clusters.dialogs.destroy.fields[][kind="toggle"].onText[LabText].en: string
clusters.dialogs.destroy.fields[][kind="toggle"].onText[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="toggle"].value: boolean | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="info"].key: string
clusters.dialogs.destroy.fields[][kind="info"].label*: string
clusters.dialogs.destroy.fields[][kind="info"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="info"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="info"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="info"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="info"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="info"].kind: "info"
clusters.dialogs.destroy.fields[][kind="info"].text*: string
clusters.dialogs.destroy.fields[][kind="info"].text[LabText].en: string
clusters.dialogs.destroy.fields[][kind="info"].text[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="info"].mono: boolean | undefined  (optional)
clusters.dialogs.destroy.fields[][kind="code"].key: string
clusters.dialogs.destroy.fields[][kind="code"].label*: string
clusters.dialogs.destroy.fields[][kind="code"].label[LabText].en: string
clusters.dialogs.destroy.fields[][kind="code"].label[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="code"].hint*: string  (optional)
clusters.dialogs.destroy.fields[][kind="code"].hint[LabText].en: string
clusters.dialogs.destroy.fields[][kind="code"].hint[LabText].zh-CN: string
clusters.dialogs.destroy.fields[][kind="code"].kind: "code"
clusters.dialogs.destroy.fields[][kind="code"].code: string
clusters.dialogs.destroy.warning.tone: "danger" | "neutral"
clusters.dialogs.destroy.warning.text*: string
clusters.dialogs.destroy.warning.text[LabText].en: string
clusters.dialogs.destroy.warning.text[LabText].zh-CN: string
clusters.dialogs.destroy.tone: "danger" | "default" | undefined  (optional)
clusters.dialogs.destroy.confirmLabel*: string  (optional)
clusters.dialogs.destroy.confirmLabel[LabText].en: string
clusters.dialogs.destroy.confirmLabel[LabText].zh-CN: string
clusters.dialogs.destroy.hasCancel: boolean | undefined  (optional)
clusters.dialogs.destroy.completion[kind="done"].kind: "done"
clusters.dialogs.destroy.completion[kind="done"].title*: string  (optional)
clusters.dialogs.destroy.completion[kind="done"].title[LabText].en: string
clusters.dialogs.destroy.completion[kind="done"].title[LabText].zh-CN: string
clusters.dialogs.destroy.completion[kind="done"].detail*: string  (optional)
clusters.dialogs.destroy.completion[kind="done"].detail[LabText].en: string
clusters.dialogs.destroy.completion[kind="done"].detail[LabText].zh-CN: string
clusters.dialogs.destroy.completion[kind="close"].kind: "close"
clusters.dialogs.destroy.size: "lg" | "md" | "xl" | undefined  (optional)
clusters.dialogs.destroy.labelColumn: "aligned" | "none" | undefined  (optional)
clusters.dialogs.handshake.id: string
clusters.dialogs.handshake.title*: string
clusters.dialogs.handshake.title[LabText].en: string
clusters.dialogs.handshake.title[LabText].zh-CN: string
clusters.dialogs.handshake.subtitle*: string  (optional)
clusters.dialogs.handshake.subtitle[LabText].en: string
clusters.dialogs.handshake.subtitle[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="text"].key: string
clusters.dialogs.handshake.fields[][kind="text"].label*: string
clusters.dialogs.handshake.fields[][kind="text"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="text"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="text"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="text"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="text"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="text"].kind: "text"
clusters.dialogs.handshake.fields[][kind="text"].placeholder*: string  (optional)
clusters.dialogs.handshake.fields[][kind="text"].placeholder[LabText].en: string
clusters.dialogs.handshake.fields[][kind="text"].placeholder[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="text"].value*: string  (optional)
clusters.dialogs.handshake.fields[][kind="text"].value[LabText].en: string
clusters.dialogs.handshake.fields[][kind="text"].value[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="text"].mono: boolean | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="area"].key: string
clusters.dialogs.handshake.fields[][kind="area"].label*: string
clusters.dialogs.handshake.fields[][kind="area"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="area"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="area"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="area"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="area"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="area"].kind: "area"
clusters.dialogs.handshake.fields[][kind="area"].placeholder*: string  (optional)
clusters.dialogs.handshake.fields[][kind="area"].placeholder[LabText].en: string
clusters.dialogs.handshake.fields[][kind="area"].placeholder[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="area"].value*: string  (optional)
clusters.dialogs.handshake.fields[][kind="area"].value[LabText].en: string
clusters.dialogs.handshake.fields[][kind="area"].value[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="area"].mono: boolean | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="area"].rows: number | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="segmented"].key: string
clusters.dialogs.handshake.fields[][kind="segmented"].label*: string
clusters.dialogs.handshake.fields[][kind="segmented"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="segmented"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="segmented"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="segmented"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="segmented"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="segmented"].kind: "segmented"
clusters.dialogs.handshake.fields[][kind="segmented"].options[].id: string
clusters.dialogs.handshake.fields[][kind="segmented"].options[].label*: string
clusters.dialogs.handshake.fields[][kind="segmented"].options[].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="segmented"].options[].meta*: string  (optional)
clusters.dialogs.handshake.fields[][kind="segmented"].options[].meta[LabText].en: string
clusters.dialogs.handshake.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="segmented"].value: string | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="choice"].key: string
clusters.dialogs.handshake.fields[][kind="choice"].label*: string
clusters.dialogs.handshake.fields[][kind="choice"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="choice"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="choice"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="choice"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="choice"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="choice"].kind: "choice"
clusters.dialogs.handshake.fields[][kind="choice"].options[].id: string
clusters.dialogs.handshake.fields[][kind="choice"].options[].label*: string
clusters.dialogs.handshake.fields[][kind="choice"].options[].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="choice"].options[].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="choice"].options[].meta*: string  (optional)
clusters.dialogs.handshake.fields[][kind="choice"].options[].meta[LabText].en: string
clusters.dialogs.handshake.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="choice"].value: string | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="multi"].key: string
clusters.dialogs.handshake.fields[][kind="multi"].label*: string
clusters.dialogs.handshake.fields[][kind="multi"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="multi"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="multi"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="multi"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="multi"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="multi"].kind: "multi"
clusters.dialogs.handshake.fields[][kind="multi"].options[].id: string
clusters.dialogs.handshake.fields[][kind="multi"].options[].label*: string
clusters.dialogs.handshake.fields[][kind="multi"].options[].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="multi"].options[].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="multi"].options[].meta*: string  (optional)
clusters.dialogs.handshake.fields[][kind="multi"].options[].meta[LabText].en: string
clusters.dialogs.handshake.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="multi"].value[]: string
clusters.dialogs.handshake.fields[][kind="toggle"].key: string
clusters.dialogs.handshake.fields[][kind="toggle"].label*: string
clusters.dialogs.handshake.fields[][kind="toggle"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="toggle"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="toggle"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="toggle"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="toggle"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="toggle"].kind: "toggle"
clusters.dialogs.handshake.fields[][kind="toggle"].onText*: string
clusters.dialogs.handshake.fields[][kind="toggle"].onText[LabText].en: string
clusters.dialogs.handshake.fields[][kind="toggle"].onText[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="toggle"].value: boolean | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="info"].key: string
clusters.dialogs.handshake.fields[][kind="info"].label*: string
clusters.dialogs.handshake.fields[][kind="info"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="info"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="info"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="info"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="info"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="info"].kind: "info"
clusters.dialogs.handshake.fields[][kind="info"].text*: string
clusters.dialogs.handshake.fields[][kind="info"].text[LabText].en: string
clusters.dialogs.handshake.fields[][kind="info"].text[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="info"].mono: boolean | undefined  (optional)
clusters.dialogs.handshake.fields[][kind="code"].key: string
clusters.dialogs.handshake.fields[][kind="code"].label*: string
clusters.dialogs.handshake.fields[][kind="code"].label[LabText].en: string
clusters.dialogs.handshake.fields[][kind="code"].label[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="code"].hint*: string  (optional)
clusters.dialogs.handshake.fields[][kind="code"].hint[LabText].en: string
clusters.dialogs.handshake.fields[][kind="code"].hint[LabText].zh-CN: string
clusters.dialogs.handshake.fields[][kind="code"].kind: "code"
clusters.dialogs.handshake.fields[][kind="code"].code: string
clusters.dialogs.handshake.warning.tone: "danger" | "neutral"
clusters.dialogs.handshake.warning.text*: string
clusters.dialogs.handshake.warning.text[LabText].en: string
clusters.dialogs.handshake.warning.text[LabText].zh-CN: string
clusters.dialogs.handshake.tone: "danger" | "default" | undefined  (optional)
clusters.dialogs.handshake.confirmLabel*: string  (optional)
clusters.dialogs.handshake.confirmLabel[LabText].en: string
clusters.dialogs.handshake.confirmLabel[LabText].zh-CN: string
clusters.dialogs.handshake.hasCancel: boolean | undefined  (optional)
clusters.dialogs.handshake.completion[kind="done"].kind: "done"
clusters.dialogs.handshake.completion[kind="done"].title*: string  (optional)
clusters.dialogs.handshake.completion[kind="done"].title[LabText].en: string
clusters.dialogs.handshake.completion[kind="done"].title[LabText].zh-CN: string
clusters.dialogs.handshake.completion[kind="done"].detail*: string  (optional)
clusters.dialogs.handshake.completion[kind="done"].detail[LabText].en: string
clusters.dialogs.handshake.completion[kind="done"].detail[LabText].zh-CN: string
clusters.dialogs.handshake.completion[kind="close"].kind: "close"
clusters.dialogs.handshake.size: "lg" | "md" | "xl" | undefined  (optional)
clusters.dialogs.handshake.labelColumn: "aligned" | "none" | undefined  (optional)
clusters.dialogs.new_sandbox.id: string
clusters.dialogs.new_sandbox.title*: string
clusters.dialogs.new_sandbox.title[LabText].en: string
clusters.dialogs.new_sandbox.title[LabText].zh-CN: string
clusters.dialogs.new_sandbox.subtitle*: string  (optional)
clusters.dialogs.new_sandbox.subtitle[LabText].en: string
clusters.dialogs.new_sandbox.subtitle[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="text"].key: string
clusters.dialogs.new_sandbox.fields[][kind="text"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="text"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="text"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="text"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="text"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="text"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="text"].kind: "text"
clusters.dialogs.new_sandbox.fields[][kind="text"].placeholder*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="text"].placeholder[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="text"].placeholder[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="text"].value*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="text"].value[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="text"].value[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="text"].mono: boolean | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="area"].key: string
clusters.dialogs.new_sandbox.fields[][kind="area"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="area"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="area"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="area"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="area"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="area"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="area"].kind: "area"
clusters.dialogs.new_sandbox.fields[][kind="area"].placeholder*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="area"].placeholder[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="area"].placeholder[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="area"].value*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="area"].value[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="area"].value[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="area"].mono: boolean | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="area"].rows: number | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="segmented"].key: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="segmented"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].kind: "segmented"
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].id: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].label*: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].meta*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].meta[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="segmented"].value: string | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="choice"].key: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="choice"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].kind: "choice"
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].id: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].label*: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].meta*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].meta[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="choice"].value: string | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="multi"].key: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="multi"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].kind: "multi"
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].id: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].label*: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].meta*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].meta[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="multi"].value[]: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].key: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="toggle"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].kind: "toggle"
clusters.dialogs.new_sandbox.fields[][kind="toggle"].onText*: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].onText[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].onText[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="toggle"].value: boolean | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="info"].key: string
clusters.dialogs.new_sandbox.fields[][kind="info"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="info"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="info"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="info"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="info"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="info"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="info"].kind: "info"
clusters.dialogs.new_sandbox.fields[][kind="info"].text*: string
clusters.dialogs.new_sandbox.fields[][kind="info"].text[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="info"].text[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="info"].mono: boolean | undefined  (optional)
clusters.dialogs.new_sandbox.fields[][kind="code"].key: string
clusters.dialogs.new_sandbox.fields[][kind="code"].label*: string
clusters.dialogs.new_sandbox.fields[][kind="code"].label[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="code"].label[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="code"].hint*: string  (optional)
clusters.dialogs.new_sandbox.fields[][kind="code"].hint[LabText].en: string
clusters.dialogs.new_sandbox.fields[][kind="code"].hint[LabText].zh-CN: string
clusters.dialogs.new_sandbox.fields[][kind="code"].kind: "code"
clusters.dialogs.new_sandbox.fields[][kind="code"].code: string
clusters.dialogs.new_sandbox.warning.tone: "danger" | "neutral"
clusters.dialogs.new_sandbox.warning.text*: string
clusters.dialogs.new_sandbox.warning.text[LabText].en: string
clusters.dialogs.new_sandbox.warning.text[LabText].zh-CN: string
clusters.dialogs.new_sandbox.tone: "danger" | "default" | undefined  (optional)
clusters.dialogs.new_sandbox.confirmLabel*: string  (optional)
clusters.dialogs.new_sandbox.confirmLabel[LabText].en: string
clusters.dialogs.new_sandbox.confirmLabel[LabText].zh-CN: string
clusters.dialogs.new_sandbox.hasCancel: boolean | undefined  (optional)
clusters.dialogs.new_sandbox.completion[kind="done"].kind: "done"
clusters.dialogs.new_sandbox.completion[kind="done"].title*: string  (optional)
clusters.dialogs.new_sandbox.completion[kind="done"].title[LabText].en: string
clusters.dialogs.new_sandbox.completion[kind="done"].title[LabText].zh-CN: string
clusters.dialogs.new_sandbox.completion[kind="done"].detail*: string  (optional)
clusters.dialogs.new_sandbox.completion[kind="done"].detail[LabText].en: string
clusters.dialogs.new_sandbox.completion[kind="done"].detail[LabText].zh-CN: string
clusters.dialogs.new_sandbox.completion[kind="close"].kind: "close"
clusters.dialogs.new_sandbox.size: "lg" | "md" | "xl" | undefined  (optional)
clusters.dialogs.new_sandbox.labelColumn: "aligned" | "none" | undefined  (optional)
clusters.dialogs.pull_image.id: string
clusters.dialogs.pull_image.title*: string
clusters.dialogs.pull_image.title[LabText].en: string
clusters.dialogs.pull_image.title[LabText].zh-CN: string
clusters.dialogs.pull_image.subtitle*: string  (optional)
clusters.dialogs.pull_image.subtitle[LabText].en: string
clusters.dialogs.pull_image.subtitle[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="text"].key: string
clusters.dialogs.pull_image.fields[][kind="text"].label*: string
clusters.dialogs.pull_image.fields[][kind="text"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="text"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="text"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="text"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="text"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="text"].kind: "text"
clusters.dialogs.pull_image.fields[][kind="text"].placeholder*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="text"].placeholder[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="text"].placeholder[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="text"].value*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="text"].value[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="text"].value[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="text"].mono: boolean | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="area"].key: string
clusters.dialogs.pull_image.fields[][kind="area"].label*: string
clusters.dialogs.pull_image.fields[][kind="area"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="area"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="area"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="area"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="area"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="area"].kind: "area"
clusters.dialogs.pull_image.fields[][kind="area"].placeholder*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="area"].placeholder[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="area"].placeholder[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="area"].value*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="area"].value[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="area"].value[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="area"].mono: boolean | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="area"].rows: number | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="segmented"].key: string
clusters.dialogs.pull_image.fields[][kind="segmented"].label*: string
clusters.dialogs.pull_image.fields[][kind="segmented"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="segmented"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="segmented"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="segmented"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="segmented"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="segmented"].kind: "segmented"
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].id: string
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].label*: string
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].meta*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].meta[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="segmented"].value: string | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="choice"].key: string
clusters.dialogs.pull_image.fields[][kind="choice"].label*: string
clusters.dialogs.pull_image.fields[][kind="choice"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="choice"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="choice"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="choice"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="choice"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="choice"].kind: "choice"
clusters.dialogs.pull_image.fields[][kind="choice"].options[].id: string
clusters.dialogs.pull_image.fields[][kind="choice"].options[].label*: string
clusters.dialogs.pull_image.fields[][kind="choice"].options[].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="choice"].options[].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="choice"].options[].meta*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="choice"].options[].meta[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="choice"].value: string | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="multi"].key: string
clusters.dialogs.pull_image.fields[][kind="multi"].label*: string
clusters.dialogs.pull_image.fields[][kind="multi"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="multi"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="multi"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="multi"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="multi"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="multi"].kind: "multi"
clusters.dialogs.pull_image.fields[][kind="multi"].options[].id: string
clusters.dialogs.pull_image.fields[][kind="multi"].options[].label*: string
clusters.dialogs.pull_image.fields[][kind="multi"].options[].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="multi"].options[].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="multi"].options[].meta*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="multi"].options[].meta[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="multi"].value[]: string
clusters.dialogs.pull_image.fields[][kind="toggle"].key: string
clusters.dialogs.pull_image.fields[][kind="toggle"].label*: string
clusters.dialogs.pull_image.fields[][kind="toggle"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="toggle"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="toggle"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="toggle"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="toggle"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="toggle"].kind: "toggle"
clusters.dialogs.pull_image.fields[][kind="toggle"].onText*: string
clusters.dialogs.pull_image.fields[][kind="toggle"].onText[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="toggle"].onText[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="toggle"].value: boolean | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="info"].key: string
clusters.dialogs.pull_image.fields[][kind="info"].label*: string
clusters.dialogs.pull_image.fields[][kind="info"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="info"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="info"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="info"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="info"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="info"].kind: "info"
clusters.dialogs.pull_image.fields[][kind="info"].text*: string
clusters.dialogs.pull_image.fields[][kind="info"].text[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="info"].text[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="info"].mono: boolean | undefined  (optional)
clusters.dialogs.pull_image.fields[][kind="code"].key: string
clusters.dialogs.pull_image.fields[][kind="code"].label*: string
clusters.dialogs.pull_image.fields[][kind="code"].label[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="code"].label[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="code"].hint*: string  (optional)
clusters.dialogs.pull_image.fields[][kind="code"].hint[LabText].en: string
clusters.dialogs.pull_image.fields[][kind="code"].hint[LabText].zh-CN: string
clusters.dialogs.pull_image.fields[][kind="code"].kind: "code"
clusters.dialogs.pull_image.fields[][kind="code"].code: string
clusters.dialogs.pull_image.warning.tone: "danger" | "neutral"
clusters.dialogs.pull_image.warning.text*: string
clusters.dialogs.pull_image.warning.text[LabText].en: string
clusters.dialogs.pull_image.warning.text[LabText].zh-CN: string
clusters.dialogs.pull_image.tone: "danger" | "default" | undefined  (optional)
clusters.dialogs.pull_image.confirmLabel*: string  (optional)
clusters.dialogs.pull_image.confirmLabel[LabText].en: string
clusters.dialogs.pull_image.confirmLabel[LabText].zh-CN: string
clusters.dialogs.pull_image.hasCancel: boolean | undefined  (optional)
clusters.dialogs.pull_image.completion[kind="done"].kind: "done"
clusters.dialogs.pull_image.completion[kind="done"].title*: string  (optional)
clusters.dialogs.pull_image.completion[kind="done"].title[LabText].en: string
clusters.dialogs.pull_image.completion[kind="done"].title[LabText].zh-CN: string
clusters.dialogs.pull_image.completion[kind="done"].detail*: string  (optional)
clusters.dialogs.pull_image.completion[kind="done"].detail[LabText].en: string
clusters.dialogs.pull_image.completion[kind="done"].detail[LabText].zh-CN: string
clusters.dialogs.pull_image.completion[kind="close"].kind: "close"
clusters.dialogs.pull_image.size: "lg" | "md" | "xl" | undefined  (optional)
clusters.dialogs.pull_image.labelColumn: "aligned" | "none" | undefined  (optional)
clusters.dialogs.restart.id: string
clusters.dialogs.restart.title*: string
clusters.dialogs.restart.title[LabText].en: string
clusters.dialogs.restart.title[LabText].zh-CN: string
clusters.dialogs.restart.subtitle*: string  (optional)
clusters.dialogs.restart.subtitle[LabText].en: string
clusters.dialogs.restart.subtitle[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="text"].key: string
clusters.dialogs.restart.fields[][kind="text"].label*: string
clusters.dialogs.restart.fields[][kind="text"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="text"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="text"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="text"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="text"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="text"].kind: "text"
clusters.dialogs.restart.fields[][kind="text"].placeholder*: string  (optional)
clusters.dialogs.restart.fields[][kind="text"].placeholder[LabText].en: string
clusters.dialogs.restart.fields[][kind="text"].placeholder[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="text"].value*: string  (optional)
clusters.dialogs.restart.fields[][kind="text"].value[LabText].en: string
clusters.dialogs.restart.fields[][kind="text"].value[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="text"].mono: boolean | undefined  (optional)
clusters.dialogs.restart.fields[][kind="area"].key: string
clusters.dialogs.restart.fields[][kind="area"].label*: string
clusters.dialogs.restart.fields[][kind="area"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="area"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="area"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="area"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="area"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="area"].kind: "area"
clusters.dialogs.restart.fields[][kind="area"].placeholder*: string  (optional)
clusters.dialogs.restart.fields[][kind="area"].placeholder[LabText].en: string
clusters.dialogs.restart.fields[][kind="area"].placeholder[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="area"].value*: string  (optional)
clusters.dialogs.restart.fields[][kind="area"].value[LabText].en: string
clusters.dialogs.restart.fields[][kind="area"].value[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="area"].mono: boolean | undefined  (optional)
clusters.dialogs.restart.fields[][kind="area"].rows: number | undefined  (optional)
clusters.dialogs.restart.fields[][kind="segmented"].key: string
clusters.dialogs.restart.fields[][kind="segmented"].label*: string
clusters.dialogs.restart.fields[][kind="segmented"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="segmented"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="segmented"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="segmented"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="segmented"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="segmented"].kind: "segmented"
clusters.dialogs.restart.fields[][kind="segmented"].options[].id: string
clusters.dialogs.restart.fields[][kind="segmented"].options[].label*: string
clusters.dialogs.restart.fields[][kind="segmented"].options[].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="segmented"].options[].meta*: string  (optional)
clusters.dialogs.restart.fields[][kind="segmented"].options[].meta[LabText].en: string
clusters.dialogs.restart.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="segmented"].value: string | undefined  (optional)
clusters.dialogs.restart.fields[][kind="choice"].key: string
clusters.dialogs.restart.fields[][kind="choice"].label*: string
clusters.dialogs.restart.fields[][kind="choice"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="choice"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="choice"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="choice"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="choice"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="choice"].kind: "choice"
clusters.dialogs.restart.fields[][kind="choice"].options[].id: string
clusters.dialogs.restart.fields[][kind="choice"].options[].label*: string
clusters.dialogs.restart.fields[][kind="choice"].options[].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="choice"].options[].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="choice"].options[].meta*: string  (optional)
clusters.dialogs.restart.fields[][kind="choice"].options[].meta[LabText].en: string
clusters.dialogs.restart.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="choice"].value: string | undefined  (optional)
clusters.dialogs.restart.fields[][kind="multi"].key: string
clusters.dialogs.restart.fields[][kind="multi"].label*: string
clusters.dialogs.restart.fields[][kind="multi"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="multi"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="multi"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="multi"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="multi"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="multi"].kind: "multi"
clusters.dialogs.restart.fields[][kind="multi"].options[].id: string
clusters.dialogs.restart.fields[][kind="multi"].options[].label*: string
clusters.dialogs.restart.fields[][kind="multi"].options[].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="multi"].options[].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="multi"].options[].meta*: string  (optional)
clusters.dialogs.restart.fields[][kind="multi"].options[].meta[LabText].en: string
clusters.dialogs.restart.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="multi"].value[]: string
clusters.dialogs.restart.fields[][kind="toggle"].key: string
clusters.dialogs.restart.fields[][kind="toggle"].label*: string
clusters.dialogs.restart.fields[][kind="toggle"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="toggle"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="toggle"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="toggle"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="toggle"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="toggle"].kind: "toggle"
clusters.dialogs.restart.fields[][kind="toggle"].onText*: string
clusters.dialogs.restart.fields[][kind="toggle"].onText[LabText].en: string
clusters.dialogs.restart.fields[][kind="toggle"].onText[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="toggle"].value: boolean | undefined  (optional)
clusters.dialogs.restart.fields[][kind="info"].key: string
clusters.dialogs.restart.fields[][kind="info"].label*: string
clusters.dialogs.restart.fields[][kind="info"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="info"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="info"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="info"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="info"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="info"].kind: "info"
clusters.dialogs.restart.fields[][kind="info"].text*: string
clusters.dialogs.restart.fields[][kind="info"].text[LabText].en: string
clusters.dialogs.restart.fields[][kind="info"].text[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="info"].mono: boolean | undefined  (optional)
clusters.dialogs.restart.fields[][kind="code"].key: string
clusters.dialogs.restart.fields[][kind="code"].label*: string
clusters.dialogs.restart.fields[][kind="code"].label[LabText].en: string
clusters.dialogs.restart.fields[][kind="code"].label[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="code"].hint*: string  (optional)
clusters.dialogs.restart.fields[][kind="code"].hint[LabText].en: string
clusters.dialogs.restart.fields[][kind="code"].hint[LabText].zh-CN: string
clusters.dialogs.restart.fields[][kind="code"].kind: "code"
clusters.dialogs.restart.fields[][kind="code"].code: string
clusters.dialogs.restart.warning.tone: "danger" | "neutral"
clusters.dialogs.restart.warning.text*: string
clusters.dialogs.restart.warning.text[LabText].en: string
clusters.dialogs.restart.warning.text[LabText].zh-CN: string
clusters.dialogs.restart.tone: "danger" | "default" | undefined  (optional)
clusters.dialogs.restart.confirmLabel*: string  (optional)
clusters.dialogs.restart.confirmLabel[LabText].en: string
clusters.dialogs.restart.confirmLabel[LabText].zh-CN: string
clusters.dialogs.restart.hasCancel: boolean | undefined  (optional)
clusters.dialogs.restart.completion[kind="done"].kind: "done"
clusters.dialogs.restart.completion[kind="done"].title*: string  (optional)
clusters.dialogs.restart.completion[kind="done"].title[LabText].en: string
clusters.dialogs.restart.completion[kind="done"].title[LabText].zh-CN: string
clusters.dialogs.restart.completion[kind="done"].detail*: string  (optional)
clusters.dialogs.restart.completion[kind="done"].detail[LabText].en: string
clusters.dialogs.restart.completion[kind="done"].detail[LabText].zh-CN: string
clusters.dialogs.restart.completion[kind="close"].kind: "close"
clusters.dialogs.restart.size: "lg" | "md" | "xl" | undefined  (optional)
clusters.dialogs.restart.labelColumn: "aligned" | "none" | undefined  (optional)
clusters.dialogs.shell.id: string
clusters.dialogs.shell.title*: string
clusters.dialogs.shell.title[LabText].en: string
clusters.dialogs.shell.title[LabText].zh-CN: string
clusters.dialogs.shell.subtitle*: string  (optional)
clusters.dialogs.shell.subtitle[LabText].en: string
clusters.dialogs.shell.subtitle[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="text"].key: string
clusters.dialogs.shell.fields[][kind="text"].label*: string
clusters.dialogs.shell.fields[][kind="text"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="text"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="text"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="text"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="text"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="text"].kind: "text"
clusters.dialogs.shell.fields[][kind="text"].placeholder*: string  (optional)
clusters.dialogs.shell.fields[][kind="text"].placeholder[LabText].en: string
clusters.dialogs.shell.fields[][kind="text"].placeholder[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="text"].value*: string  (optional)
clusters.dialogs.shell.fields[][kind="text"].value[LabText].en: string
clusters.dialogs.shell.fields[][kind="text"].value[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="text"].mono: boolean | undefined  (optional)
clusters.dialogs.shell.fields[][kind="area"].key: string
clusters.dialogs.shell.fields[][kind="area"].label*: string
clusters.dialogs.shell.fields[][kind="area"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="area"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="area"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="area"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="area"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="area"].kind: "area"
clusters.dialogs.shell.fields[][kind="area"].placeholder*: string  (optional)
clusters.dialogs.shell.fields[][kind="area"].placeholder[LabText].en: string
clusters.dialogs.shell.fields[][kind="area"].placeholder[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="area"].value*: string  (optional)
clusters.dialogs.shell.fields[][kind="area"].value[LabText].en: string
clusters.dialogs.shell.fields[][kind="area"].value[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="area"].mono: boolean | undefined  (optional)
clusters.dialogs.shell.fields[][kind="area"].rows: number | undefined  (optional)
clusters.dialogs.shell.fields[][kind="segmented"].key: string
clusters.dialogs.shell.fields[][kind="segmented"].label*: string
clusters.dialogs.shell.fields[][kind="segmented"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="segmented"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="segmented"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="segmented"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="segmented"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="segmented"].kind: "segmented"
clusters.dialogs.shell.fields[][kind="segmented"].options[].id: string
clusters.dialogs.shell.fields[][kind="segmented"].options[].label*: string
clusters.dialogs.shell.fields[][kind="segmented"].options[].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="segmented"].options[].meta*: string  (optional)
clusters.dialogs.shell.fields[][kind="segmented"].options[].meta[LabText].en: string
clusters.dialogs.shell.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="segmented"].value: string | undefined  (optional)
clusters.dialogs.shell.fields[][kind="choice"].key: string
clusters.dialogs.shell.fields[][kind="choice"].label*: string
clusters.dialogs.shell.fields[][kind="choice"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="choice"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="choice"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="choice"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="choice"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="choice"].kind: "choice"
clusters.dialogs.shell.fields[][kind="choice"].options[].id: string
clusters.dialogs.shell.fields[][kind="choice"].options[].label*: string
clusters.dialogs.shell.fields[][kind="choice"].options[].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="choice"].options[].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="choice"].options[].meta*: string  (optional)
clusters.dialogs.shell.fields[][kind="choice"].options[].meta[LabText].en: string
clusters.dialogs.shell.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="choice"].value: string | undefined  (optional)
clusters.dialogs.shell.fields[][kind="multi"].key: string
clusters.dialogs.shell.fields[][kind="multi"].label*: string
clusters.dialogs.shell.fields[][kind="multi"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="multi"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="multi"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="multi"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="multi"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="multi"].kind: "multi"
clusters.dialogs.shell.fields[][kind="multi"].options[].id: string
clusters.dialogs.shell.fields[][kind="multi"].options[].label*: string
clusters.dialogs.shell.fields[][kind="multi"].options[].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="multi"].options[].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="multi"].options[].meta*: string  (optional)
clusters.dialogs.shell.fields[][kind="multi"].options[].meta[LabText].en: string
clusters.dialogs.shell.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="multi"].value[]: string
clusters.dialogs.shell.fields[][kind="toggle"].key: string
clusters.dialogs.shell.fields[][kind="toggle"].label*: string
clusters.dialogs.shell.fields[][kind="toggle"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="toggle"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="toggle"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="toggle"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="toggle"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="toggle"].kind: "toggle"
clusters.dialogs.shell.fields[][kind="toggle"].onText*: string
clusters.dialogs.shell.fields[][kind="toggle"].onText[LabText].en: string
clusters.dialogs.shell.fields[][kind="toggle"].onText[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="toggle"].value: boolean | undefined  (optional)
clusters.dialogs.shell.fields[][kind="info"].key: string
clusters.dialogs.shell.fields[][kind="info"].label*: string
clusters.dialogs.shell.fields[][kind="info"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="info"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="info"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="info"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="info"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="info"].kind: "info"
clusters.dialogs.shell.fields[][kind="info"].text*: string
clusters.dialogs.shell.fields[][kind="info"].text[LabText].en: string
clusters.dialogs.shell.fields[][kind="info"].text[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="info"].mono: boolean | undefined  (optional)
clusters.dialogs.shell.fields[][kind="code"].key: string
clusters.dialogs.shell.fields[][kind="code"].label*: string
clusters.dialogs.shell.fields[][kind="code"].label[LabText].en: string
clusters.dialogs.shell.fields[][kind="code"].label[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="code"].hint*: string  (optional)
clusters.dialogs.shell.fields[][kind="code"].hint[LabText].en: string
clusters.dialogs.shell.fields[][kind="code"].hint[LabText].zh-CN: string
clusters.dialogs.shell.fields[][kind="code"].kind: "code"
clusters.dialogs.shell.fields[][kind="code"].code: string
clusters.dialogs.shell.warning.tone: "danger" | "neutral"
clusters.dialogs.shell.warning.text*: string
clusters.dialogs.shell.warning.text[LabText].en: string
clusters.dialogs.shell.warning.text[LabText].zh-CN: string
clusters.dialogs.shell.tone: "danger" | "default" | undefined  (optional)
clusters.dialogs.shell.confirmLabel*: string  (optional)
clusters.dialogs.shell.confirmLabel[LabText].en: string
clusters.dialogs.shell.confirmLabel[LabText].zh-CN: string
clusters.dialogs.shell.hasCancel: boolean | undefined  (optional)
clusters.dialogs.shell.completion[kind="done"].kind: "done"
clusters.dialogs.shell.completion[kind="done"].title*: string  (optional)
clusters.dialogs.shell.completion[kind="done"].title[LabText].en: string
clusters.dialogs.shell.completion[kind="done"].title[LabText].zh-CN: string
clusters.dialogs.shell.completion[kind="done"].detail*: string  (optional)
clusters.dialogs.shell.completion[kind="done"].detail[LabText].en: string
clusters.dialogs.shell.completion[kind="done"].detail[LabText].zh-CN: string
clusters.dialogs.shell.completion[kind="close"].kind: "close"
clusters.dialogs.shell.size: "lg" | "md" | "xl" | undefined  (optional)
clusters.dialogs.shell.labelColumn: "aligned" | "none" | undefined  (optional)
clusters.legacyConnections[].kind: "docker" | "slurm" | "ssh"
clusters.legacyConnections[].fields[].label*: string
clusters.legacyConnections[].fields[].label[LabText].en: string
clusters.legacyConnections[].fields[].label[LabText].zh-CN: string
clusters.legacyConnections[].fields[].value*: string
clusters.legacyConnections[].fields[].value[LabText].en: string
clusters.legacyConnections[].fields[].value[LabText].zh-CN: string
clusters.legacyConnections[].fields[].format: "code" | undefined  (optional)
clusters.legacyHandshakeChecklist[]*: string
clusters.legacyHandshakeChecklist[][LabText].en: string
clusters.legacyHandshakeChecklist[][LabText].zh-CN: string
clusters.clusters[].id: string
clusters.clusters[].name: string
clusters.clusters[].kind*: string
clusters.clusters[].kind[LabText].en: string
clusters.clusters[].kind[LabText].zh-CN: string
clusters.clusters[].health: ClusterHealth | null  (nullable)
clusters.clusters[].isDefault: boolean | null  (nullable)
clusters.clusters[].endpoint: string
clusters.clusters[].reportedLoadPercent: number | null  (nullable)
clusters.clusters[].gpu.used: number  (nullable parent)
clusters.clusters[].gpu.total: number  (nullable parent)
clusters.clusters[].cpu.used: number  (nullable parent)
clusters.clusters[].cpu.total: number  (nullable parent)
clusters.clusters[].nodeCount: number | null  (nullable)
clusters.clusters[].healthText*: string | null  (nullable)
clusters.clusters[].healthText[LabText].en: string  (nullable parent)
clusters.clusters[].healthText[LabText].zh-CN: string  (nullable parent)
clusters.clusters[].handshakeAge*: string | null  (nullable)
clusters.clusters[].handshakeAge[LabText].en: string  (nullable parent)
clusters.clusters[].handshakeAge[LabText].zh-CN: string  (nullable parent)
clusters.gpuNodePatterns[].clusterId: string
clusters.gpuNodePatterns[].firstNode: number
clusters.gpuNodePatterns[].gpusPerNode: number
clusters.gpuNodePatterns[].usedGpuPattern[]: number
clusters.gateways[].host: string
clusters.gateways[].cpu.used: number
clusters.gateways[].cpu.total: number
clusters.gateways[].devices*: string
clusters.gateways[].devices[LabText].en: string
clusters.gateways[].devices[LabText].zh-CN: string
clusters.gateways[].health: ClusterHealth
clusters.containers[].id: string
clusters.containers[].name: string
clusters.containers[].clusterId: string | null  (nullable)
clusters.containers[].host: string | null  (nullable)
clusters.containers[].purpose: ContainerPurpose
clusters.containers[].agentIds[]: string
clusters.containers[].binding*: string | null  (nullable)
clusters.containers[].binding[LabText].en: string  (nullable parent)
clusters.containers[].binding[LabText].zh-CN: string  (nullable parent)
clusters.containers[].image: string | null  (nullable)
clusters.containers[].state: ContainerState
clusters.containers[].uptime*: string | null  (nullable)
clusters.containers[].uptime[LabText].en: string  (nullable parent)
clusters.containers[].uptime[LabText].zh-CN: string  (nullable parent)
clusters.containers[].resources[kind="absent"].kind: "absent"
clusters.containers[].resources[kind="present"].kind: "present"
clusters.containers[].resources[kind="present"].cpu.used: number
clusters.containers[].resources[kind="present"].cpu.total: number
clusters.containers[].resources[kind="present"].memoryGiB.used: number
clusters.containers[].resources[kind="present"].memoryGiB.total: number
clusters.containers[].mounts[].path: string
clusters.containers[].mounts[].mode: "device" | "ro" | "rw"
clusters.containers[].logs[].time: string | null  (nullable)
clusters.containers[].logs[].message*: string
clusters.containers[].logs[].message[LabText].en: string
clusters.containers[].logs[].message[LabText].zh-CN: string
clusters.containers[].logs[].severity: "error" | "stdout" | "warning" | null  (nullable)
```

### `connectCluster` — ConnectClusterFixture

> `/compute/clusters/connect`

```
connectCluster.paths[][kind="controller"].title*: string
connectCluster.paths[][kind="controller"].title[LabText].en: string
connectCluster.paths[][kind="controller"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].description*: string
connectCluster.paths[][kind="controller"].description[LabText].en: string
connectCluster.paths[][kind="controller"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].cardSteps[].number: string
connectCluster.paths[][kind="controller"].cardSteps[].text*: string
connectCluster.paths[][kind="controller"].cardSteps[].text[LabText].en: string
connectCluster.paths[][kind="controller"].cardSteps[].text[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].cardFacts[].label*: string
connectCluster.paths[][kind="controller"].cardFacts[].label[LabText].en: string
connectCluster.paths[][kind="controller"].cardFacts[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].cardFacts[].value*: string
connectCluster.paths[][kind="controller"].cardFacts[].value[LabText].en: string
connectCluster.paths[][kind="controller"].cardFacts[].value[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].cardFacts[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="controller"].cardRequirements[]*: string
connectCluster.paths[][kind="controller"].cardRequirements[][LabText].en: string
connectCluster.paths[][kind="controller"].cardRequirements[][LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authDefaults[][kind="key"].kind: "key"
connectCluster.paths[][kind="controller"].authDefaults[][kind="key"].privateKey: string
connectCluster.paths[][kind="controller"].authDefaults[][kind="password"].kind: "password"
connectCluster.paths[][kind="controller"].authDefaults[][kind="password"].password: string
connectCluster.paths[][kind="controller"].authDefaults[][kind="agent"].kind: "agent"
connectCluster.paths[][kind="controller"].steps[][kind="form"].id: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].title*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].title[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].subtitle*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].kind: "form"
connectCluster.paths[][kind="controller"].steps[][kind="form"].description*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].description[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].requiresTest: boolean
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="controller"].steps[][kind="review"].id: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].title*: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].title[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].subtitle*: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].kind: "review"
connectCluster.paths[][kind="controller"].steps[][kind="review"].description*: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].description[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].id: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].title*: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].title[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].subtitle*: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].steps[][kind="done"].kind: "done"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].id: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].title*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].kind: "form"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].description*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].id: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].title*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].kind: "review"
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].description*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].id: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].title*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.agent[kind="done"].kind: "done"
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].id: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].title*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].kind: "form"
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].description*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].id: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].title*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].kind: "review"
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].description*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].id: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].title*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.key[kind="done"].kind: "done"
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].id: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].title*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].kind: "form"
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].description*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].id: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].title*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].kind: "review"
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].description*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].id: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].title*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].subtitle*: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].authSteps.password[kind="done"].kind: "done"
connectCluster.paths[][kind="controller"].installStages[].label*: string
connectCluster.paths[][kind="controller"].installStages[].label[LabText].en: string
connectCluster.paths[][kind="controller"].installStages[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].installStages[].value*: string
connectCluster.paths[][kind="controller"].installStages[].value[LabText].en: string
connectCluster.paths[][kind="controller"].installStages[].value[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].installStages[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="controller"].installLogs[]: string
connectCluster.paths[][kind="controller"].review[].title*: string
connectCluster.paths[][kind="controller"].review[].title[LabText].en: string
connectCluster.paths[][kind="controller"].review[].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].review[].rows[].label*: string
connectCluster.paths[][kind="controller"].review[].rows[].label[LabText].en: string
connectCluster.paths[][kind="controller"].review[].rows[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].review[].rows[].value*: string
connectCluster.paths[][kind="controller"].review[].rows[].value[LabText].en: string
connectCluster.paths[][kind="controller"].review[].rows[].value[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].review[].rows[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="controller"].summary[].label*: string
connectCluster.paths[][kind="controller"].summary[].label[LabText].en: string
connectCluster.paths[][kind="controller"].summary[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].summary[].value*: string
connectCluster.paths[][kind="controller"].summary[].value[LabText].en: string
connectCluster.paths[][kind="controller"].summary[].value[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].summary[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="controller"].ports[].label*: string
connectCluster.paths[][kind="controller"].ports[].label[LabText].en: string
connectCluster.paths[][kind="controller"].ports[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].ports[].value*: string
connectCluster.paths[][kind="controller"].ports[].value[LabText].en: string
connectCluster.paths[][kind="controller"].ports[].value[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].ports[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="controller"].requirements[]*: string
connectCluster.paths[][kind="controller"].requirements[][LabText].en: string
connectCluster.paths[][kind="controller"].requirements[][LabText].zh-CN: string
connectCluster.paths[][kind="controller"].installCommand: string
connectCluster.paths[][kind="controller"].completion.title*: string
connectCluster.paths[][kind="controller"].completion.title[LabText].en: string
connectCluster.paths[][kind="controller"].completion.title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].completion.description*: string
connectCluster.paths[][kind="controller"].completion.description[LabText].en: string
connectCluster.paths[][kind="controller"].completion.description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].completion.rows[].label*: string
connectCluster.paths[][kind="controller"].completion.rows[].label[LabText].en: string
connectCluster.paths[][kind="controller"].completion.rows[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].completion.rows[].value*: string
connectCluster.paths[][kind="controller"].completion.rows[].value[LabText].en: string
connectCluster.paths[][kind="controller"].completion.rows[].value[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].completion.rows[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="controller"].completion.enrollment[kind="token"].kind: "token"
connectCluster.paths[][kind="controller"].completion.enrollment[kind="token"].token: string
connectCluster.paths[][kind="controller"].completion.enrollment[kind="none"].kind: "none"
connectCluster.paths[][kind="controller"].kind: "controller"
connectCluster.paths[][kind="controller"].defaults.host: string
connectCluster.paths[][kind="controller"].defaults.port: string
connectCluster.paths[][kind="controller"].defaults.user: string
connectCluster.paths[][kind="controller"].defaults.auth[kind="key"].kind: "key"
connectCluster.paths[][kind="controller"].defaults.auth[kind="key"].privateKey: string
connectCluster.paths[][kind="controller"].defaults.auth[kind="password"].kind: "password"
connectCluster.paths[][kind="controller"].defaults.auth[kind="password"].password: string
connectCluster.paths[][kind="controller"].defaults.auth[kind="agent"].kind: "agent"
connectCluster.paths[][kind="controller"].defaults.name: string
connectCluster.paths[][kind="controller"].defaults.sudo: boolean
connectCluster.paths[][kind="controller"].defaults.address: string
connectCluster.paths[][kind="controller"].defaults.webPort: string
connectCluster.paths[][kind="controller"].defaults.dataDirectory: string
connectCluster.paths[][kind="controller"].defaults.database[kind="bundled"].kind: "bundled"
connectCluster.paths[][kind="controller"].defaults.database[kind="external"].kind: "external"
connectCluster.paths[][kind="controller"].defaults.database[kind="external"].uri: string
connectCluster.paths[][kind="controller"].defaults.tls: "auto" | "proxy" | "upload"
connectCluster.paths[][kind="controller"].defaults.admin: string
connectCluster.paths[][kind="controller"].defaults.email: string
connectCluster.paths[][kind="controller"].defaults.enrollSelf: boolean
connectCluster.paths[][kind="controller"].defaults.allowedNetworks: string
connectCluster.paths[][kind="controller"].defaults.registry: string
connectCluster.paths[][kind="controller"].defaults.ntp: boolean
connectCluster.paths[][kind="controller"].defaults.backup: "daily" | "off" | "weekly"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].id: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].title*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].subtitle*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].kind: "form"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].description*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].id: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].title*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].subtitle*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].kind: "review"
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].description*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].id: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].title*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].subtitle*: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="controller"].externalDatabaseStep[kind="done"].kind: "done"
connectCluster.paths[][kind="controller"].externalDatabaseUri: string
connectCluster.paths[][kind="node"].title*: string
connectCluster.paths[][kind="node"].title[LabText].en: string
connectCluster.paths[][kind="node"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].description*: string
connectCluster.paths[][kind="node"].description[LabText].en: string
connectCluster.paths[][kind="node"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].cardSteps[].number: string
connectCluster.paths[][kind="node"].cardSteps[].text*: string
connectCluster.paths[][kind="node"].cardSteps[].text[LabText].en: string
connectCluster.paths[][kind="node"].cardSteps[].text[LabText].zh-CN: string
connectCluster.paths[][kind="node"].cardFacts[].label*: string
connectCluster.paths[][kind="node"].cardFacts[].label[LabText].en: string
connectCluster.paths[][kind="node"].cardFacts[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].cardFacts[].value*: string
connectCluster.paths[][kind="node"].cardFacts[].value[LabText].en: string
connectCluster.paths[][kind="node"].cardFacts[].value[LabText].zh-CN: string
connectCluster.paths[][kind="node"].cardFacts[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="node"].cardRequirements[]*: string
connectCluster.paths[][kind="node"].cardRequirements[][LabText].en: string
connectCluster.paths[][kind="node"].cardRequirements[][LabText].zh-CN: string
connectCluster.paths[][kind="node"].authDefaults[][kind="key"].kind: "key"
connectCluster.paths[][kind="node"].authDefaults[][kind="key"].privateKey: string
connectCluster.paths[][kind="node"].authDefaults[][kind="password"].kind: "password"
connectCluster.paths[][kind="node"].authDefaults[][kind="password"].password: string
connectCluster.paths[][kind="node"].authDefaults[][kind="agent"].kind: "agent"
connectCluster.paths[][kind="node"].steps[][kind="form"].id: string
connectCluster.paths[][kind="node"].steps[][kind="form"].title*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].title[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].subtitle*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].kind: "form"
connectCluster.paths[][kind="node"].steps[][kind="form"].description*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].description[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].requiresTest: boolean
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="node"].steps[][kind="review"].id: string
connectCluster.paths[][kind="node"].steps[][kind="review"].title*: string
connectCluster.paths[][kind="node"].steps[][kind="review"].title[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="review"].subtitle*: string
connectCluster.paths[][kind="node"].steps[][kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="review"].kind: "review"
connectCluster.paths[][kind="node"].steps[][kind="review"].description*: string
connectCluster.paths[][kind="node"].steps[][kind="review"].description[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="done"].id: string
connectCluster.paths[][kind="node"].steps[][kind="done"].title*: string
connectCluster.paths[][kind="node"].steps[][kind="done"].title[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="done"].subtitle*: string
connectCluster.paths[][kind="node"].steps[][kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].steps[][kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].steps[][kind="done"].kind: "done"
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].id: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].title*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].kind: "form"
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].description*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].id: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].title*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].kind: "review"
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].description*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].id: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].title*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.agent[kind="done"].kind: "done"
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].id: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].title*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].kind: "form"
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].description*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].id: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].title*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].kind: "review"
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].description*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].id: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].title*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.key[kind="done"].kind: "done"
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].id: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].title*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].kind: "form"
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].description*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].id: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].title*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].kind: "review"
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].description*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].id: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].title*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].subtitle*: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].authSteps.password[kind="done"].kind: "done"
connectCluster.paths[][kind="node"].installStages[].label*: string
connectCluster.paths[][kind="node"].installStages[].label[LabText].en: string
connectCluster.paths[][kind="node"].installStages[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].installStages[].value*: string
connectCluster.paths[][kind="node"].installStages[].value[LabText].en: string
connectCluster.paths[][kind="node"].installStages[].value[LabText].zh-CN: string
connectCluster.paths[][kind="node"].installStages[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="node"].installLogs[]: string
connectCluster.paths[][kind="node"].review[].title*: string
connectCluster.paths[][kind="node"].review[].title[LabText].en: string
connectCluster.paths[][kind="node"].review[].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].review[].rows[].label*: string
connectCluster.paths[][kind="node"].review[].rows[].label[LabText].en: string
connectCluster.paths[][kind="node"].review[].rows[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].review[].rows[].value*: string
connectCluster.paths[][kind="node"].review[].rows[].value[LabText].en: string
connectCluster.paths[][kind="node"].review[].rows[].value[LabText].zh-CN: string
connectCluster.paths[][kind="node"].review[].rows[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="node"].summary[].label*: string
connectCluster.paths[][kind="node"].summary[].label[LabText].en: string
connectCluster.paths[][kind="node"].summary[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].summary[].value*: string
connectCluster.paths[][kind="node"].summary[].value[LabText].en: string
connectCluster.paths[][kind="node"].summary[].value[LabText].zh-CN: string
connectCluster.paths[][kind="node"].summary[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="node"].ports[].label*: string
connectCluster.paths[][kind="node"].ports[].label[LabText].en: string
connectCluster.paths[][kind="node"].ports[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].ports[].value*: string
connectCluster.paths[][kind="node"].ports[].value[LabText].en: string
connectCluster.paths[][kind="node"].ports[].value[LabText].zh-CN: string
connectCluster.paths[][kind="node"].ports[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="node"].requirements[]*: string
connectCluster.paths[][kind="node"].requirements[][LabText].en: string
connectCluster.paths[][kind="node"].requirements[][LabText].zh-CN: string
connectCluster.paths[][kind="node"].installCommand: string
connectCluster.paths[][kind="node"].completion.title*: string
connectCluster.paths[][kind="node"].completion.title[LabText].en: string
connectCluster.paths[][kind="node"].completion.title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].completion.description*: string
connectCluster.paths[][kind="node"].completion.description[LabText].en: string
connectCluster.paths[][kind="node"].completion.description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].completion.rows[].label*: string
connectCluster.paths[][kind="node"].completion.rows[].label[LabText].en: string
connectCluster.paths[][kind="node"].completion.rows[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].completion.rows[].value*: string
connectCluster.paths[][kind="node"].completion.rows[].value[LabText].en: string
connectCluster.paths[][kind="node"].completion.rows[].value[LabText].zh-CN: string
connectCluster.paths[][kind="node"].completion.rows[].format: "code" | undefined  (optional)
connectCluster.paths[][kind="node"].completion.enrollment[kind="token"].kind: "token"
connectCluster.paths[][kind="node"].completion.enrollment[kind="token"].token: string
connectCluster.paths[][kind="node"].completion.enrollment[kind="none"].kind: "none"
connectCluster.paths[][kind="node"].kind: "node"
connectCluster.paths[][kind="node"].defaults.host: string
connectCluster.paths[][kind="node"].defaults.port: string
connectCluster.paths[][kind="node"].defaults.user: string
connectCluster.paths[][kind="node"].defaults.auth[kind="key"].kind: "key"
connectCluster.paths[][kind="node"].defaults.auth[kind="key"].privateKey: string
connectCluster.paths[][kind="node"].defaults.auth[kind="password"].kind: "password"
connectCluster.paths[][kind="node"].defaults.auth[kind="password"].password: string
connectCluster.paths[][kind="node"].defaults.auth[kind="agent"].kind: "agent"
connectCluster.paths[][kind="node"].defaults.name: string
connectCluster.paths[][kind="node"].defaults.clusterId: string | null  (nullable)
connectCluster.paths[][kind="node"].defaults.method: "manual" | "ssh"
connectCluster.paths[][kind="node"].defaults.role: "agent" | "any" | "box" | "runner"
connectCluster.paths[][kind="node"].defaults.labels: string
connectCluster.paths[][kind="node"].defaults.exposeGpu: boolean
connectCluster.paths[][kind="node"].defaults.devices: string
connectCluster.paths[][kind="node"].defaults.maxContainers: string
connectCluster.paths[][kind="node"].defaults.reserve: string
connectCluster.paths[][kind="node"].defaults.agentPort: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].id: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].title*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].title[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].subtitle*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].kind: "form"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].description*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].description[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].requiresTest: boolean
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].key: WizardFieldKey
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].label*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].label[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].hint*: string  (optional)
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].kind: "password" | "text"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].placeholder*: string  (optional)
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"password"|"text"].placeholder[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].key: WizardFieldKey
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].label*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].label[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].hint*: string  (optional)
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].hint[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].kind: "segmented"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].options[].id: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].options[].label*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].options[].label[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="segmented"].options[].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].key: WizardFieldKey
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].label*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].label[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].hint*: string  (optional)
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].hint[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="cluster_choice"].kind: "cluster_choice"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].key: WizardFieldKey
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].label*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].label[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].hint*: string  (optional)
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].hint[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].kind: "toggle"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].onText*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].onText[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind="toggle"].onText[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].key: WizardFieldKey
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].label*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].label[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].label[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].hint*: string  (optional)
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].hint[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="form"].fields[][kind∈"code"|"test"].kind: "code" | "test"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].id: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].title*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].title[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].subtitle*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].kind: "review"
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].description*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].description[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="review"].description[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].id: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].title*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].title[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].title[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].subtitle*: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].subtitle[LabText].en: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].subtitle[LabText].zh-CN: string
connectCluster.paths[][kind="node"].manualConnectionStep[kind="done"].kind: "done"
connectCluster.existingClusters[].clusterId: string
connectCluster.existingClusters[].kind*: string
connectCluster.existingClusters[].kind[LabText].en: string
connectCluster.existingClusters[].kind[LabText].zh-CN: string
connectCluster.existingClusters[].health: ClusterHealth | null  (nullable)
connectCluster.existingClusters[].nodeCount: number | null  (nullable)
connectCluster.existingClusters[].endpoint: string
connectCluster.existingClusters[].gpu.used: number  (nullable parent)
connectCluster.existingClusters[].gpu.total: number  (nullable parent)
connectCluster.existingClusters[].isDefault: boolean | null  (nullable)
connectCluster.clusterChoices[].clusterId: string
connectCluster.clusterChoices[].kind*: string
connectCluster.clusterChoices[].kind[LabText].en: string
connectCluster.clusterChoices[].kind[LabText].zh-CN: string
connectCluster.clusterChoices[].detail*: string | null  (nullable)
connectCluster.clusterChoices[].detail[LabText].en: string  (nullable parent)
connectCluster.clusterChoices[].detail[LabText].zh-CN: string  (nullable parent)
connectCluster.defaults.clusterId: string | null  (nullable)
connectCluster.installLogs[]: string
connectCluster.connectionTestResults[].kind: "controller" | "node_manual" | "node_ssh"
connectCluster.connectionTestResults[].text*: string
connectCluster.connectionTestResults[].text[LabText].en: string
connectCluster.connectionTestResults[].text[LabText].zh-CN: string
connectCluster.enrollment[kind="token"].kind: "token"
connectCluster.enrollment[kind="token"].token: string
connectCluster.enrollment[kind="none"].kind: "none"
connectCluster.completion.rows[].label*: string
connectCluster.completion.rows[].label[LabText].en: string
connectCluster.completion.rows[].label[LabText].zh-CN: string
connectCluster.completion.rows[].value*: string
connectCluster.completion.rows[].value[LabText].en: string
connectCluster.completion.rows[].value[LabText].zh-CN: string
connectCluster.completion.rows[].format: "code" | undefined  (optional)
connectCluster.installCommand.command: string
```

### `containers` — ContainersFixture

> `/compute/containers`

```
containers.images[].conversation.sessions[].name*: string
containers.images[].conversation.sessions[].name[LabText].en: string
containers.images[].conversation.sessions[].name[LabText].zh-CN: string
containers.images[].conversation.sessions[].meta*: string
containers.images[].conversation.sessions[].meta[LabText].en: string
containers.images[].conversation.sessions[].meta[LabText].zh-CN: string
containers.images[].conversation.seed[][kind="user"].kind: "user"
containers.images[].conversation.seed[][kind="user"].text*: string
containers.images[].conversation.seed[][kind="user"].text[LabText].en: string
containers.images[].conversation.seed[][kind="user"].text[LabText].zh-CN: string
containers.images[].conversation.seed[][kind="assistant"].kind: "assistant"
containers.images[].conversation.seed[][kind="assistant"].text*: string
containers.images[].conversation.seed[][kind="assistant"].text[LabText].en: string
containers.images[].conversation.seed[][kind="assistant"].text[LabText].zh-CN: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
containers.images[].conversation.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
containers.images[].conversation.prompts[]*: string
containers.images[].conversation.prompts[][LabText].en: string
containers.images[].conversation.prompts[][LabText].zh-CN: string
containers.images[].conversation.reply.en: string
containers.images[].conversation.reply.zh-CN: string
containers.images[].conversation.placeholder.en: string
containers.images[].conversation.placeholder.zh-CN: string
containers.images[].conversation.subtitle.en: string
containers.images[].conversation.subtitle.zh-CN: string
containers.images[].conversation.scope.label.en: string
containers.images[].conversation.scope.label.zh-CN: string
containers.images[].conversation.scope.value*: string
containers.images[].conversation.scope.value[LabText].en: string
containers.images[].conversation.scope.value[LabText].zh-CN: string
containers.images[].id: string
containers.images[].group: "box" | "judge" | "runner" | null  (nullable)
containers.images[].name: string
containers.images[].tag: string | null  (nullable)
containers.images[].size: string | null  (nullable)
containers.images[].status: "pending" | "published" | null  (nullable)
containers.images[].nodeBindingCount: number | null  (nullable)
containers.images[].base: string
containers.images[].digest: string | null  (nullable)
containers.images[].note*: string | null  (nullable)
containers.images[].note[LabText].en: string  (nullable parent)
containers.images[].note[LabText].zh-CN: string  (nullable parent)
containers.images[].liveContainers[].name: string
containers.images[].liveContainers[].location: string | null  (nullable)
containers.images[].liveContainers[].tag: string | null  (nullable)
containers.images[].liveContainers[].state: ContainerState
containers.images[].liveContainers[].binding: string | null  (nullable)
containers.images[].dependencies[].name*: string
containers.images[].dependencies[].name[LabText].en: string
containers.images[].dependencies[].name[LabText].zh-CN: string
containers.images[].dependencies[].version: string
containers.images[].dependencies[].kind: DependencyKind
containers.images[].dependencies[].source: DependencySource | null  (nullable)
containers.images[].dependencies[].reason*: string | null  (nullable)
containers.images[].dependencies[].reason[LabText].en: string  (nullable parent)
containers.images[].dependencies[].reason[LabText].zh-CN: string  (nullable parent)
containers.images[].dependencies[].change[kind∈"added"|"removed"|"unchanged"].kind: "added" | "removed" | "unchanged"  (nullable parent)
containers.images[].dependencies[].change[kind∈"modified"|"upgraded"].kind: "modified" | "upgraded"  (nullable parent)
containers.images[].dependencies[].change[kind∈"modified"|"upgraded"].replacement: string  (nullable parent)
containers.images[].builds[].tag: string
containers.images[].builds[].state: "default" | "draft" | "history"
containers.images[].builds[].size: string
containers.images[].builds[].note*: string
containers.images[].builds[].note[LabText].en: string
containers.images[].builds[].note[LabText].zh-CN: string
containers.images[].layers[].kind: DependencyKind
containers.images[].layers[].size: string | null  (nullable)
containers.images[].resources.cpu: number  (nullable parent)
containers.images[].resources.memoryGiB: number  (nullable parent)
containers.images[].resources.gpu: number  (nullable parent)
containers.images[].resources.diskGiB: number  (nullable parent)
containers.images[].resources.maxRuntimeHours: number  (nullable parent)
containers.images[].resources.allowPreemptible: boolean  (nullable parent)
containers.images[].resources.deviceAccess: boolean  (nullable parent)
containers.images[].resources.outboundNetwork: boolean  (nullable parent)
containers.images[].resources.boundClusters[]: string  (nullable parent)
containers.images[].resources.primaryCluster: string | null  (nullable) (nullable parent)
containers.images[].resources.selector: string | null  (nullable) (nullable parent)
containers.images[].resources.priority: "high" | "low" | "normal"  (nullable parent)
containers.images[].directories[].id: string
containers.images[].directories[].parentId: string | null  (nullable)
containers.images[].directories[].name: string
containers.images[].directories[].access: "editable" | "read_only" | "runtime_mount" | null  (nullable)
containers.images[].directories[].note*: string | null  (nullable)
containers.images[].directories[].note[LabText].en: string  (nullable parent)
containers.images[].directories[].note[LabText].zh-CN: string  (nullable parent)
containers.images[].files[][kind="file"].id: string
containers.images[].files[][kind="file"].directoryId: string
containers.images[].files[][kind="file"].name*: string
containers.images[].files[][kind="file"].name[LabText].en: string
containers.images[].files[][kind="file"].name[LabText].zh-CN: string
containers.images[].files[][kind="file"].size: string
containers.images[].files[][kind="file"].modified*: string | null  (nullable)
containers.images[].files[][kind="file"].modified[LabText].en: string  (nullable parent)
containers.images[].files[][kind="file"].modified[LabText].zh-CN: string  (nullable parent)
containers.images[].files[][kind="file"].change: FileChange | null  (nullable)
containers.images[].files[][kind="file"].kind: "file"
containers.images[].files[][kind="file"].contents*: string | null  (nullable)
containers.images[].files[][kind="file"].contents[LabText].en: string  (nullable parent)
containers.images[].files[][kind="file"].contents[LabText].zh-CN: string  (nullable parent)
containers.images[].files[][kind="file"].format: "code" | "text"
containers.images[].files[][kind="opaque_directory"].id: string
containers.images[].files[][kind="opaque_directory"].directoryId: string
containers.images[].files[][kind="opaque_directory"].name*: string
containers.images[].files[][kind="opaque_directory"].name[LabText].en: string
containers.images[].files[][kind="opaque_directory"].name[LabText].zh-CN: string
containers.images[].files[][kind="opaque_directory"].size: string
containers.images[].files[][kind="opaque_directory"].modified*: string | null  (nullable)
containers.images[].files[][kind="opaque_directory"].modified[LabText].en: string  (nullable parent)
containers.images[].files[][kind="opaque_directory"].modified[LabText].zh-CN: string  (nullable parent)
containers.images[].files[][kind="opaque_directory"].change: FileChange | null  (nullable)
containers.images[].files[][kind="opaque_directory"].kind: "opaque_directory"
containers.images[].occupancy[].id: string
containers.images[].occupancy[].parentId: string | null  (nullable)
containers.images[].occupancy[].name*: string
containers.images[].occupancy[].name[LabText].en: string
containers.images[].occupancy[].name[LabText].zh-CN: string
containers.images[].occupancy[].kind: "directory" | "file" | "runtime_mount"
containers.images[].occupancy[].size[kind="fixed"].kind: "fixed"  (nullable parent)
containers.images[].occupancy[].size[kind="fixed"].mb: number  (nullable parent)
containers.images[].occupancy[].size[kind="image_size"].kind: "image_size"  (nullable parent)
containers.images[].occupancy[].size[kind="image_size"].mbPerGiB: number  (nullable parent)
containers.images[].occupancy[].layer*: string | null  (nullable)
containers.images[].occupancy[].layer[LabText].en: string  (nullable parent)
containers.images[].occupancy[].layer[LabText].zh-CN: string  (nullable parent)
containers.images[].occupancy[].change: FileChange | null  (nullable)
containers.images[].occupancy[].note*: string | null  (nullable)
containers.images[].occupancy[].note[LabText].en: string  (nullable parent)
containers.images[].occupancy[].note[LabText].zh-CN: string  (nullable parent)
containers.images[].terminal[].kind: "command" | "comment" | "error" | "stdout" | "success" | "warning"
containers.images[].terminal[].text*: string
containers.images[].terminal[].text[LabText].en: string
containers.images[].terminal[].text[LabText].zh-CN: string
containers.historicalXrdSeed[][kind="user"].kind: "user"
containers.historicalXrdSeed[][kind="user"].text*: string
containers.historicalXrdSeed[][kind="user"].text[LabText].en: string
containers.historicalXrdSeed[][kind="user"].text[LabText].zh-CN: string
containers.historicalXrdSeed[][kind="assistant"].kind: "assistant"
containers.historicalXrdSeed[][kind="assistant"].text*: string
containers.historicalXrdSeed[][kind="assistant"].text[LabText].en: string
containers.historicalXrdSeed[][kind="assistant"].text[LabText].zh-CN: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].title.en: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].note.en: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
containers.historicalXrdSeed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
containers.dialogs.build_push.id: string
containers.dialogs.build_push.title*: string
containers.dialogs.build_push.title[LabText].en: string
containers.dialogs.build_push.title[LabText].zh-CN: string
containers.dialogs.build_push.subtitle*: string  (optional)
containers.dialogs.build_push.subtitle[LabText].en: string
containers.dialogs.build_push.subtitle[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="text"].key: string
containers.dialogs.build_push.fields[][kind="text"].label*: string
containers.dialogs.build_push.fields[][kind="text"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="text"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="text"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="text"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="text"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="text"].kind: "text"
containers.dialogs.build_push.fields[][kind="text"].placeholder*: string  (optional)
containers.dialogs.build_push.fields[][kind="text"].placeholder[LabText].en: string
containers.dialogs.build_push.fields[][kind="text"].placeholder[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="text"].value*: string  (optional)
containers.dialogs.build_push.fields[][kind="text"].value[LabText].en: string
containers.dialogs.build_push.fields[][kind="text"].value[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="text"].mono: boolean | undefined  (optional)
containers.dialogs.build_push.fields[][kind="area"].key: string
containers.dialogs.build_push.fields[][kind="area"].label*: string
containers.dialogs.build_push.fields[][kind="area"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="area"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="area"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="area"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="area"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="area"].kind: "area"
containers.dialogs.build_push.fields[][kind="area"].placeholder*: string  (optional)
containers.dialogs.build_push.fields[][kind="area"].placeholder[LabText].en: string
containers.dialogs.build_push.fields[][kind="area"].placeholder[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="area"].value*: string  (optional)
containers.dialogs.build_push.fields[][kind="area"].value[LabText].en: string
containers.dialogs.build_push.fields[][kind="area"].value[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="area"].mono: boolean | undefined  (optional)
containers.dialogs.build_push.fields[][kind="area"].rows: number | undefined  (optional)
containers.dialogs.build_push.fields[][kind="segmented"].key: string
containers.dialogs.build_push.fields[][kind="segmented"].label*: string
containers.dialogs.build_push.fields[][kind="segmented"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="segmented"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="segmented"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="segmented"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="segmented"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="segmented"].kind: "segmented"
containers.dialogs.build_push.fields[][kind="segmented"].options[].id: string
containers.dialogs.build_push.fields[][kind="segmented"].options[].label*: string
containers.dialogs.build_push.fields[][kind="segmented"].options[].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="segmented"].options[].meta*: string  (optional)
containers.dialogs.build_push.fields[][kind="segmented"].options[].meta[LabText].en: string
containers.dialogs.build_push.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="segmented"].value: string | undefined  (optional)
containers.dialogs.build_push.fields[][kind="choice"].key: string
containers.dialogs.build_push.fields[][kind="choice"].label*: string
containers.dialogs.build_push.fields[][kind="choice"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="choice"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="choice"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="choice"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="choice"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="choice"].kind: "choice"
containers.dialogs.build_push.fields[][kind="choice"].options[].id: string
containers.dialogs.build_push.fields[][kind="choice"].options[].label*: string
containers.dialogs.build_push.fields[][kind="choice"].options[].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="choice"].options[].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="choice"].options[].meta*: string  (optional)
containers.dialogs.build_push.fields[][kind="choice"].options[].meta[LabText].en: string
containers.dialogs.build_push.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="choice"].value: string | undefined  (optional)
containers.dialogs.build_push.fields[][kind="multi"].key: string
containers.dialogs.build_push.fields[][kind="multi"].label*: string
containers.dialogs.build_push.fields[][kind="multi"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="multi"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="multi"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="multi"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="multi"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="multi"].kind: "multi"
containers.dialogs.build_push.fields[][kind="multi"].options[].id: string
containers.dialogs.build_push.fields[][kind="multi"].options[].label*: string
containers.dialogs.build_push.fields[][kind="multi"].options[].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="multi"].options[].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="multi"].options[].meta*: string  (optional)
containers.dialogs.build_push.fields[][kind="multi"].options[].meta[LabText].en: string
containers.dialogs.build_push.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="multi"].value[]: string
containers.dialogs.build_push.fields[][kind="toggle"].key: string
containers.dialogs.build_push.fields[][kind="toggle"].label*: string
containers.dialogs.build_push.fields[][kind="toggle"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="toggle"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="toggle"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="toggle"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="toggle"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="toggle"].kind: "toggle"
containers.dialogs.build_push.fields[][kind="toggle"].onText*: string
containers.dialogs.build_push.fields[][kind="toggle"].onText[LabText].en: string
containers.dialogs.build_push.fields[][kind="toggle"].onText[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="toggle"].value: boolean | undefined  (optional)
containers.dialogs.build_push.fields[][kind="info"].key: string
containers.dialogs.build_push.fields[][kind="info"].label*: string
containers.dialogs.build_push.fields[][kind="info"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="info"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="info"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="info"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="info"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="info"].kind: "info"
containers.dialogs.build_push.fields[][kind="info"].text*: string
containers.dialogs.build_push.fields[][kind="info"].text[LabText].en: string
containers.dialogs.build_push.fields[][kind="info"].text[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="info"].mono: boolean | undefined  (optional)
containers.dialogs.build_push.fields[][kind="code"].key: string
containers.dialogs.build_push.fields[][kind="code"].label*: string
containers.dialogs.build_push.fields[][kind="code"].label[LabText].en: string
containers.dialogs.build_push.fields[][kind="code"].label[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="code"].hint*: string  (optional)
containers.dialogs.build_push.fields[][kind="code"].hint[LabText].en: string
containers.dialogs.build_push.fields[][kind="code"].hint[LabText].zh-CN: string
containers.dialogs.build_push.fields[][kind="code"].kind: "code"
containers.dialogs.build_push.fields[][kind="code"].code: string
containers.dialogs.build_push.warning.tone: "danger" | "neutral"
containers.dialogs.build_push.warning.text*: string
containers.dialogs.build_push.warning.text[LabText].en: string
containers.dialogs.build_push.warning.text[LabText].zh-CN: string
containers.dialogs.build_push.tone: "danger" | "default" | undefined  (optional)
containers.dialogs.build_push.confirmLabel*: string  (optional)
containers.dialogs.build_push.confirmLabel[LabText].en: string
containers.dialogs.build_push.confirmLabel[LabText].zh-CN: string
containers.dialogs.build_push.hasCancel: boolean | undefined  (optional)
containers.dialogs.build_push.completion[kind="done"].kind: "done"
containers.dialogs.build_push.completion[kind="done"].title*: string  (optional)
containers.dialogs.build_push.completion[kind="done"].title[LabText].en: string
containers.dialogs.build_push.completion[kind="done"].title[LabText].zh-CN: string
containers.dialogs.build_push.completion[kind="done"].detail*: string  (optional)
containers.dialogs.build_push.completion[kind="done"].detail[LabText].en: string
containers.dialogs.build_push.completion[kind="done"].detail[LabText].zh-CN: string
containers.dialogs.build_push.completion[kind="close"].kind: "close"
containers.dialogs.build_push.size: "lg" | "md" | "xl" | undefined  (optional)
containers.dialogs.build_push.labelColumn: "aligned" | "none" | undefined  (optional)
containers.dialogs.prebuild_check.id: string
containers.dialogs.prebuild_check.title*: string
containers.dialogs.prebuild_check.title[LabText].en: string
containers.dialogs.prebuild_check.title[LabText].zh-CN: string
containers.dialogs.prebuild_check.subtitle*: string  (optional)
containers.dialogs.prebuild_check.subtitle[LabText].en: string
containers.dialogs.prebuild_check.subtitle[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="text"].key: string
containers.dialogs.prebuild_check.fields[][kind="text"].label*: string
containers.dialogs.prebuild_check.fields[][kind="text"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="text"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="text"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="text"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="text"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="text"].kind: "text"
containers.dialogs.prebuild_check.fields[][kind="text"].placeholder*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="text"].placeholder[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="text"].placeholder[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="text"].value*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="text"].value[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="text"].value[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="text"].mono: boolean | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="area"].key: string
containers.dialogs.prebuild_check.fields[][kind="area"].label*: string
containers.dialogs.prebuild_check.fields[][kind="area"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="area"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="area"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="area"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="area"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="area"].kind: "area"
containers.dialogs.prebuild_check.fields[][kind="area"].placeholder*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="area"].placeholder[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="area"].placeholder[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="area"].value*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="area"].value[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="area"].value[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="area"].mono: boolean | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="area"].rows: number | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="segmented"].key: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].label*: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="segmented"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].kind: "segmented"
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].id: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].label*: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].meta*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].meta[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="segmented"].value: string | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="choice"].key: string
containers.dialogs.prebuild_check.fields[][kind="choice"].label*: string
containers.dialogs.prebuild_check.fields[][kind="choice"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="choice"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="choice"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="choice"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="choice"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="choice"].kind: "choice"
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].id: string
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].label*: string
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].meta*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].meta[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="choice"].value: string | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="multi"].key: string
containers.dialogs.prebuild_check.fields[][kind="multi"].label*: string
containers.dialogs.prebuild_check.fields[][kind="multi"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="multi"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="multi"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="multi"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="multi"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="multi"].kind: "multi"
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].id: string
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].label*: string
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].meta*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].meta[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="multi"].value[]: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].key: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].label*: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="toggle"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].kind: "toggle"
containers.dialogs.prebuild_check.fields[][kind="toggle"].onText*: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].onText[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].onText[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="toggle"].value: boolean | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="info"].key: string
containers.dialogs.prebuild_check.fields[][kind="info"].label*: string
containers.dialogs.prebuild_check.fields[][kind="info"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="info"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="info"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="info"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="info"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="info"].kind: "info"
containers.dialogs.prebuild_check.fields[][kind="info"].text*: string
containers.dialogs.prebuild_check.fields[][kind="info"].text[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="info"].text[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="info"].mono: boolean | undefined  (optional)
containers.dialogs.prebuild_check.fields[][kind="code"].key: string
containers.dialogs.prebuild_check.fields[][kind="code"].label*: string
containers.dialogs.prebuild_check.fields[][kind="code"].label[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="code"].label[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="code"].hint*: string  (optional)
containers.dialogs.prebuild_check.fields[][kind="code"].hint[LabText].en: string
containers.dialogs.prebuild_check.fields[][kind="code"].hint[LabText].zh-CN: string
containers.dialogs.prebuild_check.fields[][kind="code"].kind: "code"
containers.dialogs.prebuild_check.fields[][kind="code"].code: string
containers.dialogs.prebuild_check.warning.tone: "danger" | "neutral"
containers.dialogs.prebuild_check.warning.text*: string
containers.dialogs.prebuild_check.warning.text[LabText].en: string
containers.dialogs.prebuild_check.warning.text[LabText].zh-CN: string
containers.dialogs.prebuild_check.tone: "danger" | "default" | undefined  (optional)
containers.dialogs.prebuild_check.confirmLabel*: string  (optional)
containers.dialogs.prebuild_check.confirmLabel[LabText].en: string
containers.dialogs.prebuild_check.confirmLabel[LabText].zh-CN: string
containers.dialogs.prebuild_check.hasCancel: boolean | undefined  (optional)
containers.dialogs.prebuild_check.completion[kind="done"].kind: "done"
containers.dialogs.prebuild_check.completion[kind="done"].title*: string  (optional)
containers.dialogs.prebuild_check.completion[kind="done"].title[LabText].en: string
containers.dialogs.prebuild_check.completion[kind="done"].title[LabText].zh-CN: string
containers.dialogs.prebuild_check.completion[kind="done"].detail*: string  (optional)
containers.dialogs.prebuild_check.completion[kind="done"].detail[LabText].en: string
containers.dialogs.prebuild_check.completion[kind="done"].detail[LabText].zh-CN: string
containers.dialogs.prebuild_check.completion[kind="close"].kind: "close"
containers.dialogs.prebuild_check.size: "lg" | "md" | "xl" | undefined  (optional)
containers.dialogs.prebuild_check.labelColumn: "aligned" | "none" | undefined  (optional)
containers.dialogs.run_prebuild.id: string
containers.dialogs.run_prebuild.title*: string
containers.dialogs.run_prebuild.title[LabText].en: string
containers.dialogs.run_prebuild.title[LabText].zh-CN: string
containers.dialogs.run_prebuild.subtitle*: string  (optional)
containers.dialogs.run_prebuild.subtitle[LabText].en: string
containers.dialogs.run_prebuild.subtitle[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="text"].key: string
containers.dialogs.run_prebuild.fields[][kind="text"].label*: string
containers.dialogs.run_prebuild.fields[][kind="text"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="text"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="text"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="text"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="text"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="text"].kind: "text"
containers.dialogs.run_prebuild.fields[][kind="text"].placeholder*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="text"].placeholder[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="text"].placeholder[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="text"].value*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="text"].value[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="text"].value[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="text"].mono: boolean | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="area"].key: string
containers.dialogs.run_prebuild.fields[][kind="area"].label*: string
containers.dialogs.run_prebuild.fields[][kind="area"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="area"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="area"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="area"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="area"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="area"].kind: "area"
containers.dialogs.run_prebuild.fields[][kind="area"].placeholder*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="area"].placeholder[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="area"].placeholder[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="area"].value*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="area"].value[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="area"].value[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="area"].mono: boolean | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="area"].rows: number | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="segmented"].key: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].label*: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="segmented"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].kind: "segmented"
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].id: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].label*: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].meta*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].meta[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="segmented"].value: string | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="choice"].key: string
containers.dialogs.run_prebuild.fields[][kind="choice"].label*: string
containers.dialogs.run_prebuild.fields[][kind="choice"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="choice"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="choice"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="choice"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="choice"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="choice"].kind: "choice"
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].id: string
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].label*: string
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].meta*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].meta[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="choice"].value: string | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="multi"].key: string
containers.dialogs.run_prebuild.fields[][kind="multi"].label*: string
containers.dialogs.run_prebuild.fields[][kind="multi"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="multi"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="multi"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="multi"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="multi"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="multi"].kind: "multi"
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].id: string
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].label*: string
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].meta*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].meta[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="multi"].value[]: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].key: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].label*: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="toggle"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].kind: "toggle"
containers.dialogs.run_prebuild.fields[][kind="toggle"].onText*: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].onText[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].onText[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="toggle"].value: boolean | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="info"].key: string
containers.dialogs.run_prebuild.fields[][kind="info"].label*: string
containers.dialogs.run_prebuild.fields[][kind="info"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="info"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="info"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="info"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="info"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="info"].kind: "info"
containers.dialogs.run_prebuild.fields[][kind="info"].text*: string
containers.dialogs.run_prebuild.fields[][kind="info"].text[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="info"].text[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="info"].mono: boolean | undefined  (optional)
containers.dialogs.run_prebuild.fields[][kind="code"].key: string
containers.dialogs.run_prebuild.fields[][kind="code"].label*: string
containers.dialogs.run_prebuild.fields[][kind="code"].label[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="code"].label[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="code"].hint*: string  (optional)
containers.dialogs.run_prebuild.fields[][kind="code"].hint[LabText].en: string
containers.dialogs.run_prebuild.fields[][kind="code"].hint[LabText].zh-CN: string
containers.dialogs.run_prebuild.fields[][kind="code"].kind: "code"
containers.dialogs.run_prebuild.fields[][kind="code"].code: string
containers.dialogs.run_prebuild.warning.tone: "danger" | "neutral"
containers.dialogs.run_prebuild.warning.text*: string
containers.dialogs.run_prebuild.warning.text[LabText].en: string
containers.dialogs.run_prebuild.warning.text[LabText].zh-CN: string
containers.dialogs.run_prebuild.tone: "danger" | "default" | undefined  (optional)
containers.dialogs.run_prebuild.confirmLabel*: string  (optional)
containers.dialogs.run_prebuild.confirmLabel[LabText].en: string
containers.dialogs.run_prebuild.confirmLabel[LabText].zh-CN: string
containers.dialogs.run_prebuild.hasCancel: boolean | undefined  (optional)
containers.dialogs.run_prebuild.completion[kind="done"].kind: "done"
containers.dialogs.run_prebuild.completion[kind="done"].title*: string  (optional)
containers.dialogs.run_prebuild.completion[kind="done"].title[LabText].en: string
containers.dialogs.run_prebuild.completion[kind="done"].title[LabText].zh-CN: string
containers.dialogs.run_prebuild.completion[kind="done"].detail*: string  (optional)
containers.dialogs.run_prebuild.completion[kind="done"].detail[LabText].en: string
containers.dialogs.run_prebuild.completion[kind="done"].detail[LabText].zh-CN: string
containers.dialogs.run_prebuild.completion[kind="close"].kind: "close"
containers.dialogs.run_prebuild.size: "lg" | "md" | "xl" | undefined  (optional)
containers.dialogs.run_prebuild.labelColumn: "aligned" | "none" | undefined  (optional)
containers.clusterAvailability[].clusterId: string
containers.clusterAvailability[].kind*: string
containers.clusterAvailability[].kind[LabText].en: string
containers.clusterAvailability[].kind[LabText].zh-CN: string
containers.clusterAvailability[].gpuFree: number
containers.clusterAvailability[].cpuFree: number
containers.clusterAvailability[].memoryFreeGiB: number
containers.clusterAvailability[].reportedLoadPercent: number
containers.clusterAvailability[].detail*: string
containers.clusterAvailability[].detail[LabText].en: string
containers.clusterAvailability[].detail[LabText].zh-CN: string
containers.resourceLimits[].resource: "cpu" | "disk" | "gpu" | "memory" | "runtime"
containers.resourceLimits[].unit*: string
containers.resourceLimits[].unit[LabText].en: string
containers.resourceLimits[].unit[LabText].zh-CN: string
containers.resourceLimits[].min: number
containers.resourceLimits[].max: number
containers.resourceLimits[].description*: string
containers.resourceLimits[].description[LabText].en: string
containers.resourceLimits[].description[LabText].zh-CN: string
containers.prebuildStages[]*: string
containers.prebuildStages[][LabText].en: string
containers.prebuildStages[][LabText].zh-CN: string
containers.shellTranscript[].kind: "command" | "comment" | "error" | "stdout" | "success" | "warning"
containers.shellTranscript[].text*: string
containers.shellTranscript[].text[LabText].en: string
containers.shellTranscript[].text[LabText].zh-CN: string
```

### `settings` — SettingsFixture

> `/settings/$tab`

```
settings.agents[].editorConversation.sessions[].name*: string
settings.agents[].editorConversation.sessions[].name[LabText].en: string
settings.agents[].editorConversation.sessions[].name[LabText].zh-CN: string
settings.agents[].editorConversation.sessions[].meta*: string
settings.agents[].editorConversation.sessions[].meta[LabText].en: string
settings.agents[].editorConversation.sessions[].meta[LabText].zh-CN: string
settings.agents[].editorConversation.seed[][kind="user"].kind: "user"
settings.agents[].editorConversation.seed[][kind="user"].text*: string
settings.agents[].editorConversation.seed[][kind="user"].text[LabText].en: string
settings.agents[].editorConversation.seed[][kind="user"].text[LabText].zh-CN: string
settings.agents[].editorConversation.seed[][kind="assistant"].kind: "assistant"
settings.agents[].editorConversation.seed[][kind="assistant"].text*: string
settings.agents[].editorConversation.seed[][kind="assistant"].text[LabText].en: string
settings.agents[].editorConversation.seed[][kind="assistant"].text[LabText].zh-CN: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
settings.agents[].editorConversation.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
settings.agents[].editorConversation.prompts[]*: string
settings.agents[].editorConversation.prompts[][LabText].en: string
settings.agents[].editorConversation.prompts[][LabText].zh-CN: string
settings.agents[].editorConversation.reply.en: string
settings.agents[].editorConversation.reply.zh-CN: string
settings.agents[].editorConversation.placeholder.en: string
settings.agents[].editorConversation.placeholder.zh-CN: string
settings.agents[].editorConversation.subtitle.en: string
settings.agents[].editorConversation.subtitle.zh-CN: string
settings.agents[].editorConversation.scope.label.en: string
settings.agents[].editorConversation.scope.label.zh-CN: string
settings.agents[].editorConversation.scope.value*: string
settings.agents[].editorConversation.scope.value[LabText].en: string
settings.agents[].editorConversation.scope.value[LabText].zh-CN: string
settings.agents[].id: string
settings.agents[].harness: "omp"
settings.agents[].harnessVersion: string
settings.agents[].description*: string
settings.agents[].description[LabText].en: string
settings.agents[].description[LabText].zh-CN: string
settings.agents[].version[kind="draft"].kind: "draft"
settings.agents[].version[kind="saved"].kind: "saved"
settings.agents[].version[kind="saved"].version: string
settings.agents[].uses: number | null  (nullable)
settings.agents[].lastSaved*: string
settings.agents[].lastSaved[LabText].en: string
settings.agents[].lastSaved[LabText].zh-CN: string
settings.agents[].targets[]: string
settings.agents[].models[].id: string
settings.agents[].models[].purpose*: string | null  (nullable)
settings.agents[].models[].purpose[LabText].en: string  (nullable parent)
settings.agents[].models[].purpose[LabText].zh-CN: string  (nullable parent)
settings.agents[].entries[][kind="directory"].kind: "directory"
settings.agents[].entries[][kind="directory"].path: string
settings.agents[].entries[][kind="directory"].source: "added" | "repository" | "template" | null  (nullable)
settings.agents[].entries[][kind="file"].kind: "file"
settings.agents[].entries[][kind="file"].path: string
settings.agents[].entries[][kind="file"].source: "added" | "repository" | "template" | null  (nullable)
settings.agents[].entries[][kind="file"].contents*: string
settings.agents[].entries[][kind="file"].contents[LabText].en: string
settings.agents[].entries[][kind="file"].contents[LabText].zh-CN: string
settings.agents[].details[][kind="project_label"].kind: "project_label"
settings.agents[].details[][kind="project_label"].createdById: string
settings.agents[].details[][kind="project_label"].focusedByCount: number | null  (nullable)
settings.agents[].details[][kind="project_tagged_items"].kind: "project_tagged_items"
settings.agents[].details[][kind∈"template_metadata"|"template_models"].kind: "template_metadata" | "template_models"
settings.agents[].details[][kind∈"facts"|"list"].kind: "facts" | "list"
settings.agents[].details[][kind∈"facts"|"list"].title*: string
settings.agents[].details[][kind∈"facts"|"list"].title[LabText].en: string
settings.agents[].details[][kind∈"facts"|"list"].title[LabText].zh-CN: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].label*: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].label[LabText].en: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].label[LabText].zh-CN: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].value*: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].value[LabText].en: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].value[LabText].zh-CN: string
settings.agents[].details[][kind∈"facts"|"list"].rows[].format: "code" | undefined  (optional)
settings.agents[].details[][kind="toggles"].kind: "toggles"
settings.agents[].details[][kind="toggles"].title*: string
settings.agents[].details[][kind="toggles"].title[LabText].en: string
settings.agents[].details[][kind="toggles"].title[LabText].zh-CN: string
settings.agents[].details[][kind="toggles"].rows[].id: string
settings.agents[].details[][kind="toggles"].rows[].label*: string
settings.agents[].details[][kind="toggles"].rows[].label[LabText].en: string
settings.agents[].details[][kind="toggles"].rows[].label[LabText].zh-CN: string
settings.agents[].details[][kind="toggles"].rows[].note*: string
settings.agents[].details[][kind="toggles"].rows[].note[LabText].en: string
settings.agents[].details[][kind="toggles"].rows[].note[LabText].zh-CN: string
settings.agents[].details[][kind="toggles"].rows[].enabled: boolean
settings.agents[].scratch.containerId: string  (nullable parent)
settings.agents[].scratch.title: string  (nullable parent)
settings.agents[].scratch.description*: string  (nullable parent)
settings.agents[].scratch.description[LabText].en: string  (nullable parent)
settings.agents[].scratch.description[LabText].zh-CN: string  (nullable parent)
settings.agents[].scratch.addedFile.path: string  (nullable parent)
settings.agents[].scratch.addedFile.contents*: string  (nullable parent)
settings.agents[].scratch.addedFile.contents[LabText].en: string  (nullable parent)
settings.agents[].scratch.addedFile.contents[LabText].zh-CN: string  (nullable parent)
settings.agents[].scratch.transcript[].kind: "command" | "comment" | "error" | "stdout" | "success" | "warning"  (nullable parent)
settings.agents[].scratch.transcript[].text*: string  (nullable parent)
settings.agents[].scratch.transcript[].text[LabText].en: string  (nullable parent)
settings.agents[].scratch.transcript[].text[LabText].zh-CN: string  (nullable parent)
settings.conversations.agents.sessions[].name*: string
settings.conversations.agents.sessions[].name[LabText].en: string
settings.conversations.agents.sessions[].name[LabText].zh-CN: string
settings.conversations.agents.sessions[].meta*: string
settings.conversations.agents.sessions[].meta[LabText].en: string
settings.conversations.agents.sessions[].meta[LabText].zh-CN: string
settings.conversations.agents.seed[][kind="user"].kind: "user"
settings.conversations.agents.seed[][kind="user"].text*: string
settings.conversations.agents.seed[][kind="user"].text[LabText].en: string
settings.conversations.agents.seed[][kind="user"].text[LabText].zh-CN: string
settings.conversations.agents.seed[][kind="assistant"].kind: "assistant"
settings.conversations.agents.seed[][kind="assistant"].text*: string
settings.conversations.agents.seed[][kind="assistant"].text[LabText].en: string
settings.conversations.agents.seed[][kind="assistant"].text[LabText].zh-CN: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
settings.conversations.agents.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
settings.conversations.agents.prompts[]*: string
settings.conversations.agents.prompts[][LabText].en: string
settings.conversations.agents.prompts[][LabText].zh-CN: string
settings.conversations.agents.reply.en: string
settings.conversations.agents.reply.zh-CN: string
settings.conversations.agents.placeholder.en: string
settings.conversations.agents.placeholder.zh-CN: string
settings.conversations.agents.subtitle.en: string
settings.conversations.agents.subtitle.zh-CN: string
settings.conversations.agents.scope.label.en: string
settings.conversations.agents.scope.label.zh-CN: string
settings.conversations.agents.scope.value*: string
settings.conversations.agents.scope.value[LabText].en: string
settings.conversations.agents.scope.value[LabText].zh-CN: string
settings.conversations.members.sessions[].name*: string
settings.conversations.members.sessions[].name[LabText].en: string
settings.conversations.members.sessions[].name[LabText].zh-CN: string
settings.conversations.members.sessions[].meta*: string
settings.conversations.members.sessions[].meta[LabText].en: string
settings.conversations.members.sessions[].meta[LabText].zh-CN: string
settings.conversations.members.seed[][kind="user"].kind: "user"
settings.conversations.members.seed[][kind="user"].text*: string
settings.conversations.members.seed[][kind="user"].text[LabText].en: string
settings.conversations.members.seed[][kind="user"].text[LabText].zh-CN: string
settings.conversations.members.seed[][kind="assistant"].kind: "assistant"
settings.conversations.members.seed[][kind="assistant"].text*: string
settings.conversations.members.seed[][kind="assistant"].text[LabText].en: string
settings.conversations.members.seed[][kind="assistant"].text[LabText].zh-CN: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
settings.conversations.members.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
settings.conversations.members.prompts[]*: string
settings.conversations.members.prompts[][LabText].en: string
settings.conversations.members.prompts[][LabText].zh-CN: string
settings.conversations.members.reply.en: string
settings.conversations.members.reply.zh-CN: string
settings.conversations.members.placeholder.en: string
settings.conversations.members.placeholder.zh-CN: string
settings.conversations.members.subtitle.en: string
settings.conversations.members.subtitle.zh-CN: string
settings.conversations.members.scope.label.en: string
settings.conversations.members.scope.label.zh-CN: string
settings.conversations.members.scope.value*: string
settings.conversations.members.scope.value[LabText].en: string
settings.conversations.members.scope.value[LabText].zh-CN: string
settings.conversations.projects.sessions[].name*: string
settings.conversations.projects.sessions[].name[LabText].en: string
settings.conversations.projects.sessions[].name[LabText].zh-CN: string
settings.conversations.projects.sessions[].meta*: string
settings.conversations.projects.sessions[].meta[LabText].en: string
settings.conversations.projects.sessions[].meta[LabText].zh-CN: string
settings.conversations.projects.seed[][kind="user"].kind: "user"
settings.conversations.projects.seed[][kind="user"].text*: string
settings.conversations.projects.seed[][kind="user"].text[LabText].en: string
settings.conversations.projects.seed[][kind="user"].text[LabText].zh-CN: string
settings.conversations.projects.seed[][kind="assistant"].kind: "assistant"
settings.conversations.projects.seed[][kind="assistant"].text*: string
settings.conversations.projects.seed[][kind="assistant"].text[LabText].en: string
settings.conversations.projects.seed[][kind="assistant"].text[LabText].zh-CN: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
settings.conversations.projects.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
settings.conversations.projects.prompts[]*: string
settings.conversations.projects.prompts[][LabText].en: string
settings.conversations.projects.prompts[][LabText].zh-CN: string
settings.conversations.projects.reply.en: string
settings.conversations.projects.reply.zh-CN: string
settings.conversations.projects.placeholder.en: string
settings.conversations.projects.placeholder.zh-CN: string
settings.conversations.projects.subtitle.en: string
settings.conversations.projects.subtitle.zh-CN: string
settings.conversations.projects.scope.label.en: string
settings.conversations.projects.scope.label.zh-CN: string
settings.conversations.projects.scope.value*: string
settings.conversations.projects.scope.value[LabText].en: string
settings.conversations.projects.scope.value[LabText].zh-CN: string
settings.conversations.repos.sessions[].name*: string
settings.conversations.repos.sessions[].name[LabText].en: string
settings.conversations.repos.sessions[].name[LabText].zh-CN: string
settings.conversations.repos.sessions[].meta*: string
settings.conversations.repos.sessions[].meta[LabText].en: string
settings.conversations.repos.sessions[].meta[LabText].zh-CN: string
settings.conversations.repos.seed[][kind="user"].kind: "user"
settings.conversations.repos.seed[][kind="user"].text*: string
settings.conversations.repos.seed[][kind="user"].text[LabText].en: string
settings.conversations.repos.seed[][kind="user"].text[LabText].zh-CN: string
settings.conversations.repos.seed[][kind="assistant"].kind: "assistant"
settings.conversations.repos.seed[][kind="assistant"].text*: string
settings.conversations.repos.seed[][kind="assistant"].text[LabText].en: string
settings.conversations.repos.seed[][kind="assistant"].text[LabText].zh-CN: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].kind: "changes"
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].title.en: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].title.zh-CN: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].note.en: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].note.zh-CN: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].rows[].kind: ChangeKind
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text*: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].en: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="changes"].rows[].text[LabText].zh-CN: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="actions"].kind: "actions"
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.en: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="actions"].actions[].label.zh-CN: string
settings.conversations.repos.seed[][kind="assistant"].blocks[][kind="actions"].actions[].emphasis: "primary" | "secondary"
settings.conversations.repos.prompts[]*: string
settings.conversations.repos.prompts[][LabText].en: string
settings.conversations.repos.prompts[][LabText].zh-CN: string
settings.conversations.repos.reply.en: string
settings.conversations.repos.reply.zh-CN: string
settings.conversations.repos.placeholder.en: string
settings.conversations.repos.placeholder.zh-CN: string
settings.conversations.repos.subtitle.en: string
settings.conversations.repos.subtitle.zh-CN: string
settings.conversations.repos.scope.label.en: string
settings.conversations.repos.scope.label.zh-CN: string
settings.conversations.repos.scope.value*: string
settings.conversations.repos.scope.value[LabText].en: string
settings.conversations.repos.scope.value[LabText].zh-CN: string
settings.dialogs.add_file.id: string
settings.dialogs.add_file.title*: string
settings.dialogs.add_file.title[LabText].en: string
settings.dialogs.add_file.title[LabText].zh-CN: string
settings.dialogs.add_file.subtitle*: string  (optional)
settings.dialogs.add_file.subtitle[LabText].en: string
settings.dialogs.add_file.subtitle[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="text"].key: string
settings.dialogs.add_file.fields[][kind="text"].label*: string
settings.dialogs.add_file.fields[][kind="text"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="text"].kind: "text"
settings.dialogs.add_file.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.add_file.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.add_file.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="text"].value*: string  (optional)
settings.dialogs.add_file.fields[][kind="text"].value[LabText].en: string
settings.dialogs.add_file.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.add_file.fields[][kind="area"].key: string
settings.dialogs.add_file.fields[][kind="area"].label*: string
settings.dialogs.add_file.fields[][kind="area"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="area"].kind: "area"
settings.dialogs.add_file.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.add_file.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.add_file.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="area"].value*: string  (optional)
settings.dialogs.add_file.fields[][kind="area"].value[LabText].en: string
settings.dialogs.add_file.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.add_file.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.add_file.fields[][kind="segmented"].key: string
settings.dialogs.add_file.fields[][kind="segmented"].label*: string
settings.dialogs.add_file.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.add_file.fields[][kind="segmented"].options[].id: string
settings.dialogs.add_file.fields[][kind="segmented"].options[].label*: string
settings.dialogs.add_file.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.add_file.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.add_file.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.add_file.fields[][kind="choice"].key: string
settings.dialogs.add_file.fields[][kind="choice"].label*: string
settings.dialogs.add_file.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="choice"].kind: "choice"
settings.dialogs.add_file.fields[][kind="choice"].options[].id: string
settings.dialogs.add_file.fields[][kind="choice"].options[].label*: string
settings.dialogs.add_file.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.add_file.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.add_file.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.add_file.fields[][kind="multi"].key: string
settings.dialogs.add_file.fields[][kind="multi"].label*: string
settings.dialogs.add_file.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="multi"].kind: "multi"
settings.dialogs.add_file.fields[][kind="multi"].options[].id: string
settings.dialogs.add_file.fields[][kind="multi"].options[].label*: string
settings.dialogs.add_file.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.add_file.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.add_file.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="multi"].value[]: string
settings.dialogs.add_file.fields[][kind="toggle"].key: string
settings.dialogs.add_file.fields[][kind="toggle"].label*: string
settings.dialogs.add_file.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.add_file.fields[][kind="toggle"].onText*: string
settings.dialogs.add_file.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.add_file.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.add_file.fields[][kind="info"].key: string
settings.dialogs.add_file.fields[][kind="info"].label*: string
settings.dialogs.add_file.fields[][kind="info"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="info"].kind: "info"
settings.dialogs.add_file.fields[][kind="info"].text*: string
settings.dialogs.add_file.fields[][kind="info"].text[LabText].en: string
settings.dialogs.add_file.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.add_file.fields[][kind="code"].key: string
settings.dialogs.add_file.fields[][kind="code"].label*: string
settings.dialogs.add_file.fields[][kind="code"].label[LabText].en: string
settings.dialogs.add_file.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.add_file.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.add_file.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.add_file.fields[][kind="code"].kind: "code"
settings.dialogs.add_file.fields[][kind="code"].code: string
settings.dialogs.add_file.warning.tone: "danger" | "neutral"
settings.dialogs.add_file.warning.text*: string
settings.dialogs.add_file.warning.text[LabText].en: string
settings.dialogs.add_file.warning.text[LabText].zh-CN: string
settings.dialogs.add_file.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.add_file.confirmLabel*: string  (optional)
settings.dialogs.add_file.confirmLabel[LabText].en: string
settings.dialogs.add_file.confirmLabel[LabText].zh-CN: string
settings.dialogs.add_file.hasCancel: boolean | undefined  (optional)
settings.dialogs.add_file.completion[kind="done"].kind: "done"
settings.dialogs.add_file.completion[kind="done"].title*: string  (optional)
settings.dialogs.add_file.completion[kind="done"].title[LabText].en: string
settings.dialogs.add_file.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.add_file.completion[kind="done"].detail*: string  (optional)
settings.dialogs.add_file.completion[kind="done"].detail[LabText].en: string
settings.dialogs.add_file.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.add_file.completion[kind="close"].kind: "close"
settings.dialogs.add_file.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.add_file.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.add_model.id: string
settings.dialogs.add_model.title*: string
settings.dialogs.add_model.title[LabText].en: string
settings.dialogs.add_model.title[LabText].zh-CN: string
settings.dialogs.add_model.subtitle*: string  (optional)
settings.dialogs.add_model.subtitle[LabText].en: string
settings.dialogs.add_model.subtitle[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="text"].key: string
settings.dialogs.add_model.fields[][kind="text"].label*: string
settings.dialogs.add_model.fields[][kind="text"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="text"].kind: "text"
settings.dialogs.add_model.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.add_model.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.add_model.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="text"].value*: string  (optional)
settings.dialogs.add_model.fields[][kind="text"].value[LabText].en: string
settings.dialogs.add_model.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.add_model.fields[][kind="area"].key: string
settings.dialogs.add_model.fields[][kind="area"].label*: string
settings.dialogs.add_model.fields[][kind="area"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="area"].kind: "area"
settings.dialogs.add_model.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.add_model.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.add_model.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="area"].value*: string  (optional)
settings.dialogs.add_model.fields[][kind="area"].value[LabText].en: string
settings.dialogs.add_model.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.add_model.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.add_model.fields[][kind="segmented"].key: string
settings.dialogs.add_model.fields[][kind="segmented"].label*: string
settings.dialogs.add_model.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.add_model.fields[][kind="segmented"].options[].id: string
settings.dialogs.add_model.fields[][kind="segmented"].options[].label*: string
settings.dialogs.add_model.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.add_model.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.add_model.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.add_model.fields[][kind="choice"].key: string
settings.dialogs.add_model.fields[][kind="choice"].label*: string
settings.dialogs.add_model.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="choice"].kind: "choice"
settings.dialogs.add_model.fields[][kind="choice"].options[].id: string
settings.dialogs.add_model.fields[][kind="choice"].options[].label*: string
settings.dialogs.add_model.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.add_model.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.add_model.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.add_model.fields[][kind="multi"].key: string
settings.dialogs.add_model.fields[][kind="multi"].label*: string
settings.dialogs.add_model.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="multi"].kind: "multi"
settings.dialogs.add_model.fields[][kind="multi"].options[].id: string
settings.dialogs.add_model.fields[][kind="multi"].options[].label*: string
settings.dialogs.add_model.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.add_model.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.add_model.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="multi"].value[]: string
settings.dialogs.add_model.fields[][kind="toggle"].key: string
settings.dialogs.add_model.fields[][kind="toggle"].label*: string
settings.dialogs.add_model.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.add_model.fields[][kind="toggle"].onText*: string
settings.dialogs.add_model.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.add_model.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.add_model.fields[][kind="info"].key: string
settings.dialogs.add_model.fields[][kind="info"].label*: string
settings.dialogs.add_model.fields[][kind="info"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="info"].kind: "info"
settings.dialogs.add_model.fields[][kind="info"].text*: string
settings.dialogs.add_model.fields[][kind="info"].text[LabText].en: string
settings.dialogs.add_model.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.add_model.fields[][kind="code"].key: string
settings.dialogs.add_model.fields[][kind="code"].label*: string
settings.dialogs.add_model.fields[][kind="code"].label[LabText].en: string
settings.dialogs.add_model.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.add_model.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.add_model.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.add_model.fields[][kind="code"].kind: "code"
settings.dialogs.add_model.fields[][kind="code"].code: string
settings.dialogs.add_model.warning.tone: "danger" | "neutral"
settings.dialogs.add_model.warning.text*: string
settings.dialogs.add_model.warning.text[LabText].en: string
settings.dialogs.add_model.warning.text[LabText].zh-CN: string
settings.dialogs.add_model.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.add_model.confirmLabel*: string  (optional)
settings.dialogs.add_model.confirmLabel[LabText].en: string
settings.dialogs.add_model.confirmLabel[LabText].zh-CN: string
settings.dialogs.add_model.hasCancel: boolean | undefined  (optional)
settings.dialogs.add_model.completion[kind="done"].kind: "done"
settings.dialogs.add_model.completion[kind="done"].title*: string  (optional)
settings.dialogs.add_model.completion[kind="done"].title[LabText].en: string
settings.dialogs.add_model.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.add_model.completion[kind="done"].detail*: string  (optional)
settings.dialogs.add_model.completion[kind="done"].detail[LabText].en: string
settings.dialogs.add_model.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.add_model.completion[kind="close"].kind: "close"
settings.dialogs.add_model.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.add_model.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.add_template.id: string
settings.dialogs.add_template.title*: string
settings.dialogs.add_template.title[LabText].en: string
settings.dialogs.add_template.title[LabText].zh-CN: string
settings.dialogs.add_template.subtitle*: string  (optional)
settings.dialogs.add_template.subtitle[LabText].en: string
settings.dialogs.add_template.subtitle[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="text"].key: string
settings.dialogs.add_template.fields[][kind="text"].label*: string
settings.dialogs.add_template.fields[][kind="text"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="text"].kind: "text"
settings.dialogs.add_template.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.add_template.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.add_template.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="text"].value*: string  (optional)
settings.dialogs.add_template.fields[][kind="text"].value[LabText].en: string
settings.dialogs.add_template.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.add_template.fields[][kind="area"].key: string
settings.dialogs.add_template.fields[][kind="area"].label*: string
settings.dialogs.add_template.fields[][kind="area"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="area"].kind: "area"
settings.dialogs.add_template.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.add_template.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.add_template.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="area"].value*: string  (optional)
settings.dialogs.add_template.fields[][kind="area"].value[LabText].en: string
settings.dialogs.add_template.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.add_template.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.add_template.fields[][kind="segmented"].key: string
settings.dialogs.add_template.fields[][kind="segmented"].label*: string
settings.dialogs.add_template.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.add_template.fields[][kind="segmented"].options[].id: string
settings.dialogs.add_template.fields[][kind="segmented"].options[].label*: string
settings.dialogs.add_template.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.add_template.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.add_template.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.add_template.fields[][kind="choice"].key: string
settings.dialogs.add_template.fields[][kind="choice"].label*: string
settings.dialogs.add_template.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="choice"].kind: "choice"
settings.dialogs.add_template.fields[][kind="choice"].options[].id: string
settings.dialogs.add_template.fields[][kind="choice"].options[].label*: string
settings.dialogs.add_template.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.add_template.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.add_template.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.add_template.fields[][kind="multi"].key: string
settings.dialogs.add_template.fields[][kind="multi"].label*: string
settings.dialogs.add_template.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="multi"].kind: "multi"
settings.dialogs.add_template.fields[][kind="multi"].options[].id: string
settings.dialogs.add_template.fields[][kind="multi"].options[].label*: string
settings.dialogs.add_template.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.add_template.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.add_template.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="multi"].value[]: string
settings.dialogs.add_template.fields[][kind="toggle"].key: string
settings.dialogs.add_template.fields[][kind="toggle"].label*: string
settings.dialogs.add_template.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.add_template.fields[][kind="toggle"].onText*: string
settings.dialogs.add_template.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.add_template.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.add_template.fields[][kind="info"].key: string
settings.dialogs.add_template.fields[][kind="info"].label*: string
settings.dialogs.add_template.fields[][kind="info"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="info"].kind: "info"
settings.dialogs.add_template.fields[][kind="info"].text*: string
settings.dialogs.add_template.fields[][kind="info"].text[LabText].en: string
settings.dialogs.add_template.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.add_template.fields[][kind="code"].key: string
settings.dialogs.add_template.fields[][kind="code"].label*: string
settings.dialogs.add_template.fields[][kind="code"].label[LabText].en: string
settings.dialogs.add_template.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.add_template.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.add_template.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.add_template.fields[][kind="code"].kind: "code"
settings.dialogs.add_template.fields[][kind="code"].code: string
settings.dialogs.add_template.warning.tone: "danger" | "neutral"
settings.dialogs.add_template.warning.text*: string
settings.dialogs.add_template.warning.text[LabText].en: string
settings.dialogs.add_template.warning.text[LabText].zh-CN: string
settings.dialogs.add_template.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.add_template.confirmLabel*: string  (optional)
settings.dialogs.add_template.confirmLabel[LabText].en: string
settings.dialogs.add_template.confirmLabel[LabText].zh-CN: string
settings.dialogs.add_template.hasCancel: boolean | undefined  (optional)
settings.dialogs.add_template.completion[kind="done"].kind: "done"
settings.dialogs.add_template.completion[kind="done"].title*: string  (optional)
settings.dialogs.add_template.completion[kind="done"].title[LabText].en: string
settings.dialogs.add_template.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.add_template.completion[kind="done"].detail*: string  (optional)
settings.dialogs.add_template.completion[kind="done"].detail[LabText].en: string
settings.dialogs.add_template.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.add_template.completion[kind="close"].kind: "close"
settings.dialogs.add_template.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.add_template.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.archive.id: string
settings.dialogs.archive.title*: string
settings.dialogs.archive.title[LabText].en: string
settings.dialogs.archive.title[LabText].zh-CN: string
settings.dialogs.archive.subtitle*: string  (optional)
settings.dialogs.archive.subtitle[LabText].en: string
settings.dialogs.archive.subtitle[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="text"].key: string
settings.dialogs.archive.fields[][kind="text"].label*: string
settings.dialogs.archive.fields[][kind="text"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="text"].kind: "text"
settings.dialogs.archive.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.archive.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.archive.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="text"].value*: string  (optional)
settings.dialogs.archive.fields[][kind="text"].value[LabText].en: string
settings.dialogs.archive.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.archive.fields[][kind="area"].key: string
settings.dialogs.archive.fields[][kind="area"].label*: string
settings.dialogs.archive.fields[][kind="area"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="area"].kind: "area"
settings.dialogs.archive.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.archive.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.archive.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="area"].value*: string  (optional)
settings.dialogs.archive.fields[][kind="area"].value[LabText].en: string
settings.dialogs.archive.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.archive.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.archive.fields[][kind="segmented"].key: string
settings.dialogs.archive.fields[][kind="segmented"].label*: string
settings.dialogs.archive.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.archive.fields[][kind="segmented"].options[].id: string
settings.dialogs.archive.fields[][kind="segmented"].options[].label*: string
settings.dialogs.archive.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.archive.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.archive.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.archive.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.archive.fields[][kind="choice"].key: string
settings.dialogs.archive.fields[][kind="choice"].label*: string
settings.dialogs.archive.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="choice"].kind: "choice"
settings.dialogs.archive.fields[][kind="choice"].options[].id: string
settings.dialogs.archive.fields[][kind="choice"].options[].label*: string
settings.dialogs.archive.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.archive.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.archive.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.archive.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.archive.fields[][kind="multi"].key: string
settings.dialogs.archive.fields[][kind="multi"].label*: string
settings.dialogs.archive.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="multi"].kind: "multi"
settings.dialogs.archive.fields[][kind="multi"].options[].id: string
settings.dialogs.archive.fields[][kind="multi"].options[].label*: string
settings.dialogs.archive.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.archive.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.archive.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.archive.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="multi"].value[]: string
settings.dialogs.archive.fields[][kind="toggle"].key: string
settings.dialogs.archive.fields[][kind="toggle"].label*: string
settings.dialogs.archive.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.archive.fields[][kind="toggle"].onText*: string
settings.dialogs.archive.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.archive.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.archive.fields[][kind="info"].key: string
settings.dialogs.archive.fields[][kind="info"].label*: string
settings.dialogs.archive.fields[][kind="info"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="info"].kind: "info"
settings.dialogs.archive.fields[][kind="info"].text*: string
settings.dialogs.archive.fields[][kind="info"].text[LabText].en: string
settings.dialogs.archive.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.archive.fields[][kind="code"].key: string
settings.dialogs.archive.fields[][kind="code"].label*: string
settings.dialogs.archive.fields[][kind="code"].label[LabText].en: string
settings.dialogs.archive.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.archive.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.archive.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.archive.fields[][kind="code"].kind: "code"
settings.dialogs.archive.fields[][kind="code"].code: string
settings.dialogs.archive.warning.tone: "danger" | "neutral"
settings.dialogs.archive.warning.text*: string
settings.dialogs.archive.warning.text[LabText].en: string
settings.dialogs.archive.warning.text[LabText].zh-CN: string
settings.dialogs.archive.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.archive.confirmLabel*: string  (optional)
settings.dialogs.archive.confirmLabel[LabText].en: string
settings.dialogs.archive.confirmLabel[LabText].zh-CN: string
settings.dialogs.archive.hasCancel: boolean | undefined  (optional)
settings.dialogs.archive.completion[kind="done"].kind: "done"
settings.dialogs.archive.completion[kind="done"].title*: string  (optional)
settings.dialogs.archive.completion[kind="done"].title[LabText].en: string
settings.dialogs.archive.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.archive.completion[kind="done"].detail*: string  (optional)
settings.dialogs.archive.completion[kind="done"].detail[LabText].en: string
settings.dialogs.archive.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.archive.completion[kind="close"].kind: "close"
settings.dialogs.archive.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.archive.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.connect_repo.id: string
settings.dialogs.connect_repo.title*: string
settings.dialogs.connect_repo.title[LabText].en: string
settings.dialogs.connect_repo.title[LabText].zh-CN: string
settings.dialogs.connect_repo.subtitle*: string  (optional)
settings.dialogs.connect_repo.subtitle[LabText].en: string
settings.dialogs.connect_repo.subtitle[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="text"].key: string
settings.dialogs.connect_repo.fields[][kind="text"].label*: string
settings.dialogs.connect_repo.fields[][kind="text"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="text"].kind: "text"
settings.dialogs.connect_repo.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="text"].value*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="text"].value[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="area"].key: string
settings.dialogs.connect_repo.fields[][kind="area"].label*: string
settings.dialogs.connect_repo.fields[][kind="area"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="area"].kind: "area"
settings.dialogs.connect_repo.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="area"].value*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="area"].value[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="segmented"].key: string
settings.dialogs.connect_repo.fields[][kind="segmented"].label*: string
settings.dialogs.connect_repo.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].id: string
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].label*: string
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="choice"].key: string
settings.dialogs.connect_repo.fields[][kind="choice"].label*: string
settings.dialogs.connect_repo.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="choice"].kind: "choice"
settings.dialogs.connect_repo.fields[][kind="choice"].options[].id: string
settings.dialogs.connect_repo.fields[][kind="choice"].options[].label*: string
settings.dialogs.connect_repo.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="multi"].key: string
settings.dialogs.connect_repo.fields[][kind="multi"].label*: string
settings.dialogs.connect_repo.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="multi"].kind: "multi"
settings.dialogs.connect_repo.fields[][kind="multi"].options[].id: string
settings.dialogs.connect_repo.fields[][kind="multi"].options[].label*: string
settings.dialogs.connect_repo.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="multi"].value[]: string
settings.dialogs.connect_repo.fields[][kind="toggle"].key: string
settings.dialogs.connect_repo.fields[][kind="toggle"].label*: string
settings.dialogs.connect_repo.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.connect_repo.fields[][kind="toggle"].onText*: string
settings.dialogs.connect_repo.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="info"].key: string
settings.dialogs.connect_repo.fields[][kind="info"].label*: string
settings.dialogs.connect_repo.fields[][kind="info"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="info"].kind: "info"
settings.dialogs.connect_repo.fields[][kind="info"].text*: string
settings.dialogs.connect_repo.fields[][kind="info"].text[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.connect_repo.fields[][kind="code"].key: string
settings.dialogs.connect_repo.fields[][kind="code"].label*: string
settings.dialogs.connect_repo.fields[][kind="code"].label[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.connect_repo.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.connect_repo.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.connect_repo.fields[][kind="code"].kind: "code"
settings.dialogs.connect_repo.fields[][kind="code"].code: string
settings.dialogs.connect_repo.warning.tone: "danger" | "neutral"
settings.dialogs.connect_repo.warning.text*: string
settings.dialogs.connect_repo.warning.text[LabText].en: string
settings.dialogs.connect_repo.warning.text[LabText].zh-CN: string
settings.dialogs.connect_repo.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.connect_repo.confirmLabel*: string  (optional)
settings.dialogs.connect_repo.confirmLabel[LabText].en: string
settings.dialogs.connect_repo.confirmLabel[LabText].zh-CN: string
settings.dialogs.connect_repo.hasCancel: boolean | undefined  (optional)
settings.dialogs.connect_repo.completion[kind="done"].kind: "done"
settings.dialogs.connect_repo.completion[kind="done"].title*: string  (optional)
settings.dialogs.connect_repo.completion[kind="done"].title[LabText].en: string
settings.dialogs.connect_repo.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.connect_repo.completion[kind="done"].detail*: string  (optional)
settings.dialogs.connect_repo.completion[kind="done"].detail[LabText].en: string
settings.dialogs.connect_repo.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.connect_repo.completion[kind="close"].kind: "close"
settings.dialogs.connect_repo.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.connect_repo.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.delete_template.id: string
settings.dialogs.delete_template.title*: string
settings.dialogs.delete_template.title[LabText].en: string
settings.dialogs.delete_template.title[LabText].zh-CN: string
settings.dialogs.delete_template.subtitle*: string  (optional)
settings.dialogs.delete_template.subtitle[LabText].en: string
settings.dialogs.delete_template.subtitle[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="text"].key: string
settings.dialogs.delete_template.fields[][kind="text"].label*: string
settings.dialogs.delete_template.fields[][kind="text"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="text"].kind: "text"
settings.dialogs.delete_template.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.delete_template.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.delete_template.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="text"].value*: string  (optional)
settings.dialogs.delete_template.fields[][kind="text"].value[LabText].en: string
settings.dialogs.delete_template.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="area"].key: string
settings.dialogs.delete_template.fields[][kind="area"].label*: string
settings.dialogs.delete_template.fields[][kind="area"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="area"].kind: "area"
settings.dialogs.delete_template.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.delete_template.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.delete_template.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="area"].value*: string  (optional)
settings.dialogs.delete_template.fields[][kind="area"].value[LabText].en: string
settings.dialogs.delete_template.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="segmented"].key: string
settings.dialogs.delete_template.fields[][kind="segmented"].label*: string
settings.dialogs.delete_template.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.delete_template.fields[][kind="segmented"].options[].id: string
settings.dialogs.delete_template.fields[][kind="segmented"].options[].label*: string
settings.dialogs.delete_template.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.delete_template.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.delete_template.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="choice"].key: string
settings.dialogs.delete_template.fields[][kind="choice"].label*: string
settings.dialogs.delete_template.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="choice"].kind: "choice"
settings.dialogs.delete_template.fields[][kind="choice"].options[].id: string
settings.dialogs.delete_template.fields[][kind="choice"].options[].label*: string
settings.dialogs.delete_template.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.delete_template.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.delete_template.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="multi"].key: string
settings.dialogs.delete_template.fields[][kind="multi"].label*: string
settings.dialogs.delete_template.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="multi"].kind: "multi"
settings.dialogs.delete_template.fields[][kind="multi"].options[].id: string
settings.dialogs.delete_template.fields[][kind="multi"].options[].label*: string
settings.dialogs.delete_template.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.delete_template.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.delete_template.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="multi"].value[]: string
settings.dialogs.delete_template.fields[][kind="toggle"].key: string
settings.dialogs.delete_template.fields[][kind="toggle"].label*: string
settings.dialogs.delete_template.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.delete_template.fields[][kind="toggle"].onText*: string
settings.dialogs.delete_template.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.delete_template.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="info"].key: string
settings.dialogs.delete_template.fields[][kind="info"].label*: string
settings.dialogs.delete_template.fields[][kind="info"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="info"].kind: "info"
settings.dialogs.delete_template.fields[][kind="info"].text*: string
settings.dialogs.delete_template.fields[][kind="info"].text[LabText].en: string
settings.dialogs.delete_template.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.delete_template.fields[][kind="code"].key: string
settings.dialogs.delete_template.fields[][kind="code"].label*: string
settings.dialogs.delete_template.fields[][kind="code"].label[LabText].en: string
settings.dialogs.delete_template.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.delete_template.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.delete_template.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.delete_template.fields[][kind="code"].kind: "code"
settings.dialogs.delete_template.fields[][kind="code"].code: string
settings.dialogs.delete_template.warning.tone: "danger" | "neutral"
settings.dialogs.delete_template.warning.text*: string
settings.dialogs.delete_template.warning.text[LabText].en: string
settings.dialogs.delete_template.warning.text[LabText].zh-CN: string
settings.dialogs.delete_template.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.delete_template.confirmLabel*: string  (optional)
settings.dialogs.delete_template.confirmLabel[LabText].en: string
settings.dialogs.delete_template.confirmLabel[LabText].zh-CN: string
settings.dialogs.delete_template.hasCancel: boolean | undefined  (optional)
settings.dialogs.delete_template.completion[kind="done"].kind: "done"
settings.dialogs.delete_template.completion[kind="done"].title*: string  (optional)
settings.dialogs.delete_template.completion[kind="done"].title[LabText].en: string
settings.dialogs.delete_template.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.delete_template.completion[kind="done"].detail*: string  (optional)
settings.dialogs.delete_template.completion[kind="done"].detail[LabText].en: string
settings.dialogs.delete_template.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.delete_template.completion[kind="close"].kind: "close"
settings.dialogs.delete_template.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.delete_template.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.disconnect.id: string
settings.dialogs.disconnect.title*: string
settings.dialogs.disconnect.title[LabText].en: string
settings.dialogs.disconnect.title[LabText].zh-CN: string
settings.dialogs.disconnect.subtitle*: string  (optional)
settings.dialogs.disconnect.subtitle[LabText].en: string
settings.dialogs.disconnect.subtitle[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="text"].key: string
settings.dialogs.disconnect.fields[][kind="text"].label*: string
settings.dialogs.disconnect.fields[][kind="text"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="text"].kind: "text"
settings.dialogs.disconnect.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.disconnect.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.disconnect.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="text"].value*: string  (optional)
settings.dialogs.disconnect.fields[][kind="text"].value[LabText].en: string
settings.dialogs.disconnect.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="area"].key: string
settings.dialogs.disconnect.fields[][kind="area"].label*: string
settings.dialogs.disconnect.fields[][kind="area"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="area"].kind: "area"
settings.dialogs.disconnect.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.disconnect.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.disconnect.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="area"].value*: string  (optional)
settings.dialogs.disconnect.fields[][kind="area"].value[LabText].en: string
settings.dialogs.disconnect.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="segmented"].key: string
settings.dialogs.disconnect.fields[][kind="segmented"].label*: string
settings.dialogs.disconnect.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.disconnect.fields[][kind="segmented"].options[].id: string
settings.dialogs.disconnect.fields[][kind="segmented"].options[].label*: string
settings.dialogs.disconnect.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.disconnect.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.disconnect.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="choice"].key: string
settings.dialogs.disconnect.fields[][kind="choice"].label*: string
settings.dialogs.disconnect.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="choice"].kind: "choice"
settings.dialogs.disconnect.fields[][kind="choice"].options[].id: string
settings.dialogs.disconnect.fields[][kind="choice"].options[].label*: string
settings.dialogs.disconnect.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.disconnect.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.disconnect.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="multi"].key: string
settings.dialogs.disconnect.fields[][kind="multi"].label*: string
settings.dialogs.disconnect.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="multi"].kind: "multi"
settings.dialogs.disconnect.fields[][kind="multi"].options[].id: string
settings.dialogs.disconnect.fields[][kind="multi"].options[].label*: string
settings.dialogs.disconnect.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.disconnect.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.disconnect.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="multi"].value[]: string
settings.dialogs.disconnect.fields[][kind="toggle"].key: string
settings.dialogs.disconnect.fields[][kind="toggle"].label*: string
settings.dialogs.disconnect.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.disconnect.fields[][kind="toggle"].onText*: string
settings.dialogs.disconnect.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.disconnect.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="info"].key: string
settings.dialogs.disconnect.fields[][kind="info"].label*: string
settings.dialogs.disconnect.fields[][kind="info"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="info"].kind: "info"
settings.dialogs.disconnect.fields[][kind="info"].text*: string
settings.dialogs.disconnect.fields[][kind="info"].text[LabText].en: string
settings.dialogs.disconnect.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.disconnect.fields[][kind="code"].key: string
settings.dialogs.disconnect.fields[][kind="code"].label*: string
settings.dialogs.disconnect.fields[][kind="code"].label[LabText].en: string
settings.dialogs.disconnect.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.disconnect.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.disconnect.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.disconnect.fields[][kind="code"].kind: "code"
settings.dialogs.disconnect.fields[][kind="code"].code: string
settings.dialogs.disconnect.warning.tone: "danger" | "neutral"
settings.dialogs.disconnect.warning.text*: string
settings.dialogs.disconnect.warning.text[LabText].en: string
settings.dialogs.disconnect.warning.text[LabText].zh-CN: string
settings.dialogs.disconnect.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.disconnect.confirmLabel*: string  (optional)
settings.dialogs.disconnect.confirmLabel[LabText].en: string
settings.dialogs.disconnect.confirmLabel[LabText].zh-CN: string
settings.dialogs.disconnect.hasCancel: boolean | undefined  (optional)
settings.dialogs.disconnect.completion[kind="done"].kind: "done"
settings.dialogs.disconnect.completion[kind="done"].title*: string  (optional)
settings.dialogs.disconnect.completion[kind="done"].title[LabText].en: string
settings.dialogs.disconnect.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.disconnect.completion[kind="done"].detail*: string  (optional)
settings.dialogs.disconnect.completion[kind="done"].detail[LabText].en: string
settings.dialogs.disconnect.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.disconnect.completion[kind="close"].kind: "close"
settings.dialogs.disconnect.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.disconnect.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.duplicate_template.id: string
settings.dialogs.duplicate_template.title*: string
settings.dialogs.duplicate_template.title[LabText].en: string
settings.dialogs.duplicate_template.title[LabText].zh-CN: string
settings.dialogs.duplicate_template.subtitle*: string  (optional)
settings.dialogs.duplicate_template.subtitle[LabText].en: string
settings.dialogs.duplicate_template.subtitle[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="text"].key: string
settings.dialogs.duplicate_template.fields[][kind="text"].label*: string
settings.dialogs.duplicate_template.fields[][kind="text"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="text"].kind: "text"
settings.dialogs.duplicate_template.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="text"].value*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="text"].value[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="area"].key: string
settings.dialogs.duplicate_template.fields[][kind="area"].label*: string
settings.dialogs.duplicate_template.fields[][kind="area"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="area"].kind: "area"
settings.dialogs.duplicate_template.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="area"].value*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="area"].value[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="segmented"].key: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].label*: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].id: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].label*: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="choice"].key: string
settings.dialogs.duplicate_template.fields[][kind="choice"].label*: string
settings.dialogs.duplicate_template.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="choice"].kind: "choice"
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].id: string
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].label*: string
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="multi"].key: string
settings.dialogs.duplicate_template.fields[][kind="multi"].label*: string
settings.dialogs.duplicate_template.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="multi"].kind: "multi"
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].id: string
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].label*: string
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="multi"].value[]: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].key: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].label*: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.duplicate_template.fields[][kind="toggle"].onText*: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="info"].key: string
settings.dialogs.duplicate_template.fields[][kind="info"].label*: string
settings.dialogs.duplicate_template.fields[][kind="info"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="info"].kind: "info"
settings.dialogs.duplicate_template.fields[][kind="info"].text*: string
settings.dialogs.duplicate_template.fields[][kind="info"].text[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.duplicate_template.fields[][kind="code"].key: string
settings.dialogs.duplicate_template.fields[][kind="code"].label*: string
settings.dialogs.duplicate_template.fields[][kind="code"].label[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.duplicate_template.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.duplicate_template.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.duplicate_template.fields[][kind="code"].kind: "code"
settings.dialogs.duplicate_template.fields[][kind="code"].code: string
settings.dialogs.duplicate_template.warning.tone: "danger" | "neutral"
settings.dialogs.duplicate_template.warning.text*: string
settings.dialogs.duplicate_template.warning.text[LabText].en: string
settings.dialogs.duplicate_template.warning.text[LabText].zh-CN: string
settings.dialogs.duplicate_template.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.duplicate_template.confirmLabel*: string  (optional)
settings.dialogs.duplicate_template.confirmLabel[LabText].en: string
settings.dialogs.duplicate_template.confirmLabel[LabText].zh-CN: string
settings.dialogs.duplicate_template.hasCancel: boolean | undefined  (optional)
settings.dialogs.duplicate_template.completion[kind="done"].kind: "done"
settings.dialogs.duplicate_template.completion[kind="done"].title*: string  (optional)
settings.dialogs.duplicate_template.completion[kind="done"].title[LabText].en: string
settings.dialogs.duplicate_template.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.duplicate_template.completion[kind="done"].detail*: string  (optional)
settings.dialogs.duplicate_template.completion[kind="done"].detail[LabText].en: string
settings.dialogs.duplicate_template.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.duplicate_template.completion[kind="close"].kind: "close"
settings.dialogs.duplicate_template.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.duplicate_template.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.history.id: string
settings.dialogs.history.title*: string
settings.dialogs.history.title[LabText].en: string
settings.dialogs.history.title[LabText].zh-CN: string
settings.dialogs.history.subtitle*: string  (optional)
settings.dialogs.history.subtitle[LabText].en: string
settings.dialogs.history.subtitle[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="text"].key: string
settings.dialogs.history.fields[][kind="text"].label*: string
settings.dialogs.history.fields[][kind="text"].label[LabText].en: string
settings.dialogs.history.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="text"].kind: "text"
settings.dialogs.history.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.history.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.history.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="text"].value*: string  (optional)
settings.dialogs.history.fields[][kind="text"].value[LabText].en: string
settings.dialogs.history.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.history.fields[][kind="area"].key: string
settings.dialogs.history.fields[][kind="area"].label*: string
settings.dialogs.history.fields[][kind="area"].label[LabText].en: string
settings.dialogs.history.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="area"].kind: "area"
settings.dialogs.history.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.history.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.history.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="area"].value*: string  (optional)
settings.dialogs.history.fields[][kind="area"].value[LabText].en: string
settings.dialogs.history.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.history.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.history.fields[][kind="segmented"].key: string
settings.dialogs.history.fields[][kind="segmented"].label*: string
settings.dialogs.history.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.history.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.history.fields[][kind="segmented"].options[].id: string
settings.dialogs.history.fields[][kind="segmented"].options[].label*: string
settings.dialogs.history.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.history.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.history.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.history.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.history.fields[][kind="choice"].key: string
settings.dialogs.history.fields[][kind="choice"].label*: string
settings.dialogs.history.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.history.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="choice"].kind: "choice"
settings.dialogs.history.fields[][kind="choice"].options[].id: string
settings.dialogs.history.fields[][kind="choice"].options[].label*: string
settings.dialogs.history.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.history.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.history.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.history.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.history.fields[][kind="multi"].key: string
settings.dialogs.history.fields[][kind="multi"].label*: string
settings.dialogs.history.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.history.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="multi"].kind: "multi"
settings.dialogs.history.fields[][kind="multi"].options[].id: string
settings.dialogs.history.fields[][kind="multi"].options[].label*: string
settings.dialogs.history.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.history.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.history.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.history.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="multi"].value[]: string
settings.dialogs.history.fields[][kind="toggle"].key: string
settings.dialogs.history.fields[][kind="toggle"].label*: string
settings.dialogs.history.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.history.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.history.fields[][kind="toggle"].onText*: string
settings.dialogs.history.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.history.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.history.fields[][kind="info"].key: string
settings.dialogs.history.fields[][kind="info"].label*: string
settings.dialogs.history.fields[][kind="info"].label[LabText].en: string
settings.dialogs.history.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="info"].kind: "info"
settings.dialogs.history.fields[][kind="info"].text*: string
settings.dialogs.history.fields[][kind="info"].text[LabText].en: string
settings.dialogs.history.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.history.fields[][kind="code"].key: string
settings.dialogs.history.fields[][kind="code"].label*: string
settings.dialogs.history.fields[][kind="code"].label[LabText].en: string
settings.dialogs.history.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.history.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.history.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.history.fields[][kind="code"].kind: "code"
settings.dialogs.history.fields[][kind="code"].code: string
settings.dialogs.history.warning.tone: "danger" | "neutral"
settings.dialogs.history.warning.text*: string
settings.dialogs.history.warning.text[LabText].en: string
settings.dialogs.history.warning.text[LabText].zh-CN: string
settings.dialogs.history.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.history.confirmLabel*: string  (optional)
settings.dialogs.history.confirmLabel[LabText].en: string
settings.dialogs.history.confirmLabel[LabText].zh-CN: string
settings.dialogs.history.hasCancel: boolean | undefined  (optional)
settings.dialogs.history.completion[kind="done"].kind: "done"
settings.dialogs.history.completion[kind="done"].title*: string  (optional)
settings.dialogs.history.completion[kind="done"].title[LabText].en: string
settings.dialogs.history.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.history.completion[kind="done"].detail*: string  (optional)
settings.dialogs.history.completion[kind="done"].detail[LabText].en: string
settings.dialogs.history.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.history.completion[kind="close"].kind: "close"
settings.dialogs.history.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.history.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.invite.id: string
settings.dialogs.invite.title*: string
settings.dialogs.invite.title[LabText].en: string
settings.dialogs.invite.title[LabText].zh-CN: string
settings.dialogs.invite.subtitle*: string  (optional)
settings.dialogs.invite.subtitle[LabText].en: string
settings.dialogs.invite.subtitle[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="text"].key: string
settings.dialogs.invite.fields[][kind="text"].label*: string
settings.dialogs.invite.fields[][kind="text"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="text"].kind: "text"
settings.dialogs.invite.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.invite.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.invite.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="text"].value*: string  (optional)
settings.dialogs.invite.fields[][kind="text"].value[LabText].en: string
settings.dialogs.invite.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.invite.fields[][kind="area"].key: string
settings.dialogs.invite.fields[][kind="area"].label*: string
settings.dialogs.invite.fields[][kind="area"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="area"].kind: "area"
settings.dialogs.invite.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.invite.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.invite.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="area"].value*: string  (optional)
settings.dialogs.invite.fields[][kind="area"].value[LabText].en: string
settings.dialogs.invite.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.invite.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.invite.fields[][kind="segmented"].key: string
settings.dialogs.invite.fields[][kind="segmented"].label*: string
settings.dialogs.invite.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.invite.fields[][kind="segmented"].options[].id: string
settings.dialogs.invite.fields[][kind="segmented"].options[].label*: string
settings.dialogs.invite.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.invite.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.invite.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.invite.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.invite.fields[][kind="choice"].key: string
settings.dialogs.invite.fields[][kind="choice"].label*: string
settings.dialogs.invite.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="choice"].kind: "choice"
settings.dialogs.invite.fields[][kind="choice"].options[].id: string
settings.dialogs.invite.fields[][kind="choice"].options[].label*: string
settings.dialogs.invite.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.invite.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.invite.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.invite.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.invite.fields[][kind="multi"].key: string
settings.dialogs.invite.fields[][kind="multi"].label*: string
settings.dialogs.invite.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="multi"].kind: "multi"
settings.dialogs.invite.fields[][kind="multi"].options[].id: string
settings.dialogs.invite.fields[][kind="multi"].options[].label*: string
settings.dialogs.invite.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.invite.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.invite.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.invite.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="multi"].value[]: string
settings.dialogs.invite.fields[][kind="toggle"].key: string
settings.dialogs.invite.fields[][kind="toggle"].label*: string
settings.dialogs.invite.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.invite.fields[][kind="toggle"].onText*: string
settings.dialogs.invite.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.invite.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.invite.fields[][kind="info"].key: string
settings.dialogs.invite.fields[][kind="info"].label*: string
settings.dialogs.invite.fields[][kind="info"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="info"].kind: "info"
settings.dialogs.invite.fields[][kind="info"].text*: string
settings.dialogs.invite.fields[][kind="info"].text[LabText].en: string
settings.dialogs.invite.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.invite.fields[][kind="code"].key: string
settings.dialogs.invite.fields[][kind="code"].label*: string
settings.dialogs.invite.fields[][kind="code"].label[LabText].en: string
settings.dialogs.invite.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.invite.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.invite.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.invite.fields[][kind="code"].kind: "code"
settings.dialogs.invite.fields[][kind="code"].code: string
settings.dialogs.invite.warning.tone: "danger" | "neutral"
settings.dialogs.invite.warning.text*: string
settings.dialogs.invite.warning.text[LabText].en: string
settings.dialogs.invite.warning.text[LabText].zh-CN: string
settings.dialogs.invite.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.invite.confirmLabel*: string  (optional)
settings.dialogs.invite.confirmLabel[LabText].en: string
settings.dialogs.invite.confirmLabel[LabText].zh-CN: string
settings.dialogs.invite.hasCancel: boolean | undefined  (optional)
settings.dialogs.invite.completion[kind="done"].kind: "done"
settings.dialogs.invite.completion[kind="done"].title*: string  (optional)
settings.dialogs.invite.completion[kind="done"].title[LabText].en: string
settings.dialogs.invite.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.invite.completion[kind="done"].detail*: string  (optional)
settings.dialogs.invite.completion[kind="done"].detail[LabText].en: string
settings.dialogs.invite.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.invite.completion[kind="close"].kind: "close"
settings.dialogs.invite.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.invite.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.merge.id: string
settings.dialogs.merge.title*: string
settings.dialogs.merge.title[LabText].en: string
settings.dialogs.merge.title[LabText].zh-CN: string
settings.dialogs.merge.subtitle*: string  (optional)
settings.dialogs.merge.subtitle[LabText].en: string
settings.dialogs.merge.subtitle[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="text"].key: string
settings.dialogs.merge.fields[][kind="text"].label*: string
settings.dialogs.merge.fields[][kind="text"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="text"].kind: "text"
settings.dialogs.merge.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.merge.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.merge.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="text"].value*: string  (optional)
settings.dialogs.merge.fields[][kind="text"].value[LabText].en: string
settings.dialogs.merge.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.merge.fields[][kind="area"].key: string
settings.dialogs.merge.fields[][kind="area"].label*: string
settings.dialogs.merge.fields[][kind="area"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="area"].kind: "area"
settings.dialogs.merge.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.merge.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.merge.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="area"].value*: string  (optional)
settings.dialogs.merge.fields[][kind="area"].value[LabText].en: string
settings.dialogs.merge.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.merge.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.merge.fields[][kind="segmented"].key: string
settings.dialogs.merge.fields[][kind="segmented"].label*: string
settings.dialogs.merge.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.merge.fields[][kind="segmented"].options[].id: string
settings.dialogs.merge.fields[][kind="segmented"].options[].label*: string
settings.dialogs.merge.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.merge.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.merge.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.merge.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.merge.fields[][kind="choice"].key: string
settings.dialogs.merge.fields[][kind="choice"].label*: string
settings.dialogs.merge.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="choice"].kind: "choice"
settings.dialogs.merge.fields[][kind="choice"].options[].id: string
settings.dialogs.merge.fields[][kind="choice"].options[].label*: string
settings.dialogs.merge.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.merge.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.merge.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.merge.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.merge.fields[][kind="multi"].key: string
settings.dialogs.merge.fields[][kind="multi"].label*: string
settings.dialogs.merge.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="multi"].kind: "multi"
settings.dialogs.merge.fields[][kind="multi"].options[].id: string
settings.dialogs.merge.fields[][kind="multi"].options[].label*: string
settings.dialogs.merge.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.merge.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.merge.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.merge.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="multi"].value[]: string
settings.dialogs.merge.fields[][kind="toggle"].key: string
settings.dialogs.merge.fields[][kind="toggle"].label*: string
settings.dialogs.merge.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.merge.fields[][kind="toggle"].onText*: string
settings.dialogs.merge.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.merge.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.merge.fields[][kind="info"].key: string
settings.dialogs.merge.fields[][kind="info"].label*: string
settings.dialogs.merge.fields[][kind="info"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="info"].kind: "info"
settings.dialogs.merge.fields[][kind="info"].text*: string
settings.dialogs.merge.fields[][kind="info"].text[LabText].en: string
settings.dialogs.merge.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.merge.fields[][kind="code"].key: string
settings.dialogs.merge.fields[][kind="code"].label*: string
settings.dialogs.merge.fields[][kind="code"].label[LabText].en: string
settings.dialogs.merge.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.merge.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.merge.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.merge.fields[][kind="code"].kind: "code"
settings.dialogs.merge.fields[][kind="code"].code: string
settings.dialogs.merge.warning.tone: "danger" | "neutral"
settings.dialogs.merge.warning.text*: string
settings.dialogs.merge.warning.text[LabText].en: string
settings.dialogs.merge.warning.text[LabText].zh-CN: string
settings.dialogs.merge.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.merge.confirmLabel*: string  (optional)
settings.dialogs.merge.confirmLabel[LabText].en: string
settings.dialogs.merge.confirmLabel[LabText].zh-CN: string
settings.dialogs.merge.hasCancel: boolean | undefined  (optional)
settings.dialogs.merge.completion[kind="done"].kind: "done"
settings.dialogs.merge.completion[kind="done"].title*: string  (optional)
settings.dialogs.merge.completion[kind="done"].title[LabText].en: string
settings.dialogs.merge.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.merge.completion[kind="done"].detail*: string  (optional)
settings.dialogs.merge.completion[kind="done"].detail[LabText].en: string
settings.dialogs.merge.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.merge.completion[kind="close"].kind: "close"
settings.dialogs.merge.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.merge.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.new_project.id: string
settings.dialogs.new_project.title*: string
settings.dialogs.new_project.title[LabText].en: string
settings.dialogs.new_project.title[LabText].zh-CN: string
settings.dialogs.new_project.subtitle*: string  (optional)
settings.dialogs.new_project.subtitle[LabText].en: string
settings.dialogs.new_project.subtitle[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="text"].key: string
settings.dialogs.new_project.fields[][kind="text"].label*: string
settings.dialogs.new_project.fields[][kind="text"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="text"].kind: "text"
settings.dialogs.new_project.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.new_project.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.new_project.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="text"].value*: string  (optional)
settings.dialogs.new_project.fields[][kind="text"].value[LabText].en: string
settings.dialogs.new_project.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.new_project.fields[][kind="area"].key: string
settings.dialogs.new_project.fields[][kind="area"].label*: string
settings.dialogs.new_project.fields[][kind="area"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="area"].kind: "area"
settings.dialogs.new_project.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.new_project.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.new_project.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="area"].value*: string  (optional)
settings.dialogs.new_project.fields[][kind="area"].value[LabText].en: string
settings.dialogs.new_project.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.new_project.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.new_project.fields[][kind="segmented"].key: string
settings.dialogs.new_project.fields[][kind="segmented"].label*: string
settings.dialogs.new_project.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.new_project.fields[][kind="segmented"].options[].id: string
settings.dialogs.new_project.fields[][kind="segmented"].options[].label*: string
settings.dialogs.new_project.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.new_project.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.new_project.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.new_project.fields[][kind="choice"].key: string
settings.dialogs.new_project.fields[][kind="choice"].label*: string
settings.dialogs.new_project.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="choice"].kind: "choice"
settings.dialogs.new_project.fields[][kind="choice"].options[].id: string
settings.dialogs.new_project.fields[][kind="choice"].options[].label*: string
settings.dialogs.new_project.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.new_project.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.new_project.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.new_project.fields[][kind="multi"].key: string
settings.dialogs.new_project.fields[][kind="multi"].label*: string
settings.dialogs.new_project.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="multi"].kind: "multi"
settings.dialogs.new_project.fields[][kind="multi"].options[].id: string
settings.dialogs.new_project.fields[][kind="multi"].options[].label*: string
settings.dialogs.new_project.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.new_project.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.new_project.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="multi"].value[]: string
settings.dialogs.new_project.fields[][kind="toggle"].key: string
settings.dialogs.new_project.fields[][kind="toggle"].label*: string
settings.dialogs.new_project.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.new_project.fields[][kind="toggle"].onText*: string
settings.dialogs.new_project.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.new_project.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.new_project.fields[][kind="info"].key: string
settings.dialogs.new_project.fields[][kind="info"].label*: string
settings.dialogs.new_project.fields[][kind="info"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="info"].kind: "info"
settings.dialogs.new_project.fields[][kind="info"].text*: string
settings.dialogs.new_project.fields[][kind="info"].text[LabText].en: string
settings.dialogs.new_project.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.new_project.fields[][kind="code"].key: string
settings.dialogs.new_project.fields[][kind="code"].label*: string
settings.dialogs.new_project.fields[][kind="code"].label[LabText].en: string
settings.dialogs.new_project.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.new_project.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.new_project.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.new_project.fields[][kind="code"].kind: "code"
settings.dialogs.new_project.fields[][kind="code"].code: string
settings.dialogs.new_project.warning.tone: "danger" | "neutral"
settings.dialogs.new_project.warning.text*: string
settings.dialogs.new_project.warning.text[LabText].en: string
settings.dialogs.new_project.warning.text[LabText].zh-CN: string
settings.dialogs.new_project.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.new_project.confirmLabel*: string  (optional)
settings.dialogs.new_project.confirmLabel[LabText].en: string
settings.dialogs.new_project.confirmLabel[LabText].zh-CN: string
settings.dialogs.new_project.hasCancel: boolean | undefined  (optional)
settings.dialogs.new_project.completion[kind="done"].kind: "done"
settings.dialogs.new_project.completion[kind="done"].title*: string  (optional)
settings.dialogs.new_project.completion[kind="done"].title[LabText].en: string
settings.dialogs.new_project.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.new_project.completion[kind="done"].detail*: string  (optional)
settings.dialogs.new_project.completion[kind="done"].detail[LabText].en: string
settings.dialogs.new_project.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.new_project.completion[kind="close"].kind: "close"
settings.dialogs.new_project.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.new_project.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.quota.id: string
settings.dialogs.quota.title*: string
settings.dialogs.quota.title[LabText].en: string
settings.dialogs.quota.title[LabText].zh-CN: string
settings.dialogs.quota.subtitle*: string  (optional)
settings.dialogs.quota.subtitle[LabText].en: string
settings.dialogs.quota.subtitle[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="text"].key: string
settings.dialogs.quota.fields[][kind="text"].label*: string
settings.dialogs.quota.fields[][kind="text"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="text"].kind: "text"
settings.dialogs.quota.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.quota.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.quota.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="text"].value*: string  (optional)
settings.dialogs.quota.fields[][kind="text"].value[LabText].en: string
settings.dialogs.quota.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.quota.fields[][kind="area"].key: string
settings.dialogs.quota.fields[][kind="area"].label*: string
settings.dialogs.quota.fields[][kind="area"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="area"].kind: "area"
settings.dialogs.quota.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.quota.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.quota.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="area"].value*: string  (optional)
settings.dialogs.quota.fields[][kind="area"].value[LabText].en: string
settings.dialogs.quota.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.quota.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.quota.fields[][kind="segmented"].key: string
settings.dialogs.quota.fields[][kind="segmented"].label*: string
settings.dialogs.quota.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.quota.fields[][kind="segmented"].options[].id: string
settings.dialogs.quota.fields[][kind="segmented"].options[].label*: string
settings.dialogs.quota.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.quota.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.quota.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.quota.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.quota.fields[][kind="choice"].key: string
settings.dialogs.quota.fields[][kind="choice"].label*: string
settings.dialogs.quota.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="choice"].kind: "choice"
settings.dialogs.quota.fields[][kind="choice"].options[].id: string
settings.dialogs.quota.fields[][kind="choice"].options[].label*: string
settings.dialogs.quota.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.quota.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.quota.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.quota.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.quota.fields[][kind="multi"].key: string
settings.dialogs.quota.fields[][kind="multi"].label*: string
settings.dialogs.quota.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="multi"].kind: "multi"
settings.dialogs.quota.fields[][kind="multi"].options[].id: string
settings.dialogs.quota.fields[][kind="multi"].options[].label*: string
settings.dialogs.quota.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.quota.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.quota.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.quota.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="multi"].value[]: string
settings.dialogs.quota.fields[][kind="toggle"].key: string
settings.dialogs.quota.fields[][kind="toggle"].label*: string
settings.dialogs.quota.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.quota.fields[][kind="toggle"].onText*: string
settings.dialogs.quota.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.quota.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.quota.fields[][kind="info"].key: string
settings.dialogs.quota.fields[][kind="info"].label*: string
settings.dialogs.quota.fields[][kind="info"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="info"].kind: "info"
settings.dialogs.quota.fields[][kind="info"].text*: string
settings.dialogs.quota.fields[][kind="info"].text[LabText].en: string
settings.dialogs.quota.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.quota.fields[][kind="code"].key: string
settings.dialogs.quota.fields[][kind="code"].label*: string
settings.dialogs.quota.fields[][kind="code"].label[LabText].en: string
settings.dialogs.quota.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.quota.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.quota.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.quota.fields[][kind="code"].kind: "code"
settings.dialogs.quota.fields[][kind="code"].code: string
settings.dialogs.quota.warning.tone: "danger" | "neutral"
settings.dialogs.quota.warning.text*: string
settings.dialogs.quota.warning.text[LabText].en: string
settings.dialogs.quota.warning.text[LabText].zh-CN: string
settings.dialogs.quota.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.quota.confirmLabel*: string  (optional)
settings.dialogs.quota.confirmLabel[LabText].en: string
settings.dialogs.quota.confirmLabel[LabText].zh-CN: string
settings.dialogs.quota.hasCancel: boolean | undefined  (optional)
settings.dialogs.quota.completion[kind="done"].kind: "done"
settings.dialogs.quota.completion[kind="done"].title*: string  (optional)
settings.dialogs.quota.completion[kind="done"].title[LabText].en: string
settings.dialogs.quota.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.quota.completion[kind="done"].detail*: string  (optional)
settings.dialogs.quota.completion[kind="done"].detail[LabText].en: string
settings.dialogs.quota.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.quota.completion[kind="close"].kind: "close"
settings.dialogs.quota.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.quota.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.remove.id: string
settings.dialogs.remove.title*: string
settings.dialogs.remove.title[LabText].en: string
settings.dialogs.remove.title[LabText].zh-CN: string
settings.dialogs.remove.subtitle*: string  (optional)
settings.dialogs.remove.subtitle[LabText].en: string
settings.dialogs.remove.subtitle[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="text"].key: string
settings.dialogs.remove.fields[][kind="text"].label*: string
settings.dialogs.remove.fields[][kind="text"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="text"].kind: "text"
settings.dialogs.remove.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.remove.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.remove.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="text"].value*: string  (optional)
settings.dialogs.remove.fields[][kind="text"].value[LabText].en: string
settings.dialogs.remove.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.remove.fields[][kind="area"].key: string
settings.dialogs.remove.fields[][kind="area"].label*: string
settings.dialogs.remove.fields[][kind="area"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="area"].kind: "area"
settings.dialogs.remove.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.remove.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.remove.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="area"].value*: string  (optional)
settings.dialogs.remove.fields[][kind="area"].value[LabText].en: string
settings.dialogs.remove.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.remove.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.remove.fields[][kind="segmented"].key: string
settings.dialogs.remove.fields[][kind="segmented"].label*: string
settings.dialogs.remove.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.remove.fields[][kind="segmented"].options[].id: string
settings.dialogs.remove.fields[][kind="segmented"].options[].label*: string
settings.dialogs.remove.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.remove.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.remove.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.remove.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.remove.fields[][kind="choice"].key: string
settings.dialogs.remove.fields[][kind="choice"].label*: string
settings.dialogs.remove.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="choice"].kind: "choice"
settings.dialogs.remove.fields[][kind="choice"].options[].id: string
settings.dialogs.remove.fields[][kind="choice"].options[].label*: string
settings.dialogs.remove.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.remove.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.remove.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.remove.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.remove.fields[][kind="multi"].key: string
settings.dialogs.remove.fields[][kind="multi"].label*: string
settings.dialogs.remove.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="multi"].kind: "multi"
settings.dialogs.remove.fields[][kind="multi"].options[].id: string
settings.dialogs.remove.fields[][kind="multi"].options[].label*: string
settings.dialogs.remove.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.remove.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.remove.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.remove.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="multi"].value[]: string
settings.dialogs.remove.fields[][kind="toggle"].key: string
settings.dialogs.remove.fields[][kind="toggle"].label*: string
settings.dialogs.remove.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.remove.fields[][kind="toggle"].onText*: string
settings.dialogs.remove.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.remove.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.remove.fields[][kind="info"].key: string
settings.dialogs.remove.fields[][kind="info"].label*: string
settings.dialogs.remove.fields[][kind="info"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="info"].kind: "info"
settings.dialogs.remove.fields[][kind="info"].text*: string
settings.dialogs.remove.fields[][kind="info"].text[LabText].en: string
settings.dialogs.remove.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.remove.fields[][kind="code"].key: string
settings.dialogs.remove.fields[][kind="code"].label*: string
settings.dialogs.remove.fields[][kind="code"].label[LabText].en: string
settings.dialogs.remove.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.remove.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.remove.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.remove.fields[][kind="code"].kind: "code"
settings.dialogs.remove.fields[][kind="code"].code: string
settings.dialogs.remove.warning.tone: "danger" | "neutral"
settings.dialogs.remove.warning.text*: string
settings.dialogs.remove.warning.text[LabText].en: string
settings.dialogs.remove.warning.text[LabText].zh-CN: string
settings.dialogs.remove.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.remove.confirmLabel*: string  (optional)
settings.dialogs.remove.confirmLabel[LabText].en: string
settings.dialogs.remove.confirmLabel[LabText].zh-CN: string
settings.dialogs.remove.hasCancel: boolean | undefined  (optional)
settings.dialogs.remove.completion[kind="done"].kind: "done"
settings.dialogs.remove.completion[kind="done"].title*: string  (optional)
settings.dialogs.remove.completion[kind="done"].title[LabText].en: string
settings.dialogs.remove.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.remove.completion[kind="done"].detail*: string  (optional)
settings.dialogs.remove.completion[kind="done"].detail[LabText].en: string
settings.dialogs.remove.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.remove.completion[kind="close"].kind: "close"
settings.dialogs.remove.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.remove.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.remove_file.id: string
settings.dialogs.remove_file.title*: string
settings.dialogs.remove_file.title[LabText].en: string
settings.dialogs.remove_file.title[LabText].zh-CN: string
settings.dialogs.remove_file.subtitle*: string  (optional)
settings.dialogs.remove_file.subtitle[LabText].en: string
settings.dialogs.remove_file.subtitle[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="text"].key: string
settings.dialogs.remove_file.fields[][kind="text"].label*: string
settings.dialogs.remove_file.fields[][kind="text"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="text"].kind: "text"
settings.dialogs.remove_file.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.remove_file.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.remove_file.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="text"].value*: string  (optional)
settings.dialogs.remove_file.fields[][kind="text"].value[LabText].en: string
settings.dialogs.remove_file.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="area"].key: string
settings.dialogs.remove_file.fields[][kind="area"].label*: string
settings.dialogs.remove_file.fields[][kind="area"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="area"].kind: "area"
settings.dialogs.remove_file.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.remove_file.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.remove_file.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="area"].value*: string  (optional)
settings.dialogs.remove_file.fields[][kind="area"].value[LabText].en: string
settings.dialogs.remove_file.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="segmented"].key: string
settings.dialogs.remove_file.fields[][kind="segmented"].label*: string
settings.dialogs.remove_file.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.remove_file.fields[][kind="segmented"].options[].id: string
settings.dialogs.remove_file.fields[][kind="segmented"].options[].label*: string
settings.dialogs.remove_file.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.remove_file.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.remove_file.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="choice"].key: string
settings.dialogs.remove_file.fields[][kind="choice"].label*: string
settings.dialogs.remove_file.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="choice"].kind: "choice"
settings.dialogs.remove_file.fields[][kind="choice"].options[].id: string
settings.dialogs.remove_file.fields[][kind="choice"].options[].label*: string
settings.dialogs.remove_file.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.remove_file.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.remove_file.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="multi"].key: string
settings.dialogs.remove_file.fields[][kind="multi"].label*: string
settings.dialogs.remove_file.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="multi"].kind: "multi"
settings.dialogs.remove_file.fields[][kind="multi"].options[].id: string
settings.dialogs.remove_file.fields[][kind="multi"].options[].label*: string
settings.dialogs.remove_file.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.remove_file.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.remove_file.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="multi"].value[]: string
settings.dialogs.remove_file.fields[][kind="toggle"].key: string
settings.dialogs.remove_file.fields[][kind="toggle"].label*: string
settings.dialogs.remove_file.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.remove_file.fields[][kind="toggle"].onText*: string
settings.dialogs.remove_file.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.remove_file.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="info"].key: string
settings.dialogs.remove_file.fields[][kind="info"].label*: string
settings.dialogs.remove_file.fields[][kind="info"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="info"].kind: "info"
settings.dialogs.remove_file.fields[][kind="info"].text*: string
settings.dialogs.remove_file.fields[][kind="info"].text[LabText].en: string
settings.dialogs.remove_file.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.remove_file.fields[][kind="code"].key: string
settings.dialogs.remove_file.fields[][kind="code"].label*: string
settings.dialogs.remove_file.fields[][kind="code"].label[LabText].en: string
settings.dialogs.remove_file.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.remove_file.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.remove_file.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.remove_file.fields[][kind="code"].kind: "code"
settings.dialogs.remove_file.fields[][kind="code"].code: string
settings.dialogs.remove_file.warning.tone: "danger" | "neutral"
settings.dialogs.remove_file.warning.text*: string
settings.dialogs.remove_file.warning.text[LabText].en: string
settings.dialogs.remove_file.warning.text[LabText].zh-CN: string
settings.dialogs.remove_file.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.remove_file.confirmLabel*: string  (optional)
settings.dialogs.remove_file.confirmLabel[LabText].en: string
settings.dialogs.remove_file.confirmLabel[LabText].zh-CN: string
settings.dialogs.remove_file.hasCancel: boolean | undefined  (optional)
settings.dialogs.remove_file.completion[kind="done"].kind: "done"
settings.dialogs.remove_file.completion[kind="done"].title*: string  (optional)
settings.dialogs.remove_file.completion[kind="done"].title[LabText].en: string
settings.dialogs.remove_file.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.remove_file.completion[kind="done"].detail*: string  (optional)
settings.dialogs.remove_file.completion[kind="done"].detail[LabText].en: string
settings.dialogs.remove_file.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.remove_file.completion[kind="close"].kind: "close"
settings.dialogs.remove_file.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.remove_file.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.rename.id: string
settings.dialogs.rename.title*: string
settings.dialogs.rename.title[LabText].en: string
settings.dialogs.rename.title[LabText].zh-CN: string
settings.dialogs.rename.subtitle*: string  (optional)
settings.dialogs.rename.subtitle[LabText].en: string
settings.dialogs.rename.subtitle[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="text"].key: string
settings.dialogs.rename.fields[][kind="text"].label*: string
settings.dialogs.rename.fields[][kind="text"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="text"].kind: "text"
settings.dialogs.rename.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.rename.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.rename.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="text"].value*: string  (optional)
settings.dialogs.rename.fields[][kind="text"].value[LabText].en: string
settings.dialogs.rename.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.rename.fields[][kind="area"].key: string
settings.dialogs.rename.fields[][kind="area"].label*: string
settings.dialogs.rename.fields[][kind="area"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="area"].kind: "area"
settings.dialogs.rename.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.rename.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.rename.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="area"].value*: string  (optional)
settings.dialogs.rename.fields[][kind="area"].value[LabText].en: string
settings.dialogs.rename.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.rename.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.rename.fields[][kind="segmented"].key: string
settings.dialogs.rename.fields[][kind="segmented"].label*: string
settings.dialogs.rename.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.rename.fields[][kind="segmented"].options[].id: string
settings.dialogs.rename.fields[][kind="segmented"].options[].label*: string
settings.dialogs.rename.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.rename.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.rename.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.rename.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.rename.fields[][kind="choice"].key: string
settings.dialogs.rename.fields[][kind="choice"].label*: string
settings.dialogs.rename.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="choice"].kind: "choice"
settings.dialogs.rename.fields[][kind="choice"].options[].id: string
settings.dialogs.rename.fields[][kind="choice"].options[].label*: string
settings.dialogs.rename.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.rename.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.rename.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.rename.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.rename.fields[][kind="multi"].key: string
settings.dialogs.rename.fields[][kind="multi"].label*: string
settings.dialogs.rename.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="multi"].kind: "multi"
settings.dialogs.rename.fields[][kind="multi"].options[].id: string
settings.dialogs.rename.fields[][kind="multi"].options[].label*: string
settings.dialogs.rename.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.rename.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.rename.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.rename.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="multi"].value[]: string
settings.dialogs.rename.fields[][kind="toggle"].key: string
settings.dialogs.rename.fields[][kind="toggle"].label*: string
settings.dialogs.rename.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.rename.fields[][kind="toggle"].onText*: string
settings.dialogs.rename.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.rename.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.rename.fields[][kind="info"].key: string
settings.dialogs.rename.fields[][kind="info"].label*: string
settings.dialogs.rename.fields[][kind="info"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="info"].kind: "info"
settings.dialogs.rename.fields[][kind="info"].text*: string
settings.dialogs.rename.fields[][kind="info"].text[LabText].en: string
settings.dialogs.rename.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.rename.fields[][kind="code"].key: string
settings.dialogs.rename.fields[][kind="code"].label*: string
settings.dialogs.rename.fields[][kind="code"].label[LabText].en: string
settings.dialogs.rename.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.rename.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.rename.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.rename.fields[][kind="code"].kind: "code"
settings.dialogs.rename.fields[][kind="code"].code: string
settings.dialogs.rename.warning.tone: "danger" | "neutral"
settings.dialogs.rename.warning.text*: string
settings.dialogs.rename.warning.text[LabText].en: string
settings.dialogs.rename.warning.text[LabText].zh-CN: string
settings.dialogs.rename.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.rename.confirmLabel*: string  (optional)
settings.dialogs.rename.confirmLabel[LabText].en: string
settings.dialogs.rename.confirmLabel[LabText].zh-CN: string
settings.dialogs.rename.hasCancel: boolean | undefined  (optional)
settings.dialogs.rename.completion[kind="done"].kind: "done"
settings.dialogs.rename.completion[kind="done"].title*: string  (optional)
settings.dialogs.rename.completion[kind="done"].title[LabText].en: string
settings.dialogs.rename.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.rename.completion[kind="done"].detail*: string  (optional)
settings.dialogs.rename.completion[kind="done"].detail[LabText].en: string
settings.dialogs.rename.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.rename.completion[kind="close"].kind: "close"
settings.dialogs.rename.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.rename.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.resend.id: string
settings.dialogs.resend.title*: string
settings.dialogs.resend.title[LabText].en: string
settings.dialogs.resend.title[LabText].zh-CN: string
settings.dialogs.resend.subtitle*: string  (optional)
settings.dialogs.resend.subtitle[LabText].en: string
settings.dialogs.resend.subtitle[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="text"].key: string
settings.dialogs.resend.fields[][kind="text"].label*: string
settings.dialogs.resend.fields[][kind="text"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="text"].kind: "text"
settings.dialogs.resend.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.resend.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.resend.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="text"].value*: string  (optional)
settings.dialogs.resend.fields[][kind="text"].value[LabText].en: string
settings.dialogs.resend.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.resend.fields[][kind="area"].key: string
settings.dialogs.resend.fields[][kind="area"].label*: string
settings.dialogs.resend.fields[][kind="area"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="area"].kind: "area"
settings.dialogs.resend.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.resend.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.resend.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="area"].value*: string  (optional)
settings.dialogs.resend.fields[][kind="area"].value[LabText].en: string
settings.dialogs.resend.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.resend.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.resend.fields[][kind="segmented"].key: string
settings.dialogs.resend.fields[][kind="segmented"].label*: string
settings.dialogs.resend.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.resend.fields[][kind="segmented"].options[].id: string
settings.dialogs.resend.fields[][kind="segmented"].options[].label*: string
settings.dialogs.resend.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.resend.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.resend.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.resend.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.resend.fields[][kind="choice"].key: string
settings.dialogs.resend.fields[][kind="choice"].label*: string
settings.dialogs.resend.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="choice"].kind: "choice"
settings.dialogs.resend.fields[][kind="choice"].options[].id: string
settings.dialogs.resend.fields[][kind="choice"].options[].label*: string
settings.dialogs.resend.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.resend.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.resend.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.resend.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.resend.fields[][kind="multi"].key: string
settings.dialogs.resend.fields[][kind="multi"].label*: string
settings.dialogs.resend.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="multi"].kind: "multi"
settings.dialogs.resend.fields[][kind="multi"].options[].id: string
settings.dialogs.resend.fields[][kind="multi"].options[].label*: string
settings.dialogs.resend.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.resend.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.resend.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.resend.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="multi"].value[]: string
settings.dialogs.resend.fields[][kind="toggle"].key: string
settings.dialogs.resend.fields[][kind="toggle"].label*: string
settings.dialogs.resend.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.resend.fields[][kind="toggle"].onText*: string
settings.dialogs.resend.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.resend.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.resend.fields[][kind="info"].key: string
settings.dialogs.resend.fields[][kind="info"].label*: string
settings.dialogs.resend.fields[][kind="info"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="info"].kind: "info"
settings.dialogs.resend.fields[][kind="info"].text*: string
settings.dialogs.resend.fields[][kind="info"].text[LabText].en: string
settings.dialogs.resend.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.resend.fields[][kind="code"].key: string
settings.dialogs.resend.fields[][kind="code"].label*: string
settings.dialogs.resend.fields[][kind="code"].label[LabText].en: string
settings.dialogs.resend.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.resend.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.resend.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.resend.fields[][kind="code"].kind: "code"
settings.dialogs.resend.fields[][kind="code"].code: string
settings.dialogs.resend.warning.tone: "danger" | "neutral"
settings.dialogs.resend.warning.text*: string
settings.dialogs.resend.warning.text[LabText].en: string
settings.dialogs.resend.warning.text[LabText].zh-CN: string
settings.dialogs.resend.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.resend.confirmLabel*: string  (optional)
settings.dialogs.resend.confirmLabel[LabText].en: string
settings.dialogs.resend.confirmLabel[LabText].zh-CN: string
settings.dialogs.resend.hasCancel: boolean | undefined  (optional)
settings.dialogs.resend.completion[kind="done"].kind: "done"
settings.dialogs.resend.completion[kind="done"].title*: string  (optional)
settings.dialogs.resend.completion[kind="done"].title[LabText].en: string
settings.dialogs.resend.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.resend.completion[kind="done"].detail*: string  (optional)
settings.dialogs.resend.completion[kind="done"].detail[LabText].en: string
settings.dialogs.resend.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.resend.completion[kind="close"].kind: "close"
settings.dialogs.resend.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.resend.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.role.id: string
settings.dialogs.role.title*: string
settings.dialogs.role.title[LabText].en: string
settings.dialogs.role.title[LabText].zh-CN: string
settings.dialogs.role.subtitle*: string  (optional)
settings.dialogs.role.subtitle[LabText].en: string
settings.dialogs.role.subtitle[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="text"].key: string
settings.dialogs.role.fields[][kind="text"].label*: string
settings.dialogs.role.fields[][kind="text"].label[LabText].en: string
settings.dialogs.role.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="text"].kind: "text"
settings.dialogs.role.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.role.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.role.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="text"].value*: string  (optional)
settings.dialogs.role.fields[][kind="text"].value[LabText].en: string
settings.dialogs.role.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.role.fields[][kind="area"].key: string
settings.dialogs.role.fields[][kind="area"].label*: string
settings.dialogs.role.fields[][kind="area"].label[LabText].en: string
settings.dialogs.role.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="area"].kind: "area"
settings.dialogs.role.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.role.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.role.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="area"].value*: string  (optional)
settings.dialogs.role.fields[][kind="area"].value[LabText].en: string
settings.dialogs.role.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.role.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.role.fields[][kind="segmented"].key: string
settings.dialogs.role.fields[][kind="segmented"].label*: string
settings.dialogs.role.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.role.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.role.fields[][kind="segmented"].options[].id: string
settings.dialogs.role.fields[][kind="segmented"].options[].label*: string
settings.dialogs.role.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.role.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.role.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.role.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.role.fields[][kind="choice"].key: string
settings.dialogs.role.fields[][kind="choice"].label*: string
settings.dialogs.role.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.role.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="choice"].kind: "choice"
settings.dialogs.role.fields[][kind="choice"].options[].id: string
settings.dialogs.role.fields[][kind="choice"].options[].label*: string
settings.dialogs.role.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.role.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.role.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.role.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.role.fields[][kind="multi"].key: string
settings.dialogs.role.fields[][kind="multi"].label*: string
settings.dialogs.role.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.role.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="multi"].kind: "multi"
settings.dialogs.role.fields[][kind="multi"].options[].id: string
settings.dialogs.role.fields[][kind="multi"].options[].label*: string
settings.dialogs.role.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.role.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.role.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.role.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="multi"].value[]: string
settings.dialogs.role.fields[][kind="toggle"].key: string
settings.dialogs.role.fields[][kind="toggle"].label*: string
settings.dialogs.role.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.role.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.role.fields[][kind="toggle"].onText*: string
settings.dialogs.role.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.role.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.role.fields[][kind="info"].key: string
settings.dialogs.role.fields[][kind="info"].label*: string
settings.dialogs.role.fields[][kind="info"].label[LabText].en: string
settings.dialogs.role.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="info"].kind: "info"
settings.dialogs.role.fields[][kind="info"].text*: string
settings.dialogs.role.fields[][kind="info"].text[LabText].en: string
settings.dialogs.role.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.role.fields[][kind="code"].key: string
settings.dialogs.role.fields[][kind="code"].label*: string
settings.dialogs.role.fields[][kind="code"].label[LabText].en: string
settings.dialogs.role.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.role.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.role.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.role.fields[][kind="code"].kind: "code"
settings.dialogs.role.fields[][kind="code"].code: string
settings.dialogs.role.warning.tone: "danger" | "neutral"
settings.dialogs.role.warning.text*: string
settings.dialogs.role.warning.text[LabText].en: string
settings.dialogs.role.warning.text[LabText].zh-CN: string
settings.dialogs.role.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.role.confirmLabel*: string  (optional)
settings.dialogs.role.confirmLabel[LabText].en: string
settings.dialogs.role.confirmLabel[LabText].zh-CN: string
settings.dialogs.role.hasCancel: boolean | undefined  (optional)
settings.dialogs.role.completion[kind="done"].kind: "done"
settings.dialogs.role.completion[kind="done"].title*: string  (optional)
settings.dialogs.role.completion[kind="done"].title[LabText].en: string
settings.dialogs.role.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.role.completion[kind="done"].detail*: string  (optional)
settings.dialogs.role.completion[kind="done"].detail[LabText].en: string
settings.dialogs.role.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.role.completion[kind="close"].kind: "close"
settings.dialogs.role.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.role.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.rotate.id: string
settings.dialogs.rotate.title*: string
settings.dialogs.rotate.title[LabText].en: string
settings.dialogs.rotate.title[LabText].zh-CN: string
settings.dialogs.rotate.subtitle*: string  (optional)
settings.dialogs.rotate.subtitle[LabText].en: string
settings.dialogs.rotate.subtitle[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="text"].key: string
settings.dialogs.rotate.fields[][kind="text"].label*: string
settings.dialogs.rotate.fields[][kind="text"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="text"].kind: "text"
settings.dialogs.rotate.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.rotate.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.rotate.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="text"].value*: string  (optional)
settings.dialogs.rotate.fields[][kind="text"].value[LabText].en: string
settings.dialogs.rotate.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.rotate.fields[][kind="area"].key: string
settings.dialogs.rotate.fields[][kind="area"].label*: string
settings.dialogs.rotate.fields[][kind="area"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="area"].kind: "area"
settings.dialogs.rotate.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.rotate.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.rotate.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="area"].value*: string  (optional)
settings.dialogs.rotate.fields[][kind="area"].value[LabText].en: string
settings.dialogs.rotate.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.rotate.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.rotate.fields[][kind="segmented"].key: string
settings.dialogs.rotate.fields[][kind="segmented"].label*: string
settings.dialogs.rotate.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.rotate.fields[][kind="segmented"].options[].id: string
settings.dialogs.rotate.fields[][kind="segmented"].options[].label*: string
settings.dialogs.rotate.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.rotate.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.rotate.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.rotate.fields[][kind="choice"].key: string
settings.dialogs.rotate.fields[][kind="choice"].label*: string
settings.dialogs.rotate.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="choice"].kind: "choice"
settings.dialogs.rotate.fields[][kind="choice"].options[].id: string
settings.dialogs.rotate.fields[][kind="choice"].options[].label*: string
settings.dialogs.rotate.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.rotate.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.rotate.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.rotate.fields[][kind="multi"].key: string
settings.dialogs.rotate.fields[][kind="multi"].label*: string
settings.dialogs.rotate.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="multi"].kind: "multi"
settings.dialogs.rotate.fields[][kind="multi"].options[].id: string
settings.dialogs.rotate.fields[][kind="multi"].options[].label*: string
settings.dialogs.rotate.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.rotate.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.rotate.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="multi"].value[]: string
settings.dialogs.rotate.fields[][kind="toggle"].key: string
settings.dialogs.rotate.fields[][kind="toggle"].label*: string
settings.dialogs.rotate.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.rotate.fields[][kind="toggle"].onText*: string
settings.dialogs.rotate.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.rotate.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.rotate.fields[][kind="info"].key: string
settings.dialogs.rotate.fields[][kind="info"].label*: string
settings.dialogs.rotate.fields[][kind="info"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="info"].kind: "info"
settings.dialogs.rotate.fields[][kind="info"].text*: string
settings.dialogs.rotate.fields[][kind="info"].text[LabText].en: string
settings.dialogs.rotate.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.rotate.fields[][kind="code"].key: string
settings.dialogs.rotate.fields[][kind="code"].label*: string
settings.dialogs.rotate.fields[][kind="code"].label[LabText].en: string
settings.dialogs.rotate.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.rotate.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.rotate.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.rotate.fields[][kind="code"].kind: "code"
settings.dialogs.rotate.fields[][kind="code"].code: string
settings.dialogs.rotate.warning.tone: "danger" | "neutral"
settings.dialogs.rotate.warning.text*: string
settings.dialogs.rotate.warning.text[LabText].en: string
settings.dialogs.rotate.warning.text[LabText].zh-CN: string
settings.dialogs.rotate.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.rotate.confirmLabel*: string  (optional)
settings.dialogs.rotate.confirmLabel[LabText].en: string
settings.dialogs.rotate.confirmLabel[LabText].zh-CN: string
settings.dialogs.rotate.hasCancel: boolean | undefined  (optional)
settings.dialogs.rotate.completion[kind="done"].kind: "done"
settings.dialogs.rotate.completion[kind="done"].title*: string  (optional)
settings.dialogs.rotate.completion[kind="done"].title[LabText].en: string
settings.dialogs.rotate.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.rotate.completion[kind="done"].detail*: string  (optional)
settings.dialogs.rotate.completion[kind="done"].detail[LabText].en: string
settings.dialogs.rotate.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.rotate.completion[kind="close"].kind: "close"
settings.dialogs.rotate.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.rotate.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.save_version.id: string
settings.dialogs.save_version.title*: string
settings.dialogs.save_version.title[LabText].en: string
settings.dialogs.save_version.title[LabText].zh-CN: string
settings.dialogs.save_version.subtitle*: string  (optional)
settings.dialogs.save_version.subtitle[LabText].en: string
settings.dialogs.save_version.subtitle[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="text"].key: string
settings.dialogs.save_version.fields[][kind="text"].label*: string
settings.dialogs.save_version.fields[][kind="text"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="text"].kind: "text"
settings.dialogs.save_version.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.save_version.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.save_version.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="text"].value*: string  (optional)
settings.dialogs.save_version.fields[][kind="text"].value[LabText].en: string
settings.dialogs.save_version.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.save_version.fields[][kind="area"].key: string
settings.dialogs.save_version.fields[][kind="area"].label*: string
settings.dialogs.save_version.fields[][kind="area"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="area"].kind: "area"
settings.dialogs.save_version.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.save_version.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.save_version.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="area"].value*: string  (optional)
settings.dialogs.save_version.fields[][kind="area"].value[LabText].en: string
settings.dialogs.save_version.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.save_version.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.save_version.fields[][kind="segmented"].key: string
settings.dialogs.save_version.fields[][kind="segmented"].label*: string
settings.dialogs.save_version.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.save_version.fields[][kind="segmented"].options[].id: string
settings.dialogs.save_version.fields[][kind="segmented"].options[].label*: string
settings.dialogs.save_version.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.save_version.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.save_version.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.save_version.fields[][kind="choice"].key: string
settings.dialogs.save_version.fields[][kind="choice"].label*: string
settings.dialogs.save_version.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="choice"].kind: "choice"
settings.dialogs.save_version.fields[][kind="choice"].options[].id: string
settings.dialogs.save_version.fields[][kind="choice"].options[].label*: string
settings.dialogs.save_version.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.save_version.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.save_version.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.save_version.fields[][kind="multi"].key: string
settings.dialogs.save_version.fields[][kind="multi"].label*: string
settings.dialogs.save_version.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="multi"].kind: "multi"
settings.dialogs.save_version.fields[][kind="multi"].options[].id: string
settings.dialogs.save_version.fields[][kind="multi"].options[].label*: string
settings.dialogs.save_version.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.save_version.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.save_version.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="multi"].value[]: string
settings.dialogs.save_version.fields[][kind="toggle"].key: string
settings.dialogs.save_version.fields[][kind="toggle"].label*: string
settings.dialogs.save_version.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.save_version.fields[][kind="toggle"].onText*: string
settings.dialogs.save_version.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.save_version.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.save_version.fields[][kind="info"].key: string
settings.dialogs.save_version.fields[][kind="info"].label*: string
settings.dialogs.save_version.fields[][kind="info"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="info"].kind: "info"
settings.dialogs.save_version.fields[][kind="info"].text*: string
settings.dialogs.save_version.fields[][kind="info"].text[LabText].en: string
settings.dialogs.save_version.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.save_version.fields[][kind="code"].key: string
settings.dialogs.save_version.fields[][kind="code"].label*: string
settings.dialogs.save_version.fields[][kind="code"].label[LabText].en: string
settings.dialogs.save_version.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.save_version.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.save_version.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.save_version.fields[][kind="code"].kind: "code"
settings.dialogs.save_version.fields[][kind="code"].code: string
settings.dialogs.save_version.warning.tone: "danger" | "neutral"
settings.dialogs.save_version.warning.text*: string
settings.dialogs.save_version.warning.text[LabText].en: string
settings.dialogs.save_version.warning.text[LabText].zh-CN: string
settings.dialogs.save_version.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.save_version.confirmLabel*: string  (optional)
settings.dialogs.save_version.confirmLabel[LabText].en: string
settings.dialogs.save_version.confirmLabel[LabText].zh-CN: string
settings.dialogs.save_version.hasCancel: boolean | undefined  (optional)
settings.dialogs.save_version.completion[kind="done"].kind: "done"
settings.dialogs.save_version.completion[kind="done"].title*: string  (optional)
settings.dialogs.save_version.completion[kind="done"].title[LabText].en: string
settings.dialogs.save_version.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.save_version.completion[kind="done"].detail*: string  (optional)
settings.dialogs.save_version.completion[kind="done"].detail[LabText].en: string
settings.dialogs.save_version.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.save_version.completion[kind="close"].kind: "close"
settings.dialogs.save_version.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.save_version.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.suggest.id: string
settings.dialogs.suggest.title*: string
settings.dialogs.suggest.title[LabText].en: string
settings.dialogs.suggest.title[LabText].zh-CN: string
settings.dialogs.suggest.subtitle*: string  (optional)
settings.dialogs.suggest.subtitle[LabText].en: string
settings.dialogs.suggest.subtitle[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="text"].key: string
settings.dialogs.suggest.fields[][kind="text"].label*: string
settings.dialogs.suggest.fields[][kind="text"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="text"].kind: "text"
settings.dialogs.suggest.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.suggest.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.suggest.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="text"].value*: string  (optional)
settings.dialogs.suggest.fields[][kind="text"].value[LabText].en: string
settings.dialogs.suggest.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.suggest.fields[][kind="area"].key: string
settings.dialogs.suggest.fields[][kind="area"].label*: string
settings.dialogs.suggest.fields[][kind="area"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="area"].kind: "area"
settings.dialogs.suggest.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.suggest.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.suggest.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="area"].value*: string  (optional)
settings.dialogs.suggest.fields[][kind="area"].value[LabText].en: string
settings.dialogs.suggest.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.suggest.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.suggest.fields[][kind="segmented"].key: string
settings.dialogs.suggest.fields[][kind="segmented"].label*: string
settings.dialogs.suggest.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.suggest.fields[][kind="segmented"].options[].id: string
settings.dialogs.suggest.fields[][kind="segmented"].options[].label*: string
settings.dialogs.suggest.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.suggest.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.suggest.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.suggest.fields[][kind="choice"].key: string
settings.dialogs.suggest.fields[][kind="choice"].label*: string
settings.dialogs.suggest.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="choice"].kind: "choice"
settings.dialogs.suggest.fields[][kind="choice"].options[].id: string
settings.dialogs.suggest.fields[][kind="choice"].options[].label*: string
settings.dialogs.suggest.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.suggest.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.suggest.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.suggest.fields[][kind="multi"].key: string
settings.dialogs.suggest.fields[][kind="multi"].label*: string
settings.dialogs.suggest.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="multi"].kind: "multi"
settings.dialogs.suggest.fields[][kind="multi"].options[].id: string
settings.dialogs.suggest.fields[][kind="multi"].options[].label*: string
settings.dialogs.suggest.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.suggest.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.suggest.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="multi"].value[]: string
settings.dialogs.suggest.fields[][kind="toggle"].key: string
settings.dialogs.suggest.fields[][kind="toggle"].label*: string
settings.dialogs.suggest.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.suggest.fields[][kind="toggle"].onText*: string
settings.dialogs.suggest.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.suggest.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.suggest.fields[][kind="info"].key: string
settings.dialogs.suggest.fields[][kind="info"].label*: string
settings.dialogs.suggest.fields[][kind="info"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="info"].kind: "info"
settings.dialogs.suggest.fields[][kind="info"].text*: string
settings.dialogs.suggest.fields[][kind="info"].text[LabText].en: string
settings.dialogs.suggest.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.suggest.fields[][kind="code"].key: string
settings.dialogs.suggest.fields[][kind="code"].label*: string
settings.dialogs.suggest.fields[][kind="code"].label[LabText].en: string
settings.dialogs.suggest.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.suggest.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.suggest.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.suggest.fields[][kind="code"].kind: "code"
settings.dialogs.suggest.fields[][kind="code"].code: string
settings.dialogs.suggest.warning.tone: "danger" | "neutral"
settings.dialogs.suggest.warning.text*: string
settings.dialogs.suggest.warning.text[LabText].en: string
settings.dialogs.suggest.warning.text[LabText].zh-CN: string
settings.dialogs.suggest.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.suggest.confirmLabel*: string  (optional)
settings.dialogs.suggest.confirmLabel[LabText].en: string
settings.dialogs.suggest.confirmLabel[LabText].zh-CN: string
settings.dialogs.suggest.hasCancel: boolean | undefined  (optional)
settings.dialogs.suggest.completion[kind="done"].kind: "done"
settings.dialogs.suggest.completion[kind="done"].title*: string  (optional)
settings.dialogs.suggest.completion[kind="done"].title[LabText].en: string
settings.dialogs.suggest.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.suggest.completion[kind="done"].detail*: string  (optional)
settings.dialogs.suggest.completion[kind="done"].detail[LabText].en: string
settings.dialogs.suggest.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.suggest.completion[kind="close"].kind: "close"
settings.dialogs.suggest.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.suggest.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogs.sync.id: string
settings.dialogs.sync.title*: string
settings.dialogs.sync.title[LabText].en: string
settings.dialogs.sync.title[LabText].zh-CN: string
settings.dialogs.sync.subtitle*: string  (optional)
settings.dialogs.sync.subtitle[LabText].en: string
settings.dialogs.sync.subtitle[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="text"].key: string
settings.dialogs.sync.fields[][kind="text"].label*: string
settings.dialogs.sync.fields[][kind="text"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="text"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="text"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="text"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="text"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="text"].kind: "text"
settings.dialogs.sync.fields[][kind="text"].placeholder*: string  (optional)
settings.dialogs.sync.fields[][kind="text"].placeholder[LabText].en: string
settings.dialogs.sync.fields[][kind="text"].placeholder[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="text"].value*: string  (optional)
settings.dialogs.sync.fields[][kind="text"].value[LabText].en: string
settings.dialogs.sync.fields[][kind="text"].value[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="text"].mono: boolean | undefined  (optional)
settings.dialogs.sync.fields[][kind="area"].key: string
settings.dialogs.sync.fields[][kind="area"].label*: string
settings.dialogs.sync.fields[][kind="area"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="area"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="area"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="area"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="area"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="area"].kind: "area"
settings.dialogs.sync.fields[][kind="area"].placeholder*: string  (optional)
settings.dialogs.sync.fields[][kind="area"].placeholder[LabText].en: string
settings.dialogs.sync.fields[][kind="area"].placeholder[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="area"].value*: string  (optional)
settings.dialogs.sync.fields[][kind="area"].value[LabText].en: string
settings.dialogs.sync.fields[][kind="area"].value[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="area"].mono: boolean | undefined  (optional)
settings.dialogs.sync.fields[][kind="area"].rows: number | undefined  (optional)
settings.dialogs.sync.fields[][kind="segmented"].key: string
settings.dialogs.sync.fields[][kind="segmented"].label*: string
settings.dialogs.sync.fields[][kind="segmented"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="segmented"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="segmented"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="segmented"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="segmented"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="segmented"].kind: "segmented"
settings.dialogs.sync.fields[][kind="segmented"].options[].id: string
settings.dialogs.sync.fields[][kind="segmented"].options[].label*: string
settings.dialogs.sync.fields[][kind="segmented"].options[].label[LabText].en: string
settings.dialogs.sync.fields[][kind="segmented"].options[].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="segmented"].options[].meta*: string  (optional)
settings.dialogs.sync.fields[][kind="segmented"].options[].meta[LabText].en: string
settings.dialogs.sync.fields[][kind="segmented"].options[].meta[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="segmented"].value: string | undefined  (optional)
settings.dialogs.sync.fields[][kind="choice"].key: string
settings.dialogs.sync.fields[][kind="choice"].label*: string
settings.dialogs.sync.fields[][kind="choice"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="choice"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="choice"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="choice"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="choice"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="choice"].kind: "choice"
settings.dialogs.sync.fields[][kind="choice"].options[].id: string
settings.dialogs.sync.fields[][kind="choice"].options[].label*: string
settings.dialogs.sync.fields[][kind="choice"].options[].label[LabText].en: string
settings.dialogs.sync.fields[][kind="choice"].options[].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="choice"].options[].meta*: string  (optional)
settings.dialogs.sync.fields[][kind="choice"].options[].meta[LabText].en: string
settings.dialogs.sync.fields[][kind="choice"].options[].meta[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="choice"].value: string | undefined  (optional)
settings.dialogs.sync.fields[][kind="multi"].key: string
settings.dialogs.sync.fields[][kind="multi"].label*: string
settings.dialogs.sync.fields[][kind="multi"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="multi"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="multi"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="multi"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="multi"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="multi"].kind: "multi"
settings.dialogs.sync.fields[][kind="multi"].options[].id: string
settings.dialogs.sync.fields[][kind="multi"].options[].label*: string
settings.dialogs.sync.fields[][kind="multi"].options[].label[LabText].en: string
settings.dialogs.sync.fields[][kind="multi"].options[].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="multi"].options[].meta*: string  (optional)
settings.dialogs.sync.fields[][kind="multi"].options[].meta[LabText].en: string
settings.dialogs.sync.fields[][kind="multi"].options[].meta[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="multi"].value[]: string
settings.dialogs.sync.fields[][kind="toggle"].key: string
settings.dialogs.sync.fields[][kind="toggle"].label*: string
settings.dialogs.sync.fields[][kind="toggle"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="toggle"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="toggle"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="toggle"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="toggle"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="toggle"].kind: "toggle"
settings.dialogs.sync.fields[][kind="toggle"].onText*: string
settings.dialogs.sync.fields[][kind="toggle"].onText[LabText].en: string
settings.dialogs.sync.fields[][kind="toggle"].onText[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="toggle"].value: boolean | undefined  (optional)
settings.dialogs.sync.fields[][kind="info"].key: string
settings.dialogs.sync.fields[][kind="info"].label*: string
settings.dialogs.sync.fields[][kind="info"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="info"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="info"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="info"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="info"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="info"].kind: "info"
settings.dialogs.sync.fields[][kind="info"].text*: string
settings.dialogs.sync.fields[][kind="info"].text[LabText].en: string
settings.dialogs.sync.fields[][kind="info"].text[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="info"].mono: boolean | undefined  (optional)
settings.dialogs.sync.fields[][kind="code"].key: string
settings.dialogs.sync.fields[][kind="code"].label*: string
settings.dialogs.sync.fields[][kind="code"].label[LabText].en: string
settings.dialogs.sync.fields[][kind="code"].label[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="code"].hint*: string  (optional)
settings.dialogs.sync.fields[][kind="code"].hint[LabText].en: string
settings.dialogs.sync.fields[][kind="code"].hint[LabText].zh-CN: string
settings.dialogs.sync.fields[][kind="code"].kind: "code"
settings.dialogs.sync.fields[][kind="code"].code: string
settings.dialogs.sync.warning.tone: "danger" | "neutral"
settings.dialogs.sync.warning.text*: string
settings.dialogs.sync.warning.text[LabText].en: string
settings.dialogs.sync.warning.text[LabText].zh-CN: string
settings.dialogs.sync.tone: "danger" | "default" | undefined  (optional)
settings.dialogs.sync.confirmLabel*: string  (optional)
settings.dialogs.sync.confirmLabel[LabText].en: string
settings.dialogs.sync.confirmLabel[LabText].zh-CN: string
settings.dialogs.sync.hasCancel: boolean | undefined  (optional)
settings.dialogs.sync.completion[kind="done"].kind: "done"
settings.dialogs.sync.completion[kind="done"].title*: string  (optional)
settings.dialogs.sync.completion[kind="done"].title[LabText].en: string
settings.dialogs.sync.completion[kind="done"].title[LabText].zh-CN: string
settings.dialogs.sync.completion[kind="done"].detail*: string  (optional)
settings.dialogs.sync.completion[kind="done"].detail[LabText].en: string
settings.dialogs.sync.completion[kind="done"].detail[LabText].zh-CN: string
settings.dialogs.sync.completion[kind="close"].kind: "close"
settings.dialogs.sync.size: "lg" | "md" | "xl" | undefined  (optional)
settings.dialogs.sync.labelColumn: "aligned" | "none" | undefined  (optional)
settings.dialogSelection.initialName: string
settings.dialogSelection.titleNameDialogIds[]: SettingsDialogId
settings.dialogSelection.renameValue: "selected_name_without_hash"
settings.dialogSelection.duplicateValue: "selected_name_copy"
settings.dialogSelection.mergeOptions: "exclude_selected_project"
settings.members[].memberId: string
settings.members[].email: string
settings.members[].description*: string | null  (nullable)
settings.members[].description[LabText].en: string  (nullable parent)
settings.members[].description[LabText].zh-CN: string  (nullable parent)
settings.members[].role: MemberRole
settings.members[].displayName*: string  // This page's prototype uses display names distinct from the shared member catalog.
settings.members[].displayName[LabText].en: string
settings.members[].displayName[LabText].zh-CN: string
settings.members[].mainProjectId: string
settings.members[].focusSummary[]*: string
settings.members[].focusSummary[][LabText].en: string
settings.members[].focusSummary[][LabText].zh-CN: string
settings.members[].gpuHours.used: number | null  (nullable)
settings.members[].gpuHours.quota[kind="unlimited"].kind: "unlimited"
settings.members[].gpuHours.quota[kind="limited"].kind: "limited"
settings.members[].gpuHours.quota[kind="limited"].hours: number
settings.members[].lastActive*: string | null  (nullable)
settings.members[].lastActive[LabText].en: string  (nullable parent)
settings.members[].lastActive[LabText].zh-CN: string  (nullable parent)
settings.members[].presence: "offline" | "online" | null  (nullable)
settings.members[].canApprove*: string | null  (nullable)
settings.members[].canApprove[LabText].en: string  (nullable parent)
settings.members[].canApprove[LabText].zh-CN: string  (nullable parent)
settings.members[].permissions.startWithoutApproval: boolean  (nullable parent)
settings.members[].permissions.buildImages: boolean  (nullable parent)
settings.members[].permissions.manageMembers: boolean  (nullable parent)
settings.members[].details[][kind="project_label"].kind: "project_label"
settings.members[].details[][kind="project_label"].createdById: string
settings.members[].details[][kind="project_label"].focusedByCount: number | null  (nullable)
settings.members[].details[][kind="project_tagged_items"].kind: "project_tagged_items"
settings.members[].details[][kind∈"template_metadata"|"template_models"].kind: "template_metadata" | "template_models"
settings.members[].details[][kind∈"facts"|"list"].kind: "facts" | "list"
settings.members[].details[][kind∈"facts"|"list"].title*: string
settings.members[].details[][kind∈"facts"|"list"].title[LabText].en: string
settings.members[].details[][kind∈"facts"|"list"].title[LabText].zh-CN: string
settings.members[].details[][kind∈"facts"|"list"].rows[].label*: string
settings.members[].details[][kind∈"facts"|"list"].rows[].label[LabText].en: string
settings.members[].details[][kind∈"facts"|"list"].rows[].label[LabText].zh-CN: string
settings.members[].details[][kind∈"facts"|"list"].rows[].value*: string
settings.members[].details[][kind∈"facts"|"list"].rows[].value[LabText].en: string
settings.members[].details[][kind∈"facts"|"list"].rows[].value[LabText].zh-CN: string
settings.members[].details[][kind∈"facts"|"list"].rows[].format: "code" | undefined  (optional)
settings.members[].details[][kind="toggles"].kind: "toggles"
settings.members[].details[][kind="toggles"].title*: string
settings.members[].details[][kind="toggles"].title[LabText].en: string
settings.members[].details[][kind="toggles"].title[LabText].zh-CN: string
settings.members[].details[][kind="toggles"].rows[].id: string
settings.members[].details[][kind="toggles"].rows[].label*: string
settings.members[].details[][kind="toggles"].rows[].label[LabText].en: string
settings.members[].details[][kind="toggles"].rows[].label[LabText].zh-CN: string
settings.members[].details[][kind="toggles"].rows[].note*: string
settings.members[].details[][kind="toggles"].rows[].note[LabText].en: string
settings.members[].details[][kind="toggles"].rows[].note[LabText].zh-CN: string
settings.members[].details[][kind="toggles"].rows[].enabled: boolean
settings.roles[].id: MemberRole
settings.roles[].label*: string
settings.roles[].label[LabText].en: string
settings.roles[].label[LabText].zh-CN: string
settings.projects[].projectId: string
settings.projects[].description*: string | null  (nullable)
settings.projects[].description[LabText].en: string  (nullable parent)
settings.projects[].description[LabText].zh-CN: string  (nullable parent)
settings.projects[].state: "active" | "archived"
settings.projects[].discussionCount: number
settings.projects[].experimentCount: number
settings.projects[].conclusionCount: number
settings.projects[].lastActivity*: string | null  (nullable)
settings.projects[].lastActivity[LabText].en: string  (nullable parent)
settings.projects[].lastActivity[LabText].zh-CN: string  (nullable parent)
settings.projects[].details[][kind="project_label"].kind: "project_label"
settings.projects[].details[][kind="project_label"].createdById: string
settings.projects[].details[][kind="project_label"].focusedByCount: number | null  (nullable)
settings.projects[].details[][kind="project_tagged_items"].kind: "project_tagged_items"
settings.projects[].details[][kind∈"template_metadata"|"template_models"].kind: "template_metadata" | "template_models"
settings.projects[].details[][kind∈"facts"|"list"].kind: "facts" | "list"
settings.projects[].details[][kind∈"facts"|"list"].title*: string
settings.projects[].details[][kind∈"facts"|"list"].title[LabText].en: string
settings.projects[].details[][kind∈"facts"|"list"].title[LabText].zh-CN: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].label*: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].label[LabText].en: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].label[LabText].zh-CN: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].value*: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].value[LabText].en: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].value[LabText].zh-CN: string
settings.projects[].details[][kind∈"facts"|"list"].rows[].format: "code" | undefined  (optional)
settings.projects[].details[][kind="toggles"].kind: "toggles"
settings.projects[].details[][kind="toggles"].title*: string
settings.projects[].details[][kind="toggles"].title[LabText].en: string
settings.projects[].details[][kind="toggles"].title[LabText].zh-CN: string
settings.projects[].details[][kind="toggles"].rows[].id: string
settings.projects[].details[][kind="toggles"].rows[].label*: string
settings.projects[].details[][kind="toggles"].rows[].label[LabText].en: string
settings.projects[].details[][kind="toggles"].rows[].label[LabText].zh-CN: string
settings.projects[].details[][kind="toggles"].rows[].note*: string
settings.projects[].details[][kind="toggles"].rows[].note[LabText].en: string
settings.projects[].details[][kind="toggles"].rows[].note[LabText].zh-CN: string
settings.projects[].details[][kind="toggles"].rows[].enabled: boolean
settings.repositories[].id: string
settings.repositories[].description*: string
settings.repositories[].description[LabText].en: string
settings.repositories[].description[LabText].zh-CN: string
settings.repositories[].status: "broken" | "ok" | "warning"
settings.repositories[].branch: string
settings.repositories[].images[]: string
settings.repositories[].nodes*: string | null  (nullable)
settings.repositories[].nodes[LabText].en: string  (nullable parent)
settings.repositories[].nodes[LabText].zh-CN: string  (nullable parent)
settings.repositories[].lastSync*: string
settings.repositories[].lastSync[LabText].en: string
settings.repositories[].lastSync[LabText].zh-CN: string
settings.repositories[].remote: string
settings.repositories[].details[][kind="project_label"].kind: "project_label"
settings.repositories[].details[][kind="project_label"].createdById: string
settings.repositories[].details[][kind="project_label"].focusedByCount: number | null  (nullable)
settings.repositories[].details[][kind="project_tagged_items"].kind: "project_tagged_items"
settings.repositories[].details[][kind∈"template_metadata"|"template_models"].kind: "template_metadata" | "template_models"
settings.repositories[].details[][kind∈"facts"|"list"].kind: "facts" | "list"
settings.repositories[].details[][kind∈"facts"|"list"].title*: string
settings.repositories[].details[][kind∈"facts"|"list"].title[LabText].en: string
settings.repositories[].details[][kind∈"facts"|"list"].title[LabText].zh-CN: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].label*: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].label[LabText].en: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].label[LabText].zh-CN: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].value*: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].value[LabText].en: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].value[LabText].zh-CN: string
settings.repositories[].details[][kind∈"facts"|"list"].rows[].format: "code" | undefined  (optional)
settings.repositories[].details[][kind="toggles"].kind: "toggles"
settings.repositories[].details[][kind="toggles"].title*: string
settings.repositories[].details[][kind="toggles"].title[LabText].en: string
settings.repositories[].details[][kind="toggles"].title[LabText].zh-CN: string
settings.repositories[].details[][kind="toggles"].rows[].id: string
settings.repositories[].details[][kind="toggles"].rows[].label*: string
settings.repositories[].details[][kind="toggles"].rows[].label[LabText].en: string
settings.repositories[].details[][kind="toggles"].rows[].label[LabText].zh-CN: string
settings.repositories[].details[][kind="toggles"].rows[].note*: string
settings.repositories[].details[][kind="toggles"].rows[].note[LabText].en: string
settings.repositories[].details[][kind="toggles"].rows[].note[LabText].zh-CN: string
settings.repositories[].details[][kind="toggles"].rows[].enabled: boolean
settings.experiments[].runId: string
settings.experiments[].ownerId: string
settings.experiments[].projectId: string
settings.experiments[].status: ExperimentStatus
settings.experiments[].title*: string
settings.experiments[].title[LabText].en: string
settings.experiments[].title[LabText].zh-CN: string
settings.discussions[].discussionId: string
settings.discussions[].ownerId: string
settings.discussions[].projectId: string
settings.discussions[].participantIds[]: string
settings.discussions[].title*: string
settings.discussions[].title[LabText].en: string
settings.discussions[].title[LabText].zh-CN: string
settings.discussions[].unread: boolean | null  (nullable)
settings.invitations[].email: string
settings.invitations[].role: MemberRole
settings.invitations[].description*: string
settings.invitations[].description[LabText].en: string
settings.invitations[].description[LabText].zh-CN: string
settings.invitations[].sent*: string
settings.invitations[].sent[LabText].en: string
settings.invitations[].sent[LabText].zh-CN: string
settings.unassigned.discussionCount: number
settings.unassigned.experimentCount: number
settings.unassigned.suggestions[][kind="discussion"].kind: "discussion"
settings.unassigned.suggestions[][kind="discussion"].discussionId: string
settings.unassigned.suggestions[][kind="discussion"].projectId: string
settings.unassigned.suggestions[][kind="discussion"].reason*: string
settings.unassigned.suggestions[][kind="discussion"].reason[LabText].en: string
settings.unassigned.suggestions[][kind="discussion"].reason[LabText].zh-CN: string
settings.unassigned.suggestions[][kind="experiment"].kind: "experiment"
settings.unassigned.suggestions[][kind="experiment"].runId: string
settings.unassigned.suggestions[][kind="experiment"].projectId: string
settings.unassigned.suggestions[][kind="experiment"].reason*: string
settings.unassigned.suggestions[][kind="experiment"].reason[LabText].en: string
settings.unassigned.suggestions[][kind="experiment"].reason[LabText].zh-CN: string
settings.imageDependencies[].image: string
settings.imageDependencies[].node*: string
settings.imageDependencies[].node[LabText].en: string
settings.imageDependencies[].node[LabText].zh-CN: string
settings.imageDependencies[].warning*: string
settings.imageDependencies[].warning[LabText].en: string
settings.imageDependencies[].warning[LabText].zh-CN: string
settings.repositoryEvents[].kind: string
settings.repositoryEvents[].when*: string
settings.repositoryEvents[].when[LabText].en: string
settings.repositoryEvents[].when[LabText].zh-CN: string
settings.repositoryEvents[].source: string | null  (nullable)
settings.repositoryEvents[].description*: string
settings.repositoryEvents[].description[LabText].en: string
settings.repositoryEvents[].description[LabText].zh-CN: string
```
