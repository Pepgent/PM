import json
from pathlib import Path
r=Path('/tmp/d10-rewrite')
m=json.loads((r/'manifest.json').read_text())
published={x['url'] for x in json.loads((r/'publication.json').read_text())}
m=[x for x in m if x['url'] in published]
titles={(repo,x['number']):x['title'] for repo in ['soroi','Pepgent','deploy','images','omp-rpc-mux','remote','lab-library','PM'] for x in json.loads((r/f'{repo}.json').read_text())}
print('| 改写 issue | 改动要点 |')
print('|---|---|')
for x in sorted(m,key=lambda a:({'soroi':0,'Pepgent':1,'PM':2}[a['repo']],a['number'])):
 key=x['repo'],x['number'];name=x['repo']+'#'+str(x['number'])
 if x['kind']=='implementation':detail='开发依赖改为所需代码/产物合入 main；验收限本仓真实入口；跨组件原义务移交 '+ '、'.join(f'[{u.split("/")[4]}#{u.rsplit("/",1)[1]}]({u})' for u in x['receivers'])+'。'
 elif x['kind']=='live':detail='改为统一 A0/S1 执行项；保留原结果、checkpoint、真实入口及 PM 归档；不再阻塞切片开工。'
 elif x['kind']=='e2e':detail='spec/runbook/check 开发期合入，真实运行移至统一阶段；执行前置与开发前置分离；列明承接来源原义务。'
 else:detail='撤销 W7/runtime 开工门禁；准备工作可开发期进行，最终 D9 按统一阶段真实证据完成。'
 if key==('soroi',224):detail+=' A0 可在定制仓提前作局部检查，统一阶段重跑，不等统一 A0 合并实现 PR。'
 if key==('soroi',235):detail+=' 撤销 verifier PR 等完整 A0 才可合入要求。'
 if key==('Pepgent',23):detail+=' server-function 核对在 S1 后、S2 前。'
 if key==('Pepgent',30):detail+=' 加入 D10-14 release-init 非活动开发、统一 S2 活动接入前置。'
 print(f'| [{name}]({x["url"]}) {titles[key]} | {detail} |')
