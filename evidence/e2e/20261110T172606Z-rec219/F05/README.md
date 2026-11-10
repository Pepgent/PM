# F05 S1

Reproduce from the soroi checkout:

```sh
docker exec -u 1000:1000 -w /work pepgent-soroi-e2e-central sh -ec 'MUX_AUTH_TOKEN=$(cat /run/secrets/mux-auth-token) && PEPGENT_GATEWAY_TOKEN=$(cat /run/secrets/gateway-client-token) && export MUX_AUTH_TOKEN PEPGENT_GATEWAY_TOKEN && exec bun run --cwd /opt/soroi/e2e f05 --config /work/campaigns/f05-rec219.json'
```

The build fields identify the tested runtime. Fixture builds are not live acceptance evidence.
