const { createClient } = require("redis");

const clientRedis = createClient({
  host: "localhost",
  port: 6379,
});

clientRedis.on("connect", () => {
  console.log("Conectado a Redis");
});

module.exports = clientRedis;
