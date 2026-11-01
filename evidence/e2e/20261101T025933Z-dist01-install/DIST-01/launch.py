import os,pathlib
env=dict(os.environ)
env["PEPGENT_GATEWAY_TOKEN"]=pathlib.Path('/Users/mouriya/Ext/work/orbstack/pepgent-gateway/central/token').read_text().strip()
argv=["docker","run","--rm","--init","--network","pepgent-soroi-e2e","--name","pepgent-soroi-dist01","-it","--env","PEPGENT_GATEWAY_TOKEN","--env","SOROI_STORE_URL=http://pepgent-soroi-e2e-store.orb.local:3001","--mount",'type=bind,src=/tmp/soroi-ci199-rules-0ns58dmu/soroi-e3d50121e2965c58b4dbc46f334524bbc51faff53911ba988fa0cc782215d766.tar,dst=/ci-release.tar,readonly',"--mount",'type=bind,src=/tmp/soroi-ci199-rules-0ns58dmu,dst=/probe',"--mount","type=bind,src=/Users/mouriya/Ext/work/orbstack/pepgent-gateway/central/models.yml,dst=/client/models.yml,readonly","--mount","type=bind,src=/Users/mouriya/Ext/work/orbstack/pepgent-gateway/central/config.yml,dst=/client/config.yml,readonly","pepgent-registry.orb.local:5000/pepgent/omp-agent:latest","sh","/probe/start.sh"]
os.execvpe(argv[0],argv,env)
