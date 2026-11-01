// Outbox executor: performs queued GitHub work in order, as the gh-authenticated account (RiriAgent).
import type { Config } from "./config.ts";
import type { Council } from "./council.ts";
import { SEATS } from "./domain.ts";
import { decisionFile, issueBody, issueTitle, voteFile } from "./render.ts";
import type { OutboxItem, Store } from "./store.ts";
import type { CouncilEvent } from "./domain.ts";

const gh = async (args: string[], input?: string): Promise<string> => {
	const proc = Bun.spawn(["gh", ...args], {
		stdin: input === undefined ? "ignore" : new Response(input),
		stdout: "pipe",
		stderr: "pipe",
	});
	const [out, err, code] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text(), proc.exited]);
	if (code !== 0) throw new Error(`gh ${args.slice(0, 3).join(" ")} exited ${code}: ${err.trim()}`);
	return out.trim();
};

const api = async <T>(path: string, method: "GET" | "POST" | "PATCH", body?: unknown): Promise<T> =>
	JSON.parse(await gh(["api", "-X", method, path, ...(body === undefined ? [] : ["--input", "-"])], body === undefined ? undefined : JSON.stringify(body))) as T;

export class Outbox {
	private running = false;
	private again = false;

	constructor(
		private readonly store: Store,
		private readonly council: Council,
		private readonly config: Config,
		private readonly deliver: (events: CouncilEvent[]) => void,
		private readonly log: (line: string) => void,
	) {}

	/** Run pending items in order until the queue is empty or an item fails (retried on the next kick). */
	kick(): void {
		if (this.running) {
			this.again = true;
			return;
		}
		this.running = true;
		void this.drain().finally(() => {
			this.running = false;
			if (this.again) {
				this.again = false;
				this.kick();
			}
		});
	}

	private async drain(): Promise<void> {
		for (;;) {
			const pending = this.store.pendingOutbox();
			const item = pending[0];
			if (item === undefined) return;
			// A body render is superseded by any later render of the same agenda.
			if (item.op.kind === "renderBody" && pending.slice(1).some((p) => p.agenda === item.agenda && (p.op.kind === "renderBody" || p.op.kind === "finalize"))) {
				this.done(item, "superseded");
				continue;
			}
			try {
				const result = await this.execute(item);
				this.done(item, result);
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				this.store.db.query("UPDATE outbox SET attempts=attempts+1, last_error=? WHERE seq=?").run(message, item.seq);
				this.log(`outbox #${item.seq} ${item.op.kind} ${item.agenda} failed: ${message}`);
				return;
			}
		}
	}

	private done(item: OutboxItem, result: string): void {
		this.store.db.query("UPDATE outbox SET done_at=?, result=?, attempts=attempts+1, last_error=NULL WHERE seq=?").run(new Date().toISOString(), result, item.seq);
		this.log(`outbox #${item.seq} ${item.op.kind} ${item.agenda}: ${result}`);
	}

	private async execute(item: OutboxItem): Promise<string> {
		const agenda = this.store.agenda(item.agenda)!;
		const repo = this.config.repo;
		switch (item.op.kind) {
			case "fileIssue": {
				// Each step records its result before the next, so a retry continues instead of filing twice.
				let issue = agenda.issue;
				if (issue === null) {
					const url = await gh(
						["issue", "create", "-R", repo, "--title", issueTitle(agenda, this.config.titlePrefix), "--body-file", "-", ...(this.config.label === null ? [] : ["--label", this.config.label])],
						issueBody(this.store, agenda),
					);
					issue = Number(url.slice(url.lastIndexOf("/") + 1));
					this.store.db.query("UPDATE agenda SET issue=? WHERE id=?").run(issue, agenda.id);
				}
				const projectItem = agenda.projectItem ?? (await this.projectItem(issue));
				this.store.db.query("UPDATE agenda SET project_item=? WHERE id=?").run(projectItem, agenda.id);
				await this.setStatus(projectItem, this.config.statusInProgress);
				const filed = issue;
				this.deliver(this.council.transact(() => this.council.opened(agenda.id, filed, projectItem)));
				// Re-render now that the agenda is open, so the body shows its state.
				await gh(["issue", "edit", String(issue), "-R", repo, "--body-file", "-"], issueBody(this.store, this.store.agenda(agenda.id)!));
				return `PM#${issue}`;
			}
			case "comment":
				return gh(["issue", "comment", String(agenda.issue), "-R", repo, "--body-file", "-"], item.op.body);
			case "renderBody":
				await gh(["issue", "edit", String(agenda.issue), "-R", repo, "--body-file", "-"], issueBody(this.store, agenda));
				return "body rendered";
			case "finalize": {
				await gh(["issue", "comment", String(agenda.issue), "-R", repo, "--body-file", "-"], `## ${agenda.id} 已定案\n\n全部决策项已有结果，见正文决策项表。定稿与原票随后由议会 daemon 归档到 \`${this.config.archiveRoot}/\`。`);
				await gh(["issue", "edit", String(agenda.issue), "-R", repo, "--body-file", "-"], issueBody(this.store, agenda));
				// Project #1's workflow closes the issue when Status becomes Done (feasibility §2); close only if still open.
				await this.setStatus(agenda.projectItem!, this.config.statusDone);
				const state = await gh(["issue", "view", String(agenda.issue), "-R", repo, "--json", "state", "--jq", ".state"]);
				if (state === "OPEN") await gh(["issue", "close", String(agenda.issue), "-R", repo]);
				return `status Done; issue was ${state}`;
			}
			case "archive":
				return this.archive(agenda.id);
		}
	}

	/** Project #1 auto-adds new PM issues; reuse that item, and add the issue only when it is not there yet. */
	private async projectItem(issue: number): Promise<string> {
		const [owner, name] = this.config.repo.split("/");
		const query = "query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){issue(number:$n){projectItems(first:20){nodes{id project{number}}}}}}";
		const res = JSON.parse(await gh(["api", "graphql", "-f", `query=${query}`, "-f", `o=${owner}`, "-f", `r=${name}`, "-F", `n=${issue}`])) as {
			data: { repository: { issue: { projectItems: { nodes: { id: string; project: { number: number } }[] } } } };
		};
		const existing = res.data.repository.issue.projectItems.nodes.find((n) => n.project.number === this.config.projectNumber);
		if (existing !== undefined) return existing.id;
		return gh(["project", "item-add", String(this.config.projectNumber), "--owner", this.config.projectOwner, "--url", `https://github.com/${this.config.repo}/issues/${issue}`, "--format", "json", "--jq", ".id"]);
	}

	private setStatus(projectItem: string, option: string): Promise<string> {
		return gh(["project", "item-edit", "--project-id", this.config.projectId, "--id", projectItem, "--field-id", this.config.statusFieldId, "--single-select-option-id", option]);
	}

	/** One commit on the branch with the decision file and every seat's ballot file (Git Data API, no checkout). */
	private async archive(agendaId: string): Promise<string> {
		const agenda = this.store.agenda(agendaId)!;
		const root = this.config.archiveRoot;
		const ballots = this.store.agendaBallots(agenda.id);
		const files = [
			{ path: `${root}/decisions/${agenda.id}-${agenda.slug}.md`, content: decisionFile(this.store, agenda) },
			...SEATS.filter((s) => ballots.some((b) => b.seat === s)).map((s) => ({ path: `${root}/votes/${agenda.id}-${s}.md`, content: voteFile(this.store, agenda, s) })),
		];
		const repo = `repos/${this.config.repo}`;
		const ref = await api<{ object: { sha: string } }>(`${repo}/git/ref/heads/${this.config.branch}`, "GET");
		const parent = await api<{ tree: { sha: string } }>(`${repo}/git/commits/${ref.object.sha}`, "GET");
		const tree = await api<{ sha: string }>(`${repo}/git/trees`, "POST", {
			base_tree: parent.tree.sha,
			tree: files.map((f) => ({ path: f.path, mode: "100644", type: "blob", content: f.content })),
		});
		const commit = await api<{ sha: string }>(`${repo}/git/commits`, "POST", {
			message: `council(${agenda.id}): archive decision and ballots for PM#${agenda.issue}`,
			tree: tree.sha,
			parents: [ref.object.sha],
		});
		await api(`${repo}/git/refs/heads/${this.config.branch}`, "PATCH", { sha: commit.sha, force: false });
		const paths = files.map((f) => f.path);
		this.deliver(this.council.transact(() => this.council.archived(agenda.id, paths, commit.sha)));
		return `commit ${commit.sha}`;
	}
}
