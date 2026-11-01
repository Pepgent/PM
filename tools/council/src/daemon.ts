// Council daemon: sole writer of the council database, event fan-out to watchers, GitHub outbox.
// Hosted by launchd (org.pepgent.council); see tools/council/README.md.
import { mkdirSync, rmSync } from "node:fs";
import { loadConfig } from "./config.ts";
import { type Args, Council } from "./council.ts";
import { type CouncilEvent, InputError } from "./domain.ts";
import { Outbox } from "./github.ts";
import { openStore, Store } from "./store.ts";

const config = loadConfig();
mkdirSync(config.stateDir, { recursive: true });
rmSync(config.socket, { force: true });

const log = (line: string): void => console.log(`${new Date().toISOString()} ${line}`);
const store = new Store(openStore(config.database));
const council = new Council(store, config.firstNumber);

/** `EVT <seq> <utc> @<to> <kind> <agenda|-> k=v … | summary` — one line per recipient. */
const eventLine = (e: CouncilEvent): string =>
	`EVT ${e.seq} ${e.at} @${e.to} ${e.kind} ${e.agenda ?? "-"} ${Object.entries(e.fields)
		.map(([k, v]) => `${k}=${v.replaceAll(/\s+/g, "_")}`)
		.join(" ")} | ${e.summary.replaceAll(/\s+/g, " ")}`;

interface Watcher {
	to: string;
	push: (line: string) => void;
}
const watchers = new Set<Watcher>();

const deliver = (events: CouncilEvent[]): void => {
	for (const e of events) {
		if (!e.wake) continue;
		for (const w of watchers) if (w.to === e.to) w.push(`${eventLine(e)}\n`);
	}
};

const outbox = new Outbox(store, council, config, deliver, log);

// Watch streams are silent between events and must never be idled out. Bun's types omit idleTimeout for
// unix-socket servers, but the runtime honours it (feasibility §3: a watch stayed connected for 9 minutes),
// while the per-request server.timeout(req, 0) does not stop the 10-second default on unix sockets.
// @ts-expect-error idleTimeout is accepted at runtime for unix sockets
Bun.serve({
	unix: config.socket,
	idleTimeout: 0,
	async fetch(req) {
		const url = new URL(req.url);
		if (req.method === "POST" && url.pathname === "/cmd") {
			const { cmd, args } = (await req.json()) as { cmd: string; args: Args };
			try {
				const { text, events } = council.run(cmd, args);
				deliver(events);
				outbox.kick();
				return Response.json({ ok: true, text });
			} catch (error) {
				if (error instanceof InputError) return Response.json({ ok: false, error: error.message }, { status: 400 });
				log(`command ${cmd} crashed: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`);
				return Response.json({ ok: false, error: String(error) }, { status: 500 });
			}
		}
		if (req.method === "GET" && url.pathname === "/watch") {
			const to = url.searchParams.get("to");
			if (to === null || to === "") return new Response("watch needs ?to=<address>\n", { status: 400 });
			let watcher!: Watcher;
			const stream = new ReadableStream<string>({
				start(controller) {
					watcher = { to, push: (line) => controller.enqueue(line) };
					watchers.add(watcher);
					const unread = store.eventsFor(to, store.cursor(to)).filter((e) => e.wake).length;
					controller.enqueue(`WATCH ready to=${to} unread_wake=${unread} — run: council digest --reader ${to}\n`);
				},
				cancel() {
					watchers.delete(watcher);
				},
			});
			return new Response(stream, { headers: { "content-type": "text/plain; charset=utf-8" } });
		}
		if (req.method === "GET" && url.pathname === "/health") {
			const outboxPending = store.pendingOutbox();
			return Response.json({
				pid: process.pid,
				database: config.database,
				repo: config.repo,
				watching: [...new Set([...watchers].map((w) => w.to))].sort(),
				outboxPending: outboxPending.length,
				outboxError: (store.db.query("SELECT last_error FROM outbox WHERE done_at IS NULL ORDER BY seq LIMIT 1").get() as { last_error: string | null } | null)?.last_error ?? null,
			});
		}
		return new Response("not found\n", { status: 404 });
	},
});

setInterval(() => outbox.kick(), 30_000);
outbox.kick();
log(`council daemon pid=${process.pid} socket=${config.socket} db=${config.database} repo=${config.repo}`);
