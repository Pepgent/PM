// Counting and routing rules, exercised through the real command handlers on an in-memory database.
import { describe, expect, test } from "bun:test";
import { type Args, Council } from "../src/council.ts";
import type { CouncilEvent, RowBody } from "../src/domain.ts";
import { InputError } from "../src/domain.ts";
import { openStore, Store } from "../src/store.ts";
import { thresholdFor } from "../src/tally.ts";

const row = (over: Partial<RowBody> = {}): RowBody => ({
	what: "w",
	where: "x",
	how: "h",
	tradeoff: "t",
	category: "技术",
	missingDesign: false,
	domains: [],
	notify: [],
	...over,
});

class Harness {
	readonly store = new Store(openStore(":memory:"));
	readonly council = new Council(this.store, 25);
	private issue = 100;
	events: CouncilEvent[] = [];

	run(cmd: string, args: Args): string {
		const r = this.council.run(cmd, args);
		this.events.push(...r.events);
		return r.text;
	}
	/** Propose and simulate the outbox filing the PM issue. */
	propose(seat: string, as: string, rows: RowBody[], priority = "P1"): string {
		this.run("propose", { as, seat, proposal: JSON.stringify({ title: "t", slug: "s", priority, facts: "f", rows }) });
		const id = this.store.agendas(["filing"])[0]!.id;
		this.events.push(...this.council.transact(() => this.council.opened(id, this.issue++, "ITEM")));
		return id;
	}
	vote(agenda: string, seat: string, as: string, rows: Record<string, string>, extra: Args = {}): string {
		return this.run("vote", { agenda, seat, as, row: Object.entries(rows).map(([r, c]) => `${r}=${c}`), reasons: "r", ...extra });
	}
	outcome(rowId: string): string | null {
		const o = this.store.row(rowId)!.outcome;
		return o === null ? null : o.kind === "rejected" ? `rejected:${o.reason}` : o.kind;
	}
	wakes(to: string, kind: string): CouncilEvent[] {
		return this.events.filter((e) => e.to === to && e.kind === kind && e.wake);
	}
}

const rejects = (fn: () => unknown, pattern: RegExp): void => {
	try {
		fn();
	} catch (e) {
		expect(e).toBeInstanceOf(InputError);
		expect((e as Error).message).toMatch(pattern);
		return;
	}
	throw new Error("expected InputError");
};

describe("threshold", () => {
	test("≥ 3/4 of participating seats", () => {
		expect([4, 5, 6, 7].map(thresholdFor)).toEqual([3, 4, 5, 6]);
	});
});

describe("four-seat row", () => {
	test("passes with 4/4 after every eligible seat voted, and notifies on the row, not the agenda", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row({ notify: ["AreaMgrSoroi"] }), row()]);
		h.vote(d, "Coordination", "Main", { [`${d}-01`]: "approve" });
		h.vote(d, "ClaudeHigh", "ClaudeHighD25", { [`${d}-01`]: "approve" });
		h.vote(d, "Argon", "Argon", { [`${d}-01`]: "approve" });
		expect(h.outcome(`${d}-01`)).toBeNull();
		h.vote(d, "LeadMentor", "LeadMentor", { [`${d}-01`]: "approve" });
		expect(h.outcome(`${d}-01`)).toBe("passed");
		expect(h.wakes("AreaMgrSoroi", "row.passed")).toHaveLength(1);
		expect(h.store.agenda(d)!.state).toBe("open");
	});

	test("3/4 passes, 2/4 rejected by threshold", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row(), row()]);
		const r1 = `${d}-01`;
		const r2 = `${d}-02`;
		h.vote(d, "Coordination", "Main", { [r1]: "approve", [r2]: "approve" });
		h.vote(d, "ClaudeHigh", "CH", { [r1]: "approve", [r2]: "approve" });
		h.vote(d, "Argon", "Argon", { [r1]: "approve", [r2]: "oppose" }, { counter: [`${r2}=c`] });
		h.vote(d, "LeadMentor", "LeadMentor", { [r1]: "oppose", [r2]: "oppose" }, { counter: [`${r1}=c`, `${r2}=c`] });
		expect(h.outcome(r1)).toBeNull(); // contested: a counterexample stands
		h.vote(d, "LeadMentor", "LeadMentor", { [r1]: "approve" });
		expect(h.outcome(r1)).toBe("passed");
		h.vote(d, "Argon", "Argon", { [r2]: "approve" });
		h.vote(d, "LeadMentor", "LeadMentor", { [r2]: "approve" });
		expect(h.outcome(r2)).toBe("passed");
		expect(h.store.agenda(d)!.state).toBe("decided");
	});

	test("oppose needs a counterexample; contested wakes the proposer; rebut wakes the opposer", () => {
		const h = new Harness();
		const d = h.propose("Argon", "Argon", [row()]);
		const r = `${d}-01`;
		rejects(() => h.vote(d, "ClaudeHigh", "CH", { [r]: "oppose" }), /counterexample/);
		h.vote(d, "ClaudeHigh", "CH", { [r]: "oppose" }, { counter: [`${r}=steps`] });
		expect(h.wakes("Argon", "row.contested")).toHaveLength(1);
		h.run("rebut", { row: r, as: "Argon", target: "ClaudeHigh", evidence: "source shows" });
		expect(h.wakes("Main", "counter.rebutted")).toHaveLength(1); // ClaudeHigh is routed to Main
	});
});

describe("revision", () => {
	test("voids the row's votes and re-requests every eligible seat, including seats added by the revision", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row()]);
		const r = `${d}-01`;
		h.vote(d, "Coordination", "Main", { [r]: "approve" });
		h.vote(d, "ClaudeHigh", "CH", { [r]: "oppose" }, { counter: [`${r}=c`] });
		const before = h.events.length;
		h.run("revise", { row: r, as: "Main", body: JSON.stringify(row({ domains: ["governance"] })), reasons: "fix" });
		const requests = h.events.slice(before).filter((e) => e.kind === "vote.request");
		// Every eligible seat owes a vote on v2: the two who voted v1, the two who had not (their pending row changed), and ArgonGovernance (added).
		expect(requests.map((e) => e.fields.seat).sort()).toEqual(["Argon", "ArgonGovernance", "ClaudeHigh", "Coordination", "LeadMentor"]);
		for (const s of ["Coordination", "ClaudeHigh", "Argon", "LeadMentor"]) h.vote(d, s, s === "ClaudeHigh" || s === "Coordination" ? "x" : s, { [r]: "approve" });
		expect(h.outcome(r)).toBeNull(); // five seats now; ArgonGovernance still to vote
		h.vote(d, "ArgonGovernance", "ArgonGovernance", { [r]: "approve" });
		expect(h.outcome(r)).toBe("passed");
	});
});

describe("eligibility by functional domain", () => {
	test("ArgonGovernance claims a technically labelled row and vetoes it", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row({ category: "实现" })]);
		const r = `${d}-01`;
		expect(h.wakes("ArgonGovernance", "agenda.opened")).toHaveLength(1);
		rejects(() => h.vote(d, "ArgonGovernance", "ArgonGovernance", { [r]: "veto" }, { cite: [`${r}=U84`] }), /not an eligible seat/);
		h.run("claim", { row: r, as: "ArgonGovernance", seat: "ArgonGovernance", domain: "governance", reasons: "adds an acceptance gate" });
		h.vote(d, "ArgonGovernance", "ArgonGovernance", { [r]: "veto" }, { cite: [`${r}=fact:gate blocks W-07`] });
		expect(h.outcome(r)).toBe("rejected:veto");
	});

	test("global architecture rows add both panorama seats regardless of proposer (6 seats, threshold 5)", () => {
		const h = new Harness();
		const d = h.propose("Argon", "Argon", [row({ domains: ["globalArchitecture"] })]);
		const r = `${d}-01`;
		for (const s of ["Coordination", "ClaudeHigh", "Argon", "LeadMentor", "SoroiKeeperOpus"]) h.vote(d, s, ["Coordination", "ClaudeHigh"].includes(s) ? "x" : s, { [r]: "approve" });
		expect(h.outcome(r)).toBeNull();
		h.vote(d, "SoroiKeeperGpt", "SoroiKeeperGpt", { [r]: "approve" });
		expect(h.outcome(r)).toBe("passed");
	});

	test("a proposing department votes on every row of its agenda", () => {
		const h = new Harness();
		const d = h.propose("OmompOptimizer", "OmompOptimizer", [row()]);
		const r = `${d}-01`;
		for (const s of ["Coordination", "ClaudeHigh", "Argon", "LeadMentor"]) h.vote(d, s, ["Coordination", "ClaudeHigh"].includes(s) ? "x" : s, { [r]: "approve" });
		expect(h.outcome(r)).toBeNull();
		h.vote(d, "OmompOptimizer", "OmompOptimizer", { [r]: "approve" });
		expect(h.outcome(r)).toBe("passed");
	});

	test("propose checks the right to open an agenda", () => {
		const h = new Harness();
		rejects(() => h.run("propose", { as: "LeadMentor", seat: "LeadMentor", proposal: "{}" }), /no right to open/);
		rejects(() => h.run("propose", { as: "x", seat: "ClaudeHigh", proposal: "{}" }), /no right to open/);
	});
});

describe("veto evidence and classification disputes", () => {
	test("Argon's intent veto must cite the user's words; a blocking fact is refused", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row({ category: "意图" })]);
		const r = `${d}-01`;
		rejects(() => h.vote(d, "Argon", "Argon", { [r]: "veto" }), /must cite/);
		rejects(() => h.vote(d, "Argon", "Argon", { [r]: "veto" }, { cite: [`${r}=fact:x`] }), /user's words/);
		h.vote(d, "Argon", "Argon", { [r]: "veto" }, { cite: [`${r}=U11`] });
		expect(h.outcome(r)).toBe("rejected:veto");
	});

	test("a veto on a technical row raises arbitration at once; ruling 技术 voids it and asks Argon again", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row({ category: "技术" })]);
		const r = `${d}-01`;
		h.vote(d, "Argon", "Argon", { [r]: "veto" }, { cite: [`${r}=U1`] });
		expect(h.wakes("LeadMentor", "arbitration.request")).toHaveLength(1);
		expect(h.outcome(r)).toBeNull();
		const before = h.events.length;
		h.run("arbitrate", { row: r, as: "LeadMentor", category: "技术", reasons: "wire type" });
		expect(h.events.slice(before).some((e) => e.kind === "vote.request" && e.fields.seat === "Argon")).toBe(true);
		for (const s of ["Coordination", "ClaudeHigh", "Argon", "LeadMentor"]) h.vote(d, s, ["Coordination", "ClaudeHigh"].includes(s) ? "x" : s, { [r]: "approve" });
		expect(h.outcome(r)).toBe("passed");
	});

	test("ruling 意图 upholds the veto", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row({ category: "技术" })]);
		const r = `${d}-01`;
		h.vote(d, "Argon", "Argon", { [r]: "veto" }, { cite: [`${r}=U1`] });
		h.run("arbitrate", { row: r, as: "LeadMentor", category: "意图", reasons: "user intent" });
		expect(h.outcome(r)).toBe("rejected:veto");
	});

	test("Argon can dispute the classification without vetoing", () => {
		const h = new Harness();
		const d = h.propose("Coordination", "Main", [row({ category: "技术" })]);
		h.run("dispute", { row: `${d}-01`, as: "Argon", reasons: "this is intent" });
		expect(h.wakes("LeadMentor", "arbitration.request")).toHaveLength(1);
	});
});

describe("queue order and routing", () => {
	test("a seat must vote its head agenda first (P0 before P1); revotes are always accepted", () => {
		const h = new Harness();
		const p1 = h.propose("Coordination", "Main", [row()], "P1");
		const p0 = h.propose("Coordination", "Main", [row()], "P0");
		rejects(() => h.vote(p1, "LeadMentor", "LeadMentor", { [`${p1}-01`]: "approve" }), /out of order/);
		h.vote(p0, "LeadMentor", "LeadMentor", { [`${p0}-01`]: "oppose" }, { counter: [`${p0}-01=c`] });
		h.vote(p1, "LeadMentor", "LeadMentor", { [`${p1}-01`]: "approve" });
		h.vote(p0, "LeadMentor", "LeadMentor", { [`${p0}-01`]: "approve" });
	});

	test("ClaudeHigh and Coordination doorbells go to Main; standing seats to themselves", () => {
		const h = new Harness();
		h.propose("Coordination", "Main", [row()]);
		const req = h.events.filter((e) => e.kind === "vote.request");
		expect(req.filter((e) => e.to === "Main").map((e) => e.fields.seat).sort()).toEqual(["ClaudeHigh", "Coordination"]);
		expect(req.filter((e) => e.to !== "Main").map((e) => e.to).sort()).toEqual(["Argon", "LeadMentor"]);
	});

	test("the doorbell rings when the head changes, not for every new agenda", () => {
		const h = new Harness();
		h.propose("Coordination", "Main", [row()], "P1");
		h.propose("Coordination", "Main", [row()], "P2");
		expect(h.events.filter((e) => e.kind === "vote.request" && e.to === "Argon")).toHaveLength(1);
		h.propose("Coordination", "Main", [row()], "P0");
		expect(h.events.filter((e) => e.kind === "vote.request" && e.to === "Argon")).toHaveLength(2);
	});

	test("status routing: progress goes to Main's digest only; blocked wakes Main; dependency wakes the beneficiary", () => {
		const h = new Harness();
		h.run("status", { as: "AreaMgrSoroi", kind: "progress", text: "W-07 PR opened" });
		h.run("status", { as: "AreaMgrSoroi", kind: "blocked", text: "W-07 BLOCKED" });
		h.run("status", { as: "AreaMgrStore", kind: "dependency", to: ["AreaMgrSoroi"], text: "store PR merged" });
		expect(h.events.filter((e) => e.to === "Main").map((e) => `${e.kind}:${e.wake}`)).toEqual(["status.progress:false", "status.blocked:true", "status.dependency:false"]);
		expect(h.wakes("AreaMgrSoroi", "status.dependency")).toHaveLength(1);
		const digest = h.run("digest", { reader: "Main" });
		expect(digest).toContain("W-07 BLOCKED");
		expect(h.run("digest", { reader: "Main" })).toContain("nothing new");
	});

	test("seat enter goes to digest; retire wakes Main; votes need the occupant", () => {
		const h = new Harness();
		h.run("seat", { action: "enter", seat: "Argon", as: "ArgonSol" });
		h.run("seat", { action: "retire", seat: "Argon", as: "ArgonSol", reason: "429 over" });
		expect(h.events.map((e) => `${e.kind}:${e.wake}`)).toEqual(["seat.enter:false", "seat.retire:true"]);
		const d = h.propose("Coordination", "Main", [row()]);
		rejects(() => h.vote(d, "Argon", "Argon", { [`${d}-01`]: "approve" }), /no occupant/);
	});
});
