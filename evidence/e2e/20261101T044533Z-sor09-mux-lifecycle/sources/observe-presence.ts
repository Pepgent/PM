import { appendFileSync, readFileSync } from 'node:fs';
const controller = new AbortController();
process.on('SIGINT',()=>controller.abort());
const token = readFileSync('/Users/mouriya/Ext/work/orbstack/pepgent-mux/token','utf8').trimEnd();
const response = await fetch('http://127.0.0.1:18464/agents/events',{headers:{Authorization:`Bearer ${token}`}, signal:controller.signal});
if(!response.ok || !response.body) throw new Error(`Mux events HTTP ${response.status}`);
console.log('Source SSE connected');
try {
  for await (const bytes of response.body) {
    const text = new TextDecoder().decode(bytes);
    appendFileSync('/tmp/soroi-196-runtime/presence.sse',text);
    process.stdout.write(text);
  }
} catch(error) { if(!controller.signal.aborted) throw error; }
console.log('Source SSE observer stopped');
