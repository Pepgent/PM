// Runtime configuration. Production uses the defaults; the end-to-end probe overrides them with
// COUNCIL_* variables so it runs on its own database, socket, title prefix and archive directory.
import { homedir } from "node:os";
import { join } from "node:path";

export interface Config {
	stateDir: string;
	socket: string;
	database: string;
	repo: string; // owner/name
	branch: string;
	projectOwner: string;
	projectNumber: number;
	projectId: string;
	statusFieldId: string;
	statusInProgress: string;
	statusDone: string;
	label: string | null;
	titlePrefix: string;
	archiveRoot: string; // repo path holding decisions/ and votes/
	firstNumber: number;
}

const env = (key: string): string | undefined => {
	const v = process.env[key];
	return v === undefined || v === "" ? undefined : v;
};

export const loadConfig = (): Config => {
	const stateDir = env("COUNCIL_STATE_DIR") ?? join(homedir(), ".local/state/pepgent-council");
	return {
		stateDir,
		socket: join(stateDir, "council.sock"),
		database: join(stateDir, "council.db"),
		repo: env("COUNCIL_REPO") ?? "Pepgent/PM",
		branch: env("COUNCIL_BRANCH") ?? "main",
		projectOwner: "Pepgent",
		projectNumber: 1,
		// Project #1 "PM": Status single-select field and its options (feasibility §2).
		projectId: "PVT_kwDOE4p_hs4BjKDX",
		statusFieldId: "PVTSSF_lADOE4p_hs4BjKDXzhh_dP0",
		statusInProgress: "47fc9ee4",
		statusDone: "98236657",
		label: env("COUNCIL_LABEL") === "none" ? null : (env("COUNCIL_LABEL") ?? "decision"),
		titlePrefix: env("COUNCIL_TITLE_PREFIX") ?? "",
		archiveRoot: env("COUNCIL_ARCHIVE_ROOT") ?? "evidence",
		firstNumber: Number(env("COUNCIL_FIRST_NUMBER") ?? "25"),
	};
};
