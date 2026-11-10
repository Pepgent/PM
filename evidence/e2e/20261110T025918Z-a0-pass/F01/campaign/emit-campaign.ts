// Emits the A0 campaign on stdout so the bearer never lands in a file or argv.
// Any extra output would corrupt the campaign; errors throw to stderr only.

const muxBearer = (await Bun.file("/Users/mouriya/Ext/work/orbstack/pepgent-mux/token").text()).replace(/\r?\n$/, "");
if (!muxBearer || /[\r\n]/.test(muxBearer)) throw new Error("mux bearer must be a single nonempty line");

const campaign = {
  evidenceDir: "/tmp/pepgent-dispatch/Rec235A0/evidence-a0-2",
  network: "pepgent-soroi-e2e",
  releaseTar: "/Users/mouriya/Ext/work/orbstack/pepgent-soroi-e2e/releases/42741430236/soroi-c85c66c6cc01e07c41637c7ae3fe3436ad5183203c9379fb9d3b405b8d6fbc76/soroi-c85c66c6cc01e07c41637c7ae3fe3436ad5183203c9379fb9d3b405b8d6fbc76.tar",
  build: {
    commits: {
      soroi: "7d83c5d57d296986cf7dc233b19f5462511e937d",
      "omp-soroi": "dc7d05d4b219a12a191078fac5604658682fe103",
    },
    release: "c85c66c6cc01e07c41637c7ae3fe3436ad5183203c9379fb9d3b405b8d6fbc76",
    images: {
      "IMG-01": "pepgent-registry.orb.local:5000/pepgent/omp-agent@sha256:ee23be181f1d06376796a99ea4369a892fd70978b67ddde69c717441832d69c1",
    },
    omp: "18.15.0",
    model: "opencode-go/deepseek-v4.1-flash",
  },
  modelsFile: "/Users/mouriya/Ext/work/orbstack/pepgent-gateway/a0/models.yml",
  settingsFile: "/Users/mouriya/Ext/work/orbstack/pepgent-gateway/a0/config.yml",
  gatewayTokenFile: "/Users/mouriya/Ext/work/orbstack/pepgent-gateway/a0/token",
  env: {
    SOROI_STORE_URL: "http://pepgent-soroi-e2e-store.orb.local:3001",
    SOROI_MUX_URL: "ws://pepgent-soroi-e2e-mux.orb.local:8080",
    MUX_AUTH_TOKEN: muxBearer,
  },
  installer: ["bun", "install.ts", "--home", "/home/agent", "--artifact", "/tmp/soroi-a0/soroi.tar"],
  ompArgs: ["--model", "opencode-go/deepseek-v4.1-flash", "--no-context-files", "--no-lsp", "--max-time", "180"],
  timeoutMs: 240000,
  ledgerFile: "/Users/mouriya/Ext/work/orbstack/pepgent-e2e-pty.jsonl",
};

process.stdout.write(JSON.stringify(campaign) + "\n");
