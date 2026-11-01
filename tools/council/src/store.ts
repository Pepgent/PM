// SQLite schema and row mapping. The daemon is the only process that opens this database.
import { Database } from "bun:sqlite";
import type {
	Agenda,
	AgendaState,
	Arbitration,
	Ballot,
	Category,
	Choice,
	CouncilEvent,
	Domain,
	DomainClaim,
	Outcome,
	Priority,
	Row,
	SeatId,
	StatusKind,
	StatusRecord,
} from "./domain.ts";
import type { RowContext } from "./tally.ts";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS seat(id TEXT PRIMARY KEY, occupant TEXT);
CREATE TABLE IF NOT EXISTS agenda(
  id TEXT PRIMARY KEY, number INTEGER NOT NULL UNIQUE, title TEXT NOT NULL, slug TEXT NOT NULL, priority TEXT NOT NULL,
  proposer_seat TEXT NOT NULL, proposer_agent TEXT NOT NULL, facts TEXT NOT NULL,
  issue INTEGER, project_item TEXT, state TEXT NOT NULL,
  archive_paths TEXT NOT NULL DEFAULT '[]', archive_commit TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS row(
  id TEXT PRIMARY KEY, agenda TEXT NOT NULL REFERENCES agenda(id), ord INTEGER NOT NULL, version INTEGER NOT NULL,
  what TEXT NOT NULL, where_ TEXT NOT NULL, how TEXT NOT NULL, tradeoff TEXT NOT NULL, category TEXT NOT NULL,
  missing_design INTEGER NOT NULL, domains TEXT NOT NULL, notify TEXT NOT NULL, outcome TEXT);
CREATE TABLE IF NOT EXISTS row_history(
  row TEXT NOT NULL, version INTEGER NOT NULL, body TEXT NOT NULL, by_agent TEXT NOT NULL, reasons TEXT NOT NULL, at TEXT NOT NULL,
  PRIMARY KEY(row, version));
CREATE TABLE IF NOT EXISTS ballot(
  id INTEGER PRIMARY KEY AUTOINCREMENT, row TEXT NOT NULL REFERENCES row(id), version INTEGER NOT NULL,
  seat TEXT NOT NULL, agent TEXT NOT NULL, choice TEXT NOT NULL, classification TEXT, reasons TEXT NOT NULL,
  at TEXT NOT NULL, voided TEXT);
CREATE TABLE IF NOT EXISTS arbitration(
  row TEXT NOT NULL, version INTEGER NOT NULL, raised_by TEXT NOT NULL, claimed TEXT NOT NULL, reasons TEXT NOT NULL,
  raised_at TEXT NOT NULL, ruling TEXT, PRIMARY KEY(row, version));
CREATE TABLE IF NOT EXISTS domain_claim(
  row TEXT NOT NULL, domain TEXT NOT NULL, seat TEXT NOT NULL, agent TEXT NOT NULL, reasons TEXT NOT NULL, at TEXT NOT NULL,
  PRIMARY KEY(row, domain));
CREATE TABLE IF NOT EXISTS rebuttal(
  id INTEGER PRIMARY KEY AUTOINCREMENT, row TEXT NOT NULL, version INTEGER NOT NULL, ballot INTEGER NOT NULL,
  agent TEXT NOT NULL, evidence TEXT NOT NULL, at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS status(
  seq INTEGER PRIMARY KEY AUTOINCREMENT, from_ TEXT NOT NULL, kind TEXT NOT NULL, repo TEXT, worker TEXT, ref TEXT,
  to_ TEXT NOT NULL, text TEXT NOT NULL, at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS event(
  seq INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, to_ TEXT NOT NULL, kind TEXT NOT NULL, agenda TEXT,
  fields TEXT NOT NULL, summary TEXT NOT NULL, wake INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS event_to ON event(to_, seq);
CREATE TABLE IF NOT EXISTS cursor(reader TEXT PRIMARY KEY, seq INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS head(seat TEXT PRIMARY KEY, agenda TEXT, pending TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS outbox(
  seq INTEGER PRIMARY KEY AUTOINCREMENT, agenda TEXT NOT NULL, op TEXT NOT NULL, created_at TEXT NOT NULL,
  done_at TEXT, result TEXT, last_error TEXT, attempts INTEGER NOT NULL DEFAULT 0);
`;

export type OutboxOp =
	| { kind: "fileIssue" }
	| { kind: "comment"; body: string }
	| { kind: "renderBody" }
	| { kind: "finalize" }
	| { kind: "archive" };

export interface OutboxItem {
	seq: number;
	agenda: string;
	op: OutboxOp;
	attempts: number;
}

type Raw = Record<string, unknown>;
const str = (v: unknown): string => v as string;
const strOrNull = (v: unknown): string | null => (v === null ? null : (v as string));

export const openStore = (path: string): Database => {
	const db = new Database(path, { create: true, strict: true });
	db.exec("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;");
	db.exec(SCHEMA);
	return db;
};

const toAgenda = (r: Raw): Agenda => ({
	id: str(r.id),
	number: r.number as number,
	title: str(r.title),
	priority: str(r.priority) as Priority,
	proposerSeat: str(r.proposer_seat) as SeatId,
	proposerAgent: str(r.proposer_agent),
	facts: str(r.facts),
	issue: r.issue as number | null,
	projectItem: strOrNull(r.project_item),
	state: str(r.state) as AgendaState,
	archivePaths: JSON.parse(str(r.archive_paths)) as string[],
	archiveCommit: strOrNull(r.archive_commit),
	slug: str(r.slug),
});

const toRow = (r: Raw): Row => ({
	id: str(r.id),
	agenda: str(r.agenda),
	ord: r.ord as number,
	version: r.version as number,
	what: str(r.what),
	where: str(r.where_),
	how: str(r.how),
	tradeoff: str(r.tradeoff),
	category: str(r.category) as Category,
	missingDesign: r.missing_design === 1,
	domains: JSON.parse(str(r.domains)) as Domain[],
	notify: JSON.parse(str(r.notify)) as string[],
	outcome: r.outcome === null ? null : (JSON.parse(str(r.outcome)) as Outcome),
});

const toBallot = (r: Raw): Ballot => ({
	id: r.id as number,
	row: str(r.row),
	version: r.version as number,
	seat: str(r.seat) as SeatId,
	agent: str(r.agent),
	choice: JSON.parse(str(r.choice)) as Choice,
	classification: strOrNull(r.classification) as Category | null,
	reasons: str(r.reasons),
	at: str(r.at),
	voided: strOrNull(r.voided),
});

const toArbitration = (r: Raw): Arbitration => ({
	row: str(r.row),
	version: r.version as number,
	raisedBy: str(r.raised_by),
	claimed: str(r.claimed) as Category,
	reasons: str(r.reasons),
	raisedAt: str(r.raised_at),
	ruling: r.ruling === null ? null : (JSON.parse(str(r.ruling)) as Arbitration["ruling"]),
});

const toClaim = (r: Raw): DomainClaim => ({
	row: str(r.row),
	domain: str(r.domain) as Domain,
	seat: str(r.seat) as SeatId,
	agent: str(r.agent),
	reasons: str(r.reasons),
	at: str(r.at),
});

export const toEvent = (r: Raw): CouncilEvent => ({
	seq: r.seq as number,
	at: str(r.at),
	to: str(r.to_),
	kind: str(r.kind),
	agenda: strOrNull(r.agenda),
	fields: JSON.parse(str(r.fields)) as Record<string, string>,
	summary: str(r.summary),
	wake: r.wake === 1,
});

export const toStatus = (r: Raw): StatusRecord => ({
	seq: r.seq as number,
	from: str(r.from_),
	kind: str(r.kind) as StatusKind,
	repo: strOrNull(r.repo),
	worker: strOrNull(r.worker),
	ref: strOrNull(r.ref),
	to: JSON.parse(str(r.to_)) as string[],
	text: str(r.text),
	at: str(r.at),
});

export class Store {
	constructor(readonly db: Database) {}

	meta(key: string): string | null {
		const r = this.db.query("SELECT value FROM meta WHERE key=?").get(key) as Raw | null;
		return r === null ? null : str(r.value);
	}
	setMeta(key: string, value: string): void {
		this.db.query("INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(key, value);
	}

	occupant(seat: SeatId): string | null {
		const r = this.db.query("SELECT occupant FROM seat WHERE id=?").get(seat) as Raw | null;
		return r === null ? null : strOrNull(r.occupant);
	}
	setOccupant(seat: SeatId, occupant: string | null): void {
		this.db.query("INSERT INTO seat(id,occupant) VALUES(?,?) ON CONFLICT(id) DO UPDATE SET occupant=excluded.occupant").run(seat, occupant);
	}
	seats(): { id: SeatId; occupant: string | null }[] {
		return (this.db.query("SELECT id, occupant FROM seat ORDER BY id").all() as Raw[]).map((r) => ({ id: str(r.id) as SeatId, occupant: strOrNull(r.occupant) }));
	}

	agenda(id: string): Agenda | null {
		const r = this.db.query("SELECT * FROM agenda WHERE id=?").get(id) as Raw | null;
		return r === null ? null : toAgenda(r);
	}
	agendas(states: string[]): Agenda[] {
		return (this.db.query(`SELECT * FROM agenda WHERE state IN (${states.map(() => "?").join(",")}) ORDER BY number`).all(...states) as Raw[]).map(toAgenda);
	}
	rows(agenda: string): Row[] {
		return (this.db.query("SELECT * FROM row WHERE agenda=? ORDER BY ord").all(agenda) as Raw[]).map(toRow);
	}
	row(id: string): Row | null {
		const r = this.db.query("SELECT * FROM row WHERE id=?").get(id) as Raw | null;
		return r === null ? null : toRow(r);
	}
	ballots(row: string): Ballot[] {
		return (this.db.query("SELECT * FROM ballot WHERE row=? ORDER BY id").all(row) as Raw[]).map(toBallot);
	}
	ballot(id: number): Ballot | null {
		const r = this.db.query("SELECT * FROM ballot WHERE id=?").get(id) as Raw | null;
		return r === null ? null : toBallot(r);
	}
	agendaBallots(agenda: string): Ballot[] {
		return (this.db.query("SELECT b.* FROM ballot b JOIN row r ON r.id=b.row WHERE r.agenda=? ORDER BY b.id").all(agenda) as Raw[]).map(toBallot);
	}
	arbitration(row: string, version: number): Arbitration | null {
		const r = this.db.query("SELECT * FROM arbitration WHERE row=? AND version=?").get(row, version) as Raw | null;
		return r === null ? null : toArbitration(r);
	}
	arbitrations(row: string): Arbitration[] {
		return (this.db.query("SELECT * FROM arbitration WHERE row=? ORDER BY version").all(row) as Raw[]).map(toArbitration);
	}
	claims(row: string): DomainClaim[] {
		return (this.db.query("SELECT * FROM domain_claim WHERE row=? ORDER BY at").all(row) as Raw[]).map(toClaim);
	}
	rebuttals(row: string): { id: number; version: number; ballot: number; agent: string; evidence: string; at: string }[] {
		return (this.db.query("SELECT * FROM rebuttal WHERE row=? ORDER BY id").all(row) as Raw[]).map((r) => ({
			id: r.id as number,
			version: r.version as number,
			ballot: r.ballot as number,
			agent: str(r.agent),
			evidence: str(r.evidence),
			at: str(r.at),
		}));
	}
	rowHistory(row: string): { version: number; body: string; by: string; reasons: string; at: string }[] {
		return (this.db.query("SELECT * FROM row_history WHERE row=? ORDER BY version").all(row) as Raw[]).map((r) => ({
			version: r.version as number,
			body: str(r.body),
			by: str(r.by_agent),
			reasons: str(r.reasons),
			at: str(r.at),
		}));
	}

	context(row: Row, agenda: Agenda): RowContext {
		return {
			row,
			proposerSeat: agenda.proposerSeat,
			claims: this.claims(row.id),
			ballots: this.ballots(row.id),
			arbitration: this.arbitration(row.id, row.version),
		};
	}
	contexts(agenda: Agenda): RowContext[] {
		return this.rows(agenda.id).map((r) => this.context(r, agenda));
	}

	head(seat: SeatId): { agenda: string | null; pending: string[] } {
		const r = this.db.query("SELECT agenda, pending FROM head WHERE seat=?").get(seat) as Raw | null;
		return r === null ? { agenda: null, pending: [] } : { agenda: strOrNull(r.agenda), pending: JSON.parse(str(r.pending)) as string[] };
	}
	setHead(seat: SeatId, agenda: string | null, pending: string[]): void {
		this.db
			.query("INSERT INTO head(seat,agenda,pending) VALUES(?,?,?) ON CONFLICT(seat) DO UPDATE SET agenda=excluded.agenda, pending=excluded.pending")
			.run(seat, agenda, JSON.stringify(pending));
	}

	cursor(reader: string): number {
		const r = this.db.query("SELECT seq FROM cursor WHERE reader=?").get(reader) as Raw | null;
		return r === null ? 0 : (r.seq as number);
	}
	setCursor(reader: string, seq: number): void {
		this.db.query("INSERT INTO cursor(reader,seq) VALUES(?,?) ON CONFLICT(reader) DO UPDATE SET seq=excluded.seq").run(reader, seq);
	}
	eventsFor(to: string, after: number): CouncilEvent[] {
		return (this.db.query("SELECT * FROM event WHERE to_=? AND seq>? ORDER BY seq").all(to, after) as Raw[]).map(toEvent);
	}
	status(seq: number): StatusRecord | null {
		const r = this.db.query("SELECT * FROM status WHERE seq=?").get(seq) as Raw | null;
		return r === null ? null : toStatus(r);
	}

	pendingOutbox(): OutboxItem[] {
		return (this.db.query("SELECT seq, agenda, op, attempts FROM outbox WHERE done_at IS NULL ORDER BY seq").all() as Raw[]).map((r) => ({
			seq: r.seq as number,
			agenda: str(r.agenda),
			op: JSON.parse(str(r.op)) as OutboxOp,
			attempts: r.attempts as number,
		}));
	}
}
