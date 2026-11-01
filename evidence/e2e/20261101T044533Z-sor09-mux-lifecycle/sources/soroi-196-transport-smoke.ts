import { readFileSync } from 'node:fs';
import { MuxWriter, muxConfiguration } from '/Users/mouriya/Ext/worktrees/issue-196-mux-writer-ff0716f/packages/omp-soroi/src/subagent/main/mux-writer.ts';
const env = { ...process.env, SOROI_MUX_URL: 'ws://127.0.0.1:18464', MUX_AUTH_TOKEN: readFileSync('/Users/mouriya/Ext/work/orbstack/pepgent-mux/token','utf8').trimEnd() };
const configuration = muxConfiguration(env);
const rows: unknown[] = [];
const connecting = new MuxWriter('ConnectingClose196', configuration, () => { throw new Error('Unexpected human frame'); });
await connecting.close();
rows.push({ scenario: 'connecting-close', closed: connecting.isClosed });
const failed = new MuxWriter('StartupRefusal196', configuration, () => { throw new Error('Unexpected human frame'); });
const start = Date.now();
try {
  await failed.start({ argv: ['omp', '--mode', 'rpc', '--model', 'invalid-provider-196/invalid-model-196', '--no-extensions', '--no-context-files'], cwd:'/tmp', env: Object.fromEntries(Object.entries(env).filter((entry): entry is [string,string] => entry[1] !== undefined)), handlers: {
    onEvent() {}, onEnd(end) { rows.push({scenario:'startup-end',end}); },
    async onHostToolCall() { throw new Error('Unexpected host call'); }, async onHostRead() { throw new Error('Unexpected host read'); },
  }});
  throw new Error('Invalid model unexpectedly became ready');
} catch(error) {
  if (!(error instanceof Error) || !error.message.includes('invalid-model-196')) throw error;
  rows.push({scenario:'startup-refusal', elapsedMs: Date.now()-start, diagnostic:error.message});
} finally { await failed.close(); }
const response = await fetch('http://127.0.0.1:18464/agents', {headers:{Authorization:`Bearer ${configuration.bearer}`}});
if (!response.ok) throw new Error(`Presence ${response.status}`);
const presence = await response.json();
if (!Array.isArray(presence) || presence.some(row => row.agentId === 'ConnectingClose196' || row.agentId === 'StartupRefusal196')) throw new Error('Declaration leaked');
rows.push({scenario:'presence-after-close',presence});
console.log(JSON.stringify(rows,null,2));
