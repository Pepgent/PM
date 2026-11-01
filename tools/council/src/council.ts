// Command handlers. Each command runs in one SQLite transaction: validate, write, re-evaluate rows,
// recompute per-seat queue heads, append events and GitHub outbox work. The daemon pushes the
// committed events to watchers and runs the outbox afterwards.
import {
	type Agenda,
	type Ballot,
	type Category,
	type Choice,
	type CouncilEvent,
	DOMAIN_CLAIMERS,
	type Domain,
	DOMAINS,
	InputError,
	MAIN_ROUTED_SEATS,
	type Outcome,
	type Proposal,
	PROPOSER_SEATS,
	parseCategory,
	parseCitation,
	parseProposal,
	parseRowBody,
	parseSeat,
	type Row,
	type RowBody,
	SEATS,
	type SeatId,
	STATUS_KINDS,
	type StatusKind,
	seatAddress,
} from "./domain.ts";
import { ballotComment, domainNames, outcomeText, rowBodyMarkdown, rowOutcomeComment, statusText } from "./render.ts";
import type { OutboxOp, Store } from "./store.ts";
import { currentBallots, effectiveCategory, eligibleSeats, evaluateRow, headFor, queueOrder, type QueuedAgenda, type RowContext } from "./tally.ts";

const now = (): string => new Date().toISOString();
const fail = (message: string): never => {
	throw new InputError(message);
};

/** Request arguments after the CLI has resolved `@file` references. */
export type Args = Record<string, string | string[] | boolean | undefined>;

const one = (args: Args, key: string): string => {
	const v = args[key];
	return typeof v === "string" && v.trim() !== "" ? v : fail(`--${key} is required`);
};
const opt = (args: Args, key: string): string | null => {
	const v = args[key];
	return typeof v === "string" && v.trim() !== "" ? v : null;
};
const many = (args: Args, key: string): string[] => {
	const v = args[key];
	return v === undefined ? [] : Array.isArray(v) ? v : typeof v === "string" ? [v] : [];
};
/** `--key D25-01=value` pairs. */
const pairs = (args: Args, key: string): Map<string, string> => {
	const map = new Map<string, string>();
	for (const raw of many(args, key)) {
		const i = raw.indexOf("=");
		if (i <= 0) fail(`--${key} expects <row>=<value>, got ${JSON.stringify(raw)}`);
		map.set(raw.slice(0, i), raw.slice(i + 1));
	}
	return map;
};

/** One event before it gets its sequence number. `wake` events reach watchers; all events reach `digest`. */
type Emit = { to: string; kind: string; agenda: string | null; fields: Record<string, string>; summary: string; wake: boolean };

export class Council {
	/** Events inserted by the transaction in progress; handed to watchers only after commit. */
	private inserted: CouncilEvent[] = [];

	constructor(
		readonly store: Store,
		private readonly firstNumber: number,
	) {
		for (const seat of SEATS) {
			if (MAIN_ROUTED_SEATS.includes(seat)) continue;
			if (store.db.query("SELECT 1 FROM seat WHERE id=?").get(seat) === null) store.setOccupant(seat, seat);
		}
	}

	/** Run a command transactionally; returns its text output and the committed events. */
	run(cmd: string, args: Args): { text: string; events: CouncilEvent[] } {
		let text = "";
		const events = this.transact(() => {
			text = this.dispatch(cmd, args);
		});
		return { text, events };
	}

	/** Apply an outbox completion (issue filed, archive committed) and settle in one transaction. */
	transact(fn: () => void): CouncilEvent[] {
		this.inserted = [];
		try {
			this.store.db.transaction(() => {
				fn();
				this.settle();
			})();
			return this.inserted;
		} finally {
			this.inserted = [];
		}
	}

	private emit(e: Emit): void {
		const at = now();
		const r = this.store.db
			.query("INSERT INTO event(at,to_,kind,agenda,fields,summary,wake) VALUES(?,?,?,?,?,?,?) RETURNING seq")
			.get(at, e.to, e.kind, e.agenda, JSON.stringify(e.fields), e.summary, e.wake ? 1 : 0) as { seq: number };
		this.inserted.push({ seq: r.seq, at, to: e.to, kind: e.kind, agenda: e.agenda, fields: e.fields, summary: e.summary, wake: e.wake });
	}

	private enqueue(agenda: string, op: OutboxOp): void {
		this.store.db.query("INSERT INTO outbox(agenda,op,created_at) VALUES(?,?,?)").run(agenda, JSON.stringify(op), now());
	}
	private publish(agenda: Agenda, comment: string | null): void {
		if (comment !== null) this.enqueue(agenda.id, { kind: "comment", body: comment });
		this.enqueue(agenda.id, { kind: "renderBody" });
	}

	/** Seat identity: Main-routed seats accept any named agent; standing seats only their occupant. */
	private checkSeat(seat: SeatId, as: string): void {
		if (MAIN_ROUTED_SEATS.includes(seat)) return;
		const occupant = this.store.occupant(seat);
		if (occupant !== as)
			fail(occupant === null ? `seat ${seat} has no occupant; run: council seat enter --seat ${seat} --as ${as}` : `seat ${seat} is held by ${occupant}, not ${as}`);
	}

	private openAgenda(id: string): Agenda {
		const a = this.store.agenda(id) ?? fail(`no agenda ${id}`);
		return a.state === "open" ? a : fail(`${id} is ${a.state}; it accepts this command only while open`);
	}
	private liveRow(id: string): { row: Row; agenda: Agenda; ctx: RowContext } {
		const row = this.store.row(id) ?? fail(`no row ${id}`);
		const agenda = this.openAgenda(row.agenda);
		if (row.outcome !== null) fail(`${id} is already decided: ${outcomeText(row.outcome)}`);
		return { row, agenda, ctx: this.store.context(row, agenda) };
	}

	private queued(): QueuedAgenda[] {
		return queueOrder(this.store.agendas(["open"]).map((agenda) => ({ agenda, rows: this.store.contexts(agenda) })));
	}

	private dispatch(cmd: string, args: Args): string {
		switch (cmd) {
			case "propose":
				return this.propose(args);
			case "revise":
				return this.revise(args);
			case "withdraw":
				return this.withdraw(args);
			case "vote":
				return this.vote(args);
			case "dispute":
				return this.dispute(args);
			case "arbitrate":
				return this.arbitrate(args);
			case "claim":
				return this.claim(args);
			case "rebut":
				return this.rebut(args);
			case "tally":
				return this.tally(args);
			case "queue":
				return this.queue(args);
			case "seat":
				return this.seat(args);
			case "status":
				return this.status(args);
			case "digest":
				return this.digest(args);
			default:
				return fail(`unknown command ${cmd}`);
		}
	}

	// ---- agenda lifecycle ------------------------------------------------------------------------

	private propose(args: Args): string {
		const as = one(args, "as");
		const seat = parseSeat(one(args, "seat"));
		if (!PROPOSER_SEATS.includes(seat)) fail(`${seat} has no right to open an agenda (D1-12 统一提案入口: ${PROPOSER_SEATS.join(", ")})`);
		this.checkSeat(seat, as);
		const proposal: Proposal = parseProposal(JSON.parse(one(args, "proposal")));
		const number = Number(this.store.meta("next_number") ?? this.firstNumber);
		this.store.setMeta("next_number", String(number + 1));
		const id = `D${number}`;
		this.store.db
			.query("INSERT INTO agenda(id,number,title,slug,priority,proposer_seat,proposer_agent,facts,state,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)")
			.run(id, number, proposal.title, proposal.slug, proposal.priority, seat, as, proposal.facts, "filing", now());
		proposal.rows.forEach((body, i) => {
			const rowId = `${id}-${String(i + 1).padStart(2, "0")}`;
			this.insertRowVersion(rowId, id, i + 1, 1, body, as, "初稿");
		});
		this.enqueue(id, { kind: "fileIssue" });
		return `${id} filed; the PM issue is being created. Seats receive vote.request once the issue exists.`;
	}

	private insertRowVersion(rowId: string, agenda: string, ord: number, version: number, body: RowBody, by: string, reasons: string): void {
		this.store.db
			.query(
				`INSERT INTO row(id,agenda,ord,version,what,where_,how,tradeoff,category,missing_design,domains,notify,outcome) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,NULL)
         ON CONFLICT(id) DO UPDATE SET version=excluded.version, what=excluded.what, where_=excluded.where_, how=excluded.how, tradeoff=excluded.tradeoff,
         category=excluded.category, missing_design=excluded.missing_design, domains=excluded.domains, notify=excluded.notify`,
			)
			.run(rowId, agenda, ord, version, body.what, body.where, body.how, body.tradeoff, body.category, body.missingDesign ? 1 : 0, JSON.stringify(body.domains), JSON.stringify(body.notify));
		this.store.db.query("INSERT INTO row_history(row,version,body,by_agent,reasons,at) VALUES(?,?,?,?,?,?)").run(rowId, version, JSON.stringify(body), by, reasons, now());
	}

	/** Outbox callback: the PM issue now exists, so the agenda opens and enters every seat's queue. */
	opened(agendaId: string, issue: number, projectItem: string): void {
		this.store.db.query("UPDATE agenda SET issue=?, project_item=?, state='open' WHERE id=?").run(issue, projectItem, agendaId);
		const a = this.store.agenda(agendaId)!;
		const fields = { issue: `PM#${issue}`, priority: a.priority, proposer: a.proposerSeat };
		// ArgonGovernance sees every agenda so it can claim governance-domain rows (review-claude-high-divergent CE1).
		this.emit({ to: "ArgonGovernance", kind: "agenda.opened", agenda: a.id, fields, summary: a.title, wake: true });
		for (const to of ["Main", "SoroiKeeperOpus", "SoroiKeeperGpt"]) this.emit({ to, kind: "agenda.opened", agenda: a.id, fields, summary: a.title, wake: false });
	}

	private revise(args: Args): string {
		const as = one(args, "as");
		const { row, agenda } = this.liveRow(one(args, "row"));
		this.checkSeat(agenda.proposerSeat, as);
		const body = parseRowBody(JSON.parse(one(args, "body")), row.id);
		const reasons = one(args, "reasons");
		const version = row.version + 1;
		this.insertRowVersion(row.id, agenda.id, row.ord, version, body, as, reasons);
		this.publish(agenda, `### ${row.id} 修订为 v${version}（${as}）\n\n该行 v${row.version} 的全部选票作废，资格席位需按 v${version} 重投。\n\n**修订说明：** ${reasons}\n\n${rowBodyMarkdown(body)}`);
		return `${row.id} revised to v${version}; votes on v${row.version} no longer count.`;
	}

	private withdraw(args: Args): string {
		const as = one(args, "as");
		const { row, agenda } = this.liveRow(one(args, "row"));
		this.checkSeat(agenda.proposerSeat, as);
		const reason = one(args, "reason");
		this.decide(agenda, row, { kind: "withdrawn", by: as, reason });
		return `${row.id} withdrawn.`;
	}

	// ---- voting ----------------------------------------------------------------------------------

	private vote(args: Args): string {
		const as = one(args, "as");
		const seat = parseSeat(one(args, "seat"));
		this.checkSeat(seat, as);
		const agenda = this.openAgenda(one(args, "agenda"));
		const choices = pairs(args, "row");
		if (choices.size === 0) fail("give at least one --row <row>=approve|oppose|veto");
		const counters = pairs(args, "counter");
		const cites = pairs(args, "cite");
		const classes = pairs(args, "class");
		const reasons = one(args, "reasons");
		const head = headFor(seat, this.queued());
		const entries: { row: Row; ballot: Pick<Ballot, "choice" | "classification"> }[] = [];
		for (const [rowId, raw] of choices) {
			const { row, ctx } = this.liveRow(rowId);
			if (row.agenda !== agenda.id) fail(`${rowId} does not belong to ${agenda.id}`);
			if (!eligibleSeats(ctx).includes(seat))
				fail(`${seat} is not an eligible seat on ${rowId}${seat === "ArgonGovernance" ? " (claim the governance domain first: council claim --domain governance)" : ""}`);
			const revote = currentBallots(ctx).has(seat);
			if (!revote && head?.agenda !== agenda.id)
				fail(`out of order: ${seat} must vote ${head?.agenda ?? "nothing"} first (P0→P3, same level by issue number; see council queue --seat ${seat})`);
			const choice = this.parseChoice(seat, raw, counters.get(rowId), cites.get(rowId), ctx);
			const classification = classes.has(rowId) ? parseCategory(classes.get(rowId)) : null;
			this.store.db
				.query("INSERT INTO ballot(row,version,seat,agent,choice,classification,reasons,at) VALUES(?,?,?,?,?,?,?,?)")
				.run(row.id, row.version, seat, as, JSON.stringify(choice), classification, reasons, now());
			entries.push({ row, ballot: { choice, classification } });
			if (seat === "Argon" && choice.kind === "veto" && effectiveCategory(ctx) !== "意图" && !row.missingDesign && ctx.arbitration === null)
				this.raiseDispute(agenda, row, as, `Argon 对标为“${row.category}”的行投出意图否决，即坚持该行属于意图（D1-17）。\n\n${reasons}`);
		}
		this.publish(agenda, ballotComment(agenda, seat, as, entries, reasons));
		return `${entries.length} ballot(s) recorded for ${seat} on ${agenda.id}.`;
	}

	private parseChoice(seat: SeatId, raw: string, counter: string | undefined, cite: string | undefined, ctx: RowContext): Choice {
		switch (raw) {
			case "approve":
				return { kind: "approve" };
			case "oppose":
				return counter !== undefined && counter.trim() !== ""
					? { kind: "oppose", counterexample: counter.trim() }
					: fail(`${ctx.row.id}: an oppose vote needs --counter ${ctx.row.id}=<reproducible counterexample> (D1-12)`);
			case "veto": {
				if (seat !== "Argon" && seat !== "ArgonGovernance") fail(`${seat} holds no veto; vote oppose with a counterexample instead`);
				if (cite === undefined) fail(`${ctx.row.id}: a veto must cite --cite ${ctx.row.id}=U<n>|session:<id>#<entry>${seat === "ArgonGovernance" ? "|fact:<evidence>" : ""} (D1-16); a provisional ruling goes into the reasons with approve/oppose`);
				const citation = parseCitation(cite!);
				if (seat === "Argon") {
					if (citation.kind === "blockingFact") fail(`${ctx.row.id}: Argon's intent veto must cite the user's words (U<n> or session:<id>#<entry>); a blocking fact belongs in an oppose counterexample`);
					const ruled = ctx.arbitration?.ruling;
					if (ruled !== undefined && ruled !== null && ruled.category !== "意图" && !ctx.row.missingDesign)
						fail(`${ctx.row.id}: LeadMentor ruled this row ${ruled.category}; an intent veto no longer applies`);
				}
				return { kind: "veto", citation };
			}
			default:
				return fail(`${ctx.row.id}: choice must be approve, oppose or veto`);
		}
	}

	private raiseDispute(agenda: Agenda, row: Row, by: string, reasons: string): void {
		this.store.db.query("INSERT INTO arbitration(row,version,raised_by,claimed,reasons,raised_at) VALUES(?,?,?,?,?,?)").run(row.id, row.version, by, "意图", reasons, now());
		this.emit({ to: "LeadMentor", kind: "arbitration.request", agenda: agenda.id, fields: { row: row.id, v: String(row.version), claimed: "意图", labelled: row.category }, summary: `${by} 坚持 ${row.id} 属于意图`, wake: true });
		this.publish(agenda, `### ${row.id} v${row.version} 分类争议\n\n${by} 主张该行属于“意图”（起草标为“${row.category}”），交 LeadMentor 终局仲裁（D1-17）。\n\n${reasons}`);
	}

	private dispute(args: Args): string {
		const as = one(args, "as");
		this.checkSeat("Argon", as);
		const { row, agenda, ctx } = this.liveRow(one(args, "row"));
		if (effectiveCategory(ctx) === "意图") fail(`${row.id} is already classified 意图`);
		if (ctx.arbitration !== null) fail(`${row.id} v${row.version} already has a classification dispute`);
		this.raiseDispute(agenda, row, as, one(args, "reasons"));
		return `classification dispute on ${row.id} sent to LeadMentor.`;
	}

	private arbitrate(args: Args): string {
		const as = one(args, "as");
		this.checkSeat("LeadMentor", as);
		const { row, agenda, ctx } = this.liveRow(one(args, "row"));
		const a = ctx.arbitration;
		if (a === null || a.ruling !== null) fail(`${row.id} v${row.version} has no pending classification dispute`);
		const category: Category = parseCategory(one(args, "category"));
		const reasons = one(args, "reasons");
		this.store.db.query("UPDATE arbitration SET ruling=? WHERE row=? AND version=?").run(JSON.stringify({ category, by: as, reasons, at: now() }), row.id, row.version);
		if (category !== "意图" && !row.missingDesign) {
			const veto = currentBallots(ctx).get("Argon");
			if (veto !== undefined && veto.choice.kind === "veto")
				this.store.db.query("UPDATE ballot SET voided=? WHERE id=?").run(`LeadMentor 裁定该行属于“${category}”，意图否决不适用`, veto.id);
		}
		this.emit({ to: "Argon", kind: "arbitration.ruled", agenda: agenda.id, fields: { row: row.id, v: String(row.version), category }, summary: `LeadMentor 裁定 ${row.id} 属于${category}`, wake: true });
		this.publish(agenda, `### ${row.id} v${row.version} 分类仲裁：${category}（LeadMentor ${as}）\n\n${reasons}`);
		return `${row.id} classified ${category}.`;
	}

	private claim(args: Args): string {
		const as = one(args, "as");
		const seat = parseSeat(one(args, "seat"));
		this.checkSeat(seat, as);
		const domainRaw = one(args, "domain");
		const domain = (DOMAINS as readonly string[]).includes(domainRaw) ? (domainRaw as Domain) : fail(`domain must be one of ${DOMAINS.join(", ")}`);
		if (!DOMAIN_CLAIMERS[domain].includes(seat)) fail(`${seat} cannot claim the ${domain} domain; claimers: ${DOMAIN_CLAIMERS[domain].join(", ")}`);
		const { row, agenda } = this.liveRow(one(args, "row"));
		const reasons = one(args, "reasons");
		this.store.db.query("INSERT INTO domain_claim(row,domain,seat,agent,reasons,at) VALUES(?,?,?,?,?,?) ON CONFLICT(row,domain) DO NOTHING").run(row.id, domain, seat, as, reasons, now());
		this.publish(agenda, `### ${row.id} 职能领域：${seat}（${as}）认定该行涉及“${domainNames[domain]}”\n\n${reasons}`);
		return `${row.id} now includes the ${domain} domain; eligible seats recomputed.`;
	}

	private rebut(args: Args): string {
		const as = one(args, "as");
		const { row, agenda, ctx } = this.liveRow(one(args, "row"));
		this.checkSeat(agenda.proposerSeat, as);
		const target = parseSeat(one(args, "target"));
		const ballot = currentBallots(ctx).get(target);
		if (ballot === undefined || ballot.choice.kind !== "oppose") fail(`${target} has no counting oppose ballot on ${row.id} v${row.version}`);
		const evidence = one(args, "evidence");
		this.store.db.query("INSERT INTO rebuttal(row,version,ballot,agent,evidence,at) VALUES(?,?,?,?,?,?)").run(row.id, row.version, ballot!.id, as, evidence, now());
		this.emit({ to: seatAddress(target), kind: "counter.rebutted", agenda: agenda.id, fields: { row: row.id, v: String(row.version), seat: target }, summary: `${as} 以源头实证反驳 ${target} 的反例`, wake: true });
		this.publish(agenda, `### ${row.id} v${row.version}：${as} 反驳 ${target} 的反例\n\n${evidence}\n\n反例只能由 ${target} 改投、发起人修订或撤回该行清零（D1-12）。`);
		return `rebuttal recorded and sent to ${target}.`;
	}

	// ---- evaluation ------------------------------------------------------------------------------

	private decide(agenda: Agenda, row: Row, outcome: Outcome): void {
		this.store.db.query("UPDATE row SET outcome=? WHERE id=?").run(JSON.stringify(outcome), row.id);
		const fields = { row: row.id, v: String(row.version), result: outcome.kind };
		const summary = `${row.what.slice(0, 60)}：${outcomeText(outcome).replaceAll("**", "")}`;
		if (outcome.kind === "passed") {
			const to = new Set(row.notify);
			if (row.domains.includes("design") || this.store.claims(row.id).some((c) => c.domain === "design")) to.add("Argon");
			for (const addr of to) this.emit({ to: addr, kind: "row.passed", agenda: agenda.id, fields, summary, wake: true });
			if (!to.has("Main")) this.emit({ to: "Main", kind: "row.passed", agenda: agenda.id, fields, summary, wake: false });
		} else {
			const proposer = seatAddress(agenda.proposerSeat);
			this.emit({ to: proposer, kind: `row.${outcome.kind}`, agenda: agenda.id, fields, summary, wake: proposer !== "Main" });
			if (proposer !== "Main") this.emit({ to: "Main", kind: `row.${outcome.kind}`, agenda: agenda.id, fields, summary, wake: false });
		}
		this.publish(agenda, rowOutcomeComment(row, outcome));
	}

	/** Re-evaluate every open row, emit transitions, close finished agendas, ring changed queue heads. */
	private settle(): void {
		for (const agenda of this.store.agendas(["open"])) {
			for (const ctx of this.store.contexts(agenda)) {
				const status = evaluateRow(ctx);
				if (status.kind === "decidable") this.decide(agenda, ctx.row, status.outcome);
				if (status.kind === "contested") {
					const key = `contested:${ctx.row.id}@${ctx.row.version}:${status.opposes.map((b) => b.id).join(",")}`;
					if (this.store.meta(key) === null) {
						this.store.setMeta(key, now());
						const proposer = seatAddress(agenda.proposerSeat);
						this.emit({ to: proposer, kind: "row.contested", agenda: agenda.id, fields: { row: ctx.row.id, v: String(ctx.row.version), by: status.opposes.map((b) => b.seat).join(",") }, summary: statusText(status), wake: true });
					}
				}
			}
			if (this.store.rows(agenda.id).every((r) => r.outcome !== null)) {
				this.store.db.query("UPDATE agenda SET state='decided' WHERE id=?").run(agenda.id);
				const decided = this.store.agenda(agenda.id)!;
				this.emit({ to: "Main", kind: "agenda.decided", agenda: agenda.id, fields: { issue: `PM#${decided.issue}` }, summary: decided.title, wake: false });
				this.enqueue(agenda.id, { kind: "finalize" });
				this.enqueue(agenda.id, { kind: "archive" });
			}
		}
		const queued = this.queued();
		for (const seat of SEATS) {
			const head = headFor(seat, queued);
			const prev = this.store.head(seat);
			const pending = head?.pending ?? [];
			const grew = pending.some((p) => !prev.pending.includes(p));
			if (head !== null && (head.agenda !== prev.agenda || grew)) {
				const a = this.store.agenda(head.agenda)!;
				this.emit({
					to: seatAddress(seat),
					kind: "vote.request",
					agenda: head.agenda,
					fields: { seat, rows: pending.join(","), priority: a.priority, issue: `PM#${a.issue}` },
					summary: a.title,
					wake: true,
				});
			}
			this.store.setHead(seat, head?.agenda ?? null, pending);
		}
	}

	/** Outbox callback after the archive commit lands. */
	archived(agendaId: string, paths: string[], commit: string): void {
		this.store.db.query("UPDATE agenda SET state='archived', archive_paths=?, archive_commit=? WHERE id=?").run(JSON.stringify(paths), commit, agendaId);
		const a = this.store.agenda(agendaId)!;
		const fields = { issue: `PM#${a.issue}`, commit: commit.slice(0, 12) };
		this.emit({ to: "Secretary", kind: "agenda.archived", agenda: agendaId, fields, summary: paths.join(","), wake: true });
		this.emit({ to: "Main", kind: "agenda.archived", agenda: agendaId, fields, summary: paths.join(","), wake: false });
	}

	// ---- reading ---------------------------------------------------------------------------------

	private tally(args: Args): string {
		const agenda = this.store.agenda(one(args, "agenda")) ?? fail("no such agenda");
		const out = [`${agenda.id} [${agenda.priority}] ${agenda.title} — ${agenda.state}${agenda.issue === null ? "" : ` (PM#${agenda.issue})`}`];
		for (const ctx of this.store.contexts(agenda)) {
			const eligible = eligibleSeats(ctx);
			const ballots = currentBallots(ctx);
			out.push(`  ${ctx.row.id} v${ctx.row.version} [${effectiveCategory(ctx)}${ctx.row.missingDesign ? ", 缺失设计" : ""}] eligible=${eligible.join(",")} threshold=${Math.ceil((3 * eligible.length) / 4)}`);
			for (const s of eligible) {
				const b = ballots.get(s);
				out.push(`    ${s.padEnd(16)} ${b === undefined ? "—" : `${b.choice.kind} by ${b.agent}${b.choice.kind === "oppose" ? `: ${b.choice.counterexample.split("\n")[0]}` : ""}`}`);
			}
			out.push(`    → ${statusText(evaluateRow(ctx)).replaceAll("**", "")}`);
		}
		return out.join("\n");
	}

	private queue(args: Args): string {
		const queued = this.queued();
		const seatRaw = opt(args, "seat");
		if (seatRaw === null)
			return queued.length === 0 ? "no open agendas" : queued.map((q) => `${q.agenda.priority} ${q.agenda.id} PM#${q.agenda.issue} ${q.agenda.title}`).join("\n");
		const seat = parseSeat(seatRaw);
		const head = headFor(seat, queued);
		return head === null ? `${seat}: nothing to vote` : `${seat}: vote ${head.agenda} now — rows ${head.pending.join(", ")}`;
	}

	private seat(args: Args): string {
		const action = one(args, "action");
		if (action === "list") return this.store.seats().map((s) => `${s.id.padEnd(16)} ${s.occupant ?? "(vacant)"}`).join("\n") + "\nCoordination     Main + governance-desk instances\nClaudeHigh       a fresh claude-high per agenda";
		const seat = parseSeat(one(args, "seat"));
		if (MAIN_ROUTED_SEATS.includes(seat)) fail(`${seat} has no standing occupant`);
		const as = one(args, "as");
		if (action === "enter") {
			const prev = this.store.occupant(seat);
			this.store.setOccupant(seat, as);
			this.emit({ to: "Main", kind: "seat.enter", agenda: null, fields: { seat, occupant: as, previous: prev ?? "-" }, summary: `${as} 进入 ${seat} 席`, wake: false });
			return `${as} now holds ${seat}.`;
		}
		if (action === "retire") {
			this.checkSeat(seat, as);
			this.store.setOccupant(seat, null);
			this.emit({ to: "Main", kind: "seat.retire", agenda: null, fields: { seat, occupant: as }, summary: `${as} 退出 ${seat} 席：${one(args, "reason")}`, wake: true });
			return `${as} retired from ${seat}.`;
		}
		return fail("seat action must be enter, retire or list");
	}

	private status(args: Args): string {
		const as = one(args, "as");
		const kindRaw = one(args, "kind");
		const kind = (STATUS_KINDS as readonly string[]).includes(kindRaw) ? (kindRaw as StatusKind) : fail(`kind must be one of ${STATUS_KINDS.join(", ")}`);
		const to = many(args, "to");
		if (kind === "dependency" && to.length === 0) fail("a dependency status needs --to <area manager> for each beneficiary");
		const text = one(args, "text");
		const r = this.store.db
			.query("INSERT INTO status(from_,kind,repo,worker,ref,to_,text,at) VALUES(?,?,?,?,?,?,?,?) RETURNING seq")
			.get(as, kind, opt(args, "repo"), opt(args, "worker"), opt(args, "ref"), JSON.stringify(to), text, now()) as { seq: number };
		const fields: Record<string, string> = { from: as, status: String(r.seq) };
		for (const k of ["repo", "worker", "ref"]) {
			const v = opt(args, k);
			if (v !== null) fields[k] = v;
		}
		const summary = text.split("\n")[0]!.slice(0, 120);
		const wakeMain = kind === "blocked" || kind === "all_done" || kind === "alert";
		this.emit({ to: "Main", kind: `status.${kind}`, agenda: null, fields, summary, wake: wakeMain });
		for (const addr of to) if (addr !== "Main") this.emit({ to: addr, kind: `status.${kind}`, agenda: null, fields, summary, wake: true });
		return `status #${r.seq} recorded.`;
	}

	private digest(args: Args): string {
		const reader = one(args, "reader");
		const after = this.store.cursor(reader);
		const events = this.store.eventsFor(reader, after);
		if (events.length === 0) return `${reader}: nothing new since #${after}`;
		if (args.peek !== true) this.store.setCursor(reader, events.at(-1)!.seq);
		const lines = [`${reader}: ${events.length} event(s) after #${after}${args.peek === true ? " (peek, cursor unchanged)" : ""}`];
		const byWake = [...events.filter((e) => e.wake), ...events.filter((e) => !e.wake)];
		for (const e of byWake) {
			lines.push(`${e.wake ? "!" : " "} #${e.seq} ${e.at} ${e.kind} ${e.agenda ?? "-"} ${Object.entries(e.fields).map(([k, v]) => `${k}=${v}`).join(" ")} | ${e.summary}`);
			if (e.kind.startsWith("status.")) {
				const s = this.store.status(Number(e.fields.status));
				if (s !== null) lines.push(...s.text.split("\n").map((l) => `      ${l}`));
			}
		}
		return lines.join("\n");
	}
}
