import { Evidence } from "/Users/mouriya/Ext/worktrees/test-181-lab-standin-ff0716f/e2e/standin/evidence.ts";
import { LabStandIn } from "/Users/mouriya/Ext/worktrees/test-181-lab-standin-ff0716f/e2e/standin/lab-standin.ts";
import { mkdtemp } from "node:fs/promises";
const root = await mkdtemp("/tmp/soroi-startup-proof-");
const binary = "/tmp/soroi-e2e-181-bin/omp-rpc-mux";
const token = crypto.randomUUID();
const reservation = Bun.serve({hostname:"127.0.0.1",port:0,fetch:()=>new Response()});
const port=reservation.port; await reservation.stop(true);
const mux=Bun.spawn([binary,"serve","--listen",`127.0.0.1:${port}`],{env:{...process.env,MUX_AUTH_TOKEN:token},stdin:"ignore",stdout:"ignore",stderr:"ignore"});
try {
 const deadline=Date.now()+5000;
 while(true){try{const socket=await Bun.connect({hostname:"127.0.0.1",port:port!,socket:{data(){},open(s){s.end();}}});socket.end();break;}catch{if(Date.now()>deadline)throw new Error("mux startup timeout");await Bun.sleep(25);}}
 const evidence=await Evidence.create(`${root}/failed`,[token]);
 const base={muxUrl:`ws://127.0.0.1:${port}`,bearer:token,agent:"startup-proof",muxBinary:binary,cwd:"/tmp",timeoutMs:1000};
 let failure="";
 try{await LabStandIn.start({...base,command:[process.execPath,"-e","process.exit(23)"]},evidence);}catch(e){failure=String(e);}
 if(!failure)throw new Error("Expected failed startup");
 const raw=await Bun.file(`${root}/failed/rpc.jsonl`).text();
 const frames=raw.trim().split("\n").map(line=>JSON.parse(JSON.parse(line).raw));
 if(!frames.some(frame=>frame.type==="mux_exited"&&frame.code===23))throw new Error("Missing real mux exit23 observation");
 const next=await LabStandIn.start({...base,command:[process.execPath,"-e",'console.log(JSON.stringify({type:"ready"}));for await (const chunk of Bun.stdin.stream()){}']},await Evidence.create(`${root}/reused`,[token]));
 await next.close();
 const observation={failure,reusedAgent:"startup-proof",result:"new writer and ready generation succeeded after failed startup; orderly EOF exit0",evidence:root};
 await Bun.write(`${root}/observation.json`,JSON.stringify(observation,null,2));
 console.log(JSON.stringify(observation));
} finally {mux.kill();await mux.exited;}
