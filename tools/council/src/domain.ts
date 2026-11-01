// Council domain model: seats, agendas, decision rows, ballots, status records.
// Rules encoded here come from pepgent-soroi AGENTS.md D1-12 (C2-3), D1-16, D1-17, C4-1.

export const SEATS = [
	"Coordination",
	"ClaudeHigh",
	"Argon",
	"LeadMentor",
	"ArgonGovernance",
	"SoroiKeeperOpus",
	"SoroiKeeperGpt",
	"OmompOptimizer",
] as const;
export type SeatId = (typeof SEATS)[number];

/** Base four seats for every product / architecture / contract row (D1-12). */
export const BASE_SEATS: readonly SeatId[] = ["Coordination", "ClaudeHigh", "Argon", "LeadMentor"];
/** Seats with the right to open an agenda (D1-12 统一提案入口). */
export const PROPOSER_SEATS: readonly SeatId[] = [
	"Coordination",
	"Argon",
	"ArgonGovernance",
	"SoroiKeeperOpus",
	"SoroiKeeperGpt",
	"OmompOptimizer",
];
/** Independent departments that vote on every row of an agenda they open (U90, U93). */
export const DEPARTMENT_SEATS: readonly SeatId[] = ["SoroiKeeperOpus", "SoroiKeeperGpt", "OmompOptimizer"];
/** Product-panorama seats that join rows touching global product architecture (D1-12 ①–④ 附注). */
export const PANORAMA_SEATS: readonly SeatId[] = ["SoroiKeeperOpus", "SoroiKeeperGpt"];
/**
 * Seats whose work is done by fresh one-shot instances rather than a standing occupant:
 * Coordination = Main + governance-desk instances (one vote), ClaudeHigh = a new claude-high per agenda.
 * Their events go to Main, and any `--as` agent is accepted and recorded.
 */
export const MAIN_ROUTED_SEATS: readonly SeatId[] = ["Coordination", "ClaudeHigh"];

/** Event address of a seat: Main for Main-routed seats, otherwise the seat id. */
export const seatAddress = (seat: SeatId): string => (MAIN_ROUTED_SEATS.includes(seat) ? "Main" : seat);

export const PRIORITIES = ["P0", "P1", "P2", "P3"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const CATEGORIES = ["意图", "技术", "串联", "实现", "治理"] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Functional domains a row touches. Independent of `category` (D1-17's five labels):
 * - governance: organisation, dispatch, workflow efficiency or PM error-path cleanup → ArgonGovernance votes;
 * - globalArchitecture: global product architecture → both product-panorama seats vote;
 * - design: changes soroi design/*.md → Argon is notified to write back when the row passes.
 */
export const DOMAINS = ["governance", "globalArchitecture", "design"] as const;
export type Domain = (typeof DOMAINS)[number];

/** Which seat may add a domain to a row by its own claim. */
export const DOMAIN_CLAIMERS: Record<Domain, readonly SeatId[]> = {
	governance: ["ArgonGovernance"],
	globalArchitecture: ["SoroiKeeperOpus", "SoroiKeeperGpt"],
	design: ["Argon"],
};

export type Citation =
	| { kind: "user"; u: number } // LEDGER.md U 编号
	| { kind: "session"; session: string; entry: string } // 会话 id 与 entry（用户原话）
	| { kind: "blockingFact"; evidence: string }; // 已实证的主路径阻断事实

export type Choice =
	| { kind: "approve" }
	| { kind: "oppose"; counterexample: string }
	| { kind: "veto"; citation: Citation };

export interface RowBody {
	what: string;
	where: string;
	how: string;
	tradeoff: string;
	category: Category;
	missingDesign: boolean;
	domains: Domain[];
	notify: string[];
}

export interface Row extends RowBody {
	id: string; // D25-01
	agenda: string; // D25
	ord: number;
	version: number;
	/** Terminal outcome once reached; never changes afterwards. */
	outcome: Outcome | null;
}

export type Outcome =
	| { kind: "passed"; approve: SeatId[]; eligible: SeatId[]; threshold: number }
	| { kind: "rejected"; reason: "veto"; seat: SeatId; citation: Citation }
	| { kind: "rejected"; reason: "threshold"; approve: SeatId[]; eligible: SeatId[]; threshold: number }
	| { kind: "withdrawn"; by: string; reason: string };

export type AgendaState = "filing" | "open" | "decided" | "archived";

export interface Agenda {
	id: string; // D25
	number: number;
	title: string;
	slug: string;
	priority: Priority;
	proposerSeat: SeatId;
	proposerAgent: string;
	facts: string;
	issue: number | null;
	projectItem: string | null;
	state: AgendaState;
	archivePaths: string[];
	archiveCommit: string | null;
}

export interface Ballot {
	id: number;
	row: string;
	version: number;
	seat: SeatId;
	agent: string;
	choice: Choice;
	classification: Category | null;
	reasons: string;
	at: string;
	/** Set when the ballot stops counting without being replaced by the same seat. */
	voided: string | null;
}

export interface Arbitration {
	row: string;
	version: number;
	raisedBy: string;
	claimed: Category; // the category Argon insists on (意图)
	reasons: string;
	raisedAt: string;
	ruling: { category: Category; by: string; reasons: string; at: string } | null;
}

export interface DomainClaim {
	row: string;
	domain: Domain;
	seat: SeatId;
	agent: string;
	reasons: string;
	at: string;
}

export const STATUS_KINDS = ["progress", "note", "blocked", "all_done", "alert", "dependency"] as const;
export type StatusKind = (typeof STATUS_KINDS)[number];

export interface StatusRecord {
	seq: number;
	from: string;
	kind: StatusKind;
	repo: string | null;
	worker: string | null;
	ref: string | null;
	to: string[];
	text: string;
	at: string;
}

export interface CouncilEvent {
	seq: number;
	at: string;
	to: string;
	kind: string;
	agenda: string | null;
	fields: Record<string, string>;
	summary: string;
	wake: boolean;
}

// ---- boundary parsing -------------------------------------------------------------------------

export class InputError extends Error {}

const fail = (message: string): never => {
	throw new InputError(message);
};

const isOneOf = <T extends string>(values: readonly T[], value: unknown): value is T =>
	typeof value === "string" && (values as readonly string[]).includes(value);

export const parseSeat = (value: unknown): SeatId =>
	isOneOf(SEATS, value) ? value : fail(`unknown seat ${JSON.stringify(value)}; seats: ${SEATS.join(", ")}`);

export const parseCategory = (value: unknown): Category =>
	isOneOf(CATEGORIES, value) ? value : fail(`category must be one of ${CATEGORIES.join("/")}, got ${JSON.stringify(value)}`);

const text = (value: unknown, field: string): string =>
	typeof value === "string" && value.trim() !== "" ? value.trim() : fail(`${field} is required`);

const stringList = (value: unknown, field: string): string[] =>
	value === undefined || value === null
		? []
		: Array.isArray(value) && value.every((v) => typeof v === "string" && v.trim() !== "")
			? value.map((v: string) => v.trim())
			: fail(`${field} must be a list of names`);

export const parseRowBody = (value: unknown, where: string): RowBody => {
	if (typeof value !== "object" || value === null) return fail(`${where}: row must be a mapping`);
	const r = value as Record<string, unknown>;
	const domains = stringList(r.domains, `${where}.domains`).map((d) =>
		isOneOf(DOMAINS, d) ? d : fail(`${where}.domains: unknown domain ${d}; domains: ${DOMAINS.join(", ")}`),
	);
	return {
		what: text(r.what, `${where}.what`),
		where: text(r.where, `${where}.where`),
		how: text(r.how, `${where}.how`),
		tradeoff: text(r.tradeoff, `${where}.tradeoff`),
		category: parseCategory(r.category),
		missingDesign: r.missingDesign === undefined ? false : typeof r.missingDesign === "boolean" ? r.missingDesign : fail(`${where}.missingDesign must be true/false`),
		domains: [...new Set(domains)],
		notify: [...new Set(stringList(r.notify, `${where}.notify`))],
	};
};

export interface Proposal {
	title: string;
	/** Kebab-case archive name: <archive>/decisions/<id>-<slug>.md, as in D24-derive-principal.md. */
	slug: string;
	priority: Priority;
	facts: string;
	rows: RowBody[];
}

export const parseProposal = (value: unknown): Proposal => {
	if (typeof value !== "object" || value === null) return fail("proposal must be a mapping");
	const p = value as Record<string, unknown>;
	if (!Array.isArray(p.rows) || p.rows.length === 0) return fail("proposal needs at least one row under rows:");
	return {
		title: text(p.title, "title"),
		slug: typeof p.slug === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug) ? p.slug : fail("slug must be kebab-case ascii, e.g. derive-principal"),
		priority: isOneOf(PRIORITIES, p.priority) ? p.priority : fail(`priority must be one of ${PRIORITIES.join("/")}`),
		facts: text(p.facts, "facts"),
		rows: p.rows.map((r, i) => parseRowBody(r, `rows[${i}]`)),
	};
};

/** `U95`, `session:<id>#<entry>`, or `fact:<evidence>`. */
export const parseCitation = (raw: string): Citation => {
	const u = /^U(\d+)$/.exec(raw.trim());
	if (u) return { kind: "user", u: Number(u[1]) };
	const s = /^session:([^#\s]+)#(\S+)$/.exec(raw.trim());
	if (s) return { kind: "session", session: s[1]!, entry: s[2]! };
	if (raw.startsWith("fact:") && raw.slice(5).trim() !== "") return { kind: "blockingFact", evidence: raw.slice(5).trim() };
	return fail(`citation must be U<n>, session:<id>#<entry> or fact:<evidence>; got ${JSON.stringify(raw)}`);
};

export const citationText = (c: Citation): string => {
	switch (c.kind) {
		case "user":
			return `U${c.u}`;
		case "session":
			return `session ${c.session} entry ${c.entry}`;
		case "blockingFact":
			return `已实证阻断事实：${c.evidence}`;
	}
};

export const choiceLabel = (c: Choice): string => {
	switch (c.kind) {
		case "approve":
			return "赞成";
		case "oppose":
			return "反对";
		case "veto":
			return "否决";
	}
};
