#!/usr/bin/env python3
import os
import sys
from pathlib import Path

WORKTREE = Path("/Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f")
FIXTURE = Path("/tmp/soroi-196-runtime")
TOKEN_FILE = Path("/Users/mouriya/Ext/work/orbstack/pepgent-mux/token")


def main() -> None:
    environment = os.environ.copy()
    environment["PI_CODING_AGENT_DIR"] = "/tmp/soroi-185-runtime/agent"
    environment["SOROI_STORE_URL"] = "http://127.0.0.1:19688"
    environment["SOROI_MUX_URL"] = "ws://127.0.0.1:18464"
    environment["MUX_AUTH_TOKEN"] = TOKEN_FILE.read_text(encoding="utf-8").rstrip("\r\n")
    environment["PATH"] = os.pathsep.join(
        entry for entry in (str(FIXTURE / "bin"), environment.get("PATH", "")) if entry
    )
    os.chdir(FIXTURE)
    argv = [
        "omp",
        "-e",
        str(WORKTREE / "packages/omp-soroi"),
        "--config",
        str(FIXTURE / "settings.yml"),
        "--model",
        "opencode-go/deepseek-v4.1-flash",
        "--no-context-files",
        "--session-dir",
        str(FIXTURE / "sessions"),
        *sys.argv[1:],
    ]
    os.execvpe("omp", argv, environment)


if __name__ == "__main__":
    main()
