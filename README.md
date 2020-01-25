Reproduction repository for [`fastify/fastify-websocket#45`](https://github.com/fastify/fastify-websocket/issues/45)

## To Reproduce

1. Install dependencies
2. Start server: `node ./server.js`
3. In another terminal, start the client: `node ./client.js`
4. Kill the server with ctrl + C (sends `SIGINT`)
5. The logs should read:

```
{"level":30,"time":1579957262402,"msg":"Server listening at http://[::]:3000","v":1}
{"level":30,"time":1579957269787,"msg":"Client connected","socket":"nqBy5LpFR4fJN4feh3xutA==","v":1}
{"level":30,"time":1579957269793,"msg":"foo","socket":"nqBy5LpFR4fJN4feh3xutA==","v":1}
^C{"level":30,"time":1579957271604,"plugin":"fastify-graceful-shutdown","signal":"SIGINT","msg":"received signal","v":1}
{"level":30,"time":1579957271604,"plugin":"fastify-graceful-shutdown","signal":"SIGINT","msg":"triggering close hook","v":1}
{"level":50,"time":1579957281606,"plugin":"fastify-graceful-shutdown","signal":"SIGINT","timeout":10000,"msg":"terminate process after timeout","v":1}
```

Note how the `in the onClose hook` message is missing: the `onClose` hook has
not been called.
