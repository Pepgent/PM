// Markdown published to GitHub: issue title/body, comments and archive files. All derived from the store.
import { type Agenda, type Ballot, type Choice, choiceLabel, citationText, type Outcome, type Row, SEATS, type SeatId } from "./domain.ts";
import type { Store } from "./store.ts";
import { currentBallots, effectiveCategory, effectiveDomains, eligibleSeats, evaluateRow, type RowContext, type RowStatus, thresholdFor } from "./tally.ts";

const cell = (s: string): string => s.replaceAll("|", "\\|").replaceAll("\r", "").replaceAll("\n", "<br>");

export const issueTitle = (agenda: Agenda, prefix: string): string => `${prefix}[${agenda.priority}] ${agenda.id}：${agenda.title}`;

export const outcomeText = (o: Outcome): string => {
	switch (o.kind) {
		case "passed":
			return `**通过** ${o.approve.length}/${o.eligible.length}（门槛 ${o.threshold}）`;
		case "rejected":
			return o.reason === "veto"
				? `**否决**：${o.seat}（${citationText(o.citation)}）`
				: `**未通过** ${o.approve.length}/${o.eligible.length}（门槛 ${o.threshold}）`;
		case "withdrawn":
			return `**撤回**（${o.by}：${o.reason}）`;
	}
};

export const statusText = (s: RowStatus): string => {
	switch (s.kind) {
		case "terminal":
		case "decidable":
			return outcomeText(s.outcome);
		case "disputed":
			return `分类争议待 LeadMentor 仲裁（${s.arbitration.raisedBy} 主张“${s.arbitration.claimed}”）；未投：${s.missing.join("、") || "无"}`;
		case "contested":
			return `有效反例未清零：${s.opposes.map((b) => b.seat).join("、")}；未投：${s.missing.join("、") || "无"}`;
		case "voting":
			return `投票中；未投：${s.missing.join("、")}`;
	}
};

const choiceCell = (c: Choice): string => (c.kind === "veto" ? `否决（${citationText(c.citation)}）` : choiceLabel(c));

const votesCell = (ctx: RowContext): string => {
	const ballots = currentBallots(ctx);
	return eligibleSeats(ctx)
		.map((s) => {
			const b = ballots.get(s);
			return `${s}${b === undefined ? "：未投" : `（${b.agent}）：${choiceCell(b.choice)}`}`;
		})
		.join("<br>");
};

export const domainNames: Record<string, string> = { governance: "组织治理", globalArchitecture: "全局产品架构", design: "设计正文" };

export const issueBody = (store: Store, agenda: Agenda): string => {
	const ctxs = store.contexts(agenda);
	const lines = [
		`> 本 issue 由议会 daemon（Pepgent/PM \`tools/council\`）生成与维护，正文禁止手改；投票与修订一律经 \`council\` 命令。`,
		"",
		`**发起：** ${agenda.proposerSeat}（${agenda.proposerAgent}）　**优先级：** ${agenda.priority}　**状态：** ${agenda.state}`,
		"",
		"## 事实",
		"",
		agenda.facts,
		"",
		"## 决策项表",
		"",
		"| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 职能领域 | 票 | 结果 |",
		"|---|---|---|---|---|---|---|---|---|---|",
		...ctxs.map((ctx) => {
			const r = ctx.row;
			const category = effectiveCategory(ctx);
			const domains = [...effectiveDomains(ctx)].map((d) => domainNames[d]).join("、") || "—";
			return `| ${r.id} v${r.version} | ${cell(r.what)} | ${cell(r.where)} | ${cell(r.how)} | ${cell(r.tradeoff)} | ${category}${category !== r.category ? `（仲裁改判，原标 ${r.category}）` : ""} | ${r.missingDesign ? "是" : "否"} | ${domains} | ${votesCell(ctx)} | ${cell(statusText(evaluateRow(ctx)))} |`;
		}),
		"",
		"## 计票规则",
		"",
		"依 pepgent-soroi `AGENTS.md` D1-12（C2-3）、D1-16、D1-17：逐行投票；资格席位为协调、ClaudeHigh、Argon、LeadMentor，组织治理领域的行加 ArgonGovernance，全局产品架构领域的行加 SoroiKeeperOpus 与 SoroiKeeperGpt，独立部门发起的议程其发起席参投每一行；资格席位全部投完后，赞成数 ≥ ⌈3/4 × 资格席位数⌉ 且无有效否决、无未清零的反例即通过。修订某行后该行旧票作废重投。原票全文见本 issue 评论。",
	];
	return lines.join("\n");
};

const classificationLine = (b: { classification: string | null }): string => (b.classification === null ? "" : `；分类意见：${b.classification}`);

export const ballotComment = (agenda: Agenda, seat: SeatId, agent: string, entries: { row: Row; ballot: Pick<Ballot, "choice" | "classification"> }[], reasons: string): string =>
	[
		`### 选票：${seat}（${agent}）`,
		"",
		...entries.map(({ row, ballot }) => {
			const c = ballot.choice;
			const detail = c.kind === "oppose" ? `\n  - 反例：${c.counterexample.replaceAll("\n", "\n    ")}` : c.kind === "veto" ? `\n  - 引用：${citationText(c.citation)}` : "";
			return `- **${row.id} v${row.version}：${choiceLabel(c)}**${classificationLine(ballot)}${detail}`;
		}),
		"",
		"#### 理由",
		"",
		reasons,
		"",
		`<sub>议程 ${agenda.id}；由议会 daemon 记录。</sub>`,
	].join("\n");

export const rowBodyMarkdown = (r: Pick<Row, "what" | "where" | "how" | "tradeoff" | "category" | "missingDesign" | "domains" | "notify">): string =>
	[
		`- what：${r.what}`,
		`- where：${r.where}`,
		`- how：${r.how}`,
		`- 取舍：${r.tradeoff}`,
		`- 分类：${r.category}；缺失部分或设计补充：${r.missingDesign ? "是" : "否"}；职能领域：${r.domains.map((d) => domainNames[d]).join("、") || "—"}；通过后通知：${r.notify.join("、") || "—"}`,
	].join("\n");

export const rowOutcomeComment = (row: Row, outcome: Outcome): string => `### ${row.id} v${row.version} 结果：${outcomeText(outcome)}`;

const seatFileBallots = (store: Store, agenda: Agenda, seat: SeatId): Ballot[] => store.agendaBallots(agenda.id).filter((b) => b.seat === seat);

export const voteFile = (store: Store, agenda: Agenda, seat: SeatId): string => {
	const ballots = seatFileBallots(store, agenda, seat);
	const rows = new Map(store.rows(agenda.id).map((r) => [r.id, r]));
	return [
		`# ${agenda.id} 选票：${seat}`,
		"",
		`议程：${agenda.title}（[PM#${agenda.issue}](https://github.com/Pepgent/PM/issues/${agenda.issue})）。本文件由议会 daemon 从原票生成，按投票先后排列；“作废”标注该票因修订或仲裁不再计入。`,
		"",
		...ballots.map((b) => {
			const c = b.choice;
			const row = rows.get(b.row)!;
			const voided = b.voided ?? (b.version !== row.version ? `该行已修订到 v${row.version}` : null);
			return [
				`## ${b.row} v${b.version}：${choiceLabel(c)}（${b.agent}，${b.at}）${voided === null ? "" : `——作废：${voided}`}`,
				"",
				c.kind === "oppose" ? `**反例：** ${c.counterexample}\n` : c.kind === "veto" ? `**引用：** ${citationText(c.citation)}\n` : "",
				b.classification === null ? "" : `**分类意见：** ${b.classification}\n`,
				b.reasons,
				"",
			].join("\n");
		}),
	].join("\n");
};

export const decisionFile = (store: Store, agenda: Agenda): string => {
	const ctxs = store.contexts(agenda);
	const history = ctxs.flatMap((ctx) =>
		store.rowHistory(ctx.row.id).filter((h) => h.version > 1).map((h) => `- ${ctx.row.id} v${h.version}（${h.by}，${h.at}）：${h.reasons}`),
	);
	const arbitrations = ctxs.flatMap((ctx) =>
		store.arbitrations(ctx.row.id).map((a) => `- ${ctx.row.id} v${a.version}：${a.raisedBy} 主张“${a.claimed}”；${a.ruling === null ? "未仲裁" : `LeadMentor（${a.ruling.by}）裁定“${a.ruling.category}”：${a.ruling.reasons}`}`),
	);
	const rebuttals = ctxs.flatMap((ctx) =>
		store.rebuttals(ctx.row.id).map((r) => {
			const b = store.ballot(r.ballot)!;
			return `- ${ctx.row.id} v${r.version}：${r.agent} 反驳 ${b.seat} 的反例：${r.evidence}`;
		}),
	);
	const seats = SEATS.filter((s) => store.agendaBallots(agenda.id).some((b) => b.seat === s));
	return [
		`# ${agenda.id}：${agenda.title}（${agenda.priority}）——定稿`,
		"",
		`决策 issue：[PM#${agenda.issue}](https://github.com/Pepgent/PM/issues/${agenda.issue})。发起：${agenda.proposerSeat}（${agenda.proposerAgent}）。本文件由议会 daemon 生成。`,
		"",
		"## 事实",
		"",
		agenda.facts,
		"",
		"## 决策项表",
		"",
		"| ID | what | where | how | 取舍 | 分类 | 缺失部分或设计补充? | 票 | 结果 |",
		"|---|---|---|---|---|---|---|---|---|",
		...ctxs.map((ctx) => {
			const r = ctx.row;
			return `| ${r.id} v${r.version} | ${cell(r.what)} | ${cell(r.where)} | ${cell(r.how)} | ${cell(r.tradeoff)} | ${effectiveCategory(ctx)} | ${r.missingDesign ? "是" : "否"} | ${votesCell(ctx)} | ${cell(statusText(evaluateRow(ctx)))} |`;
		}),
		"",
		"## 修订、仲裁与反例处置",
		"",
		...(history.length + arbitrations.length + rebuttals.length === 0 ? ["无。"] : [...history, ...arbitrations, ...rebuttals]),
		"",
		"## 原票",
		"",
		`各席原票见 ${seats.map((s) => `\`votes/${agenda.id}-${s}.md\``).join("、")}。门槛：资格席位数的 3/4 向上取整（4 席为 ${thresholdFor(4)}，5 席为 ${thresholdFor(5)}，6 席为 ${thresholdFor(6)}）。`,
	].join("\n");
};
