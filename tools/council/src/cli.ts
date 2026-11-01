// council CLI: every command is a request to the daemon over its unix socket.
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { loadConfig } from "./config.ts";

const config = loadConfig();
const REPEATABLE = new Set(["row", "counter", "cite", "class", "to"]);
/** Commands whose first positional argument names a row or an agenda. */
const POSITIONAL: Record<string, string> = {
	vote: "agenda",
	tally: "agenda",
	revise: "row",
	withdraw: "row",
	dispute: "row",
	arbitrate: "row",
	claim: "row",
	rebut: "row",
	seat: "action",
};

const USAGE = `council — Pepgent 议会 daemon client (tools/council/README.md)

  propose   --as A --seat S --file draft.yaml
  revise    D25-01 --as A --file row.yaml --reasons @why.md
  withdraw  D25-01 --as A --reason TEXT
  vote      D25 --as A --seat S --row D25-01=approve [--row D25-02=oppose --counter D25-02=@ce.md]
            [--row D25-03=veto --cite D25-03=U95] [--class D25-01=技术] --reasons @ballot.md
  dispute   D25-01 --as <Argon occupant> --reasons @why.md
  arbitrate D25-01 --as <LeadMentor occupant> --category 意图|技术|… --reasons @why.md
  claim     D25-01 --as A --seat S --domain governance|globalArchitecture|design --reasons TEXT
  rebut     D25-01 --as A --target <seat> --evidence @evidence.md
  tally     D25
  queue     [--seat S]
  seat      enter|retire|list [--seat S --as A --reason TEXT]
  status    post --as A --kind progress|note|blocked|all_done|alert|dependency
            [--repo R --worker W --ref soroi#217 --to AreaMgrX] --text @status.md
  digest    --reader X [--peek]
  watch     --to X
  daemon    install|start|stop|restart|status

A value written as @path is replaced by that file's contents (also after "=" in --row/--counter/--cite/--class).`;

const fileValue = (v: string): string => (v.startsWith("@") ? readFileSync(resolve(v.slice(1)), "utf8") : v);

const parseArgs = (argv: string[]): { cmd: string; args: Record<string, string | string[] | boolean> } => {
	const [cmd = "help", ...rest] = argv;
	const args: Record<string, string | string[] | boolean> = {};
	const positional: string[] = [];
	for (let i = 0; i < rest.length; i++) {
		const tok = rest[i]!;
		if (!tok.startsWith("--")) {
			positional.push(tok);
			continue;
		}
		const key = tok.slice(2);
		const next = rest[i + 1];
		if (next === undefined || next.startsWith("--")) {
			args[key] = true;
			continue;
		}
		i++;
		const eq = next.indexOf("=");
		const value = REPEATABLE.has(key) && eq > 0 ? `${next.slice(0, eq)}=${fileValue(next.slice(eq + 1))}` : fileValue(next);
		if (REPEATABLE.has(key)) args[key] = [...((args[key] as string[] | undefined) ?? []), value];
		else args[key] = value;
	}
	const pos = POSITIONAL[cmd];
	if (pos !== undefined && positional[0] !== undefined) args[pos] = positional[0];
	if (cmd === "status" && positional[0] !== "post") throw new Error("usage: council status post …");
	return { cmd, args };
};

const call = async (path: string, init?: RequestInit): Promise<Response> => {
	if (!existsSync(config.socket)) throw new Error(`council daemon socket ${config.socket} not found; start it with: council daemon start`);
	return fetch(`http://council${path}`, { ...init, unix: config.socket, timeout: false } as RequestInit);
};

const LABEL = "org.pepgent.council";
const plistTarget = join(homedir(), "Library/LaunchAgents", `${LABEL}.plist`);
const plistSource = join(dirname(import.meta.dir), "launchd", `${LABEL}.plist`);
const domain = `gui/${process.getuid!()}`;

const launchctl = async (...args: string[]): Promise<number> => {
	const p = Bun.spawn(["launchctl", ...args], { stdout: "inherit", stderr: "inherit" });
	return p.exited;
};

const daemonCommand = async (action: string | undefined): Promise<number> => {
	switch (action) {
		case "install":
			mkdirSync(config.stateDir, { recursive: true });
			await Bun.write(plistTarget, Bun.file(plistSource));
			console.log(`installed ${plistTarget}`);
			return launchctl("bootstrap", domain, plistTarget);
		case "start":
			return launchctl("bootstrap", domain, plistTarget);
		case "stop":
			return launchctl("bootout", `${domain}/${LABEL}`);
		case "restart":
			return launchctl("kickstart", "-k", `${domain}/${LABEL}`);
		case "status": {
			const code = await launchctl("print", `${domain}/${LABEL}`);
			if (code !== 0) return code;
			console.log(JSON.stringify(await (await call("/health")).json(), null, 2));
			return 0;
		}
		default:
			console.error("usage: council daemon install|start|stop|restart|status");
			return 2;
	}
};

const main = async (): Promise<number> => {
	const argv = process.argv.slice(2);
	if (argv.length === 0 || argv[0] === "help" || argv[0] === "--help") {
		console.log(USAGE);
		return 0;
	}
	if (argv[0] === "daemon") return daemonCommand(argv[1]);
	const { cmd, args } = parseArgs(argv);
	if (cmd === "watch") {
		const to = args.to;
		if (!Array.isArray(to) || to.length !== 1) throw new Error("usage: council watch --to <address>");
		const res = await call(`/watch?to=${encodeURIComponent(to[0]!)}`);
		if (!res.ok || res.body === null) throw new Error(await res.text());
		const decoder = new TextDecoder();
		for await (const chunk of res.body) process.stdout.write(decoder.decode(chunk, { stream: true }));
		console.error("council watch: stream ended (daemon stopped or restarted)");
		return 1;
	}
	if (cmd === "propose" || cmd === "revise") {
		const file = args.file;
		if (typeof file !== "string") throw new Error(`${cmd} needs --file <yaml>`);
		args[cmd === "propose" ? "proposal" : "body"] = JSON.stringify(Bun.YAML.parse(readFileSync(resolve(file), "utf8")));
		delete args.file;
	}
	const res = await call("/cmd", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ cmd, args }) });
	const body = (await res.json()) as { ok: true; text: string } | { ok: false; error: string };
	if (body.ok) {
		console.log(body.text);
		return 0;
	}
	console.error(`council ${cmd}: ${body.error}`);
	return 1;
};

try {
	process.exitCode = await main();
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error));
	process.exitCode = 1;
}
