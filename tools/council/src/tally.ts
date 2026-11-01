// Pure counting rules: eligibility, threshold, row evaluation, per-seat queue head.
import {
	type Agenda,
	type Arbitration,
	type Ballot,
	BASE_SEATS,
	type Category,
	DEPARTMENT_SEATS,
	type Domain,
	type DomainClaim,
	type Outcome,
	PANORAMA_SEATS,
	PRIORITIES,
	type Row,
	SEATS,
	type SeatId,
} from "./domain.ts";

export interface RowContext {
	row: Row;
	proposerSeat: SeatId;
	claims: DomainClaim[];
	/** Every ballot ever cast on this row; evaluation keeps the current version's live ballots. */
	ballots: Ballot[];
	/** Classification dispute raised on the row's current version, if any. */
	arbitration: Arbitration | null;
}

export type RowStatus =
	| { kind: "terminal"; outcome: Outcome }
	| { kind: "decidable"; outcome: Outcome }
	| { kind: "disputed"; arbitration: Arbitration; missing: SeatId[] }
	| { kind: "contested"; opposes: Ballot[]; missing: SeatId[] }
	| { kind: "voting"; missing: SeatId[] };

export const effectiveDomains = (ctx: Pick<RowContext, "row" | "claims">): Set<Domain> =>
	new Set<Domain>([...ctx.row.domains, ...ctx.claims.map((c) => c.domain)]);

/** D1-12: base four; + ArgonGovernance on governance rows; + both panorama seats on global-architecture rows;
 *  + the proposing department on every row of its own agenda. */
export const eligibleSeats = (ctx: Pick<RowContext, "row" | "claims" | "proposerSeat">): SeatId[] => {
	const domains = effectiveDomains(ctx);
	const set = new Set<SeatId>(BASE_SEATS);
	if (domains.has("governance")) set.add("ArgonGovernance");
	if (domains.has("globalArchitecture")) for (const s of PANORAMA_SEATS) set.add(s);
	if (DEPARTMENT_SEATS.includes(ctx.proposerSeat)) set.add(ctx.proposerSeat);
	return SEATS.filter((s) => set.has(s));
};

/** ≥ 3/4 of participating seats: 4 → 3, 5 → 4, 6 → 5, 7 → 6. */
export const thresholdFor = (eligible: number): number => Math.ceil((3 * eligible) / 4);

export const effectiveCategory = (ctx: Pick<RowContext, "row" | "arbitration">): Category =>
	ctx.arbitration?.ruling?.category ?? ctx.row.category;

/** Latest live ballot per seat on the current version. */
export const currentBallots = (ctx: Pick<RowContext, "row" | "ballots">): Map<SeatId, Ballot> => {
	const map = new Map<SeatId, Ballot>();
	for (const b of ctx.ballots) {
		if (b.version !== ctx.row.version || b.voided !== null) continue;
		const prev = map.get(b.seat);
		if (prev === undefined || b.id > prev.id) map.set(b.seat, b);
	}
	return map;
};

/** Whether an Argon intent / missing-design veto has the standing D1-16 requires on this row. */
export const argonVetoStands = (ctx: Pick<RowContext, "row" | "arbitration">, ballot: Ballot): boolean =>
	ballot.choice.kind === "veto" &&
	(ballot.choice.citation.kind === "user" || ballot.choice.citation.kind === "session") &&
	(effectiveCategory(ctx) === "意图" || ctx.row.missingDesign);

export const evaluateRow = (ctx: RowContext): RowStatus => {
	if (ctx.row.outcome !== null) return { kind: "terminal", outcome: ctx.row.outcome };
	const eligible = eligibleSeats(ctx);
	const ballots = currentBallots(ctx);
	for (const seat of eligible) {
		const b = ballots.get(seat);
		if (b === undefined || b.choice.kind !== "veto") continue;
		const stands = seat === "Argon" ? argonVetoStands(ctx, b) : seat === "ArgonGovernance";
		if (stands) return { kind: "decidable", outcome: { kind: "rejected", reason: "veto", seat, citation: b.choice.citation } };
	}
	const missing = eligible.filter((s) => !ballots.has(s));
	if (ctx.arbitration !== null && ctx.arbitration.ruling === null) return { kind: "disputed", arbitration: ctx.arbitration, missing };
	const opposes = eligible.flatMap((s) => {
		const b = ballots.get(s);
		return b !== undefined && b.choice.kind === "oppose" ? [b] : [];
	});
	if (opposes.length > 0) return { kind: "contested", opposes, missing };
	if (missing.length > 0) return { kind: "voting", missing };
	const approve = eligible.filter((s) => ballots.get(s)?.choice.kind === "approve");
	const threshold = thresholdFor(eligible.length);
	return approve.length >= threshold
		? { kind: "decidable", outcome: { kind: "passed", approve, eligible, threshold } }
		: { kind: "decidable", outcome: { kind: "rejected", reason: "threshold", approve, eligible, threshold } };
};

/** Rows of one agenda the seat still has to vote on (current version, not yet decided). */
export const pendingFor = (seat: SeatId, rows: RowContext[]): RowContext[] =>
	rows.filter((ctx) => {
		const status = evaluateRow(ctx);
		if (status.kind === "terminal" || status.kind === "decidable") return false;
		return eligibleSeats(ctx).includes(seat) && !currentBallots(ctx).has(seat);
	});

export interface QueuedAgenda {
	agenda: Agenda;
	rows: RowContext[];
}

/** D1-12: P0→P1→P2→P3, same level FIFO by issue number. Only agendas already filed (open) are queued. */
export const queueOrder = (agendas: QueuedAgenda[]): QueuedAgenda[] =>
	agendas
		.filter((q) => q.agenda.state === "open" && q.agenda.issue !== null)
		.toSorted(
			(a, b) =>
				PRIORITIES.indexOf(a.agenda.priority) - PRIORITIES.indexOf(b.agenda.priority) ||
				a.agenda.issue! - b.agenda.issue!,
		);

export interface Head {
	agenda: string;
	pending: string[]; // `D25-01@v2`
}

/** The single agenda a seat may vote on next: the first queued agenda with rows pending for it. */
export const headFor = (seat: SeatId, ordered: QueuedAgenda[]): Head | null => {
	for (const q of ordered) {
		const pending = pendingFor(seat, q.rows);
		if (pending.length > 0) return { agenda: q.agenda.id, pending: pending.map((c) => `${c.row.id}@v${c.row.version}`) };
	}
	return null;
};
