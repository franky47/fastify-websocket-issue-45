const WebSocket = require("ws");

const client = new WebSocket("ws://localhost:3000/foo");

client.on("open", () => {
  console.log("Connected");
  client.send("foo");
});

client.on("close", () => {
  console.log("Disconnected");
});
