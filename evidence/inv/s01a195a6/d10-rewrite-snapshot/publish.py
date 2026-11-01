import concurrent.futures,json,subprocess
from pathlib import Path
ROOT=Path('/tmp/d10-rewrite')
manifest=json.loads((ROOT/'manifest.json').read_text())
originals={(r,x['number']):x for r in ['soroi','Pepgent','deploy','images','omp-rpc-mux','remote','lab-library','PM'] for x in json.loads((ROOT/f'{r}.json').read_text())}
(ROOT/'prepublish').mkdir(exist_ok=True)
def current(m):
 endpoint=f'repos/Pepgent/{m["repo"]}/issues/{m["number"]}'
 raw=subprocess.run(['gh','api',endpoint],check=True,text=True,capture_output=True).stdout
 x=json.loads(raw)
 (ROOT/'prepublish'/f'{m["repo"]}-{m["number"]}.json').write_text(raw)
 if x['state']!='open':
  print(f'SKIP no longer OPEN: {m["url"]}',flush=True)
  return None
 if x['body']!=originals[(m['repo'],m['number'])]['body']:raise RuntimeError(f'{m["url"]}: body changed since capture; reread required')
 return m
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:states=list(pool.map(current,manifest))
ready=[m for m in states if m is not None]
(ROOT/'skipped-closed.json').write_text(json.dumps([m for m,s in zip(manifest,states) if s is None],ensure_ascii=False,indent=2))
print(f'Fetched current OPEN bodies for all {len(ready)} targets; no intervening body edits.',flush=True)
(ROOT/'receipts').mkdir(exist_ok=True)
def publish(m):
 body=Path(m['path']).read_text()
 endpoint=f'repos/Pepgent/{m["repo"]}/issues/{m["number"]}'
 raw=subprocess.run(['gh','api','--method','PATCH',endpoint,'--input','-'],input=json.dumps({'body':body},ensure_ascii=False),check=True,text=True,capture_output=True).stdout
 x=json.loads(raw)
 (ROOT/'receipts'/f'{m["repo"]}-{m["number"]}.json').write_text(raw)
 receipt={'url':x['html_url'],'state':x['state'],'updated_at':x['updated_at'],'body_bytes':len(x['body'].encode())}
 print(json.dumps(receipt,ensure_ascii=False),flush=True)
 return receipt
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:receipts=list(pool.map(publish,ready))
(ROOT/'publication.json').write_text(json.dumps(receipts,ensure_ascii=False,indent=2))
print(f'Published {len(receipts)} issue-body-only PATCH requests.',flush=True)
