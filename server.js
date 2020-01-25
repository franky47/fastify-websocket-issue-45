const Fastify = require("fastify");

const server = Fastify({ logger: true });

// The order does not seem to matter here:
server.register(require("fastify-graceful-shutdown"));
server.register(require("fastify-websocket"));

server.get("/foo", { websocket: true }, (connection, req) => {
  const socketID = req.headers["sec-websocket-key"];
  server.log.info({
    msg: "Client connected",
    socket: socketID
  });
  connection.socket.on("message", message => {
    server.log.info({
      msg: message,
      socket: socketID
    });
  });
  connection.socket.on("close", () => {
    server.log.info({
      msg: "Client disconnected",
      socket: socketID
    });
  });
});

server.addHook("onClose", (server, done) => {
  server.log.info("in the onClose hook");
  done();
});

server.listen({ port: 3000 });
